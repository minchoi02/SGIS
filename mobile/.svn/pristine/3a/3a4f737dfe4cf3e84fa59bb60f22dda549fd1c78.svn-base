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
			<div class="hopeCardbox" id="houseStatus_indexPage_${depth.count }" style="${depth.count==1?'display: flex;':'display: none;'}">
				<ul class="" style="display: flex; flex-direction: row;">
					<c:forEach var="indicator" items="${mlsfcLists[depthName].indicator }" varStatus="status">
						<c:forEach var="mlsfc" items="${indicator.key }">					
							<!-- 지표 내역 START -->
							<li class="" style="box-shadow:0px 0px 0px rgba(0,0,0,0);">
								<div class="hopeCard" style="min-height: 145px; min-width: 100%;">
									<div class="hopeCard_check"> 
										<input type="checkbox" name="houseIndex" id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id }" data-parent-id="${depthName }" style="margin:0;">
										<label for="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id }" data-subj="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_nm }" title="${fn:replace((recommend?fn:escapeXml(mlsfcLists[depthName].indicator[mlsfc].recomend_area_search_exp):fn:escapeXml(mlsfcLists[depthName].indicator[mlsfc].abbrev_exp)), cn, br) }" data-parent-id="${depthName }" data-id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id }" data-level="${mlsfcLists[depthName].indicator[mlsfc].disp_level }" data-text="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_nm }"></label>
									</div>
									<ul class="cardList_result">
										<li>
											<img src="${ctx }/resources/m2020/images/sub/house/icon_${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id }.png">
											<p>${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_nm }</p>
											<c:if test="${!recommend }">
												<c:choose>
													<c:when test="${mlsfcLists[depthName].indicator[mlsfc].disp_level=='1' }"><span class="resultSpan0">시도</span></c:when>
													<c:when test="${mlsfcLists[depthName].indicator[mlsfc].disp_level=='2' }"><span class="resultSpan1">시군구</span></c:when>
													<c:when test="${mlsfcLists[depthName].indicator[mlsfc].disp_level=='3' }"><span class="resultSpan2">읍면동</span></c:when>
												</c:choose>
											</c:if>
										</li>
									</ul>
								</div>
							</li>						
							<!-- 지표 내역 END -->
						</c:forEach>
					</c:forEach>
				</ul>
			</div>
		</c:forEach>
	</c:if>
</c:forEach>