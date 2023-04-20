<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<html>
<%@ include file="/contents/gsks/include/header.jsp" %>


<SCRIPT language=javascript src="/s-portalcnm/contents/scripts/prototype.js"></SCRIPT>



<%
	GeneralBroker broker = null;
	RecordModel rm = null;
	RecordModel rm1 = null;

	String sgis_census_req_id	= lData.getString("sgis_census_req_id");
	String sgis_census_id = "";
	String census_output_area_year = "";
	String sgis_census_name = "";
	String sgis_census_data_id = "";
	String sgis_census_data_name = "";
	String sgis_census_req_app_date = "";
	String create_date = "";
	String sgis_census_req_status = "";
	String sgis_census_req_status_name = "";
	String sgis_member_key = "";
	String sgis_name = "";
	String sgis_member_id = "";
	String sgis_census_req_company = "";
	String sgis_census_req_tel = "";
	String sgis_census_req_file = "";
	String sgis_census_location = "";
	String sgis_census_req_goal = "";
	String sgis_census_req_reject = "";

	String years="";
	
	String sgis_census_req_email = "";
	String sgis_census_req_sosok = "";
	String sgis_census_req_mokjuk = "";
	String sgis_census_req_kwaje = "";
	String sgis_census_req_year = "";
	String sgis_census_sido_id = "";
	String sgis_census_sido_nm = "";
	String sgis_census_sigungu_id = "";
	String sgis_census_sigungu_nm = "";
	String sgis_census_detail_data_id = "";
	String sgis_census_detail_data_nm = "";

	try {

		broker = new GeneralBroker("ceaa00");

		/**************************************/
		/* 승인, 반려, 수정 처리 */
		/* 승인 : A, 반려 : B, 수정 : EDIT */
		/**************************************/
		if(lData.getString("aT").equals("UPD")) {

			System.out.println(lData.getString("approve_status"));
			//수정이 아닌경우 상태처리
			if(!lData.getString("approve_status").equals("EDIT")) {
				lData.setString("PARAM", "UPDATE_CENSUS_APPLY_STATUS");
				broker.process(Const.P_UPD, lData);
			}
			
			
			//승인처리 20220628 김흥교
			if(lData.getString("approve_status").equals("A")) {
				lData.setString("PARAM", "UPDATE_CENSUS_APPLY_STATUS_DATE");
				broker.process(Const.P_UPD, lData);
			}
			

			/************************/
			/* 서비스등록 */
			/************************/
			//수정일때
			if(lData.getString("approve_status").equals("EDIT")) {
				//년도 및 게시일자 처리
				lData.setString("PARAM", "REMOVE_CENSUS_REQ_YEAR_CODE2");
				broker.process(Const.P_DEL, lData); //개발 디버그를 위하여 일단 주석처리함. 디버그 후 주석제거 요망 2014.05.16 김준하

				lData.setString("PARAM", "CENSUS_APPLY_ST_ED_YEAR");
				broker.process(Const.P_INS, lData);
			}

		}

		/**************************************/
		/* 조회 */
		/**************************************/
		lData.setString("PARAM", "CENSUS_APPLY_INFO2");
		rm = broker.getList(lData);

		if(rm.next()) {
			//sgis_census_id	= String.valueOf((BigDecimal)rm.get("sgis_census_id"));
			//sgis_census_name = StringUtil.verify((String)rm.get("sgis_census_code_name"));
			//sgis_census_data_id = String.valueOf((BigDecimal)rm.get("sgis_census_data_id"));
			//sgis_census_data_name = StringUtil.verify((String)rm.get("sgis_census_data_name"));
			create_date = StringUtil.verify((String)rm.get("create_date"));
			sgis_census_req_app_date = StringUtil.verify((String)rm.get("sgis_census_req_app_date"));
			sgis_census_req_status = String.valueOf((Character)rm.get("sgis_census_req_status"));
			sgis_census_req_status_name = StringUtil.verify((String)rm.get("sgis_census_req_status_name"));
			sgis_name = StringUtil.verify((String)rm.get("sgis_name"));
			sgis_member_id = StringUtil.verify((String)rm.get("sgis_member_id"));
			sgis_census_req_company = StringUtil.verify((String)rm.get("sgis_census_req_company"));
			sgis_census_req_tel = StringUtil.verify((String)rm.get("sgis_census_req_tel"));
			sgis_census_req_file = StringUtil.verify((String)rm.get("sgis_census_req_file"));
			if(sgis_census_req_file.equals("null")) sgis_census_req_file = "";
			sgis_census_location = StringUtil.verify((String)rm.get("sgis_census_location"));
			sgis_census_req_goal = StringUtil.verify((String)rm.get("sgis_census_req_goal"));
			sgis_census_req_goal = sgis_census_req_goal.replaceAll("&apos;","\'").replaceAll("&quot;","\"").replaceAll("&amp;","&");
			sgis_census_req_reject = StringUtil.verify((String)rm.get("sgis_census_req_reject")).replaceAll("&apos;","\'").replaceAll("&quot;","\"").replaceAll("&amp;","&");
			
			sgis_census_req_email = StringUtil.verify((String)rm.get("sgis_census_req_email"));
            sgis_census_req_sosok = StringUtil.verify((String)rm.get("sgis_census_req_sosok"));
            sgis_census_req_mokjuk = StringUtil.verify((String)rm.get("sgis_census_req_mokjuk"));
            sgis_census_req_kwaje = StringUtil.verify((String)rm.get("sgis_census_req_kwaje"));
            sgis_census_req_year = StringUtil.verify((String)rm.get("sgis_census_req_year"));
            sgis_census_sido_id = StringUtil.verify((String)rm.get("sgis_census_req_sido"));
            sgis_census_sido_nm = StringUtil.verify((String)rm.get("sido_nm"));
            sgis_census_sigungu_id = StringUtil.verify((String)rm.get("sgis_census_req_sigungu"));
            sgis_census_sigungu_nm = StringUtil.verify((String)rm.get("sigungu_nm"));
            census_output_area_year = StringUtil.verify((String)rm.get("census_output_area_year"));
            sgis_census_detail_data_id = StringUtil.verify((String)rm.get("sgis_census_detail_data_id"));
            sgis_census_detail_data_nm = StringUtil.verify((String)rm.get("sgis_census_detail_data_nm"));
		}

			/********************************/
			/* 년도 */
			/********************************/
			lData.setString("PARAM", "CENSUS_APPLY_ST_ED_YEAR_GROUP");
			rm1 = broker.getList(lData);

			while(rm1 != null && rm1.next()) {
				String e_sgis_census_req_y_use_che = String.valueOf((Character)rm1.get("sgis_census_req_y_use_che"));
				if(e_sgis_census_req_y_use_che.equals("Y")) {
					years += StringUtil.verify((String)rm1.get("sgis_census_req_year")) + ", ";
				}
			}

	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		e.printStackTrace();
	}

