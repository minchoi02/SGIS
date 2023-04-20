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
<%@include file="/jsp/include/ststisticsScript.jsp" %>
<style>
	.ui-dialog {
		background-color: #454d5a;
		padding: 0px;
		border: 0px;
	}
	
	.ui-dialog-titlebar {
		background-color: #363A46;
		border: 0px;
	}
	
	.ui-dialog-title {
		color: white;
	}
	
	.ui-dialog-titlebar .ui-dialog-titlebar-close {
		border: 0px;
		background: url(/s-portalcnm/image/button/modal_close.png) no-repeat center;
	}
	
	.ui-dialog-titlebar > .ui-button { outline-width: 0px !important; }
</style>
<script>
	$ecnmyDash = {
		ui: {
			dispOptions: {},
			
		}
	}
	$(document).ready(function() {
		$("#chart_modal").dialog({
			title: "통계표 선택",
			width: 400,
			height: window.innerHeight/2,
			modal: false,
			autoOpen: false
		});
		
		$(".ui-dialog-titlebar-close").html("");
		
		$(".chartManager").on("click", function(e) {
			$("#chart_modal").dialog("open");
			let parentDiv = $(this).parent().parent().parent().prop("id");
			if(parentDiv.indexOf("highChartDiv1") != -1) {
				
			} else if(parentDiv.indexOf("highChartDiv2") != -1) {
				
			} else if(parentDiv.indexOf("highChartDiv3") != -1) {
				
			} else if(parentDiv.indexOf("highChartDiv4") != -1) {
				
			}
		});
		
		$.ajax({
			method: "POST",
			async: false,	// 반드시 동기처리 해야 함
			url: "/view/totSurv/getDispSrvList.do",
			data: {
				iemCl: "S_ECN",
				tblOrd:	tblOrd,
				stattbYear: $totSurvMain.ui.selectedYear
			},
			dataType: "json",
			success: function(res) {
				for(var i=0; i<res.dispOptions.length; i++) {
					if($ecnmyDash.ui.dispOptions[res.dispOptions[i].chartSno] == undefined) {
						$ecnmyDash.ui.dispOptions[res.dispOptions[i].chartSno] = [];
						$ecnmyDash.ui.dispOptions[res.dispOptions[i].chartSno].push(res.dispOptions[i]);
					} else {
						for(var j=0; j<Object.keys($ecnmyDash.ui.dispOptions).length; j++) {
							if(Object.keys($ecnmyDash.ui.dispOptions)[j] == res.dispOptions[i].chartSno) {
								$ecnmyDash.ui.dispOptions[res.dispOptions[i].chartSno].push(res.dispOptions[i]);
							}
						}
					}						
				}
				/* for(var i=0; i<$ecnmyDash.ui.dispOptions[1].length; i++) {		// 항목분류 레벨
					if($ecnmyDash.ui.dispOptions[1][i].objVarId != "13999001") {
						$ecnmyDash.itmLv = "ov_l"+$ecnmyDash.ui.dispOptions[1][i].varOrd+"_list";
						$ecnmyDash.admLv = "ov_l"+$ecnmyDash.ui.dispOptions[1][i].regionVarOrd+"_list";
						break;
					}
				} 
				$ecnmyDash.ajax.params[$ecnmyDash.itmLv] = '0';
				$ecnmyDash.ajax.params[$ecnmyDash.admLv] = '00';
				*/
			},
			error: function(e) {
				//$totSurvMain.ui.alert(errorMessage);
			}
		});
	});
