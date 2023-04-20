<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta name="title" content="총조사 시각화 지도">
	<meta name="sub-title" content="주택">
<script>
$(document).ready(function() {
	srvLogWrite('O0', '13', '02', '01', '주택', '');
});
</script>
</head>
<body>
<style>
.dashboard__statistics > ul > li:nth-child(1) { border:1px solid #e0e0e0; border-radius:5px 0 0 5px ; }
.dashboard__statistics > ul > li:nth-child(2) { border:1px solid #e0e0e0; border-left:0px; border-radius:0 5px 5px 0; }
</style>
	<div id="summary-container" class="dashboard__statistics">
		 
		<ul>
			<li>
				<h4>총 주택 수<!-- <a href="#" class="notice notice--gray" onclick="$('#total-number-tooltip').show();return false;"></a> --></h4>
				<p><span id="total-number" class="total-num">-</span>호</p>
<!-- 				<div id="total-number-tooltip" data-type="tooltip" class="dashboard__tooltip" style="display:none;"> -->
<!-- 					<div> -->
<!-- 						<p>전년 대비 주택 증감률 순위<br>(비교대상 – 기준 / 기준) * 100</p> -->
<!-- 						<a href="#" class="btn__cancel" onclick="$(this).parents('[data-type=tooltip]').hide();return false;"><span class="btn-close btn-close--black"></span></a> -->
<!-- 					</div> -->
<!-- 				</div> -->
			</li>
			<li>
				<h4>빈집수<a href="#" class="notice notice--gray" onclick="$('#total-empty-house-tooltip').show();return false;"></a></h4>
				<p><span data-id="total-empty-house" class="total-num">-</span>호</p>
				<p>전년 대비<span data-id="total-empty-house-irdsrate" class="state state-up">-%</span></p>
				<div id="total-empty-house-tooltip" data-type="tooltip" class="dashboard__tooltip" style="display:none;">
					<div>
						<p>주택 중 빈집을 대상으로 집계</p>
						<p>행정구역별 빈집의 수</p>
						<a href="#" class="btn__cancel" onclick="$(this).parents('[data-type=tooltip]').hide();return false;"><span class="btn-close btn-close--black"></span></a>
					</div>
				</div>
			</li>
			<li data-type="summary-others" style="display:none;">
				<h4 id="ranking"><a href="#" onclick="$('#ranking-tooltip,#ranking-tooltip-2').hide();$totSurvMap.ui.admCd.length==2?$('#ranking-tooltip').show():$('#ranking-tooltip-2').show();return false;" class="notice notice--gray"></a></h4>
				<div class="dashboard__con col-2">
					<div>
						<p><span data-id="total-rank" class="total-num">-</span>위</p>
						<p>총 주택 수</p>
						<p>전년 대비<span data-id="total-rank-irdsrate" class="state state-up">-%</span></p>
					</div>
					<div>
						<p><span data-id="empty-rank" class="total-num">-</span>위</p>
						<p>빈집 수</p>
						<p>전년 대비<span data-id="empty-rank-irdsrate" class="state state-up">-%</span></p>
					</div>
				</div>
				<jsp:include page="./ranking-tooltip.jsp"/>
			</li>
		</ul>
	</div>
	<div class="dashboard__box" id="area-population-container">
		<h3 data-id="text-year" data-append-text="년 지역별 주택 분포"></h3>
		<div class="dashboard__chart" style="height: 250px; background-color: #ddd;">
			<div id="tree-map"></div>
			<!-- s::tootip -->
			<div data-type="tooltip" class="modal dashboard-layer" style="display:none;">
			</div>
			<!-- e::tootip -->
		</div>
		<div class="dashboard__chart__con">
			<p>출처:통계청,「주택총조사」</p>
<!-- 			<div class="cf"> -->
<!-- 				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="area-population-container">차트 저장</a> -->
<!-- 			</div> -->
		</div>	
	</div>
	<div class="dashboard__box" id="house-in-room-chart-container">
		<h3 data-id="text-year" data-append-text="년 주택 종류별 규모" data-title-unit="(단위 : 호)"></h3>
		<div class="dashboard__chart" style="height: 340px;">
			<div id="house-in-room-chart"></div>
		</div>
		<div data-type="tooltip" class="modal dashboard-layer" style="display:none;">
		</div>
		<div class="dashboard__chart__con">
			<p>출처:통계청,「주택총조사」</p>
			<div class="cf">
<!-- 				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="house-in-room-chart-container">차트 저장</a> -->
				<a href="#" onclick="$totSurvMap.ui.getMataDataUrl('PH0285');return false;">통계표 보기</a>
			</div>
		</div>	
	</div>
	<div class="dashboard__box" id="kind-house-chart-container">
		<h3 data-id="text-year" data-append-text="년 거처 종류별 규모" data-title-unit="(단위 : 호)" data-tooltip="kind-house-tooltip"></h3>
		<div id="kind-house-tooltip" data-type="tooltip" class="dashboard__tooltip" style="display:none;">
			<div>
				<p>일반가구, 집단가구(집단시설가구 포함), 외국인가구를 대상으로 집계. 단, 특별조사구 및 빈집 제외</p>
				<p>주택 이외의 거처에는 오피스텔, 호텔·여관 등 <br>숙박업소의 객실, 기숙사 및 특수 사회시설, 판잣집·비닐하우스 등이 있음</p>
				<a href="#" class="btn__cancel" onclick="$(this).parents('[data-type=tooltip]').hide();return false;"><span class="btn-close btn-close--black"></span></a>
			</div>
		</div>
		<div class="dashboard__chart" style="height: 360px;overflow: auto;">
			<div id="kind-house-chart" style="width:900px"></div>
		</div>
		<div data-type="tooltip" class="modal dashboard-layer" style="display:none;"></div>
		<div class="dashboard__chart__con">
			<p>출처:통계청,「주택총조사」</p>
			<div class="cf">
<!-- 				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="kind-house-chart-container">차트 저장</a> -->
				<a href="#" onclick="$totSurvMap.ui.getMataDataUrl('PH0286');return false;">통계표 보기</a>
			</div>
		</div>	
	</div>
	<div class="dashboard__box" id="empty-house-chart-container">
		<h3 data-id="text-year" data-append-text="년 주택 종류별 빈집 규모" data-title-unit="(단위 : 호)"></h3>
		<div class="dashboard__chart" style="height: 250px;">
			<div id="empty-house-chart"></div>
		</div>
		<div data-type="tooltip" class="modal dashboard-layer" style="display:none;">
		</div>
		<div class="dashboard__chart__con">
			<p>출처:통계청,「주택총조사」</p>
			<div class="cf">
<!-- 				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="empty-house-chart-container">차트 저장</a> -->
				<a href="#" onclick="$totSurvMap.ui.getMataDataUrl('PH0290');return false;">통계표 보기</a>
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