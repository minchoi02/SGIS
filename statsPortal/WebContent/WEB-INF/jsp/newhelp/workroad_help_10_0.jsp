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
	<link rel="stylesheet" type="text/css" href="/css/newhelp/help_plus.css" />
	<script type="text/javascript" src="/js/common/includeHead.js"></script>

	<script type="text/javascript">
        $(document).ready(function(){
             srvLogWrite('A0', '12', '06', '00', '', '서비스 개요');
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
						<li><a href="/view/newhelp/workroad_help_10_0" class="on">서비스 개요</a></li>
						<li><a href="/view/newhelp/workroad_help_20_0">서비스 이용방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/workroad_help_20_0">ㆍ오늘의 구인현황</a></li>
								<li><a href="/view/newhelp/workroad_help_20_1">ㆍ일자리 보기</a></li>
								<li><a href="/view/newhelp/workroad_help_20_2">ㆍ구인 현황분석</a></li>
								<li><a href="/view/newhelp/workroad_help_20_3">ㆍ일자리 통계분석	</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			<!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>서비스 개요</h1>
					<ul class="Cont_List">
						<li>일자리 맵은 워크넷과 인크루트와 사람인에서 수집된 구인정보를 이용하여 오늘의구인현황, 일자리보기, 구인현황분석 등 사용자 조건에 맞는 일자리정보 및 현황을 제공하는 서비스입니다.</li>
						<li>또한 일자리통계분석은 일자리현황,일자리증감,일자리의 질,경제상황,삶의 질 등 지표를 조회할 수 있는 서비스 입니다.</li>
						<li>주요기능
							<ul>
								<li>오늘의 구인현황<br>
								 : 오늘의 구인현황은 워크넷과 인크루트와 사람인에 등록된 오늘 기준의 전체, 신규, 종료 구인의 현황과 일일 증감을 조회할 수 있는 서비스입니다.</li>
								<li>일자리 보기<br>
								 : 일자리 보기는 구인정보를 다양한 조건으로 조회 할 수 있는 서비스입니다.</li>
								<li>구인 현황분석<br>
								 : 구인 현황분석은 워크넷, 인크루트, 사람인 구인 정보를 활용한 다양한 구인 주제도 지원으로 알고 싶은 구인현황에 대한 지역 및 대상별로 조회 할 수 있는 서비스 입니다. </li>
								<li>일자리 통계분석<br>
								 : 일자리 통계분석은 일자리 현황/증감/질, 경제상황, 삶의질을 조회 할 수 있는 서비스입니다. </li>
							</ul>
						</li>
					</ul>

					<h1>화면 구성</h1>
					<ol>
						<li>처음페이지 > 일자리 맵 > 오늘의 구인현황</li>
					</ol>
					<img src="/img/newhelp/img_workroad_1_01.png" style="margin-left: 0px;" alt="오늘의 구인현황 화면구성">
					<ol>
						<li>1) 메뉴선택 : 오늘의 구인현황, 일자리보기, 구인 현황분석, 일자리 통계분석 기능을 실행합니다.</li>
						<li>2) 오늘의 구인현황 : 오늘의 구인 현황에서 관심지역을 선택할 수 있습니다.</li>
						<li>3) 데이터 보드 : 조회된 통계 데이터정보를 그래프 등의 형태로 제공합니다.</li>
						<li>4) 지도 확대/축소 : 지도를 확대 및 축소합니다.</li>
						<li>5) 범례창 : 표시된 통계값의 범례를 표시하며, 범례설정 변경도 가능합니다.</li>
					</ol>
				</div>
			</div>
			<!--contentsWrap-->
		</div>
		<!--container-->
		<!--footer-->
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
		</footer>
		<!--footer-->
	</div>
	<!--wrapper-->
</body>

</html>