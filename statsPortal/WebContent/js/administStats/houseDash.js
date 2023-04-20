/**
 * 행정통계시각화 대쉬보드 > 주택소유
 */
(function(W, D) {
	W.$houseDash = W.$houseDash || {};

	$(document).ready(function() {
		
	});

	$(window).scroll(function() {
	});

	$(window).resize(function() {
	});

	$houseDash.consts = {},

	$houseDash.ui = {

		/**
		 * @name init
		 * @description 최초 화면을 초기화(각 화면을 로딩)
		 */
		init : function() {
			$administStatsMain.ui.chartSaveClear();
			$administStatsMain.ui.removeContent();
			$administStatsMain.ui.appendContent("/view/administStats/houseDash/main");
		},

		/**
		 * @name ready
		 * @description 최초 화면을 초기화(각 화면을 로딩)
		 */
		ready : function() {
			if ($administStatsMain.ui.selectedArea == "" || $administStatsMain.ui.selectedArea == "00" || $administStatsMain.ui.selectedArea == "99") {
				$administStatsMain.ui.selectedArea = "00";
				$administStatsMain.ui.selectedLevel = "0";
			}
			$administStatsMain.ui.selectedYear = "2020";
			/* 지도 & 지역별 차트 파라미터 초기화 */
			$administStatsMain.ui.dftRegnParam = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["8"]), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				ov_l1_list : $administStatsMain.consts.sidoAll,
				regn_dataKey : $administStatsMain.ui.apiParam["8"].opt_dispDataKey,
				regn_title : $administStatsMain.ui.apiParam["8"].opt_chartNmByArea,
				regn_color : "#338CCA"
			});
			$administStatsMain.ui.selRegnParam = $administStatsMain.ui.dftRegnParam;

			/* 시계열 차트 파라미터 초기화 */
			$administStatsMain.ui.dftTmsrParam = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["9"]), {
				surv_year_list : $administStatsMain.ui.dftYears.join(","),
				ov_l1_list : $administStatsMain.ui.selectedArea,
				tmsr_chartId : "tmsrChart",
				tmsr_title : $administStatsMain.ui.apiParam["9"].opt_chartNmByYear,
				tmsr_dataKey : $administStatsMain.ui.apiParam["9"].opt_dispDataKey,
				tmsr_nameKey : $administStatsMain.ui.apiParam["9"].opt_dispNameKey,
				tmsr_colors : [ "#BCBCBC", "#338CCA" ]
			});
			$administStatsMain.ui.selTmsrParam = $administStatsMain.ui.dftTmsrParam;

			setTimeout(function() {
				$houseDash.event.allChange($administStatsMain.ui.selectedArea, "1");
			}, 50);
		}
	};

	$houseDash.util = {};

	$houseDash.event = {

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

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["1"]), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				ov_l1_list : $administStatsMain.ui.selectedArea,
				opt_chartId : "houseChart1",
				opt_colors : [ "#338CCA", "#F6A347", "#E5E5E5" ],
				opt_mapColors : [ "#050099", "#CB5B1B", "#3F0099" ]
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
				newlyPieChart(data, _.cloneDeep(param));
			});

			/* 하드코딩 : TBL_ID 2개 이상 사용 */
			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				tbl_id_list : "DT_1OH0504",
				ov_l1_list : $administStatsMain.ui.selectedArea,
				ov_l2_list : "0,1,2",
				ov_l3_list : "000",
				opt_chartId : "houseChart2",
				opt_chartType : "pie",
				opt_chartNm : "주택을 소유한 개인 수",
				opt_tblIds : [ "DT_1OH0504" ]
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				houseChart2(data, _.cloneDeep(param));
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["3"]), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				ov_l1_list : $administStatsMain.ui.selectedArea,
				opt_chartId : "houseChart3",
				opt_colors : [ "#33B18F" ],
				opt_mapColors : [ "#0B610B" ]
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
				newlyPieChart(data, _.cloneDeep(param));
			});

			/* 지도 선택 무시 */
			if (mode != "2") {
				param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["4"]), {
					surv_year_list : $administStatsMain.ui.selectedYear,
					ov_l1_list : $administStatsMain.consts.sidoAll,
					opt_chartId : "houseChart4",
					opt_digits : 1
				});
				$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
					houseChart4(data, _.cloneDeep(param));
				});
			}

			/* 하드코딩 : TBL_ID 2개 이상 사용 */
			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				tbl_id_list : "DT_1OH0403,DT_1OH0418",
				char_itm_id_list : "T001",
				ov_l1_list : $administStatsMain.ui.selectedArea,
				ov_l2_list : "0",
				ov_l3_list : "100,200,300,400,500,600,700",
				opt_chartId : "houseChart5",
				opt_chartType : "column",
				opt_chartNm : "가구주 연령대별 주택소유율",
				opt_tblIds : [ "DT_1OH0403", "DT_1OH0418" ],
				opt_digits : 1
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				houseChart5(data, _.cloneDeep(param));
			});

			/* 하드코딩 : TBL_ID 2개 이상 사용 */
			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				tbl_id_list : "DT_1OH0404,DT_1OH0419",
				char_itm_id_list : "T001",
				ov_l1_list : $administStatsMain.ui.selectedArea,
				ov_l2_list : "1,2,3,4,5",
				opt_chartId : "houseChart6",
				opt_chartType : "column",
				opt_chartNm : "가구원수별 주택소유율",
				opt_tblIds : [ "DT_1OH0404", "DT_1OH0419" ],
				opt_digits : 1
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				houseChart6(data, _.cloneDeep(param));
			});

			/* 하드코딩 : TBL_ID 2개 이상 사용 */
			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				tbl_id_list : "DT_1OH0405,DT_1OH0420",
				char_itm_id_list : "T001",
				ov_l1_list : $administStatsMain.ui.selectedArea,
				ov_l2_list : "11,21,22,30",
				opt_chartId : "houseChart7",
				opt_chartType : "column",
				opt_chartNm : "세대구성별 주택소유율",
				opt_tblIds : [ "DT_1OH0405", "DT_1OH0420" ],
				opt_digits : 1
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				houseChart7(data, _.cloneDeep(param));
			});

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
 * @name houseChart2
 * @description 주택소유 차트2
 */
