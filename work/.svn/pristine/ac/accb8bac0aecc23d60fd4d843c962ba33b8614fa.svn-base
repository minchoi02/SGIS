<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHeadNew.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script src="${pageContext.request.contextPath}/js/work/systemSts.js"></script>
	
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
		    <li class="is-active"><a href="systemSts">운영현황</a></li>
		    <!-- <li><a href="workSts">업무현황</a></li> -->
		    <li><a href="logSts">접속현황</a></li>
		    <li><a href="analysisSts">분석현황 통계</a></li>
		    <li><a href="sysSts">시스템현황</a></li>
		    <!-- <li><a href="failSts">실패 작업 현황</a></li> -->
		    <!-- <li><a href="downloadSts">다운로드 현황</a></li> -->
        </ul>
      </div>
      <div class="row">
        <div class="cols">
          <div class="col col-1">
            <div class="status-board">
              <dl>
                <dt><a href="${pageContext.request.contextPath}/view/sysmgt/qnaLst" class="more">Q&A</a></dt>  
                <dd id="qna_cnt">0건</dd>
              </dl>
              <dl>
                <dt>전송승인 신청</dt>
                <dd id="down_cnt">0건</dd>
              </dl>
              <dl>
                <dt><a href="${pageContext.request.contextPath}/view/sysmgt/userMng" class="more">가입신청</a></dt>
                <dd id="join_cnt">0건</dd>
              </dl>
              <!-- 
              <dl>
                <dt>주소DB 업데이트</dt>
                <dd id="dat_cnt"></dd>
              </dl>
              -->
              <dl>
              	<!-- 
                <dt>DAUM API</dt>
                <dd>
                  <label class="switch">
                    <input type="checkbox" class="switch-input" checked/>
                    <span class="switch-label" data-on="ON" data-off="OFF"></span>
                    <span class="switch-handle"></span>
                  </label>
                </dd>
                 -->
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="cols">
          <div class="col col-2">
            <div class="in-box">
              <div class="tbs1">
                <div class="tb-tit">
                  일자리 수집 현황
                  <a href="${pageContext.request.contextPath}/view/collectData/collectJobDb" class="more">+ 더보기</a>
                </div>
                <table id="collect_sts_tbl">
                  <colgroup>
                    <col style="width:180px;">
                    <col>
                    <col>
                    <col style="width:180px;">
                  </colgroup>
                  <thead>
                    <tr>
                      <th>수집일</th>
                      <th>워크넷 수집</th>
                      <th>인크루트 수집</th>
                      <th>서비스 반영</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col col-2">
            <div class="in-box">
              <div class="tbs1">
                <div class="tb-tit">
                  전송 승인요청
                  <a href="${pageContext.request.contextPath}/view/sysmgt/aprovMove" class="more">+ 더보기</a>
                </div>
                <table id="approve_tbl">
                  <colgroup>
                    <col style="width:100px;">
                    <col>
                    <col style="width:90px;">
                    <col style="width:90px;">
                  </colgroup>
                  <thead>
                    <tr>
                      <th>신청자</th>
                      <th>신청일</th>
                      <th>구분</th>
                      <th>승인</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>           
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="cols">
          <div class="col col-3">
            <div class="in-box">
              <div class="tbs1 blue">
                <div class="tb-tit">
                  공지사항
                  <a href="${pageContext.request.contextPath}/view/sysmgt/noticeLst" class="more">+ 더보기</a>
                </div>
                <table id="notice_tbl">
                  <colgroup>
                    <col>
                    <col style="width:110px;">
                  </colgroup>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col col-3">
            <div class="in-box">
              <div class="tbs1 blue">
                <div class="tb-tit">
                  Q&A
                  <a href="${pageContext.request.contextPath}/view/sysmgt/qnaLst" class="more">+ 더보기</a>
                </div>
                <table id="qna_tbl">
                  <colgroup>
                    <col>
                    <col style="width:110px;">
                  </colgroup>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col col-3">
            <div class="in-box">
              <div class="tbs1 blue">
                <div class="tb-tit">
                  공유게시판
                  <a href="${pageContext.request.contextPath}/view/sysmgt/shareLst" class="more">+ 더보기</a>
                </div>
                <table id="popup_tbl">
                  <colgroup>
                    <col>
                    <col style="width:110px;">
                  </colgroup>
                  <tbody>
                  </tbody>
                </table>
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
