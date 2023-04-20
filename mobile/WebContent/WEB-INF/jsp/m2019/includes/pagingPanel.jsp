<%@include file="/WEB-INF/jsp/m2019/includes/taglib.jsp" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<c:choose>
	<c:when test="${fn:trim(pageAction)=='' }">
		<c:set var="pageAction" value="${requestScope['javax.servlet.forward.request_uri'] }" scope="request"/>
	</c:when>
	<c:otherwise>
		<c:set var="pageAction" value="${pageAction }" scope="request"/>
	</c:otherwise>
</c:choose>
<c:set var="addQuery" value="" scope="request"/>

<c:choose>
	<c:when test="${fn:contains(pageAction,'?') }">
		<c:set var="tempQuery" value="${fn:substringAfter(pageAction,'?') }"/>
		<c:set var="pageAction" value="${fn:substringBefore(pageAction,'?') }"/>
	</c:when>
	<c:otherwise>
		<c:set var="tempQuery" value="${query }"/>
	</c:otherwise>
</c:choose>
<c:forTokens items="${tempQuery}" delims="&" var="q">
	<c:set var="queryName"><c:out value="${fn:substringBefore(q,'=')}"/></c:set>
	<c:if test="${queryName!='page'&&queryName!='keywords'&&queryName!='fieldType'&&queryName!='sort'&&queryName!='sortOrder' }">
		<c:set var="addQuery" value="${addQuery}&amp;${queryName }=" scope="request"/>
		<c:set var="searchData"><c:out value="${fn:substringAfter(q,'=') }"/></c:set>
		<c:set var="addQuery" value="${addQuery}${searchData }" scope="request"/>
		<c:set var="searchData" value=""></c:set>
	</c:if>
</c:forTokens>
<c:if test="${fn:trim(holder.keywords )!='' }">
	<c:set var="addQuery" value="${addQuery }&keywords=${holder.keywords }" scope="request"></c:set>
</c:if>
<c:if test="${fn:trim(holder.fieldType )!='' }">
	<c:set var="addQuery" value="${addQuery }&fieldType=${holder.fieldType }" scope="request"></c:set>
</c:if>
<div class="Pasing">
	<a class="PasingFst ${holder.firstPage?'PasingOff':'' }" href="${pageAction}?page=1${addQuery}" title="맨앞" onclick="${holder.firstPage?'return false':'' }">◀◀</a><a class="PasingForward ${holder.firstPage?'PasingOff':'' }" href="${pageAction}?page=${holder.firstPage?1:holder.page - 1}${addQuery}" title="이전" onclick="${holder.firstPage?'return false':'' }">◀</a><span><strong>${holder.page }</strong>/${holder.pageCount }</span><a class="PasingNext ${holder.lastPage?'PasingOff':'' }" href="${pageAction}?page=${holder.lastPage?holder.pageCount:holder.page + 1}${addQuery}" title="다음" onclick="${holder.lastPage?'return false':'' }">▶</a><a class="PasingLst ${holder.lastPage?'PasingOff':'' }" href="${pageAction}?page=${holder.pageCount}${addQuery}" title="맨끝" onclick="${holder.lastPage?'return false':'' }">▶▶</a>
</div>
