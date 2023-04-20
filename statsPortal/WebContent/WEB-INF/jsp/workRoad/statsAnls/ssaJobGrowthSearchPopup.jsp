<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 일자리 통계분석 > 일자리 증감 > 주요지표 > 조회 조건 팝업
* File Name		: statsAnls > ssaJobGrowthSearchPopup.jsp
* Comment		: 
* History		: 2020-05-14	곽제욱	최초 작성
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<style>
#ssaJobGrowthSearchPopup .indicator-stepBox2 {border: #21b69a solid 2px; border-radius: 4px; margin: 10px; padding: 0px;}
#ssaJobGrowthSearchPopup .indicator-stepBox2:before { top: 73px; content:''; display:block;background:url(/images/workRoad/icon_box_arrow2.png) no-repeat left top;position: absolute;height: 9px;width: 17px;}

#E3224_condition_C2:before{left: 40px;} /* 피보험자증감 성별 */
</style>

<script src="${pageContext.request.contextPath}/js/workRoad/statsAnls/ssaJobGrowthSearchPopup.js"></script>

<div class="workRoad" id="ssaJobGrowthSearchPopup" style="display: none;">
	<div class="popBox wrmDraggable" style="width: 530px;">
		<div class="topbar wrmHeader">
			<span id="ssaJobGrowthSearchTitle">조회 조건</span>
			<a href="javascript:void(0)">닫기</a>
		</div>	
		<div class="cont-box wrmScrollable">
			<div class="indicator-stepBox" id="E3224_condition_C1" style="display:none; margin-bottom: 0px;">
				<p>분류</p>
				<ul style="padding-bottom: 0px;">
					<li><input type="radio" id="gender_E3224" name="unemployment_rate" value="E3224" checked="checked"/><label for="gender_E3224" class="on">성별</label> </li>
				</ul>
			</div>
			<div class="indicator-stepBox indicator-stepBox2" id="E3224_condition_C2" style="display:none; margin-top: 0px;">
				<ul>
					<li><input type="radio" id="gd_E3224" name="E3224_gender_C2" value="0" checked="checked"><label for="gd_E3224" class="on">전체</label> </li>
					<li><input type="radio" id="man_E3224" name="E3224_gender_C2" value="1"><label for="man_E3224" class="">남자</label> </li>
					<li><input type="radio" id="woman_E3224" name="E3224_gender_C2" value="2"><label for="woman_E3224" class="">여자</label> </li>
				</ul>
				<!-- </div>-->
			</div>
			<div class="indicator-stepBox" id="ssaJobGrowth_map_type" style="display:none">
				<p>표출방법</p>
				<ul>
					<li><input type="radio" id="ssaJS_color_map" name="condition_map_type" value="color" checked="checked"><label for="ssaJS_color_map" class="on">색상지도</label> </li>
					<li><input type="radio" id="ssaJS_bubble_map" name="condition_map_type" value="bubble"><label for="ssaJS_bubble_map" class="">버블지도</label> </li>
					<li><input type="radio" id="ssaJS_heat_map" name="condition_map_type" value="heat"><label for="ssaJS_heat_map" class="">열지도</label> </li>
				</ul>
			</div>
		</div>
		<div class="popup-btn-area">
			<a href="javascript:$ssaJobGrowthSearchPopup.ui.addSearchBtn();" class="default-color" id="buttonMakeBtn" data-subj="검색버튼 팁" title="현재 선택된 통계지표 목록에 해당하는 통계조건으로 조회">통계보기</a>	<!-- data-subj="조건결합설정 팁" title="현재 선택된 통계지표 목록에 해당하는 통계조건을 통계버튼으로 생성하여 통계값을 조회 할 수 있어요" -->
		</div>
	</div>
</div>
<div>
	<input id= "E3224_over" type="text" name="text" readonly value="피보험자증감mouseover">
</div>