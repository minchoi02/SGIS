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
  <h2>파일 상세보기</h2>
  <h3>정기적으로 SGISwork에 수집되어진 도로명 주소의 수집 현황을 알 수 있습니다</h3>
</div>
<div class="view-container">
  <div class="row">
    <div class="cols">
      <div class="col col-1">
        <div class="in-box">
          <div class="tbs2">
            <div class="tb-tit">
              파일 정보
              <div class="tit-utils">
                <div class="btn-group line">
                  <button type="button">저장</button>
                  <button type="button">목록</button>
                </div>
              </div>
            </div>
            <table>
              <colgroup>
                <col style="width:10%">
                <col style="width:40%">
                <col style="width:10%">
                <col style="width:40%">
              </colgroup>
              <tbody>
              <tr>
                <th>파일 이름</th>
                <td colspan="3">
                  <span class="inputs"><input type="text" value=""></span>
                </td>
              </tr>
              <tr>
                <th>설명</th>
                <td>
                  <span class="inputs"><input type="text" value=""></span>
                </td>
                <th>태그</th>
                <td>
                  <span class="inputs"><input type="text" value=""></span>
                </td>
              </tr>
              <tr>
                <th>출처</th>
                <td>
                  <span class="select">
                    <select name="" id="">
                      <option value="">기타</option>
                    </select>
                  </span>
                </td>
                <th>분류</th>
                <td>
                  <span class="select">
                    <select name="" id="">
                      <option value="">기타</option>
                    </select>
                  </span>
                </td>
              </tr>
              <tr>
                <th>저장폴더</th>
                <td>
                  <span class="select">
                    <select name="" id="">
                      <option value="">선택해주세요</option>
                    </select>
                  </span>
                </td>
                <th>파일 크기</th>
                <td>
                  <span class="inputs"><input type="text" value="" disabled></span>
                </td>
              </tr>
              <tr>
                <th>사용자</th>
                <td>
                  <span class="inputs"><input type="text" value="" disabled></span>
                </td>
                <th></th>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="cols">
      <div class="col col-sm12">
        <div class="in-box line">
          <div class="tbs1">
            <div class="tb-tit">
              파일내용
              <button type="button" class="big-view"></button>
            </div>
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
