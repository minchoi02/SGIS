<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
    <head>
		<meta charset="utf-8">
		<meta name="format-detection" content="telephone=no" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		
		<script src="/js/common/includeHead.js"></script>
		<script src="/js/common/common.js"></script>
		<script src="/js/util/fontplus.js"></script>

		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/common.css">
		<!--알림마당 컨텐츠 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/contents.css">
		<!--게시판 css 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/board.css">
		
		<title>알림마당|통계지리정보서비스</title>
		
		<script>
			var menuType = 'intro1';
			$(document).ready(function() {
				srvLogWrite('A0', '14', '01', '00', 'SGIS플러스 소개', 'SGIS플러스 소개 및 연혁');
				$fontplus.item = $(".intro-text,#board-thema th,#board-thema td, #board-thema span");
				$fontplus.box = $(".type-intro");
			});
		</script>
	</head>
	<body>
		<div id="wrap">
			<!-- header // -->
			<header>
				<!-- Top Include -->
				<jsp:include page="/view/common/includeSearch"></jsp:include>
			</header>
			
			<!--contents-->
			<div id="container" class="sub">
				<%@include file="/jsp/board/includeLeftMenu.jsp" %>
				<div id="content">
					<div id="title-area">
						<ul class="location">
						<!-- 190313 방민정 수정 시작 -->
							<li><a href="/view/view/index"><img src="/images/common/location_home.gif" alt="홈으로"/></a></li>
							<li><a href="/view/board/sopBoardMain">알림마당</a></li>
							<li><a href="/view/board/sopIntro01">SGIS플러스 소개</a></li>
							<li><a href="/view/board/sopIntro01"><em>SGIS플러스 소개 및 연혁</em></a></li>
						<!-- 190313 방민정 수정 끝 -->
						</ul>
						<h1 class="sub-title">SGIS플러스 소개 및 연혁</h1>
					</div>
					<div id="contents" class="view">
						<!--view-->
						<div class="header-infor">
							<h2>SGIS플러스란?</h2>
							<div id="fontplusbtn"></div>
							<div class="box">
								<div class="edge-top"></div>
								<div class="icon type-intro">
									<p class="intro-text" style="word-break:break-all !important">
										SGIS플러스는 SGIS(Statistical Geographic Information Service)를 기반으로 개방, 공유, 소통, 참여가 가능한
										개방형 플랫폼입니다.
										사용자에게 통계정보와 지리정보를 융·복합하여 새로운 서비스를 만들 수 있는 기반을 지원합니다. 
										또한, 포털 서비스를 통해 사용자가 직접 플랫폼에서 제공하는 다양한 대화형 통계지도, 통계주제도 등의 다양한
										서비스를 이용할 수 있습니다. 
									</p>
								</div>
								<div class="edge-bot"></div>
							</div>
						</div>
						<h3>개념도</h3>
						<div class="intro-img">
							<img  src="/publish_2018/include/images/contents/sgis_intro01.png" alt="사용자 참여, 개방 및 공유, 정보융합을 3대 축으로 한 위치기반 국민생활 데이터 허브">
							<!-- 190307 방민정수정 시작 -->
							<img  src="/publish_2018/include/images/contents/sgis_intro03.png" alt="사용자 참여, 개방 및 공유, 정보융합을 3대 축으로 한 위치기반 국민생활 데이터 허브">
							<!--<img  src="/publish_2018/include/images/contents/sgis_intro02.png" alt="사용자 참여, 개방 및 공유, 정보융합을 3대 축으로 한 위치기반 국민생활 데이터 허브">
							190307 방민정 수정 끝
							-->
						</div>
						<h3>SGIS플러스 연혁</h3>
						<div id="board-thema" >
							<table class="board-list type02 letter0 fontplus">
								<caption >SGIS플러스 연혁</caption>
								<colgroup>
									<col style="width: 151px;">
									<col>
								</colgroup>
								<tbody>
								
									<!-- mng_s 20210312 이진호, 2020년 추가 -->
									<tr>
										<th>2020년</th>
										<!-- mng_s 20210312 이진호, 문구 수정 -->
										<td class="letter0">My통계로, e-지방지표 서비스 개시</td>
										<!-- mng_e 20210312 이진호 -->
									</tr>
									<!-- mng_e 20210312 이진호 -->
									
									<tr>
										<th>2019년</th>
										<!-- mng_s 20210312 이진호, 문구 수정 -->
										<td class="letter0">일자리맵 서비스 개시, 지도위치·통계 검색기능 개선</td>
										<!-- mng_e 20210312 이진호 -->
									</tr>
									<tr>
										<th>2018년</th>
										<td class="letter0">분석지도 UI개편, 통계주제도 신규지표 서비스 개시<span style="font-size:11px;margin-left:10px">(응급시설 접근현황 등 3종)</span><br />
										SGIS 스마트플랫폼 1단계 구축
										</td>
									</tr>
									<tr>
										<th>2017년</th>
										<td class="letter0">정책통계지도, 기술업종 통계지도, 통계갤러리, 그리드서비스 개시</td>
									</tr>
									<tr>
										<th>2016년</th>
										<td class="letter0">살고싶은 우리동네, 지역현안 소통지도, 모바일서비스, 위치기반데이터관리시스템 서비스 개시</td>
									</tr>
									<tr>
										<th>2015년</th>
										<td class="letter0">SGIS 오픈플랫폼 전국 서비스 실시<span style="font-size:11px;margin-left:10px">(대화형 통계지도, 통계주제도, 우리동네 생활업종 서비스 등)</span></td>
									</tr>
									<tr>
										<th>2014년</th>
										<td class="letter0">SGIS 오픈플랫폼 1단계 구축</td>
									</tr>
									<tr>
										<th>2013년</th>
										<td class="letter0">SGIS 오픈플랫폼 정보화전략계획(ISP) 수립</td>
									</tr>
									<tr>
										<th>2012년</th>
										<td class="letter0">SGIS 화면·기능 개선, OPEN API 개선</td>
									</tr>
									<tr>
										<th>2011년</th>
										<td class="letter0">통계지도 시계열 서비스, S-통계 네비게이터, 지도로 보는 행정구역 통계 서비스 개시</td>
									</tr>
									<tr>
										<th>2009년</th>
										<td class="letter0">통계지리정보서비스(SGIS) 전국 서비스 실시</td>
									</tr>
									<tr>
										<th>2008년</th>
										<td class="letter0">전국 자료 구축 및 시스템 확충</td>
									</tr>
									<tr>
										<th>2007년</th>
										<td class="letter0">특·광역시 대상 서비스 실시(12월)</td>
									</tr>
									<tr>
										<th>2006년</th>
										<td class="letter0">대전광역시 대상 시범서비스 실시(12월)</td>
									</tr>
								</tbody>
							</table>
						</div>
						<!--//view-->
					</div>
				</div>
			</div>
			<!--//contents-->
            <!-- footer// -->
		    <footer id="footer">
		    	<!-- Bottom Include -->
				<jsp:include page="/view/common/includeBottom"></jsp:include>
		    </footer>
        </div>
    </body>
</html>