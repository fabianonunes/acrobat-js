/*
 acrobat-js - http://github.com/fabianonunes/acrobat-js
 Copyright (c) 2011, Fabiano Nunes
 Released under the BSD License.
*/

/*global app,_config,util,globalIcons*/

"use strict";

var breaker = {}, idCounter = 0
var _ = {
	uniqueId : function(prefix) {
		var id = idCounter++;
		return prefix ? prefix + id : id;
	},
	each : function(obj, iterator, context) {
		if (obj === null) { return }
		if (obj.length === +obj.length) {
			for (var i = 0, l = obj.length; i < l; i+=1) {
				if (i in obj && iterator.call(context, obj[i], i, obj) === breaker){ return }
			}
		} else {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) {
					if (iterator.call(context, obj[key], key, obj) === breaker) { return }
				}
			}
		}
	},
	map : function (obj, iterator, context) {

		var results = []
		if (!obj) { return results }

		_.each(obj, function(value, index, list) {
			results[results.length] = iterator.call(context, value, index, list)
		})

		return results

	}
}

var Utils = {

	stick : function(func) {
		return function() {
			return func.apply(event.target, Array.prototype.slice.call(arguments))
		}
	},

	stickAll : function(obj) {
		for (var b in obj) {
			if ( Utils.isFunction(obj[b]) ) {
				obj[b] = Utils.stick(obj[b])
			}
		}
	},

	isFunction : function(obj) {
		return Object.prototype.toString.call(obj) == '[object Function]'
	}

}

