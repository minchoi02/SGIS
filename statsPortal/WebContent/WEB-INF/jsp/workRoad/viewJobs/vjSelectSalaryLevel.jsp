<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 일자리 보기 > 급여수준 선택 (팝업창) 	
* File Name		: viewJobs > vjSelectSalaryLevel.jsp
* Comment		: 
* History		:
*	2018-10-02	ywKim	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="${pageContext.request.contextPath}/js/workRoad/viewJobs/vjSelectSalaryLevel.js"></script>

<div class="dialogbox pwType"  id="vjSelectSalaryLevel">
	<div class="popBox wrmDraggable">
		<div class="topbar wrmHeader">
			<span>급여수준 선택</span>
			<a href="javascript:void(0)">닫기</a>
		</div>
		<div class="cont-box">
			<article> 
				<div class="select-area">
					<span>구분 선택</span>
					<span class="select-wrap">
						<select id="vjSalaryLevelGubun">
						</select>
					</span>
				</div>
			</article>
		</div>
		<div class="cont-box">
			<article>
				<div class="cont-info">
					<div class="wrmScrollable">
						<ul class="multiCheckBox" id="vjDataList">
						</ul>
					</div>				
				</div>
				<p class="notice"> 다중 선택 가능합니다.</p>
			</article>
		</div>
		<div class="popup-btn-area ">
			<a href="javascript:void(0)" class="default-color " id="vjOk"><span>선택완료</span></a>
			<a href="javascript:void(0)" class="dark-gray" id="vjClear"><span>선택취소</span></a>
			<a href="javascript:void(0)" class="dark-gray" id="vjCancel"><span>취소</span></a>
		</div>
	</div>
</div>
