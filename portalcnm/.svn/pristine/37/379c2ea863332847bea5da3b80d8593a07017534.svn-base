<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>


<%@ include file="/contents/gsks/include/header.jsp" %>

<SCRIPT language=javascript src="/contents/scripts/prototype.js"></SCRIPT>
srvLogWrite("L0", "03", "07", "06", "", "");

<%
	GeneralBroker broker = null;
	RecordModel rm = null;

	/* paging 초기화  */
	int pg = 1;
	int pgSize = 15;
	int blockSize = 10;
	int totPage   = 1;
	int totCount  = 0;

	if(lData.containsKey("pg")){
		pg = lData.getInt("pg");
	}

	try {
		broker = new GeneralBroker("ceaa00");

		String r_sgis_census_req_y_s_d = lData.getString("sgis_census_req_y_s_d");
		String r_sgis_census_req_y_e_d = lData.getString("sgis_census_req_y_e_d");
		String r_sgis_census_id = lData.getString("sgis_census_id");
		String r_sgis_census_data_id = lData.getString("sgis_census_data_id");
		String r_sgis_census_req_id = lData.getString("sgis_census_req_id");
		String r_sgis_census_req_year = lData.getString("sgis_census_req_year");
		String inUse = lData.getString("inUse");

		lData.setString("r_sgis_census_req_id", r_sgis_census_req_id);
		lData.setString("r_sgis_census_id", r_sgis_census_id);
		lData.setString("r_sgis_census_data_id", r_sgis_census_data_id);
		lData.setString("r_sgis_census_req_year", r_sgis_census_req_year);
		lData.setString("r_sgis_census_req_y_s_d", r_sgis_census_req_y_s_d);
		lData.setString("r_sgis_census_req_y_e_d", r_sgis_census_req_y_e_d);

		/***************************************/
		/* 게시, 종료일자 수정 */
		/***************************************/
		if(lData.getString("aT").equals("INS")) {

			lData.setString("PARAM", "UPDATE_ST_ED");
			broker.process(Const.P_UPD, lData);

		/***************************************/
		/* 게시, 종료일자 삭제 */
		/***************************************/
		} else if(lData.getString("aT").equals("DEL")) {

			lData.setString("PARAM", "REMOVE_CENSUS_REQ_YEAR_CODE3");
			broker.process(Const.P_DEL, lData);
		}

		/***************************************/
		/* 조회 */
		/***************************************/
		lData.setString("PARAM", "CENSUS_APPROVE_LIST");
		rm = broker.getList(lData);
		totCount = rm.getRowCount();	//리스트 전체 수

		rm = broker.getList(lData, pg, pgSize);

	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		e.printStackTrace();
	}

	/*  block 처리 */
	totPage  = totCount / pgSize;
	if (totCount%pgSize > 0) totPage++;

	int totalBlock = totPage/blockSize;
	if(totPage%blockSize > 0) totalBlock++;
	int block = pg/blockSize;
	if(pg % blockSize > 0) block++; //현재블럭표시

	int firstPage = (block-1)*blockSize + 1;
	int lastPage = block*blockSize;

	if(totalBlock <= block) {
		lastPage = totPage;
	}
%>

<script language="javascript">
	function editChanged(num) {
		if(document.censusFm.sgis_census_chk.length == undefined){
			eval("document.censusFm.sgis_census_chk.checked=true;");
		}else{
			eval("document.censusFm.sgis_census_chk["+num+"].checked=true;");
		}
	}

	function list(pg){
		document.searchFm.pg.value = pg;
		document.searchFm.submit();
	}

	function searchChanged() {

		if(document.searchFm.search_sel.value == "id") {
			document.searchFm.search_input.readOnly = false;
			document.searchFm.search_input.style.backgroundColor="#FFFFFF";
		} else {
			document.searchFm.search_input.readOnly = true;
			document.searchFm.search_input.style.backgroundColor="#EFEFEF";
		}
	}

	function searchClicked() {
		srvLogWrite("L0", "03", "07", "06", "", "");
		if(document.searchFm.search_sel.value == "") {
			alert("검색조건을 선택하세요.");
			return;
		} else {
			document.searchFm.submit();
		}
	}

	function saveClicked() {
		var c=confirm("저장하시겠습니까?");
		if(c == 1) {
			var cnt=document.censusFm.sgis_census_chk.length;
			var ischk=0;

			for(i=0; i < cnt; i++) {
				if(document.censusFm.sgis_census_chk[i].checked) ischk++;
			}

			if(ischk == 0) {
				alert("선택 항목이 없습니다.");
				return;
			} else {

				for(i=0; i < cnt; i++) {
					if(document.censusFm.sgis_census_chk[i].checked) document.censusFm.inUse[i].value = "Y";
					else document.censusFm.inUse[i].value = "N";
				}

				document.censusFm.aT.value = "INS";
				document.censusFm.submit();
			}
		}
	}

	function removeClicked() {
		var c=confirm("삭제하시겠습니까?");
		if(c == 1) {
			var cnt=document.censusFm.sgis_census_chk.length;
			var ischk=0;

			for(i=0; i < cnt; i++) {
				if(document.censusFm.sgis_census_chk[i].checked) ischk++;
			}
			
			if(document.censusFm.sgis_census_chk.length == undefined){
			
				if(document.censusFm.sgis_census_chk.checked == false) {
					alert("선택 항목이 없습니다.");
					return;
				} else {
	
					
					if(document.censusFm.sgis_census_chk.checked) document.censusFm.inUse.value = "Y";
					else document.censusFm.inUse.value = "N";
					
	
					document.censusFm.aT.value = "DEL";
					document.censusFm.submit();
				}
			}else{
				if(ischk == 0) {
					alert("선택 항목이 없습니다.");
					return;
				} else {
	
					for(i=0; i < cnt; i++) {
						if(document.censusFm.sgis_census_chk[i].checked) document.censusFm.inUse[i].value = "Y";
						else document.censusFm.inUse[i].value = "N";
					}
	
					document.censusFm.aT.value = "DEL";
					document.censusFm.submit();
				}
			
			}
		}
	}

	function excelDownload() {
		srvLogWrite("L0", "03", "07", "07", "", "");
		var fm = document.censusFm;
		fm.action = 'gsks_01_04_01_excel.jsp';
		fm.target = 'excelFrame';
		fm.submit();
	}
	
	function calendar_check(param1,param2,param3){
	 
		var paramLen = param2.length;
	
		if(paramLen == undefined){
			Calendar(param2,param3);
		}else{ 
		 
		 	Calendar(param1,param3);
		}
	
	
	}
