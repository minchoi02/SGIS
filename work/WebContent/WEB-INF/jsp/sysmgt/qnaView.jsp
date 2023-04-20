<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHead.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/sysMgt/qnaView.js"></script>
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
		<li class="is-active"><a href="qnaLst">Q&A</a></li>
		<li><a href="faqLst">FAQ</a></li>
		<li><a href="useinfoLst">이용정보</a></li>
		<!--<li><a href="popalimLst">팝업공지</a></li>-->
		<!--<!-- <li><a href="useguideLst">활용사례</a></li> -->-->
		<!--<li><a href="usecopyLst">따라하기</a></li>-->
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
							Q&A 상세보기
							<div class="tit-utils">
								<div class="btn-group line">
									<button id="btnList" onclick="location.href='${pageContext.request.contextPath}/view/sysmgt/qnaLst'" type="button">목록</button>
									<button id="btnAnswer" type="button">답변하기</button>
									<button id="btnModify" type="button">수정</button>
									<button id="btnDelete" type="button">삭제</button>
								</div>
							</div>
						</div>
						<form id="qnaView"  name="qnaView" method="post">
						<table>
							<colgroup>
								<col style="width: 10%">
								<col style="width: 40%">
								<col style="width: 10%">
								<col style="width: 40%">
							</colgroup>
							<tbody>
								<tr><th>제목</th><td colspan="3" id="title"></td></tr>
								<tr><th>작성자</th><td id="user_nm"></td><th>작성일</th><td id="reg_ts"></td></tr>
								<tr><th>조회수</th><td id="view_cnt"></td><th>답변여부</th><td><span class="label c1" id="ans_yn"></span></td></tr>
								<tr><th>내용</th><td colspan="3" class="tb-content" id="content"></td></tr>
								<tr><th>답변</th><td colspan="3" class="tb-content"><textarea id="editor"></textarea></td></tr>
								<tr><th>첨부파일</th><td colspan="3" class="tb-files" id="files"></td></tr>
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
<script>
	Simditor.locale = "en-US";
	var editor = new Simditor({
		textarea: $('#editor'),
		toolbar : ['bold', 'italic', 'underline', 'fontScale', '|','table', 'ol', 'ul','|', 'indent', 'outdent', 'alignment']
	});
</script>
			<!-- footer -->
			<jsp:include page="/view/common/includeFooterNew"></jsp:include>			
				
</body>
</html>
