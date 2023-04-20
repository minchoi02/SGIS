<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHead.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	
	
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
	<h2>사용자 승인 요청 관리</h2>
	<h3>사용자의 시스템 이용 신청 현황을 확인하고
		승인관리 합니다</h3>
</div>
<div class="tabs">
	<ul>
		<li><a href="aprovMove">전송 승인</a></li>
		<li class="is-active"><a href="aprovApi">API 승인</a></li>
	</ul>
</div>
<div class="srch-form">
	<div class="row">
		<div class="cols">
			<div class="col col-sm6">
				<div class="in-box">
					<div class="toggle-switch">
						<strong class="txt">다음 API 사용자 사용</strong> <label
							class="switch"> <input type="checkbox"
							class="switch-input" /> <span class="switch-label" data-on="ON"
							data-off="OFF"></span> <span class="switch-handle"></span>
						</label>
					</div>
				</div>
			</div>
			<div class="col col-sm6">
				<div class="in-box">
					<strong class="txt">&nbsp;</strong>
					<button type="button" class="btn lager line angular">Open
						API 사용자 통계 ></button>
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
