<%
/**************************************************************************************************************************
* Program Name  : 알림마당 JSP  
* File Name     : sopBoardMain.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-17
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="utf-8" />
	<meta name="format-detection" content="telephone=no" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>알림마당 | 통계지리정보서비스</title>
	<link rel="stylesheet" type="text/css" href="/css/sub-main.css" />
	<link rel="stylesheet" type="text/css" href="/css/common.css" /> 
	<script src="/js/common/includeHead.js"></script>
	<script src="/js/plugins/slick.min.js"></script>    
   	<script src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>
   	<script src="/js/common/common.js"></script>
   	<script>
    	
		$(document).ready(function(){
			var sopPortalNoticeObj = new sop.portal.expAndNotice.api();
			sopPortalNoticeObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/board/boardListTop3.json"
			});
			
			$('ul#mainImgHref').children('li').each(function(i, e) {
				if(i < 3) {
					$(this).on('click', function() {
						var href = $(this).find('a').attr('href');
						window.location.href = href;
					});
				}
			});
		});
		
		(function() {
			
			$class("sop.portal.expAndNotice.api").extend(sop.portal.absAPI).define(
			{
				onSuccess : function(status, res) {
					console.log("onSuccess");
					console.log(status);
					console.log(res);
					var html = '';
					$(res.result.summaryList).each(function(index , elem){
						console.log(elem);
						html += '<li><a href="/view/board/faqView?post_no='+elem.post_no+'&boardType=faq"><span>Q</span>';//190228 방민정수정
						//html += '<li><a href="/view/board/qnaView?post_no='+elem.post_no+'&boardType=Qna"><span>Q</span>';
						html += elem.post_title;
						html += '</a></li>';
						
					});
					
					$("#faq-list").before(html);
				},
				onFail : function(status) {
				}
			});
		}());
   	</script>
   	<style>
   		ul#mainImgHref li:nth-child(1), ul#mainImgHref li:nth-child(2), ul#mainImgHref li:nth-child(3) {cursor: pointer;}
   	</style>
</head>
<body>
	<div id="wrap">
		<header>
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>
		<div id="container" class="sub-main">
			<div class="sub-main-contents">
				<div id="title-area">
					<ul class="location">
						<li>알림마당</li>
					</ul>
					<a class="anal_home_btn" href='<c:url value="/view/index"/>'></a>
					<h1 class="sub-title">알림마당</h1>
					<p>SGIS의 다양한 소식과 정보를 제공하는 공간입니다.</p>
				</div>
				<div id="contents" class="view">
					<div class="notice-area">
						<ul id="mainImgHref">
							<li>
								<p><img src="/images/contents/application_20.png" alt="SGIS플러스 소개"></p>
								<dl>
									<dt>SGIS플러스 소개
									</dt>
									<dd>SGIS서비스 소개 및 주요서비스 안내정보 제공</dd>
									<dd><a href="/view/board/sopIntro01" class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a></dd>
								</dl>
							</li>
							<li>
								<p><img src="/images/contents/application_21.png" alt="설명과 공지"></p>
								<dl>
									<dt>설명과 공지</dt>
									<dd>SGIS에서 사용되는 통계용어와 공지사항 제공</dd>
									<dd><a href="/view/board/expAndNotice" class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a></dd>
								</dl>
							</li>
							<li>
								<p><img src="/images/contents/application_22.png" alt="질문과 개선요청"></p>
								<dl>
									<dt>질문과 개선요청</dt>
									<dd>자주하는 질문 및 SGIS에 대한 문의사항 및 요청사항 등록서비스 제공
									</dd>
									<dd><a href="/view/board/qnaAndRequestFaq"    class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a></dd>
								</dl>
							</li>
							<!-- <li class="block-box"> -->
								<!-- <div> -->
									<!-- <p><img src="/images/contents/application_23.png" alt="자료신청"></p> -->
									<!-- <dl> -->
										<!-- <dt>자료신청</dt> -->
										<!-- <dd>SGIS에서 제공하는 자료신청 및 현황정보 제공</dd> -->
									<!-- </dl> -->
								<!-- </div> -->
								<!-- <ul class="button-list-right"> -->
									<!-- <li><a href="/contents/shortcut/shortcut_05_02.jsp"><span>자료신청이란?</span></a></li> -->
									<!-- <li><a href="/contents/shortcut/shortcut_05.jsp"><span>자료제공목록</span></a></li> -->
									<!-- <li><a href="/contents/shortcut/shortcut_05_03_step01.jsp"><span>자료신청</span></a></li> -->
									<!-- <li><a href="/contents/shortcut/shortcut_05_01.jsp"><span>자료다운로드</span></a></li> -->
								<!-- </ul> -->
							<!-- </li> -->
						</ul>
					</div>
				</div>
				<aside class="sub-main aside">
					<ul class="right-aside">
<!-- 						<li class="banner-box"> <strong>알림마당 정보검색이 어려우신가요?</strong> -->
<!-- 							<p>초보자를 위한 맞춤형 검색을 통해 원하는 통계지도 정보를 찾기까지 안내해드립니다.</p> -->
<!-- 							<a href="javascript:alert('링크연결할때가 없음 토튜리얼이 없음');" class="start-button"><span>시작하기</span></a>  -->
<!-- 						</li> -->
						<li class="faq-area">
							<h3>자주묻는 질문</h3>
							<ul id="faq-list">
								<li style="position:unset;margin-top:0;">
									<a href="/view/board/qnaAndRequestFaq" class="btn-more"><!-- 190228 방민정수정 -->
									<!-- <a href="/view/board/qnaAndRequestQna" class="btn-more">-->
										<span style="margin:0;padding:0;width:0;height:0;line-height:0;overflow:hidden;font-size:0;">더보기</span>
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</aside>
			</div>
		</div>
		<footer id="footer" class="main">
			<jsp:include page="/view/common/includeBottom"></jsp:include>
		</footer>
	</div>
</body>
</html>