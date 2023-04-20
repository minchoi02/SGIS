/**
 * 
 * history : 네이버시스템(주), 1.0, 2020/12/01
 * author : SGIS+ 운영팀
 * version : 1.0
 * mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
 *
 */

(function (W, D) {
	W.$map13 = W.$map13 || {};
	var errCount = 0;
	sMap = {
			
			map : function() {
				var that = this;
				this.id = null;
				this.mapInfo = null;
				this.mapBtnInfo = null;
				this.shareInfo = null;
				this.bizStatsChart = null;
				this.delegate = null;
				this.gMap = null;
				this.target = null;	 		// target element
				this.isScale = false; 		// map scale 유무
				this.isPanControl = false; 	// map panControl 유무
				this.isMouseOver = false;
				this.isMeasureControl = true;
				this.isStatisticTileLayer = false;
				this.isDrop = false;
				this.isFirstDraw = true;
				this.isZoomStart = false;
				this.isInnerMapShow = false;
				this.center = null;			// center 좌표(utmk)
				this.zoom = 4;			    // zoom level
				this.oldZoom = 0;
				this.oldArea = [];
				this.geojson = null;
				this.networkDatajson = null;
				this.dataGeojson = null;
				this.geojsonData = null;
				this.tradeGeojon = null;
				this.bounds = null;
				this.curPolygonCode = 2;
				this.data = [];
				this.curSidoCd = null;
				this.curSiggCd = null;
				this.curDongCd = null;
				this.curDropCd = null;
				this.curDropPolygonCode = null;
				this.curSelectedLayer = null;
				this.showCombineDataParam = [];
				this.valPerSlice = [];
				this.legendColor = null;
				this.legendValue = [];
				this.combineData = [];
				this.dataType = "normal";
				this.dropEvent = null;
				this.bnd_year = "2013";
				this.dropInfo = null;
				this.lastGeojsonInfo = null;
				this.infoControl = null;
				this.infoControlDiv = null;
				this.drawControl = null;
				this.legendType = "auto"; 
				this.isMiniMapDraw = false; 
				this.isTradeMapShow = false;
				this.isZoomSliderControl = false;
				this.isZoomAnimation = true;
				this.render = null;
				this.lastDrawList = [];
				this.mouseOverAdmCd = null;
				this.markers = null;
				this.mapNavigation = null;
				this.mapMode = "normal";
				this.isFixedBound = false;
				this.curAdmCd = null;
				this.legend = null;
				this.selectedBoundMode = null;
				this.isMultiSelectedBound = false;
				this.selectedBoundList = [];
				this.boundLevel = "1";
				this.dataGeojsonLayer = null;
				this.dataForCombine = null;
				this.tileLayer = null;
				this.blankLayer = null;
				this.isBlankLayer = false;
				this.heatMap = null;
				this.zoomLevelHeat = null;
				this.heatRadius = 15;
				this.heatBlur = 30;
				var temp = false;
				this.curNetworkData = "light";
				this.netWorkDataIDFlag = false;
				
//				테스트 메소드
				this.openInitStatData = null;
				this.getThemaMapData = null;
				this.getThemaMapBaseYear = null;
				this.getRegionData = null; //DB에서 경계데이터를 가져옴
				// 테스트 메소드 변수
				this.thema_map_data_id = "";
				this.adm_nm = ""; // 해당 지역 이름
				this.left_sep_unit = ""; // 표출정보A 단위
				this.left_sep_nm = "";	// 표출정보A 명		
				this.left_sep_source = ""; // 표출정보A 출처 
				this.left_sep_ttip_title = "";// 표출정보 A툴팁타이틀
				this.left_sep_chart_title = ""; // 표출정보 A차트타이틀
				this.left_base_year = ""; 
				this.right_sep_unit = ""; // 표출정보B 단위
				this.right_sep_nm = "";	// 표출정보B 명		
				this.right_sep_source = ""; // 표출정보B 출처 
				this.right_sep_ttip_title = "";// 표출정보 B툴팁타이틀
				this.right_sep_chart_title = ""; // 표출정보 B차트타이틀
				this.min_redctn_level = ""; //  최소 Zoom 레벨
				this.max_expnsn_level = ""; //  최대 Zoom 레벨
				this.poi_disp_yn = false;			// poi 표출 테마코드
				this.theme_cd = "";			// poi 표출 테마코드
				// mng_s 2017. 08. 03 석진혁
				this.corp_class_cd = "";	// poi 표출 산업분류코드
				// mng_e 2017. 08. 03 석진혁
				this.poiAdmCd = null;		// map boundary 저장 변수
				this.base_year_list = null;  //기준년도 리스트
				this.selectBaseYear = null; 
				this.changeRegionBound = null;
				this.setDataBoard = null; // 데이타보드 메소드
				this.selectedAdmCd = ""; // 마우스 over될때 선택된 admcd
				this.clickMode = null;
				this.regionData = null; //주제도 설정용 시도, 시구군, 읍면동 지역경계 Data
				this.i = 0; // 경계 검색 for문 인덱스
				this.dataBoardData = null; // 데이터보드용 리스트
				this.isReloadMode = false;
				// mng_s 2017. 12. 13 kdb
				this.heritage = null;	//문화재관리지도
				this.heritageAlertShow = true;	//일정 zoom레벨 벗어날때 알림
				this.imageLayer0 = false;	//이미지레이어1(문화재)
				this.imageLayer1 = false;	//이미지레이어2(문화재)
				this.pieChartMarkers = null;
				// mng_e 2017. 12. 13 kdb
				//보고서
				this.initData = null;
				this.thema_legend_values = [];
				this.thema_legend_type = null;
				this.thema_stat_data_base_year = null; // 데이터 년도
				// 자치구년도
				this.thema_atdrc_yn = null;
				this.boundary_fix_yn = null;
				this.tmpSidoData = {};
				this.reqType = "1";
				
				// mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
				this.changeStatThemaInfo = {};
				// mng_e 2020. 12. 01 j.h.Seok 통계주제도 통합
				
				// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
				this.topBottomState = "OFF";
				this.topBottomLayers = [];
				this.topBottomType = "both";
				this.topBottomCount = "10";
				
				this.setTopBottomType = function(type) {
					if(type == this.topBottomType) {
						return;
					}
					
					this.topBottomType = type;
					this.showTopBottomDataOnly(this.topBottomState, true);
				};
				
				this.setTopBottomCount = function(count) {
					if(count == this.topBottomCount) {
						return;
					}
					
					this.topBottomCount = count;
					this.showTopBottomDataOnly(this.topBottomState, true);
				};
				
				this.showTopBottomDataOnly = function(state, refresh) {
					if(state == this.topBottomState && !refresh) {
						return;
					}
					
					var tempGeoData = this.dataGeojsonLayer;
					var tempData = this.dataForCombine;
					
					this.data = [];
					tempGeoData.features = [];
					tempData.result = [];
					
					for(var i = 0; i < this.topBottomLayers.length; i++) {
						var temp = this.topBottomLayers[i];
						
						temp.forEach(function(item, index, object) {
							var adm_cd = item.properties.adm_cd;
							var region = $("#selectValue2").val();
							
							if(region == "2") {
								if(adm_cd.length == 5) {
									tempGeoData.features.push(item);
									tempData.result.push(item.info[0]);
								}
							} else if(region == "3") {
								if(adm_cd.length == 7) {
									tempGeoData.features.push(item);
									tempData.result.push(item.info[0]);
								}
							}
						});
					}
					
					var selectValueType = this.dataForCombine.showData;
					
					if(state == "ON") {
						this.topBottomState = "ON";
						var count = this.topBottomCount;
						
						if(this.topBottomType == "top") {
							tempData.result.sort(function(a, b) {
								return parseFloat(a[selectValueType]) > parseFloat(b[selectValueType]) ? -1 : parseFloat(a[selectValueType]) < parseFloat(b[selectValueType]) ? 1 : 0;
							});
							
							for(var j = 0; j < tempData.result.length; j++) {
								if(tempData.result[j] == undefined) {
									break;
								}
								
								if(j >= count) {
									tempData.result[j].topBottomShow = "N";
								} else {
									tempData.result[j].topBottomShow = "Y";
								}
							}
						} else if(this.topBottomType == "bottom") {
							tempData.result.sort(function(a, b) {
								return parseFloat(a[selectValueType]) < parseFloat(b[selectValueType]) ? -1 : parseFloat(a[selectValueType]) > parseFloat(b[selectValueType]) ? 1 : 0;
							});
							
							for(var j = 0; j < tempData.result.length; j++) {
								if(tempData.result[j] == undefined) {
									break;
								}
								
								if(j >= count) {
									tempData.result[j].topBottomShow = "N";
								} else {
									tempData.result[j].topBottomShow = "Y";
								}
							}
						} else if(this.topBottomType == "both") {
							tempData.result.sort(function(a, b) {
								return parseFloat(a[selectValueType]) > parseFloat(b[selectValueType]) ? -1 : parseFloat(a[selectValueType]) < parseFloat(b[selectValueType]) ? 1 : 0;
							});
							
							for(var j = 0; j < tempData.result.length; j++) {
								if(tempData.result[j] == undefined) {
									break;
								}
								
								if(j >= count) {
									tempData.result[j].topBottomShow = "N";
								} else {
									tempData.result[j].topBottomShow = "Y";
								}
							}
							
							tempData.result.sort(function(a, b) {
								return parseFloat(a[selectValueType]) < parseFloat(b[selectValueType]) ? -1 : parseFloat(a[selectValueType]) > parseFloat(b[selectValueType]) ? 1 : 0;
							});
							
							for(var j = 0; j < tempData.result.length; j++) {
								if(tempData.result[j] == undefined) {
									break;
								}
								
								if(j < count) {
									tempData.result[j].topBottomShow = "Y";
								}
							}
						}
						
						this.data.push(tempData);
					} else {
						this.topBottomState = "OFF";
						
						this.data.push(this.dataForCombine);
						tempGeoData = this.dataGeojsonLayer;
						this.topBottomData = [];
						this.topBottomType = "both";
						this.topBottomCount = "10";
					}
					
					tempGeoData.combine = false;
					
					for(var k = 0; k < tempGeoData.features.length; k++) {
						tempGeoData.features[k].info = null;
					}
					
					that.gMap.eachLayer(function(layer){
						if (layer.feature) {
							if(!$("#library").hasClass("on"))
								layer.remove();
						}
					});
					$thematicMapFrame13.ui.dataGeoJson = [];
					this.setPolygonDataGeojson(tempGeoData);
					
					console.log(this.data);
				};
				// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
				
				// 맵을 생성한다.
				this.createMap = function (delegate, target, opt) {

					if (!opt.center) {
						this.center = [ 989674, 1818313 ];
					}
					else {
						this.center = opt.center;
					}
					
					if (delegate) {this.delegate = delegate;}
					if (target) {this.target = target;}
					if (opt.scale !== undefined) {this.isScale = opt.isScale;}
					if (opt.panControl !== undefined) {this.isPanControl = opt.isPanControl;}	
					if (opt.zoom !== undefined) {this.zoom = opt.zoom;}
					if (opt.measureControl !== undefined) {this.isMeasureControl = opt.measureControl;}
					if (opt.zoomSliderControl !== undefined) {this.isZoomSliderControl = opt.zoomSliderControl;}
					if (opt.statisticTileLayer !== undefined) {this.isStatisticTileLayer = opt.statisticTileLayer;}
				
					//zoomAnimation (IE10 이하일 경우 false)
					if(browserFnc() != -1 && browserFnc() < 11) {
						//this.isZoomAnimation = false;
					}
					
					this.gMap = sop.map(this.target, {
						scale : this.isScale,
						panControl : this.isPanControl,
						measureControl : this.isMeasureControl,
						attributionControl : false,
						zoomSliderControl: this.isZoomSliderControl, //줌 컨트롤
						zoomAnimation : this.isZoomAnimation,	//줌 애니메이션 효과
						statisticTileLayer : true,
						zindex : 0
					});
					this.gMap.setView(sop.utmk(this.center[0], this.center[1]), this.zoom);
					this.bounds = this.gMap.getBounds();
//					this.miniMap = new sMap.miniMap();	
					this.render = sop.svg();
					this.markers = sop.markerClusterGroup({
						animateAddingMarkers: true
					});
					this.gMap.addLayer(this.markers);
				};
				
				this.createInfoControl = function() {
					var infoControl = sop.control({position: 'topleft'});
					var that = this;
					infoControl.onAdd = function (map) {
						this._div = sop.DomUtil.create('div', 'info_control');
						sop.DomEvent.disableClickPropagation(this._div);
						this.update();
						$(this._div).attr("id", 'infoControl_' + that.id);
					    that.infoControlDiv = this._div;
						return this._div;
					};

					infoControl.update = function (props) {
						var adm_nm;
						if (props) {
							if (props.adm_nm == "null" || props.adm_nm == undefined) {
								adm_nm = "집계구";
							}else {
								if (props.adm_cd.length <= 7) {
									adm_nm = props.adm_nm;
								} else {
									adm_nm = props.adm_nm  + " 집계구";
								}
								
							}
						}
						
						this._div.innerHTML =
							'<h4></h4>' + (props ? adm_nm : '행정동');

					};
					this.infoControl = infoControl;
					infoControl.addTo(this.gMap);	
					
					$(".info_control")
						.css("padding", "6px 8px")
						.css("font", "12px/14px Arial, Helvetica, sans-serif")
						.css("background", "rgba(255,255,255,1)")
						.css("background-color", "#fff")
						.css("box-shadow", "0 0 15px rgba(0,0,0,0.2)")
						.css("border-radius", "5px");
				},
				
				this.infoControlShowHide = function(show) {
					if (this.infoControl) {
						if (show) {
							$(this.infoControlDiv).show();
						}else {
							$(this.infoControlDiv).hide();
						}
					}	
				},
				
				this.createDrawControl = function(type) {
					var options = null;
					if (type == "biz") {
						options = {
								bizMap : true,
								interactiveMap : false	
						};
					}else {
						options = {
								bizMap : false,
								interactiveMap : true	
						};
					}
					var drawControl = new Draw.Control.Manager();
					drawControl.addControl(new Draw.Control.Measure(this.gMap));
					//drawControl.addControl(new Draw.Control.Overlay(this.gMap)); //draw hide
					drawControl.addControl(new Draw.Control.Poi(this.gMap, options));
					this.drawControl = drawControl;	
					this.gMap.addControl(drawControl); 
				},
				
				this.update = function () {
					this.gMap._onResize();
				},
				//POI클릭시 현재 map Zoomlevel값 가지고온다
				this.poiZoomLevel = function(){
					this.gMap.on('zoomend zoomlevelschange', function () {												
					}, this);					
					return this.gMap.getZoom();
				},
				
				this.mapMove = function (center, zoom, animate) {
					if (animate == null) {
						animate = false;
					}
					
					if (center != null) {
						this.center = center;
						
						if (zoom != null) {
							this.zoom = zoom;
							this.gMap.setView(sop.utmk(center[0], center[1]), this.setZoomCalibrate(zoom, 6), {
								animate : animate
							});
						}
						else {
							this.gMap.setView(sop.utmk(center[0], center[1]), {
								animate : animate
							});
						}
					}
				},
				
				this.setZoom = function (zoom) {
					if (zoom != null) {
						this.zoom = zoom;
						this.gMap.setZoom(this.setZoomCalibrate(zoom, 6));
					}
				};
				
				this.setZoomCalibrate = function(zoom, value) {
					var tmpZoom = zoom;
					if (this.mapMode == "settlite") {
						tmpZoom = zoom + value;
					}
					return tmpZoom;
				}
				
				this.setFixedBoundLevel = function(bool) {
					var maxZoom, minZoom;
					this.isFixedBound = bool;
					if (bool) {
						switch(this.curPolygonCode) {
							case 1:	//전국
								maxZoom = 1;
								minZoom = 0;
								break;
							case 2:	//전국시도
								maxZoom = 3;
								minZoom = 2;
								break;
							case 3:	//시군구
								maxZoom = 5;
								minZoom = 4;
								break;
							case 4: //읍면동
								maxZoom = 8;
								minZoom = 6;
								break;
							case 5: //집계구
								maxZoom = 12;
								minZoom = 9;
								break;
						}
						
						if (this.mapMode == "settlite") {
							maxZoom += 6;
							minZoom += 6;
						}

						this.gMap.setMaxZoom(maxZoom);
						this.gMap.setMinZoom(minZoom);
						
					}else {
						// mng_s 20211215 김건민
						//maxZoom = 12;
						if(this.poi_disp_yn) {
							maxZoom = 9;
						}else{
							maxZoom = 8;
						}
						// mng_e 20211215 김건민
						minZoom = 0;
						
						if (this.mapMode == "settlite") {
							maxZoom += 6;
							minZoom += 6;
						}
						this.gMap.setMaxZoom(maxZoom);
						this.gMap.setMinZoom(minZoom);
					}
				};
				
				this.setBoundSelectedMoode = function(mode) {
					this.selectedBoundMode = mode;
					this.isMultiSelectedBound = true;
					if (mode == null) {
						this.isMultiSelectedBound = false;
					}
				};
				
				this.setBoundLevel = function(level) {
					this.boundLevel = level;
				};
				
				this.clearLayerStyle = function(layer) {
					layer.setStyle({
						weight : layer.options.style.weight,
						color : layer.options.style.color,
						dashArray : layer.options.style.dashArray,
						fillOpacity : layer.options.style.fillOpacity,
						fillColor : layer.options.style.fillColor
					});
				};
				
				this.contains = function (bounds, point) {
					if (point && bounds) {
						return bounds.contains(point);
					}
				};
				
				this.addMarker = function (x, y, options) {		
					var marker = null;
					var visible = false;
					if (options != undefined && options.visible != undefined) {
						visible = options.visible;	
					}
					if (this.gMap) {
						marker = sop.marker([ x, y ]);		
						marker.addTo(this.gMap);
						
						if (options.tooltipMsg != undefined && options.tooltipMsg != null) {
							marker.bindInfoWindow(options.tooltipMsg);
							if (visible) {
								marker.openInfoWindow();
								this.gMap.on('zoomend', function (e) {
								    });

							}	
						}
					}
					return marker;
				};
				
				this.addHoverMarker = function (x, y, options,idx) {					
					var marker = null;
					var idxcnt = idx+1;
					var markerIcon = sop.icon({
							iconUrl: '/img/marker/'+idxcnt+'.png',							
							iconAnchor: [ 12.5, 41 ],
							iconSize: [ 25, 41 ],
							infoWindowAnchor: [1, -40]
						});										
					var visible = false;
					if (options.visible != undefined) {
						visible = options.visible;	
					}
					if (this.gMap) {
						marker = sop.marker([ x, y ], {icon: markerIcon});		
						marker.addTo(this.gMap);
						
						if (options.tooltipMsg != null) {
							marker.bindInfoWindow(options.tooltipMsg);
							if (visible) {
								marker.bindInfoWindow(options.tooltipMsg)
									  .openInfoWindow();
								this.gMap.on('zoomend', function (e) {
								    });

							}	
						}
					}
					
					return marker;
				};
				this.mapReload = function (center, zoom) {					
					
					if (center != null) {
						this.center = center;
						
						if (zoom != null) {
							this.zoom = zoom;
							this.gMap.setView(sop.utmk(center[0], center[1]), zoom, {								
							});
						}
						else {
							this.gMap.setView(sop.utmk(center[0], center[1]), {
								
							});
						}
					}
				},
				
				
				this.addCircleMarker = function(x, y, options) {
					var marker = null;
					var visible = false;
					var radius = 17;
					var fillColor = "#03f";
					var color = "white";
					var fillOpacity = 0.7;
					var opacity = 0.7;
					var weight = 0;
					var params = null;
						
					if (options != undefined) {
						if(options.visible != undefined) {
							visible = options.visible;	
						}
						
						if(options.radius != undefined) {
							radius = options.radius;	
						}	
						
						if(options.fillColor != undefined) {
							fillColor = options.fillColor;	
						}
						
						if (options.color != undefined) {
							color = options.color;
						}
						
						if (options.fillOpacity != undefined) {
							fillOpacity = options.fillOpacity;
						}
						
						if (options.opacity != undefined) {
							opacity = options.opacity;
						}
						
						if (options.weight != undefined) {
							weight = options.weight;
						}
						
						if (options.options != undefined) {
							params = options.options;
						}
						
					}

					if (this.gMap) {
						marker = sop.circleMarker([x,y], {
							radius : radius,
							color : color,
							fillColor : fillColor,
							fillOpacity : fillOpacity,
							opacity :opacity,
							weight : weight,
							renderer: this.render,
							options : params
						});		
						
						if (options.tooltipMsg != undefined && options.tooltipMsg != null) {
							marker.bindInfoWindow(options.tooltipMsg);
							if (visible) {
								marker.openInfoWindow();
							}	
						}
						marker.addTo(this.gMap);
					}
					return marker;
				},
				
								
				this.removeMarker = function (marker) {
					if (marker) {
						marker.remove();
					}
				};
				
				this.clearDataOverlay = function () {
					if (this.dataGeojson) {
						this.dataGeojson.remove();
						this.removeCaption();
					}
					
					if (this.tradeGeojson) {
						this.tradeGeojson.remove();
					}
					
//					if (this.miniMap) {
//						if(this.miniMap.geojson) {
//							this.miniMap.geojson.remove();
//						}
//					}
					
					this.data = [];
					this.combineData = [];
					this.dataGeojson = null;
					this.curDropPolygonCode = null;
					this.valPerSlice = [];
					this.legendValue = [];
					this.lastGeojsonInfo = null;
					this.openApiReverseGeoCode(that.center,that.bnd_year);
					this.isTradeMapShow = false;
					this.lastDrawList = [];
					this.legendValue.user = [];
					if (this.drawControl) {
						this.drawControl.removeOverlay();
					}
					this.markers.clearLayers();
					this.selectedBoundMode = null;
					this.selectedBoundList = [];
					this.dataGeojsonLayer = null;
					this.curAdmCd = null;
					this.dataForCombine = null;
					this.multiLayerControl.clear();
				};
				
				this.clearData = function () {
					this.data = [];
					this.combineData = [];
				};
				
				this.setInnerMap = function(isShow) {
					this.isInnerMapShow = isShow;
					if (isShow) {
						if (this.geojson) {
							this.geojson.remove();
							this.geojson = null;
						}
						this.setZoom(12);
					}else {
						this.openApiReverseGeoCode(that.center,that.bnd_year);
					}
				};
				
				this.setTradeMap = function(isShow) {
					this.isTradeMapShow = isShow;
					if (isShow) {
						if (this.zoom >= 10) {
							this.openApiTradeArea(this.bounds);
						}	
					}else {
						if (this.tradeGeojson) {
							this.tradeGeojson.remove();
							this.tradeGeojson = null;
						}
					}
				}
				
				this.setLegendColor = function () {
					if (this.dataGeojson || this.multiLayerControl.dataGeojson) {
						this.updatePolygonGeoJson();
					}
				};
				
				this.updatePolygonGeoJson = function () {
					this.gMap.eachLayer(function (layer) {
						if (layer.feature) {
							that.setLayerColor(layer.feature, layer);
						}
						
					});
					
					if (this.multiLayerControl.dataGeojson != null) {
						for (var i=0; i<this.multiLayerControl.dataGeojson.length; i++) {
							var dataGeojson = this.multiLayerControl.dataGeojson[i];
							dataGeojson.eachLayer(function (layer) {
								if (layer.feature) {
									that.setLayerColor(layer.feature, layer);
								}
								
							});
						}
						
					}
				};
				
				this.setPolygonGeoJsonStyle = function (type) {			
					// 일반경계일 경우, 색상을 채우지않고,
					// 데이터경계일 경우, 색상을 채운다.
					var color = "#666666";
					var fillColor = "white";
					var weight = 1.75;
					var fillOpacity = 0;
					var dashArray =  '3';
					
					if (this.mapMode == "settlite") {
						color = "white";
					}else if (this.mapMode == "intro") {
						color = "#cccccc";
						fillColor = "#F1F1F1";
						fillOpacity = 1;
						weight = 1.5;
						dashArray = "";
					}
					
					if (type == "data") {
						color = "white", 
						fillColor = "#F0FFF0";
						weight = 0.75;
						fillOpacity = 0.7;
						dashArray =  '';
					}
					else if (type == "build") {
						fillColor = "#9c0095";
						weight = 2.5;
						fillOpacity = 0.7;
					}
					else if (type == "trade") {						
						return {
							weight : 2.5,
							opacity : 1,
							color : color,
							dashArray: '3',
							fillOpacity : 0.7,
							fillColor : "#9c0095",
							renderer: this.render
						};
					}
					
					if($("#dataMode").val() == "networkData"){
						fillOpacity = 0;
						color = "white"
					}
					
					return {
						weight : weight,
						opacity : 1,
						color : color,
						dashArray: dashArray,
						fillOpacity : fillOpacity,
						fillColor : fillColor
					};
				};
				
				this.addPolygonGeoJson = function (obj, type, opt) {
					var geojson = sop.geoJson(obj, {
						style : this.setPolygonGeoJsonStyle(type),
						onEachFeature : function (feature, layer) {
							adm_cd = layer.feature.properties.adm_cd;
							
							
							if( !( $("#dataMode").val() == "heatMapGrid" || $("#dataMode").val() == "pieChart" || $("#dataMode").val() == "networkData") )
								that.setLayerColor(feature, layer);
							
								layer.on({
									mouseover : function (e) {
										if(type != "heatMapGrid"){
											that.isMouseOver = true;		
											that.setPolyLayerMouseover(e);
											
											if (that.infoControl != null) {
												that.infoControl.update(feature.properties);
											}
											
											if (feature.properties.adm_cd != undefined &&
													feature.properties.adm_cd.length > 0) {
												that.mouseOverAdmCd = feature.properties.adm_cd;
											}
											
											// mouse over , 사용자 콜백
											if (that.delegate && 
													that.delegate.callbackFunc &&
													that.delegate.callbackFunc.didMouseOverPolygon) {
												// event , data, type , map
												that.delegate.callbackFunc.didMouseOverPolygon(e, feature, layer.options.type, that);
											}
										}
									},
									mouseout : function (e) {
										if(type != "heatMapGrid"){
											that.isMouseOver = false;
											that.setPolyLayerMouseout(e);
											
											// mouse out, 사용자 콜백
											if (that.delegate && 
													that.delegate.callbackFunc &&
													that.delegate.callbackFunc.didMouseOutPolygon) {
												that.delegate.callbackFunc.didMouseOutPolygon(e, feature, layer.options.type, that);
											}
										}
									},
									click : function (e) {
										that.clickMode = true;
										var layer = e.target;
										if (!sop.Browser.ie && $("#dataMode").val() != "heatMapGrid") {
											layer.bringToFront();
										}
										//마우스 click
//									alert("click"+that.clickMode+",클릭된adm_cd:"+that.selectedAdmCd);
										
										//데이터를 가져온다.
										
//									that.getThemaMapData(that.thema_map_data_id,that.selectedAdmCd);
//									that.setDataBoard(e);
										
										//차트를 만든다
//										thematicCharts(feature.properties.adm_cd);
										
										
										if (that.delegate && 
												that.delegate.callbackFunc && 
												that.delegate.callbackFunc.didSelectedPolygon) {
											that.delegate.callbackFunc.didSelectedPolygon(e, feature, layer.options.type, that);
										}
										
									},
									
									drop : function (e) {
										var layer = e.target;
										that.curDropPolygonCode = that.curPolygonCode;
										that.dropEvent = e;
										that.curDropCd = layer.feature.properties.adm_cd;
										if (that.curDropCd.length > 7) {
											that.curDropCd = that.curDropCd.substring(0,7);
										}
										
										// fitBounds는 moveend 이벤트가 발생하므로,
										// moveend에서 drop 이벤트를 처리한다.
										/*that.gMap.fitBounds(layer.getBounds(), {
										maxZoom : that.zoom,
										animate : false
									});*/
										
										var zoom = that.zoom;	
										that.mapMove([layer.dropUTMK.x, layer.dropUTMK.y], that.setZoomCalibrate(zoom, 6));
										
										if (that.delegate && 
												that.delegate.callbackFunc && 
												that.delegate.callbackFunc.didMapDropEnd instanceof Function) {
											that.delegate.callbackFunc.didMapDropEnd(e.dropEvent, e.dropSource, e.target, e.target.feature.properties, that);
										}
										
										that.isMouseOver = false;
										
									},
									
								});
//							} 
						},
						type : type, // 일반경계인지, 데이터경계인지 구분
						layerCode : that.curPolygonCode,
					
					});
					
					// 네트워크 데이터 컬러
					if($("#selectValue2").val() == "6"){
						var color = ["#ffa07b", "#ff407b", "#ff0000"]
						var fill = ["0.5", "0.4", "0.3",]
						var i = 0;
						geojson.eachLayer(function(layer, idx) {
							if(layer.feature.properties.data_type == 30){
								layer.options.fillColor = color[0];
								layer.options.fillOpacity = fill[0]
							} else if(layer.feature.properties.data_type == 10){
								layer.options.fillColor = color[1];
								layer.options.fillOpacity = fill[1]
							} if(layer.feature.properties.data_type == 5){
								layer.options.fillColor = color[2];
								layer.options.fillOpacity = fill[2]
							}
								
							
						});
					}
					
					if (type == "polygon" || type == "build") {
						this.geojson = geojson;
					}else if (type == "trade") {
						this.tradeGeojson = geojson;
					}else {
						$thematicMapFrame13.ui.dataGeoJson.push(geojson);
						this.dataGeojson = geojson;
					}
						
					if (opt) {
						if (opt.group) {
							if (type == "polygon" || type == "build") {
								this.geojson.addTo(opt.group);
							}else if (type == "trade") {
								this.tradeGeojson.addTo(opt.group);
							}else {
								this.dataGeojson.addTo(opt.group);
							}
						}
						else {
							if (type == "polygon" || type == "build") {
								this.geojson.addTo(this.gMap);
							}else if (type == "trade") {
								this.tradeGeojson.addTo(this.gMap);
							}else {
								this.dataGeojson.addTo(this.gMap);
							}		
						}
					}
					else {
						if (type == "polygon" || type == "build") {
							this.geojson.addTo(this.gMap);
						}else if (type == "trade") {
							this.tradeGeojson.addTo(this.gMap);
						}else {
							this.dataGeojson.addTo(this.gMap);
						}	
					}
					
					//읍면동경계의 중심좌표 설정
//					if (adm_cd.length == 7) {
//						geojson.eachLayer(function(layer) {
//							if (layer.feature.properties.adm_cd.length == 7) {
//								var center = layer.getCenter();
//								layer.feature.properties["x"] = center.x;
//								layer.feature.properties["y"] = center.y;
//							}
//						})
//					}
					
					return geojson;
				};

				this.setPolyLayerMouseover = function (e) {
					var layer = e.target;
					var fillColor = layer.options.fillColor;
					var color = "#0086c6";
					var weight = 5;
					var dashArray = layer.options.dashArray;
					if (layer == that.curSelectedLayer) {
//						alert("layer"+layer);
//						alert("curSelectedLayer"+that.curSelectedLayer);
						if (that.mapMode != "intro") {
							layer.setStyle({
								weight : 5,
								color : "#ff0000",
								dashArray : layer.options.dashArray,
								fillOpacity : layer.options.fillOpacity,
								fillColor : layer.options.fillColor
							});
						}
					}
					else {
						if (that.mapMode == "intro") {
							fillColor = "#fcbe47";
							color = "#ebb410";
							weight = 2.5;
							dashArray = "";
						}
						
						layer.setStyle({
							weight : weight,
							color : color,
							dashArray : dashArray,
							fillOpacity : layer.options.fillOpacity,
							fillColor : fillColor
						});
						
					}
					
					if (!sop.Browser.ie) {
						layer.bringToFront();
					}
				};
				
				this.setDataBoard = function(e){
					alert("데이타보드~");
				};
				
				
				this.setPolyLayerMouseout = function (e) {
					var layer = e.target;
					if (layer == that.curSelectedLayer) {
						if (that.mapMode != "intro") {
							layer.setStyle({
								weight : 3,
								color : "#ff0000",
								dashArray : layer.options.dashArray,
								fillOpacity : layer.options.fillOpacity,
								fillColor : layer.options.fillColor
							});
						}
					}
					
					if (layer != that.curSelectedLayer) {
						var color = "#666666";
						var fillColor = layer.options.fillColor;
						var fillOpacity = layer.options.fillOpacity;
						var weight = 3;
						
						if (that.mapMode == "settlite") {
							color = "white";
							weight = 3;
						}else {
							if (layer.options.type == "polygon" || 
									layer.options.type == "build" || 
									layer.options.type == "trade") {
									color = "#666666";
									weight = 1.75;
								}
								else {
									color = "white";
									weight = 0.75;
								}
						}
						
						if (that.mapMode == "intro") {
							color = "#cccccc";
							fillColor = "#F1F1F1";
							weight = 1.5;
						}else {
							if (layer.options.type == "polygon") {
								fillOpacity = 0;
							}else {
								fillOpacity = 0.7;
							}
						}

						if($("#dataMode").val() == "networkData"){
							fillOpacity = 0;
							color = "white";
						}

						layer.setStyle({
							weight : weight,
							color : color,
							dashArray : layer.options.dashArray,
							fillOpacity : fillOpacity,
							fillColor : fillColor
						});
						
					}
					if (!sop.Browser.ie) {
						if(!that.netWorkDataIDFlag && $("#dataMode").val() != "networkData")
							layer.bringToBack();
					}
				};
				
				this.addControlEvent = function (type, opt) {
					
					// 지도이동시 발생
					if (type == "movestart") {
						this.gMap.on("movestart", function (e) {
							if (that.delegate && 
								that.delegate.callbackFunc && 
								that.delegate.callbackFunc.didMapMoveStart instanceof Function) {
								that.delegate.callbackFunc.didMapMoveStart(e, that);
							}
						});
					}
					
					else if (type == "moveend") {
						this.gMap.on("moveend", function (e) {	
							var center = e.target.getCenter();
							that.center = [ center.x, center.y ];
							that.bounds = e.target.getBounds();
							
							if (that.isTradeMapShow && that.zoom >= 10){
								that.openApiTradeArea(that.bounds);	
							}
							
							that.isReloadMode = true;
							
							if ((that.zoom <= 3 && that.curPolygonCode == "2") ||
									(that.zoom > 3 && that.zoom <=5 && that.curPolygonCode == "3") ||
									(that.zoom > 5 && that.zoom <=8 && that.curPolygonCode == "4") || 
									(that.zoom > 8 && that.curPolygonCode == "5")) {
								that.isReloadMode = false;
							}

							if(that.netWorkDataIDFlag && $("#dataMode").val() == "networkData"){
								if(that.zoom == 8 && that.oldZoom == 9){
									that.isReloadMode = true;
									that.oldArea = [];
								}
								if(that.curPolygonCode != "5")
									that.oldArea = [];
								
//								if(that.zoom > 9 && that.curPolygonCode == "5")
//									that.isReloadMode = true;
							}
							
							that.oldZoom = that.zoom;
							
							if (!that.isDrop && !that.isMultiSelectedBound) {
								that.openApiReverseGeoCode(that.center,that.bnd_year);
							}
							
							that.isDrop = false;
							that.isZoomStart = false;
												
							if (that.delegate && 
									that.delegate.callbackFunc && 
									that.delegate.callbackFunc.didMapMoveEnd instanceof Function) {
								that.delegate.callbackFunc.didMapMoveEnd(e, that);
							}
							
						});
					}
					
					// 줌 시작
					else if (type == "zoomstart") {
						this.gMap.on("zoomstart", function (e) {
							that.isZoomStart = true;
							if (that.delegate && 
								that.delegate.callbackFunc && 
								that.delegate.callbackFunc.didMapZoomStart instanceof Function) {
								that.delegate.callbackFunc.didMapZoomStart(e, that);
							}
						});
					}
					// 줌 종료
					else if (type == "zoomend") {
						this.gMap.on("zoomend", function (e) {
							that.isZoomStart = true;
							that.zoom = e.target._zoom;
							that.bounds = e.target.getBounds();
							that.zoom = that.setZoomCalibrate(that.zoom, -6);
							var mapPolygonCode = 0;

							// 전국단위 경계표출
							/*if (that.zoom <= 1) {
								mapPolygonCode = 1;
								if (that.curPolygonCode != mapPolygonCode) {
									that.curPolygonCode = mapPolygonCode;
									if (!that.isInnerMapShow) {
										if (that.isDrop) {
											that.openApiBoundaryContry(that);
										}
									}
								}
								that.curPolygonCode = mapPolygonCode;
								if (that.mapBtnInfo != null) {
									that.mapBtnInfo.changeZoomLevelTitle("전국");
								}
								
							}*/
							
							if (/*that.zoom > 1 && */that.zoom <= 3) {
								mapPolygonCode = 2;
								
								if($("#dataMode").val() == "heatMapGrid" && that.gMap.getZoom() == "3")
									that.heatMap.setUTMKs([]);
								
								if (that.curPolygonCode != mapPolygonCode) {
									that.heatMap.setUTMKs([]);
									that.curPolygonCode = mapPolygonCode;
									if (!that.isInnerMapShow) {
										if (that.isDrop) {
											that.openApiBoundarySido(that.bnd_year);
										}
									}			
								}		
								that.curPolygonCode = mapPolygonCode;
								if (that.mapBtnInfo != null) {
									that.mapBtnInfo.changeZoomLevelTitle("시도");
								}
							}
							
							// 시구군단위 경계표출
							else if (that.zoom > 3 && that.zoom <= 5) {
								//djlee
								//2019-04-19 박길섭 시작
								if(that.zoom == 4) {
									mapPolygonCode = 100;
								}
								else{//자치구 까지만 있는부분 예외처리 비자치구일 시 맨아래 else 문 
									if(window.parent.$thematicMapMain.param.stat_thema_map_id=="uwGrLn6xJp20160202203129219tIGyEvtDpH"){//인구이동
										mapPolygonCode = 100;
									}
									else if(window.parent.$thematicMapMain.param.stat_thema_map_id=="LInuFCEn0F20160121115806986CxrsruyxyI"){// 등록 장애인 수
										mapPolygonCode = 100;
									}
									else if(window.parent.$thematicMapMain.param.stat_thema_map_id=="oIuoFJMFrK20160121115806979wKuH6LIx9p"){//
										mapPolygonCode = 100;
									}
									else if(window.parent.$thematicMapMain.param.stat_thema_map_id=="yqLxF08Jwy20160121115806987szMIJtHrxL"){//장애인 고용현황
										mapPolygonCode = 100;
									}
									else if(window.parent.$thematicMapMain.param.stat_thema_map_id=="1Fz7MFD9tG20160121115806987FxqIvzv6Gr"){//교원1인당 학생 수
										mapPolygonCode = 100;
									}
									else if(window.parent.$thematicMapMain.param.stat_thema_map_id=="MHFDHqsqpF20161109104000137FJuILzpJps"){//인구천명당 사설학원 수
										mapPolygonCode = 100;
									}
									else if(window.parent.$thematicMapMain.param.stat_thema_map_id=="LMotrswI9s20161109104000138pqsJKDLsyI"){//EQ-5D지표 현황
										mapPolygonCode = 100;
									}
									else if(window.parent.$thematicMapMain.param.stat_thema_map_id=="xxuMu3LoDq20160121115806985JqJMF9MsFp"){//1인당 자동차 등룍대수
										mapPolygonCode = 100;
									}
									else if(window.parent.$thematicMapMain.param.stat_thema_map_id=="rHCoFFqGGM201601211158069912K5snpIGHz"){//재정자립도 현황
										mapPolygonCode = 100;
									}
									else if(window.parent.$thematicMapMain.param.stat_thema_map_id=="nrxuHGn8KG20160121115806994pvwvyEy69D"){//음주율
										mapPolygonCode = 100;
									}
									else if(window.parent.$thematicMapMain.param.stat_thema_map_id=="0DF7wo3wvL20160121115806994yFru3zDxr1"){//흡연율
										mapPolygonCode = 100;
									}
									else if(window.parent.$thematicMapMain.param.stat_thema_map_id=="pvKDFvpvrM20160121115806992Ez9tGyLw0J"){//일반페기물 재황용률
										mapPolygonCode = 100;
									}
									else if(window.parent.$thematicMapMain.param.stat_thema_map_id=="oFDHwonv0M20160121115806992MpKpKq3uwI"){//주민 1인당 생활폐기물 배출량
										mapPolygonCode = 100;
									}
									else{
										mapPolygonCode = 3;
									}
								}
								//mapPolygonCode = 3;
								//2019-04-19 박길섭 끝
								// 이전의 경계레벨이 시군구단위가 아닐경우
								if (that.curPolygonCode != mapPolygonCode) {
									that.heatMap.setUTMKs([]);
									that.curPolygonCode = mapPolygonCode;						
									if (!that.isInnerMapShow) {
										if (that.isDrop) {
											that.openApiBoundaryHadmarea(that.curDropCd, that.bnd_year, "1");
										}
									}
								}
								that.curPolygonCode = mapPolygonCode;
								if (that.mapBtnInfo != null) {
									that.mapBtnInfo.changeZoomLevelTitle("시군구");
								}
							}
							
							// 동단위 경계표출
							else if (that.zoom > 5 && that.zoom <= 8) {
								mapPolygonCode = 4;
								// 이전의 경계레벨이 동단위가 아닐 경우
								if (that.curPolygonCode != mapPolygonCode) {
									that.curPolygonCode = mapPolygonCode;
									if (!that.isInnerMapShow) {
										if (that.isDrop) {
											that.openApiBoundaryHadmarea(that.curDropCd, that.bnd_year, "1");
										}
									}
								}
								that.curPolygonCode = mapPolygonCode;
								if (that.mapBtnInfo != null) {
									that.mapBtnInfo.changeZoomLevelTitle("읍면동");
								}
							}
							
							// 집계구 경계표출
							else if (that.zoom > 8) {
								mapPolygonCode = 5;
								// 이전의 경계레벨이 집계구단위가 아닐 경우
								if (that.curPolygonCode != mapPolygonCode) {
									that.curPolygonCode = mapPolygonCode;	
									if (!that.isInnerMapShow){
										if (that.isDrop) {
											that.openApiBoundaryStatsarea(that.curDropCd, that.bnd_year);
										}
									}		
								}

								that.curPolygonCode = mapPolygonCode;
								if (that.mapBtnInfo != null) {
									that.mapBtnInfo.changeZoomLevelTitle("집계구");
								}
							}
							
							if (that.delegate && 
							    that.delegate.callbackFunc &&
							    that.delegate.callbackFunc.didMapZoomEnd instanceof Function) {
								that.delegate.callbackFunc.didMapZoomEnd(e, that);
							}
							
							// mng_s 2017. 12. 13 kdb
							if($("#selectValue2").val()=="4"){
								//시군구까지 데이터가 있는데 문화재에서 읍면동까지 내려가서 생기는 오류방지
								if(that.zoom >= 6){
									that.curPolygonCode = 3;
								}
								
								if (that.zoom < 4 && that.heritageAlertShow) {
									that.heritageAlertShow = false;
									messageConfirm.open(
						    			 "알림", 
						    			 "해당 레벨부터는 문화재관리지도를 볼 수 없습니다.<br>",
						    			 btns = [
						    			     {
											   title : "확인",
											   fAgm : null,
											   disable : false
						    			     }   
						    			 ]
									);
								}else if (that.zoom >= 4 && !that.heritageAlertShow) {
									that.heritageAlertShow = true;
								}
							}
							// mng_e 2017. 12. 13 kdb
						});
					}
					
					// 경계구역으로 아이템 drop
					else if (type == "drop") {
			             $("#"+that.target).droppable({
			                 drop: function(e, s) {
			                     that.gMap.eachLayer(function(layer){
			                         if( layer._containsPoint ) {
			                             var point = that.gMap.mouseEventToLayerPoint(e);
			                             var dropUTMK = that.gMap.layerPointToUTMK(point);  
			                             if( layer._containsPoint(point)){
			                            	 
						                	 if (layer.feature.properties.adm_cd == undefined || 
						                	     layer.feature.properties.adm_cd == null) {
													return;
											 }
						                	 						                	 
						                	 if (that.mouseOverAdmCd == layer.feature.properties.adm_cd) {
						                		 //현재보고있는 경계레벨과 드랍한 경계레벨이 다를 경우,
							                	 //현재있는 경계레벨을 드랍한 경계레벨로 치환하고 드랍을 수행한다.
							                	 //이전에는 이런 예가 없었으나, 사용자영역이 일반경계에 가려지는 현상으로 인해
							                	 //포커스가 발생했을 때 경계가 두드러지는 현상을 집어넣었고, 이같은 버그가 발생함.
				                            	 var timeInterval = 0;
						                		 if (layer.options.layerCode < that.curPolygonCode) {
				                            		 that.autoUpBoundary();
				                            		 timeInterval = 500;
				                            	 }else {
				                            		 that.curPolygonCode = layer.options.layerCode;
				                            	 }
				                            	 
				                            	 setTimeout(function() {
			                            			 if (that.isMouseOver) {
						                        		 that.isDrop = true;
						                        		 layer["dropUTMK"] = dropUTMK;
						                                 layer.fire("drop", {
																dropEvent : e,
																dropSource : s.draggable,
															});
						                        	 }
			             						},timeInterval);
					                        	 
						                	 }
						                	
			                             }
			                         }
			                     });
			                 }
			             });
					}
					
					//사용자지정 이벤트
					else if (type == "draw") {
						that.gMap.on("draw:created", function(e) {
							var layer = e.layer;	
							if (that.delegate && 
								that.delegate.callbackFunc && 
								that.delegate.callbackFunc.didDrawCreate instanceof Function) {
								that.delegate.callbackFunc.didDrawCreate(e, e.layerType, that);
							}
						});
					}
					
				};

				this.autoDownBoundary = function () {
					// 기존에 데이터경계가 있으면 제거한다.
					if (this.dataGeojson != null) {
						this.dataGeojson.remove();		
						this.removeCaption();
						this.dataGeojson = null;
					}
					
					if (this.boundLevel == "0") {
						switch (this.curPolygonCode) {
							case 1:
								break;
								
							case 2:
							case 3:
							case 4:
								this.openApiBoundaryHadmarea(this.curDropCd, this.bnd_year, this.boundLevel);
								break;
					
							case 5:
								this.openApiBoundaryStatsarea(this.curDropCd, this.bnd_year);
								break;
							
							default:
								break;	
						}
					}else {
						switch (this.curPolygonCode) {
							case 1:
								this.setZoom(2);
								break;
	
							case 2:
								this.setZoom(4); //6->4
								break;
							
							case 3:
								this.setZoom(7); //8->7
								break;
							
							case 4:
								this.setZoom(9); //10->9
								break;
							
							case 5:
								this.openApiReverseGeoCode(this.center,that.bnd_year);
								break;
							
							default:
								break;	
						}
					}
				};
				
				this.autoUpBoundary = function () {
					switch (this.curPolygonCode) {
					
					/*case 1:
						this.setZoom(1);
						break;*/
					
					case 2:
						this.setZoom(1);
						break;
					
					case 3:
						this.setZoom(3); //4->3
						break;
					
					case 4:
						this.setZoom(5); //6->5
						break;
					
					/*case 5:
						this.setZoom(10);
						break;*/
					
					default:
						break;
					
					}
					
				};
				
				
				this.setDroppedInfo = function() {
					this.dropInfo = {
							center : this.center,
							zoom : this.zoom
					}
				};
				
				this.undoDropLayerBounds = function() {
					this.lastGeojsonInfo = null;
					if (this.dropInfo != null) {
						this.mapMove(this.dropInfo.center, this.dropInfo.zoom);
					}
				};
				
				this.isContainBound = function() {
					if (that.curPolygonCode != 1 && that.curPolygonCode != 2) {
						var isInnerForDataBounds = false;
						var tmpUtmkPoint = this.gMap.utmkToLayerPoint(this.center);
						if (that.geojson != null && tmpUtmkPoint != null 
							                                     && tmpUtmkPoint != undefined) {
							that.geojson.eachLayer(function (layer) {
								if (layer._containsPoint) {
									if (layer._containsPoint(tmpUtmkPoint)) {
										isInnerForDataBounds = true;
									}
								}
							});
						}
					}
					
					return isInnerForDataBounds;
				};

				this.getLocation = function () {
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(function (position) {
							//console.log(position);
						});
					}
					else {
						console.log("브라우져가 기능을 제공하지 않습니다.");
					}
					
				};
				
				this.setStatsData = function (type, data, showDataParamName, unit) {
					this.data = [];
					
					if (data != null) {
						if (showDataParamName != null && showDataParamName.length > 0) {
							data["showData"] = showDataParamName;
						}
						if (unit != null && unit.length > 0) {
					
							data["unit"] = unit;
						}
						this.data.push(data);
						this.dataForCombine = data;
					}
					
					// 일반 검색조건일 경우
					if (type == "normal" || type == "bizStats") {
						this.dataType = type;	
					}
					else {
						this.dataType = type;
						if (this.combineData.length >= 2) {
							this.combineData = [];
						}
						this.combineData.push(data);
						
						if (this.combineData.length == 2) {
							this.data = this.combineData;
						}
					}
				};
				
				//남한경계가져오기
				this.openApiBoundaryContry = function () {
					$.ajax({
						  type: "GET",
						  url: "/js/data/geo.js",
						  success: function(res) {
							  res["pAdmCd"] = "";
							  that.setPolygonDataGeojson(res);
						  } ,
						  dataType: "json",
						  error:function(e){  
					            //alert(e.responseText);  
					        }  
						});
				};
				
				
				// 전국시도경계가져오기
				this.openApiBoundarySido = function (year, callback) {
				/*	if (that.lastGeojsonInfo != null) {
						if (that.lastGeojsonInfo.adm_cd == "00" && that.lastGeojsonInfo.year == year) {
							return;
						}
					}*/
					
					if(parseInt(year) < 2000) {
						year = '2000';
					}
					
					$.ajax({
						  type: "GET",
						  url: "/js/data/geo_sido_" + year + ".js",
						  success: function(res) {
							  res["pAdmCd"] = "00";
							  var tmpOption = {
									  year : year,
									  adm_cd : "00"
							  }
							  that.lastGeojsonInfo = tmpOption ;
							  that.setPolygonDataGeojson(res);
							  if (callback != undefined && callback != null && callback instanceof Function) {
								  callback.call(undefined, res);
							  }
						  } ,
						  dataType: "json",
						  error:function(e){  
					            //alert(e.responseText);  
					      }  
					});
				};
				
				//djlee
				
				this.openApiBoundaryHadmarea2 = function (adm_cd, year, low_search, data, atdrc_yn, callback) {
					var params = null;
					if (atdrc_yn != undefined && atdrc_yn == "1") {
						params = {
							"accessToken" : accessToken, 
							"adm_cd" : adm_cd, 
							"year" : year, 
							"low_search" : low_search,
							"borough" : "1"
						};
					}else {
						params = {
							"accessToken" : accessToken, 
							"adm_cd" : adm_cd, 
							"year" : year, 
							"low_search" : low_search
						};
					}
					
					$.ajax({
						  type: "GET",
//						  async: async_setting, //mng_s kimjoonha 20101031 여수시 돌산읍이 색지도로 표시 않되는 부분은 이걸 주석해제하면 해결되지만 해당 지역으로 센터 이동이 않되므로 일단 주석으로 가야된다.
						  url: openApiPath + "/OpenAPI3/boundary/hadmarea.geojson",
						  data : params,
						  success: function(res) {
								res["pAdmCd"] = params.adm_cd;
								
								//regionData에 현재 경계데이터를 넣어준다.
								// 통계선택 및 지도유형이 바뀔때 경계데이타를 재사용해야한다.
//								that.legend.numberData = false;
								that.data[0].pAdmCd = params.adm_cd;
//								that.data[0].result = that.tmpSidoData[data[index].sido_cd];
							  that.setPolygonDataGeojson(res);
							  
							  // mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
							  // mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
							  if(that.topBottomState == "ON") {
								  that.showTopBottomDataOnly("ON", true);
							  }
							  // mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
							  // mng_e 2020. 12. 01 j.h.Seok 통계주제도 통합
						  },
						  dataType: "json",
						  error:function(e){alert("에러")}  
					});
				};
				// OpenAPI 행정동경계 검색
				this.openApiBoundaryHadmarea = function (adm_cd, year, low_search, zoomLevel) {//2019-04-19 박길섭
					
					
					console.log("that.netWorkDataIDFlag [" + that.netWorkDataIDFlag + "] $(\"#dataMode\").val() " + $("#dataMode").val());
					
					if(that.netWorkDataIDFlag && $("#dataMode").val() == "networkData"  ){
						
						var code = that.curPolygonCode;
						var type = "rectangle";
						var mapBounds = that.gMap.getBounds();
						var area = 'RECTANGLE(';
						area += mapBounds._southWest.x + ' ' + mapBounds._southWest.y + ',';
						area += mapBounds._northEast.x + ' ' + mapBounds._northEast.y;
						area += ')';
						
						if(code == "5") {
							code = "4";
						}
						
						
						//mng_s 20190827
						if(code == "100") {
							if($("#dataMode").val() == "networkData"){
								code = "3";
							}else{
								code = "2";
							}
						}
						console.log("area [" + area + "]     type [" + type + "]    code [" + code);
						
						
						
						
						var userAreaBoundObj = new sop.openApi.userAreaBoundObj.api();
						userAreaBoundObj.addParam("area", area);
						userAreaBoundObj.addParam("type", type);
						userAreaBoundObj.addParam("code", code);
						userAreaBoundObj.request({
							method : "POST",
							async : false,
							url : contextPath + "/ServiceAPI/map/userAreaBoundInfo.geojson",
							options : {
								target : this,
								url : contextPath + "/ServiceAPI/map/userAreaBoundInfo.geojson",
								type : type,
								area : area,
								code : code
							}
						});
					} else {
						var sopOpenApiHadmareaObj = new sop.openApi.hadmarea.api();
						sopOpenApiHadmareaObj.addParam("accessToken", accessToken);
						sopOpenApiHadmareaObj.addParam("adm_cd", adm_cd);
						sopOpenApiHadmareaObj.addParam("year", year);
						sopOpenApiHadmareaObj.addParam("low_search", low_search);
						sopOpenApiHadmareaObj.addParam("zoom_level", zoomLevel);//2019-04-19 박길섭
						if(that.thema_atdrc_yn != null && that.thema_atdrc_yn != undefined && that.thema_atdrc_yn === '1' && adm_cd.length === 2) {
							sopOpenApiHadmareaObj.addParam("borough", "1");
						}
						//20년수정반영 시작
						if(that.mapMode == 'white'){
							var center 		= that.gMap.getCenter();
							var bounds 		= that.gMap.getBounds();
							var swLatLng 	= bounds.getSouthWest(); 
							var neLatLng 	= bounds.getNorthEast();
							sopOpenApiHadmareaObj.addParam("mapMode", that.mapMode);
							sopOpenApiHadmareaObj.addParam("centerx", center.x);
							sopOpenApiHadmareaObj.addParam("centery", center.y);
							sopOpenApiHadmareaObj.addParam("neLatLngx", neLatLng.x);
							sopOpenApiHadmareaObj.addParam("neLatLngy", neLatLng.y);
							sopOpenApiHadmareaObj.request({
								method : "GET",
								async : true,
								url :  "/ServiceAPI/OpenAPI3/boundary/hadmarea.geojson",
								options : {
									target : this,
									adm_cd : adm_cd,
									year : year,
									low_search : low_search,//2019-04-19 박길섭
									zoomLevel : zoomLevel//2019-04-19 박길섭
								}
							});
						//20년수정반영 끝
						}else{//20년수정반영 
							sopOpenApiHadmareaObj.request({
								method : "GET",
								async : true,
								url : openApiPath + "/OpenAPI3/boundary/hadmarea.geojson",
								options : {
									target : this,
									adm_cd : adm_cd,
									year : year,
									low_search : low_search,//2019-04-19 박길섭
									zoomLevel : zoomLevel//2019-04-19 박길섭
								}
							});
						}//20년수정반영 
					}
				};
				
				// OpenAPI 집계구경계 검색
				this.openApiBoundaryStatsarea = function (adm_cd, year) {
					var sopOpenApiStatsareaObj = new sop.openApi.statsarea.api();
					sopOpenApiStatsareaObj.addParam("accessToken", accessToken);
					sopOpenApiStatsareaObj.addParam("adm_cd", adm_cd);
					sopOpenApiStatsareaObj.addParam("year", year);
					sopOpenApiStatsareaObj.request({
						method : "GET",
						async : true,
						url : openApiPath + "/OpenAPI3/boundary/statsarea.geojson",
						options : {
							target : this,
							adm_cd : adm_cd,
						}
					});
				};
				
				// OpenAPI 리버스지오코딩
				this.openApiReverseGeoCode = function (center,year) {
					var sopOpenApiReverseGeoCodeObj = new sop.openApi.ReverseGeoCode.api();
					sopOpenApiReverseGeoCodeObj.addParam("accessToken", accessToken);
					sopOpenApiReverseGeoCodeObj.addParam("addr_type", "20");
					sopOpenApiReverseGeoCodeObj.addParam("x_coor", center[0]);
					sopOpenApiReverseGeoCodeObj.addParam("y_coor", center[1]);
					sopOpenApiReverseGeoCodeObj.addParam("bnd_year", year);
					sopOpenApiReverseGeoCodeObj.request({
						method : "GET",
						async : true,
						url : openApiPath + "/OpenAPI3/addr/rgeocode.json",
						options : {
							target : this,
							center : center
						}
					});
				};
				
				//
				this.openApiBuildArea = function(bounds) {
					var sopOpenApibdAreaObj = new sop.openApi.bdArea.api();
					sopOpenApibdAreaObj.addParam("minx", bounds._southWest.x);
					sopOpenApibdAreaObj.addParam("miny", bounds._southWest.y);
					sopOpenApibdAreaObj.addParam("maxx", bounds._northEast.x);
					sopOpenApibdAreaObj.addParam("maxy", bounds._northEast.y);
                    sopOpenApibdAreaObj.request({
                        method : "POST",
                        async : true,
                        url : contextPath + "/ServiceAPI/map/interactive/bdarea.geojson",
                        options : {
                        	target : this,
                            btntype : "build",
                            params : {
                            	title : "사업체전개도",
                                param : [
                                         { "key" : "minx", "value" : bounds._southWest.x },
                                         { "key" : "miny", "value" : bounds._southWest.y },
                                         { "key" : "maxx", "value" : bounds._northEast.x },
                                         { "key" : "maxy", "value" : bounds._northEast.y }
                                ],
                                map : this,
                                adm_nm : this.mapNavigation.data.sido_elem.sido_nm + " "
                                       + this.mapNavigation.data.sgg_elem.sgg_nm + " "
                                       + this.mapNavigation.data.adm_elem.emdong_nm
                                },
                                hat : this
                        	}
                    });

				};
				
				
				//상권조회
				this.openApiTradeArea = function(bounds) {
					var sopOpenApitradeAreaObj = new sop.openApi.tradeArea.api();
					sopOpenApitradeAreaObj.addParam("minx", bounds._southWest.x);
					sopOpenApitradeAreaObj.addParam("miny", bounds._southWest.y);
					sopOpenApitradeAreaObj.addParam("maxx", bounds._northEast.x);
					sopOpenApitradeAreaObj.addParam("maxy", bounds._northEast.y);
					sopOpenApitradeAreaObj.request({
						method : "POST",
						async : true,
						url : contextPath + "/ServiceAPI/bizStats/tradearea.geojson",
						options : {
							target : this
						}
					});
				}
				

				this.setLayerColor = function (feature, layer) {
					
					if (this.dataType == "heatMap") {
						layer.setStyle({	
							weight : layer.options.weight,
							color : layer.options.color,
							dashArray : layer.options.dashArray,
							fillOpacity : "0",
							fillColor : "#F0FFF0"
						});
					}
					// 일반데이터일 경우
					else if (this.dataType == "normal") {
						feature["combine"] = false;
						if (feature.info) {
							for ( var x = 0; x < feature.info.length; x++) {
								if (feature.info[x].showData) {
									for (param in feature.info[x]) {
										
										/*console.log("feature.info[x][param] = " +feature.info[x][param]+":: legendColor = " + that.legend.valPerSlice[x]);
										console.log(that.legend.getColor(feature.info[x][param], that.legend.valPerSlice[x])[0]);*/
										
										
										if (param == feature.info[x].showData) {
											// mng_s 2017. 11. 21 kdb
											//보육업체 취약인구현황 경우 값이 0인것 N/A 와 같은 색으로
											
											// mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
//											if((window.parent.$thematicMapMain.param.stat_thema_map_id == "mtjKxt2Zkb20171109101132537k7SYSI50kn" || that.netWorkDataIDFlag)  
											if((window.parent.$thematicMapMain.param.stat_thema_map_id == "sFKoutEowH20201208140301610JputqDxrrK" || that.netWorkDataIDFlag)
											// mng_e 2020. 12. 01 j.h.Seok 통계주제도 통합
													
													&& feature.info[x][param] == 0){
												layer.setStyle({	
													weight : layer.options.weight,
													color : layer.options.color,
													dashArray : layer.options.dashArray,
													fillOpacity : layer.options.fillOpacity,
													fillColor : "#F0FFF0"
												});
											}
											
											// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
											else if(this.topBottomState == "ON" && feature.info[x].topBottomShow == "N") {
												layer.setStyle({	
													weight : layer.options.weight,
													color : layer.options.color,
													dashArray : layer.options.dashArray,
													fillOpacity : layer.options.fillOpacity,
													fillColor : "#F0FFF0"
												});
											} 
											// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
											
											else {
												layer.setStyle({
													weight : layer.options.weight,
													color : layer.options.color,
													dashArray : layer.options.dashArray,
													fillOpacity : layer.options.fillOpacity,
													//fillColor : that.getColor(feature.info[x][param], that.valPerSlice[x])[0] //test
													fillColor : that.legend.getColor(feature.info[x][param], that.legend.valPerSlice[x])[0]
												});
											}
											// mng_e 2017. 11. 21 kdb
											break;
										}
									}
								}
							}
						}
					}
					else if (this.dataType == "bizStats") {
						feature["combine"] = false;
						if (feature.info) {
							for ( var x = 0; x < feature.info.length; x++) {
								if (feature.info[x].adm_cd == feature.properties.adm_cd) {
									layer.setStyle({
										weight : layer.options.weight,
										color : layer.options.color,
										dashArray : layer.options.dashArray,
										fillOpacity : layer.options.fillOpacity,
										fillColor : that.legendColor[4]
									});
								}
							}
						}
					}
					else if(this.dataType == "kosis") {
						feature["combine"] = false;
						if (feature.info && feature.info.length > 0) {
							layer.setStyle({
								weight : layer.options.weight,
								color : layer.options.color,
								dashArray : layer.options.dashArray,
								fillOpacity : layer.options.fillOpacity,
								fillColor : that.legend.getColor(feature.info[0], that.legend.valPerSlice[0])[0]
							});
							
						}
					}
					// 결합데이터일 경우
					else {
						var tmpLevel = new Array();	
						feature["combine"] = true;

						if (feature.info) {
							for ( var x = 0; x < feature.info.length; x++) {
								if (feature.info[x].showData) {
									for (param in feature.info[x]) {
										if (param == feature.info[x].showData) {
											tmpLevel.push(that.legend.getColor(feature.info[x][param], that.legend.valPerSlice[feature.info[x].legendIndex])[1]);
											break;
										}
									}
								}
							}
						}
						
						if (tmpLevel.length == 1) {
							var score = tmpLevel[0] / 2;
							var level = Math.ceil((tmpLevel[0] / 2));
							feature["combineData"] = score * 20;
							
							layer.setStyle({
								weight : layer.options.weight,
								color : layer.options.color,
								dashArray : layer.options.dashArray,
								fillOpacity : layer.options.fillOpacity,
								fillColor : that.legend.getColorForLevel(level)
							});
							
						}else if (tmpLevel.length == 2) {
							var score = (tmpLevel[0] + tmpLevel[1]) / 2;
							var level = Math.ceil((tmpLevel[0] + tmpLevel[1]) / 2);
							feature["combineData"] = score * 20;
							
							layer.setStyle({
								weight : layer.options.weight,
								color : layer.options.color,
								dashArray : layer.options.dashArray,
								fillOpacity : layer.options.fillOpacity,
								fillColor : that.legend.getColorForLevel(level)
							});
							
						}
						
					}
					
				};
				
				this.checkShowCaption = function () {
					this.checkShowCaption = function () {
						if (that.legend.numberData && (this.dataGeojson != null || this.multiLayerControl.dataGeojson != null)) {
							this.removeCaption();
							this.setCaption();
						}else {
							this.removeCaption();
						}
					};
				};
				
				this.setCaption = function () {
					//2016.09.22 버블일 경우, 캡션을 보여준다.
					if (this.legend != undefined && this.legend.selectType == "bubble") {
						if (this.legend.circleMarkerGroup != undefined && this.legend.circleMarkerGroup.length > 0) {
							for (var i=0; i<this.legend.circleMarkerGroup.length; i++) {
								var layer = this.legend.circleMarkerGroup[i];
								layer.setCaption({title:appendCommaToNumber(parseFloat(layer.options.options.data)), color:"white"});
							}
						}
					}else {
						if (this.multiLayerControl.dataGeojson != null) {
							for(var i=0; i<this.multiLayerControl.dataGeojson.length; i++) {
								var dataGeojson = this.multiLayerControl.dataGeojson[i];
								dataGeojson.eachLayer(function (layer) {
									var x = layer.feature.properties.x;
									var y = layer.feature.properties.y;
									if (layer.feature.info.length > 0) {
										for (param in layer.feature.info[0]) {
											if (layer.feature.info[0].showData == param) {
												layer.setCaption({title:appendCommaToNumber(parseFloat(layer.feature.info[0][param])), color:"white", showAllZoomLevel: false}, [x,y]);
												break;
											}
										}
									}else {
										layer.setCaption({title:"N/A", color:"##FFEB3B"}, [x,y]);
									}
								});
							}
						}else{
							// 각각의 layer안에 데이타와 unit을 보여줌
							if (this.dataGeojson != null) {
								this.dataGeojson.eachLayer(function(layer) {
									var x = layer.feature.properties.x;
									var y = layer.feature.properties.y;
									if (layer.feature.combine) {			
										if (layer.feature.combineData != undefined) {
											layer.setCaption({title:appendCommaToNumber(parseFloat(layer.feature.combineData)), color:"white"}, [x,y]);
										}else {
											layer.setCaption({title:"N/A", color:"##FFEB3B", showAllZoomLevel: false}, [x,y]);
										}
									}else if(layer.feature.info.length > 1) {
										layer.setCaption({title:appendCommaToNumber(parseFloat(layer.feature.info[0])), color:"white", showAllZoomLevel: false}, [x,y]);
									}else {
										if (layer.feature.info.length > 0) {
											for (param in layer.feature.info[0]) {
												if (layer.feature.info[0].showData == param) {
													// 지도에 그려지는 레이어에서 Unit(단위)를 없앴다.
//													layer.setCaption({title:appendCommaToNumber(layer.feature.info[0][param])+ " ("+layer.feature.info[0].unit + ")", color:"white", showAllZoomLevel: false});
													layer.setCaption({title:appendCommaToNumber(parseFloat(layer.feature.info[0][param])), color:"white", showAllZoomLevel: false}, [x,y]);
													break;
												}
											}
										}else {
											layer.setCaption({title:"N/A", color:"##FFEB3B"}, [x,y]);
										}
									}
								});
							}
						}
					}
				};
				
				this.removeCaption = function () {
					if (this.dataGeojson != null) {
						this.dataGeojson.eachLayer(function (layer) {
							layer.removeCaption();
							layer.captionObj = null;
						});
					}
					if (this.multiLayerControl.dataGeojson != null) {
						for(var i=0; i<this.multiLayerControl.dataGeojson.length; i++) {
							var dataGeojson = this.multiLayerControl.dataGeojson[i];
							dataGeojson.eachLayer(function (layer) {
								layer.removeCaption();
								layer.captionObj = null;
							});
						}
					}
					//2016.09.22 버블일 경우, 캡션을 제거한다.
					if (this.legend != undefined && this.legend.selectType == "bubble") {
						if (this.legend.circleMarkerGroup != undefined && this.legend.circleMarkerGroup.length > 0) {
							for (var i=0; i<this.legend.circleMarkerGroup.length; i++) {
								var layer = this.legend.circleMarkerGroup[i];
								layer.removeCaption();
								layer.captionObj = null;
							}
						}
					}
				}
				
				this.setPolygonDataGeojson = function (geoData, type, index) {
					if($("#dataMode").val() == "heatMapGrid")
						this.dataType == "heatMapGrid";
					else if($("#dataMode").val() == "pieChart")
						this.dataType == "pieChart";

					// 네트워크 데이터 범례
					if(that.netWorkDataIDFlag){
						if($("#dataMode").val() == "networkData"){
							$("#network_legend").show();
							$("#legendBox_"+ that.legend.id).hide();
						} else {
							$("#network_legend").hide();
							$("#legendBox_"+ that.legend.id).show();
						} 
						
					}
							
					if(that.netWorkDataIDFlag && $("#dataMode").val() == "networkData")
						that.getNetworkData();
					
					$thematicMapFrame13.Popup.close();
					$thematicMapFrame13.Popup2.close();
					
					// 기존 경계 지우기
					if (this.geojson) {

						//현재 경계코드와 geojson의 경계코드가 맞지않을 경우, 경계를 버린다.
						//pAdmCd는 현재경계의 상위 행정동코드로 이를 바탕으로 해당 경계의 임시경계코드를 정의하고,
						//현재 경계코드와 임시경계코드를 비교하여 그릴지 말지를 결정한다.
						if (geoData && geoData.pAdmCd != undefined) {
							var tmpLayerCode = 5;
							if (geoData.pAdmCd == "00") {
								tmpLayerCode = 2;
							}else {
								switch (geoData.pAdmCd.length) {
									//전국
									case 0:
										tmpLayerCode = 1;
										break;
										//전국시도
									case 2:
										tmpLayerCode = 3;
										break;
										//시군구
									case 5:
										tmpLayerCode = 4;
										break;
										//읍면동
									case 7:
										tmpLayerCode = 5;
										break;
								}
							}
							
							if (tmpLayerCode != this.curPolygonCode) {
								return;
							}
						}

						this.geojson.remove();
						this.geojson = null;
					}
					
					// 경계데이터에 통계정보를 병합하고, 경계를 그린다.
					if (this.data.length > 0) {	
						//kosis데이터 
						if (this.data[0].kosis) {
							if(geoData.features.length > 1) {
								if(this.data[0].pAdmCd < 2) {
									this.data[0].pAdmCd = "00";
								}
								
								if (geoData.pAdmCd != this.data[0].pAdmCd) {
									return;
								}
								geoData = interactiveMapKosis.combineKosisStatsData(geoData);
							} else {
								return;
							}
						} else {
							if (geoData.pAdmCd != this.data[0].pAdmCd) {
								return;
							}
							if( !( $("#dataMode").val() == "heatMapGrid" || $("#dataMode").val() == "pieChart" ) )
								geoData = this.combineStatsData(geoData);
						}
						
						//시계열때문에 드랍된 현재위치정보를 저장한다.
						this.setDroppedInfo();
					}
					
					// res = combineStatsData(res);
					if (geoData && geoData.combine && this.data.length > 0) {
						// 지역경계가 auto면 dataGeojson을 지우고,
						// 시도,시군구,읍면동일 경우 경계와 데이터를 지우지 않는다.
						if ($("#selectValue2").val()=="auto" || that.i == 1){
							if (this.dataGeojson) {
								this.dataGeojson.remove();
								this.removeCaption();
								this.dataGeojson = null;
							}
						}

						var dataGeojson = this.addPolygonGeoJson(geoData, "data");
						
						if (type != undefined && type == "multi") {
							if (this.multiLayerControl.dataGeojson == null) {
								this.multiLayerControl.dataGeojson = [];
							};	
							this.multiLayerControl.dataGeojson.push(dataGeojson);
							this.dataGeojson = null;
						}else {
							if (this.multiLayerControl.dataGeojson != null && 
							    this.multiLayerControl.dataGeojson.length > 0) {
								for (var i=0; i<this.multiLayerControl.dataGeojson.length; i++) {
									this.multiLayerControl.dataGeojson[i].remove();
								}
							}
							this.multiLayerControl.dataGeojson = null;
						}
						
						this.dataGeojsonLayer = geoData;
						
						// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
						if(type == undefined || type != "multi") {
							this.topBottomLayers = [];
						}
						this.topBottomLayers.push(geoData.features);
						// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
						
						if(index == undefined) {
							this.checkShowCaption();
						} else if(index >= 10) {
							if($('#dataMode2').val() != 'dataOff') {
								that.legend.numberData = true;
							}
							this.checkShowCaption();
						}
							
						if ($("#selectValue2").val()!="auto" && this.legend.selectType =="bubble"){
							$thematicMapFrame13.ui.mapList[0].multiLayerControl.dataGeojson = $thematicMapFrame13.ui.dataGeoJson;							
						}
						
						// if 열지도
						if($("#dataMode").val() == "heatMapGrid")
							that.getChildcareHeatMap();
						else if($("#dataMode").val() == "pieChart")
							that.changePieChart();
						else
							that.legend.changeDataMode(that.legend.selectType);
						$thematicMapFrame13.Popup.close();
					}
					else {
						this.addPolygonGeoJson(geoData, "polygon");
						//if 열지도
						if($("#dataMode").val() == "heatMapGrid")
							this.getChildcareHeatMap();
						else if($("#dataMode").val() == "pieChart")
							that.changePieChart();
						else {
							// 데이터경계가 있을 경우,
							// 지역경계가 데이터경계와 같을 때, 해당 지역경계를 지운다.
							if (this.dataGeojson) {
								if (this.geojson.getBounds().equals(this.dataGeojson.getBounds())) {
									this.geojson.remove();
								}	
							}
						}
						
					}
					
					if (this.data.length > 0) {
						if (this.data[0].kosis) {
							interactiveMapKosis.setResultDataOnMap();
						}
					}
					// 지역경계가 auto면 통계 data를 비운다.
					if($("#selectValue2").val()=="auto"){
						this.data = [];
					}
					if (this.delegate && this.delegate.callbackFunc && this.delegate.callbackFunc.didFinishedHadmaArea instanceof Function) {
						this.delegate.callbackFunc.didFinishedHadmaArea(geoData, that);
					}
				};
				
				this.combineStatsData = function (boundData) {			
					for ( var k = 0; k < that.data.length; k++) {
						if (that.data[k] != null) {
							boundData["combine"] = true;
						}else {
							boundData["combine"] = false;
						}
						
						for ( var i = 0; i < boundData.features.length; i++) {
							var adm_cd = boundData.features[i].properties.adm_cd;
							if (boundData.features[i].info == null) {
								boundData.features[i]["info"] = [];
								boundData.features[i]["isThematicMap"] = true;
							}
							
							if (that.data[k] != null) {
								if(that.data[k].result != null) {
									for ( var x = 0; x < that.data[k].result.length; x++) {
										for (key in that.data[k].result[x]) {
											if (key == "adm_cd") {
												if (adm_cd == that.data[k].result[x].adm_cd) {
													that.data[k].result[x]["showData"] = that.data[k].showData;
													that.data[k].result[x]["api_id"] = that.data[k].id;
													that.data[k].result[x]["unit"] = that.data[k].unit;
													that.data[k].result[x]["legendIndex"] = k;
													boundData.features[i].info.push(that.data[k].result[x]);
													boundData.features[i]["dataIdx"] = x;
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

					//읍면동별 전국지도가 off일때만 수행
					if (!$("#eupmyundong").hasClass("on")) {
						if($("#dataMode").val() != "networkData")
							this.setLegendForStatsData();
					}
					return boundData;
					
				};
				
				this.setLegendForStatsData = function () {
					var arData = new Array();
					if (that.data.length > 0) {
						for ( var k = 0; k < that.data.length; k++) {
							var tmpData = new Array();
							if (that.data[k].showData) {
								if(that.data[k].result != null) {
									for ( var i = 0; i < that.data[k].result.length; i++) {
										for (key in that.data[k].result[i]) {
											if (key == that.data[k].showData) {
												tmpData.push(parseFloat(that.data[k].result[i][key]));
												break;
											}
										}	
									}
									arData.push(tmpData);
								}
							}
						}
					} 
					
					that.legend.valPerSlice = that.legend.calculateLegend(arData);//test
					
				};
				
				this.createHeatMap = function(options) {
					var minOpacity = 0.01;
					var radius = 10;
					var blur = 0;
					var max = 1;
					
					if (options != undefined) {
						if (options.minOpacity != undefined) {minOpacity = options.minOpacity;}
						if (options.radius != undefined) {radius = options.radius;}
						if (options.blur != undefined) {blur = options.blur;}
						if (options.max != undefined) {max = options.max;}
					}
					var heat = sop.heatLayer();
					heat.addTo(this.gMap);
					heat.setOptions({
						minOpacity: minOpacity,
						radius: radius,
						blur: blur,
						max: max
					});
					
					this.heatMap = heat;
				};
				
				this.addHeatMap = function(x, y, data) {
					if (this.heatMap) {
						this.heatMap.addUTMK([
							 parseFloat(x),
							 parseFloat(y),
							 data
						]);
					}
				};
				
				this.setHeatMapOptions = function(radius, blur, max) {
					if (this.heatMap != null) {
						this.heatRadius = radius;
						this.heatBlur = blur;

						var hMax = max;
						var zlHeat = true;
						if (this.zoomLevelHeat) {
							hMax = 1;
						}
						
						this.heatMap.setOptions({
							minOpacity: 0.01,
							radius: radius,
							blur: blur,
							max: hMax,
							zoomLevelHeat : this.zoomLevelHeat
						});
					}
				};
				
				this.changeHeatMap = function(){
					$thematicMapFrame13.Popup.show();
					this.lastGeojsonInfo = null;
					
					that.gMap.setMinZoom(1);
					if(that.gMap.getZoom() == 0)
						that.gMap.setZoom(1);
					
					if($("#dataMode").val() == "heatMapGrid"){
						that.gMap.setMaxZoom(9);
						if(that.gMap.getZoom() > 9)
							that.gMap.setZoom(9);
					}
					
					$("#autoRegion").attr('class', 'first last on');
					$("#sido").hide();
					$("#sigungu").hide();
					$("#eupmyundong").hide();
					
					this.openApiReverseGeoCode(this.center, this.bnd_year);
				}
				
				// 히트맵 -> 색상이나 버블로 변경시 히트맵관련 초기화
				this.heatMapClear = function(){
					// mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
//					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "mtjKxt2Zkb20171109101132537k7SYSI50kn"){
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sFKoutEowH20201208140301610JputqDxrrK"){
					// mng_e 2020. 12. 01 j.h.Seok 통계주제도 통합
						
						this.gMap.setMinZoom(0);
						this.gMap.setMaxZoom(11);
					}
					
					if(this.geojson){
						this.geojson.remove();
						this.geojson = null;
					}
					
					if (this.dataGeojson) {
						this.dataGeojson.remove();
						this.dataGeojson = null;
						this.removeCaption();
					}
					
					// 버블 삭제
					if (this.legend.circleMarkerGroup != null) {
			    		for (var i=0; i<this.legend.circleMarkerGroup.length; i++) {
				    		var marker = this.legend.circleMarkerGroup[i];
				    		marker.remove();
				    	}
			    		this.legend.circleMarkerGroup = null;
			    	}
					
					this.heatMap.setUTMKs([]);
					
					//파이차트 마커 초기화
					if (this.pieChartMarkers == null) {
						this.pieChartMarkers = [];
					}else {
						for (var i=0; i<this.pieChartMarkers.length; i++) {
							this.pieChartMarkers[i].remove();
						}
					}
					
					this.multiLayerControl.dataGeojson = [];
					this.dataType = "normal";
					this.changeRegionBound();
				}

				this.changePieChart = function(){
					
					var that = this;
					var sido_cd, sgg_cd = "";
					
					// 버블 삭제
					if (this.legend.circleMarkerGroup != null) {
			    		for (var i=0; i<this.legend.circleMarkerGroup.length; i++) {
				    		var marker = this.legend.circleMarkerGroup[i];
				    		marker.remove();
				    	}
			    		this.legend.circleMarkerGroup = null;
			    	}
					
					if(that.zoom <= 3){
						data_type = "1";
						srvLogWrite("B0","06","01","01",$(".helperText span").text(),"");
					} 
					else if(that.zoom <= 5){
						data_type = "2";
						srvLogWrite("B0","06","01","02",$(".helperText span").text(),"");
					}
					else if(that.zoom <= 8){
						data_type = "3";
						srvLogWrite("B0","06","01","03",$(".helperText span").text(),"");
					}
					else if(data_type == "3")
						sgg_cd = that.curSiggCd;
					
					
					
					$.ajax({
						type: "GET",
						url: contextPath + "/ServiceAPI/thematicMap/getChildcare.json",
						async : false,
						data : {
							type : "pi",
							bnd_year : that.thema_stat_data_base_year,
							data_type : data_type,
							adm_cd : that.curSidoCd + sgg_cd
						},
						success: function(res) {
							if (res.errCd == "0") {
								var result = res.result;
								//pie차트 크기설정을 위한 범례계산
								var corpData = [];
								var tmpCorpData = [];
								var pieCalcInfo;
								for (var i=0;i <result.length; i++) {
									tmpCorpData.push(parseInt(result[i].total_cnt));
								}
								corpData.push(tmpCorpData);
								
								for (var i=0; i<corpData.length; i++) {
									var tmpData = [];
									$.each(corpData[i], function(k, el){
										if($.inArray(el, tmpData) === -1) tmpData.push(el);
									});
									corpData[i] = tmpData;
								}
								
								var tmpValPerSlice = [];
								for(var i = 0; i < corpData.length; i++){
									var tmpResult = that.legend.jenks(corpData[i], that.legend.lv);
									tmpValPerSlice.push(tmpResult);
								}
								pieCalcInfo = tmpValPerSlice;
								
//								that.legend.calculateLegend(corpData);
								tmpCorpData = null;
								
								//파이차트 마커 초기화
								if (that.pieChartMarkers == null) {
									that.pieChartMarkers = [];
								}else {
									for (var i=0; i<that.pieChartMarkers.length; i++) {
										that.pieChartMarkers[i].remove();
									}
								}
								
								//범례기준크기 설정
								var pieChartWidth = [60, 70, 80, 90, 98, 106, 114];
								
								Highcharts.wrap(Highcharts.seriesTypes.pie.prototype, 'drawPoints', function(proceed) {
								    Highcharts.each(this.points, function(p) {
								        if (p.shapeArgs) {
								            p.shapeArgs.open = false;
								        }
								    });
								    proceed.call(this);
								});
								
								if(that.geojson){
									that.geojson.eachLayer(function(layer) {
										var tmpData = [];
										for (var i=0; i<result.length; i++) {
											var tmpResult = result[i];
											if (tmpResult.adm_cd == layer.feature.properties.adm_cd) {
												var x_coord = layer.feature.properties.x;
												var y_coord = layer.feature.properties.y;
												var adm_cd = layer.feature.properties.adm_cd;
												var adm_nm = layer.feature.properties.adm_nm;
												var calcInfo = that.legend.getColor(parseFloat(tmpResult.total_cnt), pieCalcInfo[0]);
												var width = pieChartWidth[calcInfo[1]];
												var margin = -(width/2) + "px";
												
												adm_nm = adm_nm.split(" ");
												// 시군구 명이 [수원시 팔달구] 두개로 나올때
												if(this.data_type == "2" && adm_nm.length == "3"){
													adm_nm = adm_nm[adm_nm.length-2] + " " +adm_nm[adm_nm.length-1];
													width = parseInt(width) + 5;
												} else {
													adm_nm = adm_nm[adm_nm.length-1]													
												}
												
												var html = "";
												if(adm_cd == "39"){	//세종
													html  = "<div id='chart_"+adm_cd+"' style='width:80px;height:"+width+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:"+margin+";margin-top:"+margin+";'>";
													html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;height:6px;text-shadow:-1px 0 white,0 1px white,1px 0 white,0 -1px #fff;'>"+adm_nm+"</div>";
													html += 	"<div id='pieChart_"+adm_cd+"' style='background-color:rgba(255,255,255,0);margin-left:6px;'></div>";
												    html += "</div>";
												} else {
													html  = "<div id='chart_"+adm_cd+"' style='width:"+width+"px;height:"+width+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:"+margin+";margin-top:"+margin+";'>";
													html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;height:6px;text-shadow:-1px 0 white,0 1px white,1px 0 white,0 -1px #fff;'>"+adm_nm+"</div>";
													html += 	"<div id='pieChart_"+adm_cd+"' style='background-color:rgba(255,255,255,0);'></div>";
													html += "</div>";
												}
												
												var icon = new sop.DivIcon({html:html, className: "pieChart-sido", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
												
												if(adm_cd == "23"){	// 인천
													x_coord = parseInt(x_coord) - 20000;
												} else if(adm_cd == "29"){	// 세종
													x_coord = parseInt(x_coord) - 8000;
													y_coord = parseInt(y_coord) + 8000;
												} else if(adm_cd == "31"){	// 경기도
													x_coord = parseInt(x_coord) + 38000;
												} else if(adm_cd == "32"){	// 강원도
													x_coord = parseInt(x_coord) + 50000;
												} else if(adm_cd == "33"){	// 충청북도
													x_coord = parseInt(x_coord) + 25000;
												} else if(adm_cd == "36"){	// 전라남도
													x_coord = parseInt(x_coord) + 30000;
												} else if(adm_cd == "38"){	// 경상남도
													x_coord = parseInt(x_coord) - 30000;
													y_coord = parseInt(y_coord) + 20000;
												} else if(adm_cd == "39"){	// 제주
													x_coord = parseInt(x_coord) + 5000;
													y_coord = parseInt(y_coord) - 12000;
												}
												
												var	marker = sop.marker([ x_coord, y_coord ], {
														icon : icon,
														zindexOffset : 999
													});
												
												marker.addTo(that.gMap);
												
												var total_per = 100 - tmpResult.weak_per;
													total_per = total_per.toFixed(2);
													
												var tooltipMsg = "<div class='techSidoTooltipBox'>";
													tooltipMsg += 	"<div class='tech_topbar'>"+adm_nm+"</div>";
													tooltipMsg += 	"<div class='tech_popContents'>";
													tooltipMsg += 	"<span class='tech_tit ico01'></span>";
													tooltipMsg += 	"<div class='tech_typelabel'>";
													tooltipMsg +=   	"<p class='tech_txtSubj' style='background:url(/img/tech/ico_won01.png) no-repeat left 7px; padding-left:15px;'>6세이하 취약인구 : " + appendCommaToNumber(tmpResult.weak_cnt) + "명(" +tmpResult.weak_per + "%)</p>";
													tooltipMsg +=	"</div>";
													tooltipMsg +=   	"<p class='tech_txtSubj' style='margin-top:-12px; font-size:14px; padding-left:15px;'>(전체 6세이하 인구 : " + appendCommaToNumber(tmpResult.total_cnt) + "명)</p>";
													tooltipMsg +="</div>";
													
												marker.bindInfoWindow(tooltipMsg);
												
//												//파이차트 데이터 생성
												if(total_per != 100){
													tmpData.push({
														name : "취약인구",
														y : parseFloat(tmpResult.weak_per),
														color : "rgba(239, 53, 107, 0.7)"
													});
												}
												tmpData.push({
													name : "",
													y : parseFloat(total_per),
													color : "rgba(247, 203, 0, 0.7)"
												});
												
												that.pieChartMarkers.push(marker);
												
												//파이차트 생성
												$("#pieChart_"+adm_cd).highcharts({
										            chart: {
								                        plotBackgroundColor: null,
								                        plotBorderWidth: null,
												        plotShadow: false,
										            	type: 'pie',
										            	events: {
										            		load: function() {
										            			this.series[0].points.forEach(function(p) {
										            				// 100%일때 border가 원 안에도 생기는 문제
										            				if(p.options.y == 100){
										            					p.graphic.open = true;
										            				}
										            			});
										            		},
										            		click : function() {
										            			srvLogWrite("B0","06","02","00",$(".helperText span").text(),adm_nm + ", 6세이하 취약인구 : " + appendCommaToNumber(tmpResult.weak_cnt) + "명(" +tmpResult.weak_per +"per) & (전체 6세이하 인구 : " + appendCommaToNumber(tmpResult.total_cnt) + "명)");
										            		}
										            	},
										                width : width,
										                height : width,
										                backgroundColor:'rgba(255, 255, 255, 0)',
										                margin : [-3, 0, 0, 0]
										            },
										            exporting: { enabled: false },
										            title: { text: '' },
										            tooltip: {
										            	enabled: true,
//										                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b><br/>'
										            	pointFormat: '<b>{point.y}%</b>'
										                	 
										            },
										            plotOptions: {
										               series: {
										                    dataLabels: {
										                        enabled: false,
										                        format: '{point.name}: {point.y:.1f}%'
										                    },
										                    enableMouseTracking: false
										                },
										                pie : {
										                	shadow : false,
										                	borderWidth: 1,
										                	borderColor: 'rgb(70, 65, 217)'
										                }
										            },
										            series: [{
										                name: 'Brands',
										                colorByPoint: true,
										                data: tmpData
										            }]
										        });	
												
												break;
											} 
										}
									});
									if (that.circleMarkerGroup != null) {
							    		for (var i=0; i<that.circleMarkerGroup.length; i++) {
								    		var marker = that.circleMarkerGroup[i];
								    		marker.remove();
								    	}
							    		that.circleMarkerGroup = null;
							    	}
								}
							}
						},
						dataType: "json",
						error:function(e){}  
					});
				}
				
				this.getChildcareHeatMap = function(flag) {
					
					var that = this;
					var sido_cd, sgg_cd, area;
					var data_type = this.curPolygonCode;
					
					that.dataType = "heatMap";
					
					if (that.heatMap) {
						that.heatMap.setUTMKs([]);
					}
					that.legend.valPerSlice = null;
					
					// 버블 삭제
					if (this.legend.circleMarkerGroup != null) {
			    		for (var i=0; i<this.legend.circleMarkerGroup.length; i++) {
				    		var marker = this.legend.circleMarkerGroup[i];
				    		marker.remove();
				    	}
			    		this.legend.circleMarkerGroup = null;
			    	}
					
					//파이차트 마커 초기화
					if (that.pieChartMarkers != null) {
						for (var i=0; i<that.pieChartMarkers.length; i++) {
							that.pieChartMarkers[i].remove();
						}
					}
					
					if(that.zoom <= 3) data_type = "1";
					if(this.curPolygonCode == "4")
						sgg_cd = that.curSiggCd;
						
					var mapBounds = that.gMap.getBounds();
					
					if (this.curPolygonCode == "4" || this.curPolygonCode == "5") 
						data_type = "100m";
					else if (this.curPolygonCode == "3") 
						data_type = "1k";
					else
						data_type = "10k";
					
					area = 'RECTANGLE(';
					area += mapBounds._southWest.x + ' ' + mapBounds._southWest.y + ',';
					area += mapBounds._northEast.x + ' ' + mapBounds._northEast.y;
					area += ')';
					
					$.ajax({
						type: "GET",
						url: contextPath + "/ServiceAPI/thematicMap/getChildcare.json",
						async : false,
						data : {
							type : "pt",
							sido_cd : that.curSidoCd,
							sgg_cd : sgg_cd,
							bnd_year : that.left_base_year,
							data_type : data_type,
							adm_cd : that.curSidoCd + sgg_cd,
							area : area
						},
						success: function(res) {
							if (res.errCd == "0") {
								var max = null;
								var list = res.result;
								var tempData = [];
								
								for (var i=0; i<list.length; i++) {
									tempData.push(list[i].cnt);
								}
								
								max = Math.max.apply(null, tempData);
								that.zoomLevelHeat = false;
								
								if (that.curPolygonCode == "4" || that.curPolygonCode == "5"){
									that.zoomLevelHeat = true;
									that.setHeatMapOptions(that.heatRadius, that.heatBlur, max);
									for (var i=0; i<list.length; i++) {
										that.addHeatMap(list[i].x, list[i].y, list[i].cnt);
									}
								} else {
									that.zoomLevelHeat = false;
									that.setHeatMapOptions(that.heatRadius, that.heatBlur, max);
									for (var i=0; i<list.length; i++) {
										that.addHeatMap(list[i].x, list[i].y, list[i].cnt);
									}
								}
								
								if(that.zoom <= 3){
									that.heatRadius = 15;
									that.heatBlur = 30;
								} else if(that.zoom == 4){
									that.heatRadius = 20;
									that.heatBlur = 30;
								} else  if(that.zoom == 5){
									that.heatRadius = 35;
									that.heatBlur = 60;
								} else if(that.zoom == 6){
									that.heatRadius = 20;
									that.heatBlur = 70;
								} else if(that.zoom == 7 || that.zoom == 8 || that.zoom == 9){
									that.heatRadius = 25;
									that.heatBlur = 80;
								}
								that.setHeatMapOptions(that.heatRadius, that.heatBlur);
//								console.log("that.zoom 2>>>  " + that.zoom + ", heatRadius, heatBlur : " + that.heatRadius + ", " + that.heatBlur);
							}
						},
						dataType: "json",
						error:function(e){}  
					});
				}
				
				this.getLegendValues = function(param) {
					$.ajax({
						type: "GET",
						url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapExmpl.json",
						async : false,
						data : {
							stat_thema_map_id : param.stat_thema_map_id
						},
						success: function(res) {
							if (res.errCd == "0") {
								console.log("SseOk", res);
								that.thema_legend_values = res.result.legend_values;
								
								$('#themaInit_'+that.legend.id).trigger("click");
							}
						},
						dataType: "json",
						error:function(e){}  
					});
				};
				
				// 2016. 08. 03 j.h.Seok
				this.AreaAndStatsApis = function(_adm_cd, pagenum) {
					// mng_s 2017. 10. 30 j.h.Seok
					var adm_cd = _adm_cd;
					if(_adm_cd.length > 5) {
						_adm_cd = _adm_cd.substring(0, 5);
						adm_cd = _adm_cd;
					}					
					// mng_e 2017. 10. 30 j.h.Seok
					
					// 시도 경계인 경우
					if (adm_cd == null) {

					}

					var mapBounds = that.gMap.getBounds();
					if(that.poiAdmCd == undefined || that.poiAdmCd == "" || that.poiAdmCd == null) {
						that.poiAdmCd = _adm_cd;
					} else {
						if(that.poiAdmCd != _adm_cd) {
							that.poiAdmCd = _adm_cd;
							that.markers.clearLayers();
						} else {
							return;
						}
					}

					if (this.gMap.getZoom() == 8) {
						var center = that.gMap.getCenter();
						var area = 'CIRCLE(' + center.x + ' ' + center.y + ',' + '5000' + ')';
						
						// mng_s 2017. 08. 03 석진혁
						//that.callThemePOIResult(area, pagenum);
						// mng_e 2017. 08. 03 석진혁
					} else if (that.gMap.getZoom() > 8) {
						var area = 'RECTANGLE(';
						area += mapBounds._southWest.x + ' ' + mapBounds._southWest.y + ',';
						area += mapBounds._northEast.x + ' ' + mapBounds._northEast.y;
						area += ')';

						if(!that.netWorkDataIDFlag)	// 네트워크 데이터 아닐때
							that.callThemePOIResult(_adm_cd, area, pagenum);
						else
							$thematicMapFrame13.Popup.close();
					}
				},
				
				// mng_s 2017. 08. 03 석진혁
				this.callThemePOIResult = function(adm_cd, area, pagenum) {
					if(area === null || area === undefined) {
						var mapBounds = that.gMap.getBounds();
						
						area = "";
						area = 'RECTANGLE(';
						area += mapBounds._southWest.x + ' ' + mapBounds._southWest.y + ',';
						area += mapBounds._northEast.x + ' ' + mapBounds._northEast.y;
						area += ')';
					}
					
					var sopCompanySearchObj = new sop.thema.companySearch.api();
					sopCompanySearchObj.addParam("bnd_year", that.bnd_year);
					
					//mng_s 20190419 통계주제도의 POI 요청시 2017일 경우 2016으로 변경 ==> 나중에 2017년도가 들어오면 이 하드코딩은 제거하면됨
					//=========================================================================
//					if( that.thema_stat_data_base_year == '2017' ) {
//						sopCompanySearchObj.addParam("year", '2016');
//					} else {
//						sopCompanySearchObj.addParam("year", that.thema_stat_data_base_year);
//					}
					//=========================================================================
					sopCompanySearchObj.addParam("year", that.thema_stat_data_base_year); //추후 2017이 서비스 될 경우 이 코드를 사용하면됨
					
					
					sopCompanySearchObj.addParam("area", area);
					sopCompanySearchObj.addParam("resultcount", '500');
					sopCompanySearchObj.addParam("pagenum", pagenum);
					sopCompanySearchObj.addParam("adm_cd", adm_cd);
					
					if(that.theme_cd != undefined) {
						sopCompanySearchObj.addParam("theme_cd", that.theme_cd);
					}
					
					if(that.corp_class_cd != undefined) {
						sopCompanySearchObj.addParam("corp_class_cd", that.corp_class_cd);
					}
					
					
					//mng_s 20191030 통계주제도의 POI 요청시 2018일 경우 2017으로 변경 ==> 나중에 2018년도가 들어오면 이 하드코딩은 제거하면됨
					//=========================================================================
					var hard_year = that.thema_stat_data_base_year;
/*					if( hard_year == '2018' ) {
						hard_year = '2017';
					} else {
						hard_year = that.thema_stat_data_base_year;
					}*/
					//=========================================================================
					
					// mng_s 2020. 11. 26 j.h.Seok POI 호출 시 사업체 최신년도 코드 확인 로직 추가
					//sopCompanySearchObj.addParam("year", hard_year); //추후 2017이 서비스 될 경우 이 코드를 사용하면됨
					
					var data_year = that.thema_stat_data_base_year
					if(companyDataYear < data_year) {
						data_year = companyDataYear;
					}
					sopCompanySearchObj.addParam("year", data_year);
					// mng_e 2020. 11. 26 j.h.Seok POI 호출 시 사업체 최신년도 코드 확인 로직 추가
					
					var param = {
							"bnd_year"    : that.bnd_year,
							
							// mng_s 2020. 11. 26 j.h.Seok POI 호출 시 사업체 최신년도 코드 확인 로직 추가
							//"year" 	  : that.thema_stat_data_base_year,
							"year" 	      : data_year,
							// mng_e 2020. 11. 26 j.h.Seok POI 호출 시 사업체 최신년도 코드 확인 로직 추가
							
							"area"		  : area,
							"theme_cd"	  : that.theme_cd,
							"corp_class_cd"	  : that.corp_class_cd,
							"resultcount" : 500,
							"pagenum"     : pagenum,
							"adm_cd"	  : adm_cd
					};

					sopCompanySearchObj.request({
						method : "POST",
						async : false,
						url : contextPath + "/ServiceAPI/thematicMap/getThemaMapPOI.json",
						options : {
							url : "/ServiceAPI/thematicMap/getThemaMapPOI.json",
							target : this,
							param : param,
							btntype: "poi",
							title : that.selectedPoiTitle,
							map : that.map
						}
					});
				},
				// mng_e 2017. 08. 03 석진혁
				


				// mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
				this.AreaAndStatsApisForPOI = function(_adm_cd, pagenum) {
					var adm_cd = _adm_cd;

					var mapBounds = that.gMap.getBounds();
					if(that.poiMapBounds == undefined || that.poiMapBounds == "" || that.poiMapBounds == null) {
						that.poiMapBounds = mapBounds;
					} else {
						if(!that.poiMapBounds.contains(that.gMap.getCenter())) {
							that.poiMapBounds = mapBounds;
							that.markers.clearLayers();
						} else {
							return;
						}
					}
					
					var area = 'RECTANGLE(';
					area += mapBounds._southWest.x + ' ' + mapBounds._southWest.y + ',';
					area += mapBounds._northEast.x + ' ' + mapBounds._northEast.y;
					area += ')';

					that.callThemePOIResultForPOI(area, pagenum);
				},

				// mng_s 2017. 08. 03 석진혁
				this.callThemePOIResultForPOI = function(area, pagenum) {
					if(area === null || area === undefined) {
						var mapBounds = that.gMap.getBounds();
						
						area = "";
						area = 'RECTANGLE(';
						area += mapBounds._southWest.x + ' ' + mapBounds._southWest.y + ',';
						area += mapBounds._northEast.x + ' ' + mapBounds._northEast.y;
						area += ')';
					}
					
					var sopCompanySearchForPOIObj = new sop.thema.companySearchForPOI.api();
					sopCompanySearchForPOIObj.addParam("bnd_year", that.bnd_year);
					sopCompanySearchForPOIObj.addParam("year", that.thema_stat_data_base_year);
					sopCompanySearchForPOIObj.addParam("area", area);
					sopCompanySearchForPOIObj.addParam("resultcount", '500');
					sopCompanySearchForPOIObj.addParam("pagenum", pagenum);
					
					if(that.theme_cd != undefined) {
						sopCompanySearchForPOIObj.addParam("theme_cd", that.theme_cd);
					}
					
					if(that.corp_class_cd != undefined) {
						sopCompanySearchForPOIObj.addParam("corp_class_cd", that.corp_class_cd);
					}

					// mng_s 2020. 11. 26 j.h.Seok POI 호출 시 사업체 최신년도 코드 확인 로직 추가
					var data_year = that.thema_stat_data_base_year
					if(companyDataYear < data_year) {
						data_year = companyDataYear;
					}
					sopCompanySearchForPOIObj.addParam("year", data_year);
					// mng_e 2020. 11. 26 j.h.Seok POI 호출 시 사업체 최신년도 코드 확인 로직 추가
					
					var param = {
							"bnd_year"    : that.bnd_year,

							// mng_s 2020. 11. 26 j.h.Seok POI 호출 시 사업체 최신년도 코드 확인 로직 추가
							//"year" 	  : that.thema_stat_data_base_year,
							"year" 	      : data_year,
							// mng_e 2020. 11. 26 j.h.Seok POI 호출 시 사업체 최신년도 코드 확인 로직 추가
							
							"area"		  : area,
							"theme_cd"	  : that.theme_cd,
							"corp_class_cd"	  : that.corp_class_cd,
							"resultcount" : 500,
							"pagenum"     : pagenum
					};

					sopCompanySearchForPOIObj.request({
						method : "POST",
						// mng_s 2017. 08. 05 석진혁
						async : true,
						// mng_e 2017. 08. 05 석진혁
						url : contextPath + "/ServiceAPI/thematicMap/getThemaMapPOI.json",
						options : {
							url : "/ServiceAPI/thematicMap/getThemaMapPOI.json",
							target : this,
							param : param,
							btntype: "poi",
							title : that.selectedPoiTitle,
							map : that.map
						}
					});
				},
				
				/**
				 * @name         : changeStatThemaId
				 * @description  : 통합된 통계주제도에서 통계아이디 변경
				 * @date         : 2020. 12. 01 
				 * @author	     : 네이버시스템
				 */
				this.changeStatThemaId = function(position, refresh) {
					if($thematicMapFrame13.params.stat_thema_map_id === 'M5DKMyEHJu20201130172257318wIEwIyKL8x') {
						// 인구 천명당 전체산업 현황
						$("#change_stat_thema_middle").hide();
						$("#change_stat_thema_left").text("산업현황");
						$("#change_stat_thema_right").text("종사자수");
						// mng_s 20210427 김건민 (툴팁 문구 오류 수정 있어서 수정함.)
						if(position === 'left') {
							// 산업 현황
							that.thema_map_data_id = 'kosis_psnby_1000_biz_cnt';
							$('#stat_sel a').text('수(개)');
							that.left_sep_unit = '개';
							that.left_sep_chart_title = '인구 천명당 사업체 수(개)';
							//that.left_sep_ttip_title = '인구 천명당 사업체수(개)'
							that.left_sep_ttip_title = '인구 천명당 사업체수'
						} else if(position === 'right') {
							// 종사자 수
							that.thema_map_data_id = 'kosis_psnby_1000_employee_cnt';
							$('#stat_sel a').text('수(명)');
							that.left_sep_unit = '명';
							that.left_sep_chart_title = '인구 천명당 종사자 수(명)';
							//that.left_sep_ttip_title = '인구 천명당 종사자수(명)';
							that.left_sep_ttip_title = '인구 천명당 종사자수';
						}
						// mng_e 20210427 김건민
					} else if($thematicMapFrame13.params.stat_thema_map_id === 'sFKoutEowH20201208140301610JputqDxrrK') {
						// 보육업체 현황
						$("#change_stat_thema_middle").hide();
						$("#change_stat_thema_left").text("취약인구 현황");
						$("#change_stat_thema_right").text("분포도");
						
						if(position === 'left') {
							// 취약인구 현황
							that.thema_map_data_id = 'dycrcty_500m_mt_6_age_ppltn_cnt';
							$('#stat_sel').show();
							$('#region_boundary').show();
							$('#map_type').show();
							$('#data_type').show();
							that.markers.clearLayers();
							$thematicMapFrame13.ui.poiInfoArray = [];
							
							that.gMap.setMaxZoom(8);
							that.gMap.setMinZoom(1);
							
							if(that.changeStatThemaInfo.center != undefined) {
								that.gMap.setView(that.changeStatThemaInfo.center, that.changeStatThemaInfo.zoom);
							} else {
								that.gMap.setZoom(1);
							}
						} else if(position === 'right') {
							// 분포도
							that.thema_map_data_id = "temp";
							initTopBottomButtons();
							that.heatMapClear();
							that.poiMapBounds = null;
							
							$('#stat_sel').hide();
							$('#region_boundary').hide();
							$('#map_type').hide();
							$('#data_type').hide();
							
							that.changeStatThemaInfo['center'] = that.gMap.getCenter();
							that.changeStatThemaInfo['zoom'] = that.gMap.getZoom();
							
							that.gMap.setMaxZoom(13);
							that.gMap.setMinZoom(9);
							that.gMap.setView(that.changeStatThemaInfo.center, that.changeStatThemaInfo.zoom);
						}
					}

					if(that.initData != undefined && that.initData != null) {
						that.initData.thema_map_data_id = that.thema_map_data_id;
					}
					
					if(refresh) {
//						$thematicMapFrame13.Popup.show();
						that.isReloadMode = true;
						that.openApiReverseGeoCode(that.center, that.bnd_year);
					} else {
						$("#change_stat_thema_left").addClass("on");
						that.openInitStatData($thematicMapFrame13.params);
					}
				},
				// mng_e 2020. 12. 01 j.h.Seok 통계주제도 통합
				
				/** 통계데이타 조회 **/
				/**
				 * 
				 * @name         : openInitStatData
				 * @description  : 통계 주제 데이터를 가져온다.
				 * @date         : 2015. 11. 10. 
				 * @author	     : 정수영
				 * @history 	 :
				 */
				
				 this.openInitStatData = function openInitStatData(param, callback){
					var stat_thema_map_id = param.stat_thema_map_id;					
					
					// 네트워크 데이터
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "2qAx0jvYOk20180802165500441EHhhaQZQaK" || window.parent.$thematicMapMain.param.stat_thema_map_id == "3SnEYaTafC20181127142830568kSyMYbSg3S" || window.parent.$thematicMapMain.param.stat_thema_map_id == "OuQf1ZhcWo20190822091422257GkbDsfsZHi"){
						srvLogWrite("B0","10","01","00",window.parent.$thematicMapMain.themaInfo.title,"");
						that.netWorkDataIDFlag = true;
					}
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "3SnEYaTafC20181127142830568kSyMYbSg3S"){
						srvLogWrite("B0","10","01","00",window.parent.$thematicMapMain.themaInfo.title,"");
						$("#network_legend ul li").eq(1).text("소방시설 5분 접근영역");
						$("#network_legend ul li").eq(3).text("소방시설 10분 접근영역");
						$("#network_legend ul li").eq(5).text("소방시설 30분 접근영역");
					}
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "OuQf1ZhcWo20190822091422257GkbDsfsZHi"){
						$("#network_legend ul li").eq(1).text("경찰관서 5분 접근영역");
						$("#network_legend ul li").eq(3).text("경찰관서 10분 접근영역");
						$("#network_legend ul li").eq(5).text("경찰관서 30분 접근영역");
					}

					$.ajax({
						  type: "GET",
						  url: contextPath + "/ServiceAPI/thematicMap/GetThemaTest.json",
						  async : false,
						  data : {
							  stat_thema_map_id : stat_thema_map_id
						  },
						  success: function(res) {
							  if (res.errCd == "0") {
								  that.initData = res.result.getThemaStatsInfo[0];
								  var result = res.result.getThemaStatsInfo[0];
								  
								  //제목달기
														
								  //$(".h3.helperText").prepend("<span>" + res.result.getThemaStatsInfo[0].title + "</span>");
//								  $(".helperText span").text(res.result.getThemaStatsInfo[0].title);
								  //$(".h3.helperText a").attr("title",res.result.getThemaStatsInfo[0].exp);
								  
								  var expText = res.result.getThemaStatsInfo[0].exp;
								  
								  // mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
								  $(".h3.helperText span").remove();
								  // mng_e 2020. 12. 01 j.h.Seok 통계주제도 통합
								  
								  $(".h3.helperText").prepend("<span>" + res.result.getThemaStatsInfo[0].title + "</span>");
								  $(".h3.helperText a").prop("title", expText.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">"));
								
								  //leftside menu - left
								  //
								  if (result.left_sep_nm !=null && result.left_sep_unit !=null && result.left_sep_nm.length > 0 && result.left_sep_unit.length > 0){
									  var leftHtml= '<a href="javascript:srvLogWrite(\'B0\',\'03\',\'02\',\'01\',\''+result.title+'\',\'\');$thematicMapFrame13.Popup.show();$thematicMapFrame13.ui.changeLeftRightValue()" class="first last" id="leftValue">'+ result.left_sep_nm+'('+result.left_sep_unit+')</a>'
									  
									  // mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
									  $('#stat_sel a').remove();
									  // mng_e 2020. 12. 01 j.h.Seok 통계주제도 통합
									  
									  $('#stat_sel').append(leftHtml);
									  //초기화
									  $("#leftValue").addClass("on");
									  $("#selectValue").val("leftValue");
								  }
								  
								  //leftside menu - right
								  if (result.right_sep_nm !=null && result.right_sep_unit!=null && result.right_sep_nm.length > 0 && result.right_sep_unit.length > 0){
									  var rightHtml= '<a href="javascript:srvLogWrite(\'B0\',\'03\',\'02\',\'02\',\''+result.title+'\',\'\');$thematicMapFrame13.Popup.show();$thematicMapFrame13.ui.changeLeftRightValue()" class="last" id="rightValue">'+ result.right_sep_nm+'('+result.right_sep_unit+')</a>'
									  $('#stat_sel').append(rightHtml);
									  $('#leftValue').removeClass('last');
								  }
								  
								  that.thema_map_data_id = res.result.getThemaStatsInfo[0].thema_map_data_id;
								  //증감률 데이터
								  that.left_sep_unit = res.result.getThemaStatsInfo[0].left_sep_unit;
								  that.left_sep_nm = res.result.getThemaStatsInfo[0].left_sep_nm;
								  that.left_sep_source = res.result.getThemaStatsInfo[0].left_sep_source;
								  that.left_sep_ttip_title = res.result.getThemaStatsInfo[0].left_sep_ttip_title;
								  that.left_sep_chart_title = res.result.getThemaStatsInfo[0].left_sep_chart_title;							  
								  that.max_expnsn_level = res.result.getThemaStatsInfo[0].max_expnsn_level;
								  that.left_base_year = res.result.getThemaStatsInfo[0].left_base_year;
								  that.bnd_year = res.result.getThemaStatsInfo[0].left_base_year;
								 
								  //CAGR 데이터
								  that.right_sep_unit = res.result.getThemaStatsInfo[0].right_sep_unit;
								  that.right_sep_nm = res.result.getThemaStatsInfo[0].right_sep_nm;
								  that.right_sep_source = res.result.getThemaStatsInfo[0].right_sep_source;
								  that.right_sep_ttip_title = res.result.getThemaStatsInfo[0].right_sep_ttip_title;
								  that.right_sep_chart_title = res.result.getThemaStatsInfo[0].right_sep_chart_title;							  
								  that.min_redctn_level = res.result.getThemaStatsInfo[0].min_redctn_level;
								  
								  that.thema_stat_data_base_year = res.result.getThemaStatsInfo[0].stat_data_base_year;
								  that.thema_atdrc_yn = res.result.getThemaStatsInfo[0].atdrc_yn;
								  that.boundary_fix_yn = res.result.getThemaStatsInfo[0].boundary_fix_yn;
								  
								  var tempPoiDispYn = res.result.getThemaStatsInfo[0].poi_disp_yn;
								  if(tempPoiDispYn != undefined && tempPoiDispYn != null && tempPoiDispYn == 'Y') {
									  that.poi_disp_yn = true;
									  that.theme_cd = res.result.getThemaStatsInfo[0].theme_cd;
										// mng_s 2017. 08. 03 석진혁
										that.corp_class_cd = res.result.getThemaStatsInfo[0].corp_class_cd;
										// mng_e 2017. 08. 03 석진혁
								  }
								  
								  $("#thematicMapOrigin").html(that.left_sep_source);
								  
								//시계열년도고정유무가 Y이면, 기준경계년도에 맞는 경계를 표출한다.
								  if (that.boundary_fix_yn == "Y") {
									  that.bnd_year = that.left_base_year;
								  }

								  // DB 에서 가져온 max_expnsn_level 의 값에 따른 분기 저리 필요
								  // 01 : 시도 => 3
								  // 02 : 시군구 => 5
								  // 03 : 읍면동 => 8
								  // 04 : 집계구 => 별도 줌 레벨 설정 필요 없음
								  that.gMap.setMinZoom(0);
								  if(that.max_expnsn_level=="01"){
									  that.gMap.setMaxZoom(3);
									  $("#sido").attr('class', 'last');
									  $("#sigungu").hide();
									  $("#eupmyundong").hide();
								  }else if(that.max_expnsn_level=="02"){
									  that.gMap.setMaxZoom(5);
									  $("#sigungu").attr('class', 'last');
									  $("#eupmyundong").hide();
								  }else if(that.max_expnsn_level=="03"){
									  if(that.poi_disp_yn) {
										  that.gMap.setMaxZoom(11);
									  } else {
										  that.gMap.setMaxZoom(8);
									  }
								  }else if(that.max_expnsn_level=="04"){
									  that.gMap.setMaxZoom(11);
								  }
								  
								  // mng_s 2017. 12. 13 kdb
								  //문화재현황에 등록문화재 추가
								  if(window.parent.$thematicMapMain.param.stat_thema_map_id == "xz4MtuyvFJ20160121115806995JysKLvtonK"){
									  $('#region_boundary').append('<a href="javascript:$thematicMapFrame13.ui.mapList[0].changeRegionBound()" id="heritage" class="last" style="width:86px;">문화재관리지도</a>');
									  $("#sigungu").attr('class', '');
								  }
								  // mng_e 2017. 12. 13 kdb
								  
								  // mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
//								  if(window.parent.$thematicMapMain.param.stat_thema_map_id == "mtjKxt2Zkb20171109101132537k7SYSI50kn"){
								  if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sFKoutEowH20201208140301610JputqDxrrK"){
								  // mng_e 2020. 12. 01 j.h.Seok 통계주제도 통합
									  
									  $('#map_type').append('<a href="javascript:$thematicMapFrame13.ui.changeDataMode()" class="" id="pieChart">파이차트</a>');
									  $('#map_type').append('<a onclick="srvLogWrite(\'B0\',\'06\',\'03\',\'00\',\''+window.parent.$thematicMapMain.themaInfo.title+'\',\'\')"; href="javascript:$thematicMapFrame13.ui.changeDataMode()" class="last" id="heatMapGrid">열지도</a>');
									  $('#map_type a:eq(1)').attr('class', '');
									  
									  $("#map_type").eq(0).find("a").removeClass("on");
									  $("#map_type a").eq(2).addClass("on");
									  $("#dataMode").val("pieChart");
									  $("#pieChartFlag").val("on");
									
									  $("#autoRegion").attr('class', 'first last on');
									  $("#sido").hide();
									  $("#sigungu").hide();
									  $("#eupmyundong").hide();
								  }
								  
								  // 네트워크 데이터
								  if(that.netWorkDataIDFlag){
									  //ie 에서 오류때문에
//									  $("#region_boundary a").remove();
//									  $('#region_boundary').append('<a href="javascript:$thematicMapFrame13.Popup.show(); $thematicMapFrame13.ui.mapList[0].changeRegionBound()" class="first on" id="autoRegion">자동</a>');
//									  $('#region_boundary').append('<a href="javascript:$thematicMapFrame13.Popup.show(); $thematicMapFrame13.ui.mapList[0].changeRegionBound();" id="sido" style="width:90px;">시도별 전국지도</a>');
//									  $('#region_boundary').append('<a href="javascript:$thematicMapFrame13.Popup.show(); $thematicMapFrame13.ui.mapList[0].changeRegionBound();" id="sigungu" style="width:100px;">시군구별 전국지도</a>');
//									  $('#region_boundary').append('<a href="javascript:$thematicMapFrame13.Popup.show(); $thematicMapFrame13.ui.mapList[0].changeRegionBound();" id="eupmyundong" class="last" style="width:100px;">읍면동별 전국지도</a>');
									  
									  $('#map_type').append('<a href="javascript:srvLogWrite(\'B0\',\'10\',\'02\',\'00\',\''+window.parent.$thematicMapMain.themaInfo.title+'\',\'\');$thematicMapFrame13.Popup.show(); $thematicMapFrame13.ui.mapList[0].changeRegionBound();" class="last" id="networkData" style="width:100px;">네트워크 데이터</a>');
									  $("#bubble").hide();
									  
									  $("#select_dataType").hide();
									  $("#region_boundary").hide();
									  $("#data_type").hide();
									  
									  $("#dataMode").val("networkData");
									  $("#map_type").insertAfter("#stat_sel");
									  $("#stat_sel").insertAfter("#map_type");
									  $("#map_type span").text("통계유형");
									  $("#color").removeClass("on");
									  $("#networkData").addClass("on");
									  
								  }
								  
								  //mng_s 20171212 주용민
								  //도서관 분포현황에 POI추가
								  if(window.parent.$thematicMapMain.param.stat_thema_map_id == "yFwtuGMFxt20160629174353420HvLDEFvqyu"){
									  $('#region_boundary').append('<a href="javascript:srvLogWrite(\'B0\',\'07\',\'01\',\'00\',\''+window.parent.$thematicMapMain.themaInfo.title+'\',\'\');$thematicMapFrame13.ui.mapList[0].changeRegionBound()" id="library" class="last" style="width:70px;">POI</a>');
									  $("#sido").attr('class', '');
								  }
								  //mng_e 20171212 주용민
								  
								  that.thema_legend_type = res.result.getThemaStatsInfo[0].exmpl_type;
								  if(that.thema_legend_type == '3') {
									  that.getLegendValues($thematicMapFrame13.params);
								  } else {
									  $('#themaInit_'+that.legend.id).trigger("click");
								  }
								  
								  // mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
//								  $(".thematicBotText").append(that.left_sep_source);
								  $(".thematicBotText").html("출처 : " + that.left_sep_source);
								  // mng_e 2020. 12. 01 j.h.Seok 통계주제도 통합
								  
								  //
								  if (callback != undefined && callback != null && callback instanceof Function) {
									  callback.call(undefined, res);
								  }
							  } 
						  } ,
						  dataType: "json",
						  error:function(e){}  
					});						
				};
				/** 통계 주제 데이터 조회 끝 **/

				this.maxZoomType = function(){
				  if(that.max_expnsn_level=="01"){
					  that.gMap.setMaxZoom(3);
				  }else if(that.max_expnsn_level=="02"){
					  that.gMap.setMaxZoom(5);
				  }else if(that.max_expnsn_level=="03"){
					  if(that.poi_disp_yn) {
						  // mng_s 20211215 김건민 위성지도 일떄 읍면동까지 내려가게 수정함.
						  if(that.mapMode == "settlite"){
						     that.gMap.setMaxZoom(14);	
						  }else{
							 that.gMap.setMaxZoom(11);	
						  } 
					  } else {
						  if(that.mapMode == "settlite"){
						     that.gMap.setMaxZoom(14);	
						  }else{
							 that.gMap.setMaxZoom(8);	
						  }
						  // mng_s 20211215 김건민
					  }
				  }else if(that.max_expnsn_level=="04"){
					  that.gMap.setMaxZoom(11);
				  }
				}				  
				
				 /** 통계 주제 기준년도 데이터 목록 조회 **/
					/**
					 * 
					 * @name         : getThemaMapBaseYear
					 * @description  : 통계 기준년도 데이터 목록을 가져온다.
					 * @date         : 2015. 11. 12. 
					 * @author	     : 정수영
					 * @history 	 :
					 */
					
					 this.getThemaMapBaseYear = function getThemaMapBaseYear(param){
						var thema_map_data_id = param;
											
						$.ajax({
							  type: "GET",
							  url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapBaseYear.json",
							  async : false,
							  data : {
								  thema_map_data_id : thema_map_data_id
							  },
							  success: function(res) {
								  if (res.errCd == "0") {
									  var list = new Array(); 
										for(var i=0;i<res.result.detailInfo.length;i++){
											//djlee 2019-04-24 수정
//											list[i] = res.result.detailInfo[i].base_year;
											if(res.result.detailInfo[i].base_year != '9016'){
												list.push(res.result.detailInfo[i].base_year);
											}
										}
										
										that.base_year_list = list;
										//base_year초기값이 없으면 list[0]의 값을 넣는다.
//										if(that.base_year == ""){
//											that.base_year = list[0];
//										}
										// 주제도 설정 - 년도선택 리스트 태그를 붙인다.
										var output = "";
										output = '<span>년도선택</span>';
										output += '<select id="select_base_year" onchange="javascript:$thematicMapFrame13.Popup.show();$thematicMapFrame13.ui.mapList[0].changeRegionBound()">';
										
										for(var i=0;i<list.length-1;i++){
											output += '<option>';
											output += list[i];
											output += '</option>';
										}
										output += '<option selected="true">'+list[list.length-1]+'</option>'
										output += '</select>';
										$("#base_year").html(output);
								  }
							  } ,
							  dataType: "json",
							  error:function(e){}  
						});						
					};
					/** 통계 세부 데이터 조회 끝 **/	
				 
					/** 통계 주제 세부 데이터 조회 **/
					/**
					 * 
					 * @name         : getThemaMapData
					 * @description  : 통계 주제 데이터를 가져온다.
					 * @date         : 2015. 11. 12. 
					 * @author	     : 정수영
					 * @history 	 :
					 */
					
					 this.getThemaMapData = function getThemaMapData(param, adm_cd, zoomLevel){//2019-04-19 박길섭
						 console.log("getThemaMapData start ");
						var that = this;
						var thema_map_data_id = param;
						var area_type = $("#selectValue2").val();					
						var selectYear = $("#select_base_year").val();
						var select_dataType = $("#select_dataType option:selected").val();
						var area = "area";
						//area_type : 지역구분, bnd_year : 기준년도, selectedRegion : 지역경계

						select_dataType = select_dataType.replace("분","")
						
						if(select_dataType != "" && that.netWorkDataIDFlag){
							if($("#dataMode").val() != "networkData"){
								thema_map_data_id = thema_map_data_id + "_" + select_dataType;
							}
							else 
								thema_map_data_id = thema_map_data_id + "_normal";
							
							if($("#dataMode").val() == "networkData"){
								var mapBounds = that.gMap.getBounds();
								area = 'RECTANGLE(';
								area += mapBounds._southWest.x + ' ' + mapBounds._southWest.y + ',';
								area += mapBounds._northEast.x + ' ' + mapBounds._northEast.y;
								area += ')';
								
								area_type = "auto";
							}
						}
						$.ajax({
							type: "GET",
							url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapData.json",							  
							data : {
								thema_map_data_id : thema_map_data_id,
								area_type : area_type,
								adm_cd : adm_cd,
								stat_data_base_year : that.thema_stat_data_base_year,
								bnd_year : that.bnd_year,
								area : area
							},
							success: function(res) {
								if (res.errCd == "0") {
									//통계 주제도 데이터 가져오기 전에 레이어를 지운다.
									that.gMap.eachLayer(function(layer){
										if (layer.feature) {
											if(!$("#library").hasClass("on"))
												layer.remove(); 
										}
									});
									
									//? 00이면 시도데이터
									if(adm_cd=="00"){
										res["pAdmCd"] = "00";
									}else{
										res["pAdmCd"] = adm_cd;
									}
									//모든 년도가 있는 데이터
									var result = res.result.detailInfo;
									that.dataBoardData = res.result.detailInfo;
									
									//소수점 한자리까지 표현
									// 2017. 03. 16 j.h.Seok
									for (var i=0; i<result.length; i++) {
										if (result[i].left_data_val) {
											result[i].left_data_val = parseFloat(result[i].left_data_val).toFixed(2);
										}
										if (result[i].right_data_val) {
											result[i].right_data_val = parseFloat(result[i].right_data_val).toFixed(2);
										}
									}
									
									// 선택된 기준년도와 같은 자료만 result1에 집어넣는다. 
									// 임의로 2000년도로 할꺼다. 하기 소스는 지울 예정
									var result1 = new Array();
									var k=0;
									for(var i = 0; i < result.length; i++){
										if(result[i].base_year == that.thema_stat_data_base_year){
											result1[k] = result[i];
											k++;
										}
									}
									
									res.result = result1;
									
									//통계선택에서 증감률(left)를 선택이 되어있으면
									if($("#selectValue").val() == "leftValue"){
										
										// 테마주제 정보에서 툴팁타이틀을 각 data에 넣는다.
										for(var i=0;i<res.result.length;i++){
											if($("#dataMode").val() != "networkData"){
												res.result[i].left_sep_ttip_title = that.left_sep_ttip_title;
												res.result[i].left_sep_chart_title = that.left_sep_chart_title;									  
											} else {
												if(window.parent.$thematicMapMain.param.stat_thema_map_id == "2qAx0jvYOk20180802165500441EHhhaQZQaK"){
													res.result[i].left_sep_ttip_title = "응급의료시설 접근 시간별 인구 수";
													res.result[i].left_sep_chart_title = "응급의료시설 접근 시간별 인구 수";
												}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "OuQf1ZhcWo20190822091422257GkbDsfsZHi"){
													res.result[i].left_sep_ttip_title = "경찰관서 접근 시간별 인구 수";
													res.result[i].left_sep_chart_title = "경찰관서 접근 시간별 인구 수";
												} else {
													res.result[i].left_sep_ttip_title = "소방시설 접근 시간별 인구 수";
													res.result[i].left_sep_chart_title = "소방시설 접근 시간별 인구 수";
												}
											}
										}
										that.setStatsData("normal", res, "left_data_val", that.left_sep_unit);	
										
									}else{
										// CAGR 데이터인 경우
										for(var i=0;i<res.result.length;i++){
											if($("#dataMode").val() != "networkData"){
												res.result[i].right_sep_ttip_title = that.right_sep_ttip_title;
												res.result[i].right_sep_chart_title = that.right_sep_chart_title;
											}else {
												if(window.parent.$thematicMapMain.param.stat_thema_map_id == "2qAx0jvYOk20180802165500441EHhhaQZQaK"){
													res.result[i].right_sep_ttip_title = "응급의료시설 접근 시간별 인구 비율";
													res.result[i].right_sep_chart_title = "응급의료시설 접근 시간별 인구 비율";
												}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "OuQf1ZhcWo20190822091422257GkbDsfsZHi"){
													res.result[i].right_sep_ttip_title = "경찰관서 접근 시간별 인구 수";
													res.result[i].right_sep_chart_title = "경찰관서 접근 시간별 인구 수";
												} else {
													res.result[i].right_sep_ttip_title = "소방시설 접근 시간별 인구 비율";
													res.result[i].right_sep_chart_title = "소방시설 접근 시간별 인구 비율";
												}
											}
										}								  
										that.setStatsData("normal", res, "right_data_val", that.right_sep_unit);	
									}
									
									//주제도 설정 - 지역경계에서 자동 - 경계데이터 가져옴.
									//            - 시도,시군구,읍면동으로 설정되어 있으면 경계데이터를 밖에서 가져옴.
									var region = $("#selectValue2").val();
									$thematicMapFrame13.ui.dataGeoJson = [];
									console.log("region = " + region);
									console.log("adm_cd = [" + adm_cd + "]" );
									$("#themaNoticeText").hide();
									that.maxZoomType();
									  if(window.parent.$thematicMapMain.param.stat_thema_map_id == "xz4MtuyvFJ20160121115806995JysKLvtonK"){
										  $("#sigungu").attr('class', '');
									  }
									if(region == "auto"){
										//데이터에 adm_cd의 경우 공백이 뒤에 붙는경우도 봤음 나중에 버그있을시 확인
										if(adm_cd=="00"){
											that.openApiBoundarySido(that.bnd_year, function(geojson) {
												
												// mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
//												if(window.parent.$thematicMapMain.param.stat_thema_map_id == "2qAx0jvYOk20180802165500441EHhhaQZQaK" || window.parent.$thematicMapMain.param.stat_thema_map_id == "3SnEYaTafC20181127142830568kSyMYbSg3S" || window.parent.$thematicMapMain.param.stat_thema_map_id == "OuQf1ZhcWo20190822091422257GkbDsfsZHi" || window.parent.$thematicMapMain.param.stat_thema_map_id == "mtjKxt2Zkb20171109101132537k7SYSI50kn"){
												if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sFKoutEowH20201208140301610JputqDxrrK" || window.parent.$thematicMapMain.param.stat_thema_map_id == "2qAx0jvYOk20180802165500441EHhhaQZQaK" || window.parent.$thematicMapMain.param.stat_thema_map_id == "3SnEYaTafC20181127142830568kSyMYbSg3S" || window.parent.$thematicMapMain.param.stat_thema_map_id == "OuQf1ZhcWo20190822091422257GkbDsfsZHi" || window.parent.$thematicMapMain.param.stat_thema_map_id == "mtjKxt2Zkb20171109101132537k7SYSI50kn"){
												// mng_e 2020. 12. 01 j.h.Seok 통계주제도 통합
													
													if(!($("#networkData,#pieChart,#heatMapGrid").hasClass("on"))){
														thematicCharts(adm_cd);
													}
												}else{
													thematicCharts(adm_cd);
												}
											});
										}else{
											//djlee
											that.openApiBoundaryHadmarea(adm_cd,that.bnd_year,  "1", zoomLevel);//2019-04-19 박길섭
										}
									}else{
										//자동이 아니면 getRegionData에서 경계자료를 받는다.
										that.getRegionData();
									} 
									
									//API 로그
									var logOptions = {
											type : "C0",
											theme : parent.$thematicMapMain.param.theme,
											params : {
												title : parent.$thematicMapMain.themaInfo.title + "^" + parent.$thematicMapMain.themaInfo.stat_thema_map_id,
												param : parent.$thematicMapMain.param,
												map : that.gMap
											}
									}
									//API로그 쌓기 (행정동코드로 지역 조회)
									if(parent.$thematicMapMain.themaInfo.corp_class_cd == "99999"){
										addrCdToNm(parent.$thematicMapMain.themaInfo.base_year, adm_cd, logOptions);
									}else if(parent.$thematicMapMain.themaInfo.corp_class_cd == "999999"){
										addrCdToNm(parent.$thematicMapMain.themaInfo.base_year, adm_cd, logOptions);
									}else if(parent.$thematicMapMain.themaInfo.corp_class_cd == "99998"){
										addrCdToNm(parent.$thematicMapMain.themaInfo.base_year, adm_cd, logOptions);
									}else{
										addrCdToNm(parent.$thematicMapMain.themaInfo.stat_data_base_year, adm_cd, logOptions);
									}
									
								}
							} ,
							dataType: "json",
							error:function(e){}  
						});						
						
						// area_type이 auto면 지역상관없이 모두 가져온다.
					};
					/** 통계 세부 데이터 조회 끝 **/
					 
					 /**
						 * 
						 * @name         : changeRegionBound
						 * @description  : 주제도 설정 - 지역경계를 설정한다, 연도를 변경한다.
						 * @date         : 2015. 11. 16. 
						 * @author	     : 
						 * @history 	 :
						 */
						this.changeRegionBound = function(){
							$(".sop-overlay-pane>svg>g").show();//20년수정반영
							//mng_s 20171212 주용민
							$thematicMapFrame13.ui.removeLibraryMarker();
							
							if($("#selectValue2").val()!="4" && $("#selectValue2").val()!="5"){
								if(that.max_expnsn_level=="01"){
									that.gMap.setMaxZoom(3);
								}else if(that.max_expnsn_level=="02"){
									that.gMap.setMaxZoom(5);
								}else if(that.max_expnsn_level=="03"){
									if(that.poi_disp_yn) {
										that.gMap.setMaxZoom(11);
									} else {
										that.gMap.setMaxZoom(8);
									}
								}else if(that.max_expnsn_level=="04"){
									that.gMap.setMaxZoom(11);
								}
							}
							//mng_e 20171212 주용민
							var map1 = $thematicMapFrame13.ui.mapList[0];
							//선택된 년도
							var selectYear = $("#select_base_year >option:selected").text();
							if(!that.netWorkDataIDFlag)
							if (that.dataGeojson) {
								that.dataGeojson.remove();
								that.dataGeojson = null;
							}
							
							if (that.multiLayerControl.dataGeojson != null && that.multiLayerControl.dataGeojson.length > 0) {
								for (var i=0; i<that.multiLayerControl.dataGeojson.length; i++) {
									that.multiLayerControl.dataGeojson[i].remove();
								}
								that.multiLayerControl.dataGeojson = null;
							}
							
							//경계 데이터를 지운다.
							that.regionData = null;
							
							that.markers.clearLayers();
							that.poiAdmCd = "";
							$thematicMapFrame13.ui.poiInfoArray = [];
							
							//문화재 이미지레이어 삭제
							that.gMap.removeLayer(that.imageLayer0); 
							that.gMap.removeLayer(that.imageLayer1);
							
							if(that.netWorkDataIDFlag){
								if($("#dataMode").val() == "color")
									$("#select_dataType").show();
							} else {
								$("#map_type").show();
								$("#data_type").show();
								$("#heritage_type").hide();
							}
								
							if($("#selectValue2").val()=="auto"){
								// 20210915 김건민
								$(".thematicCharts").show();
								$("#graph_help_text").hide();
								if(!$(".interactiveDataBoard").hasClass("on")){
									$(".interactiveDataBoard").click();
								}
								// 20210915 김건민
								that.isReloadMode = true;
								that.openApiReverseGeoCode(that.center, that.bnd_year);
								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "2qAx0jvYOk20180802165500441EHhhaQZQaK" || window.parent.$thematicMapMain.param.stat_thema_map_id == "3SnEYaTafC20181127142830568kSyMYbSg3S" || window.parent.$thematicMapMain.param.stat_thema_map_id == "OuQf1ZhcWo20190822091422257GkbDsfsZHi"){
									if(!($("#networkData").hasClass("on"))){
										$("#dataBoard").show();
										$(".sop-right").stop().animate({"right":"405px"},200);
									}else{
										$("#dataBoard").hide();
										$(".sop-right").stop().animate({"right":"0px"},200);
									}
								}else{
									$("#dataBoard").show();
								}
							}else if($("#selectValue2").val()=="1"){
								// 20210915 김건민
								$(".thematicCharts").hide();
								$(".dscListl").hide();
								$("#graph_help_text").show();
								$(".interactiveDataBoard").addClass("on");
								$(".interactiveDataBoard").click();
								// 20210915 김건민
								//로딩이미지를 띄운다.
								$('#themaInit_'+that.legend.id).trigger("click");
								//$('#goganEvent_'+that.legend.id).trigger("click");
								that.getThemaMapData(that.thema_map_data_id,"00");
								that.openApiReverseGeoCode(that.center,that.bnd_year);
								//시도 통계데이터 가져오기.								
							}else if($("#selectValue2").val()=="2"){
								// 20210915 김건민
								$(".thematicCharts").hide();
								$(".dscListl").hide();
								$("#graph_help_text").show();
								$(".interactiveDataBoard").addClass("on");
								$(".interactiveDataBoard").click();
								// 20210915 김건민
								//로딩이미지를 띄운다.
								$('#themaInit_'+that.legend.id).trigger("click");
								//$('#goganEvent_'+that.legend.id).trigger("click");
								that.getThemaMapData(that.thema_map_data_id,that.curSidoCd);	
								that.openApiReverseGeoCode(that.center,that.bnd_year);
							}else if($("#selectValue2").val()=="3"){
								// 20210915 김건민
								$(".thematicCharts").hide();
								$(".dscListl").hide();
								$("#graph_help_text").show();
								$(".interactiveDataBoard").addClass("on");
								$(".interactiveDataBoard").click();
								// 20210915 김건민
								//로딩이미지를 띄운다.
								$('#themaInit_'+that.legend.id).trigger("click");
								//$('#goganEvent_'+that.legend.id).trigger("click");
								that.getThemaMapData(that.thema_map_data_id,that.curSidoCd + that.curSiggCd);
								that.openApiReverseGeoCode(that.center,that.bnd_year);
							// mng_s 2017. 12. 13 kdb
							}else if($("#selectValue2").val()=="4"){
								//문화재 현황에 등록문화재 추가
								if($("#heritage").hasClass("on")){
									$("#dataBoard").hide();
									$(".sop-right").stop().animate({"right":"0px"},200);
								}
								that.gMap.setMaxZoom(13);
								if(that.gMap.getZoom() < 4)
									that.gMap.setZoom(4);
								$('#themaInit_'+that.legend.id).trigger("click");
								$("#map_type").hide();
								$("#data_type").hide();
								$("#heritage_type").show();
								that.heritage();
							// mng_e 2017. 12. 13 kdb
							//mng_s 20171212 주용민 
							}else if($("#selectValue2").val()=="5"){
								if($("#library").hasClass("on")){
									$("#dataBoard").hide();
									$(".sop-right").stop().animate({"right":"0px"},200);
									that.gMap.setMaxZoom(13);
									//로딩이미지를 띄운다.
									$('#themaInit_'+that.legend.id).trigger("click");
									that.getThemaMapData(that.thema_map_data_id,that.curSidoCd + that.curSiggCd);
									that.openApiReverseGeoCode(that.center,that.bnd_year);
									$.ajax({
										type: "GET",
										url: contextPath + "/ServiceAPI/thematicMap/getThemaLibrary.json",
										async : false,
										success: function(res) {
											$thematicMapFrame13.ui.removeLibraryMarker();
											$thematicMapFrame13.ui.addLibraryMarker(res.result.libraryList);
										},
										dataType: "json",
										error:function(e){}
									});
								}
							//mng_e 20171212 주용민 
							}else if($("#selectValue2").val()=="6"){
								//로딩이미지를 띄운다.
//								$('#themaInit_'+that.legend.id).trigger("click");
//								that.getThemaMapData(that.thema_map_data_id,"00");
//								that.openApiReverseGeoCode(that.center,that.bnd_year);
								
								
								that.isReloadMode = true;
								that.openApiReverseGeoCode(that.center, that.bnd_year);
								
							}

						};						
						
				 
						 /**
						 * 
						 * @name         : getRegionData
						 * @description  : 경계데이터를 가져온다.
						 * @date         : 2015. 11. 17. 
						 * @author	     : 
						 * @history 	 :
						 */
						
						this.getRegionData = function(){
							var region = $("#selectValue2").val();
							var count = "";								
							var startSeq = 0;
							var endSeq = 0;
							
					/*
							// 경계데이터가 불러오지 않았을 경우 DB에서 가져온다.
//							if(that.regionData == null){
								// DB에서 Count를 가져온다.								
								$.ajax({
									  type: "GET",
									  url: contextPath + "/ServiceAPI/thematicMap/GetRegionDataCount.json",
									  async : false,
									  data : {
										  base_year : that.left_base_year,
										  region : region									 										  
									  },
									  success: function(res) {
										  if (res.errCd == "0") {
											  count = res.result;
										  } 
									  },									 
									  dataType: "json",
									  error:function(e){}  
								});
								
								// 자료 10번 불러오는 로직
								if(region!="1"){
									var dividedNum = Math.ceil(count/10);
									for(that.i=1;that.i<11;that.i++){
										startSeq=endSeq+1; // 1
										if(that.i==10){
											endSeq=count;	
										}else{
											endSeq=startSeq+dividedNum-1; //8
										}
										$.ajax({
											  type: "GET",
											  url: contextPath + "/ServiceAPI/thematicMap/GetRegionData.geojson",
											  async : false,
											  data : {
												  base_year : that.left_base_year,
												  region : region,
												  startSeq : startSeq,
												  endSeq : endSeq,
												  atdrc_yn : that.thema_atdrc_yn
											  },
											  success: function(res) {
												  if (res.errCd == "0") {
													  if(region=="1"){
														  res["pAdmCd"] = "00";
													  }else if(region=="2"){
														  res["pAdmCd"] = that.curSidoCd;
													  }else if(region=="3"){
														  res["pAdmCd"] = that.curSidoCd + that.curSiggCd;
													  }
													  //regionData에 현재 경계데이터를 넣어준다.
													  // 통계선택 및 지도유형이 바뀔때 경계데이타를 재사용해야한다.
													
													  that.legend.numberData = false;
													  that.setPolygonDataGeojson(res, "multi", that.i);
												  }
											  },								  
											  dataType: "json",
											  error:function(e){}  
										});	
									}
								}else{
									$.ajax({
										  type: "GET",
										  url: contextPath + "/ServiceAPI/thematicMap/GetRegionData.geojson",
										  async : false,
										  data : {
											  base_year : that.left_base_year,
											  region : region											 
										  },
										  success: function(res) {
											  if (res.errCd == "0") {
												  if(region=="1"){
													  res["pAdmCd"] = "00";
												  }else if(region=="2"){
													  res["pAdmCd"] = that.curSidoCd;
												  }else if(region=="3"){
													  res["pAdmCd"] = that.curSidoCd + that.curSiggCd;
												  }
												  //that.regionData = res;
												  that.setPolygonDataGeojson(res);					
											  }						 
										  },								  
										  dataType: "json",
										  error:function(e){}  
									});	
								}*/
								
							switch(parseInt(region)) {
								//전국시도
								case 1:
									console.log("1122 = "  +contextPath);
									$.ajax({
										type: "GET",
										url: contextPath + "/ServiceAPI/thematicMap/GetRegionData.geojson",
										async : false,
										data : {
											base_year : that.left_base_year,
											region : region											 
										},
										success: function(res) {
											if (res.errCd == "0") {
												if(region=="1"){
													res["pAdmCd"] = "00";
												}else if(region=="2"){
													res["pAdmCd"] = that.curSidoCd;
												}else if(region=="3"){
													res["pAdmCd"] = that.curSidoCd + that.curSiggCd;
												}
												//that.regionData = res;
												that.setPolygonDataGeojson(res);			 
											} 								 
										},								  
										dataType: "json",
										error:function(e){}  
									});	
									break;
								//전국시군구	
								case 2:
									// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
									if(that.topBottomState == "ON") {
										that.topBottomLayers = [];
									}
									// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
									that.gMap.setMaxZoom(3);
									that.gMap.setMinZoom(0);
									that.openApiBoundaryHadmarea2("11", that.left_base_year,  "999", "0", that.thema_atdrc_yn, that.bounds);
									$("#themaNoticeText").show();
//									$.ajax({
//										type: "GET",
//										url: contextPath + "/ServiceAPI/thematicMap/GetRegionDataCount.json",
//										async : false,
//										data : {
//											base_year : that.left_base_year,
//											region : region									 										  
//										},
//										success: function(res) {
//											if (res.errCd == "0") {
//												count = res.result; 
//												var dividedNum = Math.ceil(count/10);
//												for(that.i=1;that.i<11;that.i++){
//													startSeq=endSeq+1; // 1
//													if(that.i==10){
//														endSeq=count;	
//													}else{
//														endSeq=startSeq+dividedNum-1; //8
//													}
//	
//													$.ajax({
//														type: "GET",
//														url: contextPath + "/ServiceAPI/thematicMap/GetRegionData.geojson",
//														async : false,
//														data : {
//															base_year : that.left_base_year,
//															region : region,
//															startSeq : startSeq,
//															endSeq : endSeq,
//															atdrc_yn : that.thema_atdrc_yn
//														},
//														success: function(res) {
//															if (res.errCd == "0") {
//																if(region=="1"){
//																	res["pAdmCd"] = "00";
//																}else if(region=="2"){
//																	res["pAdmCd"] = that.curSidoCd;
//																}else if(region=="3"){
//																	res["pAdmCd"] = that.curSidoCd + that.curSiggCd;
//																}
//																//regionData에 현재 경계데이터를 넣어준다.
//																// 통계선택 및 지도유형이 바뀔때 경계데이타를 재사용해야한다.
//	
//																that.legend.numberData = false;
//																that.setPolygonDataGeojson(res, "multi", that.i);
//															}
//														},								  
//														dataType: "json",
//														error:function(e){}  
//													});	
//												}
//											}
//										},									 
//										dataType: "json",
//										error:function(e){}  
//									});
									
									// mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
									// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
//									if(that.topBottomState == "ON") {
//										that.showTopBottomDataOnly("ON", true);
//									}
									// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
									// mng_e 2020. 12. 01 j.h.Seok 통계주제도 통합
									
									break;
								//전국읍면동
								case 3:
									var sidoList = [];
									$.ajax({
										type: "GET",
										url: contextPath + "/ServiceAPI/thematicMap/GetSidoCodeList.json",
										async : true,
										success: function(res) {
											if (res.errCd == "0") {
												sidoList = res.result.sidoCodeList;
												var tmpData = deepCopy(that.data[0].result);
												var tmpData2 = [];
												for (var i=0; i<sidoList.length; i++) {
													that.tmpSidoData[sidoList[i].sido_cd] = [];
													if (tmpData2.length > 0) {
														that.data[0].result = tmpData2;
														tmpData2 = [];
													}
													for (var j=0; j<that.data[0].result.length; j++) {
														if (sidoList[i].sido_cd == that.data[0].result[j].sido_cd) {
															that.tmpSidoData[sidoList[i].sido_cd].push(that.data[0].result[j]);
														}else {
															tmpData2.push(that.data[0].result[j]);
														} 
													}                                                                                                                                                                                                                                                           
												}
												that.data[0].result = tmpData;
												that.setLegendForStatsData();
												that.reqEmgReigon(region, sidoList, 0);
											}
										},									 
										dataType: "json",
										error:function(e){}  
									});
									break;
								}

								// 자료를 다 불러와서 세팅했으면 that.i을 1로 초기화다.
								if (that.i == 10){
									that.i = 1;
								}
						};
						
						this.reqEmgReigon = function (type, data, index) {
							var sidoCd = data[index].sido_cd;
							$.ajax({
								type: "GET",
								//url: contextPath + "/js/data/geo_emdong_2014/geo_emd_"+sidoCd+"_2014.js",
								//url: contextPath + "/ServiceAPI/thematicMap/GetRegionData.geojson",
								url: contextPath + "/js/data/geo_emdong_" + that.bnd_year + "/geo_emd_"+sidoCd+"_" + that.bnd_year + ".js",
								async : false,
								data : {
									base_year : that.left_base_year,
									region : type,
									sido_cd : data[index].sido_cd,
									atdrc_yn : that.thema_atdrc_yn
								},
								success: function(res) {
									//if (res.errCd == "0") {
										res["pAdmCd"] = sidoCd;
										
										//regionData에 현재 경계데이터를 넣어준다.
										// 통계선택 및 지도유형이 바뀔때 경계데이타를 재사용해야한다.
										that.legend.numberData = false;
										that.data[0].pAdmCd = sidoCd;
										that.data[0].result = that.tmpSidoData[data[index].sido_cd];
										that.setPolygonDataGeojson(res, "multi", index);
										index++;
										if (index < data.length) {
											setTimeout(function() {
												that.reqEmgReigon(type, data, index);
											}, 20);
											
										}
									//}
								},								  
								dataType: "json",
								error:function(e){}  
							});
						};
						
						this.getNetworkData = function(){
							$("#data_type").hide();
							var weight = "";
							var region = that.curPolygonCode;
							switch (region) {
								case 3:
									region = 2; break;
								case 4:
								case 5:
									region = 3; break;
								default:
									region = 1; break;
							}
							
							var mapBounds = that.gMap.getBounds();
							var area = 'RECTANGLE(';
							if(that.zoom <= 8){
								area += mapBounds._southWest.x + ' ' + mapBounds._southWest.y + ',';
								area += mapBounds._northEast.x + ' ' + mapBounds._northEast.y;
								area += ')';
							} else {
								var x = (mapBounds._northEast.x - mapBounds._southWest.x) / 2;
								var y = (mapBounds._northEast.y - mapBounds._southWest.y) / 2;
								area += (mapBounds._southWest.x - x) + ' ' + (mapBounds._southWest.y - y) + ',';
								area += (mapBounds._northEast.x + x) + ' ' + (mapBounds._northEast.y + y);
								area += ')';
								
								that.oldArea[0] = mapBounds._southWest.x - x;
								that.oldArea[1] = mapBounds._northEast.x + x;
								that.oldArea[2] = mapBounds._southWest.y - y;
								that.oldArea[3] = mapBounds._northEast.y + y;
							}
							
							
							
							if(that.zoom >= 4){
								if(that.zoom == 4){
									
								}else{
									that.getNetworkPTData(area);
								}
							}else
								that.markers.clearLayers();
							
							console.log("zoom : " + that.gMap.getZoom());
							
							//0~5 : point, 6~8 : bend, 9 : heavy
							if (that.zoom <= 5)
								weight = "point";
							else if (that.zoom <= 8)
								weight = "bend";
							else
								weight = "heavy";
							
//							if($("#selectValue2").val() != "auto"){
//								area = "RECTANGLE(144538 1325373,2110618 2143549)";
//							}
							
							$.ajax({
								type: "GET",
								url: contextPath + "/ServiceAPI/thematicMap/getNetworkData.geojson",
								async : false,
								data : {
									stat_data_base_year : that.thema_stat_data_base_year
									,base_year : that.bnd_year
									,region : region
									,stat_thema_map_id : that.thema_map_data_id
									,weight : weight
									,area : area
								},
								success: function(res) {
									if (res.errCd == "0") {
										$thematicMapFrame13.Popup.close();
										that.gMap.setMaxZoom(10);
										
										that.networkDatajson = sop.geoJson(res, {
											style : {
												color : "", 
												fillColor : "#F0FFF0",
												weight : 0.75,
												fillOpacity : 0.7,
												dashArray :  ''
											},
											type : 'data', // 일반경계인지, 데이터경계인지 구분
											layerCode : that.curPolygonCode,
										});
										
										// 네트워크 데이터 컬러
										var color = ["#ffa07b", "#ff407b", "#ff0000"]
										var fill = ["0.5", "0.4", "0.3",]
										var i = 0;
										that.networkDatajson.eachLayer(function(layer, idx) {
											if(layer.feature.properties.data_type == 30){
												layer.options.fillColor = color[0];
												layer.options.fillOpacity = fill[0]
											} else if(layer.feature.properties.data_type == 10){
												layer.options.fillColor = color[1];
												layer.options.fillOpacity = fill[1]
											} if(layer.feature.properties.data_type == 5){
												layer.options.fillColor = color[2];
												layer.options.fillOpacity = fill[2]
											}
												
											
										});
										
										that.networkDatajson.addTo(that.gMap);
									}
									 								 
								},								  
								dataType: "json",
								error:function(e){}  
							});
						};
						
						this.getNetworkPTData = function(area){
							that.markers.clearLayers();
							
							var img = "/img/marker/marker/90_03.png";	// 의료
							if(window.parent.$thematicMapMain.param.stat_thema_map_id == "3SnEYaTafC20181127142830568kSyMYbSg3S")
								img = "/img/marker/marker/60_04.png";	// 소방
							if(window.parent.$thematicMapMain.param.stat_thema_map_id == "OuQf1ZhcWo20190822091422257GkbDsfsZHi")
								img = "/img/marker/marker/60_03.png";	// 경찰
							$.ajax({
								type: "GET",
								url: contextPath + "/ServiceAPI/thematicMap/getNetworkData.json",
								async : false,
								data : {
									area : area
									,data_type : 'pt'
									,base_year : that.thema_stat_data_base_year
									,stat_thema_map_id : that.thema_map_data_id
								},
								success: function(res) {
									var poiList = res.result;
									if (poiList.length > 0) {
										for ( var i = 0; i < poiList.length; i++) {
											var _markerIcon = sop.icon({
												iconUrl : img,
												shadowUrl : '/img/marker/theme_shadow.png',
												iconAnchor : [ 13, 40 ],
												iconSize : [ 25, 40 ],
												infoWindowAnchor: [1, -34]
											});
				
											var _marker = sop.marker([ poiList[i].x, poiList[i].y ], {
												icon : _markerIcon
											});
				
											_marker.info = poiList[i];
											_marker.addTo(that.markers);
				
											var tempList = {};
											tempList.name = poiList[i].name;
											tempList.telnum = poiList[i].telnum;
											tempList.addr = poiList[i].addr;
											tempList.type = poiList[i].type;
											$thematicMapFrame13.ui.poiInfoArray.push(tempList);
				
											var html = '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
											html += '<tr>';
											html += '<th style="text-align: left; word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + poiList[i].name + '</strong></th>';
											html += '<td >';
											html += '</td>';
											html += '</tr>';
											if(window.parent.$thematicMapMain.param.stat_thema_map_id == "OuQf1ZhcWo20190822091422257GkbDsfsZHi"){
											html += '<tr>';
											html += ' <th style="text-align: left; word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:12px;">&nbsp;' + poiList[i].addr + '</th>';
											html += '<td >';
											html += '</td>';
											html += '</tr>';
											}
											html += '</table>';
											_marker.bindInfoWindow(html);
										}
									} 
								},								  
								dataType: "json",
								error:function(e){}  
							});	
						};
						
						this.multiLayerControl = {
								multiData : null,
								dataGeojson : null
						}
						
						// mng_s 2017. 12. 13 kdb
						// 문화재 현황에 등록문화재 추가
						this.heritage = function(type){
							
							that.gMap.removeLayer(that.imageLayer0); that.gMap.removeLayer(that.imageLayer1);	//이미지레이어 삭제
							// 줌레벨 제한
							if(that.gMap.getZoom() < 4 )
								return false;
							
							var heritageApiList = ["TB_ODTR_MID", "TB_THFS_MID"];
							
							that.gMap.eachLayer(function(layer){
								if (layer.feature) {
									layer.remove(); 
								}
							});
							
							var imageBounds = that.gMap.getBounds();
							var imageUrl = "http://gis-heritage.go.kr/checkKey.do?key=hfRAJvveRqpdP8cx&domain=http://gis-heritage.go.kr/";
							imageUrl +="&format=image/png&version=1.3.0&transParent=true&displayOutsideMaxExtent=null";
							imageUrl += "&crs=EPSG:9020203&exceptions=INIMAGE&service=WMS&request=GetMap";
							imageUrl += "&LAYERS=" + heritageApiList[$("#heritageMode").val()];
							imageUrl += "&styles=default";
							imageUrl += "&bBox=" + imageBounds._southWest.x + ", " + imageBounds._southWest.y + ", " + imageBounds._northEast.x + ", " + imageBounds._northEast.y;
							imageUrl += "&width=" + $('#mapRgn_1').width() + "&height=" + $("#mapRgn_1").height();
							
							switch($("#heritageMode").val()){
								case "0" : that.imageLayer0 = new sop.imageOverlay(imageUrl, imageBounds); that.gMap.addLayer(that.imageLayer0); that.imageLayer0.bringToFront(); break;
								case "1" : that.imageLayer1 = new sop.imageOverlay(imageUrl, imageBounds); that.gMap.addLayer(that.imageLayer1); that.imageLayer1.bringToFront(); break;
							}
						}
						// mng_e 2017. 12. 13 kdb
				 
			},
				
		};								
	
	
	/** ********* OpenAPI 행정동경계 검색 Start ********* */
	(function () {
		$class("sop.openApi.hadmarea.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var that = options.target;
				if (res.errCd == "0") {
					options["geojson"] = res;
					that.lastGeojsonInfo = options;
					res["pAdmCd"] = options.adm_cd;
					options.target.setPolygonDataGeojson(res);
					
				}
				else if (res.errCd == "-401") {
					accessTokenInfo();
					setTimeout(that.openApiBoundaryHadmarea(options.adm_cd, options.year, options.low_search), 500);
				}
				else {
					//messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* OpenAPI 행정동경계 검색 End ********* */
	
	/** ********* OpenAPI 집계구경계 검색 Start ********* */
	(function () {
		$class("sop.openApi.statsarea.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var that = options.target;
				if (res.errCd == "0") {
					options["geojson"] = res;
					that.lastGeojsonInfo = options;
					res["pAdmCd"] = options.adm_cd;
					that.setPolygonDataGeojson(res);
				}
				else if (res.errCd == "-401") {
					accessTokenInfo();
					setTimeout(that.openApiBoundaryStatsarea(options.adm_cd, options.year), 500);
				}
				else {
					//messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* OpenAPI 집계구경계 검색 End ********* */
	
	/** ********* OpenAPI 리버스지오코딩 Start ********* */
	(function () {
		$class("sop.openApi.ReverseGeoCode.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {		
				var that = options.target;
	
				//처음 리버스지오코딩 할때
				if(that.thema_map_data_id == ""){
					console.log($thematicMapFrame13.params);
					
					// mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
					that.changeStatThemaId('left');
					//that.openInitStatData($thematicMapFrame13.params);
					// mng_e 2020. 12. 01 j.h.Seok 통계주제도 통합
					
					temp = true;
				}
//				
				if (res.errCd == "0") {
					var result = res.result[0];
					var curSidoCd = result.sido_cd;
					var curSiggCd = result.sgg_cd;
					var curDongCd = result.emdong_cd;
					
					if (that.isInnerMapShow){
						that.openApiBuildArea(that.bounds);				
						
					//지역경계가 "auto"일 경우 해당하는 getThemaMapData를 실행한다.
					} else if($("#selectValue2").val()=="auto"){
						
						switch (that.curPolygonCode) {
						
						// 전국
						case 1:
							that.markers.clearLayers();
							that.poiAdmCd = "";
							$thematicMapFrame13.ui.poiInfoArray = [];
							if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == null && that.lastGeojsonInfo.info == "sidoArea") {
								if (that.dataGeojson == null && $("#dataMode").val() != "pieChart") {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}
								else {
									console.log('aleady exist');
								}
							} else {
								that.openApiBoundaryContry();
							}
							break;
							
						//전국시도 
					    // 전국시도는 시도데이터를 가지고 있는 파일을 가져옴.
						case 2:
							if($("#dataMode").val() != "networkData")
								that.markers.clearLayers();
							that.poiAdmCd = "";
							$thematicMapFrame13.ui.poiInfoArray = [];
							
							if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == '00' && $("#dataMode").val() != "heatMapGrid" ) {
								if (that.dataGeojson == null && $("#dataMode").val() != "pieChart") {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}
								else {
									console.log('aleady exist');
									//mng_s 20190828
									if(  $("#dataMode").val() == "networkData"  ) {
										that.markers.clearLayers();
									}
								}
							} else {
								if (that.dataGeojson) {
									that.dataGeojson.remove();
								}
								// 보육업체 취약인구일때 파이차트 우선
								
								// mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
//								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "mtjKxt2Zkb20171109101132537k7SYSI50kn" && temp){
								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sFKoutEowH20201208140301610JputqDxrrK" && temp){
								// mng_e 2020. 12. 01 j.h.Seok 통계주제도 통합
									
									temp = false;
//									$("#map_type").eq(0).find("a").removeClass("on");
//									$("#map_type a").eq(2).addClass("on");
//									$("#dataMode").val("pieChart");
//									$("#pieChartFlag").val("on");
//									
//									$("#autoRegion").attr('class', 'first last on');
//									$("#sido").hide();
//									$("#sigungu").hide();
//									$("#eupmyundong").hide();
									
//									that.changeHeatMap();
									$thematicMapFrame13.ui.changeDataMode();
								} else if(that.netWorkDataIDFlag && temp){
									temp = false;
									$thematicMapFrame13.ui.changeDataMode();
									$("#data_type").hide();
								} else {
									that.getThemaMapData(that.thema_map_data_id, "00");
								}
							}
							
							break;
							
						// 시군구
						//2019-04-19 박길섭 시작	
						case 100:
							console.log("100 ========");
							console.log("val = " + $("#dataMode").val());
							console.log("isReloadMode = " + that.isReloadMode);
							console.log("lastGeojsonInfo = " + that.lastGeojsonInfo);
							console.log("that.lastGeojsonInfo.adm_cd = " + that.lastGeojsonInfo.adm_cd);
							console.log("curSidoCd = " + curSidoCd);
							if($("#dataMode").val() != "networkData")
								that.markers.clearLayers();
							that.poiAdmCd = "";
							$thematicMapFrame13.ui.poiInfoArray = [];
							//최근경계조회조건 하나를 가지고 있다가 비교하여 같으면 기존에 저장된 경계를 호출
							if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd && $("#dataMode").val() != "heatMapGrid" ) {
								console.log("if");
								if (that.dataGeojson == null && $("#dataMode").val() != "pieChart") {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}
								else {
									console.log('aleady exist');
								}
							} else {
								console.log("else");
								if (that.dataGeojson) {
									that.dataGeojson.remove();
								}
								console.log("that.thema_map_data_id = " + that.thema_map_data_id);
								console.log(curSidoCd);
								
								//mng_s 20190826 소방에서 줌레벨 4에서 경계를 불러오지 않아서 추가함
								//that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								
								
								
								//that.getThemaMapData(that.thema_map_data_id,curSidoCd , "100"); //원본
//								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "OuQf1ZhcWo20190822091422257GkbDsfsZHi"){
//									that.getThemaMapData(that.thema_map_data_id,curSidoCd);
//								}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "2qAx0jvYOk20180802165500441EHhhaQZQaK" || window.parent.$thematicMapMain.param.stat_thema_map_id == "3SnEYaTafC20181127142830568kSyMYbSg3S"){
//									that.getThemaMapData(that.thema_map_data_id, "00" , "2");
//									$thematicMapFrame13.Popup2.show();
//								}else{
//									that.getThemaMapData(that.thema_map_data_id,curSidoCd , "100"); //원본
//								}

								if($("#dataMode").val() == "networkData"){
									that.getThemaMapData(that.thema_map_data_id,curSidoCd);
								}else{
									that.getThemaMapData(that.thema_map_data_id,curSidoCd , "100");
									$thematicMapFrame13.Popup2.show();
								}
								
							}
							break;
							//2019-04-19 박길섭 끝							
						// 시군구
							
						case 3:
							console.log("3 ========");
							if($("#dataMode").val() != "networkData")
								that.markers.clearLayers();
							that.poiAdmCd = "";
							$thematicMapFrame13.ui.poiInfoArray = [];
							console.log("val = " + $("#dataMode").val());
							console.log("isReloadMode = " + that.isReloadMode);
							console.log("lastGeojsonInfo = " + that.lastGeojsonInfo);
							console.log("that.lastGeojsonInfo.adm_cd = " + that.lastGeojsonInfo.adm_cd);
							console.log("curSidoCd = " + curSidoCd);
							//최근경계조회조건 하나를 가지고 있다가 비교하여 같으면 기존에 저장된 경계를 호출
							if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd && $("#dataMode").val() != "heatMapGrid" ) {
								
								if (that.dataGeojson == null && $("#dataMode").val() != "pieChart") {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}
								else {
									console.log('aleady exist');
									that.getThemaMapData(that.thema_map_data_id,curSidoCd);//2019-04-22 박길섭
								}
							} else {
								console.log("else");
								if (that.dataGeojson) {
									that.dataGeojson.remove();
								}
								console.log("that.thema_map_data_id = " + that.thema_map_data_id);
								console.log(curSidoCd);
								that.getThemaMapData(that.thema_map_data_id,curSidoCd);
							}
							break;
//						
						// 동면읍
						case 4:
							if($("#dataMode").val() != "networkData")
								that.markers.clearLayers();
							that.poiAdmCd = "";
							$thematicMapFrame13.ui.poiInfoArray = [];
							if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd + curSiggCd && $("#dataMode").val() != "heatMapGrid" ) {
								if (that.dataGeojson == null && $("#dataMode").val() != "pieChart") {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}
								else {
									console.log('aleady exist');
								}
							} else {
								if (that.dataGeojson) {
									that.dataGeojson.remove();
								}
								that.getThemaMapData(that.thema_map_data_id, curSidoCd + curSiggCd);
							}
							break;
						
						// 집계구
						case 5:
							// mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
							if(that.thema_map_data_id == 'temp') {
								if (that.dataGeojson) {
									that.dataGeojson.remove();
								}
								that.AreaAndStatsApisForPOI(curSidoCd + curSiggCd + curDongCd, '0');
								return;
							}
							// mng_e 2020. 12. 01 j.h.Seok 통계주제도 통합
							
							if(that.netWorkDataIDFlag && $("#dataMode").val() == "networkData" && !that.isReloadMode){	// 응급의료
								var mapBounds = that.gMap.getBounds();
								
								if(that.oldArea.length > 0){
									if(that.oldArea[0] > mapBounds._southWest.x ||
											that.oldArea[1] < mapBounds._northEast.x ||
												that.oldArea[2] > mapBounds._southWest.y ||
													that.oldArea[3] < mapBounds._northEast.y )
										that.getThemaMapData(that.thema_map_data_id, curSidoCd + curSiggCd);
								} else 
									that.getThemaMapData(that.thema_map_data_id, curSidoCd + curSiggCd);
								
							} else if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd + curSiggCd && that.poi_disp_yn) {
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								} else {
									console.log('aleady exist');
								}
								that.AreaAndStatsApis(curSidoCd + curSiggCd + curDongCd, '0');
							} else {
								if (that.dataGeojson) {
									that.dataGeojson.remove();
								}
								
								if(that.poi_disp_yn) {
									that.getThemaMapData(that.thema_map_data_id, curSidoCd + curSiggCd);
									that.AreaAndStatsApis(curSidoCd + curSiggCd + curDongCd, '0');
								} else {
									that.AreaAndStatsApis(curSidoCd + curSiggCd + curDongCd, '0');
								}
							}
							break;
						default:
							break;
						}
					// mng_s 2017. 12. 13 kdb
					} else if($("#selectValue2").val()=="4"){
						// 문화재 현황에 등록문화재 추가
						that.heritage("init");	
					// mng_e 2017. 12. 13 kdb
					} else if(that.curPolygonCode > 4 && that.poi_disp_yn) {
						that.AreaAndStatsApis(curSidoCd + curSiggCd + curDongCd, '0');
					} else if(that.curPolygonCode < 5) {
						that.markers.clearLayers();
						that.poiAdmCd = "";
						$thematicMapFrame13.ui.poiInfoArray = [];
						
						// mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
						if (that.isReloadMode && that.thema_map_data_id != 'temp') {
							switch(that.curPolygonCode) {
							case 2:
								that.getThemaMapData(that.thema_map_data_id, '00');
								break;
							case 3:
								that.getThemaMapData(that.thema_map_data_id,curSidoCd);
								break;
							case 4:
								that.getThemaMapData(that.thema_map_data_id,curSidoCd + curSiggCd);
								break;
							}
						}
						// mng_e 2020. 12. 01 j.h.Seok 통계주제도 통합
					}
					
					that.curSidoCd = result.sido_cd;
					that.curSiggCd = result.sgg_cd;
					that.curDongCd = result.emdong_cd;
					that.mapNavigation.reverseOnSelectChange(that);
				}
				else if (res.errCd == "-401") {
					accessTokenInfo();
					if (options.center != undefined && options.center != null) {
						if(errCount < 10){
							errCount++;
							setTimeout(that.openApiReverseGeoCode(options.center,that.bnd_year), 500);
						}else{
						}
					}
				} else if (res.errCd = "-100") {
					that.mapNavigation.notFoundData(that);
				}
				else {
					////messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
				
			}
		});
	}());
	/** ********* OpenAPI 리버스지오코딩. End ********* */
	
	/** ********* 사용자영역 경계조회 Start ********* */
	(function() {
		$class("sop.openApi.userAreaBoundObj.api").extend(sop.portal.absAPI).define(				
				{
					onSuccess : function(status, res, options) {
						var that = options.target;
						if (res.errCd == "0") {
							options["geojson"] = res;
							that.lastGeojsonInfo = options;
							
							if(that.curPolygonCode == "3")
								options.adm_cd = that.curSidoCd;
							else if(that.curPolygonCode == "4")
								options.adm_cd = that.curSidoCd + that.curSiggCd;
							else 
								options.adm_cd = that.curSidoCd + that.curSiggCd;
							

							console.log("that.curPolygonCode [" + that.curPolygonCode);
							console.log("options.adm_cd [" + options.adm_cd);
							
							//mng_s 20190827
							if(that.curPolygonCode == "100") {
								//that.curPolygonCode = "3";
								res["pAdmCd"] = that.curSidoCd;
								
							} else {
								res["pAdmCd"] = options.adm_cd;
							}
							
							
							options.target.setPolygonDataGeojson(res);
						}
						else if (res.errCd == "-401") {
							accessTokenInfo();
							setTimeout(that.openApiBoundaryHadmarea(options.adm_cd, options.year, options.low_search), 500);
						}
					},
					onFail : function (status) {
					}
				});
	}());
	/** ********* 사용자영역 경계조회 End ********* */
	
	/** ********* OpenAPI 실내건물조회 Start ********* */
	(function () {
		$class("sop.openApi.bdArea.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var that = options.target;
				if (res.errCd == "0") {
					if (that.geojson) {
						that.geojson.remove();
						that.geojson = null;
					}
					that.addPolygonGeoJson(res, "build");

					//API 로그
					apiLogWrite("A0", options);
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* OpenAPI 실내건물조회. End ********* */
	
	/** ********* OpenAPI 상권조회 Start ********* */
	(function () {
		$class("sop.openApi.tradeArea.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var that = options.target;
				if (res.errCd == "0") {
					if (that.tradeGeojson) {
						that.tradeGeojson.remove();
						that.tradeGeojson = null;
					}
					that.addPolygonGeoJson(res, "trade");
				}
			},
			onFail : function (status) {
			}
		});
	}());
	
	/** ********* 범례 ********* */
	(function () {
		$class("sop.thema.legendValues.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var that = options.target;
				if (res.errCd == "0") {
					console.log("SseOk", res);
					that.thema_legend_values = res.thema_legend_values;
				}
			},
			onFail : function (status) {
			}
		});
	}());
	
	// mng_s 2017. 08. 03 석진혁
	(function () {
		$class("sop.thema.companySearch.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var that = options.target;
				if (res.errCd == "0") {
					console.log(res);
					
					// mng_s 2017. 08. 03 석진혁
					var listCount = res.result.list_count[0];
					
					var totalCount = parseInt(listCount.totalcount);
					var returnCount = parseInt(listCount.returncount);
					var pageNum = parseInt(listCount.pagenum);
					var apicallCount = parseInt(totalCount / (options.param.resultcount * (pageNum + 1)));

					if(pageNum == '0') {
						that.markers.clearLayers();
						$thematicMapFrame13.ui.poiInfoArray = [];
					}

					console.log('apicallCount', apicallCount);
					if (returnCount !== totalCount && apicallCount > 0) {
//						that.AreaAndStatsApis(options.adm_cd, pageNum + 1);
						that.callThemePOIResult(options.param.adm_cd, null, pageNum + 1);
					}
					var poiList = res.result.company_list;
					// mng_e 2017. 08. 03 석진혁
					
					if (poiList.length > 0) {
						for ( var i = 0; i < poiList.length; i++) {
							var _markerIcon = sop.icon({
								iconUrl : '/img/marker/marker/70_07.png',
								shadowUrl : '/img/marker/theme_shadow.png',
								iconAnchor : [ 13, 40 ],
								iconSize : [ 25, 40 ],
								infoWindowAnchor: [1, -34]
							});

							var _marker = sop.marker([ poiList[i].x, poiList[i].y ], {
								icon : _markerIcon
							});

							_marker.info = poiList[i];
							_marker.addTo(that.markers);

							var tel_num = "";
							if (!sop.Util.isUndefined(poiList[i].tel_no)) {
								tel_num = poiList[i].tel_no;
								tel_num = appendHyphenToPhoneNumber(tel_num);
							}

							var tempList = {};
							tempList.theme_cd = poiList[i].theme_cd;
							tempList.facility_area = poiList[i].facility_area;
							tempList.use_num = poiList[i].use_num;
							tempList.electric_fan_num = poiList[i].electric_fan_num;
							tempList.aircon_num = poiList[i].aircon_num;
							tempList.night_yn = poiList[i].night_yn;
							tempList.corp_nm = poiList[i].corp_nm;
							tempList.adm_addr = poiList[i].adm_addr;
							tempList.class_nm = poiList[i].class_nm;
							tempList.worker_sum = poiList[i].worker_sum;


							// 전기충전소 
							tempList.operating_nm = poiList[i].operating_nm;
							tempList.station_type = poiList[i].station_type;
							tempList.station_div = poiList[i].station_div;
							tempList.station_cha = poiList[i].station_cha;
							tempList.rapidity = poiList[i].rapidity;
							tempList.parking = poiList[i].parking;
							tempList.cnt = poiList[i].cnt;
							tempList.use_time = poiList[i].use_time;
							tempList.addr = poiList[i].addr;
							tempList.number = poiList[i].number;
							
							
							//전통시장
							tempList.market_type = poiList[i].market_type;
							tempList.market_open = poiList[i].market_open;
							tempList.shop_num = poiList[i].shop_num;
							tempList.handling = poiList[i].handling;
							tempList.home_page = poiList[i].home_page;
							tempList.restroom_yn = poiList[i].restroom_yn;
							tempList.parking_yn = poiList[i].parking_yn;
							tempList.base_year = poiList[i].base_year;
							tempList.number = poiList[i].number;
							


							$thematicMapFrame13.ui.poiInfoArray.push(tempList);
							
							if(tempList.theme_cd == '99999'){
								// mng_s 20200908 김건민 (선풍기보유대수 추가함.)
								if(tempList.night_yn == undefined){
									poiList[i].night_yn = "-";	
								}
								if(tempList.aircon_num == undefined){
									poiList[i].aircon_num = "-";
								}
								
								if(tempList.electric_fan_num == undefined){
									poiList[i].electric_fan_num = "-";
								}
								// mng_e 20200908 김건민
								
								var html = '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
								html += '<tr>';
								html += '<th style="text-align: left; word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + poiList[i].corp_nm + '</strong></th>';
								html += '</tr>';
								html += '<tbody>';
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 시설면적 : ' + poiList[i].facility_area + '㎡</td>';
								html += '</tr>'
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 이용가능인원수 : ' + poiList[i].use_num + '명</td>';
								html += '</tr>'
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 선풍기보유대수 : ' + poiList[i].electric_fan_num + '대</td>';
								html += '</tr>'
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 에어컨보유대수 : ' + poiList[i].aircon_num + '대</td>';
								html += '</tr>'
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 야간연장운영 : ' + poiList[i].night_yn + '</td>';
								html += '</tr>'
								html += '</tbody>';
								//html += '<tr>';
								//html += ' <th style="text-align: left; word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:12px;">&nbsp;' + poiList[i].naddr + '</th>';
								//html += '<td >';
								//html += '</td>';
								//html += '</tr>';
								html += '</table>';
								_marker.bindInfoWindow(html);
							}else if(tempList.theme_cd == '999999'){
								if(tempList.use_time == undefined){
									poiList[i].use_time = " - ";
								}
								if (tempList.rapidity == undefined){
									poiList[i].rapidity = " - ";
								}
								if (tempList.number == undefined){
									poiList[i].number = " - ";
								}
								var html = '<table style="text-align:left;table-layout:fixed;width:auto;padding:5px;" >';
								html += '<tr>';
								html += '<th style="text-align: left;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + poiList[i].corp_nm + '</strong></th>';
								html += '</tr>';
								html += '<tbody>';
								html += '<tr>';
								html += '<td style="padding:2px 4px; word-break:break-all;"> 주소 : ' + poiList[i].addr + ' </td>';
								html += '</tr>'
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 충천기 구분/타입 : ' + poiList[i].station_div + ' - ' + poiList[i].station_type + '(' + poiList[i].cnt + '개)</td>';
								html += '</tr>'
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 사용가능시간 : ' + poiList[i].use_time + '</td>';
								html += '</tr>'
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 연락처 : ' + poiList[i].number + '</td>';
								html += '</tr>'
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 충천요금 : ' + poiList[i].station_cha + '</td>';
								html += '</tr>'
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 급속충전량 : ' + poiList[i].rapidity + '</td>';
								html += '</tr>'
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 주차요금 : ' + poiList[i].parking + '</td>';
								html += '</tr>'
								html += '</tbody>'
								html += '</table>';
								_marker.bindInfoWindow(html);
							}else if(tempList.theme_cd == '99998'){
								if(tempList.home_page == undefined){
									poiList[i].home_page = " - ";
								}
								if (tempList.shop_num == undefined){
									poiList[i].shop_num = " - ";
								}
								if (tempList.handling == undefined){
									poiList[i].handling = " - ";
								}
								if (tempList.home_page == undefined){
									poiList[i].home_page = " - ";
								}
								if (tempList.restroom_yn == undefined || tempList.restroom_yn == 'Y'){
									poiList[i].restroom_yn = " - ";
									poiList[i].restroom_yn = "있음";
								}else{
									poiList[i].restroom_yn = "없음";
								}
								if (tempList.parking_yn == undefined || tempList.restroom_yn == 'Y'){
									poiList[i].parking_yn = " - ";
									poiList[i].parking_yn = "있음";
								}else{
									poiList[i].parking_yn = "없음";
								}
								if (tempList.base_year == undefined){
									poiList[i].base_year = " - ";
								}
								if (tempList.number == undefined){
									poiList[i].number = " - ";
								}
								var html = '<table style="text-align:left;table-layout:fixed;width:auto;padding:5px;" >';
								html += '<tr>';
								html += '<th style="text-align: left;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + poiList[i].corp_nm + '</strong></th>';
								html += '</tr>';
								html += '<tbody>';
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 개설년도 : ' + poiList[i].base_year + '년</td>';
								html += '</tr>';
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 시장유형 : ' + poiList[i].market_type + '</td>';
								html += '</tr>';
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 시장개설주기 : ' + poiList[i].market_open + '</td>';
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 전화번호 : ' + poiList[i].number + '</td>';
								html += '</tr>';
								html += '</tr>'
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 점포수 : ' + poiList[i].shop_num + '개</td>';
								html += '</tr>';
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 취급품목 : ' + poiList[i].handling + '</td>';
								html += '</tr>';
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 홈페이지 : ' + poiList[i].home_page + '</td>';
								html += '</tr>';
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 공중화장실 : ' + poiList[i].restroom_yn + '</td>';
								html += '</tr>';
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 주차장보유 : ' + poiList[i].parking_yn + '</td>';
								html += '</tr>';
								html += '</tbody>';
								html += '</table>';
								_marker.bindInfoWindow(html);
							}else{
								var html = '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
								html += '<tr>';
								html += '<th style="text-align: left; word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + poiList[i].corp_nm + '</strong></th>';
								html += '<td >';
								html += '</td>';
								html += '</tr>';
								//html += '<tr>';
								//html += ' <th style="text-align: left; word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:12px;">&nbsp;' + poiList[i].naddr + '</th>';
								//html += '<td >';
								//html += '</td>';
								//html += '</tr>';
								html += '</table>';
								_marker.bindInfoWindow(html);
							}
						}
					}
					else {
						//window.parent.messageAlert.open("알림", "해당 지역 보육업체 검색결과가 없습니다.");
					}
				}
			},
			onFail : function (status) {
			}
		});
	}());

	// mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
	(function () {
		$class("sop.thema.companySearchForPOI.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var that = options.target;
				if (res.errCd == "0") {
					var listCount = res.result.list_count[0];
					
					var totalCount = parseInt(listCount.totalcount);
					var returnCount = parseInt(listCount.returncount);
					var pageNum = parseInt(listCount.pagenum);
					var apicallCount = parseInt(totalCount / (options.param.resultcount * (pageNum + 1)));

					if(pageNum == '0') {
						that.markers.clearLayers();
						$thematicMapFrame13.ui.poiInfoArray = [];
					}

					if (returnCount !== totalCount && apicallCount > 0) {
						that.callThemePOIResult(null, pageNum + 1);
					} else {
						$thematicMapFrame13.Popup.close();
					}
					
					var poiList = res.result.company_list;
					
					if (poiList.length > 0) {
						for ( var i = 0; i < poiList.length; i++) {
							var _markerIcon = sop.icon({
								iconUrl : '/img/marker/marker/70_07.png',
								shadowUrl : '/img/marker/theme_shadow.png',
								iconAnchor : [ 13, 40 ],
								iconSize : [ 25, 40 ],
								infoWindowAnchor: [1, -34]
							});

							var _marker = sop.marker([ poiList[i].x, poiList[i].y ], {
								icon : _markerIcon
							});

							_marker.info = poiList[i];
							_marker.addTo(that.markers);
							_marker.on("click",function(event){
								srvLogWrite('B0','05','02','00',$(".helperText span").text(),event.target.info.corp_nm);
							});
							var tel_num = "";
							if (!sop.Util.isUndefined(poiList[i].tel_no)) {
								tel_num = poiList[i].tel_no;
								tel_num = appendHyphenToPhoneNumber(tel_num);
							}

							var tempList = {};
							tempList.corp_nm = poiList[i].corp_nm;
							tempList.naddr = poiList[i].naddr;
							tempList.class_nm = poiList[i].class_nm;
							tempList.worker_sum = poiList[i].worker_sum;
							$thematicMapFrame13.ui.poiInfoArray.push(tempList);

							var html = '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
							html += '<tr>';
							html += '<th style="text-align: left; word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + poiList[i].corp_nm + '</strong></th>';
							html += '<td >';
							html += '</td>';
							html += '</tr>';
							html += '</table>';
							_marker.bindInfoWindow(html);
						}
					}
					else {
					}
				}
			},
			onFail : function (status) {
			}
		});
	}());
}(window, document));
