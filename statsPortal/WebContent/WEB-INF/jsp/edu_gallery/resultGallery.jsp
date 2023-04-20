<%
	/**************************************************************************************************************************
	* Program Name  : 가르치는 지도 리스트 JSP  
	* File Name     : resultGallery.jsp
	* Comment       : session 값 세팅 
	*                 ss_school_grade	E,M,H
	*                 ss_grant_state	APPLCT(신청), ASSENT(승인), FINISH(만료), NONE(비로그인)
	*                 ss_page_info		T(가르치는지도), S(배우는 지도)
	*                 비공개는 로그인 한 사용자 중 자신의 것만 보여준다. 나머지는 리스트업도 하지 않는다.
	* History       : 
	*
	**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
    
    <%
    
    	//======================== 테스트용 세션값 세팅 운영 갈때 주석 요망 ============================
     	//session.setAttribute("ss_grant_state", "ASSENT");
     	//session.setAttribute("ss_school_grade", "H");
		//session.setAttribute("member_id", "djlee92");
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
		
		String param_ss_school_grade = request.getParameter("param_ss_school_grade")==null? "E":request.getParameter("param_ss_school_grade"); //파라미터가 널일 경우 초등(E)를 디폴트로 세팅한다. 그렇지 않으면 쿼리에서 문제가 생김 
		session.setAttribute("ss_school_grade", param_ss_school_grade);//세션방식에서 파라미터로 변경
		String ss_school_grade = session.getAttribute("ss_school_grade")==null?"":(String)session.getAttribute("ss_school_grade"); //mng_s 20210802
		ss_school_grade = param_ss_school_grade; //세션방식에서 파라미터로 변경
		
		
		
		String ss_grant_state  = session.getAttribute("ss_grant_state")==null?"":(String)session.getAttribute("ss_grant_state"); //mng_s 20210802
		String ss_page_info    = session.getAttribute("ss_page_info")==null?"":(String)session.getAttribute("ss_page_info"); //mng_s 20210802
		String ss_member_id    = session.getAttribute("member_id")==null?"":(String)session.getAttribute("member_id");
	%>   

<!DOCTYPE html>
<html lang="ko">
<head>
 	<meta charset="utf-8" />
	<meta name="format-detection" content="telephone=no" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<title>SGIS 에듀</title>
	
	<!-- 
    <link href="/css/default.css" rel="stylesheet" type="text/css" />
	<link rel='stylesheet' type='text/css' href='/js/plugins/jquery-easyui-1.4/themes/default/easyui.css'>
	<link rel="stylesheet" type="text/css" href="/css/common.css" />
	<link rel="stylesheet" type="text/css" href="/css/layout.css" />
	<link rel="stylesheet" type="text/css" href="/css/um.css" />
	<link rel="stylesheet" type="text/css" href="/css/nm.css" />
	 -->
	
	<link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
	<link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
	<link href="/css/wheelcolorpicker.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
    <link rel="stylesheet" href="/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
    <link rel="stylesheet" type="text/css" href="/js/plugins/colorpicker/css/colpick.css">
    
    <!-- 
    <link rel="stylesheet" type="text/css" href="/sample2/include/css/edu_gallery.css" />
    <link rel="stylesheet" type="text/css" href="/sample2/include/css/edu_gallery_pop.css" />
	 -->
	 
	<script type="text/javascript" src="/js/plugins/jquery.min.js"></script> 
	<script type="text/javascript" src="/js/common/includeHead.js"></script>
	<script type='text/javascript' src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
	<script type="text/javascript" src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	
	<script src="/js/board/edu_jquery.paging.js"></script>

	<script type="text/javascript" src="/js/common/map.js"></script>
	<script src="/js/common/common.js"></script>
	<script src="/js/plugins/ui.js"></script>
	<script src="/js/plugins/common.js"></script>
	<script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>
	<script type='text/javascript' src='/js/plugins/jquery.form.js'></script>
	<script type="text/javascript" src="/js/plugins/jquery.tagsinput.min.js"></script>
    <script type="text/javascript" src="/js/edu_gallery/galleryEtc.js"></script>
    <script type="text/javascript" src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>  
    <script type="text/javascript" src="/js/plugins/colorpicker/js/colpick.js"></script>
    <script type="text/javascript" src="/js/plugins/jquery.wheelcolorpicker.js"></script>
    <script type="text/javascript" src="/js/plugins/EasyTree/jquery.easytree.min.js"></script> 
    <script type="text/javascript" src="/js/plugins/colResizable-1.5.min.js"></script> 
    <script type="text/javascript" src="/js/plugins/slick.min.js"></script>
	<script src="/js/edu_gallery/galleryApi.js"></script>
	<script src="/js/edu_gallery/resultGallery.js"></script>
	<script src="/js/interactive/kakao_script_api.js"></script>
	<script src="/js/common/mapInfo/bookmarkAndShareInfo.js"></script>
	
	<script type="text/javascript">
		/*
		setTimeout(function(){
			srvLogWrite("J0","01","01","00","","");
			
		},1000);
		*/
	</script>
	
	<link rel="stylesheet" href="/sgis_edu/resource/css/base_gallery.css">
    <link rel="stylesheet" href="/sgis_edu/resource/css/common.css">
    <link rel="stylesheet" href="/sgis_edu/resource/css/teach.css">
    
    <link rel="shortcut icon" href="/sgis_edu/resource/images/favicon.ico">
	<script type="text/javascript" src="/sgis_edu/resource/js/common.js?ver=123"></script>
	
	<%
		String style_sg = "";
		
		if("E".equals(ss_school_grade)) {
			style_sg = "<link rel=\"stylesheet\" href=\"/sgis_edu/resource/css/ele.css\">";
		} else if ("M".equals(ss_school_grade)) {
			style_sg = "<link rel=\"stylesheet\" href=\"/sgis_edu/resource/css/mid.css\">";
		} else if ("H".equals(ss_school_grade)) {
			style_sg = "<link rel=\"stylesheet\" href=\"/sgis_edu/resource/css/high.css\">";
		} else {
			style_sg = "<link rel=\"stylesheet\" href=\"/sgis_edu/resource/css/ele.css\">";
		}
		
		
		
	%>
	<%= style_sg %>
	
	<script type="text/javascript">
		$(document).ready(function() {
			var chk_member_id = '<%=ss_member_id%>';
			$resultGallery.current_pg_writer = chk_member_id;
			/*
			if( "" != chk_member_id ) {
				if ($resultGallery.current_pg_writer != chk_member_id ) {
					$("#view_stats_area").hide();
				} else if($resultGallery.current_pg_writer == chk_member_id) {
					$("#view_stats_area").show();
				}
			}
			*/
		});		
	</script>
	
