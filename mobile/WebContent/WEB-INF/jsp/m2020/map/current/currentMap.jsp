<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>내 주변 통계</title>
<meta name="title" content="내 주변 통계">
<link rel="stylesheet" href="${ctx }/resources/m2020/css/subpage.css" />
<link rel="stylesheet" href="${ctx }/resources/m2020/plugins/swiper.css" />
<!-- kakao api -->
<script src="${ctx }/resources/plugins/kakao_script_api.js"></script>
<script src="${ctx }/resources/m2020/plugins/swiper.min.js"
	type="text/javascript"></script>
<!-- 하단 리스트 위 아래 Swipe 이벤트 -->
<script src="${ctx }/resources/m2020/plugins/jquery.touchSwipe.min.js"
	type="text/javascript"></script>
<!-- bootstrap & bootstrap-multiselect 사용 -->
<script src="${ctx }/resources/m2020/plugins/bootstrap.bundle.min.js"
	type="text/javascript"></script>
<link rel="stylesheet"
	href="${ctx }/resources/m2020/plugins/bootstrap-multiselect.css" />
<script src="${ctx }/resources/m2020/plugins/bootstrap-multiselect.js"
	type="text/javascript"></script>
<!-- 좌우 스크롤 -->
<script src="${ctx }/resources/m2020/js/jquery.touchFlow.js"
	type="text/javascript"></script>
<!-- 페이지 전역변수 -->
<script type="text/javascript">
	var gv_list_gubun = "${params.list_gubun}";
	var gv_sido_cd = "${params.sido_cd}";
	var gv_sgg_cd = "${params.sgg_cd}";
	var gv_todaystatus_pop_yn = "${params.todaystatus_pop_yn}";
	
	// 메인화면 링크관련
	var menuType = '<c:out value="${menuType}"/>';
	var menuIndex = '<c:out value="${menuIndex}"/>';
	var tempId = '<c:out value="${tempId}"/>';	/* 2020.09.02[한광희] 메인화면 내주변주요지표 카드 link 조회 추가 */
	srvLogWrite('O0', '07', '01', '00', '', '');
