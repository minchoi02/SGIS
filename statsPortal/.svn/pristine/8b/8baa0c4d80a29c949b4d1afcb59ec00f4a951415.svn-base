/**
 * 행정통계시각화 대쉬보드 > 중∙장년층
 */
(function(W, D) {
	W.$middlDash = W.$middlDash || {};

	$(document).ready(function() {
	});

	$(window).scroll(function() {
	});

	$(window).resize(function() {
	});

	$middlDash.consts = {};

	$middlDash.ui = {

		/**
		 * @name init
		 * @description 최초 화면을 초기화(각 화면을 로딩)
		 */
		init : function() {
			$administStatsMain.ui.chartSaveClear();
			$administStatsMain.ui.removeContent();
			$administStatsMain.ui.appendContent("/view/administStats/middlDash/main");
		},

		/**
		 * @name ready
		 * @description 최초 화면을 초기화(각 화면을 로딩)
		 */
		ready : function() {
			
			$administStatsMain.ui.selectedYear = "2020";
			
			if ($administStatsMain.ui.selectedArea == "" || $administStatsMain.ui.selectedArea == "00" || $administStatsMain.ui.selectedArea == "99") {
				$administStatsMain.ui.selectedArea = "00";
				$administStatsMain.ui.selectedLevel = "0";
			}

			/* 기본 차트 파라미터 setting */
			$administStatsMain.ui.dftRegnParam = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["13"]), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				ov_l1_list : $administStatsMain.consts.sidoAll,
				regn_dataKey : $administStatsMain.ui.apiParam["13"].opt_dispDataKey,
				regn_title : $administStatsMain.ui.apiParam["13"].opt_chartNmByArea,
				regn_color : "#BCBCBC"
			});
			$administStatsMain.ui.selRegnParam = $administStatsMain.ui.dftRegnParam;

			/* 시계열 차트 파라미터 초기화 */
			$administStatsMain.ui.dftTmsrParam = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["14"]), {
				surv_year_list : $administStatsMain.ui.dftYears.join(","),
				ov_l1_list : $administStatsMain.ui.selectedArea,
				tmsr_chartId : "tmsrChart",
				tmsr_title : $administStatsMain.ui.apiParam["14"].opt_chartNmByYear,
				tmsr_dataKey : $administStatsMain.ui.apiParam["14"].opt_dispDataKey,
				tmsr_nameKey : $administStatsMain.ui.apiParam["14"].opt_dispNameKey,
				tmsr_colors : [ "#BCBCBC", "#6076BA", "#F6A347" ],
				tmsr_unit : "명"
			});
			$administStatsMain.ui.selTmsrParam = $administStatsMain.ui.dftTmsrParam;

			setTimeout(function() {
				$middlDash.event.allChange($administStatsMain.ui.selectedArea, "1");
			}, 50);
		}
	};

	$middlDash.util = {};

	$middlDash.event = {

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
				opt_chartId : "middlChart1"
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
				middlPieChart1(data, _.cloneDeep(param));
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["2"]), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				ov_l1_list : $administStatsMain.ui.selectedArea,
				opt_chartId : "middlChart2",
				opt_digits : 1,
				opt_colors : [ "#889CD5", "#6076BA", "#46599F", "#1E2B6B", "#121C59" ],
				opt_mapColor : "#3F0099"
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
				middlColumnOrBarChart(data, _.cloneDeep(param));
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["3"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				ov_l1_list : $administStatsMain.ui.selectedArea,
				opt_chartId : "middlChart3",
				opt_digits : 1,
				opt_color : "#6076BA",
				opt_mapColor : "#3F0099"
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
				middlPieChart2(data, _.cloneDeep(param));
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["4"]), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				ov_l1_list : $administStatsMain.ui.selectedArea,
				opt_chartId : "middlChart4",
				opt_digits : 1,
				opt_colors : [ "#889CD5", "#46599F", "#1E2B6B", "#121C59" ],
				opt_mapColor : "#3F0099"
			})
			$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
				middlColumnOrBarChart(data, _.cloneDeep(param));
			});

			/* 하드코딩 : TBL_ID 2개 이상 사용 */
			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["DT_1MA0026"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				ov_l1_list : $administStatsMain.ui.selectedArea,
				opt_chartId : "middlChart5",
				opt_digits : 1
			})
			$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
				middlChart5(data, _.cloneDeep(param));
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["6"]), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				ov_l1_list : $administStatsMain.ui.selectedArea,
				opt_chartId : "middlChart6",
				opt_digits : 1,
				opt_colors : [ "#ABF3D9", "#7ADBC1", "#52B8A5", "#248980", "#1A7575", "#125B62", "#0B424F", "#063141" ],
				opt_mapColor : "#0B610B"
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
				middlColumnOrBarChart(data, _.cloneDeep(param));
			});

			/* 하드코딩 : TBL_ID 2개 이상 사용 */
			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["DT_1MA0028"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				ov_l1_list : $administStatsMain.ui.selectedArea,
				opt_chartId : "middlChart7",
				opt_digits : 1
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
				middlChart7(data, _.cloneDeep(param));
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["8"]), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				ov_l1_list : $administStatsMain.ui.selectedArea,
				opt_chartId : "middlChart8",
				opt_digits : 1,
				opt_colors : [ "#ABF3D9", "#7ADBC1", "#52B8A5", "#248980", "#1A7575", "#125B62", "#0B424F", "#063141" ],
				opt_mapColor : "#0B610B"
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
				middlColumnOrBarChart(data, _.cloneDeep(param));
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["9"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				ov_l1_list : $administStatsMain.ui.selectedArea,
				ov_l2_list : "HT20",
				opt_chartId : "middlChart9",
				opt_digits : 1,
				opt_color : "#21BDBD",
				opt_mapColor : "#006F84"
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
				middlPieChart2(data, _.cloneDeep(param));
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["10"]), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				ov_l1_list : $administStatsMain.ui.selectedArea,
				ov_l2_list : "HT20",
				opt_chartId : "middlChart10",
				opt_digits : 1,
				opt_colors : [ "#52D7CB", "#21BDBD", "#1896A2", "#107388", "#063D5A" ],
				opt_mapColor : "#006F84"
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
				middlColumnOrBarChart(data, _.cloneDeep(param));
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["11"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				ov_l1_list : $administStatsMain.ui.selectedArea,
				opt_chartId : "middlChart11",
				opt_digits : 1,
				opt_color : "#21BDBD",
				opt_mapColor : "#006F84"
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
				middlPieChart2(data, _.cloneDeep(param));
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["12"]), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				ov_l1_list : $administStatsMain.ui.selectedArea,
				opt_chartId : "middlChart12",
				opt_digits : 1
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data, param) {
				middlChart12(data, _.cloneDeep(param));
			});

			AdministStatsChart.ui.makeRegnChart(mode);
			AdministStatsChart.ui.makeTmsrChart($administStatsMain.ui.selTmsrParam);

			setTimeout(function() {
				$administStatsMain.ui.loading(false);
			}, 2000);
		}
	};

}(window, document));

