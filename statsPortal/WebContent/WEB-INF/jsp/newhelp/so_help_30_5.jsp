<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!doctype html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=1" />
	<link rel="stylesheet" type="text/css" href="/css/newhelp/common.css" />
	<link href="/css/default.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="/css/newhelp/help.css" />
	<script type="text/javascript" src="/js/common/includeHead.js"></script>
	<title>SGIS 플러스 도움말</title>
</head>
<body>
	<div class="wrapper">
		<!--header start-->
		<jsp:include page="/view/newhelp/helpHeader"></jsp:include>
		<!--header end-->
		<div class="container">
			<!--leftmenu-->
			<div class="leftWrap">
				<div class="leftTitle">업종통계지도</div><!-- 190308 방민정수정 -->
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/so_help_10_0">서비스 개요</a></li>
						
						<!-- mng_s 20200331 이진호 / 도움말 현행화,  기본 조작 방법은 대화형 통계지도의 기본 조작 방법 하나로 통합 -->
						<!-- <li><a href="/view/newhelp/so_help_20_0">기본조작 방법</a></li> -->
						<!-- mng_e 20200331 이진호 -->
						
						<li><a href="/view/newhelp/so_help_30_0">서비스 이용방법</a>
							<ul class="sub">
							<!--  190308 방민정수정 시작 -->
								<li><a href="/view/newhelp/so_help_30_0">ㆍ(생활)시도별 생활업종 현황</a></li>
								<li><a href="/view/newhelp/so_help_30_1">ㆍ(생활)시군구별 생활업종현황</a></li>
								<li><a href="/view/newhelp/so_help_30_2">ㆍ(생활)업종밀집도 변화</a></li>
								<li><a href="/view/newhelp/so_help_30_7" >ㆍ(생활)업종별 입지계수 지도</a></li>
								<li><a href="/view/newhelp/so_help_30_3">ㆍ(생활)조건별지역찾기</a></li><!-- 190315 방민정 수정-->
								<li><a href="/view/newhelp/so_help_30_4">ㆍ(생활)후보지 정보보기</a></li><!-- 190315 방민정 수정 -->
								<li><a href="/view/newhelp/so_help_30_6">ㆍ(생활)업종별 개업 현황</a></li>
								<li><a href="/view/newhelp/so_help_30_5" class="on">ㆍ(생활)업종별 뜨는 지역</a></li><!-- 190315 방민정 수정 -->
								<li><a href="/view/newhelp/tc_help_30_0">ㆍ(기술)시도별 기술업종 현황</a></li>
								<li><a href="/view/newhelp/tc_help_30_1">ㆍ(기술)시군구별 기술업종 현황</a></li>
								<li><a href="/view/newhelp/tc_help_30_2">ㆍ(기술)업종밀집도 변화</a></li>
								<li><a href="/view/newhelp/tc_help_30_5">ㆍ(기술)업종별 입지계수 지도</a></li>
								<li><a href="/view/newhelp/tc_help_30_6">ㆍ(기술)조건별 지역찾기</a></li>
								<li><a href="/view/newhelp/tc_help_30_3">ㆍ(기술)지원시설 조회</a></li>
								<li><a href="/view/newhelp/tc_help_30_4">ㆍ(기술)산업단지 조회</a></li>
							<!-- 190308 방민정 끝  -->
							</ul>
						</li>							
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				<!-- 190423 방민정 수정 시작 -->
					<h1>업종별 뜨는 지역</h1>
					<h2>○ 지역 및 기간으로 업종별 뜨는 지역 현황을 제공합니다.</h2>
					<h2>- 업종은 문화체육(5종), 관광(6종), 식품(25종), 소상공인(17종), 산업고용(3종)을 제공합니다</h2>
					<h2>- 지자체 인허가 업종분류는 통계청 산업분류와 체계가 다르며 1:1 매칭이 되지 않습니다.</h2>	
					<h2>- 지자체 인허가 업종분류 관련 문의는 localdata.kr로 하시기 바랍니다.</h2>
					<h2>- 지역을 선택하고, 기간을 선택한 후 상세조건에서 업종을 선택하시면 됩니다.</h2>
					<img src="/img/newhelp/So_030_26.png" alt="업종별 뜨는 지역 조회 방법"/>
					<h2 style="/* margin-left: 250px; */text-align:center;">[업종별 뜨는 지역 조회 방법]</h2>
					<h2>○ 업종별 뜨는 지역을 조회한 결과입니다.</h2>
					<h2>○ 가장 순위가 높은  지역 3곳을 조회할 수 있으며, 관련 업종의 수치도 확인할 수  있습니다.</h2>						
					<img src="/img/newhelp/So_030_27.png" alt="업종별 뜨는 지역 조회 결과"/>					
					<h2 style="/* margin-left: 250px; */text-align:center;">[업종별 뜨는 지역 조회 결과]</h2><br>
					<!-- 190423 방민정 수정 끝 -->
					<br><br>
				</div>
			</div><!--contentsWrap-->
		</div><!--container-->
		<!--footer-->
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
		</footer>
		<!--footer-->
	</div><!--wrapper-->
</body>
</html>
