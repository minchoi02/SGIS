//2017.07.18[개발팀]이동형 보고서 보기 추가 - API 이용통계 종합 
$(function () {
	  
	  //2017.07.18[개발팀]이동형 보고서 보기 추가 - API 이용통계 종합 타이틀(년/월)
	  var reportTitle= "API 이용통계-종합";
	  $("#reportTitle").html(reportTitle);
	  
	  //2017.07.18[개발팀]이동형 보고서 보기 추가 - API 이용통계 종합 검색조건
	  $("#searchItem").text(window.opener.$("#selectType option:selected").text()+"("+window.opener.$("#startDate").val()+" ~ "+window.opener.$("#endDate").val()+")");
	  //2017.07.18[개발팀]이동형 보고서 보기 추가 - API 이용통계 종합 작성일자
	  $("#date").html(getToday());
	  
	  //2017.07.18[개발팀]이동형 보고서 보기 추가 - API 이용통계 종합  총API호출건수 or 에러건수 데이터 세팅	
	  $("#totalCount_pop").html(window.opener.$("#totalCounts").html());
	  $("#errorCount_pop").html(window.opener.$("#errorCount").html());
	  
	  //2017.07.18[개발팀]이동형 보고서 보기 추가 - API 이용통계 종합  api 이용통계 그래프
	  $("#openAPIArea_pop").html(window.opener.$("#openAPIArea").html());
	  
	  //2017.07.18[개발팀]이동형 보고서 보기 추가 - API 이용통계 종합 OpenAPI 호출건수 그래프 / 데이서 세팅
	  $("#openAPIPie_pop").html(window.opener.$("#openAPIPie").html());
	  $("#api0_pop").html(window.opener.$("#api0").html());
	  $("#api1_pop").html(window.opener.$("#api1").html());
	  $("#api2_pop").html(window.opener.$("#api2").html());
	  
	  //2017.07.18[개발팀]이동형 보고서 보기 추가 - API 이용통계 종합 서비스 호출건수 그래프 / 데이서 세팅
	  $("#openAPIServicePie_pop").html(window.opener.$("#openAPIServicePie").html());
	  $("#service0_pop").html(window.opener.$("#service0").html());
	  $("#service1_pop").html(window.opener.$("#service1").html());
	  $("#service2_pop").html(window.opener.$("#service2").html());
	  
	  //2017.07.18[개발팀]이동형 보고서 보기 추가 - API 이용통계 종합 OpenAPI 에러건수 그래프 / 데이서 세팅
	  $("#openAPIErrorPie_pop").html(window.opener.$("#openAPIErrorPie").html());
	  $("#error0_pop").html(window.opener.$("#error0").html());
	  $("#error1_pop").html(window.opener.$("#error1").html());
	  $("#error2_pop").html(window.opener.$("#error2").html());
	  
	  //2017.07.18[개발팀]이동형 보고서 보기 추가 - API 이용통계 종합  표데이터
	  $("#apiStatTableRegion_pop").html(window.opener.$("#apiStatTableRegion").html());
	  
});

//2017.07.18[개발팀]이동형 보고서 보기 추가 - API 이용통계 종합  리포트 창 닫기
function reportClose(){
	window.close();
}
//2017.07.18[개발팀]이동형 보고서 보기 추가 - API 이용통계 종합 리포트 내용 프린트
function reportPrint(){
	$(".pntBtn").remove();
	//메모가 없을경우 숨김
	if($("#memo").val() == "") {
		$("#memoDiv").hide();
	}
	window.print();
	setTimeout(function(){
			self.close();
		}, 1);
}
//2017.07.18[개발팀]이동형 보고서 보기 추가 - API 이용통계 종합 오늘날짜 가져오기
function getToday() {
	var today = new Date();
		var y = today.getFullYear();
		var m = today.getMonth()+1;
		var d = today.getDate();
		var h = today.getHours();
		var mn = today.getMinutes();
		
		var returnDate = "";
		if(m < 10) {
			m = "0" + m;
		}
		if(d < 10) {
			d = "0" + d;
		}
		if(h < 10) {
			h = "0" + h;
		}
		if(mn < 10) {
			mn = "0" + mn;
		}
		returnDate = y + "년 " + m + "월 " + d + "일 " + h + "시 " + mn + "분";
		
		return returnDate;
}
//2017.07.19[개발팀]이동형 보고서 보기 추가 - 보고서 항목 on/off 
function onOffDiv(value) {
	console.log(value);
	if($("#" + value).css("display") == "none"){
		$("#" + value + "_show").hide();
		$("#" + value).show();
	}else{
		$("#" + value).hide();
		$("#" + value + "_show").show();
	}
	
}