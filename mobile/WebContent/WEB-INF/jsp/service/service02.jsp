<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<link rel="stylesheet" href="${ctx }/resources/css/main.css" />
<script>
			$(document).ready(function(){
				srvLogWrite("M0","01", "02", "00", "", "");		//내 주변 통계 pageview
			});
</script>
</head>




<body>
	<div class="Service2">
		<div class="Header">
			<header>
				<button id="common-search-button" class="ic_search" type="button">지역명 검색어 또는 검색어 입력 예) 서울시 인구</button>
				<h1>SGIS오픈플랫폼</h1>
				<button id="menu-open-button_1" class="btn_menuOpen" type="button">메뉴</button>
			</header>
		</div>
		<div class="Content">
			<div class="title">
				<span class="ti">선택한 통계조건에 따라</span>
				<span class="txt">지역별로 다양한 통계정보를 <br>검색할 수 있어요!</span>
			</div>
			<div class="menu">
				<a class="Box1" onclick="javascript:apiLogWrite2('L0', 'L03', '대화형통계지도', '없음', '00', '없음');" href="${ctx }/map/interactive.sgis">
					<span class="ti">대화형 통계지도</span>
					<span class="intro">인구, 주택, 가구, 사업체 등 다양한<br>데이터를 사용자 조건에 맞게 조회</span>
				</a>
				<a class="Box2" onclick="javascript:apiLogWrite2('L0', 'L04', '살고싶은 우리동네', '없음', '00', '없음');" href="${ctx }/map/house.sgis">
					<span class="ti">살고싶은 우리동네</span>
					<span class="intro">사용자 조건에 맞는 주거지역을<br>추천해주는 서비스</span>
				</a>
				<a class="Box3" onclick="javascript:apiLogWrite2('L0', 'L05', '우리동네 생활업종', '없음', '00', '없음');" href="${ctx }/map/biz.sgis">
					<span class="ti">우리동네 생활업종</span>
					<span class="intro">음식점, 편의점 등 36종의 생활업종과<br>관련된 다양한 정보를 제공</span>
				</a>
			</div>
		</div>
		<%@include file="/WEB-INF/jsp/includes/copyright.jsp" %>
	</div>
</body>
</html>