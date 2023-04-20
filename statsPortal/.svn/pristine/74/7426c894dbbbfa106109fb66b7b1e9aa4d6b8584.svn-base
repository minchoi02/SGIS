<%
/**************************************************************************************************************************
* Program Name  :   
* File Name     : ssaDataBoard.jsp
* Comment       : 
* History       : 
*
**************************************************************************************************************************/
%>

<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
   //치환 변수 선언
    pageContext.setAttribute("cr", "\r"); //Space
    pageContext.setAttribute("cn", "\n"); //Enter
    pageContext.setAttribute("crcn", "\r\n"); //Space, Enter
    pageContext.setAttribute("br", "<br/>"); //br 태그
%> 

<script src="${pageContext.request.contextPath}/js/workRoad/statsAnls/ssaDataBoard.js"></script>

<style>
	#ssaDataBoard .dataSideBox {
		z-index: 1001; /* ※ 지도버튼이 1000 */
	}
	
	/* 2019-01-29 데이터보드 너비 조정. */
   	#ssaDataBoard .popBox {/* 팝업용도가 아닌 데이터보드에 끼워넣기하는 경우 처리될 사항 - 테두리제거, 사이즈 Full */
   	    left: 0px;
	    top: 0px;
	    margin-left: 0px;
	    width: 100%;
	    height: 100%;
	    /* height: calc(100% - 15px); */
	    border: 0;
    }
    #ssaDataBoard .today-data {width: 100%;}/* 정보테이블 */
    /* .today-data dl dt {width: 100px;} *//* 정보테이블의 제목 */
    /* #ssaDataBoard .today-data dl dd {width: 652px;} */ /* 정보테이블의 설명 */
    #ssaDataBoard .dscList {width: 100%;}/* 표/그리드 영역 */
    #ssaDataBoard.combineGrid {width: 100%;}/* 엑셀 다운 버튼 영역 */
    #ssaDataBoard .workRoad .job-offer-graph {height:500px;}
    #ssaDataBoard #ssaJobStatusDataBoardChart {width:500px;height:490px;}
    #ssaDataBoard .tables{width:760px;height:560px;}
	#ssaDataBoard .compareBox .tables table {width:100%;}
</style>

