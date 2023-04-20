<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta name="title" content="총조사 시각화 지도">
	<meta name="sub-title" content="인구">
<script>
$(document).ready(function() {
	srvLogWrite('O0', '13', '02', '01', '인구', '');
});
</script>
</head>
<body>
<style>
.dashboard__statistics > ul > li:nth-child(1) { border:1px solid #e0e0e0; border-radius:5px 0 0 0 ; }
.dashboard__statistics > ul > li:nth-child(2) { border:1px solid #e0e0e0; border-left:0px; border-radius:0 5px 0 0 ; }
.dashboard__statistics > ul > li:nth-child(3) { border:1px solid #e0e0e0; border-top:0px; border-radius:0 0 0 5px; }
.dashboard__statistics > ul > li:nth-child(4) { border:1px solid #e0e0e0; border-left:0px; border-top:0px; border-radius:0 0 5px 0; }
</style>

	<div id="summary-container" class="dashboard__statistics">
		<!-- <h3 class="dashboard__statistics__title dashOpen">인구 총괄</h3> -->
		<ul>
			<li>
				<h4>총인구 수	<a href="#" class="notice notice--gray2" onclick="$('#total-number-tootip').show();return false;"></a></h4>
				<p><span id="total-number" class="total-num">-</span>명</p>
				<div id="total-number-tootip" data-type="tooltip" class="dashboard__tooltip" style="display:none;">
					<div>
						<p>총 인구는 외국인을 포함</p>
<!-- 						<p>전년 대비 인구 증감률 순위<br>(비교대상 – 기준 / 기준) * 100</p> -->
						<a href="#" class="btn__cancel" onclick="$(this).parents('[data-type=tooltip]').hide();return false;"><span class="btn-close btn-close--black"></span></a>
					</div>
				</div>
				<p style="display:none;">전년 대비<span id="total-irdsrate" class="state"></span></p>
			</li>
			<li>
				
				
						<h4>남녀 성비<a href="#" class="notice notice--gray2" onclick="$('#total-gender-number-tooltip').show();return false;"></a></h4>
						<p><span data-id="total-gender-number" class="total-num">-</span></p>
						<div id="total-gender-number-tooltip" data-type="tooltip" class="dashboard__tooltip" style="display:none;">
							<div>
								<p>총 인구는 외국인을 포함</p>
								<p>여자 100명당 남자의 수<br>(성비=(남자수/여자수)x100)</p>
								<a href="#" class="btn__cancel" onclick="$(this).parents('[data-type=tooltip]').hide();return false;"><span class="btn-close btn-close--black"></span></a>
							</div>
						</div>
					
				
			</li>
			<li>
				
				
						<h4>외국인 수<a href="#" class="notice notice--gray2" onclick="$('#total-forigen-number-tooltip').show();return false;"></a></h4>
						<p><span data-id="total-forigen-number" class="total-num">-</span>명</p>
						<p>전년 대비<span data-id="total-forigen-rt" class="state state-up">-%</span></p>
						<div id="total-forigen-number-tooltip" data-type="tooltip" class="dashboard__tooltip" style="display:none;">
							<div>
								<p>행정구역별 3개월 이상 거주한 외국인 수</p>
								<p>범위 : 단기 체류 외국인, 등록 외국인, 외국 국적 동포 거소신고자</p>
								<a href="#" class="btn__cancel" onclick="$(this).parents('[data-type=tooltip]').hide();return false;"><span class="btn-close btn-close--black"></span></a>
							</div>
						</div>
					
			
			</li>
			<li data-type="summary-00" style="display:none;">
				<h4>IMF 210개 국가 중 순위	<a href="#" class="notice notice--gray2" onclick="$('#imf-tooltip').show();return false;"></a></h4>
				<p><span id="imf-rank" class="total-num">-</span>위</p>
				<p>전년 대비<span id="imf-irdsrate" class="state state-up">-%</span></p>
				<div id="imf-tooltip" data-type="tooltip" class="dashboard__tooltip" style="display:none;">
					<div>
						<p>해당 연도 아시아, 아메리카, 유럽, 아프리카, 오세아니아에 속하는 210개 국가 중 인구 순위</p>
						<div>
							<p>출처 : KOSIS > 국제통계 > 국제기구별 통계 > IMF</p>
							<ul>
								<li><a target="_BLANK" href="https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_2CBU1&conn_path=I2">인구(아프리카)</a></li>
								<li><a target="_BLANK" href="https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_2CBU2&conn_path=I2">인구(아메리카)</a></li>
								<li><a target="_BLANK" href="https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_2CBU3&conn_path=I2">인구(아시아)</a></li>
								<li><a target="_BLANK" href="https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_2CBU4&conn_path=I2">인구(유럽)</a></li>
								<li><a target="_BLANK" href="https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_2CBU5&conn_path=I2">인구(오세아니아)</a></li>
							</ul>
						</div>
						<a href="#" class="btn__cancel" onclick="$(this).parents('[data-type=tooltip]').hide();return false;"><span class="btn-close btn-close--black"></span></a>
					</div>
				</div>
			</li>
			<li data-type="summary-others" style="display:none; height:160px">
				<h4 id="ranking"><a href="#" onclick="$('#ranking-tooltip,#ranking-tooltip-2').hide();$totSurvMap.ui.admCd.length==2?$('#ranking-tooltip').show():$('#ranking-tooltip-2').show();return false;" class="notice notice--gray"></a></h4>
				<div class="dashboard__con col-3">
					<div>
						<p><span data-id="total-rank" class="total-num">-</span>위</p>
						<p>총 인구 수</p>
					</div>
					<div>
						<p><span data-id="gender-rank" class="total-num">-</span>위</p>
						<p>남녀 성비</p>
					</div>
					<div>
						<p><span data-id="foreign-rank" class="total-num">-</span>위</p>
						<p>외국인 수</p>
					</div>
				</div>
				<jsp:include page="./ranking-tooltip.jsp"/>
			</li>
		</ul>
	</div>
	<div class="dashboard__box" id="area-population-container">
		<h3 data-id="text-year" data-append-text="년 지역별 인구 분포"></h3>
		<div class="dashboard__chart" style="height: 250px; background-color: #ddd;">
			<div id="tree-map"></div>
			<!-- s::tootip -->
			<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
			<!-- e::tootip -->
		</div>
		<div class="dashboard__chart__con">
			<p>출처:통계청,「인구총조사」</p>
<!-- 			<div class="cf"> -->
<!-- 				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="area-population-container">차트 저장</a> -->
<!-- 			</div> -->
		</div>	
	</div>
	<div class="dashboard__box" id="people-chart-container">
		<h3 data-id="text-year" data-append-text="년 성별 인구" data-title-unit="(단위 : 명)"></h3>
		<ul id="gender-tab" class="administration__sub-tab">
			<li class="on" data-value="total" onClick="setGenderPieChart('total');return false;">총인구</li>
			<li data-value="local" onClick="setGenderPieChart('local');return false;">내국인</li>
			<li data-value="foreign" onClick="setGenderPieChart('foreign');return false;">외국인</li>
		</ul>
		<div class="dashboard__chart">
			<div id="people-chart"></div>
<!-- 			<div id="people-legend" class="legend-container"></div> -->
		</div>
		<div data-type="tooltip" class="modal dashboard-layer" style="display:none;">
		</div>
		<div class="dashboard__chart__con">
			<p>출처:통계청,「인구총조사」</p>
<!-- 			<div class="cf"> -->
<!-- 				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="people-chart-container">차트 저장</a> -->
<!-- 			</div> -->
		</div>	
	</div>
	<div class="dashboard__box" id="people-age-chart-container">
		<h3 data-id="text-year" data-append-text="년 연령별 인구" data-title-unit="(단위 : 명)"></h3>
		<div class="dashboard__chart" style="height: 260px;">
			<div style="overflow: auto;height: 240px;">
				<div id="people-age-chart" style="width:1250px;"></div>
			</div>
			<div class="legend-container">
				<span class="legend-box">
					<span class="legend-box" style="background-color:#92D0EF;"></span><span class="legend-label">영유아/어린이</span>
				</span>
				<span class="legend-box">
					<span class="legend-box" style="background-color:#F1D16E;"></span><span class="legend-label">청소년</span>
				</span>
				<span class="legend-box">
					<span class="legend-box" style="background-color:#4DC7AC;"></span><span class="legend-label">청년</span>
				</span>
				<span class="legend-box">
					<span class="legend-box" style="background-color:#DD95DA;"></span><span class="legend-label">장년</span>
				</span>
				<span class="legend-box">
					<span class="legend-box" style="background-color:#F5CA87;"></span><span class="legend-label">노년</span>
				</span>
			</div>
		</div>
		<div data-type="tooltip" class="modal dashboard-layer" style="display:none;">
		</div>
		<div class="dashboard__chart__con">
			<p>출처:통계청,「인구총조사」</p>
			<div class="cf">
<!-- 				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="people-age-chart-container">차트 저장</a> -->
				<a href="#" onclick="$totSurvMap.ui.getMataDataUrl('PH0002');return false;">통계표 보기</a>
			</div>
		</div>	
	</div>
	<div class="dashboard__box" id="move-home-chart-container">
		<h3 data-id="text-year" data-append-text="년 1년전 거주지 기준 인구 이동" data-title-unit="(단위 : 명)"></h3>
		<div class="dashboard__chart">
			<div id="move-home-chart"></div>
<!-- 			<div id="move-home-legend" class="legend-container"></div> -->
		</div>
		<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
		<div class="dashboard__chart__con">
			<p>출처:통계청,「인구총조사」</p>
			<div class="cf">
<!-- 				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="move-home-chart-container">차트 저장</a> -->
				<a href="#" onclick="$totSurvMap.ui.getMataDataUrl('PH0011');return false;">통계표 보기</a>
			</div>
		</div>	
	</div>
	<div class="dashboard__box" id="population-for-time-container">
		<h3 id="population-for-time-title" data-title-unit="(단위 : 천명, %)"></h3>
		<span>* 외국인 제외</span>
		<ul id="population-for-time-tab" class="administration__sub-tab">
			<li class="on" data-value="bar" onClick="setPopulationForTimeChart(false);return false;">인구</li>
			<li data-value="line" onClick="setPopulationForTimeChart(true);return false;">증감률</li>
		</ul>
		<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
		<div class="dashboard__chart" style="height: 260px;">
			<div style="overflow: auto;height:250px;">
				<div id="population-for-time-chart"></div>
			</div>
		</div>
		<div class="dashboard__chart__con">
			<p>출처:통계청,「인구총조사」</p>
			<div class="cf">
<!-- 				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="population-for-time-container">차트 저장</a> -->
				<a href="#" onclick="$totSurvMap.ui.getMataDataUrl('PH0298');return false;">통계표 보기</a>
			</div>
		</div>	
	</div>
	<script>
    
        $(function(){
        
            var _match2 = $('.dashboard__map').offset().top;
            $('body').scroll(function(){
                var _match = $('body').scrollTop();
                
                
              
                if(_match >= _match2){
                    
                    $('.map__above').addClass('sticky')
                } else {
                    $('.map__above').removeClass('sticky')
                }
                
            })
            
        })
        </script>
</body>
</html> 