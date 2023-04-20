<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/m2020/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>통계주제도</title>
<meta name="title" content="통계주제도">
<script src="${ctx }/resources/m2020/js/thematic/thematicN.js"></script>

<link rel="stylesheet" href="${ctx }/resources/m2020/plugins/swiper.css" />
<link rel="stylesheet" href="${ctx }/resources/m2020/css/subpage.css" />

<script src="${ctx }/resources/m2020/plugins/swiper.min.js" type="text/javascript"></script>
<!-- 하단 리스트 위 아래 Swipe 이벤트 -->
<script src="${ctx }/resources/m2020/plugins/jquery.touchSwipe.min.js" type="text/javascript"></script>
<script src="${ctx }/resources/m2020/js/jquery.touchFlow.js" type="text/javascript"></script>
<script src="${ctx }/resources/m2020/js/subpage.js"	type="text/javascript"></script>


<script src="${ctx }/resources/m2020/js/thematic/singleMap.js"></script>
<script src="${ctx }/resources/m2020/js/thematic/partitionMap.js"></script>

<script>
var selItem = '<c:out value="${selItem}"/>';
var category = '<c:out value="${category}"/>';
var id = '<c:out value="${id}"/>';
var menuIndex = '<c:out value="${menuIndex}"/>';
</script>

</head>
<body>
	<!-- 2020.09.08[한광희] 통계주제도 화면 재구성 START -->
	<div class="MapArea">
		<div class="Map" style="overflow: hidden; position: fixed; top: 60px; width: 100%; height:100%; !important;">
			<!-- 2020.09.09 [신예리] 현재위치 및 맵 버튼 위치 변경 START -->
			<div class="resultWrap" style="z-index: 1100;">
				<!-- 내 위치 버튼 START -->
				<div class="currenPositionWrap">
					<div class="currenPosition" id="dataWrap" style="bottom: 0;">
<!-- 						<span id="thematicMapMyLocation_name">선택된 메뉴 표기</span> -->
						<!-- 관심지역 설정 버튼 -->
