<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/gsks/include/header.jsp" %>

<%
	

	GeneralBroker broker = null;
	RecordModel rm = null;
	//String sgis_census_data_id1 = lData.getString("sgis_census_data_id");
	
	
	
	int resultFlag =  0;

	try {

		broker = new GeneralBroker("ceaa00");
		lData.setString("PARAM", "RELOAD_DATA");
		
		resultFlag = broker.process(Const.P_INS, lData);
						

	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		e.printStackTrace();
	}
%>
			
