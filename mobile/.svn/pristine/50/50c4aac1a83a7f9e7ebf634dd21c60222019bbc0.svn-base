<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta name="title" content="행정통계 시각화 지도">
	<meta name="sub-title" content="중·장년층행정통계">
	<script src="https://d3js.org/colorbrewer.v1.min.js"></script>
	<script>
	$(document).ready(function() {
		srvLogWrite('O0', '14', '02', '01', '중·장년층행정통계', '');
	});
		$(()=>{
			$("#main-tab li").click(function(){
				$("#main-tab li").removeClass("on");
				$(this).addClass("on");
				$("[data-id=main-tab-content]").hide();
				$("[data-id=main-tab-content]:eq("+$("#main-tab li").index($(this))+")").show();
				if(typeof $administStatsMap.chart[$(this).data("chart-function")].common==="function"){
					$administStatsMap.chart[$(this).data("chart-function")].common();					
				}
							
			});
			$("[data-type=tab] li").click(function(){
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
		<!-- <h3 class="dashboard__statistics__title">중·장년층행정통계 총괄</h3> -->
		<ul>
			<li>
				<h4>중·장년층 인구 수</h4>
				<p><span data-id="DT_1MA0001-number" class="total-num">-</span>명</p>
				<p>전년 대비<span data-id="DT_1MA0001-rt" class="state state-up">-%</span></p>
				<p><span data-id="total-number-data"></span></p>
			</li>
			<li>
				<h4>등록취업 비중<a href="#n" class="notice notice--gray"></a></h4>
				<p><span data-id="DT_1MA0002-number" class="total-num">-</span>%</p>
				<p>전년 대비<span data-id="DT_1MA0002-rt" class="state state-up">-%</span></p>
				<div class="dashboard__info">
                    <div>
                         <p>등록취업자</p>
                         <a href="#n" class="btn__cancel"><span class="btn-close btn-close--black"></span></a>
                    </div>
                     <div>
                        	기준년도 10월 중 4대 보험 등 공공기관에 신고(가입)된 행정자료를 활용하여 파악된 임금근로자 또는 비임금근로자를 뜻함, 
                        	매월 공표되는 고용동향(경제활동인구조사)의 취업자와는 기준이 다름에 유의<br>
                        	*수입을 목적으로 일을 했더라도 4대 사회보험에 미가입한 임금근로자, 무급가족종사자, 농림수산물 생산활동경영자, 자영업 미등록자 등 행정자료로 파악이 되지 않은 자는 미포함
                     </div>
                 </div>
			</li>
			<li>
				<h4>소득 보유 비중</h4>
				<p><span data-id="DT_1MA0026-number" class="total-num">-</span>%</p>
				<p>전년 대비<span data-id="DT_1MA0026-rt" class="state state-up">-%</span></p>
			</li>
			<li>
				<h4>대출 보유 비중</h4>
				<p><span data-id="DT_1MA0028-number" class="total-num">-</span>%</p>
				<p>전년 대비<span data-id="DT_1MA0028-rt" class="state state-up">-%</span></p>
			</li>
			<li>
				<h4>주택 소유 가구 비중</h4>
				<p><span data-id="DT_1MA0037-number" class="total-num">-</span>%</p>
				<p>전년 대비<span data-id="DT_1MA0037-rt" class="state state-up">-%</span></p>
			</li>
			<li>
				<h4>연금가입 비중</h4>
				<p><span data-id="DT_1MA0024-number" class="total-num">-</span>%</p>
				<p>전년 대비<span data-id="DT_1MA0024-rt" class="state state-up">-%</span></p>
			</li>			
		</ul>
	</div>
	<div class="dashboard__box p0">
		<ul id="main-tab" class="administration__tab col-3">
			<li class="on" data-chart-function="main1">인구</li>
			<li data-chart-function="main2">취업</li>
			<li data-chart-function="main3">소득</li>
			<li data-chart-function="main4">대출</li>
			<li data-chart-function="main5">주택</li>
			<li data-chart-function="main6">연금</li>
		</ul>		
		<div data-id="main-tab-content" class="administration__tab__con">
			<ul id="main1-sub-tab" data-type="tab" data-chart-function="main1" class="administration__sub-tab">
				<li class="on">인구</li>
				<li>연령구간별 비중</li>				
			</ul>
			<div class="administration__sub-tab__con px10">
				<div data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart1-1-title" data-id="text-year" data-append-text="년 중·장년층 인구 수"></h3>
					<div class="dashboard__chart" style="height: 350px;" id="chart1-1"></div>
					<div id="chart1-1-legend" class="legend-container" style="position: absolute;top:330px;left: 50%; transform: translate(-50%, -50%);display: none;">
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#e2658f"></span>
							<span class="legend-label">상위 3개 지역</span>
						</div>
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#35829e"></span>
							<span class="legend-label">하위 3개 지역</span>
						</div>
					</div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「중·장년층행정통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main1">통계표 보기</a>
							<div data-id="main1-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>중장년층 인구</p>
									<p class="show-statistics" onclick="openKosis('DT_1MA0001')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
			<div class="administration__sub-tab__con px10">
				<div data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart1-2-title" data-id="text-year" data-append-text="년 중·장년층 인구 수" data-title-unit="(단위: %, 명)"></h3>					
<!-- 					<div id="chart1-2-avg-text" class="administration__average"></div> -->
					<div style="overflow:auto;height: 350px;">
						<div class="dashboard__chart" id="chart1-2" style="width:1400px; height:100px;"></div>
						<div id="chart1-2-legend" class="legend-container" style="position: absolute;top:320px;left: 50%; transform: translate(-50%, -50%);">
							<div class="legend-box" style="display: inline-block;">
								<span class="legend-box" style="background-color:rgb(255, 82, 83)"></span>
								<span class="legend-label">여자</span>
							</div>
							<div class="legend-box" style="display: inline-block;">
								<span class="legend-box" style="background-color:rgb(35, 183, 209);"></span>
								<span class="legend-label">남자</span>
							</div>
						</div>					
					</div>
					<div id="chart1-2-1-legend" class="legend-container" style="text-align: left;width:220px;margin:0 auto 30px">
						<div class="legend-box">
							<span class="legend-box" style="background-color:#225B82;"></span>
							<span class="legend-label" style="margin-right:10px">60-64세</span>
							<span class="legend-box" style="background-color:#447291;"></span>
							<span class="legend-label" style="margin-right:10px">55-59세</span>
							<span class="legend-box" style="background-color:#6688A0;"></span>
							<span class="legend-label" style="margin-right:10px">50-54세</span>
						</div>
						<div class="legend-box">
							<span class="legend-box" style="background-color:#A9B4BC;"></span>
							<span class="legend-label" style="margin-right:10px">45-49세</span>
							<span class="legend-box" style="background-color:#7F7F7F;"></span>
							<span class="legend-label" style="margin-right:10px">40-44세</span>
						</div>
					</div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「중·장년층행정통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main1">통계표 보기</a>
							<div data-id="main1-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>중장년층 인구</p>
									<p class="show-statistics" onclick="openKosis('DT_1MA0001')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
			<div class="administration__sub-tab__con px10">
				<div id="chart1-3-container" data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">					
					<h3 id="chart1-3-title">연도별 중·장년층 인구 수</h3>
					<div class="dashboard__chart" id="chart1-3" style="height:300px;"></div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「중·장년층행정통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main1">통계표 보기</a>
							<div data-id="main1-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>중장년층 인구</p>
									<p class="show-statistics" onclick="openKosis('DT_1MA0001')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
		</div>
		<div data-id="main-tab-content" class="administration__tab__con" style="display:none;">
			<ul id="main2-sub-tab" data-type="tab" data-chart-function="main2" class="administration__sub-tab">
				<li class="on">등록취업 비중</li>
				<li>종사상지위별 비중</li>				
			</ul>
			<div class="administration__sub-tab__con px10">
				<div data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart2-1-title" data-id="text-year" data-append-text="년 중·장년층 등록취업 비중" data-title-unit="(단위: %, 명)"></h3>
					<div style="overflow:auto;height: 350px;">
						<div class="dashboard__chart" style="height: 350px;" id="chart2-1"></div>
					</div>
					<div id="chart2-1-legend" class="legend-container" style="text-align: center;width:220px;margin:0 auto 30px">
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#7CB5EC"></span>
							<span class="legend-label">등록취업자</span>
						</div>
					</div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「중·장년층행정통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main2">통계표 보기</a>
							<div data-id="main2-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>중장년층 취업</p>
									<p class="show-statistics" onclick="openKosis('DT_1MA0002')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
			<div class="administration__sub-tab__con px10">
				<div data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart2-2-title" data-id="text-year" data-append-text="년 지역별 중·장년층 등록취업 비중" data-title-unit="(단위: %, 명)"></h3>
<!-- 					<div id="chart2-2-avg-text" class="administration__average"></div> -->
					<div style="overflow:auto;height: 350px;">
						<div class="dashboard__chart" id="chart2-2" style="width:1200px;"></div>
					</div>
					<div id="chart2-2-legend" class="legend-container" style="text-align: left;width:320px;margin:0 auto 30px">
						<div class="legend-box">
							<span class="legend-box" style="background-color:#255363;"></span>
							<span class="legend-label" style="margin-right:10px">임금근로</span>
							<span class="legend-box" style="background-color:#8DB4C1;"></span>
							<span class="legend-label" style="margin-right:10px">비임금근로</span>
							<span class="legend-box" style="background-color:#1287A9;"></span>
							<span class="legend-label">임금+비임금근로</span>
						</div>
					</div>					
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「중·장년층행정통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main2">통계표 보기</a>
							<div data-id="main2-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>중장년층 취업</p>
									<p class="show-statistics" onclick="openKosis('DT_1MA0002')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
			<div class="administration__sub-tab__con px10">
				<div id="chart2-3-container" data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">					
					<h3 id="chart2-3-title" data-id="text-year" data-append-text="연도별 중·장년층 등록취업 비중 " data-title-unit="(단위: 명)"></h3>
					<div class="dashboard__chart" id="chart2-3" style="height:300px;"></div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「중·장년층행정통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main2">통계표 보기</a>
							<div data-id="main2-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>중장년층 취업</p>
									<p class="show-statistics" onclick="openKosis('DT_1MA0002')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
		</div>
		<div data-id="main-tab-content" class="administration__tab__con" style="display:none;">
			<ul id="main3-sub-tab" data-type="tab" data-chart-function="main3" class="administration__sub-tab">
				<li class="on">소득 보유 비중</li>
				<li>소득구간별 비중</li>				
			</ul>
			<div class="administration__sub-tab__con px10">
				<div data-type="chart3-1-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart3-1-title" data-id="text-year" data-append-text="년 중·장년층 소득 보유 비중" data-title-unit="(단위: %, 천명)"></h3>
					<div class="dashboard__chart" style="height: 320px;" id="chart3-1"></div>
					<div id="chart3-1-legend" class="legend-container" style="text-align: center;width:220px;margin:0 auto 30px">
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#7CB5EC"></span>
							<span class="legend-label">소득있음</span>
						</div>
					</div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「중·장년층행정통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main3">통계표 보기</a>
							<div data-id="main3-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>중장년층 소득</p>
									<p class="show-statistics" onclick="openKosis('DT_1MA0002')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
			<div class="administration__sub-tab__con px10">
				<div data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart3-2-title" data-id="text-year" data-append-text="년 지역별 중·장년층 소득 보유 비중" data-title-unit="(단위: %, 만원)"></h3>
<!-- 					<div id="chart3-2-avg-text" class="administration__average"></div> -->
					<div style="overflow:auto;height: 350px;">
						<div class="dashboard__chart" id="chart3-2" style="width:1200px;"></div>						
					</div>					
					<div id="chart3-2-legend" class="legend-container" style="text-align: left;width:300px;margin:0 auto 30px">
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#255363;"></span>
							<span class="legend-label" style="margin-right:39px">1억원이상</span>
							<span class="legend-box" style="background-color:#225B82;"></span>
							<span class="legend-label" style="margin-right:10px">7천만원~1억원 미만</span>
						</div>
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#447291;"></span>
							<span class="legend-label" style="margin-right:10px">5~7천만원 미만</span>
							<span class="legend-box" style="background-color:#6688A0;"></span>
							<span class="legend-label" style="margin-right:10px">3~5천만원 미만</span>
						</div>
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#A9B4BC;"></span>
							<span class="legend-label" style="margin-right:10px">1~3천만원 미만</span>
							<span class="legend-box" style="background-color:#7F7F7F;"></span>
							<span class="legend-label" style="margin-right:10px">1천만원 미만</span>
						</div>
					</div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「중·장년층행정통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main3">통계표 보기</a>
							<div data-id="main3-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>중장년층 소득</p>
									<p class="show-statistics" onclick="openKosis('DT_1MA0002')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
			<div class="administration__sub-tab__con px10">
				<div id="chart3-3-container" data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">					
					<h3 id="chart3-3-title" data-id="text-year" data-append-text="연도별 중·장년층 소득보유 비중 " data-title-unit="(단위: %, 만원)"></h3>
					<div class="dashboard__chart" id="chart3-3" style="height:300px;"></div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「중·장년층행정통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main3">통계표 보기</a>
							<div data-id="main3-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>중장년층 소득</p>
									<p class="show-statistics" onclick="openKosis('DT_1MA0002')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
		</div>
		<div data-id="main-tab-content" class="administration__tab__con" style="display:none;">
			<ul id="main4-sub-tab" data-type="tab" data-chart-function="main4" class="administration__sub-tab">
				<li class="on">대출 보유 비중</li>
				<li>대출잔액구간별 비중</li>				
			</ul>
			<div class="administration__sub-tab__con px10">
				<div data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart4-1-title" data-id="text-year" data-append-text="년 중·장년층 대출보유 비중" data-title-unit="(단위: %, 천명)"></h3>
					<div>
						<div class="dashboard__chart" style="height: 320px;" id="chart4-1"></div>
					</div>
					<div id="chart4-1-legend" class="legend-container" style="text-align: center;width:220px;margin:0 auto 30px">
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#7CB5EC"></span>
							<span class="legend-label">부채있음</span>
						</div>
					</div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「중·장년층행정통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main4">통계표 보기</a>
							<div data-id="main4-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>중장년층 대출</p>
									<p class="show-statistics" onclick="openKosis('DT_1MA0002')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
			<div class="administration__sub-tab__con px10">
				<div data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart4-2-title" data-id="text-year" data-append-text="년 지역별 중·장년층 대출보유 비중" data-title-unit="(단위: %, 천명)"></h3>
<!-- 					<div id="chart4-2-avg-text" class="administration__average"></div> -->
					<div style="overflow:auto;height: 350px;">
						<div class="dashboard__chart" id="chart4-2" style="width:1200px;"></div>
					</div>					
					<div id="chart4-2-legend" class="legend-container" style="text-align: left;width:300px;margin:0 auto 30px">
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#5B9BD5;"></span>
							<span class="legend-label" style="margin-right:47px">1천만원 미만</span>
							<span class="legend-box" style="background-color:#C0504D;"></span>
							<span class="legend-label" style="margin-right:10px">1~3천만원 미만</span>
						</div>
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#7F7F7F;"></span>
							<span class="legend-label" style="margin-right:32px">3~5천만원 미만</span>
							<span class="legend-box" style="background-color:#FFC000;"></span>
							<span class="legend-label" style="margin-right:10px">5~7천만원 미만</span>
						</div>
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#B2C1DB;"></span>
							<span class="legend-label" style="margin-right:10px">7천만원~1억원 미만</span>
							<span class="legend-box" style="background-color:#70AD47;"></span>
							<span class="legend-label" style="margin-right:10px">1~2억원 미만</span>
						</div>
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#2C4D75;"></span>
							<span class="legend-label" style="margin-right:45px">2~3억원 미만</span>
							<span class="legend-box" style="background-color:#772C2A;"></span>
							<span class="legend-label" style="margin-right:10px">3억원 이상</span>
						</div>
					</div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「중·장년층행정통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main4">통계표 보기</a>
							<div data-id="main4-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>중장년층 대출</p>
									<p class="show-statistics" onclick="openKosis('DT_1MA0002')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
			<div class="administration__sub-tab__con px10">
				<div id="chart4-3-container" data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">					
					<h3 id="chart4-3-title" data-id="text-year" data-append-text="연도별 중·장년층 대출보유 비중 " data-title-unit="(단위: %, 천명)"></h3>
					<div class="dashboard__chart" id="chart4-3" style="height:300px;"></div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「중·장년층행정통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main4">통계표 보기</a>
							<div data-id="main4-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>중장년층 대출</p>
									<p class="show-statistics" onclick="openKosis('DT_1MA0002')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
		</div>
		<div data-id="main-tab-content" class="administration__tab__con" style="display:none;">
			<ul id="main5-sub-tab" data-type="tab" data-chart-function="main5" class="administration__sub-tab">
				<li class="on">주택소유 비중</li>
				<li>주택자산가액별 비중</li>				
			</ul>
			<div class="administration__sub-tab__con px10">
				<div data-type="chart5-1-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart5-1-title" data-id="text-year" data-append-text="년 중·장년층 주택소유 비중" data-title-unit="(단위: %, 명)"></h3>
					<div>
						<div class="dashboard__chart" style="height: 320px;" id="chart5-1"></div>
					</div>
					<div id="chart5-1-legend" class="legend-container" style="text-align: center;width:220px;margin:0 auto 30px">
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#7CB5EC"></span>
							<span class="legend-label">주택소유</span>
						</div>
					</div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「중·장년층행정통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main5">통계표 보기</a>
							<div data-id="main5-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>중장년층 주택</p>
									<p class="show-statistics" onclick="openKosis('DT_1MA0002')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
			<div class="administration__sub-tab__con px10">
				<div data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart5-2-title" data-id="text-year" data-append-text="년 지역별 중·장년층 주택소유 비중" data-title-unit="(단위: 명)"></h3>
<!-- 					<div id="chart5-2-avg-text" class="administration__average"></div> -->
					<div style="overflow:auto;height: 350px;">
						<div class="dashboard__chart" id="chart5-2" style="width:1200px;"></div>
					</div>					
					<div id="chart5-2-legend" class="legend-container" style="text-align: left;width:200px;margin:0 auto 30px">
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#B2C1DB;"></span>
							<span class="legend-label">6억원 초과</span>
						</div>
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#FFC000;"></span>
							<span class="legend-label">3억원 초과~6억원 이하</span>
						</div>
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#7F7F7F;"></span>
							<span class="legend-label">1억 5천만원 초과~3억원 이하</span>
						</div>
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#C0504D;"></span>
							<span class="legend-label">6천만원 초과 ~ 1억 5천만원 이하</span>
						</div>
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#5B9BD5;"></span>
							<span class="legend-label">6천만원 이하</span>
						</div>
					</div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「중·장년층행정통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main5">통계표 보기</a>
							<div data-id="main5-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>중장년층 주책</p>
									<p class="show-statistics" onclick="openKosis('DT_1MA0002')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
			<div class="administration__sub-tab__con px10">
				<div id="chart5-3-container" data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">					
					<h3 id="chart5-3-title" data-id="text-year" data-append-text="연도별 중·장년층 주택소유 비중 " data-title-unit="(단위: 명)"></h3>
					<div class="dashboard__chart" id="chart5-3" style="height:350px;"></div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「중·장년층행정통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main5">통계표 보기</a>
							<div data-id="main5-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>중장년층 주택</p>
									<p class="show-statistics" onclick="openKosis('DT_1MA0002')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
		</div>
		<div data-id="main-tab-content" class="administration__tab__con" style="display:none;">
			<ul id="main6-sub-tab" data-type="tab" data-chart-function="main6" class="administration__sub-tab">
				<li class="on">연금가입 비중</li>
				<li>연령별 가입 비중</li>				
			</ul>
			<div class="administration__sub-tab__con px10">
				<div data-type="chart6-1-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart6-1-title" data-id="text-year" data-append-text="년 중·장년층 연금가입 비중" data-title-unit="(단위: %, 명)"></h3>
					<div class="dashboard__chart" style="height: 300px;" id="chart6-1"></div>
					<div id="chart6-1-legend" class="legend-container" style="text-align: center;width:220px;margin:0 auto 30px">
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#7CB5EC"></span>
							<span class="legend-label">연금가입</span>
						</div>
					</div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「중·장년층행정통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main6">통계표 보기</a>
							<div data-id="main6-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>중장년층 연금</p>
									<p class="show-statistics" onclick="openKosis('DT_1MA0002')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
			<div class="administration__sub-tab__con px10">
				<div data-type="chart6-2-container" class="pb15 mb15 border-b-line" style="position:relative;">
					<h3 id="chart6-2-title" data-id="text-year" data-append-text="년 지역별 중·장년층 연금가입 비중" data-title-unit="(단위: 명)"></h3>
<!-- 					<div id="chart6-2-avg-text" class="administration__average"></div> -->
					<div style="overflow:auto;height: 350px;">
						<div class="dashboard__chart" id="chart6-2" style="width:1200px;"></div>
					</div>					
					<div id="chart6-2-legend" class="legend-container" style="text-align: left;width:210px;margin:0 auto 30px">
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#225B82;"></span>
							<span class="legend-label" style="margin-right:10px">60-64세</span>
							<span class="legend-box" style="background-color:#447291;"></span>
							<span class="legend-label style="margin-right:10px"">55-59세</span>
							<span class="legend-box" style="background-color:#6688A0;"></span>
							<span class="legend-label" style="margin-right:10px">50-54세</span>
						</div>
						<div class="legend-box" style="display: inline-block;">
							<span class="legend-box" style="background-color:#A9B4BC;"></span>
							<span class="legend-label" style="margin-right:10px">45-49세</span>
							<span class="legend-box" style="background-color:#7F7F7F;"></span>
							<span class="legend-label" style="margin-right:10px">40-44세</span>
						</div>
					</div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「중·장년층행정통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main6">통계표 보기</a>
							<div data-id="main6-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>중장년층 연금</p>
									<p class="show-statistics" onclick="openKosis('DT_1MA0002')">통계표 보기</p>
								</div>
							</div>
						</div>
					</div> 
				</div>
			</div>
			<div class="administration__sub-tab__con px10">
				<div id="chart6-3-container" data-type="chart-container" class="pb15 mb15 border-b-line" style="position:relative;">					
					<h3 id="chart6-3-title" data-id="text-year" data-append-text="연도별 중·장년층 연금가입 비중 " data-title-unit="(단위: 명)"></h3>
					<div class="dashboard__chart" id="chart6-3" style="height:300px;"></div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
					<div class="dashboard__chart__con">
						<p>출처: 통계청,「중·장년층행정통계」</p>
						<div class="cf">
							<a href="#n" data-kosis="main6">통계표 보기</a>
							<div data-id="main6-more" class="dashboard__tooltip administration__statistics" style="display: none;">
								<div>
									<p>중장년층 연금</p>
									<p class="show-statistics" onclick="openKosis('DT_1MA0002')">통계표 보기</p>
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