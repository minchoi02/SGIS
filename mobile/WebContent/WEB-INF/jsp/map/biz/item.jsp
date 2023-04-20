<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<div id="search-item-box" class="Open_Type1">
	<h3 id="search-item-box-title">생활업종 현황보기</h3>
	<button class="BtnClose" onclick="$('#search-item-box').hide();">상세검색닫기</button>
	<div id="itemSubject" class="Subject SubjectB" style="height:0px;">
		<nav><a href="#" class="subject1 M_on" data-type="current-state">생활업종 현황보기</a><a href="#" class="subject2" data-type="change-business">업종밀집도변화</a><a href="#" class="subject3" data-type="proposed-site">생활업종 후보지검색</a></nav>
	</div>
	<p class="SelectArea"> 
		<select id="map-navigator-sub-menu-sido"></select>
		<select id="map-navigator-sub-menu-sgg"></select>
		<select id="map-navigator-sub-menu-emdong" style="display: none;"></select>
	</p>
	<div class="MenuBox" style="overflow:auto;">
		<!-- 생활업종 후보지 정보 보기 시작 -->
		<c:set var="tabId" value="current-state" target="request"/>
		<%@include file="/WEB-INF/jsp/map/biz/menu/themeList.jsp" %>
		<c:set var="tabId" value="change-business" target="request"/>
		<%@include file="/WEB-INF/jsp/map/biz/menu/themeList.jsp" %>
		<%@include file="/WEB-INF/jsp/map/biz/menu/proposedSite.jsp" %>
		<!-- 생활업종 후보지 정보 보기 끝 -->
	</div>
	<div class="DetailBox">
		<div class="Detail2_1">
			<div class="btn_wrap"><button id="biz-search-button" type="button" class="btn_base">조회</button></div>
		</div>
	</div>
</div>
