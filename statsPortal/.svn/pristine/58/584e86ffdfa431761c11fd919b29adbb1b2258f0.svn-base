<%
/**************************************************************************************************************************
* Program Name  : SSO 세션 결과 수신 JSP  
* File Name     : returnAuth.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-07-29
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="kostat.sop.ServiceAPI.common.util.StringUtil"       %>
<%
	System.out.println("returnAuth");
//==============운영============ 운영올릴때 주석제거 요망
	
	String strSsnInfo = request.getParameter("SSN_INFO");			//통합이용자 접속 세션 ID
	if ( strSsnInfo != null  ){  
		strSsnInfo = strSsnInfo.replaceAll("<","&lt;");  
		strSsnInfo = strSsnInfo.replaceAll(">","&gt;"); 
	}
	
	String strUsrId = request.getParameter("USR_ID");				//통합이용자 아이디
	if ( strUsrId != null  ){  
		strUsrId = strUsrId.replaceAll("<","&lt;");  
		strUsrId = strUsrId.replaceAll(">","&gt;"); 
	}
	
	String strUsrName = request.getParameter("USR_NAME");			//통합이용자 이름
	if ( strUsrName != null  ){  
		strUsrName = strUsrName.replaceAll("<","&lt;");  
		strUsrName = strUsrName.replaceAll(">","&gt;"); 
	}
	
	String strIpAddress = request.getParameter("SID_IP_ADDR");	 	//통합이용자 접속 아이디
	if ( strIpAddress != null  ){  
		strIpAddress = strIpAddress.replaceAll("<","&lt;");  
		strIpAddress = strIpAddress.replaceAll(">","&gt;"); 
	}
	
	String strUsrSn = request.getParameter("USR_SN");	 			//통합이용자 번호
	if ( strUsrSn != null  ){  
		strUsrSn = strUsrSn.replaceAll("<","&lt;");  
		strUsrSn = strUsrSn.replaceAll(">","&gt;"); 
	}
	
	String strUsrPw = request.getParameter("USR_PW");	 			//통합이용자 비밀번호
	if ( strUsrPw != null  ){  
		strUsrPw = strUsrPw.replaceAll("<","&lt;");  
		strUsrPw = strUsrPw.replaceAll(">","&gt;"); 
	}
	
	String strUsrGubun = request.getParameter("USR_GUBUN");	 		//통합이용자 구분 (N : 신규, K, M, S, E : 통합전환)
	if ( strUsrGubun != null  ){  
		strUsrGubun = strUsrGubun.replaceAll("<","&lt;");  
		strUsrGubun = strUsrGubun.replaceAll(">","&gt;"); 
	}
	
	String strLoginYN = request.getParameter("LOGIN_YN");			//로그인 여부
	if ( strLoginYN != null  ){  
		strLoginYN = strLoginYN.replaceAll("<","&lt;");  
		strLoginYN = strLoginYN.replaceAll(">","&gt;"); 
	}
	
	String strUsrBirth = request.getParameter("USR_BIRTHDAY");		//통합이용자 생년월일
	if ( strUsrBirth != null  ){  
		strUsrBirth = strUsrBirth.replaceAll("<","&lt;");  
		strUsrBirth = strUsrBirth.replaceAll(">","&gt;"); 
	}
	
	String strPhoneNo = request.getParameter("USR_MOBILE");			//핸드폰번호
	if ( strPhoneNo != null  ){  
		strPhoneNo = strPhoneNo.replaceAll("<","&lt;");  
		strPhoneNo = strPhoneNo.replaceAll(">","&gt;"); 
	}
	
	String strEmail = request.getParameter("USR_EMAIL");			//이메일
	if ( strEmail != null  ){  
		strEmail = strEmail.replaceAll("<","&lt;");  
		strEmail = strEmail.replaceAll(">","&gt;"); 
	}
	
	String strMemberId = "";
	String strIntgrLoginYn = "N";

//		 strUsrId = "nestsoft2013";				//통합이용자 아이디
 		 //strUsrId = "";				//통합이용자 아이디
	
	//==============로컬============ 운영올릴때 주석처리 요망
	/*	String strSsnInfo = "strSsnInfo";			//통합이용자 접속 세션 ID
		String strUsrId = "member_id";				//통합이용자 아이디
		String strUsrName = "유지보수";			//통합이용자 이름
		String strIpAddress = "strIpAddress";	 	//통합이용자 접속 아이디
		String strUsrSn = "strUsrSn";	 			//통합이용자 번호
		String strUsrPw = "strUsrPw";	 			//통합이용자 비밀번호
		String strUsrGubun = "N";	 		//통합이용자 구분 (N : 신규, K, M, S, E : 통합전환)
		String strLoginYN = "Y";			//로그인 여부
		String strUsrBirth = "19731111";		//통합이용자 생년월일
		String strPhoneNo = "0101234567";			//핸드폰번호
		String strEmail = "sgis@email.com";			//이메일
		String strMemberId = "member_id";
		String strIntgrLoginYn = "N"; */
	
	
	//인코딩 변경
	if(strUsrName != null) {
		strUsrName = StringUtil.encodingChange(request, strUsrName);	
	}
		
	HttpSession httpSession = request.getSession();
	try {	
	httpSession.setAttribute("ssn_info", strSsnInfo);
	httpSession.setAttribute("sid_ip_addr", strIpAddress);
	
	if (strUsrId!=null&&strUsrId.length() > 0) {
		httpSession.setAttribute("member_id", strUsrId);
		httpSession.setAttribute("member_pw", strUsrPw);
		httpSession.setAttribute("member_nm", strUsrName);
		httpSession.setAttribute("member_sn", strUsrSn);	
		httpSession.setAttribute("member_gubun", strUsrGubun);
		httpSession.setAttribute("login_yn", strLoginYN);
		httpSession.setAttribute("intgr_login_yn", "Y");
		httpSession.setAttribute("birth", strUsrBirth);	
		httpSession.setAttribute("cp_no", strPhoneNo);
		httpSession.setAttribute("sc_telephone", strPhoneNo);
		httpSession.setAttribute("email", strEmail);
		httpSession.setAttribute("sc_email", strEmail);
	}

	//통합회원인지 기존회원인지 구분(N:기존회원, Y:통합회원)
	if(httpSession.getAttribute("intgr_login_yn") != null && 
	   httpSession.getAttribute("intgr_login_yn").toString().length() > 0) {
		strIntgrLoginYn = httpSession.getAttribute("intgr_login_yn").toString();
		if ( strIntgrLoginYn != null  ){  
			strIntgrLoginYn = strIntgrLoginYn.replaceAll("<","&lt;");  
			strIntgrLoginYn = strIntgrLoginYn.replaceAll(">","&gt;"); 
		}
	}
	
	if (httpSession.getAttribute("member_id") != null) {
		strMemberId = httpSession.getAttribute("member_id").toString();
		if ( strMemberId != null  ){  
			strMemberId = strMemberId.replaceAll("<","&lt;");  
			strMemberId = strMemberId.replaceAll(">","&gt;"); 
		}
		}
		//다른 서비스에서 통합회원 로그아웃을 하고
	    //우리쪽에 넘어왔을 경우, 세션을 제거한다.
		if (strIntgrLoginYn.equals("Y")) {
			if (strUsrId.length() == 0) {
				httpSession.removeAttribute("member_id");
				httpSession.removeAttribute("member_pw");
				httpSession.removeAttribute("member_sn");
				httpSession.removeAttribute("login_yn");
				httpSession.removeAttribute("member_nm");
				httpSession.removeAttribute("member_gubun");
				httpSession.removeAttribute("intgr_login_yn");
				httpSession.removeAttribute("birth");
				httpSession.removeAttribute("cp_no");
				httpSession.removeAttribute("sc_telephone");
				httpSession.removeAttribute("email");
				httpSession.removeAttribute("sc_email");
			}
		}
	}catch (IllegalArgumentException e) {
		System.out.println("입력값 오류가 발생하였습니다.");
	}catch (Exception e) {
		System.out.println("처리중 오류가 발생하였습니다.");
	}
