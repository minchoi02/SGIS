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
  <strong class="home">데이터 관리</strong>
  <h2>전송 정보</h2>
  <h3>SGISwork에 생성된 데이터를 전송,관리 할 수 있습니다</h3>
</div>
<div class="tabs">
  <ul>
    <li><a href="sgisDataMove">DB</a></li>
    <li><a href="sgisHiveDataMove">하이브</a></li>
    <li class="is-active"><a href="sgisServiceDataMove">서비스DB</a></li>
  </ul>
</div>
<div class="srch-form">
  <div class="row">
    <div class="cols">
      <div class="col col-sm1 col-txt">
        <div class="in-box">출처</div>
      </div>
      <div class="col col-sm2">
        <div class="in-box">
          <span class="select">
            <select name="" id="">
              <option value="">전체</option>
            </select>
          </span>
        </div>
      </div>
      <div class="col col-sm1 col-txt">
        <div class="in-box">분류</div>
      </div>
      <div class="col col-sm2">
        <div class="in-box">
          <span class="select">
            <select name="" id="">
              <option value="">전체</option>
            </select>
          </span>
        </div>
      </div>
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
  <div class="row">
    <div class="cols">
      <div class="col col-sm2">
        <div class="in-box">
          <span class="select">
            <select name="" id="">
              <option value="">업무명</option>
            </select>
          </span>
        </div>
      </div>
      <div class="col col-sm10">
        <div class="in-box">
          <div class="srch-group">
            <span class="inputs"><input type="text" placeholder="검색어를 입력해주세요"></span>
            <button type="button" class="btn lager line angular">검색</button>
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
              서비스DB 전송 정보 목록 : <em class="total">1 / 221 페이지 총 2210건</em>
              <div class="tit-utils">
                <div class="btn-group color">
                  <button type="button" class="c1">전체목록</button>
                  <button type="button" class="c3">서비스 DB &#8593;</button>
                  <button type="button" class="c4">서비스 DB &#8595;</button>
                </div>
                <div class="btn-group line">
                  <button type="button">서비스 DB &#8593;</button>
                  <button type="button">서비스 DB &#8595;</button>
                  <button type="button">복사</button>
                  <button type="button">삭제</button>
                  <button type="button">실행</button>
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
                <col style="width:90px;">
                <col>
                <col style="width:120px;">
                <col>
                <col style="width:70px;">
              </colgroup>
              <thead>
              <tr>
                <th><span class="checkbox solo"><input type="checkbox" id="all"><label for="all">&nbsp;</label></span>
                </th>
                <th>번호</th>
                <th>전송 이름</th>
                <th>설명</th>
                <th>업무종류</th>
                <th>저장 종류</th>
                <th>출처</th>
                <th>분류</th>
                <th>날짜</th>
                <th>사용자</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><span class="checkbox solo"><input type="checkbox" id="c1"><label for="c1">&nbsp;</label></span>
                </td>
                <td>9999</td>
                <td class="title left"><a href="">test_0920_20180928154635_전송</a></td>
                <td></td>
                <td></td>
                <td></td>
                <td>서비스 DB 올리기</td>
                <td></td>
                <td>2018-09-28 15:47:10.55473</td>
                <td><a href="">tshong</a></td>
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
              <li><a href="">3</a></li>
              <li><a href="">4</a></li>
              <li><a href="">5</a></li>
              <li><a href="">6</a></li>
              <li><a href="">7</a></li>
              <li><a href="">8</a></li>
              <li><a href="">9</a></li>
              <li><a href="">10</a></li>
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

