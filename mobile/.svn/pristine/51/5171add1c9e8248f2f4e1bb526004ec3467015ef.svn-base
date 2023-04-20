<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<title>공지사항</title>
		<meta name="title" content="알림마당">
		<link rel="stylesheet" href="${ctx }/resources/css/board.css" />
		<script src="${ctx }/resources/js/etc/expAndNotice.js"></script>
		<script>
			$(document).ready(function() {
				$expAndNotice.init("BOARD_001");
				srvLogWrite("M0","01", "09", "03", "", "");
			});
		</script>
	</head>
	<body>
		<%@include file="/WEB-INF/jsp/board/navigation.jsp" %>
		<div class="ListSearch">
			<form id="board-search-form">
				<select id="notice_search_select">
					<option value="post_all" selected="selected">제목 + 내용</option>
					<option value="post_title">제목</option>
					<option value="post_content">내용</option>
				</select>
				<input type="text" id="notice_search_title_text">
				<button type="submit" title="검색버튼">검색</button>
			</form>
		</div> 
		<div class="ContArea">
			<h1></h1>
			<div class="Notice">
				<div id="board-list"></div>
				<div id="board-list-page" class="Pasing"></div>
			</div>
		</div>
	</body>
</html>