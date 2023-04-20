<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
		<meta charset="utf-8" />
	<meta name="format-detection" content="telephone=no" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>활용서비스 | 통계지리정보서비스</title>
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
					//console.log("onSuccess");
					//console.log(status);
					//console.log(res);
					var html = '';
					$(res.result.summaryList).each(function(index , elem){
						//console.log(elem);
						html += '<li><a href="/view/board/faqView?post_no='+elem.post_no+'&boardType=faq"><span>Q</span>';//190228 방민정수정
						//html += '<li><a href="/view/board/faqView?post_no='+elem.post_no+'&boardType=Qna"><span>Q</span>';
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
						<li>활용서비스</li>
					</ul>
					<a class="service_home_btn" href='<c:url value="/view/index"/>'></a>
					<h1 class="sub-title">활용서비스</h1>
					<p>지도와 함께 만들어지는 각종 통계서비스와 콘텐츠를 제공합니다.</p>
				</div>
				<div id="contents" class="view">
					<div class="notice-area">
						<ul id="mainImgHref">
							<li>
								<p><img src="/images/contents/application_08.png" alt="일자리 맵"></p>
								<dl>
									<dt>일자리 맵</dt>
									<!-- 190305 방민정 수정 시작-->
									<!-- <dd>지역별 일자리 현황과 추이를 한눈에! 정책결지원 및 생활 밀착형 정보 제공 </dd>-->
									<dd  style="letter-spacing: -2px;">지역별 일자리 현황과 추이를 지도위에서 조망하는 생활 밀착형 서비스</dd>
									<!-- <dd style="margin-bottom: 0"><a href="javascript:alert('준비중');" class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a></dd>-->
									<dd style="margin-bottom: 0"><a href="/view/workRoad/main" class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a></dd>
									<!-- 190305 방민정수정 끝 -->
								</dl>
							</li>
							<li>
								<p><img src="/images/contents/application_09.png" alt="살고싶은 우리동네"></p>
								<dl>
									<dt>살고싶은 우리동네</dt>
									<dd>원하는 조건에 맞는 주거지역을 추천해주는 서비스 </dd>
									<dd style="margin-bottom: 0"><a href="/view/house/houseAnalysisMap" class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a></dd>
								</dl>
							</li>
							<li>
								<p><img src="/images/contents/application_10.png" alt="업종통계지도"></p>
								<dl>
									<dt>업종통계지도</dt>
									<dd>지역별 생활/기술업종에 대한 특성정보를 제공하는 서비스</dd><!--박길섭 수정  -->
									<dd style="margin-bottom: 0"><a href="/view/bizStats/bizStatsMap?biz=0" class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a></dd>
								</dl>
							</li>
							<li>
								<p><img src="/images/contents/application_11.png" alt="정책통계지도"></p>
								<dl>
									<dt>정책통계지도</dt>
									<dd>정책지도를 통해 지역사회의 정책결정에 도움을 제공하는 서비스</dd>
									<dd style="margin-bottom: 0"><a href="/view/map/policyStaticMap" class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a></dd>
								</dl>
							</li>
							<li>
								<p><img src="/images/contents/application_12.png" alt="지역현안 소통지도"></p>
								<dl>
									<dt>지역현안 소통지도</dt>
									<dd>지역구성원 참여를 통한 지역 이슈 공유 및 커뮤니티 지원서비스</dd>
									<dd style="margin-bottom: 0"><a href="/view/community/intro" class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a></dd>
								</dl>
							</li>
							<li class="policy-box">
								<p><img src="/images/contents/application_13.png" alt="통계지도체험"></p>
								<dl>
									<dt>통계지도체험</dt>
									<dd>공간데이터를 지도위에 시각적, 공간적으로 직접 체험<br> 해보는 서비스 </dd>
									<dd style="margin-bottom: 0"><a href="/statexp/index.html" class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a></dd>
								</dl>
							</li>
							<li class="policy-box">
								<p><img src="/images/contents/application_14.png" alt="통계갤러리"></p>
								<dl>
									<dt>통계갤러리</dt>
									<dd>통계포털 서비스에서 수집한 통계정보 공유서비스 </dd>
									<dd style="margin-bottom: 0"><a href="/view/gallery/resultGallery" class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a></dd>
								</dl>
							</li>
						</ul>
					</div>
				</div>
				<aside class="sub-main aside">
					<ul class="right-aside">
						<!-- 190305 방민정수정 시작 
						<li class="banner-box"> <strong>활용서비스 정보검색이 어려우신가요?</strong>
							<p>초보자를 위한 맞춤형 검색을 통해 원하는 통계지도 정보를 찾기까지 안내해드립니다.</p>
							<a href="/view/map/policyStaticMap?tutorial_mode" class="start-button"><span>시작하기</span></a> </li>
							190305 방민정수정 끝-->
						<li class="faq-area">
							<h3>자주묻는 질문</h3>
							<ul id="faq-list">
								<li><a href="/view/board/qnaAndRequestFaq" class="btn-more"><span class="hidden" style="font-size: 0px;">더보기</span></a></li><!--190228 방민정수정 -->
								<!-- <li><a href="/view/board/qnaAndRequestQna" class="btn-more"><span class="hidden" style="font-size: 0px;">더보기</span></a></li> --> 
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