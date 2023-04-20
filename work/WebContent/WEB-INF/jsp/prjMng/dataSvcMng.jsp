<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHead.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script src="${pageContext.request.contextPath}/js/work/dataSvcMng.js"></script>
	
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
	<strong class="home">자료제공서비스</strong>
	<h2>자료제공서비스 자동화</h2>
	<h3>자료제공 자동화 업무를 설정하고 관리하실 수 있습니다.</h3>
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
							자동화 목록 : <em class="totalN"></em>
							<div class="tit-utils">
								<div class="btn-group line">
									<button type="button" onclick="location.href='dataSvcNew'">+ 새 업무</button>
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
						<table id="dataSvcMngTable">
<thead><tr><th style="width: 60px;">선택</th>
<th style="width: 60px;">번호</th>
<th>업무명</th>
<th style="width: 100px;">구분</th>
<th style="width: 100px;">작업상태</th>
<th style="width: 100px;">시작일시</th>
<th style="width: 100px;">종료일시</th>
</tr></thead>						
<tbody>
<tr id="sIdx_0"><td><span class="checkbox solo"><input type="checkbox" name="job_seq" id="c0" value="518"><label for="c0">&nbsp;</label></span></td><td>1</td><td class="left"><a href="/admin/view/prjMng/dataSvcDetail?job_setup_seq=518">자료제공 총괄</a></td><td>마트구축</td><td>등록</td><td>2020-12-19</td><td>2020-12-19</td></tr>
<tr id="sIdx_1"><td><span class="checkbox solo"><input type="checkbox" name="job_seq" id="c1" value="517"><label for="c1">&nbsp;</label></span></td><td>2</td><td class="left"><a href="/admin/view/prjMng/dataSvcDetail?job_setup_seq=517">자료제공 총괄 - 격자</a></td><td>일괄실행</td><td>예약</td><td>2020-12-19</td><td>2020-12-19</td></tr>
<tr id="sIdx_2"><td><span class="checkbox solo"><input type="checkbox" name="job_seq" id="c1" value="517"><label for="c1">&nbsp;</label></span></td><td>2</td><td class="left"><a href="/admin/view/prjMng/dataSvcDetail?job_setup_seq=517">자료제공 총괄 - 격자</a></td><td>일괄실행</td><td>완료</td><td>2020-12-19</td><td>2020-12-19</td></tr>
<tr id="sIdx_3"><td><span class="checkbox solo"><input type="checkbox" name="job_seq" id="c2" value="516"><label for="c2">&nbsp;</label></span></td><td>3</td><td class="left"><a href="/admin/view/prjMng/dataSvcDetail?job_setup_seq=516">자료제공 사업체</a></td><td>마트구축</td><td>실행중</td><td>2020-12-19</td><td>2020-12-19</td></tr>
<tr id="sIdx_4"><td><span class="checkbox solo"><input type="checkbox" name="job_seq" id="c2" value="516"><label for="c2">&nbsp;</label></span></td><td>3</td><td class="left"><a href="/admin/view/prjMng/dataSvcDetail?job_setup_seq=516">자료제공 사업체 - 격자</a></td><td>일괄실행</td><td>실패</td><td>2020-12-19</td><td>2020-12-19</td></tr>
</tbody>
						</table>
					</div>
					<div class="pageArea"><span id="workSetPageN"  class="pages paging"></span></div>
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
