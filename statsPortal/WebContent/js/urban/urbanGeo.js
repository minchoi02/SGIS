/**
 * 도시화 분석 지도 맵에 관한 공통 메소드
 *
 * history : 2021/11/02 초기 작성 version : 1.0 see : 원형(/js/common/map.js)
 *
 */

//mng_s  20170802 정책통계지도 범례 좌측으로 고정

(function (W, D) {

	urbanGeo = {

			drawing : function() {
				var that = this;
				this.delegate = null;
				this.target = null;
				this.map = null;
				this.dataGeojson = null;
				this.dataGeojson2 = null;
				this.dataGeojson3 = null;
				this.data = [];
				//this.mouseOverUrbanId = null;
				this.isMouseOver = false;
				this.isLayerMouseEventDisabled = false;
				// this.dataPolygonFillOpacity = 0.7;
				// this.dataPolygonMouseOverFillOpacity = 0.7;
				// this.dataPolygonFillSggOpacity = 0.7;
				// this.dataPolygonMouseOverFillSggOpacity = 0.7;
				// this.selectedFillOpacity = 0.3;
				// this.defaultWeight = 1.5;
				this.dataPolygonFillOpacity = 0.6;		//2022 SGIS5 변경
				this.dataPolygonMouseOverFillOpacity = 0.3;	//2022 SGIS5 변경
				this.dataPolygonFillSggOpacity = 0.6;	//2022 SGIS5 변경
				this.dataPolygonMouseOverFillSggOpacity = 0.3;	//2022 SGIS5 변경
				this.selectedFillOpacity = 0.3;  
				this.defaultWeight = 2;	//2022 SGIS5 변경
				this.selectedWeight = 5;
				this.curUrbanKey = null;
				this.curSelectedLayer = null;
//				this.defaultColor = "#FFAA01";
//				this.defaultColor2 = "#8481E8";
				this.defaultColor = "#F1423E";	 //2022 SGIS5 색상 변경
				this.defaultColor2 = "#FFD050";	 //2022 SGIS5 색상 변경
				this.mouseOverColor = "#457bf5";
				this.selectedColor = "#EF595C";
				this.defaultSggColor = "#60BC4C";
				this.mouseOverSggColor = "#60BC4C";
				// this.defaultSggBorderColor = "#20655a";
				this.defaultSggBorderColor = "#198754";	//2022 SGIS5 색상 변경
				


				this.createGeo = function (delegate, target, map, opt) {
					if (delegate) {this.delegate = delegate;}
					if (target) {this.target = target;}
					if (map) {this.map = map;}
				};

				this.setCurUrbanKey = function (key) {
					if (key) {
						this.clearGeo2();
						this.curUrbanKey = key;

						//updatePolygonGeoJson() 처리 + curSelectedLayer 설정
						if (this.dataGeojson != null) {
							this.dataGeojson.eachLayer(function (layer) {
								if (layer.feature) {
									that.setLayerColor(layer.feature, layer);

									if (key == $urbanObj.getGeometryKey(layer.feature.properties)) {
										that.curSelectedLayer = layer;
									}
								}
							});
						}
					}
				};

				this.getLayer = function (key) {
					var rtnLyr;

					if (key) {
						if (this.dataGeojson != null) {
							this.dataGeojson.eachLayer(function (layer) {
								if (layer.feature) {
									if (key == $urbanObj.getGeometryKey(layer.feature.properties)) {
										rtnLyr = layer;
									}
								}
							});
						}
					}

					return rtnLyr;
				};

				this.setPolygonDataGeojson = function (geoData) {
					if (this.dataGeojson) {
						this.dataGeojson.remove();
						this.removeCaption();
						this.dataGeojson = null;
					}

					this.curUrbanKey = null;
					this.curSelectedLayer = null;

					this.addPolygonGeoJson(geoData, "urbars");

					this.data = [];

					if (this.delegate && this.delegate.callbackFunc && this.delegate.callbackFunc.didFinishedDrawing instanceof Function) {
						this.delegate.callbackFunc.didFinishedDrawing(geoData, that);
					}
				};

				this.addPolygonGeoJson = function (obj, type, opt) {
					//var urban_id = "";
					var geojson = sop.geoJson(obj, {
						style : this.setPolygonGeoJsonStyle(type),
						onEachFeature : function (feature, layer) {
							//urban_id = layer.feature.properties.urban_id;
							that.setLayerColor(feature, layer);
							layer.on({
								mouseover : function (e) {
									that.isMouseOver = true;
									if (!that.isLayerMouseEventDisabled) {
										that.clearToolTip();
										that.setPolyLayerMouseover(e);
										if (that.infoControl != null) {
											that.infoControl.update(feature.properties);
										}
//										if (feature.properties.urban_id != undefined && feature.properties.urban_id.length > 0) {
//											that.mouseOverUrbanId = feature.properties.urban_id;
//										}

										that.createInfoTooltip(e, feature, layer.options.type);

										// mouse over , 사용자 콜백
										if (that.delegate &&
											that.delegate.callbackFunc &&
											that.delegate.callbackFunc.didMouseOverPolygon) {
											that.delegate.callbackFunc.didMouseOverPolygon(e, feature, layer.options.type, that);
										}
									}
								},
								mouseout : function (e) {
									that.isMouseOver = false;
									if (!that.isLayerMouseEventDisabled) {
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
									
									if (!that.isLayerMouseEventDisabled) {
										var layer = e.target;
										if (layer == that.curSelectedLayer) {
											that.curUrbanKey = null;
											that.curSelectedLayer = null;
										}else{
											that.curUrbanKey = $urbanObj.getGeometryKey(layer.feature.properties);		//layer.feature.properties.urban_id;
											that.curSelectedLayer = layer;
										}

										if($urbanMain.ui.writeSrvLogYn == "Y")
											srvLogWrite('R0', '01', '04', '01', layer.feature.properties.urban_nm, ''); // 2022.02.15 log 생성
											$urbanMain.ui.writeSrvLogYn = "N";
										that.updatePolygonGeoJson();

										//툴팁 외곽선
										$(".sop-tooltip").css({"border" : "2px solid " + layer.options.fillColor} );

										that.bringToFront(layer);
										
										if (that.delegate && that.delegate.callbackFunc && that.delegate.callbackFunc.didSelectedPolygon) {
											// that.delegate.callbackFunc.didSelectedPolygon(e, feature, layer.options.type, that)	
											
											that.delegate.callbackFunc.didSelectedPolygon(e, feature, layer.options.type, that); // 2022 SGIS5 추가
											
											
										}
									}
								}
							});
						},
						type : type
					});

					this.dataGeojson = geojson;

					this.dataGeojson.addTo(this.map.gMap);

					return geojson;
				};

				this.setPolygonDataGeojson2 = function (geoData) {
					if (this.dataGeojson2) {
						this.dataGeojson2.remove();
						this.removeCaption(this.dataGeojson2);
						this.dataGeojson2 = null;
					}

					this.addPolygonGeoJson2(geoData, "urbars_sgg");

					if (this.delegate && this.delegate.callbackFunc && this.delegate.callbackFunc.didFinishedDrawing instanceof Function) {
						this.delegate.callbackFunc.didFinishedDrawing(geoData, that);
					}
				};

				this.addPolygonGeoJson2 = function (obj, type, opt) {
					var geojson = sop.geoJson(obj, {
						style : this.setPolygonGeoJsonStyle(type),
						onEachFeature : function (feature, layer) {
							//SGIS4_220211_도시화_수정_시작
							that.setLayerColor2(feature, layer);
							var clsGb = feature.properties["urban_cls_gb"];

							if(clsGb != "bord"){
								layer.on({
									mouseover : function (e) {
										that.isMouseOver = true;
										if (!that.isLayerMouseEventDisabled) {
											that.clearToolTip(this.dataGeojson2);
											that.setPolyLayerMouseover(e);
											if (that.infoControl != null) {
												that.infoControl.update(feature.properties);
											}

											that.createInfoTooltip(e, feature, layer.options.type);

											// mouse over , 사용자 콜백
											if (that.delegate &&
												that.delegate.callbackFunc &&
												that.delegate.callbackFunc.didMouseOverPolygon) {
												that.delegate.callbackFunc.didMouseOverPolygon(e, feature, layer.options.type, that);
											}
										}
									},
									mouseout : function (e) {
										that.isMouseOver = false;
										if (!that.isLayerMouseEventDisabled) {
											that.setPolyLayerMouseout(e);
											// mouse out, 사용자 콜백
											if (that.delegate &&
												that.delegate.callbackFunc &&
												that.delegate.callbackFunc.didMouseOutPolygon) {
												that.delegate.callbackFunc.didMouseOutPolygon(e, feature, layer.options.type, that);
											}
										}
									}
								});
							}
							//SGIS4_220211_도시화_수정_끝

							if (!sop.Browser.ie) {
								layer.bringToFront();
							}
						},
						type : type
					});

					this.dataGeojson2 = geojson;

					this.dataGeojson2.addTo(this.map.gMap);

					return geojson;
				};

				this.setGridDataGeojson = function (geoData) {
					if (this.dataGeojson3) {
						this.dataGeojson3.remove();
						this.removeCaption(this.dataGeojson3);
						this.dataGeojson3 = null;
					}

					this.addPolygonGeoJson3(geoData, "urbars_grid");

					if (this.delegate && this.delegate.callbackFunc && this.delegate.callbackFunc.didFinishedDrawing instanceof Function) {
						this.delegate.callbackFunc.didFinishedDrawing(geoData, that);
					}
				};

				this.addPolygonGeoJson3 = function (obj, type, opt) {
					var geojson = sop.geoJson(obj, {
						style : this.setPolygonGeoJsonStyle(type),
						type : type
					});

					this.dataGeojson3 = geojson;

					this.dataGeojson3.addTo(this.map.gMap);

					this.dataGeojson3.bringToBack();

					return geojson;
				};

				this.removeCaption = function (pDataGeojson) {
					var tgt = pDataGeojson;
					if(tgt === undefined || tgt === null){
						tgt = this.dataGeojson;
					}

					if (tgt != null) {
						tgt.eachLayer(function (layer) {
							layer.removeCaption();
							layer.captionObj = null;
						});
					}
				};

				this.setPolygonGeoJsonStyle = function (type) {
					var color = "#666666";
					var fillColor = "white";
					var weight = 1.75;
					var fillOpacity = 0;
					var opacity = 1;
					var dashArray = '0';

					switch (type) {
						case "urbars":
							color = this.defaultColor,
							fillColor = this.defaultColor;
							weight = this.defaultWeight;
							fillOpacity = this.dataPolygonFillOpacity;
							opacity = 1;
							dashArray = "";
							break;
						case "urbars_sgg":
							color = this.defaultSggBorderColor,
							fillColor = this.defaultSggColor;
							weight = this.selectedWeight;
							fillOpacity = this.dataPolygonFillSggOpacity;
							opacity = 1;
							dashArray = "";
							break;
						case "urbars_grid":
							color = this.defaultSggBorderColor,
							fillColor = this.defaultSggColor;
							weight = this.defaultWeight;
							fillOpacity = 0;
							opacity = 1;
							dashArray = "";
							break;
					}

					return {
						weight : weight,
						opacity : opacity,
						color : color,
						dashArray: dashArray,
						fillOpacity : fillOpacity,
						fillColor : fillColor
					};
				};

				this.setLayerColor = function (feature, layer) {
					if (that.curUrbanKey == $urbanObj.getGeometryKey(feature.properties)) {
						layer.setStyle({
							weight : this.selectedWeight,		//layer.options.weight,
							opacity : layer.options.opacity,
							color : layer.options.color, 		//this.selectedColor,
							dashArray : layer.options.dashArray,
							fillOpacity : this.selectedFillOpacity,		//this.dataPolygonFillOpacity,
							fillColor : layer.options.fillColor 		//this.selectedColor
						});
					}else{
						var urbanType = feature.properties["type"];
						var urbanColor = this.defaultColor;
						if(urbanType == "02"){
							urbanColor = this.defaultColor2;
						}

						layer.setStyle({
							weight : this.defaultWeight,
							opacity : layer.options.opacity,
							color : urbanColor,
							dashArray : layer.options.dashArray,
							fillOpacity : this.dataPolygonFillOpacity,
							// weight : 1.5,
							fillColor : urbanColor
							

						});
					}
				};

				//SGIS4_220211_도시화_수정_시작
				this.setLayerColor2 = function (feature, layer) {
					var clsGb = feature.properties["urban_cls_gb"];
					if(clsGb == "bord"){
						layer.setStyle({
							// weight : 3,
							// opacity : layer.options.opacity,
							// color : '#000000',
							// fill: false
							weight : 5,		//2022 SGIS5 변경
							opacity : 5,	//2022 SGIS5 변경 
							color : '#000000' //2022 SGIS5 변경
						});
					}
				};
				//SGIS4_220211_도시화_수정_끝

				this.setPolyLayerMouseover = function (e) {
					var layer = e.target;

					if (this.dataGeojson2 && this.dataGeojson2.hasLayer(layer)) {
						layer.setStyle({
							color : this.mouseOverColor,		//this.mouseOverSggColor
							fillOpacity : this.dataPolygonMouseOverFillSggOpacity,
							// weight : 5,
							fillColor : layer.options.fillColor
						});
					}else{
						if (layer == that.curSelectedLayer) {
							layer.setStyle({
								color : this.mouseOverColor,
								fillOpacity : this.selectedFillOpacity,		//this.dataPolygonMouseOverFillOpacity,
								// weight : 5,
								fillColor : layer.options.fillColor		//this.selectedColor
							});
						} else {
							layer.setStyle({
								color : this.mouseOverColor,
								fillOpacity : this.dataPolygonMouseOverFillOpacity,
								// weight : 5,
								fillColor : layer.options.fillColor
							});
						}
					}

					that.bringToFront(layer);
				};

				this.setPolyLayerMouseout = function (e) {
					var layer = e.target;

					if (this.dataGeojson2 && this.dataGeojson2.hasLayer(layer)) {
						layer.setStyle({
							color : this.defaultSggBorderColor,
							fillOpacity : this.dataPolygonFillSggOpacity,
							fillColor : this.defaultSggColor
						});
					}else{
						var urbanType = layer.feature.properties["type"];
						var urbanColor = this.defaultColor;
						if(urbanType == "02"){
							urbanColor = this.defaultColor2;
						}

						if (layer == that.curSelectedLayer) {
							layer.setStyle({
								color : urbanColor, 		//this.selectedColor,
								fillOpacity : this.selectedFillOpacity,		//this.dataPolygonFillOpacity,
								// weight : 1.5,
								fillColor : layer.options.fillColor		//this.selectedColor
							});
						}else {
							layer.setStyle({
								// 색상 변경 11-03
								color : urbanColor,
								fillOpacity : this.dataPolygonFillOpacity,
								// weight : 1.5,
								fillColor : urbanColor
							});
						}
					}

					if (layer != that.curSelectedLayer) {
						that.bringToBack(layer);
					}
				};

				this.updatePolygonGeoJson = function () {
					if (this.dataGeojson != null) {
						this.dataGeojson.eachLayer(function (layer) {
							if (layer.feature) {
								that.setLayerColor(layer.feature, layer);
							}
						});
					}
				};

				this.clearGeo = function() {
					if (this.dataGeojson) {
						this.clearToolTip();
						this.dataGeojson.remove();
						this.removeCaption();
						this.dataGeojson = null;
					}

					if (this.dataGeojson2) {
						this.clearToolTip(this.dataGeojson2);
						this.dataGeojson2.remove();
						this.removeCaption(this.dataGeojson2);
						this.dataGeojson2 = null;
					}

					this.data = [];
					this.isMouseOver = false;
					this.curUrbanKey = null;
					this.curSelectedLayer = null;
				};

				this.clearGeo2 = function() {
					if (this.dataGeojson2) {
						this.clearToolTip(this.dataGeojson2);
						this.dataGeojson2.remove();
						this.removeCaption(this.dataGeojson2);
						this.dataGeojson2 = null;
					}
				};

//				this.clearLayer = function() {
//					if (this.dataGeojson) {
//						this.clearToolTip();
//						this.dataGeojson.remove();
//						this.removeCaption();
//					}
//				};

				this.bringToFront = function(pLayer) {
					var layer = pLayer;
					if (!sop.Browser.ie) {
						layer.bringToFront();
					}

					if (!(this.dataGeojson2 && this.dataGeojson2.hasLayer(layer))) {
						if (this.dataGeojson2) {
							this.dataGeojson2.eachLayer(function (layer) {
								if (!sop.Browser.ie) {
									layer.bringToFront();
								}
							});
						}
					}
				};

				this.bringToBack = function(pLayer) {
					var layer = pLayer;
					if (!(this.dataGeojson2 && this.dataGeojson2.hasLayer(layer))) {
						if (!sop.Browser.ie && sop.Browser.webkit) {
							layer.bringToBack();

							if (this.dataGeojson3) {
								this.dataGeojson3.eachLayer(function (layer) {
									layer.bringToBack();
								});
							}
						}
					}
				};

				this.clearToolTip = function(pDataGeojson) {
					var tgt = pDataGeojson;
					if(tgt === undefined || tgt === null){
						tgt = this.dataGeojson;
					}

					if (tgt != null) {
						tgt.eachLayer(function(tmplayer) {
							var e = {
									target : tmplayer,
									utmk : sop.utmk([tmplayer.feature.properties.x_coor, tmplayer.feature.properties.y_coor])
							};
							that.setPolyLayerMouseout(e);
							tmplayer.unbindToolTip();
						});
					}
				};

				this.createInfoTooltip = function(event, data, type) {
					var html = "<table style='margin:10px;' id='geoToolTip'>";
					html += "<tr><td class='gToolTipTitle' style='width:auto; overflow:visible;'>" + data.properties.urban_nm + "</td></tr>";
					html += "<tr style='height:5px'></tr>";
					html += "<tr><td class='gStatsData'>면적 : ";
					html += (Number(data.properties.area) / 1000000);	// 2022 SGIS5 변경 
//					html += $urbanMain.ui.comma((Number(data.properties.area) / 1000000).toFixed(2));
					html += " ㎢</td></tr>";
					html += "<tr><td class='gStatsData'>기준년도 : ";
					html += data.properties.base_year;
					html += " 년</td></tr>";
					html += "</table>";

					event.target.bindToolTip(html, {
						direction: 'right',
						noHide:true,
						opacity: 1
					}).addTo(this.map.gMap)._showToolTip(event);

					$(".sop-tooltip").parent().css({"width" : "150px"} );
					$(".sop-tooltip").css({"border" : "2px solid " + event.target.options.fillColor} );

					// $("#geoToolTip .gToolTipTitle")
					// .css("font-size", "14px")
					// .css("font-weight", "bold")
					// .css("color", "#3792de");

					$("#geoToolTip .gToolTipTitle").css({
						"font-size" :"14px",
						"font-weight":"bold",
						"color":"#3792de",
					});
					$("#geoToolTip .gToolTipTitle").addClass('mightOverflow'); //추가
					$("#geoToolTip .gStatsData")
						.css("font-size", "12px")
						.css("padding-left", "5px");
				};
			}
	};

	/** ********* OpenAPI ooo Start ********* */

	/** ********* OpenAPI ooo End ********* */

}(window, document));
