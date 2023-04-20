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
	<h2>수집관리</h2>
	<h3>SGISwork시스템 수집관리입니다.</h3>
</div>
<div class="tabs">
	<ul>
		<li><a href="codeMng">분류관리</a></li>
		<li><a href="sourceMng">출처관리</a></li>
		<li><a href="groupLst">소속관리</a></li>
		<li><a href="errMng">오류관리</a></li>
		<li class="is-active"><a href="collectMng">수집관리</a></li>
	</ul>
</div>
<div class="srch-form">
	<div class="row">
		<div class="cols">
			<div class="col col-sm2">
				<div class="in-box">
					<span class="select"> <select name="" id="">
							<option value="">데이터명</option>
					</select>
					</span>
				</div>
			</div>
			<div class="col col-sm10">
				<div class="in-box">
					<div class="srch-group">
						<span class="inputs"><input type="text"
							placeholder="검색어를 입력해주세요"></span>
						<button type="button" class="btn lager line angular">검색</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="cols">
			<div class="col col-sm1 col-txt">
				<div class="in-box">데이터명</div>
			</div>
			<div class="col col-sm5">
				<div class="in-box">
					<span class="inputs"><input type="text"
						placeholder="데이터명"></span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">보유기관</div>
			</div>
		</div>
		<div class="col col-sm5">
			<div class="in-box">
				<span class="inputs"><input type="text"
					placeholder="보유기관"></span>
			</div>
		</div>
	</div>
</div>
<div class="row">
	<div class="cols">
		<div class="col col-sm1 col-txt">
			<div class="in-box">담당부서</div>
		</div>
		<div class="col col-sm5">
			<div class="in-box">
				<span class="inputs"><input type="text"
					placeholder="담당부서"></span>
			</div>
		</div>
		<div class="col col-sm1 col-txt">
			<div class="in-box">담당자명</div>
		</div>
		<div class="col col-sm5">
			<div class="in-box">
				<span class="inputs"><input type="text"
					placeholder="담당자명"></span>
			</div>
		</div>
	</div>
</div>
<div class="row">
	<div class="cols">
		<div class="col col-sm1 col-txt">
			<div class="in-box">연락처</div>
		</div>
		<div class="col col-sm5">
			<div class="in-box">
				<span class="inputs"><input type="text"
					placeholder="연락처"></span>
			</div>
		</div>
		<div class="col col-sm1 col-txt">
			<div class="in-box">입수주기</div>
		</div>
		<div class="col col-sm5">
			<div class="in-box">
				<span class="inputs"><input type="text"
					placeholder="입수주기"></span>
			</div>
		</div>
	</div>
</div>
<div class="row">
	<div class="cols">
		<div class="col col-sm1 col-txt">
			<div class="in-box">입수방법</div>
		</div>
		<div class="col col-sm11">
			<div class="in-box">
				<div class="srch-group">
					<span class="inputs"><input type="text"
						placeholder="입수방법을 입력해주세요"></span>
					<button type="button" class="btn lager line angular">+
						추가</button>
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
							수집관리 목록 : <em class="total">1 / 221 페이지
								총 2210건</em>
							<div class="tit-utils">
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
							</colgroup>
							<thead>
								<tr>
									<th><span class="checkbox solo"><input
											type="checkbox" id="all"><label for="all">&nbsp;</label></span>
									</th>
									<th>번호</th>
									<th>데이터명</th>
									<th>보유기관</th>
									<th>담당부서</th>
									<th>담당자명</th>
									<th>연락처</th>
									<th>입수방법</th>
									<th>입수주기</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="tb-edit"><a href="">학구도</a> <!--<input type="text">-->
									</td>
									<td class="tb-edit"><a href="">한국교육개발원</a> <!--<input type="text">-->
									</td>
									<td class="tb-edit"><a href="">교육시설환경연구센터</a>
										<!--<input type="text">--></td>
									<td class="tb-edit"><a href="">노근철</a> <!--<input type="text">-->
									</td>
									<td class="tb-edit"><a href="">02-786-9634</a> <!--<input type="text">-->
									</td>
									<td class="tb-edit"><a href="">https://schoolzone.edumac.kr
											(학구도안내서비스)</a> <!--<input type="text">--></td>
									<td class="tb-edit"><a href="">반기</a> <!--<input type="text">-->
									</td>
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
