<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%@ include file="/contents/gsks/include/leftMenu.jsp" %>

<%

	DbManager dmg = null;
	RecordModel rm = null;

	try {

		dmg = new DbManager();

		/*********************************/
		/* 등록, 수정 */
		/*********************************/
		if(lData.getString("aT").equals("INS")) {

			String p_api_element_id = lData.getString("api_element_id");
			String p_api_element_name = lData.getString("api_element_name");
			String p_api_element_desc = lData.getString("api_element_desc");
			String p_api_version = lData.getString("api_version");
			String p_status = lData.getString("status");
			String p_inUse = lData.getString("inUse");

			String[] list_api_element_id = p_api_element_id.split(",");
			String[] list_api_element_name = p_api_element_name.split(",");
			String[] list_api_element_desc = p_api_element_desc.split(",",-1);
			String[] list_api_version = p_api_version.split(",",-1);
			String[] list_status = p_status.split(",");
			String[] list_inUse = p_inUse.split(",");

			for(int i=0; i < list_api_element_id.length; i++) {

				//체크된것만 처리
				if(list_inUse[i].equals("Y")) {

					if(list_status[i].equals("I")) {//신규등록시

						String isql = " insert into sgis_api_element_code	";
										isql += "	(	";
										isql += "		api_element_id	";
										isql += "		, api_element_name	";
										isql += "		, api_element_desc		";
										isql += "		, api_version		";
										isql += "	) ";
										isql += "	values ";
										isql += "	(	";
										if(list_api_version[i].equals("1")||list_api_version[i].equals("1.0")){
										isql += "		(SELECT MAX(api_element_id)+1 FROM sgis_api_element_code where api_version='1.0') 	";
										}else{
										isql += "		(SELECT MAX(api_element_id)+1 FROM sgis_api_element_code)	";
										}
										isql += "		, '"+list_api_element_name[i].replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", "")+"'	";
										isql += "		, '"+list_api_element_desc[i].replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", "")+"'	";
										isql += "		, '"+list_api_version[i].replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", "")+"'	";;
										isql += "	) ";

										dmg.prepareStatement(isql);
										dmg.executeUpdate();

					} else if(list_status[i].equals("U")) {	//수정시

						String usql = " update sgis_api_element_code	 ";
										usql += "		set		";
										usql += "				api_element_name = '"+list_api_element_name[i].replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", "")+"'	";
										usql += "				, api_element_desc = '"+list_api_element_desc[i].replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", "")+"'	";
										usql += "				, api_version = '"+list_api_version[i].replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", "")+"'	";
										usql += "	where api_element_id = '"+list_api_element_id[i]+"' ";

										dmg.prepareStatement(usql);
										dmg.executeUpdate();
					}

				}
			}

		/*********************************/
		/* 삭제 */
		/*********************************/
		} else if(lData.getString("aT").equals("DEL")) {

			String p_api_element_id = lData.getString("api_element_id");
			String p_inUse = lData.getString("inUse");

			String[] list_inUse = p_inUse.split(",");
			String[] list_api_element_id = p_api_element_id.split(",");

			for(int i=0; i < list_api_element_id.length; i++) {

				//체크된것만 처리
				if(list_inUse[i].equals("Y")) {
					/*************************/
					/* sgis_api_sample_list remove */
					/*************************/
					String dsqla = " delete from  sgis_api_sample_list	";
					dsqla += "		where api_element_id = '"+list_api_element_id[i]+"' ";		
					dmg.prepareStatement(dsqla);
					dmg.executeUpdate();						
					/*************************/
					/* sgis_api_log remove */
					/*************************/
					String dsql0 = " delete from  sgis_api_log	";
					dsql0 += "		where api_element_id = '"+list_api_element_id[i]+"' ";

					dmg.prepareStatement(dsql0);
					dmg.executeUpdate();					
					/*************************/
					/* auth remove */
					/*************************/
					String dsql1 = " delete from  sgis_api_auth	";
									dsql1 += "		where api_element_id = '"+list_api_element_id[i]+"' ";

									dmg.prepareStatement(dsql1);
									dmg.executeUpdate();

					/*************************/
					/* group set remove */
					/*************************/
					String dsql2 = " delete from  sgis_api_group_set	";
									dsql2 += "		where api_element_id = '"+list_api_element_id[i]+"' ";

									dmg.prepareStatement(dsql2);
									dmg.executeUpdate();

					/*************************/
					/* element remove */
					/*************************/
					String dsql3 = " delete from  sgis_api_element_code	";
									dsql3 += "		where api_element_id = '"+list_api_element_id[i]+"' ";

									dmg.prepareStatement(dsql3);
									dmg.executeUpdate();
				}
			}

		}

		String sql = " select api_element_id, api_element_name, api_element_desc ,api_version from sgis_api_element_code where not api_version = '2.0' order by api_element_id ";
		dmg.prepareStatement(sql);
		rm = dmg.select();

	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		e.printStackTrace();
	} finally {
		dmg.close();
	}

