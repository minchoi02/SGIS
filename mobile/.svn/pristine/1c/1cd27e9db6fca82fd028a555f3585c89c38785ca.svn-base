<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>내 주변 일자리</title>
<meta name="title" content="내 주변 일자리">
	<style type="text/css">
		#myNeighberhoodJobSelectPopup_chart .swiper-button-disabled {display:none;}
	</style>
	<!-- 하단 리스트 Swiper -->
	<link rel="stylesheet" href="${ctx }/resources/m2019/plugins/swiper.css" />
	<script src="${ctx }/resources/m2019/plugins/swiper.min.js" type="text/javascript"></script>
	<!-- 하단 리스트 위 아래 Swipe 이벤트 -->
	<script src="${ctx }/resources/m2019/plugins/jquery.touchSwipe.min.js" type="text/javascript"></script>
	<!-- bootstrap & bootstrap-multiselect 사용 -->
	<%-- <link rel="stylesheet" href="${ctx }/resources/m2019/plugins/bootstrap.min.css" /> --%>
	<script src="${ctx }/resources/m2019/plugins/bootstrap.bundle.min.js" type="text/javascript"></script>
	<link rel="stylesheet" href="${ctx }/resources/m2019/plugins/bootstrap-multiselect.css" />
	<script src="${ctx }/resources/m2019/plugins/bootstrap-multiselect.js" type="text/javascript"></script>
	<!-- 좌우 스크롤 -->
	<script src="${ctx }/resources/m2019/js/jquery.touchFlow.js" type="text/javascript"></script>
	<!-- 페이지 전역변수 -->
	<script type="text/javascript">
		var gv_list_gubun = "${params.list_gubun}";
		var gv_sido_cd = "${params.sido_cd}";
		var gv_sgg_cd = "${params.sgg_cd}";
		//2019-09-17 [김남민] (12) 오늘의 전체 일지리현황 팝업 수정. START
		var gv_todaystatus_pop_yn = "${params.todaystatus_pop_yn}";
		//2019-09-17 [김남민] (12) 오늘의 전체 일지리현황 팝업 수정. END
	</script>
	<!-- 기본 js -->
	<script src="${ctx }/resources/m2019/js/workroad/myNeighberhoodJobMap.js"></script>
	<script>
        srvLogWrite('M0','09','01','00','',''); // 내 주변 일자리 메인
	</script>
