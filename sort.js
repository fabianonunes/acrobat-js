
function sortBkm(root) {

	var returnTo = this.pageNum
		, chd = root.children
		, names = {}
		, key, bkm;

	if(!chd) { return; }

	for(key = -1; bkm = chd[++key];){
		bkm.execute();
		bkm.pageNum = this.pageNum;
		bkm.order = key;
		console.println(bkm.pageNum + ": " + bkm.name)
		names[bkm.pageNum] = {};
		bkm.children && sortBkm.call(this, bkm);
	}

	chd.sort(function(a, b){
		var p = a.pageNum - b.pageNum;
		return p ? p : a.order - b.order;
	});

	for(key = -1; bkm = chd[++key];){
		if(names[bkm.pageNum][bkm.name] && !bkm.children){
			bkm.remove();
		}  else {
			root.insertChild(bkm, chd.length);
		}
		names[bkm.pageNum][bkm.name] = true;
	}

	this.pageNum = returnTo;

}

app.addMenuItem({ 
	cName: "sortBkm", 
	cUser: "Ordenar Marcadores",
	cParent: "Tools", 
	cEnable: "event.rc = (event.target != null);",
	cExec: "sortBkm.call(this, this.bookmarkRoot);",
	nPos: 0 
});

app.addToolButton({
	cName: "sortBkmButton", 
	cLabel: "Ordenar Marcadores",
	cParent: "Tools", 
	cEnable: "event.rc = (event.target != null);",
	cExec: "sortBkm.call(this, this.bookmarkRoot);",
	nPos: -1 
});	

