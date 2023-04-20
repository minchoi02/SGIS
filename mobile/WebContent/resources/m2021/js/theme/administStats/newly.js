const openKosis = (tblId) =>{
	let isFail = true;
	tblId.split(",").forEach(id=>{
		if ($administStatsMap.ui.apiParam.hasOwnProperty(id)) {
			$administStatsMap.ui.apiParam[id].opt_stattbUrls.forEach(url=>{
				isFail = false;
				window.open(url, "_blank");
			});
		} else {
			console.group("통계표 조회 불가");
			console.log("TBL_ID[" + id + "]" + " API 파라미터 없음");
			console.groupEnd();
		}
	});
	if (isFail) {
		alert("통계표가 연결되어 있지 않습니다.");
	}	
};
$(document).ready(function(){
	$("[data-kosis]").click(function(){
		const chart = $(this).data("kosis");
		const tabIndex = $("#"+chart+"-sub-tab li").index($("#"+chart+"-sub-tab li.on"));
		if(chart=="main1"){
			if(tabIndex==0){
				$(this).parent().children("[data-id=main1-more]").toggle();
			}else if(tabIndex==1){
				openKosis("DT_1NW2023");
			}else if(tabIndex==2){
				openKosis("DT_1NW2017");
			}
		}else if(chart=="main2"){
			if(tabIndex==0){
				openKosis("DT_1NW2026");
			}else if(tabIndex==1){
				openKosis("DT_1NW2028");
			}
		}else if(chart=="main3"){
			if(tabIndex==0){
				//openKosis("DT_1NW2024");
				window.open("https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1NW2024&conn_path=I2", "_blank");
			}else if(tabIndex==1){
				window.open("https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1NW2032&conn_path=I2", "_blank");
				//openKosis("DT_1NW2032");
			}
		}
		return false;
	});
});
function createTotSur(){
	//$("#main-tab li:last").hide();
	//$("#main-tab").removeClass("col-3").addClass("col-2");
	setSummaryData();
	//$("#main-tab li:first").trigger("click");
}
/**
 * @name        : setSummaryData 
 * @description : 총괄 요약정보 데이터 셋팅 
 */
