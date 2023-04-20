/**
 * 맵에 관한 공통 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2014/08/19 초기 작성 author : 권차욱 version : 1.0 see :
 * 
 */



(function (W, D) {
	W.$map = W.$map || {};
	var errCount = 0;
	var iconList = [];
	//console.log("map.js");
	$(document).ready(function(){
		
		//getReversGeoCode(sMap.map.that);
	});
	
	sMap = {
			
	     map : function() {
				 var that = this;
				 this.id = null;
				 this.mapInfo = null;
				 this.mapBtnInfo = null;
				 this.gMap = null;
				 this.target = null;	 		// target element
				 this.isMouseOver = false;
				 this.isDrop = false;
				 this.moveMap = null; /// 맵이동
				 this.center = null; /// 맵이동
				 this.zoom = 4;			    // zoom level
				 this.isZoomSliderControl = false;
				 this.isStatisticTileLayer = false;
				 this.isMeasureControl = true;
				 this.dataGeojson = null;
				 this.geojsonData = null;
				 this.tradeGeojon = null;
				 this.lendData = null;
				 this.rankData = null;
				 this.togetherData = null;
				 this.selectAdmCd = null;
				 this.selectMapType = 1;
				 this.mapDataInfo = null;
				 this.mapCategory = 1;
				 this.selectPolygon = null;
				 this.layoutList = null;
				 this.cmMaker = null;
				 this.flagF = true;
				 this.isMouseOver = false;
				 this.infoControl = null;
				 this.selectedBoundMode = null;
				 this.isMultiSelectedBound = null;
				 this.isOneSelectArea = false;
				 this.markerGroup = [];
				 this.markers = null; 
				 
				 
				 this.createMap = function (delegate, target, opt) {
						
						if (!opt.center) {
							this.center = [ 989674, 1818313 ];
						}
						else {
							this.center = opt.center;
						}
						
						if (delegate) {this.delegate = delegate;}
						if (target) {this.target = target;}
						//if (opt.scale !== undefined) {this.isScale = opt.isScale;}
						//if (opt.panControl !== undefined) {this.isPanControl = opt.isPanControl;}	
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
						this.gMap.setMinZoom(1);
						//this.bounds = this.gMap.getBounds();
						this.render = sop.svg();
						
						//마커설정
						//this.markerGroup = new sop.LayerGroup();
						this.markers = sop.markerClusterGroup({animateAddingMarkers : true });
						console.log(this.markers);
						this.gMap.addLayer(this.markers);
					};
					
					
					this.addControlEvent = function (type, opt) {
						
						console.log(type);
						
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
								that.zoom = e.target._zoom;
								if (that.delegate && 
								    that.delegate.callbackFunc &&
								    that.delegate.callbackFunc.didMapZoomEnd instanceof Function) {
									that.delegate.callbackFunc.didMapZoomEnd(e, that);
								}
							});
						}
						// 클릭
						else if (type == "click") {
							this.gMap.on("click", function (e) {
								that.zoom = e.target._zoom;
								if (that.delegate && 
								    that.delegate.callbackFunc &&
								    that.delegate.callbackFunc.didClick instanceof Function) {
									that.delegate.callbackFunc.didClick(e, that);
								}
							});
						}else if (type == "mousemove") {
							this.gMap.on("mousemove", function (e) {
								that.zoom = e.target._zoom;
								if (that.delegate && 
								    that.delegate.callbackFunc &&
								    that.delegate.callbackFunc.didMousemove instanceof Function) {
									that.delegate.callbackFunc.didMousemove(e, that);
								}
							});
						}

						// 사용자지정 이벤트
						else if (type == "draw") {
							that.gMap.on("draw:created", function (e) {
								var layer = e.layer;
								if (that.delegate && that.delegate.callbackFunc && 
									that.delegate.callbackFunc.didDrawCreate instanceof Function) {
									that.delegate.callbackFunc.didDrawCreate(e, e.layerType, that);
								}
							});
						}
						
						// 우클릭
						else if (type == "contextmenu") {
							
								that.gMap.on("contextmenu", function (e) {
									if(that.isOneSelectArea){
										var layer = e.layer;
										if (that.delegate && that.delegate.callbackFunc && 
											that.delegate.callbackFunc.didRightClick instanceof Function) {
											that.delegate.callbackFunc.didRightClick(e, e.layerType, that);
										}
									}
								});
							
						}
						
						
						
		
					};
					
					this.removeMarker = function (marker) {
						if (marker) {
							marker.remove();
						}
					};
					
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
									maxZoom = 13;
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
							maxZoom = 13;
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
					
					this.setLegendColor = function () {
						if (this.dataGeojson) {
							this.updatePolygonGeoJson();
						}
					};
					
					// 맵이동
					this.moveMap = function(x,y){
							this.gMap.setView(sop.utmk(x, y));
					};
					//센터이동
					this.moveMapCenter = function(center,level){
						this.gMap.setView(center,level);
					};
					
					this.setZoomMap = function(level){
						this.gMap.setZoom(level);
					};
					
					this.getMapPolygon = function(){
						getReversGeoCode(that);
					};
					
					this.update = function () {
						this.gMap._onResize();
					},
					
					this.poiZoomLevel = function(){
						this.gMap.on('zoomend zoomlevelschange', function () {												
						}, this);					
						return this.gMap.getZoom();
					},
					
										
					/// 클리어관련
					this.clearLayer = function() {
						if (this.dataGeojson) {
							//2016.09.01 9월 서비스
							//this.clearToolTip();
							this.dataGeojson.remove();
							//this.removeCaption();
						}
						
						if (this.geojson) {
							this.geojson.remove();
						}
					};
					
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
					
					this.clearToolTip = function() {
						/*if (this.dataGeojson != null) {
							this.dataGeojson.eachLayer(function(tmplayer) {
								var e = {
										target : tmplayer,
										utmk : sop.utmk([tmplayer.feature.properties.x, tmplayer.feature.properties.y])
								};
								that.setPolyLayerMouseout(e);
								tmplayer.unbindToolTip();
							});
						}*/
					};
					
		
					
					
					
					///
					
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
					
					this.setBoundSelectedMoode = function(mode) {
						this.selectedBoundMode = mode;
						this.isMultiSelectedBound = true;
						if (mode == null) {
							this.isMultiSelectedBound = false;
						}
					};
					
					//데이터관련
					this.addPolygonGeoJson = function (obj, type, opt) {
						that.clearLayer();
						var adm_cd = "";
						var index = 0;
						
						var category =  $('#searchCategory').val();
						var rankStart = $('#rankStart').val();
						var rankEnd = $('#rankEnd').val();
						
						that.layoutList = null;
						that.layoutList = [];
						var geojson = sop.geoJson(obj, {
							style : this.setPolygonGeoJsonStyle(type,obj),
							onEachFeature : function (feature, layer,index) {
								adm_cd = layer.feature.properties.adm_cd;
								//레이웃 저장
								that.layoutList.push(layer);
										
								
								if(!that.isOneSelectArea){
									if(layer.feature.properties.value == 0 ||layer.feature.properties.value == "N"  ){
										that.setLayerColor2(feature, layer);
										
									}else{
										that.setLayerColor(feature, layer);
									}
								}else{
									 
									that.setLayerColor2(feature, layer ,"select");
								}
								
								if(category ==2){
									if(rankStart>layer.feature.properties.rank){
										that.setLayerColor3(feature, layer);	
									}else if(rankEnd != "" && rankEnd < layer.feature.properties.rank){
										that.setLayerColor3(feature, layer);
									}else if(layer.feature.properties.value == 0 ||layer.feature.properties.value == "N"  ){
										that.setLayerColor2(feature, layer);
									}
								}
								
								layer.on({
									mouseover : function (e) {
										that.isMouseOver = true;
										if (!that.isLayerMouseEventDisabled) {
											that.clearToolTip(); //9월 서비스
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
												that.delegate.callbackFunc.didMouseOverPolygon(e, feature, layer.options.type, that);
											}
										}
									},
									mouseout : function (e) {
										that.isMouseOver = false;
										if (!that.isLayerMouseEventDisabled) {
											
											that.setPolyLayerMouseout(e,layer.feature.properties.rank);
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
									
									drop : function (e) {
										var layer = e.target;
										that.curDropPolygonCode = that.curPolygonCode;
										that.isNoReverseGeocode = true;
										that.dropEvent = e;
										that.curDropCd = layer.feature.properties.adm_cd;
										
										if (!this.isInnerMapShow3) { //mng_s 20180213 행정구역 그리드의 경우 읍면동으로 내려가면 8 자리인데 7자리로 자르면 않됨
											if (that.curDropCd.length > 7) {
												that.curDropCd = that.curDropCd.substring(0,7);
											}
										}

										var zoom = that.zoom;	
										
										//mng_s 20210216 이진호
										//대화형 통계지도에 위성지도로 변경 후 선택항목을 드래그 하여 결과표출 시 위성지도 줌이 안맞는 현상 수정
										//혹시 몰라서 대화형 통계지도에서만 적용되도록 분기처리 하였음
										if(document.location.href.match("interactiveMap")){
											that.mapMove([layer.dropUTMK.x, layer.dropUTMK.y], that.setZoomCalibrate(zoom, -1));
										}else{
											that.mapMove([layer.dropUTMK.x, layer.dropUTMK.y], that.setZoomCalibrate(zoom, 6));
										}
										//mng_e 20210216 이진호
										
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
												that.delegate.callbackFunc.didMouseOverPolygon(e, e.target.feature, layer.options.type, that,that.id);
											}
												
										} else if(e.action == "mouseout") {
											//$thematicMapFrame06.ui.mapList[0].setPolyLayerMouseout(e);
											//$thematicMapFrame06.ui.mapList[1].setPolyLayerMouseout(e);
										}
									},
									setColor : function(e){
										
									},
									getCode : function(e){
										return e.feature.properties.adm_cd;
									}
								});
								

							},
							type : type, // 일반경계인지, 데이터경계인지 구분
							layerCode : that.curPolygonCode,
						
						});
						
						//setRank(adm_cd);
						this.geojson = geojson;
						this.geojson.addTo(this.gMap);
						//
						this.dataGeojson =geojson; 
						
						if(adm_cd != null && adm_cd != undefined){
							//console.log("[map.js] addPolygonGeoJson() 상위111 adm_cd[" + adm_cd);
							//console.log("[map.js] addPolygonGeoJson() 상위111 adm_cd.length[" + adm_cd.length);
						}
						
						
						//집계구경계의 중심좌표 설정
						if (!this.isTradeMapShow && !this.isInnerMapShow && !this.isInnerMapShow3) { //mng_s 20180209 isInnerMapShow3 추가
							if (adm_cd != undefined && adm_cd.length > 7) {
								geojson.eachLayer(function(layer) {
									if (layer.feature.properties.adm_cd.length > 7) {
										var center = layer.getCenter();
										layer.feature.properties["x"] = center.x;
										layer.feature.properties["y"] = center.y;
									}
								});
							}
						} 
						
						
						return geojson;
					};
					
					this.setSelectRank = function(selectCd){
						that.layoutList.forEach(function(item, index){
							var admCd =  item.feature.properties.adm_cd;
							if(selectCd == admCd){
								item.setStyle({
									weight : 5,
									color :  "#003399",
									dashArray : item.options.dashArray,
									fillOpacity : item.options.fillOpacity,
									fillColor : item.options.fillColor
								})
								
							}else{
								item.setStyle({
									weight : 1.75,
									color : "#666666",
									dashArray : item.options.dashArray,
									fillOpacity : item.options.fillOpacity,
									fillColor : item.options.fillColor
								});
							}
							
						});
					};
					
					this.setPolygonGeoJsonStyle = function (type,data) {
						// 일반경계일 경우, 색상을 채우지않고,
						// 데이터경계일 경우, 색상을 채운다.
						var color = "#666666";
						var fillColor = "white";
						var weight = 1.75;
						var fillOpacity = 0;
						var dashArray =  '0';//박길섭 수정
				
						if($legendInfo.ui.slideInfo.slideValue1 == undefined){
							$legendInfo.ui.slideInfo.slideValue1 = 0.7;
						};
						this.dataPolygonFillOpacity = $legendInfo.ui.slideInfo.slideValue1;
						fillOpacity = this.dataPolygonFillOpacity;
						$("#legendDataSlider").slider("option","value",fillOpacity);
						//mng_e
						dashArray = "";
						
						
						return {
							weight : weight,
							opacity : 1,
							color : color,
							dashArray: dashArray,
							fillOpacity : fillOpacity,
							fillColor : fillColor
						};
					};
					
					this.setLayerColor = function (feature, layer) {
				
							var tmpLevel = new Array();	
							feature["combine"] = true;

							var datainfo = feature.properties;	
							

							
							var fillColor = that.legend.getColor(feature.properties.value, that.legend.valPerSlice[0])[0];
							layer.setStyle({
								weight : layer.options.weight,
								color : layer.options.color,
								dashArray : layer.options.dashArray,
								fillOpacity : layer.options.fillOpacity,
								fillColor : fillColor
							});
					
						
					};
					
					this.setLayerColor2 = function (feature, layer, mode) {
							
						   if(mode != "select"){
								var tmpLevel = new Array();	
								feature["combine"] = true;
		
								var datainfo = feature.properties;	
								var fillColor = "white";
		
								
								var fillColor = that.legend.getColor(feature.properties.value, that.legend.valPerSlice[0])[0];
								layer.setStyle({
									weight : layer.options.weight,
									color : layer.options.color,
									dashArray : layer.options.dashArray,
									fillOpacity : 0.5,
									fillColor : "#FFF"
								});
						   }else{
							   layer.setStyle({
									weight : layer.options.weight,
									color : layer.options.color,
									dashArray : layer.options.dashArray,
									fillOpacity : 0.0,
									fillColor : "#FFF"
								});
						   }
						   
					
						
					};
					
					this.setLayerColor3 = function (feature, layer) {
						
						var tmpLevel = new Array();	
						feature["combine"] = true;

						var datainfo = feature.properties;	
						var fillColor = "white";

						
						var fillColor = that.legend.getColor(feature.properties.value, that.legend.valPerSlice[0])[0];
						layer.setStyle({
							weight : 0,
							color : layer.options.color,
							dashArray : layer.options.dashArray,
							fillOpacity : 0,
							fillColor : "#FFF"
						});
				
					
				};
					this.setArearSelectLayout = function(e,flag){
						var layer = e.target;
						
						if(!flag){
							layer.setStyle({
								weight : 3,
								dashArray : layer.options.dashArray,
								fillOpacity : 0.7,
								fillColor : "#F06292"
							});
						}else{
							layer.setStyle({
								weight : 3,
								dashArray : layer.options.dashArray,
								fillOpacity : 0,
								fillColor : "#F06292"
							});
						}
						
					}
					
					this.setPolyLayerMouseout = function (e,data) {
						var layer = e.target;
						var color = "#666666";
						var fillColor = "white";
						var weight = 1.75;
						
						
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
						
						var category =  $('#searchCategory').val();
						
						if(category == 2){
							
							var rankStart = $('#rankStart').val();
							var rankEnd = $('#rankEnd').val();
							
							if(typeof data == "undefined" || data == null || data == ""){
								layer.setStyle({
									weight : 0,
									fillOpacity : 0
								});
							}else if(rankStart > data){
								layer.setStyle({
									weight : 0,
									fillOpacity : 0
								});
								
							}else if(rankEnd != "" && rankEnd < data){
								layer.setStyle({
									weight : 0,
									fillOpacity : 0
								});
							}
							
							
							
						}
						
					};
					
					this.setPolyLayerMouseover = function (e) {
						var layer = e.target;
						layer.setStyle({
							weight : 5,
							//color : "#0086c6",
							color :  "#003399",
							dashArray : layer.options.dashArray,
							fillOpacity : layer.options.fillOpacity,
							fillColor : layer.options.fillColor
						});
						
						if (!sop.Browser.ie) {
							layer.bringToFront();
						}
						
						
						
					};
					
					
					
					this.setLegendColor = function () {
						if (this.dataGeojson) {
							this.updatePolygonGeoJson();
						}
					};
					
					this.setLegendForStatsData = function (data1) {
						var arData = new Array();
						var result = [];
						
						var i = 0;
						var max = 0;
						data1.features.forEach(function(item,index){
							
							if(item.properties.value != null && item.properties.value != 'N') {
								
								if(max < item.properties.value) max= item.properties.value;
								
								result[i] = item.properties.value;
								i++;
							}
										  
						});
						
						if(result.length <1) result = [0];
						
						
						result.forEach(function(item,index){
							if(item <= 0){
								result[index] =Math.ceil(max*0.1);
							}
						});
						
						arData.push(result);
						
						
						that.legend.valPerSlice = that.legend.calculateLegend(arData);//test
					};
					
					this.selectRankPolygon = function (code){
						
					};
					
					this.removeMarker = function(){
						console.log(this.markers);
						
						if(this.markerGroup.length >0){
							this.markers.removeLayers(this.markerGroup);
							this.markerGroup = [];
						}
						
					};
					
					this.addMarker = function (data, options,mode) {		
						var marker = null;
						var visible = false;
						
						var bizSiz = ["4","1","1","2","3","3","4"]
						var bizSizTitle = ["기타","대기업","데기업","중견기업","중소기업","중소기업","소상공인"]
						
						data.forEach(function(item,index){
							var markerHtml = "";
							
							if(mode != "select"){
								    markerHtml += "  <span class='marker companySize"+bizSiz[item.ent_sz]+" group'>";
								    markerHtml += "    <div>";
								    markerHtml += "      <i class=\"icon_groupMarker\">";
								    markerHtml += "      </i>";
								    markerHtml += "      <span class=\"count\">"+bizSizTitle[item.ent_sz]+"</span>";
								    markerHtml += "    </div>";
								    markerHtml += "  </span>";
							    
							}else{
								
								var ishedofc = "지사"; 
								if(item.hedofc_yn == 1) ishedofc ="본사"; 
								
								markerHtml += "  <span class='marker pointer'>";
							    markerHtml += "    <div>";
							    markerHtml += "      <i class=\"icon_marker\">";
							    markerHtml += "      </i>";
							    markerHtml += "      <span class=\"count\">"+ishedofc+"</span>";
							    markerHtml += "    </div>";
							    markerHtml += "  </span>";
								
							}
							    
							var markerIcon = new sop.DivIcon({  
								                           html:markerHtml
								                         , className: "mapMarker"
								                         , iconAnchor: new sop.Point(12.5,40)
								                         , iconSize: new sop.Point(50, 50)
							                             , infoWindowAnchor: new sop.Point(1,-10)
							                          });
							
							marker = sop.marker([ item.x, item.y ],{
								icon: markerIcon
								,visible : false
							});
							
							marker.addTo(that.markers);
							that.markerGroup.push(marker);	
							
							var html ="";
							html += '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
							html += 	'<tr>';
							html += 		'<th style="word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>'+item.biz_nm+'</strong></th>';
							html += 		'<td></td>';
							html += 	'</tr>';
							html += '</table>';
							
							marker.bindInfoWindow(html);
							
						});
						
						
					}
					
					this.setArearMode = function(flag){
						isOneSelectArea = flag;
					}
					
			 },
			 

			 
			 	
	};


	
	
}(window, document));


