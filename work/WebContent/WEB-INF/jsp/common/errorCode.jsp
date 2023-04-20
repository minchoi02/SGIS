<%
/**************************************************************************************************************************
* Program Name  : 잘못된 페이지 접근 JSP  
* File Name     : errorCode.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE>
<html lang="ko">
<head>
    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>잘못된 페이지 접근 | SGISwork</title>
    <link href="${pageContext.request.contextPath}/css/default.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHead.js"></script>
    <script src="${pageContext.request.contextPath}/js/common/common.js"></script>
</head>
<body style="height: 200px;">
	<div id="wrap">
	    <!-- body -->
	    <div id="container">
	    	<div class="errorBody">
	    		<div class="errorMessage">
	    			잘못된 페이지 접근입니다.
	    		</div>
	    	</div>
	    </div>
	</div>
</body>
</html>