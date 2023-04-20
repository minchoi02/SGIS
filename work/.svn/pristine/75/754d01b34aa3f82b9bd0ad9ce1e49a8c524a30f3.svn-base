<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHeadNew.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/work/stdWordLst.js"></script>
	
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
	<h2>데이터 표준화 관리</h2>
	<h3>테이블, 필드명 표준화 적용을 위한 표준 단어를 관리합니다.</h3>
</div>

<div class="srch-form">
	<div class="row">
		<div class="cols">
			<div class="col col-sm12">
				<div class="in-box">
					<div class="srch-group">
						<span class="inputs"><input type="text" id="searchText" placeholder="검색어를 입력해주세요"></span>
						<button type="button" id="btnSearch" class="btn lager line angular">검색</button>
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
							표준단어 목록 : <em class="total"></em>
							<div class="tit-utils">
								<div class="btn-group line">
									<button type="button" id="btnAdd">추가</button>
								</div>
							</div>
						</div>
						<table id="dataTbl">
							<colgroup>
								<col style="width: 60px;">
								<col>
								<col>
								<col>
								<col>
								<col>
								<col>
							</colgroup>
							<thead>
								<tr>
									<th>번호</th>
									<th>한글명</th>
									<th>영문약어명</th>
									<th>영문명</th>
									<th>단어 정의</th>
									<th>단어 유형</th>
									<th>비고</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
					<div class="pageArea">
						<span class="pages"></span>
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
