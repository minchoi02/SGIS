<%--
/*
    ********************************************************************
    * @source      : shortcut_07.jsp
    * @description : 서비스소개-자료제공목록
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------
    * 2009-10-08 정종세 수정
    * 2018-07-31 		김성연						디자인시각화
    ********************************************************************
 */
--%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<%@ include file="/contents/include/comVarCoding.jsp"%>

<%
	String leftMenu="shortcut";

	GeneralBroker broker = null;
	RecordModel rm = null;
	RecordModel rm1 = null;
	RecordModel rm2 = null;
	RecordModel rm3 = null;
	RecordModel rm4 = null;

	String sgis_census_info_word = "";
	String sgis_census_return_call = "";

	String sgis_census_id = "";
	String sgis_census_name = "";

	try {
		broker = new GeneralBroker("ceaa00");

		/***************************/
		/* 안내문 자료 */
		/***************************/
		lData.setString("PARAM","INFORMATION");
/* 		rm = broker.getList(lData);

		if(rm.next()) {
			sgis_census_info_word = StringUtil.verify(StringUtil.verify((String)rm.get("sgis_census_info_word")));
			sgis_census_return_call = StringUtil.toLine(StringUtil.verify((String)rm.get("sgis_census_return_call")));
		} */
		sgis_census_info_word =   org.apache.commons.lang.StringEscapeUtils.unescapeHtml(sgis_census_info_word).replaceAll("<STRONG>", "<strong>");
		sgis_census_info_word =  org.apache.commons.lang.StringEscapeUtils.unescapeHtml(sgis_census_info_word).replaceAll("</STRONG>", "</strong>");
	} catch(IllegalArgumentException e) {
		System.out.println("조회에러");
	}
