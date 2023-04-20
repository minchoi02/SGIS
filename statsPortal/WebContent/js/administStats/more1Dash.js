/**
 * 행정통계시각화 대쉬보드 > 통계더보기 > 일자리
 */
(function(W, D) {
	W.$more1Dash = W.$more1Dash || {};

	$(document).ready(function() {
	});

	$(window).scroll(function() {
	});

	$(window).resize(function() {
	});

	$more1Dash.consts = {},

	$more1Dash.ui = {

		/**
		 * @name init
		 * @description 최초 화면을 초기화(각 화면을 로딩)
		 */
		init : function() {
			$administStatsMain.ui.chartSaveClear();
			$administStatsMain.ui.removeContent();
			$administStatsMain.ui.appendContent("/view/administStats/more1Dash/main");
		},

		/**
		 * @name ready
		 * @description 최초 화면을 초기화(각 화면을 로딩)
		 */
		ready : function() {
			$administStatsMain.ui.dftRegnParam = null;
			$administStatsMain.ui.selectedYear = $("#searchYear option:selected").val(); // 초기화면 년도 추가 배천규  20221214
			$administStatsMain.ui.dftTmsrParam = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["12"]), {
				surv_year_list : $administStatsMain.ui.dftYears.join(","),
				tmsr_chartId : "tmsrChart",
				tmsr_title : $administStatsMain.ui.apiParam["12"].opt_chartNmByYear,
				tmsr_dataKey : $administStatsMain.ui.apiParam["12"].opt_dispDataKey,
				tmsr_nameKey : $administStatsMain.ui.apiParam["12"].opt_dispNameKey,
				tmsr_colors : [ "#BCBCBC", "#728CC7", "#2FB9BC" ]
			})
			$administStatsMain.ui.selTmsrParam = $administStatsMain.ui.dftTmsrParam;

			$administStatsMain.ui.dftTmsrParam2 = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["13"]), {
				surv_year_list : $administStatsMain.ui.dftYears.join(","),
				tmsr_chartId : "tmsrChart2",
				tmsr_title : $administStatsMain.ui.apiParam["13"].opt_chartNmByYear,
				tmsr_dataKey : $administStatsMain.ui.apiParam["13"].opt_dispDataKey,
				tmsr_nameKey : $administStatsMain.ui.apiParam["13"].opt_dispNameKey,
				tmsr_colors : [ "#2FB9BC" ],
				opt_fnCalc : function(data) {
					let datas = [];
					for (let i = 0; i < data.length; i++) {
						let s = data[i];
						s.DTVAL_CO = s.DTVAL_CO * 1;
						for (let j = 0; j < data.length; j++) {
							let t = data[j];
							t.DTVAL_CO = t.DTVAL_CO * 1;
							if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID) {
								if (s.OV_L2_ID == "30" && t.OV_L2_ID == "40") {
									s.DTVAL_CO = (s.DTVAL_CO - t.DTVAL_CO).toFixed(1);
									s.OV_L2_KOR = "일자리";
									s.dispUnitNm = "만개";
									datas.push(s);
								}
							}
						}
					}
					return datas;
				}
			});
                                    //차트 제외 배천규 221214
			//$administStatsMain.ui.selTmsrParam2 = $administStatsMain.ui.dftTmsrParam2;

			setTimeout(function() {
				$more1Dash.event.allChange();
			}, 50);
		}

	};

	$more1Dash.util = {};

	$more1Dash.event = {

		/**
		 * @name allChange
		 * @description 지역경계 클릭시 모든 차트데이터 변경작업
		 */
		allChange : function() {

			let param = {};

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["1"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				opt_chartId : "more1Chart1",
				opt_digits : 1,
				opt_colors : [ "#27AEF1", "#FF748E" ] // 색상수정 배천규  20221214
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				more1PieChart1(data, _.cloneDeep(param));
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["2"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				opt_chartId : "more1Chart2",
				opt_digits : 1,
				opt_colors : [ "#0078D5", "#27AEF1", "#FF748E" ] //색상수정  배천규 221214
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				more1PieChart1(data, _.cloneDeep(param));
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["3"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				opt_chartId : "more1Chart3",
				opt_digits : 1
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				more1Chart3(data, _.cloneDeep(param));
			});

			/* TODO 행정통계시각화 관리자화면 완료 시 DB 데이터 등록 후 소스 수정해야함 */
			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				tbl_id_list : "DT_1EP_3001",
				char_itm_id_list : "T00",
				ov_l1_list : "00,10,20,30,40",
				ov_l2_list : "00",
				opt_chartId : "more1Chart4",
				opt_chartType : "pie",  //차트 변경 배천규 221214
				opt_chartNm : "조직형태별",
				opt_tblIds : [ "DT_1EP_3001" ],
				opt_digits : 1
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				more1Chart4(data, _.cloneDeep(param));
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["5"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				opt_chartId : "more1Chart5",
				opt_digits : 1
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				more1Chart5(data, _.cloneDeep(param));
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["6"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				opt_chartId : "more1Chart6",
				opt_digits : 1
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				more1Chart6(data, _.cloneDeep(param));
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["7"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				opt_chartId : "more1Chart7",
				opt_digits : 1
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				//more1Chart7(data, _.cloneDeep(param)); //차트 제외 배천규 221214
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["8"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				opt_chartId : "more1Chart8",
				opt_digits : 1
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				//more1Chart8(data, _.cloneDeep(param)); //차트 제외 배천규 221214
			});

                                    //카드 추가  배천규 221214
			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["12"]), { 
				surv_year_list : $administStatsMain.ui.dftYears.join(","),
				opt_chartId : "more1Card1",
				opt_digits : 1
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				more1Card1(data, _.cloneDeep(param));
			});
			
			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["2"]), {
				surv_year_list : $administStatsMain.ui.dftYears.join(","),
				opt_chartId : "more1Card2",
				opt_digits : 1
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				more1Card2(data, _.cloneDeep(param));
			});
			
			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
				surv_year_list : $administStatsMain.ui.dftYears.join(","),
				opt_chartId : "more1Card3",
				tbl_id_list : "DT_1EP_3001",
				char_itm_id_list : "T00",
				ov_l1_list : "00,10,20,30,40",
				ov_l2_list : "00",
				opt_chartNm : "조직형태별",
				opt_tblIds : [ "DT_1EP_3001" ],
				opt_digits : 1
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				more1Card3(data, _.cloneDeep(param));
			});
			
			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["5"]), {
				surv_year_list : $administStatsMain.ui.dftYears.join(","),
				opt_chartId : "more1Card4",
				opt_digits : 1
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				more1Card4(data, _.cloneDeep(param));
			});
			
			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["5"]), {
				surv_year_list : $administStatsMain.ui.dftYears.join(","),
				opt_chartId : "more1Card5",
				opt_digits : 1
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				more1Card5(data, _.cloneDeep(param));
			});
			
			
			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["9"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				opt_chartId : "more1Chart9",
				opt_digits : 1
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				more1Chart9(data, _.cloneDeep(param));
			});

			/* TODO 행정통계시각화 관리자화면 완료 시 DB 데이터 등록 후 소스 수정해야함 */
			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiTmpl), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				tbl_id_list : "DT_1EP_3001",
				char_itm_id_list : "T00",
				ov_l1_list : "10,20,30,40",
				ov_l2_list : "00,30,40",
				opt_chartId : "more1Chart10",
				opt_chartType : "pie",
				opt_chartNm : "조직형태별",
				opt_tblIds : [ "DT_1EP_3001" ],
				opt_digits : 1
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				//more1Chart10(data, _.cloneDeep(param));
			});

			param = $.extend(true, _.cloneDeep($administStatsMain.ui.apiParam["11"]), {
				surv_year_list : $administStatsMain.ui.selectedYear + "," + ($administStatsMain.ui.selectedYear - 1),
				opt_chartId : "more1Chart11",
				opt_digits : 1
			});
			$administStatsMain.util.getTotsurvStatData(param, function(data) {
				more1Chart11(data, _.cloneDeep(param));
			});

                                    //시계열 차트 제외로 인한 주석   배천규 221214

			//AdministStatsChart.ui.makeTmsrChart($administStatsMain.ui.selTmsrParam);
			//AdministStatsChart.ui.makeTmsrChart($administStatsMain.ui.selTmsrParam2);

			setTimeout(function() {
				$administStatsMain.ui.loading(false);
			}, 2000);
		}
	};

}(window, document));

/**
 * @name more1Chart1
 * @description 일자리 차트1
 */
