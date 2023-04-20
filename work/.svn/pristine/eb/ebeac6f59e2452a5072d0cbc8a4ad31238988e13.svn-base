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
<script type="text/javascript" src="${pageContext.request.contextPath}/js/urban/urbar.js?ver=0.2"></script>
<script>

	$(document).ready(function(){
		let prKey = '${selectedId}';
		console.log(prKey)
		let apiUrl = "/api/urban/getDnmtDetail.do";
		$urbar.request.doReqPrjSetDetailInfo(prKey,apiUrl,2);
	})
</script>
</head>
<body>
	<jsp:include page="/view/common/includeHeader"></jsp:include>
	<div class="wrap">
		<div class="subConentWrap">
			<!-- contents start  -->

    <div class="content_new">
		<!-- @@block content -->
		<div class="sub-title">
<!-- 			<strong class="home">상세내역</strong> -->
			<h2>도시/준도시 세부작업</h2>
<!-- 			<h3>상세내역 설명.</h3> -->
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
										<col width="150px" />
										<col width="420px" />
										<col width="250px" />
										<col width="" />
									</colgroup>
									<thead>
										<tr>
											<th>기준년도</th>
											<th>도시/준도시 개수</th>
											<th>작업일시</th>
											<th>비고</th>
										</tr>
									</thead>
									<tbody>
										<tr id="sIdx_0">
											<td>2020</td>
											<td>66개 도시/ 128개 준도시</td>
											<td>2022-02-20 00:00:00</td>
											<td>
												<button class="bgGray">실행</button>
												<button class="cBlue" onclick=details() >상세내역</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="tfBtnBox">
								<button class="btnStyle bgGray" id="dnmtListBtn">목록</button>
							</div>

							</div>
						</div>
					</div>
				</div>
				<div class="cols">
					<div class="col col-1 details" style="display: none">
						<div class="in-box">
							<div class="tbs3 blue">
								<div class="tb-tit">
									2020년도 도시명 상세내역
								</div>
								<div class="scrollTbox">
									<table id="workDetailTable" style="width:100%" cellspacing="0" cellpadding="0">
										<colgroup>
											<col width="120px" />
											<col width="" />
											<col width="120px" />
										</colgroup>
										<thead>
											<tr>
												<th>코드</th>
												<th>결과명</th>
												<th>비고</th>
											</tr>
										</thead>
										<tbody>
											<tr id="sIdx_0">
												<td>CENTER01</td>
												<td><input type="text" style="width:100%" /></td>
												<td>
													<button class="bgGray">수정</button>

												</td>
											</tr>
											<tr id="sIdx_0">
												<td>CENTER01</td>
												<td><input type="text" style="width:100%" /></td>
												<td>
													<button class="bgGray">수정</button>

												</td>
											</tr>
											<tr id="sIdx_0">
												<td>CENTER01</td>
												<td><input type="text" style="width:100%" /></td>
												<td>
													<button class="bgGray">수정</button>

												</td>
											</tr>
											<tr id="sIdx_0">
												<td>CENTER01</td>
												<td><input type="text" style="width:100%" /></td>
												<td>
													<button class="bgGray">수정</button>

												</td>
											</tr>
											<tr id="sIdx_0">
												<td>CENTER01</td>
												<td><input type="text" style="width:100%" /></td>
												<td>
													<button class="bgGray">수정</button>

												</td>
											</tr>
											<tr id="sIdx_0">
												<td>CENTER01</td>
												<td><input type="text" style="width:100%" /></td>
												<td>
													<button class="bgGray">수정</button>

												</td>
											</tr>
											<tr id="sIdx_0">
												<td>CENTER01</td>
												<td><input type="text" style="width:100%" /></td>
												<td>
													<button class="bgGray">수정</button>

												</td>
											</tr>
											<tr id="sIdx_0">
												<td>CENTER01</td>
												<td><input type="text" style="width:100%" /></td>
												<td>
													<button class="bgGray">수정</button>

												</td>
											</tr>
											<tr id="sIdx_0">
												<td>CENTER01</td>
												<td><input type="text" style="width:100%" /></td>
												<td>
													<button class="bgGray">수정</button>

												</td>
											</tr>
											<tr id="sIdx_0">
												<td>CENTER01</td>
												<td><input type="text" style="width:100%" /></td>
												<td>
													<button class="bgGray">수정</button>

												</td>
											</tr>
											<tr id="sIdx_0">
												<td>CENTER01</td>
												<td><input type="text" style="width:100%" /></td>
												<td>
													<button class="bgGray">수정</button>

												</td>
											</tr>
											<tr id="sIdx_0">
												<td>CENTER01</td>
												<td><input type="text" style="width:100%" /></td>
												<td>
													<button class="bgGray">수정</button>

												</td>
											</tr>
											<tr id="sIdx_0">
												<td>CENTER01</td>
												<td><input type="text" style="width:100%" /></td>
												<td>
													<button class="bgGray">수정</button>

												</td>
											</tr>
											<tr id="sIdx_0">
												<td>CENTER01</td>
												<td><input type="text" style="width:100%" /></td>
												<td>
													<button class="bgGray">수정</button>

												</td>
											</tr>
											<tr id="sIdx_0">
												<td>CENTER01</td>
												<td><input type="text" style="width:100%" /></td>
												<td>
													<button class="bgGray">수정</button>

												</td>
											</tr>
											<tr id="sIdx_0">
												<td>CENTER01</td>
												<td><input type="text" style="width:100%" /></td>
												<td>
													<button class="bgGray">수정</button>

												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
<!-- 							<div class="tfBtnBox"> -->
<!-- 								<button class="btnStyle bgGray">목록</button> -->
<!-- 							</div> -->

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