/**
 * @name middlChart1
 * @description 중∙장년층 차트1
 */
function middlPieChart1(data, param) {

	const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key : param.opt_dispDataKey
	});
	const colors = [ "#BCBCBC", "#6076BA", "#F6A347" ];
	const mapColors = [ "#0C0C0C", "#3F0099", "#CB5B1B" ];

	let series = [ {
		innerSize : "0%",
		data : [],
		dataLabels : {
			useHTML : true,
			distance : -62.5,
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
		data : []
	} ];

	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(dataKey) {
		const v = toJson[$administStatsMain.ui.selectedYear][dataKey];
		if (v.subsumYn == "Y") {
			series[0].data.push({
				name : v[param.opt_dispNameKey],
				y : v.DTVAL_CO,
				color : colors[series[0].data.length],
				dataObj : v,
				mapColor : mapColors[series[0].data.length]
			});
		} else {
			series[1].data.push({
				name : v[param.opt_dispNameKey],
				y : v.DTVAL_CO,
				color : colors[series[1].data.length + 1],
				dataObj : v,
				mapColor : mapColors[series[1].data.length + 1]
			});
		}
	});

	let exportingSeries = [];
	exportingSeries.push(_.cloneDeep(series[0]));
	exportingSeries.push(_.cloneDeep(series[1]));
	exportingSeries[0].dataLabels.distance = -160;

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.series = series;
	opt.exportingSeries = exportingSeries;
	opt.cursor = "pointer";
	opt.pie = {
		size : "80%",
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
		if (that.point.dataObj.ttipUseYn != "Y") {
			return false;
		}
		return $administStatsMain.util.setFixedByDigits({
			val : that.point.y,
			digits : param.opt_digits,
			unit : that.point.dataObj.dispUnitNm
		});
	};
	opt.dataLabelsFormatter = function(that) {
		if (that.point.dataObj.labelUseYn == "Y") {
			return $administStatsMain.util.setFixedByDigits({
				prefix : that.point.name + "<br />",
				val : that.point.percentage,
				digits : 1,
				unit : "%"
			});
		}
	};
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
				tmsr_colors : colors
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
	AdministStatsChart.ui.makeChart(opt);
}

/**
 * @name middlChart3
 * @description 중∙장년층 차트3
 */
