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
             srvLogWrite('A0', '12', '06', '00', '', '서비스 이용현황-일자리 통계분석');
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
				<div class="leftTitle">일자리 맵</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/workroad_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/workroad_help_20_0">서비스 이용방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/workroad_help_20_0">ㆍ오늘의 구인현황</a></li>
								<li><a href="/view/newhelp/workroad_help_20_1">ㆍ일자리 통계분석</a></li>
								<li><a href="/view/newhelp/workroad_help_20_2">ㆍ구인 현황분석</a></li>
								<li><a href="/view/newhelp/workroad_help_20_3" class="on">ㆍ일자리 통계분석	</a></li>
							</ul>
						</li>													
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>일자리 통계분석</h1>
					<h2>○ 일자리 현황 기본 조회 화면</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 일자리 현황 주요지표와 차트 정보표출</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 지표 선택 가능하며, 단일 선택</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 지표 선택 후 검색버튼 클릭 시 해당 지표의 상세조회 정보 표출</h2>
					
					<!--mng_s 20200406 이진호 / 도움말 현행화 -->
					<!-- <img src="/img/newhelp/workroad_20_3_0.png"  style="width:700px;" alt="일자리 통계분석 일자리 현황 기본 조회 화면"/> -->
					<img src="/img/newhelp/workroad_20_3_0_001.png"  style="width:700px;" alt="일자리 통계분석 일자리 현황 기본 조회 화면"/>
					<h2 style="text-align:center;">[일자리 통계분석 일자리 현황 기본 조회 화면]</h2><br>
					<!-- mng_e 20200406 이진호 -->
										
					<br>
					<h2>1) 지표 선택 : 선택한 지표에 해당하는 정보를 차트에 출력합니다.</h2>
					<h2>2) 차트정보 : 선택한 지표에 따라 검색이 가능합니다.</h2>
					<h2>3) 검색 : 선택한 지표의 상세정보를 검색합니다.</h2>
   					<br><br>
					<h2>○ 일자리 현황 상세 조회 화면</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 선택한 지표의 상세정보를 상세페이지와 데이터보드, 지도를 통해 조회하는 기능</h2>
					<img src="/img/newhelp/workroad_20_3_1.png"  style="width:700px;" alt="일자리 통계분석 일자리 현황 상세 조회 화면"/>
					<h2 style="text-align:center;">[일자리 통계분석 일자리 현황 상세 조회 화면]</h2><br>
					<br>
					<h2>1) 상세조회 : 선택한 지표의 상세 및 차트정보를 표출합니다.</h2>
					<h2>2) 차트선택 : 선택한 X축에 해당하는 일자의 상세정보를 데이터보드 및 지도에 표출합니다.</h2>
					<h2>3) 데이터보드 : 상세정보를 차트 및 표로 표출합니다.</h2>
					<h2>4) 지도 : 상세정보를 지도 화면에 표출합니다.</h2>					
					<br><br>
					
					<h2>○ 일자리 증감 기본 조회 화면</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 일자리 증감 주요지표와 차트 정보표출</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 지표 선택 가능하며, 단일 선택</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 지표 선택 후 검색버튼 클릭 시 해당 지표의 상세조회 정보 표출</h2>
					<!--<img src="/img/newhelp/workroad_20_3_2.png"  style="width:700px;" alt="일자리 통계분석 일자리 증감 기본 조회 화면"/> -->
					<img src="/img/newhelp/workroad_20_3_2_001.png"  style="width:700px;" alt="일자리 통계분석 일자리 증감 기본 조회 화면"/>
					<h2 style="text-align:center;">[일자리 통계분석 일자리 증감 기본 조회 화면]</h2><br>
					<br>
					<!-- <h2>1) 지표 선택 : 선택한 지표에 해당하는 정보를 차트에 출력합니다.</h2> -->
					<!-- <h2>2) 차트정보 : 선택한 지표에 따라 검색이 가능합니다.</h2> -->
					<!-- <h2>3) 검색 : 선택한 지표의 상세정보를 검색합니다.</h2> -->
					<br><br>
					<h2>○ 일자리 증감 상세 조회 화면</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 선택한 지표의 상세정보를 상세페이지와 데이터보드, 지도를 통해 조회하는 기능</h2>
					<!--<img src="/img/newhelp/workroad_20_3_3.png"  style="width:700px;" alt="일자리 통계분석 일자리 증감 상세 조회 화면"/> -->
					<img src="/img/newhelp/workroad_20_3_3_001.png"  style="width:700px;" alt="일자리 통계분석 일자리 증감 상세 조회 화면"/>
					<h2 style="text-align:center;">[일자리 통계분석 일자리 증감 상세 조회 화면]</h2><br>
					<br>
					<!-- <h2>1) 상세조회 : 선택한 지표의 상세 및 차트정보를 표출합니다.</h2> -->
					<!-- <h2>2) 차트선택 : 선택한 X축에 해당하는 일자의 상세정보를 데이터보드 및 지도에 표출합니다.</h2> -->
					<!-- <h2>3) 데이터보드 : 상세정보를 차트 및 표로 표출합니다.</h2> -->
					<!-- <h2>4) 지도 : 상세정보를 지도 화면에 표출합니다.</h2> -->
					<br><br>
					<h2>○ 일자리 질 기본 조회 화면</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 일자리 질 주요지표와 차트 정보표출</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 지표 선택 가능하며, 단일 선택</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 지표 선택 후 검색버튼 클릭 시 해당 지표의 상세조회 정보 표출</h2>
					<!-- <img src="/img/newhelp/workroad_20_3_4.png"  style="width:700px;" alt="일자리 통계분석 일자리 질 기본 조회 화면"/> -->
					<img src="/img/newhelp/workroad_20_3_4_001.png"  style="width:700px;" alt="일자리 통계분석 일자리 질 기본 조회 화면"/>
					<h2 style="text-align:center;">[일자리 통계분석 일자리 질 기본 조회 화면]</h2><br>
					<br>
					<!-- <h2>1) 지표 선택 : 선택한 지표에 해당하는 정보를 차트에 출력합니다.</h2> -->
					<!-- <h2>2) 차트정보 : 선택한 지표에 따라 검색이 가능합니다.</h2> -->
					<!-- <h2>3) 검색 : 선택한 지표의 상세정보를 검색합니다.</h2> -->
					<br><br>
					<h2>○ 일자리 질 상세 조회 화면</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 선택한 지표의 상세정보를 상세페이지와 데이터보드, 지도를 통해 조회하는 기능</h2>
