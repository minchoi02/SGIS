
<%
	/**************************************************************************************************************************
	* Program Name	: 행정통계시각화 Main
	* File Name		: administStatsMain.jsp
	* Comment		:
	* History		:
	**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.net.*"       %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<script src="/js/plugins/jquery.min.js"></script>
<script src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>
<script src="/js/administStats/ui.common.js"></script>
<script src="/js/administStats/lodash.js"></script>
<link rel="stylesheet" href="/css/administStats/renew/font/NanumSquare/nanumsquare.css">
<link rel="stylesheet" href="/css/administStats/renew/common.css">
<link rel="stylesheet" href="/css/administStats/renew/map.css">
<link rel="stylesheet" href="/css/administStats/renew/custom.css">
<link rel="stylesheet" href="/css/administStats/renew/map2.css">

<script type="text/javascript">
	/* 공유 시 파라미터 */
	const gv_url = "${url}";
	const gv_mode = "${mode}";
	const gv_year = "${year}";
	const gv_sido_cd = "${sido_cd}";
</script>
<!-- SGIS 공통 JS[S] -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop.css" />
<script src="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop-src.sync.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/jquery.sha256.js"></script>
<script src="${pageContext.request.contextPath}/js/plugins/durian-v2.0.js"></script>
<script src="${pageContext.request.contextPath}/js/common/sop.portal.absAPI.js"></script>
<script src="${pageContext.request.contextPath}/js/administStats/map.js"></script>
<script src="${pageContext.request.contextPath}/js/common/common.js"></script>
<script src="${pageContext.request.contextPath}/js/administStats/legendInfo.js"></script>
<script src="/js/plugins/jquery.wheelcolorpicker.js"></script>
<script src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/wheelcolorpicker.css" />
<script src="${pageContext.request.contextPath}/js/plugins/jquery.wheelcolorpicker.js"></script>
<!-- SGIS 공통 JS[E] -->

<!-- SNS 공유 (카카오스토리) -->
<%
	//mng_s 20220218 개발서버에서 외부라이브러리가 로딩 않되서 호스트 네임으로 구분해서 처리함
	String hostName = InetAddress.getLocalHost().getHostName();
	//System.out.println("hostName [" + hostName);
	if("sgis_dev".equals(hostName) || "mangWASZ".equals(hostName)  || hostName.startsWith("DESKTOP") ) {
		//개발서버
	} else {
		//운영서버
		out.println("<script src=\"https://developers.kakao.com/sdk/js/kakao.min.js\"></script>"); //운영
	}
%>

