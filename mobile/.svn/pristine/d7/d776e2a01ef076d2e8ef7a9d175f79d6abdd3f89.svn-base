<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
<html lang="ko">
<head>
	<title><sitemesh:write property='title'/> | SGIS plus mobile</title>
	<%@include file="/WEB-INF/jsp/includes/includeHeaderFile.jsp" %>
	<sitemesh:write property='head'/>
	<c:set var="metaTitle" scope="request"><sitemesh:write property='meta.title'/></c:set>
</head>
<body>
	<div class="Wrap">
	<% if(request.getRequestURI().toString().indexOf("researchPOP") != -1){%>
		<div class="Header">
			<%@include file="/WEB-INF/jsp/includes/header.jsp" %>
		</div>
	<% } %>
		<div class="Content">
			<sitemesh:write property='body'/>
			<% if(request.getRequestURI().toString().indexOf("researchPOP") != -1){%>
			<%@include file="/WEB-INF/jsp/includes/copyright.jsp" %>
			<% } %>
		</div>
	</div>
</body>
</html>