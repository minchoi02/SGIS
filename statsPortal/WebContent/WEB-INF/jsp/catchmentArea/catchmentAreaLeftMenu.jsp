
<%
	/**************************************************************************************************************************
	* Program Name	: 생활권역 통계지도 LeftMenu
	* File Name		: catchmentAreaLeftMenu.jsp
	* Comment		: 
	* History		: 
	*	2020.06.11	방민정	신규
	*
	**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div class="shadow"></div>
<div style="position: absolute; width: 400px; top: 40px; z-index: 9999; left: 20px;">
	<div id="block_containerBox" style="display:none;background: rgba(0,0,0,0.2);position: fixed;top:140px;left:0;right:0;bottom:0;z-index: 10000;"></div><!-- 전체 블로킹 html 생성 (pse) -->
	<div id="wrapper">
		<div class="main_btn01">
			<a href="javascript:void(0);" class="btn01" id="menuButton" title="메뉴">메뉴</a>
			<div class="shadow_group" style="display: none">
				<a href="javascript:void(0);" class="btn0A active" id="areaSettingMenu" title="지점 및 영역">지점·영역</a>
				<a href="javascript:void(0);" class="btn0S" id="statisticsDateMenu" title="통계">통계</a>
			</div>
			<a href="javascript:void(0);" class="btn02" id="tutorialButton" title="튜토리얼" onclick="javascript:$catchmentAreaMain.ui.callTutorial();">튜토리얼</a><!-- 튜토리얼 잠시 숨김 -->
		</div>
		
		<!--1차 영역 -->
		<div class="search_wrap area">
			<h2 id="mapLocation_1" class="mightOverflow" data-loc-cd="2503060" data-loc-nm="대전광역시|서구|둔산2동">대전 서구 둔산2동</h2><span class="sm_txt02">현재 지도 위치</span><!-- SGIS4_1027_생활권역 -->
			<div class="search_select">
<!-- 메인 툴바로 이동 20201211 -->			
<!-- 				<select name="sido" id="sido" class="selct_02" title="시도선택"> -->
<!-- 				</select> -->
<!-- 				<select name="sigungu" id="sigungu" class="selct_02" title="시군구선택"> -->
<!-- 					<option value="0">시군구 선택</option> -->
<!-- 				</select> -->
<!-- 				<select name="emdong" id="emdong" class="selct_02" title="읍면동선택"> -->
<!-- 					<option value="0">읍면동 선택</option> -->
<!-- 				</select> -->
				<div class="search_type">
					<input type="radio" id="schTypeGbA01" name="schTypeGbA" ><label for="schTypeGbA01">현재 지도 위치의 행정구역(시군구) 기준 검색</label><br/>
					<input type="radio" id="schTypeGbA02" name="schTypeGbA" ><label for="schTypeGbA02">현재 보이는 화면 내에서 검색</label>				
				</div>				
				<a href="javascript:void(0);" class="close_btn"><img src="/images/catchmentArea/close_ico.png" alt="창닫기"></a>
			</div>
			
			<!-- SGIS4_1025_생활권역 시작 -->
			<div id="rstSearchDataDiv" style="position: absolute; z-index: 1001; background-color: white; display: none; left: 343px; top: 165px; width: 600px; border: 1px solid; border-bottom-color: white;"></div>
			<div id="rstSearchDataDiv1Page" style="position: absolute; display: none; z-index: 1000; background-color: white; left: 343px; width: 600px; top: 165px; border-bottom: 1px solid;; border-left: 1px solid;; border-right: 1px solid; background-color: javascript:void(0);f8f8f8;"></div>
				
			<div class="search_result_box scroll_wrap scroll_12">
			<div class="search_result">
				<h3 class="h3_search b_top_no"><span>검색</span> 또는 <span>지도</span>에서 지점 선택
			<!-- SGIS4_1025_생활권역 끝 -->	
					<span>
					 	<a id="searchInfo" data-subj="검색 또는 지도에서 지점 선택" href="javascript:void(0)"  title="<p class='subH'>· 검색으로 지점 선택:</p><p class='subC'>입력창  <img src='/images/catchmentArea/search_ico17.png'>에 검색어를 입력하면, 국토정보플랫폼(국토교통부 국토지리정보원)에서 제공하는 국가관심지점 검색 API를 활용하여 상단의 조건(행정구역 기준 검색 또는 화면 내 검색)에 맞게 검색하여 지점을 선택할 수 있습니다.</p>
 <p class='subH'>· 지도에서 지점 선택 :</p><p class='subC'><img src='/images/catchmentArea/ex_icon01.png'>버튼을 클릭하면 <img src='/images/catchmentArea/ex_icon02.png'>로 변경되고, 지도 위의 마우스 모양이  <img src='/images/catchmentArea/ex_icon03.png'>로 변경됩니다. 원하는 지도 위치에 변경된 마우스 모양 <img src='/images/catchmentArea/ex_icon03.png'>을 클릭하여 지점을 선택할 수 있습니다.</p>"><img src="/images/catchmentArea/question_icon.png" alt="도움말"></a>
					</span>
				</h3> 
				<input type="text" id="searchWord" class="search_inp">
				<a href="javascript:void(0);" id="searchWordBtn" class="map_ico02"></a>
				<a href="javascript:void(0);" id="searchPoi" class="map_ico"><img src="/images/catchmentArea/search_ico2.png" alt="지도클릭"></a>
				<!-- SGIS4_1025_생활권역 시작 -->
				<!--
				<div id="rstSearchDataDiv" style="position: absolute; z-index: 1001; background-color: white; display: none; left: 343px; top: 165px; width: 600px; border: 1px solid; border-bottom-color: white;"></div>
				<div id="rstSearchDataDiv1Page" style="position: absolute; display: none; z-index: 1000; background-color: white; left: 343px; width: 600px; top: 165px; border-bottom: 1px solid;; border-left: 1px solid;; border-right: 1px solid; background-color: javascript:void(0);f8f8f8;"></div>
				-->
				<!-- SGIS4_1025_생활권역 끝 -->
				
				<h3 class="h3_search"><span>시설 유형</span>으로 지점 선택
						<span>
					 		<a id="sisulInfo" data-subj="시설 유형으로 지점 선택" href="javascript:void(0)"  title="<p class='subC'>별도의 지도검색 및 지점 선택 없이 전국사업체조사의 산업분류 또는 공공데이터포털에 존재하는 위치정보를 참고하여 상단의 조건(행정구역 기준 검색 또는 화면 내 검색)에 맞게 시설 유형별로 지점을 선택할 수 있습니다.</p>"><img src="/images/catchmentArea/question_icon.png" alt="도움말"></a>
						</span>
				</h3>
				<!-- SGIS4_1025_생활권역 시작 -->
				<!--<div id="facilityTypeSearch" class="scroll_wrap scroll_01 facility_type_box"> -->
				<div id="facilityTypeSearch" class="facility_type_box">
				<!-- SGIS4_1025_생활권역 끝 -->					
					<c:forEach items="${paramInfo.largeClassList}" var="data" varStatus="outerStatus">
						<div class="sisul_wrap${outerStatus.index % 4}" id="${data.factype_lclas_cd}" value="${data.factype_lclas_nm}">
							<c:set var="grpMemNum" value="0"/>
							<h4 class="h4_ico${outerStatus.index % 4}_New">${data.factype_lclas_nm}</h4>											
							<c:forEach items="${paramInfo.facilityList}" var="list" varStatus="innerStatus">
								<c:if test="${list.factype_lclas_cd eq data.factype_lclas_cd}">
									<c:set var="grpMemNum" value="${grpMemNum + 1}"/>
									<c:choose>
										<c:when test="${grpMemNum > 6 and (grpMemNum % 3) eq 1}">
											<a href="javascript:void(0);" class="option_btn w103 mL36" id="${list.code}" data-factype-nm="${list.name}">${list.name}
										</c:when>
										<c:otherwise>
											<a href="javascript:void(0);" class="option_btn w103" id="${list.code}" data-factype-nm="${list.name}">${list.name}
										</c:otherwise>									
									</c:choose>
												<c:if test="${not empty list.srv_div}">
													<c:choose>
														<c:when test="${list.srv_div eq '01' or list.srv_div eq '02' or list.srv_div eq '03' or list.srv_div eq '04'}">
															<div class="fav_ico${list.srv_div}_2"></div>
														</c:when>
														<c:otherwise>
															<span class="bc99 fav_ico">${list.srv_div_nm}</span>
														</c:otherwise>													
													</c:choose>
												</c:if>
											</a>
								</c:if>
							</c:forEach>				
						</div>
					</c:forEach>				
<%-- 20201113_변경 요청 전 --%>
<%-- 					<c:forEach items="${paramInfo.largeClassList}" var="data" varStatus="status"> --%>
<%-- 						<c:choose> --%>
<%-- 							<c:when test="${status.index eq 0}"> --%>
<%-- 								<h4 class="h4_ico05_h">${data.factype_lclas_nm}</h4> --%>
<%-- 							</c:when> --%>
<%-- 							<c:otherwise> --%>
<%-- 								<h4 class="h4_ico05">${data.factype_lclas_nm}</h4> --%>
<%-- 							</c:otherwise>						 --%>
<%-- 						</c:choose>						 --%>
<%-- 						<div id="${data.factype_lclas_cd}" value="${data.factype_lclas_nm}"> --%>
<%-- 						<c:forEach items="${paramInfo.facilityList}" var="list"> --%>
<%-- 							<c:if test="${list.factype_lclas_cd eq data.factype_lclas_cd}"> --%>
<%-- 								<p class="option_btn w116" id="${list.code}" data-factype-nm="${list.name}">${list.name} --%>
<%-- 									<c:if test="${list.srv_div eq '01'}"> --%>
<%-- 										<span class="bc01 list_tag">${list.srv_div_nm}</span> --%>
<%-- 									</c:if> --%>
<%-- 									<c:if test="${list.srv_div eq '02'}"> --%>
<%-- 										<span class="bc02 list_tag">${list.srv_div_nm}</span> --%>
<%-- 									</c:if> --%>
<%-- 									<c:if test="${list.srv_div eq '03'}"> --%>
<%-- 										<span class="bc03 list_tag">${list.srv_div_nm}</span> --%>
<%-- 									</c:if> --%>
<%-- 									<c:if test="${list.srv_div eq '04'}"> --%>
<%-- 										<span class="bc04 list_tag">${list.srv_div_nm}</span> --%>
<%-- 									</c:if> --%>
<!-- 								</p> -->
<%-- 							</c:if> --%>
<%-- 						</c:forEach> --%>
<!-- 						</div> -->
<%-- 					</c:forEach> --%>
				</div>
				<!-- SGIS4_1025_생활권역_나의데이터 시작  -->
				<div>
					<h3 class="h3_search" style="margin-bottom: 10px;"><span>나의 데이터</span>로 지점 선택<a id="myDataInfo" data-subj="나의데이터로 지점 선택" title="통계청 통계정보시스템 통합회원으로 로그인 후,<br>SGIS포털 > 마이페이지 > 나의 데이터에 자료를 등록하면<br>나의 데이터를 활용하여 지점을 선택할 수 있습니다."><img style="margin-left:4px;" src="/images/catchmentArea/question_icon.png" alt="도움말"></a>
					<% 
						String myUrl = "/view/mypage/myData/dataList";
					
						if ( session.getAttribute("member_id") == null ) { 
							myUrl = "/view/member/login_new?returnPage=https://sgis.kostat.go.kr/view/mypage/myData/dataList";
						}
					%>
						<a href="<%=myUrl%>" style="float: right; font-size:14px;"><u>나의 데이터 이동</u></a>
					</h3>
					<!-- 비로그인  -->
					<div class="mydataBox" id="myData_1" style="display:none;">로그인 후, 나의 데이터를 등록하면 <br>해당 지점을 영역 생성 지점으로 선택할 수 있습니다.</div>
					<!-- 로그인 & 나의 데이터 없음  -->
					<div class="mydataBox" id="myData_2" style="display:none;">SGIS 나의 데이터에 나만의 POI를 등록하여 생활권역 생성 지점으로 활용할 수 있습니다.</div>
					<!-- 로그인 & 나의 데이터 있음 -->
					<div class="chk_result" id="myData_3" style="display:block;">
						<!--  <p>나의 데이터에 저장된 목록</p>-->
						<div class="scroll_wrap mCustomScrollbar _mCS_2" style="width:366px;">
							<ul id="myDataList"></ul>
						</div>
						<!--  
						<div class="chk_box">
							<button type="button" class="pt15">선택 데이터 지도 표출</button>
						</div>
						-->
					</div>
				</div>
				<!-- SGIS4_1025_생활권역_나의데이터  끝 -->		
			</div>	
			</div>
		</div>
		<!-- 1차 영역 end-->
	
	<!-- 중심 시설유형으로 찾기 선택 후 상세보기 div -->
	<div class="search_wrap sisul" id="facilityTypeSearchDatail">
			<a href="javascript:void(0);" class="close_btn"><img src="/images/catchmentArea/close_ico.png" alt="창닫기"></a>
			<a href="javascript:void(0);"><h2 id="mapLocation_2" class="h2_2 back_btn mightOverflow">대전 서구 둔산동</h2></a><span class="sm_txt02">현재 지도 위치</span>
			<div class="search_result02">
				<div class="location">
					<span class="cate01">시설 유형</span>
					<span class="cate02"></span>
					<span class="cate03" id="ftsdText"></span>
				</div>
				<div class="scroll_wrap scroll_06">
					<div id="totalSearchResult">
						<!-- 검색결과 리스트 -->
					</div>
				</div>
			</div>
		</div>
	<!-- 중심 시설유형으로 찾기 선택 후 상세보기 div end-->
	
	<!-- 2차 영역 -->
	<div class="search_wrap year">
			<a href="javascript:void(0);" class="close_btn"><img src="/images/catchmentArea/close_ico.png" alt="창닫기"></a>
			<a href="javascript:void(0);"><h2 id="mapLocation_3" class="h2_2 back_btn mightOverflow">대전 서구 둔산동</h2></a><span class="sm_txt02">선택 위치</span>
			<div class="search_result03" style="display:none;"> <!-- 요청에 의한 삭제 -->
				<h3 class="h3_1">기준연도</h3>
				<a href="javascript:void(0);" class="re03_year">2015</a>
				<a href="javascript:void(0);" class="re03_year">2016</a>
				<a href="javascript:void(0);" class="re03_year">2017</a>
				<a href="javascript:void(0);" class="re03_year">2018</a>
				<a href="javascript:void(0);" class="re03_year">2019</a>
			</div>
			<div class="search_result03_2">
				<h3 class="h3_2">영역 설정</h3><span class="h3_txt">(시간/거리/반경 중 같은 조건으로 최대 4개 선택)</span>
				<span>
			 		<a id="AreaInfo" data-subj="영역 설정(같은 기준으로 최대 4개 선택)" href="javascript:void(0)"  title="<p class='subC'>주행시간, 주행거리, 반경 중 같은 기준별로 최대 4개의 영역을 설정할 수 있습니다.<br>
			 		도로 길이, 평균 소요시간 등의 정보를 가지고 있는 도로네트워크를 활용하여 주행시간, 주행거리, 반경에 대한 영역을 제공합니다.</p>
			 		<div class='tip_sec01'><p class='subH'>· 주행시간 </p><p class='subC'>선택한 지점에서 <u>가장 근접한 도로를 기준으로</u> 주행시간 내 도달 가능한 모든 경로를 찾아 영역으로 표시</p><p class='subC'>(예) 주행시간 5분(300초): 선택한 지점에서 가장 근접한 도로를 기준으로 도로 주행 평균 소요시간이 300초가 되는 모든 경로를 포함한 영역 표시</p></div>
			 		<div class='tip_sec01'><p class='subH'>· 주행거리 </p><p class='subC'>선택한 지점에서 <u>가장 근접한 도로를 기준으로</u> 주행거리 내 도달 가능한 모든 경로를 찾아 영역으로 표시</p><p class='subC'>(예) 주행거리 1km : 선택한 지점에서 가장 근접한 도로를 기준으로 도로 길이가 1km가 되는 모든 경로를 포함한 영역 표시</p></div>
			 		<div class='tip_sec01'><p class='subH'>· 반경</p><p class='subC'>선택한 지점에서 모든 방향으로의 직선거리를 영역으로 표시</p></div><p class='subC att'>* 현재 적용된 도로네트워크 기준 : ‘20년 4분기 기준 자료</p>"><img src="/images/catchmentArea/question_icon.png" alt="도움말"></a>
				</span>
				<!--SGIS4_1124_영역설정 토글 시작-->
				<div style="text-align: center;">
					<a href="javascript:void(0);" class="selectType st01 on">기본값</a>
					<a href="javascript:void(0);" class="selectType st02">세부설정</a>
				</div>
				<!--SGIS4_1124_영역설정 토글 끝-->
				<!-- SGIS4_1025_생활권역_임의영역 시작 -->
				<div class="scroll_wrap scroll_11" id="fixedDiv" style="top:20px;position:relative;"><!--SGIS4_1124_영역설정 토글 수정-->
				<!-- SGIS4_1025_생활권역_임의영역 끝 -->
					<div>
						<input type="radio" id="stats01" name="stats_radio" ><label for="stats01"><img src="/images/catchmentArea/toc_ico01.png" class="toc_ico">주행시간 기준</label>
						<div class="toc_sec01" id="type_t"></div>
					</div>
					<div>
						<input type="radio" id="stats02" name="stats_radio" ><label for="stats02"><img src="/images/catchmentArea/toc_ico02.png" class="toc_ico">주행거리 기준</label>
						<div class="toc_sec01" id="type_d"></div>
					</div>
					<div>
						<input type="radio" id="stats03" name="stats_radio" ><label for="stats03"><img src="/images/catchmentArea/toc_ico03.png" class="toc_ico">반경 기준</label>
						<div class="toc_sec01" id="type_r"></div>
					</div>
				</div>
				<!-- SGIS4_1025_생활권역_임의영역 시작 -->
				<div class="scroll_wrap scroll_11" id="rndmDiv" style="display:none;top:20px;position:relative;"><!--SGIS4_1124_영역설정 토글수정-->
					<div class="rndm_sec01 rndm_head">
	                    <ul name="rndscopeType" id="rndscopeType">
	                    	<b>구분</b>
	                        <!-- <option value="01">주행 시간</option>
	                        <option value="02">주행 거리</option>
	                        <option value="03">반경 기준</option> -->
	                    </ul>
	                    <div class="rndm_info">
		                    <b class="rndm_setB">최소</b><span class="rndm_setS"></span>
		                    <b class="rndm_setB">최대</b><span class="rndm_setS"></span>
		                    <b class="rndm_setB">간격</b><span class="rndm_setS"></span>
<!-- 	                    <b class="rndm_setB">단위</b><span class="rndm_setS"></span>
 -->	                </div>
	                </div>	                
	                <div class="rndm_sec02" id="rndm_table">
	                    <b><!-- 주행시간 간격 선택 --></b><span id="unitSpan" class="rndm_unitInfo"></span>
	                    <div class="toc_sec01" id="dynamicTbody"></div>
	                    <!-- <table>
	                    	<tbody id="dynamicTbody"></tbody>
	                    </table>
	                    <img src="/images/catchmentArea/info-2-xxl.jpg" alt="도움말"><strong>최소 1개 이상 선택해 주세요.</strong>	
	                     -->
	                    <p class="hp"><span>최소 1개, 최대 4개까지 순차적으로 자동입력됩니다.</span></p>                    
	                </div>
				</div>
				<input type="checkbox" id="fixed_rndm" value="fixed"><label for="fixed_rndm">임의값으로 영역 설정</label>
				<!-- SGIS4_1025_생활권역_임의영역 끝 -->
				<a href="javascript:void(0);" class="btn_select" id="statisticsDataBtn">통계정보 보기</a>
			</div>
		</div>
	<!-- 2차 영역 end -->
	
	<!-- 통계  -->
	<div class="search_wrap statistics">
			<a href="javascript:void(0);"><h2 id="mapLocation_4" class="h2_2 back_btn mightOverflow">대전 서구 둔산동</h2></a><span class="sm_txt02">선택 위치</span>
			<p id="areaSettingNm" class="scdTtl">영역 설정 기준</p>
			<!-- 영향권 섹션 -->
			<div class="scroll_wrap scroll_02 active">
				<div class="search_result chk chk_01">
					<h3><span>영역 내 전체 정보</span>
						<span>
					 		<a id="srvAreaInfo" data-subj="영역 내 전체 정보" href="javascript:void(0)"  title="<p class='subC'>이전 단계에서 설정한 영역을 모두 지도에 표출하고, 각 영역에 속한 인구, 주택, 사업체 수 등의 통계정보를 데이터보드로 보여줍니다.</p>"><img src="/images/catchmentArea/question_icon.png" alt="도움말"></a>
						</span>
					</h3>
					<a href="javascript:void(0);" class="btn_toggle off" title="off" id="gridDataType01"><img src="/images/catchmentArea/btn_off.png" alt="off"></a>
					<a href="javascript:void(0);" class="btn_toggle on" title="on"><img src="/images/catchmentArea/btn_on.png" alt="on"></a>
					<!-- 거리 선택 -->
					<div class="chk_group" id="statsType01">
						<ul class="clearfix"></ul>
						<a href="javascript:void(0);" class="more more_bt01" title="확장" style="display:none;"><span class="hide">확장</span></a>
					</div>
					<!-- //거리 선택 -->
					
					<!-- SGIS4_생활권역 시작 -->
					<!-- 확장버튼 클릭시 확장영역 -->
					<!-- SGIS4_1025_생활권역 시작 -->
					<div class="chk_result">
						<div class="whAraLeft">
							<a href="javascript:void(0);" class="switchBox">
								<span class="txt1 active">기본 통계</span>
								<span class="txt2">세부항목별 통계</span>
							</a>
							<span class="whAraDtlChk">
								<a href="javascript:void(0);" class="dtlCond_chk on" title="세부 조건 설정 보기">세부 조건 설정</a>
								<a href="javascript:void(0);" class="dtlCond_chk off" title="세부 조건 설정 닫기">세부 조건 설정</a>	
								<a id="whAraDtlInfo" data-subj="세부항목별 통계" href="javascript:void(0)"  title="<p class='subC'>설정한 영역 내 전체에 대하여 세부적으로 알고 싶은 통계정보 조건을 지정할 수 있습니다.<br>세부 조건 없이 전반적인 정보를 보고자 할 경우, 체크를 해제하시기 바랍니다.</p>"><img src="/images/catchmentArea/question_icon.png" alt="도움말"></a>							
							</span>
					<!-- SGIS4_1025_생활권역 끝 -->						
						</div>
						<!-- 영역 내 세부항목별 통계 조건 설정 -->
						<div class="area_setting">
							<!-- SGIS4_1025_생활권역 시작 -->
							<!--  <h4 style="padding-top:0;">영역 통계 세부항목 설정</h4>-->
							<!-- SGIS4_1025_생활권역 끝 -->
							<button id="area_search_btn" type="button">조회</button>
							<div class="ara_chk_bx">
								<a href="javascript:void(0);" class="ara_pops_chk" title="인구조건 선택/해제" data-characteristics-cond="" data-characteristics-cond-nm=""></a>
								<a href="javascript:void(0);" class="ara_family_chk" title="가구조건 선택/해제" data-characteristics-cond="" data-characteristics-cond-nm=""></a>
								<a href="javascript:void(0);" class="ara_house_chk" title="주택조건 선택/해제" data-characteristics-cond="" data-characteristics-cond-nm=""></a>
								<a href="javascript:void(0);" class="ara_copr_chk" title="사업체조건 선택/해제" data-characteristics-cond="" data-characteristics-cond-nm=""></a>
								<a href="javascript:void(0);" class="ara_employee_chk" title="종사자조건 선택/해제" data-characteristics-cond="" data-characteristics-cond-nm=""></a>
							</div>
							<!-- SGIS4_1025_생활권역 시작 -->
							<ul class="clearfix ara_cond_bx grid_depth1" id="areaSetting">
							<!-- SGIS4_1025_생활권역 끝 -->
								<li class="active" data-stat-type="pops">
									<a href="javascript:void(0);" class="dep_btn01 w69">인구</a>
									<div class="grid_navbg">
										<div class="clearfix grid_wrap02">
											<!-- SGIS4_1025_생활권역 시작 -->
											<!--  
											<div>
												<span class="cond_title">성별</span>
												<select class="selct_07 select_genger">
													<option value="00">전체</option>
													<option value="1">남자</option>
													<option value="2">여자</option>
												</select>
											</div>
											<div class="ct_line3"></div>
											-->
											<!-- SGIS4_1025_생활권역 끝 -->
											<div>
												<span class="cond_title">연령</span>
												<div class="div_age_box">
													<!-- SGIS4_1025_생활권역 시작 -->
													<!--  
													<div class="div_age_all">
														<a href="javascript:void(0);" class="age_all_chk on" title="연령 전체 선택">전체</a>
														<a href="javascript:void(0);" class="age_all_chk off" title="연령 전체 해제">전체</a>
													</div>
													-->
													<!-- SGIS4_1025_생활권역 끝 -->
													<div class="div_age_single5">
														<a href="javascript:void(0);" class="age_single_chk on" title="5세 단위 선택">5세 단위</a>
														<a href="javascript:void(0);" class="age_single_chk off" title="5세 단위 해제">5세 단위</a>
														<select id="select_age5_area" class="selct_77 select_age5 age_single_mem"></select>
													</div>
													<div class="div_age_single10">
														<a href="javascript:void(0);" class="age_single_chk on" title="10세 단위 선택">10세 단위</a>
														<a href="javascript:void(0);" class="age_single_chk off" title="10세 단위 해제">10세 단위</a>
														<select class="selct_77 select_age10 age_single_mem"></select>
													</div>
													<div class="div_age_singleRnd">
														<a href="javascript:void(0);" class="age_single_chk on" title="주요 구간 선택">주요 구간</a>
														<a href="javascript:void(0);" class="age_single_chk off" title="주요 구간 해제">주요 구간</a>
														<select class="selct_77 select_ageRnd age_single_mem"></select>
													</div>
												</div>
											</div>											
										</div>							
									</div>
								</li>
								<li data-stat-type="family">
									<a href="javascript:void(0);" class="dep_btn02 w69">가구</a>
									<div class="grid_navbg">
										<div class="clearfix grid_wrap02 gridFamilyList bundle">
											<div class="clearfix">
											<!-- SGIS4_1025_생활권역 시작 -->
												<a href="javascript:void(0);" class="btn05 pm91_1over3 bundle_main" data-bundle-nm="A" value="">친족 가구</a>
												<a href="javascript:void(0);" class="btn05 pm91_1over3" value="A0">1인 가구</a>
												<a href="javascript:void(0);" class="btn05 pm91_1over3" value="B0">비친족 가구</a>
											<!-- SGIS4_1025_생활권역 끝 -->	
											</div>											
											<div class="ct_line2_b"></div>
											<div class="clearfix">
												<a href="javascript:void(0);" class="btn05_sub pm91_1over3 bundle_sub" data-bundle-nm="A" value="01">1세대 가구</a>
												<a href="javascript:void(0);" class="btn05_sub pm91_1over3 bundle_sub" data-bundle-nm="A" value="02">2세대 가구</a>
												<a href="javascript:void(0);" class="btn05_sub pm91_1over3 bundle_sub" data-bundle-nm="A" value="03">3세대 가구</a>
												<a href="javascript:void(0);" class="btn05_sub pm91_1over3 bundle_sub" data-bundle-nm="A" value="04">4세대 이상 가구</a>
											</div>
										</div>
									</div>							
								</li>
								<li data-stat-type="house">
									<a href="javascript:void(0);" class="dep_btn03 w69">주택</a>
									<div class="grid_navbg">
										<div class="clearfix grid_wrap02">
											<!-- SGIS4_1210 추가 시작 -->
											<div class="clearfix div_houseType">
												<a href="javascript:void(0);" class="con_chk on va_top" title="주택종류 선택">주택종류</a>
												<a href="javascript:void(0);" class="con_chk off va_top" title="주택종류 해제">주택종류</a>												
												<div class="div_houseTypeBox gridHouseList"></div>
											</div>
											<!-- SGIS4_1210 추가 끝 -->								
											<div class="ct_line2_b"></div>
											<div class="clearfix div_constYear">
												<a href="javascript:void(0);" class="con_chk on" title="건축년도 선택">건축년도</a>
												<a href="javascript:void(0);" class="con_chk off" title="건축년도 해제">건축년도</a>											
												<select class="selct_07 select_constYear constYear_mem">
												    <option value="">선택하세요</option>
												</select>
											</div>											
											<div class="ct_line2"></div>
											<div class="clearfix div_houseBdspace">
												<a href="javascript:void(0);" class="con_chk on" title="연면적 선택">연면적</a>
												<a href="javascript:void(0);" class="con_chk off" title="연면적 해제">연면적</a>
												<select class="selct_07 selct_houseTotArea houseBdspace_mem">
												    <option value="">선택하세요</option>
												</select>
											</div>
											<div class="ct_line2"></div>
											<!-- SGIS4_1025_생활권역 시작 -->
											<p class="hp"><span>주택종류, 건축년도, 연면적 중 한 가지 조건만 선택할 수 있습니다.</span></p>
											<!-- SGIS4_1025_생활권역 끝 -->
										</div>
									</div>								
								</li>								
								<li data-stat-type="copr">
									<a href="javascript:void(0);" class="dep_btn04 w69">사업체</a>
									<div class="grid_navbg">
										<div class="clearfix grid_wrap02">
											<div class="clearfix">
												<!-- SGIS4_1025_생활권역 시작 -->	
												<a href="javascript:void(0);" class="btn06 pm91_2T mustBeOne" data-grdstat-type="tabFavorites">주요 생활업종</a>												
												<a href="javascript:void(0);" class="btn06 pm91_2T mustBeOne" data-grdstat-type="tabIndustryClass">산업분류 검색</a>
												<!-- SGIS4_1025_생활권역 끝 -->	
											</div>
											<div class="ct_line3_b"></div>
											<div class="clearfix mt10 favorCont">
												<div class="scroll_wrap">
													<div class="clearfix lifeBizList">
													</div>
													<!-- <div class="clearfix favorlist"></div> -->	
												</div>
												<div class="ct_line3"></div>
												<span class="li_info">한국표준산업분류를 실생활에서 쉽게 이해할 수 있는 명칭으로 재분류한 주요 생활업종을 제공합니다.</span>
												<a href="javascript:void(0);" class="favor_i"></a>												
											</div>
											<!-- SGIS4_0629_생활권역 시작 -->
											<div class="clearfix mt10 classCont" data-ksic-sel-cd="" data-ksic-sel-nm="" data-ksic-sel-main-cd="">
											<!-- SGIS4_0629_생활권역 끝 -->
												<a href="javascript:void(0);" class="btn_selectKSIC" id="ksicCoprAraBtn">한국산업표준분류 검색</a>
												<a href="javascript:void(0);" class="btn_clearKSIC">선택 초기화</a>
												<div class="clearfix clsSet mainCl unSel" data-ksic-sel-cd="" data-ksic-sel-nm="">
													<span class="li_title addDot">대분류</span>
													<span class="li_conts mightOverflow">미선택</span>												
												</div>
												<div class="ct_line3"></div>
												<div class="clearfix clsSet middleCl unSel" data-ksic-sel-cd="" data-ksic-sel-nm="">
													<span class="li_title addDot">중분류</span>
													<span class="li_conts mightOverflow">미선택</span>													
												</div>
												<div class="ct_line3"></div>
												<div class="clearfix clsSet subCl unSel" data-ksic-sel-cd="" data-ksic-sel-nm="">
													<span class="li_title addDot">소분류</span>
													<span class="li_conts mightOverflow">미선택</span>													
												</div>
												<div class="ct_line3"></div>
												<div class="clearfix clsSet subDiv1 unSel" data-ksic-sel-cd="" data-ksic-sel-nm="">
													<span class="li_title addDot">세분류</span>
													<span class="li_conts mightOverflow">미선택</span>													
												</div>
												<div class="ct_line3"></div>
												<div class="clearfix clsSet subDiv2 unSel" data-ksic-sel-cd="" data-ksic-sel-nm="">
													<span class="li_title addDot">세세분류</span>
													<span class="li_conts mightOverflow">미선택</span>													
												</div>
												<div class="ct_line3"></div>
												<span class="li_info">한국산업표준분류 검색에서 산업분류를 선택해 주세요.</span>																							
											</div>
										</div>
									</div>								
								</li>
								<li data-stat-type="employee">
									<a href="javascript:void(0);" class="dep_btn06 w69">종사자</a>
									<div class="grid_navbg">
										<div class="clearfix grid_wrap02">
											<div class="clearfix">
												<!-- SGIS4_1025_생활권역 시작 -->	
												<a href="javascript:void(0);" class="btn06 pm91_2T mustBeOne" data-grdstat-type="tabFavorites">주요 생활업종</a>
												<a href="javascript:void(0);" class="btn06 pm91_2T mustBeOne" data-grdstat-type="tabIndustryClass">산업분류 검색</a>
												<!-- SGIS4_1025_생활권역 끝 -->
											</div>
											<div class="ct_line3_b"></div>
											<div class="clearfix mt10 favorCont">
												<div class="scroll_wrap">
													<div class="clearfix lifeBizList">
													</div>
													<!-- <div class="clearfix favorlist"></div> -->	
												</div>
												<div class="ct_line3"></div>
												<span class="li_info">한국표준산업분류를 실생활에서 쉽게 이해할 수 있는 명칭으로 재분류한 주요 생활업종을 제공합니다.</span>
												<a href="javascript:void(0);" class="favor_i"></a>												
											</div>
											<!-- SGIS4_0629_생활권역 시작 -->
											<div class="clearfix mt10 classCont" data-ksic-sel-cd="" data-ksic-sel-nm="" data-ksic-sel-main-cd="">
											<!-- SGIS4_0629_생활권역 끝 -->
												<a href="javascript:void(0);" class="btn_selectKSIC" id="ksicEmplAraBtn">한국산업표준분류 검색</a>
												<a href="javascript:void(0);" class="btn_clearKSIC">선택 초기화</a>
												<div class="clearfix clsSet mainCl unSel" data-ksic-sel-cd="" data-ksic-sel-nm="">
													<span class="li_title addDot">대분류</span>
													<span class="li_conts mightOverflow">미선택</span>												
												</div>
												<div class="ct_line3"></div>
												<div class="clearfix clsSet middleCl unSel" data-ksic-sel-cd="" data-ksic-sel-nm="">
													<span class="li_title addDot">중분류</span>
													<span class="li_conts mightOverflow">미선택</span>													
												</div>
												<div class="ct_line3"></div>
												<div class="clearfix clsSet subCl unSel" data-ksic-sel-cd="" data-ksic-sel-nm="">
													<span class="li_title addDot">소분류</span>
													<span class="li_conts mightOverflow">미선택</span>													
												</div>
												<div class="ct_line3"></div>
												<div class="clearfix clsSet subDiv1 unSel" data-ksic-sel-cd="" data-ksic-sel-nm="">
													<span class="li_title addDot">세분류</span>
													<span class="li_conts mightOverflow">미선택</span>													
												</div>
												<div class="ct_line3"></div>
												<div class="clearfix clsSet subDiv2 unSel" data-ksic-sel-cd="" data-ksic-sel-nm="">
													<span class="li_title addDot">세세분류</span>
													<span class="li_conts mightOverflow">미선택</span>													
												</div>
												<div class="ct_line3"></div>
												<span class="li_info">한국산업표준분류 검색에서 산업분류를 선택해 주세요.</span>																							
											</div>
										</div>									
									</div>								
								</li>
							</ul>
						</div>
						<!-- //영역 내 세부항목별 통계 조건 설정 -->						
					</div>
					<!-- //확장버튼 클릭시 확장영역 -->
					<!-- SGIS4_생활권역 끝 -->

					<!-- 확장버튼 클릭시 확장영역 -->					
 					<div style="display:none;"><!-- 원형: <div class="chk_result myData" id="myDataDiv"> -->
						<div class="vwMode_sel_box">
							<p>
								<span class="vwMode_left">
									<a href="javascript:void(0);" class="mogb_chk on basic" title="기본 통계 보기">기본 통계 보기</a>
									<a href="javascript:void(0);" class="mogb_chk off basic" title="기본 통계 보기">기본 통계 보기</a>
								<!-- SGIS4_1025_생활권역 시작 -->	
								</span>
								<span class="vwMode_right">
								<!-- SGIS4_1025_생활권역 끝 -->
									<a href="javascript:void(0);" class="mogb_chk on character" title="조건별 통계 보기">조건별 통계 보기</a>
									<a href="javascript:void(0);" class="mogb_chk off character" title="조건별 통계 보기">조건별 통계 보기</a>								
								</span>
							</p>							
						</div>	
						<div class="vwMode_btn_box">
							<p class="grd_txt03">영역 전체의 조건별 통계를 설정하여 조회할 수 있으며, 조건을 선택하지 않은 항목은 기본 통계를 표출합니다.</p>
							<a href="javascript:void(0);" class="grd_btn02" id="characteristics_popbtn">조건설정</a>
							<button type="button" id="characteristics_search_btn" class="pt15">조회</button>
						</div>										
						<div id="schCondByChaList" class="multi_cond_box vwMode">
							<ul>
								<li data-characteristics-cond="">
									<a href="javascript:void(0);">[조건설정] 버튼을 클릭하면, 통계 조건을 선택 할 수 있습니다.</a>
								</li>	
							</ul>
						</div>					
						<h4 style="display:none;">나의 데이터 표출
							<span id="myDataInfo">
								<a href="javascript:void(0)" title="SGIS포털에 로그인후 가능하며, 지오코딩된 나의 데이터가 있을 시 지도에 POI가 표출되는 기능입니다."><img src="/images/catchmentArea/question_icon.png" alt="도움말"></a>
							</span>
						</h4>
						<p style="display:none;">나의 데이터에 저장된 목록</p>
						<div class="scroll_wrap" style="display:none;">
							<ul>
								<li>
									<a href="javascript:void(0);">
										성남시 보건소 데이터<br>
										<span class="user_id">idid1234</span>
										<span class="mydata_date">2020-05-28 11:38</span>
									</a>
								</li>
								<li>
									<a href="javascript:void(0);">
										성남시 보건소 데이터<br>
										<span class="user_id">idid1234</span>
										<span class="mydata_date">2020-05-28 11:38</span>
									</a>
								</li>
								<li>
									<a href="javascript:void(0);">
										성남시 보건소 데이터<br>
										<span class="user_id">idid1234</span>
										<span class="mydata_date">2020-05-28 11:38</span>
									</a>
								</li>
								<li>
									<a href="javascript:void(0);">
										성남시 보건소 데이터<br>
										<span class="user_id">idid1234</span>
										<span class="mydata_date">2020-05-28 11:38</span>
									</a>
								</li>
								<li>
									<a href="javascript:void(0);">
										성남시 보건소 데이터<br>
										<span class="user_id">idid1234</span>
										<span class="mydata_date">2020-05-28 11:38</span>
									</a>
								</li>
								<li>
									<a href="javascript:void(0);">
									성남시 보건소 데이터<br>
										<span class="user_id">idid1234</span>
										<span class="mydata_date">2020-05-28 11:38</span>
									</a>
								</li>
								<li>
									<a href="javascript:void(0);">
										성남시 보건소 데이터<br>
										<span class="user_id">idid1234</span>
										<span class="mydata_date">2020-05-28 11:38</span>
									</a>
								</li>
								<li>
									<a href="javascript:void(0);">
										성남시 보건소 데이터<br>
										<span class="user_id">idid1234</span>
										<span class="mydata_date">2020-05-28 11:38</span>
									</a>
								</li>
							</ul>
						</div>
						<div class="chk_box" style="display:none;">
							<a href="javascript:void(0);" class="all_chk on" title="전체선택">전체선택</a>
							<a href="javascript:void(0);" class="all_chk off" title="전체해제">전체선택</a>
							<button type="button" class="pt15">선택 데이터 지도 표출</button>
						</div>
					</div>
					<!-- //확장버튼 클릭시 확장영역 -->
				</div>
				<!-- //영향권 섹션 -->

				<!-- 격자 섹션 -->
				<div class="search_result chk chk_02">
					<h3><span>격자 분포</span> (1개 단일선택)
						<span>
					 		<a id="gridInfo" data-subj="격자 분포" href="javascript:void(0)"  title="<p class='subC'>이전 단계에서 설정한 영역 중 선택된 영역의 통계정보를 격자* 분포로 보여줍니다.</p>
<p class='subC'>* 격자(grid, 표) : 국토를 행정구역과 관계없이 직각으로 교차하는 가로·세로선으로 구분한 영역</p>"><img src="/images/catchmentArea/question_icon.png" alt="도움말"></a>
						</span>
					</h3>
					<a href="javascript:void(0);" class="btn_toggle off" title="off" id="gridDataType02"><img src="/images/catchmentArea/btn_off.png" alt="off"></a>
					<a href="javascript:void(0);" class="btn_toggle on" title="on" id = "gridDataType02_2"><img src="/images/catchmentArea/btn_on.png" alt="on"></a> <!--SGIS4_1025_생활권역_상세분석 예외처리를 위해 id 추가 -->
					<!-- 거리 선택 -->
					<div class="chk_group" id="statsType02">
						<ul class="clearfix"></ul>
						<a href="javascript:void(0);" class="more more2" title="확장"><span class="hide">확장</span></a>
					</div>
					<!-- //거리 선택 -->

					<!-- 확장버튼 클릭시 확장영역 -->
					<div class="chk_result">
						<!-- 격자 크기 -->
						<div class="grid_size">
							<h4>격자크기<span>(격자 크기에 따라서 집계치가 상이할 수 있습니다.)</span></h4>
							<c:forEach items="${paramInfo.gridLevelList}" var="list">
								<a href="javascript:void(0);" class="btn_size" data-grid-level-div="${list.grid_level_div}">${list.grid_nm}</a>
							</c:forEach>
						</div>
						<!-- //격자 크기 -->
						<!-- 격자 통계 조건 설정 -->
						<!-- SGIS4_1025_생활권역 시작 -->
						<div class="grid_setting grid_setting_01">
						<!-- SGIS4_1025_생활권역 끝 -->
							<h4 style="padding-top:0;">격자 통계 조건 설정</h4>
							<select class="selct_06" id="bYearSel06"></select>
							<button id="grid_search_btn" type="button">조회</button>
							<ul class="clearfix grid_depth_less1k h160" id="gridSettingLess1k">
								<li class="active" data-stat-type="pops">
									<a href="javascript:void(0);" class="dep_btn71 w69">인구</a>
									<div class="grid_navbg">
										<div class="clearfix">
											<p>1km 미만 격자 크기에서는 총 값만 제공합니다.</p>
										</div>
									</div>
								</li>
								<li data-stat-type="family">
									<a href="javascript:void(0);"  class="dep_btn71 w69">가구</a>								
									<div class="grid_navbg">
										<div class="clearfix">
											<p>1km 미만 격자 크기에서는 총 값만 제공합니다.</p>
										</div>
									</div>
								</li>
								<li data-stat-type="house">
									<a href="javascript:void(0);"  class="dep_btn71 w69">주택</a>								
									<div class="grid_navbg">
										<div class="clearfix">
											<p>1km 미만 격자 크기에서는 총 값만 제공합니다.</p>
										</div>
									</div>
								</li>								
								<li data-stat-type="copr">
									<a href="javascript:void(0);"  class="dep_btn72 w69">사업체</a>								
									<div class="grid_navbg">
										<div class="clearfix">
											<p>1km 미만 격자 크기에서는 총 값만 제공합니다.</p>
										</div>
									</div>
								</li>								
								<li data-stat-type="employee">
									<a href="javascript:void(0);"  class="dep_btn72 w69">종사자</a>								
									<div class="grid_navbg">
										<div class="clearfix">
											<p>1km 미만 격자 크기에서는 총 값만 제공합니다.</p>
										</div>
									</div>
								</li>																																
							</ul>
							<ul class="clearfix grid_depth1 h265" id="gridSetting">
								<li class="active" id="pops" data-stat-type="pops">
									<!-- SGIS4_생활권역 시작 --><a href="javascript:void(0);" class="dep_btn01 w69">인구</a><!-- SGIS4_생활권역 끝 -->
									<div class="grid_navbg">
										<div class="clearfix grid_wrap02">
											<div>
												<span class="cond_title">성별</span>
												<select id="select_genger" class="selct_07 select_genger">
													<option value="00">전체</option>
													<option value="1">남자</option>
													<option value="2">여자</option>
												</select>
											</div>
											<div class="ct_line3"></div>
											<div>
												<span class="cond_title">연령</span>
												<div class="div_age_box">
													<div class="div_age_all">
														<a href="javascript:void(0);" class="age_all_chk on" title="연령 전체 선택">전체</a>
														<a href="javascript:void(0);" class="age_all_chk off" title="연령 전체 해제">전체</a>
													</div>
													<div class="div_age_single5">
														<a href="javascript:void(0);" class="age_single_chk on" title="5세 단위 선택">5세 단위</a>
														<a href="javascript:void(0);" class="age_single_chk off" title="5세 단위 해제">5세 단위</a>
														<select id="select_age5" class="selct_77 select_age5 age_single_mem"></select>
													</div>
													<div class="div_age_single10">
														<a href="javascript:void(0);" class="age_single_chk on" title="10세 단위 선택">10세 단위</a>
														<a href="javascript:void(0);" class="age_single_chk off" title="10세 단위 해제">10세 단위</a>
														<select id="select_age10" class="selct_77 select_age10 age_single_mem"></select>
													</div>
													<div class="div_age_singleRnd">
														<a href="javascript:void(0);" class="age_single_chk on" title="주요 구간 선택">주요 구간</a>
														<a href="javascript:void(0);" class="age_single_chk off" title="주요 구간 해제">주요 구간</a>
														<select id="select_ageRnd" class="selct_77 select_ageRnd age_single_mem"></select>
													</div>
												</div>
											</div>											
<!-- 											<div class="clearfix div_age_range"> -->
<!-- 												<a href="javascript:void(0);" class="age_range_chk on" title="구간 선택">구간 선택</a> -->
<!-- 												<a href="javascript:void(0);" class="age_range_chk off" title="구간 해제">구간 선택</a>									 -->
<!-- 												<select title="시작범위" id="populationAgeFrom" class="selct_08_lm selct_age_from age_range_mem"></select> -->
<!-- 												<span class="cond_subMsg"> 이상 ~ </span> -->
<!-- 												<select title="마지막범위" id="populationAgeTo" class="selct_08 selct_age_to age_range_mem"></select> -->
<!-- 												<span id="ageToText" class="cond_subMsg"> 미만</span>											 -->
<!-- 											</div>								 -->
<!-- 											<div id="slider-range_age1" class="slider-range age_range_slider_mem"></div> -->
<!-- 											<ul class="slider_controll_bar_long"> -->
<!-- 												<li style="margin-left: -8px;">0</li> -->
<!-- 												<li style="margin-left: 12px;">20</li> -->
<!-- 												<li style="margin-left: 8px;">40</li> -->
<!-- 												<li style="margin-left: 7px;">60</li> -->
<!-- 												<li style="margin-left: 9px;">80</li> -->
<!-- 												<li style="margin-left: 7px;">100+</li> -->
<!-- 											</ul> -->
										</div>							
									</div>
								</li>
								<li id="family" data-stat-type="family">
									<!-- SGIS4_생활권역 시작 --><a href="javascript:void(0);" class="dep_btn02 w69">가구</a><!-- SGIS4_생활권역 끝 -->
									<div class="grid_navbg">
										<div class="clearfix grid_wrap02 gridFamilyList bundle">
<!-- 											<a href="javascript:void(0);" class="btn01 pm91 allowM" value="00">전체가구</a> -->
											<div class="clearfix">
											<!-- SGIS4_1025_생활권역 시작 -->
												<a href="javascript:void(0);" class="btn05 pm91_1over3 bundle_main" data-bundle-nm="A" value="">친족 가구</a>
												<a href="javascript:void(0);" class="btn05 pm91_1over3" value="A0">1인 가구</a>
												<a href="javascript:void(0);" class="btn05 pm91_1over3" value="B0">비친족 가구</a>
											<!-- SGIS4_1025_생활권역 끝 -->	
											</div>											
											<div class="ct_line2_b"></div>
											<div class="clearfix">
												<a href="javascript:void(0);" class="btn05_sub pm91_1over3 bundle_sub" data-bundle-nm="A" value="01">1세대 가구</a>
												<a href="javascript:void(0);" class="btn05_sub pm91_1over3 bundle_sub" data-bundle-nm="A" value="02">2세대 가구</a>
												<a href="javascript:void(0);" class="btn05_sub pm91_1over3 bundle_sub" data-bundle-nm="A" value="03">3세대 가구</a>
												<a href="javascript:void(0);" class="btn05_sub pm91_1over3 bundle_sub" data-bundle-nm="A" value="04">4세대 이상 가구</a>
											</div>
										</div>
									</div>							
								</li>
								<li id="house" data-stat-type="house">
									<!-- SGIS4_생활권역 시작 --><a href="javascript:void(0);" class="dep_btn03 w69">주택</a><!-- SGIS4_생활권역 끝 -->
									<div class="grid_navbg">
										<div class="clearfix grid_wrap02">
											<!-- SGIS4_1210 추가 시작 -->
											<div class="clearfix div_houseType">
												<a href="javascript:void(0);" class="con_chk on va_top" title="주택종류 선택">주택종류</a>
												<a href="javascript:void(0);" class="con_chk off va_top" title="주택종류 해제">주택종류</a>												
												<div class="div_houseTypeBox gridHouseList">
	<!-- 												<a href="javascript:void(0);" class="btn01 pm92 allowM" value="00">전체주택</a> -->
												</div>
											</div>
											<!-- SGIS4_1210 추가 끝 -->												
											<div class="ct_line2_b"></div>
											<div class="clearfix div_constYear">
												<a href="javascript:void(0);" class="con_chk on" title="건축년도 선택">건축년도</a>
												<a href="javascript:void(0);" class="con_chk off" title="건축년도 해제">건축년도</a>											
												<select class="selct_07 select_constYear constYear_mem">
												    <option value="">선택하세요</option>
												</select>
											</div>											
											<div class="ct_line2"></div>
											<div class="clearfix div_houseBdspace">
												<a href="javascript:void(0);" class="con_chk on" title="연면적 선택">연면적</a>
												<a href="javascript:void(0);" class="con_chk off" title="연면적 해제">연면적</a>
												<select class="selct_07 selct_houseTotArea houseBdspace_mem">
												    <option value="">선택하세요</option>
												</select>
<!-- 												<select id="houseTotAreaFrom" class="selct_08 selct_hta_from houseBdspace_mem"></select> -->
<!-- 												<span class="cond_subMsg"> 초과 ~ </span> -->
<!-- 												<select id="houseTotAreaTo" class="selct_08 selct_hta_to houseBdspace_mem"></select> -->
<!-- 												<span id="houseTotAreaToText" class="cond_subMsg"> 이하</span> -->
											</div>
<!-- 											<div class="trans_Msg"> -->
<!-- 												<span class="houseTotAreaFrom"></span> -->
<!-- 												<span class="cond_subMsg"> 초과 ~ </span> -->
<!-- 												<span class="houseTotAreaTo"></span> -->
<!-- 												<span class="houseTotAreaToText cond_subMsg"> 이하</span>											 -->
<!-- 											</div> -->
<!-- 											<div id="slider-range_area1" class="slider-range houseBdspace_slider_mem"></div> -->
<!-- 											<ul class="slider_controll_bar_long"> -->
<!-- 												<li>0</li> -->
<!-- 												<li style="margin-left: -12px;">20</li> -->
<!-- 												<li style="margin-left: -12px;">40</li> -->
<!-- 												<li style="margin-left: -14px;">60</li> -->
<!-- 												<li style="margin-left: -14px;">85</li> -->
<!-- 												<li style="margin-left: -14px;">100</li> -->
<!-- 												<li style="margin-left: -14px;">130</li> -->
<!-- 												<li style="margin-left: -14px;">165</li> -->
<!-- 												<li style="margin-left: -12px;">230</li> -->
<!-- 												<li style="margin-left: -18px;">+</li> -->
<!-- 											</ul>																							 -->
											<div class="ct_line2"></div>
											<!-- SGIS4_1025_생활권역 시작 -->
											<p class="hp"><span>주택종류, 건축년도, 연면적 중 한 가지 조건만 선택할 수 있습니다.</span></p>
											<!-- SGIS4_1025_생활권역 끝 -->
										</div>
									</div>								
								</li>
<!-- SGIS4_생활권역 시작 -->								
								<li id="copr" data-stat-type="copr">
									<a href="javascript:void(0);" class="dep_btn04 w69">사업체</a>
									<div class="grid_navbg">
										<div class="clearfix grid_wrap02">
											<div class="clearfix">
												<!-- SGIS4_1025_생활권역 시작 -->	
												<a href="javascript:void(0);" class="btn06 pm91_1over3_2 mustBeOne" data-grdstat-type="tabAll">전체</a>
												<a href="javascript:void(0);" class="btn06 pm91_1over3_2 mustBeOne" data-grdstat-type="tabFavorites">주요 생활업종</a>
												<a href="javascript:void(0);" class="btn06 pm91_1over3_2 mustBeOne" data-grdstat-type="tabIndustryClass">산업분류 검색</a>
												<!-- SGIS4_1025_생활권역 끝 -->	
											</div>
											<div class="ct_line3_b"></div>
											<!-- SGIS4_1025_생활권역 시작 -->	
											<div class="clearfix mt10 allCont">
												<p>총 사업체 수를 조회합니다.</p>
											</div>
											<!-- SGIS4_1025_생활권역 끝 -->
											<div class="clearfix mt10 favorCont">
												<div class="scroll_wrap">
													<div class="clearfix lifeBizList">
													</div>
													<!-- <div class="clearfix favorlist"></div> -->													
												</div>
												<div class="ct_line3"></div>
												<span class="li_info">한국표준산업분류를 실생활에서 쉽게 이해할 수 있는 명칭으로 재분류한 주요 생활업종을 제공합니다.</span>
												<a href="javascript:void(0);" class="favor_i"></a>												
											</div>
											<!-- SGIS4_0629_생활권역 시작 -->
											<div class="clearfix mt10 classCont" data-ksic-sel-cd="" data-ksic-sel-nm="" data-ksic-sel-main-cd="">
											<!-- SGIS4_0629_생활권역 끝 -->
												<a href="javascript:void(0);" class="btn_selectKSIC" id="ksicCoprGrdBtn">한국산업표준분류 검색</a>
												<a href="javascript:void(0);" class="btn_clearKSIC">선택 초기화</a>
												<div class="clearfix clsSet mainCl unSel" data-ksic-sel-cd="" data-ksic-sel-nm="">
													<span class="li_title addDot">대분류</span>
													<span class="li_conts mightOverflow">미선택</span>												
												</div>
												<div class="ct_line3"></div>
												<div class="clearfix clsSet middleCl unSel" data-ksic-sel-cd="" data-ksic-sel-nm="">
													<span class="li_title addDot">중분류</span>
													<span class="li_conts mightOverflow">미선택</span>													
												</div>
												<div class="ct_line3"></div>
												<div class="clearfix clsSet subCl unSel" data-ksic-sel-cd="" data-ksic-sel-nm="">
													<span class="li_title addDot">소분류</span>
													<span class="li_conts mightOverflow">미선택</span>													
												</div>
												<div class="ct_line3"></div>
												<div class="clearfix clsSet subDiv1 unSel" data-ksic-sel-cd="" data-ksic-sel-nm="">
													<span class="li_title addDot">세분류</span>
													<span class="li_conts mightOverflow">미선택</span>													
												</div>
												<div class="ct_line3"></div>
												<div class="clearfix clsSet subDiv2 unSel" data-ksic-sel-cd="" data-ksic-sel-nm="">
													<span class="li_title addDot">세세분류</span>
													<span class="li_conts mightOverflow">미선택</span>													
												</div>
												<div class="ct_line3"></div>
												<span class="li_info">한국산업표준분류 검색에서 산업분류를 선택해 주세요.</span>																							
											</div>
											
											<!--
											<a href="javascript:void(0);" class="coprD_chk on" title="세부 조건 설정">세부 조건 설정 (분야, 중분류, 소분류 모두 선택)</a>
											<a href="javascript:void(0);" class="coprD_chk off" title="세부 조건 해제">세부 조건 설정</a>
											<div class="clearfix mt10 copr_theme_con">
												<c:forEach items="${paramInfo.largeClassList}" var="item">
													<a href="javascript:void(0);" id="${item.factype_lclas_cd}" class="btn01 pm91 lclas_btn_group" data-large-class="${item.factype_lclas_cd }">${item.factype_lclas_nm }</a>
												</c:forEach>
												<div class="ct_line3_b"></div>
												<div class="clearfix">
													<span class="cond_title">중분류</span>
													<select class="detailSelectBox first selct_07">
													    <option value="">선택하세요</option>
													</select>												
												</div>
												<div class="ct_line3"></div>
												<div class="clearfix">
													<span class="cond_title">소분류</span>
													<select class="detailSelectBox second selct_07">
													    <option value="">선택하세요</option>
													</select>												
												</div>
											</div>
											-->
										</div>
									</div>								
								</li>
								<li id="employee" data-stat-type="employee">
									<a href="javascript:void(0);" class="dep_btn06 w69">종사자</a>
									<div class="grid_navbg">
										<div class="clearfix grid_wrap02">
											<div class="clearfix">
												<!-- SGIS4_1025_생활권역 시작 -->	
												<a href="javascript:void(0);" class="btn06 pm91_1over3_2 mustBeOne" data-grdstat-type="tabAll">전체</a>
												<a href="javascript:void(0);" class="btn06 pm91_1over3_2 mustBeOne" data-grdstat-type="tabFavorites">주요 생활업종</a>
												<a href="javascript:void(0);" class="btn06 pm91_1over3_2 mustBeOne" data-grdstat-type="tabIndustryClass">산업분류 검색</a>
												<!-- SGIS4_1025_생활권역 끝 -->	
											</div>
											<div class="ct_line3_b"></div>
											<!-- SGIS4_1025_생활권역 시작 -->	
											<div class="clearfix mt10 allCont">
												<p>총 종사자 수를 조회합니다.</p>
											</div>
											<!-- SGIS4_1025_생활권역 끝 -->
											<div class="clearfix mt10 favorCont">
												<div class="scroll_wrap">
													<div class="clearfix lifeBizList">
													</div>
													<!-- <div class="clearfix favorlist"></div> -->	
												</div>
												<div class="ct_line3"></div>
												<span class="li_info">한국표준산업분류를 실생활에서 쉽게 이해할 수 있는 명칭으로 재분류한 주요 생활업종을 제공합니다.</span>
												<a href="javascript:void(0);" class="favor_i"></a>												
											</div>
											<!-- SGIS4_0629_생활권역 시작 -->
											<div class="clearfix mt10 classCont" data-ksic-sel-cd="" data-ksic-sel-nm="" data-ksic-sel-main-cd="">
											<!-- SGIS4_0629_생활권역 끝 -->
												<a href="javascript:void(0);" class="btn_selectKSIC" id="ksicEmplGrdBtn">한국산업표준분류 검색</a>
												<a href="javascript:void(0);" class="btn_clearKSIC">선택 초기화</a>
												<div class="clearfix clsSet mainCl unSel" data-ksic-sel-cd="" data-ksic-sel-nm="">
													<span class="li_title addDot">대분류</span>
													<span class="li_conts mightOverflow">미선택</span>												
												</div>
												<div class="ct_line3"></div>
												<div class="clearfix clsSet middleCl unSel" data-ksic-sel-cd="" data-ksic-sel-nm="">
													<span class="li_title addDot">중분류</span>
													<span class="li_conts mightOverflow">미선택</span>													
												</div>
												<div class="ct_line3"></div>
												<div class="clearfix clsSet subCl unSel" data-ksic-sel-cd="" data-ksic-sel-nm="">
													<span class="li_title addDot">소분류</span>
													<span class="li_conts mightOverflow">미선택</span>													
												</div>
												<div class="ct_line3"></div>
												<div class="clearfix clsSet subDiv1 unSel" data-ksic-sel-cd="" data-ksic-sel-nm="">
													<span class="li_title addDot">세분류</span>
													<span class="li_conts mightOverflow">미선택</span>													
												</div>
												<div class="ct_line3"></div>
												<div class="clearfix clsSet subDiv2 unSel" data-ksic-sel-cd="" data-ksic-sel-nm="">
													<span class="li_title addDot">세세분류</span>
													<span class="li_conts mightOverflow">미선택</span>													
												</div>
												<div class="ct_line3"></div>
												<span class="li_info">한국산업표준분류 검색에서 산업분류를 선택해 주세요.</span>																							
											</div>
										</div>									
									</div>								
								</li>																	
<!-- SGIS4_생활권역 끝 -->								
								<li id="idlv" data-stat-type="idlv">
									<a href="javascript:void(0);"  class="dep_btn05 w75">공시지가</a>
									<div class="grid_navbg">
										<div class="clearfix grid_wrap02">
											<a href="javascript:void(0);" class="btn01 pm01 active noTogl">공시지가</a>
<!-- 											<a href="javascript:void(0);" class="btn01 pm01">없음</a> -->
										</div>
									</div>									
								</li>
							</ul>
						</div>
						<!-- //격자 통계 조건 설정 -->
						<!-- SGIS4_1025_생활권역_상세분석 시작 -->	
						<div class="grid_compare" id="detail_pane">
							<label id="detail_label">공간적/시간적 비교</label>		<!-- SGIS4_1027_생활권역 --> 
					 	 	<a href="javascript:void(0);" class="btn_toggle off" title="off" id="gridDataType03"><img src="/images/catchmentArea/btn_off.png" alt="off"></a>
							<a href="javascript:void(0);" class="btn_toggle on zxc" title="on" id="gridDataType03"><img src="/images/catchmentArea/btn_on.png" alt="on" style = display: none;></a>
					 	</div>
					 	<!-- 상세분석 조건설정 -->
						<div class="chk_result mT20" >
							<!-- SGIS4_1001_생활권역 시작 -->
							<div class="grid_setting grid_setting_02">
							<!-- SGIS4_1001_생활권역 끝 -->
								<ul class="clearfix grid_depth1 mH180" id="detail_analysis_tab" style="top:-6px;">
									<li class="active" id="detailedAnal01" data-detail-anal-type="spatial">
										<a href="javascript:void(0);" class="w118">공간적 비교</a>	<!-- SGIS4_1027_생활권역 --> 
										<div class="grid_navbg">
											<div class="clearfix grid_wrap02">
												<span class="btn03 pm08 txt_B"><img src="/images/catchmentArea/sel_ico01.png" class="grd_ico01">위치1</span>
												<span class="grd_txt01" id="detail_location_compare_1">수원 월드컵경기장</span>
												<div class="ct_line"></div>
												<span class="btn03 pm08 txt_B"><img src="/images/catchmentArea/sel_ico01.png" class="grd_ico01">위치2</span>
												<span class="grd_txt02 mightOverflow" id="detail_location_compare_2">미지정</span>
												<a href="javascript:void(0);" class="grd_btn01" id="area_popbtn">위치설정</a>
											</div>
										</div>
									</li>
									<li id="detailedAnal02" data-detail-anal-type="year">
										<a href="javascript:void(0);" class="w118">시간적 비교</a>	<!-- SGIS4_1027_생활권역 --> 
										<div class="grid_navbg">
											<div class="clearfix grid_wrap02">
												<span class="btn03 pm08 txt_B"><img src="/images/catchmentArea/sel_ico02.png" class="grd_ico01">연도1</span>
												<select class="selct_93" id="year_select1" style="width: 100px;"></select>
												<span class="grd_txt01" id="detail_year_compare_1" style="display:none;">미지정</span>
												<div class="ct_line"></div>
												<span class="btn03 pm08 txt_B"><img src="/images/catchmentArea/sel_ico02.png" class="grd_ico01">연도2</span>
												<select class="selct_93" id="year_select2" style="width: 100px;"></select>
												<span class="grd_txt02" id="detail_year_compare_2" style="display:none;">미지정</span>
												<!-- <a href="javascript:void(0);" class="grd_btn01" id="year_popbtn">연도설정</a> --> <!-- 시간적 비교분석을 하기위한 프로세스가 변했다. 그러므로 더 이상 이 버튼의 필요가 없다. 주석처리. - 박상언 2020-10-20 작성 -->
											</div>
										</div>
									</li>
									<li id="detailedAnal03">
										<a href="javascript:void(0);" class="w112">상관관계 분석</a>
										<div class="grid_navbg">
											<div class="clearfix grid_wrap02" id="correlationWrap">
												<p class="grd_txt03">선택한 통계 조건들의 상관관계를 분석합니다.</p>
												<a href="javascript:void(0);" class="grd_btn03" id="correlation_popbtn">조건설정</a>
												<div id="schCondByCorrelList" class="clearfix">
												</div>
	<!-- 											<div id="schCondByCorrelList" class="multi_cond_box correl"> -->
	<!-- 												<ul> -->
	<!-- 													<li data-correlation-cond=""> -->
	<!-- 														<a href="javascript:void(0);">[조건설정] 버튼을 클릭하여 통계 조건을 추가합니다.</a> -->
	<!-- 													</li>	 -->
	<!-- 												</ul> -->
	<!-- 											</div>											 -->
											</div>										
										</div>									
									</li>
								</ul>
								<!-- <a href="javascript:void(0);" class="btn_view" id="detailAnalysisViewBtn">상세분석 보기</a> SGIS4_생활권역 상세분석-->
							</div>
						</div>
						<!-- 상세분석 조건설정 -->		 
					 	<!-- SGIS4_1025_생활권역_상세분석 끝 -->
					</div>
					<!-- //확장버튼 클릭시 확장영역 -->
<!-- 					<div> -->
<!-- 						<a href="javascript:void(0);" class="bord_chk on" title="생활권역 경계 표시">생활권역 경계 표시</a> -->
<!-- 						<a href="javascript:void(0);" class="bord_chk off" title="생활권역 경계  감추기">생활권역 경계 표시</a>	 -->
<!-- 					</div>				 -->
				</div>
				<!-- //격자 섹션 -->

				<!-- 상세분석 섹션 -->
<% /* %>				
				<div class="search_result chk chk_03" style="border-bottom:none;">
					<h3><span>상세분석</span> (1개 단일선택)</h3>
					<a href="javascript:void(0);" class="btn_toggle off" title="off" id="gridDataType03"><img src="/images/catchmentArea/btn_off.png" alt="off"></a>
					<a href="javascript:void(0);" class="btn_toggle on" title="on"><img src="/images/catchmentArea/btn_on.png" alt="on"></a>
					<!-- 거리 선택 -->
					<div class="chk_group" id="statsType03">
						<ul class="clearfix"></ul>
						<a href="javascript:void(0);" class="more more_bt03" title="확장"><span class="hide">확장</span></a>
					</div>
					<!-- //거리 선택 -->
					<!-- 상세분석 조건설정 -->
					<div class="chk_result mT20" >
						<div class="grid_setting">
							<ul class="clearfix grid_depth1 mH180" id="detail_analysis_tab" style="top:-6px;">
								<li class="active" id="detailedAnal01" data-detail-anal-type="spatial">
									<a href="javascript:void(0);" class="w118">공간적 비교</a>	<!-- SGIS4_1027_생활권역 --> 
									<div class="grid_navbg">
										<div class="clearfix grid_wrap02">
											<span class="btn03 pm08 txt_B"><img src="/images/catchmentArea/sel_ico01.png" class="grd_ico01">위치1</span>
											<span class="grd_txt01" id="detail_location_compare_1">수원 월드컵경기장</span>
											<div class="ct_line"></div>
											<span class="btn03 pm08 txt_B"><img src="/images/catchmentArea/sel_ico01.png" class="grd_ico01">위치2</span>
											<span class="grd_txt02 mightOverflow" id="detail_location_compare_2">미지정</span>
											<a href="javascript:void(0);" class="grd_btn01" id="area_popbtn">위치설정</a>
										</div>
									</div>
								</li>
								<li id="detailedAnal02" data-detail-anal-type="year">
									<a href="javascript:void(0);" class="w118">시간적 비교</a>	<!-- SGIS4_1027_생활권역 --> 
									<div class="grid_navbg">
										<div class="clearfix grid_wrap02">
											<span class="btn03 pm08 txt_B"><img src="/images/catchmentArea/sel_ico02.png" class="grd_ico01">연도1</span>
											<select class="selct_93" id="year_select1" style="width: 100px;"></select>
											<span class="grd_txt01" id="detail_year_compare_1" style="display:none;">미지정</span>
											<div class="ct_line"></div>
											<span class="btn03 pm08 txt_B"><img src="/images/catchmentArea/sel_ico02.png" class="grd_ico01">연도2</span>
											<select class="selct_93" id="year_select2" style="width: 100px;"></select>
											<span class="grd_txt02" id="detail_year_compare_2" style="display:none;">미지정</span>
											<!-- <a href="javascript:void(0);" class="grd_btn01" id="year_popbtn">연도설정</a> --> <!-- 시간적 비교분석을 하기위한 프로세스가 변했다. 그러므로 더 이상 이 버튼의 필요가 없다. 주석처리. - 박상언 2020-10-20 작성 -->
										</div>
									</div>
								</li>
								<li id="detailedAnal03">
									<a href="javascript:void(0);" class="w112">상관관계 분석</a>
									<div class="grid_navbg">
										<div class="clearfix grid_wrap02" id="correlationWrap">
											<p class="grd_txt03">선택한 통계 조건들의 상관관계를 분석합니다.</p>
											<a href="javascript:void(0);" class="grd_btn03" id="correlation_popbtn">조건설정</a>
											<div id="schCondByCorrelList" class="clearfix">
											</div>
<!-- 											<div id="schCondByCorrelList" class="multi_cond_box correl"> -->
<!-- 												<ul> -->
<!-- 													<li data-correlation-cond=""> -->
<!-- 														<a href="javascript:void(0);">[조건설정] 버튼을 클릭하여 통계 조건을 추가합니다.</a> -->
<!-- 													</li>	 -->
<!-- 												</ul> -->
<!-- 											</div>											 -->
										</div>										
									</div>									
								</li>
							</ul>
							<a href="javascript:void(0);" class="btn_view" id="detailAnalysisViewBtn">상세분석 보기</a>
						</div>
					</div>
					<!-- 상세분석 조건설정 -->
				</div>
<% */ %>				
			<!-- //상세분석 섹션 -->
			</div>
			<!-- SGIS4_1025_생활권역 시작 -->
			<div class="stats_footer">
				<a href="javascript:void(0);" class="stats_btn_select" id="stats_search_btn">조회</a>
			</div>
			<!-- SGIS4_1025_생활권역 끝 -->			
			<a href="javascript:void(0);" class="close_btn"><img src="/images/catchmentArea/close_ico.png" alt="창닫기"></a>
		</div>
		<!-- //통계 -->
		<!-- 연도설정 팝업 -->
