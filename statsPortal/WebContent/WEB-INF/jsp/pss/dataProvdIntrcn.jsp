<%--
/*
    ********************************************************************
    * @source      : shortcut_05_04_02.jsp
    * @description : 공유마당 - 자료신청 -센서스 공간통계 자료제공
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------         
    * 2009-10-14 		정종세 						수정       
    * 2014-09-15 		이경현						디자인시각화
    * 2018-07-30 		김성연						디자인시각화
    ********************************************************************
 */
--%>
<%@ page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
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
	String sgis_census_return_call = "";
	
	try {
		broker = new GeneralBroker("ceaa00");
		/***************************/
		/* 안내문 자료 */
		/***************************/
		lData.setString("PARAM","INFORMATION");
		/* rm = broker.getList(lData);
		if(rm.next()) {
			sgis_census_return_call = StringUtil.toLine(StringUtil.verify((String)rm.get("sgis_census_return_call")));
		} */
	} catch(IllegalArgumentException e) {
		System.out.println("조회 에러");
	}
%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="utf-8">
		<meta name="format-detection" content="telephone=no" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		
		<script src="/js/common/includeHead.js"></script>
		<script src="/js/common/common.js"></script>
		
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/common.css">
		<!--알림마당 컨텐츠 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/contents.css">
		<!--게시판 css 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/board.css">
		
		<title>자료제공|통계지리정보서비스</title>
		<script>
			var menuType = 'sc0502';
			$(document).ready(function() {
				srvLogWrite("A0", "14", "04", "01", "", "");
				$.faqContView(1);
			});
			
			$.faqContView = function(v) {
				$('.faq-cont').each(function(i) {
					if((v - 1) == i) $(this).show();
					else $(this).hide();
				});
			};
			
		</script>
		
		<!-- mng_s 20200723 이진호 / 자료제공 서비스 개편 -->
		<!-- location 에 마지막 꺽쇠 해제 -->
		<style>
		#title-area .location li:nth-child(3):after{
			content: none;
		}
		</style>
		<!-- mng_e 20200723 이진호 -->
		
	</head>
	<body>
		<!--wrap-->
		<div id="wrap">
			<!--header-->
			<header>
				<!-- Top Include -->
				<jsp:include page="/view/common/includeSearch"></jsp:include>
			</header>
			<!--//header-->
			<!--contents-->
			<div id="container" class="sub">
				<!--lnb 시작-->
				<jsp:include page="/jsp/board/includeLeftMenu_shortcut.jsp"></jsp:include>
				<!--//lnb 끝-->
				<div id="content">
					<div id="title-area">
						<ul class="location">
						<!-- 190313 방민정 수정 시작 -->
							
							<!-- mng_s 20200721 이진호 / 자료제공 서비스 개편 -->
							<li><a href="/view/view/index"><img src="/images/common/location_home.gif" alt="홈"/></a></li>
							<li><a href="/view/pss/dataProvdIntrcn">자료제공</a></li>
							<li><a href="/view/pss/dataProvdIntrcn"><em>자료제공 소개</em></a></li>
							<!-- <li><a href="/view/board/sopBoardMain">알림마당</a></li> -->
							<!-- <li><a href="/contents/shortcut/shortcut_05_02.jsp">자료신청 서비스</a></li> -->
							<!-- <li><a href="/contents/shortcut/shortcut_05_02.jsp"><em>자료신청 서비스란</em></a></li> -->
							<!-- mng_e 20200721 이진호 -->
							
						<!-- 190313 방민정 수정 끝 -->
						</ul>
						
						<!-- mng_s 20200721 이진호 / 자료제공 서비스 개편 -->
						<!--<h1 class="sub-title">자료신청 서비스란</h1> -->
						<h1 class="sub-title">자료제공 소개</h1>
						<!-- mng_e 20200721 이진호 -->
						
					</div>
					<div id="contents" class="view">
						<!--view-->
						<div class="header-infor">
							<h2>서비스소개</h2>
							<div class="box">
								<div class="edge-top"></div>
								<div class="icon type01">
									<strong>통계청에서 자체 구축한 통계지리정보의 공동 활용을 통한 국가 경쟁력 강화</strong>
									<p>
											통계청에서 자체 생산한 통계지리정보자료를 정부기관 및 민간에서 활용하여 더 큰 부가가치를 창출할 수 있도록
											자료를 제공하는 것으로 현재 센서스 공간통계 자료를 파일형태로 서비스하고 있습니다.
									</p>
								</div>
								<div class="edge-bot"></div>
							</div>
						</div>
						
						<!-- mng_s 20200721 이진호 / 자료제공 서비스 개편 -->
						<!--<h3>자료신청 서비스 이용절차</h3> -->
						<h3>자료제공 서비스 이용절차</h3>
						<!-- mng_e 20200721 이진호 -->
						
						<div class="procedure-step">
							<ul>
								<li><img src="/publish_2018/include/images/contents/procedure-step01.png" title="SGIS 회원 로그인"><span>SGIS 통계지리정보서비스 회원가입 후 로그인 합니다.</span></li>
								<li><img src="/publish_2018/include/images/contents/procedure-step02.png" title="자료신청 신청정보입력"><span>자료신청 1단계 입력  및 이용약관 동의합니다.</span></li>
								<li><img src="/publish_2018/include/images/contents/procedure-step03.png" title="자료선택 및 신청내역확인"><span>원하시는 자료 선택 후 자료신청 완료처리 합니다.</span></li> 
								<li><img src="/publish_2018/include/images/contents/procedure-step04.png" title="신청자료 다운로드"><span>신청한 자료를 자료다운로드 화면에서 다운로드 받습니다.</span></li>
							</ul>
						</div>
						<!-- mng_s 20200721 이진호 / 자료제공 서비스 개편 -->
						<!--<h3>자료신청  서비스 FAQ</h3> -->
						<h3>자료제공  서비스 FAQ</h3>
						<!-- mng_e 20200721 이진호 -->
						<div id="procedure-faq" class="faq-view">
							<div class="header clearFix">
								<a href="javascript:void(0);" onclick="$.faqContView(1);"><strong>Q</strong>제공받은 파일을 QGIS(공개소프트웨어),ArcGIS(상용소프트웨어)에서 활용가이드문서 다운로드 받으세요.</a>
							</div>
							<div class="faq-cont" id="faq-cont01">
								<ul>
									<li>1. QGIS(공개소프트웨어) 가이드 <a href="/contents/include/download.jsp?filename=QGIS_guide.pdf&path=/board/&type=board" class="faq-btn dl"></a></li>
									<li>2. ArcGIS(상용소프트웨어) 가이드 <a href="/contents/include/download.jsp?filename=arcGIS_guide.pdf&path=/board/&type=board" class="faq-btn dl"></a></li>
								</ul>
							</div>
							<div class="header clearFix">
								<!-- mng_s 20200721 이진호 / 자료제공 서비스 개편 -->
								<!--<a href="javascript:void(0);" onclick="$.faqContView(2);"><strong>Q</strong>SGIS 자료신청 서비스에 대한 이용 가이드문서 다운로드 받으세요.</a> -->
								<a href="javascript:void(0);" onclick="$.faqContView(2);"><strong>Q</strong>SGIS 자료제공 서비스에 대한 이용 가이드문서 다운로드 받으세요.</a>
								<!-- mng_e 20200721 이진호 -->
							</div>
							<div class="faq-cont" id="faq-cont02">
								<ul>
								<!-- 190307 방민정수정 시작 -->
									<li>1.공간통계자료신청 안내 <a href="/contents/include/download.jsp?filename=GIS_statistics_guid.zip&path=/board/&type=board" class="faq-btn dl"></a></li>
									<li>2.자료제공에서 사용되는 좌표계 <a href="/contents/include/download.jsp?filename=SOP_prj_utmk.zip&path=/board/&type=board" class="faq-btn dl"></a></li>
								  	<li>3.SGIS 코드표 및 이용설명서 <a href="/contents/include/download.jsp?filename=ref_code.zip&path=/board/&type=board" class="faq-btn dl"></a> </li>
								<!--  
									<li>1.공간통계자료신청 안내 <a href="/contents/include/download.jsp?filename=sgis_request_guide.pdf&path=/board/&type=board" class="faq-btn dl"></a></li>
									<li>2. 자료신청에서 사용되는 좌표계 <a href="/contents/include/download.jsp?filename=point_guide.pdf&path=/board/&type=board" class="faq-btn dl"></a></li>
								  	<li>3.SGIS 행정구역코드 <a href="/contents/include/download.jsp?filename=area_code.pdf&path=/board/&type=board" class="faq-btn dl"></a> </li>
									<li>4. SGIS 통계지리정보서비스 DB Schema 다운로드 <a href="/contents/include/download.jsp?filename=db_schema.pdf&path=/board/&type=board" class="faq-btn dl"></a> </li>
								190307 방민정 수정 끝-->
								</ul>
							</div>
							<div class="header clearFix">
								<a href="javascript:void(0);" onclick="$.faqContView(3);"><strong>Q</strong>SGIS 지도기준정보는 어떻게 되나요?</a>
							</div>
							<div class="faq-cont" id="faq-cont03">
								<ul>
									<li>1. 지리정보 기준시점 : 기준년도 12월31일</li>
									<li>2. 지리정보 좌표계 : UTM-K(GRS80타원체)</li>
									<li>3. 서비스 제한 기준 : 집계구별 5미만 통계값 서비스제외(총괄항목은 미적용)</li>
									<li>4. 공간정보 활용 : 통계청에서 제공하는 공간정보 활용을 위해 QGIS 다운로드 링크제공</li>
									<li>5. QGIS 다운로드 링크 : https://www.qgis.org/ko/site</li>
								</ul>
							</div>
							<div class="header clearFix">
								<a href="javascript:void(0);" onclick="$.faqContView(4);"><strong>Q</strong>SGIS 서비스 이용 시 유의사항은 무엇인가요?</a>
							</div>
							<div class="faq-cont" id="faq-cont04">
								<p>SGIS에서 제공하는 센서스 통계는 일부 특별조사구와 외국인, 개인운수업등의 자료를 제외하고 최신 경계를 반영하기 때문에 KOSIS 등
								공표된 통계와 차이가 있습니다. 아래 사항을 유의하여 SGIS 서비스를 이용하시기 바랍니다.</p>
								<dl>
									<dt>1. 제외된 자료</dt>
									<dd> 인구/가구/주택 센서스 : 해외주재공관, 교도소 및 소년원, 군부대,전투경찰대, 의무소방대 등의 특별 조사구와<br>
									외국인 사업체 센서스 : 개인운수업(사업장이 일정치 않음)</dd>
									<dt>2. 최신 경계 반영에 따른 차이</dt>
									<dd> SGIS는 최신 행정구역 경계에 맞추어 서비스함에 따라 KOSIS 자료와 다를 수 있음</dd>
									<dt>3. 2015, 2016년 자료신청 특이사항</dt>
									<dd>2015, 2016년 자료신청 항목중 교육정도별 인구, 성/혼인상태별 인구, 점유형태별 가구, 건축년도별 주택은 자료신청항목에서
									제외되었습니다. (2015, 2016년 인구주택총조사 전수조사에서 제외됨)</dd>
									<dt>4. 압축해제</dt>
									<dd> 윈도우 기본 압축 프로그램으로 압축 풀기가 안될 경우 무료 압축 프로그램을 설치 후 압축 해제해 주시기 바랍니다.</dd>
								</dl>
							</div>
						</div>
						<!--//view-->
					</div>
				</div>
			</div>
			<!--//contents-->
			<!--footer-->
			<div id="footer"><jsp:include page="/view/common/includeBottom"></jsp:include></div>
			<!--//footer-->
		</div>
		<!--//wrap-->
	</body>
</html>