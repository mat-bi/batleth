function getBattery() {
	$.getJSON("/show/battery/percentage", function(data) {
    		$('#battery-level').html(data.pr+" %");
    	});
    	
    	$.getJSON("/show/battery/prediction", function(data) {
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
    			
    			if(h > 0)
    			{
    				m -= h*3600; 
    				var zm1 = h.toString()+'h';
    			}
    			m = Math.floor(m/60)
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
    setInterval(getBattery(), 60000);
  }); // end of document ready
})(jQuery); // end of jQuery name space