<title>[행정통계시각화]한눈에 보는 통계입니다.</title>
</head>
<body style="overflow-x:auto;">
	<div id="wrap">
		<!-- 좌측메뉴[S] -->
		<jsp:include page="/view/administStats/administStatsLeft"></jsp:include>
		<!-- 좌측메뉴[E] -->
		<div id="content">
			<!-- 헤더[S] -->
			<jsp:include page="/view/administStats/administStatsHeader"></jsp:include>
			<!-- 헤더 [E]-->

			<div id="newlyDashTuto" style="display: none;">
				<button type="button" class="tuto_close_btn" data-mode="${mode}">닫기</button>
			</div>
			<div id="houseDashTuto" style="display: none;">
				<button type="button" class="tuto_close_btn" data-mode="${mode}">닫기</button>
			</div>
			<div id="middlDashTuto" style="display: none;">
				<button type="button" class="tuto_close_btn" data-mode="${mode}">닫기</button>
			</div>
			<div id="retunDashTuto" style="display: none;">
				<button type="button" class="tuto_close_btn" data-mode="${mode}">닫기</button>
			</div>
			<div id="more1DashTuto" style="display: none;">
				<button type="button" class="tuto_close_btn" data-mode="${mode}">닫기</button>
			</div>
			<div id="more2DashTuto" style="display: none;">
				<button type="button" class="tuto_close_btn" data-mode="${mode}">닫기</button>
			</div>
			<div id="more3DashTuto" style="display: none;">
				<button type="button" class="tuto_close_btn" data-mode="${mode}">닫기</button>
			</div>

			<!-- 사용자 동적영역 생성[S] -->
			<div class="container sec-${mode}Dash" id="container"></div>
			
			<!-- 사용자 동적영역 생성[E] -->
		</div>
		<!-- 맵툴팁 영역 [S] -->
		<div id="mapToolTipTable" style="background: rgba(255, 255, 255, 1); border-radius: 10px; border-width: 4px; display: block; position: absolute; display: none; z-index: 99999;">
			<table style="margin: 10px;">
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

		<!-- 20201020 박은식 도움말 툴팁 영역 MAIN으로 이동 START -->
		<div class="ToolTip helpToolTipDiv moreInfoTool" id="helpTooltip" style="background-color:#fff; z-index:5000;width:300px;height:auto"></div><!-- 20201022 박은식 팝업 z-index 추가(debug mode 아닐 경우 툴팁이 뜨지 않음) -->
		<!-- 20201020 박은식 도움말 툴팁 영역 MAIN으로 이동 END -->
		<!-- 2021-10-08 공통팝업 영역[S] -->
		<!-- 팝업 배경[S] -->
		<div class="commonAdministStatsBack_modal" id="commonAdministStats_popup_back" style="display: none;"></div>
		<!-- 팝업 배경[E] -->
		<!-- 확인 팝업[S] -->
		<div id="commonAdministStats_popup_confirm" class="commonAdministStatsPopupWrap" style="left: calc(50% - 120px); top: 100px; width: 330px; display: none;">
			<!-- 2021-10-13 [신예리] 공통팝업 영역 위치 수정 -->
			<div class="commonAdministStatsPopTit" style="background-color: #363A46;">
				<h1>알림 팝업</h1>
				<button type="button" class="commonAdministStatsPopcloseBtn" id="commonAdministStats_popup_confirm_close" title="팝업 닫기"></button>
			</div>
			<div class="commonAdministStatsPopCon">
				<p class="commonAdministStatsPopContxt" id="commonAdministStats_popup_confirm_message">현재 위치 정보를 저장 하시겠습니까?</p>
				<div class="commonAdministStatsPopBtnBoxCurrent">
					<button id="commonAdministStats_popup_confirm_ok" class="commonAdministStatsPopOk" type="button">확인</button>
					<button id="commonAdministStats_popup_confirm_cancel" class="commonAdministStatsPopCancle" type="button">취소</button>
				</div>
			</div>
		</div>
		<!-- 확인 팝업[E] -->
		<!-- 알림 팝업[S] -->
		<div id="commonAdministStats_popup_alert" class="commonAdministStatsPopupWrap" style="left: calc(50% - 120px); top: calc(50% - 120px); width: 330px; display: none;">
			<!-- 2021-10-13 [신예리] 공통팝업 영역 위치 수정 -->
			<div class="commonAdministStatsPopTit" style="background-color: #363A46;">
				<h1>알림 팝업</h1>
				<button type="button" class="commonAdministStatsPopcloseBtn" id="commonAdministStats_popup_alert_close" title="팝업 닫기"></button>
			</div>
			<div class="commonAdministStatsPopCon">
				<p class="commonAdministStatsPopContxt" id="commonAdministStats_popup_alert_message">비밀 번호를 입력하세요.</p>
				<div class="commonAdministStatsPopBtnBoxCurrent">
					<button class="commonAdministStatsPopOk" id="commonAdministStats_popup_alert_ok" type="button">확인</button>
				</div>
			</div>
		</div>
		<!-- 알림 팝업[E] -->
		<!-- 2021-10-08 공통팝업 영역[E] -->

		<!-- 공유하기 팝업 START -->
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
	</div>
	
	
</body>
</html>