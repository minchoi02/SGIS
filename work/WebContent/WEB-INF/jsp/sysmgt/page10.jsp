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
	<h3>SGISwork시스템에 저장된 모든 데이터 목록을 확인하고 데이터 공유 등을 관리 할 수 있습니다.</h3>
</div>
<div class="tabs">
	<ul>
		<li class="is-active"><a href="">전체 데이터 현황</a></li>
		<li><a href="">편집 지적도</a></li>
		<li><a href="">수집 현황</a></li>
	</ul>
</div>
<div class="srch-form">
	<div class="row">
		<div class="cols">
			<div class="col col-sm1 col-txt">
				<div class="in-box">저장소</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="select"> <select name="" id="">
							<option value="">전체</option>
					</select>
					</span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">저장폴더</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="select"> <select name="" id="">
							<option value="">전체</option>
					</select>
					</span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">출처</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="select"> <select name="" id="">
							<option value="">전체</option>
					</select>
					</span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">분류</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="select"> <select name="" id="">
							<option value="">전체</option>
					</select>
					</span>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="cols">
			<div class="col col-sm1 col-txt">
				<div class="in-box">기간</div>
			</div>
			<div class="col col-sm5">
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
					<span class="select"> <select name="" id="">
							<option value="">업무이름</option>
							<option value="">설명</option>
					</select>
					</span>
				</div>
			</div>
			<div class="col col-sm5">
				<div class="in-box">
					<div class="srch-group">
						<span class="inputs"><input type="text"
							placeholder="검색어를 입력해주세요"></span>
						<button type="button" class="btn lager line angular">검색</button>
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
							전체데이터 목록 : <em class="total">1 / 221 페이지 총 2210건</em>
							<div class="tit-utils">
								<div class="btn-group color">
									<button type="button" class="c1">전체목록</button>
									<button type="button" class="c2">수집</button>
									<button type="button" class="c3">가공</button>
									<button type="button" class="c4">분석</button>
									<button type="button" class="c5">저장</button>
								</div>
								<div class="btn-group line">
									<button type="button">다운로드</button>
									<button type="button">공유하기</button>
									<button type="button">복사</button>
									<button type="button">삭제</button>
								</div>
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
								<col>
								<col style="width: 90px;">
								<col style="width: 90px;">
								<col style="width: 90px;">
								<col style="width: 110px;">
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
									<th>저장소</th>
									<th>저장폴더</th>
									<th>크기</th>
									<th>사용자</th>
									<th>최종 수정일</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title left"><a href="">sti_comp_info_2012</a></td>
									<td>내부분석_사업체정보_2012내부분석_사업체정보_2012내부분석_사업체정보_2012</td>
									<td>DB</td>
									<td>분석</td>
									<td>4.8 GB</td>
									<td>kostat</td>
									<td>2018-12-13</td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title left"><a href="">sti_comp_info_2012</a></td>
									<td>내부분석_사업체정보_2012</td>
									<td>DB</td>
									<td>분석</td>
									<td>4.8 GB</td>
									<td>kostat</td>
									<td>2018-12-13</td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title left"><a href="">sti_comp_info_2012</a></td>
									<td>내부분석_사업체정보_2012</td>
									<td>DB</td>
									<td>분석</td>
									<td>4.8 GB</td>
									<td>kostat</td>
									<td>2018-12-13</td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title left"><a href="">sti_comp_info_2012</a></td>
									<td>내부분석_사업체정보_2012</td>
									<td>DB</td>
									<td>분석</td>
									<td>4.8 GB</td>
									<td>kostat</td>
									<td>2018-12-13</td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title left"><a href="">sti_comp_info_2012</a></td>
									<td>내부분석_사업체정보_2012</td>
									<td>DB</td>
									<td>분석</td>
									<td>4.8 GB</td>
									<td>kostat</td>
									<td>2018-12-13</td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title left"><a href="">sti_comp_info_2012</a></td>
									<td>내부분석_사업체정보_2012</td>
									<td>DB</td>
									<td>분석</td>
									<td>4.8 GB</td>
									<td>kostat</td>
									<td>2018-12-13</td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title left"><a href="">sti_comp_info_2012</a></td>
									<td>내부분석_사업체정보_2012</td>
									<td>DB</td>
									<td>분석</td>
									<td>4.8 GB</td>
									<td>kostat</td>
									<td>2018-12-13</td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title left"><a href="">sti_comp_info_2012</a></td>
									<td>내부분석_사업체정보_2012</td>
									<td>DB</td>
									<td>분석</td>
									<td>4.8 GB</td>
									<td>kostat</td>
									<td>2018-12-13</td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title left"><a href="">sti_comp_info_2012</a></td>
									<td>내부분석_사업체정보_2012</td>
									<td>DB</td>
									<td>분석</td>
									<td>4.8 GB</td>
									<td>kostat</td>
									<td>2018-12-13</td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title left"><a href="">sti_comp_info_2012</a></td>
									<td>내부분석_사업체정보_2012</td>
									<td>DB</td>
									<td>분석</td>
									<td>4.8 GB</td>
									<td>kostat</td>
									<td>2018-12-13</td>
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
