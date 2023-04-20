<%
/**************************************************************************************************************************
* Program Name  : 통계주제도 상세 메인 화면 JSP  
* File Name     : thematicMapMain.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-04
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
		if (strType != null) {
			if (strType.equals("bookmark") || strType.equals("sharedata")) {
					paramObj = (String)map.get("paramObj");
					if ( paramObj != null  ){  
						paramObj = paramObj.replaceAll("<","&lt;");  
						paramObj = paramObj.replaceAll(">","&gt;"); 
					}
			}
		}
		
	}catch (IllegalArgumentException e) {
		System.out.println("입력값 오류가 발생하였습니다.");
	}catch (Exception e) {
 		System.out.println("처리중 오류가 발생하였습니다.");
	}
%>


<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="utf-8" />
        <meta name="format-detection" content="telephone=no" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>통계주제도 | 통계지리정보서비스123123</title>

        <link href="/css/default.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />

        <script   src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
        <script   src="/js/common/includeHead.js"></script>
        <script  src="/js/plugins/libs/jquery-ui.js"></script>
        <script   src="/js/common/common.js"></script>
        <script   src="/js/thematicMap/thematicMap_api.js"></script>
        <script   src="/js/thematicMap/thematicMapMain.js"></script>
        <script  src="/js/common/mapNavigation.js"></script>
<!--         <script  src="/js/thematicMap/mapNavigation2.js"></script> -->
        <link rel="stylesheet"  href="/css/im.css" />
        <link rel="stylesheet"  href="/css/cupertino/jquery-ui-1.10.4.custom.css">
        <link rel="stylesheet" type="text/css" href="/css/tm.css" />
<!--         <link href="/css/default.css" rel="stylesheet" type="text/css" /> -->
        <link rel="stylesheet" type="text/css" href="/css/layout.css" />
        
		<!-- 추가 -->
		<link href="/css/map/interactiveFunc.css" rel="stylesheet" type="text/css" /> 
   		<script  src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>  

        <script>
       		$(document).ready(
    			function() {
    				//북마크나 최신데이터는 조건설정창을 자동으로 열지않는다.
    				if ("<%=strType%>" == "bookmark" || "<%=strType%>" == "sharedata") {
    					var param = null;
        				var length = <%=paramObj.length()%>;
        				if (length == 0) {
        					param = "";
        				}else {
        					param = JSON.parse(<%=paramObj%>);
        				}
        				$thematicMapMain.ui.doAnalysisShareInfo("<%=strType%>", param);
    				}
    		});
        </script>
        

		<script src="/js/thematicMap/thematicMapTutorial.js"></script>
		<link rel="stylesheet" href="/css/tutorial/tutorial.css">
		<script>
		    $(document).ready( function() {

		    	$("#tuto_start_btn").show();
				
                if($(location).attr('search').match("tutorial_mode")){
                    readyTutorial();
                } 
		    });
		</script>

    </head>
    <body>
    <input type="hidden" name="stat_thema_map_id" id="stat_thema_map_id"/>
	<input type="hidden" name="theme" id="theme"/>
	<input type="hidden" name="mapType" id="mapType"/>
        <div class="wrap">
            <!-- header // -->
			<header>
				<!-- Top Include -->
				<jsp:include page="/view/common/includeSearch"></jsp:include>
			</header>
            <!-- body -->
 			<iframe class="map_dummy"   id="themeticFrame" title="themeticFrame" style="width: 100%; position: relative; border: 0px;"></iframe>
          		
        </div>
        
        <!-- footer// -->
        <!-- 20211203 김건민 -->
	    <footer id="footer" style="display:none">
	    	<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom/hidden"></jsp:include>
	    </footer>
	    
        <!-- 20190924 mng_s 이금은 -->   
        <div class="tutorialWrapper" style= "display: none" draggable="false">
            <button type="button" id="tuto_start_btn_2" style="font-family: 나눔고딕; border-radius: 1000px; background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 26px; width: 105px; right: 218px; top:107px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="closeTutorial();" title="튜토리얼 종료">튜토리얼 종료</button>
            <div id="headerTutorial" style="width:100%; height:135px; z-index:40000;" draggable="false">
                <div id="tutorialText" draggable="false" >
                    <img id="tuto_end_btn" src="/img/tutorial/tuto_end_btn_01.png" alt="튜토리얼종료" style="float: right; position: relative; width:13px; height:13px; top: 10px; left: -10px;  opacity:10.6; cursor:pointer; text-indent:-2000px; z-index:40999;" onclick="closeTutorial();" draggable="false">
                </div>
            </div>
            
            <img id="top1"               src="/img/tutorial/thematicMap/top1.png"               alt="첫메뉴"                    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="top2"               src="/img/tutorial/thematicMap/top2.png"               alt="첫메뉴"                    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="top2_1_03"          src="/img/tutorial/thematicMap/top2_1_03.png"          alt="인구변화"                  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="top2_1_05"          src="/img/tutorial/thematicMap/top2_1_05.png"          alt="주민등록인구현황"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="top2_1_11"          src="/img/tutorial/thematicMap/top2_1_11.png"          alt="시군구별외국인주민현황"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="top2_1_12"          src="/img/tutorial/thematicMap/top2_1_12.png"          alt="출생및사망현황"            draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="top2_1_14"          src="/img/tutorial/thematicMap/top2_1_14.png"          alt="노령화지수"                draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="top2_3_03"          src="/img/tutorial/thematicMap/top2_3_03.png"          alt="응급의료시설접근현황"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="top2_3_08"          src="/img/tutorial/thematicMap/top2_3_08.png"          alt="보육업체분포도"            draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="top2_5_02"          src="/img/tutorial/thematicMap/top2_5_02.png"          alt="무더위쉼터현황"            draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="top2_5_03"          src="/img/tutorial/thematicMap/top2_5_03.png"          alt="생활안전사고출동건수"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="top2_5_04"          src="/img/tutorial/thematicMap/top2_5_04.png"          alt="지진발생분포지역"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">

            <img id="left_1_0"           src="/img/tutorial/thematicMap/left_1_0.png"           alt="(좌)메뉴-인구와가구" draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_3_0"           src="/img/tutorial/thematicMap/left_3_0.png"           alt="(좌)메뉴-복지와문화" draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_5_0"           src="/img/tutorial/thematicMap/left_5_0.png"           alt="(좌)메뉴-환경과안전" draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">

            <img id="pcs_3_00_0"         src="/img/tutorial/thematicMap/pcs_3_00_0.png"         alt="복지와문화"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="pcs_5_00_0"         src="/img/tutorial/thematicMap/pcs_5_00_0.png"         alt="환경과안전"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">

            <img id="map_1_11_1"         src="/img/tutorial/thematicMap/map_1_11_1.png"         alt="첫메뉴"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_1_11"          src="/img/tutorial/thematicMap/left_1_11.png"          alt="첫메뉴"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_1_11_1"        src="/img/tutorial/thematicMap/left_1_11_1.png"        alt="첫메뉴"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_1_14_1"         src="/img/tutorial/thematicMap/map_1_14_1.png"         alt="노령화지수"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_1_14"          src="/img/tutorial/thematicMap/left_1_14.png"          alt="노령화지수"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_1_14_1"        src="/img/tutorial/thematicMap/left_1_14_1.png"        alt="노령화지수"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_1_14_2"         src="/img/tutorial/thematicMap/map_1_14_2.png"         alt="노령화지수"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_1_14_2"        src="/img/tutorial/thematicMap/left_1_14_2.png"        alt="노령화지수"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_1_14_3"         src="/img/tutorial/thematicMap/map_1_14_3.png"         alt="노령화지수"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_1_14_4"         src="/img/tutorial/thematicMap/map_1_14_4.png"         alt="노령화지수"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="btn_1_14_0"         src="/img/tutorial/thematicMap/btn_1_14_0.png"         alt="노령화지수"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_1_14_1"         src="/img/tutorial/thematicMap/btn_1_14_1.png"         alt="노령화지수"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="pcs_1_14_1"         src="/img/tutorial/thematicMap/pcs_1_14_1.png"         alt="서울특별시"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="pcs_1_14_1_tip"     src="/img/tutorial/thematicMap/pcs_1_14_1_tip.png"     alt="툴팁"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="pcs_1_14_emd"       src="/img/tutorial/thematicMap/pcs_1_14_emd.png"       alt="읍면동"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="pcs_1_14_2"         src="/img/tutorial/thematicMap/pcs_1_14_2.png"         alt="세종시도담동"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="pcs_1_14_2_tip"     src="/img/tutorial/thematicMap/pcs_1_14_2_tip.png"     alt="툴팁"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">

            <img id="map_1_03_1"         src="/img/tutorial/thematicMap/map_1_03_1.png"         alt="인구변화"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_1_03_2"         src="/img/tutorial/thematicMap/map_1_03_2.png"         alt="인구변화"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_1_03_3"         src="/img/tutorial/thematicMap/map_1_03_3.png"         alt="인구변화"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_1_03"          src="/img/tutorial/thematicMap/left_1_03.png"          alt="인구변화"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_1_03_1"        src="/img/tutorial/thematicMap/left_1_03_1.png"        alt="인구변화"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_1_03_2"        src="/img/tutorial/thematicMap/left_1_03_2.png"        alt="인구변화"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_1_03_3"        src="/img/tutorial/thematicMap/left_1_03_3.png"        alt="인구변화"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="btn_1_03_0"         src="/img/tutorial/thematicMap/btn_1_03_0.png"         alt="인구변화"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_1_03_1"         src="/img/tutorial/thematicMap/btn_1_03_1.png"         alt="인구변화"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="pcs_1_03_1"         src="/img/tutorial/thematicMap/pcs_1_03_1.png"         alt="증감률(%)"     draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="pcs_1_03_2"         src="/img/tutorial/thematicMap/pcs_1_03_2.png"         alt="충청남도"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="pcs_1_03_2_tip"     src="/img/tutorial/thematicMap/pcs_1_03_2_tip.png"     alt="툴팁"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="pcs_1_03_3"         src="/img/tutorial/thematicMap/pcs_1_03_3.png"         alt="시군구"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="databoard_1_03_1"   src="/img/tutorial/thematicMap/databoard_1_03_1.png"   alt="데이터보드"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="databoard_1_03_2"   src="/img/tutorial/thematicMap/databoard_1_03_2.png"   alt="데이터보드"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="databoard_1_03_3"   src="/img/tutorial/thematicMap/databoard_1_03_3.png"   alt="데이터보드"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="databoard_1_03_4"   src="/img/tutorial/thematicMap/databoard_1_03_4.png"   alt="데이터보드"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">

            <img id="map_1_05_1"         src="/img/tutorial/thematicMap/map_1_05_1.png"         alt="주민등록인구현황" draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_1_05_2"         src="/img/tutorial/thematicMap/map_1_05_2.png"         alt="주민등록인구현황" draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_1_05"          src="/img/tutorial/thematicMap/left_1_05.png"          alt="주민등록인구현황" draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_1_05_1"        src="/img/tutorial/thematicMap/left_1_05_1.png"        alt="주민등록인구현황" draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_1_05_2"        src="/img/tutorial/thematicMap/left_1_05_2.png"        alt="주민등록인구현황" draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="btn_1_05_0"         src="/img/tutorial/thematicMap/btn_1_05_0.png"         alt="주민등록인구현황" draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_1_05_1"         src="/img/tutorial/thematicMap/btn_1_05_1.png"         alt="주민등록인구현황" draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="pcs_1_05_1"         src="/img/tutorial/thematicMap/pcs_1_05_1.png"         alt="경기도"           draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="pcs_1_05_1_tip"     src="/img/tutorial/thematicMap/pcs_1_05_1_tip.png"     alt="툴팁"             draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="pcs_1_05_2"         src="/img/tutorial/thematicMap/pcs_1_05_2.png"         alt="년도선택"         draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="pcs_1_05_3"         src="/img/tutorial/thematicMap/pcs_1_05_3.png"         alt="년도선택"         draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="pcs_1_05_3_on"      src="/img/tutorial/thematicMap/pcs_1_05_3_on.png"      alt="년도선택"         draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="databoard_1_05_1"   src="/img/tutorial/thematicMap/databoard_1_05_1.png"   alt="데이터보드"       draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="databoard_1_05_2"   src="/img/tutorial/thematicMap/databoard_1_05_2.png"   alt="데이터보드"       draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">

            <img id="map_1_12_1"         src="/img/tutorial/thematicMap/map_1_12_1.png"         alt="출생및사망현황"   draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_1_12"          src="/img/tutorial/thematicMap/left_1_12.png"          alt="출생및사망현황"   draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_1_12_1"        src="/img/tutorial/thematicMap/left_1_12_1.png"        alt="출생및사망현황"   draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="btn_1_12_0"         src="/img/tutorial/thematicMap/btn_1_12_0.png"         alt="출생및사망현황"   draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_1_12_1"         src="/img/tutorial/thematicMap/btn_1_12_1.png"         alt="출생및사망현황"   draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="pcs_1_12_0_L"       src="/img/tutorial/thematicMap/pcs_1_12_0_L.png"       alt="출생및사망현황"   draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="pcs_1_12_1_L"       src="/img/tutorial/thematicMap/pcs_1_12_1_L.png"       alt="출생및사망현황"   draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="pcs_1_12_0_R"       src="/img/tutorial/thematicMap/pcs_1_12_0_R.png"       alt="출생및사망현황"   draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="pcs_1_12_1_R"       src="/img/tutorial/thematicMap/pcs_1_12_1_R.png"       alt="출생및사망현황"   draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">

            <img id="top2_report"        src="/img/tutorial/thematicMap/top2_report.png"        alt="보고서보기"       draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="pop_1_12_1"         src="/img/tutorial/thematicMap/pop_1_12_1.png"         alt="보고서화면"       draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="pop_1_12_2"         src="/img/tutorial/thematicMap/pop_1_12_2.png"         alt="닫기"             draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">

            <img id="map_3_08_1"         src="/img/tutorial/thematicMap/map_3_08_1.png"         alt="복지와문화주제도목록"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_3_08"          src="/img/tutorial/thematicMap/left_3_08.png"          alt="복지와문화주제도목록"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_3"             src="/img/tutorial/thematicMap/left_3.png"             alt="복지와문화주제도목록"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_3_08"          src="/img/tutorial/thematicMap/left_3_08.png"          alt="복지와문화주제도목록"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_3_08_0"         src="/img/tutorial/thematicMap/btn_3_08_0.png"         alt="보육업체분포도"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            
            <!-- mng_s 20210415 이진호, 튜토리얼 현행화 / 이미지 추가 -->
            <img id="btn_3_08_0_1"       src="/img/tutorial/thematicMap/btn_3_08_0_1.png"       alt="보육업체분포도"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <!-- mng_e 20210415 이진호 -->
            
            <img id="btn_3_08_1"         src="/img/tutorial/thematicMap/btn_3_08_1.png"         alt="보육업체분포도"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="pcs_3_08_1"         src="/img/tutorial/thematicMap/pcs_3_08_1.png"         alt="마커"                  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="pcs_3_08_2"         src="/img/tutorial/thematicMap/pcs_3_08_2.png"         alt="마커클릭"              draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">

            <img id="map_3_03_1"         src="/img/tutorial/thematicMap/map_3_03_1.png"         alt="응급의료시설접근현황"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_3_03_2"         src="/img/tutorial/thematicMap/map_3_03_2.png"         alt="응급의료시설접근현황"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_3_03"          src="/img/tutorial/thematicMap/left_3_03.png"          alt="응급의료시설접근현황"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_3_03_1"        src="/img/tutorial/thematicMap/left_3_03_1.png"        alt="응급의료시설접근현황"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="btn_3_03_0"         src="/img/tutorial/thematicMap/btn_3_03_0.png"         alt="응급의료시설접근현황"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_3_03_1"         src="/img/tutorial/thematicMap/btn_3_03_1.png"         alt="응급의료시설접근현황"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="pcs_3_03_1"         src="/img/tutorial/thematicMap/pcs_3_03_1.png"         alt="범례"                  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="pcs_3_03_2"         src="/img/tutorial/thematicMap/pcs_3_03_2.png"         alt="신성동"                draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="pcs_3_03_2_tip"     src="/img/tutorial/thematicMap/pcs_3_03_2_tip.png"     alt="신성동Tip"             draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">

            <img id="map_5_03_1"         src="/img/tutorial/thematicMap/map_5_03_1.png"         alt="생활안전사고출동건수"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_5_03_2"         src="/img/tutorial/thematicMap/map_5_03_2.png"         alt="생활안전사고출동건수"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_5_03"          src="/img/tutorial/thematicMap/left_5_03.png"          alt="생활안전사고출동건수"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_5_03_1"        src="/img/tutorial/thematicMap/left_5_03_1.png"        alt="생활안전사고출동건수"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="btn_5_03_0"         src="/img/tutorial/thematicMap/btn_5_03_0.png"         alt="생활안전사고출동건수"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_5_03_1"         src="/img/tutorial/thematicMap/btn_5_03_1.png"         alt="생활안전사고출동건수"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="pcs_5_03_1"         src="/img/tutorial/thematicMap/pcs_5_03_1.png"         alt="부산"                  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">

            <img id="map_5_02_1"         src="/img/tutorial/thematicMap/map_5_02_1.png"         alt="무더위쉼터"     draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_5_02_2"         src="/img/tutorial/thematicMap/map_5_02_2.png"         alt="무더위쉼터"     draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_5_02"          src="/img/tutorial/thematicMap/left_5_02.png"          alt="무더위쉼터"     draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_5_02_1"        src="/img/tutorial/thematicMap/left_5_02_1.png"        alt="무더위쉼터"     draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="btn_5_02_0"         src="/img/tutorial/thematicMap/btn_5_02_0.png"         alt="무더위쉼터"     draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_5_02_1"         src="/img/tutorial/thematicMap/btn_5_02_1.png"         alt="무더위쉼터"     draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="pcs_5_02_1"         src="/img/tutorial/thematicMap/pcs_5_02_1.png"         alt="강원도"         draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="pcs_5_02_1_tip"     src="/img/tutorial/thematicMap/pcs_5_02_1_tip.png"     alt="강원도Tip"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">

            <img id="map_5_04_1"         src="/img/tutorial/thematicMap/map_5_04_1.png"         alt="지진발생분포지역"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_5_04"          src="/img/tutorial/thematicMap/left_5_04.png"          alt="지진발생분포지역"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="left_5_04_1"        src="/img/tutorial/thematicMap/left_5_04_1.png"        alt="지진발생분포지역"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="btn_5_04_0"         src="/img/tutorial/thematicMap/btn_5_04_0.png"         alt="지진발생분포지역"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_5_04_1"         src="/img/tutorial/thematicMap/btn_5_04_1.png"         alt="지진발생분포지역"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="pcs_5_04_1"         src="/img/tutorial/thematicMap/pcs_5_04_1.png"         alt="경상북도"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="pcs_5_04_1_tip"     src="/img/tutorial/thematicMap/pcs_5_04_1_tip.png"     alt="경상북도Tip"       draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="pcs_5_04_2"         src="/img/tutorial/thematicMap/pcs_5_04_2.png"         alt="경상북도"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="databoard_5_04_1"   src="/img/tutorial/thematicMap/databoard_5_04_1.png"   alt="데이터보드"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="databoard_5_04_2"   src="/img/tutorial/thematicMap/databoard_5_04_2.png"   alt="데이터보드"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">

            <img id="pcs_white"          src="/img/tutorial/thematicMap/pcs_white.png"          alt="흰칸"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="pcs_grey"           src="/img/tutorial/thematicMap/pcs_grey.png"           alt="회색"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="pcs_1"              src="/img/tutorial/thematicMap/pcs_1.png"              alt="접기"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="pcs_2"              src="/img/tutorial/thematicMap/pcs_2.png"              alt="ⓘ"            draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="tooltip_1"          src="/img/tutorial/thematicMap/tooltip_1.png"          alt="ⓘ툴팁"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">

            <img id="top1_left"         src="/img/tutorial/thematicMap/top1_left.png"           alt="통계주제도"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="top1_right"        src="/img/tutorial/thematicMap/top1_right.png"          alt="단축키"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="right_1"            src="/img/tutorial/thematicMap/right_1.png"            alt="위성지도"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="right_emd"          src="/img/tutorial/thematicMap/right_emd.png"          alt="읍면동"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">

            <img id="bottom_1_left"      src="/img/tutorial/thematicMap/bottom_1_left.png"      alt="목록"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="legend_1"           src="/img/tutorial/thematicMap/legend_1.png"           alt="범례"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="legend_2"           src="/img/tutorial/thematicMap/legend_2.png"           alt="범례"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="legend_3"           src="/img/tutorial/thematicMap/legend_3.png"           alt="범례"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">

            <img id="right_expand_on"    src="/img/tutorial/thematicMap/right_expand_on.png"    alt="확대"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="right_reduction_on" src="/img/tutorial/thematicMap/right_reduction_on.png" alt="축소"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">

            <img id="pcs_0_1"            src="/img/tutorial/thematicMap/pcs_0_1.png"            alt="카테고리&목록" draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="pcs_0_2"            src="/img/tutorial/thematicMap/pcs_0_2.png"            alt="주제도목록1"   draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="pcs_0_3"            src="/img/tutorial/thematicMap/pcs_0_3.png"            alt="주제도목록2"   draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">

            <img id="toPoint_1"          src="/img/tutorial/toPoint_1.png"                      alt="포인터"        draggable="false">
            <img id="toPoint_2"          src="/img/tutorial/toPoint_2.png"                      alt="포인터"        draggable="false">
            <img id="toPoint_3"          src="/img/tutorial/toPoint_3.png"                      alt="포인터"        draggable="false">
            <img id="toPoint_4"          src="/img/tutorial/toPoint_4.png"                      alt="포인터"        draggable="false">
        </div>
        <!-- 20190924 mng_e 이금은 -->	    
    </body>
</html>