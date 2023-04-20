
<%
	/**************************************************************************************************************************
	* Program Name	: 행정통계시각화 > 레프트 메뉴
	* File Name		: administStatsLeft.jsp
	* Comment		:
	* History		:
	**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<script src="/js/administStats/administStatsLeft.js"></script>

<div id="aside">
	<h1 class="logo">
		<a href="/" title="통계지리정보서비스 sgis 바로가기">
                                    <!--  배천규 로고 수정  20221214  -->
			<img src="/images/administStats/more1/sgisLogo2022.png" alt="통계지리정보서비스 sgis 바로가기" class="main_shortcuts_img" />
		</a>
	</h1>
	<!--<div class="top-img">
		<a href="/view/administStats/newlyDash" title="메인 바로가기">
			<img src="/images/administStats/renew/top-img_02.png" alt="행정통계시각화" class="main_shortcuts_img" />
		</a>
	</div>-->
	<nav class="nav">
		<ul id="gnb">
			<li id="newlyMenu" class="mn1 thema <c:if test="${mode eq 'newly'}">current</c:if>">
                                                <!--  메뉴구조 및 이미지 수정 배천규 수정  20221214  -->
				<div class="mn_wrapper">
					<a href="#" onclick="javascript: return false;">
						<img src="/images/administStats/more1/menuicon1off.png" class="menuicon1off" /><br />
						신혼부부<br />통계
					</a>
				</div>
			</li>
			<li id="houseMenu" class="mn2 thema <c:if test="${mode eq 'house'}">current</c:if>">
                                                <!--  메뉴구조 및 이미지 수정 배천규 수정  20221214  -->
				<div class="mn_wrapper">
					<a href="#" onclick="javascript: return false;">
						<img src="/images/administStats/more1/menuicon2off.png" class="menuicon2off" /><br />
						주택소유<br />통계
					</a>
				</div>
			</li>
			<li id="middlMenu" class="mn3 thema <c:if test="${mode eq 'middl'}">current</c:if>">
                                                <!--  메뉴구조 및 이미지 수정 배천규 수정  20221214  -->
				<div class="mn_wrapper">
					<a href="#" onclick="javascript: return false;">
						<img src="/images/administStats/more1/menuicon3off.png" class="menuicon3off" /><br />
						중장년층<br />통계
					</a>
				</div>	
			</li>
			<li id="retunMenu" class="mn4 thema <c:if test="${mode eq 'retun'}">current</c:if>">
                                                <!--  메뉴구조 및 이미지 수정 배천규 수정  20221214  -->
				<div class="mn_wrapper">
					<a href="#" onclick="javascript: return false;">
						<img src="/images/administStats/more1/menuicon4off.png" class="menuicon4off" /><br />
						귀농어 · 귀촌인<br />통계
					</a>
				</div>	
			</li>
			<li id="more1Menu" class="mn5 thema <c:if test="${mode eq 'more1'}">current</c:if>">
				<div class="mn_wrapper">
					<a href="#" onclick="javascript: return false;">
						<img src="/images/administStats/more1/menuicon6off.png" class="menuicon4off" /><br />
						일자리행정<br />통계
					</a>
				</div>	
			</li>
			<li id="more2Menu" class="mn6 thema <c:if test="${mode eq 'more2'}">current</c:if>">
				<div class="mn_wrapper">
					<a href="#" onclick="javascript: return false;">
						<img src="/images/administStats/more1/menuicon7off.png" class="menuicon4off" /><br />
						퇴직연금<br />통계
					</a>
				</div>	
			</li>
			<li id="more3Menu" class="mn7 thema <c:if test="${mode eq 'more3'}">current</c:if>">
				<div class="mn_wrapper">
					<a href="#" onclick="javascript: return false;">
						<img src="/images/administStats/more1/menuicon8off.png" class="menuicon4off" /><br />
						임금근로<br />일자리동향
					</a>
				</div>	
			</li>
			<%-- <li class="mn5 <c:if test="${fn:contains(url, 'more')}">current</c:if>">
                                                <!--  메뉴구조 및 이미지 수정 배천규 수정  20221214  -->
				<div class="mn_wrapper">
					<a href="#" onclick="javascript: $('.moreSubMenu1').click(); return false;">
						<img src="/images/administStats/more1/menuicon5off.png" class="menuicon5off" /><br />
						통계<br />더보기
					</a>
				</div>
				<ul id="ul_moreSubMenu" style="<c:if test="${!fn:contains(mode, 'more')}">display: none;</c:if>"><!-- 배천규 수정 20221220  -->
				<ul id="ul_moreSubMenu">
					<li class="moreSubMenu1 thema <c:if test="${mode eq 'more1'}">subCurrent</c:if>" id="more1Menu">
						일자리행정<br />통계<!--  줄바꿈수정 배천규 수정  20221214  -->
					</li>
					<li class="moreSubMenu2 thema <c:if test="${mode eq 'more2'}">subCurrent</c:if>" id="more2Menu">
						퇴직연금<br />통계
					</li>
					<li class="moreSubMenu3 thema <c:if test="${mode eq 'more3'}">subCurrent</c:if>" id="more3Menu">
						임금근로<br />일자리동향
					</li>
				</ul>
			</li> --%>
		</ul>
	</nav>
</div>