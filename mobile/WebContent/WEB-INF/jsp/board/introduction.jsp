<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<title>SGIS 플러스 소개</title>
		<meta name="title" content="알림마당">
		<link rel="stylesheet" href="${ctx }/resources/css/board.css" />
		
		<script>
			srvLogWrite("M0","01", "09", "01", "", "");		//SGIS 플러스 소개
		</script>
		
	</head>
	<body>
		<%@include file="/WEB-INF/jsp/board/navigation.jsp" %>
		<div class="ContArea">
			<h1>SGIS 플러스 소개</h1>
			<h2>SGIS 플러스란?</h2>
			<p>SGIS 플러스 는 Statistical Geographic Information Service를 기반으로 개방, 공유, 소통, 참여가 가능한 개방형 플랫폼입니다.<br><br>
				사용자에게 통계정보와 지리정보를 융·복합하여 새로운 서비스를 만들 수 있는 기반을 지원합니다. 또한, 포털 서비스를 통해 사용자가 직접 플랫폼에서 제공하는 다양한 인터랙티브맵, 통계주제도 등의 다양한 서비스를 이용할 수 있습니다.
			</p>
			<h2>개념도</h2>
			<p>
				<a href="${sgisCtx }/img/board/sop_intro_img01.png" target="_blank">
					<!-- mng_s 20180530_김건민 -->
					<img src="${sgisCtx }/img/board/sop_intro_img01.png" alt="사용자 참여, 개방 및 공유, 정보융합을 3대 축으로 한 위치기반 국민생활 데이터 허브" style="max-width: 606px;"/>
				</a>
				<a href="${sgisCtx }/img/newHelp/Us_010_01.png" target="_blank">
					<img src="${sgisCtx }/img/newhelp/Us_010_01.png" alt="통계지리정보시스템(SGIS 구성도)" style="max-width: 643px;"/>
					<!-- mng_e 20180530_김건민 -->
				</a>
			</p>
			<h2>SGIS 및 오픈 플랫폼 연혁</h2>
			<ul class="History">
				<li><span>2017년</span>정책통계지도, 기술업종 통계지도, 통계갤러리, 조사업무지원시스템 서비스 개시</li>
				<li><span>2016년</span>살고싶은 우리동네, 지역현안 소통지도, 위치기반데이터관리시스템 서비스 개시</li>
				<li><span>2015년</span>SGIS 오픈플랫폼 전국서비스 개시</li>
				<li><span>2014년</span>SGIS 오픈 플랫폼 1단계 구축</li>
				<li><span>2013년</span>SGIS 오픈 플랫폼 정보화전략계획(ISP) 추진</li>
				<li><span>2012년</span>OGC 표준 준수 웹 GIS 엔진 도입, 통계 네비게이터 개편</li>
				<li><span>2011.12</span>통계지도 시계열 서비스, S-통계 네비게이터, 지도로 보는 행정구역 통계 서비스 개시</li>
				<li><span>2009.05 ~</span>통계지리정보서비스(SGIS) 전국 서비스 실시</li>
				<li><span>2008.12</span>전국 자료 구축 및 시스템 확충</li>
				<li><span>2007.12</span>7개 특, 광역시 서비스 확대</li>
				<li><span>2006.12</span>대전광역시 시범서비스</li>
			</ul>
		</div>
	</body>
</html>