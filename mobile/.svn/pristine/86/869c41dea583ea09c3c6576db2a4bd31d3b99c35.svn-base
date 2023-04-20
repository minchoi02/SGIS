const openKosis = (tblId) =>{
	window.open("https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId="+tblId+"&conn_path=I2", "_blank");
};

const dashboardToolTip = function(){
	$('.dashboard__info').hide();
	$('.notice').on('click', function(e){
		$('.dashboard__info').show();
	});
	$('.btn-close').on('click', function(e){
		$('.dashboard__info').hide();
	});
};

$(document).ready(function(){
	$("#main-tab li").click(function(){
		const chart = $(this).data("chartFunction");	
		if(chart=="main1"){
			$("#chart1-2").parent().attr("style","height:350px;overflow:auto;");
		}else{
			$("#chart2-2").parent().attr("style","height:260px;overflow:auto;");
			$("#chart3-2").parent().attr("style","height:260px;overflow:auto;");
			$("#chart4-2").parent().attr("style","height:260px;overflow:auto;");
			$("#chart5-2").parent().attr("style","height:260px;overflow:auto;");
			$("#chart6-2").parent().attr("style","height:260px;overflow:auto;");
		}
		$("#chart1-1").attr("style","height:260px;");
		$("#chart2-1").attr("style","height:260px;");
		$("#chart2-1").parent().attr("style","height:260px;");
		$("#chart3-1").attr("style","height:260px;");
		$("#chart4-1").attr("style","height:260px;");
		$("#chart5-1").attr("style","height:260px;");
		$("#chart6-1").attr("style","height:260px;");
		
	});
	
	$(".administration__tab__con [data-chart-function]").click(function(){
		const chart = $(this).data("chartFunction");
		
		if(chart=="main1"){
			$("#chart1-1").attr("style","height:260px;");
			if($(this).children()[0].classList.contains("on")){
				$("#chart1-2").parent().attr("style","height:350px;overflow:auto;");
			}else if($(this).children()[1].classList.contains("on")){
				$("#chart1-2").parent().attr("style","height:290px;overflow:auto;");
			}
			$("#chart1-3").attr("style","height:300px;overflow:auto;");
		}else if(chart=="main2"){
			$("#chart2-1").parent().attr("style","height:260px;");
			if($(this).children()[0].classList.contains("on")){
				$("#chart2-2").parent().attr("style","height:260px;overflow:auto;");
			}else if($(this).children()[1].classList.contains("on")){
				$("#chart2-2").parent().attr("style","height:300px;overflow:auto;");
			}
			$("#chart2-3").attr("style","height:300px;overflow:auto;");
		}else if(chart=="main3"){
			if($(this).children()[0].classList.contains("on")){
				$("#chart3-1").attr("style","height:260px;");
				$("#chart3-2").parent().attr("style","height:260px;overflow:auto;");
			}else if($(this).children()[1].classList.contains("on")){
				$("#chart3-1").attr("style","height:300px;");
				$("#chart3-2").parent().attr("style","height:300px;overflow:auto;");
			}
			$("#chart3-3").attr("style","height:300px;overflow:auto;");
		}else if(chart=="main4"){
			if($(this).children()[0].classList.contains("on")){
				$("#chart4-1").attr("style","height:260px;");
				$("#chart4-2").parent().attr("style","height:260px;overflow:auto;");
			}else if($(this).children()[1].classList.contains("on")){
				$("#chart4-1").attr("style","height:410px;overflow:auto;");
				$("#chart4-2").parent().attr("style","height:300px;overflow:auto;");
			}
			$("#chart4-3").attr("style","height:300px;overflow:auto;");
		}else if(chart=="main5"){
			if($(this).children()[0].classList.contains("on")){
				$("#chart5-1").attr("style","height:260px;");
				$("#chart5-2").parent().attr("style","height:260px;overflow:auto;");
				$("#chart5-3").attr("style","height:300px;overflow:auto;");
			}else if($(this).children()[1].classList.contains("on")){
				$("#chart5-1").attr("style","height:325px;");
				$("#chart5-2").parent().attr("style","height:300px;overflow:auto;");
				$("#chart5-3").attr("style","height:350px;overflow:auto;");
			}
		}else if(chart=="main6"){
			$("#chart6-1").attr("style","height:260px;");
			if($(this).children()[0].classList.contains("on")){
				$("#chart6-2").parent().attr("style","height:260px;overflow:auto;");
			}else if($(this).children()[1].classList.contains("on")){
				$("#chart6-2").parent().attr("style","height:300px;overflow:auto;");
			}
			$("#chart6-3").attr("style","height:300px;overflow:auto;");
		}
		
	});
	
	$("[data-kosis]").click(function(){
		const chart = $(this).data("kosis");	
		const tabIndex = $("#"+chart+"-sub-tab li").index($("#"+chart+"-sub-tab li.on"));		
		if(chart=="main1"){
			if(tabIndex==0){
				openKosis("DT_1MA0001");
			}else if(tabIndex==1){
				openKosis("DT_1MA0001");
			}
		}else if(chart=="main2"){
			if(tabIndex==0){
				openKosis("DT_1MA0002");
			}else if(tabIndex==1){
				openKosis("DT_1MA0003");
			}
		}else if(chart=="main3"){
			if(tabIndex==0){
				openKosis("DT_1MA0026");
			}else if(tabIndex==1){
				openKosis("DT_1MA0026");
			}
		}else if(chart=="main4"){
			if(tabIndex==0){
				openKosis("DT_1MA0028");
			}else if(tabIndex==1){
				openKosis("DT_1MA0028");
			}
		}else if(chart=="main5"){
			if(tabIndex==0){
				openKosis("DT_1MA0037");
			}else if(tabIndex==1){
				openKosis("DT_1MA0038");
			}
		}else if(chart=="main6"){
			if(tabIndex==0){
				openKosis("DT_1MA0024");
			}else if(tabIndex==1){
				openKosis("DT_1MA0024");
			}
		}
		return false;
	});
	
	dashboardToolTip();
});

let chartDatas = null;
function createTotSur(){
	setSummaryData()
}
/**
 * @name        : setSummaryData 
 * @description : 총괄 요약정보 데이터 셋팅 
 */
function setSummaryData(res){

	const _setData = ({key,data}) =>{
		$("[data-id="+key+"-number]").text($.heum.setThousandSeparator(data.current));
		if(data.before){
			const v = data.current-data.before;
			const rtv = (v/data.current*100);
			const rt = rtv.toFixed(1);
			$("[data-id="+key+"-rt]").removeClass("state-up state-down").text(" "+Math.abs(rt)+"%");
			if(rtv>0){
				$("[data-id="+key+"-rt]").addClass("state-up");
			}else if(rtv<0){
				$("[data-id="+key+"-rt]").addClass("state-down");
			}
		}
	};
	
	$administStatsMap.chart.main1.set_total("01");
	$administStatsMap.chart.main1.set_total("02");
	$administStatsMap.chart.main1.set_total("03");
	$administStatsMap.chart.main1.set_total("04");
	$administStatsMap.chart.main1.set_total("05");
	$administStatsMap.chart.main1.set_total("06");
	$administStatsMap.chart.main1.set_total("07");
	$administStatsMap.chart.main1.set_total("08");
	
//	_setData({key:"total",data:total});
//	_setData({key:"DT_1MA0026",data:chartDatas.DT_1MA0026});
//	_setData({key:"DT_1MA0028",data:chartDatas.DT_1MA0028});
//	chartDatas.total = total;
	$administStatsMap.chart[$("ul.administration__tab.col-3 li.on").data("chart-function")].common();
}
$administStatsMap.chart = {
	main1 : {
		tabIndex:null,
		tbl_id:null,
		set_total:function(tp){
			this.tbl_id = "DT_1OH0501";
            var admCd = $administStatsMap.ui.admCd
            admCd = admCd.replace("up:","");
        	var years = ""
				years +=   $administStatsMap.ui.year;
				years +=","+($administStatsMap.ui.year-1);
			if(tp == "01"){ // 인구 수
				this.parameters = {
					surv_year_list : years,
					org_id_list : "101",
					tbl_id_list : "DT_1MA0001",
					list_var_ord_list : "",
					char_itm_id_list : "T001",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : admCd,
					ov_l2_list : "A11",
					ov_l3_list : "0",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
				};
			}else if(tp == "02"){ //평균소득
				this.parameters = {
					surv_year_list : years,
					org_id_list : "101",
					tbl_id_list : "DT_1MA0030",
					list_var_ord_list : "",
					char_itm_id_list : "T001",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : "G10",
					ov_l2_list : "",
					ov_l3_list : "",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
				}
			}else if(tp =="03"){ // 대출 잔액 중앙값
				this.parameters = {
					surv_year_list : years,
					org_id_list : "101",
					tbl_id_list : "DT_1MA0021",
					list_var_ord_list : "",
					char_itm_id_list : "T001",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : "G10",
					ov_l2_list : "",
					ov_l3_list : "",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
				}
			}else if(tp =="04"){ // 등록취업 비중
				this.parameters = {
					surv_year_list : years,
					org_id_list : "101",
					tbl_id_list : "DT_1MA0002",
					list_var_ord_list : "",
					char_itm_id_list : "T001",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : admCd,
					ov_l2_list : "0",
					ov_l3_list : "A10",
					ov_l4_list : "NJ10,NJ11",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
					}
			}else if(tp =="05"){ // 소득보유 비중
				this.parameters = {
						surv_year_list : years,
						org_id_list : "101",
						tbl_id_list : "DT_1MA0026",
						list_var_ord_list : "",
						char_itm_id_list : "T001",
						prt_type : "",
						adm_cd : "",
						ov_l1_list : admCd,
						ov_l2_list : "A10",
						ov_l3_list : "IL00,IL10",
						ov_l4_list : "",
						ov_l5_list : "",
						category : "",
						odr_col_list : "",
						odr_type : ""
					}
			    }else if(tp =="06"){ // 대출보유 비중
					this.parameters = {
						surv_year_list : years,
						org_id_list : "101",
						tbl_id_list : "DT_1MA0028",
						list_var_ord_list : "",
						char_itm_id_list : "T001",
						prt_type : "",
						adm_cd : "",
						ov_l1_list : admCd,
						ov_l2_list : "A10",
						ov_l3_list : "DL00,DL10",
						ov_l4_list : "",
						ov_l5_list : "",
						category : "",
						odr_col_list : "",
						odr_type : ""
					}
			    }else if(tp =="07"){ // 주택소유 비중
					this.parameters = {
						surv_year_list : years,
						org_id_list : "101",
						tbl_id_list : "DT_1MA0037",
						list_var_ord_list : "",
						char_itm_id_list : "T001",
						prt_type : "",
						adm_cd : "",
						ov_l1_list : admCd,
						ov_l2_list : "HT20",
						ov_l3_list : "HO10,HO20",
						ov_l4_list : "",
						ov_l5_list : "",
						category : "",
						odr_col_list : "",
						odr_type : ""
					}
			    }else if(tp =="08"){ // 연금가입 비중
					this.parameters = {
							surv_year_list : years,
							org_id_list : "101",
							tbl_id_list : "DT_1MA0024",
							list_var_ord_list : "",
							char_itm_id_list : "T001",
							prt_type : "",
							adm_cd : "",
							ov_l1_list : admCd,
							ov_l2_list : "G10",
							ov_l3_list : "P10,P20",
							ov_l4_list : "",
							ov_l5_list : "",
							category : "",
							odr_col_list : "",
							odr_type : ""
						}
				    }
			this.chart(tp);
		},
		chart : function(tp){
			
			$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data, param) {
				
				var current = 0;
				var before = 0;
				var dt_id = "";
				data.forEach(item=>{
										
					if(tp == "01"){
					//개소유주택
						dt_id ="DT_1MA0001";
						if(item.PRD_DE == $administStatsMap.ui.year){
							current = item.DTVAL_CO
						} else{
							if(item.DTVAL_CO) {
								before = item.DTVAL_CO
							}
						}						
					}else if(tp == "02"){
						dt_id ="DT_1MA0030";
						if(item.PRD_DE == $administStatsMap.ui.year){
							current = item.DTVAL_CO
						} else{
							//총주택
							before = item.DTVAL_CO
						}
						
					}else if(tp == "03"){
						dt_id ="DT_1MA0021";
						if(item.PRD_DE == $administStatsMap.ui.year){
							current = item.DTVAL_CO
						} else{
							//총주택
							before = item.DTVAL_CO
						}
					}
				})
				
				if(tp == "04") {
					dt_id ="DT_1MA0002";
					const toJson = $administStatsMap.utils.arrayToJson({
						data : data,
						key : "OV_L4_ID"
					});						
					current = (toJson[$administStatsMap.ui.year]['NJ11'].DTVAL_CO / toJson[$administStatsMap.ui.year]["NJ10"].DTVAL_CO * 100);					
					if(toJson[$administStatsMap.ui.year - 1] != undefined) {
						before = (toJson[$administStatsMap.ui.year - 1]["NJ11"].DTVAL_CO / toJson[$administStatsMap.ui.year - 1]["NJ10"].DTVAL_CO * 100);
					}
					
				}else if(tp == "05"){					
					dt_id ="DT_1MA0026";
					const toJson = $administStatsMap.utils.arrayToJson({
						data : data,
						key : "OV_L3_ID"
					});					
					current = (toJson[$administStatsMap.ui.year]['IL10'].DTVAL_CO / toJson[$administStatsMap.ui.year]["IL00"].DTVAL_CO * 100);
					if(toJson[$administStatsMap.ui.year - 1] != undefined) {
						before = (toJson[$administStatsMap.ui.year - 1]["IL10"].DTVAL_CO / toJson[$administStatsMap.ui.year - 1]["IL00"].DTVAL_CO * 100);
					}
				}else if(tp == "06"){					
					dt_id ="DT_1MA0028";
					const toJson = $administStatsMap.utils.arrayToJson({
						data : data,
						key : "OV_L3_ID"
					});					
					current = (toJson[$administStatsMap.ui.year]['DL10'].DTVAL_CO / toJson[$administStatsMap.ui.year]["DL00"].DTVAL_CO * 100);
					if(toJson[$administStatsMap.ui.year - 1] != undefined) {
						before = (toJson[$administStatsMap.ui.year - 1]["DL10"].DTVAL_CO / toJson[$administStatsMap.ui.year - 1]["DL00"].DTVAL_CO * 100);
					}
				}else if(tp == "07"){					
					dt_id ="DT_1MA0037";
					const toJson = $administStatsMap.utils.arrayToJson({
						data : data,
						key : "OV_L3_ID"
					});					
					current = (toJson[$administStatsMap.ui.year]['HO20'].DTVAL_CO / toJson[$administStatsMap.ui.year]["HO10"].DTVAL_CO * 100);
					if(toJson[$administStatsMap.ui.year - 1] != undefined) {
						before = (toJson[$administStatsMap.ui.year - 1]["HO20"].DTVAL_CO / toJson[$administStatsMap.ui.year - 1]["HO10"].DTVAL_CO * 100);
					}
				}else if(tp == "08"){					
					dt_id ="DT_1MA0024";
					
					const toJson = $administStatsMap.utils.arrayToJson({
						data : data,
						key : "OV_L3_ID"
					});					
					current = (toJson[$administStatsMap.ui.year]['P20'].DTVAL_CO / toJson[$administStatsMap.ui.year]["P10"].DTVAL_CO * 100);
					
					if(toJson[$administStatsMap.ui.year - 1] != undefined) {
						before = (toJson[$administStatsMap.ui.year - 1]["P20"].DTVAL_CO / toJson[$administStatsMap.ui.year - 1]["P10"].DTVAL_CO * 100);						
					}
				}
				
				var rtv = 0;
				var rt = 0;
				if(tp == "01" || tp == "02" || tp == "03" ) {
					rtv = (current - before ) / before * 100;
					rt = rtv.toFixed(1);	
				} else {
					rtv = current;
					rt = (current-before).toFixed(1);
				}
				
					
				if(rtv == 100) {
					$("[data-id="+dt_id+"-number]").text($.heum.setThousandSeparator(current));
					$("[data-id="+dt_id+"-rt]").removeClass("state-up state-down").text("-");
					
				} else {
					if(tp == "01") {
						$("[data-id="+dt_id+"-number]").text($.heum.setThousandSeparator(current));
					} else {
						$("[data-id="+dt_id+"-number]").text(Math.abs(rtv).toFixed(1));
					}
					
					if(dt_id == 'DT_1MA0001'){
						$("[data-id="+dt_id+"-rt]").removeClass("state-up state-down").text(" "+rt+"% ");
					}else{
						$("[data-id="+dt_id+"-rt]").removeClass("state-up state-down").text(" "+rt+"%p ");
					}
					if(rtv>0){
						$("[data-id="+dt_id+"-rt]").addClass("state-up");
					}else if(rtv<0){
						$("[data-id="+dt_id+"-rt]").addClass("state-down");
					}
				}
				
			})
		},
		parameters : null,
		common: function(){
			$("[data-type=chart-container]").find("[data-type=tooltip]").hide();
			this.tabIndex = $("#main1-sub-tab li").index($("#main1-sub-tab li.on"));
			if(this.tabIndex==0){
				this.tbl_id = "DT_1MA0001";
				this.parameters = {
					surv_year_list : $administStatsMap.ui.year,
					org_id_list : "101",
					tbl_id_list : this.tbl_id,
					list_var_ord_list : "",
					char_itm_id_list : "T001",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : $administStatsMap.ui.admCd,
					ov_l2_list : "A11",
					ov_l3_list : "0,1,2",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
				};
			}else if(this.tabIndex==1){
				this.tbl_id = "DT_1MA0001";
				this.parameters = {
					surv_year_list : $administStatsMap.ui.year,
					org_id_list : "101",
					tbl_id_list : this.tbl_id,
					list_var_ord_list : "",
					char_itm_id_list : "T001",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : "00",
					ov_l2_list : "A11,A21,A22,A23,A24,A25",
					ov_l3_list : "0",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
				};
			}else{
				return;
			}
			this.chart1();
			this.chart2();
			this.chart3();
		},
		chart1 : function(){
			$("#chart1-1").empty().height("260px");
			let colors, title;
			common_loading(true);
			let itm_nm;
			$("#chart1-1-legend").hide();
			if(this.tabIndex==0){
				title = "년 중·장년층 인구 수";
				colors = ["#a0a0a0", "#23b7d1", "#ff5253"];
				itm_nm = "CHAR_ITM_NM";				
			}else if(this.tabIndex==1){
				title = "년 중·장년층 연령구간별 비중";
				colors = ["#a0a0a0", "#7CB5EC","#e2658f"];
				itm_nm = "OV_L2_UP_ITM_KOR";
				this.parameters.surv_year_list = $administStatsMap.ui.year;
				$("#chart1-1").height("250px");
			}
			
			const _this = this;
			$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data, param) {
				let chartData = [];
				if(_this.tabIndex==0){
					$("#chart1-1-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);
					data.forEach(item=>{						
						if(item.OV_L3_ID != '0') {
							chartData.push({
								itm_nm:item.OV_L3_KOR,
								dt:parseFloat(item.DTVAL_CO),
								gender:item.OV_L3_ID,
								color:colors[item.OV_L3_ID]
							})
						}
					});

					chartData = chartData.sort(function(a, b) { 
						  return a.gender < b.gender ? -1 : a.gender > b.gender ? 1 : 0;
					});
					
					createDonutChart({isDisabledLegendClick:false,data:chartData,target:"chart1-1",colorData:colors,unit:"명",sumText:"중·장년층 전체",tooltipCallback:function(d,i){
						const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]");
						tooltip.empty();
						tooltip.append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								$("<h3/>",{"class":"modal__tit","text":chartData[i].itm_nm}),
								$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
									$(this).parents('[data-type=tooltip]').hide();
									return false;
								}).append($("<span/>",{"class":"btn-close btn-close--black"}))
							),
							$("<div/>",{"class":"modal__body"}).append(
								$("<p/>").append(
									$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
								),
								$("<p/>").append(
									$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(d.value)}),"명"
								),
								$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
									let parameters = $.extend(true,{},_this.parameters);
									parameters.tbl_id_list = data[i].TBL_ID;
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
									parameters.ov_l3_list = chartData[i].gender;
									parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
									$administStatsMap.ui.tooltipMap.title = chartData[i].itm_nm;
									$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
										for(let k=0; k<res.length; k++) {
											if(res[k].OV_L1_ID == "00") {
												$administStatsMap.ui.tooltipMap.mapTotalVal = parseFloat(res[k].DTVAL_CO);
											}
										}
										let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
										const themeInfo = $administStatsMap.ui.themeData[$administStatsMap.ui.theme];
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "dt",
											unit : themeInfo.mapData.unit,
											callback:function(data){												
												$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														$("#tooltip-map-modal-title").empty().append(
															$("<h3>",{"text":$administStatsMap.ui.year+'년 '}),
															$("<h3/>").append(
																'중·장년층 인구 수'
															),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
														$("#tooltip-map-tooltip").empty().append(
															$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.tooltipMap.title}),
																$("<a/>",{"class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-tooltip').hide(); 
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															),
															$("<div/>",{"class":"modal__body"}).append(
																$("<p/>").append(
																	$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																),
																$("<p/>").append(
																	$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(d.value)}),"명"
																)
															)
														);
													},
													didSelectedPolygon : function(callback){
														$("#tooltip-map-tooltip [data-id=region-name]").text($administStatsMap.ui.selectedAdmNm);
														$("#tooltip-map-tooltip .modal__tit").text($administStatsMap.ui.year+"년 "+$administStatsMap.ui.selectedAdmNm);										
														$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.businessChart[i].dt));
														if(typeof callback==="function"){
															callback();
														}
													}
												});
												$("#tooltip-map-tooltip").show();
											}
										},resultMapData.result.mapData,parameters);
									});
								})
							)
						).show();
					}});
				}else {								
					$("#chart1-1-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);
					let datas = [];
					for (let i = 0; i < data.length; i++) {
						let s = data[i];
						s.DTVAL_CO = s.DTVAL_CO * 1;
						for (let j = 0; j < data.length; j++) {
							let t = data[j];
							t.DTVAL_CO = t.DTVAL_CO * 1;
							if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
								if (s.OV_L2_ID != "A11" && t.OV_L2_ID == "A11") {
									s.DTVAL_CO_ORI = s.DTVAL_CO;
									s.DTVAL_CO = s.DTVAL_CO / t.DTVAL_CO * 100;
									datas.push(s);
								}
							}
						}
					}
					
					datas.forEach(item=>{																			
						chartData.push({
							itm_nm:item.OV_L2_KOR,
							dt:parseFloat(item.DTVAL_CO).toFixed(1),
							dtOrg:item.DTVAL_CO_ORI,
							order:item.OV_L2_ID,
							adm_cd:item.OV_L1_ID
						});					
					});
					
					chartData = chartData.sort(function(a, b) { 
						  return a.order < b.order ? -1 : a.order > b.order ? 1 : 0;
					});
										
					createVerticalBarChart({
						rotate:false,
						target:"chart1-1",
						data:chartData,
						dataVal:"dt",
						columnVal:"itm_nm",
						color:["#7F7F7F","#8DB4C1","#4A7E91", "#316476","#255363"],
						isShowYaxis:false,
						isSort:false,
						unit:"%",
						tooltipCallback:function(d,i){
							const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":chartData[i].itm_nm}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(chartData[i].dtOrg)}),"명"
									),
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										$administStatsMap.ui.tooltipMap.mapTotalVal=null;
										let parameters = $.extend(true,{},_this.parameters);
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;										
										parameters.ov_l2_list = "A11,"+chartData[i].order;										
										$administStatsMap.ui.tooltipMap.title=chartData[i].itm_nm;
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {																																	
											let alldatas = opt_fnCalc({data:res,trgtId:"OV_L2_ID",except:"A11"});
											alldatas.forEach((d,index)=>{
												d.adm_cd = d.OV_L1_ID;
												d.region_nm = d.OV_L1_KOR;
											});
											
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "DTVAL_CO",
												unit : "%",
												callback:function(data){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년 '}),
																$("<h3/>").append("중·장년층 연령구간별 비중",$("<span/>")),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
														},
														endCallback:function(){
															$("#tooltip-map-tooltip").empty().append(
																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																	$("<h3/>",{"class":"modal__tit","text":chartData[i].itm_nm}),
																	$("<a/>",{"class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-tooltip').hide(); 
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																),
																$("<div/>",{"class":"modal__body"}).append(
																	$("<p/>").append(
																		$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																	),
																	$("<p/>").append(
																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(chartData[i].dt)}),"%"
																	)
																)
															);
															$("#tooltip-map-tooltip").show();
														}
													});
												}
											},alldatas,parameters);
										});
									})
								)
							);
							tooltip.show();
						}
					});
				}
				common_loading(false);
			});
		},
		chart2: function(){
			$("#chart1-2").empty();			
			const _this = this;
			let admCd,columns=[],groupKey,title;
			if(_this.tabIndex==0){
				admCd = $administStatsMap.consts.sidoAll;
				groupKey = "TBL_ID";
				columnNames = ["남자","여자"];
				columns = ["1","2"];
				title = "년 지역별 중·장년층 인구 수"
				this.parameters.ov_l3_list = "0,1,2";
			}else if(_this.tabIndex==1){
				admCd = $administStatsMap.consts.sidoAll;
				groupKey = "OV_L2_ID";
				columnNames = ["40-44세","45-49세","50-54세","55-59세","60-64세"];
				columns = ["A21","A22","A23","A24","A25"];
				title = "년 지역별 중·장년층 연령구간별 비중";
//				this.parameters.ov_l2_list = "A10,A11";
//				this.parameters.ov_l3_list = "0";
			}
			$administStatsMap.utils.getTotsurvStatData(
				$.extend(true,{},this.parameters,{ov_l1_list:admCd}),function(data){
					
					$("#chart1-2-legend .legend-label:first").text(columnNames[0]);
					$("#chart1-2-legend").show();
					let chartData = [];
					let total = 0;
					data = data.sort(function (a, b) {
						return parseFloat(b.DTVAL_CO)-parseFloat(a.DTVAL_CO);
					});
					if(_this.tabIndex==0){
						$("#chart1-2-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);
						$("#chart1-2-1-legend").hide();
						$("#chart1-2-legend .legend-label:first").text(columnNames[1]);
						$("#chart1-2-legend .legend-label:last").text(columnNames[0]);
						$("#chart1-2-legend").show();
						
						const toJson = $administStatsMap.utils.arrayToJson({
							data : data,
							key : "OV_L1_ID",
							key2 : "OV_L3_ID"
						});
						
						let datas = {};
						let total = 0;
						data.forEach(item=>{							
							if(columns.indexOf(item.OV_L3_ID)>-1){
								datas[item.OV_L1_ID] = datas[item.OV_L1_ID]||{};
								datas[item.OV_L1_ID][item.OV_L3_ID] = parseFloat(item.DTVAL_CO);
								datas[item.OV_L1_ID].total = datas[item.OV_L1_ID].total||0;
								datas[item.OV_L1_ID].total+=datas[item.OV_L1_ID][item.OV_L3_ID];
								datas[item.OV_L1_ID].category = $administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR);
								datas[item.OV_L1_ID].admCd = item.OV_L1_ID;
								if(item.OV_L1_ID!="00"&&item.OV_L1_ID!="000"){
									total+=datas[item.OV_L1_ID][item.OV_L3_ID];
								}
							}
						});
						
						datas = Object.keys(datas).filter(key=>key!="00"&&key!="000").map(key=>datas[key]).sort(function (a, b) {
							return b.total-a.total;
						});
						const categories = datas.map(item=>item.category);
						const avg = total/datas.length;
//						$("#chart1-2-avg-text").empty().append(
//							$("<p/>").append(
//								$("<span/>",{"text":"평균"}),
//								$.heum.setThousandSeparator(parseInt(avg))+"명"
//							)
//						);
						
						
						createStackBarChart({unit:"명",target:"chart1-2",data:datas,columns:columns,colors:["#23b7d1","#ff5253"],category:categories,viewTotalColumn:function(data){
							return $.heum.setThousandSeparator(data.total);
							},tooltipCallback:function(d,i){
							const dataIndex = $(this).parent("[data-type=eventGroup]").data("value");
							const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
										$("<h3/>",{"class":"modal__tit","text":columnNames[dataIndex]}),
										$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
											$(this).parents('[data-type=tooltip]').hide();
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									),
									$("<div/>",{"class":"modal__body"}).append(
										$("<p/>").append(
											$("<span/>",{"class":"color-blue","text":categories[i]})
										),
										$("<p/>").append(
											$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(datas[i][columns[dataIndex]])}),"명"
										),							
										$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
											$administStatsMap.ui.tooltipMap.mapTotalVal = toJson[$administStatsMap.ui.year]["00"][columns[dataIndex]].DTVAL_CO;
											let parameters = $.extend(true,{},_this.parameters);
											parameters.tbl_id_list = data[i].TBL_ID;
											parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
											parameters.ov_l3_list = columns[dataIndex]; 									
											parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
											$administStatsMap.ui.tooltipMap.title = columnNames[dataIndex];									
											$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
												let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
												$administStatsMap.ui.map["tooltip-map"].setStatsData({
													adm_cd: "00",
													admCdKey:"adm_cd",
													showData : "dt",
													unit : "명",
													callback:function(data){
														$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//														$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
														$administStatsMap.ui.tooltipMap.show({
															tooltipCallback:function(){
																$("#tooltip-map-modal-title").empty().append(
																	$("<h3>",{"text":$administStatsMap.ui.year+'년 '}),
																	$("<h3/>").append(
																		"지역별 중·장년층 인구 수"
																	),
																	$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-container').hide();
																		$('.dim').hide();
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																);
															},
															endCallback:function(){
																$administStatsMap.ui.map["tooltip-map"].dataBoundary.eachLayer(function(layer){
																	if(layer.feature.properties.adm_cd==datas[i].admCd){
																		layer.fire("click");
																	}
																})
															}
														});
														$("#tooltip-map-tooltip").show();
													}
												},resultMapData.result.mapData,parameters);
											});
										})
									)
								);
								tooltip.show();
							}});
					} else if(_this.tabIndex==1) {
						$("#chart1-2-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);
						$("#chart1-2-legend").hide();
						$("#chart1-2-1-legend").show();
						
						let innerParam = {
							tbl_id_list : "DT_1MA0001",
							surv_year_list : $administStatsMap.ui.year,
							org_id_list : "101",							
							list_var_ord_list : "",
							char_itm_id_list : "T001",
							prt_type : "",
							adm_cd : "",
							ov_l1_list : $administStatsMap.consts.sidoAll,
							ov_l2_list : "A10,A11",
							ov_l3_list : "0",
							ov_l4_list: "",
							ov_l5_list: "",
							category : "",
							odr_col_list : "",
							odr_type : ""
						};
						let totDatas = [];
						
						$administStatsMap.utils.getTotsurvStatData(innerParam, function(res, param) {
							for (let i = 0; i < res.length; i++) {
								let s = JSON.parse(JSON.stringify(res[i]));
								s.DTVAL_CO = s.DTVAL_CO * 1;
								for (let j = 0; j < res.length; j++) {
									let t = JSON.parse(JSON.stringify(res[j]));
									t.DTVAL_CO = t.DTVAL_CO * 1;
									if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
										if (s.OV_L2_ID != "A10" && t.OV_L2_ID == "A10") {
											s.DTVAL_CO_ORI = s.DTVAL_CO;
											s.DTVAL_CO = (s.DTVAL_CO / t.DTVAL_CO * 100).toFixed(1);
											totDatas.push(s);
										}
									}
								}
							}							
						});
														
						data = opt_fnCalc({data:data,trgtId:"OV_L2_ID",except:"A11"});
						let datas = [];						
						let total = 0;
						data.forEach(item=>{									
							if(columns.indexOf(item.OV_L2_ID)>-1){
								item.DTVAL_CO = parseFloat(item.DTVAL_CO).toFixed(1);
								datas[item.OV_L1_ID] = datas[item.OV_L1_ID]||{};
								datas[item.OV_L1_ID][item[groupKey]] = parseFloat(item.DTVAL_CO);								
								datas[item.OV_L1_ID].total = datas[item.OV_L1_ID].total||0;
								datas[item.OV_L1_ID].total+=datas[item.OV_L1_ID][item[groupKey]];
								datas[item.OV_L1_ID].category = $administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR);
								datas[item.OV_L1_ID].admCd = item.OV_L1_ID;
								if(item.OV_L1_ID!="00"&&item.OV_L1_ID!="000"){
									total+=datas[item.OV_L1_ID][item.OV_L2_ID];
								}
							}					
						});
						
						
						
						datas.forEach(data=>{	
							let schData1 = totDatas.filter(item=>item.OV_L1_ID == data.admCd);
							data.per = schData1[0].DTVAL_CO;
						});
						
						datas = Object.keys(datas).filter(key=>key!="00"&&key!="00").map(key=>datas[key]).sort(function (a, b) {
							return b.per-a.per;
						});
						
						const categories = datas.map(item=>item.category);
						console.log(datas)
						createStackBarChartForPer({
							unit:"%",
							target:"chart1-2",
							data:datas,
							columns:columns,
							colors:["#7F7F7F","#A9B4BC","#6688A0", "#447291","#225B82","#255363"],
							viewTotalColumn:function(data){								
								let schData = totDatas.filter(item=>item.OV_L1_ID == data.admCd);	
								return schData[0].DTVAL_CO;
							},
							category:categories,tooltipCallback:function(d,i){
						
							const dataIndex = $(this).parent("[data-type=eventGroup]").data("value");
							const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":columnNames[dataIndex]}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":categories[i]})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(datas[i][columns[dataIndex]].toFixed(1))}),"%"
									),
