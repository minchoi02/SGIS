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
<script src="/js/administStats/testAdministStatsLeft.js"></script>
<div id="aside">
	<h1 class="logo">
		<a href="/" title="통계지리정보서비스 sgis 바로가기">
			<img src="/images/administStats/renew/top-img_01.png" alt="통계지리정보서비스 sgis 바로가기" class="main_shortcuts_img" />
		</a>
	</h1>
	<div class="top-img">
		<a href="/view/administStats/newlyDash" title="메인 바로가기">
			<img src="/images/administStats/renew/top-img_02.png" alt="행정통계시각화" class="main_shortcuts_img" />
		</a>
	</div>
	<nav class="nav">
		<ul id="gnb">
			<li id="newlyMenu" class="mn1 thema <c:if test="${mode eq 'newlyDash'}">current</c:if>">
				<a href="#" onclick="$testAdministStatsLeft.event.moveMenu(); return false;">
					신혼부부<br />통계
				</a>
			</li>
			<li id="houseMenu" class="mn2 thema <c:if test="${mode eq 'jutak'}">current</c:if>">
				<a href="#" onclick="$testAdministStatsLeft.event.moveMenu(); return false;">
					주택소유<br />통계
				</a>
			</li>
			<li id="middlMenu" class="mn3 thema <c:if test="${mode eq 'middl'}">current</c:if>">
				<a href="#" onclick="$testAdministStatsLeft.event.moveMenu(); return false;">
					중·장년층<br />행정통계
				</a>
			</li>
			<li id="retunMenu" class="mn4 thema <c:if test="${mode eq 'retun'}">current</c:if>">
				<a href="#" onclick="$testAdministStatsLeft.event.moveMenu(); return false;">
					귀농어·귀촌인<br />통계
				</a>
			</li>
			<li class="mn5 <c:if test="${fn:contains(url, 'more')}">current</c:if>">
				<a href="#" onclick="javascript: $('.moreSubMenu1').click(); return false;">
					통계<br />더보기
				</a>
				<ul id="ul_moreSubMenu" style="<c:if test="${!fn:contains(mode, 'more')}">display: none;</c:if>">
					<li class="moreSubMenu1 thema <c:if test="${mode eq 'more1'}">subCurrent</c:if>" id="more1Menu">
						일자리<br />행정통계
					</li>
					<li class="moreSubMenu2 thema <c:if test="${mode eq 'more2'}">subCurrent</c:if>" id="more2Menu">
						퇴직연금<br />통계
					</li>
					<li class="moreSubMenu3 thema <c:if test="${mode eq 'more3'}">subCurrent</c:if>" id="more3Menu">
						임금근로<br />일자리동향
					</li>
				</ul>
			</li>
		</ul>
	</nav>
</div>