<%
/**************************************************************************************************************************
* Program Name  : 대화형 통계지도 JSP  
* File Name     : interactiveMap.jsp
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
<%@ page import="kostat.sop.ServiceAPI.common.security.Security" %>
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
		//2017.12.04 [개발팀] 시큐어코딩
		strType = Security.cleanXss(strType);
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
			strType.equals("publicdata")		|| //2017.07.13 [개발팀] 공공데이터 url
			strType.equals("userdata")			||
			strType.equals("ecountry")) {
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
	    <title>대화형 통계지도 | 통계지리정보서비스</title>
	    
	    <link rel="stylesheet" type="text/css" href="/css/um.css" />
	    <link href="/css/common.css" rel="stylesheet" type="text/css" />
	    <link href="/css/default.css" rel="stylesheet" type="text/css" />
	    <link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
	    <link href="/css/wheelcolorpicker.css" rel="stylesheet" type="text/css" />
	    <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
	    <link href="/css/sbr/sbrActiveFunc.css" rel="stylesheet" type="text/css" />

	    <!-- <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
	    <link rel="stylesheet" href="/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
	    <link rel="stylesheet" type="text/css" href="/js/plugins/colorpicker/css/colpick.css"> -->
	    <!-- <link rel="stylesheet" href="/css/popup.css">
	    <link rel="stylesheet" href="/css/tutorial/interactive_tutorial.css"> -->
	    <!-- <link rel="stylesheet" type="text/css" href="/css/tutorial/common.css"> -->
	    
	    <!-- 20221005 김흥교 -->
	    
	    <link rel="stylesheet" href="/css/sbr/base.css">
    	<link rel="stylesheet" href="/css/sbr/font.css">
    	<link rel="stylesheet" href="/css/sbr/layout.css">
    	<link rel="stylesheet" href="/css/sbr/component.css">
	    
	    
	    <script src="/js/plugins/jquery.min.js"></script>
	    <script src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>  
	    <script src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>  
	    <script src="/js/plugins/colorpicker/js/colpick.js"></script>
	    <script src="/js/plugins/jquery.wheelcolorpicker.js"></script>
	    <script src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	    <script src="/js/plugins/EasyTree/jquery.easytree.js"></script> 
	    <script src="/js/plugins/colResizable-1.5.min.js"></script> 
	    <script src="/js/plugins/highcharts/highcharts.js"></script>
	    <script src="/js/plugins/highcharts/highcharts-more.js"></script>
		<script src="/jsp/pyramid/js/highchart/js/highcharts-3d.src.js"></script>
	    <script src="/js/plugins/highcharts/modules/exporting.js"></script>
	    <script src="/js/plugins/btoa.js"></script>
	    <script src="/js/plugins/highcharts/highchart.drag.js"></script>
	    
	    <!-- 2016.03.23 j.h.Seok -->
		<link rel="stylesheet" type="text/css" href="/css/handsontable.full.css">
	    <script src="/js/plugins/handsontable.full.js"></script>
	    
		<script src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
		<script src="/js/plugins/jquery.sha256.js"></script>
		<script src="/js/plugins/durian-v2.0.js"></script>
		<script src="/js/common/sop.portal.absAPI.js"></script>
			   
		<!-- mng_s 20200402 이진호 / 캐쉬 사용 자동 방지--> 
	    <script src="/js/common/map.js?version=1.2"></script>
	    <!-- mng_e 20200402 이진호 -->
	    
	    <script src="/js/common/common.js"></script>
	    <script src="/js/common/mapNavigation.js"></script>
	    <script src="/js/common/mapInfo/publicDataBoard.js"></script>
	    <script src="/js/common/mapInfo/mydataDataBoard.js"></script>
	    <!-- <script src="/js/interactive/interactiveMap.js"></script> -->
	    <script src="/js/sbr/sbrActiveMap.js"></script>
	    <script src="/js/interactive/interactiveTutorial.js"></script>
 	    <script src="/js/interactive/rotation/jquery.slides.min.js"></script> 
 	    <script src="/js/interactive/rotation/interactiveRotation.js"></script> 
 
 		<script src="/js/interactive/eMapAPI/interactiveSearch.js"></script>
 
	    <script src="/js/interactive/interactiveMapApi.js"></script>
	    <!-- <script src="/js/interactive/interactiveMapBtn.js"></script> -->
	    <script src="/js/sbr/sbrActiveMapBtn.js"></script>
	    <script src="/js/interactive/interactiveMap_kosis.js"></script>
		<script src="/js/interactive/interactiveMap_ecountry.js"></script>
	    <!-- <script src="/js/interactive/interactiveLeftMenu.js"></script> -->
		<script src="/js/interactive/interactiveDataBoard.js"></script>
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
     	<script src='/js/plugins/jquery.form.js'></script>
        <!--[If IE 9]>    
			<script src="/js/common/classList.js"></script>
		<![endif]-->
		
        <!-- 공유  -->
        <script  src="/js/interactive/kakao_script_api.js"></script>
        <!-- 통계갤러리 -->
        <script src="/js/plugins/slick.min.js"></script>  
        <script src="/js/plugins/jquery.tagsinput.min.js"></script>
	    <link rel="stylesheet" type="text/css" href="/sample2/include/css/gallery_pop.css" />  
    	<script src="/js/gallery/galleryEtc.js"></script>
    	<script src="/js/plugins/imageCapture/rgbcolor.js"></script>
    	<script src="/js/plugins/imageCapture/canvg.js"></script>
        <script src="/js/plugins/imageCapture/html2canvas.js"></script>
        <script src="/js/plugins/imageCapture/html2canvas.svg.js"></script> <!-- 2017.03.14 svg 이슈 -->
        
        <link rel="stylesheet" type="text/css" href="/css/common/data_board.css">

		<!-- 미니맵 -->
        <link rel="stylesheet" type="text/css" href="/js/plugins/miniMap/Control.MiniMap.css">
        <script src="/js/plugins/miniMap/Control.MiniMap.js"></script>
         
        
        <!-- SGIS_4 다중시계열 시작-->
        <link rel="stylesheet" href="/css/map/interactiveMultiTimeStyle.css" />
		<script src="/js/interactive/interactiveMultiTimeSeries.js"></script>
        <!-- SGIS_4 다중시계열 끝-->
        
        <!-- SGIS_4 다중시계열 시작-->
        <script src="/js/sbr/sbrChartDataBoard.js"></script>
        <!-- SGIS_4 다중시계열 끝-->
        
        
        <script src='/js/sbr/sbr.js?var=1'></script>
        <script src='/js/sbr/sbrtest1.js'></script>
        
        <script>
        
        var strType;
       		$(document).ready(
    			function() {
	    			//mng_s 20180412_김건민	
					/* if(getCookie("confirmMsg") == ""){
		       				$(".Popup_Info").hide();
	    					readyTutorial();
	    				} */
	    			//mng_e 20180412_김건민	
	    			
    				var tutorialFlag = true;
	       			if($(location).attr('search').match("tutorial_mode")){
	       				$(".Popup_Info").hide();
	    				readyTutorial();
	    				tutorialFlag = false;
	    				$(".list_btn").click();
	       			}
	       			
	       			if(!tutorialFlag){return false;}
	       			
	       			console.log("strType = " + "<%=strType%>");
	       			
	       			strType= "<%=strType%>";
	       			
    				//북마크나 최신데이터는 조건설정창을 자동으로 열지않는다.
    				if ("<%=strType%>" != "bookmark"   		  && 
    					"<%=strType%>" != "recentdata" 		  && 
    					"<%=strType%>" != "userdata"   		  && 
    					"<%=strType%>" != "sharedata"  		  &&
    					"<%=strType%>" != "totalindex" 		  &&
    					"<%=strType%>" != "population" 		  &&
    					"<%=strType%>" != "company"    		  &&
    					"<%=strType%>" != "household"  		  &&
    					"<%=strType%>" != "house"      		  &&
    					"<%=strType%>" != "farmhousehold" 	  &&
    					"<%=strType%>" != "forestryhousehold" &&
    					"<%=strType%>" != "fisheryhousehold"  &&
    					"<%=strType%>" != "householdmember"   &&
    					"<%=strType%>" != "kosis"			  &&
    					"<%=strType%>" != "ecountry") {
    					if("<%=strType%>"){
    						$(".sideQuick.sq02").trigger("click");
    					}
//     					$(".sideQuick.sq02").removeClass("on");
    				}
    				
    				var param = null;
    				var length = <%=paramObj.length()%>;
    				if (length == 0) {
    					param = "";
    				}else {
    					param = JSON.parse(<%=paramObj%>);
    				}
    				if("<%=strType%>"){
	    				$interactiveMap.ui.doAnalysisShareInfo("<%=strType%>", param);
    					
    				}
    				
    		});
       		
    	    function popupRotation(){
    	    	popX=$(".PopupCont")[0].offsetLeft;
    	    	popY=$(".PopupCont")[0].offsetTop;
    	    	var url = '/jsp/board/popRotation.jsp';
    	    	
				//mng_s 20200113 이진호 / 팝업창 크기 조절
    		    var options = 'toolbar=yes,scrollbars=yes,resizable=yes,copyhistory=yes,'+
    		                  'status=yes,location=yes,menubar=no,width=1100,height=600,top='+popY+',left='+popX; 
				//mng_e 20200113 이진호

    		   window.open(url, '', options);
    		   $(".Popup_Info").hide();
    	    }
    	    
    		function gridPop(){
    			var url = '/view/board/gridWrite?write';
    		    var options = 'toolbar=no,scrollbars=no,resizable=no,copyhistory=no,'+
    		                  'status=no,location=no,menubar=no,top=200,left=200'; 
    		   window.open(url, '', options);
 	  		   $(".Grid_Info").hide();
    		}
    	    
    		function callTutorial(){
    			if(confirm("<대화형 통계지도> \n처음 사용자를 위한 튜토리얼이 준비되어 있습니다.\n진행하시겠습니까?")) 
    				window.open('/view/map/interactiveMap?tutorial_mode', '_blank'); 
    		}
    		
    		
    		
        </script>
        
	</head>

	<body>  
		
		<div id="wrap">
			<!-- header // -->
			<%-- <header>
				<!-- Top Include -->
				<jsp:include page="/view/common/includeSearch"></jsp:include>
				
			</header> --%>
	
			<!-- body -->
			
			
		    
		 <div class="containerBox">
			
			<ul class="lnb">
	            <li><a class="home" href="javascript:void(0)"><span class="lnb_text">SGIS</span></a></li>
	            <li class="active"><a class="company" href="javascript:void(0);" onclick="getJsonDataTest();" ><span class="lnb_text">기업</span></a></li>
	            <li><a class="halfview" href="javascript:void(0)"><span class="lnb_text">함께보기</span></a></li>
	            <li><a class="help" href="javascript:void(0)" onclick="toggleHint()"><span class="lnb_text">도움말</span></a></li>
	        </ul>
			
			 <div class="topNav">
		            <ul class="navTitle">
		                <li><span class="btnPrimary">기업생태분석지도</span></li>
		                <li>
		                    <div class="selectBox category">
		                        <div class="optionContainer">
		                            <div class="option">
		                                <input type="radio" class="radio" id="menu1" name="category">
		                                <label for="menu1">지도로생태분석</label>
		                            </div>
		                            <div class="option">
		                                <input type="radio" class="radio" id="menu1" name="category">
		                                <label for="menu1">조건별 지역찾기</label>
		                            </div>
		                        </div>
		                        <div class="selected"><span class="text">지도로생태분석</span></div>
		                    </div>
		                </li>
		            </ul>
		
		            <ul class="filter">
		                <li class="selectBox iconSbr year">
		                    <div class="optionContainer">
		                        <div class="option">
		                            <input type="radio" class="radio" id="year2020" name="year">
		                            <label for="year2020">2020</label>
		                        </div>
		                        <div class="option">
		                            <input type="radio" class="radio" id="year2019" name="year">
		                            <label for="year2019">2019</label>
		                        </div>
		                    </div>
		                    <div class="selected"><span class="iconSbr"></span><span class="text">2020</span></div>
		                </li>
		
		                <li class="selectBox iconSbr area">
		                    <div class="optionContainer">
		                        <div class="option">
		                            <input type="radio" class="radio" id="area1" name="area">
		                            <label for="area1">행정구역</label>
		                        </div>
		                        <div class="option">
		                            <input type="radio" class="radio" id="area2" name="area">
		                            <label for="area2">1㎢ 격자</label>
		                        </div>
		                        <div class="option">
		                            <input type="radio" class="radio" id="area3" name="area">
		                            <label for="area3">산업단지</label>
		                        </div>
		                        <div class="option">
		                            <input type="radio" class="radio" id="area4" name="area">
		                            <label for="area4">상권</label>
		                        </div>
		                        <div class="option">
		                            <input type="radio" class="radio" id="area5" name="area">
		                            <label for="area5">전통시장</label>
		                        </div>
		                        <div class="option">
		                            <input type="radio" class="radio" id="area6" name="area">
		                            <label for="area6">도시화</label>
		                        </div>
		                    </div>
		                    <div class="selected"><span class="iconSbr"></span><span class="text">행정구역</span></div>
		                </li>
		
		                <li class="selectBox iconSbr gubun">
		                    <div class="optionContainer">
		                        <div class="option">
		                            <input type="radio" class="radio" id="area1" name="area">
		                            <label for="area1">행정구역</label>
		                        </div>
		                        <div class="option">
		                            <input type="radio" class="radio" id="area2" name="area">
		                            <label for="area2">1㎢ 격자</label>
		                        </div>
		                        <div class="option">
		                            <input type="radio" class="radio" id="area3" name="area">
		                            <label for="area3">산업단지</label>
		                        </div>
		                        <div class="option">
		                            <input type="radio" class="radio" id="area4" name="area">
		                            <label for="area4">상권</label>
		                        </div>
		                        <div class="option">
		                            <input type="radio" class="radio" id="area5" name="area">
		                            <label for="area5">전통시장</label>
		                        </div>
		                        <div class="option">
		                            <input type="radio" class="radio" id="area6" name="area">
		                            <label for="area6">도시화</label>
		                        </div>
		                    </div>
		                    <div class="selected"><span class="iconSbr"></span><span class="text">행정구역</span></div>
		                </li>
		
		                <li class="selectBox iconSbr gubun2">
		                    <div class="optionContainer">
		                        <div class="option">
		                            <input type="radio" class="radio" id="area1" name="area">
		                            <label for="area1">기업이 많은</label>
		                        </div>
		                        <div class="option">
		                            <input type="radio" class="radio" id="area2" name="area">
		                            <label for="area2">개업이 많은</label>
		                        </div>
		                        <div class="option">
		                            <input type="radio" class="radio" id="area3" name="area">
		                            <label for="area3">폐업이 많은</label>
		                        </div>
		                        <div class="option">
		                            <input type="radio" class="radio" id="area4" name="area">
		                            <label for="area4">활동기업이 많은</label>
		                        </div>
		                        <div class="option">
		                            <input type="radio" class="radio" id="area5" name="area">
		                            <label for="area5">비활동기업이 많은</label>
		                        </div>
		                        <div class="option">
		                            <input type="radio" class="radio" id="area6" name="area">
		                            <label for="area6">생존율이 높은</label>
		                        </div>
		                        <div class="option">
		                            <input type="radio" class="radio" id="area6" name="area">
		                            <label for="area6">영업기간이 높은</label>
		                        </div>
		                        <div class="option">
		                            <input type="radio" class="radio" id="area6" name="area">
		                            <label for="area6">성장기업이 높은</label>
		                        </div>
		                    </div>
		                    <div class="selected"><span class="iconSbr"></span><span class="text">기업이 많은</span></div>
		                </li>
		
		                <li class="setting">
		                    <button type="button"><i class="iconSbr setting"></i><span>설정</span></button>
		                </li>
		
		            </ul>
		
		         
		            <ul class="navRank mini">
		                <ul class="option">
		                    <li onclick="rankViewMode()"><i class="iconSbr rank"></i> 전국시도</li>
		                    <li onclick="rankViewMode()"><i class="iconSbr view"></i></li>
		                </ul>
		            </ul>
		            
		        </div>

			    
				<div id="mapRgn_box" style="width: 100%;height: 100%;margin-top: 65px;">	
					<div class="mapContents" id="mapRgn_1"></div><!-- 맵영역 --> 
				</div>
				
				
				<!-- 전국시도 시작 -->
				<div class="rankWrapper">
				        <div class="rankContent">
				            <ul class="rankList table active">
				                <li class="header">
				                    <span class="area">지역</span>
				                    <span class="company">기업 <i class="default"></i></span>
				                    <span class="year">전년대비 <i class="sortDown"></i></span>
				                    <span class="dist">분포 <i class="sortUp"></i></span>
				                </li>
				                <li>
				                    <span><i class="rank">1</i>서울특별시 서대문구</span>
				                    <span>2,223,422개</span>
				                    <span>15% <i class="up"></i></span>
				                    <span>50.0%</span>
				                </li>
				                <li>
				                    <span><i class="rank">2</i>부산광역시</span>
				                    <span>1,323,900개</span>
				                    <span>14.5% <i class="up"></i></span>
				                    <span>40.0%</span>
				                </li>
				                <li>
				                    <span><i class="rank">3</i>대구광역시</span>
				                    <span>1,323,900개</span>
				                    <span>14% <i class="up"></i></span>
				                    <span>30.0%</span>
				                </li>
				                <li>
				                    <span><i class="rank">4</i>인천광역시</span>
				                    <span>1,323,900개</span>
				                    <span>13% <i class="up"></i></span>
				                    <span>20.0%</span>
				                </li>
				                <li>
				                    <span><i class="rank">5</i>광주광역시</span>
				                    <span>1,323,900개</span>
				                    <span>12% <i class="up"></i></span>
				                    <span>10.0%</span>
				                </li>
				                <li>
				                    <span><i class="rank">6</i>울산광역시</span>
				                    <span>1,323,900개</span>
				                    <span>10% <i class="up"></i></span>
				                    <span>9.0%</span>
				                </li>
				                <li>
				                    <span><i class="rank">7</i>세종특별자치시</span>
				                    <span>1,323,900개</span>
				                    <span>9% <i class="up"></i></span>
				                    <span>8.0%</span>
				                </li>
				                <li>
				                    <span><i class="rank">8</i>경기도</span>
				                    <span>1,323,900개</span>
				                    <span>8% <i class="down"></i></span>
				                    <span>7.0%</span>
				                </li>
				                <li>
				                    <span><i class="rank">9</i>강원도</span>
				                    <span>1,323,900개</span>
				                    <span>7% <i class="down"></i></span>
				                    <span>6.0%</span>
				                </li>
				                <li>
				                    <span><i class="rank">10</i>충청북도</span>
				                    <span>1,323,900개</span>
				                    <span>6% <i class="down"></i></span>
				                    <span>5.0%</span>
				                </li>
				            </ul>
				            <ul class="rankList chart">chart</ul>
				            <div class="rankBtn">
				                <button class="btnLine" onclick="rankExpand()">
				                    <i class="iconExpand"></i><p>펼쳐보기</p>
				                </button>
				            </div>
				            <!-- <div class="rankReduce"><i class="reduce"></i></div> -->
				        </div>
				 </div>
	  			<!-- 전국시도 끝 -->
		        
			
			</div>  
			
		</div>
		
		<div class="selectLayer"></div>
		
		<!-- 상세 설정 -->
    <div class="leftContent settingBox htFit">
        <!-- 스크롤 영역 -->
        <div class="scroll container ht100per">
            <div class="titleWrap">
                <div class="title">
                    상세설정
                </div>
                <ul class="subTitle">
                    <li class="title">지도로 생태분석</li>
                    <li><span class="badge"><i class="company"></i>기업이 많은</span></li>
                </ul>
            </div>
    
            <!-- 단일선택 input type radio -->
            <div class="settingCheckbox">
                <div class="title">
                    <span class="icon icon_group">조직형태</span>
                    <span class="text">조직형태</span>
                </div>
                <ul class="content">
                    <li>
                        <input type="radio" id="settingGroup1" name="settingGroup">
                        <label for="settingGroup1">법인</label>
                    </li>
                    <li>
                        <input type="radio" id="settingGroup2" name="settingGroup">
                        <label for="settingGroup2">개인</label>
                    </li>                
                </ul>
            </div>
    
            <!-- 다중선택 input type checkbox -->
            <div class="settingCheckbox">
                <div class="title">
                    <span class="icon icon_ceo">기업대표</span>
                    <span class="text">기업대표(다중선택)</span>
                    <button class="btn btnRound" onclick="selectAllfalse(this)">전체해제</button>
                </div>
                <ul class="tab">
                    <li class="on">전체</li>
                    <li>남성</li>
                    <li>여성</li>
                </ul>
                <ul class="content">
                    <li>
                        <input type="checkbox" id="ceo1" name="settingCeo">
                        <label for="ceo1">30대 미만</label>
                    </li>
                    <li>
                        <input type="checkbox" id="ceo2" name="settingCeo">
                        <label for="ceo2">30대</label>
                    </li>
                    <li>
                        <input type="checkbox" id="ceo3" name="settingCeo">
                        <label for="ceo3">40대</label>
                    </li>
                    <li>
                        <input type="checkbox" id="ceo4" name="settingCeo">
                        <label for="ceo4">50대</label>
                    </li>
                    <li>
                        <input type="checkbox" id="ceo5" name="settingCeo">
                        <label for="ceo5">60대</label>
                    </li>
                    <li>
                        <input type="checkbox" id="ceo6" name="settingCeo">
                        <label for="ceo6">여성</label>
                    </li>
                </ul>
            </div>

            <div class="settingCheckbox">
                <div class="title">
                    <span class="icon icon_ceo">기업대표</span>
                    <span class="text">기업대표(다중선택)</span>
                    <button class="btn btnRound" onclick="selectAllfalse(this)">전체해제</button>
                </div>
                <ul class="tab">
                    <li class="on">전체</li>
                    <li>남성</li>
                    <li>여성</li>
                </ul>
                <ul class="content">
                    <li>
                        <input type="checkbox" id="ceo11" name="settingCeo1">
                        <label for="ceo11">30대 미만</label>
                    </li>
                    <li>
                        <input type="checkbox" id="ceo21" name="settingCeo1">
                        <label for="ceo21">30대</label>
                    </li>
                    <li>
                        <input type="checkbox" id="ceo31" name="settingCeo1">
                        <label for="ceo31">40대</label>
                    </li>
                    <li>
                        <input type="checkbox" id="ceo41" name="settingCeo1">
                        <label for="ceo41">50대</label>
                    </li>
                    <li>
                        <input type="checkbox" id="ceo51" name="settingCeo1">
                        <label for="ceo51">60대</label>
                    </li>
                    <li>
                        <input type="checkbox" id="ceo61" name="settingCeo1">
                        <label for="ceo61">여성</label>
                    </li>
                </ul>
            </div>
    
            
        </div>
        <div class="close" onclick="closeLeft(this)"><i class="closeBtn"></i></div>
    </div>
		
		
	</body>
</html>