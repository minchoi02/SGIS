/**
 * 행정통계시각화 대쉬보드 > 통계더보기 > 퇴직연금
 */
(function(W, D) {
	W.$more2Dash = W.$more2Dash || {};

	$(document).ready(function() {
	});

	$(window).scroll(function() {
	});

	$(window).resize(function() {
	});

	$more2Dash.consts = {};

	$more2Dash.ui = {

		/**
		 * @name init
		 * @description 최초 화면을 초기화(각 화면을 로딩)
		 */
		init : function() {
			$administStatsMain.ui.chartSaveClear();
			$administStatsMain.ui.removeContent();
			$administStatsMain.ui.appendContent("/view/administStats/more2Dash/main");
		},

		/**
		 * @name ready
		 * @description 최초 화면을 초기화(각 화면을 로딩)
		 */
		ready : function() {
			setTimeout(function() {
				$more2Dash.event.allChange();
			}, 50);
		}

	};

	$more2Dash.util = {};

	$more2Dash.event = {

		/**
		 * @name allChange
		 * @description 지역경계 클릭시 모든 차트데이터 변경작업
		 * @param mode
		 *            3(년도 변경)
		 */
		allChange : function(mode) {
			//$administStatsMain.ui.selectedYear = "2020";
			$administStatsMain.ui.selectedYear = $("#searchYear").val(); //년도 추가 배천규 20221214
			let params = [];

			/* 년도 선택 무시 */
			if (mode != "3") {
				params = [ $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["1"]), {
					surv_year_list : $administStatsMain.ui.dftYears.join(","),
					opt_chartId : "more2Chart1"
				}) ];
				$administStatsMain.util.getTotsurvStatData(params, function(data) {
					more2Chart1(data, _.cloneDeep(params));
				});
			}

			params = [ $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["2"]), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				opt_chartId : "more2Chart2"
			}) ];
			$administStatsMain.util.getTotsurvStatData(params, function(data) {
				more2Chart2(data, _.cloneDeep(params));
			});

			params = [ $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["3"]), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				opt_chartId : "more2Chart3"
			}) ];
			$administStatsMain.util.getTotsurvStatData(params, function(data) {
				more2Chart3(data, _.cloneDeep(params));
			});

			/* 년도 선택 무시 */
			if (mode != "3") {
				/* 하드코딩 : TBL_ID 2개 이상 사용 */
				params = [ $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["DT_1RP006"]), {
					surv_year_list : $administStatsMain.ui.dftYears.join(","),
					opt_chartId : "more2Chart4",
					opt_tblIds : [ "DT_1RP006", "DT_1RP105" ]
				}), $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["DT_1RP105"]), {
					surv_year_list : $administStatsMain.ui.dftYears.join(",")
				}) ];
				$administStatsMain.util.getTotsurvStatData(params, function(data) {
					more2Chart4(data, params);
				});
			}

			/* 하드코딩 : TBL_ID 2개 이상 사용 */
			params = [ $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["DT_1RP007"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				opt_chartId : "more2Chart5",
				opt_tblIds : [ "DT_1RP007", "DT_1RP106" ]
			}), $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["DT_1RP106"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1)
			}) ];
			$administStatsMain.util.getTotsurvStatData(params, function(data) {
				more2Chart5(data, params);
			});

			/* 년도 선택 무시 */
			if (mode != "3") {
				/* 하드코딩 : TBL_ID 2개 이상 사용 */
				params = [ $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["DT_1RP000"]), {
					surv_year_list : $administStatsMain.ui.dftYears.join(","),
					opt_chartId : "more2Chart6",
					opt_tblIds : [ "DT_1RP000", "DT_1RP101" ]
				}), $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["DT_1RP101"]), {
					surv_year_list : $administStatsMain.ui.dftYears.join(",")
				}) ];
				$administStatsMain.util.getTotsurvStatData(params, function(data) {
					more2Chart6(data, params);
				});
			}

			/* 하드코딩 : TBL_ID 2개 이상 사용 */
			params = [ $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["DT_1RP003"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				opt_chartId : "more2Chart7",
				opt_tblIds : [ "DT_1RP003", "DT_1RP104" ]
			}), $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["DT_1RP104"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1)
			}) ];
			$administStatsMain.util.getTotsurvStatData(params, function(data) {
				more2Chart7(data, params);
			});

			/* TODO 행정통계시각화 관리자화면 완료 시 DB 데이터 등록 후 소스 수정해야함 */
			params = [ $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				tbl_id_list : "DT_1RP009",
				char_itm_id_list : "T01",
				ov_l1_list : "0",
				ov_l2_list : "00",
				opt_chartId : "more2Chart8",
				opt_chartType : "pie",
				opt_chartNm : "개인형 퇴직연금 추가 가입 현황",
				opt_tblIds : [ "DT_1RP009", "DT_1RP011" ]
			}), $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				tbl_id_list : "DT_1RP011",
				char_itm_id_list : "T01",
				ov_l1_list : "0",
				ov_l2_list : "0"
			}) ];
			$administStatsMain.util.getTotsurvStatData(params, function(data) {
				more2Chart8(data, params);
			});

			/* TODO 행정통계시각화 관리자화면 완료 시 DB 데이터 등록 후 소스 수정해야함 */
			params = [ $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				tbl_id_list : "DT_1RP009",
				char_itm_id_list : "T01",
				ov_l1_list : "0",
				ov_l2_list : "00",
				opt_chartId : "more2Chart9",
				opt_chartType : "column",
				opt_chartNm : "개인형 퇴직연금 추가 가입 현황",
				opt_tblIds : [ "DT_1RP009", "DT_1RP011" ]
			}), $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
				surv_year_list : $administStatsMain.ui.selectedYear,
				tbl_id_list : "DT_1RP011",
				char_itm_id_list : "T01",
				ov_l1_list : "0,1,2,3,4",
				ov_l2_list : "0"
			}) ];
			$administStatsMain.util.getTotsurvStatData(params, function(data) {
				more2Chart9(data, params);
			});

			params = [ $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["10"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				opt_chartId : "more2Chart10"
			}) ];
			$administStatsMain.util.getTotsurvStatData(params, function(data) {
				more2Chart10(data, _.cloneDeep(params));
			});

			setTimeout(function() {
				$administStatsMain.ui.loading(false);
			}, 2000);
		}
	};

}(window, document));

/**
 * @name more2Chart1
 * @description 퇴직연금 차트1
 */
