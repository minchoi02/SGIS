
(function(W,D){
	W.$analysisResultMapApi = W.$analysisResultMapApi || {};
	
	$(document).ready(function(){
		$analysisResultMapApi.event.setUIEvent();
	});
	
	$analysisResultMapApi.api = {
			
			/**
			 * 
			 * @name         : getUrl
			 * @description  : 센서스데이터 URL을 설정한다.
			 * @date         : 2018. 11. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param apiId    : API 아이디
			 */
			getUrl : function(apiId) {
				var url = "";
				switch(apiId) {
					case "API_0302":	//인구통계
						url = "/OpenAPI3/stats/innersearchpopulation.json"
						break;
					case "API_0304":	//사업체통계
						url = "/OpenAPI3/stats/company.json"
						break;
					case "API_0305":	//가구통계
						url = "/OpenAPI3/stats/household.json"
						break;
					case "API_0306":	//주택통계
						url = "/OpenAPI3/stats/house.json"
						break;
					case "API_0307":	//농가통계
						url = "/OpenAPI3/stats/farmhousehold.json"
						break;
					case "API_0308":	//임가통계
						url = "/OpenAPI3/stats/forestryhousehold.json"
						break;
					case "API_0309":	//어가통계
						url = "/OpenAPI3/stats/fisheryhousehold.json"
						break;
					case "API_0310":	//가구원통계
						url = "/OpenAPI3/stats/householdmember.json"
						break;
					default:
						break;	
				}
				return url;
			},
			
			/**
			 * 
			 * @name         : doCheckParams
			 * @description  : 센서스 파라미터를 체크한다.
			 * @date         : 2018. 11. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data    : 분석데이터
			 */
			doCheckParams : function(data) {
				var apiId = data.api_id;
				if (apiId == "API_0307" || apiId == "API_0308" || apiId == "API_0309") {
					for (var p in data.params) {
						if (p == "age_from") {
							apiId = "API_0310";
							break;
						}
					}
				}
				return apiId;
			}
	};
	
	//UI 내용작성
	$analysisResultMapApi.ui = {
			featureLayer : null,
			poiDataList : null,
			
			/**
			 * 
			 * @name         : doCensusResultData
			 * @description  : 센서스데이터를 조회한다.
			 * @date         : 2018. 11. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data    : 분석정보
			 * @param map : 맵 객체
			 * @param callback :  콜백함수
			 */
			doCensusResultData : function(data, map, callback) {
				var apiId = $analysisResultMapApi.api.doCheckParams(data);
				var url = $analysisResultMapApi.api.getUrl(apiId);

				$analysisResultMapApi.request.doReqCensusData(url, data.params, map, function(res, params, map) {
					map.multiLayerControl.multiData = [];
					$analysisResultMapApi.ui.doBoundaryData(res, params, map, function(geoData) {
						
						//통계정보 sort
						res = $analysisResultMapApi.ui.sortData(res, data.filter);
						
						//통게정보 set
						map.setStatsData("normal", res, data.filter, data.unit);
						
						//범례설정
						$analysisResultMapApi.ui.setLegend(res, data.filter, map);
						
						//경계표출
						$analysisResultMapApi.ui.drawPolygon(res, data.filter, data.unit, map, "multi", function(bounds) {
							if (bounds != null) {
								map.gMap.fitBounds(bounds, {
									animate : false
								});
							}
						});
						
						if (callback != undefined && callback != null && typeof callback === "function") {
							callback.call(undefined, res, map);
						}
					});
				});
			},
			
			/**
			 * 
			 * @name         : doBoundaryData
			 * @description  : 경계데이터를 조회한다.
			 * @date         : 2018. 11. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data    : 분석정보
			 * @param params : 파리미터 정보
			 * @param map : 맵 객체
			 * @param callback :  콜백함수
			 */
			doBoundaryData : function(data, params, map, callback) {
				var adm_cd =params.adm_cd;
				var low_search = params.low_search;
				var bnd_year = bndYear;
				
				$analysisResultMapApi.request.doReqBoundaryInfo(adm_cd, data, map, callback);
			},
			
			/**
			 * 
			 * @name         : doAnalysisResultData
			 * @description  : 분석결과정보를 조회한다.
			 * @date         : 2018. 10. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data    : 분석정보
			 * @param map : 맵 객체
			 * @param callback :  콜백함수
			 */
			doAnalysisResultData : function(data, map, callback) {
				$analysisResultMapApi.request.doReqAnalysisResultData(data, map, function(res) {
					switch(data.paramInfo.analysis_type) {
						case "BOUNDARY": //경계분석
							$analysisResultMapApi.ui.setBoundaryAnalysisData(res, map, callback);
							break;
						case "VORONOI": //보로노이다이어그램
							$analysisResultMapApi.ui.setVoronoiAnalysisData(res, map, callback);
							break;
						case "BUFFER": //버퍼분석
							$analysisResultMapApi.ui.setBufferAnalysisData(res, data, map, callback);
							break;
						case "LQ":	 //입지계수 분석
							$analysisResultMapApi.ui.setLqAnalysisData(res, map, callback);
							break;
						case "OPERATION": //데이터 연산간 분석
							$analysisResultMapApi.ui.setOperationAnalysisData(res, map, callback);
							break;
						case "SPATIAL": //공간자기상관분석
							$analysisResultMapApi.ui.setSpatialAnalysisData(res, map, callback);
							break;
						default:
							break;
					}
					
				});
			},
			
			/**
			 * 
			 * @name         : setBoundaryAnalysisData
			 * @description  : 경계분석결과를 설정한다.
			 * @date         : 2018. 10. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 분석결과정보
			 * @param map : 맵 객체
			 * @param callback :  콜백함수
			 */
			setBoundaryAnalysisData : function(res, map, callback) {
				var unit = $analysisResultMap.ui.analysisInfo.paramInfo.param.unit;
				var filter = "data";
				
				// mng_s 2019. 06. 14 j.h.Seok
				for (var i=0; i<res.result.length; i++) {
					var temp = res.result[i][filter];
					if(temp === undefined) {
						res.result[i][filter] = "0";
					}
				}
				
				//통계정보 sort
				res = this.sortData(res, filter);
				
				//통게정보 set
				map.setStatsData("normal", res, filter, unit);
				
				//범례설정
				this.setLegend(res, filter, map);
				
				//폴리곤 생성
				this.drawPolygon(res, filter, unit, map, "normal", function(bounds) {
					if (bounds != null) {
						map.gMap.fitBounds(bounds, {
							animate : false
						});
					}
				});
				
				if (callback != undefined && callback != null && typeof callback === "function") {
					callback.call(undefined, res, map);
				}
				
			},
			
			/**
			 * 
			 * @name         : setVoronoiAnalysisData
			 * @description  : 보로노이 다이어그램 분석결과를 설정한다.
			 * @date         : 2018. 10. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 분석결과정보
			 * @param map : 맵 객체
			 * @param callback :  콜백함수
			 */
			setVoronoiAnalysisData : function(res, map, callback) {
				var unit = $analysisResultMap.ui.analysisInfo.paramInfo.param.unit;
				var filter = "data";
				
				//통계정보 sort
				res = this.sortData(res, filter);
				this.poiDataList = res;
				
				//통게정보 set
				map.setStatsData("normal", res, filter, unit);
				
				//범례설정
				this.setLegend(res, filter, map);
				
				//폴리곤 생성
				this.drawPolygon(res, filter, unit, map, "normal", function(bounds) {
					
					//마커 생성
					$analysisResultMapApi.ui.drawMarker(res, map, filter, "dot");
					
					if (bounds != null) {
						map.gMap.fitBounds(bounds, {
							animate : false
						});
					}
				});
				
				if (callback != undefined && callback != null && typeof callback === "function") {
					callback.call(undefined, res, map);
				}
			},
			
			/**
			 * 
			 * @name         : setOperationAnalysisData
			 * @description  : 데이터간 연산 분석결과를 설정한다.
			 * @date         : 2018. 10. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 분석결과정보
			 * @param map : 맵 객체
			 * @param callback :  콜백함수
			 */
			setOperationAnalysisData : function(res, map, callback) {
				var unit = $analysisResultMap.ui.analysisInfo.paramInfo.param.unit;
				var filter = "data";
				
				//통계정보 sort
				res = this.sortData(res, filter);

				//통게정보 set
				map.setStatsData("normal", res, filter, unit);
				
				//범례설정
				this.setLegend(res, filter, map);
				
				//폴리곤 생성
				this.drawPolygon(res, filter, unit, map, "normal", function(bounds) {
						if (bounds != null) {
							map.gMap.fitBounds(bounds, {
								animate : false
							});
						}
					});
				
				if (callback != undefined && callback != null && typeof callback === "function") {
					callback.call(undefined, res, map);
				}
			},
			
			/**
			 * 
			 * @name         : setLqAnalysisData
			 * @description  : 입지계수분석결과를 설정한다.
			 * @date         : 2018. 11. 16. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 분석결과정보
			 * @param map : 맵 객체
			 * @param callback :  콜백함수
			 */
			setLqAnalysisData : function(res, map, callback) {
				var unit = $analysisResultMap.ui.analysisInfo.paramInfo.param.unit;
				var filter = "data";
				
				//통계정보 sort
				res = this.sortData(res, filter);
				
				for (var i=0; i<res.result.length; i++) {
					res.result[i].data = parseFloat(res.result[i].data.toFixed(3));
				}
				
				//통게정보 set
				map.setStatsData("normal", res, filter, unit);
				
				//범례설정
				this.setLegend(res, filter, map);
				
				//폴리곤 생성
				this.drawPolygon(res, filter, unit, map, "normal", function(bounds) {
					if (bounds != null) {
						map.gMap.fitBounds(bounds, {
							animate : false
						});
					}
				});
				
				if (callback != undefined && callback != null && typeof callback === "function") {
					callback.call(undefined, res, map);
				}
				
			},
			
			/**
			 * 
			 * @name         : setBufferAnalysisData
			 * @description  : 버퍼분석결과를 설정한다.
			 * @date         : 2018. 11. 23. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 분석결과정보
			 * @param map : 맵 객체
			 * @param callback :  콜백함수
			 */
			setBufferAnalysisData : function(res, data, map, callback) {
				var unit = $analysisResultMap.ui.analysisInfo.paramInfo.param.unit;
				var filter = "data";
				
				if (data.paramInfo.param.bufferType == "D") {
					filter = "_area";
				} 
				
				for (var i=0; i<res.result.length; i++) {
					res.result[i]._area = parseFloat(res.result[i]._area.toFixed(2));
				}
				
				//통계정보 sort
				res = this.sortData(res, filter);
				this.poiDataList = res;
				
				//버퍼 생성
				this.drawBuffer(res, filter, unit, map, function(bounds) {
					//마커 생성
					$analysisResultMapApi.ui.drawMarker(res, map, filter, "buffer");
					
					if (bounds != null) {
						map.gMap.fitBounds(bounds, {
							animate : false
						});
					}
				});
				
				if (callback != undefined && callback != null && typeof callback === "function") {
					callback.call(undefined, res, map);
				}
			},
			
			/**
			 * 
			 * @name         : setSpatialAnalysisData
			 * @description  : 공간자기상관분석결과를 설정한다.
			 * @date         : 2018. 11. 28. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 분석결과정보
			 * @param map : 맵 객체
			 * @param callback :  콜백함수
			 */
			setSpatialAnalysisData : function(res, map, callback) {
				var unit = $analysisResultMap.ui.analysisInfo.paramInfo.param.unit;
				var filter = "moran";
				
				//통계정보 sort
				res = this.sortData(res, filter);
				
				for (var i=0; i<res.result.length; i++) {
					res.result[i][filter] = parseFloat(res.result[i][filter].toFixed(2));
					res.result[i].p_value = parseFloat(res.result[i].p_value.toFixed(2));
				}
				
				//통게정보 set
				map.setStatsData("normal", res, filter, unit);
				
				//범례설정
				//모란지수의 정해진 범례 기준 설정
				map.legend.legendType = "negative";
				this.setLegend(res, filter, map);
				map.legend.valPerSlice[0] = [-3, -2.57, -1.95, -1.63, 1.65, 1.97, 2.57];
				$("#legendColor_"+map.legend.id).find("li>a").removeClass("on");			
				$("#negativeDefaultColor_"+map.legend.id).find("a").addClass("on");
				$("#negativeDefaultColor_"+map.legend.id).show();
				$("#legendPopEvent01_"+map.legend.id).parent().hide();
				$("#legendPopEvent02_"+map.legend.id).parent().hide();
				$("#initButton_"+map.legend.id).parent().hide();
			
				//폴리곤 생성
				this.drawPolygon(res, filter, unit, map, "normal", function(bounds) {
					if (bounds != null) {
						map.gMap.fitBounds(bounds, {
							animate : false
						});
					}
				});
				
				if (callback != undefined && callback != null && typeof callback === "function") {
					callback.call(undefined, res, map);
				}
			},
			
			/**
			 * 
			 * @name         : sortData
			 * @description  : 통계결과정보를 정렬한다.
			 * @date         : 2018. 10. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 통계결과정보
			 * @param filter : 표출명
			 */
			sortData : function(res, filter) {
				//통계정보를 sort한다.
				if (res.result != null && res.result.length > 0) {
					res.result = res.result.sort(function(a, b) {
						return parseFloat(b[filter])-parseFloat(a[filter]);
					});
				}
				return res;
			},
			
			/**
			 * 
			 * @name         : setLegend
			 * @description  : 범례를 설정한다.
			 * @date         : 2018. 10. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 통계결과정보
			 * @param filter : 통계결과정보 filter
			 * @param map    : 맵 정보
			 */
			setLegend : function(res, filter, map) {
				var tmpLegendData = [];
				for (var i=0; i<res.result.length; i++) {
					// mng_s 2019. 06. 14 j.h.Seok
					var temp = res.result[i][filter];
					if(temp === undefined) {
						console.log("data is undefined");
					} else {
						if (temp === "N/A") {
							tmpLegendData.push(0);
						} else {
							tmpLegendData.push(parseFloat(temp));
						}
						
					}
//					tmpLegendData.push(parseFloat(res.result[i][filter]));
				}
				map.legend.valPerSlice = map.legend.calculateLegend([tmpLegendData]);
			},
			
			/**
			 * 
			 * @name         : setCircleMarker
			 * @description  : POI정보를 세팅한다.
			 * @date         : 2018. 10. 17. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param dataList: POI데이터
			 * @param filter :  표출명
			 * @param map	 : 맵 객체
			 */
			setCircleMarker : function(dataList,  filter, map, bound, type) {
				for (var i=0; i<dataList.result.length; i++) {
					if (type == "dot") {
						if (bound != undefined) {
							this.mapBounds = bound;
							if (bound.contains(sop.utmk(dataList.result[i].x, dataList.result[i].y))) {
								this.drawDotMarker(dataList.result[i], filter, dataList.unit, map);
							}
						}else {
							this.drawDotMarker(dataList.result[i], filter, dataList.unit, map);
						}
					}else {
						this.drawBufferMarker(dataList.result[i], filter, map);
					}
				}
			},
			
			/**
			 * 
			 * @name         : drawDotMarker
			 * @description  : dot 마커를 생성한다.
			 * @date         : 2018. 10. 17. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param data: 데이터
			 * @param filter :  표출명
			 * @param unit : 단위
			 * @param map	 : 맵 객체
			 */
			drawDotMarker : function(data, filter, unit, map) {
				var tooltip  = "<div class='markerTooltip'>";
				  tooltip += 	"<div class='mTitle'>시설_"+(data.dataIdx+1)+"</div>";
				  tooltip +=		"<div style='height:5px;'></div>";
				  tooltip += 		"<div class='sTitle'>해당 POI의 영향 면적 : "+$commonFunc.appendCommaToNumber(data[filter])+" ("+unit+")</div>";
				  tooltip += "</div>";
				var marker = map.addCircleMarker(data.x, data.y, {
		    		radius : 2.5,
		    		color : "#000",
		    		fillColor : "#000",
		    		tooltipMsg : tooltip,
		    		fillOpacity : 0.5
		    	});
				this.featureLayer.addLayer(marker);
			},
			
			/**
			 * 
			 * @name         : drawBufferMarker
			 * @description  : buffer를 생성한다.
			 * @date         : 2018. 10. 17. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param data: 데이터
			 * @param filter :  표출명
			 * @param map	 : 맵 객체
			 */
			drawBufferMarker : function(data, filter, map) {
				var title = data.corp_nm;
				if (title == undefined) {
					title = "POI_" + (data.dataIdx + 1);
				}
				var tooltip  = "<div class='markerTooltip'>";
				  tooltip += 	"<div class='mTitle'>"+title+"</div>";
				  tooltip +=		"<div style='height:5px;'></div>";
				  tooltip += 		"<div class='sTitle'>분석결과 정보 : "+$commonFunc.appendCommaToNumber(data.data)+" ("+data.unit+")</div>";
				  tooltip += "</div>";
				  
				var marker = map.addCircleMarker(data.x, data.y, {
		    		radius : 2.5,
		    		color : "#0070C0",
		    		fillColor : "#0070C0",
		    		tooltipMsg : tooltip,
		    		fillOpacity :1
		    	});
				
				this.featureLayer.addLayer(marker);
			},
			
			/**
			 * 
			 * @name         : setLegend
			 * @description  : 범례를 설정한다.
			 * @date         : 2018. 10. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 통계결과정보
			 * @param filter : 통계결과정보 filter
			 * @param map    : 맵 정보
			 */
			drawPolygon : function(res, filter, unit, map, type, callback) {
				var bounds = null;
				var geoData = null;
				
				if (type == "normal") {
					geoData = map.convertFeatureData(res.result, filter, unit);
					
					for (var i=0; i<geoData.features.length; i++) {
						var temp = geoData.features[i].info[0].data;
						if(temp === undefined) {
							console.log("data is undefined");
						} else {
							geoData.features[i].info[0].datanull = "";
							if (temp === "N/A") {
								geoData.features[i].info[0].showData = "datanull";
							}
						}
//						tmpLegendData.push(parseFloat(res.result[i][filter]));
					}
					
					map.addPolygonGeoJson(geoData, "data");
					bounds = map.dataGeojson.getBounds();
				}else {
					map.multiLayerControl.dataGeojson = [];
					var bounds = null;
					for (var k=0; k<map.multiLayerControl.multiData.length; k++) {
						var layer = map.multiLayerControl.multiData[k].layer;
						layer = map.combineStatsData(layer, true);
						map.multiLayerControl.dataGeojson.push(map.addPolygonGeoJson(layer, "data"));
						
						map.multiLayerControl.dataGeojson[k].eachLayer(function(tmpLayer) {
							tmpLayer.hoverType = "back";
						});
						
						//경계위치조정
						if (k==0) {
							bounds = map.multiLayerControl.dataGeojson[k].getBounds();
						}else {
							bounds.extend(map.multiLayerControl.dataGeojson[k].getBounds());
						}
					}
					
				}
				
				if (callback != undefined && callback != null && typeof callback === "function") {
					callback.call(undefined, bounds);
				}
			},
			
			/**
			 * 
			 * @name         : drawMarker
			 * @description  : 범례를 설정한다.
			 * @date         : 2018. 10. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 통계결과정보
			 * @param map    : 맵 정보
			 * @param filter : 표출명
			 * @param type : 마커 타입
			 */
			drawMarker : function(res, map, filter, type) {
				if (this.featureLayer == null) {
					this.featureLayer = sop.featureGroup({
						chunkedLoading : true
					});
					map.gMap.addLayer(this.featureLayer);
				}else {
					this.featureLayer.clearLayers();
				}
				
				switch(type) {
					case "dot":
						this.setCircleMarker(res, filter, map, map.gMap.getBounds(), type);
						break;
					case "buffer":
						this.setCircleMarker(res, filter, map, null, type);
						break;
					default:
						break;
				}
				
			},
			
			/**
			 * 
			 * @name         : drawBuffer
			 * @description  : 버퍼를 생성한다.
			 * @date         : 2018. 11. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param res    : 통계결과정보
			 * @param filter : 표출명
			 * @param unit : 단위
			 * @param map    : 맵 정보
			 */
			drawBuffer : function(res, filter, unit, map) {
				if (this.bufferLayer == null) {
					this.bufferLayer = sop.featureGroup({
						chunkedLoading : true
					});
					map.gMap.addLayer(this.bufferLayer);
				}else {
					this.bufferLayer.clearLayers();
				}
				var geoData = map.convertFeatureData(res.result, filter, unit, "normal");
				map.addPolygonGeoJson(geoData, "buffer");
				if (map.geojson) {
					map.geojson.eachLayer(function(layer) {
						layer.hoveType = "front";
						layer.setStyle({
							weight : 0,
							color : "#fff",
							dashArray : "",
							fillOpacity : 0.4,
							fillColor : "#0070C0"
						});
					});
				}
			}

	};
	
	//AJAX 내용작성
	$analysisResultMapApi.request = {
			
			/**
			 * 
			 * @name         : doReqCensusData
			 * @description  : 센서스데이터를 조회한다.
			 * @date         : 2018. 11. 23. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param url : url 정보
			 * @param params    : 파라미터정보
			 * @param map    : 맵 정보
			 * @param callback : 콜백함수
			 */
			doReqCensusData : function(url, params, map, callback) {
				params["accessToken"] = accessToken;
				var options = {
						isBeforSend : true,
						method : "GET",
						params : params
				};
				$ajax.requestApi(openApiPath + url, options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (res.result.length > 0) {
								if (callback != undefined && callback != null && typeof callback === "function") {
									callback.call(undefined, res, params, map);
								}
							}
							break;
						case -401:
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			
			/**
			 * 
			 * @name         : doReqAnalysisResultData
			 * @description  : 분석결과정보를 조회한다.
			 * @date         : 2018. 10. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params    : 파라미터정보
			 * @param map    : 맵 정보
			 * @param callback : 콜백함수
			 */
			doReqAnalysisResultData : function(params, map, callback) {
				var options = {
						isBeforSend : true,
						method : "POST",
						params : {
							"table_nm" : params.data_name,
							"action_type" : params.paramInfo.analysis_type,
							"scheme" : params.user_id,
							"dataInfo" : params.paramInfo.param.dataInfo
						}
				};
				$ajax.requestApi(contextPath + "/api/analysis/getAnalysisResultData.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (res.result.length > 0) {
								if (callback != undefined && callback != null && typeof callback === "function") {
									for (var i=0; i<res.result.length; i++) {
										if (res.result[i].adm_nm == undefined && res.result[i].corp_nm != undefined) {
											res.result[i].adm_nm = res.result[i].corp_nm;
										}
									}
									callback.call(undefined, res, map, params);
								}
							}
							break;
						case -401:
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqBoundaryInfo
			 * @description  : 경계정보를 조회한다.
			 * @date         : 2018. 11. 19. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param adm_cd : 행정동코드
			 * @param callback : 콜백정보
			 */
			doReqBoundaryInfo : function(adm_cd, data, map, callback) {
				var options = {
						isBeforSend : true,
						params : {
							adm_cd : adm_cd
						}
				};
				
				$ajax.requestApi(contextPath + "/api/sop/getBoundaryInfo.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							res["pAdmCd"] = adm_cd;
							geoData = map.convertFeatureData(res.result, "", "", "normal");
							
							if (map.multiLayerControl.multiData != null) {
								map.multiLayerControl.multiData.push({
									data : data,
									layer : geoData
								});
							}
							
							if (callback != undefined && callback != null && typeof callback === "function") {
								callback.call(undefined, res);
							}
							break;
						default:
							break;
					}
				});
			}
	};
	
	//EVENT 내용작성
	$analysisResultMapApi.event = {
			
			setUIEvent : function(){

			}
	};
	
}(window,document));