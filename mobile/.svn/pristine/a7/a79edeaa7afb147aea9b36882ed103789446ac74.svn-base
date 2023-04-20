<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta name="title" content="행정통계 시각화 지도">
<meta name="sub-title" content="주택소유통계">
<script>
$(document).ready(function() {
	srvLogWrite('O0', '14', '02', '01', '주택소유통계', '');
});
	$(()=>{
		$(".tab_02").hide()
		//tp 개인기준 : 01,02 가구기준 : 주택소유 :03, 지역별 : 04
		//최상단 개인기준/ 가구기준 탭제어
		$("#main-tab li").click(function(){
			$("#main-tab li").removeClass("on");
			$(this).addClass("on");
// 			$("[data-id=main-tab-content]").hide();
// 			$("[data-id=main-tab-content]:eq("+$("#main-tab li").index($(this))+")").show();
			
			$("#chart8").parent().attr('style','height:260px;overflow:auto');
			if($("#main-tab li").index($(this)) == 0){
// 				$(".tab_01").show()
// 				$(".tab_02").hide()
				$("#administration__tab__con01").show();
				$("#administration__tab__con02").hide();
				
				$("#main1-sub-tab li").removeClass("on");
				$("#main1-sub-tab li:first").addClass("on");
				var tp = $("#main1-sub-tab").find(".on").attr("data-tp");
				if(typeof $administStatsMap.chart["main1"].set_chart1==="function"){
					$administStatsMap.chart["main1"].set_chart1(tp);
				}
				
				$administStatsMap.chart["main1"].set_chart8(tp);
				$administStatsMap.chart["main1"].set_chart9(tp);
				
			} else{
// 				$(".tab_01").hide()
// 				$(".tab_02").show()
				$("#administration__tab__con02").show();
				$("#administration__tab__con01").hide();
				$(".tab_02").hide();
				$("#main1-sub-tab02 li").removeClass("on");
				$("#main1-sub-tab02 li:first").addClass("on");
				var tab_02_on = $("#main1-sub-tab02").find("li.on");
				var tp = $(tab_02_on).attr("data-tp");

				var index = $("#main1-sub-tab02 li").index($(tab_02_on));
				index = index +1
				$(".tab_02_0"+index).show();
				
				if(typeof $administStatsMap.chart["main1"].set_chart2==="function"){
					$administStatsMap.chart["main1"].set_chart2();
				}
				if(typeof $administStatsMap.chart["main1"].set_chart8==="function"){
					$administStatsMap.chart["main1"].set_chart8(tp);
				}
				$administStatsMap.chart["main1"].set_chart9(tp);
				
			}				

		});
		
		//개인 기준 하위 탭 제어
		$("[data-type=tab] li").click(function(){
			$(this).parent().children("li").removeClass("on");
			var tp = $(this).attr("data-tp") || "";  
			$(this).addClass("on");
			
			$(".tab_02_01").show();
			$(".tab_02_02").hide();
			$(".tab_02_03").hide();
			$(".tab_02_04").hide();
			$(".tab_02_05").hide();
			
			if(typeof $administStatsMap.chart[$(this).parent().data("chart-function")].set_chart1==="function"){
				$administStatsMap.chart[$(this).parent().data("chart-function")].set_chart1(tp);
			}
			if(typeof $administStatsMap.chart[$(this).parent().data("chart-function")].set_chart8==="function"){
				$("#chart8").parent().attr('style','height:300px;overflow:auto');
				$administStatsMap.chart[$(this).parent().data("chart-function")].set_chart8(tp);
			}
			$administStatsMap.chart["main1"].set_chart9(tp);
		})
		
		//가구 기준 하위 탭 제어
		$("#main1-sub-tab02 li").click(function(){
			$(this).parent().children("li").removeClass("on");
			var tp = $(this).attr("data-tp") || ""; 
			$(this).addClass("on");
			var index = $("#main1-sub-tab02 li").index($(this));

			$(".tab_02").hide();
			$(".tab_02_01").hide();
			$(".tab_02_02").hide();
			$(".tab_02_03").hide();
			$(".tab_02_04").hide();
			$(".tab_02_05").hide();
			if(index == 0){
				$(".tab_02_01").show();
				//주택을 소유한 가구 수 
				$administStatsMap.chart["main1"].set_chart2();
				$administStatsMap.chart["main1"].set_chart8("03");
				$administStatsMap.chart["main1"].set_chart9("03");
			}else if(index == 1){
				$(".tab_02_02").show();
				//거주지역별 주택 소유율
				$administStatsMap.chart["main1"].set_chart3();
				$administStatsMap.chart["main1"].set_chart8("04");
				$administStatsMap.chart["main1"].set_chart9("04");
			}else if(index == 2){
				$(".tab_02_03").show();
				$administStatsMap.chart["main1"].set_chart4();
 				$administStatsMap.chart["main1"].set_chart8("05");
 				$administStatsMap.chart["main1"].set_chart9("05");
			} else if(index == 3){
				$(".tab_02_04").show();
				$administStatsMap.chart["main1"].set_chart5();
 				$administStatsMap.chart["main1"].set_chart8("06");
 				$administStatsMap.chart["main1"].set_chart9("06");
			}   else if(index == 4){
				$(".tab_02_05").show();
				$administStatsMap.chart["main1"].set_chart6();
 				$administStatsMap.chart["main1"].set_chart8("07");
 				$administStatsMap.chart["main1"].set_chart9("07");
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
			<li class="on" style="width:100%">
				<h4>개인소유 주택 수</h4>
				<p>
					<span data-id="DT_1OH0501-number" class="total-num"></span>호
				</p>
				<p>
					전년 대비<span data-id="DT_1OH0501-rt" class="state state-up"></span>
				</p>
			</li>
			<li>
				<h4>주택소유 개인 수</h4>
				<p>
					<span data-id="DT_1OH0504-number" class="total-num"></span>명
				</p>
				<p>
					전년 대비<span data-id="DT_1OH0504-rt" class="state state-up"></span>
				</p>
			</li>
			<li>
				<h4>주택소유 가구 수</h4>
				<p>
					<span data-id="DT_1OH0402-number"  class="total-num"></span>가구
				</p>
				<p>
					전년 대비<span data-id="DT_1OH0402-rt" class="state state-up"></span>
				</p>
			</li>
		</ul>
	</div>

	<!-- 하단 탭 시작
		main-tab-content
		main1-sub-tab
		 -->
	<div class="dashboard__box p0">
		<ul id="main-tab" class="administration__tab col-2">
			<li class="on">개인 기준</li>
			<li>가구 기준</li>
		</ul>
		<div data-id="main-tab-content" class="administration__tab__con" id="administration__tab__con01">
			<ul id="main1-sub-tab" data-type="tab" data-chart-function="main1" class="administration__sub-tab">
				<li class="on" data-tp="01">개인소유 주택</li>
				<li data-tp="02">주택소유 개인</li>
			</ul>
			<div class="administration__sub-tab__con px10">
				<div data-type="chart-container" class="tab_01 pb15 mb15 border-b-line" style="position: relative;">
					<h3 id="chart1-title" data-id="text-year" data-append-text="년 개인소유 주택 수" data-title-unit="(단위: 호)"></h3>
					<h4 id="chart1-title-unit" data-title-unit="(단위: 호)"></h4>
					<div class="dashboard__chart" id="chart1" style="height: 260px;"></div>
					<!--차트 설명 -->
					<div id="chart1-legend" class="legend-container"style="margin-bottom:30px;">
						<div class="legend-box" style="display: inline-block;">
 							<span class="legend-box" style="background-color: rgb(51, 51, 51);"></span>
 							<span class="legend-label">기타</span>
 						</div>
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color: #1b7ed5"></span>
							<span class="legend-label">개인소유주택</span>
						</div>
 						
					</div>
					<!--차트툴팁 -->
					<div data-type="tooltip" class="modal dashboard-layer"	style="display: none;"></div>

					<div class="dashboard__chart__con">
						<p>출처: 통계청,「주택소유통계」</p>
						<div class="cf">
							<a href="#n" data-kosis>통계표 보기</a>
							<div data-id="more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>주택 소유 개인 수</p>
									<p class="show-statistics" onclick="openKosis('DT_1OH0504')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>	
		
		<div class="administration__tab__con" id="administration__tab__con02" style="display:none">
			<ul id="main1-sub-tab02" class="administration__sub-tab">
				<li data-tp="03" class="on">주택소유</li>
				<li data-tp="04" >거주지역</li>
				<li data-tp="05" >가구주 연령</li>
				<li data-tp="06" >가구원수</li>   
				<li data-tp="07" >세대구성</li>
			</ul>
			<div class="administration__sub-tab__con px10">
				<div data-type="chart-container" class="tab_02 tab_02_01 pb15 mb15 border-b-line" style="position: relative;">
					<h3 id="chart2-title" data-id="text-year" data-append-text="년  주택을 소유한 가구 수" data-title-unit="(단위: 가구)"></h3>
					<h4 id="chart2-title-unit" data-title-unit="(단위: 가구)"></h4>
					<div class="dashboard__chart" id="chart2" style="height: 260px;"></div>
					<!--차트 설명 -->
					<div id="chart2-legend" class="legend-container" style="margin-bottom:30px;">
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color: #1b7ed5"></span>
							<span class="legend-label">주택소유가구</span>
						</div>
<!-- 						<div class="legend-box" style="display: inline-block;"> -->
<!-- 							<span class="legend-box" style="background-color: rgb(51, 51, 51);"></span> -->
<!-- 							<span class="legend-label">무주택가구</span> -->
<!-- 						</div> --> 
					</div>
					<!--차트툴팁 -->
					<div data-type="tooltip" class="modal dashboard-layer"
						style="display: none;"></div>

					<div class="dashboard__chart__con">
						<p>출처: 통계청,「주택소유통계」</p>
						<div class="cf">
							<a href="#n" data-kosis>통계표 보기</a>
						</div>
					</div>
				</div>
				
				<div data-type="chart-container" class="tab_02 tab_02_02 pb15 mb15 border-b-line" style="display:none;position:relative;">
					<!-- 차트헤더 -->
					<h3 id="chart3-title" data-id="text-year" data-append-text="년  거주지역별 주택소유율" data-title-unit="(단위: 가구)"></h3>
					<h4 id="chart3-title-unit" data-title-unit="(단위: 가구)"></h4>
					<!--차트실제 생성 -->
					<div style="height:300px;">
						<div class="dashboard__chart" style="height: 250px;" id="chart3"></div>
					</div>
					<!--차트 설명 -->
					<div id="chart3-legend" class="legend-container" style="position: absolute;top: 300px;width: 100%; left: 50%; transform: translate(-50%, -50%); display: none;">
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#e2658f"></span>
							<span class="legend-label">상위 3개 지역</span>
						</div>
						<div class="legend-box" style="display: inline-block;">							
							<span class="legend-label">   </span>
						</div>
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#35829e"></span>
							<span class="legend-label">하위 3개 지역</span>
						</div>
					</div>
					<!--차트툴팁 -->
					<div data-type="tooltip" class="modal dashboard-layer"
						style="display: none;"></div>

					<div class="dashboard__chart__con">
						<p>출처: 통계청,「주택소유통계」</p>
						<div class="cf">
							<a href="#n" data-kosis>통계표 보기</a>
						</div>
					</div>
				</div>
				
				<div data-type="chart-container" style="position: relative;" class="pb15 mb15 border-b-line tab_02 tab_02_03" >
					<!-- 차트헤더 -->
					<h3 id="chart4-title" data-id="text-year" data-append-text="년  가구주 연령대별 주택소유율" data-title-unit="(단위: 가구"></h3>
					<h4 id="chart4-title-unit" data-title-unit="(단위: 가구)"></h4>
<!-- 					<div id="chart4-avg-text" class="administration__average"></div> -->
					<!--차트실제 생성 -->
					<div style="overflow: auto; height: 260px;">
						<div class="dashboard__chart"  id="chart4" style="height: 250px;"></div>
					</div>
					<!--차트 설명 -->
					<div id="chart4-legend" class="legend-container" style="position: absolute; top: 330px; left: 50%; transform: translate(-50%, -50%); display: none;">
					</div>
					<!--차트툴팁 -->
					<div data-type="tooltip" class="modal dashboard-layer"
						style="display: none;"></div>
	
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「주택소유통계」</p>
						<div class="cf">
							<a href="#n" data-kosis>통계표 보기</a>
							<div data-id="more2" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>주택소유 가구수</p>
									<p class="show-statistics" onclick="openKosis('DT_1OH0403')">통계표 보기</p>
								</div>
								<div>
									<p>무주택 가구수</p>
									<p class="show-statistics" onclick="openKosis('DT_1OH0418')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div data-type="chart-container" style="position: relative;" class="pb15 mb15 border-b-line tab_02 tab_02_04" >
					<!-- 차트헤더 -->
					<h3 id="chart5-title" data-id="text-year" data-append-text="년  가구원수별 주택소유율" data-title-unit="(단위: 가구"></h3>
					<h4 id="chart5-title-unit" data-title-unit="(단위: 가구)"></h4>
<!-- 					<div id="chart5-avg-text" class="administration__average"></div> -->
					<!--차트실제 생성 -->
					<div style="overflow: auto; height: 260px;">
						<div class="dashboard__chart" id="chart5"></div>
					</div>
					<!--차트 설명 -->
					<div id="chart5-legend" class="legend-container" style="position: absolute; top: 330px; left: 50%; transform: translate(-50%, -50%); display: none;">
					</div>
					<!--차트툴팁 -->
					<div data-type="tooltip" class="modal dashboard-layer"
						style="display: none;"></div>
	
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「주택소유통계」</p>
						<div class="cf">
							<a href="#n" data-kosis>통계표 보기</a>
							<div data-id="more3" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>주택소유 가구수</p>
									<p class="show-statistics" onclick="openKosis('DT_1OH0404')">통계표 보기</p>
								</div>
								<div>
									<p>무주택 가구수</p>
									<p class="show-statistics" onclick="openKosis('DT_1OH0419')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div data-type="chart-container" style="position: relative;" class="pb15 mb15 border-b-line tab_02 tab_02_05" >
					<!-- 차트헤더 -->
					<h3 id="chart6-title" data-id="text-year" data-append-text="년  세대구성별 주택소유율" data-title-unit="(단위: 가구"></h3>
					<h4 id="chart6-title-unit" data-title-unit="(단위: 가구)"></h4>
<!-- 					<div id="chart6-avg-text" class="administration__average"></div> -->
					<!--차트실제 생성 -->
					<div style="overflow: auto; height: 260px; width:362px">
						<div class="dashboard__chart" id="chart6"></div>
					</div>
					<!--차트 설명 -->
					
					<!--차트툴팁 -->
					<div data-type="tooltip" class="modal dashboard-layer"
						style="display: none;"></div>
	
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「주택소유통계」</p>
						<div class="cf">
							<a href="#n" data-kosis>통계표 보기</a>
							<div data-id="more4" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>주택소유 가구수</p>
									<p class="show-statistics" onclick="openKosis('DT_1OH0405')">통계표 보기</p>
								</div>
								<div>
									<p>무주택 가구수</p>
									<p class="show-statistics" onclick="openKosis('DT_1OH0420')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
			
		<!--              	char-8 -->
		<!--              	지역별 개인이 소유한 주택 수  -->
		<div class="administration__sub-tab__con px10">
			<div data-type="chart-container" style="position: relative;" class="pb15 mb15 border-b-line" >
				<!-- 차트헤더 -->
				<h3 id="chart8-title" data-id="text-year"data-append-text="년  지역별 개인이 소유한 주택 수" data-title-unit="(단위: 호"></h3>
				<h4 id="chart8-title-unit" data-title-unit="(단위: 호)"></h4>
<!-- 				<div id="chart8-avg-text" class="administration__average"></div> -->
				<!--차트실제 생성 -->
				<div id="chartHeight" style="height: 280px;overflow: auto;">
					<div class="dashboard__chart" style="height: 270px;width:1000px;" id="chart8"></div>
					<div id="chart8-05-legend" class="legend-container" style="text-align: left;width: 300px;margin: 0px auto 30px; display: none;">
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:rgb(124, 182, 236)"></span>
							<span class="legend-label" style="margin-right:10px">30세미만</span>
							<span class="legend-box" style="background-color:rgb(67, 67, 72);"></span>
							<span class="legend-label" style="margin-right:10px">30~39세</span>
							<span class="legend-box" style="background-color:rgb(144, 237, 125);"></span>
							<span class="legend-label" style="margin-right:10px">40~49세</span>
						</div>
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:rgb(247, 162, 92);"></span>
							<span class="legend-label" style="margin-right:23px">50~59세</span>
							<span class="legend-box" style="background-color:rgb(128, 133, 233);"></span>
							<span class="legend-label" style="margin-right:10px">60세이상</span>
						</div>
					</div>
					<div id="chart8-06-legend" class="legend-container" style="text-align: left;width: 300px;margin: 0px auto 30px; display: none;">
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:rgb(124, 182, 236)"></span>
							<span class="legend-label" style="margin-right:10px">1인가구</span>
							<span class="legend-box" style="background-color:rgb(67, 67, 72);"></span>
							<span class="legend-label" style="margin-right:10px">2인가구</span>
							<span class="legend-box" style="background-color:rgb(144, 237, 125);"></span>
							<span class="legend-label" style="margin-right:10px">3인가구</span>
						</div>
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:rgb(247, 162, 92);"></span>
							<span class="legend-label" style="margin-right:10px">4인가구</span>
							<span class="legend-box" style="background-color:rgb(128, 133, 233);"></span>
							<span class="legend-label" style="margin-right:10px">5인가구</span>
						</div>
					</div>
					<div id="chart8-07-legend" class="legend-container" style="text-align: left;width: 300px;margin: 0px auto 30px; display: none;">
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:rgb(124, 182, 236)"></span>
							<span class="legend-label" style="margin-right:77px">부부</span>
							<span class="legend-box" style="background-color:rgb(67, 67, 72);"></span>
							<span class="legend-label" style="margin-right:10px">부부&미혼녀</span>
						</div>
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:rgb(144, 237, 125);"></span>
							<span class="legend-label" style="margin-right:10px">한부모&미혼자녀</span>
							<span class="legend-box" style="background-color:rgb(247, 162, 92);"></span>
							<span class="legend-label" style="margin-right:10px">3세대이상</span>
						</div>
					</div>
				</div>
				<!--차트 설명 -->
				
				<!--차트툴팁 -->
				<div data-type="tooltip" class="modal dashboard-layer" style="display: none;"></div>

				<div class="dashboard__chart__con">
					<p>출처: 통계청,「주택소유통계」</p>
					<div class="cf">
<!-- 						<a href="#n" id="chart8-openKosis" data-kosis>통계표 보기</a> -->
						<a href="#n" data-kosis>통계표 보기</a>
						<div data-id="more2" class="dashboard__tooltip administration__statistics" style="display: none;">
							<div>
								<p>주택소유 가구수</p>
								<p class="show-statistics" onclick="openKosis('DT_1OH0403')">통계표 보기</p>
							</div>
							<div>
								<p>무주택 가구수</p>
								<p class="show-statistics" onclick="openKosis('DT_1OH0418')">통계표 보기</p>
							</div>
						</div>
						<div data-id="more3" class="dashboard__tooltip administration__statistics" style="display: none;">
							<div>
								<p>주택소유 가구수</p>
								<p class="show-statistics" onclick="openKosis('DT_1OH0404')">통계표 보기</p>
							</div>
							<div>
								<p>무주택 가구수</p>
								<p class="show-statistics" onclick="openKosis('DT_1OH0419')">통계표 보기</p>
							</div>
						</div>
						<div data-id="more4" class="dashboard__tooltip administration__statistics" style="display: none;">
							<div>
								<p>주택소유 가구수</p>
								<p class="show-statistics" onclick="openKosis('DT_1OH0405')">통계표 보기</p>
							</div>
							<div>
								<p>무주택 가구수</p>
								<p class="show-statistics" onclick="openKosis('DT_1OH0420')">통계표 보기</p>
							</div>
						</div>
					</div>
				</div>
			</div>
				
			<!--              	char9 -->
			<!--              	연도별 차트  -->
			<div id="chart9-container" data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
				<!-- 차트헤더 -->
				<h3 id="chart9-title" data-id="text-year" data-append-text="년  지역별 개인이 소유한 주택 수" data-title-unit="(단위: 호"></h3>
				<h4 id="chart9-title-unit" data-title-unit="(단위: 호)"></h4>
				<!--차트실제 생성 -->
				<div style="overflow: auto; height: ;">
					<div class="dashboard__chart" style="width:350px" id="chart9"></div>
				</div>
				<!--차트툴팁 -->
				<div data-type="tooltip" class="modal dashboard-layer" style="display: none;"></div>
				<div class="dashboard__chart__con">
					<p>출처: 통계청,「주택소유통계」</p>
					<div class="cf">
						<a href="#n" data-kosis>통계표 보기</a>
						<div data-id="more2" class="dashboard__tooltip administration__statistics" style="display: none;">
							<div>
								<p>주택소유 가구수</p>
								<p class="show-statistics" onclick="openKosis('DT_1OH0403')">통계표 보기</p>
							</div>
							<div>
								<p>무주택 가구수</p>
								<p class="show-statistics" onclick="openKosis('DT_1OH0418')">통계표 보기</p>
							</div>
						</div>
						<div data-id="more3" class="dashboard__tooltip administration__statistics" style="display: none;">
							<div>
								<p>주택소유 가구수</p>
								<p class="show-statistics" onclick="openKosis('DT_1OH0404')">통계표 보기</p>
							</div>
							<div>
								<p>무주택 가구수</p>
								<p class="show-statistics" onclick="openKosis('DT_1OH0419')">통계표 보기</p>
							</div>
						</div>
						<div data-id="more4" class="dashboard__tooltip administration__statistics" style="display: none;">
							<div>
								<p>주택소유 가구수</p>
								<p class="show-statistics" onclick="openKosis('DT_1OH0405')">통계표 보기</p>
							</div>
							<div>
								<p>무주택 가구수</p>
								<p class="show-statistics" onclick="openKosis('DT_1OH0420')">통계표 보기</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</body>
</html>
