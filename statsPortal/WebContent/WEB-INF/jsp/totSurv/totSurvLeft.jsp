<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="/js/totSurv/totSurvLeft.js"></script>
<!-- 지자체 제공을 위하여 gv_url 존재여부에 따라 sideNav 수정 START -->
<c:if test="${type == null || type == ''}">
<div class="sidenav" id="leftMenu">
	<!-- 2020.11.11[신예리] 메뉴 ul li 추가 START -->
	<ul>
    <li><a href="#" class="menu thema" id="detail"></a></li> <!-- 20210223 박은식 이미지에서 MENU 텍스트로 변경 -->
    <!-- 2020-11-03 [곽제욱] 각 메뉴별 ID 추가 START -->
   	<li><a href="#" class="depth00 thema" id="populationMenu"><span>인구</span></a></li> <!-- 2020-11-26 [곽제욱] span 추가 -->   	
    <li><a href="#" class="depth01 thema" id="houseHoldMenu"><span>가구</span></a></li> <!-- 2020-11-26 [곽제욱] span 추가 -->
    <li><a href="#" class="depth02 thema" id="houseMenu"><span>주택</span></a></li> <!-- 2020-11-26 [곽제욱] span 추가 --> 
    <li><a href="#" class="depth03 thema" id="farmMenu"><span>농업</span></a></li> <!-- 2020-11-26 [곽제욱] span 추가 -->
    <li><a href="#" class="depth04 thema" id="forestryMenu"><span>임업</span></a></li> <!-- 2020-11-26 [곽제욱] span 추가 -->
    <li><a href="#" class="depth05 thema" id="fisheryMenu"><span>어업</span></a></li> <!-- 2020-11-26 [곽제욱] span 추가 -->
    <li><a href="#" class="depth08 thema" id="ecnmyMenu"><span>경제</span></a></li> <!-- 2020-11-26 [곽제욱] span 추가 -->
    <!-- <li><a href="#" class="menu thema new" id="inMoreDetail"></a></li> --> <!-- mng_s 20220315 더보기 메뉴 임시 막음 -->
    </ul>
    <!-- 2020.11.11[신예리] 메뉴 ul li 추가 END -->
    <!-- 2020-11-03 [곽제욱] 각 메뉴별 ID 추가 END -->
</div>
</c:if>
<c:if test="${type != null && type != '' && type == 'locgov' }"> <!-- 2020-10-29 [곽제욱] 대시보드 분기로 인한 조건 변경 --> 
<div>
</div>
<div class="sidenav" id="leftMenu">
	<!-- 2020.11.11[신예리] 메뉴 ul li 추가 START -->
	<ul>
	<li><a href="#" class="menu thema" id="detail"></a></li>
	<c:if test="${url == 'populationloc' }">
	<li><a href="#" class="depth00 thema on" id="populationMenu"><span>인구</span></a></li> <!-- 2020-11-03 [곽제욱] 각 메뉴별 ID 추가 --> <!-- 2020-11-26 [곽제욱] span 추가 -->
    </c:if>    
    <c:if test="${url == 'houseHoldDashLoc' }"> <!-- 2020-10-29 [곽제욱] 대시보드 분기 --> 
    <li><a href="#" class="depth01 thema on" id="houseHoldMenu"><span>가구</span></a></li> <!-- 2020-11-03 [곽제욱] 각 메뉴별 ID 추가 --> <!-- 2020-11-26 [곽제욱] span 추가 -->
    </c:if>
    <c:if test="${url == 'houseDashLoc' }"> <!-- 2020-10-29 [곽제욱] 대시보드 분기 --> 
    <li><a href="#" class="depth02 thema on" id="houseMenu"><span>주택</span></a></li><!-- 2020-11-03 [곽제욱] 각 메뉴별 ID 추가 --> <!-- 2020-11-26 [곽제욱] span 추가 -->
    </c:if>
    <c:if test="${url == 'farmDashLoc' }"> <!-- 2020-10-29 [곽제욱] 대시보드 분기 --> 
    <li><a href="#" class="depth03 thema on" id="farmMenu"><span>농업</span></a></li> <!-- 2020-11-03 [곽제욱] 각 메뉴별 ID 추가 --> <!-- 2020-11-26 [곽제욱] span 추가 -->
	</c:if>
	<!-- 2020-10-29 [곽제욱] 대시보드 분기 추가 START -->
	<c:if test="${url == 'forestryDashLoc' }">
	<li><a href="#" class="depth04 thema on" id="forestryMenu"><span>임업</span></a></li> <!-- 2020-11-03 [곽제욱] 각 메뉴별 ID 추가 --> <!-- 2020-11-26 [곽제욱] span 추가 -->
    </c:if>
    <c:if test="${url == 'fisheryDashLoc' }">
	<li><a href="#" class="depth05 thema on" id="fisheryMenu"><span>어업</span></a></li> <!-- 2020-11-03 [곽제욱] 각 메뉴별 ID 추가 --> <!-- 2020-11-26 [곽제욱] span 추가 -->
    </c:if>
    <!-- 22.02.13 [이영호] 경제총조사, 더보기 추가 Start -->
    <c:if test="${url == 'ecnmyDashLoc' }"> <!-- 2020-10-29 [곽제욱] 대시보드 분기 --> 
    <li><a href="#" class="depth08 thema on" id="ecnmyMenu"><span>경제</span></a></li> <!-- 2020-11-03 [곽제욱] 각 메뉴별 ID 추가 --> <!-- 2020-11-26 [곽제욱] span 추가 -->
    </c:if>
    <c:if test="${url == '' }">
    <!-- <li><a href="#" class="menu thema new" id="inMoreDetail"></a></li> --> <!-- mng_s 20220315 더보기 메뉴 임시 막음 -->
    </c:if>
    <!-- 22.02.13 [이영호] 경제총조사, 더보기 추가 End -->
	<!-- 2020-10-29 [곽제욱] 대시보드 분기 추가 END -->
	</ul>
	<!-- 2020.11.11[신예리] 메뉴 ul li 추가 END -->
