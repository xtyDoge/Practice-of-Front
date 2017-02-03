// 设计模式
// 1 用数组存储需要显示的数据
// 2 按钮负责变化上述数组 而不是变化DOM
// 3 结束后统一刷新 DOM & CSS



//获取到方框中输入的数字
var digitInput = document.getElementById("new_digit");
var displayArea = document.getElementById("display_area");
var styleArea = document.getElementsByTagName("style")[0];
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
    	if (digitIn > 100 || digitIn < 10) {
    		alert("输入数字不在规定范围！");
    		return false;
    	}
    	else {
    		return true;
    	}
    }
    //alert("您刚刚输入了" + digitIn + "!");
}

//更新DOM
function render() {
	
	var leftValue = 20;
	var items = "";
	var cssItems = "";

	//更新HTML DOM
	for (var i in digitArray) {
		 items += "<div id = 'rect" + i +  "'>" + digitArray[i] + "</div>";
		 cssItems += "#display_area #rect" + i + " {height: " + digitArray[i] * 4 + "px;left: " + (leftValue + i * 40) + "px;} ";
	}
    displayArea.innerHTML = items;

    //更新CSS
	styleArea.innerHTML = cssItems;

}

//绑定按键方法
function leftIn(){
	if (inputCheck(digitInput.value)) {
		digitArray.unshift(digitInput.value);
		render();
	}
	digitInput.value = "";
}

function rightIn(){
	if (inputCheck(digitInput.value)) {
		digitArray.push(digitInput.value);
		render();
	}
	digitInput.value = "";
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

function sortDigitArray () {
	digitArray.sort();       //要求自己写一个排序函数也行 比如冒泡排序 大一学的都忘了 = =
	render(); 
}

function init(){
	document.getElementById("left_in").addEventListener("click", leftIn);
	document.getElementById("right_in").addEventListener("click", rightIn);
	document.getElementById("left_out").addEventListener("click", leftOut);
	document.getElementById("right_out").addEventListener("click", rightOut);
	document.getElementById("sort").addEventListener("click",sortDigitArray);
}

init();