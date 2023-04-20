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
	<h2>사용자 관리</h2>
	<h3>위치 기반 데이터 관리 시스템 이용중인
		사용자를 확인하고 관리하실 수 있습니다.</h3>
</div>
<h4 class="user-txt">['cky88'님 사용자 관리]</h4>
<div class="tabs">
	<ul>
		<li class="is-active"><a href="userView">사용자 상세 정보</a></li>
		<li><a href="userMonitor">사용자 모니터링</a></li>
		<li><a href="userSpace">작업 공간 관리</a></li>
		<li><a href="userData">사용가능 데이터관리</a></li>
	</ul>
</div>
<div class="srch-form">
	<div class="row">
		<div class="cols">
			<div class="col col-sm1 col-txt">
				<div class="in-box">이름</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="inputs"><input type="text" value="asf" disabled></span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">아이디</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="inputs"><input type="text" value="asf" disabled></span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">소속</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="select"> <select name="" id="">
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
					<span class="inputs"><input type="text"></span>
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
					<span class="inputs"><input type="text" value="asd@awd.net"></span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">휴대전화</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="inputs"><input type="text" value="01055555555"></span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">직통전화</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="inputs"><input type="text"></span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">사용용량</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="select"> <select name="" id="">
							<option value="">선택하세요</option>
					</select>
					</span>
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
					<span class="inputs"><input type="text"
						value="2019-06-24 23:30:20.987049" disabled></span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">수정일</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="inputs"><input type="text"
						value="2019-06-24 23:30:20.987049" disabled></span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">승인일</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="inputs"><input type="text"
						value="2019-06-24 23:30:20.987049" disabled></span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">사용자구분</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="select"> <select name="" id="">
							<option value="">타기관사용자</option>
					</select>
					</span>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="cols">
			<div class="col col-sm1 col-txt">
				<div class="in-box">사용 시작일</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="inputs datepicker"><input type="text"></span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">사용 종료일</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="inputs datepicker"><input type="text"></span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">정지일</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="inputs"><input type="text" value="" disabled></span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">다중접속제한</div>
			</div>
			<div class="col col-sm2">
				<div class="in-box">
					<span class="radios"><input type="radio" id="y"><label
						for="y">Y</label></span> <span class="radios"><input type="radio"
						id="n"><label for="n">N</label></span>
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
					<button type="button" class="btn sm line angular">+ 추가</button>
					<p class="line-txt">IP를 추가한 경우에는 해당
						IP외에서는 로그인이 제한됩니다</p>
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
							<button type="button">회원 승인</button>
							<button type="button">회원정보 수정</button>
							<button type="button">패스워드 초기화</button>
							<button type="button">중지 해제</button>
							<button type="button">사용자 삭제</button>
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
							<div class="tit-utils">
								<span class="select"> 
								<select name="selectViewCount" id="selectViewCount">
				                    <option value="10">10개보기</option>
				                    <option value="50">50개보기</option>
				                    <option value="100">100개보기</option>
				                 </select>
								</span>
							</div>
						</div>
						<table>
							<colgroup>
								<col>
								<col>
								<col>
							</colgroup>
							<thead>
								<tr>
									<th>로그인 일시</th>
									<th>로그아웃 일시</th>
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
					<div class="paging">
						<span class="first"><a href=""><<</a></span> <span class="prev"><a
							href=""><</a></span>
						<ul>
							<li class="is-active"><a href="">1</a></li>
							<li><a href="">2</a></li>
							<li><a href="">3</a></li>
							<li><a href="">4</a></li>
							<li><a href="">5</a></li>
							<li><a href="">6</a></li>
							<li><a href="">7</a></li>
							<li><a href="">8</a></li>
							<li><a href="">9</a></li>
							<li><a href="">10</a></li>
						</ul>
						<span class="end"><a href="">></a></span> <span class="next"><a
							href="">>></a></span>
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
