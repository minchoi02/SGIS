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
             srvLogWrite('A0', '12', '08', '00', '', '서비스 이용방법-(생활)업종밀집도 변화');
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
				<div class="leftTitle">업종통계지도</div><!-- 190308 방민정 수정 -->
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/so_help_10_0">서비스 개요</a></li>
						
						<!-- mng_s 20200331 이진호 / 도움말 현행화,  기본 조작 방법은 대화형 통계지도의 기본 조작 방법 하나로 통합 -->
						<!-- <li><a href="/view/newhelp/so_help_20_0">기본조작 방법</a></li> -->
						<!-- mng_e 20200331 이진호 -->
						
						<li><a href="/view/newhelp/so_help_30_0">서비스 이용방법</a>
							<ul class="sub">
							<!--  190308 방민정수정 시작 -->
								<li><a href="/view/newhelp/so_help_30_0">ㆍ(생활)시도별 생활업종 현황</a></li>
								<li><a href="/view/newhelp/so_help_30_1">ㆍ(생활)시군구별 생활업종현황</a></li>
								<li><a href="/view/newhelp/so_help_30_2" class="on">ㆍ(생활)업종밀집도 변화</a></li>
								<li><a href="/view/newhelp/so_help_30_7" >ㆍ(생활)업종별 입지계수 지도</a></li>
								<li><a href="/view/newhelp/so_help_30_3">ㆍ(생활)조건별지역찾기</a></li><!-- 190315 방민정 수정-->
								<li><a href="/view/newhelp/so_help_30_4">ㆍ(생활)후보지 정보보기</a></li><!-- 190315 방민정 수정 -->
								<li><a href="/view/newhelp/so_help_30_6">ㆍ(생활)업종별 개업 현황</a></li>
								<li><a href="/view/newhelp/so_help_30_5">ㆍ(생활)업종별 뜨는 지역</a></li>
								<li><a href="/view/newhelp/tc_help_30_0">ㆍ(기술)시도별 기술업종 현황</a></li>
								<li><a href="/view/newhelp/tc_help_30_1">ㆍ(기술)시군구별 기술업종 현황</a></li>
								<li><a href="/view/newhelp/tc_help_30_2">ㆍ(기술)업종밀집도 변화</a></li>
								<li><a href="/view/newhelp/tc_help_30_5">ㆍ(기술)업종별 입지계수 지도</a></li>
								<li><a href="/view/newhelp/tc_help_30_6">ㆍ(기술)조건별 지역찾기</a></li>
								<li><a href="/view/newhelp/tc_help_30_3">ㆍ(기술)지원시설 조회</a></li>
								<li><a href="/view/newhelp/tc_help_30_4">ㆍ(기술)산업단지 조회</a></li>
							<!-- 190308 방민정 끝  -->
							</ul>
						</li>							
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<!-- mng_s 20200616 김건민 (문구 수정함) -->
					<h1>업종밀집도 변화</h1>
					<h2>○ 생활업종에 대한 업종밀집도를 열지도와 점지도로 보실 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 생활업종을 선택하신 후, 지도 위에 선택항목을 끌어놓으면(Drag&Drop) 열지도가 표출 됩니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 지도상에서 축척을 읍면동 이하로 내리시면 열지도에서 점지도로 보실 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 생활업종을 선택하신 후, 지도 위에 선택항목을 끌어놓으면(Drag&Drop) 열지도가 표출 됩니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 시도 검색 시에는 선택된 사업체에 대한 개별 위치정보를 모두 조회하므로, 다소 시간이 소요될 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(※ 검색 시 시군구 단위 조회를 추천 드립니다.)</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;※ 생활업종: 음식점(11종), 소매업(17종), 생활서비스(13종), 숙박업(4종), 여가생활(6종), 교육(11종), 의료(5종), 공공(4종)</h2>
					<!-- mng_e 20200616 김건민 -->
					<!-- mng_s 20200331 / 도움말 현행화 -->
					<!--<img src="/img/newhelp/So_030_18.png" style="margin-left: 40px; width:650px;" alt="업종 밀집도 – 업종 검색 방법"/> -->
					<img src="/img/newhelp/So_030_18_001.png" style="" alt="업종 밀집도 – 업종 검색 방법"/>
					<!-- mng_e 20200331 이진호 -->	
					
					<h2 style="text-align:center;">[업종 밀집도 – 업종 검색 방법]</h2><br>
					
					<!-- mng_s 20200401 이진호 / 도움말 현행화 -->
					<!-- <img src="/img/newhelp/So_030_19.png" style="margin-left: 40px; width:650px;" alt="업종별 밀집도 – 업종별 열지도 및 점지도 표출"/>	 -->
					<img src="/img/newhelp/So_030_19_001.png" style="" alt="업종별 밀집도 – 업종별 열지도 및 점지도 표출"/>	
					<!-- mng_e 20200401 이진호 -->
					
					<h2 style="text-align:center;">[업종별 밀집도 – 업종별 열지도 및 점지도 표출]</h2><br>
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
