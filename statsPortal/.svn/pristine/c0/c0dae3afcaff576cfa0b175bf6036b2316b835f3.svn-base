<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 구인 현황 분석 > 서브 메뉴
* File Name		: statusAnls > saSubMenu.jsp
* Comment		:
* History		: 2018-09-07	ywKim	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="${pageContext.request.contextPath}/js/workRoad/statusAnls/saSubMenu.js"></script>
<!-- 2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START -->
<style>
#saSubMenu #current-sido-select,
#saSubMenu #current-sgg-select,
#saSubMenu #current-term-select{width:100% !important; border:0;}
#saSubMenu #quickBox_2depth {width: 280px;}
#saSubMenu #quickBox_2depth .stepBox ul > li{border-bottom-width: 0px !important;}
#saSubMenu #API_WORK-01{float: left; width:280px;}
#saSubMenu #API_WORK-02{float: left; width:calc(100% - 300px); padding: 10px 20px 10px 0px;}
#saSubMenu #API_WORK-01 .stepBox {padding:0;}
#saSubMenu #API_WORK-02 .stepBox {padding:0;}
#saSubMenu .normalBox .mCSB_container{width:100% !important;}
#saSubMenu .stepBox p.on,
#saSubMenu .stepBox ul.dbTypeCk{width:calc(100% - 50px);}
#saSubMenu .workRoad .quickBox .bottom > a.stepOpen{position:absolute;z-index:1001;top:360px;right:-25px;display:block;overflow:hidden;width:25px;height:68px;text-indent:-2000px;opacity:1;background-image:url(../../images/workRoad/lnb_open.png);background-repeat:no-repeat;}

#saSubMenu .IndexSelect { position:relative; height:350px; width: 100%; height: 100%;}
#saSubMenu .IndexSelect a { font-family: "나눔고딕";display:inline-block; font-size:12px; position:relative;  width: 100% !important; text-align: left !important; background-color: transparent !important;}
#saSubMenu .IndexSelect a:hover { color:#000;}
#saSubMenu .IndexSelect div.indexSubDiv { position:absolute; left:134px; padding:0px; border:#21b69a solid 2px; border-radius:4px; background:#fff; width:310px; visibility:hidden; box-sizing:border-box;}
#saSubMenu .IndexSelect div.indexSubDiv:before { content:''; display:block; background:url(/images/workRoad/icon_box_arrow.png) no-repeat left top; width:9px; height:17px; position:absolute; left:-9px;}
#saSubMenu .IndexSelect ul.indexData li {
	padding: 10px;
	margin: 0px;
}
/* 2020.04.23[한광희] 월평균자료 조회 기능 추가로 인한 css 수정 START */
/* #saSubMenu .IndexSelect li { padding:9px 9px 9px 0px;}
#saSubMenu .IndexSelect li:first-child { padding:9px 9px 9px 0px;}
#saSubMenu .IndexSelect li:last-child { padding:9px 9px 9px 0px;} */
#saSubMenu .IndexSelect li { padding:7px 9px 7px 0px;}
#saSubMenu .IndexSelect li:first-child { padding:7px 9px 7px 0px;}
#saSubMenu .IndexSelect li:last-child { padding:7px 9px 7px 0px;}
/* 2020.04.23[한광희] 월평균자료 조회 기능 추가로 인한 css 수정 END */
/* .IndexSelect li.M_on:after { content:''; display:block; background:url(/images/workRoad/icon_check.png) no-repeat left top; width:16px; height:14px; position:absolute; left:25px; top:5px;} */
#saSubMenu .IndexSelect li li { margin-bottom:15px;}
#saSubMenu .IndexSelect ul a { display:inline-block; font-size:11px; letter-spacing:-1px;}
#saSubMenu .IndexSelect ul span { display:inline-block; font-size:11px; position:absolute; left:auto; top:auto; padding:2px 2px; background:#999; color:#fff; border-radius:4px; }
#saSubMenu .IndexSelect ul span.bagic { font-family:'나눔고딕'; font-size:11px; color:#fff; background:#666; width:84px; height:17px; border-radius:9px;display:inline-block; vertical-align:middle; text-align:center; padding-top:3px; box-sizing:border-box; margin-left:4px; line-height:1; }
#saSubMenu .IndexSelect ul span.bagic strong { color:#ff0;}
#saSubMenu .IndexSelect ul span.SetStart { display:inline-block; width:120px; height:19px; border:#ddd solid 1px; border-radius:10px; box-sizing:border-box;font-family:'나눔고딕'; font-size:11px; color:#666; padding:1px 1px 1px 5px; line-height:1.4; vertical-align:middle; position:absolute; left:37px; top:20px;box-shadow:inset 3px 3px 3px #f4f4f4; background-color:#fff;}
#saSubMenu .IndexSelect ul span.SetStart button { width:30px; height:15px; font-size:11px; vertical-align:middle; background:#ececec; border:#ddd solid 1px; border-radius:8px; box-sizing:border-box; padding:0 !important; text-align:center; margin-left:2px; line-height:1; margin-top:-1px;}
#saSubMenu .IndexSelect ul span.SetStart button.M_on {background: linear-gradient(#0abfd6, #0d9caf); color:#fff; border:none;}
#saSubMenu .IndexSelect ul span.SetStepBar1 { display:inline-block; width:131px; height:19px; border:#ddd solid 1px; border-radius:10px; box-sizing:border-box;font-family:'나눔고딕'; font-size:11px; color:#666; padding:1px 1px 1px 5px; line-height:1.4; vertical-align:middle; position:absolute; left:156px; top:20px;box-shadow:inset 3px 3px 3px #f4f4f4; background-color:#fff;}
#saSubMenu .IndexSelect ul span.SetStepBar1 span { display:inline-block; width:78px; height:7px; background:url(/images/workRoad/setstep_bg.png) no-repeat center center; vertical-align:middle; position:relative; margin-left:3px;}
#saSubMenu .IndexSelect ul span.SetStepBar1 span span.SetStopPoint { width:7px; height:7px; background: linear-gradient(#0abfd6, #0d9caf); position:absolute; top:0; margin-left:-3.5px; border-radius:4px;}

#saSubMenu .IndexSelect ul a.indecator-item { width:100%;}
#saSubMenu .IndexSelect img { vertical-align:middle; margin-right:5px;}
#saSubMenu .IndexSelect a img { opacity:0.4;}
#saSubMenu .IndexSelect a:hover img { opacity:1;}
#saSubMenu .IndexSelect .M_on a.indexL { color:#000;}
#saSubMenu .IndexSelect .M_on a.indexL img { opacity:1;}
#saSubMenu .IndexSelect .M_on a.indexL:after { content:''; display:block; background:url(/images/workRoad/icon_check.png) no-repeat left top; width:16px; height:14px; position:absolute; left:22px; top:2px;}

#saSubMenu .IndexSelect.SetStep ul img { vertical-align:text-top !important; margin-right:8px;}

