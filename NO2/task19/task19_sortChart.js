(function () {
	var rawData=[18,12,67,52,34,25,79];
	var ul_chart=document.getElementsByClassName("chart")[0];
	// console.log(ul_chart.scrollWidth-20);
	var ul_width=ul_chart.scrollWidth-20;
	li_width=ul_width/rawData.length;
	function renderChart(data) {
		ul_chart.innerHTML='';
		for (var i = 0; i < data.length ; i++) {
			var li=document.createElement("li");
			li.style.height=data[i]*2+'px';
			li.style.width=li_width+'px';
			var t=document.createTextNode(data[i]);
			li.appendChild(t);
			ul_chart.appendChild(li);
		}
	}
	renderChart(rawData);
	function bubble(data) {
		var tmp=0;
		for (var i = 0; i < data.length-1; i++) {
			for (var j = 0; j < data.length-1-i ; j++) {
				// debugger
				if (data[j] > data[j+1]) {
					tmp=data[j];
					data[j]=data[j+1];
					data[j+1]=tmp;
				}
				renderChart(data);
				var tt=setTimeout(renderChart(data),1000);
				// var tt=setInterval(function(){
				// 	if (data[j] > data[j+1]) {
				// 		tmp=data[j];
				// 		data[j]=data[j+1];
				// 		data[j+1]=tmp;
				// 	}
				// 	renderChart(data);
				// },1000);
			}
		}
		return data;
	}

	orderData=bubble(rawData);
	console.log(orderData);
})();