</head>

<body>   
	
	<% 
		//if("E".equals(ss_school_grade)) {
		if("E".equals(param_ss_school_grade)) {
	%>
			<jsp:include page="/view/edu/ele/header"></jsp:include>
	<%
		//} else if ("M".equals(ss_school_grade)) {
		} else if ("M".equals(param_ss_school_grade)) {
	%>
			<jsp:include page="/view/edu/mid/header"></jsp:include>
	<%
		//} else if ("H".equals(ss_school_grade)) {
		} else if ("H".equals(param_ss_school_grade)) {
	%>
			<jsp:include page="/view/edu/high/header"></jsp:include>
	<%
		} else {
	%>
			<jsp:include page="/view/edu/mid/header"></jsp:include>
	<%
		}
	%>

	<!-- body -->
	<div class="sub list" id="resultGalleryList">
        <div class="lnb">
            <h2 class="lnbTi">함께하기</h2>
            <ul class="menu">
            	<%
            		if ("ASSENT".equals(ss_grant_state) ) { //승인상태가 아니면 배우는 지도만 보여준다.
            			if ("T".equals(ss_page_info)) {
                			out.println("<li><a href=\"/view/edu_gallery/resultGallery?param_ss_page_info=T&param_ss_school_grade=" + param_ss_school_grade + "\" class=\"on\">가르치는 지도</a></li>");
                			out.println("<li><a href=\"/view/edu_gallery/resultGallery?param_ss_page_info=S&param_ss_school_grade=" + param_ss_school_grade + "\" >배우는 지도</a></li>");
            			} else {
            				out.println("<li><a href=\"/view/edu_gallery/resultGallery?param_ss_page_info=T&param_ss_school_grade=" + param_ss_school_grade + "\" >가르치는 지도</a></li>");
            				out.println("<li><a href=\"/view/edu_gallery/resultGallery?param_ss_page_info=S&param_ss_school_grade=" + param_ss_school_grade + "\" class=\"on\">배우는 지도</a></li>");
            			}
            		} else {
            			out.println("<li><a href=\"/view/edu_gallery/resultGallery?param_ss_page_info=S&param_ss_school_grade=" + param_ss_school_grade + "\" class=\"on\">배우는 지도</a></li>");
            		}
            	
                %>
                <%
                	String ss_school_level = "ele";
                
	                if("M".equals(ss_school_grade)) {
	                	ss_school_level = "mid";
	        		} else if ("H".equals(ss_school_grade)) {
	        			ss_school_level = "high";
	        		}
                %>
	            <%
				
					if ("E".equals(param_ss_school_grade)) {
						out.println("<li><a href=\"/view/edu/"+"ele"+"/community/together_list\">함께하는 지도</a></li>");
						
					}else if ("M".equals(param_ss_school_grade)) {
						out.println("<li><a href=\"/view/edu/"+"mid"+"/community/together_list\">함께하는 지도</a></li>");
						
					}else if ("H".equals(param_ss_school_grade)) {
						out.println("<li><a href=\"/view/edu/"+"high"+"/community/together_list\">함께하는 지도</a></li>");
						
					}
				
                %>
            </ul>
        </div>
        <main>
        	<%
           		if ("ASSENT".equals(ss_grant_state) ) {
           			if ("T".equals(ss_page_info)) {
               			out.println("<h3 class=\"contTi\">가르치는 지도</h3>");
           			} else {
           				out.println("<h3 class=\"contTi\">배우는 지도</h3>");
           			}
           		} else {
           			out.println("<h3 class=\"contTi\">배우는 지도</h3>");
           		}
           	
            %>
            
            <div class="filterWrap">
                
                	<form></form><!-- 디자인이 이렇게 넘어와서 뺄수가 없다 -->
                	
                	<%
                		if ("T".equals(ss_page_info) && "ASSENT".equals(ss_grant_state) ) { //내가 만든 자료는 승인받은 선생만 볼 수 있다.
                	%>
                	<fieldset>
                        <input type="checkbox" class="switch" id="my_teach_list" onClick="javascript:$resultGallery.gallerySearch();">
                        <label for="my_teach_list"></label>
                        <label for="my_teach_list">내가 만든 자료만 보기</label>
                    </fieldset>
                	<%
                		}
                	%>
                	
                	<form></form><!-- 디자인이 이렇게 넘어와서 뺄수가 없다 -->
                
                    <fieldset>
                        <div class="select">
                            <span id="selectTypeItem">전체</span>
                            <input type="checkbox" id="chk1">
                            <label for="chk1"></label>
                            <ul>
                                <li>전체</li>
                                <li>제목</li>
                                <li>내용</li>
                            </ul>
                        </div>
                        <input onkeypress="if(event.keyCode==13){javascript:$resultGallery.gallerySearch();}" type="search" name="searchWord"  id="searchWord" class="search" placeholder="검색어를 입력하세요">
                        <button type="button" class="btnSearch" onClick="javascript:$resultGallery.gallerySearch();">검색</button>
                    </fieldset>
                
            </div>
            <ul class="card card03 galleryListItem">
            
            	<!-- 
                	리스트가 나오는 영역
                -->
            </ul>
            
               
            <div id="gallery_lists_paging" class="btnWrap pagenation paging" >
				<span class="edu_paging"></span>
			</div>
            
            
            
            <!-- 
            <div id="gallery_lists_paging"  class="pagenation" style="width: 100%; margin-bottom:50px; text-align:center;">
                    <span class="btnWrap paging edu_paging">
            </div>
             -->
            
            <%
            	if("ASSENT".equals(ss_grant_state) && "T".equals(ss_page_info)) { //교사 회원 승인상태만 보여준다.
            %>
		            <div class="btnRight">
		                <!-- <span id="nowCount"></span> -->
						<a id="galleryInsertButton" class="btn btnN02 btnArr" style="cursor: pointer;">교안 만들기</a>
		            </div>
            <%
            	}
            %>
				
			</div>
            
        </main>
    </div>
		
		
		
		
		
	<div id="dialogDiv" class="" style="display: none;"></div>
	
	<input type="hidden" id="hidden_ss_school_grade" value="<%=param_ss_school_grade%>">
	<input type="hidden" id="hidden_ss_page_info" value="<%=param_ss_page_info%>">
	
</body>
</html>