#saSubMenu .IndexSelect>li { border: #ffffff solid 2px; }
#saSubMenu .IndexSelect>li.M_on { border: #21b69a solid 2px; border-right: #ffffff solid 0px;}
#saSubMenu .IndexSelect>li.M_on2 { border: #ffffff solid 2px; }
/*#saSubMenu .IndexSelect .M_on div.indexSubDiv { visibility:visible;}*/
#saSubMenu .IndexSelect ul .M_on2 div.indexSubDiv { visibility:hidden !important;}
#saSubMenu .IndexSelect ul .M_on a { color:#000;}
#saSubMenu .IndexSelect ul .M_on a img { opacity:1;}
#saSubMenu .IndexSelect ul .M_on a:after { content:''; display:block; background:url(/images/workRoad/icon_check.png) no-repeat left top; width:16px; height:14px; position:absolute; left:20px; top:2px;}
#saSubMenu .IndexSelect ul li { position:relative;}
/* .IndexSelect .index1 ul {top:-10px;}
.IndexSelect .index2 ul {top:0px;}
.IndexSelect .index3 ul {top:70px;}
.IndexSelect .index4 ul {top: -5px;}
.IndexSelect .index5 ul {top:35px;}
.IndexSelect .index6 ul {top:170px;}
.IndexSelect .index7 ul {top:30px;} */
#saSubMenu .IndexSelect .index1 div.indexSubDiv ,
#saSubMenu .IndexSelect .index2 div.indexSubDiv ,
#saSubMenu .IndexSelect .index3 div.indexSubDiv ,
#saSubMenu .IndexSelect .index4 div.indexSubDiv ,
#saSubMenu .IndexSelect .index5 div.indexSubDiv ,
#saSubMenu .IndexSelect .index6 div.indexSubDiv ,
#saSubMenu .IndexSelect .index7 div.indexSubDiv {
	top:0px;
	height: 100%;
}
/* .IndexSelect .index1 ul:before { top:10px;}
.IndexSelect .index2 ul:before { top:50px;}
.IndexSelect .index3 ul:before { top:30px;}
.IndexSelect .index4 ul:before { top:155px;}
.IndexSelect .index5 ul:before { top:165px;}
.IndexSelect .index6 ul:before { top:80px;}
.IndexSelect .index7 ul:before { top:265px;} */
#saSubMenu .IndexSelect .index1 div.indexSubDiv:before { top:3px;}
#saSubMenu .IndexSelect .index2 div.indexSubDiv:before { top:53px;}
#saSubMenu .IndexSelect .index3 div.indexSubDiv:before { top:102px;}
#saSubMenu .IndexSelect .index4 div.indexSubDiv:before { top:151px;}
#saSubMenu .IndexSelect .index5 div.indexSubDiv:before { top:200px;}
#saSubMenu .IndexSelect .index6 div.indexSubDiv:before { top:249px;}
#saSubMenu .IndexSelect .index7 div.indexSubDiv:before { top:298px;}

#saSubMenu .IndexSelect.UnSelect a:hover { color:#666;}
#saSubMenu .IndexSelect.UnSelect a:hover img { opacity:0.4;}
#saSubMenu .IndexSelect.UnSelect .M_on a { color:#666;}
#saSubMenu .IndexSelect.UnSelect .M_on a img { opacity:0.4;}
#saSubMenu .IndexSelect.UnSelect .M_on ul li span { opacity:0.4;}
#saSubMenu .IndexSelect .UnSelect .bagic { opacity:0.5;}
#saSubMenu .IndexSelect .UnSelect .SetStart { opacity:0.5;}
#saSubMenu .IndexSelect .UnSelect .SetStepBar1 { opacity:0.5;}
#saSubMenu .IndexSelect.UnSelect li.sub-class.M_on span.MapKind { opacity: 0.4;}

#saSubMenu .Btn_delete_all { font-size:11px; color:#333; background:url(/images/workRoad/set_delete_all.png) no-repeat right center; padding-right:15px; position:absolute; right:10px; top:7px; }

/* 중요도설정 바 */
#saSubMenu .SetStepBar { display:block; box-sizing:border-box; background:#fff; width:95px; height:20px; position:absolute; left:38px; top:17px; }
#saSubMenu .SetStepBar:before { content:''; display:block; box-sizing:border-box; background:#fff; border:#eee solid 1px; width:100%; height:5px; position:absolute; left:0px; top:7px; border-radius:3px;}
#saSubMenu .IndexSelect ul .M_on .SetStepBar:before {border-color:#999;}
#saSubMenu .IndexSelect ul .SetStepBar a.SetStopPoint { background:url(/images/workRoad/setsep_point_off.png) no-repeat left top; width:11px; height:11px; top:4px;content:''; display:block; position:absolute; opacity:0.5; margin-left:-5px;}
#saSubMenu .IndexSelect ul .M_on .SetStepBar a.SetStopPoint { background:url(/images/workRoad/setsep_point.png) no-repeat left top; width:11px; height:11px; opacity:1;left:0;}
#saSubMenu .IndexSelect ul .M_on .SetStepBar { border-color:#aaa;}

#saSubMenu .IndexSelect ul .SetStepBar a:after {display:none;}

/* 지표별상세현황 */
#saSubMenu .IndexStatusBar { overflow:auto; margin-bottom:15px;}
#saSubMenu .IndexStatusBar .Depth1 { position:relative; float:left; height:25px; width:30%; border:#ccc solid 1px; border-top-left-radius:5px; border-bottom-left-radius:5px; background:-webkit-linear-gradient(#f1f1f1, #e2e1e0);  background:-ms-linear-gradient(#f1f1f1, #e2e1e0); text-align:center; font-size:14px; font-weight:bold; padding-top:7px;}

#saSubMenu .IndexStatusBar .Depth1 button{position:absolute;  top:10px;  text-indent:-1000px; overflow:hidden; width:12px; height:12px; border-left:#333 solid 1px; border-bottom:#333 solid 1px; outline: 0;}
#saSubMenu .IndexStatusBar .Depth1 button.ListFoward {left:15px; -webkit-transform:rotate(45deg);
 -ms-transform:rotate(45deg);}
#saSubMenu .IndexStatusBar .Depth1 button.ListNext {right:15px; -webkit-transform:rotate(-135deg);
 -ms-transform:rotate(-135deg);

}
#saSubMenu .IndexStatusBar .Depth2 { float:left; height:22px; width:65%;border:#ccc solid 1px; border-left:none;border-top-right-radius:5px; border-bottom-right-radius:5px; padding:5px 10px;overflow: hidden;}
#saSubMenu .IndexStatusBar .Depth2 a { color:#999; display:inline-block; padding:4px 3px; margin:0 3px;font-size:12px;}
#saSubMenu .IndexStatusBar .Depth2 a:hover {color:#666;}
#saSubMenu .IndexStatusBar .Depth2 a.M_on { color:#333; font-weight:bold;}
#saSubMenu .IndexSelect li.sub-class.M_on span.MapKind { opacity: 1;}
#saSubMenu .IndexSelect ul span.MapKind { font-family: dotum,"돋움", sans-serif;display:inline-block; font-size:11px; position:absolute; left:37px; top:20px; padding:2px 4px; color:#fff; border-radius:4px;opacity: 0.5;} /* 2017.11.06 [개발팀] css수정 */
#saSubMenu .IndexSelect ul span.MapKind.type1 { background: #597188;}
#saSubMenu .IndexSelect ul span.MapKind.type2 { background:#619bb6;}
#saSubMenu .IndexSelect ul span.MapKind.type3 { background:#2f4d6a;}
#saSubMenu .IndexSelect ul img {vertical-align:top;margin-right:7px;}

#saSubMenu .IndexSelect ul > li input{position: absolute; left: -2000px;}
#saSubMenu .IndexSelect ul > li input:checked:before{background:url(../../images/workRoad/ico/ico_ckbox_on.gif);}
#saSubMenu .IndexSelect ul > li label{line-height:20px;display:inline-block;height:20px;padding-left:25px;background:url(../../images/workRoad/ico/ico_ckbox.gif) no-repeat left center;}
#saSubMenu .IndexSelect ul > li label.on{background:url(../../images/workRoad/ico/ico_ckbox_on.gif) no-repeat left center;}
#saSubMenu .IndexSelect ul > li label.on,
#saSubMenu .IndexSelect ul > li label:hover{color:#1778cc;}

/* 2020.04.23[한광희] 월평균자료 조회 기능 추가로 인한 css 수정 START */
/* #saSubMenu .IndexSelect2 div.indexSubDiv { display:none; height:685px; padding:0px; border:#21b69a solid 2px; border-radius:4px; background:#fff; width:100%; box-sizing:border-box;}
#saSubMenu .IndexSelect2 div.indexSubDiv:before { content:''; display:block; background-color:#fff; width:2px; height:47px; position:absolute; left:280px;} */
#saSubMenu .IndexSelect2 div.indexSubDiv { display:none; height:690px; padding:0px; border:#21b69a solid 2px; border-radius:4px; background:#fff; width:100%; box-sizing:border-box;}
#saSubMenu .IndexSelect2 div.indexSubDiv:before { content:''; display:block; background-color:#fff; width:2px; height:43px; position:absolute; left:280px;}

