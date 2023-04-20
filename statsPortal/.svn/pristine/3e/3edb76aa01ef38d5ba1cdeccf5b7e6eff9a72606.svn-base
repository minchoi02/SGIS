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
	//2021년 SGIS4_자료제공 시작
	String sgis_census_id = lData.getString("sgis_census_id");
	String sgis_census_data_id = lData.getString("sgis_census_data_id");	

	
	if(sgis_census_id.equals("5")){
%>
		<select name="sgis_census_year_id" id="sgis_census_year1" style="width:200px;" title="년도" onChange="getGrid('sgis_census_id','sgis_census_data_id', this.value,'inUse1','years1');"  >
		<option value="">=선택=</option>
<%
	}else if (sgis_census_id.equals("1") || sgis_census_id.equals("2") || sgis_census_id.equals("4")){
%>
		
		<select name="sgis_census_year_id" id="sgis_census_year1" style="width:200px;" title="년도"  onChange="detail_data_id('sgis_census_id','sgis_census_data_id', this.value,'inUse1','years1');" >
		<option value="">=선택=</option>
<%
	}
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
	} catch(IllegalArgumentException e) {
		System.out.print("sgisWebError : ");
		logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
	}
%>
	</select>
<%
	//2021년 SGIS4_자료제공 끝
%>
<script type="text/javascript" language="javascript">
//2021년 SGIS4_자료제공  시작 
//그리드 라디오박스
	if($('input:radio[name="sgis_census_id"]:checked').val() == "5") {
		function getGrid(val1,val2,val3,val4,val5) {
			var sgis_census_id = $('input:radio[name='+val1+']:checked').val();
			var sgis_census_data_id = $('input:radio[name='+val2+']:checked').val();
				jQuery.ajax({
					type:"POST",
					url: "shortcut_05_03_grid.jsp",
					data:{"sgis_census_id": sgis_census_id, "sgis_census_data_id": sgis_census_data_id,
						  "sgis_census_req_id": document.censusFm.sgis_census_req_id.value, "sgis_census_year":val3,
						  "census_output_area_year":document.getElementById("census_output_area_year").value,
						  "inUse": val4, "years": val5 },
					success:function(data){
						/* $('#option_detail_data').html(data); */
						$('#sgis_census_devided_grid_li').html(data);
						$('#sgis_census_devided_grid_ul').show();
					},
					error:function(data) {
						alert(data);
					}
				});
				$("#option_sido").empty();
				$("#option_sigungu").empty();
				$('#option_sido').attr("class", "");
				$('#option_sigungu').attr("class", "");
		}
	}else{
		function detail_data_id(val1,val2,val3,val4,val5) {
			var sgis_census_id = $('input:radio[name='+val1+']:checked').val();
			var sgis_census_data_id = $('input:radio[name='+val2+']:checked').val();
			if(sgis_census_id == "1" || sgis_census_id == "4") { //2021년 SGIS4_자료제공 
				jQuery.ajax({
					type:"POST",
					url: "shortcut_05_03_detail_data_id.jsp",
					data:{"sgis_census_id": sgis_census_id, "sgis_census_data_id": sgis_census_data_id,
						  "sgis_census_req_id": document.censusFm.sgis_census_req_id.value, "sgis_census_year":val3,
						  "census_output_area_year":document.getElementById("census_output_area_year").value,
						  "inUse": val4, "years": val5 },
					success:function(data){
						$('#option_detail_data').html(data);
						if($("#option_detail_data_sido_td").empty()){
							$('#option_detail_data_sido_th').show();
							if(sgis_census_id == 1 || sgis_census_id == 2 || sgis_census_id == 4){
								$('#option_detail_data_sido_td').remove();								
								var html = ' <td id ="option_detail_data_sido_td">';
									html += '<div class="" id="option_sido"></div><div class="" id="option_sigungu"></div>';
									html += '</td>';									
									$("#option_detail_data_sido_tr").append(html);			
									$('#option_detail_task_tr li .check-area label').css({'width': '130px'});
							}
						}
					},
					error:function(data) {}
				});
				
			//과거 집계구 통계지역 오류 수정 2022-09-21 김흥교
			}else if(sgis_census_id == "2"){
				
				jQuery.ajax({
					type:"POST",
					url: "shortcut_05_03_sido.jsp",
					data:{"sgis_census_id": sgis_census_id, "sgis_census_data_id": sgis_census_data_id,
						  "sgis_census_req_id": document.censusFm.sgis_census_req_id.value, "sgis_census_year": document.getElementById("sgis_census_year1").value,
						  "census_output_area_year":document.getElementById("census_output_area_year").value,
						  "inUse": val4, "years": val5},
					success:function(data){
						//2021년 SGIS4_자료제공 시작 
						$('#option_detail_data_sido_tr').show();
						//2021년 SGIS4_자료제공 끝
						$('#option_sido').html(data);//alert(data);
						$('#option_sido').attr("class", "select-wrap");
						$('#option_sigungu').attr("class", "");
					},
					error:function(data) {}
				});
				
			} 
			
			$("#option_sido").empty();
			$("#option_sigungu").empty();
			$('#option_sido').attr("class", "");
			$('#option_sigungu').attr("class", "");
		}
}
//2021년 SGIS4_자료제공  끝
</script>
