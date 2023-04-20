<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 일자리 보기 > 경력 선택 (팝업창) 	
* File Name		: viewJobs > vjSelectCareer.jsp
* Comment		: 
* History		:
*	2018-10-02	ywKim	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="${pageContext.request.contextPath}/js/workRoad/viewJobs/vjSelectCareer.js"></script>

<div id="vjSelectCareer">
	<div class="popBox wrmDraggable">
		<div class="topbar wrmHeader">
			<span>경력 선택</span>
			<a href="javascript:void(0)">닫기</a>
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
		<div class="cont-box">
			<article>
				<div class="area-tit">
					<a href="javascript:void(0)" id="vjViewCollegeGraduateStat"><span>대졸자 일자리 이동경로 조사 (2016) 보기</span></a>
				</div>
			</article>
		</div>
	</div>
</div>
