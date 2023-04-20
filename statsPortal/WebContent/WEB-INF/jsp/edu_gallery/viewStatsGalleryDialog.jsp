<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%   
	response.setHeader("Cache-Control","no-store");   
	response.setHeader("Pragma","no-cache");   
	response.setDateHeader("Expires",0);   
	if (request.getProtocol().equals("HTTP/1.1")) response.setHeader("Cache-Control", "no-cache");
	
	String ss_school_grade = session.getAttribute("ss_school_grade")==null?"":(String)session.getAttribute("ss_school_grade"); //mng_s 20210802
	String ss_grant_state  = session.getAttribute("ss_grant_state")==null?"":(String)session.getAttribute("ss_grant_state"); //mng_s 20210802
	String ss_page_info    = session.getAttribute("ss_page_info")==null?"":(String)session.getAttribute("ss_page_info"); //mng_s 20210802
	String ss_member_id    = session.getAttribute("member_id")==null?"":(String)session.getAttribute("member_id");
	String ss_current_page_writer_id    = session.getAttribute("ss_current_page_writer_id")==null?"":(String)session.getAttribute("ss_current_page_writer_id");
	
	String param_ss_school_grade = request.getParameter("param_ss_school_grade")==null? "E":request.getParameter("param_ss_school_grade"); //파라미터가 널일 경우 초등(E)를 디폴트로 세팅한다. 그렇지 않으면 쿼리에서 문제가 생김 
	session.setAttribute("ss_school_grade", param_ss_school_grade);//세션방식에서 파라미터로 변경
	ss_school_grade = param_ss_school_grade; //세션방식에서 파라미터로 변경
	
	
%>   


<!DOCTYPE html>
<html lang="ko">

<head>
 	<meta charset="utf-8" />
	<meta name="format-detection" content="telephone=no" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<title>SGIS 에듀</title>

	<script type="text/javascript" src="/js/plugins/jquery.tagsinput.min.js"></script>
	<!-- <link rel="stylesheet" type="text/css" href="/sample2/include/css/edu_gallery_pop.css" /> -->
	
	<script src="/js/edu_gallery/html2canvas.js"></script>
	<script src="/js/edu_gallery/collectionGalleryModify.js"></script>
	<!-- <script src="/js/edu_gallery/galleryApi.js"></script> -->

	<link rel="stylesheet" href="/sgis_edu/resource/css/base_gallery.css">
    <link rel="stylesheet" href="/sgis_edu/resource/css/common.css">
    <link rel="stylesheet" href="/sgis_edu/resource/css/teach.css">
    
    <link rel="shortcut icon" href="/sgis_edu/resource/images/favicon.ico">
	<script type="text/javascript" src="/sgis_edu/resource/js/common.js?ver=123"></script>
    
    <link rel="shortcut icon" href="/sgis_edu/resource/images/favicon.ico">
	
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
			console.log("viewStatsGalleryDialog.jsp ready");
			
			$("#modify_stats_area").hide(); //편집하기영역
			$("#modify_stats_area2").hide();//편집하기영역
			
			galleryView( $resultGallery.selectDataId, true ); //해당 함수는 galleryView.js에 있고 GalleryView.java에서 처리한다.
			
		});
		
		
		function hideDialogDivShowList() {
			$("#dialogDiv").hide();
			$("#resultGalleryList").show();

		}
		
	</script>

</head>
	
