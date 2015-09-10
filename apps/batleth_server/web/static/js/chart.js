google.load('visualization', '1.0', {'packages':['corechart']});
google.setOnLoadCallback(init);

function init()
{
	
  var tmp = Math.floor(new Date().getTime()/1000);
	$.get("/battery/show/"+(tmp-24*60*60)+"/"+tmp, 
  		function(js) {
  		
  			var data = new google.visualization.DataTable();
  			data.addColumn('datetime', 'Time');
  data.addColumn('number', 'Percent');
  data.addColumn('number', 'Estimate');
 			for(var i = 0; i < js.length; ++i)
  				{
  					var zm = new moment(js[i].timestamp*1000).utc();
  					if((i+1 < js.length && js[i+1].timestamp-js[i].timestamp > 70) )
  					{
  						var zm1 = new moment((js[i].timestamp+1)*1000).utc();
  						data.addRow([new Date(zm1.year(), zm1.month(), zm1.date(), zm1.hour(), zm1.minute()), null, null]);
  					}
  					   if ((i-1) >= 0 && js[i].timestamp - js[i-1].timestamp > 70)
  					   {
  					   	var zm1 = new moment((js[i+1].timestamp-1)*1000).utc();
  						data.addRow([new Date(zm1.year(), zm1.month(), zm1.date(), zm1.hour(), zm1.minute()), null, null]);
  					   }
  					data.addRow([new Date(zm.year(), zm.month(), zm.date(), zm.hour(), zm.minute(), 0), js[i].pr, null]);
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
    chart.draw(data, options);
  }
  
  btnback.onclick = function()
  {
    //tutaj bierzemy starsze qwerty, wywalamy backdata
    //backData(data);
    drawChart();
  }
  
  btnforward.onclick = function()
  {
    //tutaj bierzemy nowsze qwerty;
    drawChart();
  }
 drawChart();
}).error(function() { alert("error");});
}


//przykładowe, do wywalenia
function addData(data)
{

  data.addColumn('datetime', 'Time');
  data.addColumn('number', 'Percent');
  data.addColumn('number', 'Estimate');
  var tmp = Math.floor(new Date().getTime()/1000);
  
  	//console.log(window.qwerty);
/*
  	for(var i = 0; i < window.qwerty.length; ++i)
  		{
  			console.log(window.qwerty[i]);
  			var zm = new Date(window.qwerty[i].timestamp*1000);
  			console.log(zm.getUTCMinutes());
  			data.addRow([new Date(zm.getUTCFullYear(), zm.getUTCMonth(), zm.getUTCDay(), zm.getUTCHours(), zm.getUTCMinutes(), 0), 5, 5]);
  		}
  		
  		
*/  		
  		
  		
  		
  		
  		
  		
  		
  		
  		
  		
  		
  		
  	/*
  		alert(js[0].pr);
  		for(var i = 0; i < js.length; ++i)
  		{
  			console.log(js[i]);
  			var zm = new Date(js[i].timestamp*1000);
  			console.log(zm.getUTCMinutes());
  			data.addRow([new Date(zm.getUTCFullYear(), zm.getUTCMonth(), zm.getUTCDay(), zm.getUTCHours(), zm.getUTCMinutes(), 0), 5, 5]);
  		}});*/
  		//.error(function() { alert("Error");});
  		
  
  /*var charge = 8;
  
  for(var j = 11; j<13; j++)
  {
    for(var i = 0; i<59; i++)
    {
      charge += Math.trunc((i%3)/2);
      data.addRow([new Date(2015, 7, 20, j, i, 0), charge, charge]);
    }
  }
  
  data.addRow([new Date(2015, 7, 20, 13), null, null]);
  
  for(var j = 14; j < 16; j++)
  {
    for(var i = 0; i < 59; i+=5)
    {
      charge -= Math.trunc((i%3)/2);
      data.addRow([new Date(2015,7, 20, j, i), charge, charge]);
    }
  }
  
  for(var j = 16; j < 17; j++)
  {
    for(var i = 0; i < 59; i+=5)
    {
      charge -= Math.trunc((i%3)/2);
      data.addRow([new Date(2015, 7, 20, j, i), null, charge]);
    }
  }*/
  
  //alert(new Date().getTime());
}

function backData(data)
{
 	for(var i = 0; i < data.getNumberOfRows(); i++)
 	{
   		data.setValue(i,2,data.getValue(i,2)+30);
 	}
}
