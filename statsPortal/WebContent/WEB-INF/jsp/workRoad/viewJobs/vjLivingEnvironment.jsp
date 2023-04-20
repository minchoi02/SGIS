<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 일자리 보기 > 생활환경 종합 	
* File Name		: viewJobs > vjLivingEnvironment.jsp
* Comment		: 
* History		:
*	2018-09-11	ywKim	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="${pageContext.request.contextPath}/js/workRoad/viewJobs/vjLivingEnvironment.js"></script>

<script>
/* 2019.09.19[한광희] 내주변 일자리 보기:생활환경종합 팝업 출처 추가. START */
$(document).ready(function() {
	$.helpIndicator = function() {
		$('#help-indicator').show();
		$('a#help_indicator').focus();
	};
});
/* 2019.09.19[한광희] 내주변 일자리 보기:생활환경종합 팝업 출처 추가. END */
</script>
<div class="popBox envir wrmDraggable" id="vjLivingEnvironment">
	<div class="topbar wrmHeader">
		<span id="vjTitle" title="시군구 별로 생활환경정보를 지표화하여 균등하게 3등분 후 높음/보통/낮음 등의 상/중/하 정도로 표기됩니다.
※ 지표에 대한 자세한 정보는 ‘살고싶은 우리동네’ 서비스에서 확인 가능합니다.">생활환경 종합</span>
		<a href="javascript:void(0)">닫기</a>
	</div>
	<div class="cont-box wrmScrollable">
		<article>
			<!-- 2019.09.19[한광희] 내주변 일자리 보기:생활환경종합 팝업 출처 추가. START -->
			<div id="vjLivingEnvironmentOrigin" style="text-align: right;">
				<!-- 2019.11.04[한광희] 생활환경 종합 지표설명 추가 START -->
				<div class="more2">
					<a href="javascript:void(0)" onclick="$.helpIndicator();" id="vjViewDescription" style="float: left;">지표설명</a>
					<a href="javascript:void(0)" id="vjView2" style="float: left; margin-left: 5px;">간략히 <em>-</em></a>
				</div>
				<!-- 2019.11.04[한광희] 생활환경 종합 지표설명 추가 END -->
				<span style="vertical-align: middle;">출처 : 살고싶은 우리동네 </span>
				<a onclick="window.open(this.href); return false;" href="/view/house/houseAnalysisMap" style="margin-bottom: 3px;">
					<img alt="서비스 바로가기" src="<c:url value='/images/contents/service-shortcuts.png'/>" style="width: 20px; height: 20px;"/>
				</a>
			</div>
			<!-- 2019.09.19[한광희] 내주변 일자리 보기:생활환경종합 팝업 출처 추가. END -->
			<!-- 2019.11.04[한광희] 생활환경 종합 항목 위치 변경에 의한 수정 START -->
			<dl class="envir-info" id="vjList_left" style="width: 40%;float: left;border: none;">
				<dl>
					<dt>생활편의교통</dt>
					<dd class="good">쇼핑시설 좋음 </dd>
				</dl>
				<dl>
					<dt>교육</dt>
					<dd class="normal">학원 보통</dd>
				</dl>
				<dl>
					<dt>주거</dt>
					<dd class="good">공동주택비율 좋음 </dd>
				</dl>
				<dl>
					<dt>자연</dt>
					<dd class="normal">대기오염도 보통 </dd>
				</dl>
				<dl>
					<dt>복지문화</dt>
					<dd class="good">체육시설 좋음 </dd>
				</dl>
				<dl>
					<dt>복지문화</dt>
					<dd class="good">체육시설 좋음 </dd>
				</dl>
			</dl>
			<dl class="envir-info" id="vjList_right" style="width: 48%;float: left;border: none;">
				<dl>
					<dt>생활편의교통</dt>
					<dd class="good">쇼핑시설 좋음 </dd>
				</dl>
				<dl>
					<dt>교육</dt>
					<dd class="normal">학원 보통</dd>
				</dl>
				<dl>
					<dt>주거</dt>
					<dd class="good">공동주택비율 좋음 </dd>
				</dl>
				<dl>
					<dt>자연</dt>
					<dd class="normal">대기오염도 보통 </dd>
				</dl>
				<dl>
					<dt>복지문화</dt>
					<dd class="good">체육시설 좋음 </dd>
				</dl>
				<dl>
					<dt>복지문화</dt>
					<dd class="good">체육시설 좋음 </dd>
				</dl>
			</dl>
			<!-- 2019.11.04[한광희] 생활환경 종합 항목 위치 변경에 의한 수정 END -->
			<p class="notice">&nbsp;</p> 
			<!-- <p class="notice"> 우수한 생활환경 정보입니다.</p> -->
			<div class="more">
				<a href="javascript:void(0)" id="vjView">더보기 <em>+</em></a>
			</div>
			<!-- 2019.11.04[한광희] 생활환경 종합 항목 위치 변경에 의한 수정 START -->
			<!-- <div class="more" style="position: static; float: right;">
				<a href="javascript:void(0)" id="vjView2">간략히 <em>-</em></a>
			</div> -->
			<!-- 2019.11.04[한광희] 생활환경 종합 항목 위치 변경에 의한 수정 END -->
		</article>
	</div>
</div>