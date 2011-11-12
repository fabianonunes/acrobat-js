

function sortByPageNumber(root) {

	var returnTo = this.pageNum
		, chd = root.children
		, stack = []
		, names = {}
		, key, value, pageNames;

	if(!chd) { return; }

	for(key = -1; value = chd[++key];){
		value.execute();
		value.pageNum = this.pageNum;		
		stack.push(value);
		value.children && sortByPageNumber(value);
	}

	stack.sort(function(a, b){ return a.pageNum - b.pageNum; });

	for(key = -1; value = stack[++key];){
		names[value.pageNum] || (pageNames = names[value.pageNum] = {});
		pageNames[value.name] || root.insertChild(value, chd.length);
		pageNames[value.name] = true;
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