function middlPieChart2(data, param) {

	param.opt_fnCalc = function(data) {
		let datas = [];
		for (let i = 0; i < data.length; i++) {
			let s = data[i];
			s.DTVAL_CO = s.DTVAL_CO * 1;
			for (let j = 0; j < data.length; j++) {
				let t = data[j];
				t.DTVAL_CO = t.DTVAL_CO * 1;
				if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
					if (s.subsumYn != "Y" && t.subsumYn == "Y") {
						s.DTVAL_CO = s.DTVAL_CO / t.DTVAL_CO * 100;
						datas.push(s);
					}
				}
			}
		}
		return datas;
	}

	const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key : param.opt_dispDataKey
	});

	let sum = {};
	let sum2 = {};
	let notSum = {};
	let notSum2 = {};
	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(dataKey) {
		const v = toJson[$administStatsMain.ui.selectedYear][dataKey];
		let v2 = {};
		if (!$administStatsMain.util.isEmpty(toJson[$administStatsMain.ui.selectedYear - 1])) {
			v2 = toJson[$administStatsMain.ui.selectedYear - 1][dataKey];
		}
		if (v.subsumYn == "Y") {
			sum = v;
			sum2 = v2;
		} else {
			notSum = v;
			notSum2 = v2;
		}
	});

	let iodText = "";
	const thisYearPer = notSum.DTVAL_CO / sum.DTVAL_CO * 100;
	if (!$administStatsMain.util.isEmpty(toJson[$administStatsMain.ui.selectedYear - 1])) {
		const lastYearPer = notSum2.DTVAL_CO / sum2.DTVAL_CO * 100;
		const iod = (thisYearPer - lastYearPer).toFixed(1);
		if (iod > 0) {
			iodText = "<span style='color: #E71909;'>(" + iod + "&nbsp;%p&nbsp;↑)</span>";
		} else if (iod < 0) {
			iodText = "<span style='color: #115BCB;'>(" + Math.abs(iod) + "&nbsp;%p&nbsp;↓)</span>";
		} else {
			iodText = "<span>(" + iod + "&nbsp;%p)</span>";
		}
	}

	let series = [ {
		innerSize : "0%",
		enableMouseTracking : false,
		data : [ {
			name : iodText,
			y : sum.DTVAL_CO,
			color : "#FFFFFF",
			dataObj : sum,
			mapColor : "#0C0C0C"
		} ],
		dataLabels : {
			useHTML : true,
			distance : -67,
			headerFormat : "",
			pointFormat : param.opt_chartNm.replace("/ /gi", "&nbsp;") + "<br /><span style='color: " + param.opt_color + "; font-size: 14px;'>" + thisYearPer.toFixed(1) + "&nbsp;%" + "</span><br />" + iodText,
			footerFormat : "",
			style : {
				textAlign : "center",
				color : "#000000"
			}
		}
	}, {
		innerSize : "80%",
		data : [ {
			name : notSum.OV_L4_KOR,
			y : notSum.DTVAL_CO,
			color : param.opt_color,
			dataObj : notSum,
			mapColor : param.opt_mapColor,
			dataLabels : {
				enabled : false
			}
		}, {
			name : "",
			y : sum.DTVAL_CO - notSum.DTVAL_CO,
			color : "#E5E5E5",
			dataObj : sum,
			dataLabels : {
				enabled : false
			}
		} ]
	} ];

	let exportingSeries = [];
	exportingSeries.push(_.cloneDeep(series[0]));
	exportingSeries.push(_.cloneDeep(series[1]));
	exportingSeries[0].dataLabels.distance = -170;

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.filename = $(".sb_year option:selected").text() + " " + $(".tag_sido:eq(0)").text() + " " + "중∙장년층 " + param.opt_chartNm;
	opt.series = series;
	opt.exportingSeries = exportingSeries;
	opt.pie = {
		size : "80%",
		center : [ "50%", "50%" ]
	};
	opt.events = {
		load: function() {
			$("#middlChart9").find("span").css("left","22px").css("margin-top","-10px");
		}	
	}
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
		if (that.point.dataObj.ttipUseYn != "Y") {
			return false;
		}
		return $administStatsMain.util.setFixedByDigits({
			val : that.point.y,
			unit : param.opt_kosisUnitNm
		});
	};
	opt.dataLabelsFormatter = function(that) {
		return false;
	};
	opt.exportingDataLabelsFormatter = function(that) {
		return opt.dataLabelsFormatter(that);
	};
	opt.eventClick = function(e, that) {
		if (e.point.dataObj.clickEventYn == "Y") {
			const selRegnParam = $.extend(true, _.cloneDeep(param), {
				ov_l1_list : $administStatsMain.consts.sidoAll,
				regn_dataKey : param.opt_dispDataKey,
				regn_title : "중·장년층 " + param.opt_chartNm,
				regn_color : e.point.color
			});
			const selTmsrParam = $.extend(true, _.cloneDeep(param), {
				surv_year_list : $administStatsMain.ui.dftYears.join(","),
				ov_l1_list : $administStatsMain.ui.selectedArea,
				tmsr_chartId : "tmsrChart",
				tmsr_title : "중·장년층 " + param.opt_chartNm,
				tmsr_dataKey : param.opt_dispDataKey,
				tmsr_nameKey : param.opt_dispNameKey,
				tmsr_colors : [ e.point.color ]
			});
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
				if (v2.dataObj.clickEventYn == "Y") {
					$(v2.graphic.element).css("cursor", "pointer");
				}
			});
		});
	};
	AdministStatsChart.ui.makeChart(opt);
}

