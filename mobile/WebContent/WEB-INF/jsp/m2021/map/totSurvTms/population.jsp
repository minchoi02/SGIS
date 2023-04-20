<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta name="title" content="총조사 시각화 지도">
	<meta name="sub-title" content="주택">
<style>
.databoard-legend{width:10px;height: 10px;display: inline-block;border-radius: 20px;margin-top: 5px;}
.max-color{background-color: rgb(180, 233, 240);}
.min-color{background-color: rgb(250, 205, 205);}
.detail-table {
	width: 100%;
    height: 210px;
    background-color: #fff; 
    text-align: center; 
    box-sizing: border-box; 
    height:calc(100% - 70px);
    overflow:auto;
}
.detail-table > div {
	min-width:400px;
	width:100%;
}
.detail-table > div > p {
	text-align: right;
	color: #72787B;
	font-size: 13px;
	margin-top: 10px;
	text-align: center;
}
.detail-table > div > table {
	border: 0;
	background-color: white;
	border-collapse: collapse;
}

.detail-table > div > table > thead > tr > th { 
    text-align: left;
    font-size: 13px;
    padding: 10px;
    line-height: 5px;
    border: 1px solid #BDBDBD;
	color: #fff;
	background-color: #28425b;
	text-align: center;
}

.detail-table > div > table > thead > tr > td { 
    text-align: left;
    font-size: 13px;
    padding: 10px;
    line-height: 5px;
}

