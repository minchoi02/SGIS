const openKosis = (tblId) =>{
	window.open("https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId="+tblId+"&conn_path=I2", "_blank");
};
$(document).ready(function(){
	$("[data-kosis]").click(function(){
		const chart = $(this).data("kosis");
		const tabIndex = $("#"+chart+"-sub-tab li").index($("#"+chart+"-sub-tab li.on"));
		if(chart=="main1"){
			if(tabIndex==0){
				openKosis("DT_1A02008");
			}else if(tabIndex==1){
				openKosis("DT_1A02029");
			}else if(tabIndex==2){
				openKosis("DT_1A02020");
			}
		}else if(chart=="main2"){
			if(tabIndex==0){
				openKosis("DT_1A02002");
			}else if(tabIndex==1){
				openKosis("DT_1A02023");
			}else if(tabIndex==2){
				openKosis("DT_1A02015");
			}
		}else if(chart=="main3"){
			if(tabIndex==0){
				$(this).parent().children("[data-id=main3-1-more]").toggle();
			}else if(tabIndex==1){
				$(this).parent().children("[data-id=main3-2-more]").toggle();
			}
		}
		return false;
	});
});

function createTotSur(){
	// 지도 클릭 후 재 셋팅
	let li = $("ul#main-tab li.on");
	if($(li).text().indexOf("가구현황") != -1) {
		$administStatsMap.chart.main1.setSummary();
		$administStatsMap.chart.main1.common();
	} else if($(li).text().indexOf("인구현황") != -1) {
		$administStatsMap.chart.main1.setSummary();
		$administStatsMap.chart.main2.chart1();
		$administStatsMap.chart.main2.chart2();
		$administStatsMap.chart.main2.chart3();
		$administStatsMap.chart.main2.common();
	} else if($(li).text().indexOf("주요특성") != -1) {
		$administStatsMap.chart.main1.setSummary();
		$administStatsMap.chart.main3.common();
	}
	$administStatsMap.chart.main2.common();
	$administStatsMap.chart.main3.common();
}
/**
 * @name        : setSummaryData 
 * @description : 총괄 요약정보 데이터 셋팅 
 */
function setSummaryData(res){
	$administStatsMap.chart.main1.setSummary();
	$administStatsMap.chart.main1.common();
	/*
	$administStatsMap.chart.main2.common();
	$administStatsMap.chart.main3.common();
	*/
}

