<%
/**************************************************************************************************************************
* Program Name  : 창업통계맵 JSP  
* File Name     : bizStatsMap.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.List" %> 
<%@ page import="org.json.JSONObject" %> 
<%@ page import="org.json.JSONArray" %> 

<%
	String strType = "";
	String paramObj = "";
	try {
		Map map = (Map)request.getAttribute("paramInfo");
		strType = (String)map.get("type");
		if ( strType != null  ){  
			strType = strType.replaceAll("<","&lt;");  
			strType = strType.replaceAll(">","&gt;"); 
		}
		if (strType.equals("bookmark")   		|| 
			strType.equals("sharedata")  		||
			strType.equals("totalindex") 		||
			strType.equals("population") 		||
			strType.equals("company") 	 		||
			strType.equals("household")	 		||
			strType.equals("house")		 		||
			strType.equals("farmhousehold") 	||
			strType.equals("forestryhousehold") ||
			strType.equals("fisheryhousehold") 	||
			strType.equals("householdmember") 	||
			strType.equals("kosis")				||
			strType.equals("recentdata")		||
			strType.equals("userdata")) {
			paramObj = (String)map.get("paramObj");
		}
		if ( paramObj != null  ){  
			paramObj = paramObj.replaceAll("<","&lt;");  
			paramObj = paramObj.replaceAll(">","&gt;"); 
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
	    <title>우리동네 생활업종 | 통계지리정보서비스</title>
		<!-- 업종선택 -->
        <script  src="/sample2/include/js/select.js"></script><!--박길섭 추가 -->
		<link href="/css/common.css" rel="stylesheet" type="text/css" />
	    <link href="/css/default.css" rel="stylesheet" type="text/css" />
	    <link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
	    <link href="/css/wheelcolorpicker.css" rel="stylesheet" type="text/css" />
	    <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
	    <link href="/css/map/interactiveFunc.css" rel="stylesheet" type="text/css" /> 
	    <link href="/css/map/bizStatsHelper.css" rel="stylesheet" type="text/css" />
<!-- 		<link rel='shortcut icon' href='/img/ico/n_favicon.png'/>	   -->
	  
	    <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
	    <link rel="stylesheet" href="/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
	    <link rel="stylesheet" type="text/css" href="/js/plugins/colorpicker/css/colpick.css">
	    <link rel="stylesheet" type="text/css" href="/css/map/bxslider.css">
	    <link rel="stylesheet" href="/css/popup.css">
	    <script  src="/js/plugins/jquery.min.js"></script>
	    <script  src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>  
	    <script  src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>  
	    <script  src="/js/plugins/colorpicker/js/colpick.js"></script>
	    <script  src="/js/plugins/jquery.wheelcolorpicker.js"></script>
	    <script  src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	    <script  src="/js/plugins/EasyTree/jquery.easytree.js"></script> 
	    <script  src="/js/plugins/colResizable-1.5.min.js"></script> 
	    <script  src="/js/plugins/store.min.js"></script>
	    <script  src="/js/plugins/highcharts/highcharts.js"></script>
	    <script  src="/js/plugins/highcharts/highcharts-3d.src.js"></script>
	    <script  src="/js/plugins/highcharts/highcharts-more.js"></script>
	    <script  src="/js/plugins/highcharts/modules/exporting.js"></script>
	    <script  src="/js/plugins/btoa.js"></script>
	    <script  src="/js/plugins/highcharts/highchart.drag.js"></script>
	    
	    <!-- 2016.03.23 j.h.Seok -->
<!-- 	    <link rel="stylesheet" type="text/css" href="/css/handsontable.css"> -->
<!-- 	    <script  src="/js/plugins/handsontable.js"></script> -->
	    <link rel="stylesheet" type="text/css" href="/css/handsontable.full.css">
	    <script  src="/js/plugins/handsontable.full.js"></script>
	    
		<script  src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
		<script  src="/js/plugins/jquery.sha256.js"></script>
		<script  src="/js/plugins/durian-v2.0.js"></script>
		<script  src="/js/common/sop.portal.absAPI.js"></script>	    
	    <script  src="/js/common/map.js"></script>
	    <script  src="/js/common/common.js"></script>
	    <script  src="/js/common/themeCdCommon.js"></script> <!-- 2020년 SGIS고도화 3차(테마코드) - 테마코드 공통기능 js 추가 (pse)-->
	    <script  src="/js/common/mapNavigation.js?version=20210506"></script>
	    <script  src="/js/common/mapInfo/publicDataBoard.js"></script>
		<script  src="/js/common/mapInfo/mydataDataBoard.js"></script>
		<script  src="/js/plugins/libs/jquery.bxslider.min.js"></script>
	   	<script  src="/js/bizStats/bizStatsMap.js?version=20210507"></script>
	    <script  src="/js/bizStats/bizStatsMapApi.js"></script>
	    <script  src="/js/bizStats/bizStatsLeftMenu.js?version=20210507"></script>
		<script  src="/js/bizStats/bizStatsDataBoard.js"></script>
		<script  src="/js/bizStats/bizStatsDataBoardApi.js?version=20211008"></script>
	    <script  src="/js/interactive/interactiveMapBtn.js"></script>
	    <script  src="/js/common/mapInfo/bookmarkAndShareInfo.js"></script>
	     <!-- 사용자지정 컨트롤  -->
		<script  src="/js/thematicMap/thematicMap_api.js"></script>
	    <script  src="/js/common/mapDraw/Draw.Feature.js"></script>
        <script  src="/js/common/mapDraw/Draw.Control.Manager.js"></script>
        <script  src="/js/common/mapDraw/draw/Draw.Cricle.js"></script>
        <script  src="/js/common/mapDraw/draw/Draw.Rectangle.js"></script>
        <script  src="/js/common/mapDraw/draw/Draw.Polygon.js"></script>
        <script  src="/js/common/mapDraw/Draw.Control.Overlay.js"></script>
        <script  src="/js/common/mapDraw/measure/Draw.AreaMeasure.js"></script>
        <script  src="/js/common/mapDraw/measure/Draw.DistanceMeasure.js"></script>
        <script  src="/js/common/mapDraw/Draw.Control.Distance.js"></script>
        <script  src="/js/common/mapDraw/Draw.Control.Poi.js"></script>
        <script  src="/js/common/mapDraw/poi/Poi.InteractiveMap.js"></script>
        <script  src="/js/common/mapDraw/Draw.Control.Measure.js"></script>
        
        <script  src="/js/board/jquery.paging.js"></script>
        <script  src="/js/common/mapInfo/legendInfo.js"></script>
        
		<!-- 생활업종 통계지도 퍼블리싱 CSS 추가 -->
	    <link rel="stylesheet" type="text/css" href="/css/map/bizStats.css">
	    
	    <script   src="/js/interactive/kakao_script_api.js"></script>
	    
	     <!-- 통계갤러리 -->
        <script  src="/js/plugins/slick.min.js"></script>  
		<script  src="/js/plugins/jquery.tagsinput.min.js"></script>
	    <link rel="stylesheet" type="text/css" href="/sample2/include/css/gallery_pop.css" />
    	<script  src="/js/gallery/galleryEtc.js"></script>
        <script  src="/js/plugins/imageCapture/rgbcolor.js"></script>
        <script  src="/js/plugins/imageCapture/canvg.js"></script>
        <script  src="/js/plugins/imageCapture/html2canvas.js"></script>
        <script  src="/js/plugins/imageCapture/html2canvas.svg.js"></script> <!-- 2017.03.14 svg 이슈 -->
        <!-- 튜토리얼 -->
        <link rel="stylesheet" href="/css/tutorial/tutorial.css">
       	<script  src="/js/bizStats/bizStatsTutorial.js"></script>
       	<script src="/js/technicalBiz/technicalBizTutorial.js"></script>
	   	<link rel="stylesheet" type="text/css" href="/SgisProject_Publisher/include/css/bizStats-popup.css"><!--박길섭 추가  -->
		
		<%-- <link href="<c:url value='/css/common/left.css' />" rel="stylesheet" type="text/css" />
		<link href="<c:url value='/css/common/data_board.css' />" rel="stylesheet" type="text/css" />
		 --%>
		<link href="<c:url value='/css/common/data_board.css' />" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="/sample2/include/css/gallery_pop.css" />
		<link rel="stylesheet" href="/css/popup.css">
		<script src="/js/technicalBiz/technicalBizMapApi.js"></script>
		<script>
		
       		$(document).ready(
       			function() {       				       				
       				$(".buttonBar.ui-draggable").css("left","-1000px");
       				<%
       					String biz=request.getParameter("biz");
       					if ( biz != null  ){  
       						biz = biz.replaceAll("<","&lt;");  
       						biz = biz.replaceAll(">","&gt;"); 
       					}
       				%> 
       				switch(<%=biz%>){
    					case 0:
    							if(commonPopupObj.getCookie("select_popup_layer") == "done" ){ // 첫화면 접속시, '한달안보기'==true 상태이면
								$("#select_popup_layer").hide();
								$(".quickBox.step00").stop().animate({"left":"0px"},200);
	    						}else{
	    							$("#select_popup_layer").show();
	    						}
    							
    							break;
    					case 1: 
    							//$(".leftArea").show();
    							//document.location.href='bizStatsLeftMenu.js';
    							//$("#map_left_btn").trigger("click");
    							$bizStatsLeftMenu.ui.setDetailStatsPanel('intro');
    							break;
    					case 2: 
    							//$("#map_left_btn").trigger("click");
    							$bizStatsLeftMenu.ui.setDetailStatsPanel('jobChange');
								break;
    					case 3: 
    							//$("#map_left_btn").trigger("click");
    							$bizStatsLeftMenu.ui.setDetailStatsPanel('jobArea');
    							break;
    					case 4: 
    							//$("#map_left_btn").trigger("click");
    							$bizStatsLeftMenu.ui.setDetailStatsPanel('lqMap');
    							break;
    					case 5: 
    							//$("#map_left_btn").trigger("click");
    							$bizStatsLeftMenu.ui.setDetailStatsPanel('areaSearch');
    							break;
    					case 6: 
    							//$("#map_left_btn").trigger("click");
    							$bizStatsLeftMenu.ui.setDetailStatsPanel('areaInfo');
								break;
    					case 7: 
    							//$("#map_left_btn").trigger("click");
    							$bizStatsLeftMenu.ui.setDetailStatsPanel('jobOpen');
								break;
    					case 8: 
    							//$("#map_left_btn").trigger("click");
    							$bizStatsLeftMenu.ui.setDetailStatsPanel('jobBest');
								break;
    					case 10:
    							//$(".nav-list li").eq(0).find("a").addClass("on");
    							$bizStatsLeftMenu.ui.setDetailStatsPanel('intro');
        						$(".sq02").trigger("click");
        						break;
    					case 11:
								//$(".nav-list li").eq(0).find("a").addClass("on");
								$(".sq02").trigger("click");
    							break;
    					case 12: 
    							helpPage();
    							break;		
    					default:
    							$(".sq02").trigger("click");//2019-03-12 박길섭
//     							window.open(popUrl);
    						 	//$("#body").load("bizStatsMap-popup.html");
    							//$("#select_popup_layer").show();
    							//$(".sq02").trigger("click");
    							break;
    				}
    				
					//$("#HOuse_Index_Info").show();
    				/* $("#popup_layer").append("<div class=\"title\">"
					+ "<p><span style=\"margin-left:5px;\">우리동네 생활업종 첫 사용을 환영합니다!</span></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">우리동네 생활업종</strong>은 음식점 등 36종의 주요 생활업종에 대해 지역별 통계를 보여줍니다.</strong><br>"
					+ "우리동네에 대해 더 자세히 알고 싶을 때, 생활업종의 전망을 알고 싶을 때,또는 창업 시 입지선정까지 다방면으로 활용하실 수 있습니다.<br>"
					+ "먼저 전체적인 경향성을 살펴보겠습니다. <strong style=\"color:#ee7c1a;  font-weight:bold;\">통계메뉴를 클릭해 주세요.</strong>"
					+ "</p></div>"); */
    				
    				//$("#Blackbg").show(); 
    				
    				//document.location.href="/view/technicalBiz/technicalBizMap";
    				// mng_s 20180412_김건민 
