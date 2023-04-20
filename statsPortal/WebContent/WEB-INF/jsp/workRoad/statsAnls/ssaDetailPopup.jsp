<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 일자리 통계분석 > 일자리 현황 > 주요지표
* File Name		: statsAnls > ssaDetailPopup.jsp
* Comment		: 
* History		: 2018-10-25	손원웅
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="${pageContext.request.contextPath}/js/workRoad/statsAnls/ssaDetailPopup.js"></script>

<!-- 조회 조건 팝업 -->
<div class="popBox wrmDraggable" id="ssaDetailPopup">
<!--    	<a href="javascript:void(0)" class="sideQuick sq03 xw">
   		<span>선택항목</span>
   	</a> -->
<!--    	<div class="popBox" id="ssaSqlListBox"> -->
   	<div class="topbar"><span>상세 조회</span><a href="javascript:void(0)">닫기</a></div>
	<div class="cont-box">
		<article>
			<div class="data-left">
				<div class="jab-indicator-table" id="detail_popup">
					<table border="1">
						<colgroup>
							<col width="100%">
						</colgroup>
						<tbody>
							<tr>
								<td>
									<dl> <dt>현재월에 데이터 없습니다.</dt>
										<dd>0</dd> <span class="job-arrow top"></span>
									</dl><br>
									<dl> <dt>데이터가 없습니다.</dt>
									</dl>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="data-right">
			<div class="iaChartBoxMain" id="ssaDetailChart"></div>
			</div>
		</article>
	</div>
</div>

<%-- <div class="wrmDraggable" id="ssaDetailPopup">
	<div class="sqListBox sq03">
		<div class="sqTabs wrmHeader" style="width: calc(100% - 10px);">
			<span style="left:5px">일자리 현황 > 상세지표 ></span>
			<a href="javascript:void(0)" class="stepClose2"></a>  
   		</div>
			<div class="normalBox">
				<div class="indicator-area">
					<div class="indicator">
						<div class="data-left">
							<div class="jab-indicator-table" id="I3111" onclick="javascript:$ssaJobStatus.ui.ChangeColor('I3111');">
								<table border="1">
									<colgroup>
										<col width="100%">
									</colgroup>
									<tbody>
										<tr>
											<td>
												<dl> <dt>고용률 </dt>
													<dd>4.0%</dd> <span class="job-arrow top"></span>
												</dl>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="data-right">
						<div class="iaChartBoxMain" id="ssaJobStatusChartMain"></div>
						</div>
					</div>
				</div>
			</div>
	</div>
</div> --%>