<!-- 		<div class="layer_pop05 chk_03_mem" id="date_search_box"> -->
<!-- 			<a href="javascript:void(0);" class="close"><img src="/images/catchmentArea/close_ico02.png"></a> -->
<!-- 			<h4 style="display: block;">비교연도설정</h4> -->
<!-- 			<div class="ct_line"></div> -->
<!-- 			<!-- <a class="btn02 pm09" href="javascript:void(0);">2015</a> -->
<!-- 			<a class="btn02 pm09" href="javascript:void(0);">2016</a> -->
<!-- 			<a class="btn02 pm09" href="javascript:void(0);">2017</a> -->
<!-- 			<a class="btn02 pm09" href="javascript:void(0);">2018</a> -->
<!-- 			<a class="btn02 pm09" href="javascript:void(0);">2019</a> --> -->
<!-- 			<a href="javascript:void(0);" class="btn03 pm08 txt_B"><img src="/images/catchmentArea/sel_ico02.png" class="grd_ico01">연도1</a> -->
<!-- 			<select class="selct_01" id="year_select1" style="width: 100px;"> -->
<!-- 			    <option value="0">연도 선택</option> -->
<!-- 			</select> -->
<!-- 			<a href="javascript:void(0);" class="btn03 pm08 txt_B" style="margin-left: 10px"><img src="/images/catchmentArea/sel_ico02.png" class="grd_ico01">연도2</a> -->
<!-- 			<select class="selct_01" id="year_select2" style="width: 100px;"> -->
<!-- 			    <option value="0">연도 선택</option> -->
<!-- 			</select> -->
<!-- 			<div class="btn_wrap"> -->
<!-- 				<a href="javascript:void(0);" id="detail_year_btn_select">확인</a> -->
<!-- 				<a href="javascript:void(0);" id="detail_year_btn_cancel">취소</a> -->
<!-- 			</div> -->
<!-- 		</div> -->
		<!-- //연도설정 팝업 -->
		<!-- 위치설정팝업 -->
		<div class="layer_pop06 chk_03_mem" id="spatial_position_search_box">
			<a href="javascript:void(0);" class="close"><img src="/images/catchmentArea/close_ico02.png"></a>
			<div id="wrapperForDetailSpatialSearchHeader">	<!-- wrapper 추가 (시작) - 박상언 2020-10-15 작성 -->
				<a href="javascript:void(0);" class="btn03 pm10 txt_B"><img src="/images/catchmentArea/sel_ico01.png" class="grd_ico01">위치2</a>
				<h2 class="mightOverflow" id="spatialSearchHeader" data-loc-cd="" data-loc-nm="">대전 서구 둔산동</h2>
				<span class="sm_txt">현재 지도 위치</span>
			</div>	<!-- wrapper 추가 (끝) - 박상언 2020-10-15 작성 -->
			<div class="search_select">
				<select name="sido_spatial" id="sido_spatial" class="selct_02" title="시도선택" selected="selected"></select>
				<select name="sgg_spatial" id="sgg_spatial" class="selct_02" title="시군구선택" selected="selected"></select>
				<select name="emd_spatial" id="emd_spatial" class="selct_02" title="읍면동선택" selected="selected"></select>
				<div class="search_type">
					<input type="radio" id="schTypeGbB01" name="schTypeGbB" ><label for="schTypeGbB01">상단에 지정된 행정구역 기준 검색</label>
					<input type="radio" id="schTypeGbB02" name="schTypeGbB" ><label for="schTypeGbB02">현재 보이는 화면 내에서 검색</label>				
				</div>				
			</div>
			<!-- SGIS4_1025_생활권역 시작 -->
			<div id="spatialSearchWordDiv" style="position: absolute; z-index: 1001; background-color: white; display: none; left: 343px; top: 195px; width: 600px; border: 1px solid; border-bottom-color: white;"></div>
			<div id="spatialSearchWordDiv1Page" style="position: absolute; display: none; z-index: 1000; background-color: white; left: 343px; width: 600px; top: 195px; border-bottom: 1px solid;; border-left: 1px solid;; border-right: 1px solid; background-color: javascript:void(0);f8f8f8;"></div>
						
			<div class="search_result_box scroll_wrap scroll_12">
			<div class="search_result">
				<h3 class="h3_search2"><span>검색</span> 또는 <span>지도</span>에서 지점 선택</h3>
			<!-- SGIS4_1025_생활권역 끝 -->	
				<input type="text" id="spatialSearchWord" class="search_inp">
				<a href="javascript:void(0);" id="searchWordBtn_sp" class="map_ico02"></a>
				<!-- SGIS4_1025_생활권역 시작 -->
				<!--
				<div id="spatialSearchWordDiv" style="position: absolute; z-index: 1001; background-color: white; display: none; left: 20px; top: 220px; width: 600px; border: 1px solid; border-bottom-color: white;"></div>
				<div id="spatialSearchWordDiv1Page" style="position: absolute; display: none; z-index: 1000; background-color: white; left: 20px; width: 600px; top: 220px; border-bottom: 1px solid;; border-left: 1px solid;; border-right: 1px solid; background-color: javascript:void(0);f8f8f8;"></div>
				-->
				<!-- SGIS4_1025_생활권역 끝 -->
				<a href="javascript:void(0);" id="searchPoi_spatial" class="map_ico"><img src="/images/catchmentArea/search_ico2.png" alt="지도클릭"></a>
				<h3 class="h3_search"><span>시설 유형</span>으로 지점 선택</h3>
				<!-- SGIS4_1025_생활권역 시작 -->
				<!--<div id="facilityTypeSearch_for_Spatial" class="scroll_wrap scroll_08 facility_type_box">-->
				<div id="facilityTypeSearch_for_Spatial" class="facility_type_box">
				<!-- SGIS4_1025_생활권역 끝 -->
					<c:forEach items="${paramInfo.largeClassList}" var="data" varStatus="outerStatus">
						<div class="sisul_wrap${outerStatus.index % 4}" id="${data.factype_lclas_cd}" value="${data.factype_lclas_nm}">
							<c:set var="grpMemNum" value="0"/>
							<h4 class="h4_ico${outerStatus.index % 4}_New">${data.factype_lclas_nm}</h4>											
							<c:forEach items="${paramInfo.facilityList}" var="list" varStatus="innerStatus">
								<c:if test="${list.factype_lclas_cd eq data.factype_lclas_cd}">
									<c:set var="grpMemNum" value="${grpMemNum + 1}"/>
									<c:choose>
										<c:when test="${grpMemNum > 6 and (grpMemNum % 3) eq 1}">
											<a href="javascript:void(0);" class="option_btn w103 mL36" id="${list.code}" data-factype-nm="${list.name}">${list.name}
										</c:when>
										<c:otherwise>
											<a href="javascript:void(0);" class="option_btn w103" id="${list.code}" data-factype-nm="${list.name}">${list.name}
										</c:otherwise>									
									</c:choose>
												<c:if test="${not empty list.srv_div}">
													<c:choose>
														<c:when test="${list.srv_div eq '01' or list.srv_div eq '02' or list.srv_div eq '03' or list.srv_div eq '04'}">
															<div class="fav_ico${list.srv_div}_2"></div>
														</c:when>
														<c:otherwise>
															<span class="bc99 fav_ico">${list.srv_div_nm}</span>
														</c:otherwise>													
													</c:choose>
												</c:if>
											</a>
								</c:if>
							</c:forEach>				
						</div>
					</c:forEach>
