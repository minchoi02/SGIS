<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
	<title>통계주제도</title>
	<meta name="title" content="통계주제도">
	<link rel="stylesheet" href="${ctx }/resources/css/map/theme.css" />
	<script>var thematicInfo = ${heumTag:convertJson(thematicInfo)}</script>
	<script src="${ctx }/resources/js/map/thematic/thematic.js"></script>
	<script>
	window.onload = function(){
		var title = $(".gnb h2").text();
		var parameter = $("#map-title>h3").text();
		var adm_nm = $("#map-navigator-sido option:selected").text() + " " + $("#map-navigator-sgg option:selected").text() + " " + $("#map-navigator-emdong option:selected").text();
		apiLogWrite2("L0", "L02", title, parameter, "00", adm_nm);
		
		
		srvLogWrite("M0","04", "03", "01", "", "");
	}
	
	
	function changeSido(){
		$("#sidoSelect").val($("#map-navigator-sido").val()).prop("selected", true);
		getAddress($("#sidoSelect").val(), "sggSelect");
	}
	
	function changeSgg(){
		$("#sggSelect").val($("#map-navigator-sgg").val()).prop("selected", true);
		getAddress($("#sggSelect").val(), "emdSelect");
	}
	function changeEmd(){
		$("#emdSelect").val($("#map-navigator-emd").val()).prop("selected", true);
	}
	
	function getAddress(sido_cd, objId){
		var sggCd = null;
			$.ajax({
				method: "GET",
				async: false,
				url: openApiPath + "/OpenAPI3/addr/stage.json",
				data: {
					accessToken:accessToken,
					cd: sido_cd,
					pg_yn: "0"
				},
				dataType: "json",
				success: function(res) {
					if(res.errCd=="0"&&res.result.length>0){
						for(var i=0; i<res.result.length; i++){
							var addr_name = res.result[i].addr_name;
							var cd = res.result[i].cd;
							
							if(objId == "sggSelect"){
								cd = cd.substring(2,5);
							}else if(objId = "emdSelect"){
								cd = cd.substring(5,7);
							} 
							
							var x_coor = res.result[i].x_coor;
							var y_coor = res.result[i].y_coor;
							
							var str="<option value="+ cd + " data-x=" + x_coor + " data-y=" + x_coor   +">" + addr_name + "</option>";
							/*
							<option value="00" data-x="990480.875" data-y="1815839.375">전국</option>
							 */
							$("#" + objId).append(str);
						}
					}
				},
				error: function(e) {}
			});
	}
	
	</script>
	</head>
	<body>
		<div class="Btn_Top" style="height:0px;"><!-- 화면에 안보이도록 조치함 -->
			<nav style="display:none;"><a class="Btn_Top1" onclick="$thematic.event.showItemBox();">통계목록</a><a id="map-area-button" class="Btn_Top2 M_on">지도</a><a id="chart-area-button" class="Btn_Top4 NoneAction">차트</a><a id="table-area-button" class="Btn_Top5 NoneAction">표</a></nav>
		</div>
		<%@include file="/WEB-INF/jsp/map/thematic/item.jsp" %>
		<p class="SelectArea" >  <!-- style="z-index:1003;" --> 
			<select id="map-navigator-sido" onchange="javascript:changeSido();"></select>
			<select id="map-navigator-sgg"  onchange="javascript:changeSgg();"></select>
			<select id="map-navigator-emdong" onchange="javascript:changeEmd();"></select>
			<c:set var="navigatorEvent">
				<c:choose>
					<c:when test="${thematicInfo.themaMapType=='06' }">
						$partitionMap.ui.leftmap.mapNavigation.move();
					</c:when>
					<c:otherwise>
						$singleMap.ui.map.mapNavigation.move();
					</c:otherwise>
				</c:choose>
			</c:set>
			<button class="btn_search" type="button" onclick="${navigatorEvent}">조회</button>
		</p>
		<div class="MapArea">
			<div id="map-title" class="MapTitle" style="display: block;">
				<h3></h3>
				<span class="MapTitleBg">&nbsp;</span>
			</div>
			<div class="Map">
				<%/*
					thematicInfo.themaMapType에 따른 테마주제도
					01 : 삭제될 타입
					02 : 예전 타입인데 pplDistHeat(인구분포현황) 을 제외한 나머진 사용하지 않음
					03 : 색상
					04 : 증감
					05 : 시계열
					06 : 분할뷰
					07 : POI
				*/%>
				<c:choose>
					<c:when test="${heumTag:matches(thematicInfo.themaMapType,'0(1|2)') }">
						<c:set var="javascriptFileName" value="${fn:substring(thematicInfo.statThemaMapFileUrl,heumTag:lastIndexOf(thematicInfo.statThemaMapFileUrl,'/')+1,heumTag:lastIndexOf(thematicInfo.statThemaMapFileUrl,'.')) }"/>
						<c:choose>
							<c:when test="${javascriptFileName=='pplDistHeat' }">
								<script src="${ctx }/resources/js/map/thematic/old/${javascriptFileName }.js"></script>
								<div id="map"></div>
							</c:when>
							<c:otherwise>
								모바일에선 확인 할 수 없습니다
							</c:otherwise>
						</c:choose>
					</c:when>
					<c:when test="${heumTag:matches(thematicInfo.themaMapType,'0(3|4|5|7)') }">
						<script src="${ctx }/resources/js/map/thematic/singleMap.js"></script>
						<div id="map"></div>
					</c:when>
					<c:when test="${thematicInfo.themaMapType=='06' }">
						<script src="${ctx }/resources/js/map/thematic/partitionMap.js"></script>
						<div id="map-box" class="horizontal">
							<div id="leftmap"></div>
							<div id="rightmap"></div>
						</div>
					</c:when>
					<c:otherwise>
						<div class="empty-box">
							<div style="height:100vh;">
								${thematicInfo.themaMapType } : 새로운 타입입니다. 작업이 필요합니다
							</div>
						</div>
					</c:otherwise>
				</c:choose>
			</div>
			
			<div id="chart-area" style="display: none;">
				<div class="Open_Type1" style="top:0px; position:absolute;">
					<h3 id="chartTitleArea">차트</h3>
					<button class="chartAreaCloseBtn">차트닫기</button>
				</div>
				<button class="chartDataToggleBtn" style="display:none;">토글</button>
				<span class="chartAreaTit"></span>
				<div class="chart" ></div>
			</div>
			<div id="barchart-area"></div>
		</div>
			
		<div class="menuListToggle1 control_btn service" title="메뉴" >서비스메뉴</div>
		<!--통계주제도-->
		<ul class="itemArea1 service_item" style="display:none;">
			<li class="thematic01 themeEvent CTGR_001"><a href="#" class="statList CTGR_001">인구와 가구</a></li>
			<li class="thematic02 themeEvent CTGR_002"><a href="#" class="statList CTGR_002">주거와 교통</a> </li>
			<li class="thematic03 themeEvent CTGR_003"><a href="#" class="statList CTGR_003">복지와 문화</a></li>
			<li class="thematic04 themeEvent CTGR_004"><a href="#" class="statList CTGR_004">노동과 경제</a></li>
			<li class="thematic05 themeEvent CTGR_005"><a href="#" class="statList CTGR_005">환경과 안전</a></li>
			<!--<li class="close"><a href="#">메뉴닫기</a></li>-->
		</ul>
		<div id="chartTableArea" class="control_item control_btn chart" title="데이터보드" style="display:none;">데이터보드</div>
			
	</body>
</html>