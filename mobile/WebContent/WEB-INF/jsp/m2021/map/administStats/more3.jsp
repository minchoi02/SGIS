<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta name="title" content="행정통계 시각화 지도">
	<meta name="sub-title" content="임금근로 일자리 동향">
	<style>
		.no__display{
			display:none;
		}
		.dashboard__tooltip {
			display:none;
		}
	</style>
<script>
$(document).ready(function() {
	srvLogWrite('O0', '14', '02', '01', '임금근로 일자리 동향', '');
	$(".data-year").text("2022년2분기");
});
</script>
</head>
<body>
<style>
.dashboard__statistics > ul > li { border:1px solid #e0e0e0; border-radius:5px; }

</style>
	<div class="dashboard__statistics" style="top: 50px;">	<!-- 2022-12-16 top: 50px 추가 -->
	    <h3 class="dashboard__statistics__title">임금근로 일자리 동향 총괄</h3>
	    <ul>
	        <li style="width:100%;">
	            <div>
	                <h4>총 임금근로 일자리 수 <a href="#n" id="infoBtn" class="notice notice--gray"></a></h4>
	                <p><span data-id="DT_1FL_7001-total" class="total-num">-</span>만개</p>
	                <p>전년 동기 대비<span data-id="DT_1FL_7001-rt" class="state">-%</span></p>
	            </div>
	            <div id="more3Info" class="dashboard__tooltip">
	                <div>
	                     <p>매분기 중간월(1개월간) 기준임</p>
	                     <a href="#n" class="btn__cancel" id="more3InfoClose"><span class="btn-close btn-close--black"></span></a>
	                </div>
	             </div>
	        </li>
	    </ul>
	</div>
	<div class="dashboard__box p0" style="top: 50px;">	<!-- 2022-12-16 top: 50px 추가 -->
	    <ul id="main-tab" class="administration__tab col-3 mb15">
	        <li data-tab-function="mainTab01" class="on">전체</li>
	        <li data-tab-function="mainTab02">산업별</li>
	        <li data-tab-function="mainTab03">기타 특성</li>
	    </ul>
	    <div data-id="main-tab-content" class="administration__tab__con">
	        <div class="pb15 mb15 px10 border-b-line" id="administration__sub-tab__con01">
	            <h3>임금근로 일자리 규모 및 전년동기 대비 증감</h3>
	            <div class="dashboard__chart" id="more3Chart1" style="height: 250px; background-color: #ddd;"></div>
	            <div class="dashboard__chart__con">
	                <p>출처: 통계청,「임금근로 일자리 동향」</p>
	                <div class="cf">
	                    <a href="#n" class="show-statistics">통계표 보기</a>
	                </div>
	            </div> 
	        </div>
	        <div class="pb15 mb15 px10">
	            <h3 data-id="text-year" data-append-text="분기 임금근로 일자리 형태별 분포""></h3>
	            <div class="dashboard__chart" id="more3Chart2" style="height: 250px; background-color: #ddd;"></div>
	            <div class="dashboard__chart__con">
	                <p>출처: 통계청,「임금근로 일자리 동향」</p>
	                <div class="cf">
	                    <a href="#n" class="show-statistics">통계표 보기</a>
	                </div>
	            </div> 
	        </div>
	    </div>
	    <div data-id="main-tab-content" class="administration__tab__con no__display">
	        <div class="pb15 mb15 px10 border-b-line">
	            <h3 data-id="text-year" data-append-text="분기 산업대분류별 임금근로 일자리 증감" data-title-unit="(단위:만개, 전년동기대비)"></h3>
	            <div class="dashboard__chart" id="more3Chart3" style="height: 700px; background-color: #ddd;">
	            </div>
	            <div class="dashboard__chart__con">
	                <p>출처: 통계청,「임금근로 일자리 동향」</p>
	                <div class="cf">
	                    <a href="#n" class="show-statistics">통계표 보기</a>
	                </div>
	            </div> 
	        </div>
	        <div class="pb15 mb15 px10 border-b-line">
	            <h3 data-id="text-year" data-append-text="분기 제조업 중분류별 임금근로 일자리 증감" data-title-unit="(단위:만개, 전년동기대비)"></h3>
	            <div class="dashboard__chart" id="more3Chart4" style="height: 250px; background-color: #ddd;"></div>
	            <div class="dashboard__chart__con">
	                <p>출처: 통계청,「임금근로 일자리 동향」</p>
	                <div class="cf">
	                    <a href="#n" class="show-statistics">통계표 보기</a>
	                </div>
	            </div> 
	        </div>
	        <div class="pb15 mb15 px10">
	            <h3 data-id="text-year" data-append-text="분기 서비스업 중분류별 임금근로 일자리 증감" data-title-unit="(단위:만개, 전년동기대비)"></h3>
	            <div class="dashboard__chart" id="more3Chart5" style="height: 250px; background-color: #ddd;"></div>
	            <div class="dashboard__chart__con">
	                <p>출처: 통계청,「임금근로 일자리 동향」</p>
	                <div class="cf">
	                    <a href="#n" class="show-statistics">통계표 보기</a>
	                </div>
	            </div> 
	        </div>
	    </div>
	    <div data-id="main-tab-content" class="administration__tab__con no__display">
	        <div class="pb15 mb15 px10 border-b-line">
	            <h3 data-id="text-year" data-append-text="분기 근로자 성별 임금근로 일자리"></h3>
	            <div class="dashboard__chart" id="more3Chart6" style="height: 330px; background-color: #ddd;"></div>
	            <div class="dashboard__chart__con">
	                <p>출처: 통계청,「임금근로 일자리 동향」</p>
	                <div class="cf">
	                    <a href="#n" class="show-statistics">통계표 보기</a>
	                </div>
	            </div> 
	        </div>
	        <div class="pb15 mb15 px10 border-b-line">
	            <h3 data-id="text-year" data-append-text="분기 근로자 연령대별 임금근로 일자리"></h3>
	            <div class="dashboard__chart" id="more3Chart7" style="height: 400px; background-color: #ddd;"></div>
	            <div class="dashboard__chart__con">
	                <p>출처: 통계청,「임금근로 일자리 동향」</p>
	                <div class="cf">
	                    <a href="#n" class="show-statistics">통계표 보기</a>
	                </div>
	            </div> 
	        </div>
	        <div class="pb15 mb15 px10">
	            <h3 data-id="text-year" data-append-text="분기 기업 조직형태별 임금근로 일자리"></h3>
	            <div class="dashboard__chart" id="more3Chart8" style="height: 380px; background-color: #ddd;"></div>
	               <div class="dashboard__chart__con">
	                   <p>출처: 통계청,「임금근로 일자리 동향」</p>
	                   <div class="cf">
	                       <a href="#n" class="show-statistics">통계표 보기</a>
	                   </div>
	               </div> 
	           </div>
	       </div>
	   </div>

</body>
</html> 