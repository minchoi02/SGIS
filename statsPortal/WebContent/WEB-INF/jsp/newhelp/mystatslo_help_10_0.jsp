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
             //srvLogWrite('A0', '12', '04', '00', '', '서비스 개요');
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
				<!-- 2020-02-19 [김남민] 통계로-39 : 서비스 설명자료 수정. -->
				<div class="leftTitle">My통계로(路)</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/mystatslo_help_10_0" class="on">서비스 개요</a></li>
						<!-- <li><a href="/view/newhelp/mystatslo_help_20_0">기본조작 방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/mystatslo_help_20_0">ㆍ지도 표출 및 경계 표출</a></li>
								<li><a href="/view/newhelp/mystatslo_help_20_1">ㆍ지도창 조작 방법</a></li>
							</ul>
						</li> -->
						<li><a href="/view/newhelp/mystatslo_help_30_0">서비스 이용방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/mystatslo_help_30_0">ㆍ나의</a></li>
								<li><a href="/view/newhelp/mystatslo_help_30_1">ㆍ관심분야를</a></li>
								<li><a href="/view/newhelp/mystatslo_help_30_2">ㆍ카탈로그에서 선택하여</a></li>
								<li><a href="/view/newhelp/mystatslo_help_30_3">ㆍ지도로 확인해요</a></li>
								<li><a href="/view/newhelp/mystatslo_help_30_4">ㆍ상세정보를 확인해요</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>서비스 개요</h1><br>
				  	<!-- 2020-02-19 [김남민] 통계로-39 : 서비스 설명자료 수정. -->
					<h2>○ 개인 관심주제에 맞는 공간통계정보를 제공합니다.</h2>
					<h2>○ SGIS 통계지리정보서비스의 모든 기능을 하나의 화면에서 만나실수 있습니다.</h2>
					<h2>○ 국민의 생활속 언어를 통해 업무중심환경에서 개인중심으로 맞춤형 서비스를 제공합니다.</h2>
					<h2>○ 간결한 인터페이스를 통한 효과적 정보 전달 중심의 서비스 입니다.</h2>
					<h2>○ 정보검색 편의를 위해 키워드 검색형 서비스를 제공 합니다.</h2>
					<h2>○ 카탈로그 서비스를 통해 직관적으로 통계를 확인하실 수 있습니다.</h2>
					<h2>○ 주요기능</h2>
					<!-- 2020-02-19 [김남민] 통계로-39 : 서비스 설명자료 수정. START -->
				    <h2 style="word-break: keep-all;">&nbsp;&nbsp;&nbsp;- <span style="font-weight:bold">나의</span> : 관심지역, 생애주기 선택에 따른 통계정보를 추천해주는 기능을 제공</h2>
				    <h2 style="word-break: keep-all;">&nbsp;&nbsp;&nbsp;- <span style="font-weight:bold">관심분야를</span> : 관심지역, 관심분야 선택에 따른 통계정보를 추천해주는 기능을 제공</h2>
				    <h2 style="word-break: keep-all;">&nbsp;&nbsp;&nbsp;- <span style="font-weight:bold">카탈로그에서 선택하여</span> : 생애주기, 거리선택, 키워드에 따른 통계지리 정보 목록을 제공하고, 조회된 통계지리 정보 목록의 관련 SGIS 콘텐츠 바로가기 링크를 제공</h2>
				    <h2 style="word-break: keep-all;">&nbsp;&nbsp;&nbsp;- <span style="font-weight:bold">지도로 확인해요</span> : 통계지리 정보 목록에서 선택한 정보를 지도에 표출해 주는 기능을 제공</h2>
				    <h2 style="word-break: keep-all;">&nbsp;&nbsp;&nbsp;- <span style="font-weight:bold">상세정보를 확인해요</span> : 통계지리 정보 목록에서 선택한 정보의 상세정보를 제공</h2>
				    <!-- 2020-02-19 [김남민] 통계로-39 : 서비스 설명자료 수정. END -->
					<br><br>
				  <h1>화면 구성</h1>
					<img src="/img/newhelp/mystatslo_help_10_0_01.png" style="border-width:1px; border-color:whitegray; border-style:silid; width:700px; height:400px" alt="설명"/>				
					<!-- 2020-02-19 [김남민] 통계로-39 : 서비스 설명자료 수정. -->
					<h2 style="font-weight:bold">1) 네비게이션 : 화면 이동 및 선택한 항목(생애주기, 관심분야, 카탈로그)을 관리 합니다.</h2>
				    <h2 style="font-weight:bold">2) 컨텐츠 : 나의, 관심분야를, 카탈로그에서, 지도로 확인해요, 상세정보를 확인해요 등 각 컨텐츠가 표시 됩니다.</h2>
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