//									"(<span class='color-red'>"+((datas[i][columns[dataIndex]]/datas[i].total)*100).toFixed(1)+"</span>%)",
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										$administStatsMap.ui.tooltipMap.mapTotalVal=null;
										let parameters = $.extend(true,{},_this.parameters);
										parameters.tbl_id_list = data[i].TBL_ID;
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
//										parameters.ov_l3_list = columns[dataIndex];
										parameters.surv_year_list = $administStatsMap.ui.year;
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
										$administStatsMap.ui.tooltipMap.title = columnNames[dataIndex];
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											datas.forEach(item=>{
												res.forEach(sel=>{
													if(sel.OV_L1_ID == item.admCd) {
														sel.DTVAL_CO = item[columns[dataIndex]];
													}
												})
											})
											let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});											
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : "%",
												callback:function(data){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년'}),
																$("<h3/>").append(
																	'지역별 중·장년층 연령구간별 비중'
																),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
														},
														endCallback:function(){
															$administStatsMap.ui.map["tooltip-map"].dataBoundary.eachLayer(function(layer){
																if(layer.feature.properties.adm_cd==datas[i].admCd){
																	layer.fire("click");
																}
															})
														}
													});
													$("#tooltip-map-tooltip").show();
												}
											},resultMapData.result.mapData,parameters);
										});
									})
								)
							);
							tooltip.show();
						}});
						
						
						
