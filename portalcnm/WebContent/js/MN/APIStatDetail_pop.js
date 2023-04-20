//2017.07.18[개발팀]이동형 보고서 보기 추가 - API이용통계 상세
$(function () {
	
	  //2017.07.18[개발팀]이동형 보고서 보기 추가 - API이용통계 상세 타이틀(년/월)
	  var reportTitle= "API 이용통계-상세";
	  $("#reportTitle").html(reportTitle);
	  $("#searchItem").append(window.opener.$("#chartText").val());
	  //2017.07.18[개발팀]이동형 보고서 보기 추가 - API이용통계 상세 작성일자
	  $("#date").html(getToday());
	  
	  //2017.07.18[개발팀]이동형 보고서 보기 추가 - API이용통계 상세 그래프  표 출력
	  $("#apiStatDetailTableRegion_pop").html(window.opener.$("#chartArea").html());
	  $("#apiStatDetailTableRegion_pops").html(window.opener.$("#chartTable").html());
	  $(".pntTable").css("display","block");
	  $(".pntTables").css("display","block");
	  $("#openTable_pop").css("overflow","visible");
	  
	  //2017.07.18[개발팀]이동형 보고서 보기 추가 - API이용통계 상세 차트,표,삭제,excel저장 버튼 삭제
	  $(".searchBtn06").remove();
	  $(".searchBtn07").remove();
	  $(".btnBox").remove();
	  $(".chartText").remove();
	  
	  //2017.07.18[개발팀]이동형 보고서 보기 추가 - API이용통계 상세 보고서 그래프 출력
	  $('#openAPIArea').show();
	  $('#openTable').hide();
});

//2017.07.18[개발팀]이동형 보고서 보기 추가 - API이용통계 상세 리포트 창 닫기
function reportClose(){
	window.close();
}
//2017.07.18[개발팀]이동형 보고서 보기 추가 - API이용통계 상세 리포트 내용 프린트
function reportPrint(){
	$(".pntBtn").remove();
	//메모가 없을경우 숨김
	if($("#memo").val() == "") {
		$("#memoDiv").hide();
	}
	window.print();
	setTimeout(function(){
			self.close();
		}, 1)
}
//2017.07.18[개발팀]이동형 보고서 보기 추가 - API이용통계 상세 오늘날짜 가져오기
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