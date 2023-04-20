<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<div id="databoard-area" class="Open_Type1" style="display:none;">
	<h3 id="databoard-area-title">데이터보드</h3>
	<button class="BtnClose" onclick="$('#databoard-area').hide();">데이터보드닫기</button>
	<div class="Subject SubjectB">
		<nav><a href="#" class="subject1 M_on">지역종합현황보기</a><a href="#" class="subject2">지표별 상세현황</a><a href="#" class="subject3">소지역정보</a></nav>
	</div>
	<div id="databoard-box" class="DetailBox" style="padding:0;">
		<div class="Detail2_1">
			<div id="spider-web-chart-prev" class="spider-web-chart-navigator prev" style="display:none;">이전</div>
			<div id="spider-web-box">
				<div id="compare-region-spiderweb-chart" style="display:none;"></div>
				<div id="compare-region-spiderweb-chart-label" style="text-align: center;display:none;"></div>
				<div id="region-spiderweb-chart"></div>
				<div id="region-spiderweb-chart-label" style="text-align: center;"></div>
			</div>
			<div id="spider-web-chart-next" class="spider-web-chart-navigator next" style="display:none;">다음</div>
		</div>
		<div class="Detail2_1" style="display:none;">
			<div>
				<div id="indicator-navigator">
					<c:forEach var="map" items="${mlsfcLists }" varStatus="depth">
						<c:if test="${map.value.info.recmd_region_search_disp_yn=='Y' }">
							<c:forEach var="depthName" items="${map.key }">
								<div class="${depth.index==0?'M_on':''}">
									<div class="b-class-box">
										<a href="#" class="left">&lt;</a>
										<a href="#" data-class-type="b">${mlsfcLists[depthName].info.b_class_idx_nm  }</a>
										<a href="#" class="right">&gt;</a>
									</div>
									<div class="TabGroup m-class-box" style="overflow:visible;">
										<div style="width:100%;">
											<c:forEach var="indicator" items="${mlsfcLists[depthName].indicator }" varStatus="status">
												<c:forEach var="mlsfc" items="${indicator.key }" >
													<div class="tab ${status.index==0?'M_on':''} ${status.count} ${status.index}">
														<a href="#" data-class-type="m" data-parent-id="${mlsfcLists[depthName].indicator[mlsfc].b_class_idx_id }" data-id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id }">
															${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_nm }
														</a>
													</div>
												</c:forEach>
											</c:forEach>
										</div>
									</div>
								</div>
							</c:forEach>
						</c:if>
					</c:forEach>
				</div>
			</div>
			<div id="indicator-chart" style="margin-bottom: 15px;"></div>
			<div class="ChartInfo">
				<table>
					<caption>차트요약정보</caption>
					<thead>
						<tr>
							<th scope="col" data-stand="true">기준지역</th>
							<th scope="col">추천지역</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td id="stand-indicator-avg-list" data-stand="true"></td>
							<td id="indicator-avg-list"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="Detail2_1" style="display:none;">
			<div class="TabGroup">
				<div class="tab M_on"><a href="#" class="tab-item">연령대별 인구</a></div>
				<div class="tab"><a href="#" class="tab-item">주택종류</a></div>
				<div class="tab"><a href="#" class="tab-item">사업체 수</a></div>
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