var AcrobatJs = {

	masks : {
		processo : {
			mask : /(([0-9]{1,7})-([0-9]{2})\.([0-9]{4})\.([0-9])\.([0-9]{2})\.([0-9]{4}))/,
			replace : function (str, p1) {
				return p1
			}
		},
		peticao : {
			mask : /(\d{1,8})(\d{4})(\d)/,
			replace : function (str, p1, p2, p3) {
				return p1 + '/' + p2 + '-' +p3 ;
			}
		}
	},

	insertDoc : app.trustedFunction(function (doc, path) {
		app.beginPriv()

		doc.insertPages({
			nPage : doc.numPages-1,
			cPath : path
		})
		try {
			doc.pageNum = doc.numPages-1
		} catch (e) {}

		app.endPriv()
	}),

	createCert : app.trustedFunction(function (status, path, tipo) {
		app.beginPriv()

		var fileName = this.documentFileName.replace('.pdf', '') + '_status' + status + '.pdf'
		var doc = app.newDoc()

		AcrobatJs.addCert(status, path, tipo, doc, fileName)
		doc.deletePages()
		doc.saveAs(fileName)
		// doc.closeDoc()

		app.endPriv()
	}),

	addCert : function (status, path, tipo, doc, filename, datafile) {

		doc = doc || this
		filename = filename || doc.documentFileName

		AcrobatJs.insertDoc(doc, path)

		tipo = tipo || 'processo'

		var f = doc.getField('numproc_' + status),
			s = doc.getField('date_' + status)

		if( f && s ) {

			var mask    = AcrobatJs.masks[tipo].mask,
				replace = AcrobatJs.masks[tipo].replace,
				match   = filename.match(mask)

			if ( match ) {
				f.value = replace.apply(replace, match)
			} else {
				f.value = 'Digite o n\u00famero do processo'
			}

			var d = new Date()

			var meses = 'janeiro fevereiro mar\u00e7o abril maio junho julho agosto setembro outubro novembro dezembro'.split(' ')

			s.value = d.getDate() +' de ' + meses[d.getMonth()] + ' de ' + d.getFullYear() + '.'

		}

		if ( datafile ) {
			AcrobatJs.importFields(datafile)
		}

	},

	importFields : app.trustedFunction(function (file) {
		app.beginPriv()
		this.importTextData(file, 0)
		app.endPriv()
	}),

	launchQuery : app.trustedFunction(function () {

		app.beginPriv()

		var mask         = AcrobatJs.masks.processo.mask,
			processo     = this.documentFileName,
			doc          = processo.match(mask),
			REFERER      = 'ext02.tst.jus.br',
			DOWNLOAD_URL = '/pls/ap01/ap_proc100.dados_processos'

		if(doc === null){
			return
		}

		processo = {
			num_proc  : doc[2],
			dig_proc  : doc[3],
			ano_proc  : doc[4],
			num_orgao : doc[5],
			TRT_proc  : doc[6],
			vara_proc : doc[7]
		}

		var q = _.map(processo, function(v,k){ return k + '=' + v }).join('&'),
		link = 'http://' + REFERER + DOWNLOAD_URL + '?' + q

		app.launchURL(link)

		app.endPriv()

	}),

	launchEsij : app.trustedFunction(function () {

		app.beginPriv()

		var mask         = AcrobatJs.masks.processo.mask,
			processo     = this.documentFileName,
			doc          = processo.match(mask),
			REFERER      = 'aplicacao6.tst.jus.br/esij',
			DOWNLOAD_URL = '/ConsultarProcesso.do'

		if(doc === null){
			return
		}

		processo = {
			consultarNumeracao : 'Consultar',
			numProc            : doc[2],
			digito             : doc[3],
			anoProc            : doc[4],
			justica            : doc[5],
			numTribunal        : doc[6],
			numVara            : doc[7],
			codigoBarra        : ''
		}

		var q = _.map(processo, function(v,k){ return k + '=' + v }).join('&'),
		link = 'http://' + REFERER + DOWNLOAD_URL + '?' + q

		app.launchURL(link)

	}),

	sortBookmarks : function(root) {

		var returnTo = this.pageNum,
			chd      = root.children,
			names    = {},
			key, bm

		if(!chd) { return }

		for(key = 0; bm = chd[key++];) {
			bm.execute()
			bm.pageNum        = this.pageNum
			bm.order          = key
			names[bm.pageNum] = {}
			if (bm.children) {
				AcrobatJs.sortBookmarks(bm)
			}
		}

		chd.sort(function(a, b) {
			return a.pageNum - b.pageNum || a.order - b.order
		})

		for(key = 0; bm = chd[key++];) {
			if(names[bm.pageNum][bm.name] && !bm.children) {
				bm.remove()
				continue
			}
			root.insertChild(bm, chd.length)
			names[bm.pageNum][bm.name] = !0
		}

		this.pageNum = returnTo

	},

	addButton : function (cLabel, cExec, iconName) {

		var options = {
			cName   : _.uniqueId('button'),
			cLabel  : cLabel,
			cEnable : "event.rc = (event.target != null)",
			cExec   : cExec,
			nPos    : -1
		}

		if (iconName) {
			// options.oIcon = AcrobatJs.icons[iconName]
			options.oIcon = globalIcons.getIcon(iconName)
		}

		app.addToolButton(options)

	},

	addMenu : function (cLabel, cExec) {
		app.addMenuItem({
			cName: _.uniqueId('menu'),
			cUser: cLabel,
			cParent: "Tools",
			cEnable: "event.rc = (event.target != null)",
			cExec: cExec
		})
	},

	start : app.trustedFunction(function (config) {
		app.beginPriv();

		var atbPath = app.getPath({ cFolder : "javascript" });

		// var doc = app.openDoc({ cPath : atbPath + "/icons.pdf", bHidden : true });
		// AcrobatJs.icons = {}
		// _.each(doc.icons, function(icon) {
		// 	AcrobatJs.icons[icon.name] = util.iconStreamFromIcon( doc.getIcon(icon.name) );
		// })
		// doc.closeDoc();


		var commands = config.commands, tools = config.tools
		_.each(commands, function (command) {
			command = tools[command]
			AcrobatJs.addButton(command.cLabel, command.cExec, command.iconName)
			AcrobatJs.addMenu(command.cLabel, command.cExec)
		})


		app.endPriv();
	})
}

Utils.stickAll(AcrobatJs)
AcrobatJs.start(_config)
