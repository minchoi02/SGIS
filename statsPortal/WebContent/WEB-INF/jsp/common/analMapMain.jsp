<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="utf-8" />
	<meta name="format-detection" content="telephone=no" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>분석지도 | 통계지리정보서비스</title>
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
				if(i > 0) {
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
						//console.log(elem);
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
   		ul#mainImgHref li:nth-child(2), ul#mainImgHref li:nth-child(3),
   		ul#mainImgHref li:nth-child(4), ul#mainImgHref li:nth-child(5) {cursor: pointer;}
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
						<li>분석지도</li>
					</ul>
					<a class="anal_home_btn" href='<c:url value="/view/index"/>'></a>
					<h1 class="sub-title">분석지도</h1>
					<p>지도와 함께 통계를 볼 수 있는 공간입니다.</p>
				</div>
				<div id="contents" class="view">
					<div class="notice-area">
						<ul id="mainImgHref">
							<li class="anal-box">
								<p><img src="/images/contents/application_15.png" alt="월간통계"></p>
								<dl>
									<dt>월간통계</dt>
									<dd>소비자물가지수, 실업률등<br> 월간통계 서비스</dd>
									<dd style="margin-bottom: 0"><ul class="button-list">
										<li><a href="/funny_month/month/sta_month_main.do?monthEleId=a1"><span>고용동향</span></a></li>
										<li><a href="/funny_month/month/sta_month_main.do?monthEleId=b1"><span>산업활동동향</span></a></li>
										<li><a href="/funny_month/month/sta_month_main.do?monthEleId=c1"><span>소비자물가동향</span></a></li>
										<li><a href="/funny_month/month/sta_month_main.do?monthEleId=d1"><span>인구동향</span></a></li>
									</ul></dd>
								</dl>
							</li>
							<li>
								<p><img src="/images/contents/application_16.png" alt="인구피라미드"></p>
								<dl>
									<dt>인구피라미드</dt>
									<dd>추계인구 기반 인구구조 변화를 피라미드 모양으로 시각화한 서비스 </dd>
									<dd style="margin-bottom: 0"><a href="/jsp/pyramid/pyramid1.jsp" class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a></dd>
								</dl>
							</li>
							<li>
								<p><img src="/images/contents/application_17.png" alt="고령화 현황보기"></p>
								<dl>
									<dt>고령화 현황보기</dt>
									<dd>고령화 현황, 추세, 복지시설에 대한 통계제공 서비스</dd>
									<dd style="margin-bottom: 0"><a href="/publicsmodel/" class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a></dd>
								</dl>
							</li>
							<li class="mrg-left">
								<p><img src="/images/contents/application_18.png" alt="성씨분포"></p>
								<dl>
									<dt>성씨분포</dt>
									<dd>전국 및 지역별로 성씨분포 및 본관분포, 인구비율을 보여주는 서비스</dd>
									<dd style="margin-bottom: 0"><a href="/statbd/family_01.vw" class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a></dd>
								</dl>
							</li>
							<li>
								<p><img src="/images/contents/application_19.png" alt="지방의 변화보기"></p>
								<dl>
									<dt>지방의 변화보기</dt>
									<dd>통계적으로 지방(시군구)의 변화하는 모습을 제공하는 서비스</dd>
									<dd style="margin-bottom: 0"><a href="/statbd/future_01.vw" class="shortcut-button" title="서비스 바로가기"><span>서비스 바로가기</span></a></dd>
								</dl>
							</li>
						</ul>
					</div>
				</div>
				<aside class="sub-main aside">
					<ul class="right-aside">
<!-- 						<li class="banner-box"> <strong>분석지도 정보검색이 어려우신가요?</strong> -->
<!-- 							<p>초보자를 위한 맞춤형 검색을 통해 원하는 통계지도 정보를 찾기까지 안내해드립니다.</p> -->
<!-- 							<a href="javascript:alert('링크연결할때가 없음 토튜리얼이 없음.');" class="start-button"><span>시작하기</span></a>  -->
<!-- 						</li> -->
						<li class="faq-area">
							<h3>자주묻는 질문</h3>
							<ul id="faq-list">
								<li><a href="/view/board/qnaAndRequestFaq" class="btn-more"><span class="hidden" style="font-size: 0px">더보기</span></a></li><!--190228 방민정수정 -->
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