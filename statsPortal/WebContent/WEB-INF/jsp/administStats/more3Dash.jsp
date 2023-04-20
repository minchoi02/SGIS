
<%
	/**************************************************************************************************************************
	* Program Name	: 행정통계시각화 > 통계더보기 > 임금근로
	* File Name		: more3Dash.jsp
	* Comment		:
	* History		:
	**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<!--  레이아웃 변경으로 인한 스타일 추가 및 구조 변경 기존소스 하단 none 배천규  20221214  -->
<link rel="stylesheet" href="/css/administStats/renew/moreNewDash3.css">
<script>
//커스텀차트 이미지 다운로드
function scShotChart(chartId){
	$(".contentbox-typeB .selection .rcon_box .rcon_tit span:last-child").css("display","none");
	$(".contentbox-typeC .rcon_tit span:last-child").css("display","none");
	srvLogWrite("S0","01","06","00","","thema="+( $administStatsMain.ui.selectedThema ? $administStatsMain.ui.selectedThema.trim() : "" )); //jrj 로그
	
	html2canvas(document.querySelector("#"+chartId+"box")).then(function(canvas){
		var chartNm = ['일자리 규모 및 증감','일자리 형태별 분포','산업대분류별 증감', '제조업 중분류별 증감', '서비스업 중분류별 증감', '성별 임금근로 일자리', '연령대별 임금근로일자리','조직형태별 임금근로일자리'];
		var selectYear = $("#searchYear").val();
		
		if(chartId=='more3Chart1'){ chartNm = chartNm[0]; }
		else if(chartId=='more3Chart2'){ chartNm = chartNm[1]; }
		else if(chartId=='more3Chart3'){ chartNm = chartNm[2]; }
		else if(chartId=='more3Chart4'){ chartNm = chartNm[3]; }
		else if(chartId=='more3Chart5'){ chartNm = chartNm[4]; }
		else if(chartId=='more3Chart6'){ chartNm = chartNm[5]; }
		else if(chartId=='more3Chart8'){ chartNm = chartNm[6]; }
		else if(chartId=='more3Chart7'){ chartNm = chartNm[7]; }
		
		if(canvas.msToBlob) { //for IE 10, 11
			var blob = canvas.msToBlob();
			window.navigator.msSaveBlob(blob, selectYear.substring(2, 4) + "년 "+ selectYear.substring(5, 6) + "분기 "+ chartNm+".png");
		}else {			
			saveAs(canvas.toDataURL("image/png"), selectYear.substring(2, 4) + "년 "+ selectYear.substring(5, 6) + "분기 "+ chartNm+".png");
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
	$(".contentbox-typeB .selection .rcon_box .rcon_tit span:last-child").css("display","flex");
	$(".contentbox-typeC .rcon_tit span:last-child").css("display","flex");
}
</script>
<div id="wrapperMore">
	<div class="container">
		<div class="contentbox-typeB">
			<!-- <div class="panel-titles bg-type-1">
				<b>전체 임금근로 일자리</b>
			</div> -->
			<div class="left-col">
				<div class="title" id="cardSetYear">`21년 1/4분기</div>
				<div class="titleImg"><img src="/img/new/more3TitleImg.png" /></div>
				<div class="leftBody">
					<div>
						<div class="title">전체임금근로일자리</div>
						<div class="total1" id="cardSetTotal">1,996.5<span>만개</span></div>
					</div>
					<div class="border1dotted2"></div>
					<div>
						<div class="title">전년동기대비</div>
						<div class="total2" id="cardSetTotal2">37.6<span>만개 증가</span></div>
					</div>
				</div>
			</div>
			<div class="right-col borderGreen">
				<div class="title">전체 임금근로 일자리</div>
				<div class="selection top flex-height-260">
					<div class="rcon_box flex-width-710" id="more3Chart1box">
						<div class="rcon_tit">
							<span><b>일자리 규모 및 증감</b></span>
							<span class="titleDownHideShow">
								<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more3Chart1" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_question.png" alt=""></a>
								<a href="#" class="btn-util-2" target="_blank" data-chart-id="more3Chart1" onclick="javascript: return false;">통계표보기</a>
								<!-- <a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more3Chart1" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_down.png" alt=""></a> -->
								<a href="#" class="" onclick="scShotChart('more3Chart1');"><img src="/images/administStats/more1/btncon_down.png" alt=""></a>
							</span>
						</div>
						<div class="chartbox">
							<div id="more3Chart1" style="width:690px; height:240px;"></div>
						</div>						
					</div>
					<div class="border1dotted"></div>
					<div class="rcon_box flex-width-720" id="more3Chart2box">
						<div class="rcon_tit">
							<span><b>일자리 형태별 분포</b></span>
							<span class="titleDownHideShow">
								<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more3Chart2" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_question.png" alt=""></a>
								<a href="#" class="btn-util-2" target="_blank" data-chart-id="more3Chart2" onclick="javascript: return false;">통계표보기</a>
								<!-- <a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more3Chart2" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_down.png" alt=""></a> -->
								<a href="#" class="" onclick="scShotChart('more3Chart2');"><img src="/images/administStats/more1/btncon_down.png" alt=""></a>
							</span>
						</div>
						<div class="chartbox">
							<div id="more3Chart2" style="width:710px; height:240px;"></div>
						</div>						
					</div>
				</div>
			</div>
		</div>
		
		<div class="contentbox-typeC flex-height-300 mgt10">
			<div class="left-col">
				<div class="title">산업별 임금근로일자리 증감</div>
				<div class="rcon_box flex-width-980" id="more3Chart3box">
					<div class="rcon_tit">
						<span><b>산업대분류별 증감</b><font style="font-size:12px;"> (전년동기대비, 단위: 만개)</font></span>
						<span class="titleDownHideShow">
							<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more3Chart3" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_question.png" alt=""></a>
							<a href="#" class="btn-util-2" target="_blank" data-chart-id="more3Chart3" onclick="javascript: return false;">통계표보기</a>
							<!-- <a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more3Chart3" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_down.png" alt=""></a> -->
							<a href="#" class="" onclick="scShotChart('more3Chart3');"><img src="/images/administStats/more1/btncon_down.png" alt=""></a>
						</span>
					</div>
					<div class="chartbox">
						<div id="more3Chart3" style="width:960px; height:250px;"></div>
					</div>						
				</div>
				<div class="border1dotted"></div>
				<div class="rcon_box flex-width-360" id="more3Chart4box">
					<div class="rcon_tit">
						<span><b>제조업 중분류별 증감</b></span>
						<span class="titleDownHideShow">
							<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more3Chart4" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_question.png" alt=""></a>
							<a href="#" class="btn-util-2" target="_blank" data-chart-id="more3Chart4" onclick="javascript: return false;">통계표보기</a>
							<!-- <a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more3Chart4" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_down.png" alt=""></a> -->
							<a href="#" class="" onclick="scShotChart('more3Chart4');"><img src="/images/administStats/more1/btncon_down.png" alt=""></a>
						</span>
					</div>
					<div class="chartbox">
						<div id="more3Chart4" style="width:330px; height:250px;"></div>
					</div>						
				</div>
				<div class="border1dotted"></div>
				<div class="rcon_box flex-width-360" id="more3Chart5box">
					<div class="rcon_tit">
						<span><b>서비스업 중분류별 증감</b></span>
						<span class="titleDownHideShow">
							<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more3Chart5" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_question.png" alt=""></a>
							<a href="#" class="btn-util-2" target="_blank" data-chart-id="more3Chart5" onclick="javascript: return false;">통계표보기</a>
							<!-- <a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more3Chart5" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_down.png" alt=""></a> -->
							<a href="#" class="" onclick="scShotChart('more3Chart5');"><img src="/images/administStats/more1/btncon_down.png" alt=""></a>
						</span>
					</div>
					<div class="chartbox">
						<div id="more3Chart5" style="width:330px; height:250px;"></div>
					</div>						
				</div>
			</div>
			
		</div>
		<div class="contentbox-typeC flex-height-260 mgt10 ">
			<div class="left-col bcBlue">
				<div class="title">특성별 임금근로 일자리</div>
				<div class="rcon_box flex-width-550" id="more3Chart6box">
					<div class="rcon_tit">
						<span><b>성별</b></span>
						<span class="titleDownHideShow">
							<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more3Chart6" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_question.png" alt=""></a>
							<a href="#" class="btn-util-2" target="_blank" data-chart-id="more3Chart6" onclick="javascript: return false;">통계표보기</a>
							<!-- <a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more3Chart6" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_down.png" alt=""></a> -->
							<a href="#" class="" onclick="scShotChart('more3Chart6');"><img src="/images/administStats/more1/btncon_down.png" alt=""></a>
						</span>
					</div>
					<div class="chartbox">
						<div id="more3Chart6" style="width:510px; height:220px;"></div>
					</div>						
				</div>
				<div class="border1dotted"></div>
				<div class="rcon_box flex-width-550" id="more3Chart8box">
					<div class="rcon_tit">
						<span><b>연령대별</b></span>
						<span class="titleDownHideShow">
							<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more3Chart8" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_question.png" alt=""></a>
							<a href="#" class="btn-util-2" target="_blank" data-chart-id="more3Chart8" onclick="javascript: return false;">통계표보기</a>
							<!-- <a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more3Chart8" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_down.png" alt=""></a> -->
							<a href="#" class="" onclick="scShotChart('more3Chart8');"><img src="/images/administStats/more1/btncon_down.png" alt=""></a>
						</span>
					</div>
					<div class="chartbox">
						<div id="more3Chart8" style="width:510px; height:220px;"></div>
					</div>						
				</div>
				<div class="border1dotted"></div>
				<div class="rcon_box flex-width-550" id="more3Chart7box">
					<div class="rcon_tit">
						<span><b>조직형태별</b></span>
						<span class="titleDownHideShow">
							<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more3Chart7" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_question.png" alt=""></a>
							<a href="#" class="btn-util-2" target="_blank" data-chart-id="more3Chart7" onclick="javascript: return false;">통계표보기</a>
							<!-- <a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more3Chart7" onclick="javascript: return false;"><img src="/images/administStats/more1/btncon_down.png" alt=""></a> -->
							<a href="#" class="" onclick="scShotChart('more3Chart7');"><img src="/images/administStats/more1/btncon_down.png" alt=""></a>
						</span>
					</div>
					<div class="chartbox">
						<div id="more3Chart7" style="width:510px; height:220px;"></div>
					</div>						
				</div>
			</div>
			
		</div>
	</div>
</div>
<!-- // row -->
<!-- <div class="panel-body">
				<div class="row">
					<div class="col col-12 bd-b" style="height: 275px">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="icon-1 more3Chart1_title"></h4>
								</div>

								<div class="util-group">
									<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more3Chart1" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="more3Chart1" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more3Chart1" onclick="javascript: return false;"></a>
								</div>
							</div>
							<div class="card-body" id="more3Chart1"></div>
						</div>
					</div>
					<div class="col col-12" style="height: 275px">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="icon-1 more3Chart2_title"></h4>
								</div>
								<div class="util-group">
									<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more3Chart2" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="more3Chart2" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more3Chart2" onclick="javascript: return false;"></a>
								</div>
							</div>
							<div class="card-body" id="more3Chart2"></div>
						</div>
					</div>
				</div>
			</div>

	<div class="col col-6">
		<div class="panel panel-hori panel-vertical">
			<div class="panel-titles bg-type-2">
				<b>산업별 임금근로 일자리 증감</b>
			</div>
			<div class="panel-body border-color-2">
				<div class="row" style="height: 275px">
					<div class="col col-12 bd-b">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="icon-2 more3Chart3_title"></h4>
								</div>

								<div class="util-group">
									<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more3Chart3" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="more3Chart3" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more3Chart3" onclick="javascript: return false;"></a>
								</div>
							</div>
							<div class="card-body" id="more3Chart3"></div>
						</div>
					</div>
					<div class="col col-12" style="height: 275px">
						<div class="col col-6">
							<div class="card">
								<div class="card-header">
									<div class="card-title">
										<h4 class="icon-2 more3Chart4_title"></h4>
									</div>

									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more3Chart4" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="more3Chart4" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more3Chart4" onclick="javascript: return false;"></a>
									</div>
								</div>
								<div class="card-body" id="more3Chart4"></div>
							</div>
						</div>
						<div class="col col-6 bdl-1">
							<div class="card">
								<div class="card-header">
									<div class="card-title">
										<h4 class="icon-2 more3Chart5_title"></h4>
									</div>

									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more3Chart5" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="more3Chart5" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more3Chart5" onclick="javascript: return false;"></a>
									</div>
								</div>
								<div class="card-body" id="more3Chart5"></div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
<div class="row">
	<div class="col col-12">
		<div class="panel panel-hori panel-vertical">
			<div class="panel-titles bg-type-3">
				<b>근로자 및 기업 특성별 임금근로 일자리</b>
			</div>
			<div class="panel-body border-color-3">
				<div class="row" style="height: 200px">
					<div class="col col-4">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="icon-3 more3Chart6_title"></h4>
								</div>

								<div class="util-group">
									<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more3Chart6" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="more3Chart6" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more3Chart6" onclick="javascript: return false;"></a>
								</div>
							</div>
							<div class="card-body" id="more3Chart6"></div>
						</div>
					</div>
					<div class="col col-4 bdl-1">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="icon-3 more3Chart7_title"></h4>
								</div>

								<div class="util-group">
									<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more3Chart7" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="more3Chart7" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more3Chart7" onclick="javascript: return false;"></a>
								</div>
							</div>
							<div class="card-body" id="more3Chart7"></div>
						</div>
					</div>
					<div class="col col-4 bdl-1">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="icon-3 more3Chart8_title"></h4>
								</div>

								<div class="util-group">
									<a href="#" class="btn-util-1" title="지표설명" data-chart-id="more3Chart8" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="more3Chart8" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="more3Chart8" onclick="javascript: return false;"></a>
								</div>
							</div>
							<div class="card-body" id="more3Chart8"></div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</div> -->