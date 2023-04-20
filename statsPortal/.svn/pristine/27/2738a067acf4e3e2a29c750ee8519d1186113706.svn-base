<%
/**************************************************************************************************************************
* Program Name	: My통계로 Main
* File Name		: statsMeMain.jsp
* Comment		: 
* History		: 
*	2019.08.08	김남민	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="ko">
<head>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<!-- 2020-01-31 [김남민] 통계Me => My통계로 명칭 변경. -->
	<!-- 2020-02-17 [김남민] 생애주기, 관심분야, 카탈로그 화면의 ‘통계정보＇용어를 ‘공간통계정보＇로 수정 -->
	
	<!-- mng_s 2020-08-31 [이금은] title 및 meta 정보 변경. -->
	<title> My통계로  |  통계지리정보서비스</title>
	
	<!-- mng_s 20201214 이진호 content 내용 수정 -->
	<meta name="description" content="생애주기·관심분야·키워드에 따른 공간통계정보 추천, 개인 관심주제 맞춤형 통계지리정보서비스 제공">
	<!-- <meta name="description" content="생애주기 공간통계, 통계주제도, 개인 관심주제에 맞는 공간통계정보 제공"> -->
	<!-- mng_e 20201214 이진호 -->
	
	<!-- mng_e 2020-08-31 [이금은] title 및 meta 정보 변경. -->
	
	<!-- mng_s 20201214 이진호 -->
	<!-- 동일콘텐츠를 여러개의 URL로 표현가능할때 대표URL 지정 -->
	<link rel="canonical" href="http://mysgis.kostat.go.kr/index.jsp">
	<!--//검색 허용-->
	<meta name="robots" content="index,follow">
	<!--//오픈 그래프-->
	<meta property="og:title" content="My통계로" />
	<meta property="og:description" content="생애주기·관심분야·키워드에 따른 공간통계정보 추천, 개인 관심주제 맞춤형 통계지리정보서비스 제공" />
	<meta property="og:image" content="https://sgis.kostat.go.kr/html/info_01/resources/images/img011.png">
	<meta property="og:url" content="http://mysgis.kostat.go.kr">
	<!--//소셜 미디어-->
	<meta name="twitter:title" content="My통계로">
	<meta name="twitter:description" content="생애주기·관심분야·키워드에 따른 공간통계정보 추천, 개인 관심주제 맞춤형 통계지리정보서비스 제공">
	<meta name="twitter:image" content="https://sgis.kostat.go.kr/html/info_01/resources/images/img011.png">
	<meta name="twitter:domain" content="http://mysgis.kostat.go.kr">
	<!--//연관채널 마크업-->
	<!--<span itemscope="" itemtype="http://schema.org/Organization">-->
	<!--<link itemprop="url" href="http://mysgis.kostat.go.kr">-->
		<!--<a itemprop="sameAs" href="https://blog.naver.com/hi_nso"></a>-->
		<!--<a itemprop="sameAs" href="https://www.youtube.com/channel/UCe6rgzW5OHfqJO8nB9MmH2Q"></a>-->
		<!--<a itemprop="sameAs" href="https://m.facebook.com/StatisticsKorea"></a>-->
		<!--<a itemprop="sameAs" href="https://www.instagram.com/statisticskorea"></a>-->
	<!--</span>-->
	<!-- mng_e 20201214 이진호 -->
	
	<!-- My통계로 퍼블리싱 기본 세팅 -->
	<link rel="stylesheet" href="/css/statsMe/common.css">
	<link rel="stylesheet" href="/css/statsMe/map.css">
	<link rel="stylesheet" href="/js/statsMe/plugin/jquery.mCustomScrollbar.css">
	<%-- <script src="/js/statsMe/plugin/jquery.min.js"></script> --%>
	<script src="/js/plugins/jquery.min.js"></script>
	<script src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>
	<link rel="stylesheet" href="/css/jquery-ui-1.10.4.custom.css" />
	<script src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	<script src="/js/statsMe/plugin/jquery.mCustomScrollbar.concat.min.js"></script>
	
	<!-- SGIS 공통 JS -->
	<link rel="stylesheet" href="/js/plugins/jquery-easyui-1.4/sop.css" />
	<script src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
	<script src="/js/plugins/jquery-easyui-1.4/sop-src.sync.js"></script>
	<script src="/js/plugins/jquery.sha256.js"></script>
	<script src="/js/plugins/durian-v2.0.js"></script>
	<script src="/js/common/sop.portal.absAPI.js"></script>
	<script src="/js/common/map.js"></script>
	<script src="/js/common/common.js"></script>
	<!-- <script src="/js/common/mapNavigation.js"></script> -->
	<script src="/js/common/mapInfo/legendInfo.js"></script>
	<link rel="stylesheet" href="/css/wheelcolorpicker.css"/>
    <script src="/js/plugins/jquery.wheelcolorpicker.js"></script>
    <!-- 지도 이미지 캡쳐 -->
    <c:set var="UserAgentInfo" value="${header['User-Agent']}" scope="session"/>
    <c:choose>
    	<c:when test="${fn:indexOf(UserAgentInfo, 'Chrome') != -1 || fn:indexOf(UserAgentInfo, 'Firefox') != -1 || fn:indexOf(UserAgentInfo, 'Safari') != -1}">
    		<script src="/js/statsMe/plugin/html2canvas.min.js"></script>
    	</c:when>
    	<c:otherwise>
    		<script src="/js/plugins/imageCapture/rgbcolor.js"></script>
			<script src="/js/plugins/imageCapture/canvg.js"></script>
			<script src="/js/plugins/imageCapture/html2canvas.js"></script>
			<script src="/js/plugins/imageCapture/html2canvas.svg.js"></script>
    	</c:otherwise>
    </c:choose>
    <!-- HighChart -->
    <script src="/js/plugins/highcharts/highcharts.js"></script>
    <script src="/js/plugins/highcharts/highcharts-more.js"></script>
    <script src="/js/plugins/highcharts/highchart.drag.js"></script>
	
	<!-- 페이지 JS -->
	<script src="${pageContext.request.contextPath}/js/statsMe/statsMeMain.js"></script>
	
	<!-- 페이지 전역변수 -->
	<script>
		var gv_type = "${type}";
		var gv_lfe_cycle_id = "${lfe_cycle_id}";
		var gv_stat_dstnc_det_id = "${stat_dstnc_det_id}";
		var gv_stat_data_id = "${stat_data_id}";
		var gv_potal_search_type = "${potal_search_type}";	// 2020.04.06[한광희] SGIS 포털 검색에서 화면이동에 따른 변수 선언
		var gv_stat_data_srv_nm = "${stat_data_srv_nm}";	// 2020.04.06[한광희] SGIS 포털 검색에서 화면이동에 따른 변수 선언
	</script>
	
	<!-- 즐겨찾기 -->
	<c:choose>
		<c:when test="${bookmark_yn == 'Y'}">
			<script>
				var gv_bookmark_yn = "Y";
				var gv_bookmark_params = JSON.parse(${bookmark_params});
				var gv_bookmark_params_info = JSON.parse(gv_bookmark_params.param_info);
				gv_bookmark_params_info.map_use_yn = "N";
			</script>
		</c:when>
		<c:otherwise>
			<script>
				var gv_bookmark_yn = "N";
				var gv_bookmark_params = {};
				var gv_bookmark_params_info = {};
				gv_bookmark_params_info.map_use_yn = "N";
			</script>
		</c:otherwise>
	</c:choose>
	
	<!-- SNS 공유 (카카오스토리) -->
	<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
	
	<!-- SNS META 정보 -->
	<c:if test="${bookmark_yn == 'Y'}">
		<!-- 2020-02-26 [김남민] 통계로-53 : SNS 공유 자료 클릭시 모바일 첫 페이지로 링크됨 -->
		<meta property="og:url" content="/view/statsMe/statsMeMain?id=${id}">
		<meta property="og:image" content="/view/statsMe/statsMeImage?id=${id}" />
		<%-- /** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 START */ --%>
		<%-- <meta property="og:description" content="${stat_data_nm}" /> --%>
		<meta property="og:description" content="${stat_data_srv_nm}" />
		<%-- /** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 END */ --%>
		<!-- 2020-01-31 [김남민] 통계Me => My통계로 명칭 변경. -->
		<meta property="og:title" content="[My통계로]개인 관심주제에 맞는 공간통계정보를 제공합니다." />
		<meta property="og:type" content="article">
		<meta property="og:article:author" content="${stat_data_id}">
		<meta property="og:article:author:url" content="/view/statsMe/statsMeMain">
	</c:if>
