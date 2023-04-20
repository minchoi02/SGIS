<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHeadNew.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/work/userMngEdit.js"></script>
	
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
				<div class="in-box">소속</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="select"> 
					<select name="inst_seq" id="inst_seq">
						<option value="">선택하세요</option>
					</select>
					</span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">부서</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="inputs"><input type="text" id="dept"></span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">사용자구분</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="select"> 
					<select name="user_div" id="user_div">
						<option value="e">타기관사용자</option>
						<option value="i">통계청사용자</option>
						<option value="d">데이터관리자</option>
						<option value="o">플랫폼운영자</option>
						<option value="a">서비스관리자</option>
						<option value="s">통계데이터센터</option>
					</select>
					</span>
				</div>
			</div>		
		</div>
	</div>
	<div class="row">
		<div class="cols">
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
			<div class="col col-sm1 col-txt">
				<div class="in-box">기관관리자</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="select"> 
					<select name="inst_manager_yn" id="inst_manager_yn">
						<option value="N">아니오</option>
						<option value="Y">예</option>
					</select>
					</span>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="cols">
			<div class="col col-sm1 col-txt">
				<div class="in-box">직급</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="inputs"><input type="text" id="job_pos"></span>
				</div>
			</div>			
			<div class="col col-sm1 col-txt">
				<!-- <div class="in-box">사용 시작일</div> -->
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<!-- <span class="inputs datepicker"><input type="text" id="use_start_date"></span> -->
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<!-- <div class="in-box">사용 종료일</div> -->
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<!-- <span class="inputs datepicker"><input type="text" id="use_end_date"></span> -->
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<!-- <div class="in-box">다중접속제한</div> -->
			</div>
			<div class="col col-sm2">
				<div class="in-box">
				<!-- 
					<span class="select"> 
					<select name="multi_connect_lmtt_yn" id="multi_connect_lmtt_yn">
						<option value="N">아니오</option>
						<option value="Y">예</option>
					</select>
					</span>				
				 -->

				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="cols">
			<div class="col col-sm1 col-txt">
				<div class="in-box">접속허용 IP</div>
			</div>
			<div class="col col-sm11">
				<div class="in-box">
					<span class="inputs"><input type="text" id="restrict_ip"></span>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="cols">
			<div class="col col-sm1 col-txt">
				<div class="in-box">반려 메시지</div>
			</div>
			<div class="col col-sm11">
				<div class="in-box">
					<span class="inputs"><input type="text" id="return_msg"></span>
				</div>
			</div>
		</div>
	</div>	
	<div class="row">
		<div class="cols">
			<div class="col col-sm1 col-txt">
				<div class="in-box">등록일</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="inputs"><input type="text" id="reg_ts" 
						value="" disabled></span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">승인일</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="inputs"><input type="text" id="grant_ts" disabled></span>
				</div>
			</div>			
			<div class="col col-sm1 col-txt">
				<div class="in-box">승인여부</div>
			</div>
			<div class="col col-sm2">
				<span class="select"> 
					<select name="grant_yn" id="grant_yn">
						<option value="N">아니오</option>
						<option value="Y">예</option>
					</select>
				</span>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">정지일</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="inputs"><input type="text" id="stop_ts" value="" disabled></span>
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
							<button type="button" id="btnLst" onclick="location.href='userMng'">목록으로</button>
							<button type="button" id="btnAprove">회원 승인</button>
							<button type="button" id="btnReject">승인 반려</button>
							<button type="button" id="btnModify">회원정보 수정</button>
							<button type="button" id="btnPasswordInit">패스워드 초기화</button>
							<button type="button" id="btnStopStart">정지 해제</button>
							<button type="button" id="btnDelete">사용자 삭제</button>
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
									<th>로그인IP</th>
									<th>로그인 성공/실패</th>
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
