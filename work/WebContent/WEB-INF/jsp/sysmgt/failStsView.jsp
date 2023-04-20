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
	<h2>운영현황</h2>
	<h3>SGISwork 시스템의 운영현황을 확인하실 수
		있습니다</h3>
</div>
<div class="tabs">
	<ul>
		<li><a href="">운영현황</a></li>
		<li><a href="">업무현황</a></li>
		<li><a href="">접속현황</a></li>
		<li><a href="">기관 접속현황</a></li>
		<li><a href="">시스템현황</a></li>
		<li class="is-active"><a href="">실패 작업 현황</a></li>
		<li><a href="">파일에이전트</a></li>
		<li><a href="">다운로드 현황</a></li>
		<li><a href="">분석현황 통계</a></li>
	</ul>
</div>
<div class="srch-form">
	<div class="row">
		<div class="cols">
			<div class="col col-sm2">
				<div class="in-box">
					<span class="select"> <select name="" id="">
							<option value="">업무이름</option>
							<option value="">설명</option>
					</select>
					</span>
				</div>
			</div>
			<div class="col col-sm10">
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
							실패 업무 목록 : <em class="total">1 / 221 페이지
								총 2210건</em>
							<div class="tit-utils">
								<button type="button" class="btn lager line angular">삭제</button>
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
								<col style="width: 130px;">
								<col style="width: 130px;">
								<col style="width: 90px;">
								<col style="width: 90px;">
							</colgroup>
							<thead>
								<tr>
									<th><span class="checkbox solo"><input
											type="checkbox" id="all"><label for="all">&nbsp;</label></span>
									</th>
									<th>번호</th>
									<th>업무이름</th>
									<th>워크플로우</th>
									<th>설명</th>
									<th>업무종류</th>
									<th>시작시간</th>
									<th>완료시간</th>
									<th>사용자ID</th>
									<th>오류처리</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title"><a href="">데이터분석</a></td>
									<td></td>
									<td></td>
									<td></td>
									<td>2019-05-16 00:08:54.965683</td>
									<td>2019-05-16 00:09:54.382</td>
									<td><a href="">tktest4</a></td>
									<td><span class="label c3">오류처리</span></td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c2"><label for="c2">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title"><a href="">데이터분석</a></td>
									<td></td>
									<td></td>
									<td></td>
									<td>2019-05-16 00:08:54.965683</td>
									<td>2019-05-16 00:09:54.382</td>
									<td><a href="">tktest4</a></td>
									<td><span class="label c3">오류처리</span></td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c3"><label for="c3">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title"><a href="">데이터분석</a></td>
									<td></td>
									<td></td>
									<td></td>
									<td>2019-05-16 00:08:54.965683</td>
									<td>2019-05-16 00:09:54.382</td>
									<td><a href="">tktest4</a></td>
									<td><span class="label c3">오류처리</span></td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c4"><label for="c4">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title"><a href="">데이터분석</a></td>
									<td></td>
									<td></td>
									<td></td>
									<td>2019-05-16 00:08:54.965683</td>
									<td>2019-05-16 00:09:54.382</td>
									<td><a href="">tktest4</a></td>
									<td><span class="label c3">오류처리</span></td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c5"><label for="c5">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title"><a href="">데이터분석</a></td>
									<td></td>
									<td></td>
									<td></td>
									<td>2019-05-16 00:08:54.965683</td>
									<td>2019-05-16 00:09:54.382</td>
									<td><a href="">tktest4</a></td>
									<td><span class="label c3">오류처리</span></td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c6"><label for="c6">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title"><a href="">데이터분석</a></td>
									<td></td>
									<td></td>
									<td></td>
									<td>2019-05-16 00:08:54.965683</td>
									<td>2019-05-16 00:09:54.382</td>
									<td><a href="">tktest4</a></td>
									<td><span class="label c3">오류처리</span></td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c7"><label for="c7">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title"><a href="">데이터분석</a></td>
									<td></td>
									<td></td>
									<td></td>
									<td>2019-05-16 00:08:54.965683</td>
									<td>2019-05-16 00:09:54.382</td>
									<td><a href="">tktest4</a></td>
									<td><span class="label c3">오류처리</span></td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c8"><label for="c8">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title"><a href="">데이터분석</a></td>
									<td></td>
									<td></td>
									<td></td>
									<td>2019-05-16 00:08:54.965683</td>
									<td>2019-05-16 00:09:54.382</td>
									<td><a href="">tktest4</a></td>
									<td><span class="label c3">오류처리</span></td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c9"><label for="c9">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title"><a href="">데이터분석</a></td>
									<td></td>
									<td></td>
									<td></td>
									<td>2019-05-16 00:08:54.965683</td>
									<td>2019-05-16 00:09:54.382</td>
									<td><a href="">tktest4</a></td>
									<td><span class="label c3">오류처리</span></td>
								</tr>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c10"><label for="c10">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="title"><a href="">데이터분석</a></td>
									<td></td>
									<td></td>
									<td></td>
									<td>2019-05-16 00:08:54.965683</td>
									<td>2019-05-16 00:09:54.382</td>
									<td><a href="">tktest4</a></td>
									<td><span class="label c3">오류처리</span></td>
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
