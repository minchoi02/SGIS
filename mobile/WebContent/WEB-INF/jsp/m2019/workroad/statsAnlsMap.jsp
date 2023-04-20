<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>  
<!DOCTYPE html>
<html lang="ko">
<head>
<title>일자리 통계정보</title>
<meta name="title" content="일자리 통계정보">
	<style type="text/css">
	/* 통계차트 스크롤 강제 적용 */
	#statsAnalsChartMain .highcharts-container {
		touch-action: auto !important;
	}
	</style>
	<!-- 하단 리스트 Swiper -->
	<link rel="stylesheet" href="${ctx }/resources/m2019/plugins/swiper.css" />
	<script src="${ctx }/resources/m2019/plugins/swiper.min.js" type="text/javascript"></script>
	<!-- 하단 리스트 위 아래 Swipe 이벤트 -->
	<script src="${ctx }/resources/m2019/plugins/jquery.touchSwipe.min.js" type="text/javascript"></script>
	<%-- <script src="${ctx }/resources/m2019/js/jquery-1.12.0.min.js" type="text/javascript"></script> --%>
	<script src="${ctx }/resources/m2019/js/jquery.touchFlow.js" type="text/javascript"></script>
<script>
//업종
var gv_type_of_industry = "${params.type_of_industry}";
//업종 중분류
var gv_type_of_industry_middle_classification = "${params.type_of_industry_middle_classification}";