function setSummaryData(){
	const themeInfo = $administStatsMap.ui.themeData[$administStatsMap.ui.theme];
	const parameters = $.extend(true, {
		surv_year_list : $administStatsMap.ui.year
	}
	, $administStatsMap.ui.apiParam["DT_1NW1001"]
	, themeInfo.mapData.getDataParameters()
	);
	parameters.tbl_id_list = "DT_1NW1001,DT_1NW3034,DT_1NW2034"
	parameters.ov_l1_list = $administStatsMap.ui.admCd;
	common_loading(true);
	$.ajax({
//		method: "POST",
		method: "GET",
		async: true,
		url: sgis4thApiPath,
//		url: sgisContextPath + "/view/kosisApi/TotsurvStatData.do",
		data: parameters,
		dataType: "json",
		success: function(res) {
			/*
				DT_1NW3034 : 재혼
				DT_1NW2034 : 초혼
			*/
			let chartDatas = {};
			let total = {
				current : 0,
				before : null
			};
			res.forEach(item=>{
				if(item.OV_L1_ID==$administStatsMap.ui.admCd){
					const _get = ({key}) => {
						if(item.TBL_ID==key){
							if(chartDatas[key]===undefined){
								chartDatas[key] = {
									current : null,
									before : null
								};
							}
							const value = parseFloat(item.DTVAL_CO);
							if($administStatsMap.ui.year==item.PRD_DE){
								chartDatas[key].current = value;
								if(key=="DT_1NW2034"||key=="DT_1NW3034"){
									total.current+=value;
								}
							}else if($administStatsMap.ui.year-1==item.PRD_DE){
								chartDatas[key].before = value;
								if(key=="DT_1NW2034"||key=="DT_1NW3034"){
									if(total.before==null){
										total.before=0;
									}
									total.before+=value;
								}
							}
						}
					};
					_get({key:item.TBL_ID});
				}
			});
			const _setData = ({key,data}) =>{
				if(data){
					$("[data-id="+key+"-number]").text($.heum.setThousandSeparator(data.current));
					if(data.before){
						const v = data.current-data.before;
						const rtv = (v/data.before*100);
						const rt = rtv.toFixed(1);
						$("[data-id="+key+"-rt]").removeClass("state-up state-down").text(" "+Math.abs(rt)+"%");
						if(rtv>0){
							$("[data-id="+key+"-rt]").addClass("state-up");
						}else if(rtv<0){
							$("[data-id="+key+"-rt]").addClass("state-down");
						}
					}
				}
			};
			_setData({key:"total",data:chartDatas.DT_1NW1001});
			_setData({key:"DT_1NW2034",data:chartDatas.DT_1NW2034});
			_setData({key:"DT_1NW3034",data:chartDatas.DT_1NW3034});
			chartDatas.total = total;
			
			let mainKey = "main" + ($("ul.administration__tab.col-3 li.on").index()+1);
			
			$administStatsMap.chart[mainKey].common();
		},
		complete : function(){
			common_loading(false);
		}
	});
}
$administStatsMap.chart = {
	main1 : {
		tabIndex:null,
		tbl_id:null,
		parameters : null,
		common: function(){
			$("[data-type=chart-container]").find("[data-type=tooltip]").hide();
			this.tabIndex = $("#main1-sub-tab li").index($("#main1-sub-tab li.on"));
			if(this.tabIndex==0){
				this.tbl_id = "DT_1NW1001,DT_1NW2034,DT_1NW3034";
				this.parameters = {
					surv_year_list : $administStatsMap.ui.year,
					org_id_list : "101",
					tbl_id_list : this.tbl_id,
					list_var_ord_list : "",
					char_itm_id_list : "T10",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : $administStatsMap.ui.admCd,
					ov_l2_list : "",
					ov_l3_list : "",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
				};
			}else if(this.tabIndex==1){
				this.tbl_id = "DT_1NW2023";
				this.parameters = {
					surv_year_list : $administStatsMap.ui.year,
					org_id_list : "101",
					tbl_id_list : this.tbl_id,
					list_var_ord_list : "",
					char_itm_id_list : "T10",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : ($administStatsMap.ui.admCd == "00" ? "000" : "2" + $administStatsMap.ui.admCd),
					ov_l2_list : "00,10,20,30",
					ov_l3_list : "",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
				};
			}else if(this.tabIndex==2){
				this.tbl_id = "DT_1NW2017";
				this.parameters = {
					surv_year_list : $administStatsMap.ui.year,
					org_id_list : "101",
					tbl_id_list : "DT_1NW2017",
					list_var_ord_list : "",
					char_itm_id_list : "T3",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : $administStatsMap.consts.sidoAll2,
					ov_l2_list : "",
					ov_l3_list : "",
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
			let colors, title, unit;
			let itm_nm;
			$("[id^=chart1-1-][id$=legend]").hide();
			$("#chart1-1-"+this.tabIndex+"-legend").show();
			if(this.tabIndex==0){
				title = "혼인 종류별 신혼부부 수";
				colors = ["#ff5253", "#23b7d1"];
				itm_nm = "CHAR_ITM_NM";
				
			}else if(this.tabIndex==1){
				title = "맞벌이여부별 초혼 신혼부부 수";
				colors = ["#23b7d1","#ff5253", "#333"];
				itm_nm = "OV_L2_KOR";
			}else if(this.tabIndex==2){
				title = "초혼 신혼부부 평균 출생아 수";
				$("#chart1-1").height("250px");
			}else{
				return;
			}
			$("#chart1-1-title").data("append-text","년 "+title).empty().append($administStatsMap.ui.year+"년 "+title/*,$("<span/>",{"text":"(단위 : 쌍)"}))*/);
			const _this = this;
			$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data, param) {
				let chartData = [];
				if(_this.tabIndex==2){
					data = data.sort(function (a, b) {
						return parseFloat(b.DTVAL_CO)-parseFloat(a.DTVAL_CO);
					});
					let total = 0;
					let value00;
					data.forEach(item=>{
						const value = parseFloat(item.DTVAL_CO);
						if(item.OV_L1_ID=="000"){
							value00=value;
						}else{
							chartData.push({
								itm_nm:$administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR),
								dt:value,
								adm_cd:item.OV_L1_ID.substring(1,3),
								TBL_ID:item.TBL_ID
							});
							total+=value;
						}
					});
					let viewData = chartData.slice(0,3);
//					const avg = (total/chartData.length).toFixed(2);
					viewData.push({itm_nm:"전국",dt:value00,adm_cd:"00"});
					viewData = viewData.concat(chartData.slice(chartData.length-3,chartData.length));
					createVerticalBarChart({
						unit:"명",
						rotate:false,
						target:"chart1-1",
						data:viewData,
						dataVal:"dt",
						columnVal:"itm_nm",
						color:["#e2658f","#e2658f","#e2658f", "#b7b7b7","#35829e","#35829e","#35829e"],
						isShowYaxis:false,
						tooltipCallback:function(d,i){
							const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":"평균 출생아 수"}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":viewData[i].itm_nm}),
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":viewData[i].dt}),"명",
									),
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										//$administStatsMap.ui.tooltipMap.mapTotalVal = total;
										$administStatsMap.ui.tooltipMap.mapTotalVal = 0;
										$administStatsMap.ui.tooltipMap.title = "평균 출생아 수";
										let parameters = $.extend(true,{},_this.parameters);
										parameters.tbl_id_list = viewData[i].TBL_ID;
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll3;
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : "명",
												callback:function(data){
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
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
															if(viewData[i].adm_cd=="00"){
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
																			$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.tooltipMap.selectedAdmNm})
																		),
																		$("<p/>").append(
																			$("<span/>",{"class":"color-red","data-id":"value","text":parseFloat(viewData[i].dt)}),"명"
																		)
																	)
																);
																$("#tooltip-map-tooltip").show();
															}else{
																$administStatsMap.ui.map["tooltip-map"].dataBoundary.eachLayer(function(layer){
																	if(layer.feature.properties.adm_cd==viewData[i].adm_cd){
																		layer.fire("click");
																	}
																});
															}
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
				}else{
					let total = 0;
					let sumValue;
					let itmNmObj = {
						"DT_1NW1001":"전체",
						"DT_1NW2034":"초혼",
						"DT_1NW3034":"재혼"
					};
					let itmNmIndex;
					if(_this.tabIndex==0){
						itmNmIndex = ["DT_1NW2034","DT_1NW3034"];
					}else{
						itmNmIndex = ["10","20","30"];
					}
					data.forEach(item=>{
						const value = parseFloat(item.DTVAL_CO);
						const _proc=()=>{
							if(_this.tabIndex == 1 && item.OV_L2_ID == '00'){
							} else {
								let opt = {
										itm_nm:_this.tabIndex==0?itmNmObj[item.TBL_ID]:item[itm_nm],
												dt:value,
												TBL_ID:item.TBL_ID,
												original : item
								};
								if(_this.tabIndex==0){
									opt.index = itmNmIndex.indexOf(item.TBL_ID);
									opt.legendIndex = opt.index;
									opt.color = colors[itmNmIndex.indexOf(item.TBL_ID)];
								}else{
									opt.color = colors[itmNmIndex.indexOf(item.OV_L2_ID)];
								}
								chartData.push(opt);
								total+=value;
							}
						};
						if(_this.tabIndex==0){
							if(item.TBL_ID=="DT_1NW1001"){
								sumValue=item.DTVAL_CO;
							}else{
								_proc();
							}
						}else{
							_proc();
						}
					});
					
					createDonutChart({isShowLegend:false,isDisabledLegendClick:_this.tabIndex!=1,size:"70%",data:chartData,target:"chart1-1",colorData:colors,unit:"쌍",sumText:"전체",sumValue,isShowLegendValue:false,tooltipCallback:function(d,i){
						if(_this.tabIndex==1&&chartData[i].original.OV_L2_ID=="30"){
							return;
						}
						const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]");
						tooltip.empty();
						let ratio,isMapViewButton = true;
						if(_this.tabIndex==1){
//							ratio = $("<p/>",{"html":"(구성비 <span class='color-red'>"+((d.value / total) * 100).toFixed(2)+"</span>%)"});
							if(chartData[i].original.OV_L2_ID=="30"){
								isMapViewButton = false;
							}
						}
						let mapViewButton = isMapViewButton===false?null:$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
								$administStatsMap.ui.tooltipMap.mapTotalVal=0;
								let parameters = $.extend(true,{},_this.parameters);
								parameters.tbl_id_list = chartData[i].TBL_ID;
								if(_this.tabIndex==0){
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
								}else{
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll2;
									parameters.ov_l2_list = chartData[i].original.OV_L2_ID;
								}
								parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
								$administStatsMap.ui.tooltipMap.title = chartData[i].itm_nm;
								$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
									let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
									$administStatsMap.ui.tooltipMap.mapTotalVal = resultMapData.result.mapData.filter(item=>item.adm_cd=="00")[0].dt;
									$administStatsMap.ui.map["tooltip-map"].setStatsData({
										adm_cd: "00",
										admCdKey:"adm_cd",
										showData : "dt",
										unit : "쌍",
										callback:function(data){
											$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//												$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
											$administStatsMap.ui.tooltipMap.show({
												tooltipCallback:function(){
													$("#tooltip-map-modal-title").empty().append(
														$("<h3>",{"text":$administStatsMap.ui.year+'년 '}),
														$("<h3/>").append(
															title
															//,$("<span/>",{"text":" - "+chartData[i].itm_nm})
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
																$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(d.value)}),"쌍"
															)
														)
													);
												}
											});
											$("#tooltip-map-tooltip").show();
										}
									},resultMapData.result.mapData,parameters);
								});
							})
						tooltip.append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								$("<h3/>",{"class":"modal__tit","text":chartData[i].itm_nm+" 신혼부부 수"}),
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
									$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(d.value)}),"쌍"
								),
								ratio,
								mapViewButton
							)
						).show();
					},totalCallback:function(){
						if(_this.tabIndex==0){
							const tooltip = $("#chart1-1").parents("[data-type=chart-container]").find("[data-type=tooltip]");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":"전체 신혼부부 수"}),
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
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(sumValue)}),"쌍"
									),
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										$administStatsMap.ui.tooltipMap.mapTotalVal=null;
										let parameters = $.extend(true,{},_this.parameters);
										parameters.tbl_id_list = "DT_1NW1001";
										if(_this.tabIndex==0){
											parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
										}else{
											parameters.ov_l1_list = $administStatsMap.consts.sidoAll3;
										}
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
										$administStatsMap.ui.tooltipMap.title = "전체";
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : "쌍",
												callback:function(data){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
	//												$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년 '}),
																$("<h3/>").append(
																	title
																	//,$("<span/>",{"text":" - 전체"})
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
																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(sumValue)}),"쌍"
																	)
																)
															);
														}
													});
													$("#tooltip-map-tooltip").show();
												}
											},resultMapData.result.mapData,parameters);
										});
									})
								)
							).show();
						}
					},
					dataLabelFormatter:function(){
						if(_this.tabIndex==0){
							return (this.y / parseFloat(sumValue) * 100).toFixed(1)+"%";
						}else{
							return this.percentage.toFixed(1)+"%";
						}
					}});
				}
			
			});
		},
		chart2: function(){
			const _this = this;
			let admCd,columns=[],columnNames=[],groupKey,title,chartUnit;
			if(_this.tabIndex==0){
				admCd = $administStatsMap.consts.sidoAll;
				groupKey = "TBL_ID";
				columnNames = ["초혼","재혼"];
				columns = ["DT_1NW2034","DT_1NW3034"];
				title = "지역별 혼인종류별 신혼부부 수";
				chartUnit="쌍";
			}else if(_this.tabIndex==1){
				admCd = $administStatsMap.consts.sidoAll3;
				groupKey = "OV_L2_ID";
				columnNames = ["외벌이","맞벌이","기타"];
				columns = ["20","10","30"];
				title = "지역별 맞벌이여부별 초혼 신혼부부 수";
				chartUnit="쌍";
			}else if(_this.tabIndex==2){
				title = "지역별 초혼 신혼부부 평균 출생아 수";
				chartUnit="명";
			}
			$administStatsMap.utils.getTotsurvStatData(
				$.extend(true,{},this.parameters,{ov_l1_list:admCd}),function(data){
					$("#chart1-2-title").data("append-text","년 "+title).empty().append($administStatsMap.ui.year+"년 "+title/*,$("<span/>",{"text":"(단위 : 쌍)"})*/);
					if(_this.tabIndex==2){
						$("#chart1-2-legend").hide();
						let chartData = [];
						data = data.sort(function (a, b) {
							return parseFloat(b.DTVAL_CO)-parseFloat(a.DTVAL_CO);
						});
						let total = 0;
						data.forEach(item=>{
							const value = parseFloat(item.DTVAL_CO);
							chartData.push({
								itm_nm:$administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR),
								dt:value,
								admCd:item.OV_L1_ID.substring(1,3),
								TBL_ID:item.TBL_ID
							});
							total+=value;
						});
						const avg = (total/chartData.length).toFixed(2);
//						$("#chart1-2-avg-text").empty().append(
//							$("<p/>").append(
//								$("<span/>",{"text":"평균"}),
//								avg+"명"
//							)
//						);
						createVerticalBarChart({
							rotate:false,
							target:"chart1-2",
							data:chartData,
							dataVal:"dt",
							columnVal:"itm_nm",
							unit:chartUnit,
							color:["#ff5252"].concat([...new Array(chartData.length-1)].map(item=>"#747474")),
							isShowYaxis:false,
							avgLineData:avg,
							tooltipCallback:function(d,i){
								const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
								tooltip.empty();
								tooltip.append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
										$("<h3/>",{"class":"modal__tit","text":"평균 출생아 수"}),
										$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
											$(this).parents('[data-type=tooltip]').hide();
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									),
									$("<div/>",{"class":"modal__body"}).append(
										$("<p/>").append(
											$("<span/>",{"class":"color-blue","text":chartData[i].itm_nm}),
										),
										$("<p/>").append(
											$("<span/>",{"class":"color-red","text":chartData[i].dt}),"명",
										),
										$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
											$administStatsMap.ui.tooltipMap.mapTotalVal=null;
											let parameters = $.extend(true,{},_this.parameters);
											parameters.tbl_id_list = chartData[i].TBL_ID;
											parameters.ov_l1_list = $administStatsMap.consts.sidoAll3;
											parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
											$administStatsMap.ui.tooltipMap.title="";
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
																	$("<h3/>").append(title),
																	$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-container').hide();
																		$('.dim').hide();
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																);
															},
															endCallback:function(){
																$administStatsMap.ui.map["tooltip-map"].dataBoundary.eachLayer(function(layer){
																	if(layer.feature.properties.adm_cd==chartData[i].admCd){
																		layer.fire("click");
																	}
																})
															}
														});
													}
												},resultMapData.result.mapData,parameters);
											});
										})
									)
								);
								//tooltip.show();
							}
						});
					}else{
						$("#chart1-2-legend>.legend-box").hide();
						columnNames.forEach(function(name,index){
							$("#chart1-2-legend .legend-label:eq("+index+")").text(name);
							$("#chart1-2-legend>.legend-box:eq("+index+")").css({"display":"inline-block"});
						})
						$("#chart1-2-legend").show();
						let datas = {};
						let total = 0;
						data.forEach(item=>{
							if(columns.indexOf(item[groupKey])>-1||item[groupKey]=="DT_1NW1001"||item[groupKey]=="00"){
								datas[item.OV_L1_ID] = datas[item.OV_L1_ID]||{};
								datas[item.OV_L1_ID][item[groupKey]] = parseFloat(item.DTVAL_CO);
								datas[item.OV_L1_ID].total = datas[item.OV_L1_ID].total||0;
								datas[item.OV_L1_ID].total+=datas[item.OV_L1_ID][item[groupKey]];
								datas[item.OV_L1_ID].category = $administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR);
								datas[item.OV_L1_ID].admCd = item.OV_L1_ID;
								if(item.OV_L1_ID!="00"&&item.OV_L1_ID!="000"&&item[groupKey]!="DT_1NW1001"||item[groupKey]!="00"){
									total+=datas[item.OV_L1_ID][item[groupKey]];
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
//								$.heum.setThousandSeparator(parseInt(avg))+"쌍"
//							)
//						);
						createStackBarChart({unit:chartUnit,target:"chart1-2",data:datas,columns:columns,colors:_this.tabIndex==0?["#ff5253","#23b7d1"]:["#ff5253","#23b7d1","black"],category:categories,viewTotalColumn:function(data){
							if(_this.tabIndex==0){
								return $.heum.setThousandSeparator(data.DT_1NW1001);
							}else{
								return $.heum.setThousandSeparator(data["00"]);
							}
						},avgLineData:avg,tooltipCallback:function(d,i){
							const dataIndex = $(this).parent("[data-type=eventGroup]").data("value");
							if(_this.tabIndex==1&&dataIndex==2){
								return;
							}
							const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":columnNames[dataIndex]+" 신혼부부 수"}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":categories[i]}),
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(datas[i][columns[dataIndex]])}),"쌍",
									),
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										$administStatsMap.ui.tooltipMap.mapTotalVal=0;
										data.filter(item=>item.OV_L1_ID=="00"&&item[groupKey]==columns[dataIndex]).forEach(item=>{
											$administStatsMap.ui.tooltipMap.mapTotalVal+=parseFloat(item.DTVAL_CO);
										});
										let parameters = $.extend(true,{},_this.parameters);
										if(_this.tabIndex==0){
											parameters.tbl_id_list = columns[dataIndex];
											parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
											parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
											$administStatsMap.ui.tooltipMap.title = columnNames[dataIndex];
											$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
												let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
												$administStatsMap.ui.map["tooltip-map"].setStatsData({
													adm_cd: "00",
													admCdKey:"adm_cd",
													showData : "dt",
													unit : "쌍",
													callback:function(data){
														$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
	//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
														$administStatsMap.ui.tooltipMap.show({
															tooltipCallback:function(){
																$("#tooltip-map-modal-title").empty().append(
																	$("<h3>",{"text":$administStatsMap.ui.year+'년 '}),
																	$("<h3/>").append(
																		title
																		//,$("<span/>",{"text":" - "+columnNames[dataIndex]})
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
										}else{
											let mapData = $.extend(true,[],datas);
											
											
											if(dataIndex == 0){
												let sum = 0;
												mapData.forEach(item =>{
													sum += item[20];
												});
												$administStatsMap.ui.tooltipMap.mapTotalVal = sum;
											}else if(dataIndex == 1){
												let sum = 0;
												mapData.forEach(item =>{
													sum += item[10];
												});
												$administStatsMap.ui.tooltipMap.mapTotalVal = sum;
											}
											
											//$administStatsMap.ui.tooltipMap.mapTotalVal = $administStatsMap.ui.mapTotalVal;
											$administStatsMap.ui.tooltipMap.title = columnNames[dataIndex]+" 신혼부부 수";
											
											mapData.forEach(item=>{
												item.dt = item[columns[dataIndex]];
												item.adm_cd = item.admCd.substring(1,3);
												item.region_nm = item.category;
											});
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : "쌍",
												callback:function(data){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년 '}),
																$("<h3/>").append(
																	title
																	//,$("<span/>",{"text":" - "+columnNames[dataIndex]})
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
																if(layer.feature.properties.adm_cd==datas[i].admCd.substring(1,3)){
																	layer.fire("click");
																}
															})
														}
													});
													$("#tooltip-map-tooltip").show();
												}
											},mapData,parameters);
										}
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
			const _this = this;
			let parameters = $.extend(true,{},this.parameters),title;
			parameters.surv_year_list = $administStatsMap.ui.yearList.join(",");
			if(_this.tabIndex==2){
				$("#chart1-3-title").empty().append("연도별 초혼 신혼부부 평균 출생아 수"/*,$("<span/>",{"text":"(단위 : 쌍)"})*/);
				//parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
				parameters.ov_l1_list = ($administStatsMap.ui.admCd == "00" ? "000" : "2" + $administStatsMap.ui.admCd);
				$administStatsMap.utils.getTotsurvStatData(
					parameters,
					function(data){
						data = data.sort(function(a,b){
							return a.PRD_DE-b.PRD_DE;
						})
						data.forEach(d=>{
							d.DTVAL_CO = parseFloat(d.DTVAL_CO);
							d.PRD_DE = d.PRD_DE+"년";
						});
						createLineChart({unit:"명",target:"chart1-3", data, color:"#7419B1", dataVal:"DTVAL_CO", columnVal:"PRD_DE",tooltipCallback:function(d,i){
							const beforeDataObj = data[i-1];
							let ratio;
							if(beforeDataObj){
								const beforeData = beforeDataObj.DTVAL_CO;
								let ratColor;
								let ca;
								let rat = (((d.DTVAL_CO - beforeData) / beforeData) * 100).toFixed(1);
								if(rat>0){
									ca = "증가↑";
									ratColor="red";
								}else if(rat<0){
									ca = "감소↓";
									ratColor="blue";
								}
								//ratio = "(전년 대비 <span class='color-"+ratColor+"'>"+Math.abs(rat)+"</span>% "+ca+")";
								ratio = "<span class='color-"+ratColor+"'>"+Math.abs(d.DTVAL_CO - beforeData).toFixed(2)+"</span>명 "+ca;
							}
							const tooltip = $("#chart1-3-container").find("[data-type=tooltip]");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":d.PRD_DE+" 평균 출생아 수"}),
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
										$("<span/>",{"class":"color-red","text":d.DTVAL_CO}),"명"
									),
									ratio,
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										$administStatsMap.ui.tooltipMap.mapTotalVal=null;
										let parameters = $.extend(true,{},_this.parameters);
										parameters.tbl_id_list = data[i].TBL_ID;
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll3;
										parameters.surv_year_list = parseInt(data[i].PRD_DE.replace("년",""));
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
										$administStatsMap.ui.tooltipMap.title="초혼 신혼부부 평균 출생아 수";
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : "명",
												callback:function(d){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년 '}),
																$("<h3/>").append("초혼 신혼부부 평균 출생아 수"),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
														},
														endCallback:function(){
															$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt(data[i].PRD_DE.replace("년",""));
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
																		$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.tooltipMap.selectedAdmNm})
																	),
																	$("<p/>").append(
																		$("<span/>",{"class":"color-red","data-id":"value","text":data[i].DTVAL_CO}),"명"
																	)
																)
															);
															$("#tooltip-map-tooltip").show();
														}
													});
												}
											},resultMapData.result.mapData,parameters);
										});
									})
								)
							).show();
						}});
					}
				);
			}else{
				let columns=[],groupKey,series,tables=[],colors;
				if(_this.tabIndex==0){
					title = "혼인종류별 신혼부부 수";
					parameters.tbl_id_list ="DT_1NW1001,DT_1NW2034,DT_1NW3034";
					groupKey = "TBL_ID";
					columns = parameters.tbl_id_list.split(",");
					tables = parameters.tbl_id_list.split(",");
					series=[{"name":"전체",data:[]},{"name":"초혼",data:[]},{"name":"재혼",data:[]}]
					colors = ["#333","#ff5253", "#23b7d1"];
				}else{
					title = "맞벌이여부별 초혼 신혼부부 수";
					groupKey = "OV_L2_ID";
					columns = ["10","20"];
					tables = [parameters.tbl_id_list,parameters.tbl_id_list];
					series=[{"name":"맞벌이",data:[],legendIndex:1},{"name":"외벌이",data:[],legendIndex:0}]
					colors = ["#23b7d1","#ff5253"];
				}
				$("#chart1-3-title").empty().append("연도별 "+title/*,$("<span/>",{"text":"(단위 : 쌍)"})*/);
				let newlyChartDataTotal = {}
				$administStatsMap.utils.getTotsurvStatData(
					parameters,
					function(data){
						let categories = $.extend(true,[],$administStatsMap.ui.yearList).sort().map(year=>year+"년");
						function setNewlyChartDataTotal(data){
							data.forEach(function(d){
								newlyChartDataTotal[d[groupKey]]=newlyChartDataTotal[d[groupKey]]||{};
								newlyChartDataTotal[d[groupKey]][d.PRD_DE] = parseFloat(d.DTVAL_CO);
							});
						}
						if(_this.parameters.ov_l1_list!="00"){
							$administStatsMap.utils.getTotsurvStatData({
								..._this.parameters,
								ov_l1_list:"00"
							}, function(data, param) {
								setNewlyChartDataTotal(data);
							});
						}else{
							setNewlyChartDataTotal(data);
						}
						data.forEach(function(d){
							const index = columns.indexOf(d[groupKey]);
							if(columns.indexOf(d[groupKey])>-1){
								series[index].data.push(parseFloat(d.DTVAL_CO));
							}
						});
						createMultiLineChart({
							target:"chart1-3",
							categories,
							series,
							colors,
							dataLabelsFormater:function(){
								if(this.point.index==series[this.colorIndex].data.length-1){
									return $.heum.setThousandSeparator(this.y)+"쌍";
								}
							},
							tooltipCallback:function({name,data,event}){
								const beforeData = series[event.point.colorIndex].data[event.point.index-1];
								let ratio;
//								▴,▾
								if(beforeData){
									let rat = ((data - beforeData) / beforeData);
									let ca;
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
										$("<h3/>",{"class":"modal__tit","text":name+" "+series[event.point.colorIndex].name+" 신혼부부 수"}),
										$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
											$(this).parents('[data-type=tooltip]').hide();
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									),
									$("<div/>",{"class":"modal__body"}).append(
										$("<p/>").append(
											$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm}),
										),
										$("<p/>").append(
											$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(data)}),"쌍",
										),
										ratio,
										$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
											let parameters = $.extend(true,{},_this.parameters);
											parameters.tbl_id_list = tables[event.point.colorIndex];
											parameters.surv_year_list = parseInt(categories[event.point.x].replace("년",""));
											if(_this.tabIndex==0){
												parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
											}else{
												parameters.ov_l1_list = $administStatsMap.consts.sidoAll2;
												if(event.point.colorIndex == 0){
													parameters.ov_l2_list = "10";
												}else{
													parameters.ov_l2_list = "20";
												}
												
											}
											parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
											$administStatsMap.ui.tooltipMap.title="";
											
											$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
												$administStatsMap.ui.tooltipMap.mapTotalVal = data;
												let newlyChartDataTotal = {};
												function setNewlyChartDataTotal(data){
													data.forEach(function(item){
														newlyChartDataTotal[item.OV_L2_ID] = parseFloat(item.DTVAL_CO);
													})
												}
												
												if(_this.parameters.ov_l1_list!="000"){
													$administStatsMap.utils.getTotsurvStatData({
														..._this.parameters,
														ov_l1_list:"000"
													}, function(res, param) {
														setNewlyChartDataTotal(res);
													});
												}else{
													setNewlyChartDataTotal(res);
												}
												
												let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
												$administStatsMap.ui.map["tooltip-map"].setStatsData({
													adm_cd: "00",
													admCdKey:"adm_cd",
													showData : "dt",
													unit : "쌍",
													callback:function(d){
														$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//														$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
														$administStatsMap.ui.tooltipMap.show({
															tooltipCallback:function(){
																$administStatsMap.ui.tooltipMap.title = series[event.point.colorIndex].name;
																$("#tooltip-map-modal-title").empty().append(
																	$("<h3>",{"text":categories[event.point.x]}),
																	$("<h3/>").append(
																		title
																		//,$("<span/>",{"text":" - "+series[event.point.colorIndex].name})
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
																			$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.tooltipMap.selectedAdmNm})
																		),
																		$("<p/>").append(
																			$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(data)}),"쌍"
																		)
																	)
																);
															},
															endCallback:function(){
																$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt(categories[event.point.x].replace("년",""));
																$("#tooltip-map-tooltip").show();
																//$administStatsMap.ui.tooltipMap.mapTotalVal = newlyChartDataTotal[columns[event.point.colorIndex]][categories[event.point.index].replace("년","")];
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
					}
				);
			}
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
				this.tbl_id = "DT_1NW2026";
				this.parameters = {
					surv_year_list : $administStatsMap.ui.year,
					org_id_list : "101",
					tbl_id_list : this.tbl_id,
					list_var_ord_list : "",
					char_itm_id_list : "T10",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : "101,102,103,104,105",
					ov_l2_list : "00,20",
					ov_l3_list : "",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
				};
			}else if(this.tabIndex==1){
				this.tbl_id = "DT_1NW2028";
				this.parameters = {
					surv_year_list : $administStatsMap.ui.year,
					org_id_list : "101",
					tbl_id_list : this.tbl_id,
					list_var_ord_list : "",
					char_itm_id_list : "T10",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : ($administStatsMap.ui.admCd == "00" ? "000" : "2" + $administStatsMap.ui.admCd),
					ov_l2_list : "0,1,2,3,4,5",
					ov_l3_list : "",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
				};
			}
			this.chart1();
			this.chart2();
			this.chart3();
		},
		chart1:function(){
			let _this = this;
			$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data, param) {
				let title;
				if(_this.tabIndex==0){
					title = "초혼 신혼부부 혼인연차별 주택소유율("+$administStatsMap.ui.tooltipMap.selectedAdmNm+")";
					let datas = opt_fnCalc({data,OV_L2_ID:"00"});
					let max = 0;
//					let colors = datas.map((d,index)=>{
//						max = Math.max(max,parseFloat(d.DTVAL_CO));
//						return "#747474";
//					});
					let colors = ["#7cb6ec","#434348","#90ed7d","#f7a25c","#8085e9"];
					colors[datas.findIndex(x => parseFloat(x.DTVAL_CO) === max)] = "#e2658f";
					createVerticalBarChart({
						isSort:false,
						rotate:false,
						target:"chart2-1",
						data:datas,
						dataVal:"DTVAL_CO",
						columnVal:"OV_L1_KOR",
						color:colors,
						isShowYaxis:false,
						unit:"%",
						tooltipCallback:function(d,i){
							const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":datas[i].OV_L1_KOR}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.tooltipMap.selectedAdmNm}),
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(datas[i].DTVAL_CO_ORI)}),"쌍",
									)
//									,
//									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
//										let parameters = $.extend(true,{},_this.parameters);
//										parameters.ov_l1_list = $administStatsMap.consts.sidoAll2;
//										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
//										$administStatsMap.ui.tooltipMap.title="주택소유";
//										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
//											let alldatas = opt_fnCalc({data:res,OV_L2_ID:"00"});
//											alldatas.forEach((d,index)=>{
//												d.adm_cd = d.OV_L1_ID.substring(1,3);
//												d.region_nm = d.OV_L1_KOR;
//											});
//											$administStatsMap.ui.map["tooltip-map"].setStatsData({
//												adm_cd: "00",
//												admCdKey:"adm_cd",
//												showData : "DTVAL_CO",
//												unit : "%",
//												callback:function(data){
//													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
////													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
//													$administStatsMap.ui.tooltipMap.show({
//														tooltipCallback:function(){
//															$("#tooltip-map-modal-title").empty().append(
//																$("<p>",{"text":$administStatsMap.ui.year+'년 '+$administStatsMap.ui.tooltipMap.selectedAdmNm}),
//																$("<h3/>").append("초혼 신혼부부 혼인연차별 주택 소유율",$("<span/>",{"text":" - "+datas[i].OV_L1_KOR})),
//																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
//																	$('#tooltip-map-container').hide();
//																	$('.dim').hide();
//																	return false;
//																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
//															);
//														},
//														endCallback:function(){
//															$("#tooltip-map-tooltip").empty().append(
//																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
//																	$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.year+"년 "+$administStatsMap.ui.tooltipMap.title}),
//																	$("<a/>",{"class":"btn__cancel"}).click(function(){
//																		$('#tooltip-map-tooltip').hide(); 
//																		return false;
//																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
//																),
//																$("<div/>",{"class":"modal__body"}).append(
//																	$("<p/>").append(
//																		$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.tooltipMap.selectedAdmNm})
//																	),
//																	$("<p/>").append(
//																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(datas[i].DTVAL_CO)}),"%"
//																	)
//																)
//															);
//															$("#tooltip-map-tooltip").show();
//														}
//													});
//												}
//											},alldatas,parameters);
//										});
//									})
								)
							);
							tooltip.show();
						}
					});
				}else{
					let newlyChartDataTotal = {};
					function setNewlyChartDataTotal(data){
						data.forEach(function(item){
							newlyChartDataTotal[item.OV_L2_ID] = parseFloat(item.DTVAL_CO);
						})
					}
					if(_this.parameters.ov_l1_list!="000"){
						$administStatsMap.utils.getTotsurvStatData({
							..._this.parameters,
							ov_l1_list:"000"
						}, function(data, param) {
							setNewlyChartDataTotal(data);
						});
					}else{
						setNewlyChartDataTotal(data);
					}
					title = "주택자산가액별 초혼 신혼부부 수";
					let datas = opt_fnCalc({data,OV_L2_ID:"0"});
					const toJson = $administStatsMap.utils.arrayToJson({
						data : datas,
						key : "OV_L2_ID"
					});
					const colors = [ "#395352", "#3F6864", "#448074", "#599E99", "#6FA89F" ];
					let series = [ {
						data : []
					}];
				
					Object.keys(toJson[$administStatsMap.ui.year]).sort().reverse().forEach(function(OV_L2_ID) {
						const v = toJson[$administStatsMap.ui.year][OV_L2_ID];
						series[0].data.push({
							name : v.OV_L2_KOR+"<br>"+$.heum.setThousandSeparator(v.DTVAL_CO_ORI)+"쌍",
							value : v.DTVAL_CO,
							dataObj : v,
							DTVAL_CO : v.DTVAL_CO,
							mapColor : "#0B610B",
							OV_L2_ID : OV_L2_ID
						});
					});
				
					series[0].data = $administStatsMap.utils.sortJSON(series[0].data, "OV_L2_ID", "desc");
					for (let i = 0; i < series[0].data.length; i++) {
						series[0].data[i].colorValue = (i + 1);
						series[0].data[i].color = colors[i];
					}
					createTreeMap({target:"chart2-1",series,colors,tooltipCallback:function({event}){
						const tooltip = $("#chart2-1-container").find("[data-type=tooltip]:last");
						tooltip.empty();
						tooltip.append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								$("<h3/>",{"class":"modal__tit","text":event.point.dataObj.OV_L2_KOR}),
								$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
									$(this).parents('[data-type=tooltip]').hide();
									return false;
								}).append($("<span/>",{"class":"btn-close btn-close--black"}))
							),
							$("<div/>",{"class":"modal__body"}).append(
								$("<p/>").append(
									$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm}),
								),
								$("<p/>").append(
									$("<span/>",{"class":"color-red","text":event.point.DTVAL_CO}),"%"
								),
								$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
									$administStatsMap.ui.tooltipMap.mapTotalVal = null;
									let parameters = $.extend(true,{},_this.parameters);
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll3;
									$administStatsMap.ui.tooltipMap.title="";
									
									if(event.point.index == 0){
										parameters.ov_l2_list = "5";
									}else if(event.point.index == 1){
										parameters.ov_l2_list = "4";
									}else if(event.point.index == 2){
										parameters.ov_l2_list = "3";
									}else if(event.point.index == 3){
										parameters.ov_l2_list = "2";
									}else if(event.point.index == 4){
										parameters.ov_l2_list = "1";
									}
									
									$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
										let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "dt",
											unit : "쌍",
											callback:function(d){
												$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														$administStatsMap.ui.tooltipMap.title = event.point.name.split("<br>")[0];
														$("#tooltip-map-modal-title").empty().append(
															$("<h3>",{"text":$administStatsMap.ui.year+'년 '}),
															$("<h3/>").append(
																title,
															),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
														$("#tooltip-map-tooltip").empty().append(
															$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																$("<h3/>",{"class":"modal__tit","text":event.point.name.split("<br>")[0]}),
																$("<a/>",{"class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-tooltip').hide(); 
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															),
															$("<div/>",{"class":"modal__body"}).append(
																$("<p/>").append(
																	$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.tooltipMap.selectedAdmNm})
																),
																$("<p/>").append(
																	$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(event.point.dataObj.DTVAL_CO_ORI)}),"쌍"
																)
															)
														);
													},
													endCallback:function(){
														$("#tooltip-map-tooltip").show();
														$administStatsMap.ui.tooltipMap.mapTotalVal = newlyChartDataTotal[event.point.options.OV_L2_ID];
													}
												});
											}
										},resultMapData.result.mapData,parameters);
									});
								})
							)
						);
						tooltip.show();
					}})
				}
				$("#chart2-1-title").data("append-text","년 "+title).empty().append($administStatsMap.ui.year+"년 "+title/*,$("<span/>",{"text":"(단위 : %, 쌍)"})*/);
			});
		},
		chart2:function(){
			$("#chart2-2-legend").hide();
			let _this = this;
			const parameters = $.extend(true,{},this.parameters);
			parameters.ov_l1_list = $administStatsMap.consts.sidoAll2;
//			parameters.ov_l1_list = "up:200";
//			parameters.ov_l2_list = "00,20";
//			parameters.prt_type = "part";
//			parameters.orderby = "DTVAL_CO";
			$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
				let title;
				if(_this.tabIndex==0){
					let alldatas = opt_fnCalc({data:res,OV_L2_ID:"00"}).filter(item=>item.OV_L1_ID!="000"&&item.OV_L1_ID!="00");
					title = "지역별 초혼 신혼부부 주택소유율"
					let max = 0;
					let avg = 0;
					let colors = alldatas.map((d,index)=>{
						d.adm_cd = d.OV_L1_ID.substring(1,3);
						d.region_nm = d.OV_L1_KOR;
						d.OV_L1_KOR = $administStatsMap.utils.abbreviationToAddress(d.OV_L1_KOR);
						avg+=parseFloat(d.DTVAL_CO);
						max = Math.max(max,parseFloat(d.DTVAL_CO));
						return "#747474";
					});
//					$("#chart2-2-avg-text").empty().append(
//						$("<p/>").append(
//							$("<span/>",{"text":"평균"}),
//							(avg/alldatas.length).toFixed(1)+"%"
//						)
//					);
					colors[alldatas.findIndex(x => parseFloat(x.DTVAL_CO) === max)] = "#e2658f";
					createVerticalBarChart({
						isSort:true,
						rotate:false,
						target:"chart2-2",
						data:alldatas,
						dataVal:"DTVAL_CO",
						columnVal:"OV_L1_KOR",
						color:colors,
						isShowYaxis:false,
						unit:"%",
						tooltipCallback:function(d,i){
							const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.year+"년 주택소유 초혼 신혼부부 수"}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":alldatas[i].OV_L1_KOR}),
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(alldatas[i].DTVAL_CO_ORI)}),"쌍",
									),
//									$("<p/>").append(
//										$("<p/>",{"html":"(구성비 <span class='color-red'>"+alldatas[i].DTVAL_CO+"</span>%)"})
//									),
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										$administStatsMap.ui.tooltipMap.mapTotalVal=null;
										$administStatsMap.ui.tooltipMap.title="2020년";
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "DTVAL_CO",
											unit : "%",
											callback:function(data){
												$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//												$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														$("#tooltip-map-modal-title").empty().append(
															$("<h3>",{"text":$administStatsMap.ui.year+'년 '}),
															$("<h3/>").append("초혼 신혼부부 주택소유율"),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
													},
													endCallback:function(){
														$administStatsMap.ui.map["tooltip-map"].dataBoundary.eachLayer(function(layer){
															if(layer.feature.properties.adm_cd==alldatas[i].adm_cd){
																layer.fire("click");
															}
														});
													}
												});
											}
										},alldatas,parameters);
									})
								)
							);
							tooltip.show();
						}
					});
				}else{
					title = "주택자산가액별 초혼 신혼부부 수"
					let groupKey = "OV_L2_ID";
					let columnNames = ["6천만원 이하","6천만원 초과~1억 5천만원 이하","1억 5천만원 초과~3억원 이하","3억원 초과~6억원 이하","6억원 초과"];
					let columns = ["1","2","3","4","5"];
					let datas = {};
					let total = 0;
					res.forEach(item=>{
						if(columns.indexOf(item[groupKey])>-1){
							datas[item.OV_L1_ID] = datas[item.OV_L1_ID]||{};
							datas[item.OV_L1_ID][item[groupKey]] = parseFloat(item.DTVAL_CO);
							datas[item.OV_L1_ID].total = datas[item.OV_L1_ID].total||0;
							datas[item.OV_L1_ID].total+=datas[item.OV_L1_ID][item[groupKey]];
							datas[item.OV_L1_ID].category = $administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR);
							datas[item.OV_L1_ID].admCd = item.OV_L1_ID;
							if(item.OV_L1_ID!="00"&&item.OV_L1_ID!="000"){
								total+=datas[item.OV_L1_ID][item[groupKey]];
							}
						}else if(_this.tabIndex==1&&item.OV_L2_ID=="0"){//합계
							datas[item.OV_L1_ID] = datas[item.OV_L1_ID]||{};
							datas[item.OV_L1_ID].customTotal=parseFloat(item.DTVAL_CO);
						}
					});
					datas = Object.keys(datas).filter(key=>key!="00"&&key!="000").map(key=>datas[key]).sort(function (a, b) {
						return b.total-a.total;
					});
					const categories = datas.map(item=>item.category);
					const avg = total/datas.length;
