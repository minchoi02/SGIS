/**
 * 행정통계시각화 대쉬보드 > 신혼부부
 */
(function(W, D) {
	W.$newlyDash = W.$newlyDash || {};

	$(document).ready(function() {
	});

	$(window).scroll(function() {
	});

	$(window).resize(function() {
	});

	$newlyDash.consts = {},

	$newlyDash.ui = {

		/**
		 * @name init
		 * @description 최초 화면을 초기화(각 화면을 로딩)
		 */
		init : function() {
			$administStatsMain.ui.chartSaveClear();
			$administStatsMain.ui.removeContent();
			$administStatsMain.ui.appendContent("/view/administStats/newlyDash/main");
		},

		/**
		 * @name ready
		 * @description 최초 화면을 초기화(각 화면을 로딩)
		 */
		ready : function() {
			/* 행정구역 코드 기본값 [00]전국 */
			$administStatsMain.ui.selectedYear = "2020";
			
			if ($administStatsMain.ui.selectedArea == "" || $administStatsMain.ui.selectedArea == "00" || $administStatsMain.ui.selectedArea == "99") {
				$administStatsMain.ui.selectedArea = "00";
				$administStatsMain.ui.selectedLevel = "0";
			}

			/* 지도 & 지역별 차트 파라미터 초기화 */
			$administStatsMain.ui.dftRegnParam = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["8"]), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				ov_l1_list : $administStatsMain.consts.sidoAll,
				regn_dataKey : $administStatsMain.ui.apiParam["8"].opt_dispDataKey,
				regn_title : $administStatsMain.ui.apiParam["8"].opt_chartNmByArea,
				regn_color : "#BCBCBC"
			});
			$administStatsMain.ui.selRegnParam = $administStatsMain.ui.dftRegnParam;
			
			/* 시계열 차트 파라미터 초기화 */
			/* 하드코딩 : TBL_ID 2개 이상 사용 */
			$administStatsMain.ui.dftTmsrParam = $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
				surv_year_list : $administStatsMain.ui.dftYears.join(","),
				tbl_id_list : "DT_1NW1001,DT_1NW2034,DT_1NW3034",
				char_itm_id_list : "T10",
				ov_l1_list : $administStatsMain.ui.selectedArea,
				tmsr_chartId : "tmsrChart",
				tmsr_title : "혼인 종류별 신혼부부 수",
				tmsr_dataKey : "TBL_ID",
				tmsr_nameKey : "CHAR_ITM_NM",
				tmsr_colors : [ "#BCBCBC", "#338CCA", "#F6A347" ]
			});
			$administStatsMain.ui.selTmsrParam = $administStatsMain.ui.dftTmsrParam;

			setTimeout(function() {
				$newlyDash.event.allChange($administStatsMain.ui.selectedArea, "1");
			}, 50);
		}

	};

	$newlyDash.util = {};

	$newlyDash.event = {

		/**
		 * @name allChange
		 * @description 지역경계 클릭시 모든 차트데이터 변경작업
		 * @param admCd
		 *            지역코드
		 * @param mode
		 *            1(처음), 2(지도선택), 3(년도 변경)
		 */
		allChange : function(admCd, mode) {

			$administStatsMain.ui.selectedArea = admCd;

			let param = {};

			/* 하드코딩 : TBL_ID 2개 이상 사용 */
			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				tbl_id_list : "DT_1NW1001,DT_1NW2034,DT_1NW3034",
				char_itm_id_list : "T10",
				ov_l1_list : $administStatsMain.ui.selectedArea,
				opt_chartId : "newlyChart1",
				opt_chartType : "pie",
				opt_chartNm : "혼인 종류별 신혼부부 수",
				opt_tblIds : [ "DT_1NW1001", "DT_1NW2034", "DT_1NW3034" ]
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
				newlyChart1(data, _.cloneDeep(param));
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["2"]), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				ov_l1_list : ($administStatsMain.ui.selectedArea == "00" ? "000" : "2" + $administStatsMain.ui.selectedArea),
				opt_chartId : "newlyChart2",
				opt_colors : [ "#338CCA", "#F6A347", "#E5E5E5" ],
				opt_mapColors : [ "#050099", "#CB5B1B", "#3F0099" ]
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
				newlyPieChart(data, _.cloneDeep(param));
			});

			/* 지도 선택 무시 */
			if (mode != "2") {
				param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["3"]), {
					surv_year_list : $administStatsMain.ui.selectedYear,
					ov_l1_list : $administStatsMain.consts.sidoAll2,
					opt_chartNm : "초혼 신혼부부 평균 출생아 수",
					opt_chartId : "newlyChart3",
					opt_digits : 2
				});
				$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
					newlyChart3(data, _.cloneDeep(param));
				});

				param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["4"]), {
					surv_year_list : $administStatsMain.ui.selectedYear,
					opt_chartId : "newlyChart4",
					opt_digits : 1
				});
				$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
					newlyBarChart(data, _.cloneDeep(param));
				});
			}

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["5"]), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				ov_l1_list : ($administStatsMain.ui.selectedArea == "00" ? "000" : "2" + $administStatsMain.ui.selectedArea),
				opt_chartId : "newlyChart5",
				opt_colors : [ "#395352", "#3F6864", "#448074", "#599E99", "#6FA89F" ],
				opt_mapColor : "#0B610B"
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
				newlyTreemapChart(data, _.cloneDeep(param));
			});

			/* 지도 선택 무시 */
			if (mode != "2") {
				/* TODO 행정통계시각화 관리자화면 완료 시 DB 데이터 등록 후 소스 수정해야함 */
				param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
					surv_year_list : $administStatsMain.ui.selectedYear,
					tbl_id_list : "DT_1NW2024",
					char_itm_id_list : "T10",
					ov_l1_list : "1,2,3,4,5,6,12",
					ov_l2_list : "000",
					opt_chartId : "newlyChart6",
					opt_chartType : "pie",
					opt_chartNm : "초혼 신혼부부 소득수준별 비중(전국)",
					opt_tblIds : [ "DT_1NW2024" ],
					opt_digits : 1
				});
				$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
					newlyChart6(data, _.cloneDeep(param));
				});

				/* TODO 행정통계시각화 관리자화면 완료 시 DB 데이터 등록 후 소스 수정해야함 */
				param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
					surv_year_list : $administStatsMain.ui.selectedYear,
					tbl_id_list : "DT_1NW2032",
					char_itm_id_list : "T10",
					ov_l1_list : "000",
					ov_l2_list : "1,10,20,30,40,50,60,70,80",
					opt_chartId : "newlyChart7",
					opt_chartType : "pie",
					opt_chartNm : "초혼 신혼부부 금융권 대출잔액별 비중(전국)",
					opt_tblIds : [ "DT_1NW2032" ],
					opt_digits : 1
				});
				$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
					newlyChart7(data, _.cloneDeep(param));
				});
			}

			AdministStatsChart.ui.makeRegnChart(mode);
			AdministStatsChart.ui.makeTmsrChart($administStatsMain.ui.selTmsrParam);

			setTimeout(function() {
				$administStatsMain.ui.loading(false);
			}, 2000);
		}
	};

}(window, document));

