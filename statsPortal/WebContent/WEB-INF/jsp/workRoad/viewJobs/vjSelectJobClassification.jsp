<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 일자리 보기 > 직종분류 선택 (팝업창) 	
* File Name		: viewJobs > vjSelectJobClassification.jsp
* Comment		: 
* History		:
*	2018-10-02	ywKim	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="${pageContext.request.contextPath}/js/workRoad/viewJobs/vjSelectJobClassification.js"></script>

<div class="dialogbox pwType"  id="vjSelectJobClassification">
	<div class="popBox wrmDraggable">
		<div class="topbar wrmHeader">
			<span>직종분류 선택</span>
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
	
<!-- 임시 주석 - 2019.01.23	ywKim	변경
 		<div class="view-tab">
			<a class="on" href="javascript:void(0)">직업전망 및 직업훈련 보기</a> 
		</div>
 -->		
 <!-- 직업전망보기 OpenAPI 불안정함 - 2019.03.18 주석
		<div class="cont-box" id="vjViewContents">
			<article> 
				<div class="select-area">
					<span>직종 선택</span>
					<span class="select-wrap">
						<select id="vjJobClassificationList">
						</select>
					</span>
				</div>
			</article>		
			<article>
				<div class="area-tit">
					<a href="javascript:void(0)" id="vjShowJobProspecting"><span>직업전망 보기</span></a>
				</div>
-->				
				<!-- 임시 주석 - 2019.01.23	ywKim	변경
				<div class="area-tit">
					<a href="javascript:void(0)" id="vjShowJobTraining"><span>직업훈련(핵심직무 기반) 보기</span></a>
				</div>
				-->
<!-- 				
			</article>
		</div>
 -->				
	</div>
</div>