//<![CDATA[
$(document).ready(function() {
	// 통계정보 하위 스와이프
	$("#touchFlow").touchFlow({
		axis: "x",
		page: $("#touchFlow li.on").index()
	});
	
	// 연봉관련
	$(".tab").children().eq(0).children("div").css("display","inline-block");
	$(".tab li").eq(0).addClass("on1");
	$(".tab li").mouseleave(function(){
		$(this).removeClass("on");
		return false;
	});
	$(".tab li").click(function(){
		$(".tab li").removeClass("on1");
	   	$(this).addClass("on1");
	});
	$(".depth a").click(function(){
		$(".depth").children("div").hide();
		
		// 2019.10.01[한광희] 연봉 sub title 관련 수정. START
		if($('#statsAnalsSelectTypeOfIndustry').val() == 0){
			common_alert("업종을 선택하셔야 통계정보를 확인하실수 있습니다.");
			$('#statsAnalsChartMain2').hide();
			$('#statsAnalsChartMain3').hide();
			$("#statsGraopSubTitle2").attr('style', 'display: none;');
			return false;
		}
		$("#statsGraopSubTitle2").attr('style', 'display: block; font-size: 13px; text-align:right;');
		// 2019.10.01[한광희] 연봉 sub title 관련 수정. START
		
		$(this).next("div").show();
	});
	
	srvLogWrite('M0','11','01','00','',''); // 일자리 통계정보 메인
});
//]]>
</script>
<script src="${ctx }/resources/m2019/js/workroad/statsAnlsMap.js"></script>
</head>
<body>
    <div class="contentBox">
      <div class="MapArea">
      	<div class="Map">
			<div id="map"></div>
		</div> 
        <div class="statsSelect" style="position: absolute; top: 0px;" id="statsSelectDiv">
          <select id="statsAnalsSelectTypeOfIndustry">
          	<option value="0">업종 선택</option>
          	<!-- 2019.12.05[한광희] 2017년 정보 추가로 인한 수정. START -->
          	<option value="A">농업/ 임업 및 어업</option>
          	<option value="B">광업</option>
          	<option value="C">제조업</option>
          	<option value="D">전기/ 가스/ 증기 및 수도사업</option>
          	<option value="E">하수/ 폐기물처리원료재생 및 환경복원업</option>
          	<option value="F">건설업</option>
          	<option value="G">도매 및 소매업</option>
          	<option value="H">운수업</option>
          	<option value="I">숙박 및 음식점업</option>
          	<option value="J">출판/ 영상/ 방송통신 및 정보서비스업</option>
          	<option value="K">금융 및 보험업</option>
          	<option value="L">부동산업 및 임대업</option>
          	<option value="M">전문/ 과학 및 기술서비스업</option>
          	<option value="N">사업시설관리 및 사업지원서비스업</option>
          	<option value="O">공공행정/ 국방 및 사회보장행정</option>
          	<option value="P">교육서비스업</option>
          	<option value="Q">보건업 및 사회복지서비스업</option>
          	<option value="R">예술/ 스포츠 및 여가관련서비스업</option>
          	<option value="S">협회 및 단체/ 수리 및 기타개인서비스업</option>
          	<option value="U">국제 및 외국기관</option>
          	<!-- 2019.12.05[한광희] 2017년 정보 추가로 인한 수정. END -->
          </select>
        </div>
        <!-- 업종 중분류 값 START -->
        <div class="statsSelect" style="position: absolute; top: 0px;" id="statsSelectDiv2">
          <select id="statsAnalsSelectTypeOfIndustryMiddleClassification">
          	<option value="0">업종 선택</option>
          </select>
        </div>
        <!-- 업종 중분류 값 END -->
        <!-- 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 START -->
        <!-- 종사자 규모 값 START -->
        <div class="statsSelect" style="position: absolute; top: 0px;" id="statsSelectDiv3">
          <select id="statsAnalsSelectEnfsn">
          	<option value="0">규모 선택</option>
          	<option value="1">50인 미만</option>
          	<option value="2">50~300인 미만</option>
          	<option value="3">300인 이상</option>
          </select>
        </div>
        <!-- 종사자 규모 값 END -->
        <!-- 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 END -->
        <div class="nav_h_type statsMenuWrap" id="touchFlow" style="position: absolute; top: 50px; width : 100%">
          <ul>
          	<!-- 2019.12.05[한광희] 요구사항으로 인한 수정. START -->
            <!-- <li id="I3201_T1" style="display: none;"><a href="javascript:$statsAnlsMap.ui.statsAnalsMapDataCount('T1');">사업체수</a></li> -->
            <!-- <li id="I3201_T2" style="display: none;"><a href="javascript:$statsAnlsMap.ui.statsAnalsMapDataCount('T2');">종사자수</a></li> -->
            <li id="annualSalary" class="on"><a href="javascript:$statsAnlsMap.ui.statsAnalsAnnualSalary('3');">연봉</a></li>
            <!-- <li class="on" id="I3201_T1"><a href="javascript:$statsAnlsMap.ui.statsAnalsMapDataCount('T1');">사업체수</a></li>
            <li id="I3201_T2"><a href="javascript:$statsAnlsMap.ui.statsAnalsMapDataCount('T2');">종사자수</a></li>
            <li id="annualSalary"><a href="javascript:$statsAnlsMap.ui.statsAnalsAnnualSalary('3');">연봉</a></li> -->
            <!-- 2019.12.05[한광희] 요구사항으로 인한 수정. END -->
            <li id="jobTransition"><a href="javascript:$statsAnlsMap.ui.statsAnalsJobTransition();">일자리추이</a></li>
			<li id="E3503"><a href="javascript:$statsAnlsMap.ui.statsAnalsJobSatisfactionDegree('E3503');">일자리만족도</a></li>
			<!-- 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 START -->
			<li id="E3501"><a href="javascript:$statsAnlsMap.ui.statsAnalsEnfsnIncomeSttus('E3501');">소득현황</a></li>
			<!-- 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 END -->
          </ul>
        </div>
        <!-- 사업체&종사자 수 차트 영역 START -->
        <div class="statsGraphWrap" id="statsGraphWrapDiv" style="display: none;">
        	<div class="statsGraopTitle">통계그래프
           		<button class="" type="button" id="statsAnlsChartClose">닫기</button>
          	</div>
          	<!-- 2019.10.01[한광희] sub title div 추가 및 차트 style 수정. START -->
          	<div class="statsGraopSubTitle1" id="statsGraopSubTitle1"></div>
          	<div id="statsAnalsChartMain" style="position: absolute; z-index:1050; padding-top: 5px; width: 100%; overflow: auto;"></div>
          	<!-- 2019.10.01[한광희] sub title div 추가 및 차트 style 수정. END -->
        </div>
        <!-- 사업체&종사자 수 차트 영역 END -->
        <div id="statsAnlsChartDiv">
        	<button class="btn_statsGraph" type="button" id="statsAnlsChart">통계그래프</button>
        </div>
        <div class="statsGraphWrap2" id="statsGraphWrapDiv2" style="display: none;">
        	<ul class="tab">
		        <li class="depth" id="3">
		        	<a href="javascript:void(0);">연령별 평균소득</a>
	            	<div id="statsAnalsChartMain2" style="position: absolute; z-index:1050; padding-top: 30px;"></div>
	            	<!-- 2019.10.01[한광희] sub title div 추가. START -->
			    	<div class="statsGraopSubTitle1" id="statsGraopSubTitle2" style="font-size: 14px;"></div>
			    	<!-- 2019.10.01[한광희] sub title div 추가. END -->
	          	</li>
	          	<li class="depth" id="4">
	          		<a href="javascript:void(0);">연령별 중위소득</a>
	            	<div id="statsAnalsChartMain3" style="position: absolute; z-index:1050; padding-top: 30px;"></div>
	          	</li>
	    	</ul>
	    </div>
        
        <!-- 연령별 취업자수, 일자리추이, 일자리만족도 차트 영역 START -->
        <div class="statsGraphWrap2" id="statsGraphWrapDiv3" style="display: none;">
        	<!-- 2019.09.17[한광희] 일자리 통계정보 sub title 추가로 인한 수정. START -->
        	<div class="statsGraopTitle" id="statsGraopTitle">통계그래프</div>
        	<div class="statsGraopSubTitle" id="statsGraopSubTitle"></div>
        	<!-- 2019.09.17[한광희] 일자리 통계정보 sub title 추가로 인한 수정. END -->
        	<!-- 2019.10.01[한광희] 차트 style 수정. START -->
        	<div id="statsAnalsChartMain4" style="position: absolute; z-index:1050; padding-top: 10px;"></div>
        	<!-- 2019.10.01[한광희] 차트 style 수정. END -->
        </div>
        <!-- 연령별 취업자수, 일자리추이, 일자리만족도 차트 영역 END -->
        <div class="mapIndex"></div>
       </div>
       
       <!-- 2019.09.30[한광희] 지역 상세 팝업 추가 START -->
       <!-- 지역 상세 팝업 START -->
        <div class="alertBox" id="alertBox" style="display: none; top: 200px;">
        	<button class="btn_closeAl" id="statsAnlsMapAlertBoxClose" type="button">닫기</button>
        	<div class="abArea">
        		<span id="statsAnlsMapAreaTitle">서울특별시</span>
        	</div>
            <div class="abCompany">
            	<span id="statsAnlsMapAreaData">0000년 : 000()</span>
            </div>
        </div>
        <!-- 지역 상세 팝업 END -->
        <!-- 2019.09.30[한광희] 지역 상세 팝업 추가 END -->
        
        <!-- 2019.10.01[한광희] 일자리추이 설명팝업 추가. START -->
        <div class="alertBox" id="alertBox1" style="display: none; top: 190px; width: 90%; left: 5%;">
        	<button class="btn_closeAl" id="statsAnlsMapAlertBoxClose1" type="button">닫기</button>
        	<div class="abArea">
        		<span id="statsAnlsMapTootipAreaTitle">일자리추이</span>
        	</div>
            <div class="abCompany" style="margin-top: 10px; font-size: 1.1em;">
            	<table>
            		<tr>
            			<td style="width: 90px; vertical-align: top;">① (지속일자리)</td>
            			<td>전년도~당해연도에 걸쳐 동일업체 내 동일근로자에 의해 지속적으로 점유</td>
            		</tr>
            		<tr>
            			<td style="width: 90px; vertical-align: top;">② (대체일자리)</td>
            			<td>당해연도에 기업체에서 퇴직 또는 이직이 발생하여 근로자가 대체</td>
            		</tr>
            		<tr>
            			<td style="width: 90px; vertical-align: top;">③ (신규일자리)</td>
            			<td>당해연도에 기업체 생성이나 기업 내 사업 확장으로 새로 생김</td>
            		</tr>
            		<tr>
            			<td style="width: 90px; vertical-align: top; text-align: right;">기업체생성 : </td>
            			<td>법인 또는 사업체 설립 등 조직 생성에 의해 새로 생김</td>
            		</tr>
            		<tr>
            			<td style="width: 90px; vertical-align: top; text-align: right;">사업확장 : </td>
            			<td>동일 기업체 내에서 사업 확장에 의해 새로 생김</td>
            		</tr>
            		<tr>
            			<td style="width: 90px; vertical-align: top;">④ (소멸일자리)</td>
            			<td>당해 연도에 기업체 소멸이나 기업 내 사업 축소로 사라짐</td>
            		</tr>
            		<tr>
            			<td style="width: 90px; vertical-align: top; text-align: right;">기업체소멸 : </td>
            			<td>기업체(사업체) 폐업 등으로 사라짐</td>
            		</tr>
            		<tr>
            			<td style="width: 90px; vertical-align: top; text-align: right;">사업축소 : </td>
            			<td>동일 기업체 내에서 사업 축소 등으로 사라짐</td>
            		</tr>
            	</table>
            	<span id="statsAnlsMapTootipArea"></span>
            </div>
        </div>
        <!-- 2019.10.01[한광희] 일자리추이 설명팝업 추가. END -->
    </div>
</body>
</html>
