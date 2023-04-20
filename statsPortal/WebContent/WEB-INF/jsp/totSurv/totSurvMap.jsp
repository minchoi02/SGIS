<%
/**************************************************************************************************************************
* Program Name	:  	
* File Name		: totSurvMap.jsp
* Comment		: 
* History		: 
*	2020.08.10	juKwak	신규 - 총조사시각화 지도
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script src="${pageContext.request.contextPath}/js/totSurv/totSurvMap.js"></script>
<div class="mapContents" id="mapRgn_1" style="display:none; height: 560px;"></div><!-- 맵영역 --> 
<div class="resizeIcon"><!-- 리사이즈 아이콘 --></div>   	