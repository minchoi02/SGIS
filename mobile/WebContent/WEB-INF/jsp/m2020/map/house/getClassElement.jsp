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
			<div class="hopelifeCardWrap"  id="house_indexPage_${depth.count }" style="${depth.count==1?'display: block;':'display: none;'}">
			<c:if test="${recommend }">
				<div class="m-class-items"></div>
			</c:if>
			<c:forEach var="indicator" items="${mlsfcLists[depthName].indicator }" varStatus="status">
				<c:forEach var="mlsfc" items="${indicator.key }">
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
					
					<!-- 상세 지표 2개 묶음 표시를 위한 div 추가 START -->
					<c:if test="${status.count%2 != 0}">
						<div class="hopeCardbox">
					</c:if>
					<!-- 상세 지표 2개 묶음 표시를 위한 div 추가 END -->
					
					<!-- 지표 내역 START -->
					<div class="hopeCard">
						<div class="hopeCard_check">
							<input type="checkbox" name="houseIndex" id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id }" data-parent-id="${depthName }" style="margin:0;">
							<label for="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id }" data-subj="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_nm }" title="${fn:replace((recommend?fn:escapeXml(mlsfcLists[depthName].indicator[mlsfc].recomend_area_search_exp):fn:escapeXml(mlsfcLists[depthName].indicator[mlsfc].abbrev_exp)), cn, br) }" data-parent-id="${depthName }" data-id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id }" data-level="${mlsfcLists[depthName].indicator[mlsfc].disp_level }" data-text="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_nm }"></label>
						</div>
						<ul class="cardList">
							<li>
								<img src="${ctx }/resources/m2020/images/sub/house/icon_${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id }.png">
							</li>
							<li class="cardList-tit">${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_nm }</li>
							<li class="conLi">
								<p>정렬기준</p>
								<div style="margin-left: auto;">
									<c:set var="orderbyBase1">
										<c:choose>
											<c:when test="${mlsfcLists[depthName].indicator[mlsfc].order_base=='1' }">
												좋음<c:set var="orderbyBase2" value="나쁨"/>
											</c:when>
											<c:when test="${mlsfcLists[depthName].indicator[mlsfc].order_base=='2' }">
												높음<c:set var="orderbyBase2" value="낮음"/>
											</c:when>
											<c:when test="${mlsfcLists[depthName].indicator[mlsfc].order_base=='3' }">
												넒음<c:set var="orderbyBase2" value="좁음"/>
											</c:when>
											<c:when test="${mlsfcLists[depthName].indicator[mlsfc].order_base=='4' }">
												많음<c:set var="orderbyBase2" value="적음"/>
											</c:when>
											<c:otherwise>
												좋음<c:set var="orderbyBase2" value="나쁨"/>
											</c:otherwise>
										</c:choose>
									</c:set>
									<c:choose>
										<c:when test="${mlsfcLists[depthName].indicator[mlsfc].order_base_disp == '0' }">
											<a class="${mlsfcLists[depthName].indicator[mlsfc].default_value==0?'on':''}" data-value="3" data-id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id}">${orderbyBase1 }</a>
										</c:when>
										<c:when test="${mlsfcLists[depthName].indicator[mlsfc].order_base_disp == '1' }">
											<a class="${mlsfcLists[depthName].indicator[mlsfc].default_value==1?'on':''}" data-value="1" data-id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id}">${orderbyBase2 }</a>
										</c:when>
										<c:when test="${mlsfcLists[depthName].indicator[mlsfc].order_base_disp == '2' }">
											<a class="${mlsfcLists[depthName].indicator[mlsfc].default_value==0?'on':''}" data-value="${mlsfcLists[depthName].indicator[mlsfc].default_value==0?'3':'1'}" data-id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id}">${orderbyBase1 }</a>
											<a class="${mlsfcLists[depthName].indicator[mlsfc].default_value==1?'on':''}" data-value="${mlsfcLists[depthName].indicator[mlsfc].default_value==0?'1':'3'}" data-id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id}">${orderbyBase2 }</a>
										</c:when>
									</c:choose>
								</div>
							</li>
							<li class="conLi">
								<p>기준지역표</p>
								<div><span data-value="2">중</span></div>
							</li>
							<li class="conLi">
								<p>가중치</p>
								<div>
									<select class="SetStepSelect" id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id}" data-id="${mlsfcLists[depthName].indicator[mlsfc].m_class_idx_id}">
										<option value="3">상</option>
										<option value="2" selected="selected">중</option>
										<option value="1">하</option>
									</select>
								</div>
							</li>
						</ul>
					</div>
					<!-- 지표 내역 END -->
					
					<!-- 상세 지표 2개 묶음 표시를 위한 div 추가 START -->
					<c:if test="${status.count%2 == 0 || status.last}">
						</div>
					</c:if>
					<!-- 상세 지표 2개 묶음 표시를 위한 div 추가 END -->
				</c:forEach>
			</c:forEach>
			</div>
		</c:forEach>
	</c:if>
</c:forEach>