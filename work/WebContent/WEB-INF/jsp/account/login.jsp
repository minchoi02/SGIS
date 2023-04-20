<%
/**************************************************************************************************************************
* Program Name  : 로그인 JSP
* File Name     : login.jsp
* Comment       :
* History       : 네이버시스템 2018-01-29
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- Top Include -->

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>통합DB 시스템</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/common.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/login/login.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/dialog/dialog.css" />
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/plugins/jquery.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/dialog/dialog.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/aes/AesUtil.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/aes/aes.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/aes/pdkdf2.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/common.js"></script>
    <script src="${pageContext.request.contextPath}/js/account/login.js"></script>
</head>

<body>
	<div class="wrap">
			<div class="loginWrap">
				<div class="login">
					<img src="${pageContext.request.contextPath}/img/login/login.png" alt=""/>
					<div id="loginBox" class="loginArea" >
						<ul class="loginForm" >
							<li>
								<!--   select name="id" id="id">
										<option value="kostat" selected>업무용DB</option>
										<option value="saupche">사업체DB</option>
										<option value="infosupply">자료제공</option>
								</select -->
								<input type="id"  id="id" name="id" value="" placeholder="사용자 ID" tabindex="1" />
								<input type="password"  id="pwd" name="pwd" value="" placeholder="비밀번호" tabindex="2" />
								<button id="login" >로그인</button>
								<span id="signUp"><a href="${pageContext.request.contextPath}/view/auth/signUp';">사용신청</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div><!-- wrap end-->
</body>
</html>