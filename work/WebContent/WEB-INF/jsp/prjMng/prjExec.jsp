<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHeadNew.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script src="${pageContext.request.contextPath}/js/work/prjExec.js"></script>

	<!-- mng_s 2019. 06. 04 j.h.Seok -->
	<script>
		$(document).ready(
			function() {
				//$log.srvLogWrite("Z0", "05", "01", "00", "", "");
		});

		$(function() {
		    $(".dialog").dialog({
		      autoOpen: false,
		      width: 'auto',
		      height: 'auto',
		      modal: true,
		      resizable: false,
		      minimizable: false,
		      minimizeIcon: 'ui-icon-minus'
		    });
		    // $(".default-pop-open").button().on("click", function () {
		    //   $("#dialog").dialog("open");
		    // });
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
	<strong class="home">업무자동화</strong>
	<h2>데이터 업무 프로젝트 실행</h2>
	<h3>업무 별 프로젝트 진행 순서를 확인하고 관리하실 수 있습니다.</h3>
</div>
<div class="srch-form">
	<div class="row">
		<div class="cols">
			<div class="col col-sm3">
				<span class="select">
					<select name="clNm" id="clNm">
						<option value="">분류 선택</option>
						<option value="사업체">사업체</option>
						<option value="센서스_수집">센서스-수집</option>
						<option value="센서스_가공">센서스-가공</option>
						<option value="센서스_분석">센서스_분석</option>
						<option value="통계주제도">통계주제도</option>
						<option value="생활업종">생활업종</option>
						<option value="살고싶은우리동네">살고싶은 우리동네</option>
						<option value="기술업종">기술업종</option>
						<option value="공공데이터">공공데이터</option>
						<option value="서비스">서비스(포털)</option>
						<option value="일자리">일자리</option>
						<option value="외부데이터">외부데이터</option>
						<option value="품질점검">품질점검</option>
						<option value="기타">기타</option>
					</select>
				</span>
			</div>
			<div class="col col-sm8">
				<div class="in-box">
					<span class="inputs"><input type="text" name="searchText" id="prjSetSearchText" placeholder="검색어를 입력해주세요"></span>
				</div>
			</div>
			<div class="col col-sm1">
				<div class="in-box">
					<button type="button" id="prjSetSearchBtn" class="btn lager line angular">검색</button>
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
							데이터 자동화 프로젝트 목록 : <em class="total"></em>
							<div class="tit-utils">
								<div class="btn-group color">
									<button type="button" class="c3">단일/실행중/대기</button>
									<button type="button" class="c4">단일실행</button>
									<button type="button" class="c7">실행중</button>
									<button type="button" class="c8">실패</button>
									<button type="button" class="c6">완료</button>
								</div>
							</div>
						</div>
						<table id="prjSetTable">
							<colgroup>
								<col style="width: 100px;">
								<col>
							</colgroup>
							<tbody>
							</tbody>
						</table>
					</div>
					<div class="pageArea"><span id="prjSetPage"  class="pages paging"></span></div>
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
