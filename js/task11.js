var btn = document.getElementsByTagName('input'),
	preBtn = btn[0],
	postBtn = btn[1],
	searchBtn = btn[3],
	treeRoot = document.getElementsByClassName('root')[0],
	divList = [],
	timer = null,
	tempNode = null;


window.onload = function (){
	preBtn.onclick = function () {
		reset();
		preOrder(treeRoot);
		changeColor();
	}
	postBtn.onclick = function () {
		reset();
		postOrder(treeRoot);
		changeColor();
	}
	searchBtn.onclick = function() {
		var	keyIn = document.getElementById("search").value;
		reset();
		searchNode(treeRoot,keyIn);
	}
}

//深度优先
function preOrder(node) {
	if (!(node == null)) {
		divList.push(node);
	for (var i = 0; i <= node.children.length - 1; i++) {
		preOrder(node.children[i]);
	}

	}
}


//后序遍历
function postOrder(node) {
	if (!(node == null)) {
		for (var i = node.children.length - 1; i >= 0; i--) {
		preOrder(node.children[i]);
		}
		divList.push(node);
	}
}

//查询节点
function searchNode(node,content){
	var capturedFlag = false;
	preOrder(node);
	for(var i in divList){
		if (divList[i].innerText == content) {   //老是报错 狗日的 哪里没加载？ 后面都出来了 干
			tempNode = divList[i];
			divList = [];
			divList.push(tempNode);       
			alert("找到了" + divList[0].innerText + "!");
			capturedFlag = true;
		}
	}
	if (capturedFlag == false) {
		divList = [];
		alert("不存在这个节点！");
	}
	changeColor();
}

//颜色变化函数
function changeColor() {   
	var i = 0;
	divList[i].style.backgroundColor = 'blue'  
	timer = setInterval(function (argument) {   //setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
		i++;
		if (i < divList.length) {
			divList[i-1].style.backgroundColor = '#fff';
			divList[i].style.backgroundColor = 'blue';
		} else {
			clearInterval(timer);
			divList[divList.length-1].style.backgroundColor = '#fff';
		}
	},500)
}

//初始化样式
function reset() {
	divList = [];
	clearInterval(timer);
	var divs = document.getElementsByTagName('div');
	for (var i = 0; i < divs.length; i++) {
		divs[i].style.backgroundColor = '#fff';
	}
}