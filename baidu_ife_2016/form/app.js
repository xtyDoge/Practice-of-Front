
var input = document.getElementById("input_value");
var inputValue = input.value;
var namebtn = document.getElementById("namebtn");

var lengthChecker = function(){
	if (inputValue.length == 0) {
		return "不能闷声大发财！";
	}

	if (inputValue.length >= 4 && inputValue.length <= 8) {
		return "这是坠吼的！";
	}

	return "这没有按照香港的法！";
}

var displayAdaptor = function(){
	alert(lengthChecker());
}


function init(){

	namebtn.addEventListener("click",displayAdaptor);
}

init();


	
