<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 일자리 보기 > 조건 목록 (서브메뉴) 	
* File Name		: viewJobs > vjConditionList.jsp
* Comment		: 
* History		:
*	2018-09-10	ywKim	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="${pageContext.request.contextPath}/js/workRoad/viewJobs/vjConditionList.js"></script>

<div id="vjConditionList" data-autoResize="false"><!-- autoResize=false:높이 자동 조정 사용 안함 -->
	<!-- 2019-06-11 [김남민] 일자리 보기 > 통합검색 수정 START -->
	<div class="info-job choice-list" style="display:none;">
	<!-- 2019-06-11 [김남민] 일자리 보기 > 통합검색 수정 END -->
		<ul>
			<!-- 2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. START -->
			<!-- 2019-06-11 [김남민] 일자리 보기 > 통합검색 수정 START -->
			<li><a href="#">상세검색</a></li>
			<!-- 2019-06-11 [김남민] 일자리 보기 > 통합검색 수정 END -->
			<li style="display:none;"><a href="#">희망지역</a></li>
			<li style="display:none;"><a href="#">기업형태</a></li>
			
			<li style="display:none;"><a href="#">회사규모</a></li>
			
			<li style="display:none;"><a href="#">직종분류</a></li>
			<li style="display:none;"><a href="#">급여수준</a></li>
			<li style="display:none;"><a href="#">고용형태</a></li>
			
			<li style="display:none;"><a href="#">근무형태</a></li>
			
			<li style="display:none;"><a href="#">학력</a></li>
			<li style="display:none;"><a href="#">경력</a></li>
			<li style="display:none;"><a href="#">산업분류</a></li>
			<!-- 2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. END -->
		</ul>
	</div>
</div>

