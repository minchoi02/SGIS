	<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<div id="search-item-box" class="Open_Type1">
	<h3 id="search-item-box-area">추천지역찾기</h3>
	<button class="BtnClose" onclick="$('#search-item-box').hide();">상세검색닫기</button>
	<div class="Subject SubjectB" style="height:0px;">
		<nav><a href="#" class="subject2 M_on" id="subjectMenu2">추천지역찾기</a><a href="#" class="subject1" id="subjectMenu1">주거현황보기</a><a href="#" id="subjectMenu3">간편동네찾기</a></nav>
	</div>
	<div id="search-box" class="DetailBox">
		<div class="Detail2_1">
			<h4>기준지역</h4>
			<p id="stand-recommend-location">
				<span class="SelectBox">
					<select id="stand-recommend-sido"></select>
				</span>
				<span class="SelectBox">
					<select id="stand-recommend-sgg"></select>
				</span>
			</p>
			<h4>관심지역</h4>
			<p id="inter-recommend-location">
				<span class="SelectBox">
					<select id="inter-recommend-sido"></select>
				</span>
				<span class="SelectBox">
					<select id="inter-recommend-sgg"></select>
				</span>
			</p>
			<hr/>
			<h4>지표설정 <button type="button" id="lifeStyle">라이프스타일 별 지표 설정</button></h4>
			<ul id="recommend-box" class="IndexSelect recommend">
				<c:set var="recommend" value="true"/>
				<%@include file="/WEB-INF/jsp/map/house/getClassElement.jsp" %>
			</ul>
			<div class="btn_wrap"><button type="button" class="btn_base" onclick="$house.search.recommend.search();">조회</button></div>
		</div>
		<div class="Detail2_1" style="display:none;">
			<h4>지역 선택  &nbsp;&nbsp;<label><input id="look-select-location" type="checkbox" checked="checked">선택</label></h4>
			<p id="look-abode-location">
				<span class="SelectBox">
					<select id="look-abode-sido">
					</select>
				</span>
				<span class="SelectBox">
					<select id="look-abode-sgg">
					</select>
				</span>
			</p>
			<h4>지표 선택 &nbsp;&nbsp;<label><input id="look-select-type" type="checkbox" checked="checked">선택</label></h4>
			<ul id="look-abode-box" class="IndexSelect">
				<c:set var="recommend" value="false"/>
				<%@include file="/WEB-INF/jsp/map/house/getClassElement.jsp" %>
			</ul>
			
			<div class="btn_wrap"><button type="button" class="btn_base" onclick="$house.search.abode.search();">조회</button></div>
		</div>
		<div class="Detail2_1" style="display:none;">
			<div id="ideal-type-step" class="LikeTown">
				<div id="idealtype-navigator" class="StepTitle">
					<a href="#" class="M_on"><b>Step1</b><span>관심사/부가정보 입력</span></a>
					<a href="#"><b>Step2</b><span>관심항목 선택</span></a>
					<a href="#"><b>Step3</b><span>우선순위 설정</span></a>
				</div>
				<%@include file="/WEB-INF/jsp/map/house/idealType/step1.jsp" %>
				<%@include file="/WEB-INF/jsp/map/house/idealType/step2.jsp" %>
				<%@include file="/WEB-INF/jsp/map/house/idealType/step3.jsp" %>
			</div>
		</div>
	</div>
	
	
</div>
<div id="lifeStyle-box" class="InfoBox" style="display:none;">
	<div class="InfoText">
		<div class="Description">
			<ul id="LifeStyleSelect" class="LifeStyleGuide close">
				<c:forEach var="lifeStyleList" items="${lifeStyle }">
					<li>
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
						<a href='#' data-items='[${items }]'>
						<!-- 
							<img src="${sgisCtx}/img/house/life_icon_${lifeStyleList.serial }.png"/>
						 -->
							<img src="${ctx }/resources/images/house/life_icon_${lifeStyleList.serial }.png" alt="라이프스타일이미지"/>
							<span>${lifeStyleList.nm }</span>
						</a>
					</li>
				</c:forEach>
			</ul>
		</div>
	</div>
	<div class="InfoBg" onclick="$('#lifeStyle-box').hide();">&nbsp;</div>
	<button class="btn_close" type="button" onclick="$('#lifeStyle-box').hide();">도움말닫기</button>
</div>