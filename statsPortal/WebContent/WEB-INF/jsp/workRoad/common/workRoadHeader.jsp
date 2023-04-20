<%
/**************************************************************************************************************************
* Program Name  : 일자리맵 서비스 헤더 JSP  
* File Name     : workRoadHeader.jsp
* Comment       : 
* History       : 
*	2018.08.28	ywKim	신규
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

%>

<!DOCTYPE html>
<html lang="ko">

<head>
	<meta charset="utf-8">
	<meta name="format-detection" content="telephone=no" /><!-- 임시 추가 - 2018.09.01	ywKim	[v180901] -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>일자리 맵 | 통계지리정보서비스</title>

<!-- 임시 추가 (copy of 대화형통계지도) + 주석제거 + 불필요소스 주석
	- 1. interactiveMap.jsp, 2. policyStaticMap.jsp
	- [1][2] 개별 소스에만 있는 것은 후미에 주석처리
	- 공통부분은 후미에 주석이 없음
	- 2018.09.18	ywKim	[v180901] -->
    <link rel="stylesheet" type="text/css" href="/css/um.css" />
    <link href="/css/common.css" rel="stylesheet" type="text/css" />
    <link href="/css/default.css" rel="stylesheet" type="text/css" />
    <link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="/css/wheelcolorpicker.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
<!--<link rel="stylesheet" type="text/css" href="/css/map/interactiveFunc.css" /> --><!-- 개별화면 css -->

   	<link rel='shortcut icon' href='/images/workRoad/ico/n_favicon.png'/><!-- 웹브라우저 탭의 아이콘	2018.09.19	ywKim	추가 [v180901] -->

    <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
    <link rel="stylesheet" href="/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
    <link rel="stylesheet" type="text/css" href="/js/plugins/colorpicker/css/colpick.css">
<!--<link rel="stylesheet" href="${pageContext.request.contextPath}/css/policyStatic/cont_policy.css">--><!-- policy용 -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/workRoad/cont_workRoad.css">
    
<!--<link rel="stylesheet" href="/css/popup.css">--><!-- inter용	-->
<!--<link rel="stylesheet" href="/css/tutorial/tutorial.css">--><!-- inter용 - 튜토리얼	-->
<!--<link rel="stylesheet" type="text/css" href="/css/tutorial/common.css">--><!-- inter용 - 튜토리얼	-->

	<script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
	<script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>  
	<script type="text/javascript" src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>  
	<script type="text/javascript" src="/js/plugins/colorpicker/js/colpick.js"></script>
	<script type="text/javascript" src="/js/plugins/jquery.wheelcolorpicker.js"></script>
	<script type="text/javascript" src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	<script type="text/javascript" src="/js/plugins/EasyTree/jquery.easytree.js"></script> 
	<script type="text/javascript" src="/js/plugins/colResizable-1.5.min.js"></script>

	<!-- 챠트기능 -->	
	<script src="../../js/workRoad/plugin/Highcharts-6.1.1/code/highcharts.js"></script>
	<script src="../../js/workRoad/plugin/Highcharts-6.1.1/code/highcharts-more.js"></script>
	<script src="../../js/workRoad/plugin/Highcharts-6.1.1/code/modules/data.js"></script>
	<script src="../../js/workRoad/plugin/Highcharts-6.1.1/code/modules/series-label.js"></script>
	<script src="../../js/workRoad/plugin/Highcharts-6.1.1/code/modules/exporting.js"></script>
	<script src="../../js/workRoad/plugin/Highcharts-6.1.1/code/modules/export-data.js"></script>
	<!-- End of 챠트기능 -->
	
	<!-- 2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START -->
	<script type="text/javascript">
		var gv_url = "${url}";
		var gv_screen = "${screen}";
		var gv_type = "${type}";
		var gv_sido_cd = "${sido_cd}";
		var gv_sgg_cd = "${sgg_cd}";
		var gv_zoom = "${zoom}";
		var gv_zoom_first_yn = "Y";
		var gv_coord_x = "${coord_x}";
		var gv_coord_x_first_yn = "Y";
		var gv_coord_y = "${coord_y}";
		var gv_coord_y_first_yn = "Y";
		//2019-12-12 [김남민] 일자리 맵 > 미추홀구 하드코딩 제거 START
		//2019-08-29 [김남민] 일자리 맵 > 연계페이지 수정사항 : 인천광역시(23) 미추홀구(090) => 인천광역시(23) 서구(030) START
		//if(gv_sido_cd == "23" && gv_sgg_cd == "090") gv_sgg_cd = "030";
		//2019-08-29 [김남민] 일자리 맵 > 연계페이지 수정사항 : 인천광역시(23) 미추홀구(090) => 인천광역시(23) 서구(030) END
		//2019-12-12 [김남민] 일자리 맵 > 미추홀구 하드코딩 제거 END
	</script>
	<!-- 2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. END -->
	
<!--
	<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/data.js"></script>
	<script src="https://code.highcharts.com/modules/series-label.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>
 -->	   
	<!-- <script type="text/javascript" src="/js/plugins/highcharts/highcharts.js"></script> -->	 	
<!--<script type="text/javascript" src="/js/plugins/highcharts/highcharts-more.js"></script> -->
<!--<script type="text/javascript" src="/jsp/pyramid/js/highchart/js/highcharts-3d.src.js"></script> -->
	<!-- <script type="text/javascript" src="/js/plugins/highcharts/modules/exporting.js"></script> -->
<!--<script type="text/javascript" src="/js/plugins/highcharts/highchart.drag.js"></script> -->
	<script type="text/javascript" src="/js/plugins/btoa.js"></script>
	


	
   
	<link rel="stylesheet" type="text/css" href="/css/handsontable.full.css">
	<script type="text/javascript" src="/js/plugins/handsontable.full.js"></script>
   
	<script type="text/javascript" src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
	<script src="/js/plugins/jquery-easyui-1.4/sop-src.sync.js"></script><!-- policy용 -->
	<script type="text/javascript" src="/js/plugins/jquery.sha256.js"></script>
	<script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
	<script type="text/javascript" src="/js/common/sop.portal.absAPI.js"></script>	    
	<!-- <script type="text/javascript" src="/js/common/map.js"></script> -->
	<script type="text/javascript" src="/js/workRoad/commonMap.js"></script>					<!-- used:sMap - 2019.01.10 ywKim	변경: 경로변경 -->
	<script type="text/javascript" src="/js/common/common.js"></script>
	<script type="text/javascript" src="/js/common/mapNavigation.js"></script>
   
	<!-- inte용 - 2018.09.19	ywKim	[v180901] **********************************-->
<!--<script type="text/javascript" src="/js/common/mapInfo/publicDataBoard.js"></script> --><!-- inter용 -->
<!--<script type="text/javascript" src="/js/common/mapInfo/mydataDataBoard.js"></script> --><!-- inter용 -->
<!--<script type="text/javascript" src="/js/interactive/interactiveMap.js"></script>--><!-- inter용 -->
<!--<script type="text/javascript" src="/js/interactive/interactiveTutorial.js"></script>--><!-- inter용 - 튜토리얼	-->

	<!-- leekh 사용자 안내 rotation 추가 start -->
<!--<script type="text/javascript" src="/js/interactive/rotation/jquery.slides.min.js"></script>--><!-- inter용-->
<!--<script type="text/javascript" src="/js/interactive/rotation/interactiveRotation.js"></script>--><!-- inter용-->
	<!-- leekh 사용자 안내 rotation 추가 end  -->

<!--<script type="text/javascript" src="/js/interactive/interactiveMapApi.js"></script>--><!-- inter용 -->
<!--<script type="text/javascript" src="/js/interactive/interactiveMapBtn.js"></script>--><!-- 공용(house에서도 사용) -->
<!--<script type="text/javascript" src="/js/interactive/interactiveMap_kosis.js"></script>--><!-- inter용 -->
<!--<script type="text/javascript" src="/js/interactive/interactiveLeftMenu.js"></script>--><!-- inter용 -->
<!--<script type="text/javascript" src="/js/interactive/interactiveDataBoard.js"></script> --><!-- inter용 -->
<!--<script type="text/javascript" src="/js/common/mapInfo/bookmarkAndShareInfo.js"></script>--><!-- inter용 -->
	<!-- End of inte용 - 2018.09.19	ywKim	[v180901] *************************-->
	
	<!-- policy용 - 2018.09.19	ywKim	[v180901] **********************************-->
	<script src="/js/policyWrite/linkage/boundary.js"></script><!-- policy용 -->
	<script src="/js/policyWrite/linkage/mydata.api.js"></script><!-- policy용 -->
	<script src="/js/policyWrite/linkage/local-government.api.js"></script><!-- policy용 -->
	<!-- <script src="/js/policyStatic/policyStaticMap.js"></script> --><!-- policy용 -->
	<!-- <script src="/js/policyStatic/policyStaticMapDataManagement.js"></script> --><!-- policy용 -->
	<script src="/js/policyStatic/policyStaticMapApi.js"></script><!-- policy용 -->
	<!-- <script src="/js/policyStatic/policyStaticMapLeftmenu.js"></script> --><!-- policy용 -->
	<script src="/js/policyStatic/policyStaticMapDataBoard.js"></script><!-- policy용 -->
	<script>var policyTarget = "$policyStaticMap";</script><!-- policy용 -->
	<script src="/js/policyStatic/combine.js"></script><!-- policy용 -->
	<script src="/js/policyWrite/combine.js"></script><!-- policy용 -->

	<!-- 2017.08.10 [개발팀] 등록팝업창  -->
	<script src="/js/policyWrite/policyWritePopup.js"></script><!-- policy용 -->
	<!-- End of policy용 - 2018.09.19	ywKim	[v180901] **********************************-->

	<!-- 일자리맵 서비스 스크립트 START -->
	<script src="${pageContext.request.contextPath}/js/workRoad/common/workRoad.js"></script>
	<script src="${pageContext.request.contextPath}/js/workRoad/common/workRoadLeftMenu.js"></script>
	<script src="${pageContext.request.contextPath}/js/workRoad/todayStatus/wrmTodayStatus.js"></script>
	<script src="${pageContext.request.contextPath}/js/workRoad/viewJobs/wrmViewJobs.js"></script>
	<script src="${pageContext.request.contextPath}/js/workRoad/statusAnls/wrmStatusAnls.js"></script>
	<script src="${pageContext.request.contextPath}/js/workRoad/statsAnls/wrmStatsAnls.js"></script>
	<script src="${pageContext.request.contextPath}/js/workRoad/todayStatus/tsMapFrame.js"></script>
 	<script src="${pageContext.request.contextPath}/js/workRoad/statsAnls/ssaMapFrame.js"></script>

 	<!-- 일자리맵 서비스 스크립트 END -->

	<!-- 사용자지정 컨트롤  -->
	<script type="text/javascript" src="/js/thematicMap/thematicMap_api.js"></script>
	<script type="text/javascript" src="/js/common/mapDraw/Draw.Feature.js"></script>
	<script type="text/javascript" src="/js/common/mapDraw/Draw.Control.Manager.js"></script>
	<script type="text/javascript" src="/js/common/mapDraw/draw/Draw.Cricle.js"></script>
	<script type="text/javascript" src="/js/common/mapDraw/draw/Draw.Rectangle.js"></script>
	<script type="text/javascript" src="/js/common/mapDraw/draw/Draw.Polygon.js"></script>
	<script type="text/javascript" src="/js/common/mapDraw/Draw.Control.Overlay.js"></script>
	<script type="text/javascript" src="/js/common/mapDraw/measure/Draw.AreaMeasure.js"></script>
	<script type="text/javascript" src="/js/common/mapDraw/measure/Draw.DistanceMeasure.js"></script>
	<script type="text/javascript" src="/js/common/mapDraw/Draw.Control.Distance.js"></script>
	<script type="text/javascript" src="/js/common/mapDraw/Draw.Control.Poi.js"></script>
	<script type="text/javascript" src="/js/common/mapDraw/poi/Poi.InteractiveMap.js"></script><!-- 공용(house에서도 사용) -->
  	<script type="text/javascript" src="/js/common/mapDraw/Draw.Control.Measure.js"></script>
  
	<script type="text/javascript" src="/js/board/jquery.paging.js"></script>
	<script type="text/javascript" src="/js/workRoad/legendInfo.js"></script>							<!-- 2018.12.27	ywKim	변경 -->
	<!-- <script type="text/javascript" src="/js/common/mapInfo/legendInfo.js"></script> -->
	<script type='text/javascript' src='/js/plugins/jquery.form.js'></script><!-- inter용 -->
<!--<script src="/js/policyStatic/policyStaticCombineMap.js"></script>-->  <!-- 2017.09.07 [개발팀] 융합기능개발  --><!-- policy용 -->

	<!-- 공유  -->
<!--<script type="text/javascript"  src="/js/interactive/kakao_script_api.js"></script> --><!-- inter용 -->

	<!-- 통계갤러리 --> 
<!--<script type="text/javascript" src="/js/plugins/slick.min.js"></script>--><!-- inter용 -->
<!--<script type="text/javascript" src="/js/plugins/jquery.tagsinput.min.js"></script>--><!-- inter용 -->
<!--<link rel="stylesheet" type="text/css" href="/sample2/include/css/gallery_pop.css" />--><!-- inter용 -->  
<!--<script type="text/javascript" src="/js/gallery/galleryEtc.js"></script>--><!-- inter용 -->
	<script type="text/javascript" src="/js/plugins/imageCapture/rgbcolor.js"></script>
	<script type="text/javascript" src="/js/plugins/imageCapture/canvg.js"></script>
	<script type="text/javascript" src="/js/plugins/imageCapture/html2canvas.js"></script>
	<script type="text/javascript" src="/js/plugins/imageCapture/html2canvas.svg.js"></script> <!-- 2017.03.14 svg 이슈 -->

    <!-- mng_s 20180219_김건민  -->
    <script src="/js/policyStatic/policyStaticTutorial.js"></script><!-- policy용 -->
    <link rel="stylesheet" href="/css/tutorial/tutorial.css"><!-- policy용 -->
    <!-- mng_e 20180219_김건민  -->

	<link rel="stylesheet" type="text/css" href="/css/workRoad/data_board.css">    
<%--
	<link rel="stylesheet" type="text/css" href="/css/common/left.css"><!-- policy용 - New Design인듯 -->
	<link rel="stylesheet" type="text/css" href="/css/common/data_board.css"><!-- policy용 - New Design인듯 -->
 --%>
 
	 <script src="${pageContext.request.contextPath}/js/workRoad/jquery.ajax-cross-origin.min.js"></script><!-- 2019-01-03 openAPI 조회 ajax로 변경 -->
 
</head>
<body>
	