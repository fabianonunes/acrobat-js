
function sortBkm(root) {

	var returnTo = this.pageNum
		, chd = root.children
		, names = {}
		, key, bkm;

	if(!chd) { return; }

	for(key = 0; bkm = chd[key++];){
		bkm.execute();
		bkm.pageNum = this.pageNum;
		bkm.order = key;
		names[bkm.pageNum] = {};
		bkm.children && sortBkm.call(this, bkm);
	}

	chd.sort(function(a, b){
		var p = a.pageNum - b.pageNum;
		return p ? p : a.order - b.order;
	});

	for(key = 0; bkm = chd[key++];){
		if(names[bkm.pageNum][bkm.name] && !bkm.children){
			bkm.remove();
			continue;
		}
		root.insertChild(bkm, chd.length);
		names[bkm.pageNum][bkm.name] = true;
	}

	this.pageNum = returnTo;

}

var cEnable = "event.rc = (event.target != null);"
	, cExec = "sortBkm.call(this, this.bookmarkRoot);"
	, cLabel = "Ordenar Marcadores";

app.addMenuItem({ 
	cName: "sortBkm", 
	cUser: cLabel,
	cParent: "Tools", 
	cEnable: cEnable,
	cExec: cExec,
	nPos: 0 
});

app.addToolButton({
	cName: "sortBkmButton", 
	cLabel: cLabel,
	cEnable: cEnable,
	cExec: cExec,
	nPos: -1 
});	
