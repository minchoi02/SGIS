<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHeadNew.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/simditor-2.3.27/simditor-2.3.27/styles/simditor.css"/>
	<script type="text/javascript" src="${pageContext.request.contextPath}/css/simditor-2.3.27/simditor-2.3.27/site/assets/scripts/module.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/css/simditor-2.3.27/simditor-2.3.27/site/assets/scripts/hotkeys.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/css/simditor-2.3.27/simditor-2.3.27/site/assets/scripts/uploader.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/css/simditor-2.3.27/simditor-2.3.27/lib/simditor.js"></script>
	
	
	<!-- mng_s 2019. 06. 04 j.h.Seok -->
	<script>
		$(document).ready(
			function() {
				//$log.srvLogWrite("Z0", "05", "01", "00", "", "");
		});
	</script>
	<!-- mng_e 2019. 06. 04 j.h.Seok -->
</head>
<body>
	<jsp:include page="/view/common/includeHeader"></jsp:include>
	
  <div class="container">
    <div class="content_new">

<div class="sub-title">
	<strong class="home">시스템 운영</strong>
	<h2>이용안내</h2>
	<h3>SGISwork시스템 이용에 관련한 사항에 대하여
		확인하실 수 있습니다.</h3>
</div>
<div class="tabs">
	<ul>
		<li><a href="noticeLst">공지사항</a></li>
		<li><a href="qnaLst">Q&A</a></li>
		<li><a href="faqLst">FAQ</a></li>
		<li><a href="useinfoLst">이용정보</a></li>
		<!--<li><a href="popalimLst">팝업공지</a></li>-->
		<!--<!-- <li><a href="useguideLst">활용사례</a></li> -->-->
		<li class="is-active"><a href="usecopyLst">따라하기</a></li>
		<!--<li><a href="sampleLst">샘플데이터</a></li>-->
		<!-- <li><a href="shareLst">공유게시판</a></li> -->
	</ul>
</div>
<div class="view-container">
	<div class="row">
		<div class="cols">
			<div class="col col-1">
				<div class="in-box">
					<div class="tbs2">
						<div class="tb-tit">
							따라하기 작성
							<div class="tit-utils">
								<div class="btn-group line">
									<button id="btnSave" type="button">저장</button>
									<button id="btnCancel" type="button">취소</button>
								</div>
							</div>
						</div>
						<form id="boardForm"  name="boardForm" method="post" enctype="multipart/form-data">
						<table>
							<colgroup>
								<col style="width: 10%">
								<col style="width: 40%">
								<col style="width: 10%">
								<col style="width: 40%">
							</colgroup>
							<tbody>
								<tr>
									<th class="require">제목</th>
									<td colspan="3"><span class="inputs"><input
											id="title-input" type="text" value=""
											placeholder="게시글의 제목을 입력합니다."></span>
									</td>
								</tr>
								<tr>
									<th>내용</th>
									<td colspan="3" class="tb-content">
										<textarea id="editor"></textarea>
									</td>
								</tr>
								<tr id="file-attach">
									<th>첨부파일</th>
									<td colspan="3">
										<div class="file-field">
											<span class="inputs">
											<input id="searchFileTxt" readonly="readonly" name="searchFileTxt" type="text" disabled>
											<input id="searchFile" type="file" name="searchFile" style="width:0px;height:0px;position:absolute;left:-9999999px;" />
											</span>
											<div class="bt">
												<button type="button" id="searchFileBtn" class="btn lager line angular">파일찾기</button>
												<button type="button" id="deletFileBtn" class="btn lager line angular">삭제</button>
											</div>
										</div>
										<p class="file-tips">
											* 첨부파일은 최대 5개, 파일당 최대 1024MB까지
											등록 가능합니다.<br> 첨부가능 파일유형
											[png, jpg, jpeg, gif, tif, tiff, zip, alz, 7z, hwp, hwt, doc,
											docx, ppt, pptx, pdf, xls, xlsx]
										</p>
									</td>
								</tr>
							</tbody>
						</table>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</div></div><!-- subConentWrap end-->				

<!-- footer -->
<jsp:include page="/view/common/includeFooterNew"></jsp:include>			
</body>
<script>
	Simditor.locale = "en-US";
	var editor = new Simditor({
		textarea: $('#editor'),
		toolbar : ['bold', 'italic', 'underline', 'fontScale', '|','table', 'ol', 'ul','|', 'indent', 'outdent', 'alignment']
	});
</script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/sysMgt/usecopyForm.js"></script>
</html>
