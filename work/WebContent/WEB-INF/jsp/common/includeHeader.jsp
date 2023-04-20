<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%-- <%@ page trimDirectiveWhitespaces="true"%> --%>
<!DOCTYPE html>
<!-- <html> -->
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeSearch.js"></script>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/common.css" />
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/header/header.css" />
	<script>
		var href = location.href;
		var userdiv = "<%=session.getAttribute("user_div")%>";
		document.write('<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/assets/css/all.css">');
	</script>
	<script src="${pageContext.request.contextPath}/assets/js/chart.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/assets/js/ui.js" type="text/javascript"></script>
</head>
<!-- <body> -->
	<!-- <div class="wrap"> -->
		<div class="topWrap">
			<div class="topBox">
				<div class="top">
					<script>
						document.write("<div class=\"toplogo\" onclick=\"javascript:location.href='${pageContext.request.contextPath}/view/index'\" style=\"cursor:pointer;\"><img src=\"${pageContext.request.contextPath}/img/common/logo.png\" alt=\"logo\"/></div>");
					</script>
					<div class="topM">
						<div class="topAdmin">
							<ul data-tooltip-text="회원정보 및 그룹 관리로 이동합니다.">
								<li class="admin" id="myPageMain"  title="회원정보 관리로 이동합니다." onclick="javascript:location.href='${pageContext.request.contextPath}/view/member/myPageMain'" style="cursor:pointer"></li>
								<li><%=session.getAttribute("user_nm") %> 님</li>
								<li id="user_id" style="display:none;"><%=session.getAttribute("user_id") %></li>
								<li id="" style="display:none;"><%=session.getAttribute("ubis_yn") %></li>
							</ul>
							<button onclick = "location.href ='${pageContext.request.contextPath}/view/auth/logout'"  tabindex="8">로그아웃</button>
						</div>
						<div class="topMenu">
							<ul>
								<li><a href="${pageContext.request.contextPath}/view/metaMng/metaWordList" tabindex="2">메타정보 관리</a></li>
								<li><a href="${pageContext.request.contextPath}/view/prjMng/workSet" tabindex="3">업무자동화</a></li>
								<li><a href="${pageContext.request.contextPath}/view/collectData/addrDbSts" tabindex="4">품질 관리</a></li>
								<li><a href="${pageContext.request.contextPath}/view/myData/myDataCreate" tabindex="5">지오코딩</a></li>
								<li><a href="#" tabindex="6">도시자동화</a></li>
								<li><a href="${pageContext.request.contextPath}/view/member/myPageMain" tabindex="1">사용자 관리</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div><!-- topWrap end-->
		<div class="subMenuWrap">
			<div class="subMenu">
				<ul style = "border:2px">
					<li><a href="${pageContext.request.contextPath}/view/metaMng/metaWordList" tabindex="11">표준용어사전관리</a></li>
					<li><a href="${pageContext.request.contextPath}/view/metaMng/metaDomainList" tabindex="12">도메인관리</a></li>
					<li><a href="${pageContext.request.contextPath}/view/metaMng/metaCodeList" tabindex="13">코드관리</a></li>
					<li><a href="${pageContext.request.contextPath}/view/metaMng/metaSysInfoList" tabindex="14">정보시스템관리</a></li>
					<li><a href="${pageContext.request.contextPath}/view/metaMng/metaTblList" tabindex="15">테이블관리</a></li>
				</ul>
				<ul>
					<li><a href="${pageContext.request.contextPath}/view/prjMng/prjSet" tabindex="21">프로젝트 설정</a></li>
					<li><a href="${pageContext.request.contextPath}/view/prjMng/prjExec" tabindex="22">프로젝트 실행</a></li>
					<li><a href="${pageContext.request.contextPath}/view/prjMng/workSet" tabindex="23">단위업무관리</a></li>
				</ul>
				<ul>
					<li><a href="${pageContext.request.contextPath}/view/collectData/addrDbSts" tabindex="31">품질점검관리</a></li>
					<li><a href="${pageContext.request.contextPath}/view/collectData/addrDbMng" tabindex="32">품질점검실행</a></li>
				</ul>
				<ul>
					<li><a href="${pageContext.request.contextPath}/view/myData/myDataCreate" tabindex="41">지오코딩실행</a></li>
					<li><a href="${pageContext.request.contextPath}/view/myData/myDataCreate" tabindex="42">지오코딩결과</a></li>
				</ul>
				<ul class="urbarMenu">
					<li><a href="${pageContext.request.contextPath}/view/urban/demarcation" tabindex="51">경계획정관리</a></li>
					<li><a href="${pageContext.request.contextPath}/view/urban/denomination" tabindex="52">도시/준도시명 관리</a></li>
					<li><a href="${pageContext.request.contextPath}/view/urban/timeSeries" tabindex="53">시계열 관리</a></li>
				</ul>
			</div>
		</div><!-- subMenuWrap end-->
	<!-- </div> -->