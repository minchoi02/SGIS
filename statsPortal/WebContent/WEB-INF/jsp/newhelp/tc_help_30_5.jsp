<!-- 2017.11.25 [개발팀] -->
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

    <script type="text/javascript">
        $(document).ready(function(){
             srvLogWrite('A0', '12', '08', '00', '', '서비스 이용방법-(기술)업종별 입지계수 지도');
        });
    </script> 
        
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
						<!-- 190308 방민정수정 -->
						<li><a href="/view/newhelp/so_help_10_0">서비스 개요</a></li>
						
						<!-- mng_s 20200331 이진호 / 도움말 현행화,  기본 조작 방법은 대화형 통계지도의 기본 조작 방법 하나로 통합 -->
						<!-- <li><a href="/view/newhelp/so_help_20_0">기본조작 방법</a></li> -->
						<!-- mng_e 20200331 이진호 -->
						
						<li><a href="/view/newhelp/so_help_30_0">서비스 이용방법</a>
					 	<!--
						<li><a href="/view/newhelp/tc_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/tc_help_20_0">기본조작 방법</a></li>
						<li><a href="/view/newhelp/tc_help_30_0">서비스 이용방법</a>
						190308 방민정수정 -->
							<ul class="sub">
							<!--  190308 방민정수정 시작 -->
								<li><a href="/view/newhelp/so_help_30_0">ㆍ(생활)시도별 생활업종 현황</a></li>
								<li><a href="/view/newhelp/so_help_30_1">ㆍ(생활)시군구별 생활업종현황</a></li>
								<li><a href="/view/newhelp/so_help_30_2">ㆍ(생활)업종밀집도 변화</a></li>
								<li><a href="/view/newhelp/so_help_30_7" >ㆍ(생활)업종별 입지계수 지도</a></li>
								<li><a href="/view/newhelp/so_help_30_3">ㆍ(생활)조건별지역찾기</a></li><!-- 190315 방민정 수정-->
								<li><a href="/view/newhelp/so_help_30_4">ㆍ(생활)후보지 정보보기</a></li><!-- 190315 방민정 수정 -->
								<li><a href="/view/newhelp/so_help_30_6">ㆍ(생활)업종별 개업 현황</a></li>
								<li><a href="/view/newhelp/so_help_30_5">ㆍ(생활)업종별 뜨는 지역</a></li>
								<li><a href="/view/newhelp/tc_help_30_0">ㆍ(기술)시도별 기술업종 현황</a></li>
								<li><a href="/view/newhelp/tc_help_30_1">ㆍ(기술)시군구별 기술업종 현황</a></li>
								<li><a href="/view/newhelp/tc_help_30_2">ㆍ(기술)업종밀집도 변화</a></li>
								<li><a href="/view/newhelp/tc_help_30_5" class="on">ㆍ(기술)업종별 입지계수 지도</a></li>
								<li><a href="/view/newhelp/tc_help_30_6">ㆍ(기술)조건별 지역찾기</a></li>
								<li><a href="/view/newhelp/tc_help_30_3">ㆍ(기술)지원시설 조회</a></li>
								<li><a href="/view/newhelp/tc_help_30_4">ㆍ(기술)산업단지 조회</a></li>
							<!--
								<li><a href="/view/newhelp/tc_help_30_0">ㆍ시도별 기술업종 현황</a></li>
								<li><a href="/view/newhelp/tc_help_30_1">ㆍ시군구별 기술업종 현황</a></li>
								<li><a href="/view/newhelp/tc_help_30_2">ㆍ업종밀집도 변화</a></li>
								<li><a href="/view/newhelp/tc_help_30_5" class="on">ㆍ업종별 입지계수 지도</a></li>
								<li><a href="/view/newhelp/tc_help_30_6">ㆍ조건별 지역찾기</a></li>
								<li><a href="/view/newhelp/tc_help_30_3">ㆍ지원시설 조회</a></li>
								<li><a href="/view/newhelp/tc_help_30_4">ㆍ산업단지 조회</a></li>
								 190308 방민정 끝  -->
							</ul>
						</li>							
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>업종별 입지계수 지도</h1>
					<h2>○ 기술업종에 대한 지역별 입지계수 정보를 조회합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 기술업종을 선택하면 지도상에 입지계수 정보를 확인할 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 사업체/종사자 기준으로 입지계수 정보를 조회할 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 데이터보드 상에서 지역별 입지계수정보를 그래프로 제공합니다. </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 시계열을 통해 년도별 입지계수정보를 조회할 수 있습니다.</h2>
					
					<!-- mng_s 20200401 이진호 -->
					<!-- <img src="/img/newhelp/Tc_help_30_5_1.png" width=700 height=auto border=0 alt="업종별 입지계수 지도"/>	 -->
					<img src="/img/newhelp/Tc_help_30_5_1_001.png" width=700 height=400px; border=0 alt="업종별 입지계수 지도"/>
					<!-- mng_s 20200401 이진호 -->
						
					<h2 style="text-align:center;">[업종별 입지계수 지도]</h2><br>
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
