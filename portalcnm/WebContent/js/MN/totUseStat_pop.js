//2017.07.18[개발팀]이동형 보고서 보기 추가 - 총괄이용현황
$(function () {
	  
	 //2017.07.19[개발팀]이동형 보고서 보기 추가 - 총괄이용현황 (년/월)
	  var year = window.opener.$("#nowYear").html()+"년 ";
	  var month = window.opener.$("#nowMonth").html()+"월 ";
	  var reportTitle= "SGIS 플러스 이용현황";
	  $("#reportTitle").html(year + month + reportTitle);
	  $("#searchItem").html(year + month);
	  //2017.07.19[개발팀]이동형 보고서 보기 추가 - 총괄이용현황  작성일자
	  $("#date").html(getToday());
	  
	  //2017.07.19[개발팀]이동형 보고서 보기 추가 - 총괄이용현황  페이지 뷰 데이터 세팅	
	  $("#nowMonthPageView_pop").html(window.opener.$("#nowMonthPageView").html());
	  $("#totalPageView_pop").html(window.opener.$("#totalPageView").html());
	  $("#pageViewBigyoMonthPersent_pop").html(window.opener.$("#pageViewBigyoMonthPersent").html());
	  $("#pageViewOldMonthBigyo_pop").html(window.opener.$("#pageViewOldMonthBigyo").html());
	  $("#pageViewBigyoOldMonthPersent_pop").html(window.opener.$("#pageViewBigyoOldMonthPersent").html());
	  
	  //2017.07.19[개발팀]이동형 보고서 보기 추가 - 총괄이용현황  방문자수 데이터 세팅
	  $("#nowMonthVisitView_pop").html(window.opener.$("#nowMonthVisitView").html());
	  $("#totalVisitView_pop_pop").html(window.opener.$("#totalVisitView_pop").html());
	  $("#preMonthVisitViewBigyo_pop").html(window.opener.$("#preMonthVisitViewBigyo").html());
	  $("#preMonthVisitViewBigyoPersent_pop").html(window.opener.$("#preMonthVisitViewBigyoPersent").html());
	  $("#oldMonthVisitViewBigyo_pop").html(window.opener.$("#oldMonthVisitViewBigyo").html());
	  $("#oldMonthVisitViewBigyoPersent_pop").html(window.opener.$("#oldMonthVisitViewBigyoPersent").html());
	  
	  //2017.07.19[개발팀]이동형 보고서 보기 추가 - 총괄이용현황  Open API 사용건수
	  $("#yearApiCount_pop").html(window.opener.$("#yearApiCount").html());
	  
	  //2017.07.19[개발팀]이동형 보고서 보기 추가 - 총괄이용현황  성과지표 월간 목표량
	  $("#mokpyoval_pop").html(window.opener.$("#mokpyoval").html());
	  
	  //2017.07.19[개발팀]이동형 보고서 보기 추가 - 총괄이용현황  연간 or 월평균 페이지뷰
	  $("#nowYearPageView_pop").html(window.opener.$("#nowYearPageView").html());
	  $("#nowYearAvrPageView_pop").html(window.opener.$("#nowYearAvrPageView").html());
	  
	  //2017.07.19[개발팀]이동형 보고서 보기 추가 - 총괄이용현황  그래프 
	  $("#pageViewGraphArea_pop").html(window.opener.$("#pageViewGraphArea").html());
	  
	  //2017.07.19[개발팀]이동형 보고서 보기 추가 - 총괄이용현황  표데이터
	  $("#toUseStatTableRegion_pop").html(window.opener.$("#toUseStatTableRegion").html());
});

//2017.07.19[개발팀]이동형 보고서 보기 추가 - 총괄이용현황  리포트 창 닫기
function reportClose(){
	window.close();
}
//2017.07.19[개발팀]이동형 보고서 보기 추가 - 총괄이용현황 리포트 내용 프린트
function reportPrint(){
	//인쇄 닫기 버튼 삭제
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
//2017.07.19[개발팀]이동형 보고서 보기 추가 - 총괄이용현황 오늘날짜 가져오기
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