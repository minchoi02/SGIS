<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<div id="ideal-type-step2" class="tab-content" style="padding: 0 0 200px 0; display: none; height: calc(100vh - 180px);-webkit-overflow-scrolling:touch;">
	<div id="ideal-type-search-item-list" class="steptab" style="margin-bottom: 50px;">
		<div class="tab2_info">
			<p>조회할 수 있는 조건은 최대 6개까지 입니다.</p> 
		</div>
		<div class="tab-conRow mt10">
			<h2 class="tab2_tit">이런<span class="tab2_span0"> 시설</span>이 필요해요!</h2>
		</div>
		<ul class="tab2-list" id="facilities-list"></ul>
		<div class="tab-conRow mt10">
			<h2 class="tab2_tit">이런<span class="tab2_span1"> 이웃</span>이 있었으면 좋겠어요!</h2>
		</div>
		<ul class="tab2-list" id="neighbor-list"></ul>
		<div class="tab-conRow mt10">
			<h2 class="tab2_tit">이런<span class="tab2_span2"> 지역현황</span>을 선호해요!</h2>
		</div>
		<ul class="tab2-list" id="situation-list"></ul>	
	</div>
	<div class="sfbFooter3">
		<button id="step2_prevPage" name="prevPage" class="btn_search00" type="button" style="width: 100px; height:35px;" onclick="">이전</button>
		<button id="step2_nextPage" name="nextPage" class="btn_search" type="button" style="width: 100px; height:35px;" onclick="">다음</button>
	</div>
</div>