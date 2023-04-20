<!-- 
* 메인화면 HTML입니다.
* 
* history : 네이버시스템(주), 1.0, 2014/08/07  초기 작성
* author : 김성현
* version : 1.0
* see : 
*
//-->
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.List" %> 
<%@ page import="org.json.JSONObject" %> 
<%@ page import="org.json.JSONArray" %> 
<%
	String strType = "";
	try {
		strType = (String)request.getAttribute("type");
		if ( strType != null  ){  
			strType = strType.replaceAll("<","&lt;");  
			strType = strType.replaceAll(">","&gt;"); 
		}
		if(strType == null || strType.length() < 1) {
			strType = "01";
		}
	} catch (IllegalArgumentException e) {
 		System.out.println("파라미터 오류가 발생하였습니다.");
	} catch (Exception e) {
		System.out.println("처리중 오류가 발생하였습니다.");
	}
%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=0,maximum-scale=10,user-scalable=yes">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
        <script type="text/javascript"  src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
        <script type="text/javascript" src="/js/common/includeHead.js"></script>
        <link rel="stylesheet" type="text/css" href="/css/tm.css" />
        <link href="/css/default.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="/css/layout.css" />
        <script type="text/javascript" src="/js/common/common.js"></script>
        <script type="text/javascript" src="/js/thematicMap/thematicMap_api.js"></script>
  	    <script type="text/javascript" src="/js/thematicMap/thematicSearch01.js"></script>
        <script src="/js/plugins/ui.js"></script>
        <!--[if lt IE 9]><script src="/js/plugins/libs/html5shiv.js"></script><![endif]-->
        <!--[if lt IE 9]><script src="/js/plugins/libs/respond.js"></script><![endif]-->
        <script src="/js/plugins/common.js"></script>
        <script src="/js/board/jquery.paging.js"></script>
        <!-- *신규* --> 
		<link rel="stylesheet" type="text/css" href="/css/thematicSearch.css" />
  		<!-- *신규* --> 
        <title>통계주제도 | 통계지리정보서비스</title>
        
        <script>
			$(document).ready(
				function() {
					
		    		srvLogWrite("B0","01","05","00","","");
					
					console.log("<%=strType%>");
					//console.log($thematicSearch01);
					$thematicSearch01.ui.setThemaType("<%=strType%>");

				$(".board_tabs2 a").click(function(){
					$(".board_tabs2 > a").removeClass("active");
					$(this).addClass("active");
					$(".board_area").hide();
					$(".board_area").eq($(".board_tabs2 > a").index(this)).show();
				});
			}); 
			//  mng_s 20171101_김건민 	
			function informationPopOpen(){
				if($("#notice_mini_pop").css("display") == "none") {
					$("#notice_mini_pop").show();
				} else {
					$("#notice_mini_pop").hide();
				}
			}
			
			function informationPopClose(){
				$("#notice_mini_pop").hide();
			}
			//  mng_e 20171101_김건민 
		</script>
		<style>
		a.path_el {
		background-image: url(../../images/common/location_home.gif);
		background-repeat: no-repeat;
		background-position: left center;
		width:14px;
		height:19px;
		position: relative;
    	right: -19px;
    	top: 4px;
		}
		</style>
</head>

<body>  
	<div id="wrap">
		<!-- header // -->
			<header>
				<!-- Top Include -->
				<jsp:include page="/view/common/includeSearch"></jsp:include>
			</header>

		<!-- body -->

		<div class="containerBox">  
			<div class="thematicGuide" style="text-align: right; color: #888;">
			
					<a href="/view/index" class="path_el"></a>
					&nbsp;&nbsp;&nbsp;
                    <a href="/view/thematicMap/categoryList"><span class="path_el current">&nbsp;&nbsp;&nbsp;&nbsp;&gt;&nbsp;&nbsp;&nbsp;통계주제도</span></a>						
			</div>
			
			<div class="thematicSubTitle">
				<h3>통계주제도</h3>
				<p>통계와 관련하여 주요주제에 따른 관심사별 통계정보를 손쉽게 확인할 수 있습니다.</p><br>
				<!--  mng_s 20171101_김건민 -->
				<a onclick="informationPopOpen();" style="cursor:pointer; color:navy; font-weight:bold; font-size:14px; ">
				SGIS의 공간서비스 특성상 실제 공표된 값과 차이가 있을 수 있으므로 유의하시기 바랍니다.[더보기]</a>
				 <!-- mng_e 20171101_김건민 -->  
				 <!-- mng_s 20210715 이진호 / 문구 띄어쓰기 수정 -->
				 <!-- <p>지도의 중심점(통계값, 버블지도 표출시 사용되는)은 각 시도, 시군구, 읍면동의 시각적 중심점을 사용합니다.</p> -->
				 <p>지도의 중심점(통계값, 버블지도 표출 시 사용되는)은 각 시도, 시군구, 읍면동의 행정관청이며,</p>
				 <!-- mng_e 20210715 이진호 -->
			</div>
			<div class="thematicForm" style="margin-top: 0;">
				<input type="text" id="atc-kwd" placeholder="검색어 입력" style="padding-left: 7px;" title="검색어 입력" />
				<a class="inputSearchKeyboard" href="javascript:openKeyboard('atc-kwd','themeSearchBtn');" style="position:absolute; margin-left:-35px; margin-top:7px;">
					<img class="keyimg" src="/js/plugins/keyboard/img/key_off.png" style="display:inline-block; width:25px; height:15px; vertical-align: middle;">
				</a>
				<input type="submit" value="검색" id="themeSearchBtn"/>
				<img id="excelBtn" style="margin-top: -3px;margin-right: 28px;cursor:pointer;float: right; cursor:pointer;" src="/img/ico/ico_excel.png" alt="엑셀다운로드" title="통계주제도 목록 다운로드"/>
