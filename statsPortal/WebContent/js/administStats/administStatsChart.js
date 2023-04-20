/**
 * 행정통계시각화 대쉬보드 차트 js
 */
let AdministStatsChart = {};

AdministStatsChart.consts = {
	/* 폰트 */
	//fontFamily : 'NanumSquare, sans-serif',
	fontFamily : "'NanumSquare', sans-serif",
	/* 하이차트 통신용 폰트 */
	notLocalFontFamily : "Noto saNs",
	/* 폰트사이즈 */
	fontSize : "11px",
	/* dataLabels 폰트사이즈 */
	dataLabelsFontSize : "11px",
	/* chart exporting 폰트사이즈 */
	exportingFontSize : "10px",
	/* chart exporting dataLabels 폰트사이즈 */
	exportingDataLabelsFontSize : "9px",
	/* textOutline */
	textOutline : "1px contrast",
	/* 차트 하이라이트 색 */
	sliceHighlightColor : "#E24F4F"
};

AdministStatsChart.ui = {
	/* 차트 생성 기본값 */
	chart : {
		chart : {
			style : {
				fontFamily : AdministStatsChart.consts.fontFamily
			}
		},
		title : {
			text : ""
		},
		subtitle : {
			text : ""
		},
		credits : {
			enabled : false
		},
		tooltip : {
			useHTML : true,
			animation : false,
			hideDelay : 0,
			borderWidth : 2,
			backgroundColor : "#FFFFFF",
			outside : true,
			style : {
				textAlign : "center",
				zIndex : 100,
				fontSize : AdministStatsChart.consts.fontSize,
				fontWeight : "bold",
				lineHeight : "15px"
			}
		},
		legend : {
			itemStyle : {
				cursor : "default",
				fontSize : AdministStatsChart.consts.fontSize
			},
			margin : 0
		},
		xAxis : {
			title : {
				text : "",
				enabled : false,
				style : {
					fontSize : AdministStatsChart.consts.fontSize,
					fontWeight : "bold"
				}
			},
			labels : {
				style : {
					fontSize : AdministStatsChart.consts.fontSize,
					fontWeight : "bold"
				}
			}
		},
		plotOptions : {
			series : {
				dataLabels : {
					enabled : true,
					crop : false,
					overflow : "allow",
					style : {
						fontSize : AdministStatsChart.consts.dataLabelsFontSize,
						fontWeight : "bold",
						lineHeight : "15px"
					},
					zIndex : 10
				}
			}
		},
		exporting : {
			fallbackToExportServer : false,
			enabled : false,
			allowHTML : true,
			chartOptions : {
				title : {
					style : {
						fontSize : "14px",
						fontWeight : "bold",
						fontFamily : "'NanumSquare', sans-serif",
					}
				},
				chart : {
					style : {fontFamily : "'NanumSquare', sans-serif",}
				},
				legend : {
					itemStyle : {
						fontSize : AdministStatsChart.consts.exportingFontSize,
						fontFamily : "'NanumSquare', sans-serif",
					}
				},
				xAxis : {
					title : {
						style : {
							fontSize : AdministStatsChart.consts.exportingFontSize,
							fontFamily : "'NanumSquare', sans-serif",
						}
					},
					labels : {
						style : {
							fontSize : AdministStatsChart.consts.exportingFontSize,
							fontFamily : "'NanumSquare', sans-serif",
						}
					}
				},
				yAxis : {
					title : {
						style : {
							fontSize : AdministStatsChart.consts.exportingFontSize,
							fontFamily : "'NanumSquare', sans-serif",
						}
					},
					labels : {
						style : {
							fontSize : AdministStatsChart.consts.exportingFontSize,
							fontFamily : "'NanumSquare', sans-serif",
						}
					},
					stackLabels : {
						style : {
							fontSize : AdministStatsChart.consts.exportingDataLabelsFontSize,
							fontFamily : "'NanumSquare', sans-serif",
						}
					}
				},
				plotOptions : {
					series : {
						dataLabels : {
							style : {
								fontSize : AdministStatsChart.consts.exportingDataLabelsFontSize,
								textOutline : AdministStatsChart.consts.textOutline,
								fontFamily : "'NanumSquare', sans-serif",
							}
						}
					},
					bar : {
						dataLabels : {
							style : {
								color : "#FFFFFF",
								fontWeight : "bold",
								fontSize : AdministStatsChart.consts.exportingDataLabelsFontSize,
								textOutline : AdministStatsChart.consts.textOutline,
								fontFamily : "'NanumSquare', sans-serif",
							}
						}
					},
					pie : {
						size : "150%",
						dataLabels : {
							style : {
								fontSize : AdministStatsChart.consts.dataLabelsFontSize,
								textOutline : AdministStatsChart.consts.textOutline,
								fontFamily : "'NanumSquare', sans-serif",
							}
						}
					},
					treemap : {
						dataLabels : {
							style : {
								color : "#FFFFFF",
								fontWeight : "bold",
								fontSize : AdministStatsChart.consts.exportingDataLabelsFontSize,
								textOutline : AdministStatsChart.consts.textOutline,
								fontFamily : "'NanumSquare', sans-serif",
							}
						}
					}
				}
			}
		}
	},
	/* 차트 생성용 exporting yAxis */
	exportingYAxis : {
		title : {
			style : {
				fontSize : AdministStatsChart.consts.exportingFontSize,
				fontFamily : "'NanumSquare', sans-serif",
			}
		},
		labels : {
			style : {
				fontSize : AdministStatsChart.consts.exportingFontSize,
				fontFamily : "'NanumSquare', sans-serif",
			}
		}
	}
};

/**
 * @name makeChart
 * @description 차트 생성
 * @param opt
 *            차트 생성 옵션
 */