//					$("#chart2-2-avg-text").empty().append(
//						$("<p/>").append(
//							$("<span/>",{"text":"평균"}),
//							$.heum.setThousandSeparator(parseInt(avg))+"쌍"
//						)
//					);
					
					$("#chart2-2-legend").show();
					createStackBarChart({viewTotalColumn:_this.tabIndex==1?function(data,i){
						return $.heum.setThousandSeparator(datas[i].customTotal);
					}:null,unit:"쌍",target:"chart2-2",data:datas,columns:columns,colors:["#395352", "#3F6864", "#448074", "#599E99", "#6FA89F"],category:categories,avgLineData:avg,tooltipCallback:function(d,i){
						const dataIndex = $(this).parent("[data-type=eventGroup]").data("value");
						const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
						
						let sumVal = 0;
						datas.forEach(x=>{
							 sumVal += x[dataIndex+1];
						});
						
						$administStatsMap.ui.tooltipMap.mapTotalVal = sumVal;
						
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
									$("<span/>",{"class":"color-blue","text":categories[i]}),
								),
								$("<p/>").append(
									$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(datas[i][columns[dataIndex]])}),"쌍",
								),
								$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
									$administStatsMap.ui.tooltipMap.title="";
									let mapDatas = [];
									datas.forEach(item=>{
										mapDatas.push({
											dt:item[columns[dataIndex]],
											adm_cd:item.admCd.substring(1,3),
											region_nm:item.category
										});
									});
									$administStatsMap.ui.map["tooltip-map"].setStatsData({
										adm_cd: "00",
										admCdKey:"adm_cd",
										showData : "dt",
										unit : "쌍",
										callback:function(data){
											$administStatsMap.ui.tooltipMap.title=columnNames[dataIndex];
											$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//											$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
											$administStatsMap.ui.tooltipMap.show({
												tooltipCallback:function(){
													$("#tooltip-map-modal-title").empty().append(
														$("<h3>",{"text":$administStatsMap.ui.year+'년 '}),
														$("<h3/>").append(
															title
															//,$("<span/>",{"text":" - "+columnNames[dataIndex]})
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
														if(layer.feature.properties.adm_cd==datas[i].admCd.substring(1,3)){
															layer.fire("click");
														}
													})
												}
											});
											$("#tooltip-map-tooltip").show();
										}
									},mapDatas,parameters);
								})
							)
						);
						tooltip.show();
					}});
				}
				$("#chart2-2-title").data("append-text","년 "+title).empty().append($administStatsMap.ui.year+"년 "+title/*,$("<span/>",{"text":"(단위 : 쌍)"})*/);
			});
		},
		chart3:function(){
			let _this = this;
			let groupKey;
			let checkId;
			let checkValue;
			let columnNames;
			let columns
			let title;
			if(this.tabIndex==0){
				groupKey = "OV_L1_ID";
				checkId = "OV_L2_ID";
				checkValue = "20";
				columns = ["101","102","103","104","105"];
				columnNames = ["1년차","2년차","3년차","4년차","5년차"];
				title = "초혼 신혼부부 혼인 연차별 주택소유율(전국)";
			}else{
				checkValue = null;
				groupKey = "OV_L2_ID";
				columns = ["1","2","3","4","5"];
				columnNames = ["6천만원 이하","6천만원 초과~1억 5천만원 이하","1억 5천만원 초과~3억원 이하","3억원 초과~6억원 이하","6억원 초과"];
				title = "주택자산가액별 초혼 신혼부부 수";
			}
			let series=columnNames.map(name=>{return {"name":name,data:[]};});
			let parameters = $.extend(true,{},this.parameters);
			let tables = [parameters.tbl_id_list,parameters.tbl_id_list,parameters.tbl_id_list,parameters.tbl_id_list,parameters.tbl_id_list];
			parameters.surv_year_list = $administStatsMap.ui.yearList.join(",");
			
			$administStatsMap.utils.getTotsurvStatData(parameters, function(data, param) {
				let newlyChartDataTotal = {};
				if(_this.tabIndex==1){
					function setNewlyChartDataTotal(data){
						data.forEach(function(item){
							newlyChartDataTotal[item[groupKey]] = newlyChartDataTotal[item[groupKey]]||{};
							newlyChartDataTotal[item[groupKey]][item.PRD_DE] = parseFloat(item.DTVAL_CO);
						});
					}
					if($administStatsMap.ui.admCd=="00"){
						setNewlyChartDataTotal(data);
					}else{
						$administStatsMap.utils.getTotsurvStatData({...parameters,ov_l1_list:"000"}, function(data, param) {
							setNewlyChartDataTotal(data);
						});
					}
				}
				let categories = $.extend(true,[],$administStatsMap.ui.yearList).sort().map(year=>year+"년");
				let total = 0;
				if(_this.tabIndex==0){
					let datas = [];
					for (let i = 0; i < data.length; i++) {
						let s = JSON.parse(JSON.stringify(data[i]));
						s.DTVAL_CO = s.DTVAL_CO * 1;
						for (let j = 0; j < data.length; j++) {
							let t = JSON.parse(JSON.stringify(data[j]));
							t.DTVAL_CO = t.DTVAL_CO * 1;
							if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
								if (s.subsumYn != "Y" && t.subsumYn == "Y") {
									s.DTVAL_CO_ORI = s.DTVAL_CO;
									s.DTVAL_CO = s.DTVAL_CO / t.DTVAL_CO * 100;
									datas.push(s);
								}
							}
						}
					}
					let toJson;
					if ($.isArray(datas)) {
						toJson = $administStatsMap.utils.setVariance($administStatsMap.utils.arrayToJson({
							data : datas,
							key0 : "OV_L1_ID",
							key : "PRD_DE"
						}));
					} else {
						toJson = datas;
					}
					let max = null;
					let min = null;
					series = [];
					Object.keys(toJson).sort().forEach(function(key) {
						series.push({
							name : toJson[key][Object.keys(toJson[key])[0]]["OV_L1_KOR"],
//							type : "line",
							data : (function(key) {
								let dataArr = [];
								Object.keys(toJson[key]).sort().forEach(function(PRD_DE) {
									if ($.heum.hasData(max) || max < toJson[key][PRD_DE].DTVAL_CO) {
										max = toJson[key][PRD_DE].DTVAL_CO;
									}
									if ($.heum.hasData(min) || min > toJson[key][PRD_DE].DTVAL_CO) {
										min = toJson[key][PRD_DE].DTVAL_CO;
									}
									dataArr.push({
										y : toJson[key][PRD_DE].DTVAL_CO,
										dataObj : toJson[key][PRD_DE]
									});
								});
								return dataArr;
							}(key))
						});
					});
				}else{
					data.forEach(function(d){
						const index = columns.indexOf(d[groupKey]);
						if(index>-1){
							let value = parseFloat(d.DTVAL_CO);
							if(checkValue==null){
								series[index].data.push(value);
								total+=value;
							}else{
								if(columns.indexOf(d[groupKey])>-1&&d[checkId]==checkValue){
									series[index].data.push(value);
									total+=value;
								}
							}
						}
					});
				}
				createMultiLineChart({
					target:"chart2-3",
					categories,
					series,
					dataLabelsFormater:function(){
						if(this.point.index==series[this.colorIndex].data.length-1){
							if(_this.tabIndex==1){
								return $.heum.setThousandSeparator(this.y)+"쌍";
							}else{
								return this.y.toFixed(1)+"%";
							}
						}
					},
					tooltipCallback:function({name,data,event}){
						const beforeData = series[event.point.colorIndex].data[event.point.index-1];
						let ratio;
						if(_this.tabIndex==1&&beforeData){
							let ratColor;
							let rat = (((data - beforeData) / beforeData) * 100).toFixed(1);
							let ca;
							if(rat>0){
								ca = "증가↑";
								ratColor="blue";
							}else if(rat<0){
								ca = "감소↓";
								ratColor="red";
							}
							ratio = "(전년 대비 <span class='color-"+ratColor+"'>"+Math.abs(rat)+"</span>% "+ca+")";
						}
						const tooltip = $("#chart2-3-container").find("[data-type=tooltip]:last");
						let mapViewButton;
						if(_this.tabIndex==1){
							mapViewButton = $("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
								$administStatsMap.ui.tooltipMap.mapTotalVal = data;
								let parameters = $.extend(true,{},_this.parameters);
								parameters.tbl_id_list = tables[event.point.colorIndex];
								parameters.surv_year_list = parseInt(categories[event.point.index].replace("년",""));
								parameters.ov_l1_list = $administStatsMap.consts.sidoAll3;
								parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
								$administStatsMap.ui.tooltipMap.title="";
								
								if(event.point.colorIndex == 0){
									parameters.ov_l2_list = "1";
								}else if(event.point.colorIndex == 1){
									parameters.ov_l2_list = "2";
								}else if(event.point.colorIndex == 2){
									parameters.ov_l2_list = "3";
								}else if(event.point.colorIndex == 3){
									parameters.ov_l2_list = "4";
								}else if(event.point.colorIndex == 4){
									parameters.ov_l2_list = "5";
								}
								
								$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
									let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
									$administStatsMap.ui.map["tooltip-map"].setStatsData({
										adm_cd: "00",
										admCdKey:"adm_cd",
										showData : "dt",
										unit : "쌍",
										callback:function(d){
											$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
	//										$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
											$administStatsMap.ui.tooltipMap.show({
												tooltipCallback:function(){
													$administStatsMap.ui.tooltipMap.title = series[event.point.colorIndex].name;
													$("#tooltip-map-modal-title").empty().append(
														$("<h3>",{"text":event.point.category}),
														$("<h3/>").append(
															title
															//,$("<span/>",{"text":" - "+series[event.point.colorIndex].name})
														),
														$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
															$('#tooltip-map-container').hide();
															$('.dim').hide();
															return false;
														}).append($("<span/>",{"class":"btn-close btn-close--black"}))
													);
													$("#tooltip-map-tooltip").empty().append(
														$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
															$("<h3/>",{"class":"modal__tit","text":/*categories[event.point.colorIndex]+" "+*/series[event.point.colorIndex].name}),
															$("<a/>",{"class":"btn__cancel"}).click(function(){
																$('#tooltip-map-tooltip').hide(); 
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														),
														$("<div/>",{"class":"modal__body"}).append(
															$("<p/>").append(
																$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.tooltipMap.selectedAdmNm})
															),
															$("<p/>").append(
																$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(data)}),"쌍"
															)
														)
													);
												},
												endCallback:function(){
													const thisYear = categories[event.point.index].replace("년","");
													$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt(thisYear);
													$("#tooltip-map-tooltip").show();
													//$administStatsMap.ui.tooltipMap.mapTotalVal = newlyChartDataTotal[columns[event.point.index-1]][thisYear];
												}
											});
										}
									},resultMapData.result.mapData,parameters);
								});
							});
						}
						tooltip.empty();
						let valueText = null;
						if(_this.tabIndex==0){
							//if($.heum.hasData(event.point.dataObj.iod)&&event.point.dataObj.iod!="-"){
								let ca;
								let ratColor;
								if(event.point.dataObj.iod>0){
									ca = "증가↑";
									ratColor="blue";
								}else if(event.point.dataObj.iod<0){
									ca = "감소↓";
									ratColor="red";
								} else {
									ca = "전년 자료 없음";
									ratColor="red";
								}
								if(event.point.dataObj.iod == "-") {
									valueText = $("<p/>").append(
											$("<span/>",{"class":"color-red","text":
												data.toFixed(1)
											}),"%"
											,
											"<br>(" + ca+")"
									);
								} else {
								valueText = $("<p/>").append(
										$("<span/>",{"class":"color-red","text":
											data.toFixed(1)
										}),"%"
										,
										"<br>(전년 대비 ",
										$("<span/>",{"class":"color-"+ratColor,"text":
											Math.abs(
												$administStatsMap.utils.getVarianceText({
													val : event.point.dataObj.iod,
													digits : 1
												})
											)
										}),"%p "+ca+")"
								);
								}
								/*
								valueText = $("<p/>").append(
									"(전년 대비 ",
									$("<span/>",{"class":"color-"+ratColor,"text":
										Math.abs(
											$administStatsMap.utils.getVarianceText({
												val : event.point.dataObj.iod,
												digits : 1
											})
										)
									}),"%p "+ca+")"
								);
								*/
							//}
						}else{
							valueText = $("<p/>").append(
								$("<span/>",{"class":"color-red","text":
									$.heum.setThousandSeparator(data)
								}),"쌍"
							);
								
						}
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
									//$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm}),
									(
										parameters.tbl_id_list == "DT_1NW2028"
										? $("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
										: $("<span/>",{"class":"color-blue","text": "전국"})
									)
								),
								valueText,
								ratio,
								mapViewButton
							)
						);
						tooltip.show();
					}
				});
				$("#chart2-3-title").empty().append("연도별 "+title/*,$("<span/>",{"text":"(단위 : 쌍)"})*/);
			});
		}
	},
	main3 : {
		tabIndex:null,
		tbl_id:null,
		parameters : null,
		common: function(){
			$("[data-type=chart-container]").find("[data-type=tooltip]").hide();
			this.tabIndex = $("#main3-sub-tab li").index($("#main3-sub-tab li.on"));
			if(this.tabIndex==0){
				this.tbl_id = "DT_1NW2024";
				this.parameters = {
					surv_year_list : $administStatsMap.ui.year,
					org_id_list : "101",
					tbl_id_list : this.tbl_id,
					list_var_ord_list : "",
					char_itm_id_list : "T10",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : "1,2,3,4,5,6,12",
					ov_l2_list : "000",
					ov_l3_list : "",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
				};
			}else if(this.tabIndex==1){
				this.tbl_id = "DT_1NW2032";
				this.parameters = {
					surv_year_list : $administStatsMap.ui.year,
					org_id_list : "101",
					tbl_id_list : this.tbl_id,
					list_var_ord_list : "",
					char_itm_id_list : "T10",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : "000",
					ov_l2_list : "1,10,20,30,40,50,60,70,80",
					ov_l3_list : "",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : ""
				}
			}
			this.chart1();
			this.chart2();
		},
		chart1:function(){
			let _this = this;
			$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data, param) {
				let title,subtitle,toJson;
				let series = [ {
					type: 'pie',
					innerSize : "50%",
					data : [],
					dataLabels : {
						style : {
							color : "#000000"
						}
					}
				}];
				if(_this.tabIndex==0){
					title = "초혼 신혼부부 소득수준별 비중(전국)";
					toJson = $administStatsMap.utils.arrayToJson({
						data : data,
						key : "OV_L1_ID"
					});
					subtitle = "평균소득<br />" + $.heum.setThousandSeparator(toJson[$administStatsMap.ui.year]["12"].DTVAL_CO) + " 만원";
				
					Object.keys(toJson[$administStatsMap.ui.year]).sort().forEach(function(OV_L1_ID, idx) {
						const v = toJson[$administStatsMap.ui.year][OV_L1_ID];
						if (OV_L1_ID != "12") {
							series[0].data.push({
								name : v.OV_L1_KOR,
								y : v.DTVAL_CO,
								dataObj : v,
							});
						}
					});
					
				}else{
					title = "초혼 신혼부부 금융권 대출잔액별 비중(전국)";
					toJson = $administStatsMap.utils.arrayToJson({
						data : data,
						key : "OV_L2_ID"
					});
					subtitle = "대출보유비중<br />" + toJson[$administStatsMap.ui.year]["1"].DTVAL_CO + " %";
					Object.keys(toJson[$administStatsMap.ui.year]).sort().forEach(function(OV_L2_ID, idx) {
						const v = toJson[$administStatsMap.ui.year][OV_L2_ID];
						if (OV_L2_ID != "1") {
							series[0].data.push({
								name : v.OV_L2_KOR,
								y : v.DTVAL_CO,
								dataObj : v,
							});
						}
					});
				}
				createSemiCircleDonutChart({
					center:["50%","100%"],
					size:"200%",
					target:"chart3-1",
					series,
					subtitle : {
						text : subtitle,
						align : "center",
						verticalAlign : "middle",
						y: _this.tabIndex==0?30:20,
						style : {
							textOutline : false,
							fontSize : "12px",
							fontWeight : "bold",
							color : "#000000"
						}
					},
					dataLabelsFormatter: function(){
						return this.y+"%";
//					},
//					tooltipCallback:function({event}){
//						const tooltip = $("#chart3-1-container").find("[data-type=tooltip]:last");
//						tooltip.empty();
//						tooltip.append(
//							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
//								$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.year+"년 "+(_this.tabIndex==0?event.point.dataObj.OV_L1_KOR:event.point.dataObj.OV_L2_KOR)}),
//								$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
//									$(this).parents('[data-type=tooltip]').hide();
//									return false;
//								}).append($("<span/>",{"class":"btn-close btn-close--black"}))
//							),
//							$("<div/>",{"class":"modal__body"}).append(
//								$("<p/>").append(
//									$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm}),
//								),
//								$("<p/>").append(
//									$("<span/>",{"class":"color-red","text":event.point.y}),"%",
//								),
//							)
//						);
//						tooltip.show();
					}
				});
				$("#chart3-1-title").data("append-text","년 "+title).empty().append($administStatsMap.ui.year+"년 "+title/*,$("<span/>",{"text":"(단위 : %, 만원)"})*/);
			});
		},
		chart2:function(){
			let _this = this;
			let groupKey;
			let groupColumn;
			let columnNames=[];
			let columns
			let title;
			let parameters = $.extend(true,{},this.parameters);
			if(this.tabIndex==0){
				groupKey = "OV_L1_ID";
				groupColumn = "OV_L1_KOR";
				parameters.ov_l1_list = "1,2,3,4,5,6";
				columns = parameters.ov_l1_list.split(",");
				title = "초혼 신혼부부 소득수준별 비중(전국)";
			}else{
				groupKey = "OV_L2_ID";
				groupColumn = "OV_L2_KOR";
				title = "초혼 신혼부부 금융권 대출잔액별 비중(전국)";
				parameters.ov_l2_list = "10,20,30,40,50,60,70,80";
				columns = parameters.ov_l2_list.split(",");
			}
			parameters.surv_year_list = $administStatsMap.ui.yearList.join(",");
			$administStatsMap.utils.getTotsurvStatData(parameters, function(data, param) {
//				data.forEach(function(d){
//					const index = columns.indexOf(d[groupKey]);
//					if(index>-1){
//						columnNames[index]=d[groupColumn];
//					}
//				});
//				let categories = $.extend(true,[],$administStatsMap.ui.yearList).sort().map(year=>year+"년");
//				let series=columnNames.map(name=>{return {"name":name,data:categories.map(item=>undefined)};});
//				let emptyYears=$.extend(true,[],$administStatsMap.ui.yearList).sort();
//				data.forEach(function(d){
//					const index = columns.indexOf(d[groupKey]);
//					if(index>-1){
//						series[index].data[categories.indexOf(d.PRD_DE+"년")]=parseFloat(d.DTVAL_CO);
//						const yearIndex = emptyYears.indexOf(parseInt(d.PRD_DE));
//						if(yearIndex>-1){
//							emptyYears.splice(yearIndex,1);
//						}
//					}
//				});
//				emptyYears.forEach(year=>{
//					const yearIndex = categories.indexOf(year+"년");
//					if(yearIndex>-1){
//						categories.splice(yearIndex,1);
//						series.forEach(item=>{
//							item.data.splice(yearIndex,1);
//						});
//					}
//				});
				let toJson;
				if ($.isArray(data)) {
					toJson = $administStatsMap.utils.setVariance($administStatsMap.utils.arrayToJson({
						data : data,
						key0 : groupKey,
						key : "PRD_DE"
					}));
				} else {
					toJson = data;
				}
				let series=[],categories=[];
				let max = null;
				let min = null;
				Object.keys(toJson).sort().forEach(function(key) {
					series.push({
						name : toJson[key][Object.keys(toJson[key])[0]][groupColumn],
//						color : selTmsrParam.tmsr_colors[series.length],
						type : "line",
						data : (function(key) {
							let dataArr = [];
							Object.keys(toJson[key]).sort().forEach(function(PRD_DE) {
								categories.push(PRD_DE);
								if ($administStatsMap.utils.isEmpty(max) || max < toJson[key][PRD_DE].DTVAL_CO) {
									max = toJson[key][PRD_DE].DTVAL_CO;
								}
								if ($administStatsMap.utils.isEmpty(min) || min > toJson[key][PRD_DE].DTVAL_CO) {
									min = toJson[key][PRD_DE].DTVAL_CO;
								}
								dataArr.push({
									y : toJson[key][PRD_DE].DTVAL_CO,
									dataObj : toJson[key][PRD_DE]
								});
							});
							return dataArr;
						}(key))
					});
				});
				createMultiLineChart({
					target:"chart3-2",
					categories,
					series,
					dataLabelsFormater:function(){
						if(this.point.index==series[this.colorIndex].data.length-1){
							return $.heum.setThousandSeparator(this.y)+"%";
						}
					},
					tooltipCallback:function({name,data,event}){
						let ratio;
						if($.heum.hasData(event.point.dataObj.iod)&&event.point.dataObj.iod!="-"){
							let ca;
							let ratColor;
							if(series[event.point.colorIndex].data[event.point.index].dataObj.iod>0){
								ca = "증가↑";
								ratColor="blue";
							}else if(series[event.point.colorIndex].data[event.point.index].dataObj.iod<0){
								ca = "감소↓";
								ratColor="red";
							}
							ratio = $("<p/>").append(
								"(전년 대비 ",
								$("<span/>",{"class":"color-"+ratColor,"text":
									Math.abs($administStatsMap.utils.getVarianceText({
										val : series[event.point.colorIndex].data[event.point.index].dataObj.iod,
										digits : 1
									}))
								}),"%p "+ca+")"
							);
						}
						const tooltip = $("#chart3-2-container").find("[data-type=tooltip]:last");
						tooltip.empty();
						tooltip.append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								$("<h3/>",{"class":"modal__tit","text":name+"년 "+series[event.point.colorIndex].name}),
								$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
									$(this).parents('[data-type=tooltip]').hide();
									return false;
								}).append($("<span/>",{"class":"btn-close btn-close--black"}))
							),
							$("<div/>",{"class":"modal__body"}).append(
								$("<p/>").append(
									//$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm}),
										$("<span/>",{"class":"color-blue","text":"전국"})
								),
								$("<p/>").append(
									$("<span/>",{"class":"color-red","text":data}),"%"
								),
								ratio
							)
						);
						tooltip.show();
					}
				});
				$("#chart3-2-title").empty().append("연도별 "+title/*,$("<span/>",{"text":"(단위 : 쌍)"})*/);
			});
		}
	}
}
const opt_fnCalc = ({data,OV_L2_ID})=>{
	let datas = [];
	for (let i = 0; i < data.length; i++) {
		let s = JSON.parse(JSON.stringify(data[i]));
		s.DTVAL_CO = s.DTVAL_CO * 1;
		for (let j = 0; j < data.length; j++) {
			let t = JSON.parse(JSON.stringify(data[j]));
			t.DTVAL_CO = t.DTVAL_CO * 1;
			if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
				if (s.OV_L2_ID != OV_L2_ID && t.OV_L2_ID == OV_L2_ID) {
					s.DTVAL_CO_ORI = s.DTVAL_CO;
					s.DTVAL_CO = (s.DTVAL_CO / t.DTVAL_CO * 100).toFixed(1);
					datas.push(s);
				}
			}
		}
	}
	return datas;
}






