<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<link rel="stylesheet" href="${ctx }/resources/css/main.css" />
<script>
				srvLogWrite("M0","01", "02", "00", "", "");		//내 주변 통계 pageview
</script>
</head>

<body>
	<div class="Service1">
		<div class="Header">
			<header>
				<button id="common-search-button" class="ic_search" type="button">지역명 검색어 또는 검색어 입력 예) 서울시 인구</button>
				<h1>SGIS오픈플랫폼</h1>
				<button id="menu-open-button_1" class="btn_menuOpen" type="button">메뉴</button>
			</header>
		</div>
		<div class="Content">
			<div class="title">
				<span class="ti">현재 내 위치를 중심으로</span>
				<span class="txt">주변의 통계정보를 <br>손쉽게  알 수 있어요!</span>
			</div>
			<div class="menu">
				<a class="Box1" onclick="javascript:apiLogWrite2('L0', 'L01', '내주변통계', '없음', '00', '없음');" href="${ctx }/map/current.sgis">
					<span class="ti">내 주변 통계</span>
					<span class="intro">사용자의 위치정보를 기반으로<br>종합적인 통계지도 조회</span>
				</a>
				<a class="Box2" onclick="javascript:apiLogWrite2('L0', 'L06', '지역현안 소통지도', '없음', '00', '없음');" href="${ctx }/community.sgis">
					<span class="ti">지역현안 소통지도</span>
					<span class="intro">다양한 주제에 따라 함께<br>참여하여 만드는 커뮤니티맵</span>
				</a>
				<a class="Box3" onclick="javascript:apiLogWrite2('L0', 'L02', '통계주제도', '없음', '00', '없음');" href="${ctx }/map/thematic.sgis">
					<span class="ti">통계주제도</span>
					<span class="intro">사회적으로 관심 있는 주제별<br>통계지도를 설정 없이 간편하게 조회</span>
				</a>
			</div>
		</div>
		<%@include file="/WEB-INF/jsp/includes/copyright.jsp" %>
	</div>
</body>
</html>