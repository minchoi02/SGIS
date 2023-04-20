<%
/**************************************************************************************************************************
* Program Name	:  	
* File Name		: workRoadMain.jsp
* Comment		: 
* History		: 
*	2018.09.07	ywKim	신규
*	2018.10.23	ywKim	지도영역과 나머지 부분 분리

*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<jsp:include page="/view/workRoad/workRoadHeader"></jsp:include>

<script src="${pageContext.request.contextPath}/js/workRoad/workRoadTutorial.js"></script>
<link rel="stylesheet" href="/css/tutorial/tutorial.css">
<script>
    $(document).ready( function() {
		if($(location).attr('search').match("tutorial_mode")){
			$("#tuto_wr_start_btn").hide();
			callYn = true;
			readyTutorial();
		} 
    });
    
    function callTutorial(){
    	callYn = confirm("<일자리 맵> \n처음 사용자를 위한 튜토리얼이 준비되어 있습니다.\n진행하시겠습니까?");
    	if(callYn) window.open('/view/workRoad/todayStatus?tutorial_mode', '_blank'); 
    }
</script> 
<style>
	/* default.css에서 복사(동일) 소스 정리되면 삭제필요 */
	.accNav {position:absolute; top:0; left:0; z-index:500; width:100%; height:0;}
	.accNav a {display:block; position:absolute; left:0; top:0; overflow:hidden; width:1px; height:1px; margin-left:-1px; margin-bottom:-1px; text-align:center; color:#fff; white-space:nowrap; font-size:0.75em;}
	.accNav a:focus,
	.accNav a:hover,
	.accNav a:active {z-index:1000; width:100%; height:auto; padding:5px 0; background:#125aac; color:#fff; font-weight:700;}
	/* common.css에서 복사(동일) 소스 정리되면 삭제필요 */
	.toolBar{position:relative;box-sizing:border-box;width:100%;height:34px;border-top:1px solid #d8dade;border-bottom:1px solid #d8dade;background:#fff;}
	.toolBar h2{font-family:'Nanum Gothic Bold';font-size:16px;position:absolute;top:7px;left:60px;display:inline-block;color:#213967;}
	.toolBar h2:before{position:absolute;top:5px;left:-19px;display:inline-block;width:13px;height:12px;content:attr(data-before);background-image:url(../../images/workRoad/icon_title.png);background-repeat:no-repeat;background-position:left center;background-size:100%;}
	.toolBar .tb_right .grid_radio,
	.toolBar .tb_right ul{vertical-align:middle;}
	.toolBar .tb_right .grid_radio{display:inline-block;overflow:hidden;width:49px;height:26px;margin-top:2px;border-radius:10px;background:url(../../images/workRoad/bg/bg_gridradio_on.png);}
	.toolBar .tb_right .grid_radio a{overflow:hidden;width:24px;height:26px;text-indent:-2000px;}
	.toolBar .tb_right .grid_radio .fl{float:left;}
	.toolBar .tb_right .grid_radio .fr{float:right;}
	.toolBar .tb_right ul{display:inline-block;float:right;overflow:hidden;margin:2px 10px;}
	.toolBar .tb_right ul li{float:left;overflow:hidden;width:34px;height:29px;margin-left:4px;}
	.toolBar .tb_right ul li a{display:block;overflow:hidden;width:34px;height:29px;cursor:pointer;}
	.toolBar .left button:last-child{    /* margin-right: 10px; */}
	.toolBar .tb_right .left{line-height:26px;position:relative;top:3px;display:inline-block;overflow:hidden;height:26px;}
	.toolBar .left button[type='button']{line-height:26px;min-width:90px;height:26px;padding:0 10px;cursor:pointer;border:0;border-radius:25px;outline:0;background-color:#1dab8f;}
	.toolBar .left button > span{font-size:12px;line-height:26px;display:block;height:26px;color:#fff;}

	/* 추가 */
	.toolBar h2 {
		left: 25px;
		float: none;
	    padding: unset;
	    background: none;
	}
	.toolBar .tb_right ul { float: none; }
	.toolBar .tb_right .tb_close { margin: 0px;}
	/* 중메뉴의 타이틀 */
	.interactiveBar #wrmTitle {left: 30px; width:auto;}
	.interactiveBar #wrmTitle.on:hover{color: #21b699;cursor: pointer;}
</style>
<!-- 2019-06-10 [김남민] 일자리 맵 서비스 > 메뉴 이동 후에도 전체 화면 확대 유지. START -->
<c:if test="${screen == 'full'}">
<style>
	/* SGIS메뉴영역 제거 */
	header {height:10px; width:100%;}
	.headerEtc, .gnb, .headerContents form{display:none;}
	.headerContents h1{height:10px;}
	.headerContents h1 img{display: none;}
	.containerBox{height: calc(100% - 10px); top: 10px;}
	.searchArea{display: none;}
</style>
</c:if>
<!-- 2019-06-10 [김남민] 일자리 맵 서비스 > 메뉴 이동 후에도 전체 화면 확대 유지. END -->
<!-- 2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START -->
<c:if test="${type == 'full'}">
<style>
	/* SGIS메뉴영역 제거 */
	header {height:10px; width:100%;}
	.headerEtc, .gnb, .headerContents form{display:none;}
	.headerContents h1{height:10px;}
	.headerContents h1 img{display: none;}
	.containerBox{height: calc(100% - 10px) !important; top: 10px !important;}
	.searchArea{display: none;}
	
	/* 전체 화면 확대 버튼 제거 */
	#btnList_1 .tb_sizing{display:none;}
	#btnList_2 .tb_sizing{display:none;}
	#btnList_3 .tb_sizing{display:none;}
	
	/* LNB 숨김 */
	.nav-sidebar {left:-80px !important;}
	
	/* 오늘의구인현황 화면 처리 */
	#wrmTitle {left: 0px !important;}
	#wrmMenuSwitch {display: none;}
	
	/* 구인현황분석 */
	#view1 .sop-left .sop-control {left:10px !important;}
	
	/* 2019-08-27 [김남민] My통계로 > 지자체 헤더 숨김 START */
	/* My통계로 숨김 */
	header .global_nav{display:none;}
	/* 2019-08-27 [김남민] My통계로 > 지자체 헤더 숨김 END */
</style>
</c:if>
<c:if test="${type == 'lnb'}">
<style>
	/* SGIS메뉴영역 제거 */
	header {height:10px; width:100%;}
	.headerEtc, .gnb, .headerContents form{display:none;}
	.headerContents h1{height:10px;}
	.headerContents h1 img{display: none;}
	.containerBox{height: calc(100% - 10px) !important; top: 10px !important;}
	.searchArea{display: none;}
	
	/* 전체 화면 확대 버튼 제거 */
	#btnList_1 .tb_sizing{display:none;}
	#btnList_2 .tb_sizing{display:none;}
	#btnList_3 .tb_sizing{display:none;}
	
	/* 2019-08-27 [김남민] My통계로 > 지자체 헤더 숨김 START */
	/* My통계로 숨김 */
	header .global_nav{display:none;}
	/* 2019-08-27 [김남민] My통계로 > 지자체 헤더 숨김 END */
</style>
</c:if>
<!-- 2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. END -->

<!-- 일자리 통계분석 탭 분기 -->
<c:set var="gvMenuIndex" value="-1" />
<c:choose>
	<c:when test="${mode == 'main'}">
		<c:set var="gvMenuIndex" value="-1" />
	</c:when>
	<c:when test="${mode == 'index'}">
		<c:set var="gvMenuIndex" value="-1" />
	</c:when>
	<c:when test="${mode == 'todayStatus'}">
		<c:set var="gvMenuIndex" value="0" />
	</c:when>
	<c:when test="${mode == 'viewJobs'}">
		<c:set var="gvMenuIndex" value="1" />
	</c:when>
	<c:when test="${mode == 'myNeighberhoodJob'}">
		<c:set var="gvMenuIndex" value="111" />
	</c:when>
	<c:when test="${mode == 'statusAnls'}">
		<c:set var="gvMenuIndex" value="2" />
	</c:when>
	<c:when test="${mode == 'statsAnls'}">
		<c:set var="gvMenuIndex" value="3" />
	</c:when>
	<c:otherwise>
		<c:set var="gvMenuIndex" value="-1" />
	</c:otherwise>
</c:choose>
<!-- 청사 개발서버용인지 여부 -->
<c:set var="gvIsDevTest" value="N" />
<c:if test="${is_dev_test != null}">
	<c:set var="gvIsDevTest" value="${is_dev_test}" />
</c:if>

<div>
	<input type="hidden" value='<c:out value="${gvMenuIndex}"/>' id="wrmMenuIndex"/>
	<input type="hidden" value='<c:out value="${gvIsDevTest}"/>' id="wrmIsDevTest"/>
	<!-- 스킵네비게이션 -->
	<div class="accNav">
		<p><a href="#gnb">주메뉴 바로가기</a></p>
		<p><a href="#container">본문 바로가기</a></p>
	</div>
	<!-- 스킵네비게이션 -->

	<!--wrap-->
	<div id="wrap">
		<header>
			<jsp:include page="/view/common/includeSearch"></jsp:include><!-- 우리동네,정책통계 소스 - 2018.09.01	ywKim	추가 [v180901] -->
			<!--<div class="util"></div>--><!-- New Design - 2018.09.01	ywKim	주석 [v180901] -->
		</header>
		<!-- <hr class="hidden" /> --><!-- New Design - 2018.09.01	ywKim	주석 [v180901] -->
		
		<!--contents-->
		<div class="containerBox" style="z-index: 1;"><!-- 지도영역 아래에 workRoad 영역을 추가해서 지도의 툴바가 안 보임 -->
			
			<!-- 지   도 -->
			<div class="rela" id="wrmMapArea"><!-- id추가 - 2018.09.18	ywKim	변경 [v180901] -->


			</div>




<%-- 	    	<a href="javascript:void(0)" class="sideQuick sq01_01" id="demand" data-title="일자리 맵 메뉴" data-left="115px" tabindex="93" style="left: 0px; top: 0px;">
	    		<span>일자리 맵 메뉴</span>
	    		<img src="/images/workRoad/ico/ico_totalmenu.gif" alt="전체메뉴" />
	    	</a>
  				
			<div class="leftArea" id="divMenu" data-comment="메뉴(좌)">
				<jsp:include page="/view/workRoad/workRoadLeftMenu"></jsp:include>
			</div>
			<div class="leftArea" id="divSubMenu" data-comment="서브메뉴(좌)">
			</div> --%>
	    	
	    	<div id="dataBoard">
				<%-- <jsp:include page="/view/map/policyStaticMapDataBoard"></jsp:include> --%>
			</div>
      		<div class="deem" style="display: none;"></div> 
      			
      			<!-- 2017.09.07 [개발팀] 융합기능개발 START  -->
	    	<!-- 융합팝업창 -->
	    	<%-- <div class="combineMap" style="display:none;">
				<jsp:include page="/view/map/policyStaticCombineMap"/>
	    	</div> --%>
	    	<!-- 2017.09.07 [개발팀] 융합기능개발 END -->
	    	
	    	
			    	
			    	
			    	
			    	
			    	
			    	
			<!-- 전송데이터 관리 S -->
			<%-- <div id="lbdmsPopup" class="FuseResult_Layer" style="display: none;">
				<div class="FuseResult">
					<h3>전송데이터 관리</h3>
					<button id="lbdmsClosePopup" class="btn_close" type="button">창닫기</button>

					<!-- 검색 및 결과 S -->
					<div class="ContArea">
						<!-- Search S -->
						<fieldset class="ListSearch">
							<!-- 2017.12.12 [개발팀] 접근성 -->
							<label for="data_from">공개일자 : </label>
							<input type="text" id="data_from" class="inp" title="공개범위최소" style="width:130px;"> ~
							<input type="text" id="data_to" class="inp" title="공개범위최대" style="width:130px;margin-right:50px;"> 
							<label for="data_nm">서비스명 : </label>
							<input type="text" id="data_nm" class="inp" title="서비스명" style="width:250px;"/>
							<button id="data_search" type="button" class="searchBtn">검색</button>
						</fieldset>
						<!-- Search E -->
						<!-- List S -->
						<table class="TB_02" style="table-layout:auto;">
							<caption>LBDMS 전송데이터 목록</caption>
							<colgroup>
	                            <col style="width:40px;"><!-- checkbox -->
	                            <col style="width:90px;"><!-- 순번 -->
	                            <col style="width:120px;"><!-- 공개일자 -->
	                            <col style="width:auto;"><!-- 공개데이터명 -->
	                            <col style="width:100px;"><!-- 공개기관명 -->
	                            <col style="width:100px;"><!-- 사용자명 -->
	                            <col style="width:50px;"><!-- 유형 -->
	                            <col style="width:220px;"><!-- 서비스명 -->
	                            <col style="width:150px;"><!-- 분야 -->
	                            <col style="width:70px;"><!-- 공개여부 -->
                            </colgroup>
							<thead>
								<tr>
									<th scope="col"><input type="checkbox" id="allChk" title="전체선택"><label for="allChk">전체선택</label></th>
									<th scope="col">순번</th>
									<th scope="col">공개일자</th>
									<th scope="col">공개데이터명</th>
									<th scope="col">공개기관명</th>
									<th scope="col">사용자명</th>
									<th scope="col">유형</th>
									<th scope="col">서비스명</th>
									<th scope="col">분야</th>
									<th scope="col">공개여부</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
						<!-- List E -->
						<div id="page" class="pagenation1" style="padding-top:0px;">
							<span class="pages"></span>
						</div>

						<div class="Btn_Group">
							<button type="button" id="DataDelete" onclick="javascript:$policyStaticMapDataManagement.ui.doDeleteData();">선택삭제</button>
							<button type="button" id="DataOpen" onclick="javascript:$policyStaticMapDataManagement.ui.doOpenData();">선택 공개/비공개</button>
						</div>

					</div>
					<!-- 검색 및 결과 E -->


				</div>
				<!-- FuseResult -->
			</div> --%>
			<!-- 전송데이터 관리 E -->

			
			<!-- 갤러리 등록 및 즐겨찾기 -->
			<%-- <jsp:include page="/view/map/gallaryDialog"></jsp:include> --%>
			
			
			<!-- ( mask ) -->
       		<!-- <div class="deem" style="display: none;"></div> --> 
     		<!-- ( mask ) -->				
			
			
			
			
			
			<!-- 사용자 영역 (동적 생성 영역) -->
<!-- 			<div id="divContents">
			
			</div> -->
			
		</div>
		<!--//container-->
		
	    <footer id="footer" data-comment="footer">
	    	<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom/hidden"></jsp:include>
	    </footer>
		
	</div>
	<!--//wrap-->

</div>

<!-- New Design -->
<link rel="stylesheet" type="text/css" href="/css/workRoad/common.css">
<link rel="stylesheet" type="text/css" href="/css/workRoad/default.css">
<link rel="stylesheet" type="text/css" href="/css/workRoad/popup.css">
<link rel="stylesheet" type="text/css" href="/css/workRoad/wrmCommon.css">
<link rel="stylesheet" type="text/css" href="/css/workRoad/wrmTodayStatus.css">
<link rel="stylesheet" type="text/css" href="/css/workRoad/wrmViewJobs.css">
<link rel="stylesheet" type="text/css" href="/css/workRoad/wrmStatusAnls.css">
<link rel="stylesheet" type="text/css" href="/css/workRoad/wrmStatsAnls.css">

<div class="workRoad">

	<div id="wrap">
		<!--contents-->
		<div class="containerBox">
			<div class="rela">
<!-- 				<div class="sceneBox">
					<div class="sceneRela">
						<div class="toolBar clearfix">
							<h2>일자리 맵</h2>
							<div class="viewTitle"> </div>
							현재위치 네비게이션
							현재위치 네비게이션 end
							튜토리얼
							가로툴바
							가로툴바 end
						</div>
						도움말
						<div class="interactiveBar">
							<h3 class="h3" id="wrmTitle">오늘의 구인 현황</h3>
						</div>
						분석지도 맵 컨텐츠 시작
						<div class="mapContents" style="position: relative;">
						</div>
					</div>End of sceneRela
				</div>End of sceneBox -->
				
				
				<a href="javascript:void(0)" class="sideQuick sq02" id="wrmMenuSwitch" tabindex="97">
					<span>일자리 맵 메뉴</span><img src="../../images/workRoad/ico_totalmenu.gif" alt="일자리 맵 메뉴"/>
				</a>
<!-- 				
				<div class="toolBar clearfix">
				</div>
				
				<div class="interactiveBar">
					<h3 class="h3" id="wrmTitle">오늘의 구인 현황</h3>
				</div>
 -->	
				<div class="leftArea" id="divMenu">
					<jsp:include page="/view/workRoad/workRoadLeftMenu"></jsp:include>
				</div>
				
				<div class="leftArea" id="divSubMenu">
				</div>

				<!-- 사용자 영역 (동적 생성 영역) -->
				<div id="divContents">
				
				</div>
			</div><!-- End of rela -->
			
<!-- 	    	<a href="javascript:void(0)" class="sideQuick sq01_01" id="demand" data-title="일자리 맵 메뉴" data-left="115px" tabindex="93" style="left: 0px; top: 0px;">
	    		<span>일자리 맵 메뉴</span>
	    		<img src="/images/workRoad/ico/ico_totalmenu.gif" alt="전체메뉴" />
	    	</a>
 -->  				
<%-- 			<div class="leftArea" id="divMenu" data-comment="메뉴(좌)">
				<jsp:include page="/view/workRoad/workRoadLeftMenu"></jsp:include>
			</div>
			<div class="leftArea" id="divSubMenu" data-comment="서브메뉴(좌)">
			</div>
 --%>			
			<!-- 사용자 영역 (동적 생성 영역) -->
			<!-- <div id="divContents">
			
			</div> -->
			
		</div>
	</div>
</div>
	
<jsp:include page="/view/workRoad/workRoadLoading"></jsp:include>
<jsp:include page="/view/workRoad/workRoadFooter"></jsp:include>	



        <!-- 20190417 mng_s 이금은 -->   
        <div class="tutorialWrapper" style= "display: none" draggable="false">
            <button type="button" id="tuto_start_btn_2" style="border-radius: 1000px; background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 26px; width: 95px; right: 218px; top:104px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="closeTutorial();" title="튜토리얼 종료">튜토리얼 종료</button>
            <div id="headerTutorial" style="width:100%; height:135px; z-index:40000;" draggable="false">
                <div id="tutorialText" draggable="false">
                    <img id="tuto_end_btn" src="/img/tutorial/tuto_end_btn_01.png" alt="튜토리얼종료" style="float: right; position: relative; width:13px; height:13px; top: 10px; left: -10px;  opacity:10.6; cursor:pointer; text-indent:-2000px; z-index:40999;" onclick="closeTutorial();" draggable="false">
                </div>
            </div>

            <img id="img_top1"              src="/img/tutorial/workRoad/img_top1.png"           alt="첫메뉴"             draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="img_top2"              src="/img/tutorial/workRoad/img_top2.png"           alt="첫메뉴"             draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="img_top_11"            src="/img/tutorial/workRoad/img_top_11.png"         alt="상단메뉴1"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="menu_left_1_1"         src="/img/tutorial/workRoad/menu_left_1_1.png"      alt="좌측메뉴1"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="img_top_12"            src="/img/tutorial/workRoad/img_top_12.png"         alt="상단메뉴2"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="menu_left_1_2"         src="/img/tutorial/workRoad/menu_left_1_2.png"      alt="좌측메뉴2"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="img_top_13"            src="/img/tutorial/workRoad/img_top_13.png"         alt="상단메뉴3"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="menu_left_1_3"         src="/img/tutorial/workRoad/menu_left_1_3.png"      alt="좌측메뉴3"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="img_top_14"            src="/img/tutorial/workRoad/img_top_14.png"         alt="상단메뉴4"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="menu_left_1_4"         src="/img/tutorial/workRoad/menu_left_1_4.png"      alt="좌측메뉴4"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="img_top_01"            src="/img/tutorial/workRoad/img_top_01.png"         alt="창확대버튼"         draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="img_top_databoard"     src="/img/tutorial/workRoad/img_top_databoard.png"  alt="데이터보드"         draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="subMenu20"             src="/img/tutorial/workRoad/2_subMenu0.png"         alt="2부메뉴"            draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="subMenu21"             src="/img/tutorial/workRoad/2_subMenu1.png"         alt="2부메뉴"            draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="img_legend"            src="/img/tutorial/workRoad/img_legend.png"         alt="범례"               draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">

            <img id="map_0_1"               src="/img/tutorial/workRoad/map_0_1.png"            alt="첫화면"            draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="img_main_pop"          src="/img/tutorial/workRoad/img_main_pop.png"       alt="main팝업"          draggable="false" style="display:none; position:relative; top:1px; left:1px; cursor:pointer;">

            <img id="map_1_1"               src="/img/tutorial/workRoad/map_1_1.png"            alt="오늘의구인현황"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_1_2"               src="/img/tutorial/workRoad/map_1_2.png"            alt="오늘의구인현황"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_1_3"               src="/img/tutorial/workRoad/map_1_3.png"            alt="오늘의구인현황"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_1_4"               src="/img/tutorial/workRoad/map_1_4.png"            alt="오늘의구인현황"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="1_subMenu_1"           src="/img/tutorial/workRoad/1_subMenu_1.png"        alt="서브메뉴"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="1_subMenu_2"           src="/img/tutorial/workRoad/1_subMenu_2.png"        alt="서브메뉴"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="1_subMenu_3"           src="/img/tutorial/workRoad/1_subMenu_3.png"        alt="서브메뉴"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="1_subMenu_4"           src="/img/tutorial/workRoad/1_subMenu_4.png"        alt="서브메뉴"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="1_subMenu_5"           src="/img/tutorial/workRoad/1_subMenu_5.png"        alt="서브메뉴"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="1_databoard_1"         src="/img/tutorial/workRoad/1_databoard_1.png"      alt="데이터보드"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="1_databoard_2"         src="/img/tutorial/workRoad/1_databoard_2.png"      alt="데이터보드"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="1_databoard_3"         src="/img/tutorial/workRoad/1_databoard_3.png"      alt="데이터보드"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="1_img_1"               src="/img/tutorial/workRoad/1_img_1.png"            alt="대전 유성구"       draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">

            <img id="map_2_0"               src="/img/tutorial/workRoad/map_2_0.png"            alt="일자리보기"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_2_1"               src="/img/tutorial/workRoad/map_2_1.png"            alt="일자리보기"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_2_2"               src="/img/tutorial/workRoad/map_2_2.png"            alt="일자리보기"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_2_3"               src="/img/tutorial/workRoad/map_2_3.png"            alt="일자리보기"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_2_4"               src="/img/tutorial/workRoad/map_2_4.png"            alt="일자리보기"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_2_5"               src="/img/tutorial/workRoad/map_2_5.png"            alt="일자리보기"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_2_btn1"            src="/img/tutorial/workRoad/map_2_btn1.png"         alt="대전광역시 서구"   draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_2_5_databoard1"    src="/img/tutorial/workRoad/map_2_5_databoard1.png" alt="데이터보드"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_2_5_img1"          src="/img/tutorial/workRoad/map_2_5_img1.png"       alt="원구인정보"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 2px outset black;">
            <img id="map_2_6"               src="/img/tutorial/workRoad/map_2_6.png"            alt="일자리보기"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="2_subMenu1"            src="/img/tutorial/workRoad/2_subMenu1.png"         alt="서브메뉴"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="2_subMenu2"            src="/img/tutorial/workRoad/2_subMenu2.png"         alt="서브메뉴"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="2_subMenu3"            src="/img/tutorial/workRoad/2_subMenu3.png"         alt="서브메뉴"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="2_databoard1"          src="/img/tutorial/workRoad/2_databoard1.png"       alt="데이터보드"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="2_databoard2"          src="/img/tutorial/workRoad/2_databoard2.png"       alt="데이터보드"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="2_btn_8"               src="/img/tutorial/workRoad/2_btn_8.png"            alt="경계표시(시도)"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="2_btn_9"               src="/img/tutorial/workRoad/2_btn_9.png"            alt="경계표시(읍면동)"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="2_btn_9_on"            src="/img/tutorial/workRoad/2_btn_9_on.png"         alt="확대"              draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="2_pop_01"               src="/img/tutorial/workRoad/2_pop_01.png"          alt="희망지역"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="2_pop_02"               src="/img/tutorial/workRoad/2_pop_02.png"          alt="희망지역"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="2_pop_03"               src="/img/tutorial/workRoad/2_pop_03.png"          alt="희망지역"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="2_pop_04"               src="/img/tutorial/workRoad/2_pop_04.png"          alt="희망지역"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="2_pop_05"               src="/img/tutorial/workRoad/2_pop_05.png"          alt="희망지역"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="2_pop_b1"               src="/img/tutorial/workRoad/2_pop_b1.png"          alt="하단버튼"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">

            <img id="map_3_1"               src="/img/tutorial/workRoad/map_3_1.png"            alt="구인현황분석"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_3_2"               src="/img/tutorial/workRoad/map_3_2.png"            alt="구인현황분석"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_3_3"               src="/img/tutorial/workRoad/map_3_3.png"            alt="구인현황분석"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_3_4"               src="/img/tutorial/workRoad/map_3_4.png"            alt="구인현황분석"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="3_subMenu_1"           src="/img/tutorial/workRoad/3_subMenu_1.png"        alt="서브메뉴"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="3_subMenu_2"           src="/img/tutorial/workRoad/3_subMenu_2.png"        alt="서브메뉴"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="3_subMenu_b1"          src="/img/tutorial/workRoad/3_subMenu_b1.png"       alt="서브메뉴하단bar"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="3_subMenu_b2"          src="/img/tutorial/workRoad/3_subMenu_b2.png"       alt="서브메뉴하단bar"  draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="3_subMenu_4"           src="/img/tutorial/workRoad/3_subMenu_4.png"        alt="서브메뉴"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="3_subMenu_5"           src="/img/tutorial/workRoad/3_subMenu_5.png"        alt="서브메뉴"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="3_databoard_1"         src="/img/tutorial/workRoad/3_databoard_1.png"      alt="데이터보드"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="3_databoard_2"         src="/img/tutorial/workRoad/3_databoard_2.png"      alt="데이터보드"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="3_tooltip_0"           src="/img/tutorial/workRoad/3_tooltip_0.png"        alt="툴팁"              draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="3_tooltip_1"           src="/img/tutorial/workRoad/3_tooltip_1.png"        alt="툴팁"              draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">

            <img id="map_4_1"               src="/img/tutorial/workRoad/map_4_1.png"            alt="일자리통계분석"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_4_2"               src="/img/tutorial/workRoad/map_4_2.png"            alt="일자리통계분석"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_4_3"               src="/img/tutorial/workRoad/map_4_3.png"            alt="일자리통계분석"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="map_4_4"               src="/img/tutorial/workRoad/map_4_4.png"            alt="일자리통계분석"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="4_left_2_1"            src="/img/tutorial/workRoad/4_left_2_1.png"         alt="좌측메뉴41"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="4_subMenu_1"           src="/img/tutorial/workRoad/4_subMenu_1.png"        alt="서브메뉴"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="4_subMenu_2"           src="/img/tutorial/workRoad/4_subMenu_2.png"        alt="서브메뉴"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="4_subMenu_3"           src="/img/tutorial/workRoad/4_subMenu_3.png"        alt="서브메뉴"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="4_pop_1"               src="/img/tutorial/workRoad/4_pop_1.png"            alt="팝업메뉴"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="4_pop_2"               src="/img/tutorial/workRoad/4_pop_2.png"            alt="팝업메뉴"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="4_pop_3"               src="/img/tutorial/workRoad/4_pop_3.png"            alt="팝업메뉴"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="4_databoard_1"         src="/img/tutorial/workRoad/4_databoard_1.png"      alt="데이터보드"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="4_databoard_2"         src="/img/tutorial/workRoad/4_databoard_2.png"      alt="데이터보드"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="4_databoard_3"         src="/img/tutorial/workRoad/4_databoard_3.png"      alt="데이터보드"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="4_subMenu_srollbar"    src="/img/tutorial/workRoad/4_subMenu_srollbar.png" alt="스크롤바"          draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">
            <img id="4_tooltip_0"           src="/img/tutorial/workRoad/4_tooltip_0.png"        alt="툴팁"              draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="4_tooltip_1"           src="/img/tutorial/workRoad/4_tooltip_1.png"        alt="툴팁"              draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">

            <img id="btn_01"     src="/img/tutorial/workRoad/btn_01.png"     alt="일자리보기"     draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;" class="">
            <img id="btn_02"     src="/img/tutorial/workRoad/btn_02.png"     alt="일자리보기"     draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;" class="">
            <img id="btn_03"     src="/img/tutorial/workRoad/btn_03.png"     alt="강원도POI"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_04"     src="/img/tutorial/workRoad/btn_04.png"     alt="희망지역"       draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="2_btn_06"   src="/img/tutorial/workRoad/2_btn_06.png"   alt="전체"		      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="2_btn_07"   src="/img/tutorial/workRoad/2_btn_07.png"   alt="대전광역시"     draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="2_btn_08"   src="/img/tutorial/workRoad/2_btn_08.png"   alt="전체"           draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="2_btn_09"   src="/img/tutorial/workRoad/2_btn_09.png"   alt="서구"           draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="2_btn_10"   src="/img/tutorial/workRoad/2_btn_10.png"   alt="검색"           draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_06"     src="/img/tutorial/workRoad/btn_06.png"     alt="상세및통계보기" draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_07"     src="/img/tutorial/workRoad/btn_07.png"     alt="닫기"           draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_08"     src="/img/tutorial/workRoad/btn_08.png"     alt="닫기"           draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_09"     src="/img/tutorial/workRoad/btn_09.png"     alt="확대"           draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_10"     src="/img/tutorial/workRoad/btn_10.png"     alt="구인업체툴팁"   draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_11"     src="/img/tutorial/workRoad/btn_11.png"     alt="원구인정보"     draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_12"     src="/img/tutorial/workRoad/btn_12.png"     alt="오늘의구인현황" draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_13"     src="/img/tutorial/workRoad/btn_13.png"     alt="시도선택"       draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_14"     src="/img/tutorial/workRoad/btn_14.png"     alt="대전광역시"     draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_15"     src="/img/tutorial/workRoad/btn_15.png"     alt="꺽은선포인트"   draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_16"     src="/img/tutorial/workRoad/btn_16.png"     alt="꺽은선포인트"   draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_17"     src="/img/tutorial/workRoad/btn_17.png"     alt="데이터보드"     draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_18"     src="/img/tutorial/workRoad/btn_18.png"     alt="서구-막대"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_19"     src="/img/tutorial/workRoad/btn_19.png"     alt="표"             draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_20"     src="/img/tutorial/workRoad/btn_20.png"     alt="구인현황분석"   draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_21"     src="/img/tutorial/workRoad/btn_21.png"     alt="구인수"         draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_22"     src="/img/tutorial/workRoad/btn_22.png"     alt="업종별수"       draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_23"     src="/img/tutorial/workRoad/btn_23.png"     alt="통계보기"       draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_24"     src="/img/tutorial/workRoad/btn_24.png"     alt="통계표출off"    draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_25"     src="/img/tutorial/workRoad/btn_25.png"     alt="데이터보드"     draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_26"     src="/img/tutorial/workRoad/btn_26.png"     alt="충남-막대"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_27"     src="/img/tutorial/workRoad/btn_27.png"     alt="일자리통계분석" draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_28"     src="/img/tutorial/workRoad/btn_28.png"     alt="취업자수"       draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_29"     src="/img/tutorial/workRoad/btn_29.png"     alt="조회"           draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_30"     src="/img/tutorial/workRoad/btn_30.png"     alt="데이터보드"     draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_31"     src="/img/tutorial/workRoad/btn_31.png"     alt="대전-막대"      draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_32"     src="/img/tutorial/workRoad/btn_32.png"     alt="일자리현황"     draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_33"     src="/img/tutorial/workRoad/btn_33.png"     alt="취업자수"       draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_34"     src="/img/tutorial/workRoad/btn_34.png"     alt="이동막대"       draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_35"     src="/img/tutorial/workRoad/btn_35.png"     alt="연령별"         draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_36"     src="/img/tutorial/workRoad/btn_36.png"     alt="40~49세"        draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_37"     src="/img/tutorial/workRoad/btn_37.png"     alt="조회"           draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            
            <img id="btn_marker" src="/img/tutorial/workRoad/btn_marker.png" alt="구인업체마커"   draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_blank"  src="/img/tutorial/workRoad/btn_blank.png"  alt="빈칸"           draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer; border: 3px outset red;">
            <img id="btn_white"  src="/img/tutorial/workRoad/btn_white.png"  alt="흰칸"           draggable="false" style="display:none; position:absolute; top:1px; left:1px; cursor:pointer;">

            <img id="toPoint_1"  src="/img/tutorial/toPoint_1.png"           alt="포인터"         draggable="false">
            <img id="toPoint_2"  src="/img/tutorial/toPoint_2.png"           alt="포인터"         draggable="false">
            <img id="toPoint_3"  src="/img/tutorial/toPoint_3.png"           alt="포인터"         draggable="false">
            <img id="toPoint_4"  src="/img/tutorial/toPoint_4.png"           alt="포인터"         draggable="false">
        </div>
        <!-- 20190417 mng_e 이금은 -->
        
<!-- 2019.11.05[한광희] 내주변 일자리 > 생활환경 종합 > 지표설명 버튼 클릭시 popup css 및 jsp 인클루드 START -->
<style>
   /* 지표현황 */
   .House_Index_Info { position:fixed; width:100%; height:100%; z-index:10000; top:0;box-sizing:border-box; min-width:900px;}
   .House_Index_Info .Blackbg { position:fixed; width:100%; height:100%; background:#000; opacity:0.5;}
   .House_Index_Info .ContBox { position:absolute; width:95%; width:calc(100% - 40px); height:95%; height:calc(100% - 40px); background:#fff; box-sizing:border-box; left:20px; top:20px; z-index:10001; padding:20px; border-radius:10px; overflow:auto;}
   .House_Index_Info .ContBox .BtnClose { position:absolute; right:15px; top:15px; background:url(../../img/house/icon_index_close.png) no-repeat left top; display:block; width:16px; height:16px; text-indent:-1000px; overflow:hidden; }
   .House_Index_Info .ContBox h1 {font-weight:normal; font-family:"나눔고딕B";  font-size:18px; color:#333; background:url(../../img/house/icon_index_title.png) no-repeat left 3px; padding-left:25px; padding-bottom:5px; margin-bottom:15px; } 
   .House_Index_Info .ContBox .Tab { overflow:auto; margin-bottom:20px;}
   .House_Index_Info .ContBox .Tab li { float:left; width:14%;}
   .House_Index_Info .ContBox .Tab li:first-child { width:15%;}
   .House_Index_Info .ContBox .Tab li:last-child { width:15%;}
   .House_Index_Info .ContBox .Tab li a { display:block; text-align:center; border:#ccc solid 1px; border-left:none; padding-top:8px; background:#f2f2f2; font-size:14px; height:36px; box-sizing:border-box;}
   
   .House_Index_Info .ContBox .Tab li:first-child a { border-left:#ccc solid 1px; border-top-left-radius:5px;border-bottom-left-radius:5px; }
   .House_Index_Info .ContBox .Tab li:last-child a { border-top-right-radius:5px;border-bottom-right-radius:5px; }
   .House_Index_Info .ContBox .Tab li a.M_on {background:#fff; font-family:"나눔고딕B"; background:#036; color:#fff;padding-top:7px; border:none; position:relative;}
   
   .House_Index_Info .ContBox table { width:100%; width:calc(100% - 40px); height:calc(100% - 130px); border-collapse:collapse; position:absolute; left:20px; top:110px; }
   .House_Index_Info .ContBox table thead { height:34px; position:relative;}
   .House_Index_Info .ContBox table thead th { background:#369; color:#fff; font-weight:bold; text-align:center; padding:10px; font-family:dutum,"돋움",sans-serif; font-size:12px; box-sizing:border-box; white-space:nowrap; position:relative;}
   .House_Index_Info .ContBox table thead th:before { content:''; display:block; width:1px; height:15px; background:#fff; position:absolute; left:0; top:9px; opacity:0.5;}
   
   .House_Index_Info .ContBox table thead th:first-child:before { width:0; height:0;}
   .House_Index_Info .ContBox table tbody {width:100%; max-height:calc(100% - 34px);overflow-y:auto;position:absolute; left:0px; top:34px; border-bottom:#ddd solid 1px; }
   .House_Index_Info .ContBox table tbody td { border-left: #ddd solid 1px;border-bottom:#ddd solid 1px; padding:10px; font-family:dutum,"돋움",sans-serif; font-size:12px; box-sizing:border-box; line-height:1.8;/* word-break: keep-all; */ }
   .House_Index_Info .ContBox table tbody tr:last-child td { border-bottom:none;}
   
   .House_Index_Info .ContBox table thead th:first-child { border-left:none; width:125px;  }
   .House_Index_Info .ContBox table thead th:nth-child(2) { width:130px; }
   .House_Index_Info .ContBox table thead th:nth-child(3) { width:100px; }
   .House_Index_Info .ContBox table thead th:nth-child(4) { width:130px; }
   .House_Index_Info .ContBox table thead th:nth-child(5) { width:140px; }
   .House_Index_Info .ContBox table thead th:nth-child(6) { width:auto; }
   .House_Index_Info .ContBox table tbody td:first-child { border-left:none;text-align:center; width:125px;}
   .House_Index_Info .ContBox table tbody td:nth-child(2) { width: 130px; text-align:center;}
   .House_Index_Info .ContBox table tbody td:nth-child(3) { width: 100px; text-align:center; }
   .House_Index_Info .ContBox table tbody td:nth-child(4) { width: 130px; text-align:center; }
   .House_Index_Info .ContBox table tbody td:nth-child(5) { width: 140px; text-align:center; }
   .House_Index_Info .ContBox table tbody td:nth-child(6) { width:auto; }
   
   @media only all and (min-width:1300px) {
      .House_Index_Info .ContBox { width:1260px; left:50%; margin-left:-630px;}
   }
</style>   
<jsp:include page="/view/house/helper/indicator"></jsp:include>
<!-- 2019.11.05[한광희] 내주변 일자리 > 생활환경 종합 > 지표설명 버튼 클릭시 popup css 및 jsp 인클루드 END -->