/**
 * @name middlColumnOrBarChart
 * @description 중∙장년층 Column Or Bar 차트
 */
function middlColumnOrBarChart(data, param) {

	param.opt_fnCalc = function(data) {
		let datas = [];
		for (let i = 0; i < data.length; i++) {
			let s = data[i];
			s.DTVAL_CO = s.DTVAL_CO * 1;
			for (let j = 0; j < data.length; j++) {
				let t = data[j];
				t.DTVAL_CO = t.DTVAL_CO * 1;
				if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
					if (s.subsumYn != "Y" && t.subsumYn == "Y") {
						s.DTVAL_CO_ORI = s.DTVAL_CO;
						s.DTVAL_CO = (s.DTVAL_CO / t.DTVAL_CO * 100);
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
		key : param.opt_dispDataKey
	});

	let series = [ {
		data : []
	} ];
	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(dataKey) {
		const v = toJson[$administStatsMain.ui.selectedYear][dataKey];
		series[0].data.push({
			name : v[param.opt_dispNameKey],
			y : v.DTVAL_CO,
			color : param.opt_colors[series[0].data.length],
			dataObj : v,
			mapColor : param.opt_mapColor
		});
	});

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.filename = $(".sb_year option:selected").text() + " " + $(".tag_sido:eq(0)").text() + " " + "중∙장년층 " + param.opt_chartNm;
	opt.series = series;
	opt.xAxis = {
		type : "category"
	};
	opt.cursor = "pointer";
	opt.tooltipPositioner = true;
	opt.tooltipFormatter = function(that) {
		if (that.point.dataObj.ttipUseYn != "Y") {
			return false;
		}
		return $administStatsMain.util.setFixedByDigits({
			val : that.point.dataObj.DTVAL_CO_ORI,
			digits : (function() {
				if (param.opt_chartId == "middlChart6" || param.opt_chartId == "middlChart8") {
					return param.opt_digits;
				}
				return 0;
			}()),
			unit : param.opt_kosisUnitNm
		});
	};
	opt.dataLabelsFormatter = function(that) {
		if (that.point.dataObj.labelUseYn == "Y") {
			return $administStatsMain.util.setFixedByDigits({
				val : that.point.y,
				digits : param.opt_digits,
				unit : param.opt_dispUnitNm
			});
		}
	};
	opt.exportingDataLabelsFormatter = function(that) {
		let returnStr = opt.dataLabelsFormatter(that);
		if (opt.tooltipFormatter(that)) {
			returnStr += "<br />(" + opt.tooltipFormatter(that) + ")";
		}
		return returnStr;
	};
	opt.isBigExporting = true;
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
		}
	};
	AdministStatsChart.ui.makeChart(opt);
}

/* 하드코딩 : TBL_ID 2개 이상 사용 */
/**
 * @name middlChart5
 * @description 중∙장년층 차트5
 */
