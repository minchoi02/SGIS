<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<title>지역현안 소통지도</title>
		<meta name="title" content="지역현안 소통지도">
		<link rel="stylesheet" href="${ctx }/resources/css/map/community.css" />
		<link rel="stylesheet" href="${ctx }/resources/css/map/community_intro.css" />
		<script>var defaultAdmCd = "${community.adm_cd}",communityForm=false,mapList = ${community.mapListJson },communityMapInfo = ${heumTag:convertJson(community)};</script>
		<link rel="stylesheet" href="${ctx }/resources/plugins/Swiper-3.3.1/css/swiper.min.css"/>
		<!-- 
		<script src="${ctx }/resources/plugins/Swiper-3.3.1/js/swiper.jquery.min.js"></script>
		 -->
		<script src="${ctx }/resources/plugins/Swiper-3.3.1/js/swiper.min.js"></script>
		<script src="${ctx }/resources/js/map/community/view.js"></script>
		<script src="${ctx }/resources/js/map/community/map/communityMap.js"></script>
		<script src="${ctx }/resources/js/map/community/map/communityMapPoi.js"></script>
		<script src="${ctx }/resources/js/map/community/map/communityMapApi.js"></script>
	</head>
	<body>
		<div id="map-container" class="ContArea Community_Insert" style="padding:0;">
			<div class="Community_cont">
				<div id="community-info" class="MapInfo" style="position:absolute; z-index:9999; width:100%; margin-top:-10px; left:0px;">
							
					<h3>${community.cmmnty_map_nm }<span id="upDownArrow" style="background:url(${ctx }/resources/images/community/a_down.png);"></span></h3> 
									
					<div id="opinionRegistArea" style="display:none;">
								<div class="MapInfo_Detail">
								<p class="subtitle">${community.intrcn }</p>
								<p class="detail"> 개설자 : ${community.usr_id } &nbsp;|&nbsp; 개설일 : ${community.reg_date } &nbsp;|&nbsp; 참여인원: ${community.join_cnt }명</p>
								<span id="community-info-photo" class="Image" style="background-color:#fff;">이미지</span>
								<script>
								$("<img/>",{src:"${sgisCtx}${fn:replace(community.path_nm,'\\','/')}thumbnail/thumbnail-L-${community.save_file_nm}"}).load(function(){
									$("#community-info-photo").css({"background-image": "url(${sgisCtx}${fn:replace(community.path_nm,'\\','/')}thumbnail/thumbnail-L-${community.save_file_nm})"});
								});
								</script>
								<span class="Social">
									<c:url var="facebookShare" value="https://www.facebook.com/sharer/sharer.php"><c:param name="u" value="${currentUrl }"/></c:url>
									<c:url var="twitterShare" value="https://twitter.com/intent/tweet"><c:param name="url" value="${currentUrl }"/></c:url>
									<a href="${facebookShare }" class="sns_fb" target="_BLANK">페이스북</a>
									<a href="${twitterShare }" class="sns_tw" target="_BLANK">트위터</a>
								</span>
							</div>
							<fmt:parseDate var="endDate" value="${community.prid_estbs_end_date}" pattern="yyyy.MM.dd" />
							<jsp:useBean id="now" class="java.util.Date" />
							<c:choose>
								<c:when test="${endDate < now }">
									<button class="btn_insert" id="poi-register-end-button">의견 등록하기</button>
								</c:when>
								<c:when test="${community.regist_yn=='Y'||heumTag:matches(community.cmmnty_partcptn_grant_yn,'M|P|A') }">
									<button class="btn_register" id="${loggedIn||heumTag:matches(community.cmmnty_partcptn_grant_yn,'M|P|A')?'poi-register-button':'poi-login-button' }">의견 등록하기</button>
								</c:when>
								<c:when test="${community.regist_yn=='D' }">
									<button class="btn_insert" id="${loggedIn?'poi-register-reject-button':'poi-login-button' }">소통지도 참여하기</button>
									<script>
										$("#poi-register-reject-button").click(function(){
											messageAlert.open("알림", "\"${community.cmmnty_map_nm }\"은 제한된 멤버만 참여 가능합니다. <br>참여승인 반려되었습니다");
										});
									</script>
								</c:when>
								<c:when test="${community.regist_yn=='W' }">
									<button class="btn_register" id="poi-register-wait-button">의견 등록하기</button>
								</c:when>
								<c:otherwise>
									<button class="btn_insert" id="${loggedIn?'poi-register-join-button':'poi-login-button' }">소통지도 참여하기</button>
								</c:otherwise>
							</c:choose>
					</div>
				</div>
			</div>
			<div id="map" style="top:11px;"></div>
			<div class="Community_map" style="width:100%; bottom:0px; position:absolute; z-index:9999;">
				<div class="CommunityList">
					<div id="all-community">
						<h4><a href="#" data-type="all" data-tab="true" style="z-index:11111; background-color:white;">등록자료 전체<span id="all-poi-count">0</span></a></h4>
						<div class="OpenArea" style="max-height:300px;">
							<div class="List" style="max-height:250px; margin-bottom:20px;"><ul></ul></div>
							<div class="Pasing"></div>
							<form id="community-search">
								<div class="ListSearch" style="width:calc(100% - 20px); bottom:5px; margin-top:5px; position:fixed;">
									<label for="community-keyword" class="Hidden">검색어입력</label>
									<input id="community-keyword" name="community-keyword" type="text" placeholder="검색어입력">
									<button type="submit">검색</button>
								</div>
							</form>
						</div>
					</div>
					<c:if test="${loggedIn&&!heumTag:matches(community.cmmnty_partcptn_grant_yn,'M|P|A') }">
						<div id="my-community">
							<h4><a href="#" data-type="my" data-tab="true">나의 등록자료<span id="my-poi-count">0</span></a></h4>
							<div class="OpenArea">
								<div class="List"><ul></ul></div>
								<div class="Pasing"></div>
							</div>
						</div>
					</c:if>
				</div>
				<c:if test="${(community.regist_yn=='Y'||community.regist_yn=='W')&&community.cmmnty_partcptn_grant_yn=='Y'&&fn:contains(community.approval_distinct,'A')}">
					<div class="Btn_Group">
						<button id="drop-user" type="button">탈퇴하기</button>
					</div>
					<script>
						$("#drop-user").click(function(){
							messageConfirm.open("알림","<span class='community_name'>${community.cmmnty_map_nm }</span><br>소통지도에 탈퇴 하시겠습니까?",[{
								title:"탈퇴하기",
								func : function() {
									$.ajax({
										type: "POST",
										url: contextPath+"/community/dropuser.json",
										data:{
											id : getParameter("id")
										},
										dataType: "json",
										async : false,
										success: function(res) {
											if(res.errCd=="0"){
												messageAlert.open("알림", "탈퇴 신청이 되었습니다.",function(){
													location.reload(true);
												});
											}else{
												messageAlert.open("알림", res.errMsg);
											}
										},
										error: function(xhr, status, errorThrown) {
											messageAlert.open("알림", errorMessage);
										}
									});
								}
							},{title:"취소하기"}]);
						});
					</script>
				</c:if>
			</div>
		</div>
		<%@include file="/WEB-INF/jsp/map/community/detail.jsp" %>
	</body>
</html>