google.load('visualization', '1.0', {'packages':['corechart']});
google.setOnLoadCallback(init);

function init() {
  var data = new google.visualization.DataTable();
  addData(data);
  var options = {
    vAxis: {titleTextStyle:{fontSize: 20, bold: true}, title: 'Battery level (%)', minValue: 0, maxValue: 100},
    seriesType: 'area', series: {0: {labelInLegend: 'Real battery level', color: '#03a9f4', areaOpacity: 0.6}, 1: {type: 'line', color: 'black', labelInLegend: 'Estimated battery level'}},
    interpolateNulls: false, height: 500,
    animation:{
      duration: 1000,
      easing: 'out'
    }
  };
  var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
  var btnback = document.getElementById('btn-back');
  var btnforward = document.getElementById('btn-forward');
  function drawChart() {
    chart.draw(data, options);
  }
  btnback.onclick = function() {
    //tutaj bierzemy starsze dane, wywalamy backdata
    backData(data);
    drawChart();
  }
  btnforward.onclick = function() {
    //tutaj bierzemy nowsze dane;
    drawChart();
  }
 drawChart();
};
//przykładowe, do wywalenia
function addData(data) {
  data.addColumn('datetime', 'Time');
  data.addColumn('number', 'Percent');
  data.addColumn('number', 'Estimate');
  var charge = 8;
  for(var j = 11; j<13; j++){
    for(var i = 0; i< 59; i++){
      charge += Math.trunc((i%3)/2);
      data.addRow([new Date(2015,7, 20,j,i, 0), charge, charge]);
    }
  }
  data.addRow([new Date(2015, 7, 20, 13), null, null]);
  for(var j = 14; j < 16; j++){
    for(var i = 0; i < 59; i+=5){
      charge -= Math.trunc((i%3)/2);
      data.addRow([new Date(2015,7, 20, j, i), charge, charge]);
    }
  }
  for(var j = 16; j < 17; j++){
    for(var i = 0; i < 59; i+=5){
      charge -= Math.trunc((i%3)/2);
      data.addRow([new Date(2015, 7, 20, j, i), null, charge]);
    }
  }
}
function backData(data) {
 for(i = 0; i < data.getNumberOfRows(); i++){
   data.setValue(i,2,data.getValue(i,2)+30);
 }
}
