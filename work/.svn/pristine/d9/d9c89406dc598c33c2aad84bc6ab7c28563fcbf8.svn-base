<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHeadNew.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/work/logSts.js"></script>
	
	<!-- mng_s 2019. 06. 04 j.h.Seok -->
	<script>
		$(document).ready(
			function() {
				//$log.srvLogWrite("Z0", "05", "01", "00", "", "");
		});

		$(function() {
		    $(".dialog").dialog({
		      autoOpen: false,
		      width: 'auto',
		      height: 'auto',
		      modal: true,
		      resizable: false,
		      minimizable: false,
		      minimizeIcon: 'ui-icon-minus'
		    });
		    // $(".default-pop-open").button().on("click", function () {
		    //   $("#dialog").dialog("open");
		    // });
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
    <!-- <li><a href="workSts">업무현황</a></li> -->
    <li class="is-active"><a href="logSts">접속현황</a></li>
    <li><a href="analysisSts">분석현황 통계</a></li>
    <li><a href="sysSts">시스템현황</a></li>
    <!-- <li><a href="downloadSts">다운로드 현황</a></li> -->
  </ul>
</div>
<div class="srch-form">
  <div class="row">
    <div class="cols">
      <div class="col col-sm2">
        <div class="in-box">
          <span class="select">
            <select name="term" id="term">
              <option value="days">일간</option>
              <option value="weeks">주간</option>
              <option value="months">월간</option>
            </select>
          </span>
        </div>
      </div>
      <div class="col col-sm2">
        <div class="in-box">
          <span class="select">
            <select name="instSeq" id="instSeq">
            	<option value>전체</option>
            	<option value="36">제주특별자치도</option>
            	<option value="35">경상남도</option>
            	<option value="34">경상북도</option>
            	<option value="33">전라남도</option>
            	<option value="32">전라북도</option>
            	<option value="31">충청북도</option>
            	<option value="30">강원도</option>
            	<option value="29">경기도</option>
            	<option value="28">울산광역시</option>
            	<option value="27">부산광역시</option>
            	<option value="26">서울특별시</option>
            	<option value="25">인천광역시</option>
            	<option value="24">세종특별자치시</option>
            	<option value="23">새만금개발청</option>
            	<option value="22">광주광역시</option>
            	<option value="21">충청남도 논산시</option>
            	<option value="20">충청남도</option>
            	<option value="19">경상북도 하동군</option>
            	<option value="18">경상북도 남해군</option>
            	<option value="17">경상북도 고성군</option>
            	<option value="16">경상북도 의령군</option>
            	<option value="15">경상북도 양산시</option>
            	<option value="14">대구광역시</option>
            	<option value="13">전라북도 순창군</option>
            	<option value="12">충청남도 아산시</option>
            	<option value="11">경기도 용인시</option>
            	<option value="10">경기도 안산시</option>
            	<option value="9">경기도 성남시</option>
            	<option value="8">대전광역시</option>
            	<option value="7">부산광역시 해운대구</option>
            	<option value="6">서울특별시 서대문구</option>
            	<option value="5">서울특별시 은평구</option>
            	<option value="4">통계청</option>
            	<option value="3">보건복지부</option>
            </select>
          </span>
        </div>
      </div>
      <div class="col col-sm8">
        <div class="col col-sm1 col-txt">
          기간
        </div>
        <div class="col col-sm7">
          <div class="picker-group">
            <div class="picker-item"><span class="inputs datepicker"><input type="text" id="startDate"></span></div>
            <div class="picker-item"><span class="inputs datepicker"><input type="text" id="endDate"></span></div>
          </div>
        </div>
        <div class="col col-sm2">
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
          <div class="tits">
            <h4>이용자 접속현황</h4>
          </div>
          <div class="chars-area">
            <div class="chart-total">
              평균 방문건수 : <span id="txtAvg"></span>건 / 누적 방문건수  : <span id="txtDatasum"></span>건
            </div>
            <canvas id="chart" width="1180" height="400"></canvas>
          </div>
          <div class="tbs1 blue">
            <div class="tb-tit">
              <div class="tit-utils">
                <button type="button" id="btn_download" class="btn lager line angular">다운로드</button>
              </div>
            </div>
            <table id="dataTbl">
            </table>
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