//						let datas = [];
//						for (let i = 0; i < data.length; i++) {
//							let s = data[i];
//							s.DTVAL_CO = s.DTVAL_CO * 1;
//							for (let j = 0; j < data.length; j++) {
//								let t = data[j];
//								t.DTVAL_CO = t.DTVAL_CO * 1;
//								if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
//									if (s.OV_L2_ID != "A10" && t.OV_L2_ID == "A10") {
//										s.DTVAL_CO_ORI = s.DTVAL_CO;
//										s.DTVAL_CO = s.DTVAL_CO / t.DTVAL_CO * 100;
//										datas.push(s);
//									}
//								}
//							}
//						}						
//						datas.forEach(item=>{																			
//							if(item.OV_L1_ID != '00') {
//								const value = parseFloat(item.DTVAL_CO);
//								chartData.push({
//									itm_nm:$administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR),
//									dt:value.toFixed(1),
//									origin:item.DTVAL_CO_ORI,
//									admCd:item.OV_L1_ID
//								});
//								total+=value;
//							}
//						});
//						const avg = total/chartData.length-1;
//						
//						let max = 0;
//						let colors = chartData.map((d,index)=>{
//							max = Math.max(max,parseFloat(d.dt));							
//							return "#747474";
//						});
//						colors[chartData.findIndex(x => parseFloat(x.dt) === max)] = "#ff5252";
//						
////						$("#chart1-2-avg-text").empty().append(
////							$("<p/>").append(
////								$("<span/>",{"text":"평균"}),
////								avg.toFixed(1)+"%"
////							)
////						);	
//																
//						createVerticalBarChart({
//							rotate:false,
//							target:"chart1-2",
//							data:chartData,
//							dataVal:"dt",
//							columnVal:"itm_nm",
//							color:colors,
//							isShowYaxis:false,
//							unit:"%",
//							tooltipCallback:function(d,i){
//								const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
//								tooltip.empty();
//								tooltip.append(
//									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
//										$("<h3/>",{"class":"modal__tit","text":"지역별 연령구간별 비중"}),
//										$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
//											$(this).parents('[data-type=tooltip]').hide();
//											return false;
//										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
//									),
//									$("<div/>",{"class":"modal__body"}).append(
//										$("<p/>").append(
//											$("<span/>",{"class":"color-blue","text":chartData[i].itm_nm})
//										),
//										$("<p/>").append(
//											$("<span/>",{"class":"color-red","text":(($.heum.setThousandSeparator(chartData[i].dt)))}),"%"
//										),
//										$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
//											let parameters = $.extend(true,{},_this.parameters);
//											parameters.tbl_id_list = data[i].TBL_ID;
//											parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
//											parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
//											$administStatsMap.ui.tooltipMap.title="";											
//											$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {												
//												let alldatas = opt_fnCalc({data:res,trgtId:"OV_L2_ID",except:"A10"});												
//												alldatas.forEach((d,index)=>{
//													d.adm_cd = d.OV_L1_ID;
//													d.region_nm = d.OV_L1_KOR;
//												});		
//												let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
//												$administStatsMap.ui.map["tooltip-map"].setStatsData({
//													adm_cd: "00",
//													admCdKey:"adm_cd",
//													showData : "DTVAL_CO",
//													unit : "%",
//													callback:function(data){
//														$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
////														$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
//														$administStatsMap.ui.tooltipMap.show({
//															tooltipCallback:function(){
//																$("#tooltip-map-modal-title").empty().append(
//																	$("<h3>",{"text":$administStatsMap.ui.year+'년 '}),
//																	$("<h3/>").append("지역별 중·장년층 비중"),
//																	$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
//																		$('#tooltip-map-container').hide();
//																		$('.dim').hide();
//																		return false;
//																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
//																);
//															},
//															endCallback:function(){
//																$administStatsMap.ui.map["tooltip-map"].dataBoundary.eachLayer(function(layer){
//																	if(layer.feature.properties.adm_cd==chartData[i].admCd){
//																		layer.fire("click");
//																	}
//																})
//															}
//														});
//													}
//												},alldatas,parameters);
//											});
//										})
//									)
//								);
//								tooltip.show();
//							}
//						});
					}
				}
			);
		},
		chart3:function(){
			$("#chart1-3").empty();
			const _this = this;
			let parameters = $.extend(true,{},this.parameters),title;			
			let columns=[],groupKey,series;
			
			if(_this.tabIndex==0){
				title = "연도별 중·장년층 인구 수";
				parameters.tbl_id_list ="DT_1MA0001";
				groupKey = "TBL_ID";
				columns = ["DT_1MA0001"];
				series=[{"name":"전체",data:[]},{"name":"여자",data:[]},{"name":"남자",data:[]}]
				parameters.ov_l2_list = "A11";
				parameters.surv_year_list = $administStatsMap.ui.yearList.join(",");
			}else{
				title = "연도별 중·장년층 연령구간별 비중";
				groupKey = "TBL_ID";
				columns = ["DT_1MA0001"];
				series=[{"code":"A21","name":"40-44세",data:[]},{"code":"A22","name":"45-49세",data:[]},{"code":"A23","name":"50-54세",data:[]},{"code":"A24","name":"55-59세",data:[]},{"code":"A25","name":"60-64세",data:[]}]
				parameters.surv_year_list = $administStatsMap.ui.yearList.join(",");
				parameters.ov_l2_list = "A11,A21,A22,A23,A24,A25";
				parameters.ov_l3_list = "0";
			}
			
			parameters.ov_l1_list = $administStatsMap.ui.admCd;
			
			$administStatsMap.utils.getTotsurvStatData(
				parameters,
				function(data){
					let categories = $.extend(true,[],$administStatsMap.ui.yearList).sort().map(year=>year+"년");					
					if(_this.tabIndex==0) {
						$("#chart1-3-title").data("append-text",title).empty().append(title);
						data.forEach(function(d){
							const index = d.OV_L3_ID;
							
							if(index == 0) {
								series[index].data.push(parseFloat(d.DTVAL_CO));								
							} else if(index == 1) {
								series[2].data.push(parseFloat(d.DTVAL_CO));
							}  else if(index == 2) {
								series[1].data.push(parseFloat(d.DTVAL_CO));
							}
							
						});
						createMultiLineChart({
							target:"chart1-3",
							colors:["#7F7F7F","#ff5253","#23b7d1"],
							categories,
							series,
							dataLabelsFormater:function(){
								if(this.point.index==series[this.colorIndex].data.length-1){
									return $.heum.setThousandSeparator(this.y)+"명";
								}
							},
							tooltipCallback:function({name,data,event}){
								const beforeData = series[event.point.colorIndex].data[event.point.index-1];							
								let ratio;
								if(beforeData){
									let rat = ((data - beforeData) / beforeData);
									let ca = "";
									let ratColor;
									if(rat>0){
										ca = "증가↑";
										ratColor="blue";
									}else if(rat<0){
										ca = "감소↓";
										ratColor="red";
									}
									ratio = "(전년 대비 <span class='color-"+ratColor+"'>"+Math.abs((rat * 100).toFixed(1))+"</span>% "+ca+")";
								}
								const tooltip = $("#chart1-3-container").find("[data-type=tooltip]:last");
								tooltip.empty();
								tooltip.append(
										$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
											$("<h3/>",{"class":"modal__tit","text":name+" "+series[event.point.colorIndex].name}),
											$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
												$(this).parents('[data-type=tooltip]').hide();
												return false;
											}).append($("<span/>",{"class":"btn-close btn-close--black"}))
										),
										$("<div/>",{"class":"modal__body"}).append(
											$("<p/>").append(
												$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
											),
											$("<p/>").append(
												$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(data)}),"명"
											),
											ratio,
											$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
												$administStatsMap.ui.tooltipMap.mapTotalVal = data;												
												let parameters = $.extend(true,{},_this.parameters);
												parameters.surv_year_list = parseInt(categories[event.point.index].replace("년",""));
												parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
												if(event.point.colorIndex == 0) {
													parameters.ov_l3_list = event.point.colorIndex;
												} else if(event.point.colorIndex == 1) {
													parameters.ov_l3_list = 2;
												}  else if(event.point.colorIndex == 2) {
													parameters.ov_l3_list = 1;
												}
												
												parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
												$administStatsMap.ui.tooltipMap.title="";
												$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
													let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
													$administStatsMap.ui.map["tooltip-map"].setStatsData({
														adm_cd: "00",
														admCdKey:"adm_cd",
														showData : "dt",
														unit : "명",
														callback:function(d){
															$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//															$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
															$administStatsMap.ui.tooltipMap.show({
																tooltipCallback:function(){
																	$administStatsMap.ui.tooltipMap.title = series[event.point.colorIndex].name;
																	$("#tooltip-map-modal-title").empty().append(
																		$("<h3>",{"text":categories[event.point.index]}),
																		$("<h3/>").append(
																			title
																		),
																		$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																			$('#tooltip-map-container').hide();
																			$('.dim').hide();
																			return false;
																		}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																	);
																	$("#tooltip-map-tooltip").empty().append(
																		$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																			$("<h3/>",{"class":"modal__tit","text":series[event.point.colorIndex].name}),
																			$("<a/>",{"class":"btn__cancel"}).click(function(){
																				$('#tooltip-map-tooltip').hide(); 
																				return false;
																			}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																		),
																		$("<div/>",{"class":"modal__body"}).append(
																			$("<p/>").append(
																				$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																			),
																			$("<p/>").append(
																				$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(data)}),"명"
																			)
																		)
																	);
																},
																endCallback:function(){
																	$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt(categories[event.point.index].replace("년",""));
																	$("#tooltip-map-tooltip").show();
																}
															});
														}
													},resultMapData.result.mapData,parameters);
												});
											})
										)
									);
								tooltip.show();
							}
						});
					} else {			
						$("#chart1-3-title").data("append-text",title).empty().append(title);						
						data = opt_fnCalc({data:data,trgtId:"OV_L2_ID",except:"A11"});
						data.forEach(function(d){			
							if(d.OV_L2_ID == "A21") {
								series[0].data.push(parseFloat(d.DTVAL_CO));
							}  else if(d.OV_L2_ID == "A22") {
								series[1].data.push(parseFloat(d.DTVAL_CO));
							}  else if(d.OV_L2_ID == "A23") {
								series[2].data.push(parseFloat(d.DTVAL_CO));
							} else if(d.OV_L2_ID == "A24") {
								series[3].data.push(parseFloat(d.DTVAL_CO));
							} else if(d.OV_L2_ID == "A25") {
								series[4].data.push(parseFloat(d.DTVAL_CO));
							}
						});						
						createMultiLineChart({
							target:"chart1-3",
							colors:["#7F7F7F","#8DB4C1","#4A7E91","#316476","#255363"],
							categories,
							series,
							dataLabelsFormater:function(){
								if(this.point.index==series[this.colorIndex].data.length-1){
									return $.heum.setThousandSeparator(this.y)+"%";
								}
							},
							tooltipCallback:function({name,data,event}){
								const beforeData = series[event.point.colorIndex].data[event.point.index-1];
								let ratio;
								if(beforeData){
									let rat = data - beforeData;
									let ca = "";
									let ratColor;
									if(rat>0){
										ca = "증가↑";
										ratColor="blue";
									}else if(rat<0){
										ca = "감소↓";
										ratColor="red";
									}
									ratio = "(전년 대비 <span class='color-"+ratColor+"'>"+Math.abs(rat).toFixed(1)+"</span>%p "+ca+")";
								}
								const tooltip = $("#chart1-3-container").find("[data-type=tooltip]:last");
								tooltip.empty();
								tooltip.append(
										$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
											$("<h3/>",{"class":"modal__tit","text":name+" "+series[event.point.colorIndex].name}),
											$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
												$(this).parents('[data-type=tooltip]').hide();
												return false;
											}).append($("<span/>",{"class":"btn-close btn-close--black"}))
										),
										$("<div/>",{"class":"modal__body"}).append(
											$("<p/>").append(
												$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
											),
											$("<p/>").append(
												$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(data)}),"%"
											),
											ratio,
											$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
												let parameters = $.extend(true,{},_this.parameters);
												parameters.surv_year_list = parseInt(categories[event.point.index].replace("년",""));
												parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
												parameters.ov_l2_list = "A11,"+series[event.point.colorIndex].code;;
												parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
												$administStatsMap.ui.tooltipMap.title="";
												$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {													
													let alldatas = opt_fnCalc({data:res,trgtId:"OV_L2_ID",except:"A11"});
													alldatas.forEach((d,index)=>{
														d.adm_cd = d.OV_L1_ID;
														d.region_nm = d.OV_L1_KOR;
													});
													
													let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
													$administStatsMap.ui.map["tooltip-map"].setStatsData({
														adm_cd: "00",
														admCdKey:"adm_cd",
														showData : "DTVAL_CO",
														unit : "%",
														callback:function(d){
															$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//															$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
															$administStatsMap.ui.tooltipMap.show({
																tooltipCallback:function(){
																	$administStatsMap.ui.tooltipMap.title = series[event.point.colorIndex].name;
																	$("#tooltip-map-modal-title").empty().append(
																		$("<h3>",{"text":categories[event.point.index]}),
																		$("<h3/>").append(
																			title
																		),
																		$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																			$('#tooltip-map-container').hide();
																			$('.dim').hide();
																			return false;
																		}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																	);
																	$("#tooltip-map-tooltip").empty().append(
																		$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																			$("<h3/>",{"class":"modal__tit","text":series[event.point.colorIndex].name}),
																			$("<a/>",{"class":"btn__cancel"}).click(function(){
																				$('#tooltip-map-tooltip').hide(); 
																				return false;
																			}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																		),
																		$("<div/>",{"class":"modal__body"}).append(
																			$("<p/>").append(
																				$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																			),
																			$("<p/>").append(
																				$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(data)}),"%"
																			)
																		)
																	);
																},
																endCallback:function(){
																	$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt(categories[event.point.index].replace("년",""));
																	$("#tooltip-map-tooltip").show();
																}
															});
														}
													},alldatas,parameters);
												});
											})
										)
									);
								tooltip.show();
							}
						});
					}
					
					
				}
			);
		}
	},
	main2 : {
		tabIndex:null,
		tbl_id:null,
		parameters : null,
		common: function(){
			$("[data-type=chart-container]").find("[data-type=tooltip]").hide();
			this.tabIndex = $("#main2-sub-tab li").index($("#main2-sub-tab li.on"));
			if(this.tabIndex==0){
				this.tbl_id = "DT_1MA0002";
				this.parameters = {
					surv_year_list : $administStatsMap.ui.year,
					org_id_list : "101",
					tbl_id_list : this.tbl_id,
					list_var_ord_list : "",
					char_itm_id_list : "T001",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : $administStatsMap.ui.admCd,
					ov_l2_list : "0",
					ov_l3_list : "A10",
					ov_l4_list : "NJ10,NJ11",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
				};
			}else if(this.tabIndex==1){
				this.tbl_id = "DT_1MA0003";
				this.parameters = {
					surv_year_list : $administStatsMap.ui.year,
					org_id_list : "101",
					tbl_id_list : this.tbl_id,
					list_var_ord_list : "",
					char_itm_id_list : "T001",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : $administStatsMap.ui.admCd,
					ov_l2_list : "0",
					ov_l3_list : "A10",
					ov_l4_list : "EF10,EF11,EF12,EF13",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
				};
			}else{
				return;
			}
			this.chart1();
			this.chart2();
			this.chart3();			
		},
		chart1 : function(){
			$("#chart2-1").empty();
			let colors, title;
			common_loading(true);
			let itm_nm;
			$("#chart2-1-legend").hide();
			if(this.tabIndex==0){
				title = "년 중·장년층 등록취업 비중";
				colors = ["#7CB5EC", "#434348"];
				itm_nm = "CHAR_ITM_NM";				
			}else if(this.tabIndex==1){
				title = "년 중·장년층 등록취업자 종사상 지위별  비중";
				colors = ["#a0a0a0", "#7CB5EC","#e2658f"];
				itm_nm = "OV_L2_UP_ITM_KOR";
//				$("#chart2-1-legend").show();
			}
			
			const _this = this;
			$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data, param) {
				
				let chartData = [];
				
				if(_this.tabIndex==0){
					
					$("#chart2-1-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);
					$("#chart2-1-legend").show();
					var total = data.find(x => x.OV_L4_ID === 'NJ10').DTVAL_CO;
					var dataAll = data.find(x => x.OV_L4_ID === 'NJ10');
					var dataRg = data.find(x => x.OV_L4_ID === 'NJ11');
					
					chartData.push({
						itm_nm:dataRg.OV_L4_KOR,
						dt:parseFloat(dataRg.DTVAL_CO)						
					});
					
					chartData.push({
						itm_nm:"미취업자",
						dt:parseFloat(dataAll.DTVAL_CO-dataRg.DTVAL_CO)
					});			
										
					createDonutChart({isDisabledLegendClick:false,isShowLegend:false,data:chartData,target:"chart2-1",colorData:colors,unit:"명",sumText:"중·장년층 전체",tooltipCallback:function(d,i){
						if(i == 1){
							return;
						}
						const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]");
						tooltip.empty();
						tooltip.append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								$("<h3/>",{"class":"modal__tit","text":chartData[i].itm_nm}),
								$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
									$(this).parents('[data-type=tooltip]').hide();
									return false;
								}).append($("<span/>",{"class":"btn-close btn-close--black"}))
							),
							$("<div/>",{"class":"modal__body"}).append(
								$("<p/>").append(
									$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
								),
								$("<p/>").append(
									$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(d.value)}),"명"
								),
								$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
									//$administStatsMap.ui.tooltipMap.mapTotalVal = chartData[i].dt;
									$administStatsMap.ui.tooltipMap.mapTotalVal = 0;
									$administStatsMap.ui.tooltipMap.title = "등록취업 비중";
									let parameters = $.extend(true,{},_this.parameters);
									parameters.tbl_id_list = data[i].TBL_ID;
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
									parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
									//$administStatsMap.ui.tooltipMap.title = chartData[i].itm_nm;
									$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
										let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
										
										let allData = [];
										for(let j =0 ; j<res.length; j++){
											if(res[j].OV_L4_ID == "NJ10" && res[j].OV_L3_ID == "A10" && res[j].PRD_DE == $administStatsMap.ui.year){
												allData.push(res[j]);
											}
										}
										
										for(let j =0 ; j<resultMapData.result.mapData.length; j++){
											for(let n=1;n< allData.length;n++){
												if(allData[n].OV_L1_ID == resultMapData.result.mapData[j].adm_cd){
													resultMapData.result.mapData[j].dt = (resultMapData.result.mapData[j].dt/ allData[n].DTVAL_CO *100).toFixed(1);
												}
											}
										}
										
										const themeInfo = $administStatsMap.ui.themeData[$administStatsMap.ui.theme];
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											//adm_cd: $administStatsMap.ui.admCd,
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "dt",
											unit : "%",
											callback:function(data){
												if($administStatsMap.ui.admCd=="00"){
													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
												}else{
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
												}
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														$("#tooltip-map-modal-title").empty().append(
															$("<h3>",{"text":$administStatsMap.ui.year+'년'}),
															$("<h3/>").append(
																'중·장년층 등록취업 비중',
																$("<span/>")
															),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
														$("#tooltip-map-tooltip").empty().append(
															$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																$("<h3/>",{"class":"modal__tit","text":'등록취업 비중'}),
																$("<a/>",{"class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-tooltip').hide(); 
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															),
															$("<div/>",{"class":"modal__body"}).append(
																$("<p/>").append(
																	$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																),
																$("<p/>").append(
																	//$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(d.value)}),"명"
																	$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(d.value/d.value*100)}),"%"
																)
															)
														);
													},
													didSelectedPolygon : function(callback){
														$("#tooltip-map-tooltip [data-id=region-name]").text($administStatsMap.ui.selectedAdmNm);
														$("#tooltip-map-tooltip .modal__tit").text($administStatsMap.ui.year+"년 "+$administStatsMap.ui.selectedAdmNm);										
														$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.businessChart[i].dt));
														if(typeof callback==="function"){
															callback();
														}
													}
												});
												$("#tooltip-map-tooltip").show();
											}
										},resultMapData.result.mapData,parameters);
									});
								})
							)
						).show();
					}});
					//$('.highcharts-data-label-color-1').css('opacity', 0);
					//$('.highcharts-color-1').css('stroke-width', 0);
				}else {	
					$("#chart2-1-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);
					$("#chart2-1-legend").hide();
					let datas = [];
					for (let i = 0; i < data.length; i++) {
						let s = data[i];
						s.DTVAL_CO = s.DTVAL_CO * 1;
						for (let j = 0; j < data.length; j++) {
							let t = data[j];
							t.DTVAL_CO = t.DTVAL_CO * 1;
							if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
								if (s.OV_L4_ID != "EF10" && t.OV_L4_ID == "EF10") {
									s.DTVAL_CO_ORI = s.DTVAL_CO;
									s.DTVAL_CO = s.DTVAL_CO / t.DTVAL_CO * 100;
									//s.DTVAL_CO = s.DTVAL_CO;
									datas.push(s);
								}
							}
						}
					}
					
					datas.forEach(item=>{																			
						chartData.push({
							itm_nm:item.OV_L4_KOR,
							dt:parseFloat(item.DTVAL_CO).toFixed(1),
							dtOrg:item.DTVAL_CO_ORI,
							order:item.OV_L2_ID,
							item_cd:item.OV_L4_ID
						});					
					});
					
					chartData = chartData.sort(function(a, b) { 
						  return a.order < b.order ? -1 : a.order > b.order ? 1 : 0;
					});
					
					createVerticalBarChart({
						rotate:false,
						target:"chart2-1",
						data:chartData,
						dataVal:"dt",
						columnVal:"itm_nm",
						color:["#255363","#8DB4C1","#1287A9"],
						isShowYaxis:false,
						isSort:false,
						//unit:'명',
						unit:'%',
						tooltipCallback:function(d,i){
							const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":chartData[i].itm_nm}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(chartData[i].dtOrg)}),"명"
									),									
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										let parameters = $.extend(true,{},_this.parameters);
										parameters.surv_year_list = $administStatsMap.ui.year;
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;										
										parameters.ov_l2_list = chartData[i].order;
										parameters.ov_l4_list = "EF10,"+chartData[i].item_cd;
										
										$administStatsMap.ui.tooltipMap.title=chartData[i].itm_nm;										
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											let alldatas = opt_fnCalc({data:res,trgtId:"OV_L4_ID",except:"EF10"});												
											alldatas.forEach((d,index)=>{
												d.adm_cd = d.OV_L1_ID;
												d.region_nm = d.OV_L1_KOR;
											});		
											
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "DTVAL_CO",
												unit : "%",
												callback:function(data){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년'}),
																$("<h3/>").append("중·장년층 등록취업자 종사상 지위별 비중",$("<span/>")),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
														},
														endCallback:function(){
															$("#tooltip-map-tooltip").empty().append(
																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																	$("<h3/>",{"class":"modal__tit","text":chartData[i].itm_nm}),
																	$("<a/>",{"class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-tooltip').hide(); 
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																),
																$("<div/>",{"class":"modal__body"}).append(
																	$("<p/>").append(
																		$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																	),
																	$("<p/>").append(
																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(chartData[i].dt)}),"%"
																	)
																)
															);
															$("#tooltip-map-tooltip").show();
														}
													});
												}
											},alldatas,parameters);
										});
									})
								)
							);
							tooltip.show();
						}
					});
				}
				common_loading(false);
			});
		},
		chart2: function(){
			
			$("#chart2-2").empty();
			const _this = this;
			let admCd,columns=[],groupKey,title;
			if(_this.tabIndex==0){
				admCd = $administStatsMap.consts.sidoAll;
				groupKey = "TBL_ID";
				columnNames = ["중장년층"];
				columns = ["DT_1MA0001"];
				title = "년 지역별 중·장년층 등록취업 비중";
				this.parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
				this.parameters.ov_l3_list = "A10";
				this.parameters.ov_l4_list = "NJ10,NJ11";			
			}else if(_this.tabIndex==1){
				admCd = $administStatsMap.consts.sidoAll;
				this.parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
				groupKey = "OV_L4_ID";
				columnNames = ["임금근로","비임금근로", "임금+비임금근로"];
				columns = ["EF11","EF12","EF13"];
				title = "년 지역별 중·장년층 등록취업자 종사상 지위별 비중";
				$("#chart2-2-avg-text").hide();
			}
			
			$administStatsMap.utils.getTotsurvStatData(
				$.extend(true,{},this.parameters),function(data){					

					let chartData = [];
					let total = 0;
					data = data.sort(function (a, b) {
						return parseFloat(b.DTVAL_CO)-parseFloat(a.DTVAL_CO);
					});
					if(_this.tabIndex==0){
						$("#chart2-2-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);
						$("#chart2-2-legend").hide();
						let datas = [];
						for (let i = 0; i < data.length; i++) {
							let s = data[i];
							s.DTVAL_CO = s.DTVAL_CO * 1;
							for (let j = 0; j < data.length; j++) {
								let t = data[j];
								t.DTVAL_CO = t.DTVAL_CO * 1;
								if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
									if (s.OV_L4_ID != "NJ10" && t.OV_L4_ID == "NJ10") {
										s.DTVAL_CO = s.DTVAL_CO / t.DTVAL_CO * 100;
										datas.push(s);
									}
								}
							}
						}
						
						datas.forEach(item=>{																		
							if(item.OV_L1_ID != "00") {
								const value = parseFloat(item.DTVAL_CO);
								chartData.push({
									itm_nm:$administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR),
									dt:value.toFixed(1)
								});
								total+=value;
							}
						});
											
						const avg = total/chartData.length-1;
						
						chartData = chartData.sort(function(a, b) { 
							  return a.dt < b.dt ? -1 : a.dt > b.dt ? 1 : 0;
						});
						let max = 0;
						let colors = chartData.map((d,index)=>{
							max = Math.max(max,parseFloat(d.dt));							
							return "#747474";
						});
						colors[chartData.findIndex(x => parseFloat(x.dt) === max)] = "#ff5252";
						
//						$("#chart2-2-avg-text").empty().append(
//							$("<p/>").append(
//								$("<span/>",{"text":"평균"}),
//								avg.toFixed(1)+"%"
//							)
//						);	
						
						createVerticalBarChart({
							rotate:false,
							target:"chart2-2",
							data:chartData,
							dataVal:"dt",
							columnVal:"itm_nm",
							color:colors,
							isShowYaxis:false,
							unit:"%",
							tooltipCallback:function(d,i){
								const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
								tooltip.empty();
								tooltip.append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
										$("<h3/>",{"class":"modal__tit","text":"등록취업 비중"}),
										$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
											$(this).parents('[data-type=tooltip]').hide();
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									),
									$("<div/>",{"class":"modal__body"}).append(
										$("<p/>").append(
											$("<span/>",{"class":"color-blue","text":chartData[i].itm_nm})
										),
										$("<p/>").append(
											$("<span/>",{"class":"color-red","text":chartData[i].dt}),"%"
										),
										$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
											$administStatsMap.ui.tooltipMap.mapTotalVal=null;
											let parameters = $.extend(true,{},_this.parameters);
											parameters.tbl_id_list = data[i].TBL_ID;
											parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
											parameters.surv_year_list = $administStatsMap.ui.year;
											parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
											$administStatsMap.ui.tooltipMap.title="";
											$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {												
												let alldatas = opt_fnCalc({data:res,trgtId:"OV_L4_ID",except:"NJ10"});												
												alldatas.forEach((d,index)=>{
													d.adm_cd = d.OV_L1_ID;
													d.region_nm = d.OV_L1_KOR;
												});													
												$administStatsMap.ui.map["tooltip-map"].setStatsData({
													adm_cd: "00",
													admCdKey:"adm_cd",
													showData : "DTVAL_CO",
													unit : "%",
													callback:function(data){											
														$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);			
//														$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
														$administStatsMap.ui.tooltipMap.show({
															tooltipCallback:function(){
																$("#tooltip-map-modal-title").empty().append(
																	$("<h3>",{"text":$administStatsMap.ui.year+'년'}),
																	$("<h3/>").append("중·장년층 등록취업 비중"),
																	$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-container').hide();
																		$('.dim').hide();
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																);
															},
															endCallback:function(){
																$("#tooltip-map-tooltip").empty().append(
																	$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																		$("<h3/>",{"class":"modal__tit","text":"등록취업 비중"}),
																		$("<a/>",{"class":"btn__cancel"}).click(function(){
																			$('#tooltip-map-tooltip').hide(); 
																			return false;
																		}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																	),
																	$("<div/>",{"class":"modal__body"}).append(
																		$("<p/>").append(
																			$("<span/>",{"class":"color-blue","text":chartData[i].itm_nm})
																		),
																		$("<p/>").append(
																			$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(chartData[i].dt)}),"%"
																		)
																	)
																);
																$("#tooltip-map-tooltip").show();
															}
														});
													}
												},alldatas,parameters);
											});
										})
									)
								);
								tooltip.show();
							}
						});
					} else if(_this.tabIndex==1) {
						$("#chart2-2-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);
						$("#chart2-2-legend").show();
						
						let innerParam = {
								tbl_id_list : "DT_1MA0002",
								surv_year_list : $administStatsMap.ui.year,
								org_id_list : "101",							
								list_var_ord_list : "",
								char_itm_id_list : "T001",
								prt_type : "",
								adm_cd : "",
								ov_l1_list : $administStatsMap.consts.sidoAll,
								ov_l2_list : "0",
								ov_l3_list : "A10",
								ov_l4_list: "NJ10,NJ11",
								ov_l5_list: "",
								category : "",
								odr_col_list : "",
								odr_type : ""
							};
							let totDatas = [];
							
							$administStatsMap.utils.getTotsurvStatData(innerParam, function(res, param) {
								
								for (let i = 0; i < res.length; i++) {
									let s = res[i];
									s.DTVAL_CO = s.DTVAL_CO * 1;
									for (let j = 0; j < res.length; j++) {
										let t = res[j];
										t.DTVAL_CO = t.DTVAL_CO * 1;
										if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
											if (s.OV_L4_ID != "NJ10" && t.OV_L4_ID == "NJ10") {
												s.DTVAL_CO = (s.DTVAL_CO / t.DTVAL_CO * 100).toFixed(1);
												totDatas.push(s);
											}
										}
									}
								}					
							});
						
						data = opt_fnCalc({data:data,trgtId:"OV_L4_ID",except:"EF10"});
						
						let datas = [];						
						let total = 0;
						data.forEach(item=>{									
							if(columns.indexOf(item.OV_L4_ID)>-1){								
								datas[item.OV_L1_ID] = datas[item.OV_L1_ID]||{};
								datas[item.OV_L1_ID][item[groupKey]] = parseFloat(item.DTVAL_CO);								
								datas[item.OV_L1_ID].total = datas[item.OV_L1_ID].total||0;
								datas[item.OV_L1_ID].total+=datas[item.OV_L1_ID][item.OV_L4_ID];
								datas[item.OV_L1_ID].category = $administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR);
								datas[item.OV_L1_ID].admCd = item.OV_L1_ID;
								if(item.OV_L1_ID!="00"&&item.OV_L1_ID!="000"){
									total+=datas[item.OV_L1_ID][item.OV_L4_ID];
								}
							}					
						});		
						
						totDatas.forEach(item=>{
							datas[item.OV_L1_ID].DTVAL_CO = item.DTVAL_CO;
						})
						
						datas = Object.keys(datas).filter(key=>key!="00"&&key!="00").map(key=>datas[key]).sort(function (a, b) {
							return b.DTVAL_CO-a.DTVAL_CO;
						});
						
						const categories = datas.map(item=>item.category);						