function middlChart5(data, param) {

	param.opt_fnCalc = function(data) {
		let datas = [];
		for (let i = 0; i < data.length; i++) {
			let s = data[i];
			s.DTVAL_CO = s.DTVAL_CO * 1;
			for (let j = 0; j < data.length; j++) {
				let t = data[j];
				t.DTVAL_CO = t.DTVAL_CO * 1;
				if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
					if (s.OV_L3_ID != "IL00" && t.OV_L3_ID == "IL00") {
						s.DTVAL_CO = s.DTVAL_CO / t.DTVAL_CO * 100;
						datas.push(s);
					}
				}
			}
		}
		return datas;
	}
	
	let areaCode = "";
	switch($administStatsMain.ui.selectedArea){
		case '00': areaCode = 'G10';      break;
		case '11': areaCode = 'SGG11';    break;
		case '21': areaCode = 'SGG21';    break;
		case '22': areaCode = 'SGG22';    break;
		case '23': areaCode = 'SGG23';    break;
		case '24': areaCode = 'SGG24';    break;
		case '25': areaCode = 'SGG25';    break;
		case '26': areaCode = 'SGG26';    break;
		case '29': areaCode = 'SGG29';    break;
		case '31': areaCode = 'SGG31';    break;
		case '32': areaCode = 'SGG32';    break;
		case '33': areaCode = 'SGG33';    break;
		case '34': areaCode = 'SGG34';    break;
		case '35': areaCode = 'SGG35';    break;
		case '36': areaCode = 'SGG36';    break;
		case '37': areaCode = 'SGG37';    break;
		case '38': areaCode = 'SGG38';    break;
		case '39': areaCode = 'SGG39';    break;
	};
	
	const param2 = $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
		surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
		tbl_id_list : "DT_1MA0030",
		char_itm_id_list : "T001",
		ov_l1_list : /*"G10"*/areaCode
	});
	$administStatsMain.util.getTotsurvStatData(param2, function(data2) {
		const toJson = $administStatsMain.util.arrayToJson({
			data : data,
			key : "OV_L3_ID"
		});
		const toJson2 = $administStatsMain.util.arrayToJson({
			data : data2,
			key : "OV_L1_ID"
		});

		let iodText = "";
		const thisYearPer = toJson[$administStatsMain.ui.selectedYear]["IL10"].DTVAL_CO / toJson[$administStatsMain.ui.selectedYear]["IL00"].DTVAL_CO * 100;
		if (!$administStatsMain.util.isEmpty(toJson[$administStatsMain.ui.selectedYear - 1])) {
			const lastYearPer = toJson[$administStatsMain.ui.selectedYear - 1]["IL10"].DTVAL_CO / toJson[$administStatsMain.ui.selectedYear - 1]["IL00"].DTVAL_CO * 100;
			const iod = (thisYearPer - lastYearPer).toFixed(1);
			if (iod > 0) {
				iodText = "<span style='color: #E71909;'>(" + iod + "&nbsp;%p&nbsp;↑)</span>";
			} else if (iod < 0) {
				iodText = "<span style='color: #115BCB;'>(" + Math.abs(iod) + "&nbsp;%p&nbsp;↓)</span>";
			} else {
				iodText = "<span>(" + iod + "&nbsp;%p)</span>";
			}
		}

		let series = [ {
			innerSize : "0%",
			enableMouseTracking : false,
			data : [ {
				name : iodText,
				y : toJson[$administStatsMain.ui.selectedYear]["IL00"].DTVAL_CO,
				color : "#FFFFFF",
				dataObj : toJson[$administStatsMain.ui.selectedYear]["IL00"],
				mapColor : "#0C0C0C"
			} ],
			dataLabels : {
				useHTML : true,
				distance : -67,
				headerFormat : "",
				pointFormat : param.opt_chartNm.replace("/ /gi", "&nbsp;") + "<br /><span style='color: #48BF9D; font-size: 14px;'>" + thisYearPer.toFixed(1) + "&nbsp;%</span>" + "<br />" + iodText,
				footerFormat : "",
				style : {
					textAlign : "center",
					color : "#000000"
				}
			}
		}, {
			innerSize : "80%",
			data : [ {
				name : toJson[$administStatsMain.ui.selectedYear]["IL10"].OV_L3_KOR,
				y : toJson[$administStatsMain.ui.selectedYear]["IL10"].DTVAL_CO,
				color : "#48BF9D",
				dataObj : toJson[$administStatsMain.ui.selectedYear]["IL10"],
				mapColor : "#0B610B",
				dataLabels : {
					enabled : false
				}
			}, {
				name : "",
				y : toJson[$administStatsMain.ui.selectedYear]["IL00"].DTVAL_CO - toJson[$administStatsMain.ui.selectedYear]["IL10"].DTVAL_CO,
				color : "#E5E5E5",
				dataObj : toJson[$administStatsMain.ui.selectedYear]["IL00"],
				dataLabels : {
					enabled : false
				}
			} ]
		} ];

		let rocText = "";
		const thisYearVal = toJson2[$administStatsMain.ui.selectedYear][/*"G10"*/areaCode].DTVAL_CO;
		if (!$administStatsMain.util.isEmpty(toJson2[$administStatsMain.ui.selectedYear - 1])) {
			const lastYearVal = toJson2[$administStatsMain.ui.selectedYear - 1][/*"G10"*/areaCode].DTVAL_CO;
			const roc = (((thisYearVal - lastYearVal) / lastYearVal) * 100).toFixed(1) * 1;
			if (roc > 0) {
				rocText = "<span style='color: #E71909;'>(" + roc + "&nbsp;%&nbsp;↑)</span>";
			} else if (roc < 0) {
				rocText = "<span style='color: #115BCB;'>(" + Math.abs(roc) + "&nbsp;%&nbsp;↓)</span>";
			} else {
				rocText = "<span>(" + roc + "&nbsp;%)</span>";
			}
		}

		let exportingSeries = [];
		exportingSeries.push(_.cloneDeep(series[0]));
		exportingSeries.push(_.cloneDeep(series[1]));
		exportingSeries[0].dataLabels.distance = -170;

		let opt = {};
		opt.chartId = param.opt_chartId;
		opt.chartType = param.opt_chartType;
		opt.title = param.opt_chartNm;
		opt.filename = $(".sb_year option:selected").text() + " " + $(".tag_sido:eq(0)").text() + " " + "중∙장년층 " + param.opt_chartNm;
		opt.series = series;
		opt.exportingSeries = exportingSeries;
		opt.marginTop = -10;
		opt.subtitle = {
			floating : true,
			text : "평균소득<br /><span style='color: #48BF9D;'>" + $administStatsMain.util.addComma(thisYearVal) + "&nbsp;만원</span>" + rocText,
			align : "center",
			verticalAlign : "bottom",
			y : 25,
			style : {
				textOutline : false,
				fontSize : "11px",
				fontWeight : "bold",
				color : "#000000"
			}
		};
		opt.pie = {
			size : "70%",
			center : [ "50%", "50%" ]
		};
		opt.exporting = {
			chartOptions : {
				plotOptions : {
					pie : {
						size : "80%"
					}
				}
			}
		};
		opt.tooltipFormatter = function(that) {
			if ($.inArray(that.point.dataObj.OV_L3_ID, [ "IL00" ]) > -1) {
				return false;
			}
			return $administStatsMain.util.setFixedByDigits({
				val : that.point.y,
				digits : 1,
				unit : "천명"
			});
		};
		opt.dataLabelsFormatter = function(that) {
			return false;
		};
		opt.exportingDataLabelsFormatter = function(that) {
			return opt.dataLabelsFormatter(that);
		};
		opt.eventClick = function(e, that) {
			if ($.inArray(e.point.dataObj.OV_L3_ID, [ "IL00" ]) > -1) {
				return false;
			}
			const selRegnParam = $.extend(true, _.cloneDeep(param), {
				ov_l1_list : $administStatsMain.consts.sidoAll,
				ov_l3_list : "IL00,IL10",
				regn_dataKey : "OV_L3_ID",
				regn_title : "중·장년층 " + param.opt_chartNm,
				regn_color : e.point.color,
				regn_unit : "%"
			});
			const selTmsrParam = $.extend(true, _.cloneDeep(param), {
				surv_year_list : $administStatsMain.ui.dftYears.join(","),
				ov_l1_list : $administStatsMain.ui.selectedArea,
				ov_l3_list : "IL00,IL10",
				tmsr_chartId : "tmsrChart",
				tmsr_title : "중·장년층 " + param.opt_chartNm,
				tmsr_dataKey : "OV_L3_ID",
				tmsr_nameKey : "OV_L3_KOR",
				tmsr_colors : [ e.point.color ],
				tmsr_unit : "%"
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
					if (v2.dataObj.OV_L3_ID == "IL10") {
						$(v2.graphic.element).css("cursor", "pointer");
					}
				});
			});
			$("#" + param.opt_chartId).find(".highcharts-subtitle").css("cursor", "pointer");
			if ($._data($("#" + param.opt_chartId).find(".highcharts-subtitle")[0], 'events') == null) {
				$(chart.renderTo).find(".highcharts-subtitle").on("click", function() {
					if ($administStatsMain.ui.apiParam.hasOwnProperty("DT_1MA0030")) {
						window.open($administStatsMain.ui.apiParam["DT_1MA0030"].opt_stattbUrl, "_blank");
					} else {
						window.open("https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=" + "DT_1MA0030" + "&conn_path=I2", "_blank");
						// commonAdministStats_alert("통계표가 연결되어 있지 않습니다.",
						// function okFn(opt) {
						// $("#commonAdministStats_popup_confirm_close").click();
						// });
					}
				});
			}
		};
		AdministStatsChart.ui.makeChart(opt);
	});
}

