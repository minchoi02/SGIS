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
  <h2>운영현황</h2>
  <h3>SGISwork 시스템의 운영현황을 확인하실 수 있습니다</h3>
</div>
<div class="tabs">
  <ul>
    <li><a href="systemSts">운영현황</a></li>
    <li class="is-active"><a href="workSts">업무현황</a></li>
    <li><a href="logSts">접속현황</a></li>
    <li><a href="analysisSts">분석현황 통계</a></li>
    <li><a href="sysSts">시스템현황</a></li>
    <!-- <li><a href="failSts">실패 작업 현황</a></li> -->
    <!-- <li><a href="downloadSts">다운로드 현황</a></li> -->
  </ul>
</div>
<div class="srch-form">
  <div class="row">
    <div class="cols">
      <div class="col col-sm2">
        <div class="in-box">
                    <span class="select">
                        <select name="" id="">
                            <option value="">일간</option>
                            <option value="">주간월간</option>
                            <option value="">월간</option>
                        </select>
                    </span>
        </div>
      </div>
      <div class="col col-sm2">
        <div class="in-box">
                    <span class="select">
                        <select name="" id="">
                            <option value="">전체기능</option>
                        </select>
                    </span>
        </div>
      </div>
      <div class="col col-sm8">
        <div class="col col-sm1 col-txt">
          기간
        </div>
        <div class="col col-sm6">
          <div class="picker-group">
            <div class="picker-item"><span class="inputs datepicker"><input type="text"></span></div>
            <div class="picker-item"><span class="inputs datepicker"><input type="text"></span></div>
          </div>
        </div>
        <div class="col col-sm2">
          <button type="button" class="btn lager line angular">검색</button>
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
          <div class="tits">
            <h4>상태별 작업 현황</h4>
          </div>
          <div class="status-board2">
            <dl>
              <dt>진행중</dt>
              <dd>0건</dd>
            </dl>
            <dl>
              <dt>완료</dt>
              <dd>0건</dd>
            </dl>
            <dl>
              <dt>실패</dt>
              <dd>0건</dd>
            </dl>
            <dl>
              <dt>총 작업완료</dt>
              <dd>0건</dd>
            </dl>
            <dl>
              <dt>총 다운로드</dt>
              <dd>0건</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="cols">
      <div class="col col-1">
        <div class="in-box">
          <div class="tits">
            <h4>업무별 작업 현황</h4>
          </div>
          <div>
            그래프?
          </div>
          <div class="tbs1 blue">
            <table>
              <colgroup>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
              </colgroup>
              <thead>
              <tr>
                <th>업무명</th>
                <th>1월</th>
                <th>2월</th>
                <th>3월</th>
                <th>4월</th>
                <th>5월</th>
                <th>6월</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="paging">
                  <span class="first"><a href="">
                      <<</a> </span> <span class="prev"><a href="">
                          <</a> </span>
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
