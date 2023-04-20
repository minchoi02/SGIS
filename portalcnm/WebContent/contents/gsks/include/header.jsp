<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%--
  if(loginYn.equals("N")) {
    out.print("<script>alert('로그인 해주세요.'); location.href='/contents/sgis_top/sgis00.jsp'; </script>");
  } else {
    if(!sc_authid.equals("01")) out.print("<script>alert('관리자만 이용하실수 있습니다.'); location.href='/contents/sgis_top/sgis00.jsp' ;</script>");
  }
--%>
<!-------------------top 시작----------------------->
<!DOCTYPE.jsp PUBLIC "-//W3C//DTD.jsp 4.0 Transitional//EN">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=8">
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>SGIS 관리자사이트(CNM)</title>

<link rel="stylesheet" href="/s-portalcnm/contents/gsks/style/style.css" type="text/css" media="all">
<script type="text/javascript" src=./../scripts/javascript.js></script>
<script type="text/javascript" src=./../scripts/common.js></script>
<script type="text/javascript" src=./../scripts/calendar.js></script>
<script type="text/javascript" src=./../scripts/stringUtil.js></script>
<script type="text/javascript" src=./../scripts/divwriter.js></script>

<script src="/s-portalcnm/js/common/common.js"></script>

<!-- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /> -->

<link rel="stylesheet" href="/s-portalcnm/html/include/css/login.css" />
<link rel="stylesheet" href="/s-portalcnm/html/include/css/default.css" />
 
<script type="text/javascript" src="/s-portalcnm/html/include/js/jquery-1.11.0.min.js"></script>
 
<script type="text/javascript" src="/s-portalcnm/html/include/js/default.js"></script>
<script type="text/javascript" src="/s-portalcnm/js/common/includeHead.js"></script>
<!-- <script type="text/javascript" src="/s-portalcnm/js/common/common_data.js"></script> -->

<script type="text/javascript">
function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}
function calender_view(data){
  if(data=="on")document.getElementById('popup_calendar').style.display="block";
  if(data=="off")document.getElementById('popup_calendar').style.display="none";
}
</script>
<noscript>
<p><a href="#">이 페이지에는 자바스크립트가 사용되었습니다.</a></p>
</noscript>
<script type="text/javascript" src=./../scripts/flash.js></script>
<noscript>
<p><a href="#">이 페이지에는 자바스크립트가 사용되었습니다.</a></p>
</noscript>
<style>
</style>
</head>
<body>
	<div class="wrapper">
	<!-- cls:header start -->
		<div class="header">
			<div class="defaultbox">
				<div class="logo">
					<a href="#"><img src="/s-portalcnm/html/include/img/pic/pic_logo.png"
						alt="logo" /></a>
				</div>
				<div class="navi">
					<a href="#">마이페이지</a>
				</div>
			</div>
			<div class="menuWrapper">
				<div class="menuCnm">
					<ul>
						<li><a>서비스 현황</a></li>
						<li><a>사용자 현황</a></li>
						<li><a class="on">서비스 관리</a></li>
						<li><a>정보 관리</a></li>
						<li><a>게시판 관리</a></li>
						<li><a>회원 관리</a></li>
					</ul>
				</div>
			</div>
			<div class="subMenuWrapper">
				<div class="subMenu"></div>
			</div>
		</div>
		<!-- cls:header end -->