<div id="ssaDataBoard">
	<a href="javascript:void(0)" class="workRoadDataBoard">데이터보드</a>
	<div class="dataSideBox">
		<div class="bar">
			<div id="dataSlider" class="dataSlider"></div> 
			<a href="javascript:void(0)" class="stepClose-data">데이터보드 닫기</a>
		</div>
		<div class="dataSideContents">
			<div class="workRoad" id="ssaDataBoard">
				<div class="popBox today-data-popup-view wrmScrollable">
				 	<div class="cont-box">
				 		<article>
				 			<h3 id="ssaStatPath">일자리 현황 > 고용률</h3>
				 			<div class="today-data view">
				 				<dl> 
				 					<dt>통계명</dt>
				 					<dd id="ssaTitle"> </dd>
				 				</dl>
				 				<dl> 
				 					<dt>출  처</dt>
				 					<dd id="ssaOrigin"> </dd>
				 				</dl>
				 				<dl> 
				 					<%-- "자료 갱신일" -> (2019-01-04)"자료 공표 시점" -> (2019.08.22)"자료시점" --%>
				 					<dt>자료시점</dt>
				 					<dd id="ssaArea">  </dd>
				 				</dl>
				 			</div>
				 		
					 		<h3>데이터 보기 </h3>
					 	
						 	<div class="dscList">
								<!-- 데이터 보기 Start -->
								<div class="compareBox">
									<div class="typeBox">
										<a href="javascript:void(0)" class="first on">차트</a>
										<a href="javascript:void(0)">표</a>
									</div>
									<div class="combineGrid" style="margin-top: -50px;">
		    							<a href="javascript:void(0)" class="btn_excelDownload">엑셀다운로드</a>
		    							<div class="dataGrid" style="width:480px;display:none;"></div><!-- dataGrid id중복문제 class로 수정 -->  
		    						</div>
		    						<!-- 2019-01-29 데이터보드 너비 조정. -->
									<div id="wrapperChartScroll" class="censusChart" style="width:510px;height:500px;">
										<div class="charts" id="ssaJobStatusDataBoardChart"></div>
									</div>
									<div class="tables"><!-- 표영역 -->
										<table style="table-layout: fixed;">
											<caption>해당지역 내 데이터 보기</caption>
											<thead>
												<!-- <tr>
													<th scope="col">항목</th>
													<th scope="col">순위</th>
													<th scope="col">값</th>
													<th scope="col">비율(%)</th>
												</tr> -->
											</thead> 
										</table>
										<div>
											<table>
												<caption>해당지역 내 데이터 보기</caption> 
												<tbody id="barChartTable">
												<tr>
													<th scope="col">항목</th>
													<th scope="col">순위</th>
													<th scope="col">값</th>
													<th scope="col">비율(%)</th>
												</tr>
												<tr>
													<td class='al' style='text-align:center;'>TEST</td>
													<td style='text-align:center;'>1</td>
													<td style='text-align:center;'>2</td>
													<td style='text-align:center;'>3</td>
												</tr>
												</tbody>
											</table>
										</div>
									</div><!-- 표영역 -->
								</div>
								<!-- 데이터 보기 End -->					
							</div>
						</article>					
					</div>				
				</div>
			</div>
			<%-- 
			<!-- 일반 DataBoard Start -->
			<div class="dataSideScroll  wrmScrollable" id="normalDataBoard" style="display:none">
	<!-- 			<div><p class="txt dataBoardNotice">통계메뉴에서 통계조회 후 이용할 수 있습니다.</p></div> -->
				<p class="thematicTopText">통계메뉴에서 통계조회 후 이용할 수 있습니다.</p>
				<div class="dataBoardDiv" id="viewDataBoard" style="display:none">
					<p class="txt dataBoardTitle"></p><!-- id dupl 오류로 class 변경 -->								<!-- 제목 -->
					<p class="txt dataBoardOrigin" style="display:none;"></p> <!-- id dupl 오류로 class 변경 -->		<!-- 출처 -->
					<p class="txt dataBoardArea" ></p><!-- id dupl 오류로 class 변경 -->								<!-- 지역 -->
					<p class="txt dataBoardStats" ></p><!-- id dupl 오류로 class 변경 -->								<!-- 통계 -->
					<p class="txt" id="dataBoardStatsSum"></p>								<!-- 합계 -->
					
					<dl class="dscList">
						<!-- 데이터 보기 Start -->
						<dt id="viewCurrentRegionData_dt_area"><a href="javascript:void(0)" class="on">데이터 보기</a></dt>
						<dd id="viewCurrentRegionData_dd_area">
							<div class="compareBox">
								<div class="typeBox">
									<a href="javascript:void(0)" class="first on">차트</a>
									<a href="javascript:void(0)">표</a>
								</div>
								<div class="combineGrid" style="margin-top: -50px;">
	    							<a href="javascript:void(0)" class="btn_excelDownload">엑셀다운로드</a>
	    							<div class="dataGrid" style="width:480px;display:none;"></div><!-- dataGrid id중복문제 class로 수정 -->  
	    						</div>
								<div id="wrapperChartScroll" class="censusChart" style="width:520px;height:303px;">
									<div class="charts" id="targetCharts"></div>
								</div>
								<div class="tables"><!-- 표영역 -->
									<table style="table-layout: fixed;">
										<caption>해당지역 내 데이터 보기</caption>
										<thead>
											<tr>
												<th scope="col">항목</th>
												<th class="adm_cd_th" scope="col" style="display: none;">집계구번호</th>
												<th scope="col">순위</th>
												<th scope="col">값</th>
												<th scope="col">비율(%)</th>
											</tr>
										</thead> 
									</table>
									<div class="scrolls">
										<table>
											<caption>해당지역 내 데이터 보기</caption> 
											<tbody id="barChartTable">
											</tbody>
										</table>
									</div>
								</div><!-- 표영역 -->
							</div>
						</dd>
						<!-- 데이터 보기 End -->
						
						<!-- 상위 지역 비교 데이터 보기 Start -->
						<dt id="viewUpRegionData_dt_area"><a href="javascript:void(0)" class="on">상위 지역 비교 데이터 보기</a></dt>
						<dd id="viewUpRegionData_dd_area">
							<div class="compareBox">
								<div class="typeBox">
									<a href="javascript:void(0)" class="first on">차트</a>
									<a href="javascript:void(0)">표</a>
								</div>
								<div class="combineGrid" style="margin-top: -50px;">
	    							<a href="javascript:void(0)" class="btn_excelDownload">엑셀다운로드</a>
	    							<div class="dataGrid" style="width:480px;display:none;"></div><!-- dataGridID중복문제 class로 변경 -->  
	    						</div>
								<div class="charts censusChart">
									<div class="topAreaChartsBox">
										<div id="pieChartDiv1"></div>
										<div id="pieChartDiv2"></div>
										<div id="pieChartDiv3"></div>
										<p class="pieLegend"></p>
									</div>
								</div>
								<div class="tables"><!-- 표영역 -->
									<table>
										<caption>상위 지역 비교 데이터 보기</caption>
										<thead>
											<tr>
												<th scope="col">항목</th>
												<th scope="col">값</th>
											</tr>
										</thead> 
									</table>
									<div>
										<table>
											<caption>상위 지역 비교 데이터 보기</caption>
											<tbody id="pieChartTable">
											</tbody>
										</table>
									</div>
								</div><!-- 표영역 -->
							</div>
						</dd> 
						<!-- 상위 지역 비교 데이터 보기 End -->
						
						<!-- 시계열 조회 Start -->
						<dt id="viewTimeSeriesData_dt_area"><a href="javascript:void(0)" class="on">시계열 조회</a></dt>
						<dd id="viewTimeSeriesData_dd_area">
							<div class="clockTypeBox">
								<a href="javascript:void(0)" class="btn_clockTypePlay">play</a>
								<a href="javascript:void(0)" class="btn_clockTypeSetting">설정</a>
								<a href="javascript:void(0)" class="btn_clockTypeLegend">off</a>
								<a href="javascript:void(0)" class="btn_clockTypeOk">ok</a>
								<ul class="yearList" id="tableTimeSeries">
								</ul>
							</div>
						</dd>
						<!-- 시계열 조회 End -->
					</dl>
				</div>
				
				<!-- 공공데이터 Include -->
				<jsp:include page="/view/map/publicDataBoard"></jsp:include>
				
				<!-- 나의데이터 Include -->
				<jsp:include page="/view/map/mydataDataBoard"></jsp:include>
			</div>
			<!-- 일반 DataBoard End -->
			<!-- Full Size DataBoard Start -->
			<div class="dataSideScroll" id="fullDataBoard" style="display:none">
				<div class="dssRow" style="display:none">
					<div class="fl">
						<p>데이터 조회 조건</p>
						<div class="dssContents" style="height:310px;">
	<!-- 						<div class="clickMiniMap"></div> -->
							<div class="cmListBox">
								<span>조회정보</span>
								<div id="fullDataBoardTitle">
									<p class="txt dataBoardTitle" id="dataBoardTitle" style="padding-left:10px;font-size:13px;"></p><!-- -->								<!-- 제목 -->
									<p class="txt dataBoardOrigin" id="dataBoardOrigin" style="display:none;padding-left:10px;font-size:13px;"></p>					<!-- 기준년도 -->
									<p class="txt dataBoardArea" id="dataBoardArea" style="padding-left:10px;font-size:13px;"></p>								<!-- 지역 -->
									<p class="txt dataBoardStats" id="dataBoardStats"  style="padding-left:10px;font-size:13px;"></p>								<!-- 통계 -->
								</div>
								<span>조회년도</span>
								<ul id="fullTableTimeSeries">
								</ul>
							</div>
						</div>
					</div>
					<div class="fr"> 
						<p>해당 지역 내 데이터 보기(차트)</p>
						<div id="wrapperFullChartScroll" style="width:380px;height:250px;">
							<div class="dssContents" id="fullTargetChart"></div>
						</div>
					</div>
				</div> 
				<div class="dssRow" style="display:none">
					<div class="fl">
						<p>상위 지역 비교 데이터 보기</p>
						<div class="dssContents" id="fullPieChart" style="height:240px;"></div>
						<div class="fullPieLegend"></div>
					</div>
					<div class="fr"> 
						<p>해당 지역 내 데이터 보기(표)</p>
						<div class="dssContents fullCompareBox" id="dssChart03">
							<!-- 표영역 -->
							<div class="tables">
								<table>
									<caption>해당지역 내 데이터 보기</caption>
									<thead>
										<tr>
											<th scope="col">항목</th>
											<th class="adm_cd_th" scope="col" style="display: none;">집계구번호</th>
											<th scope="col">순위</th>
											<th scope="col">값</th>
											<th scope="col">비율(%)</th>
										</tr>
									</thead> 
								</table>
								<div class="scrolls">
									<table>
										<caption>해당지역 내 데이터 보기</caption> 
										<tbody id="fullBarChartTable">
										</tbody>
									</table>
								</div>
							</div>
							<!-- 표영역 -->
						
						</div>
					</div> 
				</div>
			</div>
			<!-- Full Size DataBoard End -->
			 --%>
		</div>
	</div> 
</div>
<form id="excelDownForm" name="excelDownForm" method="post">
</form>