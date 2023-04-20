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
						<table cellpadding="0" cellspacing="0" border="0" width="100%">
							<tr>
								<th colspan="2"><img src="/images/administStatsDetail/searchIcon1.png" alt="" /> 최근검색어</th>
							</tr>
						</table>
						<div class="searchMemory">
							<table cellpadding="0" cellspacing="0" border="0" width="100%">
								<tbody id="searchMemory"></tbody>							
							</table>
						</div>
						<table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:10px">
							<tr>
								<th colspan="2"><img src="/images/administStatsDetail/searchIcon2.png" alt="" /> 검색목록 <span id="searchCount"></span></th>
							</tr>
						</table>
						<div class="scrollBox">
				         	<table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: -15px;">
								<tbody id="list2"></tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<ul class="qna_list">
				<li>
					<div class="tit">
						<span class="" id="toplistpanelmain">일자리통계편</span> <img src="/images/administStatsDetail/housedash_icon01.png" alt="" />
					</div>
					<div class="con">
						<div class="listbox" >
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
							<select id="modalSearchTitle" class="customSelect2" >
								<option>성별 연령별 퇴직연금제도 가입률</option>
							</select>
						</td>
					</tr>
					<tr>
				 		<th>연도</th>
						<td class="td_mgl">
							<select id="modalSearchYear" class="customSelect2">
								<!-- <option value='2020'>2020</option>
								<option value='2019'>2019</option>
								<option value='2018'>2018</option>
								<option value='2017'>2017</option>
								<option value='2016'>2016</option>
								<option value='2015'>2015</option> -->
							</select>
						</td>
					</tr>
					<tr>
						<td colspan="2" style="text-align:center"><button onclick="$more2DashDetail.util.searchBtn1();">통계정보 조회</button></td>
					</tr>
				</table>
			</div>
		</div>
		<div class="contentbox">
			<div class="nav_wrapper">
				<div class="nav">
					퇴직연금통계 <i class="fa fa-angle-right"></i> <span id="subtitle">성별 연령별 퇴직연금제도 가입률</span> 
				</div>
				<div class="nav_sub">
					※ 수치가 공개되지 않는 통계자료(비밀보호(x), 자료없음(-))는 차트 상에서 0으로 표시됩니다.</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;실제 수치가 '0'인지 비공개인지 여부는 통계표에서 확인하실 수 있습니다.
				</div>
			</div>
			<div class="dashboardbox-type">
				<div class="item flex-width-780 flex-height-280" id="charttitle1">
					<div class="title"><span id="title1">연도별 퇴직연금제도 가입률</span><button id="chartBtn1"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
						<span class="select1"></span>
					</div>
					<section class="tabArea">
						<div class="tabBox on">
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart11" style="width:620px; height:230px"></div>
								</figure> 
							</div> 
						</div>
					</section>
				</div>
				<div class="item flex-width-930 flex-height-280 flex-mgL-10 charttitle" id="charttitle2">
					<div class="title"><span id="title2">2020년 성별 연령별 퇴직연금제도 가입률</span><button id="chartBtn2"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
						<span class="select2"></span>
					</div>
					<section class="tabArea2">
						<div class="tabBox on">
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart21" style="width:645px; height:230px;" ></div>
								</figure> 
							</div> 
							<!-- <div class="division" id="division2"></div> -->
						</div>
						<div class="tabBox">
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart22" style="width:390px; height:220px;"></div>
								</figure> 
							</div> 
							<!-- <div class="division" id="division21"></div> -->
						</div>
						<div class="tabBox">
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart23" style="width:390px; height:220px;"></div>
								</figure> 
							</div> 
							<!-- <div class="division" id="division22"></div> -->
						</div>
					</section>
				</div>
			</div>
			<div class="dashboardbox-type flex-mgT-10" id="flex_wrap">
				<div class="item-box flex-width-950 flex-height-500" id="charttitle3_4">
					<div class="item flex-width-950 flex-height-245 charttitle" id="charttitle3">
						<div class="title"><span id="title3">연도별 퇴직연금제도 가입(대상) 근로자</span><button id="chartBtn3"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
							<span class="select3"></span>
						</div>
						<section class="tabArea3">
							<div class="tabBox on">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart31" style="width:920px; height:185px"></div>
									</figure> 
								</div> 
							</div> 
						</section> 
						<!-- <div class="division" id="division3"></div> -->
					</div>
					<div class="item flex-width-1000 flex-height-245 flex-mgL-10 flex-mgT-10 charttitle" id="charttitle4">
						<div class="title"><span id="title4">2020 성별 연령별 퇴직연금제도 가입(대상) 근로자</span><button id="chartBtn4"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
							<span class="select4"></span>
						</div>
						<section class="tabArea4">
							<div class="tabBox on">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart41" style="width:900px; height:170px;"></div>
									</figure> 
								</div>
								<!-- <div class="division" id="division4"></div> -->
							</div>
							<div class="tabBox">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart42" style="width:900px; height:170px;"></div>
									</figure> 
								</div>
							</div>
							<div class="tabBox">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart43" style="width:900px; height:170px;"></div>
									</figure> 
								</div>
							</div>  
						</section>
					</div>
				</div>
				<div class="item-box flex-width-1430 flex-height-245 display_none" id="charttitle456">
					<div class="item flex-width-440 flex-height-245 charttitle flex-mgR-10" id="charttitle4_1" >
						<div class="title"><span id="title3">연도별 퇴직연금제도 가입(대상) 근로자</span><button id="chartBtn3"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
							<span class="select4_1"></span>
						</div>
						<section class="tabArea4_1">
							<div class="tabBox on">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart4_1" style="width:400px; height:200px"></div>
									</figure> 
								</div> 
							</div> 
						</section> 
						<div class="division" id="division3"></div>
					</div>
					<div class="item flex-width-440 flex-height-245 charttitle flex-mgR-10" id="charttitle5_1" >
						<div class="title"><span id="title3">연도별 퇴직연금제도 가입(대상) 근로자</span><button id="chartBtn3"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
							<span class="select5_1"></span>
						</div>
						<section class="tabArea5_1">
							<div class="tabBox on">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart5_1" style="width:400px; height:200px"></div>
									</figure> 
								</div> 
							</div> 
						</section> 
						<div class="division" id="division3"></div>
					</div>
					<div class="item flex-width-440 flex-height-245 charttitle " id="charttitle6_1" >
						<div class="title"><span id="title3">연도별 퇴직연금제도 가입(대상) 근로자</span><button id="chartBtn3"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
							<span class="select6_1"></span>
						</div>
						<section class="tabArea6_1">
							<div class="tabBox on">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart6_1" style="width:400px; height:200px"></div>
									</figure> 
								</div> 
							</div> 
						</section> 
						<div class="division" id="division3"></div>
					</div>
				</div>
				<!-- <div class="item-box flex-width-1000 flex-height-245 flex-mgL-10 flex-mgT-10 charttitle" id="showhide" style="display:none">
					<div class="item flex-width-950 flex-height-245 charttitle" id="charttitle4_1">
						<div class="title"><span id="title4">2020 성별 연령별 퇴직연금제도 가입(대상) 근로자</span><button id="chartBtn4"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
							<span class="select4_1"></span>
						</div>
						<section class="tabArea4_1">
							<div class="tabBox on">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart41_1" style="width:900px; height:170px;"></div>
									</figure> 
								</div>
								<div class="division" id="division4"></div>
							</div>
						</section>
					</div>
				</div> -->
				<div class="item-box flex-width-440 flex-height-500" id="charttitle5_6">
					<div class="item flex-width-440 flex-height-245 flex-mgL-10 charttitle" id="charttitle5">
						<div class="title"><span id="title5">2020 성별 퇴직연금제도 가입 근로자</span><button id="chartBtn5"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
							<span class="select5"></span>
						</div>
						<section class="tabArea5">
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart51" style="width:400px; height:200px;"></div>
								</figure> 
							</div>
						</section>
						<!-- <div class="division" id="division5"></div> -->
					</div>
					<div class="item flex-width-440 flex-height-245  flex-mgL-10 flex-mgT-10 charttitle" id="charttitle6">
						<div class="title"><span id="title6">2020 연령별 퇴직연금제도 가입 근로자</span><button id="chartBtn6"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
							<span class="select6"></span>
						</div>
						<section class="tabArea6">
							<!-- <ul id="tabArea3" class="tab">
								<li class="on"><a href="#!" class="chartNm2" id="chartTab3_1">총계</a></li>
								<li><a href="#!" id="chartTab3_2">남자</a></li>
								<li><a href="#!" class="chartNm3" id="chartTab3_3">여자</a></li>
							</ul> -->
							<div class="tabBox on">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart61" style="width:450px; height:210px;"></div>
									</figure> 
								</div>
								<!-- <div class="division" id="division6"></div> -->
							</div>
							<div class="tabBox">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart62" style="width:785px; height:135px;"></div>
									</figure> 
								</div>
								<!-- <div class="division" id="division61"></div> -->
							</div>
							<div class="tabBox">
								<div class="chartbox">
									<figure class="highcharts-figure">
										<div id="chart63" style="width:785px; height:135px;"></div>
									</figure> 
								</div>
								<!-- <div class="division" id="division62"></div> -->
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</body>
