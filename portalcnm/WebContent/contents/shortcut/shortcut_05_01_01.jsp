<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%

	DbManager dmg = null;
  RecordModel rm = null;


	try {

		dmg = new DbManager();

		/***************************/
		/* 다운로드 횟수 증가 */
		/***************************/
		String sql = " update sgis_census_req_year_code  ";
						sql += "	        set sgis_census_down_count = ";
						sql += "											( ";
						sql += "													select max(sgis_census_req_y_down_c)+1 ";
						sql += "																from sgis_census_req_year_code ";
						sql += "													where sgis_census_req_id = '"+lData.getString("sgis_census_req_id")+"' ";
						sql += "																	and sgis_census_id = '"+lData.getString("sgis_census_id")+"' ";
						sql += "																	and sgis_census_data_id = '"+lData.getString("sgis_census_data_id")+"' ";
						sql += "																	and sgis_census_req_year = '"+lData.getString("sgis_census_req_year")+"' ";
						sql += "											) ";
						sql += "	  where sgis_census_req_id = '"+lData.getString("sgis_census_req_id")+"'";
						sql += "																	and sgis_census_id = '"+lData.getString("sgis_census_id")+"' ";
						sql += "																	and sgis_census_data_id = '"+lData.getString("sgis_census_data_id")+"' ";
						sql += "																	and sgis_census_req_year = '"+lData.getString("sgis_census_req_year")+"' ";

						dmg.prepareStatement(sql);
						dmg.executeUpdate();

	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		e.printStackTrace();
	} finally {
		dmg.close();
	}
%>