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

<div class="sub-title">
	<strong class="home">시스템 운영</strong>
	<h2>보유 데이터 현황</h2>
	<h3>SGISwork시스템에 저장된 모든 데이터 목록을
		확인하고 데이터 공유 등을 관리 할 수 있습니다.</h3>
</div>
<div class="tabs">
	<ul>
		<li><a href="">전체 데이터 현황</a></li>
		<li><a href="">편집 지적도</a></li>
		<li class="is-active"><a href="">수집 현황</a></li>
	</ul>
</div>
<div class="status-lists">
	<ul>
		<li>
			<dl>
				<dt>도로명 데이터 업로드 작업 상태</dt>
				<dd>2019-01-11 14:24:25</dd>
				<dd>
					<span class="label c3">실패</span>
				</dd>
			</dl>
		</li>
		<li>
			<dl>
				<dt>지적도 데이터 업로드 작업 상태</dt>
				<dd>2019-01-16 20:00:31</dd>
				<dd>
					<span class="label c3">실패</span>
				</dd>
			</dl>
		</li>
		<li>
			<dl>
				<dt>국토부 데이터 업로드 작업 상태</dt>
				<dd>2016-09-11 17:45:12</dd>
				<dd>
					<span class="label c1">완료</span>
				</dd>
			</dl>
		</li>
	</ul>
</div>
<div class="view-container">
	<div class="row">
		<div class="cols">
			<div class="col col-1">
				<div class="in-box">
					<div class="tbs1">
						<div class="tb-tit">
							보유데이터 목록 : <em class="total">1 / 221 페이지
								총 2210건</em>
							<div class="tit-utils">
								<span class="select"> <select name="" id="">
										<option value="">10개보기</option>
										<option value="">50개보기</option>
										<option value="">100개보기</option>
								</select>
								</span>
							</div>
						</div>
						<table>
							<colgroup>
								<col style="width: 45px;">
								<col style="width: 60px;">
								<col>
								<col style="width: 150px;">
								<col style="width: 90px;">
								<col style="width: 120px;">
								<col style="width: 100px;">
							</colgroup>
							<thead>
								<tr>
									<th><span class="checkbox solo"><input
											type="checkbox" id="all"><label for="all">&nbsp;</label></span>
									</th>
									<th>번호</th>
									<th>데이터명</th>
									<th>설명</th>
									<th>종류</th>
									<th>건수</th>
									<th>최종 수정일</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td>ti_sprd_manage_1711</td>
									<td>지적도 수집</td>
									<td>도로명</td>
									<td>21493964</td>
									<td>2017-11-21</td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td>ti_sprd_manage_1711</td>
									<td>지적도 수집</td>
									<td>도로명</td>
									<td>21493964</td>
									<td>2017-11-21</td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td>ti_sprd_manage_1711</td>
									<td>지적도 수집</td>
									<td>도로명</td>
									<td>21493964</td>
									<td>2017-11-21</td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td>ti_sprd_manage_1711</td>
									<td>지적도 수집</td>
									<td>도로명</td>
									<td>21493964</td>
									<td>2017-11-21</td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td>ti_sprd_manage_1711</td>
									<td>지적도 수집</td>
									<td>도로명</td>
									<td>21493964</td>
									<td>2017-11-21</td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td>ti_sprd_manage_1711</td>
									<td>지적도 수집</td>
									<td>도로명</td>
									<td>21493964</td>
									<td>2017-11-21</td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td>ti_sprd_manage_1711</td>
									<td>지적도 수집</td>
									<td>도로명</td>
									<td>21493964</td>
									<td>2017-11-21</td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td>ti_sprd_manage_1711</td>
									<td>지적도 수집</td>
									<td>도로명</td>
									<td>21493964</td>
									<td>2017-11-21</td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td>ti_sprd_manage_1711</td>
									<td>지적도 수집</td>
									<td>도로명</td>
									<td>21493964</td>
									<td>2017-11-21</td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td>ti_sprd_manage_1711</td>
									<td>지적도 수집</td>
									<td>도로명</td>
									<td>21493964</td>
									<td>2017-11-21</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="paging">
						<span class="first"><a href=""><<</a></span> <span class="prev"><a
							href=""><</a></span>
						<ul>
							<li class="is-active"><a href="">1</a></li>
							<li><a href="">2</a></li>
							<li><a href="">3</a></li>
							<li><a href="">4</a></li>
							<li><a href="">5</a></li>
							<li><a href="">6</a></li>
							<li><a href="">7</a></li>
							<li><a href="">8</a></li>
							<li><a href="">9</a></li>
							<li><a href="">10</a></li>
						</ul>
						<span class="end"><a href="">></a></span> <span class="next"><a
							href="">>></a></span>
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
