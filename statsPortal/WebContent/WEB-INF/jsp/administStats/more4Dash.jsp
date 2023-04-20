
<%
	/**************************************************************************************************************************
	* Program Name	: 행정통계시각화 > 통계더보기 > 강지은 테스트페이지
	* File Name		: more4Dash.jsp
	* Comment		:
	* History		:
	**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<link rel="stylesheet" href="/css/administStats/renew/more4Dash.css">
<div id="wrapper22">
	<div class="container">
		

		<div class="contentbox-typeB">
			<div class="section1">
				<div class="left-col">
					<div class="top_wrapper">
						<div class="title">2020년 일자리 총 2,472.5만개</div>
						<div class="subtitle">전년대비 70.5만개 증가</div>
						<div class="selectBox_wrapper">
							<select name="selectBox" class="selectBox">
								<option disabled selected class="option_txt" style="font-size:17px; font-weight:600; color:#010103;">일자리총계</option>
							</select>
							<span class="icon_arrow"><img src="/images/administStats/more1/arrow_down.png" alt=""></span>
						</div>							
						<div class="chart1_st">
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart1_01" style="width:420px; height:250px"></div>
									<style>
									#chart1_01 .highcharts-background { fill:#1F60DE;}
									#chart1_01 .highcharts-point-hover { fill:#FEF527 !important;}
									</style>
								</figure>
							</div>
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart1_02" style="width:420px; height:250px"></div>
									<style>
									#chart1_02 .highcharts-background { fill:#1F60DE;}
									#chart1_02 .highcharts-point-hover { fill:#FEF527 !important;}
									</style>
								</figure>
							</div>
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart1_03" style="width:420px; height:270px"></div>
									<style>
									#chart1_03 .highcharts-background { fill:#1F60DE;}
									#chart1_03 .highcharts-point-hover { fill:#FEF527 !important;}
									</style>
								</figure>
							</div>
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart1_04" style="width:420px; height:270px"></div>
									<style>
									#chart1_04 .highcharts-background { fill:#1F60DE;}
									#chart1_04 .highcharts-point-hover { fill:#FEF527 !important;}
									</style>
								</figure>
							</div>
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart1_05" style="width:420px; height:285px"></div>
									<style>
									#chart1_05 .highcharts-background { fill:#1F60DE;}
									#chart1_05 .highcharts-point-hover { fill:#FEF527 !important;}
									</style>
								</figure>
							</div>
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart1_06" style="width:420px; height:285px"></div>
									<style>
									#chart1_06 .highcharts-background { fill:#1F60DE;}
									#chart1_06 .highcharts-point-hover { fill:#FEF527 !important;}
									</style>
								</figure>
							</div>
						</div>
					</div>
					<div class=bottom_wrapper>
						<img src="/images/administStats/more1/people_back.png" alt="" class="bg_img">
						<div class="chart2_st">
							<div class="rcon_tit">
								<strong>일자리 증감</strong>
							</div>
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart2" style="width:250px; height:170px; margin:0 auto; "></div>
								</figure> 
							</div>
						</div>
					</div>
				</div>
				
				<div class="right-col">
					<div class="rTopCon flex-height-280">
						<div class="rcon_item flex-width-390 flex-mgR-10">
							<div class="rcon_tit">
								<strong>종사상지위별</strong> 일자리규모 및 증감
							</div>
							<div class="btn_area">
								<div class="btn_right">
									<button class="btn_down"><img src="/images/administStats/more1/btncon_down.png" alt=""></button>
									<button class="btn_table">통계표보기</button>
									<button class="btn_question"><img src="/images/administStats/more1/btncon_question.png" alt=""></button>
								</div>
							</div>
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart3" style="width:350px; height:175px; margin:0 auto; "></div>
								</figure> 
							</div> 
							<div class="division">
								<span class="range box_light_blue">임금근로일자리</span>
								<span class="range box_pink">비임금근로일자리</span>
							</div>
						</div>
						
						<div class="rcon_item flex-width-390 flex-mgR-10">
							<div class="rcon_tit">
								<strong>기업규모별</strong> 일자리규모 및 증감
							</div>
							<div class="btn_area">
								<div class="btn_right">
									<button class="btn_down"><img src="/images/administStats/more1/btncon_down.png" alt=""></button>
									<button class="btn_table">통계표보기</button>
									<button class="btn_question"><img src="/images/administStats/more1/btncon_question.png" alt=""></button>
								</div>
							</div>
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart4" style="width:100%; height:175px;  margin:0 auto;"></div>
								</figure> 
							</div> 
							<div class="division">
								<span class="range box_blue">대기업</span>
								<span class="range box_light_blue">중소기업</span>
								<span class="range box_pink">비영리기업</span>
							</div>
							
						</div>
						<div class="rcon_item flex-width-510" style="min-width:510px;">
							<div class="tit_wrapper">
								<div class="rcon_tit">
									<strong>조직형태별</strong> 일자리규모 및 증감
								</div>
								<div class="btn_area">
									<div class="btn_right">
										<button class="btn_down"><img src="/images/administStats/more1/btncon_down.png" alt=""></button>
										<button class="btn_table">통계표보기</button>
										<button class="btn_question"><img src="/images/administStats/more1/btncon_question.png" alt=""></button>
									</div>
								</div>
							</div>
							<div class="chart5_st">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart5" style="width:300px; height:350px;  float:left; "></div>
									</figure> 
								</div> 
								<div class="division_right">
									<div class="flex_wrapper">
										<img class="i_building_01" src="/images/administStats/more1/building_01.png" alt="">
										<div class="flex_text">
											<div class=" box_deep_blue">회사법인</div>
											<div class="txt_deep_blue">1,167.2만개</div>
										</div>
									</div>
									<div class="flex_wrapper">
										<img class="i_building_02" src="/images/administStats/more1/building_02.png" alt="">
										<div class="flex_text">
											<div class=" box_light_blue">회사이외법인</div>
											<div class="txt_light_blue">240.9만개</div>
										</div>
									</div>
									<div class="flex_wrapper">
										<img class="i_building_03" src="/images/administStats/more1/building_03.png" alt="">
										<div class="flex_text">
											<div class=" box_blue">정부 · 비법인단체</div>
											<div class="txt_blue">287.7만개</div>
										</div>
									</div>
									<div class="flex_wrapper">
										<img class="i_building_04" src="/images/administStats/more1/building_04.png" alt="">
										<div class="flex_text">
											<div class=" box_pink">개인기업체</div>
											<div class=" txt_pink">776.6만개</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="rBottomCon flex-mgT-10 flex-height-270">
						<div class="rcon_item2">
							<div class="item_in_line flex-pdR-20">
								<div class="tit_wrapper">
									<div class="rcon_tit">
										<strong>산업분류별</strong> 일자리규모
									</div>
									<div class="btn_area">
										<div class="btn_right">
											<button class="btn_down"><img src="/images/administStats/more1/btncon_down.png" alt=""></button>
											<button class="btn_table">통계표보기</button>
											<button class="btn_question"><img src="/images/administStats/more1/btncon_question.png" alt=""></button>
										</div>
									</div> 
								</div>
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart6" style="min-width:640px; width:100%; height:220px;  float:left; "></div>
									</figure> 
								</div> 
							</div>
							<div class="item_in_basic flex-pdL-20">
								<div class="tit_wrapper">
									<div class="rcon_tit">
										<strong>산업분류별</strong> 일자리 증감
									</div>
									<div class="btn_area">
										<div class="btn_right">
											<button class="btn_down"><img src="/images/administStats/more1/btncon_down.png" alt=""></button>
											<button class="btn_table">통계표보기</button>
											<button class="btn_question"><img src="/images/administStats/more1/btncon_question.png" alt=""></button>
										</div>
									</div>
								</div>

								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart7" style="min-width:630px; width:100%; height:212px;"></div>
										<!-- <div class="icon_01"><img src="/images/administStats/more1/icon_01.png" alt=""></div>
										<div class="icon_02"><img src="/images/administStats/more1/icon_02.png" alt=""></div>
										<div class="icon_03"><img src="/images/administStats/more1/icon_03.png" alt=""></div>
										<div class="icon_04"><img src="/images/administStats/more1/icon_04.png" alt=""></div>
										<div class="icon_05"><img src="/images/administStats/more1/icon_05.png" alt=""></div>
										<div class="icon_06"><img src="/images/administStats/more1/icon_06.png" alt=""></div> -->
										<style>
										#chart7 .highcharts-markers .highcharts-point { background-size:50%; }
										#chart7 .highcharts-markers .highcharts-point:nth-child(3) { stroke-width:1px; stroke:#000; }

										</style>

									</figure>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="section2 ">
				<div class="bottom-col ">
					<div class="BottomCon flex-height-270 flex-mgT-10">
						<div class="rcon_item2">
							<div class="item_in_line flex-pdR-20">
								<div class="tit_wrapper">
									<div class="rcon_tit">
										<strong>성별 · 연령대별</strong> 일자리규모
									</div>
									<div class="btn_area">
										<div class="btn_right">
											<button class="btn_down"><img src="/images/administStats/more1/btncon_down.png" alt=""></button>
											<button class="btn_table">통계표보기</button>
											<button class="btn_question"><img src="/images/administStats/more1/btncon_question.png" alt=""></button>
										</div>
									</div>									
								</div>
								<div class="chart8_st">
									<div class="chart8_img">
										<div class="man_bg">
											<img src="/images/administStats/more1/man_bg.png" alt="">
											<span>남자</span>
										</div>
										<div class="woman_bg">
											<img src="/images/administStats/more1/woman_bg.png" alt="">
											<span>여자</span>
										</div>
									</div>
									<div class="chartbox8_wrapper">
										<div class="chartbox">
											<figure class="highcharts-figure">
												<div id="chart8_01" style="min-width:856px; width:100%; height:70px;  float:left; "></div>
											</figure> 
										</div>
										<div class="chartbox">
											<figure class="highcharts-figure">
												<div id="chart8_02" style="min-width:856px; width:100%; height:70px;  float:left; margin-top:8px;"></div>
											</figure> 
										</div>
										<div class="division_blue">
											<span class="range_bk box_blue_01">19세 이하</span>
											<span class="range_bk box_blue_02">20~29세</span>
											<span class="range box_blue_03">40~49세</span>
											<span class="range box_blue_04">40~49세</span>
											<span class="range box_blue_05">50~59세</span>
											<span class="range box_blue_06">60세 이상</span>
										</div>
									</div>	
								</div>	
							</div>
							<div class="item_in_basic flex-pdL-20">
								<div class="tit_wrapper">
									<div class="rcon_tit">
										<strong>성별 · 연령대별</strong> 일자리 증감
									</div>
									<div class="btn_area">
										<div class="btn_right">
											<button class="btn_down"><img src="/images/administStats/more1/btncon_down.png" alt=""></button>
											<button class="btn_table">통계표보기</button>
											<button class="btn_question"><img src="/images/administStats/more1/btncon_question.png" alt=""></button>
										</div>
									</div>	
								</div>
								<div class="division_top">
									<span class="range_bk"><span class="blet" style="background-color:#169EDA"></span> <span class="txt">남자</span></span>
									<span class="range_bk"><span class="blet" style="background-color:#FF748E"></span> <span class="txt">여자</span></span>
								</div>
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart9" style="min-width:860px; width:100%; height:250px;  float:left; "></div>
									</figure> 
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>