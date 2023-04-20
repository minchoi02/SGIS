<%
/**************************************************************************************************************************
* Program Name  :   
* File Name     : vjDataBoard.jsp
* Comment       : 
* History       : 
*
**************************************************************************************************************************/
%>

<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<script src="${pageContext.request.contextPath}/js/workRoad/viewJobs/vjDataBoard.js"></script>

<style>/* 임시: 현재 databoard는 지도영역에 속해있으므로 일자리 맵 서비스 스타일이 적용돼지 않음 - 2019.01.07	ywKim */
#vjDataBoard .dataSideBox { z-index: 1001; /* ※ 지도버튼이 1000 */ }
</style>

<div id="vjDataBoard">
	<a href="javascript:void(0)" class="workRoadDataBoard">데이터보드</a>
	<div class="dataSideBox">
		<div class="bar">
			<div id="dataSlider" class="dataSlider"></div> 
			<a href="javascript:void(0)" class="stepClose-data">데이터보드 닫기</a>
		</div>
		<div class="dataSideContents">

		</div>
	</div> 
</div>
<form id="excelDownForm" name="excelDownForm" method="post">
</form>