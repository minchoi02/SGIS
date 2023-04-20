<%--
/*********************************************************
 * @source      : gsks_01_excel.jsp
 * @description : 관리자 / 센서스 자료제공 리스트 엑셀다운로드
 *********************************************************
 *    DATE    |     AUTHOR      |        DESC
 *--------------------------------------------------------
 * 2008.11.18   SHIN HYUN MYUNG         최초등록
 *********************************************************
--%>
<%@ page language="java" contentType="application/vnd.ms-excel;charset=utf-8"%>
<%@ page import="java.math.BigDecimal"                  %>
<%@ page import="kr.co.offton.jdf.db.RecordModel"       %>
<%@ page import="kr.co.offton.jdf.db.DbManager"         %>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>



<%--@ include file="/contents/include/comVarCoding.jsp"   --%>
<%-- comVarCoding.jsp 의 charset=utf-8 세팅이 위에도 있고 여기도 있어서 오류발생으로 comVarCoding.jsp내용을 여기에 그냥 적음 --%>
<%--  -------------------------------------------- 시작 comVarCoding.jsp -------------------------------------------- --%>
<%@page import="kr.co.offton.jdf.util.*"%>
<%@page import="kr.co.offton.pdf.basis.*"%>
<%@page import="kr.co.offton.jdf.cfg.ConfigManager" %>
<%@page import="kr.co.offton.pdf.*"%>
<%
  ConfigManager.getInstance();
  request.setCharacterEncoding("UTF-8");
  String funny_domain = "http://sgis.nso.go.kr";
  /*******************************/
  /* lData의 구분자를 지정해주는 경우.<input type="hidden" name="seperate" value="|" > */
  /*******************************/
  String seperate = StringUtil.fromDB(request.getParameter("seperate"));
  LData lData     = null;

  if(seperate.equals("")) lData     = new LData( request );
  else lData     = new LData( request,seperate);

  /*************************/
  /* 공통변수 */
  /*************************/
  String sc_toDay = DateTime.getShortDateString();							//금일 (예:20081104)
//	String sc_webUrl = "http://127.0.0.1:8080";								//local web url
  String sc_webUrl = ConfigManager.getScWebUrl();							//web url
//	String sc_absouteRoot = "C:/projects/sgis/web";							//local absolute path
  String sc_absouteRoot = ConfigManager.getScAbsouteRoot();					//absolute path
  
  String sc_userid=(String)session.getAttribute("sc_userid");				//session user id
  		 sc_userid=(String)session.getAttribute("member_id"); //SOP
  
  String sc_userkey = (String)session.getAttribute("sc_userkey");			//session user key
  		 //sc_userkey = (String)session.getAttribute("member_key");
  
  String sc_username=(String)session.getAttribute("sc_username");			//session user name
  		 sc_username=(String)session.getAttribute("member_nm");
  
  String sc_authid = (String)session.getAttribute("sc_userlevel");			//session level
  		 sc_authid = (String)session.getAttribute("member_grade");
  
  String sc_telephone = (String)session.getAttribute("sc_telephone");		//session telephone
  		 sc_telephone = (String)session.getAttribute("sc_telephone"); //SOP
  
   
  
  
  // 20140508 add by joonha
  //String sc_mobile_phone = (String)session.getAttribute("sc_mobile_phone");	//session sc_mobile_phone
  String sc_email = (String)session.getAttribute("sc_email");					//session sc_email
  
  //String sc_company_name = (String)session.getAttribute("sc_company_name");	//session company
  String sc_aoi = (String)session.getAttribute("sc_aoi");						//session interest location
  String pop_status = (String)session.getAttribute("pop_status");				//승인된 게시물 알림여부
  
  // 
  String countURL = ConfigManager.getStatisticsURL();					//승인된 게시물 알림여부

//	String sc_filePath = "C:/projects/sgis/upload";																//local file path
  String sc_filePath = ConfigManager.getScFilePath();		  //file path
  String sc_pageTitle=ConfigManager.getScPageTitle();																			//title
  String loginYn = ConfigManager.getLoginYn();																																				//login Y : N
  int fileSizeLimit = ConfigManager.getFileSizeLimit();																									//최대 첨부파일 용량 (default:5M)

  // 메일설정
  String mail_host = ConfigManager.getMailHost();
  String mail_name = ConfigManager.getMailFromName();
  String mail_from = ConfigManager.getMailFromAddress();

  // 실명인증 서비스키
  String srvID = ConfigManager.getNameCheckServiceID();
  String srvNno = ConfigManager.getNamecheckServiceNO();

  // 관리자 허용IP
  String sc_ip1 = ConfigManager.getIpCheckip1();
  String sc_ip2 = ConfigManager.getIpCheckip2();
  String sc_ip3 = ConfigManager.getIpCheckip3();
  String sc_ip4 = ConfigManager.getIpCheckip4();
  String sc_ip5 = ConfigManager.getIpCheckip5();
  
  // 메인화면 설정
  String mainCode = (String)session.getAttribute("mainCode");
  String sgisKey  =  ConfigManager.getApiKey();
  //로그인되었을 경우 Y, 아니면 N

  String wasId = ConfigManager.getWasId();
  if(!StringUtil.isEmpty(sc_userid)) loginYn="Y";

