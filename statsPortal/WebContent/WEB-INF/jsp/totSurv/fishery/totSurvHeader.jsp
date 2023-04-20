<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>

<script src="/js/totSurv/populationDash.js"></script>
<script src="/js/totSurv/populationTms.js"></script>

<script src="/js/totSurv/ecnmyDash.js"></script><!-- 경제 대쉬보드 -->

<script src="/js/totSurv/houseHoldDash.js"></script>
<script src="/js/totSurv/farmDash.js"></script>
<script src="/js/totSurv/fisheryDash.js"></script>
<script src="/js/totSurv/houseDash.js"></script><!-- 주택 대쉬보드 -->
<!-- 2020-10-14 [주형식 ]임업 대쉬보드 추가 -->
<script src="/js/totSurv/forestryDash.js"></script>
<script src="/js/totSurv/fishery/totSurvMain.js"></script>

<script type="text/javascript">
	var gv_url = "${url}";
	var gv_mode = "${mode}";
	var gv_year = "${year}";
	var gv_type = "${type}";
	var gv_sido_cd = "${sido_cd}";
	var gv_sgg_cd = "${sgg_cd}";
</script>
<script src="/js/totSurv/totSurvDetail.js"></script>

<!-- 2020-10-19 [주형식 ]공통 차트 추가 -->
<script src="/js/totSurv/commonChart.js"></script>

<script src="/js/totSurv/d3.min.js"></script>
<script src="/js/totSurv/fishery/totSurvMap.js"></script>
<script src="/js/totSurv/totSurvTmsMap.js"></script>

<script src="/js/totSurv/ecnmy/ecnmyMap.js"></script>
<!-- <script src="/js/totSurv/totSurvMapApi.js"></script> 2020.10.29[한광희] 대쉬보드에서 사용 안함. 주석 처리 -->
<!-- legendInfo.js 총조사로 변경 2020.10.12 hsJu -->
<script type="text/javascript" src="/js/totSurv/legendInfo.js"></script>

<script src="/js/totSurv/populationTmsCombineMap.js"></script>

<!-- 챠트기능 -->
<script type="text/javascript" src="/js/administStats/highcharts/highcharts.js"></script>
<script type="text/javascript" src="/js/administStats/highcharts/highcharts-more.js"></script>
<script type="text/javascript" src="/js/administStats/highcharts/exporting.js"></script>
<script type="text/javascript" src="/js/administStats/highcharts/treemap.js"></script>
<script type="text/javascript" src="/js/administStats/highcharts/sunburst.js"></script>
<!-- End of 챠트기능 -->
<!-- 2020.10.20 캡쳐관련 js추가  START-->
<script src="/js/plugins/imageCapture/rgbcolor.js"></script>
<script src="/js/plugins/imageCapture/canvg.js"></script>
<script src="/js/plugins/imageCapture/html2canvas.js"></script>
<script src="/js/plugins/imageCapture/html2canvas.svg.js"></script>
<!-- 2020.10.20 캡쳐관련 js추가  END-->
<!-- 2020.10.21 PDF저장 js추가  START-->
<script type="text/javascript" src="/js/plugins/html2pdf/dist/html2pdf.bundle.js"></script>
<!-- 2020.10.21 PDF저장 js추가  END-->

<!-- 2020-10-13 [곽제욱] 헤더부분 주석처리 -->
<!-- 2020-11-20 [신예리] 주석처리 START --> <!-- <style>
.tot_wrap {height:0px !important;}
#narrow_wide_1 {height:0px !important;}
.global_nav>ul>li {display:none;}
</style> --> <!-- 2020-11-20 [신예리] 주석처리 END -->
<!-- 2020-10-13 [곽제욱] 헤더부분 주석처리 -->


<!-- header영역 -->
<!-- location START -->
<c:if test="${type != 'locgov' and  type != 'totFarmLocgov' and type != 'totPeopleLocgov'}"> <!-- 2020-11-03 [곽제욱] 인구가구주택, 농림어업임업 가르기 -->
	<div class="con_Top" style="z-index:502">
</c:if>
<c:if test="${type == 'locgov' or type == 'totFarmLocgov' or type == 'totPeopleLocgov'}"> <!-- 2020-11-03 [곽제욱] 인구가구주택, 농림어업임업 가르기 -->
	<div class="con_Top MenuHidden" style="z-index:502">
</c:if>
    	<!-- 2021.02.17[신예리] 총조사시각화지도 BI추가 및 수정 START-->
    	<div class="location Wrap" id="locationPath" style="display: flex; align-item: center;">
    	<button class="totSurvBI" type="button" onclick="location.href='/view/totSurv/populationDash'"></button>
    	<!-- 2020.11.25[신예리] location영역 div 추가 START -->
    	<div class="locationSpan">
      		<img src="/images/totSurv/marker.png" class="marker" alt="">
      		<span class="name">대한민국</span>
      	</div>
      	<!-- 2021.02.17[신예리] 총조사시각화지도 BI추가 및 수정 END-->
      	<!-- 2020.11.25[신예리] location영역 div 추가 END -->
  		</div>
  		<!-- 2020.11.13[신예리] SGIS바로 가기 버튼 주석 및 수정 START -->
  		<!-- <a class="sgisIn" href="/view/index?param=0">
  		<img src="/images/totSurv/sgis_logo_wBtn.png" alt="sgis바로가기"></a>  -->
  		<!-- <button class="sgisIn" onclick="location.href='/view/index?param=0'" title="통계지리정보서비스 SGIS 바로가기"></button> 2020.11.13[신예리] a태그에서 button으로 변경 -->
  		<!-- 2020.11.13[신예리] SGIS바로 가기 버튼 주석 및 수정 END -->
  		<div class="selectbox" style="display:none">
		  	<select id="dash_sido">
			</select>
		</div>
		<!-- 시군구 설정 -->
		<div class="selectbox" style="display:none">
			<select id="dash_sgg">
			</select>
		</div>
		<!-- 2020.10.21[신예리] 상단 pdf,프린트,공유 버튼 button으로 변경 START -->
  		<div class="TopRightBtn" style="display:block">
  			<!-- 2020.10.29[주형식] 상단 출력 버튼 주석 START -->
<!-- 	  		<button type="button" class="HpdfBtn" id="HpdfBtn" title="pdf다운로드 버튼"></button> -->
<!-- 	  		<button type="button" class="HprintBtn" title="프린트 버튼"></button>  -->
			<!-- 2020.10.29[주형식] 상단 출력 버튼 주석 END -->
			<!-- 2020.10.29[신예리] 상단 출력 버튼 추가 START -->
	  		<button type="button" class="reportPrintBtn" id="ReportBtn" value="보고서 출력" title="보고서 출력"></button>
	  		<button class="sgisTuto" onclick="showTuto()" title="사용 가이드">사용 가이드</button> <!-- 2021.03.03 박은식 튜토리얼 버튼 추가 -->
	  		<!-- 2020.10.29[신예리] 상단 출력 버튼 추가 END -->
	  		<button type="button" class="HshareBtn" title="SNS 공유"></button>
<!-- 	  		<button type="button" class="reportPrint" id="detailReportBtn" value="보고서 출력" title="보고서 출력 버튼">보고서출력</button> -->
      	</div>
      	<!-- 2020.10.21[신예리] 상단 pdf,프린트,공유 버튼 button으로 변경 END -->
	</div>
  <!-- location END -->