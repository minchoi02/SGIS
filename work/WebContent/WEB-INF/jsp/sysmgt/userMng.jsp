<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHeadNew.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/work/userMng.js"></script>
	
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
	<h2>사용자 관리</h2>
	<h3>위치 기반 데이터 관리 시스템 이용중인
		사용자를 확인하고 관리하실 수 있습니다.</h3>
</div>
<div class="srch-form">
	<div class="row">
		<div class="cols">
			<div class="col col-sm12">
				<div class="in-box">
					<div class="srch-group">
						<span class="inputs"><input type="text" id="searchText"
							placeholder="검색어를 입력해주세요"></span>
						<button id="btnSearch" type="button" class="btn lager line angular">검색</button>
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
							사용자 목록 : <em class="total"></em>
							<div class="tit-utils">
								<div class="btn-group color">
									<button type="button" class="c1" onclick="location.href='userMng';">전체목록</button>
									<button type="button" class="c6" onclick="location.href='?grant_yn=Y';">승인</button>
									<button type="button" class="c7" onclick="location.href='?grant_yn=O';">요청</button>
									<button type="button" class="c9" onclick="location.href='?grant_yn=X';">반려</button>
									<!-- <button type="button" class="c5" onclick="location.href='${pageContext.request.contextPath}/api/sysmgt/downloadUser.do';">다운로드</button> -->
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
						<table id="dataTbl">
							<colgroup>
								<col style="width: 90px;">
								<col style="width: 150px;">
								<col style="width: 150px;">
								<col style="width: 150px;">
								<col>
								<col style="width: 130px;">
								<col style="width: 70px;">
							</colgroup>
							<thead>
								<tr>
									<th>번호</th>
									<th>이름</th>
									<th>그룹</th>
									<th>소속</th>
									<th>최근접속</th>
									<th>로그인실패횟수</th>
									<th>승인</th>
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
