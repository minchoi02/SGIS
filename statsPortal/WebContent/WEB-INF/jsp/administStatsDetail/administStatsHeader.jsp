<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script src="/js/administStatsDetail/houseDash.js"></script>
<!--[조규환] 일자리행정통계, 퇴직연금, 임금근로 js 추가-->
<script src="/js/administStatsDetail/more1DashDetail.js"></script>
<script src="/js/administStatsDetail/more2DashDetail.js"></script>
<script src="/js/administStatsDetail/more3DashDetail.js"></script>
<script src="/js/administStatsDetail/mouseWheel.js"></script>

<script src="/js/administStatsDetail/d3.min.js"></script>
<script src="/js/administStatsDetail/administStatsMain.js"></script>
<script src="/js/administStatsDetail/administStatsMap.js"></script>
<script src="/js/administStatsDetail/administStatsTmsMap.js"></script>
<!-- legendInfo.js 행정통계로 변경 2020.10.12 hsJu -->
<script type="text/javascript" src="/js/administStatsDetail/legendInfo.js"></script>
<script  src="/js/administStatsDetail/highcharts/commonChart.js"></script>
<!-- 챠트기능 -->
<script type="text/javascript" src="/js/administStatsDetail/highcharts/highcharts.js"></script>
<script type="text/javascript" src="/js/administStatsDetail/highcharts/highcharts-more.js"></script>
<script type="text/javascript" src="/js/administStatsDetail/highcharts/heatmap.js"></script>
<script type="text/javascript" src="/js/administStatsDetail/highcharts/treemap.js"></script>
<script type="text/javascript" src="/js/administStatsDetail/highcharts/exporting.js"></script>
<!-- End of 챠트기능 -->

<!-- 2020.10.20 캡쳐관련 js추가  START-->
<script src="/js/administStatsDetail/highcharts/exporting.js"></script>
<script src="/js/administStatsDetail/highcharts/offline-exporting.src.js"></script>
<script src="/js/plugins/imageCapture/rgbcolor.js"></script>
<script src="/js/plugins/imageCapture/canvg.js"></script>
<script src="/js/plugins/imageCapture/html2canvas.js"></script>
<script src="/js/plugins/imageCapture/html2canvas.svg.js"></script>
<!-- 2020.10.20 캡쳐관련 js추가  END-->
<!-- 2020.10.21 PDF저장 js추가  START-->
<script type="text/javascript" src="/js/plugins/html2pdf/dist/html2pdf.bundle.js"></script>
<!-- 2020.10.21 PDF저장 js추가  END-->
<link rel="stylesheet" href="/css/administStats/common.css" />

<script type="text/javascript">
	var gv_url = "${url}";
	var gv_mode = "${mode}";
	var gv_year = "${year}";
	var gv_type = "${type}";
	var gv_sido_cd = "${sido_cd}";
	var gv_sgg_cd = "${sgg_cd}";
	var gv_checkmenu = "${checkmenu}";
	function popup(){
        var url = "/view/totSurv/researchPOP";
        var name = "resarch popup";
        var option = "width = 500, height = 500, top = 100, left = 200, location = no"
        pop = window.open(url, name, option);
    }
	
	/* var callAdministStats = function() {
		let selectedThema = $administStatsMain.ui.selectedThema;
		if(selectedThema.indexOf("신혼부부") != -1){
			location.href = "/view/administStats/newlyDash";
		}
		//20201020 박은식 주택 분기 추가 START
		else if(selectedThema.indexOf("주택소유") != -1){
			location.href = "/view/administStats/houseDash";
		}
		//20201020 박은식 주택 분기 추가 END
		else if(selectedThema.indexOf("중장년층") != -1){
			location.href = "/view/administStats/middlDash";
		}
		//20201022 박은식 귀농·귀어·귀촌, 통계더보기 분기처리 추가 START
		else if(selectedThema.indexOf("귀농어") != -1){
			location.href = "/view/administStats/retunDash";
		}
		else if(selectedThema.indexOf("통계더보기") != -1){
			location.href = "/view/administStats/more1Dash";
		} 
		else {
			location.href = "/view/administStats/newlyDash";
		}
	} */
	
	/* var callAdministStatsDetail = function() {
		let selectedThema = $administStatsMain.ui.selectedThema;
		if(selectedThema == "신혼부부"){
			location.href = "/view/administStatsDetail/bubu";
		}
		//20201020 박은식 주택 분기 추가 START
		else if(selectedThema == "주택소유"){
			location.href = "/view/administStatsDetail/jutak";
		}
		//20201020 박은식 주택 분기 추가 END
		else if(selectedThema == "중장년층"){
			location.href = "/view/administStatsDetail/jungjan";
		}
		else if(selectedThema == "귀농어"){
			location.href = "/view/administStatsDetail/kinong";
		} 
		else{
			location.href = "/view/administStats/newlyDash";
		} 
	} */
</script>