/* 하드코딩 : TBL_ID 2개 이상 사용 */
/**
 * @name newlyChart1
 * @description 신혼부부 차트1
 */
function newlyChart1(data, param) {

	const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key0 : "TBL_ID",
		key : "PRD_DE"
	});

	let series = [ {
		innerSize : "0%",
		data : [ {
			name : toJson["DT_1NW1001"][$administStatsMain.ui.selectedYear].CHAR_ITM_NM,
			y : toJson["DT_1NW1001"][$administStatsMain.ui.selectedYear].DTVAL_CO,
			color : "#BCBCBC",
			dataObj : toJson["DT_1NW1001"][$administStatsMain.ui.selectedYear],
			mapColor : "#0C0C0C"
		} ],
		dataLabels : {
			useHTML : true,
			distance : -75.5,
			headerFormat : "",
			pointFormat : "{point.name}<br />{point.y:,0f} " + toJson["DT_1NW1001"][$administStatsMain.ui.selectedYear].dispUnitNm,
			footerFormat : "",
			style : {
				textAlign : "center",
				color : "#000000"
			}
		}
	}, {
		innerSize : "80%",
		data : [ {
			name : toJson["DT_1NW2034"][$administStatsMain.ui.selectedYear].CHAR_ITM_NM,
			y : toJson["DT_1NW2034"][$administStatsMain.ui.selectedYear].DTVAL_CO,
			per : toJson["DT_1NW2034"][$administStatsMain.ui.selectedYear].DTVAL_CO / toJson["DT_1NW1001"][$administStatsMain.ui.selectedYear].DTVAL_CO * 100,
			color : "#338CCA",
			dataObj : toJson["DT_1NW2034"][$administStatsMain.ui.selectedYear],
			mapColor : "#050099"
		}, {
			name : toJson["DT_1NW3034"][$administStatsMain.ui.selectedYear].CHAR_ITM_NM,
			y : toJson["DT_1NW3034"][$administStatsMain.ui.selectedYear].DTVAL_CO,
			per : toJson["DT_1NW3034"][$administStatsMain.ui.selectedYear].DTVAL_CO / toJson["DT_1NW1001"][$administStatsMain.ui.selectedYear].DTVAL_CO * 100,
			color : "#F6A347",
			dataObj : toJson["DT_1NW3034"][$administStatsMain.ui.selectedYear],
			mapColor : "#CB5B1B"
		} ]
	} ];

	let exportingSeries = [];
	exportingSeries.push(_.cloneDeep(series[0]));
	exportingSeries.push(_.cloneDeep(series[1]));
	exportingSeries[0].dataLabels.distance = -175;

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.series = series;
	opt.cursor = "pointer";
	opt.pie = {
		size : "90%",
		center : [ "50%", "50%" ]
	};
	opt.exporting = {
		chartOptions : {
			plotOptions : {
				pie : {
					size : "100%"
				}
			}
		}
	};
	opt.exportingSeries = exportingSeries;
	opt.tooltipFormatter = function(that) {
		/* [DT_1NW1001]전체 신혼부부 툴팁 무시 */
		if (that.point.dataObj.TBL_ID == "DT_1NW1001") {
			return false;
		}
		return $administStatsMain.util.setFixedByDigits({
			val : that.point.per,
			digits : 1,
			unit : "%"
		});
	};
	opt.dataLabelsTextOutline = true;
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.setFixedByDigits({
			prefix : that.point.name + "<br />",
			val : that.point.y,
			unit : that.point.dataObj.dispUnitNm
		});
	};
	opt.exportingDataLabelsFormatter = function(that) {
		return opt.dataLabelsFormatter(that) + "<br />(" + opt.tooltipFormatter(that) + ")";
	};
	opt.eventClick = function(e, that) {
		const selRegnParam = $.extend(true, _.cloneDeep(param), {
			tbl_id_list : e.point.dataObj.TBL_ID,
			ov_l1_list : $administStatsMain.consts.sidoAll,
			regn_dataKey : "TBL_ID",
			regn_title : param.opt_chartNm + "(" + e.point.name + ")",
			regn_color : e.point.color
		});
		const selTmsrParam = $.extend(true, _.cloneDeep(param), {
			surv_year_list : $administStatsMain.ui.dftYears.join(","),
			tbl_id_list : "DT_1NW1001,DT_1NW2034,DT_1NW3034",
			ov_l1_list : $administStatsMain.ui.selectedArea,
			tmsr_chartId : "tmsrChart",
			tmsr_title : param.opt_chartNm,
			tmsr_dataKey : "TBL_ID",
			tmsr_nameKey : "CHAR_ITM_NM",
			tmsr_colors : [ "#BCBCBC", "#338CCA", "#F6A347" ]
		});
		$administStatsMain.ui.chartItmClick({
			event : e,
			selRegnParam : selRegnParam,
			selTmsrParam : selTmsrParam
		});
	};
	AdministStatsChart.ui.makeChart(opt);
}

