<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<%@include file="/WEB-INF/jsp/includes/includeHeaderFile.jsp" %>
		<link rel="stylesheet" href="${ctx }/resources/css/main.css?version=20191217" />

		<!-- 2020.02.25 [이금은] <My통계로>link 메뉴. 한시적 사용. START  -->
		<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=0,maximum-scale=10,user-scalable=yes">
		<style>
	            .Mainpopup{display: block; position: relative; background:#5bc8e1 ; text-align: left; box-sizing: border-box; height: 120px; padding: 5px 10px; box-sizing: border-box}
	            .Mainpopup div{position: relative}
	            .Mainpopup img.logo{width: 69px; height: auto;}
	            .Mainpopup p{font-size: 10px; color: #fff; padding: 0; margin: 0;}
	            .Mainpopup div.bg{position: absolute; height: 120px; width: auto; right: 0; top:0; z-index: 0}
	            .Mainpopup div.bg img{width: auto; height: 120px}
	            .Mainpopup a{text-decoration: none}
	        </style>
	        <!-- 2020.02.25 [이금은] <My통계로>link 메뉴. 한시적 사용. END  -->
        
		<title>SGIS plus mobile</title>
		<!-- WSC CSS 검사 중 http-equiv; 존재하지 않는 속성입니다. 체크가 되어 주석처리함 2018-05-16 김건민 -->
		<!-- <meta http-equiv="Cash-Control" content="no-cache" />
		<meta http-equiv="Pragma" content="no-cache" /> -->
		<script>
			$(document).ready(function(){
				// 2017.03.23j 운영 http -> https		
				
				// 2020.04.01[한광희] 운영반영 금지 START
 				/* if(location.protocol == 'http:'){
 		 			location.href = location.href.replace('http:','https:');
 		 		} */
 		 		// 2020.04.01[한광희] 운영반영 금지 END				

				srvLogWrite("M0","01", "01", "00", "", "");		//모바일 메인 페이지
				
				var swt = 0;
				$.ajax({
					url : sgisContextPath + "/ServiceAPI/board/boardLists.json",
					type:"POST",
					data: {
						board_cd : "BOARD_001",
						page_num : 1
					},
					async: false,
					dataType:"json",
					success: function(res){
						$.each(res.result.summaryList,function(cnt,node){
							if(cnt>1){
								return false;
							}
							var title = $("<div/>").html(node.post_title).text();
							var content = decodeEntities(node.post_content);
							var helperBox = $("<div/>",{"class":"InfoBox",style:"display:none;"});
							
							swt ++;
							var titleDate = "<em>" + node.reg_ts.split(" ")[0] + "</em>";
							if(swt == 1){
								
								$("#article-list").append($("<li/>").append($("<a/>",{text:title}).click(function(){
									
									//팝업기능 삭제후 공지사항 목록화면으로 변경
									//helperBox.show();
									//$(".InfoBox>.InfoText").scrollTop(0);
									
									location.href = contextPath + "/board/notice.sgis";
									
									return false;
								}),"&nbsp;",titleDate));
							}
							$("body").append(
								helperBox.append(
									$("<div/>",{"class":"InfoText"}).append(
										$("<div/>",{"class":"Description"}).append(content),
										$("<button/>",{"class":"btn_close","type":"button"}).click(function(){
											helperBox.hide();
										})
									),
									$("<div/>",{"class":"InfoBg"}).click(function(){
										helperBox.hide();
									})
								)
							);
						});
					},
					error: function(xhr, status, errorThrown) {
// 						messageAlert.open("알림",errorMessage);
					}
				});
				
				
				
				// search
				$("#common-search-button").click(function(){
					location.href = contextPath + "/search.sgis";
					
					
				});
				
				$("#menu-open-button").click(function(){
					srvLogWrite("M0","02", "01", "00", "", "");		//전체메뉴 열기
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
			});
		</script>
	</head>
	<body>
		<div class="Wrap Main">
			<div class="Header">
				<header>
					<button id="common-search-button" class="ic_search" type="button"><!-- 지역명 검색어 또는 검색어 입력 예) 서울시 인구 --></button>
					<h1>SGIS오픈플랫폼</h1>
					<button id="menu-open-button" class="btn_menuOpen" type="button">메뉴</button>
				</header>
			</div>
			<div class="Content">
				<div class="MainTitle">
					<span class="ti">내 손 안의 통계지도</span>
					<!-- 2019.09.06[한광희] 메인이미지 수정으로 인한 <br> 추가 START -->
					<!-- <span class="txt">모바일을 통해 언제, 어디서든지<br>지도기반의 통계 정보를 손쉽게 확인할 수 있습니다.</span> -->
					<span class="txt">모바일을 통해 언제, 어디서든지<br>지도기반의 통계 정보를<br>손쉽게 확인할 수 있습니다.</span>
					<!-- 2019.09.06[한광희] 메인이미지 수정으로 인한 <br> 추가 END -->
				</div>				
				<!-- 2020.02.25 [이금은] <My통계로>link 메뉴. 한시적 사용. START  -->
				<div class="Mainpopup">
			          <a href="/view/statsMe/statsMeMain?param=0">
			               <div class="bg"><img src="${ctx }/resources/m2019/images/main/popup_bg1.png" alt=""></div>
			               <div>
			                   <img  class="logo"src="${ctx }/resources/m2019/images/main/logo.png" alt="">
			                    <p>
			                        ‘My통계로(路)’는 <br/>생애주기와 관심분야를 선택하여<br/>내가 원하는 통계지리정보를  간편하게 <br/>볼 수 있는 서비스입니다.
			                    </p>            
			               </div>
			           </a> 
			        </div>
				<!-- 2020.02.25 [이금은] <My통계로>link 메뉴. 한시적 사용. END  -->
				<!-- 2019.09.06[한광희] SGIS 일자리맵 바로가기 추가 START -->
				<div class="MainWork">
					<!-- 2019-09-17 [김남민] (12) 오늘의 전체 일지리현황 팝업 수정. START -->
					<a href="/mobile/m2019/workroad/myNeighberhoodJobMap.sgis?todaystatus_pop_yn=Y">
						<span class="ti">SGIS 일자리 맵</span>
						<span class="txt">내 주변의 원하는 조건을 가진 일자리를<br>관련 통계와 같이 보고 싶다면?</span>
					</a>
					<!-- 2019-09-17 [김남민] (12) 오늘의 전체 일지리현황 팝업 수정. END -->
				</div>
				<!-- 2019.09.06[한광희] SGIS 일자리맵 바로가기 추가 END -->
				<div class="MainMenu">
					<a class="Box1" href="${ctx }/service/service01.sgis">
						<span class="ti">내 위치 주변 통계를<br>간편하게 알고싶다면</span>
						<span class="intro">지금 내 주변의 통계는?<br>주제별로 알기 쉬운 지역통계<br>내가 참여하는 소통지도</span>
					</a>
					<a class="Box2" href="${ctx }/service/service02.sgis">
						<span class="ti">다양한 조건으로<br>상세 지역통계를 찾는다면</span>
						<span class="intro">다양한 통계조건별 검색<br>살고싶은 동네는?<br>우리동네 생활업종은?</span>
					</a>
				</div>
				<div class="MainNotice">
				<a href="${ctx }/board/notice.sgis">
					<h2>알림마당</h2>
					<ul id="article-list">
					<!-- 
						<li><a href="#">OX퀴즈 이벤트</a> <em>2017.07.30</em></li>
					 -->
					</ul>
					</a>
				</div>
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
		            	<!-- 2019.12.16[김남민] 일자리 통계정보 OPEN. START -->
		            	<li><a href="${ctx }/m2019/workroad/statsAnlsMap.sgis">- &nbsp;일자리 통계정보</a></li>
		            	<!-- 2019.12.16[김남민] 일자리 통계정보 OPEN. END -->
		          	</ul>
	            	<!-- 2019.09.17[한광희] 일자리 맵 메뉴 명칭 및 위치 변경. END -->
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
			
			
			
			
			<%@include file="/WEB-INF/jsp/includes/copyright.jsp" %>
		</div>
	</body>
</html>

