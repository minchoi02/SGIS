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
  <strong class="home">주소DB</strong>
  <h2>주소 DB 관리</h2>
  <h3>주소 데이터베이스를 관리합니다</h3>
</div>
<div class="tabs">
  <ul>
    <li><a href="">조회 및 수정</a></li>
    <li class="is-active"><a href="">유의어 관리</a></li>
    <li><a href="">업데이트 현황</a></li>
  </ul>
</div>
<div class="view-container">
  <div class="row">
    <div class="cols">
      <div class="col col-sm3">
        <div class="in-box line">
          <div class="tbs1">
            <div class="tb-tit">
              조회 조건 설정
            </div>
            <div class="tabs round per4 mt10">
              <ul>
                <li class="is-active"><a href="">행정동</a></li>
                <li><a href="">법정동</a></li>
                <li><a href="">도로명</a></li>
                <li><a href="">건물</a></li>
              </ul>
            </div>
            <div class="mix-form3">
              <label for="">시도</label>
              <span class="select">
                <select name="" id="">
                  <option value="">전체</option>
                </select>
              </span>
            </div>
            <div class="mix-form3">
              <label for="">시군구</label>
              <span class="select">
                <select name="" id="">
                  <option value="">전체</option>
                </select>
              </span>
            </div>
            <div class="mix-form3">
              <label for="">읍면동</label>
              <span class="select">
                <select name="" id="">
                  <option value="">전체</option>
                </select>
              </span>
            </div>
            <div class="mix-form3">
              <label for="">도로명</label>
              <span class="select">
                <select name="" id="">
                  <option value="">전체</option>
                </select>
              </span>
              <label for="">&nbsp;</label>
              <span class="select mt10">
                <select name="" id="">
                  <option value="">선택안함</option>
                </select>
              </span>
            </div>
            <div class="mix-form3">
              <label for="">건물 주번</label>
              <span class="select">
                <select name="" id="">
                  <option value="">전체</option>
                </select>
              </span>
            </div>
            <div class="mix-form3">
              <label for="">건물 부번</label>
              <span class="select">
                <select name="" id="">
                  <option value="">전체</option>
                </select>
              </span>
            </div>
            <div class="srch-group">
              <span class="inputs"><input type="text" placeholder="건물관리번호"></span>
              <button type="button" class="btn lager line angular">검색</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col col-sm9">
        <div class="in-box line">
          <div class="tbs1">
            <div class="tb-tit">
              조회조건 (WHERE) 입력
            </div>
            <div class="script-box">

            </div>
            <div class="btn-right">
              <div class="btn-group line">
                <button type="button" class="c1">▶ 실행</button>
              </div>
            </div>
          </div>
        </div>
        <div class="in-box line">
          <div class="tabs round  mt10">
            <ul>
              <li class="is-active"><a href="">결과</a></li>
              <li><a href="">수정 이력 조회</a></li>
            </ul>
          </div>
          <div class="tbs1">
            <table>
              <colgroup>
                <col style="width:60px;">
                <col style="width:90px;">
                <col style="width:100px;">
                <col>
                <col>
                <col style="width:110px;">
                <col style="width:100px;">
              </colgroup>
              <thead>
              <tr>
                <th>번호</th>
                <th>구분</th>
                <th>컬럼</th>
                <th>기존 값</th>
                <th>변경 값</th>
                <th>변경일자</th>
                <th>사용자</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>38</td>
                <td>시군구</td>
                <td>sgg_syn</td>
                <td>가평군</td>
                <td>가평군 가평</td>
                <td>2016-12-13</td>
                <td>sunrain66</td>
              </tr>
              <tr>
                <td>38</td>
                <td>시군구</td>
                <td>sgg_syn</td>
                <td>성남시수정구 성남시 수정구</td>
                <td>성남시수정구 성남시 수정구 성남수정구</td>
                <td>2016-12-13</td>
                <td>sunrain66</td>
              </tr>
              </tbody>
            </table>
            <table>
              <colgroup>
                <col>
              </colgroup>
              <tbody>
              <tr>
                <td>결과없음</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="paging">
            <span class="first"><a href=""><<</a></span>
            <span class="prev"><a href=""><</a></span>
            <ul>
              <li class="is-active"><a href="">1</a></li>
              <li><a href="">2</a></li>
            </ul>
            <span class="end"><a href="">></a></span>
            <span class="next"><a href="">>></a></span>
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
