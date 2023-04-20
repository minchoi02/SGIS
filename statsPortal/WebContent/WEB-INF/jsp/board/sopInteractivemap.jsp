<%
/**************************************************************************************************************************
* Program Name  : 대화형 통계지도 소개 JSP  
* File Name     : sopInteractivemap.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
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

<title>SOP 안내 - 인터랙티브 맵 | 통계지리정보서비스</title>

<link href="/css/default.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="/js/common/includeHead.js"></script>
<script src="/js/common/common.js"></script>
<script src="/js/board/sopInteractivemap.js"></script>

<link rel="stylesheet" type="text/css" href="/css/common.css" />
<link rel="stylesheet" type="text/css" href="/css/layout.css" />
<link rel="stylesheet" type="text/css" href="/css/nm.css" />
<style>
.function h1{font-size:14px; font-weight:700; color: #666; padding-top:15px; letter-spacing: -0.6px; font-weight: 100;}
.function h2{font-size:13px;  text-indent:19px; color: #666; letter-spacing: -0.6px; font-weight: 100;}
.function h2 span{ font-weight: 100;padding-left: 116px; line-height: 30px;}
.function h2 span.pl{ padding-left: 128px; }
</style>
</head>
<body>
	<div id="wrap">
		<!-- header // -->
		<header>
			<!-- Top Include -->
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>

		<!-- body -->
		<div id="container">
			<p class="path">
				<a href="/view/index"><span class="path_el">처음페이지&nbsp;&nbsp;>&nbsp;</span></a>
				<a href="/view/board/sopBoardMain"><span class="path_el">알림마당&nbsp;&nbsp;>&nbsp;</span></a> 
				<a href="/view/board/sopIntro"><span class="path_el">SOP 소개&nbsp;&nbsp;>&nbsp;</span></a> 
				<a href="/view/board/sopInteractivemap"><span class="path_el current">대화형 통계지도</span></a>
			</p>
			<p class="smr"></p>
			<div id="contents">
				<h3 class="ptit">대화형 통계지도</h3>
				<div id="content">
					<div class="pl20 pr20">
						<h4 class="itit">이용자가 원하는 통계정보를 지도위에서 다양하게 펼쳐볼 수 있습니다.</h4>
						<p class="para">인구, 주택, 사업체 등 센서스 자료와 행정구역단위 공표통계(KOSIS)를 조회하고 지역 간 비교도 할 수 있습니다.</p>
						<p class="para">조건별로 다양한 통계항목을 설정하여 조회할 수 있습니다.</p>
						<p class="para mb30">원하는 통계항목을 설정한 후 이를 지도상의 지역에 끌어가 놓는(Drag & Drop) 방식으로 이용할 수 있습니다.</p>

						<h4 class="itit">화면 및 기능설명</h4>
						<p class=""></p>
						<br />
						<p class="alarm">
							<img src="/img/nm/nm_data_03_1.jpg" alt="" usemap="#Map"  />
						</p>
<div class="function">
	<h1>① 지역을 설정할 수 있습니다. 반대로 지도를 움직이면 해당 지도의 중심 좌표를 변환하여 지역명을 표시합니다.</h1>
	<h1>② 통계항목을 선택합니다.</h1>
	<h1>③ 각 통계항목별로 세부 조건을 설정합니다. "검색조건담기" 버튼을 클릭하여 통계버튼을 생성합니다.</h1>
	<h1>④ 통계버튼이 저장되며 각 통계버튼을 지도 위 경계가 표시된 곳에 "드래그 앤 드롭"하여 조회합니다. <br /><br />
	 <span style="margin-left: 15px"> 통계버튼 결합, 분리, 삭제 기능을 수행할 수 있습니다.</span></h1>
	<h1>⑤ 지도의 축소/확대를 수행할 수 있습니다.</h1>
	<h1>⑥ 지도 상에서 사용자가 원하는 범위의 측정, 영역조회, POI표시 기능을 제공합니다.</h1>
	<h1>⑦ 지도에서 시각화된 데이터의 범례이며 사용자 설정을 통해 원하는 범례단계, 색상, 등위별 적용기준을 설정할 수 있습니다.</h1>
	<h1>⑧ 조회된 통계결과에 대한 내용 및 데이터 출처를 제공합니다.</h1>
	<h1>⑨ 사업체 전개도 표시, 데이터업로드, 초기화, 지도 다중뷰 등 부가기능을 제공합니다.</h1>
	<h1>⑩ 조회된 통계 데이터에 대해 상위지역, 차상위 지역간 비율을 제공합니다.</h1>
	<h1>⑪ 조회된 해당 통계 데이터의 세부 구역(지역)별 수치를 제공합니다.</h1>
	<h1>⑫ 해당 통계항목의 년도별 데이터를 선택, 조회 합니다.</h1>
</div>

						
						<!-- 
						<div
							style="position: absolute; top: 386px; left: 23px; width: 209px; height: 287px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="INFO_01"></div>
						<div
							style="position: absolute; top: 676px; left: 65px; width: 167px; height: 130px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="INFO_02"></div>
						<div
							style="position: absolute; top: 661px; left: 248px; width: 102px; height: 103px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="INFO_03"></div>
						<div
							style="position: absolute; top: 767px; left: 234px; width: 704px; height: 38px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="INFO_04"></div>
						<div
							style="position: absolute; top: 617px; left: 695px; width: 233px; height: 142px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="INFO_05"></div>
						<div
							style="position: absolute; top: 435px; left: 787px; width: 141px; height: 180px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="INFO_06"></div>
						<div
							style="position: absolute; top: 396px; left: 708px; width: 206px; height: 20px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="INFO_07"></div>
						<div
							style="position: absolute; top: 396px; left: 917px; width: 19px; height: 20px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="INFO_08"></div>
						<div
							style="position: absolute; top: 395px; left: 237px; width: 117px; height: 23px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="INFO_09"></div>
						<div
							style="position: absolute; top: 416px; left: 237px; width: 26px; height: 128px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="INFO_09_1"></div>
						<div
							style="position: absolute; top: 521px; left: 237px; width: 115px; height: 22px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="INFO_09_2"></div>
						<div
							style="position: absolute; top: 545px; left: 238px; width: 18px; height: 55px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="INFO_10"></div>
						<div
							style="position: absolute; top: 674px; left: 24px; width: 40px; height: 53px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="INFO_01_1"></div>
						<div
							style="position: absolute; top: 424px; left: 443px; width: 275px; height: 25px; background: rgba(0, 0, 0, 0);cursor: pointer;"
							id="INFO_15"></div>
						 -->
						<br /> <br />
						<h4 class="itit">대화형 통계지도 이용 가이드</h4>
						<h1 class="itit" style="font-size: 14px; color:red; padding2px; font-weight: normal;padding: 2px;">
								STEP 버튼을 누르면 이용법을 단계별로 보실 수 있습니다.
						</h1>
						<img src='/img/nm/IM STEP1-2.png' id="imstep1" alt=''
							style="margin-left: 0px; cursor: pointer;" /> <img
							src='/img/nm/IM STEP2-1.png' id="imstep2" alt=''
							style="margin-left: -53px; cursor: pointer;" /> <img
							src='/img/nm/IM STEP3-1.png' id="imstep3" alt=''
							style="margin-left: -53px; cursor: pointer;" /> <img
							src='/img/nm/IM STEP4-1.png' id="imstep4" alt=''
							style="margin-left: -53px; cursor: pointer;" /> <img
							src='/img/nm/IM STEP5-1.png' id="imstep5" alt=''
							style="margin-left: -53px; cursor: pointer;" /> <br /> <br />
						<div id="step0" style="position: relative">							
						    <h1 class="itit" style="font-size: 14px;padding2px; font-weight: normal;padding: 2px; ">
								맵 컨트롤러나 마우스를 이용하여 조회하기 원하는 지역으로 이동하고 지도 레벨을 조정합니다.<br />
								대화형 통계지도에서는 현재 지도의 (화면)중심 좌표와 지도 레벨에 따라 전국, 시/도, 시/군/구, 읍/면/동,
								집계구 단위의 지역 경계가 자동으로 표출됩니다.
							</h1>
							<br />
							<p class="alarm">
								<img src="/img/nm/inter_step_1.jpg" alt='' usemap="#Map" style="border: 1px solid; border-color: gray;"/>
							</p>
							<h1 class='itit' style="font-size: 14px;padding2px; font-weight: normal;padding: 2px;">(서울특별시를 중심으로 지도를
								이동하고 레벨을 조절하여, 서울특별시 내에서 통계버튼을 드래그 앤드 드롭 할 수 있는 대상인 '구'경계가 나와있는
								예)</h1>
						</div>
						<div id="step1"></div>
						<br /> <br /> <br />
						<h4 class="itit">사용자 데이터 업로드 이용 가이드</h4>
							 <h1 class="itit" style="font-size: 14px; color:red; padding2px; font-weight: normal;padding: 2px;">
								STEP 버튼을 누르면 이용법을 단계별로 보실 수 있습니다.
							</h1>
						<img src='/img/nm/DU STEP1-2.png' id="imstep6" alt='' /> <img
							src='/img/nm/DU STEP2-1.png' id="imstep7" alt=''
							style="margin-left: -26px; cursor: pointer;" /> <img
							src='/img/nm/DU STEP3-1.png' id="imstep8" alt=''
							style="margin-left: -26px; cursor: pointer;" /> <img
							src='/img/nm/DU STEP4-1.png' id="imstep9" alt=''
							style="margin-left: -26px; cursor: pointer;" /> <img
							src='/img/nm/DU STEP5-1.png' id="imstep10" alt=''
							style="margin-left: -26px; cursor: pointer;" /> <br /> <br />
						<div id="step2">
							<h1 class="itit"
								style="font-size: 14px;padding2px; font-weight: normal;padding: 2px;">
								'데이터 업로드' 버튼을 클릭하여 데이터 파일을 선택하고 업로드 합니다. 업로드 할 파일은 제공되는
								양식에 맞게 입력되어 있어야 합니다.
							</h1>
							<br />
							<p class="alarm">
								<img src="/img/nm/in_step_1.jpg" alt='' style="border: 1px solid; border-color: gray;" />
							</p>
						</div>
						<div id="step" style="height: 1px"></div>
						<div id="step3" style="margin-bottom: 30px;"></div>
						<p class="mb45 btn_arr_link">
							<a href="/view/map/interactiveMap" alt="대화형 통계지도 바로가기">대화형 통계지도
								바로가기</a>
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- footer// -->
	    <footer id="footer">
	    	<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
	    </footer>
	</div>
</body>
</html>