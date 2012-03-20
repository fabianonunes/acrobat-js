/*global app*/
var ConfigJs = {
	paths : {
		7 : '/p/status_7.pdf',
		8 : '/p/status_7.pdf'
	}
}

app.addToolButton({
	cName: "launchQueryButton",
	cLabel: "Consulta Processual",
	cEnable: "event.rc = (event.target != null)",
	cExec: "AcrobatJs.launchQuery()",
	nPos: -1
})

app.addToolButton({
	cName: "launchEsijButton",
	cLabel: "e-SIJ",
	cEnable: "event.rc = (event.target != null)",
	cExec: "AcrobatJs.launchEsij()",
	nPos: -1
})

app.addToolButton({
	cName: "addCert7Button",
	cLabel: "Adicionar Certid\u00e3o - CCADP",
	cEnable: "event.rc = (event.target != null)",
	cExec: "AcrobatJs.addCert(7, ConfigJs.paths[7])",
	nPos: -1
})

app.addToolButton({
	cName: "createCertButton",
	cLabel: "Criar certid\u00e3o - CPE",
	cEnable: "event.rc = (event.target != null)",
	cExec: "AcrobatJs.createCert(8, ConfigJs.paths[8])",
	nPos: -1
})