/*
 acrobat-js - http://github.com/fabianonunes/acrobat-js
 Copyright (c) 2011, Fabiano Nunes
 Released under the BSD License.
*/

var AcrobatJs = {

	paths : {
		cert1 : '/c/status1.pdf',
		cert6 : '/c/status6.pdf'
	},
	
	insertDoc : app.trustedFunction(function(path){
		app.beginPriv();
		this.insertPages({ 
			nPage: this.numPages-1, 
			cPath: path
		});
		this.pageNum = this.numPages-1;
		app.endPriv();
	}),

	addCert6 : function(){

		AcrobatJs.insertDoc(AcrobatJs.paths.cert6);

		var f = this.getField('numproc')
			, mask = /[1-9]\d{0,6}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}/;

		f.value = mask.exec(this.documentFileName) || 'Digite o número do processo';

	},

	sortBookmarks : function(root) {

		var returnTo = this.pageNum
			, chd = root.children
			, names = {}
			, key, bm;

		if(!chd) { return; }

		for(key = 0; bm = chd[key++];){
			bm.execute();
			bm.pageNum = this.pageNum;
			bm.order = key;
			names[bm.pageNum] = {};
			bm.children && AcrobatJs.sortBookmarks(bm);
		}

		chd.sort(function(a, b){
			return a.pageNum - b.pageNum || a.order - b.order;
		});

		for(key = 0; bm = chd[key++];){
			if(names[bm.pageNum][bm.name] && !bm.children){
				bm.remove();
				continue;
			}
			root.insertChild(bm, chd.length);
			names[bm.pageNum][bm.name] = true;
		}

		this.pageNum = returnTo;

	},

	initialize : function(){
		
		Utils.stickAll(AcrobatJs);

		var cEnable = "event.rc = (event.target != null);"
			, cExec = "AcrobatJs.sortBookmarks(this.bookmarkRoot);"
			, cLabel = "Ordenar &Marcadores";

		app.addMenuItem({ 
			cName: "sortBookmarks", 
			cUser: cLabel,
			cParent: "Tools", 
			cEnable: cEnable,
			cExec: cExec,
			nPos: 0 
		});
		
		app.addToolButton({
			cName: "sortBkmButton", 
			cLabel: cLabel,
			cEnable: cEnable,
			cExec: cExec,
			nPos: -1 
		});

		app.addMenuItem({ 
			cName: "addCert6", 
			cUser: "Certidão - Status &6",
			cParent: "Tools", 
			cEnable: cEnable,
			cExec: "AcrobatJs.addCert6();",
			nPos: 0 
		});

		app.addMenuItem({ 
			cName: "addCert1", 
			cUser: "Certidão - Status &1",
			cParent: "Tools", 
			cEnable: cEnable,
			cExec: "AcrobatJs.insertDoc(AcrobatJs.paths.cert1);",
			nPos: 0 
		});		

	}

}

var Utils = {

	stick : function(func) {
		return function() {
			return func.apply(event.target, Array.prototype.slice.call(arguments));
		}
	},

	stickAll : function(obj) {
		for (var key in obj) {
			if(Utils.isFunction(obj[key])){
				obj[key] = Utils.stick(obj[key]);
			}
		}
	},

	isFunction : function(obj) {
		return Object.prototype.toString.call(obj) == '[object Function]';
	}

}

AcrobatJs.initialize();