<!-- 				<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=2qtFwcUACu201512011358561668043Ge3mTM&theme=CTGR_001&mapType=03"><색상타입 테스트용></a> -->
<!-- 				<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=mMxsUm8SU82015111314280808431lM3yR4kr&theme=CTGR_003&mapType=04"><증감타입 테스트용></a> -->
<!-- 				<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=mMxsUm8SU82015111012280808431lM3yR4kr&theme=CTGR_001&mapType=05"><시계열형 테스트용></a> -->
<!-- 				<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=mMxsUm8SU82015111314234808431lM3yR4kr&theme=CTGR_004&mapType=06"><분할타입 테스트용></a> -->
			</div>			
			<div class="searchResultBox" id="searchResultBox">
				<div class="board_tabs2" style="margin-top:25px;">
						<a onclick="$javascript:srvLogWrite('B0','01','05','00','','');" id="board_tabs_1" class="active" style="text-align:center; cursor: pointer;" tabindex="40">인구와 가구</a>				
						<a onclick="$javascript:srvLogWrite('B0','01','06','00','','');" id="board_tabs_2" style="text-align:center; cursor: pointer;" tabindex="41" class="">주거와 교통</a>
						<a onclick="$javascript:srvLogWrite('B0','01','07','00','','');" id="board_tabs_3" style="text-align:center; cursor: pointer;" tabindex="42" class="">복지와 문화</a>
						<a onclick="$javascript:srvLogWrite('B0','01','08','00','','');" id="board_tabs_4" style="text-align:center; cursor: pointer;" tabindex="43" class="">노동과 경제</a>
						<a onclick="$javascript:srvLogWrite('B0','01','09','00','','');" id="board_tabs_5" style="text-align:center; cursor: pointer;" tabindex="44" class="">건강과 안전</a>
						<a onclick="$javascript:srvLogWrite('B0','01','10','00','','');" id="board_tabs_6" style="text-align:center; cursor: pointer;" tabindex="45" class="">환경과 기후</a>
				</div>
				<div class="board_tabs3">
						<span id="board_tabs_11" style="text-align:center;"></span>				
						<span id="board_tabs_22" style="text-align:center;"></span>
						<span id="board_tabs_33" style="text-align:center;"></span>
						<span id="board_tabs_44" style="text-align:center;"></span>
						<span id="board_tabs_55" style="text-align:center;"></span>
						<span id="board_tabs_66" style="text-align:center;"></span>
				</div>
				<div id="board_area_1" class="board_area" style="display:block;"></div>
				<div id="board_area_2" class="board_area" style="display:none;"></div>
				<div id="board_area_3" class="board_area" style="display:none;"></div>
				<div id="board_area_4" class="board_area" style="display:none;"></div>
				<div id="board_area_5" class="board_area" style="display:none;"></div>
				<div id="board_area_6" class="board_area" style="display:none;"></div>
			</div> <!--searchReslutBox 끝  -->				
			</div>		
			<!--  mng_s 20171101_김건민 -->		 
 			<div id="notice_mini_pop" class="popupWrapper" style="margin-left: 200px; margin-top: 120px; width:602px; height:375px; background: rgba(0,0,0,0); display:none;">
			<div>
				<img src="/img/new/sgis_use_notice_pop.png" alt='' usemap="#popupMap" style="border: 1px solid black" />
				<map name="popupMap">
					<area shape="rect" coords="565 0 601 36" onclick="informationPopClose();" alt="팝업닫기" >
				</map>
			</div>
 			</div> 
 			<!--  mng_e 20171101_김건민 -->

        <!-- footer// -->
		    <footer id="footer">
		    	<!-- Bottom Include -->
				<jsp:include page="/view/common/includeBottom"></jsp:include>
		    </footer>
	</div>
</body>
</html>