/**
 * @name newlyChart2
 * @description 신혼부부 차트2
 */
function newlyPieChart(data, param) {

	const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key : param.opt_dispDataKey
	});
	let sum = null;
	let datas = [];

	let rmndrCo = 0;
	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(dataKey) {
		const v = toJson[$administStatsMain.ui.selectedYear][dataKey];
		if (v.subsumYn == "Y" && $administStatsMain.util.isEmpty(sum)) {
			sum = v;
		} else {
			datas.push(v);
			rmndrCo += v.DTVAL_CO;
		}
	});

	let series = [ {
		innerSize : "0%",
		cursor : (function() {
			if (sum.clickEventYn == "Y") {
				return "pointer";
			} else {
				return "default";
			}
		}()),
		enableMouseTracking : (function() {
			if (sum.clickEventYn == "Y") {
				return true;
			} else {
				return false;
			}
		}()),
		data : [ {
			name : sum[param.opt_dispNameKey],
			y : sum.DTVAL_CO,
			color : (function() {
				if (sum.clickEventYn == "Y") {
					return "#BCBCBC";
				} else {
					return "#FFFFFF";
				}
			}()),
			dataObj : sum,
			mapColor : "#0C0C0C"
		} ],
		dataLabels : {
			useHTML : true,
			distance : -75.5,
			headerFormat : "",
			pointFormat : "{point.name}<br />{point.y:,0f}&nbsp;" + param.opt_dispUnitNm,
			footerFormat : "",
			style : {
				textAlign : "center",
				color : "#000000"
			}
		}
	}, {
		innerSize : "80%",
		data : (function() {
			let arr = [];
			for (let i = 0; i < datas.length; i++) {
				const v = datas[i];
				arr.push({
					name : v[param.opt_dispNameKey],
					y : v.DTVAL_CO,
					color : param.opt_colors[i],
					dataObj : v,
					mapColor : param.opt_mapColors[i]
				});
				if (i == (datas.length - 1)) {
					if (param.opt_rmndrUseYn == "Y") {
						arr.push({
							name : "",
							y : sum.DTVAL_CO - rmndrCo,
							color : "#E5E5E5",
							dataObj : {
								ttipUseYn : "N",
								labelUseYn : "N",
								clickEventYn : "N"
							},
							dataLabels : {
								enabled : false
							}
						});
					}
				}
			}
			return arr;
		}())
	} ];

	let exportingSeries = [];
	exportingSeries.push(_.cloneDeep(series[0]));
	exportingSeries.push(_.cloneDeep(series[1]));
	exportingSeries[0].dataLabels.distance = -165;

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.series = series;
	opt.cursor = "pointer";
	opt.pie = {
		size : "90%",
		center : [ "50%", "50%" ]
	};
	opt.tooltipFormatter = function(that) {
		if (that.point.dataObj.ttipUseYn != "Y") {
			return false;
		}
		return that.point.percentage.toFixed(1) + " %";
	};
	opt.dataLabelsTextOutline = true;
	opt.dataLabelsFormatter = function(that) {
		if (that.point.dataObj.labelUseYn == "Y") {
			return that.point.name + "<br />" + $administStatsMain.util.addComma(that.point.y) + " " + that.point.dataObj.dispUnitNm;
		}
	};
	opt.exporting = {
		chartOptions : {
			plotOptions : {
				pie : {
					size : "90%"
				}
			}
		}
	};
	opt.exportingSeries = exportingSeries;
	opt.exportingDataLabelsFormatter = function(that) {
		let returnStr = opt.dataLabelsFormatter(that);
		if (opt.tooltipFormatter(that)) {
			returnStr += "<br />(" + opt.tooltipFormatter(that) + ")";
		}
		return returnStr;
	};
	opt.eventClick = function(e, that) {
		if (e.point.dataObj.clickEventYn == "Y") {
			const selRegnParam = $.extend(true, _.cloneDeep(param), {
				ov_l1_list : (function() {
					if (param.opt_sidoAll2 == "Y") {
						return $administStatsMain.consts.sidoAll2;
					}
					return $administStatsMain.consts.sidoAll;
				}()),
				regn_dataKey : param.opt_dispDataKey,
				regn_title : e.point.dataObj.chartNmByArea,
				regn_color : e.point.color
			});
			if (param.opt_dispVarOrd == 0) {
				selRegnParam[param.opt_dispDataKey.toLowerCase() + "_list"] = e.point.dataObj[param.opt_dispDataKey];
			} else {
				selRegnParam[param.opt_dispDataKey.toLowerCase().replace("_id", "") + "_list"] = e.point.dataObj[param.opt_dispDataKey];
			}
			const selTmsrParam = $.extend(true, _.cloneDeep(param), {
				surv_year_list : $administStatsMain.ui.dftYears.join(","),
				ov_l1_list : (function() {
					if (param.opt_sidoAll2 == "Y") {
						return ($administStatsMain.ui.selectedArea == "00" ? "000" : "2" + $administStatsMain.ui.selectedArea);
					}
					return $administStatsMain.ui.selectedArea;
				}()),
				tmsr_chartId : "tmsrChart",
				tmsr_title : e.point.dataObj.chartNmByYear,
				tmsr_dataKey : param.opt_dispDataKey,
				tmsr_nameKey : param.opt_dispNameKey,
				tmsr_colors : (function() {
					if (sum.clickEventYn == "Y") {
						return [ "#BCBCBC" ].concat(param.opt_colors);
					} else {
						return param.opt_colors;
					}
				}())
			});
			let ovList = [];
			for (let i = 0; i < param.opt_dispSrvList.length; i++) {
				if (param.opt_dispSrvList[i].useYnByYearChart == "Y") {
					ovList.push(param.opt_dispSrvList[i].itmId);
				}
			}
			if (param.opt_dispVarOrd == 0) {
				selTmsrParam[param.opt_dispDataKey.toLowerCase() + "_list"] = ovList.join(",");
			} else {
				selTmsrParam[param.opt_dispDataKey.toLowerCase().replace("_id", "") + "_list"] = ovList.join(",");
			}
			$administStatsMain.ui.chartItmClick({
				event : e,
				selRegnParam : selRegnParam,
				selTmsrParam : selTmsrParam
			});
		}
	};
	opt.callback = function(that, chart) {
		$.each(chart.series, function(i, v) {
			$.each(v.data, function(i2, v2) {
				if (v2.dataObj.clickEventYn != "Y") {
					$(v2.graphic.element).css("cursor", "default");
				}
			});
		});
	};
	AdministStatsChart.ui.makeChart(opt);
}