function houseChart2(data, param) {
	/*
	param.opt_fnCalc = function(data) {
		let datas = [];
		for (let i = 0; i < data.length; i++) {
			data[i].DTVAL_CO = data[i].DTVAL_CO * 1;
			if (data[i].TBL_ID == "DT_1IN1502" && data[i].CHAR_ITM_ID == "T130") {
				data[i].CHAR_ITM_NM = "총 인구";
				datas.push(data[i]);
			} else if (data[i].TBL_ID == "DT_1OH0504" && data[i].OV_L2_ID == "0" && data[i].OV_L3_ID == "000") {
				data[i].CHAR_ITM_NM = "주택소유개인";
				data[i].CHAR_ITM_ID = "T131";
				datas.push(data[i]);
			}
		}
		return datas;
	};
	*/
	param.opt_fnCalc = function(data) {
		let datas = [];
		for (let i = 0; i < data.length; i++) {
			data[i].DTVAL_CO = data[i].DTVAL_CO * 1;
			if (data[i].TBL_ID == "DT_1OH0504") {
				data[i].CHAR_ITM_NM = "주택소유개인";
				data[i].CHAR_ITM_ID = "T001";
				datas.push(data[i]);
			}
		}
		return datas;
	};
	data = param.opt_fnCalc(data);
	const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key : "OV_L2_ID"
	});

	let series = [ {
		innerSize : "0%",
		data : [ {
			name : toJson[$administStatsMain.ui.selectedYear][0].OV_L2_KOR,
			y : toJson[$administStatsMain.ui.selectedYear][0].DTVAL_CO,
			color : "#BCBCBC",
			dataObj : toJson[$administStatsMain.ui.selectedYear][0],
			mapColor : "#0C0C0C"
		} ],
		dataLabels : {
			useHTML : true,
			distance : -75.5,
			headerFormat : "",
			pointFormat : "{point.name}<br />{point.y:,0f} 명",
			footerFormat : "",
			style : {
				textAlign : "center",
				color : "#000000"
			}
		}
	}, {
		innerSize : "80%",
		data : [ {
			name : toJson[$administStatsMain.ui.selectedYear][1].OV_L2_KOR,
			y : toJson[$administStatsMain.ui.selectedYear][1].DTVAL_CO,
			color : "#338CCA",
			dataObj : toJson[$administStatsMain.ui.selectedYear][1],
			mapColor : "#050099"
		}, {
			name : toJson[$administStatsMain.ui.selectedYear][2].OV_L2_KOR,
			y : toJson[$administStatsMain.ui.selectedYear][2].DTVAL_CO,
			color : "#FFA2A2",
			dataObj : toJson[$administStatsMain.ui.selectedYear][2]
		} ]
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
	opt.exportingSeries = exportingSeries;
	opt.pie = {
		size : "90%",
		center : [ "50%", "50%" ]
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
	opt.tooltipFormatter = function(that) {
		/* [T130]총 인구, [T132]주택소유개인 외 툴팁 무시 */
		if (that.point.dataObj.OV_L2_KOR == "총계") {
			return false;
		}
		return that.point.percentage.toFixed(1) + " %";
	};
	opt.dataLabelsFormatter = function(that) {
		/* [T132]주택소유개인 외 외 데이터레이블 무시 */
		if (that.point.dataObj.OV_L2_KOR == "총계") {
			return that.point.name;
		}
		return that.point.name + "<br />" + $administStatsMain.util.addComma(that.point.y) + " 명";
	};
	opt.exportingDataLabelsFormatter = function(that) {
		return opt.dataLabelsFormatter(that) + (!opt.tooltipFormatter(that) ? "" : "<br />(" + opt.tooltipFormatter(that) + ")");
	};
	opt.eventClick = function(e, that) {
		const selRegnParam = $.extend(true, _.cloneDeep(param), {
			tbl_id_list : e.point.dataObj.TBL_ID,
			ov_l1_list : $administStatsMain.consts.sidoAll,
			ov_l2_list : e.point.dataObj.OV_L2_ID,
			regn_dataKey : "OV_L2_ID",
			regn_title : (function() {
				switch (e.point.dataObj.OV_L2_KOR) {
					case "남자":
						return "주택을 소유한 개인(남자)";
						break;
					case "여자":
						return "주택을 소유한 개인(여자)";
						break;
					default:
						return "주택을 소유한 총 개인";
						break;
				}
			}()),
			regn_color : e.point.color,
			regn_unit : "명"
		});
		const selTmsrParam = $.extend(true, _.cloneDeep(param), {
			surv_year_list : $administStatsMain.ui.dftYears.join(","),
			ov_l1_list : $administStatsMain.ui.selectedArea,
			tmsr_chartId : "tmsrChart",
			tmsr_title : (function() {
					switch (e.point.dataObj.OV_L2_KOR) {
					case "남자":
						return "주택을 소유한 개인";
						break;
					case "여자":
						return "주택을 소유한 개인";
						break;
					default:
						return "주택을 소유한 총 개인";
						break;
				}
			}()),
			tmsr_dataKey : "OV_L2_ID",
			tmsr_nameKey : "OV_L2_KOR",
			tmsr_colors : [ "#BCBCBC", "#338CCA", "#FFA2A2" ],
			tmsr_unit : "명",
		});
		$administStatsMain.ui.chartItmClick({
			event : e,
			selRegnParam : selRegnParam,
			selTmsrParam : selTmsrParam
		});
	};
	opt.callback = function(that, chart) {
		$.each(chart.series, function(i, v) {
			$.each(v.data, function(i2, v2) {
				if (v2.dataObj.OV_L2_KOR == "총계") {
					$(v2.graphic.element).css("cursor", "default");
				}
			});
		});
	};
	AdministStatsChart.ui.makeChart(opt);
}

/* 하드코딩 : 항목끼리 계산 */
/**
 * @name houseChart4
 * @description 주택소유 차트4
 */
function houseChart4(data, param) {

	param.opt_fnCalc = function(data) {
		let datas = [];
		for (let i = 0; i < data.length; i++) {
			let s = _.cloneDeep(data[i]);
			for (let j = 0; j < data.length; j++) {
				let t = _.cloneDeep(data[j]);
				if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.CHAR_ITM_ID == "T002" && t.CHAR_ITM_ID == "T001") {
					s.DTVAL_CO_ORI = s.DTVAL_CO;
					s.DTVAL_CO = s.DTVAL_CO / t.DTVAL_CO * 100;
					datas.push(s);
				}
			}
		}
		return datas;
	}

	data = param.opt_fnCalc(data);
	const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key : "OV_L1_ID"
	});

	let forResults = []; /* 결과용 전체지역 */
	let forResults00 = []; /* 결과용 전국 */
	let series = [ {
		data : [],
		enableMouseTracking : false
	} ];
	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(OV_L1_ID) {
		const v = toJson[$administStatsMain.ui.selectedYear][OV_L1_ID];
		if (OV_L1_ID != "00") {
			forResults.push({
				name : v.OV_L1_KOR,
				percentage : v.DTVAL_CO,
				dataObj : v
			});
		} else {
			forResults00.push({
				name : v.OV_L1_KOR,
				percentage : v.DTVAL_CO,
				dataObj : v
			});
		}
	});

	/* 상위지역 3개 */
	forResults = $administStatsMain.util.sortJSON(forResults, "percentage", "desc");
	$.each(forResults, function(i, v) {
		if (i < 3) {
			series[0].data.push({
				name : $administStatsMain.util.abbreviationToAddress(v.name),
				y : v.percentage,
				color : "#40A178",
				dataObj : v.dataObj,
				mapColor : "#0B610B"
			});
		}
	});

	/* 전국 */
	series[0].data.push({
		name : forResults00[0].name,
		y : forResults00[0].percentage,
		color : "#BCBCBC",
		dataObj : forResults00[0].dataObj,
		mapColor : "#0C0C0C",
	});

	/* 하위지역 3개 */
	for (let i = forResults.length - 3; i < forResults.length; i++) {
		const v = forResults[i];
		series[0].data.push({
			name : $administStatsMain.util.abbreviationToAddress(v.name),
			y : v.percentage,
			color : "#79E097",
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
	opt.dataLabelsTextOutline = true;
	opt.xAxis = {
		type : "category"
	};
	opt.yAxis = {
		plotLines : [ {
			color : "#E24F4F",
			width : 1,
			value : forResults00[0].percentage,
			zIndex : 5,
			dashStyle : "ShortDash"
		} ]
	};
	opt.exportingShowInLegend = true;
	opt.cursor = "pointer";
	opt.tooltipPositioner = function(labelWidth, labelHeight, point, a) {
		const chartPosition = this.chart.pointer.getChartPosition();
		const tooltipX = point.plotX;
		const tooltipY = point.plotY;
		if (point.negative) {
			return {
				x : chartPosition.left + tooltipX,
				y : chartPosition.top + tooltipY - (labelHeight * 1.1)
			}
		} else {
			return {
				x : chartPosition.left + tooltipX - 30,
				y : chartPosition.top + tooltipY + (labelHeight)
			}
		}
	};
	opt.tooltipFormatter = function(that) {
//		return $administStatsMain.util.addComma(that.point.dataObj.DTVAL_CO_ORI) + " 가구";
		return false;
	};
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.y.toFixed(1)) + " %";
	};
	opt.exportingDataLabelsFormatter = function(that) {
		let returnStr = opt.dataLabelsFormatter(that);
		if (opt.tooltipFormatter(that)) {
			returnStr += "<br />(" + opt.tooltipFormatter(that) + ")";
		}
		return returnStr;
	};
	opt.seriesShowInLegend = true;
	opt.legend = {
		itemStyle : {
			cursor : "pointer",
		},
		margin : -3,
		verticalAlign : "top",
		labelFormatter : function() {
			$(this.legendSymbol.element).remove();
			let labelText = '<span>';
			labelText += '<span style="color:#40A178; padding-right:2px;">●</span> 상위 3개 지역';
			labelText += '　　　　　　　　　　<span style="color:#79E097; padding-right:2px; margin-right: 10px;">●</span> 하위 3개 지역　　';
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
					ov_l1_list : $administStatsMain.consts.sidoAll,
					regn_dataKey : "CHAR_ITM_ID",
					regn_title : param.opt_chartNm.replace("거주지역별", "") + "(가구기준)",
					regn_color : "#197F77",
					regn_mapColor : "#0B610B",
					regn_unit : "%"
				});
				const selTmsrParam = $.extend(true, _.cloneDeep(param), {
					surv_year_list : $administStatsMain.ui.dftYears.join(","),
					tbl_id_list : selRegnParam.tbl_id_list,
					ov_l1_list : "00",
					tmsr_chartId : "tmsrChart",
					tmsr_title : param.opt_chartNm.replace("거주지역별", "") + "(가구기준)",
					tmsr_dataKey : "CHAR_ITM_ID",
					tmsr_nameKey : "CHAR_ITM_NM",
					tmsr_colors : [ "#197F77" ],
					tmsr_unit : "%"
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

/* 하드코딩 : 항목끼리 계산 */
/**
 * @name houseChart5
 * @description 주택소유 차트5
 */
function houseChart5(data, param) {

	const colors = [ "#FFC349", "#EBBB19", "#D0B712", "#B5B00C", "#8D9B0A" ];

	param.opt_fnCalc = function(data) {
		for (let i = 0; i < data.length; i++) {
			let s = data[i];
			s.DTVAL_CO = s.DTVAL_CO * 1;
			for (let j = 0; j < data.length; j++) {
				let t = data[j];
				t.DTVAL_CO = t.DTVAL_CO * 1;
				if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
					if (s.TBL_ID == t.TBL_ID && s.OV_L3_ID == "500") {
						s.OV_L3_KOR = "60세이상";
						if (t.OV_L3_ID >= 600) {
							s.DTVAL_CO += t.DTVAL_CO;
						}
					}
				}
			}
		}
		let datas = [];
		for (let i = 0; i < data.length; i++) {
			let s = _.cloneDeep(data[i]);
			for (let j = 0; j < data.length; j++) {
				let t = _.cloneDeep(data[j]);
				if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
					if (s.OV_L3_ID <= 500) {
						if (s.TBL_ID == "DT_1OH0403" && t.TBL_ID == "DT_1OH0418" && s.OV_L3_ID == t.OV_L3_ID) {
							s.DTVAL_CO_ORI = s.DTVAL_CO;
							s.DTVAL_CO = s.DTVAL_CO / (s.DTVAL_CO + t.DTVAL_CO) * 100;
							datas.push(s);
						}
					}
				}
			}
		}
		return datas;
	}

	data = param.opt_fnCalc(data);
	const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key : "OV_L3_ID"
	});

	let series = [ {
		data : []
	} ];

	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(OV_L3_ID) {
		const v = toJson[$administStatsMain.ui.selectedYear][OV_L3_ID];
		series[0].data.push({
			name : v.OV_L3_KOR,
			y : v.DTVAL_CO,
			color : colors[series[0].data.length],
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
	opt.cursor = "pointer";
	opt.tooltipPositioner = true;
	opt.tooltipFormatter = function(that) {
//		return $administStatsMain.util.addComma(that.point.dataObj.DTVAL_CO_ORI) + " 가구";
		return false;
	};
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.y.toFixed(1)) + " %";
	};
	opt.exportingDataLabelsFormatter = function(that) {
		let returnStr = opt.dataLabelsFormatter(that);
		if (opt.tooltipFormatter(that)) {
			returnStr += "<br />(" + opt.tooltipFormatter(that) + ")";
		}
		return returnStr;
	};
	opt.eventClick = function(e, that) {
		let ov_l3_list = e.point.dataObj.OV_L3_ID;
		if (ov_l3_list == "500") {
			ov_l3_list = "500,600,700";
		}
		const selRegnParam = $.extend(true, _.cloneDeep(param), {
			ov_l1_list : $administStatsMain.consts.sidoAll,
			ov_l3_list : ov_l3_list,
			regn_dataKey : "OV_L3_ID",
			regn_title : param.opt_chartNm + "(" + e.point.name + ")",
			regn_color : e.point.color,
			regn_unit : "%"
		});
		const selTmsrParam = $.extend(true, _.cloneDeep(param), {
			surv_year_list : $administStatsMain.ui.dftYears.join(","),
			ov_l1_list : e.point.dataObj.OV_L1_ID,
			tmsr_chartId : "tmsrChart",
			tmsr_title : param.opt_chartNm,
			tmsr_dataKey : "OV_L3_ID",
			tmsr_nameKey : "OV_L3_KOR",
			tmsr_colors : [],
			tmsr_unit : "%"
		});
		$administStatsMain.ui.chartItmClick({
			event : e,
			selRegnParam : selRegnParam,
			selTmsrParam : selTmsrParam
		});
	};
	AdministStatsChart.ui.makeChart(opt);
}