</script>
<!-- 기본 js -->
<script src="${ctx }/resources/m2020/js/current/current.map.js"></script>
<script src="${ctx }/resources/m2020/js/current/current.api.js"></script>
<script src="${ctx }/resources/m2020/js/current/current.search.js"></script>	
</head>
<body>


	
	<!-- 메뉴 버튼 Swiper START -->
	<div class="nav-2022">
		<div class="leftCol">
			<span class="btnNavThematic">주요지표
				<svg width="12" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z" /></svg>
			</span>
			<span class="maptit03">총인구(명)</span>
		</div>
		<!-- <div class="">안들어감...</div> -->
	</div>
	<div class="nav-layer">
		<ul>
			<li id="API_0301" class="on3">주요지표</li>
			<li id="API_0302">인구</li>
			<li id="API_0305">가구</li>
			<li id="API_0306">주택</li>
			<li id="API_0304">사업체</li>
			<li id="API_0310">농림어가</li>
			
		</ul>
	</div>
	
	<!-- 
	<div class="swiper-container Tabarea mlr16" id="menuListToggle">
		<div class="swiper-wrapper Tab-wrapper" id="itemArea">
			<div class="swiper-slide Tabbtn on3" id="API_0301">
				<a href="#">주요지표</a>
			</div>
			<div class="swiper-slide Tabbtn" id="API_0302">
				<a href="#">인구</a>
			</div>
			<div class="swiper-slide Tabbtn" id="API_0305">
				<a href="#">가구</a>
			</div>
			<div class="swiper-slide Tabbtn" id="API_0306">
				<a href="#">주택</a>
			</div>
			<div class="swiper-slide Tabbtn" id="API_0304">
				<a href="#">사업체</a>
			</div>
			<div class="swiper-slide Tabbtn" id="API_0310">
				<a href="#">농림어가</a>
			</div>
		</div>

	</div> -->
	
	<div id="mapContent">
		<!-- 지도 영역 START -->
		<div class="MapArea">
			<div class="Map"
				style="overflow: hidden; position: fixed; top: 101px; width: 100%;">
				<div id="map"></div>
			</div>
		</div>
		<!-- 지도 영역 END -->
		<!-- Initialize Swiper -->
		<script>
			
		</script>
	
		<!-- 메뉴 버튼 Swiper END -->
		<!-- <div class="map_tit">
			<span class="maptit03">총인구(명)</span>
			<button id="" class="btn_Setting" type="button"></button>
		</div> -->
	
		
	
		<div class="resultWrap">
	
			<!-- 내주변통계 리스트 START-->
			<div class="resultWrap">
				<div class="currenPositionWrap">
					<div class="currenPosition" style="bottom:10px;">
						<div class="locationboxwrap">
							<span class="selectAreaIcon">
								<svg width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M13.125 6.25C13.125 10.625 7.5 14.375 7.5 14.375C7.5 14.375 1.875 10.625 1.875 6.25C1.875 4.75816 2.46763 3.32742 3.52252 2.27252C4.57742 1.21763 6.00816 0.625 7.5 0.625C8.99184 0.625 10.4226 1.21763 11.4775 2.27252C12.5324 3.32742 13.125 4.75816 13.125 6.25Z" stroke="#4F4F4F" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M7.5 8.125C8.53553 8.125 9.375 7.28553 9.375 6.25C9.375 5.21447 8.53553 4.375 7.5 4.375C6.46447 4.375 5.625 5.21447 5.625 6.25C5.625 7.28553 6.46447 8.125 7.5 8.125Z" stroke="#4F4F4F" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>						
							</span>
							<span id="currentMapMyLocation_name" class="selectArea">전국</span>
						</div>
						<button id="currentMapMyLocation" class="btn_goPostion" type="button">
							<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M8.49918 14.1727C11.6323 14.1727 14.1722 11.6328 14.1722 8.49967C14.1722 5.36655 11.6323 2.82666 8.49918 2.82666C5.36607 2.82666 2.82617 5.36655 2.82617 8.49967C2.82617 11.6328 5.36607 14.1727 8.49918 14.1727Z" fill="white" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M8.4999 10.5667C9.64163 10.5667 10.5672 9.64114 10.5672 8.49941C10.5672 7.35768 9.64163 6.43213 8.4999 6.43213C7.35817 6.43213 6.43262 7.35768 6.43262 8.49941C6.43262 9.64114 7.35817 10.5667 8.4999 10.5667Z" fill="white" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M8.5 2.8269V1" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M2.8269 8.49951H1" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M8.5 14.1729V15.9998" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M14.1729 8.49951H15.9998" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>					
						</button>
						<!-- 관심지역 설정 버튼 --> 
						<!-- <button id="selectArea" class="databtn04" title="관심지역 설정 버튼">관심지역 설정 버튼</button> --> <!-- 2020.09.11[신예리] 웹접근성 문제로 인한 text 추가 -->
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
						<!-- 생활환경 정보 END -->
						<!-- 2020.09.11[신예리] 웹접근성 문제로 인한 text추가 START -->
						<button type="button" name="button" class="dataPoiBtn" id="poiCall" title="관심지점(poi)버튼">
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
							</svg><br />관심
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
						<button id="legendInfoBtn" class="databtn02" title="범례 버튼">
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
						<!-- 2020.09.11[신예리] 웹접근성 문제로 인한 text추가 END -->
						
						<!-- 범례 tooltip START --> 
						<div class="tooltipbox" style="top: 60px; right: 45px;">
							<div class="tooltipbox_row">
								<button type="button" class="syncBtn" id="reverseBtn"></button>
								<div class="color_checkbox" id="color_range">
									<!-- 색상선택 영역 -->
								</div>
								<button class="ColorRangeClose" id="dataRemarks_close" type="button" title="닫기">닫기</button> <!-- 2020.09.11[신예리] 범례 닫기 버튼 추가 -->
							</div>
							<div class="tooltipbox_row"> 
								<div id="color_list" class="color_checkbox">
									<!-- 색상 범위 영역 -->
								</div>
								<p style="margin-left: 10px;"></p>
							</div> 
						</div>
						<!-- 범례 tooltip END -->
					</div>
				</div>
							
			</div>
			
		</div>
		
	    <div id="chart-area" class="currentChartDiv" style="display: none;">	<!-- 2020.09.10[한광희] 내주변통계 화면 최초 진입시 데이터보드 화면 숨김 처리 -->
	    	<!-- 2020.09.09[신예리] 이전 버튼 추가 START -->
		    
		    <!-- <div class="mapBtnWrap" style="margin-bottom: 40px !important;">
				<a href="javascript:$currentMap.ui.closeDashBoard();">지도보기</a>
			</div> -->
			<!-- 2020.09.09[신예리] 이전 버튼 추가 END -->
		    <div class="datatit">
		        <h2>데이터보드</h2>
		        <button class="btn_search4" type="button" style="" onclick="location.href='javascript:$currentMap.ui.closeDashBoard();'">
		        	<svg width="15" height="15" viewBox="0 0 15 15" fill="#000" xmlns="http://www.w3.org/2000/svg">
						<path d="M1 1L13 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
						<path d="M13 1L1 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
					</svg>
		        </button>
		    </div> 
		    <div class="sub_Wrap">
			    <!-- Swiper -->
			    <div class="swiper-container01 gallery-thumbs02" id="currentMap_databoardTit">
			      <div class="swiper-wrapper" style="margin-bottom: 15px; height: 45px;">
			        <div class="swiper-slide tabDataboard02" id="graphT">
			          <p><a href="#">그래프</a></p>
			        </div>
			        <div class="swiper-slide tabDataboard02" id="tableT">
			          <p><a href="#">표</a></p>
			        </div>
			      </div>
			    </div>
			    
			    <div class="swiper-container02 gallery-top" style="min-height: 100%; position: absolute; overflow-y: auto; overflow-x: hidden;" id="currentMap_databoardDiv">	<!-- 2020.09.09[한광희] 데이터보드 스크롤 이동을 위한 id 추가 -->	<!-- 2020.09.25[한광희] 데이터보드 swipe 수정 -->
			      <div class="swiper-wrapper">
			        <div class="swiper-slide Con">
			          <!-- 2020.09.28[한광희] 내주변통계 데이터보드 수정 START -->
			          <div class="conTit mlr16" style="flex-direction: column;">
			            <h5 id="chartTit">총인구(명)</h5>
			            <span id="chartSourceTit" style="margin-left: 16px; font-size: 13px; white-space: pre-line;">[출처:통계청, 인구주택총조사(2020)]</h5><!--mng_s 20211021 이진호, 2021센서스 반영-->
			          </div>
			          <!-- 2020.09.28[한광희] 내주변통계 데이터보드 수정 END -->
			          <div class="conWrap" style="padding-bottom: 0;"> <!-- 2020.09.09[신예리] 스크롤 영역 줄임 -->
			              <p class="subtit" id="chartSelCont"></p>
	            		  <p class="num" id ="chartSelVal"></p>
	            		  <!-- <span id="chartSelUnit"></span> -->	<!-- 2020.09.09[한광희] 차트 수치 수정으로 인한 주석처리 -->
	            		  <div class="chart" id="currentChart"></div>
			          </div>
			          
			        </div>
			        <div class="swiper-slide Con" style="padding-top:0;">	 <!-- 2020.09.09[신예리] 스크롤 영역 줄임 -->
			        	<!-- 2020.09.28[한광희] 내주변통계 데이터보드 수정 START -->
			        	<div class="conTit mlr16" style="flex-direction: column;">
				           <h5 id="boardTit">총인구(명)</h5>
				           <span id="boardSourceTit" style="margin-left: 16px; font-size: 13px; white-space: pre-line;">[출처:통계청, 인구주택총조사(2020)]</span><!--mng_s 20211021 이진호, 2021센서스 반영-->
				        </div>
			            <span id="parentArea" style="color: #777C82; margin-left: 30px; margin-top:10px; width: 100%"></span>
			            <!-- 2020.09.28[한광희] 내주변통계 데이터보드 수정 END -->
				        <div class="conWrap">
			              <div class="tb_wrap" style="margin: 5px auto 0 auto;">	<!-- 2020.09.28[한광희] 내주변통계 데이터보드 수정 -->
			                <div class="tb_box" style="margin-bottom: 85px;"> <!-- 2020.09.09[신예리] 데이터 보드 표 영역 잘리는 부분 수정 -->
			                  <table class="tb" id="currentMapDataBoard_dataTable">
			<!--                   	<caption>데이터보드</caption> -->
			                  	<thead>
				                    <tr class="fixed_top">
				                      <th class="cell1" scope="col">순위</th>
				                      <th class="cell2" scope="col">집계구번호</th>
				                      <th class="cell3" scope="col">인구</th>
				                    </tr>
			                    </thead>
			                    <tbody>
								</tbody>
			                  </table>
			                </div>
			              </div>
			            </div>
			        </div>
			       </div>
			      </div>
			     </div>
		</div>
	</div>

	<%@include file="/WEB-INF/jsp/m2020/map/current/item.jsp" %>

<!-- 2020-09-03 [곽제욱] 팝업 배경 이동 START -->
<div class="helpPopBack" style="display: none;">
	<div class="aside_back"></div>
</div>
<!-- 2020-09-03 [곽제욱] 팝업 배경 이동 END -->
<!-- 2020-09-03 [곽제욱] 도움말 위치 이동 START -->	
<%@include file="/WEB-INF/jsp/m2020/map/current/item/help.jsp" %>
<!-- 2020-09-03 [곽제욱] 도움말 위치 이동 END -->
</body>
</html>