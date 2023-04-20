<%
/**************************************************************************************************************************
* Program Name	: 총조사시각화 Main
* File Name		: totSurvMain.jsp
* Comment		:
* History		:
*	2020.08.03	곽제욱	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<script src="/js/plugins/jquery.min.js"></script>
<script src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>
<link rel="stylesheet" href="/css/totSurv/style.css" />
<link rel="stylesheet" href="/css/totSurv/common.css" />
<link rel="stylesheet" href="/css/totSurv/map.css" /> <!--  2020-12-11 [곽제욱] 맵 css 적용 --> <!-- 20210225 박은식 경로 수정 -->

<!-- 소주제 툴팁 -->
<style type="text/css">
li .tooltip {
  display: none;
  animation: tooltipAni 1s;
  transition: opacity 0.5s;
  position: absolute;
  top: 5px;
  left: 5px;
  background: #fff;
}

li:hover .tooltip {
  display: block;
}

/*20201012 박은식 IE에서 input range 이동 시 생기는  tooltip 제거 START*/
input[type=range]::-ms-tooltip {
    display: none;
}
/*20201012 박은식 IE에서 input range 이동 시 생기는  tooltip 제거 END*/
</style>


<!-- 2020-10-19 [주형식] 차트변경 팝업화면 추가 START -->
<style>
    #chart_modal {
        display: none;
        background-color: #454d5a;
        border: 1px solid #888;
        border-radius: 5px;
    }

    #chart_modal .modal_close_btn {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    /*20210226 박은식 튜토리얼 css추가 START*/
    .tutoClose {
	    left: 1070px;
	    position: absolute;
	    bottom: 35px;
	    color: #FFFFFF;
	    background: rgb(0,0,0,0);
	    font-size: 20px;
	    border: 1px solid black;
	    font-weight: bold;
	    border-radius: 8px;
    }
    
    .tutoText {
    	position: absolute;
	    bottom: 40px;
	    left: 1110px;
	    font-size: 16px;
	    color: #FFFFFF;
	    font-weight: bold;
    }
    /*20210226 박은식 튜토리얼 css추가 END*/
</style>
<!-- 2020-10-19 [주형식] 차트변경 팝업화면 추가 END -->


<!-- SNS 공유 (카카오스토리) -->
<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>

<!-- SNS 공유 자료 클릭시 모바일 첫 페이지로 링크됨 -->
<!-- <meta property="og:url" content="/view/totSurv/populationDash"> -->
<meta property="og:url" content="/view/totSurv">
<!-- <meta property="og:image" content="/view/totSurv/populationDash"> -->
<meta property="og:image" content="/view/totSurv/totSurvImage" />
<meta property="og:description" content="총조사시각화" />
<meta property="og:title" content="[총조사시각화]개인 관심주제에 맞는 공간통계정보를 제공합니다." />
<meta property="og:type" content="article">
<!-- <meta property="og:article:author" content="총조사시각화"> -->
<!-- <meta property="og:article:author:url" content="/view/totSurv/populationDash"> -->


<!-- 2020-10-13 START -->
<c:if test="${type=='locgov'}">
<style>
.container{top: 45px;}
.commonTotSurvBack_modal {top:0;}
.commonTotSurvPopupWrap {top:calc(50% - 120px) !important;}
</style>
</c:if>
<!-- 2020-10-13 END -->
<script>
$(document).ready(function() {
	$("#commonTotSurv_popup_confirm_close").click(function() {
		$("#commonTotSurv_popup_back").hide();
		$("#commonTotSurv_popup_confirm").hide();
	});
	$("#commonTotSurv_popup_alert_close").click(function() {
		$("#commonTotSurv_popup_back").hide();
		$("#commonTotSurv_popup_alert").hide();
	});
	$("#lifeEnvironment_close").click(function() {
		$("#commonTotSurv_popup_back").hide();
		$("#lifeEnvironment").hide();
	});
	$("#commonTotSurv_popup_area_detail_close").click(function() {
		$("#commonTotSurv_popup_back").hide();
		$("#common_popup_area_click").hide();
	});
});
</script>