//    				if(getCookie("confirmMsg") == ""){
//	       				$(".Popup_Info").hide();
//   					readyTutorial();
//    				}
    				// mng_e 20180412_김건민 
	       			if($(location).attr('search').match("tutorial_mode")){
	       				$(".Popup_Info").hide();
	    				biz_readyTutorial();
	       			}
// 					if($bizStatsMap.ui.getCookie("confirmMsg") == ""){
// 	       				$(".Popup_Info").hide();
//     					$bizStatsMap.ui.readyTutorial();
//     				}
// 	       			if($(location).attr('search').match("tutorial_mode")){
// 	       				$(".Popup_Info").hide();
// 	    				$bizStatsMap.ui.startTutorial();
// 	       			}
    				
    				//북마크나 최신데이터는 조건설정창을 자동으로 열지않는다.
<%--     				if ("<%=strType%>" != "bookmark"   		  &&  --%>
<%--     					"<%=strType%>" != "recentdata" 		  &&  --%>
<%--     					"<%=strType%>" != "userdata"   		  &&  --%>
<%--     					"<%=strType%>" != "sharedata"  		  && --%>
<%--     					"<%=strType%>" != "totalindex" 		  && --%>
<%--     					"<%=strType%>" != "population" 		  && --%>
<%--     					"<%=strType%>" != "company"    		  && --%>
<%--     					"<%=strType%>" != "household"  		  && --%>
<%--     					"<%=strType%>" != "house"      		  && --%>
<%--     					"<%=strType%>" != "farmhousehold" 	  && --%>
<%--     					"<%=strType%>" != "forestryhousehold" && --%>
<%--     					"<%=strType%>" != "fisheryhousehold"  && --%>
<%--     					"<%=strType%>" != "householdmember"   && --%>
<%--     					"<%=strType%>" != "kosis") { --%>
//     					$(".sideQuick.sq02").click();
//     				}
    				if("<%=strType%>" == "sharedata" || "<%=strType%>" == "bookmark"){
    					
    					//alert("[bizStatsMap.jsp] strType [" + "<%=strType%>");
    					//alert("[bizStatsMap.jsp] paramObj [" + <%=paramObj%>); //이걸 자바스크립트에서 찍어보면 paramObj값에 "가 들어가있어서 오류가 나는데 인지하기 어려우므로 sysout으로 찍어보기바람.
    					
	    				var param = null;
	    				var length = <%=paramObj.length()%>;
	    				if (length == 0) {
	    					param = "";
	    				}else {
	    					param = JSON.parse(<%=paramObj%>); //JSON.parse() 안에 파라미터 넣을때 "를 넣으면 오류가 나고 오류인지가 어려우므로 "를 넣지 않도록 주의바람
	    				}
	    				$bizStatsMap.ui.doAnalysisShareInfo("<%=strType%>", param);
    				}
	    		}
   			);
       		function helpPage(){
       			if( $(location).attr('search').match("tutorial_mode") == null ){
       				$('#help-indicator').show();
       			}
       		}  
   		    
		function callTutorial(sw){
			if(sw == "biz"){
				console.log("::::: biz ");
   				if(confirm("<생활업종 통계지도> \n처음 사용자를 위한 튜토리얼이 준비되어 있습니다.\n진행하시겠습니까?")) 
   					window.open('/view/bizStats/bizStatsMap?tutorial_mode', '_blank'); 
			} else {
				console.log("::::: tech ");
   				if(confirm("<기술업종 통계지도> \n처음 사용자를 위한 튜토리얼이 준비되어 있습니다.\n진행하시겠습니까?")) 
   					window.open('/view/technicalBiz/technicalBizMap?tutorial_mode', '_blank'); 
			}
		}  		
	 	 </script>
	 	 <style>
	 	 	.interactiveSelect{
	 	 		margin-top: 3px;
	 	 		margin-left: 190px;
	 	 	}
	 	 	.dscList .title{
	 	 		padding:0;
	 	 	}
	 	 	.dataSideBox .bar>a{
	 	 		top:10px;
	 	 		right:5px;
	 	 	}
	 	 	/* .dscList dt>a{font-family: "나눔고딕";color:#FFF;border-radius: 13px;background:#00bcd4 url(/img/ico/ico_down01.gif) no-repeat 505px center;}
			.dscList dt>a.on{font-family: "나눔고딕";color:#FFF;border-radius: 13px;background:#00bcd4 url(/img/ico/ico_up01.gif) no-repeat 505px center;}
			 */
			.toolBar {
   				border-top: 1px solid #d8dade;
    		}
    		.scrollBox{
    			height: calc(100% - 165px);
    			border-bottom: 0px; 
    		}
    		.qmdl{
    			border-bottom:0px;
    		}
    		#selectSidoSggMenu select{
				width:45%;
				margin-left: 50px;
    			margin-top: -39px;
    			font-size: 13px;
    			height:25px;
    			/* background: #fff url(/img/house/select_arrow.png) no-repeat right center; */
    			font-family: dotum,"돋움", sans-serif;
			}
			.selectSidoSggMenuCombo{
				margin-left: 15px;
			}
			.HouseMap h2{
				margin-left: 12px;
				width:255px;
			}
			.SetArea{
				width: 245px;
    			margin-left: 18px;
			}
			.condition {
    			display: block;
    			position: relative;
    			box-sizing: border-box;
    			margin-bottom: 0px;
    			border: 1px solid #d9dadf;
   				height: 46px;
    			width: 19%;
    			overflow: hidden;
			}
			/* .type01 {
   				width: 100%;
    			height: auto;
    			margin-bottom: 15px;
   				border: #ccc solid 1px;
    			border-radius: 5px;
			}
			.type01 a{
    			display: block;
    			text-align: center;
    			font-size: 12px;
    			border-left: #ccc solid 1px;
    			border-bottom: #ccc solid 1px;
    			background: #f2f2f2;
   				height: 22px;
    			padding-top: 5px;
    			color: #999;
			}
			.type01 ul li a.on{
   				background: #fff;
    			border-bottom: none;
    			color: #333;
			}
			.type01 ul li {
    			float: left;
    			width: 33.3%;
			} */
			.seoulBox, .areaBox {
    			font-size: 22px;
    			
    		}
			.bizLegendBox{
				opacity:1;
			}
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
			.dscList dt.mt15{
				font-size: 15px;
    			font-family: "나눔고딕";
			}
			dt>a{
				font-size: 15px;
    			font-family: "나눔고딕";
			}
			.dataSideBox .bar {
    			background: #e8771a;
			}
			.dbTabs.type01 a.on{
				color:#fff;
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
			.dbTabs.type02 a.on {
    			background: #313333;
    			border-top: 1px solid #b7b6b6;
			}
			.dbTabs.type02 a {
    			background: #f1f1f1;
    			border-top: 1px solid #b7b6b6;
    			border-bottom: 1px solid #b7b6b6;
			}
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
							<h2 class="mainName" style="cursor: pointer;" onclick="javascript:$('#select_popup_layer').show();">생활업종 통계지도</h2>
							<div class="viewTitle">
								<span style="background: #0070c0;">VIEW 1</span>
							</div>
					
							<!-- 네비게이터 -->
							<div id="mapNavi_1"></div>
		
							<div class="tb_right" id="btnList_1">
								<!-- <img id="tuto_start_btn" src="/img/tutorial/tuto_start_btn.png" alt="튜토리얼시작" style="cursor:pointer; display:block; position:absolute; margin-top:3px; right:415px;" onclick="readyTutorial();" title="사용법 따라하기"> -->
								<!-- mng_s 20180412_김건민 --> 
								<button type="button" id="tuto_start_btn" style="border-radius: 1000px;	background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 26px; width: 120px; right: 411px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="javascrtipt:callTutorial('biz');" title="사용법 따라하기">생활업종 튜토리얼</button>
								<button type="button" id="tuto_start_btn_2" style="display:none;border-radius: 1000px;	background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 26px; width: 120px; right: 411px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="javascript:srvLogWrite('G2', '07', '01', '00', '', '기술업종 튜토리얼'); callTutorial('tech');" title="사용법 따라하기">기술업종 튜토리얼</button>
							
								<!-- mng_e 20180412_김건민 -->
								<!-- 2019.04.19 박길섭 시작 -->
 								<span class="tb_inner" style="font-size: 12px;">사업체전개도</span> 
 								<div class="tb_radio tb_inner on" style="margin-right: 15px;"> 
 									<a onclick="javascript:$bizStatsMap.ui.doInnerMap(1);" style="cursor: pointer;" title="사업체전개도 토글" ></a> 
 								</div> <!-- 2019.04.19 박길섭 끝 -->
								<span class="tb_trade" style="font-size: 12px;">상권정보</span>
								<div class="tb_radio tb_trade on">
									<a onclick="javascript:$bizStatsMap.ui.doTradeMap(1);" style="cursor: pointer;" title="상권정보 토글" ></a>
								</div>
								<ul>
									<li><a onclick="javascript:$bizStatsMap.ui.doMaxSize(1);" class="tb_sizing" style="cursor: pointer;" title="전체 화면 확대" ><img src="/img/ico/ico_toolbars01.png" alt="전체 화면 확대" /></a></li>
									<li><a onclick="javascript:$bizStatsMap.ui.doClearMap(1);" class="tb_clear" style="cursor: pointer;" title="초기화" ><img src="/img/ico/ico_toolbars02.png" alt="초기화" /></a></li>
									<li id="bizStatsMapUrlShare"><a onclick="javascript:$bizStatsMap.ui.doShare(1);" style="cursor:pointer;" title="URL 공유하기"><img src="/img/ico/ico_toolbars04.png" alt="URL 공유하기"></a></li>
									<li id="bizStatsMapBookmark"><a onclick="javascript:$galleryAdd.interactiveGalleryPopOpen();" style="cursor:pointer;" title="즐겨찾기로 저장하기" ><img src="/img/ico/ico_toolbars05.png" alt="즐겨찾기로 저장하기"/></a></li>
									<li style="display:none;"><a onclick="javascript:srvLogWrite('G1', '11', '06', '00', '', '');$bizStatsMap.ui.reportDataSet(1);" class="tb_report" style="cursor: pointer;" title="보고서 보기" ><img src="/img/ico/ico_toolbars09.png" alt="보고서 보기" /></a></li>
								</ul>
								<a onclick="javascript:$bizStatsMap.ui.doRemoveMap(1);" class="tb_close" style="cursor: pointer;" title="창닫기" ><img src="/img/um/btn_closel04.png" alt="창닫기" style="height: 34px;" /></a>
							</div>
						</div>
						<div class="interactiveBar">
							<!-- map topbar -->
							<p class="helperText" style="margin-left: 240px">왼쪽 통계메뉴 버튼을 클릭하여 항목을 선택하고 통계버튼을 만드세요.</p>
							<!-- <a onclick="javascript:$('#select_popup_layer').show();">업종통계지도</a> -->
							<a onclick="javascript:window.open('/view/newhelp/so_help_10_0');">이용법</a>
							<a class="bizHelper" onclick="javascript:srvLogWrite('G1', '11', '03', '00', '', '생활업종현황');$('#help-indicator').show();">생활업종현황</a>
							<a class="techHelper" onclick="javascript:srvLogWrite('G2', '07', '03', '00', '', '기술업종현황');$('#technicalBiz_laypopup').show();" style="display:none;">기술업종현황</a>
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
									<a onclick="javascript:$bizStatsMap.ui.doTradeMap(2, false);" class="fl" style="cursor: pointer;">체크1</a>
									<a onclick="javascript:$bizStatsMap.ui.doTradeMap(2, true);" class="fr" style="cursor: pointer;">체크2</a>
								</div>
								<ul>
									<li><a onclick="javascript:$bizStatsMap.ui.doMaxSize(2);" class="tb_sizing" style="cursor: pointer;"><img src="/img/ico/ico_toolbars01.png" alt="전체창" /></a></li>
									<li><a onclick="javascript:$bizStatsMap.ui.doClearMap(2);" class="tb_clear" style="cursor: pointer;"><img src="/img/ico/ico_toolbars02.png" alt="초기화" /></a></li>		
									<li style="display:none;"><a onclick="javascript:$bizStatsMap.ui.reportDataSet(2);" class="tb_report" style="cursor: pointer;"><img src="/img/ico/ico_toolbars06.png" alt="보고서출력" /></a></li>
<!-- 									<li><a onclick="javascript:$bizStatsMap.ui.doAddMap(2);" class="tb_mapAdd" style="cursor: pointer;"><img src="/img/ico/ico_toolbars07.png" alt="지도추가" /></a></li> -->
								</ul>
								<a onclick="javascript:$bizStatsMap.ui.doRemoveMap(2);" class="tb_close" style="cursor: pointer;"><img src="/img/um/btn_closel03.png" alt="창닫기" style="height: 34px;" /></a>
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
									<a onclick="javascript:$bizStatsMap.ui.doTradeMap(2, false);" class="fl" style="cursor: pointer;">체크1</a>
									<a onclick="javascript:$bizStatsMap.ui.doTradeMap(2, true);" class="fr" style="cursor: pointer;">체크2</a>
								</div>
								<ul>
									<li><a onclick="javascript:$bizStatsMap.ui.doMaxSize(3);" class="tb_sizing" style="cursor: pointer;"><img src="/img/ico/ico_toolbars01.png" alt="전체창" /></a></li>
									<li><a onclick="javascript:$bizStatsMap.ui.doClearMap(3);" class="tb_clear" style="cursor: pointer;"><img src="/img/ico/ico_toolbars02.png" alt="초기화" /></a></li>
									<li style="display:none;"><a onclick="javascript:$bizStatsMap.ui.reportDataSet(3);" class="tb_report" style="cursor: pointer;"><img src="/img/ico/ico_toolbars06.png" alt="보고서출력" /></a></li>
<!-- 									<li><a onclick="javascript:$bizStatsMap.ui.doAddMap(3);" class="tb_mapAdd" style="cursor: pointer;"><img src="/img/ico/ico_toolbars07.png" alt="지도추가" /></a></li> -->
								</ul>
								<a onclick="javascript:$bizStatsMap.ui.doRemoveMap(3);" class="tb_close" style="cursor: pointer;"><img src="/img/um/btn_closel02.png" alt="창닫기" style="height: 34px;" /></a>
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
		     
		     	<div class="buttonBar">
			    	<a href="javascript:void(0)" class="sideQuick sq03 xw">
			    		<span>선택항목</span>
			    		<!-- <img src="/img/ico/ico_resultbtn.gif" alt="선택항목" />  -->				    		
			    	</a>
					<div class="sqListBox sq03">
						<div class="sqTabs">
							<!-- 
			    			<span>조회타입설정</span>
			    			<a href="javascript:$bizStatsLeftMenu.ui.changeFindingType(1);" id="statisbtn" class="on"><img src="/img/ico/ico_click.png" alt="통계버튼목록"></a>
				    		<a href="javascript:$bizStatsLeftMenu.ui.changeFindingType(2);" id="dragbtn" class=""><img src="/img/ico/ico_drag.png" alt="드래그앤드롭"></a>
				    		 -->  
			    		</div>
						<div id="searchBtnResultRgn" class="sqList">
							<ul></ul>
						</div>
					</div>
				</div>

				<!-- left menu -->
				<div class="leftArea" >
					<!-- Top Include -->
					<jsp:include page="/view/bizStats/bizStatsLeftMenu"></jsp:include>
				</div>
				<!-- 박길섭 -->
				<div id="mapDataStandard" class="MapLegend right" style="display:none;">
				    <p>지도정보 기준</p>
				    <a id="standardButton" href="javascript:void(0);" class="switchBox">
<!-- 				    <a id="standardButton" href="javascript:$bizStatsLeftMenu.ui.mapDataStandardChange()" class="switchBox"> -->
						<!-- mng_s 20190329 김건민 -->
						<span class="txt on" id="company"></span>
						<span class="txt1" id="worker"></span>
<!-- 						<span class="ball"></span> -->
						<!-- mng_e 20190329 김건민 -->
					</a>
							
				    <!-- <ul>
				    	<li class="t01"><a href="javascript:$technicalBizLeftMenu.ui.mapDataStandardChange('company')">사업체</a></li>
				    	<li class="t02"><a href="javascript:$technicalBizLeftMenu.ui.mapDataStandardChange('worker')">종사자</a></li>
				    </ul> -->
				</div>
				<!-- -->
				
				<!-- 데이터보드 -->
				<div id="dataBoard">
					<jsp:include page="/view/bizStats/bizStatsDataBoard"></jsp:include>
				</div>
				<!-- 데이터보드 end-->
				
				<!-- 갤러리 등록 및 즐겨찾기 -->
				<jsp:include page="/view/map/gallaryDialog"></jsp:include>
				
				<!-- 공유팝업  -->
		    	<div id="sharedlg" class="galleryPopBox" style="display:none; z-index:20001;">
					<div class="topbar">
						<span>조회한 통계결과  URL공유하기</span>
						<a onclick="javascript:$bizStatsMap.ui.doCancel('sharedlg');">닫기</a>
					</div>
					<div class="popContents">
						<ul class="listFormPop">
							<li>
								<label for="urlsubj" class="label">URL 내용 :</label>
								<input type="text" id="urlsubj" class="inp" readonly=readonly />
							</li>
							<li>
								<div style="width:100%;margin:auto 0">
									<table style="margin:auto;width:270px;height:30px;margin-top:10px" summary="URL공유하기 SNS 목록">
										<tr style="height:30px;line-height:1px;">
											<td valign="middle">
												<a href="javascript:$bizStatsMap.ui.shareToKakaoStory();" style="margin-left:10px;"><img src="/img/im/kakao.png" alt="카카오스토리"></a>
											</td>
											<td valign="middle">
												<div id="twitterDiv" style="margin-left:25px;">
													<!-- <a class='twitter-share-button' href='//twitter.com/share' data-count='none'>twitter</a> -->
												</div>
											</td>
											<td valign="middle">
												<div id="facebookDiv"></div>
											</td>
										</tr>
									</table>
								</div>
							</li>
						</ul>
						<p class="txt">SGIS+plus 사용자간 통계조회 결과의<br />자유로운 열람이 가능합니다.</p>
						<div class="btnBox">
							<a onclick="javascript:$bizStatsMap.ui.doDone('sharedlg');" class="btnStyle01">URL 복사하기</a>
							<a onclick="javascript:$bizStatsMap.ui.doCancel('sharedlg');" class="btnStyle01">닫기</a>
						</div>
					</div>
				</div>
				
				<!-- 북마크 팝업  -->
				<div id="bookmarkdlg" class="popBox"
					style="display: none; z-index: 20001;">
					<div class="topbar">
						<span>조회한 통계결과 My Page 저장하기</span> <a
							onclick="javascript:$bizStatsMap.ui.doCancel('bookmarkdlg');">닫기</a>
					</div>
					<div class="popContents">
						<ul class="listFormPop">
							<li><label for="savesubj" class="label">저장제목 :</label> <input
								type="text" id="savesubj" class="inp" maxlength="100" /></li>
							<li id="caseInput" style="display: none;"><span
								class="label">공개여부</span> <input type="checkbox" id="openShare" title="공개여부" />
								<label for="ckbigong" class="mr20">SGIS+plus 활용사례 공유</label></li>
						</ul>
						<div id="caseHelper" style="display: none;">
							<p class="txt">
								조회결과 저장기간은 2개월 까지며,<br />조회결과 공개여부에 따라 SGIS+plus 사용자간<br />데이터의
								자유로운 열람이 가능합니다.
							</p>
							<p class="txt">
								저장된 내용을 활용사례로 공유시 저장기간을 연장할 수<br /> 있습니다.
							</p>
						</div>
						<div class="btnBox">
							<a onclick="javascript:$bizStatsMap.ui.doDone('bookmarkdlg');"
								class="btnStyle01">My Page 저장</a> <a
								onclick="javascript:$bizStatsMap.ui.doCancel('bookmarkdlg');"
								class="btnStyle01">닫기</a>
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
								<a href="javascript:$galleryAdd.interactiveGalleryPopHide();$galleryAdd.interactiveMyGalleryDialogPopOpen()" class="btnGtype">갤러리 등록</a> 
								<a href="javascript:$bizStatsMap.ui.doBookMark(1, 'BMAP');" class="btnGtype">즐겨찾기</a> 
								<a onclick="javascript:$('#myGalleryPop').hide();" class="btnGtype">취소</a> <!-- 2017.02.23 -->
							</div>
						</div>
					</div>
				
			</div>
			
			<!-- ( mask ) -->
			<div class="deem" style="display: none;"></div> 
			<!-- ( mask ) -->
			
		</div>
		

		<!-- footer// -->
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom/hidden"></jsp:include>
		</footer>
	</div>
	
	<script>
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
	<!--박길섭-->
	<jsp:include page="/SgisProject_Publisher/html/bizStatsMap/bizStatsMap-popup.html"></jsp:include>  
	<!-- 생활업종현황 도움말 -->
	<jsp:include page="/view/bizStats/bizStatsHelper"></jsp:include> 
	<!-- 기술업종현황 도움말 -->
	<jsp:include page="helper/technicalHelper.jsp"></jsp:include>

	<!--하루동안 열지않기  -->
	<div class="Popup_Info" id="bizStats_laypopup">
		<div class="PopupCont">
			<h1>생활업종지도 이용안내</h1>
			<button type="button" class="Popup_close1" onclick="javascript:commonPopupObj.closeWin('bizStats_laypopup', 1);">창닫기</button>
			<img src="${pageContext.request.contextPath}/img/nm/guide_startup_small_businesses2.png" alt="생활업종지도 이용안내">
			<div class="CloseZone">
				<label><input type="checkbox" name="close" value="OK" />오늘 하루 열지 않음</label>
				<button type="button" class="Popup_close2" onclick="javascript:commonPopupObj.closeWin('bizStats_laypopup', 1);">창닫기</button>
			</div>
		</div>
		<div class="PopupBg">&nbsp;</div>
	</div>
	
	<div id ="dataBoardImgDiv" style="display:none; float: right; width:549px; height:882px; top:137px; right:0px; position:absolute; z-index:10003;">
		<!--<img id="area2006Img" src="/img/tutorial/area2006Img.png" alt="2006년" draggable="false">--> <!-- 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리 (pse) -->
		<img id="area2006Img" src="/img/tutorial/area2017Img.png" alt="2006년" draggable="false">  <!-- 2020년 SGIS고도화 3차(테마코드) - 새로운 테마코드 추가에 따른 튜툐리얼 이미지 수정(pse) -->
		<img id="toPoint_db3" src="/img/tutorial/toPoint_3.png" alt="포인터" draggable="false" style="display:none; position:absolute; right:450px; z-index: 10004;">				
	</div>
	
	<div id="tuto_dimbox" draggable="false" style="display:none; width:1119px; height:660px; position:absolute; left:40%; top:50%; margin:-300px 0 0 -500px; z-index:10004;">
		<img id="compareInfoImg" src="/img/tutorial/compareInfoImg.png" alt="상세비교하기" draggable="false">
		<img id="xxImg" src="/img/tutorial/xxImg.png" draggable="false" alt="닫기" style="float:right; cursor:pointer;  border: 3px outset red;">
		<img id="toPoint_db2" src="/img/tutorial/toPoint_2.png" alt="포인터" draggable="false" style="display:none; position:absolute; left:980px; top:0px; z-index: 10004;">				
	</div>
	
	<div class="tutorialWrapper" style= "display: none" draggable="false">
		<!-- mng_s 20180412_김건민 -->
		<button type="button" id="tuto_start_btn" style="   border-radius: 1000px;	background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 26px; width: 154px; right: 415px; top:104px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="closeTutorial();" title="생활업종 튜토리얼 종료">생활업종 튜토리얼 종료</button>
		<!-- mng_e 20180412_김건민 -->				
		<div id="headerTutorial" style="width:100%; height:135px;" draggable="false">
			<div id="tutorialText" draggable="false">
				<!-- mng_s 20180412_김건민 -->
				<img id="tuto_end_btn" src="/img/tutorial/tuto_end_btn_01.png" alt="튜토리얼종료" style="float: right; position: relative; width:13px; height:13px; top: 10px; left: -10px;  opacity:0.6; cursor:pointer; text-indent:-2000px;" onclick="closeTutorial();" draggable="false">
				<!-- mng_e 20180412_김건민 -->
			</div>
		</div>	
		<img id="mainMenuImg" src="/img/tutorial/bizMenu.png" alt="통계메뉴" draggable="false">
		<img id="sidoBizMainImg" src="/img/tutorial/sidoBizImg.png" alt="시도별 생활업종 현황" draggable="false">
		
		<img id="bizSidoLqSelect" src="/img/tutorial/bizSidoLqButtonSelect.png" alt="시도 입지계수 버튼" draggable="false">
		<!--<img id="sidoBizLqDataBoardImg" src="/img/tutorial/sidoBizLqDataBoardImg.png" alt="시도 LQ데이터보드" draggable="false">--> <!-- 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리(pse) -->
		<img id="sidoBizLqDataBoardImg" src="/img/tutorial/sidoBizLqDataBoardImg2020.png" alt="시도 LQ데이터보드" draggable="false"> <!-- 2020년 SGIS고도화 3차(테마코드) - 새로운 테마코드 추가에 따른 튜툐리얼 이미지 수정(pse) -->
		
		<!--<img id="bizMapImg1" src="/img/tutorial/bizSidoMapImg.png" alt="지도" draggable="false">--> <!-- 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리(pse) -->
		<img id="bizMapImg1" src="/img/tutorial/bizSidoMapImg2020.png" alt="지도" draggable="false"> <!-- 2020년 SGIS고도화 3차(테마코드) - 새로운 테마코드 추가에 따른 튜툐리얼 이미지 수정(pse) -->
<!-- 		<img id="bizRightIconImg" src="/img/tutorial/bizRightIconImg.png" style="display:none; position:absolute; top:103px; right:1px;" draggable="false"> -->
		<!--<img id="sidoBizPoiImg1" src="/img/tutorial/sidoBizPoi.png" alt="POI" draggable="false">--> <!-- 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리(pse) -->
		<img id="sidoBizPoiImg1" src="/img/tutorial/sidoBizPoi2020.png" alt="POI" draggable="false"> <!-- 2020년 SGIS고도화 3차(테마코드) - 새로운 테마코드 추가에 따른 튜툐리얼 이미지 수정(pse) -->
		<img id="bizSidoButton" src="/img/tutorial/bizSidoButton.png" alt="bizSidoButton" draggable="false">
		<!--<img id="bizMapImg2" src="/img/tutorial/bizSidoMapImg2.png" alt="지도" draggable="false">--> <!-- 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리(pse) -->
		<img id="bizMapImg2" src="/img/tutorial/bizSidoMapImg2_2020.png" alt="지도" draggable="false"> <!-- 2020년 SGIS고도화 3차(테마코드) - 새로운 테마코드 추가에 따른 튜툐리얼 이미지 수정(pse) -->
		<img id="sidoBizDataBoardImg" src="/img/tutorial/bizSidoMapDataboard.png" alt="데이터보드" draggable="false">
		<img id="sidoBizDbFoodImg" src="/img/tutorial/sidoBizDbFoodImg.png" alt="음식점" draggable="false">
		<!--<img id="sidoBizDataBoardImg2" src="/img/tutorial/bizSidoDataBoard.png" alt="데이터보드" draggable="false">--> 		<!-- 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리(pse) -->
		<img id="sidoBizDataBoardImg2" src="/img/tutorial/bizSidoDataBoard2020.png" alt="데이터보드" draggable="false"> 		<!-- 2020년 SGIS고도화 3차(테마코드) - 새로운 테마코드 추가에 따른 튜툐리얼 이미지 수정(pse) -->
		<img id="pageClipImg" src="/img/tutorial/pageClipImg.png" alt="메뉴접기" draggable="false">
		<img id="sidoBizDataBoardImg3" src="/img/tutorial/sggBizDataBoardImage2.png" alt="데이터보드" draggable="false">
<!-- 		<img id="cleanImg" src="/img/tutorial/cleanImg.png" draggable="false"> -->
		<img id="sggBizMainImg" src="/img/tutorial/sggBizImg.png" alt="시군구별 생활업종 현황" draggable="false">
		<!-- <img id="restaurantImg" src="/img/tutorial/restaurantImg.png" alt="음식점" draggable="false"> -->	<!-- 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리(pse) -->
		<img id="restaurantImg_2020" src="/img/tutorial/restaurantImg_2020.png" alt="음식점" draggable="false">	<!-- 2020년 SGIS고도화 3차(테마코드) - 새로운 테마코드 추가에 따른 튜툐리얼 이미지 수정(pse) -->
		<img id="restaurantOnImg" src="/img/tutorial/restaurantOnImg.png" alt="음식점 On" draggable="false">
		<img id="cafeImg" src="/img/tutorial/cafeImg.png" alt="카페" draggable="false">
		<img id="bizMapImg3" src="/img/tutorial/bizMapImg3.png" alt="지도" draggable="false">
		<img id="bizRedLegend1" src="/img/tutorial/bizRedLegend1.png" alt="범례" draggable="false">
		<img id="sggMapInfoImg" src="/img/tutorial/sggMapInfoImg.png" alt="지도결과" draggable="false">
		<!--<img id="sggBizDataBoardImg1" src="/img/tutorial/bizSggDataBoard.png" alt="데이터보드" draggable="false">--> 	<!-- 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리(pse) -->
		<img id="sggBizDataBoardImg1" src="/img/tutorial/bizSggDataBoard2020.png" alt="데이터보드" draggable="false"> 		<!-- 2020년 SGIS고도화 3차(테마코드) - 새로운 테마코드 추가에 따른 튜툐리얼 이미지 수정(pse) -->
		<img id="sggMapInfoTooltip" src="/img/tutorial/sggMapInfoTooltip.png" alt="툴팁" draggable="false">
		<img id="chickenImg" src="/img/tutorial/chickenImg.png" alt="치킨" draggable="false">
		<img id="sggBizDataBoardImg2" src="/img/tutorial/sggBizDataBoardImg2.png" alt="데이터보드" draggable="false">
		<img id="sggInteriorImg" src="/img/tutorial/sggInteriorImg.png" alt="인테리어" draggable="false">
		<img id="sggBizDataBoardImg3" src="/img/tutorial/sggBizDataBoardImg3.png" alt="데이터보드" draggable="false">
		<img id="bizMapImg4" src="/img/tutorial/bizMapImg4.png" alt="지도" draggable="false">
		<img id="sggMapInfoImg2" src="/img/tutorial/sggMapInfoImg2.png" alt="지도결과" draggable="false">
		<img id="sggMapInfoTooltip2" src="/img/tutorial/sggMapInfoTooltip2.png" alt="지도결과 설명" draggable="false">
		<img id="bizMapImg5" src="/img/tutorial/bizMapImg5.png" alt="지도" draggable="false">
		<img id="sggBizDataBoardImg4" src="/img/tutorial/sggBizDataBoardImg4.png" alt="데이터보드" draggable="false">
		<img id="areaBizMainImg" src="/img/tutorial/densityBizImg.png" alt="업종 밀집도 현황" draggable="false">
		<!-- 2020년 SGIS고도화 3차(테마코드) 시작- 기존코드 주석처리(pse) -->
		<!-- 
		<img id="bizMapImg6" src="/img/tutorial/bizMapImg6.png" alt="지도" draggable="false">
		<img id="areaBizDataBoardImg1" src="/img/tutorial/areaBizDataBoardImg1.png" alt="데이터보드" draggable="false">
		-->
		<!-- 2020년 SGIS고도화 3차(테마코드) 끝- 기존코드 주석처리(pse) -->
		<!-- 2020년 SGIS고도화 3차(테마코드) 시작 - 새로운 테마코드 추가에 따른 튜툐리얼 이미지 수정(pse) -->
		<img id="bizMapImg6" src="/img/tutorial/bizMapImg6_2020.png" alt="지도" draggable="false">
		<img id="areaBizDataBoardImg1" src="/img/tutorial/areaBizDataBoardImg1_2020.png" alt="데이터보드" draggable="false">
		<!-- 2020년 SGIS고도화 3차(테마코드) 끝 - 새로운 테마코드 추가에 따른 튜툐리얼 이미지 수정(pse) -->
		<img id="areaHeatLegend" src="/img/tutorial/areaHeatLegend.png" alt="범례" draggable="false">
		<img id="areaHeatLegend2" src="/img/tutorial/areaHeatLegend2.png" alt="범례" draggable="false">
		<img id="heatRadiusImg" src="/img/tutorial/heatRadiusImg.png" alt="열지도 범례" draggable="false">
		<img id="areaHeatSido" src="/img/tutorial/areaHeatSido.png" alt="시도 열지도" draggable="false">
		<!-- 2020년 SGIS고도화 3차(테마코드) 시작- 기존코드 주석처리(pse) -->
		<!--
		<img id="bizMapImg7" src="/img/tutorial/bizMapImg7.png" alt="지도" draggable="false">
		<img id="areaBizDataBoardImg2" src="/img/tutorial/areaBizDataBoardImg2.png" alt="데이터보드" draggable="false">
		-->
		<!-- 2020년 SGIS고도화 3차(테마코드) 끝- 기존코드 주석처리(pse) -->
		<!-- 2020년 SGIS고도화 3차(테마코드) 시작 - 새로운 테마코드 추가에 따른 튜툐리얼 이미지 수정(pse) -->
		<img id="bizMapImg7" src="/img/tutorial/bizMapImg7_2020.png" alt="지도" draggable="false">
		<img id="areaBizDataBoardImg2" src="/img/tutorial/areaBizDataBoardImg2_2020.png" alt="데이터보드" draggable="false">
		<!-- 2020년 SGIS고도화 3차(테마코드) 끝 - 새로운 테마코드 추가에 따른 튜툐리얼 이미지 수정(pse) -->
		<img id="areaHeatSgg" src="/img/tutorial/areaHeatSgg.png" alt="시군구 열지도" draggable="false">
		<img id="bizMapImg8" src="/img/tutorial/bizMapImg8.png" alt="지도" draggable="false">
		<!-- <img id="serviceImg" src="/img/tutorial/serviceImg.png" alt="서비스" draggable="false"> -->  <!-- 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리(pse) -->
		<img id="serviceImg" src="/img/tutorial/serviceImg2020.png" alt="서비스" draggable="false">		<!-- 2020년 SGIS고도화 3차(테마코드) - 새로운 테마코드 추가에 따른 튜툐리얼 이미지 수정(pse) -->
		<img id="pcImg" src="/img/tutorial/pcImg.png" alt="PC방" draggable="false">
		<!-- 2020년 SGIS고도화 3차(테마코드) 시작- 기존코드 주석처리(pse) -->
		<!--
		<img id="areaBizDataBoardImg3" src="/img/tutorial/areaBizDataBoardImg3.png" alt="데이터보드" draggable="false">
		<img id="areaBizDataBoardImg5" src="/img/tutorial/areaBizDataBoardImg5.png" alt="데이터보드" draggable="false">
		-->
		<!-- 2020년 SGIS고도화 3차(테마코드) 끝- 기존코드 주석처리(pse) -->
		<!-- 2020년 SGIS고도화 3차(테마코드) 시작 - 새로운 테마코드 추가에 따른 튜툐리얼 이미지 수정(pse) -->
		<img id="areaBizDataBoardImg3" src="/img/tutorial/areaBizDataBoardImg3_2020.png" alt="데이터보드" draggable="false">
		<img id="areaBizDataBoardImg5" src="/img/tutorial/areaBizDataBoardImg5_2020.png" alt="데이터보드" draggable="false">
		<!-- 2020년 SGIS고도화 3차(테마코드) 끝 - 새로운 테마코드 추가에 따른 튜툐리얼 이미지 수정(pse) -->
		
		<img id="lqBizImg" src="/img/tutorial/lqBizImg.png" alt="업종별 입지계수 시작 버튼" draggable="false">
		<!-- <img id="lqImgFood" src="/img/tutorial/lqImgFood.png" alt="업종별 입지계수 음식점" draggable="false"> -->		<!-- 2020년 SGIS고도화 3차(테마코드) - 기존이미지 사용X(pse) -->
		<img id="lqImgFood" src="/img/tutorial/lqImgFood_2020.png" alt="업종별 입지계수 음식점" draggable="false">				<!-- 2020년 SGIS고도화 3차(테마코드) - 새로운 이미지 사용O(pse) -->
		<img id="lqImg0" src="/img/tutorial/lqImg0.png" alt="업종별 입지계수 카페" draggable="false">
		<img id="lqImg1" src="/img/tutorial/lqImg1.png" alt="업종별 입지계수 지도1" draggable="false">
		<!-- <img id="lqImg2" src="/img/tutorial/lqImg2.png" alt="업종별 입지계수 데이터보드1" draggable="false"> -->		<!-- 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리(pse) -->
		<img id="lqImg2" src="/img/tutorial/lqImg2_2020.png" alt="업종별 입지계수 데이터보드1" draggable="false">			<!-- 2020년 SGIS고도화 3차(테마코드) - 새로운 테마코드 추가에 따른 튜툐리얼 이미지 수정(pse) -->
		<img id="lqImg3" src="/img/tutorial/lqImg3.png" alt="업종별 입지계수 서울 지도" draggable="false">
		<img id="lqImg4" src="/img/tutorial/lqImg4.png" alt="업종별 입지계수 지도2" draggable="false">
		<img id="lqImg5" src="/img/tutorial/lqImg5.png" alt="업종별 입지계수 상세정보보기 버튼" draggable="false">
		<img id="lqImg6" src="/img/tutorial/lqImg6.png" alt="업종별 입지계수 지도3" draggable="false">
		<!-- <img id="lqImg7" src="/img/tutorial/lqImg7.png" alt="업종별 입지계수 데이터보드2" draggable="false"> -->		<!-- 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리(pse) -->
		<img id="lqImg7" src="/img/tutorial/lqImg7_2020.png" alt="업종별 입지계수 데이터보드2" draggable="false">			<!-- 2020년 SGIS고도화 3차(테마코드) - 새로운 테마코드 추가에 따른 튜툐리얼 이미지 수정(pse) -->
		
		<img id="search0" src="/img/tutorial/search0.png" alt="조건별지역찾기 시도" draggable="false">
		<img id="search1" src="/img/tutorial/search1.png" alt="조건별지역찾기 대전광역시" draggable="false">
		<img id="search2" src="/img/tutorial/search2.png" alt="조건별지역찾기 시군구" draggable="false">
		<img id="search3" src="/img/tutorial/search3.png" alt="조건별지역찾기 서구" draggable="false">
		
		<!-- mng_s 20200424 이진호, 튜토리얼 현행화 -->
		<img id="condi_select" src="/img/tutorial/condi_select.png" alt="조건별지역찾기 서구" draggable="false" style="display : none; margin-left: 360px; margin-top: 38px; width: 300px;">
		<img id="condi_select_2" src="/img/tutorial/condi_select_2.png" alt="조건별지역찾기 서구" draggable="false" style="display : none; margin-left: -300px; margin-top: 39px; width: 295px;">
		<!-- mng_e 20200424 이진호 -->
		
		
		
		<!-- <img id="areaInformationBizImg" src="/img/tutorial/areaInformationBizImg.png" alt="후보지 정보보기" draggable="false">
		<img id="candidate0" src="/img/tutorial/candidate0.png" alt="후보지 정보보기 시군구" draggable="false">
		<img id="candidate1" src="/img/tutorial/candidate1.png" alt="후보지 정보보기 강동구" draggable="false">
		<img id="candidate2" src="/img/tutorial/candidate2.png" alt="후보지 정보보기 읍면동" draggable="false">
		<img id="candidate3" src="/img/tutorial/candidate3.png" alt="후보지 정보보기 고덕1동" draggable="false">
		<img id="candidate4" src="/img/tutorial/candidate4.png" alt="후보지 정보보기 조건버튼" draggable="false">
		<img id="candidate5" src="/img/tutorial/candidate5.png" alt="후보지 정보보기 지도1" draggable="false">
		<img id="candidate6" src="/img/tutorial/candidate6.png" alt="후보지 정보보기 위아래" draggable="false">
		<img id="candidate7" src="/img/tutorial/candidate7.png" alt="후보지 정보보기 지도2" draggable="false">
		 -->
		<!-- 190423 방민정 후보지정보 보기 추가 시작 -->
      		<img id="areaInfo_btn" src="/img/tutorial/areaInfo_btn.png" alt="후보지정보보기" style="display:none; position: absolute; top:547px; right:1839px; z-index:10003; border: 3px outset red;">
      		<img id="area_btn_1" src="/img/tutorial/area_btn_1.png" alt="시도선택1" style="display:none; position: absolute; top:256px; right:1653px; z-index:10003; border: 3px outset red;">
      		<img id="area_btn_2" src="/img/tutorial/area_btn_2.png" alt="시도선택2" style="display:none; position: absolute; top:260px; right:1656px; z-index:9998;">
      		<img id="area_btn_3" src="/img/tutorial/area_btn_3.png" alt="시도선택3" style="display:none; position: absolute; top:365px; right:1653px; z-index:10003; border: 3px outset red;">
      		<img id="area_btn_4" src="/img/tutorial/area_btn_4.png" alt="시군구선택1" style="display:none; position: absolute; top:292px; right:1653px; z-index:10003; border: 3px outset red;">
      		<img id="area_btn_5" src="/img/tutorial/area_btn_5.png" alt="시군구선택2" style="display:none; position: absolute; top:295px; right:1656px; z-index:9998;">
      		<img id="area_btn_6" src="/img/tutorial/area_btn_6.png" alt="시군구선택3" style="display:none; position: absolute; top:350px; right:1654px; z-index:10003; border: 3px outset red;">
      		<img id="addsearch_btn" src="/img/tutorial/addsearch_btn.png" alt="조건검색" style="display:none; position: absolute; <!-- top:885px; --> right:1665px; z-index:10003; border: 3px outset red;">
      		<!-- 190423 방민정 후보지정보 보기 추가 끝 -->			
		<img id="searchBizMainImg" src="/img/tutorial/findAreaBizImg.png" alt="생활업종 후보지 검색" draggable="false">
		<img id="companyCntImg" src="/img/tutorial/companyCntImg.png" alt="사업체수" draggable="false">
		<img id="ccOption" src="/img/tutorial/ccOption.png" alt="사업체수 설정" draggable="false">
		<img id="employeeImg" src="/img/tutorial/employeeImg.png" alt="직장인구" draggable="false">
		<img id="searchBtnImg" src="/img/tutorial/searchBtnImg.png" alt="조건버튼 생성" draggable="false">
		<img id="bizMapImg9" src="/img/tutorial/bizMapImg9.png" alt="지도" draggable="false">
<!-- 		<img id="bizRightIconImg2" src="/img/tutorial/bizRightIconImg2.png" style="display:none; position:absolute; top:103px; right:1px;" draggable="false"> -->
		<img id="redLegendInfo1" src="/img/tutorial/redLegendInfo1.png" alt="범례" draggable="false">
		<img id="addrSearchImg" src="/img/tutorial/addrSearchImg.png" alt="주소검색" draggable="false">
		<img id="addrChoiceImg3" src="/img/tutorial/addrChoiceImg3.png" alt="주소선택" draggable="false">
		<img id="okImg" src="/img/tutorial/okImg.png" alt="확인" draggable="false">
		<img id="bizMapImg10" src="/img/tutorial/bizMapImg10.png" alt="지도" draggable="false">
		<img id="dragBizImg" src="/img/tutorial/dragBizImg.png" alt="선택항목" style="display:none; position:absolute; top:227px; left:-2px; border: 3px outset red; cursor:pointer; z-index:10001;" draggable="false">
		<img id="addrChoiceImg4" src="/img/tutorial/addrChoiceImg4.png" alt="주소선택" draggable="false">
		<img id="bizMapImg11" src="/img/tutorial/bizMapImg11.png" alt="지도" draggable="false">
		<img id="bizMapImg11_1" src="/img/tutorial/bizMapImg11_1.png" alt="지도" draggable="false">
		<img id="bizMapImg12" src="/img/tutorial/searchArea.png" alt="지도" draggable="false">
		<img id="bizMapImg13" src="/img/tutorial/bizMapImage13.png" alt="지도" draggable="false">
		<img id="bizMapImg14" src="/img/tutorial/bizMapImg14.png" alt="지도" draggable="false">
		<img id="pcInfoImg1" src="/img/tutorial/pcInfoImg1.png" alt="pc방 상세내용" draggable="false">
		<!-- <img id="pcInfoImg2" src="/img/tutorial/pcInfoImg2.png" alt="pc방 상세내용" draggable="false"> --> 	<!-- 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리(pse) -->
		<img id="pcInfoImg2_2020" src="/img/tutorial/pcInfoImg2_2020.png" alt="pc방 상세내용" draggable="false">	<!-- 2020년 SGIS고도화 3차(테마코드) - 새로운 테마코드 추가에 따른 튜툐리얼 이미지 수정(pse) -->
		<img id="dropZone" src="/img/tutorial/dropZone.png" alt="드랍존" draggable="false">
		<img id="searchBizDataBoardImg1" src="/img/tutorial/searchBizDataBoardImg1.png" alt="데이터보드" draggable="false">
		<img id="compareImg" src="/img/tutorial/compareImg.png" alt="비교하기" draggable="false">
		<img id="galmaDetailBtn" src="/img/tutorial/galmaDetailBtn.png" alt="읍면동" draggable="false">
		<img id="galmaMapImg" src="/img/tutorial/galmaMapImg.png" alt="지도" draggable="false">
		<img id="galmaTooltip" src="/img/tutorial/galmaTooltip.png" alt="툴팁" draggable="false">
		<!-- <img id="searchBizDataBoardImg2" src="/img/tutorial/searchBizDataBoardImg2.png" alt="데이터보드" draggable="false"> -->	<!-- 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리(pse) -->
		<img id="searchBizDataBoardImg2" src="/img/tutorial/searchBizDataBoardImg2_2020.png" alt="데이터보드" draggable="false">		<!-- 2020년 SGIS고도화 3차(테마코드) - 새로운 테마코드 추가에 따른 튜툐리얼 이미지 수정(pse) -->
		<img id="bizRedLegend2" src="/img/tutorial/bizRedLegend2.png" alt="범례" draggable="false">
		<!-- 2020년 SGIS고도화 3차(테마코드) 시작- 기존코드 주석처리(pse) -->
		<!--
		<img id="searchBizDataBoardImg3" src="/img/tutorial/searchBizDataBoardImg3.png" alt="데이터보드" draggable="false">
		<img id="searchBizDataBoardImg4" src="/img/tutorial/searchBizDataBoardImg4.png" alt="데이터보드" draggable="false">
		<img id="searchBizDataBoardImg5" src="/img/tutorial/searchBizDataBoardImg5.png" alt="데이터보드" draggable="false">
		<img id="searchJobGraphImg" src="/img/tutorial/searchJobGraphImg.png" alt="소상공인 업종별 증감" draggable="false">
		-->
		<!-- 2020년 SGIS고도화 3차(테마코드) 끝- 기존코드 주석처리(pse) -->
		<!-- 2020년 SGIS고도화 3차(테마코드) 시작 - 새로운 테마코드 추가에 따른 튜툐리얼 이미지 수정(pse) -->
		<img id="searchBizDataBoardImg3" src="/img/tutorial/searchBizDataBoardImg3_2020.png" alt="데이터보드" draggable="false">
		<img id="searchBizDataBoardImg4" src="/img/tutorial/searchBizDataBoardImg4_2020.png" alt="데이터보드" draggable="false">
		<img id="searchBizDataBoardImg5" src="/img/tutorial/searchBizDataBoardImg5_2020.png" alt="데이터보드" draggable="false">
		<img id="searchJobGraphImg" src="/img/tutorial/searchJobGraphImg_2020.png" alt="소상공인 업종별 증감" draggable="false">
		<!-- 2020년 SGIS고도화 3차(테마코드) 끝 - 새로운 테마코드 추가에 따른 튜툐리얼 이미지 수정(pse) -->
		<img id="jobOpenImg" src="/img/tutorial/openAreaBizImage.png" alt="업종별 개업 현황" draggable="false">
		<img id="jobOpenImg2" src="/img/tutorial/jobOpenImg2.png" alt="산업고용(3종)" draggable="false">
		<img id="jobOpenImg3" src="/img/tutorial/jobOpenImg3.png" alt="석유판매업(주유소)" draggable="false">
		<img id="bizMapImg15" src="/img/tutorial/bizMapImg15.png" alt="지도" draggable="false">
		<img id="jobOpenDataBoardImg" src="/img/tutorial/jobOpenDataBoardImg.png" alt="데이터보드" draggable="false">
		
		<img id="left_btn" src="/img/tutorial/floatingAreaBizImage.png" alt="업종별 뜨는 지역" style="display:none; position:absolute; top:683px; left:-3px; cursor:pointer;  border: 3px outset red;">
		
		<img id="map" src="/img/tutorial/map.png" alt="지도" style="display:none;  position:absolute; top:170px;">
		<img id="map_btn" src="/img/tutorial/map_btn.png" alt="인천" style="display:none;  position:absolute; border: 3px outset red; top:322px; left: 346px; cursor:pointer;" draggable="false" >
		<img id="map_2" src="/img/tutorial/map_2.png" alt="지도" style="display:none;  position:absolute; top:170px;">
		<img id="map_3" src="/img/tutorial/map_3.png" alt="범례" style="display:none; position:absolute; bottom:10px; left:10px; z-index:10002;">
		<img id="map_4" src="/img/tutorial/map_4.png" alt="지도" style="display:none;  position:absolute; top:170px;">
		<img id="map_5" src="/img/tutorial/map_5.png" alt="범례" style="display:none; position:absolute; bottom:10px; left:10px; z-index:10002;">
		<img id="map_6" src="/img/tutorial/map_6.png" alt="지도" style="display:none;  position:absolute; top:170px;">
		
		<img id="jobOpenDataBoardImg_1" src="/img/tutorial/jobOpenDataBoardImg_1.png" style="display:none;position: absolute; top: 136px; right:0px;z-index:10003;">
		<img id="jobOpenDataBoardImg_2" src="/img/tutorial/jobOpenDataBoardImg_2.png" style="display:none;position: absolute; top: 136px; right:0px;z-index:10003;">
		<img id="jobOpenDataBoardImg_3" src="/img/tutorial/jobOpenDataBoardImg_3.png" style="display:none;position: absolute; top: 136px; right:0px;z-index:10003;">
		
		<img id="dataBoard_btn" src="/img/tutorial/dataBoard_btn.png" alt="데이터보드 버튼" style="display:none; position: absolute; cursor:pointer; top:381px; right:-1px; z-index:10003; border: 3px outset red;">
		
		<img id="dataBoardCloseImg3" src="/img/tutorial/dataBoardCloseImg3.png" alt="초기화" style="display:none; position: absolute; cursor:pointer; top:137px; right:2px; z-index:10003; border: 3px outset red;">
		
		<img id="toPoint_1" src="/img/tutorial/toPoint_1.png" alt="포인터" draggable="false">
		<img id="toPoint_2" src="/img/tutorial/toPoint_2.png" alt="포인터" draggable="false">
		<img id="toPoint_3" src="/img/tutorial/toPoint_3.png" alt="포인터" draggable="false">
		<img id="toPoint_4" src="/img/tutorial/toPoint_4.png" alt="포인터" draggable="false">
	</div>
</body>
</html>