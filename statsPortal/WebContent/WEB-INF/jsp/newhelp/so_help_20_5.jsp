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
             srvLogWrite('A0', '12', '08', '00', '', '기본조작 방법-통계버튼 목록 관리');
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
				<div class="leftTitle">업종통계지도</div><!-- 190308 방민정 -->
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/so_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/so_help_20_0">기본조작 방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/so_help_20_0">ㆍ지도 표출 및 경계 표출</a></li>
								<li><a href="/view/newhelp/so_help_20_1">ㆍ지도창 조작 방법</a></li>
								<li><a href="/view/newhelp/so_help_20_3">ㆍ지도상에서의 측정방법</a></li>
								<li><a href="/view/newhelp/so_help_20_5"  class="on">ㆍ통계버튼 목록 관리</a></li>
								<!-- <li><a href="/view/newhelp/so_help_20_7">ㆍ다중뷰 통계 조회</a></li> -->
						        <li><a href="/view/newhelp/so_help_20_9">ㆍ데이터 업로드 이용방법</a></li>
							</ul>
						</li>							
						<li><a href="/view/newhelp/so_help_30_0">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>통계버튼 목록 관리</h1>
					<h2>○ 조회타입에 따라 통계버튼을 지도상의 지역에 끌어서 놓기(drag&amp;drop) 하는 방식 또는 더블클릭 하는 방식으로 조회가 가능합니다.</h2>
					<h2>○ [삭제]버튼을 누르면 선택한 통계버튼은 삭제됩니다.</h2>
					<img src="/img/newhelp/In_020_18_new.png" style="margin-left: 100px; width:292px;" border=0 alt="통계버튼"/>	
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
