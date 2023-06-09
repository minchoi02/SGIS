/**
 * 맵에 관한 공통 메소드
 * bnd_year
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
				this.bizStatsChart = null;
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
				this.isInnerMapShow = false;
				this.center = null;			// center 좌표(utmk)
				this.zoom = 4;			    // zoom level
				this.geojson = null;
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
//				this.miniMap = null;
				this.isMiniMapDraw = false; 
				this.isTradeMapShow = false;
//				this.isZoomSliderControl = true;
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
				
				
				
				
//				테스트 메소드
				this.openInitStatData = null;
				this.getThemaMapData = null;
				this.getThemaMapBaseYear = null;
				this.getRegionData = null; //DB에서 경계데이터를 가져옴
				// 테스트 메소드 변수
				this.thema_map_data_id = "";
				this.stat_thema_map_id = "";
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
				this.stat_data_base_year = ""; // 데이터 년도
				this.sep_map_data_year = ""; // 분할맵 년도
				this.sep_map_data_id = ""; // 분할맵 데이터 ID
				this.sep_map_sep_left_sep_nm = ""; // 분할맵 표출정보 A 명
				this.sep_map_sep_left_sep_unit = ""; // 분할맵 표출정보 A 단위
				this.sep_map_sep_right_sep_nm = ""; // 분할맵 표출정보 B 명
				this.sep_map_sep_right_sep_unit = ""; // 분할맵 표출정보 B 단위
				this.sep_map_sep_left_sep_ttip_title = ""; // 분할맵 표출정보 A 툴팁 타이틀
				this.sep_map_sep_right_sep_ttip_title = ""; // 분할맵 표출정보 B 툴팁 타이틀
				this.sep_map_sep_left_sep_source = ""; // 분할맵 표출정보 A 출처
				this.sep_map_sep_right_sep_source = ""; // 분할맵 표출정보 B 출처
				this.base_year_list = null;  //기준년도 리스트
				this.selectBaseYear = null; 
				this.changeRegionBound = null;
				this.setDataBoard = null; // 데이타보드 메소드
				this.selectedAdmCd = ""; // 마우스 over될때 선택된 admcd
				this.clickMode = null;
				//주제도 설정용 시도, 시구군, 읍면동 지역경계 Data
				this.regionData = null;
				this.i = 0; // 경계 검색 for문 인덱스
				this.dataBoardData = null; // 데이터보드용 리스트
				this.isReloadMode = false;
				this.dataGeoJsonArray = [];
				
				this.thema_legend_values = [];
				this.thema_legend_type = null;
				// 데이터 년도
				this.thema_stat_data_base_year = null;
				// 자치구년도
				this.thema_atdrc_yn = null;
				this.boundary_fix_yn = null;
				
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
					$thematicMapFrame06.ui.dataGeoJson = [];
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
						statisticTileLayer : true
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
					var that = this;
					if(that.id=='0'){
						var infoControl = sop.control({position: 'topright'});
					}else{						
						var infoControl = sop.control({position: 'topleft'});
					}
					infoControl.onAdd = function (map) {
						this._div = sop.DomUtil.create('div', 'info_control');
						sop.DomEvent.disableClickPropagation(this._div);
						this.update();
						$(this._div).attr("id", 'infoControl_' + that.id);
					    that.infoControlDiv = this._div;
						return this._div;
					};

					infoControl.update = function (props) {
					
						if (props) {
							if (props == "null" || props == undefined) {
								content = "<table style='margin:10px;'>";
								content += "<tr><td class='admName'>"+props.properties.adm_nm + "</td></tr>"+"<tr>"; 
								content += "<td class='statsData'>"+props.info[0].base_year + "년"+" "+props.info[0].left_sep_ttip_title; 
								content += "&nbsp;&nbsp;:&nbsp;&nbsp;N/A</td></tr></table>";
								
							//mng_s 20210126 이진호
							//분할뷰에서 지도에 mouseover 하지 않았을 경우 props 값은 init을 받게 하여
							//leftMap과 rightMap의 정보를 알려줌
							}else if(props == "init"){
								var map_id = that.id;
								if(map_id == "0"){ //leftMap
									content = "<table style='margin:10px;'>";
									content += "<tr><td class='statsData'>"+that.initData.stat_data_base_year+"년 "+that.initData.left_sep_ttip_title+"</td></tr></table>"; 
								}else if (map_id == "1"){//rightMap
									content = "<table style='margin:10px;'>";
									content += "<tr><td class='statsData'>"+that.initData.stat_data_base_year+"년 "+that.initData.sep_map_left_sep_ttip_title+"</td></tr></table>"; 
								}
							//mng_e 20210126 이진호
								
							}else if(props.info.length != 0){
								var content
								if($("#selectValue").val() == "leftValue"){
									content = "<table style='margin:10px;'>";
									content += "<tr><td class='admName'>"+props.properties.adm_nm + "</td></tr>"+"<tr>"; 
									content += "<td class='statsData'>"+props.info[0].base_year + "년"+" "+props.info[0].left_sep_ttip_title; 
									content += "&nbsp;&nbsp;:&nbsp;&nbsp;"+appendCommaToNumber(parseFloat(props.info[0].left_data_val)) + " (" +props.info[0].unit+ ")"+"</td></tr></table>";
								}else{
									content = "<table style='margin:10px;'>";
									content += "<tr><td class='admName'>"+props.properties.adm_nm + "</td></tr>"+"<tr>"; 
									content += "<td class='statsData'>"+props.info[0].base_year + "년"+" "+props.info[0].right_sep_ttip_title; 
									content += "&nbsp;&nbsp;:&nbsp;&nbsp;"+appendCommaToNumber(parseFloat(props.info[0].right_data_val)) + " (" +props.info[0].unit+ ")"+"</td></tr></table>";
								}
							} else {
								content = "<table style='margin:10px;'>";
								content += "<tr><td class='admName'>"+props.properties.adm_nm + "</td></tr>"+"<tr>"; 
								content += "<td class='statsData'>N/A</td></tr></table>";
							}
							this._div.innerHTML = content;
						}
							
						$(".admName")
						.css("font-size", "14px")
						.css("font-weight", "bold")
						.css("color", "#3792de");
						
						$(".statsData")
						.css("font-size", "12px")
						.css("font-weight", "bold")
						.css("padding-left", "5px");
						
						$("#infoControl_"+that.id)
						.css("padding", "1px 2px")
						.css("background", "rgba(255,255,255,1)")
						.css("background-color", "#fff")
						.css("box-shadow", "0 0 15px rgba(0,0,0,0.2)")
						.css("border-radius", "5px");
					
					};
					this.infoControl = infoControl;
					infoControl.addTo(this.gMap);	
					
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
						maxZoom = 12;
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
						dashArray = "";
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
							that.setLayerColor(feature, layer);	
							layer.on({
								mouseover : function (e) {
									
									//mng_s 20200813 이진호
									//마우스 오버시 초기 좌우 지도에 보여주던 툴팁창 hide 처리
									$("#view1").find("#infoControl_basic1").hide();
									$("#view2").find("#infoControl_basic2").hide();
									//mng_e 20200813 이진호
									
									that.isMouseOver = true;		
									that.setPolyLayerMouseover(e);
									
									if (that.infoControl != null) {
										that.infoControl.update(e.target.feature);
									}
									
									
									if($("#mapRgn_lock_btn").attr("alt") == "locked") {
										var tmpMap = null;
										if (that.id == 0) {
											tmpMap = $thematicMapFrame06.ui.mapList[1];
										}else {
											tmpMap = $thematicMapFrame06.ui.mapList[0];
										}
										tmpMap.gMap.eachLayer(function(layer) {
											if (layer.feature) {
												if (e.target.feature.properties.adm_cd == layer.feature.properties.adm_cd) {
													layer.fire("sync", {action : "mouseover"});
												}
											}
										});
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
										that.delegate.callbackFunc.didMouseOverPolygon(e, feature, layer.options.type, that,that.id);
									}
									
								},
								mouseout : function (e) {
									that.isMouseOver = false;
									that.setPolyLayerMouseout(e);

									if($("#mapRgn_lock_btn").attr("alt") == "locked") {
										var tmpMap = null;
										if (that.id == 0) {
											tmpMap = $thematicMapFrame06.ui.mapList[1];
										}else {
											tmpMap = $thematicMapFrame06.ui.mapList[0];
										}
										tmpMap.gMap.eachLayer(function(layer) {
											if (layer.feature) {
												if (e.target.feature.properties.adm_cd == layer.feature.properties.adm_cd) {
													layer.fire("sync", {action : "mouseout" });
												}
											}
										});
									}
									
									// mouse out, 사용자 콜백
									if (that.delegate && 
										that.delegate.callbackFunc &&
										that.delegate.callbackFunc.didMouseOutPolygon) {
										that.delegate.callbackFunc.didMouseOutPolygon(e, feature, layer.options.type, that);
									}
									
								},
								click : function (e) {
									that.clickMode = true;
									var layer = e.target;
									if (!sop.Browser.ie) {
										layer.bringToFront();
									}
									//마우스 click
//									alert("click"+that.clickMode+",클릭된adm_cd:"+that.selectedAdmCd);
									
									//데이터를 가져온다.
									
//									that.getThemaMapData(that.thema_map_data_id,that.selectedAdmCd);
//									that.setDataBoard(e);
									
									//차트를 만든다
//									thematicCharts(that.selectedAdmCd);
									
									
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

								sync : function (e) {
									if(e.action == "mouseover") {
										that.isMouseOver = true;		
										that.setPolyLayerMouseover(e);
										
										if (that.infoControl != null) {
											that.infoControl.update(e.target.feature);
										}
																			
										if (feature.properties.adm_cd != undefined &&
											feature.properties.adm_cd.length > 0) {
											that.mouseOverAdmCd = e.target.feature.properties.adm_cd;
										}
										
										
										// mouse over , 사용자 콜백
										if (that.delegate && 
											that.delegate.callbackFunc &&
											that.delegate.callbackFunc.didMouseOverPolygon) {
											// event , data, type , map
											that.delegate.callbackFunc.didMouseOverPolygon(e, e.target.feature, layer.options.type, that,that.id);
										}
											
									} else if(e.action == "mouseout") {
										$thematicMapFrame06.ui.mapList[0].setPolyLayerMouseout(e);
										$thematicMapFrame06.ui.mapList[1].setPolyLayerMouseout(e);
									}
								},
							
							});
						},
						type : type, // 일반경계인지, 데이터경계인지 구분
						layerCode : that.curPolygonCode,
					
					});
					
					if (type == "polygon" || type == "build") {
						this.geojson = geojson;
					}else if (type == "trade") {
						this.tradeGeojson = geojson;
					}else {
							this.dataGeoJsonArray.push(geojson);
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
					
					//집계구경계의 중심좌표 설정
					if (adm_cd.length == 7) {
						geojson.eachLayer(function(layer) {
							if (layer.feature.properties.adm_cd.length == 7) {
			    				//console.log(layer);
								var center = layer.getCenter();
								layer.feature.properties["x"] = center.x;
								layer.feature.properties["y"] = center.y;
							}
						})
					}
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
						
						layer.setStyle({
							weight : weight,
							color : color,
							dashArray : layer.options.dashArray,
							fillOpacity : fillOpacity,
							fillColor : fillColor
						});
						
					}
					if (!sop.Browser.ie) {
						layer.bringToBack();
					}
				};
				
				this.commonMoveEventLeft = function () {
					$thematicMapFrame06.ui.mapList[0].gMap.on('drag', function (e) {
						var len = $thematicMapFrame06.ui.mapList[0].gMap.dragging._positions.length;
						var positions = $thematicMapFrame06.ui.mapList[0].gMap.dragging._positions;
						if(len < 2) {
							return;
						}
						
						if($("#mapRgn_lock_btn").attr("alt") == "locked") {
							var pos = positions[len-1].subtract(positions[len-2]); 
							$thematicMapFrame06.ui.mapList[1].gMap.panBy(pos.multiplyBy(-1), {animate : false});
						}
					});
					
					$thematicMapFrame06.ui.mapList[0].gMap.on('dragend', function (e) {
						$thematicMapFrame06.ui.mapList[0].gMap.fire("rgeoevent");
						
						if($("#mapRgn_lock_btn").attr("alt") == "locked") {
							$thematicMapFrame06.ui.mapList[1].gMap.fire("rgeoevent");
						}
					});
					
					$thematicMapFrame06.ui.mapList[0].gMap.on('zoomend', function (e) {
//						if($("#mapRgn_lock_btn").attr("alt") == "locked") {
//							$thematicMapFrame06.ui.mapList[1].gMap.setView(e.target.getCenter(), e.target.getZoom(), {
//								animate : false
//							});
//						}
						
						$thematicMapFrame06.ui.mapList[0].gMap.fire("rgeoevent");
						
						if($("#mapRgn_lock_btn").attr("alt") == "locked") {
							$thematicMapFrame06.ui.mapList[1].gMap.fire("rgeoevent");
						}
					});
				};
				
				this.commonMoveEventRight = function () {
					$thematicMapFrame06.ui.mapList[1].gMap.on('drag', function (e) {
						var len = $thematicMapFrame06.ui.mapList[1].gMap.dragging._positions.length;
						var positions = $thematicMapFrame06.ui.mapList[1].gMap.dragging._positions;
						if(len < 2) {
							return;
						}
						
						if($("#mapRgn_lock_btn").attr("alt") == "locked") {
							var pos = positions[len-1].subtract(positions[len-2]); 
							$thematicMapFrame06.ui.mapList[0].gMap.panBy(pos.multiplyBy(-1), {animate : false});
						}
					});
					
					$thematicMapFrame06.ui.mapList[1].gMap.on('dragend', function (e) {
						$thematicMapFrame06.ui.mapList[1].gMap.fire("rgeoevent");
						
						if($("#mapRgn_lock_btn").attr("alt") == "locked") {
							$thematicMapFrame06.ui.mapList[0].gMap.fire("rgeoevent");
						}
					});
					
					$thematicMapFrame06.ui.mapList[1].gMap.on('zoomend', function (e) {
//						if($("#mapRgn_lock_btn").attr("alt") == "locked") {
//							$thematicMapFrame06.ui.mapList[0].gMap.setView(e.target.getCenter(), e.target.getZoom(), {
//								animate : false
//							});
//						}
						
						$thematicMapFrame06.ui.mapList[1].gMap.fire("rgeoevent");
						
						if($("#mapRgn_lock_btn").attr("alt") == "locked") {
							$thematicMapFrame06.ui.mapList[0].gMap.fire("rgeoevent");
						}
					});
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
					
					else if (type == "rgeoevent") {
						this.gMap.on("rgeoevent", function (e) {	
							var center = e.target.getCenter();
							that.center = [ center.x, center.y ];
							that.bounds = e.target.getBounds();
							
							if (that.isTradeMapShow && that.zoom >= 10){
								that.openApiTradeArea(that.bounds);	
							}
							
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
							if (that.zoom <= 1) {
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
								
							}
							
							else if (that.zoom > 1 && that.zoom <= 3) {
								mapPolygonCode = 2;
								if (that.curPolygonCode != mapPolygonCode) {
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
								console.log(that.zoom);
								//2019-04-19 박길섭 시작
								if(that.zoom == 4) {
									mapPolygonCode = 100;
								}
								else{
									if(window.parent.$thematicMapMain.param.stat_thema_map_id=="KzoL6n1vsK20160127192530684FqFDJMDyF8"){// 인구천명당 의료기관 병상수 및 의사수는 자치구 레벨
										mapPolygonCode = 100;
									}
									else if(window.parent.$thematicMapMain.param.stat_thema_map_id=="DKwow5IqnH20160202203129218uw8DsJoFJK"){// 교통사고 건수 및 사망자수 자치구 레벨
										mapPolygonCode = 100;
									}
									else{
										mapPolygonCode = 3;
									}
								}
								//2019-04-19 박길섭 끝
								// 이전의 경계레벨이 시군구단위가 아닐경우
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
							// 왼쪽 맵을 zoom 하면 우측을 setView한다.
							if($("#mapRgn_lock_btn").attr("alt") == "locked") {
								if(that.id=="0"){
									$thematicMapFrame06.ui.mapList[1].gMap.setView(e.target.getCenter(), e.target.getZoom(), {
										animate : true
									});
								}else{
									$thematicMapFrame06.ui.mapList[0].gMap.setView(e.target.getCenter(), e.target.getZoom(), {
										animate : true
									});
								}
							}
							//끝
							
							if (that.delegate && 
							    that.delegate.callbackFunc &&
							    that.delegate.callbackFunc.didMapZoomEnd instanceof Function) {
								that.delegate.callbackFunc.didMapZoomEnd(e, that);
							}
						});
					}
					
					// drag event 추가
//					else if (type ="drag"){
//						that.gMap.on('drag', function (e) {
//							var len = that.gMap.dragging._positions.length;
//							var positions = that.gMap.dragging._positions;
//							if(len < 2) {
//								return;
//							}
//							
//							var pos = positions[len-1].subtract(positions[len-2]); 
//							
//							if($("#mapRgn_lock_btn").attr("alt") == "locked") {
//								if(that.id=='0'){
//									$thematicMapFrame06.ui.mapList[1].gMap.panBy(pos.multiplyBy(-1), {animate : false});
//								}else{
//									$thematicMapFrame06.ui.mapList[0].gMap.panBy(pos.multiplyBy(-1), {animate : false});
//								}
//							}
//						});
//					}
//					// drag event 끝
//					
//					else if (type == 'dragend') {
//						that.gMap.on('dragend', function (e) {
////							that.gMap.fire("rgeoevent");
//							
//							if($("#mapRgn_lock_btn").attr("alt") == "locked") {
//								
//								//밑에 메소드가 뭐지? rgeoevent?
//								
//								if(that.id=='0'){
////									$thematicMapFrame06.ui.mapList[0].gMap.fire("rgeoevent");
//									$thematicMapFrame06.ui.mapList[0].gMap.fire("zoomend");
//								}else{
////									$thematicMapFrame06.ui.mapList[1].gMap.fire("rgeoevent");
//									$thematicMapFrame06.ui.mapList[1].gMap.fire("zoomend");
//								}
//							}
//						});
//					}
					
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
					// 기존에 데이터경가 있으면 제거한다.
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
				
				// OpenAPI 행정동경계 검색
				this.openApiBoundaryHadmarea = function (adm_cd, year, low_search, zoomLevel) { //2019-04-19 박길섭
					console.log("openApiBoundaryHadmarea =");
					console.log("openApiBoundaryHadmarea =");
					console.log("openApiBoundaryHadmarea =");
					console.log("zoomLevel = " + zoomLevel);
					var sopOpenApiHadmareaObj = new sop.openApi.hadmarea.api();
					sopOpenApiHadmareaObj.addParam("accessToken", accessToken);
					sopOpenApiHadmareaObj.addParam("adm_cd", adm_cd);
					sopOpenApiHadmareaObj.addParam("year", year);
					sopOpenApiHadmareaObj.addParam("low_search", low_search);
					sopOpenApiHadmareaObj.addParam("zoom_level", zoomLevel); //2019-04-19 박길섭
					if(that.thema_atdrc_yn != null && that.thema_atdrc_yn != undefined && that.thema_atdrc_yn === '1' && adm_cd.length === 2) {
						sopOpenApiHadmareaObj.addParam("borough", "1");
					}
					sopOpenApiHadmareaObj.request({
						method : "GET",
						async : true,
						url : openApiPath + "/OpenAPI3/boundary/hadmarea.geojson",
						options : {
							target : this,
							adm_cd : adm_cd,
							year : year,
							low_search : low_search , //2019-04-19 박길섭
							zoom_level : zoomLevel //2019-04-19 박길섭
						}
					});
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
					sopOpenApiReverseGeoCodeObj.addParam("bnd_year",year);
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
					// 일반데이터일 경우
					if (this.dataType == "normal") {
						feature["combine"] = false;
						if (feature.info) {
							for ( var x = 0; x < feature.info.length; x++) {
								if (feature.info[x].showData) {
									for (param in feature.info[x]) {
										
										/*console.log("feature.info[x][param] = " +feature.info[x][param]+":: legendColor = " + that.legend.valPerSlice[x]);
										console.log(that.legend.getColor(feature.info[x][param], that.legend.valPerSlice[x])[0]);*/
										
										
										if (param == feature.info[x].showData) {
											
											//console.log(that.legend.valPerSlice[x]);
										
											console.log("x" + x);
											console.log("that.legend.valPerSlice[x]" + that.legend.valPerSlice[x]);
											
											
											// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
											if(this.topBottomState == "ON" && feature.info[x].topBottomShow == "N") {
												layer.setStyle({	
													weight : layer.options.weight,
													color : layer.options.color,
													dashArray : layer.options.dashArray,
													fillOpacity : layer.options.fillOpacity,
													fillColor : "#F0FFF0"
												});
											} else {
												layer.setStyle({
													weight : layer.options.weight,
													color : layer.options.color,
													dashArray : layer.options.dashArray,
													fillOpacity : layer.options.fillOpacity,
													//fillColor : that.getColor(feature.info[x][param], that.valPerSlice[x])[0] //test
													fillColor : that.legend.getColor(feature.info[x][param], that.legend.valPerSlice[x])[0]
												});
											}
											// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
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
						// 각각의 layer안에 데이타와 unit을 보여줌
						if (this.multiLayerControl.dataGeojson != null && this.multiLayerControl.dataGeojson != undefined) {
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
					if (this.multiLayerControl.dataGeojson != null && this.multiLayerControl.dataGeojson != undefined) {
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
					// 기존 경계 지우기
					if (this.geojson) {

						//현재 경계코드와 geojson의 경계코드가 맞지않을 경우, 경계를 버린다.
						//pAdmCd는 현재경계의 상위 행정동코드로 이를 바탕으로 해당 경계의 임시경계코드를 정의하고,
						//현재 경계코드와 임시경계코드를 비교하여 그릴지 말지를 결정한다.
						if (geoData.pAdmCd != undefined) {
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
							geoData = this.combineStatsData(geoData);
						}
						
						//시계열때문에 드랍된 현재위치정보를 저장한다.
						this.setDroppedInfo();
					}
					
					// res = combineStatsData(res);
					if (geoData.combine && this.data.length > 0) {
						// 지역경계가 auto면 dataGeojson을 지우고,
						// 시도,시군구,읍면동일 경우 경계와 데이터를 지우지 않는다.
						if($("#selectValue2").val()=="auto" || that.i == 1){
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
						//버블추가
							
						if ($("#selectValue2").val()!="auto" && this.legend.selectType =="bubble"){
							$thematicMapFrame06.ui.mapList[that.id].multiLayerControl.dataGeojson = that.dataGeoJsonArray;							
						}
							
						//버블로 바꾼다.
						this.legend.changeDataMode(this.legend.selectType);
							
							if(that.id=="1"){
								$thematicMapFrame06.Popup.close();
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
				/** ********* OpenAPI 상권조회. End ********* */

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
					that.stat_thema_map_id = param.stat_thema_map_id;					

					$.ajax({
						type: "GET",
						url: contextPath + "/ServiceAPI/thematicMap/GetThemaTest.json",
						async : false,
						data : {
							stat_thema_map_id : that.stat_thema_map_id

						},
						success: function(res) {
							if (res.errCd == "0") {
								that.initData = res.result.getThemaStatsInfo[0];
								var result = res.result.getThemaStatsInfo[0];
								//제목달기
								if(that.id=="1"){
									/*
									 *	2017.02.23 혼인 및 이혼율 현황 소제목 안뜨는 현상 수정 lkh
									 * 
									$("#view1 .helperText").prepend("<span>" + res.result.getThemaStatsInfo[0].title + "</span>");
//									$("#view1 .helperText span").text(res.result.getThemaStatsInfo[0].title);
									$("#view1 .helperText a").attr("title",res.result.getThemaStatsInfo[0].exp);									
									 * 
									 */
									$("#view2 .helperText").remove();
									//$(".h3.helperText").prepend("<span>" + res.result.getThemaStatsInfo[0].title + "</span>");
//									$("#view1 .helperText span").text(res.result.getThemaStatsInfo[0].title);
									//$(".h3.helperText a").attr("title",res.result.getThemaStatsInfo[0].exp);
									var expText = res.result.getThemaStatsInfo[0].exp;
									$(".h3.helperText").prepend("<span>" + res.result.getThemaStatsInfo[0].title + "</span>");
									$(".h3.helperText a").prop("title", expText.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">"));
								}
								//leftside menu - left
								//
								if(that.id=="1"){
									if(result.left_sep_nm !=null && result.left_sep_unit !=null && result.left_sep_nm.length > 0 && result.left_sep_unit.length > 0){
										var leftHtml= '<a href="javascript:srvLogWrite(\'B0\',\'03\',\'02\',\'01\',\''+result.title+'\',\'\');$thematicMapFrame06.Popup.show();$thematicMapFrame06.ui.changeLeftRightValue()" class="first last" id="leftValue">'+ result.left_sep_nm+'('+result.left_sep_unit+','+result.sep_map_left_sep_unit+')</a>'
										$('#stat_sel').append(leftHtml);
										//초기화
										$("#leftValue").addClass("on");
										$("#selectValue").val("leftValue");
									}
									//leftside menu - right
									if(result.right_sep_nm !=null && result.right_sep_unit!=null && result.right_sep_nm.length > 0 && result.right_sep_unit.length > 0){
										var rightHtml= '<a href="javascript:srvLogWrite(\'B0\',\'03\',\'02\',\'02\',\''+result.title+'\',\'\');$thematicMapFrame06.Popup.show();$thematicMapFrame06.ui.changeLeftRightValue()" class="last" id="rightValue">'+ result.right_sep_nm+'('+result.right_sep_unit+','+result.sep_map_right_sep_unit+')</a>'
										$('#stat_sel').append(rightHtml);		
										$('#leftValue').removeClass('last');
									}
								}


								that.thema_map_data_id = res.result.getThemaStatsInfo[0].thema_map_data_id;
								that.sep_map_data_id = res.result.getThemaStatsInfo[0].sep_map_data_id;

								if(that.id=="0"){
									//데이터 년도
									that.stat_data_base_year = res.result.getThemaStatsInfo[0].stat_data_base_year
								}else if(that.id=="1"){
									//분할맵 년도
									that.sep_map_data_year = res.result.getThemaStatsInfo[0].sep_map_data_year;
								}

								//증감률 데이터
								that.left_sep_unit = res.result.getThemaStatsInfo[0].left_sep_unit;
								that.left_sep_nm = res.result.getThemaStatsInfo[0].left_sep_nm;
								that.left_sep_source = res.result.getThemaStatsInfo[0].left_sep_source;
								that.left_sep_ttip_title = res.result.getThemaStatsInfo[0].left_sep_ttip_title;
								that.left_sep_chart_title = res.result.getThemaStatsInfo[0].left_sep_chart_title;	
								that.left_base_year = res.result.getThemaStatsInfo[0].left_base_year;	
								that.bnd_year = res.result.getThemaStatsInfo[0].left_base_year;
								that.max_expnsn_level = res.result.getThemaStatsInfo[0].max_expnsn_level;

								that.sep_map_left_sep_unit = res.result.getThemaStatsInfo[0].sep_map_left_sep_unit;
								that.sep_map_left_sep_nm = res.result.getThemaStatsInfo[0].sep_map_left_sep_nm;
								that.sep_map_left_sep_source = res.result.getThemaStatsInfo[0].sep_map_left_sep_source;
								that.sep_map_left_sep_ttip_title = res.result.getThemaStatsInfo[0].sep_map_left_sep_ttip_title;

								//CAGR 데이터
								that.right_sep_unit = res.result.getThemaStatsInfo[0].right_sep_unit;
								that.right_sep_nm = res.result.getThemaStatsInfo[0].right_sep_nm;
								that.right_sep_source = res.result.getThemaStatsInfo[0].right_sep_source;
								that.right_sep_ttip_title = res.result.getThemaStatsInfo[0].right_sep_ttip_title;
								that.right_sep_chart_title = res.result.getThemaStatsInfo[0].right_sep_chart_title;							  
								that.min_redctn_level = res.result.getThemaStatsInfo[0].min_redctn_level;
								that.thema_atdrc_yn = res.result.getThemaStatsInfo[0].atdrc_yn;

								that.sep_map_right_sep_unit = res.result.getThemaStatsInfo[0].sep_map_right_sep_unit;
								that.sep_map_right_sep_nm = res.result.getThemaStatsInfo[0].sep_map_right_sep_nm;
								that.sep_map_right_sep_source = res.result.getThemaStatsInfo[0].sep_map_right_sep_source;
								that.sep_map_right_sep_ttip_title = res.result.getThemaStatsInfo[0].sep_map_right_sep_ttip_title;
								that.boundary_fix_yn = res.result.getThemaStatsInfo[0].boundary_fix_yn;
								
								$("#thematicMapOrigin").html(that.left_sep_source);
								$("#thematicMapOrigin2").html(that.right_sep_source);
								
								//시계열년도고정유무가 Y이면, 기준경계년도에 맞는 경계를 표출한다.
								  if (that.boundary_fix_yn == "Y") {
									  that.bnd_year = that.left_base_year;
								  }

								// DB 에서 가져온 max_expnsn_level 의 값에 따른 분기 저리 필요
								// 01 : 시도 => 3
								// 02 : 시군구 => 5
								// 03 : 읍면동 => 8
								// 04 : 집계구 => 별도 줌 레벨 설정 필요 없음
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
									that.gMap.setMaxZoom(8);
								}else if(that.max_expnsn_level=="04"){

								}
								that.thema_legend_type = res.result.getThemaStatsInfo[0].exmpl_type;
								if(that.thema_legend_type == '3') {
									that.getLegendValues($thematicMapFrame06.params);
								} else {
									$('#themaInit_'+that.legend.id).trigger("click");
								} 
								
								if (callback != undefined && callback != null && callback instanceof Function) {
									  callback.call(undefined, res);
								}
								
								//mng_s 20210126 이진호 
								//기본정보 알림 툴팁 생성을 map06.js 의 infoControl.update() 에서 생성하도록 수정하여 주석 처리
								//mng_s 20200813 이진호
								//분할뷰에서 lMap과 rMap 데이터 정보 보여주기(title, year)
								//var lTitle = res.result.getThemaStatsInfo[0].left_sep_ttip_title;
								//var rTitle = res.result.getThemaStatsInfo[0].sep_map_left_sep_ttip_title;
								
								//var lYear = res.result.getThemaStatsInfo[0].left_base_year; 
								//var rYear = res.result.getThemaStatsInfo[0].right_base_year;
								//var year = res.result.getThemaStatsInfo[0].stat_data_base_year;
								
								
								//$("#view1").find("#infoControl_basic1").find(".statsData").text( year+"년\n"+"\n"+lTitle);
								//$("#view2").find("#infoControl_basic2").find(".statsData").text( year+"년\n"+"\n"+rTitle);
								//mng_e 20200813 이진호
								//mng_e 20210126 이진호
								
								
							}
						} ,
						dataType: "json",
						error:function(e){}  
					});		
					
					//mng_s 20210126 이진호
					//ajax 완료 후 infoControl.update() 호출
					//호출 시 "init"을 주어 분할뷰 지도에 mouseover 하지 않았을 때 구분
					this.infoControl.update("init");
					//mng_e 20210126 이진호
					
				};
				/** 통계 주제 데이터 조회 끝 **/

				/** 통계 주제 기준년도 데이터 목록 조회 **/
				/**
				 * 
				 * @name         : getThemaMapBaseYear
				 * @description  : 통계 기준년도 데이터 목록을 가져온다.
				 * @date         : 2015. 11. 12. 
				 * @author	     : 정수영
				 * @history 	 :
				 */

//				this.getThemaMapBaseYear = function getThemaMapBaseYear(param){
//					var thema_map_data_id = param;
//
//					$.ajax({
//						type: "GET",
//						url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapBaseYear.json",
//						async : false,
//						data : {
//							thema_map_data_id : thema_map_data_id
//						},
//						success: function(res) {
//							if (res.errCd == "0") {
//								var list = new Array(); 
//								for(var i=0;i<res.result.detailInfo.length;i++){
//									list[i] = res.result.detailInfo[i].base_year;
//								}
//
//								that.base_year_list = list;
//								//base_year초기값이 없으면 list[0]의 값을 넣는다.
////								if(that.base_year == ""){
////								that.base_year = list[0];
////								}
//								// 주제도 설정 - 년도선택 리스트 태그를 붙인다.
//								var output = "";
//								output = '<span>년도선택</span>';
//								output += '<select id="select_base_year" onchange="$thematicMapFrame06.ui.mapList[0].changeRegionBound()">';
//
//								for(var i=0;i<list.length-1;i++){
//									output += '<option>';
//									output += list[i];
//									output += '</option>';
//								}
//								output += '<option selected="true">'+list[list.length-1]+'</option>'
//								output += '</select>';
//								$("#base_year").html(output);			
//							}
//						} ,
//						dataType: "json",
//						error:function(e){}  
//					});						
//				};
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

				this.getThemaMapData = function getThemaMapData(param,adm_cd, zoomLevel){
					var thema_map_data_id = param;
					var area_type = $("#selectValue2").val();					
					var selectYear = $("#select_base_year").val();
					var stat_data_base_year = '';
					if(that.id=="0"){
						stat_data_base_year = that.stat_data_base_year;
					}else{
						stat_data_base_year = that.sep_map_data_year;
					}


					//area_type : 지역구분, bnd_year : 기준년도, selectedRegion : 지역경계

					// area_type이 auto면 지역상관없이 모두 가져온다.

					if(that.id=="0"){
						$.ajax({
							type: "GET",
							url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapData.json",								
							data : {
								thema_map_data_id : that.thema_map_data_id,
								area_type : area_type,
								adm_cd : adm_cd,
								stat_data_base_year : stat_data_base_year
							},
							success: function(res) {
								if (res.errCd == "0") {
									//통계 주제도 데이터 가져오기 전에 레이어를 지운다.
									that.gMap.eachLayer(function(layer){
										if (layer.feature) {
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

									res.result = result;

									//통계선택에서 증감률(left)를 선택이 되어있으면
									if($("#selectValue").val() == "leftValue"){

										// 테마주제 정보에서 툴팁타이틀을 각 data에 넣는다.
										for(var i=0;i<res.result.length;i++){
											res.result[i].left_sep_ttip_title = that.left_sep_ttip_title;									  
//											res.result[i].left_sep_chart_title = that.left_sep_chart_title;									  
										}									  
										that.setStatsData("normal", res, "left_data_val", that.left_sep_unit);	

									}else{
										// CAGR 데이터인 경우
										for(var i=0;i<res.result.length;i++){
											res.result[i].right_sep_ttip_title = that.right_sep_ttip_title;
//											res.result[i].right_sep_chart_title = that.right_sep_chart_title;
										}								  
										that.setStatsData("normal", res, "right_data_val", that.right_sep_unit);	
									}

									//주제도 설정 - 지역경계에서 자동 - 경계데이터 가져옴.
									//            - 시도,시군구,읍면동으로 설정되어 있으면 경계데이터를 밖에서 가져옴.
									var region = $("#selectValue2").val();
									that.dataGeoJsonArray = [];
									if(region == "auto"){		
										//데이터에 adm_cd의 경우 공백이 뒤에 붙는경우도 봤음 나중에 버그있을시 확인
										if(adm_cd=="00"){
											that.openApiBoundarySido(that.bnd_year, function(geojson) {
											});
										}else{
											//that.openApiBoundaryHadmarea(adm_cd,that.bnd_year,  "1"); //2019-04-19 박길섭
											that.openApiBoundaryHadmarea(adm_cd,that.bnd_year,  "1" , zoomLevel); //2019-04-19 박길섭
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
									addrCdToNm(parent.$thematicMapMain.themaInfo.stat_data_base_year, adm_cd, logOptions);
								} 
							} ,
							dataType: "json",
							error:function(e){}  
						});		
					}else if(that.id=="1"){
						$.ajax({
							type: "GET",
							url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapData.json",
							data : {
								thema_map_data_id : that.sep_map_data_id,
								area_type : area_type,
								adm_cd : adm_cd,
								stat_data_base_year : stat_data_base_year
							},
							success: function(res) {
								if (res.errCd == "0") {
									//통계 주제도 데이터 가져오기 전에 레이어를 지운다.
									that.gMap.eachLayer(function(layer){
										if (layer.feature) {
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
									res.result = result;

									//통계선택에서 증감률(left)를 선택이 되어있으면
									if($("#selectValue").val() == "leftValue"){

										// 테마주제 정보에서 툴팁타이틀을 각 data에 넣는다.
										for(var i=0;i<res.result.length;i++){
											res.result[i].left_sep_ttip_title = that.sep_map_left_sep_ttip_title;									  
//											res.result[i].left_sep_chart_title = that.sep_map_left_sep_chart_title;									  
										}									  
										that.setStatsData("normal", res, "left_data_val", that.sep_map_left_sep_unit);	

									}else{
										// CAGR 데이터인 경우
										for(var i=0;i<res.result.length;i++){
											res.result[i].right_sep_ttip_title = that.sep_map_right_sep_ttip_title;
//											res.result[i].right_sep_chart_title = that.sep_map_right_sep_chart_title;
										}								  
										that.setStatsData("normal", res, "right_data_val", that.sep_map_right_sep_unit);	
									}

									//주제도 설정 - 지역경계에서 자동 - 경계데이터 가져옴.
									//            - 시도,시군구,읍면동으로 설정되어 있으면 경계데이터를 밖에서 가져옴.
									var region = $("#selectValue2").val();
									that.dataGeoJsonArray = [];
									if(region == "auto"){
										//데이터에 adm_cd의 경우 공백이 뒤에 붙는경우도 봤음 나중에 버그있을시 확인
										if(adm_cd=="00"){
											that.openApiBoundarySido(that.bnd_year, function(geojson) {
											});
										}else{
											that.openApiBoundaryHadmarea(adm_cd,that.bnd_year,  "1",zoomLevel);//2019-04-23 박길섭
										}
									}else{
										//자동이 아니면 getRegionData에서 경계자료를 받는다.
										that.getRegionData();
									}
								}
							} ,
							dataType: "json",
							error:function(e){}  
						});			
					}
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
//					$thematicMapFrame06.Popup.show();

					//선택된 년도
					var selectYear = $("#select_base_year >option:selected").text();
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

					if($("#selectValue2").val()=="auto"){
						that.isReloadMode = true;
						that.openApiReverseGeoCode(that.center,that.bnd_year);

					}else if($("#selectValue2").val()=="1"){	
						$('#themaInit_'+that.legend.id).trigger("click");
						//$('#goganEvent_'+that.legend.id).trigger("click");
						that.getThemaMapData(that.thema_map_data_id,"00");
						//시도 통계데이터 가져오기.								
					}else if($("#selectValue2").val()=="2"){
						$('#themaInit_'+that.legend.id).trigger("click");
						//$('#goganEvent_'+that.legend.id).trigger("click");
						that.getThemaMapData(that.thema_map_data_id,that.curSidoCd);	

					}else if($("#selectValue2").val()=="3"){
						$('#themaInit_'+that.legend.id).trigger("click");
						//$('#goganEvent_'+that.legend.id).trigger("click");
						that.getThemaMapData(that.thema_map_data_id,that.curSidoCd + that.curSiggCd);

					}


					//줌레벨 제한
//					var maxZoom = that.min_redctn_level.substring(1,2);
//					var minZoom = that.max_expnsn_level.substring(1,2);
//					that.setFixedBoundLevel(false);

//					if($("#selectValue2").val()=="자동"){	
//					alert("자동 maxZoom : "+maxZoom +" minZoom :"+minZoom);									
//					this.gMap.setMaxZoom(maxZoom);
//					this.gMap.setMinZoom(minZoom);
//					}else if($("#selectValue2").val()=="시도"){				
//					that.mapMove([that.center[0],that.center[1]], 2);
//					that.setFixedBoundLevel(true);
//					//getZoom() - 현재 줌 레벨 가져오는 메소드
//					}else if($("#selectValue2").val()=="시군구"){
//					that.mapMove([that.center[0],that.center[1]], 4);
//					that.setFixedBoundLevel(true);
//					}else if($("#selectValue2").val()=="읍면동"){
//					that.mapMove([that.center[0],that.center[1]], 6);
//					that.setFixedBoundLevel(true);
//					}
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

					var selectYear = $("#select_base_year >option:selected").text();
					var region = $("#selectValue2").val();
					var count = "";								
					var startSeq = 0;
					var endSeq = 0;



					// 경계데이터가 불러오지 않았을 경우 DB에서 가져온다.
//					if(that.regionData == null){
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
						
						// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
						if(region == "2" && that.topBottomState == "ON") {
							that.topBottomLayers = [];
						}
						// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
						
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
						
						// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
						if(region == "2" && that.topBottomState == "ON") {
							that.showTopBottomDataOnly("ON", true);
						}
						// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
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
					}
					// 자료를 다 불러와서 세팅했으면 that.i을 1로 초기화다.
					if(that.i == 10){
						that.i = 1;
					}

					//Count 끝

					//통계선택을 선택할경우 이미 저장되어있는 경계정보를 넣는다.
//					}else if(selectStatsOption == true){

//					that.setPolygonDataGeojson(that.regionData);
//					}

				};	
				this.multiLayerControl = {
						multiData : null,
						dataGeojson : null
				};

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
//				var selectYear = $("#select_base_year >option:selected").text();
			
				
				//처음 리버스지오코딩 할때
				if(that.thema_map_data_id == ""){
					//console.log($thematicMapFrame06.params);
					that.openInitStatData($thematicMapFrame06.params);
					//분할뷰는 없어도 됨
					//that.getThemaMapBaseYear(that.thema_map_data_id);				
				}
				
				if (res.errCd == "0") {
					var result = res.result[0];
					var curSidoCd = result.sido_cd;
					var curSiggCd = result.sgg_cd;
					var curDongCd = result.emdong_cd;
					
					if (that.isInnerMapShow){
						that.openApiBuildArea(that.bounds);
						
						
					//지역경계가 "auto"일 경우 해당하는 getThemaMapData를 실행한다.
					}else if($("#selectValue2").val()=="auto"){
												
						//left menu 에서 url param을 가져옴
						//url = param.url;					
						
						switch (that.curPolygonCode) {
						
						// 전국
						case 1:
							if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == null && that.lastGeojsonInfo.info == "sidoArea") {
//								that.MainObj.Popup.close();
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}
								else {
									console.log('aleady exist');
									// that.clearData();
								}
							} else {
								that.openApiBoundaryContry();
							}
							break;
							
						//전국시도 
					    // 전국시도는 시도데이터를 가지고 있는 파일을 가져옴.
						case 2:
							if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == '00') {
								//that.MainObj.Popup.close();
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}
								else {
									console.log('aleady exist');
									// that.clearData();
								}
							} else {
								if (that.dataGeojson) {
									that.dataGeojson.remove();
								}
								
								that.getThemaMapData(that.thema_map_data_id,"00");
							}

							break;
							
						// 시군구
						//2019-04-19 박길섭 시작	
						case 100:
							//최근경계조회조건 하나를 가지고 있다가 비교하여 같으면 기존에 저장된 경계를 호출
							if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd) {
//								that.MainObj.Popup.close();
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}
								else {
									// that.clearData();
									console.log('aleady exist');
									that.getThemaMapData(that.thema_map_data_id,curSidoCd, "100");//2019-04-22 박길섭
								}
							} else {
								if (that.dataGeojson) {
									that.dataGeojson.remove();
								}
								that.getThemaMapData(that.thema_map_data_id,curSidoCd , "100");
							}
							break;
						//2019-04-19 박길섭 끝	
						// 시군구
						case 3:
							//최근경계조회조건 하나를 가지고 있다가 비교하여 같으면 기존에 저장된 경계를 호출
							if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd) {
//								that.MainObj.Popup.close();
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}
								else {
									// that.clearData();
									console.log('aleady exist');
									that.getThemaMapData(that.thema_map_data_id,curSidoCd);//2019-04-22 박길섭
								}
							} else {
								if (that.dataGeojson) {
									that.dataGeojson.remove();
								}
								that.getThemaMapData(that.thema_map_data_id,curSidoCd);
							}
							break;
//						
						// 동면읍
						case 4:
							if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd + curSiggCd) {
//								that.MainObj.Popup.close();
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}
								else {
									// that.clearData();
									console.log('aleady exist');
								}
							} else {
								if (that.dataGeojson) {
									that.dataGeojson.remove();
								}
								that.getThemaMapData(that.thema_map_data_id,curSidoCd + curSiggCd);
							}
														
							break;
						
						// 집계구
						case 5:
							if (that.dataGeojson) {
								that.dataGeojson.remove();
							}
							that.getThemaMapData(that.thema_map_data_id,curSidoCd + curSiggCd + curDongCd);
					
														
							break;
					
						
						default:
							break;
						
						}
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

}(window, document));
