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
      		<h5 class="colTit bb pb10">총 임가 수</h5>
	      	<div style="display: inline-block;">
	        	<div class="dataAreatit">
	          		<h1>0</h1>
	          		<span class="ml5">임가</span>
	        	</div>
	        	<div id="areaForestry"></div>
	  		</div>
		</div>

		<div class="col mt10">
  			<h5 class="colTit">임가 현황</h5>
  			<div  class="numberCard mt10" style="min-height: 110px;">
   				<div id="infoArea1">
   					<p class="forestryRankCap numbertit" id="forestryRanking">전국 전주기 대비 임가 수</p>
  					<button class="moreInfoBtn" type="button" id="forestryHelp"></button>
  					<div class="row" id="totalForestry"><!-- 20201020 박은식 틀어짐때문에 임시 적용 -->
    					<h1 id="forestryRank">000</h1><span class="ml5">명</span> 
  					</div>
  					<p class="numberInfo mb10" id="forestryChangeRt">2010년 대비</p>
   				</div>
   				<div id="infoArea2">
   				</div>
			</div>
  			<div class="numberCard mt10" style="min-height: 110px;">
		        <p class="numbertit" id="forestryHouseRanking">전국 임가 인구</p>
		        <button class="moreInfoBtn" type="button" id="forestryHouseHelp"></button>
		        <div class="row">
		        	<h1 id="forestryHouseDt">1,651,561</h1><span class="ml5">명</span>
		        </div>
		        <p class="numberInfo mb10" id="forestryHouseChangeRt">전주기 대비</p>
		        <div class="Rangecontainer mt20" id="forestryHouse_range" style="display:none">
               		<span class="rangelabel00">1번</span>
	                <input type="range" min="1" max="17" value="1" step="1" class="Rangeslider" id="forestryHouse_rank">
	                <span class="rangelabel00">17번</span> 
	                <div class="rangeValue" id="rangeV3"><span>7번째</span></div>
	            </div>
	   		</div>
			<div  class="numberCard mt10" style="min-height: 110px;">
 					<p class="numbertit" id="oldForestryRanking">전국 임가 인구 중 고령인구</p>
 					<button class="moreInfoBtn" type="button" id="oldForestryHelp"></button>
  				<div class="row">
    				<h1 id="oldForestryRt">100.6</h1><span class="ml5">명</span>
  				</div>
  				<p class="numberInfo mb10" id="oldForestryChangeRt">총 임가인구 중</p>
			</div>
  		</div>
	</div>
	<div class="con-R" style="min-width:1260px;"> <!-- 2020.11.13[신예리] 자료출처 버튼 변경으로 인한 최소 너비 값 변경 --> <!-- 2020.11.16[신예리] 익스플로러 레이아웃으로 인한 최소 너비 값 변경 -->
  		<div class="col-SubL map-col-SubL">
    		<h5 class="colTitMap">지도</h5> <!-- 2020.10.26[신예리] 클래스 변경 -->
    		<span class='ColDataSelectSido' id="areaDiv" style="display:inline">전국</span>
    		<span class='ColDataSelectTit' id="itmDiv" style="display:none"></span>
    		<button type="button" class="downloadBtn" title="지도 이미지 저장"></button>
    		<div>
      			<div class="Map totSurvMap" id="mapArea" style="height: 590px;">
      				<div class="mapContents" id="mapRgn_forestry" style="height: 590px;"></div><!-- 맵영역 -->
      				<div class="ControllBtnWrap"> <!-- 2020-09-03 [신예리] 지도 컨트롤 버튼 추가 (버튼 및 영역 숨길 시 class에 none적용) -->
      					<button type="button" class="mapExport" title="지도 확장"></button>
	      				<button type="button" class="zoom" id="pZoom" title="지도 확대"></button>
	               	 	<button type="button" class="out" id="pOut" title="지도 축소"></button>
      				</div>
    			</div>
  			</div>
		</div>
		
		<div class="col-SubDivWrap mb10"> 
		<div class="col-SubDivL" id="ownerForestyDiv">
	  		<div class="row bb pb10" >
	    		<h5 class="colTit mr10">경영형태별 임가</h5>
	  			<div class="iconBox">
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label" id="ageUnit">단위: 가구</span>
			</div>
			<div style="text-align: center; color: white;padding: 0;overflow: auto; min-height: 285px;" id="ownerForesty">
				<!-- <img src="/images/totSurv/graphsample_04.png" style="width: 100%; object-fit: contain; overflow: hidden;" alt=""> -->
	  		</div>
		</div>
		
		<div class="col-SubDivR" id="fsrcsSleAmountDiv">
		    <div class="row bb pb10"> 
	      		<h5 class="colTit mr10">임산물 판매금액별 임가</h5>
	  			<div class="iconBox">
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label" id="ageUnit">단위: 가구</span>
			</div>
			<div style="min-height: 285px; text-align: center; overflow-x: auto;" id=fsrcsSleAmount><!-- 20201016 박은식 마지진 제거 -->
				<!-- <img src="/images/totSurv/graphsample_05.png" style="width: 100%; object-fit: contain; overflow: hidden;" alt=""> -->
	        </div>
		</div> 
	  	</div>

		<div class="col-SubR" id="fsrcsCtvtCropsForestryDiv">
  			<div class="row bb pb10" >
  				<h5 class="colTit mr10">임산물 재배 작물별 임가</h5>
  				<div class="forestKindBtnWrap">
  					<!-- <button type="button" class="forestKindBtnTxt" name="forestKindBtn" id="forestry" style="cursor: pointer" title="전체 차트">전체</button> -->
  					<button type="button" class="forestKindBtnTxt on" name="forestKindBtn" id="fsrcsCtvtCropsForestry_0" style="cursor: pointer" title="전체">전체</button> <!--  2020-11-17 [곽제욱] 농총과 요청으로 전체 button 추가 -->
					<button type="button" class="forestKindBtnTxt" name="forestKindBtn" id="fsrcsCtvtCropsForestry_1" style="cursor: pointer" title="산나물">산나물</button> <!--  2020-11-17 [곽제욱] 농총과 요청으로 on 삭제 -->
					<button type="button" class="forestKindBtnTxt " name="forestKindBtn" id="fsrcsCtvtCropsForestry_2" style="cursor: pointer" title="약용작물">약용작물</button>
					<button type="button" class="forestKindBtnTxt " name="forestKindBtn" id="fsrcsCtvtCropsForestry_3" style="cursor: pointer" title="관상작물">관상작물</button>
					<button type="button" class="forestKindBtnTxt " name="forestKindBtn" id="fsrcsCtvtCropsForestry_4" style="cursor: pointer;" title="표고버섯">표고버섯</button>
					<button type="button" class="forestKindBtnTxt " name="forestKindBtn" id="fsrcsCtvtCropsForestry_5" style="cursor: pointer;" title="유실수">유실수</button>
				</div>
    			<div class="iconBox">
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label" id="ageUnit">단위: 가구</span>
  			</div>
	  		<div class="ownerAgeforestryIE" style="height: 223px;" id="fsrcsCtvtCropsForestry">
