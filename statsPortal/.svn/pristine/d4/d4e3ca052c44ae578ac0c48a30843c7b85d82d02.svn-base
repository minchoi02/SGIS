<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html lang="ko" style="overflow: scroll;height: auto;">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<script>
		var defaultSido = "${command.area_estbs_sido_cd}";
		var defaultSgg = "${command.area_estbs_sgg_cd}";
		var defaultEmdong = "${command.area_estbs_emdong_cd}";
		var defaultCustomSymbolGroupId = "${command.custom_symbol_group_id}";
		var communityMapInfo = ${fn:trim(communityMapInfoJson)!=''?communityMapInfoJson:'null'};
	</script>
<%-- 	<link rel="shortcut icon" href="${pageContext.request.contextPath}/img/ico/n_favicon.png"/> --%>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/layout.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/nm.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/common.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/default.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jquery-ui-1.10.4.custom.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/wheelcolorpicker.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/map/interactiveFunc.css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/sgis_edu/resource/css/communityMap.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jquery.mCustomScrollbar.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/colorpicker/css/colpick.css">
	
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery-ui-1.10.3.custom.js"></script>  
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>  
	<script src="${pageContext.request.contextPath}/js/plugins/colorpicker/js/colpick.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.wheelcolorpicker.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/EasyTree/jquery.easytree.js"></script> 
	<script src="${pageContext.request.contextPath}/js/plugins/colResizable-1.5.min.js"></script> 
	<script src="${pageContext.request.contextPath}/js/plugins/highcharts/highcharts.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/highcharts/highcharts-more.js"></script>
	
	<script src="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.sha256.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/durian-v2.0.js"></script>
	<script src="${pageContext.request.contextPath}/sgis_edu/resource/js/communityMap/sop.portal.absAPI.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/map.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/common.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapNavigation.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.heum.validation.js"></script>
	<script src="${pageContext.request.contextPath}/sgis_edu/resource/js/communityMap/communityCommon.js"></script>
	<script src="${pageContext.request.contextPath}/sgis_edu/resource/js/communityMap/map/communityMap.js"></script>
	<script src="${pageContext.request.contextPath}/sgis_edu/resource/js/communityMap/map/communityMapApi.js"></script>
	<script src="${pageContext.request.contextPath}/sgis_edu/resource/js/communityMap/communityForm.js"></script>
	<script src="${pageContext.request.contextPath}/js/board/jquery.paging.js"></script>
	<script src="${pageContext.request.contextPath}/sgis_edu/resource/js/communityMap/communityCreateHistory.js"></script>
	<script src="${pageContext.request.contextPath}/js/interactive/interactiveMapBtn.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapInfo/publicDataBoard.js"></script>
	
	<script src="${pageContext.request.contextPath}/js/thematicMap/thematicMap_api.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/Draw.Feature.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/Draw.Control.Manager.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/draw/Draw.Cricle.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/draw/Draw.Rectangle.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/draw/Draw.Polygon.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/Draw.Control.Overlay.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/measure/Draw.AreaMeasure.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/measure/Draw.DistanceMeasure.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/Draw.Control.Distance.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/Draw.Control.Poi.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/poi/Poi.InteractiveMap.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapDraw/Draw.Control.Measure.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/mapInfo/legendInfo.js"></script>

	<style>
		.mousewheel{margin-left:10px;text-align:center;z-index:10;border-radius:50%;position:absolute;width:25px;height:25px;overflow:hidden;background-color:#28425b;color:#fff;}
		.mousewheel:before{content:"";width:25px;height:25px;overflow:hidden;background:url(/img/ico/ico_moveType02.png) no-repeat 0 0;margin-left:-4px;margin-top:-2px;display:block;}
	</style>
</head>

<body>
	<header>
		<jsp:include page="/view/edu/${ss_school_level}/community/header"></jsp:include>
		<title>함께하는지도 만들기</title>
	</header>
	<c:if test="${fn:trim(error.fileSearch)!='' }">
		<script>
			$communityMapCommon.alert("알림", "${error.fileSearch}");			
		</script>
	</c:if>
	<form id="community-form" style="border:1px solid #ddd;">
		<c:if test="${fn:trim(param.cmmnty_map_id)!=''}">
			<input type="hidden" name="cmmnty_map_id" value="${param.cmmnty_map_id }">
		</c:if>
		<div id="container">
			<c:set var="appendPath" scope="request">
				<a href="#"><span class="path_el current">함께하는지도 만들기</span></a>
			</c:set>
			<jsp:include page="/view/edu/${ss_school_level}/community/communityPath"/>
			<h2 class="ctit">함께하는지도 만들기</h2>
			<a class="go-helper" href="${pageContext.request.contextPath}/view/newhelp/community_help_3_1">만들기 도움말</a>
			<div id="contents">
				<div id="content">
					<div class="cm_make">
						<h2><img src="${pageContext.request.contextPath}/img/community/cm_make_step1.png" alt="스텝1">만들기 기본정보</h2>
						<jsp:include page="/view/edu/${ss_school_grade}/community/form/layerPopup/step1"/>
						<jsp:include page="/view/edu/${ss_school_grade}/community/form/layerPopup/step2"/>
						<p id="submit-button-group" class="Btn_Group">
							<c:if test="${command.temp_save_yn=='Y' }">
								<button id="temp-delete-submit" type="button">임시저장삭제</button>
							</c:if>
							<c:if test="${fn:trim(command)==''||command.temp_save_yn=='Y' }">
								<button id="temp-submit" type="button" style="background:#888;">임시저장</button>
							</c:if>
							<button type="submit">만들기 완료</button>
							<button type="button" onclick='location.href="${introUrl}";' style="background:#888;">취소하기</button>
						</p>
					</div>
				</div>
			</div>
		</div>
	</form>
	<footer id="footer" style="margin-top:0px !important;">
		<%-- <jsp:include page="/view/common/includeBottom"></jsp:include> --%>
	</footer>
	<div id="map_remark_1" class="map_remark" style="display:none;">
		<div class="map_location">
			<div id="mapNavi_1"></div>
		</div>
	</div>
	<div id="bookmarkdlg" class="popBox"style="display: none; z-index: 20001;">
		<div class="topbar">
			<span>조회한 통계결과 My Page 저장하기</span> 
			<a onclick="$('.deem').hide();$('#bookmarkdlg').hide();return false;">닫기</a>
		</div>
		<div class="popContents">
			<ul class="listFormPop">
				<li>
					<label for="savesubj" class="label">저장제목 :</label> 
					<input type="text" id="savesubj" class="inp" maxlength="100" placeholder="저장제목을 작성해주세요"/>
				</li>
			</ul>
			<div class="btnBox">
				<a id="history-save-button" class="btnStyle01">My Page 저장</a> 
				<a onclick="$('.deem').hide();$('#bookmarkdlg').hide();return false;" class="btnStyle01">닫기</a>
			</div>
		</div>
	</div>
	<div class="deem" style="display: none;"></div>
</body>

</html>