//						const avg = total/datas.length;
//						$("#chart2-2-avg-text").empty().append(
//							$("<p/>").append(
//								$("<span/>",{"text":"평균"}),
//								$.heum.setThousandSeparator(parseInt(avg))+"명"
//							)
//						);
						createStackBarChartForPer({ 
							unit:"%",
							target:"chart2-2",
							data:datas,
							columns:columns,
							colors:["#255363","#8DB4C1","#1287A9"],
							category:categories,
							viewTotalColumn:function(data){								
								let schData = totDatas.filter(item=>item.OV_L1_ID == data.admCd);	
								return schData[0].DTVAL_CO;
							},
							tooltipCallback:function(d,i){						
							const dataIndex = $(this).parent("[data-type=eventGroup]").data("value");
							const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":columnNames[dataIndex]}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":categories[i]})
									),
									$("<p/>").append(
											$("<span/>",{"class":"color-red","text": $.heum.setThousandSeparator(datas[i][columns[dataIndex]])}),"%"											
									),
									/*"(<span class='color-red'>"+((datas[i][columns[dataIndex]]/datas[i].total)*100).toFixed(1)+"</span>%)",*/
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										$administStatsMap.ui.tooltipMap.mapTotalVal=null;
										let parameters = $.extend(true,{},_this.parameters);
										parameters.tbl_id_list = data[i].TBL_ID;
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
										parameters.ov_l4_list = columns[dataIndex];
										parameters.surv_year_list = $administStatsMap.ui.year;
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
										$administStatsMap.ui.tooltipMap.title = columnNames[dataIndex];
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {											
											datas.forEach(item=>{
												res.forEach(sel=>{
													if(sel.OV_L1_ID == item.admCd) {														
														sel.DTVAL_CO = item[columns[dataIndex]]; 
													}
												})
											})											
											let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});											
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : "%",
												callback:function(data){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년'}),
																$("<h3/>").append(
																	'지역별 중·장년층 등록취업자 종사상 지위별 비중'
																),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
														},
														endCallback:function(){
															$administStatsMap.ui.map["tooltip-map"].dataBoundary.eachLayer(function(layer){
																if(layer.feature.properties.adm_cd==datas[i].admCd){
																	layer.fire("click");
																}
															})
														}
													});
													$("#tooltip-map-tooltip").show();
												}
											},resultMapData.result.mapData,parameters);
										});
									})
								)
							);
							tooltip.show();
						}});
						
					}
				}
			);
		},
		chart3:function(){
			
			$("#chart2-3").empty();
			const _this = this;
			let admCd,columns=[],groupKey,title;
			if(_this.tabIndex==0){
				admCd = $administStatsMap.consts.sidoAll;
				groupKey = "TBL_ID";
				columnNames = ["중장년층"];
				columns = ["DT_1MA0001"];
				title = "연도별 중·장년층 등록취업 비중";
				this.parameters.ov_l1_list = $administStatsMap.ui.admCd;
				this.parameters.ov_l3_list = "A10";
				this.parameters.ov_l4_list = "NJ10,NJ11";
				this.parameters.surv_year_list = $administStatsMap.ui.yearList.join(",");
			} else if(_this.tabIndex==1) {
				admCd = $administStatsMap.consts.sidoAll3;
				groupKey = "OV_L2_ID";
				columns = ["20","10"];
				title = "연도별 중·장년층 등록취업자 종사상 지위별 비중";
				series=[{"code":"EF11","name":"임금근로",data:[]},{"code":"EF12","name":"비임금근로",data:[]},{"code":"EF13","name":"임금+비임금근로",data:[]}]
				this.parameters.surv_year_list = $administStatsMap.ui.yearList.join(",");
				this.parameters.ov_l1_list = $administStatsMap.ui.admCd;
			}
			$("#chart2-3-title").data("append-text",title).empty().append(title);
			if(_this.tabIndex==0){
				
				$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data){
					
					let datas = [];
					for (let i = 0; i < data.length; i++) {
						let s = data[i];
						s.DTVAL_CO = s.DTVAL_CO * 1;
						for (let j = 0; j < data.length; j++) {
							let t = data[j];
							t.DTVAL_CO = t.DTVAL_CO * 1;
							if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
								if (s.OV_L4_ID != "NJ10" && t.OV_L4_ID == "NJ10") {
									s.DTVAL_CO = (s.DTVAL_CO / t.DTVAL_CO * 100).toFixed(1);
									datas.push(s);
								}
							}
						}
					}
					
					createLineChart({target:"chart2-3", data:datas, color:"#7419B1", dataVal:"DTVAL_CO", columnVal:"PRD_DE",unit:"%",tooltipCallback:function(d,i){
						const beforeDataObj = datas[i-1];
						let ratio;
						if(beforeDataObj){
							const beforeData = beforeDataObj.DTVAL_CO;
							let ratColor;
							let ca = "";
							let rat = d.DTVAL_CO - beforeData;
							if(rat>0){
								ca = "증가↑";
								ratColor="red";
							}else if(rat<0){
								ca = "감소↓";
								ratColor="blue";
							}
							ratio = "(전년 대비 <span class='color-"+ratColor+"'>"+Math.abs(rat).toFixed(1)+"</span>%p "+ca+")";
						}
						const tooltip = $("#chart2-3-container").find("[data-type=tooltip]");
						tooltip.empty();
						tooltip.append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								$("<h3/>",{"class":"modal__tit","text":datas[i].PRD_DE+'년 '+"등록취업 비중"}),
								$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
									$(this).parents('[data-type=tooltip]').hide();
									return false;
								}).append($("<span/>",{"class":"btn-close btn-close--black"}))
							),
							$("<div/>",{"class":"modal__body"}).append(
								$("<p/>").append(
									$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
								),
								$("<p/>").append(
									$("<span/>",{"class":"color-red","text":d.DTVAL_CO}),"%"
								),
								ratio,
								$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
									$administStatsMap.ui.tooltipMap.mapTotalVal=null;
									let parameters = $.extend(true,{},_this.parameters);
									parameters.tbl_id_list = data[i].TBL_ID;
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
									parameters.surv_year_list = parseInt(data[i].PRD_DE.replace("년",""));
									parameters.regn_dataKey = $administStatsMap.ui.themeData.middl.mapData.getDataParameters().regn_dataKey;
									$administStatsMap.ui.tooltipMap.title="등록취업 비중";
									$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
										let alldatas = opt_fnCalc({data:res,trgtId:"OV_L4_ID",except:"NJ10"});												
										alldatas.forEach((d,index)=>{
											d.adm_cd = d.OV_L1_ID;
											d.region_nm = d.OV_L1_KOR;
										});	
										
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "DTVAL_CO",
											unit : "%",
											callback:function(d){
												$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//												$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														$("#tooltip-map-modal-title").empty().append(
															$("<h3>",{"text":datas[i].PRD_DE+"년"}),
															$("<h3/>").append("연도별 중·장년층 등록취업 비중"),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
													},
													endCallback:function(){
														$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt(datas[i].PRD_DE.replace("년",""));
														$("#tooltip-map-tooltip").empty().append(
															$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.tooltipMap.title}),
																$("<a/>",{"class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-tooltip').hide(); 
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															),
															$("<div/>",{"class":"modal__body"}).append(
																$("<p/>").append(
																	$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																),
																$("<p/>").append(
																	$("<span/>",{"class":"color-red","data-id":"value","text":datas[i].DTVAL_CO}),"%"
																)
															)
														);
														$("#tooltip-map-tooltip").show();
													}
												});
											}
										},alldatas,parameters);
									});
								})
							)
						).show();
						}});
						}
					);
				
				
				
			} else if(_this.tabIndex==1) {
				
				$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data){
					
				let categories = $.extend(true,[],$administStatsMap.ui.yearList).sort().map(year=>year+"년");

				let datas = [];
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					s.DTVAL_CO = s.DTVAL_CO * 1;
					for (let j = 0; j < data.length; j++) {
						let t = data[j];
						t.DTVAL_CO = t.DTVAL_CO * 1;
						if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
							if (s.OV_L4_ID != "EF10" && t.OV_L4_ID == "EF10") {
								s.DTVAL_CO = (s.DTVAL_CO / t.DTVAL_CO * 100).toFixed(1);
								datas.push(s);
							}
						}
					}
				}
				
				datas.forEach(function(d){					
					if(d.OV_L4_ID == "EF11") {
						series[0].data.push(parseFloat(d.DTVAL_CO));
					} else if(d.OV_L4_ID == "EF12") {
						series[1].data.push(parseFloat(d.DTVAL_CO));
					} else if(d.OV_L4_ID == "EF13") {
						series[2].data.push(parseFloat(d.DTVAL_CO));
					}
				});
				console.log(series)
				console.log(categories)
				createMultiLineChart({
					target:"chart2-3",
					colors:["#255363","#8DB4C1","#1287A9"],
					categories,
					series,					
					dataLabelsFormater:function(){
						if(this.point.index==series[this.colorIndex].data.length-1){
							return $.heum.setThousandSeparator(this.y)+"%";
						}
					},
					tooltipCallback:function({name,data,event}){
						const beforeData = series[event.point.colorIndex].data[event.point.index-1];							
						let ratio;
						if(beforeData){
							let rat = data - beforeData;
							let ca = "";
							let ratColor;
							if(rat>0){
								ca = "증가↑";
								ratColor="blue";
							}else if(rat<0){
								ca = "감소↓";
								ratColor="red";
							}
							ratio = "(전년 대비 <span class='color-"+ratColor+"'>"+Math.abs((rat).toFixed(1))+"</span>%p "+ca+")";
						}
						const tooltip = $("#chart2-3-container").find("[data-type=tooltip]:last");
						tooltip.empty();
						tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":name+" "+series[event.point.colorIndex].name}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(data)}),"%"
									),
									ratio,
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										let parameters = $.extend(true,{},_this.parameters);										
										parameters.surv_year_list = parseInt(categories[event.point.index].replace("년",""));
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
										parameters.ov_l4_list = "EF10,"+series[event.point.colorIndex].code;
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
										$administStatsMap.ui.tooltipMap.title="";
										
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											let alldatas = opt_fnCalc({data:res,trgtId:"OV_L4_ID",except:"EF10"});
											alldatas.forEach((d,index)=>{
												d.adm_cd = d.OV_L1_ID;
												d.region_nm = d.OV_L1_KOR;
											});												
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "DTVAL_CO",
												unit : "%",
												callback:function(d){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$administStatsMap.ui.tooltipMap.title = series[event.point.colorIndex].name;
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":categories[event.point.index]}),
																$("<h3/>").append(
																	title
																),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
															$("#tooltip-map-tooltip").empty().append(
																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																	$("<h3/>",{"class":"modal__tit","text":series[event.point.colorIndex].name}),
																	$("<a/>",{"class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-tooltip').hide(); 
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																),
																$("<div/>",{"class":"modal__body"}).append(
																	$("<p/>").append(
																		$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																	),
																	$("<p/>").append(
																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(data)}),"%"
																	)
																)
															);
														},
														endCallback:function(){
															$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt(categories[event.point.index].replace("년",""));
															$("#tooltip-map-tooltip").show();
														}
													});
												}
											},alldatas,parameters);
										});
									})
								)
							);
						tooltip.show();
					}
				});
			});
			}
		},
	},
	main3 : {
		tabIndex:null,
		tbl_id:null,
		parameters : null,
		common: function(){
			$("[data-type=chart-container]").find("[data-type=tooltip]").hide();
			this.tabIndex = $("#main3-sub-tab li").index($("#main3-sub-tab li.on"));
			if(this.tabIndex==0){
				this.tbl_id = "DT_1MA0026";
				this.parameters = {
					surv_year_list : $administStatsMap.ui.year,
					org_id_list : "101",
					tbl_id_list : this.tbl_id,
					list_var_ord_list : "",
					char_itm_id_list : "T001",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : $administStatsMap.ui.admCd,
					ov_l2_list : "A10",
					ov_l3_list : "IL00,IL10",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
				};
			}else if(this.tabIndex==1){
				this.tbl_id = "DT_1MA0026";
				this.parameters = {
					surv_year_list : $administStatsMap.ui.year,
					org_id_list : "101",
					tbl_id_list : this.tbl_id,
					list_var_ord_list : "",
					char_itm_id_list : "T001",
					prt_type : "",
					adm_cd : "",
					ov_l1_list :  $administStatsMap.ui.admCd,
					ov_l2_list : "A10",
					ov_l3_list : "IL10,IL11,IL12,IL13,IL14,IL15,IL16",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
				};
			}else{
				return;
			}
			this.chart1();
			this.chart2();
			this.chart3();
		},
		chart1 : function(){
			$("#chart3-1").empty();
			let colors, title;
			common_loading(true);
			let itm_nm;
			$("#chart3-1-legend").hide();
			if(this.tabIndex==0){
				title = "년 중·장년층 소득 보유 비중";
				colors = ["#7CB5EC", "#434348"];
				itm_nm = "CHAR_ITM_NM";				
			}else if(this.tabIndex==1){
				title = "중·장년층 소득구간별 비중";
				colors = ["#a0a0a0", "#7CB5EC","#e2658f"];
				itm_nm = "OV_L2_UP_ITM_KOR";				
			}
			
			const _this = this;
			$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data, param) {
				
				let chartData = [];
				
				if(_this.tabIndex==0){
					$("#chart3-1-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);
					$("#chart3-1-legend").show();
					var total = data.find(x => x.OV_L3_ID === 'IL00').DTVAL_CO;
					var dataAll = data.find(x => x.OV_L3_ID === 'IL00');
					var dataRg = data.find(x => x.OV_L3_ID === 'IL10');
					
					chartData.push({
						itm_nm:dataRg.OV_L3_KOR,
						dt:parseFloat(dataRg.DTVAL_CO).toFixed(1)					
					});
					
					chartData.push({
						itm_nm:"",
						dt:parseFloat(dataAll.DTVAL_CO-dataRg.DTVAL_CO).toFixed(1)
					});
									
					
					createDonutChart({isDisabledLegendClick:false,isShowLegend:false,data:chartData,height:"260px",target:"chart3-1",colorData:colors,unit:"천명",sumText:"중·장년층 전체",tooltipCallback:function(d,i){
						if(i == 1){
							return;
						}						
						const tooltip = $(this).parents("[data-type=chart3-1-container]").find("[data-type=tooltip]");
						tooltip.empty();
						tooltip.append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								$("<h3/>",{"class":"modal__tit","text":chartData[i].itm_nm}),
								$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
									$(this).parents('[data-type=tooltip]').hide();
									return false;
								}).append($("<span/>",{"class":"btn-close btn-close--black"}))
							),
							$("<div/>",{"class":"modal__body"}).append(
								$("<p/>").append(
									$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
								),
								$("<p/>").append(
									$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(d.value)}),"천명"
								),
								$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
									//$administStatsMap.ui.tooltipMap.mapTotalVal = chartData[i].dt;
									$administStatsMap.ui.tooltipMap.mapTotalVal = 0;
									$administStatsMap.ui.tooltipMap.title = "소득보유 비중";
									let parameters = $.extend(true,{},_this.parameters);
									parameters.tbl_id_list = data[i].TBL_ID;
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
									parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
									//$administStatsMap.ui.tooltipMap.title = chartData[i].itm_nm;
									$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
										let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
										
										let allData = [];
										for(let j =0 ; j<res.length; j++){
											if(res[j].OV_L3_ID == "IL00" && res[j].OV_L2_ID == "A10" && res[j].PRD_DE == $administStatsMap.ui.year){
												allData.push(res[j]);
											}
										}
										
										for(let j =0 ; j<resultMapData.result.mapData.length; j++){
											for(let n=1;n< allData.length;n++){
												if(allData[n].OV_L1_ID == resultMapData.result.mapData[j].adm_cd){
													resultMapData.result.mapData[j].dt = (resultMapData.result.mapData[j].dt/ allData[n].DTVAL_CO *100).toFixed(1);
												}
											}
										}
										
										const themeInfo = $administStatsMap.ui.themeData[$administStatsMap.ui.theme];
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											//adm_cd: $administStatsMap.ui.admCd,
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "dt",
											unit : "%",
											callback:function(data){
//												if($administStatsMap.ui.admCd=="00"){
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
//												}else{
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//												}
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														$("#tooltip-map-modal-title").empty().append(
															$("<h3>",{"text":$administStatsMap.ui.year+'년'}),
															$("<h3/>").append(
																'중·장년층 소득 보유 비중'
															),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
														$("#tooltip-map-tooltip").empty().append(
															$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																$("<h3/>",{"class":"modal__tit","text":"소득 보유 비중"}),
																$("<a/>",{"class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-tooltip').hide(); 
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															),
															$("<div/>",{"class":"modal__body"}).append(
																$("<p/>").append(
																	$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																),
																$("<p/>").append(
																	$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(d.value/d.value*100)}),"%"
																)
															)
														);
													},
													didSelectedPolygon : function(callback){
														$("#tooltip-map-tooltip [data-id=region-name]").text($administStatsMap.ui.selectedAdmNm);
														$("#tooltip-map-tooltip .modal__tit").text($administStatsMap.ui.year+"년 "+$administStatsMap.ui.selectedAdmNm);										
														$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.businessChart[i].dt));
														if(typeof callback==="function"){
															callback();
														}
													}
												});
												$("#tooltip-map-tooltip").show();
											}
										},resultMapData.result.mapData,parameters);
									});
								})
							)
						).show();
					}});
					//$('.highcharts-data-label-color-1').css('opacity', 0);
					//$('.highcharts-color-1').css('stroke-width', 0);
					
				}else {					
					$("#chart3-1-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);
					$("#chart3-1-legend").hide();
					data = data.sort(function (a, b) {
						return parseFloat(a.OV_L3_SN)-parseFloat(b.OV_L3_SN);
					});
					let datas = [];
					for (let i = 0; i < data.length; i++) {
						let s = data[i];
						s.DTVAL_CO = s.DTVAL_CO * 1;
						for (let j = 0; j < data.length; j++) {
							let t = data[j];
							t.DTVAL_CO = t.DTVAL_CO * 1;
							if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
								if (s.OV_L3_ID != "IL10" && t.OV_L3_ID == "IL10") {
									s.DTVAL_CO_PER = (s.DTVAL_CO / t.DTVAL_CO * 100).toFixed(1);
									datas.push(s);
								}
							}
						}
					}
					
					let total = 0;					
					datas.forEach(item=>{
						const value = item.DTVAL_CO_PER;
						chartData.push({
							itm_nm:item.OV_L3_KOR.replace("-", "~"),
							dt:value,
							cnt:item.DTVAL_CO.toFixed(1),
							adm_cd:item.OV_L1_ID.substring(1,3),
							order:item.OV_L3_SN,							
							item_cd:item.OV_L3_ID
						});
					});
					
					chartData = chartData.sort(function(a, b) { 
						  return a.order > b.order ? -1 : a.order < b.order ? 1 : 0;
					});
//					let viewData = chartData.slice(0,3);
//					viewData = viewData.concat(chartData.slice(chartData.length-3,chartData.length));

					createHorizontalBarChart({
						unit:'%',
						rotate:false,
						target:"chart3-1",
						data:chartData,
						dataVal:"dt",
						columnVal:"itm_nm",												
						color:["#255363","#255363","#225B82", "#6688A0","#A9B4BC","#7F7F7F"],
						isShowYaxis:false,
						tooltipCallback:function(d,i){
							const tooltip = $(this).parents("[data-type=chart3-1-container]").find("[data-type=tooltip]");
							$administStatsMap.ui.tooltipMap.title =
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":chartData[i].itm_nm}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":chartData[i].cnt}),"천명"
									),																	
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										let parameters = $.extend(true,{},_this.parameters);
										parameters.tbl_id_list = data[i].TBL_ID;
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
										parameters.surv_year_list = $administStatsMap.ui.year;
										parameters.ov_l3_list = 'IL10,'+chartData[i].item_cd;
										
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
										$administStatsMap.ui.tooltipMap.title = chartData[i].itm_nm;
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											let alldatas = opt_fnCalc({data:res,trgtId:"OV_L3_ID",except:"IL10"});											
											alldatas.forEach((d,index)=>{
												d.adm_cd = d.OV_L1_ID;
												d.region_nm = d.OV_L1_KOR;
											})										
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "DTVAL_CO",
												unit : "%",
												callback:function(data){											
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);			
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년 '}),
																$("<h3/>").append(title),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
														},
														endCallback:function(){
															$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt(datas[i].PRD_DE.replace("년",""));
															$("#tooltip-map-tooltip").empty().append(
																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																	$("<h3/>",{"class":"modal__tit","text":chartData[i].itm_nm}),
																	$("<a/>",{"class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-tooltip').hide(); 
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																),
																$("<div/>",{"class":"modal__body"}).append(
																	$("<p/>").append(
																		$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																	),
																	$("<p/>").append(
																		$("<span/>",{"class":"color-red","data-id":"value","text":chartData[i].dt}),"%"
																	)
																)
															);
															$("#tooltip-map-tooltip").show();
														}
													});
												}
											},alldatas,parameters);
										});
									})
								)
							);
							tooltip.show();
						}
					});
				}
				common_loading(false);
			});
		},
		chart2: function(){
			
			$("#chart3-2").empty();
			const _this = this;
			let admCd,columns=[],groupKey,title;
			if(_this.tabIndex==0){
				admCd = $administStatsMap.consts.sidoAll;
				groupKey = "TBL_ID";
				columnNames = ["중장년층"];
				columns = ["DT_1MA0001"];
				title = "년 지역별 중·장년층 소득 보유 비중";
				this.parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
				this.parameters.ov_l3_list = "IL00,IL10";
//				this.parameters.ov_l4_list = "NJ10,NJ11";				
			}else if(_this.tabIndex==1){
				admCd = $administStatsMap.consts.sidoAll;
				groupKey = "OV_L3_ID";
				columnNames = ["1천만원 미만","1~3천만원 미만","3~5천만원 미만","5~7천만원 미만","7천만원 1억원 미만","1억원 이상"];
				columns = ["IL11","IL12","IL13","IL14","IL15","IL16"];
				title = "년 지역별 중·장년층 소득구간별 비중";
				this.parameters.ov_l1_list = $administStatsMap.consts.sidoAll;				
			}
			
			$administStatsMap.utils.getTotsurvStatData(
				$.extend(true,{},this.parameters),function(data){
										
					
					
					let chartData = [];
					let total = 0;	
					if(_this.tabIndex==0){
						$("#chart3-2-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);
//						$("#chart3-2-legend .legend-label:first").text(columnNames[0]);
						$("#chart3-2-legend").hide();
						let datas = [];
						for (let i = 0; i < data.length; i++) {
							let s = data[i];
							s.DTVAL_CO = s.DTVAL_CO * 1;
							for (let j = 0; j < data.length; j++) {
								let t = data[j];
								t.DTVAL_CO = t.DTVAL_CO * 1;
								if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
									if (s.OV_L3_ID != "IL00" && t.OV_L3_ID == "IL00") {
										s.DTVAL_CO_ORI = s.DTVAL_CO;
										s.DTVAL_CO = s.DTVAL_CO / t.DTVAL_CO * 100;
										datas.push(s);
									}
								}
							}
						}
						
						datas.forEach(item=>{																		
							if(item.OV_L1_ID != "00") {
								const value = parseFloat(item.DTVAL_CO);	
								const amt = parseFloat(item.DTVAL_CO_ORI);
								chartData.push({
									itm_nm:$administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR),
									dt:value.toFixed(1),
									amt:amt.toFixed(1)
								});
								total+=value;
							}
						});
											
						const avg = total/chartData.length-1;
						
						chartData = chartData.sort(function(a, b) { 
							  return a.dt < b.dt ? -1 : a.dt > b.dt ? 1 : 0;
						});
						
						let max = 0;
						let colors = chartData.map((d,index)=>{
							max = Math.max(max,parseFloat(d.dt));							
							return "#747474";
						});
						colors[chartData.findIndex(x => parseFloat(x.dt) === max)] = "#ff5252";

//						$("#chart3-2-avg-text").empty().append(
//							$("<p/>").append(
//								$("<span/>",{"text":"평균"}),
//								avg.toFixed(1)+"%"
//							)
//						);	
						
						createVerticalBarChart({
							rotate:false,
							target:"chart3-2",
							data:chartData,
							dataVal:"dt",
							columnVal:"itm_nm",
							color:colors,
							isShowYaxis:false,
							unit:"%",
							tooltipCallback:function(d,i){
								const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
								tooltip.empty();
								tooltip.append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
										$("<h3/>",{"class":"modal__tit","text":"소득 보유 비중"}),
										$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
											$(this).parents('[data-type=tooltip]').hide();
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									),
									$("<div/>",{"class":"modal__body"}).append(
										$("<p/>").append(
											$("<span/>",{"class":"color-blue","text":chartData[i].itm_nm})
										),
										$("<p/>").append(
											$("<span/>",{"class":"color-red","text":chartData[i].dt}),"%"
										),
										$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										$administStatsMap.ui.tooltipMap.mapTotalVal=null;
										let parameters = $.extend(true,{},_this.parameters);
										parameters.tbl_id_list = data[i].TBL_ID;
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
										parameters.surv_year_list = $administStatsMap.ui.year;
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
										$administStatsMap.ui.tooltipMap.title="소득 보유 비중";										
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {											
											let alldatas = opt_fnCalc({data:res,trgtId:"OV_L3_ID",except:"IL00"});											
											alldatas.forEach((d,index)=>{
												d.adm_cd = d.OV_L1_ID;
												d.region_nm = d.OV_L1_KOR;
											})
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "DTVAL_CO",
												unit : "%",
												callback:function(data){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년'}),
																$("<h3/>").append("지역별 중·장년층 소득 보유 비중"),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
														},
														endCallback:function(){
															$("#tooltip-map-tooltip").empty().append(
																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																	$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.tooltipMap.title}),
																	$("<a/>",{"class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-tooltip').hide(); 
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																),
																$("<div/>",{"class":"modal__body"}).append(
																	$("<p/>").append(
																		$("<span/>",{"class":"color-blue","text":chartData[i].itm_nm})
																	),
																	$("<p/>").append(
																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(chartData[i].dt)}),"%"
																	)
																)
															);
															$("#tooltip-map-tooltip").show();
														}
													});
												}
											},alldatas,parameters);
										});
									})
									)
								);
								tooltip.show();
							}
						});
					} else if(_this.tabIndex==1) {
						$("#chart3-2-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);						
						$("#chart3-2-legend").show();
						
						let innerParam = {
								tbl_id_list : "DT_1MA0026",
								surv_year_list : $administStatsMap.ui.year,
								org_id_list : "101",							
								list_var_ord_list : "",
								char_itm_id_list : "T001",
								prt_type : "",
								adm_cd : "",
								ov_l1_list : $administStatsMap.consts.sidoAll,
								ov_l2_list : "A10",
								ov_l3_list : "IL00,IL10",
								ov_l4_list: "",
								ov_l5_list: "",
								category : "",
								odr_col_list : "",
								odr_type : ""
							};
							let totDatas = [];
							
							$administStatsMap.utils.getTotsurvStatData(innerParam, function(res, param) {
								for (let i = 0; i < res.length; i++) {
									let s = JSON.parse(JSON.stringify(res[i]));
									s.DTVAL_CO = s.DTVAL_CO * 1;
									for (let j = 0; j < res.length; j++) {
										let t = JSON.parse(JSON.stringify(res[j]));
										t.DTVAL_CO = t.DTVAL_CO * 1;
										if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
											if (s.OV_L3_ID != "IL00" && t.OV_L3_ID == "IL00") {
												s.DTVAL_CO_ORI = s.DTVAL_CO;
												s.DTVAL_CO = (s.DTVAL_CO / t.DTVAL_CO * 100).toFixed(1);
												totDatas.push(s);
											}
										}
									}
								}							
							});
						
						data = opt_fnCalc({data:data,trgtId:"OV_L3_ID",except:"IL10"});
						let datas = [];						
						let total = 0;
						data.forEach(item=>{									
							if(columns.indexOf(item.OV_L3_ID)>-1){
								item.DTVAL_CO = parseFloat(item.DTVAL_CO).toFixed(1);
								datas[item.OV_L1_ID] = datas[item.OV_L1_ID]||{};
								datas[item.OV_L1_ID][item[groupKey]] = parseFloat(item.DTVAL_CO);								
								datas[item.OV_L1_ID].total = datas[item.OV_L1_ID].total||0;
								datas[item.OV_L1_ID].total+=datas[item.OV_L1_ID][item[groupKey]];
								datas[item.OV_L1_ID].category = $administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR);
								datas[item.OV_L1_ID].admCd = item.OV_L1_ID;
								if(item.OV_L1_ID!="00"&&item.OV_L1_ID!="000"){
									total+=datas[item.OV_L1_ID][item.OV_L3_ID];
								}
							}					
						});						
						
						datas.forEach(data=>{	
							let schData1 = totDatas.filter(item=>item.OV_L1_ID == data.admCd);
							data.per = schData1[0].DTVAL_CO;
						});
						
						datas = Object.keys(datas).filter(key=>key!="00"&&key!="00").map(key=>datas[key]).sort(function (a, b) {
							return b.per-a.per;
						});
						
						const categories = datas.map(item=>item.category);
						
//						const avg = (total/datas.length).toFixed(1);
//						$("#chart3-2-avg-text").empty().append(
//							$("<p/>").append(
//								$("<span/>",{"text":"평균"}),
//								$.heum.setThousandSeparator(parseInt(avg))+"천명"
//							)
//						);
						createStackBarChartForPer({ 
							unit:"%",
							target:"chart3-2",
							data:datas,
							columns:columns,
							colors:["#7F7F7F","#A9B4BC","#6688A0", "#447291","#225B82","#255363"],
							category:categories,
							viewTotalColumn:function(data){								
								let schData = totDatas.filter(item=>item.OV_L1_ID == data.admCd);	
								return schData[0].DTVAL_CO;
							},
							tooltipCallback:function(d,i){						
							const dataIndex = $(this).parent("[data-type=eventGroup]").data("value");
							const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":columnNames[dataIndex]}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":categories[i]})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(datas[i][columns[dataIndex]].toFixed(1))}),"%"
									),