<!-- 						<button id="selectArea" class="databtn04" title="관심지역 설정 버튼"></button> --> <!-- 2020.09.11[신예리] 웹접근성 문제로 인한 text추가 -->						
						<div class="locationboxwrap">
							<span class="selectAreaIcon">
								<svg width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M13.125 6.25C13.125 10.625 7.5 14.375 7.5 14.375C7.5 14.375 1.875 10.625 1.875 6.25C1.875 4.75816 2.46763 3.32742 3.52252 2.27252C4.57742 1.21763 6.00816 0.625 7.5 0.625C8.99184 0.625 10.4226 1.21763 11.4775 2.27252C12.5324 3.32742 13.125 4.75816 13.125 6.25Z" stroke="#4F4F4F" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M7.5 8.125C8.53553 8.125 9.375 7.28553 9.375 6.25C9.375 5.21447 8.53553 4.375 7.5 4.375C6.46447 4.375 5.625 5.21447 5.625 6.25C5.625 7.28553 6.46447 8.125 7.5 8.125Z" stroke="#4F4F4F" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>						
							</span>
							<span id="thematicMapMyLocation_name" class="selectArea">전국</span>
						</div>
						<button id="myMapLocation" class="btn_goPostion" type="button">
							<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M8.49918 14.1727C11.6323 14.1727 14.1722 11.6328 14.1722 8.49967C14.1722 5.36655 11.6323 2.82666 8.49918 2.82666C5.36607 2.82666 2.82617 5.36655 2.82617 8.49967C2.82617 11.6328 5.36607 14.1727 8.49918 14.1727Z" fill="white" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M8.4999 10.5667C9.64163 10.5667 10.5672 9.64114 10.5672 8.49941C10.5672 7.35768 9.64163 6.43213 8.4999 6.43213C7.35817 6.43213 6.43262 7.35768 6.43262 8.49941C6.43262 9.64114 7.35817 10.5667 8.4999 10.5667Z" fill="white" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M8.5 2.8269V1" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M2.8269 8.49951H1" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M8.5 14.1729V15.9998" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M14.1729 8.49951H15.9998" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</button>
					</div>
					<div class="databtnWrap">
						<!-- 생활환경 정보 START -->
						<button id="lifeEnvironmentToggle" class="btn_infoView infoOff" title="생활환경종합 팝업 열기 버튼">
							<svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M13.2237 1.15562C11.7734 0.509204 10.1741 2.01021 9.17043 3.20443C8.16124 2.01021 6.56198 0.509204 5.11713 1.15562C3.23661 1.99377 2.32669 4.36031 3.0822 6.44199C3.83772 8.52366 9.14838 12.2761 9.14838 12.2761C9.14838 12.2761 14.4756 8.52366 15.2146 6.44199C15.9535 4.36031 15.1208 1.99377 13.2237 1.15562Z" stroke="#222222" stroke-linejoin="round"/>
								<path d="M0 7.58142H7.03676L8.44302 4.93002L9.75552 9.2851L11.7408 3.98779L12.7004 7.58142H18" fill="white"/>
								<path d="M0 7.58142H7.03676L8.44301 4.93002L9.75551 9.2851L11.7408 3.98779L12.7004 7.58142H18" stroke="#222222" stroke-linejoin="round"/>
							</svg><br />종합
							
						</button> <!-- 2020.09.11[신예리] 웹접근성 문제로 인한 text 추가 -->
						<!-- 2020.09.11[신예리] 웹접근성 문제로 인한 text추가 START-->
						<!-- 년도 및 통계 선택 -->
						<button id="yearStatSelectInfoBtn" class="MapsettingBtn" title="년도 및 통계 선택 버튼">
							<svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M13.6568 15.2588C12.9162 15.2588 12.3135 14.6785 12.3135 13.9655H13.0347C13.0347 14.2958 13.3138 14.5643 13.6568 14.5643C13.9997 14.5643 14.2788 14.2958 14.2788 13.9655C14.2788 13.6356 13.9997 13.3667 13.6568 13.3667H1.34303C1.00019 13.3667 0.721217 13.6356 0.721217 13.9655C0.721217 14.2958 1.00019 14.5643 1.34303 14.5643C1.68587 14.5643 1.965 14.2958 1.965 13.9655H2.68621C2.68621 14.6785 2.08381 15.2588 1.34303 15.2588C0.602398 15.2588 0 14.6785 0 13.9655C0 13.2525 0.602398 12.6726 1.34303 12.6726H13.6568C14.3975 12.6726 15 13.2525 15 13.9655C15 14.6785 14.3975 15.2588 13.6568 15.2588Z" fill="#222222"/>
								<path d="M0.719878 13.9653H0V3.91973C0 3.18422 0.60128 2.58602 1.34054 2.58602H2.84483V3.30203H1.34054C0.998332 3.30203 0.719878 3.57944 0.719878 3.91973V13.9653Z" fill="#222222"/>
								<path d="M15.0001 13.9653H14.2945V3.91973C14.2945 3.57944 14.0215 3.30203 13.686 3.30203H12.1553V2.58602H13.686C14.4106 2.58602 15.0001 3.18422 15.0001 3.91973V13.9653Z" fill="#222222"/>
								<path d="M13.449 10.8623H11.6387V10.0864H13.449V10.8623Z" fill="#222222"/>
								<path d="M13.449 11.8965H11.6387V11.1206H13.449V11.8965Z" fill="#222222"/>
								<path d="M9.96265 6.34283C10.0056 6.29974 10.0426 6.25208 10.0858 6.20671L9.82715 6.46533C9.87126 6.42223 9.91943 6.38593 9.96265 6.34283Z" fill="#222222"/>
								<path d="M5.03639 6.34283C5.08032 6.38593 5.12875 6.42223 5.17268 6.46533L4.91406 6.20671C4.95709 6.25208 4.99336 6.29974 5.03639 6.34283Z" fill="#222222"/>
								<path d="M5.28605 1.6107L5.24077 1.65547C4.04406 2.86537 4.04406 4.8391 5.24358 6.05219L7.50043 8.29291L9.76015 6.04939C10.9568 4.83909 10.9568 2.86537 9.75749 1.65267L9.71409 1.6095C8.49477 0.42079 6.50755 0.420392 5.28605 1.6107ZM7.50043 9.31055L4.72935 6.55901C3.25215 5.06492 3.25215 2.63953 4.72653 1.14865L4.7775 1.09828C6.27894 -0.365824 8.72214 -0.365824 10.2236 1.09828L10.2717 1.14585C11.7486 2.63954 11.7486 5.06492 10.2744 6.55581L7.50043 9.31055Z" fill="#222222"/>
								<path d="M7.19599 5.68945L5.69043 4.20029L6.19037 3.70598L7.19599 4.70005L8.81118 3.10325L9.31112 3.59757L7.19599 5.68945Z" fill="#222222"/>
							</svg><br />선택
						</button>
						<!-- 통계수치on/off -->
						<button id="showNumberBtn" class="databtn01" title="통계수치버튼">
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
						<button id="btnrvTotletop" class="databtn02" style="display: block;" title="범례 버튼">
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
						<!-- 2020.09.11[신예리] 웹접근성 문제로 인한 text추가 END-->
						
						<!-- 년도 및 통계 선택 popup Start -->
						<div id="yearStatSelectInfo" class="MapsettingArea" style="display: none;">
							<div class="MapsettingBox">
								<button class="statsSelectClose" id="yearStatSelectInfo_close" type="button" title="닫기"></button> <!-- 2020.09.11[신예리] 웹접근성 문제로 인한 text 추가 -->
								
								<!-- 210813 코로나 발생현황/예방접종현황 -->
								<div id="change_covid_thema" class="select_wrap02" style="display: none;">
									<span class="labeltitle">통계 주제</span>
									<div class="StatsToggleArea"> 
										<ul id="change_covid_thema_item" style="display: inline-table;">
										</ul>
									</div>
								</div>
								<!-- 210813 코로나 발생현황/예방접종현황 -->
								
								<!-- mng_s 2020. 12. 24 j.h.Seok 통계주제도 통합 -->
								<div id="change_stat_thema" class="select_wrap02" style="display: none;">
									<span class="labeltitle">지표 선택</span>
									<div class="StatsToggleArea"> 
										<ul id="change_stat_thema_item" style="display: inline-table;">
										</ul>
									</div>
								</div>
								<!-- mng_e 2020. 12. 24 j.h.Seok 통계주제도 통합 -->
								
								<div id="yesrSel" class="select_wrap02" style="display: none;">
									<span class="labeltitle">년도 선택</span>
									<select id="base_year"></select>
								</div>
								<!-- 네트워크 주제도 기준시간 -->
								<div id="select_dataType" class="select_wrap02" style="display: none;">
									<span class="labeltitle">기준 시간</span>
									<select id="select_dataType_item">
										<option>5분</option>
										<option>10분</option>
										<option>30분</option>
									</select>
								</div>
								<!-- 네트워크 주제도 기준시간 -->
								
								<!-- 2020.09.15[한광희] 코로나19 추가 START -->
								<div id="yesrSel2" class="select_wrap02" style="display: block;">
									<span class="labeltitle">일별 선택</span>
									<div class="select_wrapDate">
									<select id="base_month">
										<!-- <option>1월</option>
										<option>2월</option>
										<option>3월</option>
										<option>4월</option>
										<option>5월</option>
										<option>6월</option>
										<option>7월</option> -->
									</select>
									<select id="base_day">
										<!-- <option>1일</option>
										<option>2일</option>
										<option>3일</option>
										<option>4일</option>
										<option>5일</option>
										<option>6일</option>
										<option>7일</option> -->
									</select>
									</div>
								</div>
								<div id="yesrSel3" class="select_wrap02" style="display: block;">
									<span class="labeltitle">년도 선택</span>
									<div class="select_wrapDate">
									<select id="base_year2" style="padding-left:1px;">
									</select>
									<select id="base_month2" style="padding-left:1px;">
									</select>
									</div>
								</div>
								<!-- 2020.09.15[한광희] 코로나19 추가 END -->
								<span>통계 선택</span>
								<div class="StatsToggleArea"> 
									<ul id="statsType">
									 	<!-- <li id="stats_right" style="display: block;"><a href="javascript:void(0);">수(가구)</a></li>
										<li id="stats_left" style="display: block;"><a href="javascript:void(0);">증감유(%)</a></li> -->
									</ul>
								</div>
							</div>
						</div>
						
						<!-- 범례 tooltip START --> 
			 			<div class="tooltipbox" style="top: 60px;">
				 			<div class="tooltipbox_row"> 
				 				<button type="button" id="reverseBtn" class="syncBtn"></button>
			 					<div class="color_checkbox" id="color_range">
				 					<ul class="colorck02">
				  						<li style="margin: 0 3px;">
				  							<a class="circle" style="background-color:#f16b41;" href="javascript:void(0)" data-start="#ffd75d" data-end="#cd1103" data-original-start="#ffd75d" data-original-end="#cd1103" data-negative="false"></a>
				 						</li>
									</ul>
					  				<div class="checkbox custom">
								   		<a class="css-checkbox" style="background-color:#f16b41;" href="javascript:void(0)" data-start="#ffd75d" data-end="#cd1103" data-original-start="#ffd75d" data-original-end="#cd1103" data-negative="false"></a></li><li><a class="css-checkbox" style="background-color:#dc476f;" href="javascript:void(0)" data-start="#cccccc" data-end="#7a0021" data-original-start="#cccccc" data-original-end="#7a0021" data-negative="false"></a></li><li><a class="css-checkbox" style="background-color:#539c3f;" href="javascript:void(0)" data-start="#eaf5c0" data-end="#0e4000" data-original-start="#eaf5c0" data-original-end="#0e4000" data-negative="false"></a></li><li><a class="css-checkbox" style="background-color:#598aac;" href="javascript:void(0)" data-start="#cccccc" data-end="#004574" data-original-start="#cccccc" data-original-end="#004574" data-negative="false"></a></li><li><a class="css-checkbox" style="background-color:#7d63ad;" href="javascript:void(0)" data-start="#cccccc" data-end="#230064" data-original-start="#cccccc" data-original-end="#230064" data-negative="false"></a>
									</div>
									<div class="checkbox custom">
								    	<input name="color" id="box1" class="css-checkbox" type="checkbox" onclick="oneCheckcolor(this)" />
								    	<label for="box1" class="css-label-red"></label> 
									</div>
									<div class="checkbox custom">
								    	<input name="color" id="box2" class="css-checkbox" type="checkbox" onclick="oneCheckcolor(this)" />
								    	<label for="box2" class="css-label-yellow"></label> 
									</div>
									<div class="checkbox custom">
								    	<input name="color" id="box3" class="css-checkbox" type="checkbox" onclick="oneCheckcolor(this)" />
								    	<label for="box3" class="css-label-blue"></label> 
									</div>
									<div class="checkbox custom">
								    	<input name="color" id="box4" class="css-checkbox" type="checkbox" onclick="oneCheckcolor(this)" />
								    	<label for="box4" class="css-label-purple"></label> 
									</div>
									<div class="checkbox custom">
								    	<input name="color" id="box5" class="css-checkbox" type="checkbox" onclick="oneCheckcolor(this)" />
								    	<label for="box5" class="css-label-orange"></label> 
									</div>
			 					</div>
				 				<button class="ColorRangeClose" id="dataRemarks_close" type="button" title="닫기"></button> <!-- 2020.09.08[신예리] 범례 닫기 버튼 추가 -->
			 				</div>
				 			<div class="tooltipbox_row"> 
					 			<div id="color_list" class="color_checkbox">
					 				<div class="color-step step-css-checkbox">
							    		<input name="color-step" id="step01" class="step-css-checkbox" type="checkbox" onclick="oneCheckbox(this)" />
							    		<label for="step01" class="step-css-label"></label> 
									</div>
									<div class="color-step step-css-checkbox">
							    		<input name="color-step" id="step02" class="step-css-checkbox" type="checkbox" onclick="oneCheckbox(this)" />
							    		<label for="step02" class="step-css-label-2step"></label> 
									</div>
									<div class="color-step step-css-checkbox">
							    		<input name="color-step" id="step03" class="step-css-checkbox" type="checkbox" onclick="oneCheckbox(this)" />
							    		<label for="step03" class="step-css-label-3step"></label> 
									</div>
									<div class="color-step step-css-checkbox">
							    		<input name="color-step" id="step04" class="step-css-checkbox" type="checkbox" onclick="oneCheckbox(this)" />
							    		<label for="step04" class="step-css-label-4step"></label> 
									</div>
									<div class="color-step step-css-checkbox">
							    		<input name="color-step" id="step05" class="step-css-checkbox" type="checkbox" onclick="oneCheckbox(this)" />
							    		<label for="step05" class="step-css-label-5step"></label> 
									</div> 
									<div class="color-step step-css-checkbox">
							    		<input name="color-step" id="step06" class="step-css-checkbox" type="checkbox" onclick="oneCheckbox(this)" />
							    		<label for="step06" class="step-css-label-6step"></label> 
									</div>
									<div class="color-step step-css-checkbox">
							    		<input name="color-step" id="step07" class="step-css-checkbox" type="checkbox" onclick="oneCheckbox(this)" />
							    		<label for="step07" class="step-css-label-7step"></label> 
									</div>
					 			</div>
					 			<p style="margin-left: 10px;">6,762</p>
				 			</div> 
			 			</div>
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
			<!-- 2020.09.09 [신예리] 현재위치 및 맵 버튼 위치 변경 END -->
			<div id="singleMap" style="height:100%; !important;"></div>
			<div id="leftmap" style="height:44.85%;width: 100%; !important;"></div>	<!-- 2020.09.03[한광희] 통계주제도 분할뷰 수정 -->
			<div id="rightmap" style="height:44.85%;width: 100%; !important;"></div>	<!-- 2020.09.03[한광희] 통계주제도 분할뷰 수정 -->
		</div>
	</div>
	
	<!-- 상단메뉴 START -->
	<div>
 
		<!-- Swiper -->
		<div class="nav-2022">
			<div class="leftCol">
				<span class="btnNavThematic">인구와 가구
					<svg width="12" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z" /></svg>
				</span>
				<span class="maptit04">1인 가구 변화
					<svg width="12" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"/></svg>
				</span>
			</div>
			<!-- <div class="">1인 가구 변호</div> -->
		</div>
		<div class="nav-layer">
			<ul>
				<li id="CTGR_001">인구와 가구</li>
				<li id="CTGR_002">주거와 교통</li>
				<li id="CTGR_003">복지와 문화</li>
				<li id="CTGR_004">노동과 경제</li>
				<li id="CTGR_005">건강과 안전</li>
				<li id="CTGR_006">환경과 기후</li>
				
			</ul>
		</div>
		<!-- <div class="swiper-container">
			<div class="swiper-wrapper">
				2020.09.08[한광희] 띄어쓰기 수정 START
				<div class="swiper-slide Tabbtn on4" id="CTGR_001" >인구와 가구</div>
				<div class="swiper-slide Tabbtn" id="CTGR_002">주거와 교통</div>
				<div class="swiper-slide Tabbtn" id="CTGR_003">복지와 문화</div>
				<div class="swiper-slide Tabbtn" id="CTGR_004">노동과 경제</div>
				<div class="swiper-slide Tabbtn" id="CTGR_005">건강과 안전</div>
				<div class="swiper-slide Tabbtn" id="CTGR_006">환경과 기후</div>
				2020.09.08[한광희] 띄어쓰기 수정 END
			</div>
		</div> -->

		<!-- Initialize Swiper -->
		<script>
		     var swiper = new Swiper('.swiper-container', {
		       slidesPerView: 3.2, 
		       spaceBetween: 10,
		       pagination: {
		         el: '.swiper-pagination',
		         clickable: true,
		       },
		     });
	   	</script>
	</div>
	<!-- 상단메뉴 END -->
	
	
	
	<!-- 통계로 리스트 START-->
	<!-- <div class="Btnarea" id="thematicCatalogBtn" style="position: absolute; bottom: 0;">
			<button type="button" class="swiperBtn close" name="button" title="결과 목록 토글 버튼"/> 2020.09.11 [신예리] 웹접근성 문제로 인한 text 추가 
	</div> -->
	<div id="thematicListDiv" style="display: none; height: 100%; z-index:500; position: absolute; top: 100px;"> <!-- 2020.09.09[신예리] 전체 영역으로 나올 수 있도록 속성 추가 및 수정 -->	