function more2Chart1(data, params) {

	const toJson = $administStatsMain.util.setVariance($administStatsMain.util.arrayToJson({
		data : data[params[0].tbl_id_list],
		key : params[0].opt_dispDataKey,
	}));
	let categories = [];
	const series = [ {
		data : (function() {
			let data = [];
			Object.keys(toJson).sort().forEach(function(PRD_DE) {
				const v = toJson[PRD_DE][Object.keys(toJson[PRD_DE])[0]];
				categories.push(PRD_DE);
				data.push({
					y : v.DTVAL_CO,
					dataObj : v
				});
			});
			return data;
		}(toJson)),
                        //옵션수정 및 추가배천규 20221214
		color : '#169EDA',
		marker : {
			radius : 7,
			symbol : 'circle',
			lineWidth :5,
			lineColor : '#169EDA',
			fillColor : '#fff',
			
		},
                        //옵션수정 및 추가배천규 20221214
	} ];
	
	
	let opt = {};
	opt.chartId = params[0].opt_chartId;
	opt.chartType = params[0].opt_chartType;
	opt.title = params[0].opt_chartNm;
	opt.series = series;
	opt.xAxis = {
		categories : categories,
                        //옵션수정 및 추가배천규 20221214
		labels : {
			style : {
				color : '#000',
				fontSize : '12px',
				fontWeight : '600',

			},
			useHTML : true,
			formatter : function() {
				return '<span class="more2-label">'
						+ this.value + '</span>'; // x축 라벨
													// 배경 컬러
													// 변경
			},
			visible : false,
		},
                        //옵션수정 및 추가배천규 20221214
	};
	opt.tooltipPositioner = true;
	opt.tooltipFormatter = function(that) {
		return $administStatsMain.util.getVarianceText({
			prefix : "증감율<br />",
			val : that.point.dataObj.roc,
			digits : 1,
			unit : "%",
			postfixs : [ "증가 ↑", "감소 ↓" ]
		});
	};
	opt.dataLabelsTextOutline = true;
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.y) + " " + params[0].opt_dispUnitNm;
	};
	AdministStatsChart.ui.makeChart(opt);	
	
	//메인카드3번 초기셋팅 배천규 추가 20221214
	const toYear = $("#searchYear").val();
	const prevYear =  $("#searchYear").val() -1;
	
	$("#more2Card5Per").empty();
	$("#more2Card5Firstdata").empty();
	$("#more2Card5Lastdata").empty();		
	
	
	var setUpPoint = series[0].data[series[0].data.length -1].y - series[0].data[series[0].data.length -2].y;
	var setUpPer = ((setUpPoint/series[0].data[series[0].data.length -2].y)*100).toFixed(1);
	
	//퇴직연금 적립금액
	if(setUpPoint > 0 ){
		$("#more2Card5Per").append(setUpPer+"% 증가("+$administStatsMain.util.addComma(setUpPoint) + " 백만원)");
	}else {
		$("#more2Card5Per").append(Math.abs(setUpPer)+"% 감소("+$administStatsMain.util.addComma(setUpPoint) + " 백만원)");
	}
	$("#more2Card5Firstdata").append(prevYear + "년 " + $administStatsMain.util.addComma(series[0].data[series[0].data.length-2].y) + " 백만원");
	$("#more2Card5Lastdata").append(toYear + "년 " + $administStatsMain.util.addComma(series[0].data[series[0].data.length-1].y)+" 백만원");
	
	
	
	//선택년도 변경시2번 카드 셋팅
	$("#searchYear").change(function(e){
		const toYear = $("#searchYear").val();
		const prevYear =  $("#searchYear").val() -1;
		
		$("#more2Card5Per").empty();
		$("#more2Card5Firstdata").empty();
		$("#more2Card5Lastdata").empty();	
				
		for(let i = 0; i < series[0].data.length; i ++){
			if($(this).val() == "2015"){
				if($(this).val() == series[0].data[i].dataObj.PRD_DE){				
					$("#more2Card5Per").append("전년 자료 없음");
					$("#more2Card5Firstdata").append("전년 자료 없음");
					$("#more2Card5Lastdata").append(toYear + "년 " + $administStatsMain.util.addComma(series[0].data[i].y)+" 백만원");
				}
			}else {
				if($(this).val() == series[0].data[i].dataObj.PRD_DE){
					//증감률 계싼
					var upPoint = series[0].data[i].y - series[0].data[i-1].y;
					var upPer = ((upPoint/series[0].data[i-1].y)*100).toFixed(1);
					//console.log(upPer);
					if(upPoint > 0 ){
						$("#more2Card5Per").append(upPer+"% 증가("+$administStatsMain.util.addComma(upPoint) + " 백만원)");
					}else {
						$("#more2Card5Per").append(upPer+"% 감소("+$administStatsMain.util.addComma(upPoint) + " 백만원)");
					}
					$("#more2Card5Firstdata").append(prevYear + "년 " + $administStatsMain.util.addComma(series[0].data[i-1].y) + " 백만원");
					$("#more2Card5Lastdata").append(toYear + "년 " + $administStatsMain.util.addComma(series[0].data[i].y)+" 백만원");
				}
			}
		}
	});
	
	
	
	//메인카드3번 초기셋팅 배천규 추가 20221214
}

/* 하드코딩 : 2차원 차트 */
/**
 * @name more2Chart2
 * @description 퇴직연금 차트2
 */
function more2Chart2(data, params) {

	const toJson = $administStatsMain.util.setVariance($administStatsMain.util.arrayToJson({
		data : data[params[0].tbl_id_list],
		key : "OV_L1_ID",
		key2 : "OV_L2_ID"
	}));
	let series = [];
	let categories = [];
	let totals = [];
	const colors = [ "#8CC63E", "#F9A61A", "#169EDA" ].reverse(); 	//옵션변경 배천규 추가 20221214
	const curYear = $administStatsMain.ui.selectedYear;

	/* [PRD_DE]현재년도 [OV_L1_ID]제도유형별 */
	Object.keys(toJson[curYear]).sort().forEach(function(OV_L1_ID) {
		if (OV_L1_ID != "0") { /* [0]계 제외 */
			categories.push(toJson[curYear][OV_L1_ID][Object.keys(toJson[curYear][OV_L1_ID])[1]].OV_L1_KOR);
			totals.push(toJson[curYear][OV_L1_ID][0].DTVAL_CO);
		}
	});

	/* [PRD_DE]현재년도 [OV_L2_ID]운용방법별 */
	const OV_L1_ID_0 = Object.keys(toJson[curYear])[1];
	Object.keys(toJson[curYear][OV_L1_ID_0]).sort().reverse().forEach(function(OV_L2_ID) {
		if (OV_L2_ID != "0") { /* [0]계 제외 */
			const v = toJson[curYear][OV_L1_ID_0][OV_L2_ID];
			series.push({
				name : v.OV_L2_KOR,
				data : (function(OV_L2_ID) {
					let dataArr = [];
					/* [PRD_DE]현재년도 [OV_L1_ID]제도유형별 */
					Object.keys(toJson[curYear]).sort().forEach(function(OV_L1_ID) {
						if (OV_L1_ID != "0") { /* [0]계 제외 */
							dataArr.push({
								y : toJson[curYear][OV_L1_ID][OV_L2_ID].DTVAL_CO,
								dataObj : toJson[curYear][OV_L1_ID][OV_L2_ID],
								dataLabels : {
									x : (function() {
										if (OV_L2_ID == "2") {
											return -55;
										}
										// else if (OV_L2_ID == "3") {
										// return 23;
										// }
									}(OV_L2_ID))
								}
							});
						}
					});
					return dataArr;
				})(OV_L2_ID),
				OV_L2_ID : v.OV_L2_ID
			});
		}
	});

	let opt = {};
	opt.chartId = params[0].opt_chartId;
	opt.chartType = params[0].opt_chartType;
	opt.title = params[0].opt_chartNm;
	opt.series = series;
	opt.xAxis = {
		categories : categories
	};
	opt.yAxis = {
                        //옵션추가  배천규 20221214
		stackLabels : {
			enabled : true,
			style : {
				color : "#000000",
				textOutline : "#fff"
			},
			formatter : function() {
				return "총 "+$administStatsMain.util.addComma(totals[this.x]) + " 백만원";
			}
		}
                        //옵션추가  배천규 20221214
	};
	opt.colors = colors;
	opt.dataLabelsTextOutline = true;
	opt.dataLabelsInside = true;
	opt.seriesShowInLegend = true;
	opt.stacking = "percent";
	opt.isBigExporting = true;
	opt.tooltipFormatter = function(that) {
		return that.series.name + "<br />" + $administStatsMain.util.addComma(that.point.y) + " 백만원";
	};
	//렐이블 수정 배천규 추가 20221214
	opt.dataLabelsFormatter = function(that) {
		return "";
		//return that.point.percentage.toFixed(1) + " %";
	};
	opt.exportingDataLabelsFormatter = function(that) {
		return opt.dataLabelsFormatter(that) + "<br />(" + $administStatsMain.util.addComma(that.point.y) + " 백만원)";
	};
	AdministStatsChart.ui.makeChart(opt);
}