/* 하드코딩 : 차트 고정 */
/**
 * @name newlyChart3
 * @description 신혼부부 차트3
 */
function newlyChart3(data, param) {

	const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key : param.opt_dispDataKey
	});
	let forResults = []; /* 결과용 전체지역 */
	let forResults00 = []; /* 결과용 전국 */
	let series = [ {
		data : [],
		enableMouseTracking : false
	} ];

	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(dataKey) {
		const v = toJson[$administStatsMain.ui.selectedYear][dataKey];
		if (v.subsumYn == "Y") {
			forResults00.push({
				name : v[param.opt_dispNameKey],
				DTVAL_CO : v.DTVAL_CO,
				dataObj : v
			});
		} else {
			forResults.push({
				name : v[param.opt_dispNameKey],
				DTVAL_CO : v.DTVAL_CO,
				dataObj : v
			});
		}
	});

	/* 상위지역 3개 */
	forResults = $administStatsMain.util.sortJSON(forResults, "DTVAL_CO", "desc");
	$.each(forResults, function(i, v) {
		if (i < 3) {
			series[0].data.push({
				name : $administStatsMain.util.abbreviationToAddress(v.name),
				y : v.DTVAL_CO,
				color : "#F6A347",
				dataObj : v.dataObj,
				mapColor : "#050099"
			});
		}
	});

	/* 전국 */
	series[0].data.push({
		name : forResults00[0].name,
		y : forResults00[0].DTVAL_CO,
		color : "#BCBCBC",
		dataObj : forResults00[0].dataObj,
		mapColor : "#0C0C0C"
	});

	/* 하위지역 3개 */
	for (let i = forResults.length - 3; i < forResults.length; i++) {
		const v = forResults[i];
		series[0].data.push({
			name : $administStatsMain.util.abbreviationToAddress(v.name),
			y : v.DTVAL_CO,
			color : "#338CCA",
			dataObj : v.dataObj,
			mapColor : "#0B610B"
		});
	}

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.filename = $(".sb_year option:selected").text() + " " + param.opt_chartNm;
	opt.series = series;
	opt.xAxis = {
		type : "category"
	};
	opt.yAxis = {
		plotLines : [ {
			color : "#E24F4F",
			width : 1,
			value : forResults00[0].DTVAL_CO,
			zIndex : 5,
			dashStyle : "ShortDash"
		} ]
	};
	opt.cursor = "pointer";
	opt.tooltipPositioner = true;
	opt.tooltipFormatter = function(that) {
		return false;
	};
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.y) + " " + that.point.dataObj.dispUnitNm;
	};
	opt.seriesShowInLegend = true;
	opt.exportingShowInLegend = true;
	opt.legend = {
		itemStyle : {
			cursor : "pointer",
		},
		margin : -3,
		verticalAlign : "bottom",
		labelFormatter : function() {
			$(this.legendSymbol.element).remove();
			let labelText = '<span>';
			labelText += '<span style="color:#F6A347; padding-right:2px;">●</span> 상위 3개 지역';
			labelText += '　　　　　　　　　　<span style="color:#338CCA; padding-right:2px; margin-right: 10px;">●</span> 하위 3개 지역　　';
			labelText += '</span>';
			return labelText;
		}
	};
	opt.callback = function(that, chart) {
		$(chart.renderTo).css("cursor", "pointer");
		if (!$(chart.renderTo).hasClass("hover_chart")) {
			$(chart.renderTo).addClass("hover_chart");
		}
		if ($._data($("#" + param.opt_chartId).find("[id^=highcharts]")[0], 'events') == null) {
			$(chart.renderTo).find("[id^=highcharts]").on("click", function() {
				const selRegnParam = $.extend(true, _.cloneDeep(param), {
					ov_l1_list : $administStatsMain.consts.sidoAll2,
					regn_dataKey : param.opt_dispDataKey,
					regn_title : param.opt_chartNm,
					regn_color : "#338CCA",
					regn_mapColor : "#050099"
				});
				const selTmsrParam = $.extend(true, _.cloneDeep(param), {
					surv_year_list : $administStatsMain.ui.dftYears.join(","),
					tbl_id_list : selRegnParam.tbl_id_list,
					char_itm_id_list : selRegnParam.char_itm_id_list,
					ov_l1_list : "000", /* [000]전국 */
					tmsr_chartId : "tmsrChart",
					tmsr_title : param.opt_chartNm,
					tmsr_dataKey : param.opt_dispDataKey,
					tmsr_nameKey : param.opt_dispNameKey,
					tmsr_colors : [ "#338CCA" ]
				});
				$administStatsMain.ui.chartItmClick({
					event : null,
					chartId : param.opt_chartId,
					selRegnParam : selRegnParam,
					selTmsrParam : selTmsrParam
				});
			});
		}
	};
	AdministStatsChart.ui.makeChart(opt);
}

