<%@page language="java" contentType="text/html;charset=utf-8" %>
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

	try {
		int cnt = 0;
		broker = new GeneralBroker("ceaa00");
		lData.setString("PARAM", "CENSUS_DETAIL_DATA_ID");
		lData.setString("sgis_census_req_id", sgis_census_req_id);
		rm = broker.getList(lData);
%>
				<ul class="all-check">
					<li> 
						<span class="check-area-all">
							<input type="checkbox" class="check" name="sgis_census_detail_data_id" id="sgis_census_detail_data_id1" value="all" onclick="detailDataAllCheck(this);"/>
							<label for="sgis_census_detail_data_id1">전체</label>
						</span>
					</li>
				</ul>
				<ul class="chek-right">
<%
		while(rm != null && rm.next()) {
			String sgis_census_detail_data_id = StringUtil.verify((String)rm.get("sgis_census_detail_data_id"));
			String sgis_census_detail_data_nm = StringUtil.verify((String)rm.get("sgis_census_detail_data_nm"));
%>
				<% if(cnt%3 == 0) { %><li><% } %>
					<span class="check-area">
						<input type="checkbox" class="check" name="sgis_census_detail_data_id" id="sgis_census_detail_data_id<%=sgis_census_detail_data_id%>" value="<%=sgis_census_detail_data_id%>" onclick="sido('sgis_census_id', 'sgis_census_data_id', 'sgis_census_year_id', 'inUse1', 'years1');"/>
						<label for="sgis_census_detail_data_id<%=sgis_census_detail_data_id%>" id="sgis_census_detail_data_id<%=sgis_census_detail_data_id%>"><%=sgis_census_detail_data_nm%></label>
					</span>
				<% if(cnt%3 == 2) { %></li><% } %>
<%		
			cnt++;
		}
	} catch(Exception e) {
		System.out.print("sgisWebError : ");
	}
%>
				</ul>

<script type="text/javascript" language="javascript">
function detailDataAllCheck(t) {
	if($(t).is(':checked')) {
		$('input:checkbox[name=sgis_census_detail_data_id]').prop('checked', true);
		sido('sgis_census_id', 'sgis_census_data_id', 'sgis_census_year_id', 'inUse1', 'years1');
	}
	else {
		$('input:checkbox[name=sgis_census_detail_data_id]').prop('checked', false);
		$('#option_sido').empty();
		$('#option_sido').attr("class", "");
		$('#option_sigungu').empty();
		$('#option_sigungu').attr("class", "");
	}
}
//시도 콤보박스
function sido(val1,val2,val3,val4,val5) {
	
	var sgis_census_id = $('input:radio[name='+val1+']:checked').val();
	var sgis_census_data_id = $('input:radio[name='+val2+']:checked').val();
	var isChk = false;
	var cnt = 0;
	$('input:checkbox[name=sgis_census_detail_data_id]').each(function(i, e) {
		if($(e).is(':checked') && e.value != 'all') {
			isChk = true;
			cnt++;
		} else {
			$('input:checkbox[id=sgis_census_detail_data_id1]').prop('checked', false);
		}
	});

	if(cnt == ($('input:checkbox[name=sgis_census_detail_data_id]').length - 1) && !$('input:checkbox[id=sgis_census_detail_data_id1]').is(':checked'))
		$('input:checkbox[id=sgis_census_detail_data_id1]').prop('checked', true);
	
	if(isChk) {
		jQuery.ajax({
			type:"POST",
			url: "gsks_01_08_sido.jsp",
			data:{"sgis_census_id": sgis_census_id, "sgis_census_data_id": sgis_census_data_id,
				  "sgis_census_req_id": document.censusFm.sgis_census_req_id.value, "sgis_census_year": document.getElementById("sgis_census_year1").value,
				  "census_output_area_year":document.getElementById("census_output_area_year").value,
				  "inUse": val4, "years": val5},
			success:function(data){
				$('#option_sido').html(data);//alert(data);
				$('#option_sido').attr("class", "select-wrap");
				$('#option_sigungu').attr("class", "");
			},
			error:function(data) {}
		});
	}
	else {
		$('#option_sido').empty();
		$('#option_sido').attr("class", "");
	}
	$("#option_sigungu").empty();
	$('#option_sigungu').attr("class", "");
}
</script>