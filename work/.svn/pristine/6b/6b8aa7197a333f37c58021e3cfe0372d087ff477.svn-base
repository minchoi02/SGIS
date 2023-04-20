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
		<li><a href="userView">사용자 상세 정보</a></li>
		<li><a href="userMonitor">사용자 모니터링</a></li>
		<li class="is-active"><a href="userSpace">작업 공간 관리</a></li>
		<li><a href="userData">사용가능 데이터관리</a></li>
	</ul>
</div>
<div class="srch-form">
	<div class="row">
		<div class="tits">
			<h4>작업공간 현황</h4>
		</div>
		<div class="cols">
			<div class="col col-sm4">
				<div class="in-box">
					<canvas id="chart" width="400" height="225"></canvas>
				</div>
			</div>
			<div class="col col-sm8">
				<div class="in-box">
					<div class="zone">
						<dl>
							<dt>총 공간 :</dt>
							<dd>
								<span class="select inline"> <select name="" id="">
										<option value="">5G</option>
								</select>
								</span>
								<button type="button" class="btn lager line angular w130">용량
									수정</button>
							</dd>
						</dl>
						<dl>
							<dt>사용중인 공간 :</dt>
							<dd>0</dd>
						</dl>
						<dl>
							<dt>사용 가능한 공간 :</dt>
							<dd>5 GB</dd>
						</dl>
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
							저장 데이터 목록 : <em class="total">1 / 221
								페이지 총 2210건</em>
							<div class="tit-utils">
								<div class="btn-group color">
									<button type="button" class="c1">전체목록</button>
									<button type="button" class="c2">수집</button>
									<button type="button" class="c3">가공</button>
									<button type="button" class="c4">분석</button>
									<button type="button" class="c5">저장</button>
								</div>
								<div class="btn-group line">
									<button type="button">삭제</button>
								</div>
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
								<col style="width: 45px;">
								<col style="width: 60px;">
								<col>
								<col>
								<col>
								<col>
								<col>
								<col>
								<col>
								<col>
							</colgroup>
							<thead>
								<tr>
									<th><span class="checkbox solo"><input
											type="checkbox" id="all"><label for="all">&nbsp;</label></span>
									</th>
									<th>번호</th>
									<th>데이터명</th>
									<th>설명</th>
									<th>저장소</th>
									<th>저장폴더</th>
									<th>크기</th>
									<th>출처</th>
									<th>분류</th>
									<th>최종수정일</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
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

<!-- @@block  =  chart-->
<script>
  var ctx = document.getElementById('chart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['미사용'],
      datasets: [{
        label: '방문자수',
        data: [100],
        backgroundColor: 'rgba(0, 43, 255, 0.5)'
      }]
    },
    options: {
      legend: {
        display: false
      }
    }
  });
</script>
<!-- @@close-->