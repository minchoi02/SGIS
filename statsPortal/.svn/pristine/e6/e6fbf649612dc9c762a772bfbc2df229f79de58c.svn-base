/**
 * 행정통계시각화 대쉬보드 맵 서비스
 */
(function(W, D) {
	W.$administStatsMap = W.$administStatsMap || {};

	$(document).ready(function() {
	});

	$administStatsMap = {
		noReverseGeoCode : false
	};

	$administStatsMap.ui = {
		regionCd : "00",
		map : null,
		namespace : "administStatsMap",
		searchBtnType : "normal",
		mapList : [],
		curBtnId : '',
		curMapId : 0,
		isInnerMapShow : false,
		curDropParams : [],
		combinePopup : null,
		buildPopup : null,
		reportPopup : null,
		dropBtnInfo : [],
		dataTypeList : [],
		tutoIndex : 0,

		prevZoom : "1", // 지도 이동 이벤트에서 드래그를 막기위한 이전 줌 변수
		isAtdrc : false, // 비자치구 여부 (ex 수원시 (5자리) 클릭시 구정보 조회) / census 조회시
		// true면 5자리라도 조회 안하도록

		// 데이터
		mapData : null,
		mapRegionData : {}, // 지역경계 저장
		mapRegion : "", // 지역경계 sido, sgg, emdong, totreg
		mapType : "", // 지도유형 color, bubble, heat, poi, grid
		mapToggleId : "", // 맵 토글 id, 슬라이드 이동시에도 하이라이트 처리를 위해 사용
		mapTempColor : "", // 하이라이트를 위한 맵 임시 칼라
		tileTempColor : "", // 타일맵 하이라이트를 위한 임시 칼라 //2020-11-04 [곽제욱] 타일맵 하이라이트
		// 처리를 위한 변수 추가
		chartToggle : "", // 차트 토글 id가 들어감
		chartToggleYn : "N",
		mapTotalVal : 0, // 2020-11-17 [곽제욱] 맵 total값을 위한 변수 추가
		mapColor : "",

		/**
		 * 지도데이터 초기화
		 */
		clearLayer : function() {// used
			$administStatsMain.ui.log("$administStatsMap.ui.clearLayer - begin");

			const map = this.mapList[this.curMapId];
			map.clearLayer();
		},

		/**
		 *
		 * @name createMap
		 * @description 맵 및 맵에 오버레이될 그래프, 범례 등을 생성한다.
		 */
		createMap : function(id, seq) {

			this.map = new sMap.map();

			this.map.id = id;
			this.map.isDrop = true;
			this.map.isInnerMapShow = true;
			this.map.isTradeMapShow = false;
			this.map.boundLevel = 0; // 확대 상관없이 지역경계 표시하게함
			this.map.createMap($administStatsMap, id, {
				center : [ 1024426, 1754429 ],
//				center : [ 1114426, 1754429 ], /* 지도 시작 경계 좌표 */
				zoom : 1, // 9->8
				measureControl : false,
				statisticTileLayer : false
			});
			this.map.addControlEvent("zoomend");

			this.map.gMap.on("moveend", function(e) {
				const that = $administStatsMap.ui.map;
				if (that.delegate && that.delegate.callbackFunc && that.delegate.callbackFunc.didMapMoveEnd instanceof Function) {
					that.delegate.callbackFunc.didMapMoveEnd(e, that);
				}
			});

			// 지도 범례 등록
			let legend = new sLegendInfo.legendInfo($administStatsMap.ui.map);
			legend.linkTooltip = function() {
			}; // 툴팁오류 방지
			legend.drawBubbleMap = $administStatsMap.ui.drawBubbleMap; // 버블 지도
			// Override
			legend.initialize($administStatsMap.ui);
			this.map.legend = legend;
			legend.createLegend();

			this.map.gMap.whenReady(function() {
				$administStatsMap.ui.map.createHeatMap();
			});

		},

		/**
		 *
		 * @name clearMap
		 * @description 지도 Clear
		 */
		clearMap : function(p_map) {
			try {
				p_map.clearLayer();
			} catch (e) {
			}
			p_map.bnd_year = bndYear;
			p_map.data = [];
			p_map.combineData = [];
			p_map.dataGeojson = null;
			p_map.curDropPolygonCode = null;
			p_map.valPerSlice = [];
			p_map.legendValue = [];
			p_map.lastGeojsonInfo = null;
			p_map.isNoReverseGeocode = false;
			p_map.isTradeMapShow = false;
			p_map.lastDrawList = [];
			p_map.legendValue.user = [];
			if (p_map.drawControl) {
				p_map.drawControl.removeOverlay();
			}
			if (p_map.mapMode != "white") {
				p_map.markers.clearLayers();
			}
			p_map.selectedBoundMode = null;
			p_map.selectedBoundList = [];
			p_map.dataGeojsonLayer = null;
			p_map.curAdmCd = null;
			p_map.dataForCombine = null;
			p_map.multiLayerControl.clear();
			p_map.legend.removeDataOverlay();
			p_map.legend.data = []; // 9월 서비스
			if (p_map.heatMap) {
				p_map.heatMap.setUTMKs([]);
			}
			p_map.gMap.eachLayer(function(layer) {
				if (layer._layer) {
					_layer.remove();
				}
			});
			p_map.markers.clearLayers();
		},

		/**
		 * @name doMaxSize
		 * @description 맵을 최대화한다.
		 */
		doMaxSize : function(type) {
		},

		/**
		 *
		 * @name doAddMap
		 * @description 맵을 추가한다.
		 */
		doAddMap : function(type) {
		},

		/**
		 * @name doRemoveMap
		 * @description 맵을 삭제한다.
		 * @param type :
		 *            1:1번맵, 2:2번맵, 3:3번맵
		 */
		doRemoveMap : function(type) {
		},

		/**
		 * @name doDone
		 * @description 경계정보를 설정한다.
		 * @param
		 */
		doDone : function(type) {
		},

		/**
		 * @name doCancel
		 * @description 경계정보 설정을 취소한다.
		 * @param
		 */
		doCancel : function(type) {
		},

		/**
		 * @name createInfoTooltip
		 * @description 경계레이어 선택 시, 툴팁을 생성하여 정보를 표출한다.
		 * @param event :
		 *            선택된 경계레이어
		 * @param data :
		 *            선택된 경계레이어의 데이터정보
		 */
		createInfoTooltip : function(event, data, type, map) {

			$("#mapToolTipTable").css({"text-align":"center"});
			$("#toolAdmNm").html("<p style='margin-right: 0px; padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + data.properties.adm_nm + "</p>");

			const total = $administStatsMap.ui.mapTotalVal;
			let ratio = 0;
			if (total != 0 && total != "") {
				if (data.info.length > 0) {
					ratio = (($.isNumeric(data.info[0][data.info[0].showData]) ? data.info[0][data.info[0].showData] : 0) / total * 100).toFixed(1);
				}
			} else {
				ratio = 100;
			}
			let lv_html = "";
			if(gv_mode == 'retun'){
				if (data.info.length > 0) {
					lv_html += "<p style='color: #0982d8; font-weight: 700; display: inline-block; margin-top: 0; padding-right: 3px;'>" + appendCommaToNumber(parseFloat(data.info[0][data.info[0].showData])) + "</p>";
				} else {
					lv_html += "<p>자료없음</p>"
				}
			}else{
				if (data.info.length > 0) {
					lv_html += "<p style='color: #0982d8; font-weight: 700; display: inline-block; margin-top: 0; padding-right: 3px;'>" + appendCommaToNumber(parseFloat(data.info[0][data.info[0].showData])) + "</p>";
				} else {
					lv_html += "<p>0</p>"
				}
			}

			let unit = "";
			if ($administStatsMain.ui.selRegnParam.hasOwnProperty("regn_unit")) {
				unit = $administStatsMain.ui.selRegnParam.regn_unit;
			} else {
				if(gv_mode == 'retun'){
					if (data.info.length > 0) {
						unit = data.info[0]["dispUnitNm"];
					} else {
						unit = "";
					}
				}else{
					if (data.info.length > 0) {
						unit = data.info[0]["dispUnitNm"];
					} else {
						unit = $administStatsMain.ui.selRegnParam.opt_dispUnitNm;
					}
				}
			}
			
			if(gv_mode == 'retun' && data.info.length <= 0 || $administStatsMain.ui.selSliceId == 'newlyChart3'){
				if($administStatsMain.ui.selSliceId == 'newlyChart3'){
					lv_html += "<span style='font-size: 14px;'>(" + unit + ")</span>";
				}
			}else{
				lv_html += "<span style='font-size: 14px;'>(" + unit + ")</span>";
				
				/* 표출단위가 %인 경우 툴팁에 전국대비 데이터를 보여주지 않는다. */
				if (unit != "%") {
					lv_html += "<br /><span style='font-size: 14px; padding-right: 3px;'>전국대비</span>";
					lv_html += "<p style='color: #EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px;'>" + ratio + "</p>";
					lv_html += "<span style='margin-right: 0px; font-size: 14px;'>%</span>";
				}
			}

			$("#toolAdmData").html(lv_html);
			const x = event.originalEvent.clientX + 20;
			const y = event.originalEvent.clientY - 70;
			$("#mapToolTipTable").css("left", x).css("top", y);
			$("#mapToolTipTable").show();
		},

		/**
		 * @name requestOpenApi
		 * @description 통계정보를 요청한다.
		 * @param options
		 */
		requestOpenApi : function(options) {
		},

		/**
		 * @name drawMapData
		 * @description 지도 데이터 그리기
		 * @param p_map_region
		 *            지역경계
		 * @param p_map_type
		 *            지도유형(heat 고정)
		 * @param p_data
		 *            맵 생성 데이터
		 */
		drawMapData : function(p_map_region, p_map_type, p_data) {

			$administStatsMap.ui.mapRegion = p_map_region;
			$administStatsMap.ui.mapType = p_map_type;

			// 지도 Clear
			$administStatsMap.ui.clearMap($administStatsMap.ui.map);
			// 색상/버블
			if (p_map_type == "color" || p_map_type == "bubble") {
				// 색상/버블 (시도)
				if (p_map_region == "sido") {
					$administStatsMap.ui.setAdministStatsData(p_data, function(p_list) {
						// 리스트에서 unit 가져오기
						let lv_unit = "개";
						if (p_list != null && p_list.length > 0) {
							if (p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") {
								lv_unit = p_list[0].unit;
							}
						}
						// 데이터 넣기
						$administStatsMap.ui.map.setStatsData("normal", {
							"pAdmCd" : "00",
							"result" : p_list
						}, "dt", lv_unit);

						// 경계 그리기
						$administStatsMap.ui.setAdministStatsRegion($administStatsMap.ui.map, "sido", $administStatsMap.ui.getAdministStatsRegionYear(), "", "", "", function() {
							if ($administStatsMap.ui.mapToggleId != "" && $administStatsMap.ui.mapToggleId != null) {
								if ($administStatsMap.ui.mapToggleId != $administStatsMain.ui.selectedArea) {
									$administStatsMap.ui.mapToggleId = $administStatsMain.ui.selectedArea;
								}
								const highLightAmdCd = $administStatsMap.ui.mapToggleId;
								$administStatsMap.ui.mapToggleId = "";
								$administStatsMap.ui.map.setPolyLayerHighlight(highLightAmdCd);
								$administStatsMap.ui.mapToggleId = highLightAmdCd;
								if ($administStatsMain.ui.selectedArea != "00") {
									let tempColor = '';
									for (let i = 0; i < $administStatsMain.ui.tilePerColor.length; i++) {
										if ($administStatsMain.ui.tilePerColor[i].adm_cd == $administStatsMain.ui.selectedArea) {
											tempColor = $administStatsMain.ui.tilePerColor[i].color
										}
									}
									if ($administStatsMap.ui.tileTempColor != "") {
										let tempColor = '';
										for (let i = 0; i < $administStatsMain.ui.tilePerColor.length; i++) {
											if ($administStatsMain.ui.tilePerColor[i].adm_cd == $administStatsMap.ui.mapToggleId) {
												tempColor = $administStatsMain.ui.tilePerColor[i].color
											}
										}
										$("rect[value='" + $administStatsMap.ui.mapToggleId + "']").attr("fill", tempColor);
									}
									$administStatsMap.ui.tileTempColor = $("rect[value='" + $administStatsMain.ui.selectedArea + "']").attr("fill");
									$("rect[value='" + $administStatsMain.ui.selectedArea + "']").attr("fill", "#0086c6");
								}
							}
						});
					});
				}
			}
		},

		/**
		 *
		 * @name setAdministStatsData
		 * @description 지도 데이터 가져오기
		 * @param p_data
		 *            맵 생성 데이터
		 * @param p_callback
		 *            콜백 함수
		 */
		setAdministStatsData : function(p_data, p_callback) {

			let forResultMapData = {};
			resultMapData = {
				result : {
					mapData : []
				}
			};

			for (let i = 0; i < p_data.length; i++) {
				if (typeof forResultMapData[p_data[i].OV_L1_ID] == "undefined") {
					forResultMapData[p_data[i].OV_L1_ID] = new Object();
				}
				forResultMapData[p_data[i].OV_L1_ID][p_data[i][$administStatsMain.ui.selRegnParam.regn_dataKey]] = p_data[i];
			}

			const opt_digits = $administStatsMain.util.getObjVal($administStatsMain.ui.selRegnParam, "opt_digits", 0);
			for ( let key1 in forResultMapData) {
				let forMapData = {};
				for ( let key2 in forResultMapData[key1]) {
					if (forResultMapData[key1][key2].OV_L1_ID.length > 2) {
						forMapData.adm_cd = forResultMapData[key1][key2].OV_L1_ID.substring(1, 3);
					} else {
						forMapData.adm_cd = forResultMapData[key1][key2].OV_L1_ID;
					}
					forMapData.region_nm = forResultMapData[key1][key2].OV_L1_KOR;
					forMapData.dt = (opt_digits == 0 ? forResultMapData[key1][key2].DTVAL_CO : (forResultMapData[key1][key2].DTVAL_CO * 1).toFixed(opt_digits));
					forMapData.dispUnitNm = forResultMapData[key1][key2].dispUnitNm;
				}
				resultMapData.result.mapData.push(forMapData);
			}

			$administStatsMap.ui.mapTotalVal = 0;
			const totalArray = resultMapData.result.mapData;
			for (let i = 0; i < totalArray.length; i++) {
				if(gv_mode =='retun'){
					if (totalArray[i].adm_cd == "00") {
						$administStatsMap.ui.mapTotalVal += parseFloat($.isNumeric(totalArray[i].dt) ? totalArray[i].dt : 0);
					}
				}else{
				if (totalArray[i].adm_cd != "00") {
					$administStatsMap.ui.mapTotalVal += parseFloat($.isNumeric(totalArray[i].dt) ? totalArray[i].dt : 0);
					}
				}
			}

			if (typeof p_callback === "function") {
				p_callback(resultMapData.result.mapData);
			}
		},

		/**
		 *
		 * @name setAdministStatsRegion
		 * @description 지도 경계 그리기
		 * @param p_map
		 *            지도 객체 p_region : 경계 구분 (sido/sgg/emdong/totreg)
		 *            (시도/시군구/읍면동/소지역) p_base_year : 대상년도 (옵션) p_sido_cd : 시도 코드
		 *            (옵션) p_sgg_cd : 시군구 코드 (옵션) p_emdong_cd : 읍면동 코드 (옵션)
		 *            p_callback : 콜백 함수
		 */
		setAdministStatsRegion : function(p_map, p_region, p_base_year, p_sido_cd, p_sgg_cd, p_emdong_cd, p_callback) {
			// 년도 입력이 들어왔는데 bndYear 보다 큰 경우 bndYear 사용
			if (p_base_year != undefined && p_base_year != null && p_base_year != "" && p_base_year > bndYear) {
				p_base_year = $administStatsMain.ui.selectedYear;
			}

			// 시도의 경우 js파일을 사용하기 떄문에 년도를 넣어야함
			if (p_region == "sido" || p_region == "sgg") {
				// 년도 입력 안들어온경우 common.js bndYear 사용
				if (p_base_year == undefined || p_base_year == null || p_base_year == "") {
					p_base_year = $administStatsMain.ui.selectedYear;
				}
			}

			if ($("#" + p_map.id + "_loading").length) {
				$("#" + p_map.id + "_loading").show();
			}

			// 이미 불러온 정보는 다시 불러오지 않게 처리
			let lv_adm_cd = "00";
			let lv_year = "max";

			if (p_base_year != undefined && p_base_year != null && p_base_year != "") {
				lv_year = p_base_year;
			}
			if (p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "" && p_sido_cd != "00") {
				lv_adm_cd = p_sido_cd;
				if (p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "" && p_sgg_cd != "999") {
					lv_adm_cd += p_sgg_cd;
					if (p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "")
						lv_adm_cd += p_emdong_cd;
				}
			}

			if (p_base_year == undefined || p_base_year == null || p_base_year == "") {
				p_base_year = bndYear;
			}
			p_map.lastGeojsonInfo = null;
			// 시도경계 불러오기
			p_map.openApiBoundarySido(p_base_year, function(p_map2, p_res) {
				// 정보 저장
				$administStatsMap.ui.mapRegionData[p_region + "_" + lv_year + "_" + lv_adm_cd] = p_res;
				// 로딩바 숨김
				// if ($administStatsMain.ui.currentPageName ==
				// "administStatsMap" && p_map.id == "administStatsMapMap") {
				// $administStatsMain.ui.loading(false);
				// }
				if ($("#" + p_map.id + "_loading").length) {
					$("#" + p_map.id + "_loading").hide();
				}

				let xcoor = 989674;
				let ycoor = 1818313;
				let zoomLevel;
				// 20201102 박은식 줌아웃 시 상위지역 코드가 전국 일 경우 줌 level 을 1로 변경 START
				if ($administStatsMain.ui.selectedArea == "00") {
					zoomLevel = 1;
				} else {
					zoomLevel = $administStatsMap.ui.map.zoom;
				}

				if ($administStatsMain.ui.selectedLevel == "0") {
					xcoor = 1014426;
					ycoor = 1754429;
				}
				// 20201102 박은식 줌아웃 시 상위지역 코드가 전국 일 경우 줌 level 을 1로 변경 END
				// p_map.mapMove([ xcoor, ycoor ], zoomLevel, true);

				// 콜백함수 호출
				if (typeof p_callback === "function") {
					p_callback();
				}
			});
		},

		/**
		 *
		 * @name getAdministStatsRegionYear
		 * @description 지도 경계 년도 가져오기
		 * @param
		 */
		getAdministStatsRegionYear : function() {
			if ($administStatsMap.ui.mapData == null) {
				return $administStatsMain.ui.selectedYear;
			}
			const lv_data = $administStatsMap.ui.mapData.data;
			let lv_year = $administStatsMain.ui.selectedYear; // 2020-12-02
			if (lv_data.surv_year != undefined && lv_data.surv_year != null && lv_data.surv_year != "" && ("" + lv_data.surv_year).length > 4) {
				lv_year = lv_data.surv_year.substr(0, 4);
				if ($.isNumeric(lv_year) == false) {
					if (lv_data.surv_year != undefined && lv_data.surv_year != null && lv_data.surv_year != "") {
						lv_year = lv_data.surv_year;
					} else {
						lv_year = bndYear;
					}
				}
			} else if (lv_data.surv_year != undefined && lv_data.surv_year != null && lv_data.surv_year != "") {
				lv_year = lv_data.surv_year;
			}
			return lv_year;
		},

		/**
		 *
		 * @name openApiBoundarySido
		 * @description 지도 경계 년도 가져오기
		 * @param
		 */
		openApiBoundarySido : function(year, callback) {// used
			$administStatsMain.ui.log("$administStatsMap.ui.openApiBoundarySido - begin");
			this.lastGeojsonInfo;

			$.ajax({
				type : "GET",
				url : "/js/data/geo_sido_" + year + ".js",
				success : function(res) {
					res["pAdmCd"] = "00";
					const tmpOption = {
						year : year,
						adm_cd : "00"
					}

					$administStatsMap.ui.map = $administStatsMap.ui.mapList[$administStatsMap.ui.curMapId];

					// $administStatsMap.ui.map.mapMove([ 989674, 1818313 ], 2);

					$administStatsMap.ui.lastGeojsonInfo = tmpOption;
					$administStatsMap.ui.setPolygonDataGeojson(res);

					if (callback != undefined && callback != null && callback instanceof Function) {
						callback.call(undefined, this, res); // 9월 서비스
					}
				},
				dataType : "json",
				error : function(e) {
					// alert(e.responseText);
				}
			});
		},

		/**
		 *
		 * @name setPolygonDataGeojson
		 * @description 지도 경계 년도 가져오기
		 * @param
		 */
		setPolygonDataGeojson : function(geoData) {// used
			$administStatsMain.ui.log("$administStatsMap.ui.setPolygonDataGeojson - begin");

			const that = $administStatsMap.ui;

			if (that.MapData.length > 0) {
				geoData = this.combineAdministStatsData(geoData);
			}

			// res = combineAdministStatsData(res);
			if (geoData.combine && this.data.length > 0) {
				if (this.map.dataGeojson) {
					this.map.dataGeojson.remove();
					this.map.dataGeojson = null;
				}
				this.map.addPolygonGeoJson(geoData, "data");

				this.map.dataGeojsonLayer = geoData;
				if (this.map.legend != null) {
					this.map.legend.changeDataMode(that.MapType);
				}
			} else {
				this.map.addPolygonGeoJson(geoData, "polygon");

				if (this.dataGeojson) {
					if (this.geojson.getBounds().equals(this.dataGeojson.getBounds())) {
						this.geojson.remove();
					}
				}

				if (this.multiLayerControl != undefined && this.multiLayerControl.dataGeojson) {
					for (let i = 0; i < this.multiLayerControl.dataGeojson.length; i++) {
						let dataGeojson = this.multiLayerControl.dataGeojson[i];
						if (this.geojson.getBounds().equals(dataGeojson.getBounds())) {
							this.geojson.remove();
						}
					}
				}
			}

			if (this.data.length > 0) {
				if (this.data[0].kosis) {
					// interactiveMapKosis.setResultDataOnMap();
				}
			}

			if (this.map.delegate && this.map.delegate.callbackFunc && this.map.delegate.callbackFunc.didFinishedHadmaArea instanceof Function) {
				this.map.delegate.callbackFunc.didFinishedHadmaArea(geoData, that);
			}
		},

		combineAdministStatsData : function(boundData, isPass) {// used
			$administStatsMain.ui.log("$administStatsMap.ui.combineAdministStatsData - begin");

			this.data = $administStatsMap.ui.MapData;

			for (let k = 0; k < this.data.length; k++) {
				if (this.data[k] != null) {
					boundData["combine"] = true;
				} else {
					boundData["combine"] = false;
				}

				for (let i = 0; i < boundData.features.length; i++) {
					const adm_cd = boundData.features[i].properties.adm_cd;
					if (boundData.features[i].info == null) {
						boundData.features[i]["info"] = [];
					}

					if (this.data[k] != null) {
						if (this.data[k].result != null) {
							for (let x = 0; x < this.data[k].result.length; x++) {
								for (key in this.data[k].result[x]) {
									if (key == "adm_cd") {
										if (adm_cd == this.data[k].result[x].adm_cd) {
											this.data[k].result[x]["showData"] = this.data[k].showData;
											this.data[k].result[x]["unit"] = this.data[k].unit;
											this.data[k].result[x]["legendIndex"] = k;
											boundData.features[i].info.push(this.data[k].result[x]);
											boundData.features[i]["dataIdx"] = x;
											boundData.features[i]["_dataIdx"] = this.data[k].result[x]["_dataIdx"];
											boundData.features[i]["dataLength"] = this.data.length;
											break;
										}
										break;
									}
								}
							}
						}
					}
				}
			}
			return boundData;
		},

		/**
		 * @name getCenterToAdmCd
		 * @description 지도의 중심점으로 집계구값 얻기
		 * @param center :
		 *            중심
		 * @param callback :
		 *            callback
		 */
		getCenterToAdmCd : function(center, callback) {
			let obj = new sop.openApi.personal.findcodeinsmallarea.api();
			let x, y;
			if (Object.prototype.toString.call(center) === "[object Array]" && center.length == 2) {
				x = center[0];
				y = center[1];
			} else {
				center = $administStatsMap.ui.map.gMap.getCenter();
				x = center.x;
				y = center.y;
			}

			if (accessToken == "none" || accessToken == undefined || accessToken == "" || accessToken == null) {
				accessTokenInfo();
			}

			obj.addParam("accessToken", accessToken);
			obj.addParam("x_coor", x);
			obj.addParam("y_coor", y);
			obj.request({
				method : "GET",
				async : true, // false : 로딩표시, true : 로딩숨김
				url : openApiPath + "/OpenAPI3/personal/findcodeinsmallarea.json",
				options : {
					callback : callback,
					center : center,
					target : $administStatsMap.ui
				}
			});
		},

		/**
		 * checkIsAtdrc 비자치구 여부 체크 admCd
		 */
		checkIsAtdrc : function(admCd) {
			$administStatsMap.ui.isAtdrc = false;
			// 비자치구 여부 체크
			if (admCd != undefined && admCd.length == 5) {
				// ajax 시작
				$.ajax({
					method : "POST",
					async : false, // 반드시 동기처리 해야 함
					url : contextPath + "/ServiceAPI/administStats/common/getAtdrcCheck.json",
					data : {
						year : $administStatsMain.ui.selectedYear,
						region_cd : admCd
					},
					dataType : "json",
				}).done(function(res) { // 완료
					if (res.errCd == "0") {
						console.log("################# res = " + res.result.rslt);
						$administStatsMap.ui.isAtdrc = res.result.rslt;
					}
				});

			} else {
				$administStatsMap.ui.isAtdrc = false;
			}
		}
	};

	// ==============================//
	// map event callback
	// ==============================//
	$administStatsMap.callbackFunc = {

		// 맵이동 시작시, 콜백 호출
		didMapMoveStart : function(event, map) {
			console.log("[administStatsMap.js] didMapMoveStart 호출");
		},

		// 맵이동 종료시, 콜백 호출
		didMapMoveEnd : function(event, map) {
			console.log("[administStatsMap.js] didMapMoveEnd 호출");
			console.log("[administStatsMap.js] didMapMoveEnd() $administStatsMap.ui.dropBtnInfo[map.id] [" + $administStatsMap.ui.dropBtnInfo[map.id]);
		},

		// 맵 줌시작 시, 콜백 호출
		didMapZoomStart : function(event, map) {
		},

		// 맵 줌 종료 시, 콜백 호출
		didMapZoomEnd : function(event, map) {
			console.log(">>>> didMapZoomEnd <<<");
			// 지도 확대 시 반응 없도록 수정
			return false;

			const lv_zoom = $administStatsMap.ui.map.zoom;
			console.log("lv_zoom = " + lv_zoom);
			const prevZoom = $administStatsMap.ui.prevZoom;
			// 줌레벨이 같을경우 경계 재조회 막음(드래그 이동시 이벤트 X)
			if (prevZoom != lv_zoom) {

				// 개방형 지도가 아닐경우에만 getCenterToAdmCd 안타도록 개선
				if ($(".mapInfo").css('display') == "none" || $(".mapInfo").css('display') == undefined) { // 2020-10-13
					const center = $administStatsMap.ui.map.gMap.getCenter();
					$administStatsMap.ui.getCenterToAdmCd(center, function(res) {

						const lv_from_sido_cd = $("#dash_sido").val();
						const lv_from_sgg_cd = $("#dash_sgg").val();
						const lv_from_emdong_cd = $("#dash_emdong").val();
						let lv_to_sido_cd = "";
						let lv_to_sgg_cd = "";
						let lv_to_emdong_cd = "";

						// center이 없을경우 맵 그리기 취소
						if (res.result == undefined) {
							return;
						} else {
							lv_to_sido_cd = res.result.sido_cd;
							lv_to_sgg_cd = res.result.sgg_cd;
							lv_to_emdong_cd = res.result.emdong_cd;
						}

						let lv_sido_change_yn = "N";
						let lv_sgg_change_yn = "N";
						let lv_emdong_change_yn = "N";
						let lv_atdrc_change_yn = "N";
						if (lv_from_sido_cd != lv_to_sido_cd)
							lv_sido_change_yn = "Y";
						if (lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd != lv_to_sgg_cd)
							lv_sgg_change_yn = "Y";
						if (lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd.substring(0, 2) != lv_to_sgg_cd.substring(0, 2))
							lv_atdrc_change_yn = "Y";
						if (lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd != lv_to_sgg_cd || lv_from_emdong_cd != lv_to_emdong_cd)
							lv_emdong_change_yn = "Y";

						if (lv_sido_change_yn == "Y" || lv_sgg_change_yn == "Y" || lv_emdong_change_yn == "Y") {
							$administStatsMain.ui.getAreaSido(res.result.sido_cd);
						}
						const adm_cd = lv_to_sido_cd;
						let sggZoom;
						let zoomLevel;
						/** 시도별 zoom 설정 */
						switch (adm_cd.length) {
							case 2:
								if ($administStatsMain.ui.selectedThema == "신혼부부") {
									if (adm_cd == '11' || adm_cd == '21' || adm_cd == '22' || adm_cd == '24' || adm_cd == '25' || adm_cd == '26' || adm_cd == '29') {
										// 서울(11), 부산(21), 대구(22), 광주(24),
										// 대전(25), 울산(26), 세종(29)
										sggZoom = 5;
									} else if (adm_cd == '23' || adm_cd == '39') {
										// 인천(23), 제주(39)
										sggZoom = 4;
									} else if (adm_cd == '31' || adm_cd == '32' || adm_cd == '33' || adm_cd == '34' || adm_cd == '35' || adm_cd == '36' || adm_cd == '37' || adm_cd == '38') {
										// 경기(31), 강원(32), 충북(33), 충남(34),
										// 전북(35), 전남(36), 경북(37), 경남(38)
										sggZoom = 3;
									} else {
										sggZoom = 1;
									}
								} else {
									if (adm_cd == '11' || adm_cd == '21' || adm_cd == '24' || adm_cd == '25' || adm_cd == '29') {
										// 서울(11), 부산(21), 광주(24), 대전(25),
										// 세종(29)
										sggZoom = 5;
									} else if (adm_cd == '39' || adm_cd == '22' || adm_cd == '26') {
										// 제주(39), 대구(22), 울산(26)
										sggZoom = 4;
									} else if (adm_cd == '31' || adm_cd == '33' || adm_cd == '34' || adm_cd == '35' || adm_cd == '36' || adm_cd == '38' || adm_cd == '23') {
										// 경기(31), 충북(33), 충남(34), 전북(35),
										// 전남(36), 경남(38), 인천(23)
										sggZoom = 3;
									} else if (adm_cd == '32' || adm_cd == '37') {
										// 강원(32), 경북(37)
										sggZoom = 2;
									} else {
										sggZoom = 1;
									}
								}
								break;
							default:
								zoomLevel = 1;
								break;
						}
						$administStatsMain.ui.chartSaveClear();
						if (lv_zoom < sggZoom) {
							if ($administStatsMap.ui.mapRegion != "sido") {
								$administStatsMain.ui.selectedLevel = "0";
								$("#dash_sido").val("99");
								$("#dash_sgg").val("999");
								// $administStatsMain.ui.pathChange("nationwide",
								// "00");
								$administStatsMain.ui.selectedArea = "00";
								const selectedThema = $administStatsMain.ui.selectedThema;
								// 각 주제별 차트 변화함수 호출
								$administStatsMain.ui.selectedLevel = "0";
								if (selectedThema == "신혼부부") {
									$newlyDash.event.allChange("00", "1");
								} else if (selectedThema == "주택소유") {
									$houseDash.event.allChange("00", "1");
								} else if (selectedThema == "중·장년층") {
									$middlDash.event.allChange("00", "1");
								} else if (selectedThema == "귀농·귀어·귀촌") {
									$retunDash.event.allChange("00", "1");
								}
							}

						}
						// 경기도 -> 전국 이동
						else if (((lv_zoom == 2 && selectedThema == "신혼부부") || (lv_zoom == 1 && selectedThema != "신혼부부")) && $administStatsMain.ui.selectedArea == "00") {// 20201103
							console.log("줌.... 시도 => 전국 = ");
							return;
						} else if (lv_zoom >= sggZoom && lv_zoom <= 8) {
							const adm_cd2 = lv_to_sido_cd + "" + lv_to_sgg_cd;
							let emdongZoom = 6;
							/** 시도별 zoom 설정 */
							switch (adm_cd2.length) {
								case 5:
									$administStatsMap.ui.checkIsAtdrc(adm_cd2.substring(0, 4) + "0");
									if ($administStatsMap.ui.isAtdrc == true) {
										emdongZoom = 6;
									} else {
										emdongZoom = 6;
									}
									break;
								default:
									// zoomLevel = 1;
									break;
							}
							if (lv_zoom >= emdongZoom) {
								if (!($administStatsMap.ui.mapRegion == "sgg" && lv_sido_change_yn == "N" && !$administStatsMap.ui.isAtdrc)) {
									if ($administStatsMap.ui.mapRegion != "emdong" && lv_atdrc_change_yn == "Y") {
										$("#dash_sido").val(lv_to_sido_cd);
										$("#dash_sgg").val(lv_to_sgg_cd.substring(0, 2) + "0");
										// 시군구 조회
										$administStatsMain.ui.selectedArea = lv_to_sido_cd + "" + lv_to_sgg_cd.substring(0, 2) + "0";
										// $administStatsMain.ui.pathChange("sgg",
										// lv_to_sgg_cd.substring(0, 2) + "0");
										$administStatsMap.ui.drawMapData("sgg", "color");
										$administStatsMap.ui.mapRegion = "sgg";

										$administStatsMain.ui.selectedLevel = "2";
										if ($administStatsMain.ui.selectedThema == "신혼부부") {
											$newlyDash.event.allChange($administStatsMain.ui.selectedArea, "2");
										} else if ($administStatsMain.ui.selectedThema == "주택소유") {
											$houseDash.event.allChange($administStatsMain.ui.selectedArea, "2");
										} else if ($administStatsMain.ui.selectedThema == "중·장년층") {
											$middlDash.event.allChange($administStatsMain.ui.selectedArea, "2");
										} else if ($administStatsMain.ui.selectedThema == "귀농·귀어·귀촌") {
											$retunDash.event.allChange($administStatsMain.ui.selectedArea, "2");
										}
									}
								}
							} else {
								// 이미 같은 시군구이면 조회 안함
								if (!($administStatsMap.ui.mapRegion == "sgg" && lv_sido_change_yn == "N")) {
									$administStatsMain.ui.selectedLevel = "1";
									$("#dash_sido").val(lv_to_sido_cd);
									// $administStatsMain.ui.pathChange("sgg",
									// lv_to_sido_cd);

									$administStatsMain.ui.selectedArea = lv_to_sido_cd;
									const selectedThema = $administStatsMain.ui.selectedThema;
									$administStatsMain.ui.selectedLevel = "2";
									$administStatsMap.ui.mapToggleId = ""; // 2020-10-15
									if (selectedThema == "신혼부부") {
										$newlyDash.event.allChange(lv_to_sido_cd, "1");
									} else if (selectedThema == "중·장년층") {
										$middlDash.event.allChange(lv_to_sido_cd, "1");
									} else if (selectedThema == "주택소유") {
										$houseDash.event.allChange(lv_to_sido_cd, "1");
									} else if (selectedThema == "귀농·귀어·귀촌") {
										$retunDash.event.allChange(lv_to_sido_cd, "1");
									}
								} else {
								}
							}
						}
						// 읍면동
						else if ((lv_zoom > 1 && lv_zoom <= 3) || (lv_zoom > 3 && lv_zoom <= 5) || (lv_zoom > 5 && lv_zoom <= 8)) {
							// 이미 같은 읍면동이면 조회 안함
							if (!($administStatsMap.ui.mapRegion == "emdong" && lv_sgg_change_yn == "N")) {
							}
						}
					});
				}
				$administStatsMap.ui.prevZoom = lv_zoom;
			}
		},

		// 드랍종료 시, 콜백 호출
		didMapDropEnd : function(event, source, layer, data, map) {
		},

		// 더블클릭 시, 콜백 호출
		didMapDoubleClick : function(btn_id, tmpParam) {
		},

		// 마우스 over 시, 콜백 호출
		didMouseOverPolygon : function(event, data, type, map) {
			if (data.tooltip != undefined && !data.tooltip) {
				return;
			}
			if (type != "polygon") {
				if (map.isInnerMapShow2 != undefined && map.isInnerMapShow2) { // mng_s
					if (type == "data") {
						map.legend.selectLegendRangeData(event.target.options.fillColor);
					}
					if (data.info.length > 0) { // 데이터가 있을 경우만 툴팁을 보여준다.
						$administStatsMap.ui.createInfoTooltip(event, data, type, map);
					}
				} else if (map.isInnerMapShow3 != undefined && map.isInnerMapShow3) { // mng_s
					if (type == "data") {
						map.legend.selectLegendRangeData(event.target.options.fillColor);
					}
					if (data.info.length > 0) { // 데이터가 있을 경우만 툴팁을 보여준다.
						$administStatsMap.ui.createInfoTooltip(event, data, type, map);
					}
				} else {
					if (type == "data") {
						map.legend.selectLegendRangeData(event.target.options.fillColor);
					}
					$administStatsMap.ui.createInfoTooltip(event, data, type, map);
				}
			} else {
				if (map.isInnerMapShow2 != undefined && map.isInnerMapShow2) { // mng_s
					$administStatsMap.ui.createInfoTooltip(event, data, type, map);
				} else {
					$administStatsMap.ui.createInfoTooltip(event, data, type, map);
				}
			}
		},

		// 마우스 out 시, 콜백 함수
		didMouseOutPolygon : function(event, data, type, map) {
			if (map.selectedBoundMode != null && map.selectedBoundMode == "multi") {
				for (let i = 0; i < map.selectedBoundList.length; i++) {
					let layer = map.selectedBoundList[i];
					if (event.target == layer) {
						layer.setStyle({
							weight : 3,
							color : "white",
							dashArray : layer.options.dashArray,
							fillOpacity : 0.7,
							fillColor : "#F06292"
						});
					}
				}
			}
			$("#mapToolTipTable").hide();
			$("#mapToolTipTable").css("left", "-120");
			$("#mapToolTipTable").css("top", "-120");
		},

		// 경계 선택 시, 콜백 함수
		didSelectedPolygon : function(event, data, type, map) {
			if (data.info.length == 0) {
				return;
			}
			$administStatsMain.ui.loading(true);
			if (type == "data") {
				const region_nm = data.info[0].region_nm;
				const selectedThema = $administStatsMain.ui.selectedThema;
				const adm_cd = data.info[0].adm_cd;

				// srvLogWrite('P0', '01', '04', '01',
				// $administStatsMain.ui.selectedThema, 'year=' +
				// $administStatsMain.ui.selectedYear + ',adm_cd=' + adm_cd);

				$('.tag_item button').remove();

				if ($administStatsMap.ui.mapToggleId != adm_cd) {

					$('.tag_sido').text(region_nm);
					$('.tag_item').append('<button class="tag-del" id="sidoClose" onclick="javascript: modalSearchBtn();">');

					$administStatsMain.ui.selectedLevel = "1"
					if (selectedThema == "신혼부부") {
						//mng_s 20220216 이진호, log추가
						srvLogWrite("S0", "02", "02", "02", "", "");
						//mng_e 20220216 이진호
						setTimeout(function() {
							$newlyDash.event.allChange(adm_cd, "2");
						}, 50);
					} else if (selectedThema == "중·장년층") {
						//mng_s 20220216 이진호, log추가
						srvLogWrite("S0", "02", "04", "02", "", "");
						//mng_e 20220216 이진호
						setTimeout(function() {
							$middlDash.event.allChange(adm_cd, "2");
						}, 50);
					} else if (selectedThema == "주택소유") {
						//mng_s 20220216 이진호, log추가
						srvLogWrite("S0", "02", "03", "02", "", "");
						//mng_e 20220216 이진호
						setTimeout(function() {
							$houseDash.event.allChange(adm_cd, "2");
						}, 50);
					} else if (selectedThema == "귀농·귀어·귀촌") {
						//mng_s 20220216 이진호, log추가
						srvLogWrite("S0", "02", "05", "02", "", "");
						//mng_e 20220216 이진호
						setTimeout(function() {
							$retunDash.event.allChange(adm_cd, "2");
						}, 50);
					}

					if ($administStatsMap.ui.mapToggleId != "" && $administStatsMap.ui.mapToggleId != "00") {
						let tempColor = '';
						for (let i = 0; i < $administStatsMain.ui.tilePerColor.length; i++) {
							if ($administStatsMain.ui.tilePerColor[i].adm_cd == $administStatsMap.ui.mapToggleId) {
								tempColor = $administStatsMain.ui.tilePerColor[i].color
							}
						}
						$("rect[value='" + $administStatsMap.ui.mapToggleId + "']").attr("fill", tempColor);
					}
					$administStatsMap.ui.tileTempColor = $("rect[value='" + adm_cd + "']").attr("fill");
					$administStatsMap.ui.map.setPolyLayerHighlight(adm_cd);
					$("rect[value='" + adm_cd + "']").attr("fill", "#0086c6");

					$administStatsMap.ui.mapToggleId = adm_cd;

				} else {
					$('.tag_sido').text("전국");
					$('.tag_item button').remove();

					$administStatsMain.ui.selectedLevel = "0"
					$administStatsMain.ui.selectedArea = "00";
					if (selectedThema == "신혼부부") {
						setTimeout(function() {
							$newlyDash.event.allChange("00", "2");
						}, 50);
					} else if (selectedThema == "주택소유") {
						setTimeout(function() {
							$houseDash.event.allChange("00", "2");
						}, 50);
					} else if (selectedThema == "중·장년층") {
						setTimeout(function() {
							$middlDash.event.allChange("00", "2");
						}, 50);
					} else if (selectedThema == "귀농·귀어·귀촌") {
						setTimeout(function() {
							$retunDash.event.allChange("00", "2");
						}, 50);
					}
					// $administStatsMain.ui.pathChange("nationwide", "00");

					if ($administStatsMap.ui.mapToggleId != "00") {
						let tempColor = '';
						for (let i = 0; i < $administStatsMain.ui.tilePerColor.length; i++) {
							if ($administStatsMain.ui.tilePerColor[i].adm_cd == $administStatsMap.ui.mapToggleId) {
								tempColor = $administStatsMain.ui.tilePerColor[i].color
							}
						}
						$("rect[value='" + $administStatsMap.ui.mapToggleId + "']").attr("fill", tempColor); // 2020-11-04
					}

					$administStatsMap.ui.map.setPolyLayerHighlight(adm_cd);
					$administStatsMap.ui.mapToggleId = "";
				}
			}
		},

		/**
		 * @name didDrawCreate
		 * @description 사용자지정 draw 이벤트콜백
		 * @param event
		 *            이벤트객체
		 * @param type
		 *            객체타입
		 * @param map
		 *            델리케이트
		 */
		didDrawCreate : function(event, type, map) {
			let layer = event.layer;
			let area = "";

			// 다각형 및 사각형일때, 특정 영역을 넘어서면 알림 메시지 호출
			if (type == "polygon" || type == "rectangle") {
				const shapeArea = layer._getArea();
				if (shapeArea > 113000000) {
					messageAlert.open('최적의 서비스 속도를 위해 사용자 임의영역 면적이 113000000m² 이하가 되어야 합니다.');
					layer._shapeGroup.removeLayer(layer._shape);
					layer._shape = null;
					layer._map.dragging.enable();
					map.mapBtnInfo.doClearSelectedBound();
					map.mapBtnInfo.setFixedBoundBtn(false);
					return;
				}
			}

			if (type == "polygon") {
				area = "POLYGON((";
				for (let i = 0; i < layer.getUTMKs()[0].length; i++) {
					area += layer.getUTMKs()[0][i].x + " " + layer.getUTMKs()[0][i].y + ",";

					if (i == layer.getUTMKs()[0].length - 1) {
						area += layer.getUTMKs()[0][0].x + " " + layer.getUTMKs()[0][0].y;
					}
				}
				area += "))";
			} else if (type == "circle") {
				area = "CIRCLE(" + layer._utmk.x + " " + layer._utmk.y + "," + layer.getRadius() + ")";
			} else if (type == "rectangle") {
				area = "RECTANGLE(" + layer._utmks[0][0].x + " " + layer._utmks[0][0].y + "," + layer._utmks[0][2].x + " " + layer._utmks[0][2].y + ")";
			}

			if (map.curPolygonCode == 5) {
				map.setZoom(9);
				map.curPolygonCode = 5;
			}
			map.selectedBoundMode = "multi";
			map.selectedBoundList = [];

			// 전국
			if (map.curPolygonCode == "1") {
				if (map.geojson) {
					map.geojson.remove();
				}
				if (map.dataGeojson) {
					map.dataGeojson.remove();
				}
				map.multiLayerControl.clear();
				map.openApiBoundaryContry(function(map, res) {
					map.addPolygonGeoJson(res, "polygon");
					if (map.geojson) {
						map.geojson.eachLayer(function(layer) {
							layer.setStyle({
								weight : 3,
								color : "white",
								dashArray : layer.options.dashArray,
								fillOpacity : 0.7,
								fillColor : "#F06292"
							});
							map.selectedBoundList.push(layer);
						});
					}
					event.shapeGroup.thisShapeRemove();
				});
			} else {
				$administStatsMapApi.request.userAreaBoundInfo(area, type, map.curPolygonCode, event, map);
			}
		},

		/**
		 *
		 * @name didFinishedMultidata
		 * @description 사용자경계(multi layer data) 조회 후, 콜백
		 * @param dataList
		 *            표출된 데이터리스트
		 * @param admCdList
		 *            행정동코드리스트
		 * @param
		 * @param map
		 *            델리케이트
		 */
		didFinishedMultidata : function(dataList, admCdList, map) {
		}

	};

	$administStatsMap.event = {

		/**
		 * @name setUIEvent
		 * @description UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 */
		setUIEvent : function() {
		}
	};

}(window, document));

// 지도 지역선택 삭제
function modalSearchBtn() {

	$administStatsMain.ui.loading(true);

	$('.tag_sido').text('전국');
	$('.tag_item button').remove();

	setTimeout(function() {
		if (gv_url == "newly") {
			$newlyDash.event.allChange("00", "3");
		} else if (gv_url == "house") {
			$houseDash.event.allChange("00", "3");
		} else if (gv_url == "middl") {
			$middlDash.event.allChange("00", "3");
		} else if (gv_url == "retun") {
			$retunDash.event.allChange("00", "3");
		}
	}, 50);
	$('.modal-search').hide();
}

/** ********* 센터의 집계구값 얻기 시작 ********* */
(function() {
	$class("sop.openApi.personal.findcodeinsmallarea.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			if (res.errCd == "0") {
				if (typeof options.callback === "function") {
					options.callback(res);
				}
			} else if (res.errCd == "-401") {
				accessTokenInfo(function() {
					options.target.getCenterToAdmCd(options.center, options.callback);
				});
			}
		},
		onFail : function(status) {
		}
	});
}());
/** ********* 센터의 집계구값 얻기 종료 ********* */
