<%
/**************************************************************************************************************************
* Program Name	: My통계로 (상세정보)
* File Name		: statsMeDetailInfo.jsp
* Comment		: 
* History		: 
*	2019.08.08	김남민	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 페이지 JS -->
<script src="${pageContext.request.contextPath}/js/statsMe/statsMeDetailInfo.js"></script>

<!-- 페이지 HTML -->
<div class="map_box">
	<div class="map_function">
		<div id="statsMeDetailInfo_print" class="print"><a href="javascript:void(0);"><span>인쇄</span></a></div>
		<div id="statsMeDetailInfo_bookmark" class="bookmark"><a href="javascript:void(0);"><span>북마크</span></a></div>
	</div>
	<!-- <div class="map_title_back" id="statsMeDetailInfoBack" style="margin-top: 97px; margin-left: 27px; border-bottom: none;">
		<img alt="뒤로가기" src="/images/statsMe/back_ico.png">
	</div> -->
	<div class="btn_prev" style="top: 410px; z-index: 3; width: 35px; height: 35px; padding-left: 7px; padding-top: 5px; left: 294px;"><a href="javascript:void(0);" id="statsMeDetailInfoBack" style="background-position: center; width: 33px; height: 33px; background-size: 100%;"><span>이전</span></a></div>
	<div id="statsMeDetailInfoContentBody" class="mCustomScrollbar view_ara" data-mcs-theme="minimal-dark" >
		<div class="view_title">
			<p id="statsMeDetailInfoStatDataNm"></p>
			<div class="sub_info" id="statsMeDetailInfoSubInfo" style="top:26px;"><!-- <span>생성일 :</span> <span>데이터유형 :</span> --></div>
		</div>
		<div class="view_content">
			<div id="statsMeDetailInfoStatDataExp" style="font-family: 'NanumBarunGothic'; word-break:keep-all;">	<!-- 2019.12.03[한광희] 카탈로그 설명 단어 단위로 개행 추가 -->
			
			</div>
			
			<!-- 2020.04.13[한광희] 상세정보화면에 데이터보드 데이터보기 table 및 지도 캡쳐 추가  START -->
			<div>
				<div class="pntMap2">
					<ul>
						<!-- 2020.09.23[한광희] 지도시각화 화면 부분 사이즈 조정 START -->
						<li style="width: 950px; padding-right: 20px; border-right: 1px solid #e6e6e6; position: relative;">
							<strong>지도 시각화 화면</strong>
							<div id="pntLegend" style="width:196px;height:245px;border-right:1px solid #ccc;position:absolute;z-index:10;background-color:#fff; bottom: 5px;">
								<h3 class="pntLegendTitle" id="legendTitle" style="text-align: center; font-size: 14px;">범례 (단위 : 명)</h3>
								<div id="legend" class="pntLegend remarkbox" style="display: block; position: relative;width:215px;"></div>
				 			</div>
							<img id="statsMeDetailInfo_MapDiv" src="" style="max-width: 100%; min-width: 950px; margin-top: 15px;">						
						</li>
						<li style="vertical-align: top; padding-left: 15px;">
						<!-- 2020.09.23[한광희] 지도시각화 화면 부분 사이즈 조정 END -->
							<div class="data_table2">
								<table id="statsMeDetailInfo_dataTable" style="display:none; width: 100%; margin-top: 15px;">
									<strong>데이터 보기</strong>
									<thead>
										<tr>
											<th scope="col">순위</th>
											<th scope="col">행정구역</th>
											<th scope="col" id="statsMeDetailInfo_dataTable_unit">수</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
							</div>
							<div class="data_table_paging2">
								<input id="statsMeDetailInfo_dataTable_page" type="hidden" value="1">
								<input id="statsMeDetailInfo_pagingTable_page" type="hidden" value="1">
								<div class="page_table">
									<div id="statsMeDetailInfo_pagingTable_page_prev" class="page_prev" style="display: inline-block; margin-right: 5px; cursor: pointer;">&lt;</div>
									<table id="statsMeDetailInfo_pagingTable" style="display: inline-block; vertical-align: middle;">
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
									<div id="statsMeDetailInfo_pagingTable_page_next" class="page_next" style="display: inline-block; margin-left: 5px; cursor: pointer;">&gt;</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<!-- 2020.04.13[한광희] 상세정보화면에 데이터보드 데이터보기 table 및 지도 캡쳐 추가  START -->
			
			<div id="statsMeDetailInfoSource">
				<!-- <strong>데이터출처 -&nbsp;</strong> -->  
			</div>
			<div id="statsMeDetailInfoMenuNm">
				<!-- <strong>SGIS 콘텐츠 출처 -&nbsp;</strong> -->
			</div>
			<div id="statsMeDetailInfoKwrd">
				<!-- <strong>추천키워드 -&nbsp;</strong> -->
			</div>
			<div class="keyword_group" id="statsMeDetailInfoRecomendSvc">
				<!-- <strong>추천서비스 목록</strong> <br> -->
				<!-- <span>피자, 햄버거, 샌드위치 및 유사 음식점업</span><span>분식 및 김밥 전문점</span><span>제과점업</span> -->
			</div>
			<div id="statsMeDetailInfoMap_list_div">
				<strong>지역범주별 데이터 시각화</strong>
				<label style="font-size: 14px;"> (지도 미리보기)</label>
				<div class="map_list">
					<ul id="statsMeDetailInfoMap_list">
						<li id="statsMeDetailInfoMap_color_sido_li" style="cursor: pointer;">
							<a href="javascript:void(0);" class="map_type3" style="position: absolute; background: none; width: 0px; height: 0px; z-index: 100;">
								<span id="statsMeDetailInfoMap_color_sido_title" title="지도를 클릭하시면 해당 서비스로 이동 합니다.">전국</span>	<!-- 2019.12.03[한광희] 툴팁 타이틀 추가 -->
								<div id="statsMeDetailInfoMap_color_sido_loading" style="display: none; background-color: #D3D3D3;position: absolute;opacity: 0.6;padding:0;overflow: hidden;width: 235px;height: 142px;z-index: 1000;background-image: url('/img/common/loding_type01.gif');background-repeat: no-repeat;background-position: center;"></div>
							</a>
							<div id="statsMeDetailInfoMap_color_sido" style="padding:0; overflow: hidden; width: 100%; height: 100%; z-index: 1;" title="지도를 클릭하시면 해당 서비스로 이동 합니다."></div>
						</li>
						<li id="statsMeDetailInfoMap_color_sgg_li" style="cursor: pointer;">
							<a href="javascript:void(0);" class="map_type3" style="position: absolute; background: none; width: 0px; height: 0px; z-index: 100;">
								<span id="statsMeDetailInfoMap_color_sgg_title" title="지도를 클릭하시면 해당 서비스로 이동 합니다.">시도</span>	<!-- 2019.12.03[한광희] 툴팁 타이틀 추가 -->
								<div id="statsMeDetailInfoMap_color_sgg_loading" style="display: none; background-color: #D3D3D3;position: absolute;opacity: 0.6;padding:0;overflow: hidden;width: 235px;height: 142px;z-index: 1000;background-image: url('/img/common/loding_type01.gif');background-repeat: no-repeat;background-position: center;"></div>
							</a>
							<div id="statsMeDetailInfoMap_color_sgg" style="padding:0; overflow: hidden; width: 100%; height: 100%; z-index: 1;" title="지도를 클릭하시면 해당 서비스로 이동 합니다."></div>
						</li>
						<li id="statsMeDetailInfoMap_color_emdong_li" style="cursor: pointer;">
							<a href="javascript:void(0);" class="map_type2" style="position: absolute; background: none; width: 0px; height: 0px; z-index: 100;">
								<span id="statsMeDetailInfoMap_color_emdong_title" title="지도를 클릭하시면 해당 서비스로 이동 합니다.">시군구</span>	<!-- 2019.12.03[한광희] 툴팁 타이틀 추가 -->
								<div id="statsMeDetailInfoMap_color_emdong_loading" style="display: none; background-color: #D3D3D3;position: absolute;opacity: 0.6;padding:0;overflow: hidden;width: 235px;height: 142px;z-index: 1000;background-image: url('/img/common/loding_type01.gif');background-repeat: no-repeat;background-position: center;"></div>
							</a>
							<div id="statsMeDetailInfoMap_color_emdong" style="padding:0; overflow: hidden; width: 100%; height: 100%; z-index: 1;" title="지도를 클릭하시면 해당 서비스로 이동 합니다."></div>
						</li>
						<li id="statsMeDetailInfoMap_color_totreg_li" style="cursor: pointer;">
							<a href="javascript:void(0);" class="map_type1" style="position: absolute; background: none; width: 0px; height: 0px; z-index: 100;">
								<span id="statsMeDetailInfoMap_color_totreg_title" title="지도를 클릭하시면 해당 서비스로 이동 합니다.">읍면동</span>	<!-- 2019.12.03[한광희] 툴팁 타이틀 추가 -->
								<div id="statsMeDetailInfoMap_color_totreg_loading" style="display: none; background-color: #D3D3D3;position: absolute;opacity: 0.6;padding:0;overflow: hidden;width: 235px;height: 142px;z-index: 1000;background-image: url('/img/common/loding_type01.gif');background-repeat: no-repeat;background-position: center;"></div>
							</a>
							<div id="statsMeDetailInfoMap_color_totreg" style="padding:0; overflow: hidden; width: 100%; height: 100%; z-index: 1;" title="지도를 클릭하시면 해당 서비스로 이동 합니다."></div>
						</li>
						<li id="statsMeDetailInfoMap_color_100m_li" style="cursor: default;">
							<a href="javascript:void(0);" class="map_type4" style="cursor: default; position: absolute; background: none; width: 0px; height: 0px; z-index: 100;">
								<span id="statsMeDetailInfoMap_color_100m_title">100m 격자지도</span>
								<div id="statsMeDetailInfoMap_color_100m_loading" style="display: none; background-color: #D3D3D3;position: absolute;opacity: 0.6;padding:0;overflow: hidden;width: 235px;height: 142px;z-index: 1000;background-image: url('/img/common/loding_type01.gif');background-repeat: no-repeat;background-position: center;"></div>
							</a>
							<div id="statsMeDetailInfoMap_color_100m" style="padding:0; overflow: hidden; width: 100%; height: 100%; z-index: 1;"></div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 인쇄 FORM -->
<form id="statsMeDetailInfoPrintForm">
	<input id="statsMeDetailInfoPrintForm_color_sido_yn"      name="statsMeDetailInfoPrintForm_color_sido_yn"      type="hidden" value="">
	<input id="statsMeDetailInfoPrintForm_color_sido_image"   name="statsMeDetailInfoPrintForm_color_sido_image"   type="hidden" value="">
	<input id="statsMeDetailInfoPrintForm_color_sgg_yn"       name="statsMeDetailInfoPrintForm_color_sgg_yn"       type="hidden" value="">
	<input id="statsMeDetailInfoPrintForm_color_sgg_image"    name="statsMeDetailInfoPrintForm_color_sgg_image"    type="hidden" value="">
	<input id="statsMeDetailInfoPrintForm_color_emdong_yn"    name="statsMeDetailInfoPrintForm_color_emdong_yn"    type="hidden" value="">
	<input id="statsMeDetailInfoPrintForm_color_emdong_image" name="statsMeDetailInfoPrintForm_color_emdong_image" type="hidden" value="">
	<input id="statsMeDetailInfoPrintForm_color_totreg_yn"    name="statsMeDetailInfoPrintForm_color_totreg_yn"    type="hidden" value="">
	<input id="statsMeDetailInfoPrintForm_color_totreg_image" name="statsMeDetailInfoPrintForm_color_totreg_image" type="hidden" value="">
	<input id="statsMeDetailInfoPrintForm_color_100m_yn"      name="statsMeDetailInfoPrintForm_color_100m_yn"      type="hidden" value="">
	<input id="statsMeDetailInfoPrintForm_color_100m_image"   name="statsMeDetailInfoPrintForm_color_100m_image"   type="hidden" value="">
</form>