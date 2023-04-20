<%
/**************************************************************************************************************************
* Program Name	: My통계로 (지도)
* File Name		: statsMeMap.jsp
* Comment		: 
* History		: 
*	2019.08.08	김남민	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 페이지 JS -->
<script src="/js/statsMe/statsMeMap.js"></script>

<!-- 페이지 HTML -->
<div class="map_box">
	<div id="statsMeMapMapNavi" style="display: none;"></div>
	<!-- <div id="statsMeMapBack" class="map_title_back">
		<img alt="뒤로가기" src="/images/statsMe/back_ico.png">
	</div> -->
	<div class="btn_prev" style="top: 0px; z-index: 3; width: 35px; height: 35px; padding-left: 14px; padding-top: 9px; left: auto;"><a href="javascript:void(0);" id="statsMeMapBack" style="background-position: center; width: 25px; height: 25px; background-size: 100%;"><span>이전</span></a></div>
	<!-- 2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 -->
	<div id="statsMeMapStatDataNm" class="map_title" style="position:absolute; z-index: 2; width: calc(100% - 320px); padding-left: 50px;">&nbsp;</div>
	<div class="btn_next" style="top: 0px; z-index: 3; width: 35px; height: 35px; padding-right: 5px; padding-top: 9px; right: 0px;"><a href="javascript:void(0);" id="statsMeMapForward" style="background-position: center; width: 25px; height: 25px; background-size: 100%;"><span>선택완료</span></a></div>
	<!-- <div id="statsMeMapForward"  class="map_title_forward">
		<img alt="앞으로가기" src="/images/statsMe/forward_ico.png">
	</div> -->
	<div class="map_area" style="background:none; z-index: 1; margin-top: 43px;">
		<div class="menu_box" style="border-bottom: 1px solid #cfcfcf; z-index: 2;">
			<div class="type_area">
				<p>현재위치</p>
				<ul>
					<li id="statsMeMapMapArea"><a href="javascript:void(0);">대전광역시 서구 둔산2동</a></li>
				</ul>
			</div>
			<div class="type_region">
				<p>지역경계</p>
				<ul id="statsMeMapMapRegion">
					<li id="statsMeMapMapRegion_sido" style="display: none;"><a href="javascript:void(0);">전국</a></li>
					<li id="statsMeMapMapRegion_sgg" style="display: none;"><a href="javascript:void(0);">시도</a></li>
					<li id="statsMeMapMapRegion_emdong" style="display: none;"><a href="javascript:void(0);">시군구</a></li>
					<li id="statsMeMapMapRegion_totreg" style="display: none;"><a href="javascript:void(0);">읍면동</a></li>
				</ul>
			</div>
			<div class="type_map">
				<p>지도유형</p>
				<ul id="statsMeMapMapType">
					<li id="statsMeMapMapType_color" style="display: none;"><a href="javascript:void(0);">색상</a></li>
					<li id="statsMeMapMapType_bubble" style="display: none;"><a href="javascript:void(0);">버블</a></li>
					<li id="statsMeMapMapType_heat" style="display: none;"><a href="javascript:void(0);">열지도</a></li>
					<li id="statsMeMapMapType_poi" style="display: none;"><a href="javascript:void(0);">POI</a></li>
					<li id="statsMeMapMapType_grid" style="display: none;"><a href="javascript:void(0);">격자</a></li>
				</ul>
			</div>
			<div class="map_function">
				<div id="statsMeMap_print" class="print"><a href="javascript:void(0);"><span>인쇄</span></a></div>
				<div id="statsMeMap_bookmark" class="bookmark"><a href="javascript:void(0);"><span>북마크</span></a></div>
			</div>
		</div>
		<!-- 2020-02-17 [김남민] My통계로 상단 화면과, SGIS 포털 상단 화면 탭이 포함된 부분의 크기가 일치하도록 수정 -->
		<div id="statsMeMapMap" style="overflow: hidden; width: 100%; height: calc(100% - 35px); z-index: 1;"></div>
		<div id="statsMeMapDataBoard" class="data_board_wrap" style="z-index: 100;">
			<div id="statsMeMapDataBoard_close" class="board_close"><a href="javascript:void(0);"><span>닫기</span></a></div>
			<div id="statsMeMapDataBoard_open" class="board_open" style="display: none;"><a href="javascript:void(0);"><span>닫기</span></a></div>
			<!-- 2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 -->
			<div id="statsMeMapDataBoard_title" class="data_title">
				<p>데이터보드</p>
				<div class="sns_wrap">
					<ul>
						<li id="statsMeMap_share_kakaostory" class="sns1"><a href="javascript:void(0);"><span>카카오</span></a></li>
						<li id="statsMeMap_share_twitter" class="sns2"><a href="javascript:void(0);"><span>트위터</span></a></li>
						<li id="statsMeMap_share_facebook" class="sns3"><a href="javascript:void(0);"><span>페이스북</span></a></li>
						<!-- <li id="statsMeMap_share_linkedin" class="sns4"><a href="javascript:void(0);"><span>linked</span></a></li> -->
						<!-- <li id="statsMeMap_share_instagram" class="sns5"><a href="javascript:void(0);"><span>인스타그램</span></a></li> -->
					</ul>
				</div>
			</div>
			<!-- 2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 -->
			<div id="statsMeMapDataBoard_body" class="mCustomScrollbar data_description" data-mcs-theme="minimal-dark" style="white-space: nowrap; word-break: keep-all;">
				<strong id="statsMeMapStatDataNm2">&nbsp;</strong>
				<!-- 2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 START -->
				<p id="statsMeMapStatDataExp" style="font-family: 'NanumBarunGothic'; white-space: normal; word-break:keep-all; width: 260px;"></p>	<!-- 2019.12.03[한광희] 데이터 보드 카탈로그 설명 단어 단위로 개행 추가 -->
				<p id="statsMeMapSource" style="white-space: normal; word-break:keep-all; width: 260px;"></p>
				<!-- 2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 END -->
				<!-- <p style="display:none;">
				* 산출식 : 치킨전문점 한개당 인구(인구/치킨전문점수)
				</p> -->
				<div id="statsMeMapGoDetail" class="more">
					<!-- <div class="shortcut_icon"></div> -->
					<img alt="바로가기" src="/images/contents/service-shortcuts.png" style="width: 17px; height: 17px; margin-bottom: -3px; cursor: pointer;">
					<a href="javascript:void(0);"><!-- 자세히 --></a>
				</div>
				<div class="data_table">
					<table id="statsMeMapDataBoard_dataTable" style="display:none; width: 100%;">
						<caption style="height:25px;">데이터 보기</caption>
						<thead>
							<tr>
								<th scope="col">순위</th>
								<th scope="col">행정구역</th>
								<th scope="col" id="statsMeMapDataBoard_dataTable_unit">수</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
				<div class="data_table_paging" style="display:none;">
					<input id="statsMeMapDataBoard_dataTable_page" type="hidden" value="1">
					<input id="statsMeMapDataBoard_pagingTable_page" type="hidden" value="1">
					<div id="statsMeMapDataBoard_pagingTable_page_prev" class="page_prev">&lt;</div>
					<div class="page_table">
						<table id="statsMeMapDataBoard_pagingTable">
							<tbody>
								<tr>
									<td class="on">1</td>
									<td>2</td>
									<td>3</td>
									<td>4</td>
									<td>5</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div id="statsMeMapDataBoard_pagingTable_page_next" class="page_next">&gt;</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 인쇄 FORM -->
<form id="statsMeMapPrintForm">
	<input id="statsMeDetailInfoPrintForm_image" name="statsMeDetailInfoPrintForm_image" type="hidden" value="">
</form>