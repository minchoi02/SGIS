<%
/**************************************************************************************************************************
* Program Name  :   
* File Name     : saDataBoard.jsp
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

<script src="${pageContext.request.contextPath}/js/workRoad/statusAnls/saDataBoard.js"></script>

<style>
	#saDataSideBox {/* 데이터보드를 지도컨트롤 버튼 위에 위치시키기 */
		z-index: 1001;
	}
	
   	#saDataBoard .popBox {/* 팝업용도가 아닌 데이터보드에 끼워넣기하는 경우 처리될 사항 - 테두리제거, 사이즈 Full */
   	    left: 0px;
	    top: 0px;
	    margin-left: 0px;
	    width: 100%;
	    height: calc(100% - 15px);
	    border: 0;
    }    
</style>

<a href="javascript:void(0)" class="workRoadDataBoard" id="saDataBoardToggle">데이터보드</a>
<div class="dataSideBox" id="saDataSideBox">
	<div class="bar">
		<div id="dataSlider" class="dataSlider"></div> 
<!-- 	<a href="javascript:void(0)"><img src="/images/workRoad/ico/ico_close02.png" alt="데이터보드 닫기" /></a> -->
		<a href="javascript:void(0)" class="stepClose-data">데이터보드 닫기</a>
	</div>
	<div class="dataSideContents">
	
		<div class="workRoad" id="saDataBoard">
			<div class="popBox today-data-popup-view wrmScrollable">
			 	<div class="cont-box">
			 		<article>
			 			<h3>구인 현황분석 </h3>
			 			<div class="today-data view">
			 				<dl> 
			 					<dt>제  목</dt>
			 					<dd id="saTitle"></dd>
			 				</dl>
			 				<dl> 
			 					<dt>출  처</dt>
			 					<dd id="saOrigin"></dd>
			 				</dl>
			 				<dl> 
			 					<dt>지  역</dt>
			 					<dd id="saArea"></dd>
			 				</dl>
			 				<dl>
			 					<dt>통  계</dt>
			 					<dd id="saStats"></dd>
			 				</dl>
			 				<dl> 
			 					<dt>합  계</dt>
			 					<dd id="saSum"></dd>
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
								<div class="job-offer-graph" id="wrapperChartScroll"><!-- 기존코드에서 스크롤 기능 제거 - 2018.10.30	ywKim	변경 -->
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
									<div>
										<table>
											<caption>해당지역 내 데이터 보기</caption> 
											<tbody id="barChartTable">
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
	</div>
</div>  

<form id="excelDownForm" name="excelDownForm" method="post">
</form>