/**
 * 맵에 관한 공통 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2014/08/19 초기 작성 author : 권차욱 version : 1.0 see :
 * 
 */
(function (W, D) {
	W.$map = W.$map || {};
	var errCount = 0;
	sMap = {
			
			map : function() {
				var that = this;
				this.id = null;
				this.mapInfo = null;
				this.mapBtnInfo = null;
				this.shareInfo = null;
				this.delegate = null;
				this.gMap = null;
				this.target = null;	 		// target element
				this.isScale = true; 		// map scale 유무
				this.isPanControl = false; 	// map panControl 유무
				this.isMouseOver = false;
				this.isMeasureControl = true;
				this.isStatisticTileLayer = false;
				this.isDrop = false;
				this.isFirstDraw = true;
				this.isZoomStart = false;
				this.gridLegendClickNum = 0; //mng_s 그리드 범례 클릭한 번호
				this.center = null;			// center 좌표(utmk)
				this.zoom = 4;			    // zoom level
				this.geojson = null;
				this.dataGeojson = null;
				this.geojsonData = null;
				this.tradeGeojon = null;
				this.bounds = null;
				this.curPolygonCode = 4;
				this.data = [];
				this.curSidoCd = null;
				this.curSiggCd = null;
				this.curDongCd = null;
				this.curDropCd = null;
				this.curSidoNm = null;
				this.curSiggNm = null;
				this.curDongNm = null;
				this.curDropPolygonCode = null;
				this.curSelectedLayer = null;
				this.showCombineDataParam = [];
				this.legendColor = null;
				this.combineData = [];
				this.dataType = "normal";
				this.dropEvent = null;
				this.bnd_year = bndYear;
				this.dropInfo = null;
				this.lastGeojsonInfo = null;
				this.drawControl = null;
				this.miniMap = null;
				this.isMiniMapDraw = false; 
				this.isZoomSliderControl = false;
				this.isZoomAnimation = true;
				this.render = null;
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
				this.isLayerMouseEventDisabled = false;
				this.heatRadius = 20;
				this.heatBlur = 30;
				this.zoomLevelHeat = true;
				this.isMultiControlDownBoundary = true;
				this.isNoReverseGeocode = false;
				this.dataPolygonFillOpacity = 0.7;
				this.boundaryCallback = null;
				this.atdrc_yn = null;//(자치구 : 1)
				this.combineCallback = null;
				
				/**
				 * 
				 * @name         : createMap
				 * @description  : 맵을 생성한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param delegate : target 객체
				 * @param target : target 엘리먼트
				 * @param opt : 옵션정보
				 */
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
				
					//지도생성
					this.gMap = sop.map(this.target, {
						scale : this.isScale,
						panControl : this.isPanControl,
						measureControl : this.isMeasureControl,
						attributionControl : false,
						zoomSliderControl: this.isZoomSliderControl,
						zoomAnimation : this.isZoomAnimation,
						statisticTileLayer : true
					});
					this.gMap.setView(sop.utmk(this.center[0], this.center[1]), this.zoom);
					
					//현재 지도 bound 설정
					this.bounds = this.gMap.getBounds();
					
					//미니맵 생성
					this.miniMap = new sMap.miniMap();	
					
					//공통 마커클러스터 생성
					this.render = sop.svg();
					this.markers = sop.markerClusterGroup({
						animateAddingMarkers: true
					});
					this.gMap.addLayer(this.markers);
				};
				
				/**
				 * 
				 * @name         : createDrawControl
				 * @description  : Draw 컨트롤러를 생성한다.(기본 draw 컨트롤러)
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */
				this.createDrawControl = function() {
					var drawControl = new Draw.Control.Manager();
					drawControl.addControl(new Draw.Control.Measure(this.gMap));
					drawControl.addControl(new Draw.Control.Poi(this.gMap));
					this.drawControl = drawControl;	
					this.gMap.addControl(drawControl); 
				},
				
				/**
				 * 
				 * @name         : update
				 * @description  : 지도를 refresh한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */
				this.update = function () {
					this.gMap._onResize();
				},
				
				/**
				 * 
				 * @name         : mapMove
				 * @description  : 지도를 이동한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param center : 지도 중심좌표
				 * @param zoom	 : 줌 레벨
				 * @param animate: 줌 애니메이션 유무
				 */
				this.mapMove = function (center, zoom, animate) {
					if (animate == undefined || animate == null) {
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
				
				/**
				 * 
				 * @name         : setZoom
				 * @description  : 지도의 줌레벨을 설정한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param zoom	 : 줌 레벨
				 */
				this.setZoom = function (zoom) {
					if (zoom != null) {
						this.zoom = zoom;
						this.gMap.setZoom(this.setZoomCalibrate(zoom, 6));
					}
				};
				
				/**
				 * 
				 * @name         : setZoomCalibrate
				 * @description  : 위성지도를 위해 줌레벨을 calibration한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param zoom	 : 줌 레벨
				 * @param value  : calibration 값
				 */
				this.setZoomCalibrate = function(zoom, value) {
					var tmpZoom = zoom;
					if (this.mapMode == "settlite") { //위성지도
						tmpZoom = zoom + value;
					}
					return tmpZoom;
				}
				
				/**
				 * 
				 * @name         : setFixedBoundLevel
				 * @description  : 시도/시군구/읍면동/집계구 레벨에 따른 지도 줌레벨 범위를 정의한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param bool	 : 지도 줌레벨 고정여부
				 */
				this.setFixedBoundLevel = function(bool) {
					var maxZoom, minZoom;
					this.isFixedBound = bool;
					this.isNoReverseGeocode = bool;
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
						this.gMap.scrollWheelZoom.disable();
						
					}else {
						maxZoom = 12;
						minZoom = 0;
						
						if (this.mapMode == "settlite") {
							maxZoom += 6;
							minZoom += 6;
						}
						this.gMap.setMaxZoom(maxZoom);
						this.gMap.setMinZoom(minZoom);
						this.gMap.scrollWheelZoom.enable();
					}
				};
				
				/**
				 * 
				 * @name         : setBoundSelectedMoode
				 * @description  : 다중경계선택 모드로 변경한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param mode	 : 다중경계선택 모드("multi")
				 */
				this.setBoundSelectedMoode = function(mode) {
					if (mode == null || mode == undefined) {
						this.selectedBoundMode = null;
						this.isMultiSelectedBound = false;
					}
					
					switch (mode) {
						case "multi":
							this.selectedBoundMode = mode;
							this.isMultiSelectedBound = true;
							break;
						default:
							break;
					}
				};
				
				/**
				 * 
				 * @name         : setBoundSelectedLayer
				 * @description  : 선택된 경계를 저장한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */
				this.setBoundSelectedLayer = function() {
					this.selectedBoundList = [];
					
					//융합된 색상경계가 있을 경우
					if (this.dataGeojson != null || this.multiLayerControl.dataGeojson != null) {
						if (this.dataGeojson) {
							this.dataGeojson.eachLayer(function(layer) {
								if (layer.feature.properties.adm_cd.length > 7) {
									var isSameLayer = false;
									for (var i=0; i<that.selectedBoundList.length; i++) {
										if (layer.feature.properties.adm_cd.substring(0,7) == that.selectedBoundList[i].feature.properties.adm_cd.substring(0,7) ) {
											isSameLayer = true;
											break;
										}
									}
									if (!isSameLayer) {
										that.selectedBoundList.push(layer);
									}
								}else {
									that.selectedBoundList.push(layer);
								}
							}) ;
						}else {
							for (var i=0; i<this.multiLayerControl.dataGeojson.length; i++) {
								this.multiLayerControl.dataGeojson[i].eachLayer(function(layer) {
									if (layer.feature.properties.adm_cd.length > 7) {
										var isSameLayer = false;
										for (var x=0; x<that.selectedBoundList.length; x++) {
											if (layer.feature.properties.adm_cd.substring(0,7) == that.selectedBoundList[x].feature.properties.adm_cd.substring(0,7) ) {
												isSameLayer = true;
												break;
											}
										}
										if (!isSameLayer) {
											that.selectedBoundList.push(layer);
										}
									}else {
										that.selectedBoundList.push(layer);
									}
								});
							}
						}
					}
					//일반 경계만 있을 경우
					else {
						if (this.geojson != null) {
							this.geojson.eachLayer(function(layer) {
								if (layer.feature.properties.adm_cd.length > 7) {
									var isSameLayer = false;
									for (var i=0; i<that.selectedBoundList.length; i++) {
										if (layer.feature.properties.adm_cd.substring(0,7) == that.selectedBoundList[i].feature.properties.adm_cd.substring(0,7) ) {
											isSameLayer = true;
											break;
										}
									}
									if (!isSameLayer) {
										that.selectedBoundList.push(layer);
									}
								}else {
									that.selectedBoundList.push(layer);
								}
							}) ;
						}
					}
				};
				
				/**
				 * 
				 * @name         : setBoundLevel
				 * @description  : 경계레벨을 설정한다.(전국:1, 시도:2, 시군구:3, 읍면동:4, 집계구:5)
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */
				this.setBoundLevel = function(level) {
					this.boundLevel = level;
				};
				
				/**
				 * 
				 * @name         : clearLayerStyle
				 * @description  : 경계의 스타일을 초기화한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param layer  : 선택된 레이어
				 */
				this.clearLayerStyle = function(layer) {
					if (layer.options.origin) {
						layer.setStyle({
							weight : layer.options.origin.weight,
							color : layer.options.origin.color,
							dashArray : layer.options.origin.dashArray,
							fillOpacity : layer.options.origin.fillOpacity,
							fillColor : layer.options.origin.fillColor
						});
					}
				};
				
				/**
				 * 
				 * @name         : contains
				 * @description  : 특정 경계에 특정 좌표가 포함되어있는지 여부를 판단한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param bounds : 경계정보
				 * @param point  : 좌표정보
				 */
				this.contains = function (bounds, point) {
					if (point && bounds) {
						return bounds.contains(point);
					}
				};
				
				/**
				 * 
				 * @name         : addMarker
				 * @description  : 마커를 생성한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param x 	 : x좌표
				 * @param y  	 : y좌표
				 * @param options: 옵션정보
				 */
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
				
				/**
				 * 
				 * @name         : addHoverMarker
				 * @description  : hover 마커를 생성한다.(1~10까지)
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param x 	 : x좌표
				 * @param y  	 : y좌표
				 * @param options: 옵션정보
				 * @parma idx    : 인덱스 정보
				 */
				this.addHoverMarker = function (x, y, options, idx) {					
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
				
				/**
				 * 
				 * @name         : addCircleMarker
				 * @description  : 서클마커를 생성한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param x 	 : x좌표
				 * @param y  	 : y좌표
				 * @param options: 옵션정보
				 */
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
					var tooltipMaxWidth = "400";
					
					if (options != undefined) {
						if (options.visible != undefined) {visible = options.visible;}
						if (options.radius != undefined) {radius = options.radius;}	
						if (options.fillColor != undefined) {fillColor = options.fillColor;}
						if (options.color != undefined) {color = options.color;}
						if (options.fillOpacity != undefined) {fillOpacity = options.fillOpacity;}
						if (options.opacity != undefined) {opacity = options.opacity;}
						if (options.weight != undefined) {weight = options.weight;}
						if (options.tooltipMaxWidth != undefined) {tooltipMaxWidth = options.tooltipMaxWidth;}
						if (options.options != undefined) {params = options.options;}
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
							marker.bindInfoWindow(options.tooltipMsg, {maxWidth: tooltipMaxWidth});
							if (visible) {
								marker.openInfoWindow();
							}	
						}
						marker.addTo(this.gMap);
					}
					return marker;
				},
				
				/**
				 * 
				 * @name         : removeMarker
				 * @description  : 특정 마커를 제거한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param marker : 마커정보
				 */
				this.removeMarker = function (marker) {
					if (marker) {
						marker.remove();
					}
				};
				
				/**
				 * 
				 * @name         : clearDataOverlay
				 * @description  : overlay를 초기화한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */
				this.clearDataOverlay = function () {
					if (this.dataGeojson) {
						this.clearToolTip();
						this.dataGeojson.remove();
						this.removeCaption();
					}

					if (this.miniMap) {
						if(this.miniMap.geojson) {
							this.miniMap.geojson.remove();
						}
					}
				
					this.bnd_year = bndYear;
					this.data = [];
					this.combineData = [];
					this.dataGeojson = null;
					this.curDropPolygonCode = null;
					this.lastGeojsonInfo = null;
					this.isNoReverseGeocode = false;
					this.markers.clearLayers();
					this.selectedBoundMode = null;
					this.selectedBoundList = [];
					this.dataGeojsonLayer = null;
					this.curAdmCd = null;
					this.dataForCombine = null;
					this.multiLayerControl.clear();
					this.legend.removeDataOverlay();
					this.legend.data = [];
					
					if (this.drawControl) {
						this.drawControl.removeOverlay();
					}
					
					if (this.heatMap) {
						this.heatMap.setUTMKs([]);
					}
					
					this.gMap.eachLayer(function(layer) {
						if (layer._layer) {
							_layer.remove();
						}
					});
				};
				
				/**
				 * 
				 * @name         : clearLayer
				 * @description  : layer를 삭제한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */
				this.clearLayer = function() {
					if (this.dataGeojson) {
						this.clearToolTip();
						this.dataGeojson.remove();
						this.removeCaption();
					}
					
					if (this.geojson) {
						this.geojson.remove();
					}
				};
				
				/**
				 * 
				 * @name         : clearData
				 * @description  : 통계데이터를 초기화한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */
				this.clearData = function () {
					this.data = [];
					this.combineData = [];
				};
				
				/**
				 * 
				 * @name         : clearToolTip
				 * @description  : 툴팁을 초기화한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */
				this.clearToolTip = function() {
					if (this.dataGeojson != null) {
						this.dataGeojson.eachLayer(function(tmplayer) {
							that.setPolyLayerMouseout({
								target : tmplayer,
								utmk : sop.utmk([tmplayer.feature.properties.x, tmplayer.feature.properties.y])
							});
							tmplayer.unbindToolTip();
						});
					}
				};
				
				/**
				 * 
				 * @name         : setLegendColor
				 * @description  : 범례색상을 설정한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */				
				this.setLegendColor = function () {
					if (this.dataGeojson || this.multiLayerControl.dataGeojson) {
						this.updatePolygonGeoJson();
					}
				};
				
				/**
				 * 
				 * @name         : updatePolygonGeoJson
				 * @description  : 경계를 업데이트한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */	
				this.updatePolygonGeoJson = function () {
					if (this.dataGeojson != null) {
						this.dataGeojson.eachLayer(function (layer) {
							if (layer.feature) {
								that.setLayerColor(layer.feature, layer);
							}
							
						});
					}
					
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
				
				/**
				 * 
				 * @name         : updatePolygonGeoJson
				 * @description  : 경계의 스타일을 설정한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param type   : 경계타입
				 */	
				this.setPolygonGeoJsonStyle = function (type) {			
					var color = "#666666";
					var fillColor = "white";
					var weight = 1.75;
					var fillOpacity = 0;
					var dashArray =  '3';
					
					switch (this.mapMode) {
						case "settlite":
							color = "white";
							break;
						case "intro":
							color = "#CCCCCC";
							fillColor = "#FCFCFC";
							fillOpacity = 1;
							weight = 1.5;
							dashArray = "";
							break;
						default:
							break;
					}
					
					switch (type) {
						case "data":
							color = "white", 
							fillColor = "#F0FFF0";
							weight = 1;
							fillOpacity = this.dataPolygonFillOpacity;
							dashArray = "";
							break;
						case "polygon":
							color = "#666666";
							fillColor = "white";
							weight = 1.75;
							fillOpacity = 0;
							dashArray =  '3';
							break;
						case "buffer":
							color = "#3d62e8";
							fillColor = "3d62e8";
							weight = 1;
							fillOpacity = 0.7;
							dashArray =  '';
							break;
						default:
							break;
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
				
				/**
				 * 
				 * @name         : addPolygonGeoJson
				 * @description  : 경계를 생성한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param obj	 : 경계정보
				 * @param type   : 경계타입("data", "polygon")
				 */	
				this.addPolygonGeoJson = function (obj, type) {
					var adm_cd = "";
					var geojson = sop.geoJson(obj, {
						style : this.setPolygonGeoJsonStyle(type),
						onEachFeature : function (feature, layer) {
							adm_cd = layer.feature.properties.adm_cd;
							that.setLayerColor(feature, layer);								
							layer.on({
								//mouseover 이벤트 등록
								mouseover : function (e) {
									that.isMouseOver = true;
									if (!that.isLayerMouseEventDisabled) {
										that.clearToolTip();
										that.setPolyLayerMouseover(e);
										
										if (that.infoControl != null) {
											that.infoControl.update(feature.properties);
										}
										
										if (feature.properties.adm_cd != undefined &&
											feature.properties.adm_cd.length > 0) {
											that.mouseOverAdmCd = feature.properties.adm_cd;
										}

										if (that.delegate && 
											that.delegate.callbackFunc &&
											that.delegate.callbackFunc.didMouseOverPolygon) {
											that.delegate.callbackFunc.didMouseOverPolygon(e, feature, layer.options.type, that);
										}
									}
								},
								
								//mouseout 이벤트 등록
								mouseout : function (e) {
									that.isMouseOver = false;
									if (!that.isLayerMouseEventDisabled) {
										that.setPolyLayerMouseout(e);

										if (that.delegate && 
											that.delegate.callbackFunc &&
											that.delegate.callbackFunc.didMouseOutPolygon) {
											that.delegate.callbackFunc.didMouseOutPolygon(e, feature, layer.options.type, that);
										}
									}
								},
								
								//click 이벤트 등록
								click : function (e) {
									if (!that.isLayerMouseEventDisabled) {
										var layer = e.target;
										if (!sop.Browser.ie) {
											layer.bringToFront();
										}	
										
										if (that.delegate && 
											that.delegate.callbackFunc && 
											that.delegate.callbackFunc.didSelectedPolygon) {
											that.delegate.callbackFunc.didSelectedPolygon(e, feature, layer.options.type, that);
										}
									}
								},
								
								//drop 이벤트 등록
								drop : function (e) {
									var layer = e.target;
									that.curDropPolygonCode = that.curPolygonCode;
									that.isNoReverseGeocode = true;
									that.dropEvent = e;
									that.curDropCd = layer.feature.properties.adm_cd;
									if (that.curDropCd.length > 7) {
										that.curDropCd = that.curDropCd.substring(0,7);
									}

									var zoom = that.zoom;	
									that.mapMove([layer.dropUTMK.x, layer.dropUTMK.y], that.setZoomCalibrate(zoom, 6));
									
									if (that.delegate && 
										that.delegate.callbackFunc && 
										that.delegate.callbackFunc.didMapDropEnd instanceof Function) {
										that.delegate.callbackFunc.didMapDropEnd(e.dropEvent, e.dropSource, e.target, e.target.feature.properties, that);
									}
									
									that.isMouseOver = false;
								}
							
							});
						},
						type : type, // 일반경계인지, 데이터경계인지 구분
						layerCode : that.curPolygonCode,
					
					});
					
					
					
					switch(type) {
						case "data": //데이터 경계
							this.dataGeojson = geojson;
							this.dataGeojson.addTo(this.gMap);
							break;
						default:
							this.geojson = geojson;
							this.geojson.addTo(this.gMap);
							break;
					}
					
					//집계구 일 경우
					//x,y좌표를 경계정보에 넣는다.
					//집계구 경계의 경우, db상에 좌표정보가 없음
					if (adm_cd != undefined && adm_cd.length > 7) {
						geojson.eachLayer(function(layer) {
							if (layer.feature.properties.adm_cd.length > 7) {
								var center = layer.getCenter();
								layer.feature.properties["x"] = center.x;
								layer.feature.properties["y"] = center.y;
							}
						});
					}
					
					//데이터 경계의 경우
					//callback 함수가 있으면 리턴
					if (type == "data") {
						if (that.combineCallback != undefined && 
							that.combineCallback != null && 
							that.combineCallback instanceof Function) {
							that.combineCallback.call(undefined, that, that.dataGeojson);
						  }
					}
					
					return geojson;
				};

				/**
				 * 
				 * @name         : setPolyLayerMouseover
				 * @description  : 경계 mouseover 이벤트
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param e	 	 : 이벤트
				 */	
				this.setPolyLayerMouseover = function (e) {
					var layer = e.target;
					var fillColor = layer.options.fillColor;
					var color = "#0086C6";
					var weight = 5;
					var dashArray = layer.options.dashArray;
					
					if (layer == that.curSelectedLayer) {
						if (that.mapMode != "intro") {
							layer.setStyle({
								weight : 5,
								color : "#FF0000",
								dashArray : layer.options.dashArray,
								fillOpacity : layer.options.fillOpacity,
								fillColor : layer.options.fillColor
							});
						}
					}else {
						if (that.mapMode == "intro") {
							fillColor = "#FCBE47";
							color = "#EBB410";
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
					
					if (layer.hoverType != undefined) {
						switch(layer.hoverType) {
							case "front":
								layer.bringToFront();
								break;
							case "back":
								layer.bringToBack();
								break;
							default:
								layer.bringToFront();
								break;	
						}
					}else {
						if (!sop.Browser.ie) {
							layer.bringToFront();
						}
					}
				};
				
				/**
				 * 
				 * @name         : setPolyLayerMouseout
				 * @description  : 경계 mouseout 이벤트
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param e	 	 : 이벤트
				 */	
				this.setPolyLayerMouseout = function (e) {
					var layer = e.target;
					if (layer == that.curSelectedLayer) {
						if (that.mapMode != "intro") {
							layer.setStyle({
								weight : 3,
								color : "#FF0000",
								dashArray : layer.options.dashArray,
								fillOpacity : layer.options.fillOpacity,
								fillColor : layer.options.fillColor
							});
						}
					}else {
						var color = "#666666";
						var fillColor = layer.options.fillColor;
						var fillOpacity = layer.options.fillOpacity;
						var weight = 3;
						
						switch (that.mapMode) {
							case "settlite":
								color = "white";
								weight = 3;
								break;
							case "intro":
								color = "#CCCCCC";
								fillColor = "#FCFCFC";
								weight = 1.5;
								break;
							default:
								if (layer.options.type == "polygon") {
									color = "#666666";
									weight = 1.75;
									fillOpacity = 0;
								}else {
									color = "white";
									weight = 1;
									fillOpacity = this.dataPolygonFillOpacity;
								}
								break;
						}
						
						layer.setStyle({
							weight : weight,
							color : color,
							dashArray : layer.options.dashArray,
							fillOpacity : fillOpacity,
							fillColor : fillColor
						});
					}
					
					if (!sop.Browser.ie&&!sop.Browser.webkit) {
						layer.bringToBack();
					}
				};
				
				/**
				 * 
				 * @name         : addControlEvent
				 * @description  : 지도이벤트를 등록한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param type	 : 이벤트 타입
				 * @param opt	 : 옵션정보
				 */	
				this.addControlEvent = function (type, opt) {
					
					switch (type) {
						//지도이동 시작
						case "movestart":
							this.gMap.on("movestart", function (e) {
								if (that.delegate && 
									that.delegate.callbackFunc && 
									that.delegate.callbackFunc.didMapMoveStart instanceof Function) {
									that.delegate.callbackFunc.didMapMoveStart(e, that);
								}
							});
							break;
						
						//지도이동 종료
						case "moveend":
							this.gMap.on("moveend", function (e) {	
								var center = e.target.getCenter();
								that.center = [ center.x, center.y ];
								that.bounds = e.target.getBounds();
								
								if (!that.isDrop) {
									that.openApiReverseGeoCode(that.center);
								}
								
								that.isDrop = false;
								that.isZoomStart = false;
													
								if (that.delegate && 
									that.delegate.callbackFunc && 
									that.delegate.callbackFunc.didMapMoveEnd instanceof Function) {
									that.delegate.callbackFunc.didMapMoveEnd(e, that);
								}
								
							});
							break;
							
						//줌 시작	
						case "zoomstart":
							this.gMap.on("zoomstart", function (e) {
								that.isZoomStart = true;
								if (that.delegate && 
									that.delegate.callbackFunc && 
									that.delegate.callbackFunc.didMapZoomStart instanceof Function) {
									that.delegate.callbackFunc.didMapZoomStart(e, that);
								}
							});
							break;
							
						//줌 종료
						case "zoomend":
							this.gMap.on("zoomend", function (e) {
								that.isZoomStart = true;
								that.zoom = e.target._zoom;
								that.bounds = e.target.getBounds();
								that.zoom = that.setZoomCalibrate(that.zoom, -6);
								var mapPolygonCode = 0;
	
								// 전국단위
								if (that.zoom <= 1) {
									mapPolygonCode = 1;
									that.curPolygonCode = mapPolygonCode;
									if (that.mapBtnInfo != null) {
										that.mapBtnInfo.changeZoomLevelTitle("전국");
									}
									
								}
								//시도단위 
								else if (that.zoom > 1 && that.zoom <= 3) {
									mapPolygonCode = 2;	
									that.curPolygonCode = mapPolygonCode;
									if (that.mapBtnInfo != null) {
										that.mapBtnInfo.changeZoomLevelTitle("시도");
									}
								}
								
								// 시구군단위
								else if (that.zoom > 3 && that.zoom <= 5) {
									mapPolygonCode = 3;
									that.curPolygonCode = mapPolygonCode;
									if (that.mapBtnInfo != null) {
										that.mapBtnInfo.changeZoomLevelTitle("시군구");
									}
								}
								
								// 동단위
								else if (that.zoom > 5 && that.zoom <= 8) {
									mapPolygonCode = 4;
									that.curPolygonCode = mapPolygonCode;
									if (that.mapBtnInfo != null) {
										that.mapBtnInfo.changeZoomLevelTitle("읍면동");
									}
								}
								
								// 집계구 단뒤
								else if (that.zoom > 8) {
									mapPolygonCode = 5;
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
							});
							break;
							
						//drop 이벤트
						case "drop":
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
							break;
						
						//사용자지정 이벤트
						case "draw":
							that.gMap.on("draw:created", function(e) {
								var layer = e.layer;	
								if (that.delegate && 
									that.delegate.callbackFunc && 
									that.delegate.callbackFunc.didDrawCreate instanceof Function) {
									that.delegate.callbackFunc.didDrawCreate(e, e.layerType, that);
								}
							});
							break;
						
						//사용자경계 삭제 이벤트
						case "delete":
							that.gMap.on("draw:deleted", function(e) {
								var layer = e.layer;	
								if (that.delegate && 
									that.delegate.callbackFunc && 
									that.delegate.callbackFunc.didDeletePolygon instanceof Function) {
									that.delegate.callbackFunc.didDeletePolygon(e, e.layerType, that);
								}
							});
							break;
							
						case "edit":
							that.gMap.on("draw:edited", function(e) {
								var layer = e.layer;	
								if (that.delegate && 
									that.delegate.callbackFunc && 
									that.delegate.callbackFunc.didDrawEdit instanceof Function) {
									that.delegate.callbackFunc.didDrawEdit(e, e.layerType, that);
								}
							});
							break;
						default:
							break;
					}					
				};

				/**
				 * 
				 * @name         : autoDownBoundary
				 * @description  : 줌인시 레벨별 경계를 가져온다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */	
				this.autoDownBoundary = function () {
					
					// 기존에 데이터경가 있으면 제거한다.
					if (this.dataGeojson != null) {
						this.dataGeojson.remove();		
						this.removeCaption();
						this.dataGeojson = null;
					}
					
					switch(parseInt(this.boundLevel)) {
						case 0:	//하위경계 0레벨
							this.isNoReverseGeocode = true;
							switch (this.curPolygonCode) {
								case 1:
									this.openApiBoundaryContry();
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
							break;
						case 1: //하위경계 1레벨
							this.isNoReverseGeocode = false;
							switch (this.curPolygonCode) {
								case 1:
									this.setZoom(2);
									break;
								case 2:
									this.setZoom(4);
									break;
								case 3:
									this.setZoom(7);
									break;
								case 4:
									this.setZoom(9);
									break;
								case 5:
									this.openApiBoundaryStatsarea(this.curDropCd, this.bnd_year);
									break;
								default:
									break;	
							}
							break;
						case 2:	//하위경계 2레벨
							this.isNoReverseGeocode = true;
							switch (this.curPolygonCode) {
								case 1:
									break;
								case 2:
									this.openApiBoundaryHadmarea(this.curDropCd, this.bnd_year, this.boundLevel, "0", function() {
										that.setZoom(7);
									});
									break;
								case 3:
									this.openApiBoundaryHadmarea(this.curDropCd, this.bnd_year, this.boundLevel, "0", function() {
										that.setZoom(9);
									});
									break;
								case 4:
									this.openApiBoundaryStatsarea(this.curDropCd, this.bnd_year, function() {
										that.setZoom(9);
									});
									break;
								case 5:
									this.openApiBoundaryStatsarea(this.curDropCd, this.bnd_year);
									break;
								default:
									break;	
							}
							break;
					}
				};
				
				/**
				 * 
				 * @name         : autoUpBoundary
				 * @description  : 줌아웃 시 레벨별 경계를 가져온다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */	
				this.autoUpBoundary = function () {
					switch (this.curPolygonCode) {
						case 2:
							this.setZoom(1);
							break;
						case 3:
							this.setZoom(3);
							break;
						case 4:
							this.setZoom(5);
							break;
						default:
							break;
					}
				};
				
				/**
				 * 
				 * @name         : setDroppedInfo
				 * @description  : drop된 위치를 저장한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */	
				this.setDroppedInfo = function() {
					this.dropInfo = {
							center : this.center,
							zoom : this.zoom
					}
				};
				
				/**
				 * 
				 * @name         : undoDropLayerBounds
				 * @description  : 최초 drop된 경계정보로 되돌린다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */	
				this.undoDropLayerBounds = function() {
					this.lastGeojsonInfo = null;
					if (this.dropInfo != null) {
						this.mapMove(this.dropInfo.center, this.dropInfo.zoom);
					}
				};
				
				/**
				 * 
				 * @name         : setStatsData
				 * @description  : 통계데이터 정보를 설정한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param type	 : 통계데이터 타입(일반:normal, 융합:combine)
				 * @param data	 : 통계데이터 정보
				 * @param showDataParamName : 표출명
				 * @param unit 	 : 단위
				 * @param length : 데이터 길이
				 */	
				this.setStatsData = function (type, data, showDataParamName, unit, length) {
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
					
					switch (type) {
					
						//일반 통계데이터일 경우
						case "normal":
							this.dataType = type;
							break;
							
						//두개 통계데이터를 융합할 경우
						case "combine":
							this.dataType = type;
							if (length == undefined) {
								if (this.combineData.length >= 2) {
									this.combineData = [];
								}
							}
							
							this.combineData.push(data);
							
							if (length != undefined && !isNaN(length)) {
								if (this.combineData.length == length) {
									this.data = this.combineData;
								}
							}else {
								if (this.combineData.length == 2) {
									this.data = this.combineData;
								}
							}
							break;
						default:
							break;
					}
				};
				
				/**
				 * 
				 * @name         : openApiBoundaryContry
				 * @description  : 남한경계 가져오기
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param callback : 콜백함수 정보
				 */	
				this.openApiBoundaryContry = function (callback) {
					if (that.lastGeojsonInfo != null) {
						if (that.lastGeojsonInfo.adm_cd == "" && that.lastGeojsonInfo.year == "") {
							return;
						}
					}
					
					var options = {
							isBeforSend : false 
					};
					
					$ajax.requestApi("/js/data/geo.js", options, function(res) {
						res["pAdmCd"] = "";
						var tmpOption = {
							year : "",
							adm_cd : ""
						};
						that.lastGeojsonInfo = tmpOption ;
						that.setPolygonDataGeojson(res);
	
						if (callback != undefined && callback != null && callback instanceof Function) {
							callback.call(undefined, that, res);
						}
					});
				};
				
				
				/**
				 * 
				 * @name         : openApiBoundarySido
				 * @description  : 전국시도경계 가져오기
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param year	 : 년도정보
				 * @param callback : 콜백함수 정보
				 */	
				this.openApiBoundarySido = function (year, callback) {
					if (that.lastGeojsonInfo != null) {
						if (that.lastGeojsonInfo.adm_cd == "00" && 
							that.lastGeojsonInfo.year == year) {
							return;
						}
					}
					
					var options = {
							isBeforSend : false 
					};
					
					$ajax.requestApi("/js/data/geo_sido_" + year + ".js", options, function(res) {
						res["pAdmCd"] = "00";
						var tmpOption = {
								year : year,
								adm_cd : "00"
						};
						that.lastGeojsonInfo = tmpOption ;
						that.setPolygonDataGeojson(res);
							
						if (callback != undefined && callback != null && callback instanceof Function) {
							callback.call(undefined, that, res);
						}
					});
				};
				
				/**
				 * 
				 * @name         : openApiBoundaryHadmarea
				 * @description  : 행정동경계 가져오기
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param adm_cd : 행정동코드
				 * @param year	 : 년도정보
				 * @param low_search : 하위경계레벨(0,1,2)
				 * @param atdrc_yn : 자치구여부
				 * @param callback : 콜백함수 정보
				 * @param bounds : 경계바운드 정보
				 */	
				this.openApiBoundaryHadmarea = function (adm_cd, year, low_search, atdrc_yn, callback, bounds) {
					var options = {
						isBeforSend : false,
						method : "GET",
						params : {
							accessToken : accessToken,
							adm_cd : adm_cd,
							year : year,
							low_search : low_search
						}
					};
					
					//자치구경계
					if ((atdrc_yn != undefined && atdrc_yn == "1") || this.atdrc_yn === "1") {
						options.params["borough"] = low_search;
					}
					
					//경계정보가 있을 경우
					if ( bounds != null && bounds != undefined ) {
						if (adm_cd=="") {
							adm_cd = "00";
						}
						
						var area = "";
						area = 'RECTANGLE(';
						area += bounds._southWest.x + ' ' + bounds._southWest.y + ',';
						area += bounds._northEast.x + ' ' + bounds._northEast.y;
						area += ')';
						
						options.params["area"] = area;
						options.params["zoom"] = that.zoom;
					}
					
					$ajax.requestApi(openApiPath + "/OpenAPI3/boundary/hadmarea.geojson", options, function(res, opt) {
						switch (parseInt(res.errCd)) {
							case 0:
								var tmpOption = opt.params;
								tmpOption["geojson"] = res;
								that.lastGeojsonInfo = tmpOption;
								
								res["pAdmCd"] = tmpOption.adm_cd;
								that.setPolygonDataGeojson(res);
					
								if (callback != undefined && callback != null && callback instanceof Function) {
									callback.call(undefined, that, res);
								}
								break;
							case -401:
								that.openApiBoundaryHadmarea(adm_cd, year, low_search, atdrc_yn, callback);
								if (callback != undefined && callback != null && callback instanceof Function) {
									callback.call(undefined, that, res);
								}
								break;
							default:
								break;
						}
					});
				};
				
				/**
				 * 
				 * @name         : openApiBoundaryStatsarea
				 * @description  : 집계구경계 가져오기
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param adm_cd : 행정동코드
				 * @param year	 : 년도정보
				 * @param callback : 콜백함수 정보
				 */	
				this.openApiBoundaryStatsarea = function (adm_cd, year, callback) {
					var options = {
						isBeforSend : false,
						method : "GET",
						params : {
							accessToken : accessToken,
							adm_cd : adm_cd,
							year : year,
						}
					};
					
					$ajax.requestApi(openApiPath + "/OpenAPI3/boundary/statsarea.geojson", options, function(res, opt) {
						switch (parseInt(res.errCd)) {
							case 0:
								var tmpOption = opt.params;
								tmpOption["geojson"] = res;
								that.lastGeojsonInfo = tmpOption;
								
								res["pAdmCd"] = tmpOption.adm_cd;
								that.setPolygonDataGeojson(res);

								if (callback != undefined && callback != null && callback instanceof Function) {
									callback.call(undefined, that, res);
								}
								break;
							case -401:
								that.openApiBoundaryStatsarea(adm_cd, year, callback);
								if (callback != undefined && callback != null && callback instanceof Function) {
									callback.call(undefined, that, res);
								}
								break;
							default:
								break;
						}
					});
				};
				
				/**
				 * 
				 * @name         : openApiReverseGeoCode
				 * @description  : 리버스지오코딩 정보가져오기
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param center : 지도중심좌표
				 * @param callback : 콜백함수 정보
				 */	
				this.openApiReverseGeoCode = function (center, callback) {
					var options = {
						method : "GET",
						isBeforSend : false,
						params : {
							accessToken : accessToken,
							addr_type : "20",
							x_coor : center[0],
							y_coor : center[1]
						}
					};
					
					$ajax.requestApi(openApiPath + "/OpenAPI3/addr/rgeocode.json", options, function(res, opt) {
						switch (parseInt(res.errCd)) {
							case 0:
								var result = res.result[0];
								that.curSidoCd = result.sido_cd;
								that.curSiggCd = result.sgg_cd;
								that.curDongCd = result.emdong_cd;
								that.curSidoNm = result.sido_nm;
								that.curSiggNm = result.sgg_nm;
								that.curDongNm = result.emdong_nm;
								
								if (that.mapNavigation != null) {
									that.mapNavigation.reverseOnSelectChange(that);
								}
								
								if (!that.isFixedBound) {
									that.isNoReverseGeocode = false;
								}

								if (callback != undefined && callback != null && callback instanceof Function) {
									callback.call(undefined, res);
								}
								break;
							case -401:
								if (center != undefined && center != null) {
									that.openApiReverseGeoCode(center, callback);
								}
								break;
							case -100:
								if (that.mapNavigation != null) {
									that.mapNavigation.notFoundData(that);
								}
								break;
							default:
								break;
						}
					});
				};

				/**
				 * 
				 * @name         : setLayerColor
				 * @description  : 레이어의 색상을 설정한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param feature: 레이어 속성정보
				 * @param layer  : 레이어 정보
				 */	
				this.setLayerColor = function (feature, layer) {
					switch (this.dataType) {
						//일반데이터일 경우,
						case "normal":
							feature["combine"] = false;
							if (feature.info) {
								for ( var x = 0; x < feature.info.length; x++) {
									if (feature.info[x].showData) {
										for (param in feature.info[x]) {
											if (param == feature.info[x].showData) {
												layer.setStyle({
													weight : layer.options.weight,
													color : layer.options.color,
													dashArray : layer.options.dashArray,
													fillOpacity : layer.options.fillOpacity,
													fillColor : that.legend.getColor(feature.info[x][param], that.legend.valPerSlice[x])[0]
												});
												break;
											}
										}
									}
								}
							}
							break;
							
						//kosis 데이터일 경우
						case "kosis":
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
							break;
							
						//결합데이터일 경우
						case "combine":
							var tmpLevel = new Array();	
							feature["combine"] = true;

							if (feature.info) {
								var total = feature.dataLength;
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
							
							var score = 0;
							var level = 0;
							for (var i=0; i<tmpLevel.length; i++) {
								score += tmpLevel[i];
								level += tmpLevel[i];
							}
							
							score = score / total;
							level = Math.ceil((level / total));
							feature["combineData"] = score * 20;
							
							layer.setStyle({
								weight : layer.options.weight,
								color : layer.options.color,
								dashArray : layer.options.dashArray,
								fillOpacity : layer.options.fillOpacity,
								fillColor : that.legend.getColorForLevel(level)
							});
							break;
						default:
							break;
					}
				};
				
				/**
				 * 
				 * @name         : checkShowCaption
				 * @description  : 캡션정보를 표출 또는 제거한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */	
				this.checkShowCaption = function () {
					if (this.legend.numberData && (this.dataGeojson != null || this.multiLayerControl.dataGeojson)) {
						this.setCaption();
					}else {
						this.removeCaption();
					}
				};
				
				/**
				 * 
				 * @name         : setCaption
				 * @description  : 캡션정보를 설정한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */	
				this.setCaption = function () {
					this.removeCaption();
					if (this.legend != undefined && this.legend.selectType == "bubble") {
						if (this.legend.circleMarkerGroup != undefined && this.legend.circleMarkerGroup.length > 0) {
							for (var i=0; i<this.legend.circleMarkerGroup.length; i++) {
								var layer = this.legend.circleMarkerGroup[i];
								layer.setCaption({title:appendCommaToNumber(layer.options.options.data), color:"white"});
							}
						}
					}else {
						if (this.dataGeojson != null) {
							this.dataGeojson.eachLayer(function(layer) {
								var x = layer.feature.properties.x;
								var y = layer.feature.properties.y;
								if (layer.feature.combine) {
									if (layer.feature.combineData != undefined) {
										layer.setCaption({title:appendCommaToNumber(layer.feature.combineData), color:"white"}, [x,y]);
									}else {
										layer.setCaption({title:"N/A", color:"#808080", showAllZoomLevel: false}, [x,y]);
									}
								}else if(layer.feature.info.length > 1) {
									layer.setCaption({title:appendCommaToNumber(layer.feature.info[0]), color:"white", showAllZoomLevel: false},[x,y]);
								}else {
									if (layer.feature.info.length > 0) {
										for (param in layer.feature.info[0]) {
											if (layer.feature.info[0].showData == param) {
												if (parseFloat(layer.feature.info[0][param]) < 5 && 
														param != "avg_age" &&
														param != "ppltn_dnsty" &&
														param != "aged_child_idx" && 
														param != "oldage_suprt_per" &&
														param != "juv_suprt_per" && 
														param != "tot_suprt_per" &&
														param != "tot_worker" &&
														param != "avg_fmember_cnt" &&
														param != "employee_cnt") {
													layer.setCaption({title:"N/A", color:"white"}, [x,y]);
												}else {
													layer.setCaption({title:appendCommaToNumber(layer.feature.info[0][param]), color:"white", showAllZoomLevel: false}, [x,y]);	
												}
												break;
											}
										}
									}else {
										layer.setCaption({title:"N/A", color:"#808080"}, [x,y]);
									}
								}
							});
						}

						if (this.multiLayerControl.dataGeojson != null) {
							for(var i=0; i<this.multiLayerControl.dataGeojson.length; i++) {
								var dataGeojson = this.multiLayerControl.dataGeojson[i];
								dataGeojson.eachLayer(function (layer) {
									if (layer.feature.info.length > 0) {
										for (param in layer.feature.info[0]) {
											if (layer.feature.info[0].showData == param) {
												layer.setCaption({title:appendCommaToNumber(layer.feature.info[0][param]), color:"white", showAllZoomLevel: false});
												break;
											}
										}
									}else {
										layer.setCaption({title:"N/A", color:"#808080"});
									}
								});
							}
						}
					}
				};
				
				/**
				 * 
				 * @name         : removeCaption
				 * @description  : 캡션정보를 삭제한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */	
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
					
					//버블일 경우, 캡션을 제거한다.
					if (this.legend != undefined && this.legend.selectType == "bubble") {
						if (this.legend.circleMarkerGroup != undefined && this.legend.circleMarkerGroup.length > 0) {
							for (var i=0; i<this.legend.circleMarkerGroup.length; i++) {
								var layer = this.legend.circleMarkerGroup[i];
								layer.removeCaption();
								layer.captionObj = null;
							}
						}
					}
				};
				
				/**
				 * 
				 * @name         : setPolygonDataGeojson
				 * @description  : 통계정보와 융합한 경계를 그린다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param geoData: 경계정보
				 */	
				this.setPolygonDataGeojson = function (geoData) {
					// 기존 경계 지우기
					if (this.geojson || this.boundLevel == "2") {
						
						//현재 경계코드와 geojson의 경계코드가 맞지않을 경우, 경계를 버린다.
						//pAdmCd는 현재경계의 상위 행정동코드로 이를 바탕으로 해당 경계의 임시경계코드를 정의하고,
						//현재 경계코드와 임시경계코드를 비교하여 그릴지 말지를 결정한다.
						if (geoData.pAdmCd != undefined) {
							switch(parseInt(this.boundLevel)) {
								case 1:
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
									
									break;
								case 2:
									//2레벨 조회일 경우, data 유무를 판별
									//1.data가 있을 때 : 2레벨 조회시로 간 주하여 진행
									//2.data가 없을 때 : 2레벨 조회 후, 센터 기준으로 일반 경계를 불러오는 것으로 간주하고, 경계를 표출하지 않음
									var tmpLayerCode = 5;
									var isDataLayer = false;
									if (this.data.length > 0) {
										isDataLayer = true;
									}
									switch (geoData.pAdmCd.length) {
										case 2:
											if (isDataLayer) {
												tmpLayerCode = 4;
											}else {
												tmpLayerCode = 3;
											}
											break;
										case 5:
											if (isDataLayer) {
												tmpLayerCode = 5;
											}else {
												tmpLayerCode = 4;
											}
											break;
										case 7:
											tmpLayerCode = 5;
											break;
									}

									var isContains = false;
									if (this.dataGeojson != null) {
										this.dataGeojson.eachLayer(function(layer) {
											 if( layer._containsPoint) {
												 var point = that.gMap.utmkToLayerPoint(that.gMap.getCenter());  
								                    if (layer._containsPoint(point)){
								                    	isContains = true;
								                    }
											 }
										});
										
										if (isContains && (tmpLayerCode == this.curPolygonCode)) {
											if (this.geojson) {
												this.geojson.remove();
												this.geojson = null;
											}
											return;
										}
									}
									break;
							}
							
						}
					
						if (this.geojson) {
							this.geojson.remove();
							this.geojson = null;
						}
					}
					
					// 경계데이터에 통계정보를 병합하고, 경계를 그린다.
					if (this.data.length > 0 && interactiveMapKosis != undefined) {
						if (this.data[0].kosis) {
							if (geoData.features.length == 0) {
								return;
							}
							
							if(this.data[0].pAdmCd < 2) {
								this.data[0].pAdmCd = "00";
							}
							
							if (geoData.pAdmCd != this.data[0].pAdmCd) {
								return;
							}
							geoData = interactiveMapKosis.combineKosisStatsData(geoData);
							
						} else {
							if (geoData.pAdmCd != this.data[0].pAdmCd) {
								return;
							}
							geoData = this.combineStatsData(geoData);
						}
					}

					if (geoData.combine && this.data.length > 0) {
						if (this.dataGeojson) {
							this.dataGeojson.remove();
							this.removeCaption();
							this.dataGeojson = null;
						}
						
						this.addPolygonGeoJson(geoData, "data");
						this.dataGeojsonLayer = geoData;
						
						if (this.legend != null) {
							this.legend.changeDataMode(this.legend.selectType);
						}
						this.checkShowCaption();
						
						if (this.isMiniMapDraw) {
							if (this.miniMap.geojson) {
								this.miniMap.geojson.remove();
								this.miniMap.geojson = null;
							}
							this.miniMap.mapMove([989674, 1818313], 8, false);
							this.miniMap.addPolygonGeoJson(geoData, "mini");
						}
					}
					else {
						this.addPolygonGeoJson(geoData, "polygon");
						
						// 데이터경계가 있을 경우,
						// 지역경계가 데이터경계와 같을 때, 해당 지역경계를 지운다.
						if (this.dataGeojson) {
							if (this.geojson.getBounds().equals(this.dataGeojson.getBounds())) {
								this.geojson.remove();
							}	
						}
						
						if (this.multiLayerControl != undefined && this.multiLayerControl.dataGeojson) {
							for (var i=0; i<this.multiLayerControl.dataGeojson.length; i++) {
								var dataGeojson = this.multiLayerControl.dataGeojson[i];
								if (this.geojson.getBounds().equals(dataGeojson.getBounds())) {
									this.geojson.remove();
								}	
							}
						}
					}
					
					if (this.data.length > 0) {
						if (this.data[0].kosis && interactiveMapKosis != undefined) {
							interactiveMapKosis.setResultDataOnMap();
						}
					}
			
					this.data = [];
					if (this.delegate && this.delegate.callbackFunc && this.delegate.callbackFunc.didFinishedHadmaArea instanceof Function) {
						this.delegate.callbackFunc.didFinishedHadmaArea(geoData, that);
					}
				};
				
				/**
				 * 
				 * @name         : combineStatsData
				 * @description  : 경계정보와 통계정보를 융합한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param boundData: 경계정보
				 * @param isPass : 시계열 제공 여부
				 */	
				this.combineStatsData = function (boundData, isPass) {
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
													boundData.features[i]["_dataIdx"] = that.data[k].result[x]["_dataIdx"];
													boundData.features[i]["dataLength"] = that.data.length;
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

					this.setLegendForStatsData(isPass);
					return boundData;
				},
				
				/**
				 * 
				 * @name         : setLegendForStatsData
				 * @description  : 범례정보를 설정한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param isPass : 시계열 제공 여부
				 */	
				this.setLegendForStatsData = function (isPass) {
					var arData = new Array();
					if (that.data.length > 0) {
						for ( var k = 0; k < that.data.length; k++) {
							var tmpData = new Array();
							if (that.data[k].showData) {
								if(that.data[k].result != null) {
									for ( var i = 0; i < that.data[k].result.length; i++) {
										for (key in that.data[k].result[i]) {
											if (key == that.data[k].showData) {
												
												//개인정보보호 때문에 특정 센서스 정보의 경우, 5미만은 4로 치환한다.
												if (key === "tot_ppltn" 	 ||	  //총인구
												    key === "tot_ppltn_male" ||   //총인구(남자)
												    key === "tot_ppltn_fem"  ||   //총인구(여자)
												    key === "population"     ||	  //인구
												    key === "household_cnt"  ||   //가구수
												    key === "house_cnt"      ||   //주택수
												    key === "farm_cnt"		 ||   //농가수
												    key === "forestry_cnt"   ||   //임가수
												    key === "fishery_cnt"    ||	  //어가수
												    key === "tot_family"     ||   //총가구
												    key === "tot_house"		 ||   //총주택
												    key === "nongga_cnt"     ||	  //농가(가구)
												    key === "nongga_ppltn"	 ||   //농가(인구)
												    key === "imga_cnt"		 ||   //임가(가구)
												    key === "imga_ppltn"     ||   //임가인구
												    key === "naesuoga_cnt"   ||   //내수면총어가
												    key === "naesuoga_ppltn" ||	  //해수면어가인구
												    key === "haesuoga_cnt"   ||   //해수면총어가
												    key === "haesuoga_ppltn" ||   //해수면어가인구
												    key === "corp_cnt"			  //사업체수 2016.03.24 수정. 사업체통계에서 5미만일 경우, N/A처리
												   ) {
													if (parseFloat(that.data[k].result[i][key]) < 5) {
														that.data[k].result[i][key] = 4;
													}
												}
												
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
				},
				
				this.convertFeatureData = function(data, showData, unit, type) {
					var featureCollection = {};
					featureCollection["features"] = [];
					featureCollection["type"] = "featureCollection";
					
					var features = [];
					
					if (type == "normal") {
						for (var i=0; i<data.length; i++) {
							var feature = {};
							feature["type"] = "Feature"; 
							feature["geometry"] = JSON.parse(data[i].geojson);
							data[i]["dataIdx"] = i;
							data[i]["unit"] = unit;
							feature["properties"] = data[i];
							features.push(feature);
						}
					}else {
						for (var i=0; i<data.length; i++) {
							var feature = {};
							feature["type"] = "Feature"; 
							feature["geometry"] = JSON.parse(data[i].geojson);
							feature["info"] = []; 
							data[i]["dataIdx"] = i;
							
							if (data[i].tot_oa_cd != undefined) {
								data[i].adm_cd = data[i].tot_oa_cd;
							}
							
							//행정동코드가 없을 경우
							if (data[i].adm_cd == undefined || data[i].adm_cd == null) {
								data[i].adm_cd = "-";
							}
							
							//행정동명이 없을 경우
							if (data[i].adm_nm == undefined || data[i].adm_nm == null || data[i].adm_nm.length == 0) {
								data[i].adm_nm = "경계" + (i+1);
							}
							
							var info = {
									adm_cd : data[i].adm_cd,
									adm_nm : data[i].adm_nm,
									x : data[i].x,
									y : data[i].y,
									data : data[i][showData],
									showData : "data",
									unit : unit,
									dataIdx : data[i].dataIdx
							};
							feature["properties"] = info;
							feature.info.push(info);
							features.push(feature);
						}
					}
					featureCollection.features = features;
					return featureCollection;
				}
				
				////////////////////////////////////////////////////////////////////////////
				//====================== 다중선택 컨트롤러 START =========================//
				////////////////////////////////////////////////////////////////////////////
				this.multiLayerControl = {
					multiData : null,
					dataGeojson : null,
					
					/**
					 * 
					 * @name         : clear
					 * @description  : 초기화한다.
					 * @date         : 2018. 08. 02. 
					 * @author	     : 권차욱
					 * @history 	 :
					 */	
					clear : function () {
						if (this.dataGeojson != null) {
							for (var i=0; i<this.dataGeojson.length; i++) {
								this.dataGeojson[i].remove();
							}
						}
						this.multiData = null;
						this.dataGeojson = null;
					},
					
					/**
					 * 
					 * @name         : setStatsData
					 * @description  : 통계정보를 설정한다.
					 * @date         : 2018. 08. 02. 
					 * @author	     : 권차욱
					 * @history 	 :
					 * @param type 	 : 타입정보(normal, combine)
					 * @param data   : 데이터정보
					 * @param options: 옵션정보
					 * @param isShare: 공유정보
					 */	
					setStatsData : function (type, data, options, isShare) {
						var showDataParamName = "";
						var unit = "";
						var adm_cd = "";
						var length = 0;
						if (isShare) {
							showDataParamName = options.params.param_info.showData;
							unit = options.params.param_info.unit;
							adm_cd = options.adm_cd;
							length = options.params.param_info.paramInfo.adm_cd.split(",").length;
						}else {
							showDataParamName = options.params.filter;
							unit = options.params.unit;
							adm_cd = options.params.adm_cd;
							if (that.selectedBoundList != null) {
								if (that.selectedBoundList[0].feature != undefined) {
									var tmpAdmCdList = [];
									var tmpSortAdmCdList = [];
									for (var i=0; i<that.selectedBoundList.length; i++) {
										var tmpAdmCd = that.selectedBoundList[i].feature.properties.adm_cd;
										if (tmpAdmCd.length > 7) {
											tmpAdmCd = tmpAdmCd.substring(0,7);
										}
										tmpAdmCdList.push(tmpAdmCd);
									}
									
									$.each(tmpAdmCdList, function(i, el){
										if($.inArray(el, tmpSortAdmCdList) === -1) tmpSortAdmCdList.push(el);
									});
									length = tmpSortAdmCdList.length;
								}else {
									length = that.selectedBoundList.length;
								}	
							}
						}
						
						if (this.multiData == null) {this.multiData = [];}
						if (this.dataGeojson == null) {this.dataGeojson = [];}
						
						if (data != null) {
							if (showDataParamName != null && showDataParamName.length > 0) {
								data["showData"] = showDataParamName;
							}
							if (unit != null && unit.length > 0) {
								data["unit"] = unit;
							}
							this.reqBoundary(adm_cd, data, "0", function() {
								if (that.multiLayerControl.multiData.length == length) {
									if (that.geojson) {
										that.geojson.remove();
									}
									var tmpMultiData = [];
									var admCdList = [];
									var tmpAdmCd = that.multiLayerControl.multiData[0].data.pAdmCd
									tmpMultiData.push(that.multiLayerControl.multiData[0]);
									admCdList.push(that.multiLayerControl.multiData[0].layer.pAdmCd);
									
									for (var i=1; i<that.multiLayerControl.multiData.length; i++) {
										var adm_cd = that.multiLayerControl.multiData[i].layer.pAdmCd;
										admCdList.push(adm_cd);
										if (tmpAdmCd != adm_cd) {
											tmpMultiData.push(that.multiLayerControl.multiData[i]);
										}
									}
									that.multiLayerControl.multiData = tmpMultiData;
									that.dataForCombine = that.multiLayerControl.multiData;
									if (that.isMultiControlDownBoundary) {
										that.multiLayerControl.autoDownBoundary();
									}
									that.multiLayerControl.setPolygonDataGeojson(that.multiLayerControl.multiData);
									if (that.legend != null) {
										that.legend.changeDataMode(that.legend.selectType);
									}
									that.checkShowCaption();
									
									if (that.shareInfo != null) {
										if (isShare) {
											that.shareInfo.setShareInfo(options, "share", that.id);
										}else {
											options["zoomlevel"] = that.zoom;
											options["center"] = that.center;
											options["btntype"] = "normal";
											if (options.params.param) {
												options.params.param.push({"key" : "adm_cd", "value" : admCdList.join()});
											}
											options.params.adm_cd = admCdList.join();
											that.shareInfo.setShareInfo(options, "normal", that.id);
										}
									}
									
									// multilayer 콜백
									if (that.delegate && 
										that.delegate.callbackFunc &&
										that.delegate.callbackFunc.didFinishedMultidata) {
										that.delegate.callbackFunc.didFinishedMultidata(that.multiLayerControl.multiData, admCdList, that);
									}
									
									tmpMultiData = null;
									admCdList = null;
									that.isMultiControlDownBoundary = true;
								}
							});
						}
					},
					
					/**
					 * 
					 * @name         : reqBoundary
					 * @description  : 경계정보를 호출한다.
					 * @date         : 2018. 08. 02. 
					 * @author	     : 권차욱
					 * @history 	 :
					 * @param adm_cd : 행정동코드
					 * @param data   : 데이터정보
					 * @param atdrc_yn : 자치구 여부
					 * @param callback : 콜백함수
					 */	
					reqBoundary : function(adm_cd, data, atdrc_yn, callback) {
						switch(parseInt(that.boundLevel)) {
							case 0:	//하위경계 0레벨
								switch (that.curPolygonCode) {
									case 1:
										this.openApiBoundaryContry(data, callback);
										break;
									case 2:
									case 3:
									case 4:
										this.openApiBoundaryHadmarea(adm_cd, that.bnd_year, that.boundLevel, data, atdrc_yn, callback);
										break;
									case 5:
										this.openApiBoundaryStatsarea(adm_cd, that.bnd_year, data, callback);
										break;
									default:
										break;	
								}
								break;
							case 1: //하위경계 1레벨
								switch (that.curPolygonCode) {
									case 1:
										this.openApiBoundarySido(that.bnd_year, data, callback);
										break;
									case 2:
									case 3:
										this.openApiBoundaryHadmarea(adm_cd, that.bnd_year, "1", data, atdrc_yn, callback);
										break;
									case 4:
									case 5:
										this.openApiBoundaryStatsarea(adm_cd, that.bnd_year, data, callback);
										break;
									default:
										break;	
								}
								break;
							case 2:	//하위경계 2레벨
								switch (that.curPolygonCode) {
									case 1:
										break;
									case 2:
									case 3:
										this.openApiBoundaryHadmarea(adm_cd, that.bnd_year, that.boundLevel, data, atdrc_yn, callback);
										break;
									case 4:
									case 5:
										this.openApiBoundaryStatsarea(adm_cd, that.bnd_year, data, callback);
										break;
									default:
										break;	
								}
								break;
						}

					},
					
					/**
					 * 
					 * @name         : autoDownBoundary
					 * @description  : 줌인 시, 경계를 호출한다.
					 * @date         : 2018. 08. 02. 
					 * @author	     : 권차욱
					 * @history 	 :
					 */	
					autoDownBoundary : function () {
						that.setBoundSelectedMoode(null);

						if (that.dataGeojson != null) {
							that.dataGeojson.remove();		
							that.removeCaption();
							that.dataGeojson = null;
						}

						switch(parseInt(that.boundLevel)) {
							case 1: //하위경계 1레벨
								switch (that.curPolygonCode) {
									case 1:
										that.setZoom(2);
										break;
									case 2:
										that.setZoom(4);
										break;
									case 3:
										that.setZoom(7); 
										break;
									case 4:
										that.setZoom(9);
										break;
									default:
										break;	
								}
								break;
							case 2:	//하위경계 2레벨
								switch (that.curPolygonCode) {
									case 1:
										break;
									case 2:
										that.setZoom(7);
										break;
									case 3:
										that.setZoom(9);
										break;
									case 4:
										that.setZoom(9);
										break;
									case 5:
										break;
									default:
										break;	
								}
							break;
						}
					},
					
					/**
					 * 
					 * @name         : setPolygonDataGeojson
					 * @description  : 융합된 경계정보를 표출한다.
					 * @date         : 2018. 08. 02. 
					 * @author	     : 권차욱
					 * @history 	 :
					 * @param Ldata  : 통계데이터
					 */	
					setPolygonDataGeojson : function (Ldata) {
						var tmpLegendData = [];
						for (var i=0; i<Ldata.length; i++) {
							var showData = Ldata[i].data.showData;
							for (var k=0; k<Ldata[i].data.result.length; k++) {
								var tmpData = Ldata[i].data.result[k];
								tmpLegendData.push(parseFloat(tmpData[showData]));
							}
						}

						var legendData = [];
						legendData.push(tmpLegendData);
						that.legend.valPerSlice = that.legend.calculateLegend(legendData);
						
						var tmpDataGeojsonLayer = [];
						for (var i=0; i<Ldata.length; i++) {
							var tmpData = Ldata[i];
							tmpData.layer = this.combineStatsData(Ldata[i]);
							if (tmpData.layer.combine) {
								this.dataGeojson.push(that.addPolygonGeoJson(tmpData.layer, "data"));
								tmpDataGeojsonLayer.push(tmpData.layer);
							}
							
							if (tmpData.data.kosis) {
								interactiveMapKosis.setResultDataOnMap();
							}
						}
						
						that.dataGeojson = null;
						that.dataGeojsonLayer = tmpDataGeojsonLayer;
						that.checkShowCaption();
						
						if (that.isMiniMapDraw) {
							if (that.miniMap.geojson) {
								that.miniMap.geojson.remove();
								that.miniMap.geojson = null;
							}
							that.miniMap.mapMove([989674, 1818313], 8, false);
							that.miniMap.addPolygonGeoJson(geoData, "mini");
						}
	
						this.Ldata = [];
					},
					
					/**
					 * 
					 * @name         : combineStatsData
					 * @description  : 통계정보를 융합한다.
					 * @date         : 2018. 08. 02. 
					 * @author	     : 권차욱
					 * @history 	 :
					 * @param Ldata  : 통계데이터
					 */	
					combineStatsData : function (Ldata) {
						var data = Ldata.data;
						var boundData = Ldata.layer;
						if (data != null) {
							boundData["combine"] = true;
						}else {
							boundData["combine"] = false;
						}
						
						for ( var i=0; i<boundData.features.length; i++) {
							var adm_cd = boundData.features[i].properties.adm_cd;
							if (boundData.features[i].info == null) {
								boundData.features[i]["info"] = [];
							}
							
							if (data != null) {
								if (data.result != null) {
									for ( var x=0; x<data.result.length; x++) {
										for (key in data.result[x]) {
											if (key == "adm_cd") {
												if (adm_cd == data.result[x].adm_cd) {
													data.result[x]["showData"] = data.showData;
													data.result[x]["api_id"] = data.id;
													data.result[x]["unit"] = data.unit;
													data.result[x]["legendIndex"] = 0;
													data.result[x]["adm_nm"] = boundData.features[i].properties.adm_nm;
													boundData.features[i].info.push(data.result[x]);
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
						return boundData;
					},
					
					/**
					 * 
					 * @name         : openApiBoundaryContry
					 * @description  : 전국경계를 조회한다.
					 * @date         : 2018. 08. 02. 
					 * @author	     : 권차욱
					 * @history 	 :
					 * @param data   : 통계데이터
					 * @param callback : 콜백함수
					 */	
					openApiBoundaryContry : function (data, callback) {
						var options = {
								isBeforSend : false 
						};
						
						$ajax.requestApi("/js/data/geo.js", options, function(res) {
							 res["pAdmCd"] = "";
							 that.multiLayerControl.multiData.push({
								 data : data,
								 layer : res
							 });
							 
							 if (callback != undefined && callback != null && typeof callback === "function") {
								 callback.call(undefined, res);
							 }
						});
					},
					
					/**
					 * 
					 * @name         : openApiBoundarySido
					 * @description  : 전국시도경계를 조회한다.
					 * @date         : 2018. 08. 02. 
					 * @author	     : 권차욱
					 * @history 	 :
					 * @param year   : 년도정보
					 * @param data   : 통계데이터
					 * @param callback : 콜백함수
					 */	
					openApiBoundarySido : function (year, data, callback) {
						var options = {
								isBeforSend : false 
						};
						
						$ajax.requestApi("/js/data/geo_sido_" + year + ".js", options, function(res) {
							 res["pAdmCd"] = "00";
							 that.multiLayerControl.multiData.push({
								  data : data,
								  layer : res
							 });
							 
							 if (callback != undefined && callback != null && typeof callback === "function") {
								 callback.call(undefined, res);
							 }
						});
					},
					
					/**
					 * 
					 * @name         : openApiBoundaryHadmarea
					 * @description  : 행정동 경계를 조회한다.
					 * @date         : 2018. 08. 02. 
					 * @author	     : 권차욱
					 * @history 	 :
					 * @param adm_cd : 행정동코드
					 * @param year   : 년도정보
					 * @param low_search : 하위레벨
					 * @param data   : 통계데이터
					 * @param atdrc_yn : 자치구여부
					 * @param callback : 콜백함수
					 */	
					openApiBoundaryHadmarea : function (adm_cd, year, low_search, data, atdrc_yn, callback) {
						var options = {
								isBeforSend : true,
								method : "GET",
								params : {
									accessToken : accessToken, 
									adm_cd : adm_cd, 
									year : year, 
									low_search : low_search,
								}
						};
						
						if (atdrc_yn != undefined && atdrc_yn == "1") {
							options.params["borough"] = "1";
						}
						
						$ajax.requestApi(openApiPath + "/OpenAPI3/boundary/hadmarea.geojson", options, function(res) {
							switch(parseInt(res.errCd)) {
								case 0:
									res["pAdmCd"] = adm_cd;
									if (that.multiLayerControl.multiData != null) {
										that.multiLayerControl.multiData.push({
											data : data,
											layer : res
										});
									}
									if (callback != undefined && callback != null && typeof callback === "function") {
										callback.call(undefined, res, that);
									}
									break;
								case -401:
									that.multiLayerControl.openApiBoundaryHadmarea(adm_cd, year, low_search, data, atdrc_yn, callback);
									break;
								default:
									break;
							}
						});
					},
					
					/**
					 * 
					 * @name         : openApiBoundaryStatsarea
					 * @description  : 집계구경계를 조회한다.
					 * @date         : 2018. 08. 02. 
					 * @author	     : 권차욱
					 * @history 	 :
					 * @param adm_cd : 행정동코드
					 * @param year   : 년도정보
					 * @param data   : 통계데이터
					 * @param callback : 콜백함수
					 */	
					openApiBoundaryStatsarea : function (adm_cd, year, data, callback) {
						var options = {
								isBeforSend : true,
								method : "GET",
								params : {
									accessToken : accessToken, 
									adm_cd : adm_cd, 
									year : year
								}
						};
						
						$ajax.requestApi(openApiPath + "/OpenAPI3/boundary/statsarea.geojson", options, function(res) {
							switch(parseInt(res.errCd)) {
								case 0:
									res["pAdmCd"] = adm_cd;
									if (that.multiLayerControl.multiData != null) {
										that.multiLayerControl.multiData.push({
											data : data,
											layer : res
										});
									}
								  
									if (callback != undefined && callback != null && typeof callback === "function") {
										callback.call(undefined, res);
									}
									break;
								case -401:
									that.multiLayerControl.openApiBoundaryStatsarea(adm_cd, year, data, callback);
									break;
								default:
									break;
							}
						});
					}
				};
				////////////////////////////////////////////////////////////////////////////
				//======================= 다중선택 컨트롤러 END ==========================//
				////////////////////////////////////////////////////////////////////////////
				
				
				////////////////////////////////////////////////////////////////////////////
				//============================ 열지도 컨트롤러 START ===========================//
				////////////////////////////////////////////////////////////////////////////
				/**
				 * 
				 * @name         : createHeatMap
				 * @description  : 열지도를 생성한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param options : 옵션정보
				 */	
				this.createHeatMap = function(options) {
					var minOpacity = 0.01;
					var radius = this.heatRadius;
					var blur = this.heatBlur;
					var zoomLevelHeat = this.zoomLevelHeat;
					var max = 1;
					
					if (options != undefined) {
						if (options.minOpacity != undefined) {minOpacity = options.minOpacity;}
						if (options.radius != undefined) {radius = options.radius;}
						if (options.blur != undefined) {blur = options.blur;}
						if (options.max != undefined) {max = options.max;}
						if (options.zoomLevelHeat != undefined) {zoomLevelHeat = options.zoomLevelHeat;}
					}
					var heat = sop.heatLayer();
					heat.addTo(this.gMap);
					heat.setOptions({
						minOpacity: minOpacity,
						radius: radius,
						blur: blur,
						max: max,
						zoomLevelHeat : zoomLevelHeat
					});
					
					this.heatMap = heat;
				};
				
				/**
				 * 
				 * @name         : addHeatMap
				 * @description  : 열지도에 데이터를 추가한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param x 	 : x좌표
				 * @param y	     : y좌표
				 * @paran data	 : 데이터정보
				 */	
				this.addHeatMap = function(x, y, data) {
					if (this.heatMap) {
						this.heatMap.addUTMK([
							 parseFloat(x),
							 parseFloat(y),
							 data
						]);
					}
				};
				
				/**
				 * 
				 * @name         : setHeatMapOptions
				 * @description  : 열지도의 옵션정보를 설정한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param radius : 반지름
				 * @param blur	 : 투명도
				 * @paran max	 : 가중치정보
				 */	
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
			},
			////////////////////////////////////////////////////////////////////////////
			//============================= 열지도 컨트롤러 END ============================//
			///////////////////////////////////////////////////////////////////////////
			
			////////////////////////////////////////////////////////////////////////////
			//============================ 미니맵 컨트롤러 START ===========================//
			///////////////////////////////////////////////////////////////////////////
			miniMap : function() {
				var that = this;
				this.delegate = null;
				this.target = null;
				this.center = null;
				this.zoom = null;
				this.gMap = null;
				this.geojson = null;
				this.isMouseOver = false;
				this.isDrop = false;
				this.isZoomStart = false;
				this.data = [];
				this.curSelectedLayer = null;
				this.legendColor = null;
				this.id = null;
		
				/**
				 * 
				 * @name         : createMap
				 * @description  : 미니맵을 생성한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param delegate : 타겟객체
				 * @param target : 타켓 엘리먼트
				 * @paran opt	 : 옵션정보
				 */	
				this.createMap = function (delegate, target, opt) {
					if (opt !== undefined && opt.center != undefined) {
						this.center = opt.center;
					}
					else {
						this.center = [ 953427, 1950827 ];
					}
					
					if (delegate) {this.delegate = delegate;}
					if (target) {this.target = target;}	
					if (opt !== undefined && opt.zoom !== undefined) {
						this.zoom = opt.zoom;
					}else {
						this.zoom = 5;
					}

					this.gMap = sop.map(this.target, {
						ollehTileLayer: false,
						scale: false, // 축적 컨트롤
						panControl: false, // 지도이동 컨트롤
						zoomSliderControl: false, //줌 컨트롤
						measureControl: false, // 측정 컨트롤 (면적, 길이)
						attributionControl: false // 지도속성 컨트롤

					});
					this.gMap.setView(this.center, this.zoom);
					
					var tileLayer = this.gMap.statisticTileLayer;
					var blankLayer = new sop.BuildingLayer();
					this.gMap.removeLayer(tileLayer);
					blankLayer.addTo(this.gMap);
					
				};
				
				/**
				 * 
				 * @name         : mapMove
				 * @description  : 지도를 이동한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param center : 중심좌표
				 * @param zoom   : 줌 레벨
				 * @paran animate: 애니메이션 여부
				 */	
				this.mapMove = function (center, zoom, animate) {
					if (animate == null) {
						animate = false;
					}
					
					if (center != null) {
						this.center = center;
						
						if (zoom != null) {
							this.zoom = zoom;
							this.gMap.setView(sop.utmk(center[0], center[1]), zoom, {
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
				
				/**
				 * 
				 * @name         : eventAllDiabled
				 * @description  : 지도이벤트 disable
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */	
				this.eventAllDiabled = function() {
						this.gMap.dragging.disable();
						this.gMap.touchZoom.disable();
						this.gMap.doubleClickZoom.disable();
						this.gMap.scrollWheelZoom.disable();
				},
				
				/**
				 * 
				 * @name         : setPolygonGeoJsonStyle
				 * @description  : 지도이벤트 disable
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param type	 : 경계정보 스타일을 설정한다.
				 */	
				this.setPolygonGeoJsonStyle = function (type) {			
					// 일반경계일 경우, 색상을 채우지않고,
					// 데이터경계일 경우, 색상을 채운다.
					var color = "#ffb2a5";
					var fillColor = "#F0FFF0";
					var fillOpacity = 0.7;
					var weight = 1;
					
					return {
						weight : weight,
						opacity : 1,
						color : color,
						fillOpacity : fillOpacity,
						fillColor : fillColor
					};
				};
				
				/**
				 * 
				 * @name         : addPolygonGeoJson
				 * @description  : 경계정보를 생성한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param obj	 : 경계정보
				 * @param type	 : 경계정보 스타일을 설정한다.
				 */	
				this.addPolygonGeoJson = function (obj, type) {
					var geojson = sop.geoJson(obj, {
						style : this.setPolygonGeoJsonStyle(type),
						onEachFeature : function (feature, layer) {
							that.setLayerColor(feature, layer);	
							layer.on({
								mouseover : function (e) {
									that.isMouseOver = true;		
									that.setPolyLayerMouseover(e);
									
									// mouse over , 사용자 콜백
									if (that.delegate && 
										that.delegate.callbackFunc &&
										that.delegate.callbackFunc.didMouseOverPolygon) {
										that.delegate.callbackFunc.didMouseOverPolygon(e, feature, layer.options.type, that);
									}
									
								},
								mouseout : function (e) {
									that.isMouseOver = false;
									that.setPolyLayerMouseout(e);
									
									// mouse out, 사용자 콜백
									if (that.delegate && 
										that.delegate.callbackFunc &&
										that.delegate.callbackFunc.didMouseOutPolygon) {
										that.delegate.callbackFunc.didMouseOutPolygon(e, feature, layer.options.type, that);
									}
									
								},
								click : function (e) {
									var layer = e.target;
									if (!sop.Browser.ie) {
										layer.bringToFront();
									}

									if (that.delegate && 
										that.delegate.callbackFunc && 
										that.delegate.callbackFunc.didSelectedPolygon) {
										that.delegate.callbackFunc.didSelectedPolygon(e, feature, layer.options.type, that);
									}
									
								},
							
							});
						},
						type : type, // 일반경계인지, 데이터경계인지 구분
					
					});
					
					this.geojson = geojson;
					this.geojson.addTo(this.gMap);
					this.gMap.fitBounds(geojson.getBounds());
				};
				
				/**
				 * 
				 * @name         : setLayerColor
				 * @description  : 레이어 색성을 설정한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param feature: 레이어 속성정보
				 * @param layer	 : 레이어 정보 
				 */	
				this.setLayerColor = function (feature, layer) {
					feature["combine"] = false;
					if (feature.info) {
						for ( var x = 0; x < feature.info.length; x++) {
							if (feature.info[x].adm_cd == feature.properties.adm_cd) {
								layer.setStyle({
									weight : layer.options.weight,
									color : layer.options.color,
									dashArray : layer.options.dashArray,
									fillOpacity : layer.options.fillOpacity,
									fillColor : "#ff2400"
								});
							}
						}
					}
				};

				/**
				 * 
				 * @name         : setPolyLayerMouseover
				 * @description  : 마우스 오버시, 레이어 스타일 정보를 설정한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param feature: 레이어 속성정보
				 * @param layer	 : 레이어 정보 
				 */	
				this.setPolyLayerMouseover = function (e) {
					var layer = e.target;
					layer.setStyle({
						weight : 1,
						color : "#0086C6",
						dashArray : layer.options.dashArray,
						fillOpacity : layer.options.fillOpacity,
						fillColor : layer.options.fillColor
					});
					
					if (!sop.Browser.ie) {
						layer.bringToFront();
					}
				};
				
				/**
				 * 
				 * @name         : setPolyLayerMouseout
				 * @description  : 마우스 아웃시, 레이어 스타일 정보를 설정한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param e      : 이벤트
				 */	
				this.setPolyLayerMouseout = function (e) {
					var layer = e.target;
					var color = "#FFB2A5";
					var weight = 1;

					layer.setStyle({
						weight : weight,
						color : color,
						dashArray : layer.options.dashArray,
						fillOpacity : layer.options.fillOpacity,
						fillColor : layer.options.fillColor
					});
						
					if (!sop.Browser.ie) {
						layer.bringToBack();
					}
				};
				
				/**
				 * 
				 * @name         : addControlEvent
				 * @description  : 미니맵의 이벤트를 등록한다.
				 * @date         : 2018. 08. 02. 
				 * @author	     : 권차욱
				 * @history 	 :
				 * @param type   : 이벤트 타입
				 * @param opt	 : 옵션정보
				 */	
				this.addControlEvent = function (type, opt) {
					switch (type) {
						//지도이동 시작 이벤트
						case "movestart":
							this.gMap.on("movestart", function (e) {
								if (that.delegate && 
									that.delegate.callbackFunc && 
									that.delegate.callbackFunc.didMapMoveStart instanceof Function) {
									that.delegate.callbackFunc.didMapMoveStart(e, that);
								}
							});
							break;
						//지도이동 종료 이벤트
						case "moveend":
							this.gMap.on("moveend", function (e) {
								var center = e.target.getCenter();
								that.center = [ center.x, center.y ];
								that.bounds = e.target.getBounds();
								
								if (that.delegate && 
									that.delegate.callbackFunc && 
									that.delegate.callbackFunc.didMapMoveEnd instanceof Function) {
									that.delegate.callbackFunc.didMapMoveEnd(e, that);
								}
							});
							break;
						//지도 줌 시작 이벤트
						case "zoomstart":
							this.gMap.on("zoomstart", function (e) {
								that.isZoomStart = true;
								if (that.delegate && 
									that.delegate.callbackFunc && 
									that.delegate.callbackFunc.didMapZoomStart instanceof Function) {
									that.delegate.callbackFunc.didMapZoomStart(e, that);
								}
							});
							break;
							
						//지도 줌 종료 이벤트
						case "zoomend":
							this.gMap.on("zoomend", function (e) {
								that.zoom = e.target._zoom;
								if (that.delegate && 
								    that.delegate.callbackFunc &&
								    that.delegate.callbackFunc.didMapZoomEnd instanceof Function) {
									that.delegate.callbackFunc.didMapZoomEnd(e, that);
								}
							});
							break;
						default:
							break;
					}
				};
			}
			
	};

}(window, document));
