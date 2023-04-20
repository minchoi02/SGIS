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
			
			sql.append( "  select c.cp_no cp_no, c.email email,d.srv_id                             srv_id,d.member_id                          member_id,d.manager_id                         manager_id,d.secret_key                         secret_key,d.api_auth_key_type                  api_auth_key_type,d.srv_nm                             srv_nm,d.srv_apply_url                      srv_apply_url,d.banner_img_url                     banner_img_url,d.banner_img_path                    banner_img_path,d.srv_exp                            srv_exp,d.manager_nm                         manager_nm,d.manager_tel_no                     manager_tel_no,d.manager_email                      manager_email,d.corp_nm                            corp_nm,d.corp_site                          corp_site,to_char(d.srv_apply_dt,'YYYYMMDD')                       srv_apply_dt,to_char(d.srv_start_dt,'YYYYMMDD')                       srv_start_dt,to_char(d.srv_end_dt,'YYYYMMDD')                         srv_end_dt,to_char(d.srv_grant_dt,'YYYYMMDD')                       srv_grant_dt,to_char(d.srv_mod_dt,'YYYYMMDD')                         srv_mod_dt,nvl(d.case_app_open_yn,'')                   case_app_open_yn,nvl(d.case_app_share_yn,'')                  case_app_share_yn,nvl(d.api_agreement_agree_yn,'')             api_agreement_agree_yn,d.grant_state                        grant_state,to_char(d.reg_ts,'YYYYMMDD')                             reg_ts, d.cnt||'' cnt from srv_dt_memberinfo c , (                                                                                  \n " );
			sql.append( "  select b.srv_id bsrv_id, a.*, b.cnt from srv_dt_usesrvinfo a ,                                                                             \n " );
			sql.append( "  (select srv_id, cast(sum(hourly_call_cnt) as bigint) cnt from srv_dt_apihourlystat with (nolock) group by srv_id) b                        \n " );
			sql.append( "  where a.srv_id(+) = b.srv_id                                                                                                       \n " );
			sql.append( "  ) d where c.member_id (+) = d.member_id                                                                                         \n " );
			
			
			
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
        <td class="cell_center w80"  >cp_no                   </td>
			<td class="cell_center w80"  >email                   </td>
			<td class="cell_center w80"  >srv_id                  </td>
			<td class="cell_center w80"  >member_id               </td>
			<td class="cell_center w80"  >manager_id              </td>
			<td class="cell_center w80"  >secret_key              </td>
			<td class="cell_center w80"  >api_auth_key_type       </td>
			<td class="cell_center w80"  >srv_nm                  </td>
			<td class="cell_center w80"  >srv_apply_url           </td>
			<td class="cell_center w80"  >banner_img_url          </td>
			<td class="cell_center w80"  >banner_img_path         </td>
			<td class="cell_center w80"  >srv_exp                 </td>
			<td class="cell_center w80"  >manager_nm              </td>
			<td class="cell_center w80"  >manager_tel_no          </td>
			<td class="cell_center w80"  >manager_email           </td>
			<td class="cell_center w80"  >corp_nm                 </td>
			<td class="cell_center w80"  >corp_site               </td>
			<td class="cell_center w80"  >srv_apply_dt            </td>
			<td class="cell_center w80"  >srv_start_dt            </td>
			<td class="cell_center w80"  >srv_end_dt              </td>
			<td class="cell_center w80"  >srv_grant_dt            </td>
			<td class="cell_center w80"  >srv_mod_dt              </td>
			<td class="cell_center w80"  >case_app_open_yn        </td>
			<td class="cell_center w80"  >case_app_share_yn       </td>
			<td class="cell_center w80"  >api_agreement_agree_yn  </td>
			<td class="cell_center w80"  >grant_state             </td>
			<td class="cell_center w80"  >reg_ts                  </td>
			<td class="cell_center w80"  >cnt</td>
        
      </tr>
    </thead>

    <tbody>
