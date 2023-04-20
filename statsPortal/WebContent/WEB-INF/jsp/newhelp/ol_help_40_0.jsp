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
             srvLogWrite('A0', '12', '14', '00', '', '복지시설');
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
				<div class="leftTitle">고령화 현황보기</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/ol_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/ol_help_20_0">고령화주제도</a></li>
						<li><a href="/view/newhelp/ol_help_20_0">현황비교</a></li>
						<li><a href="/view/newhelp/ol_help_30_0">추세분석</a></li>
						<li><a href="/view/newhelp/ol_help_40_0"  class="on">복지시설</a></li>
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
				  <h1>노인 복지시설 분석</h1><br>
 					<h2>○ 고령인구의 급증, 가족 기능 축소 등 사회적 환경 변화 및 연금 수령 등 고령인구의 경제적 지위 향상으로 의료와 간호 등 유료 서비스가 복합된 노인복지시설의 이용 인구가 꾸준히 늘어나고 있다. <br/><br/> 
 					이는 기존의 공공기관 중심 고령자 지원 서비스가 민간 기업의 실버산업으로 이행되는 원인이 되고 있다. 
 					당 서비스는 고령인구를 위한 복지시설의 설치 현황을 지역적으로 조회함으로써 공공 또는 민간의 고령자 복지시설 설립 및 운영을 위한 정책 수립을 위한 참고자료를 제공한다.</h2>
				  <br><br>	
				  <h1>시나리오</h1>
 					<h2>○ P씨는 S시의 사회복지담당자로 근무하고 있는데, 최근 경제력을 갖춘 지역 고령자들이 시가 운영하는 노인복지시설에
						입소함으로써 시설 수용 능력이 한계에 도달하게 되었다. 또한 고령자들은 간호, 여가 등 다양한 복지 서비스를 요구하고
						있으며 시의 제한된 재정으로 그 들을 만족시킬 수 없음을 알고 민간에 위탁하여 복지 서비스의 양적, 질적 향상을
						이루고자 한다.<br/><br/> 그러나 지역 내 고령자 현황 및 시설 현황에 대한 정량적 자료가 정리되어 있지 않아 정확한 사업계획
						수립에 어려움을 겪던 중 통계청의 통계지리정보서비스가 ‘노인복지시설 현황 조회“ 서비스를 제공하고 있다는 사실을
						알고 이 서비스를 통해 S시의 고령자 현황 및 고령화 추세를 알게 되었고 현재 복지시설 및 복지 서비스 이용형태를
						조회하여 시설 확장 및 민간기업 위탁을 위한 자료로 활용할 수 있게 되었다. <br/><br/>
						이를 통해 A사회복지관은 인력충원이 결정되어 A사회복지관을 찾아오는 노인들도 매우 만족하고 있다.</h2> 

				  <br><br>	
				<!--  <h1>메뉴설명</h1><br>					 -->
				<!-- <img src="/img/newhelp/Ol_010_02.png" style="width:600px;" alt="고령화 현황 화면구성"/><br> -->
				<!-- <h2>○ 지역 선택(①)</h2> -->
				<!-- <h2>&nbsp;&nbsp;&nbsp;- 고령화 현황보기는 시/군/구 단위를 선택하여 결과를 볼 수 있습니다.</h2> -->
				<!-- <h2>○ 주제 선택(②)</h2> -->
				<!-- <h2>&nbsp;&nbsp;&nbsp;- 원하는 주제를 선택할 수 있습니다.</h2> -->
				<!-- <h2>○ 세부사항 선택(③)</h2> -->
				<!-- <h2>&nbsp;&nbsp;&nbsp;- 세분화된 주제 및 지도범위를 선택 할 수 있습니다. </h2> -->
				<!-- <h2>○ 보고서 출력(④)</h2> -->
				<!-- <h2>&nbsp;&nbsp;&nbsp;- 화면을 출력할 수 있습니다.</h2> -->


				  <br><br>	
				  <h1>결과화면</h1><br>	
				  	<h2>○복지시설 위치</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 선택한 구/군 에 있는 복지시설에 대한 복지시설 이름 및 위치를 지도로 확인 할 수 있습니다.</h2>
					<img src="/img/newhelp/Ol_010_19_001.png"  alt="복지시설 위치 검색결과"/>
					<h2 align="center">&lt; 복지시설 위치 검색 결과&gt; </h2>
					<br/><br/><br/>
					
				  	<h2>○노인주거 복지시설</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 선택한 행정구역(시/도)에 소속된 구/군과 인접지역에 있는 노인주거 복지시설에 대한 시설수와 정원,현원 등을 파악 할 수 있습니다.</h2>
					<img src="/img/newhelp/Ol_010_20_001.png"  alt="노인주거 복지시설 검색결과"/>
					<h2 align="center">&lt; 노인주거 복지시설 검색 결과&gt; </h2>
					<br/><br/><br/>
					
				  	<h2>○노인의료 복지시설</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 선택한 행정구역(시/도)에 소속된 구/군과 인접지역에 있는 노인의료 복지시설에 대한 시설수와 정원,현원 등을 파악 할 수 있습니다.</h2>
					<img src="/img/newhelp/Ol_010_21_001.png"  alt="노인의료 복지시설 검색결과"/>
					<h2 align="center">&lt; 노인의료 복지시설 검색 결과&gt; </h2>
					<br/><br/><br/>
					
				  	<h2>○노인여가 복지시설</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 선택한 행정구역(시/도)에 소속된 구/군과 인접지역에 있는 노인여가 복지시설(노인복지관, 경로당, 노인교실)에 대한 시설수를 파악 할 수 있습니다.</h2>
					<img src="/img/newhelp/Ol_010_22_001.png"  alt="노인여가 시설 검색결과"/>
					<h2 align="center">&lt; 노인여가 시설 검색 결과&gt; </h2>
					<br/><br/><br/>
					
				  	<h2>○재가노인 복지시설</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 선택한 행정구역(시/도)에 소속된 구/군과 인접지역에 있는 재가노인 복지시설의 서비스(방문요양서비스, 주야간보호서비스, 단기보호서비스 등)의 시설수와 현원에 대하여 파악 할 수 있습니다.</h2>
					<img src="/img/newhelp/Ol_010_23_001.png"  alt="재가노인 복지시설 검색결과"/>
					<h2 align="center">&lt; 재가노인 복지시설 검색 결과&gt; </h2>
					<br/><br/><br/>
					
					
					
					<!-- 	<h2>○ (①) 번은 대전광역시 서구의 개별 복지시설의 위치를 지도에 마커로 표시합니다.</h2> -->
					<!-- 	<h2>○ (②) 번은 선택된 주제도(노인주거복지시설)가 오른쪽 지도에 표시됩니다.</h2> -->
					<!-- 	<h2>○ (③) 번에서는 선택한 시군구의 인접지역(경계가 맞닿아 있는 시군구), 해당 시군구가 포함된 시도의 시군구를 지도 표시영역으로 설정합니다.</h2> -->
					<!-- <img src="/img/newhelp/Ol_010_20.png" style="width:680px;" alt="고령화 현황 화면구성"/> -->
					
					
					<!-- 	<h2>○ 대전광역시 서구의 복지시설의 이름과 주소를 표시 하고 복지시설 이름을 선택시 지도에 표시되어 집니다.</h2> -->
					<!-- <img src="/img/newhelp/Ol_010_21.png" style="width:690px;" alt="고령화 현황 화면구성"/> -->
					
					
					<!--   <br><br>	 -->
					<!-- 	<h2>○ (①) 대전광역시의 구단위(동구,서구...)지역들과 인접지역의 노인주거복지시설에 대한 시설수와 정원을 나타냅니다.</h2> -->
					<!-- <img src="/img/newhelp/Ol_010_22.png" style="width:690px;" alt="고령화 현황 화면구성"/> -->
					
					<!--   <br><br>	 -->
					<!-- 	<h2>○ (①) 대전광역시의 구단위(동구,서구...)지역들과 인접지역의 노인의료복지시설의 대한 시설수와 정원을 나타냅니다.</h2> -->
					<!-- <img src="/img/newhelp/Ol_010_23.png" style="width:690px;" alt="고령화 현황 화면구성"/> -->
					
					<!--   <br><br>	 -->
					<!-- 	<h2>○ (①) 대전광역시의 구단위(동구,서구...)지역들과 인접지역의 노인여가복지시설의 대한 시설수를 나타냅니다.</h2> -->
					<!-- <img src="/img/newhelp/Ol_010_24.png" style="width:690px;" alt="고령화 현황 화면구성"/> -->
					
					<!--   <br><br>	 -->
					<!-- 	<h2>○ (①) 대전광역시의 구단위(동구,서구...)지역들과 인접지역의 재가노인복지시설 대한 시설수와 현원을 나타냅니다.</h2> -->
					<!-- <img src="/img/newhelp/Ol_010_25.png" style="width:680px;" alt="고령화 현황 화면구성"/> -->
					
					
					<!-- 	<h2>○ 전국과 대전광역시를 비교하여 고령자들이 받고 싶은 복지서비스를 나타냅니다.</h2> -->
					<!-- <br><br> -->
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
