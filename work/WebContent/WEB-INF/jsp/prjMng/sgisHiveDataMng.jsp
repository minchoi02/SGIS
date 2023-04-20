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
	<h2>스크립트 분석</h2>
	<h3>쿼리문을 이용하여 자유롭게 데이터를 분석합니다</h3>
</div>
<div class="tabs round mix">
	<ul>
		<li><a href="sgisDataMng">포스트그레스</a></li>
		<li class="is-active"><a href="sgisHiveDataMng">하이브</a></li>
	</ul>
	<button type="button" class="add">+</button>
</div>
<div class="view-container">
	<div class="row">
		<div class="cols">
			<div class="col col-sm3">
				<div class="in-box line">
					<div class="tbs1">
						<div class="tb-tit">스크립트 목록</div>
						<div class="srch-group">
							<span class="inputs"><input type="text" placeholder="검색어"></span>
							<button type="button" class="btn lager line angular">검색</button>
						</div>
						<table>
							<colgroup>
								<col>
								<col>
							</colgroup>
							<thead>
								<tr>
									<th>스크립트 명</th>
									<th>설명</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>[지오코딩_업데이트_도로명]_(11)_행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
									<td>행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
								</tr>
								<tr>
									<td>[지오코딩_업데이트_도로명]_(11)_행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
									<td>행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
								</tr>
								<tr>
									<td>[지오코딩_업데이트_도로명]_(11)_행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
									<td>행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
								</tr>
								<tr>
									<td>[지오코딩_업데이트_도로명]_(11)_행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
									<td>행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
								</tr>
								<tr>
									<td>[지오코딩_업데이트_도로명]_(11)_행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
									<td>행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
								</tr>
								<tr>
									<td>[지오코딩_업데이트_도로명]_(11)_행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
									<td>행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
								</tr>
								<tr>
									<td>[지오코딩_업데이트_도로명]_(11)_행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
									<td>행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
								</tr>
								<tr>
									<td>[지오코딩_업데이트_도로명]_(11)_행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
									<td>행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
								</tr>
								<tr>
									<td>[지오코딩_업데이트_도로명]_(11)_행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
									<td>행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
								</tr>
								<tr>
									<td>[지오코딩_업데이트_도로명]_(11)_행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
									<td>행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
								</tr>
								<tr>
									<td>[지오코딩_업데이트_도로명]_(11)_행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
									<td>행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
								</tr>
								<tr>
									<td>[지오코딩_업데이트_도로명]_(11)_행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
									<td>행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
								</tr>
								<tr>
									<td>[지오코딩_업데이트_도로명]_(11)_행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
									<td>행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
								</tr>
								<tr>
									<td>[지오코딩_업데이트_도로명]_(11)_행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
									<td>행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
								</tr>
								<tr>
									<td>[지오코딩_업데이트_도로명]_(11)_행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
									<td>행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
								</tr>
								<tr>
									<td>[지오코딩_업데이트_도로명]_(11)_행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
									<td>행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
								</tr>
								<tr>
									<td>[지오코딩_업데이트_도로명]_(11)_행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
									<td>행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
								</tr>
								<tr>
									<td>[지오코딩_업데이트_도로명]_(11)_행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
									<td>행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
								</tr>
								<tr>
									<td>[지오코딩_업데이트_도로명]_(11)_행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
									<td>행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
								</tr>
								<tr>
									<td>[지오코딩_업데이트_도로명]_(11)_행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
									<td>행자부 건물 업데이트 최종 대상 데이터를 관리데이터에 업서트</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="pageArea"><span id="searchPage"  class="pages paging"></span></div>
				</div>
			</div>
			<div class="col col-sm6">
				<div class="in-box line">
					<div class="tbs1">
						<div class="tb-tit">스크립트 입력</div>
						<div class="sel-lists">
							<div class="col col-5">
								<span class="select"> <select name="" id="">
										<option value="">조회</option>
								</select>
								</span>
							</div>
							<div class="col col-5">
								<span class="select"> <select name="" id="">
										<option value="">수정</option>
								</select>
								</span>
							</div>
							<div class="col col-5">
								<span class="select"> <select name="" id="">
										<option value="">삭제</option>
								</select>
								</span>
							</div>
							<div class="col col-5">
								<span class="select"> <select name="" id="">
										<option value="">입력</option>
								</select>
								</span>
							</div>
							<div class="col col-5">
								<span class="select"> <select name="" id="">
										<option value="">공간 분석</option>
								</select>
								</span>
							</div>
						</div>
						<div class="script-box"></div>
						<div class="btn-right">
							<div class="btn-group line">
								<button type="button" class="c1">▶ 실행</button>
								<button type="button">스크립트 저장 및 작업만들기</button>
								<button type="button">불러오기</button>
								<button type="button">새 쿼리</button>
								<button type="button">데이터 찾기</button>
							</div>
						</div>
					</div>
					<div class="paging">
						<span class="first"><a href=""><<</a></span> <span class="prev"><a
							href=""><</a></span>
						<ul>
							<li class="is-active"><a href="">1</a></li>
							<li><a href="">2</a></li>
						</ul>
						<span class="end"><a href="">></a></span> <span class="next"><a
							href="">>></a></span>
					</div>
				</div>
				<div class="in-box line mt20">
					<div class="tabs round  mt10">
						<ul>
							<li class="is-active"><a href="">결과</a></li>
							<li><a href="">차트</a></li>
							<li><a href="">지도</a></li>
						</ul>
					</div>
					<div class="tbs1">
						<div class="btn-right">
							<div class="btn-group line ">
								<button type="button">데이터 Pivot</button>
								<button type="button">실행결과 다운로드</button>
							</div>
						</div>
						<table>
							<colgroup>
								<col>
							</colgroup>
							<tbody>
								<tr>
									<td>결과없음</td>
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
						</ul>
						<span class="end"><a href="">></a></span> <span class="next"><a
							href="">>></a></span>
					</div>
				</div>
			</div>
			<div class="col col-sm3">
				<div class="in-box line">
					<div class="tbs1">
						<div class="tb-tit">테이블 목록</div>
						<span class="select mb10"> <select name="" id="">
								<option value="">kostat</option>
						</select>
						</span>
						<div class="mix-form3">
							<label for="">출처</label> <span class="select"> <select
								name="" id="">
									<option value="">전체</option>
							</select>
							</span>
						</div>
						<div class="mix-form3">
							<label for="">분류</label> <span class="select"> <select
								name="" id="">
									<option value="">전체</option>
							</select>
							</span>
						</div>

						<div class="srch-group">
							<span class="inputs"><input type="text"
								placeholder="검색할 테이블 명"></span>
							<button type="button" class="btn lager line angular">검색</button>
						</div>
						<table>
							<colgroup>
								<col>
							</colgroup>
							<thead>
								<tr>
									<th>테이블명</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>sen_2017_apt_me</td>
								</tr>
							</tbody>
						</table>
						<div class="paging">
							<span class="first"><a href=""><<</a></span> <span class="prev"><a
								href=""><</a></span>
							<ul>
								<li class="is-active"><a href="">1</a></li>
								<li><a href="">2</a></li>
							</ul>
							<span class="end"><a href="">></a></span> <span class="next"><a
								href="">>></a></span>
						</div>
					</div>
				</div>

				<div class="in-box line mt20">
					<div class="tbs1">
						<div class="tb-tit">컬럼 목록</div>
						<table>
							<colgroup>
								<col>
								<col>
								<col>
							</colgroup>
							<thead>
								<tr>
									<th>컬럼명</th>
									<th>타입</th>
									<th>설명</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>sen_2017_apt_me</td>
									<td>sen_2017_apt_me</td>
									<td>sen_2017_apt_me</td>
								</tr>
							</tbody>
						</table>
						<div class="paging">
							<span class="first"><a href=""><<</a></span> <span class="prev"><a
								href=""><</a></span>
							<ul>
								<li class="is-active"><a href="">1</a></li>
								<li><a href="">2</a></li>
							</ul>
							<span class="end"><a href="">></a></span> <span class="next"><a
								href="">>></a></span>
						</div>
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
