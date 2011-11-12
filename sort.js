

function sortByPageNumber(root) {

	var returnTo = this.pageNum
	, chd = root.children
	, stack = []
	, i, bk;

	if(!chd) { return; }

	for(i = -1; bk = chd[++i];){
		bk.execute();
		bk.pageNum = this.pageNum;		
		stack.push(bk);
		bk.children && sortByPageNumber(bk);
	}

	stack.sort(function(a, b){ return a.pageNum - b.pageNum; });

	var names = {}, pageNames;

	for(i = -1; bk = stack[++i];){
		names[bk.pageNum] || (pageNames = names[bk.pageNum] = {});
		!pageNames[bk.name] && root.insertChild(bk, chd.length);
		pageNames[bk.name] = true;
	}

	this.pageNum = returnTo;

}

sortByPageNumber.call(this, this.bookmarkRoot);

//app.getPath("app", "javascript");
// app.addToolButton({
// cName: "atbToolButton1",
// oIcon: oIcon,
// cExec: "atbTask1();",
// cTooltext: "My toolbar button 1",
// nPos: 0
// });