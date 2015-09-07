function getBattery() {
	$.getJSON("/battery/show/percentage", function(data) {
    		$('#battery-level').html(data.pr+" %");
    	});
    	
    	$.getJSON("/battery/show/prediction", function(data) {
    		var zm = ""
    		switch(data.status) {
    			case "Charging":
    			case "Discharging":
    				zm = "Full "+data.status+" in";
    			break;
    			
    			default:
    				zm = data.status;

    		}
    		$('#bat-status').html(zm);
    		var zm1 = data.time;
    		if(typeof data.time === 'number')
    		{
    			var m = data.time;
    			var h = Math.floor(m/3600);
    			var zm1 = '';
    			if(h > 0)
    			{
    				var m = m-h*3600; 
    				var zm1 = h.toString()+'h';
    			}
    			var m = Math.floor(m/60)
    			var zm1 = zm1+' '+m.toString()+'m';
    		}
    		
    		
    		$('#bat-prediction').html(zm1)
    		
    	});
    	
}

(function($){
  $(function(){
    $('.datepicker').pickadate({
          selectMonths: true
    });
    getBattery();
    var run = setInterval(getBattery, 60000);
    $('#history_button').click(function() {
    console.log(document.getElementsByName("_csrf_token")[0].value);
    	$.post("/history/show/page/1/5", { from: $('#filter_from').val(), to: $('#filter_to').val(), _csrf_token: document.getElementsByName("_csrf_token")[0].value
    	}).done(function(data){
    		if(data.length == 0) alert("Haven't found any");
    		var t = "";
    		for(var i = 0; i < data.length; ++i)
    		{
    			
    			t += "<tr class=\"record\"><td>"+data[i].from_date;
    			if(data[i].from_date !== data[i].to_date)
    				t += " - "+data[i].to_date;
    			t += "</td><td>"+data[i].from_hour+" - "+data[i].to_hour+"</td><td>"+data[i].status+"</td><td>"+data[i].from_pr
    			if(data[i].from_pr !== data[i].to_pr) 
    				t += " - " +data[i].to_pr;
    			t += "</td>";
    		}
    		$("#table_records").html(t);
    	 })
    	.fail(function() { alert("H");});
    	});
  }); // end of document ready
})(jQuery); // end of jQuery name space

