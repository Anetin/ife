/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
console.log(aqiSourceData);

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var chart=document.getElementsByClassName('aqi-chart-wrap')[0];
  chart.innerHTML="";
  var color='',content='';
  for(var index in chartData){
    color='#'+Math.floor(Math.random() * 0xFFFFFF).toString(16);
    content+=' <span title=" '+index+':'+chartData[index]+' " style=" height: '+chartData[index]+'px;background-color:'+color+' "></span>';
  }
  chart.innerHTML=content;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var timegra=document.getElementsByName('gra-time');
  for(var i=0;i<timegra.length;i++)
    {
       if(timegra[i].checked){
          var nowtime = timegra[i].value;
       	break;
       }
    }
  if(nowtime != pageState.nowGraTime){
  	pageState.nowGraTime=nowtime;
  }

  // var timegra=document.getElementById('form-gra-time');
  // timegra.addEventListener('click',function (ev){
  // 	var ev=ev || window.event;
  // 	var target=ev.target || ev.srcElement;
  // 	if(target.value != pageState.nowGraTime){
  // 		pageState.nowGraTime=target.value;
  // 	}
  	console.log(pageState.nowGraTime);
  // });
  // 设置对应数据
initAqiChartData();


  // 调用图表渲染函数
  renderChart();
}

// graTimeChange();

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
	// debugger
  // 确定是否选项发生了变化 
  var citysel=document.getElementById('city-select');
  lastIndex = citysel.selectedIndex;
  var cityValue = citysel.options[lastIndex].value; 
  if (cityValue != pageState.nowSelectCity) {
  	pageState.nowSelectCity=cityValue;
  }
  console.log(pageState.nowSelectCity);


  // 设置对应数据
initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var chk=0;
	var values=['day','week','mouth'];
	var timegra=document.getElementsByName('gra-time');
	for(var i=0;i<timegra.length;i++){
          if(timegra[i].checked){
              chk = i;
              break;
          }
      }
      pageState.nowGraTime=values[chk];
      console.log(pageState.nowGraTime);

      var formtimegra=document.getElementById('form-gra-time');
      formtimegra.addEventListener('click',function (ev){
      	var ev=ev || window.event;
      	var target=ev.target || ev.srcElement;
      	if(target.name == 'gra-time'){
      		// pageState.nowGraTime=target.value;
	      	graTimeChange();
      	}
      });

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
var cities=[];
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citysel=document.getElementById('city-select');
  var j=0;
  var option="";
  for(var key in aqiSourceData){
  	cities.push(key);
  	option+="<option value=' "+j+" '> "+cities[j]+"</option>";
  	j++;
  }

  citysel.innerHTML=option;
  

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citysel.onchange=function  () {
  	citySelectChange();
  }

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // debugger
 var city=cities[parseInt(pageState.nowSelectCity)];
 var nowChartData=aqiSourceData[city]; 
 console.log(nowChartData);


 chartData={};
  if(pageState.nowGraTime == "day"){
  	chartData=nowChartData;
  }else if(pageState.nowGraTime == "week"){
      var dayindex=0;
      var weekindex=0;
      var sumVal=0;
  	for(var item in nowChartData){
        sumVal+=nowChartData[item];
        dayindex++;
        if((new Date(item).getDay()) ==6){
          weekindex++;
          chartData['NO'+weekindex+'week']=Math.floor(sumVal/dayindex);
          sumVal=0;
          dayindex=0;
        }
  	}
    if(dayindex!=0){//最后一周不满7天
      weekindex++;
      chartData['NO'+weekindex+'week']=Math.floor(sumVal/dayindex);
    }
  }else if(pageState.nowGraTime =="mouth"){
    // debugger
      var sumMouth=0, daysum=0, mouth=0;
      for(var index in nowChartData){
          sumMouth+=nowChartData[index];
          daysum++;
          if ((new Date(index)).getMonth()!=mouth) {
            mouth++;
            chartData['NO'+mouth+'mouth']=Math.floor(sumMouth/daysum);
            sumMouth=0;
            daysum=0;
          }    
      }

      if (daysum!=0) {
        mouth++;
        chartData['NO'+mouth+'mouth']=Math.floor(sumMouth/daysum);
      }
  }

  
  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
   renderChart();
}

init();