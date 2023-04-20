<%
/**************************************************************************************************************************
* Program Name	: My통계로 (카탈로그)
* File Name		: statsMeCatalog.jsp
* Comment		: 
* History		: 
*	2019.08.08	김남민	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 페이지 JS -->
<script src="${pageContext.request.contextPath}/js/statsMe/statsMeCatalog.js"></script>
<!-- 20200814 박은식 검색 위젯 스타일 적용 start -->
<style>
/* 2020.9.10[신예리] 검색 위젯 스타일 디자인 수정 START */
.history_btn {
    display: inline-block;
    height: 26px;
    width: 50%;
    color: #fff;
    background-color: #fff;
    border-top: 1px solid #c0c4c7;
    border-left: 1px solid #c0c4c7;
    border-right: 1px solid #c0c4c7;
    border-bottom: 0px solid;
    font-family: "NanumSquare" !important;
    font-size: 14px !important;
    font-weight: 600;
    padding: 3px;
    margin: 1px 0;
    position: relative;
    box-sizing: border-box;
    z-index: 2;
}

.recommend_btn {
    /* float: right; */
    height: 26px;
    width: 50%;
    color: #fff;
    background-color: #fff;
    border-top: 1px solid #c0c4c7;
    border-left: 1px solid #c0c4c7;
    border-right: 1px solid #c0c4c7;
    border-top: 1px solid #c0c4c7;
    border-bottom: 0px solid;
    font-size: 14px !important;
    font-weight: 600;
    font-family: "NanumSquare" !important;
    padding: 3px;
    margin: 1px 0px;
    position: relative;
    z-index: 1;
    box-sizing: border-box;
}

.button_area { 
	height: 27px;
	width: 100%;
}

/* 2020.9.10[신예리] 검색 위젯 스타일 디자인 수정 END */
.history_btn .on, .recommend_btn .on {
	background-color: #32bed7;
}


.history_remove {
    background-color: #fff;
    border: 1px solid #b4b5b9;
    font-size: 11px !important;
    border-radius: 5px;
    color: #b4b5b9;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 10px;
}

.ui-menu-item {
	font-family: "NanumSquare" !important;
}

.all_remove {
    height: 30px;
    display: none;
    float: right;
    right: 0;
    background-color: #4d4e52;
    border: 1px solid #4d4e52;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    font-family: "NanumSquare" !important;
    font-size: 15px;
    font-weight: 600;
    padding: 3px;
    color: #fff;
    position: absolute;
    bottom: 0px;
    width: 100%;
}


#recommend_list, #history_list, #recommend_list2, #history_list2 {
	width: 298px;
	height: 260px;
	overflow: auto;
	position: fixed;
	background-color: rgb(255, 255, 255);
	border-bottom: 1px solid #c0c4c7;
	border-bottom-right-radius: 5px;
	border-bottom-left-radius: 5px;
	border-left: 1px solid #c0c4c7;
	border-right: 1px solid #c0c4c7;
	display: block;
}

.recommend_list, .history_list {
	width: 270px;
	height: 240px;
}

.keyword_list {
	padding-top: 5px;
	height: 20px;
	font-size: 15px;
	font-weight: 600;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}

.none_data {
	position: relative;
    top: 50%;
    margin-left: 20px;
    font-size: 14px;
    font-weight: normal;
    text-align: center;
}
</style>
<!-- 20200814 박은식 검색 위젯 스타일 적용 end -->

