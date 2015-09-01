function getPercentage() {
	$.getJSON("/show/battery/percentage", function(data) {
    		$('#battery-level').html(data.pr+" %");
    	});
}