%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="utf-8">
		<meta name="format-detection" content="telephone=no" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<script src="/js/common/includeHead.js"></script>
		<script src="/js/common/common.js"></script>

		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/common.css">
		<!--알림마당 컨텐츠 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/contents.css">
		<!--게시판 css 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/board.css">

		<title>자료제공|통계지리정보서비스</title>
		<script>
			var menuType = 'sc05';
			$(document).ready(function() {
				srvLogWrite("A0", "14", "04", "02", "", "");
			});

			//S_20190304 김성연
			$.roadNameMap = function(url) {
				var openNewWindow = window.open("about:blank");
				openNewWindow.location.href = url;
			}
			//E_20190304 김성연

			function fnPast() {

				var c = confirm("집계구 경계는 시계열 데이터가 아닙니다. \n최신 집계구 경계 기준의 데이터를 받으세요. \n이 자료는 과거 시점 경계 기준이 꼭 필요한 분들을 위한 자료입니다.\n\n과거집계구 자료신청으로 이동하시겠습니까?");
				if(c == 1) {
					//location.href="/contents/shortcut/shortcut_05_03_past_year.jsp";
				}
			}
		</script>
		<style>
			#title-area .location li:nth-child(3):after {
				content : none;
			}
		</style>
	</head>
	<body>
		<!--wrap-->
		<div id="wrap">
			<!--header-->
			<header>
				<jsp:include page="/view/common/includeSearch"></jsp:include>
			</header>
			<!--//header-->
			<!--contents-->
			<div id="container" class="sub">

				<!-- mng_s 20200721 이진호 / 자료제공 서비스 개편 -->
				<!--lnb 시작-->
				<%--<jsp:include page="/jsp/board/includeLeftMenu.jsp"></jsp:include> --%>
				<jsp:include page="/jsp/board/includeLeftMenu_shortcut.jsp"></jsp:include>
				<!--//lnb 끝-->
				<!-- mng_s 20200721 이진호 -->

	            <div id="content">
	                <div id="title-area">
	                    <ul class="location">
						<!-- 190313 방민정 수정 시작 -->
							<li><a href="/view/view/index"><img src="/images/common/location_home.gif"/></a></li>
							<!--<li><a href="/view/board/sopBoardMain">알림마당</a></li> -->
							<li><a href="/view/pss/dataProvdIntrcn">자료제공</a></li>
							<li><a href="/view/pss/openDataIntrcn"><em>자료제공 목록</em></a></li>
						<!-- 190313 방민정 수정 끝 -->
	                    </ul>
	                    <h1 class="sub-title">자료제공 목록</h1>
	                </div>
	                 <div id="contents" class="view">
	                    <!--view-->
	                    <!-- <h2>서비스소개</h2> -->
	                    <div class="header-infor">
	                        <div class="box">
	                            <div class="edge-top"></div>
	                            <div class="icon type02">
	                                <h3>통계자료, 통계지역경계를 제공합니다.</h3>
	                                <ul>
	                                    <li>통계지역경계 기준시점 : 기준년도 12월31일(단, 2021년도는 6월 30일)</li>

	                                    <!-- mng_s 20200814 이진호, 문구 추가 밑 클릭시 link 추가 -->
										<!-- <li>지리정보 좌표계 :UTM-K(GRS80타원체)</li> -->
	                                    <li>지리정보 좌표계 :  <a href="/view/board/faqView?post_no=14" style="text-decoration: underline;">UTM-K(GRS80타원체)(EPSG5179)</a></li>
	                                    <!-- mng_e 20200814 이진호 -->

	                                    <li>서비스 제한 기준 : 집계구별 5미만 통계값 서비스제외(총괄항목은 미적용)</li>
	                                </ul>
	                            </div>
	                            <div class="edge-bot"></div>
	                        </div>
	                    </div>
	                        <h2>통계자료</h2>
	                        <div class="table-type">
	                        <table class="table-style type01">
	                            <caption>통계자료 테이블</caption>
	                            <colgroup>
	                                <col style="width:200px;">
	                                <col style="width:260px;">
	                                <col style="width:85px;">
	                                <col style="width:85px;">
	                                <col style="width:85px;">
	                                <col style="width:85px;">
	                            </colgroup>
	                            <thead>
	                                <tr>
	                                    <th class="first">대상자료명</th>
	                                    <th>기준년도</th>
	                                    <th>자료형식</th>
	                                    <th>공개여부</th>
	                                    <th>대상지역</th>
	                                    <th class="last">가격</th>
	                                </tr>
	                            </thead>
	                            <tbody>
	                                <tr>
	                                    <td class="first">집계구별 통계(인구)</td>
	                                    <td>2020, 2019, 2018, 2017, 2016, 2015, 2010, 2005, 2000</td>
	                                    <td>txt</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <tr>
	                                    <td class="first">집계구별 통계(가구)</td>
	                                    <td>2020, 2019, 2018, 2017, 2016, 2015, 2010, 2005, 2000</td>
	                                    <td>txt</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <tr>
	                                    <td class="first">집계구별 통계(주택)</td>
	                                    <td>2020, 2019, 2018, 2017, 2016, 2015, 2010, 2005, 2000</td>
	                                    <td>txt</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <tr>
	                                    <td class="first">집계구별 통계(사업체)</td>
	                                    <td>2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000</td>
	                                    <td>txt</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
									<!--2021년 SGIS4_자료제공 시작 -->
	                                <tr>
	                                    <td class="first">격자통계(인구)</td>
	                                    <td>2020, 2019, 2018, 2017, 2016, 2015, 2010, 2005, 2000</td>
	                                    <td>txt</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <tr>
	                                    <td class="first">격자통계(가구)</td>
	                                    <td>2020, 2019, 2018, 2017, 2016, 2015, 2010, 2005, 2000</td>
	                                    <td>txt</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <tr>
	                                    <td class="first">격자통계(주택)</td>
	                                    <td>2020, 2019, 2018, 2017, 2016, 2015, 2010, 2005, 2000</td>
	                                    <td>txt</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <tr>
	                                    <td class="first">격자통계(사업체)</td>
	                                    <td>2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000</td>
	                                    <td>txt</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <tr>
	                                    <td class="first">격자통계(종사자)</td>
	                                    <td>2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000</td>
	                                    <td>txt</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <!--2021년 SGIS4_자료제공 끝-->
	                            </tbody>
	                        </table>
	                        </div>
	                        <h2>통계지역경계</h2>
	                        <div class="table-type">
	                        <table class="table-style type01">
	                            <caption>통계지역경계 테이블</caption>
	                            <colgroup>
	                                <col style="width:200px;">
	                                <col style="width:260px;">
	                                <col style="width:85px;">
	                                <col style="width:85px;">
	                                <col style="width:85px;">
	                                <col style="width:85px;">
	                            </colgroup>
	                            <thead>
	                                <tr>
	                                    <th class="first">대상자료명</th>
	                                    <th>기준년도</th>
	                                    <th>자료형식</th>
	                                    <th>공개여부</th>
	                                    <th>대상지역</th>
	                                    <th class="last">가격</th>
	                                </tr>
	                            </thead>
	                            <tbody>
	                                <tr>
	                                    <td class="first">센서스용 행정구역경계(전체)</td>
	                                    <td>2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1995, 1990, 1985, 1980, 1975</td>
	                                    <td>SHP</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <tr>
	                                    <td class="first">센서스용 행정구역경계(시도)</td>
	                                    <td>2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1995, 1990, 1985, 1980, 1975</td>
	                                    <td>SHP</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <tr>
	                                    <td class="first">센서스용 행정구역경계(시군구)</td>
	                                    <td>2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1995, 1990, 1985, 1980, 1975</td>
	                                    <td>SHP</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <tr>
	                                    <td class="first">센서스용 행정구역경계(읍면동)</td>
	                                    <td>2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1995, 1990, 1985, 1980, 1975</td>
	                                    <td>SHP</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <tr>
	                                    <td class="first">도시화지역</td>
	                                    <td>2021</td>
	                                    <td>SHP</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <tr>
	                                    <td class="first">집계구경계</td>
	                                    <td>2021</td>
	                                    <td>SHP</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <tr>
	                                    <td class="first">기초단위구 경계(시도)</td>
	                                    <td>2021</td>
										<td>SHP</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <!-- 2021년 SGIS4_자료제공 시작 -->
	                                <tr>
	                                    <td class="first">도시권경계</td>
	                                    <td>2005</td>
	                                    <td>SHP</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <tr>
	                                    <td class="first">격자경계(100m)</td>
	                                    <td>2021</td>
	                                    <td>SHP</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <tr>
	                                    <td class="first">격자경계(500m)</td>
	                                    <td>2021</td>
	                                    <td>SHP</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <tr>
	                                    <td class="first">격자경계(1km)</td>
	                                    <td>2021</td>
	                                    <td>SHP</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <tr>
	                                    <td class="first">격자경계(10km)</td>
	                                    <td>2021</td>
	                                    <td>SHP</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <tr>
	                                    <td class="first">격자경계(100km)</td>
	                                    <td>2021</td>
	                                    <td>SHP</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <tr>
	                                    <td class="first">도시화경계(격자)</td>
	                                    <td>2020, 2019, 2018, 2017, 2016, 2015, 2010, 2005, 2000</td>
	                                    <td>SHP</td>
	                                    <td>공개</td>
	                                    <td>전국</td>
	                                    <td class="last"><a href="#">무료</a></td>
	                                </tr>
	                                <!-- 2021년 SGIS4_자료제공 끝 -->
	                            </tbody>
	                        </table>
	                    </div>

	                    <div style="padding-bottom:50px; margin-top:-20px;">
	                    	<a href="javascript:fnPast();" style='float:left;'>※ 과거집계구 자료신청</a>
	                    </div>

	                    <h2>센서스지도</h2>
	                    <div class="bottom-infor">
	                        <div class="box">
	                            <p>통계지리정보시스템에서는 더이상 지도 데이터를 제공하지 않습니다.<br />
	                            지도 데이터가 필요하신 사용자께서는 링크된 설명서를 다운로드 받아 도로명 지도를 신청하시기 바랍니다. </p>
	                       </div>
	                    </div>
	                    <!-- S_20190304 김성연 -->
	                    <ul class="question">
	                        <li><a href="javascript:void(0);" onclick="$.roadNameMap('/upload/census/howtoapply_roadnamemap.pdf');" class="btn dl bp-long"><span>도로명 지도 신청 방법</span></a></li>
	                        <!-- 20210913 김건민 (자료제공 담당자 이메일 변경 요청이 있어서 변겅함.) -->
	                        <li>
	                            <strong>문의사항연락처&nbsp;&nbsp;&nbsp;:</strong> <span>Tel : 042-481-2438</span>Email : kingstars@korea.kr
	                        </li>
	                        <!-- 20210913 김건민 -->
	                    </ul>
	                    <!-- E_20190304 김성연 -->
	                    <!--//view-->
					</div>
				</div>
			</div>
			<!--//contents-->
			<!--footer-->
			<div id="footer">
				<jsp:include page="/view/common/includeBottom"></jsp:include>
			</div>
			<!--//footer-->
		</div>
		<!--//wrap-->
	</body>
</html>