<header class="header" id="header">
    <div class="header-wrap">
    	<div class="header-left">
			<div class="header_tit">행정통계 시각화지도</div> <!-- [조규환] class / onclick 일부 수정 -->
			<ul class="header-menu">
				<li class="hm1"><a href="javascript:void(0);" onclick="javascript: $administStatsMain.ui.callAdministStats(gv_checkmenu); return false;" class="ic1"><i></i>한눈에 보는 통계</a></li>
				<li class="hm2 on"><a href="javascript:void(0);" onclick="javascript: $administStatsMain.ui.callAdministStatsDetail(); return false;" class="ic2 active" title="자세히 보는 선택됨"><i></i>자세히 보는 통계</a></li>
			</ul>
	        <div class="header-tag">
	            <label for="searchYear" class="sr_only">검색 년도 선택</label>
	            <select class="select" id="headerSearchYear" onchange="">
	            </select>
	
	            <div class="tag-group">
	                <!-- <span class="tag-item">대한민국 <button type="button" class="tag-del"></button></span> -->
	                <span class="tag-item">
						대한민국
						<span style="margin-left: 7px; margin-right: 7px;">&gt;</span>
						<span class="tag_sido">전국</span>
					</span>
	            </div>
	
	        </div>
		</div>
        

        <div class="header-right"> <!-- [조규환] header 메뉴 일부 수정 -->
            <a href="#" class="btn-icon font-family: 'NanumSquare', sans-serif;font-family: 'NanumSquare', sans-serif;font-family: 'NanumSquare', sans-seriffont-family: 'NanumSquare', sans-serifbtn-outline btn-guide btn" title="사용 가이드">사용가이드</a>
            <a href="#" class="btn-icon btn-statis btn" title="통계설명자료">통계설명자료</a>
            <a href="#" class="btn-icon btn-press btn" onClick="javascript: boardData()" title="보도자료">보도자료</a>
            <a href="#" class="btn-icon btn-img btn" title="보고서 출력" onclick="javascript: return false;">보고서 출력</a>
            <!-- <a href="#" class="btn-icon btn-img btn" title="다운로드">보고서 출력</a> -->
            <a href="#" class="btn-icon btn-share btn HshareBtn" title="공유">공유하기</a>
        </div>
    </div>
</header>

<script>
	function boardData(){
		srvLogWrite("S0","01","03","00","",""); //jrj 로그
		if (gv_checkmenu == 'bubu') openPop('http://kostat.go.kr/portal/korea/kor_nw/1/6/6/index.board');
		if (gv_checkmenu == 'jutak') openPop('http://kostat.go.kr/portal/korea/kor_nw/1/10/4/index.board');
		if (gv_checkmenu == 'jungjan') openPop('http://kostat.go.kr/portal/korea/kor_nw/1/6/8/index.board');
		if (gv_checkmenu == 'kinong') openPop('http://kostat.go.kr/portal/korea/kor_nw/1/8/11/index.board');
		if (gv_checkmenu == 'more1') openPop('http://kostat.go.kr/portal/korea/kor_nw/1/3/5/index.board'); //일자리행정통계 보도자료 소스추가[조규환]
		if (gv_checkmenu == 'more2') openPop('http://kostat.go.kr/portal/korea/kor_nw/1/6/7/index.board'); //퇴직연금 보도자료 소스추가[조규환]
		if (gv_checkmenu == 'more3') openPop('http://kostat.go.kr/portal/korea/kor_nw/1/3/5/index.board'); //임금근로 보도자료 소스추가[조규환]
	}
</script>    
<!-- 211115 퍼블리싱 수정으로 인한 기존 소스 주석처리 -->
<%-- <div class="content_top">
	<div class="top_tab">
		<a href="javascript:void(0);" onclick="callAdministStats();" class="ic1">
			<i></i>한눈에 보는 통계
		</a>
		<a href="javascript:void(0);" onclick="callAdministStatsDetail();" class="ic2 active">
			<i></i>통계 자세히 보기
		</a>
	</div>
	<div style="position: absolute;left: -20px;top: 23px;font-size: 14px;font-family: 맑은 고딕;" >
		<h1 style="font-size: 20px">
			<button style="width: 180px; background: #ED4C00; height: 35px; left: 20px; position: absolute; top: 20px; border-radius: 40px; display: inline-block; border: 1px solid #EFF3F6; color: #596070; letter-spacing: -1.8px; box-sizing: border-box; font-size: 18px; font-weight: 700; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); outline: none; text-align: center; z-index: 9; color: #FFFFFF" onclick="javascript:popup();">의견등록 바로가기</button>
		</h1>
	</div>
	<div class="top_right_link">
		<c:if test="${checkmenu == 'bubu'}">
		<a onclick="javascript:openPop('http://kostat.go.kr/portal/korea/kor_nw/1/6/6/index.board');">
			<span class="ir_wa">보도자료 보기</span>
		</a>
		</c:if>
		<c:if test="${checkmenu == 'jutak'}">
		<a onclick="javascript:openPop('http://kostat.go.kr/portal/korea/kor_nw/1/10/4/index.board');">
			<span class="ir_wa">보도자료 보기</span>
		</a>
		</c:if>
		<c:if test="${checkmenu == 'jungjan'}">
		<a onclick="javascript:openPop('http://kostat.go.kr/portal/korea/kor_nw/1/6/8/index.board');">
			<span class="ir_wa">보도자료 보기</span>
		</a>
		</c:if>
		<a href="#" onclick="javascript: return false;" id="administStatsDownloadChartImage">
			<span class="ir_wa">보도자료 보기</span>
		</a>
		
	</div>	
	<div class="city_select" style="width:180px">
		<em class="city_select_total">대한민국</em>
		<em style="background: none;" class="city_select_sido"> 전체</em>
		<!-- em style="background: none;" class="city_select_sgg"> 전체</em -->
	</div>
	<div class="top_control">
		<button type="button" class="btn btn-1" title="새로고침" id="top_control_reload"></button>
		<button type="button" class="btn btn-2" title="즐겨찾기" id="top_control_regfind"></button>
		<button type="button" class="btn btn-3" title="공유" id="top_control_share"></button>
		<button type="button" class="btn btn-4" title="데이터보드" id="top_control_chart"></button>
	</div>
</div> --%>