//									"(<span class='color-red'>"+((datas[i][columns[dataIndex]]/datas[i].total)*100).toFixed(1)+"</span>%)",
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										$administStatsMap.ui.tooltipMap.mapTotalVal=null;
										let parameters = $.extend(true,{},_this.parameters);
										parameters.tbl_id_list = data[i].TBL_ID;
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
										parameters.ov_l3_list = columns[dataIndex];
										parameters.surv_year_list = $administStatsMap.ui.year;
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
										$administStatsMap.ui.tooltipMap.title = columnNames[dataIndex];
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											datas.forEach(item=>{
												res.forEach(sel=>{
													if(sel.OV_L1_ID == item.admCd) {
														sel.DTVAL_CO = item[columns[dataIndex]];
													}
												})
											})
											let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});											
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : "%",
												callback:function(data){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년'}),
																$("<h3/>").append(
																	'지역별 중·장년층 소득구간별 비중'
																),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
														},
														endCallback:function(){
															$administStatsMap.ui.map["tooltip-map"].dataBoundary.eachLayer(function(layer){
																if(layer.feature.properties.adm_cd==datas[i].admCd){
																	layer.fire("click");
																}
															})
														}
													});
													$("#tooltip-map-tooltip").show();
												}
											},resultMapData.result.mapData,parameters);
										});
									})
								)
							);
							tooltip.show();
						}});
					}
				}
			);
		},
		chart3:function(){
		
			$("#chart3-3").empty();
			const _this = this;
			let admCd,columns=[],groupKey,title;
			if(_this.tabIndex==0){
				admCd = $administStatsMap.consts.sidoAll;
				groupKey = "TBL_ID";
				columnNames = ["중장년층"];
				columns = ["DT_1MA0001"];
				title = "연도별 중·장년층 소득보유 비중";
				this.parameters.ov_l1_list = $administStatsMap.ui.admCd;
				this.parameters.ov_l3_list = "IL00,IL10";
				this.parameters.surv_year_list = $administStatsMap.ui.yearList.join(",");
			} else if(_this.tabIndex==1) {
				admCd = $administStatsMap.consts.sidoAll3;
				groupKey = "OV_L2_ID";
				columns = ["20","10"];
				title = "연도별 중·장년층 소득구간별 비중";
				series=[{"code":"IL11","name":"1천만원 미만",data:[]},{"code":"IL12","name":"1-3천만원 미만",data:[]},{"code":"IL13","name":"3-5천만원 미만",data:[]},{"code":"IL14","name":"5-7천만원 미만",data:[]},{"code":"IL15","name":"7천만원-1억원 미만",data:[]},{"code":"IL16","name":"1억원 이상",data:[]}]
				this.parameters.surv_year_list = $administStatsMap.ui.yearList.join(",");
				this.parameters.ov_l1_list = $administStatsMap.ui.admCd;
			}
			
			$("#chart3-3-title").data("append-text",title).empty().append(title);
			
			if(_this.tabIndex==0){
				
				$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data){
										
					let datas = [];
					for (let i = 0; i < data.length; i++) {
						let s = data[i];
						s.DTVAL_CO = s.DTVAL_CO * 1;
						for (let j = 0; j < data.length; j++) {
							let t = data[j];
							t.DTVAL_CO = t.DTVAL_CO * 1;
							if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
								if (s.OV_L3_ID != "IL00" && t.OV_L3_ID == "IL00") {
									s.DTVAL_CO = (s.DTVAL_CO / t.DTVAL_CO * 100).toFixed(1);
									datas.push(s);
								}
							}
						}
					}
					
					createLineChart({target:"chart3-3", data:datas, color:"#7419B1", dataVal:"DTVAL_CO", columnVal:"PRD_DE",unit:"%",tooltipCallback:function(d,i){
						const beforeDataObj = datas[i-1];
						let ratio;
						if(beforeDataObj){
							const beforeData = beforeDataObj.DTVAL_CO;
							let ratColor;
							let ca = "";
							let rat = d.DTVAL_CO - beforeData;
							if(rat>0){
								ca = "증가↑";
								ratColor="red";
							}else if(rat<0){
								ca = "감소↓";
								ratColor="blue";
							}
							ratio = "(전년 대비 <span class='color-"+ratColor+"'>"+Math.abs(rat).toFixed(1)+"</span>%p "+ca+")";
						}
						const tooltip = $("#chart3-3-container").find("[data-type=tooltip]");
						tooltip.empty();
						tooltip.append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								$("<h3/>",{"class":"modal__tit","text":datas[i].PRD_DE+'년 '+"소득보유 비중"}),
								$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
									$(this).parents('[data-type=tooltip]').hide();
									return false;
								}).append($("<span/>",{"class":"btn-close btn-close--black"}))
							),
							$("<div/>",{"class":"modal__body"}).append(
								$("<p/>").append(
									$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
								),
								$("<p/>").append(
									$("<span/>",{"class":"color-red","text":d.DTVAL_CO}),"%"
								),
								ratio,
								$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
									$administStatsMap.ui.tooltipMap.mapTotalVal=null;
									let parameters = $.extend(true,{},_this.parameters);
									parameters.tbl_id_list = data[i].TBL_ID;
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
									parameters.surv_year_list = parseInt(data[i].PRD_DE.replace("년",""));
									parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
									$administStatsMap.ui.tooltipMap.title="소득보유 비중";
									$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
										let alldatas = opt_fnCalc({data:res,trgtId:"OV_L3_ID",except:"IL00"});												
										alldatas.forEach((d,index)=>{
											d.adm_cd = d.OV_L1_ID;
											d.region_nm = d.OV_L1_KOR;
										});	
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "DTVAL_CO",
											unit : "%",
											callback:function(d){
												$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//												$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														$("#tooltip-map-modal-title").empty().append(
															$("<h3>",{"text":datas[i].PRD_DE+"년"}),
															$("<h3/>").append("연도별 중·장년층 소득보유 비중"),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
													},
													endCallback:function(){
														$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt(datas[i].PRD_DE.replace("년",""));
														$("#tooltip-map-tooltip").empty().append(
															$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.tooltipMap.title}),
																$("<a/>",{"class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-tooltip').hide(); 
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															),
															$("<div/>",{"class":"modal__body"}).append(
																$("<p/>").append(
																	$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																),
																$("<p/>").append(
																	$("<span/>",{"class":"color-red","data-id":"value","text":datas[i].DTVAL_CO}),"%"
																)
															)
														);
														$("#tooltip-map-tooltip").show();
													}
												});
											}
										},alldatas,parameters);
									});
								})
							)
						).show();
						}});
						}
					);
				
				
				
			} else if(_this.tabIndex==1) {
				
				$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data){
				
				let categories = $.extend(true,[],$administStatsMap.ui.yearList).sort().map(year=>year+"년");

				let datas = [];
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					s.DTVAL_CO = s.DTVAL_CO * 1;
					for (let j = 0; j < data.length; j++) {
						let t = data[j];
						t.DTVAL_CO = t.DTVAL_CO * 1;
						if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
							if (s.OV_L3_ID != "IL10" && t.OV_L3_ID == "IL10") {
								s.DTVAL_CO = (s.DTVAL_CO / t.DTVAL_CO * 100).toFixed(1);
								datas.push(s);
							}
						}
					}
				}
				
				datas.forEach(function(d){					
					if(d.OV_L3_ID == "IL11") {
						series[0].data.push(parseFloat(d.DTVAL_CO));
					} else if(d.OV_L3_ID == "IL12") {
						series[1].data.push(parseFloat(d.DTVAL_CO));
					} else if(d.OV_L3_ID == "IL13") {
						series[2].data.push(parseFloat(d.DTVAL_CO));
					} else if(d.OV_L3_ID == "IL14") {
						series[3].data.push(parseFloat(d.DTVAL_CO));
					} else if(d.OV_L3_ID == "IL15") {
						series[4].data.push(parseFloat(d.DTVAL_CO));
					} else if(d.OV_L3_ID == "IL16") {
						series[5].data.push(parseFloat(d.DTVAL_CO));
					}
				});
									
				createMultiLineChart({
					target:"chart3-3",
					colors:["#7F7F7F","#A9B4BC","#6688A0", "#447291","#225B82","#255363"],
					categories,
					series,
					dataLabelsFormater:function(){
						if(this.point.index==series[this.colorIndex].data.length-1){
							return $.heum.setThousandSeparator(this.y)+"%";
						}
					},
					tooltipCallback:function({name,data,event}){
						const beforeData = series[event.point.colorIndex].data[event.point.index-1];							
						let ratio;
						if(beforeData){
							let rat = data - beforeData;
							let ca = "";
							let ratColor;
							if(rat>0){
								ca = "증가↑";
								ratColor="blue";
							}else if(rat<0){
								ca = "감소↓";
								ratColor="red";
							}
							ratio = "(전년 대비 <span class='color-"+ratColor+"'>"+Math.abs(rat).toFixed(1)+"</span>%p "+ca+")";
						}
						const tooltip = $("#chart3-3-container").find("[data-type=tooltip]:last");
						tooltip.empty();
						tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":name+" "+series[event.point.colorIndex].name}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(data)}),"%"
									),
									ratio,								
								$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
									let parameters = $.extend(true,{},_this.parameters);
//									parameters.tbl_id_list = tables[event.point.colorIndex];
									parameters.surv_year_list = parseInt(categories[event.point.index].replace("년",""));
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
									parameters.ov_l3_list = "IL10,"+series[event.point.colorIndex].code;
									parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
									$administStatsMap.ui.tooltipMap.title="";
									$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
										let alldatas = opt_fnCalc({data:res,trgtId:"OV_L3_ID",except:"IL10"});
										alldatas.forEach((d,index)=>{
											d.adm_cd = d.OV_L1_ID;
											d.region_nm = d.OV_L1_KOR;
										});
										let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "DTVAL_CO",
											unit : "%",
											callback:function(d){
												$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//												$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														$administStatsMap.ui.tooltipMap.title = series[event.point.colorIndex].name;
														$("#tooltip-map-modal-title").empty().append(
															$("<h3>",{"text":categories[event.point.index]}),
															$("<h3/>").append(
																title
															),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
														$("#tooltip-map-tooltip").empty().append(
															$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																$("<h3/>",{"class":"modal__tit","text":series[event.point.colorIndex].name}),
																$("<a/>",{"class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-tooltip').hide(); 
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															),
															$("<div/>",{"class":"modal__body"}).append(
																$("<p/>").append(
																	$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																),
																$("<p/>").append(
																	$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(data)}),"%"
																)
															)
														);
													},
													endCallback:function(){
														$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt(categories[event.point.index].replace("년",""));
														$("#tooltip-map-tooltip").show();
													}
												});
											}
										},alldatas,parameters);
									});
								})
								)
							);
						tooltip.show();
					}
				});
			});
			}
			
			
		},
	},
	main4 : {
		tabIndex:null,
		tbl_id:null,
		parameters : null,
		common: function(){
			$("[data-type=chart-container]").find("[data-type=tooltip]").hide();
			this.tabIndex = $("#main4-sub-tab li").index($("#main4-sub-tab li.on"));
			if(this.tabIndex==0){
				this.tbl_id = "DT_1MA0028";
				this.parameters = {
					surv_year_list : $administStatsMap.ui.year,
					org_id_list : "101",
					tbl_id_list : this.tbl_id,
					list_var_ord_list : "",
					char_itm_id_list : "T001",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : $administStatsMap.ui.admCd,
					ov_l2_list : "A10",
					ov_l3_list : "DL00,DL10",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
				};
			}else if(this.tabIndex==1){
				this.tbl_id = "DT_1MA0028";
				this.parameters = {
					surv_year_list : $administStatsMap.ui.year,
					org_id_list : "101",
					tbl_id_list : this.tbl_id,
					list_var_ord_list : "",
					char_itm_id_list : "T001",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : $administStatsMap.ui.admCd,
					ov_l2_list : "A10",
					ov_l3_list : "DL10,DL11,DL12,DL13,DL14,DL15,DL16,DL17,DL18",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
				};
			}else{
				return;
			}
			this.chart1();
			this.chart2();
			this.chart3();
		},
		chart1 : function(){
			$("#chart4-1").empty().css("width","");
			let colors, title;
			common_loading(true);
			let itm_nm;
			$("#chart4-1-legend").hide();
			if(this.tabIndex==0){
				title = "년 중·장년층 대출보유 비중";
				colors = ["#7CB5EC", "#434348"];
				itm_nm = "CHAR_ITM_NM";				
			}else if(this.tabIndex==1){
				title = "년 중·장년층 금융권 대출잔액구간별 비중";
				colors = ["#a0a0a0", "#7CB5EC","#e2658f"];
				itm_nm = "OV_L2_UP_ITM_KOR";				
			}
			
			const _this = this;
			$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data, param) {
				
				let chartData = [];
				
				if(_this.tabIndex==0){
					$("#chart4-1-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);
					$("#chart4-1-legend").show();
					var total = data.find(x => x.OV_L3_ID === 'DL00').DTVAL_CO;
					var dataAll = data.find(x => x.OV_L3_ID === 'DL00');
					var dataRg = data.find(x => x.OV_L3_ID === 'DL10');
					
					chartData.push({
						itm_nm:dataRg.OV_L3_KOR,
						dt:parseFloat(dataRg.DTVAL_CO).toFixed(1)					
					});
					
					chartData.push({
						itm_nm:"부채없음",
						dt:parseFloat(dataAll.DTVAL_CO-dataRg.DTVAL_CO).toFixed(1)
					});
										
					createDonutChart({isDisabledLegendClick:false,isShowLegend:false,data:chartData,height:"260px",target:"chart4-1",colorData:colors,unit:"천명",sumText:"중·장년층 전체",tooltipCallback:function(d,i){
						if(i == 1){
							return;
						}
						const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]");
						tooltip.empty();
						tooltip.append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								$("<h3/>",{"class":"modal__tit","text":chartData[i].itm_nm}),
								$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
									$(this).parents('[data-type=tooltip]').hide();
									return false;
								}).append($("<span/>",{"class":"btn-close btn-close--black"}))
							),
							$("<div/>",{"class":"modal__body"}).append(
								$("<p/>").append(
									$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
								),
								$("<p/>").append(
									$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(d.value)}),"천명"
								),
								$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
									//$administStatsMap.ui.tooltipMap.mapTotalVal = chartData[i].dt;
									$administStatsMap.ui.tooltipMap.mapTotalVal = 0;
									let parameters = $.extend(true,{},_this.parameters);
									parameters.tbl_id_list = data[i].TBL_ID;
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
									parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
									//$administStatsMap.ui.tooltipMap.title = chartData[i].itm_nm;
									$administStatsMap.ui.tooltipMap.title = "대출보유 비중";
									$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
										let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
										
										let allData = [];
										for(let j =0 ; j<res.length; j++){
											if(res[j].OV_L3_ID == "DL00" && res[j].OV_L2_ID == "A10" && res[j].PRD_DE == $administStatsMap.ui.year){
												allData.push(res[j]);
											}
										}
										
										for(let j =0 ; j<resultMapData.result.mapData.length; j++){
											for(let n=1;n< allData.length;n++){
												if(allData[n].OV_L1_ID == resultMapData.result.mapData[j].adm_cd){
													resultMapData.result.mapData[j].dt = (resultMapData.result.mapData[j].dt/ allData[n].DTVAL_CO *100).toFixed(1);
												}
											}
										}
										
										const themeInfo = $administStatsMap.ui.themeData[$administStatsMap.ui.theme];
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											//adm_cd: $administStatsMap.ui.admCd,
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "dt",
											unit : "%",
											callback:function(data){
//												if($administStatsMap.ui.admCd=="00"){
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
//												}else{
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//												}
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														$("#tooltip-map-modal-title").empty().append(
															$("<h3>",{"text":$administStatsMap.ui.year+'년'}),
															$("<h3/>").append(
																'중·장년층 대출보유 비중'
															),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
														$("#tooltip-map-tooltip").empty().append(
															$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																$("<h3/>",{"class":"modal__tit","text":"대출보유 비중"}),
																$("<a/>",{"class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-tooltip').hide(); 
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															),
															$("<div/>",{"class":"modal__body"}).append(
																$("<p/>").append(
																	$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																),
																$("<p/>").append(
																	$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(d.value/d.value*100)}),"%"
																)
															)
														);
													},
													didSelectedPolygon : function(callback){
														$("#tooltip-map-tooltip [data-id=region-name]").text($administStatsMap.ui.selectedAdmNm);
														$("#tooltip-map-tooltip .modal__tit").text($administStatsMap.ui.year+"년 "+$administStatsMap.ui.selectedAdmNm);										
														$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.businessChart[i].dt));
														if(typeof callback==="function"){
															callback();
														}
													}
												});
												$("#tooltip-map-tooltip").show();
											}
										},resultMapData.result.mapData,parameters);
									});
								})
							)
						).show();
					}});
					//$('.highcharts-data-label-color-1').css('opacity', 0);
					//$('.highcharts-color-1').css('stroke-width', 0);
				}else {		
					$("#chart4-1").css("width","352px");			
					$("#chart4-1-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);
					$("#chart4-1-legend").hide();
					let datas = [];
					for (let i = 0; i < data.length; i++) {
						let s = data[i];
						s.DTVAL_CO = s.DTVAL_CO * 1;
						for (let j = 0; j < data.length; j++) {
							let t = data[j];
							t.DTVAL_CO = t.DTVAL_CO * 1;
							if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
								if (s.OV_L3_ID != "DL10" && t.OV_L3_ID == "DL10") {
									s.DTVAL_CO_ORI = s.DTVAL_CO;
									s.DTVAL_CO = s.DTVAL_CO / t.DTVAL_CO * 100;
									datas.push(s);
								}
							}
						}
					}
					
					datas.forEach(item=>{																			
						chartData.push({
							itm_nm:item.OV_L3_KOR,
							dt:parseFloat(item.DTVAL_CO).toFixed(1),
							order:item.OV_L3_ID,
							cnt:item.DTVAL_CO_ORI
						});					
					});
					
					chartData = chartData.sort(function(a, b) { 
						  return a.order < b.order ? -1 : a.order > b.order ? 1 : 0;
					});
					
					chartData.forEach(s=>{
						s.itm_nm = s.itm_nm.replace("-","~"); 
					})

					let max = 0;
					let colors = chartData.map((d,index)=>{
						max = Math.max(max,parseFloat(d.dt));							
						return "#747474";
					});
					colors[chartData.findIndex(x => parseFloat(x.dt) === max)] = "#1287A9";
					
					createHorizontalBarChart({
						rotate:false,
						target:"chart4-1",
						data:chartData,
						dataVal:"dt",
						columnVal:"itm_nm",
						color:["#5B9BD5","#C0504D","#7F7F7F", "#FFC000","#B2C1DB","#70AD47","#2C4D75","#772C2A"],
						isShowYaxis:false,
						isSort:false,
						unit:"%",
						tooltipCallback:function(d,i){
							const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":chartData[i].itm_nm}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":chartData[i].cnt}),"천명"
									),
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										$administStatsMap.ui.tooltipMap.mapTotalVal=null;
										let parameters = $.extend(true,{},_this.parameters);										
										parameters.surv_year_list = $administStatsMap.ui.year;
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll;										
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;										
										parameters.ov_l3_list = 'DL10,'+chartData[i].order;										
										
										$administStatsMap.ui.tooltipMap.title=chartData[i].itm_nm;										
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											let alldatas = opt_fnCalc({data:res,trgtId:"OV_L3_ID",except:"DL10"});											
											alldatas.forEach((d,index)=>{
												d.adm_cd = d.OV_L1_ID;
												d.region_nm = d.OV_L1_KOR;
											})																			
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "DTVAL_CO",
												unit : "%",
												callback:function(data){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년'}),
																$("<h3/>").append("중·장년층 금융권 대출잔액구간별 비중",$("<span/>")),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
														},
														endCallback:function(){
															$("#tooltip-map-tooltip").empty().append(
																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																	$("<h3/>",{"class":"modal__tit","text":chartData[i].itm_nm}),
																	$("<a/>",{"class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-tooltip').hide(); 
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																),
																$("<div/>",{"class":"modal__body"}).append(
																	$("<p/>").append(
																		$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																	),
																	$("<p/>").append(
																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(chartData[i].dt)}),"%"
																	)
																)
															);
															$("#tooltip-map-tooltip").show();
														}
													});
												}
											},alldatas,parameters);
										});
									})
								)
							);
							tooltip.show();
						}
					});
				}
				common_loading(false);
			});
		},
		chart2: function(){
			
			$("#chart4-2").empty();
			const _this = this;
			let admCd,columns=[],groupKey,title;
			if(_this.tabIndex==0){
				admCd = $administStatsMap.consts.sidoAll;
				groupKey = "TBL_ID";
				columnNames = ["중장년층"];
				columns = ["DT_1MA0001"];
				title = "년 지역별 중·장년층 대출보유 비중";
				this.parameters.ov_l1_list = $administStatsMap.consts.sidoAll;			
			}else if(_this.tabIndex==1){
				admCd = $administStatsMap.consts.sidoAll;
				groupKey = "OV_L3_ID";
				columnNames = ["1천만원 미만","1~3천만원 미만","3~5천만원 미만","5~7천만원 미만","7천만원 1억원 미만","1~2억원 미만","2~3억원 미만","3억원 이상"];
				columns = ["DL11","DL12","DL13","DL14","DL15","DL16","DL17","DL18"];
				title = "년 지역별 중·장년층 금융권 대출잔액구간별 비중";	
				this.parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
			}
			
			$administStatsMap.utils.getTotsurvStatData(
				$.extend(true,{},this.parameters),function(data){
					
					
					let chartData = [];
					let total = 0;	
					if(_this.tabIndex==0){
						$("#chart4-2-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);						
						$("#chart4-2-legend").hide();
						let datas = [];
						for (let i = 0; i < data.length; i++) {
							let s = data[i];
							s.DTVAL_CO = s.DTVAL_CO * 1;
							for (let j = 0; j < data.length; j++) {
								let t = data[j];
								t.DTVAL_CO = t.DTVAL_CO * 1;
								if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
									if (s.OV_L3_ID != "DL00" && t.OV_L3_ID == "DL00") {
										s.DTVAL_CO = s.DTVAL_CO / t.DTVAL_CO * 100;
										datas.push(s);
									}
								}
							}
						}
						
						datas.forEach(item=>{																		
							if(item.OV_L1_ID != "00") {
								const value = parseFloat(item.DTVAL_CO);
								chartData.push({
									itm_nm:$administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR),
									dt:value.toFixed(1)
								});
								total+=value;
							}
						});
						
						const avg = total/chartData.length-1;
						
						chartData = chartData.sort(function(a, b) { 
							  return a.dt < b.dt ? -1 : a.dt > b.dt ? 1 : 0;
						});
						
						let max = 0;
						let colors = chartData.map((d,index)=>{
							max = Math.max(max,parseFloat(d.dt));							
							return "#747474";
						});
						colors[chartData.findIndex(x => parseFloat(x.dt) === max)] = "#ff5252";

//						$("#chart4-2-avg-text").empty().append(
//							$("<p/>").append(
//								$("<span/>",{"text":"평균"}),
//								avg.toFixed(1)+"%"
//							)
//						);	
						
						createVerticalBarChart({
							rotate:false,
							target:"chart4-2",
							data:chartData,
							dataVal:"dt",
							columnVal:"itm_nm",
							color:colors,
							isShowYaxis:false,		
							unit:"%",
							tooltipCallback:function(d,i){
								const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
								tooltip.empty();
								tooltip.append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
										$("<h3/>",{"class":"modal__tit","text":"대출보유 비중"}),
										$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
											$(this).parents('[data-type=tooltip]').hide();
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									),
									$("<div/>",{"class":"modal__body"}).append(
										$("<p/>").append(
											$("<span/>",{"class":"color-blue","text":chartData[i].itm_nm})
										),
										$("<p/>").append(
											$("<span/>",{"class":"color-red","text":chartData[i].dt}),"%"
										),
										$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
											let parameters = $.extend(true,{},_this.parameters);
											parameters.tbl_id_list = data[i].TBL_ID;
											parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
											parameters.surv_year_list = $administStatsMap.ui.year;
											parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
											$administStatsMap.ui.tooltipMap.title="대출보유 비중";
											
											$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
												let alldatas = opt_fnCalc({data:res,trgtId:"OV_L3_ID",except:"DL00"});												
												alldatas.forEach((d,index)=>{
													d.adm_cd = d.OV_L1_ID;
													d.region_nm = d.OV_L1_KOR;
												});	
												let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
												$administStatsMap.ui.map["tooltip-map"].setStatsData({
													adm_cd: "00",
													admCdKey:"adm_cd",
													showData : "DTVAL_CO",
													unit : "(%)",
													callback:function(data){
														$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//														$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
														$administStatsMap.ui.tooltipMap.show({
															tooltipCallback:function(){
																$("#tooltip-map-modal-title").empty().append(
																	$("<h3>",{"text":$administStatsMap.ui.year+'년'}),
																	$("<h3/>").append("중·장년층 대출보유 비중"),
																	$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-container').hide();
																		$('.dim').hide();
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																);
															},
															endCallback:function(){
																$("#tooltip-map-tooltip").empty().append(
																	$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																		$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.tooltipMap.title}),
																		$("<a/>",{"class":"btn__cancel"}).click(function(){
																			$('#tooltip-map-tooltip').hide(); 
																			return false;
																		}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																	),
																	$("<div/>",{"class":"modal__body"}).append(
																		$("<p/>").append(
																			$("<span/>",{"class":"color-blue","text":chartData[i].itm_nm})
																		),
																		$("<p/>").append(
																			$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(chartData[i].dt)}),"(%)"
																		)
																	)
																);
																$("#tooltip-map-tooltip").show();
															}
														});
													}
												},alldatas,parameters);
											});
										})
									)
								);
								tooltip.show();
							}
						});
					} else if(_this.tabIndex==1) {
						$("#chart4-2-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);
						$("#chart4-2-legend").show();
						
						let innerParam = {
								tbl_id_list : "DT_1MA0028",
								surv_year_list : $administStatsMap.ui.year,
								org_id_list : "101",							
								list_var_ord_list : "",
								char_itm_id_list : "T001",
								prt_type : "",
								adm_cd : "",
								ov_l1_list : $administStatsMap.consts.sidoAll,
								ov_l2_list : "A10",
								ov_l3_list : "DL00,DL10",
								ov_l4_list: "",
								ov_l5_list: "",
								category : "",
								odr_col_list : "",
								odr_type : ""
							};
						
							let totDatas = [];
							
							$administStatsMap.utils.getTotsurvStatData(innerParam, function(res, param) {
								for (let i = 0; i < res.length; i++) {
									let s = JSON.parse(JSON.stringify(res[i]));
									s.DTVAL_CO = s.DTVAL_CO * 1;
									for (let j = 0; j < res.length; j++) {
										let t = JSON.parse(JSON.stringify(res[j]));
										t.DTVAL_CO = t.DTVAL_CO * 1;
										if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
											if (s.OV_L3_ID != "DL00" && t.OV_L3_ID == "DL00") {
												s.DTVAL_CO_ORI = s.DTVAL_CO;
												s.DTVAL_CO = (s.DTVAL_CO / t.DTVAL_CO * 100).toFixed(1);
												totDatas.push(s);
											}
										}
									}
								}							
							});
						
						let datas = [];						
						data = opt_fnCalc({data:data,trgtId:"OV_L3_ID",except:"DL10"});
						
						let total = 0;
						data.forEach(item=>{													
							if(columns.indexOf(item.OV_L3_ID)>-1){								
								datas[item.OV_L1_ID] = datas[item.OV_L1_ID]||{};
								datas[item.OV_L1_ID][item[groupKey]] = parseFloat(item.DTVAL_CO);								
								datas[item.OV_L1_ID].total = datas[item.OV_L1_ID].total||0;
								datas[item.OV_L1_ID].total+=datas[item.OV_L1_ID][item[groupKey]];
								datas[item.OV_L1_ID].category = $administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR);
								datas[item.OV_L1_ID].admCd = item.OV_L1_ID;
								if(item.OV_L1_ID!="00"&&item.OV_L1_ID!="000"){
									total+=datas[item.OV_L1_ID][item.OV_L3_ID];
								}
							}					
						});
						
						totDatas.forEach(item=>{
							datas[item.OV_L1_ID].DTVAL_CO = item.DTVAL_CO;
						})
						
						datas = Object.keys(datas).filter(key=>key!="00"&&key!="00").map(key=>datas[key]).sort(function (a, b) {
							return b.DTVAL_CO-a.DTVAL_CO;
						});
						/*
						datas = Object.keys(datas).filter(key=>key!="00"&&key!="00").map(key=>datas[key]).sort(function (a, b) {
							return b.total-a.total;
						});
						*/
						const categories = datas.map(item=>item.category);
						
