var ConfigJs = {
	paths : {
		1 : '/r/APLICATIVOS/Certidoes/status_1.pdf',
		6 : '/r/APLICATIVOS/Certidoes/status_6.pdf',
		7 : '/p/status_7.pdf'
	}
};

app.addToolButton({
	cName: "launchQueryButton",
	cLabel: "Consulta Processual",
	cEnable: "event.rc = (event.target != null);",
	cExec: "AcrobatJs.launchQuery();",
	nPos: -1
});

app.addToolButton({
	cName: "launchEsijButton",
	cLabel: "e-SIJ",
	cEnable: "event.rc = (event.target != null);",
	cExec: "AcrobatJs.launchEsij();",
	nPos: -1
});

app.addToolButton({
	cName: "addCert7Button",
	cLabel: "Certid\u00e3o",
	cEnable: "event.rc = (event.target != null);",
	cExec: "AcrobatJs.addCert(7, ConfigJs.paths[7]);",
	nPos: -1
});
