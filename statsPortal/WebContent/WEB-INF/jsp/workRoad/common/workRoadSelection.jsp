<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 공통 > 선택항목 	
* File Name		: common > workRoadSelection.jsp
* Comment		: 
* History		: 2018-11-02	ywKim	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="${pageContext.request.contextPath}/js/workRoad/common/workRoadSelection.js"></script>

<div class="popBox var-list wrmDraggable" id="wrmSelection">
	<a href="javascript:void(0)" class="toggle-btn sq03 xw on">
		<span>선택항목</span>
	</a>
	<div class="topbar">
		<span class="wrmHeader">타이틀</span>
		<div class="stats-area wrmHeader"><!-- id: gridHideShowNumberBtn -->
    		<span>통계표출</span>
    		<a href="javascript:void(0);" class="stats-toggle-btn">off</a><!-- id: showNumberBtn -->
    	</div>
    	<div class="stats-area" style="width: 0px; right: 80px;">
    		<div id="wrmSelection_dataSlider_item" class="dataSlider"></div>
    	</div>
	</div>
	<div class="cont-box">
		<article class="scroll-area wrmScrollable">
			<ul>
				<!-- 샘플 -->
				<li class="dragItem ui-draggable" id="dragItem_0" aria-disabled="false">
					<a href="javascript:void(0)" id="API_0301-0" class="ellipsis drag M_on" title="총인구 (명)-2016년">
						<span class="text">총인구 (명)-2016년 가나다라마바사아자차카타파하0가나다라마바사아자차카타파하1가나다라마바사아자차카타파하2가나다라마바사아자차카타파하3가나다라마바사아자차카타파하4</span>
						<span class="atdrc_yn" style="display:none;">0</span>
					</a>
					<a href="javascript:void(0)" class="sqdel">
						<img src="/img/um/btn_closel01.png" alt="삭제" class="mCS_img_loaded">
					</a>
				</li>
			</ul>
		</article>
	</div>
</div>