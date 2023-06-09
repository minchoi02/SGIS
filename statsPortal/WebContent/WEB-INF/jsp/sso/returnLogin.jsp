<%
/**************************************************************************************************************************
* Program Name  : 로그인 결과 수신 JSP  
* File Name     : returnLogin.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-07-29
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String strSsnInfo = request.getParameter("SSN_INFO");			//통합이용자 접속 세션 ID
	String strUsrId = request.getParameter("USR_ID");				//통합이용자 아이디
	String strUsrPw = request.getParameter("USR_PW");				//통합이용자 패스워드
	String strUsrName = request.getParameter("USR_NAME");			//통합이용자 이름
	String strUsrSn = request.getParameter("USR_SN");	 			//통합이용자 번호
	String strUsrGubun = request.getParameter("USR_GUBUN");	 		//통합이용자 구분 (N : 신규, K, M, S, E : 통합전환)
	String strIpAddress = request.getParameter("SID_IP_ADDR");	 	//통합이용자 접속 아이디
	String strCurUrl = request.getParameter("CUR_URL");				//이동할 페이지주소 ,     //link.kostat.go.kr/view/index (앞 슬레시 포함해서)
	
	//mng_s 20200522 이진호
	//CurUrl 파라미터 변조 하여 로그인시 다른 사이트로 넘어가는 것 방지
	if(strCurUrl.indexOf("sgis.kostat.go.kr") > -1 || strCurUrl.indexOf("link.kostat.go.kr") > -1){
		strCurUrl = request.getParameter("CUR_URL");
	}else{
		strCurUrl = "//sgis.kostat.go.kr/view/index";
	}
	//mng_e 20200522 이진호
	
	String strLoginYN = request.getParameter("LOGIN_YN");			//로그인 여부
	String strUsrBirth = request.getParameter("USR_BIRTHDAY");		//통합이용자 생년월일
	String strPhoneNo = request.getParameter("USR_MOBILE");			//핸드폰번호
	String strEmail = request.getParameter("USR_EMAIL");			//이메일
	
	
	HttpSession httpSession = request.getSession();
	httpSession.setAttribute("member_id", strUsrId);
	httpSession.setAttribute("member_pw", strUsrPw);
	httpSession.setAttribute("member_sn", strUsrSn);
	httpSession.setAttribute("member_nm", strUsrName);
	httpSession.setAttribute("member_gubun", strUsrGubun);
	httpSession.setAttribute("login_yn", strLoginYN);
	httpSession.setAttribute("ssn_info", strSsnInfo);
	httpSession.setAttribute("sid_ip_addr", strIpAddress);
	httpSession.setAttribute("birth", strUsrBirth);
	httpSession.setAttribute("cp_no", strPhoneNo);
	httpSession.setAttribute("sc_telephone", strPhoneNo);
	httpSession.setAttribute("email", strEmail);
	httpSession.setAttribute("sc_email", strEmail);
	
%>
<!DOCTYPE>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
		<script type="text/javascript">
			$(document).ready(function() {
				$("#successLoginForm").attr("target", "_parent");
				$("#successLoginForm").submit();
			});
		</script>
	</head>
	<body>
		
		<form action="<%=strCurUrl %>" method="post" id="successLoginForm" name="successLoginForm">
		</form>
	</body>
</html>