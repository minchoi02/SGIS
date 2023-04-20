<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/m2021/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>생활권역 통계지도</title>
<meta name="title" content="생활권역 통계지도">

<link rel="stylesheet" href="${ctx }/resources/m2021/plugins/swiper.css" />

<script src="${ctx }/resources/m2021/plugins/swiper.min.js" type="text/javascript"></script>
<script src="${ctx }/resources/m2021/plugins/jquery.touchSwipe.min.js" type="text/javascript"></script>
<script src="${ctx }/resources/m2021/js/catchmentArea/plugin/jquery.touchFlow.js" type="text/javascript"></script>

<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport"/>
<link rel="stylesheet" href="${ctx }/resources/m2021/css/style.css" />
<link rel="stylesheet" href="${ctx }/resources/m2021/css/catchmentArea/style.css" />
<link rel="stylesheet" href="${ctx }/resources/m2021/css/catchmentArea/map.css" />


<script src="${ctx }/resources/m2021/plugins/Swiper-3.3.1/js/swiper.min.js" type="text/javascript"></script>
<script src="${ctx }/resources/m2021/js/catchmentArea/common.js"></script>
<script src="${ctx }/resources/m2021/js/catchmentArea/map.js"></script>
<script src="${ctx }/resources/plugins/highcharts/highcharts-3d.src.js"></script>
<script src="${ctx }/resources/plugins/highcharts/modules/exporting.js"></script>
<script src="${ctx }/resources/m2021/js/catchmentArea/plugin/solid-gauge.js"></script>
<script src="${ctx }/resources/plugins/highcharts/highchart.drag.js"></script>
<script src="${ctx }/resources/m2021/js/catchmentArea/catchmentAreaApi.js"></script>
<script src="${ctx }/resources/m2021/js/catchmentArea/catchmentAreaMap.js"></script>
<script src="${ctx }/resources/m2021/js/catchmentArea/catchmentAreaObj.js"></script>
<script src="${ctx }/resources/m2021/js/catchmentArea/catchmentAreaBtn.js"></script>
<script src="${ctx }/resources/m2021/js/catchmentArea/catchmentAreaMenu.js"></script>
<script src="${ctx }/resources/m2021/js/catchmentArea/catchmentAreaMsgCommon.js"></script>
<script src="${ctx }/resources/m2021/js/catchmentArea/catchmentAreaLegendInfo.js"></script>
<script src="${ctx }/resources/m2021/js/catchmentArea/catchmentAreaMask.js"></script>
  <!-- SGIS4_생활권역_모바일_SG 시작  -->
<script src="${ctx }/resources/m2021/js/catchmentArea/catchmentAreaReport.js"></script>
  <!-- SGIS4_생활권역_모바일_SG 끝  -->
<script src="${ctx }/resources/m2021/js/catchmentArea/gis.service.absAPI.js"></script>

<script>
$(document).ready(function() {
	srvLogWrite('O0', '12', '01', '01', '', '');
});
</script>
</head>



