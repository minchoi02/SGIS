<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta name="title" content="행정통계 시각화 지도">
	<meta name="sub-title" content="신혼부부통계">
	<script>
	$(document).ready(function() {
		srvLogWrite('O0', '14', '02', '01', '신혼부부통계', '');
	});
		$(()=>{
			$("#main-tab li").click(function(){
				$("[data-id=main1-more]").hide();
				$("#main-tab li").removeClass("on");
				$(this).addClass("on");
				$("[data-id=main-tab-content]").hide();
				$("[data-id=main-tab-content]:eq("+$("#main-tab li").index($(this))+")").show();
				$("[data-id=main-tab-content]:eq("+$("#main-tab li").index($(this))+")>[data-type=tab]>li:first").trigger("click");
			});
			$("[data-type=tab] li").click(function(){
				$("[data-id=main1-more]").hide();
				$(this).parent().children("li").removeClass("on");
				$(this).addClass("on");
				if(typeof $administStatsMap.chart[$(this).parent().data("chart-function")].common==="function"){
					$administStatsMap.chart[$(this).parent().data("chart-function")].common();
				}
			})
		});
	</script>
</head>
<body>
<style>
.dashboard__statistics > ul > li:nth-child(1) { border:1px solid #e0e0e0; border-radius:5px 5px 0 0 ; }
.dashboard__statistics > ul > li:nth-child(2) { border:1px solid #e0e0e0; border-top:0px; border-radius:0 0 0 5px; }
.dashboard__statistics > ul > li:nth-child(3) { border:1px solid #e0e0e0; border-top:0px; border-left:0px; border-radius:0 0 5px 0; }
</style>



	<div id="summary-container" class="dashboard__statistics">
		
		<ul>
			<li style="width:100%;">
				<h4 id="total-title">전체 신혼부부 수</h4>
				<p><span data-id="total-number" class="total-num">-</span>쌍</p>
				<p>전년 대비<span data-id="total-rt" class="state state-up">-%</span></p>
			</li>
			<li>
				<h4>초혼 신혼부부 수</h4>
				<p><span data-id="DT_1NW2034-number" class="total-num">-</span>쌍</p>
				<p>전년 대비<span data-id="DT_1NW2034-rt" class="state state-up">-%</span></p>
			</li>
			<li>
				<h4>재혼 신혼부부 수</h4>
				<p><span data-id="DT_1NW3034-number" class="total-num">-</span>쌍</p>
				<p>전년 대비<span data-id="DT_1NW3034-rt" class="state state-up">-%</span></p>
			</li>
		</ul>
	</div>
	<div class="dashboard__box p0">
		<ul id="main-tab" class="administration__tab col-3">
			<li class="on">주요특징</li>
			<li>주택상황</li>
			<li>경제상황</li>
		</ul>
		<div data-id="main-tab-content" class="administration__tab__con">
			<ul id="main1-sub-tab" data-type="tab" data-chart-function="main1" class="administration__sub-tab">
				<li class="on">혼인 종류</li>
				<li>맞벌이 여부</li>
				<li>출생아 수</li>
			</ul>
			<div class="administration__sub-tab__con px10">
				<div data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart1-1-title" data-id="text-year" data-append-text="년 혼인 종류별 신혼부부 수" data-title-unit="(단위: 쌍)"></h3>
					<div class="dashboard__chart" style="height: 350px;" id="chart1-1"></div>
					<div id="chart1-1-0-legend" class="legend-container" style="margin-bottom:30px;">
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:rgb(255, 82, 83)"></span>
							<span class="legend-label">초혼</span>
						</div>
						<div class="legend-box" style="display: inline-block;margin-left:20px;">
							<span class="legend-box" style="background-color:rgb(35, 183, 209);"></span>
							<span class="legend-label">재혼</span>
						</div>
					</div>
					<div id="chart1-1-1-legend" class="legend-container" style="margin-bottom:30px;display:none;">
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:rgb(255, 82, 83)"></span>
							<span class="legend-label">외벌이</span>
						</div>
						<div class="legend-box" style="display: inline-block;margin-left:20px;">
							<span class="legend-box" style="background-color:rgb(35, 183, 209);"></span>
							<span class="legend-label">맞벌이</span>
						</div>
						<div class="legend-box" style="display: inline-block;margin-left:20px;">
							<span class="legend-box" style="background-color:rgb(51, 51, 51);"></span>
							<span class="legend-label">기타</span>
						</div>
					</div>
					<div id="chart1-1-2-legend" class="legend-container" style="margin-bottom:30px;display:none;">
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#e2658f"></span>
							<span class="legend-label">상위 3개 지역</span>
						</div>
						<div class="legend-box" style="display: inline-block;margin-left:20px;">
							<span class="legend-box" style="background-color:#35829e"></span>
							<span class="legend-label">하위 3개 지역</span>
						</div>
					</div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청, 「신혼부부통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main1">통계표 보기</a>
							<div data-id="main1-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>신혼부부 총괄</p>
									<p class="show-statistics" onclick="openKosis('DT_1NW1001')">통계표 보기</p>
								</div>
								<div>
									<p>초혼 신혼부부 총괄</p>
									<p class="show-statistics" onclick="openKosis('DT_1NW2034')">통계표 보기</p>
								</div>
								<div>
									<p>재혼 신혼부부 총괄</p>
									<p class="show-statistics" onclick="openKosis('DT_1NW3034')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
			<div class="administration__sub-tab__con px10">
				<div data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart1-2-title" data-id="text-year" data-append-text="년 맞벌이 여부별 신혼부부 수" data-title-unit="(단위: 쌍)"></h3>
<!-- 					<div id="chart1-2-avg-text" class="administration__average"></div> -->
					<div style="overflow:auto;">
						<div class="dashboard__chart" id="chart1-2" style="width:1200px;"></div>
					</div>
					<div id="chart1-2-legend" class="legend-container" style="margin-bottom:30px;padding-top:15px;">
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:rgb(255, 82, 83)"></span>
							<span class="legend-label">초혼</span>
						</div>
						<div class="legend-box" style="display: inline-block;margin-left:20px;">
							<span class="legend-box" style="background-color:rgb(35, 183, 209);"></span>
							<span class="legend-label">재혼</span>
						</div>
						<div class="legend-box" style="display: none;margin-left:20px;">
							<span class="legend-box" style="background-color:rgb(51, 51, 51);"></span>
							<span class="legend-label">기타</span>
						</div>
					</div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청, 「신혼부부통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main1">통계표 보기</a>
							<div data-id="main1-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>신혼부부 총괄</p>
									<p class="show-statistics" onclick="openKosis('DT_1NW1001')">통계표 보기</p>
								</div>
								<div>
									<p>초혼 신혼부부 총괄</p>
									<p class="show-statistics" onclick="openKosis('DT_1NW2034')">통계표 보기</p>
								</div>
								<div>
									<p>재혼 신혼부부 총괄</p>
									<p class="show-statistics" onclick="openKosis('DT_1NW3034')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
			<div class="administration__sub-tab__con px10">
				<div id="chart1-3-container" data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart1-3-title">연도별 혼인종류별 신혼부부 수<span>(단위 : 쌍)</span></h3>
					<div class="dashboard__chart" id="chart1-3" style="height:300px;"></div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청, 「신혼부부통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main1">통계표 보기</a>
							<div data-id="main1-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>신혼부부 총괄</p>
									<p class="show-statistics" onclick="openKosis('DT_1NW1001')">통계표 보기</p>
								</div>
								<div>
									<p>초혼 신혼부부 총괄</p>
									<p class="show-statistics" onclick="openKosis('DT_1NW2034')">통계표 보기</p>
								</div>
								<div>
									<p>재혼 신혼부부 총괄</p>
									<p class="show-statistics" onclick="openKosis('DT_1NW3034')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
		</div>
		<div data-id="main-tab-content" class="administration__tab__con" style="display:none;">
			<ul id="main2-sub-tab" data-type="tab" data-chart-function="main2" class="administration__sub-tab">
				<li class="on">주택 소유</li>
				<li>주택자산 가액</li>
			</ul>
			<div class="administration__sub-tab__con px10">
				<div id="chart2-1-container" data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart2-1-title" data-id="text-year" data-append-text="년 초혼 신혼부부 혼인연차별 주택소유율" data-title-unit="(단위: %,쌍)"></h3>
					<div class="dashboard__chart" id="chart2-1" style="height:300px;"></div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청, 「신혼부부통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main2">통계표 보기</a>
						</div>
					</div> 
				</div>
			</div>
			<div class="administration__sub-tab__con px10">
				<div id="chart2-2-container" data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart2-2-title" data-id="text-year" data-append-text="년 지역별 초혼 신혼부부 주택소유율" data-title-unit="(단위: %,쌍)"></h3>
<!-- 					<div id="chart2-2-avg-text" class="administration__average"></div> -->
					<div style="overflow:auto;">
						<div class="dashboard__chart" id="chart2-2" style="height:300px;width:1200px"></div>
					</div>
					<div id="chart2-2-legend" class="legend-container" style="text-align: left;width:220px;margin:0 auto 30px">
						<div class="legend-box">
							<span class="legend-box" style="background-color:#395352;"></span>
							<span class="legend-label">6천만원 이하</span>
						</div>
						<div class="legend-box">
							<span class="legend-box" style="background-color:#3F6864;"></span>
							<span class="legend-label">6천만원 초과~1억 5천만원 이하</span>
						</div>
						<div class="legend-box">
							<span class="legend-box" style="background-color:#448074;"></span>
							<span class="legend-label">1억 5천만원 초과~3억원 이하</span>
						</div>
						<div class="legend-box">
							<span class="legend-box" style="background-color:#599E99;"></span>
							<span class="legend-label">3억원 초과~6억원 이하</span>
						</div>
						<div class="legend-box">
							<span class="legend-box" style="background-color:#6FA89F;"></span>
							<span class="legend-label">6억원 초과</span>
						</div>
					</div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청, 「신혼부부통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main2">통계표 보기</a>
						</div>
					</div> 
				</div>
			</div>
			<div class="administration__sub-tab__con px10">
				<div id="chart2-3-container" data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart2-3-title"></h3>
					<div class="dashboard__chart" id="chart2-3" style="height:300px;"></div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청, 「신혼부부통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main2">통계표 보기</a>
						</div>
					</div> 
				</div>
			</div>
		</div>
		<div data-id="main-tab-content" class="administration__tab__con" style="display:none;">
			<ul id="main3-sub-tab" data-type="tab" data-chart-function="main3" class="administration__sub-tab">
				<li class="on">소득수준</li>
				<li>금융권 대출잔액</li>
			</ul>
			<div class="administration__sub-tab__con px10">
				<div id="chart3-1-container" data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart3-1-title" data-id="text-year" data-append-text="년 초혼 신혼부부 소득수준별 비중" data-title-unit="(단위: %, 만원)"></h3>
<!-- 					<div id="chart3-1-avg-text" class="administration__average"></div> -->
					<div class="dashboard__chart" id="chart3-1" style="height:250px;"></div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청, 「신혼부부통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main3">통계표 보기</a>
						</div>
					</div> 
				</div>
			</div>
			<div class="administration__sub-tab__con px10">
				<div id="chart3-2-container" data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart3-2-title">연도별 초혼 신혼부부 소득수준별 비중<span>(단위: %, 만원)</span></h3>
					<div class="dashboard__chart" id="chart3-2" style="height:300px;"></div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청, 「신혼부부통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main3">통계표 보기</a>
						</div>
					</div> 
				</div>
			</div>
		</div>
	</div>
</body>
</html> 