
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
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<!-- 대쉬보드 START-->
<div class="conWrap" style="min-width: 1500px;">
	<div class="con-L">
		<!-- 해수면 내수면 토글 -->
		<div class="fisheryTab">
			<button class="fisheryToggle on" id="seaWater">해수면</button>
			<button class="fisheryToggle" id="inlandWater">내수면</button>
		</div>
		<!-- 해수면 내수면 토글 -->
		<div class="col"
			style="border-top-left-radius: 0; border-top-right-radius: 0;">
			<div style="display: inline-block;">
				<div class="dataAreatit" id="totFishery">
					<h5 class="colTit" id="fisherytitle">총 어가 수(해수면)</h5>
					<h1>51,629,512</h1>
					<span class="ml5">가구</span>
				</div>
				<div class="card" id="areaFishery">
					<img src="/images/totSurv/card_search.png" alt=""
						id="areaFisheryBtn">
					<p>
						2015년<br /> 지역별 어가 인구
					</p>
				</div>
				<div class="cardClick" id="areaFishery_result"
					style="display: none;"></div>
			</div>
		</div>

		<!-- 2020.09.16[신예리] Rank span mt10 class 삭제 START -->
		<div class="col mt10">
			<h5 class="colTit">어가 현황</h5>
			<div>
				<div class="numberCard mt10" style="min-height: 110px;">
					<p class="numbertit" id="fisheryHouseRanking">전국 전주기 대비 어가 수</p>
					<button class="moreInfoBtn" type="button" id="fisheryHouseHelp"></button>
					<div class="row" id="fisheryHouseInfo">
						<h1 id="fisheryHouser">1,651,561</h1>
						<span class="ml5">가구</span>
					</div>
					<p class="numberInfo mb10" id="fisheryHosueChangeRt">전년보다 00% 계단 상승</p>
					<div class="Rangecontainer mt20" id="fisheryHouse_range"
						style="display: none">
						<span class="rangelabel00">1번</span> <input type="range" min="1"
							max="17" value="1" step="1" class="Rangeslider"
							id="fisheryHouse_rank"> <span class="rangelabel00">17번</span>
						<div class="rangeValue" id="rangeV3">
							<span>7번째</span>
						</div>
					</div>
				</div>
				<div class="numberCard mt10" style="min-height: 110px;">
					<p class="numbertit" id="fisheryRanking">전국 어가 인구</p>
					<button class="moreInfoBtn" type="button" id="fisheryRatioHelp"></button>
					<div class="row" id="fisheryRankRow">
						<h1 id="fisheryRank">000</h1>
						<span class="ml5">명</span>
					</div>
					<p class="numberInfo mb10" id="fisheryChangeRt">전년보다 00% 계단 상승</p>					
				</div>

				<div class="numberCard mt10" style="min-height: 110px;">
					<p class="numbertit" id="OldFisheryRanking">전국 어가 인구 중 고령인구</p>
					<button class="moreInfoBtn" type="button" id="oldFisheryHelp"></button>
					<div class="row">
						<h1 id="oldFisheryRt">100.6</h1>
						<span class="ml5">명</span>
					</div>
					<p class="numberInfo mb10" id="oldFisheryChangeRt">총 어가 인구 중</p>
				</div>
			</div>
		</div>
		<!-- 2020.09.16[신예리] Rank span mt10 class 삭제 END -->

	</div>
	<div class="con-R" style="min-width: 1260px;"> <!-- 2020.11.13[신예리] 자료출처 버튼 변경으로 인한 최소 너비 값 변경 --><!-- 2020.11.16[신예리] 익스플로러 레이아웃으로 인한 최소 너비 값 변경 -->
		<div class="col-SubL">
			<h5 class="colTitMap">지도</h5>
			<!-- 2020.10.26[신예리] 클래스 변경 -->
			<span class='ColDataSelectSido' id="areaDiv" style="display: inline">전국</span>
			<span class='ColDataSelectTit' id="itmDiv" style="display: none"></span>
			<button type="button" class="downloadBtn" title="지도 이미지 저장"></button>
			<div>
				<div class="Map totSurvMap" id="mapArea" style="height: 590px;"> <!-- 2020.11.19[신예리] 영역 높이 수정 -->
					<!-- <button class="mapInfo" style="display: none">개방형지도란?</button>  -->
					<div class="mapContents" id="mapRgn_1"
						style="display: none; height: 590px;"></div> <!-- 2020.11.19[신예리] 영역 높이 수정 -->
					<!-- 맵영역 -->
					<div class="ControllBtnWrap">
						<button type="button" class="mapExport" title="지도 확장"></button>
						<button type="button" class="zoom" id="pZoom" title="지도 확대"></button>
						<button type="button" class="out" id="pOut" title="지도 축소"></button>
					</div>
				</div>
			</div>
		</div>

	<div class="col-SubDivWrap mb10"> 
		<div class="col-SubDivL" id="fisheryTypeDiv">
	  		<div class="row bb pb10" >
	    		<h5 class="colTit mr10">경영형태별 어가</h5>
	  			<div class="iconBox">
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label">단위: 가구</span> <!-- 2020-12-02 [곽제욱] id삭제 -->
			</div>
			<div style="text-align: center; color: white;padding: 0;overflow: auto; min-height: 290px;" id="fisheryType">
				<!-- <img src="/images/totSurv/graphsample_04.png" style="width: 100%; object-fit: contain; overflow: hidden;" alt=""> -->
	  		</div>
		</div>
		
		<div class="col-SubDivR" id="fishPriceDiv">
		    <div class="row bb pb10"> 
	      		<h5 class="colTit mr10">수산물 판매금액별 어가</h5>
	  			<div class="iconBox">
      				<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
      				<button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
    			</div>
    			<span class="tit_label">단위: 가구</span> <!-- 2020-12-02 [곽제욱] id삭제 -->
			</div>
			<div style="min-height: 285px; text-align: center; overflow-x: auto;" id="totPriceFish"><!-- 20201016 박은식 마지진 제거 -->	
	        </div>
		</div> 
	  	</div>
		<div class="col-SubR" id="moveDiv">
			<!-- 20200913 박은식 min값 설정 (추후변경 가능) -->
			<div class="row bb pb10">
				<h5 class="colTit mr10">주된 어로어업 방법별 어가</h5> <!-- 20201118 박은식 명칭 변경 -->
				<!-- 어획품종별 어가 첫 차트 -->
				<div class="fishKindBtnWrap" id="inlandButton"  style="display: none;">
					<!-- 20201117 박은식 전체 버튼 추가 START -->
					<button type="button" class="fishSeaKindBtnTxt on" name="fishKindBtn"
						id="inlandAll" style="cursor: pointer" title="전체">전체</button>
					<!-- 20201117 박은식 전체 버튼 추가 END -->
					<button type="button" class="fishSeaKindBtnTxt" name="fishKindBtn"
						id="fish" style="cursor: pointer" title="어류">어류</button>
					<!-- <button type="button" class="fishKindBtn01 " name="fishKindBtn"
						id="shellfish" style="cursor: pointer" title="갑각류,패류 차트">갑각류,패류</button>
					<button type="button" class="fishKindBtn02 " name="fishKindBtn"
						id="othersFish" style="cursor: pointer" title="기타 수산동식물 차트">기타
						수산동식물</button> -->
					<!-- 20201117 박은식 id 값 변경 START-->
					<button type="button" class="fishSeaKindBtnTxt " name="fishKindBtn"
						id="othersFish" style="cursor: pointer;" 
						title="기타 어획 품종">기타 어획 품종</button> <!-- 20201118 박은식 명칭 변경 및 타이틀 변경-->
					<!-- 20201117 박은식 id 값 변경 END-->
				</div>
				<div class="fishKindBtnWrap" id="seaButton">
					<!-- 20201117 박은식 전체 버튼 추가 START -->
					<button type="button" class="fishSeaKindBtnTxt on" name="fishKindBtn"
						id="seaAll" style="cursor: pointer" title="전체">전체</button>
					<!-- 20201117 박은식 전체 버튼 추가 END -->
					<button type="button" class="fishSeaKindBtnTxt" name="fishKindBtn"
						id="inshoreFishery" style="cursor: pointer" title="근해어업">근해어업</button>
					<button type="button" class="fishSeaKindBtnTxt" name="fishKindBtn"
						id="blockFishery" style="cursor: pointer" title="구획어업">구획어업</button>
					<button type="button" class="fishSeaKindBtnTxt" name="fishKindBtn"
						id="coastalFishery" style="cursor: pointer" title="연안어업">연안어업</button>
					<button type="button" class="fishSeaKindBtnTxt" name="fishKindBtn"
						id="tohersFishery" style="cursor: pointer" title="기타어업">기타어업</button>
				</div>
				<div class="iconBox">
					<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
					<button type="button" class="chartBtn" name="chartBtn"
						title="차트 유형"></button>
					<button type="button" class="imgSaveBtn" name="imgSaveBtn"
						title="이미지 저장"></button>
				</div>
				<span class="tit_label">단위: 가구</span> <!-- 2020-12-02 [곽제욱] id삭제 -->
			</div>
			<div class="mt5" style="height: 218px;" id="getFishery"> <!-- 2020.11.19[신예리] 영역 높이 수정 -->
				<!-- 2020.10.21[신예리] ie 전용 높이값 추가(ieheight class 추가) -->
				<!-- <img src="/images/totSurv/graphsample_04.png" style="width: 100%; object-fit: contain; overflow: hidden;" alt=""> -->
			</div>
		</div>
		<div style="position: relative; margin-bottom: 0; float: left; width: 100%; margin-right: -10px;">
			<div class="col-SubR mt10" id="totOperatorAgeDiv"
				style="margin-left: 0; margin-right: 10px;">
				<div class="row bb pb10">
					<h5 class="colTit mr10">경영주 연령별 어가</h5>
					<!-- 판매 금액별 어가 -->
					<div class="iconBox">
						<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
						<button type="button" class="chartBtn" name="chartBtn"
							title="차트 유형"></button>
						<button type="button" class="imgSaveBtn" name="imgSaveBtn"
							title="이미지 저장"></button>
					</div>
					<span class="tit_label">단위: 가구</span> <!-- 2020-12-02 [곽제욱] id삭제 -->
				</div>
				<div style="height: 149px;" id="totOperatorAge" class="fishHeight"> <!-- 2020.11.19[신예리] 영역 높이 수정 및 클래스 추가 -->
					<!-- <img src="/images/totSurv/graphsample_04.png" style="width: 100%; object-fit: contain; overflow: hidden;" alt=""> -->
				</div>
			</div>
			<div class="col-SubRchart" id="totCareerDiv"
				style="display: block;">
				<!-- 2020.10.22[신예리] 클래스 변경 -->
				<div class="row bb pb10">
					<h5 class="colTit mr10">경영주 어업 경력기간별 어가</h5>
					<!-- 동력통수별 어가 -->
					<div class="iconBox">
						<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
						<button type="button" class="chartBtn" name="chartBtn"
							title="다른유형의차트"></button>
						<button type="button" class="imgSaveBtn" name="imgSaveBtn"
							title="이미지 저장"></button>
					</div>
					<span class="tit_label">단위: 가구</span> <!-- 2020-12-02 [곽제욱] id삭제 -->
				</div>
				<div style="margin-left: 30px; height: 149px;" class="fishHeight" id="totCareer"> <!-- 2020.11.19[신예리] 영역 높이 수정 및 클래스 추가 -->
					<!-- 2020.10.26[신예리] height값 변경 -->
				</div>
			</div>
		</div>

		<!-- 2020.09.17[신예리] 물음표 tooltip table 추가 START -->
		<div class="tootipWrap none">
			<div class="tootipTit">
				<h4>IMF국가 중 대한민국 순위</h4>
				<button type="button" class="popcloseBtn mt5" title="설명 툴팁 닫기"></button>
			</div>
			<div class="tootipConCustom">
				<table class="tooltipTable">
					<!-- 2020.09.17[신예리] table class 추가 -->
					<caption>IMF국가 중 대한민국 순위에 대한 설명 테이블</caption>
					<colgroup>
						<col width="30%">
						<col width="auto">
					</colgroup>

					<tr>
						<th>설명</th>
						<td>○ IMF국가 인구 중 대한민국의 순위<br> - IMF국가 인구 중 대한민국의 순위<br>
							- IMF국가 인구 중 대한민국의 순위<br> - IMF국가 인구 중 대한민국의 순위<br> ○
							IMF국가 인구 중 대한민국의 순위<br> ○ IMF국가 인구 중 대한민국의 순위<br>
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
				<p class="popTxt">
					SGIS(Statistical Geographic Information Service)를 기반으로</br>
					&nbsp;통계정보(인구주택총조사, 농림어업총조사)와 통계청에서 구축한</br> &nbsp;행정구역(읍면동) 경계에 해당하는
					지리정보를 융 복합하여 제공 </br> &nbsp;하는 통계지리정보 입니다. </br> &nbsp;- SGIS에서 제공하는 센서스 통계는
					일부 특별조사구와 외국인,</br> &nbsp;&nbsp;&nbsp;개인운수업등의 자료를 제외하고 최신 경계를 반영하기 때문에</br>
					&nbsp;&nbsp;&nbsp;KOSIS 등 공표된 통계와 차이가 있습니다.</br> ※&nbsp;제외 자료인구/가구/주택
					센서스 : 해외주재공간, 교도소 및</br> &nbsp;&nbsp;&nbsp;소년원, 군부대,전투경찰대, 의무소방대 등의 특별
					조사구와</br> &nbsp;&nbsp;&nbsp;외국인 사업체 센서스 : 개인운수업(사업장이 일정치 않음)
				</p>
			</div>
		</div>
		<!-- 2020.09.16[신예리] 개방형지도 popup END -->
	</div>
</div>
<!-- 대쉬보드 END-->