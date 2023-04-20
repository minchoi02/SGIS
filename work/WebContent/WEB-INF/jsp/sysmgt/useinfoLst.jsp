<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHead.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/sysMgt/useinfoLst.js"></script>
	
	
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
		<li class="is-active"><a href="useinfoLst">이용정보</a></li>
		<!--<li><a href="popalimLst">팝업공지</a></li>-->
		<!--<!-- <li><a href="useguideLst">활용사례</a></li> -->-->
		<!--<li><a href="usecopyLst">따라하기</a></li>-->
		<!--<li><a href="sampleLst">샘플데이터</a></li>-->
		<!-- <li><a href="shareLst">공유게시판</a></li> -->
	</ul>
</div>
<div class="srch-form">
	<div class="row">
		<div class="cols">
			<div class="col col-sm2">
				<div class="in-box">
					<span class="select"> <select name="searchType" id="searchType">
							<option value="title">제목</option>
							<option value="content">내용</option>
							<option value="all">제목+내용</option>
					</select>
					</span>
				</div>
			</div>
			<div class="col col-sm10">
				<div class="in-box">
					<div class="srch-group">
						<span class="inputs"><input id="searchText" type="text"
							placeholder="검색어를 입력해주세요"></span>
						<button id="btnSearch" type="button" class="btn lager line angular">검색</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="view-container">
	<div class="row">
		<div class="cols">
			<div class="col col-1">
				<div class="in-box">
					<div class="tbs1">
						<div class="tb-tit">
							이용정보 목록 : <em id="cnt-page" class="total"></em>
							<div class="tit-utils">
								<div class="btn-group line">
									<!-- <button id="btnDownload" type="button">다운로드</button> -->
									<button id="btnDelete" type="button">삭제</button>
									<button id="btnWrite" onclick="location.href='${pageContext.request.contextPath}/view/sysmgt/useinfoForm'" type="button">글쓰기</button>
								</div>
								<span class="select"> 
								<select name="selectViewCount" id="selectViewCount">
				                    <option value="10">10개보기</option>
				                    <option value="50">50개보기</option>
				                    <option value="100">100개보기</option>
				                 </select>
								</span>
							</div>
						</div>
						<table>
							<colgroup>
								<col style="width: 45px;">
								<col style="width: 60px;">
								<col>
								<col style="width: 120px;">
								<col style="width: 100px;">
							</colgroup>
							<thead>
								<tr>
									<th><span class="checkbox solo"><input
											type="checkbox" id="all"><label for="all">&nbsp;</label></span>
									</th>
									<th>번호</th>
									<th>제목</th>
									<th>작성일</th>
									<th>조회수</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									
								</tr>
							</tbody>
						</table>
					</div>
					<div class="paging">
						<span class="first"><a style="cursor:pointer" href="javascript:void(0)"><<</a></span> <span class="prev"><a
							href="javascript:void(0)"><</a></span>
						<ul>
						</ul>
						<span class="next"><a href="javascript:void(0)">></a></span><span class="end"><a
							href="javascript:void(0)">>></a></span>
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
