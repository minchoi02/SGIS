<%
/**************************************************************************************************************************
* Program Name  : 메인 JSP  
* File Name     : index.jsp
* Comment       : 
* History       : 
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Map" %>

<%
	String userAgent = request.getHeader("User-Agent");
	String[] mobileOs = {"iPhone","iPod","BlackBerry","Android","Windows CE", "Nokia", "LG", "MOT", "SAMSUNG", "SonyEricsson", "Webos",
				"Mobile", "Symbian", "Opera Mobi", "Opera Mini", "IEmobile"};
	
	String param = request.getParameter("param");
	if(param == null || !param.equals("0")){
		int j = -1;
		if(userAgent != null && !userAgent.equals("")){
			for(int i = 0; i < mobileOs.length; i++){
				j = userAgent.indexOf(mobileOs[i]);
				if(j > -1 ){
					out.println("");
					out.println("");
					out.println("<script>");
					out.println("location.href='/mobile';");
					out.println("</script>");
					out.println("");
					out.println("");
					break;
				}
			}
		}
	}
%>

<%
    	//======================== 테스트용 세션값 세팅 운영 갈때 주석 요망 ============================
//     	session.setAttribute("ss_grant_state", "");
//     	session.setAttribute("member_id", "djlee92");
    	//session.setAttribute("member_id", "USER3");
    	//session.setAttribute("member_id", "USER2");
    	//=====================================================================================
    
		response.setHeader("Cache-Control","no-store");   
		response.setHeader("Pragma","no-cache");   
		response.setDateHeader("Expires",0);   
		if (request.getProtocol().equals("HTTP/1.1")) response.setHeader("Cache-Control", "no-cache");
		
		String ss_grant_state  = session.getAttribute("ss_grant_state")==null?"":(String)session.getAttribute("ss_grant_state"); //mng_s 20210802
		String ss_member_id  = session.getAttribute("member_id")==null?"":(String)session.getAttribute("member_id");
%>   
<!-- Top Include -->
<jsp:include page="/view/common/common"></jsp:include>
<!DOCTYPE html>
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"> -->
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/sgis_edu/resource/css/base.css">
    <link rel="stylesheet" href="/sgis_edu/resource/css/common.css">
    <link rel="stylesheet" href="/sgis_edu/resource/css/intro.css">
    <link rel="shortcut icon" href="/sgis_edu/resource/images/favicon.ico">

	<script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
	<script type="text/javascript" src='/js/plugins/jquery.form.js'></script>
	
	<script type="text/javascript" src="/js/plugins/jquery.sha256.js"></script>
	<script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
	<script type="text/javascript" src="/js/common/sop.portal.absAPI.js"></script>

	<script type="text/javascript" src="/js/common/common.js"></script>
	<script type="text/javascript" src="/sgis_edu/resource/js/common.js?ver=123"></script>
    <script type="text/javascript" src="/sgis_edu/resource/js/index.js?ver=123"></script>
    <title>SGIS 에듀</title>
	     
    <script>
		$(document).ready(function(){		

			function getCookie(name){
				var arg = name + "=";
				var alen = arg.length;
				var clen = document.cookie.length;
				var i = 0; while(i< clen)
				{
					var j = i + alen;
				    if(document.cookie.substring(i,j)==arg) {
				    	var end = document.cookie.indexOf(";",j);
				    	if(end == -1) end = document.cookie.length;
				    	return unescape(document.cookie.substring(j,end));
				    }
				    i=document.cookie.indexOf(" ",i)+1;
				    if (i==0) break;
				}
				return null;
			}
			
			function setCookie(name, value, expiredays) {					
				var todayDate = new Date();   
				todayDate.setDate(todayDate.getDate() + expiredays);
				//console.log("todayDate:::"+todayDate);
				document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toUTCString() + ";"				   
			}
			
			<% //설문조사  2022. 1. 11.(화)∼1. 21.(금)
			String bDate = "20220111"; 

			Calendar calendar = Calendar.getInstance();
			Date date = calendar.getTime();
			String today = (new SimpleDateFormat("yyyyMMdd").format(date));

			SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
			Date beginDate = formatter.parse( bDate );
			Date endDate = formatter.parse( today );

			long diff = endDate.getTime() - beginDate.getTime();
			long idx = ( diff / ( 24 * 60 * 60 * 1000 ) ) + 1;	
			
			if( idx >= 1 && idx <= 11 ) { %>
			//설문조사
			var url = '/html/survey/2022_1/survey.jsp';
			var options = 'toolbar=no,scrollbars=yes,resizable=no,copyhistory=no,'+
					  'status=no,location=no,menubar=no,width=820,height=1000,left=10,top=10'; 
			window.open(  url, 'surveyWin', options);
			<% } %>
		});
    </script>
</head>
<body class="main">
     <div class="inner intro">
        <p class="introTi">
            <em><img src="/sgis_edu/resource/images/logo.png"></em>
            <strong>통계지리정보의 시작</strong>
      </p>
      <section>
        <article class="ele">
            <a href="javascript:logWriteAndMove('/view/edu/ele/main','T0','01','02','00','E','')">
                <em>초등</em>
                <strong>초등학생을 위한 재미있는<br/>통계지리정보</strong>
                <button>바로가기</button>
            </a>
        </article>
        <article class="mid">
            <a href="javascript:logWriteAndMove('/view/edu/mid/main','T0','01','02','00','M','')">
                <em>중학</em>
                <strong>중학생을 위한 <br/>쉬운 통계지리정보</strong>
                <button>바로가기</button>
            </a>
        </article>
        <article class="high">
            <a href="javascript:logWriteAndMove('/view/edu/high/main','T0','01','02','00','H','')">
                <em>고교</em>
                <strong>고등학생을 위한<br/>핵심 통계지리정보</strong>
                <button>바로가기</button>
            </a>
        </article>
    </section>
    </div>
    <footer>
        <div class="inner">
        	<a href="javascript:logWriteAndMove('https://sgis.kostat.go.kr/view/index','T0','02','01','01','',false)"><img src="/sgis_edu/resource/images/img_sgis.png"></a>
            <div>
                <ul>
                    <li><a href="javascript:logWriteAndMove('https://sgis.kostat.go.kr/view/member/personalInfo','T0','02','01','02','',true)"  style="color:#1878cc;">개인정보처리방침</a></li>
                    <li><a href="https://sgis.kostat.go.kr/view/member/clause" target="_blank">이용약관</a></li>
                    <li><a href="https://sgis.kostat.go.kr/jsp/member/copyright.jsp" target="_blank">저작권 정책</a></li>
                    <li><a href="https://sgis.kostat.go.kr/view/member/emailInfo" target="_blank">이메일무단수집거부</a></li>
                </ul>
                <address>35208) 대전광역시 서구 청사로 189 (둔산동, 정부대전청사 3동) 통계청콜센터 : 02)2012-9114 관리자 : 042)481-2248 자료제공담당자 : 042)481-2438 <br/>
                    Copyright Statistics Korea. All rights reserved.</address>
            </div>
             <%
           		if (!"ASSENT".equals(ss_grant_state) && !"APPLCT".equals(ss_grant_state) ) { //승인상태가 아니면 등록신청 버튼 숨김.
         			out.println("<button class=\"btn btnN02\" id=\"applyPopupBtn\">교사 등록 신청하기</button>");
           		}
		     %>
        </div>
    </footer>
    <div class="popup">
        <section>
            <article>
                <em class="popTi">교사 등록 신청안내</em>
                <div class="row">
                    <i class="txt">함께하기 메뉴의 '가르칠 수 있는 지도' 는 교사 등록이 필요한 서비스입니다.<br/>
                    교사 등록 후 교안을 만들고, 학생들과 수업에 활용해 보세요.
                    </i>
                </div>
            </article>  
             
            <article>
                <em>회원정보</em>
                <div class="row">
                <%
           		if (!"".equals(ss_member_id)) {
           			out.println("<p style='margin-right:42px;'>신청ID</p>");
           			out.println("<input type='text' readonly='readonly' name='member_id' id='member_id' value='"+ss_member_id+"'/>");
           		} else {
           			out.println("<i class='txt'>SGIS 회원가입 후 로그인을 해주세요.</i>");
           			out.println("<button type='button' class='btn btnS02' onclick='javascript:goSelectLogin();' >SGIS 로그인</button>");
           		}
           	
            	%>
                </div>
            </article> 
            <article>
                <em>교사 정보 입력</em>
                <div class="row">
                      <form id="teacher">
                            <fieldset>
                                <div class="select selSido">
                                    <span>지역을 선택하세요</span><input type="checkbox" name="sel_sido_cd" id="sel_sido_cd" value=""><label for="sel_sido_cd" checked="checked"></label>
                                    <ul id="sidoList" style="overflow: scroll;height: 200px; width:200px;">
	                                    <li id="11">서울특별시</li>
	                                    <li id="21">부산광역시</li>
	                                    <li id="22">대구광역시</li>
	                                    <li id="23">인천광역시</li>
	                                    <li id="24">광주광역시</li>
	                                    <li id="25">대전광역시</li>
	                                    <li id="26">울산광역시</li>
	                                    <li id="29">세종특별자치시</li>
	                                    <li id="31">경기도</li>
	                                    <li id="32">강원도</li>
	                                    <li id="33">충청북도</li>
	                                    <li id="34">충청남도</li>
	                                    <li id="35">전라북도</li>
	                                    <li id="36">전라남도</li>
	                                    <li id="37">경상북도</li>
	                                    <li id="38">경상남도</li>
	                                    <li id="39">제주특별자치도</li>
                                    </ul>
                                </div>
                                <div class="select selSchool">
                                    <span>학교</span><input type="checkbox" id="sel_school_grade" name="sel_school_grade" value=""><label for="sel_school_grade"></label>
                                    <ul id="school_grade">
                                        <li id="E">초등</li>
                                        <li id="M">중학</li>
                                        <li id="H">고교</li>
                                    </ul>
                                </div>
                                <input type="text" name="subject" id="subject" placeholder="담당 과목을 입력하세요">
                            </fieldset>
                    </div>
                     <p id="inputAlert" class="alert" style="display:none;">지역, 학교등급, 담당 과목을 빠짐없이 입력해주세요.</p>
                     <p class="info">교사 등록 문의 042-481-2248</p>
            </article> 
            </form>
            <div class="btnWrap">
                <button type="button" class="btn btnN01">취소</button>
                <%
           		if ("APPLCT".equals(ss_grant_state) ) { 
         			out.println("<button type=\"button\" id=\"applyPopupBtn\" class=\"btn btnN02\" onclick=\"javascript:index.insertTeacher()\">등록신청완료</button>");
           		}else{
           			out.println("<button type=\"button\" id=\"applyPopupBtn\" class=\"btn btnN02\" onclick=\"javascript:index.insertTeacher()\">등록신청</button>");
           		}
		     %>
            </div>
            <button type="button" class="btn btnClose">닫기</button>
        </section>
    </div>

    <script type="text/javascript">
        $("footer .inner button").click(function(){
            $(".popup").addClass("on");
        });
        
    </script>
</body>
</html>
