<%
/**************************************************************************************************************************
* Program Name  : 기술창업통계지도 JSP  
* File Name     : technicalBizMap.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2016-06-21
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.List" %> 
<%@ page import="org.json.JSONObject" %> 
<%@ page import="org.json.JSONArray" %> 
<%@ page import="kostat.sop.ServiceAPI.common.security.Security" %>

<%
	String strType = "";
	String paramObj = "";
	try {
		Map map = (Map)request.getAttribute("paramInfo");
		strType = (String)map.get("type");	
		
		//2017.12.04 [개발팀] 시큐어코딩
		strType = Security.cleanXss(strType);
		if ( strType != null  ){  
			strType = strType.replaceAll("<","&lt;");  
			strType = strType.replaceAll(">","&gt;"); 
		}
		if (strType.equals("bookmark")   		|| 
			strType.equals("sharedata")  		||
			strType.equals("recentdata")		||
			strType.equals("userdata")          ||
			strType.equals("localgov")) {
			paramObj = (String)map.get("paramObj");
		}
		if ( paramObj != null  ){  
			// 20190318 leekh 말도 안되는 소스임. 왜 추가했나 모르겠음.
			//paramObj = strType.replaceAll("<","&lt;");  
			//paramObj = strType.replaceAll(">","&gt;"); 
		}
	} catch (IllegalArgumentException e) {
		System.out.println("처리중 에러가 발생하였습니다.");
	} catch (Exception e) {
		System.out.println("처리중 에러가 발생하였습니다.");
	}
%>


<!DOCTYPE html>
<html lang="ko">
	<head>
	    <meta charset="utf-8" />
	    <meta name="format-detection" content="telephone=no" />
	    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	    <title>기술업종 통계지도 | 통계지리정보서비스</title>

		<link href="/css/common.css" rel="stylesheet" type="text/css" />
	    <link href="/css/default.css" rel="stylesheet" type="text/css" />
	    <link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
	    <link href="/css/wheelcolorpicker.css" rel="stylesheet" type="text/css" />
	    <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
	    <link href="/css/map/interactiveFunc.css" rel="stylesheet" type="text/css" /> 
	    <link rel="stylesheet" type="text/css" href="/css/map/technicalBiz.css"> 
		<link rel='shortcut icon' href='/img/ico/n_favicon.png'/>	  
	  
	    <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
	    <link rel="stylesheet" href="/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
	    <link rel="stylesheet" type="text/css" href="/js/plugins/colorpicker/css/colpick.css">
	    <link rel="stylesheet" type="text/css" href="/css/map/bxslider.css">
	    <link rel="stylesheet" href="/css/popup.css">
	    <link rel="stylesheet" href="/css/tutorial/tutorial.css">
	    
	    <script src="/js/plugins/jquery.min.js"></script>
	    <script src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>  
	    <script src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>  
	    <script src="/js/plugins/colorpicker/js/colpick.js"></script>
	    <script src="/js/plugins/jquery.wheelcolorpicker.js"></script>
	    <script src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	    <script src="/js/plugins/EasyTree/jquery.easytree.js"></script> 
	    <!-- <script  src="/js/plugins/colResizable-1.5.min.js"></script>  -->
	    <script src="/js/plugins/store.min.js"></script>
	    <script src="/js/plugins/highcharts/highcharts_3.js"></script>
	    <script src="/js/plugins/highcharts/highcharts-3d.src_3.js"></script>
	    <script src="/js/plugins/highcharts/highcharts-more_3.js"></script>
	    <script src="/js/plugins/highcharts/modules/exporting.js"></script>
	    <script src="/js/plugins/btoa.js"></script>
	    
	    <!-- 2016.03.23 j.h.Seok -->
<!-- 	    <link rel="stylesheet" type="text/css" href="/css/handsontable.css"> -->
<!-- 	    <script  src="/js/plugins/handsontable.js"></script> -->
	    <link rel="stylesheet" type="text/css" href="/css/handsontable.full.css">
	    <script src="/js/plugins/handsontable.full.js"></script>
	    
		<script src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
		<script src="/js/plugins/jquery.sha256.js"></script>
		<script src="/js/plugins/durian-v2.0.js"></script>
		<script src="/js/common/sop.portal.absAPI.js"></script>	    
	    <script src="/js/common/map.js"></script>
	    <script src="/js/common/common.js"></script>
	    <script src="/js/common/themeCdCommon.js"></script> <!-- 2020년 SGIS고도화 3차(테마코드) - 테마코드 공통기능 js 추가 (pse)-->
	    <script src="/js/common/mapNavigation.js"></script>
	    <script src="/js/technicalBiz/report/reportForm.js"></script>
		<script src="/js/plugins/libs/jquery.bxslider.min.js"></script>
	    <script src="/js/technicalBiz/technicalBizMap.js"></script>
	    <script src="/js/technicalBiz/technicalBizMapApi.js"></script>
	    <script src="/js/technicalBiz/technicalBizLeftMenu.js"></script>
		<script src="/js/technicalBiz/technicalBizDataBoard.js"></script>
		<script src="/js/technicalBiz/technicalBizDataBoardApi.js"></script>
		<script  src="/js/bizStats/bizStatsTutorial.js"></script>
	    <script src="/js/technicalBiz/technicalBizTutorial.js"></script>
	    <script src="/js/interactive/interactiveMapBtn.js"></script>
	    <script src="/js/common/mapInfo/bookmarkAndShareInfo.js"></script>
	    
	    
	    <!-- 사용자지정 컨트롤  -->
		<script src="/js/thematicMap/thematicMap_api.js"></script>
	    <script src="/js/common/mapDraw/Draw.Feature.js"></script>
        <script src="/js/common/mapDraw/Draw.Control.Manager.js"></script>
        <script src="/js/common/mapDraw/draw/Draw.Cricle.js"></script>
        <script src="/js/common/mapDraw/draw/Draw.Rectangle.js"></script>
        <script src="/js/common/mapDraw/draw/Draw.Polygon.js"></script>
        <script src="/js/common/mapDraw/Draw.Control.Overlay.js"></script>
        <script src="/js/common/mapDraw/measure/Draw.AreaMeasure.js"></script>
        <script src="/js/common/mapDraw/measure/Draw.DistanceMeasure.js"></script>
        <script src="/js/common/mapDraw/Draw.Control.Distance.js"></script>
        <script src="/js/common/mapDraw/Draw.Control.Poi.js"></script>
        <script src="/js/common/mapDraw/poi/Poi.InteractiveMap.js"></script>
        <script src="/js/common/mapDraw/Draw.Control.Measure.js"></script>
        <script src="/js/board/jquery.paging.js"></script>
        <script src="/js/common/mapInfo/legendInfo.js"></script>
        
        <!-- 공유  -->
        <script src="/js/interactive/kakao_script_api.js"></script>

		<!-- 0928 신규추가 -->
	    <link rel="stylesheet" type="text/css" href="/sample2/include/css/gallery_pop.css" />
	    <script src="/js/plugins/slick.min.js"></script>  
        <script src="/js/plugins/jquery.tagsinput.min.js"></script>
    	<script src="/js/gallery/galleryEtc.js"></script>
        <script src="/js/plugins/imageCapture/rgbcolor.js"></script>
        <script src="/js/plugins/imageCapture/canvg.js"></script>
        <script src="/js/plugins/imageCapture/html2canvas.js"></script>
        <script src="/js/plugins/imageCapture/html2canvas.svg.js"></script> 
        <!-- 2017.03.14 svg 이슈 -->
        <!-- 신규 -->
        <link rel="stylesheet" type="text/css" href="/css/statsPotal/statsPotal.css" />
        <script  src="/sample2/include/js/select.js"></script><!--박길섭 추가 -->
        <link rel="stylesheet" type="text/css" href="/SgisProject_Publisher/include/css/bizStats-popup.css"><!--박길섭 추가  -->
    	<link href="<c:url value='/css/common/data_board.css' />" rel="stylesheet" type="text/css" /><!--박길섭 추가  -->
    	<link href="/css/map/bizStatsHelper.css" rel="stylesheet" type="text/css" />
		<script>
       		$(document).ready(
    			function() {
    				
    				//mng_s 20180412_김건민
    				/* if(getCookie("confirmMsgTc") == ""){
    					readyTutorial();
    				} */
    				//mng_e 20180412_김건민
    				//박길섭
    				<%
   						String tec=request.getParameter("tec");
   						if ( tec != null  ){  
   							tec = tec.replaceAll("<","&lt;");  
   							tec = tec.replaceAll(">","&gt;"); 
   						}
   					%> 
				switch(<%=tec%>){
    				case 1:
    					$technicalBizLeftMenu.ui.setDetailStatsPanel('sido');
    					break;
    				case 2:$technicalBizLeftMenu.ui.setDetailStatsPanel('density');
    					break;
    				case 3:$technicalBizLeftMenu.ui.setDetailStatsPanel('sigungu');
    					break;
    				case 4:$technicalBizLeftMenu.ui.setDetailStatsPanel('lq');
    					break;
    				case 5:$technicalBizLeftMenu.ui.setDetailStatsPanel('search');
    					break;
    				case 6:$technicalBizLeftMenu.ui.setDetailStatsPanel('supply');
    					break;
    				case 7:$technicalBizLeftMenu.ui.setDetailStatsPanel('industry');
    					break;
    				case 10:
    					//$(".nav-list li").eq(0).find("a").addClass("on");
    					$technicalBizLeftMenu.ui.setDetailStatsPanel('sido');
    					$(".sq02").trigger("click");
    					break;
    				case 11:
    					$(".sq02").trigger("click");
    					break;
    				/* case 8:document.location.href='/view/newhelp/tc_help_10_0'
    					break; */
    				case 8: helpPage();
    					break;
    				default:
    					$(".sq02").trigger("click");//2019-03-12 박길섭
    					break;
    				}
    				
    				if($(location).attr('search').match("tutorial_mode")){
	    				tec_startTutorial();
	       			}
    				
    				//북마크나 최신데이터는 조건설정창을 자동으로 열지않는다.
    				if ("<%=strType%>" != "bookmark"   && 
    					"<%=strType%>" != "recentdata" && 
    					"<%=strType%>" != "sharedata") {
    					
    					//$(".sideQuick.sq02").click();박길섭 수정
    				}
    				 
    				var param = null;
    				var length = <%=paramObj.length()%>;
    				if (length == 0) {
    					param = "";
    				}else {
    					param = JSON.parse(<%=paramObj%>);
    				}
    				$technicalBizMap.ui.doAnalysisShareInfo("<%=strType%>", param);
    				
    		});
       		
       		function helpPage(){
       			if( $(location).attr('search').match("tutorial_mode") == null ){
       				$('#technicalBiz_laypopup').show();
       			}
       			
       			$technicalBizMap.ui.changePopupIntroTabs('intro');
       		}
 
			function callTutorial(sw){
				if(sw == "biz"){
	   				if(confirm("<생활업종 통계지도> \n처음 사용자를 위한 튜토리얼이 준비되어 있습니다.\n진행하시겠습니까?")) 
	   					window.open('/view/bizStats/bizStatsMap?tutorial_mode', '_blank'); 
				} else {
	   				if(confirm("<기술업종 통계지도> \n처음 사용자를 위한 튜토리얼이 준비되어 있습니다.\n진행하시겠습니까?")) 
	   					window.open('/view/technicalBiz/technicalBizMap?tutorial_mode', '_blank'); 
				}
			}  		
        </script>
        <jsp:include page="/SgisProject_Publisher/html/bizStatsMap/bizStatsMap-popup.html"></jsp:include>
        <!-- 생활업종현황 도움말 -->
		<jsp:include page="/view/bizStats/bizStatsHelper"></jsp:include>
		<!-- 기술업종현황 도움말 -->
		<jsp:include page="helper/technicalHelper.jsp"></jsp:include>    
        <style>
	 	 	.interactiveSelect{
	 	 		margin-top: 3px;
	 	 		margin-left: 190px;
	 	 	}
	 	 	.dataSideBox .bar>a{
	 	 		top:10px;
	 	 		right:5px;
	 	 	}
	 	 	.qmdl dd ul>li.on {
    			background: #21b69a;
   				
			}
			.qmdl dd ul>li.on a{
    			color: #f1f1f1;
			}
			.nav-list li > a:hover {
   				opacity: 10;
			}
			.toolBar {
    			border-top: 1px solid #d8dade;
			}
			.ui-slider.ui-slider-vertical .ui-slider-handle {
    			left: -.3em;
    			margin-left: 0;
    			margin-bottom: -.6em;
    			transform: rotateZ(0deg);
			}
			.tooltip {
    			position: absolute;
    			z-index: 1020;
    			display: block;
    			padding: 5px;
    			font-size: 11px;
    			visibility: visible;
    			margin-top: -2px;
    			bottom: 120%;
    			width: 30px;
    			height: 15px;
    			text-align: center;
    			margin-left: -2em;
    			background: #333;
    			border-radius: 5px;
    			color: #fff;
			}
			/* .dscList dt>a{font-family: "나눔고딕";color:#FFF;border-radius: 13px;background:#00bcd4 url(/img/ico/ico_down01.gif) no-repeat 505px center;}
			.dscList dt>a.on{font-family: "나눔고딕";color:#FFF;border-radius: 13px;background:#00bcd4 url(/img/ico/ico_up01.gif) no-repeat 505px center;}
			 */
			.helperText:before {
    			position: absolute;
    			left: -14px;
    			top: 13px;
    			content: '';
    			display: block;
    			width: 10px;
    			height: 10px;
    			border: 3px solid #3985d0;
    			border-radius: 50%;
    			box-sizing: border-box;
			}
			.dataSideBox .bar {
    			background: #1778cc;
			}
			.seoulBox, .areaBox {
    			font-size: 22px;
    		}
    		.dbTabs a.on {
    			background: #1778cc !important;
    			color: #fff !important;
    			border-top: 1px solid #1778cc !important;
			}
			.techDataboardTab a.on {
    			background: rgb(224, 88, 88) !important;
    			color: #fff !important;
    			border-top: 1px solid #b7b6b6 !important;
			}
			.menuAutoClose label.on {
    			background: url(/img/ico/ico_rdbox_on.gif) no-repeat left center;
			}
			.secondMenuAutoClose label.on {
    			background: url(/img/ico/menuAutoCloseImgOn.png) no-repeat left center;
    			background-position: -2px;
			}
			.secondMenuAutoClose label{
    			background: url(/img/ico/menuAutoCloseImgOff.png) no-repeat left center;
    			background-position: -2px;
			}
			/*2019-03-13 박길섭 시작*/
			.dbTabs3 a.on {
    			background: rgb(224, 88, 88) !important;
    			color: #fff !important;
    			border-top: 1px solid #b7b6b6 !important;
			}
			.dbTabs3 a {
    			background: #f1f1f1 !important;
			}
			/*2019-03-13 박길섭 끝*/
	 	 </style>

