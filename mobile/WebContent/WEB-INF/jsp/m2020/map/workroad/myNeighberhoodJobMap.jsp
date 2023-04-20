<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>내 주변 일자리</title>
<meta name="title" content="일자리 맵">
<style type="text/css">
#myNeighberhoodJobSelectPopup_chart .swiper-button-disabled {
	display: none;
}
</style>
<!-- 하단 리스트 Swiper -->
<link rel="stylesheet" href="${ctx }/resources/m2020/plugins/swiper.css" />
<link rel="stylesheet" href="${ctx }/resources/m2021/css/catchmentArea/navStyle.css" />
<script src="${ctx }/resources/m2020/plugins/swiper.min.js" type="text/javascript"></script>
<!-- 하단 리스트 위 아래 Swipe 이벤트 -->
<script src="${ctx }/resources/m2020/plugins/jquery.touchSwipe.min.js" type="text/javascript"></script>
<!-- bootstrap & bootstrap-multiselect 사용 -->
<script src="${ctx }/resources/m2020/plugins/bootstrap.bundle.min.js" type="text/javascript"></script>
<link rel="stylesheet" href="${ctx }/resources/m2020/plugins/bootstrap-multiselect.css" />
<script src="${ctx }/resources/m2020/plugins/bootstrap-multiselect.js" type="text/javascript"></script>
<!-- 좌우 스크롤 -->
<script src="${ctx }/resources/m2020/js/jquery.touchFlow.js" type="text/javascript"></script>

<!-- 페이지 전역변수 -->
<script type="text/javascript">
	var gv_list_gubun = "${params.list_gubun}";
	var gv_sido_cd = "${params.sido_cd}";
	var gv_sgg_cd = "${params.sgg_cd}";
	var gv_todaystatus_pop_yn = "${params.todaystatus_pop_yn}";
