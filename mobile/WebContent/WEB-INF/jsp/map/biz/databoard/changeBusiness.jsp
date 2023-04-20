<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<div id="change-business-databoard" class="Open_Type1" style="display:none;">
	<h3 id="change-business-databoard-title-area">데이터보드</h3>
	<button class="BtnClose" onclick="$('.Open_Type1').hide();">데이터보드닫기</button>
	<div class="title-area">
		<div class="title-info">
			<div>업종밀집도 변화</div>
			<div class="data-location title-location"></div>
		</div>
	</div>
	<div class="DetailBox" style="padding:0;">
		<div class="Subject SubjectC number4" style="display:none;">
			<nav><a class="M_on">음식점</a><a>도소매</a><a>서비스</a><a>숙박업</a></nav>
		</div>
		<%@include file="/WEB-INF/jsp/map/biz/databoard/companyTab.jsp" %>
		<div class="chart-area"></div>
	</div>
</div>