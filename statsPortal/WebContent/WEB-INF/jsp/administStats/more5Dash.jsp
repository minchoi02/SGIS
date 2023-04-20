
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

<div id="wrapper2">
	<div class="container">
		

		<div class="contentbox-typeB">
			<div class="section1">
				<div class="left-col">
					
				</div>
				
				<div class="right-col">
					<div class="rBottomCon flex-height-280">
						<div class="rcon_item2">
							<div class="right-col-tit">
								<div>적립금액 및 운용방식</div>
							</div>
							<div class="item_in_wrapper">
								<div class="item_in_line flex-pdR-20" style="min-width:510px;">
									<div class="tit_wrapper">
										<div class="rcon_tit">
											<strong>퇴직연금 총 적립금액</strong> 
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
											<div id="chart51" style="width:510px; height:190px"></div>
										</figure>
									</div> 
								</div>
								<div class="item_in_basic flex-pdL-20 flex-pdR-20" style="min-width:450px;">
									<div class="tit_wrapper">
										<div class="rcon_tit">
											<strong>제도유형별 운용방법별 현황</strong> 
										</div>
										<div class="btn_area">
											<div class="btn_right">
												<button class="btn_down"><img src="/images/administStats/more1/btncon_down.png" alt=""></button>
												<button class="btn_table">통계표보기</button>
												<button class="btn_question"><img src="/images/administStats/more1/btncon_question.png" alt=""></button>
											</div>
										</div>
									</div>
	
									<div class="chart52_st">										
										<div class="chartbox52_wrapper">
											<div class="chartbox">
												<figure class="highcharts-figure">
													<div id="chart52" style="min-width:430px; width:100%; height:220px;  float:left; "></div>
												</figure> 
											</div>
										</div>	
									</div>
	
								</div>
								<div class="item_in_box flex-pdL-20">
									<div class="tit_wrapper">
										<div class="rcon_tit">
											<strong>금융권역별 운용방법별 현황</strong> 
										</div>
										<div class="btn_area">
											<div class="btn_right">
												<button class="btn_down"><img src="/images/administStats/more1/btncon_down.png" alt=""></button>
												<button class="btn_table">통계표보기</button>
												<button class="btn_question"><img src="/images/administStats/more1/btncon_question.png" alt=""></button>
											</div>
										</div>
									</div>
	
									<div class="chart53_st">										
										<div class="chartbox53_wrapper">
											<div class="chartbox">
												<figure class="highcharts-figure">
													<div id="chart53" style="min-width:442px; width:100%; height:220px;  float:left; "></div>
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
			
			<div class="section2 ">
				<div class="bottom-col flex-width-1100 ">
					<div class="BottomCon flex-height-270 flex-mgT-10 flex-mgR-10">
						<div class="rcon_item2">
							<div class="right-col-tit">
								<div>도입사업장 및 도입률</div>
							</div>
							<div class="item_in_wrapper">
								<div class="item_in_line flex-pdR-20" style="min-width:50%;">
									<div class="tit_wrapper">
										<div class="rcon_tit">
											<strong>전체</strong> 
										</div>
										<div class="btn_area">
											<div class="btn_right">
												<button class="btn_down"><img src="/images/administStats/more1/btncon_down.png" alt=""></button>
												<button class="btn_table">통계표보기</button>
												<button class="btn_question"><img src="/images/administStats/more1/btncon_question.png" alt=""></button>
											</div>
										</div>									
									</div>
									<div class="chart54_st">
										<div class="chartbox54_wrapper">
											<div class="division_chartbox01" style="left:-5px;">
												<span class="range_bk"><span class="blet" style="background-color:#F9A61A"></span> <span class="txt">전체 도입 사업장(개소)</span></span>
												<span class="range_bk"><span class="blet" style="border:3px solid #169EDA; border-radius:20px;"></span> <span class="txt">도입률(%)</span></span>
											</div>
											<div class="chartbox">
												<figure class="highcharts-figure">
													<div id="chart54_01" style="width:505px; height:70px;"></div>
												</figure>
											</div>
											<div class="chartbox">
												<figure class="highcharts-figure">
													<div id="chart54_02" style="width:535px; height:150px;"></div>
												</figure>
											</div>
										</div>	
									</div>	
								</div>
								<div class="item_in_basic flex-pdL-20">
									<div class="tit_wrapper">
										<div class="rcon_tit">
											<strong>주요 산업별(대분류)</strong>
										</div>
										<div class="btn_area">
											<div class="btn_right">
												<button class="btn_down"><img src="/images/administStats/more1/btncon_down.png" alt=""></button>
												<button class="btn_table">통계표보기</button>
												<button class="btn_question"><img src="/images/administStats/more1/btncon_question.png" alt=""></button>
											</div>
										</div>	
									</div>
									<div class="chart55_st">
										<div class="chartbox55_wrapper">
											<div class="division_chartbox01" style="left:15px;">
												<span class="range_bk"><span class="blet" style="background-color:#F9A61A"></span> <span class="txt">전체 도입 사업장(개소)</span></span>
												<span class="range_bk"><span class="blet" style="border:3px solid #169EDA; border-radius:20px;"></span> <span class="txt">도입률(%)</span></span>
											</div>
											<div class="chartbox">
												<figure class="highcharts-figure">
													<div id="chart55_01" style="width:500px; height:100px"></div>
												</figure>
											</div>
											<div class="chartbox">
												<figure class="highcharts-figure">
													<div id="chart55_02" style="width:535px; height:140px;"></div>	
												</figure>
											</div>
										</div>	
									</div>
									
								</div>
							</div>	
						</div>
					</div>
				</div>
				
				<div class="bottom-col" style="min-width:658px;">
					<div class="BottomCon flex-height-270 flex-mgT-10 box_04">
						<div class="rcon_item3 chart56_pd">
							<div class="item_in_line">
								<div class="tit_wrapper">
									<div class="rcon_tit">
										<strong>개인형 퇴직연금 추가 가입현황</strong>
									</div>
									<div class="btn_area">
										<div class="btn_right">
											<button class="btn_down"><img src="/images/administStats/more1/btncon_down.png" alt=""></button>
											<button class="btn_table">통계표보기</button>
											<button class="btn_question"><img src="/images/administStats/more1/btncon_question.png" alt=""></button>
										</div>
									</div>									
								</div>
								<div class="chart56_wrapper">
									<div class="chart56_in_line">
										<div class="chartbox">
											<figure class="highcharts-figure">
												<div id="chart56_01" style="width:450px; height:220px; margin:0 auto; "></div>
											</figure> 
										</div> 
									</div>
									<div class="chart56_in_basic">
										<div class="chartbox">
											<figure class="highcharts-figure">
												<div id="chart56_02" style="width:300px; height:250px; margin:0 auto; "></div>
											</figure> 
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="section3">
				<div class="bottom-col flex-width-1100 ">
					<div class="BottomCon flex-height-270 flex-mgT-10 flex-mgR-10">
						<div class="rcon_item2">
							<div class="right-col-tit">
								<div>가입근로자 및 가입률</div>
							</div>
							<div class="item_in_wrapper">
								<div class="item_in_line flex-pdR-20">
									<div class="tit_wrapper">
										<div class="rcon_tit">
											<strong>전체</strong> 
										</div>
										<div class="btn_area">
											<div class="btn_right">
												<button class="btn_down"><img src="/images/administStats/more1/btncon_down.png" alt=""></button>
												<button class="btn_table">통계표보기</button>
												<button class="btn_question"><img src="/images/administStats/more1/btncon_question.png" alt=""></button>
											</div>
										</div>									
									</div>
									<div class="chart57_st">
										<div class="chartbox57_wrapper">
											<div class="division_chartbox01" style="left:-5px;">
												<span class="range_bk"><span class="blet" style="background-color:#169EDA;"></span> <span class="txt">전체 가입 근로자(명)</span></span>
												<span class="range_bk"><span class="blet" style="border:3px solid #F9A61A; border-radius:20px;"></span> <span class="txt">가입률(%)</span></span>
											</div>
											<div class="chartbox">
												<figure class="highcharts-figure">
													<div id="chart57_01" style="width:505px; height:70px"></div>
												</figure>
											</div>
											<div class="chartbox">
												<figure class="highcharts-figure">
													<div id="chart57_02" style="width:535px; height:160px;"></div>
												</figure>
											</div>
										</div>	
									</div>	
								</div>
								<div class="item_in_basic flex-pdL-20">
									<div class="tit_wrapper">
										<div class="rcon_tit">
											<strong>주요 산업별(대분류)</strong>
										</div>
										<div class="btn_area">
											<div class="btn_right">
												<button class="btn_down"><img src="/images/administStats/more1/btncon_down.png" alt=""></button>
												<button class="btn_table">통계표보기</button>
												<button class="btn_question"><img src="/images/administStats/more1/btncon_question.png" alt=""></button>
											</div>
										</div>	
									</div>
									<div class="chart58_st">
										<div class="chartbox58_wrapper">
											<div class="division_chartbox01">
												<span class="range_bk"><span class="blet" style="background-color:#169EDA"></span> <span class="txt">전체 가입 근로자(명)</span></span>
												<span class="range_bk"><span class="blet" style="background-color:#F9A61A"></span> <span class="txt">가입률(%)</span></span>
											</div>
											<div class="chartbox">
												<figure class="highcharts-figure">
													<div id="chart58_01" style="width:500px; height:100px"></div>
												</figure>
											</div>
											<div class="chartbox">
												<figure class="highcharts-figure">
													<div id="chart58_02" style="width:520px; height:140px;"></div>
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
					</div>
				</div>
				
				<div class="bottom-col" style="min-width:658px;">
					<div class="BottomCon flex-height-270 flex-mgT-10 box_04">
						<div class="rcon_item3 chart56_pd">
							<div class="item_in_line">
								<div class="tit_wrapper">
									<div class="rcon_tit">
										<strong>사유별, 연령별 중도인출 현황</strong>
									</div>
									<div class="btn_area">
										<div class="btn_right">
											<button class="btn_down"><img src="/images/administStats/more1/btncon_down.png" alt=""></button>
											<button class="btn_table">통계표보기</button>
											<button class="btn_question"><img src="/images/administStats/more1/btncon_question.png" alt=""></button>
										</div>
									</div>									
								</div>
								<div class="chart59_txt">중도인출자수 전체 69,139 명</div>
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart59" style="width:620px; height:200px"></div>
									</figure>
								</div>
								<div class="division_chartbox02">
									<span class="range_bk"><span class="blet" style="background-color:#8CC63E"></span> <span class="txt">주택구입</span></span>
									<span class="range_bk"><span class="blet" style="background-color:#F9A61A"></span> <span class="txt">주거임차</span></span>
									<span class="range_bk"><span class="blet" style="background-color:#169EDA"></span> <span class="txt">장기요양</span></span>
									<span class="range_bk"><span class="blet" style="background-color:#FFE93D"></span> <span class="txt">기타</span></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</div>