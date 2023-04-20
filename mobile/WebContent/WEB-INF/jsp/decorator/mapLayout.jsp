<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
<html lang="ko">
<head>
	<title><sitemesh:write property='title'/> | SGIS plus mobile</title>
	<%@include file="/WEB-INF/jsp/includes/includeMapHeaderFile.jsp" %>
	<sitemesh:write property='head'/>
</head>
<body>
	<c:set var="metaTitle" scope="request"><sitemesh:write property='meta.title'/></c:set>
	<div class="Wrap">
		<div class="Header">
			<%@include file="/WEB-INF/jsp/includes/header.jsp" %>
		</div>
		<div class="Content">
			<sitemesh:write property='body'/>
		</div>
	</div>
</body>
</html>