</script>





		<!-- cls:header end -->
		<div class="contents">
			<!-- cls:left start -->
			<div class="lefitMenuWrapper">
				<div class="leftTitle">서비스관리</div>
				<div class="leftMenu">
					<ul>
						<li><a href="./../DT/policyMapManager.html">정책통계지도</a></li>
						<li><a href="../../html/DT/themaMapManage.html">주제도</a>
						<li><a href="../../html/DT/Community.html">통계 커뮤니티맵</a></li>	
						<li><a href="../../html/DT/KOSISManage.html">KOSIS목록 관리</a></li>
						<li><a href="../../html/DT/PUBDataManage.html">공공데이터 관리</a></li>
						<li><a href="../../html/DT/BannerManage.html">배너관리</a></li>
						<li><a class="on">자료제공 관리</a>
							<ul class="sub">
								<li><a href="/s-portalcnm/contents/gsks/gsks_01_04.jsp">요청목록</a></li>
								<!-- <li><a href="/s-portalcnm/contents/gsks/gsks_01_04_01.jsp" class="on">자료제공</a></li> --><!-- mng_s 20220324사용하지않는 기능인데 쿼리가 오려걸려 주석처리함  -->
								<li><a href="/s-portalcnm/contents/gsks/gsks_01_04_05.jsp">자료제공 현황</a></li>
								<li><a href="/s-portalcnm/contents/gsks/gsks_01_04_06.jsp">결제관리</a></li>
								<li><a href="/s-portalcnm/ststistics/ststisticsUSProvideDataMng.do">자료제공서비스 자동화</a></li><!-- SGIS_4 자료제공서비스 자동화 추가 -->
								<li><a href="/s-portalcnm/ststistics/ststisticsUSGridInfo.do">격자자료 제공서비스 자동화</a></li><!-- SGIS_4 자료제공서비스 자동화 추가 -->
							</ul>
						</li>
						<li><a href="../../html/DT/Gallerylist.html">통계갤러리 관리</a></li>
						<li><a href="../../html/DT/MobileManage.html">모바일 서비스 관리</a></li>
					</ul>
				</div>
			</div>
			<!-- cls:left end -->
			<div class="acticle">
				<div class="location">
					<p>
						<a href="#"><img src="/s-portalcnm/html/include/img/ico/ico_home.png"
							alt="home" /></a> <span><img
							src="/s-portalcnm/html/include/img/ico/ico_navi.png" alt="다음" /></span> <span>서비스관리</span>
						<span><img src="/s-portalcnm/html/include/img/ico/ico_navi.png" alt="다음" /></span>
						<span class="fontS"> 자료제공 관리</span>
						
						
					</p>
				</div>
				<p class="title01">자료제공</p>


	<table class="apiTable013" >
		<form name="censusFm" method="post">
			<input type="hidden" name="aT">
			<input type="hidden" name="search_sel" value="<%=lData.getString("search_sel")%>">
			<input type="hidden" name="search_input" value="<%=lData.getString("search_input")%>">

    <thead>
      <tr>
		<!-- 2018. 02. 08 mng_s -->
		<!--         <th class="td_top" width="30"></th> -->
        <th class="td_top" width="50">성명(ID)</th>
        <th class="td_top" width="100">구분</th>
        <th class="td_top" width="200">대상자료명</th>
        <th class="td_top" width="40">년도</th>
        <th class="td_top">승인일자</th>
        <th class="td_top" width="80">게시시작일자</th>
        <th class="t_end td_top" width="80">게시종료일자</th>
        <!-- 2018. 02. 08 mng_e -->
      </tr>
    </thead>
    <tbody>
      <%
      try {

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

	     			String short_sgis_census_name = StringUtil.toShortenStringB(sgis_census_name, 20);
      			String short_sgis_census_data_name = StringUtil.toShortenStringB(sgis_census_data_name, 12);
      			
      			// 2018. 02. 08 mng_s
      			String sgis_census_detail_data_nm = StringUtil.verify((String)rm.get("sgis_census_detail_data_nm"));
      			String short_sgis_census_detail_data_nm = StringUtil.toShortenStringB(sgis_census_detail_data_nm, 50);
      			// 2018. 02. 08 mng_e
      			
      %>
      <tr>
		<!-- 2018. 02. 08 mng_s -->
		<!--         <td class="cell_center"><input type="checkbox" name="sgis_census_chk"></td> -->
		<!-- 2018. 02. 08 mng_e -->
		
        <td class="cell_left"><%=sgis_name %>(<%=sgis_member_id %>)</td>
        <td class="cell_left" title="<%=sgis_census_name%>"><%=short_sgis_census_name %></td>
        
        <!-- 2018. 02. 08 mng_s -->
        <td class="cell_left" title="<%=sgis_census_detail_data_nm%>"><%=short_sgis_census_detail_data_nm %></td>
        <!-- 2018. 02. 08 mng_e -->
        
        <td class="cell_center"><%=sgis_census_req_year %></td>
        <td class="cell_center"><%=sgis_census_app_date %></td>
        
        <!-- 2018. 02. 08 mng_s -->
        <td class="cell_center"><%=sgis_census_req_y_s_d %></td>
        <td class="cell_center"><%=sgis_census_req_y_e_d %></td>
        <!-- 2018. 02. 08 mng_s -->
        
        <input type="hidden" name="sgis_census_req_id" value="<%=sgis_census_req_id%>">
				<input type="hidden" name="sgis_census_id" value="<%=sgis_census_id%>">
				<input type="hidden" name="sgis_census_data_id" value="<%=sgis_census_data_id%>">
				<input type="hidden" name="sgis_census_req_year" value="<%=sgis_census_req_year%>">
        <input type="hidden" name="inUse">

      </tr>
      <%rowcnt++; }

      } catch(Exception e) {
    	  System.out.print("sgisWebError : ");
		  e.printStackTrace();
      }
      %>

    </tbody>
    </form>
  </table>