/* 하드코딩 : TBL_ID 2개 이상 사용 */
/**
 * @name middlChart7
 * @description 중∙장년층 차트7
 */
function middlChart7(data, param) {

	param.opt_fnCalc = function(data) {
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
		return datas;
	}
	
	let areaCode = "";
	switch($administStatsMain.ui.selectedArea){
		case '00': areaCode = 'G10';      break;
		case '11': areaCode = 'SGG11';    break;
		case '21': areaCode = 'SGG21';    break;
		case '22': areaCode = 'SGG22';    break;
		case '23': areaCode = 'SGG23';    break;
		case '24': areaCode = 'SGG24';    break;
		case '25': areaCode = 'SGG25';    break;
		case '26': areaCode = 'SGG26';    break;
		case '29': areaCode = 'SGG29';    break;
		case '31': areaCode = 'SGG31';    break;
		case '32': areaCode = 'SGG32';    break;
		case '33': areaCode = 'SGG33';    break;
		case '34': areaCode = 'SGG34';    break;
		case '35': areaCode = 'SGG35';    break;
		case '36': areaCode = 'SGG36';    break;
		case '37': areaCode = 'SGG37';    break;
		case '38': areaCode = 'SGG38';    break;
		case '39': areaCode = 'SGG39';    break;
	};

	const param2 = $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
		surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
		tbl_id_list : "DT_1MA0021",
		char_itm_id_list : "T001",
		ov_l1_list : /*"G10"*/areaCode
	});
	$administStatsMain.util.getTotsurvStatData(param2, function(data2) {
		const toJson = $administStatsMain.util.arrayToJson({
			data : data,
			key : "OV_L3_ID"
		});
		const toJson2 = $administStatsMain.util.arrayToJson({
			data : data2,
			key : "OV_L1_ID"
		});

		let iodText = "";
		const thisYearPer = toJson[$administStatsMain.ui.selectedYear]["DL10"].DTVAL_CO / toJson[$administStatsMain.ui.selectedYear]["DL00"].DTVAL_CO * 100;
		if (!$administStatsMain.util.isEmpty(toJson[$administStatsMain.ui.selectedYear - 1])) {
			const lastYearPer = toJson[$administStatsMain.ui.selectedYear - 1]["DL10"].DTVAL_CO / toJson[$administStatsMain.ui.selectedYear - 1]["DL00"].DTVAL_CO * 100;
			const iod = (thisYearPer - lastYearPer).toFixed(1);
			if (iod > 0) {
				iodText = "<span style='color: #E71909;'>(" + iod + "&nbsp;%p&nbsp;↑)</span>";
			} else if (iod < 0) {
				iodText = "<span style='color: #115BCB;'>(" + Math.abs(iod) + "&nbsp;%p&nbsp;↓)</span>";
			} else {
				iodText = "<span>(" + iod + "&nbsp;%p)</span>";
			}
		}

		let series = [ {
			innerSize : "0%",
			enableMouseTracking : false,
			data : [ {
				name : iodText,
				y : toJson[$administStatsMain.ui.selectedYear]["DL00"].DTVAL_CO,
				color : "#FFFFFF",
				dataObj : toJson[$administStatsMain.ui.selectedYear]["DL00"],
				mapColor : "#0C0C0C"
			} ],
			dataLabels : {
				useHTML : true,
				distance : -67,
				headerFormat : "",
				pointFormat : param.opt_chartNm.replace("/ /gi", "&nbsp;") + "<br /><span style='color: #48BF9D; font-size: 14px;'>" + thisYearPer.toFixed(1) + "&nbsp;%</span>" + "<br />" + iodText,
				footerFormat : "",
				style : {
					textAlign : "center",
					color : "#000000"
				}
			}
		}, {
			innerSize : "80%",
			data : [ {
				name : toJson[$administStatsMain.ui.selectedYear]["DL10"].OV_L3_KOR,
				y : toJson[$administStatsMain.ui.selectedYear]["DL10"].DTVAL_CO,
				color : "#48BF9D",
				dataObj : toJson[$administStatsMain.ui.selectedYear]["DL10"],
				mapColor : "#0B610B",
				dataLabels : {
					enabled : false
				}
			}, {
				name : "",
				y : toJson[$administStatsMain.ui.selectedYear]["DL00"].DTVAL_CO - toJson[$administStatsMain.ui.selectedYear]["DL10"].DTVAL_CO,
				color : "#E5E5E5",
				dataObj : toJson[$administStatsMain.ui.selectedYear]["DL00"],
				dataLabels : {
					enabled : false
				}
			} ]
		} ];

		let rocText = "";
		const thisYearVal = toJson2[$administStatsMain.ui.selectedYear][/*"G10"*/areaCode].DTVAL_CO;
		if (!$administStatsMain.util.isEmpty(toJson2[$administStatsMain.ui.selectedYear - 1])) {
			const lastYearVal = toJson2[$administStatsMain.ui.selectedYear - 1][/*"G10"*/areaCode].DTVAL_CO;
			const roc = (((thisYearVal - lastYearVal) / lastYearVal) * 100).toFixed(1) * 1;
			if (roc > 0) {
				rocText = "<span style='color: #E71909;'>(" + roc + "&nbsp;%&nbsp;↑)</span>";
			} else if (roc < 0) {
				rocText = "<span style='color: #115BCB;'>(" + Math.abs(roc) + "&nbsp;%&nbsp;↓)</span>";
			} else {
				rocText = "<span>(" + roc + "&nbsp;%)</span>";
			}
		}

		let exportingSeries = [];
		exportingSeries.push(_.cloneDeep(series[0]));
		exportingSeries.push(_.cloneDeep(series[1]));
		exportingSeries[0].dataLabels.distance = -170;

		let opt = {};
		opt.chartId = param.opt_chartId;
		opt.chartType = param.opt_chartType;
		opt.title = param.opt_chartNm;
		opt.filename = $(".sb_year option:selected").text() + " " + $(".tag_sido:eq(0)").text() + " " + "중∙장년층 " + param.opt_chartNm;
		opt.series = series;
		opt.exportingSeries = exportingSeries;
		opt.marginTop = -10;
		opt.subtitle = {
			floating : true,
			text : "대출잔액 중앙값<br /><span style='color: #48BF9D;'>" + $administStatsMain.util.addComma(thisYearVal) + "&nbsp;만원</span>" + rocText,
			align : "center",
			verticalAlign : "bottom",
			y : 25,
			style : {
				textOutline : false,
				fontSize : "11px",
				fontWeight : "bold",
				color : "#000000"
			}
		};
		opt.pie = {
			size : "70%",
			center : [ "50%", "50%" ]
		};
		opt.exporting = {
			chartOptions : {
				plotOptions : {
					pie : {
						size : "80%"
					}
				}
			}
		};
		opt.tooltipFormatter = function(that) {
			if ($.inArray(that.point.dataObj.OV_L3_ID, [ "DL00" ]) > -1) {
				return false;
			}
			return $administStatsMain.util.setFixedByDigits({
				val : that.point.y,
				digits : 1,
				unit : "천명"
			});
		};
		opt.dataLabelsFormatter = function(that) {
			return false;
		};
		opt.exportingDataLabelsFormatter = function(that) {
			return opt.dataLabelsFormatter(that);
		};
		opt.eventClick = function(e, that) {
			if ($.inArray(e.point.dataObj.OV_L3_ID, [ "DL00" ]) > -1) {
				return false;
			}
			const selRegnParam = $.extend(true, _.cloneDeep(param), {
				ov_l1_list : $administStatsMain.consts.sidoAll,
				ov_l3_list : "DL00,DL10",
				regn_dataKey : "OV_L3_ID",
				regn_title : "중·장년층 " + param.opt_chartNm,
				regn_color : e.point.color,
				regn_unit : "%"

			});
			const selTmsrParam = $.extend(true, _.cloneDeep(param), {
				surv_year_list : $administStatsMain.ui.dftYears.join(","),
				ov_l1_list : $administStatsMain.ui.selectedArea,
				ov_l3_list : "DL00,DL10",
				tmsr_chartId : "tmsrChart",
				tmsr_title : "중·장년층 " + param.opt_chartNm,
				tmsr_dataKey : "OV_L3_ID",
				tmsr_nameKey : "OV_L3_KOR",
				tmsr_colors : [ e.point.color ],
				tmsr_unit : "%"
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
					if (v2.dataObj.OV_L3_ID == "DL10") {
						$(v2.graphic.element).css("cursor", "pointer");
					}
				});
			});
			$("#" + param.opt_chartId).find(".highcharts-subtitle").css("cursor", "pointer");
			if ($._data($("#" + param.opt_chartId).find(".highcharts-subtitle")[0], 'events') == null) {
				$(chart.renderTo).find(".highcharts-subtitle").on("click", function() {
					if ($administStatsMain.ui.apiParam.hasOwnProperty("DT_1MA0021")) {
						window.open($administStatsMain.ui.apiParam["DT_1MA0021"].opt_stattbUrl, "_blank");
					} else {
						window.open("https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=" + "DT_1MA0021" + "&conn_path=I2", "_blank");
						// commonAdministStats_alert("통계표가 연결되어 있지 않습니다.",
						// function okFn(opt) {
						// $("#commonAdministStats_popup_confirm_close").click();
						// });
					}
				});
			}
		};
		AdministStatsChart.ui.makeChart(opt);
	});
}

