<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<title>대화형 통계지도</title>
		<meta name="title" content="대화형 통계지도">
		<link rel="stylesheet" href="${ctx }/resources/css/map/interactive.css" />
		<link rel="stylesheet" href="${ctx }/resources/css/map/detailbox.css" />
		<script src="${ctx }/resources/plugins/kakao_script_api.js"></script>
		<script src="${ctx }/resources/js/map/interactive/interactive.api.js"></script>
		<script src="${ctx }/resources/js/map/interactive/interactive.map.js"></script>
		<script src="${ctx }/resources/js/map/interactive/interactive.search.js"></script>
		<script>
			<c:choose>
				<c:when test="${fn:trim(bookmark)==''}">
					$(document).ready(function(){
						
					//	page 시작시 아이템 선택창 제거
						$interactive.event.showItemBox();
					});
				</c:when>
				<c:otherwise>
					var bookmark = ${bookmark.param_info };
				</c:otherwise>
			</c:choose>
		</script>
	</head>
	<body>
	<!-- 
		<div class="Btn_Top">
			<nav><a class="Btn_Top1" onclick="$interactive.event.showItemBox();">통계목록</a><a id="map-area-button" class="Btn_Top2 M_on">지도</a><a id="chart-area-button" class="Btn_Top4 NoneAction">차트</a><a id="table-area-button" class="Btn_Top5 NoneAction">표</a></nav>
		</div>
	 -->
		<%@include file="/WEB-INF/jsp/map/interactive/item.jsp" %>
		<p class="SelectArea"> 
			<select id="map-navigator-sido"></select>
			<select id="map-navigator-sgg"></select>
			<select id="map-navigator-emdong"></select>
			<button class="btn_search Btn_Research" type="button" onclick="$interactive.ui.map.mapNavigation.move()">조회</button>
		</p>
		<div class="MapArea">
			<div id="map-title" class="MapTitle">
				<h3></h3>
				<span class="MapTitleBg">&nbsp;</span>
			</div>
			<div class="Map">
				<div id="map"></div>
				<%@include file="/WEB-INF/jsp/includes/pageUpDown.jsp" %>
			</div>
				<div id="chart-area" style="display:none;overflow: scroll;">
					<div class="Open_Type1" style="top:0px; position:relative;">
						<h3>데이터보드</h3>
						<button class="chartAreaCloseBtn">차트닫기</button>
						<button class="chartDataToggleBtn table">표보기</button>
					</div>
					<span class="chartAreaTit">차트제목</span>
					<div class="chart" ></div>
				</div>
			<div id="table-area" style="display:none;"> 
				<div class="Open_Type1" style="top:0px; position:relative;">
					<h3>데이터보드</h3>
					<button class="chartAreaCloseBtn">테이블닫기</button>
					<button class="chartDataToggleBtn chart">차트보기</button>
				</div>
				<span class="chartAreaTit">테이블제목</span>
				<div class="tables">
					<table>
						<caption>해당지역 내 데이터 보기</caption>
						<thead>
							<tr>
								<th scope="col">항목</th>
								<th scope="col">집계구 번호</th>
								<th scope="col">순위</th>
								<th scope="col">값</th>
								<th scope="col">비율(%)</th>
							</tr>
						</thead> 
					</table>
					<div class="scrolls">
						<table>
							<caption>해당지역 내 데이터 보기</caption> 
							<tbody id="table-value"></tbody>
						</table>
					</div>
				</div>
			</div>
			<div id="menuListToggle" class="control_btn service" title="메뉴">서비스메뉴</div>
			<ul id="itemArea" class="service_item" style="display:none;">
				<li class="interactive01"><a href="#" class="subject1 M_on">주요지표</a></li>
				<li class="interactive02"><a href="#" class="subject2">인구</a></li>
				<li class="interactive03"><a href="#" class="subject3">가구</a></li>
				<li class="interactive04"><a href="#" class="subject4">주택</a></li>
				<li class="interactive05"><a href="#" class="subject5">사업체</a></li>
				<li class="interactive06"><a href="#" class="subject6">농림어가</a></li>
				<!--<li class="close"><a href="#">메뉴닫기</a></li>-->
			</ul>
			<div id="chartTableArea" class="control_item control_btn chart" title="차트">데이터보드</div>
		</div>
	</body>
</html>