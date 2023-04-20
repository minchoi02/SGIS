<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<c:set var="isIntro" value="${fn:trim(param.id)==''}"/>
<div id="thematicSubmenu" style="${isIntro?'':'display:none;'}">

	<div class="Open_Type1">
		<h3 id="listTitleArea">주제선택</h3>
		<div class="title_sort">&nbsp;<input type="checkbox" id="title_sort"> <label for="title_sort">제목순정렬</label></div>
		<c:if test="${!isIntro }">
			<button class="BtnClose" onclick='$("#thematicSubmenu").hide();'>주제닫기</button>
		</c:if>
		<p class="SelectArea">
			<select id="sidoSelect">
				<option value="00" data-x="990480.875" data-y="1815839.375">선택</option>
			</select>
			<select id="sggSelect">
				<option value="999" data-x="990480.875" data-y="1815839.375">선택</option>
			</select>
			<select id="emdSelect">
				<option value="00" data-x="990480.875" data-y="1815839.375">선택</option>
			</select>
			<button type="button" id="searchListBtn" class="btn_search">조회</button>
		</p>
		<div class="Subject" style="height:0px;">
			<nav><a id="CTGR_001" class="subject1 CTGR_001 ${isIntro||thematicInfo.themaMapCategory=='CTGR_001'?'M_on':'' }">인구와 가구</a><a id="CTGR_002" class="subject2 CTGR_002 ${thematicInfo.themaMapCategory=='CTGR_002'?'M_on':'' }">주거와 교통</a><a id="CTGR_003" class="subject3 CTGR_003 ${thematicInfo.themaMapCategory=='CTGR_003'?'M_on':'' }">복지와 문화</a><a id="CTGR_004" class="subject4 CTGR_004 ${thematicInfo.themaMapCategory=='CTGR_004'?'M_on':'' }">노동과 경제</a><a id="CTGR_005" class="subject5 CTGR_005 ${thematicInfo.themaMapCategory=='CTGR_005'?'M_on':'' }">환경과 안전</a></nav>
		</div>
		
		<c:forEach begin="1" end="5" var="cnt">
			<c:set var="categoryNumber">CTGR_00${cnt }</c:set>
			<c:set var="srvLog4">${cnt }</c:set>
			<c:set var="categoryDisplay">
				<c:choose>
					<c:when test="${isIntro }">
						<c:if test="${cnt>1 }">
							display:none;
						</c:if>
					</c:when>
					<c:otherwise>
						<c:if test="${categoryNumber!=thematicInfo.themaMapCategory }">
							display:none;
						</c:if>
					</c:otherwise>
				</c:choose>
			</c:set>
			<ul id="LIST_${categoryNumber }" class="SubjectList" style="${categoryDisplay}">
				<c:forEach items="${category[categoryNumber] }" var="list" varStatus="status">
					<li data-order="${status.index }" data-title="${list.title }">
						<a class="List" href="${ctx }/map/thematic.sgis?id=${list.statThemaMapId}" onclick="javascript:srvLogWrite('M0', '04', '02', '0${srvLog4 }');">
							${list.title }<br>
							<c:choose>
								<c:when test="${list.maxExpnsnLevel=='01'}">
									<span class="spbox type${list.maxExpnsnLevel }">시도</span>
								</c:when>
								<c:when test="${list.maxExpnsnLevel=='02'}">
									<span class="spbox type${list.maxExpnsnLevel }">시군구</span>
								</c:when>
								<c:when test="${list.maxExpnsnLevel=='03'}">
									<span class="spbox type${list.maxExpnsnLevel }">읍면동</span>
								</c:when>
								<c:when test="${list.maxExpnsnLevel=='04'}">
									<span class="spbox type${list.maxExpnsnLevel }">집계구</span>
								</c:when>
							</c:choose>
							<c:choose>
								<c:when test="${list.type=='02'}">
									<c:set var="cssType">
										<c:choose>
											<c:when test="${list.dispMethod=='색상' }">05</c:when>
											<c:when test="${list.dispMethod=='증감' }">06</c:when>
											<c:when test="${list.dispMethod=='시계열' }">07</c:when>
											<c:when test="${list.dispMethod=='분할뷰' }">09</c:when>
											<c:when test="${list.dispMethod=='POI' }">10</c:when>
											<c:otherwise>05</c:otherwise>
										</c:choose>
									</c:set>
									<span class="spbox type${cssType }">${list.dispMethod }</span>
								</c:when>
								<c:when test="${list.type=='03'}">
									<span class="spbox type05">색상</span>
								</c:when>
								<c:when test="${list.type=='04'}">
									<span class="spbox type06">증감</span>
								</c:when>
								<c:when test="${list.type=='05'}">
									<span class="spbox type07">시계열</span>
								</c:when>
								<c:when test="${list.type=='06'}">
									<span class="spbox type09">분할뷰</span>
								</c:when>
								<c:when test="${list.type=='07'}">
									<span class="spbox type10">POI</span>
								</c:when>
							</c:choose>
							<span class="spbox type08">${list.yearInfo }</span>
						</a>
						<span class="resultValue" style="position:absolute; top:20px; right:50px; font-size:15px;">${list.leftSepValue }</span>
						<a class="Info" data-id="${list.statThemaMapId}">도움말</a>
					</li>
				</c:forEach>
			</ul>
		</c:forEach>
		<script>
			var thematicExpList = {
				<c:forEach var="map" items="${requestScope.category}">
					<c:forEach var="hash" items="${map['key']}" varStatus="status">
						<c:forEach var="node" items="${category[hash]}">
							"${node.statThemaMapId}":"${heumTag:insertHtmlTag(node.themaExp)}"<c:if test="${!status.end}">,</c:if>
						</c:forEach>
					</c:forEach>
				</c:forEach>
			};
			$(".Subject a[id^=CTGR_00]").click(function(){
				$(".Subject a[id^=CTGR_00]").not($(this)).removeClass("M_on");
				if(!$(this).hasClass("M_on")){
					$(this).addClass("M_on");
					$("ul[id^=LIST_CTGR_00]").not($("#LIST_"+$(this).attr("id"))).hide();
					$("#LIST_"+$(this).attr("id")).show();
				}
				$thematic.event.setItemBoxHeight();
				return false;
			});
			$("ul[id^=LIST_]>li>a.Info").click(function(){
				srvLogWrite("M0","04", "01", "08", "", "");
				
				$("#helf-text-box .Description").empty().html(thematicExpList[$(this).data("id")]);
				$("#helf-text-box").show();
				return false;
			});

			$("ul[id^=LIST_]>li>a.Info").each(function( index, item){
			//	alert($(this).data("id"));
			});
			$("#searchListBtn").click(function( index, item){	
				var addrCd = "all"; 
				
				if($("#sidoSelect").val() == "00"){
					addrCd = "all";	
					alert("시도를 선택해주세요");
					return false;
				}else if($("#sggSelect").val() == "999"){
					addrCd = $("#sidoSelect").val();
					alert("시군구를 선택해주세요");
					return false;
				}else if($("#emdSelect").val() == "00"){
					addrCd = $("#sidoSelect").val() + $("#sggSelect").val();
					alert("읍면동을 선택해 주세요");
					return false;
				}else{
					addrCd = $("#sidoSelect").val() + $("#sggSelect").val() + $("#emdSelect").val();
				}
				
				
				srvLogWrite("M0","04", "01", "06", "", addrCd);
				
			//	addrCd = $("#sidoSelect").val();
				
			//	alert(getParameter("id"));
				
				if("" == getParameter("id") || null == getParameter("id")){
					location.href = contextPath + "/map/thematic.sgis?ref_adm_id=" + addrCd + "&serviceGb=" + $thematic.ui.serviceGb;				
				}else{
					location.href = contextPath + "/map/thematic.sgis?ref_adm_id=" + addrCd + "&serviceGb=" + $thematic.ui.serviceGb;				
				//	location.href = contextPath + "/map/thematic.sgis?ref_adm_id=" + addrCd + "&id=" + getParameter("id")+ "&serviceGb=" + $thematic.ui.serviceGb;				
					
				}
				
				
				//alert(addrCd);
			});
		
		</script>
		
		<%@include file="/WEB-INF/jsp/includes/pageUpDown.jsp" %>
	</div>
	<div id="helf-text-box" class="InfoBox" style="display:none;">
		<div class="InfoText">
			<div class="Description"></div>
		</div>
		<div class="InfoBg" onclick="$('#helf-text-box').hide();">&nbsp;</div>
		<button class="btn_close" type="button" onclick="$('#helf-text-box').hide();">도움말닫기</button>
	</div>
	
	<div class="menuListToggle2 control_btn service theme" title="메뉴">서비스메뉴</div>
	
	<ul class="itemArea2 service_item theme_item" style="display:none;">
		<li class="thematic01 CTGR_001 themeEvent"><a href="#" class="statList CTGR_001 M_on">인구와가구</a></li>
		<li class="thematic02 CTGR_002 themeEvent"><a href="#" class="statList CTGR_002">주거와교통</a></li>
		<li class="thematic03 CTGR_003 themeEvent"><a href="#" class="statList CTGR_003">복지와문화</a></li>
		<li class="thematic04 CTGR_004 themeEvent"><a href="#" class="statList CTGR_004">노동과경제</a></li>
		<li class="thematic04 CTGR_005 themeEvent"><a href="#" class="statList CTGR_005">환경과안전</a></li>
		<!--<li class="close"><a href="#">메뉴닫기</a></li>-->
	</ul>
</div>