<!-- 		<div class="Btnarea" id="thematicCatalogBtn">
			<button type="button" class="swiperBtn close" name="button" title="결과 목록 토글 버튼"></button>
		</div> -->
		<div class="result_list" id="result_list" style="">	<!-- 2020.09.21[한광희] 목록 width 재 수정 -->
			<div class="tit_top" style="display: flex;">
				<h2 class="tit" id="themaResultTit">통계지리정보</h2>
				<button id="thematic_popup_area_close" class="btn_popClose" type="button"></button>
			</div>
			<form class="search-result">
				<input type="text" id="thematicCatalogKwrd" placeholder="결과 내 재검색" style="-webkit-ime-mode:active; -moz-ime-mode:active; -ms-ime-mode:active; ime-mode:active;" title="결과 내 재검색 영역">	<!-- 2020.09.02[한광희] 한글 우선입력되도록 수정 -->
				<a href="#"><img class="search-icon" src="${ctx }/resources/m2020/images/main/search_rnb.png" id="themeSearchBtn" alt="검색 버튼"></a>
			</form>
			<div class="gridheader">
				<p id="list_cnt">
					119<span>건</span>
				</p>
				<div class="selectbox">
					<label for="ex_select"></label> <select id="selectThematicCatalogSorting">
						<option value="favorite" selected>인기순</option>
						<option value="alphabet">가나다순</option>
					</select>
				</div>
			</div>
			<div class="gridWrap" id="list_div" style="height: 320px"> <!-- 2020.09.09[신예리] 목록 전체 높이 수정 -->				
				<!-- 2020.08.31[한광희] 목록 스크롤 이동을 위한 수정 START -->
				<!-- <div class="searchResultBox" id="searchResultBox"> -->
					<!-- <div id="board_area_1" class="board_area" style="display:block;"></div>
					<div id="board_area_2" class="board_area" style="display:none;"></div>
					<div id="board_area_3" class="board_area" style="display:none;"></div>
					<div id="board_area_4" class="board_area" style="display:none;"></div>
					<div id="board_area_5" class="board_area" style="display:none;"></div>
				</div> --> 
				<!-- 2020.08.31[한광희] 목록 스크롤 이동을 위한 수정 END -->
				<!--searchReslutBox 끝  -->							
			</div>
		</div>
	</div>
	<!-- 통계로 리스트 END-->
	
	<!-- 타이틀 START -->
	<!-- <div class="map_tit" style="margin-top: 0;">
		<span class="maptit04"></span>
	</div> -->
	<!-- 타이틀 END -->
	
	<!-- 생활환경 정보 START -->
	<button id="lifeEnvironmentToggle" class="btn_infoView infoOff" style="z-index: 990" title="생활환경종합 팝업 열기 버튼"></button> <!-- 2020.09.11[신예리] 웹접근성 문제로 인한 text 추가 -->
	<!-- 생활환경 정보 END --> 
	
	<!-- 통계주제도 리스트 Moreinfo popup START -->
	<div id="thematicMap_moreInfo" class="popWrap" style="display: none;">
		<!-- <div class="i_pop pInfo"></div> -->
		<div class="popBox">
			<div class="popHeader">
				<div class="popHeadTitle popTitle"></div>
				<button id="popup_alert_close" class="btn_popClose" type="button" title="닫기"></button>	<!-- 2020.09.02[한광희] id 중복으로 인한 수정 --> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
			</div>
			<div class="popContentBox_help" style="height: 100%;">
				<div class="popContent">
					<p>
						외국인중 한국 국적 취득자, 국제결혼 자녀, 외국인 중 90일<br>
						<br>이상 거주자를 행정구역별로 비교하여 지역별 다문화 현황을<br>
						<br>파악할 수 있는 주제도<br>
						<br>※ 출처 : 지방자치단체외국인주민현황(행정안전부)<br>
						<br>※ 산출식 : 외국인 주민 수
					</p>
				</div>
			</div>
			<div class="popBtnBox_help">
				<button class="btn_popType3" type="button">확인</button>
			</div>
		</div>
	</div>
	<!-- 통계주제도 리스트 Moreinfo popup END -->
	<!-- 2020.09.08[한광희] 통계주제도 화면 재구성 START -->
	
	<!-- 2020.09.14[신예리] 코로나 19 현황팝업 START -->
	<div id="coronaStatsPop" class="popWrap" style="left: calc(50% - 158px); top: 100px; width: 315px; display: none;">
		<div class="i_pop tjop"></div>
		<div class="popBox" style="padding-bottom: 10px;">
			<div style="height:65px; background-color:white; border-top-left-radius:10px; border-top-right-radius:10px;">
				<ul class="popup_tab" style="display:flex;padding-top:15px;">
					<a style="margin-left:10px;"><li class="con1 on" ><span class="ico"></span>코로나 발생현황</li></a>
					<a><li class="con2"><span class="ico"></span>예방접종 현황</li></a>
					<button id="coronaStatsPop_close" class="btn_popClose" type="button" style="padding-top: 1px;position:absolute;right:0px;top:-2px;" title="닫기"></button>
				</ul>
			</div>
			<div class="popHeader">
