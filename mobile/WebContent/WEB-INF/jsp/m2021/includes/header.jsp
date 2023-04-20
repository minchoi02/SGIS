<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<%@page contentType="text/html; charset=UTF-8" %>
<script>
$(document).ready(function(){
	
	// 메뉴 선택에 따른 class 수정
	if($('meta[name="title"]').attr("content") == "My통계로(路)"){	// 2020.09.16[한광희] My통계로 명칭 변경
		$("#header").attr("class", "header00");
	} else if($('meta[name="title"]').attr("content") == "일자리 맵"){
		$("#header").attr("class", "header01");
	} else if($('meta[name="title"]').attr("content") == "내 주변 통계"){
		$("#header").attr("class", "header02");
	} else if($('meta[name="title"]').attr("content") == "통계주제도"){
		$("#header").attr("class", "header03");
	} else if($('meta[name="title"]').attr("content") == "살고싶은 우리동네"){
		$("#header").attr("class", "header04");
	} else if($('meta[name="title"]').attr("content") == "지역현안 소통지도"){
		$("#header").attr("class", "header05");
	} else if($('meta[name="title"]').attr("content") == "알림마당"){
		$("#header").attr("class", "header06");
	} /* <!-- SGIS4_생활권역_모바일 기본 세팅 START --> */
	  else if($('meta[name="title"]').attr("content") == "생활권역 통계지도"){
		$("#header").attr("class", "header06");
	}
	/* <!-- SGIS4_생활권역_모바일 기본 세팅 END --> */
	else {
		$("#header").attr("class", "header");
	};
	
	$("#menu-close-button").trigger('click');
});
</script>
<!--메인메뉴 네비게이션 팝업. START -->
<div id="menu-popup">
	<aside id="lnbWrap" style="z-index: 99999; position: fixed; bottom:0; overflow: auto;"> <!-- 지역현안 소통지도 z-index값으로 네비게이션 팝업이 뒤에 위치하는 문제로 aside에 z-index 추가 20200708 박은식 -->
		<h3>전체메뉴</h3>
		<div class="aside_menu_wrap">
			<div class="aside_menu">
		        <nav>
		          <ul>
            			<li class="menu01"><a href="${ctx }/m2020/map/statsMe/statsMeMap.sgis"  onclick="srvLogWrite('O0', '01', '01', '03', '', '');">My통계로(路)</a></li>
            			<!-- SGIS4_생활권역_모바일 기본 세팅 START -->
            			<li class="menu08"><a href="${ctx }/m2021/map/catchmentareaMap.sgis"  onclick="srvLogWrite('O0', '01', '01', '03', '', '');">생활권역</a></li>
            			<!-- SGIS4_생활권역_모바일 기본 세팅 END -->
			            <li class="menu02"><a href="${ctx }/m2020/map/workroad/myNeighberhoodJobMap.sgis?todaystatus_pop_yn=Y" onclick="srvLogWrite('O0', '01', '01', '04', '', '');">일자리맵</a></li>
			            <li class="menu03"><a href="${ctx }/m2020/map/current/currentMap.sgis"  onclick="srvLogWrite('O0', '01', '01', '05', '', '');">내주변통계</a></li>
			            <li class="menu04"><a href="${ctx }/m2020/map/thematic/thematicMap.sgis"  onclick="srvLogWrite('O0', '01', '01', '06', '', '');">통계주제도</a></li>
			            <li class="menu05"><a href="${ctx }/m2020/map/house/recomendHouseMap.sgis" onclick="srvLogWrite('O0', '01', '01', '07', '', '');">살고싶은 우리동네</a></li>
			            <li class="menu06"><a href="${ctx }/m2020/map/community/communityMap.sgis" onclick="srvLogWrite('O0', '01', '01', '08', '', '');">지역현안 소통지도</a></li>
			            <li class="menu07"><a href="${ctx }/m2020/map/board/introduction.sgis" onclick="srvLogWrite('O0', '01', '01', '09', '', '');">알림마당</a></li>
		          </ul>
		        </nav>
		    </div>
		</div>
		<div class="footer">
	    	<div class="mt30"></div>
	      	<button type="button" class="pcBtn" name="button" onclick="javascript:movePcMode();srvLogWrite('O0', '02', '13', '01', 'PC버전 가기', '');">PC버전 가기</button>
	      	<div class="mt30"></div>
	      		<p class="copyright">ⓒStatistics Korea. All rights reserved.</p>
	    	</div>
    	<button id="menu-close-button" class="btn_menuClose" type="button"><img src="${ctx }/resources/m2020/images/common/btn_close.png" alt="전체메뉴 닫기"></button> <!-- 2020.09.11 [신예리] 웹접근성 문제로 수정 -->
	</aside>
</div> 

<!--메인메뉴 네비게이션 팝업. END -->
<div class="sub_Wrap">
	<div class="sub_header">
		<header class="header" id="header">
			<button id="menu-open-button" class="s_menuBtn" type="button"><img src="${ctx }/resources/m2020/images/common/s_menubtn.png" alt="전체 메뉴 열기 버튼"></button> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
			<h2>${metaTitle }</h2>
			<button id="home-open-button" class="homeBtn" type="button" onclick="javascript:srvLogWrite('O0', '01', '01', '11', '', '');location.href='${ctx }/index.jsp'"><img src="${ctx }/resources/m2020/images/common/home.png" alt="메인 화면으로 이동 버튼"></button> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
		</header>
	</div>
</div>
<script>
$("#menu-open-button").click(function(){
	//srvLogWrite('O0', '01', '01', '01', '', '');
	$('#lnbWrap').addClass("open");
	$("#menu-popup").show().animate({
		left: 0
	},500,function(){
		$(".Content").css({
			"height": "100%",
			"max-height": "100%",
			"min-height": $("#menu-popup").outerHeight(true),
			"overflow":"hidden"
		});
	});
});
$("#menu-close-button").click(function(){
	//srvLogWrite('O0', '01', '01', '02', '', '');
	$('#lnbWrap').removeClass("open");
	$("#menu-popup").animate({
		left: -300
	},500,function(){
		$("#menu-popup").hide();
	});
	$('#lnbWrap').removeClass("open");
});
$("#menu-background").click(function(){
	$('#lnbWrap').removeClass("open");
});

// PC 버전 가기
function movePcMode(){
	location.href = "${sgisCtx }/view/index?param=0";
}
</script>