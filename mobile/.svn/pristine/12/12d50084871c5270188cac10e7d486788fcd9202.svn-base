<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<%@page contentType="text/html; charset=UTF-8" %>
<div id="footer">
	<ul class="footer__link">
		<li><a href="${ctx }/m2021/rule.sgis">이용약관</a></li>
		<li><a href="${ctx }/m2021/privacy.sgis">개인정보 처리방침</a></li>
		<li><a href="${ctx }/m2020/map/board/term.sgis">주요 용어 설명</a></li>
	</ul>
	<footer class="footer">
		<div class="logo"><img src="${ctx }/resources/m2021/img/footer__logo.png" alt="통계청"></div>
		<p>
			대전광역시 서구 청사로 189(둔산동, 정부대전청사 3동)<br>
			통계청콜센터 : 02-2012-9114/국번없이 110
		</p>
		<div class="footer__btn">
			<a href="${sgisContextPath }/view/index?param=0" onclick="srvLogWrite('O0', '52', '05', '01', '', '');" class="btn-pc">PC버전</a>
			<div class="footer__select">
				<div class="footer__select__con" style="display: none;">
					<a href="https://kostat.go.kr/portal/korea/index.action">통계청 홈페이지</a>
					<a href="https://kosis.kr/index/index.do">KOSIS 국가통계포털</a>
					<a href="https://www.index.go.kr/uat/uia/actionLogin.do">e-나라지표</a>
					<a href="https://www.census.go.kr/mainView.do">인구주택총조사</a>
					<a href="https://www.ecensus.go.kr/home/main.html">경제총조사</a>
				</div>
				<button id="footer-link-button" type="button" class="on">
					통계청 주요 서비스 바로가기 
					<img src="${ctx }/resources/m2021/img/i_select.png" alt="통계청 주요 서비스 바로가기">
				</button>
				<script>
					$("#footer-link-button").click(function(){
						if($(this).hasClass('on')){
							$(this).removeClass('on');
							$('.footer__select__con').show();
							$(this).find('img').attr('src','${ctx}/resources/m2021/img/main/i_close.png');
						} else {
							$(this).addClass('on');
							$('.footer__select__con').hide();
							$(this).find('img').attr('src','${ctx}/resources/m2021/img/i_select.png');
						}	
					});
				</script>
			</div>
		</div>
		<span>Copyright ⓒStatistics Korea. All Rights Reserved.</span>
	</footer>
	<jsp:include page="/WEB-INF/jsp/m2021/includes/popup/new-mobile-2021.jsp"/>
</div>