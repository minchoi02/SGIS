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
<div class="conWrap" style="min-width: 1500px;">
	<div class="con-L">
		<div class="col">
      		<h5 class="colTit bb pb10" id="totHouseNumber">총 주택 수</h5>
	      	<div style="display: inline-block;">
	        	<div class="dataAreatit">
	          		<h1>51,629,512</h1>
	          		<span class="ml5">호</span>
	        	</div>
		        <div class="card" id="areaHouse">
		        </div>
		        <div class="cardClick" id="areahouse_result" style="display: none;">
	    		</div>
	  		</div>
		</div>

		<!-- 2020.09.16[신예리] Rank span mt10 class 삭제 START -->
		<div class="col mt10 mb5">
  			<h5 class="colTit">주택 현황</h5>
  			<div>
    			<div  class="numberCard mt10" style="min-height: 110px;">
    				<div id="infoArea1" style="display:none">
    					<p class="houseRankCap numbertit" id="houseRanking">광역시도 중</p>
	  					<button class="moreInfoBtn" type="button"></button>
	  					<div class="row" id="totalHouse"><!-- 20201020 박은식 틀어짐때문에 임시 적용 -->
	    					<h1 id="houseRank">000</h1><span class="ml5">번째</span>
	  					</div>
	  					<p class="numberInfo mb10" id="houseChangeRt">전년보다 00% 계단 상승</p>
	  					<div class="Rangecontainer mt20" id="house_range" style="display:none">
							<span class="rangelabel00">1번</span>
							<input type="range" min="1" max="17" value="1" step="1" class="Rangeslider" id="house_rank">
							<span class="rangelabel00">17번</span>
							<div class="rangeValue" id="rangeV1"><span>7번째</span></div>
		                  	<div class="rangeValue" id="rangeV2"><span>7번째</span></div>
		                  	<div class="rangeValue" id="rangeV3"><span>7번째</span></div>
                		</div>
    				</div>
    				<div id="infoArea2">
    				</div>
				</div>
				<div  class="numberCard mt10" style="min-height: 110px;">
  					<p class="numbertit" id="houseRatioRanking">전국 주택수 증감</p>
  					<button class="moreInfoBtn" type="button" id="houseRatioHelp"></button>
	  				<div class="row">
	    				<h1 id="houseRatioRt">100.6</h1><span class="ml5">호</span>
	  				</div>
	  				<p class="numberInfo mb10" id="houseRatioChangeRt">전년도 대비</p>
	  				<div class="Rangecontainer mt20" id="houseRatio_range" style="display:none">
                  	  <span class="rangelabel00">1번</span>
	                  <input type="range" min="1" max="17" value="1" step="1" class="Rangeslider" id="houseRatio_rank">
	                  <span class="rangelabel00">17번</span>
                	</div>
				</div>
				<div class="numberCard mt10" style="min-height: 110px;">
			        <p class="numbertit" id="emptyRanking">빈집의 수</p>
			        <button class="moreInfoBtn" type="button" id="emptyHelp"></button>
			        <div class="row">
			        	<h1 id="emptyDt">1,651,561</h1><span class="ml5">호</span>
			        </div>
			        <p class="numberInfo mb10" id="emptyChangeRt">전년보다 00% 계단 상승</p>
			        <div class="Rangecontainer mt20" id="empty_range" style="display:none">
                  	  <span class="rangelabel00">1번</span>
	                  <input type="range" min="1" max="17" value="1" step="1" class="Rangeslider" id="empty_rank">
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
      				<!--  <button class="mapInfo" style="display:none">개방형지도란?</button> --> <!-- 2020-09-04 [신예리] 개방형지도 버튼 추가 -->
      				<div class="mapContents" id="mapRgn_1" style="height: 560px;"></div><!-- 맵영역 -->
      				<div class="ControllBtnWrap"> <!-- 2020-09-03 [신예리] 지도 컨트롤 버튼 추가 (버튼 및 영역 숨길 시 class에 none적용) -->
      					<button type="button" class="mapExport" title="지도 확장"></button>
	      				<button type="button" class="zoom" id="pZoom" title="지도 확대"></button>
	               	 	<button type="button" class="out" id="pOut" title="지도 축소"></button>
      				</div>
    			</div>
  			</div>
		</div>

		<div class="col-SubR mb10" id="emptyHoseDiv" style="min-width:400px; height: 172px;"><!-- 20200913 박은식 min값 설정 (추후변경 가능) --><!-- 2020-10-23 [주형식] div id 추가 --> <!-- 20201117 박은식 height값 추가 --><!-- 20210226 박은식 높이변경 -->
			<div class="row bb pb10" >
	    		<h5 class="colTit mr10">주택의 종류</h5><!-- 거주지이동 첫 차트 --> <!-- 20210226 박은식 타이틀변경 -->
	    		<div class="iconBox">
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label" id="ageUnit">단위: 호</span>
			</div>
			<div id="emptyHoseChart" class="emptyHoseChart"> <!-- 2020-09-22 [신예리] 외국인 차트 영역 추가 class 적용 -->
	  		</div>
	  		<div class="chartToolTip">
			</div>
		</div>
		<div class="col-SubR" id="ageDiv" style="min-width:650px;"><!-- 20200913 박은식 min값 설정 (추후변경 가능) -->
	  		<div class="row bb pb10">
	    		<h5 class="colTit mr10">거처의 종류</h5><!-- 연령분포 첫 차트 --> <!-- 20210226 박은식 타이틀변경 -->
	    		<div class="iconBox">
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label" id="ageUnit">단위: 호</span>
			</div>
			<div id="kindHouseChart" style="height: 140px;" id="age1"> <!-- 2020.09.15[신예리] height값 변경 -->
				<!-- <img src="/images/totSurv/graphsample_03.png" style="width: 100%; object-fit: contain; overflow: hidden;" alt=""> -->
	  		</div>
	  		<div class="chartToolTip">
			</div>
		</div>
		<div class="col-SubR mt10" id="countRoom" style="min-width:650px;height: 172px;"><!-- 20200913 박은식 min값 설정 (추후변경 가능) --> <!-- 20210226 박은식 높이변경 -->
	  		<div class="row bb pb10">
	    		<h5 class="colTit mr10">빈집의 종류</h5><!-- 거주지이동 첫 차트 --> <!-- 20210226 박은식 타이틀변경 -->
	    		<div class="iconBox">
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<!-- 20210226 박은식 차트정보 수정되어 사용하도록 수정 START -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
      				<!-- 20210226 박은식 차트정보 수정되어 사용하도록 수정 END -->
    			</div>
    			<span class="tit_label" id="ageUnit">단위: 호</span>
			</div>
			<div class="mt5" style="height: 140px;" id="countRoomChart">
				<!-- <img src="/images/totSurv/graphsample_04.png" style="width: 100%; object-fit: contain; overflow: hidden;" alt=""> -->
	  		</div>
	  		<div class="chartToolTip">
			</div>
		</div>
	  	<div class="col-SubF mt10" id="allhouseForTime" style="min-width:1135px;">
		    <div class="row bb pb10">
	      		<h5 class="colTit mr10">건축연도별 빈집 비율</h5><!-- 총조사인구 첫 차트 --> <!-- 20210226 박은식 타이틀변경 -->
	      		<div class="iconBox">
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label" id="ageUnit">단위: 호</span>
			</div>
			<div style="margin-left: 30px; height: 172px;" id="houseTimeChart"> <!-- 2020.09.15[신예리] height값 변경 -->
				<!-- <img src="/images/totSurv/graphsample_05.png" style="width: 100%; object-fit: contain; overflow: hidden;" alt=""> -->
	         </div>
		</div>
		<!-- 지역별 인구 클릭 시 총인구 전국 화면 전환 START -->
		<!-- <div class="col-SubR mt10" id="foreignFamily" style="display:none" style="min-width:650px;">20200913 박은식 min값 설정 (추후변경 가능)
		    <div class="row bb pb10">
	      		<h5 class="colTit mr10">다문화가구</h5>총조사인구 첫 차트
	  			<div class="iconBox">
	    			<a href="#"><img src="/images/totSurv/col_icon00.png" /></a>
	    			<a href="#"><img src="/images/totSurv/col_icon02.png" /></a>
	    			<a href="#"><img src="/images/totSurv/col_icon04.png" /></a>
	    			<a href="#"><img src="/images/totSurv/col_icon05.png" /></a>
	  			</div>
			</div>
			<div class="dataArea mt10" style="margin-left: 30px; height: 170px;" id="multiculhouseChart"> 2020.09.15[신예리] height값 변경
				<img src="/images/totSurv/graphsample_05.png" style="width: 100%; object-fit: contain; overflow: hidden;" alt="">
	         </div>
		</div> -->
		<!-- 지역별 인구 클릭 시 총인구 전국 화면 전환 END -->

		<!-- 2020.09.17[신예리] 물음표 tooltip table 추가 START -->
		<div class="tootipWrap none">
			 <div class="tootipTit">
			 	<h4>IMF국가 중 대한민국 순위</h4>
			 	<button type="button" class="popcloseBtn mt5" title="설명 툴팁 닫기"></button>
			 </div>
			 <div class="tootipConCustom">
			 	<table class="tooltipTable"> <!-- 2020.09.17[신예리] table class 추가 -->
			 		<caption>IMF국가 중 대한민국 순위에 대한 설명 테이블</caption>
			 		<colgroup>
			 			<col width="30%">
			 			<col width="auto">
			 		</colgroup>

			 		<tr>
						<th>설명</th>
						<td>
						○ IMF국가 인구 중 대한민국의 순위<br>
						- IMF국가 인구 중 대한민국의 순위<br>
						- IMF국가 인구 중 대한민국의 순위<br>
						- IMF국가 인구 중 대한민국의 순위<br>
						○ IMF국가 인구 중 대한민국의 순위<br>
						○ IMF국가 인구 중 대한민국의 순위<br>
						</td>
					</tr>
			 		<tr>
						<th>참조</th>
						<td>경제활동인구조사(통계청)</td>
					</tr>
			 	</table>
			 </div>
		</div>
		<!-- 2020.09.17[신예리] 물음표 tooltip table 추가 END -->

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