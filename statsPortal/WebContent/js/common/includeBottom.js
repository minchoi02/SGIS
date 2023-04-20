$(document).ready(function() {
	$("#service_page").change(function(){
		if($(this).val()){
			srvLogWrite("A0", "05", "16", "00", "", $(this).val());
			goExternalUrlLink($(this).val());
		}
	});
});
