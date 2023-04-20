<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta name="title" content="행정통계 시각화 지도">
	<meta name="sub-title" content="일자리행정통계">
	<style>
		.no__display{
			display:none;
		}
	</style>
	<script>
	$(document).ready(function() {
		srvLogWrite('O0', '14', '02', '01', '일자리행정통계', '');
		$("#year-select").css("width","56px"); 
	});
	</script>
</head>
<body>
<div class="dashboard__statistics" style="top: 50px;">	<!-- 2022-12-16 top: 50px 추가 -->
	<h3 class="dashboard__statistics__title">일자리행정통계 총괄</h3>
	<ul>
		<li>
			<div>
				<h4>총 일자리 수</h4>
				<p><span data-id="DT_1EP_3009-total" class="total-num">-</span>만개</p>
				<p>전년 대비<span data-id="DT_1EP_3009-rt" class="state">-%</span></p>
			</div>
		</li>
		<li>
			<div>
				<h4>일자리 증감 수</h4>
				<p><span data-id="DT_1EP_3002-total" class="total-num">-</span>만개<span data-id="DT_1EP_3002-rt" class="state"></span></p>
			</div>
		</li>
	</ul>	
</div>
<div class="dashboard__box p0" style="top: 50px;">	<!-- 2022-12-16 top: 50px 추가 -->
	<ul id="main-tab" class="administration__tab col-2 mb15">
		<li data-tab-function="mainTab01" class="on">규모</li>
		<li data-tab-function="mainTab02">증감</li>
	</ul>
	<div data-id="main-tab-content" class="administration__tab__con">
		<div class="pb15 mb15 px10 border-b-line">
			<h3 data-id="text-year" data-append-text="년 종사상지위별 일자리 수"></h3>
			<div class="dashboard__chart" id="more1Chart1" style="height: 250px; background-color: #ddd;"></div>
			<div class="dashboard__chart__con">
				<p>출처: 통계청,「일자리행정통계」</p>
				<div class="cf">
					<a href="#n" class="show-statistics">통계표 보기</a>
				</div>
			</div> 
		</div>
		<div class="pb15 mb15 px10 border-b-line">
			<h3>연도별 종사상지위별 일자리 수</h3>
			<div class="dashboard__chart" id="more1Chart1_1" style="height: 250px; background-color: #ddd;"></div>
			<div class="dashboard__chart__con">
				<p>출처: 통계청,「일자리행정통계」</p>
				<div class="cf">
					<!-- <a href="#n" class="show-statistics">통계표 보기</a> -->
				</div>
			</div> 
		</div>
		<div class="pb15 mb15 px10 border-b-line">
			<h3 data-id="text-year" data-append-text="년 기업규모별 일자리 수"></h3>
			<div class="dashboard__chart" id="more1Chart2" style="height: 250px; background-color: #ddd;"></div>
			<div class="dashboard__chart__con">
				<p>출처: 통계청,「일자리행정통계」</p>
				<div class="cf">
					<a href="#n" class="show-statistics">통계표 보기</a>
				</div>
			</div> 
		</div>
		<div class="pb15 mb15 px10 border-b-line">
			<h3>연도별 기업규모별 일자리 수</h3>
			<div class="dashboard__chart" id="more1Chart2_1" style="height: 250px; background-color: #ddd;"></div>
			<div class="dashboard__chart__con">
				<p>출처: 통계청,「일자리행정통계」</p>
				<div class="cf">
					<!-- <a href="#n" class="show-statistics">통계표 보기</a> -->
				</div>
			</div> 
		</div>
		<div class="pb15 mb15 px10 border-b-line">
			<h3 data-id="text-year" data-append-text="년 산업분류별 일자리 수"></h3>
			<div class="dashboard__chart" id="more1Chart3" style="height: 250px; background-color: #ddd;"></div>
			<div class="dashboard__chart__con">
				<p>출처: 통계청,「일자리행정통계」</p>
				<div class="cf">
					<a href="#n" class="show-statistics">통계표 보기</a>
				</div>
			</div> 
		</div>
		<div class="pb15 mb15 px10 border-b-line">
			<h3 data-id="text-year" data-append-text="년 조직형태별 일자리 수"></h3>
			<div class="dashboard__chart" id="more1Chart4" style="height: 250px; background-color: #ddd;"></div>
			<div class="dashboard__chart__con">
				<p>출처: 통계청,「일자리행정통계」</p>
				<div class="cf">
					<a href="#n" class="show-statistics">통계표 보기</a>
				</div>
			</div> 
		</div>
		<div class="pb15 mb15 px10 border-b-line">
			<h3>연도별 조직형태별 일자리 수</span></h3>
			<div class="dashboard__chart" id="more1Chart4_1" style="height: 250px; background-color: #ddd;"></div>
			<div class="dashboard__chart__con">
				<p>출처: 통계청,「일자리행정통계」</p>
				<div class="cf">
					<!-- <a href="#n" class="show-statistics">통계표 보기</a> -->
				</div>
			</div> 
		</div>
		<div class="pb15 mb15 px10">
			<h3 data-id="text-year" data-append-text="년 성별·연령대별 일자리 수"></h3>
			<div class="dashboard__chart" id="more1Chart5" style="height: 250px; background-color: #ddd;"></div>
			<div class="dashboard__chart__con">
				<p>출처: 통계청,「일자리행정통계」</p>
				<div class="cf">
					<a href="#n" class="show-statistics">통계표 보기</a>
				</div>
			</div> 
		</div>
		<div class="pb15 mb15 px10">
			<h3>연도별 성별·연령대별 일자리 수</h3>
			<ul data-type="tab" data-tab-content="sub-content01" class="administration__sub-tab">
                <li class="on">남자</li>
                <li>여자</li>
            </ul>
            <div class="administration__sub-tab__con sub-content01">
                <div class="dashboard__chart" id="more1Chart5_1" style="height: 250px; background-color: #ddd;"></div>
            </div>
            <div class="administration__sub-tab__con sub-content01 no__display">
                <div class="dashboard__chart" id="more1Chart5_2" style="height: 250px; background-color: #ddd;"></div>
            </div>
			<div class="dashboard__chart__con">
				<p>출처: 통계청,「일자리행정통계」</p>
				<div class="cf">
					<!-- <a href="#n" class="show-statistics">통계표 보기</a> -->
				</div>
			</div> 
		</div>
		
	</div>
	<div data-id="main-tab-content" class="administration__tab__con no__display">
		<div class="pb15 mb15 px10 border-b-line">
			<h3 data-id="text-year" data-append-text="년 일자리 증감"></h3>
			<div class="dashboard__chart" id="more1Chart6" style="height: 250px; background-color: #ddd;"></div>
			<div class="dashboard__chart__con">
				<p>출처: 통계청,「일자리행정통계」</p>
				<div class="cf">
					<a href="#n" class="show-statistics">통계표 보기</a>
				</div>
			</div> 
		</div>
		<div class="pb15 mb15 px10 border-b-line">
			<h3>연도별 일자리 증감</h3>
			<div class="dashboard__chart" id="more1Chart6_1" style="height: 250px; background-color: #ddd;"></div>
			<div class="dashboard__chart__con">
				<p>출처: 통계청,「일자리행정통계」</p>
				<div class="cf">
					<!-- <a href="#n" class="show-statistics">통계표 보기</a> -->
				</div>
			</div> 
		</div>
		<div class="pb15 mb15 px10 border-b-line">
			<h3 data-id="text-year" data-append-text="년 종사상지위별 일자리 증감"></h3>
			<div class="dashboard__chart" id="more1Chart7" style="height: 250px; background-color: #ddd;"></div>
			<div class="dashboard__chart__con">
				<p>출처: 통계청,「일자리행정통계」</p>
				<div class="cf">
					<a href="#n" class="show-statistics">통계표 보기</a>
				</div>
			</div> 
		</div>
		<div class="pb15 mb15 px10 border-b-line">
			<h3>연도별 종사상지위별 일자리 증감 </h3>
			<div class="dashboard__chart" id="more1Chart7_1" style="height: 250px; background-color: #ddd;"></div>
			<div class="dashboard__chart__con">
				<p>출처: 통계청,「일자리행정통계」</p>
				<div class="cf">
					<!-- <a href="#n" class="show-statistics">통계표 보기</a> -->
				</div>
			</div> 
		</div>
		<div class="pb15 mb15 px10 border-b-line">
			<h3 data-id="text-year" data-append-text="년 기업규모별 일자리 증감"></h3>
			<div class="dashboard__chart" id="more1Chart8" style="height: 250px; background-color: #ddd;"></div>
			<div class="dashboard__chart__con">
				<p>출처: 통계청,「일자리행정통계」</p>
				<div class="cf">
					<a href="#n" class="show-statistics">통계표 보기</a>
				</div>
			</div> 
		</div>
		<div class="pb15 mb15 px10 border-b-line">
			<h3>연도별 기업규모별 일자리 증감</h3>
			<div class="dashboard__chart" id="more1Chart8_1" style="height: 250px; background-color: #ddd;"></div>
			<div class="dashboard__chart__con">
				<p>출처: 통계청,「일자리행정통계」</p>
				<div class="cf">
					<!-- <a href="#n" class="show-statistics">통계표 보기</a> -->
				</div>
			</div> 
		</div>
		<div class="pb15 mb15 px10 border-b-line">
			<h3 data-id="text-year" data-append-text="년 산업분류별 일자리 증감"></h3>
			<div class="dashboard__chart" id="more1Chart9" style="height: 250px;background-color: #ddd;"></div>
			<div class="dashboard__chart__con">
				<p>출처: 통계청,「일자리행정통계」</p>
				<div class="cf">
					<a href="#n" class="show-statistics">통계표 보기</a>
				</div>
			</div> 
		</div>
		<div class="pb15 mb15 px10 border-b-line">
			<h3 data-id="text-year" data-append-text="년 조직형태별 일자리 증감"></h3>
			<div class="dashboard__chart" id="more1Chart10" style="height: 250px; background-color: #ddd;"></div>
			<div class="dashboard__chart__con">
				<p>출처: 통계청,「일자리행정통계」</p>
				<div class="cf">
					<a href="#n" class="show-statistics">통계표 보기</a>
				</div>
			</div> 
		</div>
		<div class="pb15 mb15 px10 border-b-line">
			<h3>연도별 조직형태별 일자리 증감</h3>
			<div class="dashboard__chart" id="more1Chart10_1" style="height: 250px; background-color: #ddd;"></div>
			<div class="dashboard__chart__con">
				<p>출처: 통계청,「일자리행정통계」</p>
				<div class="cf">
					<!-- <a href="#n" class="show-statistics">통계표 보기</a> -->
				</div>
			</div> 
		</div>
		<div class="pb15 mb15 px10 border-b-line">
			<h3 data-id="text-year" data-append-text="년 성별·연령대별 일자리 증감"></h3>
			<div class="dashboard__chart" id="more1Chart11" style="height: 250px; background-color: #ddd;"></div>
			<div class="dashboard__chart__con">
				<p>출처: 통계청,「일자리행정통계」</p>
				<div class="cf">
					<a href="#n" class="show-statistics">통계표 보기</a>
				</div>
			</div> 
		</div>
		<div class="pb15 mb15 px10">
			<h3>연도별 성별·연령대별 일자리 증감</h3>
			<ul data-type="tab" data-tab-content="sub-content02" class="administration__sub-tab">
                <li class="on">남자</li>
                <li>여자</li>
            </ul>
            <div class="administration__sub-tab__con sub-content02">
                <div class="dashboard__chart" id="more1Chart11_1" style="height: 250px; background-color: #ddd;"></div>
            </div>
            <div class="administration__sub-tab__con sub-content02 no__display">
                <div class="dashboard__chart" id="more1Chart11_2" style="height: 250px; background-color: #ddd;"></div>
            </div>
			<div class="dashboard__chart__con">
				<p>출처: 통계청,「일자리행정통계」</p>
				<div class="cf">
					<!-- <a href="#n" class="show-statistics">통계표 보기</a> -->
				</div>
			</div> 
		</div>
	</div>
</div>
</body>
</html> 