// 设计模式
// 1 用数组存储需要显示的数据
// 2 按钮负责变化上述数组 而不是变化DOM
// 3 结束后统一变化DOM



//获取到方框中输入的数字
var digitInput = document.getElementById("new_digit");
var displayArea = document.getElementById("display_area");
//需要显示的数字
var digitArray = [];

//输入检测
function inputCheck(digitIn){
	digitIn = digitIn.trim(); 
	if(!digitIn.match(/^\d+$/)) {
        alert("输入必须为整数！");
        return false;
    }
    else {
    	return true;
    }
    //alert("您刚刚输入了" + digitIn + "!");
}

//更新DOM
function render() {
	var items = "";
	//alert("队列中有" + digitArray + "!");
	for (var i in digitArray) {
		 items += "<div>" + digitArray[i] + "</div>";
	}

    displayArea.innerHTML = items;
    digitInput.value = "";

}

//绑定按键方法
function leftIn(){
	if (inputCheck(digitInput.value)) {
		digitArray.unshift(digitInput.value);
		render();
	}
	
}

function rightIn(){
	if (inputCheck(digitInput.value)) {
		digitArray.push(digitInput.value);
		render();
	}
}

function leftOut(){
	if (digitArray.length == 0) {
		alert("已经没有数字了！");
		return;
	}
	digitArray.shift();
	render();
}

function rightOut(){
	if (digitArray.length == 0) {
		alert("已经没有数字了！");
		return;
	}
	digitArray.pop();
	render();
}

function init(){
	document.getElementById("left_in").addEventListener("click", leftIn);
	document.getElementById("right_in").addEventListener("click", rightIn);
	document.getElementById("left_out").addEventListener("click", leftOut);
	document.getElementById("right_out").addEventListener("click", rightOut);
}

init();