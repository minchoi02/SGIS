<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 일자리 보기 > 검색 선택 (팝업창) 	
* File Name		: viewJobs > vjSelectAll.jsp
* Comment		: 
* History		:
*	2019-05-10	김남민	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<style>
/*.workRoad #vjSelectAll { display:none; }/* 팝업창 로드시 숨기기 */
/*.workRoad #vjSelectAll .wrmScrollable { height: 300px; }/* 목록 박스 높이 - 스크롤기능 적용을 위해 필수 */
.workRoad .cont-box p.notice2{font-family:'Nanum Gothic Bold';font-size:13px;line-height:1.5em;position:relative;margin-top:10px;padding:0 15px 0;word-break:keep-all;color:#555;}
.workRoad .cont-box p.notice2:before{position:absolute;top:5px;left:2px;display:block;box-sizing:border-box;width:10px;height:10px;content:'';border:3px solid #ff9800;border-radius:50%;}

.workRoad .cont-box p.notice3{
	color:#fff;
	background:#00bcd4;
	font-family:'Nanum Gothic';
	font-size:13px;
	line-height:30px;
	position:relative;
	display:block;
	height:30px;
	margin:10px;
	padding-left:20px;
	text-align:left;
	border-radius:15px;
	background-color:#00bcd4;
	cursor: pointer;
}
.workRoad .cont-box p.notice3.dataon{
	background-color:#ff9800;
}
/* .workRoad .cont-box p.notice3 .toogle-arrow{
	width:20px;
	height:8px;
	background-image:url('/images/workRoad/ico/ico_down03.png');
	background-repeat:no-repeat;
	background-position:center;
}
.workRoad .cont-box p.notice3.on .toogle-arrow{
	background-image:url('/images/workRoad/ico/ico_up02.png');
} */
.workRoad .cont-box p.notice3 .toogle-arrow{
	float:right;
	width:30px;
	height:30px;
	background-image:url('/images/workRoad/icon_circle_plus.png');
	background-repeat:no-repeat;
	background-position:center;
	background-size: 24px;
}
.workRoad .cont-box p.notice3.on .toogle-arrow{
	background-image:url('/images/workRoad/icon_circle_close.png');
}

/* 기업형태 */
/* .workRoad #vjSelectAll #vjSelectAllCompanyTypeDataDiv:before{content: ''; position: absolute; width: 10px; height: 1080px; background-color: #fff; top: 0px; left: 259px;}
.workRoad #vjSelectAll #vjSelectAllCompanyTypeDataDiv:after{content: ''; position: absolute; width: 10px; height: 1080px; background-color: #fff; top: 0px; right: 14px;} */
.workRoad #vjSelectAll #vjSelectAllCompanyTypeList li {width: calc(25% - 4px);float: left;}
/* .workRoad #vjSelectAll #vjSelectAllCompanyTypeList li:nth-child(1) {padding-top: 12px;} */

/* 직종분류 */
.workRoad #vjSelectAll #vjSelectAllJobClassificationList li {width: calc(33% - 6px);float: left;}
/* .workRoad #vjSelectAll #vjSelectAllJobClassificationList li:nth-child(1) {padding-top: 12px;} */

/* 급여수준 */
.workRoad #vjSelectAll #vjSelectAllSalaryLevelList li {width: calc(25% - 4px);float: left;}
/* .workRoad #vjSelectAll #vjSelectAllSalaryLevelList li:nth-child(1) {padding-top: 12px;} */
.workRoad #vjSelectAll #vjSelectAllSalaryLevelDataDiv div .notice {margin-left:17px; margin-top: 7px; padding-left:23px;}
.workRoad #vjSelectAll #vjSelectAllSalaryLevelDataDiv div .notice.on:before {border:3px solid #ff9800;}

/* 고용형태 */
.workRoad #vjSelectAll #vjSelectAllEmploymentTypeList li {width: calc(33% - 6px);float: left;}
.workRoad #vjSelectAll #vjSelectAllEmploymentTypeList li label{overflow: hidden; white-space: nowrap; text-overflow: ellipsis; width: calc(100% - 25px);}
/* .workRoad #vjSelectAll #vjSelectAllEmploymentTypeList li:nth-child(1) {padding-top: 12px;} */

/* 학력 */
.workRoad #vjSelectAll #vjSelectAllAcademicAbilityList li {width: calc(25% - 4px);float: left;}
/* .workRoad #vjSelectAll #vjSelectAllAcademicAbilityList li:nth-child(1) {padding-top: 12px;} */

/* 경력 */
.workRoad #vjSelectAll #vjSelectAllCareerList li {width: calc(25% - 4px);float: left;}
/* .workRoad #vjSelectAll #vjSelectAllCareerList li:nth-child(1) {padding-top: 12px;} */

/* 산업분류 */
.workRoad #vjSelectAll #vjSelectAllIndustryClassificationList li {width: calc(33% - 6px);float: left;}
/* .workRoad #vjSelectAll #vjSelectAllIndustryClassificationList li:nth-child(1) {padding-top: 12px;} */

.workRoad #vjSelectAll .vjSelectAllDataDiv{float:left; width:100%;}
.workRoad #vjSelectAll .vjSelectAllDataDiv .vjSelectAllDataDivLeft{float:left; width:calc(16% - 40px);}
.workRoad #vjSelectAll .vjSelectAllDataDiv .vjSelectAllDataDivRight{float:left; width:84%;}
.workRoad #vjSelectAll .vjSelectAllDataDiv .vjSelectAllDataDivRight li{padding: 7px 0;}

/* .workRoad .info-job{position:absolute;top: calc(100% - 368px);right:5px;overflow:hidden;z-index:10;} */
.workRoad .info-job{position:absolute;top: calc(100% - 64px);right:5px;overflow:hidden;z-index:10;}
</style>
<script src="${pageContext.request.contextPath}/js/workRoad/viewJobs/vjSelectAll.js"></script>

<div class="workRoad" id="vjSelectAll" style="display: none;">
	<div class="popBox wrmDraggable" style="width: 850px; height: 610px;">
		<div class="topbar wrmHeader">
			<span>상세검색</span>
			<a href="javascript:void(0)">닫기</a>
		</div>
		<div id="vjSelectAllScrollBody" class="cont-box wrmScrollable" style="height: 540px;">
			<article>
				<div class="vjSelectAllDataDiv">
					<!-- vjSelectDesiredArea.js* -->
					<p class="vjSelectAllDataDivLeft notice3 on dataon" id="vjSelectAllAreaDataToggle" name="vjSelectAllDataToggle" style="cursor: auto;">희망지역<a class="toogle-arrow" style="display:none;"></a></p>
					<div class="vjSelectAllDataDivRight cont-info" style="border:none;" id="vjSelectAllAreaDataDiv">
						<div class="select-area" style="padding:0px;">
							<span class="select-wrap" style="float:left;">
								<select id="vjSelectAllSidoSelect">
									<option>서울특별시</option>
								</select>
							</span>
							<span class="select-wrap">
								<select id="vjSelectAllSggSelect">
									<option>전체</option>
								</select>
							</span>
						</div>
						<p class="notice">선택 지역의 구인정보목록을 보실 수 있으며, 지도 영역은 선택지역으로 이동합니다.</p>
					</div>
				</div>
				<div class="vjSelectAllDataDiv">
					<p class="vjSelectAllDataDivLeft notice3 on dataon" id="vjSelectAllCompanyNameDataToggle" name="vjSelectAllDataToggle" style="cursor: auto;">기업명<a class="toogle-arrow" style="display:none;"></a></p>
					<div class="vjSelectAllDataDivRight cont-info" id="vjSelectAllCompanyNameDataDiv" name="vjSelectAllDataToggle" style="border:none;">
						<div class="cont-info" style="padding:0px;">
							<input type="text" id="vjSelectAllCompanyNameList" style="width: calc(100% - 10px); border: none; height: 20px; padding: 5px;" placeholder="검색어를 입력해주세요.">
						</div>
					</div>
				</div>
				<!-- vjSelectCompanyType.js* -->
				<div class="vjSelectAllDataDiv">
					<p class="vjSelectAllDataDivLeft notice3" id="vjSelectAllCompanyTypeDataToggle" name="vjSelectAllDataToggle">기업형태<a class="toogle-arrow"></a></p>
					<div class="vjSelectAllDataDivRight cont-info" id="vjSelectAllCompanyTypeDataDiv" name="vjSelectAllDataToggle" style="border:none; height: 44px; overflow: hidden; border-bottom: 1px solid #dadee1;">
						<div class="cont-info" style="padding:0px;">
							<!-- <div class="wrmScrollable" style="height: 132px;"> -->
							<div class="wrmScrollable">
								<ul class="multiCheckBox" id="vjSelectAllCompanyTypeList">
								</ul>
							</div>
							<!-- <p class="notice" style="margin-left:12px;"> 다중 선택 가능합니다.</p> -->
						</div>
						<p class="notice"> 다중 선택 가능합니다.</p>
					</div>
				</div>
				<!-- vjSelectJobClassification.js* -->
				<div class="vjSelectAllDataDiv">
					<p class="vjSelectAllDataDivLeft notice3" id="vjSelectAllJobClassificationDataToggle" name="vjSelectAllDataToggle">직종분류<a class="toogle-arrow"></a></p>
					<div class="vjSelectAllDataDivRight cont-info" id="vjSelectAllJobClassificationDataDiv" name="vjSelectAllDataToggle" style="border:none; height: 44px; overflow: hidden; border-bottom: 1px solid #dadee1;">
						<div class="cont-info" style="padding:0px;">
							<!-- <div class="wrmScrollable" style="height: 548px;"> -->
							<div class="wrmScrollable">
								<ul class="multiCheckBox" id="vjSelectAllJobClassificationList">
								</ul>
							</div>
							<!-- <p class="notice" style="margin-left:12px;"> 다중 선택 가능합니다.</p> -->				
						</div>
						<p class="notice"> 다중 선택 가능합니다.</p>
					</div>
				</div>
				<!-- vjSelectSalaryLevel.js* -->
				<div class="vjSelectAllDataDiv">
					<p class="vjSelectAllDataDivLeft notice3" id="vjSelectAllSalaryLevelDataToggle" name="vjSelectAllDataToggle">급여수준<a class="toogle-arrow"></a></p>
					<div class="vjSelectAllDataDivRight cont-info" id="vjSelectAllSalaryLevelDataDiv" name="vjSelectAllDataToggle" style="border:none; height: 44px; overflow: hidden; border-bottom: 1px solid #dadee1;">
						<div class="cont-info" style="padding:0px; height: 528px;">
							<!-- <div class="wrmScrollable" style="float:left; width:22%; height: 528px;"> -->
							<div class="wrmScrollable" style="float:left; width:22%;">
								<p class="notice" id="vjSelectAllSalaryLevelList1Name">시급</p>
								<ul class="multiCheckBox" id="vjSelectAllSalaryLevelList1">
								</ul>
							</div>
							<!-- <div class="wrmScrollable" style="float:left; width:22%; height: 528px;"> -->
							<div class="wrmScrollable" style="float:left; width:22%;">
								<p class="notice" id="vjSelectAllSalaryLevelList2Name">일급</p>
								<ul class="multiCheckBox" id="vjSelectAllSalaryLevelList2">
								</ul>
							</div>
							<!-- <div class="wrmScrollable" style="float:left; width:25%; height: 528px;"> -->
							<div class="wrmScrollable" style="float:left; width:25%;">
								<p class="notice" id="vjSelectAllSalaryLevelList3Name">월급</p>
								<ul class="multiCheckBox" id="vjSelectAllSalaryLevelList3">
								</ul>
							</div>
							<!-- <div class="wrmScrollable" style="float:left; width:31%; height: 528px;"> -->
							<div class="wrmScrollable" style="float:left; width:31%;">
								<p class="notice" id="vjSelectAllSalaryLevelList4Name">연봉</p>
								<ul class="multiCheckBox" id="vjSelectAllSalaryLevelList4">
								</ul>
							</div>
							<!-- <p class="notice" style="margin-left:12px;"> 다중 선택 가능합니다.</p> -->
						</div>
						<p class="notice"> 다중 선택 가능합니다.</p>
					</div>
				</div>
				<!-- vjSelectEmploymentType.js* -->
				<div class="vjSelectAllDataDiv">
					<p class="vjSelectAllDataDivLeft notice3" id="vjSelectAllEmploymentTypeDataToggle" name="vjSelectAllDataToggle">고용형태<a class="toogle-arrow"></a></p>
					<div class="vjSelectAllDataDivRight cont-info" id="vjSelectAllEmploymentTypeDataDiv" name="vjSelectAllDataToggle" style="border:none; height: 44px; overflow: hidden; border-bottom: 1px solid #dadee1;">
						<div class="cont-info" style="padding:0px;">
							<!-- <div class="wrmScrollable" style="height:88px;"> -->
							<div class="wrmScrollable">
								<ul class="multiCheckBox" id="vjSelectAllEmploymentTypeList">
								</ul>
							</div>
							<!-- <p class="notice" style="margin-left:12px;"> 다중 선택 가능합니다.</p> -->				
						</div>
						<p class="notice"> 다중 선택 가능합니다.</p>
					</div>
				</div>
				<!-- vjSelectAcademicAbility.js* -->
				<div class="vjSelectAllDataDiv">
					<p class="vjSelectAllDataDivLeft notice3" id="vjSelectAllAcademicAbilityDataToggle" name="vjSelectAllDataToggle">학력<a class="toogle-arrow"></a></p>
					<div class="vjSelectAllDataDivRight cont-info" id="vjSelectAllAcademicAbilityDataDiv" name="vjSelectAllDataToggle" style="border:none; height: 44px; overflow: hidden; border-bottom: 1px solid #dadee1;">
						<div class="cont-info" style="padding:0px;">
							<!-- <div class="wrmScrollable" style="height:88px;"> -->
							<div class="wrmScrollable">
								<ul class="multiCheckBox" id="vjSelectAllAcademicAbilityList">
								</ul>
							</div>
							<!-- <p class="notice" style="margin-left:12px;"> 다중 선택 가능합니다.</p> -->		
						</div>
						<p class="notice"> 다중 선택 가능합니다.</p>
					</div>
				</div>
				<!-- vjSelectCareer.js* -->
				<div class="vjSelectAllDataDiv">
					<p class="vjSelectAllDataDivLeft notice3" id="vjSelectAllCareerDataToggle" name="vjSelectAllDataToggle">경력<a class="toogle-arrow"></a></p>
					<div class="vjSelectAllDataDivRight cont-info" id="vjSelectAllCareerDataDiv" name="vjSelectAllDataToggle" style="border:none; height: 44px; overflow: hidden; border-bottom: 1px solid #dadee1;">
						<div class="cont-info" style="padding:0px;">
							<div class="wrmScrollable">
								<ul class="multiCheckBox" id="vjSelectAllCareerList">
								</ul>
							</div>
							<!-- <p class="notice" style="margin-left:12px;"> 다중 선택 가능합니다.</p> -->
						</div>
						<p class="notice"> 다중 선택 가능합니다.</p>
						<div class="area-tit">
							<a href="javascript:void(0)" id="vjSelectAllViewCollegeGraduateStat"><span>대졸자 일자리 이동경로 조사 (2016) 보기</span></a>
						</div>
					</div>
				</div>
				<!-- vjSelectIndustryClassification.js* -->
				<div class="vjSelectAllDataDiv">
					<p class="vjSelectAllDataDivLeft notice3" id="vjSelectAllIndustryClassificationDataToggle" name="vjSelectAllDataToggle">산업분류<a class="toogle-arrow"></a></p>
					<div class="vjSelectAllDataDivRight cont-info" id="vjSelectAllIndustryClassificationDataDiv" name="vjSelectAllDataToggle" style="border:none; height: 44px; overflow: hidden; border-bottom: 1px solid #dadee1;">
						<div class="cont-info" style="padding:0px;">
							<!-- <div class="wrmScrollable" style="height:328px;"> -->
							<div class="wrmScrollable">
								<ul class="multiCheckBox" id="vjSelectAllIndustryClassificationList">
								</ul>
							</div>
							<!-- <p class="notice" style="margin-left:12px;"> 다중 선택 가능합니다.</p> -->
						</div>
						<p class="notice"> 다중 선택 가능합니다.</p>
					</div>
				</div>
				<br>
			</article>
			<div class="popup-btn-area" style="display:inline-block !important; margin-top:10px;">
				<a href="javascript:void(0)" class="default-color" id="vjOk"><span>검색</span></a>
				<a href="javascript:void(0)" style="background-color: #ff9800;" id="vjClear"><span>초기화</span></a>
				<a href="javascript:void(0)" class="dark-gray" id="vjCancel"><span>취소</span></a>
			</div>
		</div>
	</div>
</div>
