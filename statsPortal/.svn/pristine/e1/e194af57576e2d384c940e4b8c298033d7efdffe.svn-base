<%@page language="java" contentType="text/html;charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>



<c:if test="${viewType eq 'radio'}">
	<c:forEach var="radioData" items="${listData}"  varStatus="status">
		<span class="radio-area">
				<input type="radio" class="radio" name="${fromName}" id="${fromName}${radioData.sgis_census_data_id}" value="${radioData.sgis_census_data_id}" onclick="${functionName}('sgis_census_id','sgis_census_data_id','sgis_census_year1','inUse1','years1');"/>
				<label for="${fromName}${radioData.sgis_census_data_id}">${radioData.sgis_census_name}</label>
		</span>
	</c:forEach>
</c:if>
 
<c:if test="${viewType eq 'select'}">
	<c:if test="${sgis_census_id eq '5'}">
		<select name="sgis_census_year_id" id="sgis_census_year1" style="width:200px;" title="년도" onChange="getGrid('${sgis_census_id}','${sgis_census_data_id}', this.value,'inUse1','years1');"  >
		<option value="">=선택=</option>
	</c:if>
	
	<c:if test="${sgis_census_id eq '1' || sgis_census_id eq '2'  || sgis_census_id eq '4' }">
		<select name="sgis_census_year_id" id="sgis_census_year1" style="width:200px;" title="년도"  onChange="detail_data_id('${sgis_census_id}','${sgis_census_data_id}', this.value,'inUse1','years1');" >
		<option value="">=선택=</option>
	</c:if>
	<c:forEach var="selectData" items="${listData}"  varStatus="status">
		<option value="${selectData.sgis_census_year}">${selectData.sgis_census_year}</option>
	</c:forEach>
		</select> 
</c:if>

<c:if test="${viewType eq 'checkBox'}">

	<c:if test="${!empty listData}">
		<ul class="all-check sgis_census_detail_ul">
			<li > 
				<span class="check-area">
					<input type="checkbox" class="check" name="sgis_census_detail_data_id" id="sgis_census_detail_data_id1" value="all" onclick="detailDataAllCheck(this);"/>
					<label for="sgis_census_detail_data_id1">전체</label>
				</span>
			</li>
		</ul>
		<ul class="chek-right sgis_census_detail_ul">
		<c:forEach var="checkData" items="${listData}"  varStatus="status">
			 <c:if test="status.index % 3 == 0"> <li> </c:if>
				 <span class="check-area">
				 	<input type="checkbox" class="check" name="sgis_census_detail_data_id" id="sgis_census_detail_data_id${checkData.sgis_census_detail_data_id}" value="${checkData.sgis_census_detail_data_id}" onclick="sido('${sgis_census_id}', '${sgis_census_data_id}', '${sgis_census_year}', 'inUse1', 'years1');"/>
					<label for="sgis_census_detail_data_id${checkData.sgis_census_detail_data_id}" id="sgis_census_detail_data_id${checkData.sgis_census_detail_data_id}">${checkData.sgis_census_detail_data_nm}</label>
				 </span>
			 <c:if test="status.index % 3 == 2"> </li> </c:if>
		</c:forEach>
		</ul>
	</c:if>
	<c:if test="${empty listData}">
		<script type="text/javascript">
			sido('${sgis_census_id}', '${sgis_census_data_id}', '${sgis_census_year}', 'inUse1', 'years1');
		</script>
	</c:if>

</c:if>
<c:if test="${viewType eq 'sidoSelect'}">
	<select name="sgis_census_sido_id" id="sgis_census_sido1" style="width:200px;" title="시도"  onchange="sigungu('${sgis_census_id}', '${sgis_census_data_id}', this.value,'inUse1','years1'); " >
		<option value="" >=선택=</option>
		<c:forEach var="sidoData" items="${listData}"  varStatus="status">
			<option value="${sgis_census_year}${sidoData.sgis_census_sido}">${sidoData.sido_nm}</option>
		</c:forEach>
	</select>
</c:if>

<c:if test="${viewType eq 'sidoSelect2'}">
	<select name="sgis_census_sido_id" id="sgis_census_sido1" style="width:200px;" title="시도"  onchange="sigungu('${sgis_census_id}', '${sgis_census_data_id}', this.value,'inUse1','years1'); " >
		<option value="" >=선택=</option>
		<c:forEach var="sidoData" items="${listData}"  varStatus="status">
			<option value="${sgis_census_year}${sidoData.sgis_census_code_id}">${sidoData.sgis_census_code_nm}</option>
		</c:forEach>
	</select>
