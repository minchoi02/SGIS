<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<title>지역현안 소통지도</title>
		<meta name="title" content="지역현안 소통지도">
		<link rel="stylesheet" href="${ctx }/resources/css/map/community.css" />
		<link rel="stylesheet" href="${ctx }/resources/css/map/community_intro.css" />
		<script src="${ctx }/resources/js/map/community/intro.js"></script>
	</head>
	<body>
		<div class="ContArea Community_intro">
			<div class="CommunityList">
				<div class="List">
					<div id="all-community">
						<div id="all-community-list">
						</div>
						<div id="all-community-list-page" class="Pasing" style="display: none;">
						</div>
					</div>
					<div id="open-community" style="display:none;">
						<div id="open-community-list"></div>
						<div id="open-community-list-page" class="Pasing" style="display: none;"></div>
					</div>
					<div id="join-community" style="display:none;">
						<div id="join-community-list"></div>
						<div id="join-community-list-page" class="Pasing" style="display: none;"></div>
					</div>
					<div id="interest-community" style="display:none;">
						<div id="interest-community-list"></div>
						<div id="interest-community-list-page" class="Pasing"></div>
					</div>
				</div>
				<div id="community-tab" class="Tab">
					<a class="M_on" data-type="all" data-list-id="1">전체<span id="all-count">0</span></a>
					<c:if test="${loggedIn }">
						<a data-type="open" data-list-id="3">개설<span id="open-count">0</span></a>
						<a data-type="join" data-list-id="2">가입<span id="join-count">0</span></a>
					</c:if>
				</div>
				<div class="ListSearch_cm">
					<button class="SearchBtn_fst" type="button">목록검색</button>
					<form id="community-search">
						<label for="community-keyword" class="Hidden">검색어입력</label>
						<input id="community-keyword" type="text" placeholder="검색어입력">
						<button type="submit">검색</button>
					</form>
					<button class="SearchClose" type="button" >닫기</button>
				</div>
			</div>
		</div>
	</body>
</html>