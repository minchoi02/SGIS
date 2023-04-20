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

<!-- <script src="${pageContext.request.contextPath}/js/totSurv/totSurvMap.js"></script> <!-- 2020-11-02 [곽제욱] 주석처리 --> 
<!DOCTYPE html>

<!-- 대쉬보드 START--> 
<div class="conWrap" style="min-width:1500px;">
	<div class="con-L">
		<div class="col">
      		<h5 class="colTit bb pb10" id="totPeopleNumber">총 인구 수</h5><!-- 202011111 박은식 타이틀 변경 -->
	      	<div style="display: inline-block;">
	        	<div class="dataAreatit">
	          		<h1>51,629,512</h1>
	          		<span class="ml5">명</span>
	        	</div>
		        <div class="card" id="areaPopulation">

		        </div>
		        <div class="cardClick" id="areaPopulation_result" style="display: none;">
	    		</div>
	  		</div>
		</div>

		<div class="col mt10 mb5" style="display: block;">
  			<h5 class="colTit">인구 현황</h5><!-- 20201111 박은식 타이틀 변경  -->
  			<div>
    			<div  class="numberCard mt10"> <!-- 2020-10-13 [신예리] 민헤이트 삭제 -->
  					<p class="numbertit" id="populationRanking">IMF 210 개 국가 중</p>
  					<button class="moreInfoBtn" type="button" id="totalIMF"></button>
  					<div class="row">
    					<h1 id="peopleRank"></h1><span class="ml5">번째</span>
  					</div>
  					<p class="numberInfo mb10" id="peopleChangeRt"></p>
  					<!-- 2020.10.12 text 추가 START -->
  					<p class="populationRankCap" id="worldPeopleChangeRt">IMF 210개 국가</p> <!-- 20201013 박은식 문구변경 -->
  					<!-- 2020.10.12 text 추가 END -->
  					<div class="Rangecontainer mt20" id="total_range" style="display:none">
                  	  <span class="rangelabel00">1번</span>
	                  <input type="range" min="1" max="17" value="1" step="1" class="Rangeslider" id="total_rank">
	                  <span class="rangelabel00 fR">17번</span>
                  	  <div class="rangeValue" id="rangeV1"><span>7번째</span></div>
                  	  <div class="rangeValue" id="rangeV2"><span>7번째</span></div>
                  	  <div class="rangeValue" id="rangeV3"><span>7번째</span></div>
                	</div>
				</div>
				<div  class="numberCard mt10"> <!-- 2020-10-13 [신예리] 민헤이트 삭제 -->
  					<p class="numbertit" id="genderRanking">전국 남녀 성비</p>
  					<button class="moreInfoBtn" type="button" id="genderRatio"><br/></button>
	  				<div class="row">
	    				<h1 id="genderRt"></h1><span class="ml5"></span>
	  				</div>
	  				<p class="numberInfo mb10" id="genderChangeRt"><br/></p> <!-- 2020-10-13 [곽제욱] 문구 삭제후 br 추가 -->
	  				<div class="Rangecontainer mt20" id="gender_range" style="display:none">
                  	  <span class="rangelabel00">1번</span>
	                  <input type="range" min="1" max="17" value="1" step="1" class="Rangeslider" id="gender_rank">
	                  <span class="rangelabel00 fR">17번</span>
                	</div>
				</div>
				<div class="numberCard mt10"> <!-- 2020-10-13 [신예리] 민헤이트 삭제 -->
			        <p class="numbertit" id="foreignRanking">전국 외국인 수</p>
			        <button class="moreInfoBtn" type="button" id="foreignPopulation"></button>
			        <div class="row">
			        	<h1 id="forigen">1,651,561</h1><span class="ml5">명</span>
			        </div>
			        <p class="numberInfo mb10" id="foriegnChangeRt">전년보다 00% 계단 상승</p>
			        <div class="Rangecontainer mt20" id="foreign_range" style="display:none">
                  	  <span class="rangelabel00">1번</span>
	                  <input type="range" min="1" max="17" value="1" step="1" class="Rangeslider" id="foreign_rank">
	                  <span class="rangelabel00 fR">17번</span>
                	</div>
     			</div>
    		</div>
  		</div>

	</div>
	<div class="con-R">
  		<div class="col-SubL">
    		<h5 class="colTitMap" id="clickItmName">지도</h5> <!-- 2020.10.26[신예리] class변경 -->
    		<span class='ColDataSelectSido' id="areaDiv" style="display:inline">전국</span>
    		<span class='ColDataSelectTit' id="itmDiv" style="display:none"></span>
    		<!-- 2020.10.26[신예리] 지도 타이틀 추가 START -->    		
    		<!-- <span class="ColDataSelectSido">전국</span>
    		<span class="ColDataSelectTit">2019년 0~4세 총인구(명)</span> -->			
    		<!-- 2020.10.26[신예리] 지도 타이틀 추가 END -->
    		<button type="button" class="downloadBtn" title="지도 이미지 저장"></button>
    		<div>
      			<div class="Map totSurvMap" id="mapArea">
      				<!-- <button class="mapInfo" style="display:none">개방형지도란?</button> -->
      				<div class="mapContents" id="mapRgn_3" style="height: 560px;"></div><!-- 맵영역 --> <!-- 2020-10-16 [곽제욱] 맵 로딩전 크기 지정 -->
      				<div class="ControllBtnWrap">
      					<!-- 2020.11.03[신예리] 버튼 title text 변경  START -->
	               	 	<button type="button" class="mapExport" title="지도 확장"></button> <!-- 2020.10.22[신예리] a에서 button으로 변경 -->
	               	 	<!-- 20201013 박은식 시계열과 event가 중복되어 id 추가 START -->
	      				<button type="button" class="zoom" id="pZoom" title="지도 확대"></button>
	               	 	<button type="button" class="out" id="pOut" title="지도 축소"></button>
	               	 	<!-- 2020.11.03[신예리] 버튼 title text 변경  END -->
	               	 	<!-- 20201013 박은식 시계열과 event가 중복되어 id 추가 END -->
      				</div>
    			</div>
  			</div>
		</div>

		<div class="col-SubR mb10" id="pieChartDiv" style="min-height: 130px;"> <!-- 2020.11.18[신예리] 기본 높이 값 설정 -->
  			<div class="">
    			<!-- <div class="iconBox">
      				<a href="#"><img src="/images/totSurv/col_icon00.png" /></a>
      				<a href="#"><img src="/images/totSurv/col_icon02.png" /></a>
      				<a href="#"><img src="/images/totSurv/col_icon04.png" /></a>
      				<a href="#"><img src="/images/totSurv/col_icon05.png" /></a>
    			</div> -->
  			</div>
	  		<div class="chartRow fL" id="localDiv" style="display:inline-flex; width:50%; border-right: 1px solid #ddd; box-sizing: border-box;">
	    		<h5 class="colGraphTit">내국인</h5>
	    		<div id="local_people1" style="margin-top:-15px;">
	  			</div>
	    		<div class="chartRowCap" style="display: inline;">
	              <div class="mb10"><span class="male fL"></span><p class="male fL">남자</p><span class="statsGender" id="localMales">24,931,554 명</span></div>
	              <div><span class="female fL"></span><p class="female fL">여자</p><span class="statsGender" id="localFemales">24,931,554 명</span>	</div>
              	</div>
			</div>
			<div class="chartRow" id="foreignerDiv" style="display:inline-flex; width:50%">
	  			<h5 class="colGraphTit">외국인</h5>
	  			<div id="foreigner_people1" style="margin-top:-15px;">
	    		</div>
	    		<div class="chartRowCap" style="display: inline;">
	              <div class="mb10"><span class="male fL"></span><p class="male fL">남자</p><span class="statsGender" id="foreignMales">24,931,554 명</span></div>
	              <div><span class="female fL"></span><p class="female fL">여자</p><span class="statsGender" id="foreignFemales">24,931,554 명</span></div>
              	</div>
	  		</div>
		</div>
		<div class="col-SubR" id="ageDiv">
	  		<div class="row bb pb10">
	    		<h5 class="colTit mr10">연령분포</h5><!-- 연령분포 첫 차트 -->

	  			<span class="colorInfo01"></span>
	  			<p>영유아/어린이</p>
	  			<span class="colorInfo02"></span>
	  			<p>청소년</p>
	  			<span class="colorInfo03"></span>
	  			<p>청년</p>
	  			<span class="colorInfo04"></span>
	  			<p>장년</p>
	  			<span class="colorInfo05"></span>
	  			<p>노년</p>
	  			<!-- 2020-10-19 [주형식] 공통 아이콘 추가 START -->
	  			<!-- 2020-10-19 [신예리] a링크 버튼으로 변경 및 margin값 변경 START -->
	  			<div class="iconBox"> <!-- 2020.10.26[신예리] style 삭제 -->
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button><!-- 20201103 박은식 title 변경 -->
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label" id="ageUnit">단위: 천명</span> <!-- 2020.10.26[신예리] 위치 변경 -->
    			<!-- 2020-10-19 [신예리] a링크 버튼으로 변경 및 margin값 변경 END -->
    			<!-- 2020-10-19 [주형식] 공통 아이콘 추가 END -->
			</div>
			<div id="ageDistribution" style="height: 140px;">
	  		</div>
		</div>
		<div class="col-SubR mt10" id="moveDiv">
	  		<div class="row bb pb10">
	    		<h5 class="colTit mr10">거주지 이동(1년 전 거주지 기준 이동 인구)</h5><!-- 거주지이동 첫 차트 -->

	    		<!-- 2020-10-19 [주형식] 공통 아이콘 추가 START -->
	    		<!-- 2020-10-19 [신예리] a링크 버튼으로 변경 및 margin값 변경 START -->
    			<div class="iconBox"> <!-- 2020.10.26[신예리] style 삭제 -->
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button><!-- 20201103 박은식 title 변경 -->
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label">단위: 명</span> <!-- 2020.10.26[신예리] 위치 변경 -->
    			<!-- 2020-10-19 [신예리] a링크 버튼으로 변경 및 margin값 변경 END -->
    			<!-- 2020-10-19 [주형식] 공통 아이콘 추가 END -->

	    		<!-- 2020-10-06 [곽제욱] 거주지이동 콤보박스, 계 임시 추가 START -->
	    		<!--
				<div class="ChartselectWrap">
					<select>
						<option selected>전체</option>
						<option>남자</option>
						<option>여자</option>
					</select>

					<select>
						<option>주택</option>
						<option>아파트</option>
						<option>단독주택</option>
					</select>
				</div>

				<div style="margin-left: 205px;">
					<span class="TotalsumTit brleft">총 계 : </span>
					<span class="Totalsum blue">49,434,372</span>
					<span class="TotalsumTit" style="padding-left: 5px !important;">다른 시군구 합계 : </span>
					<span class="Totalsum skyblue">3,655,736</span>
				</div>
				-->
	  		<!-- 2020-10-06 [곽제욱] 거주지이동 콤보박스, 계 임시 추가 END -->

			</div>
			<div style="height: 175px;" id="moveHome"> <!-- 2020.11.18[신예리] 기본 높이 값 수정 -->
	  		</div>
		</div>
	  	<div class="col-SubF mt10" id="allPopulationForTime">
		    <div class="row bb pb10">
	      		<h5 class="colTit mr10">총조사인구</h5><!-- 총조사인구 첫 차트 -->
	      		<!-- 2020.10.20 대쉬보드 공통기능 추가 START -->
	      		<div class="iconBox"> <!-- 2020.10.26[신예리] style 삭제 -->
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button><!-- 20201103 박은식 title 변경 -->
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
   				</div>
   				<span class="tit_label">단위: 명</span> <!-- 2020.10.26[신예리] 위치 변경 -->
   				<!-- 2020.10.20 대쉬보드 공통기능 추가 END -->
			</div> 
			<div style="margin-left: 23px; height: 173px;" id="populationTimeChart"> <!-- 2020.10.26[신예리] 높이값 수정 -->
	         </div>
		</div>
		<!-- 지역별 인구 클릭 시 총인구 전국 화면 전환 START -->
		<div class="col-SubR mt10" id="foreignFamily" style="display:none;">
		    <div class="row bb pb10">
	      		<h5 class="colTit mr10">다문화가구</h5><!-- 총조사인구 첫 차트 -->
	      		<div class="iconBox"> <!-- 2020.10.26[신예리] style 삭제 -->
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button><!-- 20201103 박은식 title 변경 -->
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label">단위: 가구</span> <!-- 2020.10.26[신예리] 위치 변경 -->
			</div>
			<div style="margin-left: 30px; height: 170px;" id="multiculPopulationChart">
	         </div>
		</div>
		<!-- 지역별 인구 클릭 시 총인구 전국 화면 전환 END -->

		<div class="tootipWrap none">
			 <div class="tootipTit">
			 	<h4>IMF국가 중 대한민국 순위</h4>
			 	<button type="button" class="popcloseBtn mt5" title="설명 툴팁 닫기"></button>
			 </div>
			 <div class="tootipConCustom">
			 	<table class="tooltipTable">
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
		<div class="popupWrap none" id="openWin" style="display:none">
			<div class="popTit">
				<h1>개방형지도란?</h1>
				<button type="button" class="popcloseBtn" title="개방형지도 팝업 닫기"></button>
			</div>
			<div class="popCon" style="background-color: white;" >
				<p class="popTxt">SGIS(Statistical Geographic Information Service)를 기반으로 통계정보(인구주택총조사,</br>
								   농림어업총조사)와 통계청에서 구축한 행정구역(읍면동) 경계에 해당하는 지리정보를 융 복합하여</br>
								   제공 하는 통계지리정보 입니다. </br>
								  &nbsp;- SGIS에서 제공하는 센서스 통계는 일부 특별조사구와 외국인, 개인운수업등의 자료를 제외하고</br>
								  &nbsp;&nbsp;&nbsp;최신 경계를 반영하기 때문에 KOSIS 등 공표된 통계와 차이가 있습니다.</br>
								    ※&nbsp;제외 자료인구/가구/주택 센서스 : 해외주재공간, 교도소 및 소년원, 군부대, 전투경찰대,</br>
								  &nbsp;&nbsp;&nbsp;의무소방대 등의 특별 조사구와 외국인 사업체 센서스 : 개인운수업(사업장이 일정치 않음)</br>
				<p class="CloseWin" onclick="$totSurvMain.ui.setCookie('mapPopTit', 'true', 365); $('#openWin').hide(); $('.mapInfo').removeClass('on'); $('#commonTotSurv_popup_back').hide()"> 다시보지 않음 </p>
			</div>
		</div>

		<!-- <div class="popupWrap none" id="openWin" style="display:none">
			<div class="popTit">
				<h1>개방형지도란?</h1>
				<button type="button" class="popcloseBtn" title="개방형지도 팝업 닫기"></button>
			</div>
			<div class="popCon" style="background-color: white;" >
				<p class="popTxt">SGIS(Statistical Geographic Information Service)를 기반으로 통계정보(인구주택총조사,</br>
								   농림어업총조사)와 통계청에서 구축한 행정구역(읍면동) 경계에 해당하는 지리정보를 융 복합하여</br>
								   제공 하는 통계지리정보 입니다. </br>
								  &nbsp;- SGIS에서 제공하는 센서스 통계는 일부 특별조사구와 외국인, 개인운수업등의 자료를 제외하고</br>
								  &nbsp;&nbsp;&nbsp;최신 경계를 반영하기 때문에 KOSIS 등 공표된 통계와 차이가 있습니다.</br>
								    ※&nbsp;제외 자료인구/가구/주택 센서스 : 해외주재공간, 교도소 및 소년원, 군부대, 전투경찰대,</br>
								  &nbsp;&nbsp;&nbsp;의무소방대 등의 특별 조사구와 외국인 사업체 센서스 : 개인운수업(사업장이 일정치 않음)</br>
			</div>
		</div> -->

	</div>
</div>
  <!-- 대쉬보드 END-->
<!-- 도움말 START -->
<!-- 20201020 박은식 도움말 툴팁영역 메인으로 이동 START -->
<!-- <div class="ToolTip" id="helpTooltip" style="background-color:#fff">

</div> -->
<!-- 20201020 박은식 도움말 툴팁영역 메인으로 이동 END -->
<!-- 도움말 END -->