<!-- 페이지 HTML -->
<div class="content_box" style="height: calc(100% - 20px);">
	<!-- mng_s 2020.08.28 이금은 ::: '슬기로운 'My통계로' 사용법 1,2,3회 link 추가 -->
	<div  style="text-align:right;">
		<div  class="btn" style="margin:30px 0px 0px 0px;">
			<img src="/images/statsMe/banner01.png" style="width:125.4px; height:25.8px;"><br/> 
			<button onClick="javascript:Pop('/html/info_01/01.html')" class="btn01">1회</button>
			<button onClick="javascript:Pop('/html/info_01/02.html')" class="btn01">2회</button> 
			<button onClick="javascript:Pop('/html/info_01/03.html')" class="btn01">3회</button>
		</div>
	</div>
	<!-- mng_e 2020.08.28 이금은 ::: '슬기로운 'My통계로' 사용법 1,2,3회 link 추가 -->
	<div class="srch_wrap" style="border-radius: 6px;">
		<!-- 20200819 박은식 autocomplete 팝업 생성 부분 (input 일부수정) start -->
		<input type="text" placeholder="전체 검색" id="statsMeCatalogKwrdAll" onkeydown="if(event.keyCode == 13) { $statsMeCatalog.ui.searchKwrd('all'); $('#widgetPopup').hide(); return false;}" style="ime-mode:active;" onfocus="" onblur="this.placeholder='전체 검색'" tabindex="21" class="tabindex">
		<input type="button" value="검색" id="statsMeCatalogSearchKwrdAll" onclick="javascript:{$statsMeCatalog.ui.searchKwrd('all'); $('#widgetPopup').hide();}" tabindex="22" class="tabindex">
		<!-- 팝업  start-->
		<div class="search_popup" id="widgetPopup" style="position: fixed; width:300px; height:300px; z-index: 990; display:none;">
			<div class="button_area">
				<button class="recommend_btn on" id="recommend_list_btn">연관키워드</button><button class="history_btn" id="history_list_btn">검색기록</button>
			</div>
			<div id="recommend_list">
				<!-- 연관키워드 -->
				<ul class="recommend_list" style="padding:5px;">
				</ul>
			</div>
			<div id="history_list">
				<!-- 키워드목록 -->
				<ul class="history_list" style="padding:5px;">
			
				</ul>
			</div>
		</div>
		<!-- 팝업  end-->
		<!-- 20200819 박은식 autocomplete 팝업 생성 부분 (input 일부수정) end -->
	</div>
	<div class="content_description" style="margin-top:65px;">
		<!-- 2019.11.29[한광희] 웹접근성에 따른 h 태크 추가 START -->
		<!-- 2020-02-17 [김남민] 생애주기, 관심분야, 카탈로그 화면의 ‘통계정보＇용어를 ‘공간통계정보＇로 수정 -->
		<h6><strong>키워드</strong>에 따른 공간통계정보를<br>추천해 드립니다.</h6>
		<!-- <strong>키워드</strong>에 따른 공간통계정보를<br>추천해 드립니다. -->
		<!-- 2019.11.29[한광희] 웹접근성에 따른 h 태크 추가 END -->
	</div>
	<!-- <div class="content_sub_desc"><img src="/images/statsMe/i_03.png" align="middle"> 관심분야의 키워드를 선택해 주세요.</div> -->
	<div class="keyword_wrap">
		<!-- 2020-02-19 [김남민] 툴팁이 사라지지 않음 -->
		<div class="keyword_box" id="recmdKwrdDiv" onmouseenter="javascript:$statsMeCatalog.ui.onClickEvent('view_keyword_01');">
			<!-- <img alt="" src="/images/statsMe/i_keyword1.png">
			<select>
				<option>추천키워드</option>
			</select> -->
			<a href="javascript:void(0);" class="kw_01 tabindex" id="recmdKwrd" tabindex="23">추천키워드</a>
			<div class="view_keyword_box" id="view_keyword_01" style="display: none;" onmouseleave="javascript:$statsMeCatalog.ui.onMouseLeave('view_keyword_01');">
				<!-- <ul>
					<li><a href="javascript:void(0);" class="kw_01_li">추천키워드</a></li>
					<li><a href="javascript:void(0);" class="view_keyword_li">전체</a></li>
					<li><a href="javascript:void(0);" class="view_keyword_li">전체</a></li>
					<li><a href="javascript:void(0);" class="view_keyword_li">전체</a></li>
					<li><a href="javascript:void(0);" class="view_keyword_li">전체</a></li>
					<li><a href="javascript:void(0);" class="view_keyword_li">전체</a></li>
					<li><a href="javascript:void(0);" class="view_keyword_li">전체</a></li>
				</ul> -->
			</div>
		</div>
		<!-- 2020-02-19 [김남민] 툴팁이 사라지지 않음 -->
		<div class="keyword_box" id="myLocationAccKwrdDiv" onmouseenter="javascript:$statsMeCatalog.ui.onClickEvent('view_keyword_02');">
			<a href="javascript:void(0);" class="kw_02 tabindex" onclick="javascript:$statsMeCatalog.ui.onClickEvent('view_keyword_02');" id="myLocationAccKwrd" tabindex="24">우리동 인기 키워드</a>
			<div class="view_keyword_box" id="view_keyword_02" style="display: none;" onmouseleave="javascript:$statsMeCatalog.ui.onMouseLeave('view_keyword_02');">
				<!-- <ul>
					<li><a href="javascript:void(0);" class="kw_02_li">우리동 인기 키워드</a></li>
					<li class="view_keyword_li">전체</li>
					<li class="view_keyword_li">aa</li>
					<li class="view_keyword_li">aa</li>
					<li class="view_keyword_li">aa</li>
					<li class="view_keyword_li">aa</li>
					<li class="view_keyword_li">aa</li>
				</ul> -->			
			</div>
		</div>
		<!-- 2020-02-19 [김남민] 툴팁이 사라지지 않음 -->
		<div class="keyword_box" id="accKwrdDiv" onmouseenter="javascript:$statsMeCatalog.ui.onClickEvent('view_keyword_03');">
			<a href="javascript:void(0);" class="kw_03 tabindex" onclick="javascript:$statsMeCatalog.ui.onClickEvent('view_keyword_03');" id="accKwrd" tabindex="25">누적 인기 키워드</a>
			<div class="view_keyword_box" id="view_keyword_03" style="display: none;" onmouseleave="javascript:$statsMeCatalog.ui.onMouseLeave('view_keyword_03');">
				<!-- <ul>
					<li><a href="javascript:void(0);" class="kw_03_li">누적 인기 키워드</a></li>
					<li class="view_keyword_li">전체</li>
					<li class="view_keyword_li">aa</li>
					<li class="view_keyword_li">aa</li>
					<li class="view_keyword_li">aa</li>
					<li class="view_keyword_li">aa</li>
					<li class="view_keyword_li">aa</li>
				</ul> -->			
			</div>
		</div>
	</div>
	<div class="service_title" id="sgisServiceWrapTitle">관련 SGIS 콘텐츠 바로가기</div>
	<div class="service_wrap" id="sgisServiceWrap">
		<!-- <div class="service_box" id="thematicMapGlance" style="display: none;"><a href="javascript:void(0);" class="sv_01">통계주제도</a></div>
		<div class="service_box" id="interactiveMapGlance" style="display: none;"><a href="javascript:void(0);" class="sv_02">대화형 통계지도</a></div>
		<div class="service_box" id="workRoadGlance" style="display: none;"><a href="javascript:void(0);" class="sv_03">일자리 맵</a></div>
		<div class="service_box" id="policyStaticMapGlance" style="display: none;"><a href="javascript:void(0);" class="sv_04">정책 통계지도</a></div>
		<div class="service_box" id="houseAnalysisMapGlance" style="display: none;"><a href="javascript:void(0);" class="sv_05">살기좋은 우리동네</a></div>
		<div class="service_box" id="bizStatsMapGlance" style="display: none;"><a href="javascript:void(0);" class="sv_06">업종 통계지도</a></div>
		<div class="service_box" id="eLocalityIndexGlance" style="display: none;"><a href="javascript:void(0);" class="sv_07" style="padding:10px 0 15px 55px;">지표체계도<br>(e-지방지표)</a></div> -->
	</div>
	<div class="list_wrap">
		<div class="list_title">
			<!-- <div class="list_check" style="position: static;">
	            <input type="checkbox" id="list_check" onclick="javascript:$statsMeCatalog.ui.titleCheckBoxEvent();">
	            <label for="list_check" style="margin: -1px 10px 0px -2px;"></label>
	         </div> -->
			<div>
				<span style="float: left; padding-right: 10px; padding-top: 1px;">그룹보기<input type="checkbox" id="statsMeGrpChk" style="width:16px;height:16px;background: #fff;border: 1px solid #ddd;cursor: pointer;border-radius: 1px;float: right;overflow:visible;"></span>
				<span id="statsMeGrphInfoDataListTitle" style="float: left; padding-right: 10px; padding-top: 1px;">통계지리 정보</span>
				<div>
					<a href='#' style='position:absolute; bottom:1px;' id='list_replace'>
						<img alt='초기화' src='/images/statsMe/ico_toolbars02.png' style="width: 25px; height: 25px;">
					</a>
					<label onclick="javascript:$statsMeCatalog.ui.titleCheckBoxEvent();" style='padding: 5px 5px 5px 22px; border:1px solid #e0e0e0; font-weight: normal; font-size: 11px; color: gray; cursor: pointer;' tabindex="29" class="tabindex">선택 초기화</label>								
				</div>
			</div>
			<div class="srch_wrap" style="top: -8px; border-radius: 6px;">
				<!-- 2020.09.11[한광희] 결과내 검색 팝업 수정 START -->
				<input type="text" placeholder="결과내 검색" id="statsMeCatalogKwrd" onkeydown="if(event.keyCode == 13) { $statsMeCatalog.ui.searchKwrd(''); $('#widgetPopup2').hide(); return false;}" style="ime-mode:active; font-weight: 400;" onfocus="this.placeholder=''" onblur="this.placeholder='결과내 검색'" tabindex="31" class="tabindex">
				<input type="button" value="검색" id="statsMeCatalogSearchKwrd" onclick="javascript:$statsMeCatalog.ui.searchKwrd('');" tabindex="32" class="tabindex">
				<!-- 팝업  start-->
				<div class="search_popup" id="widgetPopup2" style="position: fixed; width:300px; height:300px; z-index: 990; display:none;">
					<div class="button_area">
						<button class="recommend_btn on" id="recommend_list_btn2">연관키워드</button><button class="history_btn" id="history_list_btn2">검색기록</button>
					</div>
					<div id="recommend_list2">
						<!-- 연관키워드 -->
						<ul class="recommend_list" style="padding:5px;">
						</ul>
					</div>
					<div id="history_list2">
						<!-- 키워드목록 -->
						<ul class="history_list" style="padding:5px;">
					
						</ul>
					</div>
				</div>
				<!-- 팝업  end-->
				<!-- 2020.09.11[한광희] 결과내 검색 팝업 수정 END -->
			</div>
			<div id="statMeCatalogSorting">
				<div class="list_sorting" style="right: 375px;">
					<select id="selectStatMeCatalogSorting" style="float: left; border: none; font-size:14px; color:#777; padding:3px 10px; font-weight:normal;" title="" tabindex="30" class="tabindex">
						<option value="statDataNm">제목순</option>
						<option value="accCnt">조회순</option>
					</select>
				</div>
			</div>
			<div id="statMeCatalogShowType">
				<div class="list_ShowType" style="right: 275px;">
					<select id="selectStatMeCatalogShowType" style="float: left; border: none; font-size:14px; color:#777; padding:3px 10px; font-weight:normal;" title="" tabindex="31" class="tabindex">
						<option value="t_big" selected="selected">리스트(대)</option>
						<option value="t_small">리스트(소)</option>
					</select>
				</div>
			</div>