<!-- SGIS 공통 JS -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop.css" />
	<script src="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop-src.sync.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.sha256.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/durian-v2.0.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/sop.portal.absAPI.js"></script>
	<script src="${pageContext.request.contextPath}/js/totSurv/farm/map.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/common.js"></script>
	<script src="${pageContext.request.contextPath}/js/totSurv/legendInfo.js"></script>
	<script src="/js/plugins/jquery.wheelcolorpicker.js"></script>
	<script src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/wheelcolorpicker.css"/>
    <script src="${pageContext.request.contextPath}/js/plugins/jquery.wheelcolorpicker.js"></script>

<title>[총조사시각화]총조사 시각화 메인화면입니다.</title>
</head>
<body>
<div class="skip">
<a href="#sideMenuArea">본문바로가기</a>
</div>

<!-- 2020.10.14[한광희] 상단 메뉴 추가 START -->
<!-- 2020.10.20 [곽제욱] 상단 메뉴 주석처리 START -->
<!--
<div class="tot_wrap" style="background-color:#363A46; height:28px; width:100%; z-index:501">
	<div id="narrow_wide_1" class="top_box narrow" style="width:1100px;">
		<div class="global_nav">
			<ul>
				<li><a href="/view/totSurv/totSurvMain" class="tm_totSurv" style="z-index:20; width: 120px; box-shadow: 2px -2px 3px rgba(0,0,0,0.2);"></a></li>
				<li><a href="/view/index?param=0" class="tm_sgis" style="background-color:#868b9a; left:110px; z-index:10; width: 145px; box-shadow: 3px -1px 3px rgba(0,0,0,0.2)"></a></li>
				<li><a href="/view/statsMe/statsMeMain" class="tm_my" style="background-color: #868b9a; z-index:0; left: 245px; width: 150px;"></a></li>
			</ul>
		</div>
	</div>
</div>
 -->
<!-- 2020.10.20 [곽제욱] 상단 메뉴 주석처리 END -->
<!-- 2020.10.14[한광희] 상단 메뉴 추가 END -->
<!-- header START -->
  <div class="Topheader" style="display: none;">
    <h1 class="Wrap">총조사 시각화 서비스</h1>
  </div>
  <!-- header END-->
<!-- 좌측메뉴 -->
<jsp:include page="/view/totSurv/totSurvLeft"></jsp:include>
<!-- 헤더 -->
<jsp:include page="/view/totSurv/farm/totSurvHeader"></jsp:include>

<!-- 2021.02.24[신예리] 튜토리얼 화면 START -->
<div class="populationDashTuto none">
	<button type="button" class="TutoCloseBtn" onclick="hideTuto()">닫기</button>
</div>

<!-- 2021.08.04[이영호] 경총 추가 -->
<div class="ecnmyDashTuto none">
	<button type="button" class="TutoCloseBtn" onclick="hideTuto()">닫기</button>
</div>

<div class="houseDashTuto none">
	<button type="button" class="TutoCloseBtn" onclick="hideTuto()">닫기</button>
</div>

<div class="houseHoldDashTuto none">
	<button type="button" class="TutoCloseBtn" onclick="hideTuto()">닫기</button>
</div>

<div class="farmDashTuto none">
	<button type="button" class="TutoCloseBtn" onclick="hideTuto()">닫기</button>
</div>

<div class="forestryDashTuto none">
	<button type="button" class="TutoCloseBtn" onclick="hideTuto()">닫기</button>
</div>

<div class="fisheryDashTuto none">
	<button type="button" class="TutoCloseBtn" onclick="hideTuto()">닫기</button>
</div>

<div class="populationTmsTuto none">
	<button type="button" class="TutoCloseBtn" onclick="hideTuto()">닫기</button>
</div>

<div class="totSurvDetailTuto none">
	<button type="button" class="TutoCloseBtn" onclick="hideTuto()">닫기</button>
</div>

<!-- 2021.02.24[신예리] 튜토리얼 화면 END -->

<!-- 상세메뉴 sideNav -->
<!-- 2020.10.27[신예리] side 영역 Toggle Btn START -->
		<button type="button" class="sideMenuToggleBtn" id="detail_sub" style="display:none;" title="상세페이지 메뉴 토글"></button>