<!-- 					<img src="/img/newhelp/workroad_20_3_5.png"  style="width:700px;" alt="일자리 통계분석 일자리 질 상세 조회 화면"/> -->
					<img src="/img/newhelp/workroad_20_3_5_001.png"  style="width:700px;" alt="일자리 통계분석 일자리 질 상세 조회 화면"/>
					<h2 style="text-align:center;">[일자리 통계분석 일자리 질 상세 조회 화면]</h2><br>
					<br>
					<!-- <h2>1) 상세조회 : 선택한 지표의 상세 및 차트정보를 표출합니다.</h2> -->
					<!-- <h2>2) 차트선택 : 선택한 X축에 해당하는 일자의 상세정보를 데이터보드 및 지도에 표출합니다.</h2> -->
					<!-- <h2>3) 데이터보드 : 상세정보를 차트 및 표로 표출합니다.</h2> -->
					<!-- <h2>4) 지도 : 상세정보(일부 제외)를 지도 화면에 표출합니다.</h2> -->
					<br><br>
					<h2>○ 경제상황 기본 조회 화면</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 경제상황 주요지표와 차트 정보표출</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 지표 선택 가능하며, 단일 선택</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 지표 선택 후 검색버튼 클릭 시 해당 지표의 상세조회 정보 표출</h2>
					<!--<img src="/img/newhelp/workroad_20_3_6.png"  style="width:700px;" alt="일자리 통계분석 경제상황 기본 조회 화면"/> -->
					<img src="/img/newhelp/workroad_20_3_6_001.png"  style="width:700px;" alt="일자리 통계분석 경제상황 기본 조회 화면"/>
					<h2 style="text-align:center;">[일자리 통계분석 경제상황 기본 조회 화면]</h2><br>
					<br>					
					<!-- <h2>1) 지표 선택 : 선택한 지표에 해당하는 정보를 차트에 출력합니다.</h2> -->
					<!-- <h2>2) 차트정보 : 선택한 지표에 따라 검색이 가능합니다.</h2> -->
					<!-- <h2>3) 검색 : 선택한 지표의 상세정보를 검색합니다.</h2> -->
					<br><br>
					<h2>○ 경제상황 상세 조회 화면</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 선택한 지표의 상세정보를 상세페이지와 데이터보드, 지도를 통해 조회하는 기능</h2>
					<!--<img src="/img/newhelp/workroad_20_3_7.png"  style="width:700px;" alt="일자리 통계분석 경제상황 상세 조회 화면"/> -->
					<img src="/img/newhelp/workroad_20_3_7_001.png"  style="width:700px;" alt="일자리 통계분석 경제상황 상세 조회 화면"/>
					<h2 style="text-align:center;">[일자리 통계분석 경제상황 상세 조회 화면]</h2><br>
					<br>				
					<!-- <h2>1) 상세조회 : 선택한 지표의 상세 및 차트정보를 표출합니다.</h2> -->
					<!-- <h2>2) 차트선택 : 선택한 X축에 해당하는 일자의 상세정보를 데이터보드 및 지도에 표출합니다.</h2> -->
					<!-- <h2>3) 데이터보드 : 상세정보를 차트 및 표로 표출합니다.</h2> -->
					<!-- <h2>4) 지도 : 상세정보(일부 제외)를 지도 화면에 표출합니다.</h2> -->
					<br><br>
					<h2>○ 삶의질 기본 조회 화면</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 삶의질 주요지표와 차트 정보표출</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 지표 선택 가능하며, 단일 선택</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 지표 선택 후 검색버튼 클릭 시 해당 지표의 상세조회 정보 표출</h2>
					<!--<img src="/img/newhelp/workroad_20_3_8.png"  style="width:700px;" alt="일자리 통계분석 삶의질 기본 조회 화면"/> -->
					<img src="/img/newhelp/workroad_20_3_8_001.png"  style="width:700px;" alt="일자리 통계분석 삶의질 기본 조회 화면"/>
					<h2 style="text-align:center;">[일자리 통계분석 삶의질 기본 조회 화면]</h2><br>
					<br>					
					<!-- <h2>1) 지표 선택 : 선택한 지표에 해당하는 정보를 차트에 출력합니다.</h2> -->
					<!-- <h2>2) 차트정보 : 선택한 지표에 따라 검색이 가능합니다.</h2> -->
					<!-- <h2>3) 검색 : 선택한 지표의 상세정보를 검색합니다</h2> -->
					<br><br>
					<h2>○ 삶의질 상세 조회 화면</h2>
					<h2>&nbsp;&nbsp;&nbsp;- 선택한 지표의 상세정보를 상세페이지와 데이터보드를 통해 조회하는 기능</h2>
					<!-- <img src="/img/newhelp/workroad_20_3_9.png"  style="width:700px;" alt="일자리 통계분석 삶의질 상세 조회 화면"/> -->
					<img src="/img/newhelp/workroad_20_3_9_001.png"  style="width:700px;" alt="일자리 통계분석 삶의질 상세 조회 화면"/>
					<h2 style="text-align:center;">[일자리 통계분석 삶의질 상세 조회 화면]</h2><br>
					<br>		
					<!-- <h2>1) 상세조회 : 선택한 지표의 상세 및 차트정보를 표출합니다.</h2> -->
					<!-- <h2>2) 데이터보드 : 상세정보를 차트 및 표로 표출합니다.</h2>					 -->
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
