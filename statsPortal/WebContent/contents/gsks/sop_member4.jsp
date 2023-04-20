<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.*"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<%@page import="kostat.sop.ServiceAPI.common.security.SecureDB"%>
<%@page import="java.sql.Timestamp"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>

<head>


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
<%=request.getRemoteAddr()%>
<%
	//String what_year = lData.getString("what_year");
//=================================== IP체크부분(외부에서 접근불가하도록) ==========================================
 if ( 
	
		"125.128.71.121".equals(request.getRemoteAddr()) ||
	    "125.128.71.121".equals(request.getRemoteAddr()) 
	    // || true //로컬테스트시 주석제거
	    
   ) {
			
	
	 DbManager resultDbmgr           = null;
	 RecordModel rm    = null;
	 StringBuffer sql = new StringBuffer(2048);
	 try {
			//접속 30분 여부 체크
			resultDbmgr = new DbManager();	
			sql = new StringBuffer(1024);
			
			/*******************************/
			/*SOP 회원정보 */
			/*******************************/
			/*
			sql.append( "Select                                 \n " );
			sql.append( "	member_id,                          \n " );
			sql.append( "	manager_tel_no,                                 \n " );
			sql.append( "	manager_email,                          \n " );
			sql.append( "	corp_nm ,                   \n " );
			sql.append( "	manager_nm,							   	\n " );
			sql.append( "	to_char(reg_ts, 'YYYYMMDD') as reg_ts,							   	\n " );
			sql.append( "	replace(replace(srv_exp, chr(10), ' '), chr(13),'')		as srv_exp						   	\n " );
			sql.append( "   from srv_dt_usesrvinfo               \n " );
			//sql.append( "   where left(reg_ts, 4) in ('2018', '2019')            \n " );
			sql.append( "   where reg_ts >= '20180101' and reg_ts <= '20210730'            \n " );
			sql.append( "   group by member_id, manager_tel_no, manager_email, corp_nm, manager_nm,srv_exp,reg_ts             \n " );
			sql.append( "   order by reg_ts           \n " );
			*/
			
			sql.append( "      select member_nm, email, cp_no from srv_dt_memberinfo where  reg_ts >= '20160101' and last_access_dt is not null order by last_access_dt desc                \n " );
			
			
			resultDbmgr.prepareStatement(sql.toString());
			rm = resultDbmgr.select();
			resultDbmgr.execute();
		} catch( Exception e ) {
			e.printStackTrace();
		} finally {
			resultDbmgr.close();
		}
		
		

	

	//GeneralBroker broker = null;
	//RecordModel rm = null;	
	
%>

<br />
<a href="#"><img src="images/admin_button_download_excel.gif" onClick="jo_excel_down();" alt="엑셀다운로드"  title="엑셀다운로드"  height="20px" align="middle" border="0" /></a>
<br />

<!-- <div style="clear:both; position:relative; overflow:auto; width:1024px; height:768px; padding:7px; "> -->

<table width="100%" border=0 cellpadding="0" cellspacing="0" class="table1"  >
  <thead>

      <tr>
        <th class="td_top w40" >번호</th>
        <td class="cell_center w80"      >member_nm                   </td>
			<td class="cell_center w80"  >email                   </td>
			<td class="cell_center w80"  >cp_no             </td>
			
        
      </tr>
    </thead>

    <tbody>
<%
	try {
		int cnt_this_page_row=0;
		//broker = new GeneralBroker("ceaa00");
		//lData.setString("PARAM", "SOP_MEMBER");
		//rm = broker.getList(lData);

		/*
		sql.append(" select member_id, pw, member_nm, birth, gender, cp_no, email                         \n");
		sql.append(" , member_grade, pw_last_mod_dt, pw_fail_cnt, member_key, srv_agreement_agree_yn      \n");
		sql.append(" , person_info_agreement_agree_yn, other_people_supply_agree_yn, auth_div             \n");
		sql.append(" , parent_member_id, fourteen_less_than_yn, parent_agree_yn                           \n");
		sql.append(" from srv_dt_memberinfo                                                               \n");
		*/
		
		
		
		
		String member_nm       = "";
		String email           = "";
		String cp_no           = "";
		
		
		
		
		
		

		

		while(rm != null && rm.next()) {
			member_nm     = 	StringUtil.verify((String)rm.get("member_nm"    ));                 
			email         = 	StringUtil.verify((String)rm.get("email"    ));                 
			cp_no         = 	StringUtil.verify((String)rm.get("cp_no"    ));                
			 
			   
			
		
			cp_no = SecureDB.decryptAria256(cp_no);
			email = SecureDB.decryptAria256(email);
			//manager_tel_no = SecureDB.decryptAria256(manager_tel_no);
			//manager_email = SecureDB.decryptAria256(manager_email);
			
			
%>
   			
   			<tr>
   			<td class="cell_center w80"  ><%= member_nm %></td>
			<td class="cell_center w80"  ><%= email     %></td>
			<td class="cell_center w80"  ><%= cp_no     %></td>
	      </tr>
   			
<%		
			cnt_this_page_row++;
			System.out.println("[sop_member3.jsp] cnt_this_page_row[" + cnt_this_page_row);
		}
		if(cnt_this_page_row == 0) {
%>
			
<%			
		}
		
	
	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		e.printStackTrace();
	}

  } //end of if	


%>
	</tbody>
</table>

<!-- </div> -->

<form name="sop_member"></form>

<script language="javascript">
function jo_excel_down() {
	
	document.sop_member.action = "sop_member_excel_down.jsp";
	document.sop_member.submit();
	return false;
	
	
}

</script>

<span id='result_dwon'></span>

