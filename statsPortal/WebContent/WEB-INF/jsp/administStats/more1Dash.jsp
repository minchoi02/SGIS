
<%
	/**************************************************************************************************************************
	* Program Name	: 행정통계시각화 > 통계더보기 > 일자리
	* File Name		: more1Dash.jsp
	* Comment		:
	* History		:
	**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<!--  레이아웃 및 스크립트 추가 기존소스 하단에 none  배천규  20221214  -->
<link rel="stylesheet" href="/css/administStats/renew/moreNewDash1.css">
<script>
$(document).ready(function() {
	$("#moreCardSelet").change(function(){
		console.log($("#moreCardSelet").val());
		$(".moreCard").css("display","none");
		$(".more1Card"+$("#moreCardSelet").val()).css("display","block");
		
	});
});
//커스텀차트 이미지 다운로드
function scShotChart(chartId){
	$("#moreCardSelet").css("background","#fff url()");
	$(".flexClass a").css("display","none");
	$(".contentbox-typeB .left-col").css("border-radius","0px");
	$("body").css("font-family","NanumSquare");
	$(".contentbox-typeB .selection .rcon_box .rcon_tit span:last-child").css("display","none");
	$(".contentbox-typeC .selection .rcon_box .rcon_tit span:last-child").css("display","none");
	
	srvLogWrite("S0","01","06","00","","thema="+( $administStatsMain.ui.selectedThema ? $administStatsMain.ui.selectedThema.trim() : "" )); //jrj 로그
	html2canvas(document.querySelector("#"+chartId+"box")).then(function(canvas){
		var chartNm = ['종사상지위별 일자리규모 및 증감','기업규모별 일자리규모 및 증감','조직형태별 일자리규모 및 증감','산업분류별 일자리규모','산업분류별 일자리 증감','성별ㆍ연령대별 일자리 규모','성별ㆍ연령대별 일자리 증감','일자리행정통계'];
		var selectYear = $("#searchYear").val();
		
		if(chartId=='more1Chart1'){ chartNm = chartNm[0]; }
		else if(chartId=='more1Chart2'){ chartNm = chartNm[1]; }
		else if(chartId=='more1Chart4'){ chartNm = chartNm[2]; }
		else if(chartId=='more1Chart3'){ chartNm = chartNm[3]; }
		else if(chartId=='more1Chart9'){ chartNm = chartNm[4]; }
		else if(chartId=='more1Chart5'){ chartNm = chartNm[5]; }
		else if(chartId=='more1Chart11'){ chartNm = chartNm[6]; }
		else if(chartId=='more1Card'){ chartNm = chartNm[7]; }
		
		if(canvas.msToBlob) { //for IE 10, 11
			var blob = canvas.msToBlob();
			window.navigator.msSaveBlob(blob, selectYear + "년 "+ chartNm+".png");
		}else {			
			saveAs(canvas.toDataURL("image/png"), selectYear + "년 "+ chartNm+".png");
		}
	});
	function saveAs(uri, filename) {
		var link = document.createElement('a');
		if(typeof link.download === 'string') {
			link.href = uri;
			link.download = filename;
			//Firefox requires the link to be in the body
			document.body.appendChild(link);
			//simulate click
			link.click();
			//remove the link when done
			document.body.removeChild(link);
		}else {
			window.open(uri);
		}
	}
	$("#moreCardSelet").css("background","#fff url(/images/administStats/renew/arw.png) right 10px center no-repeat");
	$(".flexClass a").css("display","block");
	$(".contentbox-typeB .left-col").css("border-radius","15px");
	$(".contentbox-typeB .selection .rcon_box .rcon_tit span:last-child").css("display","flex");
	$(".contentbox-typeC .selection .rcon_box .rcon_tit span:last-child").css("display","flex");
}
</script>
<style>
#more1Card1 .highcharts-background { fill:#1F60DE !important; }
#more1Card2 .highcharts-background { fill:#1F60DE !important; }
#more1Card3 .highcharts-background { fill:#1F60DE !important; }
#more1Card4 .highcharts-background { fill:#1F60DE !important; }
#more1Card5 .highcharts-background { fill:#1F60DE !important; }
#more1Card6 .highcharts-background { fill:#1F60DE !important; }
#moreCardSelet { 
	float: left;
	border-radius: 30px;
	box-sizing:border-box;
	padding:7px 20px; 
	min-width:180px;
	border: 2px solid #000;
	font-size: 14px;
	color: #000;
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
	background: #fff url(/images/administStats/renew/arw.png) right 10px center no-repeat;
	font-weight: 700;
}
.flexClass { display:flex; align-items:center; justify-content:space-between; }
.flexClass a { font-size:14px; font-weight:bold; display:flex; align-items:center; justify-content:center; border:2px solid #000; border-radius:30px; box-sizing:border-box; padding:7px; background-color:#fff;}
.flexClass a img { max-width:100%; width:20px;}
</style>
<div id="wrapperMore">
	<div class="container">
		<div class="contentbox-typeB">
			<div class="left-col" id="more1Cardbox">
				<div class="title"><span id="cardSetYear">2020</span>년 일자리 총 <span id="cardSetTotal">2,472.5</span>만개</div>
				<div class="subtitle">전년대비 <span id="cardSetReturnTxt">70.5만개 증가</span></div>
				<div class="flexClass">
					<select id="moreCardSelet">
						<option value="1" >종사상지위별</option>
						<option value="2" >기업규모별</option>
						<option value="3" >조직형태별</option>
						<option value="4" >성별ㆍ연령대별(남자)</option>
						<option value="5" >성별ㆍ연령대별(여자)</option>
					</select>
					<a href="#" class="" onclick="scShotChart('more1Card');"><img src="/images/administStats/more1/iconCardDown.png" alt=""></a>
				</div>
				
				<div id="more1Card1" class="more1Card1 moreCard" style="width:415px; height:280px; overflow:hidden; " ></div>
				<div id="more1Card2" class="more1Card2 moreCard" style="width:415px; height:280px; overflow:hidden; display:none;" ></div>
				<div id="more1Card3" class="more1Card3 moreCard" style="width:415px; height:280px; overflow:hidden; display:none;" ></div>
				<div id="more1Card4" class="more1Card4 moreCard" style="width:415px; height:280px; overflow:hidden; display:none;" ></div>
				<div id="more1Card5" class="more1Card5 moreCard" style="width:415px; height:280px; overflow:hidden; display:none;" ></div>
				<div class="mainCardfot">
					<div class="tit">전체 일자리 증감</div>
					<div id="more1Chart6" style="width:300px; height:120px;"></div>
				</div>
				
			</div>
			<div class="right-col">
				<div class="selection top flex-height-280">
						<div class="rcon_box flex-width-390" id="more1Chart1box">
							<div class="rcon_tit">
								<span><b>종사상지위별</b> 일자리규모 및 증감</span>
								<span class="titleDownHideShow">
									<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more1Chart1" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_question.png" alt=""></a>
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="more1Chart1" onclick="javascript: return false;">통계표보기</a>
									<!-- <a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more1Chart1" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_down.png" alt=""></a> -->
									<a href="#" class="" onclick="scShotChart('more1Chart1');"><img src="/images/administStats/more1/btncon_down.png" alt=""></a>
								</span>
							</div>
							<div class="chartbox">
								<div id="more1Chart1" style="width:350px; height:200px;"></div>
							</div>
							<div class="division">
								<span class="range box_light_blue">임금근로일자리</span>
								<span class="range box_pink">비임금근로일자리</span>
							</div>
						</div>

					<div class="rcon_box flex-width-390" id="more1Chart2box">
						<div class="rcon_tit">
							<span><b>기업규모별</b> 일자리규모 및 증감</span>
							<span class="titleDownHideShow">
								<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more1Chart2" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_question.png" alt=""></a>
								<a href="#" class="btn-util-2" target="_blank" data-chart-id="more1Chart2" onclick="javascript: return false;">통계표보기</a>
								<!-- <a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more1Chart2" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_down.png" alt=""></a> -->
								<a href="#" class="" onclick="scShotChart('more1Chart2');"><img src="/images/administStats/more1/btncon_down.png" alt=""></a>
							</span>
						</div>
						<div class="chartbox">
							<div id="more1Chart2" style="width:350px; height:200px;"></div>
						</div>
						<div class="division">
							<span class="range box_blue">대기업</span>
							<span class="range box_light_blue">중소기업</span>
							<span class="range box_pink">비영리기업</span>
						</div>
					</div>
					<div class="rcon_box flex-width-510" id="more1Chart4box">
						<div class="rcon_tit">
							<span><b>조직형태별</b> 일자리규모 및 증감</span>
							<span class="titleDownHideShow">
								<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more1Chart4" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_question.png" alt=""></a>
								<a href="#" class="btn-util-2" target="_blank" data-chart-id="more1Chart4" onclick="javascript: return false;">통계표보기</a>
								<!-- <a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more1Chart4" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_down.png" alt=""></a> -->
								<a href="#" class="" onclick="scShotChart('more1Chart4');"><img src="/images/administStats/more1/btncon_down.png" alt=""></a>
							</span>
						</div>
						<div class="chartbox">
							<div id="more1Chart4" style="width:320px; height:210px;"></div>
						</div>
						<div class="division_right">
							<div class="flex_wrapper">
								<img class="i_building_01" src="/images/administStats/more1/building_01.png" alt="">
								<div class="flex_text">
									<div class=" box_deep_blue">회사법인</div>
									<div class="txt_deep_blue" id="more1Chart4TotTxt1"></div>
								</div>
							</div>
							<div class="flex_wrapper">
								<img class="i_building_02" src="/images/administStats/more1/building_02.png" alt="">
								<div class="flex_text">
									<div class=" box_light_blue">회사이외법인</div>
									<div class="txt_light_blue" id="more1Chart4TotTxt2"></div>
								</div>
							</div>
							<div class="flex_wrapper">
								<img class="i_building_03" src="/images/administStats/more1/building_03.png" alt="">
								<div class="flex_text">
									<div class=" box_blue">정부 · 비법인단체</div>
									<div class="txt_blue" id="more1Chart4TotTxt3"></div>
								</div>
							</div>
							<div class="flex_wrapper">
								<img class="i_building_04" src="/images/administStats/more1/building_04.png" alt="">
								<div class="flex_text">
									<div class=" box_pink">개인기업체</div>
									<div class=" txt_pink" id="more1Chart4TotTxt4"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="selection bottom  flex-height-300 mgt10">
					<div class="rcon_box type2">
						<div class="" id="more1Chart3box">
							<div class="rcon_tit">
								<span><b>산업분류별</b> 일자리규모</span>
								<span class="titleDownHideShow">
									<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more1Chart3" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_question.png" alt=""></a>
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="more1Chart3" onclick="javascript: return false;">통계표보기</a>
									<!-- <a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more1Chart3" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_down.png" alt=""></a> -->
									<a href="#" class="" onclick="scShotChart('more1Chart3');"><img src="/images/administStats/more1/btncon_down.png" alt=""></a>
								</span>
							</div>
							<div class="chartbox">
								<div id="more1Chart3" style="width:620px; height:220px;"></div>
							</div>
						</div>
						<div class="border1dotted"></div>
						<div class="" id="more1Chart9box">
							<div class="rcon_tit">
								<span><b>산업분류별</b> 일자리 증감</span>
								<span class="titleDownHideShow">
									<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more1Chart9" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_question.png" alt=""></a>
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="more1Chart9" onclick="javascript: return false;">통계표보기</a>
									<!-- <a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more1Chart9" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_down.png" alt=""></a> -->
									<a href="#" class="" onclick="scShotChart('more1Chart9');"><img src="/images/administStats/more1/btncon_down.png" alt=""></a>
								</span>
							</div>
							<div class="chartbox">
								<div id="more1Chart9" style="width:620px; height:220px;"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="contentbox-typeC mgt10">
		
			<div class="" id="more1Chart5box">
				<div class="rcon_tit">
					<span><b>성별ㆍ연령대별</b> 일자리규모</span>
					<span class="titleDownHideShow">
						<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more1Chart5" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_question.png" alt=""></a>
						<a href="#" class="btn-util-2" target="_blank" data-chart-id="more1Chart5" onclick="javascript: return false;">통계표보기</a>
						<!-- <a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more1Chart5" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_down.png" alt=""></a> -->
						<a href="#" class="" onclick="scShotChart('more1Chart5');"><img src="/images/administStats/more1/btncon_down.png" alt=""></a>
					</span>
				</div>
				<div class="conbody">
					<div class="chartImgBox">
						<span>
							<span>남자</span>
							<img src="/images/administStats/more1/man_bg.png" alt="">	
						</span>
						<span>
							<span>여자</span>
							<img src="/images/administStats/more1/woman_bg.png" alt="">
						</span>
					</div>
					<div class="chartbox">
						<div id="more1Chart5" style="width:750px; height:220px;"></div>
					</div>
				</div>
			</div>
			<div class="border1dotted"></div>
			<div class="" id="more1Chart11box">
				<div class="rcon_tit">
					<span><b>성별ㆍ연령대별</b> 일자리 증감</span>
					<span class="titleDownHideShow">
						<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more1Chart11" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_question.png" alt=""></a>
						<a href="#" class="btn-util-2" target="_blank" data-chart-id="more1Chart11" onclick="javascript: return false;">통계표보기</a>
						<!-- <a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more1Chart11" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_down.png" alt=""></a> -->
						<a href="#" class="" onclick="scShotChart('more1Chart11');"><img src="/images/administStats/more1/btncon_down.png" alt=""></a>
					</span>
				</div>
				<div class="chartbox">
					<div id="more1Chart11" style="width:840px; height:220px;"></div>
				</div>
			</div>
			
		</div>
	</div>
			
			
			<div class="panel-body border-color-1" style="display:none; ">
				<div class="row">
					<div class="col col-12 bd-b">
						<div class="col col-6" style="height: 196px">
							<div class="card">
								<div class="card-header">
									<div class="card-title">
										<h4 class="more1Chart1_title"></h4>
									</div>

									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more1Chart1" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="more1Chart1" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more1Chart1" onclick="javascript: return false;"></a>
									</div>
								</div>
								<!-- <div class="card-body" id="more1Chart1"></div> -->
							</div>
						</div>
						<div class="col col-6 bdl-1" style="height: 196px">
							<div class="card">
								<div class="card-header">
									<div class="card-title">
										<h4 class="more1Chart2_title"></h4>
									</div>

									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more1Chart2" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="more1Chart2" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more1Chart2" onclick="javascript: return false;"></a>
									</div>
								</div>
								<!-- <div class="card-body" id="more1Chart2"></div> -->
							</div>
						</div>
					</div>
					<div class="col col-12 bd-b" style="height: 196px">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="more1Chart3_title"></h4>
								</div>
								<div class="util-group">
									<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more1Chart3" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="more1Chart3" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more1Chart3" onclick="javascript: return false;"></a>
								</div>
							</div>
							<!-- <div class="card-body" id="more1Chart3"></div> -->
						</div>
					</div>
					<div class="col col-12 bd-b" style="height: 196px">
						<div class="col col-6" style="width: 35%;">
							<div class="card">
								<div class="card-header">
									<div class="card-title">
										<h4 class="more1Chart4_title"></h4>
									</div>

									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more1Chart4" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="more1Chart4" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more1Chart4" onclick="javascript: return false;"></a>
									</div>
								</div>
								<div class="card-body" id="more1Chart4"></div>
							</div>
						</div>
						<div class="col col-6 bdl-1" style="width: 65%;">
							<div class="card">
								<div class="card-header">
									<div class="card-title">
										<h4 class="more1Chart5_title"></h4>
									</div>

									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more1Chart5" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="more1Chart5" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more1Chart5" onclick="javascript: return false;"></a>
									</div>
								</div>
								<!-- <div class="card-body" id="more1Chart5"></div> -->
							</div>
						</div>
					</div>
					<div class="col col-12 bd-b in_col" style="height: 190px">
						<div class="card card-ay">
							<div class="card-header left">
								<div class="card-title">
									<h4 class="tmsrChart_title"></h4>
								</div>

								<div class="util-group">
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="tmsrChart" onclick="javascript: return false;"></a>
								</div>
							</div>
							<!-- <div class="card-body" id="tmsrChart"></div> -->
						</div>
					</div>
				</div>
			</div>

	<!-- // 일자리규모 -->

	<div class="col col-7" style="display:none; ">
		<div class="panel panel-hori panel-vertical">
			<!-- <div class="panel-titles bg-type-2">
				<b>일자리증감</b>
			</div> -->
			<div class="panel-body border-color-2">
				<div class="row">
					<div class="col col-12 bd-b" style="height: 196px">
						<div class="col col-4">
							<div class="card">
								<div class="card-header">
									<div class="card-title">
										<h4 class="more1Chart6_title"></h4>
									</div>

									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more1Chart6" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="more1Chart6" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more1Chart6" onclick="javascript: return false;"></a>
									</div>
								</div>
								<!-- <div class="card-body" id="more1Chart6"></div> -->
							</div>
						</div>
						<div class="col col-4 bdl-1">
							<div class="card">
								<div class="card-header">
									<div class="card-title">
										<h4 class="more1Chart7_title"></h4>
									</div>

									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more1Chart7" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="more1Chart7" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more1Chart7" onclick="javascript: return false;"></a>
									</div>
								</div>
								<div class="card-body" id="more1Chart7"></div>
							</div>
						</div>
						<div class="col col-4 bdl-1">
							<div class="card">
								<div class="card-header">
									<div class="card-title">
										<h4 class="more1Chart8_title"></h4>
									</div>

									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more1Chart8" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="more1Chart8" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more1Chart8" onclick="javascript: return false;"></a>
									</div>
								</div>
								<div class="card-body" id="more1Chart8"></div>
							</div>
						</div>
					</div>
					<div class="col col-12 bd-b" style="height: 196px">
						<div class="col col-12">
							<div class="card">
								<div class="card-header">
									<div class="card-title">
										<h4 class="more1Chart9_title"></h4>
									</div>

									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more1Chart9" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="more1Chart9" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more1Chart9" onclick="javascript: return false;"></a>
									</div>
								</div>
								<!-- <div class="card-body" id="more1Chart9"></div> -->
							</div>
						</div>
					</div>
					<div class="col col-12 bd-b" style="height: 196px">
						<div class="col col-4 " style="width: 30%;">
							<div class="card">
								<div class="card-header">
									<div class="card-title">
										<h4 class="more1Chart10_title"></h4>
									</div>

									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more1Chart10" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="more1Chart10" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more1Chart10" onclick="javascript: return false;"></a>
									</div>
								</div>
								<div class="card-body" id="more1Chart10"></div>
							</div>
						</div>
						<div class="col col-8 bdl-1" style="width: 70%;">
							<div class="card">
								<div class="card-header">
									<div class="card-title">
										<h4 class=" more1Chart11_title"></h4>
									</div>

									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more1Chart11" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="more1Chart11" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more1Chart11" onclick="javascript: return false;"></a>
									</div>
								</div>
								<!-- <div class="card-body" id="more1Chart11"></div> -->
							</div>
						</div>
					</div>
					<div class="col col-12 in_col v2" style="height: 190px">

							<div class="card card-ay">
								<div class="card-header right">
									<div class="card-title">
										<h4 class="tmsrChart2_title"></h4>
									</div>

									<div class="util-group">
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="tmsrChart2" onclick="javascript: return false;"></a>
									</div>
								</div>
								<div class="card-body" id="tmsrChart2"></div>
							</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</div>