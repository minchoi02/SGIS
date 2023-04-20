<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/m2020/includes/taglib.jsp" %> 
		<div class="ContArea Community_Insert" id="community-form" style="display:none;">
			<div class="datatit">
        		<h2>의견<span class="modify">등록</span></h2>
      		</div>
			<div class="Community_maparea">
			</div>
			
			<div class="idPwDiv1" style="display:none;">
				<c:if test="${heumTag:matches(community.cmmnty_partcptn_grant_yn,'M|P|A')&&community.usr_id!=loginUsername }">
					<label for="check_id" class="sfbLabel" style="margin-top: 20px;">별명</label>
					<input id="check_id" name="check_id" type="text" data-null="false" class="inputclear" data-min-length="5" data-error-message="'별명'" placeholder="별명을 입력하세요.">
					<label for="check_pw" class="sfbLabel">비밀번호</label>
					<input id="check_pw" name="check_pw" type="password" data-null="false" class="inputclear" data-error-message="'비밀번호'" placeholder="비밀번호를 입력하세요.">
					<div class="confirmDiv" style="text-align: center;">
						<button onclick="javascript:$communityMapPoi.ui.idPwCheck();" style="width: 80px;padding: 5px;background-color: white;border: 1px solid #ddd;border-radius: 3px;">확인</button>
						<button onclick="javascript:$communityMapPoi.ui.btnCancel();" style="width: 80px;padding: 5px;background-color: white;border: 1px solid #ddd;border-radius: 3px;">취소</button>
					</div>
				</c:if>
			</div>
			
			<form id="insert-form" enctype="multipart/form-data" method="post" style="margin-bottom: 50px; display:none;">
			<input type="hidden" id="cmmnty_map_id" name="cmmnty_map_id" />
			<input type="hidden" id="cmmnty_poi_id" name="cmmnty_poi_id" class="inputclear"/>
			
			<input type="hidden" id="deleteFileList" name="deleteFileList" class="inputclear"/>
			
			<input type="hidden" id="loc_x" name="loc_x" class="inputclear"/>
			<input type="hidden" id="loc_y" name=loc_y  class="inputclear"/>
			
			<input type="hidden" id="" name="${_csrf.parameterName }" value="${_csrf.token }"  />
			
			<c:choose>
				<c:when test="${ heumTag:matches( community.cmmnty_partcptn_grant_yn,'M|P|A|N|Y' ) && community.usr_id == loginUsername }">
					<input id="id" name="id" type="hidden" class="inputclear" value="${loginUsername}">
					<input id="pw" name="pw" type="hidden" class="inputclear" value="jeongrj0326">
				</c:when>
				<c:when test="${ heumTag:matches( community.cmmnty_partcptn_grant_yn,'N|Y' ) && community.usr_id != loginUsername }">
					<input id="id" name="id" type="hidden" class="inputclear" value="${loginUsername}">
					<input id="pw" name="pw" type="hidden" class="inputclear" value="jeongrj0326">
				</c:when>
				<c:otherwise>
				</c:otherwise>
			</c:choose>
			
				<div class="InsertForm">
					<label for="cmmnty_title" class="sfbLabel">제목</label>
					<input id="cmmnty_title" name="title" type="text" data-null="false" class="inputclear" data-max-length="33" data-error-message="'제목'" placeholder="제목을 입력하세요.">
					
					<div>
					<p class="sfbLabel">등록할 위치</p>
						<div class="sfbForm sfbSchool">
							<ul>
								<li id="current-poi-button" class="on">
									<a href="#" class="">현위치</a>
								</li>
			
								<li id="direct-poi-button">
									<a href="#">위치선택</a>
								</li>
			
								<li id="popup-poi-button">
									<a href="#">주소선택</a>
								</li>
							</ul> 
						<label for="file_input_textLocation" class="Hidden">주소</label>
						<input id="file_input_textLocation" name="reg_lc" type="text" class="inputclear" placeholder="위치선택 또는 주소선택해주세요" data-null="false" data-max-length="100" data-error-message="'주소' " readonly="readonly"/> 
					</div>
					
					<label class="sfbLabel" style="top:58px;">아이콘</label>
					<ul id="symbol-list" class="List" style="margin-top:65px;">
						<c:forEach items="${customSymbolList }" var="symbol" varStatus="status">
							<li<c:if test="${status.count==1 }"> class="on"</c:if> onclick="$(this).find('input:radio').prop('checked',true).trigger('change');">
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
											<input name="symbol" class="symbol" type="radio" value="${symbol.order }" ${status.count==1?'checked':'' } data-value="${community.reg_symbol }" data-symbol-image="${ctx }/resources/images/community/iconset_${community.reg_symbol }${symbol.order }.png">
											<img style="width:25px;" src="${ctx }/resources/images/community/iconset_${community.reg_symbol }${symbol.order }.png"/>${symbol.labelNm }
										</label>
									</c:otherwise>
								</c:choose>
							</li>
						</c:forEach>
					</ul>
					
					<textarea id="cmmnty_opinion_state" name="opinion_state" type="text" class="inputclear" data-null="false" data-max-length="150" data-error-message="'의견' "  placeholder="의견을 입력하세요."></textarea>
					<label for="cmmnty_opinion_state" class="label"><span>0 </span>/150 자</label>
					
					<div id="addFileArea"> 
						<div class="Insert_Filearea">
							<div>
								<input id="filePathField" style="border-top-left-radius:7px; border-bottom-left-radius: 7px;" type="text" readonly="readonly" onclick="$('#community-file').click();" placeholder="첨부파일추가">
								<button type="button" onclick="$('#community-file input:file:eq(0)').click();"><img src="/mobile/resources/m2020/images/sub/file_add.png" style="width: 15px; height: auto;"></button>
								<div id="community-file">
									<input id="community-insert-file" name="file" type="file" class="inputclear" accept="image/*" style="display:none;">
								</div>
							</div>
						</div>
						<div id="file-list" class="file-list" style="display:none;">
							<ul></ul>
						</div>
						<ul class="txt">
							<li>100MB미만의 사진 파일을 첨부할 수 있습니다.</li>
							<li>개인정보를 포함하거나 저작권에 위배되는 사진은 등록할 수 없습니다.(관리자 임의 삭제 가능)</li>
							<li>첨부한 사진은 공익을 목적으로 사용될 수 있습니다.</li>
						</ul>
					</div>
					<div class="idPwDiv2">
						<c:if test="${heumTag:matches(community.cmmnty_partcptn_grant_yn,'M|P|A')&&community.usr_id!=loginUsername }">
							<c:set var="push_id" value="${community.cmmnty_partcptn_grant_yn=='A'?'별명':'별명' }"/>
							<label for="id" class="sfbLabel" style="margin-top: 20px;">${push_id }</label>
							<input id="id" name="id" type="text" class="inputclear" data-null="false" data-min-length="5" data-error-message="'${push_id }' " placeholder="별명을 입력하세요.">
							<label for="pw" class="sfbLabel">비밀번호</label>
							<input id="pw" name="pw" type="password" class="inputclear" data-null="false" data-error-message="'비밀번호' " placeholder="비밀번호를 설정하세요.">
						</c:if>
					</div>
					<div class="sfbFooter">
						<button id="prevBtn" class="btn_search00" type="button">이전</button>
						<button id="registBtnArea" class="btn_search modify" type="submit" style="width: 70%;">등록</button>
					</div>
				</div>
			</form>
		</div>