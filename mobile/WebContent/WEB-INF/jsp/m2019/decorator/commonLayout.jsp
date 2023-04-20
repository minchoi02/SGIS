<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/m2019/includes/taglib.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
<html lang="ko">
<head>
	<title><sitemesh:write property='title'/> | SGIS plus mobile</title>
	<%@include file="/WEB-INF/jsp/m2019/includes/includeHeaderFile.jsp" %>
	<sitemesh:write property='head'/>
	<c:set var="metaTitle" scope="request"><sitemesh:write property='meta.title'/></c:set>
</head>
<body>
	<div class="Wrap">
		<!-- <div class="Header"> -->
			<%@include file="/WEB-INF/jsp/m2019/includes/header.jsp" %>
		<!-- </div> -->
		<div class="Content">
			<sitemesh:write property='body'/>
			<%@include file="/WEB-INF/jsp/m2019/includes/copyright.jsp" %>
		</div>
	</div>
	<%@include file="/WEB-INF/jsp/m2019/includes/popup.jsp" %>
</body>
</html>