</div>
</c:if>
<!-- 2020-10-29 [곽제욱] 인구주택총조사, 농림어업총조사 등 카테고리별 분기 URL START -->
<c:if test="${type == 'totPeopleLocgov' }">
	<div class="sidenav" id="leftMenu">
		<!-- 2020.11.11[신예리] 메뉴 ul li 추가 START -->
		<ul>
		<li><a href="#" class="menu thema" id="detail"></a></li>
		<!-- 2020-11-03 [곽제욱] 각 메뉴별 ID 추가 START -->
		<li><a href="#" class="depth00 thema" id="populationMenu"><span>인구</span></a></li> <!-- 2020-11-26 [곽제욱] span 추가 -->		
		<li><a href="#" class="depth01 thema" id="houseHoldMenu"><span>가구</span></a></li> <!-- 2020-11-26 [곽제욱] span 추가 -->
		<li><a href="#" class="depth01 thema" id="houseMenu"><span>주택</span></a></li> <!-- 2020-11-26 [곽제욱] span 추가 -->
		<!-- <li><a href="#" class="menu thema new" id="inMoreDetail"></a></li> --><!-- mng_s 20220315 더보기 메뉴 임시 막음 -->
		<!-- 2020-11-03 [곽제욱] 각 메뉴별 ID 추가 END -->
		</ul>
		<!-- 2020.11.11[신예리] 메뉴 ul li 추가 END -->
	</div>
</c:if>

<c:if test="${type == 'totFarmLocgov' }">
	<div class="sidenav" id="leftMenu">
		<!-- 2020.11.11[신예리] 메뉴 ul li 추가 START -->
		<ul>
		<li><a href="#" class="menu thema" id="detail"></a></li>
		<!-- 2020-11-03 [곽제욱] 각 메뉴별 ID 추가 START -->
		<li><a href="#" class="depth03 thema" id="farmMenu"><span>농업</span></a></li> <!-- 2020-11-26 [곽제욱] span 추가 -->
		<li><a href="#" class="depth04 thema" id="forestryMenu"><span>임업</span></a></li> <!-- 2020-11-26 [곽제욱] span 추가 --> 
		<li><a href="#" class="depth05 thema" id="fisheryMenu"><span>어업</span></a></li> <!-- 2020-11-26 [곽제욱] span 추가 -->
		<!-- <li><a href="#" class="menu thema new" id="inMoreDetail"></a></li> --><!-- mng_s 20220315 더보기 메뉴 임시 막음 -->
		<!-- 2020-11-03 [곽제욱] 각 메뉴별 ID 추가 END -->
		</ul>
		<!-- 2020.11.11[신예리] 메뉴 ul li 추가 END -->
	</div>
</c:if>
<!-- 2020-10-29 [곽제욱] 인구주택총조사, 농림어업총조사 등 카테고리별 분기 URL END -->
<!-- 지자체 제공을 위하여 gv_url 존재여부에 따라 sideNav 수정 END -->