/**
 * @name newlyChart4
 * @description 신혼부부 차트4
 */
function newlyBarChart(data, param) {

	param.opt_fnCalc = function(data) {
		let datas = [];
		for (let i = 0; i < data.length; i++) {
			let s = _.cloneDeep(data[i]);
			s.DTVAL_CO = s.DTVAL_CO * 1;
			for (let j = 0; j < data.length; j++) {
				let t = _.cloneDeep(data[j]);
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
		return datas;
	};

	data = param.opt_fnCalc(data);
	const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key : param.opt_dispDataKey
	});

	let series = [ {
		data : [],
		enableMouseTracking : false
	} ];
	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(dataKey) {
		const v = toJson[$administStatsMain.ui.selectedYear][dataKey];
		series[0].data.push({
			name : v[param.opt_dispNameKey],
			y : v.DTVAL_CO,
			color : "#33B18F",
			dataObj : v,
			mapColor : "#0B610B"
		});
	});

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.series = series;
	opt.xAxis = {
		type : "category"
	};
	opt.yAxis = {
		min : 0,
		max : 100
	};
	opt.seriesShowInLegend = false;
	opt.cursor = "pointer";
	opt.tooltipPositioner = true;
	opt.tooltipFormatter = function(that) {
		return false;
	};
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.setFixedByDigits({
			val : that.point.y,
			digits : 1,
			unit : param.opt_dispUnitNm
		});
	};
	opt.callback = function(that, chart) {
		$(chart.renderTo).css("cursor", "pointer");
		if (!$(chart.renderTo).hasClass("hover_chart")) {
			$(chart.renderTo).addClass("hover_chart");
		}
		if ($._data($("#" + param.opt_chartId).find("[id^=highcharts]")[0], 'events') == null) {
			$(chart.renderTo).find("[id^=highcharts]").on("click", function() {
				const selRegnParam = $.extend(true, _.cloneDeep(param), {
					ov_l1_list : $administStatsMain.consts.sidoAll2,
					regn_dataKey : param.opt_dispDataKey,
					regn_title : param.opt_chartNm.replace(" 혼인연차별", ""),
					regn_color : "#33B18F",
					regn_mapColor : "#0B610B"
				});
				const selTmsrParam = $.extend(true, _.cloneDeep(param), {
					surv_year_list : $administStatsMain.ui.dftYears.join(","),
					tmsr_chartId : "tmsrChart",
					tmsr_title : param.opt_chartNm,
					tmsr_dataKey : param.opt_dispDataKey,
					tmsr_nameKey : param.opt_dispNameKey,
					tmsr_colors : []
				});
				$administStatsMain.ui.chartItmClick({
					event : null,
					chartId : param.opt_chartId,
					selRegnParam : selRegnParam,
					selTmsrParam : selTmsrParam
				});
			});
		}
	};
	AdministStatsChart.ui.makeChart(opt);
}

