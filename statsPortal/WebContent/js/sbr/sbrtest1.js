function getJsonDataTest(){
	
	$.ajax({
		url: "/view/sbrStats/sbrStatsJsonData",
		data: {"data1" : "1"},
		dataType: "json",
		type: "POST",
		success: function( data ) {
			alert(data);
		},
		error: function() {
			alert("erreor");
		}
	});
	
}