<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SGISwork</title>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/mypage/mypage.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/urban/urban.css" />
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHead.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/urban/urbar.js"></script>
<script>
	$(document).ready(function(){
		let prKey = '${selectedId}';
		let apiUrl = "/api/urban/demarcation/demarcationDetail.do";
		$urbar.request.doReqPrjSetDetailInfo(prKey,apiUrl,1);
	})

</script>
</head>
<body>
	<jsp:include page="/view/common/includeHeader"></jsp:include>
	<div class="wrap">
		<div class="subConentWrap">
			<!-- contents start  -->
<div class="container">
    <div class="content_new">
		<!-- @@block content -->
		<div class="sub-title">
			<strong class="home">획정세부작업</strong>
			<h2>획정세부작업</h2>
			<h3>획정세부작업 설명.</h3>
		</div>
		<div class="srch-form">
			<div class="row">
				<div class="cols">
					<div class="col col-sm12">
						<table cellpadding="0" cellspacing="0" border="0" width="100%" class="searchTable">
							<tr>
								<th>작업명</th>
								<td>아이티밴드 이준혁 테스트작업</td>
								<th>구분</th>
								<td>도시</td>
								<th>집계일자</th>
								<td class="left">2020.20.20</td>
							</tr>
						</table>
					</div>

				</div>
			</div>
		</div>
		<div class="view-container">
			<div class="row">
				<div class="cols">
					<div class="col col-1">
						<div class="in-box">
							<div class="tbs3 blue">
								<div class="tb-tit">
									세부작업 목록
								</div>
								<table id="workSetTable" style="width:100%" cellspacing="0" cellpadding="0">
									<colgroup>
										<col width="120px" />
										<col width="320px" />
										<col width="200px" />
										<col width="300px" />
										<col width="" />
									</colgroup>
									<thead>
										<tr>
											<th>기준년도</th>
											<th>격자자료</th>
											<th>작업일시</th>
											<th>작업결과</th>
											<th>비고</th>
										</tr>
									</thead>
									<tbody>
										<tr id="sIdx_0">
											<td>2020</td>
											<td><input type="file" name="" /></td>
											<td>2022-02-20 00:00:00</td>
											<td>87개도시생성</td>
											<td>
												<button class="bgGray">실행</button>
												<button class="cBlue">결과보기</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="tfBtnBox">
								<button class="btnStyle bgGray" id="bndListBtn">목록</button>
							</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>










		</div>
	</div>
	<!-- footer -->
	<jsp:include page="/view/common/includeFooter"></jsp:include>


</body>
</html>