.detail-table > div > table > tbody > tr > td { 
    font-size: 13px;
    padding: 10px;
    line-height: 5px;
    border: 1px solid rgb(221, 221, 221);
}
</style>
</head>
<body>
	<div class="dashboard__statistics">
		<div class="dashboard__statistics__title">
			<div>
				<span>비교</span>
				<select data-id="top-map-year"></select>
			</div>
			<div>
				<span>기준</span>
				<select data-id="map-year"></select>
			</div>
		</div>
		<div class="dashboard__compare">
			<div class="dashboard__compare__map">
				<div id="top-map" class="dashboard__compare__map01" style="background:none;">
					<div id="top-map-tooltip" class="modal dashboard-layer" style="display:none;">
						<div class="modal__header d-flex justify-content-between align-items-center">
							<h3 class="modal__tit">2015년 50~54세 여자</h3>
							<a href="#n" class="btn__cancel"><span class="btn-close btn-close--black"></span></a>
						</div>
						<div class="modal__body">
							<p><span class="color-red font-large fwbold">412,896</span>명</p>
						</div>
					</div>
				</div>
				<div id="map" class="dashboard__compare__map02" style="background:none;">
					<div id="map-tooltip" class="modal dashboard-layer" style="display:none;">
						<div class="modal__header d-flex justify-content-between align-items-center">
							<h3 class="modal__tit">2015년 50~54세 여자</h3>
							<a href="#n" class="btn__cancel"><span class="btn-close btn-close--black"></span></a>
						</div>
						<div class="modal__body">
							<p><span class="color-red font-large fwbold">412,896</span>명</p>
						</div>
					</div>
				</div>
			</div>
			<div class="dashboard__compare__result" style="z-index:10;">
				<select data-id="top-map-year"></select>
				<p><a href="#" id="combine-button" class="map__show">융합 결과 보기</a></p>
				<select data-id="map-year"></select>
			</div>
		</div>
		<div class="dashboard__box">
			<h3>성별, 연령별 인구</h3>
			<div id="top-map-time-ender-age-population-chart-container">
				<h4 data-id="top-map-year"></h4>
				<div class="dashboard__chart" style="height: 250px;">
					<div id="top-map-time-ender-age-population-chart"></div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
				</div>
				<div class="dashboard__chart__con">
					<p>출처:통계청,「경제총조사」</p>
					<div class="cf">
						<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="top-map-time-ender-age-population-chart-container">차트 저장</a>
						<a href="#" data-id="databoard" data-value="left" class="databoard-show">데이터 보드</a>
					</div>
				</div>  
			</div>
			<div id="map-time-ender-age-population-chart-container">
				<h4 data-id="map-year"></h4>
				<div class="dashboard__chart" style="height: 250px;">
					<div id="map-time-ender-age-population-chart"></div>
					<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
				</div>
				<div class="dashboard__chart__con">
					<p>출처:통계청,「경제총조사」</p>
					<div class="cf">
						<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="map-time-ender-age-population-chart-container">차트 저장</a>
						<a href="#n" data-id="databoard" data-value="right" class="databoard-show">데이터 보드</a>
					</div>
				</div>  
			</div>
		</div>
	</div>
	<div id="time-total-population-chart-container" class="dashboard__box mb15">
		<h3>총 인구 변화</h3>
		<div class="dashboard__chart" style="height: 250px;">
			<div id="time-total-population-chart"></div>
			<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
		</div>
		<div class="dashboard__chart__con">
			<p>출처:통계청,「경제총조사」</p>
			<div class="cf">
				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="time-total-population-chart-container">차트 저장</a>
				<a href="#" onclick="$totSurvMap.ui.getMataDataUrl('PH0001');return false;">통계표 보기</a>
			</div>
		</div>  
	</div>
	<div id="time-total-rank-population-chart-container" class="dashboard__box mb15">
		<h3>광역시·도 순위 변화</h3>
		<div class="dashboard__chart" style="height: 250px;">
			<div id="time-total-rank-population-chart">
				<div style="text-align:center;padding-top:80px;">	
					<img src="${sgisCtx }/images/totSurv/locationclick.png" alt="지역을 선택하세요">	
					<p style="padding-top:10px;">지역을 선택하시면 차트가 표출됩니다.</p>
				</div>
			</div>
			<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
		</div>
		<div class="dashboard__chart__con">
			<p>출처:통계청,「경제총조사」</p>
			<div class="cf">
				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="time-total-rank-population-chart-container">차트 저장</a>
				<a href="#" onclick="$totSurvMap.ui.getMataDataUrl('PH0001');return false;">통계표 보기</a>
			</div>
		</div>  
	</div>
	<div id="tiem-gender-population-chart-container" class="dashboard__box mb15">
		<h3>남녀 성비 변화</h3>
		<div class="dashboard__chart" style="height: 250px;">
			<div id="tiem-gender-population-chart"></div>
			<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
		</div>
		<div class="dashboard__chart__con">
			<p>출처:통계청,「경제총조사」</p>
			<div class="cf">
				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="tiem-gender-population-chart-container">차트 저장</a>
				<a href="#" onclick="$totSurvMap.ui.getMataDataUrl('PH0002');return false;">통계표 보기</a>
			</div>
		</div>  
	</div>
	<div id="tiem-foreign-population-chart-container" class="dashboard__box mb15">
		<h3>외국인 수 변화</h3>
		<div class="dashboard__chart" style="height: 250px;">
			<div id="tiem-foreign-population-chart"></div>
			<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
		</div>
		<div class="dashboard__chart__con">
			<p>출처:통계청,「경제총조사」</p>
			<div class="cf">
				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="tiem-foreign-population-chart-container">차트 저장</a>
				<a href="#" onclick="$totSurvMap.ui.getMataDataUrl('PH0002');return false;">통계표 보기</a>
			</div>
		</div>  
	</div>
	<div id="databoard-container" class="map__below dashboard__below dashboard__below__map" style="display:none;height: 80%;z-index:1001;">
		<div>
			<div class="map__search" style="height: 100%;">
				<div class="map__slideup">
					<div>
						<span class="databoard-legend max-color"></span> 최대값 
						<span class="databoard-legend min-color"></span> 최소값
					</div>
					<h3>연령별인구차트</h3>
					<a href="#n" class="btn-close btn-close--black btn__cancel" onclick="$('#databoard-container,.dim').hide();return false;"></a>
				</div>
				<div class="detail-table">
					<div>
						<table style="width: 100%;">
							<thead style="width:100%; display:inline-table; box-sizing: border-box">
								<tr>
									<th rowspan="2" style="width:25%">지역</th>
									<th rowspan="2" style="width:25%">나이</th>
									<th colspan="2" style="border-bottom: 1px solid #fff;" data-id="year"></th>
								</tr>
								<tr>
									<th style="width:25%">남</th>
									<th style="width:25%">여</th>
								</tr>
							</thead>
							<tbody id="databoard" style="width:100%; display:inline-table; box-sizing: border-box">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</body>
</html> 