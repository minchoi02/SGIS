<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHead.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/sysMgt/popalimForm.js"></script>
	
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
		<li class="is-active"><a href="popalimLst">팝업공지</a></li>
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
							팝업공지 작성
							<div class="tit-utils">
								<div class="btn-group line">
									<button id="btnSave" type="button">저장</button>
									<button id="btnCancel" type="button">취소</button>
								</div>
							</div>
						</div>
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
									<th>기간</th>
									<td>
										<div class="picker-group">
											<div class="picker-item">
												<span class="inputs datepicker"><input id="start-date" type="text"></span>
											</div>
											<div class="picker-item">
												<span class="inputs datepicker"><input id="end-date" type="text"></span>
											</div>
										</div>
									</td>
									<th>&nbsp;</th>
									<td>&nbsp;</td>
								</tr>
								<tr>
									<th>공지여부</th>
									<td colspan="3"><span class="radios"><input
											type="radio" id="on" name="view-check" checked><label
											for="on">ON</label></span> <span class="radios"><input
											type="radio" id="off" name="view-check"><label
											for="off">OFF</label></span></td>
								</tr>

								<tr>
									<th>높이</th>
									<td><span class="inputs"><input id="height" type="text"></span></td>
									<th>너비</th>
									<td><span class="inputs"><input id="width" type="text"></span></td>
								</tr>
								<tr>
									<th>가로 위치</th>
									<td><span class="inputs"><input id="x-pos" type="text"></span></td>
									<th>세로 위치</th>
									<td><span class="inputs"><input id="y-pos" type="text"></span></td>
								</tr>
								<tr>
									<th>미리보기</th>
									<td colspan="3" class="tb-preview"><input type="text"
										id="preview" placeholder="미리보기" disabled="disabled">
									</td>
								</tr>
							</tbody>
						</table>
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
</html>
