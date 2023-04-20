<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 일자리 보기 > 희망지역 선택 (팝업창) 	
* File Name		: viewJobs > vjSelectDesiredArea.jsp
* Comment		: 
* History		:
*	2018-09-11	ywKim	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="${pageContext.request.contextPath}/js/workRoad/viewJobs/vjSelectDesiredArea.js"></script>

<div class="workRoad" id="vjDesiredArea">
	<div class="popBox wrmDraggable">
		<div class="topbar wrmHeader">
			<span>희망지역 선택</span>
			<a href="javascript:void(0)">닫기</a>
		</div>
		<div class="cont-box">
			<article>
				<div class="select-area">
					<span class="select-wrap">
						<select id="vjSidoSelect">
							<option>서울특별시</option>
						</select>
					</span>
					<span class="select-wrap">
						<select id="vjSggSelect">
							<option>전체</option>
						</select>
					</span>
				</div>
				<p class="notice">선택 지역의 구인정보목록을 보실 수 있으며, 지도 영역은 선택지역으로 이동합니다.</p>
			</article>
		</div>
		<div class="popup-btn-area">
			<a href="javascript:void(0)" class="default-color" id="vjOk"><span>선택완료</span></a>
			<a href="javascript:void(0)" class="dark-gray" id="vjCancel"><span>취소</span></a>
		</div>
	</div>
</div>
