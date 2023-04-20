<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<title>내 주변 통계</title>
		<meta name="title" content="내 주변 통계">
		<link rel="stylesheet" href="${ctx }/resources/css/map/current.css" />
		<link rel="stylesheet" href="${ctx }/resources/plugins/Swiper-3.3.1/css/swiper.min.css"/>
		<script src="${ctx }/resources/plugins/Swiper-3.3.1/js/swiper.jquery.min.js"></script>
		<script src="${ctx }/resources/js/map/current/current.api.js"></script>
		<script src="${ctx }/resources/js/map/current/current.map.js"></script>
		<script>
		window.onload = function(){
			var title = $(".gnb h2").text();
			var adm_nm = $("#map-navigator-sido option:selected").text() + " " + $("#map-navigator-sgg option:selected").text() + " " + $("#map-navigator-emdong option:selected").text();
			apiLogWrite2("L0", "L01", title, "없음", "00", adm_nm);
			
			srvLogWrite("M0","03", "01", "00", "", "");		//내주변 통계
		}
		</script>
	</head>
	<body>
		<div class="Subject SubjectC" style="height:0px;">
			<nav><a href="#" class="subject1 M_on NoneAction">내주변통계</a><a href="#" class="subject2 NoneAction">지역종합</a><a href="#" class="subject3 NoneAction">인구</a><a href="#" class="subject4 NoneAction">주택</a><a href="#" class="subject5 NoneAction">사업체</a><a href="#" class="subject6 NoneAction">주택동향</a></nav>
		</div>
		<div class="Open_Type1" id="topCloseArea" style="position: static; display:none;">
			<h3>데이터보드</h3>
			<button class="BtnClose" style="top:46px;">상세검색닫기</button>
		</div>
		<p class="SelectArea">
			<select id="map-navigator-sido"></select>
			<select id="map-navigator-sgg"></select>
			<select id="map-navigator-emdong"></select>
			<button class="btn_search" type="button" onclick="$current.ui.chageLocation2();">조회</button>
		</p>
		<div class="MapArea">
			<div class="MapTitle" style="display: none;">
				<h3 class = "TitleText" style="width: 100%;"></h3>
				<span class="MapTitleBg">&nbsp;</span>
			</div>
			<div class="Map">
				<div id="map"></div>
				<%@include file="/WEB-INF/jsp/includes/pageUpDown.jsp" %>
			</div>
			<%@include file="/WEB-INF/jsp/map/current/chart/areainfo-0.jsp" %>
			<%@include file="/WEB-INF/jsp/map/current/chart/areainfo-1.jsp" %>
			<%@include file="/WEB-INF/jsp/map/current/chart/areainfo-2.jsp" %>
			<%@include file="/WEB-INF/jsp/map/current/chart/areainfo-3.jsp" %>
			<%@include file="/WEB-INF/jsp/map/current/chart/areainfo-4.jsp" %>
			<%@include file="/WEB-INF/jsp/map/current/chart/areainfo-5.jsp" %>
			
			<div id="menuListToggle" class="control_item control_btn service" title="메뉴">서비스메뉴</div>
			<!--내주변통계-->
			<ul id="itemArea" class="service_item" style="display:none;">
				<li class="interactive02"  id="tot_ppltn_btn"><a href="#">인구</a></li>
				<li class="current01" id="tot_house_btn"><a href="#">주택</a> </li>
				<li class="interactive05" id="corp_cnt_btn"><a href="#">사업체</a></li>
				<!--<li class="close"><a href="#">메뉴닫기</a></li>-->
			</ul>
			
			<div id="chartTableArea" class="control_item control_btn chart" title="데이터보드">데이터보드</div>
		</div>
	</body>
</html> 