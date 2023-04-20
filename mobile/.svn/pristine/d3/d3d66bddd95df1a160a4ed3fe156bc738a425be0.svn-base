<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<title>지역현안 소통지도</title>
		<meta name="title" content="지역현안 소통지도">
		<meta name="_csrf" name="_csrf" content="${_csrf.token }" />
		<meta name="_csrf_header" name="_csrf" content="_csrf_header" content=${_csrf.headerName } />
		<link rel="stylesheet" href="${ctx }/resources/css/map/community.css" />
		<script>var defaultAdmCd = "${community.adm_cd}",communityForm=true,mapList = ${community.mapListJson },communityMapInfo = ${heumTag:convertJson(community)};</script>
		<script src="${ctx }/resources/plugins/jquery.heum.validation.js"></script>
		<script src="${ctx }/resources/js/map/community/map/communityMap.js"></script>
		<script src="${ctx }/resources/js/map/community/map/communityMapPoi.js"></script>
		<script src="${ctx }/resources/js/map/community/map/communityMapApi.js"></script>
		<script src="${ctx }/resources/js/map/community/form.js"></script>
	</head>
	<body>
		<div class="ContArea Community_Insert">
			<h1>소통지도 등록</h1>
			<button type="button" class="btn_back" onclick="location.href='${ctx}/map/community.sgis?id=${param.id }'">뒤로</button>
			<div class="Community_maparea">
				<div id="map"></div>
			</div>
			<form id="insert-form" enctype="multipart/form-data" method="post">
			<input type="hidden" id="cmmnty_map_id" name="cmmnty_map_id" />
			<input type="hidden" id="loc_x" name="loc_x" />
			<input type="hidden" id="loc_y" name=loc_y  />
			<input type="hidden" id="" name="${_csrf.parameterName }" value="${_csrf.token }"  />
				<div class="InsertForm">
					<h2>등록할 위치를 입력하세요</h2>
					<div class="Insert_Position">
						<button type="button" id="current-poi-button">현위치</button>
						<button type="button" id="direct-poi-button">위치선택</button>
						<button type="button" id="popup-poi-button">주소선택</button>
						<label for="file_input_textLocation" class="Hidden">주소</label>
						<input id="file_input_textLocation" name="reg_lc" type="text" readonly="readonly" placeholder="위치선택 또는 주소선택해주세요" data-null="false" data-max-length="66" data-error-message="'주소' ">
					</div>
					<label for="cmmnty_title" class="label">제목</label>
					<input id="cmmnty_title" name="title" type="text" data-null="false" data-max-length="33" data-error-message="'제목' ">
					<label for="cmmnty_opinion_state" class="label">의견 (<span>0</span>/150)</label>
					<input id="cmmnty_opinion_state" name="opinion_state" type="text" data-null="false" data-max-length="150" data-error-message="'의견' ">
					<label class="label">아이콘</label>
					<ul id="symbol-list" class="List">
						<c:forEach items="${customSymbolList }" var="symbol" varStatus="status">
							<li<c:if test="${status.count==1 }"> class="Check"</c:if> onclick="$(this).find('input:radio').prop('checked',true).trigger('change');">
								<c:choose>
									<c:when test="${fn:trim(community.reg_symbol)=='' }">
										<label>
											<input name="symbol" type="radio" value="${symbol.customSymbolId }" ${status.count==1?'checked':'' } data-value="" data-symbol-image="${sgisContextPath }${symbol.pathNm }thumbnail/thumbnail-XS-${symbol.saveFileNm }">
											<img style="width:23px;height:28px;" src="${ctx }${symbol.pathNm }thumbnail/thumbnail-XS-${symbol.saveFileNm }"/>
										</label>
									</c:when>
									<c:otherwise>
										<label>
										<!-- 
											<input name="symbol" type="radio" value="${symbol.order }" ${status.count==1?'checked':'' } data-value="${community.reg_symbol }" data-symbol-image="${sgisCtx }/img/community/iconset_${community.reg_symbol }${symbol.order }.png">
											<img style="width:auto;" src="${sgisCtx }/img/community/iconset_${community.reg_symbol }${symbol.order }.png"/>${symbol.labelNm }
										 -->
											<input name="symbol" type="radio" value="${symbol.order }" ${status.count==1?'checked':'' } data-value="${community.reg_symbol }" data-symbol-image="${ctx }/resources/images/community/iconset_${community.reg_symbol }${symbol.order }.png">
											<img style="width:auto;" src="${ctx }/resources/images/community/iconset_${community.reg_symbol }${symbol.order }.png"/>${symbol.labelNm }
										</label>
									</c:otherwise>
								</c:choose>
							</li>
						</c:forEach>
					</ul>
					<div id="addFileArea">
					<label for="community-file" class="label">사진</label>
						<div class="Insert_File">
							<div>
								<input id="filePathField" type="text" readonly="readonly" onclick="$('#community-file').click();">
								<button type="button" onclick="$('#community-file input:file:eq(0)').click();">파일첨부</button>
								<div id="community-file">
									<input id="community-insert-file" name="file" type="file" accept="image/*" style="display:none;">
								</div>
							</div>
						</div>
						<div id="file-list" class="file-list" style="display:none;">
							<ul></ul>
						</div>
						<ul class="txt">
							<li>*100MB미만의 사진 파일을 첨부할 수 있습니다.</li>
							<li>*개인정보를 포함하거나 저작권에 위배되는 사진은 등록할 수 없습니다.(관리자 임의 삭제 가능)</li>
							<li>*첨부한 사진은 공익을 목적으로 사용될 수 있습니다.</li>
						</ul>
					</div>
					<c:if test="${heumTag:matches(community.cmmnty_partcptn_grant_yn,'M|P|A')&&community.usr_id!=loginUsername }">
						<c:set var="push_id" value="${community.cmmnty_partcptn_grant_yn=='A'?'별명':'별명' }"/>
						<label for="id" class="label" style="margin-top: 20px;">${push_id }</label>
						<input id="id" name="id" type="text" data-null="false" data-error-message="'${push_id }' ">
						<label for="pw" class="label">비밀번호</label>
						<input id="pw" name="pw" type="password" data-null="false" data-error-message="'비밀번호' ">
					</c:if>
					<div style="text-align:center;" id="registBtnArea">
						<button type="submit" class="btn_finish">등록완료</button>
					</div>
					<div style="text-align:center; display:none;" id="modifyBtnArea">
						<button type="submit" class="btn_finish">등록완료</button>
					</div>
				</div>
			</form>
		</div>
		<%@include file="/WEB-INF/jsp/map/community/detail.jsp" %>
	</body>
</html>