<!-- 2020.10.27[신예리] side 영역 Toggle Btn END -->
<div class="sideMenuArea" id="sideMenuArea" style="display: none;">
	<div class="sideMenuArea-Con">
	<!-- 2020.10.19[신예리] 상세페이지 레이아웃 변경 START -->
		<div class="sideColWrapSearch">
		<div class="sideSubtit"><h4>총조사 통계표를 조회합니다.</h4></div>
		<div class="sideCol-row" style="background-color: #596071; justify-content: center;"> <!-- 2020.10.19[신예리] 가운데 정렬 속성 추가 -->
			<div class="selectboxWrap">
      			<!-- 년도 설정 -->
				<div class="selectbox" >
  					<select id="selYear">
  					</select>
				</div>
				<!-- 시도 설정 -->
				<div class="selectbox">
				  	<select id="detail_sido">
					</select>
				</div>
				<!-- 시군구 설정 -->
    			<div class="selectbox">
      				<select id="detail_sgg">
      				</select>
    			</div>
	    	</div>
  		 </div>
  			<div class="sideCol-column">
    			<p class="col-Interesttit">관심주제 여러개를 설정하여 조회할 수 있습니다.</p>
    			<ul class="InterestBtnWrap">
      				<li class="STHEMA_foreigner" title="외국인"><span title="외국인">외국인</span></li>
				    <li class="STHEMA_crop" title="작물"><span title="작물">작물</span></li>
				    <li class="STHEMA_multiculture" title="다문화가구"><span title="다문화가구">${fn:substring("다문화가구",0,4)}.. </span></li>
				    <li class="STHEMA_singleHousehold" title="1인가구"><span title="1인가구">1인가구</span></li>
				    <li class="STHEMA_freshwater" title="내수면어업"><span title="내수면어업">${fn:substring("내수면어업",0,4)}..</span></li>
				    <li class="STHEMA_animals" title="가축"><span title="가축">가축</span></li>
				</ul>
				<ul class="InterestBtnWrap">	<!-- 2020.10.22[한광희] 상세페이지 수정 -->
      				<li class="STHEMA_singleHouseholdSample" title="1인가구(20%표본)"><span title="1인가구(20%표본)">${fn:substring("1인가구(20%표본)",0,4)}..</span></li>
				    <li class="STHEMA_careerBreak" title="경력단절(20%표본)"><span title="경력단절(20%표본)">${fn:substring("경력단절(20%표본))",0,4)}..</span></li>
				    <li class="STHEMA_economy" title="경제활동(20%표본)"><span title="경제활동(20%표본)">${fn:substring("경제활동(20%표본)",0,4)}..</span></li>
				    <li class="STHEMA_senior" title="고령자(20%표본)"><span title="고령자(20%표본)">${fn:substring("고령자(20%표본)",0,4)}..</span></li>
				    <li class="STHEMA_domestic" title="국내인구이동통계"><span title="국내인구이동통계">${fn:substring("국내인구이동통계",0,4)}..</span></li>
				    <li class="STHEMA_domesticSample" title="국내인구이동통계(20%표본)"><span title="국내인구이동통계(20%표본)">${fn:substring("국내인구이동통계(20%표본)",0,4)}..</span></li>
				</ul>
				<ul class="InterestBtnWrap" id="subIcon3" style="display: none;">
      				<li class="STHEMA_farmhouse" title="농가"><span title="농가">농가</span></li>
				    <li class="STHEMA_farmhousePopulation" title="농가인구"><span title="농가인구">농가인구</span></li>
				    <li class="STHEMA_farm" title="농업"><span title="농업">농업</span></li>
				    <li class="STHEMA_farmHousehold" title="농업종사가구원"><span title="농업종사가구원">${fn:substring("농업종사가구원",0,4)}..</span></li>
				    <li class="STHEMA_singleParent" title="미혼모, 미혼부"><span title="미혼모, 미혼부">${fn:substring("미혼모, 미혼부",0,4)}..</span></li>
				    <li class="STHEMA_social" title="사회활동(20%표본)"><span title="사회활동(20%표본)">${fn:substring("사회활동(20%표본)",0,4)}..</span></li>
				</ul>
				<ul class="InterestBtnWrap" id="subIcon4" style="display: none;">
      				<li class="STHEMA_job" title="산업·직업(20%표본)"><span title="산업·직업(20%표본)">${fn:substring("산업·직업(20%표본)",0,4)}..</span></li>
				    <li class="STHEMA_fishHousehold" title="어가"><span title="어가">어가</span></li>
				    <li class="STHEMA_fishHPopulation" title="어가인구"><span title="어가인구">어가인구</span></li>
				    <li class="STHEMA_fishingShip" title="어선"><span title="어선">어선</span></li>
				    <li class="STHEMA_fishingSHousehold" title="어업종사가구원"><span title="어업종사가구원">${fn:substring("어업종사가구원",0,4)}..</span></li>
				    <li class="STHEMA_female" title="여성·아동(20%표본)"><span title="여성·아동(20%표본)">${fn:substring("여성·아동(20%표본)",0,4)}..</span></li>
				</ul>
				<ul class="InterestBtnWrap" id="subIcon5" style="display: none;">
      				<li class="STHEMA_babyHouseHold" title="영유아 자녀양육 가구"><span title="영유아 자녀양육 가구">${fn:substring("영유아 자녀양육 가구",0,4)}..</span></li>
				    <li class="STHEMA_foreignerSample" title="외국인(20%표본)"><span title="외국인(20%표본)">${fn:substring("외국인(20%표본)",0,4)}..</span></li>
				    <li class="STHEMA_loggingHousehold" title="육림업,벌목업,양묘업,채취업 임가"><span title="육림업,벌목업,양묘업,채취업 임가">${fn:substring("육림업,벌목업,양묘업,채취업 임가",0,4)}..</span></li>
				    <li class="STHEMA_loggingHPopulation" title="육림업,벌목업,양묘업,채취업 종사 가구원"><span title="육림업,벌목업,양묘업,채취업 종사 가구원">${fn:substring("육림업,벌목업,양묘업,채취업 종사 가구원",0,4)}..</span></li>
				    <li class="STHEMA_loggingHousehold" title="육림업,벌목업,양묘업,채취업임가"><span title="육림업,벌목업,양묘업,채취업임가">(중)${fn:substring("육림업,벌목업,양묘업,채취업임가",0,4)}..</span></li>
				    <li class="STHEMA_loggingPopulation" title="임가인구"><span title="임가인구">임가인구</span></li>
				</ul>
				<ul class="InterestBtnWrap" id="subIcon6" style="display: none;">
      				<li class="STHEMA_Population" title="인구밀도"><span title="인구밀도">인구밀도</span></li>
				    <li class="STHEMA_rentSample" title="임차료(20%표본)"><span title="임차료(20%표본)">${fn:substring("임차료(20%표본)구",0,4)}..</span></li>
				    <li class="STHEMA_childHosuehold" title="자녀수별 가구"><span title="자녀수별 가구">${fn:substring("자녀수별 가구",0,4)}..</span></li>
				    <li class="STHEMA_forestProduct" title="재배임산물"><span title="재배임산물">${fn:substring("재배임산물",0,4)}..</span></li>
				    <li class="STHEMA_table" title="전수기본표"><span title="전수기본표">${fn:substring("전수기본표",0,4)}..</span></li>
      				<li class="STHEMA_totalLogging" title="전체임가"><span title="전체임가">전체임가</span></li>
				</ul>
				<ul class="InterestBtnWrap" id="subIcon7" style="display: none;">
				    <li class="STHEMA_Residence" title="주거실태(20%표본)"><span title="주거실태(20%표본)">${fn:substring("주거실태(20%표본)",0,4)}..</span></li>
				    <li class="STHEMA_ResidenceTotal" title="주택총조사 총괄(1975년~2010년)"><span title="주택총조사 총괄(1975년~2010년)">${fn:substring("주택총조사 총괄(1975년~2010년)",0,4)}..</span></li>
				    <li class="STHEMA_totalSearchH" title="총조사가구 총괄(1980년~2010년)"><span title="총조사가구 총괄(1980년~2010년)">${fn:substring("총조사가구 총괄(1980년~2010년)",0,4)}..</span></li>
				    <li class="STHEMA_totalSearchP" title="총조사인구 총괄(1925년~2010년)"><span title="총조사인구 총괄(1925년~2010년)">${fn:substring("총조사인구 총괄(1925년~2010년)",0,4)}..</span></li>
				    <li class="STHEMA_totalSearchR" title="전수부문(등록센서스,2015년 이후)"><span title="전수부문(등록센서스,2015년 이후)">${fn:substring("전수부문(등록센서스,2015년 이후)",0,4)}..</span></li>
      				<li class="STHEMA_birthTime" title="출산시기(20%표본)"><span title="출산시기(20%표본)">${fn:substring("출산시기(20%표본)",0,4)}..</span></li>
				</ul>
				<ul class="InterestBtnWrap" id="subIcon8" style="display: none;">
				    <li class="STHEMA_ResidenceTotal" title="통근통학(20%표본)"><span title="통근통학(20%표본)">${fn:substring("통근통학(20%표본)",0,4)}..</span></li>
				    <li class="STHEMA_sampleTable" title="표본기본표"><span title="표본기본표">${fn:substring("표본기본표",0,4)}..</span></li>
				    <li class="STHEMA_singlePH" title="한부모가구"><span title="한부모가구">${fn:substring("한부모가구",0,4)}..</span></li>
				    <li class="STHEMA_seaLevel" title="해수면어업"><span title="해수면어업">${fn:substring("해수면어업",0,4)}..</span></li>
				    <li class="STHEMA_constraint" title="활동제약(20%표본)"><span title="활동제약(20%표본)">${fn:substring("활동제약(20%표본)",0,4)}..</span></li>
				    <li class="STHEMA_sample2015" title="표본(20%)부문 (2015년)"><span title="표본(20%)부문 (2015년)">${fn:substring("표본(20%)부문 (2015년)",0,4)}..</span></li>
				</ul>
    			<button type="button" class="listMore" id="subThemaMore">더보기</button>
    			<button type="button" class="listHide" id="subThemaHide" style="display: none;">숨기기</button>
  			</div>
		</div>

		<div class="sideColWrap mt10">
  			<div class="sideCol-row" style="padding: 0 5px 0 12px;">
    			<h2 class="resultInfo">총 <b id="resultCount"></b>건의 총조사 결과가 조회되었습니다.</h2>
    			<button type="button" class="sync" id="dtailInitBtn"></button>
  			</div>
		</div>

		<div class="sideColTableWrap">
		<div class="sideColWrap" style="border: 0;display: flex; flex-direction: column;">
			<div class="sideCol-columnTit">
  				<table class="sideTable" id="totSurvDataListHeader">
    				<colgroup>
						<%-- <col style="width:8%;"> --%>
						<!-- 2020.10.22[신예리] width 변경 -->
						<col style="width:12%;">
						<col style="width:11%;">
						<col style="width:40%;">
						<col style="width:13%;">
						<col style="width:12%;">
						<col style="width:12%;">
					</colgroup>
					<thead>
	  					<tr>
						    <!-- <th>선택</th> -->
						    <th class="detailListHeader" data-id="bigThema" data-type="ASC" style="cursor: pointer;">대주제<span><img src="/images/totSurv/listicon_th01.png" alt="대주제" /></span></th> <!-- 2020.11.20[신예리] 웹접근성으로 인한 alt값 추가 -->
						    <th class="detailListHeader" data-id="subThema" data-type="ASC" style="cursor: pointer;">소주제<span><img src="/images/totSurv/listicon_th01.png" alt="소주제" /></span></th> <!-- 2020.11.20[신예리] 웹접근성으로 인한 alt값 추가 -->
						    <th class="detailListHeader" data-id="survNm" data-type="DESC" style="cursor: pointer;">통계명<span><img src="/images/totSurv/listicon_th00.png" alt="통계명" /></span></th> <!-- 2020.11.20[신예리] 웹접근성으로 인한 alt값 추가 -->
						    <th class="detailListHeader" data-id="endYear" data-type="DESC" style="cursor: pointer;">최근년도<span><img src="/images/totSurv/listicon_th00.png" alt="최근년도" /></span></th> <!-- 2020.11.20[신예리] 웹접근성으로 인한 alt값 추가 -->
						    <th class="detailListHeader" data-id="tmsProvdCnt" data-type="ASC" style="cursor: pointer;">시계열<span><img src="/images/totSurv/listicon_th01.png" alt="시계열" /></span></th> <!-- 2020.11.20[신예리] 웹접근성으로 인한 alt값 추가 -->
						    <th class="detailListHeader" data-id="tmsYn" data-type="ASC" style="cursor: pointer;">전수<span><img src="/images/totSurv/listicon_th01.png" alt="전수" /></span></th> <!-- 2020.11.20[신예리] 웹접근성으로 인한 alt값 추가 -->
	  					</tr>
					</thead>
				</table>
      		</div>
      		<div class="sideCol-column sideCol-ie" style="height: 410px; overflow-y: auto; width: auto;"> <!-- 2020.10.27[신예리] 익스플로러 스크롤 생겨서 ie class 추가 -->
  				<table class="sideTable" id="totSurvDataList">
  					<!-- 2020.10.12[한광희] 총조사 상세페이지 결과 목록 수정 START -->
					<tbody>
	  					<!-- 총조사 결과 목록 -->
  					</tbody>
  					<!-- 2020.10.12[한광희] 총조사 상세페이지 결과 목록 수정 END -->
				</table>
      		</div>
		</div>
		<button type="button" class="listMore" id="totSurvDataListMore" style="width: 98%; visibility: hidden;">더보기</button>	<!-- 2020.10.27[한광희] 총조사 상세페이지 더보기 버튼 수정 -->
		</div>
		<!-- 2020.10.21[한광희] 상세페이지 단건 선택으로 수정으로 주석처리 START -->
	    <!-- <div class="sideResultSelect">
	    	<div class="sideCol-row" style="padding: 0 5px;">
	        	<div class="sideCol-column">
	        		2020.10.19[신예리] text color 변경 START
	          		<h2 class="resultInfo" style="color: white;"><b id="detailSelListCnt">0</b>개가 선택되었습니다.</h2>
	          		<span class="resultInfoSpan" style="color: white; color: #edf5ff;">선택한 조사표 상세보기(10개로 제한됩니다.)</span>
	          		2020.10.19[신예리] text color 변경 END
	        	</div>
	        	<button type="submit" class="DetailMoveBtn" id="detailMoveBtn"></button>
	      	</div>
	    </div> -->
	    <!-- 2020.10.21[한광희] 상세페이지 단건 선택으로 수정으로 주석처리 END -->
	    <!-- 2020.10.19[신예리] 상세페이지 레이아웃 변경 END -->
 	</div>
