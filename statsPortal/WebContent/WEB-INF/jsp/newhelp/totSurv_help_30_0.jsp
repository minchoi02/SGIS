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
				<div class="leftTitle">총조사 시각화 지도</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/totSurv_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/totSurv_help_30_0" class="on">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>총조사 시각화 지도 화면</h1><br>
					<h2>○ 매뉴 및 연도 선택</h2>
					<h2>&nbsp;&nbsp;&nbsp; - 매뉴 선택: 인구, 가구, 주택, 농업, 임업, 어업 중 1가지 매뉴를 선택할 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp; - 연도 선택 : 조회하고자 하는 연도를 선택할 수 있습니다.</h2>
					<img src="/img/newhelp/totSurv_help_02_1.png" style="margin-left: 20px; width:316px; position: relative;left: 193px;" alt="매뉴 및 연도 선택"/>
					<br>
					<br>
				  <h1>순위 설정</h1><br>
					<h2>○ 순위</h2>
					<h2>&nbsp;&nbsp;&nbsp; - 순위를 설정하면 해당하는 순위의 지역정보기준으로 조회됩니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp; - 설정한 순위를 제외한 나머지 순위정보도 같이 조회횝니다.</h2>
					<img src="/img/newhelp/totSurv_help_02_2.png" style="margin-left: 20px; width:316px; position: relative;left: 193px;" alt="순위 설정"/>
					<br>
					<br>
				  <h1>차트 조회</h1><br>
				  	
					<h2>○ 차트 선택 및 조회</h2>
					<h2>&nbsp;&nbsp;&nbsp; - 차트를 선택하면 해당 지표정보를 지도에 시각화합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp; - 선택한 차트를 다시 선택하면 기존 조회정보로 되돌아갑니다.</h2>
					<br>
					<img src="/img/newhelp/totSurv_help_02_3.png" style="margin-left: 20px; width:650px;" alt="차트 조회"/>
					<br>
					<br>
				<h1>상세 화면</h1><br>
					<h2>○ 상세 조회 설정</h2>
					<h2>&nbsp;&nbsp;&nbsp; - 연도 및 지역을 설정하면 해당하는 정보와 일치하는 관심주제가 조회됩니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp; - 관심주제를 설정하면 해당하는 소주제리스트가 조회됩니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp; - 소주제를 설정하면 해당하는 소주제의 통계정보가 표출됩니다.</h2>
				<img src="/img/newhelp/totSurv_help_02_4.png" style="margin-left: 20px; width:650px;" alt="격자 단위 통계조회"/>
					<br>
					<br>
				<h1>지역 선택</h1><br>
					<h2>○ 지역 선택 조회</h2>
					<h2>&nbsp;&nbsp;&nbsp; - 현재 설정한 지역 외에 특정 지역을 선택하여 조회합니다.</h2>
					<br>
				<img src="/img/newhelp/totSurv_help_02_5.png" style="margin-left: 20px; width:650px;" alt="생활권역 단위 통계조회"/>
					<br>
					<br>
				<h1>시계열 화면</h1><br>
					<h2>○ 연속 조회 연도 선택 및 융합보기</h2>
					<h2>&nbsp;&nbsp;&nbsp; - 조회하고자 하는 시작연도, 종료연도를 설정합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp; - 각각의 연도에 조회된 통계정보를 지도에 시각화합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp; - 융합보기를 선택하여 선택된 각각의 연도정보를 융합하여 시각화합니다.</h2>
				<img src="/img/newhelp/totSurv_help_02_6.png" style="margin-left: 20px; width:650px;" alt="격자 단위 통계조회"/>
					<br>
					<h2>○ 융합보기 화면</h2>
				<img src="/img/newhelp/totSurv_help_02_7.png" style="margin-left: 20px; width:650px;" alt="격자 단위 통계조회"/>
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
