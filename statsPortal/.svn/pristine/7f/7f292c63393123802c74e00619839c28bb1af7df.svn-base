<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
    
    	//======================== 테스트용 세션값 세팅 운영 갈때 주석 요망 ============================
    	//session.setAttribute("ss_grant_state", "ASSENT");
    	//session.setAttribute("ss_school_grade", "H");
//     	session.setAttribute("member_id", "bombjak1");
    	//session.setAttribute("member_id", "USER3");
    	//session.setAttribute("member_id", "USER2");
    	//=====================================================================================
    
		response.setHeader("Cache-Control","no-store");   
		response.setHeader("Pragma","no-cache");   
		response.setDateHeader("Expires",0);   
		if (request.getProtocol().equals("HTTP/1.1")) response.setHeader("Cache-Control", "no-cache");
		
		
		String param_ss_page_info = request.getParameter("param_ss_page_info")==null? "S":request.getParameter("param_ss_page_info"); //파라미터가 널일 경우 배우는지도(S)를 디폴트로 세팅한다. 그렇지 않으면 쿼리에서 문제가 생김 
		if("T".equals(param_ss_page_info)) {
			session.setAttribute("ss_page_info", "T");
		} else if ("S".equals(param_ss_page_info)) {
			session.setAttribute("ss_page_info", "S");
		} 
		
		String ss_school_grade = session.getAttribute("ss_school_grade")==null?"":(String)session.getAttribute("ss_school_grade"); //mng_s 20210802
		String ss_grant_state  = session.getAttribute("ss_grant_state")==null?"":(String)session.getAttribute("ss_grant_state"); //mng_s 20210802
		String ss_page_info    = session.getAttribute("ss_page_info")==null?"":(String)session.getAttribute("ss_page_info"); //mng_s 20210802
		String ss_member_id    = session.getAttribute("member_id")==null?"":(String)session.getAttribute("member_id");
		
%>   
<script type="text/javascript" src="/sgis_edu/resource/js/ele/header.js"></script>

<header>
		<input type="hidden" value="${ss_school_level}" id="school_grade"/>
        <div class="inner">
            <div class="goWrap">
<!--                 <a href="https://sgis.kostat.go.kr/view/index" target="_blank"><img src="/sgis_edu/resource/images/img_sgis.png"></a> -->
                <a href="/view/edu/index" class="goSgis"><img src="/sgis_edu/resource/images/logo.png"></a>
                <a href="/view/edu/ele/main" class="goClass">초등</a>
            </div>
            <nav>
                <ul>
                    <li>
                        <a href="javascript:logWriteAndMove('/view/edu/ele/classList?thema_id=E01','T0','02','02','01','E','thema_id=E01',false)" >수업하기</a>
                        <ul class="depth" id="themaList">
                            <li><a href="">1</a></li>
                            <li><a href="">2</a></li>
                            <li><a href="">3</a></li>
                        </ul>
                    </li>
                    <li>
                   <%
	            		if ("ASSENT".equals(ss_grant_state) ) { //승인상태가 아니면 배우는 지도 보여준다.
                			out.println("<a href=\"javascript:logWriteAndMove('/view/edu_gallery/resultGallery?param_ss_page_info=T&param_ss_school_grade=E','T0','02','02','02','E','')\">함께하기</a>");
	            		} else {
	            			out.println("<a href=\"javascript:logWriteAndMove('/view/edu_gallery/resultGallery?param_ss_page_info=S&param_ss_school_grade=E','T0','02','02','02','E','')\">함께하기</a>");
	            		}
	                %>
                   
                        <ul class="depth">
