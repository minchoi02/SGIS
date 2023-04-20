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
             srvLogWrite('A0', '12', '06', '00', '', '서비스 이용방법-오늘의 구인현황');
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
								<li><a href="/view/newhelp/workroad_help_20_0" class="on">ㆍ오늘의 구인현황</a></li>
								<li><a href="/view/newhelp/workroad_help_20_1">ㆍ일자리 보기</a></li>
								<li><a href="/view/newhelp/workroad_help_20_2">ㆍ구인 현황분석</a></li>
								<li><a href="/view/newhelp/workroad_help_20_3">ㆍ일자리 통계분석	</a></li>
							</ul>
						</li>													
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>오늘의 구인현황</h1>
					<h2>○ 기본 조회 화면</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 오늘의 구인현황 대쉬보드와 차트 정보표출</h2>		
					<h2>&nbsp;&nbsp;&nbsp;- 전체 구인의 구인자 수 지도표출</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 지표 별 항목 클릭 시 해당 지표의 상세조회 정보 표출</h2>					
<!-- 					<img src="/img/newhelp/workroad_20_0_0.png"  style="width:700px;" alt="오늘의 구인현황 기본 조회 화면"/> -->
					<img src="/img/newhelp/workroad_20_0_0_001.png"  style="width:700px;" alt="오늘의 구인현황 기본 조회 화면"/>
					<h2 style="text-align:center;">[오늘의 구인현황 기본 조회 화면]</h2><br>
					<!-- <br> -->
					<!-- <h2>1) 지역 선택 : 선택한 지역의 구인 현황의 대쉬보드와 차트를 조회 합니다.</h2> -->
					<!-- <h2>2) 차트정보 : 선택한 지표의 상세정보와 그에 해당하는 자료를 데이터보드와 지도에 출력합니다.</h2> -->
					<!-- <h2>3) 기간 : 선택한 기간에 따른 차트 정보를 조회합니다.</h2> -->
					<!-- <h2>4) 지도 : 선택한 지역의 상세정보를 봅니다.</h2> -->
					<!-- <h2>5) 데이터보드 : 데이터보드를 활성화 합니다.</h2> -->
					<br><br><br>
					<h2>○ 상세 조회 화면</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 선택한 지표의 구인현황 대쉬보드와 차트 정보표출</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 선택된 지표 항목의 구인자 수 지도 및 구인 현황 데이터보드 표출</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 차트 내 항목 클릭 시 해당 데이터의 상세조회 정보 표출</h2>					
					<img src="/img/newhelp/workroad_20_0_1.png"  style="width:700px;" alt="오늘의 구인현황 상세 조회 화면"/>
<!-- 					<img src="/img/newhelp/workroad_20_0_1_001.png"  style="width:700px;" alt="오늘의 구인현황 상세 조회 화면"/> -->
					<h2 style="text-align:center;">[오늘의 구인현황 상세 조회 화면]</h2><br>
					<br>
					<h2>1) 지역 선택 : 선택한 지역의 해당 지표 구인 현황의 대쉬보드와 차트, 데이터보드, 지도 정보를 조회합니다.</h2>
					<h2>2) 차트정보 : 선택한 항목의 상세정보와 그에 해당하는 자료를 데이터보드와 지도에 출력합니다.</h2>
					<h2>3) 기간 : 선택한 기간에 따른 차트 정보를 조회할 수 있습니다.</h2>
					<h2>4) 지도 : 선택한 지역의 상세정보를 볼 수 있습니다.</h2>
					<h2>5) 데이터보드 : 선택한 항목의 구인 현황 및 지역별 데이터를 조회합니다.</h2>
					<h2>6) 데이터보기 : 세부적인 시도별 구인 현황 정보를 확인합니다.</h2>
					<h2>7) 지도 분할 : 지도를 최대 3개까지 분할하여 최대 3개 시점에 대한 데이터를 비교할 수 있다.</h2>					
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
