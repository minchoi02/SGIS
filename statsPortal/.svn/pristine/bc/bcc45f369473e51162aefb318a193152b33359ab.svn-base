<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
</head>
<body>
	<link rel="stylesheet" href="/sgis_edu/resource/css/base.css">
	<link rel="stylesheet" href="/sgis_edu/resource/css/common.css">
	<link rel="stylesheet" href="/sgis_edu/resource/css/main_${ss_school_level}.css">
	<link rel="stylesheet" href="/sgis_edu/resource/css/${ss_school_level}.css">
	<link rel="stylesheet" href="/sgis_edu/resource/css/slick.css">
	<style>
		.sceneRela{border:1px solid #ddd;}
		header{z-index:29999};
	</style>
	<script type="text/javascript" src="/sgis_edu/resource/js/common.js?ver=123"></script>
	<script type="text/javascript" src="/sgis_edu/resource/js/slick.min.js"></script>
	<script type="text/javascript">
		$(function(){
			$communityMapCommon.ss_school_grade = '<c:out value="${ss_school_grade}"/>';
			$communityMapCommon.edu_url = '/view/edu/'+ '<c:out value="${ss_school_level}"/>'+'/community';
		});
	</script>
	<jsp:include page="/view/edu/${ss_school_level}/header"></jsp:include>
	<c:url var="sampleUrl" value="/view/edu/${ss_school_level}/community/sample/download?cmmnty_from_ce=${ss_school_grade}" scope="session"></c:url>
	<c:url var="introUrl" value="/view/edu/${ss_school_level}/community/together_list" scope="session">
		<c:forEach var="parameterItem" items="${param }">
			<c:if test="${parameterItem.key!='cmmnty_map_id' }">
				<c:param name="${parameterItem.key }" value="${parameterItem.value }"/>
			</c:if>
		</c:forEach>
	</c:url>
</body>
</html>