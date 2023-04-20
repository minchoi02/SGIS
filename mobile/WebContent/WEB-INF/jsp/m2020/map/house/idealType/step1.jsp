<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<div id="ideal-type-step1" class="tab-content current" style="height: calc(100vh - 180px);padding: 0 0 200px 0;-webkit-overflow-scrolling:touch;">
	<c:forEach items="${idealTypeLists }" var="map">
		<c:forEach var="depthName" items="${map.key }">
			<div>
				<div class="tab-conRow">
					<c:if test="${idealTypeLists[depthName].must_slctn_yn=='Y' }">
						<span class="pointer">*</span>
					</c:if>
					<h4 class="Catalogtit">${idealTypeLists[depthName].b_class_search_nm }</h4>
				</div>
				
				<c:choose>
					<c:when test="${idealTypeLists[depthName].search_type=='location' }">
						<div class="tab-conRow">
							<select id="ideal-type-sido" data-type="ideal-type"></select>
							<select id="ideal-type-sgg">
								<option value="999" data-x="990480.875" data-y="1815839.375">전체</option>
							</select>						
						</div>
					</c:when>
					<c:when test="${idealTypeLists[depthName].search_type=='radio'&&idealTypeLists[depthName].b_class_search_serial==2 }">
						<div class="tab-conRow">
							<select title="${idealTypeLists[depthName].b_class_search_nm }" data-name="liketown_${idealTypeLists[depthName].b_class_search_serial }">
								<c:set var="hasDefault" value="N"/>
								<c:forEach items="${idealTypeLists[depthName].children }" var="idealTypeChildren">
									<c:forEach items="${idealTypeChildren.key }" var="ideal">
										<c:set var="defaultDataAttribute">
											data-search-item="true"
											data-type="radio"
											data-parent-id="${idealTypeLists[depthName].children[ideal].b_class_search_serial }"
											data-id="${idealTypeLists[depthName].children[ideal].m_class_search_serial }"
											data-title="${idealTypeLists[depthName].children[ideal].m_class_search_nm }"
											data-name="liketown_${idealTypeLists[depthName].children[ideal].b_class_search_serial }"
											data-default="${idealTypeLists[depthName].children[ideal].base_slctn_yn }" 
										</c:set>
										<option ${defaultDataAttribute } value="${idealTypeLists[depthName].children[ideal].m_class_search_serial }" ${idealTypeLists[depthName].children[ideal].base_slctn_yn=='Y'?'selected="selected"':'' }>
											${idealTypeLists[depthName].children[ideal].m_class_search_nm }
										</option>
										<c:if test="${idealTypeLists[depthName].children[ideal].base_slctn_yn=='Y' }">
											<c:set var="hasDefault" value="Y"/>
										</c:if>
									</c:forEach>
								</c:forEach>
							</select>						
						</div>
					</c:when>
					<c:otherwise>
						<c:forEach items="${idealTypeLists[depthName].children }" var="idealTypeChildren" varStatus="status">
							<c:forEach items="${idealTypeChildren.key }" var="ideal">
									<c:set var="defaultDataAttribute">
										data-search-item="true"
										data-type="radio"
										data-parent-id="${idealTypeLists[depthName].children[ideal].b_class_search_serial }"
										data-id="${idealTypeLists[depthName].children[ideal].m_class_search_serial }"
										data-title="${idealTypeLists[depthName].children[ideal].m_class_search_nm }"
										data-name="liketown_${idealTypeLists[depthName].children[ideal].b_class_search_serial }"
										data-default="${idealTypeLists[depthName].children[ideal].base_slctn_yn }" 
									</c:set>
									<c:choose>
										<c:when test="${idealTypeLists[depthName].search_type=='image' }">
											<c:if test="${status.count%2 != 0 }">
												<div class="tab-conRow">
											</c:if>
												<div class="tab-ConCard ${idealTypeLists[depthName].children[ideal].base_slctn_yn=='Y'?'on':'' }" ${defaultDataAttribute }>
													<img src="${ctx }/resources/m2020/images/sub/house/idealType/liketown_icon${idealTypeLists[depthName].children[ideal].b_class_search_serial }_${idealTypeLists[depthName].children[ideal].m_class_search_serial }.png">
													<p class="Catalogtxt">${idealTypeLists[depthName].children[ideal].m_class_search_nm }</p>
												</div>
											<c:if test="${status.count%2 == 0 || status.last}">
												</div>
											</c:if>
										</c:when>
										<c:when test="${idealTypeLists[depthName].search_type=='radio'||idealTypeLists[depthName].search_type=='checkbox' }">
											<c:if test="${status.first }">
												<div class="tab-conRow sfbSchool">
													<ul style="width: 100%;">
											</c:if>
											<li>
												<a ${defaultDataAttribute } 
												   name="liketown_${idealTypeLists[depthName].children[ideal].b_class_search_serial }" 
												   id="liketown_${idealTypeLists[depthName].children[ideal].b_class_search_serial }_${idealTypeLists[depthName].children[ideal].m_class_search_serial }">${idealTypeLists[depthName].children[ideal].m_class_search_nm }</a>
											</li>
											<c:if test="${status.last}">	
													</ul>
												</div>
											</c:if>											
										</c:when>
									</c:choose>
								</c:forEach>
						</c:forEach>
					</c:otherwise>
				</c:choose>
			</div>
		</c:forEach>
	</c:forEach>


	
	<div class="sfbFooter3">
		<button class="btn_search" type="button" id="step1_nextPage" name="nextPage" style="width: 100px; height:35px;">다음</button>
	</div>
</div>