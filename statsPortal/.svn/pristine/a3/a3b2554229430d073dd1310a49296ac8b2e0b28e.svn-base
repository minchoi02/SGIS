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
<!-- 대쉬보드 START-->
<div class="conWrap" style="min-width: 1500px;"> <!-- 2020.10.20[신예리] min-width 값 추가 -->
	<div class="con-L">
		<div class="col">
      		<h5 class="colTit bb pb10" id="totHouseHoldNumber">총 가구 수</h5>
	      	<div style="display: inline-block;">
	        	<div class="dataAreatit" id="totHouseHold">
	          		<h1>51,629,512</h1>
	          		<span class="ml5">가구</span>
	        	</div>
		        <div class="Card" id="areaHouseHold">
		        
		        </div>
		        <div class="cardClick" id="areaPopulation_result" style="display: none;">
	    		</div>
	  		</div>
		</div>
		
		<!-- 2020.09.16[신예리] Rank span mt10 class 삭제 START -->
		<div class="col mt10"><!-- 2020.10.20[신예리] mb10 class 삭제 -->
  			<h5 class="colTit">가구 현황</h5>
  			<div>
    			<div  class="numberCard mt10" style="min-height: 110px;">
    				<div id="infoArea1" style="display:none"></div>
    				<div id="infoArea2">
	  					<p class="numbertit" id="houseHoldRanking">전국</p>
	  					<button class="moreInfoBtn" type="button"></button>
	  					<div class="row">
	    					<h1 id="houseRank">000</h1><span class="ml5">번째</span>
	  					</div>
	  					<p class="numberInfo mb10" id="houseChangeRt">전년보다 00% 계단 상승</p>
	  					<div class="Rangecontainer mt20" id="total_range" style="display:none">
	                  	  <span class="rangelabel00">1번</span>
		                  <input type="range" min="1" max="17" value="1" step="1" class="Rangeslider" id="total_rank">
		                  <span class="rangelabel00">17번</span>
		                  <div class="rangeValue" id="rangeV1"><span>7번째</span></div>
	                  	  <div class="rangeValue" id="rangeV2"><span>7번째</span></div>
	                  	  <div class="rangeValue" id="rangeV3"><span>7번째</span></div>
	                	</div>		
                	</div>
				</div>
				<div  class="numberCard mt10" style="min-height: 110px;">
  					<p class="numbertit" id="houseHoldRatioRanking">전국 가구수 증감</p>
  					<button class="moreInfoBtn" type="button" id="houseHoldRatio"></button>
	  				<div class="row">
	    				<h1 id="houseTotalRatioRt"></h1><span class="ml5">가구</span>
	  				</div>
	  				<p class="numberInfo mb10" id="houseRatioChangeRt">전년도 대비</p>
	  				<div class="Rangecontainer mt20" id="totalRatio_range" style="display:none">
                  	  <span class="rangelabel00">1번</span>
	                  <input type="range" min="1" max="17" value="1" step="1" class="Rangeslider" id="totalRatio_rank">
	                  <span class="rangelabel00">17번</span>
                	</div>
				</div>
				<div class="numberCard mt10" style="min-height: 110px;">
			        <p class="numbertit" id="oneHouseRanking">전국 1인 가구의 수</p>
			        <button class="moreInfoBtn" type="button" id="oneHouse"></button>
			        <div class="row">
			        	<h1 id="onePeple">1,651,561</h1><span class="ml5">가구</span>
			        </div>
			        <p class="numberInfo mb10" id="oneHouseChangeRt">전년도 대비</p>
			        <div class="Rangecontainer mt20" id="oneHouse_range" style="display:none">
                  	  <span class="rangelabel00">1번</span>
	                  <input type="range" min="1" max="17" value="1" step="1" class="Rangeslider" id="oneHouse_rank">
	                  <span class="rangelabel00">17번</span>
                	</div>
     			</div>
    		</div>
  		</div>
  		<!-- 2020.09.16[신예리] Rank span mt10 class 삭제 END -->
  		
	</div>
	<div class="con-R" style="min-width:1158px;"><!-- 20200913 박은식 min값 설정 (추후변경 가능) -->
  		<div class="col-SubL">
    		<h5 class="colTitMap">지도</h5> <!-- 2020.10.26[신예리] 클래스 변경 -->
    		<span class='ColDataSelectSido' id="areaDiv" style="display:inline">전국</span>
    		<span class='ColDataSelectTit' id="itmDiv" style="display:none"></span>
    		<button type="button" class="downloadBtn" title="지도 이미지 저장"></button>
    		<div>
      			<div class="Map totSurvMap" id="mapArea">
      				<!-- <button class="mapInfo" style="display:none">개방형지도란?</button>  -->
      				<div class="mapContents" id="mapRgn_1" style="height: 560px;"></div><!-- 맵영역 -->
      				<div class="ControllBtnWrap"> <!-- 2020-09-03 [신예리] 지도 컨트롤 버튼 추가 (버튼 및 영역 숨길 시 class에 none적용) -->
      					<button type="button" class="mapExport" title="지도 확장"></button>
	      				<button type="button" class="zoom" id="pZoom" title="지도 확대"></button>
	               	 	<button type="button" class="out" id="pOut" title="지도 축소"></button>
      				</div>
    			</div>
  			</div>
		</div>
		<div class="col-SubR" id="highChartDiv1Wrap" style="min-width:650px;"><!-- 20200913 박은식 min값 설정 (추후변경 가능) -->
	  		<div class="row bb pb10">
	    		<h5 class="colTit mr10">1인 가구 거처 종류</h5><!-- 거주지이동 첫 차트 -->
				<div class="iconBox"> <!-- 2020.10.26[신예리] style 삭제 -->
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label">단위: 가구</span> <!-- 2020.10.26[신예리] 위치 변경 -->
			</div>
			<div style="min-height: 141px; width: 100%;">
					<div id="one_people">
					</div>
					<div class="chartToolTip">
					</div>
				</div>	
		</div>
		<div class="col-SubR mt10" id="highChartDiv2Wrap" style="min-width:650px;"><!-- 20200913 박은식 min값 설정 (추후변경 가능) -->
	  		<div class="row bb pb10">
	    		<h5 class="colTit mr10">65세 이상 가구의 수</h5><!-- 거주지이동 첫 차트 -->
				<div class="iconBox"> <!-- 2020.10.26[신예리] style 삭제 -->
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label">단위: 가구</span> <!-- 2020.10.26[신예리] 위치 변경 -->
			</div>
			<div style="height: 133px; width: 100%;">
					<div id="age65over">
					</div>
					<div class="chartToolTip">
					</div>
				</div>	
		</div>
		<div class="col-SubR mt10" id="highChartDiv3Wrap" style="min-width:650px;"><!-- 20200913 박은식 min값 설정 (추후변경 가능) -->
	  		<div class="row bb pb10">
	    		<h5 class="colTit mr10">가구별 자녀의 수</h5><!-- 거주지이동 첫 차트 -->
				<div class="iconBox"> <!-- 2020.10.26[신예리] style 삭제 -->
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label">단위: 가구</span> <!-- 2020.10.26[신예리] 위치 변경 -->
			</div>
			<div style="height: 135px; width: 100%;">
					<div id="children">
					</div>
					<div class="chartToolTip">
					</div>
			</div>	
		</div>
	  	<div class="col-SubF mt10" id="highChartDiv4Wrap" style="min-width:1135px;">
		    <div class="row bb pb10">
	      		<h5 class="colTit mr10">주택</h5><!-- 총조사인구 첫 차트 -->
	      		<div class="iconBox"> <!-- 2020.10.26[신예리] style 삭제 -->
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<!-- TODO  2020.10.28 차트변경되면.. 이미지 보이도록 수정 필요  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>  
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label">단위: 가구</span> <!-- 2020.10.26[신예리] 위치 변경 -->
			</div>
			<div style="margin-left: 23px; height: 170px; width: 100%;">
					<div id="houseHoldTimeChart">
					</div>
					<div class="chartToolTip">
					</div>
			</div>	
		</div>

	</div>
</div>
  <!-- 대쉬보드 END-->