//						const avg = total/datas.length;
//						$("#chart4-2-avg-text").empty().append(
//							$("<p/>").append(
//								$("<span/>",{"text":"평균"}),
//								$.heum.setThousandSeparator(parseInt(avg))+"명"
//							)
//						);
						createStackBarChartForPer({
							unit:"%",
							target:"chart4-2",
							data:datas,
							columns:columns,
							colors:["#5B9BD5","#C0504D","#7F7F7F", "#FFC000","#B2C1DB","#70AD47","#2C4D75","#772C2A"],
							viewTotalColumn:function(data){								
								let schData = totDatas.filter(item=>item.OV_L1_ID == data.admCd);	
								return schData[0].DTVAL_CO;
							},
							category:categories,tooltipCallback:function(d,i){
						
							const dataIndex = $(this).parent("[data-type=eventGroup]").data("value");
							const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":columnNames[dataIndex]}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":categories[i]})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(datas[i][columns[dataIndex]])}),"%"
									),
//									"(<span class='color-red'>"+((datas[i][columns[dataIndex]]/datas[i].total)*100).toFixed(1)+"</span>%)",
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
									$administStatsMap.ui.tooltipMap.mapTotalVal=null;
									let parameters = $.extend(true,{},_this.parameters);
									parameters.tbl_id_list = data[i].TBL_ID;
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
									parameters.ov_l3_list = columns[dataIndex];
									parameters.surv_year_list = $administStatsMap.ui.year;
									parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
									$administStatsMap.ui.tooltipMap.title = columnNames[dataIndex];
									$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
										datas.forEach(item=>{
											res.forEach(sel=>{
												if(sel.OV_L1_ID == item.admCd) {
													sel.DTVAL_CO = item[columns[dataIndex]];
												}
											})
										})										
										let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "dt",
											unit : "%",
											callback:function(data){
												$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//												$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														$("#tooltip-map-modal-title").empty().append(
															$("<h3>",{"text":$administStatsMap.ui.year+'년'}),
															$("<h3/>").append(
																"지역별 중·장년층 금융권 대출잔액구간별 비중"
															),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
													},
													endCallback:function(){
														$administStatsMap.ui.map["tooltip-map"].dataBoundary.eachLayer(function(layer){
															if(layer.feature.properties.adm_cd==datas[i].admCd){
																layer.fire("click");
															}
														})
													}
												});
												$("#tooltip-map-tooltip").show();
											}
										},resultMapData.result.mapData,parameters);
									});
								})
								)
							);
							tooltip.show();
						}});
					}
				}
			);
		},
		chart3:function(){
			
			$("#chart4-3").empty();
			const _this = this;
			let admCd,columns=[],groupKey,title;
			if(_this.tabIndex==0){
				admCd = $administStatsMap.consts.sidoAll;
				groupKey = "TBL_ID";
				columnNames = ["중장년층"];
				columns = ["DT_1MA0001"];
				title = "연도별 중·장년층 대출보유 비중";
				this.parameters.ov_l1_list = $administStatsMap.ui.admCd;				
				this.parameters.surv_year_list = $administStatsMap.ui.yearList.join(",");
			} else if(_this.tabIndex==1) {
				admCd = $administStatsMap.consts.sidoAll3;
				groupKey = "OV_L2_ID";
				columns = ["20","10"];
				title = "연도별 중·장년층 금융권 대출잔액구간별 비중";
				series=[{"code":"DL11","name":"1천만원 미만",data:[]},{"code":"DL12","name":"1-3천만원 미만",data:[]},{"code":"DL13","name":"3-5천만원 미만",data:[]},{"code":"DL14","name":"5-7천만원 미만",data:[]},{"code":"DL15","name":"7천만원-1억원 미만",data:[]},{"code":"DL16","name":"1-2억원 미만",data:[]},{"code":"DL17","name":"2-3억원 미만",data:[]},{"code":"DL18","name":"3억원 이상",data:[]}]
				this.parameters.surv_year_list = $administStatsMap.ui.yearList.join(",");
				this.parameters.ov_l1_list = $administStatsMap.ui.admCd;
			}
			
			$("#chart4-3-title").data("append-text",title).empty().append(title);
			
			if(_this.tabIndex==0){
				
				$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data){

					let datas = [];
					for (let i = 0; i < data.length; i++) {
						let s = data[i];
						s.DTVAL_CO = s.DTVAL_CO * 1;
						for (let j = 0; j < data.length; j++) {
							let t = data[j];
							t.DTVAL_CO = t.DTVAL_CO * 1;
							if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
								if (s.OV_L3_ID != "DL00" && t.OV_L3_ID == "DL00") {
									s.DTVAL_CO = (s.DTVAL_CO / t.DTVAL_CO * 100).toFixed(1);
									datas.push(s);
								}
							}
						}
					}
					
					createLineChart({target:"chart4-3", data:datas, color:"#7419B1", dataVal:"DTVAL_CO", columnVal:"PRD_DE",unit:"%",tooltipCallback:function(d,i){
						const beforeDataObj = datas[i-1];
						let ratio;
						if(beforeDataObj){
							const beforeData = beforeDataObj.DTVAL_CO;
							let ratColor;
							let ca = "";
							let rat = d.DTVAL_CO - beforeData;
							if(rat>0){
								ca = "증가↑";
								ratColor="red";
							}else if(rat<0){
								ca = "감소↓";
								ratColor="blue";
							}
							ratio = "(전년 대비 <span class='color-"+ratColor+"'>"+Math.abs(rat).toFixed(1)+"</span>%p "+ca+")";
						}
						const tooltip = $("#chart4-3-container").find("[data-type=tooltip]");
						tooltip.empty();
						tooltip.append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								$("<h3/>",{"class":"modal__tit","text":datas[i].PRD_DE+"년 대출보유 비중"}),
								$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
									$(this).parents('[data-type=tooltip]').hide();
									return false;
								}).append($("<span/>",{"class":"btn-close btn-close--black"}))
							),
							$("<div/>",{"class":"modal__body"}).append(
								$("<p/>").append(
									$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
								),
								$("<p/>").append(
									$("<span/>",{"class":"color-red","text":d.DTVAL_CO}),"%"
								),
								ratio,
								$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
									$administStatsMap.ui.tooltipMap.mapTotalVal=null;
									let parameters = $.extend(true,{},_this.parameters);
									parameters.tbl_id_list = data[i].TBL_ID;
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
									parameters.surv_year_list = parseInt(data[i].PRD_DE.replace("년",""));
									parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
									$administStatsMap.ui.tooltipMap.title="대출보유 비중";
									$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
										let alldatas = opt_fnCalc({data:res,trgtId:"OV_L3_ID",except:"DL00"});												
										alldatas.forEach((d,index)=>{
											d.adm_cd = d.OV_L1_ID;
											d.region_nm = d.OV_L1_KOR;
										});											
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "DTVAL_CO",
											unit : "%",
											callback:function(d){
												$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//												$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														$("#tooltip-map-modal-title").empty().append(
															$("<h3>",{"text":datas[i].PRD_DE+"년"}),
															$("<h3/>").append("연도별 중·장년층 대출보유 비중"),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
													},
													endCallback:function(){
														$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt(datas[i].PRD_DE.replace("년",""));
														$("#tooltip-map-tooltip").empty().append(
															$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.tooltipMap.title}),
																$("<a/>",{"class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-tooltip').hide(); 
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															),
															$("<div/>",{"class":"modal__body"}).append(
																$("<p/>").append(
																	$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																),
																$("<p/>").append(
																	$("<span/>",{"class":"color-red","data-id":"value","text":datas[i].DTVAL_CO}),"%"
																)
															)
														);
														$("#tooltip-map-tooltip").show();
													}
												});
											}
										},alldatas,parameters);
									});
								})
							)
						).show();
						}});
						}
					);
				
				
				
			} else if(_this.tabIndex==1) {
				
				$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data){
								
				let categories = $.extend(true,[],$administStatsMap.ui.yearList).sort().map(year=>year+"년");

				let datas = [];
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					s.DTVAL_CO = s.DTVAL_CO * 1;
					for (let j = 0; j < data.length; j++) {
						let t = data[j];
						t.DTVAL_CO = t.DTVAL_CO * 1;
						if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
							if (s.OV_L3_ID != "DL10" && t.OV_L3_ID == "DL10") {
								s.DTVAL_CO = (s.DTVAL_CO / t.DTVAL_CO * 100).toFixed(1);
								datas.push(s);
							}
						}
					}
				}
				
				datas.forEach(function(d){					
					if(d.OV_L3_ID == "DL11") {
						series[0].data.push(parseFloat(d.DTVAL_CO));
					} else if(d.OV_L3_ID == "DL12") {
						series[1].data.push(parseFloat(d.DTVAL_CO));
					} else if(d.OV_L3_ID == "DL13") {
						series[2].data.push(parseFloat(d.DTVAL_CO));
					} else if(d.OV_L3_ID == "DL14") {
						series[3].data.push(parseFloat(d.DTVAL_CO));
					} else if(d.OV_L3_ID == "DL15") {
						series[4].data.push(parseFloat(d.DTVAL_CO));
					} else if(d.OV_L3_ID == "DL16") {
						series[5].data.push(parseFloat(d.DTVAL_CO));
					} else if(d.OV_L3_ID == "DL17") {
						series[6].data.push(parseFloat(d.DTVAL_CO));
					} else if(d.OV_L3_ID == "DL18") {
						series[7].data.push(parseFloat(d.DTVAL_CO));
					}
				});
				
				createMultiLineChart({
					target:"chart4-3",
					colors:["#5B9BD5","#C0504D","#7F7F7F", "#FFC000","#B2C1DB","#70AD47","#2C4D75","#772C2A"],
					categories,
					series,
					dataLabelsFormater:function(){
						if(this.point.index==series[this.colorIndex].data.length-1){
							return $.heum.setThousandSeparator(this.y)+"%";
						}
					},
					tooltipCallback:function({name,data,event}){
						const beforeData = series[event.point.colorIndex].data[event.point.index-1];
						let ratio;
						if(beforeData){
							let rat = data - beforeData;
							let ca = "";
							let ratColor;
							if(rat>0){
								ca = "증가↑";
								ratColor="blue";
							}else if(rat<0){
								ca = "감소↓";
								ratColor="red";
							}
							ratio = "(전년 대비 <span class='color-"+ratColor+"'>"+Math.abs((rat).toFixed(1))+"</span>%p "+ca+")";
						}
						const tooltip = $("#chart4-3-container").find("[data-type=tooltip]:last");
						tooltip.empty();
						tooltip.append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								$("<h3/>",{"class":"modal__tit","text":name+" "+series[event.point.colorIndex].name}),
								$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
									$(this).parents('[data-type=tooltip]').hide();
									return false;
								}).append($("<span/>",{"class":"btn-close btn-close--black"}))
							),
							$("<div/>",{"class":"modal__body"}).append(
								$("<p/>").append(
									$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
								),
								$("<p/>").append(
									$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(data)}),"%"
								),
								ratio,
								$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
									let parameters = $.extend(true,{},_this.parameters);									
									parameters.surv_year_list = parseInt(categories[event.point.index].replace("년",""));
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
									parameters.ov_l3_list = "DL10,"+series[event.point.colorIndex].code;
									parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
									$administStatsMap.ui.tooltipMap.title="";
									$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
										let alldatas = opt_fnCalc({data:res,trgtId:"OV_L3_ID",except:"DL10"});
										alldatas.forEach((d,index)=>{
											d.adm_cd = d.OV_L1_ID;
											d.region_nm = d.OV_L1_KOR;
										});
										let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "DTVAL_CO",
											unit : "%",
											callback:function(d){
												$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//												$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														$administStatsMap.ui.tooltipMap.title = series[event.point.colorIndex].name;
														$("#tooltip-map-modal-title").empty().append(
															$("<h3>",{"text":categories[event.point.index]}),
															$("<h3/>").append(
																title
															),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
														$("#tooltip-map-tooltip").empty().append(
															$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																$("<h3/>",{"class":"modal__tit","text":series[event.point.colorIndex].name}),
																$("<a/>",{"class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-tooltip').hide(); 
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															),
															$("<div/>",{"class":"modal__body"}).append(
																$("<p/>").append(
																	$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																),
																$("<p/>").append(
																	$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(data)}),"%"
																)
															)
														);
													},
													endCallback:function(){
														$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt(categories[event.point.index].replace("년",""));
														$("#tooltip-map-tooltip").show();
													}
												});
											}
										},alldatas,parameters);
									});
								})
							)
						);
						tooltip.show();
					}
				});
			});
			}
		},
	},
	main5 : {
		tabIndex:null,
		tbl_id:null,
		parameters : null,
		common: function(){
			$("[data-type=chart-container]").find("[data-type=tooltip]").hide();
			this.tabIndex = $("#main5-sub-tab li").index($("#main5-sub-tab li.on"));
			if(this.tabIndex==0){
				this.tbl_id = "DT_1MA0037";
				this.parameters = {
					surv_year_list : $administStatsMap.ui.year,
					org_id_list : "101",
					tbl_id_list : this.tbl_id,
					list_var_ord_list : "",
					char_itm_id_list : "T001",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : $administStatsMap.ui.admCd,
					ov_l2_list : "HT20",
					ov_l3_list : "HO10,HO20",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
				};
			}else if(this.tabIndex==1){
				this.tbl_id = "DT_1MA0038";
				this.parameters = {
					surv_year_list : $administStatsMap.ui.year,
					org_id_list : "101",
					tbl_id_list : this.tbl_id,
					list_var_ord_list : "",
					char_itm_id_list : "T001",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : $administStatsMap.ui.admCd,
					ov_l2_list : "HT20",
					ov_l3_list : "AV10,AV11,AV12,AV13,AV14,AV15",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
				};
			}else{
				return;
			}
			this.chart1();
			this.chart2();
			this.chart3();
		},
		chart1 : function(){
			$("#chart5-1").empty().css("min-width","");
			let colors, title;
			common_loading(true);
			let itm_nm;
			$("#chart5-1-legend").hide();
			if(this.tabIndex==0){
				title = "년 중·장년층 가구의 주택소유 비중";
				colors = ["#7CB5EC", "#434348"];
				itm_nm = "CHAR_ITM_NM";				
			}else if(this.tabIndex==1){
				title = "년 중·장년층 주택소유 가구의 주택자산가액별 비중";
				colors = ["#a0a0a0", "#7CB5EC","#e2658f"];
				itm_nm = "OV_L2_UP_ITM_KOR";				
			}
			
			const _this = this;
			$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data, param) {
				
				let chartData = [];
				
				if(_this.tabIndex==0){
					$("#chart5-1-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);
					$("#chart5-1-legend").show();
					var total = data.find(x => x.OV_L3_ID === 'HO10').DTVAL_CO;
					var dataAll = data.find(x => x.OV_L3_ID === 'HO10');
					var dataRg = data.find(x => x.OV_L3_ID === 'HO20');
					
					chartData.push({
						itm_nm:dataRg.OV_L3_KOR,
						dt:parseFloat(dataRg.DTVAL_CO).toFixed(0)					
					});
					
					chartData.push({
						itm_nm:"무주택",
						dt:parseFloat(dataAll.DTVAL_CO-dataRg.DTVAL_CO).toFixed(0)
					});
										
					createDonutChart({isDisabledLegendClick:false,isShowLegend:false,data:chartData,height:"260px",target:"chart5-1",colorData:colors,unit:"가구",sumText:"중·장년층 전체",tooltipCallback:function(d,i){
						if(i == 1){
							return;
						}
						const tooltip = $(this).parents("[data-type=chart5-1-container]").find("[data-type=tooltip]");
						tooltip.empty();
						tooltip.append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								$("<h3/>",{"class":"modal__tit","text":"주택소유"}),
								$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
									$(this).parents('[data-type=tooltip]').hide();
									return false;
								}).append($("<span/>",{"class":"btn-close btn-close--black"}))
							),
							$("<div/>",{"class":"modal__body"}).append(
								$("<p/>").append(
									$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
								),
								$("<p/>").append(
									$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(d.value)}),"가구"
								),
								$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
									//$administStatsMap.ui.tooltipMap.mapTotalVal = chartData[i].dt;
									$administStatsMap.ui.tooltipMap.mapTotalVal = 0;
									let parameters = $.extend(true,{},_this.parameters);
									parameters.tbl_id_list = data[i].TBL_ID;
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
									parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
									$administStatsMap.ui.tooltipMap.title = "주택소유 비중";
									$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
										let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
										
										let allData = [];
										for(let j =0 ; j<res.length; j++){
											if(res[j].OV_L3_ID == "HO10" && res[j].OV_L2_ID == "HT20" && res[j].PRD_DE == $administStatsMap.ui.year){
												allData.push(res[j]);
											}
										}
										
										for(let j =0 ; j<resultMapData.result.mapData.length; j++){
											for(let n=1;n< allData.length;n++){
												if(allData[n].OV_L1_ID == resultMapData.result.mapData[j].adm_cd){
													resultMapData.result.mapData[j].dt = (resultMapData.result.mapData[j].dt/ allData[n].DTVAL_CO *100).toFixed(1);
												}
											}
										}
										
										const themeInfo = $administStatsMap.ui.themeData[$administStatsMap.ui.theme];
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											//adm_cd: $administStatsMap.ui.admCd,
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "dt",
											unit : "%",
											callback:function(data){
//												if($administStatsMap.ui.admCd=="00"){
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
//												}else{
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//												}
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														$("#tooltip-map-modal-title").empty().append(
															$("<h3>",{"text":$administStatsMap.ui.year+'년'}),
															$("<h3/>").append(
																'중·장년층 가구의 주택소유 비중'
															),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
														$("#tooltip-map-tooltip").empty().append(
															$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																$("<h3/>",{"class":"modal__tit","text":"주택소유 비중"}),
																$("<a/>",{"class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-tooltip').hide(); 
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															),
															$("<div/>",{"class":"modal__body"}).append(
																$("<p/>").append(
																	$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																),
																$("<p/>").append(
																	$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(d.value/d.value*100)}),"%"
																)
															)
														);
													},
													didSelectedPolygon : function(callback){
														$("#tooltip-map-tooltip [data-id=region-name]").text($administStatsMap.ui.selectedAdmNm);
														$("#tooltip-map-tooltip .modal__tit").text($administStatsMap.ui.year+"년 "+$administStatsMap.ui.selectedAdmNm);										
														$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.businessChart[i].dt));
														if(typeof callback==="function"){
															callback();
														}
													}
												});
												$("#tooltip-map-tooltip").show();
											}
										},resultMapData.result.mapData,parameters);
									});
								})
							)
						).show();
					}});
					//$('.highcharts-data-label-color-1').css('opacity', 0);
					//$('.highcharts-color-1').css('stroke-width', 0);
				}else {		
					$("#chart5-1").css("min-width","400px");
					$("#chart5-1-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);
					$("#chart5-1-legend").hide();
					
					let datas = [];
					for (let i = 0; i < data.length; i++) {
						let s = data[i];
						s.DTVAL_CO = s.DTVAL_CO * 1;
						for (let j = 0; j < data.length; j++) {
							let t = data[j];
							t.DTVAL_CO = t.DTVAL_CO * 1;
							if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
								if (s.OV_L3_ID != "AV10" && t.OV_L3_ID == "AV10") {
									s.DTVAL_CO_ORI = s.DTVAL_CO;
									s.DTVAL_CO = s.DTVAL_CO / t.DTVAL_CO * 100;
									datas.push(s);
								}
							}
						}
					}
					
					datas.forEach(item=>{																			
						chartData.push({
							itm_nm:item.OV_L3_KOR,
							dt:parseFloat(item.DTVAL_CO).toFixed(1),
							order:item.OV_L3_ID,
							dtOri:item.DTVAL_CO_ORI
						});					
					});
					
					chartData = chartData.sort(function(a, b) { 
						  return a.order < b.order ? -1 : a.order > b.order ? 1 : 0;
					});
					
					let max = 0;
					let colors = chartData.map((d,index)=>{
						max = Math.max(max,parseFloat(d.dt));							
						return "#747474";
					});
					colors[chartData.findIndex(x => parseFloat(x.dt) === max)] = "#3FC8AD";
					
					createVerticalBarChart({
						rotate:true,
						target:"chart5-1",
						data:chartData,
						dataVal:"dt",
						columnVal:"itm_nm",
						color:colors,
						isShowYaxis:false,
						isSort:false,
						unit:"%",
						tooltipCallback:function(d,i){
							const tooltip = $(this).parents("[data-type=chart5-1-container]").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":chartData[i].itm_nm}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$administStatsMap.utils.addComma(chartData[i].dtOri)}),"가구"
									),
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										$administStatsMap.ui.tooltipMap.mapTotalVal=null;
										let parameters = $.extend(true,{},_this.parameters);										
										parameters.surv_year_list = $administStatsMap.ui.year;
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;										
										parameters.ov_l3_list = 'AV10,'+chartData[i].order;																				
										$administStatsMap.ui.tooltipMap.title=chartData[i].itm_nm;										
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											let alldatas = opt_fnCalc({data:res,trgtId:"OV_L3_ID",except:"AV10"});											
											alldatas.forEach((d,index)=>{
												d.adm_cd = d.OV_L1_ID;
												d.region_nm = d.OV_L1_KOR;
											})		;																					
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "DTVAL_CO",
												unit : "%",
												callback:function(data){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년 '}),
																$("<h3/>").append("중·장년층 주택소유 가구의 주택자산가액별 비중",$("<span/>")),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
														},
														endCallback:function(){
															$("#tooltip-map-tooltip").empty().append(
																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																	$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.tooltipMap.title}),
																	$("<a/>",{"class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-tooltip').hide(); 
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																),
																$("<div/>",{"class":"modal__body"}).append(
																	$("<p/>").append(
																		$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																	),
																	$("<p/>").append(
																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(chartData[i].dt)}),"%"
																	)
																)
															);
															$("#tooltip-map-tooltip").show();
														}
													});
												}
											},alldatas,parameters);
										});
									})
								)
							);
							tooltip.show();
						}
					});
				}
				common_loading(false);
			});
		},
		chart2: function(){
			$("#chart5-2").empty();
			const _this = this;
			let admCd,columns=[],groupKey,title;
			if(_this.tabIndex==0){
				admCd = $administStatsMap.consts.sidoAll;
				groupKey = "TBL_ID";
				columnNames = ["중장년층"];
				columns = ["DT_1MA0001"];
				title = "년 지역별 중·장년층 가구의 주택소유 비중";
				this.parameters.ov_l1_list = $administStatsMap.consts.sidoAll;			
			}else if(_this.tabIndex==1){
				admCd = $administStatsMap.consts.sidoAll3;
				groupKey = "OV_L3_ID";
				columnNames = ["6천만원 이하","6천만원 초과~1억 5천만원 이하","1억 5천만원 초과~3억원 이하","3억원 초과~6억원 이하","6억원 초과"];
				columns = ["AV11","AV12","AV13","AV14","AV15"];
				title = "년 지역별 중·장년층 주택소유 가구의 주택자산가액별 비중";
				this.parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
			}
			
			$administStatsMap.utils.getTotsurvStatData(
				$.extend(true,{},this.parameters),function(data){
					
					
					let chartData = [];
					let total = 0;	
					if(_this.tabIndex==0){
						$("#chart5-2-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);
						$("#chart5-2-legend").hide();
						let datas = [];
						for (let i = 0; i < data.length; i++) {
							let s = data[i];
							s.DTVAL_CO = s.DTVAL_CO * 1;
							for (let j = 0; j < data.length; j++) {
								let t = data[j];
								t.DTVAL_CO = t.DTVAL_CO * 1;
								if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
									if (s.OV_L3_ID != "HO10" && t.OV_L3_ID == "HO10") {
										s.DTVAL_CO = s.DTVAL_CO / t.DTVAL_CO * 100;
										datas.push(s);
									}
								}
							}
						}
						
						datas.forEach(item=>{																		
							if(item.OV_L1_ID != "00") {
								const value = parseFloat(item.DTVAL_CO);
								chartData.push({
									itm_nm:$administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR),
									dt:value.toFixed(1)
								});
								total+=value;
							}
						});
											
						const avg = total/chartData.length-1;
						
						chartData = chartData.sort(function(a, b) { 
							  return a.dt < b.dt ? -1 : a.dt > b.dt ? 1 : 0;
						});
						
						let max = 0;
						let colors = chartData.map((d,index)=>{
							max = Math.max(max,parseFloat(d.dt));							
							return "#747474";
						});
						colors[chartData.findIndex(x => parseFloat(x.dt) === max)] = "#ff5252";

//						$("#chart5-2-avg-text").empty().append(
//							$("<p/>").append(
//								$("<span/>",{"text":"평균"}),
//								avg.toFixed(1)+"%"
//							)
//						);	
						
						createVerticalBarChart({
							rotate:false,
							target:"chart5-2",
							data:chartData,
							dataVal:"dt",
							columnVal:"itm_nm",
							color:colors,
							isShowYaxis:false,
							unit:"%",
							tooltipCallback:function(d,i){
								const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
								tooltip.empty();
								tooltip.append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
										$("<h3/>",{"class":"modal__tit","text":"가구의 주택소유 비중"}),
										$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
											$(this).parents('[data-type=tooltip]').hide();
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									),
									$("<div/>",{"class":"modal__body"}).append(
										$("<p/>").append(
											$("<span/>",{"class":"color-blue","text":chartData[i].itm_nm})
										),
										$("<p/>").append(
											$("<span/>",{"class":"color-red","text":chartData[i].dt}),"%"
										),
										$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
											$administStatsMap.ui.tooltipMap.mapTotalVal=null;
											let parameters = $.extend(true,{},_this.parameters);
											parameters.tbl_id_list = data[i].TBL_ID;
											parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
											parameters.surv_year_list = $administStatsMap.ui.year;
											parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
											$administStatsMap.ui.tooltipMap.title="가구의 주택소유 비중";										
											$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {												
												let alldatas = opt_fnCalc({data:res,trgtId:"OV_L3_ID",except:"HO10"});												
												alldatas.forEach((d,index)=>{
													d.adm_cd = d.OV_L1_ID;
													d.region_nm = d.OV_L1_KOR;
												})
												$administStatsMap.ui.map["tooltip-map"].setStatsData({
													adm_cd: "00",
													admCdKey:"adm_cd",
													showData : "DTVAL_CO",
													unit : "%",
													callback:function(data){
														$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//														$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
														$administStatsMap.ui.tooltipMap.show({
															tooltipCallback:function(){
																$("#tooltip-map-modal-title").empty().append(
																	$("<h3>",{"text":$administStatsMap.ui.year+'년'}),
																	$("<h3/>").append("지역별 중·장년층 주택소유 비중"),
																	$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-container').hide();
																		$('.dim').hide();
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																);
															},
															endCallback:function(){
																$("#tooltip-map-tooltip").empty().append(
																	$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																		$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.tooltipMap.title}),
																		$("<a/>",{"class":"btn__cancel"}).click(function(){
																			$('#tooltip-map-tooltip').hide(); 
																			return false;
																		}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																	),
																	$("<div/>",{"class":"modal__body"}).append(
																		$("<p/>").append(
																			$("<span/>",{"class":"color-blue","text":chartData[i].itm_nm})
																		),
																		$("<p/>").append(
																			$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(chartData[i].dt)}),"%"
																		)
																	)
																);
																$("#tooltip-map-tooltip").show();
															}
														});
													}
												},alldatas,parameters);
											});
										})
									)
								);
								tooltip.show();
							}
						});
					} else if(_this.tabIndex==1) {
						$("#chart5-2-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);
						$("#chart5-2-legend").show();
						
						let innerParam = {
								tbl_id_list : "DT_1MA0022",
								surv_year_list : $administStatsMap.ui.year,
								org_id_list : "101",							
								list_var_ord_list : "",
								char_itm_id_list : "T001",
								prt_type : "",
								adm_cd : "",
								ov_l1_list : $administStatsMap.consts.sidoAll,
								ov_l2_list : "G10",
								ov_l3_list : "HO10,HO20",
								ov_l4_list: "",
								ov_l5_list: "",
								category : "",
								odr_col_list : "",
								odr_type : ""
							};
						
							let totDatas = [];
							
							$administStatsMap.utils.getTotsurvStatData(innerParam, function(res, param) {
								for (let i = 0; i < res.length; i++) {
									let s = JSON.parse(JSON.stringify(res[i]));
									s.DTVAL_CO = s.DTVAL_CO * 1;
									for (let j = 0; j < res.length; j++) {
										let t = JSON.parse(JSON.stringify(res[j]));
										t.DTVAL_CO = t.DTVAL_CO * 1;
										if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
											if (s.OV_L3_ID != "HO10" && t.OV_L3_ID == "HO10") {
												s.DTVAL_CO_ORI = s.DTVAL_CO;
												s.DTVAL_CO = (s.DTVAL_CO / t.DTVAL_CO * 100).toFixed(1);
												totDatas.push(s);
											}
										}
									}
								}							
							});
						
						data = opt_fnCalc({data:data,trgtId:"OV_L3_ID",except:"AV10"});
						let datas = [];						
						let total = 0;
						data.forEach(item=>{									
							if(columns.indexOf(item.OV_L3_ID)>-1){								
								datas[item.OV_L1_ID] = datas[item.OV_L1_ID]||{};
								datas[item.OV_L1_ID][item[groupKey]] = parseFloat(item.DTVAL_CO);								
								datas[item.OV_L1_ID].total = datas[item.OV_L1_ID].total||0;
								datas[item.OV_L1_ID].total+=datas[item.OV_L1_ID][item[groupKey]];
								datas[item.OV_L1_ID].category = $administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR);
								datas[item.OV_L1_ID].admCd = item.OV_L1_ID;
								if(item.OV_L1_ID!="00"&&item.OV_L1_ID!="000"){
									total+=datas[item.OV_L1_ID][item.OV_L3_ID];
								}
							}					
						});
						
						totDatas.forEach(item=>{
							datas[item.OV_L1_ID].DTVAL_CO = item.DTVAL_CO;
						})
						
						datas = Object.keys(datas).filter(key=>key!="00"&&key!="00").map(key=>datas[key]).sort(function (a, b) {
							return b.DTVAL_CO-a.DTVAL_CO;
						});
						/*
						datas = Object.keys(datas).filter(key=>key!="00"&&key!="00").map(key=>datas[key]).sort(function (a, b) {
							return b.total-a.total;
						});						
						*/
						const categories = datas.map(item=>item.category);
						
