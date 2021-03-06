/*global app, AcrobatJs, _*/

var _config = {
	paths : {
		6 : '/p/status_6.pdf',
		7 : '/p/status_7.pdf',
		8 : '/p/status_8.pdf'
	},
	commands : [ 'ccadp', 'retorno', 'query', 'esij' ],
	tools : {
		ccadp : {
			cLabel : "Certid\u00e3o",
			cExec : "AcrobatJs.addCert(7, _config.paths[7])",
			iconName : "page_white_go"
		},
		retorno : {
			cLabel : "Certid\u00e3o - N\u00e3o cumprida",
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