</c:if>

<c:if test="${viewType eq 'selectCode'}">

	<%-- <c:if test="${sgis_census_id eq '7'}">
		<select name="sgis_census_year_id" id="sgis_census_year1" style="width:200px;" title="년도"  onChange="detail_data_id('${sgis_census_id}','${sgis_census_data_id}', this.value,'inUse1','years1');" >
		<option value="">=선택=</option>
	</c:if> --%>
	<c:if test="${sgis_census_id eq '7' || sgis_census_id eq '8'}">
		<select name="sgis_census_year_id" id="sgis_census_year1" style="width:200px;" title="년도" >
		<option value="">=선택=</option>
	</c:if>
	
	<c:if test="${sgis_census_id eq '2'}">
		<select name="sgis_census_year_id" id="sgis_census_year1" style="width:200px;" title="년도" onChange="detail_data_id('${sgis_census_id}','${sgis_census_data_id}', this.value,'inUse1','years1');">
		<option value="">=선택=</option>
	</c:if>

		<c:forEach var="selectData" items="${listData}"  varStatus="status">
			<option value="${selectData.sgis_census_code_id}">${selectData.sgis_census_code_nm}</option>
		</c:forEach>
	</select> 
</c:if>



<c:if test="${viewType eq 'sigunguSelect'}">
	<select name="sgis_census_sigungu_id" id="sgis_census_sigungu1" style="width: 200px;" title="시군구"  >
		<option value="" >=선택=</option>
		<c:forEach var="sigunguData" items="${listData}"  varStatus="status">
			<option value="${sigunguData.sgis_census_sigungu}">${sigunguData.sigungu_nm}</option>
		</c:forEach>
	</select>
</c:if>

<script type="text/javascript">

<c:if test="${viewType eq 'radio'}">
		function radioCleck(val1,val2,val3,val4,val5) {
			var sgis_census_id = $('input:radio[name='+val1+']:checked').val(); //2021년 SGIS4_자료제공
			var mode = 2;
			var type = $("input:radio[name='census_output_data_type']:checked").val(); //2021년 SGIS4_자료제공 
			var sgis_census_data_id =  $('input[name="sgis_census_data_id"]:checked').val();
			var codeData = "";
			
			if(type == 2){
				mode = 7;
				codeData = 8;	
				if(sgis_census_id == 7){
					if(sgis_census_data_id == 0 || sgis_census_data_id == 1  || sgis_census_data_id == 2 ){
						codeData = 8;						
					}else{
						codeData = 3;	
					}
				}
			}
			
			if(type == 2 && sgis_census_id==8 && $('input:radio[name='+val2+']:checked').val() == 0 ){
				$('#sgsi_year_tr').hide();
				$('#map_code_input_list').show();
				$('#sgis_map_div').show();
				$('#sgis_map_select_data_tr').show();
			
			}else if(type == 2 && sgis_census_id==8 && $('input:radio[name='+val2+']:checked').val() == 1 ){
				$('#sgsi_year_tr').show();
				$('#map_code_input_list').hide();
				$('#sgis_map_div').hide();
				$('#sgis_map_select_data_tr').hide();
			}
			
			
			
			if(type == 1 && sgis_census_data_id==7){
				mode = 8;
			}
				
			var census_output_area_year = $('#census_output_area_year').val();
			
			jQuery.ajax({
				type:"POST",
				url: "/view/pss/requestOptionData",
				data:{   "sgis_census_id": $('input:radio[name='+val1+']:checked').val()
					   , "sgis_census_data_id": $('input:radio[name='+val2+']:checked').val()
					   , "sgis_census_req_id": document.censusFm.sgis_census_req_id.value
					   , "sgis_census_year":val3
					   , "census_output_area_year":census_output_area_year
					   , "inUse": val4
					   , "years": val5
					   , "mode" : mode
					   , "codeValue" : codeData
					  },
				success:function(data){
					$('#option_year').html(data);
					$('#sgis_census_devided_grid_ul').hide(); //2021년 SGIS4_자료제공
				},
				error:function(data) {}
			});
			$('#option_year').attr("class", "select-wrap");
			//2021년 SGIS4_자료제공 시작
			$("#option_grid").empty(); 
			$("#option_detail_data").empty();
			$("#option_sido").empty();
			$("#option_sigungu").empty();
			$('#option_sido').attr("class", "");
			$('#option_sigungu').attr("class", "");
			//2021년 SGIS4_자료제공 시작 끝
		}
</c:if>

