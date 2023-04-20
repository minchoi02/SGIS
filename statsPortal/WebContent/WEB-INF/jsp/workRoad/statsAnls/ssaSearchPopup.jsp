<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 일자리 통계분석 > 일자리 현황 > 선택 팝업
* File Name		: statsAnls > ssaSearchPopup.jsp
* Comment		: 
* History		: 2018-10-25	손원웅
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="${pageContext.request.contextPath}/js/workRoad/statsAnls/ssaSearchPopup.js"></script>

<style>
	#ssaSearchPopup {
		display:none;
		width:510px;
		height:400px;
	}
	
	#ssaSearchPopup #ssaSqlListBox {
		left: 200px;
		top: 0px;
		width: 507px;
	}
	
	#ssaSearchPopup .sideQuick.xw{
		top: 8px;
	}
	
	.workRoad .sqListBox.sq03 .sqList ul li a .text{
		width: 500px;
	}
	
	#ssaSearchPopup .sqListBox.sq03 .sqTabs{
		width: 497px;
	}
	
	#ssaSearchPopup .sqListBox.sq03 .sqList{
		height: 395px;
	}
	
</style>

<!-- 조회 조건 팝업 -->
<div class="wrmDraggable" id="ssaSearchPopup">
   	<a href="javascript:void(0)" class="sideQuick sq03 xw">
   		<span>선택항목</span>
   	</a>
   	<div class="popBox" id="ssaSqlListBox">
   		<div class="topbar"><span>상세 지표 선택</span><a href="javascript:void(0)">닫기</a></div>
   	<div class="indicator-stepBox">
		<ul class="dbTypeCk radioStepBox validationStepBox">
			<li><input type="radio" id="color_map" name="map_type" value="0" checked="checked"><label for="color_map" class="">색상지도</label> </li>
			<li><input type="radio" id="bubble_map" name="map_type" value="0"><label for="bubble_map" class="">버블지도</label> </li>
			<li><input type="radio" id="heat_map" name="map_type" value="0"><label for="heat_map" class="">열지도</label> </li>
		</ul>
	</div>
	<div class="cont-box">
		<article>
	   		<div id="searchBtnResultRgn" class="sqList">
	   			<ul></ul>
	   		</div>
	   	</article> 
   	</div>
</div>
