<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<div id="areainfo-2" class="areainfo" style="display:none;">
	<p class="radio_style">
		<label><input type="radio" name="population-radio" value="age" checked="checked" data-title="연령별 인구비율 (%)"> 연령별</label> &nbsp;&nbsp;&nbsp;&nbsp;
		<label><input type="radio" name="population-radio" value="gender" data-title="성별 인구비율"> 성별 </label>
	</p>
	<div id="areainfo-2-age" class="chart"></div>
	<div id="areainfo-2-gender" class="chart" style="display:none;">
		<c:forEach begin="1" end="1" var="i"><!-- 시도, 시군구 보려면 end="3" -->
			<div id="gender-pie-chart${i }" class="gender-chart"></div>
			<div id="gender-pie-chart${i }-male" class="gender-chart-value male"><img src="${ctx }/resources/images/icon/icon_male.png" alt="남자"/><br><span></span></div>
			<div id="gender-pie-chart${i }-female" class="gender-chart-value female"><img src="${ctx }/resources/images/icon/icon_female.png" alt="여자"/><br><span></span></div>
			<div id="gender-pie-chart${i }-location" class="gender-chart-map"><span></span></div>
		</c:forEach>
	</div>
	<!-- mng_s 20200421 김건민 (년도 수정) -->
	<p class="origin_txt">출처 : 통계청, 인구주택총조사 (2018)</p>
	<%@include file="/WEB-INF/jsp/includes/pageUpDown.jsp" %>
</div>