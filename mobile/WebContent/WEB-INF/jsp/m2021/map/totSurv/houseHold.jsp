<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta name="title" content="총조사 시각화 지도">
	<meta name="sub-title" content="가구">
<script>
$(document).ready(function() {
	srvLogWrite('O0', '13', '02', '01', '가구', '');
});
</script>
</head>
<body>
<style>
.dashboard__statistics > ul > li:nth-child(1) { border:1px solid #e0e0e0; border-radius:5px 5px 0 0 ; }
.dashboard__statistics > ul > li:nth-child(2) { border:1px solid #e0e0e0; border-top:0px; border-radius:0 0 0 5px; }
.dashboard__statistics > ul > li:nth-child(3) { border:1px solid #e0e0e0; border-top:0px; border-left:0px; border-radius:0 0 5px 0; }
</style>

	<div id="summary-container" class="dashboard__statistics">
		 
		<ul>
			<li style="width:100%">
				<h4>총가구 수</h4>
				<p><span id="total-number" class="total-num">-</span>가구</p>
			</li>
			<li>
			
				<h4>1인 가구 수<!-- <a href="#" class="notice notice--gray" onclick="$('#total-one-people-household-tooltip').show();return false;"></a> --></h4>
				<p><span data-id="total-one-people-household" class="total-num">-</span>가구</p>
				<p>전년 대비<span data-id="total-one-people-household-irdsrate" class="state state-up">-%</span></p>
<!-- 						<div id="total-one-people-household-tooltip" data-type="tooltip" class="dashboard__tooltip" style="display:none;"> -->
<!-- 							<div> -->
<!-- 								<p>행정구역별 1인 가구의 수</p> -->
<!-- 								<p>1인 가구<br>- 가족이 아닌 남남끼리 함께 사는 5인 이하의 가구</p> -->
<!-- 								<p>일반가구를 대상으로 집계. <br>단, 집단가구(6인 이상 비혈연 가구, 기숙사, 사회시설 등) 및 외국인 가구 제외</p> -->
<!-- 								<a href="#" class="btn__cancel" onclick="$(this).parents('[data-type=tooltip]').hide();return false;"><span class="btn-close btn-close--black"></span></a> -->
<!-- 							</div> -->
<!-- 						</div> -->
			</li>
			<li>
				<div>
					<h4>고령자 가구 수<a href="#" class="notice notice--gray" onclick="$('#total-old-people-tooltip').show();return false;"></a></h4>
					<p><span data-id="total-old-people" class="total-num">-</span>가구</p>
					<p>전년 대비<span data-id="total-old-people-irdsrate" class="state state-up">-%</span></p>
					<div id="total-old-people-tooltip" data-type="tooltip" class="dashboard__tooltip" style="display:none;">
						<div>
							<p>행정구역별 65세 이상 고령자가 포함된 가구의 수</p>
							<a href="#" class="btn__cancel" onclick="$(this).parents('[data-type=tooltip]').hide();return false;"><span class="btn-close btn-close--black"></span></a>
						</div>
					</div>
				</div>
			</li>
			<li data-type="summary-others" style="display:none;">
				<h4 id="ranking"><a href="#" onclick="$('#ranking-tooltip,#ranking-tooltip-2').hide();$totSurvMap.ui.admCd.length==2?$('#ranking-tooltip').show():$('#ranking-tooltip-2').show();return false;" class="notice notice--gray"></a></h4>
				<div class="dashboard__con col-3">
					<div>
						<p><span data-id="total-rank" class="total-num">-</span>위</p>
						<p>총 인구 수</p>
					</div>
					<div>
						<p><span data-id="one-people-house-hold-rank" class="total-num">-</span>위</p>
						<p>1인 가구 수</p>
					</div>
					<div>
						<p><span data-id="old-people-rank" class="total-num">-</span>위</p>
						<p>고령자 가구 수</p>
					</div>
				</div>
				<jsp:include page="./ranking-tooltip.jsp"/>
			</li>
		</ul>
	</div>
	<div class="dashboard__box" id="area-population-container">
		<h3 data-id="text-year" data-append-text="년 지역별 가구 분포" data-title-unit="(단위 : 가구)"></h3>
		<div class="dashboard__chart" style="height: 250px; background-color: #ddd;">
			<div id="tree-map"></div>
			<!-- s::tootip -->
			<div data-type="tooltip" class="modal dashboard-layer" style="display:none;">
			</div>
			<!-- e::tootip -->
		</div>
		<div class="dashboard__chart__con">
			<p>출처:통계청,「인구총조사」</p>
<!-- 			<div class="cf"> -->
<!-- 				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="area-population-container">차트 저장</a> -->
<!-- 			</div> -->
		</div>	
	</div>
	<div class="dashboard__box" id="one-people-house-hold-chart-container">
		<h3 data-id="text-year" data-append-text="년 1인 가구의 거처 종류" data-title-unit="(단위 : 가구)"></h3>
		<div class="dashboard__chart" style="height: 370px;">
			<div style="overflow: auto;height: 360px;">
				<div id="one-people-house-hold-chart"></div>
			</div>
		</div>
		<div data-type="tooltip" class="modal dashboard-layer" style="display:none;">
		</div>
		<div class="dashboard__chart__con">
			<p>출처:통계청,「인구총조사」</p>
			<div class="cf">
<!-- 				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="one-people-house-hold-chart-container">차트 저장</a> -->
				<a href="#" onclick="$totSurvMap.ui.getMataDataUrl('PH0209');return false;">통계표 보기</a>
			</div>
		</div>	
	</div>
	<div class="dashboard__box" id="old-people-chart-container">
		<h3 data-id="text-year" data-append-text="년 고령자(65세 이상) 가구" data-title-unit="(단위 : 가구)"></h3>
		<div class="dashboard__chart">
			<div id="old-people-chart"></div>
<!-- 			<div id="old-people-legend" class="legend-container"></div> -->
		</div>
		<div data-type="tooltip" class="modal dashboard-layer" style="display:none;">
		</div>
		<div class="dashboard__chart__con">
			<p>출처:통계청,「인구총조사」</p>
			<div class="cf">
<!-- 				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="old-people-chart-container">차트 저장</a> -->
				<a href="#" onclick="$totSurvMap.ui.getMataDataUrl('PH0202');return false;">통계표 보기</a>
			</div>
		</div>	
	</div>
	<div class="dashboard__box" id="children-chart-container">
		<h3 data-id="text-year" data-append-text="년 자녀수별 가구" data-title-unit="(단위 : 가구)" style="display:inline-block;" data-tooltip="children-tooltip"></h3>
		<div id="children-tooltip" data-type="tooltip" class="dashboard__tooltip" style="display:none;">
			<div>
				<p>한 가구에 함께 거주하는 만18세 이하 미성년자녀를 집계 대상으로 하며, 부모가 서로 다른 2가족 이상 함께 거주하고 있는 경우는 자녀수의 최대값으로 그 가구의 자녀 수를 결정</p>
				<p>자녀 수에는 함께 거주하는 만19세 이상 자녀도 포함하여 집계함</p>
				<a href="#" class="btn__cancel" onclick="$(this).parents('[data-type=tooltip]').hide();return false;"><span class="btn-close btn-close--black"></span></a>
			</div>
		</div>
		<div class="dashboard__chart" style="height: 260px;">
			<div style="overflow: auto;height: 250px;">
				<div id="children-chart"></div>
			</div>
		</div>
		<div data-type="tooltip" class="modal dashboard-layer" style="display:none;">
		</div>
		<div class="dashboard__chart__con">
			<p>출처:통계청,「인구총조사」</p>
			<div class="cf">
<!-- 				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="children-chart-container">차트 저장</a> -->
				<a href="#" onclick="$totSurvMap.ui.getMataDataUrl('PH0214');return false;">통계표 보기</a>
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