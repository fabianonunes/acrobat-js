

function sortByPageNumber(root) {

	var returnTo = this.pageNum
		, chd = root.children
		, stack = []
		, names = {}
		, key, bkm;

	if(!chd) { return; }

	for(key = -1; bkm = chd[++key];){
		bkm.execute();
		bkm.pageNum = this.pageNum;		
		stack.push(bkm);
		bkm.children && sortByPageNumber(bkm);
		names[bkm.pageNum] = {};
	}

	stack.sort(function(a, b){ return a.pageNum - b.pageNum; });

	for(key = -1; bkm = stack[++key];){
		if(names[bkm.pageNum][bkm.name] && !bkm.children){
			bkm.remove();
		}  else {
			root.insertChild(bkm, chd.length);
		}
		names[bkm.pageNum][bkm.name] = true;
	}

	this.pageNum = returnTo;

}

sortByPageNumber.call(this, this.bookmarkRoot);
