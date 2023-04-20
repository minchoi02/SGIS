<%
/**************************************************************************************************************************
* Program Name  : 대화형 통계지도 JSP  
* File Name     : interactiveMap.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
* 				: 아이티밴드 이용하, 김흥교 2022-11-13
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
	    <title>기업생태지도 | 통계지리정보서비스</title>
	    
	    <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
	    <link href="/css/sbr/sbrActiveFunc.css" rel="stylesheet" type="text/css" />

	    
	    <!-- 20221005 김흥교 -->
	    
	    <link rel="stylesheet" href="/css/sbr/base.css">
    	<link rel="stylesheet" href="/css/sbr/font.css?ver=2">
    	<link rel="stylesheet" href="/css/sbr/layout.css">
    	<link rel="stylesheet" href="/css/sbr/component.css">
    	<link rel="stylesheet" href="/css/sbr/rSlider.css">
	    
	    <!-- 20221005 이용하 : cdn highchart 사용을 위해 관련 js 주석 처리 -->
	   	<script src="/js/plugins/jquery.min.js"></script>
	    <script src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>  
	    <script src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>  
	    <script src="/js/plugins/colorpicker/js/colpick.js"></script>
	    <script src="/js/plugins/jquery.wheelcolorpicker.js"></script>
	    <script src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	    <script src="/js/plugins/EasyTree/jquery.easytree.js"></script> 
	    <script src="/js/plugins/colResizable-1.5.min.js"></script>
	    
	    <!-- 20221019 김흥교 -->
	    <script src='/js/sbr/rSlider.min.js'></script>
	     
	   <script src="/js/plugins/highcharts/highcharts.js"></script>
	    <script src="/js/plugins/highcharts/highcharts-more.js"></script>
		<script src="/jsp/pyramid/js/highchart/js/highcharts-3d.src.js"></script>
	    <script src="/js/plugins/highcharts/modules/exporting.js"></script>
	    <script src="/js/plugins/btoa.js"></script>
	    <script src="/js/plugins/highcharts/highchart.drag.js"></script>
	    
	    <!-- <script src="https://code.highcharts.com/highcharts.js"></script> -->
	    <script src="/jsp/pyramid/js/highchart/js/modules/funnel.js"></script>
	    <script src="/jsp/pyramid/js/highchart/js/modules/heatmap.js"></script>
	    <script src="/jsp/pyramid/js/highchart/js/modules/treemap.js"></script>
	    
	    	    
	    
	    <!-- 2016.03.23 j.h.Seok -->
		<!-- <link rel="stylesheet" type="text/css" href="/css/handsontable.full.css"> -->
	    <!-- <script src="/js/plugins/handsontable.full.js"></script> -->
	    
		<script src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
		<script src="/js/plugins/jquery-easyui-1.4/sop-src.sync.js"></script>
		<script src="/js/plugins/jquery.sha256.js"></script>
		<script src="/js/plugins/durian-v2.0.js"></script>
		<script src="/js/common/sop.portal.absAPI.js"></script>
			   
		<!-- mng_s 20200402 이진호 / 캐쉬 사용 자동 방지--> 
	    <script src="/js/sbr/map.js?version=1.2"></script>
	    <!-- mng_e 20200402 이진호 -->
	    
	    <script src="/js/common/common.js"></script>
	    <script src="/js/sbr/sbrActiveMap.js"></script>
	    <script src="/js/sbr/sbrActiveMapApi.js"></script>
	    <script src="/js/sbr/sbrActiveMapBtn.js"></script>
	    <script src="/js/sbr/geoCode.js"></script>
	    
	
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
	    <!-- <link rel="stylesheet" type="text/css" href="/sample2/include/css/gallery_pop.css" /> -->  
    	<script src="/js/gallery/galleryEtc.js"></script>
    	<script src="/js/plugins/imageCapture/rgbcolor.js"></script>
    	<script src="/js/plugins/imageCapture/canvg.js"></script>
        <script src="/js/plugins/imageCapture/html2canvas.js"></script>
        <script src="/js/plugins/imageCapture/html2canvas.svg.js"></script> <!-- 2017.03.14 svg 이슈 -->
        
        
        <!-- SGIS_4 다중시계열 시작-->
        <script src="/js/sbr/sbrChartDataBoard.js"></script>
        <!-- SGIS_4 다중시계열 끝-->
        
        
        <script src='/js/sbr/sbr.js?var=1'></script>
        <script src='/js/sbr/sbrSetMenu.js?var=1'></script>
		<script src="/js/sbr/sbrTotalAnalysis.js"></script>
        <script src='/js/sbr/sbrChart.js?var=2'></script>
        <script type="text/javascript" src="/js/plugins/imageCapture/html2canvas.js"></script>
        <script type="text/javascript" src="/js/plugins/imageCapture/html2canvas.svg.js"></script>
        
        <script src="/js/sbr/tiffy-core.js"></script>
        <script src="/js/sbr/tiffy.js"></script>

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
	
	 <form id="searchFrom">
		 	<input type="hidden" class="searchData" id="searchCategory" name="category" value="1">
		 	<input type="hidden" class="searchData" id="searchYear" name="year" value="2020">
		 	<input type="hidden" class="searchData" id="searchArea" name="bord_type" value="1">
		 	<input type="hidden" class="searchData" id="searchTheme" name="detail_search_theme" value="1">
		 	<input type="hidden" class="searchData" id="searchBizCode" name=biz_cd value="">
		 	<input type="hidden" class="searchData" id="searchAdmCd" name="adm_cd" value="00">
		 	<input type="hidden" class="searchData" id="searchZoom" name="zoom" value="2">
		 	<input type="hidden" class="searchData" id="searchAdminCdList" name="admCdList" value="">
		 	<input type="hidden" class="searchData" id="searchOptionList" name="optionList" value="">
		 	<input type="hidden" class="searchData" id="searchksic_1_cd" name="kisc_cd_1" value="">
		 	<input type="hidden" class="searchData" id="searchksic_2_cd" name="kisc_cd_2" value="">
		 	<input type="hidden" class="searchData" id="searchOrderBy" name="order" value="1">
		 	<input type="hidden" class="searchData" id="searchOrderByType" name="orderType" value="1">
		 	
		 	<input type="hidden" class="searchData" id="searchSettingValue1" name="settingValue1" value="">
		 	<input type="hidden" class="searchData" id="searchSettingValue2" name="settingValue2" value="">
		 	<input type="hidden" class="searchData" id="searchSettingValue3" name="settingValue3" value="">
	 </form>
	 
	 <form id="togetherSearchFrom">
		 	<input type="hidden" class="searchData" name="gender" value="0">
		 	<input type="hidden" class="searchData" name="area_type" value="0">
		 	<input type="hidden" class="searchData" name="year" value="2020">
		 	<input type="hidden" class="searchData" name="low_search" value="1">
		 	<input type="hidden" class="searchData" name="adm_cd" value="">
		 	<input type="hidden" class="searchData" name="age_from" value="">
		 	<input type="hidden" class="searchData" name="age_to" value="">
		 	<input type="hidden" class="searchData" name="bnd_year" value="2021">
		 	<input type="hidden" class="searchData" name="halfGubun" value="people">
		 	<input type="hidden" class="searchData" name="farmType" value="1">
		 	<input type="hidden" class="searchData" name="house_type" value="">
		 	<input type="hidden" class="searchData" name="rd_const_year" value="">
		 	<input type="hidden" class="searchData" name="bdspace_from" value="">
		 	<input type="hidden" class="searchData" name="bdspace_to" value="">
		 	<input type="hidden" class="searchData" name=household_type value="">
	 </form>
	 <input type="hidden" class="searchData" id="searchksic_1_nm" name="kisc_nm_1" value="">
	 <input type="hidden" class="searchData" id="searchksic_2_nm" name="kisc_nm_2" value="">
	 <input type="hidden" class="searchData" id="rankStart" value="1">
	 <input type="hidden" class="searchData" id="rankEnd"   value="">
	 <input type="hidden" class="searchData" id="areaCdList"   value="">
	 <input type="hidden" class="searchData" id="searchCustom"   value="1">
	 

	<body>  
		<header>
        <!-- 우측 주 메뉴 -->
        <ul class="lnb" id="leftMainMenuBtnList">
            <li><a class="home"  href="/view/index"><span class="lnb_text">SGIS</span></a></li>
            <li class="active" onclick="setCompayMap()" data-content="company"><a class="company" ><span class="lnb_text">기업</span></a></li>
            <li onclick="setTogetherMap()" data-content="halfview"><a class="halfview" ><span class="lnb_text">함께보기</span></a></li>
            <!-- <li onclick="selectLnb(this)" data-content="help"><a class="help"  onclick="toggleHint()"><span class="lnb_text">도움말</span></a></li> -->
            <li data-content="help"><a class="help"  onclick="helpTabBtn()"><span class="lnb_text">도움말</span></a></li>
        </ul>

        <!-- 상단 헤더 -->
        <div class="left">
        <div class="topNav mainTopMenuDiv">
            <ul class="navTitle mainTopMenu">
                <li><a href="/view/sbrStats/sbrStatsMain"><span class="btnPrimary">기업생태분석지도</span></a></li>
                <li>
                    <div class="selectBox category">
                        <div class="optionContainer">
                            <div class="option searchRadioOption">
                                <input type="radio" class="radio" id="menu1" name="category" value="1" checked="checked">
                                <label for="menu1">지도로 생태분석</label>
                            </div>
                            <div class="option searchRadioOption">
                                <input type="radio" class="radio" id="menu2" name="category" value="2">
                                <label for="menu2">조건별 지역찾기</label>
                            </div>
                        </div>
                        <div class="selected" ><span class="text" id="categoryTitleSpan">지도로 생태분석</span></div>
                    </div>
                </li>
            </ul>

            
            <ul class="filter">
            	<li class="subTopMenu"><span class="btnPrimary">기업</span></li>
                <li class="selectBox icon year tip-bottom" data-tippy-content="선택 연도의 기업 통계를 확인할 수 있습니다.">
                    <div class="optionContainer">
                    	
                     <c:forEach var="value" items="${years}" varStatus="status">
                    	<div class="option searchRadioOption">
                            <input type="radio" class="radio" id="year${value}" value="${value}" name="year">
                            <label for="year${value}">${value}</label>
                        </div>
                     </c:forEach>
                     
                        
                    </div>
                    <div class="selected"><span class="icon"></span><span class="text" id="searchTitle1">2020</span></div>
                </li>

                <li class="selectBox icon area tip-bottom" data-type="area"  data-tippy-content="행정구역 및 테마경계별 기업 통계를 확인할 수 있습니다.">
                    <div class="optionContainer">
                        <div class="option searchRadioOption tip-right" data-tippy-content="시도, 시군구, 읍면동 단위로 확인할 수 있습니다.">
                            <input type="radio" class="radio" id="area1" name="bord_type" value="1">
                            <label for="area1">행정구역</label>
                        </div>
                        <div class="option searchRadioOption tip-right" data-tippy-content="전국의 산업단지를 확인할 수 있습니다.">
                            <input type="radio" class="radio" id="area3" name="bord_type" value="2">
                            <label for="area3">산업단지</label>
                        </div>
                        <div class="option searchRadioOption tip-right" data-tippy-content="전국의 상권을 확인할 수 있습니다.">
                            <input type="radio" class="radio" id="area4" name="bord_type" value="3">
                            <label for="area4">상권</label>
                        </div>
                        <div class="option searchRadioOption tip-right" data-tippy-content="전국의 전통시장을 확인할 수 있습니다.">
                            <input type="radio" class="radio" id="area5" name="bord_type" value="4">
                            <label for="area5">전통시장</label>
                        </div>
                        <div class="option searchRadioOption tip-right" data-tippy-content="전국의 인구 총합 5만명 이상인 도시화 권역(격자 그룹)을 확인할 수 있습니다.">
                            <input type="radio" class="radio" id="area6" name="bord_type" value="5">
                            <label for="area6">도시화</label>
                        </div>
                    </div>
                    <div class="selected" ><span class="icon"></span><span class="text"  id="searchTitle2">행정구역</span></div>
                </li>

                <li class="selectBox icon gubun tip-bottom"  data-tippy-content="표준산업분류(10차) 중분류 기준 75개 업종을 확인할 수 있습니다." style="width: 180px">
                    <div class="optionContainer depth" style="width: 450px;">

                        <ul class="optionHead">
                            <li>표준산업분류(10차)</li>
                            <li class="open bizCodeOpen"><button class="btnLine2">펼치기</button></li>
	                        <li class="close bizCodeClose"><button class="btnLine2">접기</button></li>
	                        
                        </ul>
                        <div class="optionAcc scroll bizCodeBody">
                        
                        
                        <div class="item">
	                            <div class="parent accTarget bizCodeTitle bizCocdeList">
	                                <i class="accTarget active"></i>
	                                <span class="accTarget">전체업종</span>
	                            </div>
	                         <ul class="child" style="display: none;">
	                         <li class="bizCodeSelect">
	                          <i class="radio"></i>
								<span class="title">전체업종</span><span></span>
								<input type="hidden" class="valueBiz1"value="<c:out value="0"/>"/>
								<input type="hidden" class="valueBiz2"value="<c:out value="00"/>"/>
								<input type="hidden" class="nameBiz1" value="전체업종"/>
								<input type="hidden" class="nameBiz2" value="전체업종"/>
							 </li>
							</ul>
                         </div>
                        
                        <c:set var="sub1" value="" />
						<c:forEach var="value" items="${bizList}" varStatus="status">
						<c:if test="${value.ksic_1_cd ne sub1}">
							<c:set var="sub1" value="${value.ksic_1_cd}" />
	                        <div class="item">
	                            <div class="parent accTarget bizCodeTitle bizCocdeList">
	                                <i class="accTarget active"></i>
	                                <span class="accTarget"><c:out value="${value.ksic_1_nm}"></c:out></span>
	                            </div>
	                         <ul class="child" style="display: none;">
						</c:if> 
						
						<li class="bizCodeSelect">
							<i class="radio"></i>
							<span>[<c:out value="${value.ksic_2_cd}"></c:out>]</span><span class="title"><c:out value="${value.ksic_2_nm}"></c:out></span>
							<input type="hidden" class="valueBiz1"value="<c:out value="${value.ksic_1_cd}"/>"/>
							<input type="hidden" class="valueBiz2"value="<c:out value="${value.ksic_2_cd}"/>"/>
							<input type="hidden" class="nameBiz1" value="<c:out value="${value.ksic_1_nm}"/>"/> 
							<input type="hidden" class="nameBiz2" value="<c:out value="${value.ksic_2_nm}"/>"/>
						</li>
						
						<c:if test="${(bizList[status.index+1] == null or bizList[status.index+1].ksic_1_cd == '' )  or (value.ksic_1_cd ne bizList[status.index+1].ksic_1_cd)}">                                    
                                </ul>
                            </div>
                         </c:if>
                        </c:forEach>
                            
                        </div>
                    </div>
                    <div class="selected bizMenuTitle"><span class="icon"></span><span class="text"  id="searchTitle3">전체업종</span></div>
                </li>

                <li class="selectBox icon gubun2 tip-bottom" data-type="theme"  data-tippy-content="기업 생태와 관련된 8개 테마를 확인할 수 있습니다.">
                    <div class="optionContainer">
                        <div class="option searchRadioOption">
                            <input type="radio" class="radio" id="theme1" name="detail_search_theme" value="1" checked="checked">
                            <label for="theme1">기업이 많은</label>
                        </div>
                        <div class="option searchRadioOption">
                            <input type="radio" class="radio" id="theme2" name="detail_search_theme" value="2">
                            <label for="theme2">개업이 많은</label>
                        </div>
                        <div class="option searchRadioOption">
                            <input type="radio" class="radio" id="theme3" name="detail_search_theme" value="3">
                            <label for="theme3">폐업이 많은</label>
                        </div>
                        <div class="option searchRadioOption">
                            <input type="radio" class="radio" id="theme4" name="detail_search_theme" value="4">
                            <label for="theme4">활동기업이 많은</label>
                        </div>
                        <div class="option searchRadioOption">
                            <input type="radio" class="radio" id="theme5" name="detail_search_theme" value="5">
                            <label for="theme5">비활동기업이 많은</label>
                        </div>
                        <div class="option searchRadioOption">
                            <input type="radio" class="radio" id="theme6" name="detail_search_theme" value="6">
                            <label for="theme6">생존율이 높은</label>
                        </div>
                        <div class="option searchRadioOption">
                            <input type="radio" class="radio" id="theme7" name="detail_search_theme" value="7">
                            <label for="theme7">영업기간이 높은</label>
                        </div>
                        <div class="option searchRadioOption">
                            <input type="radio" class="radio" id="theme8" name="detail_search_theme" value="8">
                            <label for="theme8">성장기업이 많은</label>
                        </div>
                    </div>
                    <div class="selected"><span class="icon"></span><span class="text" id="searchTitle4">기업이 많은</span></div>
                </li>

                <li class="setting tip-bottom"onclick="toggleSetting();" data-tippy-content="선택한 테마별 상세 조건을 설정할 수 있습니다.">
                    <button type="button" ><i class="icon setting"></i><span>설정</span></button>
                </li>

            </ul>

            <ul class="navRank mini mainTopMenu">
                <ul class="option">
                    <!-- <li onclick="rankViewMode()"><i class="icon rank"></i> 지역순위</li> -->
                    <!-- <li class="active"><i class="icon table"></i></li>
                    <li><i class="icon chart"></i></li> -->
                    <li id="regionRankBtn" class="active" onclick="rankViewMode()"><i class="icon view"></i>지역순위</li>
                </ul>
            </ul>
        </div>
        </div>
        
        
        <div class="subTopMenuDiv right" style="z-index: 80">
        	<div class="topNav">
                <ul class="filter">
            		<li class="subTopMenu"><span class="btnPrimary">공간</span></li>
            	</ul>

                <ul class="filter" id="rightSelectArea">
					<li><span class="btnPrimary">기업생태분석지도</span></li>
	
                    <!-- 구분 -->
                    <li class="selectBox icon halfGubun">
                        <div class="optionContainer">
                            <div class="option searchRadioOption2" >
                                <input type="radio" class="radio" id="halfGubun1" name="halfGubun" value="people" data-filter="people">
                                <label for="halfGubun1"><i class="people"></i>인구</label>
                            </div>
                            <div class="option searchRadioOption2">
                                <input type="radio" class="radio" id="halfGubun2" name="halfGubun" value="house" data-filter="house">
                                <label for="halfGubun2"><i class="house"></i>주택</label>
                            </div>
                            <div class="option searchRadioOption2">
                                <input type="radio" class="radio" id="halfGubun3" name="halfGubun" value="home" data-filter="home">
                                <label for="halfGubun3"><i class="home"></i>가구</label>
                            </div>
                            <div class="option searchRadioOption2">
                                <input type="radio" class="radio" id="halfGubun4" name="halfGubun" value="other" data-filter="other">
                                <label for="halfGubun4"><i class="other"></i>농림어업</label>
                            </div>
                        </div>
                        <div class="selected halfGubun"><span class="icon"></span><span class="text">인구</span></div>
                    </li>

                    <!-- 농가 -->
                    <li class="selectBox icon farmType">
                        <div class="optionContainer">
                            <div class="option searchRadioOption2">
                                <input type="radio" class="radio" id="farmType_1" name="farmType" value="1">
                                <label for="farmType_1">농가</label>
                            </div>
                            <div class="option searchRadioOption2">
                                <input type="radio" class="radio" id="farmType_2" name="farmType" value="2">
                                <label for="farmType_2">임가</label>
                            </div>
                            <div class="option searchRadioOption2">
                                <input type="radio" class="radio" id="farmType_3" name="farmType" value="3">
                                <label for="farmType_3">내수면어가</label>
                            </div>
                            <div class="option searchRadioOption2">
                                <input type="radio" class="radio" id="farmType_4" name="farmType" value="4">
                                <label for="farmType_4">해수면어가</label>
                            </div>
                        </div>
                        <div class="selected"><span class="icon"></span><span class="text">농가</span></div>
                    </li>

                    <!-- 연도 -->
                    <li class="selectBox icon year">
                        <div class="optionContainer">
                        <c:forEach var="value" items="${years2}" varStatus="status">
                            <div class="option searchRadioOption2">
                                <input type="radio" class="radio" id="year2_${value}" name="year" value="${value}">
                                <label for="year2_${value}">${value}</label>
                            </div>
                        </c:forEach>    
                        </div>
                        <div class="selected"><span class="icon"></span><span class="text">2020</span></div>
                    </li>
                    
                    <!-- 연도2 -->
                    <li class="selectBox icon year2">
                        <div class="optionContainer">
                        <c:forEach var="value" items="${years3}" varStatus="status">
                            <div class="option searchRadioOption2">
                                <input type="radio" class="radio" id="year2_${value}" name="year" value="${value}">
                                <label for="year2_${value}">${value}</label>
                            </div>
                        </c:forEach>    
                        </div>
                        <div class="selected"><span class="icon"></span><span class="text">2020</span></div>
                    </li>

                    <!-- 유형 -->
                    <li class="selectBox icon type customSelectBox">
                    	<div class="optionContainer optionContainerDiv">
                    		<div class="mb10 mt10">
                                <div class="inputWrap">
                                    <input type="radio" class="radio" id="houseGroup_1_1" name="houseGroup_1" checked="checked"  onclick="toggleCustomOption('hide','houseGroup',this)"> 
                                    <label for="houseGroup_1_1">선택하지 않음</label>
                                </div>
                                <div class="inputWrap">
                                    <input type="radio" class="radio" id="houseGroup_1_2" name="houseGroup_1"  onclick="toggleCustomOption('show','houseGroup',this);">
                                    <label for="houseGroup_1_2">유형선택 최대(3개)</label>
                                </div>
                            </div>
                            
                            <ul class="tabContent">
                                <li>
                                    <div class="inputWrap">
                                        <input type="checkbox" id="houseGroup1" name="houseGroup" value="01">
                                        <label for="houseGroup1">단독주택</label>
                                    </div>
                                    <div class="inputWrap">
                                        <input type="checkbox" id="houseGroup2" name="houseGroup" value="02">
                                        <label for="houseGroup2">아파트</label>
                                    </div>
                                    <div class="inputWrap">
                                        <input type="checkbox" id="houseGroup3" name="houseGroup" value="03">
                                        <label for="houseGroup3">연립주택</label>
                                    </div>
                                    <div class="inputWrap">
                                        <input type="checkbox" id="houseGroup4" name="houseGroup" value="04">
                                        <label for="houseGroup4">다세대주택</label>
                                    </div>
                                    <div class="inputWrap">
                                        <input type="checkbox" id="houseGroup5" name="houseGroup" value="05">
                                        <label for="houseGroup5">비주거용건물(상가,공장,여관 등)내주택</label>
                                    </div>
                                    <div class="inputWrap">
                                        <input type="checkbox" id="houseGroup6" name="houseGroup" value="06">
                                        <label for="houseGroup6">주택이외의 거처</label>
                                    </div>
                                                                       
                                </li>
                                <li class="btnWrap">
                                    <button class="btnLine"  onclick="closeCustomSelectBox(5,'close')">취소</button>
                                    <button class="btnPrimary" onclick="closeCustomSelectBox(5,'open')">적용</button>
                                </li>
                                
                            </ul>
                        </div>
                        <div class="selected"><span class="icon"></span><span class="text">유형</span></div>
                    
                        <!-- <div class="optionContainer" style="width: 225px;">
                        	<div class="option searchRadioOption2">
                                <input type="radio" class="radio" id="house_type_0" name="house_type" value="">
                                <label for="house_type_0">전체</label>
                            </div>
                            <div class="option searchRadioOption2">
                                <input type="radio" class="radio" id="house_type_1" name="house_type" value="01">
                                <label for="house_type_1">단독주택</label>
                            </div>
                            <div class="option searchRadioOption2">
                                <input type="radio" class="radio" id="house_type_2" name="house_type" value="02">
                                <label for="house_type_2">아파트</label>
                            </div>
                            <div class="option searchRadioOption2">
                                <input type="radio" class="radio" id="house_type_3" name="house_type" value="03">
                                <label for="house_type_3">연립주택</label>
                            </div>
                            <div class="option searchRadioOption2">
                                <input type="radio" class="radio" id="house_type_4" name="house_type" value="04">
                                <label for="house_type_4">다세대주택</label>
                            </div>
                            <div class="option searchRadioOption2">
                                <input type="radio" class="radio" id="house_type_5" name="house_type" value="05">
                                <label for="house_type_5">비주거용건물(상가,공장,여관 등)내주택</label>
                            </div>
                            <div class="option searchRadioOption2">
                                <input type="radio" class="radio" id="house_type_6" name="house_type" value="06">
                                <label for="house_type_6">주택이외의 거처</label>
                            </div>
                        </div>
                        <div class="selected"><span class="icon"></span><span class="text">유형</span></div> -->
                    </li>
                    
                    <!-- 성별 -->
                    <li class="selectBox icon sex">
                        <div class="optionContainer">
                            <div class="option searchRadioOption2">
                                <input type="radio" class="radio" id="v2_sex_all" name="gender" value="0">
                                <label for="v2_sex_all">전체 성별</label>
                            </div>
                            <div class="option searchRadioOption2">
                                <input type="radio" class="radio" id="v2_sex_man" name="gender" value="1">
                                <label for="v2_sex_man">남자</label>
                            </div>
                            <div class="option searchRadioOption2">
                                <input type="radio" class="radio" id="v2_sex_woman" name="gender" value="2">
                                <label for="v2_sex_woman">여자</label>
                            </div>
                        </div>
                        <div class="selected"><span class="icon"></span><span class="text">전체성별</span></div>
                    </li>

                    <!-- 성별 타입2 선택 -->
                    <li class="selectBox icon sexType2 customSelectBox">
                        <div class="optionContainer">
                            <div class="mb10 mt10">
                                <div class="inputWrap" >
                                    <input type="radio" class="radio" id="sexType2_1" name="sexType2_1" onclick="toggleCustomOption('hide','sexType2',this)">
                                    <label for="sexType2_1">선택하지 않음</label>
                                </div>
                                <div class="inputWrap" >
                                    <input type="radio" class="radio" id="sexType2_2" name="sexType2_1" onclick="toggleCustomOption('show','sexType2',this)">
                                    <label for="sexType2_2">성별 선택</label>
                                </div>
                            </div>

                            <ul class="tabContent">
                                <li>
                                    <div class="inputWrap">
                                        <input type="radio" id="sexType2_1_1" name="sexType2_0">
                                        <label for="sexType2_1_1">전체 성별</label>
                                    </div>
                                    <div class="inputWrap">
                                        <input type="radio" id="sexType2_1_2" name="sexType2_0">
                                        <label for="sexType2_1_2">남자</label>
                                    </div>
                                    <div class="inputWrap">
                                        <input type="radio" id="sexType2_1_3" name="sexType2_0">
                                        <label for="sexType2_1_3">여자</label>
                                    </div>
                                </li>
                                <li class="btnWrap">
                                    <button class="btnLine"  onclick="closeCustomSelectBox(5,'close')">취소</button>
                                    <button class="btnPrimary" onclick="closeCustomSelectBox(5,'open')">적용</button>
                                </li>
                                
                            </ul>
                        </div>
                        <div class="selected"><span class="icon"></span><span class="text">성별 선택</span></div>
                    </li>

                    <!-- 연령선택 -->
                    <li class="selectBox icon age customSelectBox">
                        <div class="optionContainer optionContainerDiv" id="ageDiv">

                            <div class="mb10 mt10">
                                <div class="inputWrap" >
                                    <input type="radio" class="radio" id="age1" name="age" checked="checked" onclick="toggleCustomOption('hide','age',this)">
                                    <label for="age1">선택하지 않음</label>
                                </div>
                                <div class="inputWrap">
                                    <input type="radio" class="radio" id="age2" name="age"  onclick="toggleCustomOption('show','age',this);">
                                    <label for="age2">연령선택</label>
                                </div>
                            </div>
                            
                            <ul class="tab">
                                <li class="year active" data-tab="slider" onclick="selectAgeTab(this,'slider')">구간선택</li>
                                <li class="year" data-tab="list" onclick="selectAgeTab(this,'list')">목록선택</li>
                            </ul>
                            <ul class="tabContent">
                                <li data-content="slider"> 
                                    <div class="summary">
                                        <select id="minAge">
                                        	<option value="0">0세</option>
                                            <option value="10">10세</option>
                                            <option value="20">20세</option>
                                            <option value="30">30세</option>
                                            <option value="40">40세</option>
                                            <option value="50">50세</option>
                                            <option value="60">60세</option>
                                            <option value="70">70세</option>
                                            <option value="80">80세</option>
                                            <option value="90">90세</option>
                                            <option value="100">100세</option>
                                        </select>
                                        <span class="ml5 mr10">이상 ~ </span> 
                                        <select id="maxAge">
											<option value="10">10세</option>
                                            <option value="20">20세</option>
                                            <option value="30">30세</option>
                                            <option value="40">40세</option>
                                            <option value="50">50세</option>
                                            <option value="60">60세</option>
                                            <option value="70">70세</option>
                                            <option value="80">80세</option>
                                            <option value="90">90세</option>
                                            <option value="100">100세</option>
                                            <option value="999">100+</option>
                                        </select>
                                        <span class="ml5" id="maxAgeSpan">미만</span> 
                                    </div>
                                    <div class="ageSliderContent sliderContent">
                                       
                                    </div>
                                    
                                </li>
                                <li data-content="list">
                                    <div class="inputWrap">
                                        <input type="radio" id="ageList1" name="ageList" value="0,7">
                                        <label for="ageList1">0세~7세미만</label>
                                    </div>
                                    <div class="inputWrap">
                                        <input type="radio" id="ageList2" name="ageList" value="7,13">
                                        <label for="ageList2">7세~13세미만</label>
                                    </div>
                                    <div class="inputWrap">
                                        <input type="radio" id="ageList3" name="ageList" value="13,16">
                                        <label for="ageList3">13세~16세미만</label>
                                    </div>
                                    <div class="inputWrap">
                                        <input type="radio" id="ageList4" name="ageList" value="16,19">
                                        <label for="ageList4">16세~19세미만</label>
                                    </div>
                                    <div class="inputWrap">
                                        <input type="radio" id="ageList5" name="ageList" value="0,15">
                                        <label for="ageList5">0세~15세미만</label>
                                    </div>
                                    <div class="inputWrap">
                                        <input type="radio" id="ageList6" name="ageList" value="15,65">
                                        <label for="ageList6">15세~65세미만</label>
                                    </div>
                                    <div class="inputWrap">
                                        <input type="radio" id="ageList7" name="ageList" value="65,999">
                                        <label for="ageList7">65세이상</label>
                                    </div>
                                </li>
                                <li class="btnWrap">
                                    <button class="btnLine"  onclick="closeCustomSelectBox(1,'close')">취소</button>
                                    <button class="btnPrimary" onclick="closeCustomSelectBox(1,'open')" value="2">적용</button>
                                </li>
                            </ul>
                     
                        </div>
                        <div class="selected"><span class="icon"></span><span class="text">연령선택</span></div>
                    </li>

                    <!-- 세대 선택 -->
                    <li class="selectBox icon homeGroup customSelectBox">
                        <div class="optionContainer optionContainerDiv">
                            <div class="mb10 mt10">
                                <div class="inputWrap">
                                    <input type="radio" class="radio" id="homeGroup_1_1" name="homeGroup_1" checked="checked"  onclick="toggleCustomOption('hide','homeGroup',this)"> 
                                    <label for="homeGroup_1_1">선택하지 않음</label>
                                </div>
                                <div class="inputWrap">
                                    <input type="radio" class="radio" id="homeGroup_1_2" name="homeGroup_1"  onclick="toggleCustomOption('show','homeGroup',this);">
                                    <label for="homeGroup_1_2">세대 선택(최대 3개)</label>
                                </div>
                            </div>

                            <ul class="tabContent">
                                <li>
                                    <div class="inputWrap">
                                        <input type="checkbox" id="homeGroup1" name="homeGroup" value="01">
                                        <label for="homeGroup1">1세대 가구</label>
                                    </div>
                                    <div class="inputWrap">
                                        <input type="checkbox" id="homeGroup2" name="homeGroup" value="02">
                                        <label for="homeGroup2">2세대 가구</label>
                                    </div>
                                    <div class="inputWrap">
                                        <input type="checkbox" id="homeGroup3" name="homeGroup" value="03">
                                        <label for="homeGroup3">3세대 가구</label>
                                    </div>
                                    <div class="inputWrap">
                                        <input type="checkbox" id="homeGroup4" name="homeGroup" value="04">
                                        <label for="homeGroup4">4세대 이상 가구</label>
                                    </div>
                                    <div class="inputWrap">
                                        <input type="checkbox" id="homeGroup5" name="homeGroup" value="A0">
                                        <label for="homeGroup5">1인 가구</label>
                                    </div>
                                    <div class="inputWrap">
                                        <input type="checkbox" id="homeGroup6" name="homeGroup" value="B0">
                                        <label for="homeGroup6">비친족 가구</label>
                                    </div>
                                </li>
                                <li class="btnWrap">
                                    <button class="btnLine"  onclick="closeCustomSelectBox(2,'close')">취소</button>
                                    <button class="btnPrimary" onclick="closeCustomSelectBox(2,'open')">적용</button>
                                </li>
                                
                            </ul>
                        </div>
                        <div class="selected"><span class="icon"></span><span class="text">세대선택</span></div>
                    </li>


                    <!-- 건축년도 -->
                    <li class="selectBox icon bulidYear customSelectBox">
                        <div class="optionContainer optionContainerDiv">
                            <div class="mb10 mt10">
                                <div class="inputWrap">
                                    <input type="radio" class="radio" id="bulidYear_1_1" name="bulidYear_1" value="" checked="checked"  onclick="toggleCustomOption('hide','bulidYear',this)">
                                    <label for="bulidYear_1_1">선택하지 않음</label>
                                </div>
                                <div class="inputWrap">
                                    <input type="radio" class="radio" id="bulidYear_1_2" name="bulidYear_1"  onclick="toggleCustomOption('show','bulidYear',this);">
                                    <label for="bulidYear_1_2">건축년도 선택</label>
                                </div>
                            </div>

                            <ul class="tabContent">
                                <li id="bulidYearDummy" class="scroll">
                                    
                                </li>
                                <script>
                                    dummyAr = ['2020','2019','2018','2017','2016','2015','2014','2013','2012','2011','2010','2005~2009','2000~2004','1990~1999','1980~1989','1979년 이전'];
                                    dumVal  = ['20','19','01','02','03','04','05','06','07','08','09','10','11','12','13','14'];
                                    var inputIndex = 1;
                                    for(i=0;i<dummyAr.length;i++) {
                                        let html = "";
                                        
                                        html += '<div class="inputWrap">'
                                        html += '<input type="radio" id="buildYear'+i+'" name="rdConstYears" value="'+dumVal[i]+'">'
                                        html += '<label for="buildYear'+i+'">'+dummyAr[i]+'</label>'
                                        html += '</div>'
                                        $("#bulidYearDummy").append(html)
                                    }
                                </script>
                                <li class="btnWrap">
                                    <button class="btnLine"  onclick="closeCustomSelectBox(3,'close')">취소</button>
                                    <button class="btnPrimary" onclick="closeCustomSelectBox(3,'open')">적용</button>
                                </li>
                                
                            </ul>
                        </div>
                        <div class="selected"><span class="icon"></span><span class="text">건축년도</span></div>
                    </li>

                    <!-- 연면적 선택 -->
                    <li class="selectBox icon allAreaSize customSelectBox">
                        <div class="optionContainer optionContainerDiv" style="left:-110px">
                            <div class="mb10 mt10">
                                <div class="inputWrap">
                                    <input type="radio" class="radio" id="allAreaSize_1_1" name="allAreaSize_1" checked="checked"  onclick="toggleCustomOption('hide','allAreaSize',this)">
                                    <label for="allAreaSize_1_1">선택하지 않음</label>
                                </div>
                                <div class="inputWrap">
                                    <input type="radio" class="radio" id="allAreaSize_1_2" name="allAreaSize_1"  onclick="toggleCustomOption('show','allAreaSize',this);">
                                    <label for="allAreaSize_1_2">연면적 선택</label>
                                </div>
                            </div>

                            <ul class="tabContent">
                                <li >
                                    <div class="summary">
                                        <select id="houseArea1">
                                            <option value="0">0㎡</option>
                                            <option value="20">20㎡</option>
                                            <option value="40">40㎡</option>
                                            <option value="60">60㎡</option>
                                            <option value="85">85㎡</option>
                                            <option value="100">100㎡</option>
                                            <option value="130">130㎡</option>
                                            <option value="165">165㎡</option>
                                            <option value="230">230㎡</option>
                                        </select>
                                        <span class="ml5 mr10">이상 ~ </span> 
                                        <select id="houseArea2">
                                            <option value="20">20㎡</option>
                                            <option value="40">40㎡</option>
                                            <option value="60">60㎡</option>
                                            <option value="85">85㎡</option>
                                            <option value="100">100㎡</option>
                                            <option value="130">130㎡</option>
                                            <option value="165">165㎡</option>
                                            <option value="230">230㎡</option>
                                            <option value="300">230+</option>
                                        </select>
                                        <span class="ml5" id="maxHouseAreaSpan">미만</span> 
                                    </div>
                                    <div class="desc" id="houseAreaText">( 0평 초과 ~ 약 6.1평 이하 )</div>
                                    <div class="allAreaSizeSliderContent sliderContent">
                                    </div>
                                </li>
                                
                                <li class="btnWrap">
                                    <button class="btnLine"  onclick="closeCustomSelectBox(4,'close')">취소</button>
                                    <button class="btnPrimary" onclick="closeCustomSelectBox(4,'open')">적용</button>
                                </li>
                                
                            </ul>
                        </div>
                        <div class="selected"><span class="icon"></span><span class="text">연면적 선택</span></div>
                    </li>


                    

                </ul>

            </div>
        </div>
     

    </header>
    
    <div class="containerBox"style="left: 80px;width: calc( 100% - 80px );" >
    
        <!-- 지도 영역 -->
 	    <div id="mapRgn_box" class="mapDiv left" style="width:100%;height: 100%; left: 0">	
			<div class="mapContents" id="mapRgn_1"></div>맵영역 
		</div>
		<!-- 지도 영역 끝-->
		
		<div id="mapRgn_box2" class="mapDiv right" class="togetherMapDiv" style="width:50%;height: 100%;background: white; right: 0; border-left: 3px solid; display: none">	
			<div class="mapContents" id="mapRgn_2"></div>맵영역 
		</div>
		
		<div id="div_target">
			<img alt="중심점 마커" src="/img/common/map_center_target.png" draggable="false" >
		</div>
		
		<!-- 데이터함깨보기-->
		<div class="dataWithView">
            <div class="container shadow" onclick="showDataWithViewPopup()">
                <i class="chart"></i>
                <p class="title">데이터<br>함께보기</p>
            </div>
        </div>
		
		<!-- 전국시도 시작 -->
		<!-- 지역 순위 -->
		    <div class="rankWrapper expand isScroll">
		        <div class="rankContent">
		            <ul class="rankList table active" id="ranklistUl">
		              <!--   <li class="header">
		                    <span class="area">지역</span>
		                    <span class="company">기업 <i class="default"></i></span>
		                    <span class="year">전년대비 <i class="sortDown"></i></span>
		                    <span class="dist">분포 <i class="sortUp"></i></span>
		                </li> -->
		               
		                <!-- <li onclick="showRankDetail()">
		                    <span><i class="rank">1</i>서울특별시 서대문구</span>
		                    <span>2,223,422개</span>
		                    <span>15% <i class="up"></i></span>
		                    <span>50.0%</span>
		                </li> -->
		              
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
    
    	<!-- 상세 설정 -->
		<div class="leftContent settingBox htFit">
		        <!-- 스크롤 영역 -->
		        <div class="scroll container ht100per">
		            <div class="titleWrap">
		                <div class="title">
		                    상세설정
		                </div>
		                <ul class="subTitle">
		                    <li class="title" id="configTitle">지도로 생태분석</li>
		                    <li><span class="badge"><i class="company"></i><spna id="gadgeText">기업이 많은</spna></span></li>
		                </ul>
		            </div>
		    
		            <!-- 단일선택 input type radio -->
		            <div class="settingCheckbox" id="settingMenu1">
		                <div class="title">
		                    <span class="icon icon_group">조직형태</span>
		                    <span class="text">조직형태(다중선택)</span>
		                    <button class="btn btnRound" onclick="selectAllfalse(true)">전체해제</button>
		                </div>
		                <ul class="content">
		                    <li>
		                        <input class ="optionInput1" type="checkbox" id="settingGroup1" name="settingGroup" value="ET_CRP" onclick="optionDetail(this)">
		                        <label for="settingGroup1">법인</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput1" type="checkbox" id="settingGroup2" name="settingGroup" value="ET_PSN" onclick="optionDetail(this)">
		                        <label for="settingGroup2">개인</label>
		                    </li>                
		                </ul>
		            </div>
		    
		            <!-- 다중선택 input type checkbox -->
		            <div class="settingCheckbox" id="settingMenu2">
		                <div class="title">
		                    <span class="icon icon_ceo">기업대표</span>
		                    <span class="text">기업대표(다중선택)</span>
		                    <button class="btn btnRound" onclick="selectAllfalse(true)">전체해제</button>
		                </div>
		                <ul class="tab options">
		                    <li class="on" onclick="optionDetail(this,1)">전체<input type="hidden" value="MA"></li>
		                    <li onclick="optionDetail(this,1)">남성<input type="hidden" value="MM"></li>
		                    <li onclick="optionDetail(this,1)">여성<input type="hidden" value="MF"></li>
		                </ul>
		                <ul class="content">
		                    <li>
		                        <input class ="optionInput2" type="checkbox" id="ceo1" name="settingCeo" value="30LT" onclick="optionDetail(this)">
		                        <label for="ceo1">30대 미만</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput2" type="checkbox" id="ceo2" name="settingCeo" value="30" onclick="optionDetail(this)">
		                        <label for="ceo2">30대</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput2" type="checkbox" id="ceo3" name="settingCeo" value="40" onclick="optionDetail(this)" >
		                        <label for="ceo3">40대</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput2" type="checkbox" id="ceo4" name="settingCeo" value="50" onclick="optionDetail(this)">
		                        <label for="ceo4">50대</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput2" type="checkbox" id="ceo5" name="settingCeo" value="60_" onclick="optionDetail(this)">
		                        <label for="ceo5">60대</label>
		                    </li>
		                </ul>
		            </div>
		
		            <div class="settingCheckbox" id="settingMenu3">
		                <div class="title">
		                    <span class="icon icon_ceo">종사자</span>
		                    <span class="text">종사자(다중선택)</span>
		                    <button class="btn btnRound" onclick="selectAllfalse(true)">전체해제</button>
		                </div>
		                <ul class="tab options">
		                    <li class="on" onclick="optionDetail(this,1)">전체<input type="hidden" value="EP"></li>
		                    <li onclick="optionDetail(this,1)">상용직<input type="hidden" value="RL"></li>
		                    <li onclick="optionDetail(this,1)">일용직<input type="hidden" value="DL"></li>
		                </ul>
		                <ul class="content">
		                    <li>
		                        <input class ="optionInput3" type="checkbox" id="enfsn1" name="settingEnfsn" value="0" onclick="optionDetail(this)">
		                        <label for="enfsn1">없음</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput3" type="checkbox" id="enfsn2" name="settingEnfsn" value="1_4" onclick="optionDetail(this)">
		                        <label for="enfsn2">1인~4인</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput3" type="checkbox" id="enfsn3" name="settingEnfsn" value="5_9" onclick="optionDetail(this)">
		                        <label for="enfsn3">5인~9인</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput3" type="checkbox" id="enfsn4" name="settingEnfsn" value="10_99" onclick="optionDetail(this)">
		                        <label for="enfsn4">10인~99인</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput3" type="checkbox" id="enfsn5" name="settingEnfsn" value="100_" onclick="optionDetail(this)">
		                        <label for="enfsn5">100인이상</label>
		                    </li>
		                </ul>
		            </div>
		            
		            <div class="settingCheckbox" id="settingMenu4">
		                <div class="title">
		                    <span class="icon icon_ceo">매출액</span>
		                    <span class="text">매출액(다중선택)</span>
		                    <button class="btn btnRound" onclick="selectAllfalse(true)">전체해제</button>
		                </div>
		                <ul class="content">
		                    <li>
		                        <input class ="optionInput4" type="checkbox" id="sls1" name="settingSls" value="S_50MLT" onclick="optionDetail(this)">
		                        <label for="sls1">5천만원미만</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput4" type="checkbox" id="sls2" name="settingSls" value="SA_50M_100MLT" onclick="optionDetail(this)">
		                        <label for="sls2">5천~1억</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput4" type="checkbox" id="sls3" name="settingSls" value="SA_100M_1BLT" onclick="optionDetail(this)">
		                        <label for="sls3">1억~10억</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput4" type="checkbox" id="sls4" name="settingSls" value="SA_1B_5BLT" onclick="optionDetail(this)">
		                        <label for="sls4">10억~50억</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput4" type="checkbox" id="sls5" name="settingSls" value="SA_5B_10BLT" onclick="optionDetail(this)">
		                        <label for="sls5">50억~100억</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput4" type="checkbox" id="sls6" name="settingSls" value="SA_10B_" onclick="optionDetail(this)">
		                        <label for="sls6">100억원이상</label>
		                    </li>
		                    <!-- <li>
		                        <input class ="optionInput4" type="checkbox" id="sls7" name="settingSls" value="" onclick="optionDetail(this)">
		                        <label for="sls7">500억~1000억</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput4" type="checkbox" id="sls8" name="settingSls" value="" onclick="optionDetail(this)">
		                        <label for="sls8">1000억원이상</label>
		                    </li> -->
		                    
		                </ul>
		            </div>
		            
		            <div class="settingCheckbox" id="settingMenu5">
		                <div class="title">
		                    <span class="icon icon_ceo">인구/가구</span>
		                    <span class="text">인구/가구</span>
		                    <!-- <button class="btn btnRound" onclick="selectAllfalse(true)">전체해제</button> -->
		                </div>
		                <ul class="tab options">
		                    <li class="on" onclick="optionDetail2(this,1)">지역인구<input type="hidden" value="1"></li>
		                    <li onclick="optionDetail2(this,1)">청장년인구<input type="hidden" value="2"></li>
		                    <li onclick="optionDetail2(this,1)">1인가구<input type="hidden" value="3"></li>
		                </ul>
		                <ul class="content">
		                    <li>
		                        <input class ="optionInput5" type="radio" id="ppltn1" name="settingPpltn" value="up" onclick="optionDetail2(this)">
		                        <label for="ppltn1">전년대비증가</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput5" type="radio" id="ppltn2" name="settingPpltn" value="down" onclick="optionDetail2(this)">
		                        <label for="ppltn2">전년대비감소</label>
		                    </li>
		                </ul>
		            </div>
		            
		            <div class="settingCheckbox" id="settingMenu6">
		                <div class="title">
		                    <span class="icon icon_ceo">토지/건물</span>
		                    <span class="text">토지/건물</span>
		                    <!-- <button class="btn btnRound" onclick="selectAllfalse(true)">전체해제</button> -->
		                </div>
		                <ul class="tab options">
		                    <li class="on" onclick="optionDetail2(this,1)">건물노후비율<input type="hidden" value="1"></li>
		                    <li onclick="optionDetail2(this,1)">토지공시지가<input type="hidden" value="2"></li>
		                </ul>
		                <ul class="content">
		                    <li>
		                        <input class ="optionInput6" type="radio" id="lnd1" name="settingLnd" value="up" onclick="optionDetail2(this)">
		                        <label for="lnd1">전년대비증가</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput6" type="radio" id="lnd2" name="settingLnd" value="down" onclick="optionDetail2(this)">
		                        <label for="lnd2">전년대비감소</label>
		                    </li>
		                </ul>
		            </div>
		            
		            
		            <div class="settingCheckbox" id="settingMenu7">
		                <div class="title">
		                    <span class="icon icon_ceo">개업시기</span>
		                    <span class="text">개업시기</span>
		                    <!-- <button class="btn btnRound" onclick="selectAllfalse(true)">전체해제</button> -->
		                </div>
		                <ul class="content">
		                    <li>
		                        <input class ="optionInput7" type="radio" id="year1" name="settingYear" value="OB_CYR" onclick="optionDetail(this)">
		                        <label for="year1">선택연도</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput7" type="radio" id="year2" name="settingYear" value="OB_1BFY" onclick="optionDetail(this)">
		                        <label for="year2">1년전</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput7" type="radio" id="year3" name="settingYear" value="OB_2BFY" onclick="optionDetail(this)">
		                        <label for="year3">2년전</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput7" type="radio" id="year4" name="settingYear" value="OB_3BFY" onclick="optionDetail(this)">
		                        <label for="year4">3년전</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput7" type="radio" id="year5" name="settingYear" value="OB_4BFY" onclick="optionDetail(this)">
		                        <label for="year5">4년전</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput7" type="radio" id="year6" name="settingYear" value="OB_5BFY" onclick="optionDetail(this)">
		                        <label for="year6">5년전</label>
		                    </li>
		                    
		                </ul>
		            </div>
		            
		            <div class="settingCheckbox" id="settingMenu8">
		                <div class="title">
		                    <span class="icon icon_ceo">영업기간</span>
		                    <span class="text">영업기간(다중선택)</span>
		                    <button class="btn btnRound" onclick="selectAllfalse(true)">전체해제</button>
		                </div>
		                <ul class="content">
		                    <li>
		                        <input class ="optionInput8" type="checkbox" id="bns1" name="settingBns" value="BP_5YLT" onclick="optionDetail(this)">
		                        <label for="bns1">5년미만</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput8" type="checkbox" id="bns2" name="settingBns" value="BP_5Y_10YLT" onclick="optionDetail(this)">
		                        <label for="bns2">5년~10년</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput8" type="checkbox" id="bns3" name="settingBns" value="BP_10Y_20YLT" onclick="optionDetail(this)">
		                        <label for="bns3">10년~20년</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput8" type="checkbox" id="bns4" name="settingBns" value="BP_20Y_30YLT" onclick="optionDetail(this)">
		                        <label for="bns4">20년~30년</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput8" type="checkbox" id="bns5" name="settingBns" value="BP_30Y_" onclick="optionDetail(this)">
		                        <label for="bns5">30년이상</label>
		                    </li>
		                </ul>
		            </div>
		            
		            <div class="settingCheckbox" id="settingMenu9">
		                <div class="title">
		                    <span class="icon icon_ceo">성장</span>
		                    <span class="text">성장</span>
		                    <button class="btn btnRound" onclick="selectAllfalse(true)">전체해제</button>
		                </div>
		                <ul class="content">
		                    <li>
		                        <input class ="optionInput9" type="radio" id="growth1" name="settingGrowth" value="GR_10PLT" onclick="optionDetail(this)">
		                        <label for="growth1">10%미만</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput9" type="radio" id="growth2" name="settingGrowth" value="GR_10P_20PLT" onclick="optionDetail(this)">
		                        <label for="growth2">10%~20%</label>
		                    </li>
		                    <li>
		                        <input class ="optionInput9" type="radio" id="growth3" name="settingGrowth" value="GR_20P_MT1" onclick="optionDetail(this)">
		                        <label for="growth3">20%이상</label>
		                    </li>
		                    <li class="full">
		                        <input class ="optionInput9" type="radio" id="growth4" name="settingGrowth" value="GR_HIGH" onclick="optionDetail(this)">
		                        <label for="growth4">급성장(개업 5년이내 20%이상)</label>
		                    </li>
		                    <!-- <li>
		                        <input class ="optionInput9" type="radio" id="growth5" name="settingGrowth" value="GR_ETC" onclick="optionDetail(this)">
		                        <label for="growth5">성장율 그 외인 기업</label>
		                    </li> -->
		                </ul>
		            </div>
		            
		    
		            
		        </div>
		        <div class="close" onclick="toggleSetting();"><i class="closeBtn"></i></div>
		</div>
   		<!--  상세 설정 끝 -->
    
    
    
    	<!-- 지역랭킹 클릭 팝업 시작 -->
	    <div class="popup rankResult shadow" id="popupLayout1">
	        <div class="popupContainer">
	            <div class="titleWrap">
	                <i class="station"></i>
	                <p class="title" id="miniPopuipTitle">세종특별자치시</p>
	                <!-- <i class="closeBtn" onclick="closePopup(this)"></i> -->
	            </div>
	            
	            <ul class="content" id="popContent1">
	                <li>
	                    <i class="company"></i>
	                    <span class="text" id="overPopupTitle">기업</span>
	                    <span class="countWrap"><span class="count" id="miniComCount">0</span>개</span>
	                </li>
	                <li>
	                    <i class="lastYear"></i>
	                    <span class="text">전년대비</span>
	                    <span class="countWrap up" id="growth"><span class="count" id="miniComUpCount">0.0</span>%</span>
	                </li>
	                <li>
	                    <i class="area"></i>
	                    <span class="text">지역 내 기업분포</span>
	                    <span class="countWrap"><span class="count" id="miniComDownCount">0.0</span>%</span>
	                </li>
	                <li>
	                    <i class="rank"></i>
	                    <span class="text">지역순위</span>
	                    <span class="countWrap"><span class="count" id="miniComRank">0</span>위</span>
	                </li>
	            </ul>
	            <ul class="content" id="popContent2" style="display: none">
	                <li>
	                    <i class="company"></i>
	                    <span class="text" id="toPopupTitle1">인구</span>
	                    <span class="countWrap"><span class="count" id="toPopupTitle2">0</span><span id="toPopupTitle3">명</span></span>
	                </li>
	            </ul>
	        </div>
	    </div>
        <!-- 지역랭킹 클릭 팝업  끝-->
        
        
        
		<!-- 지도로 생태분석 결과 조회 1뎁스 -->
	    <div class="leftContent rankResult htFit">
	
	        <div class="scroll container ht100per"  id="leftMain1">
	            <div class="titleWrap">
	                <div class="title arrow-sbr">
	                	<i class="icon_marker"></i>
	                    <span id="regionName">세종특별자치시</span>
	                    
	                    <i class="arrow-sbr" id="arrowSbr" onclick="getMaketInfo()"></i>
	                </div>
	                
	
	            </div>
	            
	
	            <ul class="section signal">
	                <li class="title">
	                    <i class="icon_signal"></i>
	                    <span>지역 시그널</span>            
	                    <i class="help tip-right" data-tippy-content="지역 시그널 팁"></i>    
	                </li>
	                <li class="sub signalContent" onclick="openSignal(this)" data-content="sales">
	                    <i class="icon_sales"></i>
	                    <span><span id="topBizSize">매출 100대 대기업</span><span class="point" id="topBizCount">100</span>개 위치</span></span>
	                </li>
	                <li class="sub signalContent" id="signalTrend" onclick="openSignal(this)" data-content="house">
	                    <i class="icon_house"></i>
	                </li>
	                <li class="sub signalContent" id="signalOpenClose" onclick="openSignal(this)" data-content="chart">
	                    <i class="icon_chart"></i>
						<span class="signalValue">
							(준비중)지역의 개폐업 현황정보
						</span>
	                </li>
	                <li class="sub signalContent" id="signalYouthPeople" onclick="openSignal(this)" data-content="people">
	                    <i class="icon_people"></i>
						<span class="signalValue">
							(준비중)지역의 청장년인구 현황정보
						</span>
	                </li>
	                <li class="sub signalContent" id="signalLandPrice" onclick="openSignal(this)" data-content="area">
	                    <i class="icon_area"></i>
	                    <!-- <span id="areaLeftTitle" style="display: none">토지 공시지가 평균<span class="point">9,999만원</span></span> -->
	                    <span class="signalValue">(준비중)토지 공시지가 정보</span>
	                </li>
	                <li class="sub signalContent" onclick="openSignal(this)" data-content="job" id="leftJobBtn">
	                    <i class="icon_kind"></i>
	                    <span>선택 업종 관련<span class="point" id="jobCountSpan">0</span>건 구인중</span>
	                </li>
	                <li class="lodSub" id="signalLosdBar" style="height: 252px;">
	                   
	                </li>
	            </ul>
	            
	            <ul class="subTitle">
	                <li class="title"><i class="icon_signal"></i><span id="year"> 2022 </span> <span id="bizName">'제조업'</span>  지역분석</li>            
	            </ul>
	
	          <ul class="section activity iconTitle">
	                <li class="title">
	                    <i class="icon_activity"></i>
	                    <span>기업활력</span>
	                    <i class="help tip-right" data-tippy-content="기업활력 팁"></i>                
	                </li>
	
	                <li>
	                    <div class="hintType2 rankChar1">
	                        <p><span id="leftComTxt1">제조업 전체기업 수는</span> <span class="bold" id="leftTotalCoSpan1">1,000,000</span>개이며<br>전년 대비 <span id="leftTotalCoSpan2">10,000개(1.0%)</span></p>
	                    </div>
	                    <div class="chartArea rankChar1" style="width:100%; height:300px; background: #dedede;" id="leftChar1"></div>
	                    <div class="lodSub chartLoadBar1" style="height: 381px"></div>
	                </li>
	                
	                <li>
                    	<div class="hintType2 rankChar1">
                        	<p><span class="leftTitle1" id="leftComTxt2">제조업</span> 개업 5년 이내 평균 생존율은 <span class="bold" id="leftTotalCoSpan4">50.0%</span> 입니다.</p>
                    	</div>
	                    <!-- 평균 생존율 차트 column comparison -->
	                    <div class="resultChart rankChar1" style="width:100%; height:300px" id="leftChar3"></div>
	                    <div class="lodSub chartLoadBar1" style="height: 363px"></div>
                	</li>
                <li class="dimDash"></li>
                <li>
                    <div class="hintType2 rankChar1">
                        <p><span class="leftTitle1" id="leftComTxt3">제조업</span> 평균 영업기간은 <span class="bold" id="leftComTxt4">10.0년</span><span id="leftComTxt5">이며 지역 내 전체업종 중 <span class="bold" id="leftComTxt6">5번째</span>로 높습니다.</span><span id="leftComTxt99"> 입니다.</span></p>
                    </div>
                    
                    <!-- 평균 영업기간 inforgraphic -->
                    <div class="rankArea rankChar1">
                        <ul class="wrapper" id="leftComList1">
                            <li class="content">
                                <span class="rank one">1</span>
                                <span class="title">편의점</span>
                                <span class="per">12.2%</span>
                            </li>
                            <li class="content">
                                <span class="rank two">2</span>
                                <span class="title">편의점</span>
                                <span class="per">10.2%</span>
                            </li>
                            <li class="content">
                                <span class="rank three">3</span>
                                <span class="title">편의점</span>
                                <span class="per">8.2%</span>
                            </li>
                        </ul>
                    </div>
                    <div class="lodSub chartLoadBar1" style="height: 218px"></div>
                </li>
	                
	            </ul>
	            <ul class="section status iconTitle">
                <li class="title">
                    <i class="icon_status"></i>
                    <span>기업 규모별 현황</span>               
                    <i class="help tip-right" data-tippy-content="기업 규모별 현황 팁"></i> 
                </li>
                <li class="tab">
                    <div onclick="rankStatusTab(this);" class="active" data-tab="company">기업</div>
                    <div onclick="rankStatusTab(this);" data-tab="cost">매출액</div>
                    <div onclick="rankStatusTab(this);" data-tab="people">종사자</div v>
                </li>

                <!-- 기업수 -->
                <li data-content="company" class="active tabContent">
                    <div class="hintType2 rankChar2">
                        <p><span id="leftTitle9">대기업</span>의 기업 수가  <span class="bold" id="leftTitle10">10,000개</span>로 가장 많고 전체 기업의  <span class="bold" id="leftTitle11">45.0%</span>를 차지하고 있어요.</p>
                    </div>
                    <!-- 기업규모별 기업수 basic line -->
                    <div class="resultChart rankChar2" style="width:100%; height:300px" id="leftChar4"></div>
                    <div class="lodSub chartLoadBar2" style="height: 381px"></div>
                </li>

                <!-- 매출액 -->
                <li data-content="cost" class="tabContent">
                    <div class="hintType2">
                        <p>전체 매출액 중 <span class="bold" id="leftTitle12">소상공인이 99%</span>를 차지하고 소상공인 평균 매출액은 <span class="bold" id="leftTitle13">100억원</span>입니다.</p>
                    </div>
                    <!-- 기업규모별 매출액 basic line -->
                    <div class="resultChart" style="width:100%; height:300px" id="leftChar5"></div>
                </li>


                <!-- 종사자 -->
                <li data-content="people" class="tabContent">
                    <div class="hintType2">
                        <p>전체 종사자 중 <span class="bold" id="leftTitle14">소상공인이 10%</span>를 차지하고 소상공인 평균 종사자는 <span class="bold" id="leftTitle15">100명</span>입니다.</p>
                    </div>
                    
                    <!-- 기업규모별 종사자 basic line -->
                    <div class="resultChart" style="width:100%; height:300px" id="leftChar6"></div>
                </li>
            </ul>

            <!-- 
                기업 구성원
                대표자, 종사자 현황 
            -->
            <ul class="section people iconTitle">
                <li class="title">
                    <i class="icon_people"></i>
                    <span>기업 구성원</span>           
                    <i class="help tip-right" data-tippy-content="기업 구성원 팁"></i>     
                </li>
                <li class="tab">
                    <div onclick="rankStatusTab(this);" class="active" data-tab="ceo">대표자</div>
                    <div onclick="rankStatusTab(this);" data-tab="worker">종사자</div>                    
                </li>


                <!-- 대표자 -->
                <li data-content="ceo" class="tabContent active">
                    <div class="hintType2 rankChar3">
                        <p>대표자 평균연령은 <span class="bold" id="leftTitle16">50대</span>이며 <span class="bold" id="leftTitle17">남성이 여성보다 100명(10.0%) 많아요.</span></p>
                        
                    </div>
                    <!-- 기업구성원 대표자 column and pie combination -->
                    <div class="resultChart rankChar3" style="width:100%; height:300px" id="leftChar7"></div>
                    
                    <div class="lodSub chartLoadBar3" style="height: 381px"></div>
                </li>

                <!-- 종사자 -->
                <li data-content="worker" class="tabContent">
                    <div class="hintType2">
                        <p>전체 종사자는 <span class="bold" id="leftTitle18">1,000,000명</span>이며 <span id="leftTitle19">상용직이 일용직보다 </span><span class="bold" id="leftTitle20">100명(1.0%)</span> 많아요.</p>
                    </div>
                    
                    <!-- 기업구성원 종사자 column and pie combination -->
                    <div class="resultChart" style="width:100%; height:300px" id="leftChar8"></div>
                 
                </li>

            </ul>

            <!-- 지역 내 주요업종-->
            <ul class="section mostKind iconTitle">
                <li class="title">
                    <i class="icon_mostKind"></i>
                    <span>지역 내 주요업종</span>           
                    <i class="help tip-right" data-tippy-content="지역 내 주요업종 팁"></i>     
                </li>
                
                <li>
                    <div class="hintType2">
                        <p>가장 많이 분포한 업종은 <span class="bold" id="leftComTxt7">편의점</span>이며, 전체 기업의 <span class="bold" id="leftComTxt8">1,000개(20.0%)</span>를 차지합니다.</p>
                    </div>
                    
                    <!-- 지역 내 주요업종 inforgraphic -->
                    <div class="rankArea">
                        <ul class="wrapper" id="leftComList2">
                            <li class="content" >
                                <span class="rank one">1</span>
                                <span class="title">
                                    <p>편의점</p>
                                    <p class="desc">기업 수 0개(전년대비 0.0% <i class="icon_up"></i>)</p>
                                </span>
                                <span class="per">20.2%</span>
                            </li>
                            <li class="content">
                                <span class="rank two">2</span>
                                <span class="title">
                                    <p>업종명</p>
                                    <p class="desc">기업 수 0개(전년대비 0.0% <i class="icon_down"></i>)</p>
                                </span>
                                <span class="per">10.2%</span>
                            </li>
                            <li class="content">
                                <span class="rank three">3</span>
                                <span class="title">
                                    <p>업종명</p>
                                    <p class="desc">기업 수 0개(전년대비 0.0% <i class="icon_down"></i>)</p>
                                </span>
                                <span class="per">8.2%</span>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>

            <!-- 인구/가구 -->
            <ul class="section peopleHome iconTitle">
                <li class="title">
                    <i class="icon_peopleHome"></i>
                    <span>인구/가구</span>
                    <i class="help tip-right" data-tippy-content="인구/가구 팁"></i>                
                </li>
                <li>
                    <div class="hintType2 rankChar4">
                        <p>전체인구 대비 청장년인구는 <span class="bold" id="leftTotalCoSpan7">10,000,000명(70.0%)</span>이며, <span class="bold" id="leftTotalCoSpan8">100,000명(20.0%)</span>는 1인 가구입니다.</p>

                    </div>
                    
                    <!-- 인구/가구 column comparison -->
                    <div class="resultChart rankChar4" style="width:100%; height:300px" id="leftChar9" ></div>
                    <div class="lodSub chartLoadBar4" style="height: 381px"></div>
                </li>
            </ul>

            <!-- 토지/건물 -->
            <ul class="section areaBuilding iconTitle">
                <li class="title">
                    <i class="icon_areaBuilding"></i>
                    <span>토지/건물</span>
                    <i class="help tip-right" data-tippy-content="토지/건물 팁"></i>                
                </li>

                <li>
                    <div class="hintType2 rankChar4">
                        <p>지역의 토지면적은 <span class="bold" id="leftTotalCoSpan9">00㎢</span> 이며, 전체 건물 대비 준공 30년 이상 노후 건물은 <span class="bold" id="leftTotalCoSpan10">10.0%</span>입니다.</p>
                    </div>
                    
                    <!-- 기업규모별 기업수 basic line -->
                    <div class="resultChart rankChar4" style="width:100%; height:200px" id="leftChar10"></div>
                    <div class="lodSub chartLoadBar4" style="height: 381px"></div>
                </li>
                <li class="abWrapper">
                    <div class="shadow">   
                        <p>평균 공시지가</p>
                        <p class="data" id="leftTotalCoSpan11">0만원</p>   
                    </div>
                    <div class="shadow">   
                        <p>평균 실거래가</p>
                        <p class="data" id="leftTotalCoSpan12">0만원</p>   
                    </div>
                    <div class="shadow">   
                        <p>거래건수</p>
                        <p class="data" id="leftTotalCoSpan13">0 건</p>   
                    </div>
                </li>
            </ul>
	        </div>
	
	        <div class="resultBtn" onclick="showAllResult();">종합분석</div>
	
	        <div class="close" onclick="closeLeft(this)"><i class="closeBtn"></i></div>
	    </div>
		<!-- 생태분석 결과 조회 1뎁스 끝 -->
		
		
		<!-- 지도로 생태분석 시그널 확장 레이어 sales -->
	    <div class="leftSub sales htFit" data-content="sales" id="signelDiv">
	        <div class="container scroll ht100per" id="salesDataList">
	            <article class="title">
	                <span class="bold">세종특별자치시</span>의<br> <span class="bold">기업 분포</span>와 유사한지역
	            </article>
	            <article class="content">
	                <p class="title">1. 서울특별시</p>
	                <ul>
	                    <li class="on"><i class="icon_sales"></i>매출 100대 대기업 <span class="bold">99개</span> 위치</li>
	                    <li class=""><i class="icon_house"></i><span class="bold">제조업</span>이 전년대비 <span class="bold">99.9%</span> 증가</li>
	                    <li class=""><i class="icon_chart"></i>개업이 폐업보다<span class="bold">99.9%</span> 강세</li>
	                    <li class=""><i class="icon_people"></i>청장년 인구 3년 연속 <span class="bold">99.9%</span> 증가 추세</li>
	                    <li class=""><i class="icon_area"></i>토지 공시지가 평균<span class="bold">9,999만원</span></li>
	                    <li class=""><i class="icon_kind"></i>선택 업종 관련 <span class="bold">10,000건</span> 구인중</li>
	                </ul>
	            </article>
	            
	            <div class="close" onclick="closeLeft(this)"><i class="closeBtn"></i></div>
	        </div>
	    </div>
	    <!-- 생태분석 결과 조회 2뎁스 -->
	    
	    <!-- 일자리목록 -->
	    <div class="leftSub kind htFit" data-content="job">
	        <div class="container scroll ht100per" id="jobListDiv">
	           
	        </div>
	    </div>
	    <!-- 일자리 끝 -->
		
		<!-- 종합분석 팝업 시작 -->
		<div class="layerOverlay"></div>
	    <div class="layerLg shadow" id="allResult">
	        <div class="container" style="height: 800px;" id="printDiv">
	            <div class="titleWrap">
	                <p id="reportTitle">대전광역시 서구 종합분석</p>
	                <i class="close" onclick="closeResult()"></i>
	            </div>
	            <div class="menuWrap">
	                <ul class="tab">
	                    <li class="active" data-tab="kind" onclick="layerBoxTab(this)" id="mainTabBtn"><i class="icon kind"></i><p>업종분석</p></li>
	                    <li data-tab="company" onclick="layerBoxTab(this)"><i class="icon company"></i><p>기업분석</p></li>
	                    <li data-tab="area" onclick="layerBoxTab(this)"><i class="icon area"></i><p>공간분석</p></li>
	                </ul>
	               <ul class="btnWrap">
	                   <li class="gubun" id="resultJobListBtn">
	                        <i class="icon menu" id="resultJobCodeBtn" onclick="gubunTrigger(this);"></i>
	                        <div class="optionContainer depth shadow" style="width: 350px">
	                            <ul class="optionHead">
	                                <li>전체업종</li>
	                                <li class="open bizCodeOpen">
	                                	<button class="btnLine2">펼치기</button>
	                                </li>
	                                <li class="close bizCodeClose">
	                                	<button class="btnLine2">닫기</button>
	                                </li>
	                            </ul>
	                            <div class="optionAcc scroll" id="sbrInfoBizDiv">
	                            </div>
	                        </div>
	                    </li>
	                    <li class="selectBox icon year" onclick="infoYearClick();" >
	                        <div class="optionContainer"  id="infoYearBtn">
	                        <c:forEach var="value" items="${years}" varStatus="status">
	                            <div class="option searchRadioOption3">
	                                <input type="radio" class="radio" id="year${value}" name="year" value="${value}">
	                                <label for="year${value}">${value}</label>
	                            </div>
	                        </c:forEach>
	                        </div>
	                        <div class="selected"><span class="icon"></span><span class="text" id="resultTitle1">2020</span></div>
	                    </li>
	                    <li class="location" id="popupJobTitle">전체업종</li>
	                    <li onclick="printHtml();"><i class="icon print"></i></li>
	                </ul>
	            </div>
	
	            <!-- 업종분석 -->
	            <div class="content" data-content="kind" style="display:block" id="imgKind">
	                <div class="tabBox">
	                    <section class="wd50 br bb">
	                        <article class="wd100 kind">
	                            <div class="titleWrap">
	                                <!-- <i class="companyCount"></i>
	                                <p class="title">전체기업수</p> -->
	                                <li class="selectBox icon companyCount" id="customBtnDiv">
	                                    <div class="optionContainer">
	                                        <div class="option searchRadioOption3">
	                                            <input type="radio" class="radio" id="custom1" name="custom" value="1">
	                                            <label for="custom1">전체기업수</label>
	                                        </div>
	                                        <div class="option searchRadioOption3">
	                                            <input type="radio" class="radio" id="custom2" name="custom" value="2">
	                                            <label for="custom2">기업규모</label>
	                                        </div>
                             	            <div class="option searchRadioOption3">
	                                            <input type="radio" class="radio" id="custom3" name="custom" value="3">
	                                            <label for="custom3">조직형태</label>
	                                        </div>
                             	            <div class="option searchRadioOption3">
	                                            <input type="radio" class="radio" id="custom4" name="custom" value="4">
	                                            <label for="custom4">개업/페업</label>
	                                        </div>
                             	            <div class="option searchRadioOption3">
	                                            <input type="radio" class="radio" id="custom5" name="custom" value="5">
	                                            <label for="custom5">대표자</label>
	                                        </div>
	                                    </div>
	                                    <div class="selected"><span class="icon companyCount"></span><span class="text">전체기업수</span></div>
	                                </li>
	                            </div>
	                            <div class="content">
	                                
	                                <div class="chartArea" id="layerLgChart1" style="width:100%; height:170px">

	                                </div>
	                                
	                                <div class="textBox">
	                                    <ul>
	                                        <li><p id="lineChartTitle">2020년 전체 기업</p> 
	                                        <i class="help">
	                                        	<div class="hint shadow">선택하신 업종의 폐업을 제외한 전체 기업 수와 전년대비 증감을 확인할 수 있습니다.</div>
	                                        </i></li>
	                                        <li id="lineChartCount">6,000,000개</li>
	                                        <!-- class {up , down} 으로 상향 아이콘 조정 -->
	                                        <li class="updown down" id="lineChartUpDown">100,000</li> 
	                                        <li class="badge"id="lineChartBadge">10.0%</li>
	                                    </ul>
	                                </div>
	                            </div>
	                        </article>
	                    </section>
	                    <section class="wd50 inner bb">
	                        <article class="wd50 br activity">
	                            <div class="titleWrap">
	                                <i class="activity"></i>
	                                <p class="title">활동현황</p>
	                                <i class="help">
	                                	<div class="hint shadow">선택하신 업종의 활동중인 기업과 비활동중인 기업 수를 확인할 수 있습니다.</div>
	                                </i>
	                            </div>
	                            <div class="content">
	                                <div class="chartArea" id="layerLgChart2" style="width:100%; height:170px"></div>
	                                <!-- <div class="chartDummy">chartArea</div> -->
	                                <div class="textBox mt0">
	                                    <ul>
	                                        <li>
	                                            <span>활동기업</span>
	                                            <span class="count on" id="acCmCntOn">4,000,000 개</span>
	                                        </li>
	                                        <li>
	                                            <span>비활동기업</span>
	                                            <span class="count off" id="acCmCntOff">6,000,000 개</span>
	                                        </li>
	                                    </ul>
	                                </div>
	                            </div>  
	                        </article>
	                        <article class="wd50 openClose">
	                            <div class="titleWrap ">
	                                <i class="openClose"></i>
	                                <p class="title">개폐업현황</p>
	                                <i class="help">
	                                	<div class="hint shadow">선택하신 업종의 개업, 폐업 수와 지역 내 전체 업종에서 차지하는 비중을 확인할 수 있습니다.</div>
	                                </i>
	                            </div>
	                            <div class="content">
	                                <ul class="open">
	                                    <li class="title">
	                                        <span>개업</span>
	                                        <span class="count" id="openCompanyCount">100 개</span>
	                                    </li>
	                                    <li>
	                                        <span>지역 전체 개업</span>
	                                        <span class="count" id="allOpenCompanyCount">1,000 개</span>
	                                    </li>
	                                    <li>
	                                        <span>선택 업종 비중</span>
	                                        <span class="count" id="openCompanyRatio">10.0 %</span>
	                                    </li>
	                                    <li class="badge" id="openBadge">개업강세</li>
	                                </ul>
	                                <ul class="close">
	                                    <li class="title">
	                                        <span>폐업</span>
	                                        <span class="count" id="closeCompanyCount">100 개</span>
	                                    </li>
	                                    <li>
	                                        <span>지역 전체 폐업</span>
	                                        <span class="count" id="allCloseCompanyCount">1,000 개</span>
	                                    </li>
	                                    <li>
	                                        <span>선택 업종 비중</span>
	                                        <span class="count" id="closeCompanyRatio">10.0 %</span>
	                                    </li>
	                                    <li class="badge" id="closeBadge">폐업강세</li>
	                                </ul>
	                            </div>
	                        </article>
	                    </section>
	                    <section class="wd100 inner">
	                        <article class="wd50 br">
	                            <div class="titleWrap">
	                                <i class="growCompany"></i>
	                                <p class="title">성장기업분포</p>
	                                <i class="help">
		                                <div class="hint shadow">
	                                        		선택하신 업종의 전년대비 종사자와 매출액이 모두 성장한 기업 수를 성장률 구간별로 확인할 수 있습니다.<br>※ 급성장이란 20% 이상 성장기업 중 개업 5년이내 기업을 의미합니다.
	                                    </div>
	                                </i>
	                            </div>
	                            
	                            <div class="growCompanyWrap">
	                                <div class="chartWrap" style="height:250px">
	                                    <div id="growCompanyDistChart" style="width:300px;height:250px;"></div>
	                                </div>
	                                <div class="content">
	                                    <div class="dataBox shadow">
	                                        <p class="title">전체성장기업</p>
	                                        <div class="dim"></div>
	                                        <p class="count" id="totalGrowCom"></p>
	                                        <p>전체기업의 <i id="rateI"></i> <span>%</span></p>
	                                    </div>
	                                    <div class="legend">
	                                        <ul class="legendContent">
	                                            <li>
	                                                <span>급성장</span>
	                                                <span id="grEtc"></span>
	                                            </li>
	                                            <li>
	                                                <span>20% 이상</span>
	                                                <span id="gr20"></span>
	                                            </li>
	                                            <li>
	                                                <span>10% ~ 20%</span>
	                                                <span id="gr1020"></span>
	                                            </li>
	                                            <li>
	                                                <span>10% 미만</span>
	                                                <span id="gr10"></span>
	                                            </li>
	                                            <li>
	                                                <span>그 외</span>
	                                                <span id="grHigh"></span>
	                                            </li>
	
	                                        </ul>
	                                    </div>
	                                </div>
	                            </div>
	                            
	                            
	                        </article>
	                        <div class="wd50">
	                            <article class="wd100 bb avrCost">
	                                <div class="titleWrap pb6">
	                                    <i class="avrCost"></i>
	                                    <p class="title">평균 매출액</p>
	                                    <i class="help">
	                                    	<div class="hint shadow">
                                            		선택하신 업종의 평균 매출액을 지역 내 가장 낮은 업종과 높은 업종을 비교하여 볼 수 있습니다.
                                        	</div>
	                                    </i>
	                                </div>
	                                <div class="content">
	                                    <div class="gaugeBox">
	                                        <div class="barBg"></div>
	                                        <div class="gaugeInner">
	                                            <div class="gaugeLen" id="avrCostGaugeLen"></div>
	                                            <i class="pointer" id="avrCostPointer"></i>
	                                            <div class="gaugeTip" id="avrCostBadge">
	                                                <div class="badge" id="avrCostTargetData">700만원</div>
	                                            </div>
	                                        </div>
	                                        
	                                        <div class="clear_box clear_box"></div>
	                                    </div>
	                                    <ul class="gaugeText">
	                                        <li class="low">
	                                            <p class="count" id="avrCostLowData">100만원</p>
	                                            <p class="desc">가장낮은업종</p>
	                                            <p class="desc"><!-- (업종명) --></p>
	                                        </li>
	                                        <li class="high">
	                                            <p class="count" id="avrCostHighData">1,000만원</p>
	                                            <p class="desc">가장높은업종</p>
	                                            <p class="desc"><!-- (업종명) --></p>
	                                        </li>
	                                    </ul>
	                                </div>
	                            </article>
	                            <article class="wd100 avrTime">
	                                <div class="titleWrap pb6">
	                                    <i class="avrTime"></i>
	                                    <p class="title">평균 영업기간</p>
	                                    <i class="help">
	                                    	<div class="hint shadow">선택하신 업종의 평균 영업기간을 지역 내 가장 낮은 업종과 높은 업종을 비교하여 볼 수 있습니다.</div>
	                                    </i>
	                                </div>
	                                <div class="content">
	                                    <div class="gaugeBox">
	                                        <div class="barBg"></div>
	                                        <div class="gaugeInner">
	                                            <div class="gaugeLen" id="avrTimeGaugeLen"></div>
	                                            <i class="pointer" id="avrTimePointer"></i>
	                                            <div class="gaugeTip" id="avrTimeBadge" >
	                                                <div class="badge" id="avrTimeTargetData">70.1년</div>
	                                            </div>
	                                        </div>
	                                        
	                                        <div class="clear_box clear_box"></div>
	                                    </div>
	                                    <ul class="gaugeText">
	                                        <li class="low">
	                                            <p class="count" id="avrTimeLowData">0.1년</p>
	                                            <p class="desc">가장낮은업종</p>
	                                            <p class="desc"><!-- (업종명) --></p>
	                                        </li>
	                                        <li class="high">
	                                            <p class="count" id="avrTimeHighData">100.1년</p>
	                                            <p class="desc">가장높은업종</p>
	                                            <p class="desc"><!-- (업종명) --></p>
	                                        </li>
	                                    </ul>
	                                </div>
	                            </article>
	
	                        </div>
	                        
	                    </section>
	                </div>
	            </div>
	
	            <!-- 기업분석 -->
	            <div class="content company" data-content="company" id="imgCompany">
	                <div class="tabBox">
	                    <section class="wd50 bb">
	                        <article class="wd100 comapnyStatus">
	                            <table class="dashedTable table">
	                                <colgroup>
	                                    <col width="20%">
	                                    <col width="30%">
	                                    <col width="20%">
	                                    <col width="30%">
	                                </colgroup>
	                                <tbody>
	                                    <tr class="head">
	                                        <td></td>
	                                        <td id="comBYear">2019</td>
	                                        <td>증감률</td>
	                                        <td id="comCYear">2020</td>
	                                    </tr>
	                                    <tr>
	                                        <td class="title">
	                                            <div>
	                                                <i class="company"></i>
	                                                <p>기업수</p>
	                                            </div>
	                                        </td>
	                                        <td>
	                                            <span class="count"  id="comBCount">100</span><span>개</span>
	                                        </td>
	                                        <td class="updown up">
	                                            <div>
	                                                <span id="comPCount">100.0%</span>
	                                                <i></i>
	                                            </div>
	                                        </td>
	                                        <td>
	                                            <p><span class="count"  id="comCCount">200</span><span>개</span></p>
	                                            <p id="comDCount">(+100개)</p>
	                                        </td>
	                                    </tr>
	                                    <tr>
	                                        <td class="title">
	                                            <div>
	                                                <i class="people"></i>
	                                                <p>종사자</p>
	                                            </div>
	                                        </td>
	                                        <td>
	                                            <span class="count" id="comBCo">100</span><span>명</span>
	                                        </td>
	                                        <td class="updown down">
	                                            <div>
	                                                <span id="comPCo">100.0%</span>
	                                                <i></i>
	                                            </div>
	                                        </td>
	                                        <td>
	                                            <p><span class="count" id="comCCo">200</span><span>명</span></p>
	                                            <p id="comDCo">(+100개)</p>
	                                        </td>
	                                    </tr>
	                                    <tr>
	                                        <td class="title">
	                                            <div>
	                                                <i class="won"></i>
	                                                <p>매출액</p>
	                                            </div>
	                                        </td>
	                                        <td>
	                                            <span class="count" id="comBSls">100</span><span>만원</span>
	                                        </td>
	                                        <td class="updown up">
	                                            <div>
	                                                <span id="comPSls">100.0%</span>
	                                                <i></i>
	                                            </div>
	                                        </td>
	                                        <td>
	                                            <p><span class="count" id="comCSls">200</span><span>만원</span></p>
	                                            <p id="comDSls">(+100개)</p>
	                                        </td>
	                                    </tr>
	                                </tbody>
	                            </table>
	                        </article>
	                    </section>
	
	                    <section class="wd50">
	                        <article>
	                            <div id="barChartDiv" style="height:280px; width:100%"></div>
	                        </article>
	                    </section>
	                    <section class="wd50">
	                        <article class="mostCompany">
	                            <div class="titleWrap">
	                                <i class="company"></i>
	                                <p class="title">주요기업</p>
	                                <span class="desc">사업체수 기준</span>
	                            </div>
	                            <div class="content">
	                                <ul class="tabBox" id="mostCompanyUl">
	                                    <li class="active" data-tab="big" onclick="mostCompanyTab(1,this)">대기업</li>
	                                    <li data-tab="middle" onclick="mostCompanyTab(2,this)">중견기업</li>
	                                    <li data-tab="low" onclick="mostCompanyTab(3,this)">중소기업</li>
	                                    <li data-tab="person" onclick="mostCompanyTab(4,this)">소상공인</li>
	                                </ul>
	                                <ul class="tabContent scroll" id="tableDummy">
	                                </ul>
	                            </div>  
	                        </article>
	                    </section>
	
	                    <section class="wd50">
	                        <article class="companyMap">
	                            <div class="titleWrap">
	                                <p class="title" id="charMapTitle"></p>
	                                <span class="desc" id="charMapYear">2020년 기업위치 현황</span>
	                            </div>
	                            <div class="content" style="height:100%;">
	                                <div class="mapBox" id="chartMap"></div>
	                            </div>  
	                        </article>
	                    </section>
	                </div>
	            </div>
	
	            <!-- 공간분석 -->
            <div class="content area" data-content="area"id="imgArea">
                <div class="differArea">
                    <div class="verticalDim"></div>
                    <ul class="titleWrap">
                        <li class="left"><p class="title" id="areaMainTitle"></p></li>
                        <li class="right"><p class="title" id="areaSubTitle"></p><button type="button" class="btnLine" onclick="openDifferAreaMap()">변경</button></li>
                    </ul>
                    <ul class="dataListWrap">
                 
                    </ul>
 
                    <!-- 공간분석 이너 맵 레이어 -->
                    <div class="mapArea innerPopup shadow">
                        <div class="wrapper">
                            <i class="close" onclick="closeDifferAreaMap()"></i>
                            <!-- 맵 삽입 -->
                            <div class="mapContent" id="arearMapDiv"></div>
                        </div>
                        
                    </div>

                    <!-- 공간분석 이너 차트 레이어 -->
                    <div class="chartArea innerPopup shadow">
                        <div class="wrapper">
                            <i class="close" onclick="closeDifferAreaChart()"></i>
                            <!-- 맵 삽입 -->
                            <div id="layerLgChart5" style="width:100%; height:450px;"></div>
                        </div>
                        
                    </div>
                
                </div>
            </div>
	     </div>
		
		 </div>
		<!-- 종합분석 팝업 종료 -->
		
		<!-- 함께보기 팝업 -->
	    <div class="layerLg shadow dwvPopup" id="dataWithViewPopup" >
		        <div class="container" style="height: 800px;">
		            <div class="titleWrap">
		                <p id="mainToPopupTitle">대전광역시 데이터 함께보기</p>
		                <span class="badge"><i class="company"></i><p id="toPopupTitle2">기업이 많은</p></span>
		                <i class="close" onclick="hideDataWithViewPopup()"></i>
		            </div>
		
		            
		
		            <!-- 공간분석 -->
		            <div class="content">
		                <div class="section">
		                    <article class="treeMap">
		                        <div class="titleWrap">
		                            <i class="icon_company"></i>
		                            <p class="title" id="toPopupTitle3">전체기업수</p>
		                            <p class="num"><span class="count" id="tPopTotalTitle">0</span>개</p>
		                        </div>
		
		                        <!-- 트리맵 차트 -->
		                        <div style="width:100%; height:270px;" id="togetherChart"></div>
		                    </article>
		                    <article class="table scroll">
		                        <div class="titleWrap">
		                            <p class="title">순위</p>
		                            <p class="desc">지역명을 클릭하시면 시계열 변화를 확인할 수 있습니다.</p>
		                        </div>
		                        <table  style="table-layout: fixed;">
		                            <colgroup>
		                                <col width="33.3333%">
		                                <col width="33.3333%">
		                                <col width="33.3333%">
		                            </colgroup>
		                            <thead>
		                                <tr>
		                                    <th>
		                                        <div>지역</div>
		                                    </th>
		                                    <th>
		                                        <div>
		                                        	기업<i class="default" onclick="tableSort(this)"></i>
		                                        </div>
		                                    </th>
		                                    <th>
		                                        <div>
		                                        	<span id="tTile1">인구</span><i class="default" onclick="tableSort(this)"></i>
		                                        </div>
		                                    </th>
		                                </tr>
		                            </thead>
		                            <tbody id="togetherTable">
		                            	<tr>
		                            		<td></td>
		                            		<td></td>
		                            		<td></td>
		                            	</tr>
		                            </tbody>
		                            
		                        </table>
		                    </article>
		                </div>
		                <div class="section mt15" >
		                    <article class="wd100 chartWrap" style="height: 330px">
		                        <div class="titleWrap">
		                            <p class="title" id="toPopupChrtTitle1">대전광역시 서구</p>
		                        </div>
		                        <div class="row">
		                            <div class="title" id="toPopupTitle4">기업</div>
		                            <div class="chart" style="" id="tChart1"></div>
		                        </div>
		
		                        <div class="row">
		                            <div class="title" id="tTitle2">인구</div>
		                            <div class="chart" style="" id="tChart2"></div>
		                        </div>
		
		                    </article>
		                </div>
		            </div>
		        </div>
		    </div>
		    
		    
		    <!-- 조건별 지역찾기 하단 slider UI -->
		    <div class="sliderContainer" style="z-index: 80">
		        <ul>
		            <li class="info">
		                <i class="icon_info">
		                    <div class="hint shadow">지도에 표시된 지역 시각화를 지역순위 구간별로 설정하여 볼 수 있습니다.</div>
		                </i>
		            </li>
		            <li class="sliderContent">
		                <input type="text" id="slider" />
		            </li>
		        </ul>
		        <script>
		            
		        </script>
		   </div>
		   <!-- 도움말 -->
		    <div class="leftContent helpContent htFit" id="helpTab" style="display: none; z-index: 90">
		
		        <div class="scroll container ht100per">
		            <div class="titleWrap">
		                <div class="title" id="">
		                    <p>도움말</p>   
		                </div>
		            </div>
		
		            <ul class="section">
		                <li class="title"><span>기업생태분석지도</span></li>
		                <li class="sub""><a href="/view/newhelp/sbr_help_10_0" target="_blank"><p>서비스안내</p></a></li>
		                <li class="sub" onclick="show_helpSub();"><p>지표설명</p></li>
		                <li class="sub acc">
		                    <p>튜토리얼</p>
		                    <ul>
		                        <li onclick="show_sbrHelp();">기업생태분석지도</li>
		                        <li onclick="show_withHelp();">함께보기</li>
		                    </ul>
		                </li>
		            </ul>
		
		            <ul class="section bottom">
		            
		                <li class="title"><span>이런 서비스는 어떤가요?</span></li>
		                
			            <c:forEach var="value" items="${bannerList}" varStatus="status">
	                    <li>
		                    <a href="${value.link_url}"  target="_blank">
		                        <img src="/s-portalcnm/upload/temp/${value.post_title_en}" alt="${value.post_title}">
		                        <p>${value.post_title}</p>
		                    </a>
		                </li>	
	                    </c:forEach>
		                
		            
		            </ul>
		        </div>
		
		        <div class="close" onclick="closeLeft(this)"><i class="closeBtn"></i></div>
		    </div>
		    
		    <div class="loadDiv" id="loadDiv">
				<img src="/img/sbr/loading.gif" alt="loading">
			</div>
			<!-- 면적측정 결과 화면  -->
			<div class="leftContent measureResult htFit" id="arearLeftDataDiv">
				
				        <div class="scroll container ht100per">
				            <div class="titleWrap">
				                <div class="title mb0">
				                    <p>면적측정</p>                       
				                </div>
				            </div>
				            <ul class="countWrap mb30">
				               <li>
				                    <div>
				                        <p>총면적</p>                    
				                        <p><span class="count" id="arearInforLnd">10</span>㎢</p>
				                    </div>
				               </li> 
				               <li>
				                    <div>
				                        <p>전체기업</p> 
				                        <p><span class="count"id="arearInforEnt">1,000</span>개</p>
				                    </div>
				                </li> 
				            </ul>
				
				            <ul class="section sizeStatus iconTitle">
				                <li class="title">
				                    <i class="icon_sizeStatus"></i>
				                    <span>기업규모 현황</span>
				                </li>
				                <li class="pl0 mb20">
				                    <div class="chart" id="measureResultChart1" style="width:100%; height:250px"></div>
				                </li>
				            </ul>
				
				            <ul class="section kindStatus iconTitle">
				                <li class="title">
				                    <i class="icon_kindStatus"></i>
				                    <span>업종별 기업현황</span>
				                </li>
				                <table class="content">
				                    <colgroup>
				                        <col width="55%">
				                        <col width="22.5%">
				                        <col width="17.5%">
				                    </colgroup>
				                    <thead>
				                        <tr>
				                            <th>업종</th>
				                            <th>전체기업(수)</th>
				                            <th>분포</th>
				                        </tr>
				                    </thead>
				                    <tbody id="areaInfoComList">
				                        
				                        
				                    </tbody>
				                </table>
				            </ul>
				                   
				
				        </div>
				        <div class="close" onclick="closeLeft(this,'area')"><i class="closeBtn"></i></div>
				    </div>
			
			<!-- 지표설명 도움말 -->
			    <div class="leftSub helpIndicator helpSub">
			        <div class="scroll container ht100per">
			            <div class="titleWrap">
			                <div class="title" id="">
			                    <p>지표설명</p>   
			                    <i onclick="close_helpSub(this)"class="closeBtn"></i>
			                </div>
			            </div>
			            <div class="section">
			                <table class="indicatorTable">
			                    <colgroup>
			                        <col width="10%">
			                        <col width="15%">
			                        <col width="55%">
			                        <col width="20%">
			                    </colgroup>
			                    <thead>
			                        <tr>
			                            <th>구분</th>
			                            <th>경계 및 지표</th>
			                            <th>지표설명</th>
			                            <th>출처</th>
			                        </tr>
			                    </thead>
			                    <tbody>
			                        <tr>
			                            <td rowspan="5" class="bd">통계구역</td>
			                            <td>행정구역</td>
			                            <td>시도, 시군구, 읍면동의 데이터 레벨로 행정구역별 통계를 확인할 수 있습니다.</td>
			                            <td>-</td>
			                        </tr>
			                        <tr>
			                            <td>산업단지</td>
			                            <td>읍면동 및 집계구 데이터 레벨로 전국의 산업단지의 위치와 통계를 확인할 수 있습니다.<br>
			                            	※ 산업단지는 국가산업단지, 일반산업단지, 도시첨단산업단지, 농공단지로 구분하여 보실 수 있습니다.</td>
			                            <td>국토연구원 산업단지 경계도면(2022년)</td>
			                        </tr>
			                        <tr>
			                            <td>상권</td>
			                            <td>읍면동 및 집계구 데이터 레벨로 전국의 상권 위치와 통계를 확인할 수 있습니다.</td>
			                            <td>소상공인시장진흥공단</td>
			                        </tr>
			                        <tr>
			                            <td>전통시장</td>
			                            <td>읍면동 및 집계구 데이터 레벨로 전국의 전통시장 위치와 통계를 확인할 수 있습니다.</td>
			                            <td>소상공인시장진흥공단</td>
			                        </tr>
			                        <tr class="bd">
			                            <td>도시화</td>
			                            <td>전국의 인구 총합 5만명 이상인 도시화 권역(격자 그룹)을 확인할 수 있습니다.</td>
			                            <td>-</td>
			                        </tr>
			                        <tr>
			                            <td class="bd" rowspan="4">기업분류</td>
			                            <td>표준산업분류</td>
			                            <td>기업이 주로 수행하는 산업 활동을 유사성에 따라 체계적으로 유형화하여 표준산업분류로 확인할 수 있는 지표입니다.<br><br>※ 표준산업분류는 2017년 개정된 10차 기준 중분류 96개로 구분하여 보실 수 있습니다.</td>
			                            <td>기업통계등록부(2019년 ~ 2020년)</td>
			                        </tr>
			                        <tr>
			                            <td>조직형태</td>
			                            <td>조회 조건에 따라 지역별 전체 기업의 조직형태 현황을 확인할 수 있는 지표입니다.<br>※ 조직형태는 법인/개인으로 구분하여 보실 수 있습니다.</td>
			                            <td>기업통계등록부(2019년 ~ 2020년)</td>
			                        </tr>
			                        <tr>
			                            <td>기업규모</td>
			                            <td>조회 조건에 따라 지역별 전체 기업의 기업규모 현황을 확인할 수 있는 지표입니다.<br>※ 기업규모는 대기업, 중견기업, 중소기업, 소상공인으로 구분하여 보실 수 있습니다.</td>
			                            <td>기업통계등록부(2019년 ~ 2020년)</td>
			                        </tr>
			                        <tr class="bd">
			                            <td>매출액</td>
			                            <td>조회 조건에 따라 지역별 전체 기업의 매출액 현황을 확인할 수 있는 지표입니다.<br>※ 매출액은 5천만원 미만, 5천만원 ~ 1억원, 1억원 ~ 10억원, 10억원 ~ 50억원, 50억원 ~ 100억원, 100억원 ~ 500억원, 500억원 ~ 1,000억원, 1,000억원 이상으로 구분하여 보실 수 있습니다.</td>
			                            <td>기업통계등록부(2019년 ~ 2020년)</td>
			                        </tr>
			                        <tr>
			                            <td rowspan="7" class="bd">기업생태</td>
			                            <td>개업</td>
			                            <td>조회 조건에 따라 지역별 전체 기업 중 개업한 기업의 현황을 확인할 수 있는 지표입니다.</td>
			                            <td>기업통계등록부(2019년 ~ 2020년)</td>
			                        </tr>
			                        <tr>
			                            <td>폐업</td>
			                            <td>조회 조건에 따라 지역별 전체 기업 중 폐업한 기업의 현황을 확인할 수 있는 지표입니다.</td>
			                            <td>기업통계등록부(2019년 ~ 2020년)</td>
			                        </tr>
			                        <tr>
			                            <td>활동</td>
			                            <td>조회 조건에 따라 지역별 전체 기업 중 활동중인 기업의 현황을 확인할 수 있는 지표입니다.<br>※ 활동인 기업은 종사자가 1명 이상 또는 매출액이 0원 이상을 의미합니다.</td>
			                            <td>기업통계등록부(2019년 ~ 2020년)</td>
			                        </tr>
			                        <tr>
			                            <td>비활동</td>
			                            <td>조회 조건에 따라 지역별 전체 기업 중 비활동중인 기업의 현황을 확인할 수 있는 지표입니다.<br>※ 비활동인 기업은 종사자와 매출액이 모두 없음을 의미합니다.</td>
			                            <td>기업통계등록부(2019년 ~ 2020년)</td>
			                        </tr>
			                        <tr>
			                            <td>성장</td>
			                            <td>조회 조건에 따라 지역별 전체 기업 중 성장 기업의 현황을 확인할 수 있는 지표입니다.<br>※ 성장 기업은 전년대비 종사자와 매출액이 모두 성장했음을 의미합니다.<br>※ 0% ~ 10% 미만, 10% ~20%, 20% 이상, 급성장(20% 이상 성장한 기업 중 개업 5년 이내)으로 구분하여 보실 수 있습니다.</td>
			                            <td>기업통계등록부(2019년 ~ 2020년)</td>
			                        </tr>
			                        <tr>
			                            <td>생존</td>
			                            <td>조회 조건에 따라 지역별 전체 기업 중 생존한 기업의 현황을 확인할 수 있는 지표입니다.<br>※ 생존 기업은 개업 시기에 따라 폐업하지 않은 기업을 의미합니다.<br>※ 1년 이내, 2년 이내, 3년 이내, 4년 이내, 5년 이내로 구분하여 보실 수 있습니다.</td>
			                            <td>기업통계등록부(2019년 ~ 2020년)</td>
			                        </tr>
			                        <tr class="bd">
			                            <td>평균 영업기간</td>
			                            <td>조회 조건에 따라 지역별 전체 기업의 평균 영업기간을 확인할 수 있는 지표입니다.<br>※ 5년 이내, 5년 ~ 10년, 10년 ~ 20년, 20년 ~ 30년, 30년 이상으로 구분하여 보실 수 있습니다.<br>※ 산출식 : 기업별((조회연도 – 개업연도) + 1) ÷ 전체 기업 수</td>
			                            <td>기업통계등록부(2019년 ~ 2020년)</td>
			                        </tr>
			                        <tr>
			                            <td rowspan="2" class="bd">기업구성원</td>
			                            <td>대표자</td>
			                            <td>조회 조건에 따라 지역별 대표자의 성별, 연령대를 확인할 수 있는 지표입니다.<br>※ 성별은 전체, 남자, 여자, 미상으로 구분하여 보실 수 있습니다.<br>※ 연령대는 전체, 30대 미만, 30대, 40대, 50대, 60대 이상으로 구분하여 보실 수 있습니다.<br></td>
			                            <td>기업통계등록부(2019년 ~ 2020년)</td>
			                        </tr>
			                        <tr class="bd">
			                            <td>종사자</td>
			                            <td>조회 조건에 따라 지역별 종사자의 고용형태, 성별, 인원을 확인할 수 있는 지표입니다.<br>※ 고용형태는 상용직과 일용직으로 구분하여 보실 수 있습니다.<br>※ 성별은 전체, 남자, 여자로 구분하여 보실 수 있습니다.<br>※ 인원은 전체, 1인, 2인 ~ 4인, 5인 ~ 9인, 10인 ~ 99인, 100인 이상으로 구분하여 보실 수 있습니다.</td>
			                            <td>기업통계등록부(2019년 ~ 2020년)</td>
			                        </tr>
			                    </tbody>
			                </table>
			
			
			            </div>
			        </div>
			    </div>
			    
			    <!-- 기업생태분석지도 도움말 -->
			    <div class="leftSub sbrHelp helpSub">
			        <div class="scroll container ht100per">
			            <div class="titleWrap">
			                <div class="title" id="">
			                    <p>기업생태분석지도</p>   
			                    <i onclick="close_helpSub(this)"class="closeBtn"></i>
			                </div>
			            </div>
			            <div class="section">
			                <img src="/img/sbr/guide1.png" alt="기업생태분석지도 가이드"/>
			
			            </div>
			        </div>
			    </div>
			    
			     <!-- 함께보기 도움말 -->
			    <div class="leftSub withHelp helpSub">
			        <div class="scroll container ht100per">
			            <div class="titleWrap">
			                <div class="title" id="">
			                    <p>함께보기</p>   
			                    <i onclick="close_helpSub(this)"class="closeBtn"></i>
			                </div>
			            </div>
			            <div class="section">
			                <img src="/img/sbr/guide2.png" alt="함께보기 가이드"/>
			
			            </div>
			        </div>
			    </div>
			
			    <!-- 팝업 면적측정 -->
		    <div class="popup naviArea normal" id="areaPopupDiv"  style="z-index: 90">
		        <div class="popupContainer">
		            <div class="titleWrap">
		                <p class="title">알림</p>
		                <i class="closeBtn" onclick="closePopup(this)"></i>
		            </div>
		            <div class="hintContent">
		                <p class="text">면적측정은 읍면동 축척레벨에서만 할 수 있습니다.<br>변경하기 버튼을 누르면 경계가 자동 변경됩니다.</p>
		            </div>
		            
		            
		            <div class="btnWrap">
		                <button type="button" class="btn btnLine" onclick="closePopup(this)">그만보기</button>
		                <button type="button" class="btn btnPrimary" onclick="selectAreaInfo();">변경하기</button>
		            </div>
		        </div>
		    </div>
		    
		    <div class="popup naviArea normal" id="areaPopupDiv2" style="z-index: 90">
		        <div class="popupContainer">
		            <div class="titleWrap">
		                <p class="title">알림</p>
		                <i class="closeBtn" onclick="closePopup(this)"></i>
		            </div>
		            <div class="hintContent">
		                <p class="text">기업위치찾기는 읍면동 축척레벨에서만 할 수 있습니다.<br>변경하기 버튼을 누르면 경계가 자동 변경됩니다.</p>
		            </div>
		            
		            
		            <div class="btnWrap">
		                <button type="button" class="btn btnLine" onclick="closePopup(this)">그만보기</button>
		                <button type="button" class="btn btnPrimary" onclick="selectAreaInfo(2);">변경하기</button>
		            </div>
		        </div>
		    </div>
		    
		    <!-- 토스트 메세지 -->
		    <div class="toast" id="toast1">
		        <div class="toastMsg">
		            <p>읍면동을 선택 후 마우스 오른쪽 버튼을 클릭하세요.</p>
		        </div>    
		    </div>
		    <!-- 토스트 메세지 -->
		    <div class="toast" id="toast2">
		        <div class="toastMsg">
		            <p>원의 중심 위치를 클릭하고 마우스를 이동하세요.</p>
		        </div>    
		    </div>
		    <!-- 토스트 메세지 -->
		    <div class="toast" id="toast3">
		        <div class="toastMsg">
		            <p>사각형의 왼쪽 모서리와 오른쪽 모서리를 클릭하세요.</p>
		        </div>    
		    </div>
		    <!-- 토스트 메세지 -->
		    <div class="toast" id="toast4">
		        <div class="toastMsg">
		            <p>다각형의 꼭지점을 클릭하시고 종료시 오른쪽 버튼을 클릭하세요.</p>
		        </div>    
		    </div>
		    
		    <!-- 전통시장 확장 레이어  -->
			<div class="leftSub tMarket htFit" id="maketPopupDiv">
				        <div class="container scroll ht100per">
				            <article class="title">
				                <span class="bold" id="maketTitle">세종전통시장</span>의<br> <span class="bold">2020년</span> 기준현황
				            </article>
				            <article class="content">
				                <p class="title">전통시장 현황(2020년 기준)</p>
				                <ul>
				                    <li><p>개설주기</p><p id="maketText1">상설시장</p></li>
				                    <li><p>대표품목</p><p id="maketText2">농산물</p></li>
				                    <li><p>소유관리</p><p id="maketText3">공통시장</p></li>
				                    <li><p>시장크기</p><p id="maketText4">소형시장</p></li>
				                    <li><p>정기휴무일</p><p id="maketText5">매주 일요일</p></li>
				                    <li><p>시장형태</p><p id="maketText6">상가주택복합형시장</p></li>
				                    <li class="full">
				                        <p>점포현황</p>
				                        <div class="chart" id="tMarketchart1" style="width:100%; height:200px"></div>
				                    </li>
				                </ul>
				            </article>
				
				            <article class="content amenitie">
				                <p class="title">편의시설</p>
				                <ul id="maketIconList">
				                    <li id="maketIcon1">
				                        <span class="bg"><i class="play"></i></span>
				                        <p>어린이놀이터</p>
				                    </li>
				                    <li id="maketIcon2">
				                        <span class="bg"><i class="info"></i></span>
				                        <p>고객안내소</p>
				                    </li>
				                    <li id="maketIcon3">
				                        <span class="bg"><i class="rest"></i></span>
				                        <p>고객휴게실</p>
				                    </li>
				                    <li id="maketIcon4">
				                        <span class="bg"><i class="baby"></i></span>
				                        <p>수유시설</p>
				                    </li>
				                    <li id="maketIcon5">
				                        <span class="bg"><i class="storage"></i></span>
				                        <p>물품보관소</p>
				                    </li>
				                    <li id="maketIcon6">
				                        <span class="bg"><i class="bike"></i></span>
				                        <p>자전거보관</p>
				                    </li>
				                    <li id="maketIcon7">
				                        <span class="bg"><i class="cart"></i></span>
				                        <p>카트</p>
				                    </li>
				                    <li id="maketIcon8">
				                        <span class="bg"><i class="parking"></i></span>
				                        <p>고객주차장</p>
				                    </li>
				
				                </ul>
				            </article>
				
				            
				            <div class="close" onclick="closeLeft(this)"><i class="closeBtn"></i></div>
				        </div>
				    </div>
			
			
			<!-- 지도로 생태분석 tip  -->
		    <div class="leftContent tipType1 map" style="display: none" id="tipDiv1">
		        <div class="noScroll container">
		            <div class="titleWrap">
		                <div class="title">
		                    지도로 생태분석
		                </div>
		            </div>
		            
		            <div class="hintType2">
		                <p class="text">선택하신 조건에 따라 마우스 드래그 및 스크롤을 이용하여 화면에 보이는 지역의 조회 결과를 확인할 수 있습니다.</p>
		            </div>
		        </div>
		        <div class="close" onclick="closeLeft(this)"><i class="closeBtn"></i></div>
		    </div>
		    
		    <!-- 조건별 지역찾기 팁 -->
		    <div class="leftContent tipType1 map" style="display: none" id="tipDiv2">
		        <div class="noScroll container">
		            <div class="titleWrap">
		                <div class="title">
		                    조건별 지역찾기
		                </div>
		            </div>
		            <div class="hintType2">
		                <p class="text">선택하신 조건에 따라 전국 기준 조건에 부합하는 지역을 확인할 수 있습니다.</p>
		            </div>
		        </div>
		        <div class="close" onclick="closeLeft(this)"><i class="closeBtn"></i></div>
		    </div>
		    
		   
		   	<!-- 초기 로딩 안내 팝업 -->
		   	<div class="layerLg shadow introPop" style="width:650px">
		   		<div class="container" >
		   			<div class="titleWrap">
		                <p>기업생태분석지도 서비스는?</p>		                
		                <i class="close tip-bottom" data-tippy-content="오늘 하루 열지 않음"></i>
		            </div>
		            
		            <div class="content">
		            	<div class="section top">
		            		<div>
		            			<img src="/img/sbr/sbr-intro-banner.png"/>
							</div>
		            		<div>
		            			<p>기업생태분석지도에서는 기업체의 활동, 비활동, 개업, 폐업 등의 생태지표를 활용하여 조회를 원하는 지역의 업종별 통계분석 정보와 시계열추이를 확인할 수 있습니다.</p>
		            		</div>
		            		<div class="mt20">
		            			<p class="bold">기업체란?</p>
		            			<p>단일 또는 주된 경제활동을 독립적으로 수행하는 하나 이상의 사업체</p>
		            		</div>
		            	</div>
		            	<div class="bottom">
		            		<div class="bottom-left section">
		            			<p>서비스를 이해하기 쉽도록 제공되는<br> 경계 및 지표의 자세한 설명을<br>확인할 수 있습니다.</p>
		            			<button type="button">지표설명 보기</button>
		            		</div>
		            		
		            		<div class="bottom-right section">
		            			<p>서비스를 처음 이용하시는<br> 사용자를 위한 튜토리얼이<br>준비되어 있습니다.</p>
		            			<div class="inline">
			            			<button type="button">기업생태</button>
			            			<button type="button">함께보기</button>
		            			</div>
		            			
		            		</div>
		            	</div>
		            </div>
		   		</div>
		   	</div>
		   	
		   	<!-- 지도 공지 팝업 --> 
		   	<div class="naviPopup map-notice" id="notice_mini_pop">
				<img src="/img/sbr/sgis_use_notice_pop.png" usemap="#Map">
				<map name="Map">
					<area shape="rect" coords="565,0,601,36" href="javascript:mapNoticeClose()" alt="팝업닫기">
				</map>
			</div>
			
			
	</body>
	
	
	
</html>