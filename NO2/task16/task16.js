/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {
	// "北京": 90,
	// "上海": 40
};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	// var data={};
	var city=document.getElementById('aqi-city-input').value.trim();
	var air=document.getElementById('aqi-value-input').value.trim();
	
	// data[city]=air;
	// aqiData=JSON.stringify(data);//用于将 JavaScript 值转换为 JSON 字符串。
	if (validate(city,air)) {
		air=Number(air);
		aqiData[city]=air;

		console.log(aqiData);
		document.getElementById('aqi-city-input').value=" ";
		document.getElementById('aqi-value-input').value=" ";
	}
}

// 输入验证
function validate(city,air){
	var city=city;
	var air=air;
	var cityPattern=/^[\u4e00-\u9fa5a-zA-Z]+$/;
	var airPattern=/^\d+$/;
	var cptn=cityPattern.test(city);
	var aptn=airPattern.test(air);
	var label1=document.getElementById('cityerror');
	var label2=document.getElementById('airerror');
	if (!cptn) {		
		removeClass(label1,'hidden');
		addClass(label1,'show');
	}else{
		addClass(label1,'hidden');
		removeClass(label1,'show');
	}

	if (!aptn) {
		removeClass(label2,'hidden');
		addClass(label2,'show');
	}else{
		removeClass(label2,'show');
		addClass(label2,'hidden');
	}

	if (!cptn || !aptn) {
		return false;
	}else{
		return true;
	}
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

	var table=document.getElementById('aqi-table');
	var tbody=document.createElement('tbody');
	table.innerHTML="";
	var tr="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	// var data=JSON.stringify(aqiData).split(',');
	// var data=JSON.parse(aqiData).split(',');
	// for (var i = 0; i < data.length; i++) {
	// 	tr+="<tr><td>"+data[i].slice(2,4)+"</td>"+"<td>"+data[i].slice(data[i].length-3,data[i].length-1)+"</td>"+"<td><button>删除</button></td></tr>";
	// 	}
	for(var city in aqiData){
		tr+="<tr><td>"+city+"</td>"+"<td>"+aqiData[city]+"</td>"+"<td><button city="+city+">删除</button></td></tr>";
	}

		tbody.innerHTML=tr;
		table.appendChild(tbody);
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
 var etable=document.getElementsByTagName('table')[0];
 etable.addEventListener("click",function  (ev) {
 	var ev=ev||windoe.event;
 	var target=ev.target|| ev.srcElement;
 	 if (target.nodeName.toLowerCase() == 'button') {
 	 	var data=target.attributes.city.value;
 	 	console.log(data);
 	 	delete aqiData[data];
 	 }
	  renderAqiList();
 });
}

function init() {
// debugger
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var btn=document.getElementById('add-btn');
  btn.addEventListener("click",function(){
	 var city=document.getElementById('aqi-city-input').value.trim();
	 var air=Number(document.getElementById('aqi-value-input').value.trim());
  	if (validate(city,air)) {
  	addBtnHandle();
  	}
  		
  });
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  delBtnHandle();

}

init();

function hasClass(elements, cName) {
    return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)")); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断 
}



function addClass(elements, cName) {
    if (!hasClass(elements, cName)) {
        elements.className += " " + cName;
    }
}

function removeClass(elements, cName) {
    if (hasClass(elements, cName)) {
        elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " "); 
    }
}
