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
<!-- @@block content -->
<div class="sub-title">
  <strong class="home">데이터수집</strong>
  <h2>도로명 주소 수집현황</h2>
  <h3>정기적으로 SGISwork에 수집되어진 도로명 주소의 수집 현황을 알 수 있습니다</h3>
</div>
<div class="srch-form">
  <div class="row">
    <div class="cols">
      <div class="col col-sm6">
        <div class="col col-sm2 col-txt">
          기간
        </div>
        <div class="col col-sm9">
          <div class="picker-group">
            <div class="picker-item"><span class="inputs datepicker"><input type="text"></span></div>
            <div class="picker-item"><span class="inputs datepicker"><input type="text"></span></div>
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
              도로명 주소 데이터 목록 : <em class="total">1 / 221 페이지 총 2210건</em>
              <div class="tit-utils">
                <div class="btn-group color">
                  <button type="button" class="c1">전체목록</button>
                </div>
                <div class="btn-group line">
                  <button type="button">다운로드</button>
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
                <col style="width:45px;">
                <col style="width:60px;">
                <col>
                <col>
                <col>
                <col>
                <col>
              </colgroup>
              <thead>
              <tr>
                <th><span class="checkbox solo"><input type="checkbox" id="all"><label for="all">&nbsp;</label></span>
                </th>
                <th>번호</th>
                <th>이름</th>
                <th>종류</th>
                <th>종류</th>
                <th>수집일</th>
                <th>최종 수정일</th>
              </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
            <p class="tb-tips">※ 보안관리 대상 시설이 포함되어 있으므로, 외부 공개시 보안시설은 제외하고 사용하시기 바랍니다. [<a href="">더보기</a>]</p>
          </div>
          <div class="pageArea"><span id="searchPage"  class="pages paging"></span></div>
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
