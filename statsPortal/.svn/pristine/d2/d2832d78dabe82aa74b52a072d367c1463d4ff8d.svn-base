<%
/**************************************************************************************************************************
* Program Name	: 살고싶은 우리동네 Left메뉴 JSP	
* File Name		 : houseAnalysisMap.jsp
* Comment			 : 
* History			 : 2015-10-26
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!-- 리디자인적용:link css가 적용되지 않는 이유 - 2019.01.22	ywKim	추가 -->
<style>
#depth1Menu2 .nav-list li a {height: 70px;}

#depth1Menu2 .nav-list li:nth-child(1) > a,
#depth1Menu2 .nav-list li:nth-child(2) > a,
#depth1Menu2 .nav-list li:nth-child(3) > a,
#depth1Menu2 .nav-list li:nth-child(4) > a,
#depth1Menu2 .nav-list li:nth-child(5) > a {padding: 35px 0 5px;}
#depth1Menu2 .nav-list li:nth-child(6) > a {padding: 40px 0 5px;vertical-align: bottom;}
#depth1Menu2 .nav-list li:nth-child(7) > a {padding: 45px 0 5px;vertical-align: bottom;}

#depth1Menu2 .nav-list li:nth-child(1) > a:before {top: 7px;}
#depth1Menu2 .nav-list li:nth-child(2) > a:before,
#depth1Menu2 .nav-list li:nth-child(3) > a:before {top: 2px;}
#depth1Menu2 .nav-list li:nth-child(4) > a:before, 
#depth1Menu2 .nav-list li:nth-child(6) > a:before,
#depth1Menu2 .nav-list li:nth-child(5) > a:before {top: 6px;}
#depth1Menu2 .nav-list li:nth-child(7) > a:before {top: 9px;}

#quickBox2_3depth .stepClose2:hover{transform: rotate(0deg);opacity:1;}/* 회전 없애기 */
</style>

<div class="quickBox2 step01" id="quickBox-02">
	<div class="subj">
		<h2>추가 데이터 불러오기</h2>
	</div>
	<div class="scrollBox" style="height: calc(100% - 11px);"> 
		<ul class="themul ul-area interactive-list">
			<li style="display:none"></li>
			<li style="display:none"></li>
			<li style="display:none"></li>
			<li id="companyBtn" onclick="javascript:$policyWriteMapRightMenu.ui.setDetailStatsPanel('company');"><a data-subj="전국사업체조사" title="${paramInfo.tooltipList.A0301}">전국사업체조사</a></li>
			<li style="display:none"></li>
			<li id="collaboData" onclick="javascript:$policyWriteMapRightMenu.ui.setDetailStatsPanel('local');"><a data-subj="협업형 데이터" title="${paramInfo.tooltipList.A0601}">협업형 데이터</a></li>  
			<li id="userData" onclick="javascript:$policyWriteMapRightMenu.ui.setDetailStatsPanel('userData');"><a data-subj="나의 데이터" title="${paramInfo.tooltipList.A0601}">나의 데이터</a></li>  
		</ul>				
	</div> 
</div>
<!-- 대화형통계지도 메뉴 보기 end -->
<div class="nav-sidebar" id="depth1Menu2">
	<ul class="thematic nav-list interactive-list">
		<li style="display:none"></li>
		<li style="display:none"></li>
		<li style="display:none"></li>
		<li id="companyBtn" onclick="javascript:$policyWriteMapRightMenu.ui.setDetailStatsPanel('company');"><a data-subj="전국사업체조사" title="${paramInfo.tooltipList.A0301}"><span>전국<br/>사업체조사</span></a></li>
		<li style="display:none"></li>
		<li id="collaboData" onclick="javascript:$policyWriteMapRightMenu.ui.setDetailStatsPanel('local');"><a data-subj="협업형 데이터" title="${paramInfo.tooltipList.A0601}"><span>협업형 데이터</span></a></li>  
		<li id="userData" onclick="javascript:$policyWriteMapRightMenu.ui.setDetailStatsPanel('userData');"><a data-subj="나의 데이터" title="${paramInfo.tooltipList.A0601}"><span>나의 데이터</span></a></li>  
	</ul>
	<div class="list_btn">
		<img src="/images/common/img_list_btn.png" alt="목록" style="cusor:pointer" onclick="javascript:$policyWriteMapRightMenu.ui.showStatsPanel();"/>
	</div>