/* 하드코딩 : 2차원 차트 */
/**
 * @name more2Chart3
 * @description 퇴직연금 차트3
 */
function more2Chart3(data, params) {

	const toJson = $administStatsMain.util.arrayToJson({
		data : data[params[0].tbl_id_list],
		key : "OV_L1_ID",
		key2 : "OV_L2_ID"
	});
	let series = [];
	let categories = [];
	let totals = [];
	const curYear = $administStatsMain.ui.selectedYear;
	const colors = [ "#8CC63E", "#F9A61A", "#169EDA" ].reverse();                        //옵션변경  배천규 20221214

	/* [PRD_DE]현재년도 [OV_L1_ID]금융권역별 */
	Object.keys(toJson[curYear]).sort().forEach(function(OV_L1_ID) {
		if (OV_L1_ID != "0") { /* [0]계 제외 */
			categories.push(toJson[curYear][OV_L1_ID][Object.keys(toJson[curYear][OV_L1_ID])[1]].OV_L1_KOR);
			totals.push(toJson[curYear][OV_L1_ID][0].DTVAL_CO);
		}
	});

	/* [PRD_DE]현재년도 [OV_L2_ID]운용방법별 */
	const OV_L1_ID_0 = Object.keys(toJson[curYear])[1];
	Object.keys(toJson[curYear][OV_L1_ID_0]).sort().reverse().forEach(function(OV_L2_ID) {
		if (OV_L2_ID != "0") { /* [0]계 제외 */
			const v = toJson[curYear][OV_L1_ID_0][OV_L2_ID];
			series.push({
				name : v.OV_L2_KOR,
				data : (function(OV_L2_ID) {
					let dataArr = [];
					/* [PRD_DE]현재년도 [OV_L1_ID]금융권역별 */
					Object.keys(toJson[curYear]).sort().forEach(function(OV_L1_ID) {
						if (OV_L1_ID != "0") { /* [0]계 제외 */
							dataArr.push({
								y : toJson[curYear][OV_L1_ID][OV_L2_ID].DTVAL_CO,
								dataObj : toJson[curYear][OV_L1_ID][OV_L2_ID],
								dataLabels : {
									x : (function() {
										if (OV_L2_ID == "2") {
											return -55;
										}
										// else if (OV_L2_ID == "3") {
										// return 23;
										// }
									}(OV_L2_ID))
								}
							});
						}
					});
					return dataArr;
				})(OV_L2_ID),
				OV_L2_ID : v.OV_L2_ID
			});
		}
	});

	let opt = {};
	opt.chartId = params[0].opt_chartId;
	opt.chartType = params[0].opt_chartType;
	opt.title = params[0].opt_chartNm;
	opt.series = series;
	opt.xAxis = {
		categories : categories
	};
	opt.yAxis = {
                        //옵션추가  배천규 20221214
		stackLabels : {
			enabled : true,
			style : {
				color : "#000000",
				textOutline : "#fff"
			},
			formatter : function() {
				return "총 "+$administStatsMain.util.addComma(totals[this.x]) + " 백만원";
			}
		}
                        //옵션추가  배천규 20221214
	// stackLabels : {
	// enabled : true,
	// textAlign : "right",
	// x : 150,
	// style : {
	// color : "#000000",
	// textOutline : false
	// },
	// formatter : function() {
	// return $administStatsMain.util.addComma(totals[this.x]) + " 백만원";
	// }
	// }
	};
	opt.colors = colors;
	opt.dataLabelsTextOutline = true;
	opt.dataLabelsInside = true;
	opt.seriesShowInLegend = true;
	opt.stacking = "percent";
	opt.isBigExporting = true;
	opt.tooltipFormatter = function(that) {
		return that.series.name + "<br />" + $administStatsMain.util.addComma(that.point.y) + " 백만원";
	};
	opt.dataLabelsFormatter = function(that) {
		return "";                        //수정  배천규 20221214
		//return that.point.percentage.toFixed(1) + " %";
	};
	opt.exportingDataLabelsFormatter = function(that) {
		return opt.dataLabelsFormatter(that) + "<br />(" + $administStatsMain.util.addComma(that.point.y) + " 백만원)";
	};
	AdministStatsChart.ui.makeChart(opt);
}

/* 하드코딩 : TBL_ID 2개 이상 사용 */
/**
 * @name more2Chart4
 * @description 퇴직연금 차트4
 */
