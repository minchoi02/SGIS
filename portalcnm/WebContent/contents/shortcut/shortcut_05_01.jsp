<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<%@ page import="org.apache.commons.lang.StringEscapeUtils"     %>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%
    if(loginYn.equals("N")) {
    	out.println("<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>");
    	out.println("<html xmlns='http://www.w3.org/1999/xhtml'>");
    	out.println("<head>");
    	out.println("<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />");
    	out.println("<title>센서스 공간통계 자료 다운로드:통계지리 정보서비스</title>");
    	out.println("</head>");
    	out.println("<body>");
        out.println("<script type='text/javascript'> alert('로그인 후 이용할 수 있습니다.'); history.back(); </script> ");
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

    } catch(Exception e) {
        System.out.print("sgisWebError : ");
		e.printStackTrace();
    }
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="format-detection" content="telephone=no" /><!-- 전화번호 자동 링크 생성 방지 --> 
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
		<title>SGIS 통계지리정보서비스</title> 
		<link rel="stylesheet" href="/contents/css/2014_css/css/default.css" />   
		<script type="text/javascript" src="/contents/css/2014_css/js/jquery-1.11.0.min.js"></script> 
		<script type="text/javascript" src="/contents/css/2014_css/js/default.js"></script> 
		
	<script type="text/javascript" language="javascript" src="/contents/scripts/common.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/scripts/javascript.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/support/support.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/scripts/flash.js"></script>
			
	
	<script type="text/javascript" language="javascript">
	//<![CDATA[
	function census_download(num,a,b) {
	    var fm=document.censusFm;
	    /* //- 2010.01.08 다운로드 카운팅 증가 임시제거 -//
		if (num == "0") {
	        //downloadIfr.location.href="/contents/include/download.jsp?filename="+fm.filename.value+ "&path=/census/";
	        downcountIfr.location.href="shortcut_05_01_01.jsp?sgis_census_req_id="+fm.sgis_census_req_id.value+"&sgis_census_id="+fm.sgis_census_id.value+"&sgis_census_data_id="+fm.sgis_census_data_id.value+"&sgis_census_req_year="+fm.sgis_census_req_year.value;
	    }else{
	        downcountIfr.location.href="shortcut_05_01_01.jsp?sgis_census_req_id="+fm.sgis_census_req_id[num].value+"&sgis_census_id="+fm.sgis_census_id[num].value+"&sgis_census_data_id="+fm.sgis_census_data_id[num].value+"&sgis_census_req_year="+fm.sgis_census_req_year[num].value;
	    }
		*/
	    fileDownload(a,b);
	}
	//]]>

	</script>
	</head>

	<body>
		<div class="wrapper">
			<!-- cls:header start -->
			<div class="header"> 
			<!-- top -->
		  	<%@include file="/contents/include/header_2014.jsp" %>		<!-- 헤어 영역 -->
		  	<!-- /top -->			
  			</div><!-- cls:header end -->


			<!-- cls:contents start -->
			<div class="contents subbg">
				<div class="container">
					<div class="lnb">
						<%@include file="/contents/include/leftMenu_2014.jsp" %>
						<script type="text/javascript">
							$("#l05").attr("style", "display:block");		//left Menu에서 참여바당 부분 보여줌.
							$("#l051").attr("class", "on");					//공자사항 선택한 표시 해줌
							$("#l0514").attr("style", "background:#4e87b6; font-size:12px; color:#fff; ");	//서브메뉴 표시해줌
						</script>
					</div>
					
		<div class="acticle">
		
		<!-- 공간통계자료제공 -->
		<div class="location">
			<p><span class="on">자료다운로드</span> &lt; <span>자료신청</span> &lt; <span>공유마당</span> &lt; <span><a href="/">처음페이지</a></span></p>
		</div>
		<div class="subTitle">
			<p class="txt01">자료다운로드</p>
			<p class="txt02">통계지리정보서비스의 새로운 소식을 빠르게 전해 드립니다.</p>
		</div>
		<div class="use_wrap">	
				<div class="infoWrap" style="height:250px;">
					<div class="infoText">
						<ul>
							<li >제공자료에 대한 자세한 내용은 <span class="infoTexts">아래 문서</span> 참조</li>
							<li class="listS"><a href="/upload/census/2010_oa_statistics_guide.hwp" style="color:#0000FF">집계구별 통계자료 이용안내</a></li>
							<li class="listS"><a href="/upload/census/2010_GIS_statistics_guid.zip" style="color:#0000FF">공간통계자료제공 안내</a></li>
							<li class="listS"><a href="/upload/census/2010_oa_item_identifier_code.xls" style="color:#0000FF">2010년 집계구별 통계항목 코드</a></li>
							<li class="listS"><a href="/upload/census/SGIS_prj.zip" style="color:#0000FF">SGIS에서 사용되는 좌표계</a></li>
							<li class="listS"><a href="/upload/census/adm_code(2012).xls" style="color:#0000FF">SGIS 행정구역코드</a></li>
						</ul>
							<br/>
							<br/>
						<ul>
							<li>참고사항</li>
							<li class="listS">지리정보 기준시점 : 기준년도 12월31일</li>
							<li class="listS">지리정보 좌표계 : TM중부원점 (Bessel타원체)</li>
							<li class="listS">서비스 제한 기준 :  집계구별 5이하 통계값 서비스제외(총괄항목은 미적용)</li>
						</ul>
					</div>
				</div>
				
				<br />
				<div><a href="/upload/census/db_schema.hwp" style="color:#0000FF">* SGIS 통계지리정보서비스 DB Schema 다운로드</a></div>
							
				<div class="listTitle">다운로드</div>	