<body>
	<!-- 2022-12-22 관심지역 설정 팝업 및 back팝업 수정  -->
	<div class="popBack" style="display:none;">
	  	<div id="common_popup_back" class="aside_back" style="z-index:800; opacity: 1;"></div>
	</div>
    <form action="">      	
	<!-- 관심지역 설정 팝업 START --> 
	<div id="common_popup_area" class="popWrap region" style="display: none; z-index:900;">
		<div class="popBox">
			<div class="popHeader">
				<span class="popTitle" id="popupArea_title">관심지역변경</span>
				<button id="common_popup_area_close" class="btn_popClose" type="button"></button>
			</div>
			<div class="select_wrap" style="padding: 20px 0;">
				<select id="popupArea_sido" title="시도 선택">							
				</select>						
				<select id="popupArea_sgg" title="시군구 선택">							
				</select> 						
				<select id="popupArea_emdong" title="읍면동 선택">							
				</select>
			</div>  
		    <div class="area_list_wrap">
	    		<ul class="area_list--district popupArea_sido" style="padding-left: 1px;"></ul>
	    	</div>
		</div>				
		<!-- 2022-10-24 css 수정  2022-12-02 footer 추가 및 css 수정-->
		<div class="PopFooter" style="margin-top:10px">
			<button type="button" class="btn_popType4" id = "option_apply">적용</button>
		</div>
	</div>
	<!--관심지역 설정 팝업 END -->	
    </form>
   <!-- begin::wrap -->
	<div class="wrap">
      <!-- begin::sub menu -->
      <%-- <div class="navi">
            <div class="d-flex align-items-center">
               <a href="#n" class="home"><img src="${ctx }/resources/m2021/images/i_home.png" alt="홈"></a>
               <div class="path">
                  <a href="#n">
                     <span>생활권역 통계지도</span>
                     <span><img src="${ctx }/resources/m2021/images/i_select--ui.png" alt="생활권역 통계지도"></span>
                  </a>
               </div>
            </div>
      </div> --%>
      <!-- end::sub menu -->
      
      <div class="nav-2022">
		<div class="leftCol">
			<span id="searchPoi">지도에서 지점 선택</span>
			<span id="searchPoi_restart" style="display:none">지도에서 지점 재선택</span>
			<span class="txt">버튼 클릭 후 지도에서 위치를 선택할 수 있어요.</span>
		</div>
		<!-- <div class="">안들어감...</div> -->
	</div>
	
	<%-- <div class="d-flex justify-content-between align-items-end" >	<!-- style = "z-index : 400;" -->
                <div class="map__spot">
                 <div class="map__spot__tooltip" id = "map__spot__tooltip">
                    <span>버튼 클릭 후 지도에서 위치를 선택할 수 있어요.</span>
                    <button type="button" class="map__spot--close"><img src="${ctx }/resources/m2021/images/map/i_close--spot.png" alt="Close"></button>
                 </div>
                 <button type="button" class="btn__spot" id="searchPoi">지도에서 지점 선택</button>
                 <button type="button" class="btn__spot" id="searchPoi_restart" style = "display : none">지도에서 지점 재선택</button>
           		</div>
           </div> --%>

      <!-- begin::main -->
      <div class="main">

         <!-- begin::container -->
         <div class="container">

            <!-- begin::MAP -->
            <div class="map">
               <div class="map__above d-flex justify-content-between align-items-center locationBox">
                  <div class="locationboxwrap btn__option">
						<span class="selectAreaIcon ">
							<svg width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M13.125 6.25C13.125 10.625 7.5 14.375 7.5 14.375C7.5 14.375 1.875 10.625 1.875 6.25C1.875 4.75816 2.46763 3.32742 3.52252 2.27252C4.57742 1.21763 6.00816 0.625 7.5 0.625C8.99184 0.625 10.4226 1.21763 11.4775 2.27252C12.5324 3.32742 13.125 4.75816 13.125 6.25Z" stroke="#4F4F4F" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M7.5 8.125C8.53553 8.125 9.375 7.28553 9.375 6.25C9.375 5.21447 8.53553 4.375 7.5 4.375C6.46447 4.375 5.625 5.21447 5.625 6.25C5.625 7.28553 6.46447 8.125 7.5 8.125Z" stroke="#4F4F4F" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>						
						</span>
						<p id = "currentMapMyLocation_name" class="" onclick="javascript:srvLogWrite('O0', '12', '02', '01', '', '');">대전광역시 서구 둔산동</p>
					</div>
                  <div class="map__above__btn d-flex justify-content-between align-items-center">
                     <button type="button" class="btn__location" id = "catchmentareamyLocation">
                     	<%-- <img src="${ctx }/resources/m2021/images/map/i_map.png" alt="내 위치 찾기"> --%>
                     	<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.49918 14.1727C11.6323 14.1727 14.1722 11.6328 14.1722 8.49967C14.1722 5.36655 11.6323 2.82666 8.49918 2.82666C5.36607 2.82666 2.82617 5.36655 2.82617 8.49967C2.82617 11.6328 5.36607 14.1727 8.49918 14.1727Z" fill="white" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M8.4999 10.5667C9.64163 10.5667 10.5672 9.64114 10.5672 8.49941C10.5672 7.35768 9.64163 6.43213 8.4999 6.43213C7.35817 6.43213 6.43262 7.35768 6.43262 8.49941C6.43262 9.64114 7.35817 10.5667 8.4999 10.5667Z" fill="white" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M8.5 2.8269V1" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M2.8269 8.49951H1" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M8.5 14.1729V15.9998" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M14.1729 8.49951H15.9998" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>	
                     </button>
                    <%--  <a href="#n" onclick="javascript:srvLogWrite('O0', '12', '02', '01', '', '');" class="btn__option"><img src="${ctx }/resources/m2021/images/map/i_option.png" alt="조회"></a> --%>
                  </div>
               </div>
               
               <div class = "mapArea">
			  		 <div id="map"></div>
			  		 <!-- 2022-11-02 관심지역 설정 팝업 추가 및 수정 --> 
			  		 <!-- <div class="popBack" style="display:none;">
					  	<div id="common_popup_back" class="aside_back" style="z-index:800"></div>
					</div> -->
			  		 <!-- <div class="option" id = "catchmentAreamap_option_setting_board" style="height: 360px; overflow-y:auto; position: unset;">   2022-10-24 css 수정
					      <form action="">      	
								관심지역 설정 팝업 START 
								<div id="common_popup_area" class="popWrap region" style="display: block; z-index:900;">
									<div class="popBox">
										<div class="popHeader">
											<span class="popTitle" id="popupArea_title">관심지역변경</span>
											<button id="common_popup_area_close" class="btn_popClose" type="button"></button>
										</div>
										<div class="select_wrap" style="padding: 20px 0;">
											<select id="popupArea_sido" title="시도 선택">
												
											</select>
											
											<select id="popupArea_sgg" title="시군구 선택">
												
											</select> 
											
											<select id="popupArea_emdong" title="읍면동 선택">
												
											</select>
										</div>  
									    <div class="area_list_wrap">
								    		<ul class="area_list--district popupArea_sido" style="padding-left: 1px;"></ul>
								    	</div>
									</div>
									
									2022-10-24 css 수정  2022-12-02 footer 추가 및 css 수정
									<div class="PopFooter" style="margin-top:10px">
										<button type="button" class="btn_popType4" id = "option_apply">적용</button>
									</div>
								</div>
								관심지역 설정 팝업 END	
					            <div class="option__header d-flex justify-content-between">
					               <h3>생활권역 통계지도 조회 조건</h3>
					               <a href="#n" class="map__option--close"><img src="${ctx }/resources/m2021/images/i_close--option.png" alt="Close"></a>
					               
					                <h3>관심지역변경</h3>
					                <a href="#n" class="map__option--close">
						               <button class="" type="button">	       				
											<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M1 1L13 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
												<path d="M13 1L1 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
											</svg>							       				
								     	</button>
								    </a>			     
					            </div>
					      </form>
					   </div> -->
			  		 <div id="map_report"  style = "z-index : -10; display : none;"></div>
			   <!-- </div> -->
               <div class="map__below"> <!--style = "height : 90px;"  -->
                  <div>
                        
                      <%-- <div style = "width : 60px; left: 90%;" class = 'zoom_controller'>
                      		<div class="map__zoom" id = "mapZm" style = "width: 60px;">
                          			 <button type="button" class="btn__zoom btn__zoom--in"><img src="${ctx }/resources/m2021/images/map/i_zoom--in.png" alt="Zoom In"></button>
                          			 <p>읍면동</p>
                         			 <button type="button" class="btn__zoom btn__zoom--out"><img src="${ctx }/resources/m2021/images/map/i_zoom--out.png" alt="Zoom Out"></button>
                       		  </div>
                      </div> --%>
                     <!-- s::하단 메뉴 -->
                     <!-- 1) -->
                     <div class="map__search" >
                        <div class="map__slideup">
                           <!-- <div id = "slide-area">
                              <button type="button" class="btn-slideup"><span class = "slide_up"></span><span class = "slide_down" style = "display : none;"></span></button>
                           </div> -->
                           <!-- 1) -->
                           <div class="d-flex justify-content-between align-items-center">
	                           <div class = "map__result__tit" id="slide-area" >
	                           	   <button type = "button" id = "back_btn" style = "display : none"></button>
		                           <!-- <p>지점 선택</p> -->
		                            <!-- SGIS4_생활권역_모바일_SG 시작  -->
		                           <span  id="slide-area">
		                           		<h3 id = "map_area_name_text">통계를 조회할 지점을 선택해 주십시오.</h3>
		                           		<span><svg width="12" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z" /></svg></span>
		                           		
		                           </span>
		                           
		                           <!-- SGIS4_생활권역_모바일_SG 끝 --> 
		                       </div>
		                       <div class="map__result__distance" id = "setting_info_display" style = "display:none; width:20%">
	                              		<p>주행시간</p>
	                              		<p class="box bg-red">5, 10, 15, 20분</p>
	                           </div>	
                          </div>
	                       
	                       
                           
                        </div>
                         
                        <form action="" style = "height : calc(100% - 50px);">
                           <!-- s::검색결과 전 -->	
                           <div class="map__form swiper_menu active" id = "menu_1" style = "height : 100%;">
                           	  <!-- 2022-12-12 수정
                           	  <div class="map__form__above" style = "height : calc(100% - 107px);">-->	
                              <div class="map__form__above" style = "height : calc(100% - 80px);">
                                 <div class="map__form__btn">
                                    <button type="button" class="on" id = "map_search_btn">검색</button>
                                    <button type="button" id = "map_facility_search_btn">시설 유형 선택</button>
                                 </div>
                                 <!-- SGIS4_생활권역_모바일_SG 시작  -->
                                 <p>
                                    현재 지도 위치의 시군구 내에서 검색됩니다.<br>                                 
                                 </p>                                 
                                 <p id = "doroname_text">
                                 시설명 또는 도로명 주소를 입력해 주십시오.
                                 </p>
                                 
                                 <div id = "map_search_div" style = "display : block;">
                                 	<input type="text" class="form-input" id = "search_text_previous" readonly placeholder="검색어 입력(예. 통계청 또는 청사로 189)" title="검색어를 입력해주세요" maxlength="25">
                                 	<%-- <p class="notice" id = "search_notice" style = "display : none"><img src="${ctx }/resources/m2021/images/i_notice--red.png" alt="검색어를 입력해 주십시오."> 검색어를 입력해 주십시오.</p> --%>
                              	 </div>
                              	 <!--2022-12-12 수정
                              	 <div id = "map_facility_search_div" style = "height : calc( 100% - 50px ); display : none;">-->	
                              	 <div id = "map_facility_search_div" style = "height : calc( 100% - 70px ); display : none;">
                                 	<ul class="map__facility__con">
	                                    <li>
	                                       <div class = "sisul_wrap0" id = "SAL001">
		                                       <h4>교육</h4>
		                                        <div class="map__facility__list d-flex justify-content-start">
		                                          <c:forEach items="${paramInfo.facilityList}" var="list" varStatus="innerStatus">
		                                       		
		                                       		<c:if test="${list.factype_lclas_cd eq 'SAL001' && fn:length(list.name) < 5}">
					                                          <button type="button" class="option__btn" id = "${list.code}" data-factype-nm = "${list.name}">${list.name}</button>
		                                       		</c:if>
		                                       		<c:if test="${list.factype_lclas_cd eq 'SAL001' && fn:length(list.name) > 4}">
					                                          <button type="button" class="option__btn fs-small" id = "${list.code}" data-factype-nm = "${list.name}">${list.name}</button>
		                                       		</c:if>
		                                      	 </c:forEach>
		                                       </div>
	                                       </div>
	                                    </li>
	                                    <li>
	                                       <div class = "sisul_wrap2" id = "SAL002">
	                                       <h4>문화</h4>
	                                        <div class="map__facility__list d-flex justify-content-start">
	                                          <c:forEach items="${paramInfo.facilityList}" var="list" varStatus="innerStatus">
	                                       		<c:if test="${list.factype_lclas_cd eq 'SAL002' && fn:length(list.name) < 5}">	         
				                                          <button type="button" class="option__btn" id = "${list.code}" data-factype-nm = "${list.name}">${list.name}</button>
	                                       		</c:if>
	                                       		<c:if test="${list.factype_lclas_cd eq 'SAL002' && fn:length(list.name) > 4}">
				                                          <button type="button" class="option__btn fs-small" id = "${list.code}" data-factype-nm = "${list.name}">${list.name}</button>
	                                       		</c:if>
	                                      	 </c:forEach>
	                                       </div>
	                                       </div>
	                                    </li>
	                                    <li>
	                                       <div class = "sisul_wrap3" id = "SAL003">
	                                       <h4>생활</h4>
	                                        <div class="map__facility__list d-flex justify-content-start">
	                                          <c:forEach items="${paramInfo.facilityList}" var="list" varStatus="innerStatus">
	                                       		<c:if test="${list.factype_lclas_cd eq 'SAL003' && fn:length(list.name) < 5}">
				                                          <button type="button" class="option__btn" id = "${list.code}" data-factype-nm = "${list.name}">${list.name}</button>
	                                       		</c:if>
	                                       		<c:if test="${list.factype_lclas_cd eq 'SAL003' && fn:length(list.name) > 4}">
				                                          <button type="button" class="option__btn fs-small" id = "${list.code}" data-factype-nm = "${list.name}">${list.name}</button>
	                                       		</c:if>
	                                      	 </c:forEach>
	                                       </div>
	                                       </div>
	                                    </li>
	                                    <li>
	                                       <div class = "sisul_wrap4" id = "SAL004">
	                                       <h4>공공</h4>
	                                        <div class="map__facility__list d-flex justify-content-start">
	                                          <c:forEach items="${paramInfo.facilityList}" var="list" varStatus="innerStatus">
	                                       		<c:if test="${list.factype_lclas_cd eq 'SAL004' && fn:length(list.name) < 5}">
				                                          <button type="button" class="option__btn" id = "${list.code}" data-factype-nm = "${list.name}">${list.name}</button>
	                                       		</c:if>
	                                       		<c:if test="${list.factype_lclas_cd eq 'SAL004' && fn:length(list.name) > 4}">
				                                          <button type="button" class="option__btn fs-small" id = "${list.code}" data-factype-nm = "${list.name}">${list.name}</button>
	                                       		</c:if>
	                                      	 </c:forEach>
	                                       </div>	 
	                                       </div>
	                                    </li>
	                                 </ul>
                              	 </div> 
                              </div>
                              
                              <div class="map__form__below">
                               <!-- SGIS4_생활권역_모바일_SG 시작  -->
                              	 <p class="notice" id = "facility_notice" style="display : none; color: #d43212;"><img src="${ctx }/resources/m2021/images/i_notice--red.png" alt="시설 유형을 선택해 주십시오."> 시설 유형을 선택해 주십시오.</p>
                                 <!-- SGIS4_생활권역_모바일_SG 끝 -->   
                                 <p class="notice" id = "facility_notice02"><img src="${ctx }/resources/m2021/images/i_notice--gray.png" alt="데이터 출처 : 국가관심지점(국토교통부 국토정보플랫폼)"> 데이터 출처 : 국가관심지점(국토교통부 국토정보플랫폼)</p>                  
                                 <button type = "button" class="map__form__search" id = "searchwordBtn" style = "display : block;">검색</button>
                              </div>
                           </div>
                           <!-- e::검색결과 전 -->
                         <!-- s::검색결과 후 -->
                        <div class="map__result__con swiper_menu"  id = "menu_2" style = "display : none;">
                           <div class="map__result__sort">
                           		<button type="button" id = "search_accuracy" class="on">검색 정확도순</button>
                           		<button type="button" id = "search_distance">최단 거리순</button>
                           </div>
                           <ul class="map__result__list">
                              <li>
                                 <div>
                                    <h4>현대고등학교</h4>
                                    <p>서울특별시 강남구 압구정로 127</p>
                                 </div>
                                 <button type="button">
                                    <img src="${ctx }/resources/m2021/images/map/i_pin--off.png" alt="Map Point">
                                 </button>
                              </li>
                           </ul>
                           <p>
                           <!-- SGIS4_생활권역_모바일_SG 시작  -->
                              <img src="${ctx }/resources/m2021/images/map/i_notice--pin.png" alt="아이콘을 클릭하면 해당 지점이 선택됩니다.">
                    		         아이콘을 클릭하면 해당 지점이 선택됩니다.
                    		<!-- SGIS4_생활권역_모바일_SG 끝 -->         
                           </p>
                        </div>
                        <!-- e::검색결과 후 -->
                        
                        <!-- s::고정 값 선택  -->
                        <div class="map__form swiper_menu" id = "menu_3" style = "height : 100%; display : none;">
                              <div class="map__form__above">
                                 <div class="map__form__btn" id = "default_type_select">
                                    <button type="button" class="on" value = "0">영역 내 정보 조회</button>
                                    <button type="button" value = "1">격자 분포 조회</button>
                                 </div>
                                 <div class="default-select" >
                                    <h4>영역설정</h4>
                                     <!-- SGIS4_생활권역_모바일_SG 시작  -->
                                    <p>시간/거리/반경 중 동일 기준에서 4개까지 <span style='color: #d43212;'>선택  또는 입력</span></p>
                                    <div class="default-select__type" id = "area_standard_btn">
                                       <button type="button" class="on" id = "fixed_selected">기준 선택</button>
                                       <button type="button" id = "directly_selected">기준 입력</button>
                                    </div>
                                     <!-- SGIS4_생활권역_모바일_SG 끝  -->
                                    <div class="default-select__list" style = "display : block;" id = "selected_standard">
                                       <div class="default-select__radio">
                                          <div>
                                             <input type="radio" class="form-radio stats_radio area" name="stats_radio" title="주행시간 기준" id = "stats_radio_t"checked>
                                             <label for="radio01" id = "stats01">
                                                <span></span>
                                                <p>주행시간 기준</p>
                                             </label>
                                          </div>
                                          <ul class="toc_sec01" id = "type_t">
                                           
                                          </ul>
                                       </div>
                                       <div class="default-select__radio">
                                          <div>
                                             <input type="radio" class="form-radio stats_radio area"  name="stats_radio" id = "stats_radio_d"title="주행거리 기준">
                                             <label for="radio02" id="stats02">
                                                <span></span>
                                                <p>주행거리 기준</p>
                                             </label>
                                          </div>
                                          <ul class="toc_sec01" id = "type_d">

                                          </ul>
                                       </div>
                                       <div class="default-select__radio">
                                          <div>
                                             <input type="radio" class="form-radio stats_radio area"  name="stats_radio" id = "stats_radio_r"title="반경 기준">
                                             <label for="radio03" id="stats03">
                                                <span></span>
                                                <p>반경 기준</p>
                                             </label>
                                          </div>
                                          <ul class="toc_sec01" id = "type_r">
                                           
                                          </ul>
                                       </div>
                                    </div>
                                    <!-- s::직접 입력 -->
	                                <div class="self-select" id = "input_standard" style = "display : none;">
	                                    <ul class="type-select__tab self-select__tab area_setting" id = "area_setting_directly">
	                                       <li class="on"><a href="#n">주행시간</a></li>
	                                       <li ><a href="#n">주행거리</a></li>
	                                       <li ><a href="#n">반경</a></li>
	                                    </ul>

	                                    <div class="self-select__con area_setting" id = "area_setting_selected_1" title="주행시간">
	                                       <ul class="self-select__form input_circle">
	                                          <li>
	                                             <p>1<span>(최소)</span></p>
	                                             <div>
	                                                <div class="self-select__circle">입력</div>
	                                                <span>분</span>
	                                             </div>
	                                          </li>
	                                          <li>
	                                             <p>2</p>
	                                             <div>
	                                                <div class="self-select__circle">입력</div>
	                                                <span>분</span>
	                                             </div>
	                                          </li>
	                                          <li>
	                                             <p>3</p>
	                                             <div>
	                                                <div class="self-select__circle">입력</div>
	                                                <span>분</span>
	                                             </div>
	                                          </li>
	                                          <li>
	                                             <p>4<span>(최대)</span></p>
	                                             <div>
	                                                <div class="self-select__circle">입력</div>
	                                                <span>분</span>
	                                             </div>
	                                          </li>
	                                       </ul>
	                                       <ul class="self-select__info area_setting">
	                                          <li>
	                                             <span>최솟값</span>
	                                             <p>5분</p>
	                                          </li>
	                                          <li>
	                                             <span>최댓값</span>
	                                             <p>20분</p>
	                                          </li>
	                                          <li>
	                                             <span>입력 간격</span>
	                                             <p>1분</p>
	                                          </li>
	                                       </ul>
	                                    </div>
	                                    <div class="self-select__con area_setting" id = "area_setting_selected_2" title="주행거리">
	                                       <ul class="self-select__form input_circle">
	                                          <li>
	                                             <p>1<span>(최소)</span></p>
	                                             <div>
	                                                <div class="self-select__circle">입력</div>
	                                                <span>km</span>
	                                             </div>
	                                          </li>
	                                          <li>
	                                             <p>2</p>
	                                             <div>
	                                                <div class="self-select__circle">입력</div>
	                                                <span>km</span>
	                                             </div>
	                                          </li>
	                                          <li>
	                                             <p>3</p>
	                                             <div>
	                                                <div class="self-select__circle">입력</div>
	                                                <span>km</span>
	                                             </div>
	                                          </li>
	                                          <li>
	                                             <p>4<span>(최대)</span></p>
	                                             <div>
	                                                <div class="self-select__circle">입력</div>
	                                                <span>km</span>
	                                             </div>
	                                          </li>
	                                       </ul>
	                                       <ul class="self-select__info area_setting">
	                                          <li>
	                                             <span>최솟값</span>
	                                             <p>0.5km</p>
	                                          </li>
	                                          <li>
	                                             <span>최댓값</span>
	                                             <p>5km</p>
	                                          </li>
	                                          <li>
	                                             <span>입력 간격</span>
	                                             <p>0.5km</p>
	                                          </li>
	                                       </ul>
	                                    </div>
	                                    <div class="self-select__con area_setting " id = "area_setting_selected_3" title="반경">
	                                       <ul class="self-select__form input_circle">
	                                          <li>
	                                             <p>1<span>(최소)</span></p>
	                                             <div>
	                                                <div class="self-select__circle">입력</div>
	                                                <span>km</span>
	                                             </div>
	                                          </li>
	                                          <li>
	                                             <p>2</p>
	                                             <div>
	                                                <div class="self-select__circle">입력</div>
	                                                <span>km</span>
	                                             </div>
	                                          </li>
	                                          <li>
	                                             <p>3</p>
	                                             <div>
	                                                <div class="self-select__circle">입력</div>
	                                                <span>km</span>
	                                             </div>
	                                          </li>
	                                          <li>
	                                             <p>4<span>(최대)</span></p>
	                                             <div>
	                                                <!-- <div class="self-select__circle bg-orange">20</div> -->
	                                                <div class="self-select__circle">입력</div>
	                                                <span>km</span>
	                                             </div>
	                                          </li>
	                                       </ul>
	                                       <ul class="self-select__info area_setting">
	                                          <li>
	                                             <span>최솟값</span>
	                                             <p>0.5km</p>
	                                          </li>
	                                          <li>
	                                             <span>최댓값</span>
	                                             <p>5km</p>
	                                          </li>
	                                          <li>
	                                             <span>입력 간격</span>
	                                             <p>0.5km</p>
	                                          </li>
	                                       </ul>
	                                    </div>
	
	                                 </div>
                                    <!-- e::직접 입력 -->
                                    <div class="area-notice">
                                       <div class="area-notice__tit">
                                          <h4><img src="${ctx }/resources/m2021/images/map/img_info.png" alt="영역 설정 안내"> 영역 설정 안내</h4>
                                          <ul class="area-notice__info">
                                             <li>
                                             <!-- SGIS4_생활권역_모바일_SG 시작  -->
                                                평균 소요시간, 도로 길이 등의 정보를 가지고 있는 도로네트워크를 활용하여 주행시간, 주행거리, 반경에 대한 영역을 제공합니다.
                                                <!-- SGIS4_생활권역_모바일_SG 끝 -->
                                             </li>
                                          </ul>
                                       </div>
                                       
                                       <div class="area-notice__con range_information">
                                      <h4><img src="${ctx }/resources/m2021/images/map/img_info.png" alt="영역 설정 안내"> 영역 설정 안내</h4>
                                          <ul class="area-notice__info">
                                             <li>
                                             <!-- SGIS4_생활권역_모바일_SG 시작  -->
                                                평균 소요시간, 도로 길이 등의 정보를 가지고 있는 도로네트워크를 활용하여 주행시간, 주행거리, 반경에 대한 영역을 제공합니다.
                                                <!-- SGIS4_생활권역_모바일_SG 끝 -->
                                             </li>
                                             <li>
                                             영역 설정은 1개~4개까지 기준을 선택할 수 있습니다. 단, 격자 분포의 영역 설정은 1개의 기준만 선택할 수 있습니다.
                                             </li>
                                          </ul>

                                       <ul class="area-notice__box">
                                          <li>
                                             <p>주행시간</p>
                                             <div>
                                                선택한 지점에서 가장 근접한 도로를 기준으로 주행시간 이내에 도달할 수 있는 모든 경로를 영역으로 표시
                                             </div>
                                             <span>- 예. 주행시간 5분  :  선택한 지점에서 가장 근접한 도로를 기준으로 도로주행 평균 소요시간 5분 이내에 도달할 수 있는 모든 경로를 영역으로 표시</span>
                                          </li>
                                          <li>
                                             <p>주행거리</p>
                                             <div>
                                                선택한 지점에서 가장 근접한 도로를 기준으로 주행거리 이내에 도달할 수 있는 모든 경로를 영역으로 표시
                                             </div>
                                             <span>- 예. 주행거리1Km :  선택한 지점에서 가장 근접한 도로를 기준으로 도로 길이 1km 이내에 도달할 수 있는 모든 경로를 영역으로 표시 </span> 
                                          </li>
                                          <li>
                                             <p>반경</p>
                                             <div>
                                                선택한 지점에서 모든 방향으로의 직선거리를  영역으로 표시
                                             </div>
                                             <p class = "doro_standard">※ 현재 적용된 도로네트워크  기준 :</p> <b class ="underline_q" >2020년 4분기</b>
                                          </li>
                                       </ul>
                                    </div>



                                       <button type="button" class="area-notice__btn">
                                          <img src="${ctx }/resources/m2021/images/map/i_arrow--bottom.png" alt="영역 설정 안내 더보기">
                                       </button>
                                    </div>
                                 </div>
                                 
                                 <div class="type-select" style = "display : none">
                                 <h4>격자 분포 영역 설정</h4>
                                 <p>시간/거리/반경 중 동일 기준에서 1개까지 <span style='color: #d43212;'>선택  또는 입력</span></p>
                                 <div class="type-select__type" id = "grid_standard_btn">
                                    <button type="button" class="on" id = "grid_fixed_selected" value = "0">기준 선택</button>
                                    <button type="button" id = "grid_directly_selected" value = "1">기준 입력</button>
                                 </div>
                                 
								 <div class="default-select__list" id = "grid_selected_standard">
                                       <div class="default-select__radio">
                                          <div>
                                             <input type="radio" class="form-radio stats_radio grid" name="stats_radio_grid" title="주행시간 기준" id = "stats_radio_t_grid" checked>
                                             <label for="stats_radio_t_grid" id = "stats01_grid">
                                                <span></span>
                                                <p>주행시간 기준</p>
                                             </label>
                                          </div>
                                          <ul class="toc_sec01" id = "type_t_grid">
                                           
                                          </ul>
                                       </div>
                                       <div class="default-select__radio">
                                          <div>
                                             <input type="radio" class="form-radio stats_radio grid"  name="stats_radio_grid" id = "stats_radio_d_grid"title="주행거리 기준">
                                             <label for="stats_radio_d_grid" id="stats02_grid">
                                                <span></span>
                                                <p>주행거리 기준</p>
                                             </label>
                                          </div>
                                          <ul class="toc_sec01" id = "type_d_grid">

                                          </ul>
                                       </div>
                                       <div class="default-select__radio">
                                          <div>
                                             <input type="radio" class="form-radio stats_radio grid"  name="stats_radio_grid" id = "stats_radio_r_grid"title="반경 기준">
                                             <label for="stats_radio_r_grid" id="stats03_grid">
                                                <span></span>
                                                <p>반경 기준</p>
                                             </label>
                                          </div>
                                          <ul class="toc_sec01" id = "type_r_grid">
                                           
                                          </ul>
                                       </div>
                                    </div>
                                 <!-- s::직접 입력 -->
	                                <div class="self-select" id = "grid_input_standard"style = "display : none;">
	                                    <ul class="type-select__tab self-select__tab grid_setting" id = "grid_setting_directly">
	                                       <li class="on" value = 0><a href="#n" id = "rndstats01" value = "0">주행시간</a></li>
	                                       <li value = 1><a href="#n" id = "rndstats02" value = "1">주행거리</a></li>
	                                       <li value = 2><a href="#n" id = "rndstats03" value = "2">반경</a></li>
	                                    </ul>
                                    
	                                    <div class="self-select__con grid_setting " id = "grid_setting_selected_1" title="주행시간">
	                                       <ul class="self-select__form self-grid input_circle">
	                                          <li>
	                                             <p>선택한 영역</span></p>
	                                             <div>
	                                                <div class="self-select__circle">입력</div>
	                                                <span>분</span>
	                                             </div>
	                                          </li>
	                                          
	                                       </ul>
	                                       <ul class="self-select__info grid_setting">
	                                          <li>
	                                             <span>최솟값</span>
	                                             <p>5분</p>
	                                          </li>
	                                          <li>
	                                             <span>최댓값</span>
	                                             <p>20분</p>
	                                          </li>
	                                          <li>
	                                             <span>입력 간격</span>
	                                             <p>1분</p>
	                                          </li>
	                                       </ul>
	                                    </div>
	                                    <div class="self-select__con grid_setting" id = "grid_setting_selected_2" title="주행거리">
	                                       <ul class="self-select__form self-grid input_circle">
	                                          <li>
	                                             <p>선택한 영역</p>
	                                             <div>
	                                                <div class="self-select__circle">입력</div>
	                                                <span>km</span>
	                                             </div>
	                                          </li>
	                                       </ul>
	                                       <ul class="self-select__info grid_setting">
	                                          <li>
	                                             <span>최솟값</span>
	                                             <p>0.5km</p>
	                                          </li>
	                                          <li>
	                                             <span>최댓값</span>
	                                             <p>5km</p>
	                                          </li>
	                                          <li>
	                                             <span>입력 간격</span>
	                                             <p>0.5km</p>
	                                          </li>
	                                       </ul>
	                                    </div>
	                                    <div class="self-select__con grid_setting" id = "grid_setting_selected_3" title="반경">
	                                       <ul class="self-select__form self-grid input_circle">
	                                          <li>
	                                             <p>선택한 영역</p>
	                                             <div>
	                                                <div class="self-select__circle">입력</div>
	                                                <span>km</span>
	                                             </div>
	                                          </li>
	                                       </ul>
	                                       <ul class="self-select__info grid_setting">
	                                          <li>
	                                             <span>최솟값</span>
	                                             <p>0.5km</p>
	                                          </li>
	                                          <li>
	                                             <span>최댓값</span>
	                                             <p>5km</p>
	                                          </li>
	                                          <li>
	                                             <span>입력 간격</span>
	                                             <p>0.5km</p>
	                                          </li>
	                                       </ul>
	                                    </div>
	                             </div>
								 
                                 <h4 class="mt-10px mb5">격자크기선택</h4>
                                 <!-- s::직접 입력 -->
                                 <div class="self-select">
                                    <ul class="type-select__tab" id = "grid_size_select">
                                       <li>
                                          <input type="radio" id="100m_grid_rd" name="grid_level_radio" data-gridLevelDiv = "100m" class="type-select__radio active" checked>
                                          <label for="100m_grid_rd"><span>100m</span></label>
                                       </li>
                                       <li>
                                          <input type="radio" id="500m_grid_rd" name="grid_level_radio"  data-gridLevelDiv = "500m"class="type-select__radio">
                                          <label for="500m_grid_rd"><span>500m</span></label>
                                       </li>
                                       <li>
                                          <input type="radio" id="1km_grid_rd" name="grid_level_radio"  data-gridLevelDiv = "1k"class="type-select__radio">
                                          <label for="1km_grid_rd"><span>1km</span></label>
                                       </li>
                                    </ul>
                                 </div>
                                 <!-- e::직접 입력 -->

                                 <h4 class="mt-10px mb5">격자 통계 조건 선택</h4>
								   <div id = "subject_statistics_grid">
			                           <div class="life-industry__table">
			                           <table>
			                              <colgroup>
			                                 <col style="width: 25%;">
			                                 <col style="width: 25%;">
			                                 <col style="width: 25%;">
			                                 <col style="width: 25%;">
			                              </colgroup>
			                              <tbody>
			                                 <tr>
			                                    <th scope="col">통계 주제</th>
			                                    <td>
			                                       <div class="select-ui text-center">
			                                          <select id = "statistics_topic_grid">
			                                          	<option value = "people" data-stat-type = "pops">인구</option>
			                                          	<option value = "family" data-stat-type = "family">가구</option>
			                                          	<option value = "house" data-stat-type = "house">주택</option>
			                                          	<option value = "copr" data-stat-type = "copr">사업체</option>
			                                          	<option value = "worker" data-stat-type = "employee">종사자</option>
			                                          </select>
			                                          <%-- <button type="button">
			                                             <span>사업체</span>
			                                             <img src="${ctx }/resources/m2021/images/i_select--ui.png" alt="통계청 주요 서비스 바로가기">
			                                          </button> --%>
			                                       </div>
			                                    </td>
			                                    <th scope="col">기준 연도</th>
			                                    <td>
			                                       <div class="select-ui text-center">
			                                          <select id = "bYearSel06">
			                                          
			                                          </select>
			                                          <%-- <button type="button">
			                                             <span>2018년</span>
			                                             <img src="${ctx }/resources/m2021/images/i_select--ui.png" alt="통계청 주요 서비스 바로가기">
			                                          </button> --%>
			                                       </div>
			                                    </td>
			                                 </tr>
			                                 <tr style = "display : none" id = "if_worker_copr_show_grid">
			                                    <th scope="col">업종 검색</th>
			                                    <td colspan="3">
			                                       <div class="d-flex">
			                                       <div class="point__radio d-flex">
			                                             <input type="radio" class="form-radio" id="industry3_grid" name="industry_area" title="시설을 선택해주세요" checked = "check">
			                                             <label for="industry3_grid">
			                                                <span></span>
			                                                <p>전체</p>
			                                             </label>
			                                          </div>
			                                          <div class="point__radio d-flex">
			                                             <input type="radio" class="form-radio" id="industry1_grid" name="industry_area" title="시설을 선택해주세요">
			                                             <label for="industry1_grid">
			                                                <span></span>
			                                                <p>주요 <br>생활 업종</p>
			                                             </label>
			                                          </div>
			                                          <div class="point__radio d-flex">
			                                             <input type="radio" class="form-radio" id="industry2_grid" name="industry_area" title="시설을 선택해주세요">
			                                             <label for="industry2_grid">
			                                                <span></span>
			                                                <p>한국산업<br>표준분류</p>
			                                             </label>
			                                          </div>
			                                       </div>
			                                    </td>
			                                 </tr>
			                                 <tr>
			                                    <th scope="col">세부 조건</th>
			                                    <td colspan="3">
			                                       <div class="life-industry__detail" id = "1km_detail"style = "display : none">
			                                          <p id = "detail_condtion_txt_grid">인구(전체)</p>
			                                          <button type="button" id = "detail_condition_change"class="life-industry__change detail_condition_change">변경</button>
			                                       </div>
			                                       <div class="life-industry__detail" id = "1km_under_detail">
			                                          <p>1km 미만 격자 크기에서는 총 값만 제공합니다.</p>
			                                       </div>
			                                    </td>
			                                 </tr>
			                              </tbody>
			                           </table>
			                        </div>
		                           </div>
  
								 	
                                 <div class="area-notice">
                                    <div class="area-notice__tit area-notice__tit_retouch">
                                 <h4><img src="${ctx }/resources/m2021/images/map/img_info.png" alt="영역 설정 안내"> 영역 설정 안내</h4>
                                          <ul class="area-notice__info">
                                             	<li>
													<p>평균 소요시간, 도로 길이 등의 정보를 가지고 있는 도로네트워크를 활용하여 주행시간,주행거리,반경에 대한 영역을 제공합니다. </p>
                                             	</li>
                                          </ul>
                                    </div>
                                    
                                    <div class="area-notice__con">
                                      <h4><img src="${ctx }/resources/m2021/images/map/img_info.png" alt="영역 설정 안내"> 영역 설정 안내</h4>
                                          <ul class="area-notice__info">
                                             <li>
												평균 소요시간, 도로 길이 등의 정보를 가지고 있는 도로네트워크를 활용하여 주행시간,주행거리,반경에 대한 영역을 제공합니다.
                                             </li> 
                                             <li>
                                             영역 설정은 1개~4개까지 기준을 선택할 수 있습니다. 단, 격자 분포의 영역 설정은 1개의 기준만 선택할 수 있습니다.
                                             </li>
                                          </ul>

                                       <ul class="area-notice__box">
                                          <li>
                                             <p>주행시간</p>
                                             <div>
                                                선택한 지점에서 가장 근접한 도로를 기준으로 주행시간 내  도달 가능한 모든 경로를 찾아 영역으로 표시
                                             </div>
                                             <span>- 예. 주행시간 5분  :  선택한 지점에서 가장 근접한 도로를 기준으로 도로주행 평균 소요시간 5분 이내에 도달할 수 있는 모든 경로를 영역으로 표시</span>
                                          </li>
                                          <li>
                                             <p>주행거리</p>
                                             <div>
                                                선택한 지점에서 가장 근접한 도로를 기준으로 주행거리 내  도달 가능한 모든 경로를 찾아 영역으로 표시
                                             </div>
                                             <span>- 예. 주행거리1Km :  선택한 지점에서 가장 근접한 도로를 기준으로 도로 길이 1km 이내에 도달할 수 있는 모든 경로를 영역으로 표시 </span> 
                                          </li>
                                          <li>
                                             <p>반경</p>
                                             <div>
                                                선택한 지점에서 모든 방향으로의 직선거리를  영역으로 표시
                                             </div>
                                             <p class = "doro_standard">※ 현재 적용된 도로네트워크  기준 :</p> <b  class = "underline_q">2020년 4분기</b>
                                          </li>
                                       </ul>
                                    </div>

                                    <button type="button" class="area-notice__btn">
                                       <img src="${ctx }/resources/m2021/images/map/i_arrow--bottom.png" alt="영역 설정 안내 더보기">
                                    </button>
                                 </div>
								 	<div class = "area-notice__tit area-notice__tit_retouch">
								 	<h4><img src="${ctx }/resources/m2021/images/map/img_info.png" alt="영역 설정 안내"> 격자 분포 통계 안내</h4>
								 		<ul class="area-notice__info">
                                             <li>
                                                국토를 행정구역과 관계없이 직각으로 교차하는 가로x세로선으로 구분한 영역으로 통계정보를 제공합니다.<br>
					 <b class="color-red">격자 크기에 따라서 집계치가 상이할 수 있습니다. </b>
                                             </li>                 
                                          </ul>
								 	</div>
                              </div>
                              </div>
                              <div class="map__form__below">
                                 <button type="button" class="map__form__search" id = "information_check">통계정보 확인</button>
                              </div>
                           </div>
                           <!-- e::고정 값 선택  -->
                           <!--여기  추가 -->
                           <div class="swiper_menu life-industry" id = 'menu_4' style = "display : none">
		                        <dl style= "margin-bottom: 0px;" >
		                           <dt id = "standard_text">주행거리</dt>
		                           <dd id = 'menu_4_button'>
		                              <button type="button" class="on">0.5km</button>
		                              <button type="button">1km</button>
		                              <button type="button">2km</button>
		                              <button type="button">3km</button>
		                           </dd>
		                        </dl>
		                        <div class="life-industry__con" style = "padding-bottom : '30px'"> <!-- 확인  -->
		                           <div class="life-industry__chart">
		                              <h4>면적</h4>
		                              <p id = 'area_standard'><!-- 롯데백화점강남점 기준 <span class="color-red"><b id = "life-industry_area">주행거리 0.5km</b></span> 면적  --></p>
		                              <div class="chart-wrap" >
					                     <li class="sec01" style = "width : 100%">
											<div class="graph_bg" style = "position : relative; text-align : center;">
												<img src="${ctx }/resources/m2021/images/shape01.png">
					 							<span id="areaSize">-㎢</span><!--<span class="txt_sm01"> km</span><sup>2</sup> -->
											</div>
											<!-- <p class="sa_txt03" id="sec01GridTxt"></p> -->
											<p class="sa_txt02" id="sec01AreaTxt"></p>
											<p class="sa_txt01" id="sec01RangeTxt"></p>
										 </li>
		                              </div>
		                           </div>
		
		                           <div class="type-select__type" id = "setting_total_btn">
		                              <button type="button" class="on" value = "0">기본 통계</button>
		                              <button type="button" value = "1">주제별 통계</button>
		                           </div>
		                           <div id = "normal_statistics">
			                           <div class="life-industry__table">
			                              <table>
			                                 <colgroup>
			                                    <col style="width: 20%;">
			                                    <col style="width: 35%;">
			                                    <col style="width: 20%;">
			                                    <col style="width: 25%;">
			                                 </colgroup>
			                                 <tbody>
			                                    <tr>
			                                       <th scope="col" rowspan="2">통계 <br> 주제</th>
			                                       <td>
			                                          <div class="select-ui text-center">
			                                             인구/가구/ <br>주택
			                                          </div>
			                                       </td>
			                                       <th scope="col">기준 연도</th>
			                                       <td>
			                                          <div class="select-ui text-center">
													   	<select class="selct_03" id="bYearSel01"></select>	
			                                             <%-- <button type="button">
			                                                <span>2019년</span>
			                                                <img src="${ctx }/resources/m2021/images/i_select--ui.png" alt="통계청 주요 서비스 바로가기">
			                                             </button> --%>
			                                          </div>
			                                       </td>
			                                    </tr>
			                                    <tr>
			                                       <td class="border-r">
			                                          <div class="select-ui text-center">
			                                             사업체/ <br>종사자
			                                          </div>
			                                       </td>
			                                       <th scope="col">기준 연도</th>
			                                       <td>
			                                          <div class="select-ui text-center">
			                                          	<select class="selct_04" id="bYearSel02"></select>
			                                          
			                                             <%-- <button type="button">
			                                                <span>2018년</span>
			                                                <img src="${ctx }/resources/m2021/images/i_select--ui.png" alt="통계청 주요 서비스 바로가기">
			                                             </button> --%>
			                                          </div>
			                                       </td>
			                                    </tr>
			                                 </tbody>
			                              </table>
			                           </div>
		                           </div>
		                           <div id = "subject_statistics"  style = "display : none">
			                           <div class="life-industry__table">
			                           <table>
			                              <colgroup>
			                                 <col style="width: 25%;">
			                                 <col style="width: 25%;">
			                                 <col style="width: 25%;">
			                                 <col style="width: 25%;">
			                              </colgroup>
			                              <tbody>
			                                 <tr>
			                                    <th scope="col">통계 주제</th>
			                                    <td>
			                                       <div class="select-ui text-center">
			                                          <select id = "statistics_topic">
			                                          	<option value = "people" data-stat-type = "pops">인구</option>
			                                          	<option value = "family" data-stat-type = "family">가구</option>
			                                          	<option value = "house" data-stat-type = "house">주택</option>
			                                          	<option value = "copr" data-stat-type = "copr">사업체</option>
			                                          	<option value = "worker" data-stat-type = "employee">종사자</option>
			                                          </select>
			                                          <%-- <button type="button">
			                                             <span>사업체</span>
			                                             <img src="${ctx }/resources/m2021/images/i_select--ui.png" alt="통계청 주요 서비스 바로가기">
			                                          </button> --%>
			                                       </div>
			                                    </td>
			                                    <th scope="col">기준 연도</th>
			                                    <td>
			                                       <div class="select-ui text-center">
			                                          <select id = "bYearSel03">
			                                          
			                                          </select>
			                                          <%-- <button type="button">
			                                             <span>2018년</span>
			                                             <img src="${ctx }/resources/m2021/images/i_select--ui.png" alt="통계청 주요 서비스 바로가기">
			                                          </button> --%>
			                                       </div>
			                                    </td>
			                                 </tr>
			                                 <tr style = "display : none" id = "if_worker_copr_show">
			                                    <th scope="col">업종 검색</th>
			                                    <td colspan="3">
			                                       <div class="d-flex">
			                                          <div class="point__radio d-flex">
			                                             <input type="radio" class="form-radio" id="industry1" name="industry" title="시설을 선택해주세요" checked = "check">
			                                             <label for="industry1">
			                                                <span></span>
			                                                <p>주요 생활 업종</p>
			                                             </label>
			                                          </div>
			                                          <div class="point__radio d-flex">
			                                             <input type="radio" class="form-radio" id="industry2" name="industry" title="시설을 선택해주세요">
			                                             <label for="industry2">
			                                                <span></span>
			                                                <p>한국산업표준분류</p>
			                                             </label>
			                                          </div>
			                                       </div>
			                                    </td>
			                                 </tr>
			                                 <tr>
			                                    <th scope="col">세부 조건</th>
			                                    <td colspan="3">
			                                       <div class="life-industry__detail">
			                                          <p id = "detail_condtion_txt">인구(전체)</p>
			                                          <button type="button" id = "detail_condition_change"class="life-industry__change detail_condition_change">변경</button>
			                                       </div>
			                                    </td>
			                                 </tr>
			                              </tbody>
			                           </table>
			                        </div>
		                           </div>
		                           
		                           <div class="life-industry__btn">
		                              <button type="button" id = "statistics_check_btn">통계확인</button>
		                           </div>
								   
								   <div id = "basic_total">
		                           <div class="life-industry__chart">
		                              <h4> <a class = "pfh_year">-</a> 인구</h4>
		                           
		                              <p id = "perPopSquareTxt">총 인구에 대한 남·여 비율</p>
		                              <div class="life-industry__border">
		                                 <div>
		                                    <p>총 인구</p>
		                                    <h4 id = "totPops" class="color-blue">-<span>명</span></h4>
		                                 </div>
		                                 <div>
		                                    <div>
		                                       <p>남자</p>
		                                       <h4 id = "manTtlCnt" class="color-pink">-<span>명</span></h4>
		                                       <span id = "manPer" class = "manPer"></span>
		                                    </div>
		                                    <div>
		                                       <p>여자</p>
		                                       <h4 id = "womanTtlCnt" class="color-green">-<span>명</span></h4>
		                                       <span id = "womanPer" class = "womanPer"></span>
		                                    </div>
		                                 </div>
		                              </div>
		                              
		                              <!-- <p class="sa_txt01" id="perPopTxt" data-reset=""></p>
													<p class="sa_txt02" id="perPop" data-reset=""></p> -->
		                              <p id="perPopTxt">총 인구에 대한 남·여 비율</p>
		                              <div class="chart-wrap">
		                                 <!-- 위의 style을 제거하세요. -->
		                                  
		                                 <div class="chart__con">
		                                 	<li class="sec02">
												<div class="div_basic">
													<div class="step_wrap">
														<span class="step01"></span>
														<span class="step02"></span>
														<span class="step03"></span>
														<span class="step04"></span>
														<span class="step05"></span>
														<span class="step06"></span>
														<span class="step07"></span>
														<span class="step08"></span>
														<span class="step09"></span>
													</div>
													<div class="txt_box01">
														<div id="popChart" class="reset chart"></div>				
													</div>
												</div>
											</li>
											<li><b class = 'color-red'> 기초자료 </b>: 통계청, 「인구주택총조사」</li>
		                                 </div>
		                                 <div class="chart__legend chart_width_set">
		                                    <ul>
		                                       <li>
		                                          <span style="background-color: #d66b44;"></span>
		                                          <p>0~9세</p>
		                                       </li>
		                                       <li>
		                                          <span style="background-color: #e28e49;"></span>
		                                          <p>10~19세</p>
		                                       </li>
		                                       <li>
		                                          <span style="background-color: #eba04e;"></span>
		                                          <p>20~29세</p>
		                                       </li>
		                                       <li>
		                                          <span style="background-color: #f0af52;"></span>
		                                          <p>30~39세</p>
		                                       </li>
		                                       <li>
		                                          <span style="background-color: #f6bd58;"></span>
		                                          <p>40~49세</p>
		                                       </li>
		                                       <li>
		                                          <span style="background-color: #f9cc60;"></span>
		                                          <p>50~59세</p>
		                                       </li>
		                                       <li>
		                                          <span style="background-color: #fbda70;"></span>
		                                          <p>60~69세</p>
		                                       </li>
		                                       <li>
		                                          <span style="background-color: #fbe48b;"></span>
		                                          <p>70~79세</p>
		                                       </li>
		                                       <li>
		                                          <span style="background-color: #fbeeb0;"></span>
		                                          <p>80세 이상</p>
		                                       </li>
		                                    </ul>
		                                 </div>
		                              </div>
		                           </div>
		
		                           <div class="life-industry__chart">
		                              <h4> <a class = "pfh_year">-</a> 가구</h4>                              
		                              <p id = "perFamilyTxt"> - <span class="color-red"><b></b></span></p>
		                              <div class="chart-wrap">
		                              	 <div class="chart__con">
			                                 <li class="sec03">						
												<div class="div_basic">
													<div class="txt_box01">
														<div id="familyChart" class="reset chart"></div>
													</div>
												</div>
											</li>
											<li><b class = 'color-red'> 기초자료 </b>: 통계청, 「인구주택총조사」</li>
		                              	 </div>
		                                 <div class="chart__legend chart_width_set">
		                                    <ul>
		                                       <li>
		                                          <span style="background-color: #ed5980;"></span>
		                                          <p>친족 가구</p>
		                                       </li>
		                                       <li>
		                                          <span style="background-color: #ffaa01;"></span>
		                                          <p>1인 가구</p>
		                                       </li>
		                                       <li>
		                                          <span style="background-color: #7db6e9;"></span>
		                                          <p>비친족 가구</p>
		                                       </li>
		                                       <li>
		                                    </ul>
		                                 </div>
		                                 
		                              </div>
		                           </div>
		
		                           <div class="life-industry__chart">
		                              <h4><a class = "pfh_year">-</a> 주택</h4>                              
		                              <p id = "perHouseTxt">- <span class="color-red"> <b></b></span></p>
		                              <div class="chart-wrap">
		                              	<div class="chart__con">
		                                 <li class="sec04">
											<div class="div_basic">
												<div class="txt_box01">
													<div id="houseChart" class="reset chart"></div>
													<!-- SGIS4_생활권역 시작 -->
													<!-- <a href="javascript:void(0)" class="zoomBox" title="상세" data-type="house">
														<span class="ball"></span>
													</a> -->
													<!-- SGIS4_생활권역 끝 -->
												</div>						
											</div>
										</li>
										<li><b class = 'color-red'> 기초자료 </b>: 통계청, 「인구주택총조사」</li>
										</div>
										<div class="chart__legend chart_width_set">
		                                    <ul>
		                                       <li>
		                                          <span style="background-color: #7db6e9;"></span>
		                                          <p>단독주택</p>
		                                       </li>	
		                                       <li>
		                                          <span style="background-color: #ffaa01;"></span>
		                                          <p>아파트</p>
		                                       </li>
		                                       
		                                       <li>
		                                          <span style="background-color: #93ec85;"></span>
		                                          <p>연립주택</p>
		                                       </li>
		                                       <li>
		                                          <span style="background-color: #fed747;"></span>
		                                          <p>다세대주택</p>
		                                       </li>
		                                       <li>
		                                          <span style="background-color: #318e8c;"></span>
		                                          <p>비주거용 건물 내 주택</p>
		                                       </li>
		                                    </ul>
		                                 </div>
					                  </div>
		                           </div>
		
		                           <div class="life-industry__chart">
		                              <h4><a class = "cbcw_year">-</a> 사업체</h4>                              
		                              <p id = "totCopr">- <span class="color-red"><b></b></span></p>
		                              <div class="chart-wrap">
		                              	<div class="chart__con">
		                                 <li class="sec05">
											<div class="div_basic">
												<div class="txt_box01">
													<div id="coprChart" class="reset chart"></div>
												</div>						
											</div>
										</li>
										<li><b class = 'color-red'> 기초자료 </b>: 통계청, 「전국사업체조사」</li>
										</div>
										<div class="chart__legend chart_width_set">
		                                    <ul>
		                                       <li>
		                                          <span style="background-color: #d66b44;"></span>
		                                          <p id="top1_copr_txt">1. 일반 교습학원 (17.1%)</p>
		                                       </li>
		                                       <li>
		                                          <span style="background-color: #ffaa01;"></span>
		                                          <p id="top2_copr_txt">2. 음식점업 (11.2%)</p>
		                                       </li>
		                                       <li>
		                                          <span style="background-color: #fed747;"></span>
		                                          <p id="top3_copr_txt">3. 기타 교육기관 (6.0%)</p>
		                                       </li>
		                                    </ul>
		                                 </div>
										
		                              </div>
		                           </div>
		
		                           <div class="life-industry__chart border-b">
		                              <h4><a class = "cbcw_year">-</a> 종사자</h4>                              
		                              <p id = "totWorker">- <span class="color-red"> <b></b></span></p>
		                              <div class="chart-wrap" >
		                              	<div class="chart__con">
		                            	<li class="sec06">
											<div class="div_basic">
												<div class="txt_box01">
													<div id="workerChart" class="reset chart"></div>
													<!-- SGIS4_생활권역 시작 -->
												<!-- 	<p class="sa_txt01">전체 중 분포율 TOP3</p>
													<p class="sa_txt02" id="top3WorkerPerAmongAll" data-reset="0명"></p>
													<a href="javascript:void(0)" class="zoomBox" title="상세" data-type="employee">
														<span class="ball"></span>
													</a> -->
													<!-- SGIS4_생활권역 끝 -->												
												</div>						
											</div>
										</li>
										<li><b class = 'color-red'> 기초자료 </b>: 통계청, 「전국사업체조사」</li>
										</div>
										<div class="chart__legend chart_width_set">
		                                    <ul>
		                                       <li>
		                                          <span style="background-color:  #d66b44;"></span>
		                                          <p id="top1_worker_txt">1. 일반 교습학원 (17.2%)</p>
		                                       </li>
		                                       <li>
		                                          <span style="background-color: #ffaa01;"></span>
		                                          <p id="top2_worker_txt">2. 음식점업 (11.2%)</p>
		                                       </li>
		                                       <li>
		                                          <span style="background-color: #fed747;"></span>
		                                          <p id="top3_worker_txt">3. 종합 소매업 (5.1%)</p>
		                                       </li>
		                                    </ul>
		                                 </div>
										
					                    </div>
		                           </div>
		                           <div class="area-notice px15">
                                    <div class="area-notice__tit">                                   
                                       <h4 class="icon_info"> <img src = "${ctx }/resources/m2021/images/map/img_info.png"></img>격자 단위 통계정보 안내</h4>
                                       <ul class="area-notice__info update_info">
                                       	  <li class = "color-red grid_unit_info"> </li>
                                          <li>조회한 생활권역(영역)에 포함되는 격자를 기준으로 통계정보를 제공합니다.</li>
                                          <li>기초자료를 기반으로 비밀 보호 기법(BSCA)을 적용하여  값을 계산하므로 화면에 표출된 격자 값의  합계가  총합계와  차이가 있을 수  있습니다. </li>
                                       </ul>
                                    </div>
                                    <a href=#n class="area-notice__btn more-detail">자세히보기</a>
                                 </div>
								   </div>
								   
								   <div id = "detail_total" style = "display : none">
								   	  <div id = "detail_data_popup" class = "for_scroll_parent">
								   	  	<div class = "for_scroll"></div>
								   	  	<div id = "detail_data_people">
								   	  	<div class="life-industry__chart">
								   	  	</div>
									   	  	<div class="life-industry__chart">
				                              <div class="chart-wrap">
				                                 <!-- 상세조건 차트 :: s -->
												<div class="dTop">
												<h4> <a class = "pfh_year_detail">-</a> 인구</h4>
												<div class="dChartTextDiv">
														<p class="dChartText01" id="dPopTot"></p>
														<p class="dChartText03">
															<span class="dChartTextHl02" id="dPopitemCnt"></span>
														</p>
													</div>
													<div class="dChartDiv" id="popDChart"></div> 
													<div class="chart__legend width_100" >
					                                    <ul>
					                                       <li>
					                                          <span class = "selected_option_bg"></span>
					                                          <p id="dPopType"> </p>
					                                       </li>
					                                    </ul>
					                                 </div>						
												</div>
												<!-- 상세조건 차트 :: e -->
				                              </div>
				                            </div>
			                           
				                            <div class="life-industry__chart">
				                              <div class="chart-wrap">
				                                 <div class="dTop">
				                                 	<!-- <h4> <a class = "pfh_year_detail">2019년</a> 인구</h4> -->
				                                 	<p id = "popChart_Gender_title"> </p>
													<div class="dChartDiv" id="popChart_Gender">
													</div>
													<div class="txt_box03">
														<span class="cr02"></span>
														<span class="sa_txt03 mightOverflow" id="dPopType_Gender"></span>
													</div>
													<div class="chart__legend width_100" id = "gender_number" >
					                                    <ul>
					                                       <li>
					                                          <span style="background-color: #95ceff;"></span>
					                                          <p>남자  </p>
					                                          <span style="background-color: #EF595C;"></span>
					                                          <p>여자  </p>
					                                       </li>
					                                    </ul>
					                                 </div>
												</div>
				                              </div>
				                            </div>
				                            
				                            <div class="life-industry__chart border-b">
				                              <div class="dSec">
												<div class="dSec_title">
														<h5 style="font-size:16px; float:left;" id="popTotTitle"></h5>
														<p>(단위 : 명)</p>
													</div>
													<div class="dSec_chart">
														<div id="popTotDChart"></div>
													</div>
												</div>
				                            </div>
				                            <p id = "static_from" class = "static_from">인구, 가구, 주택 기초자료 : 통계청, 「인구주택총조사」</p>
			                             </div>
			                             
			                             <div id = "detail_data_family" style = "display : none">
			                             <div id = "detail_data_family_ALL" style = "display : none">
				                             <div class="life-industry__chart">
				                             </div>
				                             	<div class="life-industry__chart">
					                              <div class="chart-wrap">
					                                 <!-- 상세조건 차트 :: s -->
													<div class="dTop" style = "width : 100%">
													<h4> <a class = "pfh_year_detail">-</a> 가구</h4>
														<p>
																<span class="dChartTextHl02"> 세대 구성별 가구 규모</span>
														</p>
														
														<p id = "perFamilyTxt"> </p>
														<div class="dChartDiv" id="familyDChart" > 차트</div> 
														<div class="chart__legend width_100">
						                                    <ul>
						                                       <li>
						                                          <span  style="background-color: #60bc4c;"></span>
						                                          <p id="familyType01">친족 </p>
																  <span  style="background-color: #ffaa01;"></span>
						                                          <p id="familyType02">1인</p>
						                                        </li>
						                                        <li>  
						                                          <span style="background-color: #ed5980;"></span>
						                                          <p id="familyType03">비친족</p>
						                                       </li>
						                                    </ul>
						                                 </div>						
													</div>
													<!-- 상세조건 차트 :: e -->
					                              </div>
					                            </div>
				                           		<div class="life-industry__chart border-b">
				                           		<!-- <h4> <a class = "pfh_year_detail">2019년</a> 가구</h4> -->
				                           		<h4 id= "family_h4">친족 가구의 세대별 가구 수  </h4> <p>(단위 : 가구)</p>
					                              <div class="dSec">
													<div class="dSec_title">
														<!-- <p>
															<span class="dChartTextHl02"> 친족 가구의 세대별 가구 수</span>
														</p> -->
														<br>
														</div>
														<div class="dSec_chart">
															<div id="familyTotDChart"></div>
														</div>
													</div>
					                            </div>
					                              <p id = "static_from_family" class = "static_from">인구, 가구, 주택 기초자료 : 통계청, 「인구주택총조사」</p>
				                            </div>
				                            
				                            <div id = "detail_data_family_NOTALL" style = "display : none">
				                            	<div class="life-industry__chart">
				                             	</div>
				                             	<div class="life-industry__chart border-b">
				                             		<div class="chart-wrap">
					                                 <!-- 상세조건 차트 :: s -->
													<div class="dTop" style = "width : 100%">
														<h4><a class = "pfh_year">-</a>가구</h4> 
														<p>
														<span class="dChartTextHl02">세대 구성별 가구 규모</span>
														</p>
													
													
														<p id = "perFamilyTxt"> </p>
														<div class="dChartDiv" id="familyDChart_02" > 차트</div> 
														<div class="chart__legend width_100">
						                                    <ul>
						                                       <li>
						                                          <span class = "selected_option_bg"></span>
						                                          <p class = "selected_option_text"> </p>
						                                       </li>
						                                       <li>
						                                       </li>
						                                    </ul>
						                                 </div>						
													</div>
													<!-- 상세조건 차트 :: e -->
					                              </div>
				                            	
													<div class="chart__table">
						                               <p class = "selected_option_per table_place"> (단위 : 가구, %)</p>
					                                <table id = "family_table">
					                                    <colgroup>
					                                        <col style="width: 10%;">
					                                        <col style="width: 30%;">
					                                        <col style="width: 30%;">
					                                        <col style="width: 30%;">
					                                    </colgroup>
					                                    <thead>
					                                        <tr>
					                                            <th scope="col" colspan="2">구분</th>
					                                            <th scope="col">가구 수</th>
					                                            <th scope="col">구성비</th>
					                                        </tr>
					                                    </thead>
					                                    <tbody id = "family_table_tbody">
					                                        <tr class="on">
					                                            <td colspan="2">영역 내 전체</td>
					                                            <td>17,453</td>
					                                            <td>100.0</td>
					                                        </tr>
					                                        <tr>
					                                            <td colspan="2">선택한 조건</td>
					                                            <td>1,142</td>
					                                            <td>6.5</td>
					                                        </tr>
					                                        <tr>
					                                            <td></td>
					                                            <td> 1인 가구</td>
					                                            <td>1,142</td>
					                                            <td>6.5</td>
					                                        </tr>
					                                        <tr class = "on">
					                                            <td colspan="2">선택하지 않은 조건</td>
					                                            <td>3,202</td>
					                                            <td>18.3</td>
					                                        </tr>
					                                    </tbody>
					                                </table>
					                            </div>
					                            </div>
				                            </div>
			                             </div>
			                             <div id = "detail_data_house" style = "display : none">
			                             	<div id = "detail_data_housetype_ALL" style = "display : none">
			                             	<div class="life-industry__chart"> </div>
			                             	<div class="life-industry__chart border-b"> 
			                             		<div class = "chart-wrap">
			                             			<div class="dTop" style="width : 100%">
													<h4> <a class="pfh_year_detail">-</a> 주택</h4>
														<p>
																<span class="dChartTextHl02"> 주택 종류별 규모</span>
														</p>
														
														<p id="perFamilyTxt2"> </p>
														<div class="dChartDiv" id="houseDChart" > 차트</div>
														<div class="chart__legend width_100">
						                                    <ul>
						                                       <li>
						                                          <span style="background-color: #29aac4;"></span>
						                                          <p id="houseType01">단독주택 </p>
																  <span style="background-color: #60bc4c;"></span>
						                                          <p id="houseType02">아파트  </p>
						                                       </li>
						                                       <li>   
						                                          <span style="background-color: #4502e0;"></span>
						                                          <p id="houseType03">연립주택  </p>
						                                       	  <span style="background-color: #ffaa01;"></span>
						                                          <p id="houseType04">다세대 주택  </p>
						                                       </li>
						                                       <li>
						                                          <span style="background-color: #ED5980;"></span>
						                                          <p id="houseType05">비거주용 건물 내 주택 </p>
						                                       </li>
						                                    </ul>
						                                 </div>						
													</div>
			                             		</div>
			                             		<div class="dSec">
														<div class="dSec_chart">
															<div id="houseTotDChart"></div>
														</div>
												</div>
												</div>
											   <!--  <p id = "static_from_house_all" class = "static_from">인구, 가구, 주택 기초자료 : 통계청, 「인구주택총조사」</p> -->												
			                             	</div>
			                             	<div id = "detail_data_housetype_NOTALL" style = "display : none">
			                             		<div class="life-industry__chart"></div>
			                             		<div class="life-industry__chart">
				                             	<div class="chart-wrap">
					                                 <!-- 상세조건 차트 :: s -->
													<div class="dTop" style="width : 100%">
														<h4><a class="pfh_year">-</a>주택</h4> 
														<p>
														<span class="dChartTextHl02">선택한 주택 종류의 주택 수</span>
														</p>
													
													
														<p id="perHouseTxt"> </p>
														<div class="dChartDiv" id="houseDChart02"> 차트</div> 
														<div class="chart__legend width_100">
						                                    <ul> 
						                                       <li>
						                                          <span class = "selected_option_bg"></span>
						                                          <p class = "selected_option_text"> </p>
						                                       </li>
						                                       <li>
						                                       </li>
						                                    </ul>
						                                 </div>						
													</div>
													<!-- 상세조건 차트 :: e -->
					                              </div>
					                              </div>
					                              <div class="life-industry__chart border-b">
													<div class="chart__table">
					                                <p class = "selected_option_per table_place">(단위 : 호, %)</p>
					                                <table id = "family_table">
					                                    <colgroup>
					                                        <col style="width: 10%;">
					                                        <col style="width: 30%;">
					                                        <col style="width: 30%;">
					                                        <col style="width: 30%;">
					                                    </colgroup>
					                                    <thead>
					                                        <tr>
					                                            <th scope="col" colspan="2">구분</th>
					                                            <th scope="col">주택 수</th>
					                                            <th scope="col">구성비</th>
					                                        </tr>
					                                    </thead>
					                                    <tbody id = "house_table_tbody">
					                                        <tr class="on">
					                                            <td colspan="2">영역 내 전체</td>
					                                            <td>-</td>
					                                            <td>-</td>
					                                        </tr>
					                                        <tr>
					                                            <td colspan="2">선택한 조건</td>
					                                            <td>-</td>
					                                            <td>-</td>
					                                        </tr>
					                                        <tr class = "on">
					                                            <td colspan="2">선택하지 않은 조건</td>
					                                            <td>-</td>
					                                            <td>-</td>
					                                        </tr>
					                                    </tbody>
					                                </table>
					                            </div>
				                            	</div>
			                             	</div>
			                             	<div id = "detail_data_houseyear" style = "display : none">
			                             		<div class="life-industry__chart border-b">
								   	  			<div class = "chart-wrap">
								   	  				<div class = "dTop">
								   	  					<h4> <a class = "pfh_year_detail">-</a> 주택</h4>
													<div class="dChartTextDiv">
														<p class="dChartText03">
															<span class="dChartTextHl03">주택</span>								
														</p>
													</div>
													<div class="dChartDiv" id="houseDChart03"></div> 
													<div class="chart__legend width_100">
					                                    <ul>
					                                       <li>
					                                          <span class = "selected_option_bg"></span>
					                                          <p class ="selected_option_text"> </p>
					                                       </li>
					                                       <li>
					                                       </li>
					                                    </ul>
					                                 </div>					                                     
								   	  				</div>
								   	  				<p id = "static_from" class = "static_from">인구, 가구, 주택 기초자료 : 통계청, 「인구주택총조사」</p>	
								   	  			</div>
								   	  			<div class="life-industry__chart border-b">
								   	  			<div class="dSec">
												<div class="dSec_title">
														<h5 style="font-size:16px; float:left;" id="houseTotTitle"></h5>
														    <p class = "selected_option_per category_place">(단위 : 호)</p>
													</div>
													<div class="dSec_chart">
														<div id="houseTotDBarChart"></div>
													</div>
												</div>	
												</div>		
												</div>	
												<p id = "static_from_house_year" class = "static_from">인구, 가구, 주택 기초자료 : 통계청, 「인구주택총조사」</p>													
			                             	</div>
			                             	<div id = "detail_data_housearea">
			                             		<div class="life-industry__chart border-b">
								   	  			<div class="chart-wrap">
								   	  				<div class="dTop">
								   	  					<h4> <a class="pfh_year_detail">-</a> 주택</h4>
													<div class="dChartTextDiv">
														<p class="dChartText03">
															<span class="dChartTextHl03">주택</span>								
														</p>
													</div>
													<div class="dChartDiv" id="houseDChart04"> </div>
													<div class="chart__legend width_100">
					                                    <ul>
					                                       <li>
					                                          <span class ="selected_option_bg"></span>
					                                          <p class = "selected_option_text"></p>
					                                       </li>
					                                       <li>
					                                       </li>
					                                    </ul>
					                                 </div>
								   	  				</div>
								   	  			</div>
								   	  			<div class="life-industry__chart border-b">
								   	  			<div class="dSec">
												<div class="dSec_title">
														<h5 style="font-size:16px; float:left;" id="houseTotTitle02"></h5>
														 <p class = "selected_option_per table_place">(단위 : 호) </p>
													</div>
													<div class="dSec_chart">
														<div id="houseTotDBarChart02"></div>
													</div>
												</div>	
												</div>	
												</div>
			                             	</div>
			                             	<p id = "static_from_size" class = "static_from">인구, 가구, 주택 기초자료 : 통계청, 「인구주택총조사」</p>
			                             </div>
			                             <div id = "detail_data_copr">
			                             	<div id  = "detail_data_copr_life">
			                             		<div class="life-industry__chart">
									   	  			<div class = "chart-wrap">
									   	  				<div class = "dTop">
									   	  					<h4> <a class = "pfh_year_detail">-</a> <a class = "dcopr_or_employee_txt"> 사업체 </a></h4> 
									   	  					<!-- <h4 class = "copr_work_subject_txt"> 사업체</h4> -->
														<div class="dChartTextDiv">
															<p class="dChartText03">
																<span class="dChartTextHl03 copr_work_subject_txt">사업체</span>								
															</p>
														</div>
														<div class="dChartDiv" id="copr_work_DChart"></div> 
														<div class="chart__legend width_100">
						                                    <ul>
						                                       <li>
						                                          <span class = "selected_option_bg"></span>
						                                          <p class ="selected_option_text"> </p>
						                                       </li>
						                                       <li>
						                                       </li>
						                                    </ul>
						                                 </div>
						                                         <p class = "selected_option_per"> </p>
								   	  				</div>
								   	  			</div>
								   	  			</div>
								   	  			<div class="life-industry__chart border-b">
								   	  				<div class="dSec">
														<div class="dSec_title">
															<h5 style="font-size:16px; float:left;" id="coprTotTitle"></h5>
															<p class = "category_place" id = "copr_chart_unit">(단위 : 개)</p>
														</div>
														<div class="dSec_chart">
															<div id="copr_work_TotDBarChart"></div>
														</div>
													</div>	
												</div>		
												<p id = "static_from_all" class = "static_from">인구, 가구, 주택 기초자료 : 통계청, 「인구주택총조사」</p>
			                                </div>
			                                <div id  = "detail_data_copr_industry">
			                                	<div class="life-industry__chart">
								   	  			<div class = "chart-wrap">
								   	  				<div class = "dTop">
								   	  					<h4> <a class = "pfh_year_detail">-</a><a class = "dcopr_or_employee_txt"> 사업체</a></h4>
													<div class="dChartTextDiv">
														<p class="dChartText03">
															<span class="dChartTextHl03">사업체</span>								
														</p>
													</div>
													<div class="dChartDiv" id="copr_work_DChart02"></div> 
													<div class="chart__legend width_100">
					                                    <ul>
					                                       <li>
					                                          <span class = "selected_option_bg"></span>
					                                          <p class ="selected_option_text"> </p>
					                                       </li>
					                                       <li>
					                                       </li>
					                                    </ul>
					                                 </div>
					                                        	
								   	  				</div>
								   	  			</div>
								   	  			</div>
								   	  			<div class="life-industry__chart">
				                                 <div class="dSec" id = 'copr_view_chart'>
														<div class="dSec_title">
														    <h5 style = "font-size: 16px;font-weight: bold;" id = "copr_maincategory_title">산업 대분류별 사업체 수</h5>
															<p style="font-size:16px; float:left;" id="copr_maincategory"></p>
														</div>
														<div class="dSec_chart">
															<div id="copr_maincategory_DChart"></div>
														</div>
												</div>
								   	  			<div class="chart__table" id = 'copr_view_table'>
								   	  				<p class = "selected_option_per table_place" id = "copr_employee_table_unit"> </p>
					                                <table id = "copr_table">
					                                    <colgroup>
					                                        <col style="width: 22%;">
					                                        <col style="width: 30%;">
					                                        <col style="width: 30%;">
					                                        <col style="width: 18%;">
					                                    </colgroup>
					                                    <thead>
					                                        <tr>
					                                            <th scope="col" >분류단계</th>
					                                            <th scope="col" colspan="2"> 분류코드 분류명</th>
					                                            <th scope="col" id = 'copr_table_unit'>구성비</th>
					                                        </tr>
					                                    </thead>
					                                    <tbody id = "copr_table_tbody">
					                                    </tbody>
					                                </table>
					                            </div>
								   	  			</div>
			                                </div>
								   	  </div>
								   
								   </div>
		                           <div class="area-notice px15" id="area-notice">
		                              <div class="area-notice__tit">		                             
		                                 <h4 class="icon_info"> <img alt="info" src="${ctx }/resources/m2021/images/map/img_info.png">격자 단위 통계정보 안내</h4>
		                                 <ul class="area-notice__info update_info">
		                                    <li class="color-red grid_unit_info"></li>
		                                    <li>조회한 생활권역(영역)에 포함되는 격자를 기준으로 통계정보를 제공합니다.</li>
		                                    <li>기초자료를 기반으로 비밀 보호 기법(BSCA)을 적용하여  값을 계산하므로 화면에 표출된 격자 값의  합계가  총합계와  차이가 있을 수  있습니다. </li>
		                                 </ul>
		                              </div>
		                              <a href=#n class="area-notice__btn more-detail">자세히보기</a>
		                           </div>
		                        </div>
		                        <!-- SGIS4_생활권역_모바일_SG 시작 --> 
		                       <!-- <div class="map__form__below">
		                           <button type = "button" onclick="$catchmentAreaMenu.ui.setReport();" class="map__form__search" id = "report_btn">보고서 저장</button>
		                        </div> -->
		                        <!-- SGIS4_생활권역_모바일_SG 끝--> 
                     </div>
                     <!-- e::사업체 주요 생활 업종(선택 전) -->
                  </div>
				  <div class="map__form swiper_menu" id = "menu_5">
                           <div class="map__form__above height_100">
                              <div class="type-select legend height_100">
                                 <h4 class="mb5">영역 내 격자 정보</h4>
                                 <div class="life-industry not_none">
                                    <div class="life-industry__table mx0">
                                       <table>
                                          <colgroup>
                                             <col style="width: 30%;">
                                             <col style="">
                                          </colgroup>
                                          <tbody>
                                             <tr>
                                                <th scope="col">격자 크기</th>
                                                <td id = "grid_size_txt"></td>
                                             </tr>
                                             <tr>
                                                <th scope="col">격자 개수</th>
                                                <td id = "grid_count_txt"></td>
                                             </tr>
                                             <tr>
                                                <th scope="col">총 격자 면적</th>
                                                <td id = "grid_area_txt"></td>
                                             </tr>
                                             <tr>
                                                <th scope="col">통계 주제</th>
                                                <td id = "grid_statTitle_txt"></td>
                                             </tr>
                                             <tr>
                                                <th scope="col">기준 연도</th>
                                                <td id = "titleYearTxt_2"></td>
                                             </tr>
                                             <tr>
                                                <th scope="col">인구 수</th>
                                                <td id = "grid_totSum"></td>
                                             </tr>
                                          </tbody>
                                       </table>
                                    </div>
                                 </div>
                                 <div class="area-notice_grid">
                                    <div class="area-notice__con">
                                       <ul class="area-notice__info_grid">
                                       	<h4 class="mt-10px mb5">선택한 격자 정보</h4>  	
                                       	<div class="life-industry not_none">
	                                    <div class="life-industry__table mx0">
	                                       <table>
	                                          <colgroup>
	                                             <col style="width: 30%;">
	                                             <col style="">
	                                          </colgroup>
	                                          <tbody>
	                                          	 <tr>
                                          		    <th scope="col">영역 설정 기준</th>
                                          	        <td id = "grid_area_setting"></td>
                                         	     </tr>
                                          	     <tr>
                                                    <th scope="col">선택 지점</th>
                                                    <td id = "grid_select_area"></td>
                                           	     </tr>
                                           	 	 <tr>
                                                    <th scope="col">행정구역</th>
                                                    <td id = "grid_bordRange_txt"></td>
                                             	 </tr>
                                                 <tr>
                                                	<th scope="col">기초자료</th>
                                                	<td id = "grid_source_text">통계청, 「인구주택총조사」</td>
                                                 </tr>
	                                             <tr>
	                                                <th scope="col">격자 이름</th>
	                                                <td id = "grid_code_nm"></td>
	                                             </tr>
	                                             <tr>
	                                                <th scope="col">격자 범례</th>
	                                                <td><div id = "gird_legned_gugan"></div></td>
	                                             </tr>
	                                             <tr>
	                                                <th scope="col">격자 값</th>
	                                                <td id = "grid_click_total02"></td>
	                                             </tr>
	                                          </tbody>
	                                       </table>
	                                    </div>
	                                 </div>
                                       </ul>
                                    </div>

                                    <button type="button" class="area-notice__btn">
                                       <img src="${ctx }/resources/m2021/images/map/i_arrow--bottom.png" alt="영역 설정 안내 더보기">
                                    </button>
                                 </div>
                                 

                                 <h4 class="mt-10px mb5">격자 범례</h4>
                                 <ul class="legend__list">
                                    <li>
                                       <div class = 'lev7' id = 'lev7' ></div>
                                       <div class = 'lev7' id = 'levCnt7' ></div>
                                    </li>
                                    <li>
                                       <div class = 'lev6' id = 'lev6' ></div>
                                       <div class = 'lev6' id = 'levCnt6' ></div>
                                    </li>
                                    <li>
                                       <div class = 'lev5' id = 'lev5' ></div>
                                       <div class = 'lev5' id = 'levCnt5' ></div>
                                    </li>
                                    <li>
                                       <div class = 'lev4' id = 'lev4' ></div>
                                       <div class = 'lev4' id = 'levCnt4' ></div>
                                    </li>
                                    <li>
                                       <div class = 'lev3' id = 'lev3' ></div>
                                       <div class = 'lev3' id = 'levCnt3' ></div>
                                    </li>
                                    <li>
                                       <div class = 'lev2' id = 'lev2' ></div>
                                       <div class = 'lev2' id = 'levCnt2' ></div>
                                    </li>
                                    <li>
                                       <div class = 'lev1' id = 'lev1' ></div>
                                       <div class = 'lev1' id = 'levCnt1' ></div>
                                    </li>
                                    <li>
                                       <div class = 'lev0' id = 'lev0' >빈격자</div>
                                       <div class = 'lev0' id = 'levCnt0' >3개</div>
                                    </li>
                                 </ul>

                                 <div class="life-industry__chart border-b">
                                    <h4 id = "grid_graph_title">영역 내 총 인구 수 변화 <span>(단위: 천명)</span></h4>
                                    <p id = "grid_graph_schCond"> </p>
                                    <div class="chart-wrap"  id = "gridStatChart_right">

                                    </div>
                                    <span id = 'total_source_txt'>기초자료 : 통계청, 「인구주택총조사」</span>
                                 </div>
                                 

                                 <div class="area-notice px15">
                                    <div class="area-notice__tit">                                   
                                       <h4 class="icon_info"> <img src = "${ctx }/resources/m2021/images/map/img_info.png"></img>격자 단위 통계정보 안내</h4>
                                       <ul class="area-notice__info">
                                          <li>조회한 생활권역(영역)에 포함되는 격자를 기준으로 통계정보를 제공합니다.</li>
                                          <li>기초자료를 기반으로 비밀 보호 기법(BSCA)을 적용하여  값을 계산하므로 화면에 표출된 격자 값의  합계가  총합계와  차이가 있을 수  있습니다. </li>
                                       </ul>
                                    </div>
                                    <a href=#n class="area-notice__btn more-detail">자세히보기</a>
                                 </div>
                              </div>


                           </div>
                        </div>	
                  </div>
                        </form>
                        
                     </div>
                     <!-- e::하단 메뉴 -->
                  </div>
                  </div>
               </div>
            </div>
            <!-- end::MAP -->

         </div>   
         <!-- end::container -->
      </div>
      <!-- end::main -->

   </div>
   <!-- end::wrap -->

   <!-- s::fillter -->
