<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHeadNew.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/work/gridLog.js"></script>
	<script>
		$(document).ready(
			function() {
				$gridLog.request.doReqgridLogList(0);	
				//$log.srvLogWrite("Z4", "02", "01", "01", "", "");
		});
	</script>	
</head>
<body>
	<jsp:include page="/view/common/includeHeader"></jsp:include>
	
  <div class="container">
    <div class="content_new">
<!-- @@block content -->
<div class="sub-title">
  <strong class="home">격자자료제공 로그 </strong>
  <h2>격자자료제공 생성로그</h2>
  <h3>격자자료제공 생성 로그를 확인할 수 있습니다.</h3>
</div>
<div class="view-container">
  <div class="row">
    <div class="cols">
      <div class="col col-1">
        <div class="in-box">
          <div class="tbs1">
			<div class="tb-tit">
				
				<div class="tit-utils">
					<div class="btn-group color">
						<span class="select">
						<select id="selectType">
						<option value-"none">none</option>
						<option value-"grid">grid</option>
						<option value-"real">real</option>
						<option value-"dong">dong</option>
						</select>
						</span>					
						<button type="button" class="c3">인구</button>
						<button type="button" class="c4">가구</button>
						<button type="button" class="c7">주택</button>
						<button type="button" class="c8">사업체</button>
						<button type="button" class="c5">종사자</button>
						<button type="button" class="c6">다운로드</button>
					</div>
				</div>
			</div>          
            <table id="gridLog">
              <colgroup>
                <col width="80">
                <col width="30%">
                <col>
                <col>
                <col>
                <col>
              </colgroup>
              <thead>
	              <tr>
	                <th>번호</th>
	              	<th>파일명</th>
	              	<th>기준년도</th>
	              	<th>종류</th>
	              	<th>라인수</th>
	                <th>등록일</th>
	              </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
          <div class="pageArea"><span id="searchPage" class="pages paging"></span></div>
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