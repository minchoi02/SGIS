<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>행정통계시각화지도</title>
<meta charset="utf-8">
<meta name="format-detection" content="telephone=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- <script src="/js/plugins/jquery.min.js" type="text/javascript"></script> -->
<link rel="stylesheet"  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
<script>
$(document).ready(function(){
	$('ul.qna_list li:first-child').find(".con").stop().slideDown(400);
	$('ul.qna_list').on('click','.tit',  function() {
		var $this = $(this);
		var $hasCls = $this.hasClass("on");
		$this.closest("li").find(".con").stop().slideDown(400);
		$this.closest("ul").find("li .tit").each(function(){
			$(this).removeClass("on");
			$(this).closest("li").find(".con").stop().slideDown(400);
		}).promise().then(function(){
			if(!$hasCls){
				$this.addClass("on");
				$this.closest("li").find(".con").stop().slideUp(400);
			}
		});
	});
	//마우스 휠 가로스크롤
	$('.division').mousewheel(function(e, delta) {
		this.scrollLeft -= (delta * 30);
		e.preventDefault();
	});
	//검색 레이어
	$('.searchInput').click(function(){
		$(".searchLayer").fadeIn();
	});
	$('.searchClose').click(function(){
		$(".searchLayer").fadeOut();
	});
	$('.searchbox').mouseleave(function(){
		$(".searchLayer").fadeOut();
	});
});
</script>
<!-- <script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/series-label.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script> -->
</head>
<body>
<div id="wrapper22">
	<div class="container">
		<div class="searchlist">
			<div class="searchbox">
				<div class="search">
					<input type="text" value="" class="searchInput" onkeyup="if(window.event.keyCode==13){$more2DashDetail.ui.searchInput()}" placeholder="검색어를 입력하세요."/>
					<button onclick="$more2DashDetail.ui.searchInput();"><i class="fa fa-search"></i></button>
					<div class="searchLayer">
						<img src="/images/administStatsDetail/btnClose.png" alt="" class="searchClose"/>
						<div class="searchMemory">
							<table cellpadding="0" cellspacing="0" border="0" width="100%">
								<tbody id="searchMemory">
									<tr>
										<th colspan="2"><img src="/images/administStatsDetail/searchIcon1.png" alt="" /> 최근검색어</th>
									</tr>
								</tbody>							
							</table>
						</div>
						<table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:10px">
							<tr>
								<th colspan="2"><img src="/images/administStatsDetail/searchIcon2.png" alt="" /> 검색목록 <span id="searchCount"></span></th>
							</tr>
						</table>
						<div class="scrollBox">
							<table cellpadding="0" cellspacing="0" border="0" width="100%">
								<tbody id="list2"></tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<ul class="qna_list">
				<li>
					<div class="tit">
						<span class="" id="toplistpanelmain">임금근로 일자리동향</span> <img src="/images/administStatsDetail/housedash_icon01.png" alt="" />
					</div>
					<div class="con">
						<div class="listbox">
				         	<ul id="list1" style="margin-top:-16px;"></ul>
						</div>
					</div>
				</li>
			</ul>
			
			<div class="searchbox2">
				<table cellpadding="0" cellspacing="0" border="0">
					<colgroup>
				 		<col width="20%" />
						<col width="" />
					</colgroup>
					<tr>
				 		<th>항목</th>
						<td class="td_mgl">
							<select id="modalSearchTitle2" class="customSelect2" >
								<!-- <option>전체 및 산업별(대·중분류) 임금근로 일자리</option> -->
							</select>
						</td>
					</tr>
					<tr>
				 		<th>연도</th>
						<td class="td_mgl">
							<select id="modalSearchYear" class="customSelect2" >
								<!-- <option value='202104'>2021년 4분기</option>	
								<option value='202103'>2021년 3분기</option>
								<option value='202102'>2021년 2분기</option>
								<option value='202101'>2021년 1분기</option>
								<option value='202004'>2020년 4분기</option>
								<option value='202003'>2020년 3분기</option>
								<option value='202002'>2020년 2분기</option>
								<option value='202001'>2020년 1분기</option>
								<option value='201904'>2019년 4분기</option>
								<option value='201903'>2019년 3분기</option>
								<option value='201902'>2019년 2분기</option>
								<option value='201901'>2019년 1분기</option>
								<option value='201804'>2018년 4분기</option>
								<option value='201803'>2018년 3분기</option>
								<option value='201802'>2018년 2분기</option>
								<option value='201801'>2018년 1분기</option> -->
							</select>
						</td>
					</tr>
					<tr>
						<td colspan="2" style="text-align:center"><button onclick="$more3DashDetail.util.searchBtn2();">통계정보 조회</button></td>
					</tr>
				</table>
			</div>
		</div>
		<div class="contentbox">
			<div class="nav_wrapper">
				<div class="nav titleChange3">
					임금근로 일자리동향 <i class="fa fa-angle-right"></i> <span id="subtitle">전체 및 산업별(대·중분류) 임금근로 일자리</span> 
				</div>
				<div class="nav_sub">
					※ 수치가 공개되지 않는 통계자료(비밀보호(x), 자료없음(-))는 차트 상에서 0으로 표시됩니다.</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;실제 수치가 '0'인지 비공개인지 여부는 통계표에서 확인하실 수 있습니다.
				</div>
			</div>
			<div class="dashboardbox-type line1">
				<div class="item flex-width-600 flex-height-280" id="chartTitle1">
					<div class="title"><span id="title1">분기별 임금근로 일자리 및 증감</span><button id="chartBtn1"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
						<span class="select1"></span>
					</div>
					<section class="tabArea1">
						<div class="chartbox">
							<figure class="highcharts-figure">
								<div id="chart11" style="width:570px; height:230px; margin:0 auto"></div>
							</figure> 
						</div>
					</section>
					<!-- <div class="division" id="division1"></div> -->
				</div>
				<div class="item flex-width-405 flex-height-280 flex-mgL-10 charttitle" id="chartTitle2">
					<div class="title"><span id="title2">2021년 4분기 산업대분류별 임금근로 일자리 구성비</span><button id="chartBtn2"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
						<span class="select2"></span>
					</div>
					<section class="tabArea2">
						<div class="tabBox on">
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart21" style="width:1800px; height:150px"></div>
								</figure> 
							</div>
						</div>
					</section>
				</div>
				<div class="item flex-width-440 flex-height-280 flex-mgL-10 charttitle" id="chartTitle3">
					<div class="title"><span id="title3">2021년 4분기 산업대분류별 임근근로 일자리</span><button id="chartBtn3"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
						<span class="select3"></span>
					</div>
					<section class="tabArea3">
						<div class="tabBox on">
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart31" style="width:390px; height:200px;"></div>
								</figure> 
							</div>
						</div>
						<div class="tabBox">
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart32" style="width:390px; height:200px;"></div>
								</figure> 
							</div>
						</div>
						<div class="tabBox">
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart33" style="width:390px; height:200px;"></div>
								</figure> 
							</div>
						</div>
						<!-- <div class="division" id="division3"></div> -->
					</section>
				</div>
			</div>
			<div class="dashboardbox-type line2 flex-mgT-10">
				<div class="item-box flex-width-600 flex-height-500" id="chartBox4">
					<div class="item flex-width-600 flex-height-500 charttitle" id="chartTitle4">
						<div class="title">
							<span id="title4">2021년 4분기 산업대분류별 임근근로 일자리 증감</span>
							<div class="filterBoxWrapper">
								<button type="button" class="filterBtn" id="selectFilterBtn">분류별 보기</button>								
								<ul id="filterBox" class="filterBox">
									<li class="btnWrap">
										<button type="button" id="filterAll">전체선택</button>
										<button type="button" id="filterDes">전체해제</button>
										<button type="button" id="filterApply">적용</button>
									</li>
								</ul>
							</div>								
							<button id="chartBtn4"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
							<span class="select4"></span>
						</div>
						<section class="tabArea4">
							<div class="tabBox on">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart41" style="width:570px; height:390px;"></div>
									</figure> 
								</div>
							</div>
							<div class="tabBox">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart42" style="width:570px; height:390px;"></div>
									</figure> 
								</div>
							</div>
							<div class="tabBox">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart43" style="width:570px; height:390px;"></div>
									</figure> 
								</div>
							</div>
							<div class="tabBox">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart44" style="width:570px; height:390px;"></div>
									</figure> 
								</div>
							</div>
							<div class="tabBox">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart45" style="width:570px; height:390px;"></div>
									</figure> 
								</div>
							</div>
							<div class="tabBox">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart46" style="width:570px; height:390px;"></div>
									</figure> 
								</div>
							</div>
							<!-- <div class="division" id="division4"></div> -->
						</section>
					</div>
					<div class="item flex-width-600 flex-height-245 flex-mgT-10" id="chartTitle5">
						<div class="title"><span id="title5">2021년 4분기 연령별 임금근로 일자리 구성비</span><button id="chartBtn7"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
							<span class="select5"></span>
						</div>
						<section class="tabArea5">
						<!-- <ul class="tab" id="tabArea4">
							<li class="on"><a href="#!" id="li41">총계</a></li>
							<li><a href="#!" id="li42">지속</a></li>
							<li><a href="#!" id="li43">신규</a></li>
						</ul> -->
							<div class="tabBox on">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart51" style="width:570px; height:140px;"></div>
									</figure> 
								</div>
							</div>
							<div class="tabBox">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart52" style="width:570px; height:140px;"></div>
									</figure> 
								</div>
							</div>
							<div class="tabBox">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart53" style="width:570px; height:140px;"></div>
									</figure> 
								</div>
							</div>
							<!-- <div class="division" id="division7"></div> -->
						</section>
					</div>
				</div>
				<div class="item-box flex-width-830 flex-height-500" id="chartMain6">
					<div class="item flex-width-830 flex-height-245 flex-mgL-10 charttitle" id="chartTitle6">
						<div class="title"><span id="title6">2021년 4분기 산업중분류별 임금근로 일자리</span><button id="chartBtn5"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
							<span class="select6"></span>
						</div>
						<section class="tabArea6">
							<div class="tabBox on">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart61" style="width:785px; height:140px"></div>
									</figure> 
								</div>
							</div>
							<div class="tabBox">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart62" style="width:785px; height:140px"></div>
									</figure>                                         
								</div>                                                
							</div>                                                    
							<div class="tabBox">                                      
								<div class="chartbox">                                
									<figure class="highcharts-figure">                
										<div id="chart63" style="width:785px; height:140px"></div>
									</figure>                                         
								</div>                                                
							</div>                                                    
							<div class="tabBox">                                      
								<div class="chartbox">                                
									<figure class="highcharts-figure">                
										<div id="chart64" style="width:785px; height:140px"></div>
									</figure>                                         
								</div>                                                
							</div>                                                    
							<div class="tabBox">                                      
								<div class="chartbox">                                
									<figure class="highcharts-figure">                
										<div id="chart65" style="width:785px; height:140px"></div>
									</figure> 
								</div>
							</div>
							<div class="tabBox">                                      
								<div class="chartbox">                                
									<figure class="highcharts-figure">                
										<div id="chart66" style="width:785px; height:140px"></div>
									</figure> 
								</div>
							</div>
							<!-- <div class="division" id="division5"></div> -->
						</section>
					</div>
					<div class="item flex-width-830 flex-height-245  flex-mgL-10 flex-mgT-10 charttitle" id="chartTitle7">
						<div class="title"><span id="title7">2021년 4분기 산업중분류별 임금근로 일자리 증감</span><button id="chartBtn6"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
							<span class="select7"></span>
						</div>
						<section class="tabArea7">
							<!-- <ul class="tab" id="tabArea3">
								<li class="on"><a href="#!" id="li31" class="li1">총계</a></li>
								<li><a href="#!" id="li32" class="li2">지속</a></li>
								<li><a href="#!" id="li33" class="li3">대체</a></li>
								<li><a href="#!" id="li34" class="li4">신규</a></li>
								<li><a href="#!" id="li35" class="li6">소멸</a></li>
								<li><a href="#!" id="li36" class="li5">소멸</a></li>
							</ul> -->
							<div class="tabBox on">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart71" style="width:785px; height:140px"></div>
									</figure> 
								</div>
							</div>
							<div class="tabBox">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart72" style="width:785px; height:140px"></div>
									</figure>                                         
								</div>                                                
							</div>                                                    
							<div class="tabBox">                                      
								<div class="chartbox">                                
									<figure class="highcharts-figure">                
										<div id="chart73" style="width:785px; height:140px"></div>
									</figure>                                         
								</div>                                                
							</div>                                                    
							<div class="tabBox">                                      
								<div class="chartbox">                                
									<figure class="highcharts-figure">                
										<div id="chart74" style="width:785px; height:140px"></div>
									</figure>                                         
								</div>                                                
							</div>                                                    
							<div class="tabBox">                                      
								<div class="chartbox">                                
									<figure class="highcharts-figure">                
										<div id="chart75" style="width:785px; height:140px"></div>
									</figure> 
								</div>
							</div>
							<div class="tabBox">                                      
								<div class="chartbox">                                
									<figure class="highcharts-figure">                
										<div id="chart76" style="width:785px; height:140px"></div>
									</figure> 
								</div>
							</div>
						</section>
						<!-- <div class="division" id="division6"></div> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</body>