<%-- 20201113_변경 요청 전 --%>				
					<%--<c:forEach items="${paramInfo.largeClassList}" var="data" varStatus="status">
				        <c:choose>
				            <c:when test="${status.index eq 0}">
				                <h4 class="h4_ico05_h">${data.factype_lclas_nm}</h4>
				            </c:when>
				            <c:otherwise>
				                <h4 class="h4_ico05">${data.factype_lclas_nm}</h4>
				            </c:otherwise>						
				        </c:choose>						
				        <div id="${data.factype_lclas_cd}" value="${data.factype_lclas_nm}">
				            <c:forEach items="${paramInfo.facilityList}" var="list">
				                <c:if test="${list.factype_lclas_cd eq data.factype_lclas_cd}">
				                    <p class="option_btn w116" id="${list.code}" data-factype-nm="${list.name}">${list.name}
										<c:if test="${list.srv_div eq '01'}">
											<span class="bc01 list_tag">${list.srv_div_nm}</span>
										</c:if>
										<c:if test="${list.srv_div eq '02'}">
											<span class="bc02 list_tag">${list.srv_div_nm}</span>
										</c:if>
										<c:if test="${list.srv_div eq '03'}">
											<span class="bc03 list_tag">${list.srv_div_nm}</span>
										</c:if>
										<c:if test="${list.srv_div eq '04'}">
											<span class="bc04 list_tag">${list.srv_div_nm}</span>
										</c:if>				                    
				                    </p>
				                </c:if>
				            </c:forEach>
				        </div>
				    </c:forEach> --%>
				</div>

				<!-- SGIS4_1025_생활권역_나의데이터 시작  -->
				<div>
					<h3 class="h3_search" style="margin-bottom: 10px;"><span>나의 데이터</span>로 지점 선택<a id="myDataInfo" data-subj="나의 데이터로 지점 선택" title="통계청 통계정보시스템 통합회원으로 로그인 후,<br>SGIS포털 > 마이페이지 > 나의 데이터에 자료를 등록하면<br>나의 데이터를 활용하여 지점을 선택할 수 있습니다."><img style="margin-left:4px;" src="/images/catchmentArea/question_icon.png" alt="도움말"></a>
					<a href="/view/mypage/myData/dataList" style="float: right; font-size:14px;"><u>나의 데이터 이동</u></a>
					</h3>
					<!-- 비로그인  -->
					<div class="mydataBox" id="spatial_myData_1" style="display:none;">로그인 후, 나의 데이터를 등록하면<br>해당 지점을 영역 생성 지점으로 선택할 수 있습니다.</div>
					<!-- 로그인 & 나의 데이터 없음  -->
					<div class="mydataBox" id="spatial_myData_2" style="display:none;">SGIS 나의 데이터에 나만의 POI를 등록하여 생활권역 생성 지점으로 활용할 수 있습니다.</div>
					<!-- 로그인 & 나의 데이터 있음 -->
					<div class="chk_result" id="spatial_myData_3" style="display:block;">
						<!--  <p>나의 데이터에 저장된 목록</p>-->
						<div class="scroll_wrap mCustomScrollbar _mCS_2" style="width:366px;">
							<ul id="spatial_myDataList"></ul>
						</div>
						<!--  
						<div class="chk_box">
							<button type="button" class="pt15">선택 데이터 지도 표출</button>
						</div>
						-->
					</div>
				</div>
				<!-- SGIS4_1025_생활권역_나의데이터  끝 -->	
				</div>
			</div>
		</div>
		<!-- //위치설정팝업 -->
		<!-- [START] 상세기능 > 공간분석 > 위치 검색 - 중심 시설유형으로 찾기 선택 후 상세보기 div -->
		<div class="search_wrap spatial_sisul chk_03_mem" id="facilityTypeSearchDatail_for_spatial">
