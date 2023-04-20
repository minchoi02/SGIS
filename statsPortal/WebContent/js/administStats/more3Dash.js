/**
 * 행정통계시각화 대쉬보드 > 통계더보기 > 임금근로
 */
(function(W, D) {
	W.$more3Dash = W.$more3Dash || {};

	$(document).ready(function() {
	});

	$(window).scroll(function() {
	});

	$(window).resize(function() {
	});

	$more3Dash.consts = {};

	$more3Dash.ui = {

		/**
		 * @name init
		 * @description 최초 화면을 초기화(각 화면을 로딩)
		 */
		init : function() {
			$administStatsMain.ui.chartSaveClear();
			$administStatsMain.ui.removeContent();
			$administStatsMain.ui.appendContent("/view/administStats/more3Dash/main");
		},

		/**
		 * @name ready
		 * @description 최초 화면을 초기화(각 화면을 로딩)
		 */
		ready : function() {
			setTimeout(function() {
				$more3Dash.event.allChange();
			}, 50);

			/* 년도 셀렉트박스 -> 년도분기 셀렉트박스로 크기 늘리기 */
			$(".header-tag .select").css("width", "140px");
		}

	};

	$more3Dash.util = {};

	$more3Dash.event = {

		/**
		 * @name allChange
		 * @description 지역경계 클릭시 모든 차트데이터 변경작업
		 * @param isChangeYear
		 *            년도 변경 flag
		 */
		allChange : function(isChangeYear) {
                                    //분기추가 배천규 20221214
			$administStatsMain.ui.selectedYear = $("#searchYear option:selected").val();
			let newM1 = $("#searchYear option:selected").val().substring(2, 4);
			let newM2 = $("#searchYear option:selected").val().substring(4, 6);
			
			if(newM2 =="01"){ newM2 = "1/4"	}
			else if(newM2 =="02"){ newM2 = "2/4" }
			else if(newM2 =="03"){ newM2 = "3/4" }
			else { newM2 = "4/4" }
			$("#cardSetYear").text("`"+newM1 +"년 " +newM2+ "분기");
			
			let params = [];

			params = [ $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["1"]), {
				/* 2년전동기 ~ 선택한 기간 */
				surv_year_list : (function() {
					let returns = [];
					const thisYear = $administStatsMain.ui.selectedYear.substring(0, 4) * 1;
					const thisQuarter = $administStatsMain.ui.selectedYear.substring(4, 6) * 1;
					for (let y = thisYear; y >= (thisYear - 2); y--) {
						for (let q = (y == thisYear ? thisQuarter : 4); q >= 1; q--) {
							returns.push(y + "0" + q);
						}
					}
					return returns.join(",");
				}()),
				opt_chartId : "more3Chart1"
			}) ];
			
			
			$administStatsMain.util.getTotsurvStatData(params, function(data) {
				more3Chart1(data, params);
			});
			
			
			/* TODO 행정통계시각화 관리자화면 완료 시 DB 데이터 등록 후 소스 수정해야함 */
			params = [ $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
				/* 전년동기 ~ 선택한 기간 */
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 100),
				tbl_id_list : "DT_1FL_7003",
				char_itm_id_list : "T00",
				ov_l1_list : "00",
				ov_l2_list : "00,10,20,30,40",
				opt_chartId : "more3Chart2",
				opt_chartType : "bar",
				opt_chartNm : "일자리 형태별 분포",
				opt_tblIds : [ "DT_1FL_7003" ]
			}) ];
			$administStatsMain.util.getTotsurvStatData(params, function(data) {
				more3Chart2(data, params);
			});

			params = [ $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["3"]), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				char_itm_id_list : "T00,T02",
				opt_chartId : "more3Chart3"
			}) ];
			$administStatsMain.util.getTotsurvStatData(params, function(data) {
				more3Chart3(data, _.cloneDeep(params));
			});

			params = [ $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["4"]), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				char_itm_id_list : "T00,T02",
				opt_chartId : "more3Chart4"
			}) ];
			$administStatsMain.util.getTotsurvStatData(params, function(data) {
				more3BarChart(data, _.cloneDeep(params));
			});

			params = [ $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["5"]), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				char_itm_id_list : "T00,T02",
				opt_chartId : "more3Chart5"
			}) ];
			$administStatsMain.util.getTotsurvStatData(params, function(data) {
				more3BarChart(data, _.cloneDeep(params));
			});

			/* TODO 행정통계시각화 관리자화면 완료 시 DB 데이터 등록 후 소스 수정해야함 */
			params = [ $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
				/* 전년동기 ~ 선택한 기간 */
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 100),
				tbl_id_list : "DT_1FL_7006",
				char_itm_id_list : "T00",
				ov_l1_list : "1001,1002",
				ov_l2_list : "00",
				opt_chartId : "more3Chart6",
				opt_chartType : "pie",
				opt_chartNm : "성별",
				opt_tblIds : [ "DT_1FL_7006" ],
				opt_colors : [ "#3C43AD", "#FF5659" ] //옵션변경 배천규 20221214
			}) ];
			$administStatsMain.util.getTotsurvStatData(params, function(data) {
				more3PieChart(data, params);
			});

			/* TODO 행정통계시각화 관리자화면 완료 시 DB 데이터 등록 후 소스 수정해야함 */
			params = [ $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
				/* 전년동기 ~ 선택한 기간 */
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 100),
				tbl_id_list : "DT_1FL_7006",
				char_itm_id_list : "T00",
				ov_l1_list : "2001,2002,2003,2004,2005",
				ov_l2_list : "00",
				opt_chartId : "more3Chart7",
				opt_chartType : "pie",
				opt_chartNm : "연령대별",
				opt_tblIds : [ "DT_1FL_7006" ],
				opt_colors : [ "#3C43AD", "#8993E5", "#C2C8E5", "#FFAEB0", "#FF5659" ] //옵션변경 배천규 20221214
			}) ];
			$administStatsMain.util.getTotsurvStatData(params, function(data) {
				more3PieChart(data, params);
			});

			/* TODO 행정통계시각화 관리자화면 완료 시 DB 데이터 등록 후 소스 수정해야함 */
			params = [ $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
				/* 전년동기 ~ 선택한 기간 */
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 100),
				tbl_id_list : "DT_1FL_7006",
				char_itm_id_list : "T00",
				ov_l1_list : "3001,3002,3003,3004",
				ov_l2_list : "00",
				opt_chartId : "more3Chart8",
				opt_chartType : "pie",
				opt_chartNm : "조직형태별",
				opt_tblIds : [ "DT_1FL_7006" ],
				opt_colors : [ "#3C43AD", "#8993E5", "#C2C8E5", "#FF5659" ] //옵션변경 배천규 20221214
			}) ];
			$administStatsMain.util.getTotsurvStatData(params, function(data) {
				more3PieChart(data, params);
			});

			setTimeout(function() {
				$administStatsMain.ui.loading(false);
			}, 2000);
		}

	};

}(window, document));

