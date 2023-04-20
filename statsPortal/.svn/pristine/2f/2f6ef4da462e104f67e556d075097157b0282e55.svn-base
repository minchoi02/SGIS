<%
/**************************************************************************************************************************
* Program Name	: My통계로 (관심분야)
* File Name		: statsMeInterestRealm.jsp
* Comment		: 
* History		: 
*	2019.08.08	김남민	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 페이지 JS -->
<script src="${pageContext.request.contextPath}/js/statsMe/statsMeInterestRealm.js"></script>

<!-- 페이지 HTML -->
<div class="content_box" style="height: calc(100% - 20px);">
	<!-- mng_s 2020.08.28 이금은 ::: '슬기로운 'My통계로' 사용법 1,2,3회 link 추가 -->
	<div  style="text-align:right;">
		<div  class="btn">
			<img src="/images/statsMe/banner01.png" style="width:125.4px; height:25.8px;"><br/> 
			<button onClick="javascript:Pop('/html/info_01/01.html')" class="btn01">1회</button>
			<button onClick="javascript:Pop('/html/info_01/02.html')" class="btn01">2회</button> 
			<button onClick="javascript:Pop('/html/info_01/03.html')" class="btn01">3회</button>
		</div>
	</div>
	<!-- mng_e 2020.08.28 이금은 ::: '슬기로운 'My통계로' 사용법 1,2,3회 link 추가 -->
	<div class="content_description" style="margin:85px 0px 30px 0px;">
		<!-- 2019.11.29[한광희] 웹접근성에 따른 h 태크 추가 START -->
		<!-- <div class="content_title"><h1>통계의 거리</h1></div> -->
		<!-- 2020-02-17 [김남민] 생애주기, 관심분야, 카탈로그 화면의 ‘통계정보＇용어를 ‘공간통계정보＇로 수정 -->
		<h6><strong>관심분야</strong>에 따른 공간통계정보를<br>추천해 드립니다.</h6>
		<!-- <div class="content_title">통계의 거리</div>
		<strong>거리선택</strong>에 따른 공간통계정보를<br>추천해 드립니다. -->
		<!-- 2019.11.29[한광희] 웹접근성에 따른 h 태크 추가 END -->
	</div>
	<!-- <div class="content_sub_desc"><img src="/images/statsMe/i_03.png" align="middle"> 두가지 통계의 거리를 선택하실 수 있습니다.</div> -->
	<div class="select_wrap">
		<div class="btn_next"><a href="javascript:void(0);" id="statsMeInterestRealmPageNext" tabindex="20" class="tabindex"><span>선택완료</span></a></div>
		<div class="btn_prev tabindex"><a href="javascript:void(0);" id="statsMeInterestRealmPagePrev" tabindex="19" class="tabindex"><span>이전</span></a></div>
		<div class="select_box step2">
			<div class="itme_low">
				<div class="item_box1" id="DSTNC_FD" onclick="javascript:$statsMeInterestRealm.ui.InterestRealmClick('DSTNC_FD', '먹거리');">
					<a href="javascript:void(0);" class="item21 tabindex" tabindex="10"><span class="line">한식,중식,카페등 정보</span></a><p>먹거리</p>
				</div>
				<div class="item_box" id="DSTNC_HOUSE" onclick="javascript:$statsMeInterestRealm.ui.InterestRealmClick('DSTNC_HOUSE', '살거리');">
					<a href="javascript:void(0);" class="item22 tabindex" tabindex="11"><span style="width:90px;">아파트,<br/>자가주택현황<br/>등 정보</span></a><p>살거리</p>
				</div>
				<div class="item_box" id="DSTNC_JOB" onclick="javascript:$statsMeInterestRealm.ui.InterestRealmClick('DSTNC_JOB', '일거리');">
					<a href="javascript:void(0);" class="item23 tabindex" tabindex="12"><span style="width:100px;">제조업,<br/>축산업, 농림업<br/>등 정보</span></a><p>일거리</p>
				</div>
				<div class="item_box" id="DSTNC_TRNSPORT" onclick="javascript:$statsMeInterestRealm.ui.InterestRealmClick('DSTNC_TRNSPORT', '탈거리');">
					<a href="javascript:void(0);" class="item24 tabindex" tabindex="13"><span style="width:110px; letter-spacing:-1px;">운송,<br/>운송서비스, 주차<br/>등 정보</span></a><p>탈거리</p>
				</div>
			</div>
			<div class="itme_low">
				<div class="item_box" id="DSTNC_EDU" onclick="javascript:$statsMeInterestRealm.ui.InterestRealmClick('DSTNC_EDU', '배울거리');">
					<a href="javascript:void(0);" class="item25 tabindex" tabindex="14"><span style="width:100px; letter-spacing:-1px;">교육기관,<br/>1인당 교직원수<br/>등 정보</span></a><p>배울거리</p>
				</div>
				<div class="item_box" id="DSTNC_PLY" onclick="javascript:$statsMeInterestRealm.ui.InterestRealmClick('DSTNC_PLY', '보고 놀거리');">
					<a href="javascript:void(0);" class="item26 tabindex" tabindex="15"><span style="width:80px;">극장, 공연,<br/>박물관<br/>등 정보</span></a><p>보고 놀거리</p>
				</div>
				<div class="item_box" id="DSTNC_HEALTH" onclick="javascript:$statsMeInterestRealm.ui.InterestRealmClick('DSTNC_HEALTH', '건강거리');">
					<a href="javascript:void(0);" class="item27 tabindex" tabindex="16"><span style="width:110px; letter-spacing:-2px;">병의원,<br/>노인, 문화시설 수<br/>등 정보</span></a><p>건강거리</p>
				</div>	
				<div class="item_box" id="DSTNC_SAFE" onclick="javascript:$statsMeInterestRealm.ui.InterestRealmClick('DSTNC_SAFE', '안전거리');">
					<a href="javascript:void(0);" class="item28 tabindex" tabindex="17"><span style="width:110px; letter-spacing:-2px;">소방서, 경찰,<br/>응급의료시설<br/>등 정보</span></a><p>안전거리</p>
				</div>
			</div>
			<!-- 2020-02-17 [김남민] 박스 안 맨트 수정 및 불필요 기능 제거. -->
			<div style="text-align: right; margin-right: 40px; margin-top: 25px;">※ 관심분야는 최대 2개까지 선택 가능함</div>				
		</div>
	</div>
	<!-- 2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 -->
	<div class="position_info" style="margin-bottom: 150px;">
		<div class="current_position"><a href="javascript:void(0);" onclick="javascript:$statsMePopup.ui.area();"><img src="/images/statsMe/i_pin.png" alt="관심지역" style="margin-right: 3px; vertical-align:bottom;">현재 관심지역 : <strong id="nowConectArea2">대전광역시 서구 둔산동</strong></a></div>
		<div class="change_position"><a href="javascript:void(0);" onclick="javascript:$statsMePopup.ui.area();" tabindex="18" class="tabindex">관심지역 변경하기</a></div>
	</div>
	<!-- 2020-02-17 [김남민] 박스 안 맨트 수정 및 불필요 기능 제거. START -->
	<!-- <div class="global_nav_float">
		<ul>
			2020-01-31 [김남민] 통계Me => My통계로 명칭 변경.
			<li class="current"><a href="javascript:logWriteAndMove('A0', '02', '', '', '', '', '/view/statsMe/statsMeMain', false);">My통계로</a></li>
			<li><a href="javascript:logWriteAndMove('A0', '02', '08', '00', '', '', '/view/index', false);">SGIS</a></li>
		</ul>
	</div> -->
	<!-- 2020-02-17 [김남민] 박스 안 맨트 수정 및 불필요 기능 제거. END -->
</div>