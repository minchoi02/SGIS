<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHeadNew.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/work/aprovMoveEdit.js"></script>
	
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
					<div class="tbs2">
						<div class="tb-tit">
							전송 승인
							<div class="tit-utils">
								<div class="btn-group line">
									<button id="btnAprove" type="button">승인</button>
									<button id="btnReject" type="button">반려</button>
									<button id="btnCancel" type="button">취소</button>
								</div>
							</div>
						</div>
						<table>
							<colgroup>
								<col style="width: 10%">
								<col style="width: 40%">
								<col style="width: 10%">
								<col style="width: 40%">
							</colgroup>
							<tbody>
								<tr>
									<th>신청자명</th>
									<td id="user_nm"></td>
									<th>신청자일</th>
									<td id="req_dt"></td>
								</tr>
								<tr>
									<th>서비스명</th>
									<td id="info_link_srv_nm"></td>
									<th>분 야</th>
									<td id="info_link_srv_realm"></td>
								</tr>
								<tr>
									<th>신청테이블</th>
									<td id="trans_table_name"></td>
									<th>승인일</th>
									<td id="grant_dt"></td>
								</tr>
								<tr>
									<th>사용자</th>
									<td colspan="2">
									<span class="inputs"><input id="user-id" type="text" value="" placeholder="아이디"></span>
									</td>
									<td>
									<!-- <button type="button" class="btn lager line angular inline" id="btnSearch" style="width:100px;">찾기</button> -->
									</td>
								</tr>
								<tr>
									<th>신청내용</th>
									<td colspan="3">
									<span class="inputs"><input type="text" id="req_content" value="" placeholder="신청내용" readonly="readonly"></span>
									</td>
								</tr>
								<tr>
									<th>반려내용</th>
									<td colspan="3">
									<span class="inputs"><input type="text" id="procs_content" value="" placeholder="반려내용"></span>
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