%>
 
<script language="javascript">
	function confirmClicked() {
		
		srvLogWrite("L0", "03", "07", "03", "", "");
		
		var fm=document.censusFm;

		var c = confirm("승인하시겠습니까?");
		if(c == 1) {
			if(document.censusFm.refuse.value.trim() == "") {
				alert("승인내용을 입력하세요.");
				return;
			}else{
				jQuery('.wrap-loading').css("display","block");
				jQuery.ajax({
					type:"POST",
					url: "/s-portalcnm" + "/ServiceAPI/Common/getDetaildataCount.json",
					data:{"SGIS_CENSUS_REQ_ID":jQuery("#sgis_census_req_id").val()},
					success:function(data){
						var censusDataCount = data.result.count;
						if(censusDataCount > 0){
							jQuery.ajax({
								type:"POST",
								url: "/s-portalcnm" + "/ServiceAPI/Common/makeZipFile.json",
								data:{"SGIS_CENSUS_REQ_ID":jQuery("#sgis_census_req_id").val()},
								success:function(data){
								if(fm.inUse == undefined) {
										if(fm.sgis_census_chk.checked) fm.inUse.value = "Y";
										else fm.inUse.value = "N";
								} else {
									for(i=0; i < fm.inUse.length; i++) {
										if(fm.sgis_census_chk[i].checked) fm.inUse[i].value = "Y";
										else fm.inUse[i].value = "N";
									}
								}
								document.censusFm.action = "";
								document.censusFm.aT.value="UPD";
								document.censusFm.approve_status.value="A";
								document.censusFm.target = "_self";
								document.censusFm.submit();
								},beforeSend:function(){
									jQuery('.wrap-loading').css("display","block");

							    },complete:function(){
							    	
							    },error:function(data) {
								}
								});
						}else{
						if(fm.inUse == undefined) {
								if(fm.sgis_census_chk.checked) fm.inUse.value = "Y";
								else fm.inUse.value = "N";
						} else {
							for(i=0; i < fm.inUse.length; i++) {
								if(fm.sgis_census_chk[i].checked) fm.inUse[i].value = "Y";
								else fm.inUse[i].value = "N";
							}
						}
						document.censusFm.action = "";
						document.censusFm.aT.value="UPD";
						document.censusFm.approve_status.value="A";
						document.censusFm.target = "_self";
						document.censusFm.submit();
						jQuery('.wrap-loading').css("display","none");
							} 
					},
					beforeSend:function(){
						jQuery('.wrap-loading').css("display","block");

				    },
				    complete:function(){
				    	
				    },
					error:function(data) {
					}
				});
			}
		}
	}

	function refuseClicked() {
		srvLogWrite("L0", "03", "07", "04", "", "");
		var c = confirm("반려하시겠습니까?");
		if(c == 1) {
			if(document.censusFm.refuse.value.trim() == "") {
				alert("반려내용을 입력하세요.");
				return;
			} else {
				document.censusFm.action = "";
				document.censusFm.aT.value="UPD";
				document.censusFm.approve_status.value="B";
				document.censusFm.target = "_self";
				document.censusFm.submit();
			}
		}
	}

	function editClicked() {
		srvLogWrite("L0", "03", "07", "05", "", "");
		var fm=document.censusFm;
		var c = confirm("수정하시겠습니까?");
		if(c == 1) {
			if(fm.inUse.length == undefined) {
					if(fm.sgis_census_chk.checked) fm.inUse.value = "Y";
					else fm.inUse.value = "N";
			} else {
				for(i=0; i < fm.inUse.length; i++) {
					if(fm.sgis_census_chk[i].checked) fm.inUse[i].value = "Y";
					else fm.inUse[i].value = "N";
				}
			}
			document.censusFm.action = "";
			document.censusFm.aT.value="UPD";
			document.censusFm.approve_status.value="EDIT";
			document.censusFm.target = "_self";
			document.censusFm.submit();
		}
	}

	function editChanged(num) {
		eval("document.censusFm.sgis_census_chk["+num+"].checked=true;");
	}

	function censusList() {
		var fm=document.listFm;
		fm.action="gsks_01_04.jsp";
		fm.target = "_self";
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

	function len_chk(len){

	    var frm = document.censusFm.refuse;

	    if(getLength(frm.value) > len ){
	       alert("입력가능한 글자수는 한글 "+len/2+"자, 영문 " +len+ "자로 제한되어 있습니다.")
	       frm.value = frm.value.substring(0, len/2);
	       frm.focus();
	    }
	}
</script>


<!-- 
디버깅용 ==> lData.getString("aT") [<%= lData.getString("aT") %>]
<br>sgis_census_req_status [<%=sgis_census_req_status %>]
<br>approve_status [<%=lData.getString("approve_status")%>]
<br>approve_status [<%=lData.getString("approve_status")%>]
 -->

<body>
		<!-- cls:header end -->
		<div class="contents">
			<!-- cls:left start -->
			<div class="lefitMenuWrapper">
				<div class="leftTitle">서비스관리</div>
				<div class="leftMenu">
					<ul>
						<li><a href="../../html/DT/themaMapManage.html">주제도</a>
						<li><a href="./../DT/Community.html">통계 커뮤니티맵</a></li>	
						<li><a href="../../html/DT/KOSISManage.html">KOSIS목록 관리</a></li>
						<li><a href="../../html/DT/PUBDataManage.html">공공데이터 관리</a></li>
						<li><a href="./../DT/BannerManage.html">배너관리</a></li>
						<li><a class="on">자료제공 관리</a>
							<ul class="sub">
								<li><a href="/s-portalcnm/contents/gsks/gsks_01_04.jsp" class="on">요청목록</a></li>
								<!-- <li><a href="/s-portalcnm/contents/gsks/gsks_01_04_01.jsp">자료제공</a></li> --><!-- mng_s 20220324사용하지않는 기능인데 쿼리가 오려걸려 주석처리함  -->
								<li><a href="/s-portalcnm/contents/gsks/gsks_01_04_05.jsp">자료제공 현황</a></li>
								<li><a href="/s-portalcnm/contents/gsks/gsks_01_04_06.jsp">결제관리</a></li>
								<li><a href="/s-portalcnm/contents/gsks/gsks_01_08.jsp">실시간 자료 관리</a></li>
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
				
				
				
				
				<br />
				
				
				

		<form name="listFm" method="post">
				<input type="hidden" name="search_input" value="<%=lData.getString("search_input") %>">
				<input type="hidden" name="search_sel2" value="<%=lData.getString("search_sel2") %>">
		</form>

	<form name="censusFm" method="post">
		<input type="hidden" name="aT">
		<input type="hidden" name="approve_status">
		<input type="hidden" id="sgis_census_req_id" name="sgis_census_req_id" value="<%=sgis_census_req_id %>">
		<input type="hidden" id="getDetaildataCount">

	<!-- 파일다운로드  -->
  <input type="hidden" name="filename" value="">
  <input type="hidden" name="path" value="/census/reqdoc/">	
	 
	 <!-- 
	 <div class="clear"><br></div>

		  <div class="openapi_special">
            <div class="box_style_4_top"></div>
								<div class="box_style_4_middle">
										<div class="openapi_special_content">
				 -->
	
				  <table style="width:740px;">
				  	<tr>
				  		<td bgcolor="#FFFFFF">
				  				<table class="popupTable05" style="width:740px;">
										<tr bgcolor="#FFFFFF">
											<th class="td_top" align="left" width="100px">성명(ID) </th>
											<td class="td_top td_end"><%=sgis_name %>(<%=sgis_member_id %>)</td>
										</tr>
										<tr bgcolor="#FFFFFF">
											<th align="left">회사 </th>
											<td class="td_end"><%=sgis_census_req_company %></td>
										</tr>
										<tr bgcolor="#FFFFFF">
											<th align="left">연락처 </th>
											<td class="td_end"><%=sgis_census_req_tel %></td>
										</tr>
										<tr bgcolor="#FFFFFF">
											<th align="left">신청일자 </th>
											<td><%=create_date %></td>
										</tr>
										
										
										<tr bgcolor="#FFFFFF">
											<th align="left">메일주소 </th>
											<td><%=sgis_census_req_email %></td>
										</tr>
										<tr bgcolor="#FFFFFF">
											<th align="left">소속구분 </th>
											<td>
												<%if(sgis_census_req_sosok.equals("001001")) { %>중앙행정기관<%} %>
												<%if(sgis_census_req_sosok.equals("001002")) { %>지방자치단체<%} %>
												<%if(sgis_census_req_sosok.equals("001003")) { %>공사/공단<%} %>
												<%if(sgis_census_req_sosok.equals("001004")) { %>학술기관<%} %>
												<%if(sgis_census_req_sosok.equals("001005")) { %>민간<%} %>
											</td>
										</tr>
										<tr bgcolor="#FFFFFF">
											<th align="left">요청목적 </th>
											<td>
												<%if(sgis_census_req_mokjuk.equals("002001")) { %>DB<%} %>
												<%if(sgis_census_req_mokjuk.equals("002002")) { %>연구<%} %>
												<%if(sgis_census_req_mokjuk.equals("002003")) { %>작성<%} %>
											</td>
										</tr>
										<tr bgcolor="#FFFFFF">
											<th align="left">수행과제 </th>
											<td><%=sgis_census_req_kwaje %></td>
										</tr>
										
										
										<tr bgcolor="#FFFFFF">
											<th align="left">첨부파일 </th>
											<td class="td_end">
                                                 <%if(sgis_census_req_file.equals("null")) { %>
											     <%} else { %>
															<span onclick="javascript:fileDownload(censusFm,'<%=sgis_census_req_file%>')" style="cursor:pointer;text-decoration:underline"><%=sgis_census_req_file%></span>
												 <%} %>										
											</td>
										</tr>
										<tr bgcolor="#FFFFFF">
											<th align="left">활용목적 </th>
											<td class="td_end"><%=StringUtil.toLine(sgis_census_req_goal) %></td>
										</tr>
										<tr bgcolor="#FFFFFF">
											<th align="left">집계구 기준년도</th>
											<td class="td_end"><%=StringUtil.toLine(census_output_area_year) %></td>
										</tr>
										<tr bgcolor="#FFFFFF">
											<td height="15" colspan="2" style="border-right:0px;"></td>
										</tr>
										
										<tr bgcolor="#FFFFFF">
											<th align="left">승인여부 </th>
											<td class="td_end"><%=sgis_census_req_status_name %></td>
										</tr>
										<tr bgcolor="#FFFFFF">
											<th align="left"><%if(sgis_census_req_status.equals("B")){ %>반려일자<%}else{%>승인일자<%}%> </th>
											<td class="td_end"><%=sgis_census_req_app_date %></td>
										</tr>
										<%if(sgis_census_req_status.equals("B") || sgis_census_req_status.equals("A")) {%>
										<tr bgcolor="#FFFFFF">
											<th align="left">승인/반려내용 </th>
											<td class="td_end"><%=sgis_census_req_reject %></td>
										</tr>
										<%} %>
									</table>
								</td>
							</tr>
				  </table>
									  

	<table>
		<tr>
			<td height="20"></td>
		</tr>
	</table>


	

	<table  cellpadding="0" cellspacing="0" class="apiTable013">
      
      	<tr>
	        <th class="td_top" style="display: none;">선택</th>
	        <th class="td_top">자료구분</th>
	        <th class="td_top">대상자료명</th>
	        <th class="td_top">세부자료명</th>
	        <th class="td_top">년도</th>
	        <th class="td_top">시도</th>
	        <th class="td_top">시군구</th>
	        <th class="td_top">게시시작일자</th>
	        <th class="td_end td_top">게시종료일자</th>
    	</tr>
      
    	<%
    			rm1.setIterator();
    			int rowcnt=0;

    			while(rm1 != null && rm1.next()) {
					 String r_sgis_census_id = String.valueOf((BigDecimal)rm1.get("sgis_census_id"));
					 String r_sgis_census_data_id = String.valueOf((BigDecimal)rm1.get("sgis_census_data_id"));    				
					 String r_sgis_census_req_year = StringUtil.verify((String)rm1.get("sgis_census_req_year"));
					 String r_sgis_census_req_y_s_d = StringUtil.verify((String)rm1.get("sgis_census_req_y_s_d"));
					 String r_sgis_census_req_y_e_d = StringUtil.verify((String)rm1.get("sgis_census_req_y_e_d"));
					 String r_sgis_census_req_y_use_che = String.valueOf((Character)rm1.get("sgis_census_req_y_use_che"));
					 String sgis_census_code_name = StringUtil.verify((String)rm1.get("sgis_census_code_name"));
					 sgis_census_name = StringUtil.verify((String)rm1.get("sgis_census_name"));
					 
	                 sgis_census_sido_id 	= StringUtil.verify((String)rm1.get("sgis_census_req_sido"));
	                 sgis_census_sido_nm 	= StringUtil.verify((String)rm1.get("sido_nm"));
	                 sgis_census_sigungu_id = StringUtil.verify((String)rm1.get("sgis_census_req_sigungu"));
	                 sgis_census_sigungu_nm = StringUtil.verify((String)rm1.get("sigungu_nm"));
	                 sgis_census_detail_data_id = StringUtil.verify((String)rm1.get("sgis_census_detail_data_id"));
	                 sgis_census_detail_data_nm = StringUtil.verify((String)rm1.get("sgis_census_detail_data_nm"));

					 
					 if(StringUtil.isEmpty(r_sgis_census_req_y_s_d)) r_sgis_census_req_y_s_d = StringUtil.split(sc_toDay,"422","-");
					 if(StringUtil.isEmpty(r_sgis_census_req_y_e_d)) r_sgis_census_req_y_e_d = StringUtil.split((String.valueOf(DateTime.calDay(7))),"422","-");	//한달뒤
					 
					String sgis_census_req_map_level ="-";
					String sgis_census_req_map_code ="-";
					
					if(r_sgis_census_id.equals("7") || (r_sgis_census_id.equals("8") && r_sgis_census_data_id.equals("0") )){
						sgis_census_detail_data_nm = sgis_census_detail_data_id.replaceAll("_NO", "");
					}
						
						
					sgis_census_code_name = "경계";
					if(r_sgis_census_id.equals("1") || r_sgis_census_id.equals("7") || r_sgis_census_id.equals("4")){
							sgis_census_code_name ="통계";
					}
					 
    	%>
					<tr>
				        <td class="cell_center" style="display: none;"><input type="checkbox" name="sgis_census_chk" <%if(r_sgis_census_req_y_use_che.equals("Y")){ %>checked<%} %>></td>
				        <td class="cell_center"><%=sgis_census_code_name %></td>
				        <td class="cell_center"><%=sgis_census_name %></td>
				        <td class="cell_center"><%=sgis_census_detail_data_nm %></td>
				        <td class="cell_center"><%=r_sgis_census_req_year %></td>
				        
				        <td class="cell_center"><%=sgis_census_sido_nm %></td>
				        <td class="cell_center"><%=sgis_census_sigungu_nm %></td>
				        
				        <td class="cell_center"><input type="text" id="sgis_census_req_y_s_d" name="sgis_census_req_y_s_d" value="<%=r_sgis_census_req_y_s_d %>" style="width:80px; text-align:center; cursor:pointer"  onClick="calendar_check(document.censusFm.sgis_census_req_y_s_d[<%=rowcnt %>],this,event); editChanged('<%=rowcnt %>');" onkeydown="calendar_check(document.censusFm.sgis_census_req_y_s_d[<%=rowcnt %>],this,event );" onfocus="this.blur()"  readOnly></td>
				        <td class="cell_center"><input type="text" id="sgis_census_req_y_e_d" name="sgis_census_req_y_e_d" value="<%=r_sgis_census_req_y_e_d %>" style="width:80px; text-align:center; cursor:pointer"  onClick="calendar_check(document.censusFm.sgis_census_req_y_e_d[<%=rowcnt %>],this,event); editChanged('<%=rowcnt %>');" onkeydown="calendar_check(document.censusFm.sgis_census_req_y_e_d[<%=rowcnt %>],this,event );" onfocus="this.blur()"  readOnly></td>
				        
				        <input type="hidden" name="inUse" 					value="<%=r_sgis_census_req_y_use_che %>" >
				        <input type="hidden" name="sgis_census_req_year" 	value="<%=r_sgis_census_req_year %>">
				        <input type="hidden" name="sgis_census_id" 			value="<%=r_sgis_census_id %>">
				        <input type="hidden" name="sgis_census_data_id" 	value="<%=r_sgis_census_data_id %>">
				        
				        <input type="hidden" name="sgis_census_sido_id" 	value="<%=sgis_census_sido_id %>">
				        <input type="hidden" name="sgis_census_sigungu_id" 	value="<%=sgis_census_sigungu_id %>">
				        <input type="hidden" name="sgis_census_detail_data_id" 	value="<%=sgis_census_detail_data_id %>">
				    </tr>
	    
	        <%
	        		rowcnt++;
	        	} //end of while
	        %>
	        
	        
	        <input type="hidden" name="sgis_census_chk">
		    <input type="hidden" name="inUse">
		    <input type="hidden" name="sgis_census_req_year"> 
		    
		    
			<tr>
				<td colspan="10" height="10px;" style="border-bottom:0px;"></td>
			</tr>
			
			<tr>
				<td colspan="10"  style="border-bottom:0px; padding:0; line-height:20px;">
				<% 
					//신청일 경우
					if(sgis_census_req_status.equals("S")) { //신청일 경우
				%>
						<span style="font-weight:bold; color:blue; float:left; margin-bottom:10px;">승인/반려내용 </span><br/>
						<textarea type="text" name="refuse" style="width:735px; height: 150px; " onkeyup="len_chk(1000)"></textarea><br/><br/>
						<a href="javascript:confirmClicked();"><img src="/s-portalcnm/contents/images/button_approval.gif" border=0 align="absmiddle"></a>
						<a href="javascript:refuseClicked();"><img src="/s-portalcnm/contents/images/button_return.gif" border=0 align="absmiddle"></a>
				<%
					} else if(sgis_census_req_status.equals("B")){ 	//반려한경우
				%>
						<span style="font-weight:bold; color:blue; float:left; margin-bottom:10px;">승인/반려내용 </span><br/>
						<textarea type="text" name="refuse" style="width:735px; height: 150px; " onkeyup="len_chk(1000)"><%=sgis_census_req_reject %></textarea><br/><br/>
						<a href="javascript:confirmClicked();"><img src="/s-portalcnm/contents/images/button_approval.gif" border=0 align="absmiddle"></a>
				<% 
					}  
				%>
				<a href="javascript:editClicked();"><img src="images/button_modify.gif" style="margin-top:-5px;" border=0 align="middle"></a>
				<a href="javascript:censusList();"><img src="images/button_list.gif" style="margin-top:-5px;" border=0 align="middle"></a>
				
				</td>
			</tr>
			
			
	    
	</table>

	<table>
		<tr>
			<td height="10px;"></td>
		</tr>
	</table>


</form>

		</div>
				
	</div>

<SCRIPT language=javascript src="/s-portalcnm/contents/scripts/calendar_layer.js"></SCRIPT>
<!-- dim처리 문구 출력 -->
			<div class="wrap-loading" style="display:none">
	   			<div style="background-color: rgb(255, 255, 255); border: 3px solid rgb(0, 0, 0); position: absolute; height: 10px; line-height: 50px; padding-bottom: 40px; width: 400px; top: 50%; left: 50%; z-index: 11000; cursor: wait; margin: -5px 0px 0px -200px; text-align: center;">승인 등록중입니다...</div>
			</div>



	<!-- cls:footer start -->
	<div class="footerWrapper" id="gsksFooterWrapper"></div>
</body>
</html>