<!-- 			<div id="statMeCatalogMenuType"> -->
<!-- 				<div class="list_MenuType" style="right: 226px;"> -->
<!-- 					<select id="selectStatMeCatalogMenuType" style="float: left; border: none; font-size:14px; color:#777; padding:3px 10px; font-weight:normal;" title="" tabindex="32" class="tabindex"> -->
<!-- 						<option value="ALL">[콘텐츠별] 전체</option> -->
<!-- 						<option value="TM">통계주제도</option> -->
<!-- 						<option value="CVPHPM">대화형 통계지도</option> -->
<!-- 						<option value="BS">업종통계지도</option> -->
<!-- 						<option value="HA">살고싶은 우리동네</option> -->
<!-- 						<option value="PS">정책통계지도</option> -->
<!-- 						<option value="WR">일자리 맵</option> -->
<!-- 					</select> -->
<!-- 				</div> -->
<!-- 			</div> -->
			<!-- <div class="list_sorting"> ㅣ 
				<a href="javascript:$statsMeCatalog.ui.searchStatsGrphInfo('statDataNm')">제목순</a> ㅣ 
				<a href="javascript:$statsMeCatalog.ui.searchStatsGrphInfo('accCnt')">조회순</a> ㅣ  
			</div> -->
		</div>
		<!-- 2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 -->
		<div id="statsMeGrphInfoDataList_div" class="mCustomScrollbar list_box" style="min-height: 359px; height: 458px; border-bottom:2px solid #22bed7">
			<table id="statsMeGrphInfoDataList" tabindex="33" class="tabindex">
				<tbody>
				</tbody>
			</table>
		</div> 
		<!-- 2021.11.15 [이금은] 그룹보기 추가 -->
		<div id="statsMeGrpList_div" class="mCustomScrollbar list_box" style="min-height: 359px; height: 458px; border-bottom:2px solid #22bed7; display:none;">
			<table id="statsMeGrpList" tabindex="34" class="tabindex">
				<tbody>
				</tbody>       
			</table>
		</div>		
		<div style="position:relative; margin-top:18px;" >
			<div class="btn_box_viewtype">
				<a href="javascript:srvLogWrite('N0', '08', '17', '00', '', '');" class="btn_view_map tabindex" id="statsMeCatalogPageMap" tabindex="34">지도로 보기</a>
				<a href="javascript:srvLogWrite('N0', '08', '18', '00', '', '');" class="btn_view_text tabindex" id="statsMeCatalogPageDetailInfo" tabindex="35">상세정보 보기</a>
			</div>
		</div>
	</div>
</div>