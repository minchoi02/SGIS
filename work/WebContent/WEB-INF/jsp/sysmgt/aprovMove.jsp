<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHeadNew.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/work/aprovMove.js"></script>
	
	
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
	<h2>전송 승인 요청 관리</h2>
	<h3>사용자의 시스템 이용 신청 현황을 확인하고
		승인관리 합니다</h3>
</div>
<div class="view-container">
	<div class="row">
		<div class="cols">
			<div class="col col-1">
				<div class="in-box">
					<div class="tbs1">
						<div class="tb-tit">
							전송 승인 목록 : <em class="total"></em>
							<div class="tit-utils">
								<div class="btn-group color">
									<button type="button" class="c1" onclick="location.href='aprovMove';">전체목록</button>
									<button type="button" class="c6" onclick="location.href='?grant_yn=Y';">승인</button>
									<button type="button" class="c7" onclick="location.href='?grant_yn=O';">요청</button>
									<button type="button" class="c9" onclick="location.href='?grant_yn=N';">반려</button>
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
								<col style="width: 60px;">
								<col>
								<col>
								<col>
								<col style="width: 70px;">
							</colgroup>
							<thead>
								<tr>
									<th>번호</th>
									<th>신청자</th>
									<th>신청일</th>
									<th>승인자</th>
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