$administStatsMap.chart = {
	main1 : {
		tabIndex:null,
		tbl_id:null,
		parameters : null,
		// 총괄 요약정보 시작
		setSummary:function(){
            var admCd = $administStatsMap.ui.admCd
            admCd = admCd.replace("up:","");
        	var years = ""
				years +=   $administStatsMap.ui.year;
				years +=","+($administStatsMap.ui.year-1);
			this.parameters = {
				surv_year_list : years,
				org_id_list : "101",
				tbl_id_list : "DT_1A02008,DT_1A02002,DT_1A02029,DT_1A02023,DT_1A02020,DT_1A02015",
				list_var_ord_list : "",
				char_itm_id_list : "T01",
				prt_type : "",
				adm_cd : "",
				ov_l1_list : admCd,
				ov_l2_list : "00,0",
				ov_l3_list : "",
				ov_l4_list : "",
				ov_l5_list : "",
				category : "",
				odr_col_list : "",
				odr_type : "",
				opt_tblIds: "",
				opt_digits: "0"
			};
			this.chart();
		},
		chart : function(){
			$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data, param) {
				var current =0;
				var before =0;
				var dt_id = "";
				data.forEach(item=>{
					dt_id = item.TBL_ID + item.CHAR_ITM_ID // 테이블+컬럼 DT_1A02015T01
					if(item.PRD_DE == $administStatsMap.ui.year){
						current = item.DTVAL_CO
					} else{
						before = item.DTVAL_CO
					}
					let rtv = ((current - before ) / before) * 100;
					let rt = rtv.toFixed(1);
					$("[data-id="+dt_id+"-number]").text($.heum.setThousandSeparator(current));
					
					if( $administStatsMap.ui.year > 2013 ){
						$("[data-id="+dt_id+"-rt]").show();
						$(".dtRtState").show();
						$("[data-id="+dt_id+"-rt]").removeClass("state-up state-down").text(" "+Math.abs(rt)+"%");
						if(rtv>0){
							$("[data-id="+dt_id+"-rt]").addClass("state-up");
						}else if(rtv<0){
							$("[data-id="+dt_id+"-rt]").addClass("state-down");
						}
					} else {
						$("[data-id="+dt_id+"-rt]").hide();
						$(".dtRtState").hide();
					}
				})
				
			})
		},
		// 총괄 요약정보 끝
		common: function(){
			$("[data-type=chart-container]").find("[data-type=tooltip]").hide();
			this.tabIndex = $("#main1-sub-tab li").index($("#main1-sub-tab li.on"));
			if(this.tabIndex==0){
				this.tbl_id = "DT_1A02008";
			}else if(this.tabIndex==1){
				this.tbl_id = "DT_1A02029";
			}else if(this.tabIndex==2){
				this.tbl_id = "DT_1A02020";
			}else{
				return;
			}
			
			this.parameters = {
				surv_year_list :$administStatsMap.ui.year,
				org_id_list : "101",
				tbl_id_list : this.tbl_id,
				list_var_ord_list : "",
				char_itm_id_list : "T01",
				prt_type : "",
				adm_cd : "",
				ov_l1_list : $administStatsMap.ui.admCd,
				ov_l2_list : "00,01,02,03,04",
				ov_l3_list : "",
				ov_l4_list : "",
				ov_l5_list : "",
				category : "",
				odr_col_list : "",
				odr_type : "",
				opt_chartId: "retunChart",
				opt_chartType: "pie",
				opt_chartNm: "가구원수별 귀농/귀어/귀촌 가구 수",
				opt_tblIds: [this.tbl_id],
				opt_digits: "0"
			};
			this.chart1();
			this.chart2();
			this.chart3();
		},
		chart1 : function(){	
			// chart1-1
			let colors, title, titleDetail, itm_nm,tables=[];
			common_loading(true);
			$("#chart1-legend").hide();
			if(this.tabIndex==0){
				titleDetail = "귀농";
				colors = ["#783300", "#8E5323", "#BA936B", "#7F7F7F"];
			}else if(this.tabIndex==1){
				titleDetail = "귀어";
				colors = ["#22277A", "#3F5A87", "#888AAB", "#7F7F7F"];
			}else if(this.tabIndex==2){
				titleDetail = "귀촌";
				colors = ["#265415", "#577C40", "#87A46A", "#7F7F7F"];
			}else{
				return;
			}
			
			title = "년 가구원수별 "+titleDetail+"가구 수";
			itm_nm = "OV_L2_KOR";
			
			$("#chart1-title").data("append-text",title).text($administStatsMap.ui.year+title);
			const _this = this;
			$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data, param) {
				//가구원수별 귀농/귀어/귀촌 가구 수 
				//console.log('[chart1] 가구원수별 귀농/귀어/귀촌 가구 수  : '+JSON.stringify(data))
				$("#chart1-title").data("append-text","년 "+title).empty().append($administStatsMap.ui.year+title,$("<span/>"));
				let total = 0;
				for (let i = 0; i < data.length; i++) {
					if (data[i].OV_L2_ID == "00") {
						total += data[i].DTVAL_CO;
					}
				}

				toJson = $administStatsMap.utils.arrayToJson({
					data : data,
					key : "OV_L2_ID"
				});
				
				let series = [ {
					type: 'pie',
					innerSize : "50%",
					data : [],
					dataLabels : {
						style : {
							color : "#000000"
						}
					}
				},{
					type: 'pie',
					borderWidth: 0,
					innerSize: "0%",
					size: "70%",
					colors: ["#ffffff"],
					data: [{
						y: parseInt(toJson[$administStatsMap.ui.year]["00"].DTVAL_CO),
						dataLabels: {
							formatter: function() {
								return "<div style='text-align:center;color:#000;font-weight:bold;font-family:NanumSquare;font-size:12px;'>" 
									+ titleDetail+"가구<br />" + $.heum.setThousandSeparator(toJson[$administStatsMap.ui.year]["00"].DTVAL_CO) + " 가구</div>";
							},
							align: "center",
							useHTML: true
						},
						dataObj: toJson[$administStatsMap.ui.year]["00"],
						//name: titleDetail+"가구"
						name: ""
					}],
					events:{
						click:function(event){
							if(typeof tooltipCallback==="function"){
								tooltipCallback({
									event
								});
							}
						}
					},
					states: {
						hover: {
							enabled: false
						},
						select: {
							enabled: false
						}
					}
				}];
				title = titleDetail+"가구";
				
				subtitle = titleDetail+"가구<br />" + $.heum.setThousandSeparator(toJson[$administStatsMap.ui.year]["00"].DTVAL_CO) + " 가구";
				
				
				Object.keys(toJson[$administStatsMap.ui.year]).sort().forEach(function(OV_L2_ID, idx) {
					const v = toJson[$administStatsMap.ui.year][OV_L2_ID];
					if (OV_L2_ID != "00") {
						series[0].data.push({
							name : v.OV_L2_KOR,
							y : parseFloat((((v.DTVAL_CO)/total)*100).toFixed(1)),
							dataObj : v,
						});
					}
				});
				
				
				createSemiCircleDonutChart({
					center:["50%","100%"],
					size:"150%",
					target:"chart1",
					series,
					colors,
					subtitle : {
						//text : subtitle,
						text : '',
						align : "center",
						verticalAlign : "middle",
						y: 75,
						style : {
							textOutline : false,
							fontSize : "12px",
							fontWeight : "bold",
							color : "#000000"
						}
					},				
					dataLabelsFormatter: function(){
						return this.y+"%";
					},
					tooltipCallback:function({event}){
						const tooltip = $("#chart1-container").find("[data-type=tooltip]:last");
						tooltip.empty();
						tooltip.append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								$("<h3/>",{"class":"modal__tit","text":(event.point.dataObj.OV_L2_KOR === "계" ? title+" 전체" : event.point.dataObj.OV_L2_KOR)}),
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
									$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(event.point.dataObj.DTVAL_CO)})," 가구"
								),
								$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
									$administStatsMap.ui.tooltipMap.mapTotalVal = event.point.dataObj.DTVAL_CO;
									$administStatsMap.ui.tooltipMap.title = (event.point.dataObj.OV_L2_KOR === "계" ? title+" 전체" : event.point.dataObj.OV_L2_KOR);
									let parameters = $.extend(true,{},_this.parameters);
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
									parameters.ov_l2_list = event.point.dataObj.OV_L2_ID;
									parameters.surv_year_list = $administStatsMap.ui.year;
									
									$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
										let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											//adm_cd: $administStatsMap.ui.admCd,
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "dt",
											unit : "가구",
											callback:function(data){
												$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														$("#tooltip-map-modal-title").empty().append(
															//$("<p>",{"text":$administStatsMap.ui.year+'년 '+$administStatsMap.ui.selectedAdmNm}),
															//$("<h3/>").append($administStatsMap.ui.year+'년 <br/>'+title),
															$("<h3/>").append($administStatsMap.ui.year+'년 <br/>'+title),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
													},
													endCallback:function(){
														if($administStatsMap.ui.admCd=="00"){
															
															$("#tooltip-map-tooltip").empty().append(
																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																	$("<h3/>",{"class":"modal__tit","text":(event.point.dataObj.OV_L2_KOR === "계" ? title+" 전체" : event.point.dataObj.OV_L2_KOR)}),
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
																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(event.point.dataObj.DTVAL_CO)})," 가구"
																	)
																)
															);
															$("#tooltip-map-tooltip").show();
														}else{
															$administStatsMap.ui.map["tooltip-map"].dataBoundary.eachLayer(function(layer){
																if(layer.feature.properties.adm_cd.substring(0,2)==$administStatsMap.ui.admCd){
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
				common_loading(false);
			});
		},
		chart2: function(){
			const _this = this;
			let admCd,columns=[],columnNames=[],groupKey,title,chartUnit;
			
			admCd = $administStatsMap.consts.sidoAll;
			groupKey = "OV_L2_ID";
			columnNames = ["1인가구","2인가구","3인가구","4인가구이상"];
			columns = ["01","02","03","04"];
			chartUnit="가구";
			
			if(this.tabIndex==0){
				title = "지역별 귀농가구 수";
				colors = ["#783300", "#8E5323", "#BA936B", "#7F7F7F"];
			}else if(this.tabIndex==1){
				title = "지역별 귀어가구 수";
				colors = ["#22277A", "#3F5A87", "#888AAB", "#7F7F7F"];
			}else if(this.tabIndex==2){
				title = "지역별 귀촌가구 수";
				colors = ["#265415", "#577C40", "#87A46A", "#7F7F7F"];
			}
			
			$administStatsMap.utils.getTotsurvStatData(
				$.extend(true,{},this.parameters,{ov_l1_list:admCd}),function(data){
					$("#chart2-title").data("append-text","년 "+title).empty().append($administStatsMap.ui.year+"년 "+title);
					$("#chart2-legend .legend-label:eq(0)").text(columnNames[0]);
					$("#chart2-legend .legend-label:eq(1)").text(columnNames[1]);
					$("#chart2-legend .legend-label:eq(2)").text(columnNames[2]);
					$("#chart2-legend .legend-label:eq(3)").text(columnNames[3]);
					$("#chart2-legend span.legend-box:eq(0)").attr('style','background-color:'+colors[0]);
					$("#chart2-legend span.legend-box:eq(1)").attr('style','background-color:'+colors[1]);
					$("#chart2-legend span.legend-box:eq(2)").attr('style','background-color:'+colors[2]);
					$("#chart2-legend span.legend-box:eq(3)").attr('style','background-color:'+colors[3]);
					$("#chart2-legend").show();
					let datas = {};
					let total = 0;
					
					let dataAll = [];
					
					data.forEach(item => {
						if(item.OV_L1_ID =="00" && item.OV_L2_ID !="00" ){
							dataAll.push(item);
						}
					});
					
					//$administStatsMap.ui.tooltipMap.mapTotalVal = dataAll[0].DTVAL_CO*1;
					
					data.forEach(item=>{
						datas[item.OV_L1_ID] = datas[item.OV_L1_ID]||{};
						datas[item.OV_L1_ID][item[groupKey]] = parseFloat(item.DTVAL_CO);
						/*
						datas[item.OV_L1_ID].total = datas[item.OV_L1_ID].total||0;
						datas[item.OV_L1_ID].total+=datas[item.OV_L1_ID][item[groupKey]];
						*/
						datas[item.OV_L1_ID].category = $administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR);
						datas[item.OV_L1_ID].admCd = item.OV_L1_ID;
						datas[item.OV_L1_ID].dataAll = dataAll;
						/*
						if(item.OV_L1_ID == "00"){
							datas[item.OV_L1_ID].dataAll = dataAll;
						}
						*/
						
						if(item.OV_L2_ID == "00"){
							datas[item.OV_L1_ID].total = parseFloat(item.DTVAL_CO);
						}
						if(item.OV_L1_ID!="00"&&item.OV_L1_ID!="000"){
							total+=datas[item.OV_L1_ID][item[groupKey]];
						}
					});
					
					datas = Object.keys(datas).filter(key=>key!="00"&&key!="000").map(key=>datas[key]).sort(function (a, b) {
						return b.total-a.total;
					});
					const categories = datas.map(item=>item.category);
					const avg = total/datas.length;
		
					createStackBarChart({
						unit:chartUnit,
						target:"chart2",
						data:datas,
						columns:columns,
						colors:colors,
						category:categories,
						viewTotalColumn:function(data){					
							return $.heum.setThousandSeparator(data.total);
						},
						avgLineData:avg,
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
										$("<span/>",{"class":"color-blue","text":d.data.category})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(((parseFloat( eval("d.data['"+columns[dataIndex]+"']") )/d.data.total)*100).toFixed(1))}),"%"
									),
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										
										let columsTotal = 0;
										datas.forEach(function(s){
										 columsTotal += parseFloat( eval("s['"+columns[dataIndex]+"']") );
										});
										
										if(dataIndex==0){
											$administStatsMap.ui.tooltipMap.mapTotalVal = d.data.dataAll[3].DTVAL_CO
										}else if(dataIndex==1){
											$administStatsMap.ui.tooltipMap.mapTotalVal = d.data.dataAll[2].DTVAL_CO
										}else if(dataIndex==2){
											$administStatsMap.ui.tooltipMap.mapTotalVal = d.data.dataAll[1].DTVAL_CO
										}else if(dataIndex==3){
											$administStatsMap.ui.tooltipMap.mapTotalVal = d.data.dataAll[0].DTVAL_CO
										}

										//$administStatsMap.ui.tooltipMap.mapTotalVal = columsTotal;
										$administStatsMap.ui.tooltipMap.title = columnNames[dataIndex];
										let parameters = $.extend(true,{},_this.parameters);
										parameters.tbl_id_list = data[i].TBL_ID;
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
										parameters.ov_l2_list = columns[dataIndex];
										
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												//adm_cd: $administStatsMap.ui.admCd,
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : "가구",
												callback:function(data){
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
															if(d.data.admCd=="00"){
																$("#tooltip-map-tooltip").empty().append(
																	$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																		$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.year+"년 "+d.category+"ddd"}),
																		$("<a/>",{"class":"btn__cancel"}).click(function(){
																			$('#tooltip-map-tooltip').hide(); 
																			return false;
																		}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																	),
																	$("<div/>",{"class":"modal__body"}).append(
																		$("<p/>").append(
																			$("<span/>",{"class":"color-blue","text":d.category})
																		),
																		$("<p/>").append(
																			$("<span/>",{"class":"color-red","data-id":"value","text":parseFloat(d.total)}),"가구 수"
																		)
																	)
																);
																$("#tooltip-map-tooltip").show();
															}else{
																$administStatsMap.ui.map["tooltip-map"].dataBoundary.eachLayer(function(layer){
																	if(layer.feature.properties.adm_cd.substring(0,2)==d.data.admCd){
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
					}});
				}
			);
		},
		chart3:function(){
			const _this = this;
			
			let parameters = $.extend(true,{},this.parameters),title;
			parameters.surv_year_list = $administStatsMap.ui.yearList.join(",");
			parameters.ov_l2_list = "00,01,02,03,04";
			
			let columns=[],groupKey,series,tables=[];
			if(_this.tabIndex==0){
				groupKey = "OV_L2_ID";
				columns = ["00","01","02","03","04"];
				title = "연도별 가구원수별 귀농가구 수";
				series=[{"name":"전체",data:[]},{"name":"1인가구",data:[]},{"name":"2인가구",data:[]},{"name":"3인가구",data:[]},{"name":"4인가구 이상",data:[]}];
				colors = ["#C8C8C8","#783300","#8E5323","#BA936B","#7F7F7F"];
			}else if(_this.tabIndex==1){
				groupKey = "OV_L2_ID";
				columns = ["00","01","02","03","04"];
				title = "연도별 가구원수별 귀어가구 수";
				series=[{"name":"전체",data:[]},{"name":"1인가구",data:[]},{"name":"2인가구",data:[]},{"name":"3인가구",data:[]},{"name":"4인가구 이상",data:[]}];
				colors = ["#C8C8C8","#22277A","#3F5A87","#888AAB","#7F7F7F"];
			}else if(_this.tabIndex==2){
				groupKey = "OV_L2_ID";
				columns = ["00","01","02","03","04"];
				title = "연도별 가구원수별 귀촌가구 수";
				series=[{"name":"전체",data:[]},{"name":"1인가구",data:[]},{"name":"2인가구",data:[]},{"name":"3인가구",data:[]},{"name":"4인가구 이상",data:[]}];
				colors = ["#C8C8C8","#265415","#577C40","#87A46A","#7F7F7F"];
			}
			$("#chart3-title").data("append-text",title).empty().append(title,$("<span/>"));
			$administStatsMap.utils.getTotsurvStatData(
				parameters,
				function(data){
					//연도별 가구원수별  귀농/귀어/귀촌 가구 수 
					//console.log('[chart3] 연도별 가구원수별  귀농/귀어/귀촌 가구 수   : '+JSON.stringify(data))
					let categories = $.extend(true,[],$administStatsMap.ui.yearList).sort().map(year=>year+"년");
					data.forEach(function(d){
						const index = columns.indexOf(d[groupKey]);
						if(columns.indexOf(d[groupKey])>-1){
							series[index].data.push(parseFloat(d.DTVAL_CO));
						}
					});
					createMultiLineChart({
						target:"chart3",
						categories,
						series,
						colors,
						dataLabelsFormater:function(){
							if(this.point.index==series[this.colorIndex].data.length-1){
								return $.heum.setThousandSeparator(this.y)+"가구";
							}
						},
						tooltipCallback:function({name,data,event}){
							const beforeData = series[event.point.colorIndex].data[event.point.index-1];
							let ratio;
							if(beforeData){
								let rat = ((((data - beforeData) / beforeData) * 100).toFixed(1));
								if(rat>0){
									ca = "증가↑";
									ratColor="blue";
								}else if(rat<0){
									ca = "감소↓";
									ratColor="red";
								}
								ratio = "(전년 대비 <span class='color-"+ratColor+"'>"+Math.abs(rat)+"</span>% "+ca+")";
							}
							const tooltip = $("#chart3-container").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":categories[event.point.index]+" "+series[event.point.colorIndex].name}),
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
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(data)})," 가구"
									),
									ratio,
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										$administStatsMap.ui.tooltipMap.mapTotalVal = data;
										$administStatsMap.ui.tooltipMap.title = series[event.point.colorIndex].name;
										let parameters = $.extend(true,{},_this.parameters);
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
										parameters.surv_year_list = parseInt(categories[event.point.index].replace("년",""));
										parameters.ov_l2_list = columns[event.point.colorIndex];
										$administStatsMap.ui.tooltipMap.title="";
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												//adm_cd: $administStatsMap.ui.admCd,
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : "가구",
												callback:function(d){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$administStatsMap.ui.tooltipMap.title = series[event.point.colorIndex].name;
															$("#tooltip-map-modal-title").empty().append(
																//$("<p>",{"text":event.point.category+" "+$administStatsMap.ui.selectedAdmNm}),
																$("<h3/>").append(event.point.category),
																$("<h3/>").append(
																	title//,
																	//$("<span/>",{"text":" - "+series[event.point.colorIndex].name})
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
																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(data)}),"가구"
																	)
																)
															);
														},
														endCallback:function(){
															$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt(event.point.category.replace("년",""));
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
				this.tbl_id = "DT_1A02002";
			}else if(this.tabIndex==1){
				this.tbl_id = "DT_1A02023";
			}else if(this.tabIndex==2){
				this.tbl_id = "DT_1A02015";
			}else{
				return;
			}
			
			this.parameters = {
				surv_year_list :$administStatsMap.ui.year + "," + ($administStatsMap.ui.year-1),
				org_id_list : "101",
				tbl_id_list : this.tbl_id,
				list_var_ord_list : "",
				char_itm_id_list : "T01,T02,T03",
				prt_type : "",
				adm_cd : "",
				ov_l1_list : $administStatsMap.ui.admCd,
				ov_l2_list : "0",
				ov_l3_list : "",
				ov_l4_list : "",
				ov_l5_list : "",
				category : "",
				odr_col_list : "",
				odr_type : "",
			};
			this.chart1();
			this.chart2();	
			this.chart3();	
		},
		chart1: function(){
			let colors, title, column, key;
			common_loading(true);
			let itm_nm;
			$("#chart2-1-legend").hide();
			itm_nm = "CHAR_ITM_NM";		
			colors = ["#7F7F7F", "#783300", "#BA936B"];
			key = ["T01", "T02", "T03"];
			if(this.tabIndex==0){
				title = "귀농 인구 현황";
				column = ["귀농가구원수", "귀농인수", "동반가구원수"];
				colors = ["#7F7F7F", "#783300", "#BA936B"];
			}else if(this.tabIndex==1){
				title = "귀어 인구 현황";
				column = ["귀어가구원수", "귀어인수", "동반가구원수"];
				colors = ["#7F7F7F", "#22277A", "#888AAB"];
			}else if(this.tabIndex==2){
				title = "귀촌 인구 현황";
				column = ["귀촌인수", "귀촌가구주수", "동반가구원수"];
				colors = ["#7F7F7F", "#265415", "#87A46A"];
			}
			$("#chart2-1-title").data("append-text","년 "+title).empty().append($administStatsMap.ui.year+"년 "+title,$("<span/>"));
			const _this = this;
			$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data, param) {
				//console.log('[chart2-1] 인구  : '+JSON.stringify(data))
				let chartData = [];
				let chartBeforeData = [];
				let datas = [];
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					s.DTVAL_CO = s.DTVAL_CO;
					datas.push(s);
				}
				datas.forEach(item=>{																			
					if($administStatsMap.ui.year==item.PRD_DE){
						chartData.push({
							itm_nm:item.CHAR_ITM_NM,
							dt:item.DTVAL_CO,
							//order:item.OV_L2_ID
							order:item.CHAR_ITM_SN
						});	
					}
					if($administStatsMap.ui.year-1==item.PRD_DE){
						chartBeforeData.push({
							itm_nm:item.CHAR_ITM_NM,
							dt:item.DTVAL_CO,
							//order:item.OV_L2_ID
							order:item.CHAR_ITM_SN
						});
					}				
				});
				chartData = chartData.sort(function(a, b) { 
					  return a.order < b.order ? -1 : a.order > b.order ? 1 : 0;
				});
				chartBeforeData = chartBeforeData.sort(function(a, b) { 
					  return a.order < b.order ? -1 : a.order > b.order ? 1 : 0;
				});
				createVerticalBarChart({
					rotate:false,
					target:"chart2-1",
					data:chartData,
					dataVal:"dt",
					columnVal:"itm_nm",
					//color:["#61D0A7", "#259884", "#106466"],
					color:colors,
					isShowYaxis:false,
					isSort:false,
					unit:"명",
					tooltipCallback:function(d,i){
						const beforeData = chartBeforeData[i];
						let ratio;
						if(beforeData){
							let rat = chartData[i].dt - chartBeforeData[i].dt;
							if(rat>0){
								ca = "증가↑";
								ratColor="blue";
							}else if(rat<0){
								ca = "감소↓";
								ratColor="red";
							}
							ratio = "(전년 대비 <span class='color-"+ratColor+"'>"+$.heum.setThousandSeparator(Math.abs(rat))+"</span>명 "+ca+")";
						}
						
						const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
						tooltip.empty();
						tooltip.append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								$("<h3/>",{"class":"modal__tit","text":column[i]}),
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
										//$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(chartData[i].dt)})
										$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(chartData[i].dt)}),"명"
									),
								ratio,
								$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
									$administStatsMap.ui.tooltipMap.mapTotalVal = chartData[i].dt;
									$administStatsMap.ui.tooltipMap.title = column[i];
									
									let parameters = $.extend(true,{},_this.parameters);
									parameters.surv_year_list = $administStatsMap.ui.year;
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
									parameters.char_itm_id_list = key[i];
									
									$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
										let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											//adm_cd: $administStatsMap.ui.admCd,
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "dt",
											unit : "명",
											callback:function(d){
												$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														//$administStatsMap.ui.tooltipMap.title = $administStatsMap.ui.year+"년 "+title;
														$("#tooltip-map-modal-title").empty().append(
															//$("<p>",{"text":$administStatsMap.ui.year+"년 "+$administStatsMap.ui.selectedAdmNm}),
															$("<h3/>").append($administStatsMap.ui.year+"년"),
															$("<h3/>").append(
																title+" 현황"//,
																//$("<span/>",{"text":" - "+column[i]})
															),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
														$("#tooltip-map-tooltip").empty().append(
															$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																$("<h3/>",{"class":"modal__tit","text":column[i]}),
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
																	$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(chartData[i].dt)}),"명"
																)
															)
														);
													},
													endCallback:function(){
														$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt($administStatsMap.ui.year);
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
						
						// 선택에 따른 그래프 변화 
						/*
						if( d.originalIndex == "0" ){
							$administStatsMap.chart.main2.chart2("T01");
						}else if( d.originalIndex == "1" ){
							$administStatsMap.chart.main2.chart2("T02");
						}else if( d.originalIndex == "2" ){
							$administStatsMap.chart.main2.chart2("T03");
						}
						*/					}
				});
				common_loading(false);
			});
		},
		chart2: function(){
			const _this = this;
			_this.parameters.surv_year_list = $administStatsMap.ui.year;

			let admCd,columns=[],columnNames=[],groupKey,title,chartUnit;
			admCd = $administStatsMap.consts.sidoAll;
			groupKey = "CHAR_ITM_ID";
			columns = ["T01", "T02", "T03"];
			chartUnit="명";
			
			if(this.tabIndex==0){
				title = "지역별 귀농 인구 현황";
				columnNames = ["귀농가구원수","귀농인수","동반가구원수"];
				colors = ["#7F7F7F", "#783300", "#BA936B"];
			}else if(this.tabIndex==1){
				title = "지역별 귀어 인구 현황";
				columnNames = ["귀어가구원수","귀어인수","동반가구원수"];
				colors = ["#7F7F7F", "#22277A", "#888AAB"];
			}else if(this.tabIndex==2){
				title = "지역별 귀촌 인구 현황";
				columnNames = ["귀촌인수","귀촌가구주수","동반가구원수"];
				colors = ["#7F7F7F", "#265415", "#87A46A"];
			}
			
			$administStatsMap.utils.getTotsurvStatData(
				$.extend(true,{},_this.parameters,{ov_l1_list:admCd}),function(data){
					$("#chart2-2-title").data("append-text","년 "+title).empty().append($administStatsMap.ui.year+"년 "+title);
					$("#chart2-2-legend .legend-label:eq(0)").text(columnNames[0]);
					$("#chart2-2-legend .legend-label:eq(1)").text(columnNames[1]);
					$("#chart2-2-legend .legend-label:eq(2)").text(columnNames[2]);
					$("#chart2-2-legend span.legend-box:eq(0)").attr('style','background-color:'+colors[0]);
					$("#chart2-2-legend span.legend-box:eq(1)").attr('style','background-color:'+colors[1]);
					$("#chart2-2-legend span.legend-box:eq(2)").attr('style','background-color:'+colors[2]);
					$("#chart2-2-legend").show();
					let datas = {};
					let total = 0;
					
					data.forEach(item=>{
						if(columns.indexOf(item[groupKey])>-1 && item.OV_L1_ID!="00" ){
							datas[item.OV_L1_ID] = datas[item.OV_L1_ID]||{};
							datas[item.OV_L1_ID][item[groupKey]] = parseFloat(item.DTVAL_CO);
							datas[item.OV_L1_ID].total = datas[item.OV_L1_ID].total||0;
							datas[item.OV_L1_ID].total+=datas[item.OV_L1_ID][item[groupKey]];
							datas[item.OV_L1_ID].category = $administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR);
							datas[item.OV_L1_ID].admCd = item.OV_L1_ID;
							total+=datas[item.OV_L1_ID][item[groupKey]];
						}
					});
					
					datas = Object.keys(datas).filter(key=>key!="00"&&key!="000").map(key=>datas[key]).sort(function (a, b) {
						return b.total-a.total;
					});
					const categories = datas.map(item=>item.category);
					const avg = total/datas.length;
		
					createStackBarChart({
						unit:chartUnit,
						target:"chart2-2",
						data:datas,
						columns:columns,
						colors:colors,
						category:categories,
						viewTotalColumn:function(data){					
							return $.heum.setThousandSeparator(data.total);
						},
						avgLineData:avg,
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
										$("<span/>",{"class":"color-blue","text":d.data.category})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(parseFloat( eval("d.data['"+columns[dataIndex]+"']") ))}),"명"
									),
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										let columsTotal = 0;
										datas.forEach(function(s){
										 columsTotal += parseFloat( eval("s['"+columns[dataIndex]+"']") );
										});
										$administStatsMap.ui.tooltipMap.mapTotalVal = columsTotal;
										$administStatsMap.ui.tooltipMap.title = columnNames[dataIndex];
										let parameters = $.extend(true,{},_this.parameters);
										parameters.tbl_id_list = data[i].TBL_ID;
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
										parameters.char_itm_id_list = columns[dataIndex];
										
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												//adm_cd: $administStatsMap.ui.admCd,
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : "명",
												callback:function(data){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3/>",{"text":$administStatsMap.ui.year+'년 '}),
																$("<h3/>").append(title),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
														},
														endCallback:function(){
															if(d.data.admCd=="00"){
																$("#tooltip-map-tooltip").empty().append(
																	$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																		$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.year+"년 "+d.category}),
																		$("<a/>",{"class":"btn__cancel"}).click(function(){
																			$('#tooltip-map-tooltip').hide(); 
																			return false;
																		}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																	),
																	$("<div/>",{"class":"modal__body"}).append(
																		$("<p/>").append(
																			$("<span/>",{"class":"color-blue","text":d.category})
																		),
																		$("<p/>").append(
																			$("<span/>",{"class":"color-red","data-id":"value","text":parseFloat(d.total)}),"명"
																		)
																	)
																);
																$("#tooltip-map-tooltip").show();
															}else{
																$administStatsMap.ui.map["tooltip-map"].dataBoundary.eachLayer(function(layer){
																	if(layer.feature.properties.adm_cd.substring(0,2)==d.data.admCd){
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
					}});
				}
			);
		},
		chart3:function(){
			const _this = this;
			let parameters = $.extend(true,{},this.parameters),title;
			parameters.surv_year_list = $administStatsMap.ui.yearList.join(",");
			parameters.ov_l1_list = $administStatsMap.ui.admCd; //"00";
			parameters.char_itm_id_list = "T01,T02,T03";
			
			let columns=[],groupKey,series,tables=[];
			let total = 0;
			if(_this.tabIndex==0){
				groupKey = "CHAR_ITM_ID";
				columns = ["T01","T02","T03"];
				title = "연도별 귀농 인구 현황";
				series=[{"name":"귀농가구원수",data:[]},{"name":"귀농인수",data:[]},{"name":"동반가구원수",data:[]}];
				//colors = ["#783300","#8E5323","#BA936B","#7F7F7F"];
				colors = ["#7F7F7F", "#783300", "#BA936B"];
			}else if(_this.tabIndex==1){
				groupKey = "CHAR_ITM_ID";
				columns = ["T01","T02","T03"];
				title = "연도별 귀어 인구 현황";
				series=[{"name":"귀어가구원수",data:[]},{"name":"귀어인수",data:[]},{"name":"동반가구원수",data:[]}];
				//colors = ["#22277A","#3F5A87","#888AAB","#7F7F7F"];
				colors = ["#7F7F7F", "#22277A", "#888AAB"];
			}else if(_this.tabIndex==2){
				groupKey = "CHAR_ITM_ID";
				columns = ["T01","T02","T03"];
				title = "연도별 귀촌 인구 현황";
				series=[{"name":"귀촌인수",data:[]},{"name":"귀촌가구주수",data:[]},{"name":"동반가구원수",data:[]}];
				//colors = ["#265415","#577C40","#87A46A","#7F7F7F"];
				colors = ["#7F7F7F", "#265415", "#87A46A"];
			}
			$("#chart2-3-title").data("append-text",""+title).empty().append(title,$("<span/>"));
			$administStatsMap.utils.getTotsurvStatData(
				parameters,
				function(data){
					//console.log('[chart2-3] 연도별 귀농/귀어/귀촌 현황 : '+JSON.stringify(data));
					let categories = $.extend(true,[],$administStatsMap.ui.yearList).sort().map(year=>year+"년");
					data.forEach(function(d){
						const index = columns.indexOf(d[groupKey]);
						if(columns.indexOf(d[groupKey])>-1){
							series[index].data.push(parseFloat(d.DTVAL_CO));
						}
					});
					createMultiLineChart({
						target:"chart2-3",
						categories,
						series,
						colors,
						unit:" 명",
						dataLabelsFormater:function(){
							if(this.point.index==series[this.colorIndex].data.length-1){
								return $.heum.setThousandSeparator(this.y)+"명";
							}
						},
						tooltipCallback:function({name,data,event}){
							const beforeData = series[event.point.colorIndex].data[event.point.index-1];
							let ratio;
							/*
							if(beforeData){
								ratio = "(전년 대비 <span class='color-red'>"+((((data - beforeData) / beforeData) * 100).toFixed(2))+"</span>%)"
							}
							*/
							if(beforeData){
								let rat = (((data - beforeData) / beforeData) * 100).toFixed(1);
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
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									//$("<h3/>",{"class":"modal__tit","text":name+" "+series[0].name+", "+name+" "+series[1].name+", "+name+" "+series[2].name}),
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
										$administStatsMap.ui.tooltipMap.title = series[event.point.colorIndex].name;
										
										let parameters = $.extend(true,{},_this.parameters);
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
										parameters.surv_year_list = parseInt(categories[event.point.index].replace("년",""));
										parameters.char_itm_id_list = columns[event.point.colorIndex];
										
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												//adm_cd: $administStatsMap.ui.admCd,
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : "명",
												callback:function(d){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															//$administStatsMap.ui.tooltipMap.title = series[event.point.colorIndex].name;
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":event.point.category}),
																$("<h3/>").append(title),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
															$("#tooltip-map-tooltip").empty().append(
																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																	//$("<h3/>",{"class":"modal__tit","text":event.point.category+" "+series[event.point.colorIndex].name}),
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
															$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt(event.point.category.replace("년",""));
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
				}
			);
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
				this.tbl_id = "DT_1A02002,DT_1A02023,DT_1A02015";
			}else if(this.tabIndex==1){
				this.tbl_id = "DT_1A02003,DT_1A02024,DT_1A02016";
			}else{
				return;
			}
			this.parameters = {
					surv_year_list :$administStatsMap.ui.year,
					org_id_list : "101",
					tbl_id_list : this.tbl_id,
					list_var_ord_list : "",
					char_itm_id_list : "T01,T02",
					prt_type : "",
					adm_cd : "",
					ov_l1_list : $administStatsMap.ui.admCd,
					ov_l2_list : "1,2",
					ov_l3_list : "",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : "",
			};			
			this.chart1();
			this.chart2(2);
			this.chart2(3);
			this.chart2(4);
			common_loading(false);
		},
		chart1:function(){
			$("#chart3-1").empty();
			const _this = this;
			let columns=[],groupKey,series,tables=[],categories=[],itemId=[];
			categories = ["귀농인","귀어인","귀촌인"];
			let colors = ["#264478", "#43682B", "#C55A11", "#4472C4", "#70AD47"];
			if(_this.tabIndex==0){
				title = "귀농어·귀촌인 성별 비중 ";
				groupKey = "OV_L2_ID";
				columns = ["2","1"];
				itemId = ["T02","T02","T01"];
				tables = ["DT_1A02002","DT_1A02023","DT_1A02015"];
				series=[{"name":"여자",data:[]},{"name":"남자",data:[]}];
				_this.parameters.ov_l2_list = "1,2";
				colors = ["#E67099","#3C8DA8"];
			}else if(_this.tabIndex==1){
				title = "귀농어·귀촌인 연령별 비중 ";
				groupKey = "OV_L2_ID";
				columns = ["05","04","03","02","01"];
				itemId = ["T02","T02","T01"];
				tables = ["DT_1A02003","DT_1A02024","DT_1A02016"];
				series=[{"name":"70대 이상",data:[]},{"name":"60대",data:[]},{"name":"50대",data:[]},{"name":"40대",data:[]},{"name":"30대 이하",data:[]}];
				_this.parameters.ov_l2_list = "01,02,03,04,05,06";
				colors = ["#264478", "#43682B", "#C55A11", "#4472C4", "#70AD47"];
			}else{
				return;
			}
			$("#chart3-1-title").data("append-text","년 "+title).text($administStatsMap.ui.year+"년 "+title);
			this.parameters.ov_l1_list = $administStatsMap.ui.admCd;
			
			$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data, param) {
				let chartData = [];
				$("#chart3-1-title-unit").text("(단위 : %,명)");	
				// 정렬
				data = data.sort(function (a, b) {
					if(a.CHAR_ITM_NM < b.CHAR_ITM_NM) return -1;
					if(a.CHAR_ITM_NM > b.CHAR_ITM_NM) return 1;
					if(a.CHAR_ITM_NM === b.CHAR_ITM_NM) return 0;
					else return -1;
				});

				// 귀농/귀어 T2 귀촌 T01 
				// 01+02 -> 01
				// 03    -> 02
				// 04    -> 03
				// 05    -> 04
				// 06    -> 05
				if(_this.tabIndex==0){
					data = data.filter(item=> (item.TBL_ID =="DT_1A02015" && item.CHAR_ITM_ID=="T01") || (item.TBL_ID !="DT_1A02015" && item.CHAR_ITM_ID=="T02") );
				}else{
					data = data.filter(item=> (item.TBL_ID =="DT_1A02016" && item.CHAR_ITM_ID=="T01") || (item.TBL_ID !="DT_1A02016" && item.CHAR_ITM_ID=="T02") );
					
					// 귀촌(연령별)은 치환해서 계산
					let newData = [];
					let DT_1A02016_data = [];
					DT_1A02016_data = data.filter(item=>item.TBL_ID=="DT_1A02016");
					
					// 01-06 순서로 정렬
					DT_1A02016_data = DT_1A02016_data.sort(function(a,b){ return a.OV_L2_ID-b.OV_L2_ID});
					
					// 01,02 합산 계산
					DT_1A02016_data.forEach(function(d,i){
						if(d.OV_L2_ID == "01"){
							newData.push(d);
						}else if(d.OV_L2_ID == "02"){
							newData.filter(item=>item.PRD_DE==d.PRD_DE).map(item=>item.DTVAL_CO = parseFloat(item.DTVAL_CO)+parseFloat(d.DTVAL_CO));
						}
					});
					
					// 01,02 제외
					DT_1A02016_data = DT_1A02016_data.filter(item=>item.OV_L2_ID!="01" && item.OV_L2_ID!="02");
					
					// 03,04,05,06 치환
					DT_1A02016_data.forEach(function(d,i){
						if(d.OV_L2_ID == "03"){
							d.OV_L2_ID = "02";
						}else if(d.OV_L2_ID == "04"){
							d.OV_L2_ID = "03";
						}else if(d.OV_L2_ID == "05"){
							d.OV_L2_ID = "04";
						}else if(d.OV_L2_ID == "06"){
							d.OV_L2_ID = "05";
						}
						newData.push(d);
					});
					
					// data 에서 DT_1A02016 제외
					data = data.filter(item=>item.TBL_ID!="DT_1A02016");
					
					// data 에 치환된 DT_1A02016 추가
					newData.forEach(item=>data.push(item));
				}
				
				data.forEach(item=>{
					const index = columns.indexOf(item.OV_L2_ID);
					series[index].data.push(parseFloat(item.DTVAL_CO));
				});
				
				createHorizontalStackBarChart({
					target:"chart3-1",
					categories,
					series,
					colors,
					tooltipCallback:function({name,data,event}){
						const tooltip = $("#chart3-1-container").find("[data-type=tooltip]:last");
						tooltip.empty();
						tooltip.append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								//$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.year+title+" "+event.point.category}),
								$("<h3/>",{"class":"modal__tit","text":event.point.category+" "+series[event.point.colorIndex].name}),	
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
									$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(event.point.y)}),"명"
								),
								$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
									//$administStatsMap.ui.tooltipMap.mapTotalVal = event.point.y;
									$administStatsMap.ui.tooltipMap.mapTotalVal = 0;
									$administStatsMap.ui.tooltipMap.title = event.point.category + series[event.point.colorIndex].name;
									
									let parameters = $.extend(true,{},_this.parameters);									
									parameters.tbl_id_list = tables[event.point.index];
									parameters.surv_year_list = $administStatsMap.ui.year;
									parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
									parameters.ov_l2_list = "0,"+columns[event.point.colorIndex];
									parameters.char_itm_id_list = itemId[event.point.index];
									// 귀촌인
									
									if( _this.tabIndex == 1 ){
										parameters.ov_l2_list = "06,05,04,03,02,01,00";
									}

									$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
										
										// 귀촌(연령별)은 치환해서 계산 시작
										if( parameters.tbl_id_list == "DT_1A02016" ){
											let newData = [];
											let DT_1A02016_data = [];
											//DT_1A02016_data = res.filter(item=>item.TBL_ID=="DT_1A02016");
											DT_1A02016_data = res;
											// 01-06 순서로 정렬
											DT_1A02016_data = DT_1A02016_data.sort(function(a,b){ return a.OV_L2_ID-b.OV_L2_ID});
											
											// 01,02 합산 계산
											DT_1A02016_data.forEach(function(d,i){
												if(d.OV_L2_ID == "01"){
													newData.push(d);
												}else if(d.OV_L2_ID == "02"){
													newData.filter(item=> (item.PRD_DE==d.PRD_DE)&&(item.OV_L1_ID==d.OV_L1_ID) ).map(item=>item.DTVAL_CO = parseFloat(item.DTVAL_CO)+parseFloat(d.DTVAL_CO));
													
												}
											});
											
											// 01,02 제외
											DT_1A02016_data = DT_1A02016_data.filter(item=>item.OV_L2_ID!="01" && item.OV_L2_ID!="02");
											
											// 03,04,05,06 치환
											DT_1A02016_data.forEach(function(d,i){
												if(d.OV_L2_ID == "03"){
													d.OV_L2_ID = "02";
												}else if(d.OV_L2_ID == "04"){
													d.OV_L2_ID = "03";
												}else if(d.OV_L2_ID == "05"){
													d.OV_L2_ID = "04";
												}else if(d.OV_L2_ID == "06"){
													d.OV_L2_ID = "05";
												}
												newData.push(d);
											});
											
											// 선택한 연령대만 추출
											res = newData.filter(item=>item.OV_L2_ID == columns[event.point.colorIndex] || item.OV_L2_ID == "00");
											
											res.forEach(item=>{
												const index = columns.indexOf(item.OV_L2_ID);
												if(item.OV_L2_ID != "00"){
													series[index].data.push(parseFloat(item.DTVAL_CO));
												}
											});
										}
										// 귀촌(연령별)은 치환해서 계산 끝
										
										let allData = res.filter(item=>item.OV_L2_ID == "0"||item.OV_L2_ID == "00");
										// 선택된 항목만 추출 (resultMapData.result.mapData)
										res = res.filter(item=>item.OV_L2_ID == columns[event.point.colorIndex]);
										
										//let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
										let resultMapData = {
											result : {
												mapData : []
											}
										};
										res.forEach(function(item,index){
											var forMapData = {};
											forMapData.adm_cd 		= item.OV_L1_ID;
											forMapData.region_nm 	= item.OV_L1_KOR;
											forMapData.dt 			= ((item.DTVAL_CO/allData[index].DTVAL_CO)*100).toFixed(1);
											
											resultMapData.result.mapData.push(forMapData);
										});
										
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											//adm_cd: $administStatsMap.ui.admCd,
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "dt",
											unit : "%",
											callback:function(d){
												$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														$("#tooltip-map-modal-title").empty().append(
															$("<h3>",{"text":$administStatsMap.ui.year+"년"}),
															$("<h3/>").append(title),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
														/*
														$("#tooltip-map-tooltip").empty().append(
															$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																$("<h3/>",{"class":"modal__tit","text":event.point.category+" "+series[event.point.colorIndex].name}),
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
																	$("<span/>",{"class":"color-red","data-id":"value","text":event.point.series.data[event.point.index].percentage.toFixed(1)}),"%"
																)
															)
														);
														*/
													},
													endCallback:function(){
														//$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt(categories[event.point.colorIndex].replace("년",""));
														$("#tooltip-map-tooltip").empty().append(
															$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																$("<h3/>",{"class":"modal__tit","text":event.point.category+" "+series[event.point.colorIndex].name}),
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
																	$("<span/>",{"class":"color-red","data-id":"value","text":event.point.series.data[event.point.index].percentage.toFixed(1)}),"%"
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
						);
						
						tooltip.show();
					}
				});
				common_loading(false);
			});
		},
		chart2:function(chartNo){
			const _this = this;
			let parameters = $.extend(true,{},this.parameters),title;
			parameters.surv_year_list = $administStatsMap.ui.yearList.join(",");
			parameters.ov_l1_list = "00";
			parameters.char_itm_id_list = "T02";
			
			let columns=[],groupKey,series,tables=[],colors;
			
			if(this.tabIndex==0){
				groupKey = "OV_L2_ID";
				checkId = "TBL_ID";
				columns = ["1","2"];
				series=[{"name":"남자",data:[]},{"name":"여자",data:[]}];
				parameters.char_itm_id_list = "T02";
				
				$administStatsMap.chartNo = chartNo;
				if( chartNo == 2 ){
					checkValue = "DT_1A02002";
					title = "연도별 귀농인 성별 비중";
				}else if( chartNo == 3 ){
					checkValue = "DT_1A02023";
					title = "연도별 귀어인 성별 비중";
				}else if( chartNo == 4 ){
					checkValue = "DT_1A02015";
					title = "연도별 귀촌인 성별 비중";
					parameters.char_itm_id_list = "T01";
				}
				colors = ["#3C8DA8","#E67099"];
			}else if(this.tabIndex==1){
				groupKey = "OV_L2_ID";
				checkId = "TBL_ID";
				columns = ["01","02","03","04","05"];
				series=[{"name":"30대 이하",data:[],val:[]},{"name":"40대",data:[],val:[]},{"name":"50대",data:[],val:[]},{"name":"60대",data:[],val:[]},{"name":"70대 이상",data:[],val:[]}];
				
				if( chartNo == 2 ){
					checkValue = "DT_1A02003";
					title = "연도별 귀농인 연령별 비중";
				}else if( chartNo == 3 ){
					checkValue = "DT_1A02024";
					title = "연도별 귀어인 연령별 비중";
				}else if( chartNo == 4 ){
					checkValue = "DT_1A02016";
					title = "연도별 귀촌인 연령별 비중";
					parameters.ov_l2_list = "06,05,04,03,02,01";
					parameters.char_itm_id_list = "T01";
				}
				colors = ["#70AD47","#4472C4","#C55A11","#43682B","#264478"];
			}
			$("#chart3-"+chartNo+"-title").data("append-text",title).empty().append(title,$("<span/>"));
			parameters.ov_l1_list = $administStatsMap.ui.admCd;
			
			$administStatsMap.utils.getTotsurvStatData(
				parameters,
				function(datas){
					//console.log('[chart3-2] 연도별 귀농/귀어/귀촌 현황 : '+JSON.stringify(data));
					let categories = $.extend(true,[],$administStatsMap.ui.yearList).sort().map(year=>year+"년");
					let total = [];
					if(_this.tabIndex==0){
						if( chartNo == 2 ){
							datas = datas.filter(item=>item.TBL_ID=="DT_1A02002");
						}else if( chartNo == 3 ){
							datas = datas.filter(item=>item.TBL_ID=="DT_1A02023");
						}else if( chartNo == 4 ){
							datas = datas.filter(item=>item.TBL_ID=="DT_1A02015");
						}
					} else if(_this.tabIndex==1){
						if( chartNo == 2 ){
							datas = datas.filter(item=>item.TBL_ID=="DT_1A02003");
						}else if( chartNo == 3 ){
							datas = datas.filter(item=>item.TBL_ID=="DT_1A02024");
						}else if( chartNo == 4 ){
							let newData = [];
							datas = datas.filter(item=>item.TBL_ID=="DT_1A02016");
							// 01,02 합산 계산
							datas.forEach(function(d,i){
								if(d.OV_L2_ID == "01"){
									newData.push(d);
								}else if(d.OV_L2_ID == "02"){
									newData.filter(item=>item.PRD_DE==d.PRD_DE).map(item=>item.DTVAL_CO = parseFloat(item.DTVAL_CO)+parseFloat(d.DTVAL_CO));
								}
							});
							// 01,02 제외
							datas = datas.filter(item=>item.OV_L2_ID!="01" && item.OV_L2_ID!="02");
							// 03,04,05,06 치환
							datas.forEach(function(d,i){
								if(d.OV_L2_ID == "03"){
									d.OV_L2_ID = "02";
								}else if(d.OV_L2_ID == "04"){
									d.OV_L2_ID = "03";
								}else if(d.OV_L2_ID == "05"){
									d.OV_L2_ID = "04";
								}else if(d.OV_L2_ID == "06"){
									d.OV_L2_ID = "05";
								}
								newData.push(d);
							});
							datas = newData;						
						}
					}
					datas.forEach(function(d){
						var tot = parseFloat(d.DTVAL_CO);
						if( total[d.PRD_DE] == null ){ 
							total[d.PRD_DE] = 0;
						};
						total[d.PRD_DE] = total[d.PRD_DE] + tot;
					});
					datas.forEach(function(d){
						const index = columns.indexOf(d[groupKey]);
						const yearTotal = total[d.PRD_DE];
						series[index].data.push( parseFloat(((parseFloat(d.DTVAL_CO)/yearTotal)*100).toFixed(1)) );
						series[index].yearTotal = yearTotal;
						series[index].val = series[index].val||[];
						series[index].val.push( parseFloat(d.DTVAL_CO) );
					});
					
					createMultiLineChart({
						target:"chart3-"+chartNo,
						categories,
						series,
						colors,
						dataLabelsFormater:function(){
							if(this.point.index==series[this.colorIndex].data.length-1){
								return this.y.toFixed(1)+"%";
							}
						},
						tooltipCallback:function({name,data,event}){
							const beforeData = series[event.point.colorIndex].data[event.point.index-1];
							let ratio;
							if(beforeData){
								let rat = (data - beforeData).toFixed(1);
								if(rat>0){
									ca = "증가↑";
									ratColor="blue";
								}else if(rat<0){
									ca = "감소↓";
									ratColor="red";
								}
								ratio = "(전년 대비 <span class='color-"+ratColor+"'>"+Math.abs(rat)+"</span>%p "+ca+")";
							}
							
							const tooltip = $("#chart3-"+chartNo+"-container").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":series[event.point.colorIndex].name}),
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
										//$administStatsMap.ui.tooltipMap.mapTotalVal = series[event.point.colorIndex].val[event.point.index];
										$administStatsMap.ui.tooltipMap.mapTotalVal = 0;
										$administStatsMap.ui.tooltipMap.title = series[event.point.colorIndex].name;
										
										let parameters = $.extend(true,{},_this.parameters);
										parameters.surv_year_list = parseInt(categories[event.point.index].replace("년",""));
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
										parameters.char_itm_id_list = "T02";
										
										if(_this.tabIndex==0){
											parameters.ov_l2_list = "0,"+columns[event.point.colorIndex];
											if( "chart3-2" == event.point.series.chart.renderTo.id ){
												parameters.tbl_id_list = "DT_1A02002";
											}else if( "chart3-3" == event.point.series.chart.renderTo.id  ){
												parameters.tbl_id_list = "DT_1A02023";
											}else if( "chart3-4" == event.point.series.chart.renderTo.id  ){
												parameters.tbl_id_list = "DT_1A02015";
												parameters.char_itm_id_list = "T01";
											}
										} else if(_this.tabIndex==1){
											parameters.ov_l2_list = "00,"+columns[event.point.colorIndex];
											if( "chart3-2" == event.point.series.chart.renderTo.id ){
												parameters.tbl_id_list = "DT_1A02003";
											}else if( "chart3-3" == event.point.series.chart.renderTo.id ){
												parameters.tbl_id_list = "DT_1A02024";
											}else if( "chart3-4" == event.point.series.chart.renderTo.id ){
												parameters.tbl_id_list = "DT_1A02016";
												parameters.char_itm_id_list = "T01";
												parameters.ov_l2_list = "06,05,04,03,02,01,00";
											}
										}
										
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											
											if( "chart3-4" == event.point.series.chart.renderTo.id ){
												let newData = [];
												res.sort(function(a, b) {
													return a.OV_L2_ID - b.OV_L2_ID;
												});
												// 01,02 합산 계산
												res.forEach(function(d,i){
													if(d.OV_L1_ID != "00" ){
														if(d.OV_L2_ID == "01"){
															newData.push(d);
														}else if(d.OV_L2_ID == "02"){
															newData.filter(function(item) {
																if(item.OV_L1_KOR==d.OV_L1_KOR) {
																	item.DTVAL_CO = parseFloat(item.DTVAL_CO)+parseFloat(d.DTVAL_CO);
																}
															});
														}
													}
												});
												// 01,02 제외
												res = res.filter(item=>item.OV_L2_ID!="01" && item.OV_L2_ID!="02");
												// 03,04,05,06 치환
												res.forEach(function(d,i){
													if(d.OV_L2_ID == "03"){
														d.OV_L2_ID = "02";
													}else if(d.OV_L2_ID == "04"){
														d.OV_L2_ID = "03";
													}else if(d.OV_L2_ID == "05"){
														d.OV_L2_ID = "04";
													}else if(d.OV_L2_ID == "06"){
														d.OV_L2_ID = "05";
													}
													newData.push(d);
												});
												res = newData;	
											}
											let allData = res.filter(item=>(item.OV_L2_ID == "0" || item.OV_L2_ID == "00") );
											
											if( "chart3-4" == event.point.series.chart.renderTo.id && _this.tabIndex==1){
												for (let i in allData){
													// 전국 제거
													if(allData[i].OV_L1_ID == "00"){
														allData.splice(i,1);
													}
												}
											}
											// 선택된 항목만 추출 (resultMapData.result.mapData)
											res = res.filter(item=>item.OV_L2_ID == columns[event.point.colorIndex]);
											
											//let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
											let resultMapData = {
												result : {
													mapData : []
												}
											};
											
											for (let i in res){
												// 전국 제거
												if(res[i].OV_L1_ID == "00"){
													res.splice(i,1);
												}
											}
											res.forEach(function(item, index){
												if(item.OV_L1_ID != "00") {
													var forMapData = {};
													forMapData.adm_cd 		= item.OV_L1_ID;
													forMapData.region_nm 	= item.OV_L1_KOR;
													forMapData.dt 			= ((parseFloat(item.DTVAL_CO)/parseFloat(allData[index].DTVAL_CO))*100).toFixed(1);
													
													resultMapData.result.mapData.push(forMapData);
												}
											});
											
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												//adm_cd: $administStatsMap.ui.admCd,
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : "%",
												callback:function(d){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															console.log("tooltipCallback >>>>>");
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":event.point.category}),
																$("<h3/>").append(title),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
															/*
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
															*/
														},
														endCallback:function(){
															//$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt(event.point.category.replace("년",""));
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
				}
			);
		}
	}
}