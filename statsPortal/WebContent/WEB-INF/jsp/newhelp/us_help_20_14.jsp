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
             srvLogWrite('A0', '12', '02', '00', '', '서비스 소개-정책 통계지도');
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
				<div class="leftTitle">홈페이지 이용안내</div>
				<div class="leftmenu">
					<ul>
						<!-- mng_s 20170913_김건민 -->
						<li><a href="/view/newhelp/us_help_10_0">SGIS플러스란?</a></li>
						<li><a href="/view/newhelp/us_help_20_0">서비스 소개</a>
							<ul class="sub">
								<li><a href="/view/newhelp/us_help_20_0">ㆍ통계주제도</a></li>
								<li><a href="/view/newhelp/us_help_20_1">ㆍ대화형 통계지도</a></li>
								<li><a href="/view/newhelp/us_help_20_14"  class="on">ㆍ정책 통계지도</a></li>
								<!-- 190308 방민정수정 시작-->
								<li><a href="/view/newhelp/us_help_20_17">ㆍ일자리 맵</a></li>
								<!--  <li><a href="/view/newhelp/us_help_20_12">ㆍ기술업종 통계지도</a></li>
									190308 방민정 수정 끝-->
								<li><a href="/view/newhelp/us_help_20_11">ㆍ살고싶은 우리동네</a></li>
								<li><a href="/view/newhelp/us_help_20_2">ㆍ업종통계지도</a></li><!-- 190308 방민정수정  -->
								<li><a href="/view/newhelp/community_help_0">ㆍ지역현안 소통지도</a></li>
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
								<li><a href="/view/newhelp/us_help_20_19">ㆍ생활권역 통계지도</a></li><!-- 2020년 SGIS고도화 3차 추가-->
								<li><a href="/view/newhelp/us_help_20_20">ㆍ총조사 시각화 지도</a></li><!-- 20210315 총조사 시각화 지도 추가 -->
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
				  <h1>정책 통계지도</h1><br>
					<h2>○ 정책 통계지도는 지역별 수요변화와 지역별 정책지도를 조회하여 보실 수 있는 서비스입니다.</h2>
					<h2>○ 주요기능</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 지역별 수요변화 : 지역별 인구, 가구 및 주택, 사업체 변화 현황을 조회합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 지역별 정책지도 : 지역별 정책지도를 조회합니다.</h2>
					<a href="/view/map/policyStaticMap"><img src="/img/newhelp/Ps_blue.png" style="margin-left: 0px; width:238px; height:25px" border=0 alt="정책 통계지도 바로가기"/></a>
					<img src="/img/newhelp/Ps_010_02.png"  style="height:auto;" alt="설명"/><!-- 190313 방민정 수정 -->
					
					<!-- mng_s 20210409 이진호, 이미지의 숫자에 맞게 설명 수정 -->
					<h2>1) 통계항목 설정 : 통계항목과 상세조건을 설정합니다.</h2>
					<!-- <h2>2) 범례창 : 표시된 통계값의 범례를 표시하며 범례설정 변경도 가능합니다.</h2> -->
					<h2>2) 년도 설정 : 조회하고자 하는 년도를 설정합니다. </h2>
					<!-- <h2>3) 데이터보드  : 조회된 통계 데이터정보를 그래프형태로 제공합니다.</h2>-->
					<h2>3) 융합결과보기 : 새창에서 두 지도의 융합된 데이터정보를 조회합니다.</h2>
					<!-- <h2>4) 년도 설정 : 조회하고자 하는 년도를 설정합니다. </h2> -->
					<h2>4) 데이터보드  : 조회된 통계 데이터정보를 그래프형태로 제공합니다.</h2>
					<!-- <h2>5) 융합 : 새창에서 두 지도의 융합된 데이터정보를 조회합니다.</h2> -->
					<h2>5) 범례창 : 표시된 통계값의 범례를 표시하며 범례설정 변경도 가능합니다.</h2>
					<!-- mng_e 20210409 이진호 -->
					
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
