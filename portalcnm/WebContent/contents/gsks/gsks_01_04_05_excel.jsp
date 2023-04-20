<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>

<%
	String what_year = lData.getString("what_year");
	what_year = what_year + "%";

	GeneralBroker broker = null;
	RecordModel rm = null;	
	
%>

<br />
<a href="#"><img src="images/admin_button_download_excel.gif" onClick="jo_excel_down();" alt="엑셀다운로드"  title="엑셀다운로드"  height="20px" align="middle" border="0" /></a>
<br />

<div style="clear:both; position:relative; overflow:auto; width:730px; height:350px; padding:7px; ">
<table class="apiTable013" style="width:1600px; border:0px; cellpadding:0px; cellspacing:0px;" >
	<colgroup>
		<col width="50"/>
		<col width="90"/>
		<col width="120"/>
		<col width="120"/>
		<col width="30"/>
		<col width="50"/>
		<col width="80"/>
		<col width="60"/> 	 	
		<col width="60"/>
		<col width="60"/>
		<col width="60"/>
		<col width="30"/>
		<col width="30"/>
		<col width="30"/>
		<col width="500"/>
		<col width="80"/>
		<col width="80"/>
		<col width="80"/> 	
		<col width="50"/>
		<col width="50"/> 	
	</colgroup>
	<thead>
      <tr>
        <th>일련번호</th>
        <th>신청일자</th>
        <th>제공기관</th>
        <th>제공자료</th>
        <th>건수</th>
        <th>통계자료</th>
        <th>통계지역경계</th>
        <th>세종시특별센서스</th>
        <th>격자통계자료</th>
        <th>격자경계</th>
        <th>요청목적</th>
        <th>DB</th>
        <th>연구</th>
        <th>작성</th>
        <th>활용목적</th>
        <th>중앙행정기관</th>
        <th>지방자치단체</th>
        <th>공사/공단</th>
        <th>대학</th>
        <th>민간</th>
      </tr>
    </thead>

    <tbody>
<%
	try {
		int cnt=0;
		broker = new GeneralBroker("ceaa00");
		lData.setString("PARAM", "CENSUS_REQ_EXCEL2");
		lData.setString("what_year", what_year);
		rm = broker.getList(lData);
		
		String dt = 	"";
		String nm = 	"";
		String gbn = 	"";
		String su_t = 	"";
		String s1 = 	"";
		String s2 = 	"";
		String s3 = 	"";
		String s4 = 	"";
		String s5 = 	"";
		String mok = 	"";
		String b1 = 	"";
		String b2 = 	"";
		String b3 = 	"";
		String goal = 	"";
		String sosok =  "";
		String sosok_001001 = "";
		String sosok_001002 = "";
		String sosok_001003 = "";
		String sosok_001004 = "";
		String sosok_001005 = "";

		//out.println("===========1111111111==============");
		//out.println(rm.next());
		while(rm != null && rm.next()) {
			
			//out.println("===========222222222222222222==============");
			
			dt = 	StringUtil.verify((String)rm.get("dt"));
			nm = 	StringUtil.verify((String)rm.get("nm"));
			gbn = 	StringUtil.verify((String)rm.get("gbn"));			
			su_t = 	StringUtil.verify((String)rm.get("su_t"));
			s1 = 	StringUtil.verify((String)rm.get("s1"));
			s2 = 	StringUtil.verify((String)rm.get("s2"));
			s3 = 	StringUtil.verify((String)rm.get("s3"));
			s4 = 	StringUtil.verify((String)rm.get("s4"));
			s5 = 	StringUtil.verify((String)rm.get("s5"));
			
			mok = 	StringUtil.verify((String)rm.get("mok"));
			if ("002001".equals(mok)) mok = "DB";
			if ("002002".equals(mok)) mok = "연구";
			if ("002003".equals(mok)) mok = "작성";
			
			b1 = 	StringUtil.verify((String)rm.get("b1"));
			b2 = 	StringUtil.verify((String)rm.get("b2"));
			b3 = 	StringUtil.verify((String)rm.get("b3"));
			goal = 	StringUtil.verify((String)rm.get("goal"));
			
			sosok_001001 = "";
			sosok_001002 = "";
			sosok_001003 = "";
			sosok_001004 = "";
			sosok_001005 = "";
			
			sosok = StringUtil.verify((String)rm.get("sosok"));
			if ("001001".equals(sosok)) sosok_001001 = "1";
			if ("001002".equals(sosok)) sosok_001002 = "1";
			if ("001003".equals(sosok)) sosok_001003 = "1";
			if ("001004".equals(sosok)) sosok_001004 = "1";
			if ("001005".equals(sosok)) sosok_001005 = "1";
			
			
%>
   			
   			<tr>
   			<td class="cell_center w40"  ><%= cnt+1 %></td>
			<td class="cell_center w100"  ><%= dt %></td>
			<td class="cell_center w100"  ><%= nm %></td>
			<td class="cell_center w150" ><%= gbn %></td>
			<td class="cell_center w80"  ><%= su_t %></td>
			<td class="cell_center w80"  ><%= s1 %></td>
			<td class="cell_center w80"  ><%= s2 %></td>
			<td class="cell_center w80"  ><%= s3 %></td>
			<td class="cell_center w80"  ><%= s4 %></td>
			<td class="cell_center w80"  ><%= s5 %></td>
			<td class="cell_center w80"  ><%= mok %></td>
			<td class="cell_center w80"  ><%= b1 %></td>
			<td class="cell_center w80"  ><%= b2 %></td>
			<td class="cell_center w80"  ><%= b3 %></td>
			<td class="cell_center w150" ><%= goal %></td>
			<td class="cell_center w80"  ><%= sosok_001001 %></td>
			<td class="cell_center w80"  ><%= sosok_001002 %></td>
			<td class="cell_center w80"  ><%= sosok_001003 %></td>
			<td class="cell_center w80"  ><%= sosok_001004 %></td>
			<td class="cell_center w80"  ><%= sosok_001005 %></td>
	        
	      </tr>
   			
<%


			cnt++;

		} //end of while
		
		if(cnt == 0) {
			
			//out.println("===========3333333333333333==============");
%>
			
<%			
		}
	} catch(Exception e) {
		System.out.print("sgisWebError : ");
		e.printStackTrace();
	}
%>
	</tbody>
</table>

</div>

<script language="javascript">
function jo_excel_down() {
	
	srvLogWrite("L0", "03", "07", "11", "<%=what_year%>", "");
	
	document.censusFm.excel_down.value = "<%=what_year%>";
	//alert(document.censusFm.excel_down.value);
	document.censusFm.action = "gsks_01_04_05_excel_down.jsp";
	document.censusFm.submit();
	return false;
	
	/*
	jQuery.ajax({
		type:"POST",
		url:"gsks_01_04_05_excel_down.jsp",
		data:{"what_year": "<%=what_year%>" },
		success:function(data){
			//alert("조회가 완료되었습니다.");
			jQuery('#result_down').html(data);
		},
		error:function(data) {
			
		}
	});
	*/
	
}

</script>

<span id='result_dwon'></span>

