<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/m2020/includes/taglib.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
<html lang="ko">
<head>
	<title>[총조사시각화지도] SGIS plus mobile</title>
	<%@include file="/WEB-INF/jsp/m2021/includes/includeMapHeaderFile.jsp" %>
	<script src="${ctx }/resources/m2021/js/totSurvMap.js"></script>
	<script src="${ctx }/resources/m2021/js/theme/totSurv/${param.theme }.js"></script>
	<sitemesh:write property='head'/>
	<style>
		.legend-box{border-radius: 50%;}
		.modal[data-type=tooltip]{z-index:99;}
	</style>
</head>
<body>
	<c:set var="metaTitle" scope="request"><sitemesh:write property='meta.title'/></c:set>
	<jsp:include page="/WEB-INF/jsp/m2021/includes/includeHeader.jsp"/>
	<div class="container">
		<!-- begin:: -->
		<div class="dashboard">
			<!-- s::내위치 -->
			<div class="nav-2022">
				<div class="leftCol">
					<span class="btnNavThematic"><sitemesh:write property='meta.sub-title'/>
						<svg width="12" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z" /></svg>
					</span>
					<!-- <span class="maptit03">총인구(명)</span> -->
				</div>
				<div class="rightCol">
					<!-- 2022-12-01 어업,경제 추가  -->
					<c:if test="${param.theme=='fishery' }">
						<div class="fisheryType" style="margin-right:3px;">
							<span>해수면</span>
						</div>
					</c:if>
					<c:if test="${param.theme=='ecnmy' }">
						<div class="ecnmyType" style="margin-right:3px;">
							<span>9차</span>
						</div>
					</c:if>
					<!-- 2022-11-21 년도 위치 변경  -->
					<p id="data-year" class="data-year" style="margin-right:3px"></p>
					<div class="locationboxwrap2">
						<span class="selectAreaIcon2">
							<svg width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M13.125 6.25C13.125 10.625 7.5 14.375 7.5 14.375C7.5 14.375 1.875 10.625 1.875 6.25C1.875 4.75816 2.46763 3.32742 3.52252 2.27252C4.57742 1.21763 6.00816 0.625 7.5 0.625C8.99184 0.625 10.4226 1.21763 11.4775 2.27252C12.5324 3.32742 13.125 4.75816 13.125 6.25Z"  stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M7.5 8.125C8.53553 8.125 9.375 7.28553 9.375 6.25C9.375 5.21447 8.53553 4.375 7.5 4.375C6.46447 4.375 5.625 5.21447 5.625 6.25C5.625 7.28553 6.46447 8.125 7.5 8.125Z" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>						
						</span>
						<div id="location-text" style="display:flex;"><p>전국</p></div>
					</div>
					
					<!-- <p id="data-year" class="data-year" style="margin-left:3px"></p> -->
					
				</div>
				
				<%-- <a href="#" class="btn__option" onclick="javascript:srvLogWrite('O0', '13', '03', '01', '', ''); $('#filter').animate({'right': '0'},175);return false;"><div id="location-text"><p>전국</p></div></a>
				<div class="map__above__btn d-flex justify-content-between align-items-center">
					<p id="data-year" class="data-year"></p>
					<a href="#" class="btn__option" onclick="javascript:srvLogWrite('O0', '13', '03', '01', '', ''); $('#filter').animate({'right': '0'},175);return false;"><img src="${ctx }/resources/m2021/img/map/i_option.png" alt="조회"></a>
				</div> --%>
			</div>
			<!-- <div class="map__above d-flex" style="justify-content:flex-end;">
				
				
			</div> -->
			<div class="nav-layer">
				<ul>
					<li><a href="/mobile/m2021/map/totSurv.sgis?theme=population" onclick="javascript:srvLogWrite('O0', '51', '01', '07', '총조사 시각화 지도-인구', '')">인구</a></li>
					<li><a href="/mobile/m2021/map/totSurv.sgis?theme=houseHold" onclick="javascript:srvLogWrite('O0', '51', '01', '07', '총조사 시각화 지도-가구', '')">가구</a></li>
					<li><a href="/mobile/m2021/map/totSurv.sgis?theme=house" onclick="javascript:srvLogWrite('O0', '51', '01', '07', '총조사 시각화 지도-주택', '')">주택</a></li>
					<li><a href="/mobile/m2021/map/totSurv.sgis?theme=farm" onclick="javascript:srvLogWrite('O0', '51', '01', '07', '총조사 시각화 지도-농업', '')">농업</a></li>
					<li><a href="/mobile/m2021/map/totSurv.sgis?theme=forestry" onclick="javascript:srvLogWrite('O0', '51', '01', '07', '총조사 시각화 지도-임업', '')">임업</a></li>
					<li><a href="/mobile/m2021/map/totSurv.sgis?theme=fishery" onclick="javascript:srvLogWrite('O0', '51', '01', '07', '총조사 시각화 지도-어업', '')">어업</a></li>
					<li><a href="/mobile/m2021/map/totSurv.sgis?theme=ecnmy" onclick="javascript:srvLogWrite('O0', '51', '01', '07', '총조사 시각화 지도-경제', '')">경제</a></li>
				</ul>
			</div>
			<!-- 지역변경 팝업 [2022.10.13] -->
			<div id="totSurvMapRegionPop" class="form-select" style="display:none; width:200px;">
				<div class="popBox">
					<div class="popHeader">
						<span class="popTitle" id="popupArea_title">관심지역변경</span>
						<button id="common_popup_area_close" class="btn_popClose" type="button">