<%--   <div class="option" id = "catchmentAreamap_option_setting_board" style="height: 360px; overflow-y:auto;">   <!-- 2022-10-24 css 수정 -->
      <form action="">
         <div class="option__wrap">       	
            <div class="option__header d-flex justify-content-between">
               <!-- <h3>생활권역 통계지도 조회 조건</h3>
               <a href="#n" class="map__option--close"><img src="${ctx }/resources/m2021/images/i_close--option.png" alt="Close"></a>
                -->
                <h3>관심지역변경</h3>
                <a href="#n" class="map__option--close">
	               <button class="" type="button">	       				
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1 1L13 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M13 1L1 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>							       				
			     	</button>
			    </a>			     
            </div>
            <div class="area_select_wrap">
		        <div class="area_select_inner" style="padding: 0px 10px;"> <!-- 2022-10-24 css 수정 -->
		          <span class="valueSido">시/도</span>
		          <span>
		          	<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>
		          </span>
		          <span class="valueSgg">시/군/구</span>
		          <span>
		          	<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>
		          </span>
		          <span  class="valueEmd">읍/면/동</span>
		        </div>
		    </div>
            <div class="option__body" style="height:calc(28vh); padding:10px;"> <!-- 2022-10-24 css 수정 -->
               <div class="option__container sidoContainer">
                  <div class="sido-group" id = "sido"></div>
               </div>
               <div class="option__container btn-group2 sggContainer">
                  <div class="sgg-group" id = "sgg"></div>  
                                  
               </div>
               <div class="option__container emdongContainer">
                  <div class="emdong-group" id = "emdong"></div>  
               </div>
            </div>
         </div>
         <!-- 2022-10-24 css 수정 -->
         <button type="button" class="btn btn__submit" id = "option_apply" style="background-color: #F7F7F7; box-sizing: border-box; border: 1px solid #E8E8E8; color: #4f4f4f; width: 100px; height: 100%; font-size: 12px; font-weight: 700; margin: 10px; position: relative; left:31%;">적용</button>
      </form>