function more1PieChart1(data, param) {

	const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key : param.opt_dispDataKey
	});

            //추가 배천규 221214
	
	const toJson2 = $administStatsMain.util.arrayToJson({
		data : data,
		key : "OV_L1_ID",
		key2 : "OV_L2_ID"
	});
	
	
	let sum = null;
	let datas = [];
	
	let rmndrCo = 0;
	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(dataKey) {
		const v = toJson[$administStatsMain.ui.selectedYear][dataKey];
		//console.log(Number(v.DTVAL_CO.toFixed(1)))
		if (v.subsumYn == "Y" && $administStatsMain.util.isEmpty(sum)) {
			sum = v;
		} else {
			datas.push(v);
			rmndrCo += Number(v.DTVAL_CO.toFixed(1));
		}
	});
	
	//시리즈 추가 배천규 221214
	let series2 = [ {
		data : []
	}];
	
	const colors = ["#013387", "#27AEF1", "#0078D5", "#FF748E"];
	
	
	Object.keys(toJson2[$administStatsMain.ui.selectedYear]).sort().forEach(function(OV_L1_ID) {
		 
			if($administStatsMain.ui.selectedYear == "2016"){ 
				if (OV_L1_ID != "00") {
					series2[0].data.push({
						dataObj : toJson2[$administStatsMain.ui.selectedYear][OV_L1_ID],
						y : "전년 자료 없음",
					});
				}
			}else {
				if (OV_L1_ID != "00") {
					series2[0].data.push({
						dataObj : toJson2[$administStatsMain.ui.selectedYear][OV_L1_ID],
						y : toJson2[$administStatsMain.ui.selectedYear][OV_L1_ID]["00"].DTVAL_CO - toJson2[$administStatsMain.ui.selectedYear -1][OV_L1_ID]["00"].DTVAL_CO,
						x : ((toJson2[$administStatsMain.ui.selectedYear][OV_L1_ID]["00"].DTVAL_CO - toJson2[$administStatsMain.ui.selectedYear -1][OV_L1_ID]["00"].DTVAL_CO)/toJson2[$administStatsMain.ui.selectedYear -1][OV_L1_ID]["00"].DTVAL_CO)*100,
					});
				}
			}
		
	});
	
	let series = [ {
		innerSize : "0%",
		cursor : (function() {
			if (sum.clickEventYn == "Y") {
				return "default";
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
					return "#FFFFFF";
				} else {
					return "#FFFFFF"; //색상변경 배천규 220212
				}
			}()),
			dataObj : sum,
		} ],
		dataLabels : {
			useHTML : true,
			distance : -80,//위치변경 배천규 220212
			headerFormat : "",
			pointFormat : "{point.name}<br />{point.y:,0f}&nbsp;" + param.opt_dispUnitNm,
			footerFormat : "",
			style : {
				textAlign : "center",
				color : "#000000",	
				fontSize:'12px', //폰트사이즈 변경 배천규 220212
			}
		},
		
	}, {
		innerSize : "50%",
		data : (function() {
			let arr = [];
			for (let i = 0; i < datas.length; i++) {
				const v = datas[i];
				arr.push({
					name : v[param.opt_dispNameKey],
					y : v.DTVAL_CO,
					color : param.opt_colors[i],
					dataObj : v
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
	
	
    //카드 셋팅 배천규 220212

	$("#cardSetYear").empty();
	$("#cardSetYear").append($administStatsMain.ui.selectedYear);
	$("#cardSetTotal").empty();
	$("#cardSetTotal").append(sum.DTVAL_CO);
	
	
	let exportingSeries = [];
	exportingSeries.push(_.cloneDeep(series[0]));
	exportingSeries.push(_.cloneDeep(series[1]));
	exportingSeries[0].dataLabels.distance = -150;

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.filename = $(".sb_year option:selected").text() + " " + param.opt_chartNm + " 일자리 규모";
	opt.series = series;
	opt.cursor = "default"; //pointer 변경  배천규 220212
	opt.pie = {
		size : "80%",
		center : [ "50%", "50%" ]
	};	
            //툴팁 추가 배천규 220212
	//증감률
	opt.tooltipFormatter = function(that) {
		//console.log(that)
		if(that.key =="임금근로일자리"){
			if(that.point.dataObj.PRD_DE == "2016"){
				return "<span class='fs11 cBlack'>전년자료없음</span>";
			}else {
				
				if(series2[0].data[0].y  > 0){
					return "<span class='fs11 cBlack'>전년대비 <span class='cRed'>"+$administStatsMain.util.addComma(series2[0].data[0].x.toFixed(1)) +"%(" + $administStatsMain.util.addComma(series2[0].data[0].y.toFixed(1)) + "만개) 증가</span</span>";
				}else if(series2[0].data[0].y  < 0){
					return "<span class='fs11 cBlack'>전년대비 <span class='cBlue'>"+$administStatsMain.util.addComma(series2[0].data[0].x.toFixed(1)) +"%(" + $administStatsMain.util.addComma(series2[0].data[0].y.toFixed(1)) + "만개) 감소</span</span>";
				}else {
					return "<span class='fs11 cBlack'>변동없음</span";
				}
			}
			
		}else if(that.key =="비임금근로일자리"){
			if(that.point.dataObj.PRD_DE == "2016"){
				return "<span class='fs11 cBlack'>전년자료없음</span>";
			}else {
				if(series2[0].data[1].y  > 0){
					return "<span class='fs11 cBlack'>전년대비 <span class='cRed'>"+$administStatsMain.util.addComma(series2[0].data[1].x.toFixed(1)) +"%(" + $administStatsMain.util.addComma(series2[0].data[1].y.toFixed(1)) + "만개) 증가</span</span>";
				}else if(series2[0].data[0].y  < 0){
					return "<span class='fs11 cBlack'>전년대비 <span class='cBlue'>"+$administStatsMain.util.addComma(series2[0].data[1].x.toFixed(1)) +"%(" + $administStatsMain.util.addComma(series2[0].data[1].y.toFixed(1)) + "만개) 감소</span</span>";
				}else {
					return "<span class='fs11 cBlack'>변동없음</span";
				}
			}
			
		}else if(that.key =="대기업"){
			if(that.point.dataObj.PRD_DE == "2016"){
				return "<span class='fs11 cBlack'>전년자료없음</span>";
			}else {
				if(series2[0].data[0].y  > 0){
					return "<span class='fs11 cBlack'>전년대비 <span class='cRed'>"+$administStatsMain.util.addComma(series2[0].data[0].x.toFixed(1)) +"%(" + $administStatsMain.util.addComma(series2[0].data[0].y.toFixed(1)) + "만개) 증가</span</span>";
				}else if(series2[0].data[0].y  < 0){
					return "<span class='fs11 cBlack'>전년대비 <span class='cBlue'>"+$administStatsMain.util.addComma(series2[0].data[0].x.toFixed(1)) +"%(" + $administStatsMain.util.addComma(series2[0].data[0].y.toFixed(1)) + "만개) 감소</span</span>";
				}else {
					return "<span class='fs11 cBlack'>변동없음</span";
				}
			}
			
		}else if(that.key =="중소기업"){
			if(that.point.dataObj.PRD_DE == "2016"){
				return "<span class='fs11 cBlack'>전년자료없음</span>";
			}else {
				if(series2[0].data[1].y  > 0){
					return "<span class='fs11 cBlack'>전년대비 <span class='cRed'>"+$administStatsMain.util.addComma(series2[0].data[1].x.toFixed(1)) +"%(" + $administStatsMain.util.addComma(series2[0].data[1].y.toFixed(1)) + "만개) 증가</span</span>";
				}else if(series2[0].data[0].y  < 0){
					return "<span class='fs11 cBlack'>전년대비 <span class='cBlue'>"+$administStatsMain.util.addComma(series2[0].data[1].x.toFixed(1)) +"%(" + $administStatsMain.util.addComma(series2[0].data[1].y.toFixed(1)) + "만개) 감소</span</span>";
				}else {
					return "<span class='fs11 cBlack'>변동없음</span";
				}
			}
			
		}else if(that.key =="비영리기업"){
			if(that.point.dataObj.PRD_DE == "2016"){
				return "<span class='fs11 cBlack'>전년자료없음</span>";
			}else {
				if(series2[0].data[1].y  > 0){
					return "<span class='fs11 cBlack'>전년대비 <span class='cRed'>"+$administStatsMain.util.addComma(series2[0].data[2].x.toFixed(1)) +"%(" + $administStatsMain.util.addComma(series2[0].data[2].y.toFixed(1)) + "만개) 증가</span>";
				}else if(series2[0].data[0].y  < 0){
					return "<span class='fs11 cBlack'>전년대비 <span class='cRed'>"+$administStatsMain.util.addComma(series2[0].data[2].x.toFixed(1)) +"%(" + $administStatsMain.util.addComma(series2[0].data[2].y.toFixed(1)) + "만개) 감소</span>";
				}else {
					return "<span class='fs11 cBlack'>변동없음</span>";
				}
			}
			
		}
		
	};
	
	opt.dataLabelsFormatter = function(that ) {
		
		//console.log(that)
		const prefix2 = that.point.total;
		const cn1 = that.point.y
		return "<span class='fs14'>"+$administStatsMain.util.setFixedByDigits({
			prefix : $administStatsMain.util.addComma(cn1.toFixed(1)) + "만개<br />",
			val : that.point.percentage,
			digits : 1,
			unit : "%"
		}) + "</span>";
	};
	opt.dataLabelsTextOutline = true;
	opt.exporting = {
		chartOptions : {
			plotOptions : {
				pie : {
					size : "50%"
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
	/*opt.eventClick = function(e, that) {
		const selTmsrParam = $.extend(true, _.cloneDeep(param), {
			surv_year_list : $administStatsMain.ui.dftYears.join(","),
			tmsr_chartId : "tmsrChart",
			tmsr_title : param.opt_chartNm + " 일자리 규모",
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
			selTmsrParam : selTmsrParam
		});
	};*/
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

/* 하드코딩 : 항목끼리 계산 */
/**
 * @name more1Chart3
 * @description 일자리 차트3
 */
function more1Chart3(data, param) {

	const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key : param.opt_dispDataKey,
	});
	const colors = [ "#013387", "#0078D5", "#60C0EC", "#64B5F6", "#C9DFFF", "#CED4DA"]; //색상 변경  배천규 220212
	let series = [ {
		data : []
	} ];
	let resultArr = [];

	let sumKey = {};
	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(dataKey) {
		if (toJson[$administStatsMain.ui.selectedYear][dataKey].subsumYn == "Y") {
			sumKey = dataKey;
		}
	});
	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(dataKey) {
		if (toJson[$administStatsMain.ui.selectedYear][dataKey].subsumYn != "Y") {
			resultArr.push({
				name : toJson[$administStatsMain.ui.selectedYear][dataKey][param.opt_dispNameKey],
				value : toJson[$administStatsMain.ui.selectedYear][dataKey].DTVAL_CO,
				per : toJson[$administStatsMain.ui.selectedYear][dataKey].DTVAL_CO / toJson[$administStatsMain.ui.selectedYear][sumKey].DTVAL_CO * 100,
			});
		}
	});

	resultArr = $administStatsMain.util.sortJSON(resultArr, "value", "desc");

	let otherSum = 0;
	for (let i = 0; i < resultArr.length; i++) {
		if (i < 5) {//카운트 변경  배천규 220212
			series[0].data.push(resultArr[i]);
		} else {
			otherSum += resultArr[i].value;
		}
	}

	series[0].data.push({
		name : "기타",
		value : otherSum,
		per : otherSum / toJson[$administStatsMain.ui.selectedYear][sumKey].DTVAL_CO * 100
	});

	series[0].data = $administStatsMain.util.sortJSON(series[0].data, "value", "desc");

	for (let i = 0; i < series[0].data.length; i++) {
		series[0].data[i].colorValue = (i + 1);
		series[0].data[i].color = colors[i];
		series[0].data[i].dataLabels = {
			overflow : "justify"
		};
	}

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.filename = $(".sb_year option:selected").text() + " " + param.opt_chartNm + " 일자리 규모";
	opt.series = series;
	opt.tooltipFormatter = function(that) {
		//return $administStatsMain.util.addComma(that.point.value.toFixed(1)) + " " + param.opt_dispUnitNm;
		return false; //툴팁사용안함   배천규 220212
	};
	opt.dataLabelsTextOutline = true;
	
            //레이블 커스텀   배천규 220212
	opt.dataLabelsFormatter = function(that) {
		//console.log(that)
		if (that.point.shapeArgs.height > 15) {
			return "<span class='fs11'>"+that.point.name + "<br />" + that.point.per.toFixed(1) + " % " +that.point.value.toFixed(1) + "만개</span>";
		} else {
			return "<span class='fs11'>"+that.point.name + " " + that.point.per.toFixed(1) + " % " +that.point.value.toFixed(1) + "만개</span>";
		}
	};
	opt.exportingDataLabelsFormatter = function(that) {
		return opt.dataLabelsFormatter(that) + "<br />(" + opt.tooltipFormatter(that) + ")";
	};
	opt.isBigExporting = true;
	AdministStatsChart.ui.makeChart(opt);
}

/**
 * @name more1Chart4
 * @description 일자리 차트4
 */
/* TODO 행정통계시각화 관리자화면 완료 시 DB 데이터 등록 후 소스 수정해야함 */
function more1Chart4(data, param) {

	const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key : "OV_L1_ID",
	});
	//시리즈 미사용  배천규 220212
	let series = [ {
		innerSize : "50%",
		data : [],
		
	}];	
	
	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(OV_L1_ID) {
		if (OV_L1_ID != "00") {
                                    //2016 예외 배천규 220212
			if($("#searchYear").val() =="2016"){
				series[0].data.push({
					name : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID].OV_L1_KOR,
					y : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID].DTVAL_CO / toJson[$administStatsMain.ui.selectedYear]["00"].DTVAL_CO * 100,
					x : '전년자료없음',
					dataObj : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID]
				});
				
			}else {
				series[0].data.push({
					name : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID].OV_L1_KOR,
					y : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID].DTVAL_CO / toJson[$administStatsMain.ui.selectedYear]["00"].DTVAL_CO * 100,
					x : ((toJson[$administStatsMain.ui.selectedYear][OV_L1_ID].DTVAL_CO - toJson[$administStatsMain.ui.selectedYear -1][OV_L1_ID].DTVAL_CO)/toJson[$administStatsMain.ui.selectedYear -1][OV_L1_ID].DTVAL_CO )* 100,
					dataObj : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID]
				});
			}
			
		}
	});
	
	
	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.filename = $(".sb_year option:selected").text() + " " + param.opt_chartNm + " 일자리 규모";
	opt.series = series;
            //수정 배천규 220212
	opt.pie = {
		size : "90%",
		/*startAngle : -90,
		endAngle : 90,*/
		//center : [ "50%", "100%" ]
	};
	opt.xAxis = {
		type : "category"
	};
	opt.yAxis = {
		max : 100
	}
            //옵션추가 및 수정 배천규 20221214
	opt.distance = -3;
	opt.colors = ["#013387", "#27AEF1", "#0078D5", "#FF748E"];
	opt.colorByPoint = true;
	opt.cursor = "default";
	opt.tooltipPositioner = true;
	opt.tooltipFormatter = function(that) {
                         //툴팁커스텀  배천규 20221214
		
		if(that.key =="회사법인"){
			if(that.point.dataObj.PRD_DE == "2016"){
				return "<span class='fs11 cBlack'>전년자료없음</span>";
			}else {
				
				if(series[0].data[0].y  > 0){
					return "<span class='fs11 cBlack'>전년대비 <span class='cRed'>"+$administStatsMain.util.addComma(series[0].data[0].x.toFixed(1)) +"%(" + $administStatsMain.util.addComma(series[0].data[0].y.toFixed(1)) + "만개) 증가</span</span>";
				}else if(series[0].data[0].y  < 0){
					return "<span class='fs11 cBlack'>전년대비 <span class='cBlue'>"+$administStatsMain.util.addComma(series[0].data[0].x.toFixed(1)) +"%(" + $administStatsMain.util.addComma(series[0].data[0].y.toFixed(1)) + "만개) 감소</span</span>";
				}else {
					return "<span class='fs11 cBlack'>변동없음</span";
				}
			}
		}else if(that.key =="회사이외법인"){
			if(that.point.dataObj.PRD_DE == "2016"){
				return "<span class='fs11 cBlack'>전년자료없음</span>";
			}else {
				
				if(series[0].data[0].y  > 0){
					return "<span class='fs11 cBlack'>전년대비 <span class='cRed'>"+$administStatsMain.util.addComma(series[0].data[1].x.toFixed(1)) +"%(" + $administStatsMain.util.addComma(series[0].data[1].y.toFixed(1)) + "만개) 증가</span</span>";
				}else if(series[0].data[0].y  < 0){
					return "<span class='fs11 cBlack'>전년대비 <span class='cBlue'>"+$administStatsMain.util.addComma(series[0].data[1].x.toFixed(1)) +"%(" + $administStatsMain.util.addComma(series[0].data[1].y.toFixed(1)) + "만개) 감소</span</span>";
				}else {
					return "<span class='fs11 cBlack'>변동없음</span";
				}
			}
		}else if(that.key =="정부 · 비법인단체"){
			if(that.point.dataObj.PRD_DE == "2016"){
				return "<span class='fs11 cBlack'>전년자료없음</span>";
			}else {
				
				if(series[0].data[0].y  > 0){
					return "<span class='fs11 cBlack'>전년대비 <span class='cRed'>"+$administStatsMain.util.addComma(series[0].data[2].x.toFixed(1)) +"%(" + $administStatsMain.util.addComma(series[0].data[2].y.toFixed(1)) + "만개) 증가</span</span>";
				}else if(series[0].data[0].y  < 0){
					return "<span class='fs11 cBlack'>전년대비 <span class='cBlue'>"+$administStatsMain.util.addComma(series[0].data[2].x.toFixed(1)) +"%(" + $administStatsMain.util.addComma(series[0].data[2].y.toFixed(1)) + "만개) 감소</span</span>";
				}else {
					return "<span class='fs11 cBlack'>변동없음</span";
				}
			}
		}else if(that.key =="개인기업체"){
			if(that.point.dataObj.PRD_DE == "2016"){
				return "<span class='fs11 cBlack'>전년자료없음</span>";
			}else {
				
				if(series[0].data[0].y  > 0){
					return "<span class='fs11 cBlack'>전년대비 <span class='cRed'>"+$administStatsMain.util.addComma(series[0].data[3].x.toFixed(1)) +"%(" + $administStatsMain.util.addComma(series[0].data[3].y.toFixed(1)) + "만개) 증가</span</span>";
				}else if(series[0].data[0].y  < 0){
					return "<span class='fs11 cBlack'>전년대비 <span class='cBlue'>"+$administStatsMain.util.addComma(series[0].data[3].x.toFixed(1)) +"%(" + $administStatsMain.util.addComma(series[0].data[3].y.toFixed(1)) + "만개) 감소</span</span>";
				}else {
					return "<span class='fs11 cBlack'>변동없음</span";
				}
			}
		}
		
	};
	
	opt.dataLabelsFormatter = function(that) {
		return "<span class='fs14'>" + $administStatsMain.util.addComma(that.point.dataObj.DTVAL_CO) + "만개<br />" + that.point.y.toFixed(1) + " %</span>";
	};
	opt.dataLabelsTextOutline = true;
	opt.exportingDataLabelsFormatter = function(that) {
		return opt.dataLabelsFormatter(that) + "<br />(" + opt.tooltipFormatter(that) + ")";
	};
	
	/*opt.eventClick = function(e, that) {
		const selTmsrParam = $.extend(true, _.cloneDeep(param), {
			surv_year_list : $administStatsMain.ui.dftYears.join(","),
			ov_l1_list : "10,20,30,40",
			tmsr_chartId : "tmsrChart",
			tmsr_title : param.opt_chartNm + " 일자리 규모",
			tmsr_dataKey : "OV_L1_ID",
			tmsr_nameKey : "OV_L1_KOR",
			tmsr_colors : [ "#90C320", "#F6A347", "#2FB9BC", "#728CC7" ],
			tmsr_unit : "만개"
		});
		$administStatsMain.ui.chartItmClick({
			event : e,
			selTmsrParam : selTmsrParam
		});
	};*/
	AdministStatsChart.ui.makeChart(opt);
}

