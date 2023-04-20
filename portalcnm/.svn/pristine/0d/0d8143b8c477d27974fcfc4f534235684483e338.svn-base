<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%
	String sgis_census_year_id = request.getParameter("sgis_census_year");
	String inUseId = request.getParameter("inUse");
	String yearsId = request.getParameter("years");

	GeneralBroker broker = null;
	RecordModel rm = null;

	String sgis_census_req_id = lData.getString("sgis_census_req_id");
	if(StringUtil.isEmpty(sgis_census_req_id))  sgis_census_req_id = "-1";
%>
	<select name="sgis_census_year_id" id="sgis_census_year1" style="width:200px;" title="년도"  onchange="detail_data_id('sgis_census_id','sgis_census_data_id', this.value,'inUse1','years1');" >
		<option value="">=선택=</option>
<%
	try {
		int cnt=0;
		broker = new GeneralBroker("ceaa00");
		lData.setString("PARAM", "CENSUS_AVAILABLE_YEAR");
		lData.setString("sgis_census_req_id", sgis_census_req_id);
		rm = broker.getList(lData);

		while(rm != null && rm.next()) {
			String sgis_census_year = StringUtil.verify((String)rm.get("sgis_census_year"));
%>
   			<option value="<%=sgis_census_year%>"><%=sgis_census_year%></option>
<%		
			cnt++;
		}
	} catch(Exception e) {
		System.out.print("sgisWebError : ");
	}
%>
	</select>

<script type="text/javascript" language="javascript">
//시도 콤보박스
function detail_data_id(val1,val2,val3,val4,val5) {
	var sgis_census_id = $('input:radio[name='+val1+']:checked').val();
	var sgis_census_data_id = $('input:radio[name='+val2+']:checked').val();
	if(sgis_census_id == "1" || sgis_census_id == "4") {
		jQuery.ajax({
			type:"POST",
			url: "gsks_01_08_detail_data_id.jsp",
			data:{"sgis_census_id": sgis_census_id, "sgis_census_data_id": sgis_census_data_id,
				  "sgis_census_req_id": document.censusFm.sgis_census_req_id.value, "sgis_census_year":val3,
				  "census_output_area_year":document.getElementById("census_output_area_year").value,
				  "inUse": val4, "years": val5},
			success:function(data){
				$('#option_detail_data').html(data);//alert(data);
			},
			error:function(data) {}
		});
		
		$("#option_sido").empty();
		$("#option_sigungu").empty();
		$('#option_sido').attr("class", "");
		$('#option_sigungu').attr("class", "");
	} else {
		jQuery.ajax({
			type:"POST",
			url: "gsks_01_08_sido.jsp",
			data:{"sgis_census_id": sgis_census_id, "sgis_census_data_id": sgis_census_data_id,
				  "sgis_census_req_id": document.censusFm.sgis_census_req_id.value, "sgis_census_year": val3,
				  "census_output_area_year":document.getElementById("census_output_area_year").value,
				  "inUse": val4, "years": val5},
			success:function(data){
				$('#option_sido').html(data);//alert(data);
				$('#option_sido').attr("class", "select-wrap");
			},
			error:function(data) {}
		});
		
		$("#option_sigungu").empty();
		$('#option_sigungu').attr("class", "");
	}
}
</script>
