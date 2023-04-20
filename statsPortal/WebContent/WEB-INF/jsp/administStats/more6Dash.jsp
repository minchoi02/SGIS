
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
<style>

</style>

<div id="wrapper3">
	<div class="container">
		

		<div class="contentbox-typeB">
			<div class="section1">
				<div class="left-col">
					
				</div>
				
				<div class="right-col">
					<div class="rBottomCon flex-height-245">
						<div class="rcon_item2">
							<div class="right-col-tit">
								<div>전체 임금근로 일자리</div>
							</div>
							<div class="item_in_wrapper">
								<div class="item_in_line flex-pdR-20">
									<div class="tit_wrapper">
										<div class="rcon_tit">
											<strong>일자리 규모 및 증감</strong> 
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
											<div id="chart61" style="width:688px; height:200px"></div>
										</figure>
									</div>
									 
								</div>
								<div class="item_in_basic flex-pdL-20">
									<div class="tit_wrapper">
										<div class="rcon_tit">
											<strong>일자리 형태별 분포</strong> 
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
											<div id="chart62" style="width:400px; height:200px"></div>
										</figure>
									</div>
								
								
								
								
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="section2 ">
				<div class="bottom-col flex-width-1770 ">
					<div class="BottomCon flex-height-330 flex-mgT-10">
						<div class="rcon_item2">
							<div class="right-col-tit">
								<div>산업별 임금근로 일자리 증감</div>
							</div>
							<div class="item_in_wrapper">
								<div class="item_in_line flex-pdR-20">
									<div class="tit_wrapper">
										<div class="rcon_tit">
											<strong>산업대분류별 증감</strong> 
										</div>
										<div class="btn_area">
											<div class="btn_right">
												<button class="btn_down"><img src="/images/administStats/more1/btncon_down.png" alt=""></button>
												<button class="btn_table">통계표보기</button>
												<button class="btn_question"><img src="/images/administStats/more1/btncon_question.png" alt=""></button>
											</div>
										</div>									
									</div>
									<div class="chart_txt">(전년동기대비, 만개)</div>
									<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart63" style="width:1010px; height:250px;"></div>
									</figure>
								</div>	
								</div>
								<div class="item_in_basic flex-pdL-20 flex-pdR-20">
									<div class="tit_wrapper">
										<div class="rcon_tit">
											<strong>제조업 중분류별 증감</strong>
										</div>
										<div class="btn_area">
											<div class="btn_right">
												<button class="btn_down"><img src="/images/administStats/more1/btncon_down.png" alt=""></button>
												<button class="btn_table">통계표보기</button>
												<button class="btn_question"><img src="/images/administStats/more1/btncon_question.png" alt=""></button>
											</div>
										</div>	
									</div>
									<div class="chart_txt">(전년동기대비, 만개)</div>
									<div class="chartbox">
										<figure class="highcharts-figure">
											<div id="chart64" style="width:300px; height:300px;"></div>
										</figure>
									</div>
									
								</div>
								<div class="item_in_box flex-pdL-20">
									<div class="tit_wrapper">
										<div class="rcon_tit">
											<strong>서비스업 중분류별 증감</strong>
										</div>
										<div class="btn_area">
											<div class="btn_right">
												<button class="btn_down"><img src="/images/administStats/more1/btncon_down.png" alt=""></button>
												<button class="btn_table">통계표보기</button>
												<button class="btn_question"><img src="/images/administStats/more1/btncon_question.png" alt=""></button>
											</div>
										</div>	
									</div>
									<div class="chart_txt">(전년동기대비, 만개)</div>
									<div class="chartbox">
										<figure class="highcharts-figure">
											<div id="chart65" style="width:300px; height:300px;"></div>
										</figure>
									</div>
									
								</div>
							</div>	
						</div>
					</div>
				</div>
				
			</div>
			<div class="section3 ">
				<div class="bottom-col flex-width-1770 ">
					<div class="BottomCon flex-height-245 flex-mgT-10">
						<div class="rcon_item2">
							<div class="right-col-tit">
								<div>특성별 임금근로 일자리</div>
							</div>
							<div class="item_in_wrapper">
								<div class="item_in_line flex-pdR-20">
									<div class="tit_wrapper">
										<div class="rcon_tit">
											<strong>성별</strong> 
										</div>
										<div class="btn_area">
											<div class="btn_right">
												<button class="btn_down"><img src="/images/administStats/more1/btncon_down.png" alt=""></button>
												<button class="btn_table">통계표보기</button>
												<button class="btn_question"><img src="/images/administStats/more1/btncon_question.png" alt=""></button>
											</div>
										</div>									
									</div>
									<div class="chartbox66_wrapper">
										<div class="chartbox">
											<figure class="highcharts-figure">
												<div id="chart66_01" style="width:360px; height:200px; margin:0 auto; "></div>
											</figure> 
										</div>	
										<div class="chart66_02_wrapper">
											<div class="chart_txt">(전년동기대비, 만개)</div>
											<div class="chartbox">
												<figure class="highcharts-figure">
													<div id="chart66_02" style="width:180px; height:200px;"></div>
												</figure>
											</div>	
										</div>	
									</div>
										
								</div>
								<div class="item_in_basic flex-pdL-20 flex-pdR-20">
									<div class="tit_wrapper">
										<div class="rcon_tit">
											<strong>연령대별</strong>
										</div>
										<div class="btn_area">
											<div class="btn_right">
												<button class="btn_down"><img src="/images/administStats/more1/btncon_down.png" alt=""></button>
												<button class="btn_table">통계표보기</button>
												<button class="btn_question"><img src="/images/administStats/more1/btncon_question.png" alt=""></button>
											</div>
										</div>	
									</div>
									<div class="chartbox67_wrapper">
										<div class="chartbox">
											<figure class="highcharts-figure">
												<div id="chart67_01" style="width:360px; height:200px; margin:0 auto; "></div>
											</figure> 
										</div>	
										<div class="chart67_02_wrapper">
											<div class="chart_txt">(전년동기대비, 만개)</div>
											<div class="chartbox">
												<figure class="highcharts-figure">
													<div id="chart67_02" style="width:400px; height:200px;"></div>
												</figure>
											</div>	
										</div>	
									</div>
									
								</div>
								<div class="item_in_box flex-pdL-20">
									<div class="tit_wrapper">
										<div class="rcon_tit">
											<strong>조직형태별</strong>
										</div>
										<div class="btn_area">
											<div class="btn_right">
												<button class="btn_down"><img src="/images/administStats/more1/btncon_down.png" alt=""></button>
												<button class="btn_table">통계표보기</button>
												<button class="btn_question"><img src="/images/administStats/more1/btncon_question.png" alt=""></button>
											</div>
										</div>	
									</div>
									<div class="chartbox68_wrapper">
										<div class="chartbox">
											<figure class="highcharts-figure">
												<div id="chart68_01" style="width:450px; height:200px; margin:0 auto; "></div>
											</figure> 
										</div>	
										<div class="chart68_02_wrapper">
											<div class="chart_txt">(전년동기대비, 만개)</div>
											<div class="chartbox">
												<figure class="highcharts-figure">
													<div id="chart68_02" style="width:340px; height:200px;"></div>
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
			
			
		</div>
	</div>
</div>