<div>
    <div class="list_button_right_02">
	   <a href="javascript:;" onclick="excelDownload();"><img src="images/admin_button_download_excel.gif" alt="엑셀다운로드" width="100" height="22" border="0" align="absmiddle"></a>

		<!-- 2018. 02. 08 mng_s -->
		<!--      <a href="javascript:saveClicked();"><img src="images/admin_01_03_tab_page_01_button_02.gif" alt="저장" align="absmiddle"/></a> -->
		<!--      <a href="javascript:removeClicked();"><img src="images/admin_01_04_tab_page_03_button_delete.gif" alt="삭제" align="absmiddle"/></a> -->
		<!-- 2018. 02. 08 mng_e -->
</div>

<div class="clear">

				<ul class="pageList">
					<!-- page 처리 -->
					<%@ include file="/contents/include/pagelist.jsp" %>
					<!-- page 처리 -->
				</ul>
</div>

	<div align="center">
      <div class="list_search ">
        <form name="searchFm" method="post">
        	<input type="hidden" name="pg" value="<%=pg %>">
	
	<table border=0 style="border-top:0px solid #1c2e63; width:300px; margin-left:220px; margin-top:15px; clear: both; position: relative;">
		<tr>
			<td>
	          <select name="search_sel" class="search_sel" style="width:80px" onChange="searchChanged();">
	          	<option value="id" <%if(!StringUtil.isEmpty(lData.getString("search_sel"))) {%>selected<%} %>>성명(ID)</option>
	          </select>
	          <input name="search_input" type="text" id="list_search_input" value="<%=lData.getString("search_input")%>"/>
	          <input name="image" onclick="searchClicked();" type='image' src="/s-portalcnm/contents/gsks/images/support_button_search.gif" alt="검색" align="absmiddle" width="57px" height="19px" border="0" />
			</td>
        </tr>
	</table>
			     
          
          </form>
      </div>
	</div>

					</div>
				</div>
			</div>
  </div>
</div>
<div class="clear"></div>

<iframe name="excelFrame" src="" frameborder=0 width=0 height=0></iframe>
<SCRIPT language=javascript src="/contents/scripts/calendar_layer.js"></SCRIPT>

<!-- cls:footer start -->
<div class="footerWrapper" id="gsksFooterWrapper"></div>

</body>
</html>