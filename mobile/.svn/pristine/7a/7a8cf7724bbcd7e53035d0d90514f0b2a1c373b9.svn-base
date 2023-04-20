<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<div id="ideal-type-step1" class="ContBox step1">
	<div class="StepCont">
		<c:forEach items="${idealTypeLists }" var="map">
			<c:forEach var="depthName" items="${map.key }">
				<dl>
					<dt><c:if test="${idealTypeLists[depthName].must_slctn_yn=='Y' }"><em>*</em></c:if>${idealTypeLists[depthName].b_class_search_nm }</dt>
					<dd class="${idealTypeLists[depthName].search_type=='radio'||idealTypeLists[depthName].search_type=='checkbox'?'RadioGroup':'' }">
						<c:choose>
							<c:when test="${idealTypeLists[depthName].search_type=='location' }">
								<select id="ideal-type-sido" data-type="ideal-type"></select>
								<select id="ideal-type-sgg"></select>
							</c:when>
							<c:when test="${idealTypeLists[depthName].search_type=='radio'&&idealTypeLists[depthName].b_class_search_serial==2 }">
								<%//TODO 모바일에서는 연령 선택을 select로 변경 %>
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
							</c:when>
							<c:otherwise>
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
										<c:choose>
											<c:when test="${idealTypeLists[depthName].search_type=='image' }">
												<a 
													${defaultDataAttribute }
													href="#" class="${idealTypeLists[depthName].children[ideal].base_slctn_yn=='Y'?'M_on':'' }">
													<span style="background-image: url(${ctx }/resources/images/map/house/idealType/liketown_icon${idealTypeLists[depthName].children[ideal].b_class_search_serial }_${idealTypeLists[depthName].children[ideal].m_class_search_serial }${idealTypeLists[depthName].children[ideal].base_slctn_yn=='Y'?'_f':'' }.png);">아이콘</span>${idealTypeLists[depthName].children[ideal].m_class_search_nm }
												</a>
											</c:when>
											<c:when test="${idealTypeLists[depthName].search_type=='radio'||idealTypeLists[depthName].search_type=='checkbox' }">
												<input 
													${defaultDataAttribute } 
													type="${idealTypeLists[depthName].search_type }" 
													name="liketown_${idealTypeLists[depthName].children[ideal].b_class_search_serial }" 
													id="liketown_${idealTypeLists[depthName].children[ideal].b_class_search_serial }_${idealTypeLists[depthName].children[ideal].m_class_search_serial }" 
													${idealTypeLists[depthName].children[ideal].base_slctn_yn=='Y'?'checked="checked"':''}>
												<label data-name="liketown_${idealTypeLists[depthName].children[ideal].b_class_search_serial }" for="liketown_${idealTypeLists[depthName].children[ideal].b_class_search_serial }_${idealTypeLists[depthName].children[ideal].m_class_search_serial }" class="${idealTypeLists[depthName].children[ideal].base_slctn_yn=='Y'?'on':''}">${idealTypeLists[depthName].children[ideal].m_class_search_nm }</label>
											</c:when>
										</c:choose>
									</c:forEach>
								</c:forEach>
							</c:otherwise>
						</c:choose>
					</dd>
				</dl>
			</c:forEach>
		</c:forEach>
	</div>
	<div class="btn_wrap">
		<button class="ideal-type-next btn_base" type="button">다음</button>
	</div>
</div>