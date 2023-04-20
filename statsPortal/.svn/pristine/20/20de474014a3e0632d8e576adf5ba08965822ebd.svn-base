<%
/**************************************************************************************************************************
* Program Name  : 생활업종 통계지도 Left메뉴 JSP  
* File Name     : bizStatsLeftMenu.jsp
* Comment       : 
* History       : 네이버시스템 김성현 2015-11-03
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> <%-- 2020년 SGIS고도화 3차(테마코드) - JSTL 추가 (pse) --%>
<div class="shadow"></div>
<!-- 1Depth Start -->
<style>
.quickBox .slectMenu span{
	float: left;
	display: inline-table;
	width: 50%;
	margin-left : 0px;
	text-align: center;
	background-color: #D4D4D4;
	cursor: pointer;
}

.nav-sidebar{
	-ms-overflow-style: none;	
}

::-webkit-scrollbar {
	display: none !important;
}

.quickBox .subj span.on{
	color: #fff;
	background-color: #213967;
}
.nav-sidebar .subj span{
	float: left;
	display: inline-table;
	width: 50%;
	margin-left : 0px;
	text-align: center;
	background-color: #D4D4D4;
	padding-top:10px;
	padding-bottom:10px;
	cursor: pointer;
}


.nav-sidebar .subj span.on{
	color: #fff;
	background-color: #213967;
}

.technical.nav-list.technical_r {
	position: absolute;
    top: 35px;
    left: 0px;
    width: 79px;
}
.quickBox .slectMenu , .nav-sidebar .lifeorTec{
	border-bottom: 1px solid #0D285C;
}
.mid-nav-list li:nth-child(1) a:hover, .mid-nav-list li:nth-child(1) a.active {
    background-color: #213967;
    color: #fff;
}
.mid-nav-list li > a:hover, .mid-nav-list li > a.active {
    background: #53aaf4;
    color: #fff;
}
.mid-nav-list li > a.on{
	background: #fff;
    color: #1778cc;
}
.bizTitle{
	margin-left:0px;
}
/*2019-04-16 박길섭 시작  */
.tech-list li:nth-child(5) > a:before{width:36px;height:28px;background-position:-350px -27px;top:5px;}
.tech-list li:nth-child(6) > a:before{width:31px;height:27px;background-position:-300px -27px;top:5px;}
.tech-list li:nth-child(7) > a:before{width:32px;height:26px;background-position:-310px -26px;top:5px;}
/* .tech-list li:nth-child(5) > a:before{width:36px;height:28px;background-position:-356px -24px;top:5px;}
.tech-list li:nth-child(6) > a:before{width:31px;height:27px;background-position:-311px -29px;top:5px;}
.tech-list li:nth-child(7) > a:before{width:29px;height:24px;background-position:-307px -23px;top:5px;} */
/*2019-04-16 박길섭 끝  */

/* 2020년 SGIS고도화 3차(테마코드) 시작 - 조건별 지역찾기 왼쪽 메뉴에서  사업체수 혹은 사업체 증감을 클릭 시 사업체 업종 선택과 관련된 디자인 변경 (pse) */
#companyTabDiv > .noneDefault > div[class*='cm']:not([class='cm01']) {
	display: none;
	margin-top: 0;
}

#companyTabDiv > .noneDefault > div.cm01 {
	margin-top: 0;
}

#companyTabDiv > .noneDefault > ol.cateMenu.type03 {
	margin-top: 0;
    margin-bottom: 5px;
    padding-left: 15px;
    float: none;
}

#companyTabDiv > .noneDefault > ol.cateMenu.type03  a {
	margin: 0;
	margin-bottom: 2px;
}

#companyTabDiv > .noneDefault > ol.cateMenu.type03 > li {
	margin-bottom: 2px;
}
/* 2020년 SGIS고도화 3차(테마코드) 끝 - (pse) */
</style>
<script>
	$("body").on("click" , ".life" , function(){
		$(".mainName").text("생활업종 통계지도");
		$(".bizHelper").show();
		$(".techHelper").hide();
		$("#tuto_start_btn").show();
		$("#tuto_start_btn_2").hide();
		$(".tech").removeClass("on");
		$(this).addClass("on");
		$(".techLeftMenu").hide();
		$(".bizLeftMenu").show();
		$(".title-list>li>a").removeClass("on");
		$(".attr-area>li").removeClass("on");
		$("#mCSB_3_container").css({"left":"0px","width":"220px"});//익스플로러 에러 해결
		$("#mCSB_4_container").css({"left":"0px","width":"220px"});//익스플로러 에러 해결
		$("#mCSB_5_container").css({"left":"0px","width":"220px"});//익스플로러 에러 해결
		$("#mCSB_6_container").css({"left":"0px","width":"220px"});//익스플로러 에러 해결
	});
	$("body").on("click" , ".tech" , function(){
		$(".mainName").text("기술업종 통계지도");
		$(".bizHelper").hide();
		$(".techHelper").show();
		$(".life").removeClass("on");
		$(this).addClass("on");
		$(".bizLeftMenu").hide();
		$(".techLeftMenu").show();
		$("#tuto_start_btn").hide();
		$("#tuto_start_btn_2").show();
		$(".title-list>li>a").removeClass("on");
		$(".attr-area>li").removeClass("on");
		$("#mCSB_3_container").css({"left":"0px","width":"220px"});//익스플로러 에러 해결
		$("#mCSB_4_container").css({"left":"0px","width":"220px"});//익스플로러 에러 해결
		$("#mCSB_5_container").css({"left":"0px","width":"220px"});//익스플로러 에러 해결
		$("#mCSB_6_container").css({"left":"0px","width":"220px"});//익스플로러 에러 해결
		/* document.location.href = '/view/technicalBiz/technicalBizMap?tec=11'; */
	});
	$("body").on("click" , ".life2" , function(){
		$(".mainName").text("생활업종 통계지도");
		$(".bizHelper").show();
		$(".techHelper").hide();
		$(".techLeftMenu2").hide();
		$(".bizLeftMenu2").show();
		$("#tuto_start_btn").show();
		$("#tuto_start_btn_2").hide();
		$(".title-list>li>a").removeClass("on");
		$(".attr-area>li").removeClass("on");
		$('.quickBox.step04').animate({"left":"-1000px"}, 200);
        $('.quickBox.step03').animate({"left":"-1400px"}, 200);
        $('.quickBox.step02').animate({"left":"-1120px"}, 200);
        $('.quickBox.step01').animate({"left":"-300px"}, 200);
        $('.quickBox.step00').animate({"left":"-300px"}, 200);
	});
	$("body").on("click" , ".tech2" , function(){
		$(".mainName").text("기술업종 통계지도");
		$(".bizHelper").hide();
		$(".techHelper").show();
		$(".bizLeftMenu2").hide();
		$(".techLeftMenu2").show();
		$("#tuto_start_btn").hide();
		$("#tuto_start_btn_2").show();
		$(".title-list>li>a").removeClass("on");
		$(".attr-area>li").removeClass("on");
		$('.quickBox.step04').animate({"left":"-1000px"}, 200);
        $('.quickBox.step03').animate({"left":"-1400px"}, 200);
        $('.quickBox.step02').animate({"left":"-1120px"}, 200);
        $('.quickBox.step01').animate({"left":"-300px"}, 200);
        $('.quickBox.step00').animate({"left":"-300px"}, 200);
		//document.location.href = '/view/technicalBiz/technicalBizMap?tec=10';
	});
</script>
<div class="quickBox step00" style="left :-360px">
	
	<!-- <div class="subj">
		추가 
		<h2>업종통계지도</h2>
		추가 
		<span>우리동네 생활업종 메뉴 보기</span>
		<a href="javascript:void(0)" class="stepClose">닫기</a>
	</div> -->
	
	<div class="subj slectMenu">
		<!--추가  -->
		<span onclick="javascript:srvLogWrite('G1', '02', '01', '00', '', '');" class="life on">생활업종</span>
		<span onclick="javascript:srvLogWrite('G1', '02', '02', '00', '', '');" class="tech">기술업종</span>
		<!--추가  -->
	</div>
	
	<div class="scrollBox scroll bizLeftMenu" id="depth1Menu">
		<!--추가  -->
		<div class="bizTitleBackground">
			<span class="bizTitle"> > &nbsp;생활업종 현황</span>
		</div>
		<ul class="ul-area attr-area">
			<li class="icon01" onclick="javascript:srvLogWrite('G1', '03', '01', '00', '', '');$bizStatsLeftMenu.ui.setDetailStatsPanel('intro');"><a href="javascript:void(0)" data-subj="시도별 현황" title="${paramInfo.tooltipList.B0001}">&nbsp;&nbsp;&nbsp;시도별 현황</a></li>
			<li class="icon02" onclick="javascript:srvLogWrite('G1', '04', '01', '00', '', '');$bizStatsLeftMenu.ui.setDetailStatsPanel('jobArea');"><a href="javascript:void(0)" data-subj="시군구별 현황" title="${paramInfo.tooltipList.B0101}">&nbsp;&nbsp;&nbsp;시군구별 현황</a></li>
			<li class="icon03" onclick="javascript:srvLogWrite('G1', '05', '01', '00', '', '');$bizStatsLeftMenu.ui.setDetailStatsPanel('jobChange');"><a href="javascript:void(0)" data-subj="업종밀집도 변화" title="${paramInfo.tooltipList.B0201}">&nbsp;&nbsp;&nbsp;업종 밀집도 변화</a></li>
			<li class="icon09" style="border-bottom: 1px solid #0760ac;"onclick="javascript:srvLogWrite('G1', '06', '01', '00', '', '');$bizStatsLeftMenu.ui.setDetailStatsPanel('lqMap');"><a href="javascript:void(0)"data-subj="업종별 입지계수" title="${paramInfo.tooltipList.B0202}">&nbsp;&nbsp;&nbsp;업종별 입지계수</a></li><!--2019-04-11 박길섭-->
		</ul>
		<div class="bizTitleBackground">
			<span class="bizTitle bizTitle2"> > &nbsp;업종별 분석지도</span>
		</div>
		<ul class="ul-area attr-area">
			<li class="icon05" id="openStatus1" onclick="javascript:srvLogWrite('G1', '07', '01', '00', '', '');$bizStatsLeftMenu.ui.setDetailStatsPanel('areaSearch');"><a href="javascript:void(0)" data-subj="조건별 지역찾기" title="${paramInfo.tooltipList.B0401}">&nbsp;&nbsp;&nbsp;조건별 지역찾기</a></li>
			<li class="icon04" style="border-bottom: 1px solid #0760ac;" onclick="javascript:srvLogWrite('G1', '08', '01', '00', '', '');$bizStatsLeftMenu.ui.setDetailStatsPanel('areaInfo');"><a href="javascript:void(0)" data-subj="후보지 정보 보기" title="${paramInfo.tooltipList.B0301}">&nbsp;&nbsp;&nbsp;후보지 정보 보기</a></li>
		</ul>
		<div class="bizTitleBackground">
			<span class="bizTitle bizTitle3"> > &nbsp;지자체 인허가 통계</span>
		</div>
		<ul class="ul-area attr-area">
			<li class="icon05" id="openStatus2" onclick="javascript:srvLogWrite('G1', '09', '01', '00', '', '');$bizStatsLeftMenu.ui.setDetailStatsPanel('jobOpen');"><a href="javascript:void(0)" data-type="1" data-subj="업종별 개업 현황" title="${paramInfo.tooltipList.B0701}">&nbsp;&nbsp;&nbsp;업종별 개업 현황</a></li>
			<li class="icon08" style="border-bottom: 1px solid #0760ac;" onclick="javascript:srvLogWrite('G1', '10', '01', '00', '', '');$bizStatsLeftMenu.ui.setDetailStatsPanel('jobBest');"><a href="javascript:void(0)" data-type="2" data-subj="업종별 뜨는 지역" title="${paramInfo.tooltipList.B0702}">&nbsp;&nbsp;&nbsp;업종별 뜨는 지역</a></li>
		</ul>
		<!-- <ul class="technicalul ul-area">
			<li><a href="javascript:void(0)" data-type="1">생활업종</a></li>
			<li><a href="javascript:void(0)" data-type="2">기술업종</a></li>
			<li><a href="javascript:void(0)" data-type="2">업종 분석지도 </a></li>
			<li><a href="javascript:void(0)" data-type="3">생활업종 인허가 통계</a></li>
			<li><a href="javascript:void(0)" data-type="5">기술업종 생태정보 현황 </a></li>
		</ul> -->
		<ol class="stat-infor">
			<li class="reportSee"><a href="javascript:srvLogWrite('G1', '11', '06', '00', '', '');$bizStatsMap.ui.reportDataSet(1);">보고서 보기</a></li>
			<!-- mng_s 20201016 김건민  -->
			<!-- <li><a href="javascript:window.open('/view/newhelp/so_help_10_0');">도움말 보기</a></li> -->
			<li><a href="/view/newhelp/so_help_10_0">도움말 보기</a></li>
			<!-- mng_e 20201016 김건민  -->
			<li><a href="javascript:$bizStatsMap.ui.doMaxSize(1);">전체 화면 확대</a></li>
		</ol>
		
		<!--추가  -->
		<%-- <dl class="qmdl pt0">
			<dt><a href="javascript:$('#qmdlList01').slideToggle();void(0);">생활업종 통계현황</a>
			<dd id="qmdlList01">
				<ul>
					<li class="icon01" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('intro');"><a data-subj="시도별 생활업종현황" title="${paramInfo.tooltipList.B0001}">시도별 생활업종 현황</a></li>
					<li class="icon02" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('jobArea');"><a data-subj="업종별 지역현황" title="${paramInfo.tooltipList.B0101}">시군구별 생활업종 현황</a></li>
					<li class="icon03" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('jobChange');"><a data-subj="업종밀집도 변화" title="${paramInfo.tooltipList.B0201}">업종 밀집도 현황</a></li>
					<li class="icon07" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('lqMap');"><a data-subj="업종별 입지계수 지도" title="${paramInfo.tooltipList.B0202}">업종별 입지계수 지도</a></li><!--박길섭 추가 icon image 수정 필요-->
				</ul>
			</dd>
		</dl> --%>
		<%--  <dl class="qmdl pt0">
			<dt><a href="javascript:$('#qmdlList02').slideToggle();void(0);">생활업종 후보지</a></dt>
			<dd id="qmdlList02">
				<ul>
					<li class="icon05" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('areaSearch');"><a data-subj="생활업종 후보지 검색" title="${paramInfo.tooltipList.B0401}">생활업종 후보지 검색</a></li>
					<li class="icon04" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('areaInfo');"><a data-subj="생활업종 후보지 정보 보기" title="${paramInfo.tooltipList.B0301}">생활업종 후보지 정보 보기</a></li>
				</ul>
			</dd>
		</dl>
		<dl class="qmdl pt0">
			<dt><a href="javascript:$('#qmdlList03').slideToggle();void(0);">지자체 인허가 통계</a></dt>
			<dd id="qmdlList03">
				
				<!-- 
				지자체 인허가 업종&#40;문화체육, 관광, 식품, 소상공인, 산업고용 등 5개분류&#41;에 대한 업종별 개업 현황을 제공합니다.&lt;br /&gt;
