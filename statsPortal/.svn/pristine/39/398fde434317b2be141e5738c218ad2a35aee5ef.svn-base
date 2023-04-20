<%@ page language="java" contentType="text/html;charset=utf-8"%>
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

String sgis_census_id = lData.getString("sgis_census_id");
String sgis_census_data_id = lData.getString("sgis_census_data_id");	
%>
	<%
		try {
			broker = new GeneralBroker("ceaa00");
			lData.setString("PARAM", "GRID");
			lData.setString("sgis_census_req_id", sgis_census_req_id);
			rm = broker.getList(lData);
			
			while(rm != null && rm.next()) {
				String sgis_grid_data_id = String.valueOf((String)rm.get("sgis_census_detail_data_id"));
				String sgis_grid_data_name = String.valueOf((String)rm.get("sgis_census_detail_data_nm"));
				

	%>
				<span class="check-area">
					<input type="radio" class="check radio" name="sgis_grid_data_id" id="sgis_grid_data_id<%=sgis_grid_data_id %>" value="<%=sgis_grid_data_id%>" onclick="detailDataCheck('sgis_census_id','sgis_census_data_id', this.value,'inUse1','years1');" /> 
					<label for="sgis_grid_data_id<%=sgis_grid_data_id%>" id = "sgis_grid_data_id<%=sgis_grid_data_id%>"><%=sgis_grid_data_name %></label>
				</span>				
	<%
			}

		} catch(IllegalArgumentException e) {
			System.out.print("sgisWebError : ");
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		}
	%>



