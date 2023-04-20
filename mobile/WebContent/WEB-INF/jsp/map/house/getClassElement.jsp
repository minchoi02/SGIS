<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<%
   //치환 변수 선언
	pageContext.setAttribute("cr", "\r"); //Space
	pageContext.setAttribute("cn", "\n"); //Enter
	pageContext.setAttribute("crcn", "\r\n"); //Space, Enter
	pageContext.setAttribute("br", "<br/>"); //br 태그
%> 
<c:forEach var="map" items="${mlsfcLists }" varStatus="depth">
	<c:if test="${map.value.info.recmd_region_search_disp_yn=='Y' }">
		<c:forEach var="depthName" items="${map.key }">
			<li class="index${depth.count } ${depth.count==1?'M_on':''}">
				<a href="#" class="indexL" data-id="${depthName }"><img src="${ctx }/resources/images/house/icon_${depthName }.png" alt=""/>${mlsfcLists[depthName].info.b_class_idx_nm  }</a>
				<c:if test="${recommend }">
					<div class="m-class-items"></div>
				</c:if>
				<ul>
					<c:forEach var="indicator" items="${mlsfcLists[depthName].indicator }" varStatus="status">
						<c:forEach var="mlsfc" items="${indicator.key }">
							<%//TODO 오승찬 주무관이 주거현황보기 지표선택에서 자연은 디폴트로 녹지비율로 해달라고 해서 현재 이렇게 개발 되어있음 필요 없으면 activeMclass를 삭제해주시고 ${status.index==0 } 로 대체해주시면 됩니다. %>
							<c:set var="activeMclass">
								<c:choose>
									<c:when test="${depthName=='HML0001' }">
										${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id=='HMM0003' }
									</c:when>
									<c:otherwise>
										${status.index==0 }
									</c:otherwise>
								</c:choose>
							</c:set>
							<li class="${depth.count==1&&activeMclass&&!recommend?'M_on':'' } sub-class">
								<a href="#" class="indecator-item" data-subj="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_nm }" title="${fn:replace((recommend?fn:escapeXml(mlsfcLists[depthName].indicator[mlsfc].recomend_area_search_exp):fn:escapeXml(mlsfcLists[depthName].indicator[mlsfc].abbrev_exp)), cn, br) }" data-parent-id="${depthName }" data-id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id }" data-level="${mlsfcLists[depthName].indicator[mlsfc].disp_level }" data-text="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_nm }">
									<img src="${ctx }/resources/images/house/icon_${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id }.png" alt=""/>${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_nm }
									<c:if test="${!recommend }">
										<span class="MapKind type${mlsfcLists[depthName].indicator[mlsfc].disp_level }">
											<c:choose>
												<c:when test="${mlsfcLists[depthName].indicator[mlsfc].disp_level=='1' }">시도</c:when>
												<c:when test="${mlsfcLists[depthName].indicator[mlsfc].disp_level=='2' }">시군구</c:when>
												<c:when test="${mlsfcLists[depthName].indicator[mlsfc].disp_level=='3' }">읍면동</c:when>
											</c:choose>
										</span>
									</c:if>
								</a>
								<c:if test="${recommend }">
									<span class="bagic" data-value="2">기준지역지표<strong> 중</strong></span>
									<span class="SetStart">
										정렬기준
										<c:set var="orderbyBase1">
											<c:choose>
												<c:when test="${mlsfcLists[depthName].indicator[mlsfc].order_base=='1' }">좋음<c:set var="orderbyBase2" value="나쁨"/></c:when>
												<c:when test="${mlsfcLists[depthName].indicator[mlsfc].order_base=='2' }">높음<c:set var="orderbyBase2" value="낮음"/></c:when>
												<c:when test="${mlsfcLists[depthName].indicator[mlsfc].order_base=='3' }">넒음<c:set var="orderbyBase2" value="좁음"/></c:when>
												<c:when test="${mlsfcLists[depthName].indicator[mlsfc].order_base=='4' }">많음<c:set var="orderbyBase2" value="적음"/></c:when>
												<c:otherwise>
													좋음<c:set var="orderbyBase2" value="나쁨"/>
												</c:otherwise>
											</c:choose>
										</c:set>
										<c:choose>
											<c:when test="${mlsfcLists[depthName].indicator[mlsfc].order_base_disp == '0' }">
												<button type="button" class="${mlsfcLists[depthName].indicator[mlsfc].default_value==0?'M_on':''}" value="3" data-id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id}">${orderbyBase1 }</button>
											</c:when>
											<c:when test="${mlsfcLists[depthName].indicator[mlsfc].order_base_disp == '1' }">
												<button type="button" class="${mlsfcLists[depthName].indicator[mlsfc].default_value==1?'M_on':''}" value="1" data-id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id}">${orderbyBase2 }</button>
											</c:when>
											<c:when test="${mlsfcLists[depthName].indicator[mlsfc].order_base_disp == '2' }">
												<button type="button" class="${mlsfcLists[depthName].indicator[mlsfc].default_value==0?'M_on':''}" value="${mlsfcLists[depthName].indicator[mlsfc].default_value==0?'3':'1'}" data-id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id}">${orderbyBase1 }</button>
												<button type="button" class="${mlsfcLists[depthName].indicator[mlsfc].default_value==1?'M_on':''}" value="${mlsfcLists[depthName].indicator[mlsfc].default_value==0?'1':'3'}" data-id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id}">${orderbyBase2 }</button>
											</c:when>
										</c:choose>
									</span>
									<select class="SetStepSelect" ${depth.count==1&&activeMclass&&!recommend?'':'disabled="disabled"' } data-id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id}">
										<option value="3">가중치&nbsp;&nbsp;&nbsp;&nbsp;상</option>
										<option value="2" selected="selected">가중치&nbsp;&nbsp;&nbsp;&nbsp;중</option>
										<option value="1">가중치&nbsp;&nbsp;&nbsp;&nbsp;하</option>
									</select>
								</c:if>
							</li>
						</c:forEach>
					</c:forEach>
				</ul>
			</li>
		</c:forEach>
	</c:if>
</c:forEach>