--%>   
    
<%--       <form action="">
         <div class="option__wrap">
         	
            <div class="option__header d-flex justify-content-between">
               <!-- <h3>생활권역 통계지도 조회 조건</h3>
               <a href="#n" class="map__option--close"><img src="${ctx }/resources/m2021/images/i_close--option.png" alt="Close"></a>
                -->
                <h3>관심지역변경</h3>
                <a href="#n" class="map__option--close">
	               <button class="" type="button">	       				
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1 1L13 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M13 1L1 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>							       				
			     	</button>
			     </a>
            </div>
            <div class="option__body">
               <div class="option__container">
                  <h4>광역시·도 선택</h4>
                  <div class="sido-group" id = "sido">

                  </div>
               </div>
               <div class="option__container btn-group2">
                  <h4>시·군·구 선택</h4>
                     <!-- SGIS4_생활권역_모바일_SG 시작  -->
                  <div class="option__content d-flex justify-content-start sgg-group" id = "sgg">            
                     <!-- SGIS4_생활권역_모바일_SG 끝 -->                               						
                  </div>                  
               </div>
               
               <div class="option__container">
                  <br>
               	  <p class="notice notice--red color-red"> 광역시·도와 시·군·구는 기본 선택 조건입니다.</p>
               	  <br>
                  <h4>읍·면·동 선택</h4>
                  <div class="option__content">
                     <select  id="emdong_select" class="form-select">
                     </select>
                     <!-- SGIS4_생활권역_모바일_SG 시작  -->
                     <p class="my-5px" style= 'color: #d43212;' >읍·면·동까지의 통계정보를 이용하려면 지역을 선택하십시오.</p>
                     <!-- SGIS4_생활권역_모바일_SG 끝 -->   
                  </div>
               </div>
               <p class="option__text">
                  <img src="${ctx }/resources/m2021/images/map/img_info.png" alt="생활권역 통계지도 유의 사항">
                  생활권역 통계지도 이용 안내
               </p>
            </div>
            <div class="btn__wrap d-flex justify-content-between">
               <button type="button" class="btn btn__cancel" id = "option_clear">초기화</button>
               <button type="button" class="btn btn__submit" id = "option_apply">적용</button>
            </div>
         </div>
      </form> --%>    
   
   <!-- e::fillter -->

   <!-- begin::MODAL -->
      <!-- s::위치 정보 동의 -->
      <div class="modal location__agree popWrap">
         <div class="modal__header popHeader">
            <h3 class="popTitle">위치정보 조회 허용</h3>
         </div>
         <div class="modal__body">
         <!-- SGIS4_생활권역_모바일_SG 시작  -->
            <img src="${ctx }/resources/m2021/images/map/img_location.png" alt="‘생활권역 통계지도’는 도로네트워크를 활용하여 생활권역의 통계자료를 제공하는 서비스입니다. ">
            <p>
               ‘생활권역 통계지도’는 도로네트워크를 활용하여<br>
               생활권역의 통계자료를 제공하는 서비스입니다. 
            </p>
            <p>
               현재 위치에서 생활권역 통계지도를 이용하려면<br>               
               <b>내 위치 조회를</b> 허용해 주십시오.
               <span>(허용 시 SGIS플러스 모바일 전체 적용)</span>
            </p>
         <!-- SGIS4_생활권역_모바일_SG 끝 -->   
         </div>
         <div class="btn__wrap d-flex" style="justify-content:center; height:35px;">
            <button type="button" class="btn_popType3" id = "mylocationaccept">허용</button>
            <button type="button" class="btn_reset" id = "mylocationcancel" style="margin:0 0 0 5px">취소</button>
         </div>
      </div>
      <!-- e::위치 정보 동의 -->
      <!-- s::고정값 선택 레이어 팝업 -->
      <div class="modal default-layer" id ="default-layer" style="display: none;">
         <form action="">
            <div class="modal__body" id= "modal_body">   
            <p></p>                     
            </div>
            <!-- <div class="btn-wrap--one"> -->
            <div class="btn-wrap--one" style="height: 35px;">
               <!-- <button type="button" class="btn btn__submit btn__check">확인</button> -->
               <button type="button" class="btn map__form__search btn__check">확인</button>
            </div>
         </form>
      </div>    
      <div class="dim" style="display: none;"></div>
      <!-- e::고정값 선택 레이어 팝업 -->
      <!-- s::지도에서 지점 선택 -->
      <div class="modal point__select" style = "display : none;">
         <form action="">
            <div class="modal__header">
               <h3 class="modal__tit">지점 선택</h3>
            </div>
            <div class="modal__body">
               <!-- SGIS4_생활권역_모바일_SG 시작  -->
               <p>생활권역 통계정보를  조회할 지점의 주소 또는 시설을 선택해 주십시오.</p>
               <!-- SGIS4_생활권역_모바일_SG 끝 -->   
               <div class="point__con point__address" style="margin-top:10px">
                  <div class="point__radio d-flex">
                     <input type="radio" class="form-radio" id="sel_addr1" name="sel_addr1" title="주소를 선택해주세요" checked>
                     <label for="sel_addr1">
                        <span></span>
                        <p>주소 선택</p>
                     </label>
                  </div>
                  <dl>
                     <dt>도로명</dt>
                     <dd id = "road_name">서울특별시 구로구 구로동로 148</dd>
                  </dl>
                  <dl>
                     <dt>지번</dt>
                     <dd id = "address_name">서울특별시 구로구 구로동 80</dd>
                  </dl>
               </div>
               <div class="point__con point__facility">
                  <div class="point__radio d-flex">
                     <input type="radio" class="form-radio" id="sel_addr2" name="sel_addr2" title="시설을 선택해주세요">
                     <label for="sel_addr2">
                        <span></span>
                        <p>시설 선택</p>
                     </label>
                  </div>
                  <ul class="point__list">
                     <!-- <li><a href="#n">서울연희미용고등학교</a></li> -->
                  </ul>
               </div>
            </div>
            <div class="btn__wrap d-flex" style="justify-content:center; height:35px;">
               <button type="button" class="btn_popType3" id = "submitPoiButten">확인</button>
               <button type="button" class="btn_reset" id = "cancelPoiButten" style="margin: 0 0 0 5px">취소</button>
            </div>
         </form>
      </div>
      <!-- e::지도에서 지점 선택 -->
      <!-- s::지도에서 지점 확인 -->
      <div class="modal point__confirm" style = "display : none;">
         <form action="">
            <div class="modal__header">
               <h3 class="modal__tit">지점 선택</h3>
            </div>
            <div class="modal__body">
            <!-- SGIS4_생활권역_모바일_SG 시작  -->
               <p>생활권역 통계정보를 조회할 지점으로 선택하시겠습니까?</p>
            <!-- SGIS4_생활권역_모바일_SG 끝 -->    
               <div class="point__con point__address" style="margin-top:10px">
                  <div class="point__tit">롯데백화점강남점</div>
                  <dl id = 'point__roadaddress'>
                     <dt>도로명</dt>
                     <dd>서울특별시 구로구 구로동로 148</dd>
                  </dl>
                  <dl id = 'point__jibunaddress'>
                     <dt>지번</dt>
                     <dd>서울특별시 구로구 구로동 80</dd>
                  </dl>
               </div>
            </div>
            <div class="btn__wrap d-flex justify-content-between">
               <!-- <button type="button" class="btn btn__cancel" id = "point__cancel">취소</button>
               <button type="button" class="btn btn__submit" id = "point__submit">확인</button> -->
               <button type="button" class="btn btn_popType3" id = "point__submit" style="font-size: 13px;">확인</button>
               <button type="button" class="btn btn_reset" id = "point__cancel" style="margin: 0 0 5px 5px; font-size: 12px;">취소</button>
            </div>
         </form>
      </div>
      <!-- e::지도에서 지점 확인 -->

      <!-- s::간격 선택 레이어 팝업 -->
      <div class="modal distance_select-layer" id = "interval_table" style = "display : none">
         <form action="">
            <div class="modal__header">
               <h3 class="modal__tit">주행시간 간격 선택</h3>
            </div>
             <!-- SGIS4_생활권역_모바일_SG 시작  -->
            <div class="modal__body">
               <p>선택한 기준은 순차적으로 자동 입력됩니다.</p>
               <div class="distance_select__con col-4">                  
               </div>
               <div>
                  <p class="notice notice--red color-red" style = "display : none">최소 1개 이상 선택해 주십시오.</p>
                  <p class="notice notice--red color-red" style = "display : none">최대 4개까지 선택할 수 있습니다.</p>
               </div>
                <!-- SGIS4_생활권역_모바일_SG 끝  -->
               <span> </span>
            </div>
            <div class="btn__wrap d-flex justify-content-between">
               <button type="button" class="btn btn__cancel" >취소</button>
               <button type="button" class="btn btn__submit" id = "interval_table_check">확인</button>
            </div>
         </form>
      </div>
      <!-- e::간격 선택 레이어 팝업 -->

       <!-- s::사업체 세부 조건 선택 (주요생활업종) -->
      <div class="life-industry__change__layer" id = "copr_detail_condition"style = "display : none">
         <h3>사업체 세부 조건 선택</h3>
         <div class="life-industry__change__con">         
         </div>
       <!--   <div id= "info_text">
         	<p>
	         	주요 생활 업종은 한국표준산업분류(10차)를 <br>
				일상생활에서 쉽게 이해할 수 있는 명칭을 사용해 재분류하였습니다.<br>
				<br>
				업종 검색에서 한국산업표준분류 조회 기능을<br>
				이용하시면 더 많은 정보를 볼 수 있습니다.
         	</p>
         </div> -->
         <div class="btn__wrap d-flex justify-content-between">
            <button type="button" class="btn btn__cancel" id = "copr_detail_cancel01">취소</button>
            <button type="button" class="btn btn__submit" id = "copr_detail_submit01">확인</button>
         </div>
      </div>
      <!-- e::사업체 세부 조건 선택 (주요생활업종) -->
      
      <!-- s::종사자 세부 조건 선택 (주요생활업종) -->
      <div class="life-industry__change__layer" id = "worker_detail_condition"style = "display : none">
         <h3> 종사자 세부 조건 선택</h3>
         <div class="life-industry__change__con">
         
         </div>
         <div class="btn__wrap d-flex justify-content-between">
            <button type="button" class="btn btn__cancel" id = "worker_detail_cancel01">취소</button>
            <button type="button" class="btn btn__submit" id = "worker_detail_submit01">확인</button>
         </div>
      </div>
      <!-- e::종사자 세부 조건 선택 (주요생활업종) -->
      
      <!-- s::사업체 세부 조건 선택 (한국산업표준분류) -->
      <div class="life-industry__select__layer" id = "copr_detail_condition_korea" style = "display : none">
         <h3>사업체 세부 조건 선택</h3>
         <div class="life-industry__select__con">
            <p>분류코드, 분류항목명, 색인어를 입력 후 검색합니다. 검색된 결과에서 원하는 분류항목을 선택합니다.</p>
            <h4>한국표준산업분류(10차) 검색</h4>
            <div class="life-industry__select__search">
               <input type="text" id = "ksicSearchWord_copr" class="form-input">
               <button type="button" id = "ksicSearchBtn_copr">검색</button>
            </div>
              <div class = "life-industry__select__search_info">
                <p class="notice" id = "search_notice_noword" style = "display : none"><img src="${ctx }/resources/m2021/images/i_notice--red.png" alt="검색조건을 입력해 주십시오."> 검색어를 입력해 주십시오.</p>               
               <p class="notice" id = "search_notice_mintwo" style = "display : none"><img src="${ctx }/resources/m2021/images/i_notice--red.png" alt="검색조건은 영어, 한글은 한 글자, 숫자는 두 글자 이상 입력해 주십시오."> 검색어는 영어, 한글은 한 글자, 숫자는 두 글자 이상 입력해 주십시오.</p>
            </div>
            <div class="life-industry__select__result">
               <p>
                  <span class="color-red ksicTotalTxt"></span> 
                  검색 결과 : 
                  <span class="color-blue ksicTotalCnt"></span>
               </p>
               <table>
                  <colgroup>
                     <col style="width: 15%;">
                     <col>
                  </colgroup>
                  <thead>
                     <tr>
                        <th scope="col">선택</th>
                        <th scope="col">
                           <span>분류코드</span>
                           <span>분류항목명</span>
                        </th>
                     </tr>
                  </thead>
                  <tbody id = "list">
                     
                  </tbody>
               </table>
               <p class = 'txt-green' id = 'ksic_notice_copr' style = 'display : none'>※ 입력하신 검색어가 분류항목명에는 없으나 색인어에 포함된 경우, 검색 결과로 같이 제공됩니다.</p>
            </div>
            <div>
            <p class="notice notice_nosel" id = "search_notice_nosel" style = "display : none"><img src="${ctx }/resources/m2021/images/i_notice--red.png" alt=" 검색 결과에서 사업체 조회 조건을 선택해 주십시오. "> 검색 결과에서 사업체 조회 조건을 선택해 주십시오. </p>
            </div>           
         </div>
         <div class="btn__wrap d-flex justify-content-between">
            <button type="button" class="btn btn__cancel">취소</button>
            <button type="button" class="btn btn__submit" id = "copr_detail_submit02">확인</button>
         </div>
      </div>
      <!-- e::사업체 세부 조건 선택 (한국산업표준분류) -->
      <!-- s::종사자 세부 조건 선택 (한국산업표준분류) -->
      <div class="life-industry__select__layer" id = "worker_detail_condition_korea" style = "display : none">
         <h3>종사자 세부 조건 선택</h3>
         <div class="life-industry__select__con">
            <p>분류코드, 분류항목명, 색인어를 입력 후 검색합니다.<br>검색된 결과에서 원하는 분류항목을 선택합니다.</p>
            <h4>한국표준산업분류(10차) 검색</h4>
            <div class="life-industry__select__search">
               <input type="text" id = "ksicSearchWord_worker" class="form-input keyboard_detail_condition">
               <button type="button" id = "ksicSearchBtn_worker">검색</button>              
            </div>
            <div class = "life-industry__select__search_info">
               <p class="notice" id = "search_notice_noword_worker" style = "display : none"><img src="${ctx }/resources/m2021/images/i_notice--red.png" alt="검색어는 입력해 주십시오."> 검색어를 입력해 주십시오.</p>               
               <p class="notice" id = "search_notice_mintwo_worker" style = "display : none"><img src="${ctx }/resources/m2021/images/i_notice--red.png" alt="검색어는 영어, 한글은 한 글자, 숫자는 두 글자 이상 입력해 주십시오. "> 검색어는 영어, 한글은 한 글자, 숫자는 두 글자 이상 입력해 주십시오. </p>
            </div>
            <div class="life-industry__select__result">
               <p>
                  <span class="color-red ksicTotalTxt"></span> 
                  검색 결과 : 
                  <span class="color-blue ksicTotalCnt"></span>
               </p>
               <table>
                  <colgroup>
                     <col style="width: 15%;">
                     <col>
                  </colgroup>
                  <thead>
                     <tr>
                        <th scope="col">선택</th>
                        <th scope="col">
                           <span>분류코드</span>
                           <span>분류항목명</span>
                        </th>
                     </tr>
                  </thead>
                  <tbody id = "list">
                     
                  </tbody>
               </table>
               <p class = 'txt-green' id = 'ksic_notice_worker' style = 'display : none'>※ 입력하신 검색어가 분류항목명에는 없으나 색인어에 포함된 경우, 검색 결과로 같이 제공됩니다.</p>
            </div>
            <div>
             <p class="notice notice_nosel" id = "search_notice_nosel_worker" style = "display : none"><img src="${ctx }/resources/m2021/images/i_notice--red.png" alt=" 검색된 결과에서 원하는 분류항목을 선택해 주십시오. "> 검색된 결과에서 원하는 분류항목을 선택해 주십시오. </p>            
            </div>
         </div>
         <div class="btn__wrap d-flex justify-content-between">
            <button type="button" class="btn btn__cancel">취소</button>
            <button type="button" class="btn btn__submit" id = "worker_detail_submit02">확인</button>
         </div>
      </div>
      <!-- e::종사자 세부 조건 선택 (한국산업표준분류) -->
      
      <!-- s::인구 세부 조건 선택-->
      <div class="modal life-industry__condition" id = "people_detail_condition"style = "display : none">
         <form action="">
            <div class="modal__header">
               <h3 class="modal__tit">인구 세부 조건 선택</h3>
            </div>
            <div class="modal__body">
               <p class = "color-red">
                  5세 단위, 10세 단위, 주요 구간 중 한 가지 조회 조건을 선택해 주십시오.
               </p>
 			   <div style = "display : none" id = 'detail_change_pop_gender_view'>
               <h4>성별</h4>
               <div class="life-industry__box mb15">
                  <div class="point__radio d-flex">
                     <input type="radio" class="form-radio" data-value = "00" id="people1" name="people" checked="checked" title="성별을 선택해주세요">
                     <label for="people1">
                        <span></span>
                        <p>전체</p>
                     </label>
                  </div>
                  <div class="point__radio d-flex">
                     <input type="radio" class="form-radio" data-value = "1" id="people2" name="people" title="성별을 선택해주세요">
                     <label for="people2">
                        <span></span>
                        <p>남자</p>
                     </label>
                  </div>
                  <div class="point__radio d-flex">
                     <input type="radio" class="form-radio" data-value = "2" id="people3" name="people" title="성별을 선택해주세요">
                     <label for="people3">
                        <span></span>
                        <p>여자</p>
                     </label>
                  </div>
               </div>
			   </div> 
               <!-- <h4>연령</h4> -->
               <div class="life-industry__tab col-4" id = "people_age_unit">
                  <a href="#n" data-value = "0" class="on">전체</a>
                  <a href="#n" data-value = "1">5세 단위</a>
                  <a href="#n" data-value = "2">10세 단위</a>
                  <a href="#n" data-value = "3">주요 구간</a>
               </div>
               <div>
                  <div class="life-industry__tab__con pops_text" id = "detail_condition_nothing">
                     <p>전체</p>
                  </div>
                  <div class="life-industry__tab__con pop_unit_div" id = "5_age_unit">
                     <div class="distance_select__con col-4 age_select_con">
                     </div>
                  </div>
                  <div class="life-industry__tab__con pop_unit_div" id = "10_age_unit">
                     <div class="distance_select__con col-4 age_select_con">
                     </div>
                  </div>
                  <div class="life-industry__tab__con pop_unit_div" id = "important_age_unit">
                     <div class="distance_select__con col-2 age_select_con">
                     </div>
                  </div>
               </div>
            </div>
            <div class="btn__wrap d-flex justify-content-between">
               <!-- <button type="button" class="btn btn__cancel" id = "people_detail_cancel">취소</button>
               <button type="button" class="btn btn__submit" id = "people_detail_submit">확인</button> -->
               <!-- 2022-12-16 버튼 class 변경 -->
               <button type="button" class="btn btn_popType3" id = "people_detail_submit" style="font-size: 13px;">확인</button>
               <button type="button" class="btn btn_reset" id = "people_detail_cancel" style="margin: 0 0 5px 5px; font-size: 12px;">취소</button>
            </div>
         </form>
      </div> 
      <!-- e::인구 세부 조건 선택 -->

      <!-- s::가구 세부 조건 선택 -->
      <div class="modal life-industry__condition" id = "family_detail_condition" style = "display : none">
         <form action="">
            <div class="modal__header">
               <h3 class="modal__tit">가구 세부 조건 선택</h3>
            </div>
            <div class="modal__body">
               <p>세대 구성 조건을 선택해 주십시오.</p>
               <div class="furniture__box">
