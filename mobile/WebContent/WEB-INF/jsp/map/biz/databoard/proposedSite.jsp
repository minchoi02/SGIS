<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<div id="proposed-site-databoard" class="Open_Type1" style="display:none;">
	<h3>데이터보드</h3>
	<button class="BtnClose" onclick="$('.Open_Type1').hide();">데이터보드닫기</button>
	<div class="title-area">
		<div class="title-info">
			<div>후보지역 특성정보</div>
		</div>
	</div>
	<div class="DetailBox" style="padding:0;">
		<div class="Subject SubjectC number2">
			<nav><a class="M_on">지역 특성정보 보기</a><a>지역 종합현황정보 보기</a></nav>
		</div>
		<div class="chart-box">
			<div class="chart-area"></div>
		</div>
		<div class="chart-box" style="display:none;">
			<ul class="areaInfoTab">
				<li><a href="#">총사업체<span></span></a></li>
				<li><a href="#">총인구<span></span></a></li>
				<li><a href="#">총가구<span></span></a></li>
				<li><a href="#">총주택<span></span></a></li> 
			</ul>
			<div id="total-company" class="tab-box" style="display:none;">
				<div id="total-company-sub-tab" class="dbTabs type03 sub-tab">
					<a href="#" class="on">소상공인 업종별 사업체 비율</a>
					<a href="#">소상공인 업종별 증감</a>
					<a href="#">주요시설물 현황</a>
				</div>
				<div class="dbTabs bizCateMenu">
					<a href="#" class="on" data-theme-index="50">음식점</a>
					<a href="#" data-theme-index="20">도소매</a>
					<a href="#" data-theme-index="10">서비스</a>
					<a href="#" data-theme-index="40">숙박업</a>
				</div>
				<%@include file="/WEB-INF/jsp/map/biz/databoard/companyTab.jsp" %>
				<div class="chart-area"></div>
			</div>
			<div id="total-population" class="tab-box" style="display:none;">
				<div class="dbTabs type02 chart-tab sub-tab">
					<a href="#" class="on">연령별 인구비율(%)</a>
					<a href="#">성별 인구비율</a>
				</div>
				<div class="chart-area"></div>
			</div>
			<div id="total-household" class="tab-box" style="display:none;">
				<div class="dbTabs type02 chart-tab sub-tab">
					<a href="#" class="on">점유형태별 가구비율(%)</a>
					<a href="#">거처유형별 가구비율(%)</a>
				</div>
				<div class="chart-area"></div>
			</div>
			<div id="total-house" class="tab-box" style="display:none;">
				<div class="dbTabs type03 sub-tab">
					<a href="#" class="on">㎡당 주택 거래가격 (만원)</a>
					<a href="#">주택 거래 동향 (건)</a>
					<a href="#">공시지가 (원/㎡)</a>
				</div>
				<div class="radio-box">
					<p class="chart-tab radio_style" style="width:calc(100% - 50px); max-width:250px;">
						<label><input type="radio" name="price-radio" value="apt" checked="checked"> 아파트 </label>
						<label><input type="radio" name="price-radio" value="villa"> 다세대/연립 </label>
						<label><input type="radio" name="price-radio" value="house"> 단독 </label>
					</p>
					<p class="chart-tab radio_style" style="display:none; width:calc(100% - 50px); max-width:250px;">
						<label><input type="radio" name="trade-radio" value="apt" checked="checked"> 아파트 </label>
						<label><input type="radio" name="trade-radio" value="villa"> 다세대/연립 </label>
						<label><input type="radio" name="trade-radio" value="house"> 단독 </label>
					</p>
					<p class="chart-tab radio_style" style="display:none;">
						<label><input type="radio" name="house-radio" value="house" checked="checked"> 주거용</label>
						<label><input type="radio" name="house-radio" value="industry"> 상업용</label>
					</p>
					<div class="chart-area"></div>
				</div>
			</div>
				<%@include file="/WEB-INF/jsp/includes/pageUpDown.jsp" %>
		</div>
	</div>
</div>