/* 2020.10.27 (2019센서스 데이터 적용)월평균자료 조회 기능 임시 display:none 처리에 따른 후속조치
#saSubMenu .IndexSelect2 .index1:before {top:365px;}
#saSubMenu .IndexSelect2 .index2:before {top:412px;}
#saSubMenu .IndexSelect2 .index3:before {top:459px;}
#saSubMenu .IndexSelect2 .index4:before {top:506px;}
#saSubMenu .IndexSelect2 .index5:before {top:553px;}
#saSubMenu .IndexSelect2 .index6:before {top:600px;}
#saSubMenu .IndexSelect2 .index7:before {top:647px;}
*/
#saSubMenu .IndexSelect2 .index1:before {top:222px;}
#saSubMenu .IndexSelect2 .index2:before {top:269px;}
#saSubMenu .IndexSelect2 .index3:before {top:316px;}
#saSubMenu .IndexSelect2 .index4:before {top:363px;}
#saSubMenu .IndexSelect2 .index5:before {top:410px;}
#saSubMenu .IndexSelect2 .index6:before {top:457px;}
#saSubMenu .IndexSelect2 .index7:before {top:504px;}

#saSubMenu .select2 {font-family:'Nanum Gothic';font-size:13px;padding-right:5px;padding-left:5px;cursor:pointer;color:#555;-webkit-appearance:none;-ms-filter:'progid:DXImageTransform.Microsoft.Alpha(Opacity=0.8)';filter:alpha(opacity=.8);}
/* 2020.04.23[한광희] 월평균자료 조회 기능 추가로 인한 css 수정 END */

#saSubMenu .IndexSelect2 .index1 ul.indexData>li{width:45%; float:left;}
#saSubMenu .IndexSelect2 .index1 ul.indexData>li:first-child{width:100%; float:left;}

#saSubMenu .IndexSelect2 .index2 ul.indexData>li{width:45%; float:left; padding:7px 10px;}
/* #saSubMenu .IndexSelect2 .index2 ul.indexData>li:first-child{width:100%; float:left;} */

#saSubMenu .IndexSelect2 ul > li{padding:10px;}
#saSubMenu .IndexSelect2 ul > li input{position: absolute; left: -2000px;}
#saSubMenu .IndexSelect2 ul > li input:checked:before{background:url(../../images/workRoad/ico/ico_ckbox_on.gif);}
#saSubMenu .IndexSelect2 ul > li label{line-height:20px;display:inline-block;height:20px;padding-left:25px;background:url(../../images/workRoad/ico/ico_ckbox.gif) no-repeat left center; width: calc(100% - 10px); overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
#saSubMenu .IndexSelect2 ul > li label.on{background:url(../../images/workRoad/ico/ico_ckbox_on.gif) no-repeat left center;}
#saSubMenu .IndexSelect2 ul > li label.on,
#saSubMenu .IndexSelect2 ul > li label:hover{color:#1778cc;}