/* 하드코딩 : TBL_ID 2개 이상 사용 */
/**
 * @name houseChart6
 * @description 주택소유 차트6
 */
function houseChart6(data, param) {

	const colors = [ "#D8DB56", "#ADBD26", "#85A41A", "#648B0E", "#446F06" ];

	param.opt_fnCalc = function(data) {
		let datas = [];
		for (let i = 0; i < data.length; i++) {
			let s = data[i];
			s.DTVAL_CO = s.DTVAL_CO * 1;
			for (let j = 0; j < data.length; j++) {
				let t = data[j];
				t.DTVAL_CO = t.DTVAL_CO * 1;
				if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
					if (s.TBL_ID == "DT_1OH0404" && t.TBL_ID == "DT_1OH0419" && s.OV_L2_ID == t.OV_L2_ID) {
						s.DTVAL_CO_ORI = s.DTVAL_CO;
						s.DTVAL_CO = s.DTVAL_CO / (s.DTVAL_CO + t.DTVAL_CO) * 100;
						datas.push(s);
					}
				}
			}
		}
		return datas;
	}

	data = param.opt_fnCalc(data);
	const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key : "OV_L2_ID"
	});

	let series = [ {
		data : []
	} ];

	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(OV_L2_ID) {
		const v = toJson[$administStatsMain.ui.selectedYear][OV_L2_ID];
		series[0].data.push({
			name : v.OV_L2_KOR,
			y : v.DTVAL_CO,
			color : /* "#259884" */colors[series[0].data.length],
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
	opt.cursor = "pointer";
	opt.tooltipPositioner = true;
	opt.tooltipFormatter = function(that) {
//		return $administStatsMain.util.addComma(that.point.dataObj.DTVAL_CO_ORI) + " 가구";
		return false;
	};
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.y.toFixed(1)) + " %";
	};
	opt.exportingDataLabelsFormatter = function(that) {
		let returnStr = opt.dataLabelsFormatter(that);
		if (opt.tooltipFormatter(that)) {
			returnStr += "<br />(" + opt.tooltipFormatter(that) + ")";
		}
		return returnStr;
	};
	opt.eventClick = function(e, that) {
		const selRegnParam = $.extend(true, _.cloneDeep(param), {
			ov_l1_list : $administStatsMain.consts.sidoAll,
			ov_l2_list : e.point.dataObj.OV_L2_ID,
			regn_dataKey : "OV_L2_ID",
			regn_title : param.opt_chartNm + "(" + e.point.name + ")",
			regn_color : e.point.color,
			regn_unit : "%"
		});
		const selTmsrParam = $.extend(true, _.cloneDeep(param), {
			surv_year_list : $administStatsMain.ui.dftYears.join(","),
			ov_l1_list : e.point.dataObj.OV_L1_ID,
			tmsr_chartId : "tmsrChart",
			tmsr_title : param.opt_chartNm,
			tmsr_dataKey : "OV_L2_ID",
			tmsr_nameKey : "OV_L2_KOR",
			tmsr_colors : [],
			tmsr_unit : "%"
		});
		$administStatsMain.ui.chartItmClick({
			event : e,
			selRegnParam : selRegnParam,
			selTmsrParam : selTmsrParam
		});
	};
	AdministStatsChart.ui.makeChart(opt);
}

