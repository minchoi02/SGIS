<%
/**************************************************************************************************************************
* Program Name	 : 통계소통지도 개설하기 step2 JSP	
* File Name		 : step2.jsp
* Comment		 : 
* History		 : (주)유코아시스템 나광흠 2016-10-12
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.TreeMap"%>
<%@page import="java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<c:set var="tab_width" value="50%;"/>
<c:if test="${ (member_grade eq 'PM') or ( member_grade eq 'pm' )}">
	<c:set var="tab_width" value="33.3% !important;"/>
</c:if>

<h2 id="header_cm_step2"><img src="${pageContext.request.contextPath}/img/community/cm_make_step2.png" alt="스텝2">
	배경통계 만들기<span>(옵션)</span>
	<span style="font-size:11px;padding-left:5px;font-weight: normal;">
		* 소통지도 주제와 관련된 통계를 추가하실 수 있습니다. &nbsp;&nbsp;
		<span style="margin-left: 20px;">
			<a href="javascript:void(0)" class="mousewheel"></a>
			* <span style="margin-left: 30px; font-size:11px; color:blue;">아이콘을 클릭하면 마우스 휠을 이용해서 지도의 줌 레벨을 설정하실 수 있습니다.</span>
		</span>
	</span>
</h2>
<div class="cm_step2">
	<div class="cm_make_map open">
		<button id="menu-control-button" class="btn_control" type="button"><img src="${pageContext.request.contextPath}/img/community/cm_make_map_close.png" alt="닫기"></button>
		<h3>추천통계</h3>
		<ul class="cm_make_map_basic">
			<li><label><input name="stats" type="checkbox" value="bassStats" data-title="총인구">총인구</label></li>
			<li><label><input name="stats" type="checkbox" value="bassBsnes" data-title="총사업체">총사업체</label></li>
		</ul>
		<h3>즐겨찾기통계(색지도)</h3>
		<button id="create-history" class="add_list" type="button">+추가</button>
		<ul class="cm_make_map_tab">
			<li class="M_on"><a href="#" style="border-right: #ddd solid 1px;">즐겨찾기<span class="comment" title="즐겨찾기로 저장한 통계정보를 활용하여 통계지도를 생성합니다.">!</span></a></li>
		</ul>
		<ul id="map-history" class="cm_make_map_tab_list">
			<c:forEach items="${historyList}" var="history" varStatus="status">
				<c:if test="${history.map_type ne 'THEME'}">
					<li><label title="${history.hist_nm }"><input id="history-row-${status.index }" name="stats" type="checkbox" value="${history.hist_id }" data-title="<c:out value="${history.hist_nm}"/>"><c:out value="${fn:substring(history.hist_nm,0,14) }"/><c:if test="${fn:length(history.hist_nm)>14 }">...</c:if></label><span><fmt:formatDate value="${history.reg_ts }" pattern="yyyy.MM.dd"/></span></li>
				</c:if>
			</c:forEach>
		</ul>
		<h3>위치표시</h3>
		<ul id="poi-tab" class="cm_make_map_tab">
			<li class="M_on" style="width: ${tab_width}"><a href="#" data-id="theme-list">테마<span class="comment" title="읍면동 이하 지도 축척레벨에서만 테마 정보를 볼 수 없습니다.">!</span></a></li>
			<li style="width: ${tab_width}"><a href="#" data-id="mydata-list">나의데이터<span class="comment" title="나의데이터에 저장된 자료가 지도위에 개별 위치로 보여집니다.">!</span></a></li>
			<c:if test="${ (member_grade eq 'PM') or ( member_grade eq 'pm' )}">
				<li style="width: 33.4% !important;"><a href="#" data-id="lbdms-list">LBDMS<span class="comment" title="LBDMS에서 전송된 자료가 지도위에 보여집니다.">!</span></a></li>
			</c:if>
		</ul>
		<ul id="theme-list" class="cm_make_map_tab_list">
			<c:forEach items="${themeMap }" var="theme">
				<li class="group">
					<div class="parent"><span></span>${theme.group_nm } <div class="current-theme-list"></div></div>
					<c:if test="${fn:length(theme.children)>0 }">
						<ul>
							<c:forEach items="${theme.children }" var="children">
								<li><label><input name="itemPoi" type="checkbox" value="${children.cd }" data-title="<c:out value="${children.cd_nm }"/>"><img src="${pageContext.request.contextPath}/img/ico/ico_${children.cd=='7005'||children.cd=='7006'||children.cd=='7007'?'7001':children.cd }.png" alt=""><c:out value="${children.cd_nm }"/></label></li>
							</c:forEach>				
						</ul>
					</c:if>
				</li>
			</c:forEach>
		</ul>
		<ul id="mydata-list" class="cm_make_map_tab_list" style="display:none;">
			<c:forEach items="${mydataList}" var="mydata" varStatus="status">
				<li><label title="${mydata.DATA_TITLE }"><input id="history-row-${status.index }" name="mydata" type="checkbox" value="${mydata.DATA_ID }" ${command.mydata==mydata.DATA_ID?'checked="checked"':'' } data-title="<c:out value="${mydata.DATA_TITLE}"/>"><c:out value="${fn:substring(mydata.DATA_TITLE,0,14) }"/><c:if test="${fn:length(mydata.DATA_TITLE)>14 }">...</c:if></label><span>${mydata.UPLOAD_DT }</span></li>
			</c:forEach>
		</ul>
		<c:if test="${ (member_grade eq 'PM') or ( member_grade eq 'pm' )}">
			<ul id="lbdms-list" class="cm_make_map_tab_list" style="display:none;">
				<c:forEach items="${lbdmsList}" var="lbdms" varStatus="status">
					<li><label title="${lbdms.open_data_nm }"><input id="history-row-${status.index }" name="lbdms" type="checkbox" value="${lbdms.seq }" ${command.lbdms==lbdms.seq?'checked="checked"':'' } data-title="<c:out value="${lbdms.open_data_nm}"/>"><c:out value="${fn:substring(lbdms.open_data_nm,0,14) }"/>
					<c:if test="${fn:length(lbdms.open_data_nm)>14 }">...</c:if></label><span>${lbdms.open_dt }</span></li>
				</c:forEach>
			</ul>
		</c:if>
		<h3>선택한 항목</h3>
		<ul id="select-list" class="cm_make_map_tab_list select-list">
		</ul>
	</div>
	<jsp:include page="/view/community/form/layerPopup/historyMenu"/>
	<div id="mapRgn_1" class="cm_make_MapArea "></div>
</div>
<script>
	$communityForm.ui.curMapStat = [];
	<c:forEach items="${command.stats}" var="stat">
		$("input[name=stats][value='${stat.list}']").prop("checked",true);
		$communityForm.ui.setSelectList($("input[name=stats][value='${stat.list}']"),"stats", true);
		$communityForm.ui.curMapStat.push("${stat.list}");
	</c:forEach>
	<c:forEach items="${command.itemList}" var="item" varStatus="status">
		$("input[name=itemPoi][value='${item.cd}']").prop("checked",true);
		$communityForm.ui.setThemeImage("${item.cd}",true);
		$communityForm.ui.setSelectList($("input[name=itemPoi][value='${item.cd}']"),"itemPoi", true);
	</c:forEach>
	<c:if test="${not empty command.mydata}">
		$communityMap.ui.mydataVal = '${command.mydata}';
		$communityForm.ui.setSelectList($("input[name=mydata][value='${command.mydata}']"),"mydata", true);
	</c:if>
	<c:if test="${not empty command.lbdms}">
		$communityMap.ui.lbdmsVal = '${command.lbdms}';
		$communityForm.ui.setSelectList($("input[name=lbdms][value='${command.lbdms}']"),"lbdms", true);
	</c:if>
</script>