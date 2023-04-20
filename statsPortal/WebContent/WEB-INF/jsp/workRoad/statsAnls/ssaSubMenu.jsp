<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 일자리 통계분석 > 서브메뉴 	
* File Name		: statsAnls > ssaSubMenu.jsp
* Comment		: 
* History		: 2018-09-07	ywKim	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="${pageContext.request.contextPath}/js/workRoad/statsAnls/ssaSubMenu.js"></script>

<div id="ssaSubMenu">

	<div class="expanded">
		<ul class="mid-nav-list" id="ssaSubMenuList">
			<li style="display:none;"><a href="javascript:void(0)" class="active"><span>일자리통계분석</span></a></li>

			<li><a href="javascript:void(0)" class="active"><span>일자리 현황</span></a></li>
			<li><a href="javascript:void(0)" class=""><span>일자리 증감</span></a></li>
			<li><a href="javascript:void(0)" class=""><span>일자리 질</span></a></li>
			<li><a href="javascript:void(0)" class=""><span>경제상황</span></a></li>
			<li><a href="javascript:void(0)" class=""><span>삶의 질</span></a></li>
		</ul>
	</div>

</div>