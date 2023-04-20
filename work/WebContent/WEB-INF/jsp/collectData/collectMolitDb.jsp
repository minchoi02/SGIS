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
	<script src="${pageContext.request.contextPath}/js/work/collectMolitDb.js"></script>
	
	<!-- mng_s 2019. 06. 04 j.h.Seok -->
	<script>
		$(document).ready(
			function() {
				$collectMolitDb.ui.code = '${code}';
				$collectMolitDb.request.doReqCollectMolitDbList(0);	
				$log.srvLogWrite("Z4", "02", "01", "01", "", "");
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
  <h2>국통 데이터 수집 현황</h2>
  <h3>정기적으로 SGISwork에 수집되어진 도로명 주소의 수집 현황을 알 수 있습니다</h3>
</div>
<div class="tabs">
  <ul>
    <li<c:if test="${code eq ''}"> class="is-active"</c:if>><a href="?">전체</a></li>
    <li<c:if test="${code eq 'APMM_NV_JIGA_MNG'}"> class="is-active"</c:if>><a href="?code=APMM_NV_JIGA_MNG">개별공시지가</a></li>
    <li<c:if test="${code eq 'APMM_HP_PRC_MNG'}"> class="is-active"</c:if>><a href="?code=APMM_HP_PRC_MNG">개별주택가격 정보</a></li>
    <li<c:if test="${code eq 'CO_AP_PRC'}"> class="is-active"</c:if>><a href="?code=CO_AP_PRC">공동주택가격 정보</a></li>
    <li<c:if test="${code eq 'APMM_NV_LAND'}"> class="is-active"</c:if>><a href="?code=APMM_NV_LAND">공시지가 토지특성</a></li>
     <!-- <li<c:if test="${code eq 'Z_KLIS_LP_PA'}"> class="is-active"</c:if>><a href="?code=Z_KLIS_LP_PA">연속지적도</a></li>  -->
    <li<c:if test="${code eq 'Z_KLIS_LP_AA'}"> class="is-active"</c:if>><a href="?code=Z_KLIS_LP_AA">법정경계도</a></li>
    <!-- <li<c:if test="${code eq 'Z_NPOI_NPOI'}"> class="is-active"</c:if>><a href="?code=Z_NPOI_NPOI">국가관심지점정보</a></li>  -->
    <li<c:if test="${code eq 'F_FAC_BUILDING'}"> class="is-active"</c:if>><a href="?code=F_FAC_BUILDING">건물통합도면</a></li>
    <li<c:if test="${code eq 'Z_NGII'}"> class="is-active"</c:if>><a href="?code=Z_NGII">수치지형도</a></li>
    <!-- <li<c:if test="${code eq 'Z_UPIS'}"> class="is-active"</c:if>><a href="?code=Z_UPIS">도시계획정보</a></li>  -->
    <!-- <li<c:if test="${code eq 'Z_EGIS'}"> class="is-active"</c:if>><a href="?code=Z_EGIS">환경지리정보</a></li>  -->
    <!-- <li<c:if test="${code eq 'Z_SMSS_SAFE'}"> class="is-active"</c:if>><a href="?code=Z_SMSS_SAFE">아동지킴이집</a></li>  -->
  </ul>
</div>
<div class="srch-form">
  <div class="row">
		<div class="cols">
			<div class="col col-sm11">
				<div class="in-box">
					<span class="inputs"><input type="text" name="searchText" id="searchText" placeholder="검색어를 입력해주세요"></span>
				</div>
			</div>
			<div class="col col-sm1">
				<div class="in-box">
					<button type="button" id="btnSearch" class="btn lager line angular">검색</button>
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
              데이터 목록 : <em class="total"></em>
	             <div class="tit-utils">
					<div class="btn-group line">
						<button type="button" id="deleteBtn">삭제</button>
					</div>
				</div>
            </div>
            <table id="collectMolitDb">
              <colgroup>
                <col width="80">
                <col width="80">
                <col width="300">
                <col>
                <col>
                <col>
                <col>
                <col>
              </colgroup>
              <thead>
              <tr>
              	<th></th>
                <th>번호</th>
                <th>데이터명</th>
                <th>출처</th>
                <th>분류</th>
                <th>수집주기</th>
                <th>크기</th>
                <th>최종 수정일</th>
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