//						const avg = total/datas.length;
//						$("#chart5-2-avg-text").empty().append(
//							$("<p/>").append(
//								$("<span/>",{"text":"평균"}),
//								$.heum.setThousandSeparator(parseInt(avg))+"명"
//							)
//						);
						createStackBarChartForPer({ 
							unit:"%",
							target:"chart5-2",
							data:datas,
							columns:columns,
							colors:["#5B9BD5","#C0504D","#7F7F7F", "#FFC000","#B2C1DB"],
							category:categories,
							viewTotalColumn:function(data){								
								let schData = totDatas.filter(item=>item.OV_L1_ID == data.admCd);	
								return schData[0].DTVAL_CO;
							},
							tooltipCallback:function(d,i){
						
							const dataIndex = $(this).parent("[data-type=eventGroup]").data("value");
							const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":columnNames[dataIndex]}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":categories[i]})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(datas[i][columns[dataIndex]])}),"%"
									),
//									"(<span class='color-red'>"+((datas[i][columns[dataIndex]]/datas[i].total)*100).toFixed(1)+"</span>%)",
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										$administStatsMap.ui.tooltipMap.mapTotalVal=null;
										let parameters = $.extend(true,{},_this.parameters);
										parameters.tbl_id_list = data[i].TBL_ID;
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
										parameters.ov_l3_list = columns[dataIndex];
										parameters.surv_year_list = $administStatsMap.ui.year;
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
										$administStatsMap.ui.tooltipMap.title = columnNames[dataIndex];
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											datas.forEach(item=>{
												res.forEach(sel=>{
													if(sel.OV_L1_ID == item.admCd) {
														sel.DTVAL_CO = item[columns[dataIndex]];
													}
												})
											})											
											let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : "%",
												callback:function(data){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년'}),
																$("<h3/>").append(
																	"지역별 중·장년층 주택소유 가구의 주택자산가액별 비중"
																),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
														},
														endCallback:function(){
															$administStatsMap.ui.map["tooltip-map"].dataBoundary.eachLayer(function(layer){
																if(layer.feature.properties.adm_cd==datas[i].admCd){
																	layer.fire("click");
																}
															})
														}
													});
													$("#tooltip-map-tooltip").show();
												}
											},resultMapData.result.mapData,parameters);
										});
									})
								)
							);
							tooltip.show();
						}});
					}
				}
			);
		},
		chart3:function(){
		
			$("#chart5-3").empty();
			const _this = this;
			let admCd,columns=[],groupKey,title;
			if(_this.tabIndex==0){
				admCd = $administStatsMap.consts.sidoAll;
				groupKey = "TBL_ID";
				columnNames = ["중장년층"];
				columns = ["DT_1MA0001"];
				title = "연도별 중·장년층 가구의 주택소유 비중";
				this.parameters.ov_l1_list = $administStatsMap.ui.admCd;				
				this.parameters.surv_year_list = $administStatsMap.ui.yearList.join(",");
			} else if(_this.tabIndex==1) {
				admCd = $administStatsMap.consts.sidoAll3;
				groupKey = "OV_L2_ID";
				columns = ["20","10"];
				title = "연도별 중·장년층 주택소유 가구의 주택자산가액별 비중";
				series=[{"code":"AV11","name":"6천만원 이하",data:[]},{"code":"AV12","name":"6천만원 초과 ~ 1억 5천만원 이하",data:[]},{"code":"AV13","name":"1억 5천만원 초과 ~ 3원원 이하",data:[]},{"code":"AV14","name":"3억원 초과~6억원 이하",data:[]},{"code":"AV15","name":"6억원 초과",data:[]}]
				this.parameters.surv_year_list = $administStatsMap.ui.yearList.join(",");
				this.parameters.ov_l1_list = $administStatsMap.ui.admCd
			}
			
			$("#chart5-3-title").data("append-text",title).empty().append(title);
			
			if(_this.tabIndex==0){
				
				$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data){
					
					let datas = [];
					for (let i = 0; i < data.length; i++) {
						let s = data[i];
						s.DTVAL_CO = s.DTVAL_CO * 1;
						for (let j = 0; j < data.length; j++) {
							let t = data[j];
							t.DTVAL_CO = t.DTVAL_CO * 1;
							if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
								if (s.OV_L3_ID != "HO10" && t.OV_L3_ID == "HO10") {
									s.DTVAL_CO = (s.DTVAL_CO / t.DTVAL_CO * 100).toFixed(1);
									datas.push(s);
								}
							}
						}
					}
					
					createLineChart({target:"chart5-3", data:datas, color:"#7419B1", dataVal:"DTVAL_CO", columnVal:"PRD_DE",unit:"%",tooltipCallback:function(d,i){
						const beforeDataObj = datas[i-1];
						let ratio;
						if(beforeDataObj){
							const beforeData = beforeDataObj.DTVAL_CO;
							let ratColor;
							let ca = "";
							let rat = d.DTVAL_CO - beforeData;
							if(rat>0){
								ca = "증가↑";
								ratColor="red";
							}else if(rat<0){
								ca = "감소↓";
								ratColor="blue";
							}
							ratio = "(전년 대비 <span class='color-"+ratColor+"'>"+Math.abs(rat).toFixed(1)+"</span>%p "+ca+")";
						}
						const tooltip = $("#chart5-3-container").find("[data-type=tooltip]");
						tooltip.empty();
						tooltip.append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								$("<h3/>",{"class":"modal__tit","text":data[i].PRD_DE+"년 가구의 주택소유 비중"}),
								$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
									$(this).parents('[data-type=tooltip]').hide();
									return false;
								}).append($("<span/>",{"class":"btn-close btn-close--black"}))
							),
							$("<div/>",{"class":"modal__body"}).append(
								$("<p/>").append(
									$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
								),
								$("<p/>").append(
									$("<span/>",{"class":"color-red","text":d.DTVAL_CO}),"%"
								),
								ratio,
								$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
									$administStatsMap.ui.tooltipMap.mapTotalVal=null;
									let parameters = $.extend(true,{},_this.parameters);
									parameters.tbl_id_list = data[i].TBL_ID;
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
									parameters.surv_year_list = parseInt(data[i].PRD_DE.replace("년",""));
									parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
									$administStatsMap.ui.tooltipMap.title="가구의 주택소유 비중";
									$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
										let alldatas = opt_fnCalc({data:res,trgtId:"OV_L3_ID",except:"HO10"});											
											alldatas.forEach((d,index)=>{
												d.adm_cd = d.OV_L1_ID;
												d.region_nm = d.OV_L1_KOR;
											})
										
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "DTVAL_CO",
											unit : "%",
											callback:function(d){
												$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//												$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														$("#tooltip-map-modal-title").empty().append(
															$("<h3>",{"text":datas[i].PRD_DE+"년"}),
															$("<h3/>").append("연도별 중·장년층 가구의 주택소유 비중"),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
													},
													endCallback:function(){
														$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt(datas[i].PRD_DE.replace("년",""));
														$("#tooltip-map-tooltip").empty().append(
															$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.tooltipMap.title}),
																$("<a/>",{"class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-tooltip').hide(); 
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															),
															$("<div/>",{"class":"modal__body"}).append(
																$("<p/>").append(
																	$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																),
																$("<p/>").append(
																	$("<span/>",{"class":"color-red","data-id":"value","text":datas[i].DTVAL_CO}),"%"
																)
															)
														);
														$("#tooltip-map-tooltip").show();
													}
												});
											}
										},alldatas,parameters);
									});
								})
							)
						).show();
						}});
						}
					);
				
				
				
			} else if(_this.tabIndex==1) {
				
				$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data){
								
				let categories = $.extend(true,[],$administStatsMap.ui.yearList).sort().map(year=>year+"년");
				
				let datas = [];
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					s.DTVAL_CO = s.DTVAL_CO * 1;
					for (let j = 0; j < data.length; j++) {
						let t = data[j];
						t.DTVAL_CO = t.DTVAL_CO * 1;
						if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
							if (s.OV_L3_ID != "AV10" && t.OV_L3_ID == "AV10") {
								s.DTVAL_CO = (s.DTVAL_CO / t.DTVAL_CO * 100).toFixed(1);
								datas.push(s);
							}
						}
					}
				}
				
				datas.forEach(function(d){					
					if(d.OV_L3_ID == "AV11") {
						series[0].data.push(parseFloat(d.DTVAL_CO));
					} else if(d.OV_L3_ID == "AV12") {
						series[1].data.push(parseFloat(d.DTVAL_CO));
					} else if(d.OV_L3_ID == "AV13") {
						series[2].data.push(parseFloat(d.DTVAL_CO));
					} else if(d.OV_L3_ID == "AV14") {
						series[3].data.push(parseFloat(d.DTVAL_CO));
					} else if(d.OV_L3_ID == "AV15") {
						series[4].data.push(parseFloat(d.DTVAL_CO));
					} 
				});
				
				createMultiLineChart({
					target:"chart5-3",
					colors:["#5B9BD5","#C0504D","#7F7F7F", "#FFC000","#B2C1DB"],
					categories,
					series,
					dataLabelsFormater:function(){
						if(this.point.index==series[this.colorIndex].data.length-1){
							return $.heum.setThousandSeparator(this.y)+"%";
						}
					},
					tooltipCallback:function({name,data,event}){
						const beforeData = series[event.point.colorIndex].data[event.point.index-1];
						let ratio;
						if(beforeData){
							let rat = data - beforeData;
							let ca = "";
							let ratColor;
							if(rat>0){
								ca = "증가↑";
								ratColor="blue";
							}else if(rat<0){
								ca = "감소↓";
								ratColor="red";
							}
							ratio = "(전년 대비 <span class='color-"+ratColor+"'>"+Math.abs((rat).toFixed(1))+"</span>%p "+ca+")";
						}
						const tooltip = $("#chart5-3-container").find("[data-type=tooltip]:last");
						tooltip.empty();
						tooltip.append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								$("<h3/>",{"class":"modal__tit","text":name+" "+series[event.point.colorIndex].name}),
								$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
									$(this).parents('[data-type=tooltip]').hide();
									return false;
								}).append($("<span/>",{"class":"btn-close btn-close--black"}))
							),
							$("<div/>",{"class":"modal__body"}).append(
								$("<p/>").append(
									$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
								),
								$("<p/>").append(
									$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(data)}),"%"
								),
								ratio,
								$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
									let parameters = $.extend(true,{},_this.parameters);									
									parameters.surv_year_list = parseInt(categories[event.point.index].replace("년",""));
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
									parameters.ov_l3_list = "AV10,"+series[event.point.colorIndex].code;
									parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
									$administStatsMap.ui.tooltipMap.title="";
									$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {										
										let alldatas = opt_fnCalc({data:res,trgtId:"OV_L3_ID",except:"AV10"});
										alldatas.forEach((d,index)=>{
											d.adm_cd = d.OV_L1_ID;
											d.region_nm = d.OV_L1_KOR;
										});										
										let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "DTVAL_CO",
											unit : "%",
											callback:function(d){
												$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//												$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														$administStatsMap.ui.tooltipMap.title = series[event.point.colorIndex].name;
														$("#tooltip-map-modal-title").empty().append(
															$("<h3>",{"text":categories[event.point.index]}),
															$("<h3/>").append(
																title
															),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
														$("#tooltip-map-tooltip").empty().append(
															$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																$("<h3/>",{"class":"modal__tit","text":series[event.point.colorIndex].name}),
																$("<a/>",{"class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-tooltip').hide(); 
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															),
															$("<div/>",{"class":"modal__body"}).append(
																$("<p/>").append(
																	$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																),
																$("<p/>").append(
																	$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(data)}),"%"
																)
															)
														);
													},
													endCallback:function(){
														$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt(categories[event.point.index].replace("년",""));
														$("#tooltip-map-tooltip").show();
													}
												});
											}
										},alldatas,parameters);
									});
								})
							)
						);
						tooltip.show();
					}
				});
			});
			}
		},
	},
	main6 : {
		tabIndex:null,
		tbl_id:null,
		parameters : null,
		common: function(){
			$("[data-type=chart-container]").find("[data-type=tooltip]").hide();
			this.tabIndex = $("#main6-sub-tab li").index($("#main6-sub-tab li.on"));
			if(this.tabIndex==0){
				this.tbl_id = "DT_1MA0024";
				this.parameters = {
					surv_year_list : $administStatsMap.ui.year,
					org_id_list : "101",
					tbl_id_list : this.tbl_id,
					list_var_ord_list : "",
					char_itm_id_list : "T001",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : $administStatsMap.ui.admCd,
					ov_l2_list : "G10",
					ov_l3_list : "P10,P20",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
				};
			}else if(this.tabIndex==1){
				this.tbl_id = "DT_1MA0024";
				this.parameters = {
					surv_year_list : $administStatsMap.ui.year,
					org_id_list : "101",
					tbl_id_list : this.tbl_id,
					list_var_ord_list : "",
					char_itm_id_list : "T001",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : $administStatsMap.ui.admCd,
					ov_l2_list : "G1001,G1002,G1003,G1004,G1005",
					ov_l3_list : "P10,P20",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
				};
			}else{
				return;
			}
			this.chart1();
			this.chart2();
			this.chart3();			
		},
		chart1 : function(){
			$("#chart6-1").empty();
			let colors, title;
			common_loading(true);
			let itm_nm;
			$("#chart6-1-legend").hide();
			if(this.tabIndex==0){
				title = "년 중·장년층 연금가입 비중";
				colors = ["#7CB5EC", "#434348"];
				itm_nm = "CHAR_ITM_NM";				
			}else if(this.tabIndex==1){
				title = "년 중·장년층 연령구간별 연금가입자 비중";
				colors = ["#a0a0a0", "#7CB5EC","#e2658f"];
				itm_nm = "OV_L2_UP_ITM_KOR";	
				this.parameters.ov_l2_list = "G1001,G1002,G1003,G1004,G1005"
				this.parameters.ov_l3_list = "P10,P20"
			}
			
			const _this = this;
			$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data, param) {
				
				let chartData = [];
				
				if(_this.tabIndex==0){
					$("#chart6-1-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);
					$("#chart6-1-legend").show();
					var total = data.find(x => x.OV_L3_ID === 'P10').DTVAL_CO;
					var dataAll = data.find(x => x.OV_L3_ID === 'P10');
					var dataRg = data.find(x => x.OV_L3_ID === 'P20');
					
					chartData.push({
						itm_nm:dataRg.OV_L3_KOR,
						dt:parseFloat(dataRg.DTVAL_CO).toFixed(0)					
					});
					
					chartData.push({
						itm_nm:"연금없음",
						dt:parseFloat(dataAll.DTVAL_CO-dataRg.DTVAL_CO).toFixed(0)
					});
										
					createDonutChart({isDisabledLegendClick:false,isShowLegend:false,data:chartData,target:"chart6-1",colorData:colors,unit:"명",sumText:"중·장년층 전체",tooltipCallback:function(d,i){
						if(i == 1){
							return;
						}
						const tooltip = $(this).parents("[data-type=chart6-1-container]").find("[data-type=tooltip]");
						tooltip.empty();
						tooltip.append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								$("<h3/>",{"class":"modal__tit","text":chartData[i].itm_nm}),
								$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
									$(this).parents('[data-type=tooltip]').hide();
									return false;
								}).append($("<span/>",{"class":"btn-close btn-close--black"}))
							),
							$("<div/>",{"class":"modal__body"}).append(
								$("<p/>").append(
									$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
								),
								$("<p/>").append(
									$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(d.value)}),"명"
								),
								$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
									//$administStatsMap.ui.tooltipMap.mapTotalVal = chartData[i].dt;
									$administStatsMap.ui.tooltipMap.mapTotalVal = 0;
									let parameters = $.extend(true,{},_this.parameters);
									parameters.tbl_id_list = data[i].TBL_ID;
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
									parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
									//$administStatsMap.ui.tooltipMap.title = chartData[i].itm_nm;
									$administStatsMap.ui.tooltipMap.title = "연금가입 비중";
									$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
										let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
										
										let allData = [];
										for(let j =0 ; j<res.length; j++){
											if(res[j].OV_L3_ID == "P10" && res[j].OV_L2_ID == "G10" && res[j].PRD_DE == $administStatsMap.ui.year){
												allData.push(res[j]);
											}
										}
										
										for(let j =0 ; j<resultMapData.result.mapData.length; j++){
											for(let n=1;n< allData.length;n++){
												if(allData[n].OV_L1_ID == resultMapData.result.mapData[j].adm_cd){
													resultMapData.result.mapData[j].dt = (resultMapData.result.mapData[j].dt/ allData[n].DTVAL_CO *100).toFixed(1);
												}
											}
										}
										
										const themeInfo = $administStatsMap.ui.themeData[$administStatsMap.ui.theme];
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											//adm_cd: $administStatsMap.ui.admCd,
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "dt",
											unit : "%",
											callback:function(data){
//												if($administStatsMap.ui.admCd=="00"){
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
//												}else{
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//												}
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														$("#tooltip-map-modal-title").empty().append(
															$("<h3>",{"text":$administStatsMap.ui.year+'년'}),
															$("<h3/>").append(
																'중·장년층 연금가입 비중'
															),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
														$("#tooltip-map-tooltip").empty().append(
															$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																$("<h3/>",{"class":"modal__tit","text":"연금가입 비중"}),
																$("<a/>",{"class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-tooltip').hide(); 
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															),
															$("<div/>",{"class":"modal__body"}).append(
																$("<p/>").append(
																	$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																),
																$("<p/>").append(
																	$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(d.value/d.value*100)}),"%"
																)
															)
														);
													},
													didSelectedPolygon : function(callback){
														$("#tooltip-map-tooltip [data-id=region-name]").text($administStatsMap.ui.selectedAdmNm);
														$("#tooltip-map-tooltip .modal__tit").text($administStatsMap.ui.year+"년 "+$administStatsMap.ui.selectedAdmNm);										
														$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.businessChart[i].dt));
														if(typeof callback==="function"){
															callback();
														}
													}
												});
												$("#tooltip-map-tooltip").show();
											}
										},resultMapData.result.mapData,parameters);
									});
								})
							)
						).show();
					}});
					//$('.highcharts-data-label-color-1').css('opacity', 0);
					//$('.highcharts-color-1').css('stroke-width', 0);
				}else {		
					$("#chart6-1-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);
					$("#chart6-1-legend").hide();
					let datas = [];
					for (let i = 0; i < data.length; i++) {
						let s = data[i];
						for (let j = 0; j < data.length; j++) {
							let t = data[j];
							if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
								if (s.OV_L2_ID == t.OV_L2_ID && s.OV_L3_ID != "P10" && t.OV_L3_ID == "P10") {
									s.DTVAL_CO_ORI = s.DTVAL_CO;
									s.DTVAL_CO = s.DTVAL_CO / t.DTVAL_CO * 100;
									datas.push(s);
								}
							}
						}
					}
					datas.forEach(item=>{																			
						chartData.push({
							itm_nm:item.OV_L2_KOR,
							dt:parseFloat(item.DTVAL_CO).toFixed(1),
							order:item.OV_L2_ID,
							dtOri:item.DTVAL_CO_ORI
						});					
					});
					
					chartData = chartData.sort(function(a, b) { 
						  return a.order < b.order ? -1 : a.order > b.order ? 1 : 0;
					});
					
					let max = 0;
					let colors = chartData.map((d,index)=>{
						max = Math.max(max,parseFloat(d.dt));							
						return "#747474";
					});
					colors[chartData.findIndex(x => parseFloat(x.dt) === max)] = "#3FC8AD";
					createVerticalBarChart({
						rotate:false,
						target:"chart6-1",
						data:chartData,
						dataVal:"dt",
						columnVal:"itm_nm",
						color:colors,
						isShowYaxis:false,
						isSort:false,
						unit:"%",
						tooltipCallback:function(d,i){
							const tooltip = $(this).parents("[data-type=chart6-1-container]").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":chartData[i].itm_nm}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$administStatsMap.utils.addComma(chartData[i].dtOri)}),"명"
									),
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										let parameters = $.extend(true,{},_this.parameters);
										
										parameters.surv_year_list = $administStatsMap.ui.year;
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;										
										parameters.ov_l2_list = chartData[i].order;										
										parameters.ov_l3_list = "P10,P20";
										$administStatsMap.ui.tooltipMap.title=chartData[i].itm_nm;										
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											let alldatas = opt_fnCalc({data:res,trgtId:"OV_L3_ID",except:"P10"});											
											alldatas.forEach((d,index)=>{
												d.adm_cd = d.OV_L1_ID;
												d.region_nm = d.OV_L1_KOR;
											})												
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "DTVAL_CO",
												unit : "%",
												callback:function(data){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년'}),
																$("<h3/>").append("중·장년층 연령구간별 연금가입자 비중",$("<span/>")),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
														},
														endCallback:function(){
															$("#tooltip-map-tooltip").empty().append(
																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																	$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.tooltipMap.title}),
																	$("<a/>",{"class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-tooltip').hide(); 
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																),
																$("<div/>",{"class":"modal__body"}).append(
																	$("<p/>").append(
																		$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																	),
																	$("<p/>").append(
																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(chartData[i].dt)}),"%"
																	)
																)
															);
															$("#tooltip-map-tooltip").show();
														}
													});
												}
											},alldatas,parameters);
										});
									})
								)
							);
							tooltip.show();
						}
					});
				}
				common_loading(false);
			});
		},
		chart2: function(){
			$("#chart6-2").empty();
			const _this = this;
			let admCd,columns=[],groupKey,title;
			if(_this.tabIndex==0){				
				groupKey = "TBL_ID";
				columnNames = ["중장년층"];
				columns = ["DT_1MA0001"];
				title = "년 지역별 중·장년층 연금가입 비중";
				this.parameters.ov_l1_list = $administStatsMap.consts.sidoAll;			
			}else if(_this.tabIndex==1){				
				groupKey = "OV_L2_ID";
				columnNames = ["40~44세","45~49세","50~54세","55~59세","60~64세"];
				columns = ["G1001","G1002","G1003","G1004","G1005"];
				title = "년 지역별 중·장년층 연령구간별 연금가입자 비중";
				this.parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
				this.parameters.ov_l2_list = "G10,G1001,G1002,G1003,G1004,G1005";
			}
			
			$administStatsMap.utils.getTotsurvStatData(
				$.extend(true,{},this.parameters),function(data){
					
					
					let chartData = [];
					let total = 0;	
					if(_this.tabIndex==0){
						$("#chart6-2-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);						
						$("#chart6-2-legend").hide();
						let datas = [];
						for (let i = 0; i < data.length; i++) {
							let s = data[i];
							s.DTVAL_CO = s.DTVAL_CO * 1;
							for (let j = 0; j < data.length; j++) {
								let t = data[j];
								t.DTVAL_CO = t.DTVAL_CO * 1;
								if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
									if (s.OV_L3_ID != "P10" && t.OV_L3_ID == "P10") {
										s.DTVAL_CO = s.DTVAL_CO / t.DTVAL_CO * 100;
										datas.push(s);
									}
								}
							}
						}
						
						datas.forEach(item=>{																		
							if(item.OV_L1_ID != "00") {
								const value = parseFloat(item.DTVAL_CO);
								chartData.push({
									itm_nm:$administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR),
									dt:value.toFixed(1)
								});
								total+=value;
							}
						});
											
						const avg = total/chartData.length-1;
						
						chartData = chartData.sort(function(a, b) { 
							  return a.dt < b.dt ? -1 : a.dt > b.dt ? 1 : 0;
						});
						
						let max = 0;
						let colors = chartData.map((d,index)=>{
							max = Math.max(max,parseFloat(d.dt));							
							return "#747474";
						});
						colors[chartData.findIndex(x => parseFloat(x.dt) === max)] = "#ff5252";

//						$("#chart6-2-avg-text").empty().append(
//							$("<p/>").append(
//								$("<span/>",{"text":"평균"}),
//								avg.toFixed(1)+"%"
//							)
//						);	
						
						createVerticalBarChart({
							rotate:false,
							target:"chart6-2",
							data:chartData,
							dataVal:"dt",
							columnVal:"itm_nm",
							color:colors,
							isShowYaxis:false,
							unit:"%",
							tooltipCallback:function(d,i){
								const tooltip = $(this).parents("[data-type=chart6-2-container]").find("[data-type=tooltip]:last");
								tooltip.empty();
								tooltip.append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
										$("<h3/>",{"class":"modal__tit","text":"연금가입 비중"}),
										$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
											$(this).parents('[data-type=tooltip]').hide();
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									),
									$("<div/>",{"class":"modal__body"}).append(
										$("<p/>").append(
											$("<span/>",{"class":"color-blue","text":chartData[i].itm_nm})
										),
										$("<p/>").append(
											$("<span/>",{"class":"color-red","text":chartData[i].dt}),"%"
										),
										$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
											$administStatsMap.ui.tooltipMap.mapTotalVal=null;
											let parameters = $.extend(true,{},_this.parameters);
											parameters.tbl_id_list = data[i].TBL_ID;
											parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
											parameters.surv_year_list = $administStatsMap.ui.year;
											parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
											$administStatsMap.ui.tooltipMap.title="연금가입 비중";										
											$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
												let alldatas = opt_fnCalc({data:res,trgtId:"OV_L3_ID",except:"P10"});											
												alldatas.forEach((d,index)=>{
													d.adm_cd = d.OV_L1_ID;
													d.region_nm = d.OV_L1_KOR;
												})
												$administStatsMap.ui.map["tooltip-map"].setStatsData({
													adm_cd: "00",
													admCdKey:"adm_cd",
													showData : "DTVAL_CO",
													unit : "%",
													callback:function(data){
														$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//														$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
														$administStatsMap.ui.tooltipMap.show({
															tooltipCallback:function(){
																$("#tooltip-map-modal-title").empty().append(
																	$("<h3>",{"text":$administStatsMap.ui.year+'년'}),
																	$("<h3/>").append("지역별 중·장년층 연금가입 비중"),
																	$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-container').hide();
																		$('.dim').hide();
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																);
															},
															endCallback:function(){
																$("#tooltip-map-tooltip").empty().append(
																	$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																		$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.tooltipMap.title}),
																		$("<a/>",{"class":"btn__cancel"}).click(function(){
																			$('#tooltip-map-tooltip').hide(); 
																			return false;
																		}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																	),
																	$("<div/>",{"class":"modal__body"}).append(
																		$("<p/>").append(
																			$("<span/>",{"class":"color-blue","text":chartData[i].itm_nm})
																		),
																		$("<p/>").append(
																			$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(chartData[i].dt)}),"%"
																		)
																	)
																);
																$("#tooltip-map-tooltip").show();
															}
														});
													}
												},alldatas,parameters);
											});
										})
									)
								);
								tooltip.show();
							}
						});
					} else if(_this.tabIndex==1) {
						$("#chart6-2-title").data("append-text",title).empty().append($administStatsMap.ui.year+title);
						$("#chart6-2-legend").show();
						let datas = [];
						let calcDatas = [];
						const toJson = $administStatsMap.utils.arrayToJson({
							data : data,
							key : "OV_L1_ID",
							key2 : "OV_L2_ID"
						});
						
						for (let i = 0; i < data.length; i++) {
							let s = data[i];
							for (let j = 0; j < data.length; j++) {
								let t = data[j];
								if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
									if (s.OV_L2_ID == t.OV_L2_ID && s.OV_L3_ID != "P10" && t.OV_L3_ID == "P10") {
										s.DTVAL_CO_ORI = s.DTVAL_CO;
										s.DTVAL_CO = (s.DTVAL_CO / t.DTVAL_CO * 100).toFixed(1);
										calcDatas.push(s);
									}
								}
							}
						}
						
						let rank = [];
						for (let i = 0; i < data.length; i++) {
							if(data[i].OV_L2_ID == "G10" && data[i].OV_L3_ID == "P10"){
								rank.push(data[i]);
							}
						}
						
						let total = 0;
						calcDatas.forEach(function(item,index) {									
							if(columns.indexOf(item.OV_L2_ID)>-1){								
								datas[item.OV_L1_ID] = datas[item.OV_L1_ID]||{};
								datas[item.OV_L1_ID][item[groupKey]] = parseFloat(item.DTVAL_CO);								
								datas[item.OV_L1_ID][index%5] = parseFloat(item.DTVAL_CO_ORI);								
								datas[item.OV_L1_ID].total = datas[item.OV_L1_ID].total||0;
								datas[item.OV_L1_ID].total += datas[item.OV_L1_ID][item[groupKey]];
								datas[item.OV_L1_ID].category = $administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR);
								datas[item.OV_L1_ID].admCd = item.OV_L1_ID;
								datas[item.OV_L1_ID].dataAll = 0;
								if(item.OV_L1_ID!="00"&&item.OV_L1_ID!="000"){
									total+=datas[item.OV_L1_ID][item.OV_L2_ID];
								}
							}					
						});
						
						datas.forEach(item => {
							for(let i=0 ;i< rank.length; i++){
								if(item.admCd == rank[i].OV_L1_ID){
									item.dataAll = rank[i].DTVAL_CO;
								}
							}
							
						});
						
						datas = Object.keys(datas).filter(key=>key!="00"&&key!="00").map(key=>datas[key]).sort(function (a, b) {
							return ((b[0]+b[1]+b[2]+b[3]+b[4])/b.dataAll)-((a[0]+a[1]+a[2]+a[3]+a[4])/a.dataAll)
							//return b.total-a.total;
						});		
						
						const categories = datas.map(item=>item.category);
