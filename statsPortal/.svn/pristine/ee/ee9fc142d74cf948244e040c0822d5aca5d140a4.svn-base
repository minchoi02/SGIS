<%
/**************************************************************************************************************************
* Program Name	: 상세페이지 Main
* File Name		: totSurvDetail.jsp
* Comment		: 
* History		: 
*	2020.08.10	주형식	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
	
<!-- location END -->
  
<script src="${pageContext.request.contextPath}/js/totSurv/totSurvDetailMap.js"></script>
<script src="/js/totSurv/totSurvDetailMapApi.js"></script>
<script>
	var totLastYear = '<c:out value="${totLastYear}"/>';
	$totSurvDetail.ui.totLastYear = totLastYear;
</script>
<div id="totSurvDetailDataDiv" style="width: calc(100% - 500px); display: inline-block; float: right;">
	<!-- 선택한 조사표 표출 영역 --> 
</div>
<div class="popupWrap none" id="openWin" style="display:none; left: calc(50% - 120px); top: calc(50% - 120px);">
	<div class="popTit">
		<h1>개방형지도란?</h1>
		<button type="button" class="popcloseBtn" title="개방형지도 팝업 닫기"></button>
	</div>
	<div class="popCon" style="background-color: white;" >
		<p class="popTxt">SGIS(Statistical Geographic Information Service)를 기반으로 통계정보(인구주택총조사,</br>
						   농림어업총조사)와 통계청에서 구축한 행정구역(읍면동) 경계에 해당하는 지리정보를 융 복합하여</br>
						   제공 하는 통계지리정보 입니다. </br>
						  &nbsp;- SGIS에서 제공하는 센서스 통계는 일부 특별조사구와 외국인, 개인운수업등의 자료를 제외하고</br>
						  &nbsp;&nbsp;&nbsp;최신 경계를 반영하기 때문에 KOSIS 등 공표된 통계와 차이가 있습니다.</br>
						    ※&nbsp;제외 자료인구/가구/주택 센서스 : 해외주재공간, 교도소 및 소년원, 군부대, 전투경찰대,</br>
						  &nbsp;&nbsp;&nbsp;의무소방대 등의 특별 조사구와 외국인 사업체 센서스 : 개인운수업(사업장이 일정치 않음)</br>
		<p class="CloseWin" id="openApiPopupClose"> 다시보지 않음 </p>
	</div>
</div>