function more2Chart4(data, params) {

	/* 총 도입 사업장 */
	const toJson1 = $administStatsMain.util.setVariance($administStatsMain.util.arrayToJson({
		data : data[params[0].tbl_id_list]
	}));
	/* 도입률 */
	const toJson2 = $administStatsMain.util.setVariance($administStatsMain.util.arrayToJson({
		data : data[params[1].tbl_id_list]
	}));
	let columnDataArr = [];
	let lineDataArr = [];
	let categories = [];

	Object.keys(toJson1).sort().forEach(function(PRD_DE) {
		const v1 = toJson1[PRD_DE];
		const v2 = toJson2[PRD_DE];
		categories.push(PRD_DE);
		columnDataArr.push({
			y : v1.DTVAL_CO,
			dataObj : v1,
			PRD_DE : PRD_DE
		});
		lineDataArr.push({
			y : v2.DTVAL_CO,
			dataObj : v2,
			PRD_DE : PRD_DE
		});
	});

	const columnDataArr_ = $administStatsMain.util.sortJSON(columnDataArr.slice(), "y", "asc");
	const min = columnDataArr_[0].y;
	const max = columnDataArr_[columnDataArr_.length - 1].y;
	const max2 = columnDataArr_[columnDataArr_.length - 2].y;                        //변수 추가  배천규 20221214
	
	
	const series = [ {
		name : "전체 도입 사업장",
		type : "column",
		data : columnDataArr,
		//옵션변경  배천규 20221214
		color : "#F9A61A",
		borderWidth : 1,
		pointWidth : 25,
		borderColor : "#444444",
        //옵션변경  배천규 20221214
		borderRadius : 5
	}, {
		name : "도입률",
		type : "line",
		yAxis : 1,
		data : lineDataArr,
		color : "#169EDA"                        //옵션변경  배천규 20221214
	}];

	let opt = {};
	opt.chartId = params[0].opt_chartId;
	opt.title = params[0].opt_chartNm;
	opt.filename = params[0].opt_chartNm;
	opt.series = series;
	opt.xAxis = {
		categories : categories
	};
	opt.tooltipPositioner = true;
	opt.tooltipFormatter = function(that) {
		
		if (that.series.name == "도입률") {
			
			return $administStatsMain.util.getVarianceText({
				prefix : that.series.name + " 증감<br />",
				val : that.point.dataObj.iod,
				digits : 1,
				unit : "%p",
				postfixs : [ "증가 ↑", "감소 ↓" ]
			});
		}
		//배천규 추가
		return $administStatsMain.util.getVarianceText({
			prefix : that.series.name + " 증감율<br />",
			val : that.point.dataObj.roc,
			digits : 1,
			unit : "%",
			postfixs : [ "증가 ↑", "감소 ↓" ]
		});
		//배천규 추가
		 

	};
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.y);
	};
	opt.yAxis = [ {
		title : {
			enabled : true,
			text : "(개소)",
			align : "high",
			offset : 10,
			rotation : 0,
			y : -10
		},
		labels : {
			enabled : true,
		},
		gridLineWidth : 1,
		min : min,
		max : max
	}, {
		title : {
			enabled : true,
			text : "(%)",
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
	opt.exportingSeries = [ {
		dataLabels : {
			enabled : true,
			inside : true,
			color : "#52BEBE"
		}
	}, {
		dataLabels : {
			enabled : true,
			color : "#27A7DF"
		}
	} ];
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
	
	//메인카드3번 초기셋팅 추가 20221214 배천규 
	const toYear = $("#searchYear").val();
	const prevYear =  $("#searchYear").val() -1;
	
	$("#more2Card1Per").empty();
	$("#more2Card1Firstdata").empty();
	$("#more2Card1Lastdata").empty();	
	
	$("#more2Card3Per").empty();
	$("#more2Card3Firstdata").empty();
	$("#more2Card3Lastdata").empty();	
	
	
	var setUpPoint = (lineDataArr[lineDataArr.length -1].y - lineDataArr[lineDataArr.length -2].y).toFixed(1);
	var setUpPoint2 = columnDataArr[columnDataArr.length -1].y - columnDataArr[columnDataArr.length -2].y;
	var setUpPer = ((setUpPoint2/columnDataArr[columnDataArr.length -2].y)*100).toFixed(1);
	
	//도입사업장 개소
	if(setUpPoint2 > 0 ){
		$("#more2Card1Per").append(setUpPer+"% 증가("+$administStatsMain.util.addComma(setUpPoint2) + " 개소)");
	}else {
		$("#more2Card1Per").append(Math.abs(setUpPer)+"% 감소("+$administStatsMain.util.addComma(setUpPoint2) + " 개소)");
	}
	$("#more2Card1Firstdata").append(prevYear + "년 " + $administStatsMain.util.addComma(columnDataArr[columnDataArr.length-2].y) + " 개소");
	$("#more2Card1Lastdata").append(toYear + "년 " + $administStatsMain.util.addComma(columnDataArr[columnDataArr.length-1].y)+" 개소");
	
	
	//증감률
	if(setUpPoint > 0 ){
		$("#more2Card3Per").append(setUpPoint+"%p 증가");
	}else {
		$("#more2Card3Per").append(Math.abs(setUpPoint)+"%p 감소");
	}
	$("#more2Card3Firstdata").append(prevYear + "년 " + $administStatsMain.util.addComma(lineDataArr[lineDataArr.length-2].y) + " %");
	$("#more2Card3Lastdata").append(toYear + "년 " + $administStatsMain.util.addComma(lineDataArr[lineDataArr.length-1].y)+" %");
	
	
	
	//선택년도 변경시2번 카드 셋팅
	$("#searchYear").change(function(e){
		const toYear = $("#searchYear").val();
		const prevYear =  $("#searchYear").val() -1;
		
		$("#more2Card1Per").empty();
		$("#more2Card1Firstdata").empty();
		$("#more2Card1Lastdata").empty();	
		
		$("#more2Card3Per").empty();
		$("#more2Card3Firstdata").empty();
		$("#more2Card3Lastdata").empty();	
		
		
		for(let i = 0; i < lineDataArr.length; i ++){
			if($(this).val() == "2015"){
				if($(this).val() == lineDataArr[i].PRD_DE){
					$("#more2Card3Per").append("전년 자료 없음");
					$("#more2Card3Firstdata").append("전년 자료 없음");
					$("#more2Card3Lastdata").append(toYear + "년 " + $administStatsMain.util.addComma(lineDataArr[i].y)+" %");
				}
			}else {
				if($(this).val() == lineDataArr[i].PRD_DE){
					//증감률 계싼
					var upPoint = (lineDataArr[i].y - lineDataArr[i-1].y).toFixed(1);;
					var upPer = ((upPoint/lineDataArr[i-1].y)*100).toFixed(1);
					if(upPoint > 0 ){
						$("#more2Card3Per").append(upPoint+"%p 증가");
					}else {
						$("#more2Card3Per").append(upPoint+"%p 감소");
					}
					$("#more2Card3Firstdata").append(prevYear + "년 " + $administStatsMain.util.addComma(lineDataArr[i-1].y) + " %");
					$("#more2Card3Lastdata").append(toYear + "년 " + $administStatsMain.util.addComma(lineDataArr[i].y)+" %");
				}
			}
		}
		
		for(let i = 0; i < columnDataArr.length; i ++){
			if($(this).val() == "2015"){
				if($(this).val() == columnDataArr[i].PRD_DE){				
					$("#more2Card1Per").append("전년 자료 없음");
					$("#more2Card1Firstdata").append("전년 자료 없음");
					$("#more2Card1Lastdata").append(toYear + "년 " + $administStatsMain.util.addComma(columnDataArr[i].y)+" 개소");
				}
			}else {
				if($(this).val() == columnDataArr[i].PRD_DE){
					//증감률 계싼
					var upPoint = columnDataArr[i].y - columnDataArr[i-1].y;
					var upPer = ((upPoint/columnDataArr[i-1].y)*100).toFixed(1);
					//console.log(upPer);
					if(upPoint > 0 ){
						$("#more2Card1Per").append(upPer+"% 증가("+$administStatsMain.util.addComma(upPoint) + " 개소)");
					}else {
						$("#more2Card1Per").append(upPer+"% 감소("+$administStatsMain.util.addComma(upPoint) + " 개소)");
					}
					$("#more2Card1Firstdata").append(prevYear + "년 " + $administStatsMain.util.addComma(columnDataArr[i-1].y) + " 개소");
					$("#more2Card1Lastdata").append(toYear + "년 " + $administStatsMain.util.addComma(columnDataArr[i].y)+" 개소");
				}
			}
		}
	});

	
}

/* 하드코딩 : TBL_ID 2개 이상 사용 */
/**
 * @name  
 * @description 퇴직연금 차트5
 */
function more2Chart5(data, params) {

	let toJsons = {};
	$.each(params, function(i, v) {
		toJsons[v.tbl_id_list] = $administStatsMain.util.setVariance($administStatsMain.util.arrayToJson({
			data : data[v.tbl_id_list],
			key : "OV_L1_ID"
		}));
		toJsons[v.tbl_id_list + "Arr"] = [];
	});

	let categories = [];
	const curYear = $administStatsMain.ui.selectedYear;
	Object.keys(toJsons[params[0].tbl_id_list][curYear]).sort().forEach(function(OV_L1_ID) {
		categories.push(toJsons[params[1].tbl_id_list][curYear][OV_L1_ID].OV_L1_KOR);
		$.each(params, function(i, v) {
			toJsons[v.tbl_id_list + "Arr"].push({
				y : toJsons[v.tbl_id_list][curYear][OV_L1_ID].DTVAL_CO,
				dataObj : toJsons[v.tbl_id_list][curYear][OV_L1_ID]
			});
		});
	});
            //옵션  변경  배천규 20221214
	const series = [ {
		name : "전체 도입 사업장",
		type : "column",
		color : "#F9A61A",
		borderWidth : 1,
		borderColor : "#444444",
		pointWidth : 25,
		data : toJsons[params[0].tbl_id_list + "Arr"],
		borderRadius : 5
	}, {
		name : "도입률",
		type : "spline",
		yAxis : 0,
		lineWidth : 0,
		states: {
            hover: {
                enabled: false
            }
        },
        tooltip: { enabled: false },
        enableMouseTracking : false,
		data : toJsons[params[1].tbl_id_list + "Arr"],
		marker : {
			symbol : 'url(/images/administStats/more1/more1Dash_icon01.png)',
			width: "30px",
			height: "30px",
		},
	} ];

	const columnDataArr_ = $administStatsMain.util.sortJSON(toJsons["DT_1RP106Arr"].slice(), "y", "asc");
	const min = columnDataArr_[0].y;
	const max = columnDataArr_[columnDataArr_.length - 1].y;

	let opt = {};
	opt.chartId = params[0].opt_chartId;
	opt.title = params[0].opt_chartNm;
	opt.series = series;
	opt.seriesShowInLegend = false;
	opt.xAxis = {
		categories : categories,
		labels: {
            rotation: 0,
            y: 30,
            
        }
	};


	opt.tooltipFormatter = function(that) {
		if (that.point.dataObj.CHAR_ITM_NM == "도입률") {
			return false;
			/*return $administStatsMain.util.getVarianceText({
				prefix : that.point.dataObj.CHAR_ITM_NM + " 증감<br />",
				val : that.point.dataObj.iod,
				digits : 1,
				unit : "%p",
				postfixs : [ "증가 ↑", "감소 ↓" ]
			});*/
		}
		return $administStatsMain.util.getVarianceText({
			prefix : that.point.dataObj.CHAR_ITM_NM + " 증감율<br />",
			val : that.point.dataObj.roc,
			digits : 1,
			unit : "%",
			postfixs : [ "증가 ↑", "감소 ↓" ]
		});
	};
	opt.dataLabelsFormatter = function(that) {
		if (that.point.dataObj.CHAR_ITM_NM == "도입률") {
			return "";
		}else {
			return $administStatsMain.util.addComma(that.point.y);
		}
		
	};
	opt.yAxis = [ {
		title : {
			enabled : true,
			text : "(개소)",
			align : "high",
			offset : 10,
			rotation : 0,
			y : -10
		},
		labels : {
			enabled : true,
		},
		gridLineWidth : 1
	}/*, {
		title : {
			enabled : true,
			text : "(%)",
			align : "high",
			offset : 10,
			rotation : 0,
			y : -10
		},
		labels : {
			enabled : true,
		},
		gridLineWidth : 0,
		opposite : true,
		min : min,
		max : max
	}*/ ];
	opt.exportingSeries = [ {
		dataLabels : {
			enabled : true,
			inside : true,
			color : "#52BEBE"
		}
	}, {
		dataLabels : {
			enabled : true,
			color : "#27A7DF"
		}
	} ];
	opt.exportingYAxis = [ {
		title : {
			enabled : true,
			text : "(개소)",
			align : "high",
			offset : 10,
			rotation : 0,
			y : -10,
		},
		labels : {
			enabled : true,
		},
		gridLineWidth : 1
	}, {
		title : {
			enabled : true,
			text : "(%)",
			align : "high",
			offset : 10,
			rotation : 0,
			y : -10
		},
		labels : {
			enabled : true,
		},
		gridLineWidth : 0,
		opposite : true
	} ];
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
		$(chart.renderTo).find(".highcharts-xaxis-labels text").each(function(i, v) {
			if (chart.xAxis[0].categories[i].length > 7) {
				$(this).html("<title>" + chart.xAxis[0].categories[i] + "</title>" + $.trim(chart.xAxis[0].categories[i].substring(0, 7)) + "…");
			} else {
				$(this).html(chart.xAxis[0].categories[i]);
			}
		});
		
		/*$(chart.series).each(function(i, serie) {
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
		});*/
		
		
	};
	AdministStatsChart.ui.makeCombinationsChart(opt);
}

/* 하드코딩 : TBL_ID 2개 이상 사용 */
/**
 * @name more2Chart6
 * @description 퇴직연금 차트6
 */
function more2Chart6(data, params) {

	/* 총 가입 근로자 */
	const toJson1 = $administStatsMain.util.setVariance($administStatsMain.util.arrayToJson({
		data : data[params[0].tbl_id_list]
	}));
	/* 가입률 */
	const toJson2 = $administStatsMain.util.setVariance($administStatsMain.util.arrayToJson({
		data : data[params[1].tbl_id_list]
	}));
	let columnDataArr = [];
	let lineDataArr = [];
	let categories = [];

	Object.keys(toJson1).sort().forEach(function(PRD_DE) {
		const v1 = toJson1[PRD_DE];
		const v2 = toJson2[PRD_DE];
		categories.push(PRD_DE);
		columnDataArr.push({
			y : v1.DTVAL_CO,
			dataObj : v1,
			PRD_DE : PRD_DE
		});
		lineDataArr.push({
			y : v2.DTVAL_CO,
			dataObj : v2,
			PRD_DE : PRD_DE
		});
	});

	const columnDataArr_ = $administStatsMain.util.sortJSON(columnDataArr.slice(), "y", "asc");
	const min = columnDataArr_[0].y;
	const max = columnDataArr_[columnDataArr_.length - 1].y;

	const series = [ {
		name : "전체 가입 근로자",
		type : "column",
                        //옵션  변경  배천규 20221214
		color : "#169EDA",
		borderWidth : 1,
		borderColor : "#444444",
		pointWidth : 25,
                        //옵션  변경  배천규 20221214
		data : columnDataArr,
		borderRadius : 5
	}, {
		name : "가입률",
		type : "line",
		yAxis : 1,
		data : lineDataArr,
		color : "#F9A61A"                        //옵션  변경  배천규 20221214
	} ];

	let opt = {};
	opt.chartId = params[0].opt_chartId;
	opt.title = params[0].opt_chartNm;
	opt.filename = params[0].opt_chartNm;
	opt.series = series;
	opt.xAxis = {
		categories : categories
	};
	opt.tooltipPositioner = true;
	opt.tooltipFormatter = function(that) {
		if (that.series.name == "가입률") {
			return $administStatsMain.util.getVarianceText({
				prefix : that.series.name + " 증감<br />",
				val : that.point.dataObj.iod,
				digits : 1,
				unit : "%p",
				postfixs : [ "증가 ↑", "감소 ↓" ]
			});
		}
		return $administStatsMain.util.getVarianceText({
			prefix : that.series.name + " 증감율<br />",
			val : that.point.dataObj.roc,
			digits : 1,
			unit : "%",
			postfixs : [ "증가 ↑", "감소 ↓" ]
		});
	};
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.y);
	};
	opt.yAxis = [ {
		title : {
			enabled : true,
			text : "(명)",
			align : "high",
			offset : 10,
			rotation : 0,
			y : -10,
		},
		labels : {
			enabled : true,
		},
		gridLineWidth : 1,
		min : min,
		max : max
	}, {
		title : {
			enabled : true,
			text : "(%)",
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
	opt.exportingSeries = [ {
		dataLabels : {
			enabled : true,
			inside : true,
			color : "#EEA863"
		}
	}, {
		dataLabels : {
			enabled : true,
			color : "#EB644E"
		}
	} ];
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
	
	//메인카드2번 초기셋팅 추가 배천규 20221214
	const toYear = $("#searchYear").val();
	const prevYear =  $("#searchYear").val() -1;
	
	$("#more2Card2Per").empty();
	$("#more2Card2Firstdata").empty();
	$("#more2Card2Lastdata").empty();	
	$("#more2Card4Per").empty();
	$("#more2Card4Firstdata").empty();
	$("#more2Card4Lastdata").empty();	
	
	
	var setUpPoint = columnDataArr[columnDataArr.length -1].y - columnDataArr[columnDataArr.length -2].y;
	var setUpPoint2 = lineDataArr[lineDataArr.length -1].y - lineDataArr[lineDataArr.length -2].y;
	var setUpPer = ((setUpPoint/columnDataArr[columnDataArr.length -2].y)*100).toFixed(1);
	
	//총가입자수
	if(setUpPoint > 0 ){
		$("#more2Card2Per").append(setUpPer+"% 증가("+$administStatsMain.util.addComma(setUpPoint) + " 명)");
	}else {
		$("#more2Card2Per").append(setUpPer+"% 감소("+$administStatsMain.util.addComma(setUpPoint) + " 명)");
	}
	$("#more2Card2Firstdata").append(prevYear + "년 " + $administStatsMain.util.addComma(columnDataArr[columnDataArr.length-2].y) + " 명");
	$("#more2Card2Lastdata").append(toYear + "년 " + $administStatsMain.util.addComma(columnDataArr[columnDataArr.length-1].y)+" 명");
	
	//가입률
	
	
	if(setUpPoint2 > 0 ){
		$("#more2Card4Per").append(setUpPoint2.toFixed(1)+"%p 증가");
	}else {
		$("#more2Card4Per").append(setUpPoint2.toFixed(1)+"%p 감소");
	}
	$("#more2Card4Firstdata").append(prevYear + "년 " + $administStatsMain.util.addComma(lineDataArr[lineDataArr.length-2].y) + " %");
	$("#more2Card4Lastdata").append(toYear + "년 " + $administStatsMain.util.addComma(lineDataArr[lineDataArr.length-1].y)+" %");
	
	
	
	//선택년도 변경시2번 카드 셋팅
	$("#searchYear").change(function(e){
		const toYear = $("#searchYear").val();
		const prevYear =  $("#searchYear").val() -1;
		$("#more2Card2Per").empty();
		$("#more2Card2Firstdata").empty();
		$("#more2Card2Lastdata").empty();	
		$("#more2Card4Per").empty();
		$("#more2Card4Firstdata").empty();
		$("#more2Card4Lastdata").empty();	
		
		//총가입근로자
		for(let i = 0; i < columnDataArr.length; i ++){
			if($(this).val() == "2015"){
				if($(this).val() == columnDataArr[i].PRD_DE){
					$("#more2Card2Per").append("전년 자료 없음");
					$("#more2Card2Firstdata").append("전년 자료 없음");
					$("#more2Card2Lastdata").append(toYear + "년 " + $administStatsMain.util.addComma(columnDataArr[i].y)+" 명");
					
					$("#more2Card4Per").append("전년 자료 없음");
					$("#more2Card4Firstdata").append("전년 자료 없음");
					$("#more2Card4Lastdata").append(toYear + "년 " + $administStatsMain.util.addComma(lineDataArr[i].y)+" %");
				}
			}else {
				if($(this).val() == columnDataArr[i].PRD_DE){
					//증감률 계싼
					var upPoint = columnDataArr[i].y - columnDataArr[i-1].y;
					var upPer = ((upPoint/columnDataArr[i-1].y)*100).toFixed(1);
					var upPoint2 = lineDataArr[i].y - lineDataArr[i-1].y;
					//console.log(upPer);
					if(upPoint > 0 ){
						$("#more2Card2Per").append(upPer+"% 증가("+$administStatsMain.util.addComma(upPoint) + " 명)");
						$("#more2Card4Per").append(upPoint2.toFixed(1)+"%p 증가");
					}else {
						$("#more2Card2Per").append(upPer+"% 감소("+$administStatsMain.util.addComma(upPoint) + " 명)");
						$("#more2Card4Per").append(upPoint2.toFixed(1)+"%p 감소");
					}
					
					$("#more2Card2Firstdata").append(prevYear + "년 " + $administStatsMain.util.addComma(columnDataArr[i-1].y) + " 명");
					$("#more2Card2Lastdata").append(toYear + "년 " + $administStatsMain.util.addComma(columnDataArr[i].y)+" 명");
					
					$("#more2Card4Firstdata").append(prevYear + "년 " + $administStatsMain.util.addComma(lineDataArr[i-1].y) + " %");
					$("#more2Card4Lastdata").append(toYear + "년 " + $administStatsMain.util.addComma(lineDataArr[i].y)+" %");
				}
			}
		}
	});
	
}

/* 하드코딩 : TBL_ID 2개 이상 사용 */
/**
 * @name more2Chart7
 * @description 퇴직연금 차트7
 */
function more2Chart7(data, params) {

	let toJsons = {};
	$.each(params, function(i, v) {
		toJsons[v.tbl_id_list] = $administStatsMain.util.setVariance($administStatsMain.util.arrayToJson({
			data : data[v.tbl_id_list],
			key : "OV_L1_ID"
		}));
		toJsons[v.tbl_id_list + "Arr"] = [];
	});

	let categories = [];
	const curYear = $administStatsMain.ui.selectedYear;
	Object.keys(toJsons[params[0].tbl_id_list][curYear]).sort().forEach(function(OV_L1_ID) {
		categories.push(toJsons[params[1].tbl_id_list][curYear][OV_L1_ID].OV_L1_KOR);
		$.each(params, function(i, v) {
			toJsons[v.tbl_id_list + "Arr"].push({
				y : toJsons[v.tbl_id_list][curYear][OV_L1_ID].DTVAL_CO,
				dataObj : toJsons[v.tbl_id_list][curYear][OV_L1_ID]
			});
		});
	});

            //옵션  변경  배천규 20221214

	const series = [ {
		name : "전체 가입 근로자",
		type : "column",
                        //옵션  변경  배천규 20221214
		color : "#169EDA",
		borderWidth : 1,
		pointWidth : 25,
		borderColor : "#444444",
		data : toJsons[params[0].tbl_id_list + "Arr"],
		borderRadius : 5
	}, {
		name : "가입률",
		type : "spline",
		yAxis : 0,
		data : toJsons[params[1].tbl_id_list + "Arr"],
		color : "#F9A61A",
		yAxis : 0,
		lineWidth : 0,
		states: {
            hover: {
                enabled: false
            }
        },
        tooltip: { enabled: false },
        enableMouseTracking : false,
		marker : {
			symbol : 'url(/images/administStats/more1/more1Dash_icon01.png)',
			width: "30px",
			height: "30px",
		},
			
	} ];

	let opt = {};
	opt.chartId = params[0].opt_chartId;
	opt.title = params[0].opt_chartNm;
	opt.series = series;
	opt.seriesShowInLegend = false;
	opt.xAxis = {
		categories : categories,
		labels: {
            rotation: 0,
            y: 30,
            
        }
	};
	opt.tooltipFormatter = function(that) {
		if (that.point.dataObj.CHAR_ITM_NM == "가입률") {
			/*return $administStatsMain.util.getVarianceText({
				prefix : that.point.dataObj.CHAR_ITM_NM + " 증감<br />",
				val : that.point.dataObj.iod,
				digits : 1,
				unit : "%p",
				postfixs : [ "증가 ↑", "감소 ↓" ]
			});*/
			return false;
		}
		return $administStatsMain.util.getVarianceText({
			prefix : that.point.dataObj.CHAR_ITM_NM + " 증감율<br />",
			val : that.point.dataObj.roc,
			digits : 1,
			unit : "%",
			postfixs : [ "증가 ↑", "감소 ↓" ]
		});
	};
	opt.dataLabelsFormatter = function(that) {
		if (that.point.dataObj.CHAR_ITM_NM == "가입률") {
			return "";
		}else {
			return $administStatsMain.util.addComma(that.point.y);
		}
		
	};
	opt.yAxis = [ {
		title : {
			enabled : true,
			text : "(명)",
			align : "high",
			offset : 10,
			rotation : 0,
			y : -10
		},
		labels : {
			enabled : true,
		},
		gridLineWidth : 1
	}/*, {
		title : {
			enabled : true,
			text : "(%)",
			align : "high",
			offset : 10,
			rotation : 0,
			y : -10
		},
		labels : {
			enabled : true,
		},
		gridLineWidth : 0,
		opposite : true
	} */];
	opt.exportingSeries = [ {
		dataLabels : {
			enabled : true,
			inside : true,
			color : "#EEA863"
		},
	}, {
		dataLabels : {
			enabled : true,
			color : "#EB644E"
		},
	} ];
	opt.exportingYAxis = [ {
		title : {
			enabled : true,
			text : "(명)",
			align : "high",
			offset : 10,
			rotation : 0,
			y : -10,
		},
		labels : {
			enabled : true,
		},
		gridLineWidth : 1
	}, {
		title : {
			enabled : true,
			text : "(%)",
			align : "high",
			offset : 10,
			rotation : 0,
			y : -10
		},
		labels : {
			enabled : true,
		},
		gridLineWidth : 0,
		opposite : true
	} ];
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
		$(chart.renderTo).find(".highcharts-xaxis-labels text").each(function(i, v) {
			if (chart.xAxis[0].categories[i].length > 7) {
				$(this).html("<title>" + chart.xAxis[0].categories[i] + "</title>" + $.trim(chart.xAxis[0].categories[i].substring(0, 7)) + "…");
			} else {
				$(this).html(chart.xAxis[0].categories[i]);
			}
		});
		
		/*$(chart.series).each(function(i, serie) {
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
		});*/
	};
            //옵션  변경  배천규 20221214

	AdministStatsChart.ui.makeCombinationsChart(opt);
}

/* 하드코딩 : TBL_ID 2개 이상 사용 */
/**
 * @name more2Chart8
 * @description 퇴직연금 차트8
 */
function more2Chart8(data, params) {

	const toJson1 = $administStatsMain.util.arrayToJson({
		data : data[params[0].tbl_id_list],
		key : "OV_L1_ID"
	});
	const toJson2 = $administStatsMain.util.arrayToJson({
		data : data[params[1].tbl_id_list],
		key : "OV_L1_ID"
	});

	let series = [ {
		innerSize : "0%",
		enableMouseTracking : false,
		data : [ {
			name : "전체 가입자",
			y : toJson1[$administStatsMain.ui.selectedYear]["0"].DTVAL_CO,
			color : "#FFFFFF",
			dataObj : toJson1[$administStatsMain.ui.selectedYear]["0"]
		} ],
		dataLabels : {
			useHTML : true,
			distance : -72.5,            //옵션  변경  배천규 20221214
			headerFormat : "",
			pointFormat : "{point.name}<br />{point.y:,0f}&nbsp;명",
			footerFormat : "",
			style : {
				textAlign : "center",
				color : "#000000"
			}
		}
	}, {
		innerSize : "60%",            //옵션  변경  배천규 20221214
		data : [ {
			name : "추가 가입자",
			y : toJson2[$administStatsMain.ui.selectedYear]["0"].DTVAL_CO,
			//color : AdministStatsChart.consts.sliceHighlightColor,
			color : "#169EDA",            //옵션  변경  배천규 20221214
			dataObj : toJson2[$administStatsMain.ui.selectedYear]["0"],
			dataLabels : {
				style : {
					//color : AdministStatsChart.consts.sliceHighlightColor
					color : "#151B7E",            //옵션  변경  배천규 20221214
				}
			}
		}, {
			name : "기존 가입자",
			y : toJson1[$administStatsMain.ui.selectedYear]["0"].DTVAL_CO - toJson2[$administStatsMain.ui.selectedYear]["0"].DTVAL_CO,
			color : "#F9A61A",            //옵션  변경  배천규 20221214
			dataObj : toJson1[$administStatsMain.ui.selectedYear]["0"]
		} ]
	} ];

	let exportingSeries = [];
	exportingSeries.push(_.cloneDeep(series[0]));
	exportingSeries.push(_.cloneDeep(series[1]));
	exportingSeries[0].dataLabels.distance = -180;

	let opt = {};
	opt.chartId = params[0].opt_chartId;
	opt.chartType = params[0].opt_chartType;
	opt.title = params[0].opt_chartNm;
	opt.series = series;
	opt.pie = {
		size : "70%",            //옵션  변경  배천규 20221214
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
		if ($.inArray(that.point.name, [ "계" ]) > -1) {
			return false;
		}
		return $administStatsMain.util.addComma(that.point.y) + " 명";
	};
	opt.dataLabelsFormatter = function(that) {
		return that.point.name + "<br />" + that.point.percentage.toFixed(1) + " %";
	};
	opt.exportingDataLabelsFormatter = function(that) {
		return opt.dataLabelsFormatter(that) + (!opt.tooltipFormatter(that) ? "" : "<br />(" + opt.tooltipFormatter(that) + ")");
	};
	AdministStatsChart.ui.makeChart(opt);
}

/* 하드코딩 : TBL_ID 2개 이상 사용 */
/**
 * @name more2Chart9
 * @description 퇴직연금 차트9
 */
function more2Chart9(data, params) {

	const toJson1 = $administStatsMain.util.arrayToJson({
		data : data[params[0].tbl_id_list],
		key : "OV_L1_ID"
	});
	const toJson2 = $administStatsMain.util.arrayToJson({
		data : data[params[1].tbl_id_list],
		key : "OV_L1_ID"
	});

	const colors = [ "#151B7E", "#1D44C6", "#0A79FB", "#7DB9FF"].reverse();            //옵션  변경  배천규 20221214
	let series = [];

	Object.keys(toJson2[$administStatsMain.ui.selectedYear]).sort().forEach(function(OV_L1_ID) {
		const v = toJson2[$administStatsMain.ui.selectedYear][OV_L1_ID];
		if (OV_L1_ID != "0") {
			series.push({
				name : (function() {
					switch (OV_L1_ID) {
						case "1":
							return "자영업자";
							break;
						case "2":
							return "단시간근로";
							break;
						case "3":
							return "퇴직금제도";
							break;
						case "4":
							return "직역연금";
							break;
					}
				}()),
				data : [ {
					y : (v.DTVAL_CO / toJson2[$administStatsMain.ui.selectedYear]["0"].DTVAL_CO) * 100,
					dataObj : v
				} ],
				DTVAL_CO : (v.DTVAL_CO / toJson2[$administStatsMain.ui.selectedYear]["0"].DTVAL_CO) * 100,
			});
		}
	});

	series = $administStatsMain.util.sortJSON(series, "DTVAL_CO", "desc");

	for (let i = 0; i < series.length; i++) {
		series[i].color = colors[i];
	}

	let opt = {};
	opt.chartId = params[0].opt_chartId;
	opt.chartType = params[0].opt_chartType;
	opt.title = params[0].opt_chartNm;
	opt.series = series;
	opt.xAxis = {
		type : "category",
		title : {
			enabled : true,
			text : "추가 가입자 비중",
			style : {
				//color : AdministStatsChart.consts.sliceHighlightColor
				color: "#151B7E",            //옵션  변경  배천규 20221214
			}
		},
		labels : {
			enabled : false,
		}
	};
	opt.seriesShowInLegend = true;
	opt.stacking = "percent";
	opt.legend = {
		enabled : false,
		align : "right",
		verticalAlign : "top",
		layout : "vertical",
		itemMarginTop : 2,
		itemMarginBottom : 2
	};
	opt.tooltipFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.dataObj.DTVAL_CO) + " 명";
	};
	opt.dataLabelsTextOutline = true;
	opt.dataLabelsInside = true;
	opt.dataLabelsFormatter = function(that) {
		return that.series.name + " "+ that.point.y.toFixed(1) + " %";            //옵션  변경  배천규 20221214
	};
	AdministStatsChart.ui.makeChart(opt);
}

