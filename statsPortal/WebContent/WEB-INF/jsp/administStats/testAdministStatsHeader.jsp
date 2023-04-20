<%
	/**************************************************************************************************************************
	* Program Name	: 행정통계시각화 > 헤더
	* File Name		: administStatsHeader.jsp
	* Comment		:
	* History		:
	**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!-- <script src="/js/administStats/administStatsChart.js"></script>
<script src="/js/administStats/newlyDash.js"></script>
<script src="/js/administStats/houseDash.js"></script>
<script src="/js/administStats/middlDash.js"></script>
<script src="/js/administStats/retunDash.js"></script>
<script src="/js/administStats/more1Dash.js"></script>
<script src="/js/administStats/more2Dash.js"></script>
<script src="/js/administStats/more3Dash.js"></script>
<script src="/js/administStats/administStatsMap.js"></script>-->

<!-- 차트기능[S] -->
<script src="/js/administStats/highcharts/highcharts.js"></script>
<script src="/js/administStats/highcharts/highcharts-more.js"></script>
<script src="/js/administStats/highcharts/heatmap.js"></script>
<script src="/js/administStats/highcharts/treemap.js"></script>
<script src="/js/administStats/highcharts/annotations.js"></script>
<script src="/js/administStats/highcharts/exporting.js"></script>
<script src="/js/administStats/highcharts/offline-exporting.src.js"></script>
<script src="/js/administStats/highcharts/export-data.js"></script>
<script src="/js/administStats/commonChart.js"></script>
<!-- 차트기능[E] -->

<!-- 2020.10.20 캡쳐관련 js추가  START-->
<script src="/js/plugins/imageCapture/rgbcolor.js"></script>
<script src="/js/plugins/imageCapture/canvg.js"></script>
<script src="/js/plugins/imageCapture/html2canvas.js"></script>
<script src="/js/plugins/imageCapture/html2canvas.svg.js"></script>
<!-- 2020.10.20 캡쳐관련 js추가  END-->

<!-- 2020.10.21 PDF저장 js추가  START-->
<script type="text/javascript" src="/js/plugins/html2pdf/dist/html2pdf.bundle.js"></script>
<!-- 2020.10.21 PDF저장 js추가  END-->

<header class="header" id="header">
	<div class="header-wrap">
		<ul class="header-menu">
			<li class="hm1 on">
				<a href="#" title="선택됨" onclick="javascript: $administStatsMain.ui.callAdministStats(); return false;" class="ic1 active">
					<i></i>한눈에 보는 통계
				</a>
			</li>
			<li class="hm2">
				<a href="#" onclick="javascript: $administStatsMain.ui.callAdministStatsDetail(); return false;" class="ic2">
					<i></i>자세히 보는 통계
				</a>
			</li>
		</ul>

		<div class="header-tag">
			<label for="searchYear" class="sr_only">검색 년도 선택</label>
			<select class="select sb_year" id="searchYear">
			</select>
			<%-- 통계더보기는 시도데이터 없음 --%>
			<c:if test="${!fn:contains(mode, 'more')}">
				<div class="tag-group">
					<span class="tag-item tag_item">
						대한민국
						<span style="margin-left: 7px; margin-right: 7px;">></span>
						<span class="tag_sido">전국</span>
					</span>
				</div>
			</c:if>
		</div>

		<div class="header-right">
			<a href="#" class="btn-outline btn-guide btn" title="사용 가이드" data-mode="${mode}" onclick="javascript: return false;">사용 가이드</a>
			<a href="#" class="btn-icon btn-statis btn" title="통계설명자료" data-mode="${mode}" onclick="javascript: return false;">통계설명자료</a>
			<a href="#" class="btn-icon btn-press btn" title="보도자료" data-mode="${mode}" onclick="javascript: return false;">보도자료</a>
			<a href="#" class="btn-icon btn-img btn" title="보고서 출력" onclick="javascript: return false;">보고서 출력</a>
			<a href="#" class="btn-icon btn-share btn" title="공유" onclick="javascript: return false;">공유</a>
		</div>
	</div>
</header>