#saSubMenu .IndexSelect2 .index5 .indexSubDiv:before{content:''; display:block; background:url(/images/workRoad/icon_box_arrow.png) no-repeat left top; width:9px; height:17px; position:absolute; left:96px;}
#saSubMenu .IndexSelect2 .index5 .indexSubDivH:before { top:55px;}
#saSubMenu .IndexSelect2 .index5 .indexSubDivD:before { top:98px;}
#saSubMenu .IndexSelect2 .index5 .indexSubDivM:before { top:141px;}
#saSubMenu .IndexSelect2 .index5 .indexSubDivY:before { top:184px;}
</style>
<!-- 2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END -->
<div id="saSubMenu">

	<div class="quickBox step02" id="quickBox_2depth" style="background: #fff;">
		<!-- 2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START -->
		<div class="subj" style="display:none;">
			<h2 id="submenuTitle">해당분류 세부항목 선택하기</h2>
			<!-- <a href="javascript:void(0)"></a> -->
		</div>
		<div class="normalBox" style="background: #fff; width: 100%; height: calc(100% - 49px);">
			<div class="totalResult tr01" id="API_WORK-01"><!-- 주요지표 목록보기 -->
				<!-- 2020-04-22[한광희] 월평균자료 조회 기능 추가 START -->
				<div class="stepBox radioStepRegDt"><!-- 2021.05.20[hjh] display:none 제거 -->
					<p class="on">조회기간 선택</p>
					<ul class="dbTypeCk">
						<li style="padding-bottom: 8px;">
							<input type="radio" id="rd_regDt_type01" name="rd_regDt_type" checked="checked"/>
							<label class="mr20 on" id="recentRegDt">최근 수집자료</label>
						</li>
						<li style="padding: 0;">
							<input type="radio" id="rd_regDt_type02" name="rd_regDt_type" />
							<!-- 2021.08.18[hjh] 문구 수정 START -->
							<label>월별현황</label>
							<a data-subj="월별현황" title="워크넷, 인크루트, 사람인에서 입수한 구인정보의 월별현황을 보여줍니다.<br/>* 워크넷, 인크루트 : '19년 11월 이후, 사람인 : '20년 7월 이후" style="background: #fff; float: none; width: 14px; height:15px; background-image: url('/images/workRoad/ico/ico_tooltip01.png'); background-size: 100% 100%;"></a>
							<!-- 2021.08.18[hjh] 문구 수정 END -->
						</li>
						<li style="padding: 0px 0px 10px 25px;">
							<div>
								<select class="select-wrap select2" style="border: 1px solid #ccc; width: calc(50% - 25px);"  id="current-year-select" data-type="current"  title="조회기간 연도 선택" disabled="true" >
						    		<option value="99">전체</option>
						    	</select>
								<span style="margin: 3px;">년</span>
								<select id="current-month-select" class="select-wrap select2" title="조회기간 월 선택" disabled="true" style="border: 1px solid #ccc; width:calc(50% - 25px);" >
									<option value="999">전체</option>
								</select>
								<span style="margin: 3px;">월</span>
							</div>
						</li>
					</ul>
				</div>
				<!-- 2020-04-22[한광희] 월평균자료 조회 기능 추가 END -->
				<div class="stepBox">
					<p class="on">지역선택</p>
					<ul class="dbTypeCk">
						<li style="padding-bottom: 10px;">	<!-- 2020.04.24[한광희] 월평균자료 조회 기능 추가로 인한 style 변경 -->
							<span class="select-wrap" style="width:calc(50% - 2px);">
						    	<select class="select" style="margin-bottom: 5px; margin-right: 0px;"  id="current-sido-select" data-type="current"  title="지역선택 시도 선택" tabindex="97"><option value="99">전체</option></select>
						    </span>
						    <span class="select-wrap" style="width:calc(50% - 2px);">
								<select id="current-sgg-select" class="select" title="지역선택 시군구 선택" tabindex="98">
									<option value="999">전체</option>
								</select>
							</span>
						</li>
					</ul>
				</div>
				<div class="stepBox mainUnit_stepBox">
					<p class="on">분석 대상 선택</p>
					<ul class="dbTypeCk mt20">
						<li style="padding-bottom: 10px;">	<!-- 2020.04.24[한광희] 월평균자료 조회 기능 추가로 인한 style 변경 -->
							<input type="radio" id="rd_unit_type01" name="rd_unit_type" value="rcrit_psn_cnt" checked="checked" />
							<label class="mr20 on">구인수</label>
							<input type="radio" id="rd_unit_type02" name="rd_unit_type" value="corp_cnt" />
							<label>업체수</label>
						</li>
					</ul>
				</div>
				<div class="stepBox mainIndex_stepBox" style="display: block;" id="analsCndDiv01"> <!-- 2020.07.14[한광희] 월평균자료 조회시 히든처리를 위한 style(display) 및 id 추가 -->
					<!-- 2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START -->
				    <p class="on" style="margin-bottom: 5px;">분석조건</p>
				    <!-- 2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END -->
				    <ul class="dbTypeCk mt10" style="display:none;">
				        <li>
				            <input type="radio" name="mainIndex_radio" id="mainIndex_radio01" value="indust_class" />
				            <label for="mainIndex_radio01">업종별 수</label>
				        </li>
				        <li>
				            <input type="radio" name="mainIndex_radio" id="mainIndex_radio02" value="rcrit_jssfc" />
				            <label for="mainIndex_radio02">직종별 수</label>
				        </li>
				        <li>
				            <input type="radio" name="mainIndex_radio" id="mainIndex_radio03" value="entrprs_type" />
				            <label for="mainIndex_radio03">기업형태별 수</label>
				        </li>
				        <li>
				            <input type="radio" name="mainIndex_radio" id="mainIndex_radio04" value="emplym_type" />
				            <label for="mainIndex_radio04">고용형태별 수</label>
				        </li>
				        <li>
				            <input type="radio" name="mainIndex_radio" id="mainIndex_radio05" value="wage_type" />
				            <label for="mainIndex_radio05">임금수준별 수</label>
				        </li>
				        <li>
				            <input type="radio" name="mainIndex_radio" id="mainIndex_radio06" value="acdmcr" />
				            <label for="mainIndex_radio06">요구 학력별 수</label>
				        </li>
				        <li>
				            <input type="radio" name="mainIndex_radio" id="mainIndex_radio07" value="career" />
				            <label for="mainIndex_radio07">요구 경력별 수</label>
				        </li>
				    </ul>
				</div>
				<div class="mainIndex_stepBox2" style="padding-left: 13px; display: block;" id="analsCndDiv02"> <!-- 2020.07.14[한광희] 월평균자료 조회시 히든처리를 위한 style(display) 및 id 추가 -->
					<ul class="IndexSelect SetStep">
						<li class="index1">
							<input type="checkbox" name="mainIndex_check" id="mainIndex_check01" value="indust_class" style="display: none;"/>
							<a href="#" class="indexL" data-id="1" data-width="600"><img src="/images/workRoad/statusAnls/icon_index1.png" alt="업종" class="mCS_img_loaded">업종별 수</a>
							<div class="indexSubDiv">
								<div class="normalBox" style="width:306px;">
									<!-- 안씀 -->
									<!-- <ul class="indexData"></ul> -->
								</div>
							</div>
						</li>
						<li class="index2">
							<input type="checkbox" name="mainIndex_check" id="mainIndex_check02" value="rcrit_jssfc" style="display: none;"/>
							<a href="#" class="indexL" data-id="2" data-width="600"><img src="/images/workRoad/statusAnls/icon_index2.png" alt="직종" class="mCS_img_loaded">직종별 수</a>
							<div class="indexSubDiv">
								<div class="normalBox" style="width:306px;">
									<!-- 안씀 -->
									<!-- <ul class="indexData"></ul> -->
								</div>
							</div>
						</li>
						<li class="index3">
							<input type="checkbox" name="mainIndex_check" id="mainIndex_check03" value="entrprs_type" style="display: none;"/>
							<a href="#" class="indexL" data-id="3" data-width="250"><img src="/images/workRoad/statusAnls/icon_index3.png" alt="기업형태" class="mCS_img_loaded">기업형태별 수</a>
							<div class="indexSubDiv">
								<div class="normalBox" style="width:306px;">
									<!-- 안씀 -->
									<!-- <ul class="indexData">
										<li>
											<input type="checkbox" id="index3Data_0" name="index3Data" value="ALL" checked="checked"/>
											<label class="on" name="index3Data">전체</label>
										</li>
										<li>
											<input type="checkbox" id="index3Data_1" name="index3Data" value="01" />
											<label name="index3Data">대기업</label>
										</li>
										<li>
											<input type="checkbox" id="index3Data_2" name="index3Data" value="02" />
											<label name="index3Data">중기업</label>
										</li>
										<li>
											<input type="checkbox" id="index3Data_3" name="index3Data" value="03" />
											<label name="index3Data">벤처기업</label>
										</li>
										<li>
											<input type="checkbox" id="index3Data_4" name="index3Data" value="04" />
											<label name="index3Data">공공기관</label>
										</li>
										<li>
											<input type="checkbox" id="index3Data_5" name="index3Data" value="05" />
											<label name="index3Data">외국계기업</label>
										</li>
										<li>
											<input type="checkbox" id="index3Data_6" name="index3Data" value="06" />
											<label name="index3Data">중견기업</label>
										</li>
										<li>
											<input type="checkbox" id="index3Data_7" name="index3Data" value="07" />
											<label name="index3Data">소기업</label>
										</li>
										<li>
											<input type="checkbox" id="index3Data_8" name="index3Data" value="08" />
											<label name="index3Data">소상공인</label>
										</li>
										<li>
											<input type="checkbox" id="index3Data_9" name="index3Data" value="09" />
											<label name="index3Data">청년친화강소기업</label>
										</li>
										<li>
											<input type="checkbox" id="index3Data_10" name="index3Data" value="10" />
											<label name="index3Data">보호대상중견기업</label>
										</li>
										<li>
											<input type="checkbox" id="index3Data_11" name="index3Data" value="11" />
											<label name="index3Data">한시성중소기업</label>
										</li>
										<li>
											<input type="checkbox" id="index3Data_12" name="index3Data" value="99" />
											<label name="index3Data">판단제외</label>
										</li>
									</ul> -->
								</div>
							</div>
						</li>
						<li class="index4">
							<input type="checkbox" name="mainIndex_check" id="mainIndex_check04" value="emplym_type" style="display: none;"/>
							<a href="#" class="indexL" data-id="4" data-width="320"><img src="/images/workRoad/statusAnls/icon_index4.png" alt="고용형태" class="mCS_img_loaded">고용형태별 수</a>
							<div class="indexSubDiv">
								<div class="normalBox" style="width:306px;">
									<!-- 안씀 -->
									<!-- <ul class="indexData">
										<li>
											<input type="checkbox" id="index4Data_0" name="index4Data" value="ALL" checked="checked"/>
											<label class="on" name="index4Data">전체</label>
										</li>
										<li>
											<input type="checkbox" id="index4Data_1" name="index4Data" value="10" />
											<label name="index4Data">기간의 정함이 없는 근로계약</label>
										</li>
										<li>
											<input type="checkbox" id="index4Data_2" name="index4Data" value="11" />
											<label name="index4Data">기간의 정함이 없는 근로계약(시간(선택)제)</label>
										</li>
										<li>
											<input type="checkbox" id="index4Data_3" name="index4Data" value="20" />
											<label name="index4Data">기간의 정함이 있는 근로계약</label>
										</li>
										<li>
											<input type="checkbox" id="index4Data_4" name="index4Data" value="21" />
											<label name="index4Data">기간의 정함이 있는 근로계약(시간(선택)제)</label>
										</li>
										<li>
											<input type="checkbox" id="index4Data_5" name="index4Data" value="4" />
											<label name="index4Data">파견근로</label>
										</li>
									</ul> -->
								</div>
							</div>
						</li>
						<li class="index5">
							<input type="checkbox" name="mainIndex_check" id="mainIndex_check05" value="wage_type" style="display: none;"/>
							<a href="#" class="indexL" data-id="5" data-width="350"><img src="/images/workRoad/statusAnls/icon_index0.png" style="width:29px; height:29px; background-image:url('/images/workRoad/statusAnls/icon_index5.png');background-repeat: no-repeat;background-position: -2px -1px;background-size: 108%;" alt="임금" class="mCS_img_loaded">임금수준별 수</a>
							<div class="indexSubDiv">
								<div class="normalBox" style="width:306px;">
									<!-- 안씀 -->
									<!-- <ul class="indexData"></ul> -->
								</div>
							</div>
						</li>
						<li class="index6">
							<input type="checkbox" name="mainIndex_check" id="mainIndex_check06" value="acdmcr" style="display: none;"/>
							<a href="#" class="indexL" data-id="6" data-width="250"><img src="/images/workRoad/statusAnls/icon_index6.png" alt="학력" class="mCS_img_loaded">요구 학력별 수</a>
							<div class="indexSubDiv">
								<div class="normalBox" style="width:306px;">
									<!-- 안씀 -->
									<!-- <ul class="indexData">
										<li>
											<input type="checkbox" id="index6Data_0" name="index6Data" value="ALL" checked="checked"/>
											<label class="on" name="index6Data">전체</label>
										</li>
										<li>
											<input type="checkbox" id="index6Data_1" name="index6Data" value="01" />
											<label name="index6Data">초졸이하</label>
										</li>
										<li>
											<input type="checkbox" id="index6Data_2" name="index6Data" value="02" />
											<label name="index6Data">중졸</label>
										</li>
										<li>
											<input type="checkbox" id="index6Data_3" name="index6Data" value="03" />
											<label name="index6Data">고졸</label>
										</li>
										<li>
											<input type="checkbox" id="index6Data_4" name="index6Data" value="04" />
											<label name="index6Data">대졸(2~3년)</label>
										</li>
										<li>
											<input type="checkbox" id="index6Data_5" name="index6Data" value="05" />
											<label name="index6Data">대졸(4년)</label>
										</li>
										<li>
											<input type="checkbox" id="index6Data_6" name="index6Data" value="06" />
											<label name="index6Data">석사</label>
										</li>
										<li>
											<input type="checkbox" id="index6Data_7" name="index6Data" value="07" />
											<label name="index6Data">박사</label>
										</li>
										<li>
											<input type="checkbox" id="index6Data_8" name="index6Data" value="00" />
											<label name="index6Data">학력무관</label>
										</li>
									</ul> -->
								</div>
							</div>
						</li>
						<li class="index7">
							<input type="checkbox" name="mainIndex_check" id="mainIndex_check07" value="career" style="display: none;"/>
							<a href="#" class="indexL" data-id="7" data-width="250"><img src="/images/workRoad/statusAnls/icon_index7.png" alt="경력" class="mCS_img_loaded">요구 경력별 수</a>
							<div class="indexSubDiv">
								<div class="normalBox" style="width:306px;">
									<!-- 안씀 -->
									<!-- <ul class="indexData">
										<li>
											<input type="checkbox" id="index7Data_0" name="index7Data" value="ALL" checked="checked"/>
											<label class="on" name="index7Data">전체</label>
										</li>
										<li>
											<input type="checkbox" id="index7Data_1" name="index7Data" value="N" />
											<label name="index7Data">신입</label>
										</li>
										<li>
											<input type="checkbox" id="index7Data_2" name="index7Data" value="E" />
											<label name="index7Data">경력</label>
										</li>
										<li>
											<input type="checkbox" id="index7Data_3" name="index7Data" value="Z" />
											<label name="index7Data">관계없음</label>
										</li>
									</ul> -->
								</div>
							</div>
						</li>
					</ul>
				</div>
				<!-- 2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END -->
				<!-- 2019-05-21 [김남민] 구인현황 분석 > 1주, 1개월, 3개월 등 히든된 기능 안정화 START -->
				<%-- <% /* 2019.03.19 기간설정 숨김 요청 %> --%>
				<!-- 2019-08-19 [김남민] 일자리 맵 > 구인 현황분석 > 통계 조회 원복. -->
				<div class="stepBox mainTerm_stepBox" style="display: none;">
					<!-- 2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START -->
					<p class="on" style="margin-top: 5px;">기간설정</p>
					<!-- 2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END -->
			    	<div class="dbTypeCk mt30">
			    		<ul style="margin-bottom: 10px;">
			    			<li style="border-bottom-width: 0px;">
		                    	<input type="radio" id="rd_term_type" name="rd_term_type" value="rd_term_type" checked="checked" />
		                        <label for="rd_term_type" class="mr20 on" style="margin-top: 6px; float: left;"></label>
		                        <!--
		                        <input type="radio" id="current-term-1w" name="current-term" value="1W" checked="checked" />
		                        <label for="current-term-1w" class="mr20 on">1주</label>
		                        <input type="radio" id="current-term-2w" name="current-term" value="2W"/>
		                        <label for="current-term-2w" class="mr20">2주</label>
		                        <input type="radio" id="current-term-1m" name="current-term" value="1M"/>
		                        <label for="current-term-1m" class="mr20">1달</label>
		                        <input type="radio" id="current-term-3m" name="current-term" value="3M"/>
		                        <label for="current-term-3m" class="mr20">3달</label>
		                        -->
		                        <!-- 2018-12-27 기간설정 추가 -->
		                        <!-- 주석처리: 사용안함 - 2019.01.21	ywKim	 변경
		                        <span style="display: none;">
			                        <select title="기간설정" id="current-term-select-0" name="current-term-select" style="width:35px;">
			                        	<option value="0">오늘</option>
			                        </select>
			                        ~
		                        </span> -->
		                        <span class="select-wrap" style="width:60px; float: left;">
			                        <select title="기간설정" id="current-term-select" name="current-term-select">
			                        	<!-- 2019-05-21 [김남민] 구인현황 분석 > 1주, 1개월, 3개월 등 히든된 기능 안정화 START -->
			                        	<option value="0D">1일</option>
			                        	<option value="1W">1주전</option>
			                        	<option value="1M">1달전</option>
			                        	<option value="3M">3달전</option>
			                        	<!-- 2019-05-21 [김남민] 구인현황 분석 > 1주, 1개월, 3개월 등 히든된 기능 안정화 END -->
			                        	<!-- 20190314 손원웅 주석_기간설정 변경
			                        	<option value="3M">3달전</option> -->
			                        </select>
		                        </span>
		                        <span style="margin-top: 8px; float: left;">&nbsp;&nbsp;~&nbsp;&nbsp;오늘</span>
		                	</li>
		                </ul>

		                <!-- 2018-12-27 기간설정 추가 -->
		                <div
		                	id="slider-range5"
		                	class="slider-range ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false"
		                	style="width:200px; margin: 10px 39px;"
		                >
							<div class="ui-slider-range ui-widget-header ui-corner-all"
								style="width: 100%;"></div>
							<a class="ui-slider-handle ui-state-default ui-corner-all"
								href="#" style="left: 19.7324%;"></a><a
								class="ui-slider-handle ui-state-default ui-corner-all"
								href="#" style="left: 28.0936%;"></a>
						</div>

						<ul class="slider_controll_bar">
							<!--	20170314 손원웅 수정_기간설정 변경 최대 3달전-> 1달전으로
							<li style="width: 20%; padding: 12px 0;">3달전</li>
							<li style="width: 20%;">1달전</li>
							<li style="width: 20%;">2주전</li>
							<li style="width: 20%;">1주전</li>
							<li style="width: 20%;">오늘</li> -->
							<!-- 2019-05-21 [김남민] 구인현황 분석 > 1주, 1개월, 3개월 등 히든된 기능 안정화 START -->
							<li style="width: 20%; padding: 12px 0;">3달전</li>
							<li style="width: 20%;">1달전</li>
							<li style="width: 20%;">1주전</li>
							<li style="width: 20%;">1일</li>
							<li style="width: 20%;">오늘</li>
							<!-- 2019-05-21 [김남민] 구인현황 분석 > 1주, 1개월, 3개월 등 히든된 기능 안정화 END -->
						</ul>

		                <!-- <div id="slider-range2" class="slider-range ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false"><div class="ui-slider-range ui-widget-header ui-corner-all" style="left: 19.7324%; width: 8.3612%;"></div><a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 19.7324%;"></a><a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 28.0936%;"></a></div>
		                <ul class="slider_controll_bar">
		                	2016.09.08 9월 서비스
		                    <li style="margin-left:-7px;">0</li>
		                    <li style="margin-left:4px;">1주</li>
		                    <li style="margin-left:-5px;">1월</li>
		                    <li style="margin-left:-2px;">3월</li>
		                    <li style="margin-left:-7px;">6월</li>
		                    <li style="margin-left:-5px;">6월+</li>
		                </ul> -->
		            </div>
			    </div>
			    <%-- <% */ %> --%>
			    <!-- 2019-05-21 [김남민] 구인현황 분석 > 1주, 1개월, 3개월 등 히든된 기능 안정화 END -->
			    <!--
				<div class="stepBox"  id="saSubMenu_map_type">
					<p class="on">표출방법설정</p>
					<ul class="radioStepBox validationStepBox">
						<li>
							<input type="radio" id="rd_cData_type01" name="cDataType" value="color" checked="checked" />
							<label for="rd_cData_type01" class="mr20 on">색상지도</label>
							<input type="radio" id="rd_cData_type02" name="cDataType" value="bubble" />
							<label for="rd_cData_type02">버블지도</label>
							<input type="radio" id="rd_cData_type03" name="cDataType" value="heat" />
							<label for="rd_cData_type03">열지도</label>
						</li>
					</ul>
				</div>
				 -->
				<!-- <div class="stepBox">
					<p class="on">구인 비교 대상 설정(배경 색상지도표출)</p>
					<ul class="radioStepBox validationStepBox">
						<li>
				            <input type="radio" name="mainIndex_radio" id="mainIndex_radio01" value="corp_cnt" />
				            <label for="mainIndex_radio01">사업체수</label>
				        </li>
				        <li>
				            <input type="radio" name="mainIndex_radio" id="mainIndex_radio02" value="corp_cnt" />
				            <label for="mainIndex_radio01">취업자수</label>
				        </li>
				        <li>
				            <input type="radio" name="mainIndex_radio" id="mainIndex_radio03" value="corp_cnt" />
				            <label for="mainIndex_radio01">실업자수</label>
				        </li>
				        <li>
				            <input type="radio" name="mainIndex_radio" id="mainIndex_radio04" value="corp_cnt" />
				            <label for="mainIndex_radio01">경제활동인구수</label>
				        </li>
					</ul>
				</div> -->

			</div>
			<!-- 2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START -->
			<div class="totalResult tr01" id="API_WORK-02">
				<div class="IndexSelect2">
					<div class="index1 indexSubDiv">
						<div class="normalBox" style="width:100%;">
							<!-- DB에서 불러옴 -->
							<ul class="indexData"></ul>
						</div>
					</div>
					<div class="index2 indexSubDiv">
						<div class="normalBox" style="width:100%;">
							<!-- DB에서 불러옴 -->
							<ul class="indexData"></ul>
						</div>
					</div>
					<div class="index3 indexSubDiv">
						<div class="normalBox" style="width:100%;">
							<ul class="indexData">
								<li>
									<input type="checkbox" id="index3Data_0" name="index3Data" value="ALL" checked="checked"/>
									<label class="on" name="index3Data">전체</label>
								</li>
								<li>
									<input type="checkbox" id="index3Data_1" name="index3Data" value="01" />
									<label name="index3Data">대기업</label>
								</li>
								<li>
									<input type="checkbox" id="index3Data_2" name="index3Data" value="02" />
									<label name="index3Data">중기업</label>
								</li>
								<li>
									<input type="checkbox" id="index3Data_6" name="index3Data" value="06" />
									<label name="index3Data">중견기업</label>
								</li>
								<li>
									<input type="checkbox" id="index3Data_7" name="index3Data" value="07" />
									<label name="index3Data">소기업</label>
								</li>
								<li>
									<input type="checkbox" id="index3Data_12" name="index3Data" value="12" />
									<label name="index3Data">중소기업</label>
								</li>
								<li>
									<input type="checkbox" id="index3Data_12" name="index3Data" value="99" />
									<label name="index3Data">판단제외</label>
								</li>
							</ul>
						</div>
					</div>
					<div class="index4 indexSubDiv">
						<div class="normalBox" style="width:100%;">
							<ul class="indexData">
								<li>
									<input type="checkbox" id="index4Data_0" name="index4Data" value="ALL" checked="checked"/>
									<label class="on" name="index4Data">전체</label>
								</li>
								<li>
									<input type="checkbox" id="index4Data_1" name="index4Data" value="10" />
									<label name="index4Data">기간의 정함이 없는 근로계약</label>
								</li>
								<li>
									<input type="checkbox" id="index4Data_2" name="index4Data" value="11" />
									<label name="index4Data">기간의 정함이 없는 근로계약(시간(선택)제)</label>
								</li>
								<li>
									<input type="checkbox" id="index4Data_3" name="index4Data" value="20" />
									<label name="index4Data">기간의 정함이 있는 근로계약</label>
								</li>
								<li>
									<input type="checkbox" id="index4Data_4" name="index4Data" value="21" />
									<label name="index4Data">기간의 정함이 있는 근로계약(시간(선택)제)</label>
								</li>
								<li>
									<input type="checkbox" id="index4Data_5" name="index4Data" value="4" />
									<label name="index4Data">파견근로</label>
								</li>
							</ul>
						</div>
					</div>
					<div class="index5 indexSubDiv">
						<div class="normalBox" style="width:100%;">
							<!-- DB에서 불러옴 -->
							<ul class="indexData indexDataMain" style="float:left; width:30%;"></ul>
							<div class="indexSubDiv indexSubDivH" style="display:none; float:left; height: 670px; width:calc(70% - 10px); margin: 5px;">
								<!-- DB에서 불러옴 -->
								<ul class="indexData indexDataSubH"></ul>
							</div>
							<div class="indexSubDiv indexSubDivD" style="display:none; float:left; height: 670px; width:calc(70% - 10px); margin: 5px;">
								<!-- DB에서 불러옴 -->
								<ul class="indexData indexDataSubD"></ul>
							</div>
							<div class="indexSubDiv indexSubDivM" style="display:none; float:left; height: 670px; width:calc(70% - 10px); margin: 5px;">
								<!-- DB에서 불러옴 -->
								<ul class="indexData indexDataSubM"></ul>
							</div>
							<div class="indexSubDiv indexSubDivY" style="display:none; float:left; height: 670px; width:calc(70% - 10px); margin: 5px;">
								<!-- DB에서 불러옴 -->
								<ul class="indexData indexDataSubY"></ul>
							</div>
						</div>
					</div>
					<div class="index6 indexSubDiv">
						<div class="normalBox" style="width:100%;">
							<ul class="indexData">
								<li>
									<input type="checkbox" id="index6Data_0" name="index6Data" value="ALL" checked="checked"/>
									<label class="on" name="index6Data">전체</label>
								</li>
								<li>
									<input type="checkbox" id="index6Data_1" name="index6Data" value="01" />
									<label name="index6Data">초졸이하</label>
								</li>
								<li>
									<input type="checkbox" id="index6Data_2" name="index6Data" value="02" />
									<label name="index6Data">중졸</label>
								</li>
								<li>
									<input type="checkbox" id="index6Data_3" name="index6Data" value="03" />
									<label name="index6Data">고졸</label>
								</li>
								<li>
									<input type="checkbox" id="index6Data_4" name="index6Data" value="04" />
									<label name="index6Data">대졸(2~3년)</label>
								</li>
								<li>
									<input type="checkbox" id="index6Data_5" name="index6Data" value="05" />
									<label name="index6Data">대졸(4년)</label>
								</li>
								<li>
									<input type="checkbox" id="index6Data_6" name="index6Data" value="06" />
									<label name="index6Data">석사</label>
								</li>
								<li>
									<input type="checkbox" id="index6Data_7" name="index6Data" value="07" />
									<label name="index6Data">박사</label>
								</li>
								<li>
									<input type="checkbox" id="index6Data_8" name="index6Data" value="00" />
									<label name="index6Data">학력무관</label>
								</li>
							</ul>
						</div>
					</div>
					<div class="index7 indexSubDiv">
						<div class="normalBox" style="width:100%;">
							<ul class="indexData">
								<li>
									<input type="checkbox" id="index7Data_0" name="index7Data" value="ALL" checked="checked"/>
									<label class="on" name="index7Data">전체</label>
								</li>
								<li>
									<input type="checkbox" id="index7Data_1" name="index7Data" value="N" />
									<label name="index7Data">신입</label>
								</li>
								<li>
									<input type="checkbox" id="index7Data_2" name="index7Data" value="E" />
									<label name="index7Data">경력</label>
								</li>
								<li>
									<input type="checkbox" id="index7Data_3" name="index7Data" value="Z" />
									<label name="index7Data">관계없음</label>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<!-- 2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END -->
		</div>
		<!-- <div class="bottom "><a href="javascript:void(0) " class="stepClose">닫기</a></div> --><!-- 3레벨로 이동 - 2018.10.24	ywKim	주석 -->
		<!-- 2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START -->
		<div class="btnBottom" style="margin-bottom: 15px; background-color: #f5f5f5;">
        	<a href="javascript:void(0);" class="btnStyle02" id="buttonMakeBtn2" data-subj="조건결합설정 팁" title="현재 선택된 통계항목 창에 해당하는 통계조건을 통계버튼으로 생성하여 통계값을 조회 할 수 있어요">
	        	통계보기
	        </a>
        </div>
        <div class="menuAutoClose" id="saMenuAutoClose2" style="bottom:2px;"><!-- id제거 (menuAutoClose4Lev) -->
			<input type="checkbox" checked="checked"/>
			<label for="saMenuAutoClose2" class="on">자동닫기</label>
		</div>
		<!-- 2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END -->
	</div>


	<!-- 3Depth start -->
	<div class="quickBox step03" id="kosisDetailDiv">
		<div class="subj">
			<h2>구인 현황 분석 세부항목</h2>
			<!-- <a href="javascript:void(0)" class="stepClose" onclick="$saSubMenu.ui.sqlListBoxPosition2('560px');">닫기</a> -->
		</div>
		<div class="normalBox">
			<div class="stepBox sub01" style="display: none;">
				<p class="on">업종 상세 조건 선택</p>
				<ul class="multiCheckBox all"><!-- 2018.12.28	ywKim	추가   [상세조건선택에서 "전체"선택기능 추가]-->
					<li>
						<input type="checkbox" id="saRdAll_01"/>
						<label for="saRdAll_01">전체</label>
					</li>
				</ul>
				<ul class="multiCheckBox" id="setWorkIndustClassData">
					<li>
						<input type="checkbox" id="rd_indclaP01" name="INDCLA" value="01" />
						<label for="rd_indclaP01">농업</label>
					</li>
					<li>
						<input type="checkbox" id="rd_indclaP02" name="INDCLA" value="02" />
						<label for="rd_indclaP02">임업</label>
					</li>
				</ul>
			</div>
			<div class="stepBox sub02" style="display: none;">
				<p class="on">직종 상세 조건 선택</p>
				<ul class="multiCheckBox all"><!-- 2018.12.28	ywKim	추가  [상세조건선택에서 "전체"선택기능 추가]-->
					<li>
						<input type="checkbox" id="saRdAll_02"/>
						<label for="saRdAll_02">전체</label>
					</li>
				</ul>
				<ul class="multiCheckBox" id="setWorkOccupationClassData">
					<li>
						<input type="checkbox" id="rd_rcrjssP01" name="RCRJSS" value="01" />
						<label for="rd_rcrjssP01">경영·사무·금융·보험</label>
					</li>
					<li>
						<input type="checkbox" id="rd_enttyP11" name="RCRJSS" value="11" />
						<label for="rd_enttyP11">연구 및 공학기술</label>
					</li>
				</ul>
			</div>
			<div class="stepBox sub03" style="display: none;">
				<p class="on">기업형태 상세 조건 선택</p>
				<ul class="multiCheckBox all"><!-- 2018.12.28	ywKim	추가  [상세조건선택에서 "전체"선택기능 추가]-->
					<li>
						<input type="checkbox" id="saRdAll_03"/>
						<label for="saRdAll_03">전체</label>
					</li>
				</ul>
				<ul class="multiCheckBox">
					<li>
						<input type="checkbox" id="rd_enttyP01" name="ENTTYP" value="01" />
						<label for="rd_enttyP01">대기업</label>
					</li>
					<li>
						<input type="checkbox" id="rd_enttyP02" name="ENTTYP" value="02" />
						<label for="rd_enttyP02">중기업</label>
					</li>
					<li>
						<input type="checkbox" id="rd_enttyP03" name="ENTTYP" value="03" />
						<label for="rd_enttyP03">벤처기업</label>
					</li>
					<li>
						<input type="checkbox" id="rd_enttyP04" name="ENTTYP" value="04" />
						<label for="rd_enttyP04">공공기관</label>
					</li>
					<li>
						<input type="checkbox" id="rd_enttyP05" name="ENTTYP" value="05" />
						<label for="rd_enttyP05">외국계기업</label>
					</li>
					<li>
						<input type="checkbox" id="rd_enttyP06" name="ENTTYP" value="06" />
						<label for="rd_enttyP06">중견기업</label>
					</li>
					<li>
						<input type="checkbox" id="rd_enttyP07" name="ENTTYP" value="07" />
						<label for="rd_enttyP07">소기업</label>
					</li>
					<li>
						<input type="checkbox" id="rd_enttyP08" name="ENTTYP" value="08" />
						<label for="rd_enttyP08">소상공인</label>
					</li>
					<li>
						<input type="checkbox" id="rd_enttyP09" name="ENTTYP" value="09" />
						<label for="rd_enttyP09">청년친화강소기업</label>
					</li>
					<li>
						<input type="checkbox" id="rd_enttyP10" name="ENTTYP" value="10" />
						<label for="rd_enttyP10">보호대상중견기업</label>
					</li>
					<li>
						<input type="checkbox" id="rd_enttyP11" name="ENTTYP" value="11" />
						<label for="rd_enttyP11">한시성중소기업</label>
					</li>
					<li>
						<input type="checkbox" id="rd_enttyP12" name="ENTTYP" value="99" />
						<label for="rd_enttyP12">판단제외</label>
					</li>
				</ul>
			</div>
			<div class="stepBox sub04" style="display: none;">
				<p class="on">고용형태 상세 조건 선택</p>
				<ul class="multiCheckBox all"><!-- 2018.12.28	ywKim	추가  [상세조건선택에서 "전체"선택기능 추가]-->
					<li>
						<input type="checkbox" id="saRdAll_04"/>
						<label for="saRdAll_04">전체</label>
					</li>
				</ul>
				<ul class="multiCheckBox">
					<li>
						<input type="checkbox" id="rd_emptyp01" name="EMPTYP" value="10" />
						<label for="rd_emptyp01">기간의 정함이 없는 근로계약</label>
					</li>
					<li>
						<input type="checkbox" id="rd_emptyp02" name="EMPTYP" value="11" />
						<label for="rd_emptyp02">기간의 정함이 없는 근로계약(시간(선택)제)</label>
					</li>
					<li>
						<input type="checkbox" id="rd_emptyp03" name="EMPTYP" value="20" />
						<label for="rd_emptyp03">기간의 정함이 있는 근로계약</label>
					</li>
					<li>
						<input type="checkbox" id="rd_emptyp04" name="EMPTYP" value="21" />
						<label for="rd_emptyp04">기간의 정함이 있는 근로계약(시간(선택)제)</label>
					</li>
					<li>
						<input type="checkbox" id="rd_emptyp05" name="EMPTYP" value="4" />
						<label for="rd_emptyp05">파견근로</label>
					</li>
				</ul>
			</div>
			<div class="stepBox sub05" style="display: none;">
				<p class="on">임금수준 상세 조건 선택</p>
				<ul class="dbTypeCk">
					<!-- 2019-05-17 [김남민] 구인현황 분석 > 임금수준(일급, 시급, 연봉 등)은 OR 조건으로 검색이 가능하게 개선 (기존 부분 display:none 처리)-->
					<li style="display: none;">
						<input type="checkbox" id="rd_wagety01" name="WAGETY" value="H" />
						<label for="rd_wagety01">시급</label>
						<select title="시급조건" id="current-salary-select-1" name="current-salary-select-1">
							<option value="">전체</option>
                        	<option value="6900">7천원 미만</option>
                        	<option value="7000">7 ~ 8천원 미만</option>
                        	<option value="8000">8 ~ 9천원 미만</option>
                        	<option value="9000">9 ~ 1만원 미만</option>
                        	<option value="10000">1만원 이상</option>
                        </select>
					</li>
					<!-- 2019-05-17 [김남민] 구인현황 분석 > 임금수준(일급, 시급, 연봉 등)은 OR 조건으로 검색이 가능하게 개선 (기존 부분 display:none 처리)-->
					<li style="display: none;">
						<input type="checkbox" id="rd_wagety02" name="WAGETY" value="D" />
						<label for="rd_wagety02">일급</label>
						<select title="일급조건" id="current-salary-select-2" name="current-salary-select-2">
							<option value="">전체</option>
                        	<option value="59000">6만원 미만</option>
                        	<option value="60000">6 ~ 7만원 미만</option>
                        	<option value="70000">7 ~ 8만원 미만</option>
                        	<option value="80000">8 ~ 9만원 미만</option>
                        	<option value="90000">9 ~ 10만원 미만</option>
                        	<option value="100000">10만원 이상</option>
                        </select>
					</li>
					<!-- 2019-05-17 [김남민] 구인현황 분석 > 임금수준(일급, 시급, 연봉 등)은 OR 조건으로 검색이 가능하게 개선 (기존 부분 display:none 처리)-->
					<li style="display: none;">
						<input type="checkbox" id="rd_wagety03" name="WAGETY" value="M" />
						<label for="rd_wagety03">월급</label>
						<select title="월급조건" id="current-salary-select-3" name="current-salary-select-3">
							<option value="">전체</option>
                        	<option value="840000">85만원 미만</option>
                        	<option value="850000">85 ~ 150만원 미만</option>
                        	<option value="1500000">150 ~ 250만원 미만</option>
                        	<option value="2500000">250 ~ 350만원 미만</option>
                        	<option value="3500000">350 ~ 450만원 미만</option>
                        	<option value="4500000">450 ~ 550만원 미만</option>
                        	<option value="5500000">550 ~ 650만원 미만</option>
                        	<option value="6500000">650 ~ 800만원 미만</option>
                        	<option value="8000000">800 ~ 1,000만원 미만</option>
                        	<option value="10000000">1,000만원 이상</option>
                        </select>
					</li>
					<!-- 2019-05-17 [김남민] 구인현황 분석 > 임금수준(일급, 시급, 연봉 등)은 OR 조건으로 검색이 가능하게 개선 (기존 부분 display:none 처리)-->
					<li style="display: none;">
						<input type="checkbox" id="rd_wagety04" name="WAGETY" value="Y" />
						<label for="rd_wagety04">연봉</label>
						<select title="연봉조건" id="current-salary-select-4" name="current-salary-select-4">
							<option value="">전체</option>
                        	<option value="14000000">1500만원 미만</option>
                        	<option value="15000000">1500 ~ 2000만원 미만</option>
                        	<option value="20000000">2000 ~ 2500만원 미만</option>
                        	<option value="25000000">2500 ~ 3000만원 미만</option>
                        	<option value="30000000">3000 ~ 3500만원 미만</option>
                        	<option value="35000000">3500 ~ 4000만원 미만</option>
                        	<option value="40000000">4000 ~ 5000만원 미만</option>
                        	<option value="50000000">5000 ~ 6000만원 미만</option>
                        	<option value="60000000">6000 ~ 8000만원 미만</option>
                        	<option value="80000000">8000 ~ 1억 미만</option>
                        	<option value="100000000">1억 이상</option>
                        </select>
					</li>
				</ul>
			</div>
			<div class="stepBox sub06" style="display: none;">
				<p class="on">학력 상세 조건 선택</p>
				<ul class="multiCheckBox all"><!-- 2018.12.28	ywKim	추가  [상세조건선택에서 "전체"선택기능 추가]-->
					<li>
						<input type="checkbox" id="saRdAll_06"/>
						<label for="saRdAll_06">전체</label>
					</li>
				</ul>
				<ul class="multiCheckBox">
					<li>
						<input type="checkbox" id="rd_acdmcr01" name="ACDMCR" value="01" />
						<label for="rd_acdmcr01">초졸이하</label>
					</li>
					<li>
						<input type="checkbox" id="rd_acdmcr02" name="ACDMCR" value="02" />
						<label for="rd_acdmcr02">중졸</label>
					</li>
					<li>
						<input type="checkbox" id="rd_acdmcr03" name="ACDMCR" value="03" />
						<label for="rd_acdmcr03">고졸</label>
					</li>
					<li>
						<input type="checkbox" id="rd_acdmcr04" name="ACDMCR" value="04" />
						<label for="rd_acdmcr04">대졸(2~3년)</label>
					</li>
					<li>
						<input type="checkbox" id="rd_acdmcr05" name="ACDMCR" value="05" />
						<label for="rd_acdmcr05">대졸(4년)</label>
					</li>
					<li>
						<input type="checkbox" id="rd_acdmcr06" name="ACDMCR" value="06" />
						<label for="rd_acdmcr06">석사</label>
					</li>
					<li>
						<input type="checkbox" id="rd_acdmcr07" name="ACDMCR" value="07" />
						<label for="rd_acdmcr07">박사</label>
					</li>
					<li>
						<input type="checkbox" id="rd_acdmcr08" name="ACDMCR" value="00" />
						<label for="rd_acdmcr08">학력무관</label>
					</li>
				</ul>
			</div>
			<div class="stepBox sub07" style="display: none;">
				<p class="on">경력 상세 조건 선택</p>
				<ul class="multiCheckBox all"><!-- 2018.12.28	ywKim	추가  [상세조건선택에서 "전체"선택기능 추가]-->
					<li>
						<input type="checkbox" id="saRdAll_07"/>
						<label for="saRdAll_07">전체</label>
					</li>
				</ul>
				<ul class="multiCheckBox">
					<li>
						<input type="checkbox" id="rd_career01" name="CAREER" value="N" />
						<label for="rd_career01">신입</label>
					</li>
					<li>
						<input type="checkbox" id="rd_career02" name="CAREER" value="E" />
						<label for="rd_career02">경력</label>
					</li>
					<li>
						<input type="checkbox" id="rd_career03" name="CAREER" value="Z" />
						<label for="rd_career03">관계없음</label>
					</li>
				</ul>
			</div>
		</div>
		<div class="btnBottom" >
        	<a href="javascript:void(0);" class="btnStyle02" id="buttonMakeBtn" data-subj="조건결합설정 팁" title="현재 선택된 통계항목 창에 해당하는 통계조건을 통계버튼으로 생성하여 통계값을 조회 할 수 있어요">
	        	통계보기
	        </a>
        </div>
		<div class="menuAutoClose" id="saMenuAutoClose"><!-- id제거 (menuAutoClose4Lev) -->
			<input type="checkbox" checked="checked"/>
			<label for="saMenuAutoClose" class="on">자동닫기</label>
		</div>
		<div class="bottom">
			<a href="javascript:void(0) " class="stepClose on">닫기</a><!--2019-06-21 박길섭-->
		</div>
	</div>
	<!-- 해당분류 세부업종 선택하기 end -->
	<!-- 2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START -->
	<!-- 3Depth_2 start -->
	<div class="quickBox step03_2" id="kosisDetailDiv2" style="left:0px; width: 26px;">
		<div class="bottom">
			<a href="javascript:void(0) " class="stepOpen" style="z-index: 10; right: 0px;">닫기</a>
		</div>
	</div>
	<!-- 2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END -->
</div>