</div>

<!-- 2Depth start -->
<div class="quickBox2 step02" id="quickBox2_2depth">
	<div class="subj">
		<h2 id=submenuTitle2></h2>
	</div>
	 <div class="normalBox2">
		<!-- 사업체총조사 통계 Start -->
		<div class="totalResult2 tr01" style="display:none;">
			<ol class="cateMenu">
	    		<li id="industryTab" class="companyTab on">
	    			<a href="javascript:$policyWriteMapRightMenu.ui.companyTab('industry');">산업분류</a>
	    		</li>
	            <li id="themeTab" class="companyTab">
	            	<a href="javascript:$policyWriteMapRightMenu.ui.companyTab('theme');">테마업종</a>
	            </li>
	        </ol>
	        
	        <!-- 산업분류탭 -->
	        <div id="industryArea">
				<!-- 산업분류 리스트 -->
				<div class="stepTreeBox" id="companyPoiTreeBox"></div>
			</div>
			
			<!-- 테마업종탭 -->
			<div id="themeArea" style="display:none;">
				<div class="stepTreeBox" id="themePoiTreeBox"></div>
			</div>   
		</div>
		<!-- 사업체총조사 통계 End -->
										
		<!-- 협업형데이터 START -->
		<div class="totalResult2 tr02" style="display:none;">
			<div class="stepBox">
				<p class="on">협업형 데이터</p>
				<ul class="dbTypeCk">
					<c:choose>
						<c:when test="${fn:length(localGovernmentList)>0 }">
							<c:forEach items="${localGovernmentList}" var="data" varStatus="status">
								<li class="local">
									<label class="checkBtn" id="btn_${data.div_cd }" for="btn_${data.div_cd }">${data.div_nm }</label>
								</li>
							</c:forEach>
						</c:when>
						<c:otherwise>
							<li>
								저장된 데이터가 존재하지 않습니다
							</li>
						</c:otherwise>
					</c:choose>
				</ul>
			</div>
			<div class="stepBox">
				<p class="on">LBDMS 전송 데이터</p>
				<ul class="dbTypeCk">
					<c:choose>
						<c:when test="${fn:length(lbdmsList)>0 }">
							<c:forEach items="${lbdmsList}" var="data" varStatus="status">
								<li class="lbdms">
									<label class="checkBtn" id="btn_${data.seq }" for="btn_${data.seq}">${data.open_data_nm}</label>
								</li>
							</c:forEach>
						</c:when>
						<c:otherwise>
							<li>
								저장된 데이터가 존재하지 않습니다
							</li>
						</c:otherwise>
					</c:choose>
				</ul>
			</div>
		</div>
		<!-- 협업형데이터 END -->
								 
		<!-- 사용자데이터업로드 Start -->
		<div class="totalResult2 tr03" style="display:none;">
			<div class="stepBox"> 
				<p class="on">나의 데이터에 저장된 목록</p>
				<ul id="myDataLoadList2" class="dbTypeCk"></ul>
				<div id="myDataListTablePage2"></div>
			</div>
		</div>
		<!-- 사용자데이터업로드 End --> 
	</div>
 </div> 

 <!-- 3Depth start -->
<div class="quickBox2 step03" id="quickBox2_3depth">
	<div class="subj">
		<h2 id=submenuTitle3>선택된 위치데이터 목록</h2>
	</div>
	 <div class="scrollBox">
		<div id="poiBtnList" class="sqList">
			<ul></ul>
		</div> 
	</div>
	
	<div class="btnBottom">
		<a href="javascript:$policyWriteMapRightMenu.ui.doReqStatsData();" class="btnStyle02" id="buttonMakeBtn" data-subj="조건결합설정 팁" title="현재 선택된 통계항목 창에 해당하는 통계조건을 통계버튼으로 생성하여 통계값을 조회 할 수 있어요">통계 보기</a>
	</div>		
	<div class="bottom "><a href="javascript:void(0) " class="stepClose2 3depth_close">닫기</a></div>
 </div>