<!-- 	    		<div class="dataArea"> -->
	     		<!-- <img src="/images/totSurv/graph_sample00.png" style="width: 800px;" alt=""> -->
<!-- 	     			<div /> -->
<!-- 	  			</div> -->
			</div>
		</div>
	  	<div style="position: relative; margin-bottom: 0; float: left; width: 100%; margin-right: -10px;">
		<div class="col-SubR mt10" id="forestryMngmtAgeDiv" style="margin-left: 0; margin-right: 10px;">
		    <div class="row bb pb10">
	      		<h5 class="colTit mr10">경영주 연령별 임가</h5>
	  			<div class="iconBox">
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label" id="ageUnit">단위: 가구</span>
			</div>
			<div style="height: 140px;" class="ieheight02" id="forestryMngmtAge"> <!-- 2020.10.26[신예리] 차트 영역에 맞도록 높이 조정 -->
				<!-- <img src="/images/totSurv/graphsample_05.png" style="width: 100%; object-fit: contain; overflow: hidden;" alt=""> -->
	        </div>
		</div>
		
		<div class="col-SubRchart" id="forestryMngmtCareerPdDiv"> <!-- 2020.10.22[신예리] 클래스 변경 -->
	  		<div class="row bb pb10">
	    		<h5 class="colTit mr10">경영주 임업 경력기간별 임가</h5>
	  			<div class="iconBox">
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label" id="ageUnit">단위: 가구</span>
			</div>
			<div id="forestryMngmtCareerPd" class="ieheight02" style="height: 139px;"> <!-- 2020.10.26[신예리] 차트 영역에 맞도록 높이 조정 -->
				<!-- <img src="/images/totSurv/graphsample_03.png" style="width: 100%; object-fit: contain; overflow: hidden;" alt=""> -->
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