%>

<script language="javascript">
	function saveClicked() {
		var fm=document.eFm;
		var c = confirm("저장하시겠습니까?");
		if(c == 1) {
			var cnt = fm.api_element_id.length;

			var usechk=0;
			var usename=0;
			for(i=0; i < cnt; i++) {
				if(fm.chk[i].checked) {
					fm.inUse[i].value="Y";
					usechk++;
				} else {
					fm.inUse[i].value="N";
				}

				if(fm.api_element_name[i].value.trim() == "") usename++;
			}

			if(usechk == 0) {
				alert("선택 항목이 없습니다.");
				return;
			} else if(usename != 0) {
				alert("항목명을 입력하세요.");
				return;
			} else {
				fm.aT.value="INS";
				fm.submit();
			}

		}
	}

	function removeClicked() {
		var fm=document.eFm;
		var c = confirm("사용자에게 제공한 모든 인증항목이 완전 삭제됩니다. \n\n삭제하시겠습니까?");
		if(c == 1) {
			var cnt = fm.api_element_id.length;
			var usechk=0;
			for(i=0; i < cnt; i++) {
				if(fm.chk[i].checked) {
					fm.inUse[i].value="Y";
					usechk++;
				} else {
					fm.inUse[i].value="N";
				}
			}

			if(usechk == 0) {
				alert("선택 항목이 없습니다.");
				return;
			} else {
				fm.aT.value="DEL";
				fm.submit();
			}

		}
	}

	function addClicked() {
		var fm=document.eFm;
		var cnt = fm.api_element_id.length;
		var next_element_id = cnt + 1;

		var text = "<tr>";
				text += "<td width=\"330\"><input type=\"text\" name=\"api_element_name\" value=\"\" size=\"45\">&nbsp;&nbsp;&nbsp;&nbsp;</td>";
				text += "<td width=\"200\"><input type=\"text\" name=\"api_element_desc\" value=\"\" size=\"25\">&nbsp;&nbsp;</td>";
				text += "<td width=\"50\"><input type=\"text\" name=\"api_version\" value=\"\" size=\"5\">&nbsp;&nbsp;</td>";
				text += "<td align=\"center\">&nbsp;&nbsp;<input type=\"checkbox\" name=\"chk\" checked></td>";
				text += "<input type=\"hidden\" name=\"api_element_id\" value=\""+next_element_id+"\">";
				text += "<input type=\"hidden\" name=\"inUse\" value=\"Y\">";
				text += "<input type=\"hidden\" name=\"status\" value=\"I\">";
				text += "</tr>";

		var column = document.getElementById("add_column");
		column.innerHTML = text;
	}

	function chkChanged(num) {
		var g_chk = document.getElementById("chk");
		var g_inUse = document.getElementById("inUse");

		document.eFm.chk[num].checked=true;
		document.eFm.inUse[num].value = "Y";
	}

	var isall="F";
	function allChecked() {
		var fm = document.eFm;
		var cnt = fm.api_element_id.length;

		if(isall == "F") {
			for(i=0; i < cnt; i++)	 fm.chk[i].checked = true;
			isall="T";
		} else if(isall == "T") {
			for(i=0; i < cnt; i++)	 fm.chk[i].checked = false;
			isall="F";
		}

	}