<!-- 			<a href="javascript:void(0);" class="close_btn_spatial"><img src="/images/catchmentArea/close_ico.png" alt="창닫기"></a> -->
			<div class="popTitleBar">
				<a href="javascript:void(0);" class="close"><img src="/images/catchmentArea/close_ico02.png"></a>
			</div>
			<a href="javascript:void(0);"><h2 id="mapLocation_sp" class="h2_2 back_btn map2">대전 서구 둔산동</h2></a><span class="sm_txt02">현재 지도 위치</span>
			<div class="search_result02">
				<div class="location">
					<span class="cate01_sp">시설 유형</span>
					<span class="cate02_sp"></span>
					<span class="cate03_sp" id="ftsdText_sp"></span>
				</div>
				<div class="scroll_wrap scroll_10">
					<div id="totalSearchResult_sp">
						<!-- 검색결과 리스트 -->
					</div>
				</div>
			</div>
		</div>
		<!-- [END] 상세기능 > 공간분석 > 위치 검색 - 중심 시설유형으로 찾기 선택 후 상세보기 div -->
		
		<!-- [START] 공간비교 상세분석 조건조회 선택창 -->
		<div class="layer_pop07 chk_03_mem" id="detail_condition_select_box" style="z-index: 10001">
			<select class="selct_06" id="bYearSel04"></select>
			<a href="#" class="close"><img src="/images/catchmentArea/close_ico02.png"></a>
			<div class="grid_setting">
				<h4>상세분석 비교 조건 설정</h4>
					<ul class="clearfix grid_depth2_less1k" id="gridSettingForDetailLess1k">
						<li class="active" data-stat-type="pops">
							<a href="javascript:void(0);" class="dep_btn71 w69" data-base-year-depends='1'>인구</a>
							<div class="grid_navbg">
								<div class="clearfix">
									<p>생활권역 영역의 면적이 100㎢ 이하에서는 주제별 총값만 제공합니다.</p>
								</div>
							</div>
						</li>
						<li data-stat-type="family">
							<a href="javascript:void(0);" class="dep_btn71 w69" data-base-year-depends='1'>가구</a>								
							<div class="grid_navbg">
								<div class="clearfix">
									<p>생활권역 영역의 면적이 100㎢ 이하에서는 주제별 총값만 제공합니다.</p>
								</div>
							</div>
						</li>
						<li data-stat-type="house">
							<a href="javascript:void(0);" class="dep_btn71 w69" data-base-year-depends='1'>주택</a>								
							<div class="grid_navbg">
								<div class="clearfix">
									<p>생활권역 영역의 면적이 100㎢ 이하에서는 주제별 총값만 제공합니다.</p>
								</div>
							</div>
						</li>								
						<li data-stat-type="copr">
							<a href="javascript:void(0);" class="dep_btn72 w69" data-base-year-depends='2'>사업체</a>								
							<div class="grid_navbg">
								<div class="clearfix">
									<p>생활권역 영역의 면적이 100㎢ 이하에서는 주제별 총값만 제공합니다.</p>
								</div>
							</div>
						</li>								
						<li data-stat-type="employee">
							<a href="javascript:void(0);" class="dep_btn72 w69" data-base-year-depends='2'>종사자</a>								
							<div class="grid_navbg">
								<div class="clearfix">
									<p>생활권역 영역의 면적이 100㎢ 이하에서는 주제별 총값만 제공합니다.</p>
								</div>
							</div>
						</li>																																
					</ul>				
					<ul class="clearfix grid_depth1" id="gridSettingForDetail">
						<li class="active" data-stat-type="pops">
							<a href="#" class="dep_btn01 w51" data-base-year-depends='1'>인구</a>
							<div class="grid_navbg">
								<div class="clearfix grid_wrap02">
									<div>
										<span class="cond_title">성별</span>
										<select id="select_genger_detail" class="selct_07 select_genger">
											<option value="00">전체</option>
											<option value="1">남자</option>
											<option value="2">여자</option>
										</select>
									</div>
									<div class="ct_line3"></div>
									<div>
										<span class="cond_title">연령</span>
										<div class="div_age_box">
											<div class="div_age_all">
												<a href="javascript:void(0);" class="age_all_chk on" title="연령 전체 선택">전체</a>
												<a href="javascript:void(0);" class="age_all_chk off" title="연령 전체 해제">전체</a>
											</div>
											<div class="div_age_single5">
												<a href="javascript:void(0);" class="age_single_chk on" title="5세 단위 선택">5세 단위</a>
												<a href="javascript:void(0);" class="age_single_chk off" title="5세 단위 해제">5세 단위</a>
												<select id="select_age5_detail" class="selct_77 select_age5 age_single_mem"></select>
											</div>
											<div class="div_age_single10">
												<a href="javascript:void(0);" class="age_single_chk on" title="10세 단위 선택">10세 단위</a>
												<a href="javascript:void(0);" class="age_single_chk off" title="10세 단위 해제">10세 단위</a>
												<select id="select_age10_detail" class="selct_77 select_age10 age_single_mem"></select>
											</div>
											<div class="div_age_singleRnd">
												<a href="javascript:void(0);" class="age_single_chk on" title="주요 구간 선택">주요 구간</a>
												<a href="javascript:void(0);" class="age_single_chk off" title="주요 구간 해제">주요 구간</a>
												<select id="select_ageRnd_detail" class="selct_77 select_ageRnd age_single_mem"></select>
											</div>
										</div>
									</div>					
