<%
/**************************************************************************************************************************
* Program Name  : 설명과 공지 상세화면 JSP  
* File Name     : qnaAndRequest.jsp
* Comment       : 
* History       : 네이버시스템 이동형 2015-10-27
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="kostat.sop.ServiceAPI.common.security.Security"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String post_no = (String) request.getParameter("post_no");
if ( post_no != null ) {
	
	post_no = Security.cleanXss(post_no);
	/*
	post_no = post_no.replaceAll("<","&lt;");  
	post_no = post_no.replaceAll(">","&gt;"); 
	post_no = post_no.replaceAll("&", "&amp;");
	post_no = post_no.replaceAll("\"", "&quot;"); 
	*/
}
%>
<!DOCTYPE html>
<html lang="ko">
	<head>
	    <meta charset="utf-8">
	    <meta name="format-detection" content="telephone=no" />
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    
	    <script src="/js/common/includeHead.js"></script>
		<script src="/js/common/common.js"></script>

		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/common.css">
		<!--알림마당 컨텐츠 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/contents.css">
		<!--게시판 css 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/board.css">
		<script src='/js/plugins/jquery.form.js'></script>
		<script src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
		
		<script src="/js/board/jquery.paging.js"></script>
		<script src="/js/board/holder.js"></script>
		<script src='/js/plugins/ckeditor/ckeditor.js'></script>
		<script src='/js/plugins/google_recaptcha.js'></script>
		
	    <title>알림마당|통계지리정보서비스</title>
	    <style>
		    #board-thema.view .board-content{padding:15px 15px;}
			#board-thema.view  ul.file > li:first-child{border-top:none;}
			#board-thema.view  ul.file > li.tit{line-height:100%;}
			#board-thema.view  ul.file > li.tit > div{float:right;line-height:130%;min-height:20px;vertical-align:middle;text-align:left;box-sizing:border-box;width:680px;}
			#board-thema.view  ul.file{border-top:1px solid #e0e0e0;overflow:hidden;border-bottom:1px solid #a0a0a0;}
			#board-thema.view  ul.file li{overflow:hidden;padding:15px 20px;}
			#board-thema.view  ul.file li > strong{padding-top:0;padding-bottom:0;position:relative;color:#666;vertical-align:middle;box-sizing:border-box;line-height:100%;width:73px;}
			#board-thema.view  ul.file li > div{padding-top:0;padding-bottom:0;}
			#board-thema.view  ul.file li > div em{font-family:'Nanum Gothic Bold';display:inline-block;margin-top:6px;}
			#board-thema.view  ul.file li > div em:first-child{margin-top:0;}
			#board-thema.view  ul.file li > div em a{text-decoration:underline;color:#356fc5;}
	    </style>
	    <script>
			var menuType = 'notice';
		    $(document).ready(function() {
				var opt = new Object();
				opt.board_cd = 'BOARD_001';
				opt.post_no = '<%=post_no%>';
				
				$.modifyPostHits(opt);//조회수 카운트
				$.boardListsView(opt);
			});
			
			$.modifyPostHits = function(opt) {
				$.ajax({
					url : '/ServiceAPI/board/boardListsHitAdd.json',
					type : 'POST',
					data : opt,
					async : false,
					success : function(data) {}
				});
			};
			
			$.boardListsView = function(opt) {
				$.ajax({
					url : '/ServiceAPI/board/boardListsView.json',
					type : 'POST',
					data : opt,
					async : false,
					success : function(data) {
						if(data.errCd == "0") {
							var result = data.result;
							var html = "";
							var htmlTitle="";
							for(var i = 0; i < result.summaryList.length; i ++) {
								var listItem = result.summaryList[i];
								var title = listItem.post_title.replace(/\n/gim, "</br>");
								var content = listItem.post_content.replace(/\n/gim, "</br>");
								
								html += "<div class='borad-view' id='exp_list_" + i + "'>";
								html += "<div class='header clearFix'>";
								html += "<h1 class='title'>" + title + "</h1>";
								html += "<div class='meta'>";
								html += "<ul>";
								html += "<li class='date'><span class='hidden'>등록일</span>" + listItem.reg_ts + "</li>";
								if(!listItem.post_hits) listItem.post_hits = 0;
								html += "<li class='view'><span>조회수</span>" + listItem.post_hits + "</li>";
								html += "</ul>";
								html += "</div>";
								html += "</div>";
								//html += "<div class='board-content clearFix'>" + content + "</div>";
								
								html += "<div class='board-content clearFix' id='mobile_pcversion'>";
								html += "<textarea id='POST_CONTENT" + i + "' style='width:777px;height:300px;'></textarea>";
								html += "</div>";
								
								if(listItem.file_yn == 'y' || listItem.file_yn == 'Y') {
									html += "<ul class='file'>";
									html += "<li class='tit'><img src='/publish_2018/include/images/board/ico_file.gif' alt='file' class='icon-file'>";
									html += "<strong>첨부파일</strong>";
									html += "<div>";
									html += "<em><a href='javascript:$.downloadFile(" + i + ");'>" + listItem.file_nm + "." + listItem.file_extension + "</a></em>";
									html += "<div></div>";
									html += "</div>";
									html += "</li>";
									html += "</ul>";
								}
								if(i == result.summaryList.length - 1) {
									html += "<div class='btn-area right btn-borad-top'>";
									//html += "<a href='' class='line-gray' id='' title='수정'><span>수정</span></a>";
									html += "<a href='/view/board/expAndNotice' class='btn-left-mg default-color' id='' title='목록'><span>목록</span></a>";
									html += "</div>";
								}
								html += "</div>";
							}
							$("#board-thema").empty();
							$("#board-thema").html(html);					
							
							
							var editorlist = [];
							for(var i = 0; i < result.summaryList.length; i++) {
								
								//mng_s 20191008 모바일 pc버전 조회시 editorlist 값이 널로 떨어져서 이렇게 처리하긴 했는데
								// 고치고 나니 모바일 말고 일반 pc버전에서 널이 않이나 아래 엘스 구문을 탄다. 일단 문제는 없으니 그냥 유지하는걸로...
								if(editorlist[i] != null) {
									editorlist[i] = CKEDITOR.replace('POST_CONTENT'+i, {
										resize_enabled : false,									
										readOnly : true,
										removePlugins : 'toolbar,elementspath,resize',
										extraPlugins : 'divarea,autogrow',
										autoGrow_onStartup : true,
										contentsCss : 'body {overflow:hidden}',
										style : {'overflow-y':'auto'}
									});
									
									var content = result.summaryList[i].post_content;//.replace(/\n/gim, "</br>");
									$('#POST_CONTENT' + i).html(content);								
									editorlist[i].setData($('#POST_CONTENT' + i).text());
								} else {
									var content = result.summaryList[i].post_content.replace(/\n/gim, "</br>");
									
									//mng_s 20201130  이진호
									//content = content.replace(/&lt;/gim,"<").replace(/&gt;/gim,">").replace(/&quot;/gim,"'").replace(/&amp;quot;/gim,"'").replace(/&nbsp;/gim," ").replace(/&amp;nbsp;/gim," ");
									content = content.replace(/&lt;/gim,"<").replace(/&gt;/gim,">").replace(/&quot;/gim,"'").replace(/&amp;quot;/gim,"'").replace(/&nbsp;/gim," ").replace(/&amp;nbsp;/gim," ").replace(/&amp;lsquo;/gim,"'").replace(/&amp;rsquo;/gim,"'").replace(/&amp;gt;/gim,">").replace(/&amp;middot;/gim,"·");
									//mng_e 20201130 이진호
									
									$('#mobile_pcversion').html(content);
									//$('#mobile_pcversion').html("<a href='aaa'>aaa</a>");
								}
								
								
							}
						} else {
							messageAlert.open("알림", data.errMsg);
						}
					}
				});
				/* debugger;
				$('div.cke_contents_ltr').css('height', '300px'); */
			};
			
			$.downloadFile = function(index) {
				var target;

				target = $('body');
				target.prepend("<form id='tempForm'></form>");

				target = $('#tempForm');
				target.attr("method", "post");
				target.attr("style", "top:-3333333333px;");
				target.attr("action", "/ServiceAPI/board/downloadFile.download");
				target.attr("enctype", "multipart/form-data");
				target.append("<input type='hidden' id='file_id'>");
				target.append("<input type='hidden' id='file_nm'>");
				target.append("<input type='hidden' id='file_path'>");
				target.append("<input type='hidden' id='file_extension'>");
				target.append("<input type='hidden' id='file_content_type'>");

				target = $('#file_id');
				target.attr('name', 'file_id');
				target.attr('value', expAndNoticeView.receiveLists[0].file_id);

				target = $('#file_nm');
				target.attr('name', 'file_nm');
				target.attr('value', expAndNoticeView.receiveLists[0].file_nm);

				target = $('#file_path');
				target.attr('name', 'file_path');
				target.attr('value', expAndNoticeView.receiveLists[0].file_path);

				target = $('#file_extension');
				target.attr('name', 'file_extension');
				target.attr('value', expAndNoticeView.receiveLists[0].file_extension);

				target = $('#file_content_type');
				target.attr('name', 'file_content_type');
				target.attr('value', expAndNoticeView.receiveLists[0].file_content_type);

				$('#tempForm').submit();
				$('#tempForm').remove();
			};
	    </script>
	</head>
	<body>
		<div id="wrap">
			<!-- header // -->
			<header>
				<!-- Top Include -->
				<jsp:include page="/view/common/includeSearch"></jsp:include>
			</header>
			
			<!--contents-->
			<div id="container" class="sub">
				<%@include file="/jsp/board/includeLeftMenu.jsp" %>
				<div id="content">
					<div id="title-area">
						<ul class="location">
							<li><a href="/view/board/sopBoardMain">알림마당</a></li>
							<li><a href="/view/board/expAndNotice">설명과 공지</a></li>
							<li><a href="/view/board/expAndNotice"><em>공지사항</em></a></li>
						</ul>
						<h1 class="sub-title">공지사항</h1>
					</div>
					<div id="contents" class="view">
						<!--board 시작-->
						<div id="board-type">
							<!-- board view -->
							<div id="board-thema" class="view">
								<!--  -->
							</div>
							<!-- //board list끝 -->
						</div>
					</div>
				</div>
			</div>
			<!--//contents-->
            <!-- footer// -->
		    <footer id="footer">
		    	<!-- Bottom Include -->
				<jsp:include page="/view/common/includeBottom"></jsp:include>
		    </footer>
        </div>
	</body>
</html>