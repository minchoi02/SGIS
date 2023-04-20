<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta name="title" content="총조사 시각화 지도">
	<meta name="sub-title" content="어업">
<script>
$(document).ready(function() {
	srvLogWrite('O0', '13', '02', '01', '어업', '');
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
		<!-- <h3 class="dashboard__statistics__title dashOpen">어업 총괄</h3> -->
		<ul>
			<li style="width:100%;">
				<h4>총 어가 수<!-- <a href="#" class="notice notice--gray" onclick="$('#total-number-tooltip').show();return false;"></a> --></h4>
				<p><span id="total-number" class="total-num">-</span>가구</p>
				<p>전주기 대비<span data-id="total-number-rt" class="state state-up">-%</span></p>
				<p><span data-id="total-number-data"></span></p>
<!-- 				<div id="total-number-tooltip" data-type="tooltip" class="dashboard__tooltip" style="display:none;"> -->
<!-- 					<div> -->
<!-- 						<p>전주기 대비 어가 가구 증감률<br>(비교대상 – 기준 / 기준) * 100</p> -->
<!-- 						<a href="#" class="btn__cancel" onclick="$(this).parents('[data-type=tooltip]').hide();return false;"><span class="btn-close btn-close--black"></span></a> -->
<!-- 					</div> -->
<!-- 				</div> -->
			</li>
			<li>
				<h4>총 어가 인구 수<a href="#" class="notice notice--gray" onclick="$('#total-fishery-number-tooltip').show();return false;"></a></h4>
				<p><span data-id="total-fishery-number" class="total-num">-</span>명</p>
				<p>전주기 대비<span data-id="total-fishery-number-rt" class="state state-up">-%</span></p>
				<div id="total-fishery-number-tooltip" data-type="tooltip" class="dashboard__tooltip" style="display:none;">
					<div>
						<p>행정구역별 어가 인구(가구원 총수)<br>※어가기준 : 조사기준 현재 논이나 밭을 100a(300평) 이상 직접 경영하는 어가</p>
						<a href="#" class="btn__cancel" onclick="$(this).parents('[data-type=tooltip]').hide();return false;"><span class="btn-close btn-close--black"></span></a>
					</div>
				</div>
			</li>
			<li>
				<h4>고령 인구 수<a href="#" class="notice notice--gray" onclick="$('#old-people-tooltip,#old-people-tooltip2').hide();$totSurvMap.ui.year=='2015'||$totSurvMap.ui.year=='2020'?$('#old-people-tooltip').show():$('#old-people-tooltip-2').show();;return false;"></a></h4>
				<p><span data-id="total-old-people-number" class="total-num">-</span>명</p>
				<p>총 어가 인구의 <span data-id="total-old-people-number-rt"></span></p>
				<div id="old-people-tooltip" data-type="tooltip" class="dashboard__tooltip" style="display:none;">
					<div>
						<p>행정구역별 어가 인구 중 65세 이상의 어가 인구 수</p>
						<div>
							<p>출처 : 통계청 『농림어업총조사』</p>
							<ul>
								<li><a target="_BLANK" href="https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1AG15104&conn_path=I2">연령 및 성별 어가인구/성비</a></li>
							</ul>
						</div>
						<a href="#" class="btn__cancel" onclick="$(this).parents('[data-type=tooltip]').hide();return false;"><span class="btn-close btn-close--black"></span></a>
					</div>
				</div>
				<div id="old-people-tooltip2" data-type="tooltip" class="dashboard__tooltip" style="display:none;">
					<div>
						<p>행정구역별 어가 인구 중 65세 이상의 어가 인구 수</p>
						<div>
							<p>출처 : 통계청 『농림어업총조사』</p>
							<ul>
								<li><a target="_BLANK" href="https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1AG104&conn_path=I2">연령 및 성별 어가인구/성비</a></li>
							</ul>
						</div>
						<a href="#" class="btn__cancel" onclick="$(this).parents('[data-type=tooltip]').hide();return false;"><span class="btn-close btn-close--black"></span></a>
					</div>
				</div>
			</li>
			<li data-type="summary-others" style="display:none;">
				<h4 id="ranking"><a href="#" onclick="$('#ranking-tooltip,#ranking-tooltip-2').hide();$totSurvMap.ui.admCd.length==2?$('#ranking-tooltip').show():$('#ranking-tooltip-2').show();return false;" class="notice notice--gray"></a></h4>
				<div class="dashboard__con col-2">
					<div>
						<p><span data-id="total-rank" class="total-num">-</span>위</p>
						<p>총 어가 수</p>
						<p>전년 대비<span data-id="total-rank-irdsrate" class="state state-up">-%</span></p>
					</div>
					<div>
						<p><span data-id="fishery-people-rank" class="total-num">-</span>위</p>
						<p>어가 인구 수</p>
						<p>전년 대비<span data-id="fishery-people-rank-irdsrate" class="state state-up">-%</span></p>
					</div>
				</div>
				<jsp:include page="./ranking-tooltip.jsp"/>
			</li>
		</ul>
	</div>
	<div class="dashboard__box" id="area-population-container">
		<h3 data-id="text-year" data-append-text="년 지역별 어가 분포"></h3>
		<div class="dashboard__chart" style="height: 250px; background-color: #ddd;">
			<div id="tree-map"></div>
			<!-- s::tootip -->
			<div data-type="tooltip" class="modal dashboard-layer" style="display:none;">
			</div>
			<!-- e::tootip -->
		</div>
		<div class="dashboard__chart__con">
			<p>출처: 통계청, 「농림어업총조사」</p>
<!-- 			<div class="cf"> -->
<!-- 				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="area-population-container">차트 저장</a> -->
<!-- 			</div> -->
		</div>	
	</div>
	<div class="dashboard__box" id="owner-kind-fishery-chart-container">
		<h3 data-id="text-year" data-append-text="년 경영형태별 어가" data-title-unit="(단위 : 가구)"></h3>
		<div class="dashboard__chart" style="height: 480px;">
			<div id="owner-kind-fishery-chart"></div>
		</div>
		<div data-type="tooltip" class="modal dashboard-layer" style="display:none;">
		</div>
		<div class="dashboard__chart__con">
			<p>출처: 통계청, 「농림어업총조사」</p>
			<div class="cf">
<!-- 				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="owner-kind-fishery-chart-container">차트 저장</a> -->
				<a href="#" onclick="if($totSurvMap.ui.themeData[$totSurvMap.ui.theme].fisheryType=='sea'){if($totSurvMap.ui.year=='2015'){$totSurvMap.ui.getMataDataUrl('FS0111');}else if($totSurvMap.ui.year=='2010'){$totSurvMap.ui.getMataDataUrl('FS0412');}else if($totSurvMap.ui.year=='2020'){$totSurvMap.ui.getMataDataUrl('FS0615');}}else {if($totSurvMap.ui.year=='2015'){$totSurvMap.ui.getMataDataUrl('FS0170');}else if($totSurvMap.ui.year=='2010'){$totSurvMap.ui.getMataDataUrl('FS0468');}else if($totSurvMap.ui.year=='2020'){$totSurvMap.ui.getMataDataUrl('FS0622');}}return false;">통계표 보기</a>
			</div>
		</div>	
	</div>
	<div class="dashboard__box" id="fishery-pay-chart-container">
		<h3 data-id="text-year" data-append-text="년 수산물 판매금액별 어가" data-title-unit="(단위 : 가구)"></h3>
		<div class="dashboard__chart" style="height: 360px;">
			<div style="overflow: auto;height: 350px;">
				<div id="fishery-pay-chart" style="width:800px;"></div>
			</div>
		</div>
		<div data-type="tooltip" class="modal dashboard-layer" style="display:none;">
		</div>
		<div class="dashboard__chart__con">
			<p>출처: 통계청, 「농림어업총조사」</p>
			<div class="cf">
<!-- 				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="fishery-pay-chart-container">차트 저장</a> -->
				<a href="#" onclick="if($totSurvMap.ui.themeData[$totSurvMap.ui.theme].fisheryType=='sea'){if($totSurvMap.ui.year=='2015'){$totSurvMap.ui.getMataDataUrl('FS0136');}else if($totSurvMap.ui.year=='2010'){$totSurvMap.ui.getMataDataUrl('FS0436');}else if($totSurvMap.ui.year=='2020'){$totSurvMap.ui.getMataDataUrl('FS0616');}}else {if($totSurvMap.ui.year=='2015'){$totSurvMap.ui.getMataDataUrl('FS0195');}else if($totSurvMap.ui.year=='2010'){$totSurvMap.ui.getMataDataUrl('FS0492');}else if($totSurvMap.ui.year=='2020'){$totSurvMap.ui.getMataDataUrl('FS0623');}}return false;">통계표 보기</a>
			</div>
		</div>	
	</div>
	<div class="dashboard__box" id="owner-scale-chart-container">
		<h3 data-id="text-year" data-append-text="년 임주된 어로방법별 어가" data-title-unit="(단위 : 가구)"></h3>
		<ul id="sea-tab" class="administration__sub-tab">
			<li class="on" onClick="createOwnerFisheryScaleChart.call(this);return false;" data-type="totFisheryTotal">전체</li>
			<li onClick="createOwnerFisheryScaleChart.call(this);return false;" data-type="totInshoreFishery">근해어업</li>
			<li onClick="createOwnerFisheryScaleChart.call(this);return false;" data-type="totBlockFishery">구획어업</li>
			<li onClick="createOwnerFisheryScaleChart.call(this);return false;" data-type="totCoastalFishery">연안어업</li>
			<li onClick="createOwnerFisheryScaleChart.call(this);return false;" data-type="totOthersFishery">기타어업</li>
		</ul>
		<ul id="inland-tab" class="administration__sub-tab" style="display:none;">
			<li class="on" onClick="createOwnerFisheryScaleChart.call(this);return false;" data-type="totGetFishTotal">전체</li>
			<li onClick="createOwnerFisheryScaleChart.call(this);return false;" data-type="totGetFish">어류</li>
			<li onClick="createOwnerFisheryScaleChart.call(this);return false;" data-type="totGetOthersFish">기타 어획 품종</li>
		</ul>
		<div class="dashboard__chart" style="height: 260px;">
			<div style="overflow: auto;height: 250px;">
				<div id="owner-scale-chart"></div>
			</div>
		</div>
		<div data-type="tooltip" class="modal dashboard-layer" style="display:none;">
		</div>
		<div class="dashboard__chart__con">
			<p>출처: 통계청, 「농림어업총조사」</p>
			<div class="cf">
<!-- 				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="owner-scale-chart-container">차트 저장</a> -->
				<a href="#" onclick="if($totSurvMap.ui.themeData[$totSurvMap.ui.theme].fisheryType=='sea'){if($totSurvMap.ui.year=='2015'){$totSurvMap.ui.getMataDataUrl('FS0124');}else if($totSurvMap.ui.year=='2010'){$totSurvMap.ui.getMataDataUrl('FS0424');}else if($totSurvMap.ui.year=='2020'){$totSurvMap.ui.getMataDataUrl('FS0616');}}else {if($totSurvMap.ui.year=='2015'){$totSurvMap.ui.getMataDataUrl('FS0186');}else if($totSurvMap.ui.year=='2010'){$totSurvMap.ui.getMataDataUrl('FS0483');}else if($totSurvMap.ui.year=='2020'){$totSurvMap.ui.getMataDataUrl('FS0628');}}return false;">통계표 보기</a>
			</div>
		</div>	
	</div>
	<div class="dashboard__box" id="fishery-age-chart-container">
		<h3 data-id="text-year" data-append-text="년 경영주 연령별 어가" data-title-unit="(단위 : 가구)"></h3>
		<div class="dashboard__chart" style="height: 270px;">
			<div style="overflow: auto;height: 260px;">
				<div id="fishery-age-chart" style="width:1000px;"></div>
			</div>
		</div>
		<div data-type="tooltip" class="modal dashboard-layer" style="display:none;">
		</div>
		<div class="dashboard__chart__con">
			<p>출처: 통계청, 「농림어업총조사」</p>
			<div class="cf">
<!-- 				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="fishery-age-chart-container">차트 저장</a> -->
				<a href="#" onclick="if($totSurvMap.ui.themeData[$totSurvMap.ui.theme].fisheryType=='sea'){if($totSurvMap.ui.year=='2015'){$totSurvMap.ui.getMataDataUrl('FS0115');}else if($totSurvMap.ui.year=='2010'){$totSurvMap.ui.getMataDataUrl('FS0416');}else if($totSurvMap.ui.year=='2020'){$totSurvMap.ui.getMataDataUrl('FS0617');}}else {if($totSurvMap.ui.year=='2015'){$totSurvMap.ui.getMataDataUrl('FS0174');}else if($totSurvMap.ui.year=='2010'){$totSurvMap.ui.getMataDataUrl('FS0472');}else if($totSurvMap.ui.year=='2020'){$totSurvMap.ui.getMataDataUrl('FS0625');}}return false;">통계표 보기</a>
			</div>
		</div>	
	</div>
	<div class="dashboard__box" id="owner-career-chart-container">
		<h3 data-id="text-year" data-append-text="년 경영주 어업경력기간별 어가" data-title-unit="(단위 : 가구)"></h3>
		<div class="dashboard__chart" style="height: 250px;">
			<div id="owner-career-chart"></div>
		</div>
		<div data-type="tooltip" class="modal dashboard-layer" style="display:none;">
		</div>
		<div class="dashboard__chart__con">
			<p>출처: 통계청, 「농림어업총조사」</p>
			<div class="cf">
<!-- 				<a href="#" data-save-image="true" data-confirm-text="해당 차트 이미지를 저장하시겠습니까?" data-target="owner-career-chart-container">차트 저장</a> -->
				<a href="#" onclick="if($totSurvMap.ui.themeData[$totSurvMap.ui.theme].fisheryType=='sea'){if($totSurvMap.ui.year=='2015'){$totSurvMap.ui.getMataDataUrl('FS0119');}else if($totSurvMap.ui.year=='2010'){$totSurvMap.ui.getMataDataUrl('FS0417');}else if($totSurvMap.ui.year=='2020'){$totSurvMap.ui.getMataDataUrl('FS0618');}}else {if($totSurvMap.ui.year=='2015'){$totSurvMap.ui.getMataDataUrl('FS0178');}else if($totSurvMap.ui.year=='2010'){$totSurvMap.ui.getMataDataUrl('FS0476');}}return false;">통계표 보기</a>
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