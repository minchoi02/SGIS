<%
/**************************************************************************************************************************
* Program Name	: 도시화 분석 지도 메인
* File Name		: urbanMain.jsp
* Comment		:
* History		:
*	2021.11.01	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Map" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="format-detection" content="telephone=no" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>도시화 분석 지도</title>

<link rel="stylesheet"
	href="/css/urban/plugin/jquery-ui.structure.min.css" />
<link rel="stylesheet" href="/css/urban/plugin/jquery-ui.theme.min.css" />
<link rel="stylesheet"
	href="/js/plugins/jquery-easyui-1.4/sop.css?ver=1.0" />
<!-- 도시화 분석 지도 css -->
<link rel="stylesheet" href="/css/urban/font/nanumsquare.css" />
<link rel="stylesheet" href="/css/urban/map.css?ver=1" />
<!-- <link rel="stylesheet" href="/css/urban/bootstrap-slider.css"> -->
<link rel="stylesheet" href="/css/urban/urbanUi.css" />

<script src="/js/urban/plugin/jquery.min.js"></script>
<script src="/js/urban/plugin/jquery-ui.js"></script>
<script src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
<script src="/js/plugins/jquery.sha256.js"></script>
<script src="/js/urban/plugin/bootstrap-slider.min.js"></script>
<script src="/js/plugins/durian-v2.0.js"></script>
<script src="/js/common/sop.portal.absAPI.js"></script>
<script src="/js/common/common.js?ver=0.2"></script>
<script src="/js/plugins/highcharts/highcharts.js"></script>
<script src="/js/plugins/highcharts/highcharts-more.js"></script>


<!--
<script src="/js/plugins/highcharts/modules/exporting.js"></script>	    
		<script src="/jsp/pyramid/js/highchart/js/highcharts-3d.src.js"></script>	    
	    <script src="/js/plugins/highcharts/highchart.drag.js"></script>
	    -->
<!-- 도시화 분석 지도 js -->
<!-- <script src="/js/common/map.js?version=1.3"></script> -->
<script src="/js/urban/urbanMap.js?version=1.0"></script>
<script src="/js/urban/urbanGeo.js?version=1.2"></script>
<script src="/js/urban/urbanMapBtn.js"></script>
<script src="/js/urban/urbanLegendInfo.js"></script>
<script src="/js/urban/urbanMapNavigation.js"></script>
<script src="/js/urban/urbanMask.js"></script>
<script src="/js/urban/urbanObj.js"></script>
<script src="/js/urban/urbanApi.js"></script>
<script src="/js/urban/urbanLeftMenu.js?ver=1"></script>
<script src="/js/urban/urbanDataBoard.js?ver=3"></script>
<script src="/js/catchmentArea/catchmentAreaMsgCommon.js"></script>
<script src="/js/urban/ui.common.js"></script>
<script src="/js/urban/urbanMain.js?ver=1.4"></script>
<!-- SGIS4_도시화 sns_공유 시작 -->
<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
<!-- SGIS4_도시화 sns_공유 끝 -->

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>

<script src="/js/plugins/imageCapture/rgbcolor.js"></script>
<script src="/js/plugins/imageCapture/canvg.js"></script>
<script src="/js/plugins/imageCapture/html2canvas.js"></script>
<script src="/js/plugins/imageCapture/html2canvas.svg.js"></script> 

<!-- <script type="text/javascript"
	src="http://kenwheeler.github.io/slick/slick/slick.min.js"></script> -->
<script type="text/javascript">
			var u_menu = "${u_menu}";
			var u_class = "${u_class}";
			var u_type = "${u_type}";
			var u_year = "${u_year}";
			var u_area = "${u_area}";
			var u_dstrct ="${u_dstrct}";
			var u_ksic ="${u_ksic}";
		</script>
</head>

<body>
	<!-- SGIS4_도시화 sns_공유 시작  팝업 뒤 검은배경-->
	<div class="dim"></div>
	<!-- SGIS4_도시화 sns_공유 끝 -->
	<div id="wrap">
		<header class="header">
			<h1 class="sgis">
				<a
					href="javascript:logWriteAndMove('A0', '02', '08', '00', '', '', '/', false);"><img
					src="/images/urban/logo.png" alt="sgis"></a>
			</h1>
			<div class="container">
				<div class="header-left">
					<div class="tit">도시화 분석 지도</div>
					<div class="colorMapLegend">
						<a href="#" class="switchBox"> <span class="txt"></span> <!-- SGIS4_220211_도시화_수정_시작 -->
							<span id="ttip_class" class="ball" data-subj="UN 도시분류 기준"
							title="<div class='tip_sec01'><p class='subH'><span class='bol'>· UN 도시분류 기준 공식화 </span></p>
<p class='subC'>: 유럽연합, 유엔 인간거주계획, 세계은행 등 6개 국제기구가 도시 기준을 표준화 </p><p class='subC indent1'>하기 위해 만든 도시 개념으로 `20년 UN 통계위원회에서 공식 채택</p></div>
<div class='tip_sec01'><p class='subH'><span class='bol'>·</span> 행정구역과는 별개로 <span class='bol'>1㎢ 격자*의 상주인구를 집계</span>한 후, <span class='bol'>인구규모를 기준으로</span></p><p class='subH indent2'><span class='bol'>도시, 준도시</span> 지역으로 구분</p>
<p class='subC att mb5'>* 격자: 국토를 행정구역과 관계없이 직각으로 교차하는 가로·세로선으로 구분한 영역</p>
<p class='subC'>- <span class='bol'>(도시, Urban Center)</span> 인구가 1,500명 이상인 격자 추출 후, 인접한 격자끼리</p><p class='subC indent3 mb5'>병합한 격자 그룹 생성, 격자 그룹별 인구 총합이 5만명 이상인 경우</p>
<p class='subC'>- <span class='bol'>(준도시, Urban Cluster)</span> 인구가 300명 이상인 격자 추출 후, 인접한 격자끼리</p><p class='subC indent3'>병합한 격자 그룹 생성, 격자 그룹별 인구 총합이 5천명 이상인 경우</p></div>">?</span>
							<!-- SGIS4_220211_도시화_수정_끝 -->
						</a>
					</div>
					<div class="select-group" id="mapNavi_1">
						<!--
	                        <select name="sidoSelect_mapNavi_1" id="sidoSelect_mapNavi_1" class="select v1">
	                            <option value="">서울특별시</option>
	                        </select>
	                        <select name="sggSelect_mapNavi_1" id="sggSelect_mapNavi_1" class="select v1">
	                            <option value="">중구</option>
	                        </select>
	                        <select name="admSelect_mapNavi_1" id="admSelect_mapNavi_1" class="select v1">
	                            <option value="">읍,면,동</option>
	                        </select>
	                    -->
					</div>
				</div>
				<div class="header-right">
					<a href="#" id="tuto_btn"><img src="/images/urban/btn-use.png"
						alt="사용자가이드"></a>
					<!--<a href="#"><img src="/images/urban/btn-print.png" alt="레포트"></a>-->
					<!-- SGIS4_도시화 sns_공유 시작 -->
					<a href="#" id="share_btn"><img
						src="/images/urban/btn-share.png" alt="공유"></a>
					<!-- SGIS4_도시화 sns_공유 끝 -->
				</div>
			</div>
		</header>
		<div id="aside">
			<div class="snb">
				<ul id="gnb" class="gnb">
					<li id="gnb_menu_2" class="gnb-li-2 gnb-li">
						<a href="#">
							<svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none slice">
								<path d="M4.11111 5.67444L4.11889 5.66589M7.22222 5.67444L7.23 5.66589M4.11111 8.78556L4.11889 8.777M7.22222 8.78556L7.23 8.777M4.11111 11.8967L4.11889 11.8881M7.22222 11.8967L7.23 11.8881M10.3333 15H1.46667C1.3429 15 1.2242 14.9508 1.13668 14.8633C1.04917 14.7758 1 14.6571 1 14.5333V3.02222C1 2.89845 1.04917 2.77976 1.13668 2.69224C1.2242 2.60472 1.3429 2.55556 1.46667 2.55556H5.66667V1.46667C5.66667 1.3429 5.71583 1.2242 5.80335 1.13668C5.89087 1.04917 6.00957 1 6.13333 1H9.86667C9.99043 1 10.1091 1.04917 10.1967 1.13668C10.2842 1.2242 10.3333 1.3429 10.3333 1.46667V5.66667M10.3333 15H14.5333C14.6571 15 14.7758 14.9508 14.8633 14.8633C14.9508 14.7758 15 14.6571 15 14.5333V6.13333C15 6.00957 14.9508 5.89087 14.8633 5.80335C14.7758 5.71583 14.6571 5.66667 14.5333 5.66667H10.3333M10.3333 15V11.8889M10.3333 5.66667V8.77778M10.3333 8.77778H11.8889M10.3333 8.77778V11.8889M10.3333 11.8889H11.8889" stroke="#222222" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
							도시변화
						</a>
						<ul>
							<li><a href="#" data-cls-type="cls_un">UN도시분류</a></li>
							<li><a href="#" data-cls-type="cls_sgis">통계청 분류</a></li>
						</ul></li>
					<li id="gnb_menu_1" class="gnb-li-1 gnb-li">
						<a href="#">
							<svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none slice">
								<path d="M15 15H1V1" stroke="#222222" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M1 11.9375L8 5.375L10.625 8L14.5625 4.0625" stroke="#222222" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
							도시화통계
						</a>
						<ul>
							<li><a href="#" data-cls-type="cls_un">UN도시분류</a></li>
							<li><a href="#" data-cls-type="cls_sgis">통계청 분류</a></li>
						</ul></li>
					<li id="gnb_menu_3" class="gnb-li-3 gnb-li">
						<a href="#">
						<svg width="19" height="19" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M15.6517 13.4446C16.4937 12.1845 16.9596 10.7123 16.9975 9.2C17.0002 9.08958 16.9104 9 16.8 9H9.19998C9.08952 9 8.99998 8.91046 8.99998 8.8L8.99998 1.2C8.99998 1.08954 8.9104 0.999739 8.79997 1.0025C7.28767 1.04031 5.81553 1.50627 4.55543 2.34824C3.23984 3.22729 2.21446 4.47672 1.60896 5.93853C1.00346 7.40034 0.845036 9.00887 1.15372 10.5607C1.4624 12.1126 2.22432 13.538 3.34314 14.6569C4.46196 15.7757 5.88742 16.5376 7.43926 16.8463C8.9911 17.155 10.5996 16.9965 12.0614 16.391C13.5232 15.7855 14.7727 14.7602 15.6517 13.4446Z" stroke="#222222" stroke-linejoin="round"/>
							<path d="M13.3783 1.44664C12.7282 1.17735 12.0354 1.02742 11.3332 1.00348C11.2228 0.99971 11.1333 1.08961 11.1333 1.20007L11.1333 6.66673C11.1333 6.77719 11.2228 6.86673 11.3333 6.86673L16.7999 6.86673C16.9104 6.86673 17.0003 6.77716 16.9965 6.66677C16.9726 5.96456 16.8227 5.27179 16.5534 4.62166C16.2585 3.90988 15.8264 3.26314 15.2816 2.71837C14.7369 2.1736 14.0901 1.74147 13.3783 1.44664Z" stroke="#222222" stroke-linejoin="round"/>
						</svg>
						도시화지표분석
						</a>
						<ul>
							<li><a href="#" data-cls-type="cls_un">UN도시분류</a></li>
							<li><a href="#" data-cls-type="cls_sgis">통계청 분류</a></li>
						</ul>
					</li>
					<li id="gnb_menu_4" class="gnb-li-4 gnb-li">
						<a href="#">
							<svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none slice">
								<path d="M14.0669 1H11.2148L11.5721 4.88889C11.5721 4.88889 12.2865 5.66667 13.3581 5.66667C13.9207 5.66747 14.4641 5.44454 14.8863 5.03978C14.9309 4.99438 14.9642 4.93734 14.9829 4.87406C15.0017 4.81078 15.0053 4.74334 14.9935 4.67811L14.4891 1.38889C14.4722 1.28023 14.4206 1.18157 14.3433 1.1104C14.266 1.03922 14.1681 1.00011 14.0669 1V1Z" stroke="#222222"/>
								<path d="M11.2149 1L11.5722 4.88889C11.5722 4.88889 10.8577 5.66667 9.78608 5.66667C8.71443 5.66667 8 4.88889 8 4.88889V1H11.2149Z" stroke="#222222"/>
								<path d="M7.99989 1V4.88889C7.99989 4.88889 7.28546 5.66667 6.21381 5.66667C5.14217 5.66667 4.42773 4.88889 4.42773 4.88889L4.78495 1H7.99989Z" stroke="#222222"/>
								<path d="M4.78467 1H1.93337C1.83192 0.999959 1.73374 1.03909 1.6563 1.11044C1.57886 1.18179 1.52717 1.28073 1.51043 1.38967L1.00675 4.67889C0.994982 4.74412 0.998642 4.81154 1.01739 4.87481C1.03614 4.93807 1.06935 4.99511 1.11392 5.04056C1.34825 5.26611 1.87193 5.66744 2.64137 5.66744C3.71302 5.66744 4.42745 4.88967 4.42745 4.88967L4.78467 1.00078V1Z" stroke="#222222"/>
								<path d="M1.5752 5.66675V13.4445C1.5752 13.8571 1.72574 14.2527 1.9937 14.5445C2.26166 14.8362 2.6251 15.0001 3.00406 15.0001H13.0061C13.3851 15.0001 13.7485 14.8362 14.0165 14.5445C14.2844 14.2527 14.435 13.8571 14.435 13.4445V5.66675" stroke="#222222"/>
								<path d="M10.0288 15.0001V10.3334C10.0288 9.92083 9.87824 9.52517 9.61027 9.23344C9.34231 8.94172 8.97887 8.77783 8.59991 8.77783H7.17105C6.79209 8.77783 6.42866 8.94172 6.16069 9.23344C5.89273 9.52517 5.74219 9.92083 5.74219 10.3334V15.0001" stroke="#222222" stroke-miterlimit="16"/>
							</svg>
							생활시설 분포
						</a>
						<ul>
							<li><a href="#" data-cls-type="cls_un">UN도시분류</a></li>
							<li><a href="#" data-cls-type="cls_sgis">통계청 분류</a></li>
						</ul>
					</li>
				</ul>
				<ul>
					<li>
						<div class="sinceBox">
							<select class="sinceNew" data-since-gb="">
								<option value="">2020</option>
								<option value="">2019</option>
								<option value="">2018</option>
								<option value="">2017</option>
								<option value="">2016</option>
								<option value="">2015</option>
								<option value="">2010</option>
								<option value="">2005</option>
								<option value="">2000</option>
							</select>

							<svg width="14" height="8" viewBox="0 0 14 8" fill="none"
								xmlns="http://www.w3.org/2000/svg" class="icon--arrow">
									<path
									d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"
									fill="#222222" />
								</svg>
						</div>
						<div class="since" data-since-gb="">
							<!--
			                    <div class="since-button"><a href="#">2020</a></div>
			                    <div class="since-button"><a href="#">2019</a></div>
			                    <div class="since-button"><a href="#">2018</a></div>
			                    <div class="since-button"><a href="#">2017</a></div>
			                    <div class="since-button"><a href="#">2016</a></div>
			                    <div class="since-button"><a href="#">2015</a></div>
			                    <div class="since-button"><a href="#">2010</a></div>
			                    <div class="since-button"><a href="#">2005</a></div>
			                    <div class="since-button"><a href="#">2000</a></div>
			                    -->
						</div>
					</li>
				</ul>
			</div>
			<!-- // gnb -->
			<div class="time-legend">
				<span class="legend-bar-1"></span> <span class="legend-font">도시</span>
				<span class="legend-bar-2"></span> <span class="legend-font">준도시</span>
			</div>
		</div>
		<div class="menu">
			<div class="menu-wrapper">
				<a href="#" class="menu-close">
					<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z" fill="#222222" />
					</svg>
				</a>
				<div class="menu-content menu-content-1">
					<div class="menu-wrap">
						<ul id="urban_ty_box_1" class="tab">
							<li data-urbar-type="01">도시</li>
							<li data-urbar-type="02">준도시</li>
						</ul>
						<div class="gpsBox">
							<input type="text" class="gps-input" placeholder="고양시 일산동구(정발산동, 마두 1동 등)" readonly/>
						</div>

						<!--
                            <div id="urban_ty_box_1" class="sub-sort">
                                <span class="lbl-radio"><input type="radio" id="urban_ty_center" name="ro_urban_ty" value="01" checked><label for="urban_ty_center">도시</label></span>
                                <span class="lbl-radio"><input type="radio" id="urban_ty_cluster" name="ro_urban_ty" value="02"><label for="urban_ty_cluster">준도시</label></span>
                            </div>
                            <div class="menu-total"><b id="urban_tot_cnt_1">67</b> 개 지역</div>
                            -->
						<div id="menu_group_box">
							<div class="menu-group">
								<a href="#" class="menu-toggle">수도권(서울, 경기, 인천)</a>
								<div class="menu-list"></div>
							</div>
							<div class="menu-group">
								<a href="#" class="menu-toggle">강원권</a>
								<div class="menu-list"></div>
							</div>
							<div class="menu-group">
								<a href="#" class="menu-toggle">세종권</a>
								<div class="menu-list"></div>
							</div>
							<div class="menu-group">
								<a href="#" class="menu-toggle">충북권</a>
								<div class="menu-list"></div>
							</div>
							<div class="menu-group">
								<a href="#" class="menu-toggle">대전충남권</a>
								<div class="menu-list"></div>
							</div>
							<div class="menu-group">
								<a href="#" class="menu-toggle">전북권</a>
								<div class="menu-list"></div>
							</div>
							<div class="menu-group">
								<a href="#" class="menu-toggle">광주전남권</a>
								<div class="menu-list"></div>
							</div>
							<div class="menu-group">
								<a href="#" class="menu-toggle">대구경북권</a>
								<div class="menu-list"></div>
							</div>
							<div class="menu-group">
								<a href="#" class="menu-toggle">부산울산경남권</a>
								<div class="menu-list"></div>
							</div>
							<div class="menu-group">
								<a href="#" class="menu-toggle">제주권</a>
								<div class="menu-list"></div>
							</div>
						</div>


					</div>
				</div>
				<div class="menu-content menu-content-2">2</div>
				<div class="menu-content menu-content-3">3</div>
			</div>
		</div>
		<div id="sub_group_box">
			<div class="subGroupTit"></div>
			<div class="subGroupScBox">
				<div class="smenu-close"></div>
				<div class="subGroupTit2"></div>
				<div class="subGroupCon"></div>
			</div>
		</div>
		<!-- // sub -->
		<div class="facility-layer">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M12 2L2 7L12 12L22 7L12 2Z" stroke-width="2"stroke-linecap="round" stroke-linejoin="round" />
					<path d="M2 17L12 22L22 17" stroke-width="2" stroke-linecap="round"stroke-linejoin="round" />
					<path d="M2 12L12 17L22 12" stroke-width="2" stroke-linecap="round"stroke-linejoin="round" />
			</svg>
		</div>
		<div class="facility">
			<ul>
				<li>
					<div class="iconbox">
						<div>
							<svg width="16" height="24" viewBox="0 0 21 27" xmlns="http://www.w3.org/2000/svg">
								<path d="M6.91992 21.1719L8.54492 19.5977L5.44727 16.9062L2.80664 19.5469C2.0957 20.2578 2.04492 21.4258 2.6543 22.1875L5.0918 25.4375C5.44727 25.9961 6.05664 26.25 6.7168 26.25C7.12305 26.25 7.5293 26.1484 7.88477 25.8438C8.79883 25.1836 9.00195 23.9141 8.29102 23L6.91992 21.1719ZM10.373 8.375C12.6074 8.375 14.3848 6.54688 14.3848 4.3125C14.3848 2.12891 12.6074 0.25 10.373 0.25C8.08789 0.25 6.31055 2.07812 6.31055 4.3125C6.31055 6.49609 8.08789 8.375 10.373 8.375ZM19.7168 7.61328C19.0566 6.69922 17.8379 6.49609 16.873 7.15625L14.8418 8.57812C12.1504 10.457 8.54492 10.457 5.85352 8.57812L3.77148 7.15625C2.85742 6.49609 1.58789 6.69922 0.978516 7.61328C0.318359 8.57812 0.521484 9.79688 1.43555 10.457L3.51758 11.9297C4.12695 12.3359 4.78711 12.6914 5.49805 12.9961V14.875H15.248V12.9961C15.9082 12.6914 16.5684 12.3359 17.1777 11.9297L19.209 10.457C20.1738 9.79688 20.377 8.57812 19.7168 7.61328ZM15.248 16.9062L12.1504 19.5977L13.7754 21.1719L12.4043 23C11.6934 23.9141 11.8965 25.1836 12.8105 25.8438C13.166 26.1484 13.5723 26.25 13.9785 26.25C14.5879 26.25 15.1973 25.9961 15.6035 25.4375L18.041 22.1875C18.6504 21.4258 18.5488 20.2578 17.8379 19.5469L15.248 16.9062Z" />
							</svg>
						</div>
						<span>어린이집</span>  <span>-</span>
					</div>

				</li>
				<li>
					<div class="iconbox">
						<div>
							<svg width="16" height="24" viewBox="0 0 19 27" xmlns="http://www.w3.org/2000/svg">
								<path d="M13.0015 3.5C13.0015 5.32812 11.5288 6.75 9.75146 6.75C7.92334 6.75 6.50146 5.32812 6.50146 3.5C6.50146 1.72266 7.92334 0.25 9.75146 0.25C11.5288 0.25 13.0015 1.72266 13.0015 3.5ZM7.87256 8.93359C8.48193 9.08594 9.09131 9.1875 9.75146 9.1875C11.7827 9.1875 13.6616 8.17188 14.7788 6.49609L15.6929 5.07422C16.1499 4.3125 17.1655 4.10938 17.9272 4.61719C18.689 5.07422 18.8921 6.08984 18.3843 6.85156L17.4702 8.27344C16.5562 9.69531 15.2866 10.8125 13.814 11.5234V24.625C13.814 25.5391 13.0522 26.25 12.189 26.25C11.2749 26.25 10.564 25.5391 10.564 24.625V19.75H8.93896V24.625C8.93896 25.5391 8.17725 26.25 7.31396 26.25C6.3999 26.25 5.68896 25.5391 5.68896 24.625V11.5234C4.21631 10.8125 2.94678 9.74609 2.03271 8.32422L1.06787 6.85156C0.560059 6.08984 0.763184 5.125 1.5249 4.61719C2.23584 4.10938 3.25146 4.3125 3.75928 5.07422L4.7749 6.54688C5.48584 7.61328 6.55225 8.42578 7.72021 8.88281C7.771 8.88281 7.82178 8.88281 7.87256 8.93359Z" />
							</svg>
						</div>
						<span>유치원</span>  <span>-</span>
					</div>

				</li>
				<li>
					<div class="iconbox">
						<div>
							<svg width="20" height="24" viewBox="0 0 33 27" xmlns="http://www.w3.org/2000/svg">
								<path d="M16.25 6.75C16.6562 6.75 17.0625 7.15625 17.0625 7.5625V8.375H17.875C18.2812 8.375 18.6875 8.78125 18.6875 9.1875C18.6875 9.64453 18.2812 10 17.875 10H16.25C15.793 10 15.4375 9.64453 15.4375 9.1875V7.5625C15.4375 7.15625 15.793 6.75 16.25 6.75ZM24.1719 5.27734L30.5703 6.64844C31.6875 6.90234 32.5 7.91797 32.5 9.03516V23.8125C32.5 25.1836 31.3828 26.25 30.0625 26.25H2.4375C1.06641 26.25 0 25.1836 0 23.8125V9.03516C0 7.91797 0.761719 6.90234 1.87891 6.64844L8.27734 5.27734L15.3359 0.554688C15.8438 0.199219 16.6055 0.199219 17.1133 0.554688L24.1719 5.27734ZM13 26.25H19.5V21.375C19.5 19.5977 18.0273 18.125 16.25 18.125C14.4219 18.125 13 19.5977 13 21.375V26.25ZM4.875 10C4.41797 10 4.0625 10.4062 4.0625 10.8125V14.0625C4.0625 14.5195 4.41797 14.875 4.875 14.875H6.5C6.90625 14.875 7.3125 14.5195 7.3125 14.0625V10.8125C7.3125 10.4062 6.90625 10 6.5 10H4.875ZM25.1875 14.0625C25.1875 14.5195 25.543 14.875 26 14.875H27.625C28.0312 14.875 28.4375 14.5195 28.4375 14.0625V10.8125C28.4375 10.4062 28.0312 10 27.625 10H26C25.543 10 25.1875 10.4062 25.1875 10.8125V14.0625ZM4.875 16.5C4.41797 16.5 4.0625 16.9062 4.0625 17.3125V20.5625C4.0625 21.0195 4.41797 21.375 4.875 21.375H6.5C6.90625 21.375 7.3125 21.0195 7.3125 20.5625V17.3125C7.3125 16.9062 6.90625 16.5 6.5 16.5H4.875ZM25.1875 20.5625C25.1875 21.0195 25.543 21.375 26 21.375H27.625C28.0312 21.375 28.4375 21.0195 28.4375 20.5625V17.3125C28.4375 16.9062 28.0312 16.5 27.625 16.5H26C25.543 16.5 25.1875 16.9062 25.1875 17.3125V20.5625ZM16.25 4.71875C13.7617 4.71875 11.7812 6.75 11.7812 9.1875C11.7812 11.6758 13.7617 13.6562 16.25 13.6562C18.6875 13.6562 20.7188 11.6758 20.7188 9.1875C20.7188 6.75 18.6875 4.71875 16.25 4.71875Z" />
							</svg>
						</div>
						<span>초등학교</span>  <span>-</span>
					</div>

				</li>
				<li>
					<div class="iconbox">
						<div>
							<svg width="20" height="24" viewBox="0 0 33 27" xmlns="http://www.w3.org/2000/svg">
								<path d="M16.25 6.75C16.6562 6.75 17.0625 7.15625 17.0625 7.5625V8.375H17.875C18.2812 8.375 18.6875 8.78125 18.6875 9.1875C18.6875 9.64453 18.2812 10 17.875 10H16.25C15.793 10 15.4375 9.64453 15.4375 9.1875V7.5625C15.4375 7.15625 15.793 6.75 16.25 6.75ZM24.1719 5.27734L30.5703 6.64844C31.6875 6.90234 32.5 7.91797 32.5 9.03516V23.8125C32.5 25.1836 31.3828 26.25 30.0625 26.25H2.4375C1.06641 26.25 0 25.1836 0 23.8125V9.03516C0 7.91797 0.761719 6.90234 1.87891 6.64844L8.27734 5.27734L15.3359 0.554688C15.8438 0.199219 16.6055 0.199219 17.1133 0.554688L24.1719 5.27734ZM13 26.25H19.5V21.375C19.5 19.5977 18.0273 18.125 16.25 18.125C14.4219 18.125 13 19.5977 13 21.375V26.25ZM4.875 10C4.41797 10 4.0625 10.4062 4.0625 10.8125V14.0625C4.0625 14.5195 4.41797 14.875 4.875 14.875H6.5C6.90625 14.875 7.3125 14.5195 7.3125 14.0625V10.8125C7.3125 10.4062 6.90625 10 6.5 10H4.875ZM25.1875 14.0625C25.1875 14.5195 25.543 14.875 26 14.875H27.625C28.0312 14.875 28.4375 14.5195 28.4375 14.0625V10.8125C28.4375 10.4062 28.0312 10 27.625 10H26C25.543 10 25.1875 10.4062 25.1875 10.8125V14.0625ZM4.875 16.5C4.41797 16.5 4.0625 16.9062 4.0625 17.3125V20.5625C4.0625 21.0195 4.41797 21.375 4.875 21.375H6.5C6.90625 21.375 7.3125 21.0195 7.3125 20.5625V17.3125C7.3125 16.9062 6.90625 16.5 6.5 16.5H4.875ZM25.1875 20.5625C25.1875 21.0195 25.543 21.375 26 21.375H27.625C28.0312 21.375 28.4375 21.0195 28.4375 20.5625V17.3125C28.4375 16.9062 28.0312 16.5 27.625 16.5H26C25.543 16.5 25.1875 16.9062 25.1875 17.3125V20.5625ZM16.25 4.71875C13.7617 4.71875 11.7812 6.75 11.7812 9.1875C11.7812 11.6758 13.7617 13.6562 16.25 13.6562C18.6875 13.6562 20.7188 11.6758 20.7188 9.1875C20.7188 6.75 18.6875 4.71875 16.25 4.71875Z" />
							</svg>
						</div>
						<span>중학교</span>  <span>-</span>
					</div>

				</li>
				<li>
					<div class="iconbox">
						<div>
							<svg width="20" height="24" viewBox="0 0 33 27" xmlns="http://www.w3.org/2000/svg">
								<path d="M16.25 6.75C16.6562 6.75 17.0625 7.15625 17.0625 7.5625V8.375H17.875C18.2812 8.375 18.6875 8.78125 18.6875 9.1875C18.6875 9.64453 18.2812 10 17.875 10H16.25C15.793 10 15.4375 9.64453 15.4375 9.1875V7.5625C15.4375 7.15625 15.793 6.75 16.25 6.75ZM24.1719 5.27734L30.5703 6.64844C31.6875 6.90234 32.5 7.91797 32.5 9.03516V23.8125C32.5 25.1836 31.3828 26.25 30.0625 26.25H2.4375C1.06641 26.25 0 25.1836 0 23.8125V9.03516C0 7.91797 0.761719 6.90234 1.87891 6.64844L8.27734 5.27734L15.3359 0.554688C15.8438 0.199219 16.6055 0.199219 17.1133 0.554688L24.1719 5.27734ZM13 26.25H19.5V21.375C19.5 19.5977 18.0273 18.125 16.25 18.125C14.4219 18.125 13 19.5977 13 21.375V26.25ZM4.875 10C4.41797 10 4.0625 10.4062 4.0625 10.8125V14.0625C4.0625 14.5195 4.41797 14.875 4.875 14.875H6.5C6.90625 14.875 7.3125 14.5195 7.3125 14.0625V10.8125C7.3125 10.4062 6.90625 10 6.5 10H4.875ZM25.1875 14.0625C25.1875 14.5195 25.543 14.875 26 14.875H27.625C28.0312 14.875 28.4375 14.5195 28.4375 14.0625V10.8125C28.4375 10.4062 28.0312 10 27.625 10H26C25.543 10 25.1875 10.4062 25.1875 10.8125V14.0625ZM4.875 16.5C4.41797 16.5 4.0625 16.9062 4.0625 17.3125V20.5625C4.0625 21.0195 4.41797 21.375 4.875 21.375H6.5C6.90625 21.375 7.3125 21.0195 7.3125 20.5625V17.3125C7.3125 16.9062 6.90625 16.5 6.5 16.5H4.875ZM25.1875 20.5625C25.1875 21.0195 25.543 21.375 26 21.375H27.625C28.0312 21.375 28.4375 21.0195 28.4375 20.5625V17.3125C28.4375 16.9062 28.0312 16.5 27.625 16.5H26C25.543 16.5 25.1875 16.9062 25.1875 17.3125V20.5625ZM16.25 4.71875C13.7617 4.71875 11.7812 6.75 11.7812 9.1875C11.7812 11.6758 13.7617 13.6562 16.25 13.6562C18.6875 13.6562 20.7188 11.6758 20.7188 9.1875C20.7188 6.75 18.6875 4.71875 16.25 4.71875Z" />
							</svg>
						</div>
						<span>고등학교</span>  <span>-</span>
					</div>

				</li>
				<li>
					<div class="iconbox">
						<div>
							<svg width="22" height="24" viewBox="0 0 33 27" xmlns="http://www.w3.org/2000/svg">
								<path d="M9.75928 2.6875C9.75928 1.36719 10.8257 0.25 12.1968 0.25H20.3218C21.6421 0.25 22.7593 1.36719 22.7593 2.6875V26.25H18.6968V22.1875C18.6968 20.8672 17.5796 19.75 16.2593 19.75C14.8882 19.75 13.8218 20.8672 13.8218 22.1875V26.25H9.75928V2.6875ZM15.853 3.5C15.396 3.5 15.0405 3.90625 15.0405 4.3125V5.53125H13.8218C13.3647 5.53125 13.0093 5.9375 13.0093 6.34375V7.15625C13.0093 7.61328 13.3647 7.96875 13.8218 7.96875H15.0405V9.1875C15.0405 9.64453 15.396 10 15.853 10H16.6655C17.0718 10 17.478 9.64453 17.478 9.1875V7.96875H18.6968C19.103 7.96875 19.5093 7.61328 19.5093 7.15625V6.34375C19.5093 5.9375 19.103 5.53125 18.6968 5.53125H17.478V4.3125C17.478 3.90625 17.0718 3.5 16.6655 3.5H15.853ZM8.13428 5.125V26.25H2.44678C1.07568 26.25 0.00927734 25.1836 0.00927734 23.8125V16.5H4.07178C4.47803 16.5 4.88428 16.1445 4.88428 15.6875C4.88428 15.2812 4.47803 14.875 4.07178 14.875H0.00927734V11.625H4.07178C4.47803 11.625 4.88428 11.2695 4.88428 10.8125C4.88428 10.4062 4.47803 10 4.07178 10H0.00927734V7.5625C0.00927734 6.24219 1.07568 5.125 2.44678 5.125H8.13428ZM30.0718 5.125C31.3921 5.125 32.5093 6.24219 32.5093 7.5625V10H28.4468C27.9897 10 27.6343 10.4062 27.6343 10.8125C27.6343 11.2695 27.9897 11.625 28.4468 11.625H32.5093V14.875H28.4468C27.9897 14.875 27.6343 15.2812 27.6343 15.6875C27.6343 16.1445 27.9897 16.5 28.4468 16.5H32.5093V23.8125C32.5093 25.1836 31.3921 26.25 30.0718 26.25H24.3843V5.125H30.0718Z" />
							</svg>
						</div>
						<span>병원</span>  <span>-</span>
					</div>

				</li>
				<li>
					<div class="iconbox">
						<div>
							<svg width="20" height="24" viewBox="0 0 33 27" xmlns="http://www.w3.org/2000/svg">
								<path d="M18.6968 0.25C20.0171 0.25 21.1343 1.36719 21.1343 2.6875V5.125H23.6733C24.5366 5.125 25.3491 5.48047 26.0093 6.08984L29.9194 10C30.5288 10.6094 30.8843 11.4727 30.8843 12.3359V18.125C31.7476 18.125 32.5093 18.8867 32.5093 19.75C32.5093 20.6641 31.7476 21.375 30.8843 21.375H29.2593C29.2593 24.0664 27.0757 26.25 24.3843 26.25C21.6421 26.25 19.5093 24.0664 19.5093 21.375H13.0093C13.0093 24.0664 10.8257 26.25 8.13428 26.25C5.39209 26.25 3.25928 24.0664 3.25928 21.375H2.44678C1.07568 21.375 0.00927734 20.3086 0.00927734 18.9375V2.6875C0.00927734 1.36719 1.07568 0.25 2.44678 0.25H18.6968ZM21.1343 8.375V13.25H27.6343V12.3359L23.6733 8.375H21.1343ZM8.13428 18.9375C6.76318 18.9375 5.69678 20.0547 5.69678 21.375C5.69678 22.7461 6.76318 23.8125 8.13428 23.8125C9.45459 23.8125 10.5718 22.7461 10.5718 21.375C10.5718 20.0547 9.45459 18.9375 8.13428 18.9375ZM24.3843 23.8125C25.7046 23.8125 26.8218 22.7461 26.8218 21.375C26.8218 20.0547 25.7046 18.9375 24.3843 18.9375C23.0132 18.9375 21.9468 20.0547 21.9468 21.375C21.9468 22.7461 23.0132 23.8125 24.3843 23.8125ZM5.69678 9.1875C5.69678 9.64453 6.05225 10 6.50928 10H8.94678V12.4375C8.94678 12.8945 9.30225 13.25 9.75928 13.25H11.3843C11.7905 13.25 12.1968 12.8945 12.1968 12.4375V10H14.6343C15.0405 10 15.4468 9.64453 15.4468 9.1875V7.5625C15.4468 7.15625 15.0405 6.75 14.6343 6.75H12.1968V4.3125C12.1968 3.90625 11.7905 3.5 11.3843 3.5H9.75928C9.30225 3.5 8.94678 3.90625 8.94678 4.3125V6.75H6.50928C6.05225 6.75 5.69678 7.15625 5.69678 7.5625V9.1875Z" />
							</svg>
						</div>
						<span>응급의료</span> <span>-</span>
					</div>

				</li>
				<li>
					<div class="iconbox">
						<div>
							<svg width="18" height="24" viewBox="0 0 27 25" xmlns="http://www.w3.org/2000/svg">
								<path d="M0.0117188 7.5625V22.1875C0.0117188 23.5078 1.12891 24.625 2.44922 24.625H3.26172V5.125H2.44922C1.12891 5.125 0.0117188 6.29297 0.0117188 7.5625ZM23.5742 5.125H22.7617V24.625H23.5742C24.8438 24.625 26.0117 23.5078 26.0117 22.1875V7.5625C26.0117 6.29297 24.8438 5.125 23.5742 5.125ZM19.5117 2.6875C19.5117 1.41797 18.3438 0.25 17.0742 0.25H8.94922C7.62891 0.25 6.51172 1.41797 6.51172 2.6875V5.125H4.88672V24.625H21.1367V5.125H19.5117V2.6875ZM8.94922 2.6875H17.0742V5.125H8.94922V2.6875ZM17.8867 16.0938C17.8867 16.3477 17.6836 16.5 17.4805 16.5H14.6367V19.3438C14.6367 19.5977 14.4336 19.75 14.2305 19.75H11.793C11.5391 19.75 11.3867 19.5977 11.3867 19.3438V16.5H8.54297C8.28906 16.5 8.13672 16.3477 8.13672 16.0938V13.6562C8.13672 13.4531 8.28906 13.25 8.54297 13.25H11.3867V10.4062C11.3867 10.2031 11.5391 10 11.793 10H14.2305C14.4336 10 14.6367 10.2031 14.6367 10.4062V13.25H17.4805C17.6836 13.25 17.8867 13.4531 17.8867 13.6562V16.0938Z" />
							</svg>
						</div>
						<span>보건소</span>  <span>-</span>
					</div>

				</li>
				<li>
					<div class="iconbox">
						<div>
							<svg width="16" height="24" viewBox="0 0 23 27" xmlns="http://www.w3.org/2000/svg">
								<path d="M3.97412 5.48047V6.90234C6.05615 7.81641 8.59521 8.375 11.3882 8.375C14.1304 8.375 16.6694 7.81641 18.7515 6.90234V5.48047L19.8687 4.36328C20.1226 4.10938 20.2241 3.80469 20.2241 3.44922C20.2241 2.89062 19.8179 2.38281 19.3101 2.23047L11.7437 0.300781C11.4897 0.25 11.2358 0.25 10.9819 0.300781L3.46631 2.23047C2.90771 2.38281 2.50146 2.89062 2.50146 3.44922C2.50146 3.80469 2.65381 4.10938 2.85693 4.36328L3.97412 5.48047ZM9.7124 3.39844L11.2358 2.73828C11.2358 2.73828 11.3374 2.6875 11.3882 2.6875L11.4897 2.73828L13.0132 3.39844C13.1655 3.44922 13.2671 3.55078 13.2671 3.70312C13.2671 5.73438 11.7944 6.75 11.3374 6.75C10.9819 6.75 9.4585 5.78516 9.4585 3.70312C9.4585 3.55078 9.56006 3.44922 9.7124 3.39844ZM4.93896 9.03516C4.88818 9.33984 4.88818 9.69531 4.88818 10C4.88818 13.6055 7.78271 16.5 11.3374 16.5C14.8413 16.5 17.7866 13.6055 17.7866 10C17.7866 9.69531 17.7358 9.33984 17.6851 9.03516C15.8062 9.69531 13.6226 10 11.3882 10C9.10303 10 6.91943 9.69531 4.93896 9.03516ZM16.2632 18.125H14.6382L11.3882 21.375L8.13818 18.125H6.51318C2.90771 18.125 0.0131836 21.0703 0.0131836 24.625C0.0131836 25.5391 0.724121 26.25 1.63818 26.25H21.1382C22.0015 26.25 22.7632 25.5391 22.7632 24.625C22.7632 21.0703 19.8179 18.125 16.2632 18.125ZM18.1929 22.4922L17.3804 23.2539L17.5835 24.3711C17.6343 24.5742 17.3804 24.7266 17.228 24.625L16.2632 24.1172L15.2476 24.625C15.0444 24.7266 14.8413 24.5742 14.8921 24.3711L15.0952 23.2539L14.2827 22.4922C14.1304 22.3398 14.2319 22.0859 14.4351 22.0859L15.5015 21.8828L16.0093 20.918C16.1108 20.7148 16.3647 20.7148 16.4663 20.918L16.9741 21.8828L18.0405 22.0859C18.2437 22.0859 18.3452 22.3398 18.1929 22.4922Z" />
							</svg>
						</div>
						<span>경찰서</span> <span>-</span>
					</div>

				</li>
				<li>
					<div class="iconbox">
						<div>
							<svg width="20" height="24" viewBox="0 0 33 24" xmlns="http://www.w3.org/2000/svg">
								<path d="M11.3843 7.78125C11.3843 7.67969 11.4351 7.57812 11.5366 7.47656C11.6382 7.42578 11.7397 7.375 11.8413 7.42578L12.6538 7.52734C12.7554 7.52734 12.8569 7.57812 12.9077 7.67969C12.9585 7.78125 13.0093 7.88281 13.0093 7.98438L11.7397 17.1758H25.1968L23.9272 7.01953C23.7241 5.39453 22.3022 4.17578 20.6772 4.17578H11.7905C10.1655 4.17578 8.79443 5.39453 8.59131 7.01953L7.32178 17.1758H10.1147L11.3843 7.78125ZM27.228 4.98828C27.4312 4.98828 27.6851 4.88672 27.8882 4.78516L30.3257 3.16016C30.6812 2.90625 30.8843 2.5 30.8843 2.04297C30.8335 1.58594 30.5796 1.23047 30.1733 1.02734C29.8179 0.824219 29.3101 0.875 28.9546 1.12891L26.5171 2.75391C26.0601 3.05859 25.9077 3.61719 26.0601 4.125C26.2124 4.63281 26.6694 4.98828 27.228 4.98828ZM4.57959 4.78516C4.93506 5.03906 5.44287 5.08984 5.84912 4.88672C6.20459 4.68359 6.50928 4.27734 6.50928 3.82031C6.56006 3.41406 6.30615 3.00781 5.95068 2.75391L3.51318 1.12891C3.15771 0.875 2.6499 0.824219 2.29443 1.02734C1.88818 1.23047 1.63428 1.58594 1.5835 2.04297C1.5835 2.5 1.78662 2.90625 2.14209 3.16016L4.57959 4.78516ZM5.69678 10.6758C5.69678 9.96484 5.13818 9.45703 4.47803 9.45703H1.22803C0.51709 9.45703 0.00927734 9.96484 0.00927734 10.6758C0.00927734 11.3359 0.51709 11.8945 1.22803 11.8945H4.47803C5.13818 11.8945 5.69678 11.3359 5.69678 10.6758ZM31.2905 9.45703H28.0405C27.3296 9.45703 26.8218 9.96484 26.8218 10.6758C26.8218 11.3359 27.3296 11.8945 28.0405 11.8945H31.2905C31.9507 11.8945 32.5093 11.3359 32.5093 10.6758C32.5093 9.96484 31.9507 9.45703 31.2905 9.45703ZM26.8218 18.8008H5.69678C5.23975 18.8008 4.88428 19.1562 4.88428 19.6133V22.8633C4.88428 23.2695 5.23975 23.625 5.69678 23.625H26.8218C27.228 23.625 27.6343 23.2695 27.6343 22.8633V19.6133C27.6343 19.1562 27.228 18.8008 26.8218 18.8008Z" />
							</svg>
						</div>
						<span>소방서</span> <span>-</span>
					</div>

				</li>
				<li>
					<div class="iconbox">
						<div>
							<svg width="18" height="24" viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg">
									<path d="M0.0117188 13.25C0.0117188 6.08984 5.80078 0.25 13.0117 0.25C20.1719 0.25 26.0117 6.08984 26.0117 13.25C26.0117 20.4609 20.1719 26.25 13.0117 26.25C5.80078 26.25 0.0117188 20.4609 0.0117188 13.25ZM11.8438 19.8008C12.1484 20.1055 12.5547 20.2578 13.0117 20.2578C13.418 20.2578 13.8242 20.1055 14.1289 19.8008L19.3086 14.5195C20.7812 13.0469 20.7812 10.5586 19.3086 9.03516C17.7852 7.5625 15.3984 7.5625 13.875 9.03516L13.0117 9.94922L12.0977 9.03516C10.5742 7.5625 8.1875 7.5625 6.66406 9.03516C5.19141 10.5586 5.19141 13.0469 6.66406 14.5195L11.8438 19.8008Z" />
							</svg>
						</div>
						<span>사회복지</span> <span>-</span>
					</div>

				</li>
				<li>
					<div class="iconbox">
						<div>
							<svg width="18" height="24" viewBox="0 0 30 24" xmlns="http://www.w3.org/2000/svg">
								<path d="M7.32227 0.925781C5.39258 0.875 3.20898 1.38281 0.923828 2.39844C0.365234 2.65234 0.00976562 3.21094 0.00976562 3.87109V22.0508C0.00976562 22.6094 0.568359 23.0156 1.12695 22.7617C7.52539 19.7656 12.2988 23.3203 12.502 23.4727C12.6543 23.5742 12.8066 23.625 13.0098 23.625C13.6191 23.625 13.8223 23.0664 13.8223 22.8633V3.36328C13.8223 3.05859 13.6699 2.80469 13.4668 2.65234C13.3652 2.60156 10.9785 0.976562 7.32227 0.925781ZM28.2949 2.39844C26.0098 1.38281 23.7754 0.875 21.8965 0.925781C18.2402 0.976562 15.9043 2.60156 15.752 2.65234C15.5488 2.80469 15.4473 3.05859 15.4473 3.36328V22.8125C15.4473 23.0664 15.5996 23.625 16.2598 23.625C16.4121 23.625 16.5645 23.5742 16.7168 23.4727C16.9199 23.3203 21.6934 19.7656 28.0918 22.7617C28.6504 23.0156 29.2598 22.6094 29.2598 22.0508V3.87109C29.209 3.21094 28.8535 2.65234 28.2949 2.39844Z" />
							</svg>
						</div>
						<span>도서관</span>  <span>-</span>
					</div>

				</li>
			</ul>
		</div>
		<div id="container">
			<!-- wkwk  -->
			<div class="wrapDipYear"><span class="dipYear1">ssssssss</span></div>
			<div class="mapContents" id="mapRgn_1" data-map-id="0"></div>
			<div class="contentsView1">
				<div class="mapContents2" id="mapRgn_2" data-map-id="1"></div>
				<div class="control-foot1 control-wrap1">
					<button type="button" class="pl1">
						<img src="/images/urban/btn-foot3.png" alt="확대">
					</button>
					<button type="button" class="mi1">
						<img src="/images/urban/btn-foot2.png" alt="축소">
					</button>
					<button type="button" class="mapType1" data-map-type="normal">백지도</button>
				</div>
			</div>
			<div class="contentsView2">
				<div class="wrapDipYear"><span class="dipYear2">ssssssss</span></div>
				<div class="mapContents3" id="mapRgn_3" data-map-id="2"></div>
				<div class="control-foot2 control-wrap2">
					<button type="button" class="pl2">
						<img src="/images/urban/btn-foot3.png" alt="확대">
					</button>
					<button type="button" class="mi2">
						<img src="/images/urban/btn-foot2.png" alt="축소">
					</button>
					<button type="button" class="mapType2" data-map-type="normal">백지도</button>
				</div>
			</div>
			<div class="contentsView3">
				<div class="wrapDipYear"><span class="dipYear3">ssssssss</span></div>
				<div class="mapContents4" id="mapRgn_4" data-map-id="3"></div>
				<div class="control-foot3 control-wrap3">
					<button type="button" class="pl3">
						<img src="/images/urban/btn-foot3.png" alt="확대">
					</button>
					<button type="button" class="mi3">
						<img src="/images/urban/btn-foot2.png" alt="축소">
					</button>
					<button type="button" class="mapType3" data-map-type="normal">백지도</button>
				</div>
			</div>
			<div class="contentsView4">
				<div class="wrapDipYear"><span class="dipYear4">ssssssss</span></div>
				<div class="mapContents5" id="mapRgn_5" data-map-id="4"></div>
				<div class="control-foot4 control-wrap4">
					<button type="button" class="pl4">
						<img src="/images/urban/btn-foot3.png" alt="확대">
					</button>
					<button type="button" class="mi4">
						<img src="/images/urban/btn-foot2.png" alt="축소">
					</button>
					<button type="button" class="mapType4" data-map-type="normal">백지도</button>
				</div>
			</div>


			<div class="noticeTextPopup" id="noticeTextPopup01">
				<a onclick="javascript:$urbanMain.ui.informationPopOpen();"> <img
					src="/img/new/use_notice_map.png" alt="더보기"></a>
			</div>
			<div class="control-top control-wrap">
				<div class="btn-extend">
					<button type="button" class="btn-extend-open">데이터보드</button>
					<button type="button" class="btn-extend-close">닫기</button>
				</div>
			</div>

			<div class="chk chk03">
				<div class="data-wrap comparison-wrap">
					<!-- s:비교권역선택 -->
					<div class="comparison-panel">
						<div class="comparison-item comparison-item01"data-idx-id="ppltn_density">
							<header class="comparison-header">
								<h3>
									인구밀도 <span>단위 : 명/km2</span>
								</h3>
							</header>
							<div class="comparison-body">
								<div class="flex-box">
									<div class="slider-conbox">
										<div class="slider-wrap">
											<div class="flex-box">
												<span class="full-left">1위</span>
												<div class="slider type-color01">
													<div class="bar"></div>
													<div class="dot dot01 btn-modal" data-modal="#densely"
														data-cur-rank-id="">
														<span>50위</span>
													</div>
													<!-- <div class="dot btn-modal" data-modal="#densely" data-cur-rank-id=""></div> -->
												</div>
												<span class="full-right">67위</span>
											</div>
										</div>
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<div class="line-01">
										<!-- <strong>50<span>위</span></strong> -->
										<p class="type-color01">
											전년도 대비<span>1.88% <b>▲</b></span>
										</p>
									</div>
									<dl class="color-item01">
										<dt class="mightOverflow">수도권1지역</dt>
										<dd>
											<div></div>
											<span>6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt class="">도시평균</dt>
										<dd>
											<div></div>
											<span>6,147,516</span>
										</dd>
									</dl>
								</div>
								<div class="graph-box">
									<div class="graph-in"></div>
								</div>
							</div>
						</div>
						<div class="comparison-item comparison-item01"
							data-idx-id="avg_age">
							<header class="comparison-header">
								<h3>
									평균나이 <span>단위 : 세(나이)</span>
								</h3>
							</header>
							<div class="comparison-body">
								<div class="flex-box">
									<div class="slider-conbox">
										<div class="slider-wrap">
											<div class="flex-box">
												<span class="full-left">1위</span>
												<div class="slider type-color01">
													<div class="bar"></div>
													<div class="dot dot01 btn-modal" data-modal="#densely"
														data-cur-rank-id="">
														<span>50위</span>
													</div>
													<!-- <div class="dot btn-modal" data-modal="#densely" data-cur-rank-id=""></div> -->
												</div>
												<span class="full-right">67위</span>
											</div>
										</div>
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<div class="line-01">
										<!-- <strong>50<span>위</span></strong> -->
										<p class="type-color01">
											전년도 대비<span>1.88% <b>▲</b></span>
										</p>
									</div>
									<dl class="color-item01">
										<dt class="mightOverflow">수도권1지역</dt>
										<dd>
											<div></div>
											<span>6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt class="">도시평균</dt>
										<dd>
											<div></div>
											<span>6,147,516</span>
										</dd>
									</dl>
								</div>
								<div class="graph-box">
									<div class="graph-in"></div>
								</div>
							</div>
						</div>
						<div class="comparison-item comparison-item01"
							data-idx-id="old_child_ratio">
							<header class="comparison-header">
								<h3>
									노령화지수 <span>단위 : 명/100명당</span>
								</h3>
							</header>
							<div class="comparison-body">
								<div class="flex-box">
									<div class="slider-conbox">
										<div class="slider-wrap">
											<div class="flex-box">
												<span class="full-left">1위</span>
												<div class="slider type-color01">
													<div class="bar"></div>
													<div class="dot dot01 btn-modal" data-modal="#densely"data-cur-rank-id="">
														<span>50위</span>
													</div>
													<!-- <div class="dot btn-modal" data-modal="#densely" data-cur-rank-id=""></div> -->
												</div>
												<span class="full-right">67위</span>
											</div>
										</div>
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<div class="line-01">
										<!-- <strong>50<span>위</span></strong> -->
										<p class="type-color01">
											전년도 대비<span>1.88% <b>▲</b></span>
										</p>
									</div>
									<dl class="color-item01">
										<dt class="mightOverflow">수도권1지역</dt>
										<dd>
											<div></div>
											<span>6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt class="">도시평균</dt>
										<dd>
											<div></div>
											<span>6,147,516</span>
										</dd>
									</dl>
								</div>
								<div class="graph-box">
									<div class="graph-in"></div>
								</div>
							</div>
						</div>
						<div class="comparison-item comparison-item01"data-idx-id="psn_1_family_per">
							<header class="comparison-header">
								<h3>
									1인 가구 비율 <span>단위 : %</span>
								</h3>
							</header>
							<div class="comparison-body">
								<div class="flex-box">
									<div class="slider-conbox">
										<div class="slider-wrap">
											<div class="flex-box">
												<span class="full-left">1위</span>
												<div class="slider type-color01">
													<div class="bar"></div>
													<div class="dot dot01 btn-modal" data-modal="#densely"
														data-cur-rank-id="">
														<span>50위</span>
													</div>
													<!-- <div class="dot btn-modal" data-modal="#densely" data-cur-rank-id=""></div> -->
												</div>
												<span class="full-right">67위</span>
											</div>
										</div>
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<div class="line-01">
										<!-- <strong>50<span>위</span></strong> -->
										<p class="type-color01">
											전년도 대비<span>1.88% <b>▲</b></span>
										</p>
									</div>
									<dl class="color-item01">
										<dt class="mightOverflow">수도권1지역</dt>
										<dd>
											<div></div>
											<span>6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt class="">도시평균</dt>
										<dd>
											<div></div>
											<span>6,147,516</span>
										</dd>
									</dl>
								</div>
								<div class="graph-box">
									<div class="graph-in"></div>
								</div>
							</div>
						</div>
						<div class="comparison-item comparison-item01"
							data-idx-id="apt_per">
							<header class="comparison-header">
								<h3>
									아파트 비율 <span>단위 : %</span>
								</h3>
							</header>
							<div class="comparison-body">
								<div class="flex-box">
									<div class="slider-conbox">
										<div class="slider-wrap">
											<div class="flex-box">
												<span class="full-left">1위</span>
												<div class="slider type-color01">
													<div class="bar"></div>
													<div class="dot dot01 btn-modal" data-modal="#densely"
														data-cur-rank-id="">
														<span>50위</span>
													</div>
													<!-- <div class="dot btn-modal" data-modal="#densely" data-cur-rank-id=""></div> -->
												</div>
												<span class="full-right">67위</span>
											</div>
										</div>
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<div class="line-01">
										<!-- <strong>50<span>위</span></strong> -->
										<p class="type-color01">
											전년도 대비<span>1.88% <b>▲</b></span>
										</p>
									</div>
									<dl class="color-item01">
										<dt class="mightOverflow">수도권1지역</dt>
										<dd>
											<div></div>
											<span>6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt class="">도시평균</dt>
										<dd>
											<div></div>
											<span>6,147,516</span>
										</dd>
									</dl>
								</div>
								<div class="graph-box">
									<div class="graph-in"></div>
								</div>
							</div>
						</div>
					</div>
					<!-- e:비교권역선택 -->
				</div>
			</div>
			<div class="chk chk05">
				<div class="data-wrap comparison-wrap">
					<!-- s:비교권역선택 -->
					<div class="comparison-panel slick-box2">
						<div class="comparison-item comparison-item03"
							data-idx-id="ppltn_density">
							<header class="comparison-header">
								<h3>
									인구밀도 <span>단위 : 명/km2</span>
								</h3>
							</header>
							<div class="comparison-body">
								<div class="flex_wrap">
									<div class="left">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box">
													<span class="full-left">1위</span>
													<div class="slider type-color01">
														<div class="bar"></div>
														<div class="dot dot01">
															<span>50위</span>
														</div>
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
									</div>
									<div class="right">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box">
													<span class="full-left">1위</span>
													<div class="slider type-color04">
														<div class="bar"></div>
														<div class="dot dot02">
															<span>50위</span>
														</div>
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<dl class="color-item01">
										<dt class="mightOverflow">수도권1지역</dt>
										<dd>
											<div class="per-240"></div>
											<span>6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item03">
										<dt class="mightOverflow">수도권1지역</dt>
										<dd>
											<div class="per-240"></div>
											<span>6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt>경북1지역</dt>
										<dd>
											<div class="per-120"></div>
											<span>6,147,516</span>
										</dd>
									</dl>
								</div>
								<div class="graph-box">
									<div class="graph-in"></div>
								</div>
							</div>
						</div>
						<div class="comparison-item comparison-item03"
							data-idx-id="avg_age">
							<header class="comparison-header">
								<h3>
									평균나이 <span>단위 : 세(나이)</span>
								</h3>
							</header>
							<div class="comparison-body">
								<div class="flex_wrap">
									<div class="left">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box">
													<span class="full-left">1위</span>
													<div class="slider type-color01">
														<div class="bar"></div>
														<div class="dot dot01">
															<span>50위</span>
														</div>
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
									</div>
									<div class="right">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box">
													<span class="full-left">1위</span>
													<div class="slider type-color04">
														<div class="bar"></div>
														<div class="dot dot02">
															<span>50위</span>
														</div>
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<dl class="color-item01">
										<dt class="mightOverflow">수도권1지역</dt>
										<dd>
											<div class="per-240"></div>
											<span>6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item03">
										<dt class="mightOverflow">수도권1지역</dt>
										<dd>
											<div class="per-240"></div>
											<span>6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt>경북1지역</dt>
										<dd>
											<div class="per-120"></div>
											<span>6,147,516</span>
										</dd>
									</dl>
								</div>
								<div class="graph-box">
									<div class="graph-in"></div>
								</div>
							</div>
						</div>
						<div class="comparison-item comparison-item03"
							data-idx-id="old_child_ratio">
							<header class="comparison-header">
								<h3>
									노령화지수 <span>단위 : 명/100명당</span>
								</h3>
							</header>
							<div class="comparison-body">
								<div class="flex_wrap">
									<div class="left">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box">
													<span class="full-left">1위</span>
													<div class="slider type-color01">
														<div class="bar"></div>
														<div class="dot dot01">
															<span>50위</span>
														</div>
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
									</div>
									<div class="right">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box">
													<span class="full-left">1위</span>
													<div class="slider type-color04">
														<div class="bar"></div>
														<div class="dot dot02">
															<span>50위</span>
														</div>
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<dl class="color-item01">
										<dt class="mightOverflow">수도권1지역</dt>
										<dd>
											<div class="per-240"></div>
											<span>6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item03">
										<dt class="mightOverflow">수도권1지역</dt>
										<dd>
											<div class="per-240"></div>
											<span>6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt>경북1지역</dt>
										<dd>
											<div class="per-120"></div>
											<span>6,147,516</span>
										</dd>
									</dl>
								</div>
								<div class="graph-box">
									<div class="graph-in"></div>
								</div>
							</div>
						</div>
						<div class="comparison-item comparison-item03"
							data-idx-id="psn_1_family_per">
							<header class="comparison-header">
								<h3>
									1인 가구 비율 <span>단위 : %</span>
								</h3>
							</header>
							<div class="comparison-body">
								<div class="flex_wrap">
									<div class="left">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box">
													<span class="full-left">1위</span>
													<div class="slider type-color01">
														<div class="bar"></div>
														<div class="dot dot01">
															<span>50위</span>
														</div>
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
									</div>
									<div class="right">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box">
													<span class="full-left">1위</span>
													<div class="slider type-color04">
														<div class="bar"></div>
														<div class="dot dot02">
															<span>50위</span>
														</div>
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<dl class="color-item01">
										<dt class="mightOverflow">수도권1지역</dt>
										<dd>
											<div class="per-240"></div>
											<span>6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item03">
										<dt class="mightOverflow">수도권1지역</dt>
										<dd>
											<div class="per-240"></div>
											<span>6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt>경북1지역</dt>
										<dd>
											<div class="per-120"></div>
											<span>6,147,516</span>
										</dd>
									</dl>
								</div>
								<div class="graph-box">
									<div class="graph-in"></div>
								</div>
							</div>
						</div>
						<div class="comparison-item comparison-item03"
							data-idx-id="apt_per">
							<header class="comparison-header">
								<h3>
									아파트 비율 <span>단위 : %</span>
								</h3>
							</header>
							<div class="comparison-body">
								<div class="flex_wrap">
									<div class="left">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box">
													<span class="full-left">1위</span>
													<div class="slider type-color01">
														<div class="bar"></div>
														<div class="dot dot01">
															<span>50위</span>
														</div>
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
									</div>
									<div class="right">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box">
													<span class="full-left">1위</span>
													<div class="slider type-color04">
														<div class="bar"></div>
														<div class="dot dot02">
															<span>50위</span>
														</div>
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<dl class="color-item01">
										<dt class="mightOverflow">수도권1지역</dt>
										<dd>
											<div class="per-240"></div>
											<span>6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item03">
										<dt class="mightOverflow">수도권1지역</dt>
										<dd>
											<div class="per-240"></div>
											<span>6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt>경북1지역</dt>
										<dd>
											<div class="per-120"></div>
											<span>6,147,516</span>
										</dd>
									</dl>
								</div>
								<div class="graph-box">
									<div class="graph-in"></div>
								</div>
							</div>
						</div>
					</div>
					<!-- e:비교권역선택 -->
				</div>
			</div>
		</div>
		<!-- 데이터 저장소 -->
		<span class="sViewBtn">
			접기
			<svg width="14" height="8"viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
		      <path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z" fill="#222222" />
		    </svg>
		</span>

		<div class="extend-data">
			<div class="extend-panel">
				<div class="extend-search">
					<div class="data-value value_col01" id="db01_head_year">2020년</div>
					<div class="data-value value_col02" id="db01_head_cls">UN
						도시분류 : 도시</div>
					<div class="data-value value_col03">
						<div class="_yel mightOverflow" id="db01_head_urbars_nm">수도권
							1 지역</div>
					</div>
					<div class="data-value-right">
						<!-- <button id="comp_btn" class="data-value value_col02 btn-modal">행정구역</button> -->
						<span style="display: none"> <select
							id="db01_head_subRegion" data-sel-menu="">
								<option value="">행정구역</option>
						</select>
						</span>
						<span>
						<button class="totDashBtn">종합통계보기</button>
						</span>
						<span>
						<button class="orange-btn1" id="db01_head_urbars_nm1">선택된도시명</button>
						</span>
						<span>
						<button class="comp-btn1" id="comp_urbars_nm">선택된도시명</button>
						</span>
						<span>
						<button class="green-btn2" id="db01_head_urbars_nm2">행정구역 내 도시화지역</button>
						</span>
						<span class="mg-r0">
						<button class="gray-btn2">행정구역이름</button>
						</span>
						<span class="mg-r0">
						<button class="district-btn btn-modal">행정구역선택</button>
						</span>
						<span>
						<button class="comparison-btn btn-modal" data-modal="#comparison">비교권역 선택</button>
						</span>
					</div>
				</div>
			</div>
			<div class="tab_container">
				<!--탭 메뉴 영역 -->
				<div class="tabs">
					<ul>
						<li class="active"><a href="#" rel="tab1">면적</a></li>
						<li class=""><a href="#" rel="tab2">인구</a></li>
						<li class=""><a href="#" rel="tab3">가구</a></li>
						<li class=""><a href="#" rel="tab4">주택</a></li>
						<li class=""><a href="#" rel="tab5">사업체</a></li>
						<li class=""><a href="#" rel="tab6">종사자</a></li>
						<li class=""><a href="#" rel="tab7">신규건축물비율</a></li>
						<li class=""><a href="#" rel="tab8">노후건축물비율</a></li>
						<li class=""><a href="#" rel="tab9">녹지비율</a></li>
					</ul>
				</div>
				<div id="tab1" class="tab_content">
					<div id="chart1" class="chartBox"></div>
				</div>
				<div id="tab2" class="tab_content">
					<div id="chart2" class="chartBox"></div>
				</div>
				<div id="tab3" class="tab_content">
					<div id="chart3" class="chartBox"></div>
				</div>
				<div id="tab4" class="tab_content">
					<div id="chart4" class="chartBox"></div>
				</div>
				<div id="tab5" class="tab_content">
					<div id="chart5" class="chartBox"></div>
				</div>
				<div id="tab6" class="tab_content">
					<div id="chart6" class="chartBox"></div>
				</div>
				<div id="tab7" class="tab_content">
					<div id="chart7" class="chartBox"></div>
				</div>
				<div id="tab8" class="tab_content">
					<div id="chart8" class="chartBox"></div>
				</div>
				<div id="tab9" class="tab_content">
					<div id="chart9" class="chartBox"></div>
				</div>
			</div>


		</div>
		<!-- // extend-data -->
		<div class="control-foot control-wrap">
			<button type="button" class="pl">
				<img src="/images/urban/btn-foot3.png" alt="확대">
			</button>
			<button type="button" class="mi">
				<img src="/images/urban/btn-foot2.png" alt="축소">
			</button>
			<button type="button" class="mapType" data-map-type="normal">백지도</button>
		</div>
		<!-- s:지표순위 검색 popup -->
		<!--
	            <div class="cst-popup">
	                <div class="pop-title">
	                    <h3>지표순위 검색</h3>
	                    <a href="#" class="menu-close"></a>
	                </div>
	                <div class="pop-contents">
	                    <div class="tab-wrap">
	                        <ul class="tab-menu n6">
	                            <li><a href="#">인구밀도</a></li>
	                            <li><a href="#">평균나이</a></li>
	                            <li><a href="#">노령화지수</a></li>
	                            <li><a href="#">1인가구비율</a></li>
	                            <li><a href="#">아파트비율</a></li>
	                            <li><a href="#">노후건축물비율</a></li>
	                        </ul>
	                    </div>
	                    <div class="tab-con">
	                        <p>· 67개 도시권역 중</p>
	                        <div class="graph-conbox">
	                            <strong>순위</strong>
	                            <div class="graph-wrap">
	                                <div class="graph">
	                                    <div class="bar"></div>
	                                    <div class="dot">
	                                        <span>50위</span>
	                                    </div>
	                                </div>
	                                <div class="graph-legend">
	                                    <span class="full-left">1위</span>
	                                    <span class="full-right">67위</span>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="tab-con">
	                        <p>· [평균나이] 67개 도시권역 중</p>
	                    </div>
	                    <div class="tab-con">
	                        <p>· [노령화지수] 67개 도시권역 중</p>
	                    </div>
	                    <div class="tab-con">
	                        <p>· [1인가구비율] 67개 도시권역 중</p>
	                    </div>
	                    <div class="tab-con">
	                        <p>· [아파트비율] 67개 도시권역 중</p>
	                    </div>
	                    <div class="tab-con">
	                        <p>· [노후건축물비율] 67개 도시권역 중</p>
	                    </div>
	                </div>
	            </div>
	            -->
		<!-- // e:지표순위 검색 popup -->
		<!-- s:도시 변화 popup -->


		
		<div class="cst-pop time-graph-pop">
			<!-- 1280대응 위치변경 20221219 배천규  -->
			<div class="multy-view-box">
				<button type="button" class="multyView">
					<img src="/images/urban/icon-multyView.png" alt="멀티뷰"> 멀티뷰
				</button>
			</div>
			<!-- 1280대응 위치변경 20221219 배천규  -->
			<div class="time-graph-conbox">
				<div class="check-timeLine" style="display: none;">
						<span id="yearReset">
						<img alt="초기화" src="/images/urban/icon_restart.png"> 초기화</span>
						<label for="2000" class="chk_box">
						<input type="checkbox" id="2000" name="yearChk" value="2000" />
						<span class="on">2000</span>
					</label> <label for="2005" class="chk_box"> <input type="checkbox"
						id="2005" name="yearChk" value="2005" /> <span class="on">2005</span>

					</label> <label for="2010" class="chk_box"> <input type="checkbox"
						id="2010" name="yearChk" value="2010" /> <span class="on">2010</span>

					</label> <label for="2015" class="chk_box"> <input type="checkbox"
						id="2015" name="yearChk" value="2015" /> <span class="on">2015</span>

					</label> <label for="2016" class="chk_box"> <input type="checkbox"
						id="2016" name="yearChk" value="2016" /> <span class="on">2016</span>

					</label> <label for="2017" class="chk_box"> <input type="checkbox"
						id="2017" name="yearChk" value="2017" /> <span class="on">2017</span>

					</label> <label for="2018" class="chk_box"> <input type="checkbox"
						id="2018" name="yearChk" value="2018" /> <span class="on">2018</span>

					</label> <label for="2019" class="chk_box"> <input type="checkbox"
						id="2019" name="yearChk" value="2019" /> <span class="on">2019</span>

					</label> <label for="2020" class="chk_box"> <input type="checkbox"
						id="2020" name="yearChk" value="2020" /> <span class="on">2020</span>
					</label>
					<label for="2021" class="chk_box"> <input type="checkbox"
						id="2021" name="yearChk" value="2021" /> <span class="on">2021</span>
					</label>
					<span id="yearPlay"><img alt="멀티뷰"src="/images/urban/icon_02.png">멀티뷰 확인</span>
				</div>
				<div class="time-graphLine">
					<button type="button" class="control"></button>
					<div class="time-graph-wrap">
						<!--
		                    	<input id="history_slder" type="text" data-slider-tooltip="hide" />
		                    	-->
						<div class="time-graph">
							<div class="bar"></div>
							<ul>
								
		                                <li></li>
		                                <li></li>
		                                <li></li>
		                                <li></li>
		                                <li></li>
		                                <li></li>
		                                <li></li>
		                                <li></li>
		                            
							</ul>
						</div>
						<!--
		                        <div class="time-graph-legend">
		                            <ul>
		                                <li>2000</li>
		                                <li>2005</li>
		                                <li>2010</li>
		                                <li>2015</li>
		                                <li>2016</li>
		                                <li>2017</li>
		                                <li>2018</li>
		                                <li>2019</li>
		                                <li>2020</li>
		                            </ul>
		                        </div>
		                        -->
					</div>
					<button id="reverseBtn" type="button" class="reverse"></button>
				</div>
				<!-- <a href="javascript:void(0)" id="reverseBtn" class="timeReverseBtn"></a> -->
				<a href="#" class="btn-down"></a>
			</div>
		</div>
		<!-- // e:도시 변화 popup -->
	</div>
	<!-- SGIS4_도시화 sns_공유 시작 -->
	<div id="commonSharepopup" class="commonUrbanPopupWrap">
		<div class="commonUrbanPopTit" style="background-color: #363A46;">
			<h1>SNS 공유</h1>
			<button type="button"
				class="commonUrbanPopcloseBtn commonurban_Sns_close"
				id="commonUrban_Sns_close" title="팝업 닫기"></button>
		</div>
		<div class="commonUrbanPopCon">
			<div class="shareWrap">
				<div class="shareRow mt10">
					<h4 style="margin-right: 10px; color: #fff;">URL내용 :</h4>
					<input id="shareUrl" type="text" placeholder="http://"
						readonly="readonly" />
				</div>
				<div class="shareRow mt20">
					<button type="button" class="kakao" title="카카오 스토리 공유하기">카카오
						스토리</button>
					<button type="button" class="twitter" title="트위터 공유하기">트위터</button>
					<button type="button" class="face" title="페이스북 공유하기">페이스북</button>
					<button type="button" class="band" title="밴드 공유하기">네이버 밴드</button>
				</div>
				<div class="shareRowBtn mt20">
					<button type="button" class="urlcopy">URL 복사하기</button>
					<button type="button" class="txtClose commonurban_Sns_close">닫기</button>
				</div>
			</div>
		</div>
	</div>
	<!-- SGIS4_도시화 sns_공유 끝 -->
	<!-- // container -->
	</div>
	<!-- // wrap -->
	<div class="modal-bg"></div>
	<!-- modal -->
	<div class="modal" id="district">
		<div class="modal-container">
			<div class="modal-header">
				<h2>행정구역 선택</h2>
				<button type="button" class="close" title="팝업닫힘">
					<span class="sr_only">닫기</span>
				</button>
			</div>
			<div class="modal-body">
				<div class="modal-content">
					<div class="green-box"></div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn_1">선택</button>
					<button type="button" class="btn btn_2 close" title="팝업닫힘">취소</button>
				</div>
			</div>

		</div>
	</div>


	<div class="modal" id="densely">
		<div class="modal-container">
			<div class="modal-header">
				<h2>
					인구밀도 <em>순위선택</em>
				</h2>
				<button type="button" class="close" title="팝업닫힘">
					<span class="sr_only">닫기</span>
				</button>
			</div>
			<div class="modal-body">
				<div class="modal-content">
					<div class="green-box">
						<ol class="rank-list">
							<li><a href="#"><span>1위</span> 목포시_용당1동_용당2동 등</a></li>
							<li><a href="#"><span>2위</span> 목포시_용당1동_용당2동 등</a></li>
							<li><a href="#"><span>3위</span> 목포시_용당1동_용당2동 등</a></li>
							<li><a href="#"><span>4위</span> 목포시_용당1동_용당2동 등</a></li>
							<li><a href="#"><span>5위</span> 목포시_용당1동_용당2동 등</a></li>
							<li><a href="#"><span>6위</span> 목포시_용당1동_용당2동 등</a></li>
							<li><a href="#"><span>7위</span> 목포시_용당1동_용당2동 등</a></li>
							<li><a href="#"><span>8위</span> 목포시_용당1동_용당2동 등</a></li>
						</ol>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn_1">선택</button>
					<button type="button" class="btn btn_2 close" title="팝업닫힘">취소</button>
				</div>
			</div>

		</div>
	</div>
	<!-- //modal -->
	<div class="modal" id="comparison">
		<div class="modal-container">
			<div class="modal-header">
				<h2>비교권역 선택</h2>
				<button type="button" class="close" title="팝업닫힘">
					<span class="sr_only">닫기</span>
				</button>
			</div>
			<div class="modal-body">
				<div class="modal-content">
					<div class="select-green">
						<select id="sidoSelect_comparison_1">
						</select> <select id="sggSelect_comparison_1">
						</select>
						<!--
	                        <button type="button" class="active">세종특별자치시</button>
	                        <button type="button">창원시 마산합포구</button>
	                         -->
					</div>
					<div class="green-box">
						<ol class="rank-list v2">
							<!--
	                            <li><a href="#">목포시_용당1동_용당2동 등</a></li>
	                            <li><a href="#">목포시_용당1동_용당2동 등</a></li>
	                            <li><a href="#">목포시_용당1동_용당2동 등</a></li>
	                            <li><a href="#">목포시_용당1동_용당2동 등</a></li>
	                            <li><a href="#">목포시_용당1동_용당2동 등</a></li>
	                            <li><a href="#">목포시_용당1동_용당2동 등</a></li>
	                            <li><a href="#">목포시_용당1동_용당2동 등</a></li>
	                            <li><a href="#">목포시_용당1동_용당2동 등</a></li>
	                             -->
						</ol>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn_1">선택</button>
					<button type="button" class="btn btn_2 close" title="팝업닫힘">취소</button>
				</div>
			</div>
		</div>
	</div>
	<!-- //modal -->

	<div class="totIndexes_layer" id="layer_indexes">
		<div class="layer_box totPopup">
			<div class="heading">
				<h2>종합통계보기</h2>
				<button id="btn_close" class="layer_close" type="button" name="button"></button>
			</div>
			<div class="heading2">
				<div class="content_panel">
					<span class="year">2020년</span>
					<span class="tit">고양시 일산동구(정발산동, 마두1동 등)</span>
				</div>		
				<button type="button" name="button" class="totDownload" id="indexesBtn">
					<span>종합통계 다운로드</span>
				</button>
			</div>
			<div class="indexesContent content" id="totIndexesContent">
			<div class="idx_content data_content">
				<ul class="item_box item_01">
					<li class="indexes0">
						<h4>인구밀도 <span>단위 : 명/km2</span></h4>
							<div class="comparison-body newflex">
								<div class="flex-box">
									<div class="slider-conbox">
										<div class="slider-wrap">
											<div class="flex-box">
												<span class="full-left">1위</span>
												<div class="slider type-color01">
													<div class="bar"></div>
													<div class="dot">
														<span>50위</span>
													</div>
													
												</div>
												<span class="full-right">67위</span>
											</div>
										</div>
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<dl class="color-item01">
										<dt class="mightOverflow" id="totPop">수도권1지역</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="totAvg">6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt class="">도시평균</dt>
										<dd>
											<div></div>
											<span class="dosiAvg">6,147,516</span>
										</dd>
									</dl>
								</div>
							</div>
							<div class="graph-box" id="totIndexesChart1"style="width: 613px; height: 230px;"></div>
						</li>
						<li class="indexes1">
							<h4>평균나이  <span>단위 : 세(나이)</span></h4>
							<div class="comparison-body newflex">
								<div class="flex-box">
									<div class="slider-conbox">
										<div class="slider-wrap">
											<div class="flex-box">
												<span class="full-left">1위</span>
												<div class="slider type-color01">
													<div class="bar"></div>
													<div class="dot">
														<span>50위</span>
													</div>
												</div>
												<span class="full-right">67위</span>
											</div>
										</div>
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<dl class="color-item01">
										<dt class="mightOverflow" id="totPop">수도권1지역</dt>
										<dd>
											<div class=" totPopCol"></div>
											<span class="totAvg">6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item02">
											<dt class="">도시평균</dt>
											<dd>
												<div></div>
												<span class="dosiAvg">6,147,516</span>
											</dd>
										</dl>
									</div>
									<!-- 	<div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
								</div>
								<div class="graph-box"id="totIndexesChart2" style="width:613px; height:230px; "></div>
						</li>
						<li class="indexes2">
							<h4>노령화지수  <span>단위 : 명/100명당</span></h4>
							<div class="comparison-body newflex">
								<div class="flex-box">
									<div class="slider-conbox">
										<div class="slider-wrap">
											<div class="flex-box">
												<span class="full-left">1위</span>
												<div class="slider type-color01">
													<div class="bar"></div>
													<div class="dot">
														<span>50위</span>
													</div>
												</div>
												<span class="full-right">67위</span>
											</div>
										</div>
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<dl class="color-item01">
										<dt class="mightOverflow" id="totPop">수도권1지역</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="totAvg">6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt class="">도시평균</dt>
										<dd>
											<div></div>
											<span class="dosiAvg">6,147,516</span>
										</dd>
									</dl>
								</div>
								<!-- <div class="graph-box">
									<div class="graph-in"></div>
								</div> -->
							</div>
							<div class="graph-box" id="totIndexesChart3" style="width:613px; height:230px;"></div>
						</li>
						<li class="indexes3">
							<h4>1인 가구 비율  <span>단위 : %</span></h4>
							<div class="comparison-body newflex">
								<div class="flex-box">
									<div class="slider-conbox">
										<div class="slider-wrap">
											<div class="flex-box">
												<span class="full-left">1위</span>
												<div class="slider type-color01">
													<div class="bar"></div>
													<div class="dot">
														<span>50위</span>
													</div>
												</div>
												<span class="full-right">67위</span>
											</div>
										</div>
									</div>

									<!-- <div class="graph-box">
										<div class="graph-in"></div>
									</div> -->
								</div>
								<div class="chart-conbox type-color01">
									<dl class="color-item01">
										<dt class="mightOverflow" id="totPop">수도권1지역</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="totAvg">6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt class="">도시평균</dt>
										<dd>
											<div></div>
											<span class="dosiAvg">6,147,516</span>
										</dd>
									</dl>
								</div>
								<!-- 	<div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
							</div>					
							<div class="graph-box" id="totIndexesChart4"  style="width:613px; height:230px;"></div>
						</li>
						<li class="indexes4">
							<h4>아파트 비율  <span>단위 : %</span></h4>
							<div class="comparison-body newflex">
								<div class="flex-box">
									<div class="slider-conbox">
										<div class="slider-wrap">
											<div class="flex-box">
												<span class="full-left">1위</span>
												<div class="slider type-color01">
													<div class="bar"></div>
													<div class="dot">
														<span>50위</span>
													</div>
												</div>
												<span class="full-right">67위</span>
											</div>
										</div>
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<dl class="color-item01">
										<dt class="mightOverflow" id="totPop">수도권1지역</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="totAvg">6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt class="">도시평균</dt>
										<dd>
											<div></div>
											<span class="dosiAvg">6,147,516</span>
										</dd>
									</dl>
								</div>
								<!-- 		<div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
							</div>
							<div class="graph-box" id="totIndexesChart5"  style="width:613px;height:230px;"></div>
						</li>
						<li class="indexes5">
							<h4>신규건축물비율  <span>단위 : %</span></h4>
							<div class="comparison-body newflex">
								<div class="flex-box">
									<div class="slider-conbox">
										<div class="slider-wrap">
											<div class="flex-box">
												<span class="full-left">1위</span>
												<div class="slider type-color01">
													<div class="bar"></div>
													<div class="dot">
														<span>50위</span>
													</div>
												</div>
												<span class="full-right">67위</span>
											</div>
										</div>
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<dl class="color-item01">
										<dt class="mightOverflow" id="totPop">수도권1지역</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="totAvg">6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt class="">도시평균</dt>
										<dd>
											<div></div>
											<span class="dosiAvg">6,147,516</span>
										</dd>
									</dl>
								</div>
								<!-- <div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
							</div>
							<div class="graph-box" id="totIndexesChart6"  style="width:613px; height:230px;"></div>
						</li>
						<li class="indexes6">
							<h4>노후건축물비율  <span>단위 : %</span></h4>
							<div class="comparison-body newflex">
								<div class="flex-box">
									<div class="slider-conbox">
										<div class="slider-wrap">
											<div class="flex-box">
												<span class="full-left">1위</span>
												<div class="slider type-color01">
													<div class="bar"></div>
													<div class="dot">
														<span>50위</span>
													</div>
												</div>
												<span class="full-right">67위</span>
											</div>
										</div>
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<dl class="color-item01">
										<dt class="mightOverflow" id="totPop">수도권1지역</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="totAvg">6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt class="">도시평균</dt>
										<dd>
											<div></div>
											<span class="dosiAvg">6,147,516</span>
										</dd>
									</dl>
								</div>
								<!-- 			<div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
							</div>
							<div class="graph-box" id="totIndexesChart7"  style="width:613px; height:230px;"></div>
						</li>
						<li class="indexes7">
							<h4>녹지 비율  <span>단위 : %</span></h4>
							<div class="comparison-body newflex">
								<div class="flex-box">
									<div class="slider-conbox">
										<div class="slider-wrap">
											<div class="flex-box">
												<span class="full-left">1위</span>
												<div class="slider type-color01">
													<div class="bar"></div>
													<div class="dot">
														<span>50위</span>
													</div>
												</div>
												<span class="full-right">67위</span>
											</div>
										</div>
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<dl class="color-item01">
										<dt class="mightOverflow" id="totPop">수도권1지역</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="totAvg">6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt class="">도시평균</dt>
										<dd>
											<div></div>
											<span class="dosiAvg">6,147,516</span>
										</dd>
									</dl>
									
								</div>
								<!-- 		<div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
							</div>
							<div class="graph-box" id="totIndexesChart8"  style="width:613px; height:230px;"></div>
						</li>
					</ul>
					<ul class="item_box item_02">
						<li class="indexes0">
							<h4>
								인구밀도 <span>단위 : 명/km2</span>
							</h4>
							<div class="comparison-body newflex">
								<div>
									<div class="flex-box">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box">
													<span class="full-left">1위</span>
													<div class="slider type-color01">
														<div class="bar"></div>
														<div class="dot">
															<span>50위</span>
														</div>
														<!-- <div class="dot btn-modal" data-modal="#densely" data-cur-rank-id=""></div> -->
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
	
										<!-- <div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
									</div>
									<div class="flex-box box-type2">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box">
													<span class="full-left">1위</span>
													<div class="slider type-color04">
														<div class="bar"></div>
														<div class="dot">
															<span>50위</span>
														</div>
														<!-- <div class="dot btn-modal" data-modal="#densely" data-cur-rank-id=""></div> -->
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
	
										<!-- <div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<dl class="color-item01">
										<dt class="mightOverflow" id="totPop">수도권1지역</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="totPopAvg">6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item03">
										<dt class="mightOverflow">광주 중심구 일대</dt>
										<dd>
											<div class="per-240 totPopCol"></div>
											<span>8,707</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt class="">도시평균</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="dosiAvg">6,147,516</span>
										</dd>
									</dl>
								</div>
							</div>
							<div class="graph-box" id="totCompIndexesChart1"
								style="width: 613px; height: 270px;"></div>
						</li>
						<li class="indexes1">
							<h4>
								평균나이 <span>단위 : 세(나이)</span>
							</h4>
							<div class="comparison-body newflex">
								<div>
									<div class="flex-box">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box">
													<span class="full-left">1위</span>
													<div class="slider type-color01">
														<div class="bar"></div>
														<div class="dot">
															<span>50위</span>
														</div>
														<!-- <div class="dot btn-modal" data-modal="#densely" data-cur-rank-id=""></div> -->
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
									</div>
									<div class="flex-box box-type2">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box">
													<span class="full-left">1위</span>
													<div class="slider type-color04">
														<div class="bar"></div>
														<div class="dot">
															<span>50위</span>
														</div>
														<!-- <div class="dot btn-modal" data-modal="#densely" data-cur-rank-id=""></div> -->
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
	
										<!-- <div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<dl class="color-item01">
										<dt class="mightOverflow" id="totPop">수도권1지역</dt>
										<dd>
											<div class=" totPopCol"></div>
											<span class="totPopAvg">6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item03">
										<dt class="mightOverflow">광주 중심구 일대</dt>
										<dd>
											<div class="per-240 totPopCol"></div>
											<span>8,707</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt class="">도시평균</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="dosiAvg">6,147,516</span>
										</dd>
									</dl>
								</div>
								<!-- 	<div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
							</div>
							<div class="graph-box" id="totCompIndexesChart2"
								style="width: 613px; height: 270px;"></div>
						</li>
						<li class="indexes2">
							<h4>
								노령화지수 <span>단위 : 명/100명당</span>
							</h4>
							<div class="comparison-body newflex">
								<div>
									<div class="flex-box">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box box-type1">
													<span class="full-left">1위</span>
													<div class="slider type-color01">
														<div class="bar"></div>
														<div class="dot">
															<span>50위</span>
														</div>
														<!-- <div class="dot btn-modal" data-modal="#densely" data-cur-rank-id=""></div> -->
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
									</div>
									<div class="flex-box box-type2">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box">
													<span class="full-left">1위</span>
													<div class="slider type-color04">
														<div class="bar"></div>
														<div class="dot">
															<span>50위</span>
														</div>
														<!-- <div class="dot btn-modal" data-modal="#densely" data-cur-rank-id=""></div> -->
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
	
										<!-- <div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<dl class="color-item01">
										<dt class="mightOverflow" id="totPop">수도권1지역</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="totPopAvg">6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item03">
										<dt class="mightOverflow">광주 중심구 일대</dt>
										<dd>
											<div class="per-240 totPopCol"></div>
											<span>8,707</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt class="">도시평균</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="dosiAvg">6,147,516</span>
										</dd>
									</dl>
								</div>
								<!-- <div class="graph-box">
									<div class="graph-in"></div>
								</div> -->
							</div>
							<div class="graph-box" id="totCompIndexesChart3"
								style="width: 613px; height: 270px;"></div>
						</li>
						<li class="indexes3">
							<h4>
								1인 가구 비율 <span>단위 : %</span>
							</h4>
							<div class="comparison-body newflex">
								<div>
									<div class="flex-box">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box box-type1">
													<span class="full-left">1위</span>
													<div class="slider type-color01">
														<div class="bar"></div>
														<div class="dot">
															<span>50위</span>
														</div>
														<!-- <div class="dot btn-modal" data-modal="#densely" data-cur-rank-id=""></div> -->
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
	
										<!-- <div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
									</div>
									<div class="flex-box box-type2">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box">
													<span class="full-left">1위</span>
													<div class="slider type-color04">
														<div class="bar"></div>
														<div class="dot">
															<span>50위</span>
														</div>
														<!-- <div class="dot btn-modal" data-modal="#densely" data-cur-rank-id=""></div> -->
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
	
										<!-- <div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<dl class="color-item01">
										<dt class="mightOverflow" id="totPop">수도권1지역</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="totPopAvg">6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item03">
										<dt class="mightOverflow">광주 중심구 일대</dt>
										<dd>
											<div class="per-240 totPopCol"></div>
											<span>8,707</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt class="">도시평균</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="dosiAvg">6,147,516</span>
										</dd>
									</dl>
								</div>
								<!-- 	<div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
							</div>
							<div class="graph-box" id="totCompIndexesChart4"
								style="width: 613px; height: 270px;"></div>
						</li>
						<li class="indexes4">
							<h4>
								아파트 비율 <span>단위 : %</span>
							</h4>
							<div class="comparison-body newflex">
								<div>
									<div class="flex-box">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box box-type1">
													<span class="full-left">1위</span>
													<div class="slider type-color01">
														<div class="bar"></div>
														<div class="dot">
															<span>50위</span>
														</div>
														<!-- <div class="dot btn-modal" data-modal="#densely" data-cur-rank-id=""></div> -->
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
									</div>
									<div class="flex-box box-type2">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box">
													<span class="full-left">1위</span>
													<div class="slider type-color04">
														<div class="bar"></div>
														<div class="dot">
															<span>50위</span>
														</div>
														<!-- <div class="dot btn-modal" data-modal="#densely" data-cur-rank-id=""></div> -->
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
	
										<!-- <div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<dl class="color-item01">
										<dt class="mightOverflow" id="totPop">수도권1지역</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="totPopAvg">6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item03">
										<dt class="mightOverflow">광주 중심구 일대</dt>
										<dd>
											<div class="per-240 totPopCol"></div>
											<span>8,707</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt class="">도시평균</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="dosiAvg">6,147,516</span>
										</dd>
									</dl>
								</div>
								<!-- 		<div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
							</div>
							<div class="graph-box" id="totCompIndexesChart5"
								style="width: 613px; height: 270px;"></div>
						</li>
						<li class="indexes5">
							<h4>
								신규건축물비율 <span>단위 : %</span>
							</h4>
							<div class="comparison-body newflex">
								<div>
									<div class="flex-box">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box box-type1">
													<span class="full-left">1위</span>
													<div class="slider type-color01">
														<div class="bar"></div>
														<div class="dot">
															<span>50위</span>
														</div>
														<!-- <div class="dot btn-modal" data-modal="#densely" data-cur-rank-id=""></div> -->
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
									</div>
									<div class="flex-box box-type2">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box">
													<span class="full-left">1위</span>
													<div class="slider type-color04">
														<div class="bar"></div>
														<div class="dot dot02" data-modal="#densely"
															data-cur-rank-id="">
															<span>50위</span>
														</div>
														<!-- <div class="dot btn-modal" data-modal="#densely" data-cur-rank-id=""></div> -->
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
	
										<!-- <div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<dl class="color-item01">
										<dt class="mightOverflow" id="totPop">수도권1지역</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="totPopAvg">6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item03">
										<dt class="mightOverflow">광주 중심구 일대</dt>
										<dd>
											<div class="per-240 totPopCol"></div>
											<span>8,707</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt class="">도시평균</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="dosiAvg">6,147,516</span>
										</dd>
									</dl>
								</div>
								<!-- <div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
							</div>
							<div class="graph-box" id="totCompIndexesChart6"
								style="width: 613px; height: 270px;"></div>
						</li>
						<li class="indexes6">
							<h4>
								노후건축물비율 <span>단위 : %</span>
							</h4>
							<div class="comparison-body newflex">
								<div>
									<div class="flex-box">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box box-type1">
													<span class="full-left">1위</span>
													<div class="slider type-color01">
														<div class="bar"></div>
														<div class="dot">
															<span>50위</span>
														</div>
														<!-- <div class="dot btn-modal" data-modal="#densely" data-cur-rank-id=""></div> -->
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
									</div>
									<div class="flex-box box-type2">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box">
													<span class="full-left">1위</span>
													<div class="slider type-color04">
														<div class="bar"></div>
														<div class="dot dot02" data-modal="#densely"
															data-cur-rank-id="">
															<span>50위</span>
														</div>
														<!-- <div class="dot btn-modal" data-modal="#densely" data-cur-rank-id=""></div> -->
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
	
										<!-- <div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<dl class="color-item01">
										<dt class="mightOverflow" id="totPop">수도권1지역</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="totPopAvg">6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item03">
										<dt class="mightOverflow">광주 중심구 일대</dt>
										<dd>
											<div class="per-240 totPopCol"></div>
											<span>8,707</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt class="">도시평균</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="dosiAvg">6,147,516</span>
										</dd>
									</dl>
								</div>
								<!-- 			<div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
							</div>
							<div class="graph-box" id="totCompIndexesChart7"
								style="width: 613px; height: 270px;"></div>
						</li>
						<li class="indexes7">
							<h4>
								녹지 비율 <span>단위 : %</span>
							</h4>
							<div class="comparison-body newflex">
								<div>
									<div class="flex-box">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box box-type1">
													<span class="full-left">1위</span>
													<div class="slider type-color01">
														<div class="bar"></div>
														<div class="dot">
															<span>50위</span>
														</div>
														<!-- <div class="dot btn-modal" data-modal="#densely" data-cur-rank-id=""></div> -->
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
									</div>
									<div class="flex-box box-type2">
										<div class="slider-conbox">
											<div class="slider-wrap">
												<div class="flex-box">
													<span class="full-left">1위</span>
													<div class="slider type-color04">
														<div class="bar"></div>
														<div class="dot dot02">
															<span>50위</span>
														</div>
														<!-- <div class="dot btn-modal" data-modal="#densely" data-cur-rank-id=""></div> -->
													</div>
													<span class="full-right">67위</span>
												</div>
											</div>
										</div>
	
										<!-- <div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
									</div>
								</div>
								<div class="chart-conbox type-color01">
									<dl class="color-item01">
										<dt class="mightOverflow" id="totPop">수도권1지역</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="totPopAvg">6,147,516</span>
										</dd>
									</dl>
									<dl class="color-item03">
										<dt class="mightOverflow">광주 중심구 일대</dt>
										<dd>
											<div class="per-240 totPopCol"></div>
											<span>8,707</span>
										</dd>
									</dl>
									<dl class="color-item02">
										<dt class="">도시평균</dt>
										<dd>
											<div class="totPopCol"></div>
											<span class="dosiAvg">6,147,516</span>
										</dd>
									</dl>

								</div>
								<!-- 		<div class="graph-box">
											<div class="graph-in"></div>
										</div> -->
							</div>
							<div class="graph-box" id="totCompIndexesChart8"
								style="width: 613px; height: 270px;"></div>
						</li>
					</ul>
				</div>
				<!-- <div class="btn_close">
					<button type="button" name="button" class="totCloseBtn">닫기</button>
				</div> 배천규 제거-->				
			</div>
		</div>
		<div class="popup_bg"></div>
	</div>
	<div id="totPopupContent" class="totpopup_layer" style="display: none;">
		<div class="layer_box totPopup">
			<div class="heading">
				<h2>종합통계보기</h2>
				<button id="btn_close" class="layer_close" type="button" name="button"></button>
			</div>
			<div class="heading2">
				<div class="content_panel">
					<span class="year">2021</span> 
					<span class="tit">고양시 일산동구(정발산동, 마두1동 등)</span> 
				</div>
				<button type="button" name="button" class="totDownload" id="popUpBtn">
					<span>종합통계 다운로드</span>
				</button>
			</div>
		
			<div class="content chk01" id="totContent">
				
				<div class="data_content">
					<div class="item_box_top">
						<div>UN 도시 분류 (도시)</div>
						<div>행정구역</div>
					</div>

					<ul class="item_box popup_con01">
						<li class="sec01 secMem">
							<h4>도시화 면적</h4>
							<div class="basic_chart"style="/* display: flex; justify-content: space-between; */">
								<div class="graph_bg un_shape left_tit" style="position: relative;">
									<img src="/images/urban/shape02.png">
									<span id="sec01AreaSize" data-reset="00.00 ㎢">360,000 ㎢</span>
								</div>
								<div class="right_chart" id="totchart1" style="  width: 580px; height: 160px"></div>
								<p class="sa_txt01" id="sec01RangeTxt" data-reset=""></p>
							</div>
						</li>
						<li class="sec02 secMem">
							<h4>인구  <span>(2020년 기준)</span></h4>
							<div class="basic_chart" style="/* display: flex; justify-content: space-between; align-items: flex-start; */">
								<div class="left_tit chart_txt">
									<div class="txt_box01">
										<p class="sa_txt01" id="perPopTxt" data-reset="">전체 인구 중 00~00세 </p>
										<p class="sa_txt02" id="perPop" data-reset="">1,000명</p>
										<a href="" class="zoomBox left" title="상세" data-type="pops">
											<span class="ball"></span>
										</a>
									</div>
									<div class="txt_box02 div_tot">
										<p class="sa_txt01">전체 인구수</p>
										<p class="sa_txt02" id="totPops" data-total="20000"data-reset="00">
											<!-- <span class='sa_txt04'>명</span>  -->
											<span class="sa_txt04">20,000명</span>
										</p>
									</div>
								</div>

	<!-- 							<div class="chart_ico">
									<div class="popup_chart_box">
										<img src="/images/urban/man_ico.png" class="mCS_img_loaded">
										<div>
											<div class="chart_bar" id="manPerBar" ></div>
										</div>
										<p id="manPer" data-reset="00.00%">50.00%</p>
										<p id="manTtlCnt" data-reset="0명">10,000명</p>
									</div>
									<div class="popup_chart_box right_w">
										<img src="/images/urban/woman_ico.png" class="mCS_img_loaded">
										<div>
											<div class="chart_bar" id="womanPerBar""></div>
										</div>
										<p id="womanPer" data-reset="00.00%">50.00%</p>
										<p id="womanTtlCnt" data-reset="0명">10,000명</p>
									</div>
									<p class="chart_ico_txt">전체 인구에 대한 남·여 비율</p>
								</div> -->
								<div class="" id="totchart2" style="width: 580px; height: 160px;float:right "></div>

							</div>
							<div class="div_block">
								<div class="div_block_msg">
									<span>영역 내 인구 정보 값은 '0' 입니다.</span>
								</div>
							</div>
						</li>
						<li class="sec03 secMem">
							<h4>가구 <span>(2020년 기준)</span></h4>
							<div class="basic_chart">
								<div class="left_tit chart_txt">
									<div class="txt_box01">
										<p class="sa_txt01" id="perFamilyTxt" data-reset="">전체 가구 중 친족 가구</p>
										<p class="sa_txt02" id="perFamily" data-reset="">1,000가구</p>
										<a href="#" class="zoomBox left" title="상세" data-type="family">
											<span class="ball"></span>
										</a>
									</div>
									<div class="txt_box02 div_tot">
										<p class="sa_txt01">총 가구수</p>
										<p class="sa_txt02" id="totFamily" data-total="10000"
											data-reset="00">
											<span class='sa_txt04'>10,000가구</span>
											<!-- <span class="sa_txt04">가구</span> -->
										</p>
									</div>
								</div>

								<div class="right_chart" id="totchart3" style="width: 580px; height: 160px"></div>
								<!--   <div class="txt_box03">
		                                        <span class="cr01"></span><span class="sa_txt01 mR5">비친족 가구</span>
		                                        <span class="cr02"></span><span class="sa_txt02">1인 가구</span>
		                                        <span class="cr03"></span><span class="sa_txt03">친족 가구</span>
		                                    </div> -->
							</div>
							<div class="div_block">
								<div class="div_block_msg">
									<span>영역 내 가구 정보 값은 '0' 입니다.</span>
								</div>
							</div>
						</li>


						<li class="sec04 secMem">
							<h4>주택 <span>(2020년 기준)</span></h4>
							<div class="basic_chart">
								<div class="left_tit chart_txt">
									<div class="txt_box01">
										<p class="sa_txt01" id="perHouseTxt" data-reset="">전체 주택 중
											아파트</p>
										<p class="sa_txt02" id="perHouse" data-reset="">1,000호</p>
										<a href="#" class="zoomBox left" title="상세" data-type="house">
											<span class="ball"></span>
										</a>
									</div>
									<div class="txt_box02 div_tot">
										<p class="sa_txt01">총 주택수</p>
										<p class="sa_txt02" id="totHouse" data-total="10000"
											data-reset="00">
											<!-- <span class='sa_txt04'>호</span> -->
											<span class="sa_txt04">10,000호</span>
										</p>
									</div>
								</div>
								<div class="right_chart" id="totchart4" style="width: 580px; height: 160px"></div>
								<!-- <div class="txt_box03">
		                                        <ul>
		                                            <li class="list_st cb"><span class="cr01"></span><span class="sa_txt01">단독주택</span></li>
		                                            <li class="list_st cb"><span class="cr02"></span><span class="sa_txt01">아파트</span></li>
		                                            <li class="list_st cb"><span class="cr03"></span><span class="sa_txt01">연립주택</span></li>
		                                            <li class="list_st cb"><span class="cr04"></span><span class="sa_txt01">다세대주택</span></li>
		                                            <li class="list_st cb"><span class="cr05"></span><span class="sa_txt01">비주거용</span></li>
		                                            <li class="list_st cb"><span class="sa_txt01 ml16">건물내 주택</span></li>
		                                        </ul>
		                                    </div> -->
							</div>
							<div class="div_block">
								<div class="div_block_msg">
									<span>영역 내 주택 정보 값은 '0' 입니다.</span>
								</div>
							</div>
						</li>


						<li class="sec05 secMem" id="topCorp1">
							<h4>사업체 <span>(2020년 기준)</span></h4>
							<div class="basic_chart">
								<div class="left_tit chart_txt">
									<div class="txt_box01">
										<p class="sa_txt01">전체 중 분포율 TOP3</p>
										<p class="sa_txt02" id="top3CorpPerAmongAll" data-reset="0개">10,000개</p>
										<a href="#" class="zoomBox left" title="상세" data-type="corp">
											<span class="ball"></span>
										</a>
									</div>
									<div class="txt_box02 div_tot">
										<p class="sa_txt01">총 사업체수</p>
										<p class="sa_txt02" id="totCorp" data-total="20000"
											data-reset="00">
											<!-- <span class='sa_txt04'>개</span> -->
											<span class="sa_txt04">20,000개</span>
										</p>
									</div>
								</div>
								<div class="right_chart" id="totchart5"style="width: 580px; height: 160px"></div>
								<!--   <div class="txt_box03">
		                                        <ul>
		                                            <li class="list_st"><span class="cr01" data-reset-clr="#d4d4d4" style="background: rgb(214, 107, 68);"></span><span class="sa_txt01 mightOverflow" id="top1_corp_txt" data-reset="TOP1 사업체">1. 음식점업 (전체 대비 13.5 %)</span></li>
		                                            <li class="list_st"><span class="cr02" data-reset-clr="#d4d4d4" style="background: rgb(255, 170, 1);"></span><span class="sa_txt01 mightOverflow" id="top2_corp_txt" data-reset="TOP2 사업체">2. 주점 및 비알코올 음료점업 (전체 대비 5.6 %)</span></li>
		                                            <li class="list_st"><span class="cr03" data-reset-clr="#d4d4d4" style="background: rgb(254, 215, 71);"></span><span class="sa_txt01 mightOverflow" id="top3_corp_txt" data-reset="TOP3 사업체">3. 섬유, 의복, 신발 및 가죽제품 소매업 (전체 대비 5.2 %)</span></li>
		                                        </ul>
		                                    </div> -->
							</div>
							<div class="div_block">
								<div class="div_block_msg">
									<span>영역 내 사업체 정보 값은 '0' 입니다.</span>
								</div>
							</div>
						</li>


						<li class="sec06 secMem" id="topWorker1">
							<h4>종사자 <span>(2020년 기준)</span></h4>
							<div class="basic_chart">
								<div class="left_tit chart_txt">
									<div class="txt_box01">
										<p class="sa_txt01">전체 중 분포율 TOP3</p>
										<p class="sa_txt02" id="top3WorkerPerAmongAll" data-reset="0명">10,000명</p>
										<a href="#" class="zoomBox left" title="상세"
											data-type="employee"> <span class="ball"></span>
										</a>
									</div>
									<div class="txt_box02 div_tot">
										<p class="sa_txt01">총 종사자수</p>
										<p class="sa_txt02" id="totWorker" data-total="20000"
											data-reset="00">
											<!-- <span class='sa_txt04'>명</span>"> -->
											<span class="sa_txt04">20,000명</span>
										</p>
									</div>
								</div>
								<div class="right_chart " id="totchart6" style="width: 580px; height: 160px"></div>
								<!--  <div class="txt_box03">
		                                        <ul>
		                                            <li class="list_st"><span class="cr01" data-reset-clr="#d4d4d4" style="background: rgb(214, 107, 68);"></span><span class="sa_txt01 mightOverflow" id="top1_worker_txt" data-reset="TOP1 사업체">1. 음식점업 (전체 대비 7.8 %)</span></li>
		                                            <li class="list_st"><span class="cr02" data-reset-clr="#d4d4d4" style="background: rgb(255, 170, 1);"></span><span class="sa_txt01 mightOverflow" id="top2_worker_txt" data-reset="TOP2 사업체">2. 비거주 복지시설 운영업 (전체 대비 4.0 %)</span></li>
		                                            <li class="list_st"><span class="cr03" data-reset-clr="#d4d4d4" style="background: rgb(254, 215, 71);"></span><span class="sa_txt01 mightOverflow" id="top3_worker_txt" data-reset="TOP3 사업체">3. 병원 (전체 대비 3.7 %)</span></li>
		                                        </ul>
		                                    </div> -->
							</div>
							<div class="div_block">
								<div class="div_block_msg">
									<span>영역 내 종사자 정보 값은 '0' 입니다.</span>
								</div>
							</div>
						</li>
					</ul>

					<ul class="item_box popup_con02">
						<li class="sec01 secMem">
								<h4>도시화 면적 </h4>
								<div class="basic_chart"style="/* display: flex; justify-content: space-between; */">
									<div class="graph_bg un_shape left_tit" style="position: relative;">
										<img src="/images/urban/shape02.png">
										<span class="descAreaSize1" id="sec01AreaSize" data-reset="00.00 ㎢">360,000 ㎢</span>
									</div>
									<div class="right_chart" id="deschart1" style="  width: 580px; height: 160px"></div>
									<p class="sa_txt01" id="sec01RangeTxt" data-reset=""></p>
								</div>
							</li>
							<li class="sec01 secMem sec_data">
								<h4>행정구역 면적</h4>
								<div class="basic_chart"style="/* display: flex; justify-content: space-between; */">
									<div class="graph_bg un_shape left_tit" style="position: relative;">
										<img src="/images/urban/shape03.png"> <span class="descAreaSize2"
											id="sec01AreaSize" data-reset="00.00 ㎢">360,000 ㎢</span>
										<!-- <span class="txt_sm01"> km</span><sup>2</sup> -->
									</div>
									<div class="right_chart" id="deschart2" style="  width: 580px; height: 160px"></div>
									<p class="sa_txt01" id="sec01RangeTxt" data-reset=""></p>
								</div>
							</li>
							<li class="sec02 secMem brl">
								<h4>인구 <span>(2020년 기준)</span></h4>
								<div class="basic_chart" style="/* display: flex; justify-content: space-between; align-items: flex-start; */">
									<div class="left_tit chart_txt">
										<div class="txt_box01">
											<p class="sa_txt01" id="perPopTxt1" data-reset="">전체 인구 중 00~00세 </p>
											<p class="sa_txt02" id="perPop1" data-reset="">1,000명</p>
											<a href="" class="zoomBox left" title="상세" data-type="pops">
												<span class="ball"></span>
											</a>
										</div>
										<div class="txt_box02 div_tot">
											<p class="sa_txt01" id="totPops1">전체 인구수</p>
											<p class="sa_txt02" id="totPops" data-total="20000"data-reset="00">
												<span class="sa_txt04" id="cntPops1">20,000명</span>
											</p>
										</div>
									</div>
									<div class="" id="deschart3" style="width: 580px; height: 160px;float:right "></div>

								</div>
								<div class="div_block">
									<div class="div_block_msg">
										<span>영역 내 인구 정보 값은 '0' 입니다.</span>
									</div>
								</div>
							</li>

							<li class="sec02 secMem sec_data">
								<h4>인구 <span>(2020년 기준)</span></h4>
								<div class="basic_chart">
									<div class="left_tit chart_txt">
										<div class="txt_box01">
											<p class="sa_txt01" id="perPopTxt2" data-reset="">전체 인구 중
												00~00세</p>
											<p class="sa_txt02" id="perPop2" data-reset="">1,000명</p>
											<a href="" class="zoomBox left" title="상세" data-type="pops">
												<span class="ball"></span>
											</a>
										</div>
										<div class="txt_box02 div_tot">
											<p class="sa_txt01" id="totPops2">전체 인구수</p>
											<p class="sa_txt02" id="totPops" data-total="20000"
												data-reset="00">
												<span class="sa_txt04" id="cntPops2">20,000명</span>
											</p>
										</div>
									</div>
									<div class="" id="deschart4"
										style="width: 580px; height: 160px; float: right"></div>

								</div>
								<div class="div_block">
									<div class="div_block_msg">
										<span>영역 내 인구 정보 값은 '0' 입니다.</span>
									</div>
								</div>
							</li>

							<li class="sec03 secMem">
								<h4>가구 <span>(2020년 기준)</span></h4>
								<div class="basic_chart">
									<div class="left_tit chart_txt">
										<div class="txt_box01">
											<p class="sa_txt01" id="perFamilyTxt1" data-reset="">전체 가구 중 친족 가구</p>
											<p class="sa_txt02" id="perFamily1" data-reset="">1,000가구</p>
											<a href="#" class="zoomBox left" title="상세" data-type="family">
												<span class="ball"></span>
											</a>
										</div>
										<div class="txt_box02 div_tot">
											<p class="sa_txt01" id="totcntfamily">총 가구수</p>
											<p class="sa_txt02" id="totFamily" data-total="10000"
												data-reset="00">
												<span class='sa_txt04' id="totCntFamily1">10,000가구</span>
											</p>
										</div>
									</div>

									<div class="right_chart" id="deschart5" style="width: 580px; height: 160px"></div>
								</div>
								<div class="div_block">
									<div class="div_block_msg">
										<span>영역 내 가구 정보 값은 '0' 입니다.</span>
									</div>
								</div>
							</li>
							<li class="sec03 secMem sec_data">
								<h4>가구 <span>(2020년 기준)</span></h4>
								<div class="basic_chart">
									<div class="left_tit chart_txt">
										<div class="txt_box01">
											<p class="sa_txt01" id="perFamilyTxt2" data-reset="">전체 가구 중 친족 가구</p>
											<p class="sa_txt02" id="perFamily2" data-reset="">1,000가구</p>
											<a href="#" class="zoomBox left" title="상세" data-type="family">
												<span class="ball"></span>
											</a>
										</div>
										<div class="txt_box02 div_tot">
											<p class="sa_txt01">총 가구수</p>
											<p class="sa_txt02" id="totFamily" data-total="10000"data-reset="00">
												<span class='sa_txt04' id="totCntFamily2">10,000가구</span>
												<!-- <span class="sa_txt04">가구</span> -->
											</p>
										</div>
									</div>
									<div class="right_chart" id="deschart6" style="width: 580px; height: 160px"></div>

								</div>
								<div class="div_block">
									<div class="div_block_msg">
										<span>영역 내 가구 정보 값은 '0' 입니다.</span>
									</div>
								</div>
							</li>


							<li class="sec04 secMem brl">
								<h4>주택 <span>(2020년 기준)</span></h4>
								<div class="basic_chart">
									<div class="left_tit chart_txt">
										<div class="txt_box01">
											<p class="sa_txt01" id="perHouseTxt1" data-reset="">전체 주택 중
												아파트</p>
											<p class="sa_txt02" id="perHouse1" data-reset="">1,000호</p>
											<a href="#" class="zoomBox left" title="상세" data-type="house">
												<span class="ball"></span>
											</a>
										</div>
										<div class="txt_box02 div_tot">
											<p class="sa_txt01">총 주택수</p>
											<p class="sa_txt02" id="totHouse" data-total="10000"
												data-reset="00">
												<!-- <span class='sa_txt04'>호</span> -->
												<span class="sa_txt04" id="totCntHouse1">10,000호</span>
											</p>
										</div>
									</div>
									<div class="right_chart" id="deschart7" style="width: 580px; height: 160px"></div>
								</div>
								<div class="div_block">
									<div class="div_block_msg">
										<span>영역 내 주택 정보 값은 '0' 입니다.</span>
									</div>
								</div>
							</li>
							<li class="sec04 secMem sec_data">
								<h4>주택 <span>(2020년 기준)</span></h4>
								<div class="basic_chart">
									<div class="left_tit chart_txt">
										<div class="txt_box01">
											<p class="sa_txt01" id="perHouseTxt2" data-reset="">전체 주택 중
												아파트</p>
											<p class="sa_txt02" id="perHouse2" data-reset="">1,000호</p>
											<a href="#" class="zoomBox left" title="상세" data-type="house">
												<span class="ball"></span>
											</a>
										</div>
										<div class="txt_box02 div_tot">
											<p class="sa_txt01">총 주택수</p>
											<p class="sa_txt02" id="totHouse" data-total="10000"
												data-reset="00">
												<!-- <span class='sa_txt04'>호</span> -->
												<span class="sa_txt04" id="totCntHouse2">10,000호</span>
											</p>
										</div>
									</div>
									<div class="right_chart" id="deschart8" style="width: 580px; height: 160px"></div>
									<!-- <div class="txt_box03">
			                                        <ul>
			                                            <li class="list_st cb"><span class="cr01"></span><span class="sa_txt01">단독주택</span></li>
			                                            <li class="list_st cb"><span class="cr02"></span><span class="sa_txt01">아파트</span></li>
			                                            <li class="list_st cb"><span class="cr03"></span><span class="sa_txt01">연립주택</span></li>
			                                            <li class="list_st cb"><span class="cr04"></span><span class="sa_txt01">다세대주택</span></li>
			                                            <li class="list_st cb"><span class="cr05"></span><span class="sa_txt01">비주거용</span></li>
			                                            <li class="list_st cb"><span class="sa_txt01 ml16">건물내 주택</span></li>
			                                        </ul>
			                                    </div> -->
								</div>
								<div class="div_block">
									<div class="div_block_msg">
										<span>영역 내 주택 정보 값은 '0' 입니다.</span>
									</div>
								</div>
							</li>

							<li class="sec05 secMem">
								<h4>사업체 <span>(2020년 기준)</span></h4>
								<div class="basic_chart">
									<div class="left_tit chart_txt">
										<div class="txt_box01">
											<p class="sa_txt01" id="top3CorpAmongAll1">전체 중 분포율 TOP3</p>
											<p class="sa_txt02" id="top3CorpPerAmongAll1" data-reset="0개">10,000개</p>
											<a href="#" class="zoomBox left" title="상세" data-type="corp">
												<span class="ball"></span>
											</a>
										</div>
										<div class="txt_box02 div_tot">
											<p class="sa_txt01">총 사업체수</p>
											<p class="sa_txt02" id="totCorp" data-total="20000"
												data-reset="00">
												<!-- <span class='sa_txt04'>개</span> -->
												<span class="sa_txt04" id="allCorp1">20,000개</span>
											</p>
										</div>
									</div>
									<div class="right_chart" id="deschart9"style="width: 580px; height: 160px"></div>
								</div>
								<div class="div_block">
									<div class="div_block_msg">
										<span>영역 내 사업체 정보 값은 '0' 입니다.</span>
									</div>
								</div>
							</li>
							<li class="sec05 secMem">
								<h4>사업체 <span>(2020년 기준)</span></h4>
								<div class="basic_chart">
									<div class="left_tit chart_txt">
										<div class="txt_box01">
											<p class="sa_txt01">전체 중 분포율 TOP3</p>
											<p class="sa_txt02" id="top3CorpPerAmongAll2" data-reset="0개">10,000개</p>
											<a href="#" class="zoomBox left" title="상세" data-type="corp">
												<span class="ball"></span>
											</a>
										</div>
										<div class="txt_box02 div_tot">
											<p class="sa_txt01">총 사업체수</p>
											<p class="sa_txt02" id="totCorp" data-total="20000"
												data-reset="00">
												<!-- <span class='sa_txt04'>개</span> -->
												<span class="sa_txt04" id="allCorp2">20,000개</span>
											</p>
										</div>
									</div>
									<div class="right_chart" id="deschart10"style="width: 580px; height: 160px"></div>
									<!--   <div class="txt_box03">
				                                        <ul>
				                                            <li class="list_st"><span class="cr01" data-reset-clr="#d4d4d4" style="background: rgb(214, 107, 68);"></span><span class="sa_txt01 mightOverflow" id="top1_corp_txt" data-reset="TOP1 사업체">1. 음식점업 (전체 대비 13.5 %)</span></li>
				                                            <li class="list_st"><span class="cr02" data-reset-clr="#d4d4d4" style="background: rgb(255, 170, 1);"></span><span class="sa_txt01 mightOverflow" id="top2_corp_txt" data-reset="TOP2 사업체">2. 주점 및 비알코올 음료점업 (전체 대비 5.6 %)</span></li>
				                                            <li class="list_st"><span class="cr03" data-reset-clr="#d4d4d4" style="background: rgb(254, 215, 71);"></span><span class="sa_txt01 mightOverflow" id="top3_corp_txt" data-reset="TOP3 사업체">3. 섬유, 의복, 신발 및 가죽제품 소매업 (전체 대비 5.2 %)</span></li>
				                                        </ul>
				                                    </div> -->
								</div>
								<div class="div_block">
									<div class="div_block_msg">
										<span>영역 내 사업체 정보 값은 '0' 입니다.</span>
									</div>
								</div>
							</li>

							<li class="sec06 secMem ">
								<h4>종사자 <span>(2020년 기준)</span></h4>
								<div class="basic_chart">
									<div class="left_tit chart_txt">
										<div class="txt_box01">
											<p class="sa_txt01">전체 중 분포율 TOP3</p>
											<p class="sa_txt02" id="top3WorkerPerAmongAll1" data-reset="0명">10,000명</p>
											<a href="#" class="zoomBox left" title="상세"
												data-type="employee"> <span class="ball"></span>
											</a>
										</div>
										<div class="txt_box02 div_tot">
											<p class="sa_txt01">총 종사자수</p>
											<p class="sa_txt02" id="totWorker" data-total="20000"
												data-reset="00">
												<!-- <span class='sa_txt04'>명</span>"> -->
												<span class="sa_txt04" id="allWork1">20,000명</span>
											</p>
										</div>
									</div>
									<div class="right_chart " id="deschart11"
										style="width: 580px; height: 160px"></div>
									<!--  <div class="txt_box03">
				                                        <ul>
				                                            <li class="list_st"><span class="cr01" data-reset-clr="#d4d4d4" style="background: rgb(214, 107, 68);"></span><span class="sa_txt01 mightOverflow" id="top1_worker_txt" data-reset="TOP1 사업체">1. 음식점업 (전체 대비 7.8 %)</span></li>
				                                            <li class="list_st"><span class="cr02" data-reset-clr="#d4d4d4" style="background: rgb(255, 170, 1);"></span><span class="sa_txt01 mightOverflow" id="top2_worker_txt" data-reset="TOP2 사업체">2. 비거주 복지시설 운영업 (전체 대비 4.0 %)</span></li>
				                                            <li class="list_st"><span class="cr03" data-reset-clr="#d4d4d4" style="background: rgb(254, 215, 71);"></span><span class="sa_txt01 mightOverflow" id="top3_worker_txt" data-reset="TOP3 사업체">3. 병원 (전체 대비 3.7 %)</span></li>
				                                        </ul>
				                                    </div> -->
								</div>
								<div class="div_block">
									<div class="div_block_msg">
										<span>영역 내 종사자 정보 값은 '0' 입니다.</span>
									</div>
								</div>
							</li>

							<li class="sec06 secMem ">
								<h4>종사자 <span>(2020년 기준)</span></h4>
								<div class="basic_chart">
									<div class="left_tit chart_txt">
										<div class="txt_box01">
											<p class="sa_txt01">전체 중 분포율 TOP3</p>
											<p class="sa_txt02" id="top3WorkerPerAmongAll2" data-reset="0명">10,000명</p>
											<a href="#" class="zoomBox left" title="상세"
												data-type="employee"> <span class="ball"></span>
											</a>
										</div>
										<div class="txt_box02 div_tot">
											<p class="sa_txt01">총 종사자수</p>
											<p class="sa_txt02" id="totWorker" data-total="20000"
												data-reset="00">
												<!-- <span class='sa_txt04'>명</span>"> -->
												<span class="sa_txt04" id="allWork2">20,000명</span>
											</p>
										</div>
									</div>
									<div class="right_chart " id="deschart12"
										style="width: 580px; height: 160px"></div>
									<!--  <div class="txt_box03">
				                                        <ul>
				                                            <li class="list_st"><span class="cr01" data-reset-clr="#d4d4d4" style="background: rgb(214, 107, 68);"></span><span class="sa_txt01 mightOverflow" id="top1_worker_txt" data-reset="TOP1 사업체">1. 음식점업 (전체 대비 7.8 %)</span></li>
				                                            <li class="list_st"><span class="cr02" data-reset-clr="#d4d4d4" style="background: rgb(255, 170, 1);"></span><span class="sa_txt01 mightOverflow" id="top2_worker_txt" data-reset="TOP2 사업체">2. 비거주 복지시설 운영업 (전체 대비 4.0 %)</span></li>
				                                            <li class="list_st"><span class="cr03" data-reset-clr="#d4d4d4" style="background: rgb(254, 215, 71);"></span><span class="sa_txt01 mightOverflow" id="top3_worker_txt" data-reset="TOP3 사업체">3. 병원 (전체 대비 3.7 %)</span></li>
				                                        </ul>
				                                    </div> -->
								</div>
								<div class="div_block">
									<div class="div_block_msg">
										<span>영역 내 종사자 정보 값은 '0' 입니다.</span>
									</div>
								</div>
							</li>
					</ul>
				</div>
				<!-- 배천규 제거 <div class="btn_close">
					<button type="button" name="button" class="totCloseBtn">닫기</button>
				</div> -->
			</div>
		</div>
		<div class="popup_bg"></div>
	</div>


	<div id="notice_mini_pop" class="popupWrapper"style="position: absolute; float: left; margin-left: 270px; margin-top: 450px; width: 602px; height: 375px; background: rgba(0, 0, 0, 0); display: none; z-index: 6;">
		<div>
			<img src="/img/new/sgis_use_notice_pop.png" usemap="#Map" />
			<map name="Map">
				<area shape="rect" coords="565,0,601,36"href="javascript:$urbanMain.ui.informationPopClose();" alt="팝업닫기" />
			</map>
		</div>
	</div>
	<!-- 사용자가이드 -->
	<div class="urbanTuto tuto_1">
		<button type="button" class="tutoClose">닫기</button>
	</div>
	<div class="urbanTuto tuto_2">
		<button type="button" class="tutoClose">닫기</button>
	</div>
	<div class="urbanTuto tuto_3">
		<button type="button" class="tutoClose">닫기</button>
	</div>
	<div class="urbanTuto tuto_4">
		<button type="button" class="tutoClose">닫기</button>
	</div>
</body>
</html>