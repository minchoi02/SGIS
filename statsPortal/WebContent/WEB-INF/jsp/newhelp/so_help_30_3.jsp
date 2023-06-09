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
             srvLogWrite('A0', '12', '08', '00', '', '서비스 이용방법-(생활)조건별지역찾기');
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
				<div class="leftTitle">업종통계지도</div><!-- 190308 방민정수정 -->
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
								<li><a href="/view/newhelp/so_help_30_2">ㆍ(생활)업종밀집도 변화</a></li>
								<li><a href="/view/newhelp/so_help_30_7" >ㆍ(생활)업종별 입지계수 지도</a></li>
								<li><a href="/view/newhelp/so_help_30_3" class="on">ㆍ(생활)조건별지역찾기</a></li><!-- 190315 방민정 수정 -->
								<li><a href="/view/newhelp/so_help_30_4" >ㆍ(생활)후보지 정보보기</a></li><!-- 190315 방민정 수정 -->
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
					<h1>지역 검색조건 생성</h1>
					<h2>○ 생활업종 검색과 관련된 지역을 검색하기 위한 다양한 검색조건을 설정할 수 있고, 검색조건 설정 후 통계버튼을 생성하면 해당 통계버튼을 이용해서 지역 찾기가 가능합니다.</h2>
					<h2>○ 검색조건은 인구, 가구, 주택, 아파트시세정도, 사업체현황 등에 대해 검색조건 설정이 가능하며, 설정된 검색조건을 모두 반영하여 지역 검색결과를 생성합니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 설정된 전체 검색조건에서 상위 30%에 해당하는 지역을 찾아줍니다.</h2>
					<h2>○ 인구 분야는 거주인구인 경우에 성별, 연령 등의 추가 조건 설정이 가능합니다.</h2>
					
					<!-- mng_s 20200331 이진호 / 도움말 현행화 -->
					<!-- <img src="/img/newhelp/So_030_01_new.png" border=0 alt="창업지역 검색조건 설정 1"/>	 -->
					<img src="/img/newhelp/So_030_01_new_001.png" border=0 alt="창업지역 검색조건 설정 1"/>	
					<!-- mng_e 20200331 이진호-->
					
					<h2 style="/* margin-left: 250px; */text-align:center;">[생활업종 후보지 검색조건 설정 1]</h2><br>
					<h2>○ 주택 종류, 아파트시세 정도 등에 대한 검색조건 설정이 가능하며, 생활업종별 사업체 수, 증감에 대한 검색조건 설정이 가능합니다.</h2>

					<!-- mng_s 20200331 이진호 / 도움말 현행화 -->
					<!-- <img src="/img/newhelp/So_030_02_new.png" border=0 alt="창업지역 검색조건 설정 2"/>	 -->
					<img src="/img/newhelp/So_030_02_new_001.png" border=0 alt="창업지역 검색조건 설정 2"/>	
					<!-- mng_e 20200331 이진호-->
					
					<h2 style="/* margin-left: 250px; */text-align:center;">[생활업종 후보지 검색조건 설정 2]</h2><br>
					<h1>지역 검색결과 조회</h1>
					<h2>○ 지역 검색을 위한 통계버튼 생성 후 지도의 임의의 행정구역에 드래그앤드롭 하면 해당 조건에 맞는 지역들이 검색되고 해당지역들은 색상이 구분되어 지도화면에 표출됩니다.</h2>
					<h2>○ 우리동네 생활업종은 검색대상 지역 선택 시 시/도 또는 시/군/구 단위에서 조회할 수 있고, 나머지 지역 단위에서는 조회할 수 없습니다.</h2>
					<img src="/img/newhelp/So_030_03_new.png" style="margin-left: 0px;" border=0 alt="후보지역 검색결과"/>	
					<h2 style="/* margin-left: 250px; */text-align:center;">[후보지역 검색결과]</h2><br>
					<h2>○ 현재 선택되어 조회 중인 지역 이외의 다른 후보지역을 보실 수도 있습니다. </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 우측 데이터보드 위쪽의 후보지리스트 에서 지역을 선택하시면 해당 지역의 상세 통계정보가 표출됩니다.</h2>
					<img src="/img/newhelp/So_030_04_new.png" style="margin-left: 0px;" border=0 alt="후보지역  지역 종합정보 표출"/>	
					<h2 style="/* margin-left: 250px; */text-align:center;">[후보지역  지역 종합정보 표출]</h2><br>
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
