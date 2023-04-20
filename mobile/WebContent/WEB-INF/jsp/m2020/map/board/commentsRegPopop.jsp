<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/m2020/includes/taglib.jsp" %> 
<style>
	.Comments_Insert {
		
	}
	.datatit {
		color:white;
	}
</style>
		<div class="ContArea Comments_Insert" id="comments-form" style="display:none;">
			<div class="datatit">
        		<h2 style="color:#fff">의견등록</h2>
      		</div>
			<form id="insert-form" enctype="multipart/form-data" method="post" target="param" style="margin-bottom: 50px; padding: 16px !important;">
			<input type="hidden" id="board_cd" name="board_cd" />
				<input type="hidden" id="post_depth" name="post_depth" />
				<input type="hidden" id="post_order" name="post_order"  />
				<input type="hidden" id="file_yn" name="file_yn"  />
				<input type="hidden" id="priority_disp_yn" name="priority_disp_yn"  />
				<div class="InsertForm" style="padding-top: 0;">
					<label for="cmmnt_title" class="sfbLabel_cmm">제목</label>
					<input id="cmmnt_title" name="post_title" type="text" data-null="false" data-max-length="33" data-error-message="'제목'" placeholder="제목을 입력하세요." maxlength="33"><!-- 20200904 박은식 maxlength 수정 -->

					<label for="cmmnt_title" class="sfbLabel_cmm" style="margin-top:20px;">내용</label>
					<textarea id="cmmnt_opinion_state" name="post_content" type="text" data-null="false" data-max-length="150" data-error-message="'의견' " onkeyup=""  placeholder="의견을 입력하세요." maxlength="150"></textarea><!-- 20200904 박은식 maxlength 수정 -->
										
					<label for="cmmnt_title" class="sfbLabel_cmm">연락처</label>
					<input id="cmmnt_title" name="post_title_en" type="text" data-null="false" data-max-length="33" data-error-message="'연락처'" placeholder="연락처 입력하세요." maxlength="50"><!-- 20200904 박은식 maxlength 수정 -->
					
					<div id="addFileArea"> 
						<div class="Insert_Filearea">
							<div>
								<input id="filePathField" style="border-top-left-radius:7px; border-bottom-left-radius: 7px;" type="text" readonly="readonly" placeholder="첨부파일추가">
								<button type="button" onclick="$('#community-file input:file:eq(0)').click();"><img src="/mobile/resources/m2020/images/sub/file_add.png" style="width: 15px; height: auto;"></button>
								<div id="community-file">
									<input id="cmmnt-insert-file" name="file" type="file" accept="image/*" style="display:none;">
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
					<div class="sfbFooter">
						<button id="registBtnArea" class="btn_search00" type="button">이전</button>
						<button id="registBtnArea" class="btn_search" type="submit" style="width: 70%;">등록</button>
					</div>
				</div>
			</form>
			<iframe id="if" name="param" style="display:none;"></iframe>
		</div>