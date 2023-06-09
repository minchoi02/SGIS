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
             srvLogWrite('A0', '12', '11', '00', '', '서비스 이용방법-갤러리');
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
				<div class="leftTitle">통계갤러리</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/rg_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/rg_help_20_0">서비스 이용방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/rg_help_20_0" class="on">ㆍ갤러리</a></li>
								<li><a href="/view/newhelp/rg_help_20_1">ㆍ활용 사례</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>통계갤러리 등록</h1>
				  	<h2>1) 갤러리 등록 버튼을 클릭합니다.</h2>
					<h2>2) 갤러리 등록을 선택하면 등록 화면으로 전환됩니다.  </h2>
					<h2>3) 추가 버튼을 클릭하여 즐겨찾기 목록을 불러옵니다.</h2>
					<h2>4) 갤러리에 등록할 이미지를 선택합니다.</h2>
					<h2>5) 제목, 내용을 입력한 후 갤러리 등록 버튼을 클릭하면 등록이 완료됩니다.</h2>
					
				    <img src="/img/newhelp/Rg_020_05.png" alt="통계갤러리 등록화면"/>
					<img src="/img/newhelp/Rg_020_02.png" alt="통계갤러리 등록화면"/>
					<img src="/img/newhelp/Rg_020_03.png" alt="통계갤러리 등록화면"/>
					<br><br>
				  <h1>기존 서비스를 조회하여 갤러리 등록</h1>
					<h2>1) 통계정보를 조회한 후 즐겨찾기 버튼을 클릭합니다.</h2>
					<h2>2) 갤러리 등록 버튼을 클릭합니다. </h2>
					<h2>3) 갤러리 등록 버튼을 클릭하면 등록이 완료됩니다.</h2>
					
					<img src="/img/newhelp/Rg_020_01.png" alt="통계갤러리 등록화면"/>
					<img src="/img/newhelp/Rg_020_04.png" alt="통계갤러리 등록화면"/>
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
