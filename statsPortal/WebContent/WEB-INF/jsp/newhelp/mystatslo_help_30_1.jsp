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
             //srvLogWrite('A0', '12', '05', '00', '', '기본조작 방법-지도 표출 및 경계 표출');
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
						<li><a href="/view/newhelp/mystatslo_help_10_0">서비스 개요</a></li>
						<!-- <li><a href="/view/newhelp/mystatslo_help_20_0">기본조작 방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/mystatslo_help_20_0">ㆍ지도 표출 및 경계 표출</a></li>
								<li><a href="/view/newhelp/mystatslo_help_20_1">ㆍ지도창 조작 방법</a></li>
							</ul>
						</li> -->
						<li><a href="/view/newhelp/mystatslo_help_30_0" class="on">서비스 이용방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/mystatslo_help_30_0">ㆍ나의</a></li>
								<li><a href="/view/newhelp/mystatslo_help_30_1" class="on">ㆍ관심분야를</a></li>
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
					<h1>관심분야를</h1>
					<!-- 2020-02-19 [김남민] 통계로-39 : 서비스 설명자료 수정. -->
					<h2>○ 관심지역과 관심분야를 선택하는 기능을 제공합니다.</h2>
					<img src="/img/newhelp/mystatslo_help_30_1_01.png" border=0 alt="관심분야를 화면"/>
					<h2 style="text-align:center;">[관심분야를 화면]</h2><br>
					<!-- 2020-02-19 [김남민] 통계로-39 : 서비스 설명자료 수정. START -->
					<h2>1) 관심분야 : 8가지 관심분야 중 최대 2개까지 선택가능 합니다.</h2>
					<h2>2) 관심분야 선택항목 : 선택한 관심분야 항목이 표시됩니다.<br>　　　　　　　　　&nbsp;2개 이상 선택 시 최초 선택한 항목이 삭제되고, 최종선택한 항목이 추가됩니다.</h2>
					<!-- 2020-02-19 [김남민] 통계로-39 : 서비스 설명자료 수정. END -->
					<h2>3) 현재 관심지역 : 위치동의 및 관심지역 변경에 따라 현재 관심지역이 표시됩니다. 관심지역 변경하기를 클릭하여 지역을 변경합니다.</h2>
					<h2>4) ‘&lt;’ 이미지 : ‘나의’ 화면으로 이동합니다.</h2>
					<h2>5) ‘&gt;’ 이미지 : ‘카탈로그에서 선택하여’ 화면으로 이동합니다.</h2>
					<h2>6) SGIS : SGIS 클릭 시 ‘SGIS 통계지리정보시스템’으로 이동합니다.</h2>					
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
