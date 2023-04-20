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
             srvLogWrite('A0', '12', '06', '00', '', '서비스 이용현황-구인 현황분석');
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
				<div class="leftTitle">일자리 맵</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/workroad_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/workroad_help_20_0">서비스 이용방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/workroad_help_20_0">ㆍ오늘의 구인현황</a></li>
								<li><a href="/view/newhelp/workroad_help_20_1">ㆍ일자리 보기</a></li>
								<li><a href="/view/newhelp/workroad_help_20_2" class="on">ㆍ구인 현황분석</a></li>
								<li><a href="/view/newhelp/workroad_help_20_3">ㆍ일자리 통계분석	</a></li>
							</ul>
						</li>													
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>구인 현황분석</h1>
					<h2>○ 기본 조회 화면</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 구인현황분석별 검색 조건을 생성 할 수 있습니다.</h2>
					
					<!-- mng_s 20200403 이진호 / 도움말 현행화 -->		
					<!--<img src="/img/newhelp/workroad_20_2_0.png"  style="width:700px;" alt="구인 현황분석 기본 조회 화면"/> -->
					<img src="/img/newhelp/workroad_20_2_0_001.png"  style="width:700px;" alt="구인 현황분석 기본 조회 화면"/>
					<h2 style="text-align:center;">[구인 현황분석 기본 조회 화면]</h2><br>
					<!-- mng_e 20200403 이진호 -->
					<br>
					<h2>1) 지역 찾기 : 관심 지역을 선택 할 수 있습니다.</h2>
					<h2>2) 대상 선택하기 : 대상을 선택 할 수 있습니다.</h2>
					<h2>3) 구인현황분석 : 구인현황분석을 선택하면 검색 조건 생성 및 업종 상세조건을  선택 할 수 있습니다.</h2>
					<h2>4) 기간설정 : 기간을 설정 할 수 있습니다.</h2>
					<h2>5) 업종 상세조건 선택 : 선택한 구인현황분석의 상세조건을 선택 할 수 있습니다.</h2>					
					<img src="/img/newhelp/workroad_20_2_1.png"  style="width:700px;" alt="구인 현황분석 기본 조회 검색 버튼 화면"/>
					<br>
					<h2>1) 검색 조건 : 그림 3-1에서 선택하여 생성 한 검색 조건 입니다.</h2>
					<h2>2) 토글 버튼 : 검색 조건창을 숨길 수 있습니다.</h2>					
					<img src="/img/newhelp/workroad_20_2_2.png"  style="width:700px;" alt="구인 현황분석 기본 조회 검색 결과 화면"/>
					<br>
					<h2>1) 지도 : 구인현황분석 정보를 지역별로 지도에 표출 합니다.</h2>
					<h2>2) 그래프 : 구인현황분석 정보를 지역별 그래프로 표출 합니다.</h2>
					<h2>3) 표 : 구인현황분석 정보를 지역별 표로 표출 합니다.</h2>					
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
