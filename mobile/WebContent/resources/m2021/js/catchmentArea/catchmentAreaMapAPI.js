/**
 * 생활권역 맵에 관한 공통 메소드
 * 
 * history : 2020/06/16 초기 작성 version : 1.0 see : 원형(/js/common/map.js)
 * 
 */
//mng_s  20170802 정책통계지도 범례 좌측으로 고정
var arData2;
var legendData2;
//mng_e  20170802 정책통계지도 범례 좌측으로 고정
(function (W, D) {
	W.$catchmentAreaMapAPI = W.$catchmentAreaMapAPI || {};
	var errCount = 0;

	console.log("catchmentAreaMapAPI.js");
	$(document).ready(function(){
//		$(".toolBar").hide();
	});
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
				this.isMeasureControl = false; //?
				this.isStatisticTileLayer = false;
				this.isDrop = false;
				this.isFirstDraw = true;
				this.isZoomStart = false;
				this.isInnerMapShow = false;
				this.isInnerMapShow2 = false; //그리드 클릭시 사용
				this.isInnerMapShow3 = false; //행정구역 그리드 클릭시 사용
				this.gridLegendClickNum = 0; //mng_s 그리드 범례 클릭한 번호
				this.center = null;			// center 좌표(utmk)
				this.zoom = 4;			    // zoom level
				this.geojson = null;
				this.dataGeojson = null;
				this.geojsonData = null;
				this.tradeGeojon = null;
				this.bounds = null;
				this.curPolygonCode = 4;
				this.dataPolygonCod = 4;	// 조회했던 경계레벨
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
				this.valPerSlice = [];
				this.legendColor = null;
				this.legendValue = [];
				this.combineData = [];
				this.dataType = "normal";
				this.dropEvent = null;
				this.bnd_year = bndYear;
				this.dropInfo = null;
				this.lastGeojsonInfo = null;
				this.infoControl = null;
				this.infoControlDiv = null;
				this.drawControl = null;
				this.legendType = "auto"; 
				this.miniMap = null;
				this.isMiniMapDraw = false; 
				this.isTradeMapShow = false;
				this.catchmentAreabounds = null;
				
				//mng_s 20200311 이진호
				//zoomSliderControl이 대화형 통계지도에만 나오게 분기처리
				//if(location.href.match('interactiveMap')){
					//this.isZoomSliderControl = true;
				//}else{
					//this.isZoomSliderControl = false;
				//}
				//mng_e 20200311 이진호
				
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
				this.isLayerMouseEventDisabled = false;
				this.heatRadius = 20;
				this.heatBlur = 30;//50; //9월 서비스
				this.zoomLevelHeat = true; //9월 서비스
				this.isMultiControlDownBoundary = true;
				this.isNoReverseGeocode = false;
				this.dataPolygonFillOpacity = 0.7;
				this.boundaryCallback = null; //9월 서비스
				this.atdrc_yn = null;//9월 서비스 자치구 유무(자치구 : 1)
				this.combineCallback = null;
				this.isInteractive = false;		//2020년수정변경: 대화형통계지도 구분(ggm)
				this.securityStandardCnt = 4;	//격자 지도 생성시 너무 작은 값이 해당 격자에 들어가게 되면 보안사항에 위배된다고 한다. 그 "작은 숫자"에 대한 기준을 securityStandardCnt가 정한다. 사용하는 곳 - this.setLegendForStatsData
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
					this.miniMap = new sMap.miniMap();	
					this.render = sop.svg();
					this.markers3 = sop.markerClusterGroup({
						animateAddingMarkers: true
					});
					this.gMap.addLayer(this.markers3);
					this.markers2 = new sop.LayerGroup();
					this.gMap.addLayer(this.markers2);
					this.markers = new sop.LayerGroup();
					this.gMap.addLayer(this.markers); 
					
					
					//mng_s 20200309 이진호 
					//대화형 통계지도용 미니맵 적용
					if(document.location.href.match("interactiveMap")){
						var osm2 = new sop.StatisticTileLayer('https://sgisapi.kostat.go.kr/tiles/bmap4/L{z}/{y}/{x}.png', {minZoom: 0, maxZoom: 13, attribution: '' }); //운영
						//var osm2 = new sop.StatisticTileLayer('http://10.134.2.100:20083/tiles/bmap4/L{z}/{y}/{x}.png', {minZoom: 0, maxZoom: 13, attribution: '' }); //로컬
						var miniMap = new sop.Control.MiniMap(osm2, { toggleDisplay: true }).addTo(this.gMap);
						$(".leaflet-control-minimap > .sop-control-container > .sop-top.sop-right").hide();
						$("#btn_toggle").tooltip({
							disabled : true
						});
						$("#btn_toggle").attr('title', '미니맵 숨기기');
						$('.sop-control-zoomSlider.sop-bar.sop-control').css('display', 'none');
						
						//mng_s 20200416 이진호
						//대화형 통계지도에서 보고서 클릭 시 indexMap hide 처리
						$('.sop-bottom.sop-right').attr('data-html2canvas-ignore', 'true');
						//mng_e 20200416 이진호
						
						//mng_s 20200310 이진호
						//지도화면 중심점 마크 표기 및 위치 설정
						//현재 지도 추가를 총 3개 까지 할 수 있는데 더 늘리게 될경우 i의 범위 값 조절
						//for(var i = 1; i <=3; i++){
							//$('#div_target'+i)
							//.css("position", "absolute")
							//.css("top", "50%")
							//.css("left", "50%")
							//.css("margin", $('#div_target').height()/2*-1+"0 0"+$('#div_target').width()/2*-1)
							//.css("width", "10px")
							//.css("height", "10px")
							//.css("z-index", "9999");
						//}
						//mng_e 20200310 이진호
						
					}
					//mng_e 20200309 이진호
					
					
					//mng_20202010 이진호 - kosis에서 운영으로 넘어 올때 UI 수정
					if (location.href.match('kosis_org_id')) {
						//확대
						
						$("header .util").css("top","-16px");
						$(".tb_sizing").addClass("on");
						$(".tb_sizing").children().attr("src","/img/ico/ico_toolbars12.png");
						$(".headerEtc, .gnb, .headerContents form").hide();
						$(".headerContents h1").css({"height":"10px"});
						$(".headerContents h1 img").hide();
						$(".containerBox").css({"height":"calc(100% - 10px)", "top":"10px"});
						$(".searchArea").css("display", "none");
						$(".util").hide();
						$(".headerDiv").css("display", "none");
						
						//hide처리
						$('#rotationTip').hide();
						$('#tuto_start_btn_2').hide();
						$('.bnd_grid_radio').hide();
						$('.tb_radio').hide();
						$('.tb_sizing.on').hide();
						$('.tb_sizing').hide();
						$('.tb_share').hide();
						$('.tb_bookmark').hide();
						$('.tb_report').hide();
						$('.tb_mapAdd').hide();
						$('#btn_reset').hide();
						
						var action = true;
						$('#map_left_btn').click(function(){
							if(action){
								$('.quickBox.step01').css("display", "none");
								$('.thematic.nav-list.interactive-list').css("display", "none");
								$("#kosisDetailDiv").clearQueue().animate({"left":"0px"},200);
								$('#sqlListBox').css("left","-80px");
								$('.sideQuick.xw').css("left", "-70px");
								
							}else{
								$('#sqlListBox').css("left","0px");
								$('.sideQuick.xw').css("left", "0px");
							}
							action = !action;
						});
						
						var action2 = true;
						$('.btnStyle02').click(function(){
							if(action2){
								$('#btn_select').css('left', '0px');
								$('#map_left_btn').click(function(){
									if(action2){
										$("#kosisDetailDiv").css('left','0px');
										$("#sqlListBox").css("left","-80px");
										$("#btn_select").css("left","-75px");
									}else{
										$("#sqlListBox").css("left","0px");
										$("#btn_select").css("left","5px");
									}
									action2 = !action2;
									
								});
							}
						});
						
						
					}
					//mng_e 20200210 이진호
					
					//mng_s 20200313 이진호
					//url이 e지방지표일 경우 데이터 보드의 표에서 비율 display none 처리
					if(location.href.match('interactiveMap/ecountryView')){
						$('#th_Ratio').css('display', 'none');
						$('#mainIndexBtn, #populationHouseBtn, #gridHideLeftBtn01, #companyBtn,  #publicDataBtn, #userDataBtn' ).click(function(){
								var flag = true;
								if(flag){
									$('#th_Ratio').css('display', '');
								}
						});
						
					}else{
						$('#th_Ratio').css('display', '');
					}
					//mng_e 20200313 이진호
					
					
					//mng_s 20200225 이진호 - URL 공유하기를 통해 대화형 통계지도 들어올 시 UI가 겹쳐서 수정
					if(location.href.match('interactiveMap/sharedata') || location.href.match('interactiveMap/population')){//20200511 수정  (4번. 통계검색(중앙상단에 있는 위치/통계검색) 시 LNB메뉴 오동작)
						if(location.href.match('interactiveMap/populationHouseView')) return;								//20200511 수정  (바로 위의 if문에서 interactiveMap/populationHouseView를 잡아서 화면이 이상하게 보임, 이를 위한 if문)
						$('#div_buttonBar').css('left', '80px');
						$('.sop-bottom.sop-left').css('left', '70px');
						
						var action = true;
						$('#map_left_btn').click(function(){
							if(action){
								//alert('map_left_btn 눌럿음');
								$(".sqListBox.sq03").css("left", "-140px");
								$("#btn_select").css("left", "-130px");
								$('.sop-bottom.sop-left').css('left', '210px');
								
								var action2 = true;
								$('#mainIndexBtn, #populationHouseBtn, #gridHideLeftBtn01, #companyBtn, #ecountryBtn, #publicDataBtn, #userDataBtn ').click(function(){
									if(action2){
										//alert('메뉴에서 총조사 주요지표 클릭');
										$('.sqListBox.sq03').css('left', '0px');
										$('#btn_select').css('left', '0px');
										$('.sop-bottom.sop-left').css('left', '0px');
									}
								});
							}else{
								$('.sop-bottom.sop-left').css('left', '-10px');
								$(".sqListBox.sq03").css("left", "0px");
								$("#btn_select").css("left", "5px");
							}
							action = !action;
						});	
						
					}
					//mng_e 20200225 이진호
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
				
				this.setBoundSelectedMoode = function(mode) {
					this.selectedBoundMode = mode;
					this.isMultiSelectedBound = true;
					if (mode == null) {
						this.isMultiSelectedBound = false;
					}
				};
				
				this.setBoundSelectedLayer = function() {
					this.selectedBoundList = [];
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
					}else {
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
				
				this.setBoundLevel = function(level) {
					this.boundLevel = level;
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
							marker.bindInfoWindow(options.tooltipMsg, {maxWidth: '400'}); //9월 서비스
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
						//2016.09.01 9월 서비스
						//this.clearToolTip();
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
					
					// 2017. 05. 15 개발팀 수정요청
					this.bnd_year = bndYear;
					
					this.data = [];
					this.combineData = [];
					this.dataGeojson = null;
					this.curDropPolygonCode = null;
					this.valPerSlice = [];
					this.legendValue = [];
					this.lastGeojsonInfo = null;
					this.isNoReverseGeocode = false;
					//20200511 수정 시작 : callYN (ggm)
					if(!(arguments.length >= 1 && arguments[0] == "N")){					
						if (that.chkIfInteractive() && that.zoom == 4) {
							this.openApiReverseGeoCodeForBorough(that.center);
						}else{
							this.openApiReverseGeoCode(that.center);
						}
					}
					//20200511 수정 끝					
					this.isTradeMapShow = false;
					this.lastDrawList = [];
					this.legendValue.user = [];
					if (this.drawControl) {
						this.drawControl.removeOverlay();
					}
					//this.markers.clearLayers();
					this.selectedBoundMode = null;
					this.selectedBoundList = [];
					this.dataGeojsonLayer = null;
					this.curAdmCd = null;
					this.dataForCombine = null;
					this.multiLayerControl.clear();
					//this.legend.removeDataOverlay();
					//this.legend.data = []; //9월 서비스
					
					if (this.heatMap) {
						this.heatMap.setUTMKs([]);
					}
					
					this.gMap.eachLayer(function(layer) {
						if (layer._layer) {
							_layer.remove();
						}
					});
				};
				
				this.clearLayer = function() {
					if (this.dataGeojson) {
						//2016.09.01 9월 서비스
						this.clearToolTip();
						this.dataGeojson.remove();
						this.removeCaption();
					}
					
					if (this.geojson) {
						this.geojson.remove();
					}
				};
				
				this.clearData = function () {
					this.data = [];
					this.combineData = [];
				};
				
				//9월 서비스
				this.clearToolTip = function() {
					if (this.dataGeojson != null) {
						this.dataGeojson.eachLayer(function(tmplayer) {
							var e = {
									target : tmplayer
									//, utmk : sop.utmk([tmplayer.feature.properties.x, tmplayer.feature.properties.y])
							};
							that.setPolyLayerMouseout(e);
							tmplayer.unbindToolTip();
						});
					}
				};
				
				this.setInnerMap = function(isShow) {
					
					console.log("[catchmentAreaMap.js] setInnerMap 호출");
					
					this.isInnerMapShow = isShow;
					if (isShow) {
						if (this.geojson) {
							this.geojson.remove();
							this.geojson = null;
						}
						this.setZoom(12);
					}else {
						this.openApiReverseGeoCode(that.center);
					}
				};
				
				//그리드
				this.setInnerMap2 = function(isShow) {
					
					console.log("[catchmentAreaMap.js] setInnerMap2 호출");
					
					this.isInnerMapShow2 = isShow;
					this.isInnerMapShow3 = false; //mng_s 20180206 행정구역 그리드는 false로 세팅한다.
					if (isShow) {
						if (this.geojson) {
							this.geojson.remove();
							this.geojson = null;
						}
						//this.setZoom(12);
						
						//this.openApiReverseGeoCodeGrid(that.center);
						this.openApiReverseGeoCode(that.center);
						
					}else {
						
						if (this.geojson) {
							this.geojson.remove();
							this.geojson = null;
						}
						
						//this.setZoom(9);
						
						$interactiveMap.ui.doClearMap(1);
						this.openApiReverseGeoCode(that.center);
						
						
						
					}
				};
				
				
				//행정구역 그리드 mng_s 20180206
				this.setInnerMap3 = function(isShow) {
					
					console.log("[catchmentAreaMap.js] setInnerMap3 호출");
					
					this.isInnerMapShow3 = isShow;
					this.isInnerMapShow2 = false; //기본 그리드는 false로 세팅한다.
					if (isShow) {
						if (this.geojson) {
							this.geojson.remove();
							this.geojson = null;
						}
						//this.setZoom(12);
						
						//this.openApiReverseGeoCodeGrid(that.center);
						this.openApiReverseGeoCode(that.center);
						
					}else {
						
						if (this.geojson) {
							this.geojson.remove();
							this.geojson = null;
						}
						
						//this.setZoom(9);
						
						$interactiveMap.ui.doClearMap(1);
						this.openApiReverseGeoCode(that.center);
						
						
						
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
				
				this.setPolygonGeoJsonStyle = function (type) {			
					// 일반경계일 경우, 색상을 채우지않고,
					// 데이터경계일 경우, 색상을 채운다.
					var color = "#666666";
					var fillColor = "white";
					var weight = 1.75;
					var fillOpacity = 0;
					var dashArray =  '0';//박길섭 수정
					
					switch (this.mapMode) {
						case "settlite":
							color = "white";
							
							//mng_s
							if(sop.isInnerMapShow2) {
								weight = 1;
							}
							//mng_s
							if(sop.isInnerMapShow3) {
								weight = 1;
							}
							break;
						case "intro":
							color = "#cccccc";
							fillColor = "#FCFCFC";
							fillOpacity = 1;
							weight = 1.5;
							dashArray = "";
							break;
					}
					
					switch (type) {
						case "data":
							color = "#7b3e30";		//"white" 
							fillColor = "#F0FFF0";
							weight = 1;
							//mng_s 20180104 주용민 투명도
							if(sop.isInnerMapShow2) {
								if($catchmentAreaLegendInfo.ui.slideInfo.slideValue2 == undefined){
									$catchmentAreaLegendInfo.ui.slideInfo.slideValue2 = 0.7;
								};
								this.dataPolygonFillOpacity = $catchmentAreaLegendInfo.ui.slideInfo.slideValue2;
								fillOpacity = this.dataPolygonFillOpacity;
								$("#legendDataSlider").slider("option","value",fillOpacity);
							} else if(sop.isInnerMapShow3) { //mng_s 20180219 추가
								if($catchmentAreaLegendInfo.ui.slideInfo.slideValue2 == undefined){
									$catchmentAreaLegendInfo.ui.slideInfo.slideValue2 = 0.7;
								};
								this.dataPolygonFillOpacity = $catchmentAreaLegendInfo.ui.slideInfo.slideValue2;
								fillOpacity = this.dataPolygonFillOpacity;
								$("#legendDataSlider").slider("option","value",fillOpacity);
							} else {
								if($catchmentAreaLegendInfo.ui.slideInfo.slideValue1 == undefined){
									$catchmentAreaLegendInfo.ui.slideInfo.slideValue1 = 0.7;
								};
								this.dataPolygonFillOpacity = $catchmentAreaLegendInfo.ui.slideInfo.slideValue1;
								fillOpacity = this.dataPolygonFillOpacity;
								$("#legendDataSlider").slider("option","value",fillOpacity);
							}
							//mng_e
							dashArray = "";
							break;
						case "build":
							fillColor = "#9c0095";//박길섭 수정
							weight = 2.5;
							fillOpacity = 0.7;
							break;
						case "trade":
							return {
								weight : 2.5,
								opacity : 1,
								color : color,
								dashArray: '0',
								fillOpacity : 0.7,
								fillColor : "#9c0095",//박길섭 수정
								renderer: this.render
							};
							break;
						case "industry":
							weight = 2.5;
							opacity = 1;
							color = "#ff4500";
							dashArray = "";
							fillOpacity = 0.7;
							fillColor = "#ff8c00";
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
				
				this.addPolygonGeoJson = function (obj, type, opt) {
					
					console.log("[catchmentAreaMap.js] addPolygonGeoJson() 상위111 호출");
					console.log("[catchmentAreaMap.js] addPolygonGeoJson() 상위111 type [" + type);
					
					var adm_cd = "";
					var geojson = sop.geoJson(obj, {
						style : this.setPolygonGeoJsonStyle(type),
						onEachFeature : function (feature, layer) {
							adm_cd = layer.feature.properties.adm_cd;
							that.setLayerColor(feature, layer);								
							layer.on({
								mouseover : function (e) {
									that.isMouseOver = true;
									if (!that.isLayerMouseEventDisabled) {
										//that.clearToolTip(); //9월 서비스 민정 작업중
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
											that.delegate.callbackFunc.didMouseOverPolygon(e, e.target.feature, layer.options.type, that,that.id);
										}
											
									} else if(e.action == "mouseout") {
										//$thematicMapFrame06.ui.mapList[0].setPolyLayerMouseout(e);
										//$thematicMapFrame06.ui.mapList[1].setPolyLayerMouseout(e);
									}
								}
							
							});
						},
						type : type, // 일반경계인지, 데이터경계인지 구분
						layerCode : that.curPolygonCode,
					
					});
					
					
					if (type == "polygon" || type == "build" || type == "industry") {
						this.geojson = geojson;
					}else if (type == "trade") {
						this.tradeGeojson = geojson;
					}else {
						this.dataGeojson = geojson;
						
					}
					
					if (opt) {
						if (opt.group) {
							if (type == "polygon" || type == "build" || type == "industry") {
								this.geojson.addTo(opt.group);
							}else if (type == "trade") {
								this.tradeGeojson.addTo(opt.group);
							}else {
								this.dataGeojson.addTo(opt.group);
							}
						}
						else {
							if (type == "polygon" || type == "build" || type == "industry") {
								this.geojson.addTo(this.gMap);
							}else if (type == "trade") {
								this.tradeGeojson.addTo(this.gMap);
							}else {
								this.dataGeojson.addTo(this.gMap);
							}		
						}
					}
					else {
						if (type == "polygon" || type == "build" || type == "industry") {
							this.geojson.addTo(this.gMap);
						}else if (type == "trade") {
							this.tradeGeojson.addTo(this.gMap);
						}else {
							this.dataGeojson.addTo(this.gMap);
						}	
					}
					
					if(adm_cd != null && adm_cd != undefined){
						console.log("[catchmentAreaMap.js] addPolygonGeoJson() 상위111 adm_cd[" + adm_cd);
						console.log("[catchmentAreaMap.js] addPolygonGeoJson() 상위111 adm_cd.length[" + adm_cd.length);
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
					
					if (type == "data") {
						if (that.combineCallback != undefined && that.combineCallback != null && that.combineCallback instanceof Function) {
							that.combineCallback.call(undefined, that, that.dataGeojson);
						  }
					}
					
					if ( this.isInnerMapShow2 ) {
						$("#legendColor_"+this.legend.id+ " li>a").eq(this.gridLegendClickNum).click(); //mng_s 그리드 범례요청
						
						/*
						console.log("[catchmentAreaMap.js] addPolygonGeoJson() 상위111 this.legend.legendColor [" + this.legend.legendColor);
						
						$("#legendColor_"+this.legend.id+" >li>a").each(function() {
							if ($(this).attr("data-color") == this.legend.legendColor) {
								$(this).click();
							}
						});
						*/
					}
					
					if ( this.isInnerMapShow3 ) {
						$("#legendColor_"+this.legend.id+ " li>a").eq(this.gridLegendClickNum).click(); //mng_s 행정구역 그리드 범례요청
					}
					
					return geojson;
				};

				this.setPolyLayerMouseover = function (e) {
					var layer = e.target;
					var fillColor = layer.options.fillColor;
					var color = "#ffaa01";
					var weight = 3;
					var dashArray = layer.options.dashArray;
					if (layer == that.curSelectedLayer) {
						
						/*
						//mng_s
						//마우스 오버시 하이라이트되는 경계를 가늘게 하려면 이 코드를 사용하면 됨.
						if(sop.isInnerMapShow2) {
							if (that.mapMode != "intro") {
								layer.setStyle({
									weight : 2.5,
									color : "#ff0000",
									dashArray : layer.options.dashArray,
									fillOpacity : layer.options.fillOpacity,
									fillColor : layer.options.fillColor
								});
							}
						} else {
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
						*/
						if (that.mapMode != "intro") {
							layer.setStyle({
								weight : 3,
								color : "#F35B2D",
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
						
						//mng_s 위성지도에서 그리드 경계가 굵어지는거 조정
						//마우스 오버시 하이라이트되는 경계를 가늘게 하려면 이 코드를 사용하면 됨.
						/*
						if(sop.isInnerMapShow2) {
							if (that.mapMode != "intro") {
								weight = 2.5;
							}
						}
						*/
						
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
				
				this.setPolyLayerMouseout = function (e) {
					var layer = e.target;
					if (layer == that.curSelectedLayer) {
						if (that.mapMode != "intro") {
							layer.setStyle({
								weight : 3,
								color : "#F35B2D",
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
						
						if (that.mapMode == "settlite") {
							
							color = "white";
							weight = 3;
							//mng_s 위성지도에서 그리드 경계가 굵어지는거 조정
							if(sop.isInnerMapShow2) {
								weight = 1.5;
							}
							if(sop.isInnerMapShow3) {
								weight = 1.5;
							}
						}else {
							if (layer.options.type == "polygon" || 
									layer.options.type == "build" || 
									layer.options.type == "trade") {
									color = "#666666";
									weight = 1.75;
							}else if (layer.options.type == "industry") {
								color = "#ff4500";
								weight = 1.75;
							}
							else {
								color = "#7b3e30";  // "white"
								weight = 1;
							}
						}
						
						if (that.mapMode == "intro") {
							color = "#cccccc";
							fillColor = "#FCFCFC";
							weight = 1.5;
						}else {
							if (layer.options.type == "polygon") {
								fillOpacity = 0;
							}else {
								fillOpacity = this.dataPolygonFillOpacity;
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
					
					if (!sop.Browser.ie&&!sop.Browser.webkit) {
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
							
							if (!that.isDrop) {
								//20200417 수정 시작 (ggm)
								if (that.chkIfInteractive("chkData", that.id) && that.zoom == 4) {		//20200427 수정 (ggm)
									that.openApiReverseGeoCodeForBorough(that.center);
								}else{
									that.openApiReverseGeoCode(that.center);
								}
								//20200417 수정 끝								
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
							
							console.log(that.zoom);

							// 전국단위 경계표출
							if (that.zoom <= 1) {
								mapPolygonCode = 1;
								if (that.curPolygonCode != mapPolygonCode) {
									that.curPolygonCode = mapPolygonCode;
									if (!that.isInnerMapShow) {
										if (that.isDrop) {
											that.openApiBoundaryContry();
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
								mapPolygonCode = 3;
								
							
								//2019-03-11 박길섭 시작
								/*mapPolygonCode = 100;
								if(that.zoom == 5) {
									mapPolygonCode = 3;
								}*/
								//2019-03-11 박길섭 끝
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
									//2019-03-11 박길섭 시작
									//that.mapBtnInfo.changeZoomLevelTitle(that.zoom + "시군구");
									that.mapBtnInfo.changeZoomLevelTitle("시군구");
									//2019-03-11 박길섭 끝
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
								
								
								console.log("[catchmentAreaMap.js] zoomend event 발생시 111 ");
								console.log("[catchmentAreaMap.js] zoomend event 발생시 this.isInnerMapShow3 [" + this.isInnerMapShow3 + "]");
								
								// 이전의 경계레벨이 집계구단위가 아닐 경우
								if (that.curPolygonCode != mapPolygonCode) {
									
									console.log("[catchmentAreaMap.js] zoomend event 발생시 222 ");
									
									that.curPolygonCode = mapPolygonCode;	
									if (!that.isInnerMapShow){
										if (that.isDrop) {
											
											console.log("[catchmentAreaMap.js] zoomend event 발생시 333 openApiBoundaryStatsarea() 호출");
											
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
					
					// 클릭
					else if (type == "click") {
						this.gMap.on("click", function (e) {
							if (that.delegate && 
								that.delegate.callbackFunc && 
								that.delegate.callbackFunc.didMapClick instanceof Function) {
								that.delegate.callbackFunc.didMapClick(e, that);
							}
						});
					}
					
				};

				this.autoDownBoundary = function () {
					
					console.log("[catchmentAreaMap.js] autoDownBoundary() 호출");
					console.log("[catchmentAreaMap.js] autoDownBoundary() this.curPolygonCode [" + this.curPolygonCode);
					console.log("[catchmentAreaMap.js] autoDownBoundary() this.boundLevel [" + this.boundLevel);
					console.log("[catchmentAreaMap.js] autoDownBoundary() this.curDropCd [" + this.curDropCd);
					
					// 기존에 데이터경가 있으면 제거한다.
					if (this.dataGeojson != null) {
						this.dataGeojson.remove();		
						this.removeCaption();
						this.dataGeojson = null;
					}
					
					console.log(parseInt(this.boundLevel));
					switch(parseInt(this.boundLevel)) {
						case 0:	//하위경계 0레벨
							
							if (this.isInnerMapShow2 || this.isInnerMapShow3) { //mng_s
								this.isNoReverseGeocode = false;
							} else {
								this.isNoReverseGeocode = true;
							}
							switch (this.curPolygonCode) {
								case 1:
									
									if (this.isInnerMapShow2) { //mng_s
										//this.openApiBoundaryHadmarea(this.curDropCd, this.bnd_year, this.boundLevel);
										that.openApiBoundaryHadmarea("", that.bnd_year,  "1", "0", that.boundaryCallback, that.bounds);
									} else if (this.isInnerMapShow3) { //mng_s 20180212
										that.openApiBoundaryHadmarea(this.curDropCd, that.bnd_year,  "1", "0", that.boundaryCallback, that.bounds);
									} else {
										this.openApiBoundaryContry();
									}
									
									break;
								case 2:
								case 3:
								case 4:
									if (this.isInnerMapShow2) { //mng_s
										//this.openApiBoundaryHadmarea(this.curDropCd, this.bnd_year, this.boundLevel);
										that.openApiBoundaryHadmarea("", that.bnd_year,  "1", "0", that.boundaryCallback, that.bounds);
									} else if (this.isInnerMapShow3) { //mng_s 20180212
										that.openApiBoundaryHadmarea(this.curDropCd, that.bnd_year,  "1", "0", that.boundaryCallback, that.bounds);
									} else {
										//20200417 수정 시작 (ggm)									
										if(this.chkIfInteractive() && this.zoom == 4 && this.chkIfNonSelf() > -1){
											this.openApiBoundaryHadmareaForBorough(this.curDropCd, this.bnd_year, this.boundLevel);
										}else{
											this.openApiBoundaryHadmarea(this.curDropCd, this.bnd_year, this.boundLevel);
										}
										//20200417 수정 끝										
									}
									
									break;
								case 5:
									if (this.isInnerMapShow2) { //mng_s
										//this.openApiBoundaryHadmarea(this.curDropCd, this.bnd_year, this.boundLevel);
										that.openApiBoundaryHadmarea("", that.bnd_year,  "1", "0", that.boundaryCallback, that.bounds);
									} else if (this.isInnerMapShow3) { //mng_s 20180212
										that.openApiBoundaryHadmarea(this.curDropCd, that.bnd_year,  "1", "0", that.boundaryCallback, that.bounds);
									} else {
										this.openApiBoundaryStatsarea(this.curDropCd, this.bnd_year);
									}
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
									this.setZoom(4); //6->4
									break;
								case 3:
									//20200417 수정 시작 (ggm)									
									if(this.chkIfInteractive() && this.zoom == 4 && this.chkIfNonSelf() > -1){	
										this.setZoom(5);
									}else{
										this.setZoom(7); //8->7
									}
									//20200417 수정 끝									
									break;
								//2019-03-11 박길섭 시작
									/*// djlee 2019-01-31 추가
								case 100:
									this.setZoom(7); //9->8
									break;*/
								//2019-03-11 박길섭 끝	
								case 4:
									this.setZoom(9); //10->9
									break;
								case 5:
									this.openApiBoundaryStatsarea(this.curDropCd, this.bnd_year);
									//this.openApiReverseGeoCode(this.center);
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
									//20200417 수정 시작 (ggm)									
									if(this.chkIfInteractive() && this.zoom == 4 && this.chkIfNonSelf() > -1){
										this.openApiBoundaryHadmareaForBorough(this.curDropCd, this.bnd_year, this.boundLevel, "0", function() {
											that.setZoom(9);
										});
									}else{
										this.openApiBoundaryHadmarea(this.curDropCd, this.bnd_year, this.boundLevel, "0", function() {
											that.setZoom(9);
										});
									}									
									//20200417 수정 끝									
									break;
								case 4:
									//2017.03.28 2레벨에서 경계가 잘 안불러오는 이슈
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
				
				this.setStatsData = function (type, data, showDataParamName, unit, length) {
					
					console.log("[catchmentAreaMap.js] setStatsData() 호출 interactiveMapApi.js와 이름이 같으므로 주의요망");
					console.log(data);
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
						
						
					}
				};
				
				//남한경계가져오기
				this.openApiBoundaryContry = function (callback) { //9월 서비스
					
					return;
					
					// 2016. 04. 26 j.h.Seok
					if (that.lastGeojsonInfo != null) {
						if (that.lastGeojsonInfo.adm_cd == "" && that.lastGeojsonInfo.year == "") {
							return;
						}
					}
					
					$.ajax({
						  type: "GET",
						  url: "/js/data/geo.js",
						  success: function(res) {
							  res["pAdmCd"] = "";
							  // 2016. 04. 26 j.h.Seok
							  var tmpOption = {
									  year : "",
									  adm_cd : ""
							  }
							  that.lastGeojsonInfo = tmpOption ;
							  that.setPolygonDataGeojson(res);
							  //9월 서비스
							  if (callback != undefined && callback != null && callback instanceof Function) {
								  callback.call(undefined, that, res);
							  }
						  } ,
						  dataType: "json",
						  error:function(e){  
					            //alert(e.responseText);  
					        }  
						});
				};
				
				
				// 전국시도경계가져오기
				this.openApiBoundarySido = function (year, callback) {
					// 2016. 04. 26 j.h.Seok
					if (that.lastGeojsonInfo != null) {
						if (that.lastGeojsonInfo.adm_cd == "00" && that.lastGeojsonInfo.year == year) {
							return;
						}
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
							  //that.setPolygonDataGeojson(res); 민정 작업중(행정동경계 주석)
								
							  if (callback != undefined && callback != null && callback instanceof Function) {
								  callback.call(undefined, that, res); //9월 서비스
							  }
						  } ,
						  dataType: "json",
						  error:function(e){  
					            //alert(e.responseText);  
					      }  
					});
				};
				
				// OpenAPI 행정동경계 검색
				this.openApiBoundaryHadmarea = function (adm_cd, year, low_search, atdrc_yn, callback, bounds){ //, zoomLevel) { 2019-03-11 박길섭
					if ( bounds != null && bounds != undefined && this.isInnerMapShow2) { //mng_s kimjoonha grid this.isInnerMapShow2 조건 추가 20180206
						//console.log("[catchmentAreaMap.js] openApiBoundaryHadmarea bounds._southWest.x [" + bounds._southWest.x);
						
						if (adm_cd=="") {
							adm_cd = "00";
						}
						
						var area = "";
						area = 'RECTANGLE(';
						area += bounds._southWest.x + ' ' + bounds._southWest.y + ',';
						area += bounds._northEast.x + ' ' + bounds._northEast.y;
						area += ')';
						
						var zoom = that.zoom;
						
						var sopOpenApiHadmareaObj = new sop.openApi.hadmarea.api();
						sopOpenApiHadmareaObj.addParam("accessToken", accessToken);
						sopOpenApiHadmareaObj.addParam("adm_cd", adm_cd);
						sopOpenApiHadmareaObj.addParam("year", year);
						sopOpenApiHadmareaObj.addParam("low_search", low_search);
						sopOpenApiHadmareaObj.addParam("area", area);
						sopOpenApiHadmareaObj.addParam("zoom", zoom);
						//sopOpenApiHadmareaObj.addParam("zoom_level", zoomLevel);2019-03-11 박길섭
						
						//자치구경계
						if ((atdrc_yn != undefined && atdrc_yn == "1")||this.atdrc_yn==="1") {
							sopOpenApiHadmareaObj.addParam("borough", low_search);
						} 
						
						console.log("[catchmentAreaMap.js] sopOpenApiHadmareaObj.request 1111 호출전...");
						
						sopOpenApiHadmareaObj.request({
							method : "GET",
							async : true,
							url : openApiPath + "/OpenAPI3/boundary/hadmarea.geojson",
							options : {
								target : this,
								adm_cd : adm_cd,
								year : year,
								low_search : low_search,
								callback : callback,
								area : area,
								zoom : zoom //, 2019-03-11 박길섭
								//zoom_level : zoomLevel 2019-03-11 박길섭
							}
						});
					} else if ( this.isInnerMapShow3) { //mng_s kimjoonha 행정구역 그리드일 경우 20180206
						//console.log("[catchmentAreaMap.js] openApiBoundaryHadmarea that.gMap.getCenter() [" + that.gMap.getCenter());
						console.log("[catchmentAreaMap.js] openApiBoundaryHadmarea that.zoom [" + that.zoom);
						console.log("[catchmentAreaMap.js] openApiBoundaryHadmarea isInnerMapShow3 adm_cd [" + adm_cd);
						console.log("[catchmentAreaMap.js] openApiBoundaryHadmarea isInnerMapShow3 this.curSidoCd [" + this.curSidoCd);
						console.log("[catchmentAreaMap.js] openApiBoundaryHadmarea isInnerMapShow3 this.curSiggCd [" + this.curSiggCd);
						console.log("[catchmentAreaMap.js] openApiBoundaryHadmarea isInnerMapShow3 this.curDongCd [" + this.curDongCd);
						
						//행정구역 그리드에서 adm_cd는 그리드의 가나2910 이런 형태가 adm_cd로 세팅이 되므로
						//리버스 지오코딩된 curSidoCd 값을 adm_cd로 세팅해서 hadmarea를 호출해야만 한다.
						/*
						if (adm_cd=="") {
							adm_cd = "00";
						} else {
							
							var sido_cd = "";
							var sgg_cd = "";
							var emdong_cd = "";
							
							if(this.curSidoCd != null && this.curSidoCd != undefined ) {
								sido_cd = this.curSidoCd;
							}
							if(this.curSiggCd != null && this.curSiggCd != undefined ) {
								sgg_cd = this.curSiggCd;
							}
							if(this.curDongCd != null && this.curDongCd != undefined ) {
								emdong_cd = this.curDongCd;
							}
							
							adm_cd = sido_cd + sgg_cd + emdong_cd;
						}
						*/
						//====================================================
						/*
						var sido_cd = "";
						var sgg_cd = "";
						var emdong_cd = "";
						
						if(this.curSidoCd != null && this.curSidoCd != undefined ) {
							sido_cd = this.curSidoCd;
						}
						if(this.curSiggCd != null && this.curSiggCd != undefined ) {
							sgg_cd = this.curSiggCd;
						}
						if(this.curDongCd != null && this.curDongCd != undefined ) {
							emdong_cd = this.curDongCd;
						}
						
						adm_cd = sido_cd + sgg_cd + emdong_cd;
						*/
						//====================================================
						//이 부분은 가나1234 이런 형태일 경우 뒷단에서 adm_cd를 db에서 가져오는 방식으로 변경 예정임. 20180209
						
						
						var bnd_grid = "bnd_grid";
						
						var zoom = that.zoom;
						
						var sopOpenApiHadmareaObj = new sop.openApi.hadmarea.api();
						sopOpenApiHadmareaObj.addParam("accessToken", accessToken);
						sopOpenApiHadmareaObj.addParam("adm_cd", encodeURIComponent(adm_cd));
						sopOpenApiHadmareaObj.addParam("year", year);
						sopOpenApiHadmareaObj.addParam("low_search", low_search);
						sopOpenApiHadmareaObj.addParam("bnd_grid", bnd_grid);
						sopOpenApiHadmareaObj.addParam("zoom", zoom);
						//sopOpenApiHadmareaObj.addParam("zoom_level", zoomLevel); 2019-03-11 박길섭
						
						//자치구경계
						if ((atdrc_yn != undefined && atdrc_yn == "1")||this.atdrc_yn==="1") {
							sopOpenApiHadmareaObj.addParam("borough", low_search);
						} 
						
						console.log("[catchmentAreaMap.js] sopOpenApiHadmareaObj.request 행정구역 그리드 호출전...");
						
						sopOpenApiHadmareaObj.request({
							method : "GET",
							async : true,
							url : openApiPath + "/OpenAPI3/boundary/hadmarea.geojson",
							options : {
								target : this,
								adm_cd : adm_cd,
								year : year,
								low_search : low_search,
								callback : callback,
								bnd_grid : bnd_grid,
								zoom : zoom //, 2019-03-11 박길섭
								//zoom_level : zoomLevel 2019-03-11 박길섭
							}
						});
						
					} else if( that.dataType == 'ecountry' ){ 
						$interactiveMapEcountry.openApiBoundaryHadmarea(
								that, adm_cd, that.bnd_year, that.boundLevel, null, null, ( that.boundLevel == 4 ? "100" : null ) );	
					} else {
						var sopOpenApiHadmareaObj = new sop.openApi.hadmarea.api();
						sopOpenApiHadmareaObj.addParam("accessToken", accessToken);
						sopOpenApiHadmareaObj.addParam("adm_cd", adm_cd);
						sopOpenApiHadmareaObj.addParam("year", year);
						sopOpenApiHadmareaObj.addParam("low_search", low_search);
						//sopOpenApiHadmareaObj.addParam("zoom_level", zoomLevel); 2019-03-11 박길섭
						
						
						//자치구경계
						if ((atdrc_yn != undefined && atdrc_yn == "1")||this.atdrc_yn==="1") {
							sopOpenApiHadmareaObj.addParam("borough", low_search);
						} 
						
						console.log("[catchmentAreaMap.js] sopOpenApiHadmareaObj.request 1111 호출전...");
						
						sopOpenApiHadmareaObj.request({
							method : "GET",
							async : true,
							url : openApiPath + "/OpenAPI3/boundary/hadmarea.geojson",
							options : {
								target : this,
								adm_cd : adm_cd,
								year : year,
								low_search : low_search,
								callback : callback //, 2019-03-11 박길섭
								//zoom_level : zoomLevel 2019-03-11 박길섭
							}
						});
					}
					
				};
				
				// OpenAPI 집계구경계 검색
				this.openApiBoundaryStatsarea = function (adm_cd, year, callback) { //9월 서비스
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
							callback : callback //9월 서비스
						}
					});
				};
				
				// OpenAPI 리버스지오코딩
				//2017-08-16 [개발팀] 콜백추가
				this.openApiReverseGeoCode = function (center, callback) {
					
					console.log("[catchmentAreaMap.js] openApiReverseGeoCode 호출");
					
					var sopOpenApiReverseGeoCodeObj = new sop.openApi.ReverseGeoCode.api();
					sopOpenApiReverseGeoCodeObj.addParam("accessToken", accessToken);
					sopOpenApiReverseGeoCodeObj.addParam("addr_type", "20");
					sopOpenApiReverseGeoCodeObj.addParam("x_coor", center[0]);
					sopOpenApiReverseGeoCodeObj.addParam("y_coor", center[1]);
					sopOpenApiReverseGeoCodeObj.request({
						method : "GET",
						async : true,
						url : openApiPath + "/OpenAPI3/addr/rgeocode.json",
						options : {
							target : this,
							center : center,
							callback : callback //2017-08-16 [개발팀] 콜백추가
						}
					});
				};
				
				// OpenAPI 그리드용 리버스지오코딩
				this.openApiReverseGeoCodeGrid = function (center) {
					
					console.log("[catchmentAreaMap.js] openApiReverseGeoCodeGrid 호출");
					
					var sopOpenApiReverseGeoCodeGridObj = new sop.openApi.ReverseGeoCodeGrid.api();
					sopOpenApiReverseGeoCodeGridObj.addParam("accessToken", accessToken);
					sopOpenApiReverseGeoCodeGridObj.addParam("addr_type", "20");
					sopOpenApiReverseGeoCodeGridObj.addParam("x_coor", center[0]);
					sopOpenApiReverseGeoCodeGridObj.addParam("y_coor", center[1]);
					sopOpenApiReverseGeoCodeGridObj.request({
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
					sopOpenApibdAreaObj.addParam("accessToken", accessToken);
					sopOpenApibdAreaObj.addParam("minx", bounds._southWest.x);
					sopOpenApibdAreaObj.addParam("miny", bounds._southWest.y);
					sopOpenApibdAreaObj.addParam("maxx", bounds._northEast.x);
					sopOpenApibdAreaObj.addParam("maxy", bounds._northEast.y);
                    sopOpenApibdAreaObj.request({
                        method : "GET",
                        async : true,
                        url : openApiPath + "/OpenAPI3/figure/buildingarea.geojson",
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
				
				
				//mng_s 그리드
				this.openApiGridArea = function(bounds) {
					
					console.log("[catchmentAreaMap.js] openApiGridArea() 호출");
					
					var area = "";
					area = 'RECTANGLE(';
					area += bounds._southWest.x + ' ' + bounds._southWest.y + ',';
					area += bounds._northEast.x + ' ' + bounds._northEast.y;
					area += ')';
					
					var sopOpenApiGridAreaObj = new sop.openApi.gridarea.api();
					sopOpenApiGridAreaObj.addParam("accessToken", accessToken);
					
					sopOpenApiGridAreaObj.addParam("area", area);
					//아래 파라미터는 나중에 조정해야할 수도 있고 현재는 임시로 넣어둠.
					sopOpenApiGridAreaObj.addParam("adm_cd", "00");
					sopOpenApiGridAreaObj.addParam("low_search", "0");
					sopOpenApiGridAreaObj.addParam("year", "2015");
					sopOpenApiGridAreaObj.addParam("borough", "00");
					
					console.log("[catchmentAreaMap.js] openApiGridArea() sopOpenApiGridAreaObj.request 111");
					
					sopOpenApiGridAreaObj.request({
						method : "GET",
						async : true,
						url : openApiPath + "/OpenAPI3/boundary/gridarea.geojson",
						options : {
							target : this,
							area : area,
							year : "2015",
							low_search : "1"
						}
                    });
					
					console.log("[catchmentAreaMap.js] openApiGridArea() sopOpenApiGridAreaObj.request 222");

				};

				//생활권역 그리드(주행시간, 거리)
				this.openApiCatchmentGridArea = function(bounds, grid_level, paramArea, promiseParam) {
					
					console.log("[catchmentAreaMap.js] openApiCatchmentGridArea() 호출");
					
					that.catchmentAreabounds = bounds; 
					var area = "";
					
					if(!paramArea) {
						area = 'POLYGON((';
						for(var i = 0; i < bounds.length; i++) {
							area += bounds[i][0] + " " + 
									bounds[i][1] + ",";
							
							if(i == bounds.length - 1) {
								area += bounds[i][0] + " " + 
								bounds[i][1];
							}					
						}					
						area += '))';
					} else {
						area = paramArea;
					}
					
					var sopOpenApiCatchmentGridObj = new sop.openApi.catchmentGrid.api();
					sopOpenApiCatchmentGridObj.addParam("accessToken", accessToken);
					sopOpenApiCatchmentGridObj.addParam("area", area);
					sopOpenApiCatchmentGridObj.addParam("grid_level", grid_level);
					sopOpenApiCatchmentGridObj.addParam("srvAreaType", 1);
					
					sopOpenApiCatchmentGridObj.request({
						method : "POST",
						async : true,
						url : contextPath + "/ServiceAPI/OpenAPI3/catchmentArea/srvAreaHadmarea.geojson",
						options : {
							target : this,
							area : area,
							grid_level : grid_level,
							resolve : (promiseParam ? promiseParam.resolve : null),
							reject : (promiseParam ? promiseParam.reject : null)
						}
                    });
				};
				
				//생활권역 그리드(주행시간, 거리)
				this.openApiCatchmentGridAreaWithPromise = function(bounds, grid_level, paramArea, resolve, reject) {
					
					console.log("[catchmentAreaMap.js] openApiCatchmentGridAreaWithPromise() 호출");
					
					that.catchmentAreabounds = bounds; 
					var area = "";
					
					if(!paramArea) {
						area = 'POLYGON((';
						for(var i = 0; i < bounds.length; i++) {
							area += bounds[i][0] + " " + 
									bounds[i][1] + ",";
							
							if(i == bounds.length - 1) {
								area += bounds[i][0] + " " + 
								bounds[i][1];
							}					
						}					
						area += '))';
					} else {
						area = paramArea;
					}
					
					var sopOpenApiCatchmentGridObj = new sop.openApi.catchmentGrid.api();
					sopOpenApiCatchmentGridObj.addParam("accessToken", accessToken);
					sopOpenApiCatchmentGridObj.addParam("area", area);
					sopOpenApiCatchmentGridObj.addParam("grid_level", grid_level);
					sopOpenApiCatchmentGridObj.addParam("srvAreaType", 1);
					
					sopOpenApiCatchmentGridObj.request({
						method : "POST",
						async : true,
						url : contextPath + "/ServiceAPI/OpenAPI3/catchmentArea/srvAreaHadmarea.geojson",
						options : {
							target : this,
							area : area,
							grid_level : grid_level,
							resolve : resolve,
							reject : reject
						}
                    });
				};
				
				//생활권역 그리드(반경)
				this.openApiCatchmentCircleGridArea = function(bounds, radius, grid_level) {
					
					console.log("[catchmentAreaMap.js] openApiCatchmentCircleGridArea() 호출");
					console.log(bounds);
					that.catchmentAreabounds = bounds; 
					var area = bounds;
					
					var sopOpenApiCatchmentGridObj = new sop.openApi.catchmentCircleGrid.api();
					sopOpenApiCatchmentGridObj.addParam("accessToken", accessToken);
					sopOpenApiCatchmentGridObj.addParam("area", area);
					sopOpenApiCatchmentGridObj.addParam("radius", radius);
					sopOpenApiCatchmentGridObj.addParam("grid_level", grid_level);
					sopOpenApiCatchmentGridObj.addParam("srvAreaType", 2);
					
					sopOpenApiCatchmentGridObj.request({
						method : "POST",
						async : true,
						url : contextPath + "/ServiceAPI/OpenAPI3/catchmentArea/srvAreaHadmarea.geojson",
						options : {
							target : this,
							area : area,
							radius : radius,
							grid_level : grid_level
						}
                    });
				};
				
				
				this.openApiCatchmentCircleGridAreaWithPromise = function(bounds, radius, grid_level, resolve, reject) {
					
					console.log("[catchmentAreaMap.js] openApiCatchmentCircleGridAreaWithPromise() 호출");
					console.log(bounds);
					that.catchmentAreabounds = bounds; 
					var area = bounds;
					
					var sopOpenApiCatchmentGridObj = new sop.openApi.catchmentCircleGrid.api();
					sopOpenApiCatchmentGridObj.addParam("accessToken", accessToken);
					sopOpenApiCatchmentGridObj.addParam("area", area);
					sopOpenApiCatchmentGridObj.addParam("radius", radius);
					sopOpenApiCatchmentGridObj.addParam("grid_level", grid_level);
					sopOpenApiCatchmentGridObj.addParam("srvAreaType", 2);
					
					sopOpenApiCatchmentGridObj.request({
						method : "POST",
						async : true,
						url : contextPath + "/ServiceAPI/OpenAPI3/catchmentArea/srvAreaHadmarea.geojson",
						options : {
							target : this,
							area : area,
							radius : radius,
							grid_level : grid_level,
							resolve : resolve,
							reject : reject
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
										if (param == feature.info[x].showData) {
											layer.setStyle({
												weight : layer.options.weight,
												color : layer.options.color,
												dashArray : layer.options.dashArray,
												fillOpacity : layer.options.fillOpacity,
												//fillColor : that.getColor(feature.info[x][param], that.valPerSlice[x])[0] //test
												fillColor : that.legend.getColor(feature.info[x][param], that.legend.valPerSlice[x])[0]
											});
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
//										fillColor : that.legend.legendColor[4]
										fillColor : "#ff2400"
									});
								}
							}
						}
					}
					else if( this.dataType == "kosis" || this.dataType == "ecountry" ) {
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
						
						
						/*if (tmpLevel.length == 1) {
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
							
						}*/
						
					}
					
				};
				
				this.checkShowCaption = function () {
					if (this.legend.numberData && (this.dataGeojson != null || this.multiLayerControl.dataGeojson)) {
						this.setCaption();
					}else {
						this.removeCaption();
					}
				};
				
				this.setCaption = function () {
					this.removeCaption();
					//2016.09.22 버블일 경우, 캡션을 보여준다.
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
														//2016.03.24 수정, 사업체일 경우, 5미만 N/A처리
														//param != "corp_cnt" &&
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
				
				this.setPolygonDataGeojson = function (geoData) {
					
					console.log("[catchmentAreaMap.js] setPolygonDataGeojson() 호출");
					console.log("[catchmentAreaMap.js] setPolygonDataGeojson() this.geojson [" + this.geojson);
					console.log("[catchmentAreaMap.js] setPolygonDataGeojson() this.boundLevel [" + this.boundLevel);
					console.log("[catchmentAreaMap.js] setPolygonDataGeojson() geoData.pAdmCd [" + geoData.pAdmCd);
					
					if (this.isInnerMapShow2) { //mng_s 그리드일 경우 바운드레벨을 0으로 세팅
						this.boundLevel = 0;
						//this.openApiReverseGeoCode(that.center); //무한루프에 빠짐...ㅠㅠ
					}
					if (this.isInnerMapShow3) { //mng_s 행정구역 그리드일 경우 바운드레벨을 0으로 세팅
						this.boundLevel = 0;
						//this.openApiReverseGeoCode(that.center); //무한루프에 빠짐...ㅠㅠ
					}
					
					// 기존 경계 지우기
					//2017.04.05 2레벨 조회일 경우, 경계가 겹치는 이슈
					//======================START===========================//
					if (this.geojson || this.boundLevel == "2") {
						//현재 경계코드와 geojson의 경계코드가 맞지않을 경우, 경계를 버린다.
						//pAdmCd는 현재경계의 상위 행정동코드로 이를 바탕으로 해당 경계의 임시경계코드를 정의하고,
						//현재 경계코드와 임시경계코드를 비교하여 그릴지 말지를 결정한다.
						/*if (geoData.pAdmCd != undefined && this.boundLevel == "1") {
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
						}*/
						
						//현재 경계코드와 geojson의 경계코드가 맞지않을 경우, 경계를 버린다.
						//pAdmCd는 현재경계의 상위 행정동코드로 이를 바탕으로 해당 경계의 임시경계코드를 정의하고,
						//현재 경계코드와 임시경계코드를 비교하여 그릴지 말지를 결정한다.
						console.log("this.boundLevel = " + this.boundLevel);
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
									
									console.log("[catchmentAreaMap.js] setPolygonDataGeojson() tmpLayerCode [" + tmpLayerCode);
									console.log("[catchmentAreaMap.js] setPolygonDataGeojson() this.curPolygonCode [" + this.curPolygonCode);
									console.log("[catchmentAreaMap.js] setPolygonDataGeojson() this.isInnerMapShow2 [" + this.isInnerMapShow2);
									
									if (!this.isInnerMapShow2 && !this.isInnerMapShow3) { //mng_s 그리드가 아닐경우에는 리턴
										// djlee 수정
										if (tmpLayerCode != this.curPolygonCode) {//&& this.curPolygonCode != 100 //2019-03-11 박길섭
											if(!document.location.href.match("technicalBizMap"))	// 기술업종 통계지도-지원시설, 산업단지 조회에서 시도 클릭시 경계표출안됨
												return;
										}
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
										
										// djlee 수정
										if (isContains && (tmpLayerCode == this.curPolygonCode)) {//&& this.curPolygonCode != 100 //2019-03-11 박길섭
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
					//======================END===========================//
					
					console.log("[catchmentAreaMap.js] setPolygonDataGeojson() 22222 this.data.length [" + this.data.length);
					
					// 경계데이터에 통계정보를 병합하고, 경계를 그린다.
					if (this.data.length > 0) {
						
						console.log("[catchmentAreaMap.js] setPolygonDataGeojson() geoData.pAdmCd [" + geoData.pAdmCd +"] this.data[0].pAdmCd [" + this.data[0].pAdmCd);
						
						//if(this.isInnerMapShow2){ //mng_s 그리드면
							
						//}
						
						if ( this.data[0].kosis || this.data[0].ecountry ) {
							if(geoData.features.length > 0) {
								if(this.data[0].pAdmCd < 2) {
									this.data[0].pAdmCd = "00";
								}
								
								if (geoData.pAdmCd != this.data[0].pAdmCd) {
									return;
								}
								
								if( this.data[0].kosis ){
									geoData = interactiveMapKosis.combineKosisStatsData(geoData);
								} else {
									geoData = $interactiveMapEcountry.combineEcountryStatsData(geoData);
								}
							} else {
								return;
							}
						} else {
							
							if(!this.isInnerMapShow2 && !this.isInnerMapShow3){ //mng_s 그리드가 아니면(행정구역 그리드 조건 추가 20180208)
								if (geoData.pAdmCd != this.data[0].pAdmCd) {
									return;
								}
							}
							geoData = this.combineStatsData(geoData);
						}
						
						//시계열때문에 드랍된 현재위치정보를 저장한다.
						//this.setDroppedInfo();
					}
					
					
					console.log("[catchmentAreaMap.js] setPolygonDataGeojson() geoData.combine [" + geoData.combine);
					
					// res = combineStatsData(res);
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
						if ( this.data[0].kosis ) {
							interactiveMapKosis.setResultDataOnMap();
						} else if( this.data[0].ecountry ){
							$interactiveMapEcountry.setResultDataOnMap();
						}
					}
			
					this.data = [];
					if (this.delegate && this.delegate.callbackFunc && this.delegate.callbackFunc.didFinishedHadmaArea instanceof Function) {
						this.delegate.callbackFunc.didFinishedHadmaArea(geoData, that);
					}
				};
				
				this.combineStatsData = function (boundData, isPass) {//
					
					console.log("[catchmentAreaMap.js] combineStatsData() 호출");
					this.dataPolygonCode = this.curPolygonCode;	// 조회했던 경계레벨
					
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
													//SGIS4_0629_생활권역 시작
													var atl = that.data[k].result[x][that.data[k].showData];
													if(atl !== 0){
													//SGIS4_0629_생활권역 끝	
														that.data[k].result[x]["showData"] = that.data[k].showData;
														that.data[k].result[x]["api_id"] = that.data[k].id;
														that.data[k].result[x]["unit"] = that.data[k].unit;
														that.data[k].result[x]["legendIndex"] = k;
														boundData.features[i].info.push(that.data[k].result[x]);
														boundData.features[i]["dataIdx"] = x;
														boundData.features[i]["_dataIdx"] = that.data[k].result[x]["_dataIdx"];
														boundData.features[i]["show1"] = that.data[k].show1;
														boundData.features[i]["show2"] = that.data[k].show2;
														boundData.features[i]["dataLength"] = that.data.length;
													//SGIS4_0629_생활권역 시작	
													}
													//SGIS4_0629_생활권역 끝
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

					this.setLegendForStatsData(boundData.features.length, isPass); //민정 작업중 격자 색상 
					
					// 대화형 통계지도 툴팁 N/A 처리용
					if(document.location.href.match("interactiveMap")){
						$interactiveMap.ui.toolTipTitle = that.data[0].showData;
						$interactiveMap.ui.toolTipUnit = that.data[0].unit;	

					}
					
					return boundData;
					
				},
				
				this.setLegendForStatsData = function (boundCnt, isPass) {
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
												    key === "corp_cnt"		||	  //사업체수 2016.03.24 수정. 사업체통계에서 5미만일 경우, N/A처리
												    key === "ppltn_cnt" ||//생활권역(인구)
												    key === "fmember_cnt" ||//생활권역(가구)
												    key === "resid_cnt" ||//생활권역(주택)
												    key === "corp_cnt" ||//생활권역(주택)
												    key === "employee_cnt" ||//생활권역(주택)
												    key === "olnlp" //생활권역(주택)
												   ) {
													/*if (parseFloat(that.data[k].result[i][key]) < (this.securityStandardCnt + 1)) {	// "N/A" < 숫자 ==> 무조건 false
														
														//mng_s 20180831
														if (this.isInnerMapShow3) {
															
														} else {
															that.data[k].result[i][key] = this.securityStandardCnt;
														}
														
													}*/
													
													// 데이터 조회에서 'N/A'를 받도록 쿼리가 수정된 이후에는 이 주석을 풀어준다.
													//if(that.data[k].result[i][key] === 'N/A') {
														// that.data[k].result[i][key] = this.securityStandardCnt;
													//}
													
												}
												
												if (this.isInnerMapShow3) {
													if (parseFloat(that.data[k].result[i][key]) > 0) {
														tmpData.push(parseFloat(that.data[k].result[i][key]));
													}
												} 
												// 범례 보안 사항 적용 - 2020-11-02 박상언
												else if(that.data[k].result[i][key] === 'N/A') {
													// 범례에 대한 범위 계산을 할때에는 securityStandardCnt에서 정한 값으로 한다.
													tmpData.push(this.securityStandardCnt);
												}
												else {
													tmpData.push(parseFloat(that.data[k].result[i][key]));
												}
												
												
												break;
											}
										}	
									}
									arData.push(tmpData);
								}
							}
						}
					} 
					
					//시계열을 제공하지 않을 경우에만 사용
					if (isPass == undefined || !isPass) {					
						// mng_s  20170802 정책통계지도 범례 좌측으로 고정
						var curPage = document.location.href;
						//var pageNum = curPage.length;
						var matchStr = "policyStaticMap";
						
						//var pageName = curPage.substring(pageNum-15, pageNum);
						if(curPage.match(matchStr)){
							if(this.id == "0"){
								
								arData2 = arData;//test
								that.legend.valPerSlice = that.legend.calculateLegend(arData);//test
							}else{
								if(arData2[0].length != 0){
									arData = arData2
								}
								that.legend.valPerSlice = that.legend.calculateLegend(arData);
							}
						}else{
							var mapRgnNum = -1;
							if( this.target && this.target.indexOf('mapRgn_') !== -1) {
								mapRgnNum = this.target.slice(-1);	// this.target의 맨끝에 있는 번호를 알아온다. this.id+1 값과 같은 값이다.
							}
							// 추가 이유
							// 여태 작업할 때는 cLegendInfo.catchmentAreaLegendInfo.fixed_legend_val{숫자} 를 사용해서 범례 구간별 격자 개수를 세었다.
							// 하지만 변수값인 배열은 calculateLegend를 거치면서 중복이 모두 사라진다. 그래서 차트를 그릴 때, 범례 구간별 격자의 개수가 실제 데이터 개수와 맞지 않는 문제가 생겼다.
							// 중복 제거가 안된 배열을  fixed_legend_data_duplicate_remain{숫자} 에 넣어놓겠다. 사용처는 catchmentAreaLeftMenu.js > setSyncGrid 메소드
							var duplicate_remain_arData = arData[0].slice();
							cLegendInfo.catchmentAreaLegendInfo['fixed_legend_data_duplicate_remain'+mapRgnNum] = duplicate_remain_arData;
							cLegendInfo.catchmentAreaLegendInfo['fixed_boundCnt_'+mapRgnNum] = boundCnt;
							that.legend.valPerSlice = that.legend.calculateLegend(arData);//test
							that.legend.setGoganSum(that.legend.valPerSlice[0], duplicate_remain_arData, boundCnt);		// 구간합 표시(생활권역은 지도가 2개여도 각각 호출하므로 배열크기가 1)

							cLegendInfo.catchmentAreaLegendInfo['fixed_legend_val'+mapRgnNum] = arData;
							//mng_s 20171016 VIEW가 여러개일 때 범례 고정관련 수정
							
						}
						//mng_e  20170802 정책통계지도 범례 좌측으로 고정
					}
					
				};
				////////////////////////////////////////////////////////////////////////////
				//====================== 다중선택 컨트롤러 START =========================//
				////////////////////////////////////////////////////////////////////////////
				this.multiLayerControl = {
					multiData : null,
					dataGeojson : null,
					clear : function () {
						if (this.dataGeojson != null) {
							for (var i=0; i<this.dataGeojson.length; i++) {
								this.dataGeojson[i].remove();
							}
						}
						this.multiData = null;
						this.dataGeojson = null;
					},
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
										if (!this.isInnerMapShow3) { //mng_s 20180213 행정구역 그리드의 경우 8자리일 경우 8자리를 유지해야함
											if (tmpAdmCd.length > 7) {
												tmpAdmCd = tmpAdmCd.substring(0,7);
											}
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
					
					//========================== mng_s 업종별 뜨는 지역 ==============================
					setStatsData2 : function (type, data, options, isShare) {
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
							//showDataParamName = options.params.filter;
							showDataParamName = "corp_cnt";
							unit = options.params.unit;
							adm_cd = options.params.adm_cd;
							//if (that.selectedBoundList != null) {
							//	if (that.selectedBoundList[0].feature != undefined) {
									var tmpAdmCdList = [];
									var tmpSortAdmCdList = [];
									for (var i=0; i<options.params.length; i++) {
										var tmpAdmCd = options.params.adm_cd;
										if (!this.isInnerMapShow3) { //mng_s 20180212
											if (tmpAdmCd.length > 7) {
												tmpAdmCd = tmpAdmCd.substring(0,7);
											}
										}
										tmpAdmCdList.push(tmpAdmCd);
									}
									
									$.each(tmpAdmCdList, function(i, el){
										if($.inArray(el, tmpSortAdmCdList) === -1) tmpSortAdmCdList.push(el);
									});
									length = data.result.length;
							//	}else {
							//		length = that.selectedBoundList.length;
							//	}	
							//}
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
							
							/*
							setTimeout(function() {
								
							}, 1000);
							*/
						
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
										//that.legend.changeDataMode("color");
									}
									that.checkShowCaption();
									
									if (that.shareInfo != null) {
										if (isShare) {
											that.shareInfo.setShareInfo(options, "share", that.id);
										}else {
											//options["zoomlevel"] = that.zoom;
											options["zoomlevel"] = 7; //업종별 뜨는 지역은 7레벨
											//options["center"] = that.center;
											options["center"] = [that.multiLayerControl.multiData[0].data.result[0].x,that.multiLayerControl.multiData[0].data.result[0].y];
											options["btntype"] = "normal";
											if (options.params.param) {
												//options.params.param.push({"key" : "adm_cd", "value" : admCdList.join()});
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
									that.isMultiControlDownBoundary = false;
								}
							});
							
							
						}
					},
					
					
					//========================== mng_e 업종별 뜨는 지역 ==============================
					
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
					autoDownBoundary : function () {
						that.setBoundSelectedMoode(null);
						/*if (that.mapBtnInfo != null) {
							that.mapBtnInfo.setFixedBoundBtn(false);
						}*/
						
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
						//mng_s
						var curPage = document.location.href;
						var matchStr = "policyStaticMap";
						if(curPage.match(matchStr)){
							if(that.id == 0){
								 legendData2 = legendData;
								that.legend.valPerSlice = that.legend.calculateLegend(legendData);
							}else{
								legendData = legendData2;
								that.legend.valPerSlice = that.legend.calculateLegend(legendData2);
							}
						}else{
							that.legend.valPerSlice = that.legend.calculateLegend(legendData);
						}
						
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

							if (tmpData.data.ecountry) {
								$interactiveMapEcountry.setResultDataOnMap();
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
					openApiBoundaryContry : function (data, callback) {
						$.ajax({
							  type: "GET",
							  url: "/js/data/geo.js",
							  success: function(res) {
								  res["pAdmCd"] = "";
								  that.multiLayerControl.multiData.push({
									 data : data,
									 layer : res
								  });
								  if (callback != undefined && typeof callback === "function") {
									  callback.call(undefined, res);
								  }
							  } ,
							  dataType: "json",
							  error:function(e){}  
						});
					},
					openApiBoundarySido : function (year, data, callback) {
						$.ajax({
							  type: "GET",
							  url: "/js/data/geo_sido_" + year + ".js",
							  success: function(res) {
								  res["pAdmCd"] = "00";
								  that.multiLayerControl.multiData.push({
									  data : data,
									  layer : res
								  });
								  if (callback != undefined && typeof callback === "function") {
									  callback.call(undefined, res);
								  }
							  } ,
							  dataType: "json",
							  error:function(e){}  
						});
					},
					
					//지역 다중선택일경우
					openApiBoundaryHadmarea : function (adm_cd, year, low_search, data, atdrc_yn, callback) {
						console.log("openApiBoundaryHadmarea2");
						console.log("openApiBoundaryHadmarea2");
						console.log("openApiBoundaryHadmarea2");
						console.log("openApiBoundaryHadmarea2");
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
						
						console.log("[catchmentAreaMap.js] sopOpenApiHadmareaObj.request 2222 호출전...");
						//mng_s 업종별 뜨는 지역만 async를 false로 변경
						var async_setting = true;
						//console.log("[catchmentAreaMap.js] sopOpenApiHadmareaObj.request $bizStatsLeftMenu [" + $bizStatsLeftMenu );
						
						try { //기술업종에서 $bizStatsLeftMenu가 정의되어있지 않다고 에러가 나서 에러처리를 해줘도 무조건 에러가 나와서 try/catch로 처리함 
							if($bizStatsLeftMenu.ui.jobBestSido != undefined && $bizStatsLeftMenu.ui.jobBestSido != ""){
								async_setting = false;
							} else {
								async_setting = true;
							}
						} catch (exception) {
							async_setting = true;
						}
						
						
						
						$.ajax({
							  type: "GET",
							  async: async_setting, //mng_s kimjoonha 20101031 여수시 돌산읍이 색지도로 표시 않되는 부분은 이걸 주석해제하면 해결되지만 해당 지역으로 센터 이동이 않되므로 일단 주석으로 가야된다.
							  url: openApiPath + "/OpenAPI3/boundary/hadmarea.geojson",
							  data : params,
							  success: function(res) {
								  switch(parseInt(res.errCd)) {
									  case 0:
										  res["pAdmCd"] = adm_cd;
										  if (that.multiLayerControl.multiData != null) {
											  
											  console.log("[catchmentAreaMap.js] openApiBoundaryHadmarea() 111");
											  
											  that.multiLayerControl.multiData.push({
												  data : data,
												  layer : res
											  });
										  }
										  if (callback != undefined && typeof callback === "function") {
											  
											  console.log("[catchmentAreaMap.js] openApiBoundaryHadmarea() 222");
											  
											  callback.call(undefined, res, that); //2017.05.29 [개발팀]
										  }
										  break;
									  case -401:
										  accessTokenInfo(function() {
											  that.multiLayerControl.openApiBoundaryHadmarea(adm_cd, year, low_search, data, atdrc_yn, callback);
										  });
										  break;
								  }
								 
							  },
							  beforeSend:function(){
								  $("div").remove(".ajax_mask");
							      $("div").remove(".ajax_loading");
								  var length = $("body").find(".ajax_mask").length;
								  	if (length == 0) {
								  		var mask = "<div class='ajax_mask'><div>";
									  	var loading = "<div class='ajax_loading'><img class='ajax_loading_img'/><div>";
								        $('body').append(mask);
									  	$('.ajax_mask').append(loading);
								  	}
							  },
							  complete:function(){
							        $("div").remove(".ajax_mask");
							        $("div").remove(".ajax_loading");
							  },
							  dataType: "json",
							  error:function(e){}  
						});
					},
					openApiBoundaryStatsarea : function (adm_cd, year, data, callback) {
						
						console.log("[catchmentAreaMap.js] openApiBoundaryStatsarea() /OpenAPI3/boundary/statsarea.geojson 호출전 adm_cd [" + adm_cd + "]");
						console.log("[catchmentAreaMap.js] openApiBoundaryStatsarea() this.isInnerMapShow3 [" + this.isInnerMapShow3 + "]");
						
						$.ajax({
							  type: "GET",
							  url: openApiPath + "/OpenAPI3/boundary/statsarea.geojson",
							  data : {
								  "accessToken" : accessToken, 
								  "adm_cd" : adm_cd, 
								  "year" : year
							  },
							  success: function(res) {
								  switch(parseInt(res.errCd)) {
									  case 0:
										  res["pAdmCd"] = adm_cd;
										  if (that.multiLayerControl.multiData != null) {
											  that.multiLayerControl.multiData.push({
												  data : data,
												  layer : res
											  });
										  }
										  
										  if (callback != undefined && typeof callback === "function") {
											  callback.call(undefined, res);
										  }
										 break;
									  case -401:
										  accessTokenInfo(function() {
											  that.multiLayerControl.openApiBoundaryStatsarea(adm_cd, year, data, callback);
										  });
										  break;
								  }
								  
							  },
							  beforeSend:function(){
								  $("div").remove(".ajax_mask");
							      $("div").remove(".ajax_loading");
								  var length = $("body").find(".ajax_mask").length;
								  	if (length == 0) {
								  		var mask = "<div class='ajax_mask'><div>";
									  	var loading = "<div class='ajax_loading'><img class='ajax_loading_img'/><div>";
								        $('body').append(mask);
									  	$('.ajax_mask').append(loading);
								  	}
							  },
							  complete:function(){
							        $("div").remove(".ajax_mask");
							        $("div").remove(".ajax_loading");
							  },
							  dataType: "json",
							  error:function(e){}  
						});
					}
				};
				////////////////////////////////////////////////////////////////////////////
				//======================= 다중선택 컨트롤러 END ==========================//
				////////////////////////////////////////////////////////////////////////////
				
				this.createHeatMap = function(options) {
					var minOpacity = 0.01;
					var radius = this.heatRadius;
					var blur = this.heatBlur;
					var zoomLevelHeat = this.zoomLevelHeat; //9월 서비스
					var max = 1;
					
					if (options != undefined) {
						if (options.minOpacity != undefined) {minOpacity = options.minOpacity;}
						if (options.radius != undefined) {radius = options.radius;}
						if (options.blur != undefined) {blur = options.blur;}
						if (options.max != undefined) {max = options.max;}
						if (options.zoomLevelHeat != undefined) {zoomLevelHeat = options.zoomLevelHeat;} //9월 서비스
					}
					var heat = sop.heatLayer();
					heat.addTo(this.gMap);
					heat.setOptions({
						minOpacity: minOpacity,
						radius: radius,
						blur: blur,
						max: max,
						zoomLevelHeat : zoomLevelHeat //9월 서비스
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
				
				this.setHeatMapOptions = function(radius, blur, max) { //9월 서비스
					if (this.heatMap != null) {
						this.heatRadius = radius;
						this.heatBlur = blur;
						//9월 서비스
						var hMax = max;
						var zlHeat = true;
						if (this.zoomLevelHeat) {
							hMax = 1;
						}
						
						this.heatMap.setOptions({
							minOpacity: 0.01,
							radius: radius,
							blur: blur,
							max: hMax, //9월 서비스
							zoomLevelHeat : this.zoomLevelHeat //9월 서비스
						});
					}
				};
				
				//20200417 수정 시작 (ggm)
				// OpenAPI 리버스지오코딩(대화형 통계지도:자치구) 검색, 호출조건: 대화형 통계지도(chkIfInteractive() == true)에서 시군구(zoom == 4)일 때
				this.openApiReverseGeoCodeForBorough = function (center, callback) {
					
					console.log("[catchmentAreaMap.js] openApiReverseGeoCodeForBorough 호출");
					
					var sopOpenApiReverseGeoCodeForBoroughObj = new sop.openApi.ReverseGeoCodeForBorough.api();														  
					sopOpenApiReverseGeoCodeForBoroughObj.addParam("accessToken", accessToken);
					sopOpenApiReverseGeoCodeForBoroughObj.addParam("addr_type", "20");
					sopOpenApiReverseGeoCodeForBoroughObj.addParam("x_coor", center[0]);
					sopOpenApiReverseGeoCodeForBoroughObj.addParam("y_coor", center[1]);
					sopOpenApiReverseGeoCodeForBoroughObj.request({
						method : "GET",
						async : true,
						url : "/ServiceAPI/OpenAPI3/interactiveMap/addr/rgeocodeForBorough.json",
						options : {
							target : this,
							center : center,
							callback : callback //2017-08-16 [개발팀] 콜백추가
						}
					});
				};				

				// OpenAPI 행정동경계(대화형 통계지도:자치구) 검색, 호출조건: 대화형 통계지도(chkIfInteractive() == true)에서 시군구(zoom == 4)일 때 
				this.openApiBoundaryHadmareaForBorough = function (adm_cd, year, low_search, atdrc_yn, callback, bounds){

					var sopOpenApiHadmareaForBoroughObj = new sop.openApi.hadmareaForBorough.api();
					sopOpenApiHadmareaForBoroughObj.addParam("accessToken", accessToken);
					sopOpenApiHadmareaForBoroughObj.addParam("adm_cd", adm_cd);
					sopOpenApiHadmareaForBoroughObj.addParam("year", year);
					sopOpenApiHadmareaForBoroughObj.addParam("low_search", low_search);
					//sopOpenApiHadmareaForBoroughObj.addParam("zoom_level", zoomLevel); 2019-03-11 박길섭

					//자치구경계
					if ((atdrc_yn != undefined && atdrc_yn == "1")||this.atdrc_yn==="1") {
						sopOpenApiHadmareaForBoroughObj.addParam("borough", low_search);
					} 
					
					console.log("[catchmentAreaMap.js] sopOpenApiHadmareaForBoroughObj.request 1111 호출전...");
					
					sopOpenApiHadmareaForBoroughObj.request({
						method : "GET",
						async : true,
						url : "/ServiceAPI/interactiveMap/boundary/hadmareaForBorough.geojson",
						options : {
							target : this,
							adm_cd : adm_cd,
							year : year,
							low_search : low_search,
							callback : callback
						}
					});					
				};
				
				this.chkIfInteractive = function() {
					var rstVal = false;
					if (this.delegate && this.delegate.ui && this.delegate.ui.chkIfInteractive != undefined) {
						//20200427 수정 시작 (ggm)
						if(arguments.length == 2){
							rstVal = this.delegate.ui.chkIfInteractive(arguments[0], arguments[1]);
						}else{
							rstVal = this.delegate.ui.chkIfInteractive();
						}
						//20200427 수정 끝
					}
					return rstVal;
				};
				
				//200423수정 시작 (ggm)
				this.chkIfNonSelf = function() {
					var rstVal = -1;
					if (this.delegate && this.delegate.ui && this.delegate.ui.chkIfNonSelf != undefined) {
						var pAdmCd = null;
						if(arguments.length > 0){
							pAdmCd = arguments[0];
						}
						rstVal = this.delegate.ui.chkIfNonSelf(pAdmCd); 
					}
					return rstVal;
				};
				//200423수정 끝
				
				//200423수정 시작 (ggm)
				this.chkIfZoomLvl4 = function() {				
					var rstVal = "N";
					var curZoomNo = this.zoom;
					var lowSearch = this.boundLevel;
					
					if((curZoomNo == 2 || curZoomNo == 3) && lowSearch == "1"){			// (2, 3)시도 & 1레벨
						rstVal = "Y";
					}else if(curZoomNo == 4 && lowSearch == "0"){							// 4시군구 & 0레벨 
						rstVal = "Y";
					}else if((curZoomNo == 0 || curZoomNo == 1) && lowSearch == "2"){		// 전국 & 2레벨
						rstVal = "Y";
					}
					return rstVal;
				};				
				//200423수정 끝
				//20200417 수정 끝
			},
			
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
		
				// 맵을 생성한다.
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
						this.zoom = 5; //6->5
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
				
				this.eventAllDiabled = function() {
						this.gMap.dragging.disable();
						this.gMap.touchZoom.disable();
						this.gMap.doubleClickZoom.disable();
						this.gMap.scrollWheelZoom.disable();
				},
				
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
						//dashArray: 3,
						fillOpacity : fillOpacity,
						fillColor : fillColor
					};
				};
				
				this.addPolygonGeoJson = function (obj, type, opt) {
					console.log("addPolygonGeoJson start ...............");
					console.log("[catchmentAreaMap.js] addPolygonGeoJson() 하위222 호출");
					
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
					
					if (opt) {
						if (opt.group) {
							this.geojson.addTo(opt.group);
						}
						else {
							this.geojson.addTo(this.gMap);
						}
					}
					else {
						this.geojson.addTo(this.gMap);
					}
					this.gMap.fitBounds(geojson.getBounds());
					
				};
				
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

				this.setPolyLayerMouseover = function (e) {
					var layer = e.target;
					layer.setStyle({
						weight : 1,
						color : "#0086c6",
						dashArray : layer.options.dashArray,
						fillOpacity : layer.options.fillOpacity,
						fillColor : layer.options.fillColor
					});
					
					if (!sop.Browser.ie) {
						layer.bringToFront();
					}
				};
				
				this.setPolyLayerMouseout = function (e) {
					var layer = e.target;
					var color = "#ffb2a5";
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
	
				};
				
			},
			
	};
	
	/** ********* OpenAPI 행정동경계 검색 Start ********* */
	(function () {
		$class("sop.openApi.hadmarea.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				console.log("[catchmentAreaMap.js] sop.openApi.hadmarea.api res.errCd [" + res.errCd);
				var that = options.target;
				if (res.errCd == "0") {
					options["geojson"] = res;
					that.lastGeojsonInfo = options;
					res["pAdmCd"] = options.adm_cd;
					//options.target.setPolygonDataGeojson(res); 민정 작업(행정동 경계 안보이게)
					//9월 서비스
					if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
						options.callback.call(undefined, that, res);
					}
					
				}
				else if (res.errCd == "-401") {
					accessTokenInfo(function() {
						that.openApiBoundaryHadmarea(options.adm_cd, options.year, options.low_search, options.callback); //9월 서비스
					});
					//9월 서비스
					if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
						options.callback.call(undefined, that, res);
					}
				}
				else {
					//messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
				console.log("[catchmentAreaMap.js] sop.openApi.hadmarea.api onFail [" + status);
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
					//that.setPolygonDataGeojson(res); 민정 작업(행정동 경계 안보이게)
					//9월 서비스
					if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
						options.callback.call(undefined, that, res);
					}
				}
				else if (res.errCd == "-401") {
					accessTokenInfo(function() {
						that.openApiBoundaryStatsarea(options.adm_cd, options.year, options.callback); //9월 서비스
					});
					//9월 서비스
					if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
						options.callback.call(undefined, that, res);
					}
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
	
	
	/** ********* OpenAPI grid경계 검색 Start ********* */
	(function () {
		$class("sop.openApi.gridarea.api").extend(sop.portal.absAPI).define({
			
			onSuccess : function (status, res, options) {
				
				console.log("[catchmentAreaMap.js] sop.openApi.gridarea.api 호출");
				console.log("[catchmentAreaMap.js] sop.openApi.gridarea.api res.errCd [" + res.errCd);
				
				var that = options.target;
				if (res.errCd == "0") {
					options["geojson"] = res;
					that.lastGeojsonInfo = options;
					res["pAdmCd"] = options.adm_cd;
					options.target.setPolygonDataGeojson(res);
					//9월 서비스
					if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
						options.callback.call(undefined, that, res);
					}
					
				}
				else if (res.errCd == "-401") {
					accessTokenInfo(function() {
						//파라미터는 나중에 변경 요망
						that.openApiBoundaryGridarea(options.adm_cd, options.year, options.low_search, options.callback); //9월 서비스
					});
					//9월 서비스
					if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
						options.callback.call(undefined, that, res);
					}
				}
				else {
					//messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
				console.log("[catchmentAreaMap.js] sop.openApi.gridarea.api onFail status [" + status);				
			}
		});
	}());
	/** ********* OpenAPI grid경계 검색 End ********* */
	
	
	/** ********* OpenAPI 리버스지오코딩 Start ********* */
	(function () {
		$class("sop.openApi.ReverseGeoCode.api").extend(sop.portal.absAPI).define({
			
			onSuccess : function (status, res, options) {
				console.log("[catchmentAreaMap.js] sop.openApi.ReverseGeoCode.api 호출");
				console.log("[catchmentAreaMap.js] sop.openApi.ReverseGeoCode.api res.errCd [" + res.errCd);
				
				var that = options.target;
				if (res.errCd == "0") {
					var result = res.result[0];
					var curSidoCd = result.sido_cd;
					var curSiggCd = result.sgg_cd;
					var curDongCd = result.emdong_cd;
					var curPolygonCode = that.curPolygonCode;
					
					console.log("[catchmentAreaMap.js] sop.openApi.ReverseGeoCode.api that.isInnerMapShow2[" + that.isInnerMapShow2);
					console.log("[catchmentAreaMap.js] sop.openApi.ReverseGeoCode.api that.isInnerMapShow3[" + that.isInnerMapShow3);
					
					if(!that.delegate.noReverseGeoCode){
						
						//공유된 정보일 경우, 조회했던 경계레벨로 설정
						if(document.location.href.match("interactive")){
							if($interactiveMap.ui.isShare){
								var data = $interactiveMap.ui.shareData["data"];
								
								if(data.curPolygonCode != undefined){
									curSidoCd = data.paramInfo.adm_cd.substr(0,2);
									curSiggCd = data.paramInfo.adm_cd.substr(2,3);
									curDongCd = data.paramInfo.adm_cd.substr(5,2);
									
									curPolygonCode = data.curPolygonCode;
									$interactiveMap.ui.isShare = false;
								}
							}
						}
						
						
						if (that.isInnerMapShow){
							that.openApiBuildArea(that.bounds);
						
						//mng_s grid
						} else if (that.isInnerMapShow2){ //mng_s kimjoonha
							that.openApiBoundaryHadmarea("11010", that.bnd_year,  "1", "0", that.boundaryCallback, that.bounds); //그리드의 경우 시군구코드에 임의값 지정
							
							/*
							switch (that.curPolygonCode) {
							
							// 전국
							case 1:
								that.openApiBoundaryHadmarea("", that.bnd_year,  "1", "0", that.boundaryCallback, that.bounds);
								break;
								
							//전국시도
							case 2:
								that.openApiBoundaryHadmarea(curSidoCd, that.bnd_year,  "1", "0", that.boundaryCallback, that.bounds);
								break;
								
							// 시군구
							case 3:
								
								
								//최근경계조회조건 하나를 가지고 있다가 비교하여 같으면 기존에 저장된 경계를 호출
								if (that.lastGeojsonInfo != null 
										&& that.lastGeojsonInfo.adm_cd == curSidoCd 
										&& that.lastGeojsonInfo.year == that.bnd_year) {
									if (that.dataGeojson == null) {
										that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
									}else {
										that.clearData();
										that.openApiBoundaryHadmarea(curSidoCd, that.bnd_year,  "1", "0", that.boundaryCallback, that.bounds);
									}
								}else {
									that.openApiBoundaryHadmarea(curSidoCd, that.bnd_year,  "1", "0", that.boundaryCallback, that.bounds);
								}
								break;
								
							// 동면읍
							case 4:
								
								if (that.lastGeojsonInfo != null 
										&& that.lastGeojsonInfo.adm_cd == curSidoCd + curSiggCd 
										&& that.lastGeojsonInfo.year == that.bnd_year) {
									if (that.dataGeojson == null) {
										that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
									}else {
										that.clearData();
										that.openApiBoundaryHadmarea(curSidoCd + curSiggCd, that.bnd_year,  "1", "0", that.boundaryCallback, that.bounds);
									}
								}else {
									that.openApiBoundaryHadmarea(curSidoCd + curSiggCd, that.bnd_year,  "1", "0", that.boundaryCallback, that.bounds);
								}
								break;
								
							// 집계구
							case 5:
								
								if (that.lastGeojsonInfo != null 
										&& that.lastGeojsonInfo.adm_cd == curSidoCd + curSiggCd + curDongCd
										&& that.lastGeojsonInfo.year == that.bnd_year) {
									console.log("[catchmentAreaMap.js] sop.openApi.ReverseGeoCode.api 집계구 000 [" );
									console.log("[catchmentAreaMap.js] sop.openApi.ReverseGeoCode.api 집계구 that.dataGeojson [" + that.dataGeojson);
									
									if (that.dataGeojson == null) {
										console.log("[catchmentAreaMap.js] sop.openApi.ReverseGeoCode.api 집계구 111 [" );
										that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
										
										//that.openApiBoundaryHadmarea(curSidoCd + curSiggCd + curDongCd, that.bnd_year,  "2", "0", that.boundaryCallback, that.bounds);
																				
									}else {
										console.log("[catchmentAreaMap.js] sop.openApi.ReverseGeoCode.api 집계구 222 [" );
										that.clearData();
										//that.openApiBoundaryStatsarea(curSidoCd + curSiggCd + curDongCd, that.bnd_year, that.boundaryCallback); //9월 서비스
										that.openApiBoundaryHadmarea(curSidoCd + curSiggCd + curDongCd, that.bnd_year,  "2", "0", that.boundaryCallback, that.bounds);
									}							
								}else {
									console.log("[catchmentAreaMap.js] sop.openApi.ReverseGeoCode.api 집계구 333 [" );
									//that.openApiBoundaryStatsarea(curSidoCd + curSiggCd + curDongCd, that.bnd_year, that.boundaryCallback); //9월 서비스
									that.openApiBoundaryHadmarea(curSidoCd + curSiggCd + curDongCd, that.bnd_year,  "2", "0", that.boundaryCallback, that.bounds);
								}
								break;
								
							default:
								break;
							
							} //end of switch
							*/
						//mng_e grid
							
						//mng_s bnd_grid 행정구역 그리드 20180206
						} else if (that.isInnerMapShow3){ //mng_s kimjoonha
							//that.openApiBoundaryHadmarea("11010", that.bnd_year,  "1", "0", that.boundaryCallback, that.bounds);
							
							switch (that.curPolygonCode) {
							
							//전국
							case 1:
								that.openApiBoundaryHadmarea("00", that.bnd_year,  "1", "0", that.boundaryCallback);
								break;
								
							//전국시도
							case 2:
								that.openApiBoundaryHadmarea("00", that.bnd_year,  "1", "0", that.boundaryCallback);
								break;
								
							//시군구
							case 3:
								that.openApiBoundaryHadmarea(curSidoCd + curSiggCd, that.bnd_year,  "1", "0", that.boundaryCallback);
								break;
								
							//동면읍
							case 4:
								that.openApiBoundaryHadmarea(curSidoCd + curSiggCd + curDongCd, that.bnd_year,  "1", "0", that.boundaryCallback);
							
							//집계구(행정구역 그리드의 경우 집계구는 읍면동과 같은 로직을 태우면 될듯하다.
							case 5:
								that.openApiBoundaryHadmarea(curSidoCd + curSiggCd + curDongCd, that.bnd_year,  "1", "0", that.boundaryCallback);
								break;
								
							default:
								break;
							
							}
							
							
						} else if (!that.isNoReverseGeocode){
							switch (curPolygonCode) {
							
							// 전국
							case 1:
								that.openApiBoundaryContry(that.boundaryCallback); //9월 서비스
								break;
								
								//전국시도
							case 2:
								that.openApiBoundarySido(that.bnd_year, that.boundaryCallback); //9월 서비스
								break;
								
								// 시군구
							//2019-03-11 박길섭 시작
							/*case 100:
								//최근경계조회조건 하나를 가지고 있다가 비교하여 같으면 기존에 저장된 경계를 호출
								that.openApiBoundaryHadmarea(curSidoCd, that.bnd_year, "1", "0", that.boundaryCallback , undefined , "100"); //9월 서비스
								break;
								
							case 3:
								//최근경계조회조건 하나를 가지고 있다가 비교하여 같으면 기존에 저장된 경계를 호출
								that.openApiBoundaryHadmarea(curSidoCd, that.bnd_year, "1", "0", that.boundaryCallback); //9월 서비스
								break;*/
							case 3:
								//최근경계조회조건 하나를 가지고 있다가 비교하여 같으면 기존에 저장된 경계를 호출
								if (that.lastGeojsonInfo != null 
										&& that.lastGeojsonInfo.adm_cd == curSidoCd 
										&& that.lastGeojsonInfo.year == that.bnd_year) {
									//20200417 수정 시작 (ggm)
									if (that.chkIfInteractive() && that.lastGeojsonInfo.zoom != that.zoom){
										//that.clearData();
										that.openApiBoundaryHadmarea(curSidoCd, that.bnd_year, "1", "0", that.boundaryCallback); //9월 서비스										
									}else{
										if (that.dataGeojson == null) {
											//that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson); 민정 작업중(행정동 경계 주석)
										}else {
											that.clearData();
											that.openApiBoundaryHadmarea(curSidoCd, that.bnd_year, "1", "0", that.boundaryCallback); //9월 서비스
										}
									}
									//20200417 수정 끝									
								}else {
									that.openApiBoundaryHadmarea(curSidoCd, that.bnd_year,  "1", "0", that.boundaryCallback); //9월 서비스
								}
								break;
							//2019-03-11 박길섭 끝
								
								// 동면읍
							case 4:
								if (that.lastGeojsonInfo != null 
										&& that.lastGeojsonInfo.adm_cd == curSidoCd + curSiggCd 
										&& that.lastGeojsonInfo.year == that.bnd_year) {
									if (that.dataGeojson == null) {
										//that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson); 민정 작업중(행정동 경계 주석)
									}else {
										that.clearData();
										that.openApiBoundaryHadmarea(curSidoCd + curSiggCd, that.bnd_year, "1", "0", that.boundaryCallback); //9월 서비스
									}
								}else {
									that.openApiBoundaryHadmarea(curSidoCd + curSiggCd, that.bnd_year, "1", "0", that.boundaryCallback); //9월 서비스
								}
								break;
								
								// 집계구
							case 5:
								if (that.lastGeojsonInfo != null 
										&& that.lastGeojsonInfo.adm_cd == curSidoCd + curSiggCd + curDongCd
										&& that.lastGeojsonInfo.year == that.bnd_year) {
									if (that.dataGeojson == null) {
										//that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson); 민정 작업중(행정동 경계 주석)
									}else {
										that.clearData();
										that.openApiBoundaryStatsarea(curSidoCd + curSiggCd + curDongCd, that.bnd_year, that.boundaryCallback); //9월 서비스
									}							
								}else {
									that.openApiBoundaryStatsarea(curSidoCd + curSiggCd + curDongCd, that.bnd_year, that.boundaryCallback); //9월 서비스
								}
								break;
								
							default:
								break;
							
							}
						}
					}
					
					that.curSidoCd = result.sido_cd;
					that.curSiggCd = result.sgg_cd;
					that.curDongCd = result.emdong_cd;
					that.curSidoNm = result.sido_nm;
					that.curSiggNm = result.sgg_nm;
					that.curDongNm = result.emdong_nm;
					
					//2017-08-22 [개발팀] 네비개이션 사용하지 않을 경우, 예외처리
					if (that.mapNavigation != null) {
						that.mapNavigation.reverseOnSelectChange(that);
					}
					
					//$catchmentAreaMenu.ui.reverseOnSelectChange(that);//민정 작업중
					
					if (!that.isFixedBound) {
						that.isNoReverseGeocode = false;
					}
					
					//2017-08-16 [개발팀] 콜백추가
					if (options.callback != undefined && typeof options.callback === "function") {
						options.callback.call(undefined, res);
					}
				}
				else if (res.errCd == "-401") {
					accessTokenInfo(function() {
						if (options.center != undefined && options.center != null) {
							if(errCount < 10){
								errCount++;
								that.openApiReverseGeoCode(options.center, options.callback); //2017-08-16 [개발팀] 콜백추가
							}
						}
					});
					
				} else if (res.errCd = "-100") {
					//2017-08-22 [개발팀] 네비개이션 사용하지 않을 경우, 예외처리
					if (that.mapNavigation != null) {
						that.mapNavigation.notFoundData(that);
					}
				}
				else {
					////messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
				console.log("[catchmentAreaMap.js] sop.openApi.ReverseGeoCode.api onFail [" + status);
			}
		});
	}());
	/** ********* OpenAPI 리버스지오코딩. End ********* */
	
	
	/** ********* OpenAPI 리버스지오코딩그리드 Start ********* */
	(function () {
		$class("sop.openApi.ReverseGeoCodeGrid.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var that = options.target;
				if (res.errCd == "0") {
					var result = res.result[0];
					var curSidoCd = result.sido_cd;
					var curSiggCd = result.sgg_cd;
					var curDongCd = result.emdong_cd;
					if(!that.delegate.noReverseGeoCode){
						if (that.isInnerMapShow){
							that.openApiGridArea(that.bounds);
							
						//아래 로직은 않쓸듯 하다.
						}else if (!that.isNoReverseGeocode){
							switch (that.curPolygonCode) {
							
							// 전국
							case 1:
								that.openApiBoundaryContry(that.boundaryCallback); //9월 서비스
								break;
								
								//전국시도
							case 2:
								that.openApiBoundarySido(that.bnd_year, that.boundaryCallback); //9월 서비스
								break;
								
								// 시군구
							case 3:
								//최근경계조회조건 하나를 가지고 있다가 비교하여 같으면 기존에 저장된 경계를 호출
								if (that.lastGeojsonInfo != null 
										&& that.lastGeojsonInfo.adm_cd == curSidoCd 
										&& that.lastGeojsonInfo.year == that.bnd_year) {
									if (that.dataGeojson == null) {
										//that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson); 민정작업중(행정동경계 주석)
									}else {
										that.clearData();
										that.openApiBoundaryHadmarea(curSidoCd, that.bnd_year, "1", "0", that.boundaryCallback); //9월 서비스
									}
								}else {
									that.openApiBoundaryHadmarea(curSidoCd, that.bnd_year,  "1", "0", that.boundaryCallback); //9월 서비스
								}
								break;
								
								// 동면읍
							case 4:
								if (that.lastGeojsonInfo != null 
										&& that.lastGeojsonInfo.adm_cd == curSidoCd + curSiggCd 
										&& that.lastGeojsonInfo.year == that.bnd_year) {
									if (that.dataGeojson == null) {
										// that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson); 민정작업중(행정동경계 주석)
									}else {
										that.clearData();
										that.openApiBoundaryHadmarea(curSidoCd + curSiggCd, that.bnd_year, "1", "0", that.boundaryCallback); //9월 서비스
									}
								}else {
									that.openApiBoundaryHadmarea(curSidoCd + curSiggCd, that.bnd_year, "1", "0", that.boundaryCallback); //9월 서비스
								}
								break;
								
								// 집계구
							case 5:
								if (that.lastGeojsonInfo != null 
										&& that.lastGeojsonInfo.adm_cd == curSidoCd + curSiggCd + curDongCd
										&& that.lastGeojsonInfo.year == that.bnd_year) {
									if (that.dataGeojson == null) {
										//that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson); 민정작업중(행정동경계 주석)
									}else {
										that.clearData();
										that.openApiBoundaryStatsarea(curSidoCd + curSiggCd + curDongCd, that.bnd_year, that.boundaryCallback); //9월 서비스
									}							
								}else {
									that.openApiBoundaryStatsarea(curSidoCd + curSiggCd + curDongCd, that.bnd_year, that.boundaryCallback); //9월 서비스
								}
								break;
								
							default:
								break;
							
							}
						}
					}
					
					that.curSidoCd = result.sido_cd;
					that.curSiggCd = result.sgg_cd;
					that.curDongCd = result.emdong_cd;
					that.curSidoNm = result.sido_nm;
					that.curSiggNm = result.sgg_nm;
					that.curDongNm = result.emdong_nm;
					that.mapNavigation.reverseOnSelectChange(that);
					if (!that.isFixedBound) {
						that.isNoReverseGeocode = false;
					}
				}
				else if (res.errCd == "-401") {
					accessTokenInfo(function() {
						if (options.center != undefined && options.center != null) {
							if(errCount < 10){
								errCount++;
								that.openApiReverseGeoCodeGrid(options.center);
							}
						}
					});
					
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
	/** ********* OpenAPI 리버스지오코딩그리드. End ********* */
	
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
	/** ********* OpenAPI 상권조회. End ********* */
	
	//2020년수정변경 시작 (ggm)
	/** ********* OpenAPI 리버스지오코딩(대화형 통계지도:자치구) Start ********* */
	//원형: sop.openApi.ReverseGeoCode.api
	(function () {
		$class("sop.openApi.ReverseGeoCodeForBorough.api").extend(sop.portal.absAPI).define({
			
			onSuccess : function (status, res, options) {
				console.log("[catchmentAreaMap.js] sop.openApi.ReverseGeoCodeForBorough.api 호출");
				console.log("[catchmentAreaMap.js] sop.openApi.ReverseGeoCodeForBorough.api res.errCd [" + res.errCd);
				
				var that = options.target;
				if (res.errCd == "0") {
					var result = res.result[0];
					var curSidoCd = result.sido_cd;
					var curSiggCd = result.sgg_cd;
					var curDongCd = result.emdong_cd;
					var curPolygonCode = that.curPolygonCode;
					
					console.log("[catchmentAreaMap.js] sop.openApi.ReverseGeoCodeForBorough.api that.isInnerMapShow2[" + that.isInnerMapShow2);
					console.log("[catchmentAreaMap.js] sop.openApi.ReverseGeoCodeForBorough.api that.isInnerMapShow3[" + that.isInnerMapShow3);
					
					if(!that.delegate.noReverseGeoCode){
						
						//공유된 정보일 경우, 조회했던 경계레벨로 설정
						if(document.location.href.match("interactive")){
							if($interactiveMap.ui.isShare){
								var data = $interactiveMap.ui.shareData["data"];
								
								if(data.curPolygonCode != undefined){
									curSidoCd = data.paramInfo.adm_cd.substr(0,2);
									curSiggCd = data.paramInfo.adm_cd.substr(2,3);
									curDongCd = data.paramInfo.adm_cd.substr(5,2);
									
									curPolygonCode = data.curPolygonCode;
									$interactiveMap.ui.isShare = false;
								}
							}
						}
						
						
						if (that.isInnerMapShow){
							that.openApiBuildArea(that.bounds);
						
						//mng_s grid
						} else if (that.isInnerMapShow2){ //mng_s kimjoonha
							that.openApiBoundaryHadmarea("11010", that.bnd_year,  "1", "0", that.boundaryCallback, that.bounds); //그리드의 경우 시군구코드에 임의값 지정

						} else if (that.isInnerMapShow3){ //mng_s kimjoonha
							
							switch (that.curPolygonCode) {
							
							//전국
							case 1:
								that.openApiBoundaryHadmarea("00", that.bnd_year,  "1", "0", that.boundaryCallback);
								break;
								
							//전국시도
							case 2:
								that.openApiBoundaryHadmarea("00", that.bnd_year,  "1", "0", that.boundaryCallback);
								break;
								
							//시군구
							case 3:
								that.openApiBoundaryHadmarea(curSidoCd + curSiggCd, that.bnd_year,  "1", "0", that.boundaryCallback);
								break;
								
							//동면읍
							case 4:
								that.openApiBoundaryHadmarea(curSidoCd + curSiggCd + curDongCd, that.bnd_year,  "1", "0", that.boundaryCallback);
							
							//집계구(행정구역 그리드의 경우 집계구는 읍면동과 같은 로직을 태우면 될듯하다.
							case 5:
								that.openApiBoundaryHadmarea(curSidoCd + curSiggCd + curDongCd, that.bnd_year,  "1", "0", that.boundaryCallback);
								break;
								
							default:
								break;
							
							}
							
							
						} else if (!that.isNoReverseGeocode){
							switch (curPolygonCode) {
							
							// 전국
							case 1:
								that.openApiBoundaryContry(that.boundaryCallback); //9월 서비스
								break;
								
								//전국시도
							case 2:
								that.openApiBoundarySido(that.bnd_year, that.boundaryCallback); //9월 서비스
								break;
								
								// 시군구
							case 3:
								//최근경계조회조건 하나를 가지고 있다가 비교하여 같으면 기존에 저장된 경계를 호출
								if (that.lastGeojsonInfo != null 
										&& that.lastGeojsonInfo.adm_cd == curSidoCd 
										&& that.lastGeojsonInfo.year == that.bnd_year) {
									if (that.chkIfInteractive() && that.lastGeojsonInfo.zoom && that.lastGeojsonInfo.zoom == that.zoom){	//20200417 수정 (ggm)
										if (that.dataGeojson == null) {
											that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
										}else {
											that.clearData();
											that.openApiBoundaryHadmareaForBorough(curSidoCd, that.bnd_year, "1", "0", that.boundaryCallback); //9월 서비스
										}									
									}else{									
										that.clearData();
										that.openApiBoundaryHadmareaForBorough(curSidoCd, that.bnd_year, "1", "0", that.boundaryCallback); //9월 서비스
									}
								}else {
									that.openApiBoundaryHadmareaForBorough(curSidoCd, that.bnd_year,  "1", "0", that.boundaryCallback); //9월 서비스
								}
								break;
							//2019-03-11 박길섭 끝
								
								// 동면읍
							case 4:
								if (that.lastGeojsonInfo != null 
										&& that.lastGeojsonInfo.adm_cd == curSidoCd + curSiggCd 
										&& that.lastGeojsonInfo.year == that.bnd_year) {
									if (that.dataGeojson == null) {
										that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
									}else {
										that.clearData();
										that.openApiBoundaryHadmarea(curSidoCd + curSiggCd, that.bnd_year, "1", "0", that.boundaryCallback); //9월 서비스
									}
								}else {
									that.openApiBoundaryHadmarea(curSidoCd + curSiggCd, that.bnd_year, "1", "0", that.boundaryCallback); //9월 서비스
								}
								break;
								
								// 집계구
							case 5:
								if (that.lastGeojsonInfo != null 
										&& that.lastGeojsonInfo.adm_cd == curSidoCd + curSiggCd + curDongCd
										&& that.lastGeojsonInfo.year == that.bnd_year) {
									if (that.dataGeojson == null) {
										that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
									}else {
										that.clearData();
										that.openApiBoundaryStatsarea(curSidoCd + curSiggCd + curDongCd, that.bnd_year, that.boundaryCallback); //9월 서비스
									}							
								}else {
									that.openApiBoundaryStatsarea(curSidoCd + curSiggCd + curDongCd, that.bnd_year, that.boundaryCallback); //9월 서비스
								}
								break;
								
							default:
								break;
							
							}
						}
					}
					
					that.curSidoCd = result.sido_cd;
					that.curSiggCd = result.sgg_cd;
					that.curDongCd = result.emdong_cd;
					that.curSidoNm = result.sido_nm;
					that.curSiggNm = result.sgg_nm;
					that.curDongNm = result.emdong_nm;
					
					//2017-08-22 [개발팀] 네비개이션 사용하지 않을 경우, 예외처리
					if (that.mapNavigation != null) {
						that.mapNavigation.reverseOnSelectChange(that);
					}
					
					if (!that.isFixedBound) {
						that.isNoReverseGeocode = false;
					}
					
					//2017-08-16 [개발팀] 콜백추가
					if (options.callback != undefined && typeof options.callback === "function") {
						options.callback.call(undefined, res);
					}
				}
				else if (res.errCd == "-401") {
					accessTokenInfo(function() {
						if (options.center != undefined && options.center != null) {
							if(errCount < 10){
								errCount++;
								that.openApiReverseGeoCode(options.center, options.callback); //2017-08-16 [개발팀] 콜백추가
							}
						}
					});
					
				} else if (res.errCd = "-100") {
					//2017-08-22 [개발팀] 네비개이션 사용하지 않을 경우, 예외처리
					if (that.mapNavigation != null) {
						that.mapNavigation.notFoundData(that);
					}
				}
				else {
					////messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
				console.log("[catchmentAreaMap.js] sop.openApi.ReverseGeoCodeForBorough.api onFail [" + status);
			}
		});
	}());
	/** ********* OpenAPI 리버스지오코딩(대화형 통계지도:자치구) End ********* */

	/** ********* OpenAPI 행정동경계(대화형 통계지도:자치구) 검색 Start ********* */
	//원형: sop.openApi.hadmarea.api
	(function () {
		$class("sop.openApi.hadmareaForBorough.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				console.log("[catchmentAreaMap.js] sop.openApi.hadmareaForBorough.api res.errCd [" + res.errCd);
				var that = options.target;
				if (res.errCd == "0") {
					options["geojson"] = res;
					options["zoom"] = that.zoom;		// 기존 경계정보 사용여부 확인에 사용
					that.lastGeojsonInfo = options;
					res["pAdmCd"] = options.adm_cd;
					options.target.setPolygonDataGeojson(res);
					//9월 서비스
					if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
						options.callback.call(undefined, that, res);
					}
					
				}
				else if (res.errCd == "-401") {
					accessTokenInfo(function() {
						that.openApiBoundaryHadmarea(options.adm_cd, options.year, options.low_search, options.callback); //9월 서비스
					});
					//9월 서비스
					if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
						options.callback.call(undefined, that, res);
					}
				}
				else {
					//messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
				console.log("[catchmentAreaMap.js] sop.openApi.hadmareaForBorough.api onFail [" + status);
			}
		});
	}());
	/** ********* OpenAPI 행정동경계(대화형 통계지도:자치구) 검색 End ********* */
	//2020년수정변경 끝

	/** ********* OpenAPI 생활권역 주행시간,거리기준 격자경계 검색 Start ********* */
	(function () {
		$class("sop.openApi.catchmentGrid.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				console.log("[catchmentAreaMap.js] sop.openApi.catchmentGrid.api res.errCd [" + res.errCd);
				console.log(res);
				
				$catchmentAreaDataBoard.ui.settingGridinfo(res.features.length);
				var that = options.target;
				if (res.errCd == "0") {
					options["geojson"] = res;
					that.lastGeojsonInfo = options;
					res["pAdmCd"] = options.adm_cd;
					options.target.setPolygonDataGeojson(res);
					
					var dataGeojson = that.dataGeojson;
					if(dataGeojson != undefined && dataGeojson != null){
						that.gMap.fitBounds(dataGeojson.getBounds());
					}
					
					//9월 서비스
					if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
						options.callback.call(undefined, that, res);
					}
					if(options.resolve) { 
						//options.target.setDroppedInfo();
						options.resolve(options.target);
					}
					
				}
				else if (res.errCd == "-401") {
					accessTokenInfo(function() {
						that.openApiCatchmentGridArea(options.target.catchmentAreabounds); //9월 서비스
					});
					//9월 서비스
					if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
						options.callback.call(undefined, that, res);
					}
					if(options.reject) { options.reject(status);}
				}
				else {
					//messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
				console.log("[catchmentAreaMap.js] sop.openApi.catchmentGrid.api onFail [" + status);
				if(options.reject) { options.reject(status);}
			}
		});
	}());
	/** ********* OpenAPI 생활권역 주행시간,거리기준 격자경계 검색 End ********* */
	/** ********* OpenAPI 생활권역 반경기준 격자경계 검색 Start ********* */
	(function () {
		$class("sop.openApi.catchmentCircleGrid.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				console.log("[catchmentAreaMap.js] sop.openApi.catchmentCircleGrid.api res.errCd [" + res.errCd);
				console.log(res.features.length);
				if(options.target.id === 0) {
					$catchmentAreaDataBoard.ui.girdCnt = res.features.length;					
				} else if(options.target.id === 1) {
					$catchmentAreaDataBoard.ui.girdCnt2 = res.features.length;
				}
				$catchmentAreaDataBoard.ui.settingGridinfo(res.features.length);
				var that = options.target;
				if (res.errCd == "0") {
					options["geojson"] = res;
					that.lastGeojsonInfo = options;
					res["pAdmCd"] = options.adm_cd;
					options.target.setPolygonDataGeojson(res);	// 여기서 실제 격자를 그리게 된다.
					
					var dataGeojson = that.dataGeojson;
					if(dataGeojson != undefined && dataGeojson != null){
						that.gMap.fitBounds(dataGeojson.getBounds());
					}					
					
					//9월 서비스
					if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
						options.callback.call(undefined, that, res);
					}
					if(options.resolve) { 
						options.resolve(options.target);
					}
				}
				else if (res.errCd == "-401") {
					accessTokenInfo(function() {
						that.openApiCatchmentGridArea(options.target.catchmentAreabounds); //9월 서비스
					});
					//9월 서비스
					if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
						options.callback.call(undefined, that, res);
					}
					if(options.reject){options.reject(status);}
				}
				else {
					//messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
				console.log("[catchmentAreaMap.js] sop.openApi.catchmentCircleGrid.api onFail [" + status);
				if(options.reject){options.reject(status);}
			}
		});
	}());
	/** ********* OpenAPI 생활권역 반경기준 격자경계 검색 검색 End ********* */
	
}(window, document));
