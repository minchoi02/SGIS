<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %> 
<!DOCTYPE html>
<html lang="ko">
<head>
<!-- 2020.09.16[한광희] My통계로 명칭 변경 START -->
<title>My통계로(路)</title>
<meta name="title" content="My통계로(路)">
<!-- 2020.09.16[한광희] My통계로 명칭 변경 END -->
<link rel="stylesheet" href="${ctx }/resources/m2020/plugins/swiper.css" />
<!-- 하단 리스트 위 아래 Swipe 이벤트 -->
<script src="${ctx }/resources/m2020/plugins/swiper.min.js" type="text/javascript"></script>
<script src="${ctx }/resources/m2020/plugins/jquery.touchSwipe.min.js" type="text/javascript"></script>
<script src="${ctx }/resources/m2020/js/jquery.touchFlow.js" type="text/javascript"></script>

<link rel="stylesheet" href="${ctx }/resources/m2020/css/subpage.css" />
<link rel="stylesheet" href="${ctx }/resources/m2020/css/stateMe/common.css" /> 

<script>
//<![CDATA[
var selItem = '<c:out value="${selItem}"/>';
var stat_data_id = '<c:out value="${stat_data_id}"/>';
var stat_data_srv_nm = '<c:out value="${stat_data_srv_nm}"/>';

var lifeCycleItemIdList1 = '<c:out value="${lifeCycleItemIdList1}"/>';
var lifeCycleItemIdList2 = '<c:out value="${lifeCycleItemIdList2}"/>';
var interestRealmItemIdList1 = '<c:out value="${interestRealmItemIdList1}"/>';
var interestRealmItemIdList2 = '<c:out value="${interestRealmItemIdList2}"/>';
$(document).ready(function() {
});
//]]>
</script>

<script src="${ctx }/resources/m2020/js/statsMe/statsMeMap.js"></script>
</head>
<body>

	<div class="nav-2022">
		<div class="leftCol">
			<span id="map_tit">1인 가구 변화 현황</span>
		</div>
		<!-- <div class="">안들어감...</div> -->
	</div>
	
	<!-- 2020.09.09[한광희] My통계로 화면 재구성 START -->
	<div class="contentBox">
		<div class="MapArea">
			<div class="Map" style="overflow: hidden; position: fixed; top: 101px; width: 100%;">
				<div id="map"></div>
				<div class="resultWrap" style="z-index: 1100; bottom: 55px;"> 
					<!-- 내 위치 버튼 START -->
					<div class="currenPositionWrap">
						<div class="currenPosition" style="bottom:30px;">
							<style>
							#common_popup_area { bottom:140px !important; }
							</style>
							<div class="locationboxwrap">
								<span class="selectAreaIcon">
									<svg width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M13.125 6.25C13.125 10.625 7.5 14.375 7.5 14.375C7.5 14.375 1.875 10.625 1.875 6.25C1.875 4.75816 2.46763 3.32742 3.52252 2.27252C4.57742 1.21763 6.00816 0.625 7.5 0.625C8.99184 0.625 10.4226 1.21763 11.4775 2.27252C12.5324 3.32742 13.125 4.75816 13.125 6.25Z" stroke="#4F4F4F" stroke-linecap="round" stroke-linejoin="round"/>
										<path d="M7.5 8.125C8.53553 8.125 9.375 7.28553 9.375 6.25C9.375 5.21447 8.53553 4.375 7.5 4.375C6.46447 4.375 5.625 5.21447 5.625 6.25C5.625 7.28553 6.46447 8.125 7.5 8.125Z" stroke="#4F4F4F" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>						
								</span>
								<span id="statsMeMapMyLocation_name" class="selectArea">전국</span>
							</div>
							<button id="myNeighberhoodJobMyLocation" class="btn_goPostion" type="button">
								<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M8.49918 14.1727C11.6323 14.1727 14.1722 11.6328 14.1722 8.49967C14.1722 5.36655 11.6323 2.82666 8.49918 2.82666C5.36607 2.82666 2.82617 5.36655 2.82617 8.49967C2.82617 11.6328 5.36607 14.1727 8.49918 14.1727Z" fill="white" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M8.4999 10.5667C9.64163 10.5667 10.5672 9.64114 10.5672 8.49941C10.5672 7.35768 9.64163 6.43213 8.4999 6.43213C7.35817 6.43213 6.43262 7.35768 6.43262 8.49941C6.43262 9.64114 7.35817 10.5667 8.4999 10.5667Z" fill="white" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M8.5 2.8269V1" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M2.8269 8.49951H1" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M8.5 14.1729V15.9998" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M14.1729 8.49951H15.9998" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</button>
							<!-- 2020.09.11[신예리] 웹접근성 문제로 인한 text 추가 START -->
							<!-- 관심지역 설정 버튼 -->
