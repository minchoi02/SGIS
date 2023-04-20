<%
/**************************************************************************************************************************
* Program Name  : 알림마당 Left Menu
* File Name     : includeLeftMenu.jsp
* Comment       : 알림마당 좌측메뉴 추가
* History       : 웨이버스 김성연 2018-07-30
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script>
	$(document).ready(function() {
		var x, y;
	
		if(menuType == 'sc0502'  ) 		{ x = 0; y = 0; }
		else if(menuType == 'sc05'    ) { x = 1; y = 0; }
		else if(menuType == 'sc0503' || menuType == 'sc0503past'  ) { x = 2; y = 0; }
		else if(menuType == 'sc0501'  ) { x = 3; y = 0; }
		else if(menuType == 'sc050301') { x = 4; y = 0; }
		
		var el = $('.aside').children('ul').children('li') 
		el.eq(x).children('a').attr('class', 'on');
		el.eq(x).children('ul').css('display', 'block');
		el.eq(x).eq(y).children('a').attr('class', 'on');
	});
</script>

<!-- mng_s 20200723 이진호 / on, off 일때 리스트 표시 img 제거 -->
<style>
	.aside > ul > li > a.on {
		background-image: none;
	}
	.aside > ul > li > a{
		background-image: none;
	}
	
	.aside > ul > li > a:last-child {
		border-bottom : none;
	}
</style>
<!-- mng_s 20200723 이진호 / on, off 일때 리스트 표시 img 제거 -->

<!--lnb 시작-->
<aside class="aside">
	<h2 class="title"><span>자료제공</span></h2>
	
	<ul>
	
		<!-- <li onclick="location.href='/contents/shortcut/shortcut_05_02.jsp';" style="cursor: pointer;"><a>자료제공 소개</a></li>
		<li onclick="location.href='/contents/shortcut/shortcut_05.jsp';" style="cursor: pointer;"><a>자료제공 목록</a></li>
		<li onclick="location.href='/contents/shortcut/shortcut_05_03_step01.jsp';" style="cursor: pointer;"><a>자료신청</a></li>
		<li onclick="location.href='/contents/shortcut/shortcut_05_01.jsp';" style="cursor: pointer;"><a>신청자료 다운로드</a></li>
		<li onclick="location.href='/contents/shortcut/shortcut_05_03_01.jsp';" style="cursor: pointer;"><a>신청내역</a></li> -->
		
		
		<!-- <li onclick="location.href='/view/shortcut/info';" style="cursor: pointer;"><a>자료제공 소개</a></li>
		<li onclick="location.href='/view/shortcut/shortcutList';" style="cursor: pointer;"><a>자료제공 목록</a></li>
		<li onclick="location.href='/view/shortcut/mapApp';" style="cursor: pointer;"><a>자료신청</a></li>
		<li onclick="location.href='/view/shortcut/dwonloadList';" style="cursor: pointer;"><a>신청자료 다운로드</a></li>
		<li onclick="location.href='/view/shortcut/appList';" style="cursor: pointer;"><a>신청내역</a></li> -->
		
		<li onclick="location.href='/view/pss/dataProvdIntrcn';" style="cursor: pointer;"><a>자료제공 소개</a></li>
		<li onclick="location.href='/view/pss/openDataIntrcn';" style="cursor: pointer;"><a>자료제공 목록</a></li>
		<li onclick="location.href='/view/pss/requestData';" style="cursor: pointer;"><a>자료신청</a></li>
		<li onclick="location.href='/view/pss/downloadList';" style="cursor: pointer;"><a>신청자료 다운로드</a></li>
		<li onclick="location.href='/view/pss/requstDataList';" style="cursor: pointer;"><a>신청내역</a></li>
	</ul>
	
	
</aside>
<!--//lnb 끝-->