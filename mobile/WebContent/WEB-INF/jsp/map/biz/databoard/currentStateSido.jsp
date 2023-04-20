<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<div id="current-state-sido-databoard" class="Open_Type1" style="display:none;">
	<h3>데이터보드</h3>
	<button class="BtnClose" onclick="$('.Open_Type1').hide();">데이터보드닫기</button>
	<div class="title-area">
		<div class="title-info">
			<div>생활업종별 지역 시도 현황</div>
			<div><span class="data-location title-location"></span><span class="data-year"></span></div>
		</div>
	</div>
	<div class="DetailBox" style="padding:0;">
		<div class="Subject SubjectC number2">
			<nav><a class="M_on" data-type="pie">사업체 비율</a><a data-type="bar">업종 현황</a></nav>
		</div>
		<div class="data-box" data-type="pie">
			<div class="dbTabs type01 jobAreaType chart-tab" style="margin-top:10px;">
				<a href="#" class="M_on" data-type="sidotobinfo">종합현황</a>
				<a href="#" data-type="sidotobgroup" data-theme="50">음식점</a>
				<a href="#" data-type="sidotobgroup" data-theme="10">서비스</a>
				<a href="#" data-type="sidotobgroup" data-theme="20">도소매</a>
				<a href="#" data-type="sidotobgroup" data-theme="40">숙박업</a>
			</div>
			<div class="jobAreaTypeCont">
				<p class="horizontalTitle mt20">
					17개 주요 시도별 생활업종현황
					<br>
					검색항목(36종) 분류별 사업체 비율
				</p>
				<div class="pie-chart-area">
					<div class="box">
						<div class="title">전국</div>
						<div class="chart-box">
							<div class="chart-area country-chart"></div>
						</div>
					</div>
					<div class="box">
						<div class="title data-location"></div>
						<div class="chart-box">
							<div class="chart-area sido-chart"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="data-box" style="display: none;" data-type="bar">
			<div class="dbTabs type01 jobAreaType sub-tab" style="margin-top:10px;">
				<a href="#" class="M_on" data-type="corp">사업체</a>
				<a href="#" data-type="worker">종사자</a>
			</div>
			<div class="jobAreaTypeCont">
				<p class="horizontalTitle mt20">
					17개 주요 시도별 생활업종현황
					<br>
					검색항목(36종) 분류별 사업체 순위
				</p>
				<p class="chart-tab radio_style">
					<label>
						<input type="radio" name="current-state-sido-chart-radio" value="cnt" data-unit="개" checked="checked"> 수
					</label>
					<label>
						<input type="radio" name="current-state-sido-chart-radio" value="per" data-unit="%"> 비율
					</label>
					<label>
						<input type="radio" name="current-state-sido-chart-radio" value="irdsrate" data-unit=""> 증감
					</label>
				</p>
				<div class="chart-area">차트</div>
			</div>
		</div>
		<%@include file="/WEB-INF/jsp/includes/pageUpDown.jsp" %>
	</div>
</div>

