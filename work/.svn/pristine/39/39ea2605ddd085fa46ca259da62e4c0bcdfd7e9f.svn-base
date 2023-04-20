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
	<strong class="home">통계청데이터 품질점검</strong>
	<h2>통계청데이터 품질점검</h2>
	<h3>항목별 센서스데티터에 대한 품질을 확인할 수 있습니다.</h3>
</div>

<div class="view-container">
	<div class="row">
		<div class="cols">
			<div class="col col-1">
				<div class="in-box">
					<div class="tbs1">
						<div class="tb-tit">
							품질점검표 다운로드
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
									<th>생성일</th>
								</tr>
								<tr>
									<th></th>
									<th>1</th>
									<th><a href="/file_down/verify/age_year_2018.xlsx">2018 인구 연령별 시계열 데이터 점검표</a></th>
									<th>2019-10-14</th>
								</tr>
								<tr>
									<th></th>
									<th>2</th>
									<th><a href="/file_down/verify/age_year_m_2018.xlsx">2018 인구 남성 연령별 시계열 데이터 점검표</a></th>
									<th>2019-10-14</th>
								</tr>
								<tr>
									<th></th>
									<th>3</th>
									<th><a href="/file_down/verify/age_year_f_2018.xlsx">2018 인구 여성 연령별 시계열 데이터 점검표</a></th>
									<th>2019-10-14</th>
								</tr>
								<tr>
									<th></th>
									<th>4</th>
									<th><a href="/file_down/verify/family_2018.xlsx">2018 가구 세대별 시계열 데이터 점검표</a></th>
									<th>2019-10-14</th>
								</tr>
								<tr>
									<th></th>
									<th>5</th>
									<th><a href="/file_down/verify/house_area_2018.xlsx">2018 주택 면적 시계열 데이터 점검표</a></th>
									<th>2019-10-14</th>
								</tr>
								<tr>
									<th></th>
									<th>6</th>
									<th><a href="/file_down/verify/house_type_2018.xlsx">2018 주택 유형 시계열 데이터 점검표</a></th>
									<th>2019-10-14</th>
								</tr>
								<tr>
									<th></th>
									<th>7</th>
									<th><a href="/file_down/verify/house_const_year_2018.xlsx">2018 주택 노후년수 시계열 데이터 점검표</a></th>
									<th>2019-10-14</th>
								</tr>
								<tr>
									<th></th>
									<th>8</th>
									<th><a href="/file_down/verify/comp_2018.xlsx">2018 사업체데이터 점검표</a></th>
									<th>2019-11-18</th>
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
