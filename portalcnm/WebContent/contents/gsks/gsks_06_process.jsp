<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ page import="kr.co.offton.pdf.basis.*"            %>
<%@ page import="sun.misc.BASE64Encoder"              %>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>

<%
	String aT         = lData.getString("aT");
	String sendPage   = "";
	String memKey = lData.getString("sgis_member_key");
	GeneralBroker broker = null;
	String main_auth = lData.get("main_auth").equals("on") ?  "Y"  : "N" ;
	String statistics_auth = lData.get("statistics_auth").equals("on") ?  "Y"  : "N" ;
	String msgis_auth = lData.get("msgis_auth").equals("on") ?  "Y"  : "N" ;
	String publicmodel_auth = lData.get("publicmodel_auth").equals("on") ?  "Y"  : "N" ;
	String metadata_auth = lData.get("metadata_auth").equals("on") ?  "Y"  : "N" ;
	String funnymonth_auth = lData.get("funnymonth_auth").equals("on") ?  "Y"  : "N" ;
	String statbd_auth = lData.get("statbd_auth").equals("on") ?  "Y"  : "N" ;
	String admin_manage = lData.get("admin_manage").equals("on") ?  "Y"  : "N" ;
	String openapi_auth = lData.get("openapi_auth").equals("on") ?  "Y"  : "N" ;
	String census_auth = lData.get("census_auth").equals("on") ?  "Y"  : "N" ;

	try {
		broker = new GeneralBroker("adaa0000");

		String list_search_input  = lData.get("list_search_input");	//검색어
		String sort               = lData.get("sort");			    //정렬기준
		String mem_status         = lData.get("mem_status");		//회원 상태별
		String mem_grade          = lData.get("mem_grade");			//회원 등급별
		String mem_cond           = lData.get("mem_cond");			//

		DbManager dbmgr           = null;
		RecordModel countSet    = null;
		StringBuffer countQuery = new StringBuffer(1024);
		 try {
				dbmgr = new DbManager();
				countQuery = new StringBuffer(1024);
				countQuery.append("    update sgis_auth_manage set    \n");
				countQuery.append("    sgis_main_auth='"+main_auth+"' , \n");
				countQuery.append("    sgis_statistics_auth='"+statistics_auth+"' , \n");
				countQuery.append("    sgis_msgis_auth='"+msgis_auth+"' , \n");
				countQuery.append("    sgis_publicmodel_auth='"+publicmodel_auth+"' , \n");
				countQuery.append("    sgis_metadata_auth='"+metadata_auth+"' , \n");
				countQuery.append("    sgis_funnymonth_auth='"+funnymonth_auth+"' , \n");
				countQuery.append("    sgis_statbd_auth='"+statbd_auth+"' , \n");
				countQuery.append("    sgis_openapi_auth='"+openapi_auth+"' , \n");
				countQuery.append("    sgis_census_auth='"+census_auth+"' , \n");
				countQuery.append("    sgis_admin_manage='"+admin_manage+"'  \n");
				countQuery.append("    where sgis_member_key= '"+memKey+"' \n");
				dbmgr.prepareStatement(countQuery.toString());
				//countSet = dbmgr.select();
				dbmgr.execute();
			} catch( Exception e ) {
				e.printStackTrace();
			} finally {
				dbmgr.close();
			}
	}catch(Exception e) {
		//e.printStackTrace();
	}
	sendPage = "gsks_06_correct.jsp?aT=UPD&sgis_member_key="+memKey;
	response.sendRedirect(sendPage);
%>