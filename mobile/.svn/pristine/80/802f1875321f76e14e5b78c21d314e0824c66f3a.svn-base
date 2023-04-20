<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<%@page contentType="text/html; charset=UTF-8" %>
<div class="Footer">
	<p class="Footermenu">
		<c:choose>
			<c:when test="${loggedIn }">
				<a onclick="logout();">로그아웃</a> | 
				<a href="${ctx }/mypage.sgis">마이페이지</a> |
			</c:when>
			<c:otherwise>
				<a onclick="login();">로그인</a> | 
				<!--<a onclick="login('${ctx}/mypage.sgis');">마이페이지</a> |--> 
			</c:otherwise>
		</c:choose>
		<!--<a href="${ctx }/resources/helper/help_sgis_mobile.pdf">도움말</a>-->
		<!-- 
		<a href="${sgisCtx }/view/index?param=0">PC버전</a>
		 -->
		<a href="javascript:movePcMode();">PC버전</a>
		<script>
			function movePcMode(){
				srvLogWrite('M0','01', '08', '00', '', '');
				location.href = "${sgisCtx }/view/index?param=0";
			}
		</script> 
	</p>
	<p class="Copyright">ⓒStatistics Korea. All rights reserved.</p>
</div>