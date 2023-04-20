<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHead.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	
	
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
	<h2>데이터업무 프로젝트 실행 이력</h2>
	<h3>프로젝트 실행 이력 설정정보를 확인하고 관리(복사,삭제,수정) 합니다</h3>
</div>
<div class="srch-form">
	<div class="row">
		<div class="cols">
			<div class="col col-sm2">
				<div class="in-box">
					<span class="select"> <select name="" id="">
							<option value="">프로젝트명</option>
					</select>
					</span>
				</div>
			</div>
			<div class="col col-sm3">
				<div class="in-box">
					<span class="inputs"><input type="text"
						placeholder="검색어를 입력해주세요"></span>
				</div>
			</div>
			<div class="col col-sm6">
				<div class="in-box">
					<div class="picker-group">
						<div class="picker-item">
							<span class="inputs datepicker"><input type="text"></span>
						</div>
						<div class="picker-item">
							<span class="inputs datepicker"><input type="text"></span>
						</div>
					</div>
				</div>
			</div>
			<div class="col col-sm1">
				<div class="in-box">
					<button type="button" class="btn lager line angular">검색</button>
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
							데이터업무 프로젝트 실행 이력 : <em class="total">1 / 221 페이지 총 2210건</em>
							<div class="tit-utils">
								<div class="btn-group color">
									<button type="button" class="c1">전체</button>
									<button type="button" class="c10">대기</button>
									<button type="button" class="c7">실행중</button>
									<button type="button" class="c9">중지</button>
									<button type="button" class="c8">실패</button>
									<button type="button" class="c6">완료</button>
								</div>
								<div class="btn-group line">
									<button type="button">삭제</button>
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
								<col>
								<col>
								<col>
								<col style="width: 80px;">
							</colgroup>
							<thead>
								<tr>
									<th><span class="checkbox solo"><input
											type="checkbox" id="all"><label for="all">&nbsp;</label></span>
									</th>
									<th>번호</th>
									<th>업무 이름</th>
									<th>프로젝트 타입</th>
									<th>생성 날짜</th>
									<th>사용자</th>
									<th>상태</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title"><a href="">국토부수집</a></td>
									<td>단일실행</td>
									<td>2019-07-08 04:11:26</td>
									<td>kostat</td>
									<td><span class="label c6">대기</span></td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title"><a href="">국토부수집</a></td>
									<td>단일실행</td>
									<td>2019-07-08 04:11:26</td>
									<td>kostat</td>
									<td><span class="label c2">실행중</span></td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title"><a href="">국토부수집</a></td>
									<td>단일실행</td>
									<td>2019-07-08 04:11:26</td>
									<td>kostat</td>
									<td><span class="label c7">중지</span></td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title"><a href="">국토부수집</a></td>
									<td>단일실행</td>
									<td>2019-07-08 04:11:26</td>
									<td>kostat</td>
									<td><span class="label c3">실패</span></td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title"><a href="">국토부수집</a></td>
									<td>단일실행</td>
									<td>2019-07-08 04:11:26</td>
									<td>kostat</td>
									<td><span class="label c1">완료</span></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="pageArea"><span id="searchPage"  class="pages paging"></span></div>
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