<!-- 							<svg width="15" height="15" viewBox="0 0 15 15" fill="#000" xmlns="http://www.w3.org/2000/svg">
								<path d="M1 1L13 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
								<path d="M13 1L1 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
							</svg> -->
						</button>
					</div>
					<!-- 지역변경 팝업 추가[2022.10.20] -->
					<div class="area_select_wrap">
				        <!-- <div class="area_select_inner">
				          <span class="valueSido">시/도</span>
				          <span>
				          	<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>
				          </span>
				          <span class="valueSgg">시/군/구</span>
				        </div> -->
				    </div>
				    <!-- <ul>
				    	<li id="map-navigator-sido" style="width: 50%;"></li>
				    	<li id="map-navigator-sgg" style="width: 50%; display: inline-block;"></li>
				   	</ul> -->
				   	<div class="select_wrap" style="margin-top: 10px;">
						<select id="map-navigator-sido"></select>
						<select id="map-navigator-sgg"></select>
					</div>
					<div class="PopFooter" style="margin-top: 0px;">
						<button id="totSurvMapRegionPopOk" class="btn_popType4" type="button" style="width:100%">확인</button>
					</div>
					
				</div>
				
			</div>
			
			<!-- <div id="year-container" class="option__container" style="display:none;">
				<div id="year-list"></div>
			</div> -->
			
			<div id="year-container" class="option__container" style="display:none;">
				<div class="popBox">
					<div class="popHeader">
						<!-- 2022-12-02 class명 변경 -->
						<span class="yearPopTitle" id="">선택년도 변경</span>
 						<span class="fisheryPopTitle" id="" style="display:none">어업 구분 변경</span>
						<span class="ecnmyPopTitle" id="" style="display:none">한국표준산업분류 차수 변경</span>
						<button id="common_popup_year_close" class="btn_popClose" type="button"></button>
					</div>
					
					<div class="select_wrap" style="margin-top: 10px;">
						<!-- 2022-12-02 어업,경제 추가  -->
						<c:if test="${param.theme=='fishery' }">
							<select id="fishery-type">
								<option data-type="sea" class="option__btn" aria-checked="true">해수면</option>
								<option data-type="inland" class="option__btn">내수면</option>
							</select>
							<script>
								$("#fishery-type button").click(function(){
									$("#fishery-type button").attr("aria-checked",false);
									$(this).attr("aria-checked",true);
								});
							</script>
						</c:if>
						<c:if test="${param.theme=='ecnmy' }">
							<select id="ecnmy-type">
								<option class="option__btn" data-type="ecnmy10th" aria-checked="false" >10차</option>
								<option class="option__btn selected" data-type="ecnmy9th" aria-checked="true" selected="selected">9차</option>
							</select>
						</c:if>
						<select id="year-list"></select>
					</div>
					<div class="area_list_wrap">
				        <ul class="area_list--district popupArea_sido" style="padding-left: 1px;"></ul>
				    </div>
					<div class="PopFooter" style="margin-top:10px">
						<button id="totSurvMapYearPopOk" class="btn_popType4" type="button">확인</button>
					</div>
				</div>
			</div>
				
			<div id="common_popup_back" class="aside_back" style="z-index:901; display:none;"></div>
			<!-- e::내위치 -->
			<div class="dashboard__map" style="background:none;">
				<!--[2022-10-17] 지도 저장 수정  -->
				<div style="position:absolute; z-index:300; right:0px; bottom:20px">
					<a href="#" onclick="javascript:srvLogWrite('O0', '13', '04', '01', '', '');" class="icon-point" id="map-download" data-save-image="true" data-confirm-text="해당 지도 이미지를 저장하시겠습니까?" data-target="map">지도 저장</a>
				</div>
