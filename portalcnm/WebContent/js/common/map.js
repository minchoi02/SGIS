/**
 * 맵에 관한 공통 메소드
* 
* history : 네이버시스템(주), 1.0, 2014/08/19  초기 작성
* author : 권차욱
* version : 1.0
* see : 
*
 */

(function(W, D) {
	W.$map = W.$map || {};
	
	var isFirstStdBounds = true;
	var gPolygonCode = 4; 									// 기준경계코드 1:시도단위, 2:시군구, 3:읍면동, 4:집계구
	var isClick = false;
	var curSelectedLayer = null;
	var isMouseOver = false;

	map = {
			
			delegate : null,
			gMap : null,
			target : null, 				// target element
			isScale : true,				// map scale 유무
			isPanControl : false,		// map panControl 유무
			center : null,				// center 좌표(utmk)
			zoom : 4,						// zoom level
			geojson : null,
			dataGeojson : null,
			geojsonData : null,
			bounds : null,
			curPolygonCode : 4,
			data : null,
			curSidoCd : null,
			curSiggCd : null,
		    curDongCd : null,
		    curDropPolygonCode : null,
		    showDataParam : null,
		    valPerSlice : 0,
		    legendColor : null, 
		    
			
			// 맵을 생성한다.
			 createMap : function(delegate, target,  opt) {
				
				if (!opt.center) {
					this.center = [953922, 1952036];
				}else {
					this.center = opt.center;
				}
				
				if (delegate) this.delegate = delegate;
				if (target) this.target = target;
				if (opt.scale) this.isScale = opt.isScale;
				if (opt.panControl) this.isPanControl = opt.isPanControl;
				if (opt.zoom) this.zoom = opt.zoom;
				
				this.gMap = sop.map(this.target, {scale:this.isScale, panControl:this.isPanControl });
				this.gMap.setView(sop.utmk(this.center[0], this.center[1]) , this.zoom);
				this.bounds = this.gMap.getBounds();
			
			},
			
			mapMove : function(center, zoom) {
				if (center != null) {
					this.center = center;
					
					if (zoom != null) {
						this.zoom = zoom;
						this.gMap.setView(sop.utmk(center[0], center[1]) , zoom);
					}else {
						this.gMap.setView(sop.utmk(center[0], center[1]));
					}
				}
			},
			
			setZoom : function(zoom) {
				if (zoom != null) {
					this.zoom = zoom;
					this.gMap.setZoom(zoom);
				}
			},
			
			contains : function (bounds, point) {
				if (point && bounds) {
						return bounds.contains(point);
				}
			},
			
			addMarker : function(x, y, options) {
				
				var marker = null;
				if (this.gMap) {
					marker = sop.marker([x, y]);
					
					if (options.tooltipMsg != null) {
						if (options.visible != null) {
							if (options.visible) {
								marker.bindPopup(options.tooltipMsg).openPopup();
							}else {
								marker.bindPopup(options.tooltipMsg);
							}
						}else {
							marker.bindPopup(options.tooltipMsg);
						}
					} 
					marker.addTo(this.gMap);
				}
				return marker;
			},
			
			removeMarker : function (marker) {
				if (marker) {
					marker.remove();
				}
			},
			
			clearDataOverlay : function() {
				if (this.dataGeojson) {
            		this.dataGeojson.remove();
            	}
				this.data = null;
				this.dataGeojson = null;
				this.curDropPolygonCode = null;
			} ,
			
			setLegendColor : function (colorSet) {
				if (colorSet) {
					this.legendColor = colorSet;
				}
			},
 			
			addPolygonGeoJson : function(obj, type, opt) {		
				var geojson = sop.geoJson(obj, {
			        style: function(feature) {    	
			        	
			        	//일반경계일 경우, 색상을 채우지않고,
			        	//데이터경계일 경우, 색상을 채운다.
			        	var color = "#666666";
			        	var fillColor = "#dddddd";
			        	var weight = 3;
			        	var fillOpacity = 0.4;
			        	if (type == "data") {
			        		color = "#ff7e00",
			        		fillColor = "#ffd6ed";
			        		weight = 4;
			        		 fillOpacity = 0.7;
			        	}
			        	
			        	  return {
			        		  	weight: weight,
			        	        opacity: 1,
			        	        color: color,
			        	        dashArray: '3',
			        	        fillOpacity: 0.4,
			        	        fillColor:  fillColor
		                    };
			        },
			        onEachFeature:function(feature, layer) {
			        	if (map.showDataParam != null) {
			        		for (param in feature.info) {
			        			if (param == map.showDataParam) {
			        				layer.options.fillColor =getColor(feature.info[param]);
			        				//layer.options.fillOpacity = 1;
			        				break;
			        			}
			        		}
			        	} 
			        	
			        	layer.on({
			                mouseover: function(e) {
			                	isMouseOver = true;
			                	
			                	var layer = e.target;         	
			                	if (layer == curSelectedLayer) {
				                		 layer.setStyle({
						                        weight : 4,
						                        color : "#ff0000",
						                        dashArray : layer.options.dashArray,
						                        fillOpacity : layer.options.fillOpacity,
						                        fillColor : layer.options.fillColor
						                    }); 
				                }else {
				                		layer.setStyle({
					                        weight : 4,
					                        color : "#0086c6",
					                        dashArray : layer.options.dashArray,
					                        fillOpacity : layer.options.fillOpacity, 
					                        fillColor: layer.options.fillColor
					                    });

				                }
    	 
			                    if (!sop.Browser.ie) {
			                        layer.bringToFront();
			                    }

			                    //mouse over , 사용자 콜백
			                    if (map.delegate &&
			                    	map.delegate.callbackFunc && map.delegate.callbackFunc.didMouseOverPolygon) {
			                    	map.delegate.callbackFunc.didMouseOverPolygon(e, feature, layer.options.type);
								}			
			                            
			                },
			                mouseout: function(e) {
			                	isMouseOver = false;
			                	
			                	var layer = e.target;			      	
			                	if (curSelectedLayer) {
			                		 layer.setStyle({
					                        weight : 5,
					                        color : "#ff0000",
					                        dashArray : layer.options.dashArray,
					                        fillOpacity : layer.options.fillOpacity,
					                        fillColor : layer.options.fillColor
					                    });
			                	}

			                	if (layer != curSelectedLayer) {
			                		
			                		var color = "#666666";
			                		var weight = 3;
			                		if (layer.options.type == "polygon") {
			                			color = "#666666";
			                			weight = 3;
			                		}else {
			                			color = "#ff7e00";
			                			weight = 4;
			                		}
			                		
			                		layer.setStyle({
				                        weight : weight,
				                        color : color,
				                        dashArray : layer.options.dashArray,
				                        fillOpacity : layer.options.fillOpacity, 
				                        fillColor: layer.options.fillColor
				                    });
			                		
			                	}
			                	
			                	// mouse out, 사용자 콜백
			                	if (map.delegate &&
				                    map.delegate.callbackFunc && map.delegate.callbackFunc.didMouseOutPolygon) {
				                    map.delegate.callbackFunc.didMouseOutPolygon(e, feature, layer.options.type);
								}			
			                	
			                },
			                click: function(e) {
			                	var layer = e.target;
			                	
			                	// 이전에 선택된 레이어가 있을 경우,
			                	// 원래 레이어스타일로 되돌린다.
			                	if (curSelectedLayer) {
			                		var color = "#666666";
			                		var weight = 3;
			                		if (layer.options.type == "polygon") {
			                			color = "#666666";
			                			weight = 3;
			                		}else {
			                			color = "#ff7e00";
			                			weight = 4;
			                		}
			                		
			                		curSelectedLayer.setStyle({
				                        weight : weight,
				                        color : color,
				                        dashArray : curSelectedLayer.options.dashArray,
				                        fillOpacity : curSelectedLayer.options.fillOpacity, 
				                        fillColor: curSelectedLayer.options.fillColor
				                    });
			                		
			                	}

			                	curSelectedLayer = layer;
			                	
			                    layer.setStyle({
			                        weight : 4,
			                        color : "#ff0000",
			                        dashArray : layer.options.dashArray,
			                        fillOpacity : layer.options.fillOpacity,
			                        fillColor : layer.options.fillColor
			                    });
			                    
			                    if (!sop.Browser.ie) {
			                        layer.bringToFront();
			                    }
			                    
			                    map.gMap.fitBounds(e.target.getBounds(), {maxZoom:map.zoom});
			                	
			                	if (map.delegate &&
					                map.delegate.callbackFunc && map.delegate.callbackFunc.didSelectedPolygon) {
					                map.delegate.callbackFunc.didSelectedPolygon(e, feature, layer.options.type);
					                console.log(feature);
								}			
			                },
			                
			                drop : function (e) {
			                	var layer = e.target;
			                	map.gMap.fitBounds(layer.getBounds(), {maxZoom:map.zoom, animate:false});
								map.curDropPolygonCode = map.curPolygonCode;
								if (map.delegate && 
										map.delegate.callbackFunc && map.delegate.callbackFunc.didMapDropEnd instanceof Function) {
										map.delegate.callbackFunc.didMapDropEnd(e.dropEvent, e.dropSource, e.dropOriEvent, layer.feature.properties);
								}
								isMouseOver = false;
		
			                }

			            });
			        },
			        type : type,	//일반경계인지, 데이터경계인지 구분
			        layerCode : map.curPolygonCode,
			      
			    });
				
				if (type == "polygon") this.geojson = geojson;
				else 							  this.dataGeojson = geojson;

				if (opt) {
					if (opt.group) {
						if (type == "polygon") 	this.geojson.addTo(opt.group);
						else 								this.dataGeojson.addTo(opt.group);
					}
					else {
						if (type == "polygon") 	this.geojson.addTo(this.gMap);
						else 								this.dataGeojson.addTo(this.gMap);
					}
				}else {
					if (type == "polygon") 	this.geojson.addTo(this.gMap);
					else 								this.dataGeojson.addTo(this.gMap);
				}
				
			},
			
			addControlEvent : function(type, opt) {
			
				// 지도이동시 발생
				if (type == "movestart") {
					this.gMap.on("movestart", function(e){
						if(map.delegate && 
							map.delegate.callbackFunc && 
							map.delegate.callbackFunc.didMapMoveStart instanceof Function) {
							map.delegate.callbackFunc.didMapMoveStart(e);
						}
					});
				}
				
				else if (type == "moveend") {
					this.gMap.on("moveend", function(e){		
						var center = e.target.getCenter();
						map.center = [center.x, center.y] ;
						map.bounds = e.target.getBounds();
	
							// 맵 이동완료 시, 센터좌표가 기준바운더리에 속하면,
							// 경계를 호출하지 않고, 넘어서면 경계를 호출하여 다시 그린다.			
							var isInnerForDataBounds = false;
							
							
							if (map.dataGeojson) {	
								for (var i in map.dataGeojson._layers) {
									if (map.contains(map.dataGeojson._layers[i]._bounds, map.center)) {
										isInnerForDataBounds = true;
										break;
									}else {
										isInnerForDataBounds = false;
									}	
								}
							}
							
							var isInnerContainBounds = false;
							if (map.geojson && !isInnerForDataBounds) {	
								for (var k in map.geojson._layers) {
									if (map.contains(map.geojson._layers[k]._bounds, map.center)) {
										isInnerContainBounds = true;
										break;
									}else {
										isInnerContainBounds = false;
									}	
								}
								
								if (!isInnerContainBounds) {
									
									// 조건드랍 경계코드가 있을 경우,
									// 현재경계를 조건드랍 경계로 이동시킨다.(한단계 위경계로 이동)
									if (map.curDropPolygonCode) {
										if (map.curPolygonCode != map.curDropPolygonCode) {	
											if (map.curPolygonCode > map.curDropPolygonCode) {
												map.curPolygonCode = map.curDropPolygonCode;
												map.autoUpBoundary();
												//map.curDropPolygonCode = null;
											}
										}			
									}
									map.openApiReverseGeoCode(map.center);	
								}
							}

						if (map.delegate && 
							map.delegate.callbackFunc && map.delegate.callbackFunc.didMapMoveEnd instanceof Function) {
							map.delegate.callbackFunc.didMapMoveEnd(e);
						}

					});
				}
				
				// 줌 시작
				else if (type == "zoomstart") {
					this.gMap.on("zoomstart", function(e){
						if(map.delegate &&
							map.delegate.callbackFunc && map.delegate.callbackFunc.didMapZoomStart instanceof Function) {
							map.delegate.callbackFunc.didMapZoomStart(e);
						}
					});
				} 
				// 줌 종료
				else if (type == "zoomend") {
					this.gMap.on("zoomend", function(e){
						map.zoom = e.target._zoom;
						map.bounds = e.target.getBounds();
						
						// 전국단위 경계표출
						if (map.zoom <= 3) {
							if (map.curPolygonCode != 1) {					
								if (map.geojson) {
									map.geojson.remove();
								}
								map.addPolygonGeoJson(geo,  "polygon");		
								
							}
							map.curPolygonCode = 1;							
						}
						
						// 시단위 경계표출
						else if (map.zoom > 3 && map.zoom <= 5)  {
							//이전의 경계레벨이 시단위가 아닐경우,
							if (map.curPolygonCode != 2) {
								map.openApiReverseGeoCode(map.center);
							}
							map.curPolygonCode = 2;
						}
						
						// 시구군단위 경계표출
						else if (map.zoom > 5 && map.zoom <= 7) {
							//이전의 경계레벨이 시군구단위가 아닐경우
							if (map.curPolygonCode != 3) {
								map.openApiReverseGeoCode(map.center);
							}
							map.curPolygonCode = 3;
						}
						
						// 동단위 경계표출
						else if (map.zoom > 7 && map.zoom  <= 9) {
							//이전의 경계레벨이 동단위가 아닐 경우
							if (map.curPolygonCode != 4) {
								map.openApiReverseGeoCode(map.center);
							}
							map.curPolygonCode = 4;
						}
						
						// 집계구 경계표출
						else if (map.zoom > 9) {
							//이전의 경계레벨이 집계구단위가 아닐 경우
							if (map.curPolygonCode != 5) {
								map.openApiReverseGeoCode(map.center);
							}
							map.curPolygonCode = 5;
						}
						
						if (map.delegate && 
							map.delegate.callbackFunc && map.delegate.callbackFunc.didMapZoomEnd instanceof Function) {
							map.delegate.callbackFunc.didMapZoomEnd(e);
						}
					});
				}
				
				// 경계구역으로 아이템 drop
				else if (type == "drop") {
					$("#" + map.target).droppable({
						onDrop : function(e, s, o) {
							map.gMap.eachLayer(function(layer) {
								// 마우스 이벤트에 해당하는 레이어 포인트를 찾는다.
								if( layer._containsPoint) {
									var point = map.gMap.mouseEventToLayerPoint(o);
									if( layer._containsPoint(point) ) {									
										if (layer.options.layerCode == map.curPolygonCode && isMouseOver) {
											layer.fire("drop", {dropEvent:e, dropSource:s, dropOriEvent:o});
										}
									}
								}
							});
						}
					});	
				}
		
			},
			
			autoDownBoundary : function () {
				switch (this.curPolygonCode) {
				
					case 1:
						this.setZoom(5);
						break;
					
					case 2:
						this.setZoom(6);
						break;

					case 3:
						this.setZoom(8);
						break;

					case 4:
						this.setZoom(10);
						break;
					
					case 5:
						console.log("집계구");
						break;

					default:
						break;
				
				}
				
			},
			
			autoUpBoundary : function () {
				switch (this.curPolygonCode) {
				
					case 1:
						this.setZoom(3);
						break;
				
					case 2:
						this.setZoom(5);
						break;

					case 3:
						this.setZoom(7);
						break;

					case 4:
						this.setZoom(9);
						break;
				
					case 5:
						this.setZoom(10);
						break;

					default:
						break;

				}
				
			},
			
			getLocation : function() {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function(position){
						console.log(position);
					});
				}else {
					console.log("브라우져가 기능을 제공하지 않습니다.");
				} 
				
			},
			
			setStatsData : function(data, showDataParamName) {
				this.data = null;
				this.showDataParam = null;
				
				if (data != null) {
					this.data = data;
				}
				
				if (showDataParamName != null && showDataParamName.length>0) {
					this.showDataParam = showDataParamName;
				}
				
			},
 			
			
			// OpenAPI 행정동경계 검색
			openApiBoundaryHadmarea : function(adm_cd, year, low_search) {
				var sopOpenApiHadmareaObj = new sop.openApi.hadmarea.api();
				sopOpenApiHadmareaObj.addParam("adm_cd", adm_cd);
				sopOpenApiHadmareaObj.addParam("year", year);
				sopOpenApiHadmareaObj.addParam("low_search", low_search);
				sopOpenApiHadmareaObj.request({
			        method : "GET",
			        async : true,
			        url : openApiPath+"/SOPOpenAPI/OpenAPI3/boundary/hadmarea.geojson"
			    });
			},
			
			// OpenAPI 집계구경계 검색
			openApiBoundaryStatsarea : function(adm_cd) {
				var sopOpenApiStatsareaObj = new sop.openApi.statsarea.api();
				sopOpenApiStatsareaObj.addParam("adm_cd", adm_cd);
				sopOpenApiStatsareaObj.request({
			        method : "GET",
			        async : true,
			        url : openApiPath+"/SOPOpenAPI/OpenAPI3/boundary/statsarea.geojson"
			    });
			},
			
			// OpenAPI 리버스지오코딩
			openApiReverseGeoCode : function(center) {
				var sopOpenApiReverseGeoCodeObj = new sop.openApi.ReverseGeoCode.api();
				sopOpenApiReverseGeoCodeObj.addParam("addr_type", "20");
				sopOpenApiReverseGeoCodeObj.addParam("x_coor", center[0]);
				sopOpenApiReverseGeoCodeObj.addParam("y_coor", center[1]);
				sopOpenApiReverseGeoCodeObj.request({
					method : "GET",
					async : true,
					url : openApiPath+"/SOPOpenAPI/OpenAPI3/addr/rgeocode.json"
				});
			}, 
			
	};
	
	/*********** OpenAPI 행정동경계 검색 Start **********/
	(function() {
	    $class("sop.openApi.hadmarea.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res) {
	            if(res.errCd == "0") {
	            	
	            	//기존 경계 지우기
	            	if (map.geojson) {
	            		map.geojson.remove();
	            		map.geojson = null;
	            	}
	            	
	            	//경계데이터에 통계정보를 병합하고, 경계를 그린다.
	            	res = combineStatsData(res, map.data);
	            	if (res.combine && map.data != null) {
	            		if (map.dataGeojson) {
		            		map.dataGeojson.remove();
		            		map.dataGeojson = null;
		            	}
	            		map.addPolygonGeoJson(res,  "polygon");		
	            		map.addPolygonGeoJson(res, "data");				
	            	}else {

	            		map.addPolygonGeoJson(res,  "polygon");		
	            		
	            		// 데이터경계가 있을 경우,
	            		// 지역경계가 데이터경계와 같을 때, 해당 지역경계를 지운다.
	            		if ( map.dataGeojson) {
	    					if (map.geojson.getBounds().equals(map.dataGeojson.getBounds())) {
	    						map.geojson.remove();
	    					}
	    				}
	            		
	            	}
	            	
	            	map.data = null;
	            	
	            	if (map.delegate &&
							map.delegate.callbackFunc && map.delegate.callbackFunc.didFinishedHadmaArea instanceof Function) {
							map.delegate.callbackFunc.didFinishedHadmaArea(res);
					}
	            	
	            } else {
	                alert(res.errMsg);
	            }
	        },
	        onFail : function(status) {
	            alert("에러발생");
	        }
	    });
	}());
	/*********** OpenAPI 행정동경계 검색 End **********/

	/*********** OpenAPI 집계구경계 검색 Start **********/
	(function() {
	    $class("sop.openApi.statsarea.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res) {
	            if(res.errCd == "0") {
	            	
	            	//기존 경계 지우기
	            	if (map.geojson) {
	            		map.geojson.remove();
	            		map.geojson = null;
	            	}
	            	
	            	//경계데이터에 통계정보를 병합하고, 경계를 그린다.
	            	res = combineStatsData(res, map.data);
	            	if (res.combine && map.data != null) {
	            		if (map.dataGeojson) {
		            		map.dataGeojson.remove();
		            		map.dataGeojson = null;
		            	}
	            		map.addPolygonGeoJson(res, "polygon");
	            		map.addPolygonGeoJson(res, "data");				
	            	}else {

	            		map.addPolygonGeoJson(res, "polygon");	
	            		
	            		// 데이터경계가 있을 경우,
	            		// 지역경계가 데이터경계와 같을 때, 해당 지역경계를 지운다.
	            		if ( map.dataGeojson) {
	    					if (map.geojson.getBounds().equals(map.dataGeojson.getBounds())) {
	    						map.geojson.remove();
	    					}
	    				}
	            		
	            	}
	            	map.data = null;
	            	
	            	if (map.delegate &&
							map.delegate.callbackFunc && map.delegate.callbackFunc.didFinishedStatsArea instanceof Function) {
							map.delegate.callbackFunc.didFinishedStatsArea(res);
					}
	            	
	            } else {
	                alert(res.errMsg);
	            }
	        },
	        onFail : function(status) {
	            alert("에러발생");
	        }
	    });
	}());
	/*********** OpenAPI 집계구경계 검색 End **********/
	
	/*********** OpenAPI 리버스지오코딩 Start **********/
	(function() {
		$class("sop.openApi.ReverseGeoCode.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {  	
					var result = res.result[0];
					map.curSidoCd = result.sido_cd;
					map.curSiggCd = result.sgg_cd;
					map.curDongCd = result.emdong_cd;
					
					switch (map.curPolygonCode) {
					
						//전국
					case 1:
						break;
					
						//시도
					case 2:
						map.openApiBoundaryHadmarea(map.curSidoCd, "2010", "0"); 
						break;

						//시군구
					case 3:
						map.openApiBoundaryHadmarea(map.curSidoCd, "2010", "1"); 
						break;

						//동면읍
					case 4:
						map.openApiBoundaryHadmarea(map.curSidoCd + map.curSiggCd, "2010", "1"); 
						break;
					
						//집계구
					case 5:
						map.openApiBoundaryStatsarea(map.curSidoCd + map.curSiggCd + map.curDongCd); 
						break;

					default:
						break;
				
				}
					
					
				} else {
					alert(res.errMsg);
				}
			},
			onFail : function(status) {
				alert("에러발생");
			}
		});
	}());
	/*********** OpenAPI 리버스지오코딩. End **********/		
	
	
	function combineStatsData(boundData) {
		
		if (map.data) boundData["combine"] = true; 
		else				   boundData["combine"] = false; 

		for (var i=0; i<boundData.features.length; i++) {
    		var adm_cd = boundData.features[i].properties.adm_cd;
    		boundData.features[i]["info"] = [];
    		if (map.data != null) {
    			for ( var x=0; x<map.data.result.length; x++) {
        			for (key in map.data.result[x]) {
        				if (key == "adm_cd") {
    	            			if (adm_cd == map.data.result[x].adm_cd) {
    	            				boundData.features[i].info = map.data.result[x];
    	            				break;
    	            			}
        					break;
        				}
        			}
        		}
    		}
    		
    	}
		
		setLegendForStatsData();
		
		return boundData;
		
	};
	
	function  setLegendForStatsData() {
		
		var  arData = new Array();
		if (map.data != null && map.showDataParam != null) {
			for ( var i=0; i<map.data.result.length; i++) {
				for (key in map.data.result[i]) {
					if (key == map.showDataParam) {
						arData.push(map.data.result[i][key]);
						break;
					}
				}
			}
		}
		
		if (arData.length > 0) {
			var min = Math.min.apply(null, arData);
			var max = Math.max.apply(null, arData);
			map.valPerSlice = (min + max) / 5;	
		}
		
		
	};

	
	function getColor(d) {
	    return d < map.valPerSlice*1 ? map.legendColor[0] :
	                    d <  map.valPerSlice*2 ? map.legendColor[1] :
	                    d <  map.valPerSlice*3 ? map.legendColor[2] :
	                    d <  map.valPerSlice*4 ? map.legendColor[3] :
	                    d <=  map.valPerSlice*5 ?map.legendColor[4] :
	            '#FFEDA0';
	};
	
	
}(window, document));
	