/**
 * @name newlyChart5
 * @description 신혼부부 차트7
 */
function newlyTreemapChart(data, param) {

	let datas = [];
	for (let i = 0; i < data.length; i++) {
		let s = _.cloneDeep(data[i]);
		s.DTVAL_CO = s.DTVAL_CO * 1;
		for (let j = 0; j < data.length; j++) {
			let t = _.cloneDeep(data[j]);
			t.DTVAL_CO = t.DTVAL_CO * 1;
			if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
				if (s.subsumYn != "Y" && t.subsumYn == "Y") {
					s.DTVAL_CO_PER = s.DTVAL_CO / t.DTVAL_CO * 100;
					datas.push(s);
				}
			}
		}
	}

	const toJson = $administStatsMain.util.arrayToJson({
		data : datas,
		key : param.opt_dispDataKey
	});

	let series = [ {
		data : []
	} ];
	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().reverse().forEach(function(OV_L2_ID) {
		const v = toJson[$administStatsMain.ui.selectedYear][OV_L2_ID];
		series[0].data.push({
			name : v[param.opt_dispNameKey],
			value : v.DTVAL_CO,
			dataObj : v,
			mapColor : param.opt_mapColor,
			dataKey : OV_L2_ID,
			DTVAL_CO_PER : v.DTVAL_CO_PER
		});
	});

	series[0].data = $administStatsMain.util.sortJSON(series[0].data, "dataKey", "desc");
	for (let i = 0; i < series[0].data.length; i++) {
		series[0].data[i].colorValue = (i + 1);
		series[0].data[i].color = param.opt_colors[i];
	}

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.series = series;
	opt.cursor = "pointer";
	opt.tooltipFormatter = function(that) {
		if (that.point.dataObj.ttipUseYn != "Y") {
			return false;
		}
		return $administStatsMain.util.setFixedByDigits({
			prefix : "",
			val : that.point.DTVAL_CO_PER,
			digits : 1,
			unit : "%"
		});
	};
	opt.dataLabelsFormatter = function(that) {
		if (that.point.dataObj.labelUseYn == "Y") {
			return $administStatsMain.util.setFixedByDigits({
				prefix : that.point.name + "<br />",
				val : that.point.value,
				digits : 0,
				unit : param.opt_dispUnitNm
			});
		}
	};
	opt.dataLabelsTextOutline = true;
	opt.exportingDataLabelsFormatter = function(that) {
		return opt.dataLabelsFormatter(that) + "<br />(" + opt.tooltipFormatter(that) + ")";
	};
	opt.eventClick = function(e, that) {
		const selRegnParam = $.extend(true, _.cloneDeep(param), {
			ov_l1_list : (function() {
				if (param.opt_sidoAll2 == "Y") {
					return $administStatsMain.consts.sidoAll2;
				}
				return $administStatsMain.consts.sidoAll;
			}()),
			regn_dataKey : param.opt_dispDataKey,
			regn_title : e.point.dataObj.chartNmByArea,
			regn_color : e.point.color
		});
		let ovList = [];
		for (let i = 0; i < param.opt_dispSrvList.length; i++) {
			if (param.opt_dispSrvList[i].subsumYn == "Y") {
				ovList.push(param.opt_dispSrvList[i].itmId);
			}
		}
		ovList.push(e.point.dataObj[param.opt_dispDataKey]);
		selRegnParam[param.opt_dispDataKey.toLowerCase().replace("_id", "") + "_list"] = ovList.join(",");

		const selTmsrParam = $.extend(true, _.cloneDeep(param), {
			surv_year_list : $administStatsMain.ui.dftYears.join(","),
			ov_l1_list : (function() {
				if (param.opt_sidoAll2 == "Y") {
					return ($administStatsMain.ui.selectedArea == "00" ? "000" : "2" + $administStatsMain.ui.selectedArea);
				}
				return $administStatsMain.ui.selectedArea;
			}()),
			tmsr_chartId : "tmsrChart",
			tmsr_title : e.point.dataObj.chartNmByYear,
			tmsr_dataKey : param.opt_dispDataKey,
			tmsr_nameKey : param.opt_dispNameKey,
			tmsr_colors : []
		});
		ovList = [];
		for (let i = 0; i < param.opt_dispSrvList.length; i++) {
			if (param.opt_dispSrvList[i].useYnByYearChart == "Y") {
				ovList.push(param.opt_dispSrvList[i].itmId);
			}
		}
		selTmsrParam[param.opt_dispDataKey.toLowerCase().replace("_id", "") + "_list"] = ovList.join(",");
		$administStatsMain.ui.chartItmClick({
			event : e,
			selRegnParam : selRegnParam,
			selTmsrParam : selTmsrParam
		});
	};
	AdministStatsChart.ui.makeChart(opt);
}