<c:if test="${viewType eq 'select' ||viewType eq  'selectCode'}">
		function detail_data_id(val1,val2,val3,val4,val5) {
			var sgis_census_id = val1;
			var sgis_census_data_id = val2;
			var modeValue = 4;
			if(sgis_census_id == "2") modeValue = 5;
			
			if(sgis_census_id == "2" && sgis_census_data_id == "7") modeValue = 9;
			
			var census_output_area_year = document.getElementById("census_output_area_year").value;
			
			//2021년 SGIS4_자료제공 
				jQuery.ajax({
					type:"POST",
					url: "/view/pss/requestOptionData",
					data:{  "sgis_census_id": sgis_census_id
						  , "sgis_census_data_id": sgis_census_data_id
						  , "sgis_census_req_id": document.censusFm.sgis_census_req_id.value
						  , "sgis_census_year":val3
						  , "census_output_area_year":census_output_area_year
						  , "inUse": val4
						  , "years": val5 
						  , "mode" : modeValue
						  },
					success:function(data){
						var dataType = $("input[name='census_output_data_type']:checked").val();
						
						if(dataType == 1){
							if(sgis_census_id != 2){
								$('#option_detail_data').html(data);	
							}else{
								$('#option_detail_data_sido_tr').show();
								//2021년 SGIS4_자료제공 끝
								$('#option_sido').html(data);//alert(data);
								$('#option_sido').attr("class", "select-wrap");
								$('#option_sigungu').attr("class", "");
							}
						}else{
							$('.sgis_Levle_ul').show();
						}
						
						
						
					},
					error:function(data) {}
				});
				
				$("#option_sido").empty();
				$("#option_sigungu").empty();
				$('#option_sido').attr("class", "");
				$('#option_sigungu').attr("class", "");
			
		}
	
</c:if>

<c:if test="${viewType eq 'checkBox'}">

function detailDataAllCheck(t) {
	if($(t).is(':checked')) {
		$('input:checkbox[name=sgis_census_detail_data_id]').prop('checked', true);
		sido('${sgis_census_id}', '${sgis_census_data_id}', 'sgis_census_year_id', 'inUse1', 'years1');
	}
	else {
		$('input:checkbox[name=sgis_census_detail_data_id]').prop('checked', false);
		$('#option_sido').empty();
		$('#option_sido').attr("class", "");
		$('#option_sigungu').empty();
		$('#option_sigungu').attr("class", "");
	}
}


function sido(val1,val2,val3,val4,val5) {
	var sgis_census_id = val1;
	var sgis_census_data_id = val2;
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
			url: "/view/pss/requestOptionData",
			data:{   "sgis_census_id": sgis_census_id
				   , "sgis_census_data_id": sgis_census_data_id
				   , "sgis_census_req_id": document.censusFm.sgis_census_req_id.value
				   , "sgis_census_year": document.getElementById("sgis_census_year1").value
				   , "census_output_area_year":'${census_output_area_year}'
				   , "inUse": val4
				   , "years": val5
				   , "mode" : 5
				   },
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
	else {
		$('#option_sido').empty();
		$('#option_sido').attr("class", "");
	}
	$("#option_sigungu").empty();
	$('#option_sigungu').attr("class", "");
}
</c:if>


<c:if test="${viewType eq 'sidoSelect'}">
	function sigungu(val1,val2,val3,val4,val5) {
		
		var sgis_census_id = val1;
		var sgis_census_data_id = val2;
		
		jQuery.ajax({
		type:"POST",
		url: "/view/pss/requestOptionData",
		data:{   "sgis_census_id": sgis_census_id
			   , "sgis_census_data_id": sgis_census_data_id
			   , "sgis_census_req_id": document.censusFm.sgis_census_req_id.value
			   , "year_sido":val3
			   , "census_output_area_year":'${census_output_area_year}'
			   , "inUse": val4
			   , "years": val5
			   , "mode" : 6
			  },
		success:function(data){
			$('#option_sigungu').html(data);//alert(data);
			$('#option_sigungu').attr("class", "select-wrap");
		},
		error:function(data) {}
		});
	}
</c:if>

<c:if test="${viewType eq 'sidoSelect2'}">
function sigungu(val1,val2,val3,val4,val5) {
	
	var data = "<select name=\"sgis_census_sigungu_id\" id=\"sgis_census_sigungu1\" style=\"width: 200px;\" title=\"시군구\">\n"
				+"<option value=\"\">=선택=</option>\n"
				+"<option value=\"00000\">전체</option>\n"
			    +"</select>";
	
	$('#option_sigungu').html(data);//alert(data);
	$('#option_sigungu').attr("class", "select-wrap");
	
	
}
</c:if>

</script>