<%
	try {
		int cnt=0;
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
		
		String cp_no                          = "";
		String email                       = "";
		
		String srv_id                          = "";
		String member_id                       = "";
		String manager_id                      = "";
		String secret_key                      = "";
		String api_auth_key_type               = "";
		String srv_nm                          = "";
		String srv_apply_url                   = "";
		String banner_img_url                  = "";
		String banner_img_path                 = "";
		String srv_exp                         = "";
		String manager_nm                      = "";
		String manager_tel_no                  = "";
		String manager_email                   = "";
		String corp_nm                         = "";
		String corp_site                       = "";
		String srv_apply_dt                    = "";
		String srv_start_dt                    = "";
		String srv_end_dt                      = "";
		String srv_grant_dt                    = "";
		String srv_mod_dt                      = "";
		String case_app_open_yn                = "";
		String case_app_share_yn               = "";
		String api_agreement_agree_yn          = "";
		String grant_state                     = "";
		String reg_ts                          = "";
		String cnt2                          = "";

		

		while(rm != null && rm.next()) {
			cp_no                 = 	StringUtil.verify((String)rm.get("cp_no"));                 
			email                 = 	StringUtil.verify((String)rm.get("email"));                 
			srv_id                = 	StringUtil.verify((String)rm.get("srv_id"));                
			member_id             = 	StringUtil.verify((String)rm.get("member_id"));             
			manager_id            = 	StringUtil.verify((String)rm.get("manager_id"));            
			secret_key            = 	StringUtil.verify((String)rm.get("secret_key"));            
			api_auth_key_type     = 	StringUtil.verify((String)rm.get("api_auth_key_type"));     
			srv_nm                = 	StringUtil.verify((String)rm.get("srv_nm"));                
			srv_apply_url         = 	StringUtil.verify((String)rm.get("srv_apply_url"));         
			banner_img_url        = 	StringUtil.verify((String)rm.get("banner_img_url"));        
			banner_img_path       = 	StringUtil.verify((String)rm.get("banner_img_path"));       
			srv_exp               = 	StringUtil.verify((String)rm.get("srv_exp"));               
			manager_nm            = 	StringUtil.verify((String)rm.get("manager_nm"));            
			manager_tel_no        = 	StringUtil.verify((String)rm.get("manager_tel_no"));        
			manager_email         = 	StringUtil.verify((String)rm.get("manager_email"));         
			corp_nm               = 	StringUtil.verify((String)rm.get("corp_nm"));               
			corp_site             = 	StringUtil.verify((String)rm.get("corp_site"));             
			
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
			*/
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
			
			
			//pw = SecureDB.decryptAria256(pw);
			//birth = SecureDB.decryptAria256(birth);
			cp_no = SecureDB.decryptAria256(cp_no);
			email = SecureDB.decryptAria256(email);
			manager_tel_no = SecureDB.decryptAria256(manager_tel_no);
			manager_email = SecureDB.decryptAria256(manager_email);
			
			
%>
   			
   			<tr>
   			<td class="cell_center w40"  ><%= cnt+1 %></td>
			<td class="cell_center w80"  ><%=cp_no                   %></td>
			<td class="cell_center w80"  ><%=email                   %></td>
			<td class="cell_center w80"  ><%=srv_id                  %></td>
			<td class="cell_center w80"  ><%=member_id               %></td>
			<td class="cell_center w80"  ><%=manager_id              %></td>
			<td class="cell_center w80"  ><%=secret_key              %></td>
			<td class="cell_center w80"  ><%=api_auth_key_type       %></td>
			<td class="cell_center w80"  ><%=srv_nm                  %></td>
			<td class="cell_center w80"  ><%=srv_apply_url           %></td>
			<td class="cell_center w80"  ><%=banner_img_url          %></td>
			<td class="cell_center w80"  ><%=banner_img_path         %></td>
			<td class="cell_center w80"  ><%=srv_exp                 %></td>
			<td class="cell_center w80"  ><%=manager_nm              %></td>
			<td class="cell_center w80"  ><%=manager_tel_no          %></td>
			<td class="cell_center w80"  ><%=manager_email           %></td>
			<td class="cell_center w80"  ><%=corp_nm                 %></td>
			<td class="cell_center w80"  ><%=corp_site               %></td>
			<td class="cell_center w80"  ><%=srv_apply_dt            %></td>
			<td class="cell_center w80"  ><%=srv_start_dt            %></td>
			<td class="cell_center w80"  ><%=srv_end_dt              %></td>
			<td class="cell_center w80"  ><%=srv_grant_dt            %></td>
			<td class="cell_center w80"  ><%=srv_mod_dt              %></td>
			<td class="cell_center w80"  ><%=case_app_open_yn        %></td>
			<td class="cell_center w80"  ><%=case_app_share_yn       %></td>
			<td class="cell_center w80"  ><%=api_agreement_agree_yn  %></td>
			<td class="cell_center w80"  ><%=grant_state             %></td>
			<td class="cell_center w80"  ><%=reg_ts                  %></td>
			<td class="cell_center w80"  ><%=cnt2                  %></td>
	      </tr>
   			
<%		
			cnt++;
		}
		if(cnt == 0) {
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

