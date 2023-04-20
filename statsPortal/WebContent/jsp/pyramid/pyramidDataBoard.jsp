<%
/**************************************************************************************************************************
* Program Name  : 월간통계 데이터보드 JSP  
* File Name     : monthMapDataBoard.jsp
* Comment       : 
* History       : jrj 2018.09.07
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<a href="javascript:void(0)" class="interactiveDataBoard pacific-Blue">데이터보드</a>
<div class="dataSideBox pacific-Blue">
	<div class="bar ">
		<div id="dataSlider" class="dataSlider"></div>
		<a href="javascript:void(0)" class="stepClose-data">데이터보드 닫기</a>
	</div>
	<div class="dataSideContents">
		<div class="dataSideScroll">
			<div class="data-archive">
				<dl>
					<dt>제&nbsp;&nbsp;&nbsp;&nbsp;목<span>:</span></dt>
					<dd id="dataBoardTitle"></dd>
					<dt>출&nbsp;&nbsp;&nbsp;&nbsp;처<span>:</span></dt>
					<dd>통계청</dd>
					</dd>
				</dl>
			</div>
			<dl class="dscList">
				<dt class="area-tit"><a href="javascript:void(0)"><span>데이터 보기</span></a></dt>
				<dd class="compareBox">
					<div style="height:26px;margin:20px 0px 0px 0px;padding:1px;width:auto;">
						<span>(단위:명)</span>
					</div>
					<div class="combineGrid" style="margin-top: -50px; display:block;">
						<a href="javascript:void(0)" class="btn_excelDownload" style="display: block;">엑셀다운로드</a>
						<div class="dataGrid" style="width: 480px; display: block;"></div><!-- dataGrid id중복문제 class로 수정 -->  
					</div>
					<div class="select-cont">
						<div class="combineGrid" style="display: block;">
							<div class="dataSideScroll" style="height: 520px;">
								<div class="tables" style="position:static;">
									<div id="dataList">
										<table id="boardType1" style="display: none;">
											<thead>
												<tr>
													<th>연령</th>
													<th>남자인구수(명)</th>
													<th>여자인구수(명)</th>
												</tr>
											</thead>
											<tbody>
											</tbody>
										</table>
										<table id="boardType2" style="display: none;">
											<thead>
												<tr>
													<th rowspan="2">연령</th>
													<th colspan="2" class="areanm1"></th>
													<th colspan="2" class="areanm2"></th>
													<th colspan="2" class="areanm3"></th>
												</tr>
												<tr>
													<th>남자</th>
													<th>여자</th>
													<th>남자</th>
													<th>여자</th>
													<th>남자</th>
													<th>여자</th>
												</tr>
											</thead>
											<tbody>
											</tbody>
										</table>
										<table id="boardType3" style="display: none;">
											<thead>
												<tr>
													<th rowspan="2">연령</th>
													<th colspan="2" class="yearnm1"></th>
													<th colspan="2" class="yearnm2"></th>
													<th colspan="2" class="yearnm3 db3"></th>
												</tr>
												<tr>
													<th>남자</th>
													<th>여자</th>
													<th>남자</th>
													<th>여자</th>
													<th class="db3">남자</th>
													<th class="db3">여자</th>
												</tr>
											</thead>
											<tbody>
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div class="dataSlide-contents dataSideScroll"></div>
						</div>
					</div>
				</dd>
			</dl>
		</div>
	</div>
</div>
<form id="excelDownForm" name="excelDownForm" method="post"></form> 