/* 하드코딩 : 2차원 차트 */
/**
 * @name more3Chart1
 * @description 임금근로 차트1
 */
function more3Chart1(data, params) {

	const toJson = $administStatsMain.util.arrayToJson({
		data : data[params[0].tbl_id_list],
		key : "CHAR_ITM_ID"
	});
	let categories = [];
	let columnDataArr = []; /* 임금근로 일자리수 */
	let lineDataArr = []; /* 증감 */
	let cardArr =[]; //추가  배천규 20221214
	
	const toJsonReverseKeyArr = Object.keys(toJson).sort().slice().reverse();
	const PRD_DE_bgn = toJsonReverseKeyArr[Object.keys(toJson).length - 1].substring(0, 4) + "" + toJsonReverseKeyArr[0].substring(4, 6);
	let PRD_DE_temp = "";

	Object.keys(toJson).sort().forEach(function(PRD_DE) {
		
		
		
		//console.log(PRD_DE);
		
		
		/* 최대개수 9 이상인 경우 */
		if (Object.keys(toJson).length > 9) {
			/* 2년전 동기 데이터부터 시작 */
			if ((PRD_DE * 1) >= (PRD_DE_bgn * 1)) {
				const quarter = PRD_DE.substring(5, 6);
				const month = $administStatsMain.util.monthByQuarter(quarter);
				
				
				
				
				let year = "";
				
				if (PRD_DE.substring(0, 4) != PRD_DE_temp) {
					year = "<b>`" + PRD_DE.substring(2, 4) + "년</b> ";
				}
                                                //분기추가 배천규 20221214
                                                else if (PRD_DE.substring(5, 6) == "01") {
					year = "";
				}
				categories.push(year + "<br />" + quarter + "/4분기<br />(" + month + "월)");
				PRD_DE_temp = PRD_DE.substring(0, 4);
				
				columnDataArr.push({
					y : toJson[PRD_DE]["T00"].DTVAL_CO
				});
				
				lineDataArr.push({
					y : (function() {
						if (toJson[PRD_DE].hasOwnProperty("T02")) {
							return toJson[PRD_DE]["T02"].DTVAL_CO
						} else {
							return 0;
						}
					}())
				});
			}
			
			
		} else {
			const quarter = PRD_DE.substring(5, 6);
			const month = $administStatsMain.util.monthByQuarter(quarter);

			let year = "";
			if (PRD_DE.substring(0, 4) != PRD_DE_temp) {
				year = "<b>`" + PRD_DE.substring(2, 4) + "년</b> ";
			}else if (PRD_DE.substring(5, 6) == "01") {//분기추가 배천규 20221214
				year = "";
			}
			categories.push(year + "<br />" + quarter + "/4분기<br />(" + month + "월)");
			PRD_DE_temp = PRD_DE.substring(0, 4);

			columnDataArr.push({
				y : toJson[PRD_DE]["T00"].DTVAL_CO
			});
			lineDataArr.push({
				y : (function() {
					if (toJson[PRD_DE].hasOwnProperty("T02")) {
						return toJson[PRD_DE]["T02"].DTVAL_CO
					} else {
						return 0;
					}
				}())
			});
			
		}
                        //배천규 20221214
		cardArr.push(toJson[PRD_DE]["T00"].DTVAL_CO);
		$("#cardSetTotal").empty();
		$("#cardSetTotal").append(toJson[PRD_DE]["T00"].DTVAL_CO+"<span>만개</span>");
		if(cardArr.length >=9){
			var cal=cardArr[4] - cardArr[8];
			if(cal >0){
				if(toJson[PRD_DE].hasOwnProperty("T02")){
					$("#cardSetTotal2").empty();
					$("#cardSetTotal2").append(toJson[PRD_DE]["T02"].DTVAL_CO+"<span>만개 감소</span>");	
				}
			}else{
				if(toJson[PRD_DE].hasOwnProperty("T02")){
					$("#cardSetTotal2").empty();
					$("#cardSetTotal2").append(toJson[PRD_DE]["T02"].DTVAL_CO+"<span>만개 증가</span>");	
				}
			}
		}else{
			$("#cardSetTotal2").empty();
			$("#cardSetTotal2").append("전년자료없음");	
		}
	
		
		
		
		
	});

	const series = [ {
		name : "전체 임금근로 일자리(만개)",//옵션변경 배천규 20221214
		type : "column",
		data : columnDataArr,
		color : "#8993E5",//옵션변경 배천규 20221214
		borderRadius : 5,
		borderWidth : 1,//옵션변경 배천규 20221214
		borderColor : "#444444"//옵션변경 배천규 20221214
		
	}, {
		name : "전년동기대비 증감",
		type : "line",
		yAxis : 1,
		data : lineDataArr,
		color : "#FF5659",//옵션변경 배천규 20221214
		//마커추가 배천규 20221214
                        marker : {
			radius : 7,
			symbol : 'circle',
			lineWidth :5,
			lineColor : '#FF5659',
			fillColor : '#fff',
			
		},
		
	} ];

	let opt = {};
	opt.chartId = params[0].opt_chartId;
	opt.title = params[0].opt_chartNm;
	opt.filename = params[0].opt_chartNm;
	opt.series = series;
	opt.exportingSeries = [ {
		dataLabels : {
			enabled : true,
			// inside : true,
			color : series[0].color
		}
	}, {
		dataLabels : {
			enabled : true,
			color : series[1].color
		}
	} ];
	opt.xAxis = {
		categories : categories
	};
	opt.yAxis = [ {
		title : {
			enabled : true,
			text : "(만개)",
			align : "high",
			offset : 10,
			rotation : 0,
			y : -10
		},
		labels : {
			enabled : true,
		},
		gridLineWidth : 1
	}, {
		title : {
			enabled : true,
			text : "(만개)",
			align : "high",
			offset : 10,
			rotation : 0,
			y : -10
		},
		labels : {
			enabled : true,
		},
		gridLineWidth : 1,
		opposite : true
	} ];
	opt.tooltipFormatter = function(that) {
		return false;
	};
	opt.dataLabelsFormatter = function(that) {

		if (that.point.y == 0) {
			return "전년동기 자료 없음";
		}
		return $administStatsMain.util.addComma(that.point.y);

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
			if (serie.type == "column") {
				serie.dataLabelsGroup.show();
			} else {
				serie.dataLabelsGroup.hide();
			}
		});
	};
	opt.callback = function(that, chart) {
		$(chart.series).each(function(i, serie) {
			if (this.type == "line") {
				this.dataLabelsGroup.hide();
			}
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
					if (serie.type == "column") {
						serie.dataLabelsGroup.show();
					} else {
						serie.dataLabelsGroup.hide();
					}
				});
			});
		});
	};
	AdministStatsChart.ui.makeCombinationsChart(opt);
}

