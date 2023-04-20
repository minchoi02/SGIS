
<%
	/**************************************************************************************************************************
	* Program Name	: 행정통계시각화 상세보기 Main
	* File Name		: administStatsMain.jsp
	* Comment		:
	* History		:
	*	2020.08.03	곽제욱	신규
	*
	**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
<script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>
<script type="text/javascript" src="/js/plugins/slick.min.js"></script>
<script src="/js/administStats/lodash.js"></script>
<link rel="stylesheet" href="/css/administStats/renew/font/NanumSquare/nanumsquare.css">
<link rel="stylesheet" href="/css/administStatsDetail/slick.css" />
<link rel="stylesheet" href="/css/administStatsDetail/moreNew.css" /> <!-- 통계더보기 css 추가[조규환] -->
<link rel="stylesheet" href="/css/administStatsDetail/reset.css" />
<link rel="stylesheet" href="/css/administStatsDetail/style.css" />
<link rel="stylesheet" href="/css/administStatsDetail/renew.css" />

<!-- SNS 공유 (카카오스토리) -->
<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>

<script>
	$(document).ready(function() {
	});
</script>
<!-- SGIS 공통 JS[S] -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop.css" />
<link rel="stylesheet" href="/css/administStatsDetail/map.css" />

<script src="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop-src.sync.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/jquery.sha256.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/durian-v2.0.js"></script>
<script src="${pageContext.request.contextPath}/js/common/sop.portal.absAPI.js"></script>
<script src="${pageContext.request.contextPath}/js/administStatsDetail/map.js"></script>
<script src="${pageContext.request.contextPath}/js/common/common.js"></script>
<script src="${pageContext.request.contextPath}/js/administStatsDetail/legendInfo.js"></script>
<script type="text/javascript" src="/js/plugins/jquery.wheelcolorpicker.js"></script>
<script type="text/javascript" src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/wheelcolorpicker.css" />
<script src="${pageContext.request.contextPath}/js/plugins/jquery.wheelcolorpicker.js"></script>
<style>
#DashTuto {
	background: url(/images/administStats/renew/adminStatesDe.jpg);
	position: fixed;
	top: 0;
	left: 0;
	background-size: cover;
	z-index: 9999999;
	width: 100%;
	height: auto;
	min-height: 100%;
	min-width: 1024px;
	position: fixed;
}

.tuto_close_btn {
	padding: 10px 60px;
	border-radius: 35px;
	background-color: #bb902f;
	bottom: 30px;
	position: absolute;
	left: 80%;
	right: 0;
	margin-left: auto;
	font-size: 16px;
	font-weight: 600;
	margin-right: auto;
	color: white;
	width: 165px;
	margin-left: auto;
}

.tuto_close_btn:hover {
	background-color: #1a1e6f;
}

</style>
<!-- SGIS 공통 JS[E] -->

<title>[행정통계시각화]행정통계 시각화 메인화면입니다.</title>
</head>
<body style="overflow-x:auto;">
	<div id="wrap">
		<div class="skip">
			<a href="#gnb">주메뉴</a>
			<a href="#content">컨텐츠</a>
		</div>
		<!-- 좌측메뉴[S] -->
		<jsp:include page="/view/administStatsDetail/administStatsLeft"></jsp:include>
		<!-- 좌측메뉴[E] -->
		<!-- 헤더[S] -->
		<jsp:include page="/view/administStatsDetail/administStatsHeader"></jsp:include>
		<!-- 헤더 [E]-->
		
		<div id="DashTuto" style="display: none;">
			<button type="button" class="tuto_close_btn" data-mode="${mode}">닫기</button>
		</div>
		
		<div id="container" class="detialScroll"> <!-- [2022-12-26] 클래스 추가 -->
			<!-- 사용자 동적영역 생성[S] -->
			<!-- div class="container" id="divContent"></div -->
			<div class="container" id="divContent"></div>
			<!-- 사용자 동적영역 생성[E] -->
		</div>
		<!-- 맵툴팁 영역 [S] -->
		<div id="mapToolTipTable" style="background: rgba(255, 255, 255, 1); border-radius: 10px; border-width: 4px; display: block; position: absolute; display: none; z-index: 99999;padding:10px">
			<table>
				<tbody>
					<tr>
						<td colspan="3" class="admName" style="font-size: 14px; font-weight: bold;" id="toolAdmNm">경기도</td>
					</tr>
					<tr style="height: 5px">
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td colspan="3" id="toolAdmData">13,300,900 (명)</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- 맵툴팁 영역[E] -->
		<!-- 타일맵 툴팁을 위한 영역[S] -->
		<div class="TileMaptoolTip"></div>
		<!-- 타일맵 툴팁을 위한 영역[E] -->

		<!-- 차트 공통툴팁 영역[S] -->
		<div class="chartCommontoolTip"></div>
		<div class="chartPoptoolTip" style="z-index: 10000;"></div>
		<!-- 차트 공통툴팁 영역[E] -->
	</div>

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

	<!-- 2020-10-19 [주형식] 차트변경 팝업화면 추가 START -->
	<div id="chart_modal" class="chart_modal">
		<div class="popTit" style="background-color: #363A46;">
	 			<h1><span id="popupTitle">미리보기</span></h1>
			 <button type="button" class="popcloseBtn modal_close_btn" onclick="" title="팝업 닫기"></button>
	   	</div>
		<button type="button" id="cmmChartSave" class="cmmChartSave" title="차트 이미지 저장"></button> <!-- 2020.11.20[신예리] 웹접근성으로 인해 text 삭제 -->
		<button class="ValueOnOff" id="chartValue" title="값 표출" style="position:absolute; margin-top:10px; right: 30px;"></button>
		<button type="button" class="prevImgSaveBtn" name="prevImgSaveBtn" title="이미지 저장"></button>
		<div class="chartWrap">
			<div class="chartCon" id="chartDiv" style="background-color: white !important;"> <!-- 2020.11.03[신예리] important 위치 수정 --> <!-- 20201117 박은식 class 변경 -->
		</div>
		</div>
	</div>
	<!-- 2020-10-19 [주형식] 차트변경 팝업화면 추가 END -->
	
	<div id="commonSharepopup" class="commonTotSurvPopupWrap" style="left: calc(50% - 120px); top: 100px; width: 560px; display: none;">
		<!-- 공통팝업 영역 위치 수정 -->
		<!-- 밴드 버튼 추가로 인한 너비 수정 -->
		<div class="commonTotSurvPopTit" style="background-color: #363A46;">
			<h1>SNS 공유</h1>
			<button type="button" class="commonTotSurvPopcloseBtn" id="commonTotSurv_Sns_close" title="팝업 닫기"></button>
			<!-- 2020.11.20[신예리] 웹접근성으로 인한 id 변경 -->
		</div>
		<div class="commonTotSurvPopCon" style="margin-top: -1px;">
			<div class="shareWrap">
				<div class="shareRow" style="margin-top: 10px;">
					<h4 style="margin-right: 10px; color: #fff;">URL내용 :</h4>
					<label class="sr_only" for="shareUrl">URL 입력</label>
					<input id="shareUrl" type="text" placeholder="http://" readonly="readonly" />
				</div>
				<div class="shareRow" style="margin-top: 20px;">
					<button type="button" class="kakao" title="카카오 스토리 공유하기">카카오 스토리</button>
					<button type="button" class="twitter" title="트위터 공유하기">트위터</button>
					<button type="button" class="face" title="페이스북 공유하기">페이스북</button>
					<button type="button" class="band" title="밴드 공유하기">네이버 밴드</button>
				</div>
				<div class="shareRowBtn" style="margin-top: 20px;">
					<button type="button" class="urlcopy">URL 복사하기</button>
					<button type="button" class="txtClose">닫기</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 공유하기 팝업 END -->
</body>
</html>
