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
			
			sql.append( "      select a.api_auth_key_type api_auth_key_type, a.srv_nm srv_nm, a.srv_apply_url srv_apply_url, replace(replace(a.srv_exp, chr(10),' '),chr(13),'') srv_exp, a.manager_nm manager_nm,                      \n " );
			sql.append( "      a.manager_tel_no manager_tel_no,                                                                                                                              \n " );
			sql.append( "      a.corp_nm corp_nm, a.corp_site corp_site, ''||b.cnt cnt  from                                                                                                            \n " );
			sql.append( "      (select * from srv_dt_usesrvinfo with (nolock) where api_auth_key_type = 'USE' ) a,                                                            \n " );
			sql.append( "      (select srv_id, sum(hourly_call_cnt) cnt from srv_dt_apihourlystat with (nolock)                                                               \n " );
			sql.append( "      group by srv_id ) b                                                                                                                            \n " );
			sql.append( "      where a.srv_id = b.srv_id (+) and b.cnt is not null                                                                                            \n " );
			
			
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
        <td class="cell_center w80"      >api_auth_key_type                   </td>
			<td class="cell_center w80"  >srv_nm                   </td>
			<td class="cell_center w80"  >srv_apply_url             </td>
			<td class="cell_center w80"  >srv_exp               </td>
			<td class="cell_center w80"  >manager_nm            </td>
			<td class="cell_center w80"  >manager_tel_no        </td>
			<td class="cell_center w80"  >corp_nm           </td>
			<td class="cell_center w80"  >corp_site             </td>
			<td class="cell_center w80"  >cnt              </td>
			
        
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
		
		
		
		
		String api_auth_key_type       = "";
		String srv_nm                  = "";
		String srv_apply_url           = "";
		String srv_exp                 = "";
		String manager_nm              = "";
		String manager_tel_no          = "";
		String corp_nm                 = "";
		String corp_site               = "";
		String cnt                     = "";

		

		while(rm != null && rm.next()) {
			api_auth_key_type     = 	StringUtil.verify((String)rm.get("api_auth_key_type"    ));                 
			srv_nm                = 	StringUtil.verify((String)rm.get("srv_nm"    ));                 
			srv_apply_url         = 	StringUtil.verify((String)rm.get("srv_apply_url"    ));                
			srv_exp               = 	StringUtil.verify((String)rm.get("srv_exp"    ));             
			manager_nm            = 	StringUtil.verify((String)rm.get("manager_nm"    ));            
			manager_tel_no        = 	StringUtil.verify((String)rm.get("manager_tel_no"    ));            
			corp_nm               = 	StringUtil.verify((String)rm.get("corp_nm"    ));     
			corp_site             = 	StringUtil.verify((String)rm.get("corp_site"    ));                
			cnt                   = 	StringUtil.verify((String)rm.get("cnt"    ));         
			   
			   
			   
			   
			   
			   
			   
			   
			
			/*
			srv_apply_dt          = 	StringUtil.verify(((java.util.Date)rm.get("srv_apply_dt")).toString());          
			srv_start_dt          = 	StringUtil.verify(((java.util.Date)rm.get("srv_start_dt")).toString());          
			srv_end_dt            = 	StringUtil.verify(((java.util.Date)rm.get("srv_end_dt")).toString());            
			srv_grant_dt          = 	StringUtil.verify(((java.util.Date)rm.get("srv_grant_dt")).toString());          
			srv_mod_dt            = 	StringUtil.verify(((java.util.Date)rm.get("srv_mod_dt")).toString());            
			
			case_app_open_yn      = 	StringUtil.verify( ((Character)rm.get("case_app_open_yn")).toString());      
			case_app_share_yn     = 	StringUtil.verify( ((Character)rm.get("case_app_share_yn")).toString());     
			api_agreement_agree_yn= 	StringUtil.verify( ((Character)rm.get("api_agreement_agree_yn")).toString());
			
			grant_state           = 	StringUtil.verify((String)rm.get("grant_state"));           
			
			reg_ts                = 	StringUtil.verify(((java.util.Date)rm.get("reg_ts")).toString());                
			
			srv_apply_dt          = 	StringUtil.verify((String)rm.get("srv_apply_dt"));      
			srv_start_dt          = 	StringUtil.verify((String)rm.get("srv_start_dt"));         
			srv_end_dt            = 	StringUtil.verify((String)rm.get("srv_end_dt"));           
			srv_grant_dt          = 	StringUtil.verify((String)rm.get("srv_grant_dt"));          
			srv_mod_dt            = 	StringUtil.verify((String)rm.get("srv_mod_dt"));            
			
			case_app_open_yn      = 	StringUtil.verify( (String)rm.get("case_app_open_yn"));   
			case_app_share_yn     = 	StringUtil.verify( (String)rm.get("case_app_share_yn"));    
			api_agreement_agree_yn= 	StringUtil.verify( (String)rm.get("api_agreement_agree_yn"));  

			grant_state           = 	StringUtil.verify((String)rm.get("grant_state"));           
			
			reg_ts                = 	StringUtil.verify((String)rm.get("reg_ts"));  
			cnt2                = 	StringUtil.verify((String)rm.get("cnt"));  
			*/
			
			//pw = SecureDB.decryptAria256(pw);
			//birth = SecureDB.decryptAria256(birth);
			//cp_no = SecureDB.decryptAria256(cp_no);
			//email = SecureDB.decryptAria256(email);
			manager_tel_no = SecureDB.decryptAria256(manager_tel_no);
			//manager_email = SecureDB.decryptAria256(manager_email);
			
			
%>
   			
   			<tr>
   			<td class="cell_center w80"  ><%= api_auth_key_type %></td>
			<td class="cell_center w80"  ><%= srv_nm            %></td>
			<td class="cell_center w80"  ><%= srv_apply_url     %></td>
			<td class="cell_center w80"  ><%= srv_exp           %></td>
			<td class="cell_center w80"  ><%= manager_nm        %></td>
			<td class="cell_center w80"  ><%= manager_tel_no    %></td>
			<td class="cell_center w80"  ><%= corp_nm           %></td>
			<td class="cell_center w80"  ><%= corp_site         %></td>
			<td class="cell_center w80"  ><%= cnt               %></td>
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

