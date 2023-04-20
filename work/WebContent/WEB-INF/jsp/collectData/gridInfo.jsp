<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHeadNew.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/work/gridInfo.js"></script>
	
	<!-- mng_s 2019. 06. 04 j.h.Seok -->
	<script>
		$(document).ready(
			function() {
				$gridInfo.request.doReqgridInfoList(0);	
				//$log.srvLogWrite("Z4", "02", "01", "01", "", "");
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
  <strong class="home">선택형 격자자료제공 관리</strong>
  <h2>선택형 격자자료제공</h2>
  <h3>선택된 격자자료를 다운로드 받을 수 있습니다.</h3>
</div>
<div class="view-container">
  <div class="row">
    <div class="cols">
      <div class="col col-1">
        <div class="in-box">
          <div class="tbs1">
            <table id="gridInfo">
              <colgroup>
                <col width="80">
                <col width="50%">
                <col>
                <col>
              </colgroup>
              <thead>
	              <tr>
	                <th>번호</th>
	              	<th>업무명</th>
	                <th>등록일</th>
	                <th>다운로드</th>
	              </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
          <div class="pageArea"><span id="searchPage" class="pages paging"></span></div>
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