/* 하드코딩 : 항목끼리 계산 */
/**
 * @name more1Chart5
 * @description 일자리 차트5
 */
function more1Chart5(data, param) {

	for (let i = 0; i < data.length; i++) {
		let s = data[i];
		s.DTVAL_CO = s.DTVAL_CO * 1;
		for (let j = 0; j < data.length; j++) {
			let t = data[j];
			t.DTVAL_CO = t.DTVAL_CO * 1;
			if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID) {
				if (s.OV_L2_ID == "10") {
					s.OV_L2_ID = "CUSTOM01";
					s.OV_L2_KOR = "19세이하";
				} else if (s.OV_L2_ID == "20" && t.OV_L2_ID == "30") {
					s.OV_L2_ID = "CUSTOM02";
					s.OV_L2_KOR = "20~29세";
					s.DTVAL_CO += t.DTVAL_CO;
				} else if (s.OV_L2_ID == "40" && t.OV_L2_ID == "50") {
					s.OV_L2_ID = "CUSTOM03";
					s.OV_L2_KOR = "30~39세";
					s.DTVAL_CO += t.DTVAL_CO;
				} else if (s.OV_L2_ID == "60" && t.OV_L2_ID == "70") {
					s.OV_L2_ID = "CUSTOM04";
					s.OV_L2_KOR = "40~49세";
					s.DTVAL_CO += t.DTVAL_CO;
				} else if (s.OV_L2_ID == "80" && t.OV_L2_ID == "90") {
					s.OV_L2_ID = "CUSTOM05";
					s.OV_L2_KOR = "50~59세";
					s.DTVAL_CO += t.DTVAL_CO;
				} else if (s.OV_L2_ID == "100" && t.OV_L2_ID == "110") {
					s.OV_L2_ID = "CUSTOM06";
					s.OV_L2_KOR = "60세이상";
					s.DTVAL_CO += t.DTVAL_CO;
				}
			}
		}
	}
	let datas = [];
	for (let i = 0; i < data.length; i++) {
		let s = data[i];
		if (s.OV_L2_ID.indexOf("CUSTOM") > -1) {
			datas.push(s);
		}
	}

	const toJson = $administStatsMain.util.arrayToJson({
		data : datas,
		key : "OV_L1_ID",
		key2 : "OV_L2_ID"
	});
	let series = [];

	/* [PRD_DE]현재년도 [OV_L2_ID]연령대별 */
	const OV_L1_ID_0 = Object.keys(toJson[$administStatsMain.ui.selectedYear])[0];
	Object.keys(toJson[$administStatsMain.ui.selectedYear][OV_L1_ID_0]).sort().forEach(function(OV_L2_ID) {
		const v = toJson[$administStatsMain.ui.selectedYear][OV_L1_ID_0][OV_L2_ID];
		series.push({
			name : v.OV_L2_KOR,
			data : (function(OV_L2_ID) {
				let dataArr = [];
				/* [PRD_DE]현재년도 [OV_L1_ID]성별 */
				Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(OV_L1_ID) {
					dataArr.push({
						y : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID][OV_L2_ID].DTVAL_CO,
						dataObj : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID][OV_L2_ID],
						dataLabels : {
							x : (function() {
								if (OV_L2_ID == "CUSTOM01") {
									return 3;
								} else {
									return 10;
								}
							}())
						}
					});
				});
				return dataArr;
			})(OV_L2_ID)
		});
	});

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.filename = $(".sb_year option:selected").text() + " " + param.opt_chartNm + " 일자리 규모";
	opt.series = series.slice().reverse();
	opt.xAxis = {
		categories : [ "남자", "여자" ], //카테고리 커스텀으로 빈스트링대체 배천규 20221214
		//categories : [ " ", " " ]
		labels : {
			style : {
				color : '#fff',
			},
		},
	};
	opt.cursor = "default";
	opt.seriesShowInLegend = true;
	opt.dataLabelsInside = true;
	opt.dataLabelsTextOutline = true;
	opt.colors = [ "#CED4DA", "#C9DFFF", "#64B5F6", "#4390FF", "#1F60DE", "#013387" ].reverse();
	opt.stacking = "percent";
	opt.tooltipFormatter = function(that) {
		return false;
		//return that.series.name + "<br />" + $administStatsMain.util.addComma(that.point.y.toFixed(1)) + " 만개";
	};
	opt.dataLabelsFormatter = function(that) {
		return "<span class='fs11'>" + that.point.percentage.toFixed(1) + " % <br />"+ $administStatsMain.util.addComma(that.point.y.toFixed(1)) + " 만개</span>";
	};
	opt.exportingDataLabelsFormatter = function(that) {
		return "<span class='fs11'>" + opt.dataLabelsFormatter(that) + "<br />(" + $administStatsMain.util.addComma(that.point.y.toFixed(1)) + " 만개)</span>";
	};
	opt.isBigExporting = true;
	/*opt.eventClick = function(e, that) {
		const selTmsrParam = $.extend(true, _.cloneDeep(param), {
			surv_year_list : $administStatsMain.ui.dftYears.join(","),
			ov_l1_list : e.point.dataObj.OV_L1_ID,
			tmsr_chartId : "tmsrChart",
			tmsr_title : param.opt_chartNm + " 일자리 규모(" + e.point.dataObj.OV_L1_KOR + ")",
			tmsr_dataKey : "OV_L2_ID",
			tmsr_nameKey : "OV_L2_KOR",
			tmsr_colors : [ "#90C320", "#F6A347", "#2FB9BC", "#728CC7", "#B081B7", "#A3A8AB" ],
			opt_fnCalc : function(data) {
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					s.DTVAL_CO = s.DTVAL_CO * 1;
					for (let j = 0; j < data.length; j++) {
						let t = data[j];
						t.DTVAL_CO = t.DTVAL_CO * 1;
						if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID) {
							if (s.OV_L2_ID == "10") {
								s.OV_L2_ID = "CUSTOM01";
								s.OV_L2_KOR = "19세이하";
							} else if (s.OV_L2_ID == "20" && t.OV_L2_ID == "30") {
								s.OV_L2_ID = "CUSTOM02";
								s.OV_L2_KOR = "20~29세";
								s.DTVAL_CO += t.DTVAL_CO;
							} else if (s.OV_L2_ID == "40" && t.OV_L2_ID == "50") {
								s.OV_L2_ID = "CUSTOM03";
								s.OV_L2_KOR = "30~39세";
								s.DTVAL_CO += t.DTVAL_CO;
							} else if (s.OV_L2_ID == "60" && t.OV_L2_ID == "70") {
								s.OV_L2_ID = "CUSTOM04";
								s.OV_L2_KOR = "40~49세";
								s.DTVAL_CO += t.DTVAL_CO;
							} else if (s.OV_L2_ID == "80" && t.OV_L2_ID == "90") {
								s.OV_L2_ID = "CUSTOM05";
								s.OV_L2_KOR = "50~59세";
								s.DTVAL_CO += t.DTVAL_CO;
							} else if (s.OV_L2_ID == "100" && t.OV_L2_ID == "110") {
								s.OV_L2_ID = "CUSTOM06";
								s.OV_L2_KOR = "60세이상";
								s.DTVAL_CO += t.DTVAL_CO;
							}
						}
					}
				}
				let datas = [];
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					if (s.OV_L2_ID.indexOf("CUSTOM") > -1) {
						datas.push(s);
					}
				}
				return datas;
			}
		});
		$administStatsMain.ui.chartItmClick({
			event : e,
			selTmsrParam : selTmsrParam
		});
	};*/
	AdministStatsChart.ui.makeChart(opt);
}

/* 하드코딩 : 항목끼리 계산 */
/**
 * @name more1Chart6
 * @description 일자리 차트6
 */
function more1Chart6(data, param) {

	const toJson = $administStatsMain.util.setVariance($administStatsMain.util.arrayToJson({
		data : data,
		key : "OV_L2_ID"
	}));
	let series = [ {
		data : [],
		enableMouseTracking : false
	} ];

	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(OV_L2_ID) {
		const v = toJson[$administStatsMain.ui.selectedYear][OV_L2_ID];
		series[0].data.push({
			name : v.OV_L2_KOR,
			y : v.DTVAL_CO
		});
	});
	
	
	
	
	
	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.series = series;
            //레이블 커스텀  배천규 20221214
	opt.xAxis = {
		type : "category",
		labels : {
			style : {
				color : '#fff',
			},
		},
	};
	opt.yAxis = {
		max : series[0].data[0].y * 1.8,
		plotLines : [ {
			color : "#FE2432", //색상변경
			width : 2, //색상변경
			value : series[0].data[1].y,
			zIndex : 5,
			dashStyle : "ShortDash"
		} ]
	};
	opt.cursor = "pointer";
	opt.colors = [ "#FF748E", "#C9DFFF" ]; //색상변경 배천규 221214
	opt.colorByPoint = true;
	opt.annotations = [ {
		draggable : "",
		labels : [ {
			point : {
				x : 0,
				y : series[0].data[0].y,
				xAxis : 0,
				yAxis : 0
			},
			overflow : "justify",
			text : (function() {
				const y = series[0].data[0].y - series[0].data[1].y;
                                                //커스텀  배천규 221214
				if (y >= 0) {
					var returnText = "<span class='upClass'>일자리<br />" + $administStatsMain.util.addComma(Math.abs(y).toFixed(1)) + " 만개 증가</span> ";
					var returnText2 = "<span class='upClass'>" + $administStatsMain.util.addComma(Math.abs(y).toFixed(1)) + " 만개 증가</span> ";
				} else {
					var returnText = "<span class='downClass'>일자리<br />" + $administStatsMain.util.addComma(Math.abs(y).toFixed(1)) + " 만개 감소</span>";
					var returnText2 = "<span class='downClass'>" + $administStatsMain.util.addComma(Math.abs(y).toFixed(1)) + " 만개 감소</span>";
				}
				$("#cardSetReturnTxt").empty();
				$("#cardSetReturnTxt").append(returnText2);
				return returnText;
			})(),
			style : {
				fontSize : "12px",
				color : "#4f4f4f",
				fontWeight : "bold"
			}
		}],
                        //옵션변경  배천규 221214
		labelOptions : {
			borderRadius : 10,
			padding : 7,
			y : 25,
			x : 55,
			backgroundColor : "#FFFFFF",
			borderWidth : 1,
			borderColor : "#181818",
		},
		
	}];
	
	
	opt.tooltipFormatter = function(that) {
		return false;
	};
	opt.dataLabelsInside = true;
	opt.dataLabelsTextOutline = true;
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.y.toFixed(1)) + " 만개";
	};
	opt.callback = function(that, chart) {
		$(chart.renderTo).css("cursor", "default"); //옵션변경  배천규 221214
		/*if (!$(chart.renderTo).hasClass("hover_chart")) {
			$(chart.renderTo).addClass("hover_chart");
		}*/
		if ($._data($("#" + param.opt_chartId).find("[id^=highcharts]")[0], 'events') == null) {
			$(chart.renderTo).find("[id^=highcharts]").on("click", function() {
				const selTmsrParam2 = $.extend(true, _.cloneDeep(param), {
					surv_year_list : $administStatsMain.ui.dftYears.join(","),
					tmsr_chartId : "tmsrChart2",
					tmsr_title : param.opt_chartNm,
					tmsr_dataKey : "OV_L2_ID",
					tmsr_nameKey : "OV_L2_KOR",
					tmsr_colors : [ "#2FB9BC" ],
					opt_fnCalc : function(data) {
						let datas = [];
						for (let i = 0; i < data.length; i++) {
							let s = data[i];
							s.DTVAL_CO = s.DTVAL_CO * 1;
							for (let j = 0; j < data.length; j++) {
								let t = data[j];
								t.DTVAL_CO = t.DTVAL_CO * 1;
								if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID) {
									if (s.OV_L2_ID == "30" && t.OV_L2_ID == "40") {
										s.DTVAL_CO = s.DTVAL_CO - t.DTVAL_CO;
										s.OV_L2_KOR = "일자리";
										s.dispUnitNm = "만개";
										datas.push(s);
									}
								}
							}
						}
						return datas;
					}
				});
                                                //호환 클릭이벤트 제거   배천규 221214
				/*$administStatsMain.ui.chartItmClick({
					event : null,
					chartId : param.opt_chartId,
					selTmsrParam2 : selTmsrParam2
				});*/
			});
		}
	}
	AdministStatsChart.ui.makeChart(opt);
}

