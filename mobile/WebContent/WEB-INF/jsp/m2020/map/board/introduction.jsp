<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<title>SGIS 플러스 소개</title>
		<meta name="title" content="알림마당"> 
		
		<script>
			srvLogWrite('O0', '11', '01', '00', '', '');
		</script>

	</head>
	<body>
		<!--2022-11-10 추가 -->
		<div class="nav-2022">
			<div class="leftCol">
				<span id="btnNavTitle">SGIS 플러스 소개
					<svg width="12" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z" /></svg>
				</span>		
			</div>
		</div>
		<%@include file="/WEB-INF/jsp/m2020/map/board/navigation.jsp" %>
		<div class="ContArea" style="margin-top:100px; height:calc(100% - 100px); overflow-y:auto;">
			<div class="IntroArea">
				<h1>SGIS 플러스 소개</h1>
				<ul>
					<li><span class="introducion_circle"></span><h2>SGIS 플러스란?</h2></li>
				</ul>
				<!-- 2020.09.15[한광희] 개행 수정 START -->
				<p style="word-break: keep-all;">SGIS 플러스 는 Statistical Geographic Information Service를 기반으로 개방, 공유, 소통, 참여가 가능한 개방형 플랫폼입니다.<br><br>
					사용자에게 통계정보와 지리정보를 융·복합하여 새로운 서비스를 만들 수 있는 기반을 지원합니다. 또한, 포털 서비스를 통해 사용자가 직접 플랫폼에서 제공하는 다양한 인터랙티브맵, 통계주제도 등의 다양한 서비스를 이용할 수 있습니다.
				</p>
				<!-- 2020.09.15[한광희] 개행 수정 END -->
			</div>
			<div class="ConcepArea">
			<div class="introduction_row">
			<span class="introducion_circle"></span><h2>개념도</h2>
			</div> 
				<p> 
					<img src="${sgisCtx }/img/board/sop_intro_img01.png" alt="사용자 참여, 개방 및 공유, 정보융합을 3대 축으로 한 위치기반 국민생활 데이터 허브" style="max-width: 100%;"/>
				 	<img src="${sgisCtx }/img/newhelp/Us_010_01.png" alt="통계지리정보시스템(SGIS 구성도)" style="max-width: 100%;"/>
				</p>
			</div>
			<div class="HistArea">
				<div class="introduction_row">
				<span class="introducion_circle"></span><h2>SGIS 및 오픈 플랫폼 연혁</h2>
				</div>
				<ul class="History">
					<!-- 2020.09.15[한광희] 개행 수정 START -->
					<li><span>2020년</span><p style="word-break: keep-all;">My통계로, e-지방지표 서비스개시</p></li>
					<li><span>2019년</span><p style="word-break: keep-all;">일자리맵 서비스 개시,지도위치,통계 검색기능 개선</p></li>
					<li><span>2018년</span><p style="word-break: keep-all;">분석지도UI개편,통계주제도 신규지표 서비스 개시(응급시설 접근현황 등 3종)<br/>SGIS스마트플랫폼 1단계 구축</p></li>
					<li><span>2017년</span><p style="word-break: keep-all;">정책통계지도, 기술업종 통계지도, 통계갤러리, 조사업무지원시스템 서비스 개시</p></li>
					<li><span>2016년</span><p style="word-break: keep-all;">살고싶은 우리동네, 지역현안 소통지도, 위치기반데이터관리시스템 서비스 개시</p></li>
					<li><span>2015년</span><p style="word-break: keep-all;">SGIS 오픈플랫폼 전국서비스 개시</p></li>
					<li><span>2014년</span><p style="word-break: keep-all;">SGIS 오픈 플랫폼 1단계 구축</p></li>
					<li><span>2013년</span><p style="word-break: keep-all;">SGIS 오픈 플랫폼 정보화전략계획(ISP) 추진</p></li>
					<li><span>2012년</span><p style="word-break: keep-all;">OGC 표준 준수 웹 GIS 엔진 도입, 통계 네비게이터 개편</p></li>
					<li><span>2011.12</span><p style="word-break: keep-all;">통계지도 시계열 서비스, S-통계 네비게이터, 지도로 보는 행정구역 통계 서비스 개시</p></li>
					<li><span>2009.05 ~</span><p style="word-break: keep-all;">통계지리정보서비스(SGIS) 전국 서비스 실시</p></li>
					<li><span>2008.12</span><p style="word-break: keep-all;">전국 자료 구축 및 시스템 확충</p></li>
					<li><span>2007.12</span><p style="word-break: keep-all;">7개 특, 광역시 서비스 확대</p></li>
					<li><span>2006.12</span><p style="word-break: keep-all;">대전광역시 시범서비스</p></li>
					<!-- 2020.09.15[한광희] 개행 수정 END -->
				</ul>
			</div>
		</div>
	</body>
</html>