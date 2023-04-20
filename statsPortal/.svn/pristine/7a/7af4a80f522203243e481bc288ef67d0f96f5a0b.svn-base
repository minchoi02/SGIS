<%
/**************************************************************************************************************************
* Program Name	: My통계로 (생애주기)
* File Name		: statsMeLifeCycle.jsp
* Comment		: 
* History		: 
*	2019.08.08	김남민	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 페이지 JS -->
<script src="${pageContext.request.contextPath}/js/statsMe/statsMeLifeCycle.js"></script>

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
	
	<!--<div class="content_title">통계의 거리</div> -->
	<div class="content_description" style="margin:85px 0px 30px 0px;">
		<!-- 2019.11.29[한광희] 웹접근성에 따른 h 태크 추가 START -->
		<!-- <div class="content_title"><h1>생애주기</h1></div> -->
		<!-- 2020-02-17 [김남민] 생애주기, 관심분야, 카탈로그 화면의 ‘통계정보＇용어를 ‘공간통계정보＇로 수정 -->
		<h6><strong>생애주기</strong>에 따른 공간통계정보를<br>추천해 드립니다.</h6>
		<!-- <div class="content_title">생애주기</div>
		<strong>생애주기</strong>에 따른 공간통계정보를<br>추천해 드립니다. -->
		<!-- 2019.11.29[한광희] 웹접근성에 따른 h 태크 추가 END -->
	</div>
	<!-- <div class="content_sub_desc"><img src="/images/statsMe/i_03.png" align="middle"> 두개의 연령대를 선택하실 수 있습니다.</div> -->
	<div class="select_wrap">
		<div class="btn_next"><a href="javascript:void(0);" id="statsMeLifeCyclePageNext" tabindex="9" class="tabindex"><span>선택완료</span></a></div>
		<!-- <div class="btn_prev"><a href="javascript:void(0);" id="statsMeLifeCyclePagePrev"><span>이전</span></a></div> -->
		<div class="select_box step1">
			<div class="itme_low">
				<div class="item_box" id="LFECYCLE_INFANT_CHILD" onclick="javascript:$statsMeLifeCycle.ui.LifeCycleClick('LFECYCLE_INFANT_CHILD', '영유아/어린이');">
					<a href="javascript:void(0);" class="item11 tabindex" tabindex="1"><span>13세미만 관련정보</span></a><p>영유아/어린이</p>
				</div>
				<div class="item_box" id="LFECYCLE_YNGBGS" onclick="javascript:$statsMeLifeCycle.ui.LifeCycleClick('LFECYCLE_YNGBGS', '청소년');">
					<a href="javascript:void(0);" class="item12 tabindex" tabindex="2"><span>13~18세 관련정보</span></a><p>청소년</p>
				</div>
				<!-- 2020.08.19[한광희] My통계로 청년/장년 기준나이 및 명칭 변경으로 인한 수정 START -->
				<div class="item_box" id="LFECYCLE_YGMN" onclick="javascript:$statsMeLifeCycle.ui.LifeCycleClick('LFECYCLE_YGMN', '청년');">
					<a href="javascript:void(0);" class="item13 tabindex" tabindex="3"><span>19~34세 관련정보</span></a><p>청년</p>
				</div>
				<div class="item_box" id="LFECYCLE_ADULT" onclick="javascript:$statsMeLifeCycle.ui.LifeCycleClick('LFECYCLE_ADULT', '중장년');">
					<a href="javascript:void(0);" class="item14 tabindex" tabindex="4"><span>35~64세 관련정보</span></a><p>중장년</p>
				</div>
				<!-- 2020.08.19[한광희] My통계로 청년/장년 기준나이 및 명칭 변경으로 인한 수정 END -->
			</div>
			<div class="itme_low">
				<div class="item_box" style="margin-left:12%;" id="LFECYCLE_ODSN" onclick="javascript:$statsMeLifeCycle.ui.LifeCycleClick('LFECYCLE_ODSN', '노년');">
					<a href="javascript:void(0);" class="item15 tabindex" tabindex="5"><span>65세 이상 관련정보</span></a><p>노년</p>
				</div>
				<div class="item_box1" id="LFECYCLE_PREGNAN_CHLDBRTH_CHLDCR_FEMALE" onclick="javascript:$statsMeLifeCycle.ui.LifeCycleClick('LFECYCLE_PREGNAN_CHLDBRTH_CHLDCR_FEMALE', '임신/출산/육아여성');">
					<a href="javascript:void(0);" class="item16 tabindex" tabindex="6"><span class="line3">임신/출산 육아여성<br/>관련정보</span></a><p>임신/출산/육아여성</p>
				</div>
				<div class="item_box" id="LFECYCLE_PSN_1_FAMILY" onclick="javascript:$statsMeLifeCycle.ui.LifeCycleClick('LFECYCLE_PSN_1_FAMILY', '1인가구');">
					<a href="javascript:void(0);" class="item17 tabindex" tabindex="7"><span style="width:70px;">1인가구 관련정보</span></a><p>1인가구</p>
				</div>	
			</div>
			<div style="text-align: right; margin-right: 40px; margin-top: 25px;">※ 생애주기는 최대 2개까지 선택 가능함</div>			
		</div>
	</div>
	<!-- 2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 -->
	<div class="position_info" style="margin-bottom: 150px;">
		<div class="current_position"><a href="javascript:void(0);" onclick="javascript:$statsMePopup.ui.area();"><img src="/images/statsMe/i_pin.png" alt="관심지역" style="margin-right: 3px; vertical-align:bottom;">현재 관심지역 : <strong id="nowConectArea">대전광역시 서구 둔산동</strong></a></div>
		<div class="change_position"><a href="javascript:void(0);" onclick="javascript:$statsMePopup.ui.area();" tabindex="8" class="tabindex">관심지역 변경하기</a></div>
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