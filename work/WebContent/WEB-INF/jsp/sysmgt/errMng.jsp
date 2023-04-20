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
	<h2>오류관리</h2>
	<h3>SGISwork시스템 오류관리입니다.</h3>
</div>
<div class="tabs">
	<ul>
		<li><a href="codeMng">분류관리</a></li>
		<li><a href="sourceMng">출처관리</a></li>
		<li><a href="groupLst">소속관리</a></li>
		<li class="is-active"><a href="errMng">오류관리</a></li>
		<li><a href="collectMng">수집관리</a></li>
	</ul>
</div>
<div class="srch-form">
	<div class="row">
		<div class="cols">
			<div class="col col-sm2">
				<div class="in-box">
					<span class="select"> <select name="" id="">
							<option value="">내용</option>
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
				<div class="in-box">한글오류내용</div>
			</div>
			<div class="col col-sm5">
				<div class="in-box">
					<span class="inputs"><input type="text"
						placeholder="한글오류내용"></span>
				</div>
			</div>
			<div class="col col-sm1 col-txt">
				<div class="in-box">영문오류내용</div>
			</div>
		</div>
		<div class="col col-sm5">
			<div class="in-box">
				<span class="inputs"><input type="text"
					placeholder="영문오류내용"></span>
			</div>
		</div>
	</div>
</div>
<div class="row">
	<div class="cols">
		<div class="col col-sm1 col-txt">
			<div class="in-box">설명</div>
		</div>
		<div class="col col-sm11">
			<div class="in-box">
				<div class="srch-group">
					<span class="inputs"><input type="text"
						placeholder="설명을 입력해주세요"></span>
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
							오류관리 목록 : <em class="total">1 / 221 페이지
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
							</colgroup>
							<thead>
								<tr>
									<th><span class="checkbox solo"><input
											type="checkbox" id="all"><label for="all">&nbsp;</label></span>
									</th>
									<th>번호</th>
									<th>한글오류내용</th>
									<th>영문오류내용</th>
									<th>설명</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td><span class="checkbox solo"><input
											type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
									</td>
									<td>2210</td>
									<td class="tb-edit"><a href="">[MESSAGE]:null[TRACE]:java.lang.NullPointerException
											at
											kostat.sop.autoAgent.func.ProcessFunc.startProcess(ProcessFunc.java:89)
											at
											kostat.sop.autoAgent.job.ActionStart.run(ActionStart.java:146)</a>
										<!--<input type="text">--></td>
									<td>[MESSAGE]:null[TRACE]:java.lang.NullPointerException
										at
										kostat.sop.autoAgent.func.ProcessFunc.startProcess(ProcessFunc.java:89)
										at
										kostat.sop.autoAgent.job.ActionStart.run(ActionStart.java:146)
									</td>
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