<!-- 				<div class="text-right">
					<a href="#" onclick="javascript:srvLogWrite('O0', '13', '04', '01', '', '');" class="icon-point" id="map-download" data-save-image="true" data-confirm-text="해당 지도 이미지를 저장하시겠습니까?" data-target="map">지도 저장</a>
				</div> -->
				<div id="map" style="position: relative;height:calc(100vh - 150px); margin-top:40px;"></div>
				
				
				
				<div style="width:100%;height: 60vh;top:0;">
					<div id="map-tooltip" class="modal dashboard-layer" style="display:none;">
						
							<div class="modal__header d-flex justify-content-between align-items-center">
								<h3 data-id="title" class="modal__tit">-</h3>
								<a href="#" class="btn__cancel" onclick="$('#map-tooltip').hide(); return false;"><span class="btn-close btn-close--black"></span></a>
							</div>
							<div class="modal__body">
								<p> <span class="color-blue font-large fwbold" data-id="region-name1"></span><span class="color-blue font-large fwbold" data-id="total-rank"></span><span class="color-blue font-large fwbold">번째</span><!-- <span class="color-blue font-large fwbold" data-id="region-name"></span> --></p>
								<p><span class="color-red font-large fwbold" data-id="value">-</span><span data-id="map-unit"></span></p>
								<p>(구성비 <span class="color-red" data-id="ratio">-</span>%)</p>
								<a id="detail-area-button" href="#">지역 이동</a>
							</div>
							
						
					</div>
				</div>
			</div>
			
			

			

			
			
			<div class="dashAbsolute">
				<h3 class="dashboard__statistics__title dashOpen">
					<c:if test="${param.theme=='ecnmy' }"><span data-id="ecnmy-name">9차 산업분류</span></c:if> <span><sitemesh:write property='meta.sub-title'/></span> 총괄
					<svg width="20" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>
				</h3>
				<div class="scroll">
					<div class="px15" style="width:100%; margin:0 auto; position:relative; overflow:hidden; ">
						<sitemesh:write property='body'/>
						<c:if test="${param.theme=='ecnmy' }">
							<div class="area-notice border-b mb0 pb10">
								<div class="area-notice__tit">
									<h4 class="icon-info">유의사항</h4>
									<ul class="area-notice__info">
										<li>
										2015년 기준 경제총조사 산업분류 10차 개정자료는 9차 산업
										분류를 10차로 연계하여 서비스합니다.<br> 
										이에 일부 사업체가 대상 외로 변경되는 경우가 발생하여 9차 
										기준 사업체 수, 종사자 수보다 작을 수 있습니다.
										</li>
										<li>
										9차 산업분류에서 10차 산업분류로 개정되면서 산업대분류별 
										사업체 수 등이 변경되어 산업분류 치수 간 비교보다는 통계활
										용도 제고를 위한 참고용으로 활용하도록 권고합니다.		
										</li>
									</ul>
								</div>
							</div>
						</c:if>
					</div>
					<div class="dashboard__notice">
						<div class="dashboard__notice__box">
						차트를 선택하면	색상타입 주제도가 팝업으로 출력되어	
						통계값을 시각화 지도로 볼 수 있습니다.
						</div>
						<p>
							위 결과에 대한 자세한 내용은 ‘<span id="press_release_text"></span>’ 보도자료를 참조 하시기 바랍니다.						
						</p>
						<div class="text-center">
							<a href="#" onclick="javascript:srvLogWrite('O0', '13', '05', '01', '', '');" target="_blank" id="press-release-button" class="dashboard__notice__btn">보도자료</a>
						</div>
					</div>
					<div class="dim" style="z-index:1000;display:none;"></div>
				</div>
			</div>
		</div>
		<!-- end:: -->
	</div>
	<jsp:include page="/WEB-INF/jsp/m2021/includes/includeFilter.jsp"/>
	<jsp:include page="/WEB-INF/jsp/m2021/includes/includeToolipMap.jsp"/>
	<jsp:include page="/WEB-INF/jsp/m2021/includes/includeFooter.jsp"/>
</body>
</html>