/* 하드코딩 : 항목끼리 계산 */
/**
 * @name middlChart12
 * @description 중∙장년층 차트12
 */
function middlChart12(data, param) {

	param.opt_fnCalc = function(data) {
		let datas = [];
		for (let i = 0; i < data.length; i++) {
			let s = data[i];
			s.DTVAL_CO = s.DTVAL_CO * 1;
			for (let j = 0; j < data.length; j++) {
				let t = data[j];
				t.DTVAL_CO = t.DTVAL_CO * 1;
				if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
					if (s.OV_L2_ID == t.OV_L2_ID && s.OV_L3_ID != "P10" && t.OV_L3_ID == "P10") {
						s.DTVAL_CO = s.DTVAL_CO / t.DTVAL_CO * 100;
						datas.push(s);
					}
				}
			}
		}
		return datas;
	}

	const colors = [ "#52D7CB", "#21BDBD", "#1896A2", "#107388", "#063D5A" ];

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

	const toJson = $administStatsMain.util.arrayToJson({
		data : datas,
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
			color : colors[series[0].data.length],
			dataObj : v,
			mapColor : "#006F84"
		});
	});

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.filename = $(".sb_year option:selected").text() + " " + $(".tag_sido:eq(0)").text() + " " + "중∙장년층 " + param.opt_chartNm;
	opt.series = series;
	opt.dataLabelsInside = false;
	opt.xAxis = {
		type : "category"
	};
	opt.cursor = "pointer";
	opt.tooltipPositioner = true;
	opt.tooltipFormatter = function(that) {
		return $administStatsMain.util.setFixedByDigits({
			val : that.point.dataObj.DTVAL_CO_ORI,
			unit : "명"
		});
	};
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.setFixedByDigits({
			val : that.point.y,
			digits : 1,
			unit : "%"
		});
	};
	opt.exportingDataLabelsFormatter = function(that) {
		return opt.dataLabelsFormatter(that) + (!opt.tooltipFormatter(that) ? "" : "<br />(" + opt.tooltipFormatter(that) + ")");
	};
	opt.eventClick = function(e, that) {
		const selRegnParam = $.extend(true, _.cloneDeep(param), {
			ov_l1_list : $administStatsMain.consts.sidoAll,
			ov_l2_list : e.point.dataObj.OV_L2_ID,
			regn_dataKey : "OV_L2_ID",
			regn_title : "중∙장년층 " + param.opt_chartNm + "(" + e.point.name + ")",
			regn_color : e.point.color,
			regn_unit : "%"
		});
		const selTmsrParam = $.extend(true, _.cloneDeep(param), {
			surv_year_list : $administStatsMain.ui.dftYears.join(","),
			tmsr_chartId : "tmsrChart",
			tmsr_title : "중∙장년층 " + param.opt_chartNm,
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