<%
/**************************************************************************************************************************
* Program Name	: 생활권역 통계지도 Main
* File Name		: catchmentAreaMain.jsp
* Comment		: 
* History		: 
*	2020.06.11	방민정	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Map" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
	    <meta charset="utf-8" />
	    <meta name="format-detection" content="telephone=no" />
	    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	    <title>생활권역 통계지도</title>
	    
	    <link rel="stylesheet" type="text/css" href="/css/um.css" />
	    <link href="/css/common.css" rel="stylesheet" type="text/css" />
	    <link href="/css/default.css" rel="stylesheet" type="text/css" />
	    <link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
	    <link href="/css/wheelcolorpicker.css" rel="stylesheet" type="text/css" />
	    <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
	    <link href="/css/map/interactiveFunc.css" rel="stylesheet" type="text/css" />
<!-- 	    <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" /> -->
	    <link rel="stylesheet" href="/css/catchmentArea/plugin/jquery.mCustomScrollbar.css"/>	    
	    <link rel="stylesheet" href="/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
	    <link rel="stylesheet" type="text/css" href="/js/plugins/colorpicker/css/colpick.css">
	    <link rel="stylesheet" href="/css/popup.css">
	    <link rel="stylesheet" type="text/css" href="/css/tutorial/common.css">
	    <link rel="stylesheet" type="text/css" href="/css/handsontable.full.css">
	    <link rel="stylesheet" type="text/css" href="/css/common/data_board.css">
	    <link rel="stylesheet" type="text/css" href="/sample2/include/css/gallery_pop.css" />
	    <!-- 미니맵 -->
        <link rel="stylesheet" type="text/css" href="/js/plugins/miniMap/Control.MiniMap.css">
        <!-- 생활권역 CSS -->
        <link href="/css/catchmentArea/catchmentAreaCommon.css" rel="stylesheet" type="text/css" />
        <link href="/css/catchmentArea/catchmentAreaUi.css" rel="stylesheet" type="text/css" />
        <link href="/css/catchmentArea/catchmentAreaTutorial.css" rel="stylesheet" type="text/css">
        <!-- SGIS4_생활권역 시작 -->
        <link href="/css/catchmentArea/catchmentAreaUi2.css" rel="stylesheet" type="text/css" />
        <link href="/css/map/bizStatsHelper.css" rel="stylesheet" type="text/css" />
        <!-- SGIS4_생활권역 끝 -->
	    
	    <script src="/js/plugins/jquery.min.js"></script>
	    <script src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>  
<!-- 	    <script src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script> -->
	    <script src="/js/catchmentArea/plugin/jquery.mCustomScrollbar.js" type="text/javascript"></script>
	    <script src="/js/plugins/colorpicker/js/colpick.js"></script>
	    <script src="/js/plugins/jquery.wheelcolorpicker.js"></script>
	    <script src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	    <script src="/js/plugins/EasyTree/jquery.easytree.js"></script> 
	    <script src="/js/plugins/colResizable-1.5.min.js"></script> 
	    <script src="/js/plugins/highcharts/highcharts.js"></script>
	    <script src="/js/plugins/highcharts/highcharts-more.js"></script>	    
	    <!-- SGIS4_생활권역 시작 -->
	    <script src="/js/catchmentArea/plugin/solid-gauge.js"></script>
	    <!-- SGIS4_생활권역 끝 -->
		<script src="/jsp/pyramid/js/highchart/js/highcharts-3d.src.js"></script>
	    <script src="/js/plugins/highcharts/modules/exporting.js"></script>
	    <script src="/js/plugins/btoa.js"></script>
	    <script src="/js/plugins/highcharts/highchart.drag.js"></script>
	    <!-- SGIS4_생활권역 시작 -->
<!-- 	    <script src="/js/plugins/highcharts/heatmap.js"></script> -->
	    <!-- SGIS4_생활권역 끝 -->
	    <script src="/js/plugins/handsontable.full.js"></script>
		<script src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
		<script src="/js/plugins/jquery.sha256.js"></script>
		<script src="/js/plugins/durian-v2.0.js"></script>
		<script src="/js/common/sop.portal.absAPI.js"></script>
		<script src="/js/catchmentArea/gis.service.absAPI.js"></script>
	    <script src="/js/catchmentArea/catchmentAreaMap.js?version=1.0"></script>
	    <script src="/js/common/common.js"></script>
	    <script src="/js/common/mapNavigation.js"></script>
	    <script src="/js/common/mapInfo/publicDataBoard.js"></script>
	    <!-- SGIS4_1025_생활권역 시작 -->
<!--    <script src="/js/common/mapInfo/mydataDataBoard.js"></script>-->
		<!-- SGIS4_1025_생활권역 끝 -->	
		<script src="/js/catchmentArea/catchmentAreaObj.js"></script>
		<script src="/js/catchmentArea/catchmentAreaMask.js"></script>

		<!-- 페이지 JS -->
		
	    <script src="/js/catchmentArea/catchmentAreaMain.js"></script>
<!-- 	    <script src="/js/interactive/interactiveMapBtn.js"></script> -->
	    <script src="/js/catchmentArea/catchmentAreaBtn.js"></script>
	    <script src="/js/interactive/interactiveTutorial.js"></script>
 	    <script src="/js/interactive/rotation/jquery.slides.min.js"></script> 
 	    <script src="/js/interactive/rotation/interactiveRotation.js"></script> 
		<script src="/js/interactive/eMapAPI/interactiveSearch.js"></script> 
	    <script src="/js/catchmentArea/catchmentAreaApi.js"></script>
	    <script src="/js/interactive/interactiveMap_kosis.js"></script>
		<script src="/js/interactive/interactiveMap_ecountry.js"></script>
		<!-- 추가부분 -->
 	    <script src="/js/catchmentArea/catchmentAreaLeftMenu.js"></script>
 	    <script src="/js/catchmentArea/catchmentAreaDataBoard.js"></script>
 	    <script src="/js/catchmentArea/catchmentAreaLegendInfo.js"></script>
 	    <script src="/js/catchmentArea/catchmentAreaMsgCommon.js"></script>
 	    <script src="/js/catchmentArea/catchmentAreaTutorial.js"></script>
 	    <!-- 추가부분 end -->
        <!-- SGIS4_생활권역 시작 -->
        <script src="/js/catchmentArea/catchmentAreaKSIC.js"></script>
        <script src="/js/common/themeCdCommon.js"></script>  <!-- 출처:업종통계지도, 사용처:오직!! 주요 생활업종 분류 팝업 -->

        <!-- SGIS4_생활권역 끝 --> 	    
        <!-- 공유  -->
        <script  src="/js/interactive/kakao_script_api.js"></script>	
        <!-- 페이지 JS --> 	


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
      <!--  <script src="/js/common/mapInfo/legendInfo.js"></script> --> 
     	<script src='/js/plugins/jquery.form.js'></script>
        <!--[If IE 9]>    
			<script src="/js/common/classList.js"></script>
		<![endif]-->
        <!-- 통계갤러리 -->
        <script src="/js/plugins/slick.min.js"></script>  
        <script src="/js/plugins/jquery.tagsinput.min.js"></script>	      
    	<script src="/js/gallery/galleryEtc.js"></script>
    	<script src="/js/plugins/imageCapture/rgbcolor.js"></script>
    	<script src="/js/plugins/imageCapture/canvg.js"></script>
        <script src="/js/plugins/imageCapture/html2canvas.js"></script>
        <script src="/js/plugins/imageCapture/html2canvas.svg.js"></script> <!-- 2017.03.14 svg 이슈 -->
		<!-- 미니맵 -->
        <script src="/js/plugins/miniMap/Control.MiniMap.js"></script>
		<script>
			srvLogWrite("Q0","01","01","00","","");
		</script>
	</head>

	<body>
	<div class="skip"><a href="#gnb">주메뉴 바로가기</a><a href="#conysin">컨텐츠 바로가기</a></div>
		<div id="wrap">
			<!-- header // -->
			<header>
				<!-- Top Include -->
				<jsp:include page="/view/common/includeSearch"></jsp:include>
			</header>
	
			<!-- body -->
			<div class="containerBox" id="conysin">  
				
				<div class="rela">
					<div class="sceneBox on" id="view1" >
						<div class="sceneRela">
							<div class="toolBar">
								<h2>생활권역 통계지도</h2>
								<!-- 추가 요청(REQ001) 시작 - 생활권역 통계지도 도움말 생성 -->
								<a id="catchmentHelpBtn" style="position: absolute; left: 157px; top: 6.5px" 
									data-subj="생활권역 지도 도움말" href="javascript:void(0)" title="<p class='subC'>클릭하면 생활권역 통계지도에 대한 간략한 도움말을 볼 수 있습니다.</p>">
								    <img src="/images/catchmentArea/question_icon.png" alt="도움말">
								</a>
								<div class="location_select">
									<select name="sido" id="sido" class="selct_91" title="시도선택">
									</select>
									<select name="sigungu" id="sigungu" class="selct_92" title="시군구선택">
										<option value="0">시군구 선택</option>
									</select>
									<select name="emdong" id="emdong" class="selct_92" title="읍면동선택">
										<option value="0">읍면동 선택</option>
									</select>								
								</div>
								<!-- 추가 요청(REQ001) 끝 - 생활권역 통계지도 도움말 생성 -->
								<div class="divs_wrap01">
									<div class="divs01" style="display:none;">
										<img src="/images/catchmentArea/pop_ico01.png"><span>위치1: </span><span>--</span>
									</div>
									<div class="divs02" style="display:none;">
										<img src="/images/catchmentArea/pop_ico02.png"><span>연도1: </span><span id="leftMapOnTopYearTxt1">--</span>
									</div>						
								</div>
								
								<div class="tb_right" id="btnList_1">
								<!-- 튜토리얼 -->
									<!--  <button type="button" id="tuto_start_btn_2" style="   border-radius: 1000px;	background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 26px; width: 95px; right: 390px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="$catchmentAreaMain.ui.callTutorial();" title="사용법 따라하기">튜토리얼</button>-->
								<!-- 튜토리얼 -->
								
									<ul> 
										<li>
											<div class="main_btn_top">
												<button type="button" id="tuto_start_btn_2" style="   border-radius: 1000px;	background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 26px; width: 95px; right: 90px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="$catchmentAreaMain.ui.callTutorial();" title="사용법 따라하기">튜토리얼</button>
												<a id="btnReport" onclick="javascript:$catchmentAreaMain.ui.getReport();srvLogWrite('Q0','03','01','00','','');" class="btn06"  title="보고서 보기">보고서</a>
											</div>
<!-- 											<a onclick="javascript:$catchmentAreaMain.ui.getReport();" class="tb_report" style="cursor:pointer;" title="보고서 보기"> -->
<!-- 												<img src="/img/ico/ico_toolbars09.png" alt="보고서 보기"> -->
<!-- 											</a> -->
										</li>
									<!-- 부가기능 나중에 추가
										<li><a onclick="javascript:$interactiveMap.ui.doMaxSize(1);" class="tb_sizing" style="cursor:pointer;" title="전체 화면 확대"><img src="/img/ico/ico_toolbars01.png" alt="전체 화면 확대"/></a></li>
										<li><a onclick="javascript:$interactiveMap.ui.doClearMap(1);" style="cursor:pointer;" title="초기화"  id="btn_reset"><img src="/img/ico/ico_toolbars02.png" alt="초기화"/></a></li>
										<li><a onclick="javascript:$interactiveMap.ui.doShare(1);" class="tb_share" style="cursor:pointer;" title="URL 공유하기" ><img src="/img/ico/ico_toolbars04.png" alt="URL 공유하기"/></a></li>
										<li><a onclick="javascript:$galleryAdd.interactiveGalleryPopOpen();" class="tb_bookmark" style="cursor:pointer;" title="즐겨찾기로 저장하기" ><img src="/img/ico/ico_toolbars05.png" alt="즐겨찾기로 저장하기"/></a></li>
										<li><a onclick="javascript:$interactiveMap.ui.reportDataSet(1);" class="tb_report" style="cursor:pointer;" title="보고서 보기" ><img src="/img/ico/ico_toolbars09.png" alt="보고서 보기"/></a></li>
										<li><a onclick="javascript:$interactiveMap.ui.doAddMap(1);" class="tb_mapAdd" style="cursor:pointer;" title="지도 추가하여 비교하기" ><img src="/img/ico/ico_toolbars07.png" alt="지도 추가하여 비교하기"/></a></li>
										<li style="display:none;"><a onclick="javascript:$interactiveMap.ui.doCombineMap(1);" class="tb_combine" style="cursor:pointer;" title="지도 겹쳐보기" ><img src="/img/ico/ico_toolbars08.png" alt="지도 겹쳐보기"/></a></li>
									-->
									</ul> 
									<!--  
									<a onclick="javascript:$interactiveMap.ui.doRemoveMap(1);" class="tb_close" style="cursor:pointer;"><img src="/img/um/btn_closel04.png" alt="창닫기" style="height:34px;"/></a>
									-->
								</div>
							</div>
							
							<!-- 도움말 -->
<%-- 
							<div class="interactiveBar"><!-- map topbar -->
					    		<p class="helperText" id="helper_1" style="margin-left: 130px;">좌측 시작 버튼을 클릭하여 항목을 선택하고 통계버튼을 만드세요.</p>
					    		<p class="helperText" id="title_1" style="display:none;"></p>
					    		<!-- 위치/통계검색 -->
					    		<div style="left:550px; position:absolute;  top:3px;">
					    			<select id="addSearchSel" style="height:28px; cursor:pointer;">
										<option value="1">위치 검색</option>
										<option value="2">통계 검색</option>
									</select>
					    		</div>  
					    		<input type="text" id="schNmTxt" placeholder="검색어를 입력해주세요"  style="left:630px; width:200px; top:3px; position:absolute;  height:16px; line-height:20px; border:1px solid #ccc; padding:5px 10px;" />
								<a class="inputSearchKeyboard" href="javascript:openKeyboard('schNmTxt','schNmImg');" 
								style="position:absolute; background:white !important;padding:0 !important;margin:8px 0px 0px 710px !important;">
									<img class="keyimg" src="/js/plugins/keyboard/img/key_off.png" style="display:inline-block; width:20px; height:15px; vertical-align: middle;">
								</a>
					    		<img id="schNmImg" src="/img/common/btn_search.gif" style="left:827px; top:9px; position:absolute;cursor: pointer;" alt="검색">
					    		 <a href="javascript:void(0)" id="searchHelp" style="left:855px; top:-2px; position:absolute;cursor: pointer; background:#f5f5f5;" class="ar" data-subj="위치 및 통계 검색" 
					    		 title="* 위치검색 : 사용자가 원하는 위치로 쉽게 지도이동을 하기 위한 검색기능으로 국토정보플랫폼의 OpenAPI를 이용해서 검색결과를 표출함 <br />* 통계검색 : 대화형통계지도에서 제공하는 통계지표를 검색하고 바로 통계를 조회할 수 있는 기능"><img src="/img/ico/ico_i.gif" alt="물음표" /></a>
								<input type="text" id="schNmTxt2" style="border-radius: 13px; height:16px; line-height:20px; border:1px solid #ccc; padding:5px 10px; display:none;"  placeholder="인구,가구 등 검색" />
								<!-- 위치/통계검색 end-->	
					    		<a id="manual_icon_1" onclick="javascript:window.open('/view/newhelp/in_help_10_0');">이용법</a>
					    		<p style="position:absolute;left:40%;display:inline-block;line-height:30px;" id="grid_title_1"></p>
					    	</div><!-- map topbar -->
--%>
					    	<!-- 도움말 end -->
					    	
					    	<!--지도영역-->
					    	<div class="mapContents" id="mapRgn_1" data-map-id="0"></div>	<!-- data-map-id 속성 추가 - 박상언 2020-10-15 작성 -->
						    <!-- 지도영역 end -->
						    <div class="mapContents" id="mapRgn_3" data-map-id="2" style="width:798px;height:603px;"></div>	<!-- data-map-id 속성 추가 - 박상언 2020-10-15 작성 -->	
					    	<div class="resizeIcon"><!-- 리사이즈 아이콘 --></div>
							<div class="main_btn_right" id="mapZm_1">
								<a href="#" class="pl" title="확대"></a>
								<span>읍면동</span>
								<a href="#" class="mi" title="축소"></a>
							</div>					    		
				    	</div>				    	
			    	</div>
					<div class="sceneBox" id="view2">
						<div class="sceneRela">
							<div class="toolBar">
								<div class="divs_wrap02">
									<div class="divs01" style="display:none;">
										<img src="/images/catchmentArea/pop_ico01.png"><span>위치2: </span><span>---</span>
									</div>
									<div class="divs02" style="display:none;">
										<img src="/images/catchmentArea/pop_ico02.png"><span>연도2: </span><span id="leftMapOnTopYearTxt2">---</span>
									</div>
								</div>							
								<div class="tb_right" id="btnList_2" style="display:none;">
									<a onclick="javascript:$catchmentAreaMain.ui.doRemoveMap(2);" class="tb_close" style="cursor:pointer;"><img src="/img/um/btn_closel03.png" alt="창닫기" style="height:34px;"/></a>
								</div>
							</div>
					    	
					    	<!--지도영역-->
					    	<div class="mapContents" id="mapRgn_2" data-map-id="1"></div>
						    <!-- 지도영역 end -->
						    	
					    	<div class="resizeIcon"><!-- 리사이즈 아이콘 --></div>
							<div class="main_btn_right" id="mapZm_2">
								<a href="#" class="pl" title="확대"></a>
								<span>읍면동</span>
								<a href="#" class="mi" title="축소"></a>
							</div>					    		
				    	</div>				    	
			    	</div>			  
			    	<!-- left menu --> 
    				<div class="leftArea">
    					<!-- Top Include -->
						<jsp:include page="/view/catchmentArea/catchmentAreaLeftMenu"></jsp:include>
			    	</div>
			    	
			    	<!-- 데이터보드 -->
			    	<div id="dataBoard">
						<jsp:include page="/view/catchmentArea/catchmentAreaDataBoard"></jsp:include>
					</div>
			    	<!-- 데이터보드 end-->
				</div>
				
				<!-- 튜토리얼 팝업창 -->
					<div class="tutorial_wrap" style="display:none">
						<a href="javascript:void(0);" class="close"><img  src="/images/catchmentArea/tuto_img02.png"></a>
						<img src="/images/catchmentArea/tuto_img01.png" class="top_img">
						<p class="txt01">우리동네 초등학교의<br><span class="txt02">생활권역</span>이 궁금하지 않으세요?</p>
						<a href="javascript:void(0);" class="ques01" onclick="javascript:$catchmentAreaMain.ui.callTutorial();">네, 궁금해요.</a>
						<a href="javascript:void(0);" class="ques02">아니오, 괜찮아요.</a>
						<div class="cl_check">
							<input type="checkbox" id="close_check" class="date_chk" ><label for="close_check">일주일동안 열지 않기</label>
						</div>
					</div>
					 
				<!-- 튜토리얼 팝업창 end -->
				
				<!-- 리포트 팝업창 -->
					<div class="reportChoose_wrap" id="reportRangePopup" style="display:none">
						<div style="background: #3B80EF;padding: 5px 0px 5px;">
							<p id="reportTitle" style="color:white">보고서 출력</p><a href="javascript:void(0);"onclick="$catchmentAreaMain.ui.colseReportPopup();" class="close"><img src="/images/catchmentArea/ico_close06.png" style="width:17px;"></a>
						</div>
						<div>
							<a id="typeText" style="margin: 5px 17px; font-size:16px;"></a>
							<input type="checkbox" id="reportListAll"/><label for="reportListAll">전체선택</label>
						</div>
						<div id="chooseList" class="chooseList"></div>
						<div id="warnigText"></div>
						<div>
							<a href="javascript:void(0);"onclick="$catchmentAreaMain.ui.setReport();" class="report_btn_select" id="reportSelectBtn">출력</a>
						</div>
					</div>
				<!-- 리포트 팝업창 end -->
				  
			    <footer id="footer">
			    	<!-- Bottom Include -->
					<jsp:include page="/view/common/includeBottom/hidden"></jsp:include>
			    </footer>				
			</div>
		</div>

	<!-- SGIS4_생활권역 시작 -->
	<!-- 생활업종현황 도움말 (출처:업종통계지도, 사용처:오직!! 주요 생활업종 분류 팝업 ) -->
	<jsp:include page="/view/catchmentArea/lifeBizHelper"></jsp:include>
	<!-- SGIS4_생활권역 끝 -->
	
	<!-- 튜토리얼 !-->
 	<div class="tutorialWrapper" style= "display: none" draggable="false">
 		<button type="button" id="tuto_start_btn" style="border-radius: 1000px;	background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 26px; width: 100px; right: 170px; top:104px; margin-top: 6px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="closeTutorial();" title="튜토리얼 종료">튜토리얼 종료</button>		
		<div id="headerTutorial" style="width:100%; height:135px;" draggable="false">
			<div id="tutorialText" draggable="false">
				<img id="tuto_end_btn" src="/img/tutorial/tuto_end_btn_01.png" alt="튜토리얼종료" style="float: right; position: relative; width:13px; height:13px; top: 10px; left: -10px;  opacity:0.6; cursor:pointer; text-indent:-2000px;" onclick="closeTutorial();" draggable="false">
			</div>
		</div>
		
		<img id="srvIndexBtn" src="/img/tutorial/catchmentArea/srvIndexBtn.png" alt="시작" draggable="false">
		<img id="areabtn01_1" src="/img/tutorial/catchmentArea/areabtn01_1.png" alt="시도선택" draggable="false">
		<img id="areabtn01_2" src="/img/tutorial/catchmentArea/areabtn01_2.png" alt="시도선택" draggable="false">
		<img id="areabtn01_3" src="/img/tutorial/catchmentArea/areabtn01_3.png" alt="시도선택" draggable="false">
		<img id="areabtn02_1" src="/img/tutorial/catchmentArea/areabtn02_1.png" alt="시군구선택" draggable="false">
		<img id="areabtn02_2" src="/img/tutorial/catchmentArea/areabtn02_2_n.png" alt="시군구선택" draggable="false">
		<img id="areabtn02_3" src="/img/tutorial/catchmentArea/areabtn02_3.png" alt="시군구선택" draggable="false">
		<img id="areabtn03_1" src="/img/tutorial/catchmentArea/areabtn03_1.png" alt="읍면동선택" draggable="false">
		<img id="areabtn03_2" src="/img/tutorial/catchmentArea/areabtn03_2_n.png" alt="읍면동선택" draggable="false">
		<img id="areabtn03_3" src="/img/tutorial/catchmentArea/areabtn03_3.png" alt="읍면동선택" draggable="false">
		<img id="serchSizeBtn" src="/img/tutorial/catchmentArea/serchSizeBtn.png" alt="검색기준" draggable="false">
		<img id="krwdSearchBtn_1" src="/img/tutorial/catchmentArea/krwdSearchBtn_1.png" alt="검색" draggable="false">
		<img id="krwdSearchBtn_2" src="/img/tutorial/catchmentArea/krwdSearchBtn_2.png" alt="검색" draggable="false">
		<img id="krwdSearchBtn_3" src="/img/tutorial/catchmentArea/krwdSearchBtn_3.png" alt="검색" draggable="false">
		<img id="poiSearchBtn_1" src="/img/tutorial/catchmentArea/poibtn_1.png" alt="검색" draggable="false">
		<img id="poiSearchBtn_2" src="/img/tutorial/catchmentArea/poibtn_2.png" alt="검색" draggable="false">
		<img id="poiSearchBtn_3" src="/img/tutorial/catchmentArea/poibtn_3.png" alt="검색" draggable="false">
		<img id="factypebtn_1" src="/img/tutorial/catchmentArea/factypebtn_1.png" alt="검색" draggable="false">
		<img id="factypebtn_2" src="/img/tutorial/catchmentArea/factypebtn_2.png" alt="검색" draggable="false">
		<img id="factypebtn_3" src="/img/tutorial/catchmentArea/factypebtn_3_n.png" alt="검색" draggable="false">
		<img id="srvAreaTypebtn_1" src="/img/tutorial/catchmentArea/srvAreaTypebtn_1.png" alt="검색" draggable="false">
		<img id="srvAreaTypebtn_2" src="/img/tutorial/catchmentArea/srvAreaTypebtn_2.png" alt="검색" draggable="false">
		<img id="srvAreaTypebtn_3" src="/img/tutorial/catchmentArea/srvAreaTypebtn_3_n.png" alt="검색" draggable="false">
		<img id="srvAreaTypebtn_4" src="/img/tutorial/catchmentArea/srvAreaTypebtn_4.png" alt="검색" draggable="false">
		<img id="databoardBtn_1" src="/img/tutorial/catchmentArea/databoardBtn_1.png" alt="검색" draggable="false">
		<img id="databoardBtn_2_1" src="/img/tutorial/catchmentArea/databoardBtn_2_1.png" alt="검색" draggable="false">
		<img id="databoardBtn_2" src="/img/tutorial/catchmentArea/databoardBtn_2.png" alt="검색" draggable="false">
		<img id="databoardBtn_3" src="/img/tutorial/catchmentArea/databoardBtn_3.png" alt="검색" draggable="false">
		<img id="reportbtn_1" src="/img/tutorial/catchmentArea/reportbtn_1.png" alt="검색" draggable="false">
		<img id="reportbtn_2" src="/img/tutorial/catchmentArea/reportbtn_2.png" alt="검색" draggable="false">
		<img id="reportbtn_3" src="/img/tutorial/catchmentArea/reportbtn_3.png" alt="검색" draggable="false">
		<img id="reportbtn_4" src="/img/tutorial/catchmentArea/reportbtn_4.png" alt="검색" draggable="false">
		<img id="reportbtn_5" src="/img/tutorial/catchmentArea/reportbtn_5.png" alt="검색" draggable="false">
		<img id="gridmenubtn_1" src="/img/tutorial/catchmentArea/gridmenubtn_1.png" alt="검색" draggable="false">
		<img id="gridmenubtn_2" src="/img/tutorial/catchmentArea/gridmenubtn_2.png" alt="검색" draggable="false">
		<img id="gridmenubtn_3" src="/img/tutorial/catchmentArea/gridmenubtn_3.png" alt="검색" draggable="false">
		<img id="gridmenubtn_3_1" src="/img/tutorial/catchmentArea/gridmenubtn_3_1.png" alt="검색" draggable="false">
		<img id="gridmenubtn_3_2" src="/img/tutorial/catchmentArea/gridmenubtn_3_2.png" alt="검색" draggable="false">
		<img id="gridmenubtn_4" src="/img/tutorial/catchmentArea/gridmenubtn_4.png" alt="검색" draggable="false">
		<img id="gridmenubtn_4_1" src="/img/tutorial/catchmentArea/gridmenubtn_4_1.png" alt="검색" draggable="false">
		<img id="gridmenubtn_4_2" src="/img/tutorial/catchmentArea/gridmenubtn_4_2.png" alt="검색" draggable="false">
		<img id="gridmenubtn_5" src="/img/tutorial/catchmentArea/gridmenubtn_5.png" alt="검색" draggable="false">
		<img id="gridmenubtn_6" src="/img/tutorial/catchmentArea/gridmenubtn_6.png" alt="검색" draggable="false">

		<img id="toPoint_1" src="/img/tutorial/toPoint_1.png" alt="포인터" draggable="false">
		<img id="toPoint_2" src="/img/tutorial/toPoint_2.png" alt="포인터" draggable="false">
		<img id="toPoint_3" src="/img/tutorial/toPoint_3.png" alt="포인터" draggable="false">
		<img id="toPoint_4" src="/img/tutorial/toPoint_4.png" alt="포인터" draggable="false">

		<img id="toPoint_1_1" src="/img/tutorial/toPoint_1.png" alt="포인터" draggable="false">
		<img id="toPoint_2_2" src="/img/tutorial/toPoint_2.png" alt="포인터" draggable="false">
		<img id="toPoint_3_3" src="/img/tutorial/toPoint_3.png" alt="포인터" draggable="false">
		<img id="toPoint_4_4" src="/img/tutorial/toPoint_4.png" alt="포인터" draggable="false">
 	</div>
 	<!-- 튜토리얼 end -->
	</body>
</html>
