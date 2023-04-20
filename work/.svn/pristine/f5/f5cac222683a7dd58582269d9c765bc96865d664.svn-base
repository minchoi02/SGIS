<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHeadNew.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script src="${pageContext.request.contextPath}/js/codeMirror/codemirror.js"></script>
	<script src="${pageContext.request.contextPath}/js/codeMirror/sql.js"></script>
	<script src="${pageContext.request.contextPath}/js/work/dataSvcDetail.js"></script>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/js/codeMirror/codemirror.css" />
	<style>
	.CodeMirror {
		border-top: 1px solid black;
		border-bottom: 1px solid black;
	}
	</style>
	
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
<div class="view-container">
	<div class="row">
		<div class="cols">
			<div class="col col-1">
				<div class="in-box">
					<div class="tbs2">
						<div class="tb-tit">
							업무 정보 <span style="font-size:11px !important">(* : 필수입력)</span>
							<div class="tit-utils">
								<div class="btn-group line">
									<button id="btnSave" type="button">저장</button>
									<button id="btnList" type="button" onclick="location.href='dataSvcMng'">목록</button>
								</div>
							</div>
						</div>
						<table>
							<colgroup>
								<col style="width: 15%">
								<col style="width: 20%">
								<col style="width: 20%">
								<col style="width: 45%">
							</colgroup>
							<tbody>
								<tr>
									<th class="require">자동화업무명</th>
									<td colspan="3">
										<span class="inputs"><input type="text" id="prj_name" placeholder="업무명"></span>
									</td>
								</tr>				
								<tr>
									<th>작업예약</th>
									<td colspan="3">
										2021-09-03 12:33 <div class="btn-group line"><button id="btnExec" type="button">예약하기</button></div>
									</td>
								</tr>			
								<tr>
									<th class="require">분기</th>
									<td>
										<span class="select">
											<select name="cl_nm" id="cl_nm">
												<option value="2">2분기</option>
												<option value="4">4분기</option>
											</select>
										</span>
									</td>
									<td colspan="2"></td>
								</tr>
								<tr>
									<th class="require">작업구분</th>
									<td colspan="3">
										<span class="checkbox"><input type="checkbox" class="jobsel" name="job_step1" id="job_step11"  checked><label for="job_step1">마트구축</label></span>
										<span class="checkbox"><input type="checkbox" class="jobsel" name="job_step1" id="job_step13"  checked><label for="job_step3">파일생성</label></span>
									</td>
								</tr>
								<tr>
									<th class="require">자료제공</th>
									<td colspan="3">
										<span class="radios"><input type="radio" class="jobsel" name="job_step" id="job_step1" value="db"><label for="job_step1">일반자료제공</label></span>
										<span class="radios"><input type="radio" class="jobsel" name="job_step" id="job_step3" value="ge"><label for="job_step3">격자</label></span>
									</td>
								</tr>
								<tr class="geojob">
									<th class="require">인총/사총</th>
									<td>
									<span class="select">
										<select name="job_jj" id="job_jj">
											<option value="인총">인총</option>
											<option value="사총">사총</option>
										</select>
										</span>
									</td>
									<td>
									</td>
									<td>
									</td>
								</tr>
								<tr class="geojob">
									<th class="require">년도</th>
									<td>
									<span class="select">
										<select name="job_yy1" id="job_yy1">
											<option value="2020">2020</option>
											<option value="2019">2019</option>
											<option value="2018">2018</option>
										</select>
										</span>
									</td>
									<td>
									<span class="select">
										<select name="job_yy2" id="job_yy2">
											<option value="2020">2020</option>
											<option value="2019">2019</option>
											<option value="2018">2018</option>
										</select>
										</span>
									</td>
									<td>
									</td>
								</tr>
							</tbody>
						</table>
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