</div>
<!-- sideMenuArea END -->

<!-- 사용자 동적영역 생성 -->
<div class="container" id="divContent">

</div>

	<!-- 2020-10-06 [곽제욱] z-index 적용을 위한 맵툴팁 영역 START -->
	<!-- 2020-10-22 [주형식] z-index 9999 -> 99999로 변경 -->
	<div id="mapToolTipTable" style="background: rgba(255, 255, 255, 1); border-radius: 10px;border-width: 4px; display: block; position: absolute;  display:none; z-index: 99999;">
		<table style="margin:10px;">
			<tbody>
				<tr>
					<td colspan="3" class="admName" style="font-size: 14px; font-weight: bold;" id="toolAdmNm">경기도</td> <!-- 20201202 박은식 color 삭제 -->
				</tr>
				<tr style="height:5px">
					<td></td><td></td><td></td> <!-- 2020.11.20[신예리] 웹접근성으로 인한 셀 추가 -->
				</tr>
				<tr>
					<td colspan="3" id="toolAdmData">13,300,900 (명)</td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- 2020-10-06 [곽제욱] z-index 적용을 위한 맵툴팁 영역 END -->

	<!-- 2020-10-13 [곽제욱] 타일맵 툴팁을 위한 영역 START -->
	<div class="TileMaptoolTip">
	</div>
	<!-- 2020-10-13 [곽제욱] 타일맵 툴팁을 위한 영역 END -->

	<!-- 2020-10-07 [곽제욱] 차트 공통툴팁 영역 START -->
	<div class="chartCommontoolTip">

	</div>

	<!-- 2020-10-07 [곽제욱] 차트 공통툴팁 영역 START -->
	<div class="chartPoptoolTip" style="z-index:10000;">

	</div>

	<!-- 2020-10-07 [곽제욱] 차트 공통툴팁 영역 START -->
	<!-- 2020-10-08 [박은식] 공통팝업 영역 START -->
	<!-- 팝업 배경 START -->
	<div class="commonTotSurvBack_modal" id="commonTotSurv_popup_back" style="display:none;"></div>
  	<!-- 팝업 배경 END -->
	<!-- 확인 팝업 START -->
	<div id="commonTotSurv_popup_confirm" class="commonTotSurvPopupWrap" style="left: calc(50% - 120px); top: 100px; width: 330px; display: none;"> 	<!-- 2020-10-13 [신예리] 공통팝업 영역 위치 수정 -->
			<div class="commonTotSurvPopTit" style="background-color: #363A46;">
				<h1>알림 팝업</h1>
				<button type="button" class="commonTotSurvPopcloseBtn" id="commonTotSurv_popup_confirm_close" title="팝업 닫기"></button>
			</div>
			<div class="commonTotSurvPopCon">
				<p class="commonTotSurvPopContxt" id="commonTotSurv_popup_confirm_message">현재 위치 정보를 저장 하시겠습니까?</p>
				<div class="commonTotSurvPopBtnBoxCurrent">
						<button id="commonTotSurv_popup_confirm_ok" class="commonTotSurvPopOk" type="button">확인</button>
						<button id="commonTotSurv_popup_confirm_cancel" class="commonTotSurvPopCancle" type="button">취소</button>
					</div>
			</div>
	</div>
	<!-- 확인 팝업 END -->
	<!-- 알림 팝업 START -->
	<div id="commonTotSurv_popup_alert" class="commonTotSurvPopupWrap" style="left: calc(50% - 120px); top: calc(50% - 120px); width: 330px; display: none;">  	<!-- 2020-10-13 [신예리] 공통팝업 영역 위치 수정 -->
			<div class="commonTotSurvPopTit" style="background-color: #363A46;">
				<h1>알림 팝업</h1>
				<button type="button" class="commonTotSurvPopcloseBtn" id="commonTotSurv_popup_alert_close" title="팝업 닫기"></button>
			</div>
			<div class="commonTotSurvPopCon">
				<p class="commonTotSurvPopContxt" id="commonTotSurv_popup_alert_message">비밀 번호를 입력하세요.</p>
				<div class="commonTotSurvPopBtnBoxCurrent"  >
					<button class="commonTotSurvPopOk" id="commonTotSurv_popup_alert_ok" type="button">확인</button>
				</div>
			</div>
	</div>
	<!-- 알림 팝업 END -->
	<!-- 2020-10-08 [박은식] 공통팝업 영역 END -->


	<!-- 2020-10-19 [주형식] 차트변경 팝업화면 추가 START -->
	<div id="chart_modal" class="chart_modal">
		<div class="popTit" style="background-color: #363A46;">
  			<h1><span id="popupTitle"> 차트 유형</span></h1>
			 <button type="button" class="popcloseBtn modal_close_btn" onclick="" title="팝업 닫기"></button>
	   	</div>
		<div id="chartKind" class="chartKindBar">
		<!-- 바(가로)차트 &nbsp;&nbsp; 바(세로)차트 &nbsp;&nbsp; 차트3 &nbsp;&nbsp; 차트4 -->
			<button type="button" class="chartKind00" title="막대 그래프(가로)"></button>
			<button type="button" class="chartKind01" title="막대 그래프(세로)"></button>
			<button type="button" class="chartKind02" title="꺽은선 그래프"></button>
