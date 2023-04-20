<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<%@page contentType="text/html; charset=UTF-8" %>
<script>

$(document).ready(function(){
	var curPage = document.location.href;
	//sitemesh에서 header 제외할 url 추가
	var matchStr = "service01.sgis";
	var matchStr2 = "service02.sgis";
	var matchStr3 = "community";
	
	if(curPage.match(matchStr)||curPage.match(matchStr2)){
	//	$("#headerArea").hide();  //pm님 요구에 의해 다시 추가	2017.09.27
		$("#metaTitleH2").html("<img src='${ctx }/resources/images/main/sub_logo.png' alt='SGIS로고' style='width:100px; margin-top:-10px;' />");	//header에 ICON 추가
	}else if(curPage.match(matchStr3)){
	//	$("#headerArea").hide();  //pm님 요구에 의해 다시 추가	2017.09.27
		$("#metaTitleH2").html("<a href='${ctx }/community.sgis'>지역현안 소통지도</a>");	//header에 ICON 추가 
	}
});

</script>

<header id="headerArea">
	<div class="gnb">
		<h1><a href="${ctx }/">SGIS오픈플랫폼</a></h1>
		<h2 id="metaTitleH2">${metaTitle }</h2>
		<button id="menu-open-button" class="btn_menuOpen" type="button">메뉴열기</button>
	</div>
	<div class="aside" style="height: 540px; right: -300px; display: none;">
		<!-- 2019-06-24 [김남민] 2019 모바일 메뉴 추가. START -->
		<aside style="height:100%;">
			<h3>전체메뉴</h3>
			<div class="aside_menu_wrap">
				<div class="aside_main_menu">
				  <!-- 2019.09.17[한광희] 일자리 맵 메뉴 명칭 및 위치 변경. START -->
		          <h4>일자리 맵</h4>
		          <ul>
		            <li><a href="${ctx }/m2019/workroad/myNeighberhoodJobMap.sgis">- &nbsp;내 주변 일자리</a></li>
		            <li><a href="${ctx }/m2019/workroad/todayStatusMap.sgis">- &nbsp;오늘의 구인현황</a></li>
   				    <!-- 2019.09.17[한광희] 일자리 맵 메뉴 명칭 및 위치 변경. END -->
   				    <!-- 2019.12.16[김남민] 일자리 통계정보 OPEN. START -->
		            <li><a href="${ctx }/m2019/workroad/statsAnlsMap.sgis">- &nbsp;일자리 통계정보</a></li>
		            <!-- 2019.12.16[김남민] 일자리 통계정보 OPEN. END -->
		          </ul>
		        </div>
				<div class="aside_menu">
					<nav>
						<ul>
							<li class="menu01"><a onclick="javascript:apiLogWrite2('L0', 'L01', '내주변 통계', '없음', '00', '없음');" href="${ctx }/map/current.sgis">내 주변 통계</a></li>
							<li class="menu02"><a onclick="javascript:apiLogWrite2('L0', 'L02', '통계주제도', '없음', '00', '없음');" href="${ctx }/map/thematic.sgis">통계주제도</a></li>
							<li class="menu03"><a onclick="javascript:apiLogWrite2('L0', 'L03', '대화형통계지도', '없음', '00', '없음');" href="${ctx }/map/interactive.sgis">대화형 통계지도</a></li>
							<li class="menu04"><a onclick="javascript:apiLogWrite2('L0', 'L04', '살고싶은 우리동네', '없음', '00', '없음');" href="${ctx }/map/house.sgis">살고싶은 우리동네</a></li>
							<li class="menu05"><a onclick="javascript:apiLogWrite2('L0', 'L05', '우리동네 생활업종', '없음', '00', '없음');" href="${ctx }/map/biz.sgis">우리동네 생활업종</a></li>
							<li class="menu06"><a onclick="javascript:apiLogWrite2('L0', 'L06', '지역현안 소통지도', '없음', '00', '없음');" href="${ctx }/community.sgis">지역현안 소통지도</a></li>
							<li class="menu07"><a href="${ctx }/board/introduction.sgis">알림마당</a></li>
						</ul>
					</nav>
				</div>
			</div>
			<button id="menu-close-button" class="btn_menuClose" type="button">메뉴닫기</button>
		</aside>
		<!-- 2019-06-24 [김남민] 2019 모바일 메뉴 추가. END -->
		<div class="footer" style="position:absolute; bottom:0px; width:100%; background:#666; height:35px; font-size:12px; padding:10px 0 14px 0; color:#fff;">
			<p style="text-align: center;">
			<c:choose>
			<c:when test="${loggedIn }">
				<a href="javascript:logout();" style="cursor:pointer; color:#fff; padding:5px;">로그아웃</a> |
				<a href="${ctx }/mypage.sgis" style="cursor:pointer; color:#fff; padding:5px;">마이페이지</a>
				<!-- 
				 |
				<a href="${ctx }/resources/helper/help_sgis_mobile.pdf" style="cursor:pointer; color:#fff; padding:5px;">도움말</a>
				 -->
				</c:when>
				<c:otherwise>
					<a onclick="login();"  style="cursor:pointer; color:#fff; padding:5px;">로그인</a> | 
					<a onclick="login();" style="cursor:pointer; color:#fff; padding:5px;">마이페이지</a>
					<!-- 
					 |
					<a href="${ctx }/resources/helper/help_sgis_mobile.pdf" style="cursor:pointer; color:#fff; padding:5px;">도움말</a>
					 -->
					<!--<a onclick="login('${ctx}/mypage.sgis');">마이페이지</a> |--> 
				</c:otherwise>
				</c:choose>
			</p>
			<p style="opacity:0.7; text-align:center">
			@statistics Korea. All rights reserved.
			</p>
		</div>
	</div>
	<div class="aside_back" style="display: none;"></div>
</header>
<script>
$("#common-search-button").click(function(){
	var search = function(searchText){
		if(searchText.replace(/ /,"")==""||searchText==undefined){
			messageAlert.open("알림", "검색어를 입력하세요.",function(){
				$("#common-search-button").click();
			});
		}else{
			location.href=contextPath+"/search.sgis?keywords="+encodeURIComponent(searchText);
		}
	}
	var ok = {
		title:"검색",
		func : function() {
			var searchText = $(this).find("input[type=text].alertInputBox").val();
			search(searchText);
		}
	}
	messagePrompt.open("검색","지역명 검색어 or 검색어를 입력해주세요<br/>예)서울시 인구",[ok,{title:"취소"}],"","검색어를 입력해주세요",function(){
		var wrapper = $(this);
		wrapper.find("input[type=text].alertInputBox").keyup(function(e){
			if(e.keyCode == 13){
				search($(this).val());
				wrapper.remove();
			}
		})
	});
});
$("#menu-open-button").click(function(){
	srvLogWrite("M0","02", "01", "00", "", "");		//메뉴열기
	$(".aside_back").fadeIn();
	$(".aside").show().animate({
		right: 0
	},500,function(){
		$(".Content").css({
			"height": "100%",
			"max-height": "100%",
			"min-height": $(".aside").outerHeight(true),
			"overflow":"hidden"
		});
	});
});
$("#menu-close-button,.aside_back").click(function(){
	$(".aside").animate({
		right: -300
	},500,function(){
		$(".Content").attr("style","");
		$(".aside_back").fadeOut();
		$(".aside").hide();
	});
});
</script>