<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="org.springframework.core.io.ClassPathResource" %> 
<%@ page import="org.springframework.core.io.support.PropertiesLoaderUtils" %> 
<%@ page import="java.util.Properties" %>

<%
	// 세션에서 필요한 정보를 가져온다.
	HttpSession httpSession = request.getSession();
	String strSsnInfo = (String)httpSession.getAttribute("ssn_info");
	String strIpAddress = (String)httpSession.getAttribute("sid_ip_addr");
	String strUsrSn = (String)httpSession.getAttribute("member_sn");
	String strUsrId = (String)httpSession.getAttribute("member_id");
	String strUsrPw = (String)httpSession.getAttribute("member_pw");
	String strUsrGubun = (String)httpSession.getAttribute("member_gubun");
	String strIntgrLoginYn = (String)httpSession.getAttribute("intgr_login_yn");	
%>
<!-- djlee 2019-07-15 수정 시작 -->
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>로그아웃|통계지리정보서비스</title>
		<script type="text/javascript">
			var reqMemberLogout = function(cur_url) {
				var t = document.getElementById("logoutForm");
				t.CUR_URL.value= window.location.protocol+"//"+window.location.host + cur_url;
				t.SYS_URL.value= window.location.protocol+"//"+window.location.host + "/view/authorization/logout";
			//	t.submit();
				
				
			/* 	
				console.log("reqMemberLogout");
				$("#logoutForm").find($("#CUR_URL")).val(window.location.protocol+"//"+window.location.host + cur_url);
				$("#logoutForm").find($("#SYS_URL")).val(window.location.protocol+"//"+window.location.host + "/view/authorization/logout");
				//$("#logoutForm").submit();
				*/
				
				var cur_url = t.CUR_URL.value;
				var sys_url = t.SYS_URL.value;
				var sys_cd = t.SYS_CD.value;
				var login_yn = t.LOGIN_YN.value;
				var sid_ip_addr = t.SID_IP_ADDR.value;
				var ssn_info = t.SSN_INFO.value;
				var usr_sn = t.USR_SN.value;
				var usr_id = t.USR_ID.value;
				var usr_pw = t.USR_PW.value; 

				parent.memberLogout2(cur_url, sys_url, sys_cd, login_yn, sid_ip_addr, ssn_info, usr_sn, usr_id, usr_pw);

				
				
			} 
		</script>
	</head>
	<body>
		<form action="https://kosis.kr/oneid/cmmn/login/ActionLogout.do" method="post" id="logoutForm" name="logoutForm">
			<input type="hidden" id="CUR_URL" name="CUR_URL" />
			<input type="hidden" id="SYS_URL" name="SYS_URL" />
			<input type="hidden" id="SYS_CD" name="SYS_CD" value="S" />
			<input type="hidden" id="LOGIN_YN" name="LOGIN_YN" value="Y" />
			<input type="hidden" id="SID_IP_ADDR" name="SID_IP_ADDR" value="<%=strIpAddress %>" />
			<input type="hidden" id="SSN_INFO" name="SSN_INFO" value="<%=strSsnInfo %>" />
			<input type="hidden" id="USR_SN" name="USR_SN" value="<%=strUsrSn %>" />
			<input type="hidden" id="USR_ID" name="USR_ID" value="<%=strUsrId %>" />
			<input type="hidden" id="USR_PW" name="USR_PW" value="<%=strUsrPw %>" />
		</form>
	</body>
</html>
<!-- djlee 2019-07-15 수정 끝 -->