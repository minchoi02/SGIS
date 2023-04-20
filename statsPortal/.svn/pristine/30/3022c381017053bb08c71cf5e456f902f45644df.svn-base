
<%@page import="java.sql.Date"%>
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
							<li><a href="/view/pss/dataProvdIntrcn">자료제공</a></li>
							<!-- <li><a href="/contents/shortcut/shortcut_05_02.jsp">자료신청 서비스</a></li> -->
							<li><a href="/view/pss/downloadList"><em>신청자료 다운로드</em></a></li>
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
										<col style="width:80px;">
										<col style="width:100px;">
										<col style="width:230px;">
										<col style="width:115px;">
										<col style="width:115px;">
										<col style="width:160px;">
									</colgroup>
									<thead>
										<tr>
											<th class="first">요청번호</th>
											<th >자료구분</th>
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

        lData.setString("PARAM", "CENSUS_DOWN_DATA2");
        lData.setString("sc_userkey", sc_userkey);

        rm =  broker.getList(lData);
        totCount = rm.getRowCount();
        
        // 2017. 11. 09 [개발팀] 추가 및 변경 START
		int rowcnt = 0 ;
		
		int newRow = -1;
		boolean flag = false;
		
		String tempReqId = "";
		
		String tempDataKind = "";
		String tempNm ="";
		String tempSY ="";
		String tempEY ="";
		String tempFileNm ="";
		String tempFilePath ="";
		String tempfileNameSh ="";
		String tempYear = "";
		String tempDitail = "";
		
		String tempCensusDataId = "";
		String tempCensusId = "";
		
		//ArrayList<Map> tempList = new  ArrayList<>();
		List<Map> tempList = new  ArrayList();		
		
		
		String checkVal = "-1";
		String checkVal2 = "-1";
		
		int i =0;
		
		
		while(rm != null && rm.next()) {
			
			String cntStr = String.valueOf((String)rm.get("cnt"));
			//int cnt =Integer.parseInt(cntStr);
			
			String sgis_census_req_id = String.valueOf((BigDecimal)rm.get("sgis_census_req_id"));
			String sgis_census_id = String.valueOf((BigDecimal)rm.get("sgis_census_id"));
			String sgis_census_data_id = String.valueOf((BigDecimal)rm.get("sgis_census_data_id"));
			
			
			
			String data_kind = String.valueOf((String)rm.get("data_kind"));
			String sgis_census_file_name = StringUtil.verify((String)rm.get("sgis_census_file_name"));
			String sgis_census_file_path = StringUtil.verify((String)rm.get("sgis_census_file_path"));
			String data_nm = StringUtil.verify((String)rm.get("data_nm"));
			
			
			
			String sgis_census_req_y_s_d 	= String.valueOf(rm.get("sgis_census_req_y_s_d"));
			String sgis_census_req_y_e_d 	= String.valueOf(rm.get("sgis_census_req_y_e_d"));
			String sgis_census_req_year 	= String.valueOf(rm.get("sgis_census_req_year"));
			String sgis_census_detail_data_id 	= String.valueOf(rm.get("sgis_census_detail_data_id"));
			
			
			String fileName = sgis_census_file_name.hashCode()+"";
			
			String subStr = "";
			String subTitle[] = sgis_census_detail_data_id.split("_");
			
			if(subTitle.length>1){
				if(!subTitle[0].equals("in") && !subTitle[0].equals("ho") && !subTitle[0].equals("ga") && !subTitle[0].equals("cp") && !subTitle[1].equals("NO") )
					subStr = " "+subTitle[0]+" " +subTitle[1];
			}
			
			if(checkVal.equals("-1")){
				checkVal  = sgis_census_req_id;
				checkVal2 = cntStr; 

				tempReqId = sgis_census_req_id;
				tempCensusId = sgis_census_id;
				tempDataKind = data_kind;
				tempNm = data_nm+subStr;
				tempSY = sgis_census_req_y_s_d;
				tempEY = sgis_census_req_y_e_d;
				tempFileNm = sgis_census_file_name;
				tempFilePath = sgis_census_file_path;
				tempfileNameSh = fileName;
				tempYear = sgis_census_req_year;
				tempCensusId = sgis_census_data_id;
				
				
				
			}else if(checkVal.equals(sgis_census_req_id) && checkVal2.equals(cntStr) && !cntStr.equals("1") ){
				
				tempNm += "<br/>"+data_nm+subStr;
				
			}else{
				
				
				Map tempDataMap = new HashMap();
				
				tempDataMap.put("reqId", tempReqId);
				tempDataMap.put("tempCensusId", tempCensusId);
				tempDataMap.put("tempDataKind", tempDataKind);
				tempDataMap.put("tempNm", tempNm);
				tempDataMap.put("tempSY", tempSY);
				tempDataMap.put("tempEY", tempEY);
				tempDataMap.put("tempFileNm", tempFileNm);
				tempDataMap.put("tempFilePath", tempFilePath);
				tempDataMap.put("tempfileNameSh", "다운로드");
				tempDataMap.put("tempYear", tempYear);
				tempDataMap.put("tempCensusId", tempCensusId);
				
				
				
				tempList.add(tempDataMap);
				checkVal = sgis_census_req_id;
				checkVal2 = cntStr; 
				
				tempReqId = sgis_census_req_id;
				tempCensusId = sgis_census_id;
				tempDataKind = data_kind;
				tempNm = data_nm+subStr;
				tempSY = sgis_census_req_y_s_d;
				tempEY = sgis_census_req_y_e_d;
				tempFileNm = sgis_census_file_name;
				tempFilePath = sgis_census_file_path;
				tempfileNameSh = fileName;
				tempYear = sgis_census_req_year;
				tempCensusId = sgis_census_data_id;
				
				
			}
			
			if(rm.getCurrentIndex() == rm.getRowCount()-1){
				
				
				Map tempDataMap = new HashMap();
				
				tempDataMap.put("reqId", tempReqId);
				tempDataMap.put("tempCensusId", tempCensusId);
				tempDataMap.put("tempDataKind", tempDataKind);
				tempDataMap.put("tempNm", tempNm);
				tempDataMap.put("tempSY", tempSY);
				tempDataMap.put("tempEY", tempEY);
				tempDataMap.put("tempFileNm", tempFileNm);
				tempDataMap.put("tempFilePath", tempFilePath);
				tempDataMap.put("tempfileNameSh", "다운로드");
				tempDataMap.put("tempYear", tempYear);
				tempDataMap.put("tempCensusId", tempCensusId);
				tempList.add(tempDataMap);
				
			}
			
		}
		
		
				//System.out.println(tempList.size());
				
		for (Map el : tempList) {
			
		%>
							<tr>
								<td class="first"><%=el.get("reqId") %></td>
								<td><%=el.get("tempDataKind") %></td>
								<td class="docu-title"><%=el.get("tempNm") %></td>
								<td><%=el.get("tempSY") %></td>
								<td><%=el.get("tempEY") %></td>
																<td class="last">
									<a href="shortcut_05_01_01.jsp?sgis_census_req_id=<%=el.get("reqId") %>&amp;sgis_census_id=<%=el.get("tempReqDataId") %>&amp;sgis_census_data_id=<%=el.get("tempCensusId") %>&amp;sgis_census_req_year=<%=el.get("tempYear") %>" onclick="census_download('<%=el.get("tempReqDataId") %>',censusFm,'<%=el.get("tempFilePath")%><%=el.get("tempFileNm")%>'); return false;"><%=el.get("tempfileNameSh") %></a>
					         	</td>
							</tr>
			<% } %>
						<% if(rm.getRowCount() <1){ %>
							<tr>
								<th colspan="5">데이터가 존재하지 않습니다.</th>
							</tr>
						<% } %>
<% 		} catch(IllegalArgumentException e) {
			System.out.println("다운로드데이터 조회 에러");
}%>
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