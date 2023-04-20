<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %> 
<!DOCTYPE html>
<html lang="ko">
<head>
<title>오늘의 구인현황</title>
<meta name="title" content="오늘의 구인현황">
<style type="text/css">
   #todayStatusDetailSidoCd option {
      color: #000000;
   }
   #todayStatusDetailSggCd option {
      color: #000000;
   }
</style>
<!-- 하단 리스트 Swiper -->
<link rel="stylesheet" href="${ctx }/resources/m2019/plugins/swiper.css" />
<script src="${ctx }/resources/m2019/plugins/swiper.min.js" type="text/javascript"></script>
<!-- 하단 리스트 위 아래 Swipe 이벤트 -->
<script src="${ctx }/resources/m2019/plugins/jquery.touchSwipe.min.js" type="text/javascript"></script>
<script src="${ctx }/resources/m2019/js/workroad/todayStatusMap.js"></script>
<script>
    srvLogWrite('M0','10','01','00','',''); // 오늘의 구인현황 메인
</script>
</head>
<body>
    <div class="contentBox">
      <div class="MapArea">
      	<div class="Map">
      		<div id="map"></div>
      	</div>
        <div class="areaSelect">
          <select id="todayStatusSido" >
            <option value="99" data-coor-x="990480.875" data-coor-y="1815839.375">전국</option>
          </select>
          <select id="todayStatusSgg" style="background-image: url('${ctx }/resources/m2019/images/icon_down_bl.png'); background-position: right 10px center; padding: 5px 10px;">
          </select>
        </div>
        <!-- 지역 업체/명 상세 팝업 START -->
        <div class="alertBox" id="alertBox" style="display: none;">
        	<button class="btn_closeAl" id="todayStatusAlertBoxClose" type="button">닫기</button>
        	<div class="abArea">
        		<span id="todayStatusAreaTitle">경기도</span>
        	</div>
            <div class="abCompany">
            	<span id="todayStatusAreaData">000업체/000명</span>
            </div>
            <button id="todayStatusAlertBoxJobDetail" class="btn_albtn" type="button">일자리보기</button>
        </div>
        <!-- 지역 업체/명 상세 팝업 END -->
        <div id="detailStatusBtnDev">
	        <button class="btn_statsGraph" type="button" id="detailStatusBtn">상세현황보기</button>
        </div>
        <div class="mapIndex"></div>
      </div>
    </div>
    
    <!-- 오늘의 구인현황 상세 -->
    <div id="todayStatusDetailPopup" style="position: absolute; right: 0; top: 0; height: 100%; width: 100%; overflow: auto; z-index: 1800; display: none;">
	 <div class="Header">
	    <header id="headerArea">
	      <div class="gnb">
	        <button class="btn_coloseInfo" type="button" id="todayStatusDetailCloseBtn">닫기</button>
	        <h2>오늘의 구인현황</h2>
	      </div>
	    </header>
	  </div>
	  <!-- 2019-09-10 [김남민] 모바일 > 오늘의 구인현황 > 배경 하얀색 fix START -->
	  <div class="Content" style="background-color: #ffffff;">
	    <div class="contentBox" style="background-color: #ffffff;">
	    <!-- 2019-09-10 [김남민] 모바일 > 오늘의 구인현황 > 배경 하얀색 fix END -->
	      <div class="todayGraphArea">
	        <div class="filterWrap">
	          <ul>
	            <li style="background:url(${ctx }/resources/m2019/images/line2.png) no-repeat right center;">
	              <select id="todayStatusDetailSidoCd" style="border-right:1px solid #5190cc; ">
	                <option value="99" data-coor-x="990480.875" data-coor-y="1815839.375">전국</option>
	              </select>
	            </li>
	            <li>
	              <select id="todayStatusDetailSggCd"></select>
	            </li>
	          </ul>
	        </div>
	        <div id="todayStatusChart"></div>
	        <div class="todayChart">
	          <table width="100%" border="0">
	            <colgroup>
	            <col class="td1">
	            <col class="td2">
	            <col class="td3">
	            <col class="td4">
	            <col class="td5">
	            <col class="td6">
	            <col class="td7">
	            </colgroup>
	            <tr>
	              <td class="td1">전체구인</td>
	              <td class="td2" id="all_corp_cnt">-</td>
	              <td class="td3" id="all_corp_cnt_c_rate_img"></td>
	              <td class="td4" id="all_corp_cnt_c_rate">-</td>
	              <td class="td2" id="all_rcrit_psn_cnt">-</td>
	              <td class="td3" id="all_rcrit_psn_cnt_c_rate_img"></td>
	              <td class="td4" id="all_rcrit_psn_cnt_c_rate">-</td>
	            </tr>
	            <tr>
	              <td class="td1">신규등록</td>
	              <td class="td2" id="new_corp_cnt">-</td>
	              <td class="td3" id="new_corp_cnt_c_rate_img"></td>
	              <td class="td4" id="new_corp_cnt_c_rate">-</td>
	              <td class="td2" id="new_rcrit_psn_cnt">-</td>
	              <td class="td3" id="new_rcrit_psn_cnt_c_rate_img"></td>
	              <td class="td4" id="new_rcrit_psn_cnt_c_rate">-</td>
	            </tr>
	            <tr>
	              <td class="td1">종료마감</td>
	              <td class="td2" id="clos_corp_cnt">-</td>
	              <td class="td3" id="clos_corp_cnt_c_rate_img"></td>
	              <td class="td4" id="clos_corp_cnt_c_rate">-</td>
	              <td class="td2" id="clos_rcrit_psn_cnt">-</td>
	              <td class="td3" id="clos_rcrit_psn_cnt_c_rate_img"></td>
	              <td class="td4" id="clos_rcrit_psn_cnt_c_rate">-</td>
	            </tr>
	          </table>
	        </div>
	        <div class="dataInfo"> (자료출처: 워크넷 & 인크루트 & 사람인)&nbsp;&nbsp;&nbsp; <span class="td_up">▲전일대비증가</span> <span class="td_down">▼전일대비감소</span> </div> <!-- 2020-05-08 [곽제욱] 사람인 추가 -->
	      </div>
	      <!-- 요일별 구인현황 영역 START -->
	      <div class="weekGraphTitle">요일별 전체구인현황 <span id="today">(5월 15일기준.10일단위)</span></div>
	      <div id="weekStatusChart"></div>
	      <div class="jobResult">
	        <ul>
	          <li class="company">
	            <div class="title">전체 구인업체수</div>
	            <div class="result" id="week_all_corp_cnt">000</div>
	          </li>
	          <li class="jobSeeker">
	            <div class="title">전체 구인자수(명)</div>
	            <div class="result" id="week_all_rcrit_psn_cnt">000</div>
	          </li>
	        </ul>
	      </div>
	      <!-- 요일별 구인현황 영역 END -->
	    </div>
	  </div>
    </div>
    
    <!--2019-09-17 [김남민] (12) 오늘의 전체 일지리현황 팝업 수정. START -->
    <!--오늘의 전체 일자리현황 팝업. START -->
	<div id="myNeighberhoodJobTodayStatusPopup" class="popWrap" style="left: calc(50% - 150px); top: 100px; width: 300px; display: none;">
		<div class="i_pop tjop"></div>
		<div class="popBox" style="padding-bottom: 10px;">
			<div class="popHeader">
				<!-- 2019.09.30[한광희] 팝업 닫기 문구 추가 START -->
				<div id="myNeighberhoodJobTodayStatusPopup_close">
					<span>닫기</span>
					<button class="btn_popClose" type="button" style="padding-top: 1px;">닫기</button>
				</div>
				<!-- 2019.09.30[한광희] 팝업 닫기 문구 추가 END -->
			</div>
			<div class="popContentBox">
				<!-- 2019-12-26 [김남민] 모바일 > 일자리 맵 > 모바일 홈페이지 [오늘 하루 다시 보지 않기] 추가 START -->
				<div>
					<p class="tjTitle" style="text-align: right; padding-right: 15px; padding-top: 20px;">
						<input type="checkbox" id="myNeighberhoodJobTodayStatusPopup_check" style="margin: 0;">
    					<label for="myNeighberhoodJobTodayStatusPopup_check">오늘 하루 다시 보지 않기</label>
					</p>
				</div>
				<div class="popTitle" style="padding: 10px 0 0 0;">오늘의 <span id="myNeighberhoodJobTodayStatusPopup_adm_nm">전체</span> 일자리현황</div>
				<!-- 2019-12-26 [김남민] 모바일 > 일자리 맵 > 모바일 홈페이지 [오늘 하루 다시 보지 않기] 추가 END -->
				<div class="popContent">
					<p class="tjTitle" style="text-align: right; padding-right: 15px;">자료출처 : 워크넷&인쿠르트&사람인</p> <!-- 2020-05-08 [곽제욱] 사람인 추가 -->
					<p class="tjTitle" style="text-align: right; padding-right: 15px;" id="myNeighberhoodJobTodayStatusPopup_reg_dt">(0월 00일 기준)</p>
					<!-- <p class="tjTitle" style="text-align: right; padding-right: 15px;">자료출처 : 워크넷&인쿠르트 (0월 00일 기준)</p> -->
					<ul class="todayJobWrap" style="margin-top: 0px;">
						<li class="tjCom">
							<p class="tjTitle">구인업체</p>
							<p name="all_corp_cnt" class="tjTotalNum comColor">-</p>
							<p class="tjChange">
								<span name="all_corp_cnt_c_rate">- 0%</span> 전일대비
							</p>
							<p class="tjNum">
								신규 <span name="new_corp_cnt" class="comColor">-</span>
							</p>
							<p class="tjNum">
								마감 <span name="clos_corp_cnt" class="comColor">-</span>
							</p>
						</li>
						<li class="tjJobseeker">
							<p class="tjTitle">구인자수</p>
							<p name="all_rcrit_psn_cnt" class="tjTotalNum jobColor">-</p>
							<p class="tjChange">
								<span name="all_rcrit_psn_cnt_c_rate">- 0%</span> 
							</p>
							<p class="tjNum">
								신규 <span name="new_rcrit_psn_cnt" class="jobColor">-</span>
							</p>
							<p class="tjNum">
								마감 <span name="clos_rcrit_psn_cnt" class="jobColor">-</span>
							</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="PopFooter" style="display: none;">
				<button id="myNeighberhoodJobTodayStatusPopup_ok" class="btn_popSubmit" type="button">상세현황보기</button>
			</div>
		</div>
	</div>
	<!-- 오늘의 전체 일자리현황 팝업. END -->
	<!--2019-09-17 [김남민] (12) 오늘의 전체 일지리현황 팝업 수정. END -->
	
</body>
</html>
