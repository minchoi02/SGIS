$(function(){
	$("#li_1").click(function(){
		$("li").removeClass("on");
		$("#li_1").addClass("on");
		$("#video source").attr("src","/view/play/openEdu1.mp4");
		$("#video")[0].load();
		$("#video")[0].play();
		window.opener.srvLogWrite('A0', '05', '09', '00', $(this).text(), '');
		window.opener.apiLogWrite2("U0", "U02", "SGIS+ 공개강의실", $(this).text(), "00", "없음");
	});
	$("#li_2").click(function(){
		$("li").removeClass("on");
		$("#li_2").addClass("on");
		$("#video source").attr("src","/view/play/openEdu2.mp4");
		$("#video")[0].load();
		$("#video")[0].play();
		window.opener.srvLogWrite('A0', '05', '09', '00', $(this).text(), '');
		window.opener.apiLogWrite2("U0", "U03", "SGIS+ 공개강의실", $(this).text(), "00", "없음");
	});
	$("#li_3").click(function(){
		$("li").removeClass("on");
		$("#li_3").addClass("on");
		$("#video source").attr("src","/view/play/openEdu3.mp4");
		$("#video")[0].load();
		$("#video")[0].play();
		window.opener.srvLogWrite('A0', '05', '09', '00', $(this).text(), '');
		window.opener.apiLogWrite2("U0", "U04", "SGIS+ 공개강의실", $(this).text(), "00", "없음");
	});
	$("#li_4").click(function(){
		$("li").removeClass("on");
		$("#li_4").addClass("on");
		$("#video source").attr("src","/view/play/openEdu4.mp4");
		$("#video")[0].load();
		$("#video")[0].play();
		window.opener.srvLogWrite('A0', '05', '09', '00', $(this).text(), '');
		window.opener.apiLogWrite2("U0", "U05", "SGIS+ 공개강의실", $(this).text(), "00", "없음");
	});
	$("#li_5").click(function(){
		$("li").removeClass("on");
		$("#li_5").addClass("on");
		$("#video source").attr("src","/view/play/openEdu5.mp4");
		$("#video")[0].load();
		$("#video")[0].play();
		window.opener.srvLogWrite('A0', '05', '09', '00', $(this).text(), '');
		window.opener.apiLogWrite2("U0", "U06", "SGIS+ 공개강의실", $(this).text(), "00", "없음");
	});
	$("#li_6").click(function(){
		$("li").removeClass("on");
		$("#li_6").addClass("on");
		$("#video source").attr("src","/view/play/openEdu6.mp4");
		$("#video")[0].load();
		$("#video")[0].play();
		window.opener.srvLogWrite('A0', '05', '09', '00', $(this).text(), '');
		window.opener.apiLogWrite2("U0", "U07", "SGIS+ 공개강의실", $(this).text(), "00", "없음");
	});
	$("#li_7").click(function(){
		$("li").removeClass("on");
		$("#li_7").addClass("on");
		$("#video source").attr("src","/view/play/openEdu7.mp4");
		$("#video")[0].load();
		$("#video")[0].play();
		window.opener.srvLogWrite('A0', '05', '09', '00', $(this).text(), '');
		window.opener.apiLogWrite2("U0", "U08", "SGIS+ 공개강의실", $(this).text(), "00", "없음");
	});
})