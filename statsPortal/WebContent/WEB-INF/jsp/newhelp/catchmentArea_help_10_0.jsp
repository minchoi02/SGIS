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
				<div class="leftTitle">생활권역 통계지도</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/catchmentArea_help_10_0" class="on">서비스 개요</a></li>
						<li><a href="/view/newhelp/catchmentArea_help_30_0">서비스 이용방법</a></li>
					</ul>
				</div>
			</div>
			<!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>서비스 개요</h1>
					<ul class="Cont_List">
						<li>생활권역 통계지도는 사용자가 선택한 특정시설(지점)을 기준으로단위 시간 내 도달 가능한 생활권역(생활반경, 영역)을 시각적으로 제시하고, 해당 영역 내의 통계값을 제공하는 서비스입니다.</li>
						<li>특정시설(지점)의 위치는 검색하거나, 지도에서 지점을 선택할 수 있으며, 미리 분류된 시설유형을 통해 선택 가능합니다.</li>
						<li>도로 정보‧특성을 담고 있는 도로네트워크 자료를 활용한 주행시간, 주행거리 및 반경을 기준으로 영역을 설정하면, 그 영역에 대한 전체정보를 확인하거나 영역 내 자료 분포를 격자* 단위로 조회할 수 있습니다.
							<br>* 격자 : 국토를 행정구역과 관계없이 직각으로 교차하는 가로·세로선으로 구분한 영역
						</li>
						<li>주요기능</li>
						<div id="helperContentWrapper">
							<div id="helperPictures" style="overflow: hidden; margin-top: 20px;">
								<div style="width: 30%; float: left">
									<table class="helper_table">
										<tr>
											<td>① 지점 선택</td>
										</tr>
										<tr>
											<td>미리 분류된 시설 유형 선택,<br>지명검색 또는 지도검색</td>
										</tr>
										<tr>
											<td><img alt="생활권역 생성 지점 선택" src="/images/catchmentArea/helper_table_1_img.png" style="border:0;margin-left:0px;margin-top:0px;width : 200px; height : 100px;"></td>
										</tr>
									</table>
								</div>
								<h4 style="float: left; margin-right: 1%; margin-left: 1%">→</h4>
								<div style="width: 30%; float: left">
									<table class="helper_table">
										<tr>
											<td>② 영역 생성</td>
										</tr>
										<tr>
											<td>주행시간, 주행거리, 반경 등을<br>기준으로 영역 생성</td>
										</tr>
										<tr>
											<td><img alt="생활권역 영역 설정" src="/images/catchmentArea/helper_table_2_img.png" style="border:0;margin-left:0px;margin-top:0px;width : 200px; height : 100px;"></td>
										</tr>
									</table>
								</div>
								<h4 style="float: left; margin-right: 1%; margin-left: 1%">→</h4>
								<div style="width: 30%; float: left">
									<table class="helper_table">
										<tr>
											<td>③ 통계자료 조회</td>
										</tr>
										<tr>
											<td>영역 내 통계자료 및<br>격자 단위 분포 조회</td>
										</tr>
										<tr>
											<td><img alt="통계자료 조회" src="/images/catchmentArea/helper_table_3_img.png" style="border:0;margin-left:0px;margin-top:0px;width : 200px; height : 100px;"></td>
										</tr>
									</table>
								</div>
							</div>
						</div>
					</ul>

					<h1>화면 구성</h1>
					<ol>
						<li>처음페이지 > 활용서비스 > 생활권역 통계지도</li>
					</ol>
					<img src="/img/newhelp/img_catchmentArea_1_01.png" style="margin-left: 0px;" alt="생활권역 통계지도 화면구성_1">
					<ol>
						<li>1) 지역설정 : 지도에서 특정 지역으로 이동하도록 설정합니다.</li>
						<li>2) 중심점 설정 : 생활권역 중심점을 설정합니다.</li>
						<li>3) 축척조정 : 지도의 축척을 조정합니다. 지도의 축소/확대를 수행할 수 있습니다.</li>
						<li>4) 보고서 출력 : 조회한 데이터를 보고서로 나타내며 출력할 수 있습니다</li>
					</ol>
					<img src="/img/newhelp/img_catchmentArea_1_02.png" style="margin-left: 0px;" alt="생활권역 통계지도 화면구성_2">
					<ol>
						<li>5) 영역설정 : 도로길이, 평균 소요시간 등의 정보를 가지고 있는 도로네트워크를 활용하여 주행시간, 주행거리, 반경에 대한 영역을 제공합니다.</li>
					</ol>
					<img src="/img/newhelp/img_catchmentArea_1_03.png" style="margin-left: 0px;" alt="생활권역 통계지도 화면구성_3">
					<ol>
						<li>6) 통계정보 : 선택한 영역의 지도 표출형태를 변경할 수 있으며, 조건을 통해 통계정보를 볼 수 있습니다. </li>
						<li>7) 데이터보드 : 조회된 통계정보에 따라 데이터에 대한 막대그래프, 원형그래프 등 다양하게 데이터를 확인 할 수 있습니다.</li>
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