<%@page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="tags" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="heumTag" uri="/WEB-INF/tld/StringUtils.tld"%>
<% pageContext.setAttribute("crlf", "\r\n"); %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<c:set var="sgisCtx" value=""/>
<c:set var="currentUrl" value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}${requestScope['javax.servlet.forward.request_uri'] }?${pageContext.request.queryString }"/>
<security:authorize var="loggedIn" access="isAuthenticated()" />
<security:authentication property="name" var="loginUsername"/>
