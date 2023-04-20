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
             srvLogWrite('A0', '12', '04', '00', '', '서비스 구분별 이용방법-가구통계 조회');
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
				<div class="leftTitle">대화형 통계지도</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/in_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/in_help_20_0">기본조작 방법</a></li>
						<li><a href="/view/newhelp/in_help_50_0">서비스 구분별 이용방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/in_help_50_0">ㆍ인구통계 조회</a></li>
								<li><a href="/view/newhelp/in_help_50_1"  class="on">ㆍ가구통계 조회</a></li>
								<li><a href="/view/newhelp/in_help_50_2">ㆍ주택통계 조회</a></li>
								<li><a href="/view/newhelp/in_help_50_6">ㆍ결합통계 조회</a></li>
								<li><a href="/view/newhelp/in_help_50_3">ㆍ농림어가통계 조회</a></li>
								<li><a href="/view/newhelp/in_help_50_4">ㆍ사업체통계 조회</a></li>
								<li><a href="/view/newhelp/in_help_50_5">ㆍe-지방지표</a></li>
								<li><a href="/view/newhelp/in_help_50_8" >ㆍ공공데이터 조회</a></li>
								<li><a href="/view/newhelp/in_help_50_7">ㆍ나의 데이터</a></li>								
							</ul>
						</li>							
						<li><a href="/view/newhelp/in_help_60_0">사례별 이용법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>가구통계 조회</h1>
					<h2>○ 세대구성별 가구 또는 점유유형별 가구에 대해서 검색조건 설정 및 해당 가구통계를 조회할 수 있습니다.</h2>
					
					<!-- mng_s 20200402 이진호 / 도움말 현행화 -->				
					<!-- <img src="/img/newhelp/In_050_4_1.png" style="margin-left: 119px; width:48%;" alt="가구 검색조건 설정"/>	 --><!-- 190315 방민정 수정 -->
					<img src="/img/newhelp/In_050_4_1_001.png" style="margin-left: 119px; width:48%;" alt="가구 검색조건 설정"/>	
					<!-- mng_e 20200402 이진호 -->
					
					<h2 style="/* margin-left: 250px; */text-align:center;">[가구 검색조건 설정]</h2><br>
					<h2>○ 생성된 통계버튼을 더블클릭하거나, 지도화면의 임의의 행정구역에 드래그앤드롭 하면 선택된 행정구역의 세부행정구역 단위로 가구통계정보가 생성되어 지도화면에 표출됩니다.</h2>

					<!-- mng_s 20200403 이진호 / 도움말 현행화 -->
					<!--<img src="/img/newhelp/In_050_5_new.png" style="margin-left: 0px;" alt="가구통계 검색 결과"/> -->
					<img src="/img/newhelp/In_050_5_new_001.png" style="margin-left: 0px;" alt="가구통계 검색 결과"/>
					<!-- mng_e 20200403 이진호-->
										
					<h2 style="margin-left:  250px;">[가구통계 검색 결과]</h2><br>
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
