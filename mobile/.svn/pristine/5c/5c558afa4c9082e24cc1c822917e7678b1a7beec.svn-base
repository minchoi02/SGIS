<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/m2020/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<title>함께하는 지도</title>
		<meta name="title" content="함께하는 지도">
		<link rel="stylesheet" href="${ctx }/resources/m2020/css/withmap/community.css" />
		<link rel="stylesheet" href="${ctx }/resources/m2020/css/subpage.css" />
		<link rel="stylesheet" href="${ctx }/resources/m2020/css/withmap/community_intro.css" />
		<script src="${ctx }/resources/m2020/js/withmap/intro.js"></script>
	</head>
	<body>
	<script type="text/javascript">
// 		srvLogWrite('O0', '20', '01', '01', '', '');
	</script>
		<div class="ContArea Community_intro">

		<!-- 검색 input 위치 변경 20200406 박은식 -->
		<!-- <button class="SearchBtn_fst" type="button">목록검색</button> -->
					<form id="community-search" class="search-result">
						<select id="from_ce" name="from_ce" class="search-select">
							<option selected value="E">초등</option>
							<option value="M">중학</option>
							<option value="H">고교</option>
						</select>
						<label for="community-keyword" class="Hidden">검색어입력</label>
						<input id="community-keyword" type="text" placeholder="검색어입력" title="검색어 영역"> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
						<button type="submit" class="search-icon" title="검색 버튼"></button>  <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
					</form>
					<div id="community-tab" class="gridheader Tab">
					<p class="M_on" data-type="all" data-list-id="1"><span id="all-count">0</span><span>건</span></p>
				<%-- 	<c:if test="${loggedIn }">
						<a data-type="open" data-list-id="3">개설<span id="open-count">0</span></a>
						<a data-type="join" data-list-id="2">가입<span id="join-count">0</span></a>
					</c:if> --%>
				<div class="selectbox">
				<select id="communityList-sorting" name="communityList-sorting" style="width: 95px;">
					<option value="" selected>등록일</option>
					<option value="name">소통지도명</option>
					<option value="count">자료건수</option>
					<!-- <option value="edit">수정일</option>  수정일 확인이 안됨-->
				</select>
				</div>
			</div>
		</div>
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
				<!-- 위치이동 및 footer 바 삭제 20200706 박은식 -->
				<!-- <div class="ListSearch_cm">

				</div> -->
		</div>
	</body>
</html>