<script type="text/javascript" language="javascript">
function detailDataCheck(val1,val2,val3,val4,val5) {
	var radioVal = $('input[name=sgis_grid_data_id]:checked').val();
	var sgis_census_id = $('input:radio[name='+val1+']:checked').val();
	var sgis_census_data_id = $('input:radio[name='+val2+']:checked').val();
	var yearVal = $('#sgis_census_year1 option:selected').val();
	
	if(sgis_census_id == "1" || sgis_census_id == "4"|| sgis_census_id == "5") { 
		jQuery.ajax({
			type:"POST",
			url: "shortcut_05_03_detail_data_id.jsp",
			data:{"sgis_census_id": sgis_census_id, "sgis_census_data_id": sgis_census_data_id,
				  "sgis_census_req_id": document.censusFm.sgis_census_req_id.value, "sgis_census_year":yearVal,
				  "census_output_area_year":document.getElementById("census_output_area_year").value,
				  "inUse": val4, "years": val5 },
			success:function(data){						
				$('#option_detail_data').html(data);	
				$('#option_detail_task_tr li .check-area label').css({'width': '130px'});
				if(sgis_census_data_id == '1'){
					if(radioVal == "gd_001"){
						$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_111"], label[for="sgis_census_detail_data_idgd_112"], label[for="sgis_census_detail_data_idgd_113"]').closest('span').remove();	
					}else if(radioVal == "gd_002"){
						$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_211"], label[for="sgis_census_detail_data_idgd_212"], label[for="sgis_census_detail_data_idgd_213"]').closest('span').remove();				
					}else if(radioVal == "gd_003"){		
						$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_311"], label[for="sgis_census_detail_data_idgd_312"], label[for="sgis_census_detail_data_idgd_313"], label[for="sgis_census_detail_data_idgd_314"], label[for="sgis_census_detail_data_idgd_315"], label[for="sgis_census_detail_data_idgd_316"]').closest('span').remove();		
					}else if(radioVal == "gd_004"){
						$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_411"], label[for="sgis_census_detail_data_idgd_412"], label[for="sgis_census_detail_data_idgd_413"], label[for="sgis_census_detail_data_idgd_414"], label[for="sgis_census_detail_data_idgd_415"], label[for="sgis_census_detail_data_idgd_416"]').closest('span').remove();		
					}else if(radioVal == "gd_005"){
						$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_511"], label[for="sgis_census_detail_data_idgd_512"], label[for="sgis_census_detail_data_idgd_513"], label[for="sgis_census_detail_data_idgd_514"], label[for="sgis_census_detail_data_idgd_515"], label[for="sgis_census_detail_data_idgd_516"]').closest('span').remove();		
					}
				}else if(sgis_census_data_id == '2'){
					if(radioVal == "gd_001"){
						$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_121"]').closest('span').remove();			
					}else if(radioVal == "gd_002"){
						$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_221"]').closest('span').remove();				
					}else if(radioVal == "gd_003"){		
						$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_321"], label[for="sgis_census_detail_data_idgd_322"]').closest('span').remove();		
					}else if(radioVal == "gd_004"){
						$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_421"], label[for="sgis_census_detail_data_idgd_422"]').closest('span').remove();		
					}else if(radioVal == "gd_005"){
						$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_521"], label[for="sgis_census_detail_data_idgd_522"]').closest('span').remove();		
					}
				}
				else if(sgis_census_data_id == '3'){
					if(radioVal == "gd_001"){
						$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_131"]').closest('span').remove();			
					}else if(radioVal == "gd_002"){
						$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_231"]').closest('span').remove();				
					}else if(radioVal == "gd_003"){		
						$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_331"], label[for="sgis_census_detail_data_idgd_332"]').closest('span').remove();		
					}else if(radioVal == "gd_004"){
						$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_431"], label[for="sgis_census_detail_data_idgd_432"]').closest('span').remove();		
					}else if(radioVal == "gd_005"){
						$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_531"], label[for="sgis_census_detail_data_idgd_532"]').closest('span').remove();		
					}
				}else if(sgis_census_data_id == '4'){
					//8차 분류
					if(parseInt(yearVal) > 1999 && parseInt(yearVal) < 2006){
						//8차 분류
					 	if(radioVal == "gd_001"){
							$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_141"], label[for="sgis_census_detail_data_idgd_151"]').closest('span').remove();		
						}else if(radioVal == "gd_002"){						
							$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_241"], label[for="sgis_census_detail_data_idgd_251"]').closest('span').remove();		
						}else if(radioVal == "gd_003"){
							$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_341"], label[for="sgis_census_detail_data_idgd_351"], label[for="sgis_census_detail_data_idgd_345"], label[for="sgis_census_detail_data_idgd_355"]').closest('span').remove();		
						}else if(radioVal == "gd_004"){
							$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_441"], label[for="sgis_census_detail_data_idgd_451"], label[for="sgis_census_detail_data_idgd_445"], label[for="sgis_census_detail_data_idgd_455"]').closest('span').remove();		
						}else if(radioVal == "gd_005"){
							$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_541"], label[for="sgis_census_detail_data_idgd_551"], label[for="sgis_census_detail_data_idgd_545"], label[for="sgis_census_detail_data_idgd_555"]').closest('span').remove();		
						}	
					}else if(parseInt(yearVal) > 2005 && parseInt(yearVal) < 2016){
						//9차 분류
						if(radioVal == "gd_001"){
							$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_142"], label[for="sgis_census_detail_data_idgd_152"]').closest('span').remove();		
						}else if(radioVal == "gd_002"){						
							$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_242"], label[for="sgis_census_detail_data_idgd_252"]').closest('span').remove();		
						}else if(radioVal == "gd_003"){
							$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_342"], label[for="sgis_census_detail_data_idgd_352"], label[for="sgis_census_detail_data_idgd_346"], label[for="sgis_census_detail_data_idgd_356"]').closest('span').remove();		
						}else if(radioVal == "gd_004"){
							$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_442"], label[for="sgis_census_detail_data_idgd_452"], label[for="sgis_census_detail_data_idgd_446"], label[for="sgis_census_detail_data_idgd_456"]').closest('span').remove();		
						}else if(radioVal == "gd_005"){
							$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_542"], label[for="sgis_census_detail_data_idgd_552"], label[for="sgis_census_detail_data_idgd_546"], label[for="sgis_census_detail_data_idgd_556"]').closest('span').remove();		
						}				
					}else if(parseInt(yearVal) == 2016){
						//9차분류, 10차 분류
					 	if(radioVal == "gd_001"){
							$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_142"], label[for="sgis_census_detail_data_idgd_143"], label[for="sgis_census_detail_data_idgd_152"], label[for="sgis_census_detail_data_idgd_153"]').closest('span').remove();
						}else if(radioVal == "gd_002"){						
							$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_242"], label[for="sgis_census_detail_data_idgd_243"], label[for="sgis_census_detail_data_idgd_252"], label[for="sgis_census_detail_data_idgd_253"]').closest('span').remove();
						}else if(radioVal == "gd_003"){
							$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_342"], label[for="sgis_census_detail_data_idgd_343"], label[for="sgis_census_detail_data_idgd_352"], label[for="sgis_census_detail_data_idgd_353"], label[for="sgis_census_detail_data_idgd_346"], label[for="sgis_census_detail_data_idgd_347"], label[for="sgis_census_detail_data_idgd_356"], label[for="sgis_census_detail_data_idgd_357"]').closest('span').remove();
						}else if(radioVal == "gd_004"){
							$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_442"], label[for="sgis_census_detail_data_idgd_443"], label[for="sgis_census_detail_data_idgd_452"], label[for="sgis_census_detail_data_idgd_453"], label[for="sgis_census_detail_data_idgd_446"], label[for="sgis_census_detail_data_idgd_447"], label[for="sgis_census_detail_data_idgd_456"], label[for="sgis_census_detail_data_idgd_457"]').closest('span').remove();
						}else if(radioVal == "gd_005"){
							$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_542"], label[for="sgis_census_detail_data_idgd_543"], label[for="sgis_census_detail_data_idgd_552"], label[for="sgis_census_detail_data_idgd_553"], label[for="sgis_census_detail_data_idgd_546"], label[for="sgis_census_detail_data_idgd_547"], label[for="sgis_census_detail_data_idgd_556"], label[for="sgis_census_detail_data_idgd_557"]').closest('span').remove();
						} 
					}else if(parseInt(yearVal) > 2016 && parseInt(yearVal) < 2021){
					 	//10차 분류
						if(radioVal == "gd_001"){
							$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_144"], label[for="sgis_census_detail_data_idgd_154"]').closest('span').remove();		
						}else if(radioVal == "gd_002"){						
							$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_244"], label[for="sgis_census_detail_data_idgd_254"]').closest('span').remove();	
						}else if(radioVal == "gd_003"){
							$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_344"], label[for="sgis_census_detail_data_idgd_348"], label[for="sgis_census_detail_data_idgd_354"], label[for="sgis_census_detail_data_idgd_358"]').closest('span').remove();		
						}else if(radioVal == "gd_004"){
							$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_444"], label[for="sgis_census_detail_data_idgd_448"], label[for="sgis_census_detail_data_idgd_454"], label[for="sgis_census_detail_data_idgd_458"]').closest('span').remove();		
						}else if(radioVal == "gd_005"){
							$('.sgis_census_detail_ul li:eq(1) label').not('label[for="sgis_census_detail_data_idgd_544"], label[for="sgis_census_detail_data_idgd_548"], label[for="sgis_census_detail_data_idgd_554"], label[for="sgis_census_detail_data_idgd_558"]').closest('span').remove();		
						}			 
					}			
				} 	
			},
			error:function(data) {}
		});
	}  	
}
</script>
	
