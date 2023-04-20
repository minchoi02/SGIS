<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHead.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/work/collectSnsDb.js"></script>
	
	
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
  <h2>SNS 워드 수집</h2>
  <h3>SNS에서 수집한 워드 데이터를 검색 및 다운로드 할 수 있습니다.</h3>
</div>
<div class="srch-form">
  <div class="row">
    <div class="cols">
      <div class="col col-sm12">
        <div class="in-box">
          <div class="srch-group">
            <span class="inputs"><input type="text" id="searchText" placeholder="검색할 명사를 ','단위로 입력해주세요. ex) 사과,딸기,바나나"></span>
            <button type="button" id="btnSearch" class="btn lager line angular">검색</button>
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
               목록 : <em class="total"></em>
              <!-- 
              <div class="tit-utils">
                <span class="select inline w100">
                  <select name="" id="">
                    <option value="">선택해주세요</option>
                  </select>
                </span>
                <div class="btn-group line">
                 <button type="button">워드클라우드</button><button type="button">다운로드</button> 
                </div>
                <span class="select">
                  <select name="selectViewCount" id="selectViewCount">
                    <option value="10">10개보기</option>
                    <option value="50">50개보기</option>
                    <option value="100">100개보기</option>
                  </select>
                </span>
              </div>
              -->
            </div>
            <table id="dataTbl">
              <colgroup>
                <col style="width:90px;">
                <col style="width:120px;">
                <col style="width:170px;">
                <col style="width:150px;">
                <col>
              </colgroup>
              <thead>
              <tr>
                <th>랭크</th>
                <th>상위(%)</th>
                <th>명사</th>
                <th>빈도수</th>
                <th>연관어</th>
              </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
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
