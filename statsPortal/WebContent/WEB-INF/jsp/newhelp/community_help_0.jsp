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
             srvLogWrite('A0', '12', '02', '00', '', '서비스 소개-지역현안 소통지도');
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
				<div class="leftTitle">지역현안 소통지도 </div>
				<div class="leftmenu">
					<ul>
						<!-- mng_s 20170913_김건민 -->
						<li><a href="/view/newhelp/us_help_10_0">SGIS플러스란?</a></li>
						<li><a href="/view/newhelp/us_help_20_0">서비스 소개</a>
							<ul class="sub">
								<li><a href="/view/newhelp/us_help_20_0">ㆍ통계주제도</a></li>
								<li><a href="/view/newhelp/us_help_20_1">ㆍ대화형 통계지도</a></li>
								<li><a href="/view/newhelp/us_help_20_14">ㆍ정책 통계지도</a></li>
								<!-- 190308 방민정수정 시작-->
								<li><a href="/view/newhelp/us_help_20_17">ㆍ일자리 맵</a></li>
								<!--  <li><a href="/view/newhelp/us_help_20_12">ㆍ기술업종 통계지도</a></li>
									190308 방민정 수정 끝-->
								<li><a href="/view/newhelp/us_help_20_11">ㆍ살고싶은 우리동네</a></li>
								<li><a href="/view/newhelp/us_help_20_2">ㆍ업종통계지도</a></li><!-- 190308 방민정 수정 -->
								<li><a href="/view/newhelp/community_help_0" class="on">ㆍ지역현안 소통지도</a></li>
								<!-- <li><a href="/view/newhelp/us_help_20_3">ㆍ우수활용사례</a></li> -->
								<li><a href="/view/newhelp/us_help_20_4">ㆍ통계지도 체험</a></li>
								<li><a href="/view/newhelp/us_help_20_13">ㆍ통계갤러리</a></li>
								<li><a href="/view/newhelp/us_help_20_6">ㆍ월간통계</a></li>
						        <li><a href="/view/newhelp/us_help_20_8">ㆍ인구피라미드</a></li><!-- mng_s 20210412 이진호, '움직이는 인구피라미드' 에서 '인구피라미드' 로 수정 -->
								<li><a href="/view/newhelp/us_help_20_7">ㆍ고령화 현황보기</a></li>
						        <li><a href="/view/newhelp/us_help_20_9">ㆍ성씨분포</a></li>
								<li><a href="/view/newhelp/us_help_20_5">ㆍ지방의 변화보기</a></li>
						        
						        <!-- mng_s 20200727 이진호, 자료신청 메뉴가 자료제공으로 변경 -->
								<!--<li><a href="/view/newhelp/us_help_20_10">ㆍ자료신청</a></li> -->
						        <li><a href="/view/newhelp/us_help_20_10">ㆍ자료제공</a></li>
						        <!-- mng_e 20200727 이진호-->
						        
						 		<!-- mng_e 20170913_김건민 -->
						        <!-- 2020-02-19 [김남민] 통계로-39 : 서비스 설명자료 수정. -->
								<li><a href="/view/newhelp/us_help_20_18">ㆍMy통계로(路)</a></li>
								
								<!-- mng_s 20210407 이진호, 생활권역,총조사 시각화 지도 추가 -->
								<li><a href="/view/newhelp/us_help_20_19">ㆍ생활권역 통계지도</a></li><!-- 2020년 SGIS고도화 3차 수정  -->
								<li><a href="/view/newhelp/us_help_20_20">ㆍ총조사 시각화 지도</a></li><!-- 20210315 총조사 시각화 지도 추가 -->
								<!-- mng_e 20210407 이진호 -->
								
							</ul>
						</li>
						<li><a href="/view/newhelp/us_help_30_0">이용시 참조사항</a></li>
						<!-- <li><a href="/view/newhelp/us_help_40_0">용어설명</a></li> -->
						<li><a href="/view/newhelp/us_help_50_0">사이트맵</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>지역현안 소통지도</h1><br>
				  	<!-- mng_s 20170913_김건민 -->
					<h2>○ SGIS플러스의 활용 사례로, 지역사회 구성원이 직접 참여하여 지역사회의 이슈를 찾아내고 해결하는데,객관적인 지표인 관련 통계를 제공하고 이를 기반으로 한 소통지도 매핑 기능을 제공하는 서비스입니다.</h2>
					<h2>○ 소통지도 개설자는 대화형 통계지도 또는 나의 데이터를 이용해서 관련통계 찾아 자유롭게 소통지도를 개설할 수 있습니다</h2>
					<!-- mng_e 20170913_김건민 -->
					<br>
					<a href="/view/community/intro"><img src="/img/newhelp/go_community.png" style="width:238px; height:25px" alt="통계 소통지도 바로가기"/></a>

					<img src="/img/newhelp/img_community_0_01.png" alt="지역현안 소통지도"/><!-- 190313 방민정 수정 -->
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