<!--                   <button type="button" class="furniture__btn w100" id = "furniture_all" aria-checked="true" style = "width : 100%">전체가구</button>
 -->                  <label><input type = "checkbox" name = "furniture_all" id = "furniture_all" class = "">전체가구</label>
                  <div>
                     <div>
                        <p>친족 가구</p>
                        <button type = "button" class="furniture__btn w100 furniture_select" id = "family_furniture_all" data-bundle-nm = "A" style = "width : 98%; display : none;">전체</button>
                        <div class="col-2 family_furniture_select" id = "family_furniture">
                           <button type = "button" class="furniture__btn furniture_select furniture_selected_save" data-bundle-nm="A" data-value="01">1세대</button>
                           <button type = "button" class="furniture__btn furniture_select furniture_selected_save" data-bundle-nm="A" data-value="02">2세대</button>
                           <button type = "button" class="furniture__btn furniture_select furniture_selected_save" data-bundle-nm="A" data-value="03">3세대</button>
                           <button type = "button" class="furniture__btn furniture_select furniture_selected_save" data-bundle-nm="A" data-value="04">4세대 이상</button>                    
                        </div>
                     </div>
                     <div class = "family_furniture_select">
                        <button type = "button" class="furniture__btn furniture_select furniture_selected_save" data-value="B0" id = "nofamily">비친족 가구</button>   
                        <button type = "button" class="furniture__btn furniture_select furniture_selected_save" data-value="A0" id = "onefamily">1인 가구</button>  
                     </div>
                  </div>
               </div>
            </div>
            <div class="btn__wrap d-flex justify-content-between">
               <!-- <button type="button" class="btn btn__cancel" id = "family_detail_cancel">취소</button>
               <button type="button" class="btn btn__submit" id = "family_detail_submit">확인</button> -->
               <!-- 2022-12-16 버튼 class 변경 -->
               <button type="button" class="btn btn_popType3" id = "family_detail_submit" style="font-size: 13px;">확인</button>
               <button type="button" class="btn btn_reset" id = "family_detail_cancel" style="margin: 0 0 5px 5px; font-size: 12px;">취소</button>
            </div>
         </form>
      </div>
      <!-- e::가구 세부 조건 선택 -->
	  
	  <!-- s::주택 세부 조건 선택 -->
      <div class="modal life-industry__condition" id = "house_detail_condition" style = "display : none">
         <form action="">
            <div class="modal__header">
               <h3 class="modal__tit">주택 세부 조건 선택</h3>
            </div>
            <div class="modal__body">
               <p>주택 종류, 건축 연도, 연면적 중 한 가지 조회 조건을 선택해 주십시오.</p>
               <div class="life-industry__tab col-3 life-industry__tab02" id = "house_detail_condition_menu">
                  <a href="#n" data-value = "0" class="on">주택 종류</a>
                  <a href="#n" data-value = "1">건축 연도</a>
                  <a href="#n" data-value = "2">연면적</a>
               </div>
               
               <div class="life-industry__tab__wrap02" id = "house_detail_condition_select">
                  <div class="life-industry__tab__con" id = "house_detail_menu_01">
                     <label name = "house_check_name"><input type="checkbox"  id = "house_detail_all_check" name = "house_check_name" style = "padding-top: 3px; padding-top: 3px;">전체 선택</label>
                     <div class="distance_select__con col-2 house_select" id = "house_detail_type">
                     </div>
                  </div>
                  <div class="life-industry__tab__con one_select" id = "house_detail_menu_02">
                     <div class="distance_select__con col-4 house_select house_because_cancel">
                     </div>
                  </div>
                  <div class="life-industry__tab__con one_select" id = "house_detail_menu_03">
                     <div class="distance_select__con col-1 house_select house_because_cancel" id = "house_detail_floor_area">
                     </div>
                  </div>
               </div>
            </div>
            <div class="btn__wrap d-flex justify-content-between">
               <!-- <button type="button" class="btn btn__cancel" id = "house_detail_cancel">취소</button>
               <button type="button" class="btn btn__submit" id = "house_detail_submit">확인</button> -->
               <!-- 2022-12-16 버튼 class 변경 -->
               <button type="button" class="btn btn_popType3" id = "house_detail_submit" style="font-size: 13px;">확인</button>
               <button type="button" class="btn btn_reset" id = "house_detail_cancel" style="margin: 0 0 5px 5px; font-size: 12px;">취소</button>
            </div>
         </form>
      </div>
      <!-- e::주택 세부 조건 선택 -->	
      <!-- s::격자 클릭-->
      <div class="modal distance-layer" id = "grid_click" style = "display : none">
         <form action="">
            <div class="modal__header d-flex justify-content-between align-items-center">
               <h3 class="modal__tit" id = "grid_code_info">다사605439 격자의 통계정보</h3>
               <a href="#n" class="btn__cancel"><img src="${ctx }/resources/m2021/images/i_close-layer.png" alt="닫기"></a>
            </div>
            <div class="modal__body">
               <p id = 'grid_click_year'>
                  2019년 인구 수
               </p>
               <p id = 'grid_click_total'>
                  <b>579</b>명
               </p>
               <span id = 'grid_click_selected'>성별 (전체), 연령 (전체)</span>
               <dl class="color__list">
                  <dt id = "grid_click_level">100m격자</dt>
                  <dd>
                     <ul id = "selected_grid_bg_color">
                        <li style="background-color: #7d3d31;"></li>
                        <li style="background-color: #9d5848;"></li>
                        <li style="background-color: #c9795e;"></li>
                        <li style="background-color: #d29171;"></li>
                        <li style="background-color: #ddc178;"></li>
                        <li style="background-color: #e5db9e;"></li>
                        <li style="background-color: #f2eee3;"></li>
                     </ul>
                  </dd>
               </dl>
            </div>
         </form>
      </div>
      <!-- e::격자 클릭-->
      <!-- s::지점 재 선택 -->
      <div class="modal re-point__select" id = "restart_select_popup" style="display: none;">
         <form action="">
            <div class="modal__header">
               <h3 class="modal__tit">지점 재 선택</h3>
            </div>
            <div class="modal__body text-center py20">
               <p>
                  지점을 재선택할 경우<br>
                  현재 선택된 지점 및 통계정보가<br>        
		초기화 됩니다.
               </p>
               <br>
               <p>
                  지점을 재선택하시겠습니까?<br>
               </p> 
            </div>
            <!-- 2022-12-13 수정 -->
            <!-- <div class="btn__wrap d-flex justify-content-between">
               <button type="button" class="btn btn__cancel" id = "restart_cancel">취소</button>
               <button type="button" class="btn btn__submit" id = "restart_submit">확인</button>
            </div> -->
            <div class="btn__wrap d-flex">
            	<button type="button" class="btn btn_popType3" id = "restart_submit" style="font-size: 13px;">확인</button>
            	<button type="button" class="btn btn_reset" id = "restart_cancel" style="margin: 0 0 5px 5px; font-size: 12px;">취소</button>
            </div>
         </form>
      </div>
      <!-- s::popup  -->
      <div class="modal" id = "radius_standard_yesorno" style="display: none;">
         <form action="">
            <div class="modal__header">
               <h3 class="modal__tit">알림</h3>
            </div>
            <div class="modal__body text-center py20" id = "radius_standard_yesorno">
               <p>
           		선택한 지점으로부터 반경 50m에 도로 정보가 존재하지 않아<br/>주행 시간/거리 기준의 영역 설정은 할 수 없습니다.<br/>
           		반경 기준으로 영역을 생성하시겠습니까?<br/>
               </p>
       
            </div>
            <div class="btn__wrap d-flex justify-content-between">
               <button type="button" class="btn btn__cancel" id = "radius_standard_cancel">취소</button>
               <button type="button" class="btn btn__submit" id = "radius_standard_submit">확인</button>
            </div>
         </form>
      </div>
      
      <!-- s::popup  -->
      <div class="modal" id = "default_yesorno" style="display: none;">
         <form action="">
            <div class="modal__header">
               <h3 class="modal__tit">알림</h3>
            </div>
            <div class="modal__body text-center py20" id = "default_yesorno">
               <p>
           
               </p>
       
            </div>
            <div class="btn__wrap d-flex justify-content-between">
               <button type="button" class="btn btn__cancel" id = "yesorno_cancel">취소</button>
               <button type="button" class="btn btn__submit" id = "yesorno_submit">확인</button>
            </div>
         </form>
      </div>
      <!-- s::생활권역 통계지도 이용 안내 -->
		<div class="map-info" id = "catchmentArea_map_use_info"style = "display : none;">
		   <div class="map-info__header">
		      <h3>생활권역 통계지도 이용 안내</h3>
		      <a href="#n" class="btn__cancel"><img src="${ctx }/resources/m2021/images/i_close.png" alt="닫기"></a>
		   </div>
		   <div class="map-info__body">
		      <ul class="map-info__list">
		         <a href = "#tag_1"><li>이용 프로세스</li></a>
		         <a href = '#tag_2'><li>제공하는 통계정보의 범위</li></a>
		         <a href = '#tag_3'><li>격자 기반 통계정보 제공 기준</li></a>
		      </ul>
		      <div class="map-info__con">
		         <a name = 'tag_1'><h4>이용 프로세스</h4></a>
		         <p>
			     생활권역 통계지도는 특정 시설(지점)으로 부터 행정구역 경계와
			     상관없이 주행시간, 주행거리, 반경을 기준으로 조회할 영역을
			     설정하면 그 범위 내에 있는 통계자료, 격자 분포 등을 볼 수 있습니다.
		         </p>
		         <ul class="map-info__box">
		            <li>
		               <h5>1. 지점 선택</h5>
		               <p>검색 또는 지도에서 지점을 선택, <br>시설유형으로 지점을 선택</p>
		            </li>
		            <li>
		               <h5>2. 생활권역 설정(영역 설정)</h5>
		               <p>선택한 지점을 기점으로 정보를 조회할 영역에 대해<br>주행시간, 주행거리, 반경 중에서 조건을 선택한 후<br>영역 설정 </p>
		            </li>
		            <li>
		               <h5>3. 통계정보 보기</h5>
		               <p>설정한 영역의 통계자료, 격자 분포 지도 등을<br>조회·확인</p>
		            </li>
		         </ul>
		         <span class = 'txt-green'><b class="color-red">*</b>격자 : 국토를 행정구역과 관계없이 직각으로 교차하는 가로x세로선으로 구분</span>
		      </div>
		      <div class="map-info__con">
		         <a name = 'tag_2'><h4>제공하는 통계정보의 범위</h4></a>
		         <p>
		                           생활권역 통계지도는 통계청에서 실시한 ‘인구주택총조사’및‘전국사업체조사’ 자료 중 위치정보를 파악할 수 있는 자료를 대상으로 하여 좌표와 특성을 부여하여 집계한 값으로 제공합니다. <br>
		                           따라서 위치정보를 알 수 없는 일부 자료(국가보안시설, 개인택시운송업 등)는 포함되지 않으므로 설정하신 영역에 대한 대략적인 통계자료와 격자 분포를 파악하기 위한 용도로만 활용하시길 바랍니다.
		         </p>
		      </div>
		      <div class="map-info__con">
		         <a name = 'tag_3'><h4>격자 단위 통계정보 제공 기준</h4></a>
		         <ol>
		            <li>
		               <p>조회한 생활권역(영역)에 포함되는 격자를 기준으로 통계정보를 제공합니다. 
		               	  <br>기초자료를 기반으로 비밀 보호 기법(BSCA)를 적용하여 값을 계산하므로 화면에 표출된 격자 값의 합계가 총합계와 차이가 있을 수 있습니다.
		               </p>
		            </li>
		            <li>
		               <p>생활권역 통계지도에서 제공하는 값은 실제 값과 차이가 있을 수 있으며, 아래와 같은 방식으로 제공됩니다.</p>
		               <p>① 인구/가구/주택</p>
		               <table>
		                  <colgroup>
		                     <col style="width: 40%;">
		                     <col style="width: 60%;">
		                  </colgroup>
		                  <thead>
		                     <tr>
		                        <th>제공 값</th>
		                        <th>실제 값</th>
		                     </tr>
		                     <tr>
		                        <td>0</td>
		                        <td>0, 1, 2, 3, 4 중 하나</td>
		                     </tr>
		                     <tr>
		                        <td>5</td>
		                        <td>1, 2, 3, 4, 5 중 하나</td>
		                     </tr>
		                     <tr>
		                        <td>6 이상의 값 M</td>
		                        <td>
		                           M-2 ~ M+2 중 하나<br>
		                           (일부 자료 M-7 ~ M+7) <b class="color-red">*</b>
		                        </td>
		                     </tr>
		                  </thead>
		               </table>
		               <span class = 'txt-green'>-  예. ‘생활권역 통계지도’의 인구수 200은 실제 값 198~202 중 하나</span>
		               <p class="mt-10px">② 사업체/종사자</p>
		               <table>
		                  <colgroup>
		                     <col style="width: 40%;">
		                     <col style="width: 60%;">
		                  </colgroup>
		                  <thead>
		                     <tr>
		                        <th>제공 값</th>
		                        <th>실제 값</th>
		                     </tr>
		                     <tr>
		                        <td>0</td>
		                        <td>0, 1, 2 중 하나</td>
		                     </tr>
		                     <tr>
		                        <td>3</td>
		                        <td>1, 2, 3 중 하나</td>
		                     </tr>
		                     <tr>
		                        <td>4 이상의 값 N</td>
		                        <td>
		                           N-1, N, N+1 중 하나<br>
		                           (일부 자료 N-4 ~ N+4)  <b class="color-red">*</b>
		                        </td>
		                     </tr>
		                  </thead>
		               </table>
		               <span class = 'txt-green'>-  예. ‘생활권역 통계지도’의 사업체 수 200은 실제 값 199~201 중 하나</span>
		            </li>
		            <li>
		            	<span>해당 값을 통하여 작은 단위의 통계정보를 파악할 수 있다고 판단하여 자료처리 과정을 추가한 경우이며, 실제 값과 차이가 더욱 벌어질 수 있으나 이는 정보보호를위하여 필수적으로 필요한 과정입니다.</span>
		            </li>
		         </ol>
		         <s></s>
		      </div>
		   </div>
		</div>
		<!-- e::생활권역 통계지도 이용 안내 -->
		
		<!-- s::검색 -->
		<div class="map-info-search" id = "catchmentArea_search_div"style = "display : none;">
		   <div class="map-info__header">
		      <h3>검색</h3>
		      <a href="#n" id="area_search_cancel"><img src="${ctx }/resources/m2021/images/i_close.png" alt="닫기"></a>
		   </div>
		   <div class="map-info__body">
		       <p> 현재 지도 위치의 시군구 내에서 검색됩니다.<br> </p>                                 
               <p> 시설명 또는 도로명 주소를 입력해 주십시오. </p>
               <div class="life-industry__select__search margin_top_5px" id = "map_search_div">
              	   <input type="text" class="form-input" id = "search_text" placeholder="검색어 입력(예. 통계청 또는 청사로 189)" title="검색어를 입력해주세요" maxlength="25">
               	   <button type="button" id = "searchwordBtn_2">검색</button>
               </div>
               	<p class="notice_search" id = "search_notice" style = "display : none"><img src="${ctx }/resources/m2021/images/i_notice--red.png" alt="검색어를 입력해 주십시오."> 검색어를 입력해 주십시오.</p>
		   </div>
		</div>
		<!-- e::검색 -->
   <!-- end::MODAL -->
  
</body>
</html>