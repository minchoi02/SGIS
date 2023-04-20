<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="utf-8" />
	<meta name="format-detection" content="telephone=no" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>보고서</title>
	
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jquery-ui-1.10.4.custom.css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/reportForm.css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/common.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/wheelcolorpicker.css"/>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery-1.11.1.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/btoa.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/highcharts/highcharts.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/plugins/jsPDF/jspdf.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/plugins/imageCapture/rgbcolor.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/plugins/imageCapture/canvg.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/plugins/imageCapture/html2canvas.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/plugins/imageCapture/html2canvas.svg.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/highcharts/modules/exporting.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.sha256.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/durian-v2.0.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/common.js"></script>		
	<script src="${pageContext.request.contextPath}/js/common/map.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapInfo/legendInfo.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/report/reportForm.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/report/reportForm.event.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/report/reportForm.util.js"></script>
	<style media="print">@page{size:auto;margin:10mm;}body{margin:0;}</style> 
	
	<style>
		#AlertMessage {
			width : 400px;
			overflow : hidden;
			border : 3px solid #656972;
			barder-radius : 5px;
			padding : 20px 20px 20px 70px;
			font-size : 20px;
			color : #333333;
			box-shadow : 1px 1px 3px #cccccc;
			word-break : break-all;
			position : absolute;
			top : 45%;
			left : 20%;
		}
		.pntCenter {text-align:center;}
		.titleArea {height:30px;float:left;}
		.legendArea {width:220px;height:270px;border-right:1px solid #ccc;position:absolute; top:233px;z-index:10;background-color:#fff;}
		.pntChart, .pntLegend {height:auto;}
		
		#normalDetailTable{width:100%;margin-top:10px;}
		#normalDetailTable th{border-top:1px solid #ccc;border-bottom:1px solid #ccc;height:32px;background:#f5f5f5;color:#606060;font-size:13px;}
		#normalDetailTable td{border-bottom:1px solid #ccc;text-align:center;height:32px;color:#666;font-size:11px;}
		#normalDetailTable .addSideLine{border:1px solid #ccc;}
		.pcAddBox{display:block;margin-left:20px;height:auto;overflow:hidden;width:407px;}
		.pcAddBox span{font-size:14px;color:#333;font-weight:bold;float:left;}
		.pcAddBox a{float:right;}
		.pcAddList{display:block;margin-left:20px;height:auto;overflow:hidden;}
		.pcAddList li{display:block;width:100%;height:auto;overflow:hidden;}
		.pcAddList li a{display:block;width:395px;border:1px solid #ccc;width:Scalc( 100% - 12px );padding-left:10px;height:28px;line-height:28px;background:url(/img/policyStatic/ico_mius01.png) no-repeat right center;overflow:hidden;}
		.pcAddList li a img{vertical-align:middle;}
		.pcAddList li a span{font-size:13px;vertical-align:middle;}
			
	</style>
</head>
<body>
	<div id="mask" style="background:#ffffff;z-index:10000;width:100%;height:100%;">
		<div id="AlertMessage">보고서 생성중입니다. 잠시만 기다려주세요.</div>
	</div>
	<div id="wrap">
		<div class="printArea">
			<div class="pntPage">
				<h1 class="pntHeader"><img src="${pageContext.request.contextPath}/img/common/logo.png" alt="SGISwork" style="width:125px;height:63px;"></h1>	 
		 		<div class="pntBtn">
		 			<a href="javascript:$reportForm.event.reportPdfDown();" id="pdfdown">PDF</a>
		 			<a href="javascript:$reportForm.event.reportPrint();">인쇄</a>
		 			<a href="javascript:self.close();">닫기</a>
		 		</div>
		 		<p class="pntURI">SGIS work (http://sop.nsi.go.kr/work)</p> 
				
		 		<div id="analysisInfo">
		 			<div class="pntNewCenter" style="margin-top:10px;"><h3>보고서명</h3><div class="titleArea"><textarea id="analysisTitle" class="inputArea" cols="60" rows="1"></textarea></div></div>
		 			<div class="pntNewCenter"><h3>분석타입</h3><div id="analysisType" class="pntNewRight"></div></div>
		 			<div class="pntNewCenter"><h3 id="conditionArea" style="height: 60px;line-height: 60px;">분석조건</h3>
		 				<div id="dataCondition" class="pntNewRight"></div>
		 				<div id="regionCondition" class="pntNewRight"></div>
		 				<div id="bufferCondition" class="pntNewRight" style="display:none;"></div>
		 			</div>
		 			<div class="pntNewCenter"><h3>분석일자</h3><div id="analysisTime" class="pntNewRight"></div></div>
		 		</div>
		 		<div id="singleMapDivArea" style="display:none;">
			 		<div id="singleMapDiv_show" class="pntShowBtn"><a href="javascript:$reportForm.event.show('singleMapDiv');"><img src="${pageContext.request.contextPath}/img/common/btn_r_plus.png" alt="보이기" /></a></div>
			 		<div id="singleMapLegend_show" class="pntShowBtn"><a href="javascript:$reportForm.event.show('singleMapLegend');"><img src="${pageContext.request.contextPath}/img/common/btn_r_plus.png" alt="보이기" /></a></div>
			 		<div id="singleMapDiv" class="pntCenter" style="position:relative;">
		 				<div class="pntNewCenterTitle"><h3>지도 시각화 화면</h3></div>
		 				<div class="pntCloseBtn"><a href="javascript:$reportForm.event.hide('singleMapDiv');"><img src="${pageContext.request.contextPath}/img/common/btn_r_close.png" alt="숨기기" /></a></div>
			 			<div id="singleMapLegend" class="legendArea">
			 				<h3 class="pntLegendTitle" id="legendTitle">범례</h3>
			 				<div class="pntCloseBtn"><a href="javascript:$reportForm.event.hide('singleMapLegend');"><img src="${pageContext.request.contextPath}/img/common/btn_r_close.png" alt="숨기기" /></a></div>
				 			<div id="legend_1" class="pntLegend remarkbox" style="display: block; position: relative;width:215px;"></div>
			 			</div>
			 			<div class="mapArea">
			 				<div class="pntMap"><img id="singleMapDiv_1" src=""></div>
			 			</div>
			 		</div>
		 		</div>
		 		<div class="pntPage">
			 		<div id="normalMemo_show" class="pntShowBtn"><a href="javascript:$reportForm.event.show('normalMemo');"><img src="${pageContext.request.contextPath}/img/common/btn_r_plus.png" alt="보이기"/></a></div>
			 		<div class="pntCenter" id="normalMemo" style="position:relative;">
			 			 <h3>메모</h3> 
			 			 <textarea id="memo"></textarea>
			 			 <div class="pntCloseBtn"><a href="javascript:$reportForm.event.hide('normalMemo');"><img src="${pageContext.request.contextPath}/img/common/btn_r_close.png" alt="숨기기" /></a></div>
			 		</div>
			 	</div>
		 		<div class="pntPage" id="normalChartDiv" style="display:none; height:auto;">
			 		<div id="normalChart_show" class="pntShowBtn"><a href="javascript:$reportForm.event.show('normalChart')"><img src="${pageContext.request.contextPath}/img/common/btn_r_plus.png" alt="보이기" /></a></div>
			 		<div class="pntCenter">
					 	<div class="pntNewCenterTitle" id="normalChart" style="position:relative;display:block; height:auto;">
					 		<h3>데이터 보기 - 차트</h3>
					 		<div class="pntCloseBtn"><a href="javascript:$reportForm.event.hide('normalChart')"><img src="${pageContext.request.contextPath}/img/common/btn_r_close.png" alt="숨기기" /></a></div>
					 		<div class="pntChart">
					 			<img id="normalDetailChart" src="">
					 		</div>
					 	</div>
			 		</div>
		 		</div>
		 		<div class="pntPage" id="additionalChartDiv" style="display:none; height:auto;">
			 		<div id="additionalChart_show" class="pntShowBtn"><a href="javascript:$reportForm.event.show('additionalChart')"><img src="${pageContext.request.contextPath}/img/common/btn_r_plus.png" alt="보이기" /></a></div>
			 		<div class="pntCenter">
					 	<div class="pntNewCenterTitle" id="additionalChart" style="position:relative;display:block; height:auto;">
					 		<h3>데이터 보기 - 차트</h3>
					 		<div class="pntCloseBtn"><a href="javascript:$reportForm.event.hide('additionalChart')"><img src="${pageContext.request.contextPath}/img/common/btn_r_close.png" alt="숨기기" /></a></div>
					 		<div class="pntChart">
					 			<img id="additionalDetailChart" src="">
					 		</div>
					 	</div>
			 		</div>
		 		</div>
		 		<div class="pntPage" id="normalTableDiv" style="display:none;">
			 		<div id="normalTable_show" class="pntShowBtn"><a href="javascript:$reportForm.event.show('normalTable')"><img src="${pageContext.request.contextPath}/img/common/btn_r_plus.png" alt="보이기" /></a></div>
			 		<div class="pntCenter">
					 	<div class="pntNewCenterTitle" id="normalTable" style="position:relative;display:block;">
					 		<h3>데이터 보기 - 표</h3>
					 		<div class="pntCloseBtn"><a href="javascript:$reportForm.event.hide('normalTable')"><img src="${pageContext.request.contextPath}/img/common/btn_r_close.png" alt="숨기기" /></a></div>
					 		<div class="pntChart" style="height: auto;">
					 			<table id="normalDetailTable" style="height: auto;">
					 				<thead>
					 					<tr>
					 						<th></th>
					 					</tr>
					 				</thead>
					 				<tbody></tbody>
					 			</table>
					 		</div>
					 	</div>
			 		</div>
		 		</div>
		 		<div class="pntPage" id="policyChartDiv" style="display:none;">
		 			<div id="standardDataboard_show" class="pntShowBtn"><a href="javascript:$policyStaticMap.report.event.show('standardDataboard')"><img src="${pageContext.request.contextPath}/img/common/btn_r_plus.png" alt="보이기" /></a></div>
		 			<div class="pntCenter">
		 				<div class="pntNewCenterTitle" id="standardDataboard" style="position:relative;display:block;"><h3></h3>
				 		<div class="pntCloseBtn"><a href="javascript:$policyStaticMap.report.event.hide('standardDataboard')"><img src="${pageContext.request.contextPath}/img/common/btn_r_close.png" alt="숨기기" /></a></div>
				 		<div class="pntChart" id="policyDataboard"></div>
		 				</div>
		 			</div>
		 		</div>
		 		<div class="pntPage" id="policyConvergenceDiv" style="display:none;">
		 			<div id="policyConvergence_show" class="pntShowBtn"><a href="javascript:$policyStaticMap.report.event.show('policyConvergence')"><img src="${pageContext.request.contextPath}/img/common/btn_r_plus.png" alt="보이기" /></a></div>
		 			<div class="pntCenter">
		 				<div class="pntNewCenterTitle" id="policyConvergence" style="position:relative;display:block;"><h3>융합데이터</h3>
				 		<div class="pntCloseBtn"><a href="javascript:$policyStaticMap.report.event.hide('policyConvergence')"><img src="${pageContext.request.contextPath}/img/common/btn_r_close.png" alt="숨기기" /></a></div>
				 		<div class="pntChart" id="policyConData"></div>
		 				</div>
		 			</div>
		 		</div>
		 		<div class="pntPage" id="combineChartDiv" style="display:none;">
		 			<div id="combineDataboard_show" class="pntShowBtn"><a href="javascript:$policyStaticMap.report.event.show('combineDataboard')"><img src="${pageContext.request.contextPath}/img/common/btn_r_plus.png" alt="보이기" /></a></div>
		 			<div class="pntCenter">
		 				<div class="pntNewCenterTitle" id="combineDataboard" style="position:relative;display:block;"><h3>기준/추가데이터</h3>
				 		<div class="pntCloseBtn"><a href="javascript:$policyStaticMap.report.event.hide('combineDataboard')"><img src="${pageContext.request.contextPath}/img/common/btn_r_close.png" alt="숨기기" /></a></div>
				 		<div class="pntChart" id="combineStandardDataboard"></div>
		 				</div>
		 			</div>
		 		</div>
		 		<div class="pntPage" id="combineConvergenceDiv" style="display:none;">
		 			<div id="combineConvergence_show" class="pntShowBtn"><a href="javascript:$policyStaticMap.report.event.show('combineConvergence')"><img src="${pageContext.request.contextPath}/img/common/btn_r_plus.png" alt="보이기" /></a></div>
		 			<div class="pntCenter">
		 				<div class="pntNewCenterTitle" id="combineConvergence" style="position:relative;display:block;"><h3>융합데이터</h3>
				 		<div class="pntCloseBtn"><a href="javascript:$policyStaticMap.report.event.hide('combineConvergence')"><img src="${pageContext.request.contextPath}/img/common/btn_r_close.png" alt="숨기기" /></a></div>
				 		<div class="pntChart" id="combineConData"></div>
		 				</div>
		 			</div>
		 		</div>
			</div>
		</div>
	</div>
	<div id="hiddenReport"></div>
</body>
</html>