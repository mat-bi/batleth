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

function history_pagination(index) {
	var p = 10;
    	var json = {from: $('#filter_from').val(), to: $('#filter_to').val(), _csrf_token: document.getElementsByName("_csrf_token")[0].value};
        $.post("/history/show/"+p, json)
        	.done(function(data) {
        		var mes = "Showing results from "+((index-1)*p+1)+" to ";
        		if((index*p) > data.no_categories)
        			mes += data.no_categories+" of "+data.no_categories;
        		else
        			mes += (index*p);
        		$("#results").html(mes);
        		var pag = "";
        		
        		for(var i = 1; i <= data.no_pages; ++i)
        		{
        			pag += '<li class="';
        			if(i === index)
        				pag += "yellow-text disabled active light-blue darken-2";
        			else
        				pag += "waves-effect";
        			pag += ' pagination_number" value="'+i+'">'+i+'</li>'; 
        		}
        		$("#paginator").html(pag);
        		var y = 0;
        		for(; y < data.no_pages;)
        		{
        			console.log(y);
        			document.getElementsByClassName("pagination_number")[y].onclick = function() { console.log(this); history_pagination(this.value);};
        			y++;
        		}
        	});
    	$.post("/history/show/page/"+index+"/"+p,json)
    		.done(function(data){
    			if(data.length == 0) alert("Haven't found any");
    			var t = "";
    			for(var i = 0; i < data.length; ++i)
    			{
    			
  	  			t += "<tr class=\"record\"><td>"+data[i].from_date;
    				if(data[i].from_date !== data[i].to_date)
    					t += " - "+data[i].to_date;
    				t += "</td><td>"+data[i].from_hour;
    				if(data[i].from_hour !== data[i].to_hour)
   	 				t += " - "+data[i].to_hour; 
   	 			t += "</td><td>"+data[i].status+"</td><td>"+data[i].from_pr;
   	 			if(data[i].from_pr !== data[i].to_pr) 
  	  				t += " - " +data[i].to_pr;
  	  			t += "</td>";
 	   		}
 	   		$("#table_records").html(t);
    	 })
    	.fail(function() { alert("H");});
    	}

(function($){
  $(function(){
    $('.datepicker').pickadate({
          selectMonths: true
    });
    getBattery();
    var run = setInterval(getBattery, 60000);
    
    $("#history_button").click(function(){ history_pagination(1);});
  }); // end of document ready
})(jQuery); // end of jQuery name space