/* 하드코딩 : TBL_ID 2개 이상 사용 */
/**
 * @name houseChart7
 * @description 주택소유 차트7
 */
function houseChart7(data, param) {

	param.opt_fnCalc = function(data) {
		let datas = [];
		for (let i = 0; i < data.length; i++) {
			let s = data[i];
			s.DTVAL_CO = s.DTVAL_CO * 1;
			for (let j = 0; j < data.length; j++) {
				let t = data[j];
				t.DTVAL_CO = t.DTVAL_CO * 1;
				if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
					if (s.TBL_ID == "DT_1OH0405" && t.TBL_ID == "DT_1OH0420" && s.OV_L2_ID == t.OV_L2_ID) {
						s.DTVAL_CO_ORI = s.DTVAL_CO;
						s.DTVAL_CO = s.DTVAL_CO / (s.DTVAL_CO + t.DTVAL_CO) * 100;
						datas.push(s);
					}
				}
			}
		}
		return datas;
	}
	data = param.opt_fnCalc(data);
	const colors = [ "#9FDD7C", "#76C657", "#5DB24B", "#4A9D43" ];
	const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key : "OV_L2_ID"
	});

	let series = [ {
		data : []
	} ];
	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(OV_L2_ID) {
		const v = toJson[$administStatsMain.ui.selectedYear][OV_L2_ID];
		series[0].data.push({
			name : v.OV_L2_KOR,
			y : v.DTVAL_CO,
			color : /* "#106466" */colors[series[0].data.length],
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
	opt.cursor = "pointer";
	opt.tooltipPositioner = true;
	opt.tooltipFormatter = function(that) {
//		return $administStatsMain.util.addComma(that.point.dataObj.DTVAL_CO_ORI) + " 가구";
		return false;
	};
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.y.toFixed(1)) + " %";
	};
	opt.exportingDataLabelsFormatter = function(that) {
		let returnStr = opt.dataLabelsFormatter(that);
		if (opt.tooltipFormatter(that)) {
			returnStr += "<br />(" + opt.tooltipFormatter(that) + ")";
		}
		return returnStr;
	};
	opt.eventClick = function(e, that) {
		const selRegnParam = $.extend(true, _.cloneDeep(param), {
			ov_l1_list : $administStatsMain.consts.sidoAll,
			ov_l2_list : e.point.dataObj.OV_L2_ID,
			regn_dataKey : "OV_L2_ID",
			regn_title : param.opt_chartNm + "(" + e.point.name + ")",
			regn_color : e.point.color,
			regn_unit : "%"
		});
		const selTmsrParam = $.extend(true, _.cloneDeep(param), {
			surv_year_list : $administStatsMain.ui.dftYears.join(","),
			ov_l1_list : e.point.dataObj.OV_L1_ID,
			tmsr_chartId : "tmsrChart",
			tmsr_title : param.opt_chartNm,
			tmsr_dataKey : "OV_L2_ID",
			tmsr_nameKey : "OV_L2_KOR",
			tmsr_colors : [],
			tmsr_unit : "%"
		});
		$administStatsMain.ui.chartItmClick({
			event : e,
			selRegnParam : selRegnParam,
			selTmsrParam : selTmsrParam
		});
	};
	AdministStatsChart.ui.makeChart(opt);
}