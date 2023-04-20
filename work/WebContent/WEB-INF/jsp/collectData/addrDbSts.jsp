<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHead.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script src="${pageContext.request.contextPath}/js/work/addrDbSts.js"></script>
	
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
  <h2>주소DB 자동화현황</h2>
  <h3>정기적으로 SGISwork에 수집되어진 도로명 주소에 대한 업무자동화 현황을 알 수 있습니다</h3>
</div>
<div class="view-container">
  <div class="row">
    <div class="cols">
      <div class="col col-1">
        <div class="in-box">
          <div class="tbs1">
            <table id="addrDBStstList">
              <colgroup>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col style="width:190px;">
              </colgroup>
              <thead>
	              <tr>
	              	<th>통판데이터수집일</th>
	                <th>통판데이터적재일</th>
	                <th>수집건수</th>
	                <th>중복제거 적재건수</th>
	                <th>이전주소 포함건수</th>
	                <th>루씬생성일</th>
	                <th>배포일</th>
	                <th>통판데이터 다운로드</th>
	              </tr>
              </thead>
              <tbody>
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
