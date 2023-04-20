<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 공통 > 로딩화면 	
* File Name		: common > workRoadLoading.jsp
* Comment		: 
* History		: 2018-12-21	ywKim	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<style>
	#wrmLoading { display: none; }/* 처음에는 숨기기 */
	#wrmLoading .ajax_loading { z-index: 100001; }
	#wrmLoading img {
	    position: absolute;
	    height: 66px;/* 10px */
	    width: 66px;/* 400px */
	    line-height: 50px;
	    padding-bottom: 0px;/* 40px */
	    top: 50%;
	    left: 50%;
	    z-index: 100002;/* 11000 */
	    /* background: url(/img/common/loding_type01.gif) no-repeat; */	    
	}
</style>
    
<div class="ajax_mask" id="wrmLoading">
	<div class="ajax_loading">
		<img src="/img/common/loding_type01.gif">
		<!-- <img class="ajax_loading_img"> -->
    </div>
</div>