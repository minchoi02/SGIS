<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 오늘의 구인 현황 > 메인 화면
* File Name		: todaySataus > tsMain.jsp
* Comment		: 
* History		: 2018-09-12	ywKim	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="${pageContext.request.contextPath}/js/workRoad/todayStatus/tsMain.js"></script>

<div class="popBox ts-list job-offer-status wrmDraggable" id="tsMain">
	<a href="javascript:void(0)" class="sideQuick sq03 xw wrmToggleBtn">
		<span>오늘의 구인 현황</span>
	</a>
	<div class="topbar wrmHeader">
		<span class="wrmHeader"></span>
		<div class="stats-area wrmHeader">
    		<span>통계표출</span>
    		<a href="javascript:void(0);" class="stats-toggle-btn">off</a>
    	</div>
		<a href="javascript:void(0)" data-active="false">닫기</a>
	</div>
	<div class="wrm-scroll-box wrmScrollable" style="width:100%;height: 100%;">
		<div class="cont-box">	<!-- 2019.07.03[한광희] 오늘의 구인현황 스크롤 class(wrmScrollable) 삭제 처리  -->
			<article>
				<!-- <h3>해당분류 세부항목 선택하기</h3> -->
				<div class="job-select">
					<span class="select-wrap">
						<select id="current-sido-select" data-type="current">
							<option>전국</option>
						</select>
					</span>
					<span class="select-wrap">
						<select  id="current-sgg-select">
							<option value="999" data-coor-x="" data-coor-y="" data-adm_cd="99">전체</option>
						</select>
					</span>
				</div>
				<h3 id="tsTitle"> 워크넷 & 인크루트를 통해 본 오늘의 전국 구인 현황</h3>
				<div class="job-offer view">
					<div class="citation">
						<span id="tsToday">[ 2018.07.04 ]</span>
					</div>
					<table id="tsTable">
						<caption></caption>
						<colgroup>
							<col style="width:24%">
							<col style="width:38%">
							<col style="width:38%">
						</colgroup>
						<!-- <thead>
							<tr>
								<th scope="col">전체 구인</th>
								<th scope="col">업체수</th>
								<th scope="col">구인수</th>
								
								<th scope="col">89,001개 업체 <span class="job-arrow top"></span></th>
								<th scope="col">130,000명 <span class="job-arrow top"></span></th>
								
							</tr>
						</thead> -->
						<tbody>
							<!--
							<tr>
								<td><span class="icon plus"></span>구인 신규 등록 </td>
								<td>3,263개 업체<span class="job-arrow bottom"></span> </td>
								<td>2,001개 업체<span class="job-arrow bottom"></span> </td>
							</tr>
							<tr>
								<td><span class="icon mius"></span>구인 종료 마감 </td>
								<td>2,300명 <span class="job-arrow bottom"></span></td>
								<td>2,123명 <span class="job-arrow bottom"></span> </td>
							</tr>
							-->
						</tbody>
					</table>
				</div>
				<div class="job-offer-graph" style="margin-bottom: 10px;">
					<!-- 2019-01-18 오늘의 구인 현황 메인차트 수정. 전체 신규 차트 분리 라디오 제어. -->
					<!-- 통합 -->
	 				<!-- <div class="charts" style="position: static;" id="iaChartBoxMain">
	 				</div> -->
	 				<!-- 전체 -->
	 				<div class="charts" style="position: static;" id="iaChartBoxMain1">
	 				</div>
	 				<!-- 신규 -->
	 				<div class="charts" style="position: static;" id="iaChartBoxMain2">
	 				</div>
				</div>
	        <!-- mng_s 2019-03-20 이금은 hidden처리 -->
				<!-- 2019-01-18 오늘의 구인 현황 메인차트 수정. 전체 신규 차트 분리 라디오 제어.  -->
				<div class="stepBox mainChart_stepBox" style="padding: 0px;" style="display: none;">					
	                <!-- <p class="on">전체 신규 선택</p> -->
					<ul class="dbTypeCk mt20" style="display: none;">						
						<li style="border: 0;">
							<input type="radio" id="charts_type01" name="charts_type" value="1" checked="checked" /> 
							<label for="charts_type01" class="mr20 on">전체</label> 
							<input type="radio" id="charts_type02" name="charts_type" value="2" /> 
							<label for="charts_type02">신규</label>
						</li>
					</ul>
				</div>
				<ul class="date-list" style="display: none;">
	                <!-- 2019-01-08 그래프 아래 범례 글자 짤림 -->
					<li style="width: calc(33.33% - 4px); margin-right: 6px;"><a href="#" onclick="" class="" title="" data-val="D">1일</a></li>
					<li style="width: calc(33.33% - 4px); margin-right: 6px;"><a href="#" onclick="" class="" title="" data-val="W">1주</a></li>
					<li style="width: calc(33.33% - 4px); margin-right: 0px;"><a href="#" onclick="" class="" title="" data-val="M">1달</a></li>
					<li style="display: none;"><a href="#" onclick="" class="" title="" data-val="Q">3달</a></li>
					<li style="display: none;"><a href="#" onclick="" class="" title="" data-val="H">6달</a></li>
				</ul>
	        <!-- mng_e 2019-03-20 이금은 hidden처리 -->
	
				
				<!-- <button id="tsMainMapView">지도보기</button>
				<button id="tsCloseMain">Click! 닫기</button> -->
			</article>
			
	        <!-- mng 2019-07-27 이금은 ::: 안내문구추가 -->
			<div id="imsi_pop" style="margin: 5px 20px; font-size: 14px; text-align: center; color: red;"><b>※ '20.7.23.(목) 일자로 '사람인' 구인정보가 추가되었습니다.</b></div>
			
		</div>
	</div>
</div>