/* 하드코딩 : 차트 고정 */
/**
 * @name more3Chart2
 * @description 임금근로 차트2
 */
function more3Chart2(data, params) {

	const toJson = $administStatsMain.util.setVariance($administStatsMain.util.arrayToJson({
		data : data[params[0].tbl_id_list],
		key : "OV_L2_ID"
	}));
	const curYear = Object.keys(toJson).sort().reverse()[0];
	const categories = [ "`" + curYear.substring(2, 4) + "년<br />" + curYear.substring(5, 6) + "/4분기", "`" + (curYear - 100 + "").substring(2, 4) + "년<br />" + (curYear - 100 + "").substring(5, 6) + "/4분기" ];

	let series = [];

	if (toJson.hasOwnProperty(curYear - 100)) {
		Object.keys(toJson[curYear]).sort().reverse().forEach(function(OV_L2_ID) {
			if (OV_L2_ID != "00") { /* [00]총계, [40]소멸일자리 제외 */
				const v = toJson[curYear][OV_L2_ID];
				if (OV_L2_ID == "40") {
					series.push({
						name : toJson[curYear]["40"].OV_L2_KOR,
						color : "#3C43AD",//옵션변경 배천규 20221214
						borderWidth : 1,//옵션변경 배천규 20221214
						borderColor : "#444444",//옵션변경 배천규 20221214
						data : [ 0, toJson[curYear]["40"].DTVAL_CO ],
						OV_L2_ID : toJson[curYear]["40"].OV_L2_ID
					});
				} else {
					if (OV_L2_ID == "10") {
						series.push({
							name : "전년동기",
							color : "#CED4DA",//옵션변경 배천규 20221214
							borderWidth : 1,//옵션변경 배천규 20221214
							borderColor : "#444444",//옵션변경 배천규 20221214
							data : [ 0, toJson[curYear - 100]["00"].DTVAL_CO - toJson[curYear]["40"].DTVAL_CO ],
							OV_L2_ID : "00"
						});
					}
					if (OV_L2_ID == "10") {
						series.push({
							name : v.OV_L2_KOR,
							color : "#FFE9E9",//옵션변경 배천규 20221214
							borderWidth : 1,//옵션변경 배천규 20221214
							borderColor : "#444444",//옵션변경 배천규 20221214
							data : [ v.DTVAL_CO, 0 ],
							OV_L2_ID : v.OV_L2_ID
						});
					} else if (OV_L2_ID == "20") {
						series.push({
							name : v.OV_L2_KOR,
							color : "#FFAEB0",//옵션변경 배천규 20221214
							borderWidth : 1,//옵션변경 배천규 20221214
							borderColor : "#444444",//옵션변경 배천규 20221214
							data : [ v.DTVAL_CO, 0 ],
							OV_L2_ID : v.OV_L2_ID
						});
					} else if (OV_L2_ID == "30") {
						series.push({
							name : v.OV_L2_KOR,
							color : "#FF5659",//옵션변경 배천규 20221214
							borderWidth : 1,//옵션변경 배천규 20221214
							borderColor : "#444444",//옵션변경 배천규 20221214
							data : [ {
								y : v.DTVAL_CO,
								id : "yes"
							}, 0 ],
							OV_L2_ID : v.OV_L2_ID
						});
					}
				}
			}
		});
	} else {
		Object.keys(toJson[curYear]).sort().reverse().forEach(function(OV_L2_ID) {
			if (OV_L2_ID != "00") {
				const v = toJson[curYear][OV_L2_ID];
				if (OV_L2_ID == "10") {
					series.push({
						name : v.OV_L2_KOR,
                                                                        //옵션변경 배천규 20221214
						color : "#FFE9E9",
						borderWidth : 1,
						borderColor : "#444444",
						data : [ v.DTVAL_CO, 0 ],
						OV_L2_ID : v.OV_L2_ID,
                                                                        //옵션변경 배천규 20221214
						
					});
				} else if (OV_L2_ID == "20") {
					series.push({
						name : v.OV_L2_KOR,
                                                                        //옵션변경 배천규 20221214
						color : "#FFAEB0",
						borderWidth : 1,
						borderColor : "#444444",
						data : [ v.DTVAL_CO, 0 ],
						OV_L2_ID : v.OV_L2_ID
					});
				} else if (OV_L2_ID == "30") {
					series.push({
						name : v.OV_L2_KOR,
                                                                        //옵션변경 배천규 20221214
						color : "#FF5659",
						borderWidth : 1,
						borderColor : "#444444",
						data : [ v.DTVAL_CO, 0 ],
						OV_L2_ID : v.OV_L2_ID
					});
				}
			}
		});
	}

	for (let i = 0; i < series.length; i++) {
		series[i].dataLabels = {
			style : {
				color : "#000000"
			}
		}
	}

	let opt = {};
	opt.chartId = params[0].opt_chartId;
	opt.chartType = params[0].opt_chartType;
	opt.title = params[0].opt_chartNm;
	opt.filename = params[0].opt_chartNm;
	opt.series = series;
	opt.xAxis = {
		categories : categories
	};
	const colors = [ "#FFE9E9", "#FFAEB0", "#FF5659", "#CED4DA", "#3C43AD", "#F9EB56" ].reverse();//옵션변경 배천규 20221214
	opt.colors = colors;//옵션변경 배천규 20221214
	opt.yAxis = {
		max : toJson[curYear]["00"].DTVAL_CO + 500,
		stackLabels : {
			verticalAlign : "top",
			enabled : true,
			align : "center",
			y : -15,
			style : {
				color : "#000000",
				textOutline : false,
				fontSize : "13px"
			},
			formatter : function() {
				if (this.x == 0) {
                                                            //커스텀  배천규 20221214
					return "<span class='more3Chart2bgRed'>전체 " + $administStatsMain.util.addComma(toJson[curYear]["00"].DTVAL_CO) + " 만개</span>";
				} else {
					if (this.total == 0) {
						return "전년동기 자료 없음";
					} else {
                                                            //커스텀  배천규 20221214
						return "<span class='more3Chart2bgBlue'>전체 " + $administStatsMain.util.addComma(this.total) + " 만개</span>";
					}
				}
			}
		}
	};
	if (toJson.hasOwnProperty(curYear - 100)) {
		opt.yAxis.plotLines = [ {
			color : AdministStatsChart.consts.sliceHighlightColor,
			width : 2,
			value : toJson[curYear - 100]["00"].DTVAL_CO,
			zIndex : 5,
			dashStyle : "ShortDash"
		} ];
	}
	
	opt.annotations = [ {
		draggable : "",
		labels : [ {
			point : "yes",
			overflow : "justify",
			text : (function() {
				return $administStatsMain.util.getVarianceText({
					val : toJson[curYear]["00"].iod,
					digits : 1,
					unit : "만개",
					postfixs : [ "증가 ↑", "감소 ↓" ],
					noDataMsg : "전년동기 자료 없음",
					isColor : false
				});
			})(),
			style : {
				fontSize : "14px",
				color : "#FE2432",//옵션변경  배천규 20221214
				fontWeight : "bold",
				backgroundColor: "#F9EB56",//옵션변경 배천규 20221214
					
					
			}
		} ],
		labelOptions : {
			borderRadius : 10,
			padding : 15,
			x : 70,
			y : 23,
			backgroundColor : "#F9EB56",//옵션변경 배천규 20221214
			borderWidth : 1,
			borderColor : "#444444"//옵션변경 배천규 20221214
		},
	} ];
	opt.stacking = "overlap";
	opt.tooltipFormatter = function(that) {
		return false;
	};
	opt.dataLabelsInside = true;
	opt.dataLabelsFormatter = function(that) {
		if (that.point.index == 0) {
			if ($.inArray(that.series.userOptions.OV_L2_ID, [ "00", "40" ]) == -1) {
				return that.series.name + "<br />" + $administStatsMain.util.addComma(that.point.y.toFixed(1)) + " 만개<br />" + "(" + that.percentage.toFixed(1) + " %)";
			}
		} else if (that.point.index == 1) {
			if ($.inArray(that.series.userOptions.OV_L2_ID, [ "40" ]) > -1) {
//옵션변경 배천규 20221214
				return "<span style='color:#fff;'>"+that.series.name + "<br />" + $administStatsMain.util.addComma(that.point.y.toFixed(1)) + " 만개</span>";
			}
		}
	};
	opt.isBigExporting = true;
	AdministStatsChart.ui.makeChart(opt);
}

