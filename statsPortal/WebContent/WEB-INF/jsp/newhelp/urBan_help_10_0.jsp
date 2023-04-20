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
				<div class="leftTitle">도시화 분석 지도</div>
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
					<h2>○ ‘UN 도시분류’ 기준을 적용한 인구변화에 따른 도시화 권역의 변화 모습과 격자 통계정보 및 분석 지표를 제공하는 서비스입니다.</h2>
					<h2>&nbsp;&nbsp;- UN의 도시분류 기준의 공식화: 유럽연합, 유엔 인간거주계획, 세계은행 등 6개 국제기구가 도시 기준을 표준화하기 위해 만든 도시 개념을 `20년 UN 통계위원회에서 공식 채택</h2>
					<br><br>
					<h2>○ 행정구역과는 별개로 1㎢ 격자의 상주인구를 집계한 후, 인구규모를 기준으로 도시, 준도시 권역으로 구분합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;* 격자: 국토를 행정구역과 관계없이 직각으로 교차하는 가로, 세로선으로 구분한 영역</h2>
					<h2>&nbsp;&nbsp;&nbsp;- (도시) 인구가 1,500명 이상인 격자 추출 후 인접한 격자끼리 병합한 격자 그룹 생성, 격자 그룹별 인구 총합이 5만명 이상인 경우 </h2>
					<h2>&nbsp;&nbsp;&nbsp;- (준도시) 인구가 300명 이상인 격자 추출 후 인접한 격자끼리 병합한 격자 그룹 생성, 격자 그룹별 인구 총합이 5천명 이상인 경우</h2>
					<br><br>
					<h2>○ (도시 변화) 도시화 권역(도시, 준도시)의 2000년 이후, 동적 시계열 변화 모습을  제공합니다.</h2>
					<h2>○ (도시화 통계) 도시화 권역(도시, 준도시)의 2015년 이후, 격자 통계데이터 (면적, 인구, 가구, 주택, 사업체, 종사자) 및 행정구역(시군구)과의 비교 정보를 제공합니다.</h2>
					<h2>○ (도시화 지표 분석) 도시화 관련 지표(인구밀도, 평균나이, 노령화지수, 1인가구 비율, 아파트비율)의 시계열 변화와 권역 순위, 다른 권역과의 비교 정보 등을 제공합니다.</h2>
					<br><br>
					<h1>화면 구성</h1>
					<ol>
						<li>○ 처음페이지>분석지도>도시화 분석 지도>도시 변화</li>
					</ol>
					<img src="/img/newhelp/urBan_help_01_1.png" style="margin-left: 0px;width:628px;" alt="도시 변화지도 화면">
					<ol>
						<li>1) 재생, 정지 기능을 통해 도시화 권역의 동적 시계열 변화 모습을 2000년부터 최근 시점까지 확인합니다.</li>
						<li>2) 재생, 정지 기능을 통해 도시화 권역의 시계열 변화 모습을 최근 시점부터 역순으로 확인합니다.</li>
						<li>3) 각 연도별 도시화 권역 지도를 이미지 형태로 다운 받을 수 있습니다.</li>
						<li>4) 이용자가 선호하는 배경지도(일반지도, 백지도)를 설정할 수 있습니다.</li>
					</ol>
					<br/><br/>
					<ol>
						<li>○ 처음페이지>분석지도>도시화 분석 지도>도시화 통계</li>
					</ol>
					<img src="/img/newhelp/urBan_help_01_2.png" style="margin-left: 0px;width:628px;" alt="도시화 통계지도 화면">
					<li>▶ 연도 선택→ 도시/준도시 선택→ 대권역 선택→ 도시화 권역 선택→ 격자 통계데이터 조회</li>
					<ol>
						<li>1) 해당 연도의 도시 및 준도시 권역 분포와 경계를 확인합니다.</li>
						<li>2) 선택한 도시화 권역(도시/준도시)의 격자 통계데이터(면적·인구·가구·주택·사업체·종사자)를 조회합니다.</li>
						<li>3) 선택한 도시화 권역(도시/준도시)의 격자 통계데이터와 행정구역(시군구) 통계데이터를 비교할 수 있습니다.</li>
					</ol>
					<br/><br/>
					<ol>
						<li>○ 처음페이지>분석지도>도시화 분석 지도>도시화 지표 분석</li>
					</ol>
					<img src="/img/newhelp/urBan_help_01_3.png" style="margin-left: 0px;width:628px;" alt="도시화 지표 분석지도 화면">
					<li>▶ 연도 선택→ 도시/준도시 선택→ 대권역 선택→ 도시화 권역 선택→ 도시화 지표 조회</li>
					<ol>
						<li>1) 도시화 관련 지표(인구밀도, 평균나이, 노령화지수, 1인가구 비율, 아파트비율)의 시계열 변화(증감) 및 권역 순위를 확인할 수 있습니다.</li>
					</ol>
					<li>▶ 도시화 지표 조회→ 비교 권역 선택→ 지표 데이터 및 순위 비교</li>
					<ol>
						<li>2) 두 도시화 권역의 지표 데이터 및 순위를 비교 할 수 있습니다.</li>
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