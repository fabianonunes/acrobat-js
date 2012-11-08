/*global app, AcrobatJs, _*/

var _config = {
	paths : {
		6 : '/c/status_6.pdf',
		8 : '/c/status_1.pdf'
	},
	commands : [
		'ok',
		'retorno',
		'query',
		'esij'
	],
	tools : {
		ok : {
			cLabel : "Certid\u00e3o",
			cExec : "AcrobatJs.addCert(7, _config.paths[7])",
			iconName : "page_white_go"
		},
		retorno : {
			cLabel : "Certid\u00e3o - Incompleto/Ilegivel",
			cExec : "AcrobatJs.addCert(6, _config.paths[6])",
			iconName : "document_mark_as_final"
		},
		query : {
			cLabel : "Consulta Processual",
			cExec : "AcrobatJs.launchQuery()",
			iconName : "table_tab_search"
		},
		esij : {
			cLabel : "e-SIJ",
			cExec : "AcrobatJs.launchEsij()",
			iconName : "monitor_go"
		}
	}
}

