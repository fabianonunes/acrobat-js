/*global app, AcrobatJs, _*/

var _config = {
	paths : {
		1 : '/r/APLICATIVOS/Certidoes/status_1.pdf',
		6 : '/r/APLICATIVOS/Certidoes/status_6.pdf',
		7 : '/c/status_7.pdf'
	},
	commands : [ // Uncomment for enable
		'sort',
		'attachStatus6',
		'inlineStatus2',
		'inlineStatus6',
		'inlineStatus1'
	],
	tools : {
		sort : { // Ordenar marcadores
			cLabel : "Ordenar &Marcadores",
			cExec : "AcrobatJs.sortBookmarks(this.bookmarkRoot)"
		},
		attachStatus6 : { // Certidão 6 Apartada
			cExec : "AcrobatJs.createCert(6, _config.paths[6])",
			cLabel : "Certid\u00e3o - Status &6 (Apartada)"
		},
		inlineStatus6 : { // Certidão 6 Apensada
			cLabel : "Certid\u00e3o - Status &6",
			cExec : "AcrobatJs.addCert(6, _config.paths[6])"
		},
		inlineStatus1 : { // Certidão 1 Apensada
			cLabel : "Certid\u00e3o - Status &1",
			cExec : "AcrobatJs.addCert(1, _config.paths[1])"
		},
		inlineStatus2 : { // Certidão 2 Apensada
			cLabel : "Certid\u00e3o - Peti\u00e7\u00e3o",
			cExec : "AcrobatJs.addCert(2, _config.paths[2], 'peticao')"
		}
	}
}