/* 하드코딩 : 항목끼리 계산 */
/**
 * @name more3Chart3
 * @description 임금근로 차트3
 */
function more3Chart3(data, params) {
	const toJson = $administStatsMain.util.arrayToJson({
		data : data[params[0].tbl_id_list],
		key : "OV_L1_ID",
		key2: "CHAR_ITM_NM"
	});

            //시리즈 변경  배천규 20221214
	let series = [ {
		data : [],
		type : "column",
		pointWidth : 25,	
		borderWidth : 1,
		borderColor : "#181818",
		//enableMouseTracking : false,
	}/*,{
		data : [],
		type : "spline",
		marker : {
			symbol : 'url(/images/administStats/more1/more1Dash_icon01.png)',
			width: "30px",
			height: "30px",
		},
		
		//marker :[],
		color : '#fff',
		dashStyle : 'longdash',
		lineWidth : 0,
		dataLabels : {
			enabled : false,
		},
		states: {
            hover: {
                enabled: false
            }
        },
        //시리즈 변경  배천규 20221214

        tooltip: { enabled: false },//옵션 변경  배천규 20221214
        enableMouseTracking : false,//옵션 변경  배천규 20221214
	}*/ ];
	
	const curYear = $administStatsMain.ui.selectedYear;
	//배천규추가
	const cateArr = ["농림<br />어업","광업","제조업","전기<br />가스업","수도<br />하수<br />폐기물", "건설업", "도소매", "운수<br />창고", "숙박<br />음식", "정보<br />통신", "금융<br />보험", "부동산", "전문<br />과학<br />기술", "사업<br />임대", "공공<br />행정", "교육", "보건<br />사회<br />복지" ,"예술<br />스포츠<br />여가", "협회<br />수리<br />개인", "자가<br />소비","국제<br />외국"];
	const cateAbc = ["A","B","C","D","E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q" ,"R", "S", "T","U"];
	const v3 = toJson[curYear];
	for(var i = 0; i <cateArr.length; i++){
		v3[cateAbc[i]]["증감"].OV_L1_KOR = cateArr[i]
		if(v3[cateAbc[i]]["증감"].DTVAL_CO == "0"){
			console.log("zz")
		}
	}
	
	//배천규추가
	Object.keys(toJson[curYear]).sort().forEach(function(OV_L1_ID) {
		const v = toJson[curYear][OV_L1_ID];
		series[0].data.push({
			name : v["증감"].OV_L1_KOR,
			y : v["증감"].DTVAL_CO,
			z : v["임금근로 일자리수"].DTVAL_CO,
			//옵션 변경  배천규 20221214
			key : OV_L1_ID,
			//OV_L1_ID : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID]["00"].OV_L1_ID,
			borderWidth : 1,
			borderColor : "#444444",
			//옵션 변경  배천규 20221214
			color : (function(DTVAL_CO) {
				if (v["증감"].DTVAL_CO > 0) {
					return "#FF5659";
				} else if (v["증감"].DTVAL_CO < 0) {
					return "#8993E5";
				} else {
					return "#F9EB56";
				}
			}())
		});
		//series[1].data.push(0);//옵션 변경  배천규 20221214
	});
	console.log(series[0].data)
	let opt = {};
	opt.chartId = params[0].opt_chartId;
	opt.chartType = params[0].opt_chartType;
	opt.title = params[0].opt_chartNm.replace("(전년동기대비, 단위:만개)", "<span style='font-size: 12px;'>(전년동기대비, 단위:만개)</span>");
	opt.filename = $(".sb_year option:selected").text() + " " + params[0].opt_chartNm.replace("(전년동기대비, 단위:만개)", " 일자리 증감(전년동기대비, 단위:만개)");
	opt.subtitle = {
		floating : true,
		//text : "주: 기타는 ‘T. 가구 내 고용활동’과 ‘U. 국제·외국기관’ 포함",
		text : "",//옵션 변경  배천규 20221214
		align : "left",
		verticalAlign : "bottom",
		y : 25,
		style : {
			textOutline : false,
			fontSize : "11px",
			fontWeight : "bold",
			color : "#000000"
		}
	};
	opt.series = series;
	opt.xAxis = {
		type : "category",
		labels : {
			formatter : function() {
				if (series[0].data[this.pos].y < 0) {
					return "<span style='color: #728CC7;'>" + this.value + "</span>";
				} else {
					return this.value;
				}
			}
		}
	};
	opt.yAxis = {
			
		gridLineWidth : 1,
		labels : {
			enabled : true,
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
			zIndex : 2,
			
		} ]
	};
	opt.tooltipFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.z.toFixed(1)) + " 만개";//배천규 수정
	};
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.y.toFixed(1));
	};
	opt.isBigExporting = true;
	AdministStatsChart.ui.makeChart(opt);
}

