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
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/work/collectCareer.js"></script>
	
	<!-- mng_s 2019. 06. 04 j.h.Seok -->
	<script>
		$(document).ready(
			function() {
				$collectCareer.request.doReqcollectCareerList(0);	
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
  <strong class="home">이력관리</strong>
  <h2>이력관리 현황</h2>
  <h3>정기적으로 SGISwork에 수집되어진 도로명 주소에 대한 이력관리 현황을 알 수 있습니다</h3>
</div>
<div class="tabs">
  <ul>
  	<!-- <li class="is-active"><a href="collectCareer">품질점검 이력관리</a></li> -->
  	<li><a href="collectCareer2">법정동 이력관리</a></li>
  	<li><a href="collectCareer3">주소사전 이력관리</a></li>
  </ul>
</div>
<div class="view-container">
  <div class="row">
    <div class="cols">
      <div class="col col-1">
        <div class="in-box">
          <div class="tbs1">
            <div class="tb-tit">
            	품질점검 데이터 목록 : <em id="cnt-page" class="total"></em>
              <div class="tit-utils">
              	<div class="btn-group line">
                  <button type="button" id="deleteBtn">삭제</button>
          		</div>
         	  </div>
            </div>
            <table id="collectCareer">
              <colgroup>
                <col width="80">
                <col width="100">
                <col width="300">
                <col>
                <col>
                <col>
              </colgroup>
              <thead>
	              <tr>
	                <th>선택</th>
	              	<th>이력 시퀀스</th>
	                <th>년도</th>
	                <th>생성일</th>
	                <th>구분</th>
	                <th>테이블</th>
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