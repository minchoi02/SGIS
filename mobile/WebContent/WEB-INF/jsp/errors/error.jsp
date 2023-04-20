<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
<!docType html>
<html lang="ko">
<head>
	<%@include file="/WEB-INF/jsp/includes/includeHeaderFile.jsp" %>
	<title>오류 페이지입니다</title>
</head>
<body>
	<div class="Wrap">
		<div class="Header">
			<c:set var="metaTitle" value="${pageContext.errorData.statusCode == 404?'':'오류 페이지'}" scope="request"/>
			<%@include file="/WEB-INF/jsp/includes/header.jsp" %>
		</div>
		<div class="Content">
			<div style="text-align: center;padding-top: calc(100vh/2.8);font-size:20px;">
				<c:choose>
					<c:when test="${pageContext.errorData.statusCode == 400}">요청 실패. 문법상 오류가 있어서 서버가 요청사항을 이해하지 못하였습니다.</c:when>
					<c:when test="${pageContext.errorData.statusCode == 401}">권한이 존재하지 않습니다</c:when>
					<c:when test="${pageContext.errorData.statusCode == 403}">접근금지된 페이지입니다</c:when>
					<c:when test="${pageContext.errorData.statusCode == 404}">존재하지 않는 페이지입니다</c:when>
					<c:when test="${pageContext.errorData.statusCode == 405}">허용되지 않는 페이지입니다</c:when>
					<c:when test="${pageContext.errorData.statusCode == 406}">받아들일 수 없습니다</c:when>
					<c:when test="${pageContext.errorData.statusCode == 407}">프록시 서버의 인증이 필요합니다</c:when>
					<c:when test="${pageContext.errorData.statusCode == 408}">요청 시간이 초과되었습니다</c:when>
					<c:when test="${pageContext.errorData.statusCode == 409}">요청을 처리하는 데 문제가 발생하였습니다</c:when>
					<c:when test="${pageContext.errorData.statusCode == 410}">영구적으로 사용할 수 없는 페이지입니다</c:when>
					<c:when test="${pageContext.errorData.statusCode == 411}">클라이언트가 헤더에 Content-Length를 포함하지 않으면 서버가 처리할 수 없습니다</c:when>
					<c:when test="${pageContext.errorData.statusCode == 412}">선결조건 실패하였습니다. 헤더에 하나 이상의 선결조건을 서버에서 충족시킬 수 없습니다</c:when>
					<c:when test="${pageContext.errorData.statusCode == 413}">요청된 문서가 현재 서버가 다룰 수 있는 크기보다 큽니다</c:when>
					<c:when test="${pageContext.errorData.statusCode == 414}">요청한 URI 길이가 초과되었습니다</c:when>
					<c:when test="${pageContext.errorData.statusCode == 415}">요청이 알려지지 않은 형태입니다</c:when>
					<c:when test="${pageContext.errorData.statusCode == 500}">서버 내부 오류가 발생하였습니다</c:when>
					<c:when test="${pageContext.errorData.statusCode == 501}">필요한 기능이 서버에 설치되지 않았습니다</c:when>
					<c:when test="${pageContext.errorData.statusCode == 502}">게이트웨이 상태 나빠 접속하실 수 없습니다</c:when>
					<c:when test="${pageContext.errorData.statusCode == 503}">외부 서비스가 죽었거나 현재 멈춘 상태 또는 이용할 수 없는 서비스입니다</c:when>
					<c:when test="${pageContext.errorData.statusCode == 505}">해당 HTTP 버전을 지원하지 않음.</c:when>
					<c:otherwise>
						알수 없는 오류코드입니다
					</c:otherwise>
				</c:choose>
			</div>
			<%@include file="/WEB-INF/jsp/includes/copyright.jsp" %>
		</div>
	</div>
</body>
</html>