<!-- 									<div class="clearfix div_age_range"> -->
<!-- 										<a href="javascript:void(0);" class="age_range_chk on" title="구간 선택">구간 선택</a> -->
<!-- 										<a href="javascript:void(0);" class="age_range_chk off" title="구간 해제">구간 선택</a>									 -->
<!-- 										<select title="시작범위" id="populationAgeFrom2" class="selct_08 selct_age_from age_range_mem"></select> -->
<!-- 										<span class="cond_subMsg"> 이상 ~ </span> -->
<!-- 										<select title="마지막범위" id="populationAgeTo2" class="selct_08 selct_age_to age_range_mem"></select> -->
<!-- 										<span id="ageToText2" class="cond_subMsg"> 미만</span>											 -->
<!-- 									</div>								 -->
<!-- 									<div id="slider-range_age2" class="slider-range age_range_slider_mem"></div> -->
<!-- 									<ul class="slider_controll_bar_long"> -->
<!-- 										<li style="margin-left: -8px;">0</li> -->
<!-- 										<li style="margin-left: 12px;">20</li> -->
<!-- 										<li style="margin-left: 8px;">40</li> -->
<!-- 										<li style="margin-left: 7px;">60</li> -->
<!-- 										<li style="margin-left: 9px;">80</li> -->
<!-- 										<li style="margin-left: 7px;">100+</li> -->
<!-- 									</ul> -->
								</div>							
							</div>
						</li>
						<li data-stat-type="family">
							<a href="#" class="dep_btn02 w51" data-base-year-depends='1'>가구</a>
							<div class="grid_navbg">
								<div class="clearfix grid_wrap02 gridFamilyList bundle">
									<div class="clearfix">
									<!-- SGIS4_1025_생활권역 시작 -->
										<a href="javascript:void(0);" class="btn05 pm91_1over3 bundle_main" data-bundle-nm="A" value="">친족 가구</a>
										<a href="javascript:void(0);" class="btn05 pm91_1over3" value="A0">1인 가구</a>
										<a href="javascript:void(0);" class="btn05 pm91_1over3" value="B0">비친족 가구</a>
									<!-- SGIS4_1025_생활권역 끝 -->	
									</div>											
									<div class="ct_line2_b"></div>
									<div class="clearfix">
										<a href="javascript:void(0);" class="btn05_sub pm91_1over3 bundle_sub" data-bundle-nm="A" value="01">1세대 가구</a>
										<a href="javascript:void(0);" class="btn05_sub pm91_1over3 bundle_sub" data-bundle-nm="A" value="02">2세대 가구</a>
										<a href="javascript:void(0);" class="btn05_sub pm91_1over3 bundle_sub" data-bundle-nm="A" value="03">3세대 가구</a>
										<a href="javascript:void(0);" class="btn05_sub pm91_1over3 bundle_sub" data-bundle-nm="A" value="04">4세대 이상 가구</a>
									</div>
								</div>							
							</div>
						</li>
						<li data-stat-type="house">
							<a href="#" class="dep_btn03 w51" data-base-year-depends='1'>주택</a>
							<div class="grid_navbg">
								<div class="clearfix grid_wrap02">
									<div class="clearfix gridHouseList">
