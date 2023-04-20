<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<title>살고싶은 우리동네</title>
		<meta name="title" content="살고싶은 우리동네">
		<link rel="stylesheet" href="${ctx }/resources/css/map/house.css" />
		<link rel="stylesheet" href="${ctx }/resources/css/map/detailbox.css" />
		<script>
			var bClassInfoList = ${heumTag:convertJson(mlsfcLists)};
			var idealTypeInfoList = ${heumTag:convertJson(idealTypeLists)};
		</script>
		<link rel="stylesheet" href="${ctx }/resources/plugins/fancytree/src/skin-lion/ui.fancytree.css">
		<script src="${ctx }/resources/plugins/fancytree/src/jquery.fancytree.js"></script>
		<script src="${ctx }/resources/js/map/house/house.map.js"></script>
		<script src="${ctx }/resources/js/map/house/house.menu.js"></script>
		<script src="${ctx }/resources/js/map/house/house.search.js"></script>
		<script src="${ctx }/resources/js/map/house/house.api.js"></script>
		<script src="${ctx }/resources/js/map/house/house.databoard.js"></script>
		<script src="${ctx }/resources/js/map/house/house.idealtype.js"></script>
	</head>
	<body>
		<div class="Btn_Top" style="height:0px;">
			<nav><a class="Btn_Top1" onclick="$house.event.showItemBox();return false;">통계목록</a><a id="map-area-button" class="Btn_Top2 M_on">지도</a><a id="databaord-area-button" class="Btn_Top3 NoneAction">데이터보드</a></nav>
		</div>
		<%@include file="/WEB-INF/jsp/map/house/item.jsp" %>
		<p class="SelectArea" style="display:none;"> 
			<select id="map-navigator-sido"></select>
			<select id="map-navigator-sgg"></select>
			<select id="map-navigator-emdong"></select>
			<button class="btn_search" type="button" onclick="$house.ui.map.mapNavigation.move()">조회</button>
		</p>
		<div class="MapArea">
			<div id="map-title" class="MapTitle">
				<h3></h3>
				<span class="MapTitleBg">&nbsp;</span>
			</div>
			<div class="Map">
				<div id="map"></div>
			</div>
		</div>
		<div id="menuListToggle" class="control_btn service theme" title="메뉴" style="position:absolute; z-index:9999;" >서비스메뉴</div>
		<!--살고싶은우리동네-->
		<ul id="itemArea" class="service_item" style="display:none; position:absolute; z-index:9999;">
			<li class="town01" id="subject3"><a href="#">간편동네찾기</a></li>
			<li class="town02" id="subject2"><a href="#">추천지역 찾기</a> </li>
			<li class="town03" id="subject1"><a href="#">주거현황 보기</a></li>
			<!--<li class="close"><a href="#">메뉴닫기</a></li>-->
		</ul>
		<div id="chartTableArea" class="control_item control_btn chart" title="데이터보드">데이터보드</div>
		
		<%@include file="/WEB-INF/jsp/map/house/databoard.jsp" %>
	</body>
</html>