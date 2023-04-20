/**
 * 행정통계시각화 대쉬보드 > 귀농·귀어·귀촌
 */
(function(W, D) {
	W.$retunDash = W.$retunDash || {};

	$(document).ready(function() {
	});

	$(window).scroll(function() {
	});

	$(window).resize(function() {
	});

	$retunDash.consts = {};

	$retunDash.ui = {

		/**
		 * @name init
		 * @description 최초 화면을 초기화(각 화면을 로딩)
		 */
		init : function() {
			$administStatsMain.ui.chartSaveClear();
			$administStatsMain.ui.removeContent();
			$administStatsMain.ui.appendContent("/view/administStats/retunDash/main");
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

			/* 지도 & 지역별 차트 파라미터 초기화 */
			$administStatsMain.ui.dftRegnParam = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["9"]), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				ov_l1_list : $administStatsMain.consts.sidoAll,
				regn_dataKey : $administStatsMain.ui.apiParam["9"].opt_dispDataKey,
				regn_title : $administStatsMain.ui.apiParam["9"].opt_chartNmByArea,
				regn_color : "#BCBCBC"
			});
			$administStatsMain.ui.selRegnParam = $administStatsMain.ui.dftRegnParam;

			/* 시계열 차트 파라미터 초기화 */
			$administStatsMain.ui.dftTmsrParam = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["10"]), {
				surv_year_list : $administStatsMain.ui.dftYears.join(","),
				ov_l1_list : $administStatsMain.ui.selectedArea,
				tmsr_chartId : "tmsrChart",
				tmsr_title : $administStatsMain.ui.apiParam["10"].opt_chartNmByYear,
				tmsr_dataKey : $administStatsMain.ui.apiParam["10"].opt_dispDataKey,
				tmsr_nameKey : $administStatsMain.ui.apiParam["10"].opt_dispNameKey,
				tmsr_colors : [ "#BCBCBC", "#6B87C7", "#5CB8EA", "#46BA95", "#90C320" ]
			});
			$administStatsMain.ui.selTmsrParam = $administStatsMain.ui.dftTmsrParam;

			setTimeout(function() {
				$retunDash.event.allChange($administStatsMain.ui.selectedArea, "1");
			}, 50);
		}

	};

	$retunDash.util = {};

	$retunDash.event = {

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
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				ov_l1_list : $administStatsMain.ui.selectedArea,
				opt_chartId : "retunChart1"
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				retunSemiCircleChart(data, _.cloneDeep(param));
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["2"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				ov_l1_list : $administStatsMain.ui.selectedArea,
				opt_chartId : "retunChart2"
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				retunSemiCircleChart(data, _.cloneDeep(param));
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["3"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				ov_l1_list : $administStatsMain.ui.selectedArea,
				opt_chartId : "retunChart3"
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				retunSemiCircleChart(data, _.cloneDeep(param));
			});

			/* 하드코딩 : TBL_ID 2개 이상 사용 */
			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				tbl_id_list : "DT_1A02002,DT_1A02023,DT_1A02015",
				char_itm_id_list : "T01,T02",
				ov_l1_list : $administStatsMain.ui.selectedArea,
				ov_l2_list : "0,1,2",
				opt_chartId : "retunChart4",
				opt_chartType : "bar",
				opt_chartNm : "성별 비중",
				opt_tblIds : [ "DT_1A02002", "DT_1A02023", "DT_1A02015" ],
				opt_digits : 1
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				retunChart4(data, _.cloneDeep(param));
			});

			/* 하드코딩 : TBL_ID 2개 이상 사용 */
			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				tbl_id_list : "DT_1A02003,DT_1A02024,DT_1A02016",
				char_itm_id_list : "T01,T02",
				ov_l1_list : $administStatsMain.ui.selectedArea,
				ov_l2_list : "00,01,02,03,04,05,06",
				opt_chartId : "retunChart5",
				opt_chartType : "bar",
				opt_chartNm : "연령별 비중",
				opt_tblIds : [ "DT_1A02003", "DT_1A02024", "DT_1A02016" ],
				opt_digits : 1
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				retunChart5(data, _.cloneDeep(param));
			});

			/* TODO 행정통계시각화 관리자화면 완료 시 DB 데이터 등록 후 소스 수정해야함 */
			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				tbl_id_list : "DT_1A02002",
				char_itm_id_list : "T01,T02,T03",
				ov_l1_list : $administStatsMain.ui.selectedArea,
				ov_l2_list : "0",
				opt_chartId : "retunChart6",
				opt_chartType : "column",
				opt_chartNm : "귀농 현황",
				opt_tblIds : [ "DT_1A02002" ]
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				retunChart6(data, _.cloneDeep(param));
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["7"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				ov_l1_list : $administStatsMain.ui.selectedArea,
				opt_chartId : "retunChart7"
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				retunColumnOrBarChart(data, _.cloneDeep(param));
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["8"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				ov_l1_list : $administStatsMain.ui.selectedArea,
				opt_chartId : "retunChart8"
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				retunColumnOrBarChart(data, _.cloneDeep(param));
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
 * @name retunSemiCircle
 * @description 귀농·귀어·귀촌 반원 차트
 */
function retunSemiCircleChart(data, param) {

	const toJson = $administStatsMain.util.setVariance($administStatsMain.util.arrayToJson({
		data : data,
		key : "OV_L2_ID"
	}));
	const colors = [ "#6B87C7", "#5CB8EA", "#46BA95", "#90C320" ];

	let series = [ {
		size : "75%",
		innerSize : "0%",
		data : [ {
			name : toJson[$administStatsMain.ui.selectedYear]["00"].OV_L2_KOR,
			y : toJson[$administStatsMain.ui.selectedYear]["00"].DTVAL_CO,
			color : "#BCBCBC",
			dataObj : toJson[$administStatsMain.ui.selectedYear]["00"],
			mapColor : "#0C0C0C"
		} ],
		dataLabels : {
			useHTML : true,
			distance : -25,
			headerFormat : "",
			pointFormat : "{point.name}<br />{point.y:,0f}&nbsp;" + toJson[$administStatsMain.ui.selectedYear]["00"].dispUnitNm,
			footerFormat : "",
			style : {
				textAlign : "center",
				color : "#000000"
			}
		}
	}, {
		innerSize : "50%",
		data : []
	} ];

	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(OV_L2_ID, idx) {
		const v = toJson[$administStatsMain.ui.selectedYear][OV_L2_ID];
		if (OV_L2_ID != "00") {
			series[1].data.push({
				name : v.OV_L2_KOR,
				y : v.DTVAL_CO / toJson[$administStatsMain.ui.selectedYear]["00"].DTVAL_CO * 100,
				dataObj : v,
				mapColor : "#CB5B1B"
			});
		}
	});
	
	let chkVal = 0;
	
	for(let itm=0; itm<series[1].data.length; itm++){
		chkVal += series[1].data[itm].DTVAL_CO;
	}
	
	/*
	if(series[0].data[0].y != chkVal){
		series[1].data.push({
			name : '비밀보호 또는 0',
			y : (series[0].data[0].y - chkVal) / series[0].data[0].y * 100,
			color : "#8C8C8C",
			x : series[0].data[0].y - chkVal
		});
		
	}
	*/
	
	let exportingSeries = [];
	exportingSeries.push(_.cloneDeep(series[0]));
	exportingSeries.push(_.cloneDeep(series[1]));
	exportingSeries[0].dataLabels.distance = -80;

	let opt = {};
	opt.callback = function(){
		if(chkVal == 0){
			$("#retunChart2").find('span').css('margin-left','30px').css('margin-top','-30px');
		}
	};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.series = series;
	opt.cursor = "pointer";
	opt.exportingSeries = exportingSeries;
	opt.distance = -30;
	opt.colors = colors;
	opt.pie = {
		size : "150%",
		startAngle : -90,
		endAngle : 90,
		center : [ "50%", "100%" ]
	};
	opt.exporting = {
		chartOptions : {
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
		if(that.point.dataObj == undefined){
			let chkVal = 0;
			for(let itm in series[1].data){
				if(itm.x != undefined){
					chkVal += itm.x;
				}
			}
			//return $administStatsMain.util.addComma(chkVal + "&nbsp" + "가구");
			return "-";
		}else{
			if (that.point.dataObj.OV_L2_ID == "00") {
				return $administStatsMain.util.getVarianceText({
					prefix : "전년대비<br />",
					val : that.point.dataObj.iod,
					unit : that.point.dataObj.dispUnitNm,
					postfixs : [ "증가 ↑", "감소 ↓" ]
				});
			} else {
				return $administStatsMain.util.addComma(that.point.dataObj.DTVAL_CO) + "&nbsp" + that.point.dataObj.dispUnitNm;
			}
		}
	};
	opt.dataLabelsFormatter = function(that) {
		if(that.point.y == 0){
			return "";
		}else{
			return $administStatsMain.util.addComma(that.point.y.toFixed(1)) + " %";
		}
	};
	opt.eventClick = function(e, that) {
		const selRegnParam = $.extend(true, _.cloneDeep(param), {
			ov_l1_list : $administStatsMain.consts.sidoAll,
			ov_l2_list : e.point.dataObj.OV_L2_ID,
			regn_dataKey : "OV_L2_ID",
			regn_title : (function() {
				switch (e.point.dataObj.OV_L2_ID) {
					case "00":
						return param.opt_chartNm.replace("가구원수별 ", "");
						break;
					default:
						return param.opt_chartNm + "(" + e.point.dataObj.OV_L2_KOR + ")";
						break;
				}
			}()),
			regn_color : e.point.color
		});
		const selTmsrParam = $.extend(true, _.cloneDeep(param), {
			surv_year_list : $administStatsMain.ui.dftYears.join(","),
			tmsr_chartId : "tmsrChart",
			tmsr_title : param.opt_chartNm,
			tmsr_dataKey : "OV_L2_ID",
			tmsr_nameKey : "OV_L2_KOR",
			tmsr_colors : [ "#BCBCBC", "#6B87C7", "#5CB8EA", "#46BA95", "#90C320" ]
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
 * @name retunChart4
 * @description 귀농·귀어·귀촌 차트4
 */
function retunChart4(data, param) {

	param.opt_fnCalc = function(data) {
		let datas = [];
		for (let i = 0; i < data.length; i++) {
			let s = data[i];
			s.DTVAL_CO = s.DTVAL_CO * 1;
			for (let j = 0; j < data.length; j++) {
				let t = data[j];
				t.DTVAL_CO = t.DTVAL_CO * 1;
				if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
					if (s.OV_L2_ID != "0" && t.OV_L2_ID == "0") {
						s.DTVAL_CO = s.DTVAL_CO / t.DTVAL_CO * 100;
						datas.push(s);
					}
				}
			}
		}
		return datas;
	}

	let datas1 = [];
	let datas2 = [];
	let datas3 = [];
	for (let i = 0; i < data.length; i++) {
		let s = data[i];
		s.DTVAL_CO = s.DTVAL_CO * 1;
		for (let j = 0; j < data.length; j++) {
			let t = data[j];
			t.DTVAL_CO = t.DTVAL_CO * 1;
			if (s.TBL_ID == t.TBL_ID && s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
				if (s.OV_L2_ID != "0" && t.OV_L2_ID == "0") {
					s.dispUnitNm = "명";
					switch (s.TBL_ID) {
						case "DT_1A02002":
							if (s.CHAR_ITM_ID == "T02") {
								datas1.push(s);
							}
							break;
						case "DT_1A02023":
							if (s.CHAR_ITM_ID == "T02") {
								datas2.push(s);
							}
							break;
						case "DT_1A02015":
							if (s.CHAR_ITM_ID == "T01") {
								datas3.push(s);
							}
							break;
					}
				}
			}
		}
	}

	const toJson1 = $administStatsMain.util.arrayToJson({
		data : datas1,
		key : "OV_L2_ID",
	});
	const toJson2 = $administStatsMain.util.arrayToJson({
		data : datas2,
		key : "OV_L2_ID",
	});
	const toJson3 = $administStatsMain.util.arrayToJson({
		data : datas3,
		key : "OV_L2_ID",
	});
	const colors = [ "#006FBD", "#FC2862" ];
	let categories = [];
	categories.push(toJson1[$administStatsMain.ui.selectedYear][Object.keys(toJson1[$administStatsMain.ui.selectedYear])[0]].CHAR_ITM_NM.replace("수", ""));
	categories.push(toJson2[$administStatsMain.ui.selectedYear][Object.keys(toJson2[$administStatsMain.ui.selectedYear])[0]].CHAR_ITM_NM.replace("수", ""));
	categories.push(toJson3[$administStatsMain.ui.selectedYear][Object.keys(toJson3[$administStatsMain.ui.selectedYear])[0]].CHAR_ITM_NM.replace("수", ""));
	let series = [];

	Object.keys(toJson1[$administStatsMain.ui.selectedYear]).sort().forEach(function(OV_L2_ID) {
		const v = toJson1[$administStatsMain.ui.selectedYear][OV_L2_ID];
		series.push({
			name : v.OV_L2_KOR,
			data : (function(OV_L2_ID) {
				let dataArr = [ {
					y : toJson1[$administStatsMain.ui.selectedYear][OV_L2_ID].DTVAL_CO,
					dataObj : toJson1[$administStatsMain.ui.selectedYear][OV_L2_ID],
					mapColor : colors[series.length]
				}, {
					y : toJson2[$administStatsMain.ui.selectedYear][OV_L2_ID].DTVAL_CO,
					dataObj : toJson2[$administStatsMain.ui.selectedYear][OV_L2_ID],
					mapColor : colors[series.length]
				}, {
					y : toJson3[$administStatsMain.ui.selectedYear][OV_L2_ID].DTVAL_CO,
					dataObj : toJson3[$administStatsMain.ui.selectedYear][OV_L2_ID],
					mapColor : colors[series.length]
				} ];
				return dataArr;
			})(OV_L2_ID)
		});
	});

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.series = series.slice().reverse();
	opt.xAxis = {
		categories : categories
	};
	opt.legend = {
		margin : -3
	};
	opt.cursor = "pointer";
	opt.seriesShowInLegend = true;
	opt.colors = [ "#6ECEEB", "#F38591" ].reverse();
	opt.stacking = "percent";
	opt.tooltipFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.y) + " " + that.point.dataObj.dispUnitNm;
	};
	opt.dataLabelsTextOutline = true;
	opt.dataLabelsInside = true;
	opt.dataLabelsFormatter = function(that) {
		return that.point.percentage.toFixed(1) + " %";
	};
	opt.exportingDataLabelsFormatter = function(that) {
		return opt.dataLabelsFormatter(that) + "<br />(" + opt.tooltipFormatter(that) + ")";
	};
	opt.eventClick = function(e, that) {
		const selRegnParam = $.extend(true, _.cloneDeep(param), {
			tbl_id_list : e.point.dataObj.TBL_ID,
			char_itm_id_list : e.point.dataObj.CHAR_ITM_ID,
			ov_l1_list : $administStatsMain.consts.sidoAll,
			ov_l2_list : "0," + e.point.dataObj.OV_L2_ID,
			regn_dataKey : "OV_L2_ID",
			regn_title : e.point.category + " " + param.opt_chartNm + "(" + e.point.dataObj.OV_L2_KOR + ")",
			regn_color : e.point.color,
			regn_unit : "%"

		});
		const selTmsrParam = $.extend(true, _.cloneDeep(param), {
			surv_year_list : $administStatsMain.ui.dftYears.join(","),
			tbl_id_list : e.point.dataObj.TBL_ID,
			char_itm_id_list : e.point.dataObj.CHAR_ITM_ID,
			ov_l1_list : e.point.dataObj.OV_L1_ID,
			tmsr_chartId : "tmsrChart",
			tmsr_title : e.point.category + " " + param.opt_chartNm,
			tmsr_dataKey : "OV_L2_ID",
			tmsr_nameKey : "OV_L2_KOR",
			tmsr_colors : [ "#6ECEEB", "#F38591" ],
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
 * @name retunChart5
 * @description 귀농·귀어·귀촌 차트5
 */
function retunChart5(data, param) {
	let arrs = [];
	for(let i=0; i<data.length; i++){
		if(data[i].PRD_DE == $administStatsMain.ui.selectedYear 
		   && data[i].OV_L2_ID == '00'){
			arrs.push(data[i]);
		}
	}
	
	param.opt_fnCalc = function(data) {

		for (let i = 0; i < data.length; i++) {
			let s = data[i];
			s.DTVAL_CO = s.DTVAL_CO * 1;
			for (let j = 0; j < data.length; j++) {
				let t = _.cloneDeep(data[j]);
				t.DTVAL_CO = t.DTVAL_CO * 1;
				if (s.TBL_ID == t.TBL_ID && s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.CHAR_ITM_ID == t.CHAR_ITM_ID) {
					if (s.TBL_ID == "DT_1A02016" && s.OV_L2_ID == "01" && t.OV_L2_ID == "02") {
						s.OV_L2_KOR = "30대이하";
						s.DTVAL_CO += t.DTVAL_CO;
					}
				}
			}
		}

		for (let i = 0; i < data.length; i++) {
			let s = data[i];
			s.DTVAL_CO = s.DTVAL_CO * 1;
			for (let j = 0; j < data.length; j++) {
				let t = _.cloneDeep(data[j]);
				t.DTVAL_CO = t.DTVAL_CO * 1;
				if (s.TBL_ID == t.TBL_ID && s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.CHAR_ITM_ID == t.CHAR_ITM_ID) {
					if (s.OV_L2_ID != "00" && t.OV_L2_ID == "00") {
						s.DTVAL_CO_ORI = s.DTVAL_CO;
						s.DTVAL_CO = s.DTVAL_CO / t.DTVAL_CO * 100;
					}
				}
			}
		}

		let datas = [];
		for (let i = 0; i < data.length; i++) {
			let s = _.cloneDeep(data[i]);
			s.DTVAL_CO = s.DTVAL_CO * 1;
			if (s.OV_L2_ID != "00") {
				switch (s.TBL_ID) {
					case "DT_1A02003":
						if (s.CHAR_ITM_ID == "T02") {
							datas.push(s);
						}
						break;
					case "DT_1A02024":
						if (s.CHAR_ITM_ID == "T02") {
							datas.push(s);
						}
						break;
					case "DT_1A02016":
						if (s.CHAR_ITM_ID == "T01") {
							if (s.OV_L2_ID != "02") {
								switch (s.OV_L2_ID) {
									case "03":
										s.OV_L2_ID = "02";
										break;
									case "04":
										s.OV_L2_ID = "03";
										break;
									case "05":
										s.OV_L2_ID = "04";
										break;
									case "06":
										s.OV_L2_ID = "05";
										break;
								}
								datas.push(s);
							}
						}
						break;
				}
			}
		}
		return datas;
	}

	let datas1 = [];
	let datas2 = [];
	let datas3 = [];
	const colors = [ "#90C320", "#46BA95", "#5CB8EA", "#6B87C7", "#9B77B3" ];
	for (let i = 0; i < data.length; i++) {
		let s = data[i];
		s.DTVAL_CO = s.DTVAL_CO * 1;
		for (let j = 0; j < data.length; j++) {
			let t = _.cloneDeep(data[j]);
			t.DTVAL_CO = t.DTVAL_CO * 1;
			if (s.TBL_ID == t.TBL_ID && s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.CHAR_ITM_ID == t.CHAR_ITM_ID) {
				if (s.TBL_ID == "DT_1A02016" && s.OV_L2_ID == "01" && t.OV_L2_ID == "02") {
					s.OV_L2_KOR = "30대이하";
					s.DTVAL_CO += t.DTVAL_CO;
				}
			}
		}
	}
	for (let i = 0; i < data.length; i++) {
		let s = _.cloneDeep(data[i]);
		s.DTVAL_CO = s.DTVAL_CO * 1;
		if (s.OV_L2_ID != "00") {
			switch (s.TBL_ID) {
				case "DT_1A02003":
					if (s.CHAR_ITM_ID == "T02") {
						datas1.push(s);
					}
					break;
				case "DT_1A02024":
					if (s.CHAR_ITM_ID == "T02") {
						datas2.push(s);
					}
					break;
				case "DT_1A02016":
					if (s.CHAR_ITM_ID == "T01") {
						if (s.OV_L2_ID != "02") {
							switch (s.OV_L2_ID) {
								case "03":
									s.OV_L2_ID = "02";
									break;
								case "04":
									s.OV_L2_ID = "03";
									break;
								case "05":
									s.OV_L2_ID = "04";
									break;
								case "06":
									s.OV_L2_ID = "05";
									break;
							}
							datas3.push(s);
						}
					}
					break;
			}
		}
	}

	const toJson1 = $administStatsMain.util.arrayToJson({
		data : datas1,
		key : "OV_L2_ID",
	});
	const toJson2 = $administStatsMain.util.arrayToJson({
		data : datas2,
		key : "OV_L2_ID",
	});
	const toJson3 = $administStatsMain.util.arrayToJson({
		data : datas3,
		key : "OV_L2_ID",
	});
	let categories = [];
	categories.push(toJson1[$administStatsMain.ui.selectedYear][Object.keys(toJson1[$administStatsMain.ui.selectedYear])[0]].CHAR_ITM_NM.replace("수", ""));
	categories.push(toJson2[$administStatsMain.ui.selectedYear][Object.keys(toJson2[$administStatsMain.ui.selectedYear])[0]].CHAR_ITM_NM.replace("수", ""));
	categories.push(toJson3[$administStatsMain.ui.selectedYear][Object.keys(toJson3[$administStatsMain.ui.selectedYear])[0]].CHAR_ITM_NM.replace("수", ""));
	let series = [];

	Object.keys(toJson1[$administStatsMain.ui.selectedYear]).sort().forEach(function(OV_L2_ID) {
		const v = toJson1[$administStatsMain.ui.selectedYear][OV_L2_ID];
		series.push({
			name : v.OV_L2_KOR,
			data : (function(OV_L2_ID) {
				let dataArr = [ {
					y : toJson1[$administStatsMain.ui.selectedYear][OV_L2_ID].DTVAL_CO,
					dataObj : toJson1[$administStatsMain.ui.selectedYear][OV_L2_ID],
				// mapColor : colors[series.length]
				}, {
					y : toJson2[$administStatsMain.ui.selectedYear][OV_L2_ID].DTVAL_CO,
					dataObj : toJson2[$administStatsMain.ui.selectedYear][OV_L2_ID],
				// mapColor : colors[series.length]
				}, {
					y : toJson3[$administStatsMain.ui.selectedYear][OV_L2_ID].DTVAL_CO,
					dataObj : toJson3[$administStatsMain.ui.selectedYear][OV_L2_ID],
				// mapColor : colors[series.length]
				} ];
				return dataArr;
			})(OV_L2_ID)
		});
	});
	
	let sumVal = 0;
	let datas = [0,0,0];
	for(let i=0; i<3 ;i++){
		for(let j=0; j<series.length; j++ ){
			sumVal += series[j].data[i].y;
		}
		switch (i){
			case 0: 
				if(sumVal != arrs[1].DTVAL_CO){
					datas[0] += arrs[1].DTVAL_CO - sumVal; 
				}
				sumVal = 0;
				break;
			case 1:
				if(sumVal != arrs[3].DTVAL_CO){
					datas[1] += arrs[3].DTVAL_CO - sumVal; 
				}
				sumVal = 0;
				break;
			case 2:
				if(sumVal != arrs[4].DTVAL_CO){
					datas[2] += arrs[4].DTVAL_CO - sumVal; 
				}
				sumVal = 0;
				break;
		}
	}
	
	let res = datas.reduce(function add(sum, sum2){
		return sum + sum2;
	});
	
	if(res>0){
		series.push({
			name : '비밀보호 또는 0',
			data : datas,
			color : "#8C8C8C"
		});
		
		
	}
	
	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.series = series.slice().reverse();
	opt.xAxis = {
		categories : categories
	};
	opt.legend = {
		margin : -3
	};
	opt.cursor = "pointer";
	opt.seriesShowInLegend = true;
	opt.colors = colors.slice().reverse();
	opt.stacking = "percent";
	opt.tooltipFormatter = function(that) {
		if(that.series.name == "비밀보호 또는 0"){
			return "-";
		}else{
			return $administStatsMain.util.addComma(that.point.y) + " 명";
		}
	};
	opt.dataLabelsTextOutline = true;
	opt.dataLabelsInside = true;
	opt.dataLabelsFormatter = function(that) {
		if(that.percentage == 0){
			return "";
		}else{
			return that.point.percentage.toFixed(1) + " %";
		}
	};
	opt.exportingDataLabelsFormatter = function(that) {
		return opt.dataLabelsFormatter(that) + "<br />(" + opt.tooltipFormatter(that) + ")";
	};
	opt.eventClick = function(e, that) {
		const selRegnParam = $.extend(true, _.cloneDeep(param), {
			tbl_id_list : e.point.dataObj.TBL_ID,
			char_itm_id_list : e.point.dataObj.CHAR_ITM_ID,
			ov_l1_list : $administStatsMain.consts.sidoAll,
			ov_l2_list : (function() {
				if (e.point.dataObj.TBL_ID == "DT_1A02016") {
					switch (e.point.dataObj.OV_L2_ID) {
						case "01":
							return "00,01,02";
							break;
						default:
							return "00,0" + (e.point.dataObj.OV_L2_ID * 1 + 1);
							break;
					}
				} else {
					return "00," + e.point.dataObj.OV_L2_ID;
				}
			}()),
			regn_dataKey : "OV_L2_ID",
			regn_title : e.point.category + " " + param.opt_chartNm + "(" + e.point.dataObj.OV_L2_KOR + ")",
			regn_color : e.point.color,
			regn_unit : "%"
		});
		const selTmsrParam = $.extend(true, _.cloneDeep(param), {
			surv_year_list : $administStatsMain.ui.dftYears.join(","),
			tbl_id_list : e.point.dataObj.TBL_ID,
			char_itm_id_list : e.point.dataObj.CHAR_ITM_ID,
			ov_l1_list : e.point.dataObj.OV_L1_ID,
			tmsr_chartId : "tmsrChart",
			tmsr_title : e.point.category + " " + param.opt_chartNm,
			tmsr_dataKey : "OV_L2_ID",
			tmsr_nameKey : "OV_L2_KOR",
			tmsr_colors : colors,
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

/**
 * @name retunChart6
 * @description 귀농·귀어·귀촌 차트6
 */
/* TODO 행정통계시각화 관리자화면 완료 시 DB 데이터 등록 후 소스 수정해야함 */
function retunChart6(data, param) {

	const colors = [ "#F9C074", "#D38033", "#8E4416" ];

	const toJson = $administStatsMain.util.setVariance($administStatsMain.util.arrayToJson({
		data : data,
		key : "CHAR_ITM_ID"
	}));

	let series = [ {
		data : []
	} ];
	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(CHAR_ITM_ID) {
		const v = toJson[$administStatsMain.ui.selectedYear][CHAR_ITM_ID];
		series[0].data.push({
			name : v.CHAR_ITM_NM.replace("수",""),
			y : v.DTVAL_CO,
			color : colors[series[0].data.length],
			dataObj : v,
			mapColor : "#CB5B1B"
		});
	});

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm.replace(" 현황", "");
	opt.filename = $(".sb_year option:selected").text() + " " + $(".tag_sido:eq(0)").text() + " " + param.opt_chartNm;
	opt.series = series;
	opt.xAxis = {
		type : "category"
	};
	opt.cursor = "pointer";
	opt.tooltipPositioner = true;
	opt.tooltipFormatter = function(that) {
		return $administStatsMain.util.getVarianceText({
			prefix : "전년대비<br />",
			val : that.point.dataObj.iod,
			unit : /* that.point.dataObj.dispUnitNm */"명",
			postfixs : [ "증가 ↑", "감소 ↓" ]
		});
	};
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.y) + " " + /* that.point.dataObj.dispUnitNm */"명";
	};
	opt.eventClick = function(e, that) {
		const selRegnParam = $.extend(true, _.cloneDeep(param), {
			ov_l1_list : $administStatsMain.consts.sidoAll,
			char_itm_id_list : e.point.dataObj.CHAR_ITM_ID,
			regn_dataKey : "CHAR_ITM_ID",
			regn_title : param.opt_chartNm + "(" + e.point.name + ")",
			regn_color : e.point.color,
			regn_unit : "명"
		});
		const selTmsrParam = $.extend(true, _.cloneDeep(param), {
			surv_year_list : $administStatsMain.ui.dftYears.join(","),
			ov_l1_list : e.point.dataObj.OV_L1_ID,
			tmsr_chartId : "tmsrChart",
			tmsr_title : param.opt_chartNm,
			tmsr_dataKey : "CHAR_ITM_ID",
			tmsr_nameKey : "CHAR_ITM_NM",
			tmsr_colors : [],
			tmsr_unit : "명"
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
 * @name retunColumnOrBarChart
 * @description 귀농·귀어·귀촌 Column Or Bar 차트
 */
function retunColumnOrBarChart(data, param) {

	const colors = [ "#F9C074", "#D38033", "#8E4416" ];

	const toJson = $administStatsMain.util.setVariance($administStatsMain.util.arrayToJson({
		data : data,
		key : "CHAR_ITM_ID"
	}));

	let series = [ {
		data : []
	} ];
	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(CHAR_ITM_ID) {
		const v = toJson[$administStatsMain.ui.selectedYear][CHAR_ITM_ID];
		series[0].data.push({
			name : v.CHAR_ITM_NM,
			y : v.DTVAL_CO,
			color : colors[series[0].data.length],
			dataObj : v,
			mapColor : "#CB5B1B"
		});
	});

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm.replace(" 현황", "");
	opt.filename = $(".sb_year option:selected").text() + " " + $(".tag_sido:eq(0)").text() + " " + param.opt_chartNm;
	opt.series = series;
	opt.xAxis = {
		type : "category"
	};
	opt.cursor = "pointer";
	opt.tooltipPositioner = true;
	opt.tooltipFormatter = function(that) {
		return $administStatsMain.util.getVarianceText({
			prefix : "전년대비<br />",
			val : that.point.dataObj.iod,
			unit : that.point.dataObj.dispUnitNm,
			postfixs : [ "증가 ↑", "감소 ↓" ]
		});
	};
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.y) + " " + that.point.dataObj.dispUnitNm;
	};
	opt.eventClick = function(e, that) {
		const selRegnParam = $.extend(true, _.cloneDeep(param), {
			ov_l1_list : $administStatsMain.consts.sidoAll,
			char_itm_id_list : e.point.dataObj.CHAR_ITM_ID,
			regn_dataKey : "CHAR_ITM_ID",
			regn_title : param.opt_chartNm + "(" + e.point.name + ")",
			regn_color : e.point.color
		});
		const selTmsrParam = $.extend(true, _.cloneDeep(param), {
			surv_year_list : $administStatsMain.ui.dftYears.join(","),
			ov_l1_list : e.point.dataObj.OV_L1_ID,
			tmsr_chartId : "tmsrChart",
			tmsr_title : param.opt_chartNm,
			tmsr_dataKey : "CHAR_ITM_ID",
			tmsr_nameKey : "CHAR_ITM_NM",
			tmsr_colors : []
		});
		$administStatsMain.ui.chartItmClick({
			event : e,
			selRegnParam : selRegnParam,
			selTmsrParam : selTmsrParam
		});
	};
	AdministStatsChart.ui.makeChart(opt);
}