<!-- 				<span class="popTitle" style="padding-left: 15px;">코로나 바이러스 감염증  - 19 발생현황</span> -->
				<span class="popTitle" id="popTitle1" style="padding-left: 30px;">코로나 바이러스 감염증  - 19 발생현황</span>
				<span class="popTitle" id="popTitle2" style="padding-left: 25px; display:none;">코로나 바이러스 감염증  - 19 예방접종 현황</span>
<!-- 				<button id="coronaStatsPop_close" class="btn_popClose" type="button" style="padding-top: 1px;" title="닫기"></button> -->
			</div>
			<p class="covidInfo" id="today">09.10.00시 기준</p> 
			<p class="covidInfo" id="today2" style="display:none;">09.10.00시 기준</p> 
			<div id="covidConBox1" class="covidConBox">   
					<div class="covidTopStats">
						<div class="covidCol arrowCol">
						<div class="covidRow">
							<img src="${ctx }/resources/m2020/images/covid/icon_11.png"><h1>일일 확진자</h1>
						</div>
						<h2 class="today_covid" id="todaycnt"></h2>
						</div>
						<div class="covidCol">
						<div class="covidRow">
							<img src="${ctx }/resources/m2020/images/covid/icon_12.png"><h1>국내 발생</h1>
						</div>
						<h2 class="today_covidLocal" id="localocccnt"></h2>
						</div>
						<div class="covidCol">
						<div class="covidRow">
							<img src="${ctx }/resources/m2020/images/covid/icon_13.png"><h1>해외 유입</h1>
						</div>
						<h2 class="today_covidLocal" id="overflowcnt"></h2>
						</div>
					</div>
					
					<div class="covidCardWrap">
					<div class="covidRow">
						<div class="covidCard">
							<div class="covidCardTite CColor_bg00">
								<img src="${ctx }/resources/m2020/images/covid/icon_21.png">확진환자
							</div>
							<div class="covidCardCon" id="defcnt">
								<!-- <h4 class="CColor_txt00">21,743</h4>
								<span class="td_up">155 ▲</span> -->
							</div>
						</div>
						<div class="covidCard">
							<div class="covidCardTite CColor_bg01">
									<img src="${ctx }/resources/m2020/images/covid/icon_22.png">완치
							</div>
							<div class="covidCardCon" id="isolclearcnt">
								<!-- <h4 class="CColor_txt01">17,360</h4>
								<span class="td_up">337 ▲</span> -->
							</div>
						</div>
					</div>
					<div class="covidRow">
						<div class="covidCard">
							<div class="covidCardTite CColor_bg02">
								<img src="${ctx }/resources/m2020/images/covid/icon_23.png">치료중
							</div>
							<div class="covidCardCon" id="isolingcnt">
								<!-- <h4 class="CColor_txt02">4,037</h4>
								<span class="td_down">-184 ▼</span> -->
							</div>
						</div>
						<div class="covidCard">
							<div class="covidCardTite CColor_bg03">
									<img src="${ctx }/resources/m2020/images/covid/icon_24.png">사망
							</div>
							<div class="covidCardCon" id="deathcnt">
								<!-- <h4 class="CColor_txt03">17,360</h4>
								<span class="td_up">2 ▲</span> -->
							</div>
						</div>
					</div>  
					</div>
					
				<div class="mt10"> 
					<div class="round">
						<input type="checkbox" id="coronaStatsPop_check" style="margin: 0;">
						<label for="coronaStatsPop_check"></label>
						<span>1일간 이 창을 더 이상 열지 않음</span>
					</div> 
				</div>
			</div>
			<div id="covidConBox2" class="covidConBox" style="display:none;">
				<div class="covidTopStats" style="height: 315px;">
 					<div class='popup_cont on' >                                                                                    
		               	<div class='vaccination_status style01'>                              
		               		<div class='tit'>1차 접종</div>                                                                     
		               		<div class='result'>                                                                        
	         						<div class='equals sign_ico'>	
           							<img src='${ctx }/resources/m2020/images/covid/equals_ico.png' alt=''>	
           						</div>		
           						<div class='plus sign_ico'>		
           							<img src='${ctx }/resources/m2020/images/covid/plus_ico.png' alt=''>		
           						</div>		
		               			<div class='item style01'>                                                                     
		               				<h5><img src='${ctx }/resources/m2020/images/covid/result_icon01.png' alt=''>1회차<br />당일 누적</h5>                                                        
		               				<p class='num' id="num1"></p>                                                       
		              			</div>                                                                                         
		               			<div class='item style02'>                                                                     
		               				<h5><img src='${ctx }/resources/m2020/images/covid/result_icon02.png' alt=''>1회차<br />당일 신규</h5>                                                        
		               				<p class='num'' id="num2"></p>                                                       
		              			</div>                                                                                         
		               			<div class='item style03'>                                                                     
		               				<h5><img src='${ctx }/resources/m2020/images/covid/result_icon03.png' alt=''>1회차<br />전일 누적</h5>                                                        
		               				<p class='num'' id="num3"></p>                                                        
		              			</div>                                                                                         
		              		</div>                                                                                             
		              	</div>                                                                                                 
		               	<div class='vaccination_status style01'>                              
		               		<div class='tit'>2차 접종</div>                                                                     
		               		<div class='result'>                                                                        
	         						<div class='equals sign_ico'>	
           							<img src='${ctx }/resources/m2020/images/covid/equals_ico.png' alt=''>	
           						</div>		
           						<div class='plus sign_ico'>		
           							<img src='${ctx }/resources/m2020/images/covid/plus_ico.png' alt=''>		
           						</div>		
		               			<div class='item style01'>                                                                     
		               				<h5><img src='${ctx }/resources/m2020/images/covid/result_icon01.png' alt=''>2회차<br />당일 누적</h5>                                                        
		               				<p class='num' id="num4"></p>                                                       
		              			</div>                                                                                         
		               			<div class='item style02'>                                                                     
		               				<h5><img src='${ctx }/resources/m2020/images/covid/result_icon02.png' alt=''>2회차<br />당일 신규</h5>                                                        
		               				<p class='num'' id="num5"></p>                                                       
		              			</div>                                                                                         
		               			<div class='item style03'>                                                                     
		               				<h5><img src='${ctx }/resources/m2020/images/covid/result_icon03.png' alt=''>2회차<br />전일 누적</h5>                                                        
		               				<p class='num'' id="num6"></p>                                                        
		              			</div>                                                                                         
		              		</div>                                                                                             
		              	</div>                                                                                                 
		               	<div class='vaccination_status style02'>                                                               
		               		<div class='tit'><span class='ico'>3차 접종</div>                                                       
		               		<div class='result'>                                                                               
	         						<div class='equals sign_ico'>	
           							<img src='${ctx }/resources/m2020/images/covid/equals_ico.png' alt=''>	
           						</div>	
           						<div class='plus sign_ico'>			
           							<img src='${ctx }/resources/m2020/images/covid/plus_ico.png' alt=''>		
           						</div>		
		               			<div class='item style01'>                                                                     
		               				<h5><img src='${ctx }/resources/m2020/images/covid/result_icon04.png' alt=''>3회차<br />당일 누적</h5>                                                       
		               				<p class='num'' id="num7"></p>                                                       
		              			</div>                                                                                         
		               			<div class='item style02'>                                                                     
		               				<h5><img src='${ctx }/resources/m2020/images/covid/result_icon05.png' alt=''>3회차<br />당일 신규</h5>                                                       
		               				<p class='num'' id="num8"></p>                                                       
		              			</div>                                                                                         
		               			<div class='item style03'>                                                                     
		               				<h5><img src='${ctx }/resources/m2020/images/covid/result_icon06.png' alt=''>3회차<br />전일 누적</h5>                                                       
		               				<p class='num'' id="num9"></p>                                                        
		              			</div>                                                                                         
		              		</div>                                                                                             
		              	</div>                                                                                                 
					</div>
		        </div>                                                                                                  
				<div class="mt10"> 
					<div class="round">
						<input type="checkbox" id="coronaStatsPop_check" style="margin: 0;">
						<label for="coronaStatsPop_check"></label>
						<span>1일간 이 창을 더 이상 열지 않음</span>
					</div> 
				</div> 
			</div> 
		</div>
	</div>
	<!-- 2020.09.14[신예리] 코로나 19 현황팝업 END -->
</body>
</html>