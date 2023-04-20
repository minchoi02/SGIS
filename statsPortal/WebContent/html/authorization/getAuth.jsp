<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="org.springframework.core.io.ClassPathResource" %> 
<%@ page import="org.springframework.core.io.support.PropertiesLoaderUtils" %> 
<%@ page import="java.util.Properties" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- djlee 2019-07-15 수정 시작 -->
<!DOCTYPE>
<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>사용자인증|통계지리정보서비스</title>
	</head>
	<body>
		<form action="https://kosis.kr/oneid/cmmn/login/ConnectStatItgrSvr.do" method="post" id="authForm" name="authForm">
			<input type="hidden" id="SYS_URL" name="SYS_URL" />
			<input type="hidden" id="SYS_CD" name="SYS_CD" value="S" />
		</form>
		<script type="text/javascript">
 			document.getElementById("authForm").SYS_URL.value = window.location.protocol+"//"+window.location.host + "/view/service";
 			document.getElementById("authForm").submit();
 		</script> 
	</body>
</html>
<!-- djlee 2019-07-15 수정 끝 -->