<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<title>개선사항</title>
		<meta name="title" content="알림마당">
		<link rel="stylesheet" href="${ctx }/resources/plugins/sop/mobile/sop.css">
		<script>
			$(document).ready(function() {
				$board.init("MQNA_999"); //Q&A 로변경 필요
				srvLogWrite('O0', '11', '04', '01', '', '');
			});
		</script>

	</head>
	<body>
		<%@include file="/WEB-INF/jsp/m2020/map/board/navigation.jsp" %>
		<div class="ListSearch">
			<form id="board-search-form" class="search-result">
				<select id="notice_search_select" class="search-select">
					<option value="post_all" selected="selected">제목 + 내용</option>
					<option value="post_title">제목</option>
					<option value="post_content">내용</option>
				</select>
				<label for="notice_search_title_text" class="Hidden">검색어입력</label> <!-- 2020.09.08 [신예리] 레이블 추가 -->
				<input type="text" id="notice_search_title_text" style="width: 55%;" placeholder="검색어를 입력해주세요." title="검색 영역"> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
				<button type="submit" class="search-btn" title="검색버튼" onclick="srvLogWrite('O0', '11', '04', '02', $('#notice_search_title_text').text(), '');"></button> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
			</form>
		</div>
		<div class="rowBtn" style="width:95%; margin: 0 auto; display: flex; align-items: center; justify-content: center; border-radius: 5px; ">
			<a class="cmmnt_reg" onclick="$('#comments-form').show();">의견등록</a>
   		</div>
		<div class="ContArea">
			<div class="qna">
				<div id="board-list" class="bt mt20"></div>
				<div id="board-list-page" class="Pasing"></div>
			</div>
		</div>
		<%@include file="/WEB-INF/jsp/m2020/map/board/commentsRegPopop.jsp" %>
	</body>
</html>