<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<div id="search-item-box" style="background-color: #fff; position: fixed; top: 100px; width: 100%; height: calc(100vh - 100px); z-index: 490; overflow: hidden; box-sizing:border-box; padding:10px; border-top:3px solid #112B48; ">
	<div class="houseWrap" style="background-color: #fff;">
		<h1 class="houseWrap_tit">지표설정</h1>
		<div class="lifestyle" id="lifeStyle">
			<h2 class="liftstyle_txt">라이프스타일 별 지표설정 </h2>
			<span id="selectLifeStyle"></span> 	<!-- 선택한 라이프스타일 명칭 셋팅 -->
		</div>
		<p class="housecaption">*최대 9개까지 선택할 수 있습니다.</p>
		
		<!-- 지표 설정 START -->
		<div class="nav_h_type lifeMenuWrap" id="houseMap_list">
			<ul id="housetab">
				<li style="width: 15px;"></li>
				<%@include file="/WEB-INF/jsp/m2020/map/house/getSubMenuElement.jsp" %>
			</ul>
		</div>
		<!-- 지표 설정 END -->
		
		<!-- 상세 지표 설정 -->
		<%@include file="/WEB-INF/jsp/m2020/map/house/getClassElement.jsp" %>
	</div>
	
	<!-- 추천지역찾기 버튼 START -->
	<div class="sfbFooter3"> 
		<button id="houseSearch" class="btn_search2" type="button" style="width: 100px;" onclick="$recomendHouseMap.ui.recommend.search();">추천지역찾기</button>
	</div>
	<!-- 추천지역찾기 버튼 END -->
</div>
<!-- 라이프스타일별 지표 설정 START -->
<div id="lifeStyle-box" style="position: fixed; z-index:500; left: 0; top: 100px; background-color: #ffffff;  box-sizing:border-box; padding:10px; height: calc(100vh - 40px); border-top:3px solid #112B48; width: 100%; overflow: auto; z-index: 1000; display: none;">
	<div class="viewWrap"> 
		<div class="viewTitle" style="justify-content: space-between; align-items:center; padding: 0;">
			<span>라이프스타일 선택</span>	<!-- 2020.09.10[한광희] 이전버튼 추가로 인한 타이틀 수정 -->
			<button id="lifestyleSelect_close" name="prevPage" class="" type="button"  onclick="">
				<img src="/mobile/resources/m2020/images/common/pop_close.png" alt="닫기" />
			</button>
			<!-- 2020.09.02[한광희] 라이프스타일 닫기 버튼 수정 START -->
			<!-- <button id="lifestyleSelect_close" onclick="$('#lifeStyle-box').hide();" class="btn_coloseSfb" type="button"></button> -->
			<!-- <button id="lifestyleSelect_close" class="btn_coloseSfb" type="button"></button> -->	<!-- 2020.09.10[한광희] 이전버튼 추가로 인한 주석처리 -->
			<!-- 2020.09.02[한광희] 라이프스타일 닫기 버튼 수정 END -->
		</div>
		<div class="viewContentWrap" style="height: calc(100% + 50px);">
			<div class="viewContentWrap" id="lifeStyleList" style="height: calc(100% + 50px);">
				<c:forEach var="lifeStyleList" items="${lifeStyle }">
					<c:set var="items">
						<c:forEach var="children" items="${lifeStyleList.children }" varStatus="status">
							{"m_class_idx_id":"${children.m_class_idx_id }"
							,"b_class_idx_id":"${children.b_class_idx_id }"
							,"default_value":"${children.default_value }"
							,"wghtval":"${children.wghtval }"
							,"m_class_idx_nm":"${children.m_class_idx_nm }"
							,"order_base_disp":"${children.order_base_disp }"
							,"serial":"${children.serial }"
							,"order_base":"${children.order_base }"
							}
							<c:if test="${!status.last }">,</c:if>
						</c:forEach>
					</c:set>					
					<div class="ageStepcard" data-items='[${items }]'>
						<ul class="ageList">  
							<li class="agetit">
								<img src="${ctx }/resources/m2020/images/sub/house/liftstyle_${lifeStyleList.serial }.png" class="ageList_img">
								<p>${lifeStyleList.nm }</p>
							</li>
						</ul>
					</div>
				</c:forEach>
			</div>
		</div>
		<div class="sfbFooter"> 
			<!-- 2020.09.10[한광희] 이전버튼 추가 수정 START -->
			
			<button id="lifestyleSelect_ok" class="btn_search" type="button" style="width: 50%;">선택완료</button>
			<!-- 2020.09.10[한광희] 이전버튼 추가 수정 END -->
		</div>
	</div>
</div>
<!-- 라이프스타일별 지표 설정 END -->