</script>

  <div class="admin_content">

    <!-- 메뉴Include -->
    <%@ include file="/contents/gsks/include/gsks_menu_blank.jsp" %>

  <div class="clear"></div>
    <div class="content_title_1">
      <div class="content_title_2">OpenAPI인증키 관리</div>
      <ul class="navigation">
        <li><img src="/contents/gsks/images/button_1.gif" alt=".."></li>
        <li><a href="/contents/gsks/index.jsp">관리자</a> > <a href="#">OpenAPI인증키 관리</a></li>
      </ul>
    </div>
    <div class="content_admin">
    	<div class="list_wrap">
    <div class="admin_tab_button">
    	<table border=0>
				<tr>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
					    <a href="gsks_01_03.jsp"><strong>인증키관리</strong></a></td>
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_03_tab_page_02.jsp"><strong>그룹설정</strong></a></td>
    			<!-- <td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_03_tab_page_02_2.jsp"><strong>그룹설정(NEW)</strong></a></td> -->
					<td width="140" height="25" align="center" bgcolor="#00BFFF">
							<a href="gsks_01_03_tab_page_03.jsp"><font color="#FFFFFF"><strong>항목관리</strong></font></a></td>
					<!-- <td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
							<a href="gsks_01_03_tab_page_03_2.jsp"><strong>항목관리(NEW)</strong></a></td> -->
					<td width="140" height="25" align="center" onMouseOver="this.style.backgroundColor='#93DAFF';" onMouseOut="this.style.backgroundColor='#FFFFFF'">
    					<a href="gsks_01_03_tab_page_04.jsp"><strong>서비스로그</strong></a></td>
				</tr>
				<tr>
					<td colspan="6"><img src="/contents/mypage/images/mypage_board_middle_button_underline.gif" alt="" width="100%" height="1px"></td>
				</tr>
			</table>
		</div>

		<div class="clear">
	<br>
  <table width="100%" cellpadding="0" cellspacing="0" summary="권한관리에 대한 내용입니다." >
  	<tr>
  		<td><a href="gsks_01_03_tab_page_03.jsp"><strong>[항목설정]</strong></a> <a href="gsks_01_03_tab_page_05.jsp"><strong>[제공리스트]</strong></a></td>
    </tr>
  </table>

	<table width="560" cellpadding="0" cellspacing="0">
		<tr>
			<td align="right"><a href="javascript:addClicked();"><img src="images/admin_01_04_tab_page_03_button_add.gif" border=0></a></td>
		</tr>
	</table>

	<table cellpadding="0" cellspacing="1" class="table1">

		<form name="eFm" method="post">
			<input type="hidden"	 name="aT">

   <thead>
      <tr>
        <th class="td_top">항목명</th>
        <th class="td_top">항목설명</th>
        <th class="td_top">version</th>
        <th class="t_end td_top"><input type="checkbox" onClick="allChecked();"></th>
      </tr>
    </thead>
	<%
			int rowcnt=0;

			while(rm != null && rm.next()) {
				String api_element_id = String.valueOf((BigDecimal)rm.get("api_element_id"));
				String api_element_name = StringUtil.verify((String)rm.get("api_element_name"));
				String api_element_desc = StringUtil.verify((String)rm.get("api_element_desc"));
				String api_version = StringUtil.verify((String)rm.get("api_version"));
	%>
		<tr>
			<td><input type="text" name="api_element_name" value="<%=api_element_name %>" size="45" onFocus="chkChanged('<%=rowcnt %>');"></td>
			<td><input type="text" name="api_element_desc" value="<%=api_element_desc %>" size="25"  onFocus="chkChanged('<%=rowcnt %>');"></td>
			<td><input type="text" name="api_version" value="<%=api_version %>" size="5"  onFocus="chkChanged('<%=rowcnt %>');"></td>
			<td><input type="checkbox" name="chk"></td>
			<input type="hidden" name="api_element_id" value="<%=api_element_id %>">
			<input type="hidden" name="inUse" value="N">
			<input type="hidden" name="status" value="U">
	</tr>
	<% rowcnt++; } %>
	<tr>
		<td id="add_column" colspan="3"></td>
	</tr>
		</form>
</table>
<br>
<table width="560">
	<tr>
		<td align="right"><a href="javascript:saveClicked();"><img src="images/admin_01_03_tab_page_01_button_02.gif" border=0></a>
			<a href="javascript:removeClicked();"><img src="images/admin_01_04_tab_page_03_button_delete.gif" border=0></a></td>
	</tr>
</table>

 </div>

 </div><div class="clear"></div>

    </div>
  </div>
</div>
<div class="clear"></div>

<%@ include file="/contents/gsks/include/footer.jsp" %>

