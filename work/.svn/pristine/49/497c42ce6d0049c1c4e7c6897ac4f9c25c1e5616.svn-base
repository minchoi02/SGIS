<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SGISwork</title>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/mypage/mypage.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/urban/urban.css?ver=1.0" />
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHead.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/urban/urbar.js"></script>

<script>
	$(document).ready(function(){
		let api_url = "/api/urban/getBndList.do"
		$urbar.request.doReqPrjSetNewList(0,api_url,1);
	})
</script>
</head>
<body>
	<jsp:include page="/view/common/includeHeader"></jsp:include>
	<form action="" id="testForm">
		<input type="hidden" name="startPage" value="0"/>
		<input type="hidden" name="lastPage" value="5" />
	</form>
	<div class="wrap">
		<div class="subConentWrap">
			<!-- contents start  -->
			<div class="container">
				<div class="content_new">
					<div class="sub-title">
						<!-- 						<strong class="home">경계획정</strong> -->
						<h2>경계획정</h2>

						<!-- 						<h3>경계획정 설명.</h3> -->
					</div>
					<div class="srch-form">
						<div class="row">
							<div class="cols">
								<div class="col col-sm12">
									<table cellpadding="0" cellspacing="0" border="0" width="100%" class="searchTable">
										<tr>
											<th>작업명</th>
											<td>
												<span class=""><input type="text" name="searchText" id="searchText" placeholder="검색어를 입력해주세요"></span>
											</td>
											<th>기준일자</th>
											<td>
												<span class=""><input type="date" name="startDay" id="startDay"></span> ~ <span class=""><input type="date" name="endDay" id="endDay"></span>

											</td>
											<td>
												<button type="button" id="btnReset" class="btn lager line cGray" style="width: 100px">초기화</button>
												<button type="button" id="btnSearch" class="btn lager line cBlue" style="width: 100px">검색</button>
											</td>
										</tr>
									</table>
								</div>

								<!-- <div class="col col-sm5">
								<div class="in-box">
									<span class="inputs"><input type="text" name="searchText" id="searchText" placeholder="검색어를 입력해주세요"></span>
								</div>
							</div>

							<div class="col col-sm2">
								<div class="in-box">

								</div>
							</div> -->
							</div>
						</div>
					</div>
					<div class="view-container">
						<div class="row">
							<div class="cols">
								<div class="col col-1">
									<div class="in-box">
										<div class="tbs3 blue">
										<form action="" method="post" id="formData" name="formData">
										<input type="hidden" name="selectedId" />
										</form>
											<table id="workSetTable" style="width: 100%" cellspacing="0" cellpadding="0">
												<colgroup>
													<col width="150px" />
													<col width="100px" />
													<col width="100px" />
													<col width="500px" />
													<col width="400px" />
													<col width="" />
												</colgroup>
												<thead>
													<tr>
														<th>작업명</th>
														<th>구분</th>
														<th>집계일자</th>
														<th>생성년도</th>
														<th>비고</th>
													</tr>
												</thead>
												<tbody>
													<tr id="sIdx_0">
														<td>아이티밴드작업분</td>
														<td>도시</td>
														<td>2022-02-20</td>
														<td>2022,2022,2022,2022,2022,2022,2022,2022</td>
														<td>
															<button class="bgGray">세부작업</button>
															<button class="bgGray">결과보기</button>
															<button class="bgGray">내보내기</button>
															<button class="bgCrimson">삭제</button>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="tfBtnBox">
											<button class="btnStyle cBlue" id="newCreateBtn">신규작업확정</button>
										</div>
										<div class="pageArea">
											<span id="prjSetPage" class="pages paging">
											<a class="number current" href="#1">1</a>
											<a class="number" href="#2">2</a></span>
											</span>
										</div>
									</div>
								</div>
								<div class="cols">
									<div class="col col-sm12 newCreate" style="display: none">
										<div class="tb-tit">신규획정작업</div>
											<table cellpadding="0" cellspacing="0" border="0" width="100%" class="searchTable">
												<colgroup>
													<col width="15%" />
													<col width="35%" />
													<col width="15%" />
													<col width="35%" />
												</colgroup>
												<tr>
													<th>작업명</th>
													<td class="left">
														<input type="text" name="projectNm" id="projectNm" placeholder="검색어를 입력해주세요">
														*7~20자 임의의 작업명 입력
													</td>
													<th>구분</th>
													<td class="left">
														<span class="radios"> <input type="radio" name="urbarType" id="radio_div_nm1" value="01" checked="checked"> <label for="radio_div_nm1">도시</label>
														</span> <span class="radios"> <input type="radio" name="urbarType" id="radio_div_nm2" value="02"> <label for="radio_div_nm2">준도시</label>
														</span>
													</td>
												</tr>
												<tr>
													<th>집계일자</th>
													<td class="left">
														<input type="date" name="createDt" id="addDt" value="" placeholder="검색어를 입력해주세요">
													</td>
													<th>기준년도</th>
													<td class="left">
														<input type="text" name="createYear" id="addYear" style="width: 100%">
													</td>
												</tr>
											</table>
											<input type="hidden" name="useYn" value="Y" />
										<div class="btnWrap">
											<button class="btn lager line addBtn">추가</button>
											<button class="btn lager line cancelBtn" onclick=newCancel() >취소</button>
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