</script>
<!-- 기본 js -->
<script src="${ctx }/resources/m2020/js/workroad/myNeighberhoodJobMap.js"></script>
</head>
<body>
	<!-- 지도 영역 START -->
	<div class="MapArea">
		<!-- <div class="Map" style="overflow: hidden; position: fixed; top: 100px; width: 100%; height:calc(100vh - 280px);"> -->
		<div class="Map" style="overflow: hidden; position: fixed; top: 50px; width: 100%;">	<!-- 2022-12-19 css 수정	-->
			<div id="map"></div>
		</div>
	</div>
	<!-- 지도 영역 END -->

	<!-- 메뉴 버튼 Swiper START -->
	 
	<div class="nav-2022">
		<div class="leftCol">
			<span class="btnNavThematic">내주변일자리
				<svg width="12" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z" /></svg>
			</span>
			<!-- <span class="maptit03">총인구(명)</span> -->
		</div>
		<div class="rightCol">
			<div class="listTitle" id="myNeighberhoodJobListPopup_open">
				<span id="myNeighberhoodJobList2Gubun">내 주변 채용공고</span> 
				<span id="myNeighberhoodJobList2Count" class="rowCount">-</span> 건
			</div>
			<div id="myNeighberhoodJobSearch">상세검색</div>
		</div>
	</div>
	<div class="nav-layer">
		<ul>
			<li class="on3"><a href="${ctx }/m2020/map/workroad/myNeighberhoodJobMap.sgis">내주변일자리</a></li> <!-- 2022-11-24 class 추가  -->
			<li><a href="${ctx }/m2020/map/workroad/todayStatusMap.sgis">오늘의구인현황</a></li>
			<li><a href="${ctx }/m2020/map/workroad/statsAnlsMap.sgis">일자리통계정보</a></li>
			
		</ul>
	</div>
	
	
	<%-- <div class="swiper-container Tabarea mlr16">
		<div class="swiper-wrapper Tab-wrapper">
			<div class="swiper-slide Tabbtn on2">내주변일자리</div>
			<div class="swiper-slide Tabbtn"><a href="${ctx }/m2020/map/workroad/todayStatusMap.sgis">오늘의구인현황</a></div>
			<div class="swiper-slide Tabbtn"><a href="${ctx }/m2020/map/workroad/statsAnlsMap.sgis">일자리통계정보</a></div>
		</div>
	</div> --%>

	<!-- Initialize Swiper -->
	<script>
		var swiper = new Swiper('.swiper-container', {
			slidesPerView : 3.2,
			spaceBetween : 10,
			pagination : {
				el : '.swiper-pagination',
				clickable : true,
			},
		});
		srvLogWrite('O0', '04', '01', '00', '', '');
	</script>
	<!-- 메뉴 버튼 Swiper END -->

	<!-- 생활환경 정보 START -->
	<div id="lifeEnvironmentToggle" class="btn_infoView infoOff"></div>
	<!-- 생활환경 정보 END -->
	
	<!-- 내 주변 일자리 하단 리스트 START -->
	<div class="recruitViewBox" style="height: 400px;">
		<!-- 내 위치 버튼 START -->
		<div class="currenPosition" style="bottom:190px !important;">
			<div class="locationboxwrap">
				<span class="selectAreaIcon">
					<svg width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M13.125 6.25C13.125 10.625 7.5 14.375 7.5 14.375C7.5 14.375 1.875 10.625 1.875 6.25C1.875 4.75816 2.46763 3.32742 3.52252 2.27252C4.57742 1.21763 6.00816 0.625 7.5 0.625C8.99184 0.625 10.4226 1.21763 11.4775 2.27252C12.5324 3.32742 13.125 4.75816 13.125 6.25Z" stroke="#4F4F4F" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M7.5 8.125C8.53553 8.125 9.375 7.28553 9.375 6.25C9.375 5.21447 8.53553 4.375 7.5 4.375C6.46447 4.375 5.625 5.21447 5.625 6.25C5.625 7.28553 6.46447 8.125 7.5 8.125Z" stroke="#4F4F4F" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>						
				</span>
				<span id="myNeighberhoodJobMyLocation_name" class="selectArea">전국</span>
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
		</div>
		<!--2022-10-18 종합 팝업 위치 수정-->
		<div class="currenPosition2" id="dataWrap" style="bottom:190px; position:absolute; right:10px;">
			<!-- 생활환경 정보 START -->
			<button id="lifeEnvironmentToggle" class="btn_infoView infoOff" title="생활환경종합 팝업 열기 버튼">
				<svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M13.2237 1.15562C11.7734 0.509204 10.1741 2.01021 9.17043 3.20443C8.16124 2.01021 6.56198 0.509204 5.11713 1.15562C3.23661 1.99377 2.32669 4.36031 3.0822 6.44199C3.83772 8.52366 9.14838 12.2761 9.14838 12.2761C9.14838 12.2761 14.4756 8.52366 15.2146 6.44199C15.9535 4.36031 15.1208 1.99377 13.2237 1.15562Z" stroke="#222222" stroke-linejoin="round"/>
					<path d="M0 7.58142H7.03676L8.44302 4.93002L9.75552 9.2851L11.7408 3.98779L12.7004 7.58142H18" fill="white"/>
					<path d="M0 7.58142H7.03676L8.44301 4.93002L9.75551 9.2851L11.7408 3.98779L12.7004 7.58142H18" stroke="#222222" stroke-linejoin="round"/>
				</svg><br />종합
			</button>
		</div>
		
		<!-- 내 위치 버튼 END -->
		<!-- <div id="myNeighberhoodJobListPopup_open" class="rvbTitle">
			<span id="myNeighberhoodJobListGubun">내 주변 채용공고</span> 
			<span id="myNeighberhoodJobListCount" class="rowCount">-</span> 건
			<button class="btn_rvTotle" type="button"></button>
		</div> --> 
		<!-- 일자리 찾기 START -->
		<!-- <button class="btn_searchJob" type="button" id="myNeighberhoodJobSearch" style="bottom: 10px;">일자리상세검색</button> -->
		<!-- 일자리 찾기 END -->
		<div class="nav_h_type rvbContent swiper-container" id="myNeighberhoodJobList">
			<ul class="swiper-wrapper"></ul>
			<!-- Add Pagination -->
			<!-- <div class="swiper-pagination"></div> -->
		</div>
	</div>
	<!-- 내 주변 일자리 하단 리스트 END -->

	<!--일자리 찾기 팝업. START -->
	<div id="myNeighberhoodJobSearchPopup" class="searchFormWrap" style="display: none; z-index: 500;"> <!-- 2022-10-20 css 수정 -->
		<div class="sfbTitle">
			<button id="myNeighberhoodJobSearchPopup_close" class="btn_coloseSfb" type="button"></button>
			일자리 상세검색
		</div>
		
		<div class="searchFormBox">
			<div class="sfbContent">
				<ul>
					<li>
						<p class="sfbLabel">희망지역</p>
						<div class="sfbForm">
							<select id="myNeighberhoodJobSearchPopup_sido" style="width: 40%"></select>
							<select id="myNeighberhoodJobSearchPopup_sgg" style="width: calc(60% - 5px);"></select>
						</div>
					</li>
					<li>
						<p class="sfbLabel">
							기업형태 <span id="myNeighberhoodJobSearchPopup_company_type_count"><strong>0</strong>개선택</span>
						</p>
						<div class="sfbForm">
							<select id="myNeighberhoodJobSearchPopup_company_type" multiple="multiple"></select>
						</div>
					</li>
					<li>
						<p class="sfbLabel">
							직종분류 <span id="myNeighberhoodJobSearchPopup_classification_count"><strong>0</strong>개선택</span>
						</p>
						<div class="sfbForm">
							<select id="myNeighberhoodJobSearchPopup_classification" multiple="multiple"></select>
						</div>
					</li>
					<li>
						<p class="sfbLabel">
							급여수준 <span id="myNeighberhoodJobSearchPopup_salaly_count"><strong>0</strong>개선택</span>
						</p>
						<div class="sfbForm">
							<select id="myNeighberhoodJobSearchPopup_salaly" multiple="multiple"></select>
						</div>
					</li>
					<li>
						<p class="sfbLabel">
							고용형태 <span id="myNeighberhoodJobSearchPopup_employment_type_count"><strong>0</strong>개선택</span>
						</p>
						<div class="sfbForm">
							<select id="myNeighberhoodJobSearchPopup_employment_type" multiple="multiple"></select>
						</div>
					</li>
					<li>
						<p class="sfbLabel">
							학력 <span id="myNeighberhoodJobSearchPopup_academic_ability_count"><strong>0</strong>개선택</span>
						</p>
						<div class="sfbForm">
							<select id="myNeighberhoodJobSearchPopup_academic_ability" multiple="multiple"></select>
						</div>
					</li>
					<li>
						<p class="sfbLabel">
							경력 <span id="myNeighberhoodJobSearchPopup_career_count"><strong>0</strong>개선택</span>
						</p>
						<div class="sfbForm sfbSchool">
							<ul id="myNeighberhoodJobSearchPopup_career"></ul>
						</div>
					</li>
					<li>
						<p class="sfbLabel">
							산업분류 <span id="myNeighberhoodJobSearchPopup_industry_classification_count"><strong>0</strong>개선택</span>
						</p>
						<div class="sfbForm">
							<select id="myNeighberhoodJobSearchPopup_industry_classification" multiple="multiple"></select>
						</div>
					</li>
					<li id="myNeighberhoodJobSearchPopup_bottom">&nbsp;</li>
				</ul>
			</div>
		</div>
		<div class="sfbFooter">
			<button id="myNeighberhoodJobSearchPopup_reset" class="btn_reset" type="button"><img src="/resources/m2020/images/sub/redo.png" width="15" alt="" /> 초기화</button>
			<button id="myNeighberhoodJobSearchPopup_search" class="btn_search" type="button">검 색</button>
		</div>
	</div>
	<!--일자리 찾기 팝업. END -->

	<!-- 일자리목록 전체보기 팝업 START  -->
	<div id="myNeighberhoodJobListPopup" style="position: absolute; left: 0; top: 101px; box-sizing:border-box; padding:10px; background-color: #ffffff; height: calc(100% - 101px); width: 100%; overflow: auto; z-index: 900; display: none; border-top:3px solid rgb(17, 43, 72);"> <!-- 2022-10-20,2022-11-04 css 수정 -->
		<div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f4f4f4; padding-bottom:5px;">
			<span style="font-size:1.2rem; font-weight:bold; color:#000; ">내 주변 일자리</span>		
			<button id="myNeighberhoodJobListPopup_close" name="prevPage" class="btn_search00 myNeighberhoodJobListPopup_close" type="button" onclick="">이전</button>
		</div>
		<div class="listTitle">
			<span id="myNeighberhoodJobList2Gubun">내 주변 채용공고</span> 
			<span id="myNeighberhoodJobListCount" class="rowCount">-</span> 건
		</div>
		<div class="listSort">
			<select id="myNeighberhoodJobListSort">
				<option value="DISTANCE">거리순</option>
				<option value="SALARY_DESC">연봉순</option>
				<option value="REG_DT">등록일순</option>
				<option value="CLOS_DT">마감일순</option>
			</select>
			<div class="listType" id="myNeighberhoodJobListPopup_list_type">
				<div style="width: 100%; height: 100%; padding: 11px;">
				<label><input type='radio' name='myNeighberhoodJobListPopup_list_type_radio' style="margin: 0px;" value='list' checked="checked" />요약</label> 
				<label><input type='radio' name='myNeighberhoodJobListPopup_list_type_radio' style="margin: 0px;" value='card' />자세히</label>
				</div>
			</div>
		</div>
		<div class="listWrap" id="myNeighberhoodJobList2">
			<ul>
			</ul>
		</div>  
		<!-- 2020.09.09[신예리] 이전, 검색 버튼 추가 START -->
		<!-- <div class="mapBtnWrap"> 
              <a id="myNeighberhoodJobListPopup_close">지도보기</a>
              <button id="myNeighberhoodJobSearch2" class="btn_searchJob02" type="button"></button>
         </div>  --> <!-- 2020.09.09[신예리] 지도보기 버튼 주석 처리 -->
         <!-- 2020.09.09[신예리] 이전, 검색 버튼 추가 START -->
         <!-- <div class="sfbFooter">
			
			<button id="myNeighberhoodJobSearch2" name="search" class="btn_search" type="button" style="width: 50%;" onclick="">검색</button>
		</div> -->
		<!-- 2020.09.09[신예리] 이전, 검색 버튼 추가 END -->
		
	</div>
	<!-- 일자리목록 전체보기 팝업 END -->

	<!-- 일자리목록 채용공고 상세보기 팝업 START -->
	<div id="myNeighberhoodJobSelectPopup" style="position: absolute; left: 0px; bottom: -300px; background-color: #ffffff; height:calc(100% - 101px); width: 100%; overflow: auto; z-index: 950; display: none; box-sizing:border-box; border-top:3px solid #112B48; padding:10px;"> <!-- 2022-10-20, 2022-11-04 css 수정 -->
		<div class="viewWrap" style="margin-bottom: 45px;"> <!-- 2020.09.09[신예리] 이전 버튼 추가로  -->
			<div class="viewTitle" style="justify-content: center; padding: 0;">
				<div class="nameCompany2" name="corp_nm2" id="myNeighberhoodJobSelectPopup_close"></div>
			</div>
			<div class="detailRecu2" style="height: auto;" name="recru_nm"></div>
			<div class="viewTimeBar2">
				<div name="reg_clos_dt">
					등록마감일 : 19.05.13 - 19.06.23 <span>[D-10]</span>
				</div>
				
			</div>
			<div class="viewContentWrap">
				<!-- <div class="nameBox" style="width: 100%;">
					<div class="nameCompany" name="corp_nm" id="myNeighberhoodJobSelectPopup_close"></div>
				</div>
				 -->
				<div class="ectRecu">
					<div class="career" name="career_acdmcr" style="top: 0px;"></div>
					<div class="location" name="work_addr"></div> 
					<div class="pay" name="salaly"></div>
					<div class="jobType" name="emplym_type"></div> 
				</div>
				<div class="jobInfotitle">구인상세정보</div>
				<table width="100%" border="0">
					<colgroup>
						<col width=30% / style="color: red;">
						<col width=25% />
						<col width=20% />
						<col width=25% />
					</colgroup>
					<tr>
						<th><span class="listspanJsp"></span>대표자명</th>
						<td name="main_nm"></td>
						<th><span class="listspanJsp"></span>근로자수</th>
						<td name="labrr_cnt"></td>
					</tr>
					<tr>
						<th><span class="listspanJsp"></span>자본금</th>
						<td name="cap"></td>
						<th><span class="listspanJsp"></span>연매출액</th>
						<td name="year_sales"></td>
					</tr>
					<tr>
						<th><span class="listspanJsp"></span>업종</th>
						<td colspan="3" name="indust_class"></td>
					</tr>
					<tr>
						<th><span class="listspanJsp"></span>주요사업내용</th>
						<td colspan="3" name="main_biz_content"></td>
					</tr>
				</table>
			</div>
			
			<div class="go_site incruit" name="go_site">
				<a href="javascript:void(0);">상세채용정보확인 &gt;</a>
			</div>
			<div class="graphNav" style="display: none;">
				<ul>
					<li><a href="javascript:void(0);" class="on">종사자규모별 소득현황</a></li>
					<li><a href="javascript:void(0);">해당업종 일자리 추이</a></li>
					<li><a href="javascript:void(0);">업종별 연령별 평균소득 현황</a></li>
					<li><a href="javascript:void(0);">업종별 연령별 중위소득 현황</a></li>
				</ul>
			</div>
			<div class="detailGraph graphNav">
				<div class="swiper-container" id="myNeighberhoodJobSelectPopup_chart"> 
					<ul class="swiper-wrapper" style="width: 345px;">
					<li class="swiper-slide" style="width: 100%;">  
						<div class="graphTabarea">
							<a href="javascript:void(0);" class="on">업종별 연령별 평균소득 현황</a>
							<a href="javascript:void(0);">업종별 연령별 중위소득 현황</a>
						</div>
						<!-- 2020.09.25[한광희] 출처 및 업종 추가 START -->
						<div class="statsAnlsMap_GraopSubTitle2" id="myNeighberhoodJobSelectPopup_chart_1_title"></div>
						<div id="myNeighberhoodJobSelectPopup_chart_1" style="width: 100%; height: 270px;"></div>
						<!-- 2020.09.25[한광희] 출처 및 업종 추가 END -->
					</li>
					<li class="swiper-slide" style="width: 100%;">
						<div class="graphTabarea">
							<a href="javascript:void(0);">업종별 연령별 평균소득 현황</a>
							<a href="javascript:void(0);" class="on">업종별 연령별 중위소득 현황</a>
						</div>
						<!-- 2020.09.25[한광희] 출처 및 업종 추가 START -->
						<div class="statsAnlsMap_GraopSubTitle2" id="myNeighberhoodJobSelectPopup_chart_2_title"></div> 
						<div id="myNeighberhoodJobSelectPopup_chart_2" style="width: 100%; height: 270px;"></div>
						<!-- 2020.09.25[한광희] 출처 및 업종 추가 END -->
					</li>
					</ul> 
					<div class="swiper-button-prev" style="top: 25px; height: 31px; left: -20px; opacity: 1; outline: none; width: 180px; background-image: none; content: none;"></div>
				    <div class="swiper-button-next" style="top: 25px; height: 31px; right: -20px; opacity: 1; outline: none; width: 180px; background-image: none; content: none;"></div>
					<div class="swiper-pagination"></div>
					
				</div> 
			</div> 
			<script type="text/javascript"> 
			
			</script>
		</div>
		<!-- 2020.09.09[신예리] 이전 버튼 추가 START -->
		<!-- <div class="sfbFooter"> 
			<button id="myNeighberhoodJobSelectPopup_close" class="btn_search" type="button" style="width: 100%;" onclick="">이전</button>
		</div> -->
		<!-- 2020.09.09[신예리] 이전 버튼 추가 END -->
	</div>
	<!-- 일자리목록 채용공고 상세보기 팝업 END -->
</body>
</html>