<%@page import="java.sql.PreparedStatement"%>
<%@ page language="java" import="java.io.*,java.net.*" %>
<%@ page import="java.sql.*" %>
<%@ page import="javax.sql.*" %>
<%@ page import="javax.naming.*" %>
<%@ page import="java.util.*" %>
<%@ page import="com.dsjdf.jdf.Logger" 
	contentType="text/xml; charset=utf-8"    
pageEncoding="utf-8"%>

<%
	String userCnt = "";
	String dataCnt = "";
	String useDataCnt = "";
	String dataOpen = "";
	
	String usrId = "";
	String fileSz = "";
	String seq = "";
	String dataTitle = "";


	try{
		Class.forName("oracle.jdbc.driver.OracleDriver");
	}
	catch (ClassNotFoundException e){
	}

	try{
		//jdbc/oracle2015
		
		
		//반영시 jeus jndi 이용
		Context ctx = new InitialContext();
		DataSource ds = (DataSource)ctx.lookup("jdbc/oracle2015");
		Connection conn = ds.getConnection();
		
//개발		Connection conn = DriverManager.getConnection("jdbc:oracle:thin:@//10.184.71.174:1521/GISINT", "ugis", "tprPchlrkd");
//		Connection conn = DriverManager.getConnection("jdbc:oracle:thin:@//10.184.72.8:1521/GISEXT", "nsogis_us", "nsogis_ps$");
		
		PreparedStatement psmt = null;
		ResultSet rs = null;
		
		if("getMyDataTotalUseStat".equals(request.getParameter("gubun"))){
			String sqlStr = "";
			sqlStr += "select";
			sqlStr += "    sum(use_data_cnt) as use_data_cnt,";
			sqlStr += "    count(usr_id) as user_cnt,";
			sqlStr += "    sum(data_open_cnt) as data_open_cnt,";
			sqlStr += "    sum(data_cnt) as data_cnt  ";
			sqlStr += "from (";
			sqlStr += "        select ";
			sqlStr += "            sum(file_sz) as use_data_cnt, ";
			sqlStr += "            usr_id, ";
			sqlStr += "            sum(decode(share_yn,'Y', 1, 0)) as data_open_cnt, ";
			sqlStr += "            count(0) as data_cnt from SRV_DT_USER_DATA_UPLOAD_MAIN";
			sqlStr += "        group by usr_id";
			sqlStr += ")";
			//String sql = "select ? as AAA, ? as BBB from SRV_DT_USER_DATA_UPLOAD_MAIN";

		
		
		psmt = conn.prepareStatement(sqlStr);
		
		
		rs = psmt.executeQuery();
		
		
		while(rs.next()){
			useDataCnt = rs.getString("use_data_cnt");
			userCnt = rs.getString("user_cnt");
			dataCnt = rs.getString("data_cnt");
			dataOpen = rs.getString("data_open_cnt");
			
			
		}
		
			conn.close();
		}
		if("getDataUseCntRank".equals(request.getParameter("gubun"))){
			String sqlStr = "";
			
			
				sqlStr += "select usr_id, file_sz, seq ,data_title from (";
				sqlStr += "				    select usr_id, file_sz, rownum as seq ,data_title";
				sqlStr += "				    from";
				sqlStr += "				    (";
				sqlStr += "				        select usr_id, nvl(file_sz,0) as file_sz, data_title from ";
				sqlStr += "				        SRV_DT_USER_DATA_UPLOAD_MAIN";
				sqlStr += "				        order by file_sz desc";
				sqlStr += "				    )";
				sqlStr += "				 )";
				sqlStr += "				where seq <= 20";
	
				
				//String sql = "select ? as AAA, ? as BBB from SRV_DT_USER_DATA_UPLOAD_MAIN";
	
			
			psmt = conn.prepareStatement(sqlStr);
			
			
			rs = psmt.executeQuery();
			
			
			while(rs.next()){
				usrId = rs.getString("usr_id");
				fileSz = rs.getString("file_sz");
				seq = rs.getString("seq");
				dataTitle = rs.getString("data_title");
				
				
				
				%>
				
								<tr>
									<td><%= seq.replaceAll("<", "")%>순위</td>
									<td><%= dataTitle.replaceAll("<", "")%></td>
									<td><%= usrId.replaceAll("<", "")%></td>
									<td><%= addComma(fileSz.replaceAll("<", ""))%></td>
								</tr>
				
				
				
				<%
				
				
			}
			conn.close();
		}
		
	}
	catch(SQLException e){
	}
%>



		<%! public String addComma(String num)
		{
			String original=num;
			String convert = "";
			int count=1;
			
			
			for(int k=original.length()-1; k>-1; k--){
				if((count%3) == 0 && k < original.length()-1 && k>0 ){
					convert = "," + original.charAt(k) + convert;
				}else{
					convert = original.charAt(k) + convert;
				}
				count++;
			}
			
			return convert;
		}
		%>

<%
if("getMyDataTotalUseStat".equals(request.getParameter("gubun"))){
%>
		<tr>
			<th>이용자수</th>
			<td><%= addComma(userCnt.replaceAll("<", ""))%></th>
		</tr>
		<tr>
			<th>데이터 건수</th>
			<td><%= addComma(dataCnt.replaceAll("<", ""))%></th>
		</tr>
		<tr>
			<th>데이터 사용량</th>
			<td><%= addComma(useDataCnt.replaceAll("<", ""))%> Byte</th>
		</tr>
		<tr>
			<th>데이터 공개</th>
			<td><%= addComma(dataOpen.replaceAll("<", ""))%></th>
		</tr>
<%
}
%>
<%
if("getDataUseCntRank".equals(request.getParameter("gubun"))){
%>


<%
}
%>
