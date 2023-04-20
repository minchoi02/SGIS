<%
/**************************************************************************************************************************
* Program Name	: 총조사시각화 가구총조사 Main
* File Name		: familyDash.jsp
* Comment		:
* History		:
*	2020.08.18	한광희	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<!-- 대쉬보드 START-->
<div class="conWrap" style="min-width: 1500px;">
	<div class="con-L">
		<div class="col">
      		<h5 class="colTit bb pb10">총 농가 수</h5>
	      	<div style="display: inline-block;">
	        	<div class="dataAreatit">
	          		<h1>0</h1>
	          		<span class="ml5">가구</span>
	        	</div>
		        <div class="card" id="areaFarm">
		        </div>
		        <div class="cardClick" id="areaFarm_result" style="display: none;">
	    		</div>
	  		</div>
		</div>

		<div class="col mt10">
  			<h5 class="colTit">농가 현황</h5>
  			<div>
    			<div  class="numberCard mt10" style="min-height: 110px;">
  					<p class="numbertit" id="totFarmRatioRtRanking">전국 전주기 대비 농가수</p>
  					<button class="moreInfoBtn" type="button" id="farmRatioHelp"></button>
  					<div class="row" id="totFarmRatio">
    					<h1>0</h1><span class="ml5">가구</span>
  					</div>
  					<p class="numberInfo mb10" id="totFarmRatioRt">전주기 대비 00%</p> <!-- 20201119 박은식 ' 삭제 -->
  					
				</div>
				<div class="numberCard mt10" style="min-height: 110px;">
			        <p class="numbertit" id="totalFarmRanking">전국 농가 인구</p>
			        <button class="moreInfoBtn" type="button" id="farmNumberHelp"></button>
			        <div class="row">
			        	<h1 id="houseNm">0</h1><span class="ml5">명</span>
			        </div>
			        <p class="numberInfo mb10" id="houseNmRt">전주기 대비 00%</p> <!-- 20201120 박은식 ' 삭제 -->
			        <div class="Rangecontainer mt20" id="totalFarm_range" style="display:none">
		        		<span class="rangelabel00">1번</span>
	                	<input type="range" min="1" max="17" value="1" step="1" class="Rangeslider" id="totalFarm_rank">
	                	<span class="rangelabel00 fR">17번</span>
	                	<div class="rangeValue" id="rangeV3"><span>7번째</span></div>
			        </div>
     			</div>
     			<div  class="numberCard mt10" style="min-height: 110px;">
  					<p class="numbertit" id="oldRtRanking">전국 농가 인구 중 고령인구</p>
  					<button class="moreInfoBtn" type="button" id="farmOldAgeHelp"></button>
	  				<div class="row">
	    				<h1 id="oldNum">0</h1><span class="ml5">명</span>
	  				</div>
	  				<p class="numberInfo mb10" id="oldRt">농가인구 중 00%</p>
				</div>
    		</div>
  		</div>
	</div>
	<div class="con-R" style="min-width:1455px;"> <!-- 2020.11.13[신예리] 자료출처 버튼 추가로 인한 min-width값 변경 -->
  		<div class="col-SubL">
    		<h5 class="colTitMap">지도</h5> <!-- 2020.10.26[신예리] 클래스 변경 -->
    		<span class='ColDataSelectSido' id="areaDiv" style="display:inline">전국</span>
    		<span class='ColDataSelectTit' id="itmDiv" style="display:none"></span>
    		<button type="button" class="downloadBtn" title="지도 이미지 저장"></button>
    		<div>
      			<div class="Map totSurvMap" id="mapArea" style="height: 590px;">
      				<div class="mapContents" id="mapRgn_farm" style="height: 590px;"></div><!-- 맵영역 -->
      				<div class="ControllBtnWrap"> <!-- 2020-09-03 [신예리] 지도 컨트롤 버튼 추가 (버튼 및 영역 숨길 시 class에 none적용) -->
      					<button type="button" class="mapExport" title="지도 확장"></button>
	      				<button type="button" class="zoom" id="pZoom" title="지도 확대"></button>
	               	 	<button type="button" class="out" id="pOut" title="지도 축소"></button>
      				</div>
    			</div>
  			</div>
		</div>

		<div class="col-SubDivWrap mb10"> 
		<div class="col-SubDivL" id="ownerFarmDiv">
	  		<div class="row bb pb10" >
	    		<h5 class="colTit mr10">경영형태별 농가</h5>
	    		<!-- 2020-11-17 [곽제욱] 농총과 요청으로 노지+시설 데이터합산으로 변경으로 인한 주석 START -->
	    		<!-- <div class="farmKindBtnWrap">	
					<button type="button" class="farmKindBtnTxt on" name="farmKindBtn"
						id="farmLand" style="cursor: pointer" title="노지">노지</button>
					<button type="button" class="farmKindBtnTxt " name="farmKindBtn"
						id="farmFacility" style="cursor: pointer" title="시설">시설</button>
				</div> -->
				<!-- 2020-11-17 [곽제욱] 농총과 요청으로 노지+시설 데이터합산으로 변경으로 인한 주석 END -->
	  			<div class="iconBox">
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label" id="ageUnit">단위: 가구</span>
			</div>
			<div style="text-align: center; color: white;padding: 0;overflow: auto; min-height: 285px;" id="ownerKindFarm">
				<!-- <img src="/images/totSurv/graphsample_04.png" style="width: 100%; object-fit: contain; overflow: hidden;" alt=""> -->
	  		</div>
		</div>
		
		<div class="col-SubDivR" id="farmPayDiv">
		    <div class="row bb pb10"> 
	      		<h5 class="colTit mr10">농축산물 판매금액별 농가</h5>
	  			<div class="iconBox">
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label" id="ageUnit">단위: 가구</span>
			</div>
			<div style="min-height: 285px; text-align: center; overflow-x: auto;" id=farmPay><!-- 20201016 박은식 마지진 제거 -->
				<!-- <img src="/images/totSurv/graphsample_05.png" style="width: 100%; object-fit: contain; overflow: hidden;" alt=""> -->
	        </div>
		</div> 
	  	</div>
	  	
		<div class="col-SubR" id="ownerScaleDiv">
  			<div class="row bb pb10" >
  				<h5 class="colTit mr10">경지 규모별 농가</h5> <!-- 2020-11-17 [곽제욱] 농총과 의견으로 경영주 규모별 농가에서 경지 규모별 농가로 수정 -->
    			<div class="iconBox">
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label" id="ageUnit">단위: 가구</span>
  			</div>
	  		<div class="ownerAgeforestryIE" style="height: 221px;" id="ownerScale">
<!-- 	    		<div class="dataArea"> -->
	     		<!-- <img src="/images/totSurv/graph_sample00.png" style="width: 800px;" alt=""> -->
<!-- 	     			<div /> -->
<!-- 	  			</div> -->
			</div>
		</div>
	  	<div style="position: relative; margin-bottom: 0; float: left; width: 100%; margin-right: -10px;">
		<div class="col-SubR mt10" id="Allcount01" style="margin-left: 0; margin-right: 10px;">
		    <div class="row bb pb10">
	      		<h5 class="colTit mr10">경영주 연령별 농가</h5>
	  			<div class="iconBox">
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label">단위: 가구</span>
			</div>
			<div class="mt10 all2IE" style=" height: 135px;" id="all2">
				<!-- <img src="/images/totSurv/graphsample_05.png" style="width: 100%; object-fit: contain; overflow: hidden;" alt=""> -->
	        </div>
		</div>
		
		<div class="col-SubRchart" id="Allcount00"> <!-- 2020.10.22[신예리] 클래스 변경 -->
		    <div class="row bb pb10">
	      		<h5 class="colTit mr10">경영주 농업 경력기간별 농가</h5> <!-- 20210303 박은식 차트 명칭 통일 수정 -->
	  			<div class="iconBox">
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label">단위: 가구</span>
			</div>
			<div class="mt10 all1IE" style="margin-left: 20px; height: 135px;" id="all1">
				<!-- <img src="/images/totSurv/graphsample_05.png" style="width: 100%; object-fit: contain; overflow: hidden;" alt=""> -->
	        </div>
		</div>
		</div>
		
		
		
		
		<!-- 2020.09.16[신예리] 개방형지도 popup START -->
		<div class="popupWrap none">
			<div class="popTit">
				<h1>개방형지도란?</h1>
				<button type="button" class="popcloseBtn" title="개방형지도 팝업 닫기"></button>
			</div>
			<div class="popCon">
				<p class="popTxt">SGIS(Statistical Geographic Information Service)를 기반으로</br>
				                  &nbsp;통계정보(인구주택총조사, 농림어업총조사)와 통계청에서 구축한</br>
				                  &nbsp;행정구역(읍면동) 경계에 해당하는 지리정보를 융 복합하여 제공 </br>
                                  &nbsp;하는 통계지리정보 입니다. </br>								    
								  &nbsp;- SGIS에서 제공하는 센서스 통계는 일부 특별조사구와 외국인,</br>
								  &nbsp;&nbsp;&nbsp;개인운수업등의 자료를 제외하고 최신 경계를 반영하기 때문에</br> 
								  &nbsp;&nbsp;&nbsp;KOSIS 등 공표된 통계와 차이가 있습니다.</br>
								    ※&nbsp;제외 자료인구/가구/주택 센서스 : 해외주재공간, 교도소 및</br>
								  &nbsp;&nbsp;&nbsp;소년원, 군부대,전투경찰대, 의무소방대 등의 특별 조사구와</br> 
								  &nbsp;&nbsp;&nbsp;외국인 사업체 센서스 : 개인운수업(사업장이 일정치 않음)</p>
			</div>
		</div>
		<!-- 2020.09.16[신예리] 개방형지도 popup END -->
	</div>
</div>
  <!-- 대쉬보드 END-->