//						const avg = total/datas.length;
//						$("#chart6-2-avg-text").empty().append(
//							$("<p/>").append(
//								$("<span/>",{"text":"평균"}),
//								$.heum.setThousandSeparator(parseInt(avg))+"명"
//							)
//						);
						createStackBarChartForPer({
							unit:"%",
							target:"chart6-2",
							data:datas,
							columns:columns,
							colors:["#7F7F7F","#A9B4BC","#6688A0", "#447291","#225B82","#255363"],
							viewTotalColumn:function(data){
								/*
								var avg = (data.total/columns.length).toFixed(1);
								return avg;
								*/
								let sum = 0;
								for(let i=0;i<5;i++){
									sum += data[i];
								}
								return (sum/data.dataAll*100).toFixed(1);
							},
							category:categories,tooltipCallback:function(d,i){
						
							const dataIndex = $(this).parent("[data-type=eventGroup]").data("value");
							const tooltip = $(this).parents("[data-type=chart6-2-container]").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":columnNames[dataIndex]}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":categories[i]})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(datas[i][columns[dataIndex]])}),"%"
									),
//									"(<span class='color-red'>"+((datas[i][columns[dataIndex]]/datas[i].total)*100).toFixed(1)+"</span>%)",
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										$administStatsMap.ui.tooltipMap.mapTotalVal=null;
										let parameters = $.extend(true,{},_this.parameters);
										parameters.tbl_id_list = data[i].TBL_ID;
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
										parameters.ov_l2_list = columns[dataIndex];
										parameters.surv_year_list = $administStatsMap.ui.year;
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
										$administStatsMap.ui.tooltipMap.title = columnNames[dataIndex];
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											datas.forEach(item=>{
												res.forEach(sel=>{
													if(sel.OV_L1_ID == item.admCd) {
														sel.DTVAL_CO = item[columns[dataIndex]];
													}
												})
											})
											let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : "%",
												callback:function(data){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년'}),
																$("<h3/>").append(
																	"지역별 중·장년층 연령구간별 연금가입자 비중"
																),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
														},
														endCallback:function(){
															$administStatsMap.ui.map["tooltip-map"].dataBoundary.eachLayer(function(layer){
																if(layer.feature.properties.adm_cd==datas[i].admCd){
																	layer.fire("click");
																}
															})
														}
													});
													$("#tooltip-map-tooltip").show();
												}
											},resultMapData.result.mapData,parameters);
										});
									})
								)
							);
							tooltip.show();
						}});
					}
				}
			);
		},
		chart3:function(){
		
			$("#chart6-3").empty();
			const _this = this;
			let admCd,columns=[],groupKey,title;
			if(_this.tabIndex==0){
				admCd = $administStatsMap.consts.sidoAll;
				groupKey = "TBL_ID";
				columnNames = ["중장년층"];
				columns = ["DT_1MA0001"];
				title = "연도별  중·장년층 연금가입 비중";
				this.parameters.ov_l1_list = $administStatsMap.ui.admCd;				
				this.parameters.surv_year_list = $administStatsMap.ui.yearList.join(",");
			} else if(_this.tabIndex==1) {
				admCd = $administStatsMap.consts.sidoAll3;
				groupKey = "OV_L2_ID";
				columns = ["20","10"];
				title = "연도별 중·장년층 연령구간별 연금가입자 비중 ";
				series=[{"code":"G1001","name":"40~44세",data:[]},{"code":"G1003","name":"45~49세",data:[]},{"code":"G1003","name":"50~54세",data:[]},{"code":"G1004","name":"55~59세",data:[]},{"code":"G1005","name":"60~64세",data:[]}]
				this.parameters.surv_year_list = $administStatsMap.ui.yearList.join(",");
				this.parameters.ov_l1_list = $administStatsMap.ui.admCd;
			}
			
			$("#chart6-3-title").data("append-text",title).empty().append(title);
			
			if(_this.tabIndex==0){
				
				$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data){										
					
					let datas = [];
					for (let i = 0; i < data.length; i++) {
						let s = data[i];
						s.DTVAL_CO = s.DTVAL_CO * 1;
						for (let j = 0; j < data.length; j++) {
							let t = data[j];
							t.DTVAL_CO = t.DTVAL_CO * 1;
							if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
								if (s.OV_L3_ID != "P10" && t.OV_L3_ID == "P10") {
									s.DTVAL_CO = (s.DTVAL_CO / t.DTVAL_CO * 100).toFixed(1);
									datas.push(s);
								}
							}
						}
					}
					
					createLineChart({target:"chart6-3", data:datas, color:"#7419B1", dataVal:"DTVAL_CO", columnVal:"PRD_DE",unit:"%",tooltipCallback:function(d,i){
						const beforeDataObj = datas[i-1];
						let ratio;
						if(beforeDataObj){
							const beforeData = beforeDataObj.DTVAL_CO;
							let ratColor;
							let ca = "";
							let rat = d.DTVAL_CO - beforeData;
							if(rat>0){
								ca = "증가↑";
								ratColor="red";
							}else if(rat<0){
								ca = "감소↓";
								ratColor="blue";
							}
							ratio = "(전년 대비 <span class='color-"+ratColor+"'>"+Math.abs(rat).toFixed(1)+"</span>%p "+ca+")";
						}
						const tooltip = $("#chart6-3-container").find("[data-type=tooltip]");
						tooltip.empty();
						tooltip.append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								$("<h3/>",{"class":"modal__tit","text":data[i].PRD_DE+"년 연금가입 비중"}),
								$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
									$(this).parents('[data-type=tooltip]').hide();
									return false;
								}).append($("<span/>",{"class":"btn-close btn-close--black"}))
							),
							$("<div/>",{"class":"modal__body"}).append(
								$("<p/>").append(
									$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
								),
								$("<p/>").append(
									$("<span/>",{"class":"color-red","text":d.DTVAL_CO}),"%"
								),
								ratio,
								$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
									$administStatsMap.ui.tooltipMap.mapTotalVal=null;
									let parameters = $.extend(true,{},_this.parameters);
									parameters.tbl_id_list = data[i].TBL_ID;
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
									parameters.surv_year_list = $administStatsMap.ui.year;									
									parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
									$administStatsMap.ui.tooltipMap.title="연금가입 비중";
									$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
									parameters.surv_year_list = $administStatsMap.ui.year;
										let alldatas = opt_fnCalc({data:res,trgtId:"OV_L3_ID",except:"P10"});											
										alldatas.forEach((d,index)=>{
											d.adm_cd = d.OV_L1_ID;
											d.region_nm = d.OV_L1_KOR;
										})
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "DTVAL_CO",
											unit : "%",
											callback:function(d){
												$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//												$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														$("#tooltip-map-modal-title").empty().append(
															$("<h3>",{"text":datas[i].PRD_DE+"년"}),
															$("<h3/>").append("연도별 중·장년층 연금가입 비중"),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
													},
													endCallback:function(){
														$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt(datas[i].PRD_DE.replace("년",""));
														$("#tooltip-map-tooltip").empty().append(
															$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.tooltipMap.title}),
																$("<a/>",{"class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-tooltip').hide(); 
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															),
															$("<div/>",{"class":"modal__body"}).append(
																$("<p/>").append(
																	$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																),
																$("<p/>").append(
																	$("<span/>",{"class":"color-red","data-id":"value","text":datas[i].DTVAL_CO}),"%"
																)
															)
														);
														$("#tooltip-map-tooltip").show();
													}
												});
											}
										},alldatas,parameters);
									});
								})
							)
						).show();
						}});
						}
					);
				
				
				
			} else if(_this.tabIndex==1) {
				
				$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data){
								
				let categories = $.extend(true,[],$administStatsMap.ui.yearList).sort().map(year=>year+"년");
				
				let datas = [];
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					for (let j = 0; j < data.length; j++) {
						let t = data[j];
						if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
							if (s.OV_L2_ID == t.OV_L2_ID && s.OV_L3_ID != "P10" && t.OV_L3_ID == "P10") {
								s.DTVAL_CO_ORI = s.DTVAL_CO;
								s.DTVAL_CO = s.DTVAL_CO / t.DTVAL_CO * 100;
								datas.push(s);
							}
						}
					}
				}
				
				datas.forEach(function(d){					
					if(d.OV_L2_ID == "G1001") {
						series[0].data.push(parseFloat(d.DTVAL_CO.toFixed(1)));
					} else if(d.OV_L2_ID == "G1002") {
						series[1].data.push(parseFloat(d.DTVAL_CO.toFixed(1)));
					} else if(d.OV_L2_ID == "G1003") {
						series[2].data.push(parseFloat(d.DTVAL_CO.toFixed(1)));
					} else if(d.OV_L2_ID == "G1004") {
						series[3].data.push(parseFloat(d.DTVAL_CO.toFixed(1)));
					} else if(d.OV_L2_ID == "G1005") {
						series[4].data.push(parseFloat(d.DTVAL_CO.toFixed(1)));
					} 
				});
				
					
				createMultiLineChart({
					target:"chart6-3",
					colors:["#7F7F7F","#A9B4BC","#6688A0", "#447291","#225B82","#255363"],
					categories,
					series,
					dataLabelsFormater:function(){
						if(this.point.index==series[this.colorIndex].data.length-1){
							return $.heum.setThousandSeparator(this.y)+"%";
						}
					},
					tooltipCallback:function({name,data,event}){
						const beforeData = series[event.point.colorIndex].data[event.point.index-1];
						let ratio;
						if(beforeData){
							let rat = data - beforeData;
							let ca = "";
							let ratColor;
							if(rat>0){
								ca = "증가↑";
								ratColor="blue";
							}else if(rat<0){
								ca = "감소↓";
								ratColor="red";
							}
							ratio = "(전년 대비 <span class='color-"+ratColor+"'>"+Math.abs((rat).toFixed(1))+"</span>%p "+ca+")";
						}
						const tooltip = $("#chart6-3-container").find("[data-type=tooltip]:last");
						tooltip.empty();
						tooltip.append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								$("<h3/>",{"class":"modal__tit","text":name+" "+series[event.point.colorIndex].name}),
								$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
									$(this).parents('[data-type=tooltip]').hide();
									return false;
								}).append($("<span/>",{"class":"btn-close btn-close--black"}))
							),
							$("<div/>",{"class":"modal__body"}).append(
								$("<p/>").append(
									$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
								),
								$("<p/>").append(
									$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(data)}),"%"
								),
								ratio,
								$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
									let parameters = $.extend(true,{},_this.parameters);									
									parameters.surv_year_list = parseInt(categories[event.point.index].replace("년",""));
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
									parameters.ov_l2_list = series[event.point.colorIndex].code;
									parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
									$administStatsMap.ui.tooltipMap.title="";
									$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {										
										let alldatas = opt_fnCalc({data:res,trgtId:"OV_L3_ID",except:"P10"});
										alldatas.forEach((d,index)=>{
											d.adm_cd = d.OV_L1_ID;
											d.region_nm = d.OV_L1_KOR;
										});										
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "DTVAL_CO",
											unit : "%",
											callback:function(d){
												$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//												$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														$administStatsMap.ui.tooltipMap.title = series[event.point.colorIndex].name;
														$("#tooltip-map-modal-title").empty().append(
															$("<h3>",{"text":categories[event.point.index]}),
															$("<h3/>").append(
																title
															),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
														$("#tooltip-map-tooltip").empty().append(
															$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																$("<h3/>",{"class":"modal__tit","text":series[event.point.colorIndex].name}),
																$("<a/>",{"class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-tooltip').hide(); 
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															),
															$("<div/>",{"class":"modal__body"}).append(
																$("<p/>").append(
																	$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
																),
																$("<p/>").append(
																	$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(data)}),"%"
																)
															)
														);
													},
													endCallback:function(){														
														$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt(categories[event.point.index].replace("년",""));
														$("#tooltip-map-tooltip").show();
													}
												});
											}
										},alldatas,parameters);
									});
								})
							)
						);
						tooltip.show();
					}
				});
			});
			}
		},
	},
}
const opt_fnCalc = ({data,trgtId,except})=>{
	let datas = [];
	if(trgtId == "OV_L2_ID") {				
		for (let i = 0; i < data.length; i++) {
			let s = JSON.parse(JSON.stringify(data[i]));
			s.DTVAL_CO = s.DTVAL_CO * 1;
			for (let j = 0; j < data.length; j++) {
				let t = JSON.parse(JSON.stringify(data[j]));
				t.DTVAL_CO = t.DTVAL_CO * 1;
				if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
					if (s.OV_L2_ID != except && t.OV_L2_ID == except) {
						s.DTVAL_CO_ORI = s.DTVAL_CO;
						s.DTVAL_CO = (s.DTVAL_CO / t.DTVAL_CO * 100).toFixed(1);
						datas.push(s);
					}
				}
			}
		}		
	} else if(trgtId == "OV_L3_ID") {
		for (let i = 0; i < data.length; i++) {
			let s = JSON.parse(JSON.stringify(data[i]));
			s.DTVAL_CO = s.DTVAL_CO * 1;
			for (let j = 0; j < data.length; j++) {
				let t = JSON.parse(JSON.stringify(data[j]));
				t.DTVAL_CO = t.DTVAL_CO * 1;
				if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
					if (s.OV_L3_ID != except && t.OV_L3_ID == except) {
						s.DTVAL_CO_ORI = s.DTVAL_CO;
						s.DTVAL_CO = (s.DTVAL_CO / t.DTVAL_CO * 100).toFixed(1);
						datas.push(s);
					}
				}
			}
		}
	} else if(trgtId == "OV_L4_ID") {			
		for (let i = 0; i < data.length; i++) {
			let s = JSON.parse(JSON.stringify(data[i]));
			s.DTVAL_CO = s.DTVAL_CO * 1;
			for (let j = 0; j < data.length; j++) {
				let t = JSON.parse(JSON.stringify(data[j]));
				t.DTVAL_CO = t.DTVAL_CO * 1;
				if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
					if (s.OV_L4_ID != except && t.OV_L4_ID == except) {
						s.DTVAL_CO_ORI = s.DTVAL_CO;
						s.DTVAL_CO = (s.DTVAL_CO / t.DTVAL_CO * 100).toFixed(1);
						datas.push(s);
					}
				}
			}
		}
	}
	
	return datas;
}

