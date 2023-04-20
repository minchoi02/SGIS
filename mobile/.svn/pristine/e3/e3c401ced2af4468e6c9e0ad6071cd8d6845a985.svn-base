<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html>
<head>
	<title>마이페이지</title>
	<meta name="title" content="마이페이지">
	<link rel="stylesheet" href="${ctx }/resources/css/mypage.css" />
	
	<script>
	srvLogWrite("M0","01", "07", "00", "", "");		//내주변 통계
	</script>
</head>
<body>
	<div class="ContArea">
		<h1>통계조회 히스토리</h1>
		<div class="SearchHistory">
			<c:forEach items="${holder.source }" var="list">
				<a href="${ctx }/map/interactive.sgis?id=${list.histId }">
					<span class="Part Part1">대화형 통계지도</span>
					<fmt:parseDate var="dateString" value="${list.regTs}" pattern="yyyy.MM.dd HH:mm:ss" />
					<span class="Date"><fmt:formatDate value="${dateString}" pattern="yyyy년 MM월 dd일 HH:mm:ss" /></span>
					<span class="SearchTerms">${list.histNm }</span>
				</a>
			</c:forEach>
		</div>
		<%@include file="/WEB-INF/jsp/includes/pagingPanel.jsp" %>
	</div>
</body>
</html>
