<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<script type='text/javascript' src='/js/plugins/jquery.min.js'></script>
<script type='text/javascript' src='/js/plugins/jquery-ui-1.10.3.custom.js'></script>
<script type='text/javascript' src='/js/plugins/jquery.sha256.js'></script>
<script type='text/javascript' src='/js/plugins/common.js'></script>
<script type='text/javascript' src='/js/plugins/ui.js'></script>
<script type='text/javascript' src='/js/plugins/html5shiv.js'></script>

<script src='/js/plugins/durian-v2.0.js'></script>
<script type='text/javascript' src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
<script type="text/javascript" src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
<script type="text/javascript" src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
<script src='/js/common/sop.portal.absAPI.js'></script>

<!-- <link rel='shortcut icon' href='/img/ico/n_favicon.png'/> -->

<!-- mng_s 20200525 이진호 -->
<!-- 아래 css는 help.css로 이동되었음, helpheader가 각 도움말 jsp의 body에 include되어 웹 표준 위배 -->
<!--
 <style type="text/css">
 	.cdontdents {
		display : inline-block; 
		word-break : break-all;
		white-space : pre-line;
	}
	
	.contents h2:not(.Type_4) {
		font-size:14px; color:#595959; text-indent:7px; margin-top:10px; font-weight: 100;
		text-indent : -15px;
		padding-left : 18px;
	}
	
	.contents li {
		font-size:14px; color:#595959; margin-top:10px; font-weight: 100; line-height:13px;
		text-indent : -15px;
		padding-left : 18px;
	}
	
	#fontplusbtn img {
		width : 30px; height:30px; margin-top : 1px;
	}
	
	h2.Type_2 {
		background:url(/img/newhelp/bullet_1.png) no-repeat 6px 4px; padding-left:22px; line-height:1.5; text-indent:0 !important;
		font-weight:normal; margin-bottom:15px;
	}
	.Cont_List li { 
		background:url(/img/newhelp/bullet_1.png) no-repeat 6px 4px; padding-left:22px; line-height:1.5; text-indent:0; font-weight:normal;
	}
	
	.mapSiteContents li {
		line-height:33.5px;border-bottom:solid 1px #e5e7e8;padding-left:26px;clear: both;margin-top:0; text-indent:inherit;
	}
	
</style>
-->


<script type="text/javascript" src="/js/common/map.js"></script>

<script src="/js/common/common.js"></script>
<script type='text/javascript' src='/js/plugins/jquery.form.js'></script>
<script src="/js/util/fontplus.js"></script>
<script type="text/javascript">
	apiLogWrite2("O0", "O01", "도움말", "도움말" , "00", "없음");
</script>

<header>
	<jsp:include page="/view/common/includeSearch"></jsp:include>
</header>

<div class="menuWrap">
	<div class="menu pt">
		<!-- mng_s 20170908_김건민 -->
		<ul>
			<li class="lh"><a href="/view/newhelp/us_help_10_0">홈페이지 이용안내</a></li>
			<li class="lh"><a href="/view/newhelp/su_help_10_0">통계주제도</a></li>
			<li class="lh"><a href="/view/newhelp/in_help_10_0">대화형 통계지도</a></li>
			<li class="lh"><a href="/view/newhelp/ps_help_10_0">정책 통계지도</a></li>
			<!-- 190308 방민정수정 시작-->
			<li class="lh"><a href="/view/newhelp/workroad_help_10_0">일자리 맵</a></li><!-- 190314 일자리수정 -->
			<!--<li class="lh"><a href="/view/newhelp/tc_help_10_0">기술업종 통계지도</a></li>
				190308 방민정수정 끝-->
			<li class="lh"><a href="/view/newhelp/house_help_10_0">살고싶은 우리동네</a></li>
		</ul>
		<ul>
			<li class="lh"><a href="/view/newhelp/so_help_10_0">업종통계지도</a></li><!-- 190308 방민정수정 -->
			<li class="lh"><a href="/view/newhelp/community_help_1">지역현안 소통지도</a></li>
			<li class="lh"><a href="/view/newhelp/ex_help_10_0">통계지도체험</a></li>
			<li class="lh"><a href="/view/newhelp/rg_help_10_0">통계갤러리</a></li>
			<li class="lh"><a href="/view/newhelp/mn_help_10_0">월간통계</a></li>
			<li class="lh"><a href="/view/newhelp/py_help_10_0">인구피라미드</a></li>
		</ul>
		<ul>
			<!-- <li class="lh"><a href="/view/newhelp/ga_help_10_0">우수활용사례</a></li> -->
			<li class="lh"><a href="/view/newhelp/ol_help_10_0">고령화 현황보기</a></li>
			<li class="lh"><a href="/view/newhelp/nm_help_10_0">성씨분포</a></li>
			<li class="lh"><a href="/view/newhelp/lo_help_10_0">지방의 변화보기</a></li>
			
			<!-- mng_s 20200727 이진호 / 기존 자료신청이 자료제공으로 변경됨에 따른 수정 -->
			<!--<li class="lh"><a href="/view/newhelp/dd_help_10_0">자료신청</a></li> -->
			<li class="lh"><a href="/view/newhelp/dd_help_10_0">자료제공</a></li>
			<!-- mng_e 20200727 이진호 -->
			
			<li class="lh"><a href="/view/newhelp/de_help_10_0">OpenAPI</a></li>
			<!-- 2020-02-13 [김남민] My통계로 서비스 설명자료 작성 START -->
			<!-- 2020-02-19 [김남민] 통계로-39 : 서비스 설명자료 수정. -->
			<li class="lh"><a href="/view/newhelp/mystatslo_help_10_0">My통계로(路)</a></li>
			<!-- 2020-02-13 [김남민] My통계로 서비스 설명자료 작성 END -->
		</ul>
		<!-- mng_e 20170908_김건민 -->
		<!-- 2020년 SGIS고도화 3차 추가 시작-->
		<ul>
			<li class="lh"><a href="/view/newhelp/catchmentArea_help_10_0">생활권역 통계지도</a></li>
			<li class="lh"><a href="/view/newhelp/totSurv_help_10_0">총조사 시각화 지도</a></li><!-- 20200223 박은식 총조사 시각화 지도 추가 -->
			<li class="lh"><a href="/view/newhelp/adminisStats_help_10_0">행정통계 시각화 지도</a></li><!-- 20220328 김건민 행정통계 시긱화 지도 추가 -->
			<li class="lh"><a href="/view/newhelp/urBan_help_10_0">도시화 분석 지도</a></li><!-- 20220328 김건민 도시화 분석 지도 추가 -->
			<li class="lh"><a href="/view/newhelp/sbr_help_10_0">기업생태지도</a></li><!-- 20221121 김흥교 기업생태 지도 분석 지도 추가 -->
		</ul>
		<!-- 2020년 SGIS고도화 3차 추가 끝 -->
	</div>
</div>