/**
 * @name newlyChart6
 * @description 신혼부부 차트6
 */
/* TODO 행정통계시각화 관리자화면 완료 시 DB 데이터 등록 후 소스 수정해야함 */
function newlyChart6(data, param) {

	const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key : "OV_L1_ID"
	});
	const colors = [ "#90C320", "#338CCA", "#F6A347", "#2FB9BC", "#B081B7", "#FFA9B0" ];

	let series = [ {
		innerSize : "50%",
		data : [],
		dataLabels : {
			style : {
				color : "#000000"
			}
		}
	} ];

	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(OV_L1_ID, idx) {
		const v = toJson[$administStatsMain.ui.selectedYear][OV_L1_ID];
		if (OV_L1_ID != "12") {
			series[0].data.push({
				name : v.OV_L1_KOR,
				y : v.DTVAL_CO,
				dataObj : v,
			});
		}
	});

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.series = series;
	opt.cursor = "pointer";
	opt.distance = -30;
	opt.colors = colors;
	opt.pie = {
		size : "180%",
		startAngle : -90,
		endAngle : 90,
		center : [ "50%", "100%" ]
	};
	opt.subtitle = {
		text : "평균소득<br />" + $administStatsMain.util.addComma(toJson[$administStatsMain.ui.selectedYear]["12"].DTVAL_CO) + " 만원",
		align : "center",
		verticalAlign : "middle",
		y : 60,
		x : -70,
		style : {
			textOutline : false,
			fontSize : "12px",
			fontWeight : "bold",
			color : "#000000"
		}
	};
	opt.exporting = {
		chartOptions : {
			subtitle : {
				x : -65,
				y : 165,
			},
			plotOptions : {
				pie : {
					size : "120%",
					center : [ "50%", "100%" ],
					dataLabels : {
						distance : -50,
					}
				}
			}
		}
	};
	opt.legendReversed = false;
	opt.seriesShowInLegend = true;
	opt.legend = {
		align : "right",
		verticalAlign : "top",
		layout : "vertical",
		itemMarginTop : 2,
		itemMarginBottom : 2
	};
	opt.tooltipFormatter = function(that) {
		return false;
	};
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.y) + " %";
	};
	opt.eventClick = function(e, that) {
		const selTmsrParam = $.extend(true, _.cloneDeep(param), {
			surv_year_list : $administStatsMain.ui.dftYears.join(","),
			tbl_id_list : "DT_1NW2024",
			ov_l1_list : "1,2,3,4,5,6",
			ov_l2_list : "000",
			tmsr_chartId : "tmsrChart",
			tmsr_title : param.opt_chartNm,
			tmsr_dataKey : "OV_L1_ID",
			tmsr_nameKey : "OV_L1_KOR",
			tmsr_colors : colors,
			tmsr_unit : "%"
		});
		$administStatsMain.ui.chartItmClick({
			event : e,
			selTmsrParam : selTmsrParam
		});
	};
	AdministStatsChart.ui.makeChart(opt);
}

