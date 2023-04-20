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
    <li><a href="">운영현황</a></li>
    <!-- <li><a href="">업무현황</a></li> -->
    <li><a href="">접속현황</a></li>
    <!-- <li class="is-active"><a href="">기관 접속현황</a></li> -->
    <li><a href="">시스템현황</a></li>
    <li><a href="">실패 작업 현황</a></li>
    <li><a href="">파일에이전트</a></li>
    <li><a href="">다운로드 현황</a></li>
    <li><a href="">분석현황 통계</a></li>
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
              <option value="">주간</option>
              <option value="">월간</option>
            </select>
          </span>
        </div>
      </div>
      <div class="col col-sm2">
        <div class="in-box">
          <span class="select">
            <select name="" id="">
              <option value="">전체</option>
              <option value="">사용자</option>
              <option value="">데이터 관리자</option>
              <option value="">시스템 운영자</option>
            </select>
          </span>
        </div>
      </div>
      <div class="col col-sm2">
        <div class="in-box">
          <span class="select">
            <select name="" id="">
              <option value="">전체</option>
              <option value="">강원도</option>
              <option value="">경기도</option>
              <option value="">경기도 성남시</option>
              <option value="">경기도 안산시</option>
              <option value="">경기도 용인시</option>
              <option value="">경상남</option>
            </select>
          </span>
        </div>
      </div>
      <div class="col col-sm6">
        <div class="col col-sm1 col-txt">
          기간
        </div>
        <div class="col col-sm7">
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
            <h4>이용자 접속현황</h4>
          </div>
          <div class="chars-area">
            <canvas id="chart" width="1180" height="400"></canvas>
          </div>
          <div class="tbs1 blue">
            <div class="tb-tit">
              <div class="tit-utils">
                <button type="button" class="btn lager line angular">다운로드</button>
              </div>
            </div>
            <table>
              <colgroup>
                <col style="width:70px;">
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
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
                <th class="sm">&nbsp;</th>
                <th class="sm">06월</th>
                <th class="sm">07월</th>
                <th class="sm">08월</th>
                <th class="sm">09월</th>
                <th class="sm">10월</th>
                <th class="sm">11월</th>
                <th class="sm">12월</th>
                <th class="sm">13월</th>
                <th class="sm">14월</th>
                <th class="sm">15월</th>
                <th class="sm">16월</th>
                <th class="sm">17월</th>
                <th class="sm">18월</th>
                <th class="sm">19월</th>
                <th class="sm">20월</th>
                <th class="sm">21월</th>
                <th class="sm">22월</th>
                <th class="sm">23월</th>
                <th class="sm">24월</th>
                <th class="sm">25월</th>
                <th class="sm">26월</th>
                <th class="sm">27월</th>
                <th class="sm">28월</th>
                <th class="sm">29월</th>
                <th class="sm">30월</th>
                <th class="sm">01월</th>
                <th class="sm">02월</th>
                <th class="sm">03월</th>
                <th class="sm">04월</th>
                <th class="sm">05월</th>
                <th class="sm">06월</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>강원도</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
              </tr>
              <tr>
                <td>통계청</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
              </tr>
              <tr>
                <td>총계</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
                <td>9</td>
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

<!-- @@block  =  chart-->
<script>
  var ctx = document.getElementById('chart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['06일', '07일', '08일', '09일', '10일', '11일', '12일', '13일', '14일', '15일', '16일', '17일', '18일',
        '19일', '20일', '21일', '22일', '23일', '24일', '25일', '26일', '27일', '28일', '29일', '30일', '01일', '02일',
        '03일', '04일', '05일', '06일'],
      datasets: [{
        label: '강원도',
        data: [12, 19, 3, 5, 2, 12, 19, 3, 5, 2, 12, 19, 3, 5, 2, 12, 19, 3, 5, 2, 12, 19, 3, 5, 2, 12, 19, 3, 5, 2, 1],
        backgroundColor: 'rgba(0, 43, 255, 0.5)',
        stack: 'Stack 0'
      },
        {
          label: '통계청',
          data: [1, 19, 3, 5, 2, 12, 19, 3, 5, 2, 12, 19, 3, 5, 2, 12, 19, 3, 5, 2, 12, 19, 3, 5, 2, 12, 19, 3, 5, 2, 1],
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
          stack: 'Stack 0'
        }]
    },
    options: {
      responsive: true,

      title: {
        display: true,
        text: '2019-06-06 ~ 2019-07-06',
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
        tooltips: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }],
        yAxes: [{
          stacked: true
        }]
      }
    }
  });
</script>
<!-- @@close-->