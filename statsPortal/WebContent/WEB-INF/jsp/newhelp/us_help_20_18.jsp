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
             srvLogWrite('A0', '12', '02', '00', '', '서비스 소개-일자리 맵');
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
								<li><a href="/view/newhelp/us_help_20_14">ㆍ정책통계지도</a></li>
								<li><a href="/view/newhelp/us_help_20_17">ㆍ일자리 맵</a></li>
								<li><a href="/view/newhelp/us_help_20_11">ㆍ살고싶은 우리동네</a></li>
								<li><a href="/view/newhelp/us_help_20_2">ㆍ업종통계지도</a></li>
								<li><a href="/view/newhelp/community_help_0">ㆍ지역현안 소통지도</a></li>
								<li><a href="/view/newhelp/us_help_20_4">ㆍ통계지도 체험</a></li>
								<li><a href="/view/newhelp/us_help_20_13">ㆍ통계갤러리</a></li>
								<li><a href="/view/newhelp/us_help_20_6">ㆍ월간통계</a></li>
						        <li><a href="/view/newhelp/us_help_20_8">ㆍ움직이는 인구피라미드</a></li>
								<li><a href="/view/newhelp/us_help_20_7">ㆍ고령화 현황보기</a></li>
						        <li><a href="/view/newhelp/us_help_20_9">ㆍ성씨분포</a></li>
								<li><a href="/view/newhelp/us_help_20_5">ㆍ지방의 변화보기</a></li>
						        
						        <!-- mng_s 20200727 이진호, 자료신청 메뉴가 자료제공으로 변경 -->
								<!--<li><a href="/view/newhelp/us_help_20_10">ㆍ자료신청</a></li> -->
						        <li><a href="/view/newhelp/us_help_20_10">ㆍ자료제공</a></li>
						        <!-- mng_e 20200727 이진호-->
						        
						        <!-- 2020-02-19 [김남민] 통계로-39 : 서비스 설명자료 수정. -->
								<li><a href="/view/newhelp/us_help_20_18" class="on">ㆍMy통계로(路)</a></li>
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
					<h1>My통계로(路)</h1>
					<h2>● 개인 관심주제에 맞는 공간통계정보를 제공합니다.</h2>
					<h2>● SGIS 통계지리정보서비스의 모든 기능을 하나의 화면에서 만나실수 있습니다.</h2>
					<h2>● 국민의 생활속 언어를 통해 업무중심환경에서 개인중심으로 맞춤형 서비스를 제공합니다.</h2>
					<h2>● 간결한 인터페이스를 통한 효과적 정보 전달 중심의 서비스 입니다.</h2>
					<h2>● 정보검색 편의를 위해 키워드 검색형 서비스를 제공 합니다.</h2>
					<h2>● 카탈로그 서비스를 통해 직관적으로 통계를 확인하실 수 있습니다.</h2>
					<br><br>
					
					<h2>● 주요기능</h2>
					<h2>　　 - <span style="font-weight:bold">나의</span>
					<br>　　 　　  : 관심지역, 생애주기 선택에 따른 통계정보를 추천해주는 기능을 제공</h2>
					<h2>　　 - <span style="font-weight:bold">관심분야를</span>
					<br>　　 　　  : 관심지역, 관심분야 선택에 따른 통계정보를 추천해주는 기능을 제공</h2>
					<h2>　　 - <span style="font-weight:bold">카탈로그에서 선택하여</span>
					<br>　　 　　  : 생애주기, 거리선택, 키워드에 따른 통계지리 정보 목록을 제공하고, 조회된 통계지리 정보 목록의 관련 SGIS 콘텐츠 
					<br>　　　　　&nbsp;바로가기 링크를 제공</h2>
					<h2>　　 - <span style="font-weight:bold">지도로 확인해요</span>
					<br>　　 　　  : 통계지리 정보 목록에서 선택한 정보를 지도에 표출해 주는 기능을 제공</h2>
					<h2>　　 - <span style="font-weight:bold">상세정보를 확인해요</span>
					<br>　　 　　  : 통계지리 정보 목록에서 선택한 정보의 상세정보를 제공</h2>
					<br><br>
					
					<h2>● 화면 구성</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;처음페이지 > 상단 탭 My통계로(路) 선택</h2>
					<br>
					<a href="/view/statsMe/statsMeMain" style="cursor:pointer;font-size:12px;height:25px;width:238px;line-height:25px;background:#1778cc;border-radius:3px;color:#fff;padding:5px 10px;">My통계로(路) 바로가기 </a>

					<!-- mng_s 20200407 이진호 / 도움말 현행화  -->
					<!--<img src="/img/nm/nm_picture_renewal_09.png" style="margin-left: 0px;" alt="My통계로(路) 화면구성"> -->
					<img src="/img/nm/nm_picture_renewal_09_001.png" style="margin-left: 0px;" alt="My통계로(路) 화면구성">
					<!-- mng_e 20200407 이진호 -->
					
					<br/><br/>
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
