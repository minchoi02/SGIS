<%
/**************************************************************************************************************************
* Program Name	: 총조사시각화 Main
* File Name		: totSurvMain.jsp
* Comment		: 
* History		: 
*	2020.08.03	곽제욱	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<!-- 사용자지정 컨트롤  -->
<script src="/js/common/mapDraw/Draw.Feature.js"></script>
<script src="/js/common/mapDraw/Draw.Control.Manager.js"></script>
<script src="/js/common/mapDraw/draw/Draw.Cricle.js"></script>
<script src="/js/common/mapDraw/draw/Draw.Rectangle.js"></script>
<script src="/js/common/mapDraw/draw/Draw.Polygon.js"></script>
<script src="/js/common/mapDraw/Draw.Control.Overlay.js"></script>
<script src="/js/common/mapDraw/measure/Draw.AreaMeasure.js"></script>
<script src="/js/common/mapDraw/measure/Draw.DistanceMeasure.js"></script>
<script src="/js/common/mapDraw/Draw.Control.Distance.js"></script>
<script src="/js/common/mapDraw/Draw.Control.Poi.js"></script>
<script src="/js/common/mapDraw/Draw.Control.Measure.js"></script>
<style>
	table{border:1px solid gray; border-collapse: collapse; border-spacing: 0}
	.td1, .td2, .td3{boarder: 1px solid gray;}
	
	.tablePop {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index:10000;
		margin:auto; 
		height: 420px;
		opacity: 1;
	}

	.Back_modal{
	
	}
</style>
<!-- 대쉬보드 START-->
<div class="conWrap" style="min-width:1580px;"> <!-- 2020.12.07[신예리] 익스플로러 반응형 레이아웃 깨짐 현상으로 인한 width값 변경 -->
<div>
<div class="con-LTms">
<!-- 20201023 신예리 화면단 배치 변경 START --> 
	<div class="col mb10" id="tiemTotalPopulationDiv">
		<div class="TmsTitrow bb pb10">	
              <h5 class="colTit">총인구</h5>
              <div class="iconBox" style="margin-right: 5px; display:inline-flex;"> <!-- 2020.11.16[신예리] margin-top 제거 -->
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button><!-- 20201103 박은식 title 변경 -->
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
              <span class="tit_labelTms">단위:(명)</span>
         </div> 
            <div class="sampleArea" id="tiemTotalPopulationChart"> 
          	</div>
      </div>
      
      <div class="col mt10 mb10" id="timeRankPopulationDiv"> 
      	 <div class="TmsTitrow bb pb10">	
              <h5 class="colTit" id="rankChartTitle">총인구 광역시도 중 랭킹</h5>
              <div class="iconBox" style="margin-right: 5px; display:inline-flex;"> <!-- 2020.11.16[신예리] margin-top 제거 -->
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button><!-- 20201103 박은식 title 변경 -->
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    		  </div>
              <span class="moreInfoBtnWrap" style="position: absolute; left:140px; margin-top:0;"><button class="moreInfoBtn" type="button" id="totalSido"></button></span>
         </div>    
            <div class="sampleArea" id="timeRankPopulationChart">
            </div>
      </div>
      
      <div class="col mt10 mb10"  id="tiemGenderPopulationDiv">
      	   <div class="TmsTitrow bb pb10">
              <h5 class="colTit">남녀 성비 비율 변화</h5>
              <div class="iconBox" style="margin-right: 5px; display:inline-flex;"> <!-- 2020.11.16[신예리] margin-top 제거 -->
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button><!-- 20201103 박은식 title 변경 -->
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    		  </div> 
              <span class="moreInfoBtnWrap" style="position: absolute; left: 117px; margin-top:0;"><button class="moreInfoBtn" type="button" id="genderRatio"></button></span>
           </div>   
            <div class="sampleArea" id="tiemGenderPopulationChart">
            </div>
      </div>
      
      <div class="col mt10 mb10" id="timeForeignPopulationDiv">
     	   <div class="TmsTitrow bb pb10">
              <h5 class="colTit">외국인 수 변화</h5>
              <div class="iconBox" style="margin-right: 5px; display:inline-flex;"> <!-- 2020.11.16[신예리] margin-top 제거 -->
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button><!-- 20201103 박은식 title 변경 -->
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    		  </div>
              <span class="moreInfoBtnWrap" style="position: absolute;left: 90px; margin-top:0;"><button class="moreInfoBtn" type="button" id="foreignPopulation"></button></span>
              <span class="tit_labelTms">단위:(명)</span>
           </div>   
           <div class="sampleArea" id="timeForeignPopulationChart">
           </div>
       <!-- 20201023 신예리 화면단 배치 변경 END -->
      </div>
         
      </div> 
	   
      <div class="con-RTms">
      
     	 <div style="position: relative;">
     	 <button type="button" class="btn_resultView" title="윱합결과보기" onclick="$totSurvTmsMap.ui.doCombineMap();"></button> <!-- 2020.11.03[신예리] 버튼 title 수정 -->
	      <div class="col-SubLTms" id="leftMapDiv">
	      <!-- 20201203 박은식 - 상단 path 변경 START -->
	      <h5 class="colTitMap" style="display:inline">지도</h5>
	      <span class='ColTmsDataSelectSido' id="areaDiv" style="display:inline">전국</span>
	      <!-- 2020.12.08[신예리] 지역이동 버튼 추가 START -->
	      <!-- <span class="ColTmslocationBtn">지역이동</span> -->
	      <!-- 2020.12.08[신예리] 지역이동 버튼 추가 END -->
	      <!-- 20201203 박은식 - 상단 path 변경 EMD -->
	      <!-- <span class="detailTit-label" name="itemSggNm" onclick="$populationTms.ui.areaPopupToggle(true)">전국</span>  --> <!-- 20201204 박은식 전국 버튼 (개발시에 주석 삭제)  -->
	      <div class="MapYearselectbox YearSelectBox">
			<select id="selLeftYear" style="display : none">
	                <option value="2019년">2019</option>
	                <option value="2018년">2018</option>
	                <option value="2017년" selected="">2017</option>
	                <option value="2016년">2016</option>
	                <option value="2015년">2015</option>
	        </select>
	        <div id="leftYearearRadio" style="margin-top:30px;"> <!-- 20201203 박은식 - 연도 선택 버튼이 상단으로 올라가 margin 추가 -->
	        </div>
	      </div>  
	      <div> <!-- 20201023 신예리 class 제거-->
      			<div class="Map" id="mapArea">
      				<button class="mapInfo" style="display:none">개방형지도란?</button>
      				<!-- 맵영역 Start-->
      				<div class="mapContents" id="mapRgn_1" style="height: 525px;"></div>
      				<!-- 맵영역 end --> 
      				<div class="ControllBtnWrap">
      				<!-- 2020.11.03[신예리] 버튼 title 수정 START -->
      					<button type="button" class="select" id="lSelect" title="지도 선택" style="display: none;"></button>
	      				<button type="button" class="zoom" id="lZoom" title="지도 확대" style="display: none;"></button>
	               	 	<button type="button" class="out" id="lOut" title="지도 축소" style="display: none;"></button>
	               	<!-- 2020.11.03[신예리] 버튼 title 수정 END --> 	
      				</div>
  				</div>
	      </div> 
      </div> 
      <div class="col-SubRTms" id="rightMapDiv">
      <!-- 20201203 박은식 - 상단 path 변경 START -->
      <h5 class="colTit" style="display:inline">지도</h5>
      <span class='ColTmsDataSelectSido' id="areaDiv" style="display:inline">전국</span>
      <!-- 20201203 박은식 - 상단 path 변경 END -->
      <div class="MapYearselectbox YearSelectBox" >
              <select id="selRightYear"  style="display : none">
                <option value="2019년">2019</option>
                <option value="2018년">2018</option>
                <option value="2017년" selected="">2017</option>
                <option value="2016년">2016</option>
                <option value="2015년">2015</option>
              </select>
             <div id="rightYearearRadio" style="margin-top:30px;"> <!-- 20201203 박은식 - 연도 선택 버튼이 상단으로 올라가 margin 추가 -->
              
	        </div>
       </div>
      <button onclick="" class="downloadBtn" title="다운로드 버튼" style="display:none">다운로드 버튼</button>
      <div> <!-- 20201023 신예리 class 제거-->
      			<div class="Map" id="mapArea2">
      				<button class="mapInfo" style="display:none">개방형지도란?</button>
      				<!-- 맵영역 Start-->
      				<div class="mapContents" id="mapRgn_2" style="height: 525px;"></div>
      				<!-- 맵영역 end -->
      				<div class="ControllBtnWrap">
      					<button type="button" class="mapExport" id="rExport" title="지도 확장" style="display: none;"></button>
      					<button type="button" class="select" id="rSelect" title="지도 선택" style="display: none;"></button>
	      				<button type="button" class="zoom" id="rZoom" title="지도 확대" style="display: none;"></button>
	               	 	<button type="button" class="out" id="rOut" title="지도 축소" style="display: none;"></button>
      				</div>    			
  			</div>
      </div> 
	</div>
	</div>
	
	<div class="col-SubLTms mt10" id="leftChartDiv"> 
          <div class="captionArea bb pb5" id="manwoman1">
              <span class="male"></span><p class="male">남자(명)</p>
              <span class="female"></span><p class="female">여자(명)</p>
            <!-- 2020.10.19[신예리] iconBox a 링크 버튼으로 변경 및 margin값 추가 START --> 
            <div class="iconBox" style="margin-right: 0;display: inline-flex;"> <!-- 20201023 신예리 style 추가-->
            <!-- 2020.10.28  차트 저장 버튼 추가 -->
             <button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
             <!-- <button type="button" id="chartArea1" class="Conchartgraph on" title="차트"></button> --> <!-- 20201028 박은식 더이상 사용하지 않는 버튼 삭제 -->
             <button type="button" id="tableArea1" class="ConchartTable" title="표"></button>
          	</div>
          </div> 
          <div class="captionArea" id="maxmin1" style="display:none">
               <span class="max"></span><p class="maxmin">최대값</p>
               <span class="min"></span><p class="maxmin">최솟값</p>
            <div class="iconBox" style="margin-right: 0; display: inline-flex;"> <!-- 20201023 신예리 style 추가-->
             <button type="button" id="chartArea1" class="Conchartgraph" title="차트"></button>
             <button type="button" id="tableArea1" class="ConchartTable on" title="표"></button>
          	</div>
          	<!-- 2020.10.19[신예리] iconBox a 링크 버튼으로 변경 및 margin값 추가 END -->  
            </div> <!-- 20201023 신예리 class 제거-->
            	<div class="sampleAreaBtm leftChart" id="leftTimeGenderAgePopulationChart" > <!-- left chart 생성부분 -->
            	</div>
      </div> 
      <div class="col-SubRTms mt10" id="rightChartDiv"> <!-- 2020.10.29[신예리] mb10클래스 제거 -->
           <div class="captionArea bb pb5" id="manwoman2" >
              <span class="male"></span><p class="male">남자(명)</p>
              <span class="female"></span><p class="female">여자(명)</p>
            <!-- 2020.10.19[신예리] iconBox a 링크 버튼으로 변경 및 margin값 추가 START -->   
            <div class="iconBox" style="margin-right: 0;display: inline-flex;"> <!-- 20201023 신예리 style 추가-->
             <!-- 2020.10.28  차트 저장 버튼 추가 -->
             <button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    		 <!-- <button type="button" id="chartArea2" class="Conchartgraph on" title="차트"></button> --> <!-- 20201028 박은식 더이상 사용하지 않는 버튼 삭제 -->
             <button type="button" id="tableArea2" class="ConchartTable" title="표"></button>
          	</div>
          </div> 
           <div class="captionArea" id="maxmin2" style="display:none">
               <span class="max"></span><p class="maxmin">최대값</p>
               <span class="min"></span><p class="maxmin">최솟값</p>
            <div class="iconBox" style="margin-right: 0;display: inline-flex;"> <!-- 20201023 신예리 style 추가-->
             <button type="button" id="chartArea2" class="Conchartgraph" title="차트"></button>
             <button type="button" id="tableArea2" class="ConchartTable on" title="표"></button>
          	</div>
          	<!-- 2020.10.19[신예리] iconBox a 링크 버튼으로 변경 및 margin값 추가 END --> 
            </div><!-- 20201023 신예리 class 제거-->
               <div class="sampleAreaBtm rigthChart" id="rightTimeGenderAgePopulationChart"><!-- right chart 생성부분 추가 -->
               </div>
               <div class="rightTable" id="rightTable" style="display:none"><!-- right table 생성부분 -->
               </div>
      </div>
     </div>
     <!-- end con-RTms -->
  </div>
  
	    <div class="popWrap tablePop" style="display:none; width:936px;" id="leftTableCard"> <!-- 2020.11.11[신예리] mt10 mb10 클래스 삭제 -->
	  		<div class="popTit" style="background-color: #363A46;">
				<h1>연령별인구차트</h1>
				<!-- 2020.10.26 신예리 최대 최소값 위치변경 및 class변경 START-->
				<div class="minMaxArea">
				 <span class="max"></span><p class="maxmintit">최대값</p>
                 <span class="min"></span><p class="maxmintit">최솟값</p>
                 </div>
				<!-- 2020.10.26 신예리 최대 최소값 위치변경 및 class변경 END> -->
				<button type="button" class="popcloseBtn" id="closePopup" title="연령별인구차트 팝업 닫기"></button>
			</div> 
			<div class="popCon leftTable" id="leftTable" style="height:auto;"><!-- left table 생성부분 추가 --> 
			</div>
		</div>
		<div class="Back_modal" id="modal" style="display:none;">
 		 </div>
		  <div class="popWrap tablePop" style="display:none" id="rightTableCard"> <!-- 2020.11.11[신예리] mt10 mb10 클래스 삭제 -->
		  <button type="button" class="popcloseBtn" onclick="$('#rightTableCard').hide()" title="연령별인구차트 팝업 닫기"></button> 
			<div class="popCon rightTable" id="rightTable" style="height:auto;"><!-- left table 생성부분 추가 -->
			
			</div>
		</div>
		</div>
		
  <!-- 대쉬보드 END-->
  <!-- 도움말 START -->
<div class="ToolTip" id="helpTooltip" style="background-color:#fff">

</div>
<!-- 도움말 END -->


<!-- 융합팝업창 -->
<div class="popupWrapTms none" style="display:none;width:1000px !important; height:750px !important" id="combineMap"> <!-- 20201204 박은식 heigth 고정 --> <!-- 2020-12-09 [곽제욱] width 값 조정 --> <!-- 20210310 박은식 크기 수정 -->
	<div class="dialogbox pwType" style="display:block;">
		<div class="policyStaticBox">
	   		<div class="popTit" style="background-color: #363A46;">
	   			<h1 style="width:30%"><span id="popupTitle">총인구 인구현황 변화</span></h1> 
	   			<button type="button" class="imgSaveTmsBtn" name="imgSaveBtn" title="이미지 저장" style="/* filter: invert(100%); */ height: 15px; width: 16px; margin-left: 5px; padding-bottom: 3px; margin-left:62%" id="combo"></button> <!-- 20201203 박은식 - 융합보기 이미지 다운로드 버튼 생성 --><!-- 2020.12.11 [신예리] - 융합보기 이미지 다운로드 버튼 filter 속성 주석 및 클래스 변경 -->
				<button type="button" class="popcloseBtn" onclick="javascript:$populationTmsCombineMap.event.popupClose();" title="팝업 닫기"></button>
	   		</div>
	   		<div class="popConMap">
	   			<div class="policyMapArea" >
	   				<div class="mapContents" id="mapCombine" style="height: 703px; width: 983px;"></div> <!-- 20210310 박은식 크기 수정 -->
	   			</div> 
	   			
	   		</div>
	   	</div>  
   	</div>
</div>


<!-- 2020-10-28 [주형식] 융합보기 툴팁  추가-->
<div id="mapToolTipTable2" style="background: rgba(255, 255, 255, 1); border-radius: 10px;border-width: 4px; display: block; position: absolute;  display:none; z-index: 99999;">
	<table style="margin:10px;">
		<tbody>
			<tr>
				<td colspan="3" class="admName" style="font-size: 14px; font-weight: bold;" id="toolAdmNm2">경기도</td> <!-- 20201202 박은식 color 삭제 -->
			</tr>
			<tr style="height:5px">
			</tr>
			<tr>
				<td id="toolAdmData2">13,300,900 (명)</td>
			</tr>
		</tbody>
	</table>
</div>
<!-- 2020-10-06 [곽제욱] z-index 적용을 위한 맵툴팁 영역 END -->