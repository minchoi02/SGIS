<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<div id="change-business-databoard" class="houseSelectDiv2" style="display:none;">
	<div class="datatit">
		<h2>업종밀집도변화 - <span id="title">한식</span></h2>
		<button class="" type="button"onclick="$('#change-business-databoard').hide();">
			<svg width="15" height="15" viewBox="0 0 15 15" fill="#000" xmlns="http://www.w3.org/2000/svg">
				<path d="M1 1L13 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
				<path d="M13 1L1 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
			</svg>
		</button>
	</div>
	<div class="databoardSubArea">
		<p>업종밀집도 변화</p>
		<h1 id="data-lacation">서울특별시 금천구</h1>
	</div>
	<div class="sub_Wrap" style="position: relative;"> 
		<div class="conWrap mt10">
			<p class="subtit" id="change-business-chartCategoryTitle">강남구</p>
			<p class="num" id="change-business-chartDataTitle">3,710<span>개</span></p>
			<div style="width: 100%; text-align: center;">
				<!-- 데이터보드 화면(차트) 시작-->
				<div id="change-business-chart-area"></div>
			</div>
			<!-- 2020.09.09[신예리] 이전 버튼 추가 START -->
			<!-- <div class="mapBtnWrap">
				<a onclick="$('#change-business-databoard').hide();">지도보기</a>
			</div> -->
			
		</div>  
	</div>
</div>