<!--                             <li><a href="/view/edu_gallery/resultGallery?param_ss_page_info=T">가르치는 지도</a></li> -->
<!--                             <li><a href="/view/edu_gallery/resultGallery?param_ss_page_info=S">배우는 지도</a></li> -->
                        <%
		            		if ("ASSENT".equals(ss_grant_state) ) { //승인상태가 아니면 배우는 지도만 보여준다.
		                			out.println("<li><a href=\"javascript:logWriteAndMove('/view/edu_gallery/resultGallery?param_ss_page_info=T&param_ss_school_grade=E','T0','02','02','02','E','param_ss_page_info=T')\" class=\"on\">가르치는 지도</a></li>");
		                			out.println("<li><a href=\"javascript:logWriteAndMove('/view/edu_gallery/resultGallery?param_ss_page_info=S&param_ss_school_grade=E','T0','02','02','02','E','param_ss_page_info=S')\" >배우는 지도</a></li>");
		            		} else {
		            			out.println("<li><a href=\"javascript:logWriteAndMove('/view/edu_gallery/resultGallery?param_ss_page_info=S&param_ss_school_grade=E','T0','02','02','02','E','param_ss_page_info=S')\" class=\"on\">배우는 지도</a></li>");
		            		}
		                %>
                            <li><a href="javascript:logWriteAndMove('/view/edu/ele/community/together_list','T0','02','02','02','E','')">함께하는 지도</a></li>
		                </ul>
                    </li>
                    <li><a href="javascript:logWriteAndMove('/view/edu/ele/myself/gallery','T0','02','02','03','E')">스스로하기</a>
		            <ul class="depth">
		                <li><a href="javascript:logWriteAndMove('/view/edu/ele/myself/gallery','T0','02','02','03','E','ctgr=gallery',false)">통계갤러리 살펴보기</a></li>
		                <li><a href="javascript:logWriteAndMove('/view/edu/ele/myself/mapExp','T0','02','02','03','E','ctgr=mapExp',false)">통계지도 체험하기</a></li>
		                <li><a href="javascript:logWriteAndMove('/view/edu/ele/myself/myData','T0','02','02','03','E','ctgr=myData',false)">나만의 통계지도 만들기</a></li>
		            </ul>
                    </li>
                    <li>
                        <a href="javascript:logWriteAndMove('/view/edu/ele/issueList?issue_id=IS_01','T0','02','02','04','E','issue_id=IS_01')">주제보기</a>
                        <ul class="depth" id="issueList">
                            <li><a href="">이슈1</a></li>
                            <li><a href="">이슈2</a></li>
                            <li><a href="">이슈3</a></li>
                        </ul>
                    </li>
                    <li>
                    	<a href="javascript:logWriteAndMove('/view/edu/ele/boardList?board_cd=BOARD_012','R0','03','02','05','E','')">소식듣기</a>
                        <ul class="depth">
                            <li><a href="javascript:logWriteAndMove('/view/edu/ele/boardList?board_cd=BOARD_012','T0','02','02','05','E','board_cd=BOARD_012')">에듀소식</a></li>
                            <li><a href="javascript:logWriteAndMove('/view/edu/ele/boardList?board_cd=BOARD_013','T0','02','02','05','E','board_cd=BOARD_013')">궁금해요</a></li>
                            <li><a href="javascript:logWriteAndMove('/view/edu/ele/boardList?board_cd=BOARD_014','T0','02','02','05','E','board_cd=BOARD_014')">질문하기</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div class="loginWrap">
                <a href="javascript:goSelectLogin()">로그인</a>
            </div>
        </div>
        <div class="headerBg"></div>
        <iframe id="authFrame" width="0" height="0" style="border:0px;" title="SSO인증"></iframe>				<!--// SSO인증 -->
		<iframe id="registerFrame" width="0" height="0" style="border:0px;" title="회원가입"></iframe>					<!--// 회원가입 -->
		<iframe id="unRegisterFrame" width="0" height="0" style="border:0px;" title="회원탈퇴"></iframe>				<!--// 회원탈퇴 -->
		<iframe id="loginFrame" width="0" height="0" style="border:0px;" title="로그인"></iframe>					<!--// 로그인 -->
		<iframe id="logoutFrame" width="0" height="0" style="border:0px;" title="로그아웃" src="/html/authorization/logout.jsp"></iframe>					<!--// 로그아웃 -->
		<iframe id="modifyFrame" width="0" height="0" style="border:0px;" title="회원수정"></iframe>					<!--// 회원수정 -->
		<iframe id="sessionCheck" name="sessionCheck" width="0" height="0" style="border:0px;" title="세션체크"></iframe> <!--// 세션체크 -->
    </header>

