/*
 acrobat-js - http://github.com/fabianonunes/acrobat-js
 Copyright (c) 2011, Fabiano Nunes
 Released under the BSD License.
*/

var Utils = {

	stick : function(func) {
		return function() {
			return func.apply(event.target, Array.prototype.slice.call(arguments));
		};
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

	masks : {
		processo : {
			mask : /[1-9]\d{0,6}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}/,
			replace : '$1'
		},
		peticao : {
			mask : /(\d{1,8})(\d{4})(\d)/,
			replace : '$1/$2.#3'
		}
	},

	insertDoc : app.trustedFunction(function (path) {
		app.beginPriv();
		this.insertPages({
			nPage: this.numPages-1,
			cPath: path
		});
		try {
			this.pageNum = this.numPages-1;
		} catch (e) {}
		app.endPriv();
	}),

	addCert : function (status, tipo) {

		AcrobatJs.insertDoc(AcrobatJs.paths[status]);

		var f = this.getField('numproc_' + status),
			mask = AcrobatJs.masks[tipo],
			replace = AcrobatJs.masks.relace;

		if ( mask.test(this.documentFileName) ) {
			f.value = this.documentFileName.replace(mask, replace);
		} else {
			f.value = 'Digite o n\u00famero do processo';
		}

		var d = new Date();
		var s = this.getField('date');

		var meses = {
			0 : "janeiro",
			1 : "fevereiro",
			2 : "mar\u00e7o",
			3 : "abril",
			4 : "maio",
			5 : "junho",
			6 : "julho",
			7 : "agosto",
			8 : "setembro",
			9 : "outubro",
			10 : "novembro",
			11 : "dezembro"
		};

		s.value = d.getDate() +" de " + meses[d.getMonth()] + " de " + d.getFullYear() + ".";

	},

	sortBookmarks : function(root) {

		var returnTo = this.pageNum,
			chd = root.children,
			names = {},
			key, bm;

		if(!chd) { return; }

		for(key = 0; (bm = chd[key++]);) {
			bm.execute();
			bm.pageNum = this.pageNum;
			bm.order = key;
			names[bm.pageNum] = {};
			if (bm.children) {
				AcrobatJs.sortBookmarks(bm);
			}
		}

		chd.sort(function(a, b) {
			return a.pageNum - b.pageNum || a.order - b.order;
		});

		for(key = 0; (bm = chd[key++]);) {
			if(names[bm.pageNum][bm.name] && !bm.children) {
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

var cEnable = "event.rc = (event.target != null);",
	cExec = "AcrobatJs.sortBookmarks(this.bookmarkRoot);",
	cLabel = "Ordenar &Marcadores";

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
	cExec: "AcrobatJs.addCert(6, 'processo');"
});

app.addToolButton({
	cName: "addCert6Button",
	cLabel: "Certid\u00e3o - Status 6",
	cEnable: cEnable,
	cExec: "AcrobatJs.addCert(6, 'processo');",
	nPos: -1
});

app.addMenuItem({
	cName: "addCert1",
	cUser: "Certid\u00e3o - Status &1",
	cParent: "Tools",
	cEnable: cEnable,
	cExec: "AcrobatJs.addCert(1, 'processo');"
});

app.addToolButton({
	cName: "addCert1Button",
	cLabel: "Certid\u00e3o - Status 1",
	cEnable: cEnable,
	cExec: "AcrobatJs.addCert(1, 'processo');",
	nPos: -1
});

app.addMenuItem({
	cName: "addCert2",
	cUser: "Certid\u00e3o - Status &2",
	cParent: "Tools",
	cEnable: cEnable,
	cExec: "AcrobatJs.addCert(2, 'peticao');"
});

app.addToolButton({
	cName: "addCert2Button",
	cLabel: "Certid\u00e3o - Status 2",
	cEnable: cEnable,
	cExec: "AcrobatJs.addCert(2, 'peticao');",
	nPos: -1
});

