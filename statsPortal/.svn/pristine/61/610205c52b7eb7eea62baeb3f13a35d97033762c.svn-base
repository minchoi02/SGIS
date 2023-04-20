<%
/**************************************************************************************************************************
* Program Name  : 대화형 통계지도 JSP  
* File Name     : interactiveMap.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.List" %> 
<%@ page import="org.json.JSONObject" %> 
<%@ page import="org.json.JSONArray" %> 
<%@ page import="kostat.sop.ServiceAPI.common.security.Security" %>

<!DOCTYPE html>
<html lang="ko">
	<head>
	    <meta charset="utf-8" />
		<meta name="format-detection" content="telephone=no" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<title>대화형 통계지도 | 통계지리정보서비스</title>
		<link rel="stylesheet" type="text/css" href="/css/sub-main.css" />
		<link rel="stylesheet" type="text/css" href="/css/common.css" /> 
		<script src="/js/common/includeHead.js"></script>
		<script src="/js/plugins/slick.min.js"></script>    
    	<script src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>
    	<script src="/js/common/common.js"></script>
  
    	<script>
	    	
			$(document).ready(function(){
				
				srvLogWrite("C0", "01", "01", "00", "", "");		//메인 뷰
				
				var sopPortalNoticeObj = new sop.portal.expAndNotice.api();
				sopPortalNoticeObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/board/boardListTop3.json"
				});
				
				$('ul#mainImgHref').children('li').each(function(i, e) {
					$(this).on('click', function() {
						var href = $(this).find('a').attr('href');
						window.location.href = href;
					});
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
    		ul#mainImgHref li {cursor: pointer;}
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
						<li>대화형 통계지도</li>
					</ul>
					<a class="home_btn" href='<c:url value="/view/index"/>'></a>
					<h1 class="sub-title">대화형 통계지도</h1>
					<p>다양한 통계항목을 사용자 조건에 맞게 검색할 수 있는 맞춤형 소지역 통계검색서비스를 제공합니다.</p>
				</div>
				<div id="contents" class="view">
					<div class="notice-area">
						<ul id="mainImgHref">
							<li>
								<p><img src="/images/contents/application_01.png" alt="정책통계지도"></p>
								<dl>
									<dt>총조사 주요지표</dt>
									
									<!-- mng_s 20200811 이진호 / 문구 수정 -->
									<!--<dd>총조사 결과 중 주요지표에 대한 통계조회 서비스. </dd> -->
									<dd>총조사 결과 중 주요지표에 대한 통계조회 서비스 </dd>
									<!-- mng_e 20200811 이진호 -->
									
									<dd style="margin-bottom: 0"><a href="/view/map/interactiveMap/mainIndexView" class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a></dd>								</dl>
							</li>
							<li >
								<p><img src="/images/contents/application_02.png" alt="인구주택총조사"></p>
								<dl>
									<dt>인구주택총조사</dt>
									<dd>인구 · 가구 · 주택 항목 및 결합조건 통계조회 서비스 </dd>
									<dd style="margin-bottom: 0"><a href="/view/map/interactiveMap/populationHouseView" class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a></dd>
								</dl>
							</li>
							<li>
								<p><img src="/images/contents/application_03.png" alt="농림어업총조사"></p>
								<dl>
									<dt>농림어업총조사</dt>
									<dd>농림 · 임가 · 어가에 대한 가구 및 가구원 통계조회 서비스</dd>
									 <dd style="margin-bottom: 0"><a href="/view/map/interactiveMap/3fView" class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a></dd>
								</dl>
							</li>
							<li >
								<p><img src="/images/contents/application_04.png" alt="전국사업체조사"></p>
								<dl>
									<dt>전국사업체조사</dt>
									<dd>표준산업분류 및 생활밀접업종에 대한 통계조회 서비스</dd>
									<dd style="margin-bottom: 0"><a href="/view/map/interactiveMap/companyView" class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a> </dd>
								</dl>
							</li>
							<li>
								<p><img src="/images/contents/application_05.png" alt="e-지방지표"></p>
								<dl>
									<dt>e-지방지표</dt>
									<dd>e-지방지표 통계조회 서비스</dd>
									
									<!-- mng_s 20200814 이진호 / br 추가 -->
									</br>
									<!-- mng_e 20200814 이진호 -->
									
									<dd style="margin-bottom: 0"><a href="/view/map/interactiveMap/ecountryView" class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a></dd>
								</dl>
							</li>
							<li>
								<p><img src="/images/contents/application_06.png" alt="공공데이터"></p>
								<dl>
									<dt>공공데이터</dt>
									<dd>위치중심 공공데이터 정보서비스 </dd>
									<dd style="margin-bottom: 0"><a href="/view/map/interactiveMap/publicDataView" class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a></dd>
								</dl>
							</li>
							<li>
								<p><img src="/images/contents/application_07.png" alt="나의데이터"></p>
								<dl>
									<dt>나의데이터</dt>
									<dd>SGIS회원 지도정보공개 및 공유 서비스 </dd>
									<dd style="margin-bottom: 0"><a href="/view/map/interactiveMap/userDataView" class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a></dd>
								</dl>
							</li>
						</ul>
					</div>
				</div>
				<aside class="sub-main aside">
						<ul class="right-aside">
						<li class="banner-box"> <strong>대화형 통계지도 정보검색이 어려우신가요?</strong>
							<p>기본 사용법을 튜토리얼로 안내해드립니다.</p><!--2019-03-05 박길섭--> 
							<a href="/view/map/interactiveMap?tutorial_mode" class="on"><span>시작하기</span></a> </li>
						<li class="faq-area">
							<h3>자주묻는 질문</h3>
							<ul id="faq-list">
								<li><a href="/view/board/qnaAndRequestFaq" class="btn-more"><span class="hidden" style="font-size: 0px;">더보기</span></a></li><!--2019.03.01 박길섭--> 
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