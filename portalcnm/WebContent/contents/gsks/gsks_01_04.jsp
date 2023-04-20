<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/gsks/include/header.jsp" %>
<%--@ include file="/contents/gsks/include/leftMenu.jsp" --%>

<%
		GeneralBroker broker = null;
		RecordModel rm = null;
		RecordModel rm1 = null;

		/* paging 초기화  */
		int pg = 1;
		int pgSize = 15;
		int blockSize = 10;
		int totPage   = 1;
		int totCount  = 0;

		if(lData.containsKey("pg"))        pg = lData.getInt("pg");

		try {

			broker = new GeneralBroker("ceaa00");

			/**************************************/
			/* 조회 */
			/**************************************/
			lData.setString("PARAM", "CENSUS_APPLY_GROUP_LIST");
			rm = broker.getList(lData);
			totCount = rm.getRowCount();	//리스트 전체 수

			rm = broker.getList(lData, pg, pgSize);

		} catch(Exception e) {
			out.print(e);
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
srvLogWrite("L0", "03", "07", "01", "", "");
	function list(pg){
		document.censusFm.pg.value = pg;
		document.censusFm.submit();
	}

function onLoadAjax(id) {}

	function searchClicked() {
			srvLogWrite("L0", "03", "07", "01", "", "");
			document.censusFm.submit();
	}

	function detailView(id) {
		srvLogWrite("L0", "03", "07", "02", "", "");
		var fm=document.censusFm;
		fm.sgis_census_req_id.value = id;
		fm.action="gsks_01_04_04.jsp";
		fm.submit();
	}


//대상자료 선택 (사용하지 않음)
function locationChanged() {}


</script>

  	<form name="censusFm" method="post">
			<input type="hidden" name="aT">
			<input type="hidden" name="sgis_census_req_id">
     	<input type="hidden" name="pg" value="<%=pg %>">







		<!-- cls:header end -->
		<div class="contents">
			<!-- cls:left start -->
			<div class="lefitMenuWrapper">
				<div class="leftTitle">서비스관리</div>
				<div class="leftMenu">
					<ul>
						<li><a href="../../html/DT/policyMapManager.html">정책통계지도</a></li>
						<li><a href="../../html/DT/themaMapManage.html">주제도</a>
						<li><a href="../../html/DT/Community.html">통계 커뮤니티맵</a></li>	
						<li><a href="../../html/DT/KOSISManage.html">KOSIS목록 관리</a></li>
						<li><a href="../../html/DT/PUBDataManage.html">공공데이터 관리</a></li>
						<li><a href="../../html/DT/BannerManage.html">배너관리</a></li>
						<li><a class="on">자료제공 관리</a>
							<ul class="sub">
								<li><a href="/s-portalcnm/contents/gsks/gsks_01_04.jsp" class="on">요청목록</a></li>
								<!-- <li><a href="/s-portalcnm/contents/gsks/gsks_01_04_01.jsp">자료제공</a></li> --><!-- 사용하지않는 기능인데 쿼리가 오려걸려 주석처리함 mng_s 20210909 -->
								<li><a href="/s-portalcnm/contents/gsks/gsks_01_04_05.jsp">자료제공 현황</a></li>
								<li><a href="/s-portalcnm/contents/gsks/gsks_01_04_06.jsp">결제관리</a></li>
								<li><a href="/s-portalcnm/contents/gsks/gsks_01_08.jsp">실시간 자료 관리</a></li>
								<li><a href="/s-portalcnm/ststistics/ststisticsUSProvideDataMng.do">자료제공서비스 자동화</a></li>
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
				<p class="title01">요청목록</p>
				
					
				
				
				
				
				<br>
				
				
				
				
				<table width="100%" border="0" cellpadding="0" cellspacing="0" class="apiTable02" summary="인증키관리에 대한 내용입니다." >
				  <thead>
				
				      <tr>
				        <th style="padding:5px 15px;  border-left:0px solid #cacaca; border-bottom:1px solid #cacaca;  font-size: 12px; color:#4a4a4a;  text-align:center; height:28px;" width="50">No</th>
				        <th style="padding:5px 15px;  border-left:1px solid #cacaca; border-bottom:1px solid #cacaca;  font-size: 12px; color:#4a4a4a;  text-align:center; height:28px;"class="td_top" width="110">신청자(ID)</th>
				        <th style="padding:5px 15px;  border-left:1px solid #cacaca; border-bottom:1px solid #cacaca;  font-size: 12px; color:#4a4a4a;  text-align:center; height:28px;"class="td_top" width="100">요청번호</th>
				        <th style="padding:5px 15px;  border-left:1px solid #cacaca; border-bottom:1px solid #cacaca;  font-size: 12px; color:#4a4a4a;  text-align:center; height:28px;"class="td_top" width="100">진행상태</th>
				        <th style="padding:5px 15px;  border-left:1px solid #cacaca; border-bottom:1px solid #cacaca;  font-size: 12px; color:#4a4a4a;  text-align:center; height:28px;"class="td_top" width="70">신청일자</th>
				        <th style="padding:5px 15px;  border-left:1px solid #cacaca; border-right:0px solid #cacaca;border-bottom:1px solid #cacaca;  font-size: 12px; color:#4a4a4a;  text-align:center; height:28px;"class="t_end td_top" width="120">승인/반려처리</th>
				      </tr>
				    </thead>
				
				    <tbody>
				      <%
				      		int rowcnt=0;
				      		while(rm != null && rm.next()) {
				      			String sgis_census_req_id = String.valueOf((BigDecimal)rm.get("sgis_census_req_id"));
				      			String sgis_name = StringUtil.verify((String)rm.get("sgis_name"));
				      			String sgis_member_id = StringUtil.verify((String)rm.get("sgis_member_id"));
				      			String create_date = StringUtil.verify((String)rm.get("create_date"));
				      			String sgis_census_req_status = String.valueOf((Character)rm.get("sgis_census_req_status"));
				      			String sgis_census_req_status_name = "";
				      			if (sgis_census_req_status.equals("S")) {
				      				sgis_census_req_status_name = "신청";
				      			}else if (sgis_census_req_status.equals("A")){
				      				sgis_census_req_status_name = "승인";
				      			}else if (sgis_census_req_status.equals("B")){
				      				sgis_census_req_status_name = "반려";	
				      			}
				      			String sgis_census_req_app_date = StringUtil.verify((String)rm.get("sgis_census_req_app_date"));
				      %>
				      <tr>
				        <td style="padding:5px 15px;  border-left:0px solid #cacaca; border-bottom:1px solid #cacaca;  font-size: 12px; color:#4a4a4a;  text-align:center; height:28px;"class="cell_center"><%=(totCount - (pg-1)*pgSize - rowcnt) %></td>
				        <td style="padding:5px 15px;  border-left:1px solid #cacaca; border-bottom:1px solid #cacaca;  font-size: 12px; color:#4a4a4a;  text-align:center; height:28px;" class="cell_center"><%=sgis_name %>(<%=sgis_member_id %>)</td>
				        <td style="padding:5px 15px;  border-left:1px solid #cacaca; border-bottom:1px solid #cacaca;  font-size: 12px; color:#4a4a4a;  text-align:center; height:28px;" class="cell_center"><%=sgis_census_req_id %></td>
				        <td style="padding:5px 15px;  border-left:1px solid #cacaca; border-bottom:1px solid #cacaca;  font-size: 12px; color:#4a4a4a;  text-align:center; height:28px;" class="cell_center"><%=sgis_census_req_status_name %><%if(!sgis_census_req_status.equals("S")) { %>(<%=sgis_census_req_app_date%>)<%} %></td>        
				        <td style="padding:5px 15px;  border-left:1px solid #cacaca; border-bottom:1px solid #cacaca;  font-size: 12px; color:#4a4a4a;  text-align:center; height:28px;" class="cell_center"><%=create_date %></td>
				        <td style="padding:5px 15px;  border-left:1px solid #cacaca; border-bottom:1px solid #cacaca;  font-size: 12px; color:#4a4a4a;  text-align:center; height:28px;" class="cell_center"><a href="javascript:detailView('<%=sgis_census_req_id %>');">[상세]</a></td>
				      </tr>
				      <% rowcnt++; } %>
				      
				  	</tbody>
				
				  </table>
				
				<ul class="pageList">
					<!-- page 처리 -->
					<%@ include file="/contents/include/pagelist.jsp" %>
					<!-- page 처리 -->
				</ul>
				
				
				
					<table border=0 style="border-top:0px solid #1c2e63; width:300px; margin-left:220px; margin-top:15px; clear: both; position: relative;">
						<tr>
							<td>
						        <select name="search_sel2" class="search_sel" style="width:50px">
						            <option value="">전체</option>
						            <option value="S" <%if(lData.getString("search_sel2").equals("S")) {%>selected<%} %>>신청</option>
						            <option value="A" <%if(lData.getString("search_sel2").equals("A")) {%>selected<%} %>>승인</option>
						            <option value="B" <%if(lData.getString("search_sel2").equals("B")) {%>selected<%} %>>반려</option>
						        </select>
					        </td>
					        <td>
						        <b>신청자(ID)</b>&nbsp;<input name="search_input" type="text" id="list_search_input" style="width:65px" value="<%=lData.getString("search_input")%>"/>
						        <div id='detailMenuDiv' type='table' data='/contents/shortcut/shortcut_05_03_02.jsp' foRow='1' style=" overflow-y:hidden;"></div>
							</td>
							<td>
						        <input name="image" onclick="searchClicked();" type='image' src="/s-portalcnm/contents/gsks/images/support_button_search.gif" alt="검색" align="absmiddle" width="57px" height="19px" border="0" />
					        </td>
			       		</tr>
			        </table>
			     
				     
				
				
				</div>
					
					
				 
					
				  
				
			      	</div>
				
				
				</form>
				

	<!-- cls:footer start -->
	<div class="footerWrapper" id="gsksFooterWrapper"></div>
</body>
</html>