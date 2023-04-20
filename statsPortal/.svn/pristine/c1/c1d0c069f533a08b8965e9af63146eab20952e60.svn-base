<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>
<%
	String sgis_census_year_id = request.getParameter("sgis_census_year");
	String inUseId = request.getParameter("inUse");
	String yearsId = request.getParameter("years");

	GeneralBroker broker = null;
	RecordModel rm = null;

	String sgis_census_req_id = lData.getString("sgis_census_req_id");
	if(StringUtil.isEmpty(sgis_census_req_id))  sgis_census_req_id = "-1";
	
	String sgis_census_year = lData.getString("sgis_census_year");
	String sgis_census_id = lData.getString("sgis_census_id");
	String sgis_census_data_id = lData.getString("sgis_census_data_id");
	
%>
	<!-- 2017.10.20 [개발팀] css추가 -->
	<select name="sgis_census_sido_id" id="sgis_census_sido1" style="width:200px;" title="시도"  onchange="sigungu('sgis_census_id','sgis_census_data_id', this.value,'inUse1','years1'); " >
		<option value="" >=선택=</option>
<%
	try {
		int cnt=0;
		broker = new GeneralBroker("ceaa00");
		lData.setString("PARAM", "CENSUS_AVAILABLE_SIDO");
		lData.setString("sgis_census_req_id", sgis_census_req_id);
		lData.setString("base_year", sgis_census_year);
		lData.setString("sgis_census_id", sgis_census_id);
		rm = broker.getList(lData);

		while(rm != null && rm.next()) {
			String sido_cd = StringUtil.verify((String)rm.get("sgis_census_sido"));
			String sido_nm = StringUtil.verify((String)rm.get("sido_nm"));
			//====================================================================
			//아래 옵션 테그의 base_year는 시군구에서 사용하기 위하여 같이 넘기는것임
			//따라서 시도 값을 DB에 넣거나 사용할 때 base_year 값은 잘라내고 사용해야함. 
			//base_year은 삭제하면 않됨.
			//====================================================================
%>
   			<option value="<%=sgis_census_year%><%=sido_cd%>"><%=sido_nm%></option>
<%		
			cnt++;
		}
	} catch(IllegalArgumentException e) {
		System.out.print("sgisWebError : ");
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}
%>
	</select>

<script type="text/javascript" language="javascript">
//시도 콤보박스
function sigungu(val1,val2,val3,val4,val5) {
	
	var sgis_census_id = $('input:radio[name='+val1+']:checked').val();
	var sgis_census_data_id = $('input:radio[name='+val2+']:checked').val();
	
	jQuery.ajax({
	type:"POST",
	url: "shortcut_05_03_sigungu.jsp",
	data:{"sgis_census_id": sgis_census_id, "sgis_census_data_id": sgis_census_data_id,
		  "sgis_census_req_id": document.censusFm.sgis_census_req_id.value, "year_sido":val3,
		  "census_output_area_year":document.getElementById("census_output_area_year").value,
		  "inUse": val4, "years": val5},
	success:function(data){
		$('#option_sigungu').html(data);//alert(data);
		$('#option_sigungu').attr("class", "select-wrap");
	},
	error:function(data) {}
	});
	}
</script>
