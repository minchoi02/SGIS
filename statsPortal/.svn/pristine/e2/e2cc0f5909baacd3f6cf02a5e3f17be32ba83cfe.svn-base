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
             srvLogWrite('A0', '12', '08', '00', '', '서비스 개요');
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
				<div class="leftTitle">업종통계지도</div><!-- 190312 방민정 수정 -->
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/so_help_10_0" class="on">서비스 개요</a></li>
						
						<!-- mng_s 20200331 이진호 / 도움말 현행화,  기본 조작 방법은 대화형 통계지도의 기본 조작 방법 하나로 통합 -->
						<!-- <li><a href="/view/newhelp/so_help_20_0">기본조작 방법</a></li> -->
						<!-- mng_e 20200331 이진호 -->
						
						<li><a href="/view/newhelp/so_help_30_0">서비스 이용방법</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				<!-- mng_s 20200616 김건민 (문구 수정함) -->
				  <h1>생활업종 통계지도</h1><br><!-- 190312 방민정 수정 -->
				  	<!-- mng_s 20210412 이진호, 문구 수정 -->
					<!-- <h2>○ 생활업종 통계지도는 은 음식점(11종), 소매업(17종), 생활서비스(13종), 숙박업(4종) 등 국민생활과 밀접한 주요 생활업종에 대한 다양한 통계정보를 조회할 수 있는 서비스입니다.<h2> -->
					<h2>○ 생활업종 통계지도는  음식점(11종), 소매업(17종), 생활서비스(13종), 숙박업(4종), 여가생활(6종), 교육(11종), 의료(5종), 공공(4종) 등 국민생활과 밀접한 주요 생활업종에 대한 다양한 통계정보를 조회할 수 있는 서비스입니다.<h2>
					<!-- mng_e 20210412 이진호 -->
					<h2>○ 주요기능</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 시도별 생활업종 현황 : 시도 단위로 생활업종 현황을 조회하는 서비스로 분류별 사업체비율과 지표별 수, 비율, 전년대비 증감 현황 등을 보여줍니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp; - 시군구별 생활업종현황 : 시군구 단위로 생활업종 현황을 조회하는 서비스로 생활업종 지표에 대한 사업체 현황과 시군구 순위를 보여줍니다.</h2> 
				    <h2>&nbsp;&nbsp;&nbsp;- 업종밀집도 변화 : 생활업종 지표에 대해서 업종밀집도 정보를 지도 위에 열지도 형태로 보여줍니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 생활업종 후보지 검색 : 사업체수, 직장인구, 가구유형, 공시지가 등의 10가지 대상 지표 중 관심지표와 가중치를 설정하여 선택된 조건에 맞는 생활업종 후보지역을 검색하고 결과를 보여줍니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 생활업종 후보지 정보보기 : 지역(시군구, 읍면동) 단위로 생활업종 관련 종합 정보를 조회하는 서비스로 지역특성정보와 업종별 사업체비율, 업종별 증감 등을 보여줍니다</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 업종별 개업 현황 : 지자체 인허가 업종에 대한 업종별 개업 현황을 제공합니다.</h2>
					<br><br>
				 	<h1>화면 구성</h1>
				<!-- mng_e 20200616 김건민 --> 	
				 	<!--mng_s 20200401 이진호 / 도움말 현행화 -->
					<!-- <img src="/img/newhelp/So_010_01_1.png"  alt="설명"/> --><!-- 190315 방민정 수정 -->
					<img src="/img/newhelp/So_010_01_001.png"  alt="설명"/>
					<!--mng_e 20200401 이진호 -->
					
					<h2>1) 통계항목 설정 : 통계항목과 상세조건을 설정합니다.</h2>
					<h2>2) 부가기능 : 사업체 전개도, 초기화, 다중뷰 등을 수행합니다.</h2>
					<h2>3) 데이터보드  : 조회된 통계 데이터정보를 그래프형태로 제공합니다.</h2>			
					<h2>4) 지도조작 및 축척조정 : 지도창에서 거리, 면적계산 및 POI표출을 수행하며 지도의 축척을 조정합니다.</h2>
					<br><br>
				</div>
				<!-- 190308 방민정수정 시작 -->
				<div class="contents">
				  <h1>기술업종 통계지도</h1><br>
					<h2>○ 기술업종 통계지도는 SGIS+의 활용 사례로, 다양한 기술업종에 관련된 지역별 통계정보를 조회하여 보실 수 있으며, 기술업종 지원시설 및 산업단지에 관련된 정보를 보실 수 있는 서비스입니다.</h2>
					<h2>○ 주요기능</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 시도별 기술업종 현황 : 주요 시도의 기술업종 현황을 조회합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 시군구 기술업종 현황 : 기술업종에 대한 지역현황을 전국에서 시군구 단위로 조회합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 업종밀집도 변화 : 기술업종에 대한 업종밀집도를 열지도로 확인할 수 있습니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 업종별 입지계수 지도 : 기술업종에 대한 지역별 입지계수 정보를 조회합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 조건별 지역찾기 : 기술업종에 조건을 설정하여 조건에 맞는 지역을 조회합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 지원시설 조회 : 지역의 지원시설 현황을 조회합니다.</h2>
				    <h2>&nbsp;&nbsp;&nbsp;- 산업단지 조회 : 지역의 산업시설 현황을 조회합니다.</h2>
					<br><br>
				  	<h1>화면 구성</h1>

				  	<!-- mng_s 20200401 이진호 / 도움말 현행화 -->
					<!-- <img src="/img/newhelp/Tc_help_10_0_1.png"  style="width:700px;x" alt="설명"/> --><!-- 190315 방민정 수정 -->
					<img src="/img/newhelp/Tc_help_10_0_1_001.png"   alt="설명"/>
					<!-- mng_e 20200401 이진호 -->
					
					<!-- mng_s 20200401 이진호 / 도움말 현행화 , 중복 문구 주석처리-->
					<!--<h2>1) 통계항목 설정 : 통계항목과 상세조건을 설정합니다.</h2> -->
					<!--<h2>2) 부가기능 : 사업체 전개도, 초기화, 다중뷰 등을 수행합니다.</h2> -->
					<!--<h2>3) 데이터보드  : 조회된 통계 데이터정보를 그래프형태로 제공합니다.</h2> -->
					<!--<h2>4) 지도조작 및 축척 : 지도창에서 거리, 면적계산 및 POI표출을 수행하며 지도의 축척을 조정합니다.</h2> -->
					<!-- mng_e 20200401 이진호 -->
					
					<br><br>
				</div>
				<!-- 190308 방민정수정 끝 -->
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
