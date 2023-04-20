<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>

<!-- mng_s 20201120 이진호 -->
<!-- 웹 표준 W3C 수정, HTML5 로 수정 -->
<!--<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">-->
<!DOCTYPE html>
<!-- mng_e 20201120 이진호 -->

<html>
<head>
<meta charset="utf-8"/>
<title>SGIS plus mobile</title>
<%@include file="/WEB-INF/jsp/m2020/includes/includeHeaderFile.jsp" %>
<%@include file="/WEB-INF/jsp/m2020/includes/includeMapHeaderFile.jsp" %>

<script src="${ctx }/resources/m2020/js/main.js"></script>
<script type="text/javascript">
	//PC 버전 가기
	function movePcMode(){
		location.href = "${sgisCtx }/view/index?param=0";
	}
	srvLogWrite('O0', '02', '01', '00', '', '');
</script>
</head>

<body>
	<jsp:include page="/WEB-INF/jsp/m2020/includes/popup.jsp" />
	<!-- 지도 영역 START -->
	<!-- 2020.09.17[한광희] 현재위치 및 기본위치 설정 수정 START -->
	<!-- <div class="MapArea" style="display: none;">
		<div class="Map">
			<div id="map"></div>
		</div>
	</div> -->
	<!-- 2020.09.17[한광희] 현재위치 및 기본위치 설정 수정 START -->
	<!-- 지도 영역 END -->
	
  	<!-- LNB 시작 -->
	<aside style="height:100%;" id="lnbWrap">
    	<h3>전체메뉴</h3>
    	<div class="aside_menu_wrap">
      		<div class="aside_menu">
        		<nav>
          			<ul>
            			<li class="menu01"><a href="${ctx }/m2020/map/statsMe/statsMeMap.sgis"  onclick="srvLogWrite('O0', '01', '01', '03', '', '');">My통계로(路)</a></li>
			            <li class="menu02"><a href="${ctx }/m2020/map/workroad/myNeighberhoodJobMap.sgis?todaystatus_pop_yn=Y" onclick="srvLogWrite('O0', '01', '01', '04', '', '');">일자리맵</a></li>
			            <li class="menu03"><a href="${ctx }/m2020/map/current/currentMap.sgis"  onclick="srvLogWrite('O0', '01', '01', '05', '', '');">내주변통계</a></li>
			            <li class="menu04"><a href="${ctx }/m2020/map/thematic/thematicMap.sgis"  onclick="srvLogWrite('O0', '01', '01', '06', '', '');">통계주제도</a></li>
			            <li class="menu05"><a href="${ctx }/m2020/map/house/recomendHouseMap.sgis" onclick="srvLogWrite('O0', '01', '01', '07', '', '');">살고싶은 우리동네</a></li>
			            <li class="menu06"><a href="${ctx }/m2020/map/community/communityMap.sgis" onclick="srvLogWrite('O0', '01', '01', '08', '', '');">지역현안 소통지도</a></li>
			            <li class="menu07"><a href="${ctx }/m2020/map/board/introduction.sgis" onclick="srvLogWrite('O0', '01', '01', '09', '', '');">알림마당</a></li>
          			</ul>
        		</nav>
      		</div>
    	</div>
    	<div class="footer">
      		<div class="mt30"></div>
      		<button type="button" class="pcBtn" name="button" onclick="javascript:movePcMode(); srvLogWrite('O0', '01', '01', '10', '', '');">PC버전 가기</button>
      		<div class="mt30"></div>
      		<p class="copyright">ⓒStatistics Korea. All rights reserved.</p>
    	</div>
    	<button id="menu-close-button" class="btn_menuClose" type="button"><img src="${ctx }/resources/m2020/images/common/btn_close.png" alt="전체메뉴 닫기"/></button> <!-- 2020.09.11 [신예리] 웹접근성 문제로 수정 -->
  	</aside>
  	<!-- LNB끝 -->

  	<div class="Wrap Main">
    	<!-- header영역 --> 
    	<div class="header">
      		<header>
        		<button type="button" name="button" class="menuBtn" id="lnb-open"><img src="${ctx }/resources/m2020/images/main/menu.png" alt="전체메뉴 열기 버튼"/></button> <!-- 2020.09.11 [신예리] 웹접근성 문제로 수정 -->
        		<h1><img src="${ctx }/resources/m2020/images/main/main_logo.png" alt="SGIS 오픈 플랫폼 서비스 (SGIS 통계지리 정보 서비스)"/></h1>
        		<h1 style="display: none;">SGIS 오픈 플랫폼 서비스</h1>
        		<button type="button" name="button" class="searchBtn" id="rnb-open"><img src="${ctx }/resources/m2020/images/main/search.png" alt="검색 버튼"/></button> <!-- 2020.09.11 [신예리] 웹접근성 문제로 수정 -->
      		</header>
    	</div>

    	<!-- 본문 시작 -->
		<div class="Container">
		    <a id="MOVE_TOP_BTN" href="#">TOP</a>
	     
	      	<div class="banner">
	        	<div class="mlr16">
	          		<h2 class="tit">내 손 안의 통계지도</h2>
	          		<p class="txt mt10" style="word-break: keep-all;">모바일을 통해 언제, 어디서든지 지도기반의 통계정보를 손쉽게 확인할 수 있습니다.</p>
	        	</div>
	      	</div>
		    <!-- 배너 START --> 
		    <div class="conBox mlr16">
		    	<!-- Swiper -->
				<div class="swiper-container">
					<div class="swiper-wrapper">
				    	<div class="swiper-slide slidebanner"><a href="${ctx }/m2020/map/statsMe/statsMeMap.sgis" onclick="srvLogWrite('O0', '02', '03', '01', '', '');"><img src="${ctx }/resources/m2020/images/main/slide00.png" alt="My통계로 화면으로 이동"/></a></div><!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
				    </div>
				</div>
		    </div>
		    <!-- 배너  END-->
	      	<div class="mt15"></div>
			<!-- 공지사항 START -->
	    	<div class="conBox_notice mlr16">
	        	<div>
	          		<h2>공지</h2>
	        	</div>
	        	<ul  id="article-list">
	          		<!-- <li><a href="#">2020년 이용자 설문조사 당첨자 알림</a></li> -->
	        	</ul>
	        	<button type="button" onclick="javascript:srvLogWrite('O0', '02', '04', '01', '더보기', '');location.href='${ctx }/m2020/map/board/notice.sgis'">더보기</button>
	      	</div>
	      	<!-- 공지사항 START -->
	      	<div class="mt15"></div>
			<!-- 메인화면 메뉴 START -->
	      	<div class="conBox_icon mlr16">
		    	<div class="row">
	          		<div class="col" onclick="fnMove('0');javascript:srvLogWrite('O0', '02', '05', '01', '', '');">
	            		<img src="${ctx }/resources/m2020/images/main/main_icon00.png" alt="My통계로 이동"/> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
	            		<h2 class="col00">My통계로(路)</h2>
	          		</div>
	          		<div class="col" onclick="fnMove('1');srvLogWrite('O0', '02', '06', '01', '', '');">
	            		<img src="${ctx }/resources/m2020/images/main/main_icon01.png" alt="일자리맵 이동"/> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
	            		<h2 class="col01">일자리맵</h2>
	       			</div>
	          		<div class="col" onclick="fnMove('2');srvLogWrite('O0', '02', '07', '01', '', '');">
	            		<img src="${ctx }/resources/m2020/images/main/main_icon02.png" alt="내주변통계 이동"/> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
	            		<h2 class="col02">내주변통계</h2>
	          		</div>
	        	</div>
	        	<div class="row">
	          		<div class="col" onclick="fnMove('3')">
	            		<img src="${ctx }/resources/m2020/images/main/main_icon03.png" alt="통계주제도 이동" onclick="srvLogWrite('O0', '02', '08', '01', '', '');"/> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
	            		<h2 class="col03">통계주제도</h2>
	          		</div>
	          		<div class="col" onclick="fnMove('4')">
	            		<img src="${ctx }/resources/m2020/images/main/main_icon04.png" alt="살고싶은 우리동네 이동" onclick="srvLogWrite('O0', '02', '09', '01', '', '');"/> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
	            		<h2 class="col04">살고싶은 우리동네</h2>
	          		</div>
	          		<div class="col" onclick="fnMove('5')">
	            		<img src="${ctx }/resources/m2020/images/main/main_icon05.png" alt="" onclick="srvLogWrite('O0', '02', '10', '01', '', '');"/>
	            		<h2 class="col05">지역현안 소통지도</h2>
	          		</div>
	        	</div>
	      	</div>
			<!-- 메인화면 메뉴 END -->
      		<div class="mt15"></div>
      		<!-- my통계로START -->
      		<div class="cardWrap cardbd" id="col0">
        		<div class="intro bt_col00">
          			<img src="${ctx }/resources/m2020/images/main/main_icon00.png" alt="My통계로 아이콘"/> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
          			<h2 style="color: #437BB4;">My 통계로(路)</h2>
          			<a href="${ctx }/m2020/map/statsMe/statsMeMap.sgis" class="col00Move" title="My통계로 서비스 화면 이동" onclick="srvLogWrite('O0', '02', '05', '02', '', '');">서비스 바로가기</a> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
          			<p>생애주기와 관심분야를 선택하여 내가 원하는 통계지리정보를 간편하게 볼 수 있는 서비스</p>
        		</div>
        		<div class="row" style="background-color:#eef0f5 !important;">
          			<p class="col00_g">생애주기/관심분야에서 가장 많이 본 통계정보는?</p> 
        		</div>
        		<div class="keyWrap pd10">
        			
        			<!-- mng_s 20201123 이진호, W3C 웹표준 오류 수정 -->
					<!--<h4 class="statsMeh4" name="mainStatMe" id="lfeCycle">생애주기</h4> -->
					<h4 class="statsMeh4" id="lfeCycle">생애주기</h4>
					<!-- mng_e 20201123 이진호 -->
					
          			<a class="col00LinkBtn on" name="mainLfeCycle" data-id="LFECYCLE_INFANT_CHILD">영유아/어린이</a>
			        <a class="col00LinkBtn" name="mainLfeCycle" data-id="LFECYCLE_YNGBGS">청소년</a>
			        <a class="col00LinkBtn" name="mainLfeCycle" data-id="LFECYCLE_YGMN">청년</a>
			        <a class="col00LinkBtn on" name="mainLfeCycle" data-id="LFECYCLE_ADULT">중장년</a> 
        		</div>
        		<div class="keyWrap pd10b bb">
        			<h4 class="statsMeh4 visi"></h4>  
          			<a class="col00LinkBtn" name="mainLfeCycle" data-id="LFECYCLE_ODSN">노년</a>
          			<a class="col00LinkBtn" name="mainLfeCycle" data-id="LFECYCLE_PREGNAN_CHLDBRTH_CHLDCR_FEMALE">임신/출산/육아여성</a>
          			<a class="col00LinkBtn" name="mainLfeCycle" data-id="LFECYCLE_PSN_1_FAMILY">1인가구</a> 
        		</div> 
        		<div class="keyWrap pd10">
        			
        			<!-- mng_s 20201123 이진호, W3C 웹표준 오류 수정 -->
					<!--<h4 class="statsMeh4" name="mainStatMe" id="statDistance">관심분야</h4> -->
					<h4 class="statsMeh4" id="statDistance">관심분야</h4>
        			<!-- mng_e 20201123 이진호 -->
        			
          			<a class="col00LinkBtn on" name="mainStatDistance" data-id="DSTNC_FD">먹거리</a>
			        <a class="col00LinkBtn" name="mainStatDistance" data-id="DSTNC_HOUSE">살거리</a>
			        <a class="col00LinkBtn" name="mainStatDistance" data-id="DSTNC_JOB">일거리</a>
			        <a class="col00LinkBtn" name="mainStatDistance" data-id="DSTNC_TRNSPORT">탈거리</a>
        		</div>
        		<div class="keyWrap pd10b bb">
        			<h4 class="statsMeh4 visi"></h4> 
          			<a class="col00LinkBtn" name="mainStatDistance" data-id="DSTNC_EDU">배울거리</a>
          			<a class="col00LinkBtn" name="mainStatDistance" data-id="DSTNC_PLY">보고놀거리</a>
          			<a class="col00LinkBtn on" name="mainStatDistance" data-id="DSTNC_HEALTH">건강거리</a> 
          			<a class="col00LinkBtn" name="mainStatDistance" data-id="DSTNC_SAFE">안전거리</a>
        		</div>
        		 
        		<!-- mng_s 20201123 이진호, W3C 웹표준 오류 수정 -->  
				<!--<ul class="MainstatsMeList bg_col00 pd-t0" id="mainStatMeList">-->
				<ul class="MainstatsMeList bg_col00 pd-t0" id="mainStatMeList"></ul>
         		<!-- mng_e 20201123 이진호 -->
         		
         			 <!-- <li><span>1</span><a>청년 인구 현황</a><a href="" class="statsMeMapmove">통계지도보기</a></li>
			         <li><span>2</span><a>1인가구 수</a><a href="" class="statsMeMapmove">통계지도보기</a></li>
          			 <li><span>3</span><a>중장년인구현황</a><a href="" class="statsMeMapmove">통계지도보기</a></li> -->
			
			<!-- mng_s 20201123 이진호 , W3C 웹 표준 오류 수정 -->          			 
			<!--</div> -->
			<!-- mng_e 20201123 이진호 -->
			
        	</div> 
			<!-- my통계로 END -->
      		<div class="mt15"></div>
      		<!-- 일자리맵 START -->
      		<div class="cardWrap cardbd" id="col1">
        		<div class="intro bt_col01">
          			<img src="${ctx }/resources/m2020/images/main/main_icon01.png" alt="일자리맵 아이콘"/> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
          			<h2 class="col01">일자리맵</h2>
          			
          			<!--mng_s 20201123 이진호, W3C 웹 표준 오류 수정 -->
					<%--<a href="${ctx }/m2020/map/workroad/myNeighberhoodJobMap.sgis?todaystatus_pop_yn=Y"" class="col01Move" title="일자리맵 서비스 화면 이동" onclick="srvLogWrite('O0', '02', '06', '02', '', '');">서비스 바로가기</a> <!-- 2020.09.10[한광희] 오늘의 전체 일자리현황 팝업 변수 및 대체 텍스트 추가 --> --%>
          			<a href="${ctx }/m2020/map/workroad/myNeighberhoodJobMap.sgis?todaystatus_pop_yn=Y" class="col01Move" title="일자리맵 서비스 화면 이동" onclick="srvLogWrite('O0', '02', '06', '02', '', '');">서비스 바로가기</a> <!-- 2020.09.10[한광희] 오늘의 전체 일자리현황 팝업 변수 및 대체 텍스트 추가 -->
          			<!-- mng_e 20201123 이진호 -->
          			
          			<p>워크넷과 인쿠르트, 사람인에서 수집한 구인정보를 이용하여  오늘의 구인현황, 일자리보기, 구인현황 분석 등 사용자 조건에 맞는 일자리정보 및 현황을 제공하는 서비스</p>
        		</div>
        		<div class="keyWrap pd15 bb">
          			<a class="col01LinkBtn" href="${ctx }/m2020/map/workroad/myNeighberhoodJobMap.sgis?todaystatus_pop_yn=Y" onclick="srvLogWrite('O0', '02', '06', '03', '내주변 일자리', '');">내주변 일자리</a>	<!-- 2020.09.10[한광희] 오늘의 전체 일자리현황 팝업 변수 추가 -->
			        <a class="col01LinkBtn" href="${ctx }/m2020/map/workroad/todayStatusMap.sgis" onclick="srvLogWrite('O0', '02', '06', '03', '오늘의 구인현황', '');">오늘의 구인현황</a>
			        <a class="col01LinkBtn" href="${ctx }/m2020/map/workroad/statsAnlsMap.sgis" onclick="srvLogWrite('O0', '02', '06', '03', '일자리 통계정보', '');">일자리 통계정보</a>
        		</div>
        		<div class="row bg_col01">
          			<p class="col_w">오늘의 구인현황은?</p>
          			<div class='toggleBG'>
            			<button class='toggleFG'>전국</button>
          			</div> 
        		</div> 
        		<div class="Currentposition bg_col01">
        			
        			<!-- mng_s 20201123 이진호, W3C 웹 표준 오류 수정 -->
					<%--<span><img src="${ctx }/resources/m2020/images/main/currenPosition_main.png"></span><p id="workRoad_area_tit">전국 08월 28일 구인현황입니다.</p> --%>
        			<span><img alt="currenPosition_main.png" src="${ctx }/resources/m2020/images/main/currenPosition_main.png"/></span><p id="workRoad_area_tit">전국 08월 28일 구인현황입니다.</p>
        			<!-- mng_e 20201123 이진호 -->
        			
				</div>
        		<div class="rollWrap pd-t0 bg_col01"> 
          			<div class="roll" id="main_all_corp_cnt_div">	<!-- 2020.08.28[한광희] 오늘의 구인현황 link 처리를 위한 id 추가 -->
            			<div class="roll_row">
              				<span><img src="${ctx }/resources/m2020/images/main/company.png" alt="전체 구인업체수 아이콘" /></span> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
              				<h6>전체 구인업체수</h6>
            			</div>
            			<div class="roll_row">
              				<h1 id="main_all_corp_cnt">-</h1>
              				<p>업체</p>
            			</div>  
          			</div>
          			<div class="roll" id="main_all_rcrit_psn_cnt_div">	<!-- 2020.08.28[한광희] 오늘의 구인현황 link 처리를 위한 id 추가 -->
            			<div class="roll_row">
              				<span><img src="${ctx }/resources/m2020/images/main/job_offerer.png" alt="전체 구인자수 아이콘" /></span> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
              				<h6>전체 구인자수</h6>
            			</div>
            			<div class="roll_row">
              				<h1 id="main_all_rcrit_psn_cnt">-</h1>
              				<p>명</p>
            			</div> 
          			</div>
        		</div>
      		</div>
			<!-- 일자리맵 END -->
      		<div class="mt15"></div>
      		<!-- 내주변통계 START -->
      		<div class="cardWrap cardbd" id="col2">
        		<div class="intro bt_col02">
          			<img src="${ctx }/resources/m2020/images/main/main_icon02.png" alt="내주변 통계 아이콘"/> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
          			<h2 class="col02">내주변통계</h2>
          			<a href="${ctx }/m2020/map/current/currentMap.sgis" class="col02Move" title="내주변통계 서비스 화면 이동" onclick="srvLogWrite('O0', '02', '07', '02', '', '');">서비스 바로가기</a> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
          			<p>내 위치를 기반으로 인구, 주택, 사업체 등 내 주변의 통계정보를 제공하는 서비스</p>
        		</div>
        		<div class="keyWrap pd15">
          			<a class=col02LinkBtn href="${ctx }/m2020/map/current/currentMap.sgis?type=API_0301&menuIndex=0" onclick="srvLogWrite('O0', '02', '07', '03', '주요지표', '');">주요지표</a>
			        <a class="col02LinkBtn" href="${ctx }/m2020/map/current/currentMap.sgis?type=API_0302&menuIndex=1" onclick="srvLogWrite('O0', '02', '07', '03', '인구', '');">인구</a>
			        <a class="col02LinkBtn" href="${ctx }/m2020/map/current/currentMap.sgis?type=API_0305&menuIndex=2" onclick="srvLogWrite('O0', '02', '07', '03', '가구', '');">가구</a>
        		</div>
        		<div class="keyWrap pd-t0 bb">
          			<a class="col02LinkBtn" href="${ctx }/m2020/map/current/currentMap.sgis?type=API_0306&menuIndex=3" onclick="srvLogWrite('O0', '02', '07', '03', '주택', '');">주택</a>
          			<a class="col02LinkBtn" href="${ctx }/m2020/map/current/currentMap.sgis?type=API_0304&menuIndex=4" onclick="srvLogWrite('O0', '02', '07', '03', '사업체', '');">사업체</a>
          			<a class="col02LinkBtn" href="${ctx }/m2020/map/current/currentMap.sgis?type=API_0310&menuIndex=5" onclick="srvLogWrite('O0', '02', '07', '03', '농림어가', '');">농림어가</a>
        		</div>
        		<div class="row bg_col02">
          			<p class="col_w">내 주변 주요지표는?</p>
        		</div>
        		<div class="Currentposition bg_col02">
        			
        			<!-- mng_s 20201123 이진호, W3C 웹 표준 오류 수정 -->
					<%--<span><img src="${ctx }/resources/m2020/images/main/currenPosition_main.png"></span><p id="this_current_area_tit"></p> --%>
        			<span><img alt="currenPosition_main.png" src="${ctx }/resources/m2020/images/main/currenPosition_main.png"/></span><p id="this_current_area_tit"></p>
        			<!-- mng_e 20201123 이진호 -->
        			
        		</div>
        		
        		<!-- 내 주변 주요지표 START -->
        		<div class="bg_col02">
	       			<div class="swiper-container" id="interactiveSwiper" style="width: 92%;">
	            		<div class="swiper-wrapper cardWrap" style="flex-direction: row; box-shadow: 0 0 0 rgba(0,0,0,0);">
			        		<div class="swiper-slide rollWrap pb20 bg_col02 swiper-slide-active">
			          			<div class="roll">
			            			<div class="roll_row">
			              				<span><img src="${ctx }/resources/m2020/images/main/total.png" alt="총 인구 지표 아이콘" /></span> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
			              				<h6>총 인구(명)</h6>
			            			</div>
			            			<div class="roll_row">
			              				<h1 id="tot_ppltn"></h1>
			              				<p>명</p>
			            			</div>
			          			</div>
			          			<div class="roll">
			            			<div class="roll_row">
			              				<span><img src="${ctx }/resources/m2020/images/main/avg.png" alt="평균나이 지표 아이콘" /></span> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
			              				<h6>평균나이(세)</h6>
			            			</div>
			            			<div class="roll_row">
			              				<h1 id="avg_age"></h1>
			              				<p>세</p>
			            			</div>
			          			</div>
			        		</div>
			        		<div class="swiper-slide rollWrap pb20 bg_col02 swiper-slide-next">
			          			<div class="roll">
			            			<div class="roll_row">
						            	<span><img src="${ctx }/resources/m2020/images/main/data_icon00.png" alt="인구밀도 지표 아이콘" /></span> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
						              	<h6>인구밀도(명/㎢)</h6>
						            </div>
						            <div class="roll_row">
						            	<h1 id="ppltn_dnsty"></h1>
						            	<p>명/㎢</p>
						            </div>
			          			</div>
			          			<div class="roll">
			            			<div class="roll_row">
						              	<span><img src="${ctx }/resources/m2020/images/main/data_icon01.png" alt="노령화지수 지표 아이콘" /></span> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
						              	<h6>노령화지수</h6>
						            </div>
						            <div class="roll_row">
						              	<h1 id="aged_child_idx"></h1>
						              	<p>일백명당 명</p>
						            </div>
			          			</div>
			        		</div>
			        		<div class="swiper-slide rollWrap pb20 bg_col02">
			          			<div class="roll">
			            			<div class="roll_row">
						            	<span><img src="${ctx }/resources/m2020/images/main/data_icon02.png" alt="노년부양비 지표 아이콘" /></span> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
						              	<h6>노년부양비</h6>
						            </div>
						            <div class="roll_row">
						              	<h1 id="oldage_suprt_per"></h1>
						              	<p>일백명당 명</p>
						            </div>
			          			</div>
			          			<div class="roll">
			            			<div class="roll_row">
						            	<span><img src="${ctx }/resources/m2020/images/main/data_icon03.png" alt="유년부양비 지표 아이콘" /></span> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
						              	<h6>유년부양비</h6>
					            	</div>
						            <div class="roll_row">
						              	<h1 id="juv_suprt_per"></h1>
						              	<p>일백명당 명</p>
						            </div>
			          			</div>
			        		</div>
			        		<div class="swiper-slide rollWrap pb20 bg_col02">
			          			<div class="roll">
			            			<div class="roll_row">
						            	<span><img src="${ctx }/resources/m2020/images/main/data_icon04.png" alt="가구 지표 아이콘" /></span> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
						              	<h6>가구(가구)</h6>
						            </div>
						            <div class="roll_row">
						              	<h1 id="tot_family"></h1>
						              	<p>가구</p>
						            </div>
			          			</div>
			          			<div class="roll">
			            			<div class="roll_row">
						            	<span><img src="${ctx }/resources/m2020/images/main/data_icon05.png" alt="평균 가구원 지표 아이콘" /></span> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
						              	<h6>평균 가구원(명)</h6>
					            	</div>
						            <div class="roll_row">
						              	<h1 id="avg_fmember_cnt"></h1>
						              	<p>명</p>
						            </div>
			          			</div>
			        		</div>
			        		<div class="swiper-slide rollWrap pb20 bg_col02">
			          			<div class="roll">
			            			<div class="roll_row">
						            	<span><img src="${ctx }/resources/m2020/images/main/data_icon06.png" alt="주택 지표 아이콘" /></span> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
						              	<h6>주택(호)</h6>
						            </div>
						            <div class="roll_row">
						              	<h1 id="tot_house"></h1>
						              	<p>호</p>
						            </div>
			          			</div>
			          			<div class="roll">
			            			<div class="roll_row">
						            	<span><img src="${ctx }/resources/m2020/images/main/data_icon07.png" alt="농가 지표 아이콘" /></span> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
						              	<h6>농가(가구)</h6>
					            	</div>
						            <div class="roll_row">
						              	<h1 id="nongga_cnt"></h1>
						              	<p>가구</p>
						            </div>
			          			</div>
			        		</div>
			        		<div class="swiper-slide rollWrap pb20 bg_col02">
			          			<div class="roll">
			            			<div class="roll_row">
						            	<span><img src="${ctx }/resources/m2020/images/main/data_icon08.png" alt="임가 지표 아이콘" /></span> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
						              	<h6>임가(가구)</h6>
						            </div>
						            <div class="roll_row">
						              	<h1 id="imga_cnt"></h1>
						              	<p>가구</p>
						            </div>
			          			</div>
			          			<div class="roll">
			            			<div class="roll_row">
						            	<span><img src="${ctx }/resources/m2020/images/main/data_icon09.png" alt="내수면 어가 지표 아이콘" /></span> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
						              	<h6>내수면 어가(가구)</h6>
					            	</div>
						            <div class="roll_row">
						              	<h1 id="naesuoga_cnt"></h1>
						              	<p>가구</p>
						            </div>
			          			</div>
			        		</div>
			        		<div class="swiper-slide rollWrap pb20 bg_col02">
			          			<div class="roll">
			            			<div class="roll_row">
						            	<span><img src="${ctx }/resources/m2020/images/main/data_icon10.png" alt="해수면 어가 지표 아이콘" /></span> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
						              	<h6>해수면 어가(가구)</h6>
						            </div>
						            <div class="roll_row">
						              	<h1 id="haesuoga_cnt"></h1>
						              	<p>가구</p>
						            </div>
			          			</div>
			          			<div class="roll">
			            			<div class="roll_row">
						            	<span><img src="${ctx }/resources/m2020/images/main/company.png" alt="사업체수 지표 아이콘" /></span> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
						              	<h6>사업체수(전체 사업체)</h6>
					            	</div>
						            <div class="roll_row">
						              	<h1 id="corp_cnt"></h1>
						              	<p>개</p>
						            </div>
			          			</div>
			        		</div>
			        	</div>
		        		<!-- Add Arrows -->
	           			<div class="swiper-button-next" tabindex="0" role="button" aria-label="Next slide" aria-disabled="false" style="right: 0px !important;"></div>
	           			<div class="swiper-button-prev swiper-button-disabled" tabindex="-1" role="button" aria-label="Previous slide" aria-disabled="true" style="left: 0px !important;"></div>	
	        		</div>
        		</div>
        		<!-- 내 주변 주요지표 END -->
       		</div>
			<!-- 내주변통계 END -->
      		<div class="mt15"></div>
			<!-- 통계주제도 START -->
      		<div class="cardWrap cardbd" id="col3">
        		<div class="intro bt_col03">
          			<img src="${ctx }/resources/m2020/images/main/main_icon03.png" alt="통계주제도 아이콘"/> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
          			<h2 class="col03">통계주제도</h2>
          			
          			<!-- mng_s 20201123 이진호 / W3C 웹 표준 오류 수정 -->
					<%--<a href="${ctx }/m2020/map/thematic/thematicMap.sgis?selParam=CTGR_001&menuIndex=0"" class="col03Move" title="통계주재도 서비스 화면 이동" onclick="srvLogWrite('O0', '02', '08', '02', '', '');">서비스 바로가기</a> <!-- 2020.09.08 [신예리] 대체텍스트 추가 --> --%>
          			<a href="${ctx }/m2020/map/thematic/thematicMap.sgis?selParam=CTGR_001&menuIndex=0" class="col03Move" title="통계주재도 서비스 화면 이동" onclick="srvLogWrite('O0', '02', '08', '02', '', '');">서비스 바로가기</a> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
          			<!-- mng_e 20201123 이진호 -->
          			
          			<p>인구와 가구, 주거와 교통, 복지와 문화, 노동과 경제, 환경과 안전의 5가지 카테고리에 따라 관심있는 통계를 주제도로 제공하는 서비스</p>
        		</div>
        		<div class="keyWrap pd15">
          			<a class="col03LinkBtn" href="${ctx }/m2020/map/thematic/thematicMap.sgis?selParam=CTGR_001&menuIndex=0" onclick="srvLogWrite('O0', '02', '08', '03', '인구와 가구', '');">인구와 가구</a>
          			<a class="col03LinkBtn" href="${ctx }/m2020/map/thematic/thematicMap.sgis?selParam=CTGR_002&menuIndex=1" onclick="srvLogWrite('O0', '02', '08', '03', '주거와 교통', '');">주거와 교통</a>
          			<a class="col03LinkBtn" href="${ctx }/m2020/map/thematic/thematicMap.sgis?selParam=CTGR_003&menuIndex=2" onclick="srvLogWrite('O0', '02', '08', '03', '복지와 문화', '');">복지와 문화</a>	<!-- 2020.08.31[한광희] 통계주제도 하위 메뉴 swiper 메뉴 index 수정 -->
        		</div>
        		<div class="keyWrap pd-t0 bb">
          			<a class="col03LinkBtn" href="${ctx }/m2020/map/thematic/thematicMap.sgis?selParam=CTGR_004&menuIndex=3" onclick="srvLogWrite('O0', '02', '08', '03', '노동과 경제', '');">노동과 경제</a>	<!-- 2020.08.31[한광희] 통계주제도 하위 메뉴 swiper 메뉴 index 수정 -->
          			<a class="col03LinkBtn" href="${ctx }/m2020/map/thematic/thematicMap.sgis?selParam=CTGR_005&menuIndex=4" onclick="srvLogWrite('O0', '02', '08', '03', '환경과 안전', '');">환경과 안전</a>	<!-- 2020.08.31[한광희] 통계주제도 하위 메뉴 swiper 메뉴 index 수정 -->
          			<a class="col03LinkBtn visi" href="#"></a>
        		</div>
        		<div class="row bg_col03">
          			<p class="col_w">통계주제도 인기 데이터 TOP3는?</p>
        		</div>
        		<div class="row bg_col03" style="padding: 0px 15px 15px 15px;">
					<!-- Swiper -->
          			<div class="swiper-container" id="mainGetStatsThemeMapListDiv">
            			<div class="swiper-wrapper" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">
            			
            				<!-- mng_s 20201123 이진호, W3C 웹 표준 오류 수정 -->
							<!--<div class="swiper-slide col02_1 swiper-slide-active" style="width: 414px;" cate_id="CTGR_001">인구와 가구</div> -->
							<!--<div class="swiper-slide col02_1 swiper-slide-next" style="width: 414px;" cate_id="CTGR_002">주거와 교통</div> -->
							<!--<div class="swiper-slide col02_1" style="width: 414px;" cate_id="CTGR_003">복지와 문화</div> -->
							<!--<div class="swiper-slide col02_1" style="width: 414px;" cate_id="CTGR_004">노동과 경제</div> -->
							<!--<div class="swiper-slide col02_1" style="width: 414px;" cate_id="CTGR_005">환경과 안전</div> -->
              				<div class="swiper-slide col02_1 swiper-slide-active" style="width: 414px;" id="CTGR_001">인구와 가구</div>
              				<div class="swiper-slide col02_1 swiper-slide-next" style="width: 414px;" id="CTGR_002">주거와 교통</div>
              				<div class="swiper-slide col02_1" style="width: 414px;" id="CTGR_003">복지와 문화</div>
              				<div class="swiper-slide col02_1" style="width: 414px;" id="CTGR_004">노동과 경제</div>
              				<div class="swiper-slide col02_1" style="width: 414px;" id="CTGR_005">환경과 안전</div>
              				<!-- mng_e 20201123 이진호 -->
              				
            			</div>
             			<!-- Add Arrows -->
           				<div class="swiper-button-next" tabindex="0" role="button" aria-label="Next slide" aria-disabled="false"></div>
           				<div class="swiper-button-prev swiper-button-disabled" tabindex="-1" role="button" aria-label="Previous slide" aria-disabled="true"></div>	 
          			</div>
        		</div>
				<div class="rollWrap pd-t0 bg_col03" id="main-theme-list">
          			<div class="roll" style="display: none;">
            			<div class="roll_row">
              				<h6>1</h6>
            			</div>
            			<div class="roll_row">
              				<h5>귀농/귀촌/귀어<br />인구현황</h5>
            			</div>
          			</div>
          			<div class="roll" style="display: none;">
            			<div class="roll_row">
              				<h6>2</h6>
            			</div>
            			<div class="roll_row">
              				<h5>인구변화</h5>
            			</div>
          			</div>
          			<div class="roll" style="display: none;">
            			<div class="roll_row">
              				<h6>3</h6>
            			</div>
            			<div class="roll_row">
              				<h5>1인 가구변화</h5>
            			</div>
          			</div>
        		</div>
      		</div>
			<!-- 통계주제도 END -->
      		<div class="mt15"></div>
      		<!-- 살고싶은우리동네 START -->
      		<div class="cardWrap cardbd" id="col4">
        		<div class="intro bt_col04">
          			<img src="${ctx }/resources/m2020/images/main/main_icon04.png" alt="살고싶은 우리동네 아이콘"/> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
          			<h2 class="col04">살고싶은 우리동네</h2>
          			<a href="${ctx }/m2020/map/house/recomendHouseMap.sgis" class="col04Move" title="살고싶은 우리동네 서비스 화면 이동" onclick="srvLogWrite('O0', '02', '09', '02', '', '');">서비스 바로가기</a> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
          			<p>통계에 기반하여 사용자 조건에 맞는 주거지역을 추천해주는 서비스</p>
        		</div>
       			<div class="keyWrap pd15">
          			<a class="col04LinkBtn" href="${ctx }/m2020/map/house/recomendHouseMap.sgis" onclick="srvLogWrite('O0', '02', '09', '03', '추천지역찾기', '');">추천지역찾기</a>
          			<a class="col04LinkBtn" href="${ctx }/m2020/map/house/houseSearchMap.sgis" onclick="srvLogWrite('O0', '02', '09', '03', '간편동네찾기', '');">간편동네찾기</a>
          			<a class="col04LinkBtn" href="${ctx }/m2020/map/house/houseStatusMap.sgis" onclick="srvLogWrite('O0', '02', '09', '03', '주거현황보기', '');">주거현황보기</a>
        		</div>
        		<div class="keyWrap pd-t0 bb">
          			<a class="col04LinkBtn" href="${ctx }/m2020/map/biz/bizMap.sgis" onclick="srvLogWrite('O0', '02', '09', '03', '우리동네 생활업종', '');">우리동네 생활업종</a>
          			<a class="col04LinkBtn visi" href="#"></a>
          			<a class="col04LinkBtn visi" href="#"></a>
        		</div>
        		<div class="row bg_col04">
          			<p class="col_w">우리동네 생활환경종합 지표 중 높은 지표는?</p>
        		</div>
        		<div class="row_p bg_col04">
          			<p id="mainLifeEnvironment_this_title_1">전국에 비해 대전광역시 서구의<br />
            		<strong>생활편의교통</strong>지표가 좋습니다.</p>
        		</div>
        		<div class="rollWrap pd-t0 bg_col04" id="mainLifeEnvironment">
          			<!-- <div class="roll">
            			<div class="roll_row">
              				<h6>전국평균</h6>
            			</div>
            			<div class="roll_row">
              				<h1 id="mainLifeEnvironment_all_avg">0</h1>
            			</div>
          			</div>
          			<div class="roll">
            			<div class="roll_row">
              				<h6 id="mainLifeEnvironment_this_title_2">대전광역시 서구 평균</h6>
            			</div>
            			<div class="roll_row">
              				<h1 id="mainLifeEnvironment_this_avg">0</h1>
            			</div>
          			</div> -->
        		</div>
      		</div>
      		<!-- 살고싶은우리동네 START -->
      		<div class="mt15"></div>
     		<!-- 지역현안 소통지도 START -->
      		<div class="cardWrap cardbd" id="col5">
        		<div class="intro bt_col05">
          			<img src="${ctx }/resources/m2020/images/main/main_icon05.png" alt="지역현안 소통지도 아이콘"/> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
          			<h2 class="col05">지역현안 소통지도</h2>
          			<a href="${ctx }/m2020/map/community/communityMap.sgis" class="col05Move" title="지역현안 소통지도 서비스 화면 이동" onclick="srvLogWrite('O0', '02', '10', '02', '', '');">서비스 바로가기</a> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
          			<p>지역현안 소통지도는 지역사회 구성원이 직접 참여하여 지역 사회의 이슈를 찾아내고 소통을 위한 공간을 마련하는 서비스로 지도 맵핑기능을 기본적으로 제공</p>
        		</div>
        		<!-- <div class="keyWrap pd15 bb"> -->
          			<!--<a class="col05LinkBtn" href="${ctx }/m2020/map/community/communityMap.sgis">지역현안 소통지도</a>-->
        		<!-- </div> -->
        		<div class="row bg_col05">
          			<p class="col_w">최근에 등록된 지역현안 소통지도는?</p>
        		</div>
        		<div class="rollWrap pd-t0 bg_col05" id="main-community-list">
          			<div class="rollCommunity" style="display: none;">
            			<div class="roll_row02">
              				<img src="${ctx }/resources/m2020/images/main/noimg.png" class="communityImg" alt="지역현안 소통지도 게시글 이미지"/> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
              				<div class="communityImg"></div>
              				<h5>반송중 1학년 10반</h5>
              				<h6><span><img src="${ctx }/resources/m2020/images/main/write.png" alt="작성자 아이디"/></span>wngml1223</h6>
             				<h6><span><img src="${ctx }/resources/m2020/images/main/write_date.png" alt="작성일"/></span>2020.05.04</h6>
           				</div>
        			</div>
          			<div class="rollCommunity" style="display: none;">
            			<div class="roll_row02">
              				<img src="${ctx }/resources/m2020/images/main/thumbnail.png" alt="지역현안 소통지도 게시글 이미지"/> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
              				<h5>반송중 1학년 10반</h5>
              				<h6><span><img src="${ctx }/resources/m2020/images/main/write.png" alt="작성자 아이디"/></span>wngml1223</h6>
              				<h6><span><img src="${ctx }/resources/m2020/images/main/write_date.png" alt="작성일" /></span>2020.05.04</h6>
            			</div>
          			</div>
		   		</div>
      		</div>
      		<!-- 지역현안 소통지도 END -->
      		<div class="mt15"></div> 
	    </div>
  	</div>
  	<!-- 메인화면 하단 영역 START -->
	<div class="footer">
    	<div class="mt30"></div>
    	<button type="button" class="pcBtn" name="button" onclick="javascript:movePcMode();srvLogWrite('O0', '02', '13', '01', '', '');">PC버전 가기</button>
    	<div class="mt30"></div>
    	<p class="copyright">ⓒStatistics Korea. All rights reserved.</p>
  	</div>
  	<!-- 메인화면 하단 영역 END -->
</body>
</html>