/**
 * @name newlyChart7
 * @description 신혼부부 차트7
 */
/* TODO 행정통계시각화 관리자화면 완료 시 DB 데이터 등록 후 소스 수정해야함 */
function newlyChart7(data, param) {

	const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key : "OV_L2_ID"
	});
	const colors = [ "#90C320", "#338CCA", "#F6A347", "#2FB9BC", "#B081B7", "#FFA9B0", "#DDCB77", "#33B18F" ];

	let series = [ {
		innerSize : "50%",
		data : [],
		dataLabels : {
			style : {
				color : "#000000"
			}
		}
	} ];

	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(OV_L2_ID, idx) {
		const v = toJson[$administStatsMain.ui.selectedYear][OV_L2_ID];
		if (OV_L2_ID != "1") {
			series[0].data.push({
				name : v.OV_L2_KOR,
				y : v.DTVAL_CO,
				dataObj : v,
			});
		}
	});

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.series = series;
	opt.cursor = "pointer";
	opt.distance = -30;
	opt.colors = colors;
	opt.pie = {
		size : "180%",
		startAngle : -90,
		endAngle : 90,
		center : [ "50%", "100%" ]
	};
	opt.subtitle = {
		text : "대출보유비중<br />" + toJson[$administStatsMain.ui.selectedYear]["1"].DTVAL_CO + " %",
		align : "center",
		verticalAlign : "middle",
		y : 60,
		x : -70,
		style : {
			textOutline : false,
			fontSize : "12px",
			fontWeight : "bold",
			color : "#000000"
		}
	};
	opt.exporting = {
		chartOptions : {
			subtitle : {
				x : -65,
				y : 165,
			},
			plotOptions : {
				pie : {
					size : "120%",
					center : [ "50%", "100%" ],
					dataLabels : {
						distance : -50,
					}
				}
			}
		}
	};
	opt.legendReversed = false;
	opt.seriesShowInLegend = true;
	opt.legend = {
		align : "right",
		verticalAlign : "top",
		layout : "vertical",
		itemMarginTop : 2,
		itemMarginBottom : 2
	};
	opt.tooltipFormatter = function(that) {
		return false;
	};
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.y) + " %";
	};
	opt.eventClick = function(e, that) {
		const selTmsrParam = $.extend(true, _.cloneDeep(param), {
			surv_year_list : $administStatsMain.ui.dftYears.join(","),
			tbl_id_list : "DT_1NW2032",
			ov_l1_list : "000",
			ov_l2_list : "10,20,30,40,50,60,70,80",
			tmsr_chartId : "tmsrChart",
			tmsr_title : param.opt_chartNm,
			tmsr_dataKey : "OV_L2_ID",
			tmsr_nameKey : "OV_L2_KOR",
			tmsr_colors : colors,
			tmsr_unit : "%"
		});
		$administStatsMain.ui.chartItmClick({
			event : e,
			selTmsrParam : selTmsrParam
		});
	};
	AdministStatsChart.ui.makeChart(opt);
}