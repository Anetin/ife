var listData=[];

function renderList(listData) {
	var ul=document.getElementById('data_list');
	ul.innerHTML='';
	var li='';
	if (listData.length<1) {
		return false;
	}
	for (var i = 0; i < listData.length; i++) {
		li+='<li>'+listData[i]+'</li>';
	}
	// console.log(li);
	ul.innerHTML=li;
}

function getNewData() {
	var inputData=document.getElementById('inputData').value.trim();
	console.log(inputData);
	
	return inputData;
}
/*************************leftIn*************************/
function leftIn() {
	var inputData=getNewData();
	if (!inputData || isNaN( inputData )) {
		alert('请输入数字');
		return false;
	}
	var leftInList=listData.splice(0,0,inputData);
	console.log(listData);
	renderList(listData);
}

var left_in=document.getElementById('left_in');
left_in.addEventListener("click",function  (ev) {
 	 	leftIn();
 });
/*************************rightIn*************************/
function rightIn() {
	var inputData=getNewData();
	if (!inputData || isNaN( inputData )) {
		alert('请输入数字');
		return false;
	}
	var rightInList=listData.push(inputData);
	console.log(listData);
	renderList(listData);
}

var right_in=document.getElementById('right_in');
right_in.addEventListener("click",function  (ev) {
 	 	rightIn();
 });

/*************************leftOut*************************/
function leftOut() {
	// console.log(inputData);
	// var inputData=getNewData();
	// console.log(inputData);
	var leftOutList=listData.splice(0,1);
	// leftOutList.unshift(inputData);
	console.log(listData);
	renderList(listData);
}

var left_out=document.getElementById('left_out');
left_out.addEventListener("click",function  (ev) {
 	 	leftOut();
 });
/*************************rightOut*************************/
function rightOut() {
	var inputData=getNewData();
	var rightOutList=listData.pop(inputData);
	console.log(listData);
	renderList(listData);
}

var right_out=document.getElementById('right_out');
right_out.addEventListener("click",function  (ev) {
 	 	rightOut();
 });

/*************************deleteItem*************************/
// function deleteItem() {
	var ul=document.getElementById('data_list');
	ul.addEventListener("click",function  (ev) {
		console.log(ul.children);
	 	var ev=ev||windoe.event;
	 	var target=ev.target|| ev.srcElement;
	 	console.log(target);
	 	var ul_li=target;
	 	for (var i = 0; i < ul.children.length ; i++) {
	 		if (ul_li === ul.children[i]) {
	 			// console.log(i);
	 			listData.splice(i,1);
	 		}
	 	}
	 	ul.removeChild(ul_li);
	 });
// }