/**
 * @name more1Chart7
 * @description 일자리 차트7
 */
function more1Chart7(data, param) {

	const toJson = $administStatsMain.util.setVariance($administStatsMain.util.arrayToJson({
		data : data,
		key : param.opt_dispDataKey
	}));
	let series = [ {
		data : []
	} ];

	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(OV_L1_ID) {
		const v = toJson[$administStatsMain.ui.selectedYear][OV_L1_ID];
		series[0].data.push({
			name : v[param.opt_dispNameKey],
			y : v.DTVAL_CO,
			dataObj : v
		});
	});

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.filename = $(".sb_year option:selected").text() + " " + param.opt_chartNm + " 일자리 증감";
	opt.series = series;
	opt.cursor = "pointer";
	opt.marginRight = 100;
	opt.xAxis = {
		type : "category"
	};
	opt.colors = [ "#728CC7", "#2FB9BC" ];
	opt.colorByPoint = true;
	opt.tooltipFormatter = function(that) {
		return that.point.name + "<br />" + $administStatsMain.util.addComma(that.point.y.toFixed(1)) + " " + param.opt_dispUnitNm;
	};
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.getVarianceText({
			val : that.point.dataObj.iod,
			digits : 1,
			unit : param.opt_dispUnitNm,
			postfixs : [ "증가", "감소" ],
			noDataMsg : "전년 자료 없음",
			isColor : false
		});
	};
	opt.exportingDataLabelsFormatter = function(that) {
		return opt.dataLabelsFormatter(that) + "<br />(" + $administStatsMain.util.addComma(that.point.y.toFixed(1)) + " " + param.opt_dispUnitNm + ")";
	};
	opt.eventClick = function(e, that) {
		const selTmsrParam2 = $.extend(true, _.cloneDeep(param), {
			surv_year_list : $administStatsMain.ui.dftYears.join(","),
			tmsr_chartId : "tmsrChart2",
			tmsr_title : param.opt_chartNm + " 일자리 증감",
			tmsr_dataKey : param.opt_dispDataKey,
			tmsr_nameKey : param.opt_dispNameKey,
			tmsr_colors : [ "#728CC7", "#2FB9BC" ],
			opt_fnCalc : function(data) {
				let datas = [];
				for (let i = 0; i < data.length; i++) {
					let s = _.cloneDeep(data[i]);
					s.DTVAL_CO = s.DTVAL_CO * 1;
					for (let j = 0; j < data.length; j++) {
						let t = _.cloneDeep(data[j]);
						t.DTVAL_CO = t.DTVAL_CO * 1;
						if (s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID && s.OV_L2_ID == t.OV_L2_ID) {
							if ((s.PRD_DE - 1) == t.PRD_DE) {
								s.DTVAL_CO = s.DTVAL_CO - t.DTVAL_CO;
							} else if (s.PRD_DE == $(".sb_year option:last").val()) {
								s.DTVAL_CO = 0;
								s.NO_DATA = true;
							}
							datas.push(s);
						}
					}
				}
				return datas;
			}
		});
		$administStatsMain.ui.chartItmClick({
			event : e,
			selTmsrParam2 : selTmsrParam2
		});
	}
	AdministStatsChart.ui.makeChart(opt);
}

/* 하드코딩 : 항목끼리 계산 */
/**
 * @name more1Chart8
 * @description 일자리 차트8
 */
function more1Chart8(data, param) {

	const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key : "OV_L1_ID",
		key2 : "OV_L2_ID"
	});

	let series = [ {
		data : []
	} ];

	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(OV_L1_ID) {
		const v = toJson[$administStatsMain.ui.selectedYear][OV_L1_ID];
		series[0].data.push({
			name : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID]["00"].OV_L1_KOR,
			y : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID]["30"].DTVAL_CO - toJson[$administStatsMain.ui.selectedYear][OV_L1_ID]["40"].DTVAL_CO,
			dataObj : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID]["00"]
		});
	});

	const maxmin = $administStatsMain.util.sortJSON(series[0].data.slice(), "y", "desc");
	const max = maxmin[0].y;
	const min = maxmin[maxmin.length - 1].y;

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.filename = $(".sb_year option:selected").text() + " " + param.opt_chartNm + " 일자리 증감";
	opt.series = series;
	opt.cursor = "pointer";
	opt.marginRight = 100;
	opt.xAxis = {
		type : "category"
	};
	opt.yAxis = {
		min : (function() {
			if (min < 0 && min >= -50) {
				return -50;
			} else if (min < 0) {
				return min;
			} else {
				return 0;
			}
		}()),
		max : max,
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
	opt.colors = [ "#728CC7", "#2FB9BC", "#B081B7" ];
	opt.colorByPoint = true;
	opt.tooltipFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.dataObj.DTVAL_CO.toFixed(1)) + " 만개";
	};
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.getVarianceText({
			val : that.point.y,
			digits : 1,
			unit : "만개",
			postfixs : [ "증가", "감소" ],
			noDataMsg : "전년 자료 없음",
			isColor : false
		});
	};
	opt.exportingDataLabelsFormatter = function(that) {
		return opt.dataLabelsFormatter(that) + "<br />(" + opt.tooltipFormatter(that) + ")";
	};
	opt.eventClick = function(e, that) {
		const selTmsrParam2 = $.extend(true, _.cloneDeep(param), {
			surv_year_list : $administStatsMain.ui.dftYears.join(","),
			ov_l2_list : "30,40",
			tmsr_chartId : "tmsrChart2",
			tmsr_title : param.opt_chartNm + " 일자리 증감",
			tmsr_dataKey : "OV_L1_ID",
			tmsr_nameKey : "OV_L1_KOR",
			tmsr_colors : [ "#728CC7", "#2FB9BC" ],
			opt_fnCalc : function(data) {
				let datas = [];
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					s.DTVAL_CO = s.DTVAL_CO * 1;
					for (let j = 0; j < data.length; j++) {
						let t = data[j];
						t.DTVAL_CO = t.DTVAL_CO * 1;
						if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID) {
							if (s.OV_L2_ID == "30" && t.OV_L2_ID == "40") {
								s.DTVAL_CO = s.DTVAL_CO - t.DTVAL_CO;
								s.dispUnitNm = "만개";
								datas.push(s);
							}
						}
					}
				}
				return datas;
			}
		});
		$administStatsMain.ui.chartItmClick({
			event : e,
			selTmsrParam2 : selTmsrParam2
		});
	}
	AdministStatsChart.ui.makeChart(opt);
}

/* 하드코딩 : 항목끼리 계산 */
/**
 * @name more1Chart9
 * @description 일자리 차트9
 */
function more1Chart9(data, param) {

	const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key : "OV_L1_ID",
		key2 : "OV_L2_ID"
	});
	//옵션변경 및 차트커스텀으로 배열생성 및 차트변경 배천규 221214
	const colors = [ "#FF748E", "#FF748E", "#FF748E", "#27AEF1", "#27AEF1", "#27AEF1" ];
	let series = [ {
		data : [],
		type : "column",
		pointWidth : 25,	
		borderWidth : 1,
		borderColor : "#181818",
		
	},{
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
        tooltip: { enabled: false },
        enableMouseTracking : false,
	}];
        //옵션변경 및 차트커스텀으로 배열생성 및 차트변경 배천규 221214
	let resultArr = [];
	
	
	
	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(OV_L1_ID) {
		resultArr.push({
			name : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID]["00"].OV_L1_KOR,
			y : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID]["30"].DTVAL_CO - toJson[$administStatsMain.ui.selectedYear][OV_L1_ID]["40"].DTVAL_CO,
			DTVAL_CO : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID]["00"].DTVAL_CO,
			OV_L1_ID : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID]["00"].OV_L1_ID
		});
	});
	
	/* 총계 내림차순 정렬 */
	resultArr = $administStatsMain.util.sortJSON(resultArr, "y", "desc");
	let other_DTVAL_CO_sum = 0;
	let other_iod_sum = 0;
	for (let i = 0; i < resultArr.length; i++) {
                        //옵션변경 배천규 221214
		if (i < 3) {
			series[0].data.push(resultArr[i]);
			series[1].data.push(0);
		} /*else {
			other_DTVAL_CO_sum += resultArr[i].DTVAL_CO;
			other_iod_sum += resultArr[i].y;
		}*/
	}
	
            //갯수 추가 배천규 221214
	/* 하위 3개 */ 
	for (let i = resultArr.length - 3; i < resultArr.length; i++) {
		series[0].data.push(resultArr[i]);
		series[1].data.push(0);
	}
	

	
	const maxmin = $administStatsMain.util.sortJSON(series[0].data.slice(), "y", "desc");
	const max = maxmin[0].y;
	const min = maxmin[maxmin.length - 1].y;

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.filename = $(".sb_year option:selected").text() + " " + param.opt_chartNm + " 일자리 증감";
	opt.series = series;
	opt.colors = colors;
	opt.fontSize = "12px";//옵션변경 배천규 221214
	opt.xAxis = {
		type : "category",
		labels : {
			//포메터 수정 배천규 221214
			formatter : function() {
				//return this.value.substring(0, 15);
				return this.value;
			},
			textOverflow : "none",
		},
	};
	opt.exporting = {
		chartOptions : {
			xAxis : {
				labels : {
					formatter : function() {
						return this.value;
					}
				}
			}
		}
	};
	opt.isBigExporting = true;
	opt.yAxis = {
		/*max : 15,
		min : -70 옵션제거 배천규 20221214,*/
		min : (function() {
			if (min < 0 && min >= -15) {
				return -15;
			} else if (min < 0) {
				return min;
			} else {
				return 0;
			}
		}()),
		gridLineWidth : 1,
		labels : {
			enabled : false,//옵션변경 배천규 221214
			formatter : function() {
				if (this.value == 0) {
					return "<span style='font-weight: bold; color: " + AdministStatsChart.consts.sliceHighlightColor + ";'>" + this.value + "</span>";
				} else {
					return this.value;
				}
			}
		},
		plotLines : [ {
			//color : AdministStatsChart.consts.sliceHighlightColor,
			color : "#181818",//옵션변경 배천규 221214
			width : 1, //0기준 x 축//옵션변경 배천규 221214
			value : 0,
			zIndex : 2
		}],
		
	};
	
	opt.colorByPoint = true;
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
				x : chartPosition.left + tooltipX,
				y : chartPosition.top + tooltipY + (labelHeight)
			}
		}
	};
	opt.tooltipFormatter = function(that) {
		//console.log(that)
                        //툴팁 커스텀 20221214 배천규 
		return "<span class='fs11 cBlack'>" + that.key + "<br />" + $administStatsMain.util.addComma(that.point.DTVAL_CO.toFixed(1)) + " 만개</span>";
		
	};
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.getVarianceText({
			val : that.point.y,
			digits : 1,
			unit : "만개",
			//postfixs : [ "증가", "감소" ],//사용안함  배천규 221214
			noDataMsg : "전년 자료 없음",
			isColor : false,
		});
	};
	opt.exportingDataLabelsFormatter = function(that) {
		return opt.dataLabelsFormatter(that) + "<br />(" + opt.tooltipFormatter(that) + ")";
	};
	opt.callback = function(that, chart) {
		$(chart.renderTo).find(".highcharts-xaxis-labels text").each(function(i, v) {
			if (chart.xAxis[0].names[i].length > 10) {//옵션변경 배천규 221214
				$(this).html("<title>" + chart.xAxis[0].names[i] + "</title>" + $.trim(chart.xAxis[0].names[i].substring(0, 10)) + "…");//옵션변경 배천규 221214
			} else {
				$(this).html(chart.xAxis[0].names[i]);
			}
		});
	};
	
	AdministStatsChart.ui.makeChart(opt);
}


//카드 추가  배천규 221214

/* 하드코딩 : 항목끼리 계산 */
/**
 * @name more1Card1
 * @description 일자리 카드1
 */
