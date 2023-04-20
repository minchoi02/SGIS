<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html>
<head>
	<title>로그인</title>
	<meta name="title" content="로그인">
	<link rel="stylesheet" href="${ctx }/resources/css/login.css" />
	<script src="${ctx }/resources/plugins/jquery.heum.validation.js"></script>
	<script src="${ctx }/resources/js/etc/login.js"></script>
</head>
<body>
	<div class="ContArea">
		<div class="Login">
			<fieldset id="intro-login">
				<legend>LOGIN</legend>
				<p>
					2015년 9월 15일부터 통합회원으로 가입하시면 통계청에서 운영하는 통계정보서비스를 하나의 아이디로 이용하실 수 있습니다.<br>
					2017년 9월 15일까지 한시적으로 기존 로그인이 가능하며 이후 기존 회원정보를 삭제됩니다.<br>
					<span>*통합회원 가입은 PC버전에서만 가능합니다.</span>
				</p>
				<div class="LoginType">
					<c:set var="returnPage">
						<c:if test="${fn:trim(param.returnPage)!='' }">
							?returnPage='+encodeURIComponent('${param.returnPage }')+'
						</c:if>
					</c:set>
					<button id="sso-login-button" type="button" onclick="srvLogWrite('M0','01', '05', '00', '', ''); location.href='${ctx}/kosis/login.sgis${returnPage }';">통합로그인</button>
					<button id="original-login-button" type="button" onclick="location.href='${ctx}/login.sgis${returnPage }';">기존로그인</button>
				</div>
			</fieldset>
		</div>
	</div>
</body>
</html>