<!-- 										<a href="javascript:void(0);" class="btn01 pm91 allowM" value="00">전체주택</a> -->
									</div>
									<div class="ct_line2_b"></div>
									<div class="clearfix div_constYear">
										<a href="javascript:void(0);" class="con_chk on" title="건축년도 선택">건축년도</a>
										<a href="javascript:void(0);" class="con_chk off" title="건축년도 해제">건축년도</a>											
										<select class="selct_07 select_constYear constYear_mem">
										    <option value="">선택하세요</option>
										</select>
									</div>											
									<div class="ct_line2"></div>
									<div class="clearfix div_houseBdspace">
										<a href="javascript:void(0);" class="con_chk on" title="연면적 선택">연면적</a>
										<a href="javascript:void(0);" class="con_chk off" title="연면적 해제">연면적</a>
										<select class="selct_07 selct_houseTotArea houseBdspace_mem">
										    <option value="">선택하세요</option>
										</select>										
<!-- 										<select id="houseTotAreaFrom2" class="selct_08 selct_hta_from houseBdspace_mem"></select> -->
<!-- 										<span class="cond_subMsg"> 초과 ~ </span> -->
<!-- 										<select id="houseTotAreaTo2" class="selct_08 selct_hta_to houseBdspace_mem"></select> -->
<!-- 										<span id="houseTotAreaToText2" class="cond_subMsg"> 이하</span> -->
									</div>