</head>
<body>
	<!-- 지도 영역 START -->
	<div class="MapArea">
		<div class="Map">
			<div id="map"></div>
		</div>
	</div>
	<!-- 지도 영역 END -->
	
	<!-- 내 위치 버튼 START -->
	<div class="currenPosition">
		<span id="myNeighberhoodJobMyLocation_name"></span>
		<button id="myNeighberhoodJobMyLocation" class="btn_goPostion" type="button">현재위치로</button>
	</div>
	<!-- 내 위치 버튼 END -->
	
	<!-- 생활환경 정보 START -->
	<div id="myNeighberhoodJobLifeEnvironmentToggle" class="btn_infoView infoOff">생활환경종합</div>
	<div id="myNeighberhoodJobLifeEnvironment" class="infoBox" style="z-index:1110; display:none;">
		<ul>
			<li><span class="infoIcon info1"></span>녹지비율<span name="myNeighberhoodJobLifeEnvironmentInfo1" class="infoStaus"></span></li>
			<li><span class="infoIcon info2"></span>공동주택비율<span name="myNeighberhoodJobLifeEnvironmentInfo2" class="infoStaus"></span></li>
			<li><span class="infoIcon info3"></span>청장년 인구비율<span name="myNeighberhoodJobLifeEnvironmentInfo3" class="infoStaus"></span></li>
			<li><span class="infoIcon info4"></span>교통사고 안전<span name="myNeighberhoodJobLifeEnvironmentInfo4" class="infoStaus"></span></li>
			<li><span class="infoIcon info5"></span>대중교통 이용률<span name="myNeighberhoodJobLifeEnvironmentInfo5" class="infoStaus"></span></li>
			<li><span class="infoIcon info6"></span>고등교육기관수<span name="myNeighberhoodJobLifeEnvironmentInfo6" class="infoStaus"></span></li>
			<li><span class="infoIcon info7"></span>문화시설<span name="myNeighberhoodJobLifeEnvironmentInfo7" class="infoStaus"></span></li>
		</ul>
		<button id="myNeighberhoodJobLifeEnvironmentPopup_open" class="btn_infoMore" sido_cd="" sgg_cd="" emdong_cd="">더보기</button>
	</div>
	<!-- 생활환경 정보 END -->
	
	<!-- 일자리 찾기 START -->
	<!-- 2019-09-30 [김남민] 모바일 > 일자리 맵 > 일자리 찾기 화면 이미지 및 문구 변경. START -->
	<button class="btn_searchJob" type="button" id="myNeighberhoodJobSearch" style="bottom:10px;">상세검색</button>
	<!-- 2019-09-30 [김남민] 모바일 > 일자리 맵 > 일자리 찾기 화면 이미지 및 문구 변경. END -->
	<!-- 일자리 찾기 END -->

	<!-- 내 주변 일자리 하단 리스트 START -->
	<div class="recruitViewBox" style="height: 40px;">
		<div id="myNeighberhoodJobListPopup_open" class="rvbTitle">
			<span id="myNeighberhoodJobListGubun">내 주변 채용공고</span>
			<span id="myNeighberhoodJobListCount" class="rowCount">-</span> 건
			<button class="btn_rvTotle" type="button">전체보기</button>
		</div>
		<div class="nav_h_type rvbContent swiper-container" id="myNeighberhoodJobList">
			<ul class="swiper-wrapper"></ul>
			<!-- Add Pagination -->
			<!-- <div class="swiper-pagination"></div> -->
		</div>
	</div>
	<!-- 내 주변 일자리 하단 리스트 END -->
	
	<!--일자리 찾기 팝업. START -->
	<div id="myNeighberhoodJobSearchPopup" class="searchFormWrap" style="display: none;">
		<div class="sfbTitle">
			<button id="myNeighberhoodJobSearchPopup_close" class="btn_coloseSfb" type="button">닫기</button>
			<!-- 2019-10-01 [김남민] 모바일 > 일자리 찾기 화면 수정. START -->
			일자리 상세검색
			<!-- 2019-10-01 [김남민] 모바일 > 일자리 찾기 화면 수정. END -->
		</div>
		<div class="sfbFooter">
			<button id="myNeighberhoodJobSearchPopup_reset" class="btn_reset" type="button">초기화</button>
			<button id="myNeighberhoodJobSearchPopup_search" class="btn_search" type="button">검색하기</button>
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
						<!-- <div class="sfbForm">
							<select id="myNeighberhoodJobSearchPopup_wage_type" style="width: 40%;">
								<option>일급</option>
							</select>
							<input id="myNeighberhoodJobSearchPopup_wage_type_name" type="text" style="color: #12aae1; width: calc(60% - 20px); text-align: right;" value="10만원이상" readonly="readonly">
						</div>
						<div class="sfbForm">
							<input id="myNeighberhoodJobSearchPopup_salaly" type="range" min="100" max="500" step="5" value="0" style="margin: 20px 0; width: 100%; height: 8px; background-color: #12aae1; border-radius: 4px;">
						</div> -->
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
	</div>
	<!--일자리 찾기 팝업. END -->
	
	<!--오늘의 전체 일자리현황 팝업. START -->
	<div id="myNeighberhoodJobTodayStatusPopup" class="popWrap" style="left: calc(50% - 150px); top: 100px; width: 300px; display: none;">
		<div class="i_pop tjop"></div>
		<!--2019-09-17 [김남민] (12) 오늘의 전체 일지리현황 팝업 수정. START -->
		<div class="popBox" style="padding-bottom: 10px;">
		<!--2019-09-17 [김남민] (12) 오늘의 전체 일지리현황 팝업 수정. END -->
			<div class="popHeader">
				<!-- 2019.09.30[한광희] 팝업 닫기 문구 추가 START -->
				<div id="myNeighberhoodJobTodayStatusPopup_close">
					<span>닫기</span>
					<button class="btn_popClose" type="button" style="padding-top: 1px;">닫기</button>
				</div>
				<!-- 2019.09.30[한광희] 팝업 닫기 문구 추가 END -->
			</div>
			<div class="popContentBox">
				<!-- 2019-12-26 [김남민] 모바일 > 일자리 맵 > 모바일 홈페이지 [오늘 하루 다시 보지 않기] 추가 START -->
				<div>
					<p class="tjTitle" style="text-align: right; padding-right: 15px; padding-top: 20px;">
						<input type="checkbox" id="myNeighberhoodJobTodayStatusPopup_check" style="margin: 0;">
    					<label for="myNeighberhoodJobTodayStatusPopup_check">오늘 하루 다시 보지 않기</label>
					</p>
				</div>
				<div class="popTitle" style="padding: 10px 0 0 0;">오늘의 <span id="myNeighberhoodJobTodayStatusPopup_adm_nm">전체</span> 일자리현황</div>
				<!-- 2019-12-26 [김남민] 모바일 > 일자리 맵 > 모바일 홈페이지 [오늘 하루 다시 보지 않기] 추가 END -->
				<div class="popContent">
					<p class="tjTitle" style="text-align: right; padding-right: 15px;">자료출처 : 워크넷&인쿠르트&사람인</p> <!-- 2020-05-08 [곽제욱] 사람인 추가 -->
					<p class="tjTitle" style="text-align: right; padding-right: 15px;" id="myNeighberhoodJobTodayStatusPopup_reg_dt">(0월 00일 기준)</p>
					<!-- <p class="tjTitle" style="text-align: right; padding-right: 15px;">자료출처 : 워크넷&인쿠르트 (0월 00일 기준)</p> -->
					<ul class="todayJobWrap" style="margin-top: 0px;">
						<li class="tjCom">
							<p class="tjTitle">구인업체</p>
							<p name="all_corp_cnt" class="tjTotalNum comColor">-</p>
							<p class="tjChange">
								<span name="all_corp_cnt_c_rate">- 0%</span> 전일대비
							</p>
							<p class="tjNum">
								신규 <span name="new_corp_cnt" class="comColor">-</span>
							</p>
							<p class="tjNum">
								마감 <span name="clos_corp_cnt" class="comColor">-</span>
							</p>
						</li>
						<li class="tjJobseeker">
							<p class="tjTitle">구인자수</p>
							<p name="all_rcrit_psn_cnt" class="tjTotalNum jobColor">-</p>
							<p class="tjChange">
								<span name="all_rcrit_psn_cnt_c_rate">- 0%</span> 
							</p>
							<p class="tjNum">
								신규 <span name="new_rcrit_psn_cnt" class="jobColor">-</span>
							</p>
							<p class="tjNum">
								마감 <span name="clos_rcrit_psn_cnt" class="jobColor">-</span>
							</p>
						</li>
					</ul>
				</div>
			</div>
			<!--2019-09-17 [김남민] (12) 오늘의 전체 일지리현황 팝업 수정. START -->
			<div class="PopFooter" style="display: none;">
			<!--2019-09-17 [김남민] (12) 오늘의 전체 일지리현황 팝업 수정. END -->
				<button id="myNeighberhoodJobTodayStatusPopup_ok" class="btn_popSubmit" type="button">상세현황보기</button>
			</div>
		</div>
	</div>
	<!-- 오늘의 전체 일자리현황 팝업. END -->
	
	<!-- 일자리목록 전체보기 팝업 START  -->
	<div id="myNeighberhoodJobListPopup" style="position:absolute; left:0; top:0; background-color:#ffffff; height:100%; width:100%; overflow:auto; z-index:1500; display: none;">
		<!-- 2019-09-30 [김남민] 모바일 > 일자리 맵 > 일자리 찾기 화면 이미지 및 문구 변경. START -->
		<button id="myNeighberhoodJobSearch2" class="btn_searchJob" type="button">상세검색</button>
		<!-- 2019-09-30 [김남민] 모바일 > 일자리 맵 > 일자리 찾기 화면 이미지 및 문구 변경. END -->
		<div class="listTitle">
			<span id="myNeighberhoodJobList2Gubun">내 주변 채용공고</span> 
			<span id="myNeighberhoodJobList2Count" class="rowCount">-</span> 건
			<!-- 2019-10-01 [김남민] 모바일 > 채용공고 전체 보기 화면 수정. START -->
			<button id="myNeighberhoodJobListPopup_close" class="btn_viewMap" type="button">닫기</button>
			<!-- 2019-10-01 [김남민] 모바일 > 채용공고 전체 보기 화면 수정. END -->
		</div>
		<div class="listSort">
			<select id="myNeighberhoodJobListSort">
				<option value="DISTANCE">거리순</option>
				<option value="SALARY_DESC">연봉순</option>
				<option value="REG_DT">등록일순</option>
				<option value="CLOS_DT">마감일순</option>
			</select>
			<div class="listType" id="myNeighberhoodJobListPopup_list_type">
				<!-- 2019-10-01 [김남민] 모바일 > 채용공고 전체 보기 화면 수정. START -->
				<!-- <ul>
					<li class="typeList listOn"><a href="javascript:void(0);"><span>목록형보기</span></a></li>
					<li class="typeList cardOff"><a href="javascript:void(0);"><span>카드형보기</span></a></li>
				</ul> -->
				<div style="width: 100%; height: 100%; padding: 11px;">
					<label style="margin-right: 9px;"><input type='radio' name='myNeighberhoodJobListPopup_list_type_radio' style="margin: 0px;" value='list' checked="checked" />요약</label>
					<label><input type='radio' name='myNeighberhoodJobListPopup_list_type_radio' style="margin: 0px;" value='card' />자세히</label>
				</div>
				<!-- 2019-10-01 [김남민] 모바일 > 채용공고 전체 보기 화면 수정. END -->
			</div>
		</div>
		<div class="listWrap" id="myNeighberhoodJobList2">
			<ul>
			</ul>
		</div>
	</div>
	<!-- 일자리목록 전체보기 팝업 END -->
	
	<!-- 일자리목록 채용공고 상세보기 팝업 START -->
	<div id="myNeighberhoodJobSelectPopup" style="position:absolute; left:0; top:0; background-color:#ffffff; height:100%; width:100%; overflow:auto; z-index:1700; display: none;">
		<div class="viewWrap">
			<button id="myNeighberhoodJobSelectPopup_close" class="btn_viewClose" type="button">닫기</button>
			<div class="viewTitle">채용공고 상세정보</div>
			<div class="viewTimeBar">
				<div class="timeLimit" name="reg_clos_dt">
					등록마감일 : 19.05.13 - 19.06.23 <span>[D-10]</span>
				</div>
			</div>
			<div class="viewContentWrap">
				<div class="nameBox" style="width: 100%;">
					<div class="nameCompany" name="corp_nm"></div>
					<div id="myNeighberhoodJobSelectPopup_life_environment" class="btn_infoView2 infoOff" sido_cd="" sgg_cd="" emdong_cd="">생활환경종합</div>
				</div>
				<div class="detailRecu" style="height: auto;" name="recru_nm"></div>
				<div class="ectRecu">
					<!-- 2019-09-17 [김남민] (15) 일자리맵 경력/학력 서브타이틀 추가. START -->
					<div class="career" name="career_acdmcr" style="top:0px;"></div>
					<!-- 2019-09-17 [김남민] (15) 일자리맵 경력/학력 서브타이틀 추가. END -->
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
						<th>대표자명</th>
						<td name="main_nm"></td>
						<th>근로자수</th>
						<td name="labrr_cnt"></td>
					</tr>
					<tr>
						<th>자본금</th>
						<td name="cap"></td>
						<th>연매출액</th>
						<td name="year_sales"></td>
					</tr>
					<tr>
						<th>업종</th>
						<td colspan="3" name="indust_class"></td>
					</tr>
					<tr>
						<th>주요사업내용</th>
						<td colspan="3" name="main_biz_content"></td>
					</tr>
				</table>
			</div>
			<div class="go_site incruit" name="go_site">
				<a href="javascript:void(0);">상세채용정보확인 &gt;</a>
			</div>
			<!--<div class="go_site worknet"><a href="javascript:void(0);">상세채용정보확인 &gt;</a></div> 워크넷정보확인-->
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
					<ul class="swiper-wrapper">
						<li class="swiper-slide" style="width: 100%;">
							<a href="javascript:void(0);" class="on">업종별 연령별 평균소득 현황</a>
							<div id="myNeighberhoodJobSelectPopup_chart_1" style="width: 100%; height: 270px;"></div>	
						</li>
						<li class="swiper-slide" style="width: 100%;">
							<a href="javascript:void(0);" class="on">업종별 연령별 중위소득 현황</a>
							<div id="myNeighberhoodJobSelectPopup_chart_2" style="width: 100%; height: 270px;"></div>
						</li>
						<!-- <li class="swiper-slide" style="width: 100%;">
							<a href="javascript:void(0);" class="on">종사자규모별 소득현황</a>
							<div class="statsGraph"></div>	
						</li>
						<li class="swiper-slide" style="width: 100%;">
							<a href="javascript:void(0);" class="on">해당업종 일자리 추이</a>
							<div class="statsGraph"></div>
						</li>
						<li class="swiper-slide" style="width: 100%;">
							<a href="javascript:void(0);" class="on">업종별 연령별 평균소득 현황</a>
							<div class="statsGraph"></div>
						</li>
						<li class="swiper-slide"style="width: 100%;">
							<a href="javascript:void(0);" class="on">업종별 연령별 중위소득 현황</a>
							<div class="statsGraph"></div>
						</li> -->
					</ul>
				    <div class="swiper-button-prev" style="top: 26px; height: 20px; opacity: 1; outline: none;"></div>
				    <div class="swiper-button-next" style="top: 26px; height: 20px; opacity: 1; outline: none;"></div>
				    
				    <div class="swiper-pagination"></div>
				</div>
				<div class="moreBtn">
 					<!--<button id="myNeighberhoodJobSelectPopup_go_stats_anls_map" class="btn_moreInfo" type="button">관련업종 통계정보 더보기</button> -->
				</div>
			</div>
		</div>
	</div>
	<!-- 일자리목록 채용공고 상세보기 팝업 END -->
	
	<!-- 생활환경 팝업 START -->
	<div id="myNeighberhoodJobLifeEnvironmentPopup" style="position: absolute; right: 0; top: 0; height: 100%; width: 100%; overflow: auto; z-index: 490; background-color: #ffffff; display:none;">
		<div class="Header">
			<header id="headerArea">
				<div class="gnb">
					<button id="myNeighberhoodJobLifeEnvironmentPopup_close" class="btn_forward2" type="button">이전</button>
					<h2><span id="myNeighberhoodJobLifeEnvironmentPopup_title_1"></span> 생활환경<!--  <span id="myNeighberhoodJobLifeEnvironmentPopup_title_2">종합</span> --></h2>
				</div>
			</header>
		</div>
		<div class="Content" style="background-color: #ffffff">
			<div class="contentBox">
				<div class="nav_h_type infoMenuWrap" id="myNeighberhoodJobLifeEnvironmentPopup_list">
					<ul>
						<li style="width: 15px;"></li>
						<li class="infoMenu on" data-index="0"><a href="javascript:void(0);" class="infoMenu0">종합</a></li>
						<li style="width: 10px;"></li>
						<li class="infoMenu" data-index="1"><a href="javascript:void(0);" class="infoMenu1">자연</a></li>
						<li style="width: 10px;"></li>
						<li class="infoMenu" data-index="2"><a href="javascript:void(0);" class="infoMenu2">주택</a></li>
						<li style="width: 10px;"></li>
						<li class="infoMenu" data-index="3"><a href="javascript:void(0);" class="infoMenu3">지역인구</a></li>
						<li style="width: 10px;"></li>
						<li class="infoMenu" data-index="4"><a href="javascript:void(0);" class="infoMenu4">안전</a></li>
						<li style="width: 10px;"></li>
						<li class="infoMenu" data-index="5"><a href="javascript:void(0);" class="infoMenu5">생활편의&nbsp;교통</a></li>
						<li style="width: 10px;"></li>
						<li class="infoMenu" data-index="6"><a href="javascript:void(0);" class="infoMenu6">교육</a></li>
						<li style="width: 10px;"></li>
						<li class="infoMenu" data-index="7"><a href="javascript:void(0);" class="infoMenu7">복지&nbsp;문화</a></li>
						<li style="width: 10px;"></li>
					</ul>
				</div>
				<div id="myNeighberhoodJobLifeEnvironmentPopup_page_0" class="infoPage">
					<div class="infoGraph1" style="text-align: center; padding: 0px;">
						<div id="myNeighberhoodJobLifeEnvironmentPopup_page_0_chart" style="width: 100%;"></div>
					</div>
					<div class="igDataWrap">
						<ul>
							<li style="width: 40%;">
								<div class="igTitle">
									<span class="i_blue"></span>전국평균
								</div>
								<div class="igData i_blue" id="myNeighberhoodJobLifeEnvironmentPopup_page_0_all_avg"></div>
							</li>
							<li style="width: 60%;">
								<div class="igTitle">
									<span class="i_red"></span><span id="myNeighberhoodJobLifeEnvironmentPopup_page_0_this_title" style="width: auto; margin: 0px; height: auto; border-radius: 0px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 69%;"></span>&nbsp;평균
								</div>
								<div class="igData i_red" id="myNeighberhoodJobLifeEnvironmentPopup_page_0_this_avg"></div>
							</li>
						</ul>
					</div>
				</div>
				<div id="myNeighberhoodJobLifeEnvironmentPopup_page_1" class="infoPage infoItemWrap" style="display: none;">
					<ul>
						<li name="HML0001_HMM0001">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse01"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0001_HMM0002">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse02"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0001_HMM0003">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse03"></div>
							<div class="itemStatus"></div>
						</li>
					</ul>
				</div>
				<div id="myNeighberhoodJobLifeEnvironmentPopup_page_2" class="infoPage infoItemWrap" style="display: none;">
					<ul>
						<li name="HML0002_HMM0004">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse04"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0002_HMM0005">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse05"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0002_HMM0006">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse06"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0002_HMM0007">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse07"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0002_HMM0008">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse08"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0002_HMM0035">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse09"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0002_HMM0111">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse10"></div>
							<div class="itemStatus"></div>
						</li>
					</ul>
				</div>
				<div id="myNeighberhoodJobLifeEnvironmentPopup_page_3" class="infoPage infoItemWrap" style="display: none;">
					<ul>
						<li name="HML0003_HMM0009">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse11"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0003_HMM0010">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse12"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0003_HMM0011">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse13"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0003_HMM0012">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse14"></div>
							<div class="itemStatus"></div>
						</li>
					</ul>
				</div>
				<div id="myNeighberhoodJobLifeEnvironmentPopup_page_4" class="infoPage infoItemWrap" style="display: none;">
					<ul>
						<li name="HML0004_HMM0013">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse15"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0004_HMM0014">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse16"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0004_HMM0028">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse17"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0004_HMM0029">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse18"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0004_HMM0031">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse19"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0004_HMM0032">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse20"></div>
							<div class="itemStatus"></div>
						</li>
					</ul>
				</div>
				<div id="myNeighberhoodJobLifeEnvironmentPopup_page_5" class="infoPage infoItemWrap" style="display: none;">
					<ul>
						<li name="HML0005_HMM0015">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse21"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0005_HMM0016">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse22"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0005_HMM0017">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse23"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0005_HMM0018">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse24"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0005_HMM0033">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse25"></div>
							<div class="itemStatus"></div>
						</li>
					</ul>
				</div>
				<div id="myNeighberhoodJobLifeEnvironmentPopup_page_6" class="infoPage infoItemWrap" style="display: none;">
					<ul>
						<li name="HML0006_HMM0020">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse26"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0006_HMM0021">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse27"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0006_HMM0022">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse28"></div>
							<div class="itemStatus"></div>
						</li>
					</ul>
				</div>
				<div id="myNeighberhoodJobLifeEnvironmentPopup_page_7" class="infoPage infoItemWrap" style="display: none;">
					<ul>
						<li name="HML0007_HMM0023">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse29"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0007_HMM0024">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse30"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0007_HMM0025">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse31"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0007_HMM0026">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse32"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0007_HMM0027">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse33"></div>
							<div class="itemStatus"></div>
						</li>
						<li name="HML0007_HMM0034">
							<div class="itemTitle"></div>
							<div class="itemIcon iconHouse34"></div>
							<div class="itemStatus"></div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<!-- 생활환경 팝업 END -->
	
	<!-- 맞춤형서비스 안내 START -->
	<div class="infoMessage" id="myNeighberhoodJobClmserGuidance">
		회원정보를 입력후, 맞춤서비스를 시작하세요.
		<button id="myNeighberhoodJobClmserGuidance_close" class="btn_close" type="button">X</button>
	</div>
	<!-- 맞춤형서비스 안내 END -->
	
	<!-- 맞춤형서비스 등록 팝업 START -->
	<div id="myNeighberhoodJobClmserRegistPopup" style="position: absolute; right: 0; top: 0; height: 100%; width: 100%; overflow: auto; z-index: 2000; display:none;">
		<div class="aside_back"></div>
		<div class="infoSettingWrap">
			<button id="myNeighberhoodJobClmserRegistPopup_close" class="btn_intClost" type="button">닫기</button>
			<div class="infFooter">
				<button id="myNeighberhoodJobClmserRegistPopup_cancel" class="btn_infLeft" type="button">취소</button>
				<button id="myNeighberhoodJobClmserRegistPopup_ok" class="btn_infRight" type="button">등록</button>
				<button id="myNeighberhoodJobClmserRegistPopup_before" class="btn_infLeft" type="button" style="display: none;">이전</button>
				<button id="myNeighberhoodJobClmserRegistPopup_next" class="btn_infRight" type="button" style="display: none;">다음</button>
				<button id="myNeighberhoodJobClmserRegistPopup_start" class="btn_infRight" type="button" style="display: none;">맞춤형서비스 시작하기</button>
			</div>
			<div class="istContent" id="myNeighberhoodJobClmserRegistPopup_page_0">
				<div class="istTitle">
					회원님,<br> 원하시는 구인정보를 등록하여<br> 맞춤서비스를 시작하세요.
				</div>
				<div class="istSubtitle" style="padding-top: 20px; margin-top: 20px; border-top: 1px solid #CCCCCC;">
					초기에 등록하신 정보는 일자리 검색을 통해<br> 언제든 바꾸어 검색이 가능합니다.
				</div>
			</div>
			<div class="istContent" id="myNeighberhoodJobClmserRegistPopup_page_1" style="display:none;">
				<div class="istTitle">원하는 지역을 선택하세요.</div>
				<div class="istSubtitle">희망한 지역을 중심으로 채용공고를 수집합니다.</div>
				<div class="istMapBox" style="background: none; height: 80px; border: none;">
					<div class="istPoint" id="myNeighberhoodJobClmserRegistPopup_my_location" style="border: 1px solid #959595; cursor: pointer;">
						<a href="javascript:void(0);" class="istSet">현위치로 지역설정</a>
					</div>
					<div class="istInput" style="border: none;">
						<select id="myNeighberhoodJobClmserRegistPopup_sido" style="width: calc(50% - 8px); margin-right: 5px; height: 35px; padding-left: 10px; border: 1px solid #959595;"></select>
						<select id="myNeighberhoodJobClmserRegistPopup_sgg" style="width: 50%; height: 35px; padding-left: 10px; border: 1px solid #959595;"></select>
					</div>
				</div>
				<!-- <div class="istMapBox" style="display:none;">
					<div class="istPoint">
						<a href="javascript:void(0);" class="istSet">현위치로 지역설정</a><a href="javascript:void(0);" class="istRefresh"><span>새로고침</span></a>
					</div>
					<div class="istInput">
						<input type="text" value="직접입력">
						<button class="btn_goSearch" type="button">검색</button>
					</div>
					<div class="istResult">대전광역시 서구</div>
				</div> -->
			</div>
			<div class="istContent" id="myNeighberhoodJobClmserRegistPopup_page_2" style="display:none;">
				<div class="istTitle">원하는 기업형태를 선택하세요.</div>
				<div class="istSubtitle">원하는 기업형태를 선택하세요.</div>
				<div class="istDiscrip">다중선택가능</div>
				<div class="istItemBox">
					<div class="istGrad"></div>
					<ul id="myNeighberhoodJobClmserRegistPopup_company_type"></ul>
				</div>
			</div>
			<div class="istContent" id="myNeighberhoodJobClmserRegistPopup_page_3" style="display:none;">
				<div class="istTitle">원하는 직종을 선택하세요.</div>
				<div class="istSubtitle">원하는 직종을 선택하세요.</div>
				<div class="istDiscrip">다중선택가능</div>
				<div class="istItemBox">
					<div class="istGrad"></div>
					<ul id="myNeighberhoodJobClmserRegistPopup_classification"></ul>
				</div>
			</div>
			<div class="istContent" id="myNeighberhoodJobClmserRegistPopup_page_4" style="display:none;">
				<div class="istTitle">원하는 급여수준을 선택하세요.</div>
				<div class="istSubtitle">원하는 급여수준을 선택하세요.</div>
				<div class="istDiscrip">다중선택가능</div>
				<div class="istItemBox">
					<div class="istGrad"></div>
					<ul id="myNeighberhoodJobClmserRegistPopup_salaly"></ul>
				</div>
			</div>
			<div class="istContent" id="myNeighberhoodJobClmserRegistPopup_page_5" style="display:none;">
				<div class="istTitle">원하는 고용형태를 선택하세요.</div>
				<div class="istSubtitle">원하는 고용형태를 선택하세요.</div>
				<div class="istDiscrip">다중선택가능</div>
				<div class="istItemBox">
					<div class="istGrad"></div>
					<ul id="myNeighberhoodJobClmserRegistPopup_employment_type"></ul>
				</div>
			</div>
			<div class="istContent" id="myNeighberhoodJobClmserRegistPopup_page_6" style="display:none;">
				<div class="istTitle">최종 학력을 선택하세요.</div>
				<div class="istSubtitle">최종 학력을 선택하세요.</div>
				<div class="istDiscrip">다중선택가능</div>
				<div class="istItemBox">
					<div class="istGrad"></div>
					<ul id="myNeighberhoodJobClmserRegistPopup_academic_ability"></ul>
				</div>
			</div>
			<div class="istContent" id="myNeighberhoodJobClmserRegistPopup_page_7" style="display:none;">
				<div class="istTitle">원하는 지원경력을 선택하세요.</div>
				<div class="istSubtitle">원하는 지원경력을 선택하세요.</div>
				<div class="istDiscrip">다중선택가능</div>
				<div class="istItemBox">
					<div class="istGrad"></div>
					<ul id="myNeighberhoodJobClmserRegistPopup_career"></ul>
				</div>
			</div>
			<div class="istContent" id="myNeighberhoodJobClmserRegistPopup_page_8" style="display:none;">
				<div class="istTitle">원하는 업종을 선택하세요.</div>
				<div class="istSubtitle">원하는 업종을 선택하세요.</div>
				<div class="istDiscrip">다중선택가능</div>
				<div class="istItemBox">
					<div class="istGrad"></div>
					<ul id="myNeighberhoodJobClmserRegistPopup_industry_classification"></ul>
				</div>
			</div>
			<div class="istContent" id="myNeighberhoodJobClmserRegistPopup_page_9" style="display:none;">
				<div class="istTitle">
					설정한 항목이 맞나요?<br> 이제 회원님에게 맞춤형 채용공고<br> 서비스를 시작할게요.
				</div>
				<div class="istItemBox" style="border: none;">
					<div class="istGrad"></div>
					<ul style="height: 200px;">
						<li style="width: 100%;">
							<div class="istCheTitle">1.희망지역</div>
							<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_location_text"></div>
						</li>
						<li>
							<div class="istCheTitle">2.기업형태</div>
							<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_company_type_text"></div>
						</li>
						<li>
							<div class="istCheTitle">3.직종분류</div>
							<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_classification_text"></div>
						</li>
						<li>
							<div class="istCheTitle">4.급여수준</div>
							<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_salaly_text"></div>
						</li>
						<li style="width: 100%;">
							<div class="istCheTitle">5.고용형태</div>
							<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_employment_type_text"></div>
						</li>
						<li>
							<div class="istCheTitle">6.학력</div>
							<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_academic_ability_text"></div>
						</li>
						<li>
							<div class="istCheTitle">7.경력</div>
							<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_career_text"></div>
						</li>
						<li>
							<div class="istCheTitle">8.산업분류</div>
							<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_industry_classification_text"></div>
						</li>
					</ul>
				</div>
				<div class="istDiscrip"
					style="margin-top: 5px; text-align: center; font-size: 0.9em;">
					등록된 정보는 맞춤형 검색 용도로만 사용되며<br> 개인정보 유출은 되지않습니다.
				</div>
			</div>
		</div>
	</div>
	<!-- 맞춤형서비스 등록 팝업 END -->
	
</body>
</html>