$(function(){
	//common.mainSlide();
	common.event();
	$('#nav').localScroll(800);
	$('#btnTop').localScroll(800);
	$('.topMenuList').localScroll(800);

	//$('#mbox01').parallax("50%", 0.1);
	//$('#mbox02').parallax("50%", 0.1);
	//$('#mbox04').parallax("50%", 0.4);
	//$('#mbox03').parallax("50%", 0.3);
});
common = {
	event:function(){
		var body = $("body");
		var topList = [];
		$(".mboxArea").each(function(i){
			var t = $(this).offset().top;
			topList.push(t);
		});
		$(window).on("scroll", function(){
			var t = $(this).scrollTop()+150;
			$.each(topList, function(i, v){
				if(t > v){
					$("#nav li a").removeClass("on");
					$("#nav li:eq("+i+") a").addClass("on");
					var propBot = $("body").prop("scrollHeight");
					var bot = $(window).height() + $(window).scrollTop();
					if(propBot == bot){
						$("#nav li a").removeClass("on");
						$("#nav li:last a").addClass("on");
					}

				}
			});
		});
		/*
		body.on("click","#nav li a",function(){
			$("#nav li a").removeClass("on");
			$(this).addClass("on");
		});
		body.on("click",".btnTop",function(){
			$("#nav li a").removeClass("on");
			$("#nav li:eq(0) a").addClass("on");
		});
		*/

	}
}


//mng_s  20170801 로그 추가
function apiLogWrite3(api_id, title){
	//type, api_id, title, parameter, zoomLevel, adm_nm
	jQuery.ajax({
 		type:"POST",
 		url: "/ServiceAPI/common/APILogWrite.json",
 		data:{	"type": "Q0",
 			"api_id" : api_id,
 			"title" : title,
 			"parameter" : "없음",
 			"zoomLevel" : "00",
 			"adm_nm" : "전국"
 		},
		async: true,
 		success:function(data){
 		//	alert("success");
 		},
 		error:function(data) {
 		//	alert(data);
 		}
	});
//

}
//mng_e  20170801 로그 추가

/** SRVLog 추가 이금은 2019.04.02 start**/
function srvLogWrite(fClass1Cd, fClass2Cd, fClass3Cd, fClass4Cd, detCd, param) {
	var srvParam = { fClass1Cd: fClass1Cd, fClass2Cd: fClass2Cd, fClass3Cd: fClass3Cd, fClass4Cd: fClass4Cd};
	
	if((detCd != null && detCd != '') && (param != null && param != '')){
		srvParam = { fClass1Cd: fClass1Cd, fClass2Cd: fClass2Cd, fClass3Cd: fClass3Cd, fClass4Cd: fClass4Cd, detCd: detCd, param: param };
	} else if (detCd != null && detCd != ''){
		srvParam = { fClass1Cd: fClass1Cd, fClass2Cd: fClass2Cd, fClass3Cd: fClass3Cd, fClass4Cd: fClass4Cd, detCd: detCd };
	} else if (param != null && param != ''){
		srvParam = { fClass1Cd: fClass1Cd, fClass2Cd: fClass2Cd, fClass3Cd: fClass3Cd, fClass4Cd: fClass4Cd, param: param };
	}
	
	jQuery.ajax({
		type:"POST",
		url: "/ServiceAPI/common/SRVLogWrite.json",
		data: srvParam,
		dataType:"json",
	    async: true,
		success:function(data){ 
		},
		error:function(data) {
		}
	});
}
/** SRVLog 추가 이금은 2019.04.02 end**/

//태그이동에 로그를 쌓아야 할경우 이 함수로 대체. newWindow 가 true 이면 새창열기
function logWriteAndMove(fClass1Cd, fClass2Cd, fClass3Cd, fClass4Cd, detCd, param, url, newWindow){
	srvLogWrite(fClass1Cd, fClass2Cd, fClass3Cd, fClass4Cd, detCd, param);

	if(newWindow){
		window.open(url);
	}else{
		location.href=url;
	}
}
