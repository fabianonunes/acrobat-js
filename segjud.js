/*global app, AcrobatJs, _*/

var _config = {
	paths : {
		7 : '/p/status_7.pdf',
		8 : '/p/status_8.pdf'
	},
	commands : [ 'cpe', 'ccadp', 'query', 'esij' ],
	tools : {
		cpe : {
			cLabel : "Certid\u00e3o - CPE",
			cExec : "AcrobatJs.createCert(8, _config.paths[8])"
		},
		ccadp : {
			cLabel : "Certid\u00e3o - CCADP",
			cExec : "AcrobatJs.addCert(7, _config.paths[7])"
		},
		query : {
			cLabel : "Consulta Processual",
			cExec : "AcrobatJs.launchQuery()"
		},
		esij : {
			cLabel : "e-SIJ",
			cExec : "AcrobatJs.launchEsij()"
		}
	}
}