</head>
<body>
	<div id="wrap" >
		<!-- header // -->
		<header>
			<!-- Top Include -->
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>

		<!-- body -->
		<div class="containerBox">
			<div class="rela">
				<div class="sceneBox on" id="view1">
					<div class="sceneRela">
						<div class="toolBar">
							<h2 class="mainName" style="cursor: pointer;" onclick="javascript:$('#select_popup_layer').show();">기술업종 통계지도</h2>
							<div class="viewTitle">
								<span style="background: #0070c0;">VIEW 1</span>
							</div>
							<!-- 네비게이터 -->
							<div id="mapNavi_1"></div>

							<!-- 2017.12.12 [개발팀] -->
							<!-- <img id="tuto_start_btn" src="/img/tutorial/tuto_start_btn.png" alt="튜토리얼시작" style="cursor:pointer; display:block; position:absolute; margin-top:3px; right:300px;" onclick="readyTutorial();" title="사용법 따라하기" tabindex="91"> -->
							<!-- mng_s 20180412_김건민 -->
							<button type="button" id="tuto_start_btn" style=" border-radius: 1000px;	background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 26px; width: 120px; right: 411px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="javascrtipt:srvLogWrite('G1', '05', '01', '00', '', '생활업종 튜토리얼');javascrtipt:callTutorial('biz');" title="사용법 따라하기">생활업종 튜토리얼</button>
							<button type="button" id="tuto_start_btn_2" style="   border-radius: 1000px;	background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 26px; width: 120px; right: 411px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="javascript:srvLogWrite('G2', '07', '01', '00', '', '기술업종 튜토리얼');callTutorial('tech');" title="사용법 따라하기">기술업종 튜토리얼</button>
							<!-- mng_e 20180412_김건민 -->
							<div class="tb_right" id="btnList_1">
								<ul>
									<li><a onclick="javascript:srvLogWrite('G2', '07', '05', '00', '', '전체화면');$technicalBizMap.ui.doMaxSize(1);" class="tb_sizing" style="cursor: pointer;" title="전체 화면 확대" tabindex="92"><img src="/img/ico/ico_toolbars01.png" alt="전체 화면 확대"  /></a></li>
									<li><a onclick="javascript:$technicalBizMap.ui.doClearMap(1);" class="tb_clear" style="cursor: pointer;" title="초기화" tabindex="93"><img src="/img/ico/ico_toolbars02.png" alt="초기화" /></a></li>
									<li id="shareBtn"><a onclick="javascript:srvLogWrite('G2', '07', '04', '00', '', 'URL 공유하기');$technicalBizMap.ui.doShare(1);" style="cursor:pointer;" title="URL 공유하기" tabindex="94"><img src="/img/ico/ico_toolbars04.png" alt="URL 공유하기"></a></li>
									<li id="bookmarkBtn"><a onclick="javascript:srvLogWrite('G2', '07', '06', '00', '', '즐겨찾기');$galleryAdd.interactiveGalleryPopOpen();" style="cursor:pointer;" title="즐겨찾기로 저장하기" tabindex="95"><img src="/img/ico/ico_toolbars05.png" alt="즐겨찾기로 저장하기" /></a></li>
									<li><a onclick="javascript:srvLogWrite('G2', '07', '02', '00', '', '보고서 보기');$technicalBizMap.ui.reportDataSet(1);" class="tb_report" style="cursor: pointer;" title="보고서 보기" tabindex="96"><img src="/img/ico/ico_toolbars09.png" alt="보고서 보기" /></a></li>
<!-- 									<li><a onclick="javascript:$technicalBizMap.ui.doAddMap(1);" class="tb_mapAdd" style="cursor: pointer;"><img src="/img/ico/ico_toolbars07.png" alt="지도추가" /></a></li> -->
								</ul>
								<a onclick="javascript:$technicalBizMap.ui.doRemoveMap(1);" class="tb_close" style="cursor: pointer;" title="창닫기" tabindex="163"><img src="/img/um/btn_closel04.png" alt="창닫기" style="height: 34px;" /></a>
							</div>
						</div>
						<div class="interactiveBar">
							<!-- map topbar -->
							<p class="helperText"style="margin-left:240px">왼쪽 통계메뉴 버튼을 클릭하여 항목을 선택하고 통계버튼을 만드세요.</p>
							<!-- <a onclick="javascript:$('#select_popup_layer').show();"tabindex="98" style="height:15px; line-height:15px;">업종통계지도</a> -->
							<a onclick="javascript:window.open('/view/newhelp/tc_help_10_0', 'SGIS플러스 도움말');" tabindex="98"style="height:15px; line-height:15px;">이용법</a> <!-- 2017.12.12 [개발팀] 접근성  -->
							<a class="techHelper"onclick="javascript:srvLogWrite('G2', '07', '03', '00', '', '기술업종현황');helpPage();" tabindex="99"style="height:15px; line-height:15px;">기술업종현황</a>
							<a class="bizHelper"onclick="javascript:srvLogWrite('G1', '05', '02', '00', '', '생활업종현황');$('#help-indicator').show();" tabindex="99"style="height:15px; line-height:15px; display:none;">생활업종현황</a>
						</div>
						<!-- map topbar -->

						<div class="mapContents" id="mapRgn_1"></div>
						
						
						<!-- 맵영역 -->
						<div class="resizeIcon">
							<!-- 리사이즈 아이콘 -->
						</div>

					</div>
				</div>

				<div class="sceneBox" id="view2">
					<div class="sceneRela">
						<div class="toolBar">
							<div class="viewTitle">
								<span style="background: #9ed563;">VIEW 2</span>
							</div>
							<!-- 네비게이터 -->
							<div id="mapNavi_2"></div>

							<div class="tb_right" id="btnList_2">
								<div class="tb_radio tb_trade">
									<a onclick="javascript:$technicalBizMap.ui.doTradeMap(2, false);" class="fl" style="cursor: pointer;">체크1</a>
									<a onclick="javascript:$technicalBizMap.ui.doTradeMap(2, true);" class="fr" style="cursor: pointer;">체크2</a>
								</div>
								<ul>
									<li><a onclick="javascript:$technicalBizMap.ui.doMaxSize(2);" class="tb_sizing" style="cursor: pointer;"><img src="/img/ico/ico_toolbars01.png" alt="전체창" /></a></li>
									<li><a onclick="javascript:$technicalBizMap.ui.doClearMap(2);" class="tb_clear" style="cursor: pointer;"><img src="/img/ico/ico_toolbars02.png" alt="초기화" /></a></li>		
									<li style="display:none;"><a onclick="javascript:$technicalBizMap.ui.reportDataSet(2);" class="tb_report" style="cursor: pointer;"><img src="/img/ico/ico_toolbars09.png" alt="보고서출력" /></a></li>
