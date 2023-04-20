              <%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>행정통계시각화지도</title>
<meta charset="utf-8">
<meta name="format-detection" content="telephone=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<script src="js/jquery.min.js" type="text/javascript"></script>
<link rel="stylesheet"  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">

<script>
$(document).ready(function(){
	//마우스 휠 가로스크롤
	$('.division').mousewheel(function(e, delta) {
		this.scrollLeft -= (delta * 30);
		e.preventDefault();
	});
});
</script>

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
								<th colspan="2"><img src="/images/administStatsDetail/searchIcon2.png" alt="" /> 검색목록 <span id="searchCount">15건</span></th>
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
						<span>일자리통계편</span> <img src="/images/administStatsDetail/housedash_icon01.png" alt="" />
					</div>
					<div class="con toggle">
						<div class="listbox" id="list1">
							<!-- <ul id="list1">
							</ul> -->
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
							<select class="customSelect2 modalSearchTitle" >
								<option>조직형태별 일자리</option>
							</select>
						</td>
					</tr>
					<tr>
				 		<th>연도</th>
						<td class="td_mgl">
							<select class="customSelect2 modalSearchYear" >
								<!-- <option value="2020">2020</option>
								<option value="2019">2019</option>
								<option value="2018">2018</option>
								<option value="2017">2017</option>
								<option value="2016">2016</option> -->
							</select>
						</td>
					</tr>
					<tr>
						<td colspan="2" style="text-align:center"><button onclick="javascript:$more1DashDetail.util.searchBtn();">통계정보 조회</button></td>
					</tr>
				</table>
			</div>
		</div>
		<div class="contentbox">
			<div class="nav_wrapper">
				<div class="nav titleChange">
					일자리통계편 <i class="fa fa-angle-right"></i> 조직형태별 일자리
				</div>
				<div class="nav_sub">
					※ 수치가 공개되지 않는 통계자료(비밀보호(x), 자료없음(-))는 차트 상에서 0으로 표시됩니다.</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;실제 수치가 '0'인지 비공개인지 여부는 통계표에서 확인하실 수 있습니다.
				</div>
			</div>
			<div class="dashboardbox-type">
				<div class="item flex-width-600 flex-height-280" id="more1ChartTitle1">
					<div class="title titleChart1">연도별 일자리(총계)<button id="downPicture1"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
						<span class="select1"></span>
					</div>
					<section class="tabArea">
						<ul class="tab chartButton1" style="display:block;">
						</ul>
						<div class="tabBox on">
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart1" style="width:575px; height:230px; "></div>
								</figure>
							</div>
							<!-- <div class="division">
								<span class="range"><span class="blet"></span> 전체일자리</span>
							</div> -->
						</div>
						<div class="tabBox">
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart11" style="width:570px; height:230px;"></div>
								</figure>
							</div>
							<!-- <div class="division legend1">
								
							</div> -->
						</div>
						<div class="tabBox">
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart12" style="width:570px; height:230px;"></div>
								</figure>
							</div>
							<!-- <div class="division legend12">
							</div> -->
						</div>
						<div class="tabBox">
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart13" style="width:570px; height:230px;"></div>
								</figure>
							</div>
							<!-- <div class="division legend13">
							</div> -->
						</div>
					</section>
				</div>
				<div class="item flex-width-370 flex-height-280 flex-mgL-10" id="more1ChartTitle2">
					<div class="title titleChart2"><span class="chartNm2" style="float:left">2020년 일자리형태별 일자리</span><button id="downPicture2"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button></div>
					<section class="tabArea2">
						<div class="chartbox">
							<figure class="highcharts-figure">
								<div class="" id="chart2" style="width:425px; height:260px"></div>
							</figure>
						</div>
						<!-- <div class="division legend2">
							
						</div> -->
					</section>
				</div>
				<div class="item flex-width-440 flex-height-280 flex-mgL-10" id="more1ChartTitle3">
					<div class="title_sub titleChart3"><span class="tit_bd chartNm3" style="float:left">2020년 조직형태별 일자리</span><button id="downPicture3"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
						<span class="tabs2 select3 al-Left"></span>
						<span class="tabs2 chartButton3_1 al-Left"></span>
					</div>	
					<section class="tabArea3">
						<div class="tab_container">
							<ul class="tabs chartButton3">
							
							</ul>
						</div>	
						<div class="tab_container2" >
							<!-- <div class="tabs2 chartButton3_1 select3">
							</div> -->
						</div>
					</section>
				</div>
			</div>
			<div class="dashboardbox-type flex-mgT-10">
				<div class="item flex-width-600 flex-height-500" id="more1ChartTitle4">
					<div class="title_sub titleChart4"><span class="tit_bd chartNm4" style="float:left">2020년 조직형태별 일자리형태별 일자리</span><button id="downPicture4"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
						<span class="tabs2 select4"></span>
						<span class="tabs2 chartButton4_1 al-Left"></span>
					</div>
					<section class="tabArea4">
						<div class="tab_container">
							<ul class="tabs chartButton4">
								
							</ul>
						</div>
						<div class="tab_container2" >
							<!-- <div class="tabs2 chartButton4_1 select4">
							</div> -->
						</div>
					</section>
				</div>
				<div class="item flex-width-600 flex-height-280" id="more1ChartTitle1_1" style="display: none;">
					<div class="title titleChart1">연도별 일자리(총계)<button id="downPicture1_1"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
						<span class="select1"></span>
					</div>
					<section class="tabArea1_1">
						<ul class="tab chartButton1" style="display:block;">
						</ul>
						<div class="tabBox on">
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart1_0" style="width:570px; height:745px; "></div>
								</figure>
							</div>
						</div>
						<div class="tabBox">
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart1_1" style="width:570px; height:745px; "></div>
								</figure>
							</div>
						</div>
						<div class="tabBox">
							<div class="chartbox">
								<figure class="highcharts-figure">
									<div id="chart1_2" style="width:570px; height:720px; "></div>
								</figure>
							</div>
						</div>
					</section>
				</div>
				<div class="item-box flex-width-830 flex-height-500" id="chartTitleMain5">
					<div class="item flex-width-830 flex-height-245 flex-mgL-10"  id="more1ChartTitle5">
						<div class="title titleChart5"><span class="chartNm5" style="float:left">2020년 조직형태별 신규, 소멸일자리</span><button id="downPicture5"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
							<span class="tabs2 select5 al-Left"></span>
							<span class="tabs2 chartButton5_1 al-Left"></span>
						</div>
						<section class="tabArea5">
							<div class="tab_container">
								<ul class="tabs chartButton5">
								
								</ul>
							</div>
							<div class="tab_container2" >
								<!-- <div class="tabs2 chartButton5_1 select5">
								</div> -->
							</div>
						</section>
					</div>
					<div class="item flex-width-830 flex-height-245 flex-mgL-10"  id="more1ChartTitle5_1">
						<div class="title titleChart5_1"><span class="chartNm5_1" style="float:left">2020년 조직형태별 신규, 소멸일자리</span><button id="downPicture5_1"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
							<span class="tabs2 select5_1 al-Left"></span>
							<span class="tabs2 chartButton51_1 al-Left"></span>
						</div>
						<section class="tabArea5_1">
							<div class="tab_container">
								<ul class="tabs chartButton51">
								
								</ul>
							</div>
							<div class="tab_container2" >
								<!-- <div class="tabs2 chartButton5_1 select5">
								</div> -->
							</div>
						</section>
					</div>
					<div class="item flex-width-830 flex-height-245  flex-mgL-10 flex-mgT-10" id="more1ChartTitle6">
						<div class="title titleChart6"><span class="chartNm6" style="float:left">2020년 전년대비 조직형태별 일자리 증감</span><button id="downPicture6"><img src="/images/administStatsDetail/btn_down_chart.png" alt="" /></button>
							<span class="tabs2 select6 al-Left"></span>
							<span class="tabs2 chartButton6_1 al-Left"></span>
						</div>
						<section class="tabArea6">
							<div class="tab_container">
								<ul class="tabs chartButton6">

								</ul>
							</div>
							<div class="tab_container2" >
								<!-- <div class="tabs2 chartButton6_1 select6">
								</div> -->
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div>

</div>
</body>
</html>
