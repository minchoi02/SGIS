<%--
/*
    ********************************************************************
    * @source      : shortcut_07.jsp
    * @description : 서비스소개-자료제공목록
    ********************************************************************
    * DATE              AUTHOR         VERSION     DESCRIPTION
    * ---------- -------- ------- --------------------------------------         
    * 2009-10-08 정종세 수정       
    ********************************************************************
 */
--%>
<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>

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
    rm = broker.getList(lData);

    if(rm.next()) {
      sgis_census_info_word = StringUtil.verify(StringUtil.verify((String)rm.get("sgis_census_info_word")));
      sgis_census_return_call = StringUtil.toLine(StringUtil.verify((String)rm.get("sgis_census_return_call")));
    }
     sgis_census_info_word =   org.apache.commons.lang.StringEscapeUtils.unescapeHtml(sgis_census_info_word).replaceAll("<STRONG>", "<strong>");
     sgis_census_info_word =  org.apache.commons.lang.StringEscapeUtils.unescapeHtml(sgis_census_info_word).replaceAll("</STRONG>", "</strong>");

  } catch(Exception e) {
    out.print(e);
  }
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="format-detection" content="telephone=no" /><!-- 전화번호 자동 링크 생성 방지 --> 
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
		<title>센서스 공간통계 자료제공목록:통계지리 정보서비스</title> 
		<link rel="stylesheet" href="/contents/css/2014_css/css/default.css" />   
		<script type="text/javascript" src="/contents/css/2014_css/js/jquery-1.11.0.min.js"></script> 
		<script type="text/javascript" src="/contents/css/2014_css/js/default.js"></script> 
		
	<script type="text/javascript" language="javascript" src="/contents/scripts/common.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/scripts/javascript.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/support/support.js"></script>
	<script type="text/javascript" language="javascript" src="/contents/scripts/flash.js"></script>
	
	
	</head>

	<body>
		<noscript><p><a href="#">이 페이지에는 자바스크립트가 사용되었습니다.</a></p></noscript>	
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
							$("#l0512").attr("style", "background:#4e87b6; font-size:12px; color:#fff; ");	//서브메뉴 표시해줌
						</script>
					</div>
					
		<div class="acticle">
		
					<!-- center contents start -->
				<!-- 공간통계자료제공 -->
		<div class="location">
			<p><span class="on">자료제공 목록</span> &lt; <span>자료신청</span> &lt; <span>공유마당</span> &lt; <span><a href="/">처음페이지</a></span></p>
		</div>
		<div class="subTitle">
			<p class="txt01">자료제공 목록</p>
			<p class="txt02">통계자료, 통계지역경계, 센서스 지도를 제공합니다.</p>
		</div>
		<div class="use_wrap">	
				<div class="infoWrap">
					<div class="infoText">
							<br/>
						<ul>
							<li>참고사항</li>
							<li class="listS">지리정보 기준시점 : 기준년도 12월31일</li>
							<li class="listS">지리정보 좌표계 : TM중부원점 (Bessel타원체)</li>
							<li class="listS">서비스 제한 기준 :  집계구별 5이하 통계값 서비스제외(총괄항목은 미적용)</li>
						</ul>
					</div>
				</div>					
				
				<!-- 루프 start -->
	<%
/***************************/
/* 센서스 구분 */
/***************************/
    try {
      broker = new GeneralBroker("ceaa00");
	    lData.setString("PARAM", "CODE");
	    rm1 = broker.getList(lData);

    while(rm1.next()) {
      sgis_census_id = String.valueOf((BigDecimal)rm1.get("sgis_census_id"));
      sgis_census_name = StringUtil.verify((String)rm1.get("sgis_census_code_name"));
    %>			
				<div class="listTitle"><%=sgis_census_name %></div>				
				<table class="listTable">
				<caption>통계자료</caption>
					<tr>
						<th class="first" width="170px">대상자료명</th>
						<th width="200px">기준년도</th>
						<th width="90px">자료형식</th>
						<th width="90px">공개여부</th>
						<th width="90px">대상지역</th>
						<th class="last" width="90px">가격</th>
					</tr>
  <%
        lData.setString("PARAM", "CENSUS_DATA");
        lData.setString("sgis_census_id", sgis_census_id);
        rm2 = broker.getList(lData);
	    int dcnt=0;
        while(rm2.next()) {
          String sgis_census_data_id = String.valueOf((BigDecimal)rm2.get("sgis_census_data_id"));
          String sgis_census_data_name = StringUtil.verify((String)rm2.get("sgis_census_data_name"));
          String sgis_census_public_format = StringUtil.verify((String)rm2.get("sgis_census_public_format"));
          String sgis_census_public_yn = String.valueOf((Character)rm2.get("sgis_census_public_yn"));
          String sgis_census_public_yn_name = StringUtil.verify((String)rm2.get("sgis_census_public_yn_name"));
          String sgis_census_location = StringUtil.verify((String)rm2.get("sgis_census_location"));
          String sgis_census_price = StringUtil.verify((String)rm2.get("sgis_census_price"));

          /*********************************/
          /* 자료별 대상년도 가져오기 */
          /*********************************/
          lData.setString("PARAM", "CENSUS_DATA_YEAR");
          lData.setString("sgis_census_data_id", sgis_census_data_id);
          rm4 = broker.getList(lData);
          String years="";

          while(rm4 != null && rm4.next()) {
            years += StringUtil.verify((String)rm4.get("sgis_census_year")) + ", ";
          }

          if(!StringUtil.isEmpty(years))	years = years.substring(0, (years.length() - 2));
  %>					
					
					<tr>
						<td><%=sgis_census_data_name %></td>
						<td><%=years %></td>
						<td><%=sgis_census_public_format %></td>
						<td><%if(sgis_census_public_yn_name.equals("제한")){%>제한·공개<%}else{ %><%=sgis_census_public_yn_name %><%} %></td>
						<td><%=sgis_census_location %></td>
						<td><a href="#"><%=sgis_census_price %></a></td>
					</tr>
					
	<% dcnt++; } %>
 	<%if(dcnt == 0) { %>
 	<tr>
 		<th colspan="6">데이터가 존재하지 않습니다.</th>
 	</tr>
 	<%} %>
								
			</table>
   <%} %>  
<% } catch(Exception e) {
        out.print(e);
      }
%>  
			<!-- 루프 end -->
			
			
			<div class="inquiry">문의사항연락처: <%=sgis_census_return_call %></div>
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
		
	</body>
</html>