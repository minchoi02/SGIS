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
if ( post_no != null  ){  
	post_no = post_no.replaceAll("<","&lt;");  
	post_no = post_no.replaceAll(">","&gt;"); 
}
String boardType = (String) request.getAttribute("boardType");
if ( boardType != null  ){  
	boardType = boardType.replaceAll("<","&lt;");  
	boardType = boardType.replaceAll(">","&gt;"); 
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
			var menuType = '<%=boardType%>';
			$(document).ready(function() {
				var opt = new Object();
				opt.board_cd = 'BOARD_003';
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
							for(var i = 0; i < result.summaryList.length; i++) {
								var listItem = result.summaryList[i];
								var title = listItem.post_title.replace(/\n/gim, "</br>");
								var content = listItem.post_content.replace(/\n/gim, "</br>");
								
								var reply = "";
								if ( listItem.reply_content != null ) {
									reply = listItem.reply_content.replace(/\n/gim, "</br>");
								}
								
								var id = listItem.reg_member_id;
								var ast = id.slice(1, id.length-1);
								var user_id = "";
								for ( var j = 0; j <ast.length; j++){
									user_id = user_id.concat(ast[j].replace(ast[j], "*"));
								}
								user_id =id.charAt().concat(user_id.concat(id.charAt(id.length-1)));
								
								html += "<div class='borad-view' id='exp_list_" + i + "'>";
								html += "<div class='header clearFix'>";
								html += "<h1 class='title'>";
								html += title;
								if(listItem.low_rank_s_class_cd == "REQST") html += "<span class='tag st01'>일반문의</span>";
								if(listItem.low_rank_s_class_cd == "QUERY") html += "<span class='tag st02'>개선요청</span>";
								if(listItem.low_rank_s_class_cd == "THEMRQ") html += "<span class='tag st03'>통계주제도 신규 요청</span>";
								html += "</h1>";
								html += "<div class='meta'>";
								html += "<ul>";
								html += "<li class='part'><span class='hidden'>사용자</span>" + user_id + "</li>";
								html += "<li class='date'><span class='hidden'>등록일</span>" + listItem.reg_ts + "</li>";
								if(!listItem.post_hits) listItem.post_hits = 0;
								html += "<li class='view'><span>조회수</span>" + listItem.post_hits + "</li>";
								html += "</ul>";
								html += "</div>";
								html += "</div>";
								html += "<div class='cont'><p>" + content + "</p></div>";
								if(listItem.reply_content != null) {
									html += "<div class='faq-answer'>";
									html += "<div class='header clearFix'>";
									html += "<h1 class='title'>답변입니다.</h1>";
									html += "</div>";
									html += "<div class='fnq-cont'><p>";
									html += reply;
									html += "</p></div>";
									html += "</div>";
								}
								if(listItem.file_yn == 'y' || listItem.file_yn == 'Y') {
									html += "<ul class='file'>";
									html += "<li class='tit'><img src='/publish_2018/include/images/board/ico_file.gif' alt='file' class='icon-file'>";
									html += "<strong>첨부파일</strong>";
									html += "<div>";
									html += "<em><a href=\"javascript:$.downloadFile('" + i + "', '" + listItem.file_path + "', '" + listItem.file_id + "', '" + listItem.file_extension + "');\">" + listItem.file_nm + "." + listItem.file_extension + "</a></em>";
									html += "<div></div>";
									html += "</div>";
									html += "</li>";
									html += "</ul>";
								}
								if(i == result.summaryList.length - 1) {
									html += "<div class='btn-area right btn-borad-top'>";
									if(listItem.modifyMode) {
										html += "<a href='javascript:void(0);' onclick='$.fnModify();' class='line-gray' title='수정'><span>수정</span></a>";
										html += "<a href='javascript:void(0);' onclick='$.fnDelete();' class='line-gray' title='삭제'><span>삭제</span></a>";
									}
									html += "<a href='/view/board/qnaAndRequest<%=boardType%>' class='btn-left-mg default-color' id='' title='목록'><span>목록</span></a>";
									html += "</div>";
								}
								html += "</div>";
							}
							$("#board-thema").empty();
							$("#board-thema").html(html);					
						} else {
							messageAlert.open("알림", data.errMsg);
						}
					}
				});
			};
			
			$.fnModify = function() {
				window.location.href = "/view/board/qnaModify?post_no=<%=post_no%>&boardType=<%=boardType%>";
			};
			
			$.fnDelete = function() {
				if(confirm("글을 삭제 하시겠습니까?\r\n댓글도 함께 삭제 됩니다.")) {
					$.ajax({
						url : '/ServiceAPI/board/boardDelete.json',
						type : 'POST',
						data : {board_cd:'BOARD_003',post_no:<%=post_no%>},
						async : false,
						success : function(data) {
							if(data.errCd == "0") {
								var boardType ="<%=boardType%>";
								if(boardType=="Qna"){
									window.location.href = "/view/board/qnaAndRequestQna";
								}
								else{
									window.location.href = "/view/board/qnaAndRequestThema";
								}
								
							}
						}
					});
				}
			};
			
			$.downloadFile = function(index, file_path, file_id, file_extension) {
				var what_board = "";
				if(file_path.indexOf("BOARD_001") != -1) what_board =  "BOARD_001";
				else if(file_path.indexOf("BOARD_002") != -1) what_board =  "BOARD_002";
				else if(file_path.indexOf("BOARD_003") != -1) what_board =  "BOARD_003";
				else if(file_path.indexOf("BOARD_004") != -1) what_board =  "BOARD_004";
				
				var openNewWindow = window.open("about:blank");
				openNewWindow.location.href = "/upload/board/" + what_board + "/" + file_id + "." + file_extension;
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
							<% if(boardType.equals("Qna")) { %>
								<li><a href="/view/board/qnaAndRequestQna"><em>Q&A</em></a></li>
							<% } else if(boardType.equals("Thema")) { %>
								<li><a href="/view/board/qnaAndRequestThema"><em>통계주제도 신규 요청</em></a></li>
							<% } %>
						</ul>
						<h1 class="sub-title"><% if(boardType.equals("Qna")) { %>Q&A<% } else if(boardType.equals("Thema")) { %>통계주제도 신규 요청<% } %></h1>
					</div>
					<div id="contents" class="view">
						<!--board 시작-->
						<div id="board-type">
							<!-- board view -->
							<div id="board-thema" class="faq-view">
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