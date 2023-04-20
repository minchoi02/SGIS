(function(W, D) {
	W.$administStatsMap = W.$administStatsMap || {};
	$administStatsMap.utils = {
		/**
		 * @name : getObjVal
		 * @description : Object 값 가져오기
		 * @param obj
		 *            Object 객체
		 * @param key
		 *            Object Key값
		 * @param defaultVal
		 *            기본값
		 */
		getObjVal : function getObjVal(obj, key, defaultVal) {
			if (!$.heum.hasData(obj)){
				return "";
			}else{
				if (obj[key] != undefined) {
					return obj[key];
				} else {
					return defaultVal === undefined ? "" : defaultVal;
				}
			}
		},
		/**
		 * @name : getTotsurvStatData
		 * @description : 차트용 데이터 조회
		 * @param param
		 *            json type 파라미터
		 * @param callback
		 *            콜백함수
		 */
		getTotsurvStatData : function(param, callback) {
			let result;
			let chartId = "";
			let chartTitle = "";

			/* 파라미터 배열인 경우 */
			if ($.isArray(param)) {

				result = new Object();
				let isSuccess = true;
				const params = param;

				if (params[0].hasOwnProperty("regn_title")) {
					/* 지역별 차트인 경우 */
					chartId = "regnChart";
					chartTitle = params[0].regn_title;
				} else if (params[0].hasOwnProperty("tmsr_chartId")) {
					/* 연도별 차트인 경우 */
					chartId = params[0].tmsr_chartId;
					chartTitle = params[0].tmsr_title;
				} else if (params[0].hasOwnProperty("opt_chartId")) {
					/* 일반 차트인 경우 */
					chartId = params[0].opt_chartId;
					chartTitle = params[0].opt_chartNm;
				}

				/* 차트정보 추가 */
				$administStatsMap.ui.info[chartId] = params[0];

				for (let i = 0; i < params.length; i++) {
					const res = getTotsurvStatData_(params[i]);
					if (res.length > 0) {
						result[params[i].tbl_id_list] = JSON.parse(JSON.stringify(res));
					} else {
						isSuccess = false;
						console.group("차트 생성용 데이터 없음");
						console.log(chartTitle + "[" + chartId + "]");
						console.log("데이터 조회용 파라미터 ↓");
						console.log(params[i]);
						console.groupEnd();
						break;
					}
				}

				if (isSuccess) {
					callback(result, params[0]);
				} else {
//					$administStatsMap.ui.setNoneChart(chartId, chartTitle);
				}
			} else {

				if (param.hasOwnProperty("regn_title")) {
					chartId = "regnChart";
					chartTitle = param.regn_title;
				} else if (param.hasOwnProperty("tmsr_chartId")) {
					chartId = param.tmsr_chartId;
					chartTitle = param.tmsr_title;
				} else if (param.hasOwnProperty("opt_chartId")) {
					chartId = param.opt_chartId;
					chartTitle = param.opt_chartNm;
				}

				if (!$administStatsMap.utils.isEmpty(chartId)) {

					result = new Array();
					let isSuccess = true;

					$administStatsMap.ui.info[chartId] = param;

					const tblIdLists = param.tbl_id_list.split(",");
					for (let i = 0; i < tblIdLists.length; i++) {

						const param_ = $.extend(true, JSON.parse(JSON.stringify(param)), {
							tbl_id_list : tblIdLists[i]
						});

						const res = getTotsurvStatData_(param_);
						if (res.length > 0) {
							result = result.concat(res);
						} else {
							isSuccess = false;
							console.group("차트 생성용 데이터 없음");
							console.log(chartTitle + "[" + chartId + "]");
							console.log("데이터 조회용 파라미터 ↓");
							console.log(param_);
							console.groupEnd();
							break;
						}
					}

					if (isSuccess) {
						callback(result, param);
					} else {
						if (!$administStatsMap.utils.isEmpty(chartId)) {
//							$administStatsMap.ui.setNoneChart(chartId, chartTitle);
						}
					}

				} else {
					const res = getTotsurvStatData_(param);
					if (res.length > 0) {
						result = res;
						callback(result, param);
					}
				}
			}

			function getTotsurvStatData_(param) {

				const param__ = JSON.parse(JSON.stringify(param));
				for ( let k in param__) {
					if (k.indexOf("_chartId") == -1 && k.indexOf("_chartSno") == -1) {
						if (k.indexOf("opt_") > -1 || k.indexOf("regn_") > -1 || k.indexOf("tmsr_") > -1) {
							delete param__[k];
							delete param__[k];
							delete param__[k];
						}
					}
				}

				let apiParamKey = "";
				if (param.opt_chartSno == undefined) {
					apiParamKey = param.tbl_id_list;
				} else {
					apiParamKey = param.opt_chartSno;
				}
				const opt_dispSrvList = $administStatsMap.utils.getObjVal($administStatsMap.ui.apiParam[apiParamKey], "opt_dispSrvList", []);

				let result = [];
				common_loading(true);
				$.ajax({
					method : "GET",
					async : false,
					// url : contextPath + "/view/kosisApi/TotsurvStatData.do",
					url : sgis4thApiPath,
					data : param__,
					dataType : "json",
					success : function(res) {
						if (res.length > 0) {
							for (let k = 0; k < res.length; k++) {
								for (let j = 0; j < opt_dispSrvList.length; j++) {
									res[k]["dispUnitNm"] = opt_dispSrvList[j].dispUnitNm;
									res[k]["kosisUnitNm"] = opt_dispSrvList[j].kosisUnitNm;
									let dataKey = opt_dispSrvList[j].varOrd == "0" ? "CHAR_ITM_ID" : "OV_L" + opt_dispSrvList[j].varOrd + "_ID";
									let nameKey = opt_dispSrvList[j].varOrd == "0" ? "CHAR_ITM_NM" : "OV_L" + opt_dispSrvList[j].varOrd + "_KOR";
									if (opt_dispSrvList[j].itmId == res[k][dataKey]) {
										res[k][nameKey] = opt_dispSrvList[j].altrtvDispWrd;
										if (opt_dispSrvList[j].subsumYn == "Y") {
											res[k]["subsumYn"] = opt_dispSrvList[j].subsumYn;
										}
										if (opt_dispSrvList[j].unactivyYn == "Y") {
											res[k]["unactivyYn"] = opt_dispSrvList[j].unactivyYn;
										}
										if (opt_dispSrvList[j].clickEventYn == "Y") {
											res[k]["clickEventYn"] = opt_dispSrvList[j].clickEventYn;
										}
										if (opt_dispSrvList[j].ttipUseYn == "Y") {
											res[k]["ttipUseYn"] = opt_dispSrvList[j].ttipUseYn;
										}
										if (opt_dispSrvList[j].labelUseYn == "Y") {
											res[k]["labelUseYn"] = opt_dispSrvList[j].labelUseYn;
										}
										if (opt_dispSrvList[j].useYnByYearChart == "Y") {
											res[k]["useYnByYearChart"] = opt_dispSrvList[j].useYnByYearChart;
										}
										if (!$administStatsMap.utils.isEmpty(opt_dispSrvList[j].chartNmByArea)) {
											res[k]["chartNmByArea"] = opt_dispSrvList[j].chartNmByArea;
										}
										if (!$administStatsMap.utils.isEmpty(opt_dispSrvList[j].chartNmByYear)) {
											res[k]["chartNmByYear"] = opt_dispSrvList[j].chartNmByYear;
										}
									}
								}
							}
							result = res;
						}
					},
					error : function(e) {
						// alert("failed");
					},
					complete : function(){
						common_loading(false);
					}
				});
				return result;
			}
		},
		convertMapData:function({res,parameters}){
			let forResultMapData = {};
			let resultMapData = {
				result : {
					mapData : []
				}
			};

			for (var i = 0; i < res.length; i++) {
				if (typeof forResultMapData[res[i].OV_L1_ID] == "undefined") {
					forResultMapData[res[i].OV_L1_ID] = new Object();
				}
				forResultMapData[res[i].OV_L1_ID][res[i][parameters.regn_dataKey]] = res[i];
			}

			for ( var key1 in forResultMapData) {
				var forMapData = {};
				for ( var key2 in forResultMapData[key1]) {
					if (forResultMapData[key1][key2].OV_L1_ID.length > 2) {
						forMapData.adm_cd = forResultMapData[key1][key2].OV_L1_ID.substring(1, 3);
					} else {
						forMapData.adm_cd = forResultMapData[key1][key2].OV_L1_ID;
					}
					forMapData.region_nm = forResultMapData[key1][key2].OV_L1_KOR;
					forMapData.dt = parseFloat(forResultMapData[key1][key2].DTVAL_CO);
					if(isNaN(forMapData.dt)){
						forMapData.dt = forResultMapData[key1][key2].DTVAL_CO;
					}
					forMapData.dispUnitNm = forResultMapData[key1][key2].dispUnitNm;
				}
				resultMapData.result.mapData.push(forMapData);
			}	
			return resultMapData;
		},
		/**
		 * @name : getAPIParam
		 * @description : API 파라미터 셋팅
		 */
		getAPIParam : function(pObj) {

			let result = {};

//			pObj["tblIdList"] = $administStatsMap.utils.getObjVal(pObj, "tblIdList", "");
//			pObj["callback"] = $administStatsMap.utils.getObjVal(pObj, "callback", undefined);
//
//			const param = {
//				org_id_list : "101",
//				chart_ord : "1",
//				tbl_id_list : pObj["tblIdList"]
//			}
			pObj["iem_cl"] = $.heum.getAllParameter().theme.toUpperCase();
			pObj["callback"] = $administStatsMap.utils.getObjVal(pObj, "callback", undefined);

			const param = {
				org_id_list : "101",
				iem_cl : pObj["iem_cl"]
			}
			$.ajax({
				method : "POST",
				async : false, // 반드시 동기처리 해야 함
				url : sgisContextPath + "/ServiceAPI/administStats/common/getDispSrvList.json",
				data : param,
				dataType : "json",
			}).done(function(res) {
				$.each(res.result.resultList, function(i, v) {
					if (typeof result[v.tblId] == "undefined") {
						result[v.tblId] = {
							surv_year_list : "",
							org_id_list : v.orgId,
							tbl_id_list : v.tblId,
							list_var_ord_list : "",
							char_itm_id_list : "",
							prt_type : "",
							adm_cd : "",
							ov_l1_list : "",
							ov_l2_list : "",
							ov_l3_list : "",
							ov_l4_list : "",
							ov_l5_list : "",
							category : "",
							odr_col_list : "",
							odr_type : "",
							char_itm_id_list_arr : [],
							ov_l1_list_arr : [],
							ov_l2_list_arr : [],
							ov_l3_list_arr : [],
							ov_l4_list_arr : [],
							ov_l5_list_arr : [],

							opt_chartType : "",
							opt_dispUnitNm : "",
							opt_chartNm : "",
							opt_dispSrvList : [],
							opt_kosisUnitNm : "",
							opt_stattbUrls : [],
						};
					}
					switch (v.varOrd) {
						case 0:
							result[v.tblId].char_itm_id_list_arr.push(v.itmId);
							break;
						case 1:
							result[v.tblId].ov_l1_list_arr.push(v.itmId);
							break;
						case 2:
							result[v.tblId].ov_l2_list_arr.push(v.itmId);
							break;
						case 3:
							result[v.tblId].ov_l3_list_arr.push(v.itmId);
							break;
						case 4:
							result[v.tblId].ov_l4_list_arr.push(v.itmId);
							break;
						case 5:
							result[v.tblId].ov_l5_list_arr.push(v.itmId);
							break;
					}

					result[v.tblId].opt_dispUnitNm = v.dispUnitNm;
					result[v.tblId].opt_chartNm = v.chartNm;
					result[v.tblId].opt_kosisUnitNm = v.kosisUnitNm;
					if (result[v.tblId].opt_stattbUrls.length == 0) {
						result[v.tblId].opt_stattbUrls.push(v.stattbUrl);
					}
					result[v.tblId].opt_dispSrvList.push(v);
					switch (v.chartType) {
						case "CH1S06":
							result[v.tblId].opt_chartType = "pie";
							break;
						case "CH1S01":
							result[v.tblId].opt_chartType = "bar";
							break;
						case "CH1S02":
							result[v.tblId].opt_chartType = "column";
							break;
						case "CH1S03":
							result[v.tblId].opt_chartType = "area";
							break;
					}
				});

				for ( let tblIdKey in result) {
					result[tblIdKey].char_itm_id_list = result[tblIdKey].char_itm_id_list_arr.join(",");
					result[tblIdKey].ov_l1_list = result[tblIdKey].ov_l1_list_arr.join(",");
					result[tblIdKey].ov_l2_list = result[tblIdKey].ov_l2_list_arr.join(",");
					result[tblIdKey].ov_l3_list = result[tblIdKey].ov_l3_list_arr.join(",");
					result[tblIdKey].ov_l4_list = result[tblIdKey].ov_l4_list_arr.join(",");
					result[tblIdKey].ov_l5_list = result[tblIdKey].ov_l5_list_arr.join(",");
					delete result[tblIdKey].char_itm_id_list_arr;
					delete result[tblIdKey].ov_l1_list_arr;
					delete result[tblIdKey].ov_l2_list_arr;
					delete result[tblIdKey].ov_l3_list_arr;
					delete result[tblIdKey].ov_l4_list_arr;
					delete result[tblIdKey].ov_l5_list_arr;
				}

				pObj["callback"](result);
			});
		},
		/**
		 * @name : arrayToJson
		 * @description : API Array를 Json으로 변환
		 * @param data
		 *            배열
		 * @param key
		 *            1레벨 key
		 * @param key2
		 *            2레벨 key
		 * @param ignoreValueArr
		 *            제외 값 배열
		 */
		arrayToJson : function(pObj) {

			let result = {};
			const p_data = $administStatsMap.utils.getObjVal(pObj, "data", {});
			const p_key0 = $administStatsMap.utils.getObjVal(pObj, "key0", "PRD_DE");
			const p_key = $administStatsMap.utils.getObjVal(pObj, "key", "");
			const p_key2 = $administStatsMap.utils.getObjVal(pObj, "key2", "");
			const p_ignoreValueArr = $administStatsMap.utils.getObjVal(pObj, "ignoreValueArr", []);

			for (let i = 0; i < p_data.length; i++) {
				if ($.inArray(p_data[i][p_key], p_ignoreValueArr) === -1) {

					if (isNaN(p_data[i].DTVAL_CO * 1)) {
						p_data[i].DTVAL_CO = 0;
					}
					if (typeof p_data[i].DTVAL_CO == "string") {
						p_data[i].DTVAL_CO = p_data[i].DTVAL_CO * 1;
					}

					if (typeof result[p_data[i][p_key0]] == "undefined") {
						result[p_data[i][p_key0]] = new Object();
					}

					if ($administStatsMap.utils.isEmpty(p_key)) {
						result[p_data[i][p_key0]] = p_data[i];
						continue;
					}

					if (typeof result[p_data[i][p_key0]][p_data[i][p_key]] == "undefined") {
						result[p_data[i][p_key0]][p_data[i][p_key]] = new Object();
					}
					if ($administStatsMap.utils.isEmpty(p_key2)) {
						result[p_data[i][p_key0]][p_data[i][p_key]] = p_data[i];
						continue;
					}

					if (typeof result[p_data[i][p_key0]][p_data[i][p_key]][p_data[i][p_key2]] == "undefined") {
						result[p_data[i][p_key0]][p_data[i][p_key]][p_data[i][p_key2]] = new Object();
					}
					result[p_data[i][p_key0]][p_data[i][p_key]][p_data[i][p_key2]] = p_data[i];

				}
			}

			return result;
		},
		/**
		 * @name : isEmpty
		 * @description : Empty 여부
		 * @param obj
		 *            Object 객체
		 */
		isEmpty : function(obj) {
			if (obj == undefined || obj == null || String(obj) == "")
				return true;
			else
				return false;
		},
		/**
		 * @name : abbreviationToAddress
		 * @description : 시도 약어로 replace
		 * @param address
		 *            시도
		 */
		abbreviationToAddress : function(address) {
			const abbreviationAddress = address.replace("특별시", "").replace("광역시", "").replace("특별자치시", "").replace("특별자치도", "").replace("경기도", "경기").replace("강원도", "강원").replace("충청북도", "충북").replace("충청남도", "충남").replace("전라북도", "전북").replace("전라남도", "전남").replace("경상북도", "경북").replace("경상남도", "경남");
			return abbreviationAddress;
		},
		/**
		 * @name : sortJSON
		 * @description : jsonArray json 값으로 정렬
		 * @param data
		 *            정렬대상배열
		 * @param key
		 *            정렬기준값 key
		 * @param type
		 *            asc OR desc
		 */
		sortJSON : function(data, key, type) {
			if (type == undefined) {
				type = "asc";
			}
			return data.sort(function(a, b) {
				const x = a[key];
				const y = b[key];
				if (type == "desc") {
					return x > y ? -1 : x < y ? 1 : 0;
				} else if (type == "asc") {
					return x < y ? -1 : x > y ? 1 : 0;
				}
			});
		},
		/**
		 * @name setVariance
		 * @description arrayToJson 결과에 전년대비/전년동기대비 증감율(roc), 증감(iod) set
		 * @param data
		 *            json
		 */
		setVariance : function(data) {

			if ($.isNumeric(Object.keys(data)[0]) && (Object.keys(data)[0].length == 4 || Object.keys(data)[0].length == 6)) {
				for ( let PRD_DE in data) {
					if (data[PRD_DE].DTVAL_CO != undefined) {
						let lastYearVal = 0;
						const thisYearVal = data[PRD_DE].DTVAL_CO;
						let PRD_DE_last = ((PRD_DE * 1) - 1) + "";
						if (PRD_DE.length > 4) {
							PRD_DE_last = (PRD_DE.substring(0, 4) - 1) + "" + PRD_DE.substring(4, 6);
						}
						if (typeof data[PRD_DE_last] == "object") {
							lastYearVal = data[PRD_DE_last].DTVAL_CO;
							data[PRD_DE].roc = (((thisYearVal - lastYearVal) / Math.abs(lastYearVal)) * 100);
							data[PRD_DE].roc = isNaN(data[PRD_DE].roc) ? 0 : data[PRD_DE].roc;
							data[PRD_DE].iod = thisYearVal - lastYearVal * 1;
							data[PRD_DE].iod = isNaN(data[PRD_DE].iod) ? 0 : data[PRD_DE].iod;
						} else {
							data[PRD_DE].roc = "-";
							data[PRD_DE].iod = "-";
						}
						continue;
					}

					for ( let k1 in data[PRD_DE]) {
						if (data[PRD_DE][k1].DTVAL_CO != undefined) {
							let lastYearVal = 0;
							const thisYearVal = data[PRD_DE][k1].DTVAL_CO;
							let PRD_DE_last = ((PRD_DE * 1) - 1) + "";
							if (PRD_DE.length > 4) {
								PRD_DE_last = (PRD_DE.substring(0, 4) - 1) + "" + PRD_DE.substring(4, 6);
							}
							if (typeof data[PRD_DE_last] == "object" && typeof data[PRD_DE_last][k1] == "object") {
								lastYearVal = data[PRD_DE_last][k1].DTVAL_CO;
								data[PRD_DE][k1].roc = (((thisYearVal - lastYearVal) / Math.abs(lastYearVal)) * 100);
								data[PRD_DE][k1].roc = isNaN(data[PRD_DE][k1].roc) ? 0 : data[PRD_DE][k1].roc;
								data[PRD_DE][k1].iod = thisYearVal - lastYearVal * 1;
								data[PRD_DE][k1].iod = isNaN(data[PRD_DE][k1].iod) ? 0 : data[PRD_DE][k1].iod;
							} else {
								data[PRD_DE][k1].roc = "-";
								data[PRD_DE][k1].iod = "-";
							}
							continue;
						}

						for ( let k2 in data[PRD_DE][k1]) {
							let lastYearVal = 0;
							const thisYearVal = data[PRD_DE][k1][k2].DTVAL_CO;
							let PRD_DE_last = ((PRD_DE * 1) - 1) + "";
							if (PRD_DE.length > 4) {
								PRD_DE_last = (PRD_DE.substring(0, 4) - 1) + "" + PRD_DE.substring(4, 6);
							}
							if (typeof data[PRD_DE_last] == "object" && typeof data[PRD_DE_last][k1][k2] == "object") {
								lastYearVal = data[PRD_DE_last][k1][k2].DTVAL_CO;
								data[PRD_DE][k1][k2].roc = (((thisYearVal - lastYearVal) / Math.abs(lastYearVal)) * 100);
								data[PRD_DE][k1][k2].roc = isNaN(data[PRD_DE][k1][k2].roc) ? 0 : data[PRD_DE][k1][k2].roc;
								data[PRD_DE][k1][k2].iod = thisYearVal - lastYearVal * 1;
								data[PRD_DE][k1][k2].iod = isNaN(data[PRD_DE][k1][k2].iod) ? 0 : data[PRD_DE][k1][k2].iod;
							} else {
								data[PRD_DE][k1][k2].roc = "-";
								data[PRD_DE][k1][k2].iod = "-";
							}
						}
					}
				}

			} else if ($.isNumeric(Object.keys(data)[0]) 
							&& (Object.keys(data)[0].length == 3 && data[Object.keys(data)[0]][Object.keys(data[Object.keys(data)[0]])[0]].TBL_ID == 'DT_1NW2026')) {
				for ( let PRD_DE in data) {
					if (data[PRD_DE].DTVAL_CO != undefined) {
						let lastYearVal = 0;
						const thisYearVal = data[PRD_DE].DTVAL_CO;
						let PRD_DE_last = ((PRD_DE * 1) - 1) + "";
						if (PRD_DE.length > 4) {
							PRD_DE_last = (PRD_DE.substring(0, 4) - 1) + "" + PRD_DE.substring(4, 6);
						}
						if (typeof data[PRD_DE][k1] == "object") {
							lastYearVal = data[PRD_DE_last].DTVAL_CO;
							data[PRD_DE].roc = (((thisYearVal - lastYearVal) / Math.abs(lastYearVal)) * 100);
							data[PRD_DE].roc = isNaN(data[PRD_DE].roc) ? 0 : data[PRD_DE].roc;
							data[PRD_DE].iod = thisYearVal - lastYearVal * 1;
							data[PRD_DE].iod = isNaN(data[PRD_DE].iod) ? 0 : data[PRD_DE].iod;
						} else {
							data[PRD_DE].roc = "-";
							data[PRD_DE].iod = "-";
						}
						continue;
					}

					for ( let k1 in data[PRD_DE]) {
						if (data[PRD_DE][k1].DTVAL_CO != undefined) {
							let lastYearVal = 0;
							const thisYearVal = data[PRD_DE][k1].DTVAL_CO;
							let PRD_DE_last = ((parseInt(k1) * 1) - 1) + "";
							if (parseInt(k1).length > 4) {
								PRD_DE_last = (parseInt(k1).substring(0, 4) - 1) + "" + parseInt(k1).substring(4, 6);
							}
							if (typeof data[PRD_DE][k1] == "object") {
								if(data[PRD_DE][PRD_DE_last] != undefined) {
									lastYearVal = data[PRD_DE][PRD_DE_last].DTVAL_CO;
									data[PRD_DE][k1].roc = (((thisYearVal - lastYearVal) / Math.abs(lastYearVal)) * 100);
									data[PRD_DE][k1].roc = isNaN(data[PRD_DE][k1].roc) ? 0 : data[PRD_DE][k1].roc;
									data[PRD_DE][k1].iod = thisYearVal - lastYearVal * 1;
									data[PRD_DE][k1].iod = isNaN(data[PRD_DE][k1].iod) ? 0 : data[PRD_DE][k1].iod;
								} else {
									data[PRD_DE][k1].roc = "-";
									data[PRD_DE][k1].iod = "-";
								}
							} else {
								data[PRD_DE][k1].roc = "-";
								data[PRD_DE][k1].iod = "-";
							}
							continue;
						}

						for ( let k2 in data[PRD_DE][k1]) {
							let lastYearVal = 0;
							const thisYearVal = data[PRD_DE][k1][k2].DTVAL_CO;
							let PRD_DE_last = ((PRD_DE * 1) - 1) + "";
							if (PRD_DE.length > 4) {
								PRD_DE_last = (PRD_DE.substring(0, 4) - 1) + "" + PRD_DE.substring(4, 6);
							}
							if (typeof data[PRD_DE][k1] == "object") {
								lastYearVal = data[PRD_DE_last][k1][k2].DTVAL_CO;
								data[PRD_DE][k1][k2].roc = (((thisYearVal - lastYearVal) / Math.abs(lastYearVal)) * 100);
								data[PRD_DE][k1][k2].roc = isNaN(data[PRD_DE][k1][k2].roc) ? 0 : data[PRD_DE][k1][k2].roc;
								data[PRD_DE][k1][k2].iod = thisYearVal - lastYearVal * 1;
								data[PRD_DE][k1][k2].iod = isNaN(data[PRD_DE][k1][k2].iod) ? 0 : data[PRD_DE][k1][k2].iod;
							} else {
								data[PRD_DE][k1][k2].roc = "-";
								data[PRD_DE][k1][k2].iod = "-";
							}
						}
					}
				}
			} else {
				for ( let key1 in data) {
					for ( let PRD_DE in data[key1]) {
						if (data[key1][PRD_DE].DTVAL_CO != undefined) {
							let lastYearVal = 0;
							const thisYearVal = data[key1][PRD_DE].DTVAL_CO;
							let PRD_DE_last = ((PRD_DE * 1) - 1) + "";
							if (PRD_DE.length > 4) {
								PRD_DE_last = (PRD_DE.substring(0, 4) - 1) + "" + PRD_DE.substring(4, 6);
							}
							if (typeof data[key1][PRD_DE_last] == "object") {
								lastYearVal = data[key1][PRD_DE_last].DTVAL_CO;
								data[key1][PRD_DE].roc = (((thisYearVal - lastYearVal) / Math.abs(lastYearVal)) * 100);
								data[key1][PRD_DE].roc = isNaN(data[key1][PRD_DE].roc) ? 0 : data[key1][PRD_DE].roc;
								data[key1][PRD_DE].iod = thisYearVal - lastYearVal * 1;
								data[key1][PRD_DE].iod = isNaN(data[key1][PRD_DE].iod) ? 0 : data[key1][PRD_DE].iod;
							} else {
								data[key1][PRD_DE].roc = "-";
								data[key1][PRD_DE].iod = "-";
							}
							continue;
						}
					}
				}
			}

			return data;
		},
		/**
		 * @name getVarianceText
		 * @description 증감 텍스트 반환
		 * @param param
		 *            파라미터
		 */
		getVarianceText : function(param) {

			const prefix = $administStatsMap.utils.getObjVal(param, "prefix", "");
			const digits = $administStatsMap.utils.getObjVal(param, "digits", 0);
			let val = $administStatsMap.utils.getObjVal(param, "val", 0);
			if (digits > 0 && $.isNumeric(val)) {
				val = val.toFixed(digits);
			}
			const unit = $administStatsMap.utils.getObjVal(param, "unit", "");
			const postfixs = $administStatsMap.utils.getObjVal(param, "postfixs", []);
			const noDataMsg = $administStatsMap.utils.getObjVal(param, "noDataMsg", "전년 자료 없음");

			let returnStr = prefix;
			if ($.isNumeric(val)) {
				if (val > 0) {
					returnStr += $administStatsMap.utils.addComma(val);
					if (!$administStatsMap.utils.isEmpty(unit)) {
						returnStr += " " + unit;
					}
					if (postfixs.length > 0) {
						returnStr += " " + postfixs[0];
					}
				} else if (val < 0) {
					if (postfixs.length > 0) {
						returnStr += $administStatsMap.utils.addComma(Math.abs(val))
					} else {
						returnStr += $administStatsMap.utils.addComma(val);
					}
					if (!$administStatsMap.utils.isEmpty(unit)) {
						returnStr += " " + unit;
					}
					if (postfixs.length > 0) {
						returnStr += " " + postfixs[1];
					}
				} else {
					returnStr += $administStatsMap.utils.addComma(Math.abs(val));
					if (!$administStatsMap.utils.isEmpty(unit)) {
						returnStr += " " + unit;
					}
				}
			} else {
				returnStr += noDataMsg;
			}
			return returnStr;
		},
		/**
		 * @name addComma
		 * @description 숫자에 천단위 콤마추가 및 꼬리말 추가 **
		 */
		addComma : function(pNumberString, pTrailer) {
			if (pNumberString == "-") {
				return pNumberString;
			}
			if (pNumberString == undefined) {
				return "";
			}

			let parts = pNumberString.toString().split(".");
			let str = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");

			if (typeof pTrailer != "undefined") {
				str += pTrailer;
			}

			return str;
		},
	};
}(window, document));