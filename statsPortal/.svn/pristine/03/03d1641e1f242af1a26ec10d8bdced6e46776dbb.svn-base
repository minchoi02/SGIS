<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="org.springframework.core.io.ClassPathResource" %> 
<%@ page import="org.springframework.core.io.support.PropertiesLoaderUtils" %> 
<%@ page import="java.util.Properties" %>

<%	
	// 세션에서 필요한 정보를 가져온다.
	HttpSession httpSession = request.getSession();
	String strSsnInfo = (String)httpSession.getAttribute("ssn_info");
	String strIpAddress = (String)httpSession.getAttribute("sid_ip_addr");
	// 2016.12.02 시큐어코딩 삭제
%>
<!-- djlee 2019-07-15 수정 시작 -->
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>로그인|통계지리정보서비스</title>
		<script type="text/javascript">
			var reqMemberLogin = function(cur_url) {
				var form = document.getElementById("loginForm")
				form.SYS_URL.value = window.location.protocol+"//"+window.location.host + "/view/authorization/login";
				form.CUR_URL.value = cur_url;
				form.target = "_parent";
				form.submit();
			} 
		</script>
	</head>
	<body>
		<form action="https://kosis.kr/oneid/cmmn/login/LoginView.do" method="post" id="loginForm" name="loginForm">
			<input type="hidden" id="CUR_URL" name="CUR_URL" />
			<input type="hidden" id="SYS_URL" name="SYS_URL" />
			<input type="hidden" id="SYS_CD" name="SYS_CD" value="S" />
			<input type="hidden" id="SID_IP_ADDR" name="SID_IP_ADDR" value="<%=strIpAddress %>" />
			<input type="hidden" id="SSN_INFO" name="SSN_INFO" value="<%=strSsnInfo %>" />
		</form>
	</body>
</html>
<!-- djlee 2019-07-15 수정 끝 -->