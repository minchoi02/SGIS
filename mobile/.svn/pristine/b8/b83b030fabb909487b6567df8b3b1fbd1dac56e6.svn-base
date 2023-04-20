<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<title>용어설명</title>
		<meta name="title" content="알림마당">
		<link rel="stylesheet" href="${ctx }/resources/css/board.css" />
		<script src="${ctx }/resources/js/etc/expAndNotice.js"></script>
		<script>
			$(document).ready(function() {
				$expAndNotice.init("BOARD_005");
				srvLogWrite("M0","01", "09", "02", "", "");
			});
		</script>
	</head>
	<body>
		<%@include file="/WEB-INF/jsp/board/navigation.jsp" %>
		<div class="ListSearch">
			<form id="board-search-form">
				<input type="text" id="notice_search_title_text">
				<button type="submit">검색</button>
			</form>
		</div>
		<div class="ContArea">
			<h1></h1>
			<div class="Term"> 
				<div id="board-list"></div>
				<div id="board-list-page" class="Pasing"></div>
			</div>
		</div>
	</body>
</html>