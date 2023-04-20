<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHeadNew.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/work/userSdcMngEdit.js"></script>
	
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
	<strong class="home">통계데이터센터 운영자</strong>
	<h2>사용자 관리</h2>
	<h3>위치 기반 데이터 관리 시스템 이용중인
		사용자를 확인하고 관리하실 수 있습니다.</h3>
</div>
<!-- <div class="tabs">
	<ul>
		<li class="is-active"><a href="userView">사용자 상세 정보</a></li>
		<li><a href="userMonitor">사용자 모니터링</a></li>
		<li><a href="userSpace">작업 공간 관리</a></li>
		<li><a href="userData">사용가능 데이터관리</a></li>
	</ul>
</div> -->
<div class="srch-form">
	<div class="row">
		<input type="hidden" id="use_yn">
		<div class="cols">
			<div class="col col-sm1 col-txt">
				<div class="in-box">아이디(이름)</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="inputs"><input type="text" id="user_nm" value="" disabled></span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">이메일</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="inputs"><input type="text" id="email" value=""></span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">휴대전화</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="inputs"><input type="text" id="tel_no" value=""></span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">직통전화</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="inputs"><input type="text" id="tel_no2"></span>
				</div>
			</div>	
		</div>
	</div>
	<div class="row">
		<div class="cols">
			<div class="col col-1">
				<div class="in-box">
					<div class="form-btns">
						<div class="btn-group line mt20">
							<button type="button" id="btnLst" onclick="location.href='userSdcMng'">목록으로</button>
							<button type="button" id="btnModify">회원정보 수정</button>
							<button type="button" id="btnPasswordInit">패스워드 초기화</button>
							<button type="button" id="btnDataDrop">데이터 초기화</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="view-container">
	<div class="row">
		<div class="cols">
			<div class="col col-1">
				<div class="in-box">
					<div class="tbs1">
						<div class="tb-tit">
							접속이력
						</div>
						<table id="dataTbl">
							<colgroup>
								<col>
								<col>
								<col>
							</colgroup>
							<thead>
								<tr>
									<th>로그인 일시</th>
									<th>로그성공/실패</th>
									<th>로그인IP</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="pageArea"><span id="workSetPage"  class="pages paging"></span></div>
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
