/*
 acrobat-js - http://github.com/fabianonunes/acrobat-js
 Copyright (c) 2011, Fabiano Nunes
 Released under the BSD License.
*/

function sortBkm(root) {

	var returnTo = this.pageNum
		, chd = root.children
		, names = {}
		, key, bm;

	if(!chd) { return; }

	for(key = 0; bm = chd[key++];){
		bm.execute();
		bm.pageNum = this.pageNum;
		bm.order = key;
		names[bm.pageNum] = {};
		bm.children && sortBkm.call(this, bm);
	}

	chd.sort(function(a, b){
		return a.pageNum - b.pageNum || a.order - b.order;
	});

	for(key = 0; bm = chd[key++];){
		if(names[bm.pageNum][bm.name] && !bm.children){
			bm.remove();
			continue;
		}
		root.insertChild(bm, chd.length);
		names[bm.pageNum][bm.name] = true;
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