<body>
    <% 
		if("E".equals(ss_school_grade)) {
	%>
<%-- 			<jsp:include page="/view/edu/ele/header"></jsp:include> --%>
	<%
		} else if ("M".equals(ss_school_grade)) {
	%>
<%-- 			<jsp:include page="/view/edu/mid/header"></jsp:include> --%>
	<%
		} else if ("H".equals(ss_school_grade)) {
	%>
<%-- 			<jsp:include page="/view/edu/high/header"></jsp:include> --%>
	<%
		} else {
	%>
<%-- 			<jsp:include page="/view/edu/mid/header"></jsp:include> --%>
	<%
		}
	%>
	
	
    <div class="sub view " id="open_yn_class"> <!-- 비공개 시 addClass : private -->
        <div class="lnb">
            
            <%
           		if ("ASSENT".equals(ss_grant_state) ) {
           			if ("T".equals(ss_page_info)) {
               			out.println("<h2 class=\"menuTi\"><a onclick=\"javascript:hideDialogDivShowList();\" >가르치는 지도</a></h2>");
               			session.setAttribute("ss_page_info", "T");
           			} else {
           				out.println("<h2 class=\"menuTi\"><a onclick=\"javascript:hideDialogDivShowList();\" >배우는 지도</a></h2>");
           				session.setAttribute("ss_page_info", "S");
           			}
           		} else {
           			out.println("<h2 class=\"menuTi\"><a onclick=\"javascript:hideDialogDivShowList();\" >배우는 지도</a></h2>");
           		}
           	
            %>
            
            
            
            <h3 class="lnbTi"><p id="titleTxt"></p></h3>
            <p id="postContentTxt"><!-- 우리나라는 ‘50년대 후반부터 인구가 급격히 늘어났으며 최근에는 성장률이 감소하고 있다. 특히 최근 저출산과 고령화로 인구 구성에 큰 변화를 겪고 있다. 우리나라 인구구성의 변화를 인구피라미드로 알아보자.--></p>
            <div class="hashTagWrap">
                <!-- 
                <i class="hashTag">인구변화</i>
                <i class="hashTag">인구변화</i>
                <i class="hashTag">인구변화</i>
                <i class="hashTag">인구변화</i>
                <i class="hashTag">인구변화</i>
                <i class="hashTag">인구변화</i>
                -->
            </div>
        </div>
        <main>
            <section class="flexWrap" id="viewAtIconList">
                <article class="mapWrap"  id="mapArea">
                
                	<%
                   		//배우는 지도의 화면은 꽉채워서 보여준다. 20211025
                    	if ("T".equals(ss_page_info)) {
                   			out.println("<div class=\"map\" style=\"text-align:center;\"  id=\"div_mapImage\">");
               			} else {
               				out.println("<div class=\"map2\" style=\"text-align:center;\"  id=\"div_mapImage\">");
               			}
                   	%>
                
                    
                        <img id="mapImage" style="text-align:center;max-width:100%;max-height:100%;" />
                    </div>
                    
                    
					<div class="editWrap " id="div_sticker">
                        <button type="button" class="refresh" onClick="javascript:$collectionModify.deleteIconAll();">새로고침</button>
                        <span>지도 위에 아이콘을 드래그하세요</span>
                        <span id="iconList">
                        <a style="margin-left: 35px;"><img class="imgIcon" src="/sgis_edu/resource/images/icon_stk01.png" style="opacity: .5;" /></a>
                        <a style="margin-left: 35px;"><img class="imgIcon" src="/sgis_edu/resource/images/icon_stk02.png" style="opacity: .5;" /></a>
                        </span>
                        <a  id="talkAreaList" style="margin-left: 35px;"><img class="imgTextArea" src="/sgis_edu/resource/images/icon_stk03.png" style="opacity: .5;" /></a>
                    </div>
                    
                   	<%
                   		//배우는 지도의 타이틀은 보여주지 않는다. 20211025
                    	if ("T".equals(ss_page_info)) {
                   			out.println("<div class=\"editWrap \" id=\"div_title_sticker\">");
                   			out.println("<span id=\"div_title_sticker_cnt\"></span>");
                   			out.println("</div>");
                   			session.setAttribute("ss_page_info", "T");
               			} else {
               				out.println("<div class=\"editWrap2 \" id=\"div_title_sticker\">");
               				out.println("");
               				out.println("</div>");
               				session.setAttribute("ss_page_info", "S");
               			}
                   	%>
                        
                    

                <button class="btn cmntBtn" onclick="cmntPop()">댓글보기 <span id="reply_cnt"  style="padding: 2px 8px 0 8px;"></span></button>

                </article>
                
                

                <article class="cmntWrap" style="z-index:20001;">
                    <ul class="cmnt" id="jsp_reply_list"> <!-- 댓글이 없으면 addClass null / li 삭제 -->
                       <!-- 
                       <li>
                           <div class="info">
                                <em class="nickname">김펭*</em> <time>2021.07.03</time>
                            </div>
                            <p class="txt">친구들이 입력한 댓글입니다.<br/>댓글로 소통하삼</p>
                            <button type="button" class="btn btnDel">삭제</button>
                       </li> 
                       <li>
                           <div class="info">
                                <em class="nickname">김펭*</em> <time>2021.07.03</time>
                            </div>
                            <p class="txt">친구들이 입력한 댓글입니다.<br/>댓글로 소통하삼</p>
                            <button type="button" class="btn btnDel">삭제</button>
                       </li> 
                       <li class="writer">
                           <div class="info">
                                <em class="nickname">김펭*</em> <time>2021.07.03</time>
                            </div>
                            <p class="txt">친구들이 입력한 댓글입니다.<br/>댓글로 소통하삼</p>
                            <button type="button" class="btn btnDel">삭제</button>
                       </li> 
                       <li>
	                        <div class="info">
	                             <em class="nickname">김펭*</em> <time>2021.07.03</time>
	                         </div>
	                         <p class="txt">친구들이 입력한 댓글입니다.<br/>댓글로 소통하삼</p>
	                         <button type="button" class="btn btnDel">삭제</button>
                    	</li>
                    	 -->
                    </ul>
                    
                   	<%
                     //out.println("ss_current_page_writer_id [" + ss_current_page_writer_id);
               		 //out.println("ss_member_id [" + ss_member_id);
               		 //viewStatsGalleryDialog.jsp를 먼저 로딩 후 조회로직이 타서 ss_current_page_writer_id 세션값이 이전게 세팅이 된다. 
               		 //이 문제때문에 스크립트 단에서 로직을 다시 태우는걸로 수정한다.
                   	if(ss_current_page_writer_id.equals(ss_member_id)) { //작성자이면
                   		
                   	%>
                   	  <!-- 
                   	  <div class="cmntWrite">
                    	<form class="flexWrap infoForm"> 
                            <input type="hidden" value="dummy_nick" id="replyNickname" >
                            <input type="hidden" value="dummy_pwd" id="replyPwd"  >
                        </form>
                        <form class="flexWrap writeForm">
                            <textarea rows="3" placeholder="댓글을 입력하세요." id="replyContent"></textarea>
                            <button type="button" onClick="javascript:$resultGallery.insertGalleryReply2();">등록</button>
                        </form>
                      </div>
                       -->
                   	<%
                   	} else { //작성자가 아니면
                   	%>
                   	  <!-- 
                   	  <div class="cmntWrite">
                    	<form class="flexWrap infoForm"> 
                            <input type="text" placeholder="닉네임(3글자 이상)" id="replyNickname" >
                            <input type="password" placeholder="교안 비밀번호" id="replyPwd"  >
                        </form>
                        <form class="flexWrap writeForm">
                            <textarea rows="3" placeholder="댓글을 입력하세요." id="replyContent"></textarea>
                            <button type="button" onClick="javascript:$resultGallery.insertGalleryReply();">등록</button>
                        </form>
                      </div>
                       -->
                   	<%
                   	}
                   	%>
                        
                    <div class="cmntWrite" id="reply_workbook_same" style="display:none;">
                    	<form class="flexWrap infoForm"> 
                            <input type="hidden" value="dummy_nick" id="replyNickname2" >
                            <input type="hidden" value="dummy_pwd" id="replyPwd2"  >
                        </form>
                        <form class="flexWrap writeForm">
                            <textarea rows="3" placeholder="댓글을 입력하세요." id="replyContent2"></textarea>
                            <button type="button" onClick="javascript:$resultGallery.insertGalleryReply2();">등록</button>
                        </form>
                    </div>
                    
                    <div class="cmntWrite" id="reply_workbook_no" style="display:none;">
                    	<form class="flexWrap infoForm"> 
                            <input type="text" placeholder="닉네임(3글자 이상)" id="replyNickname" >
                            <input type="password" placeholder="교안 비밀번호" id="replyPwd"  >
                        </form>
                        <form class="flexWrap writeForm">
                            <textarea rows="3" placeholder="댓글을 입력하세요." id="replyContent"></textarea>
                            <button type="button" onClick="javascript:$resultGallery.insertGalleryReply();">등록</button>
                        </form>
                      </div>
                    
                    <button class="btn btnClose">닫기</button>
                </article>
                
                
                
            </section>
            
            
            
            <div class="btnRight" id="view_stats_area">
            <%
           		if ("ASSENT".equals(ss_grant_state) && "T".equals(ss_page_info)) { //본인이 작성한 글이 아니면 이 메뉴를 보여주지 않으려고 여기에 로직 넣음
           	%>
                <button type="button" onclick="goAlert()" class="btn btnN01">삭제하기</button>
                <button type="button" class="btn btnN01" onClick="javascript:$collectionModify.modifyData();">편집하기</button>
            <%
           		}
            %>
            </div>
            
            
            <div class="write"><!-- 디자인 적용을 위해 css class 적용함 -->
            <form>
            <article id="modify_stats_area" style="margin-top:50px;">
                <fieldset>
                    <ul>
                        <li>
                            <label class="formTi">타이틀</label>
                            <span id="span_gallery_title" /> 
                        </li>
                        <li>
                            <label class="formTi">설명</label>
                            <span id="span_applicationContent" />
                        </li>
                        <li>
                            <label class="formTi">해쉬태그</label>
                            <span id="span_hashTag" />
                        </li>
                        <li>
                            <label class="formTi">비밀번호 <i>댓글작성을 위한 비밀번호</i></label>
                            <input type="password" id="teach_pwd" placeholder="4자 (숫자,영문 가능)"> 
                        </li>
                        <li>
                            <label class="formTi">공개여부</label>
                            <span id="span_open_yn" />
                        </li>
                    </ul>
                </fieldset>
            </article>
            </form>
            </div>
            <div class="btnRight" id="modify_stats_area2">
                <button type="button" onclick="javascript:$collectionModify.modifyUpdateDataSave2();" class="btn btnN01">미리보기</button>
                <button type="button" class="btn btnN02" onclick="javascript:$collectionModify.modifyUpdateDataSave();">저장하기</button>
            </div>
           
            
        </main>
    </div>
    
    <div class="popup pswd"  style="z-index:20001;" id="del_reply_popup">
    	
    	<section id="reply_del_same" style="display:none;">
            <article>
                <em class="popTi">댓글 삭제 인증하기</em>
            </article>
                <form class="row">
                    <input type="hidden" value="dummy_nick" id="del_reply_nick2">
                    <input type="hidden" value="dummy_pwd" id="del_reply_pwd2">
                </form>
            
            <div class="btnWrap">
                <button type="button" class="btn btnN01">취소</button>
                <button type="button" class="btn btnN02" id="del_reply_confirm2">댓글 삭제하기</button>
            </div>
            <button type="button" class="btnClose">닫기</button>
        </section>
        
        <section id="reply_del_no" style="display:none;">
            <article>
                <em class="popTi">댓글 삭제 인증하기</em>
            </article>
            
               	<article>
	                <form class="row">
	                    <input type="text" placeholder="닉네임 (3글자 이상)" id="del_reply_nick">
	                    <input type="password" placeholder="교안 비밀번호" id="del_reply_pwd">
	                </form>
	            </article>
	            <div class="btnWrap">
	                <button type="button" class="btn btnN01">취소</button>
	                <button type="button" class="btn btnN02" id="del_reply_confirm">댓글 삭제하기</button>
	            </div>
            <button type="button" class="btnClose">닫기</button>
        </section>
    </div>

    <div class="popup alert" style="z-index:20001;" >
        <section>
            <article>
                <em class="popTi">한번 더 확인하세요.</em>
            </article>
            <div class="btnWrap">
                <button type="button" class="btn btnN01">취소</button>
                <button type="button" class="btn btnN02" onClick="javascript:$resultGallery.delPostCnt();">삭제하기</button>
            </div>
            <button type="button" class="btnClose">닫기</button>
        </section>
    </div>
    
    <!-- 미리보기 팝업 -->
	<div class="popup preview" id="preview_popup" style="z-index:20005;">
		
    </div>
    
    <input type="hidden" class="hidden_class_data_id" >
    <input type="hidden" id="hidden_ss_school_grade" value="<%=param_ss_school_grade%>">
    
    <script type="text/javascript">
        function cmntPop(){
            $(".cmntWrap").addClass("on");
        };
        
        /*
        $(".cmnt button.btnDel").click(function(){
            $(".pswd").addClass("on")
        })

        $(".popup .btnWrap .btnN01").click(function(){
            $(".popup").removeClass("on");
        });
		*/
        function goAlert(){
            $(".alert").addClass("on");
        }
		
    </script>
</body>
</html>