<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 오늘의 구인 현황 > 서브 화면 	
* File Name		: todaySataus > tsSub.jsp
* Comment		: 
* History		: 2018-09-12	ywKim	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="${pageContext.request.contextPath}/js/workRoad/todayStatus/tsSub.js"></script>

<div class="popBox job-offer-status wrmDraggable" id="tsSub">
	<div class="topbar wrmHeader"><span>오늘의 구인 현황</span>
		<a href="javascript:void(0)">닫기</a>
	</div>
	<div class="cont-box">
		<article>
			<div class="job-select">
				<span class="select-wrap">
					<select id="current-sido-select-sub" data-type="current">
						<option>전국</option>
					</select>
				</span>
				<span class="select-wrap">
					<select  id="current-sgg-select-sub">
						<option value="999" data-coor-x="" data-coor-y="" data-adm_cd="999">전체</option>
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
						<col style="width:20%">
						<col style="width:40%">
						<col style="width:40%">
					</colgroup>
<!-- 
					<thead>
						<tr>
							<th scope="col"></th>
							<th scope="col">업체수</th>
							<th scope="col">구인수</th>
						</tr>
					</thead>
-->
					<tbody>
					
					</tbody>
				</table>
			</div>
		</article>
		<article>			
			<div class="iaChartBoxMain">
 				<div class="charts" style="position: static;" id="iaChartBoxSub">
 				</div>
			</div>			
            <!-- mng_s 2019-03-20 이금은 -->
			<ul class="date-list" style="display: none;">
				<li style="width: 158px;"><a href="#" onclick="" class="" title="" data-val="D">1일</a></li>
				<li style="width: 158px;"><a href="#" onclick="" class="" title="" data-val="W">1주</a></li>
				<li style="width: 157px; margin-right: 0px;"><a href="#" onclick="" class="" title="" data-val="M">1달</a></li>
				<li style="display: none;"><a href="#" onclick="" class="" title="" data-val="Q">3달</a></li>
				<li style="display: none;"><a href="#" onclick="" class="" title="" data-val="H">6달</a></li>
			</ul>
            <!-- mng_e 2019-03-20 이금은 -->
		</article>
	</div>
</div>