/**
 * @name more3Chart4
 * @description 임금근로 차트4
 */
function more3BarChart(data, params) {

	const toJson = $administStatsMain.util.setAnother($administStatsMain.util.arrayToJson({
		data : data[params[0].tbl_id_list],
		key : params[0].opt_dispDataKey,
		key2: "CHAR_ITM_NM"
	}));
	let series = [ {
		data : []
	} ];

	let forResults = []; /* 결과용 전체지역 */
	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(dataKey) {
		const v = toJson[$administStatsMain.ui.selectedYear][dataKey];
		forResults.push({
			name : v["증감"][params[0].opt_dispNameKey],
			y : v["증감"].DTVAL_CO,
			dataObj : v["증감"],
			z : v["임금근로 일자리수"].DTVAL_CO
		});
	});
	/* 상위 3개 */
	forResults = $administStatsMain.util.sortJSON(forResults, "y", "desc");
	$.each(forResults, function(i, v) {
		if (i < 3) {
			series[0].data.push({
				name : v.name,
				y : v.y,
				z : v.z,
				borderWidth : 1,//옵션 변경  배천규 20221214
				borderColor : "#444444",//옵션 변경  배천규 20221214
				color : (function() {
					if (v.y > 0) {
						return "#FF5659";//옵션 변경  배천규 20221214
					} else if (v.y < 0) {
						return "#8993E5";//옵션 변경  배천규 20221214
					} else {
						return "#000000";
					}
				}()),
				dataObj : v.dataObj
			});
		}
	});
	/* 하위 3개 */
	for (let i = forResults.length - 3; i < forResults.length; i++) {
		const v = forResults[i];
		series[0].data.push({
			name : v.name,
			y : v.y,
			z : v.z,
			borderWidth : 1,//옵션 변경  배천규 20221214
			borderColor : "#444444",//옵션 변경  배천규 20221214
			color : (function() {
				if (v.y > 0) {
					return "#F6A347";
				} else if (v.y < 0) {
					return "#728CC7";
				} else {
					return "#000000";
				}
			}()),
			dataObj : v.dataObj
		});
	}

	let opt = {};
	opt.chartId = params[0].opt_chartId;
	opt.chartType = params[0].opt_chartType;
	opt.title = params[0].opt_chartNm.replace("(전년동기대비, 단위:만개)", "<span style='font-size: 12px;'>(전년동기대비, 단위:만개)</span>");
	opt.filename = $(".sb_year option:selected").text() + " " + params[0].opt_chartNm.replace("(전년동기대비, 단위:만개)", " 일자리 증감(전년동기대비, 단위:만개)");
	if (!$administStatsMain.util.isEmpty(params[0].opt_chartCm)) {
		opt.subtitle = {
			floating : true,
			text : params[0].opt_chartCm,
			align : "left",
			verticalAlign : "bottom",
			y : 25,
			style : {
				textOutline : false,
				fontSize : "11px",
				fontWeight : "bold",
				color : "#000000"
			}
		};
	}
	opt.series = series;
	opt.xAxis = {
		type : "category"
	};
	opt.yAxis = {
		gridLineWidth : 1,
		labels : {
			enabled : true,
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
	};
	opt.tooltipFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.z) + " 만개";
	};
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.y.toFixed(1));
	};
	opt.isBigExporting = true;
	AdministStatsChart.ui.makeChart(opt);
}

