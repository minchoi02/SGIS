<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta name="title" content="행정통계 시각화 지도">
	<meta name="sub-title" content="귀농어·귀촌인통계">
	<script src="https://d3js.org/colorbrewer.v1.min.js"></script>
	<script>
	$(document).ready(function() {
		srvLogWrite('O0', '14', '02', '01', '귀농어·귀촌인통계', '');
	});
		$(()=>{
			$(".administration__city").css("visibility","visible");
			$(".administration__city").css("margin-top","50px");	/* 2022-12-20 css 추가 */
			
			$("#main-tab li").click(function(){
				$("#main-tab li").removeClass("on");
				$(this).addClass("on");
				$("[data-id=main-tab-content]").hide();
				$("[data-id=main-tab-content]:eq("+$("#main-tab li").index($(this))+")").show();
				$("[data-id=main-tab-content]:eq("+$("#main-tab li").index($(this))+")>[data-type=tab]>li.on").trigger("click");
			});
			$("[data-type=tab] li").click(function(){
				$("[data-id=main3-1-more]").hide();
				$("[data-id=main3-2-more]").hide();
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
.dashboard__statistics > ul > li:nth-child(1) { border:1px solid #e0e0e0; border-radius:5px 0 0 0 ; }
.dashboard__statistics > ul > li:nth-child(2) { border:1px solid #e0e0e0; border-left:0px; border-radius:0 5px 0 0; }
.dashboard__statistics > ul > li:nth-child(3) { border:1px solid #e0e0e0; border-top:0px; border-radius:0; }
.dashboard__statistics > ul > li:nth-child(4) { border:1px solid #e0e0e0; border-top:0px; border-left:0px; border-radius:; }
.dashboard__statistics > ul > li:nth-child(5) { border:1px solid #e0e0e0; border-top:0px; border-radius:0 0 0 5px; }
.dashboard__statistics > ul > li:nth-child(6) { border:1px solid #e0e0e0; border-top:0px; border-left:0px; border-radius:0 0 5px 0; }
.administration__tab li { padding:10px !important; }
</style>

 

	<div id="summary-container" class="dashboard__statistics">
		<!-- <h3 class="dashboard__statistics__title">귀농어·귀촌인통계 총괄</h3> -->
		<ul>
			<li>
				<h4>귀농가구 수</h4>
				<p><span data-id="DT_1A02008T01-number" class="total-num">-</span>가구</p>
				<p class="dtRtState">전년 대비<span data-id="DT_1A02008T01-rt" class="state state-up">-%</span></p>
			</li>
			<li>
				<h4>귀농가구원 수</h4>
				<p><span data-id="DT_1A02002T01-number" class="total-num">-</span>명</p>
				<p class="dtRtState">전년 대비<span data-id="DT_1A02002T01-rt" class="state state-up">-%</span></p>
			</li>
			<li>
				<h4>귀어가구 수</h4>
				<p><span data-id="DT_1A02029T01-number" class="total-num">-</span>가구</p>
				<p class="dtRtState">전년 대비<span data-id="DT_1A02029T01-rt" class="state state-up">-%</span></p>			
			</li>
			<li>
				<h4>귀어가구원 수</h4>
				<p><span data-id="DT_1A02023T01-number" class="total-num">-</span>명</p>
				<p class="dtRtState">전년 대비<span data-id="DT_1A02023T01-rt" class="state state-up">-%</span></p>
			</li>
			<li>
				<h4>귀촌가구 수</h4>
				<p><span data-id="DT_1A02020T01-number" class="total-num">-</span>가구</p>
				<p class="dtRtState">전년 대비<span data-id="DT_1A02020T01-rt" class="state state-up">-%</span></p>
			</li>
			<li>
				<h4>귀촌인 수</h4>
				<p><span data-id="DT_1A02015T01-number" class="total-num">-</span>명</p>
				<p class="dtRtState">전년 대비<span data-id="DT_1A02015T01-rt" class="state state-up">-%</span></p>
			</li>
		</ul>
	</div>
	<div class="dashboard__box p0">
		<ul id="main-tab" class="administration__tab col-3">
			<li class="on">가구현황</li>
			<li>인구현황</li>
			<li>주요특성</li>
		</ul>
	
		<div data-id="main-tab-content" class="administration__tab__con">
			<ul id="main1-sub-tab" data-type="tab" data-chart-function="main1" class="administration__sub-tab">
				<li class="on">귀농</li>
				<li>귀어</li>
				<li>귀촌</li>
			</ul>
			<div class="administration__sub-tab__con px10">
				<div id="chart1-container" class="pb15 mb15 border-b-line" style="position:relative;">
<!-- 					<h3 id="chart1-title" data-id="text-year" data-append-text="년 가구원수별 귀농가구 수 " data-title-unit="(단위: 가구)"></h3> -->
					<h3 id="chart1-title" data-id="text-year" data-append-text="년 가구원수별 귀농가구 수 "></h3>
					<div class="dashboard__chart" style="height:300px;" id="chart1"></div>
					<div id="chart1-legend" class="legend-container" style="position: absolute;top:330px;left: 50%; transform: translate(-50%, -50%);display: none;"></div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「귀농어,귀촌인 통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main1">통계표 보기</a>
						</div>
					</div> 
				</div>
			</div>
			<div class="administration__sub-tab__con px10">
				<div data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart2-title" data-id="text-year" data-append-text="년 지역별 귀농가구 수" data-title-unit="(단위: 가구)"></h3>
					<!-- 
					<div id="chart2-avg-text" class="administration__average"></div>
					-->
					<div style="overflow:auto;height: 320px;">
						<div class="dashboard__chart" id="chart2" style="height:250px;width:800px"></div>
					</div>
					<div id="chart2-legend" class="legend-container" style="margin-bottom:30px;padding-top:15px;">
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box"></span>
							<span class="legend-label"></span>
						</div>
						<div class="legend-box" style="display: inline-block;margin-left:15px;">
							<span class="legend-box"></span>
							<span class="legend-label"></span>
						</div>
						<div class="legend-box" style="display: inline-block;margin-left:15px;">
							<span class="legend-box"></span>
							<span class="legend-label"></span>
						</div>
						<div class="legend-box" style="display: inline-block;margin-left:15px;">
							<span class="legend-box""></span>
							<span class="legend-label"></span>
						</div>
					</div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「귀농어,귀촌인 통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main1">통계표 보기</a>
						</div>
					</div> 
				</div>
			</div>
			<div class="administration__sub-tab__con px10">
				<div id="chart3-container" data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
				<h3 id="chart3-title" data-id="text-year" data-append-text="연도별 가구원수별 귀농가구 수" data-title-unit="(단위: 가구)"></h3>
					<div class="dashboard__chart" id="chart3" style="height:300px;"></div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「귀농어,귀촌인 통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main1">통계표 보기</a>
						</div>
					</div> 
				</div>
			</div>
		</div>	
		
		<div data-id="main-tab-content" class="administration__tab__con02" style="display:none;">
			<ul id="main2-sub-tab" data-type="tab" data-chart-function="main2" class="administration__sub-tab">
				<li class="on">귀농</li>
				<li>귀어</li>
				<li>귀촌</li>
			</ul>
			<div class="administration__sub-tab__con px10">
				<div data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart2-1-title" data-id="text-year" data-append-text="년 귀농인구 " data-title-unit="(단위: 명)"></h3>
					<div class="dashboard__chart" style="height: 270px;" id="chart2-1"></div>
					<div id="chart2-1-legend" class="legend-container" style="position: absolute;top:330px;left: 50%; transform: translate(-50%, -50%);display: none;"></div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「귀농어,귀촌인 통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main2">통계표 보기</a>
						</div>
					</div> 
				</div>
			</div>
			<div class="administration__sub-tab__con px10">
				<div data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart2-2-title" data-id="text-year" data-append-text="년 지역별 귀농가구 수" data-title-unit="(단위: 명)"></h3>
					<!-- 
					<div id="chart2-2-avg-text" class="administration__average"></div>
					-->
					<div style="overflow:auto;height:280px;">
						<div class="dashboard__chart" id="chart2-2" style="height: 250px;width:800px;"></div>
					</div>
					<div id="chart2-2-legend" class="legend-container" style="margin-bottom:30px;padding-top:15px;">
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box"></span>
							<span class="legend-label"></span>
						</div>
						<div class="legend-box" style="display: inline-block;margin-left:15px;">
							<span class="legend-box"></span>
							<span class="legend-label"></span>
						</div>
						<div class="legend-box" style="display: inline-block;margin-left:15px;">
							<span class="legend-box"></span>
							<span class="legend-label"></span>
						</div>
					</div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「귀농어,귀촌인 통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main2">통계표 보기</a>
						</div>
					</div> 
				</div>
			</div>
			<div class="administration__sub-tab__con px10">
				<div id="chart2-3-container" data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart2-3-title" data-append-text="연도별 귀농 현황" data-title-unit="(단위: 명)"></h3>
					<!--  
					<div id="chart2-3-avg-text" class="administration__average"></div>
					-->
					<div style="overflow:auto;height:270px;">
						<div class="dashboard__chart" id="chart2-3" style="height:250px;"></div>
					</div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「귀농어,귀촌인 통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main2">통계표 보기</a>
						</div>
					</div> 
				</div>
			</div>
		</div>
		
		<div data-id="main-tab-content" class="administration__tab__con03" style="display:none;">
			<ul id="main3-sub-tab" data-type="tab" data-chart-function="main3" class="administration__sub-tab">
				<li class="on">성별</li>
				<li>연령별</li>
			</ul>
			<div class="administration__sub-tab__con px10">
				<div id="chart3-1-container" data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart3-1-title" data-id="text-year" data-append-text="년 귀농어·귀촌인 성별 비중  " data-title-unit="(단위: %,명)"></h3>
					<div class="dashboard__chart" style="height: 350px;" id="chart3-1"></div>
					<div id="chart3-1-legend" class="legend-container" style="position: absolute;top:330px;left: 50%; transform: translate(-50%, -50%);display: none;"></div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「귀농어,귀촌인 통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main3">통계표 보기</a>
							<div data-id="main3-1-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>성별 귀농가구원</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02002')">통계표 보기</p>
								</div>
								<div>
									<p>성별 귀어가구원</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02023')">통계표 보기</p>
								</div>
								<div>
									<p>성별 귀촌인</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02015')">통계표 보기</p>
								</div>
							</div>
							<div data-id="main3-2-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>연령별 귀농가구원</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02003')">통계표 보기</p>
								</div>
								<div>
									<p>연령별 귀어가구원</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02024')">통계표 보기</p>
								</div>
								<div>
									<p>연령별 귀촌인</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02016')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
			
			<div class="administration__sub-tab__con px10">
				<div id="chart3-2-container" data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart3-2-title" data-append-text="연도별 귀농인 성별 비중  " data-title-unit="(단위: %,명)"></h3>
					<div class="dashboard__chart" style="height: 350px;" id="chart3-2"></div>
					<div id="chart3-2-legend" class="legend-container" style="position: absolute;top:330px;left: 50%; transform: translate(-50%, -50%);display: none;"></div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「귀농어,귀촌인 통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main3">통계표 보기</a>
							<div data-id="main3-1-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>성별 귀농가구원</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02002')">통계표 보기</p>
								</div>
								<!-- 
								<div>
									<p>성별 귀어가구원</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02023')">통계표 보기</p>
								</div>
								<div>
									<p>성별 귀촌인</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02015')">통계표 보기</p>
								</div>
								 -->
							</div>
							<div data-id="main3-2-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>연령별 귀농가구원</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02003')">통계표 보기</p>
								</div>
								<!-- 
								<div>
									<p>연령별 귀어가구원</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02024')">통계표 보기</p>
								</div>
								<div>
									<p>연령별 귀촌인</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02016')">통계표 보기</p>
								</div>
								 -->
							</div>
						</div>
					</div> 
				</div>
			</div>
			
			<div class="administration__sub-tab__con px10">
				<div id="chart3-3-container" data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart3-3-title" data-append-text="연도별 귀어인 성별 비중  " data-title-unit="(단위: %,명)"></h3>
					<div class="dashboard__chart" style="height: 350px;" id="chart3-3"></div>
					<div id="chart3-3-legend" class="legend-container" style="position: absolute;top:330px;left: 50%; transform: translate(-50%, -50%);display: none;"></div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「귀농어,귀촌인 통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main3">통계표 보기</a>
							<div data-id="main3-1-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<!-- 
								<div>
									<p>성별 귀농가구원</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02002')">통계표 보기</p>
								</div>
								 -->
								<div>
									<p>성별 귀어가구원</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02023')">통계표 보기</p>
								</div>
								<!-- 
								<div>
									<p>성별 귀촌인</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02015')">통계표 보기</p>
								</div>
								 -->
							</div>
							<div data-id="main3-2-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<!-- 
								<div>
									<p>연령별 귀농가구원</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02003')">통계표 보기</p>
								</div>
								 -->
								<div>
									<p>연령별 귀어가구원</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02024')">통계표 보기</p>
								</div>
								<!-- 
								<div>
									<p>연령별 귀촌인</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02016')">통계표 보기</p>
								</div>
								 -->
							</div>
						</div>
					</div> 
				</div>
			</div>
			
			<div class="administration__sub-tab__con px10">
				<div id="chart3-4-container" data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart3-4-title" data-append-text="연도별 귀촌인 성별 비중  " data-title-unit="(단위: %,명)"></h3>
					<div class="dashboard__chart" style="height: 350px;" id="chart3-4"></div>
					<div id="chart3-4-legend" class="legend-container" style="position: absolute;top:330px;left: 50%; transform: translate(-50%, -50%);display: none;"></div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「귀농어,귀촌인 통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main3">통계표 보기</a>
							<div data-id="main3-1-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<!-- 
								<div>
									<p>성별 귀농가구원</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02002')">통계표 보기</p>
								</div>
								<div>
									<p>성별 귀어가구원</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02023')">통계표 보기</p>
								</div>
								 -->
								<div>
									<p>성별 귀촌인</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02015')">통계표 보기</p>
								</div>
							</div>
							<div data-id="main3-2-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<!-- 
								<div>
									<p>연령별 귀농가구원</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02003')">통계표 보기</p>
								</div>
								<div>
									<p>연령별 귀어가구원</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02024')">통계표 보기</p>
								</div>
								 -->
								<div>
									<p>연령별 귀촌인</p>
									<p class="show-statistics" onclick="openKosis('DT_1A02016')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
			
		</div>
	</div>
</body>
</html>