<!-- 									<div class="trans_Msg"> -->
<!-- 										<span class="houseTotAreaFrom2"></span> -->
<!-- 										<span class="cond_subMsg"> 초과 ~ </span> -->
<!-- 										<span class="houseTotAreaTo2"></span> -->
<!-- 										<span class="houseTotAreaToText2 cond_subMsg"> 이하</span>											 -->
<!-- 									</div> -->
<!-- 									<div id="slider-range_area2" class="slider-range houseBdspace_slider_mem"></div> -->
<!-- 									<ul class="slider_controll_bar_long"> -->
<!-- 										<li>0</li> -->
<!-- 										<li style="margin-left: -12px;">20</li> -->
<!-- 										<li style="margin-left: -12px;">40</li> -->
<!-- 										<li style="margin-left: -14px;">60</li> -->
<!-- 										<li style="margin-left: -14px;">85</li> -->
<!-- 										<li style="margin-left: -14px;">100</li> -->
<!-- 										<li style="margin-left: -14px;">130</li> -->
<!-- 										<li style="margin-left: -14px;">165</li> -->
<!-- 										<li style="margin-left: -12px;">230</li> -->
<!-- 										<li style="margin-left: -18px;">+</li> -->
<!-- 									</ul>											 -->
								</div>
							</div>
						</li>						
						<li data-stat-type="copr">
							<a href="#" class="dep_btn04 w118" data-base-year-depends='2'>사업체 및 종사자</a>
							<div class="grid_navbg">
								<div id="" class="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside">
									<div class="clearfix grid_wrap02">
										<div class="clearfix">
											<!-- <span class="cond_title">통계구분</span> -->
											<a href="javascript:void(0);" class="btn06 pm91_2T mustBeOne" data-grdstat-type="copr">사업체</a>
											<a href="javascript:void(0);" class="btn06 pm91_2T mustBeOne" data-grdstat-type="employee">종사자</a>
										</div>
										<div class="ct_line3_b"></div>
										<a href="javascript:void(0);" class="coprD_chk on" title="세부 조건 설정">세부 조건 설정 (분야, 중분류, 소분류 모두 선택)</a>
										<a href="javascript:void(0);" class="coprD_chk off" title="세부 조건 해제">세부 조건 설정</a>
										<div class="clearfix mt10 copr_theme_con">									
											<c:forEach items="${paramInfo.largeClassList}" var="item">
												<a href="javascript:void(0);" id="${item.factype_lclas_cd}" class="btn01 pm91 lclas_btn_group" data-large-class="${item.factype_lclas_cd }">${item.factype_lclas_nm }</a>
											</c:forEach>
											<div class="ct_line3_b"></div>
											<div class="clearfix">
												<span class="cond_title">중분류</span>
												<select class="detailSelectBox first selct_07">
												    <option value="">선택하세요</option>
												</select>												
											</div>
											<div class="ct_line3"></div>
											<div class="clearfix">
												<span class="cond_title">소분류</span>
												<select class="detailSelectBox second selct_07">
												    <option value="">선택하세요</option>
												</select>												
											</div>
										</div>										
									</div>
								</div>
							</div>
						</li>
						<li data-stat-type="idlv">
							<a href="#" class="dep_btn05 w71" data-base-year-depends='3'>공시지가</a>
							<div class="grid_navbg">
								<div class="clearfix grid_wrap02">
									<a href="#" class="btn01 pm01 active noTogl">공시지가</a>
<!-- 									<a href="#" class="btn01 pm01">없음</a> -->
								</div>
							</div>
						</li>
					</ul>
			</div>
			<div class="btn_wrap">
				<a href="#" class="sa_btn_select" id="layer_pop07_select">선택</a>
				<a href="#" class="" id="layer_pop07_cancel">취소</a>
			</div>
		</div>
		<!-- [END] 공간비교 상세분석 조건조회 선택창 -->
		
		<!-- 상관관계 분석 조건 설정 팝업 -->
		<div class="layer_pop08" id="correlation_popup" style="z-index: 10002;">
			<a href="#" class="close"><img src="/images/catchmentArea/close_ico02.png"></a>
			<div class="grid_setting">
				<h4 id="pop08_popTitle">상관관계 분석 조건 설정</h4>
				<h5>통계 조건 선택<span id="pop08_limitMsg"> (최대 4개 종목선택)</span></h5>
					<ul class="clearfix grid_depth1" id="gridSettingForSel">
						<li class="active" id="pop08_li01" data-stat-type="pops">
							<a href="javascript:void(0);" class="dep_btn01 mem5">인구</a>
							<div class="grid_navbg">
								<div class="clearfix grid_wrap02">								
									<div>
										<span class="cond_title">성별</span>
										<select id="select_genger_pop08" class="selct_07 select_genger">
											<option value="00">전체</option>
											<option value="1">남자</option>
											<option value="2">여자</option>
										</select>
									</div>
									<div class="ct_line3"></div>
									<div>
										<span class="cond_title">연령</span>
										<div class="div_age_box">
											<div class="div_age_all">
												<a href="javascript:void(0);" class="age_all_chk on" title="연령 전체 선택">전체</a>
												<a href="javascript:void(0);" class="age_all_chk off" title="연령 전체 해제">전체</a>
											</div>
											<div class="div_age_single5">
												<a href="javascript:void(0);" class="age_single_chk on" title="5세 단위 선택">5세 단위</a>
												<a href="javascript:void(0);" class="age_single_chk off" title="5세 단위 해제">5세 단위</a>
												<select id="select_age5_pop08" class="selct_77 select_age5 age_single_mem"></select>
											</div>
											<div class="div_age_single10">
												<a href="javascript:void(0);" class="age_single_chk on" title="10세 단위 선택">10세 단위</a>
												<a href="javascript:void(0);" class="age_single_chk off" title="10세 단위 해제">10세 단위</a>
												<select id="select_age10_pop08" class="selct_77 select_age10 age_single_mem"></select>
											</div>
											<div class="div_age_singleRnd">
												<a href="javascript:void(0);" class="age_single_chk on" title="주요 구간 선택">주요 구간</a>
												<a href="javascript:void(0);" class="age_single_chk off" title="주요 구간 해제">주요 구간</a>
												<select id="select_ageRnd_pop08" class="selct_77 select_ageRnd age_single_mem"></select>
											</div>
										</div>
									</div>				
<!-- 									<div class="clearfix div_age_range"> -->
<!-- 										<a href="javascript:void(0);" class="age_range_chk on" title="구간 선택">구간 선택</a> -->
<!-- 										<a href="javascript:void(0);" class="age_range_chk off" title="구간 해제">구간 선택</a>									 -->
<!-- 										<select title="시작범위" id="populationAgeFrom3" class="selct_08 selct_age_from age_range_mem"></select> -->
<!-- 										<span class="cond_subMsg"> 이상 ~ </span> -->
<!-- 										<select title="마지막범위" id="populationAgeTo3" class="selct_08 selct_age_to age_range_mem"></select> -->
<!-- 										<span id="ageToText3" class="cond_subMsg"> 미만</span>											 -->
<!-- 									</div>								 -->
<!-- 									<div id="slider-range_age3" class="slider-range age_range_slider_mem"></div> -->
<!-- 									<ul class="slider_controll_bar_long"> -->
<!-- 										<li style="margin-left: -8px;">0</li> -->
<!-- 										<li style="margin-left: 12px;">20</li> -->
<!-- 										<li style="margin-left: 8px;">40</li> -->
<!-- 										<li style="margin-left: 7px;">60</li> -->
<!-- 										<li style="margin-left: 9px;">80</li> -->
<!-- 										<li style="margin-left: 7px;">100+</li> -->
<!-- 									</ul> -->
								</div>
							</div>
						</li>					
						<li id="pop08_li02" data-stat-type="family">
							<a href="javascript:void(0);" class="dep_btn02 mem5">가구</a>
							<div class="grid_navbg">
								<div class="clearfix grid_wrap02 gridFamilyList bundle" id="pop08_family">
									<div class="clearfix">
									<!-- SGIS4_1025_생활권역 시작 -->
										<a href="javascript:void(0);" class="btn05 pm91_1over3 bundle_main" data-bundle-nm="A" value="">친족 가구</a>
										<a href="javascript:void(0);" class="btn05 pm91_1over3" value="A0">1인 가구</a>
										<a href="javascript:void(0);" class="btn05 pm91_1over3" value="B0">비친족 가구</a>
									<!-- SGIS4_1025_생활권역 끝 -->	
									</div>											
									<div class="ct_line2_b"></div>
									<div class="clearfix">
										<a href="javascript:void(0);" class="btn05_sub pm91_1over3 bundle_sub" data-bundle-nm="A" value="01">1세대 가구</a>
										<a href="javascript:void(0);" class="btn05_sub pm91_1over3 bundle_sub" data-bundle-nm="A" value="02">2세대 가구</a>
										<a href="javascript:void(0);" class="btn05_sub pm91_1over3 bundle_sub" data-bundle-nm="A" value="03">3세대 가구</a>
										<a href="javascript:void(0);" class="btn05_sub pm91_1over3 bundle_sub" data-bundle-nm="A" value="04">4세대 이상 가구</a>
									</div>
								</div>
							</div>
						</li>					
						<li id="pop08_li03" data-stat-type="house">
							<a href="javascript:void(0);" class="dep_btn03 mem5">주택</a>
							<div class="grid_navbg">
								<div class="clearfix grid_wrap02">
									<div class="clearfix gridHouseList" id="pop08_house">
