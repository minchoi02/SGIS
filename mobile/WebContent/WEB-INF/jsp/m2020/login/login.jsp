<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>로그인</title>
<meta name="title" content="로그인">
	<style type="text/css">
		/* header footer 안씀 */
		.Header {display: none !important;}
		.Content {padding-top: 0px !important;}
		.Footer {display: none !important;}
	</style>
	<!-- 페이지 전역변수 -->
	<script type="text/javascript">
		var gv_return_page = "${params.returnPage}";
		var gv_full_context_path = "${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${ctx }";
		var gv_err_yn = "N";
		var gv_err_msg = "";
	</script>
	<c:if test="${fn:trim(errorMessage)!='' }">
		<script>
		gv_err_yn = "Y";
		gv_err_msg = "${errorMessage}";
		</script>
		<c:set var="errorMessage" value="" scope="session"/>
	</c:if>
	
	<!-- 기본 js -->
	<script src="${ctx }/resources/m2020/js/login/login.js"></script>
</head>
<body>
	<button id="loginIdBack" class="btn_popClose" type="button"></button>
	<div class="loginWrap">
		<div class="loginTitle">
			LOGIN
			<p>(통합회원)</p>
		</div>
		<div class="loginBox">
			<input id="loginId" type="text" value="" placeholder="아이디">
			<input id="loginPass" type="password" value="" placeholder="비밀번호">
		</div>
		<div class="idAuto">
			<div class="idsave">
				<input id="loginSaveId" type="checkbox">
				<label for="loginSaveId"><span>아이디저장</span></label>
			</div>
			<div class="autoLogin">
				<input id="loginSaveAutoLogin" type="checkbox">
				<label for="loginSaveAutoLogin"><span>자동로그인</span></label>
			</div>
		</div>
		<div class="loginBtn">
			<button id="login" class="btn_login" type="button">로그인</button>
		</div>
		<div class="loginDesc" style="text-align: center; word-break: keep-all;">
			아직 회원이 아니시면 통합회원 가입 후 이용해주세요.<br> (통합회원 가입은 PC버전에서만 가능합니다.)
		</div>
		<div class="goPcv">
			<button type="button" id="loginPcVerMovement" class="pcBtn mt10">PC버전 가기</button> 
		</div>
		<div class="copy mt10">ⓒStatistics Korea. All rights reserved.</div>
	</div>
</body>
</html>