<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<div id="search-item-box" class="Open_Type1" style="display:none;">
	<h3>주요지표 상세검색</h3>
	<button class="BtnClose" onclick="$('#search-item-box').hide();">상세검색닫기</button>
	<!-- 
	<div class="Subject SubjectB">
		<nav><a href="#" class="subject1 M_on">주요지표</a><a href="#" class="subject2">인구</a><a href="#" class="subject3">가구</a><a href="#" class="subject4">주택</a><a href="#" class="subject5">사업체</a><a href="#" class="subject6">농림어가</a></nav>
	</div>
	 --> 
	<p class="SelectArea">
		<button class="myposition" onclick="$interactive.ui.setItemCurrentLocationNavigator();">현재위치</button>
		<select id="map-navigator-sub-sido"></select>
		<select id="map-navigator-sub-sgg"></select>
		<select id="map-navigator-sub-emdong"></select>
	</p>
	<div id="search-box" class="DetailBox">
		<!-- mng_s 2020. 02. 18 j.h.Seok 주석 추가 -->
		<!-- 주요지표 -->
		<%@include file="/WEB-INF/jsp/map/interactive/item/API_0301.jsp" %>
		
		<!-- 인구 -->
		<%@include file="/WEB-INF/jsp/map/interactive/item/API_0302.jsp" %>
		
		<!-- 가구 -->
		<%@include file="/WEB-INF/jsp/map/interactive/item/API_0305.jsp" %>
		
		<!-- 주택 -->
		<%@include file="/WEB-INF/jsp/map/interactive/item/API_0306.jsp" %>
		
		<!-- 사업체 -->
		<%@include file="/WEB-INF/jsp/map/interactive/item/API_0304.jsp" %>
		
		<!-- 농림어가 -->
		<%@include file="/WEB-INF/jsp/map/interactive/item/API_0310.jsp" %>
		<!-- mng_e 2020. 02. 18 j.h.Seok 주석 추가 -->
		
		<div class="btn_wrap" id="Btn_Search_Detail"><button type="button" class="btn_base">조회</button></div>
	</div>
</div>
<%@include file="/WEB-INF/jsp/map/interactive/item/help.jsp" %>