<!-- 										<a href="javascript:void(0);" class="btn01 pm91 allowM" value="00">전체주택</a> -->
									</div>
									<div class="ct_line2_b"></div>
									<div class="clearfix div_constYear">
										<a href="javascript:void(0);" class="con_chk on" title="건축년도 선택">건축년도</a>
										<a href="javascript:void(0);" class="con_chk off" title="건축년도 해제">건축년도</a>											
										<select class="selct_07 select_constYear constYear_mem">
										    <option value="">선택하세요</option>
										</select>
									</div>											
									<div class="ct_line2"></div>
									<div class="clearfix div_houseBdspace">
										<a href="javascript:void(0);" class="con_chk on" title="연면적 선택">연면적</a>
										<a href="javascript:void(0);" class="con_chk off" title="연면적 해제">연면적</a>
										<select class="selct_07 selct_houseTotArea houseBdspace_mem">
										    <option value="">선택하세요</option>
										</select>									
<!-- 										<select id="houseTotAreaFrom3" class="selct_08 selct_hta_from houseBdspace_mem"></select> -->
<!-- 										<span class="cond_subMsg"> 초과 ~ </span> -->
<!-- 										<select id="houseTotAreaTo3" class="selct_08 selct_hta_to houseBdspace_mem"></select> -->
<!-- 										<span id="houseTotAreaToText3" class="cond_subMsg"> 이하</span> -->
									</div>
<!-- 									<div class="trans_Msg"> -->
<!-- 										<span class="houseTotAreaFrom3"></span> -->
<!-- 										<span class="cond_subMsg"> 초과 ~ </span> -->
<!-- 										<span class="houseTotAreaTo3"></span> -->
<!-- 										<span class="houseTotAreaToText3 cond_subMsg"> 이하</span>											 -->
<!-- 									</div> -->
<!-- 									<div id="slider-range_area3" class="slider-range houseBdspace_slider_mem"></div> -->
<!-- 									<ul class="slider_controll_bar_long"> -->
<!-- 										<li>0</li> -->
<!-- 										<li style="margin-left: -12px;">20</li> -->
<!-- 										<li style="margin-left: -12px;">40</li> -->
<!-- 										<li style="margin-left: -14px;">60</li> -->
<!-- 										<li style="margin-left: -14px;">85</li> -->
<!-- 										<li style="margin-left: -14px;">100</li> -->
<!-- 										<li style="margin-left: -14px;">130</li> -->
<!-- 										<li style="margin-left: -14px;">165</li> -->
<!-- 										<li style="margin-left: -12px;">230</li> -->
<!-- 										<li style="margin-left: -18px;">+</li> -->
<!-- 									</ul>											 -->
								</div>
							</div>
						</li>					
						<li id="pop08_li04" data-stat-type="copr">
							<a href="javascript:void(0);" class="dep_btn04 mem5">사업체 및 종사자</a>
							<div class="grid_navbg">
								<div class="clearfix grid_wrap02">
									<div class="clearfix" id="pop08_copr">
										<!-- <span class="cond_title">통계구분</span> -->
										<a href="javascript:void(0);" class="btn06 pm91_2T mustBeOne" data-grdstat-type="copr">사업체</a>
										<a href="javascript:void(0);" class="btn06 pm91_2T mustBeOne" data-grdstat-type="employee">종사자</a>
									</div>
									<div class="ct_line3_b"></div>
									<a href="javascript:void(0);" class="coprD_chk on" title="세부 조건 설정">세부 조건 설정 (분야, 중분류, 소분류 모두 선택)</a>
									<a href="javascript:void(0);" class="coprD_chk off" title="세부 조건 해제">세부 조건 설정</a>
									<div class="clearfix mt10 copr_theme_con">																	
										<c:forEach items="${paramInfo.largeClassList}" var="item">
											<a href="javascript:void(0);" id="${item.factype_lclas_cd}" class="btn01 pm91 lclas_btn_group" data-large-class="${item.factype_lclas_cd }">${item.factype_lclas_nm }</a>
										</c:forEach>
										<div class="ct_line3_b"></div>
										<div class="clearfix">
											<span class="cond_title">중분류</span>
											<select class="detailSelectBox first selct_07">
												<option value="">선택하세요</option>
											</select>												
										</div>
										<div class="ct_line3"></div>
										<div class="clearfix">
											<span class="cond_title">소분류</span>
											<select class="detailSelectBox second selct_07">
												<option value="">선택하세요</option>
											</select>												
										</div>
									</div>
								</div>
							</div>
						</li>
						<li id="pop08_li05" data-stat-type="idlv">
							<a href="javascript:void(0);" class="dep_btn05 mem5">공시지가</a>
							<div class="grid_navbg">
								<div class="clearfix grid_wrap02" id="pop08_olnlp">
									<a href="javascript:void(0);" class="btn01 pm01 active noTogl">공시지가</a>
					<!-- 											<a href="javascript:void(0);" class="btn01 pm01">없음</a> -->
								</div>
							</div>
						</li>					
					</ul>
					<div class="right_select">
						<h5>선택한 조건</h5>
						<ul id="pop08_select">
						</ul>
						<a href="javascript:void(0);" id="pop08_confirm" class="btn07">확인</a>
					</div>
			</div>
			<div class="btn_wrap">
				<a href="javascript:void(0);" id="pop08_add" class="sa_btn_select">조건 선택</a>
				<a href="javascript:void(0);" id="pop08_cancel" class="sa_btn_cancel">취소</a>
			</div>
		</div><!-- //상관관계 분석 조건 설정 팝업 -->
		<!-- 추가 요청(REQ001) 시작 : 생활권역 통계지도 도움말 생성 -->
		<!-- 생활권역 통계지도 도움말 팝업 --> 
		<div class="layer_pop09" id="catchmentHelpPopup" style="padding: 10px">
			<a href="javascript:void(0);" class="close">
				<img src="/images/catchmentArea/close_ico02.png">
			</a>
			<h2>생활권역 통계지도는</h2>
			<div id="helperContentWrapper">
				<p>① 특정 시설 및 지점에 대하여</p>
				<p>② 행정구역 경계와 상관없이 주행시간, 주행거리, 반경 등을 기준으로 영역을 생성하면</p>
				<p>③ 그 영역에 속하는 통계정보와 격자* 분포를 제시합니다.</p>
				<p>* 격자 : 국토를 행정구역과 관계없이 직각으로 교차하는 가로·세로선으로 구분한 영역</p>
				<div id="helperPictures" style="overflow: hidden; margin-top: 20px;">
					<div style="width: 30%; float: left">
						<table class="helper_table">
							<tr>
								<td>① 지점 선택</td>
							</tr>
							<tr>
								<td>미리 분류된 시설 유형 선택,<br>지명검색 또는 지도검색</td>
							</tr>
							<tr>
								<td><img alt="생활권역 생성 지점 선택" src="/images/catchmentArea/helper_table_1_img.png" width="200" height="100"></td>
							</tr>
						</table>
					</div>
					<h4 style="float: left; margin-right: 1%; margin-left: 1%">→</h4>
					<div style="width: 30%; float: left">
						<table class="helper_table">
							<tr>
								<td>② 영역 생성</td>
							</tr>
							<tr>
								<td>주행시간, 주행거리, 반경 등을<br>기준으로 영역 생성</td>
							</tr>
							<tr>
								<td><img alt="생활권역 영역 설정" src="/images/catchmentArea/helper_table_2_img.png" width="200" height="100"></td>
							</tr>
						</table>
					</div>
					<h4 style="float: left; margin-right: 1%; margin-left: 1%">→</h4>
					<div style="width: 30%; float: left">
						<table class="helper_table">
							<tr>
								<td>③ 통계자료 조회</td>
							</tr>
							<tr>
								<td>영역 내 통계자료 및<br>격자 단위 분포 조회</td>
							</tr>
							<tr>
								<td><img alt="통계자료 조회" src="/images/catchmentArea/helper_table_3_img.png" width="200" height="100"></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<div style="margin-top:20px;">
				<p>- 본 서비스는 통계청에서 실시한 인구주택총조사 및 전국사업체조사 자료 중 위치정보를 파악할 수 있는 자료를 대상으로 좌표와 특성을 부여하여 집계한 값으로, 위치정보를 알 수 없는 일부자료(국가보안시설, 개인택시운송업 등)는 포함되지 않습니다.
   					<br>따라서, 해당 영역에 대한 대략적인 통계자료와 격자 분포를 파악하기 위한 용도로만 활용하시기 바랍니다.</p>
			<!--  
				<p style="margin-left:10px;">* 생활권역 : 특정 시설, 지점 등에 일정 시간 내 도달 가능한 공간적 범위</p>
				<p style="margin-left:10px;">* 생활권역 통계정보 서비스에서 제공되는 통계정보는 비밀보호기법을 적용하여 나타냅니다.</p>
				<p style="margin-left:20px;">- 적용된 비밀보호 기법 : BSCA(Bounded Small Cell Adjustments) [<a href='/contents/include/download_catchmentArea.jsp?filename=SA_BSCA_References.pdf&path=&type=board' style='color:#1c60cf;'>설명자료</a> 다운로드]</p>
				<!-- 운영적용시에는 아래 코드 사용, /DATA/docs/statsPotal/upload/board/ 폴더에 파일도 위치시킬것 !!!!!
				<p style="margin-left:20px;">- 적용된 비밀보호 기법 : BSCA(Bounded Small Cell Adjustments) [<a href='/contents/include/download.jsp?filename=SA_BSCA_References.pdf&path=/board/&type=board' style='color:#1c60cf;'>설명자료</a> 다운로드]</p>
			-->
			</div>
		</div>
		<!-- 추가 요청(REQ001) 끝 : 생활권역 통계지도 도움말 생성 -->
		
 		<!-- SGIS4_생활권역 시작 -->
		<div class="layer_popKSIC" id="catchmentKSICPopup">
			<a href="#" class="closePop"><img src="/images/catchmentArea/close_ico02.png"></a>
			<div class="grid_setting">
				<h4 id="popTitle">한국표준산업분류 내용보기</h4>
				<div class="search_box">
				<!--  
					<span class="grp_txt01">구분</span>		
					<select class="selct_81" id="ksicCategoryType">
						<option value="0">전체</option>
						<option value="1">분류코드</option>
						<option value="2">색인어</option>
						<option value="3">분류항목명</option>
					</select>
					<span class="grp_txt01">조건</span>
					<select class="selct_81" id="ksicSearchGubun">
						<option value="1">포함검색</option>						
						<option value="2">일치검색</option>					
					</select>
				-->	
					<span class="grp_txt02">검색어</span>
					<input type="text" id="ksicSearchWord" class="search_inp" value="" style="ime-mode:active;" title="검색어입력">
					<button id="ksicSearchBtn" type="button" class="sch">검색</button>
					<!-- <button id="ksicSelectedBtn" type="button" class="sel">선택</button> -->
				</div>
				<div class="grid_navbg scroll_wrap2">
					<div class="stepTreeBox" id="company_TreeBox"></div>
				</div>
				<div class="grid_contbg">
					<div class="board_hd">
						<span class="grp_txt01" id="ksicTotalTxt">전체</span><span class="grp_txt02" id="ksicTotalCnt">0</span><span class="grp_txt03">개</span>
					</div>
					<!-- board 리스트 -->
					<div id="board-thema" class="schlist">
						<table class="board-list">
							<caption>한국표준산업분류 검색 목록</caption>
							<colgroup>
								<col style="width:40px;">
								<col style="width:70px;">
								<col style="width:290px;">
							</colgroup>
							<thead>
								<tr>
									<th scope="col">순번</th>
									<th scope="col">분류코드</th>
									<th scope="col">분류항목명</th>
								</tr>
							</thead>
							<tbody id="list">
								<tr class="noData">
									<td colspan="3">검색한 자료가 없습니다.</td>
								</tr>
							</tbody>
						</table>
					</div>
					<!-- //board 리스트 끝 -->			
					<!-- 페이지 네비 시작 -->        	
					<div class="paging pagenation">
						<span class="list"></span>
					</div>
					<!--//페이지 네비 끝 -->				
				</div>
				<div class="grid_detlbg">
					<div class="board_hd">
						<button id="goList" type="button" class="goList">목록</button>
						<button type="button" class="ksicSel">선택</button>
					</div>
					<div class="detail scroll_wrap">
						<table class="board-dtl">
							<caption>한국표준산업분류 상세</caption>
							<colgroup>
								<col style="width:70px;">
								<col style="width:120px;">
								<col style="width:70px;">
								<col style="width:120px;">
							</colgroup>
							<thead>
								<tr>
									<th scope="col" colspan="4">분류내용보기</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row">차수</th>
									<td id="ksicDtl_deg" class="left dtlMem"></td>
									<th scope="row">분류코드</th>
									<td id="ksicDtl_cd" class="left dtlMem"></td>
								</tr>
								<tr>
									<th scope="row">분류명</th>
									<td id="ksicDtl_nm" class="left dtlMem" colspan="3"></td>
								</tr>
								<tr>
									<th scope="row">설명</th>
									<td id="ksicDtl_exp" class="left dtlMem" colspan="3"></td>
								</tr>                
								<tr>
									<th scope="row">색인어</th>
									<td id="ksicDtl_kwrd" class="left dtlMem" colspan="3"></td>
								</tr>								
							</tbody>
						</table>					
					</div>				
				</div>
			</div>	 	
 		</div>
 		<!-- SGIS4_생활권역 끝 -->
	</div>
	<!-- wrapper end  -->
</div>