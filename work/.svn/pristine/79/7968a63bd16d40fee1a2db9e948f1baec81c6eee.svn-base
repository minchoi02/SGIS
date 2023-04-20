<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<%@ page import="org.json.JSONObject"%>
<%@ page import="org.json.JSONArray"%>
<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHeadNew.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/work/collectLegDb.js"></script>
	
	
	<!-- mng_s 2019. 06. 04 j.h.Seok -->
	<script>
		$(document).ready(
			function() {
				//$log.srvLogWrite("Z0", "05", "01", "00", "", "");
		});
	</script>
	<style>
	.notice-title  
	{
		cursor:pointer
	}
	
	</style>
	<!-- mng_e 2019. 06. 04 j.h.Seok -->
</head>
<body>
	<jsp:include page="/view/common/includeHeader"></jsp:include>
	
  <div class="container">
    <div class="content_new">

<div class="sub-title">
	<strong class="home">데이터수집</strong>
	<h2>법정동 조례 수집</h2>
	<h3>법정동 조례 수집 이력을 확일할 수 있습니다.</h3>
</div>

<div class="view-container">
	<div class="row">
		<div class="cols">
			<div class="col col-1">
				<div class="in-box">
					<div class="tbs1">
						<div class="tb-tit">
							법정동 조례 수집 목록
							<div class="tit-utils">
								<div class="btn-group line">
									<button id="btnDelete" type="button">삭제</button>
									<button id="btnWrite" onclick="location.href='${pageContext.request.contextPath}/view/collectData/collectLegDbForm'" type="button">글쓰기</button>
								</div>
							</div>
						</div>
						<table id="dataTbl">
							<colgroup>
								<col style="width: 45px;">
								<col style="width: 60px;">
								<col>
								<col style="width: 120px;">
							</colgroup>
							<thead>
								<tr>
									<th></th>
									<th>번호</th>
									<th>제목</th>
									<th>수집일</th>
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