<!-- 									<li><a onclick="javascript:$technicalBizMap.ui.doAddMap(2);" class="tb_mapAdd" style="cursor: pointer;"><img src="/img/ico/ico_toolbars07.png" alt="지도추가" /></a></li> -->
								</ul>
								<a onclick="javascript:$technicalBizMap.ui.doRemoveMap(2);" class="tb_close" style="cursor: pointer;"><img src="/img/um/btn_closel03.png" alt="창닫기" style="height: 34px;" /></a>
							</div>
						</div>
						<div class="interactiveBar">
							<!-- map topbar -->
							<p class="helperText">아래 메뉴버튼을 클릭하여 통계항목을 선택하고, 통계버튼을 만드세요</p>
						</div>
						<!-- map topbar -->

						<div class="mapContents" id="mapRgn_2"></div>
						<!-- 맵영역 -->
						<div class="resizeIcon">
							<!-- 리사이즈 아이콘 -->
						</div>

					</div>
				</div>

				<div class="sceneBox" id="view3">
					<div class="sceneRela">
						<div class="toolBar">
							<div class="viewTitle">
								<span style="background: #ff0066;">VIEW 3</span>
							</div>
							<!-- 네비게이터 -->
							<div id="mapNavi_3"></div>

							<div class="tb_right" id="btnList_3">
								<div class="tb_radio tb_trade">
									<a onclick="javascript:$technicalBizMap.ui.doTradeMap(2, false);" class="fl" style="cursor: pointer;">체크1</a>
									<a onclick="javascript:$technicalBizMap.ui.doTradeMap(2, true);" class="fr" style="cursor: pointer;">체크2</a>
								</div>
								<ul>
									<li><a onclick="javascript:$technicalBizMap.ui.doMaxSize(3);" class="tb_sizing" style="cursor: pointer;"><img src="/img/ico/ico_toolbars01.png" alt="전체창" /></a></li>
									<li><a onclick="javascript:$technicalBizMap.ui.doClearMap(3);" class="tb_clear" style="cursor: pointer;"><img src="/img/ico/ico_toolbars02.png" alt="초기화" /></a></li>
									<li style="display:none;"><a onclick="javascript:$technicalBizMap.ui.reportDataSet(3);" class="tb_report" style="cursor: pointer;"><img src="/img/ico/ico_toolbars09.png" alt="보고서출력" /></a></li>