/**
 * @name more3Chart6
 * @description 임금근로 차트6
 */
/* TODO 행정통계시각화 관리자화면 완료 시 DB 데이터 등록 후 소스 수정해야함 */
function more3PieChart(data, params) {

	const toJson = $administStatsMain.util.setVariance($administStatsMain.util.arrayToJson({
		data : data[params[0].tbl_id_list],
		key : "OV_L1_ID",
	}));
	const colors = [ "#3C43AD", "#8993E5", "#C2C8E5", "#FFAEB", "#FF5659", "#FFA9B0" ];//옵션 변경  배천규 20221214
	params[0].opt_colors = $administStatsMain.util.getObjVal(params[0], "opt_colors", colors);

	let series = [ {
		visible : false,
		data : [ {
			name : '(전년동기대비)',
			y : null,
			dataObj : {
				iod : null
			},
			color : 'white'
		} ]
	}, {
		size : "80%",
		data : []
	} ];

	let maxLength = 0;

	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(OV_L1_ID) {
		series[1].data.push({
			name : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID].OV_L1_KOR,
			y : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID].DTVAL_CO,
			color : params[0].opt_colors[series[1].data.length],
			dataObj : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID]
		});
		if (toJson[$administStatsMain.ui.selectedYear][OV_L1_ID].OV_L1_KOR.length > maxLength) {
			maxLength = toJson[$administStatsMain.ui.selectedYear][OV_L1_ID].OV_L1_KOR.length;
		}
	});

	let opt = {};
	opt.chartId = params[0].opt_chartId;
	opt.chartType = params[0].opt_chartType;
	opt.title = params[0].opt_chartNm;
	opt.filename = $(".sb_year option:selected").text() + " " + params[0].opt_chartNm + " " + "임금근로 일자리";
	opt.series = series;
	opt.distance = 3;
	opt.pie = {
		size : "80%"
	};
	opt.seriesShowInLegend = true;
	opt.legendReversed = false;
	opt.legend = {
		useHTML : true,
		align : "right",
		verticalAlign : "middle",
		layout : "vertical",
		itemMarginTop : 2,
		itemMarginBottom : 2,
		labelFormatter : function() {
			if (this.name === "(전년동기대비)") {
				return "<span style='min-width: " + ((maxLength * 10) + 90) + "px; display: inline-block;'><span style='float: right;'>" + this.name + "　</span></span>"
			} else {
				let str = "<span style='min-width: " + ((maxLength * 10) + 90) + "px; display: inline-block;'>";
				str += "<span style='float: left;' >" + this.name + "</span>";
				str += "<span style='float: right'>" + $administStatsMain.util.getVarianceText({
					val : this.dataObj.iod,
					digits : 1,
					unit : '만개',
					noDataMsg : '전년동기 자료 없음',
					postfixs : [ '증가 ↑', '감소 ↓' ]
				}) + "</span>";
				str += "</span>";
				return str;
			}
		}
	};
	opt.tooltipFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.y.toFixed(1)) + " 만개"; //배천규 수정
	};
	opt.dataLabelsFormatter = function(that) {
		return that.point.name + "<br />" + that.point.percentage.toFixed(1) + " %";
	};
	opt.exportingDataLabelsFormatter = function(that) {
		return opt.dataLabelsFormatter(that) + "<br />(" + opt.tooltipFormatter(that) + ")";
	};
	opt.isBigExporting = true;
	AdministStatsChart.ui.makeChart(opt);
}