<!-- 			<button type="button" class="chartKind03" title="히스토그램"></button> -->
			<button type="button" class="chartKind04" title="방사형"></button>
			<button type="button" class="chartKind05" title="파이차트"></button>
			<button type="button" class="chartKind06" title="막대 그래프(백분율)"></button>
			<button type="button" class="chartKind07" title="막대 그래프(세로 누적)"></button>
			<button type="button" class="chartKind08" title="막대 그래프(가로 누적)"></button>
			<button type="button" class="chartKind09" title="다중 꺽은선 그래프"></button>
			<button type="button" class="chartKind10" title="꺽은선,막대 그래프"></button>
			<button type="button" class="chartKind11" title="막대 그래프(좌우 비교)"></button>
			<button type="button" class="chartKind12" title="면적차트"></button>
			<button type="button" class="chartKind13" title="그룹 막대 그래프(세로)"></button>
			<button type="button" class="chartKind14" title="다중 방사형"></button>
			<button type="button" class="chartKind15" title="버플차트"></button>

			<!-- 2020.10.28 공통차트 이미지 저장 버튼 추가 -->
			<button type="button" id="cmmChartSave" class="cmmChartSave" title="차트 이미지 저장"></button> <!-- 2020.11.20[신예리] 웹접근성으로 인해 text 삭제 -->

		</div>
		<div class="chartCon" id="chartDiv" style="background-color: white !important;"> <!-- 2020.11.03[신예리] important 위치 수정 --> <!-- 20201117 박은식 class 변경 -->
		</div>
	</div>
	<!-- 2020-10-19 [주형식] 차트변경 팝업화면 추가 END -->

	<!-- 20201020 박은식 도움말 툴팁 영역 MAIN으로 이동 START -->
	<div class="ToolTip helpToolTipDiv moreInfoTool" id="helpTooltip" style="background-color:#fff; z-index:5000;"></div><!-- 20201022 박은식 팝업 z-index 추가(debug mode 아닐 경우 툴팁이 뜨지 않음) -->
	<!-- 20201020 박은식 도움말 툴팁 영역 MAIN으로 이동 END -->


	<!-- 2020.10.21[신예리] 공유하기 팝업 START -->
	<div id="commonSharepopup" class="commonTotSurvPopupWrap" style="left: calc(50% - 120px); top: 100px; width: 560px; display: none;"> <!-- 2020-10-13 [신예리] 공통팝업 영역 위치 수정 --> <!-- 2020-11-13 [신예리] 밴드 버튼 추가로 인한 너비 수정 -->
			<div class="commonTotSurvPopTit" style="background-color: #363A46;">
				<h1>SNS 공유</h1>
				<button type="button" class="commonTotSurvPopcloseBtn" id="commonTotSurv_Sns_close" title="팝업 닫기"></button> <!-- 2020.11.20[신예리] 웹접근성으로 인한 id 변경 -->
			</div>
			<div class="commonTotSurvPopCon">
				 <div class="shareWrap">
					 <div class="shareRow mt10">
					 	<h4 style="margin-right: 10px; color: #fff;">URL내용 : </h4>
					 	<label class="sr_only" for="shareUrl">URL 입력</label>
		              	<input id="shareUrl" type="text" placeholder="http://" readonly="readonly"/>
					 </div>
					 <div class="shareRow mt20">
						 <button type="button" class="kakao" title="카카오 스토리 공유하기">카카오 스토리</button>
	              		 <button type="button" class="twitter" title="트위터 공유하기">트위터</button>
	              		 <button type="button" class="face" title="페이스북 공유하기">페이스북</button>
	              		 <button type="button" class="band" title="밴드 공유하기">네이버 밴드</button>
					 </div>
					 <div class="shareRowBtn mt20">
			              <button type="button" class="urlcopy">URL 복사하기</button>
			              <button type="button" class="txtClose">닫기</button>
		            </div>
				 </div>
			</div>
	</div>
	<!-- 2020.10.21[신예리] 공유하기 팝업 END -->


	<!-- 2020.10.22[신예리] 상세페이지 지역 선택 팝업 START -->
	<div class="commonTotSurvBack_modal" id="commonTotSurvDetail_popup_back" style="display:none;"></div>
	<div id="detailSidoselectPop" class="commonTotSurvPopupWrap" style="left: calc(50% - 120px); top: calc(50% - 120px); width: 330px; display: none;">
			<div class="commonTotSurvPopTit" style="background-color: #363A46;">
				<h1>지역 선택</h1>
				<button type="button" class="commonTotSurvPopcloseBtn" id="commonTotSurv_detailSidoselectPop_close" title="팝업 닫기"></button>
			</div>
			<div class="commonTotSurvPopCon">

				<div class="popSelect">
					<select id="areaPopup_sido">
						<!-- <option value="전국">전국</option>
						<option value="서울특별시">서울특별시</option>
						<option value="부산광역시">부산광역시</option>
						<option value="대구광역시">대구광역시</option>
						<option value="인천광역시">인천광역시</option> -->
					</select>
					<select id="areaPopup_sgg">
						<!-- <option value="전체">전체</option>
						<option value="강남구">강남구</option>
						<option value="강동구">강동구</option>
						<option value="강북구">강북구</option>
						<option value="강서구">강서구</option> -->
					</select>
				</div>
				<div class="commonTotSurvPopBtnBoxCurrent"  >
					<button class="commonTotSurvPopOk" id="commonTotSurv_detailSidoselectPop_ok" type="button">확인</button>
				</div>
			</div>
	</div>
	<!-- 2020.10.22[신예리] 상세페이지 지역 선택 팝업 END -->

</body>
</html>