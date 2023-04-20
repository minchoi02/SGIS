<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHeadNew.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script src="${pageContext.request.contextPath}/js/work/prjSet.js"></script>
	
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
<!-- @@block content -->
<div class="sub-title">
	<strong class="home">업무자동화</strong>
	<h2>프로젝트 설정</h2>
	<h3>업무 별 프로젝트 진행 순서를 확인하고 관리하실 수 있습니다.</h3>
</div>
<div class="srch-form">
	<div class="row">
		<div class="cols">
			<div class="col col-sm11">
				<div class="in-box">
					<span class="inputs"><input type="text" name="searchText" id="prjSetSearchText" placeholder="검색어를 입력해주세요"></span>
				</div>
			</div>
			<div class="col col-sm1">
				<div class="in-box">
					<button type="button" id="prjSetSearchBtn" class="btn lager line angular">검색</button>
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
							프로젝트 목록 : <em class="total"></em>
							<div class="tit-utils">
								<div class="btn-group line">
									<button type="button" onclick="location.href='prjSetNew'">+ 새 프로젝트</button>
									<button type="button" id="deleteBtn">삭제</button>
								</div>
								<span class="select"> 
								<select name="selectViewCount" id="selectViewCount">
									<option value="10">10개보기</option>
									<option value="50">50개보기</option>
									<option value="100">100개보기</option>
								</select>\
								</span>
							</div>
						</div>
						<table id="prjSetTable">
							<tbody>
							</tbody>
						</table>
					</div>
					<div class="pageArea"><span id="prjSetPage"  class="pages paging"></span></div>
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
