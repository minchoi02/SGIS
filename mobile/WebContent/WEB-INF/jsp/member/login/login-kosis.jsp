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
			<form action="//kosis.kr/oneid/cmmn/login/ActionLoginMob.do" method="post">
				<fieldset id="sso-login">
					<legend>LOGIN <span>(통합회원)</span></legend>
					<p class="ac">SGIS<sup>+plus</sup>를 이용하기 위하여 로그인이 필요합니다.<br>
						 아직 회원이 아니시면 통합회원 가입 후 이용해주세요.
						<span>*통합회원 가입은 PC버전에서만 가능합니다.</span>
					</p>
					<div class="LoginForm">
						<ul>
							<li>
								<label for="sso-id">아이디</label>
								<input id="sso-id" name="USR_ID" type="text" data-null="false" data-error-message="'아이디'" value="${cookie['save-me'].value}">
							</li>
							<li>
								<label for="sso-pw">비밀번호</label>
								<input id="sso-pw" type="password"  data-null="false" data-error-message="'비밀번호'">
							</li>
							<li class="remember">
								<label for="save-me">
									<input type="checkbox" id="save-me" name="save-me" <c:if test="${fn:trim(cookie['save-me'].value)!='' }">checked="checked"</c:if>> 아이디 저장
								</label>
							</li>
						</ul>
						<button type="submit">로그인</button>
					</div>
					<input type="hidden" name="SYS_CD" value="S">
					<input type="hidden" name="CUR_URL" value="${param.returnPage }">
					<input type="hidden" name="SYS_URL" value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${ctx }/kosis/loginprocess.sgis">
					<input type="hidden" name="SID_IP_ADDR">
					<input type="hidden" name="SSN_INFO">
				</fieldset>
			</form>
		</div>
	</div>
	<c:if test="${fn:trim(errorMessage)!='' }">
		<script>
			messageAlert.open("알림","${errorMessage}");
		</script>
		<c:set var="errorMessage" value="" scope="session"/>
	</c:if>
</body>
</html>