/* 하드코딩 : 항목끼리 계산 */
/**
 * @name more2Chart10
 * @description 퇴직연금 차트10
 */
function more2Chart10(data, params) {

	const toJson = $administStatsMain.util.setVariance($administStatsMain.util.setAnother($administStatsMain.util.setAnother($administStatsMain.util.arrayToJson({
		data : data[params[0].tbl_id_list],
		key : "OV_L1_ID",
		key2 : "OV_L2_ID"
	}), {
		prefixKey : "OV_L1",
		level : "1",
		arr : [ {
			evalStr : "$02$+$03$",
			title : "20대(20~29세)",
			id : "CUSTOM02"
		}, {
			evalStr : "$04$+$05$",
			title : "30대(30~39세)",
			id : "CUSTOM03"
		}, {
			evalStr : "$06$+$07$",
			title : "40대(40~49세)",
			id : "CUSTOM04"
		}, {
			evalStr : "$08$+$09$",
			title : "50대(50~59세)",
			id : "CUSTOM05"
		}, {
			evalStr : "$10$+$11$",
			title : "60세이상",
			id : "CUSTOM06"
		} ]
	}), {
		prefixKey : "OV_L2",
		arr : [ {
			evalStr : "$1$",
			id : "CUSTOM01"
		}, {
			evalStr : "$2$",
			title : "주거임차",
			id : "CUSTOM02"
		}, {
			evalStr : "$3$",
			id : "CUSTOM03"
		}, {
			evalStr : "$4$+$5$+$6$+$7$",
			title : "기타(회생, 파산 등)",
			id : "CUSTOM04"
		} ]
	}));
	let series = [
		
		
	];

	/* [PRD_DE]현재년도 [OV_L2_ID]중도인출사유별 */
	const curYear = $administStatsMain.ui.selectedYear;
	Object.keys(toJson[curYear]["CUSTOM02"]).sort().forEach(function(OV_L2_ID) {
		if (OV_L2_ID.indexOf("CUSTOM") > -1) {
			series.push({
				name : toJson[curYear]["CUSTOM02"][OV_L2_ID].OV_L2_KOR,
				type : "line",
				data : (function(OV_L2_ID) {
					let dataArr = [];
					/* [PRD_DE]현재년도 [OV_L1_ID]연령별 */
					Object.keys(toJson[curYear]).sort().forEach(function(OV_L1_ID) {
						if (OV_L1_ID.indexOf("CUSTOM") > -1) {
							dataArr.push({
								y : toJson[curYear][OV_L1_ID][OV_L2_ID].DTVAL_CO,
								dataObj : toJson[curYear][OV_L1_ID][OV_L2_ID]
							});
						}
					});
					return dataArr;
				})(OV_L2_ID)
			});
		}
	});

	let opt = {};
	opt.chartId = params[0].opt_chartId;
	opt.title = params[0].opt_chartNm;
	opt.series = series;
	opt.xAxis = {
		categories : [ "20대(20~29세)", "30대(30~39세)", "40대(40~49세)", "50대(50~59세)", "60세이상" ]
	};
	opt.yAxis = {
		title : {
			enabled : true,
			text : "(명)",
			align : "high",
			offset : 10,
			rotation : 0,
			y : -10
		},
		labels : {
			enabled : true,
		},
		gridLineWidth : 1,
		startOnTick : false,
		endOnTick : false
	};

            //옵션  변경  배천규 20221214
	opt.tooltip = {
		style : {
			fontSize: "13px",
		},
			
	};
	opt.tooltipFormatter = function(that) {
		return $administStatsMain.util.getVarianceText({
			prefix : that.point.dataObj.OV_L2_KOR + " 증감율<br />",
			val : that.point.dataObj.roc,
			digits : 1,
			unit : "%",
			postfixs : [ "증가 ↑", "감소 ↓" ]
		});
	};
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.y) + " 명";
	};
	opt.colors = [ "#8CC63E", "#F9A61A", "#169EDA", "#FFE93D" ];            //옵션  변경  배천규 20221214
	opt.exportingSeries = [ {
		dataLabels : {
			enabled : true,
			align : "right",
			verticalAlign : "bottom",
			color : opt.colors[0]
		}
	}, {
		dataLabels : {
			enabled : true,
			align : "right",
			verticalAlign : "top",
			color : opt.colors[1]
		}
	}, {
		dataLabels : {
			enabled : true,
			align : "right",
			verticalAlign : "bottom",
			color : opt.colors[2]
		}
	}, {
		dataLabels : {
			enabled : true,
			align : "left",
			verticalAlign : "bottom",
			color : opt.colors[3]
		}
	} ];
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
	opt.callback = function(that, chart) {
		$(chart.series).each(function(i, serie) {
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
		});
	};
	AdministStatsChart.ui.makeCombinationsChart(opt);
}
