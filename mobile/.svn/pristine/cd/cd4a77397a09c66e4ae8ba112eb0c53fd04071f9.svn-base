<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<div id="current-state-databoard" class="houseSelectDiv2" style="display:none;">
	<div class="datatit" style="display:flex; justify-content:space-between; align-items:center; ">
		<h2>생활업종 현황 - <span id="current-state-title">한식</span></h2>
		<button class="" type="button" onclick="$('#current-state-databoard').hide();">
			<svg width="15" height="15" viewBox="0 0 15 15" fill="#000" xmlns="http://www.w3.org/2000/svg">
				<path d="M1 1L13 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
				<path d="M13 1L1 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
			</svg>
		</button>
	</div>
	<div class="databoardSubArea">
		<p>생활업종별 지역 시군구 현황</p>
		<h1 id="current-state-location">서울특별시 금천구</h1>
	</div>
	<div class="sub_Wrap" style="position: relative;">
		<div class="gallery-thumbstxt" style="height: 48px;">
			<div class="gallery-thumbBox">
				<div class="tabDataboardtxt current">
					<p><a data-type="corp_cnt" data-unit="개">사업체 수</a></p>
				</div>
				<div class="tabDataboardtxt">
					<p><a data-type="corp_vs_ppltn_rate" data-unit="명" data-append-text="/1개">거주인구</a></p>
				</div>
				<div class="tabDataboardtxt">
					<p><a data-type="corp_vs_worker_rate" data-unit="명" data-append-text="/1개">직장인구</a></p>
				</div>
				<div class="tabDataboardtxt">
					<p><a data-type="avg_worker_rate" data-unit="명">평균 종사자 수</a></p>
				</div>
			</div>
		</div>
		<div class="gallery-top" style="min-height: calc(100vh - 280px); position: absolute; overflow: auto;">
			<div> <!-- 2020.09.03 [신예리] 스크롤 생기지 않도록 height 값 삭제 -->
				<div class="Con" style="padding-top: 0;">
					<div class="CountInfo-box">
						<ul>
							<li id="current-state-theme-info">
								<span class="pointCircle"></span> 사업체 수 : 
								<span>1297</span>개
							</li>
							<li id="current-state-data-location">
								<span class="pointCircle"></span>
								<span class="pointCount">24</span>위
							</li>
						</ul>
					</div> 
					<div class="conWrap mt10">
						<p class="subtit" id="current-state-chartCategoryTitle">강남구</p>
						<p class="num" id="current-state-chartDataTitle">3,710<span>명</span></p>
						<div class="graphArea" style="width: 100%; text-align: center; min-height: 240px;" > <!-- 2020.09.03 [신예리] 스크롤 생기지 않도록 min-height 값 수정 -->
							<!-- 데이터보드 화면(차트) 시작-->
							<div id="current-state-chart-area"></div>
						</div>
						<!-- 2020.09.09[신예리] 이전 버튼 추가 START -->
						<!-- <div class="mapBtnWrap" style="margin: 0;">
							<a onclick="$('#current-state-databoard').hide();">지도보기</a>
						</div> -->
						 
					</div>
				</div>
			</div>
		</div>
		<!-- <div class="conWrap mt10">
			<p class="subtit" id="current-state-chartCategoryTitle">강남구</p>
			<p class="num" id="current-state-chartDataTitle">3,710<span>개</span></p>
			<div style="width: 100%; text-align: center;">
				데이터보드 화면(차트) 시작
				<div id="current-state-chart-area"></div>
			</div>
			<div class="mapBtnWrap">
				<a id="current-state-databoardClose">지도보기</a>
			</div>
		</div>   -->
	</div>
</div>