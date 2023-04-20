<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<%@ page import="org.apache.commons.lang.StringEscapeUtils"%>

<!-- 2017. 11. 09 [개발팀] 추가 START -->
<%@page import="java.util.HashMap"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Map"%>
<!-- 2017. 11. 09 [개발팀] 추가 END -->

<%@ include file="/contents/include/comVarCoding.jsp"%>
<%-- <%@ include file="/contents/include/logger.jsp"%> --%>
<%

    //자료제공 파일에 오류가 있어서 서비스 정지함. 20200929
	//out.println("<script type='text/javascript'> alert('제공용 자료 자체 검토 중 일부 집계구 경계 및 집계구별 통계자료 수정이 발생하여 10.8.일자로 보완하여 서비스됨을 알려드립니다. * 변경된 집계구 : 1109061010103(수정), 1109060020008(추가), 2105055010011(수정), 2105054030003(추가)'); location.href='/contents/shortcut/shortcut_05_02.jsp'; </script> ");
    //out.println("<script type='text/javascript'> alert('SGIS포털 자료제공 서비스 중단 안내문\\n\\n통계지리정보서비스(SGIS) 집계구 경계 및 통계자료 개선을 위하여 다음과 같이 서비스가 중단되오니 양해 바랍니다.\\n\\n- (중단서비스) 자료신청, 신청자료 다운로드\\n- (중단기간) 2020. 9. 29.(화) 14시 ~ 10. 8.(목) 18시\\n\\n서비스 이용에 불편을 드린 점에 대해서는 다시 한번 양해를 부탁 드리며 앞으로 SGIS 서비스 개선을 위해 더욱 노력하겠습니다.'); location.href='/contents/shortcut/shortcut_05_02.jsp'; </script> ");

    if(loginYn.equals("N")) {
    	out.println("<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>");
    	out.println("<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='ko' lang='ko'>");
    	out.println("<head>");
    	out.println("<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />");
    	out.println("<title>센서스 공간통계 자료 다운로드:통계지리 정보서비스</title>");
    	out.println("</head>");
    	out.println("<body>");
        out.println("<script type='text/javascript'> alert('로그인 후 이용할 수 있습니다.'); location.href='/view/member/login_new?returnPage=//sgis.kostat.go.kr/contents/shortcut/shortcut_05_01.jsp'; </script> ");
    } else {

    GeneralBroker broker = null;

  RecordModel rm = null;
  RecordModel rm1 = null;
  RecordModel rm2 = null;
  RecordModel rm3 = null;

    String leftMenu="shortcut";

    String sgis_census_info_word = "";
    String sgis_census_return_call = "";

    try {

        broker = new GeneralBroker("ceaa00");

        /***************************/
        /* 안내문 자료 */
        /***************************/
        lData.setString("PARAM","INFORMATION");
        rm1 = broker.getList(lData);

                        if(rm1.next()) {
                            sgis_census_info_word = StringUtil.toLine(StringUtil.verify((String)rm1.get("sgis_census_info_word")));
                            sgis_census_return_call = StringUtil.toLine(StringUtil.verify((String)rm1.get("sgis_census_return_call")));
                        }

    } catch (IllegalArgumentException e) {
		System.out.println("입력값 오류가 발생하였습니다.");
	} catch(Exception e) {
        System.out.print("sgisWebError : ");
      //2015-12-03 시큐어코딩
      //e.printStackTrace();
      //logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
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
		
		<script type="text/javascript" language="javascript" src="/contents/scripts/common.js"></script>
		<script type="text/javascript" language="javascript" src="/contents/scripts/javascript.js"></script>
		<script type="text/javascript" language="javascript" src="/contents/support/support.js"></script>
		<script type="text/javascript" language="javascript" src="/contents/scripts/flash.js"></script>
		
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/common.css"/>
		<!--알림마당 컨텐츠 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/contents.css"/>
		<!--게시판 css 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/board.css"/>
		<title>자료제공|통계지리정보서비스</title>
		<script type="text/javascript">
			$(document).ready(function() {
				srvLogWrite("A0", "14", "04", "06", "", "");
			});
			
			var menuType = 'sc0501';
			function census_download(num,a,b) {
			    var fm=document.censusFm;
			    fileDownload(a,b);
			}
		</script>
		<style>
		.dtbefore:before{background-color: none;}
		
		/*mng_s 20200723 이진호 / 자료제공 서비스 개편, location 마지막 꺽쇠 제거 */
		#title-area .location li:nth-child(3):after {
			content : none;
		}
		/*mng_e 20200723 이진호*/
		</style>
	</head>

	<body>
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
				<!-- mng_e 20200721 이진호 -->
				
				<div id="content">
					<div id="title-area">
						<ul class="location">
						<!-- 190313 방민정 수정 시작 -->
							<li><a href="/view/view/index"><img src="/images/common/location_home.gif"/></a></li>
							<!-- mng_s 20200721 이진호 / 자료제공 서비스 개편 -->
							<li><a href="/contents/shortcut/shortcut_05_02.jsp">자료제공</a></li>
							<!-- <li><a href="/contents/shortcut/shortcut_05_02.jsp">자료신청 서비스</a></li> -->
							<li><a href="/contents/shortcut/shortcut_05_01.jsp"><em>신청자료 다운로드</em></a></li>
							<!-- mng_e 20200721 이진호 -->
							
						<!-- 190313 방민정 수정 끝 -->
						</ul>
						
						<!-- mng_s 20200721 이진호 / 자료제공 서비스 개편 -->
						<!--<h1 class="sub-title">센서스 공간 통계 자료신청 내역</h1> -->
						<h1 class="sub-title">센서스 공간 통계 신청자료 다운로드</h1>
						<!-- mng-e 20200721 이진호 -->
						
					</div>
					<div id="contents" class="view">
						<!--view-->
						<div class="header-infor">
							<div class="box">
								<div class="edge-top"></div>
								<div class="icon type-resources">
									<h3>신청자료에 대한 자세한 내용은 아래문서 참조</h3>
									<ul>
										<li><a href="/upload/census/GIS_statistics_guid.zip">공간통계자료제공 안내</a></li>
										<li><a href="/upload/census/SOP_prj_utmk.zip">자료제공에서 사용되는 죄표계</a></li>
									</ul>
								</div>
								<div class="infor-notice">
									<h3>참고사항</h3>
									<dl class="notes">
										<dt>지리정보 기준시점 </dt> <dd>: 기준년도 12월 31일</dd>
										<dt>지리정보 좌표계</dt><dd>: UTM-K(GRS80타원체)</dd>
										<dt>서비스 제한 기준 </dt><dd>: 집계구별 5미만 통계값 서비스제외 ( 총괄항목은 미적용 )</dd>
										<dt>공간정보 활용</dt><dd>: 통계청에서 제공하는 공간정보 활용을 위해 QGIS 다운로드 링크제공</dd>
										<dd style="position:absolute;left:190px;top:143px;">QGIS 다운로드 링크제공 : <a href="javascript:goExternalUrlLink('https://www.qgis.org/ko/site/');">https://www.qgis.org/ko/site/</a></dd>
									</dl>
								</div>
								<div class="infor-notice type02">
									<h3>SGIS 서비스 이용시 유의사항</h3>
									<ul class="notes">
									<li>SGIS에서 제공하는 센서스 통계는 일부 특별조사구와 외국인, 개인운수업등의 자료를 제외하고 최신 경계를 반영하기 때문에
										KOSIS등 공표된 통계와 차이가 있습니다. 아래 사항을 유의하여 SGIS서비스를 이용하시기 바랍니다.</li>
									</ul>
								</div>
								<dl class= "infor-notice bottom">
									<dt>1. 제외된 자료</dt>
									<dd>인구/가구/주택 센서스 : 해외주재공관, 교도소 및 소년원, 군부대,전투경찰대, 의무소방대 등의 특별 조사구와 외국인</dd>
									<dd>사업체 센서스 : 개인운수업(사업장이 일정치 않음)</dd>
									<dt>2. 최신 경계 반영에 따른 차이</dt>
									<dd>SGIS는 최신 행정구역 경계에 맞추어 서비스함에 따라 KOSIS 자료와다를 수 있음</dd>
									<dt>3. 2015년 이 후 자료신청 특이사항</dt><!-- 190312 방민정 수정 -->
									<dd>2015년 이 후 자료신청 항목중 교육정도별 인구, 성/혼인상태별 인구, 점유형태별 가구는 자료신청 항목에서 제외되었습니다.(2015년 이 후 인구주택총조사 전수조사에서 제외됨)</dd><!-- 190312 방민정 수정 -->
									<dt>4. 압축해제</dt>
									<dd>윈도우 기본 압축 프로그램으로 압축 풀기가 안될 경우 무료 압축 프로그램을 설치 후 압축해제해 주시기 바랍니다.</dd>
								</dl>
								<div class="edge-bot"></div>
							</div>
						</div>
						<h2>다운로드	<span class="code-button"> <!--190307 방민정수정 <a href="/upload/census/ref_code.zip">--><a href="/contents/include/download.jsp?filename=ref_code.zip&path=/board/&type=board"><span>코드표 및 이용설명서 </span></a> </span></h2>
						<div class="table-type" style="margin-bottom: 25px;">
							<form name="censusFm" method="post">
								<input type="hidden" name="filename" value="" />
								<input type="hidden" name="path" value="" />
								<table class="table-style type01">
									<caption>통계자료 테이블</caption>
									<colgroup>
										<col style="width:150px;">
										<col style="width:230px;">
										<col style="width:125px;">
										<col style="width:125px;">
										<col style="width:150px;">
									</colgroup>
									<thead>
										<tr>
											<th class="first">자료구분</th>
											<th>대상자료명</th>
											<th>게시시작일</th>
											<th>게시종료일자</th>
											<th class="last">다운로드</th>
										</tr>
									</thead>
									<tbody>
<%
    try {
        broker = new GeneralBroker("ceaa00");
        int totCount=0;

        lData.setString("PARAM", "CENSUS_DOWN_DATA");
        lData.setString("sc_userkey", sc_userkey);

        rm =  broker.getList(lData);
        totCount = rm.getRowCount();
        
        // 2017. 11. 09 [개발팀] 추가 및 변경 START
		int rowcnt = 0 ;
		
		String tempReqId = "";
		String tempReqTxtName = "";
		String tempZipfilePath = "";
		String tempZipfileName = "";
		String tempCensusName = "";
		String tempReqYear = "";
		String tempReqStartYear = "";
		String tempReqEndYear = "";
		String tempCntReqId = "";
		
		List loadDownDataList = new ArrayList();
		
		while(rm != null && rm.next()) {
			Map tempDataMap = new HashMap();
			
			String sgis_census_req_id 	= String.valueOf((BigDecimal)rm.get("sgis_census_req_id"));
			String sgis_census_id 		= String.valueOf((BigDecimal)rm.get("sgis_census_id"));
			String sgis_census_data_id 	= String.valueOf((BigDecimal)rm.get("sgis_census_data_id"));
			String sgis_census_name 		= StringUtil.verify((String)rm.get("sgis_census_code_name"));
			String sgis_census_data_name 	= StringUtil.verify((String)rm.get("sgis_census_data_name"));
			String sgis_census_req_year 	= StringUtil.verify((String)rm.get("sgis_census_req_year"));
			String sgis_census_req_y_s_d 	= StringUtil.verify((String)rm.get("sgis_census_req_y_s_d"));
			String sgis_census_req_y_e_d 	= StringUtil.verify((String)rm.get("sgis_census_req_y_e_d"));
			String sgis_census_dir 		= StringUtil.verify((String)rm.get("sgis_census_dir"));
			String sgis_census_file 		= StringUtil.verify((String)rm.get("sgis_census_file"));
			
			String sgis_census_detail_data_id = StringUtil.verify((String)rm.get("sgis_census_detail_data_id"));
			String sgis_census_detail_data_nm = StringUtil.verify((String)rm.get("sgis_census_detail_data_nm"));
			String zipfile_path = StringUtil.verify((String)rm.get("zipfile_path"));
			String zipfile_name = StringUtil.verify((String)rm.get("zipfile_name"));
			String cnt_req_id 	= String.valueOf((Integer)rm.get("cnt_req_id"));
			
			// 통계자료의 경우 여러개의 텍스트 파일에 대한 정보를 보여줘야 함에 따라 이전 요청 id 를 저장
			if("".equals(tempReqId)) {
				tempReqId = sgis_census_req_id;
			}
			
			// 마지막 row 일 경우 임시 저장된 항목을 LIST 에 저장
			//if((totCount - 1) == rm.getCurrentIndex() && tempReqTxtName.length() > 1  ) { 
			//mng_s 20180518 tempReqTxtName.length() > 1 이 조건을 왜 넣었는지 파악이 않됨. //신청건이 1개 일경우 이 조건은 무조건 false여서 다운로드 리스트가 보이지 않는다. //그래서 아래처럼 하긴 했는데 왜  이 조건을 넣었는지 모름
			if((totCount - 1) == rm.getCurrentIndex()   ) {
				
				if(sgis_census_req_id.equals(tempReqId) && ( sgis_census_id.equals("1") || sgis_census_id.equals("4") )   ) {
					tempReqTxtName += sgis_census_req_year + "년 " + sgis_census_detail_data_nm + "</br>";
					tempZipfilePath = zipfile_path;
					tempZipfileName = zipfile_name;
					tempCensusName += sgis_census_name + "</br>";
					
					tempReqId = sgis_census_req_id;
				}
				
				tempDataMap.put("sgis_census_req_id", tempReqId);
				tempDataMap.put("sgis_census_id", sgis_census_id);
				tempDataMap.put("sgis_census_data_id", sgis_census_data_id);
				tempDataMap.put("sgis_census_name", tempCensusName);
				
				if(tempReqTxtName.equals("")) {
					tempDataMap.put("sgis_census_data_name", sgis_census_req_year + "년 " + sgis_census_detail_data_nm);
				} else {
					tempDataMap.put("sgis_census_data_name", tempReqTxtName);
				}
				
				if(tempZipfilePath.equals("")) {
					tempDataMap.put("sgis_census_req_year", sgis_census_req_year);
					tempDataMap.put("sgis_census_req_y_s_d", sgis_census_req_y_s_d);
					tempDataMap.put("sgis_census_req_y_e_d", sgis_census_req_y_e_d);
					
				} else {
					tempDataMap.put("sgis_census_req_year", tempReqYear);
					tempDataMap.put("sgis_census_req_y_s_d", tempReqStartYear);
					tempDataMap.put("sgis_census_req_y_e_d", tempReqEndYear);
					
				}
				
				if(tempZipfilePath.equals("")) {
					tempDataMap.put("sgis_census_dir", zipfile_path);
					tempDataMap.put("sgis_census_file", zipfile_path + zipfile_name);
					tempDataMap.put("short_sgis_census_file", StringUtil.toShortenStringB(zipfile_name,15));
				} else {
					tempDataMap.put("sgis_census_dir", tempZipfilePath);
					tempDataMap.put("sgis_census_file", tempZipfilePath + tempZipfileName);
					tempDataMap.put("short_sgis_census_file", StringUtil.toShortenStringB(tempZipfileName,15));
				}
				
				loadDownDataList.add(tempDataMap);
				
				tempReqId = sgis_census_req_id;
				tempReqTxtName = "";
				tempZipfilePath = "";
				tempZipfileName = "";
				tempCensusName = "";
				
				tempDataMap = new HashMap();
				
				tempCntReqId = cnt_req_id;
			}
			
			// 임시 저장된 요청 id 와 다를 경우 임시 저장한 통계자료 정보를 LIST 에 저장
			//mng_s 20180518 tempReqTxtName.length() > 1 이 조건을 왜 넣었는지 파악이 않됨. 
			//if(!sgis_census_req_id.equals(tempReqId) && tempReqTxtName.length() > 1) {
			if(!sgis_census_req_id.equals(tempReqId)) {
			
				boolean flag_add = true;
				if("1".equals(tempCntReqId)) {
					String sgis_census_req_id_list = "";
					
					for(int i = 0; i < loadDownDataList.size(); i++) {
						Map tempMap = (Map) loadDownDataList.get(i);
						sgis_census_req_id_list = (String) tempMap.get("sgis_census_req_id");
						
						if(sgis_census_req_id_list.equals(tempReqId)) {
							//flag_add = false;
						}
						System.out.println("[shortcut_05_01.jsp] tempReqId [" + tempReqId + "] sgis_census_req_id_list [" + sgis_census_req_id_list +"] flag_add [" + flag_add);
					}
				}
				
				
				
					tempDataMap.put("sgis_census_req_id", tempReqId);
					tempDataMap.put("sgis_census_id", sgis_census_id);
					tempDataMap.put("sgis_census_data_id", sgis_census_data_id);
					tempDataMap.put("sgis_census_name", tempCensusName);
					
					if(tempReqTxtName.equals("")) {
						tempDataMap.put("sgis_census_data_name", sgis_census_req_year + "년 " + sgis_census_detail_data_nm);
					} else {
						tempDataMap.put("sgis_census_data_name", tempReqTxtName);
					}
					
					if(tempZipfilePath.equals("")) {
						tempDataMap.put("sgis_census_req_year", sgis_census_req_year);
						tempDataMap.put("sgis_census_req_y_s_d", sgis_census_req_y_s_d);
						tempDataMap.put("sgis_census_req_y_e_d", sgis_census_req_y_e_d);
						
					} else {
						tempDataMap.put("sgis_census_req_year", tempReqYear);
						tempDataMap.put("sgis_census_req_y_s_d", tempReqStartYear);
						tempDataMap.put("sgis_census_req_y_e_d", tempReqEndYear);
						
					}
					
					
					if(tempZipfilePath.equals("")) {
						tempDataMap.put("sgis_census_dir", zipfile_path);
						tempDataMap.put("sgis_census_file", zipfile_path + zipfile_name);
						tempDataMap.put("short_sgis_census_file", StringUtil.toShortenStringB(zipfile_name,15));
						
					} else {
						tempDataMap.put("sgis_census_dir", tempZipfilePath);
						tempDataMap.put("sgis_census_file", tempZipfilePath + tempZipfileName);
						tempDataMap.put("short_sgis_census_file", StringUtil.toShortenStringB(tempZipfileName,15));
						
					}
					
					if(flag_add) {
						loadDownDataList.add(tempDataMap);
					}
					
					tempReqId = sgis_census_req_id;
					tempReqTxtName = "";
					tempZipfilePath = "";
					tempZipfileName = "";
					tempCensusName = "";
					
					tempReqYear = "";
					tempReqStartYear = "";
					tempReqEndYear = "";
					
					tempCntReqId = cnt_req_id;
					
					tempDataMap = new HashMap();
			} else {
				tempReqId = sgis_census_req_id;
				tempReqYear = sgis_census_req_year;
				tempReqStartYear = sgis_census_req_y_s_d;
				tempReqEndYear = sgis_census_req_y_e_d;
				
				tempCntReqId = cnt_req_id;

			}
			
			// 같은 요청 id 에 한하여 통계자료, 세종시 통계자료 요청일 경우 요청한 텍스트 파일명을 모두 저장, 동적 압축파일의 경로와 이름은 동일하므로 저장하여 놓는다
            
            // 2018. 01. 29 이전 신청 내역의 경우 분기처리
            // if(tempIntVal > 4468 값은 해당 DB 의 소스 적용 시점의 MAX(sgis_census_req_id) 값으로 변경 필요
            int tempIntVal = Integer.parseInt(sgis_census_req_id);
			
			if(sgis_census_req_id.equals(tempReqId) && (sgis_census_id.equals("1") || sgis_census_id.equals("4"))) {
				
				System.out.println("[shortcut_05_01.jsp] sgis_census_req_id [" + sgis_census_req_id + "] tempReqId [" + tempReqId +"] cnt_req_id [" + cnt_req_id);
				System.out.println("[shortcut_05_01.jsp] loadDownDataList.size() [" + loadDownDataList.size());
				
				if((totCount - 1) == rm.getCurrentIndex()  && "1".equals(cnt_req_id)  && totCount > 1 ) {
				//if(false) { //한건씩 신청을 여러번 했을 경우 마지막 신청건이 않보이는 문제해결
					//mng_s 20180808 한건씩 신청을 여러번 했을 경우 위에서 loadDownDataList 여기에 추가 될 경우에 이미 추가가 되어 있으면 추가 하지 않게 체크한다.
					String sgis_census_req_id_list = "";
					boolean flag_add = true;
					for(int i = 0; i < loadDownDataList.size(); i++) {
						Map tempMap = (Map) loadDownDataList.get(i);
						sgis_census_req_id_list = (String) tempMap.get("sgis_census_req_id");
						
						if(sgis_census_req_id_list.equals(sgis_census_req_id)) {
							flag_add = false;
						}
						System.out.println("[shortcut_05_01.jsp] sgis_census_req_id [" + sgis_census_req_id + "] sgis_census_req_id_list [" + sgis_census_req_id_list +"] flag_add [" + flag_add);
					}
					
					if(flag_add) {
					
						tempReqTxtName += sgis_census_req_year + "년 " + sgis_census_detail_data_nm + "</br>";
						tempZipfilePath = zipfile_path;
						tempZipfileName = zipfile_name;
						tempCensusName += sgis_census_name + "</br>";
						
						tempDataMap.put("sgis_census_req_id", tempReqId);
						tempDataMap.put("sgis_census_id", sgis_census_id);
						tempDataMap.put("sgis_census_data_id", sgis_census_data_id);
						tempDataMap.put("sgis_census_name", tempCensusName);
						
						if(tempReqTxtName.equals("")) {
							tempDataMap.put("sgis_census_data_name", sgis_census_req_year + "년 " + sgis_census_detail_data_nm);
						} else {
							tempDataMap.put("sgis_census_data_name", tempReqTxtName);
						}
						
						
						tempDataMap.put("sgis_census_req_year", tempReqYear);
						tempDataMap.put("sgis_census_req_y_s_d", tempReqStartYear);
						tempDataMap.put("sgis_census_req_y_e_d", tempReqEndYear);
						
						if(tempZipfilePath.equals("")) {
							tempDataMap.put("sgis_census_dir", zipfile_path);
							tempDataMap.put("sgis_census_file", zipfile_path + zipfile_name);
							tempDataMap.put("short_sgis_census_file", StringUtil.toShortenStringB(zipfile_name,15));
						} else {
							tempDataMap.put("sgis_census_dir", tempZipfilePath);
							tempDataMap.put("sgis_census_file", tempZipfilePath + tempZipfileName);
							tempDataMap.put("short_sgis_census_file", StringUtil.toShortenStringB(tempZipfileName,15));
						}
						
						loadDownDataList.add(tempDataMap);
					}
					tempReqId = sgis_census_req_id;
					
					tempCntReqId = cnt_req_id;
					tempReqYear = sgis_census_req_year;
					tempReqStartYear = sgis_census_req_y_s_d;
					tempReqEndYear = sgis_census_req_y_e_d;
				
				} else {
				
					tempReqTxtName += sgis_census_req_year + "년 " + sgis_census_detail_data_nm + "</br>";
					tempZipfilePath = zipfile_path;
					tempZipfileName = zipfile_name;
					tempCensusName += sgis_census_name + "</br>";
					
					tempReqId = sgis_census_req_id;
					
					
					tempReqYear = sgis_census_req_year;
					tempReqStartYear = sgis_census_req_y_s_d;
					tempReqEndYear = sgis_census_req_y_e_d;
					
					tempCntReqId = cnt_req_id;
				
					continue;
				}
				
			}
			
			// 경계 요청일 경우 LIST 에 바로 저장한다
			//else if(!sgis_census_id.equals("1") && !sgis_census_id.equals("4")) {
			else if(sgis_census_id.equals("2")) { //2이면 통계지역경계 20180131 김준하
				tempDataMap.put("sgis_census_req_id", sgis_census_req_id);
				tempDataMap.put("sgis_census_id", sgis_census_id);
				tempDataMap.put("sgis_census_data_id", sgis_census_data_id);
				tempDataMap.put("sgis_census_name", sgis_census_name);
				tempDataMap.put("sgis_census_data_name", sgis_census_req_year + "년 " + sgis_census_data_name);
				tempDataMap.put("sgis_census_req_year", sgis_census_req_year);
				tempDataMap.put("sgis_census_req_y_s_d", sgis_census_req_y_s_d);
				tempDataMap.put("sgis_census_req_y_e_d", sgis_census_req_y_e_d);
				tempDataMap.put("sgis_census_dir", sgis_census_dir);
				tempDataMap.put("sgis_census_file", sgis_census_dir + "/" + sgis_census_file);
				tempDataMap.put("short_sgis_census_file", StringUtil.toShortenStringB(sgis_census_file,15));
				
				loadDownDataList.add(tempDataMap);
			}
            // 2018. 01. 29 이전 신청 내역의 경우 분기처리
            else if(sgis_census_id.equals("1") || sgis_census_id.equals("4")) {
            	
				tempDataMap.put("sgis_census_req_id", sgis_census_req_id);
				tempDataMap.put("sgis_census_id", sgis_census_id);
				tempDataMap.put("sgis_census_data_id", sgis_census_data_id);
				tempDataMap.put("sgis_census_name", sgis_census_name);
				tempDataMap.put("sgis_census_data_name", sgis_census_req_year + "년 " + sgis_census_data_name);
				tempDataMap.put("sgis_census_req_year", sgis_census_req_year);
				tempDataMap.put("sgis_census_req_y_s_d", sgis_census_req_y_s_d);
				tempDataMap.put("sgis_census_req_y_e_d", sgis_census_req_y_e_d);
				tempDataMap.put("sgis_census_dir", sgis_census_dir);
				tempDataMap.put("sgis_census_file", sgis_census_dir + "/" + sgis_census_file);
				tempDataMap.put("short_sgis_census_file", StringUtil.toShortenStringB(sgis_census_file,15));
				
				loadDownDataList.add(tempDataMap);
			}
		} //end of while
		
		// LIST 에 저장된 내용을 화면에 표출
		for(int i = 0; i < loadDownDataList.size(); i++) { //20180806 김준하 loadDownDataList.size()의 값이 이상하여 주정함. 추후 side effect가 있을 경우 수정 요망
			
			Map tempMap = (Map) loadDownDataList.get(i);
			String sgis_census_req_id = (String) tempMap.get("sgis_census_req_id");
			
			String sgis_census_id = (String) tempMap.get("sgis_census_id");
			String sgis_census_data_id = (String) tempMap.get("sgis_census_data_id");
			
			String sgis_census_name = (String) tempMap.get("sgis_census_name");
			String sgis_census_data_name = (String) tempMap.get("sgis_census_data_name");
			String sgis_census_req_year = (String) tempMap.get("sgis_census_req_year");
			String sgis_census_req_y_s_d = (String) tempMap.get("sgis_census_req_y_s_d");
			String sgis_census_req_y_e_d = (String) tempMap.get("sgis_census_req_y_e_d");
			String sgis_census_file = (String) tempMap.get("sgis_census_file");
			String short_sgis_census_file = (String) tempMap.get("short_sgis_census_file");
			//String cnt_req_id = (String) tempMap.get("cnt_req_id");
			
			
			System.out.println("[shortcut_05_01.jsp] 경계요청 sgis_census_req_id [" + sgis_census_req_id + "] tempReqId [" + tempReqId +"] ");
			System.out.println("[shortcut_05_01.jsp] 경계요청 loadDownDataList.size() [" + loadDownDataList.size());
			
			// 2017. 11. 09 [개발팀] 추가 및 변경 END
				//if(sgis_census_req_id != null) {
				if(sgis_census_req_id != null && !"".equals(sgis_census_name)) { //mng_s 20190315 자료구분이 ""일 경우 표출되지 않도록 수정
%>
										<tr>
											<td class="first"><%=sgis_census_name %></td>
											<td class="docu-title"><%=sgis_census_data_name %></td>
											<td><%=sgis_census_req_y_s_d %></td>
											<td><%=sgis_census_req_y_e_d %></td>
											
											<!-- <td class="last"><a href="#" class="notice-dl" alt="다운로드"></a></td> -->
											
											<td class="last">
											<%
									            if("/census/data/bas_cntr/bas_cntr_00_2013.egg".equals( sgis_census_file ) ) { //bas_cntr_00_2013.egg파일이 4기가 여서 다운이 않되 분할 링크를 검
									        %>
									        	<a href="shortcut_05_01_01.jsp?sgis_census_req_id=<%=sgis_census_req_id %>&amp;sgis_census_id=<%=sgis_census_id %>&amp;sgis_census_data_id=<%=sgis_census_data_id %>&amp;sgis_census_req_year=<%=sgis_census_req_year %>" onclick="census_download('<%=rowcnt %>',censusFm,'/census/data/bas_cntr/bas_cntr_00_2013.vol1.egg'); return false;">bas_cntr_00_2013.vol1.egg</a><br />
												<a href="shortcut_05_01_01.jsp?sgis_census_req_id=<%=sgis_census_req_id %>&amp;sgis_census_id=<%=sgis_census_id %>&amp;sgis_census_data_id=<%=sgis_census_data_id %>&amp;sgis_census_req_year=<%=sgis_census_req_year %>" onclick="census_download('<%=rowcnt %>',censusFm,'/census/data/bas_cntr/bas_cntr_00_2013.vol2.egg'); return false;">bas_cntr_00_2013.vol2.egg</a><br />
												<a href="shortcut_05_01_01.jsp?sgis_census_req_id=<%=sgis_census_req_id %>&amp;sgis_census_id=<%=sgis_census_id %>&amp;sgis_census_data_id=<%=sgis_census_data_id %>&amp;sgis_census_req_year=<%=sgis_census_req_year %>" onclick="census_download('<%=rowcnt %>',censusFm,'/census/data/bas_cntr/bas_cntr_00_2013.vol3.egg'); return false;">bas_cntr_00_2013.vol3.egg</a><br />
												<a href="shortcut_05_01_01.jsp?sgis_census_req_id=<%=sgis_census_req_id %>&amp;sgis_census_id=<%=sgis_census_id %>&amp;sgis_census_data_id=<%=sgis_census_data_id %>&amp;sgis_census_req_year=<%=sgis_census_req_year %>" onclick="census_download('<%=rowcnt %>',censusFm,'/census/data/bas_cntr/bas_cntr_00_2013.vol4.egg'); return false;">bas_cntr_00_2013.vol4.egg</a><br />
												<a href="shortcut_05_01_01.jsp?sgis_census_req_id=<%=sgis_census_req_id %>&amp;sgis_census_id=<%=sgis_census_id %>&amp;sgis_census_data_id=<%=sgis_census_data_id %>&amp;sgis_census_req_year=<%=sgis_census_req_year %>" onclick="census_download('<%=rowcnt %>',censusFm,'/census/data/bas_cntr/bas_cntr_00_2013.vol5.egg'); return false;">bas_cntr_00_2013.vol5.egg</a><br />
												<a href="shortcut_05_01_01.jsp?sgis_census_req_id=<%=sgis_census_req_id %>&amp;sgis_census_id=<%=sgis_census_id %>&amp;sgis_census_data_id=<%=sgis_census_data_id %>&amp;sgis_census_req_year=<%=sgis_census_req_year %>" onclick="census_download('<%=rowcnt %>',censusFm,'/census/data/bas_cntr/bas_cntr_00_2013.vol6.egg'); return false;">bas_cntr_00_2013.vol6.egg</a><br />
												<a href="shortcut_05_01_01.jsp?sgis_census_req_id=<%=sgis_census_req_id %>&amp;sgis_census_id=<%=sgis_census_id %>&amp;sgis_census_data_id=<%=sgis_census_data_id %>&amp;sgis_census_req_year=<%=sgis_census_req_year %>" onclick="census_download('<%=rowcnt %>',censusFm,'/census/data/bas_cntr/bas_cntr_00_2013.vol7.egg'); return false;">bas_cntr_00_2013.vol7.egg</a><br />
												<a href="shortcut_05_01_01.jsp?sgis_census_req_id=<%=sgis_census_req_id %>&amp;sgis_census_id=<%=sgis_census_id %>&amp;sgis_census_data_id=<%=sgis_census_data_id %>&amp;sgis_census_req_year=<%=sgis_census_req_year %>" onclick="census_download('<%=rowcnt %>',censusFm,'/census/data/bas_cntr/bas_cntr_00_2013.vol8.egg'); return false;">bas_cntr_00_2013.vol8.egg</a>
											<%
												} else {
											%>
												<a href="shortcut_05_01_01.jsp?sgis_census_req_id=<%=sgis_census_req_id %>&amp;sgis_census_id=<%=sgis_census_id %>&amp;sgis_census_data_id=<%=sgis_census_data_id %>&amp;sgis_census_req_year=<%=sgis_census_req_year %>" onclick="census_download('<%=rowcnt %>',censusFm,'<%=sgis_census_file%>'); return false;"><%=short_sgis_census_file %></a>
											<%
								            	}
								            %>
								            	<input type="hidden" name="sgis_census_req_id" value="<%=sgis_census_req_id %>" />
								            	<input type="hidden" name="sgis_census_id" value="<%=sgis_census_id %>" />
								            	<input type="hidden" name="sgis_census_data_id" value="<%=sgis_census_data_id %>" />
								            	<input type="hidden" name="sgis_census_req_year" value="<%=sgis_census_req_year %>" />
											</td>
										</tr>
<% }//end of if %>
<% rowcnt++; } %>
							<%if(rowcnt == 0) {%>
							<tr>
								<th colspan="5">데이터가 존재하지 않습니다.</th>
							</tr>
							<%} %>

<% } catch(IllegalArgumentException e) {
	System.out.println("다운로드데이터 조회 에러");
}
%>
									</tbody>
								</table>
							</form>
						</div>
						<ul class="question">
							<!-- 20210913 김건민 (자료제공 담당자 이메일 변경 요청이 있어서 변겅함.) -->
							<li>
								<strong>문의사항연락처&nbsp;&nbsp;&nbsp;:</strong> <span>Tel : 042-481-2438</span>Email : kingstars@korea.kr
							</li>
							<!-- 20210913 김건민  -->
						</ul>
						<!--//view-->
					</div>
				</div>
			</div>
			<footer id="footer"> 
				<jsp:include page="/view/common/includeBottom"></jsp:include> 
			</footer>
		</div> 
<%} %>
	</body>
</html>