AdministStatsChart.ui.makeChart = function(opt) {

	/* default */
	opt["chartId"] = $administStatsMain.util.getObjVal(opt, "chartId", "");
	opt["chartType"] = $administStatsMain.util.getObjVal(opt, "chartType", "");
	opt["series"] = $administStatsMain.util.getObjVal(opt, "series", {});
	opt["title"] = $administStatsMain.util.getObjVal(opt, "title", "");

	opt["filename"] = $administStatsMain.util.getObjVal(opt, "filename", (function() {
		const year = $(".sb_year option:selected").text();
		const sido = $(".tag_sido:eq(0)").text();
		let filename = "";
		if (!$administStatsMain.util.isEmpty(year)) {
			filename += year + " ";
		}
		if (!$administStatsMain.util.isEmpty(sido)) {
			filename += sido + " ";
		}
		filename += opt["title"];
		return filename;
	}()));
	opt["marginTop"] = $administStatsMain.util.getObjVal(opt, "marginTop", undefined);
	/* legend */
	opt["legend"] = $administStatsMain.util.getObjVal(opt, "legend", undefined);
	opt["seriesShowInLegend"] = $administStatsMain.util.getObjVal(opt, "seriesShowInLegend", false);
	opt["legendReversed"] = $administStatsMain.util.getObjVal(opt, "legendReversed", true);
	opt["legendItemClickEvent"] = $administStatsMain.util.getObjVal(opt, "legendItemClickEvent", function(event) {
		return false;
	});
	/* xAxis */
	opt["xAxis"] = $administStatsMain.util.getObjVal(opt, "xAxis", undefined);
	/* yAxis */
	opt["yAxis"] = $administStatsMain.util.getObjVal(opt, "yAxis", undefined);
	/* dataLabels */
	opt["dataLabelsInside"] = $administStatsMain.util.getObjVal(opt, "dataLabelsInside", false);
	opt["dataLabelsTextOutline"] = $administStatsMain.util.getObjVal(opt, "dataLabelsTextOutline", false);
	opt["dataLabelsAllowOverlap"] = $administStatsMain.util.getObjVal(opt, "dataLabelsAllowOverlap", true);
	opt["dataLabelsFormatter"] = $administStatsMain.util.getObjVal(opt, "dataLabelsFormatter", function(that) {
		return false;
	});
	/* tooltip */
	opt["annotations"] = $administStatsMain.util.getObjVal(opt, "annotations", undefined);
	opt["tooltipPositioner"] = $administStatsMain.util.getObjVal(opt, "tooltipPositioner", false);
	opt["tooltipFormatter"] = $administStatsMain.util.getObjVal(opt, "tooltipFormatter", function(that) {
		return false;
	});
	/* pie */
	opt["innerSize"] = $administStatsMain.util.getObjVal(opt, "innerSize", "50%");
	opt["distance"] = $administStatsMain.util.getObjVal(opt, "distance", 1);
	opt["subtitle"] = $administStatsMain.util.getObjVal(opt, "subtitle", undefined);
	opt["pie"] = $administStatsMain.util.getObjVal(opt, "pie", undefined);
	/* treemap */
	opt["layoutAlgorithm"] = $administStatsMain.util.getObjVal(opt, "layoutAlgorithm", "sliceAndDice");
	/* column, bar */
	opt["stacking"] = $administStatsMain.util.getObjVal(opt, "stacking", undefined);
	/* download */
	opt["exporting"] = $administStatsMain.util.getObjVal(opt, "exporting", undefined);
	opt["isBigExporting"] = $administStatsMain.util.getObjVal(opt, "isBigExporting", false);
	opt["exportingDataLabelsFormatter"] = $administStatsMain.util.getObjVal(opt, "exportingDataLabelsFormatter", undefined);
	opt["exportingSeries"] = $administStatsMain.util.getObjVal(opt, "exportingSeries", opt["series"]);
	opt["exportingShowInLegend"] = $administStatsMain.util.getObjVal(opt, "exportingShowInLegend", opt["seriesShowInLegend"]);
	/* click event */
	opt["cursor"] = $administStatsMain.util.getObjVal(opt, "cursor", "default");
	opt["eventClick"] = $administStatsMain.util.getObjVal(opt, "eventClick", undefined);
	/* colors */
	opt["colorAxis"] = $administStatsMain.util.getObjVal(opt, "colorAxis", undefined);
	opt["colorByPoint"] = $administStatsMain.util.getObjVal(opt, "colorByPoint", false);
	opt["fontSize"] = $administStatsMain.util.getObjVal(opt, "fontSize", AdministStatsChart.consts.dataLabelsFontSize);
	opt["colors"] = $administStatsMain.util.getObjVal(opt, "colors", (function() {
		let colors = [];
		const base = Highcharts.getOptions().colors[0];
		for (let i = 0; i < 6; i++) {
			colors.push(Highcharts.color(base).brighten((i - 3) / 7).get());
		}
		return colors;
	}()));
	/* complete callback */
	opt["callback"] = $administStatsMain.util.getObjVal(opt, "callback", function(that) {
		return false;
	});

	opt["filename"] = opt["filename"].replace("(전국)", "");
	if (opt["chartId"] == "regnChart" || opt["chartId"] == "tmsrChart" || opt["chartId"] == "tmsrChart2") {
		opt["title"] = opt["title"].replace("(전국)", "");
	}
	
	if( opt["chartId"] == "newlyChart4" && opt["title"].indexOf("(전국)") < 0 ){




		opt["title"] = ( opt["title"] + "(전국)" );
	}
	
	const $parent = $("#" + opt["chartId"]).closest(".row");
	$parent.find("." + opt["chartId"] + "_title").html(opt["title"]).attr("title", opt["title"].replace(/(<([^>]+)>)/ig, "").replace("&nbsp;", " "));
	opt["title"] = opt["title"].replace("(전국)", "");

	let chart = $.extend(true, _.cloneDeep(AdministStatsChart.ui.chart), {
		chart : {
			renderTo : opt["chartId"],
			type : opt["chartType"],
			events : opt["events"]
		},
		series : opt["series"],
		tooltip : {
			formatter : function() {
				return opt["tooltipFormatter"](this);
			}
		},
		legend : {
			reversed : opt["chartType"] == "column" ? false : opt["legendReversed"]
		},
		colorAxis : opt["colorAxis"],
		colors : opt["colors"],
		yAxis : {
			title : {
				text : "",
				enabled : false
			},
			labels : {
				enabled : false
			},
			gridLineWidth : 0
		},
		plotOptions : {
			series : {
				showInLegend : opt["seriesShowInLegend"],
				/*
				pointPadding : (function(){
					if($administStatsMain.ui.chart.hasOwnProperty('more1Chart10') && !$administStatsMain.ui.chart.hasOwnProperty('tmsrChart')){
						return 0.3 
					}else{
						return 0.1 
					}
				}()),
				*/
				groupPadding: 0.1,
				stacking : $administStatsMain.util.isEmpty(opt["stacking"]) ? undefined : opt["stacking"],
				cursor : opt["cursor"],
				dataLabels : {
					allowOverlap : opt["dataLabelsAllowOverlap"],
					formatter : function() {
						if(opt["dataLabelsFormatter"](this) != undefined) {
							if(opt["dataLabelsFormatter"](this).toString().indexOf("%") != -1) {
								return opt["dataLabelsFormatter"](this);
							} else {
								let fmtVal = opt["dataLabelsFormatter"](this).replace(/,/g, "");
								/*
								let valChk = opt["dataLabelsFormatter"](this).replace(/[^0-9]/g,"");
								if(gv_mode == 'retun'){
									if(opt.series[0].data[this.point.index].dataObj.SMBL_CN != undefined){
										let fmtUnit = opt["dataLabelsFormatter"](this).replace(/[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/gi,"");
										return "x " + fmtUnit;
									}else{
										return opt["dataLabelsFormatter"](this);
									}
								}else{
									return opt["dataLabelsFormatter"](this);
								}
								*/
								return opt["dataLabelsFormatter"](this);
							}
						}
						//if(parseInt(opt["dataLabelsFormatter"](this)) <= 3) {
							//return "x";
						//} else {
							
						//}
					},
					style : {
						textOutline : false
					}
				},
				events : {
					click : function(e) {
						if ($administStatsMain.util.isEmpty(opt["eventClick"])) {
							return false;
						}
						return opt["eventClick"](e, this);
					},
					legendItemClick : function(e) {
						return opt["legendItemClickEvent"](e);
					}
				},
				states : {
					select : {
						color : AdministStatsChart.consts.sliceHighlightColor
					}
				}
			},
			pie : {
				slicedOffset : 0,
				innerSize : opt["innerSize"],
				dataLabels : {
					distance : opt["distance"],
					style : {
						color : "#000000"
					}
				},
				point : {
					events : {
						legendItemClick : function(e) {
							return opt["legendItemClickEvent"](e);
						}
					}
				}
			},
			column : {
				borderRadius : 5,
				colorByPoint : opt["colorByPoint"],
				dataLabels : {
					inside : opt["dataLabelsInside"],
					style : {
						fontSize : opt["fontSize"]
					}
				}
			},
			bar : {
				borderRadius : 5,
				colorByPoint : opt["colorByPoint"],
				dataLabels : {
					inside : opt["dataLabelsInside"],
					style : {
						fontWeight : "bold",
						color : (function() {
							if (opt["dataLabelsInside"]) {
								return "#FFFFFF";
							} else {
								return "#000000";
							}
						}())
					}
				}
			},
			treemap : {
				layoutAlgorithm : opt["layoutAlgorithm"],
				dataLabels : {
					style : {
						color : "#FFFFFF",
					}
				},
				point : {
					events : {
						select : function() {
							if ($administStatsMain.util.isEmpty(this.oriColor)) {
								this.oriColor = this.color;
							}
							this.update({
								color : AdministStatsChart.consts.sliceHighlightColor
							});
						},
						unselect : function() {
							this.update({
								color : this.oriColor
							});
						}
					}
				}
			}
		},
		exporting : {
			filename : opt["filename"].replace(/ /gi, "_").replace("/4", ""),
			chartOptions : {
				title : {
					text : opt["filename"]
				},
				series : opt["exportingSeries"],
				plotOptions : {
					series : {
						dataLabels : {
							formatter : function() {
								return $administStatsMain.util.isEmpty(opt["exportingDataLabelsFormatter"]) ? opt["dataLabelsFormatter"](this) : opt["exportingDataLabelsFormatter"](this);
							}
						},
						showInLegend : opt["exportingShowInLegend"]
					},
					bar : {
						dataLabels : {
							style : {
								color : (function() {
									if (opt["dataLabelsInside"]) {
										return "#FFFFFF";
									} else {
										return "#000000";
									}
								}())
							}
						}
					}
				}
			}
		}
	});

	if (!$administStatsMain.util.isEmpty(opt["subtitle"])) {
		chart = $.extend(true, chart, {
			subtitle : opt["subtitle"]
		});
	}
	if (!$administStatsMain.util.isEmpty(opt["marginTop"])) {
		chart.chart.marginTop = opt["marginTop"];
	}
	if (!$administStatsMain.util.isEmpty(opt["marginRight"])) {
		chart.chart.marginRight = opt["marginRight"];
	}
	if (!$administStatsMain.util.isEmpty(opt["xAxis"])) {
		chart = $.extend(true, chart, {
			xAxis : opt["xAxis"]
		});
	}
	if (!$administStatsMain.util.isEmpty(opt["yAxis"])) {
		chart = $.extend(true, chart, {
			yAxis : opt["yAxis"]
		});
	}
	if (!$administStatsMain.util.isEmpty(opt["annotations"])) {
		chart = $.extend(true, chart, {
			annotations : opt["annotations"]
		});
	}
	if (!$administStatsMain.util.isEmpty(opt["legend"])) {
		chart = $.extend(true, chart, {
			legend : opt["legend"]
		});
	}
	if (opt["dataLabelsTextOutline"]) {
		chart.plotOptions.series.dataLabels.style.textOutline = AdministStatsChart.consts.textOutline;
	}
	if ($.inArray(opt["chartType"], [ "treemap" ]) > -1) {
		delete chart.exporting.chartOptions.xAxis;
		delete chart.exporting.chartOptions.yAxis;
	}
	if (!$administStatsMain.util.isEmpty(opt["pie"])) {
		chart = $.extend(true, chart, {
			plotOptions : {
				pie : opt["pie"]
			}
		});
	}
	if (!$administStatsMain.util.isEmpty(opt["exporting"])) {
		chart = $.extend(true, chart, {
			exporting : opt["exporting"]
		});
	}
	if (opt["isBigExporting"]) {
		chart = $.extend(true, chart, {
			exporting : {
				sourceWidth : 960,
				sourceHeight : 540
			}
		});
	}
	if ($.isFunction(opt["tooltipPositioner"])) {
		chart.tooltip.positioner = opt["tooltipPositioner"];
	} else if (opt["tooltipPositioner"]) {
		if ($.inArray(opt["chartType"], [ "column", "line", "area" ]) > -1) {
			chart.tooltip.positioner = function(labelWidth, labelHeight, point) {
				const chartPosition = this.chart.pointer.getChartPosition();
				const tooltipX = point.plotX;
				const tooltipY = point.plotY;
				return {
					x : chartPosition.left + tooltipX - (labelWidth / 2),
					y : chartPosition.top + tooltipY + (labelHeight / 4)
				}
			}
		}
	}
	$administStatsMain.ui.chart[opt["chartId"]] = new Highcharts.Chart(chart, function(chart) {
		opt["callback"](this, chart);
		if (!$administStatsMain.util.isEmpty($administStatsMain.ui.selChartId)) {
			if ($administStatsMain.ui.selChartId == opt["chartId"]) {
				chart.series[$administStatsMain.ui.selSeriesIdx].data[$administStatsMain.ui.selDataIdx].select();
			}
		}
	});
	//차트 커스텀으로 인한 추가 배천규 221214 
	//일자리행정통계 카드 배경 초기화
	$("#more1Card1 .highcharts-background").attr("fill", "none");
	$("#more1Card2 .highcharts-background").attr("fill", "none");
	$("#more1Card3 .highcharts-background").attr("fill", "none");
	$("#more1Card4 .highcharts-background").attr("fill", "none");
	$("#more1Card5 .highcharts-background").attr("fill", "none");
	$("#more1Chart6 .highcharts-background").attr("fill", "none");
	
	
	
	
	
	//일자리행정통계 산업대분류 이미지 변경
	/*if(opt.chartId ==='more1Chart9'){
		for(let i = 0; i < 6; i++){
			var num = i+1;
			$("#more1Chart9 .highcharts-series-1 image:nth-child("+ num +")").attr("href","/images/administStats/more1/more1Dash_"+opt.series[0].data[i].OV_L1_ID+".png");
		}
	}*/
	

	//일자리행정통계 산업대분류 이미지 변경
	if(opt.chartId ==='more1Chart9'){
		for(let i = 0; i < 6; i++){
			var num = i+1;
			var transform = $("#more1Chart9 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform");
			var selectYear = $administStatsMain.ui.selectedYear;
			transformX = transform.split(",");
			$("#more1Chart9 .highcharts-series-1 image:nth-child("+ num +")").attr("href","/images/administStats/more1/more1Dash_"+opt.series[0].data[i].OV_L1_ID+".png");
			
			
			//console.log(opt.series[0].data[i].y)
			$("#more1Chart9 .highcharts-spline-series").css("transform", "translate(-5px,0px)");
			if(selectYear == "2016"){
				if(opt.series[0].data[i].y > 0 && opt.series[0].data[i].y < 5){
					$("#more1Chart9 .highcharts-column-series .highcharts-point:nth-child("+ num +")").css("height","34px");
					$("#more1Chart9 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","233");
					$("#more1Chart9 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",10)");
				}else if(opt.series[0].data[i].y < 0 && opt.series[0].data[i].y > -5){
					$("#more1Chart9 .highcharts-column-series .highcharts-point:nth-child("+ num +")").css("height","26px");
					$("#more1Chart9 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","55");
					$("#more1Chart9 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",80)");
				}
			}else if(selectYear == "2018"){
				if(opt.series[0].data[i].y > 0 && opt.series[0].data[i].y < 5){
					$("#more1Chart9 .highcharts-column-series .highcharts-point:nth-child("+ num +")").css("height","34px");
					$("#more1Chart9 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","20");
					$("#more1Chart9 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",-3)");
				}else if(opt.series[0].data[i].y < 0 && opt.series[0].data[i].y > -5){
					$("#more1Chart9 .highcharts-column-series .highcharts-point:nth-child("+ num +")").css("height","26px");
					$("#more1Chart9 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","55");
					$("#more1Chart9 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",80)");
				}
			}else {
				if(opt.series[0].data[i].y > 0 && opt.series[0].data[i].y < 5){
					$("#more1Chart9 .highcharts-column-series .highcharts-point:nth-child("+ num +")").css("height","34px");
					$("#more1Chart9 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","40");
					$("#more1Chart9 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",10)");
				}else if(opt.series[0].data[i].y < 0 && opt.series[0].data[i].y > -5){
					$("#more1Chart9 .highcharts-column-series .highcharts-point:nth-child("+ num +")").css("height","26px");
					$("#more1Chart9 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","82");
					$("#more1Chart9 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",110)");
				}
			}
			
		}
	}
	
	//조직형태별일자리구모및 증감 총계 범례 push
	if(opt.chartId ==='more1Chart4'){
		for(let i = 0; i < 4; i++){
			var num = i+1;
			$("#more1Chart4TotTxt"+num).text($administStatsMain.util.addComma(opt.series[0].data[i].dataObj.DTVAL_CO) +"만개");
		}
	}
	
	
	
	//퇴직연금통계 가로누적막대 커스텀
	if(opt.chartId ==='more2Chart2'){
		opt.tooltipShared = $administStatsMain.util.getObjVal(opt, "tooltipShared", true);
		$("#more2Chart2 svg > .highcharts-stack-labels").attr("transform","translate(-10,10)");
		/*$("#more2Chart2 .highcharts-stack-labels g:nth-child(1)").attr("transform","translate(100,10)");
		$("#more2Chart2 .highcharts-stack-labels g:nth-child(2)").attr("transform","translate(100,57)");
		$("#more2Chart2 .highcharts-stack-labels g:nth-child(3)").attr("transform","translate(100,103)");
		$("#more2Chart2 .highcharts-stack-labels g:nth-child(4)").attr("transform","translate(100,148)")*/;
	}
	
	//퇴직연금통계 가로누적막대 커스텀
	if(opt.chartId ==='more2Chart3'){
		opt.tooltipShared = $administStatsMain.util.getObjVal(opt, "tooltipShared", true);
		/*$("#more2Chart3 .highcharts-stack-labels g:nth-child(1)").attr("transform","translate(100,8)");
		$("#more2Chart3 .highcharts-stack-labels g:nth-child(2)").attr("transform","translate(100,42)");
		$("#more2Chart3 .highcharts-stack-labels g:nth-child(3)").attr("transform","translate(100,78)");
		$("#more2Chart3 .highcharts-stack-labels g:nth-child(4)").attr("transform","translate(100,115)");
		$("#more2Chart3 .highcharts-stack-labels g:nth-child(5)").attr("transform","translate(100,150)");*/
		$("#more2Chart3 svg > .highcharts-stack-labels").attr("transform","translate(-10,10)");
	}
	
	

	
	/*//임금근로 일자리동향 산업대분류 커스텀
	if(opt.chartId ==='more3Chart3'){
		for(let i = 0; i < 21; i++){
			var num = i+1;
			var selectYear = $administStatsMain.ui.selectedYear;
			
			
			//이미지 셋팅
			$("#more3Chart3 .highcharts-series-1 image:nth-child("+ num +")").attr("href","/images/administStats/more3/more3Dash_"+opt.series[0].data[i].key+".png");
			$("#more3Chart3 .highcharts-spline-series").css("transform", "translate(23px,38px)");
			
			if(selectYear =="202003"){
				//y 값 5이하시 이미지 높이값 설정
				$("#more3Chart3 .highcharts-spline-series").css("transform", "translate(26px,-5px)");
				if(opt.series[0].data[i].y > 0 && opt.series[0].data[i].y < 5 ){
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").css("height","20px");
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","57");
					$("#more3Chart3 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",30)");
				}else if(opt.series[0].data[i].y < 0 && opt.series[0].data[i].y > -5 ){
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").css("height","20px");
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","76");
					$("#more3Chart3 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",95)");
				}else if(opt.series[0].data[i].y == 0 ){
					$("#more3Chart3 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",30)");
				}
				
			}else if(selectYear =="201801" ||selectYear =="202102" ||selectYear =="202202" ){
				//y 값 5이하시 이미지 높이값 설정
				if(selectYear =="202102"){
					$("#more3Chart3 .highcharts-spline-series").css("transform", "translate(26px,-5px)");
				}else {
					$("#more3Chart3 .highcharts-spline-series").css("transform", "translate(24px,-5px)");
				}
				
				if(opt.series[0].data[i].y > 0 && opt.series[0].data[i].y < 5 ){
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").css("height","20px");
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","90");
					$("#more3Chart3 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",65)");
				}else if(opt.series[0].data[i].y < 0 && opt.series[0].data[i].y > -5 ){
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").css("height","20px");
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","113.5");
					$("#more3Chart3 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",135)");
				}else if(opt.series[0].data[i].y == 0 ){
					$("#more3Chart3 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",75)");
				}
				
			}else if(selectYear =="201802" ||selectYear =="202104"){
				//y 값 5이하시 이미지 높이값 설정
				$("#more3Chart3 .highcharts-spline-series").css("transform", "translate(26px,-5px)");
				if(opt.series[0].data[i].y > 0 && opt.series[0].data[i].y < 5 ){
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").css("height","20px");
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","56");
					$("#more3Chart3 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",30)");
				}else if(opt.series[0].data[i].y < 0 && opt.series[0].data[i].y > -5 ){
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").css("height","20px");
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","76");
					$("#more3Chart3 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",95)");
				}else if(opt.series[0].data[i].y == 0 ){
					$("#more3Chart3 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",40)");
				}
				
			}else if(selectYear =="201803"){
				//y 값 5이하시 이미지 높이값 설정
				$("#more3Chart3 .highcharts-spline-series").css("transform", "translate(26px,-5px)");
				if(opt.series[0].data[i].y > 0 && opt.series[0].data[i].y < 5 ){
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").css("height","20px");
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","30");
					$("#more3Chart3 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",5)");
				}else if(opt.series[0].data[i].y < 0 && opt.series[0].data[i].y > -5 ){
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").css("height","20px");
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","50.5");
					$("#more3Chart3 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",70)");
				}else if(opt.series[0].data[i].y == 0 ){
					$("#more3Chart3 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",5)");
				}
				
			}else if(selectYear =="201804"){
				//y 값 5이하시 이미지 높이값 설정
				$("#more3Chart3 .highcharts-spline-series").css("transform", "translate(26px,-5px)");
				if(opt.series[0].data[i].y > 0 && opt.series[0].data[i].y < 5 ){
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").css("height","20px");
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","55");
					$("#more3Chart3 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",30)");
				}else if(opt.series[0].data[i].y < 0 && opt.series[0].data[i].y > -5 ){
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").css("height","20px");
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","76.5");
					$("#more3Chart3 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",95)");
				}else if(opt.series[0].data[i].y == 0 ){
					$("#more3Chart3 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",40)");
				}
				
			}else if(selectYear =="202201"){
				//y 값 5이하시 이미지 높이값 설정
				$("#more3Chart3 .highcharts-spline-series").css("transform", "translate(23px,-5px)");
				if(opt.series[0].data[i].y > 0 && opt.series[0].data[i].y < 5 ){
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").css("height","20px");
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","130");
					$("#more3Chart3 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",105)");
				}else if(opt.series[0].data[i].y < 0 && opt.series[0].data[i].y > -5 ){
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").css("height","20px");
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","76.5");
					$("#more3Chart3 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",95)");
				}else if(opt.series[0].data[i].y == 0 ){
					$("#more3Chart3 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",115)");
				}
				
			}else {
				//y 값 5이하시 이미지 높이값 설정
				if(opt.series[0].data[i].y > 0 && opt.series[0].data[i].y < 5 ){
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").css("height","20px");
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","81.5");
					$("#more3Chart3 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",55)");
				}else if(opt.series[0].data[i].y < 0 && opt.series[0].data[i].y > -5 ){
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").css("height","20px");
					$("#more3Chart3 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","101.5");
					$("#more3Chart3 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",120)");
				}else if(opt.series[0].data[i].y == 0 ){
					$("#more3Chart3 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",65)");
				}
			}
			
			
			
		}
	}*/
	
	//임금근로 연령대별 데이터라벨 위치수정
	if(opt.chartId =="more3Chart8"){
		$("#more3Chart8 .highcharts-pie-series .highcharts-data-label-color-2").attr("transform","translate(0,80)");
	}
	
};