<form name="censusFm" method="post" action="">
  <input type="hidden" name="filename" value="" />
  <input type="hidden" name="path" value="" />							
				<table class="listTable">
				<caption>다운로드</caption>
					<tr>
						<th class="first">자료구분</th>
						<th>대상자료명</th>
						<th>요청년도</th>
						<th>게시시작일</th>
						<th>게시종료일자</th>
						<th class="last">다운로드</th>
					</tr>
<%
    try {
        broker = new GeneralBroker("ceaa00");
        int totCount=0;

        lData.setString("PARAM", "CENSUS_DOWN_DATA");
        lData.setString("sc_userkey", sc_userkey);

        rm =  broker.getList(lData);
        totCount = rm.getRowCount();
     
		int rowcnt = 0 ;
		while(rm != null && rm.next()) {
		String sgis_census_req_id 	= String.valueOf((BigDecimal)rm.get("sgis_census_req_id"));
		String sgis_census_id 		= String.valueOf((BigDecimal)rm.get("sgis_census_id"));
		String sgis_census_data_id 	= String.valueOf((BigDecimal)rm.get("sgis_census_data_id"));
		String sgis_census_name 		= StringUtil.verify((String)rm.get("sgis_census_code_name"));
		String sgis_census_data_name 	= StringUtil.verify((String)rm.get("sgis_census_data_name"));
		String sgis_census_req_year 	= StringUtil.verify((String)rm.get("sgis_census_req_year"));
		//String sgis_census_location = StringUtil.verify((String)rm.get("sgis_census_location"));
		String sgis_census_req_y_s_d 	= StringUtil.verify((String)rm.get("sgis_census_req_y_s_d"));
		String sgis_census_req_y_e_d 	= StringUtil.verify((String)rm.get("sgis_census_req_y_e_d"));
		String sgis_census_dir 		= StringUtil.verify((String)rm.get("sgis_census_dir"));
		String sgis_census_file 		= StringUtil.verify((String)rm.get("sgis_census_file"));
		
		//out.println("sgis_census_file [" + sgis_census_file + "]");
		
		String short_sgis_census_file = StringUtil.toShortenStringB(sgis_census_file,15);
		
		sgis_census_file = sgis_census_dir + "/" + sgis_census_file;
%>					
					<tr>
						<td><%=sgis_census_name %></td>
						<td><%=sgis_census_data_name %></td>
						<td><%=sgis_census_req_year %></td>
						<td><%=sgis_census_req_y_s_d %></td>
						<td><%=sgis_census_req_y_e_d %></td>
						<td title="<%//=sgis_census_file %>" align="left">
				            <a href="shortcut_05_01_01.jsp?sgis_census_req_id=<%=sgis_census_req_id %>&amp;sgis_census_id=<%=sgis_census_id %>&amp;sgis_census_data_id=<%=sgis_census_data_id %>&amp;sgis_census_req_year=<%=sgis_census_req_year %>" onclick="census_download('<%=rowcnt %>',censusFm,'<%=sgis_census_file%>'); return false;"><%=short_sgis_census_file %></a>
				            <input type="hidden" name="sgis_census_req_id" value="<%=sgis_census_req_id %>" />
				            <input type="hidden" name="sgis_census_id" value="<%=sgis_census_id %>" />
				            <input type="hidden" name="sgis_census_data_id" value="<%=sgis_census_data_id %>" />
				            <input type="hidden" name="sgis_census_req_year" value="<%=sgis_census_req_year %>" />
				        </td>
					</tr>
					  <% rowcnt++; } %>
					<%if(rowcnt == 0) {%>
            <tr>
              <th colspan="7">데이터가 존재하지 않습니다.</th>
            </tr>
      <%} %>  
					  
					  <% } catch(Exception e) {
        System.out.print("sgisWebError : ");
		e.printStackTrace();
}
%>
			</table>
			</form>
			<div class="inquiry">문의사항연락처: 042-481-2438,why1118@korea.kr</div>
      	</div>
		

		<!-- // 공간통계자료제공--> 
					<!-- center contents end -->
<br /><br />&nbsp;					
					</div>
					
				</div>
			</div><!-- cls:contents end -->
			<!-- cls:footer start -->
			<div class="footer">
				<%@include file="/contents/include/footer_2014.jsp" %>
			</div><!-- cls:footer end -->
		</div> 
		<%} %>
	</body>
</html>