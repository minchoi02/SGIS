<%@page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%
	String sgis_census_data_name = request.getParameter("sgis_census_data_name");
	String sgis_census_year = request.getParameter("sgis_census_year");

	GeneralBroker broker = null;
	RecordModel rm = null;
	String sgis_census_data_id1 = lData.getString("sgis_census_data_id");

	try {
		broker = new GeneralBroker("ceaa00");
		lData.setString("PARAM", "DATA_CODE");
		rm = broker.getList(lData);
		
		while(rm != null && rm.next()) {
			String sgis_census_data_id = String.valueOf((BigDecimal)rm.get("sgis_census_data_id"));
			String sgis_census_name = StringUtil.verify((String)rm.get("sgis_census_name"));
%>
			<span class="radio-area">
				<input type="radio" class="radio" name="sgis_census_data_id" id="sgis_census_data_id<%=sgis_census_data_id %>" value="<%=sgis_census_data_id %>" onclick="yearView2('sgis_census_id','sgis_census_data_id','sgis_census_year1','inUse1','years1');"/>
				<label for="sgis_census_data_id<%=sgis_census_data_id %>" id="sgis_census_data_id<%=sgis_census_data_id %>"><%=sgis_census_name %></label>
			</span>
<%
		}

	} catch(Exception e) {
		System.out.print("sgisWebError : ");
	}
%>

<script type="text/javascript">
function yearView2(val1,val2,val3,val4,val5) {
	jQuery.ajax({
		type:"POST",
		url: "gsks_01_08_year.jsp",
		data:{"sgis_census_id": $('input:radio[name='+val1+']:checked').val(), "sgis_census_data_id": $('input:radio[name='+val2+']:checked').val(),
			  "sgis_census_req_id": document.censusFm.sgis_census_req_id.value, "sgis_census_year":val3, 
			  "census_output_area_year":document.getElementById("census_output_area_year").value,
			  "inUse": val4, "years": val5},
		success:function(data){
			$('#option_year').html(data);
		},
		error:function(data) {}
	});
	$('#option_year').attr("class", "select-wrap");
	
	$("#option_detail_data").empty();
	$("#option_sido").empty();
	$("#option_sigungu").empty();
	$('#option_sido').attr("class", "");
	$('#option_sigungu').attr("class", "");
}
</script>