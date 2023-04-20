<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<div id="current-state-sgg-databoard" class="Open_Type1" style="display:none;">
	<h3 id="current-state-title-area">데이터보드</h3>
	<button class="BtnClose" onclick="$('.Open_Type1').hide();">데이터보드닫기</button>
	<div class="title-area">
		<div class="title-info">
			<div>생활업종별 지역 시군구 현황</div>
			<div class="data-location title-location"></div>
		</div>
	</div>
	<div class="DetailBox" style="padding:0;">
		<div class="Subject SubjectC number4" style="display:none;">
			<nav><a class="M_on">음식점</a><a>도소매</a><a>서비스</a><a>숙박업</a></nav>
		</div>
		<%@include file="/WEB-INF/jsp/map/biz/databoard/companyTab.jsp" %>
		<div class="dbTabs type01 jobAreaType chart-tab">
			<a class="M_on" data-type="corp_cnt" data-unit="개">사업체 수</a>
			<!-- 
			<a data-type="upregion_vs_corp_per" data-unit="%">업종 비율</a>
			 -->
			<a data-type="corp_vs_ppltn_rate" data-unit="명" data-append-text="/1개">거주인구</a>
			<a data-type="corp_vs_worker_rate" data-unit="명" data-append-text="/1개">직장인구</a>
			<!-- 
			<a data-type="corp_vs_family_rate" data-unit="가구" data-append-text="/1개">가구 수</a>
			<a data-type="biz_worker_cnt" data-unit="명">종사자 수</a>
			 -->
			<a data-type="avg_worker_rate" data-unit="명">평균 종사자 수</a>
		</div>
		<!-- 사업체 수 start -->
		<div>
			<p class="horizontalTitle">
				<span>
					<span class="theme-info"></span><span class="theme-count"></span> 
					<br>
					<span class="data-location"></span><span class="data-location-sgg-count"></span>개 시군구 중 
				</span> 
				<strong class="rank"></strong>위
			</p>
			<div class="chart-area"></div>
		</div>
	</div>
	<%@include file="/WEB-INF/jsp/includes/pageUpDown.jsp" %>
</div>