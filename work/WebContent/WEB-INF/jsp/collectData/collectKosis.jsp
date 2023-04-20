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
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/work/collectKosis.js"></script>	

	<script>
	var yy = "${yy}";
		$(document).ready(
				function(){
					//$collectKosis.ui.setDateBox();
					$collectKosis.request.doReqcollectKosis(0);
					$log.srvLogWrite("Z4", "02", "01", "01", "", "");
				});
	</script>
</head>

<body>
	<jsp:include page="/view/common/includeHeader"></jsp:include>
	
	<div class="container">
		<div class="content_new">

			<div class="sub-title">
				<strong class = "home">Kosis 비교자료 등록</strong>
				<h2>Kosis 비교자료 등록 현황</h2>
				<h3>정기적으로 LDBMS에 수집되어진 Kosis 자료에 대한 현황을 알 수 있습니다.</h3>
			</div>
			<div class="view-container">
			  <div class="row">
			  	<div class="cols">
			  	  <div class="col col-1">
			  	  	<div class="in-box">
			  	  	  <div class="tbs1">
			  	  	  	<div class="tb-tit">
			  	  	  		Kosis 비교 자료 등록: <em class="total_cnt"></em>
			  	  	  	  <div class="tit-utils">
			  	  	  	  	<div class="btn-group line">
			  	  	  	  		<button type="button" onclick="location.href='collectKosisNew'">+ 추가</button>
			  	  	  	  	</div>
				  	  	  	<span class="select">
				  	  	  	<select name="selectViewCount" id="selectViewCount">
				  	  	  	<option value="10">10개 보기</option>
				  	  	  	<option value="50">50개 보기</option>
				  	  	  	<option value="100">100개 보기</option>
				  	  	  	</select>
				  	  	  	</span>
				  	  	  	<span class="select">
				  	  	  	<select name="YEAR" id="YEAR" title="년도"  class="select_year">
				  	  	  		<!-- <option value=''>total</option> -->
				  	  	  	</select>
				  	  	  	</span>
			  	  	  	  </div>
			  	  	  	</div>
			  	  	  	<table id="kosisTable">
			  	  	  		<colgroup>
			  	  	  			<col width="80">
			  	  	  			<col width="100">
			  	  	  			<col width="100">
			  	  	  			<col>
			  	  	  			<col>
			  	  	  		</colgroup>
			  	  	  		<thead>
			  	  	  			<tr>
			  	  	  				<th>시퀀스</th>
			  	  	  				<th>년도</th>
			  	  	  				<th>구분</th>
			  	  	  				<th>항목</th>
			  	  	  				<th>등록일</th>
			  	  	  			</tr>
			  	  	  		</thead>
			  	  	  		<tbody>
			  	  	  		</tbody>
			  	  	  	</table>
			  	  	  </div>
			  	  	  <div class="pageArea"><span id="kosisPage" class="pages paging"></span></div>
			  	  	</div>
			  	  </div>
			  </div>
			</div>
		  </div>
		</div>		
	</div>     	<!-- sub content wrap end -->
			<!-- footer -->
			<jsp:include page="/view/common/includeFooterNew"></jsp:include>			
				
</body>
</html>