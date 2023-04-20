<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html>
<head>
	<title>검색</title>
	<meta name="title" content="검색">
	<script src="${ctx }/resources/m2020/js/search.js"></script>
</head>
<body>
	<div style="margin-bottom: 70px;">	<!-- 2020.09.09[한광희] 이전버튼 추가로 인한 css 수정 -->
		<form class="search-container" id="search-form" action="#" method="get">
			<label for="searchKeyword" class="Hidden">검색어입력</label> <!-- 2020.09.08 [신예리] 레이블 추가 -->
	      	<input type="text" id="searchKeyword" placeholder="검색어를 입력해주세요." title="검색영역"> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
	      	<%-- <a href="#"><img class="search-icon" src="${ctx }/resources/m2020/images/main/search_rnb.png"></a> --%>
	    	<button type="submit" id="searchBtn" name="searchBtn" title="검색 버튼"></button> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
		    <!-- <button id="btn_menuClose" type="button" onclick="location.href='${ctx }/index.jsp'" title="메뉴 닫기">메뉴닫기</button> --> <!-- 2020.09.09 [한광희] 이전버튼 추가로 인한 주석 -->
	    </form>
	    
	    <div id="article-wrap" style="display: none; padding-top: 30px;"></div>
	    
	    <div class="search_list mlr16" id="related-word-div" style="display: none;">
	    	<div class="tit" id="related-word-cnt">
	        	<h5>연관검색어</h5><span>(2건)</span>
	      	</div>
	      	<table id="related-word">
	        	<!-- <tr>
	          		<td>1세대 가구</td>
	        	</tr>
	        	<tr>
	          		<td>가구</td>
	        	</tr> -->
	      	</table>
	    </div>
	    
	    <div class="search_list mlr16" id="statsMeCatalogListTableDiv" style="display: none;">
     		<div class="tit" id="statsMeCatalogListTableCnt">
        		<h5>My통계로 검색결과</h5><span>(10건)</span>
      		</div>
	      	<table id="statsMeCatalogListTable">
	        	<!-- <tr>
	          		<td>1인가구(인구주택총조사)-2018년</td>
        		</tr>
	        	<tr>
	          		<td>1인가구</td>
	        	</tr>
        		<tr>
	          		<td>청년</td>
	        	</tr>
	        	<tr>
	          		<td>카페</td>
        		</tr>
	        	<tr>
	          		<td>청소년</td>
	        	</tr> -->
	      	</table>
      		<button type="button" class="moreBtn" id="statsMeCatalogListTableMoreBtn" style="display: none;">더보기</button>
    	</div>
	    
	    <div class="search_list mlr16" id="sopListTableDiv" style="display: none;">
     		<div class="tit" id="sopListTableCnt">
        		<h5>대화형 통계지도 검색결과</h5><span>(10건)</span>
      		</div>
	      	<table id="sopListTable">
	        	<!-- <tr>
	          		<td>1인가구(인구주택총조사)-2018년</td>
        		</tr>
	        	<tr>
	          		<td>1인가구</td>
	        	</tr>
        		<tr>
	          		<td>청년</td>
	        	</tr>
	        	<tr>
	          		<td>카페</td>
        		</tr>
	        	<tr>
	          		<td>청소년</td>
	        	</tr> -->
	      	</table>
      		<button type="button" class="moreBtn" id="sopListTableMoreBtn" style="display: none;">더보기</button>
    	</div>

    	<div class="search_list mlr16" id="themeListTableDiv" style="display: none;">
      		<div class="tit" id="themeListTableCnt">
        		<h5>통계주제도 검색결과</h5><span>(2건)</span>
      		</div>
      		<table id="themeListTable">
        		<!-- <tr>
          			<td>인구와 가구 > 65세 이상 1인 가구 변화</td>
        		</tr>
        		<tr>
          			<td>환경과 안전 > 2,30대 1인가구 여성인구와 치안시설 분포현황</td>
        		</tr> -->
   			</table>
   			<button type="button" class="moreBtn" id="themeListTableMoreBtn" style="display: none;">더보기</button>
    	</div>
    	
    	<div class="search_list mlr16" id="wordTableDiv" style="display: none;">
      		<div class="tit" id="wordTableCnt">
        		<h5>통계용어 설명</h5><span>(2건)</span>
      		</div>
      		<table id="wordTable">
        		<!-- <tr>
          			<td>인구와 가구 > 65세 이상 1인 가구 변화</td>
        		</tr>
        		<tr>
          			<td>환경과 안전 > 2,30대 1인가구 여성인구와 치안시설 분포현황</td>
        		</tr> -->
   			</table>
    	</div>
    	
    	<div class="search_list mlr16" id="communityTableDiv" style="display: none;">
      		<div class="tit" id="communityTableCnt">
        		<h5>지역현안 소통지도</h5><span>(2건)</span>
      		</div>
      		<table id="communityTable">
        		<!-- <tr>
          			<td>인구와 가구 > 65세 이상 1인 가구 변화</td>
        		</tr>
        		<tr>
          			<td>환경과 안전 > 2,30대 1인가구 여성인구와 치안시설 분포현황</td>
        		</tr> -->
   			</table>
   			<button type="button" class="moreBtn" id="communityTableMoreBtn" style="display: none;">더보기</button>
    	</div>
	</div>
	<!-- 2020.09.09[한광희] 이전버튼 추가 START -->
	<div class="sfbFooter"> 
		<button id="todayStatusDetailPopup_close" class="btn_search" type="button" style="width: 100%;" onclick="location.href='${ctx }/index.jsp'">이전</button>
	</div>
	<!-- 2020.09.09[한광희] 이전버튼 추가 END -->
</body>
</html>
