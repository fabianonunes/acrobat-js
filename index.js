/*
 acrobat-js - http://github.com/fabianonunes/acrobat-js
 Copyright (c) 2011, Fabiano Nunes
 Released under the BSD License.
*/

var Utils = {

	stick : function(func) {
		return function() {
			return func.apply(event.target, Array.prototype.slice.call(arguments));
		}
	},

	stickAll : function(obj) {
		for (var b in obj) Utils.isFunction(obj[b]) && (obj[b] = Utils.stick(obj[b]))
	},

	isFunction : function(obj) {
		return Object.prototype.toString.call(obj) == '[object Function]';
	}

};


var AcrobatJs = {

	paths : {
		1 : '/r/APLICATIVOS/Certidoes/status_1.pdf',
		6 : '/r/APLICATIVOS/Certidoes/status_6.pdf'
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

	addCert : function(status){

		console.println(AcrobatJs.paths[status]);

		AcrobatJs.insertDoc(AcrobatJs.paths[status]);

		var f = this.getField('numproc_' + status)
			, mask = /[1-9]\d{0,6}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}/;

		f.value = mask.exec(this.documentFileName) || 'Digite o n\u00famero do processo';

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
			names[bm.pageNum][bm.name] = !0;
		}

		this.pageNum = returnTo;

	}

};

Utils.stickAll(AcrobatJs);

var cEnable = "event.rc = (event.target != null);"
	, cExec = "AcrobatJs.sortBookmarks(this.bookmarkRoot);"
	, cLabel = "Ordenar &Marcadores";

app.addMenuItem({ 
	cName: "sortBookmarks", 
	cUser: cLabel,
	cParent: "Tools", 
	cEnable: cEnable,
	cExec: cExec
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
	cUser: "Certid\u00e3o - Status &6",
	cParent: "Tools", 
	cEnable: cEnable,
	cExec: "AcrobatJs.addCert(6);"
});

app.addToolButton({
	cName: "addCert6Button", 
	cLabel: "Certid\u00e3o - Status 6",
	cEnable: cEnable,
	cExec: "AcrobatJs.addCert(6);",
	nPos: -1 
});

app.addMenuItem({ 
	cName: "addCert1", 
	cUser: "Certid\u00e3o - Status &1",
	cParent: "Tools", 
	cEnable: cEnable,
	cExec: "AcrobatJs.addCert(1);"
});

app.addToolButton({
	cName: "addCert1Button", 
	cLabel: "Certid\u00e3o - Status 1",
	cEnable: cEnable,
	cExec: "AcrobatJs.addCert(1);",
	nPos: -1 

});

