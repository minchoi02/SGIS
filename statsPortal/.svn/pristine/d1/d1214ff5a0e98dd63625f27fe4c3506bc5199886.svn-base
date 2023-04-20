<%
/**************************************************************************************************************************
* Program Name   : 다중시계열
* File Name      : interactiveMultiTimeSeries.jsp
* Comment      : 
* History      : 
*   2021.07.05   웨이버스 신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script type="text/javascript">
$(function(){
   $('#conWrap').draggable();

});
</script>
<div class="conWrap" id="conWrap" style="border: solid 0.2em black; z-index:10000;">
   <a href="#" class="closePop"><img src="/images/idm/layer_close.png"></a>
   <div class="resizePopup" style="overflow-x:auto; height: 743px;"><!-- SGIS4_1105_다중시계열 스크롤 적용  추가-->
   <div class="mWrap" style = "width: 1701px;"><!-- SGIS4_1105_다중시계열 스크롤 적용  추가-->
   <div class="con-LTms">
   <div class="col mb10" id="tiemTotalPopulationDiv">
      <div class="TmsTitrow bb pb10" style="margin-bottom:10px;">   
              <h1 class="colTit textOverflow" id="mainTitle"></h1>
              <div class="iconBox" style="margin-right: 5px; display:inline-flex;">
                  <!--<button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button> 
                  <button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
                  -->
                  <button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장" onclick="javascript:$interactiveMultiTimeSeries.ui.doCapture('conWrap');"></button>
             </div>
         </div> 
      <div>
         <!--  <span class="statInfo">지역</span>--><!-- SGIS4_1105_수정 -->
         <span class="textOverflow" id="stat_adm_nm" style="font-size: 13px;width: 256px;display:inline-block;"></span><!-- SGIS4_1105_수정 -->
      </div>
        <div class= "ct_line2"></div>
        <div>
         <!--  <span class="statInfo">출처</span>--><!-- SGIS4_1105_수정 -->
           <span class="textOverflow" id="stat_orgin" style="font-size: 13px;width: 256px;display:inline-block;"></span><!-- SGIS4_1105_수정 -->
        </div>
        <!--  
          <div class= "ct_line2"></div>
          <div class="numberCard">
             <span class="statInfo">범례 기준년도</span>
         <select class="selct_07 select_constYear constYear_mem" id="legendYear">
         </select>
      </div>
      -->
      <!-- SGIS4_1105 수정 시작 -->
      <!--  
      <div class= "ct_line2"></div>
      <div class="numberCard">
         <span class="statInfo" style="width:73px">타입 설정</span>
           <select class="selct_07 select_constYear constYear_mem" id="mapType">
            <option value="color" data-type="color" selected>색상</option>
            <option value="bubble" data-type="bubble">버블</option>
            <option value="dot" data-type="dot">점</option>
            <option value="heat" data-type="heat">열</option>
         </select>
      </div>
      -->
      <!-- SGIS4_1105 수정 끝 -->
      <div class= "ct_line2"></div>
          <div class="numberCard">
             <span class="statInfo" style="width:122px;">년도<span style="font-size:12px;">(최대 4개년 선택)</span></span></span><a href="javascript:void(0);" class="year_select_btn" id="yearSelectBtn">조회</a>
             <div class="yearList" style="height:117px;width:253px;"><!--SGIS4_1105 수정 -->
                <ul id="yearList" style="width: 246px;"></ul><!--SGIS4_1105 수정 -->
             </div>
      </div>
      </div>
      
      <div class="col2 mt10 mb10"> 
          <div class="TmsTitrow bb pb10">   
              <h5 class="colTit" id="colTitText1">년도별 비교</h5>
              <div class="iconBox" style="margin-right: 5px; display:inline-flex;">
              <!-- 
                  <button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button>
                  <button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
                  <button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
               -->
            </div>
              <!-- <span class="moreInfoBtnWrap" style="position: absolute; left:140px; margin-top:0;"><button class="moreInfoBtn" type="button" id="totalSido"></button></span>-->
              <span class="tit_labelTms">단위(명)</span>
         </div>    
            <div class="totalChart">
               <div id="totalChart"></div>
            </div>
      </div>
      
      <div class="col3 mt10 mb10">
            <div class="TmsTitrow bb pb10" style="margin-bottom:15px;">
              <h5 class="colTit"><span id="colTitText2" style="font-size: 11px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;width: 190px;">선택지역 비교</span></h5><!-- SGIS4_1105 수정-->
              <div class="iconBox" style="margin-right: 5px; display:inline-flex;"> 
                 <!-- 
                  <button type="button" class="metaBtn" name="metaBtn"   title="통계표 보기(KOSIS)"></button>
                  <button type="button" class="chartBtn" name="chartBtn"  title="차트 유형"></button>
                  <button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
               -->
            </div> 
              <!--  <span class="moreInfoBtnWrap" style="position: absolute; left: 117px; margin-top:0;"><button class="moreInfoBtn" type="button" id="genderRatio"></button></span>-->
                 <span class="tit_labelTms">단위(명)</span>
           </div>
           <div>
                 <!-- 표영역 -->
            <div class="tables">
               <table style="table-layout: fixed;" class="mtsTables">
                  <thead>
                     <tr id="db_normal_tb">
                        <th scope="col">년도</th>
                        <th scope="col" class="th_result">값</th>
                        <th class="th_yoy" scope="col">증감률(%)</th>
                     </tr>
                  </thead>
                  <tbody id="clickMapInfo"></tbody>
               </table>
            </div>
          </div>
      </div>
      </div>
      <div class="con-RTms">
         <div style="position: relative;">
         <div class="col-SubLTms" id="yearMapDiv_1">
         <!--  <h5 class="colTitMap" style="display:inline">지도</h5>-->
         <span class="MapYearselectbox YearSelectBox">
         <select id="yearList_1" data-index=0 disabled></select>
         </span>  
         <div>
               <div class="Map" id="mapArea_1">
                  <!-- 맵영역 Start-->
                  <div class="mapContents" id="mapRgn_4"></div>
                  <!-- 맵영역 end -->
               <!--  
                  <div class="ControllBtnWrap">
                     <button type="button" class="select" id="lSelect" title="지도 선택" style="display: none;"></button>
                     <button type="button" class="zoom" id="lZoom" title="지도 확대" style="display: none;"></button>
                         <button type="button" class="out" id="lOut" title="지도 축소" style="display: none;"></button>
                  </div>
               -->
              </div>
         </div> 
      </div> 
      <div class="col-SubLTms" id="yearMapDiv_2">
      <!--  <h5 class="colTit" style="display:inline">지도</h5>-->
      <div class="MapYearselectbox YearSelectBox" >
          <select id="yearList_2" data-index=1 disabled></select>
       </div>
       <!--  
      <button onclick="" class="downloadBtn" title="다운로드 버튼" style="display:none">다운로드 버튼</button>-->
      <div>
               <div class="Map" id="mapArea_2">
                  <!-- 맵영역 Start-->
                  <div class="mapContents" id="mapRgn_5"></div>
                  <!-- 맵영역 end -->
                  <!--  
                  <div class="ControllBtnWrap">
                     <button type="button" class="mapExport" id="rExport" title="지도 확장" style="display: none;"></button>
                     <button type="button" class="select" id="rSelect" title="지도 선택" style="display: none;"></button>
                     <button type="button" class="zoom" id="rZoom" title="지도 확대" style="display: none;"></button>
                         <button type="button" class="out" id="rOut" title="지도 축소" style="display: none;"></button>
                  </div> 
                  -->            
           </div>
      </div> 
   </div>
   <div class="col-SubLTms" id="yearMapDiv_3">
      <!--<h5 class="colTit" style="display:inline">지도</h5>-->
      <div class="MapYearselectbox YearSelectBox" >
         <select id="yearList_3" data-index=2 disabled></select>
       </div>
      <div> <!-- 20201023 신예리 class 제거-->
               <div class="Map" id="mapArea_3">
                  <!-- 맵영역 Start-->
                  <div class="mapContents" id="mapRgn_6"></div>
                  <!-- 맵영역 end -->
                  <!--  
                  <div class="ControllBtnWrap">
                     <button type="button" class="mapExport" id="rExport" title="지도 확장" style="display: none;"></button>
                     <button type="button" class="select" id="rSelect" title="지도 선택" style="display: none;"></button>
                     <button type="button" class="zoom" id="rZoom" title="지도 확대" style="display: none;"></button>
                         <button type="button" class="out" id="rOut" title="지도 축소" style="display: none;"></button>
                  </div>
                  -->          
           </div>
      </div> 
   </div>
   <div class="col-SubLTms" id="yearMapDiv_4">
      <!--  <h5 class="colTit" style="display:inline">지도</h5>-->
      <div class="MapYearselectbox YearSelectBox">
          <select id="yearList_4" data-index=3 disabled></select>
       </div>
      <div> <!-- 20201023 신예리 class 제거-->
               <div class="Map" id="mapArea_4">
                  <!-- 맵영역 Start-->
                  <div class="mapContents" id="mapRgn_7"></div>
                  <!-- 맵영역 end -->
                  <!--  
                  <div class="ControllBtnWrap">
                     <button type="button" class="mapExport" id="rExport" title="지도 확장" style="display: none;"></button>
                     <button type="button" class="select" id="rSelect" title="지도 선택" style="display: none;"></button>
                     <button type="button" class="zoom" id="rZoom" title="지도 확대" style="display: none;"></button>
                         <button type="button" class="out" id="rOut" title="지도 축소" style="display: none;"></button>
                  </div>
                  -->          
           </div>
      </div> 
   </div>
     <!-- end con-RTms -->
  </div>
  <div class="Map" id="mapArea_5" style="display:none">
      <div id="mapRgn_8"></div>
  </div>
  <div class="Map" id="mapArea_6" style="display:none">
      <div class="mapContents" id="mapRgn_9"></div>
  </div>
  <div class="Map" id="mapArea_7" style="display:none">
      <div class="mapContents" id="mapRgn_10"></div>
  </div>
  <div class="Map" id="mapArea_8" style="display:none">
      <div class="mapContents" id="mapRgn_11"></div>
  </div>
  <div class="Map" id="mapArea_9" style="display:none">
      <div class="mapContents" id="mapRgn_12"></div>
  </div>
  <div class="Map" id="mapArea_10" style="display:none">
      <div class="mapContents" id="mapRgn_13"></div>
  </div>
  <div class="Map" id="mapArea_11" style="display:none">
      <div class="mapContents" id="mapRgn_14"></div>
  </div>
  <div class="Map" id="mapArea_12" style="display:none">
      <div class="mapContents" id="mapRgn_15"></div>
  </div>
  <div class="Map" id="mapArea_13" style="display:none">
      <div class="mapContents" id="mapRgn_16"></div>
  </div>
  <div class="Map" id="mapArea_14" style="display:none">
      <div class="mapContents" id="mapRgn_17"></div>
  </div>
   <!-- SGIS4_1105 추가시작 -->
  <div class="Map" id="mapArea_15" style="display:none">
      <div class="mapContents" id="mapRgn_18"></div>
  </div>
  <div class="Map" id="mapArea_16" style="display:none">
      <div class="mapContents" id="mapRgn_19"></div>
  </div>
  <div class="Map" id="mapArea_17" style="display:none">
      <div class="mapContents" id="mapRgn_20"></div>
  </div>
  <!-- SGIS4_1105 추가끝 -->
  <!-- 대쉬보드 END-->
</div>
</div>
 </div> <!-- mng_s 20220325 이진호, 주석 해제 -->
</div>