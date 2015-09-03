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
  }); // end of document ready
})(jQuery); // end of jQuery name space

