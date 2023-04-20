<%
/**************************************************************************************************************************
* Program Name  : 하단 Footer JSP  
* File Name     : includeBottom.jsp
* Comment       : 
* History       : 네이버시스템 김성현 2015-09-22
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:choose>
<c:when test="${ type == 'hidden' }">
	<div class="relaHidden">
		<!-- mng_s  주석내용 웹표준 src 제거 2017.08.09 이경현 -->
		<iframe id="authFrame" width="0" height="0" style="border:0px;" title="SSO인증"></iframe>				<!--// SSO인증 -->
		<iframe id="registerFrame" width="0" height="0" style="border:0px;" title="회원가입"></iframe>					<!--// 회원가입 -->
		<iframe id="unRegisterFrame" width="0" height="0" style="border:0px;" title="회원탈퇴"></iframe>				<!--// 회원탈퇴 -->
		<iframe id="loginFrame" width="0" height="0" style="border:0px;" title="로그인"></iframe>					<!--// 로그인 -->
		<iframe id="logoutFrame" width="0" height="0" style="border:0px;" title="로그아웃"></iframe>					<!--// 로그아웃 -->
		<iframe id="modifyFrame" width="0" height="0" style="border:0px;" title="회원수정"></iframe>					<!--// 회원수정 -->
		<iframe id="sessionCheck" name="sessionCheck" width="0" height="0" style="border:0px;" title="세션체크"></iframe> <!--// 세션체크 -->
		<!-- mng_e 주석내용 웹표준 src 제거 2017.08.09 이경현 -->
	</div>
</c:when>
<c:otherwise>
	<script src="/js/common/includeBottom.js"></script> <!--2017.12.12 [개발팀] 접근성 조치  -->
    <div>
        <div class="companyInfo inner">
            <p><img src="/publish_2018/include/images/common/img_statistical.png" alt="통계청"></p>
            <p><a href="//www.innogov.go.kr" target="_blank"><img src="/images/main/new_pic.png" alt="보다나은정부" style="margin-left:7px;"></a></p>
            <div>
                <ul class="textLink clearFix">
                    <li><a href="javascript:logWriteAndMove('A0', '05', '13', '00', '', '', '/view/member/personalInfo', false);" style="color:#1878cc">개인정보처리방침</a></li>
                    <li><a href="javascript:logWriteAndMove('A0', '05', '14', '00', '', '', '/view/member/clause', false);">이용약관</a></li>
                    <li><a href="javascript:logWriteAndMove('A0', '05', '18', '00', '', '', '/jsp/member/copyright.jsp', false);">저작권 정책</a></li>
                    <li><a href="javascript:logWriteAndMove('A0', '05', '15', '00', '', '', '/view/member/emailInfo', false);">이메일무단수집거부</a></li>
                </ul>
                <div class="address ">
                    <address>(35208) 대전광역시 서구 청사로 189 (둔산동, 정부대전청사 3동)</address>
                    <ul class="clearFix">
                        <li><a href="tel:02-2012-9114">통계청콜센터 : 02)2012-9114</a></li>
                        <li><a href="tel:042-481-2248">관리자 : 042)481-2248</a></li>
                        <li><a href="tel:042-481-2438">자료제공담당자 : 042)481-2438</a></li>
                    </ul>
                    <p class="copyright">Copyright Statistics Korea. All rights reserved. </p>
                </div>
                
                <!-- mng_s 20210615 이진호, 웹 접근성 검사 오류 수정 -->
                <!-- select 태그를 label로 감싸서 해결 -->
                <label>
	                <select name="service_page" id="service_page" style="padding:3px;">
	                    <option value="">&nbsp;통계청 주요서비스</option>
	                    <option value="https://www.kostat.go.kr">&nbsp;통계청 홈페이지</option>
	                    <option value="https://kosis.kr">&nbsp;국가통계포털</option>
	                    <option value="https://mdis.kostat.go.kr">&nbsp;마이크로데이터</option>
	                    <option value="https://www.index.go.kr">&nbsp;e-나라지표</option>
	                    <option value="https://meta.narastat.kr">&nbsp;통계설명자료</option>
	                    <option value="https://kssc.kostat.go.kr:8443/ksscNew_web/index.jsp">&nbsp;통계분류포털</option>
	                </select>
                </label>
                <!-- mng_e 20210615 이진호 -->
            </div>
        </div>
    </div>
   	<!-- mng_s  주석내용 웹표준 src 제거 2017.08.09 이경현 -->
	<iframe id="authFrame" width="0" height="0" style="border:0px;" title="SSO인증"></iframe>				<!--// SSO인증 -->
	<iframe id="registerFrame" width="0" height="0" style="border:0px;" title="회원가입"></iframe>					<!--// 회원가입 -->
	<iframe id="unRegisterFrame" width="0" height="0" style="border:0px;" title="회원탈퇴"></iframe>				<!--// 회원탈퇴 -->
	<iframe id="loginFrame" width="0" height="0" style="border:0px;" title="로그인"></iframe>					<!--// 로그인 -->
	<iframe id="logoutFrame" width="0" height="0" style="border:0px;" title="로그아웃"></iframe>					<!--// 로그아웃 -->
	<iframe id="modifyFrame" width="0" height="0" style="border:0px;" title="회원수정"></iframe>					<!--// 회원수정 -->
	<iframe id="sessionCheck" name="sessionCheck" width="0" height="0" style="border:0px;" title="세션체크"></iframe> 
	<!-- mng_e  주석내용 웹표준 src 제거 2017.08.09 이경현 -->
 	<!--//footer-->
   	
   	<!-- mng_s 20200716 이금은. 메인페이지에만 'My통계로' quick버튼 추가 -->
   	<script src="/js/plugins/jquery.scrollfollow.js"></script> 
	<script>
	var img_top;	
	$(document).ready(function(){	
		
		if((document.location.pathname).indexOf("/view/index") == 0
				|| (document.location.pathname).indexOf("/view/thematicMap/categoryList") == 0
				|| (document.location.pathname).indexOf("/view/map/interactiveMapMain") == 0
				|| (document.location.pathname).indexOf("/view/common/serviceMain") == 0
				|| (document.location.pathname).indexOf("/view/common/analMapMain") == 0
 				|| (document.location.pathname).indexOf("/contents/shortcut/shortcut_05_02.jsp") == 0
				|| (document.location.pathname).indexOf("/view/board/sopBoardMain") == 0
				){
			$(".btnMyTGR").css("display","block");
		}else{
			$(".btnMyTGR").css("display","none");
		}	

 		resizeQuickButton(); 
	}); 
	$(window).resize(function(){
 		resizeQuickButton(); 
	});
	function resizeQuickButton(){
		img_top = window.innerHeight / 2; 
  		$("#myTGR-area").css("top", img_top); 
		$("#myTGR-area").css("left", window.innerWidth / 2 + 536);
		$("#myTGR-area").css("border-top", "0px");
		$("#myTGR-area").scrollFollow({
			speed  : 750,    
			offset : img_top  // 화면 상단과의 간격  
		}); 
	}
	</script>
	<div id="myTGR-area" style="display:none"><!-- 20210225 박은식 화면에 실선이 생겨 none처리 -->
	    <p><a href="/view/statsMe/statsMeMain" class="btnMyTGR" style="display:none;"><span class="hidden">My통계로</span></a></p>
	</div>
   	<!-- mng_e 20200716 이금은. 메인페이지에만 'My통계로' quick버튼 추가 -->
   	   	
	<a href="#" class="btnTop"><span class="hidden">top</span></a>
</c:otherwise>
</c:choose>