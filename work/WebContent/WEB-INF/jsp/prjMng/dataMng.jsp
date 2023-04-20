<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHead.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script src="${pageContext.request.contextPath}/js/work/dataMng.js"></script>
	
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
	<h2>통계청 데이터관리</h2>
	<h3>통계청 보유 데이터를 관리하실 수 있습니다.</h3>
</div>
<div class="srch-form">
	<div class="row">
		<div class="cols">
			<div class="col col-sm11">
				<div class="in-box">
					<span class="inputs"><input type="text" name="searchText" id="searchText" placeholder="검색어를 입력해주세요"></span>
				</div>
			</div>
			<div class="col col-sm1">
				<div class="in-box">
					<button type="button" id="btnSearch" class="btn lager line angular">검색</button>
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
							테이블 목록 : <em class="total"></em>
							<div class="tit-utils">
								<div class="btn-group line">
									<button type="button" onclick="location.href='workSetNew'">+ 신규 테이블</button>
									<button type="button" id="deleteBtn">삭제</button>
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
						<table id="workSetTable">
							<tbody>
							</tbody>
						</table>
					</div>
					<div class="pageArea"><span id="workSetPage"  class="pages paging"></span></div>
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
