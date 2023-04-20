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
  <h2>주소 DB 총괄현황</h2>
  <h3>위치정보 생성용 주소 데이터를 관리합니다.</h3>
</div>

<div class="view-container">
  <div class="row">
    <div class="cols">
      <div class="col col-1">
        <div class="in-box">
          <div class="tbs2">
            <div class="tb-tit">
              업무 정보
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
                <th>월 업데이트<br>현황 선택</th>
                <td colspan="3">
                  <div class="rows">
                    <div class="col col-sm3">
                      <span class="inputs datepicker-month"><input type="text"><button type="button"
                                                                                       class="cal"></button></span>
                    </div>
                    <div class="col col-sm1">
                      <button type="button" class="btn lager line angular">검색</button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>업데이트 항목</th>
                <td colspan="3">
                  <ul class="update-item">
                    <li class="type1">
                      <div>도로명 주소 적재(매월 10일)</div>
                    </li>
                    <li class="type1">
                      <div>루신엔진 매핑(매월 12일)</div>
                    </li>
                    <li class="type1">
                      <div>서비스 배포 현황(매월 15일)</div>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th>업데이트 결과</th>
                <td colspan="3">
                  <ul class="update-item">
                    <li class="type2">
                      <div>실행 이력 없음</div>
                    </li>
                    <li class="type3">
                      <div>완료</div>
                    </li>
                    <li class="type3">
                      <div>완료</div>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th>업데이트 내용</th>
                <td colspan="3">
                  <ul class="update-item">
                    <li>
                      <div>-</div>
                    </li>
                    <li>
                      <div>6,148,159 건</div>
                    </li>
                    <li>
                      <div>6,148,159 건</div>
                    </li>
                  </ul>
                </td>
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
      <div class="col">
        <div class="in-box">
          <div class="tits">
            <h4>2019년 업데이트 상세 내용 </h4>
          </div>
          <div class="chars-area">
            <canvas id="chart" width="1180" height="500"></canvas>
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

<!-- @@block  =  chart-->
<script>
  var ctx = document.getElementById('chart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['1월', '1월', '1월', '1월', '1월', '1월', '1월', '1월', '1월', '1월', '1월', '1월'],
      datasets: [{
        label: '업데이트 건수',
        data: [12, 19, 3, 5, 2, 12, 19, 3, 5, 2, 12, 19],
        backgroundColor: 'rgba(0, 43, 255, 0.5)'
      }]
    },
    options: {
      title: {
        display: true,
        text: '도로명 관리 테이블 현황',
        fontSize: 18,
        fontStyle: 'normal'
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontSize: 15,
          padding: 30
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
</script>
<!-- @@close-->