<!-- 							<button id="selectArea" class="databtn04" title="관심지역 설정 버튼">관심지역 설정 버튼</button> 2020.09.11[신예리] 웹접근성 문제로 인한 text추가 -->
						</div> 
						<div class="databtnWrap" style="bottom:30px !important;">
							<!-- 통계수치on/off -->
							<!-- 2022.09.29 [송은미] 생활환경종합 팝업 추가 -->  
							<button id="lifeEnvironmentToggle" class="btn_infoView infoOff" title="생활환경종합 팝업 열기 버튼">
								<svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M13.2237 1.15562C11.7734 0.509204 10.1741 2.01021 9.17043 3.20443C8.16124 2.01021 6.56198 0.509204 5.11713 1.15562C3.23661 1.99377 2.32669 4.36031 3.0822 6.44199C3.83772 8.52366 9.14838 12.2761 9.14838 12.2761C9.14838 12.2761 14.4756 8.52366 15.2146 6.44199C15.9535 4.36031 15.1208 1.99377 13.2237 1.15562Z" stroke="#222222" stroke-linejoin="round"/>
									<path d="M0 7.58142H7.03676L8.44302 4.93002L9.75552 9.2851L11.7408 3.98779L12.7004 7.58142H18" fill="white"/>
									<path d="M0 7.58142H7.03676L8.44301 4.93002L9.75551 9.2851L11.7408 3.98779L12.7004 7.58142H18" stroke="#222222" stroke-linejoin="round"/>
								</svg><br />종합							
							</button>
							<button onclick="javascript:$statsMeMap.ui.showNumberClick();" id="showNumberBtn" class="databtn01" title="">
								<svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M10.3029 3.74991C10.5008 2.8286 9.93674 1.83959 9.043 1.5409C8.14927 1.2422 7.2643 1.74693 7.06638 2.66824C6.86846 3.58956 7.43253 4.57857 8.32627 4.87726C9.22 5.17596 10.105 4.67123 10.3029 3.74991Z" stroke="#222222" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M12.3009 12.7572C12.4989 11.8359 11.9348 10.8469 11.0411 10.5482C10.1473 10.2495 9.26235 10.7543 9.06442 11.6756C8.8665 12.5969 9.43057 13.5859 10.3243 13.8846C11.2181 14.1833 12.103 13.6785 12.3009 12.7572Z" stroke="#222222" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M4.59488 10.1816C4.79281 9.26024 4.22874 8.27123 3.335 7.97254C2.44126 7.67384 1.55629 8.17857 1.35837 9.09988C1.16045 10.0212 1.72452 11.0102 2.61826 11.3089C3.512 11.6076 4.39696 11.1029 4.59488 10.1816Z" stroke="#222222" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M17.6418 6.20255C17.8397 5.28124 17.2756 4.29223 16.3819 3.99353C15.4881 3.69484 14.6032 4.19957 14.4052 5.12088C14.2073 6.04219 14.7714 7.0312 15.6651 7.3299C16.5589 7.62859 17.4438 7.12386 17.6418 6.20255Z" stroke="#222222" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M11.6953 10.418L14.782 7.03452" stroke="#222222" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M3.98828 7.84229L7.07496 4.45884" stroke="#222222" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M8.90935 5.07212L10.2262 9.92725" stroke="#222222" stroke-linecap="round" stroke-linejoin="round"/>
								</svg><br />수치	
							</button>
							<!-- 범례 -->
							<button onlick="#" id="btnrvTotletop" class="databtn02" style="">
								<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g clip-path="url(#clip0_999_8968)">
									<path d="M8.50033 1.4165L1.41699 4.95817L8.50033 8.49984L15.5837 4.95817L8.50033 1.4165Z" stroke="#222222" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M1.41699 12.0415L8.50033 15.5832L15.5837 12.0415" stroke="#222222" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M1.41699 8.5L8.50033 12.0417L15.5837 8.5" stroke="#222222" stroke-linecap="round" stroke-linejoin="round"/>
									</g>
									<defs>
									<clipPath id="clip0_999_8968">
									<rect width="17" height="17" fill="white"/>
									</clipPath>
									</defs>
								</svg><br />범례
							</button>
						</div> 
					</div>
					<!-- 범례 tooltip START -->
					<div class="tooltipbox_remarks" id="dataRemarks" style="top: -320px;">
						<button class="ColorRangeClose02" id="dataRemarks_close" type="button" title="닫기">닫기</button>
						<!-- 색상 범례 START -->
						<div id="dataRemarksColor" style="display: block; margin-top: 15px;">
							<div class="tooltipbox_row" style="align-items:flex-start;">
								<div class="tooltipbox_Vrow">
									<button type="button" id="reverseBtn" class="syncBtn"></button>
									<div class="color_checkbox02">
					  					<table>	
											<tr> 
												<td>
													<ul class="colorck02">
														<li><a class="circle" style="background-color:#f16b41;" href="javascript:void(0)" data-start="#ffd75d" data-end="#cd1103" data-original-start="#ffd75d" data-original-end="#cd1103" data-negative="false"></a></li>
														<li><a class="circle active" style="background-color:#dc476f;" href="javascript:void(0)" data-start="#cccccc" data-end="#7a0021" data-original-start="#cccccc" data-original-end="#7a0021" data-negative="false"></a></li>
														<li><a class="circle" style="background-color:#539c3f;" href="javascript:void(0)" data-start="#eaf5c0" data-end="#0e4000" data-original-start="#eaf5c0" data-original-end="#0e4000" data-negative="false"></a></li>
														<li><a class="circle" style="background-color:#598aac;" href="javascript:void(0)" data-start="#cccccc" data-end="#004574" data-original-start="#cccccc" data-original-end="#004574" data-negative="false"></a></li>
														<li><a class="circle" style="background-color:#7d63ad;" href="javascript:void(0)" data-start="#cccccc" data-end="#230064" data-original-start="#cccccc" data-original-end="#230064" data-negative="false"></a></li>
													</ul>
												</td>
											</tr>
											<tr> 
												<td style="padding-top:10px;">								 
												</td>
											</tr>
										</table> 
					  				</div>
								</div>
								<div class="tooltipbox_Vrow">
									<div id="color_list" class="color_checkbox02" style="width: 90px;">
										<label for="step01" style="background-color:black;height: 22px;display: inline-block;background-repeat: no-repeat;background-position: 0 0;font-size: 15px;vertical-align: middle;cursor: pointer;opacity: 1;width: 90px"></label>
										<div class="color-step step02-css-checkbox">
											<input name="color-step" id="step02" class="step02-css-checkbox" style="background-color:#f16b41;" type="checkbox" onclick="oneCheckbox(this)" />
											<label for="step02" class="step02-css-label-2step"></label>
										</div>
										<div class="color-step step02-css-checkbox">
											<input name="color-step" id="step03" class="step02-css-checkbox" type="checkbox" onclick="oneCheckbox(this)" />
											<label for="step03" class="step02-css-label-3step"></label>
										</div>
										<div class="color-step step02-css-checkbox">
											<input name="color-step" id="step04" class="step02-css-checkbox" type="checkbox" onclick="oneCheckbox(this)" />
											<label for="step04" class="step02-css-label-4step"></label>
										</div>
										<div class="color-step step02-css-checkbox">
											<input name="color-step" id="step05" class="step02-css-checkbox" type="checkbox" onclick="oneCheckbox(this)" />
											<label for="step05" class="step02-css-label-5step"></label>
										</div>
										<div class="color-step step02-css-checkbox">
											<input name="color-step" id="step06" class="step02-css-checkbox" type="checkbox" onclick="oneCheckbox(this)" />
											<label for="step06" class="step02-css-label-6step"></label>
										</div>
										<div class="color-step step02-css-checkbox">
											<input name="color-step" id="step07" class="step02-css-checkbox" type="checkbox" onclick="oneCheckbox(this)" />
											<label for="step07" class="step02-css-label-7step"></label>
										</div> 
									</div>
									<div class="tooltipbox_row">
										<p id="colorMaxNum">6,762</p>
									</div>
								</div> 
							</div>
						</div>
						<!-- 색상범례 END -->
						
						<!-- 버블 범례 START -->
						<div id="dataRemarkBubble" style="display: none;">
							<div class="remarkersBubble_row">
								<div class="tooltipbox_Vrow">
									<button type="button" id="reverseBtn2" class="syncBtn"></button>
									<button type="button" class="remakerSettingBtn"></button> 
									<button type="button" class="remakerMenuBtn"></button> 
								</div>
								<div class="tooltipbox_row">
									<div class="ring" id="bubbleLegendLine2">
										<ul class="colorbar" id="colorStatus" style="font-family: Arial; opacity: 1;">
										</ul>
									</div>
							 		<div id="bubbleLegendLine">
							 		</div> 
								</div> 
							</div>
						</div>
						<!-- 버블 범례 END -->
						
						<!-- 열지도 범례 START -->
						<div id="dataRemarkHeat" style="display: none;">
							<div class="remarkersBubble_row">
								<div class="tooltipbox_Vrow">
									<div class="tooltipbox_Vrow">
										<p>반지름 조절(Radius)</p>
										<div class="Rangecontainer">  
							  				<div class="Rangeslider heatBlurSlider heatSlider" id="heatRadiusSlider"></div>
						  					<span id="heatRadiusText">20</span>
										</div> 
										<div class="Rangebottomrow">
											<p>5</p>
											<p>40</p>
										</div>
									</div>
									<div class="tooltipbox_Vrow">
										<p>흐림도 조절(Blur)</p>
										<div class="Rangecontainer">  
							  				<div class="Rangeslider" id="heatBlurSlider"></div>	
							  				<span id="heatBlurText">70</span>
										</div>
										<div class="Rangebottomrow">
											<p>20</p>
											<p>120</p>
										</div>
									</div>
								</div> 
							</div>
						</div>
						<!-- 열지도 범례 END -->
						
						<div class="remarkersType_row">
							<ul class="remarkersTypeArea" id="statsMeMapMapType">
								<li id="statsMeMapMapType_color" style="display: block;"><a href="javascript:srvLogWrite('O0', '51', '05', '03', '색상', '');">색상</a></li>
								<li id="statsMeMapMapType_bubble" style="display: block;"><a href="javascript:srvLogWrite('O0', '51', '05', '03', '버블', '');">버블</a></li>
								<li id="statsMeMapMapType_heat" style="display: none;"><a href="javascript:srvLogWrite('O0', '51', '05', '03', '열', '');">열지도</a></li>
								<li id="statsMeMapMapType_poi" style="display: block;"><a href="javascript:srvLogWrite('O0', '51', '05', '03', 'POI', '');">POI</a></li>
								<li id="statsMeMapMapType_grid" style="display: none;"><a href="javascript:srvLogWrite('O0', '51', '05', '03', '격자', '');">격자</a></li>
							</ul>
						</div>
					</div>
					<!-- 범례 영역 일단 display:none; 처리 -->
					<!-- 범례 Toggle -->
					<!-- 범례 checkbox 중복 선택 방지 -->
					<script>
						function oneCheckcolor(a) {
							var obj = document.getElementsByName("color");
							for (var i = 0; i < obj.length; i++) {
								if (obj[i] != a) {
									obj[i].checked = false;
								}
							}
						}
	
						function oneCheckbox(a) {
							var obj = document.getElementsByName("color-step");
							for (var i = 0; i < obj.length; i++) {
								if (obj[i] != a) {
									obj[i].checked = false;
								}
							}
						}
					</script>
					<!-- 범례 tooltip END -->
				</div>
			</div>
		</div>
		
		<!-- 타이틀 START -->
		<div class="map_tit" style="margin-top: 25px; display:none" >
			<span id="map_tit" class="maptit01">1인 가구 변화 현황</span>
		</div>
		<!-- 타이틀 END -->
		
		<!-- 생활환경 정보 START -->
		<div id="lifeEnvironmentToggle" class="btn_infoView infoOff"></div>
		<!-- 생활환경 정보 END -->
		
		<!-- 통계로 리스트 START-->
		<div class="statsMeMainListWrap">
			<div class="statsMeMainListbox">
				<div class="statsMeMainList" id="statsMeInfo">
					<div class="gridrow">
						<h2></h2>
						<a href="" class="databoardBtn">데이터보드</a>
					</div>
					<div class="gridrow_txt">
						<p></p>
					</div>
				</div>
			</div>
		</div>
		<div id="statsMeListDiv" style="position: fixed; background-color: white; z-index: 999;"> <!--[2022-10-20] css 수정-->
			<div>
				<div class="statsMeCategorytit">
	       			<h2>생애주기/관심분야에 맞는 공간통계정보를 추천해 드립니다.</h2> 
	       			<button id="stastMeListPopup_close" class="" type="button">	       				
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1 1L13 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M13 1L1 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>							       				
	       			</button>
	      		</div>
	      		<div class="CategoryWrap" style="padding: 5px;">
	   				<h4 class="statsMeCategorySubtit" name="mainStatMe" id="lfeCycle" style="margin-bottom:10px;">생애주기</h4>
		   			<a class="CategoryBtn" name="mainLfeCycle" id="LFECYCLE_INFANT_CHILD">영유아/어린이</a>
		      		<a class="CategoryBtn" name="mainLfeCycle" id="LFECYCLE_YNGBGS">청소년</a>
			        <a class="CategoryBtn" name="mainLfeCycle" id="LFECYCLE_YGMN">청년</a>
			        <a class="CategoryBtn" name="mainLfeCycle" id="LFECYCLE_ADULT">중장년</a> 
	      		</div>
	      		<div class="CategoryWrap" style="padding: 5px;">
	      			<h4 class="statsMeCategorySubtit visi"></h4>  
	       			<a class="CategoryBtn" name="mainLfeCycle" id="LFECYCLE_ODSN">노년</a>
	       			<a class="CategoryBtn" name="mainLfeCycle" id="LFECYCLE_PREGNAN_CHLDBRTH_CHLDCR_FEMALE">임신/출산/육아여성</a>
	       			<a class="CategoryBtn" name="mainLfeCycle" id="LFECYCLE_PSN_1_FAMILY">1인가구</a> 
	      		</div> 
	      		<div class="CategoryWrap" style="padding: 5px;">
	      			<h4 class="statsMeCategorySubtit" name="mainStatMe" id="statDistance" style="margin-bottom:10px;">관심분야</h4>
	       			<a class="CategoryBtn" name="mainStatDistance" id="DSTNC_FD">먹거리</a>
			        <a class="CategoryBtn" name="mainStatDistance" id="DSTNC_HOUSE">살거리</a>
			        <a class="CategoryBtn" name="mainStatDistance" id="DSTNC_JOB">일거리</a>
			        <a class="CategoryBtn" name="mainStatDistance" id="DSTNC_TRNSPORT">탈거리</a>
	      		</div>
	      		<div class="CategoryWrap bb" style="padding: 5px;">
	    			<h4 class="statsMeCategorySubtit visi"></h4> 
	       			<a class="CategoryBtn" name="mainStatDistance" id="DSTNC_EDU">배울거리</a>
	       			<a class="CategoryBtn" name="mainStatDistance" id="DSTNC_PLY">보고놀거리</a>
	       			<a class="CategoryBtn" name="mainStatDistance" id="DSTNC_HEALTH">건강거리</a> 
	       			<a class="CategoryBtn" name="mainStatDistance" id="DSTNC_SAFE">안전거리</a>
	      		</div>
			</div>
			<!-- <div class="result_list" id="result_list" style="height: calc(100% - 45px) !important;"> --> 
			<div class="result_list" id="result_list" style="position:relative !important; width:100% !important; border:none !important; height:calc(100% - 45px); top:auto !important; left:auto !important; overflow:hidden;"> <!--[2022-12-21] css 수정-->
				<div class="gridheader" style="border-top:0;">
					<p id="list_cnt"><span>검색결과</span>119<span>건</span></p>
					<div class="selectbox">
						<label for="ex_select"></label> 
						<select id="selectStatMeCatalogSorting" style="padding: 0;">
							<option value="statDataNm" selected>제목순</option>
							<option value="accCnt">조회순</option>
						</select>
					</div>
				</div>
				<div class="search-result">
					<input type="text" id="statsMeCatalogKwrd" class="search-bar02" placeholder="결과 내 재검색" style="-webkit-ime-mode:active; -moz-ime-mode:active; -ms-ime-mode:active; ime-mode:active;" title="결과 내 재검색 영역">	
					<a href="javascript:void(0)" id="searchKwrd">
						
						<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_1026_8996)">
						<path d="M6.875 11.875C9.63642 11.875 11.875 9.63642 11.875 6.875C11.875 4.11358 9.63642 1.875 6.875 1.875C4.11358 1.875 1.875 4.11358 1.875 6.875C1.875 9.63642 4.11358 11.875 6.875 11.875Z" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M13.125 13.125L10.4062 10.4062" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</g>
						<defs>
						<clipPath id="clip0_1026_8996">
						<rect width="15" height="15" fill="white"/>
						</clipPath>
						</defs>
						</svg>

					</a>
				</div> 
				<div class="gridWrap" id="list_div" style="height: 150px !important; border-top: 1px solid #f1f1f1;">
					<div class="gridheader_con">
						<div class="gridrow">
							<h2>영유아/어린이(남자) 인구현황</h2>
						</div>
						<div class="gridrow_txt">
							<p>통계청 인구주택총조사에 의한 영유아 및 어린이 인구 정보를...</p>
						</div>
					</div>
				</div>
			</div>
			 
		</div>
		<!-- 통계로 리스트 END-->	
		
		<!-- 팝업 배경 START -->
		<!-- <div class="popBack" style="display: none;">
			<div id="statsMe_popup_back" class="aside_back2"></div>
		</div> -->
		<!-- 팝업 배경 END -->
		
		<!-- 관심지역 설정 팝업 START --> 
		<!-- <div id="statsMePopupArea" class="popWrap" style="display: none; width: 310px; left:50%; top:50%; transform:translate(-50%, -50%)"> -->
		<div id="statsMePopupArea" class="popWrap" style="display: none; width: 310px; left:50%; top:44%; transform:translate(-50%, -50%)"> <!--2022-12-21 css 수정  -->
			<div class="popBox">
				<div class="popHeader">
					<span class="popTitle" id="statsMePopupArea_title">관심지역변경</span>
					<a id="statsMePopupArea_close" href="javascript:void(0);" class="btn_popClose" type="button"></a>
				</div>
				<div class="popContentBox">
					<div class="select_wrap">
						<select id="statsMePopupArea_sido" title="시도 선택">
							
						</select>
						
						<select id="statsMePopupArea_sgg" title="시군구 선택">
							
						</select>
						
						<select id="statsMePopupArea_emdong" title="읍면동 선택">
							
						</select> 
					</div>  
				</div> 
				<!--2022-11-07 추가 -->
				<div class="area_list_wrap">
			        <ul class="area_list--district popupArea_sido" style="padding-left: 1px;"></ul>
			    </div>
				<div class="PopFooter" style="margin-top: 10px;">
					<button id="statsMePopupArea_ok" class="btn_popType4" type="button">확인</button>
				</div>
			</div>
		</div>
		<!--관심지역 설정 팝업 END -->
	
		<!-- 데이터보드 START -->
		<div id="statsSelectDiv2" class="statsSelectDiv2" style="display: none;">
			<div class="datatit">
		    	<h2>데이터보드</h2>
				<button id="boardClose" style="position: absolute; right: 16px;">
					<svg width="15" height="15" viewBox="0 0 15 15" fill="#000" xmlns="http://www.w3.org/2000/svg">
						<path d="M1 1L13 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
						<path d="M13 1L1 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
					</svg>
				</button>
		    </div> 
		    <div class="sub_Wrap">
		    	<!-- Swiper START -->
		    	<div class="swiper-container gallery-thumbs" id="dataBoardTit" style="height:auto !important;">
		      		<div class="swiper-wrapper" style="margin-bottom: 15px;">
		        		<div class="swiper-slide tabDataboard" id="graphT">
		          			<p>그래프</p>
		        		</div>
		        		<div class="swiper-slide tabDataboard" id="tableT">
		          			<p>표</p>
		        		</div>
		        		<div class="swiper-slide tabDataboard" id="basicInfoT">
		          			<p>기본정보</p>
		        		</div>
		      		</div>
		    	</div>
				<!-- Swiper END -->
		    	<div class="swiper-container gallery-top" style="height:calc(100vh - 240px); overflow-y: auto; overflow-x: hidden;" id="statsMe_detaboard">	<!-- 2020.09.25[한광희] 데이터보드 swipe 수정 -->
		      		<div class="swiper-wrapper">
		   				<!-- 데이터보드 화면(차트) 시작 -->
		        		<div class="swiper-slide Con">
		          			<div class="conTit mlr16">
		            			<h5 id="chartTit"></h5>
		          			</div>
		          			<div class="conWrap">
		            			<p class="subtit" id="chartSelCont"></p>
		            			<p class="num" id ="chartSelVal"><span id="chartSelUnit"></span></p>
		            			<div class="graphArea" style="width: 100%;">
		    						<div id="statsMeChart"></div>
		            			</div>
		          			</div>
		        		</div>
		        		<!-- 데이터보드 화면(차트) 종료 -->
		        		<!-- 데이터보드 화면(표) 시작 -->
		        		<div class="swiper-slide Con">
		          			<div class="conTit mlr16" style="flex-direction: column;">
		            			<h5 id="boardTit"></h5>
		            			<span id="boardSourceTit" style="margin-left:16px; font-size:13px; white-space: pre-line;"></span>	<!-- 2020.09.22[한광희] 개행 추가 -->
		          			</div>
		          			<div class="conWrap">
		              			<div class="tb_wrap">
		                			<div class="tb_box" style="border-bottom: none;">
		                  				<table class="tb" id="statsMeMapDataBoard_dataTable">
		                  					<thead>
			                    				<tr class="fixed_top">
			                      					<th class="cell1" scope="col">순위</th>
			                      					<th class="cell2" scope="col">집계구번호</th>
			                      					<th class="cell3" scope="col">인구</th>
			                    				</tr>
		                    				</thead>
		                    				<tbody style="border-bottom: 1px solid #dedede;">
											</tbody>
		                  				</table>
		                			</div>
		              			</div>
		          			</div>
		        		</div>
		        		<!-- 데이터보드 화면(차트) 종료 -->
		        		<!-- 데이터보드 화면(기본정보) 시작 -->
		        		<div class="swiper-slide Con">
		          			<div class="conTit mlr16" style="flex-direction: column;">
		            			<h5 id="statsMeDetailInfoStatDataNm"></h5>
		            			<span id="statsMeDetailInfoSubInfo" style="margin-left: 16px; color: #777C82;"></span>
		          			</div>
		          			<div class="bd-bt"></div>
		          			<div class="conWrap">
		            			<div class="conWrap_row">
		              				<p id="statsMeDetailInfoStatDataExp" style="white-space: pre-line;"></p>
		            			</div>
		            			<div class="conWrap_row">
		              				<p>데이터출처</p>
		              				<span class="conWrap_txt" id="statsMeDetailInfoSource">통계청 인구주택총조사</span>
		            			</div>
		            			<div class="conWrap_row" style="flex-direction: column;">
		              				<p>SGIS 콘텐츠 출처</p>
		              				<div class="conWrap_txt">
		                				<span class="conWrap_flow" id="statsMeDetailInfoMenuNm">대화형 통계지도</span>
		              				</div>
		            			</div>
		            			<div class="conWrap_row">
		              				<p>키워드</p>
		              				<span class="conWrap_txt" id="statsMeDetailInfoKwrd">1인가구</span>
		            			</div>
		            			<div class="conWrap_row" style="flex-direction: column; border-bottom:0;">
		              				<p>추천서비스 목록</p>
		              				<div id="statsMeDetailInfoRecomendSvc">
		            				</div>
		          				</div>
		        			</div>
		        		</div>
		        		<!-- 데이터보드 화면(기본정보) 종료 -->
		      		</div>
				</div>
			</div>
		    <div class="sfbFooter"> 
				<button class="btn_search" type="button" style="width: 100%;" onclick="javascript:$statsMeMap.ui.closeDashBoard();">이전</button>
			</div>
		</div>
		<!-- 데이터보드 END -->
	</div>
	<!-- 2020.09.09[한광희] My통계로 화면 재구성 END -->
</body>
</html>