</head>
<body style="overflow: hidden;">
	<div class="wrap">
		<div class="top_wrap"> 
			<!-- 2020-02-11 [김남민] 탭화면 전환시 My통계로 탭 모양이 좌측 상단에 생겼다가 우측으로 이동되는 현상 수정 START -->
			<c:choose>
				<c:when test="${bookmark_yn == 'Y'}">
					<!-- 2020-02-17 [김남민] My통계로 상단 화면과, SGIS 포털 상단 화면 탭이 포함된 부분의 크기가 일치하도록 수정 -->
					<!-- 2020-02-18 [김남민] 탭 위치 변경 -->
					<div id="narrow_wide_1" class="top_box wide">
				</c:when>
				<c:otherwise>
					<!-- 2020-02-17 [김남민] My통계로 상단 화면과, SGIS 포털 상단 화면 탭이 포함된 부분의 크기가 일치하도록 수정 -->
					<div id="narrow_wide_1" class="top_box narrow" style="width:1100px;">
				</c:otherwise>
			</c:choose>
			<!-- 2020-02-11 [김남민] 탭화면 전환시 My통계로 탭 모양이 좌측 상단에 생겼다가 우측으로 이동되는 현상 수정 END -->
				<div class="global_nav">
					<ul>
						<!-- 2020-01-31 [김남민] 통계Me => My통계로 명칭 변경. -->
						<!-- 2020-02-17 [김남민] 변경 디자인안 반영. -->
						<!-- mng_s 20200221 모바일에서 PC버전보기시 다시 모바일로 바뀌지 않도록 수정 -->
						<!-- 2020.09.22 [한광희] 총조사시각화 진입메뉴 삭제 START -->
						<!-- 2020.09.29 [한광희] 총조사 시각화 메뉴 추가 START -->
						<li><a href="javascript:logWriteAndMove('N0', '01', '01', '00', '', '', '/view/statsMe/statsMeMain?param=0', false);" class="tm_my" style="box-shadow:0px -3px 5px rgba(0, 0, 0, .2); z-index:20; left: -18px;"></a></li>
						<li><a href="javascript:logWriteAndMove('N0', '01', '02', '00', '', '', '/view/index?param=0', false);" class="tm_sgis3" style="box-shadow:0px -3px 5px rgba(0, 0, 0, .2); background-color:#9be2ed; left:73px;  width:150px; z-index:10;"></a></li>
						<!-- <li><a href="/view/totSurv/totSurvMain" class="tm_totSurv01" style="box-shadow:0px -3px 5px rgba(0, 0, 0, .2); background-color:#9be2ed; left:215px;  width:150px; z-index:0;"></a></li> 2020.10.13[한광희] 총조사 시각화 메뉴 삭제 -->
						<!-- 2020.09.29 [한광희] 총조사 시각화 메뉴 추가 END -->
						<!-- 2020.09.22 [한광희] 총조사시각화 진입메뉴 삭제 END -->
					</ul>
				</div>
			</div>
		</div>
		<div id="narrow_wide_2" class="content_wrap wide">
			<!-- 빈 화면 -->
			<!-- 2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 -->
			<div id="statsMeBackground" style="position: fixed; z-index: 2; left: 0px; top: 0px; width: 120%; height: 100%; background-color: #ffffff;"></div>
			
			<!-- My통계로 네비게이션 화면 -->
			<div id="statsMeNavigation" style="position: absolute; z-index: 1;">
				<jsp:include page="/view/statsMe/statsMeNavigation"></jsp:include>
			</div>
			<!-- My통계로 (생애주기) 화면 -->
			<!-- 2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 -->
			<div id="statsMeLifeCycle" style="position: absolute; z-index: 1; padding-left: 320px; height: calc(100% - 65px); padding-right: 15px;">
				<jsp:include page="/view/statsMe/statsMeLifeCycle"></jsp:include>
			</div>
			<!-- My통계로 (관심분야) 화면 -->
			<!-- 2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 -->
			<div id="statsMeInterestRealm" style="position: absolute; z-index: 1; padding-left: 320px; height: calc(100% - 65px); padding-right: 15px;">
				<jsp:include page="/view/statsMe/statsMeInterestRealm"></jsp:include>
			</div>
			<!-- My통계로 (카탈로그) 화면 -->
			<!-- 2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 -->
			<div id="statsMeCatalog" style="position: absolute; z-index: 1; padding-left: 320px; height: calc(100% - 65px); padding-right: 15px;">
				<jsp:include page="/view/statsMe/statsMeCatalog"></jsp:include>
			</div>
			<!-- My통계로 (지도) 화면 -->
			<div id="statsMeMap" style="position: absolute; z-index: 1; width: 100%; height: calc(100% - 35px);">
				<jsp:include page="/view/statsMe/statsMeMap"></jsp:include>
			</div>
			<!-- My통계로 (상세정보) 화면 -->
			<div id="statsMeDetailInfo" style="position: absolute; z-index: 1; width: 100%; height: calc(100% - 35px);">
				<jsp:include page="/view/statsMe/statsMeDetailInfo"></jsp:include>
			</div>
		</div>
		<!-- 2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 -->
		<div id="statsMeFooter1" class="footer_wrap" style="background-color: #ffffff; height: 115px; text-align: left; position: absolute;">
			<jsp:include page="/view/common/includeBottom"></jsp:include>
		</div>
		<div id="statsMeFooter2" class="footer_wrap" style="display: none;">
			<div class="footer_box narrow">Copyright Statistics Korea. All rights reserved. </div>
		</div>
	</div>
	<!-- My통계로 팝업 화면 -->
	<jsp:include page="/view/statsMe/statsMePopup"></jsp:include>
	
	<!-- mng_s  주석내용 웹표준 src 제거 2017.08.09 이경현 -->
	<iframe id="authFrame" width="0" height="0" style="border:0px;" title="SSO인증"></iframe>						<!--// SSO인증 -->
	<iframe id="registerFrame" width="0" height="0" style="border:0px;" title="회원가입"></iframe>					<!--// 회원가입 -->
	<iframe id="unRegisterFrame" width="0" height="0" style="border:0px;" title="회원탈퇴"></iframe>				<!--// 회원탈퇴 -->
	<iframe id="loginFrame" width="0" height="0" style="border:0px;" title="로그인"></iframe>						<!--// 로그인 -->
	<iframe id="logoutFrame" width="0" height="0" style="border:0px;" title="로그아웃"></iframe>					<!--// 로그아웃 -->
	<iframe id="modifyFrame" width="0" height="0" style="border:0px;" title="회원수정"></iframe>					<!--// 회원수정 --> 
	<!-- mng_e  주석내용 웹표준 src 제거 2017.08.09 이경현 -->
	
	<!-- 20200811 박은식 상세화면 테이블 생성(팝업 페이지로 넘겨주기 위한 사전생성) start -->
	<table id="statsMeMapReportForm_dataTable" class="pntTable" summary="항목,순위,값(명), 비율(%)" style="display:hidden;">
		<caption>전국 데이터 표</caption>
		<thead>
			<tr>
			</tr>
		</thad>
		<tbody>
		</tbody>
	</table>
	<table id="statsMeMapReportForm_dataTable1" class="pntTable" summary="항목,순위,값(명), 비율(%)" style="display:hidden;">
		<caption>시도 데이터 표</caption>
		<thead>
			<tr>
			</tr>
		</thad>
		<tbody>
		</tbody>
	</table>
	
	<table id="statsMeMapReportForm_dataTable2" class="pntTable" summary="항목,순위,값(명), 비율(%)" style="display:hidden;">
		<caption>시군구 데이터 표</caption>
		<thead>
			<tr>
			</tr>
		</thad>
		<tbody>
		</tbody>
	</table>
	
	<table id="statsMeMapReportForm_dataTable3" class="pntTable" summary="항목,순위,값(명), 비율(%)" style="display:hidden;">
		<caption>읍면동 데이터 표</caption>
		<thead>
			<tr>
			</tr>
		</thad>
		<tbody>
		</tbody>
	</table>
	<!-- 20200811 박은식 상세화면 테이블 생성(팝업 페이지로 넘겨주기 위한 사전생성) start -->
	
	
</body>
</html>