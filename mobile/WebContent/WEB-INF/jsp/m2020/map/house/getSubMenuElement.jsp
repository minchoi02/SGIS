<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<%
   //치환 변수 선언
	pageContext.setAttribute("cr", "\r"); //Space
	pageContext.setAttribute("cn", "\n"); //Enter
	pageContext.setAttribute("crcn", "\r\n"); //Space, Enter
	pageContext.setAttribute("br", "<br/>"); //br 태그
%> 
<c:forEach var="map" items="${mlsfcLists }" varStatus="depth">
	<c:if test="${map.value.info.recmd_region_search_disp_yn=='Y' }">
		<c:forEach var="depthName" items="${map.key }">
			<li class="infoMenu ${depth.count==1?'on':''}" data-index="${depth.count }">
				<span id="lifeMenuCount${depth.count }"></span>
				<a href="javascript:void(0);" data-id="${depthName }" class="lifeMenu${depth.count }">${mlsfcLists[depthName].info.b_class_idx_nm  }</a>
			</li>
			<li style="width: 10px;"></li>
		</c:forEach>
	</c:if>
</c:forEach>