<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<div id="databoard-area" class="Open_Type1" style="display:none; background-color: #fff; top: 101px; height:calc(100vh - 101px); position: fixed; box-sizing:border-box; padding:10px; border-top:3px solid #112B48">
	<div style="display:flex;justify-content: space-between; ">
		<h2>데이터보드</h2>
		<button class="" type="button" style="" onclick="$('#databoard-area').hide();">
			<svg width="15" height="15" viewBox="0 0 15 15" fill="#000" xmlns="http://www.w3.org/2000/svg">
				<path d="M1 1L13 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
				<path d="M13 1L1 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
			</svg>
		</button>
	</div>
	<div class="gallery-thumbstxt" style="height: 40px; ">
		<div class="gallery-thumbBox" style="margin-bottom: 0;">
			<div class="tabDataboardtxt current">
				<p><a>지역종합현황보기</a></p>
			</div>
			<div class="tabDataboardtxt">
				<p><a>지표별 상세현황</a></p>
			</div>
			<div class="tabDataboardtxt">
				<p><a>소지역정보</a></p>
			</div>
		</div>
	</div>
	<div id="databoard-box" class="DetailBox" style="padding:0 0 100px 0; box-sizing:border-box; background-color: #fff; height:100%; overflow-y:auto;">
		<div class="Detail2_1">
			<div class="igDataWrap">
				<ul>
					<li>
						<div class="igTitle">
							<span style="color:#73787d; font-size: 13px;">기준지역</span>
						</div>
						<div class="igTitle">
							<span>전국평균</span>
						</div>
						<div class="igData i_blue" id="databoard_page_0_all_avg" style="padding: 5px 15px 15px 15px; font-size: 18px;">5</div>
					</li>
					<li>
						<div class="igTitle">
							<span style="color:#73787d; font-size: 13px;">추천지역</span><br/>
						</div>
						<div class="igTitle">
							<span id="databoard_page_0_this_title" style="width: auto; margin: 0px; height: auto; border-radius: 0px; white-space: nowrap;"></span>
						</div>
						<div class="igData i_red" id="databoard_page_0_this_avg" style="padding: 5px 15px 15px 15px; font-size: 18px;"></div>
					</li>
				</ul>
			</div>
			<div class="infoGraph1" style="text-align: center; padding: 0px;">
				<div id="databoard_page_0_chart" style="width: 100%; overflow: hidden;"></div>
			</div>
			<div class="InfodataWrap">
				<div class="left"> 
					<span class="good">
						<img id="databoard_page_0_info_img" src="${ctx }/resources/m2020/images/common/icon_info1.png"  style="width: 50px;"/>
					</span> 
				</div>
				<div class="right">
					<div class="right_tit">
						<p class="goot_txt" id="databoard_page_0_info_title">녹지비율 낮음</p>
					</div>
					<div class="right_con">
					<ul>
						<li>
							<div class="bDataTit" style="font-size: 13px;">
								전국평균
							</div>
							<p class="i_blue" id="databoard_page_0_info_all">5.35</p>
						</li>
						<li>
							<div class="bDataTit">
								<span id="databoard_page_0_this_admNm" style="width: auto; margin: 0px; height: auto; border-radius: 0px; white-space: nowrap; max-width: 69%; font-size: 13px;">대전광역시 서구</span>
							</div>
							<p class="i_red" id="databoard_page_0_info_this">5.18( ▲ +0.63)</p>
						</li>
					</ul>
					
					</div>
				</div>
			</div>
		</div>
		<div class="Detail2_1" style="display:none;">
			<div class="nav_h_type lifeMenuWrapDataboard" id="recomendHouse-databoard-tab">
				<ul>
					<li style="width: 15px;"></li>
					<c:forEach var="map" items="${mlsfcLists }" varStatus="depth">
						<c:if test="${map.value.info.recmd_region_search_disp_yn=='Y' }">
							<c:forEach var="depthName" items="${map.key }">
								<li class="infoMenu ${depth.count==1?'on':''}" data-index="${depth.count }">
									<span id="lifeMenuCount${depth.count }"></span>
									<a href="javascript:void(0);" data-class-type="b" data-id="${depthName }" class="lifeMenu${depth.count }">${mlsfcLists[depthName].info.b_class_idx_nm  }</a>
								</li>
								<li style="width: 10px;"></li>
							</c:forEach>
						</c:if>
					</c:forEach>
				</ul>
			</div>
			<div id="indicator-navigator" style="height: auto;">
				<c:forEach var="map" items="${mlsfcLists }" varStatus="depth">
					<c:if test="${map.value.info.recmd_region_search_disp_yn=='Y' }">
						<c:forEach var="depthName" items="${map.key }">
							<div class="houseDatatabWrap" style="width:100%; ${depth.index==0?'display:flex':'display:none'}" id="indicator-navigator_${depth.count }">
								<c:forEach var="indicator" items="${mlsfcLists[depthName].indicator }" varStatus="status">
									<c:forEach var="mlsfc" items="${indicator.key }" >
										<div class="houseDatatab ${status.index==0?'on':''} ${status.count} ${status.index}">
											<a href="#" data-class-type="m" data-parent-id="${mlsfcLists[depthName].indicator[mlsfc].b_class_idx_id }" data-id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id }">
												${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_nm }
											</a>
										</div>
									</c:forEach>
								</c:forEach>
							</div>
						</c:forEach>
					</c:if>
				</c:forEach>
			</div>
			<div id="indicator-chart" style="margin-bottom: 15px;"></div>
			<div class="indicator-InfochartWrap">
				<table>
					<tbody>
						<tr>
							<td id="stand-indicator-avg-list" data-stand="true" class="blueData"></td>
							<td id="indicator-avg-list" class="redData"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="Detail2_1" style="display:none;">
			<div class="houseDatatabWrap">
				<div class="houseDatatab on"><a href="#" class="tab-item">연령대별 인구</a></div>
				<div class="houseDatatab"><a href="#" class="tab-item">주택종류</a></div>
				<div class="houseDatatab"><a href="#" class="tab-item">사업체 수</a></div>
			</div>
			<div class="igDataWrap">
				<p class="subtit" style="text-align: center; margin-top: 10px; font-size:13px; color:#777C82; " id="databoard-chartCategoryTitle">강남구</p>
				<ul>
					<li>
						<div class="igTitle">
							<span id="databoard-area-title">기준지역</span>
						</div>
						<div class="igData i_blue" id="databoard-area-data" style="padding: 0px 15px 15px 15px; font-size: 17px;">5</div>
					</li>
					<li>
						<div class="igTitle">
							<span id="databoard-parent-area-title">추천지역</span><br/>
						</div>
						<div class="igData i_red" id="databoard-parent-area-data" style="padding: 0px 15px 15px 15px; font-size: 17px;"></div>
					</li>
					<li id="databoard-topParent" style="display: none;">
						<div class="igTitle">
							<span id="databoard-topParent-area-title">추천지역</span><br/>
						</div>
						<div class="igData i_red" id="databoard-topParent-area-data" style="padding: 0px 15px 15px 15px; font-size: 17px;"></div>
					</li>
				</ul>
			</div>
			<div class="TabArea">
				<div class="chart"></div>
				<p class="origin_txt census">
				</p>
			</div>
			<div class="TabArea" style="display:none;">
				<div class="chart"></div>
				<p class="origin_txt census">
				</p>
			</div>
			<div class="TabArea" style="display:none;">
				<div class="chart"></div>
				<p class="origin_txt">
				</p>
			</div>
		</div>
		 
	</div>
</div>
