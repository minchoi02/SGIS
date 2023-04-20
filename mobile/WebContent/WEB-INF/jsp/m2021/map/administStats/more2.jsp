<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta name="title" content="행정통계 시각화 지도">
	<meta name="sub-title" content="퇴직연금통계">
	<script src="https://d3js.org/colorbrewer.v1.min.js"></script>
	<style>
		.no__display{
			display:none;
		}
	</style>
<script>
$(document).ready(function() {
	srvLogWrite('O0', '14', '02', '01', '퇴직연금통계', '');
	$("#year-select").css("width","56px"); 
});
</script>
</head>
<body>
<style>
.dashboard__statistics > ul > li:nth-child(1) { border:1px solid #e0e0e0; border-radius:5px 5px 0 0 ; }
.dashboard__statistics > ul > li:nth-child(2) { border:1px solid #e0e0e0; border-top:0px; border-radius:0 0 0 5px; }
.dashboard__statistics > ul > li:nth-child(3) { border:1px solid #e0e0e0; border-top:0px; border-left:0px; border-radius:0 0 5px 0; }
.administration__tab li { padding:10px !important; }
</style>
	<div id="summary-container" class="dashboard__statistics" style="top: 50px;">	<!-- 2022-12-16 top: 50px 추가 -->
		<h3 class="dashboard__statistics__title">퇴직연금통계 총괄</h3>
		<ul>
			<li style="width:100%;">
				<h4>총 적립금액</h4>
				<p><span data-id="DT_1RP013-total" class="total-num">-</span>백만원</p>
				<p>전년 대비<span data-id="DT_1RP013-rt" class="state state-up">-%</span></p>
			</li>
			<li>
				<h4>전체 도입 사업장</h4>
				<p><span data-id="DT_1RP006-total" class="total-num">-</span>개소</p>
				<p>전년 대비<span data-id="DT_1RP006-rt" class="state state-up">-%</span></p>
			</li>
			<li>				
				<h4>전체 가입 근로자</h4>
				<p><span data-id="DT_1RP000-total" class="total-num">-</span>명</p>
				<p>전년 대비<span data-id="DT_1RP000-rt" class="state state-up">-%</span></p>					
			</li>
		</ul>
	</div>
	<div class="dashboard__box p0" style="top: 50px;">	<!-- 2022-12-16 top: 50px 추가 -->
		<ul id="main-tab" class="administration__tab col-3 mb15">
		    <li class="on" data-tab-function="mainTab01">운용현황</li>
		    <li data-tab-function="mainTab02">도입사업장</li>
		    <li data-tab-function="mainTab03">도입근로자</li>
		    <li data-tab-function="mainTab04">기타</li>
		</ul>
		<div data-id="main-tab-content" class="administration__tab__con">
		    <div class="pb15 mb15 px10 border-b-line">
		        <h3>퇴직연금 총 적립금액</h3>
		        <div class="dashboard__chart" id="more2Chart1" style="height: 250px; background-color: #ddd;"></div>
		        <div class="dashboard__chart__con">
		            <p>출처: 통계청,「퇴직연금통계」</p>
		            <div class="cf">
		                <a href="#n" class="show-statistics">통계표 보기</a>
		            </div>
		        </div> 
		    </div>
		    <div class="pb15 mb15 px10 border-b-line">
		        <h3 data-id="text-year" data-append-text="년 제도유형별 운용방법별 퇴직연금 적립금액"></h3>
		        <div class="dashboard__chart" id="more2Chart2" style="height: 250px; background-color: #ddd;"></div>
		        <div class="dashboard__chart__con">
		            <p>출처: 통계청,「퇴직연금통계」</p>
		            <div class="cf">
		                <a href="#n" class="show-statistics">통계표 보기</a>
		            </div>
		        </div> 
		    </div>
		    <div class="pb15 mb15 px10">
		    	<h3 data-id="text-year" data-append-text="년 금융권역별 운용방법별 퇴직연금 적립금액"></h3>
		        <div class="dashboard__chart" id="more2Chart3" style="height: 250px; background-color: #ddd;"></div>
		        <div class="dashboard__chart__con">
		            <p>출처: 통계청,「퇴직연금통계」</p>
		            <div class="cf">
		                <a href="#n" class="show-statistics">통계표 보기</a>
		            </div>
		        </div> 
		    </div>
		</div>
		<div data-id="main-tab-content" class="administration__tab__con no__display">
		    <div class="pb15 mb15 px10 border-b-line">
		    	<h3>[퇴직연금제도]<br/>전체 도입 사업장 및 도입률</h3>
		        <ul data-type="tab" data-tab-content="sub-content01" class="administration__sub-tab">
		            <li class="on">전체 도입 사업장</li>
		            <li>도입률</li>
		        </ul>
		        <div class="administration__sub-tab__con sub-content01">
		            <div class="dashboard__chart" id="more2Chart4" style="height: 250px; background-color: #ddd;"></div>
		        </div>
		        <div class="administration__sub-tab__con sub-content01 no__display">
		            <div class="dashboard__chart" id="more2Chart4_1" style="height: 250px; background-color: #ddd;"></div>
		        </div>
		        <div class="dashboard__chart__con">
		            <p>출처: 통계청,「퇴직연금통계」</p>
		            <div class="cf">
		                <a href="#n" class="show-statistics">통계표 보기</a>
		            </div>
		        </div> 
		    </div>
		    <div class="pb15 mb15 px10">
		    	<!-- <h3 data-id="text-year" data-append-text="년 퇴직연금 주요 산업별 도입 사업장 수 및 도입률 " data-title-unit="(단위: 개소, %)"></h3> -->
		    	<h3>[퇴직연금제도]<br/>주요 산업별 전체 도입 사업장 및 도입률</h3>
		        <ul data-type="tab" data-tab-content="sub-content02" class="administration__sub-tab">
		            <li class="on">산업별 전체 도입 사업장</li>
		            <li>도입률</li>
		        </ul>
		        <div class="administration__sub-tab__con sub-content02">
		            <div class="dashboard__chart" id="more2Chart5" style="height: 250px; background-color: #ddd;"></div>
		        </div>
		        <div class="administration__sub-tab__con sub-content02 no__display">
		            <div class="dashboard__chart" id="more2Chart5_1" style="height: 250px; background-color: #ddd;"></div>
		        </div>
		        <div class="dashboard__chart__con">
		            <p>출처: 통계청,「퇴직연금통계」</p>
		            <div class="cf">
		                <a href="#n" class="show-statistics">통계표 보기</a>
		            </div>
		        </div> 
		    </div>
		</div>
		<div data-id="main-tab-content" class="administration__tab__con no__display">
		    <div class="pb15 mb15 px10 border-b-line">
		    	<h3>[퇴직연금제도]<br/>전체 가입 근로자 및 가입률</h3>
		        <ul data-type="tab" data-tab-content="sub-content03" class="administration__sub-tab">
		            <li class="on">전체 가입 근로자</li>
		            <li>가입률</li>
		        </ul>
		        <div class="administration__sub-tab__con sub-content03">
		            <div class="dashboard__chart" id="more2Chart6" style="height: 250px; background-color: #ddd;"></div>
		        </div>
		        <div class="administration__sub-tab__con sub-content03 no__display">
		            <div class="dashboard__chart" id="more2Chart6_1" style="height: 250px; background-color: #ddd;"></div>
		        </div>
		        <div class="dashboard__chart__con">
		            <p>출처: 통계청,「퇴직연금통계」</p>
		            <div class="cf">
		                <a href="#n" class="show-statistics">통계표 보기</a>
		            </div>
		        </div> 
		    </div>
		    <div class="pb15 mb15 px10 border-b-line">
		    	<!-- <h3 data-id="text-year" data-append-text="년 주요 산업별 퇴직연금 가입 근로자 수 및 가입률 " data-title-unit="(단위: 개소, %)"></h3> -->
		    	<h3>[퇴직연금제도]<br/>주요 산업별 전체 가입 근로자 및 도입률</h3>
		        <ul data-type="tab" data-tab-content="sub-content04" class="administration__sub-tab">
		            <li class="on">산업별 전체 가입 근로자</li>
		            <li>가입률</li>
		        </ul>
		        <div class="administration__sub-tab__con sub-content04">
		            <div class="dashboard__chart" id="more2Chart7" style="height: 250px; background-color: #ddd;"></div>
		        </div>
		        <div class="administration__sub-tab__con sub-content04 no__display">
		            <div class="dashboard__chart" id="more2Chart7_1" style="height: 250px; background-color: #ddd;"></div>
		        </div>
		        <div class="dashboard__chart__con">
		            <p>출처: 통계청,「퇴직연금통계」</p>
		            <div class="cf">
		                <a href="#n" class="show-statistics">통계표 보기</a>
		            </div>
		        </div> 
		    </div>
	    </div>
	    <div data-id="main-tab-content" class="administration__tab__con no__display">
		    <div class="pb15 mb15 px10 border-b-line">
		    	<h3 data-id="text-year" data-append-text="년 개인형 퇴직연금 추가 가입 현황"></h3>
		        <ul data-type="tab" data-tab-content="sub-content05" data-chart-function="main5" class="administration__sub-tab">
		            <li class="on">가입자 수</li>
		            <li>추가가입자의 퇴직연금 현황</li>
		        </ul>
		        <div class="administration__sub-tab__con sub-content05">
		            <div class="dashboard__chart" id="more2Chart8" style="height: 250px; background-color: #ddd;"></div>
		        </div>
		        <div class="administration__sub-tab__con sub-content05 no__display">
		            <div class="dashboard__chart" id="more2Chart9" style="height: 250px; background-color: #ddd;"></div>
		        </div>
		        <div class="dashboard__chart__con">
		            <p>출처: 통계청,「퇴직연금통계」</p>
		            <div class="cf">
		                <a href="#n" class="show-statistics">통계표 보기</a>
		            </div>
		        </div> 
		    </div>
		    <div class="pb15 mb15 px10">
		    	<h3 data-id="text-year" data-append-text="년 연령별 사유별 중도인출 현황"></h3>
		        <div class="dashboard__chart" id="more2Chart10" style="height: 250px; background-color: #ddd;"></div>
		            <div class="dashboard__chart__con">
		                <p>출처: 통계청,「퇴직연금통계」</p>
		                <div class="cf">
		                    <a href="#n" class="show-statistics">통계표 보기</a>
		                </div>
		            </div> 
		        </div>
		    </div>
		</div>

</body>
</html> 