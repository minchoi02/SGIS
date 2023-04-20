<%
/**************************************************************************************************************************
* Program Name  : 질문과 개선요청 JSP  
* File Name     : expAndNotice.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String post_no = (String) request.getAttribute("post_no");
//String post_no =request.getAttribute("post_no");
if ( post_no != null  ){  
	post_no = post_no.replaceAll("<","&lt;");  
	post_no = post_no.replaceAll(">","&gt;"); 

	//20190801 leekh 보안취약점 추가	http://localhost:8080/view/board/faqView?post_no=19%27%0aalert(1);%0a//
	//post_no = post_no.replaceAll("'","");   
	//post_no = post_no.replaceAll("\"","");   
	
	
//	post_no = ESAPI.encoder().encodeForHTMLAttribute(post_no);
//'%0aalert(1);%0a//	
	

}
String boardType = (String) request.getParameter("boardType");
if ( boardType != null  ){  
	boardType = boardType.replaceAll("<","&lt;");  
	boardType = boardType.replaceAll(">","&gt;"); 
	
	//20190801 leekh 보안취약점 추가	http://localhost:8080/view/board/faqView?post_no=19%27%0aalert(1);%0a//
	boardType = boardType.replaceAll("'","");   
	boardType = boardType.replaceAll("\"","");   
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
		
		<script>
			var menuType = 'faq';
			$(document).ready(function() {
				var opt = new Object();
				opt.board_cd = 'BOARD_002';
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
								
								html += "<div class='cont'>";
								html += "<textarea id='POST_CONTENT" + i + "' style='width:777px;height:auto;'></textarea>";
								html += "</div>";
								
								if(i == result.summaryList.length - 1) {
									html += "<div class='btn-area right btn-borad-top'>";
									//html += "<a href='' class='line-gray' id='' title='수정'><span>수정</span></a>";
									html += "<a href='/view/board/qnaAndRequestFaq' class='btn-left-mg default-color' id='' title='목록'><span>목록</span></a>";
									html += "</div>";
								}
								html += "</div>";
							}
							$("#board-thema").empty();
							$("#board-thema").html(html);					
							
							
							var editorlist = [];
							for(var i = 0; i < result.summaryList.length; i++) {
								editorlist[i] = CKEDITOR.replace('POST_CONTENT'+i, {
									resize_enabled : false,									
									readOnly : true,
									removePlugins : 'toolbar,elementspath,resize',
									extraPlugins : 'autogrow',
									autoGrow_onStartup : true,
									contentsCss : 'body {overflow:hidden}'
								});
								
								var content = result.summaryList[i].post_content.replace(/&quot;/gi, "'");//.replace(/\n/gim, "</br>");//2019-03-06 박길섭
								
								$('#POST_CONTENT' + i).html(content);								
								editorlist[i].setData($('#POST_CONTENT' + i).text());
							}
						} else {
							messageAlert.open("알림", data.errMsg);
						}
					}
				});
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
							<li><a href="/view/board/qnaAndRequestFaq">질문과 개선요청</a></li>
							<li><a href="/view/board/qnaAndRequestFaq"><em>FAQ</em></a></li>
						</ul>
						<h1 class="sub-title">FAQ</h1>
					</div>
					<div id="contents" class="view">
						<!--board 시작-->
						<div id="board-type">
							<!-- board 리스트 -->
							<div id="board-thema" class="faq-view">
								<!--  -->
							</div>
							<!-- //board 리스트 끝 -->			
						<!--//view-->
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