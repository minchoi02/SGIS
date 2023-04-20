<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHead.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/work/sysSts.js"></script>
	
	<!-- mng_s 2019. 06. 04 j.h.Seok -->
	<script>
		$(document).ready(
			function() {
				//$log.srvLogWrite("Z0", "05", "01", "00", "", "");
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
			<h3>SGISwork 시스템의 운영현황을 확인하실 수
				있습니다</h3>
		</div>
		<div class="tabs">
			<ul>
				<li><a href="systemSts">운영현황</a></li>
				<!-- <li><a href="workSts">업무현황</a></li> -->
				<li><a href="logSts">접속현황</a></li>
				<li><a href="analysisSts">분석현황 통계</a></li>
				<li class="is-active"><a href="sysSts">시스템현황</a></li>
				<!-- <li><a href="failSts">실패 작업 현황</a></li> -->
				<!-- <li><a href="downloadSts">다운로드 현황</a></li> -->
			</ul>
		</div>

		<div class="view-container">
		<div class="row">
		   <div class="cols">
			 <div class="col col-1">
			   <div class="in-box">
				 <!-- <label class="switch">
				   <input type="checkbox" class="switch-input" checked/>
				   <span class="switch-label" data-on="ON" data-off="OFF"></span>
				   <span class="switch-handle"></span>
				 </label>
				 <span class="switch-txt">예비관리데몬 사용</span> -->
		<!-- 
				 <div class="cycle-lists">
				   <ul>
					 <li>
					   <div id="master" class="ele">
		
					   </div>
					   <strong>전체관리데몬</strong>
					 </li>
					 <li>
					   <div id="inner" class="ele">
		
					   </div>
					   <strong>내부망수집관리데몬</strong>
					 </li>
					 <li>
					   <div id="outer" class="ele">
		
					   </div>
					   <strong>외부망수집관리데몬</strong>
					 </li>
					 <li>
					   <div id="geo1" class="ele">
		
					   </div>
					   <strong>사용자GEO서버</strong>
					 </li>
					 <li>
					   <div id="geo2" class="ele">
		
					   </div>
					   <strong>운영GEO서버</strong>
					 </li>
					 <li>
					   <div id="geo3" class="ele">
		
					   </div>
					   <strong>외부GEO서버</strong>
					 </li>
				   </ul>
				 </div>
		 -->
				 <ul class="tabs-txt">
				   <li id="sys_ram" class="is-active"><a href="?tp=ram">메모리</a></li>
				   <li id="sys_cpu"><a href="?tp=cpu">CPU</a></li>
				   <li id="sys_disk"><a href="?tp=disk">디스크</a></li>
				 </ul>
			     <br>
		         <div class="chars-area">
		           <canvas id="chart" width="1180" height="400"></canvas>
		         </div>
			   </div>
			 </div>
		   </div>
		</div>
	</div>	
		
	</div>
</div>	
			<!-- footer -->
			<jsp:include page="/view/common/includeFooterNew"></jsp:include>			
				
</body>
</html>