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
				<div class="leftTitle">행정통계 시각화 지도</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/adminisStats_help_10_0" class="on">서비스 개요</a></li>
						<!-- <li><a href="/view/newhelp/totSurv_help_30_0">서비스 이용방법</a></li> -->
					</ul>
				</div>
			</div>
			<!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>서비스 개요</h1><br>
					<h2>○ 통계청에서 공표하는 다양한 행정통계 데이터를 이용자가 이해하기 쉽게 지도와 차트로 시각화하여 제공하는 서비스입니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 정부부처 및 공공기관에서 수집, 보유하고 있는 행정자료 등을 상호 연계하여 작성한 행정통계 7종의 KOSIS(국가통계포털) 데이터를 바탕으로 구성하였습니다.</h2>
					<br><br>
					<h2>○ (한눈에 보는 통계) 행정통계별 주요지표를 대시보드 형태의 화면으로 제공합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;- (대시보드) 시도/시군구 단위 공표 통계*</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* 신혼부부통계, 주택소유통계, 중·장년층행정통계, 귀농어·귀촌인통계 </h2>
					<h2>&nbsp;&nbsp;&nbsp;- (더보기) 전국 단위 공표 통계*</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* 일자리행정통계, 퇴직연금통계, 임근근로일자리동향 </h2>
					<br><br>
					<h2>○ (자세히 보는 통계) 시도/시군구 단위 공표 통계*의 통계표별 상세 항목 데이터를 지도와 데이터보드 형태의 화면으로 제공합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;* 신혼부부통계, 주택소유통계, 중·장년층행정통계, 귀농어·귀촌인통계 </h2>
					<br><br>
					<h1>화면 구성</h1>
					<ol>
						<li>○ 처음페이지>분석지도>행정통계 시각화 지도>한눈에 보는 통계</li>
					</ol>
					<img src="/img/newhelp/adminisStats_help_01_1.png" style="margin-left: 0px;width:327px;" alt="한눈에 보는 통계지도 화면">
					<ol>
						<li>1) 조회하고자 하는 행정통계명을 선택합니다.</li>
						<li>2) 조회하고자 하는 연도를 설정합니다.</li>
						<li>3) 주요지표별 통계데이터의 특성을 고려한 시각화 차트를 확인합니다.</li>
						<li>4) 선택한 지표(항목)의 지역별 통계데이터를 색상지도(값,비중)로 확인합니다.</li>
						<li>5) 선택한 지표(항목)의 지역 비교를 지역별 차트(순위, 비중)로 확인합니다.</li>
						<li>6) 선택한 지표(항목)의 시계열 변화를 연도별 차트(값, 증감률)로 확인합니다.</li>
						<li>&nbsp;&nbsp;&nbsp;* 지도, 차트, 비교(지역별·연도별) 영역은 지표(항목) 클릭에 따라 상호 반응합니다.</li>
					</ol>
					<br/><br/>
					<ol>
						<li>○ 처음페이지>분석지도>행정통계 시각화 지도>자세히 보는 통계</li>
					</ol>
					<img src="/img/newhelp/adminisStats_help_01_2.png" style="margin-left: 0px;width:326px;" alt="자세히 보는 통계지도 화면">
					<ol>
						<li>1) 각 행정통계별>카테고리별>통계표 목록을 조회하고, 통계표를 선택합니다.</li>
						<li>2) 통계표 구성 항목과 연도를 설정하고, 색상지도와 데이터보드를 조회합니다.</li>
						<li>3) 데이터보드에서 지표(항목)별 통계데이터를 시각화 차트(기본, 시계열, 지역 비교)와 표로 확인합니다.</li>
						<li>4) 선택한 지표(항목)의 지역별 통계데이터를 색상지도(값,비중)로 확인합니다.</li>
						<li>5) 선택한 지표(항목)의 지역 순위(시도/시군구)를 설정하여, 해당 지역의 데이터보드를 손쉽게 조회합니다.</li>
						<li>&nbsp;&nbsp;&nbsp;* 지도 영역과 데이터보드는 기본차트의 범례별 클릭에 따라 상호 반응합니다.</li>
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