%>
<!-- djlee 2019-07-15 수정 시작 -->
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>SSO 세션 결과 수신|통계지리정보서비스</title>
		<script type="text/javascript">
			window.onload = function(){
				
				// djlee 수정 분석 지도 로그인 문제 2019-07-23 시작
				if(parent.document.getElementById("loginFrame")){
					parent.document.getElementById("loginFrame").src = "/html/authorization/login.jsp";
				}
				if(parent.document.getElementById("logoutFrame")){
					parent.document.getElementById("logoutFrame").src = "/html/authorization/logout.jsp";
				}
				if(parent.document.getElementById("registerFrame")){
					parent.document.getElementById("registerFrame").src = "/html/authorization/memberRegister.jsp";
				}
				if(parent.document.getElementById("unRegisterFrame")){
					parent.document.getElementById("unRegisterFrame").src = "/html/authorization/memberUnRegister.jsp";
				}
				if(parent.document.getElementById("modifyFrame")){
					parent.document.getElementById("modifyFrame").src = "/html/authorization/memberModify.jsp";
				}
				// djlee 수정 분석 지도 로그인 문제 2019-07-23 끝
				
				<%
					//통합인증 로그인 상태
					if(httpSession.getAttribute("member_id") != null && httpSession.getAttribute("member_id").toString().length() > 0) {
				%>
						AuthInfo = {
							authStatus : true,
							member_id : "<%= strMemberId %>",
							intgrLoginYN : "<%= strIntgrLoginYn %>",
							ipAddress : "<%= strIpAddress %>",
							ssnInfo : "<%= strSsnInfo %>"
						}
				<%
					} else {	//비로그인
				%>
						AuthInfo = {
							authStatus : false,
							member_id : "<%= strMemberId %>",
							intgrLoginYN : "",
							ipAddress : "<%= strIpAddress %>",
							ssnInfo : "<%= strSsnInfo %>"
						}
						//<!-- //2015-09-10 수정 -->
						if((parent.location.href).indexOf("/view/mypage/") > -1) {
							//parent.location.href = "/view/member/login_new?returnPage=/";
							parent.location.href = "/view/member/login_new?returnPage=" + parent.location.href;
							return;//미로그인 시 "나의 데이터 이동" 클릭하면 서버에러화면을 잠깐 보여주고 로그인화면으로 이동함 에러 해결   /*2019-03-18 박길섭 */
						}
				<%
					}
				%>
				
				if (parent != undefined && parent != null) {
					if (typeof parent.setSession !== "undefined") { 
						parent.setSession(AuthInfo);
					}
				}
				
			}
		</script>
	</head>
</html>
<!-- djlee 2019-07-15 수정 끝 -->