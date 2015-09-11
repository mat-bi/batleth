google.load('visualization', '1.0', {'packages':['corechart']});
google.setOnLoadCallback(init);

window.chart_page = 1;
window.chart_days = 1;
window.from = 0;
window.to = 0;
window.prediction = 0;
window.l = 0;
window.window.data = "";
function init()
{
  ch(0);
}

function ch(l)
{
  window.l = l;
  var tmp = Math.floor(new Date().getTime()/1000);
  window.from = tmp-(window.chart_page+l)*(window.chart_days)*24*60*60;
  window.to = tmp-(window.chart_page+l-1)*(window.chart_days)*24*60*60;
  
	$.get("/chart/show/"+from+"/"+to, 
  		function(d) {
  			var js = d.records;
  			
  			window.data = new google.visualization.DataTable();
  			window.data.addColumn('datetime', 'Time');
  window.data.addColumn('number', 'Percent');
  window.data.addColumn('number', 'Estimate');
  			var z = new moment(from*1000).utc();
  			window.data.addRow([new Date(z.year(), z.month(), z.date(), z.hour(), z.minute(),0), null, null]);
  			var z = new moment(to*1000).utc();
  			window.data.addRow([new Date(z.year(), z.month(), z.date(), z.hour(), z.minute(),0), null, null]);
 			for(var i = 0; i < js.length; ++i)
  				{
  					var zm = new moment(js[i].timestamp*1000).utc();
  					if((i+1 < js.length && js[i+1].timestamp-js[i].timestamp > 70) )
  					{
  						var zm1 = new moment((js[i].timestamp+1)*1000).utc();
  						window.data.addRow([new Date(zm1.year(), zm1.month(), zm1.date(), zm1.hour(), zm1.minute()), null, null]);
  					}
  					   if ((i-1) >= 0 && js[i].timestamp - js[i-1].timestamp > 70)
  					   {
  					   	var zm1 = new moment((js[i+1].timestamp-1)*1000).utc();
  						window.data.addRow([new Date(zm1.year(), zm1.month(), zm1.date(), zm1.hour(), zm1.minute()), null, null]);
  					   }
  					window.data.addRow([new Date(zm.year(), zm.month(), zm.date(), zm.hour(), zm.minute(), 0), js[i].pr, null]);
  				}
  			var options = 
  				{
   					 vAxis: {titleTextStyle:{fontSize: 20, bold: true}, title: 'Battery level (%)', minValue: 0, maxValue: 100},
				         seriesType: 'area', series: {0: {labelInLegend: 'Real battery level', color: '#03a9f4', areaOpacity: 0.6, curveType: 'function'}, 1: {type: 'line', color: 'black', labelInLegend: 'Estimated battery level'}},
    interpolateNulls: false, height: 500,
    animation:
    {
      duration: 1000,
      easing: 'out'
    }
  };
  var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
  var btnback = document.getElementById('btn-back');
  var btnforward = document.getElementById('btn-forward');
  function drawChart()
  {
    chart.draw(window.data, options);
  }
  
  btnback.onclick = function()
  {
    //tutaj bierzemy starsze qwerty, wywalamy backwindow.data
    //backwindow.data(window.data);
    ch(1);
  }
  if(window.chart_page + l == 1){
      btnforward.onclick = function()
      {
        ch(0);
      }}
  else {
      btnforward.onclick = function(){
       ch(-1);
  }}
 if((window.chart_page + window.l) === 1 && (d.prediction.status == "Discharging" || d.prediction.status == "Charging") && d.prediction.time !== "Unknown")
 {
 		/*alert(d.prediction.time);
 		var n = new moment((js[js.length-1].time+2)*1000).utc();
 		window.data.addRow([new Date(n.year(), n.month(), n.date(), n.hour(), n.minute(), n.second()), js[js.length-1].pr, js[js.length-1].pr]);*/
 		var n = new moment(d.prediction*1000+new Date().getTime()).utc();
 		var pr = 0;
 		if(d.prediction.status == "Charging")
 			pr = 100;
 		window.data.addRow([new Date(n.year(), n.month(), n.date(), n.hour(), n.minute(), n.second()), pr, pr]);
 		
 } 
 drawChart();
 window.chart_page += l;
}).error(function() { alert("error");});
}

/*
//przykładowe, do wywalenia
function addwindow.data(window.data)
{

  window.data.addColumn('datetime', 'Time');
  window.data.addColumn('number', 'Percent');
  window.data.addColumn('number', 'Estimate');
  var tmp = Math.floor(new Date().getTime()/1000);
  
  	//console.log(window.qwerty);

  	for(var i = 0; i < window.qwerty.length; ++i)
  		{
  			console.log(window.qwerty[i]);
  			var zm = new Date(window.qwerty[i].timestamp*1000);
  			console.log(zm.getUTCMinutes());
  			window.data.addRow([new Date(zm.getUTCFullYear(), zm.getUTCMonth(), zm.getUTCDay(), zm.getUTCHours(), zm.getUTCMinutes(), 0), 5, 5]);
  		}
  		
  		
*/  		
  		
  		
  		
  		
  		
  		
  		
  		
  		
  		
  		
  		
  	/*
  		alert(js[0].pr);
  		for(var i = 0; i < js.length; ++i)
  		{
  			console.log(js[i]);
  			var zm = new Date(js[i].timestamp*1000);
  			console.log(zm.getUTCMinutes());
  			window.data.addRow([new Date(zm.getUTCFullYear(), zm.getUTCMonth(), zm.getUTCDay(), zm.getUTCHours(), zm.getUTCMinutes(), 0), 5, 5]);
  		}});*/
  		//.error(function() { alert("Error");});
  		
  
  /*var charge = 8;
  
  for(var j = 11; j<13; j++)
  {
    for(var i = 0; i<59; i++)
    {
      charge += Math.trunc((i%3)/2);
      window.data.addRow([new Date(2015, 7, 20, j, i, 0), charge, charge]);
    }
  }
  
  window.data.addRow([new Date(2015, 7, 20, 13), null, null]);
  
  for(var j = 14; j < 16; j++)
  {
    for(var i = 0; i < 59; i+=5)
    {
      charge -= Math.trunc((i%3)/2);
      window.data.addRow([new Date(2015,7, 20, j, i), charge, charge]);
    }
  }
  
  for(var j = 16; j < 17; j++)
  {
    for(var i = 0; i < 59; i+=5)
    {
      charge -= Math.trunc((i%3)/2);
      window.data.addRow([new Date(2015, 7, 20, j, i), null, charge]);
    }
  }*/
  
  //alert(new Date().getTime());
//}

/*function backwindow.data(window.data)
{
 	for(var i = 0; i < window.data.getNumberOfRows(); i++)
 	{
   		window.data.setValue(i,2,window.data.getValue(i,2)+30);
 	}
}*/