</script>
<!-- 대쉬보드 START-->
<link rel="stylesheet" href='<c:url value="/css/totSurv/style.css"/>'/>
<div class="conWrap" style="min-width: 1500px;">
	<div class="con-L" style="pointer-events: none;">
		<div class="commonTotSurvBack_modal" id="commonTotSurvDetail_popup_back" style="display:none;"></div>
		<!-- 2020-10-19 [주형식] 차트변경 팝업화면 추가 START -->
	<div id="chart_modal" class="chart_modal">
		
	</div>
	<!-- 2020-10-19 [주형식] 차트변경 팝업화면 추가 END -->
		<!-- 2010년 산업분류 9차, 10차 개정 토글 -->
		<div class="ecnmyTab y2015">
			<button class="ecnmyToggle on" id="ecnmy9th">산업분류 9차 개정</button>
			<button class="ecnmyToggle" id="ecnmy10th">산업분류 10차 개정</button>
		</div>
		<div class="col y2015" style="border-top-left-radius: 0; border-top-right-radius: 0;">
			<div style="background: repeating-linear-gradient(45deg, #444, #444 10px, #888 0, #888 20px);width:100%; height:100%;width: 258px;height: 269px;padding: 15px;border-radius: 10px;">
			</div>
	      	<div style="display: none;">
	        	<div class="dataAreatit">
	        		<h5 class="colTit" id="ecnmyTitle">사업체 수</h5>
	          		<h1>51,629,512</h1>
	          		<span class="ml5">개</span>
	        	</div>
		        <div class="highCard" id="areaEcnmyY2015">
		        </div>
		        <div class="cardClick" id="areaecnmy_resultY2015" style="display: none;">
	    		</div>
	  		</div>
		</div>
		
		<!-- 2020.09.16[신예리] Rank span mt10 class 삭제 START -->
		<div class="col mt10 mb5">
  			<h5 class="colTit">사업체 현황</h5>
  			<div>
    			<div  class="numberCard mt10" style="min-height: 110px;background: repeating-linear-gradient(45deg, #444, #444 10px, #888 0, #888 20px);">
    				
				</div>
				<div  class="numberCard mt10" style="min-height: 110px;background: repeating-linear-gradient(45deg, #444, #444 10px, #888 0, #888 20px);">
  					
				</div>
				<div class="numberCard mt10" style="min-height: 110px;background: repeating-linear-gradient(45deg, #444, #444 10px, #888 0, #888 20px);">
			       
     			</div>
    		</div>
  		</div>
  		<!-- 2020.09.16[신예리] Rank span mt10 class 삭제 END -->
  		
	</div>
	<div class="con-R mb5" style="min-width:1158px;"><!-- 20200913 박은식 min값 설정 (추후변경 가능) -->
		<div class="col-SubDivWrap41p mb10" style="pointer-events: none;"> 
	  		<div class="col mb10">
	    		<h5 class="colTitMap">지도</h5> <!-- 2020.10.26[신예리] 클래스 변경 -->
	    		<span class='ColDataSelectSido' id="areaDiv" style="display:inline">전국</span>
	    		<span class='ColDataSelectTit' id="itmDiv" style="display:none"></span>
	    		<button type="button" class="downloadBtn" title="지도 이미지 저장"></button>
	    		<div style="background: repeating-linear-gradient(45deg, #444, #444 10px, #888 0, #888 20px);">
	      			<div class="Map totSurvMap" id="mapArea" style="height: 588px;visibility:hidden;">
	      				
	    			</div>
	  			</div>
			</div>
			<div class="col" id="workerCompositioDiv" style="display:flow-root;height: 197px;padding-bottom: 0px">
			    <div class="row bb pb10">
		      		<h5 class="colTit mr10">보건업∙사업복지서비스업 종사자 구성비</h5>
		  			<div class="iconBox">
	      				<button type="button" class="metaBtn" name="metaBtn" title="통계표 보기(KOSIS)"></button> <!-- 2020.11.13[신예리] 자료출처 버튼 수정  -->
	      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장"></button>
	    			</div>	    			
				</div>
				<div style="width: 50%; float: left;" class="chart">
					<div style="height: 155px;float: right;background: repeating-linear-gradient(45deg, #444, #444 10px, #888 0, #888 20px);border-radius:10px;width: 302px;margin-right: 10px;" id="workerCompositionChart1">
					</div>
					<div class="chartToolTip">
					</div>
				</div>
				<div style="width: 50%; float: left;" class="chart">
					<div style="height: 155px;float: right;background: repeating-linear-gradient(45deg, #444, #444 10px, #888 0, #888 20px); border-radius:10px;width: 302px;margin-left: 10px;" id="workerCompositionChart2">
					</div>
					<div class="chartToolTip">
					</div>
				</div>
				<span style="position: absolute;left: 50%;border-right: 1px solid #cccccc;height: 140px;margin-top: 8px;"></span>
			</div>
		</div>
		<div class="col-SubDivWrap mb10"> 
			<div class="col-SubDivL" id="highChartDiv1">
		  		<div class="row bb pb10">
		    		<h5 class="colTit mr10">산업별 사업체수</h5>
		    		
		  			<div class="iconBox">
	      				<span class="chartManager">통계표 관리</span>
	    			</div>
				</div>
				<div style="height:363px" >
					<div id="highChart1">
					</div>
					<div class="chartToolTip">
					</div>
				</div>				
			</div>
			<div class="col-SubDivR" id="highChartDiv2">
		  		<div class="row bb pb10">
		    		<h5 class="colTit mr10">산업별 종사자수</h5>
		    		
		  			<div class="iconBox">
	      				<span class="chartManager">통계표 관리</span>
	    			</div>
				</div>
				<div style="height:363px;">
					<div id="highChart2">
					</div>
					<div class="chartToolTip">
					</div>
				</div>				
			</div>
	  	</div>
	  	<div class="col-SubDivWrap mb10"> 
			<div class="col-SubDivL" id="highChartDiv3">
		  		<div class="row bb pb10">
		    		<h5 class="colTit mr10">산업별 매출액</h5>
		    		
		  			<div class="iconBox">
	      				<span class="chartManager">통계표 관리</span>
	    			</div>
				</div>
				<div style="height:364px;">
					<div id="highChart3">
					</div>
					<div class="chartToolTip">
					</div>
				</div>
			</div>
			<div class="col-SubDivR" id="highChartDiv4">
		  		<div class="row bb pb10">
		    		<h5 class="colTit mr10">산업별 영업이익률</h5>		    		
		  			<div class="iconBox">
	      				<span class="chartManager">통계표 관리</span>
	    			</div>
				</div>				
				<div style="height:364px;">
					<div id="highChart4">
					</div>
					<div class="chartToolTip">
					</div>
				</div>				
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