/*global app*/

var ConfigJs = {
	paths : {
		1 : '/r/APLICATIVOS/Certidoes/status_1.pdf',
		7 : '/r/APLICATIVOS/Certidoes/status_6.pdf',
		6 : '/c/status_7.pdf'
	}
}

var cEnable = "event.rc = (event.target != null)",
	cExec = "AcrobatJs.sortBookmarks(this.bookmarkRoot)",
	cLabel = "Ordenar &Marcadores"

app.addMenuItem({
	cName: "sortBookmarks",
	cUser: cLabel,
	cParent: "Tools",
	cEnable: cEnable,
	cExec: cExec
})

app.addToolButton({
	cName: "sortBkmButton",
	cLabel: cLabel,
	cEnable: cEnable,
	cExec: cExec,
	nPos: -1
})

app.addMenuItem({
	cName: "addCert6",
	cUser: "Certid\u00e3o - Status &6",
	cParent: "Tools",
	cEnable: cEnable,
	cExec: "AcrobatJs.createCert(6, ConfigJs.paths[6])"
})

app.addToolButton({
	cName: "addCert6Button",
	cLabel: "Certid\u00e3o - Status 6",
	cEnable: cEnable,
	cExec: "AcrobatJs.createCert(6, ConfigJs.paths[6])",
	nPos: -1
})

app.addMenuItem({
	cName: "addCert1",
	cUser: "Certid\u00e3o - Status &1",
	cParent: "Tools",
	cEnable: cEnable,
	cExec: "AcrobatJs.addCert(1, ConfigJs.paths[1])"
})

app.addToolButton({
	cName: "addCert1Button",
	cLabel: "Certid\u00e3o - Status 1",
	cEnable: cEnable,
	cExec: "AcrobatJs.addCert(1, ConfigJs.paths[1])",
	nPos: -1
})

app.addMenuItem({
	cName: "addCert2",
	cLabel: "Certid\u00e3o - Peti\u00e7\u00e3o",
	cParent: "Tools",
	cEnable: cEnable,
	cExec: "AcrobatJs.addCert(2, ConfigJs.paths[2], 'peticao')"
})

app.addToolButton({
	cName: "addCert2Button",
	cLabel: "Certid\u00e3o - Peti\u00e7\u00e3o",
	cEnable: cEnable,
	cExec: "AcrobatJs.addCert(2, ConfigJs.paths[2], 'peticao')",
	nPos: -1
})
