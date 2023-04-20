<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 일자리통계분석 > 일자리현황, 일자리증감, 일자리 질, 경제상황, 삶의 질 > 주요지표 설명 팝업
* File Name		: statsAnls/ssaDetailInfoPopup.jsp
* Comment		: 
* History		:
*	2019-05-17	한광희		신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="${pageContext.request.contextPath}/js/workRoad/statsAnls/ssaDetailInfoPopup.js"></script>

<div class="popBox wrmDraggable" id="ssaDetailInfoPopup" style="display: none; width: 500px">
	<div class="topbar wrmHeader">
		<span id="ssaTitle" style="font-size: 12px;">생활환경 종합</span>
		<!-- <a href="javascript:void(0)">닫기</a> -->
	</div>
	<div class="jab-indicator-table">
		<table>
			<caption>정책통계지도 기본정보</caption>
			<colgroup>
				<col width="80px;">
				<col width="auto;">
			</colgroup>
			<tbody>
				<!-- <tr>
					<th>제&nbsp;&nbsp;목 : </th>
					<td id="ssaTitle">고용률 (201712)</td>
				</tr> -->
				<tr>
					<th style="font-size: 11px;">설&nbsp;&nbsp;명  </th>
					<td id="ssaExp" style="text-align: left; font-size: 11px;">만 15세이상 인구중 조사대상 주간에 취업도 실업도 아닌 상태에 있는 사람 - 이들은 주된 활동상태에 따라 구분</td>
				</tr>
				<tr>
					<th style="font-size: 11px;">출&nbsp;&nbsp;처  </th>
					<td id="ssaOrigin" style="text-align: left; font-size: 11px;">통계청 사회통계국 고용통계과(☎ 042-481-2266)</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>