- 지자체 인허가 업종분류는 통계청의 표준산업분류와 체계가 다르며, 1:1 매칭이 되지 않사오니 유의하시기 바랍니다.&lt;br /&gt;
- 지자체 인허가 업종분류 관련 문의는 localdata.kr로 하시기 바랍니다.&lt;br /&gt;
- 지자체 인허가 데이터는 매일 업데이트 되며, 2017년 데이터는 2017년 1월 1일부터 현재까지의 데이터입니다.&lt;br /&gt;
- 업종별 개업 사업체가 너무 적은 경우 열지도 모양이 잘 나타나지 않습니다. 이 경우 열지도의 반지름을 조정해 보시기 바랍니다.
				 
				 db에서 불러오는 이유는 관리자에서 수정이 가능하기 때문에 이렇게 해놓았다.
				 -->				
				<ul><!-- 좌측 메뉴의 툴팁은 DB에서 불러온다. [지자체 인허가 업종(문화체육,] 이걸로 ctrl+h 에서 않나온다.  mng_dt_tooltipexp 이 테이블에서 수정하기 바란다.  ${paramInfo.tooltipList.B0701} -->
					<li class="icon05" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('jobOpen');">
						<a data-subj="업종별 개업 현황" title="${paramInfo.tooltipList.B0701}">업종별 개업 현황</a>
					</li>
					<li class="icon08" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('jobBest');">
						<a data-subj="업종별 뜨는 지역" title="${paramInfo.tooltipList.B0702}">업종별 뜨는 지역</a>
					</li>
					
				</ul>
			</dd>
		</dl>
		<dl class="qmdl">
			<dd>
				<ul>
					<li class="icon06" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('publicData');"><a data-subj="공공데이터" title="${paramInfo.tooltipList.B0501}">공공데이터</a></li>
					<li class="icon07" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('userData');"><a data-subj="공공데이터" title="${paramInfo.tooltipList.B0601}">나의 데이터</a></li>
				</ul>
			</dd>
		</dl>
		<ul class="qmlist botn">
			<li><a onclick="javascript:$bizStatsLeftMenu.ui.doMaxSize();" style="cursor:pointer;">전체 화면 확대</a></li>
			<li><a href="/view/newhelp/so_help_10_0" target="_blank">도움말 보기</a></li>
		</ul> --%>
		
	</div>
	<div class="scrollBox scroll techLeftMenu" id="depth1Menu" style="display:none">
		<!--추가  -->
		<div class="bizTitleBackground">
			<span class="bizTitle"> > &nbsp;기술업종 현황</span>
		</div>
		<ul class="ul-area attr-area">
			<li class="icon10"><a href="/view/technicalBiz/technicalBizMap?tec=1" data-subj="시도별 현황" title="${paramInfo.tooltipListTec.E0001}">&nbsp;&nbsp;&nbsp;시도별 현황</a></li>
			<li class="icon11"><a href="/view/technicalBiz/technicalBizMap?tec=3" data-subj="시군구별 현황" title="${paramInfo.tooltipListTec.E0101}">&nbsp;&nbsp;&nbsp;시군구별 현황</a></li>
			<li class="icon12"><a href="/view/technicalBiz/technicalBizMap?tec=2" data-subj="업종 밀집도 변화" title="${paramInfo.tooltipListTec.E0201}">&nbsp;&nbsp;&nbsp;업종 밀집도 변화 </a></li>
			<li class="icon15" style="border-bottom: 1px solid #0760ac;"><a href="/view/technicalBiz/technicalBizMap?tec=4" data-subj="업종별 입지계수" title="${paramInfo.tooltipListTec.E0501}">&nbsp;&nbsp;&nbsp;업종별 입지계수</a></li>
		</ul>
		
		<div class="bizTitleBackground">
			<span class="bizTitle bizTitle2"> > &nbsp;업종별 분석지도</span>
		</div>
		<ul class="ul-area attr-area">
			<li class="icon16" style="border-bottom: 1px solid #0760ac;"><a href="/view/technicalBiz/technicalBizMap?tec=5" data-subj="조건별 지역찾기" title="${paramInfo.tooltipListTec.E0601}">&nbsp;&nbsp;&nbsp;조건별 지역찾기</a></li>
		</ul>
		<div class="bizTitleBackground">
			<span class="bizTitle tecTitle3"> > &nbsp;기술업종 생태정보 현황</span>
		</div>
		<ul class="ul-area attr-area">
			<li class="icon13"><a href="/view/technicalBiz/technicalBizMap?tec=6" data-subj="지원시설 조회" title="${paramInfo.tooltipListTec.E0301}" data-type="1">&nbsp;&nbsp;&nbsp;지원시설 조회</a></li>
			<li class="icon14"><a href="/view/technicalBiz/technicalBizMap?tec=7" data-subj="산업단지 조회" title="${paramInfo.tooltipListTec.E0401}" data-type="2">&nbsp;&nbsp;&nbsp;산업단지 조회</a></li>
		</ul>
		<!-- <ul class="technicalul ul-area">
			<li><a href="javascript:void(0)" data-type="1">생활업종</a></li>
			<li><a href="javascript:void(0)" data-type="1">기술업종</a></li>
			<li><a href="javascript:void(0)" data-type="2">업종 분석지도 </a></li>
			<li><a href="javascript:void(0)" data-type="4">생활업종 인허가 통계</a></li>
			<li><a href="javascript:void(0)" data-type="3">기술업종 생태정보 현황 </a></li>
		</ul> -->
		<ol class="stat-infor">
			<li><a href="javascript:$bizStatsMap.ui.reportDataSet(1);">보고서 보기</a></li>
			<!-- mng_s 20201016 김건민 -->
			<!-- <li><a href="javascript:window.open('/view/newhelp/tc_help_10_0', 'SGIS플러스 도움말');">도움말 보기</a></li> -->
			<li><a href="/view/newhelp/so_help_10_0">도움말 보기</a></li>
			<!-- mng_e 20201016 김건민 -->
			<li><a href="javascript:$bizStatsMap.ui.doMaxSize(1);">전체 화면 확대</a></li>
		</ol>
	</div>
	
		<div class="menuAutoClose">
			<input type="radio" name="menuAutoClose_radio " id="menuAutoClose_radio"checked="checked"/>
			<label for="menuAutoClose_radio" class="on">메뉴 자동닫기</label>
		</div>
		<div class="bottom"><a href="javascript:void(0)" class="stepClose">닫기</a></div>
	<!-- <div class="menuAutoClose">
		<input type="radio" name="menuAutoClose_radio" id="menuAutoClose_radio" checked="checked"/>
		<label for="menuAutoClose_radio" class="on">통계메뉴바 자동 닫기</label>
	</div>
	<div class="btnBottom">
		<span class="logo"><img src="/img/pic/pic_logo01.gif" alt="통계청" /></span>
        <div class="serviceLayer" id="bottomServiceLayer">
			<ol>
				<li><a href="javascript:goExternalUrlLink('//www.kostat.go.kr');" title="새창으로 열림">통계청 홈페이지</a></li>
				<li><a href="javascript:goExternalUrlLink('//kosis.kr');" title="새창으로 열림">국가통계포털</a></li>
				<li><a href="javascript:goExternalUrlLink('//mdss.kostat.go.kr');" title="새창으로 열림">마이크로데이터</a></li>
				<li><a href="javascript:goExternalUrlLink('//www.index.go.kr');" title="새창으로 열림">e-나라지표</a></li>
				<li><a href="javascript:goExternalUrlLink('//meta.narastat.kr');" title="새창으로 열림">통계설명자료</a></li>
				<li><a href="javascript:goExternalUrlLink('//kssc.kostat.go.kr');" title="새창으로 열림">통계분류</a></li>
			</ol>
		</div>
		<div class="btnService" id="bottomService">통계청 주요서비스</div>
	</div>  -->
	

</div>


<%-- <div class="quickBox step01 sub">
	<div class="menu_left menu1">
		<div class="subj">
			<h3>생활업종</h3>
		</div>
		<dl class="qmdl pt0">
			<dd id="qmdlList01">
				<ul>
					<li class="icon01" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('intro');"><a data-subj="시도별 생활업종현황" title="${paramInfo.tooltipList.B0001}">시도별 생활업종 현황</a></li>
					<li class="icon02" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('jobArea');"><a data-subj="업종별 지역현황" title="${paramInfo.tooltipList.B0101}">시군구별 생활업종 현황</a></li>
					<li class="icon03" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('jobChange');"><a data-subj="업종밀집도 변화" title="${paramInfo.tooltipList.B0201}">업종 밀집도 현황</a></li>
					<li class="icon09" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('lqMap');"><a data-subj="업종별 입지계수 지도" title="${paramInfo.tooltipList.B0202}">업종별 입지계수 지도</a></li><!--박길섭 추가 icon image 수정 필요-->
				</ul>
			</dd>
		</dl>
	</div>
	<div class="menu_left menu2">
		<div class="subj">
			<h3>기술업종</h3>
		</div>
		<dl class="qmdl pt0">
			<dd id="qmdlList02">
				<ul>
					<li class="icon10"><a href="javascript:tecnicalsidoStatus();" data-subj="시도별 기술업종 현황" title="${paramInfo.tooltipList.E0001}" tabindex="100">시도별 기술업종 현황</a></li>
					<li class="icon11"><a href="javascript:tecnicalsigunguStatus();" data-subj="시군구별 기술업종 현황" title="${paramInfo.tooltipList.E0101}" tabindex="101">시군구 기술업종 현황</a></li>
					<li class="icon12"><a href="javascript:tecnicalDensity();" data-subj="업종밀집도변화" title="${paramInfo.tooltipList.E0201}" tabindex="102">업종밀집도 변화</a></li>
					<li class="icon15"><a href="javascript:tecnicalLq();" data-subj="업종별 입지계수 지도" title="${paramInfo.tooltipList.E0501}" tabindex="103">업종별 입지계수 지도</a></li>
				</ul>
			</dd>
		</dl>
	</div>
	<div class="menu_left menu2">
		<div class="subj">
			<h3>업종분석지도</h3>
		</div>
		<dl class="qmdl pt0">
			<dd id="qmdlList01">
				<ul>
					<li class="icon05" id="openStatus1" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('areaSearch');"><a data-subj="생활업종 지역별 조건찾기" title="${paramInfo.tooltipList.B0401}">생활업종 지역별 조건찾기</a></li>
					<li class="icon04" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('areaInfo');"><a data-subj="생활업종 후보지 정보 보기" title="${paramInfo.tooltipList.B0301}">생활업종 후보지 정보 보기</a></li>
					<li class="icon16"><a href="javascript:tecnicalfinCon();" data-subj="기술업종 지역별 조건찾기" title="${paramInfo.tooltipList.E0601}" tabindex="104">기술업종 지역별 조건찾기</a></li>
				</ul>
			</dd>
		</dl>
	</div>
	<div class="menu_left menu3">
		<div class="subj">
			<h3>생활업종 인허가 통계</h3>
		</div>
		<dl class="qmdl pt0">
			<dd id="qmdlList01">
				<ul>
					<li class="icon05" id="openStatus2" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('jobOpen');"><a data-subj="업종별 개업 현황" title="${paramInfo.tooltipList.B0701}">업종별 개업 현황</a></li>
					<li class="icon08" onclick="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('jobBest');"><a data-subj="업종별 뜨는 지역" title="${paramInfo.tooltipList.B0702}">업종별 뜨는 지역</a></li>
				</ul>
			</dd>
		</dl>
	</div>
	<div class="menu_left menu5">
		<div class="subj">
			<h3>기술업종생태정보현황</h3>
		</div>
		<dl class="qmdl pt0">
			<dd id="qmdlList01">
				<ul>
					<li class="icon13"><a href="javascript:tecnicalsupportFa();" data-subj="지원시설 조회" title="${paramInfo.tooltipList.E0301}" tabindex="105">지원시설 조회</a></li>
					<li class="icon14"><a href="javascript:tecnicalindusComplex();" data-subj="산업단지 조회" title="${paramInfo.tooltipList.E0401}" tabindex="106">산업단지 조회</a></li>
				</ul>
			</dd>
		</dl>
	</div>
	<div class="bottom"><a href="javascript:void(0)" class="stepClose">닫기</a></div>
</div> --%>







		<!-- <div class="menuAutoClose">
			<input type="radio " name="menuAutoClose_radio " id="menuAutoClose_radio"checked="checked"/>
			<label for="menuAutoClose_radio " class="on ">메뉴 자동닫기</label>
		</div>
		<div class="bottom"><a href="javascript:void(0) " class="stepClose">닫기</a></div> -->
	<!-- <div class="menuAutoClose">
		<input type="radio" name="menuAutoClose_radio" id="menuAutoClose_radio" checked="checked"/>
		<label for="menuAutoClose_radio" class="on">통계메뉴바 자동 닫기</label>
	</div>
	<div class="btnBottom">
		<span class="logo"><img src="/img/pic/pic_logo01.gif" alt="통계청" /></span>
        <div class="serviceLayer" id="bottomServiceLayer">
			<ol>
				<li><a href="javascript:goExternalUrlLink('//www.kostat.go.kr');" title="새창으로 열림">통계청 홈페이지</a></li>
				<li><a href="javascript:goExternalUrlLink('//kosis.kr');" title="새창으로 열림">국가통계포털</a></li>
				<li><a href="javascript:goExternalUrlLink('//mdss.kostat.go.kr');" title="새창으로 열림">마이크로데이터</a></li>
				<li><a href="javascript:goExternalUrlLink('//www.index.go.kr');" title="새창으로 열림">e-나라지표</a></li>
				<li><a href="javascript:goExternalUrlLink('//meta.narastat.kr');" title="새창으로 열림">통계설명자료</a></li>
				<li><a href="javascript:goExternalUrlLink('//kssc.kostat.go.kr');" title="새창으로 열림">통계분류</a></li>
			</ol>
		</div>
		<div class="btnService" id="bottomService">통계청 주요서비스</div>
	</div>  -->


<!-- 1Depth End -->
<!-- mng_s 20190329 김건민 (스크롤바 추가) -->
<div class="nav-sidebar bizLeftMenu2" style="overflow: auto;">
<!-- mng_e 20190329 김건민 -->
	<div class="subj lifeorTec">
		<span onclick="javascript:srvLogWrite('G1', '02', '01', '00', '', '');" class="life2 on">생활</span>
		<span onclick="javascript:srvLogWrite('G1', '02', '02', '00', '', '');" class="tech2">기술</span>
	</div>
	<ul class="technical nav-list technical_r title-list">
		<li class="icon01" onclick="javascript:srvLogWrite('G1', '03', '01', '00', '', '');$bizStatsLeftMenu.ui.setDetailStatsPanel('intro');"><a href="javascript:void(0)" data-subj="시도별 현황"title="${paramInfo.tooltipList.B0001}"><span>시도별<br> 현황</span></a></li>
		<li class="icon02" onclick="javascript:srvLogWrite('G1', '04', '01', '00', '', '');$bizStatsLeftMenu.ui.setDetailStatsPanel('jobArea');"><a href="javascript:void(0)" data-subj="시군구별 현황"title="${paramInfo.tooltipList.B0101}"><span>시군구별 현황</span></a></li>
		<li class="icon03" onclick="javascript:srvLogWrite('G1', '05', '01', '00', '', '');$bizStatsLeftMenu.ui.setDetailStatsPanel('jobChange');"><a href="javascript:void(0)" data-subj="업종 밀집도 변화" title="${paramInfo.tooltipList.B0201}"><span>업종 밀집도 변화</span></a></li>
		<li class="icon09" onclick="javascript:srvLogWrite('G1', '06', '01', '00', '', '');javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('lqMap');"><a href="javascript:void(0)" data-subj="업종별 입지계수"><span>업종별 입지계수</span></a></li><!--2019-04-16 박길섭-->
		<li class="icon05" id="openStatus1" onclick="srvLogWrite('G1', '07', '01', '00', '', '');javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('areaSearch');"><a href="javascript:void(0)" data-subj="조건별 지역찾기"title="${paramInfo.tooltipList.B0401}"><span>조건별 지역찾기</span></a></li>
		<li class="icon04" onclick="srvLogWrite('G1', '08', '01', '00', '', '');javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('areaInfo');"><a href="javascript:void(0)" data-subj="후보지 정보 보기" title="${paramInfo.tooltipList.B0301}"><span>후보지 정보 보기</span></a></li>
		<li class="icon05" id="openStatus2" onclick="javascript:srvLogWrite('G1', '09', '01', '00', '', '');$bizStatsLeftMenu.ui.setDetailStatsPanel('jobOpen');"><a href="javascript:void(0)" data-subj="업종별 개업 현황" title="${paramInfo.tooltipList.B0701}"><span>업종별 개업 현황</span></a></li>
		<li class="icon08" onclick="javascript:srvLogWrite('G1', '10', '01', '00', '', '');$bizStatsLeftMenu.ui.setDetailStatsPanel('jobBest');"><a href="javascript:void(0)" data-subj="업종별 뜨는 지역" title="${paramInfo.tooltipList.B0702}"><span>업종별 뜨는 지역</span></a></li>
	</ul>
	<!-- <ul class="technical nav-list technical_r">
		<li><a href="javascript:void(0)"  data-type="1"><span>생활업종</span></a></li>
		<li><a href="javascript:void(0)"  data-type="2"><span>기술업종</span></a></li>
		<li><a href="javascript:void(0)"  data-type="2"><span>업종 분석지도</span></a></li>
		<li><a href="javascript:void(0)"  data-type="3"><span>생활업종 인허가 통계</span></a></li>
		<li><a href="javascript:void(0)"  data-type="5"><span>기술업종 생태정보 현황</span></a></li>
	</ul> -->
	<div class="list_btn" style="bottom:88px">
		<img src="<c:url value="/images/common/img_list_btn.png"/>" alt="목록" />
	</div>
	<div class="menuAutoClose secondMenuAutoClose" style="left:3px;bottom:75px;">
			<input type="radio" name="menuAutoClose_radio " id="menuAutoClose_radio"checked="checked"/>
			<label for="menuAutoClose_radio" class="on" style="color:#fff">자동닫기</label>
	</div>
</div>
<!-- mng_s 20190329 김건민 (스크롤바 추가) -->
<div class="nav-sidebar techLeftMenu2" style="display:none; overflow: auto;">
<!-- mng_e 20190329 김건민  -->
	<div class="subj lifeorTec">
		<!--추가  -->
		<span onclick="javascript:srvLogWrite('G1', '02', '01', '00', '', '');" class="life2">생활</span>
		<span onclick="javascript:srvLogWrite('G1', '02', '02', '00', '', '');" class="tech2 on">기술</span>
	</div>
	<ul class="technical nav-list technical_r title-list tech-list">
		<li class="icon10"><a href="/view/technicalBiz/technicalBizMap?tec=1" data-subj="시도별 현황" title="${paramInfo.tooltipListTec.E0001}"><span>시도별<br> 현황</span></a></li>
		<li class="icon11"><a href="/view/technicalBiz/technicalBizMap?tec=3" data-subj="시군구별 현황" title="${paramInfo.tooltipListTec.E0101}"><span>시군구별 현황</span></a></li>
		<li class="icon12"><a href="/view/technicalBiz/technicalBizMap?tec=2" data-subj="업종 밀집도 변화" title="${paramInfo.tooltipListTec.E0201}"><span>업종 밀집도 변화</span></a></li>
		<li class="icon15"><a href="/view/technicalBiz/technicalBizMap?tec=4" data-subj="업종별 입지계수" title="${paramInfo.tooltipListTec.E0501}" ><span>업종별 입지계수</span></a></li>
		<li class="icon16"><a href="/view/technicalBiz/technicalBizMap?tec=5" data-subj="조건별 지역찾기" title="${paramInfo.tooltipListTec.E0601}"><span>조건별 지역찾기</span></a></li>
		<li class="icon13"><a href="/view/technicalBiz/technicalBizMap?tec=6" data-subj="지원시설 조회" title="${paramInfo.tooltipListTec.E0301}"><span>지원시설 조회</span></a></li>
		<li class="icon14"><a href="/view/technicalBiz/technicalBizMap?tec=7" data-subj="산업단지 조회" title="${paramInfo.tooltipListTec.E0401}"><span>산업단지 조회</span></a></li>
	</ul>
	<div class="list_btn" style="bottom:88px">
		<img src="<c:url value="/images/common/img_list_btn.png"/>" alt="목록" />
	</div>
	<div class="menuAutoClose secondMenuAutoClose" style="left:3px;bottom:51px;">
			<input type="radio" name="menuAutoClose_radio " id="menuAutoClose_radio"checked="checked"/>
			<label for="menuAutoClose_radio" class="on" style="color:#fff">자동닫기</label>
	</div>
</div>
<!-- <div class="expand">
	<ul class="mid-nav-list" id="attributeMenu1">
		<li><a href="javascript:void(0)" class="active"><span>생활업종현황</span></a></li>
		<li><a href="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('intro');"  class="active"><span>시도별 생활업종 현황</span></a></li>
		<li><a href="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('jobArea');"  class="active"><span>시군구별 생활업종 현황</span></a></li>
		<li><a href="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('jobChange');"  class="active"><span>업종 밀집도 현황</span></a></li>
		<li><a href="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('lqMap');"  class="active"><span>업종별 입지계수 지도</span></a></li>
	</ul>
	<ul class="mid-nav-list" id="attributeMenu2">
		<li><a href="javascript:void(0)" class="active"><span>업종분석지도</span></a></li>
		<li><a href="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('areaSearch');"  class="active"><span>생활업종 지역별 조건찾기</span></a></li>
		<li><a href="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('areaInfo');"  class="active"><span>생활업종 후보지 정보 보기</span></a></li>
	</ul>
	<ul class="mid-nav-list" id="attributeMenu3">
		<li><a href="javascript:void(0)" class="active"><span>생활업종 인허가 통계</span></a></li>
		<li><a href="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('jobOpen');" class="active"><span>업종별 개업 현황</span></a></li>
		<li><a href="javascript:$bizStatsLeftMenu.ui.setDetailStatsPanel('jobBest');" class="active"><span>업종별 뜨는 지역</span></a></li>
	</ul>
</div> -->
<!-- 2Depth Start -->
<div class="quickBox step02">
	<div class="subj">
		<span id="submenuTitle"></span>
		<!-- <a href="javascript:void(0)" class="stepClose">닫기</a> -->
	</div>
	<div class="scrollBox">
		<!-- 업종별 지역현황 & 업종밀집도 변화 Start -->
		<!-- mng_s 20200615 김건민 (문구 수정함.) -->
		<div id="API_0000" class="totalResult tr01">
			<div class="stepBox">
				<%-- 2020년 SGIS고도화 3차(테마코드) 시작 - 왼쪽 메뉴 하드코딩 해결 (pse) --%>
				<c:forEach items="${allThemeCdInfo }" var="bigThemeItem" varStatus="status">
				<a href="javascript:void(0)" class="roundTextBox" data-big-theme-cd="${bigThemeItem.b_theme_cd}">${bigThemeItem.b_theme_cd_nm}(${bigThemeItem.s_theme_count }개)</a>
				<div class="joinDefault" data-big-theme-cd="${bigThemeItem.b_theme_cd}">
					<ul class="jobArea_stepBox" id="step${status.count}">
						<li class="themeAll">
							<input type="checkbox" id="rd_${bigThemeItem.b_theme_cd}_${bigThemeItem.b_theme_cd}" name="rd_theme_${bigThemeItem.b_theme_cd}" value="${bigThemeItem.b_theme_cd}" data-big-theme-cd='${bigThemeItem.b_theme_cd}'>
							<label for="rd_${bigThemeItem.b_theme_cd}_${bigThemeItem.b_theme_cd}">전체</label>
						</li>
						<c:forEach items="${bigThemeItem.s_theme_list}" var="smallThemeItem">
						<li>
							<input type="checkbox" id="rd_${bigThemeItem.b_theme_cd}_${smallThemeItem.theme_cd }" name="rd_theme_${bigThemeItem.b_theme_cd}" value="${smallThemeItem.theme_cd }" data-big-theme-cd='${bigThemeItem.b_theme_cd}'>
							<label for="rd_${bigThemeItem.b_theme_cd}_${smallThemeItem.theme_cd }">${smallThemeItem.s_theme_cd_nm }</label>
						</li>
						</c:forEach>
					</ul>
				</div>
				</c:forEach>
				<%-- 2020년 SGIS고도화 3차(테마코드) 끝 - 왼쪽 메뉴 하드코딩 해결 (pse) --%>
				
				<%-- 2020년 SGIS고도화 3차(테마코드) 시작 - 기존코드 주석처리 (pse) --%>
				<%--
				<a href="javascript:void(0)" class="roundTextBox">음식점(11종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox" id="step1">
						<li>
							<input type="checkbox" id="rd_food_5000" name="rd_food" value="5000" />
							<label for="rd_food_5000">전체</label>
						</li>
						<li>
							<input type="checkbox" id="rd_food_5001" name="rd_food" value="5001" />
							<label for="rd_food_5001">한식</label>
						</li>
						<li>
							<input type="checkbox" id="rd_food_5002" name="rd_food" value="5002" />
							<label for="rd_food_5002">중식</label>
						</li>
						<li>
							<input type="checkbox" id="rd_food_5003" name="rd_food" value="5003" />
							<label for="rd_food_5003">일식</label>
						</li>
						<li>
							<input type="checkbox" id="rd_food_5004" name="rd_food" value="5004" />
							<label for="rd_food_5004">분식</label>
						</li>
						<li>
							<input type="checkbox" id="rd_food_5005" name="rd_food" value="5005" />
							<label for="rd_food_5005">서양식</label>
						</li>
						<li>
							<input type="checkbox" id="rd_food_5006" name="rd_food" value="5006" />
							<label for="rd_food_5006">제과점</label>
						</li>
						<li>
							<input type="checkbox" id="rd_food_5007" name="rd_food" value="5007" />
							<label for="rd_food_5007">패스트푸드</label>
						</li>
						<li>
							<input type="checkbox" id="rd_food_5008" name="rd_food" value="5008" />
							<label for="rd_food_5008">치킨</label>
						</li>
						<li>
							<input type="checkbox" id="rd_food_5009" name="rd_food" value="5009" />
							<label for="rd_food_5009">호프 및 간이주점</label>
						</li>
						<li>
							<input type="checkbox" id="rd_food_5010" name="rd_food" value="5010" />
							<label for="rd_food_5010">카페</label>
						</li>
						<li>
							<input type="checkbox" id="rd_food_5011" name="rd_food" value="5011" />
							<label for="rd_food_5011">기타 외국식</label>
						</li>
					</ul>
				</div>
				<a href="javascript:void(0)" class="roundTextBox">소매업(11종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox" id="step2">
						<li>
							<input type="checkbox" id="rd_retail_2000" name="rd_retail" value="2000" />
							<label for="rd_retail_2000">전체</label>
						</li>
						<li>
							<input type="checkbox" id="rd_retail_2001" name="rd_retail" value="2001" />
							<label for="rd_retail_2001">문구점</label>
						</li>
						<li>
							<input type="checkbox" id="rd_retail_2002" name="rd_retail" value="2002" />
							<label for="rd_retail_2002">서점</label>
						</li>
						<li>
							<input type="checkbox" id="rd_retail_2003" name="rd_retail" value="2003" />
							<label for="rd_retail_2003">편의점</label>
						</li>
						<li>
							<input type="checkbox" id="rd_retail_2004" name="rd_retail" value="2004" />
							<label for="rd_retail_2004">식료품점</label>
						</li>
						<li>
							<input type="checkbox" id="rd_retail_2005" name="rd_retail" value="2005" />
							<label for="rd_retail_2005">휴대폰점</label>
						</li>
						<li>
							<input type="checkbox" id="rd_retail_2006" name="rd_retail" value="2006" />
							<label for="rd_retail_2006">의류</label>
						</li>
						<li>
							<input type="checkbox" id="rd_retail_2007" name="rd_retail" value="2007" />
							<label for="rd_retail_2007">화장품/방향제</label>
						</li>
						<li>
							<input type="checkbox" id="rd_retail_2008" name="rd_retail" value="2008" />
							<label for="rd_retail_2008">철물점</label>
						</li>
						<li>
							<input type="checkbox" id="rd_retail_2009" name="rd_retail" value="2009" />
							<label for="rd_retail_2009">주유소</label>
						</li>
						<li>
							<input type="checkbox" id="rd_retail_2010" name="rd_retail" value="2010" />
							<label for="rd_retail_2010">꽃집</label>
						</li>
						<li>
							<input type="checkbox" id="rd_retail_2011" name="rd_retail" value="2011" />
							<label for="rd_retail_2011">슈퍼마켓</label>
						</li>
					</ul>
				</div>
				<a href="javascript:void(0)" class="roundTextBox">생활서비스(11종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox" id="step3">
						<li>
							<input type="checkbox" id="rd_service_1000" name="rd_service" value="1000" />
							<label for="rd_service_1000">전체</label>
						</li>
						<li>
							<input type="checkbox" id="rd_service_1001" name="rd_service" value="1001" />
							<label for="rd_service_1001">인테리어</label>
						</li>
						<li>
							<input type="checkbox" id="rd_service_1002" name="rd_service" value="1002" />
							<label for="rd_service_1002">목욕탕</label>
						</li>
						<li>
							<input type="checkbox" id="rd_service_1003" name="rd_service" value="1003" />
							<label for="rd_service_1003">교습학원</label>
						</li>
						<li>
							<input type="checkbox" id="rd_service_1004" name="rd_service" value="1004" />
							<label for="rd_service_1004">어학원</label>
						</li>
						<li>
							<input type="checkbox" id="rd_service_1005" name="rd_service" value="1005" />
							<label for="rd_service_1005">예체능학원</label>
						</li>
						<li>
							<input type="checkbox" id="rd_service_1006" name="rd_service" value="1006" />
							<label for="rd_service_1006">부동산중개업</label>
						</li>
						<li>
							<input type="checkbox" id="rd_service_1007" name="rd_service" value="1007" />
							<label for="rd_service_1007">이발소</label>
						</li>
						<li>
							<input type="checkbox" id="rd_service_1008" name="rd_service" value="1008" />
							<label for="rd_service_1008">미용실</label>
						</li>
						<li>
							<input type="checkbox" id="rd_service_1009" name="rd_service" value="1009" />
							<label for="rd_service_1009">세탁소</label>
						</li>
						<li>
							<input type="checkbox" id="rd_service_1010" name="rd_service" value="1010" />
							<label for="rd_service_1010">PC방</label>
						</li>
						<li>
							<input type="checkbox" id="rd_service_1011" name="rd_service" value="1011" />
							<label for="rd_service_1011">노래방</label>
						</li>
					</ul>
				</div>
				<a href="javascript:void(0)" class="roundTextBox">숙박(3종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox" id="step4">
						<li>
							<input type="checkbox" id="rd_hotel_4000" name="rd_hotel" value="4000" />
							<label for="rd_hotel_4000">전체</label>
						</li>
						<li>
							<input type="checkbox" id="rd_hotel_4001" name="rd_hotel" value="4001" />
							<label for="rd_hotel_4001">호텔</label>
						</li>
						<li>
							<input type="checkbox" id="rd_hotel_4002" name="rd_hotel" value="4002" />
							<label for="rd_hotel_4002">여관(모텔포함) 및 여인숙</label>
						</li>
						<li>
							<input type="checkbox" id="rd_hotel_4003" name="rd_hotel" value="4003" />
							<label for="rd_hotel_4003">펜션</label>
						</li>
					</ul>
				</div>
				--%>
				<%-- 2020년 SGIS고도화 3차(테마코드) 끝 - 기존코드 주석처리 (pse) --%>
			</div>
		</div>
		<!-- mng_e 20200615 김건민 -->
		<!-- 업종별 지역현황 & 업종밀집도 변화End -->

		<!-- 창업지역 찾기 Start -->
		<div class="totalResult tr05">
			<div class="stepBox">
				<span class="txt">
					관심 있는 지표를 선택해 보세요. <br />
					지표별 상하위 가중치를 설정하여 조건에<br />
					부합하는 후보지를 검색할 수 있습니다.<br />
					항목은 다중선택이 가능합니다.
				</span>
				<ul class="wonList01" id="wonList01">
					<li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('companyCount');void(0);" id="companyCountAtag" data-subj="사업체수" title="${paramInfo.tooltipList.B0403}"><span>사업체수</span></a></li>
					<li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('companyIncrease');void(0);" id="companyIncreaseAtag" data-subj="사업체증감" title="${paramInfo.tooltipList.B0404}"><span>사업체증감</span></a></li>
					<li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('jobPeople');void(0);" id="jobPeopleAtag" data-subj="직장인구" title="${paramInfo.tooltipList.B0405}"><span>직장인구</span></a></li>
					<li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('stayPeople');void(0);" id="stayPeopleAtag" data-subj="거주" title="${paramInfo.tooltipList.B0406}"><span>거주인구</span></a></li>
					<li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('genderPeople');void(0);" id="genderPeopleAtag" data-subj="성별인구" title="${paramInfo.tooltipList.B0407}"><span>성별인구</span></a></li>
					<li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('agePeople');void(0);" id="agePeopleAtag" data-subj="연령별인구" title="${paramInfo.tooltipList.B0408}"><span>연령별인구</span></a></li>
					<li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('household');void(0);" id="householdAtag" data-subj="갸구유형" title="${paramInfo.tooltipList.B0409}"><span>가구유형</span></a></li>
					<!-- 2017.03.21 2015년 점유형태 추가에 따른 지표삭제 -->
					<%-- <li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('occupyType');void(0);" id="occupyTypeAtag" data-subj="점유형태" title="${paramInfo.tooltipList.B0410}"><span>점유형태</span></a></li> --%>
					<li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('houseType');void(0);" id="houseTypeAtag" data-subj="거주주택" title="${paramInfo.tooltipList.B0411}"><span>거주주택</span></a></li>
					<li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('apartPrice');void(0);" id="apartPriceAtag" data-subj="공시지가" title="${paramInfo.tooltipList.B0412}"><span>공시지가</span></a></li>
					<li><a href="javascript:$bizStatsLeftMenu.ui.areaSearchCondition('oldHouse');void(0);" id="oldHouseAtag" data-subj="노후주택" title="${paramInfo.tooltipList.B0413}"><span>노후주택<br />(20년이상)</span></a></li>
<!-- 					<li class="disabled"><a href="javascript:void(0);"><span>자동차<br />등록정보<br /><font size="1">(항목추가예정)</font></span></a></li> -->
				</ul>
			</div>
		</div>
		<!-- 창업지역 찾기 End -->
		
		<!-- 공공데이터 조회하기 -->
		<div class="totalResult tr06">
			<div class="stepBox">
				<span class="noneTextBox">위치중심 공공데이터 목록</span>
				<ul class="type01 publicData_stepBox" id="publicDataLeftList">
				</ul>
			</div>
		</div>
		
		<!-- 사용자데이터업로드 -->
		<div class="totalResult tr07">
			<div class="stepBox"> 
			    <span class="txt">사용자가 보유하고 있는 txt, csv, Excel, KML 등의 포맷파일을 업로드하여 지도 위에 매핑할 수 있습니다
			    </span>
			    <p>나의 데이터에 저장된 목록</p>
			    <ul id="myDataLoadList">
			    </ul>
			    <br/>
			    <div style="text-align: center;">
	            	<a href="/view/mypage/myData/dataList" class="btnStyle01">나의 데이터 이동</a>
	        	</div>
			</div>
         	<div class="stepBox">
				<p>공개된 사용자 데이터 목록</p>
			    <ul id="shareDataLoadList">
			    </ul>
			</div>
		</div>
		
		
		<!-- ======================================== Start of 지자체 인허가 통계 업종별 개업정보 ======================================== -->
		<!-- 
				지표 변경시 같이 수정해야할 파일은
				bizStatsDataBoard.jsp, bizStatsDataBoard.js의 700번째 줄 정도의 코드들, 그리고 이 파일 ... 그래도 않되면 코드로 전체검색 요망.. ㅠㅠ
		-->
		
		<div id="API_0008" class="totalResult tr08">
			<div class="stepBox">
				<a href="javascript:void(0)" class="roundTextBox">문화체육(5종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
						<!-- input type의 이름 jj_ 는 bizStatsDataBoard.js에서 이름을 맞추어 주어야한다.  -->
						<li>
							<input type="checkbox" id="jj_culture_22_09_01_P" name="jj_culture" value="22_09_01_P" />
							<label for="jj_culture_22_09_01_P">인터넷 컴퓨터 게임시설 제공업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_culture_22_14_01_P" name="jj_culture" value="22_14_01_P" />
							<label for="jj_culture_22_14_01_P">청소년 게임 제공업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_culture_21_06_01_P" name="jj_culture" value="21_06_01_P" />
							<label for="jj_culture_21_06_01_P">노래 연습장업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_culture_23_06_01_P" name="jj_culture" value="23_06_01_P" />
							<label for="jj_culture_23_06_01_P">체육도장업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_culture_23_12_01_P" name="jj_culture" value="23_12_01_P" />
							<label for="jj_culture_23_12_01_P">무도 학원업</label>
						</li>
						
						
						
						
						
						<!-- 
						<li>
							<input type="checkbox" id="jj_culture_41_36_01_P" name="jj_culture" value="41_36_01_P" />
							<label for="jj_culture_41_36_01_P">공중이용시설(학원)</label>
						</li>
						
						
						<li>
							<input type="checkbox" id="jj_culture_23_11_01_P" name="jj_culture" value="23_11_01_P" />
							<label for="jj_culture_23_11_01_P">무도장업</label>
						</li>
						 -->
						
					</ul>
				</div>
				<a href="javascript:void(0)" class="roundTextBox">관광(6종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
						<li>
							<input type="checkbox" id="jj_tour_41_43_01_P" name="jj_tour" value="41_43_01_P" />
							<label for="jj_tour_41_43_01_P">숙박업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_tour_41_16_01_P" name="jj_tour" value="41_16_01_P" />
							<label for="jj_tour_41_16_01_P">숙박업(일반-여관업)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_tour_41_17_01_P" name="jj_tour" value="41_17_01_P" />
							<label for="jj_tour_41_17_01_P">숙박업(일반-여인숙업)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_tour_41_14_01_P" name="jj_tour" value="41_14_01_P" />
							<label for="jj_tour_41_14_01_P">숙박업(일반-일반호텔)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_tour_41_13_01_P" name="jj_tour" value="41_13_01_P" />
							<label for="jj_tour_41_13_01_P">숙박업(일반-관광호텔)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_tour_16_19_01_P" name="jj_tour" value="16_19_01_P" />
							<label for="jj_tour_16_19_01_P">관광펜션업</label>
						</li>
						
						
						<!-- 
						<li>
							<input type="checkbox" id="jj_tour_41_15_01_P" name="jj_tour" value="41_15_01_P" />
							<label for="jj_tour_41_15_01_P">숙박업(일반-휴양콘도미니엄업)</label>
						</li>
						 -->
						
						
					</ul>
				</div>
				<a href="javascript:void(0)" class="roundTextBox">식품(25종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
						<li>
							<input type="checkbox" id="jj_food_24_01_01_P" name="jj_food" value="24_01_01_P" />
							<label for="jj_food_24_01_01_P">일반음식점(한식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_44_01_P" name="jj_food" value="24_44_01_P" />
							<label for="jj_food_24_44_01_P">휴게음식점(커피숍)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_20_01_P" name="jj_food" value="24_20_01_P" />
							<label for="jj_food_24_20_01_P">일반음식점(기타)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_12_01_P" name="jj_food" value="24_12_01_P" />
							<label for="jj_food_24_12_01_P">일반음식점(호프/통닭)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_05_01_P" name="jj_food" value="24_05_01_P" />
							<label for="jj_food_24_05_01_P">일반음식점(분식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_18_01_P" name="jj_food" value="24_18_01_P" />
							<label for="jj_food_24_18_01_P">일반음식점(식육(숯불구이))</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_03_01_P" name="jj_food" value="24_03_01_P" />
							<label for="jj_food_24_03_01_P">일반음식점(경양식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_42_01_P" name="jj_food" value="24_42_01_P" />
							<label for="jj_food_24_42_01_P">휴게음식점(편의점)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_48_01_P" name="jj_food" value="24_48_01_P" />
							<label for="jj_food_24_48_01_P">제과점영업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_07_01_P" name="jj_food" value="24_07_01_P" />
							<label for="jj_food_24_07_01_P">일반음식점(정종,대포집,소주방)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_04_01_P" name="jj_food" value="24_04_01_P" />
							<label for="jj_food_24_04_01_P">일반음식점(일식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_02_01_P" name="jj_food" value="24_02_01_P" />
							<label for="jj_food_24_02_01_P">일반음식점(중국식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_43_01_P" name="jj_food" value="24_43_01_P" />
							<label for="jj_food_24_43_01_P">휴게음식점(패스트푸드)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_16_01_P" name="jj_food" value="24_16_01_P" />
							<label for="jj_food_24_16_01_P">일반음식점(횟집)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_32_01_P" name="jj_food" value="24_32_01_P" />
							<label for="jj_food_24_32_01_P">단란주점영업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_06_01_P" name="jj_food" value="24_06_01_P" />
							<label for="jj_food_24_06_01_P">일반음식점(뷔페식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_15_01_P" name="jj_food" value="24_15_01_P" />
							<label for="jj_food_24_15_01_P">일반음식점(김밥(도시락))</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_19_01_P" name="jj_food" value="24_19_01_P" />
							<label for="jj_food_24_19_01_P">일반음식점(탕류(보신용))</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_45_01_P" name="jj_food" value="24_45_01_P" />
							<label for="jj_food_24_45_01_P">휴게음식점(전통찻집)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_81_01_P" name="jj_food" value="24_81_01_P" />
							<label for="jj_food_24_81_01_P">일반음식점(패밀리레스토랑)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_76_01_P" name="jj_food" value="24_76_01_P" />
							<label for="jj_food_24_76_01_P">일반음식점(라이브카페)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_71_01_P" name="jj_food" value="24_71_01_P" />
							<label for="jj_food_24_71_01_P">유흥주점영업(노래클럽)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_68_01_P" name="jj_food" value="24_68_01_P" />
							<label for="jj_food_24_68_01_P">일반음식점(감성주점)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_70_01_P" name="jj_food" value="24_70_01_P" />
							<label for="jj_food_24_70_01_P">일반음식점(냉면집)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_30_01_P" name="jj_food" value="24_30_01_P" />
							<label for="jj_food_24_30_01_P">유흥주점영업(간이주점)</label>
						</li>
						
						<!-- 
						<li>
							<input type="checkbox" id="jj_food_24_14_01_P" name="jj_food" value="24_14_01_P" />
							<label for="jj_food_24_14_01_P">일반음식점(복어취급)</label>
						</li>
						 -->
					</ul>
				</div>
				<a href="javascript:void(0)" class="roundTextBox">소상공인(17종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
					
						<li><input type="checkbox" id="jj_service_41_40_01_P" name="jj_service" value="41_40_01_P" /><label for="jj_service_41_40_01_P">미용업(일반)	                  </label></li>
						<li><input type="checkbox" id="jj_service_41_41_01_P" name="jj_service" value="41_41_01_P" /><label for="jj_service_41_41_01_P">미용업(피부)	                  </label></li>
						<li><input type="checkbox" id="jj_service_41_40_02_P" name="jj_service" value="41_40_02_P" /><label for="jj_service_41_40_02_P">미용업(손톱ㆍ발톱)	              </label></li>
						<li><input type="checkbox" id="jj_service_41_24_01_P" name="jj_service" value="41_24_01_P" /><label for="jj_service_41_24_01_P">이용업	                          </label></li>
						<li><input type="checkbox" id="jj_service_41_41_02_P" name="jj_service" value="41_41_02_P" /><label for="jj_service_41_41_02_P">미용업(피부/손톱ㆍ발톱)	          </label></li>
						<li><input type="checkbox" id="jj_service_41_42_01_P" name="jj_service" value="41_42_01_P" /><label for="jj_service_41_42_01_P">미용업(종합)	                  </label></li>
						<li><input type="checkbox" id="jj_service_41_40_04_P" name="jj_service" value="41_40_04_P" /><label for="jj_service_41_40_04_P">미용업(일반/손톱ㆍ발톱)	          </label></li>
						<li><input type="checkbox" id="jj_service_41_40_09_P" name="jj_service" value="41_40_09_P" /><label for="jj_service_41_40_09_P">미용업(일반/화장ㆍ분장)	          </label></li>
						<li><input type="checkbox" id="jj_service_41_40_05_P" name="jj_service" value="41_40_05_P" /><label for="jj_service_41_40_05_P">미용업(일반/손톱ㆍ발톱/화장ㆍ분장)</label></li>
						<li><input type="checkbox" id="jj_service_41_40_03_P" name="jj_service" value="41_40_03_P" /><label for="jj_service_41_40_03_P">미용업(손톱ㆍ발톱/화장ㆍ분장)	  </label></li>
						<li><input type="checkbox" id="jj_service_41_19_01_P" name="jj_service" value="41_19_01_P" /><label for="jj_service_41_19_01_P">목욕장업(공동탕업)	              </label></li>
						<li><input type="checkbox" id="jj_service_41_41_05_P" name="jj_service" value="41_41_05_P" /><label for="jj_service_41_41_05_P">미용업(화장ㆍ분장)	              </label></li>
						<li><input type="checkbox" id="jj_service_41_40_06_P" name="jj_service" value="41_40_06_P" /><label for="jj_service_41_40_06_P">미용업(일반/피부)	              </label></li>
						<li><input type="checkbox" id="jj_service_41_41_03_P" name="jj_service" value="41_41_03_P" /><label for="jj_service_41_41_03_P">미용업(피부/손톱ㆍ발톱/화장ㆍ분장)</label></li>
						<li><input type="checkbox" id="jj_service_41_40_07_P" name="jj_service" value="41_40_07_P" /><label for="jj_service_41_40_07_P">미용업(일반/피부/손톱ㆍ발톱)	  </label></li>
						<li><input type="checkbox" id="jj_service_41_41_04_P" name="jj_service" value="41_41_04_P" /><label for="jj_service_41_41_04_P">미용업(피부/화장ㆍ분장)	          </label></li>
						<li><input type="checkbox" id="jj_service_41_40_08_P" name="jj_service" value="41_40_08_P" /><label for="jj_service_41_40_08_P">미용업(일반/피부/화장ㆍ분장)	  </label></li>
						
						
						
						
						
						<!-- 
						<li>
							<input type="checkbox" id="jj_service_41_22_01_P" name="jj_service" value="41_22_01_P" />
							<label for="jj_service_41_22_01_P">목욕장업(공동탕업+찜질시설서비스영업)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_service_41_21_01_P" name="jj_service" value="41_21_01_P" />
							<label for="jj_service_41_21_01_P">목욕장업(찜질시설서비스영업)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_service_41_20_01_P" name="jj_service" value="41_20_01_P" />
							<label for="jj_service_41_20_01_P">목욕장업(한증막업)</label>
						</li>
						 -->
						
						
					</ul>
				</div>
				
				<a href="javascript:void(0)" class="roundTextBox">산업고용(3종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
						<li>
							<input type="checkbox" id="jj_sanup_42_08_05_P" name="jj_sanup" value="42_08_05_P" />
							<label for="jj_sanup_42_08_05_P">석유판매업(주유소)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_sanup_42_03_01_P" name="jj_sanup" value="42_03_01_P" />
							<label for="jj_sanup_42_03_01_P">석유 및 석유대체연료 판매업체</label>
						</li>
						<li>
							<input type="checkbox" id="jj_sanup_42_08_04_P" name="jj_sanup" value="42_08_04_P" />
							<label for="jj_sanup_42_08_04_P">석유판매업(일반판매소)</label>
						</li>
						
						<!-- 
						<li>
							<input type="checkbox" id="jj_sanup_42_08_07_P" name="jj_sanup" value="42_08_07_P" />
							<label for="jj_sanup_42_08_07_P">석유판매업(항공유판매소)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_sanup_42_08_06_P" name="jj_sanup" value="42_08_06_P" />
							<label for="jj_sanup_42_08_06_P">석유판매업(특수판매소)</label>
						</li>
						
						<li>
							<input type="checkbox" id="jj_sanup_42_08_03_P" name="jj_sanup" value="42_08_03_P" />
							<label for="jj_sanup_42_08_03_P">석유판매업(용제판매소)</label>
						</li>
						
						<li>
							<input type="checkbox" id="jj_sanup_42_08_02_P" name="jj_sanup" value="42_08_02_P" />
							<label for="jj_sanup_42_08_02_P">석유판매업(부생연료유판매소)</label>
						</li>
						 -->
						
					</ul>
				</div>
				
				
				
			</div>
		</div>
		<!-- End of 지자체 인허가 통계 업종별 개업정보 -->
		
		<table id="jobOpen_use_info">
			<tr>
				<td style="font-size: 12px;padding: 10px; line-height:17px;">
					*지자체인허가 440여 업종중 생활업종과 연관된 56개업종을 서비스합니다.
					<br/>
					전국사업체조사 해당년도 이후 년도만 시계열로 제공합니다.
					<br/><br/>
					 <a href="http://localdata.kr/portal/main/contents.do?menuNo=200004" onclick="srvLogWrite('G1', '09', '03', '00', '', '');" target="_blank" style="color:blue; text-decoration:underline">지자체인허가 이용안내보기</a>
				</td>
			</tr>
		</table>
		
		<!-- ======================================== Start of 업종별 뜨는 지역 ======================================== -->
		<!-- 
				지표 변경시 같이 수정해야할 파일은
				bizStatsDataBoard.jsp, bizStatsDataBoard.js의 700번째 줄 정도의 코드들, 그리고 이 파일 ... 그래도 않되면 코드로 전체검색 요망.. ㅠㅠ
		-->
		
		<div class="totalResult tr09">
			<div class="stepBox HouseMap">
				<h2 style="line-height:1">
					지역선택
					<a href="javascript:void(0)" style="position: absolute;right: 10px;top: 7px;" data-subj="지역선택" title="○ 관심지역은 전국 및 시도, 시군구를 선택하실 수 있습니다.">
						<img src="${pageContext.request.contextPath}/img/ico/ico_tooltip02.png" alt="아이콘" />
					</a>
				</h2>
				<dl class="SetArea">
					<dt><label for="inter-recommend-sido-select">관심지역</label></dt>
					<dd>
						<select id="inter-recommend-sido-select" data-type="inter-recommend" title="관심지역 시도 선택"></select>
						<select id="inter-recommend-sgg-select" title="관심지역 시군구 선택"></select>
					</dd>
				</dl>
			</div>
			<div class="stepBox HouseMap">
				<h2 style="line-height:1">
					기간선택
					<a href="javascript:void(0)" style="position: absolute;right: 10px;top: 7px;" data-subj="기간선택" title="○ 기간선택은 조회하실 기간을 분기단위로 선택하실 수 있습니다.">
						<img src="${pageContext.request.contextPath}/img/ico/ico_tooltip02.png" alt="아이콘" />
					</a>
				</h2>
				<dl class="SetArea">
					<dt style="width:100%;">
						<!-- 
						2016년 1Q
						<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2Q
						<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3Q
						<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4Q
						<br><br>
						2017년 1Q
						<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2Q
						<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3Q
						<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4Q
						 -->
						 
						
						<span id="job_best_from" ></span>
						~
						<span id="job_best_to" ></span>
						<br><br>
						<select id="select_job_best_from">
						<!-- mng_s 20220112_김건민 -->
							<option value="20201" selected="selected">2020년 1Q</option>
							<option value="20202">2020년 2Q</option>
							<option value="20203">2020년 3Q</option>
							<option value="20204">2020년 4Q</option>
							<option value="20211">2021년 1Q</option>
							<option value="20212">2021년 2Q</option>
							<option value="20213">2021년 3Q</option>
							<option value="20214">2021년 4Q</option>
						</select>
						~
						<select id="select_job_best_to">
							<option value="20201">2020년 1Q</option>
							<option value="20202">2020년 2Q</option>
							<option value="20203">2020년 3Q</option>
							<option value="20204">2020년 4Q</option>
							<option value="20211">2021년 1Q</option>
							<option value="20212">2021년 2Q</option>
							<option value="20213">2021년 3Q</option>
							<option value="20214" selected="selected">2021년 4Q</option>
						<!-- mng_e 20220112_김건민 -->
						</select>
						 
					</dt>
					<!-- 
					<dd style="position:absolute; margin-left:70px;margin-top: 12px; ">
						<div id="slider-range_job_best" style="width: 0.6em; height: 200px; display:none;"></div>
						<span id="job_best_from" style="top: 50px; margin-left: 50px; position: absolute;"></span>
						<span style="top: 75px; margin-left: 100px; position: absolute;">~</span>
						<span id="job_best_to" style="top: 100px; margin-left: 50px; position: absolute;"></span>
                         
					</dd>
					 -->
					
					
				</dl>
			</div>
		
			
		</div>
		<!-- End of 업종별 뜨는 지역 -->
		
		
	</div>
	
	<div class="btnBottom">
		<a href="javascript:$bizStatsLeftMenu.ui.viewThreeDepth();" class="btnStyle01 buttonMakeBtnClass" id="buttonMakeBtn01">조건 창 열기</a>
		<a href="javascript:$bizStatsLeftMenu.ui.addSearchBtn();" class="btnStyle01 buttonMakeBtnClass" id="buttonMakeBtn02">검색조건 생성</a>
	</div>
	<div class="bottom" id="hideClose"><a href="javascript:void(0)" class="stepClose">닫기</a></div>
</div>
<!-- 2Depth End -->

<!-- 3Depth Start -->
<div class="quickBox step03" id="areaSearchDetailDiv">
	<div class="subj" style="height: 33px;">
		<span id="submenuTitle_stop03">조건 설정하기</span>
		<!-- <a href="javascript:void(0)" class="stepClose">닫기</a> -->
	</div>
	<div class="scrollBox">
		<div class="stepBox" id="job_recommend_3depth">
			<!-- 사업체 업종 Start -->
			<div id="selectSidoSggMenu">
				<span class="noneTextBox on">대상지역 선택</span>
				<div class="selectSidoSggMenuCombo">
					<p style="font-size:13px; font-family:"나눔고딕";">시도 : </p>
					<select class="select" id="current-sido-select"><option>경기도</option></select>
					<p style="font-size:13px; font-family:"나눔고딕";">시군구 : </p>
					<select class="select" id="current-sgg-select"><option>전체</option></select>
					<p id="emdName"style="font-size:13px; font-family:"나눔고딕";">읍면동 : </p>
					<select class="select" id="current-emd-select"><option>전체</option></select>
				</div>
			</div>
			<div id="companyTabDiv" style="display: none;">
				<span class="noneTextBox on">사업체 업종선택</span>
				<div class="noneDefault">
					<!-- mng_s 20200616 김건민 (문구 수정함) -->
					<ol class="cateMenu type03">
						<%-- 2020년 SGIS고도화 3차(테마코드) 시작 - 기존 하드코딩 주석처리, 하드코딩 해소 (pse) --%>
						<%--
						<li class="on"><a href="javascript:$bizStatsLeftMenu.ui.companyTab('food');">요식업</a></li>
	                    <li><a href="javascript:$bizStatsLeftMenu.ui.companyTab('retail');">소매업</a></li>
	                    <li><a href="javascript:$bizStatsLeftMenu.ui.companyTab('service');">생활서비스</a></li>
	                    <li><a href="javascript:$bizStatsLeftMenu.ui.companyTab('hotel');">숙박업</a></li>
	                    --%>
						<c:forEach items="${allThemeCdInfo}" var="bigThemeItem" varStatus="status">
						<c:set var="bigThemeCd" value="${bigThemeItem.b_theme_cd}" />
						<c:set var="bigThemeCdNm" value="${bigThemeItem.b_theme_cd_nm}" />
						<li ${status.first ? "class='on'" : ''} ><a href="javascript:$bizStatsLeftMenu.ui.companyTab('${bigThemeCd}');" data-big-theme-cd='${bigThemeCd}'>${bigThemeCdNm}</a></li>
						</c:forEach>
	                    <%-- 2020년 SGIS고도화 3차(테마코드) 끝 - 기존 하드코딩 주석처리, 하드코딩 해소 (pse) --%>
					</ol>
					
					<%-- 2020년 SGIS고도화 3차(테마코드) 시작 - 기존 코드 주석처리, 하드코딩 해소 (pse) --%>
					<c:forEach items="${allThemeCdInfo}" var="bigThemeItem" varStatus="status">
					<c:set var="bigThemeCd" value="${bigThemeItem.b_theme_cd}" />
					<div class="cm<fmt:formatNumber minIntegerDigits="2" value="${status.count}" />">
						<ul class='honinType radioStepOneBox${status.first ? " validationStepBox" : "" }'>
							
							<c:forEach items="${bigThemeItem.s_theme_list}" var="smallThemeItem" varStatus="smallStatus">
							
							<c:set var="smallThemeCd" value="${smallThemeItem.theme_cd}" />
							<c:set var="smallThemeCdNm" value="${smallThemeItem.s_theme_cd_nm}" />
							<c:set var="isOddNum" value="${smallStatus.count % 2 == 1}" />
							
							<c:if test="${isOddNum }">
							<li>
							</c:if>
								<input type="checkbox" id="rd_sch_${bigThemeCd}_5001" name="rd_sch_${bigThemeCd}" value="${smallThemeCd}" ${status.first && smallStatus.first ? "checked='checked'" : "" } />
								<label for="rd_sch_${bigThemeCd}_${smallThemeCd}" ${status.first && smallStatus.first ? "class='on'" : "" }>${smallThemeCdNm}</label>
							<c:if test="${!isOddNum || smallStatus.end}">
							</li>
							</c:if>
							
							</c:forEach>
						</ul>
					</div>
					</c:forEach> 
					<%--
					<div class="cm01">
						<ul class="honinType radioStepOneBox validationStepBox"> <!-- 2016.03.21 수정, class추가 -->
							<li style="margin-top: 10px;">
								<input type="checkbox" id="rd_sch_food_5001" name="rd_sch_food" value="5001" checked=checked/>
								<label for="rd_sch_food_5001" class="on">한식</label>
								<input type="checkbox" id="rd_sch_food_5002" name="rd_sch_food" value="5002" />
								<label for="rd_sch_food_5002">중식</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_food_5003" name="rd_sch_food" value="5003" />
								<label for="rd_sch_food_5003">일식</label>
								<input type="checkbox" id="rd_sch_food_5004" name="rd_sch_food" value="5004" />
								<label for="rd_sch_food_5004">분식</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_food_5005" name="rd_sch_food" value="5005" />
								<label for="rd_sch_food_5005">서양식</label>
								<input type="checkbox" id="rd_sch_food_5006" name="rd_sch_food" value="5006" />
								<label for="rd_sch_food_5006">제과점</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_food_5007" name="rd_sch_food" value="5007" />
								<label for="rd_sch_food_5007">패스트푸드</label>
								<input type="checkbox" id="rd_sch_food_5008" name="rd_sch_food" value="5008" />
								<label for="rd_sch_food_5008">치킨</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_food_5009" name="rd_sch_food" value="5009" />
								<label for="rd_sch_food_5009">호프 및 간이주점</label>
								<input type="checkbox" id="rd_sch_food_5010" name="rd_sch_food" value="5010" />
								<label for="rd_sch_food_5010">카페</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_food_5011" name="rd_sch_food" value="5011" />
								<label for="rd_sch_food_5011">기타 외국식</label>
							</li>
						</ul>
					</div>
					<div class="cm02">
	                	<ul class="honinType radioStepOneBox">
							<li style="margin-top: 10px;">
								<input type="checkbox" id="rd_sch_retail_2001" name="rd_sch_retail" value="2001" />
								<label for="rd_sch_retail_2001">문구점</label>
								<input type="checkbox" id="rd_sch_retail_2002" name="rd_sch_retail" value="2002" />
								<label for="rd_sch_retail_2002">서점</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_retail_2003" name="rd_sch_retail" value="2003" />
								<label for="rd_sch_retail_2003">편의점</label>
								<input type="checkbox" id="rd_sch_retail_2004" name="rd_sch_retail" value="2004" />
								<label for="rd_sch_retail_2004">식료품점</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_retail_2005" name="rd_sch_retail" value="2005" />
								<label for="rd_sch_retail_2005">휴대폰점</label>
								<input type="checkbox" id="rd_sch_retail_2006" name="rd_sch_retail" value="2006" />
								<label for="rd_sch_retail_2006">의류</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_retail_2007" name="rd_sch_retail" value="2007" />
								<label for="rd_sch_retail_2007">화장품/방향제</label>
								<input type="checkbox" id="rd_sch_retail_2008" name="rd_sch_retail" value="2008" />
								<label for="rd_sch_retail_2008">철물점</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_retail_2009" name="rd_sch_retail" value="2009" />
								<label for="rd_sch_retail_2009">주유소</label>
								<input type="checkbox" id="rd_sch_retail_2010" name="rd_sch_retail" value="2010" />
								<label for="rd_sch_retail_2010">꽃집</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_retail_2011" name="rd_sch_retail" value="2011" />
								<label for="rd_sch_retail_2011">슈퍼마켓</label>
							</li>
						</ul>
					</div>
	                <div class="cm03">
	                	<ul class="honinType radioStepOneBox">
							<li style="margin-top: 10px;">
								<input type="checkbox" id="rd_sch_service_1001" name="rd_sch_service" value="1001" />
								<label for="rd_sch_service_1001">인테리어</label>
								<input type="checkbox" id="rd_sch_service_1002" name="rd_sch_service" value="1002" />
								<label for="rd_sch_service_1002">목욕탕</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_service_1003" name="rd_sch_service" value="1003" />
								<label for="rd_sch_service_1003">교습학원</label>
								<input type="checkbox" id="rd_sch_service_1004" name="rd_sch_service" value="1004" />
								<label for="rd_sch_service_1004">어학원</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_service_1005" name="rd_sch_service" value="1005" />
								<label for="rd_sch_service_1005">예체능학원</label>
								<input type="checkbox" id="rd_sch_service_1006" name="rd_sch_service" value="1006" />
								<label for="rd_sch_service_1006">부동산중개업</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_service_1007" name="rd_sch_service" value="1007" />
								<label for="rd_sch_service_1007">이발소</label>
								<input type="checkbox" id="rd_sch_service_1008" name="rd_sch_service" value="1008" />
								<label for="rd_sch_service_1008">미용실</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_service_1009" name="rd_sch_service" value="1009" />
								<label for="rd_sch_service_1009">세탁소</label>
								<input type="checkbox" id="rd_sch_service_1010" name="rd_sch_service" value="1010" />
								<label for="rd_sch_service_1010">PC방</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_service_1011" name="rd_sch_service" value="1011" />
								<label for="rd_sch_service_1011">노래방</label>
							</li>
						</ul>
					</div>
	                <div class="cm04">
	                	<ul class="honinType radioStepOneBox">
							<li style="margin-top: 10px;">
								<input type="checkbox" id="rd_sch_hotel_4001" name="rd_sch_hotel" value="4001" />
								<label for="rd_sch_hotel_4001">호텔</label>
								<input type="checkbox" id="rd_sch_hotel_4002" name="rd_sch_hotel" value="4002" />
								<label for="rd_sch_hotel_4002">여관(모텔포함) 및 여인숙</label>
							</li>
							<li>
								<input type="checkbox" id="rd_sch_hotel_4003" name="rd_sch_hotel" value="4003" />
								<label for="rd_sch_hotel_4003">펜션</label>
							</li>
						</ul>
					</div>
					--%>
					<%-- 2020년 SGIS고도화 3차(테마코드) 끝 - 기존 코드 주석처리, 하드코딩 해소 (pse) --%>
				</div>
			</div>
			<!-- 사업체 업종 End -->
			<!-- 사업체 수 Start -->
			<div id="companyCountDiv" style="display: none;">
	            <span class="noneTextBox on">해당 업종 사업체 수 설정</span>
			    <div class="noneDefault">
			    	<div class="sliderDefault" id="companyCount"></div>
	               	<ul class="sliderDefault_bar">
	               		<li>적은지역</li>
	                    <li>평균지역</li>
	                    <li>많은지역</li>
					</ul>
			    </div>
		    </div>
		    <!-- 사업체 수 End -->
		    <!-- 사업체 증감  Start -->
		    <div id="companyIncreaseDiv" style="display: none;">
			    <span class="noneTextBox on">해당 업종 사업체 증감 설정</span>
			    <div class="noneDefault">
					<div class="sliderDefault" id="companyIncrease"></div>
	                <ul class="sliderDefault_bar">
	                	<li>낮은지역</li>
	                    <li>평균지역</li>
	                    <li>높은지역</li> 
					</ul>
				</div>
			</div>
			<!-- 사업체 증감 End -->
			<!-- 직장인구 Start -->
			<div id="jobPeopleDiv" style="display: none;">
				<span class="noneTextBox on">직장인구 설정</span> 
			    <div class="noneDefault">
			    	<div class="sliderDefault" id="jobPeople"></div>
					<ul class="sliderDefault_bar">
	                   	<li>적은지역</li>
	                    <li>평균지역</li>
	                    <li>많은지역</li> 
					</ul>
		    	</div>
		    </div>
		    <!-- 직장인구 End -->
		    <!-- 거주인구 Start -->
		    <div id="stayPeopleDiv" style="display: none;">
			    <span class="noneTextBox on">거주인구 설정</span>  
			    <div class="noneDefault">
			    	<div class="sliderDefault" id="stayPeople"></div>
					<ul class="sliderDefault_bar">
	                   	<li>적은지역</li>
	                    <li>평균지역</li>
	                    <li>많은지역</li> 
					</ul>
		    	</div>
		    </div>
		    <!-- 거주인구 End -->
		    <!-- 성별인구 Start -->
		    <div id="genderPeopleDiv" style="display: none;">
			    <span class="noneTextBox on">성별인구 설정</span>
			    <div class="noneDefault">
			    	<ul class="dbTypeCk radioStepBox validationStepBox"> <!-- 2016.03.21 수정, class추가 -->
						 <li>
<!-- 				        	<input type="radio" id="population_gender01" name="population_gender"  value="0" />
				            <label for="population_gender01" class="mr20">전체</label> -->
				            <input type="radio" id="population_gender02" name="population_gender" value="1" checked=checked />
				            <label for="population_gender02" class="mr20 on">남자</label>
				            <input type="radio" id="population_gender03" name="population_gender" value="2" />
				            <label for="population_gender03">여자</label>
				        </li> 
					</ul>
			    	<div class="sliderDefault" id="genderPeople"></div>
						<ul class="sliderDefault_bar">
							<li>적은지역</li>
	                     	<li>평균지역</li>
	                     	<li>많은지역</li> 
	                 </ul>
			    </div>
		    </div>
		    <!-- 성별인구 End -->
		    <!-- 연령별 인구 Start -->
		    <div id="agePeopleDiv" style="display: none;">
			    <span class="noneTextBox on">연령별 인구 설정, 다중선택 가능</span> 
			    <div class="noneDefault">
					<ul class="honinType multiCheckBox">
	                	<li>
	                    	<input type="checkbox" id="rd_age01" name="rd_age" value="10_under" checked=checked> <!-- 2016.03.21 수정, checked추가 -->
				            <label for="rd_age01" class="on">10세미만</label>
				            <input type="checkbox" id="rd_age02" name="rd_age" value="10">
				            <label for="rd_age02">10대</label>
						</li>
	                    <li>
	                    	<input type="checkbox" id="rd_age03" name="rd_age" value="20">
				            <label for="rd_age03">20대</label>
				            <input type="checkbox" id="rd_age04" name="rd_age" value="30">
				            <label for="rd_age04">30대</label>
						</li> 
	                    <li>
	                    	<input type="checkbox" id="rd_age05" name="rd_age" value="40">
				            <label for="rd_age05">40대</label>
				            <input type="checkbox" id="rd_age06" name="rd_age" value="50">
				            <label for="rd_age06">50대</label>
						</li> 
	                    <li>
	                    	<input type="checkbox" id="rd_age07" name="rd_age" value="60">
				            <label for="rd_age07">60대</label>
				            <input type="checkbox" id="rd_age08" name="rd_age" value="70_over">
				            <label for="rd_age08">70세 이상</label>
						</li> 
					</ul>
					<div class="sliderDefault" id="agePeople"></div>
	               	<ul class="sliderDefault_bar">
						<li>적은지역</li>
	                    <li>평균지역</li>
	                   	<li>많은지역</li> 
					</ul>
				</div>
			</div>
			<!-- 연령별 인구 End -->
			<!-- 가구유형 Start -->
			<div id="householdDiv" style="display: none;">
			    <span class="noneTextBox on">세대구성별 설정</span> 
			    <div class="noneDefault">
			    	<ul class="honinType radioStepOneBox validationStepBox"> <!-- 2016.03.21 수정, class추가 -->
			    		<li>
				            <input type="checkbox" id="rd_household01" name="household_type" value="01" checked=checked />
				            <label for="rd_household01" class="on">1세대 가구</label>
				            <input type="checkbox" id="rd_household02" name="household_type" value="02" />
				            <label for="rd_household02">2세대 가구</label>
				        </li>
				        <li>
				            <input type="checkbox" id="rd_household03" name="household_type" value="03" />
				            <label for="rd_household03">3세대 가구</label>
				            <input type="checkbox" id="rd_household04" name="household_type" value="04" />
				            <label for="rd_household04">4세대 가구</label>
				        </li>
				        <li>
				            <input type="checkbox" id="rd_household05" name="household_type" value="05" />
				            <label for="rd_household05">5세대 이상 가구</label>
				            <input type="checkbox" id="rd_household06" name="household_type" value="A0" />
				            <label for="rd_household06">1인가구</label>
				        </li>
				        <li>
				            <input type="checkbox" id="rd_household07" name="household_type" value="B0" />
				            <label for="rd_household07">비혈연가구</label>
				        </li>
					</ul>
	                <div class="sliderDefault" id="household"></div>
	                <ul class="sliderDefault_bar">
	                    <li>적은지역</li>
	                	<li>평균지역</li>
	                	<li>많은지역</li> 
					</ul>
				</div>
			</div>
			<!-- 가구유형 End -->
			<!-- 점유형태 Start -->
			<div id="occupyTypeDiv" style="display: none;">
			    <span class="noneTextBox on">점유 형태별 설정</span> 
			    <div class="noneDefault">
			    	<ul class="honinType radioStepOneBox validationStepBox"> <!-- 2016.03.21 수정, class추가 -->
						<li>
				            <input type="checkbox" id="rd_occupy01" name="ocptn_type" value="1" checked=checked />
				            <label for="rd_occupy01" class="on">자기집</label>
				            <input type="checkbox" id="rd_occupy02" name="ocptn_type" value="2" />
				            <label for="rd_occupy02">전세(월세없음)</label>
				        </li>
				        <li>
				            <input type="checkbox" id="rd_occupy03" name="ocptn_type" value="3" />
				            <label for="rd_occupy03">보증금 있는 월세</label>
				            <input type="checkbox" id="rd_occupy04" name="ocptn_type" value="4" />
				            <label for="rd_occupy04">보증금 없는 월세</label>
				        </li>
				        <li>
				            <input type="checkbox" id="rd_occupy05" name="ocptn_type" value="5" />
				            <label for="rd_occupy05">사글세</label>
				            <input type="checkbox" id="rd_occupy06" name="ocptn_type" value="6" />
				            <label for="rd_occupy06">무상(관사, 사택, 친척집 등)</label>
				        </li>
					</ul>
			    	<div class="sliderDefault" id="occupyType"></div>
					<ul class="sliderDefault_bar">
	                	<li>적은지역</li>
	                    <li>평균지역</li>
	                    <li>많은지역</li> 
					</ul>
				</div>
			</div>
			<!-- 점유형태 End -->
			<!-- 거주 주택 Start -->
			<div id="houseLivingTypeDiv" style="display: none;">
			    <span class="noneTextBox on">거주 주택 유형 설정</span>  
			    <div class="noneDefault">
			    	<ul class="honinType radioStepOneBox validationStepBox"> <!-- 2016.03.21 수정, class추가 -->
						<li>
				            <input type="checkbox" id="rd_home01" name="house_type" value="01" checked=checked />
				            <label for="rd_home01" class="on">단독주택</label>
				            <input type="checkbox" id="rd_home02" name="house_type" value="02" />
				            <label for="rd_home02">아파트</label>
				        </li>
				        <li>
				            <input type="checkbox" id="rd_home03" name="house_type" value="03" />
				            <label for="rd_home03">연립주택</label>
				            <input type="checkbox" id="rd_home04" name="house_type" value="04" />
				            <label for="rd_home04">다세대주택</label>
				        </li>
				        <li>
				            <input type="checkbox" id="rd_home05" name="house_type" value="05" />
				            <label for="rd_home05">비주거용건물(상가,공장,여관 등)내주택</label>
				            <input type="checkbox" id="rd_home06" name="house_type" value="06" />
				            <label for="rd_home06">주택이외의 거처</label>
				        </li>
					</ul>
			    </div>
			</div>
			<!-- 거주 주택 End -->
			<!-- 해당 주택 수 Start -->
			<div id="houseTypeDiv" style="display: none;">
			    <span class="noneTextBox on">해당 주택 수 설정</span>
			    <div class="noneDefault">
			    	<div class="sliderDefault" id="houseType"></div>
					<ul class="sliderDefault_bar">
	                   	<li>적은지역</li>
	                    <li>평균지역</li>
	                    <li>많은지역</li>
					</ul>
		    	</div>
		    </div>
	    	<!-- 해당 주택 수 End -->
	    	<!-- 아파트 시세 Start -->
	    	<div id="apartPriceDiv" style="display: none;">
			    <span class="noneTextBox on">공시지가 설정</span>   
			    <div class="noneDefault">
			    	<div class="sliderDefault" id="apartPrice"></div>
					<ul class="sliderDefault_bar">
	                   	<li>낮은지역</li>
	                    <li>평균지역</li>
	                    <li>높은지역</li> 
					</ul>
		    	</div>
		    </div>
			<!-- 아파트 시세 End -->
	    	<!-- 노후 주택 Start -->
	    	<div id="oldHouseDiv" style="display: none;">
			    <span class="noneTextBox on">20년 이상 된 해당 주택 수 설정</span>   
			    <div class="noneDefault">
			    	<div class="sliderDefault" id="oldHouse"></div>
					<ul class="sliderDefault_bar">
	                   	<li>적은지역</li>
	                    <li>평균지역</li>
	                    <li>많은지역</li> 
					</ul>
		    	</div>
		    </div>
	    	<!-- 노후 주택 End -->
		</div>
		
		<!-- mng_s ====================================== 업종별 뜨는 지역 시작 ========================================== -->
		<div  id="API_0009" class="totalResult tr10">
			<div class="stepBox">
				<a href="javascript:void(0)" class="roundTextBox">문화체육(5종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
						<!-- input type의 이름 jj_ 는 bizStatsDataBoard.js에서 이름을 맞추어 주어야한다.  -->
						<li>
							<input type="checkbox" id="jj_culture_22_09_01_P" name="jj_culture" value="22_09_01_P" />
							<label for="jj_culture_22_09_01_P">인터넷 컴퓨터 게임시설 제공업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_culture_22_14_01_P" name="jj_culture" value="22_14_01_P" />
							<label for="jj_culture_22_14_01_P">청소년 게임 제공업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_culture_21_06_01_P" name="jj_culture" value="21_06_01_P" />
							<label for="jj_culture_21_06_01_P">노래 연습장업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_culture_23_06_01_P" name="jj_culture" value="23_06_01_P" />
							<label for="jj_culture_23_06_01_P">체육도장업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_culture_23_12_01_P" name="jj_culture" value="23_12_01_P" />
							<label for="jj_culture_23_12_01_P">무도 학원업</label>
						</li>
						
						
						<!-- 
						<li>
							<input type="checkbox" id="jj_culture_41_36_01_P" name="jj_culture" value="41_36_01_P" />
							<label for="jj_culture_41_36_01_P">공중이용시설(학원)</label>
						</li>
						
						
						<li>
							<input type="checkbox" id="jj_culture_23_11_01_P" name="jj_culture" value="23_11_01_P" />
							<label for="jj_culture_23_11_01_P">무도장업</label>
						</li>
						 -->
						
					</ul>
				</div>
				<a href="javascript:void(0)" class="roundTextBox">관광(6종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
						<li>
							<input type="checkbox" id="jj_tour_41_43_01_P" name="jj_tour" value="41_43_01_P" />
							<label for="jj_tour_41_43_01_P">숙박업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_tour_41_16_01_P" name="jj_tour" value="41_16_01_P" />
							<label for="jj_tour_41_16_01_P">숙박업(일반-여관업)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_tour_41_17_01_P" name="jj_tour" value="41_17_01_P" />
							<label for="jj_tour_41_17_01_P">숙박업(일반-여인숙업)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_tour_41_14_01_P" name="jj_tour" value="41_14_01_P" />
							<label for="jj_tour_41_14_01_P">숙박업(일반-일반호텔)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_tour_41_13_01_P" name="jj_tour" value="41_13_01_P" />
							<label for="jj_tour_41_13_01_P">숙박업(일반-관광호텔)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_tour_16_19_01_P" name="jj_tour" value="16_19_01_P" />
							<label for="jj_tour_16_19_01_P">관광펜션업</label>
						</li>
						
						
						<!-- 
						<li>
							<input type="checkbox" id="jj_tour_41_15_01_P" name="jj_tour" value="41_15_01_P" />
							<label for="jj_tour_41_15_01_P">숙박업(일반-휴양콘도미니엄업)</label>
						</li>
						 -->
						
						
					</ul>
				</div>
				<a href="javascript:void(0)" class="roundTextBox">식품(25종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
						<li>
							<input type="checkbox" id="jj_food_24_01_01_P" name="jj_food" value="24_01_01_P" />
							<label for="jj_food_24_01_01_P">일반음식점(한식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_44_01_P" name="jj_food" value="24_44_01_P" />
							<label for="jj_food_24_44_01_P">휴게음식점(커피숍)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_20_01_P" name="jj_food" value="24_20_01_P" />
							<label for="jj_food_24_20_01_P">일반음식점(기타)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_12_01_P" name="jj_food" value="24_12_01_P" />
							<label for="jj_food_24_12_01_P">일반음식점(호프/통닭)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_05_01_P" name="jj_food" value="24_05_01_P" />
							<label for="jj_food_24_05_01_P">일반음식점(분식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_18_01_P" name="jj_food" value="24_18_01_P" />
							<label for="jj_food_24_18_01_P">일반음식점(식육(숯불구이))</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_03_01_P" name="jj_food" value="24_03_01_P" />
							<label for="jj_food_24_03_01_P">일반음식점(경양식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_42_01_P" name="jj_food" value="24_42_01_P" />
							<label for="jj_food_24_42_01_P">휴게음식점(편의점)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_48_01_P" name="jj_food" value="24_48_01_P" />
							<label for="jj_food_24_48_01_P">제과점영업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_07_01_P" name="jj_food" value="24_07_01_P" />
							<label for="jj_food_24_07_01_P">일반음식점(정종,대포집,소주방)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_04_01_P" name="jj_food" value="24_04_01_P" />
							<label for="jj_food_24_04_01_P">일반음식점(일식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_02_01_P" name="jj_food" value="24_02_01_P" />
							<label for="jj_food_24_02_01_P">일반음식점(중국식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_43_01_P" name="jj_food" value="24_43_01_P" />
							<label for="jj_food_24_43_01_P">휴게음식점(패스트푸드)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_16_01_P" name="jj_food" value="24_16_01_P" />
							<label for="jj_food_24_16_01_P">일반음식점(횟집)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_32_01_P" name="jj_food" value="24_32_01_P" />
							<label for="jj_food_24_32_01_P">단란주점영업</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_06_01_P" name="jj_food" value="24_06_01_P" />
							<label for="jj_food_24_06_01_P">일반음식점(뷔페식)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_15_01_P" name="jj_food" value="24_15_01_P" />
							<label for="jj_food_24_15_01_P">일반음식점(김밥(도시락))</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_19_01_P" name="jj_food" value="24_19_01_P" />
							<label for="jj_food_24_19_01_P">일반음식점(탕류(보신용))</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_45_01_P" name="jj_food" value="24_45_01_P" />
							<label for="jj_food_24_45_01_P">휴게음식점(전통찻집)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_81_01_P" name="jj_food" value="24_81_01_P" />
							<label for="jj_food_24_81_01_P">일반음식점(패밀리레스토랑)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_76_01_P" name="jj_food" value="24_76_01_P" />
							<label for="jj_food_24_76_01_P">일반음식점(라이브카페)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_71_01_P" name="jj_food" value="24_71_01_P" />
							<label for="jj_food_24_71_01_P">유흥주점영업(노래클럽)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_68_01_P" name="jj_food" value="24_68_01_P" />
							<label for="jj_food_24_68_01_P">일반음식점(감성주점)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_70_01_P" name="jj_food" value="24_70_01_P" />
							<label for="jj_food_24_70_01_P">일반음식점(냉면집)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_food_24_30_01_P" name="jj_food" value="24_30_01_P" />
							<label for="jj_food_24_30_01_P">유흥주점영업(간이주점)</label>
						</li>
						
						<!-- 
						<li>
							<input type="checkbox" id="jj_food_24_14_01_P" name="jj_food" value="24_14_01_P" />
							<label for="jj_food_24_14_01_P">일반음식점(복어취급)</label>
						</li>
						 -->
					</ul>
				</div>
				<a href="javascript:void(0)" class="roundTextBox">소상공인(17종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
					
						<li><input type="checkbox" id="jj_service_41_40_01_P" name="jj_service" value="41_40_01_P" /><label for="jj_service_41_40_01_P">미용업(일반)	                  </label></li>
						<li><input type="checkbox" id="jj_service_41_41_01_P" name="jj_service" value="41_41_01_P" /><label for="jj_service_41_41_01_P">미용업(피부)	                  </label></li>
						<li><input type="checkbox" id="jj_service_41_40_02_P" name="jj_service" value="41_40_02_P" /><label for="jj_service_41_40_02_P">미용업(손톱ㆍ발톱)	              </label></li>
						<li><input type="checkbox" id="jj_service_41_24_01_P" name="jj_service" value="41_24_01_P" /><label for="jj_service_41_24_01_P">이용업	                          </label></li>
						<li><input type="checkbox" id="jj_service_41_41_02_P" name="jj_service" value="41_41_02_P" /><label for="jj_service_41_41_02_P">미용업(피부/손톱ㆍ발톱)	          </label></li>
						<li><input type="checkbox" id="jj_service_41_42_01_P" name="jj_service" value="41_42_01_P" /><label for="jj_service_41_42_01_P">미용업(종합)	                  </label></li>
						<li><input type="checkbox" id="jj_service_41_40_04_P" name="jj_service" value="41_40_04_P" /><label for="jj_service_41_40_04_P">미용업(일반/손톱ㆍ발톱)	          </label></li>
						<li><input type="checkbox" id="jj_service_41_40_09_P" name="jj_service" value="41_40_09_P" /><label for="jj_service_41_40_09_P">미용업(일반/화장ㆍ분장)	          </label></li>
						<li><input type="checkbox" id="jj_service_41_40_05_P" name="jj_service" value="41_40_05_P" /><label for="jj_service_41_40_05_P">미용업(일반/손톱ㆍ발톱/화장ㆍ분장)</label></li>
						<li><input type="checkbox" id="jj_service_41_40_03_P" name="jj_service" value="41_40_03_P" /><label for="jj_service_41_40_03_P">미용업(손톱ㆍ발톱/화장ㆍ분장)	  </label></li>
						<li><input type="checkbox" id="jj_service_41_19_01_P" name="jj_service" value="41_19_01_P" /><label for="jj_service_41_19_01_P">목욕장업(공동탕업)	              </label></li>
						<li><input type="checkbox" id="jj_service_41_41_05_P" name="jj_service" value="41_41_05_P" /><label for="jj_service_41_41_05_P">미용업(화장ㆍ분장)	              </label></li>
						<li><input type="checkbox" id="jj_service_41_40_06_P" name="jj_service" value="41_40_06_P" /><label for="jj_service_41_40_06_P">미용업(일반/피부)	              </label></li>
						<li><input type="checkbox" id="jj_service_41_41_03_P" name="jj_service" value="41_41_03_P" /><label for="jj_service_41_41_03_P">미용업(피부/손톱ㆍ발톱/화장ㆍ분장)</label></li>
						<li><input type="checkbox" id="jj_service_41_40_07_P" name="jj_service" value="41_40_07_P" /><label for="jj_service_41_40_07_P">미용업(일반/피부/손톱ㆍ발톱)	  </label></li>
						<li><input type="checkbox" id="jj_service_41_41_04_P" name="jj_service" value="41_41_04_P" /><label for="jj_service_41_41_04_P">미용업(피부/화장ㆍ분장)	          </label></li>
						<li><input type="checkbox" id="jj_service_41_40_08_P" name="jj_service" value="41_40_08_P" /><label for="jj_service_41_40_08_P">미용업(일반/피부/화장ㆍ분장)	  </label></li>
						
						
						
						
						
						<!-- 
						<li>
							<input type="checkbox" id="jj_service_41_22_01_P" name="jj_service" value="41_22_01_P" />
							<label for="jj_service_41_22_01_P">목욕장업(공동탕업+찜질시설서비스영업)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_service_41_21_01_P" name="jj_service" value="41_21_01_P" />
							<label for="jj_service_41_21_01_P">목욕장업(찜질시설서비스영업)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_service_41_20_01_P" name="jj_service" value="41_20_01_P" />
							<label for="jj_service_41_20_01_P">목욕장업(한증막업)</label>
						</li>
						 -->
						
						
					</ul>
				</div>
				
				<a href="javascript:void(0)" class="roundTextBox">산업고용(3종)</a>
				<div class="joinDefault">
					<ul class="jobArea_stepBox">
						<li>
							<input type="checkbox" id="jj_sanup_42_08_05_P" name="jj_sanup" value="42_08_05_P" />
							<label for="jj_sanup_42_08_05_P">석유판매업(주유소)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_sanup_42_03_01_P" name="jj_sanup" value="42_03_01_P" />
							<label for="jj_sanup_42_03_01_P">석유 및 석유대체연료 판매업체</label>
						</li>
						<li>
							<input type="checkbox" id="jj_sanup_42_08_04_P" name="jj_sanup" value="42_08_04_P" />
							<label for="jj_sanup_42_08_04_P">석유판매업(일반판매소)</label>
						</li>
						
						<!-- 
						<li>
							<input type="checkbox" id="jj_sanup_42_08_07_P" name="jj_sanup" value="42_08_07_P" />
							<label for="jj_sanup_42_08_07_P">석유판매업(항공유판매소)</label>
						</li>
						<li>
							<input type="checkbox" id="jj_sanup_42_08_06_P" name="jj_sanup" value="42_08_06_P" />
							<label for="jj_sanup_42_08_06_P">석유판매업(특수판매소)</label>
						</li>
						
						<li>
							<input type="checkbox" id="jj_sanup_42_08_03_P" name="jj_sanup" value="42_08_03_P" />
							<label for="jj_sanup_42_08_03_P">석유판매업(용제판매소)</label>
						</li>
						
						<li>
							<input type="checkbox" id="jj_sanup_42_08_02_P" name="jj_sanup" value="42_08_02_P" />
							<label for="jj_sanup_42_08_02_P">석유판매업(부생연료유판매소)</label>
						</li>
						 -->
						
					</ul>
				</div>
			</div>
		</div>
		<!-- mng_s 업종별 뜨는 지역 끝 -->
		
	</div>
	
	<div class="btnBottom" id="job_recommend_3depth_btn">
		<a href="javascript:$bizStatsLeftMenu.ui.addSearchBtn();" class="btnStyle02">조건 검색</a><!-- id duple 문제로 id="buttonMakeBtn02" 삭제 문제시 id 추가 조치하면 됨 -->
	</div>
	<div class="bottom"><a href="javascript:void(0)" class="stepClose">닫기</a></div>
</div>
<!-- 3Depth End -->
