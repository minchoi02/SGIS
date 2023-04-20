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
		//SGIS소개
		if(menuType == 'intro1') { x = 0; y = 0; }
		else if(menuType == 'intro2') { x = 0; y = 1; }
		//설명과공지
		else if(menuType == 'notice') { x = 1; y = 0; }
		else if(menuType == 'word') { x = 1; y = 1; }
		//자료시점현황 (20200714 이금은)
		else if(menuType == 'table') { x = 2; y = 1; }
		//mng_s 20190321_김건민 (자료신청 서비스랑 위치 바꿈 )
		
		//질문과개선요청
		else if(menuType == 'faq') { x = 3; y = 0; }
		else if(menuType.toLowerCase() == 'qna') { x = 3; y = 1; }
		else if(menuType.toLowerCase() == 'thema') { x = 3; y = 2; }
		//mng_e 20190321_김건민 (자료신청 서비스랑 위치 바꿈 )
		
		//자료제공서비스 (20200714 이금은 - 대메뉴로 위치 이동되면서 '알림마당'에서 삭제될 예정)
		else if(menuType == 'sc0502'  ) { x = 4; y = 0; }
		else if(menuType == 'sc05'    ) { x = 4; y = 1; }
		else if(menuType == 'sc0503' || menuType == 'sc0503past'  ) { x = 4; y = 2; }
		else if(menuType == 'sc050301') { x = 4; y = 3; }
		else if(menuType == 'sc0501'  ) { x = 4; y = 4; }
		
		var el = $('.aside').children('ul').children('li') 
		el.eq(x).children('a').attr('class', 'on');
		el.eq(x).children('ul').css('display', 'block');
		el.eq(x).children('ul').children('li').eq(y).children('a').attr('class', 'on');
	});
</script>
<!--lnb 시작-->
<aside class="aside">
	<h2 class="title"><span>알림마당</span></h2>
	<ul>
		<li><a href="/view/board/sopIntro01">SGIS플러스 소개</a>
			<ul>
				<li><a href="/view/board/sopIntro01">SGIS플러스 소개 및 연혁</a></li>
				<li><a href="/view/board/sopIntro02">SGIS플러스 주요 서비스 안내</a></li>
			</ul>
		</li>
		<li><a href="/view/board/expAndNotice">설명과 공지</a>
			<ul>
				<li><a href="/view/board/expAndNotice">공지사항</a></li>
				<li><a href="/view/board/expAndNoticeStatsWord">주요 용어 설명</a></li>
<!-- 				<li><a href="/view/board/expAndNoticeOfferTableList">SGIS플러스 서비스<br/>&nbsp;&nbsp;자료제공 시점 현황</a></li> -->
			</ul>
		</li>
		<li><a href="/view/board/expAndNoticeOfferTableList">자료 시점 현황</a>
			<ul>
				<li><a href="/view/board/expAndNoticeOfferTableList">SGIS플러스 서비스<br/>&nbsp;&nbsp;자료 시점 현황</a></li>
			</ul>
		</li>
		<!-- mng_s 20190321_김건민 (자료신청 서비스랑 위치 바꿈 )-->
		<li><a href="/view/board/qnaAndRequestFaq">질문과 개선요청</a>
			<ul>
				<li><a href="/view/board/qnaAndRequestFaq">FAQ</a></li>
				<li><a href="/view/board/qnaAndRequestQna">Q&A</a></li>
				<li><a href="/view/board/qnaAndRequestThema">통계주제도 신규 요청</a></li>
			</ul>
		</li>
		<!-- mng_e 20190321_김건민 -->
		
		<!--mng_s 20200721 이진호 / 자료신청 서비스 알림마당에서 삭제-->
		<!--<li><a href="/contents/shortcut/shortcut_05_02.jsp">자료신청 서비스</a>-->
			<!--<ul>-->
				<!--<li><a href="/contents/shortcut/shortcut_05_02.jsp">자료신청 서비스란?</a></li>-->
				<!--<li><a href="/contents/shortcut/shortcut_05.jsp">자료신청 목록</a></li>-->
				<!--<li><a href="/contents/shortcut/shortcut_05_03_step01.jsp">자료신청</a></li>-->
				<!-- <li><a href="/contents/shortcut/shortcut_05_03_past_year.jsp">과거집계구 자료신청</a></li> -->
				<!--<li><a href="/contents/shortcut/shortcut_05_03_01.jsp">신청내역</a></li>-->
				<!--<li><a href="/contents/shortcut/shortcut_05_01.jsp">자료다운로드</a></li>-->
			<!--</ul>-->
		<!--</li>-->
		<!--mng_e 20200721 이진호-->
	</ul>
</aside>
<!--//lnb 끝-->