%>

<%--  -------------------------------------------- 끝 comVarCoding.jsp -------------------------------------------- --%>














<%
	if(request.getHeader("User-Agent").indexOf("MSIE 5.5") > -1)
	{
	    response.setHeader("Content-Type", "doesn/matter;");
	    response.setHeader("Content-Disposition", "filename=센서스자료제공리스트.xls");
	}else{
	    response.setHeader("Content-Type", "application/vnd.ms-excel;charset=utf-8");
	    response.setHeader("Content-Disposition", "attachment; filename=센서스자료제공리스트.xls");
	    response.setHeader("Content-Description", "JSP Generated Data");
	}

	GeneralBroker broker = null;
	RecordModel rm = null;

	int totrowcnt=0;

	try {

		broker = new GeneralBroker("ceaa00");
		lData.setString("PARAM", "CENSUS_APPROVE_LIST");
		rm = broker.getList(lData);
		totrowcnt = rm.getRowCount();

	}catch(Exception e) {
		System.out.print("sgisWebError : ");
		e.printStackTrace();
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title></title>
<style type='text/css'>

.table1 {margin:5px 0px 0px 0px; padding:0px; border-collapse:collapse;}
.table1 caption{display: none;}
.table1 th{color:#33698f; background-color:#e3f0f9; border-right:1px solid #cbcfd2; border-bottom:1px solid #cbcfd2; padding:5px 7px; font-size:12px;}
.table1 td{font-weight:normal;text-align:justify;  border-right:1px solid #cbcfd2; border-bottom:1px solid #cbcfd2; padding:5px 7px;}
.table1 .t_end{ border-right:none; }
.table1 .td_top{ border-top:2px solid #72aacf;}
.table1 .td_bottom{ border-bottom:none;}
.table1 .cell_left {text-align:left;}
.table1 .cell_right{text-align:right;}
.table1 .cell_center{text-align:center;}
.table1 .cell_point {background:#f3faff;}
.table1 a:link{font-weight:normal;}
.table1 a:active{font-weight:normal;}
.table1 a:visited{font-weight:normal;}
.table1 a:hover{font-weight:normal;}

</style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="1" border=1>
    <thead>
      <tr>
        <th class="td_top">NO</th>
        <th class="td_top">성명(ID)</th>
        <th class="td_top">구분</th>
        <th class="td_top">대상자료명</th>
        <th class="td_top">년도</th>
        <th class="td_top">승인일자</th>
        <th class="td_top">게시시작일자</th>
        <th class="td_top">게시종료일자</th>
      </tr>
    </thead>
    <tbody>
<%
	int rowcnt=0;

	while(rm.next()) {
			String sgis_census_req_id = String.valueOf((BigDecimal)rm.get("sgis_census_req_id"));
			String sgis_census_id = String.valueOf((BigDecimal)rm.get("sgis_census_id"));
			String sgis_census_data_id = String.valueOf((BigDecimal)rm.get("sgis_census_data_id"));
			String sgis_census_name = StringUtil.verify((String)rm.get("sgis_census_code_name"));
			String sgis_census_data_name = StringUtil.verify((String)rm.get("sgis_census_data_name"));
			String sgis_name = StringUtil.verify((String)rm.get("sgis_name"));
			String sgis_member_id = StringUtil.verify((String)rm.get("sgis_member_id"));
			String sgis_census_req_year = StringUtil.verify((String)rm.get("sgis_census_req_year"));
			String sgis_census_app_date = StringUtil.verify((String)rm.get("sgis_census_app_date"));
			String sgis_census_req_y_s_d = StringUtil.verify((String)rm.get("sgis_census_req_y_s_d"));
			String sgis_census_req_y_e_d = StringUtil.verify((String)rm.get("sgis_census_req_y_e_d"));
			String sgis_census_req_y_use_che = String.valueOf((Character)rm.get("sgis_census_req_y_use_che"));
			
			// 2018. 02. 08 mng_s
			String sgis_census_detail_data_nm = StringUtil.verify((String)rm.get("sgis_census_detail_data_nm"));
			// 2018. 02. 08 mng_e
%>
      <tr>
        <td align="center"><%=totrowcnt - rowcnt %></td>
        <td><%=sgis_name %>(<%=sgis_member_id %>)</td>
        <td><%=sgis_census_name %></td>
        
        <!-- 2018. 02. 08 mng_s -->
        <td><%=sgis_census_detail_data_nm %></td>
        <!-- 2018. 02. 08 mng_e -->
        
        <td align="center"><%=sgis_census_req_year %></td>
        <td align="center"><%=sgis_census_app_date %></td>
        <td align="center"><%=sgis_census_req_y_s_d %></td>
        <td align="center"><%=sgis_census_req_y_e_d %></td>
      </tr>
<%		rowcnt++;
		}
%>

    </tbody>
  </table>
</body>
</html>