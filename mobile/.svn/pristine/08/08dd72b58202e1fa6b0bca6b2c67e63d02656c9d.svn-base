<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<title>우리동네 생활업종</title>
		<meta name="title" content="우리동네 생활업종">
		<link rel="stylesheet" href="${ctx }/resources/css/map/biz.css" />
		<link rel="stylesheet" href="${ctx }/resources/css/map/detailbox.css" />
		<link rel="stylesheet" href="${ctx }/resources/plugins/fancytree/src/skin-lion/ui.fancytree.css">
		<link rel='stylesheet' type='text/css' href='/css/jquery-ui-1.10.4.custom.css'>
		
		<script src="${ctx }/resources/js/map/biz/biz.api.js"></script>
		<script src="${ctx }/resources/js/map/biz/biz.databoard.js"></script>
		<script src="${ctx }/resources/js/map/biz/biz.map.js"></script>
		<script src="${ctx }/resources/js/map/biz/biz.menu.js"></script>
		<script src="${ctx }/resources/js/map/biz/biz.search.js"></script>
		<script src="${ctx }/resources/js/map/biz/biz.chart.js"></script>
		
		
		
		
	</head>
	<body>
		<div class="Btn_Top" style="height:0px;">
			<nav><a class="Btn_Top1" onclick="$biz.event.showItemBox();return false;">통계목록</a><a id="map-area-button" class="Btn_Top2 M_on">지도</a><a id="databaord-area-button" class="Btn_Top3 NoneAction">데이터보드</a></nav>
		</div>
		<%@include file="/WEB-INF/jsp/map/biz/item.jsp" %>
		<div id="candidateArea" style="position:absolute;z-index:10;bottom:5%;left:2%;display:none;">
			후보지역 선택목록(최대 3개 선택가능)
		</div>
		<div class="MapArea">
			<div id="map-title" class="MapTitle">
				<h3></h3>
				<span class="MapTitleBg">&nbsp;</span>
			</div>
			<div class="Map">
				<div id="map"></div>
			</div>
		</div>
		
		<div id="menuListToggle" class="control_btn service theme" title="메뉴">서비스메뉴</div>
		
		<ul id="itemArea" class="service_item" style="display:none;">
			<li class="biz02" id="subject1"><a href="#">생활업종 현황보기</a> </li>
			<li class="biz03" id="subject2"><a href="#">업종밀집도 변화</a></li>
			<!--  <li class="biz01"><a href="#" id="subject3">생활업종 후보지검색</a></li>-->
			<!--<li class="close"><a href="#">메뉴닫기</a></li>-->
		</ul>
		
		<div id="chartTableArea" class="control_item control_btn chart" title="데이터보드">데이터보드</div>

		 <div class="heatArea" style="position:absolute; bottom:10px; right:100px; z-index:30; background-color:white; width:200px; display:none;">
		<div style="height:15px;"></div>
		<img src="/img/ico/ico_dbPlay.png" style="float:left;margin:4px 10px 0 10px;width:10px;height:10px;" alt="플레이어"/>
		<div style="height:20px;font-size:11px;">반지름 조절 (Radius)</div>
		<div style="height:50px;">
			<div class="heatRadiusSlider heatSlider"></div>
			<div class="heatRadiusText heatInputText" style=""></div>
			<ul class="heatGuage" style="margin-top:5px;">
				<li style="margin-top:5px;">5</li>
				<li style="margin-right:10px;float:right;margin-top:5px;">40</li>
			</ul>
		</div>
			<img src="/img/ico/ico_dbPlay.png" width=10 height=10 style="float:left;margin:4px 10px 0 10px;width:10px;height:10px;" alt="플레이어"/>
			<div style="height:20px;font-size:11px;">흐림도 조절 (Blur)</div>
			<div style="height:50px;">
				<div class="heatBlurSlider heatSlider"></div>
				<div class="heatBlurText heatInputText"></div>
				<ul class="heatGuage">
					<li style="margin-top:5px;">20</li>
					<li style="margin-top:5px;">120</li>
				</ul>
			</div>
		</div> 
		<img id="heatLegendBtn" src="${ctx }/resources/images/icon/icon_setting2.png" style="position:absolute; border-width:1px; border-color:gray; border-style:outset; bottom: 2px; right:10px; z-index:99; display:none;" alt="열지도범례버튼"/>
		
		
		
		
	
		<%@include file="/WEB-INF/jsp/map/biz/databoard/currentStateSgg.jsp" %>
		<%@include file="/WEB-INF/jsp/map/biz/databoard/currentStateSido.jsp" %>
		<%@include file="/WEB-INF/jsp/map/biz/databoard/changeBusiness.jsp" %>
		<%@include file="/WEB-INF/jsp/map/biz/databoard/proposedSite.jsp" %>
	</body>
</html>