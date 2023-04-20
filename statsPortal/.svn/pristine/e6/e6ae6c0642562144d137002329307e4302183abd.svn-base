<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>
<%
	String leftMenu="shortcut";

	if(loginYn.equals("N")) {
		//out.print("<script>alert('로그인 후 이용할 수 있습니다.'); location.href='/index.jsp'; </script> 로그인 후 이용할 수 있습니다. <a href='shortcut_05_02.jsp'>돌아가기</a>");
		session.setAttribute("returnUrl", "/contents/shortcut/shortcut_05_03_01.jsp");out.print("<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>");
		out.print("<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>");
		out.print("<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='ko' lang='ko'>");
		out.print("<head>");
		out.print("<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />");
		out.print("<title>센서스 공간통계 자료신청:통계지리 정보서비스</title>");
		out.print("</head>");
		out.print("<body>");
		out.print("<script type='text/javascript'> alert('로그인 후 이용할 수 있습니다.'); location.href='/view/member/login_new?returnPage=//sgis.kostat.go.kr/contents/shortcut/shortcut_05_03_01.jsp'; </script> ");
		
	} else {

	GeneralBroker broker = null;
	RecordModel rm = null;
	RecordModel rm1 = null;
%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="utf-8">
		<meta name="format-detection" content="telephone=no" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		
		<script src="/js/common/includeHead.js"></script>
		<script src="/js/common/common.js"></script>
		
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/common.css">
		<!--알림마당 컨텐츠 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/contents.css">
		<!--게시판 css 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/board.css">
		
		<title>자료제공|통계지리정보서비스</title>
		<script>
			var menuType = 'sc050301';
			//pageCallReg();
			$(document).ready(function() {
				srvLogWrite("A0", "14", "04", "05", "", "");
			});
			           
			function census_view(id) {
				var fm=document.censusFm;
				fm.sgis_census_req_id.value = id;
				fm.aT.value = "RET";
				fm.action="shortcut_05_03.jsp";
				fm.submit();
			}
		
			function census_del(id) {
				var fm=document.censusFm;
				var c = confirm("삭제하시겠습니까?");
			    if(c == 1) {
				   	fm.sgis_census_req_id.value = id;
				   	fm.action="shortcut_05_03_del.jsp";
				   	fm.submit();
			    }
			}
		</script>
		
		<!--mng_s 20200723 이진호 / 자료제공 서비스 개편, location 마지막 꺽쇠 제거 -->
		<style>
			#title-area .location li:nth-child(3):after {
				content : none;
			}
		</style>
		<!-- mng_e 20200723 이진호 -->
		
	</head>
	<body>
		<form name="censusFm" method="post">
			<input type="hidden" name="aT" />
			<input type="hidden" name="sgis_census_req_id" />
		</form>
		<!--wrap-->
		<div id="wrap">
			<!--header-->
			<header>
				<jsp:include page="/view/common/includeSearch"></jsp:include>
			</header>
			<!--//header-->
			<!--contents-->
			<div id="container" class="sub">
			
				<!-- mng_s 20200721 이진호 / 자료제공 서비스 개편  -->
				<!--lnb 시작-->
				<%--<jsp:include page="/jsp/board/includeLeftMenu.jsp"></jsp:include> --%>
				<jsp:include page="/jsp/board/includeLeftMenu_shortcut.jsp"></jsp:include>
				<!--//lnb 끝-->
				<!-- mng_e 20200721 이진호 -->
				
				<div id="content">
					<div id="title-area">
						<ul class="location">
						<!-- 190313 방민정 수정 시작 -->
							<li><a href="/view/view/index"><img src="/images/common/location_home.gif"/></a></li>
							
							<!-- mng_s 20200723 이진호 / 자료제공 서비스 개편 -->
							<!-- <li><a href="/view/board/sopBoardMain">알림마당</a></li> -->
							<li><a href="/contents/shortcut/shortcut_05_02.jsp">자료제공</a></li>
							<li><a href="/contents/shortcut/shortcut_05_03_01.jsp"><em>신청내역</em></a></li>
							<!-- mng_e 20200723 이진호 -->
							
						<!-- 190313 방민정 수정 끝 -->
						</ul>
						<h1 class="sub-title">센서스 공간 통계 자료신청 내역</h1>
					</div>
					<div id="contents" class="view">
						<!--view-->
						<h2>자료신청 내역</h2>
						<div class="table-type">
							<table class="table-style type01">
								<caption>통계자료 테이블</caption>
								<colgroup>
									<col style="width:100px;">
									<col style="width:120px;">
									<col style="width:140px;">
									<col style="width:160px;">
									<col style="width:200px;">
									<col style="width:auto;">
								</colgroup>
								<thead>
									<tr>
										<th class="first">NO</th>
										<th>요청번호</th>
										<th>진행상태</th>
										<th>신청일자</th>
										<th>승인/반려(일자)</th>
										<th class="last">삭제</th>
									</tr>
								</thead>
								<tbody>
								<%
									try {
										broker = new GeneralBroker("ceaa00");
										lData.setString("PARAM", "CENSUS_APPLY_GROUP");
										lData.setString("sc_userkey", sc_userkey);
										rm = broker.getList(lData);

										int totcount = rm.getRowCount();
										int i=0;
								
										while(rm != null && rm.next()) {
											String sgis_census_req_id = String.valueOf((BigDecimal)rm.get("sgis_census_req_id"));
											String sgis_census_req_status_name = StringUtil.verify((String)rm.get("sgis_census_req_status_name"));
											String sgis_census_req_status = String.valueOf((Character)rm.get("sgis_census_req_status"));
											String create_date = StringUtil.verify((String)rm.get("create_date"));
											String sgis_census_req_app_date = StringUtil.verify((String)rm.get("sgis_census_req_app_date"));
								%>
									<tr>
										<td class="first"><a href="shortcut_05_03.jsp?aT=RET&amp;sgis_census_req_id=<%=sgis_census_req_id %>" onclick="census_view('<%=sgis_census_req_id %>'); return false;"><%=totcount - i %></a></td>
										<td><a href="shortcut_05_03.jsp?aT=RET&amp;sgis_census_req_id=<%=sgis_census_req_id %>" onclick="census_view('<%=sgis_census_req_id %>'); return false;"><%=sgis_census_req_id %></a></td>
										<td ><a href="shortcut_05_03.jsp?aT=RET&amp;sgis_census_req_id=<%=sgis_census_req_id %>" onclick="census_view('<%=sgis_census_req_id %>'); return false;"><%=sgis_census_req_status_name %></a></td>
										<td><a href="shortcut_05_03.jsp?aT=RET&amp;sgis_census_req_id=<%=sgis_census_req_id %>" onclick="census_view('<%=sgis_census_req_id %>'); return false;"><%=create_date %></a></td>
										<td><%if(!sgis_census_req_status.equals("S")) {%><%=sgis_census_req_status_name%>(<%=sgis_census_req_app_date %>)<%} %></td>
										<td class="last"><%if(sgis_census_req_status.equals("S")) {%><a href="#" onclick="census_del('<%=sgis_census_req_id %>'); return false;"><img src="/contents/css/2014_css/img/btn/btn_del02.png" alt="삭제 " /></a><%} %></td>
									</tr>
								<%
											i++;
										}
										if(i == 0) {
								%>
									<tr>
										<td colspan="6" align="center" class="t_end">조회된 데이터가 없습니다.</td>
									</tr>
								<%
										}
									} catch(IllegalArgumentException e) {
										System.out.print("sgisWebError : ");
										logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
									}
								%>
								</tbody>
							</table>
						</div>
						<!--//view-->
					</div>
				</div>
			</div>
			<!--//contents-->
			<!--footer-->
			<div id="footer"><jsp:include page="/view/common/includeBottom"></jsp:include></div>
			<!--//footer-->
		</div>
		<!--//wrap-->
<% } %>
	</body>
</html>