/**
 * @name makeCombinationsChart
 * @description 복합차트 생성
 * @param opt
 *            차트 생성 옵션
 */
AdministStatsChart.ui.makeCombinationsChart = function(opt) {

	/* default */
	opt["chartId"] = $administStatsMain.util.getObjVal(opt, "chartId", "");
	opt["series"] = $administStatsMain.util.getObjVal(opt, "series", {});
	opt["title"] = $administStatsMain.util.getObjVal(opt, "title", "");
	opt["filename"] = $administStatsMain.util.getObjVal(opt, "filename", (function() {
		const year = $(".sb_year option:selected").text();
		const sido = $(".tag_sido:eq(0)").text();
		let filename = "";
		if (!$administStatsMain.util.isEmpty(year)) {
			filename += year + " ";
		}
		if (!$administStatsMain.util.isEmpty(sido)) {
			filename += sido + " ";
		}
		filename += opt["title"];
		return filename;
	}()));
	opt["marginTop"] = $administStatsMain.util.getObjVal(opt, "marginTop", 30);
	/* xAxis */
	opt["xAxis"] = $administStatsMain.util.getObjVal(opt, "xAxis", undefined);
	/* yAxis */
	opt["yAxis"] = $administStatsMain.util.getObjVal(opt, "yAxis", undefined);
	/* legend */
	opt["legend"] = $administStatsMain.util.getObjVal(opt, "legend", undefined);
	opt["seriesShowInLegend"] = $administStatsMain.util.getObjVal(opt, "seriesShowInLegend", true);
	opt["legendItemClickEvent"] = $administStatsMain.util.getObjVal(opt, "legendItemClickEvent", function(event) {
		return false;
	});
	/* dataLabels */
	opt["dataLabelsAllowOverlap"] = $administStatsMain.util.getObjVal(opt, "dataLabelsAllowOverlap", true);
	/* tooltip */
	opt["tooltipPositioner"] = $administStatsMain.util.getObjVal(opt, "tooltipPositioner", false);
	opt["tooltipShared"] = $administStatsMain.util.getObjVal(opt, "tooltipShared", false);
	/* download */
	opt["exportingSeries"] = $administStatsMain.util.getObjVal(opt, "exportingSeries", opt["series"]);
	opt["exportingYAxis"] = $administStatsMain.util.getObjVal(opt, "exportingYAxis", undefined);
	/* colors */
	opt["colors"] = $administStatsMain.util.getObjVal(opt, "colors", undefined);
	/* click event */
	opt["cursor"] = $administStatsMain.util.getObjVal(opt, "cursor", "default");
	opt["eventClick"] = $administStatsMain.util.getObjVal(opt, "eventClick", function(event) {
		return false;
	});
	/* hover event */
	opt["eventMouseOver"] = $administStatsMain.util.getObjVal(opt, "eventMouseOver", function(event) {
		return false;
	});
	opt["eventMouseOut"] = $administStatsMain.util.getObjVal(opt, "eventMouseOut", function(event) {
		return false;
	});
	/* complete callback */
	opt["callback"] = $administStatsMain.util.getObjVal(opt, "callback", function(that) {
		return false;
	});

	opt["filename"] = opt["filename"].replace("(전국)", "");
	if (opt["chartId"] == "regnChart" || opt["chartId"] == "tmsrChart" || opt["chartId"] == "tmsrChart2") {
		opt["title"] = opt["title"].replace("(전국)", "");
	}
	const $parent = $("#" + opt["chartId"]).closest(".row");
	$parent.find("." + opt["chartId"] + "_title").html(opt["title"]).attr("title", opt["title"].replace(/(<([^>]+)>)/ig, "").replace("&nbsp;", " "));
	opt["title"] = opt["title"].replace("(전국)", "");

	let chart = $.extend(true, _.cloneDeep(AdministStatsChart.ui.chart), {
		chart : {
			renderTo : opt["chartId"],
			marginTop : opt["marginTop"]
		},
		series : opt["series"],
		tooltip : {
			formatter : function() {
				return opt["tooltipFormatter"](this);
			},
			shared : opt["tooltipShared"],
			crosshairs : opt["tooltipShared"]
		},
		plotOptions : {
			series : {
				showInLegend : opt["seriesShowInLegend"],
				cursor : opt["cursor"],
				connectNulls: true,
				dataLabels : {
					allowOverlap : opt["dataLabelsAllowOverlap"],
					formatter : function() {
						return opt["dataLabelsFormatter"](this);
					}
				},
				events : {
					click : function(e) {
						return opt["eventClick"](e, this);
					},
					legendItemClick : function(e) {
						return opt["legendItemClickEvent"](e);
					},
					mouseOver : function(e) {
						return opt["eventMouseOver"](this);
					},
					mouseOut : function(e) {
						return opt["eventMouseOut"](this);
					}
				}
			},
			line : {
				marker : {
					states : {
						select : {
							radiusPlus : 1,
							lineColor : AdministStatsChart.consts.sliceHighlightColor
						}
					}
				}
			}
		},
		exporting : {
			filename : opt["filename"].replace(/ /gi, "_").replace("/4", ""),
			chartOptions : {
				title : {
					text : opt["filename"],
				},
				chart : {
					marginTop : 50
				},
				series : opt["exportingSeries"]
			}
		}
	});
	if (!$administStatsMain.util.isEmpty(opt["xAxis"])) {
		chart = $.extend(true, chart, {
			xAxis : opt["xAxis"]
		});
	}
	if (!$administStatsMain.util.isEmpty(opt["yAxis"])) {
		chart.yAxis = opt["yAxis"];
	}
	chart = $.extend(true, chart, {
		exporting : {
			sourceWidth : 960,
			sourceHeight : 540,
			chartOptions : {
				yAxis : (function(exportingYAxis) {
					if ($.isArray(exportingYAxis)) {
						$.each(exportingYAxis, function(i, v) {
							exportingYAxis[i] = $.extend(true, exportingYAxis[i], _.cloneDeep(AdministStatsChart.ui.exportingYAxis));
						});
					} else {
						exportingYAxis = $.extend(true, exportingYAxis, _.cloneDeep(AdministStatsChart.ui.exportingYAxis));
					}
					return exportingYAxis;
				}(!$administStatsMain.util.isEmpty(opt["exportingYAxis"]) ? opt["exportingYAxis"] : _.cloneDeep(opt["yAxis"])))
			}
		},
	});
	if (!$administStatsMain.util.isEmpty(opt["colors"])) {
		chart.colors = opt["colors"];
	}
	if (!$administStatsMain.util.isEmpty(opt["legend"])) {
		chart = $.extend(true, chart, {
			legend : opt["legend"]
		});
	}
	if ($.isFunction(opt["tooltipPositioner"])) {
		chart.tooltip.positioner = opt["tooltipPositioner"];
	} else if (opt["tooltipPositioner"]) {
		chart.tooltip.positioner = function(labelWidth, labelHeight, point) {
			const chartPosition = this.chart.pointer.getChartPosition();
			const tooltipX = point.plotX;
			const tooltipY = point.plotY;
			return {
				x : chartPosition.left + tooltipX,
				y : chartPosition.top + tooltipY + (labelHeight / 2)
			}
		}
	}
	$administStatsMain.ui.chart[opt["chartId"]] = new Highcharts.Chart(chart, function(chart) {
		opt["callback"](this, chart);
	});
	
	//차트 커스텀으로 인한 추가 배천규 221214
	
	//퇴직연금통계 주요산업별1
	if(opt.chartId ==='more2Chart5'){
		for(let i = 0; i < 7; i++){
			var num = i+1;
			var transform = $("#more2Chart5 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform");
			transformX = transform.split(",");
			$("#more2Chart5 .highcharts-series-1 image:nth-child("+ num +")").attr("href","/images/administStats/more3/more3Dash_"+opt.series[0].data[i].dataObj.OV_L1_ID+".png");
			
			//y 값 30000 이하시 이미지 높이값 설정
			if(opt.series[0].data[i].y < 30000*1 ){
				//console.log(opt.series[0].data[i].y);
				$("#more2Chart5 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("height","30");
				$("#more2Chart5 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","125");
				$("#more2Chart5 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",105)");
			
			}
		}
	}
	//퇴직연금통계 주요산업별2
	if(opt.chartId ==='more2Chart7'){
		for(let i = 0; i < 7; i++){
			var num = i+1;
			var transform = $("#more2Chart7 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform");
			transformX = transform.split(",");
			$("#more2Chart7 .highcharts-series-1 image:nth-child("+ num +")").attr("href","/images/administStats/more3/more3Dash_"+opt.series[0].data[i].dataObj.OV_L1_ID+".png");
			
			//y 값 400000 이하시 이미지 높이값 설정
			if(opt.series[0].data[i].y < 400000*1 ){
				//console.log(opt.series[0].data[i].y);
				$("#more2Chart7 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("height","25");
				$("#more2Chart7 .highcharts-column-series .highcharts-point:nth-child("+ num +")").attr("y","129");
				$("#more2Chart7 .highcharts-column-series .highcharts-data-label:nth-child("+ num +")").attr("transform", transformX[0]+",105)");
			
			}
		}
	}
	
};

/**
 * @name makeRegnChart
 * @description 지역별 차트 생성
 * @param mode
 *            1(처음), 2(지도선택), 3(년도 변경)
 */
AdministStatsChart.ui.makeRegnChart = function(mode) {

	if ($administStatsMain.util.isEmpty($administStatsMain.ui.selRegnParam)) {
		const tmsr_title = $administStatsMain.ui.selTmsrParam.tmsr_title;
		$administStatsMain.ui.setNoneChart("regnChart", tmsr_title);
		/* 지도 */
		$(".tag_title").text(tmsr_title).attr("title", tmsr_title);
		if ($("#mapArea").find(".map_none").length == 0) {
			$("#mapRgn_3").append("<div class='map_none' style='top:0 !important;'><img src='/images/totSurv/ChartNone.png' /></div>");
			$(".map_none").css("width", $("#mapArea").css("width"));
			
			$administStatsMap.ui.map.gMap.dragging.disable();
		}
		
		$administStatsMap.ui.clearMap($administStatsMap.ui.map);
		return false;
	} else {
		if( $administStatsMap.ui.map && $administStatsMap.ui.map.gMap ){
			$administStatsMap.ui.map.gMap.dragging.enable();
		}
	}

	$administStatsMain.ui.selRegnParam.surv_year_list = $administStatsMain.ui.selectedYear;
	$administStatsMain.ui.selRegnParam.regn_chartId = "regnChart";
	const opt_digits = $administStatsMain.util.getObjVal($administStatsMain.ui.selRegnParam, "opt_digits", 0);
	const curYear = $administStatsMain.ui.selectedYear;
	let opt_fnCalc;
	if ($administStatsMain.ui.selRegnParam.hasOwnProperty("opt_fnCalc")) {
		opt_fnCalc = $administStatsMain.ui.selRegnParam.opt_fnCalc;
	}
	$administStatsMain.ui.selRegnParam.opt_fnCalc = null;
	$administStatsMain.util.getTotsurvStatData($administStatsMain.ui.selRegnParam, function(data) {
		if (typeof opt_fnCalc === "function") {
			$administStatsMain.ui.selRegnParam.opt_fnCalc = opt_fnCalc;
			data = opt_fnCalc(data);
		}

		if (mode == "2") {
			if ($administStatsMap.ui.map != null) {
				$administStatsMap.ui.map.update();
			}
		} else {
			$administStatsMain.ui.drawContent(data);
		}

		const toJson = $administStatsMain.util.arrayToJson({
			data : data,
			key : "OV_L1_ID"
		});
		const sidoAllKey = toJson[curYear]["00"] != undefined ? "00" : "000";
		let series = [ {
			data : []
		} ];

		let total = 0;
		Object.keys(toJson[curYear]).sort().forEach(function(OV_L1_ID) {
			if(gv_mode == 'retun'){
				if (OV_L1_ID == "00" || OV_L1_ID == "000") {
					total += toJson[curYear][OV_L1_ID].DTVAL_CO;
				}
			}else{
			if (OV_L1_ID != "00" && OV_L1_ID != "000") {
				total += toJson[curYear][OV_L1_ID].DTVAL_CO;
				}
			}
		});
		Object.keys(toJson[curYear]).sort().forEach(function(OV_L1_ID) {
			const v = toJson[curYear];
			if (OV_L1_ID != "00" && OV_L1_ID != "000") {
				series[0].data.push({
					name : $administStatsMain.util.abbreviationToAddress(v[OV_L1_ID].OV_L1_KOR),
					y : v[OV_L1_ID].DTVAL_CO,
					percentage : (v[OV_L1_ID].DTVAL_CO / total) * 100,
					color : $administStatsMain.ui.selRegnParam.regn_color,
					dataObj : v[OV_L1_ID],
					selected : (function() {
						if (OV_L1_ID.length > 2) {
							return OV_L1_ID.substring(1, 3) == $administStatsMain.ui.selectedArea ? true : false
						} else {
							return OV_L1_ID == $administStatsMain.ui.selectedArea ? true : false
						}
					}())
				});
			}
		});

		series[0].data = $administStatsMain.util.sortJSON(series[0].data, "y", "desc");

		let avg = 0;
		let sum = 0;
		$.each(series[0].data, function(i, v) {
			sum += v.y;
		});
		avg = sum / series[0].data.length;

		let opt = {};
		opt.chartId = $administStatsMain.ui.selRegnParam.regn_chartId;
		opt.chartType = "column";
		opt.title = "<span>지역별</span>&nbsp;" + $administStatsMain.ui.selRegnParam.regn_title;
		opt.filename = $(".sb_year option:selected").text() + " 지역별 " + $administStatsMain.ui.selRegnParam.regn_title;
		opt.series = series;
		opt.xAxis = {
			type : "category"
		};
		opt.exporting = {
			sourceWidth : 960,
			sourceHeight : 540,
		};
		opt.seriesShowInLegend = false;
		opt.tooltipPositioner = true;
		opt.tooltipFormatter = function(that) {
			if ($administStatsMain.util.getObjVal($administStatsMain.ui.selRegnParam, "regn_unit", that.point.dataObj.dispUnitNm) != "%") {
				if($administStatsMain.ui.selSliceId == 'newlyChart3' || $administStatsMain.ui.selChartId == 'middlChart9'){
					return false;
				}else{
					return $administStatsMain.util.setFixedByDigits({
						prefix : "전국대비 ",
						val : that.point.percentage,
						digits : 1,
						unit : "%"
					});
				}
			} else {
				return false;
			}
		};
		opt.dataLabelsTextOutline = true;
		opt.dataLabelsFormatter = function(that) {
			return $administStatsMain.util.setFixedByDigits({
				val : that.point.dataObj.DTVAL_CO,
				digits : opt_digits,
				unit : $administStatsMain.util.getObjVal($administStatsMain.ui.selRegnParam, "regn_unit", that.point.dataObj.dispUnitNm)
			});
		};
		opt.exportingDataLabelsFormatter = function(that) {
			if ($administStatsMain.util.getObjVal($administStatsMain.ui.selRegnParam, "regn_unit", that.point.dataObj.dispUnitNm) != "%") {
				return opt.dataLabelsFormatter(that) + "<br />(" + $administStatsMain.util.setFixedByDigits({
					val : that.point.percentage,
					digits : 1,
					unit : "%"
				}) + ")";
			} else {
				return opt.dataLabelsFormatter(that);
			}
		};
		opt.callback = function(that, chart) {
			const bottom = chart.plotHeight - 110;
			$.each(chart.series[0].data, function(i, data) {
				data.dataLabel.attr({
					y : bottom + (i % 2 == 0 ? -7 : 7)
				});
			});
		};
		AdministStatsChart.ui.makeChart(opt);
	}, true);
}

/**
 * @name makeTmsrChart
 * @description 시계열 차트 생성
 * @param selTmsrParam
 *            파라미터
 */
AdministStatsChart.ui.makeTmsrChart = function(selTmsrParam) {
	let series = [];
	let categories = [];
	
	let prdDeArr = selTmsrParam.surv_year_list.split(",");
	/* 지역코드 있는 경우 */
	if (!$administStatsMain.util.isEmpty($administStatsMain.ui.selectedArea)) {
		/* ov_l1_list 지역으로 사용하는 경우에만 */
		if ($.inArray(selTmsrParam.tbl_id_list, [ "DT_1NW2026", "DT_1NW2024", "DT_1NW2032" ]) == -1) {
			if (selTmsrParam.ov_l1_list.length == 2) {
				selTmsrParam.ov_l1_list = $administStatsMain.ui.selectedArea;
			} else {
				selTmsrParam.ov_l1_list = $administStatsMain.ui.selectedArea == "00" ? "000" : "2" + $administStatsMain.ui.selectedArea;
			}
		}
	}

	if (!selTmsrParam.hasOwnProperty("tmsr_colors") || !$.isArray(selTmsrParam.tmsr_colors) || selTmsrParam.tmsr_colors.length == 0) {
		selTmsrParam.tmsr_colors = [ "#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1" ];
	}

	const opt_digits = $administStatsMain.util.getObjVal(selTmsrParam, "opt_digits", 0);
	let opt_fnCalc;
	if (selTmsrParam.hasOwnProperty("opt_fnCalc")) {
		opt_fnCalc = selTmsrParam.opt_fnCalc;
	}
	selTmsrParam.opt_fnCalc = null;
	$administStatsMain.util.getTotsurvStatData(selTmsrParam, function(data) {
		if (typeof opt_fnCalc === "function") {
			selTmsrParam.opt_fnCalc = opt_fnCalc;
			data = opt_fnCalc(data);
		}
		let toJson;
		if ($.isArray(data)) {
			toJson = $administStatsMain.util.setVariance($administStatsMain.util.arrayToJson({
				data : data,
				key0 : selTmsrParam.tmsr_dataKey,
				key : "PRD_DE"
			}));
		} else {
			toJson = data;
		}

		let max = null;
		let min = null;
		Object.keys(toJson).sort().forEach(function(key) {
			let selected = Object.keys(toJson).length >= 2 && $administStatsMain.util.getObjVal($administStatsMain.ui.tmsr_data, selTmsrParam.tmsr_dataKey, "!!!!!!!!!!") == key;
			series.push({
				name : toJson[key][Object.keys(toJson[key])[0]][selTmsrParam.tmsr_nameKey],
				color : selTmsrParam.tmsr_colors[series.length],
				type : "line",
				data : (function(key) {
					let dataArr = [];
					for(var i=0; i<prdDeArr.length; i++) {
						let isAlready = false;
						Object.keys(toJson[key]).sort().forEach(function(PRD_DE) {
							if(prdDeArr[i] == PRD_DE) {
								categories.push(PRD_DE);
								if ($administStatsMain.util.isEmpty(max) || max < toJson[key][PRD_DE].DTVAL_CO) {
									max = toJson[key][PRD_DE].DTVAL_CO;
								}
								if ($administStatsMain.util.isEmpty(min) || min > toJson[key][PRD_DE].DTVAL_CO) {
									min = toJson[key][PRD_DE].DTVAL_CO;
								}
								isAlready = true;
								dataArr.push({
									y : toJson[key][PRD_DE].DTVAL_CO,
									dataObj : toJson[key][PRD_DE],
									selected : selected
								});
							}
						});
						if(!isAlready) {
							dataArr.splice(i, 0, {
								y: null,
								dataObj: prdDeArr[i],
								selected: selected
							});
						}
					}
					return dataArr;
				}(key)),
				selected : selected,
				zIndex : selected ? 2 : 1
			});
		});

		let opt = {};
		opt.chartId = selTmsrParam.tmsr_chartId;
		opt.title = "<span>연도별</span>&nbsp;" + selTmsrParam.tmsr_title;
		opt.filename = (function() {
			let filename = "";
			if ($("#mapRgn_3").is(":visible")) {
				filename += $(".tag_sido:eq(0)").text() + " ";
			} else {
				switch ($administStatsMain.ui.selectedThema) {
					case "신혼부부":
					case "주택소유":
					case "중·장년층":
					case "귀농·귀어·귀촌":
						filename += "전국 ";
						break;
				}
			}
			filename += "연도별 " + selTmsrParam.tmsr_title;
			return filename;
		}());
		opt.series = series;
		if (series.length >= 2) {
			let exportingSeries = [];
			for (let i = 0; i < series.length; i++) {
				exportingSeries.push(_.cloneDeep(series[i]));
				exportingSeries[i].dataLabels = {};
				exportingSeries[i].dataLabels.color = exportingSeries[i].color;
			}
			opt.exportingSeries = exportingSeries;
			opt.legend = {
				align : "right",
				verticalAlign : "top",
				layout : "vertical",
				itemMarginTop : 2,
				itemMarginBottom : 2,
				labelFormatter : function() {
					if (this._i < series.length) {
						if (series.length >= 2 && series[this._i].selected) {
							return "<span style='color: " + AdministStatsChart.consts.sliceHighlightColor + ";'>" + this.name + "</span>";
						} else {
							return this.name;
						}
					} else {
						return this.name;
					}
				}
			};
		} else {
			opt.seriesShowInLegend = false;
		}
		opt.xAxis = {
			categories : categories,
			labels : {
				formatter : function() {
					let returnHtml = "<span>" + this.value + "</span>";
					if (this.value == $administStatsMain.ui.selectedYear) {
						returnHtml = "<span style='color: " + AdministStatsChart.consts.sliceHighlightColor + ";'>" + this.value + "</span>";
					}
					return returnHtml;
				}
			}
		};
		opt.yAxis = {
			title : {
				enabled : false
			},
			labels : {
				enabled : true,
				formatter : function() {
					const numericSymbols = Highcharts.getOptions().lang.numericSymbols;
					let i = numericSymbols.length;
					const numericSymbolDetector = this.value;
					let UNDEFINED;
					let ret;
					let multi;
					while (i-- && ret === UNDEFINED) {
						multi = Math.pow(1000, i + 1);
						if (numericSymbolDetector >= multi && numericSymbols[i] !== null) {
							ret = (Highcharts.numberFormat(this.value / multi, -1) * 1).toFixed(0) + numericSymbols[i];
						}
					}
					if (ret === UNDEFINED) {
						if (Math.abs(this.value) >= 1000) {
							ret = Highcharts.numberFormat(this.value, -1);
						} else {
							ret = Highcharts.numberFormat(this.value, -1, UNDEFINED, "");
						}
					}
					return ret;
				}
			},
			gridLineWidth : 1,
			tickPositioner : function() {
				let returns = [];
				const step = Math.round((max - min) / 2);
				let minStep = step / 7;

				if (min > 0 && minStep > min) {
					minStep = min;
				}

				returns.push(Math.floor(min - minStep));
				if (min < 0) {
					returns.push(0);
				} else {
					returns.push(Math.round(step + min));
				}
				returns.push(Math.ceil(max + minStep));

				return returns;
			}
		};
		if (selTmsrParam.tmsr_chartId == "tmsrChart2") {
			chart = $.extend(true, opt, {
				yAxis : {
					labels : {
						formatter : function() {
							if (this.value == 0) {
								return "<span style='font-weight: bold; color: " + AdministStatsChart.consts.sliceHighlightColor + ";'>" + this.value + "</span>";
							} else {
								return this.value;
							}
						}
					},
					plotLines : [ {
						color : AdministStatsChart.consts.sliceHighlightColor,
						width : 1,
						value : 0,
						zIndex : 2
					} ]
				}
			});
		}
		opt.tooltipFormatter = function(that) {
			let prefix = (series.length >= 2 ? that.series.name + " " : "");
			let val = 0;
			let digits = "";
			let unit = "";
			
			if(gv_mode == 'more1'){  
				if(selTmsrParam.opt_chartId == "more1Chart1" || selTmsrParam.opt_chartId == "more1Chart2" 
					|| selTmsrParam.opt_chartId == "more1Chart4" || selTmsrParam.opt_chartId == "more1Chart5"
					|| selTmsrParam.opt_chartNmByYear == "종사상지위별 일자리 규모"	){
					
				}else{
					return false;
				}
			}
			
			if(selTmsrParam.opt_chartId == 'newlyChart3'){
				prefix += " 증감<br />";
				if(that.point.dataObj.iod == '-'){
					val = that.point.dataObj.iod
				}else{
					val = that.point.dataObj.iod.toFixed(2)*1
				}
				digits = opt_digits;
				unit = "명";
			}else{
				if ($administStatsMain.util.getObjVal(selTmsrParam, "tmsr_unit", that.point.dataObj.dispUnitNm) == "%") {
					prefix += " 증감<br />";
					val = that.point.dataObj.iod;
					digits = opt_digits;
					unit = "%p";
				} else {
					prefix += " 증감율<br />";
					val = that.point.dataObj.roc;
					digits = 1;
					unit = "%";
				}
			}

			return $administStatsMain.util.getVarianceText({
				prefix : prefix,
				val : val,
				digits : digits,
				unit : unit,
				postfixs : [ "증가 ↑", "감소 ↓" ]
			});
		};
		opt.dataLabelsFormatter = function(that) {
			if (selTmsrParam.tmsr_chartId == "tmsrChart2") {
				if (that.point.dataObj.NO_DATA) {
					return "전년 자료 없음";
				}
				return $administStatsMain.util.getVarianceText({
					val : that.point.y,
					digits : opt_digits,
					unit : $administStatsMain.util.getObjVal(selTmsrParam, "tmsr_unit", that.point.dataObj.dispUnitNm),
					postfixType : [],
					isColor : false
				});
			} else {
				return $administStatsMain.util.setFixedByDigits({
					val : that.point.y,
					digits : opt_digits,
					unit : $administStatsMain.util.getObjVal(selTmsrParam, "tmsr_unit", that.point.dataObj.dispUnitNm)
				});
			}
		};
		opt.eventClick = function(e, that) {
			return false;
		};
		opt.eventMouseOver = function(that) {
			$.each(that.chart.series, function(seriesIdx, serie) {
				if (seriesIdx == that.index) {
					serie.dataLabelsGroup.show();
				} else {
					serie.dataLabelsGroup.hide();
				}
			});
		};
		opt.eventMouseOut = function(that) {
			$.each(that.chart.series, function(seriesIdx, serie) {
				serie.dataLabelsGroup.hide();
			});
		};
		opt.tooltipPositioner = true;
		opt.callback = function(that, chart) {
			$(chart.series).each(function(i, serie) {
				if (series.length >= 2) {
					this.dataLabelsGroup.hide();
					$(serie.legendItem.element).hover(function() {
						let targetIdx = 0;
						$.each($(this).closest("g").attr("class").split(" "), function(i, v) {
							if (v.indexOf("highcharts-series") > -1) {
								targetIdx = v.split("-")[v.split("-").length - 1] * 1;
							}
						});
						$.each(chart.series, function(seriesIdx, serie) {
							if (seriesIdx == targetIdx) {
								serie.dataLabelsGroup.show();
							} else {
								serie.dataLabelsGroup.hide();
							}
						});
					}, function() {
						$.each(chart.series, function(seriesIdx, serie) {
							serie.dataLabelsGroup.hide();
						});
					});
				}
			});
		};
		AdministStatsChart.ui.makeCombinationsChart(opt);
	}, true);
}

/**
 * @name exportingChart
 * @description 차트 다운로드
 * @param chartId
 *            차트ID
 * @param isLocal
 *            로컬다운로드여부
 */
AdministStatsChart.ui.exportingChart = function(chartId, isLocal) {
	if (isLocal) {
		$administStatsMain.ui.chart[chartId].exporting.update({
			chartOptions : {
				chart : {
					style : {
						fontFamily : AdministStatsChart.consts.fontFamily
					}
				}
			}
		});
		$administStatsMain.ui.chart[chartId].exportChartLocal({
			type : "image/png"
		});
	} else {
		$administStatsMain.ui.chart[chartId].exporting.update({
			chartOptions : {
				chart : {
					style : {
						fontFamily : AdministStatsChart.consts.notLocalFontFamily
					}
				}
			}
		});
		$administStatsMain.ui.chart[chartId].exportChart({
			type : "image/png"
		});
	}
}