<!-- 									<li><a onclick="javascript:$technicalBizMap.ui.doAddMap(3);" class="tb_mapAdd" style="cursor: pointer;"><img src="/img/ico/ico_toolbars07.png" alt="지도추가" /></a></li> -->
								</ul>
								<a onclick="javascript:$technicalBizMap.ui.doRemoveMap(3);" class="tb_close" style="cursor: pointer;"><img src="/img/um/btn_closel02.png" alt="창닫기" style="height: 34px;" /></a>
							</div>
						</div>
						<div class="interactiveBar">
							<!-- map topbar -->
							<p class="helperText">아래 메뉴버튼을 클릭하여 통계항목을 선택하고, 통계버튼을 만드세요</p>
						</div>
						<!-- map topbar -->

						<div class="mapContents" id="mapRgn_3"></div>
						<!-- 맵영역 -->
						<div class="resizeIcon">
							<!-- 리사이즈 아이콘 -->
						</div>

					</div>
				</div>


				<!-- 조회버튼 -->
		    	<a href="javascript:void(0)" class="sideQuick sq02" id="map_left_btn" tabindex="97">
		    		<span>통계메뉴</span>
		    		<img src="/SgisProject_Publisher/include/images/ico_totalmenu.gif" alt="통계메뉴" />
		    	</a>

				<!-- left menu -->
				<div class="leftArea">
					<!-- Top Include -->
					<jsp:include page="/view/technicalBiz/technicalBizLeftMenu"></jsp:include>
				</div>
				<!-- 2017.08.31  개발팀 추가 시작-->
				<div id="mapDataStandard" class="MapLegend right" style="display:none;">
				    <p>지도표시 기준</p>
				     <a id="standardButton" href="javascript:void(0);" class="switchBox">
				     	<!-- mng_s 20190402 김건민 -->
						<span class="txt on" id="company"></span>
						<span class="txt1" id="worker"></span>
						<!-- mng_e 20190402 김건민 -->
					</a>
				    <!-- <a id="standardButton" href="javascript:$technicalBizLeftMenu.ui.mapDataStandardChange()" class="switchBox">
						<span class="txt"></span>
						<span class="ball"></span>
					</a> -->
							
				    <!-- <ul>
				    	<li class="t01"><a href="javascript:$technicalBizLeftMenu.ui.mapDataStandardChange('company')">사업체</a></li>
				    	<li class="t02"><a href="javascript:$technicalBizLeftMenu.ui.mapDataStandardChange('worker')">종사자</a></li>
				    </ul> -->
				</div>
				<!-- 2017.08.31  개발팀 추가 완료 -->
				<!-- 데이터보드 -->
				<div id="dataBoard">
					<jsp:include page="/view/technicalBiz/technicalBizDataBoard"></jsp:include>
				</div>
				<!-- 데이터보드 end-->
				
				<!-- 창업지원시설 목록 - 정보 더보기 팝업 -->
	    		<div class="popSupport popUpSupply" style="display:none;left:400px;top:200px;">
					<div class="cont"> 
						<p class="dabSubj" id="instNmTxt">(재)장애인기업종합지원센터</p>
						<div class="mDetailArea">
							<div class="img"><img src="/img/tech/bg_dab01.png" alt="창업지원시설 목록" /></div>
							<div class="mCont"> 
								<table class="mContTable t01"> 
									<caption>창업지원시설 목록</caption>
									<colgroup>
										<col style="width:100px;" />
										<col style="width:auto;" />
									</colgroup>
									<tr>
										<th>입지유형</th><!-- lct_type -->
										<td id="Txt1">창업보육센터</td>
									</tr>
									<tr>
										<th>주력분야</th>
										<td id="Txt2">장애인 특하 창업보육</td>
									</tr>
									<tr>
										<th>지역</th>
										<td id="Txt3">서울특별시</td>
									</tr>
									<tr>
										<th>소재지</th>
										<td id="addrTxt">(우)150-800<br />서울특별시 영등포구 당산동1가 1-245 121-135 5층</td>
									</tr>
									<tr>
										<th>전화</th>
										<td id="telNoTxt">02-2181-5850</td>
									</tr>
									<tr>
										<th>팩스</th>
										<td id="Txt4">02-2181-5850</td>
									</tr>
									<tr>
										<th>홈페이지</th>
										<td id="urlTxt">www.debc.or.kr</td>
									</tr>
									<tr>
										<th>보유장비현황</th>
										<td id="Txt5">시각장애인 음성유도기, 휠체어 등 장애인 편의 시설완비</td>
									</tr>
									<tr>
										<th>센터</th>
										<td id="Txt6">-</td>
									</tr> 
								</table>
							</div>
						</div> 
						<div class="btnbox"> 
							<a href="javascript:void(0)" class="btnType02 w200" title="새창으로 열림">벤처창업입지114 이동</a>
						</div>
						<a href="javascript:void(0)" class="supClose" onclick="$('.popUpSupply').hide()"><img src="/img/ico/ico_close04.png" alt="닫기"></a>
					</div>
				</div>
				<!-- 창업지원시설 목록 - 정보 더보기 팝업 end -->
				
				<!-- 산업단지 목록 - 정보 더보기 팝업 -->
				<div class="dialogbox popUpIndustry" style="display:none;">
					<div class="dimbox">
						<div class="cont">
							<div class="dimAreaScroll">
								<div class="dimAreaBox">
									<p class="dabSubj" id="complexNmTxt">남동산업단지</p>
									<div class="mDetailArea">
										<div class="img"><img src="/img/tech/bg_dab01.png" alt="내용없음" /></div>
										<div class="mCont">
											<div class="tit">
												<span class="t01">1. 조성목적 및 특징</span>
											</div>
											<table class="mContTable"> 
												<caption>산업단지 조성목적 및 특징</caption> <!-- 2017.12.12 [개발팀] 접근성 조치 -->
												<tr>
													<td id="makePurpsChartrTxt"></td> 
												</tr> 
											</table> 
											<div class="tit mt20">
												<span class="t01">2. 사업시행자/관리기관</span>
											</div>
											<table class="mContTable"> 
												<caption>산업단지 사업시행자/관리기관</caption> <!-- 2017.12.12 [개발팀] 접근성 조치 -->
												<tr>
													<td id="implementerMgmtInstTxt"></td> 
												</tr> 
											</table> 
											<div class="tit mt20">
												<span class="t01">3. 위치</span>
											</div>
											<table class="mContTable"> 
												<caption>산업단지 위치</caption> <!-- 2017.12.12 [개발팀] 접근성 조치 -->
												<tr>
													<td id="lcTxt"></td> 
												</tr> 
											</table> 
											<div class="tit mt20">
												<span class="t01">4. 관리면적</span>
											</div>
											<table class="mContTable">
												<caption>산업단지 관리면적</caption> <!-- 2017.12.12 [개발팀] 접근성 조치 -->
												<colgroup>
													<col style="width:100px;" />
													<col style="width:auto;" />
													<col style="width:auto;" />
													<col style="width:auto;" />
													<col style="width:auto;" />
													<col style="width:auto;" />
													<col style="width:auto;" />
													<col style="width:auto;" />
												</colgroup>
												<tr class="ac">
													<th rowspan="2">관리면적<br />(건㎡)</th>
													<td>총면적</td>
													<td>산업시설구역</td>
													<td>지원시설구역</td>
													<td>공동시설구역</td>
													<td>녹지구역</td>
													<td>주거구역</td>
													<td>기타</td>
												</tr> 
												<tr class="ar">
													<td><span id="totAreaTxt">-</span></td>
													<td><span id="indutyFacZoneAreaTxt">-</span></td>
													<td><span id="upportFacZoneAreaTxt">-</span></td>
													<td><span id="pubFacZoneAreaTxt">-</span></td>
													<td><span id="greenZoneAreaTxt">-</span></td>
													<td><span id="residZoneAreaTxt">-</span></td>
													<td><span id="etcZoneAreaTxt">-</span></td>
												</tr> 
											</table>
											<div class="tit mt20">
												<span class="t01">5. 입지조건</span>
											</div>
											<table class="mContTable">
												<caption>산업단지 입지조건</caption> <!-- 2017.12.12 [개발팀] 접근성 조치 -->
												<colgroup>
													<col style="width:100px;" />
													<col style="width:auto;" />
												</colgroup>
												<tr>
													<th>입주업종</th>
													<td id="mvnBizTxt"></td>
												</tr> 
												<tr>
													<th>입주자격</th>
													<td id="mvnQualfTxt"></td>
												</tr>
												<tr>
													<th>입주제한</th>
													<td id="mvnLimitTxt"></td>
												</tr>
											</table>
										</div>
									</div> 
								</div>
								<div class="btnbox"><a href="javascript:$technicalBizDataBoardApi.request.selectComplexDetailInfo();" class="btnType02 w200">해당지역 상세정보 보기</a></div>
							</div>
						</div>
						<a href="javascript:void(0)" class="dimClose" onclick="$('.popUpIndustry').hide();"><img src="/img/ico/ico_close06.png" alt="닫기"></a>
					</div>
				</div>
				<!-- 산업단지 목록 - 정보 더보기 팝업 end -->
				
				<!-- 2017.11.07 개발팀 추가 -->
				<!-- 지역비교 시작 -->
				<div class="dialogbox searchArea" id="searchAreaBox" style="display:none;">
					<div class="policyWriteBox areaType01">
	   					<div class="bar">
	   						<span>지역비교 방법 선택하기</span>
	   						<div class="pnBox">
	   							<span class="num on">1</span>
		   						<span class="num">2</span>
		   						<span class="num">3</span>
	   						</div>
	   						<a href="javascript:$('#searchAreaBox').hide();void(0);"><img src="/img/ico/ico_close05.png" alt="데이터보드 닫기" /></a>
	   					</div>
	   					<div class="policywContents">
	    					<div class="selCont">
	    						<ul class="selList" id="searchAreaBoxSelList">
		    						<li>
		    							<a href="javascript:$('#searchAreaBoxSelList > li > a').removeClass('on');$('#searchAreaBoxSelList > li:eq(0) > a').addClass('on');void(0);" class="on">
		    								<span class="t01">선택지역 직접 비교하기</span>
		    								<img src="/img/statsPotal/ico_compare01.png" alt="선택지역 직접 비교하기" />
		    								<span class="t02">검색된 지역 리스트에서 <br />지역을 직접 선택하여 <br />상세정보를 비교할 수 있습니다.</span>
		    							</a>
		    						</li>
		    						<li>
		    							<a href="javascript:$('#searchAreaBoxSelList > li > a').removeClass('on');$('#searchAreaBoxSelList > li:eq(1) > a').addClass('on');void(0);">
		    								<span class="t01">지역 필터링 하여 비교하기</span>
		    								<img src="/img/statsPotal/ico_compare02.png" alt="지역 필터링 하여 비교하기" />
		    								<span class="t02">지역별 규모에 따라 상대적인 <br />지역 통계지표를 설정하여 <br />해당 지역의 상세정보를 비교할 수 있습니다.</span>
		    							</a>
		    						</li>
		    					</ul>
	    					</div>
    						<a href="javascript:$technicalBizMap.ui.areaSelectSearch(1);void(0);" class="btnDef01">다음</a> 
	   					</div>
	   				</div>  
   				</div>
   				
   				<!-- 지역비교방법 선택 -->
   				<div class="dialogbox areaZoneSelect" id="areaZoneSelect" style="display:none;">
					<div class="policyWriteBox areaType01">
	   					<div class="bar">
	   						<span>지역비교 방법 선택하기</span>
	   						<div class="pnBox">
	   							<span class="num">1</span>
		   						<span class="num on">2</span>
		   						<span class="num">3</span>
	   						</div>
	   						<a href="javascript:$('#areaZoneSelect').hide();void(0);"><img src="/img/ico/ico_close05.png" alt="데이터보드 닫기" /></a>
	   					</div>
	   					<div class="policywContents">
	   			   
	    				<p class="selText01">검색된 총 15개 시군구 중 최대 5개 지역을 선택하여 비교할 수 있습니다</p>
	    				<div class="selListArea">
		    				<ul class="selList01" id="areaZoneSelectList">
		    					
		    				</ul>
		    			</div>
    					<div class="selItemListBox" style="">
    						<ul class="selList02">
    							<!-- <li><a id="selTextBox_0"  data-id="selText_0"><span style="line-height:75px;">지역선택 1</span></a></li>
    							<li><a id="selTextBox_1"  data-id="selText_1"><span style="line-height:75px;">지역선택 2</span></a></li>
    							<li><a id="selTextBox_2"  data-id="selText_2"><span style="line-height:75px;">지역선택 3</span></a></li>
    							<li><a id="selTextBox_3"  data-id="selText_3"><span style="line-height:75px;">지역선택 4</span></a></li>
    							<li><a id="selTextBox_4"  data-id="selText_4"><span style="line-height:75px;">지역선택 5</span></a></li> -->
    						</ul>
    					</div>
	   					<a href="javascript:$technicalBizMap.ui.selectAreaCompare();" class="btnDef01" style="margin-top:10px;">해당지역 비교하기</a> 
				   		</div>
   					</div>
   				</div>
   				
   				<!-- 지역 필터링 설정하기 -->
   				<div class="dialogbox areaFilterSelect" id="areaFilterSelect" style="display:none;">
					<div class="policyWriteBox areaType01">
	   					<div class="bar">
	   						<span>지역 필터링 설정하기</span>
	   						<div class="pnBox">
	   							<span class="num">1</span>
		   						<span class="num on">2</span>
		   						<span class="num">3</span>
	   						</div>
	   						<a href="javascript:$('#areaFilterSelect').hide();"><img src="/img/ico/ico_close05.png" alt="데이터보드 닫기" /></a>
	   					</div>
	   					<div class="policywContents">
	    					<p class="selText01">검색된 총 15개 시군구 중 아래 통계지표를 활용해 해당 시군구를 찾을 수 있습니다.
	    					<br />통계지표는 표준점수를 활용한 17개 시도별 상대적 기준으로 졍렬됩니다.</p>	    		
	    					<div class="filterBox01">
	    						<span class="tit">(1)<br />기<br />준<br />선<br />택</span>
	    						<div class="fbSelArea">		
	    							<a href="javascript:void(0)" class="on" id="selAreaCountry">226개 시군구 평균</a>
	    							<div class="cont">
	    								<div class="mapItem" style="background:url(/img/tech/sggpic.png)no-repeat center;"></div>
	    								<p>226개 시군구를 <span>전국</span> 
											<br />평균값을 기준으로 
											<br />지수화 하여 검색
	    								</p>
	    							</div>
	    						</div>
	    						<a href="javascript:void(0)" class="tooltipBox01" title="Z-Score를 활용해 전국의 평균 값을 기준값 5로 두고, 해당지역의 통계지표 값을 0~10 사이 상대값으로 지수화한 점수 입니다."><img src="/img/ico/ico_tooltip01.png" alt="도움말"/></a>
	    			
	    						<div class="fbSelArea">
	    							<a href="javascript:void(0)" class="" id="selAreaSido">17개 시도별 평균</a>
	    							<div class="cont">
	    								<div class="mapItem" style="background:url(/img/tech/sidopic.png)no-repeat center;"></div>
	    								<p>226개 시군구를 <span>각 시도별 </span> 
											<br />평균값을 기준으로 
											<br />지수화 하여 검색
	    								</p>
	    							</div>
	    						</div>
	    						<a href="javascript:void(0)" class="tooltipBox02" title="Z-Score를 활용해 각각 시도별 평균 값을 기준값 5로 두고, 해당지역의 통계지표 값을 0~10 사이 상대값으로 지수화한 점수 입니다."><img src="/img/ico/ico_tooltip01.png" alt="도움말" /></a>
	    					</div>
	    					<div class="filterBox02">
	    						<span class="tit">(2)<br />통<br />계<br />지<br />표<br />설<br />정</span>
	    						<div class="filterList01" id="sliderRange1">
	    							<div class="chkbox">
										<input type="checkbox" id="chk01" name="filterOption" />
										<label for="chk01">인구 통계</label>
									</div>
    								<div class="rangBox">
    									<ul>
    										<li>0</li>
    										<li>1</li>
    										<li>2</li>
    										<li>3</li>
    										<li>4</li>
    										<li>5</li>
    										<li>6</li>
    										<li>7</li>
    										<li>8</li>
    										<li>9</li>
    										<li>10</li>
    									</ul>	
    									<div class="item"></div>
    										<p>각시도별 평균</p>
    								</div>
    								<span class="val01" id="fromChk01"></span>
    								<span class="val02" id="toChk01"></span>
	    						</div>
	    		
	    						<div class="filterList01" id="sliderRange2">
	    							<div class="chkbox">
										<input type="checkbox" id="chk02" name="filterOption" />
										<label for="chk02">면적 통계</label>
									</div>
    								<div class="rangBox">
    									<ul>
    										<li>0</li>
    										<li>1</li>
    										<li>2</li>
    										<li>3</li>
    										<li>4</li>
    										<li>5</li>
    										<li>6</li>
    										<li>7</li>
    										<li>8</li>
    										<li>9</li>
    										<li>10</li>
    									</ul>	
    									<div class="item"></div>
    									<p>각시도별 평균</p>
    								</div>
    								<span class="val01" id="fromChk02"></span>
    								<span class="val02" id="toChk02"></span>
	    						</div>
	    		
	    						<div class="filterList01" id="sliderRange3">
	    							<div class="chkbox">
										<input type="checkbox" id="chk03" name="filterOption" />
										<label for="chk03">지가변동률</label>
									</div>
    								<div class="rangBox">
    									<ul>
    										<li>0</li>
    										<li>1</li>
    										<li>2</li>
    										<li>3</li>
    										<li>4</li>
    										<li>5</li>
    										<li>6</li>
    										<li>7</li>
    										<li>8</li>
    										<li>9</li>
    										<li>10</li>
    									</ul>	
    									<div class="item"></div>
    										<p>각시도별 평균</p>
    								</div>
    								<span class="val01" id="fromChk03"></span>
    								<span class="val02" id="toChk03"></span>
	    						</div>
	    						<div class="filterList01" id="sliderRange4">
	    							<div class="chkbox">
										<input type="checkbox" id="chk04" name="filterOption" />
										<label for="chk04">재정자립도</label>
									</div>
    								<div class="rangBox">
    									<ul>
    										<li>0</li>
    										<li>1</li>
    										<li>2</li>
    										<li>3</li>
    										<li>4</li>
    										<li>5</li>
    										<li>6</li>
    										<li>7</li>
    										<li>8</li>
    										<li>9</li>
    										<li>10</li>
    									</ul>	
    									<div class="item"></div>
    										<p>각시도별 평균</p>
    								</div>
    								<span class="val01" id="fromChk04"></span>
    								<span class="val02" id="toChk04"></span>
	    						</div>
	    					</div>
    						<a href="javascript:$technicalBizMap.ui.areaFilterSearch();" class="btnDef01 mt20">해당지역 비교하기</a> 
	   					</div>
	   				</div>  
   				</div>
   				
   				<!-- 지역 상세정보 비교하기 -->
   				<div class="dialogbox areaDetailInfo" style="display:none;" id="areaDetailInfo">
					<div class="policyWriteBox areaType">
	   					<div class="bar">
	   						<span>지역 상세정보 비교하기</span>
	   						<div class="pnBox">
	   							<span class="num">1</span>
		   						<span class="num">2</span>
		   						<span class="num on">3</span>
	   						</div>
	   						<a href="javascript:$('#areaDetailInfo').hide();void(0);"><img src="/img/ico/ico_close05.png" alt="데이터보드 닫기" /></a>
	   					</div> 
	   					<div class="policywContents">
	    					<div class="mgBox">
	    						<div class="dbTabs" id="areaInfoSelect">
	    							<!-- 2018.01.18 [개발팀] 아이디 추가 -->
									<a id="compositeChart" href="javascript:$technicalBizMap.ui.areaTotalInfoResult('11',0)" class="on">종합 통계 정보</a>
									<a id="detailChart" href="javascript:$technicalBizMap.ui.areaDetailInfoResult('11',0,'0','0')">상세 통계 정보</a> 
								</div>
		    					<div class="dbTabs type01" id="searchTechCdList">
									<a href="javascript:$technicalBizMap.ui.areaTechCdChageResult('11',0);" class="on">첨단기술</a>
									<a href="javascript:$technicalBizMap.ui.areaTechCdChageResult('12',1);">고기술</a>
									<a href="javascript:$technicalBizMap.ui.areaTechCdChageResult('13',2);">중기술</a>
									<a href="javascript:$technicalBizMap.ui.areaTechCdChageResult('14',3);">저기술</a>
									<a href="javascript:$technicalBizMap.ui.areaTechCdChageResult('21',4);">창의ㆍ디지털</a>
									<a href="javascript:$technicalBizMap.ui.areaTechCdChageResult('22',5);">ICT</a>
									<a href="javascript:$technicalBizMap.ui.areaTechCdChageResult('23',6);">전문서비스</a> 
								</div> 
	    					</div>
	    					<!-- chart1 start -->
	    					<div class="mgCont" id="compareChart1">
	    						<div class="cItem">
	    							<p>지역 특성 정보_첨단기술</p>
	    							<div class="chtBox" id="chtBox01"></div>	    				
	    							<ul class="mgLegendList" id="areaDetailInfoAdmList1">
	    								<li>&nbsp;</li>
	    								<li class="c00">시도별  평균</li>
	    								<li>&nbsp;</li>
	    								<li class="c01">경기도 시흥시</li>
	    								<li class="c02">경기도 시흥시</li>
	    								<li class="c03">경기도 시흥시</li>
	    								<li class="c04">경기도 시흥시</li>
	    								<li class="c05">경기도 시흥시</li>
	    							</ul>
	    						</div>
	    						<div class="cItem">
	    							<p>입지계수 정보_첨단기술</p>
	    							<div class="chtBox" id="chtBox02"></div>
	    							<ul class="mgLegendList" id="areaDetailInfoAdmList2">
	    								<li class="c01">경기도 시흥시</li>
	    								<li class="c02">경기도 시흥시</li>
	    								<li class="c03">경기도 시흥시</li>
	    								<li class="c04">경기도 시흥시</li>
	    								<li class="c05">경기도 시흥시</li>
	    							</ul>
	    						</div>
	    						<div class="cItem">
	    							<p>증감 추이_첨단기술</p>
	    							<div class="chtBox" id="chtBox03"></div>
	    							<ul class="mgLegendList" id="areaDetailInfoAdmList3">
	    								<li class="c01">경기도 시흥시</li>
	    								<li class="c02">경기도 시흥시</li>
	    								<li class="c03">경기도 시흥시</li>
	    								<li class="c04">경기도 시흥시</li>
	    								<li class="c05">경기도 시흥시</li>
	    							</ul>
	    						</div>
	    					</div>
	    					<!-- chart1 end -->
	    					
	    					<!-- chart2 start -->
	    					<div class="mgCont t01" id="compareChart2">
	    						<div class="cItem">
	    							<p>창업지원시설 현황</p>
	    							<div class="chtBox">
	    								<div class="chtBar"  id="chtBar01"></div>
	    								<span>단위:개</span>
	    							</div>
	    						</div>
	    						<div class="cItem">
	    							<p>산업단지 현황</p>
	    							<div class="chtBox">
	    								<div class="chtBar"  id="chtBar02"></div>
	    								<span>단위:개</span>
	    							</div>
	    						</div>
	    						<div class="cItem">
	    							<p>기술업종 통계 현황</p>
	    							<div class="chtBox">
	    								<div class="dbTabs" id="searchOptionTab1">
	    									<a href="javascript:$technicalBizMap.ui.areaDetailChangeResult1(0);" class="on">사업체</a>
	    									<a href="javascript:$technicalBizMap.ui.areaDetailChangeResult1(1);">종사자</a> 
	    								</div>
	    								<div class="chtBar"  id="chtBar03"></div>
	    								<span>단위:개</span>
	    							</div>
	    						</div>
	    						<div class="cItem">
	    							<p>지역 통계 현황</p>
	    								<div class="chtBox">
	    									<div class="dbTabs" id="searchOptionTab2">
	    										<a href="javascript:$technicalBizMap.ui.areaDetailChangeResult2(0);" class="on">인구</a>
	    										<a href="javascript:$technicalBizMap.ui.areaDetailChangeResult2(1)">면적</a>
	    										<a href="javascript:$technicalBizMap.ui.areaDetailChangeResult2(2)">지가변동률</a>
	    										<a href="javascript:$technicalBizMap.ui.areaDetailChangeResult2(3)">재정자립도</a> 
	    									</div>
	    									<div class="chtBar"  id="chtBar04"></div>
	    									<span>단위:개</span>
	    								</div>
	    						</div>
	    					</div>
	    					<!-- chart2 end  -->
	    					
	    					<!-- legend page -->
	    					<div id="legendPage_count" style="margin-left:20px;font-size:20px;"></div>
	    					<div id="legendPage" style="height:100px;margin-top:20px"> <!-- 2018.01.22 [개발팀] -->
	    						
	    					</div>
	    					<!-- legendPageEnd -->
	   					</div>
	   				</div>  
   				</div>
				<!-- 2017.11.07 개발팀 추가 종료 -->
				
			</div>
		</div>
		

		<!-- footer// -->
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom/hidden"></jsp:include>
		</footer>
	</div>
	
	<script>
			// 2016. 04. 21 j.h.Seok 수정
			 //트위터
			window.twttr = (function(d, s, id) {
				  var js, fjs = d.getElementsByTagName(s)[0],
				    t = window.twttr || {};
				  if (d.getElementById(id)) return t;
				  js = d.createElement(s);
				  js.id = id;
				  js.src = "https://platform.twitter.com/widgets.js";
				  fjs.parentNode.insertBefore(js, fjs);
				 
				  t._e = [];
				  t.ready = function(f) {
				    t._e.push(f);
				  };
				 
				  return t;
			}(document, "script", "twitter-wjs"));
			
			window.fbAsyncInit = function() {
			    FB.init({
			      appId      : '893451250742184', //'893451250742184'(상용),//'1516531411965359'(이전),
			      xfbml      : true,
			      version    : 'v2.5'//'v2.4'
			    });
			};

			 //페이스북
			window.facebook =(function(d, s, id){
			     var js, fjs = d.getElementsByTagName(s)[0];
			     if (d.getElementById(id)) {return;}
			     js = d.createElement(s); js.id = id;
			     js.src = "https://connect.facebook.net/ko_KR/sdk.js";
			     fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
			
		</script>
	
	<!-- 생활업종현황 도움말 -->
	<jsp:include page="/view/technicalBiz/technicalBizHelper"></jsp:include>
	
	<!-- 갤러리 등록 및 즐겨찾기 -->
	<jsp:include page="/view/technicalBiz/gallaryDialog"></jsp:include>
	
	<!-- 공유팝업  -->
	<div id="sharedlg" class="galleryPopBox" style="display:none; z-index:20001;">
		<div class="topbar">
			<span>조회한 통계결과  URL공유하기</span>
				<a onclick="javascript:$technicalBizMap.ui.doCancel('sharedlg');">닫기</a>
			</div>
		<div class="popContents">
			<ul class="listFormPop">
				<li>
					<label for="urlsubj" class="label">URL 내용 :</label>
					<input type="text" id="urlsubj" class="inp" readonly=readonly />
				</li>
				<li>
					<div style="width:100%;margin:auto 0">
						<table style="margin:auto;width:270px;height:30px;margin-top:10px">
							<tr style="height:30px;line-height:1px;">
								<td style="vertical-align:middle;"> <!-- 2017.12.12 [개발팀] 접근성 조치 -->
									<a href="javascript:$technicalBizMap.ui.shareToKakaoStory();" style="margin-left:10px;"><img src="/img/im/kakao.png" alt="카카오스토리"></a>
								</td>
								<td style="vertical-align:middle;"> <!-- 2017.12.12 [개발팀] 접근성 조치 -->
									<div id="twitterDiv" style="margin-left:25px;"></div>
										<!-- <a class='twitter-share-button' href='//twitter.com/share' data-count='none'>twitter</a> -->
								</td>
								<td style="vertical-align:middle;"> <!-- 2017.12.12 [개발팀] 접근성 조치 -->
									<div id="facebookDiv"></div>
								</td>
							</tr>
						</table>
					</div>
				</li>
			</ul>
			<p class="txt">SGIS+plus 사용자간 통계조회 결과의<br />자유로운 열람이 가능합니다.</p>
			<div class="btnBox">
				<a onclick="javascript:$technicalBizMap.ui.doDone('sharedlg');" class="btnStyle01">URL 복사하기</a>
				<a onclick="javascript:$technicalBizMap.ui.doCancel('sharedlg');" class="btnStyle01">닫기</a>
			</div>
		</div>
	</div>
					
	<!-- 북마크 팝업  -->
	<div id="bookmarkdlg" class="popBox" style="display: none; z-index: 20001;">
		<div class="topbar">
			<span>조회한 통계결과 My Page 저장하기</span> 
			<a onclick="javascript:$technicalBizMap.ui.doCancel('bookmarkdlg');">닫기</a>
		</div>
		<div class="popContents">
			<ul class="listFormPop">
				<li>
					<label for="savesubj" class="label">저장제목 :</label> 
					<input type="text" id="savesubj" class="inp" maxlength="100" />
				</li>
				<li id="caseInput" style="display: none;">
					<span class="label">공개여부</span> <input type="checkbox" id="openShare" />
					<label for="openShare" class="mr20">SGIS+plus 활용사례 공유</label>
				</li>
			</ul>
			<div id="caseHelper" style="display: none;">
				<p class="txt">조회결과 저장기간은 2개월 까지며,<br />조회결과 공개여부에 따라 SGIS+plus 사용자간<br />데이터의 자유로운 열람이 가능합니다.</p>
				<p class="txt">저장된 내용을 활용사례로 공유시 저장기간을 연장할 수<br /> 있습니다.</p>
			</div>
			<div class="btnBox">
				<a onclick="javascript:$technicalBizMap.ui.doDone('bookmarkdlg');" class="btnStyle01">My Page 저장</a> 
				<a onclick="javascript:$technicalBizMap.ui.doCancel('bookmarkdlg');" class="btnStyle01">닫기</a>
			</div>
		</div>
	</div>
	
	<div id="myGalleryPop" style="display: none; z-index: 20000;" class="popBox">
		<div class="topbar">
			<span>갤러리 등록 및 즐겨찾기</span>
			<a href="javascript:void(0)">닫기</a>
		</div>
		<div class="popContents">
			<p class="txt1">
				검색한 데이터로 갤러리를 등록 하시겠습니까?<br />즐겨찾기 하시겠습니까?
			</p>
			<div class="btnBox">
				<a href="javascript:$galleryAdd.interactiveGalleryPopHide();$galleryAdd.interactiveMyGalleryDialogPopOpen();" class="btnGtype">갤러리 등록</a> 
				<a href="javascript:$technicalBizMap.ui.doBookMark(1, 'TECH');" class="btnGtype">즐겨찾기</a> 
				<a onclick="javascript:$('#myGalleryPop').hide();" class="btnGtype">취소</a> <!-- 2017.02.23 -->
			</div>
		</div>
	</div>
	


	
	<!-- tutorial -->
	<!-- 20180524 leekh draggable="false" 삭제 -->
	<div class="popWrapper" style= "display: none">
		<img id="tt_bg_16" src="/img/tutorial/technicalBiz/bg_16.png" alt="지도" style="position:absolute; top:15px; left:300px; display: none;" />
		<img id="tt_bg_17" src="/img/tutorial/technicalBiz/bg_17.png" alt="지도" style="position:absolute; top:15px; left:300px; display: none;" draggable="false">
		<img id="tt_bg_18" src="/img/tutorial/technicalBiz/bg_18.png" alt="지도" style="position:absolute; top:15px; left:300px; display: none;" />
		<img id="tt_bg_19" src="/img/tutorial/technicalBiz/bg_19.png" alt="지도" style="position:absolute; top:15px; left:300px; display: none;" />
		<img id="tt_bg_20" src="/img/tutorial/technicalBiz/bg_20.png" alt="지도" style="position:absolute; top:15px; left:300px; display: none;" />
		<img id="tt_bg_21" src="/img/tutorial/technicalBiz/bg_21.png" alt="지도" style="position:absolute; top:15px; left:300px; display: none;" />
				
		<img id="tt_ls_btn_2" src="/img/tutorial/technicalBiz/ls_btn_2.png" alt="지역찾기 버튼" style="position:absolute; top:450px; left:610px; display: none;" />
		<img id="tt_ls_btn_3" src="/img/tutorial/technicalBiz/ls_btn_3.png" alt="지역찾기 버튼" style="position:absolute; top:143px; left:341px; display: none;" />
		<img id="tt_ls_btn_4" src="/img/tutorial/technicalBiz/ls_btn_4.png" alt="지역찾기 버튼" style="position:absolute; top:231px; left:620px; display: none;" />
		<img id="tt_ls_btn_5" src="/img/tutorial/technicalBiz/ls_btn_5.png" alt="지역찾기 버튼" style="position:absolute; top:552px; left:610px; display: none;" />
		<img id="tt_ls_btn_6" src="/img/tutorial/technicalBiz/ls_btn_6.png" alt="지역찾기 버튼" style="position:absolute; top:55px; left:797px; display: none;" />
		<img id="tt_ls_btn_7" src="/img/tutorial/technicalBiz/ls_btn_7.png" alt="지역찾기 버튼" style="position:absolute; top:12px; left:1264px; display: none;" />
		<img id="tt_ls_btn_8" src="/img/tutorial/technicalBiz/ls_btn_8.png" alt="지역찾기 버튼" style="position:absolute; top:12px; left:1042px; display: none;" />
		

		<img id="toPoint_2_1" src="/img/tutorial/toPoint_2.png" alt="포인터" style="position:absolute; display:none; z-index:20002;" draggable="false">

		<img id="toPoint_2_1" src="/img/tutorial/toPoint_2.png" alt="포인터" style="position:absolute; display:none; z-index:20002;"/>
	</div>
	<div class="tutorialWrapper" style= "display: none" >
		<!-- mng_s 20180412_김건민 -->
		<button type="button" id="tuto_start_btn" style="   border-radius: 1000px;	background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 27px; width: 154px; right: 411px; top:104px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="tec_closeTutorial();" title="기술업종 튜토리얼 종료">기술업종 튜토리얼 종료</button>
		<!-- mng_e 20180412_김건민 -->
		<img id="rightControlImg" src="/img/tutorial/rightControlImg.png" alt="우측퀵버튼" style="display:none; position:absolute; top:103px; right:1px; z-index:10002;" />
		
		<div id="headerTutorial" style="width:90%; height:135px;">
			<div id="tutorialText" draggable="false">
				<!-- mng_s 20180412_김건민 -->
				<img id="tuto_end_btn" src="/img/tutorial/tuto_end_btn_01.png" alt="튜토리얼종료" style="float: right; position: relative; width:13px; height:13px; top: 10px; left: -10px;  opacity:10.6; cursor:pointer; text-indent:-2000px;" onclick="tec_closeTutorial();" draggable="false">
				<!-- mng_e 20180412_김건민 -->
			</div>
		</div>

		<!-- 메뉴  -->
		<img id="tt_menu_0" src="/img/tutorial/technicalBiz/tecDetailImg1.png" alt="통계메뉴" style="position:absolute; top:132px; left:-5px; z-index:1px; display: none; border-radius:10px;" draggable="false">
		<img id="tt_menu_1" src="/img/tutorial/technicalBiz/tecMainButtonImg1.png" alt="시도별 기술업종 현황" style="position:absolute; top:244px; left:-3px; display: none;" draggable="false">
		<img id="tt_menu_2" src="/img/tutorial/technicalBiz/tecMainButtonImg2.png" alt="시군구 기술업종 현황" style="position:absolute; top:286px; left:2px; display: none;" draggable="false">
		<img id="tt_menu_2_1" src="/img/tutorial/technicalBiz/menu_2_1.png" alt="기술혁신정도(4종)" style="position:absolute; top:260px; left:86px; display: none; border-radius:20px;" draggable="false">
		<img id="tt_menu_2_2" src="/img/tutorial/technicalBiz/menu_2_2.png" alt="고기술업종" style="position:absolute; top:337px; left:89px; display: none;" draggable="false">
		<img id="tt_menu_3" src="/img/tutorial/technicalBiz/tecMainButtonImg3.png" alt="업종밀집도 변화" style="position:absolute; top:343px; left:-3px; display: none;" draggable="false">
		<img id="tt_menu_3_1" src="/img/tutorial/technicalBiz/menu_3_1.png" alt="전체현황" style="position:absolute; top:220px; left:86px; display: none; border-radius:20px;" draggable="false">
		<img id="tt_menu_3_2" src="/img/tutorial/technicalBiz/menu_3_2.png" alt="기술업종 전체현황" style="position:absolute; top:262px; left:92px; display: none;" draggable="false">
		<img id="tt_menu_4" src="/img/tutorial/technicalBiz/tecMainButtonImg4.png" alt="업종별 입지계수 지도" style="position:absolute; top:406px; left:-1px; display: none;" draggable="false">
		<img id="tt_menu_4_1" src="/img/tutorial/technicalBiz/menu_4_1.png" alt="기술혁신정도(4종)" style="position:absolute; top:219px; left:85px; display: none; border-radius:20px;" draggable="false">
		<img id="tt_menu_4_2" src="/img/tutorial/technicalBiz/menu_4_2.png" alt="첨단기술업종" style="position:absolute; top:263px; left:87px; display: none;" draggable="false">
		<img id="tt_menu_5" src="/img/tutorial/technicalBiz/tecMainButtonImg5.png" alt="조건별지역찾기" style="position:absolute; top:479px; left:-3px; display: none;" draggable="false">
		<img id="tt_menu_5_1" src="/img/tutorial/technicalBiz/menu_5_1.png" alt="조건별지역찾기" style="position:absolute; top:492px; left:97px; display: none;" draggable="false">
		<img id="tt_menu_5_2" src="/img/tutorial/technicalBiz/menu_5_2.png" alt="조건별지역찾기" style="position:absolute; top:492px; left:236px; display: none;" draggable="false">
		<img id="tt_menu_5_3" src="/img/tutorial/technicalBiz/menu_5_3.png" alt="조건별지역찾기" style="position:absolute; top:867px; left:345px; display: none;" draggable="false">
		<img id="tt_menu_5_4" src="/img/tutorial/technicalBiz/menu_5_4.png" alt="조건별지역찾기" style="position:absolute; bottom:7px; left:285px; display: none;" draggable="false">
		<img id="tt_menu_6" src="/img/tutorial/technicalBiz/tecMainButtonImg6.png" alt="지원시설 조회" style="position:absolute; top:548px; left:-3px; display: none;" draggable="false">
		<img id="tt_menu_7" src="/img/tutorial/technicalBiz/tecMainButtonImg7.png" alt="산업단지 조회" style="position:absolute; top:613px; left:0px; display: none;" draggable="false">
		
		<!-- 범례 -->
		<img id="tt_legend_1" src="/img/tutorial/technicalBiz/tt_legend_1.png" alt="범례" style="display:none; position:absolute; bottom:10px; left:10px; z-index:10002;" draggable="false">
		<img id="tt_legend_2" src="/img/tutorial/technicalBiz/tt_legend_2.png" alt="범례" style="display:none; position:absolute; bottom:10px; left:10px; z-index:10002;" draggable="false">
		<img id="tt_legend_3" src="/img/tutorial/technicalBiz/tt_legend_3.png" alt="범례" style="display:none; position:absolute; bottom:10px; left:10px; z-index:10002;" draggable="false">
		<img id="tt_legend_4" src="/img/tutorial/technicalBiz/tt_legend_4.png" alt="범례" style="display:none; position:absolute; bottom:10px; left:10px; z-index:10002;" draggable="false">
		<img id="tt_legend_5" src="/img/tutorial/technicalBiz/tt_legend_5.png" alt="범례" style="display:none; position:absolute; bottom:10px; left:10px; z-index:10002;" draggable="false">
		<img id="tt_legend_6" src="/img/tutorial/technicalBiz/tt_legend_6.png" alt="범례" style="display:none; position:absolute; bottom:10px; left:10px; z-index:10002;" draggable="false">
		<img id="tt_legend_7" src="/img/tutorial/technicalBiz/tt_legend_7.png" alt="범례" style="display:none; position:absolute; bottom:10px; left:10px; z-index:10002;" draggable="false">
		<img id="tt_legend_8" src="/img/tutorial/technicalBiz/tt_legend_8.png" alt="범례" style="display:none; position:absolute; bottom:10px; left:10px; z-index:10002;" draggable="false">
		<img id="tt_legend_9" src="/img/tutorial/technicalBiz/tt_legend_9.png" alt="범례" style="display:none; position:absolute; bottom:10px; left:10px; z-index:10002;" draggable="false">
		<img id="tt_legend_10" src="/img/tutorial/technicalBiz/tt_legend_10.png" alt="범례" style="display:none; position:absolute; bottom:10px; left:10px; z-index:10002;" draggable="false">
		<img id="tt_legend_11" src="/img/tutorial/technicalBiz/tt_legend_11.png" alt="범례" style="display:none; position:absolute; bottom:10px; left:10px; z-index:10002;" draggable="false">
		
		<!-- 소개 --> 
		<img id="tt_introduce_1" src="/img/tutorial/technicalBiz/introduce_1.png" alt="팝업" style="position:absolute; top:160px; left:400px;" draggable="false">
		<img id="tt_introduce_2" src="/img/tutorial/technicalBiz/introduce_2.png" alt="팝업" style="position:absolute; top:160px; left:400px; display: none;" draggable="false">
		<img id="tt_introduce_3" src="/img/tutorial/technicalBiz/introduce_3.png" alt="팝업" style="position:absolute; top:160px; left:400px; display: none;" draggable="false">
		<img id="tt_introduce_btn_00" src="/img/tech/tt_introduce_btn_00.png" alt="팝업 버튼" style="position:absolute; top:142px; left:170px;" draggable="false">
		<img id="tt_introduce_btn_1" src="/img/tech/btn_intro02.png" alt="팝업 버튼" style="position:absolute; top:189px; left:1150px;" draggable="false">
		<img id="tt_introduce_btn_2" src="/img/tech/btn_intro01.png" alt="팝업 버튼" style="position:absolute; top:189px; left:1202px; display: none;" draggable="false">
		<img id="tt_introduce_btn_3" src="/img/ico/ico_close06.png"  alt="팝업 버튼" style="position:absolute; top:157px; left:1265px; display: none;" draggable="false">
		
		<!-- 배경 -->
		<img id="tt_bg_1" src="/img/tutorial/technicalBiz/bg_1.png" alt="지도" style="position:absolute; top:136px; left:0px; display: none;" draggable="false">
		<img id="tt_bg_2" src="/img/tutorial/technicalBiz/bg_2.png" alt="지도" style="position:absolute; top:136px; left:0px; display: none;" draggable="false">
		<img id="tt_bg_3" src="/img/tutorial/technicalBiz/bg_3.png" alt="지도" style="position:absolute; top:136px; left:0px; display: none;" draggable="false">
		<img id="tt_bg_4" src="/img/tutorial/technicalBiz/bg_4.png" alt="지도" style="position:absolute; top:136px; left:0px; display: none;" draggable="false">
		<img id="tt_bg_5" src="/img/tutorial/technicalBiz/bg_5.png" alt="지도" style="position:absolute; top:136px; left:0px; display: none;" draggable="false">
		<img id="tt_bg_6" src="/img/tutorial/technicalBiz/bg_6.png" alt="지도" style="position:absolute; top:136px; left:0px; display: none;" draggable="false">
		<img id="tt_bg_7" src="/img/tutorial/technicalBiz/bg_7.png" alt="지도" style="position:absolute; top:136px; left:0px; display: none;" draggable="false">
		<img id="tt_bg_8" src="/img/tutorial/technicalBiz/bg_8.png" alt="지도" style="position:absolute; top:136px; left:0px; display: none;" draggable="false">
		<img id="tt_bg_9" src="/img/tutorial/technicalBiz/bg_9.png" alt="지도" style="position:absolute; top:136px; left:0px; display: none;" draggable="false">
		<img id="tt_bg_10" src="/img/tutorial/technicalBiz/bg_10.png" alt="지도" style="position:absolute; top:136px; left:1px; display: none;" draggable="false">
		<img id="tt_bg_11" src="/img/tutorial/technicalBiz/bg_11.png" alt="지도" style="position:absolute; top:136px; left:0px; display: none;" draggable="false">
		<img id="tt_bg_12" src="/img/tutorial/technicalBiz/bg_12.png" alt="지도" style="position:absolute; top:136px; left:0px; display: none;" draggable="false">
		<img id="tt_bg_13" src="/img/tutorial/technicalBiz/bg_13.png" alt="지도" style="position:absolute; top:136px; left:0px; display: none;" draggable="false">
		<img id="tt_bg_14" src="/img/tutorial/technicalBiz/bg_14.png" alt="지도" style="position:absolute; top:136px; left:0px; display: none;" draggable="false">
		<img id="tt_bg_15" src="/img/tutorial/technicalBiz/bg_15.png" alt="지도" style="position:absolute; top:136px; left:0px; display: none;" draggable="false">
		

		
		<img id="tt_bg_22" src="/img/tutorial/technicalBiz/bg_22.png" alt="지도" style="position:absolute; top:136px; left:0px; display: none;" draggable="false">
		<img id="tt_bg_23" src="/img/tutorial/technicalBiz/bg_23.png" alt="지도" style="position:absolute; top:136px; left:0px; display: none;" draggable="false">
		<img id="tt_bg_24" src="/img/tutorial/technicalBiz/bg_24.png" alt="지도" style="position:absolute; top:136px; left:0px; display: none;" draggable="false">
		<img id="tt_bg_25" src="/img/tutorial/technicalBiz/bg_25.png" alt="지도" style="position:absolute; top:136px; left:0px; display: none;" draggable="false">
		<img id="tt_bg_26" src="/img/tutorial/technicalBiz/bg_26.png" alt="지도" style="position:absolute; top:136px; left:0px; display: none;" draggable="false">
		
		<!-- 데이터보드 -->
		<img id="tt_sido_board_1" src="/img/tutorial/technicalBiz/sido_board_1.png" alt="시도 데이터보드" style="position:absolute; top:137px; right:0px; display: none; z-index:10002;" draggable="false">
		<img id="tt_sido_board_2" src="/img/tutorial/technicalBiz/sido_board_2.png" alt="시도 데이터보드" style="position:absolute; top:137px; right:0px; display: none; z-index:10002;" draggable="false">
		
		<img id="tt_sigungu_board_1" src="/img/tutorial/technicalBiz/sigungu_board_1.png" alt="시군구 데이터보드" style="position:absolute; top:136px; right:0px; display: none; z-index:10002;" draggable="false">
<!-- 		<img id="tt_sigungu_board_1_1" src="/img/tutorial/technicalBiz/sigungu_board_1_1.png" alt="시군구 데이터보드" style="position:absolute; top:136px; right:0px; display: none; z-index:10002;" draggable="false"> -->
		<img id="tt_sigungu_board_2" src="/img/tutorial/technicalBiz/sigungu_board_2.png" alt="시군구 데이터보드" style="position:absolute; top:136px; right:0px; display: none; z-index:10002;" draggable="false">
		<img id="tt_sigungu_board_3" src="/img/tutorial/technicalBiz/sigungu_board_3.png" alt="시군구 데이터보드" style="position:absolute; top:136px; right:0px; display: none; z-index:10002;" draggable="false">
		
		<img id="tt_lq_board_1" src="/img/tutorial/technicalBiz/lq_board_1.png" alt="입지계수 데이터보드" style="position:absolute; top:136px; right:0px; display: none; z-index:10002;" draggable="false">
		<img id="tt_lq_board_2" src="/img/tutorial/technicalBiz/lq_board_2.png" alt="입지계수 데이터보드" style="position:absolute; top:136px; right:0px; display: none; z-index:10002;" draggable="false">
		
		<img id="tt_ls_board_1" src="/img/tutorial/technicalBiz/ls_board_1.png" alt="지역찾기 데이터보드" style="position:absolute; top:136px; right:0px; display: none; z-index:10002;" draggable="false">
		<img id="tt_ls_board_2" src="/img/tutorial/technicalBiz/ls_board_2.png" alt="지역찾기 데이터보드" style="position:absolute; top:136px; right:0px; display: none; z-index:10002;" draggable="false">
		
		<img id="tt_density_board_1" src="/img/tutorial/technicalBiz/density_board_1.png" alt="업종밀집도 데이터보드" style="position:absolute; top:136px; right:0px; display: none; z-index:10002;" draggable="false">
		<img id="tt_density_board_2" src="/img/tutorial/technicalBiz/density_board_2.png" alt="업종밀집도 데이터보드" style="position:absolute; top:136px; right:0px; display: none; z-index:10002;" draggable="false">
		<img id="tt_density_board_3" src="/img/tutorial/technicalBiz/density_board_3.png" alt="업종밀집도 데이터보드" style="position:absolute; top:136px; right:0px; display: none; z-index:10002;" draggable="false">
		<img id="tt_density_board_4" src="/img/tutorial/technicalBiz/density_board_4.png" alt="업종밀집도 데이터보드" style="position:absolute; top:136px; right:0px; display: none; z-index:10002;" draggable="false">
		<img id="tt_density_board_4_1" src="/img/tutorial/technicalBiz/density_board_4_1.png" alt="업종밀집도 데이터보드" style="position:absolute; top:136px; right:0px; display: none; z-index:10002;" draggable="false">
		<img id="tt_density_board_5" src="/img/tutorial/technicalBiz/density_board_5.png" style="position:absolute; top:136px; right:0px; display: none;" draggable="false">
		
		<img id="tt_supply_board_1" src="/img/tutorial/technicalBiz/supply_board_1.png" alt="지원시설 데이터보드" style="position:absolute; top:136px; right:0px; display: none; z-index:10002;" draggable="false">
		<img id="tt_supply_board_2" src="/img/tutorial/technicalBiz/supply_board_2.png" alt="지원시설 데이터보드" style="position:absolute; top:136px; right:0px; display: none; z-index:10002;" draggable="false">

		<img id="tt_industry_board_1" src="/img/tutorial/technicalBiz/industry_board_1.png" alt="산업단지 데이터보드" style="position:absolute; top:136px; right:0px; display: none; z-index:10002;" draggable="false">
		<img id="tt_industry_board_2" src="/img/tutorial/technicalBiz/industry_board_2.png" alt="산업단지 데이터보드" style="position:absolute; top:136px; right:0px; display: none; z-index:10002;" draggable="false">
		
		
		
		<!-- 시도 버튼 -->
		<img id="tt_sido_btn_1" src="/img/tutorial/technicalBiz/sido_btn_1.png" alt="시도 버튼" style="position:absolute; top:430px; left:507px; display: none; z-index:10001;" draggable="false">
		<img id="tt_sido_btn_2" src="/img/tutorial/technicalBiz/sido_btn_2.png" alt="시도 버튼" style="position:absolute; top:490px; left:465px; display: none; z-index:10003;" draggable="false">
		<img id="tt_sido_btn_3" src="/img/tutorial/technicalBiz/sido_btn_3.png" alt="시도 버튼" style="position:absolute; top:428px; left:507px; display: none; z-index:10003;" draggable="false">
		<img id="tt_sido_btn_4" src="/img/tutorial/technicalBiz/sido_btn_4.png" alt="시도 버튼" style="position:absolute; top:269px; right:2px; display: none; z-index:10003;" draggable="false">
		
		<!-- 시군구 버튼 -->
		<img id="tt_sigungu_btn_1" src="/img/tutorial/technicalBiz/sigungu_btn_1.png" alt="시군구 버튼" style="position:absolute; top:480px; left:464px; display: none; z-index:10001;" draggable="false">
		<img id="tt_sigungu_btn_2" src="/img/tutorial/technicalBiz/sigungu_btn_2.png" alt="시군구 버튼" style="position:absolute; top:241px; right:5px; display: none; z-index:10003;" draggable="false">
<!-- 		<img id="tt_sigungu_btn_3" src="/img/tutorial/technicalBiz/sigungu_btn_3.png" alt="시군구 버튼" style="position:absolute; top:750px; right:383px; display: none; z-index:10003;" draggable="false"> -->
		
		<!-- 팝업이미지 -->
		<img id="tt_pop_btn_1" src="/img/tutorial/technicalBiz/tecDetailImg2.png" alt="시군구 데이터보드" style="position:absolute; top:133px; right:557px; display: none; z-index:10002;" draggable="false">
		<img id="tt_pop_btn_2" src="/img/tutorial/technicalBiz/tecDetailImg3.png" alt="시군구 데이터보드" style="position:absolute; top:136px; right:554px; display: none; z-index:10002;" draggable="false">
		
		<!-- 업종밀집도변화 버튼 -->
		<img id="tt_density_btn_1" src="/img/tutorial/technicalBiz/density_btn_1.png" alt="업종밀집도 버튼" style="position:absolute; top:292px; left:490px; display: none; z-index:10001;" draggable="false">
		<img id="tt_density_btn_2" src="/img/tutorial/technicalBiz/density_btn_2.png" alt="업종밀집도 버튼" style="position:absolute; top:418px; left:568px; display: none; z-index:10001;" draggable="false">
		<img id="tt_density_btn_3" src="/img/tutorial/technicalBiz/density_btn_3.png" alt="업종밀집도 버튼" style="position:absolute; top:277px; right:82px; display: none; z-index:10003;" draggable="false">
		<img id="tt_density_btn_4" src="/img/tutorial/technicalBiz/density_btn_4.png" alt="업종밀집도 버튼" style="position:absolute; bottom:136px; left:105px; display: none; z-index:10002;" draggable="false">
		<img id="tt_density_btn_5" src="/img/tutorial/technicalBiz/density_btn_5.png" alt="업종밀집도 버튼" style="position:absolute; top:748px; right:464px; display: none; z-index:10002;" draggable="false">
		
		<!-- 입지계수 버튼 -->
		<img id="tt_lq_btn_1" src="/img/tutorial/technicalBiz/lq_btn_1.png" alt="입지계수 버튼" style="position:absolute; top:637px; left:608px; display: none; z-index:10001;" draggable="false">
		<img id="tt_lq_btn_2" src="/img/tutorial/technicalBiz/lq_btn_2.png" alt="입지계수 버튼" style="position:absolute; top:606px; left:539px; display: none; z-index:10001;" draggable="false">
		
		<!-- 조건별 지역찾기 -->
		<img id="tt_ls_btn_1" src="/img/tutorial/technicalBiz/ls_btn_1.png" alt="지역찾기 버튼" style="position:absolute; top:542px; right:212px; display: none; z-index:10002;" draggable="false">
		<img id="tt_ls_btn_9" src="/img/tutorial/technicalBiz/ls_btn_9.png" alt="지역찾기 버튼" style="position:absolute; top:675px; right:15px; display: none; z-index:10002;" draggable="false">
		
		
		<!-- 지원시설조회 버튼 -->
		<img id="tt_supply_btn_1" src="/img/tutorial/technicalBiz/supply_btn_1.png" alt="지원시설 버튼" style="position:absolute; top:522px; left:371px; display: none;" draggable="false">
		
		<!-- 산업단지조회 버튼 -->
		<img id="tt_industry_btn_1" src="/img/tutorial/technicalBiz/industry_btn_1.png" alt="산업단지 버튼" style="position:absolute; top:599px; left:441px; display: none;" draggable="false">
		
		<img id="toPoint_1" src="/img/tutorial/toPoint_1.png" alt="포인터" draggable="false">
		<img id="toPoint_2" src="/img/tutorial/toPoint_2.png" alt="포인터" draggable="false">
		<img id="toPoint_3" src="/img/tutorial/toPoint_3.png" alt="포인터" draggable="false">
		<img id="toPoint_4" src="/img/tutorial/toPoint_4.png" alt="포인터" draggable="false">
				
		<img id="addPoint_1" src="/img/tutorial/toPoint_1.png" alt="포인터" draggable="false"/>
	</div>
	
	<!-- <div style="height:50px;">
		<div class="heatRadiusSlider heatSlider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
			<a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 62.8571%;"></a>
		</div>
		<div class="heatRadiusText heatInputText">27</div>
		<ul class="heatGuage" style="margin-top:5px;">
			<li style="margin-top:5px;">5</li>
			<li style="margin-right:10px;float:right;margin-top:5px;">40</li>
		</ul>
	</div> -->
	
</body>
</html>