function more1Card1(data, param) {
	const toJson = $administStatsMain.util.setVariance($administStatsMain.util.arrayToJson({
		data : data,
		key : param.opt_dispDataKey,
	}));
	console.log(toJson);
	
	let categories = [];
	let columnDataArr = [];
	let lineDataArr = [];
	let lineDataArr2 = [];

	Object.keys(toJson).sort().forEach(function(PRD_DE) {
		const v1 = toJson[PRD_DE];
		categories.push(PRD_DE);
		columnDataArr.push({
			name : v1['00'].OV_L1_KOR, 
			y : v1['00'].DTVAL_CO,
			dataObj : v1,
			PRD_DE : PRD_DE
		});
		lineDataArr.push({
			name : v1['10'].OV_L1_KOR, 
			y : v1['10'].DTVAL_CO ,
			dataObj : v1,
			PRD_DE : PRD_DE
		});
		lineDataArr2.push({
			name : v1['20'].OV_L1_KOR, 
			y : v1['20'].DTVAL_CO ,
			dataObj : v1,
			PRD_DE : PRD_DE
		});		
	});
	
	
	let series = [ {
		name : "일자리총계",
		data : columnDataArr,
		type : "column",
		pointWidth : 40,	
		borderWidth : 0,
		color: "#C9DFFF",	
		shadow : true,
		states: {
            hover: {
            	color: "#FEF527",
            }
        },
        dataLabels : {
			style : {
				color : "#000000",	
				fontSize:'13px',
			}
		},
        tooltip: { enabled: false },	
	},{
		name : "임금근로일자리",
		data : lineDataArr,
		type : "spline",
		dashStyle : 'solid',
		lineWidth : 2,
		dataLabels : {
			enabled : false,
			
		},
		marker : {
			radius : 5,
			symbol : 'circle',			
            fillColor : '#27AEF1',
            lineColor : '#ffffff',
		},
		color : '#27AEF1',
		dashStyle : 'solid',
		lineWidth : 3,
		shadow : true,
	},{
		name : "비임금근로일자리",
		data : lineDataArr2,
		type : "spline",
		dashStyle : 'solid',
		lineWidth : 2,
		dataLabels : {
			enabled : false,
			
		},
		marker : {
			radius : 5,
			symbol : 'circle',			
            fillColor : '#FF748E',
            lineColor : '#ffffff',
		},
		color : '#FF748E',
		dashStyle : 'solid',
		lineWidth : 3,
		shadow : true,
	}];	
	
	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.series = series;
	opt.xAxis = {
		categories : categories,
		labels : {
			style : {
				color : '#fff',
				fontSize : '13px',
				fontWeight : '600',

			},
			useHTML : true,
			formatter : function() {
				return this.value;
			},
			visible : false,
		},
	};
	opt.tooltipPositioner = true;
	opt.seriesShowInLegend = true;
	opt.legend = {
        itemStyle: {
            color: '#fff',
            fontSize:"13px",
            fontWeight: 'bold',
        },
        itemHoverStyle: {
            color: '#FEF527',
        },
        reversed: false,
       
    },
    
	opt.tooltipFormatter = function(that) {
		if (that.key == "전체일자리") {
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key+"<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < columnDataArr.length; i++){
					if(that.x == columnDataArr[i].PRD_DE ){
						var increase =  columnDataArr[i].y - columnDataArr[i-1].y;
						var increasePer =  (((columnDataArr[i].y - columnDataArr[i-1].y)/columnDataArr[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cBlue'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
			
		}else if(that.key == "임금근로일자리"){
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key+"<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < lineDataArr.length; i++){
					if(that.x == lineDataArr[i].PRD_DE ){
						var increase =  lineDataArr[i].y - lineDataArr[i-1].y;
						var increasePer =  (((lineDataArr[i].y - lineDataArr[i-1].y)/lineDataArr[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cBlue'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
			
		}else if(that.key == "비임금근로일자리"){
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key+"<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < lineDataArr2.length; i++){
					if(that.x == lineDataArr2[i].PRD_DE ){
						var increase =  lineDataArr2[i].y - lineDataArr2[i-1].y;
						var increasePer =  (((lineDataArr2[i].y - lineDataArr2[i-1].y)/lineDataArr2[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cBlue'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
		}	
	};
	opt.dataLabelsTextOutline = true;
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.y) + " " + param.opt_dispUnitNm;
	};
	AdministStatsChart.ui.makeChart(opt);
}




/* 하드코딩 : 항목끼리 계산 */
/**
 * @name more1Card2
 * @description 일자리 카드2
 */
function more1Card2(data, param) {
	const toJson = $administStatsMain.util.setVariance($administStatsMain.util.arrayToJson({
		data : data,
		key : param.opt_dispDataKey,
	}));
	
	
	
	
	let categories = [];
	let columnDataArr = [];
	let lineDataArr = [];
	let lineDataArr2 = [];
	let lineDataArr3 = [];

	Object.keys(toJson).sort().forEach(function(PRD_DE) {
		const v1 = toJson[PRD_DE];
		categories.push(PRD_DE);
		columnDataArr.push({
			name : v1['00'].OV_L1_KOR, 
			y : v1['00'].DTVAL_CO,
			dataObj : v1,
			PRD_DE : PRD_DE
		});
		lineDataArr.push({
			name : v1['11'].OV_L1_KOR, 
			y : v1['11'].DTVAL_CO ,
			dataObj : v1,
			PRD_DE : PRD_DE
		});
		lineDataArr2.push({
			name : v1['12'].OV_L1_KOR, 
			y : v1['12'].DTVAL_CO ,
			dataObj : v1,
			PRD_DE : PRD_DE
		});		
		lineDataArr3.push({
			name : v1['20'].OV_L1_KOR, 
			y : v1['20'].DTVAL_CO ,
			dataObj : v1,
			PRD_DE : PRD_DE
		});	
	});
	
	
	let series = [ {
		name : "전체일자리",
		data : columnDataArr,
		type : "column",
		pointWidth : 40,	
		borderWidth : 0,
		color: "#C9DFFF",	
		shadow : true,
		states: {
            hover: {
            	color: "#FEF527",
            }
        },
        dataLabels : {
			style : {
				color : "#000000",	
				fontSize:'13px',
			}
		},
        tooltip: { enabled: false },	
	},{
		name : "대기업",
		data : lineDataArr,
		type : "spline",
		dashStyle : 'solid',
		lineWidth : 2,
		dataLabels : {
			enabled : false,
			
		},
		marker : {
			radius : 5,
			symbol : 'circle',			
            fillColor : '#CED4DA',
            lineColor : '#ffffff',
		},
		color : '#CED4DA',
		dashStyle : 'solid',
		lineWidth : 3,
		shadow : true,
	},{
		name : "중소기업",
		data : lineDataArr2,
		type : "spline",
		dashStyle : 'solid',
		lineWidth : 2,
		dataLabels : {
			enabled : false,
			
		},
		marker : {
			radius : 5,
			symbol : 'circle',			
            fillColor : '#27AEF1',
            lineColor : '#ffffff',
		},
		color : '#27AEF1',
		dashStyle : 'solid',
		lineWidth : 3,
		shadow : true,
	},{
		name : "비영리기업",
		data : lineDataArr3,
		type : "spline",
		dashStyle : 'solid',
		lineWidth : 2,
		dataLabels : {
			enabled : false,
			
		},
		marker : {
			radius : 5,
			symbol : 'circle',			
            fillColor : '#FF748E',
            lineColor : '#ffffff',
		},
		color : '#FF748E',
		dashStyle : 'solid',
		lineWidth : 3,
		shadow : true,
	}];	
	
	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.series = series;
	opt.xAxis = {
		categories : categories,
		labels : {
			style : {
				color : '#fff',
				fontSize : '13px',
				fontWeight : '600',

			},
			useHTML : true,
			formatter : function() {
				return this.value;
			},
			visible : false,
		},
	};
	opt.tooltipPositioner = true;
	opt.seriesShowInLegend = true;
	opt.legend = {
        itemStyle: {
            color: '#fff',
            fontSize:"13px",
            fontWeight: 'bold',
        },
        itemHoverStyle: {
            color: '#FEF527',
        },
        reversed: false,
       
    },
	opt.tooltipFormatter = function(that) {
		if (that.key == "전체일자리") {
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key+"<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < columnDataArr.length; i++){
					if(that.x == columnDataArr[i].PRD_DE ){
						var increase =  columnDataArr[i].y - columnDataArr[i-1].y;
						var increasePer =  (((columnDataArr[i].y - columnDataArr[i-1].y)/columnDataArr[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cBlue'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
			
		}else if(that.key == "대기업"){
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key+"<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < lineDataArr.length; i++){
					if(that.x == lineDataArr[i].PRD_DE ){
						var increase =  lineDataArr[i].y - lineDataArr[i-1].y;
						var increasePer =  (((lineDataArr[i].y - lineDataArr[i-1].y)/lineDataArr[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cBlue'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
			
		}else if(that.key == "중소기업"){
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key+"<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < lineDataArr2.length; i++){
					if(that.x == lineDataArr2[i].PRD_DE ){
						var increase =  lineDataArr2[i].y - lineDataArr2[i-1].y;
						var increasePer =  (((lineDataArr2[i].y - lineDataArr2[i-1].y)/lineDataArr2[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cBlue'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
		}else if(that.key == "비영리기업"){
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key+"<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < lineDataArr3.length; i++){
					if(that.x == lineDataArr3[i].PRD_DE ){
						var increase =  lineDataArr3[i].y - lineDataArr3[i-1].y;
						var increasePer =  (((lineDataArr3[i].y - lineDataArr3[i-1].y)/lineDataArr3[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cBlue'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
		}	
	};
	opt.dataLabelsTextOutline = true;
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.y) + " " + param.opt_dispUnitNm;
	};
	AdministStatsChart.ui.makeChart(opt);
}



/* 하드코딩 : 항목끼리 계산 */
/**
 * @name more1Card3
 * @description 일자리 카드2
 */
function more1Card3(data, param) {
	const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key : "OV_L1_ID",
	});
	
	let categories = [];
	let columnDataArr = [];
	let lineDataArr = [];
	let lineDataArr2 = [];
	let lineDataArr3 = [];
	let lineDataArr4 = [];

	
	Object.keys(toJson).sort().forEach(function(PRD_DE) {
		const v1 = toJson[PRD_DE];
		categories.push(PRD_DE);
		columnDataArr.push({
			name : v1['00'].OV_L1_KOR, 
			y : v1['00'].DTVAL_CO,
			dataObj : v1,
			PRD_DE : PRD_DE
		});
		lineDataArr.push({
			name : v1['10'].OV_L1_KOR, 
			y : v1['10'].DTVAL_CO ,
			dataObj : v1,
			PRD_DE : PRD_DE
		});
		lineDataArr2.push({
			name : v1['20'].OV_L1_KOR, 
			y : v1['20'].DTVAL_CO ,
			dataObj : v1,
			PRD_DE : PRD_DE
		});		
		lineDataArr3.push({
			name : v1['30'].OV_L1_KOR, 
			y : v1['30'].DTVAL_CO ,
			dataObj : v1,
			PRD_DE : PRD_DE
		});	
		lineDataArr4.push({
			name : v1['40'].OV_L1_KOR, 
			y : v1['40'].DTVAL_CO ,
			dataObj : v1,
			PRD_DE : PRD_DE
		});	
	});
	
	
	//console.log(lineDataArr3)
	let series = [ {
		name : "전체일자리",
		data : columnDataArr,
		type : "column",
		pointWidth : 40,	
		borderWidth : 0,
		color: "#C9DFFF",	
		shadow : true,
		states: {
            hover: {
            	color: "#FEF527",
            }
        },
        dataLabels : {
			style : {
				color : "#000000",	
				fontSize:'13px',
			}
		},
        tooltip: { enabled: false },	
	},{
		name : "회사법인",
		data : lineDataArr,
		type : "spline",
		dashStyle : 'solid',
		lineWidth : 2,
		dataLabels : {
			enabled : false,
			
		},
		marker : {
			radius : 5,
			symbol : 'circle',			
            fillColor : '#013387',
            lineColor : '#ffffff',
		},
		color : '#013387',
		dashStyle : 'solid',
		lineWidth : 3,
		shadow : true,
	},{
		name : "회사이외법인",
		data : lineDataArr2,
		type : "spline",
		dashStyle : 'solid',
		lineWidth : 2,
		dataLabels : {
			enabled : false,
			
		},
		marker : {
			radius : 5,
			symbol : 'circle',			
            fillColor : '#27AEF1',
            lineColor : '#ffffff',
		},
		color : '#27AEF1',
		dashStyle : 'solid',
		lineWidth : 3,
		shadow : true,
	},{
		name : "정부ㆍ비법인단체",
		data : lineDataArr3,
		type : "spline",
		dashStyle : 'solid',
		lineWidth : 2,
		dataLabels : {
			enabled : false,
			
		},
		marker : {
			radius : 5,
			symbol : 'circle',			
            fillColor : '#CED4DA',
            lineColor : '#ffffff',
		},
		color : '#CED4DA',
		dashStyle : 'solid',
		lineWidth : 3,
		shadow : true,
	},{
		name : "개인기업체",
		data : lineDataArr4,
		type : "spline",
		dashStyle : 'solid',
		lineWidth : 2,
		dataLabels : {
			enabled : false,
			
		},
		marker : {
			radius : 5,
			symbol : 'circle',			
            fillColor : '#FF748E',
            lineColor : '#ffffff',
		},
		color : '#FF748E',
		dashStyle : 'solid',
		lineWidth : 3,
		shadow : true,
	}];	
	
	
	
	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.series = series;
	opt.xAxis = {
		categories : categories,
		labels : {
			style : {
				color : '#fff',
				fontSize : '13px',
				fontWeight : '600',

			},
			useHTML : true,
			formatter : function() {
				return this.value;
			},
			visible : false,
		},
	};
	opt.tooltipPositioner = true;
	opt.seriesShowInLegend = true;
	opt.legend = {
        itemStyle: {
            color: '#fff',
            fontSize:"13px",
            fontWeight: 'bold',
        },
        itemHoverStyle: {
            color: '#FEF527',
        },
        reversed: false,
       
    },
	opt.tooltipFormatter = function(that) {
		
		if (that.key == "총 계") {
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>전체일자리<br /><br />전년자료없음</span>";
			}else {
				for(let i = 0; i < columnDataArr.length; i++){
					if(that.x == columnDataArr[i].PRD_DE ){
						var increase =  columnDataArr[i].y - columnDataArr[i-1].y;
						var increasePer =  (((columnDataArr[i].y - columnDataArr[i-1].y)/columnDataArr[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>전체일자리<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>전체일자리<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cBlue'>"+Math.abs(increasePer)+"%("+(Math.abs(increase)).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
			
		}else if(that.key == "회사법인"){
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key+"<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년자료없음</span>";
				//return "<span class='fs11 cBlack'>전년자료없음</span>";
			}else {
				for(let i = 0; i < lineDataArr.length; i++){
					if(that.x == lineDataArr[i].PRD_DE ){
						var increase =  lineDataArr[i].y - lineDataArr[i-1].y;
						var increasePer =  (((lineDataArr[i].y - lineDataArr[i-1].y)/lineDataArr[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "<br />" + $administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "<br />" + $administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cBlue'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
			
		}else if(that.key == "회사이외법인"){
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key+"<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < lineDataArr2.length; i++){
					if(that.x == lineDataArr2[i].PRD_DE ){
						var increase =  lineDataArr2[i].y - lineDataArr2[i-1].y;
						var increasePer =  (((lineDataArr2[i].y - lineDataArr2[i-1].y)/lineDataArr2[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "<br />" + $administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "<br />" + $administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cBlue'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
		}else if(that.key == "정부 · 비법인단체"){
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key+"<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < lineDataArr3.length; i++){
					if(that.x == lineDataArr3[i].PRD_DE ){
						var increase =  lineDataArr3[i].y - lineDataArr3[i-1].y;
						var increasePer =  (((lineDataArr3[i].y - lineDataArr3[i-1].y)/lineDataArr3[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "<br />" + $administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "<br />" + $administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cBlue'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
		}else if(that.key == "개인기업체"){
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key+"<br />"+$administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < lineDataArr4.length; i++){
					if(that.x == lineDataArr4[i].PRD_DE ){
						var increase =  lineDataArr4[i].y - lineDataArr4[i-1].y;
						var increasePer =  (((lineDataArr4[i].y - lineDataArr4[i-1].y)/lineDataArr4[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "<br />" + $administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "<br />" + $administStatsMain.util.addComma((that.point.y).toFixed(1))+"만개<br />전년대비<span class='cBlue'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
		}		
	};
	opt.dataLabelsTextOutline = true;
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.y) + " 만개";
	};
	AdministStatsChart.ui.makeChart(opt);
}




/* 하드코딩 : 항목끼리 계산 */
/**
 * @name more1Card4
 * @description 일자리 카드2
 */
function more1Card4(data, param) {
	/*const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key : "OV_L1_ID",
		key2 : "OV_L2_ID",
	});*/
	for (let i = 0; i < data.length; i++) {
		let s = data[i];
		s.DTVAL_CO = s.DTVAL_CO * 1;
		for (let j = 0; j < data.length; j++) {
			let t = data[j];
			t.DTVAL_CO = t.DTVAL_CO * 1;
			if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID) {
				if (s.OV_L2_ID == "10") {
					s.OV_L2_ID = "CUSTOM01";
					s.OV_L2_KOR = "19세이하";
				} else if (s.OV_L2_ID == "20" && t.OV_L2_ID == "30") {
					s.OV_L2_ID = "CUSTOM02";
					s.OV_L2_KOR = "20~29세";
					s.DTVAL_CO += t.DTVAL_CO;
				} else if (s.OV_L2_ID == "40" && t.OV_L2_ID == "50") {
					s.OV_L2_ID = "CUSTOM03";
					s.OV_L2_KOR = "30~39세";
					s.DTVAL_CO += t.DTVAL_CO;
				} else if (s.OV_L2_ID == "60" && t.OV_L2_ID == "70") {
					s.OV_L2_ID = "CUSTOM04";
					s.OV_L2_KOR = "40~49세";
					s.DTVAL_CO += t.DTVAL_CO;
				} else if (s.OV_L2_ID == "80" && t.OV_L2_ID == "90") {
					s.OV_L2_ID = "CUSTOM05";
					s.OV_L2_KOR = "50~59세";
					s.DTVAL_CO += t.DTVAL_CO;
				} else if (s.OV_L2_ID == "100" && t.OV_L2_ID == "110") {
					s.OV_L2_ID = "CUSTOM06";
					s.OV_L2_KOR = "60세이상";
					s.DTVAL_CO += t.DTVAL_CO;
				}
			}
		}
	}
	let datas = [];
	
	for (let i = 0; i < data.length; i++) {
		let s = data[i];
		if (s.OV_L2_ID.indexOf("CUSTOM") > -1) {
			datas.push(s);
		}
	}

	const toJson = $administStatsMain.util.arrayToJson({
		data : datas,
		key : "OV_L1_ID",
		key2 : "OV_L2_ID"
	});
	
	let categories = [];
	let columnDataArr = [];
	let lineDataArr = [];
	let lineDataArr2 = [];
	let lineDataArr3 = [];
	let lineDataArr4 = [];
	let lineDataArr5 = [];
	let lineDataArr6 = [];
	
	Object.keys(toJson).sort().forEach(function(PRD_DE) {
		const v1 = toJson[PRD_DE];
		const v2 = v1[1];
		
		categories.push(PRD_DE);
		columnDataArr.push({
			name : "전체일자리(남자)", 
			y : v2['CUSTOM01'].DTVAL_CO + v2['CUSTOM02'].DTVAL_CO + v2['CUSTOM03'].DTVAL_CO + v2['CUSTOM04'].DTVAL_CO + v2['CUSTOM05'].DTVAL_CO + v2['CUSTOM06'].DTVAL_CO,
			dataObj : v2,
			PRD_DE : PRD_DE
		});
		lineDataArr.push({
			name : v2['CUSTOM01'].OV_L2_KOR, 
			y : v2['CUSTOM01'].DTVAL_CO,
			dataObj : v2,
			PRD_DE : PRD_DE
		});
		lineDataArr2.push({
			name : v2['CUSTOM02'].OV_L2_KOR, 
			y : v2['CUSTOM02'].DTVAL_CO,
			dataObj : v2,
			PRD_DE : PRD_DE
		});		
		lineDataArr3.push({
			name : v2['CUSTOM03'].OV_L2_KOR, 
			y : v2['CUSTOM03'].DTVAL_CO,
			dataObj : v2,
			PRD_DE : PRD_DE
		});	
		lineDataArr4.push({
			name : v2['CUSTOM04'].OV_L2_KOR, 
			y : v2['CUSTOM04'].DTVAL_CO,
			dataObj : v2,
			PRD_DE : PRD_DE
		});
		lineDataArr5.push({
			name : v2['CUSTOM05'].OV_L2_KOR, 
			y : v2['CUSTOM05'].DTVAL_CO,
			dataObj : v2,
			PRD_DE : PRD_DE
		});
		lineDataArr6.push({
			name : v2['CUSTOM06'].OV_L2_KOR, 
			y : v2['CUSTOM06'].DTVAL_CO,
			dataObj : v2,
			PRD_DE : PRD_DE
		});
	});
	
	
	
	
	let series = [ {
		name : "전체일자리(남자)",
		data : columnDataArr,
		type : "column",
		pointWidth : 40,	
		borderWidth : 0,
		color: "#C9DFFF",	
		shadow : true,
		states: {
            hover: {
            	color: "#FEF527",
            }
        },
        dataLabels : {
			style : {
				color : "#000000",	
				fontSize:'13px',
			}
		},
        tooltip: { enabled: false },	
	},{
		name : "19세 이하(남자)",
		data : lineDataArr,
		type : "spline",
		dashStyle : 'solid',
		lineWidth : 2,
		dataLabels : {
			enabled : false,
			
		},
		marker : {
			radius : 5,
			symbol : 'circle',			
            fillColor : '#ffffff',
            lineColor : '#ffffff',
		},
		color : '#ffffff',
		dashStyle : 'solid',
		lineWidth : 3,
		shadow : true,
	},{
		name : "20~29세(남자)",
		data : lineDataArr2,
		type : "spline",
		dashStyle : 'solid',
		lineWidth : 2,
		dataLabels : {
			enabled : false,
			
		},
		marker : {
			radius : 5,
			symbol : 'circle',			
            fillColor : '#C9DFFF',
            lineColor : '#ffffff',
		},
		color : '#C9DFFF',
		dashStyle : 'solid',
		lineWidth : 3,
		shadow : true,
	},{
		name : "30~39세(남자)",
		data : lineDataArr3,
		type : "spline",
		dashStyle : 'solid',
		lineWidth : 2,
		dataLabels : {
			enabled : false,
			
		},
		marker : {
			radius : 5,
			symbol : 'circle',			
            fillColor : '#64B5F6',
            lineColor : '#ffffff',
		},
		color : '#64B5F6',
		dashStyle : 'solid',
		lineWidth : 3,
		shadow : true,
	},{
		name : "40~49세(남자)",
		data : lineDataArr4,
		type : "spline",
		dashStyle : 'solid',
		lineWidth : 2,
		dataLabels : {
			enabled : false,
			
		},
		marker : {
			radius : 5,
			symbol : 'circle',			
            fillColor : '#4390FF',
            lineColor : '#ffffff',
		},
		color : '#4390FF',
		dashStyle : 'solid',
		lineWidth : 3,
		shadow : true,
	},{
		name : "50~59세(남자)",
		data : lineDataArr5,
		type : "spline",
		dashStyle : 'solid',
		lineWidth : 2,
		dataLabels : {
			enabled : false,
			
		},
		marker : {
			radius : 5,
			symbol : 'circle',			
            fillColor : '#FF748E',
            lineColor : '#ffffff',
		},
		color : '#FF748E',
		dashStyle : 'solid',
		lineWidth : 3,
		shadow : true,
	},{
		name : "60세 이상(남자)",
		data : lineDataArr6,
		type : "spline",
		dashStyle : 'solid',
		lineWidth : 2,
		dataLabels : {
			enabled : false,
			
		},
		marker : {
			radius : 5,
			symbol : 'circle',			
            fillColor : '#013387',
            lineColor : '#ffffff',
		},
		color : '#013387',
		dashStyle : 'solid',
		lineWidth : 3,
		shadow : true,
	}];	

	
	
	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = "";
	opt.title = param.opt_chartNm;
	opt.series = series;
	opt.xAxis = {
		categories : categories,
		labels : {
			style : {
				color : '#fff',
				fontSize : '13px',
				fontWeight : '600',

			},
			useHTML : true,
			formatter : function() {
				return this.value;
			},
			visible : false,
		},
	};
	opt.tooltipPositioner = true;
	opt.seriesShowInLegend = true;
	opt.legend = {
        itemStyle: {
            color: '#fff',
            fontSize:"13px",
            fontWeight: 'bold',
        },
        itemHoverStyle: {
            color: '#FEF527',
        },
        reversed: false,
       
    },
	opt.tooltipFormatter = function(that) {
		
		
		if (that.key == "전체일자리(남자)") {
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>전년자료없음</span>";
			}else {
				for(let i = 0; i < columnDataArr.length; i++){
					if(that.x == columnDataArr[i].PRD_DE ){
						var increase =  columnDataArr[i].y - columnDataArr[i-1].y;
						var increasePer =  (((columnDataArr[i].y - columnDataArr[i-1].y)/columnDataArr[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "<br />전년대비<span class='cBlue'>"+Math.abs(increasePer)+"%("+(Math.abs(increase)).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
			
		}else if(that.key == "19세이하"){
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key + "(남자)<br /> " +$administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < lineDataArr.length; i++){
					if(that.x == lineDataArr[i].PRD_DE ){
						var increase =  lineDataArr[i].y - lineDataArr[i-1].y;
						var increasePer =  (((lineDataArr[i].y - lineDataArr[i-1].y)/lineDataArr[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "(남자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "(남자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cBlue'>"+Math.abs(increasePer)+"%("+(Math.abs(increase)).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
			
		}else if(that.key == "20~29세"){
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key + "(남자)<br /> " +$administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < lineDataArr2.length; i++){
					if(that.x == lineDataArr2[i].PRD_DE ){
						var increase =  lineDataArr2[i].y - lineDataArr2[i-1].y;
						var increasePer =  (((lineDataArr2[i].y - lineDataArr2[i-1].y)/lineDataArr2[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "(남자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "(남자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cBlue'>"+Math.abs(increasePer)+"%("+(Math.abs(increase)).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
		}else if(that.key == "30~39세"){
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key + "(남자)<br /> " +$administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < lineDataArr3.length; i++){
					if(that.x == lineDataArr3[i].PRD_DE ){
						var increase =  lineDataArr3[i].y - lineDataArr3[i-1].y;
						var increasePer =  (((lineDataArr3[i].y - lineDataArr3[i-1].y)/lineDataArr3[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "(남자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "(남자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cBlue'>"+Math.abs(increasePer)+"%("+(Math.abs(increase)).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
		}else if(that.key == "40~49세"){
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key + "(남자)<br /> " +$administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < lineDataArr4.length; i++){
					if(that.x == lineDataArr4[i].PRD_DE ){
						var increase =  lineDataArr4[i].y - lineDataArr4[i-1].y;
						var increasePer =  (((lineDataArr4[i].y - lineDataArr4[i-1].y)/lineDataArr4[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "(남자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "(남자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cBlue'>"+Math.abs(increasePer)+"%("+(Math.abs(increase)).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
		}else if(that.key == "50~59세"){
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key + "(남자)<br /> " +$administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < lineDataArr5.length; i++){
					if(that.x == lineDataArr5[i].PRD_DE ){
						var increase =  lineDataArr5[i].y - lineDataArr5[i-1].y;
						var increasePer =  (((lineDataArr5[i].y - lineDataArr5[i-1].y)/lineDataArr5[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "(남자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "(남자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cBlue'>"+Math.abs(increasePer)+"%("+(Math.abs(increase)).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
		}
		else if(that.key == "60세이상"){
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key + "(남자)<br /> " +$administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < lineDataArr6.length; i++){
					if(that.x == lineDataArr6[i].PRD_DE ){
						var increase =  lineDataArr6[i].y - lineDataArr6[i-1].y;
						var increasePer =  (((lineDataArr6[i].y - lineDataArr6[i-1].y)/lineDataArr6[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "(남자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "(남자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cBlue'>"+Math.abs(increasePer)+"%("+(Math.abs(increase)).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
		}
	};
	opt.dataLabelsTextOutline = true;
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.addComma((that.point.y).toFixed(1)) + " 만개";
	};
	AdministStatsChart.ui.makeChart(opt);
}



/* 하드코딩 : 항목끼리 계산 */
/**
 * @name more1Card5
 * @description 일자리 카드5
 */
function more1Card5(data, param) {
	/*const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key : "OV_L1_ID",
		key2 : "OV_L2_ID",
	});*/
	for (let i = 0; i < data.length; i++) {
		let s = data[i];
		s.DTVAL_CO = s.DTVAL_CO * 1;
		for (let j = 0; j < data.length; j++) {
			let t = data[j];
			t.DTVAL_CO = t.DTVAL_CO * 1;
			if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID) {
				if (s.OV_L2_ID == "10") {
					s.OV_L2_ID = "CUSTOM01";
					s.OV_L2_KOR = "19세이하";
				} else if (s.OV_L2_ID == "20" && t.OV_L2_ID == "30") {
					s.OV_L2_ID = "CUSTOM02";
					s.OV_L2_KOR = "20~29세";
					s.DTVAL_CO += t.DTVAL_CO;
				} else if (s.OV_L2_ID == "40" && t.OV_L2_ID == "50") {
					s.OV_L2_ID = "CUSTOM03";
					s.OV_L2_KOR = "30~39세";
					s.DTVAL_CO += t.DTVAL_CO;
				} else if (s.OV_L2_ID == "60" && t.OV_L2_ID == "70") {
					s.OV_L2_ID = "CUSTOM04";
					s.OV_L2_KOR = "40~49세";
					s.DTVAL_CO += t.DTVAL_CO;
				} else if (s.OV_L2_ID == "80" && t.OV_L2_ID == "90") {
					s.OV_L2_ID = "CUSTOM05";
					s.OV_L2_KOR = "50~59세";
					s.DTVAL_CO += t.DTVAL_CO;
				} else if (s.OV_L2_ID == "100" && t.OV_L2_ID == "110") {
					s.OV_L2_ID = "CUSTOM06";
					s.OV_L2_KOR = "60세이상";
					s.DTVAL_CO += t.DTVAL_CO;
				}
			}
		}
	}
	let datas = [];
	
	for (let i = 0; i < data.length; i++) {
		let s = data[i];
		if (s.OV_L2_ID.indexOf("CUSTOM") > -1) {
			datas.push(s);
		}
	}

	const toJson = $administStatsMain.util.arrayToJson({
		data : datas,
		key : "OV_L1_ID",
		key2 : "OV_L2_ID"
	});
	
	let categories = [];
	let columnDataArr = [];
	let lineDataArr = [];
	let lineDataArr2 = [];
	let lineDataArr3 = [];
	let lineDataArr4 = [];
	let lineDataArr5 = [];
	let lineDataArr6 = [];
	
	Object.keys(toJson).sort().forEach(function(PRD_DE) {
		const v1 = toJson[PRD_DE];
		const v2 = v1[2];
		
		categories.push(PRD_DE);
		columnDataArr.push({
			name : "전체일자리(여자)", 
			y : v2['CUSTOM01'].DTVAL_CO + v2['CUSTOM02'].DTVAL_CO + v2['CUSTOM03'].DTVAL_CO + v2['CUSTOM04'].DTVAL_CO + v2['CUSTOM05'].DTVAL_CO + v2['CUSTOM06'].DTVAL_CO,
			dataObj : v2,
			PRD_DE : PRD_DE
		});
		lineDataArr.push({
			name : v2['CUSTOM01'].OV_L2_KOR, 
			y : v2['CUSTOM01'].DTVAL_CO,
			dataObj : v2,
			PRD_DE : PRD_DE
		});
		lineDataArr2.push({
			name : v2['CUSTOM02'].OV_L2_KOR, 
			y : v2['CUSTOM02'].DTVAL_CO,
			dataObj : v2,
			PRD_DE : PRD_DE
		});		
		lineDataArr3.push({
			name : v2['CUSTOM03'].OV_L2_KOR, 
			y : v2['CUSTOM03'].DTVAL_CO,
			dataObj : v2,
			PRD_DE : PRD_DE
		});	
		lineDataArr4.push({
			name : v2['CUSTOM04'].OV_L2_KOR, 
			y : v2['CUSTOM04'].DTVAL_CO,
			dataObj : v2,
			PRD_DE : PRD_DE
		});
		lineDataArr5.push({
			name : v2['CUSTOM05'].OV_L2_KOR, 
			y : v2['CUSTOM05'].DTVAL_CO,
			dataObj : v2,
			PRD_DE : PRD_DE
		});
		lineDataArr6.push({
			name : v2['CUSTOM06'].OV_L2_KOR, 
			y : v2['CUSTOM06'].DTVAL_CO,
			dataObj : v2,
			PRD_DE : PRD_DE
		});
	});
	
	
	
	
	let series = [ {
		name : "전체일자리(여자)",
		data : columnDataArr,
		type : "column",
		pointWidth : 40,	
		borderWidth : 0,
		color: "#C9DFFF",	
		shadow : true,
		states: {
            hover: {
            	color: "#FEF527",
            }
        },
        dataLabels : {
			style : {
				color : "#000000",	
				fontSize:'13px',
			}
		},
        tooltip: { enabled: false },	
	},{
		name : "19세 이하(여자)",
		data : lineDataArr,
		type : "spline",
		dashStyle : 'solid',
		lineWidth : 2,
		dataLabels : {
			enabled : false,
			
		},
		marker : {
			radius : 5,
			symbol : 'circle',			
            fillColor : '#ffffff',
            lineColor : '#ffffff',
		},
		color : '#ffffff',
		dashStyle : 'solid',
		lineWidth : 3,
		shadow : true,
	},{
		name : "20~29세(여자)",
		data : lineDataArr2,
		type : "spline",
		dashStyle : 'solid',
		lineWidth : 2,
		dataLabels : {
			enabled : false,
			
		},
		marker : {
			radius : 5,
			symbol : 'circle',			
            fillColor : '#C9DFFF',
            lineColor : '#ffffff',
		},
		color : '#C9DFFF',
		dashStyle : 'solid',
		lineWidth : 3,
		shadow : true,
	},{
		name : "30~39세(여자)",
		data : lineDataArr3,
		type : "spline",
		dashStyle : 'solid',
		lineWidth : 2,
		dataLabels : {
			enabled : false,
			
		},
		marker : {
			radius : 5,
			symbol : 'circle',			
            fillColor : '#64B5F6',
            lineColor : '#ffffff',
		},
		color : '#64B5F6',
		dashStyle : 'solid',
		lineWidth : 3,
		shadow : true,
	},{
		name : "40~49세(여자)",
		data : lineDataArr4,
		type : "spline",
		dashStyle : 'solid',
		lineWidth : 2,
		dataLabels : {
			enabled : false,
			
		},
		marker : {
			radius : 5,
			symbol : 'circle',			
            fillColor : '#4390FF',
            lineColor : '#ffffff',
		},
		color : '#4390FF',
		dashStyle : 'solid',
		lineWidth : 3,
		shadow : true,
	},{
		name : "50~59세(여자)",
		data : lineDataArr5,
		type : "spline",
		dashStyle : 'solid',
		lineWidth : 2,
		dataLabels : {
			enabled : false,
			
		},
		marker : {
			radius : 5,
			symbol : 'circle',			
            fillColor : '#FF748E',
            lineColor : '#ffffff',
		},
		color : '#FF748E',
		dashStyle : 'solid',
		lineWidth : 3,
		shadow : true,
	},{
		name : "60세 이상(여자)",
		data : lineDataArr6,
		type : "spline",
		dashStyle : 'solid',
		lineWidth : 2,
		dataLabels : {
			enabled : false,
			
		},
		marker : {
			radius : 5,
			symbol : 'circle',			
            fillColor : '#013387',
            lineColor : '#ffffff',
		},
		color : '#013387',
		dashStyle : 'solid',
		lineWidth : 3,
		shadow : true,
	}];	

	
	
	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = "";
	opt.title = param.opt_chartNm;
	opt.series = series;
	opt.xAxis = {
		categories : categories,
		labels : {
			style : {
				color : '#fff',
				fontSize : '13px',
				fontWeight : '600',

			},
			useHTML : true,
			formatter : function() {
				return this.value;
			},
			visible : false,
		},
	};
	opt.tooltipPositioner = true;
	opt.seriesShowInLegend = true;
	opt.legend = {
        itemStyle: {
            color: '#fff',
            fontSize:"13px",
            fontWeight: 'bold',
        },
        itemHoverStyle: {
            color: '#FEF527',
        },
        reversed: false,
       
    },
	opt.tooltipFormatter = function(that) {
		
		if (that.key == "전체일자리(여자)") {
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>전년자료없음</span>";
			}else {
				for(let i = 0; i < columnDataArr.length; i++){
					if(that.x == columnDataArr[i].PRD_DE ){
						var increase =  columnDataArr[i].y - columnDataArr[i-1].y;
						var increasePer =  (((columnDataArr[i].y - columnDataArr[i-1].y)/columnDataArr[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "<br />전년대비<span class='cBlue'>"+Math.abs(increasePer)+"%("+(Math.abs(increase)).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
			
		}else if(that.key == "19세이하"){
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key + "(여자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < lineDataArr.length; i++){
					if(that.x == lineDataArr[i].PRD_DE ){
						var increase =  lineDataArr[i].y - lineDataArr[i-1].y;
						var increasePer =  (((lineDataArr[i].y - lineDataArr[i-1].y)/lineDataArr[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "(여자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "(여자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cBlue'>"+Math.abs(increasePer)+"%("+(Math.abs(increase)).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
			
		}else if(that.key == "20~29세"){
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key + "(여자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < lineDataArr2.length; i++){
					if(that.x == lineDataArr2[i].PRD_DE ){
						var increase =  lineDataArr2[i].y - lineDataArr2[i-1].y;
						var increasePer =  (((lineDataArr2[i].y - lineDataArr2[i-1].y)/lineDataArr2[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "(여자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "(여자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cBlue'>"+Math.abs(increasePer)+"%("+(Math.abs(increase)).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
		}else if(that.key == "30~39세"){
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key + "(여자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < lineDataArr3.length; i++){
					if(that.x == lineDataArr3[i].PRD_DE ){
						var increase =  lineDataArr3[i].y - lineDataArr3[i-1].y;
						var increasePer =  (((lineDataArr3[i].y - lineDataArr3[i-1].y)/lineDataArr3[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "(여자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "(여자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cBlue'>"+Math.abs(increasePer)+"%("+(Math.abs(increase)).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
		}else if(that.key == "40~49세"){
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key + "(여자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < lineDataArr4.length; i++){
					if(that.x == lineDataArr4[i].PRD_DE ){
						var increase =  lineDataArr4[i].y - lineDataArr4[i-1].y;
						var increasePer =  (((lineDataArr4[i].y - lineDataArr4[i-1].y)/lineDataArr4[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "(여자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "(여자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cBlue'>"+Math.abs(increasePer)+"%("+(Math.abs(increase)).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
		}else if(that.key == "50~59세"){
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key + "(여자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < lineDataArr5.length; i++){
					if(that.x == lineDataArr5[i].PRD_DE ){
						var increase =  lineDataArr5[i].y - lineDataArr5[i-1].y;
						var increasePer =  (((lineDataArr5[i].y - lineDataArr5[i-1].y)/lineDataArr5[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "(여자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "(여자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cBlue'>"+Math.abs(increasePer)+"%("+(Math.abs(increase)).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
		}
		else if(that.key == "60세이상"){
			if(that.x == "2016"){
				return "<span class='fs11 cBlack'>"+that.key + "(여자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년자료없음</span>";
			}else {
				for(let i = 0; i < lineDataArr6.length; i++){
					if(that.x == lineDataArr6[i].PRD_DE ){
						var increase =  lineDataArr6[i].y - lineDataArr6[i-1].y;
						var increasePer =  (((lineDataArr6[i].y - lineDataArr6[i-1].y)/lineDataArr6[i-1].y)*100).toFixed(1);
					}
				}
				if(increase > 0){
					return "<span class='fs11 cBlack'>"+that.key + "(여자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cRed'>"+increasePer+"%("+(increase).toFixed(1)+"만개"+") 증가</span></span>";
				}else if(increase < 0) {
					return "<span class='fs11 cBlack'>"+that.key + "(여자)<br /> " + $administStatsMain.util.addComma((that.point.y).toFixed(1)) + "만개<br />전년대비<span class='cBlue'>"+Math.abs(increasePer)+"%("+(Math.abs(increase)).toFixed(1)+"만개"+") 감소</span></span>";
				}else {
					return "변동없음";
				}
			}
		}
	};
	opt.dataLabelsTextOutline = true;
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMain.util.addComma((that.point.y).toFixed(1)) + " 만개";
	};
	AdministStatsChart.ui.makeChart(opt);
}

/* 하드코딩 : 항목끼리 계산 */
/**
 * @name more1Chart10
 * @description 일자리 차트10
 */
function more1Chart10(data, param) {

	const toJson = $administStatsMain.util.arrayToJson({
		data : data,
		key : "OV_L1_ID",
		key2 : "OV_L2_ID"
	});
	let series = [ {
		innerSize : "60%",
		data : []
	} ];
	const colors = ["#013387", "#27AEF1", "#0078D5", "#FF748E"];

	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().forEach(function(OV_L1_ID) {
		series[0].data.push({
			name : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID]["00"].OV_L1_KOR,
			y : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID]["30"].DTVAL_CO - toJson[$administStatsMain.ui.selectedYear][OV_L1_ID]["40"].DTVAL_CO,
			DTVAL_CO : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID]["00"].DTVAL_CO,
			dataObj : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID]["00"]
		});
	});
	
	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.filename = $(".sb_year option:selected").text() + " " + param.opt_chartNm + " 일자리 증감";
	opt.series = series;
	opt.pie = {
		size : "150%",
		startAngle : -90,
		endAngle : 90,
		center : [ "50%", "100%" ]
	};
	opt.xAxis = {
		type : "category"
	};
	/*opt.yAxis = {
		gridLineWidth : 1,
		max : 40,
		min : -10,
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
	};*/
	opt.colors = colors;
	opt.colorByPoint = true;
	opt.cursor = "default";
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
				x : chartPosition.left + tooltipX,
				y : chartPosition.top + tooltipY + (labelHeight)
			}
		}
	};
	opt.tooltipFormatter = function(that) {
		return $administStatsMain.util.addComma(that.point.dataObj.DTVAL_CO) + " 만개";
	};
	opt.dataLabelsFormatter = function(that) {
		/*
		return $administStatsMain.util.getVarianceText({
			val : that.point.y,
			digits : 1,
			unit : "만개",
			postfixs : [ "증가", "감소" ],
			noDataMsg : "전년 자료 없음",
			isColor : false
		});
		*/
		const prefix = "";
		const digits = 1;
		let val = that.point.y;
		if (digits > 0 && $.isNumeric(val)) {
			val = val.toFixed(digits);
		}
		const unit = "만개";
		const postfixs = [ "증가", "감소" ];
		const isColor = false;
		const noDataMsg = "전년 자료 없음";
		let returnStr = prefix;
		if ($.isNumeric(val)) {
			if (val > 0) {
				if (isColor) {
					returnStr += "<span style='color: #E71909;'>";
				} else {
					returnStr += "<span>";
				}
				returnStr += $administStatsMain.util.addComma(val);
				if (!$administStatsMain.util.isEmpty(unit)) {
					returnStr += " " + unit;
				}
				if (postfixs.length > 0) {
					returnStr += "<br/>&ensp;&ensp;" + postfixs[0];
				}
			} else if (val < 0) {
				if (isColor) {
					returnStr += "<span style='color: #115BCB;'>";
				} else {
					returnStr += "<span>";
				}
				if (postfixs.length > 0) {
					returnStr += $administStatsMain.util.addComma(Math.abs(val))
				} else {
					returnStr += $administStatsMain.util.addComma(val);
				}
				if (!$administStatsMain.util.isEmpty(unit)) {
					returnStr += " " + unit;
				}
				if (postfixs.length > 0) {
					returnStr += "<br/>&ensp;&ensp;" + postfixs[1];
				}
				returnStr += "</span>";
			} else {
				returnStr += "<span>";
				returnStr += $administStatsMain.util.addComma(Math.abs(val));
				if (!$administStatsMain.util.isEmpty(unit)) {
					returnStr += " " + unit;
				}
			}
			returnStr += "</span>";
		} else {
			returnStr += noDataMsg;
		}
		return returnStr;
	};
	opt.exportingDataLabelsFormatter = function(that) {
		return opt.dataLabelsFormatter(that) + "<br />(" + opt.tooltipFormatter(that) + ")";
	};
	/*opt.eventClick = function(e, that) {
		const selTmsrParam2 = $.extend(true, _.cloneDeep(param), {
			surv_year_list : $administStatsMain.ui.dftYears.join(","),
			ov_l2_list : "30,40",
			tmsr_chartId : "tmsrChart2",
			tmsr_title : param.opt_chartNm + " 일자리 증감",
			tmsr_dataKey : "OV_L1_ID",
			tmsr_nameKey : "OV_L1_KOR",
			tmsr_colors : colors,
			opt_fnCalc : function(data) {
				let datas = [];
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					s.DTVAL_CO = s.DTVAL_CO * 1;
					for (let j = 0; j < data.length; j++) {
						let t = data[j];
						t.DTVAL_CO = t.DTVAL_CO * 1;
						if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID) {
							if (s.OV_L2_ID == "30" && t.OV_L2_ID == "40") {
								s.DTVAL_CO = s.DTVAL_CO - t.DTVAL_CO;
								s.dispUnitNm = "만개";
								datas.push(s);
							}
						}
					}
				}
				return datas;
			}
		});
		$administStatsMain.ui.chartItmClick({
			event : e,
			selTmsrParam2 : selTmsrParam2
		});
	};*/
	AdministStatsChart.ui.makeChart(opt);
}

/* 하드코딩 : 항목끼리 계산 */
/**
 * @name more1Chart11
 * @description 일자리 차트11
 */
function more1Chart11(data, param) {

	const survYearLists = param.surv_year_list.split(",");
	let isSetNoneChart = true;
	for (let i = 0; i < data.length; i++) {
		let s = data[i];
		if (s.PRD_DE == survYearLists[1]) {
			isSetNoneChart = false;
		}
		s.DTVAL_CO = s.DTVAL_CO * 1;
		for (let j = 0; j < data.length; j++) {
			let t = data[j];
			t.DTVAL_CO = t.DTVAL_CO * 1;
			if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID) {
				if (s.OV_L2_ID == "10") {
					s.OV_L2_ID = "CUSTOM01";
					s.OV_L2_KOR = "19세이하";
				} else if (s.OV_L2_ID == "20" && t.OV_L2_ID == "30") {
					s.OV_L2_ID = "CUSTOM02";
					s.OV_L2_KOR = "20~29세";
					s.DTVAL_CO += t.DTVAL_CO;
				} else if (s.OV_L2_ID == "40" && t.OV_L2_ID == "50") {
					s.OV_L2_ID = "CUSTOM03";
					s.OV_L2_KOR = "30~39세";
					s.DTVAL_CO += t.DTVAL_CO;
				} else if (s.OV_L2_ID == "60" && t.OV_L2_ID == "70") {
					s.OV_L2_ID = "CUSTOM04";
					s.OV_L2_KOR = "40~49세";
					s.DTVAL_CO += t.DTVAL_CO;
				} else if (s.OV_L2_ID == "80" && t.OV_L2_ID == "90") {
					s.OV_L2_ID = "CUSTOM05";
					s.OV_L2_KOR = "50~59세";
					s.DTVAL_CO += t.DTVAL_CO;
				} else if (s.OV_L2_ID == "100" && t.OV_L2_ID == "110") {
					s.OV_L2_ID = "CUSTOM06";
					s.OV_L2_KOR = "60세이상";
					s.DTVAL_CO += t.DTVAL_CO;
				}
			}
		}
	}

	if (isSetNoneChart) {
		$administStatsMain.ui.setNoneChart(param.opt_chartId, param.opt_chartNm);
		return false;
	}

	let datas = [];
	for (let i = 0; i < data.length; i++) {
		let s = data[i];
		if (s.OV_L2_ID.indexOf("CUSTOM") > -1) {
			datas.push(s);
		}
	}

	const toJson = $administStatsMain.util.setVariance($administStatsMain.util.arrayToJson({
		data : datas,
		key : "OV_L1_ID",
		key2 : "OV_L2_ID"
	}));
	const categories = [];

	let series = [];

	Object.keys(toJson[$administStatsMain.ui.selectedYear]).sort().reverse().forEach(function(OV_L1_ID) {
		const v = toJson[$administStatsMain.ui.selectedYear][OV_L1_ID]["CUSTOM01"];
		series.push({
			name : v.OV_L1_KOR,
			borderWidth : 1,
			borderColor : "#181818",
			pointWidth : 25,
			color : (function() {
				if (OV_L1_ID == "1") {
					return "#FF748E";
				} else {
					return "#27AEF1";
				}
			}()),
			data : (function(OV_L1_ID) {
				let dataArr = [];
				Object.keys(toJson[$administStatsMain.ui.selectedYear][OV_L1_ID]).sort().forEach(function(OV_L2_ID) {
					if (OV_L1_ID == "1") {
						categories.push(toJson[$administStatsMain.ui.selectedYear][OV_L1_ID][OV_L2_ID].OV_L2_KOR);
					}
					dataArr.push({
						y : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID][OV_L2_ID].iod == "-" ? 0 : toJson[$administStatsMain.ui.selectedYear][OV_L1_ID][OV_L2_ID].iod,
						dataObj : (function() {
							toJson[$administStatsMain.ui.selectedYear][OV_L1_ID][OV_L2_ID].OV_L2_ID = OV_L2_ID;
							return toJson[$administStatsMain.ui.selectedYear][OV_L1_ID][OV_L2_ID]
						}()),
					});
				});
				return dataArr;
			})(OV_L1_ID)
		});
	});

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.fontSize = "12px";
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.filename = $(".sb_year option:selected").text() + " " + param.opt_chartNm + " 일자리 증감";
	opt.series = series.slice().reverse();
	opt.xAxis = {
		categories : categories,
		labels : {
			enabled : true,
			formatter : function() {
				return '<span class="more2-label">'+ this.value + '</span>'; // x축 라벨
			},
		},
	};
	opt.yAxis = {
		gridLineWidth : 0,
		max : 30,
		min : -10,
		
		labels : {
			enabled : false,
			formatter : function() {
				if (this.value == 0) {
					return "<span style='font-weight: bold; color: " + AdministStatsChart.consts.sliceHighlightColor + ";'>" + this.value + "</span>";
				} else {
					return this.value;
				}
			}
		},
		plotLines : [ {
			//color : AdministStatsChart.consts.sliceHighlightColor,
			color : "#181818",
			width : 1,
			value : 0,
			zIndex : 2,
			
		} ]
	};
	opt.legend = {
		align : "left",
		verticalAlign : "top",
		layout : "horizontal",
		itemMarginTop : 2,
		itemMarginLeft : 0,
		symbolRadius : 2,
	};
	opt.cursor = "default";
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
				x : chartPosition.left + tooltipX,
				y : chartPosition.top + tooltipY + (labelHeight)
			}
		}
	};
	opt.isBigExporting = true;
	opt.seriesShowInLegend = true;
	opt.dataLabelsTextOutline = true;
	opt.tooltipFormatter = function(that) {
		//return $administStatsMain.util.addComma(that.point.dataObj.DTVAL_CO.toFixed(1)) + " 만개";
		return false;
	};
	opt.dataLabelsFormatter = function(that) {
		let returnStr = "";
		const dataLabelValue = that.point.y;

		if (that.point.dataObj.PRD_DE == $(".sb_year option:last").val() && dataLabelValue == 0) {
			return "전년<br />자료<br />없음";
		}

		if ($.isNumeric(dataLabelValue)) {
			if(dataLabelValue>0){
				returnStr += "<span class='fs11'>" + $administStatsMain.util.addComma(dataLabelValue.toFixed(1))+ "만개</span>";
			}else{
				returnStr += "<span class='fs11'>" + $administStatsMain.util.addComma(dataLabelValue.toFixed(1))+ "만개</span>";
			}
		} else {
			returnStr += "전년 자료 없음";
		}
		return returnStr;
	};
	/*opt.eventClick = function(e, that) {
		const selTmsrParam2 = $.extend(true, _.cloneDeep(param), {
			surv_year_list : $administStatsMain.ui.dftYears.join(","),
			tbl_id_list : e.point.dataObj.TBL_ID,
			ov_l1_list : e.point.dataObj.OV_L1_ID,
			tmsr_chartId : "tmsrChart2",
			tmsr_title : param.opt_chartNm + " 일자리 증감(" + e.point.dataObj.OV_L1_KOR + ")",
			tmsr_dataKey : "OV_L2_ID",
			tmsr_nameKey : "OV_L2_KOR",
			tmsr_colors : [],
			opt_fnCalc : function(data) {
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					s.DTVAL_CO = s.DTVAL_CO * 1;
					for (let j = 0; j < data.length; j++) {
						let t = data[j];
						t.DTVAL_CO = t.DTVAL_CO * 1;
						if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID) {
							if (s.OV_L2_ID == "10") {
								s.OV_L2_ID = "CUSTOM01";
								s.OV_L2_KOR = "19세이하";
							} else if (s.OV_L2_ID == "20" && t.OV_L2_ID == "30") {
								s.OV_L2_ID = "CUSTOM02";
								s.OV_L2_KOR = "20~29세";
								s.DTVAL_CO += t.DTVAL_CO;
							} else if (s.OV_L2_ID == "40" && t.OV_L2_ID == "50") {
								s.OV_L2_ID = "CUSTOM03";
								s.OV_L2_KOR = "30~39세";
								s.DTVAL_CO += t.DTVAL_CO;
							} else if (s.OV_L2_ID == "60" && t.OV_L2_ID == "70") {
								s.OV_L2_ID = "CUSTOM04";
								s.OV_L2_KOR = "40~49세";
								s.DTVAL_CO += t.DTVAL_CO;
							} else if (s.OV_L2_ID == "80" && t.OV_L2_ID == "90") {
								s.OV_L2_ID = "CUSTOM05";
								s.OV_L2_KOR = "50~59세";
								s.DTVAL_CO += t.DTVAL_CO;
							} else if (s.OV_L2_ID == "100" && t.OV_L2_ID == "110") {
								s.OV_L2_ID = "CUSTOM06";
								s.OV_L2_KOR = "60세이상";
								s.DTVAL_CO += t.DTVAL_CO;
							}
						}
					}
				}
				let datas = [];
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					if (s.OV_L2_ID.indexOf("CUSTOM") > -1) {
						datas.push(s);
					}
				}

				let datas_ = [];
				for (let i = 0; i < datas.length; i++) {
					let s = _.cloneDeep(datas[i]);
					s.DTVAL_CO = s.DTVAL_CO * 1;
					for (let j = 0; j < datas.length; j++) {
						let t = _.cloneDeep(datas[j]);
						t.DTVAL_CO = t.DTVAL_CO * 1;
						if (s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID && s.OV_L2_ID == t.OV_L2_ID) {
							if ((s.PRD_DE - 1) == t.PRD_DE) {
								s.DTVAL_CO = s.DTVAL_CO - t.DTVAL_CO;
							} else if (s.PRD_DE == $(".sb_year option:last").val()) {
								s.DTVAL_CO = 0;
								s.NO_DATA = true;
							}
							s.dispUnitNm = "만개";
							datas_.push(s);
						}
					}
				}
				return datas_;
			}
		});
		$administStatsMain.ui.chartItmClick({
			event : e,
			selTmsrParam2 : selTmsrParam2
		});
	};*/
	AdministStatsChart.ui.makeChart(opt);
}