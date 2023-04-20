<%
/**************************************************************************************************************************
* Program Name	: My통계로 팝업
* File Name		: statsMePopup.jsp
* Comment		: 
* History		: 
*	2019.08.08	김남민	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 페이지 JS -->
<script src="/js/statsMe/statsMePopup.js"></script>

<!-- 페이지 HTML -->
<!-- 로딩2 팝업 start -->
<!-- 2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 -->
<div id="statsMePopupLoading2_back" style="display: none; background-color: rgb(211, 211, 211); border: 0px solid black; position: fixed; left: 0px; top: 0px; height: 100%; width: 100%; z-index: 2000; opacity: 0.6;"></div>
<div id="statsMePopupLoading2" class="alert_box" style="display: none; z-index: 2001;">
	<div class="alert_header"><span id="statsMePopupLoading2_title">로딩</span><!-- <a id="statsMePopupLoading2_close" href="javascript:void(0);"><span>닫기</span></a> --></div>
	<!-- 2020-02-12 [김남민] SNS 서비스 링크시 화면 크기 조절 (스크롤 추가) word-break: keep-all 추가 -->
	<div id="statsMePopupLoading2_message" class="alert_content" style="word-break: keep-all;">로딩 중입니다.</div>
	<div style="position: absolute; height: 10px; line-height: 50px; padding-bottom: 40px; width: 400px; top: calc(50% + 10px); left: calc(50% - 30px); z-index: 11000;"><img src="/img/common/loding_type01.gif" alt="로딩"></div>
</div>
<!-- 로딩2 팝업 end -->

<!-- 알림 팝업 start -->
<div id="statsMePopupAlert" class="alert_box" style="display: none;">
	<div class="alert_header"><span id="statsMePopupAlert_title">알림</span><a id="statsMePopupAlert_close" href="javascript:void(0);"><span>닫기</span></a></div>
	<!-- 2020-02-12 [김남민] SNS 서비스 링크시 화면 크기 조절 (스크롤 추가) word-break: keep-all 추가 -->
	<div id="statsMePopupAlert_message" class="alert_content" style="word-break: keep-all;">알립팝업 입니다.</div>
	<div class="alert_btnbox"><a id="statsMePopupAlert_ok" href="javascript:void(0);" class="abtn_type1"><span>확 인</span></a></div>
</div>
<!-- 알림 팝업 end -->

<!-- 확인 팝업 start -->
<div id="statsMePopupConfirm" class="alert_box" style="display: none;">
	<div class="alert_header"><span id="statsMePopupConfirm_title">확인</span><a id="statsMePopupConfirm_close" href="javascript:void(0);"><span>닫기</span></a></div>
	<!-- 2020-02-12 [김남민] SNS 서비스 링크시 화면 크기 조절 (스크롤 추가) word-break: keep-all 추가 -->
	<div id="statsMePopupConfirm_message" class="alert_content" style="word-break: keep-all; text-align: left; line-height: 23px; padding: 20px 15px 20px 22px;"></div>
	<div class="alert_btnbox">
		<a id="statsMePopupConfirm_ok" href="javascript:void(0);" class="abtn_type1"><span>확 인</span></a>
		<a id="statsMePopupConfirm_cancel" href="javascript:void(0);" class="abtn_type1"><span>취 소</span></a>
	</div>
</div>
<!-- 확인 팝업 end -->

<!-- 확인 팝업2 (지도,상세보기에서 카탈로그 이전으로 넘어갈경우 보여주는 팝업 전용) start -->
<div id="statsMePopupConfirm2" class="alert_box" style="display: none;">
	<div class="alert_header"><span id="statsMePopupConfirm2_title">확인</span><a id="statsMePopupConfirm2_close" href="javascript:void(0);"><span>닫기</span></a></div>
	<div id="statsMePopupConfirm2_message" class="alert_content" style="text-align: left; line-height: 23px; padding: 20px 15px 20px 22px;"></div>
	<div class="alert_content" style="padding: 0px; min-height: 30px;">
		<div class="list_check" style="position: static; text-align: left; padding: 0px 50px; font-size: 13px;">
			<input type="checkbox" id="statsMePopupConfirm2_check">
			<label for="statsMePopupConfirm2_check" style="margin-right: 5px; margin-left:20px; float: left; height: 14px; width: 14px;"></label>
			<span style="position: absolute; top: 153px;">해당 안내 다시 보지 않음</span>
		</div>
	</div>
	<div class="alert_btnbox" style="height: 30px;">
		<a id="statsMePopupConfirm2_ok" href="javascript:void(0);" class="abtn_type1" style="padding: 8px 15px;"><span>확 인</span></a>
		<a id="statsMePopupConfirm2_cancel" href="javascript:void(0);" class="abtn_type1" style="padding: 8px 15px;"><span>취 소</span></a>
	</div>
</div>
<!-- 확인 팝업2 (지도,상세보기에서 카탈로그 이전으로 넘어갈경우 보여주는 팝업 전용) end -->

<!-- 지역선택 팝업 start -->
<div id="statsMePopupArea" class="alert_box" style="min-height: 170px; width: 400px; display: none; z-index: 900;">
	<div class="alert_header" style="border: none; padding-top: 17px; border-bottom: 1px solid #ddd;">
		<span id="statsMePopupArea_title" style="font-size: 16px;">관심지역변경</span><!-- <a id="statsMePopupArea_close" href="javascript:void(0);"><span>닫기</span></a> --></div>
	<div id="statsMePopupArea_message" class="alert_content" style="min-height: 0px; padding-top: 40px;">
		<div class="select_wrap">
			<select id="statsMePopupArea_sido" style="width: 100%; float: left; border: none; font-size: 0.95em" title="시도 선택">
				<option value="99" data-coor-x="990480.875" data-coor-y="1815839.375">전국</option>
			</select>
		</div>
		<div class="select_wrap" style="margin-left: 10px;">
			<select id="statsMePopupArea_sgg" style="width: 100%; float: left; border: none; font-size: 0.95em" title="시군구 선택">
				<option value="999" data-coor-x="990480.875" data-coor-y="1815839.375">전체</option>
			</select>
		</div>
		<div class="select_wrap" style="margin-left: 10px;">
			<select id="statsMePopupArea_emdong" style="width: 100%; float: left; border: none; font-size: 0.95em" title="읍면동 선택">
				<option value="99" data-coor-x="990480.875" data-coor-y="1815839.375">전체</option>
			</select>
		</div>
	</div>
	<div class="alert_conformbtnbox" style="padding-top: 33px; height: 30px;">
		<a id="statsMePopupArea_ok" href="javascript:void(0);" class="abtn_type2"><span>확 인</span></a>
		<a id="statsMePopupArea_close" href="javascript:void(0);" class="abtn_type2"><span>취 소</span></a>
	</div>
</div>
<!-- 지역선택 팝업 end -->