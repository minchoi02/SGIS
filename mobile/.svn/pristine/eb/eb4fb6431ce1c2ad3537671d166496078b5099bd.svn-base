<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<title>공지사항</title>
		<meta name="title" content="알림마당">
		<link rel="stylesheet" href="${ctx }/resources/plugins/sop/mobile/sop.css">
		<script>
			$(document).ready(function() {
				$board.init("BOARD_001");
				srvLogWrite('O0', '11', '03', '01', '', '');
			});
		</script>

	</head>
	<body>
		<!--2022-11-10 추가 -->
		<div class="nav-2022">
			<div class="leftCol">
				<span id="btnNavTitle">공지사항
					<svg width="12" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z" /></svg>
				</span>		
			</div>
		</div>
		<%@include file="/WEB-INF/jsp/m2020/map/board/navigation.jsp" %>
		<div class="ListSearch" style="padding-top:110px">
			<form id="board-search-form" class="search-result">
				<select id="notice_search_select" class="search-select">
					<option value="post_all" selected="selected">제목 + 내용</option>
					<option value="post_title">제목</option>
					<option value="post_content">내용</option>
				</select>
				<label for="notice_search_title_text" class="Hidden">검색어입력</label> <!-- 2020.09.08 [신예리] 레이블 추가 -->
				<input type="text" id="notice_search_title_text" style="width: 55%;" placeholder="검색어를 입력해주세요."  title="검색 영역"> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
				<button type="submit" class="search-btn" title="검색버튼" onclick="srvLogWrite('O0', '11', '03', '02', $('#notice_search_title_text').val(), '');"></button> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
			</form>
		</div>
		<div class="ContArea" style="margin-top:10px; height:calc(100% - 170px); overflow-y:auto;">
			<div class="Notice">
				<div id="board-list" class="bt"></div>
				<div id="board-list-page" class="Pasing"></div>
			</div>
		</div>
	</body>
</html>