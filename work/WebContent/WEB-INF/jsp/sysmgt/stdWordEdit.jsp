<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHeadNew.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/work/stdWordEdit.js"></script>
	
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
	<h2>데이터 표준화 관리</h2>
	<h3>테이블, 필드명 표준화 적용을 위한 표준 단어를 관리합니다.</h3>
</div>
<div class="view-container">
	<div class="row">
		<div class="cols">
			<div class="col col-1">
				<div class="in-box">
					<div class="tbs2">
						<div class="tb-tit">
							데이터 표준화 관리
							<div class="tit-utils">
								<div class="btn-group line">
									<button id="btnDelete" type="button">삭제</button>
									<button id="btnSave" type="button">저장</button>
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
									<th class="require">한글명</th>
									<td colspan="3"><span class="inputs"><input
											id="korean_wrd_nm" type="text" value=""
											placeholder="한글명"></span>
									</td>
								</tr>
								<tr>
									<th>영문 약어명</th>
									<td colspan="3">
										<span class="inputs"><input
											id="eng_abrv_nm" type="text" value=""
											placeholder="영문 약어명"></span>
									</td>
								</tr>
								<tr>
									<th>영문명</th>
									<td colspan="3">
										<span class="inputs"><input
											id="eng_wrd_nm" type="text" value=""
											placeholder="영문명"></span>
									</td>
								</tr>
								<tr>
									<th>단어정의</th>
									<td colspan="3">
										<span class="inputs"><input
											id="wrd_desc" type="text" value=""
											placeholder="단어정의"></span>
									</td>
								</tr>
								<tr>
									<th>단어유형</th>
									<td colspan="3">
										<span class="inputs"><input
											id="wrd_type" type="text" value=""
											placeholder="단어유형"></span>
									</td>
								</tr>
								<tr>
									<th>비고</th>
									<td colspan="3">
										<span class="inputs"><input
											id="rm" type="text" value=""
											placeholder="비고"></span>
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
