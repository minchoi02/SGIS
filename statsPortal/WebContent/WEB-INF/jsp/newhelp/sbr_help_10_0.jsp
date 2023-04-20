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
				<div class="leftTitle">기업생태분석지도</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/urBan_help_10_0" class="on">서비스 개요</a></li>
						<!-- <li><a href="/view/newhelp/totSurv_help_30_0">서비스 이용방법</a></li> -->
					</ul>
				</div>
			</div>
			<!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>서비스 개요</h1><br>
					
					<h2>○ 통계청 기업통계등록부(SBR)의 기업체 기준 통계자료를 바탕으로 사용자의 편리한 이용을 위해</h2> 
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;8개의 기업생태 테마를 구성했으며, 제공하는 다양한 지표와의 </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;융합을 통해 보다 세밀하고 알기 쉬운 분석 경험을 얻을 수 있도록 구성되어 있습니다.</h2>
					<br/><br/>
					<h2>○ SGIS 홈페이지 > 분석지도 > 기업생태분석지도 클릭하면 서비스로 이동합니다.</h2>
					<br/><br/>
					<h2>○ 주요기능</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 기업의 생태를 지도로 볼 수 있는 지도로 생태분석, 조건별 지역찾기 시각화 기능 제공</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 지역을 클릭 시 지역의 기업생태분석을 다방면으로 확인할 수 있는 지역분석</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 선택 지역과 유사한 지역을 찾을 수 있는 지역시그널과 관심업종의 현재 구인중인 일자리보기 기능 제공</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 선택 지역의 업종, 기업, 공간에 대한 종합분석 결과를 확인하고, 다운로드할 수 있는 기능 제공</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 기업과 인구, 가구, 주택, 농림어업을 비교하여 볼 수 있는 함께보기 기능 제공</h2>
					
			
					<img src="/img/sbr/help1.png" style="margin-left: 0px;width:628px;" alt="기업생태지도 화면">
					<img src="/img/sbr/help2.png" style="margin-left: 0px;width:628px;" alt="기업생태지도 화면">
					<img src="/img/sbr/help3.png" style="margin-left: 0px;width:628px;" alt="기업생태지도 화면">
					
			
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