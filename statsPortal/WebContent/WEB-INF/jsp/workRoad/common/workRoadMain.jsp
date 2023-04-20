<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 메인 팝업 화면
* File Name		: common > workRoadMain.jsp
* Comment		: 
* History		: 2018-12-06	ywKim	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<link rel="stylesheet" href="/css/workRoad/workRoadMain.css">
<script src="/js/workRoad/common/workRoadMain.js"></script>
<script>
// 하루 안 보기
$("#closeLabel").on("click", function(event){
    event.stopPropagation();
});
</script>

<div class="workRoad" id="workRoadMain" style="overflow:auto; width:100%; height:100%;" onClick="$workRoad.ui.closeWin('workRoadMainPop', 'N', 1);">
    <div class="wrap" style="width: 1000px; height: 600px;">
        <div class="title">
            <h1>오늘의<span>일자리 현황</span></h1>             
        </div>
        <div class="contWrap">
            <p id="idToday">구인정보 출처 : 워크넷, 인크루트, 사람인<span>(2013.03.27 기준)</span></p>
            <ul>
                <li>
                    <h1 style='font-weight:bold;'>전체구인</h1>
                    <div id="all_corp" style='font-weight:bold;' class="cont mt15">59,002<span>업체</span></div>
                    <div id="all_man"  style='font-weight:bold;' class="cont">59,002<span>명</span></div>
                </li>
                <li>
                    <h1 style='font-weight:bold;'>신규구인</h1>
                    <div id="new_corp" style='font-weight:bold;' class="cont mt15">59,002<span>업체</span></div>
                    <div id="new_man"  style='font-weight:bold;' class="cont"     >59,002<span>명</span></div>
                </li>
                <li>
                    <h1 style='font-weight:bold;'>마감구인</h1>
                    <div id="clos_corp" style='font-weight:bold;' class="cont mt15">59,002<span>업체</span></div>
                    <div id="clos_man"  style='font-weight:bold;' class="cont"     >59,002<span>명</span></div>
                </li>
            </ul>
        </div>
        <div class="info">
            <h1 style='font-weight:bold;'>일자리맵서비스에서는 하루 하루의 구인정보와 다양한 통계정보를 지도 위에서 보실 수 있습니다.</h1>
            <ul>
                <li>
                    <span>- 내 주변 일자리를 직접 확인하려면</span>
                    <button id="vj">일자리보기</button>
                </li>
                <li>
                    <span>- 매일 들어오는 구인정보 현황은</span>
                    <button id="ts">오늘의 구인현황</button>
                    <button id="sa">구인현황 분석</button>
                </li>
                <li>
                    <span>- 일자리와 관련된 다양한 통계정보는</span>
                    <button id="ssa">일자리 통계분석</span>
                </li>
            </ul>
            <p class="mt20">※ 화면을 클릭하면 서비스화면으로 이동합니다.</p>
        </div>       
        <div class="closeWrap">
           <p><label id="closeLabel"><input type="checkbox" name="close" value="OK"/>1일간 이 창을 더 이상 열지 않음</label></p>
           <p><label>창닫기<button onclick="$workRoad.ui.closeWin('workRoadMainPop', 'N', 1);"><img src="../../images/workRoad/main_popup/close_btn.png" alt=""/></button></label></p>
        </div>
        <button class="closeBtn" onClick="$workRoad.ui.closeWin('workRoadMainPop', 'N', 1);"><img src="../../images/workRoad/main_popup/top_btn.png" alt=""/></button>
    </div><!-- wrap -->
</div>