/**
 * 맵에 관한 공통 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2014/08/19 초기 작성 author : 권차욱 version : 1.0 see :
 * 
 */

(function (W, D) {
	W.$map05 = W.$map05 || {};
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
				this.isMiniMapDraw = false; 
				this.isTradeMapShow = false;
				this.isZoomSliderControl = false;
				this.isZoomAnimation = true;
				this.render = null;
				this.lastDrawList = [];
				this.mouseOverAdmCd = null;
				this.markers = null;
				this.newMarkers = [];
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
				this.openInitStatData = null;
				this.getThemaMapData = null;
				this.getThemaMapBaseYear = null;
				this.getRegionData = null; //DB에서 경계데이터를 가져옴
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
				this.initData = null;
				this.thema_legend_values = [];
				this.thema_legend_type = null;
				this.thema_stat_data_base_year = null; // 데이터 년도
				this.thema_atdrc_yn = null; // 자치구년도
				this.boundary_fix_yn = null;	//시계열경계년도
				this.isTimeSeries = false;
				this.timeSeriesLayer = [];
				this.timer = null;
				this.add_data_disp_yn = null;
				this.sep_map_data_id = null;
				this.sep_map_left_sep_nm = null;
				this.sep_map_left_sep_ttip_title = null;
				this.sep_map_left_sep_unit = null;
				this.sep_map_right_sep_ttip_title = null;
				this.tmpSidoData = {};
				this.reqType = "1";
				this.pieChartMarkers = null;
				this.makeMonth = null;
				//코로나추가 20200722 주용민
				this.covidDay = null;
				this.tmpAdmCd = "00";
				//코로나추가 20200722 주용민
				// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
				this.topBottomState = "OFF";
				this.topBottomLayers = [];
				if(window.parent.$thematicMapMain.param.stat_thema_map_id == "wPsSdFX8Wt20210520161423833UZjHClj5U3"){
					this.topBottomType = "top";
				}else{
					this.topBottomType = "both";
				}
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
						var tmpDataArr = [];
						var tmpDataAddr = [];
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
									tmpDataArr.push(parseFloat(tempData.result[j].left_data_val));
									tmpDataAddr.push(tempData.result[j].addr);
								}
							}
							$(".thematicCharts").highcharts({
								chart : {
									animation : false,
									type : 'bar',
								},
								colors : [
								          '#3BBEE3'
								],
								title : { 
//									text : $("#select_base_year>option:selected").val() +"년 10만명당 " + $("#caracc_type a.on").text() + " " +$("#leftValue").text()
																		text : $("#select_base_year>option:selected").val() +"년 " + $("#caracc_type a.on").text() + " " +$("#top_bottom_type a.on").text() + " " + $("#top_bottom_select_count2 >option:selected").val() + "개 " + $("#region_boundary a.on").text()
								},
								xAxis : {
									categories : tmpDataAddr,
									labels : {
										style : {
											fontSize : '10px'
										}
									}
								},
						        yAxis: [{
						            labels: {
						            	formatter: function() {
						                	return Highcharts.numberFormat(this.value, 0);
						                },
										enabled: false
						            },
						            title: {
						                text: '',//left_sep_chart_title,
						            },
						        }],
								tooltip : {
									enabled:true,
									formatter : function(){
										return this.x + " : " + Highcharts.numberFormat(this.y,0)+"(건)";
									}
								},
								plotOptions : {
									column : {
										dataLabels : {
											enabled : true,
											verticalAlign : 'middle',
											allowOverlap : true,
											formatter : function () {
												return appendCommaToNumber(this.y);
											}
										}
									}
								},
								series : [{
									showInLegend : false,
									type : 'column',
									data : tmpDataArr
								}]
							},
							function(chart) {
								var prevTranslateY = 0;
								var margin = chart.series[0].xAxis.translationSlope;
								var totalWidth = chart.series[0].xAxis.width;
								if(chart.series[0].data.length > 5 || (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ){
								$.each(chart.series[0].data, function(i, point) {
									if (point.y < 0) {
										var textWidth = point.dataLabel.width;
										var agent = navigator.userAgent.toLowerCase();
					                 	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
					                 		textWidth -= 10;
					                 	}
										point.dataLabel.translateX = ((totalWidth - point.shapeArgs.y) - point.shapeArgs.height) - textWidth;
					         			if (point.dataLabel.translateX < -1) {
					         				point.dataLabel.translateX = -1;
					         			}
									}
									if (i == 0) {
										point.dataLabel.translateY = -point.dataLabel.padding;
										if(chart.series[0].data.length == 10){
											point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY + 7);
										}else if (chart.series[0].data.length == 5){
											point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY + 22);
										}else if (chart.series[0].data.length == 15){
											point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY + 2);
										}else{
						             		point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY);
										}
										prevTranslateY = point.dataLabel.translateY;
									}else {
					                 	prevTranslateY += margin;
					                 	point.dataLabel.translateY = prevTranslateY;
					             		point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY);
									}
							    });
								}
							});
							// 20210915 김건민
							if(window.parent.$thematicMapMain.param.stat_thema_map_id != "wPsSdFX8Wt20210520161423833UZjHClj5U3"){
								$("#graph_help_text").show();
								$(".thematicCharts").hide();
							}else{
								$("#graph_help_text").hide();
								$(".thematicCharts").show();
							}
							// 20210915 김건민
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
									tmpDataArr.push(parseFloat(tempData.result[j].left_data_val));
									tmpDataAddr.push(tempData.result[j].addr);
								}
							}
							$(".thematicCharts").highcharts({
								chart : {
									animation : false,
									type : 'bar',
								},
								colors : [
								          '#3BBEE3'
								],
								title : { 
									text : $("#top_bottom_type a.on").text() + " " + $("#top_bottom_select_count2 >option:selected").val() + " 개 선택보기"
								},
								xAxis : {
									categories : tmpDataAddr,
									labels : {
										style : {
											fontSize : '10px'
										}
									}
								},
						        yAxis: [{
						            labels: {
						            	formatter: function() {
						                	return Highcharts.numberFormat(this.value, 0);
						                },
										enabled: false
						            },
						            title: {
						                text: '',//left_sep_chart_title,
						            },
						        }],
								tooltip : {
									enabled:true,
									formatter : function(){
										return this.x + " : " + Highcharts.numberFormat(this.y,0)+"(건)";
									}
								},
								plotOptions : {
									column : {
										dataLabels : {
											enabled : true,
											verticalAlign : 'middle',
											allowOverlap : true,
											formatter : function () {
												return appendCommaToNumber(this.y);
											}
										}
									}
								},
								series : [{
									showInLegend : false,
									type : 'column',
									data : tmpDataArr
								}]
							},
							function(chart) {
								var prevTranslateY = 0;
								var margin = chart.series[0].xAxis.translationSlope;
								var totalWidth = chart.series[0].xAxis.width;
								if(chart.series[0].data.length > 5 || (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ){
								$.each(chart.series[0].data, function(i, point) {
									if (point.y < 0) {
										var textWidth = point.dataLabel.width;
										var agent = navigator.userAgent.toLowerCase();
					                 	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
					                 		textWidth -= 10;
					                 	}
										point.dataLabel.translateX = ((totalWidth - point.shapeArgs.y) - point.shapeArgs.height) - textWidth;
					         			if (point.dataLabel.translateX < -1) {
					         				point.dataLabel.translateX = -1;
					         			}
									}
									if (i == 0) {
										point.dataLabel.translateY = -point.dataLabel.padding;
										if(chart.series[0].data.length == 10){
											point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY + 7);
										}else if (chart.series[0].data.length == 5){
											point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY + 22);
										}else if (chart.series[0].data.length == 15){
											point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY + 2);
										}else{
						             		point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY);
										}
										prevTranslateY = point.dataLabel.translateY;
									}else {
					                 	prevTranslateY += margin;
					                 	point.dataLabel.translateY = prevTranslateY;
					             		point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY);
									}
							    });
								}/*
								$.each(chart.series[0].data, function(i, point) {
									if (point.y < 0) {
										var textWidth = point.dataLabel.width;
										var agent = navigator.userAgent.toLowerCase();
					                 	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
					                 		textWidth -= 10;
					                 	}
										point.dataLabel.translateX = ((totalWidth - point.shapeArgs.y) - point.shapeArgs.height) - textWidth;
					         			if (point.dataLabel.translateX < -1) {
					         				point.dataLabel.translateX = -1;
					         			}
									}
									if (i == 0) {
										point.dataLabel.translateY = -point.dataLabel.padding;
										point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY);
										prevTranslateY = point.dataLabel.translateY;
									}else {
					                 	prevTranslateY += margin;
					                 	point.dataLabel.translateY = prevTranslateY;
					             		point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY);
									}
					         			
							    });
								*/
							});
							// 20210915 김건민
							if(window.parent.$thematicMapMain.param.stat_thema_map_id != "wPsSdFX8Wt20210520161423833UZjHClj5U3"){
								$("#graph_help_text").show();
								$(".thematicCharts").hide();
							}else{
								$("#graph_help_text").hide();
								$(".thematicCharts").show();
							}
							// 20210915 김건민
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
						// 20210915 김건민
						if(window.parent.$thematicMapMain.param.stat_thema_map_id != "wPsSdFX8Wt20210520161423833UZjHClj5U3"){
							$("#graph_help_text").show();
							$(".thematicCharts").hide();
						}else{
							$("#graph_help_text").hide();
							$(".thematicCharts").show();
						}
						// 20210915 김건민
						if($(".interactiveDataBoard").hasClass("on")){
							$(".interactiveDataBoard").trigger("click");
						}
						this.data.push(this.dataForCombine);
						tempGeoData = this.dataGeojsonLayer;
						this.topBottomData = [];
						if(window.parent.$thematicMapMain.param.stat_thema_map_id == "wPsSdFX8Wt20210520161423833UZjHClj5U3"){
							this.topBottomType = "top";
						}else{
							this.topBottomType = "both";
						}
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
					$thematicMapFrame05.ui.dataGeoJson = [];
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
						// mng_s 20211209 김건민
						//maxZoom = 12;
						if(this.poi_disp_yn) {
							maxZoom = 9;
						}else{
							maxZoom = 8;
						}
						// mng_e 20211209 김건민
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
//					if(this.miniMap.geojson) {
//					this.miniMap.geojson.remove();
//					}
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
							if( !( $("#dataMode").val() == "pieChart") )
							that.setLayerColor(feature, layer);	
							layer.on({
								mouseover : function (e) {
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
									//코로나추가 20200728 jrj 
									if( e && e.originalEvent ){
										e.originalEvent.preventDefault();
									}
									
									//코로나추가 20200722 주용민
									$(".covidDbTabs").hide();
									$(".dataSideBox").css("height","500px");
									$(".thematicCharts").css("margin-top","10px");
									//코로나추가 20200722 주용민
									that.clickMode = true;
									var layer = e.target;
									if (!sop.Browser.ie) {
										layer.bringToFront();
									}
									
									//2017.03.30 시도/시군구/읍면동별 전국지도일 경우 그래프 이슈
									$(".thematicCharts").show();
									srvLogWrite('B0','03','07','02',$(".helperText span").text(),'');
									
									//차트를 만든다
									that.thema_map_data_id = that.initData.thema_map_data_id;
									//코로나추가 20200722 주용민
									that.tmpAdmCd = feature.properties.adm_cd;
									//코로나추가 20200722 주용민
									that.getThemaMapDataboardData(feature.properties.adm_cd);
									if(window.parent.$thematicMapMain.param.stat_thema_map_id == "QNj43PFUT220190612100733746ocaFOXLaj3" || window.parent.$thematicMapMain.param.stat_thema_map_id == "MmLSKu8PgQ20201022173339083sOVy6YCGQj"){
										if(!($("#pieChart").hasClass("on"))){
											thematicCharts(feature.properties.adm_cd);
										}
									}else{
										thematicCharts(feature.properties.adm_cd);
									}

									if (that.delegate && 
											that.delegate.callbackFunc && 
											that.delegate.callbackFunc.didSelectedPolygon) {
										that.delegate.callbackFunc.didSelectedPolygon(e, feature, layer.options.type, that);
									}
									//코로나추가 20200722 주용민
									if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw" || window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE"){
										that.isFirstDraw = true;
										that.selectedAdmCd = feature.properties.adm_cd;
										that.makeCovidChart();
									}
									//코로나추가 20200722 주용민
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
						},
						type : type, // 일반경계인지, 데이터경계인지 구분
						layerCode : that.curPolygonCode,

					});

					if (type == "polygon" || type == "build") {
						this.geojson = geojson;
					}else if (type == "trade") {
						this.tradeGeojson = geojson;
					}else {
						$thematicMapFrame05.ui.dataGeoJson.push(geojson);
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
//								console.log(layer);
								//var center = layer.getCenter();
								//layer.feature.properties["x"] = center.x;
								//layer.feature.properties["y"] = center.y;
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

				this.addControlEvent = function (type, opt) {

					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "41d1dhxBgx20180627145739008kXnl0kFaa8"){
						return;
					} 
					// 지도이동시 발생
					else if (type == "movestart") {
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
							if (/*that.zoom > 1 &&*/ that.zoom <= 3) {
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
								console.log("123123");
								//2019-04-19 박길섭 시작
								// mng_s 20200526 김건민 (다문화가구 현황  poi추가)
								if(that.zoom == 4) {
									if(window.parent.$thematicMapMain.param.stat_thema_map_id == "5FLM8BXNH320200521093949554ioKEsoOUGI" && $("#selectValue2").val()=="auto"){
										if(that.curPolygonCode == 2){
											mapPolygonCode = 100;	
											var mapBounds = that.gMap.getBounds();

											var area = 'RECTANGLE(';
											area += mapBounds._southWest.x + ' ' + mapBounds._southWest.y + ',';
											area += mapBounds._northEast.x + ' ' + mapBounds._northEast.y;
											area += ')';
											
											that.callThemePOIResult(that.curSidoCd, area, '0');
										}else{
											mapPolygonCode = 100;	
										}
										
									}else{
										mapPolygonCode = 100;
									}
									
								}
								else{
									mapPolygonCode = 3;
								}
								// mng_e 20200526 김건민								
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
					} else if(parseInt(year) <= 2017 && window.parent.$thematicMapMain.param.stat_thema_map_id == "41d1dhxBgx20180627145739008kXnl0kFaa8") {
						year = '2016';
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
								// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
								if(that.topBottomState == "ON") {
									that.showTopBottomDataOnly("ON", true);
								}
								// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
						  },
						  dataType: "json",
						  error:function(e){alert("에러")}  
					});
				};
				
				// OpenAPI 행정동경계 검색
				this.openApiBoundaryHadmarea = function (adm_cd, year, low_search , zoomLevel) {// 2019-04-19 박길섭
					console.log("openApiBoundaryHadmarea");
					console.log("openApiBoundaryHadmarea");
					console.log("openApiBoundaryHadmarea");
					console.log("openApiBoundaryHadmarea");
//					console.log("zoomLevel = " + zoomLevel);
					var sopOpenApiHadmareaObj = new sop.openApi.hadmarea.api();
					sopOpenApiHadmareaObj.addParam("accessToken", accessToken);
					sopOpenApiHadmareaObj.addParam("adm_cd", adm_cd);
					sopOpenApiHadmareaObj.addParam("year", year);
					sopOpenApiHadmareaObj.addParam("low_search", low_search);
					sopOpenApiHadmareaObj.addParam("zoom_level", zoomLevel);// 2019-04-19 박길섭
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
							url : "/ServiceAPI/OpenAPI3/boundary/hadmarea.geojson",
							options : {
								target : this,
								adm_cd : adm_cd,
								year : year,
								low_search : low_search ,  //2019-04-19 박길섭
								zoom_level : zoomLevel  //2019-04-19 박길섭
							}
						});
					}else{
					//20년수정반영 끝
						sopOpenApiHadmareaObj.request({
							method : "GET",
							async : true,
							url : openApiPath + "/OpenAPI3/boundary/hadmarea.geojson",
							options : {
								target : this,
								adm_cd : adm_cd,
								year : year,
								low_search : low_search ,  //2019-04-19 박길섭
								zoom_level : zoomLevel  //2019-04-19 박길섭
							}
						});
					}//20년수정반영
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
							center : center,
							autoFlag : false
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
											
											if(x==0 && window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw") {
												$("#covidChartDiv").show(); //20200729 kimjoonha
											}
											if(x==0 && window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE") {
												$("#covidChartDiv").show();
											}
											
											//================== mng_s 20200728코로나19 경우 값이 0인것 N/A 와 같은 색으로
											if((window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw" || window.parent.$thematicMapMain.param.stat_thema_map_id == "MmLSKu8PgQ20201022173339083sOVy6YCGQj" || window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE" )  
													&& feature.info[x][param] == 0){
													    
												layer.setStyle({	
													weight : layer.options.weight,
													color : layer.options.color,
													dashArray : layer.options.dashArray,
													fillOpacity : layer.options.fillOpacity,
													fillColor : "#F0FFF0"
												});
												  
											}
											else
											//================== mng_e 20200728코로나19 경우 값이 0인것 N/A 와 같은 색으로


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
						}
						else{
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
					if (this.multiLayerControl.dataGeojson != null) {
						for(var i=0; i<this.multiLayerControl.dataGeojson.length; i++) {
							var dataGeojson = this.multiLayerControl.dataGeojson[i];
							dataGeojson.eachLayer(function (layer) {
								layer.removeCaption();
								layer.captionObj = null;
							});
						}
					}

					if (this.dataGeojson != undefined && this.dataGeojson != null ) {
						this.dataGeojson.eachLayer(function (layer) {
							layer.removeCaption();
							layer.captionObj = null;
						});
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

				this.setPolygonDataGeojson = function (geoData, type, index, options, callback) {
					if($("#dataMode").val() == "pieChart")
						this.dataType == "pieChart";
					$thematicMapFrame05.Popup.close();
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
							if( !($("#dataMode").val() == "pieChart" ) )
							geoData = this.combineStatsData(geoData);
							
							//시계열인 경우
							if (this.isTimeSeries) {
								if (options != undefined) {
									if (options.idx != 0) {
										that.legend.valPerSlice = this.timeSeriesLayer[0].valPerSlice;
									}
								}
							}
						}

						//시계열때문에 드랍된 현재위치정보를 저장한다.
						this.setDroppedInfo();
					}

					if (geoData && geoData.combine && this.data.length > 0) {
						// 지역경계가 auto면 dataGeojson을 지우고,
						// 시도,시군구,읍면동일 경우 경계와 데이터를 지우지 않는다.
						if($("#selectValue2").val()=="auto" || that.i == 1){
							if (this.dataGeojson) {
								this.dataGeojson.remove();
								this.removeCaption();
								this.dataGeojson = null;
							}
						}			

						var dataGeojson = null;
						if (!this.isTimeSeries) {
							if(window.parent.$thematicMapMain.param.stat_thema_map_id == "QNj43PFUT220190612100733746ocaFOXLaj3" || window.parent.$thematicMapMain.param.stat_thema_map_id == "MmLSKu8PgQ20201022173339083sOVy6YCGQj"){
								if($("#pieChart").hasClass("on")){
									dataGeojson = this.addPolygonGeoJson(geoData, "polygon");
								}else{
									dataGeojson =  this.addPolygonGeoJson(geoData, "data");	
								}
							}else{
								dataGeojson =  this.addPolygonGeoJson(geoData, "data");	
							}
						}
							
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
						
						//시계열인 경우
						if (this.isTimeSeries) {
							if (options != undefined) {
								geoData["year"] = options.year;
								geoData["valPerSlice"] = that.legend.valPerSlice;
								this.timeSeriesLayer.push(geoData);
								//if (options.idx == options.totalCnt-1) {
									if (callback != undefined && callback instanceof Function) {
										callback.call(this, this.timeSeriesLayer, options);
									}
								//}
							}
						}
						
						if(index == undefined) {
							this.checkShowCaption();
						} else if(index >= 10) {
							if($('#dataMode2').val() != 'dataOff') {
								that.legend.numberData = true;
							}
							this.checkShowCaption();
						}

						if ($("#selectValue2").val()!="auto" && this.legend.selectType =="bubble"){
							$thematicMapFrame05.ui.mapList[0].multiLayerControl.dataGeojson = $thematicMapFrame05.ui.dataGeoJson;							
						}
						if($("#dataMode").val() == "pieChart"){
							if(window.parent.$thematicMapMain.param.stat_thema_map_id == "QNj43PFUT220190612100733746ocaFOXLaj3"){
								that.changePieChart();
							}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "MmLSKu8PgQ20201022173339083sOVy6YCGQj"){
								that.infectionPieChart();
							}	
						//버블추가
//						this.legend.changeDataMode(this.legend.selectType);
						}else{
							that.legend.changeDataMode(that.legend.selectType);
						} 
						$thematicMapFrame05.Popup.close();
					}
					else {
						this.addPolygonGeoJson(geoData, "polygon");

						if($("#dataMode").val() == "pieChart"){
							if(window.parent.$thematicMapMain.param.stat_thema_map_id == "QNj43PFUT220190612100733746ocaFOXLaj3"){
								that.changePieChart();
							}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "MmLSKu8PgQ20201022173339083sOVy6YCGQj"){
								that.infectionPieChart();
							}
						}else{
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
					
					//지진
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "41d1dhxBgx20180627145739008kXnl0kFaa8"){
						srvLogWrite('B0','09','01','00',window.parent.$thematicMapMain.themaInfo.title,'');
						srvLogWrite('B0','09','02','00',window.parent.$thematicMapMain.themaInfo.title,'');
						$("#legendColor_"+ that.legend.id +"> li:eq(2) > a").click();
						this.getEarthquake();
						that.gMap.setMaxZoom(5);
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
					//2017.03.17 시계열 범례고정 수정
					if (!$("#eupmyundong").hasClass("on") && !this.isTimeSeries) {
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
				
				this.getEarthquake = function(){
					$.ajax({
						type: "GET",
						url: contextPath + "/ServiceAPI/thematicMap/getEarthquake.json",
						async : false,
						data : {
							base_year : $("#select_base_year >option:selected").text()
						},
						success: function(res) {
							
							for(var i=0; i<that.newMarkers.length; i++){
								that.gMap.removeLayer(that.newMarkers[i]);
							}
							that.newMarkers = [];
							
							for (var i = 0; i < res.result.length; i++) {
								var _markerIcon = sop.icon({
									iconUrl : '/img/marker/redCirlce.png',
									iconSize : [ 10, 10 ],
									zindex : 5
								});
	
								var _marker = sop.marker([ res.result[i].x_coord, res.result[i].y_coord ], { icon : _markerIcon, zIndexOffset : 999});
								
//								_marker.bindInfoWindow(res.result[i].x_coord + ", " + res.result[i].y_coord);
								
								that.newMarkers.push(_marker);
								_marker.addTo(that.gMap);
								
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

				/** ********* OpenAPI 상권조회. End ********* */
				
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
					// mng_s 20200526 김건민 	
					} else if(this.gMap.getZoom() == 4){
						var area = 'RECTANGLE(';
						area += mapBounds._southWest.x + ' ' + mapBounds._southWest.y + ',';
						area += mapBounds._northEast.x + ' ' + mapBounds._northEast.y;
						area += ')';
						
						that.markers.clearLayers();
						that.callThemePOIResult(_adm_cd, area, '0'); 
					
					} else if(this.gMap.getZoom() == 5){
						var area = 'RECTANGLE(';
						area += mapBounds._southWest.x + ' ' + mapBounds._southWest.y + ',';
						area += mapBounds._northEast.x + ' ' + mapBounds._northEast.y;
						area += ')';
						
						that.markers.clearLayers();
						that.callThemePOIResult(_adm_cd, area, '0');
					// mng_e 20200526 김건민 
					} else if (that.gMap.getZoom() > 8) {
						// mng_s 20211215 김건민
						if(that.mapMode == 'settlite'){
							var area = 'RECTANGLE(';
							area += mapBounds._southWest.x + ' ' + mapBounds._southWest.y + ',';
							area += mapBounds._northEast.x + ' ' + mapBounds._northEast.y;
							area += ')';
							that.markers.clearLayers();
							that.callThemePOIResult(_adm_cd, area, pagenum);
						}else{
							var area = 'RECTANGLE(';
							area += mapBounds._southWest.x + ' ' + mapBounds._southWest.y + ',';
							area += mapBounds._northEast.x + ' ' + mapBounds._northEast.y;
							area += ')';
							
							that.callThemePOIResult(_adm_cd, area, pagenum);
						}
						// mng_e 20121215 김건민
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
					sopCompanySearchObj.addParam("year", that.thema_stat_data_base_year);
					sopCompanySearchObj.addParam("area", area);
					sopCompanySearchObj.addParam("resultcount", '500');
					sopCompanySearchObj.addParam("pagenum", pagenum);
					sopCompanySearchObj.addParam("adm_cd", adm_cd);

					// mng_s 2020. 11. 26 j.h.Seok POI 호출 시 사업체 최신년도 코드 확인 로직 추가
					var data_year = that.thema_stat_data_base_year
					if(companyDataYear < data_year) {
						data_year = companyDataYear;
					}
					sopCompanySearchObj.addParam("year", data_year);
					// mng_e 2020. 11. 26 j.h.Seok POI 호출 시 사업체 최신년도 코드 확인 로직 추가
					
					// mng_s 20200526 김건민  (다문화가구 현황  poi 추가)
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "5FLM8BXNH320200521093949554ioKEsoOUGI" && $("#selectValue2").val()=="auto"){
						if(that.theme_cd != "") {
							sopCompanySearchObj.addParam("theme_cd", that.theme_cd);
						}
						
						if(that.corp_class_cd != undefined) {
							sopCompanySearchObj.addParam("corp_class_cd", "99997");
						}

						var param = {
								"bnd_year"    : that.bnd_year,

								// mng_s 2020. 11. 26 j.h.Seok POI 호출 시 사업체 최신년도 코드 확인 로직 추가
								//"year" 	  : that.thema_stat_data_base_year,
								"year" 	      : data_year,
								// mng_e 2020. 11. 26 j.h.Seok POI 호출 시 사업체 최신년도 코드 확인 로직 추가
								
								"area"		  : area,
								"theme_cd"	  : that.theme_cd,
								"corp_class_cd"	  : 99997,
								"resultcount" : 500,
								"pagenum"     : pagenum,
								"adm_cd"	  : adm_cd
						};
					// mng_e 20200526 김건민 	
					}else{
						if(that.theme_cd != undefined) {
							sopCompanySearchObj.addParam("theme_cd", that.theme_cd);
						}
						
						if(that.corp_class_cd != undefined) {
							sopCompanySearchObj.addParam("corp_class_cd", that.corp_class_cd);
						}

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
					}
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
//								$(".helperText span").text(res.result.getThemaStatsInfo[0].title);
								//$(".h3.helperText a").attr("title",res.result.getThemaStatsInfo[0].exp);
								var expText = res.result.getThemaStatsInfo[0].exp;
								$(".h3.helperText").prepend("<span>" + res.result.getThemaStatsInfo[0].title + "</span>");
								$(".h3.helperText a").prop("title", expText.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">"));

								//leftside menu - left
								//
								if (result.left_sep_nm !=null && result.left_sep_unit !=null && result.left_sep_nm.length > 0 && result.left_sep_unit.length > 0){
									var leftHtml= '<a href="javascript:srvLogWrite(\'B0\',\'03\',\'02\',\'01\',\''+result.title+'\',\'\');$thematicMapFrame05.Popup.show();$thematicMapFrame05.ui.changeLeftRightValue(1)" class="first last" id="leftValue">'+ result.left_sep_nm+'('+result.left_sep_unit+')</a>'
									$('#stat_sel').append(leftHtml);
									//초기화
									$("#leftValue").addClass("on");
									$("#selectValue").val("leftValue");
								}
								//leftside menu - right
								if (result.right_sep_nm !=null && result.right_sep_unit!=null && result.right_sep_nm.length > 0 && result.right_sep_unit.length > 0){
									var rightHtml= '<a href="javascript:srvLogWrite(\'B0\',\'03\',\'02\',\'02\',\''+result.title+'\',\'\');$thematicMapFrame05.Popup.show();$thematicMapFrame05.ui.changeLeftRightValue(2)" class="last" id="rightValue">'+ result.right_sep_nm+'('+result.right_sep_unit+')</a>'
									$('#stat_sel').append(rightHtml);
									$('#leftValue').removeClass('last');
								}
								
								//시계열이고, 수/율 주제도일 때, 추가데이터 유무에 따라 증감률 추가
								if (result.add_data_disp_yn != null && result.add_data_disp_yn == "Y") {
									if ($("#rightValue").hasClass("last")) {
										$("#rightValue").removeClass("last");
									}
									var rightHtml= '<a href="javascript:$thematicMapFrame05.Popup.show();$thematicMapFrame05.ui.changeLeftRightValue(3)" class="last" id="etcValue">'+ result.sep_map_left_sep_nm+'('+result.sep_map_left_sep_unit+')</a>'
									$('#stat_sel').append(rightHtml);			
								}

								that.add_data_disp_yn = result.add_data_disp_yn;
								that.thema_map_data_id = result.thema_map_data_id;
								//증감률 데이터
								that.left_sep_unit = result.left_sep_unit;
								that.left_sep_nm = result.left_sep_nm;
								that.left_sep_source = result.left_sep_source;
								that.left_sep_ttip_title = result.left_sep_ttip_title;
								that.left_sep_chart_title = result.left_sep_chart_title;	
								that.left_base_year = result.left_base_year;	
								that.max_expnsn_level = result.max_expnsn_level;
								that.bnd_year = result.left_base_year;

								//CAGR 데이터
								that.right_sep_unit = result.right_sep_unit;
								that.right_sep_nm = result.right_sep_nm;
								that.right_sep_source = result.right_sep_source;
								that.right_sep_ttip_title = result.right_sep_ttip_title;
								that.right_sep_chart_title = result.right_sep_chart_title;							  
								that.min_redctn_level = result.min_redctn_level;
								that.thema_atdrc_yn = result.atdrc_yn;
								that.boundary_fix_yn = result.boundary_fix_yn;
								
								//추가데이터
								that.sep_map_data_id = result.sep_map_data_id;
								that.sep_map_left_sep_nm = result.sep_map_left_sep_nm;
								that.sep_map_left_sep_ttip_title = result.sep_map_left_sep_ttip_title;
								that.sep_map_left_sep_unit = result.sep_map_left_sep_unit;
								that.sep_map_right_sep_ttip_title = result.sep_map_right_sep_ttip_title;

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
								
								//경계년도 조회
								that.getThemaMapBaseYear(that.thema_map_data_id);

								// DB 에서 가져온 max_expnsn_level 의 값에 따른 분기 저리 필요
								// 01 : 시도 => 3
								// 02 : 시군구 => 5
								// 03 : 읍면동 => 8
								// 04 : 집계구 => 별도 줌 레벨 설정 필요 없음
								if(that.max_expnsn_level=="01"){
									  that.gMap.setMaxZoom(3);
									  if(window.parent.$thematicMapMain.param.stat_thema_map_id != "QNj43PFUT220190612100733746ocaFOXLaj3" && window.parent.$thematicMapMain.param.stat_thema_map_id != "onb6f4rRh320190902160751679iQUr3aVwTT" && window.parent.$thematicMapMain.param.stat_thema_map_id != "MmLSKu8PgQ20201022173339083sOVy6YCGQj" && window.parent.$thematicMapMain.param.stat_thema_map_id != "RZ3pr7Maou20201106160851389D0RGtYCGpW"){
										  $("#sido").attr('class', 'last');
									  }else{
										  $("#sido").hide();
									  }
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
								
								//카드 사용금액
								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "onb6f4rRh320190902160751679iQUr3aVwTT"){
									$(".sqListBox.sq03 .sqList ul li a.first:eq(0)").css("width","80px");
									$(".sqListBox.sq03 .sqList ul li a.first:eq(0)").text("원(총액,조)");
									$(".sqListBox.sq03 .sqList ul li a.last:eq(0)").css("width","100px");
									$(".sqListBox.sq03 .sqList ul li a.last:eq(0)").text("원(1인당,백만원)");
									that.left_sep_unit = "총액,조";
									that.right_sep_unit = "1인당,백만원";
									$("#base_year>span").html("월별선택");
									$("#autoRegion").attr("class","first last on");
								}
								
								//소방청 생활안전사고 출동건수
								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "QNj43PFUT220190612100733746ocaFOXLaj3"){
//									$(".sqListBox.sq03 .sqList ul li a.last:eq(0)").css("width","100px");
//									$(".sqListBox.sq03 .sqList ul li a.last:eq(0)").text("수(십만명당,건)");
									$("#rightValue").css("width","100px");
									$("#rightValue").text("수(십만명당,건)");
									that.right_sep_unit = "십만명당,건";
									$('#map_type a:eq(1)').attr('class','');
									$('#map_type').append('<a href="javascript:$thematicMapFrame05.ui.changeDataMode()" class="last" id="pieChart">파이차트</a>');
									
								    $("#map_type").eq(0).find("a").removeClass("on");
								    $("#map_type a").eq(2).addClass("on");
								    $("#dataMode").val("pieChart");
								    $("#pieChartFlag").val("on");
								    
									$("#autoRegion").attr("class","first last on");
//									$("#sido").hide();
									$("#dataBoard").hide();
									$(".sop-right").stop().animate({"right":"0px"},200);
								}
								
								//감염병 발생 현황
								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "MmLSKu8PgQ20201022173339083sOVy6YCGQj"){
									$('#map_type a:eq(1)').attr('class','');
									$('#map_type').append('<a href="javascript:$thematicMapFrame05.ui.changeDataMode()" class="last" id="pieChart">파이차트</a>');
									
									$("#map_type").eq(0).find("a").removeClass("on");
									$("#map_type a").eq(2).addClass("on");
									$("#dataMode").val("pieChart");
									$("#pieChartFlag").val("on");
									
									$("#autoRegion").attr("class","first last on");
								}
								
								//기온/강수 현황
								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "RZ3pr7Maou20201106160851389D0RGtYCGpW"){

									$("#autoRegion").attr("class","first last on");
								}
								
								that.thema_legend_type = res.result.getThemaStatsInfo[0].exmpl_type;
								if(that.thema_legend_type == '3') {
									that.getLegendValues($thematicMapFrame05.params);
								} else {
									$('#themaInit_'+that.legend.id).trigger("click");
								}

								//출처
								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "MmLSKu8PgQ20201022173339083sOVy6YCGQj"){
									$(".thematicBotText").append(that.left_sep_source).css("margin-top","-5px");
//									$(".thematicBotText").after("<p style='font-size:11px;width:420px;text-align:center;'>상세통계표 보기<button style='width:100px;height:20px;background-color:#ccc;border:1px solid black;font-size:10px;margin-left:10px;' onclick='window.open(\"https://kosis.kr/statHtml/statHtml.do?orgId=177&tblId=DT_117N_A00402&vw_cd=MT_ZTITLE&list_id=F_24&seqNo=&lang_mode=ko&language=kor&obj_var_id=&itm_id=&conn_path=MT_ZTITLE\")'>국가통계포털(KOSIS)</button></p>")
									$(".thematicBotText").after("<p style='font-size:12px;width:420px;text-align:center;'>상세통계표 보기 : <a style='font-size:12px;text-decoration:underline;color:blue;' href='https://kosis.kr/statHtml/statHtml.do?orgId=177&tblId=DT_117N_A00402&vw_cd=MT_ZTITLE&list_id=F_24&seqNo=&lang_mode=ko&language=kor&obj_var_id=&itm_id=&conn_path=MT_ZTITLE' target='_blank'>국가통계포털(KOSIS)</a></p>");
								}else	if(window.parent.$thematicMapMain.param.stat_thema_map_id == "8mjCr1kWql20201123140825772vKMjQsNcRw"){
									$(".thematicBotText").append(that.left_sep_source).css("margin-top","-5px");
									$(".thematicBotText").after("<p style='font-size:12px;width:420px;text-align:center;'>상세통계표 보기 : <a style='font-size:12px;text-decoration:underline;color:blue;' href='https://kosis.kr/statHtml/statHtml.do?orgId=110&tblId=DT_110031_010&vw_cd=MT_ZTITLE&list_id=M2_21&seqNo=&lang_mode=ko&language=kor&obj_var_id=&itm_id=&conn_path=MT_ZTITLE' target='_blank'>국가통계포털(KOSIS)</a></p>");
								}else{
									$(".thematicBotText").append(that.left_sep_source);
								}
								
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
					  // mng_s 20211215 김건민
					  if(that.mapMode == "settlite"){
						that.gMap.setMaxZoom(11);
					  }else{
						that.gMap.setMaxZoom(5);
					  }
					  // mng_e 20211215 김건민
				  }else if(that.max_expnsn_level=="03"){
					  if(that.poi_disp_yn) {
						  // mng_s 20211215 김건민 위성지도 일떄 읍면동까지 내려가게 수정함.
						  if(that.mapMode == "settlite"){
						     that.gMap.setMaxZoom(15);	
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
					var type = "1";
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "onb6f4rRh320190902160751679iQUr3aVwTT"){
						type = "3";
					}
					//코로나추가 20200722 주용민
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw"){
						type = "5";
					}
					//코로나추가 20200722 주용민
					//암발생현황
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "uHaX8JJqyh20201014110114231lgMgsJnINP"){
						type = "7";
					}
					//암발생현황
					//감염병발생현황
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "MmLSKu8PgQ20201022173339083sOVy6YCGQj"){
						type = "8";
					}
					//감염병발생현황
					//기온/강수현황
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "RZ3pr7Maou20201106160851389D0RGtYCGpW"){
						type = "9";
					}
					//기온/강수현황
					//보행자 차량사고 발생현황
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "wPsSdFX8Wt20210520161423833UZjHClj5U3"){
//						if($("#sigungu").hasClass("on")){
//							type = "12";
//						}else{
							type = "10";
//						}
					}
					//보행자 차량사고 발생현황
					//코로나 예방접종 현황
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE"){
						type = "11";
					}
					//코로나 예방접종 현황
					$.ajax({
						type: "GET",
						url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapBaseYear.json",
						async : false,
						data : {
							type : type,
							thema_map_data_id : thema_map_data_id
						},
						success: function(res) {
							if (res.errCd == "0") {
								var list = new Array(); 
								//코로나추가 20200722 주용민
//								var list_month = new Array(); 
								//코로나추가 20200722 주용민
								for(var i=0;i<res.result.detailInfo.length;i++){
									//djlee 2019-04-24 수정
										//코로나추가 20200722 주용민
										if(res.result.detailInfo[i].base_year != '9016'){
											list.push(res.result.detailInfo[i].base_year);
										}
//										if(res.result.detailInfo[i].base_month != null){
//											list_month.push(res.result.detailInfo[i].base_month);											
//										}
										//코로나추가 20200722 주용민
								}

								that.base_year_list = list;
								// mng_s 20190503 김건민
								that.thema_stat_data_base_year = list[list.length-1];
								// mng_e 20190503 김건민
								//base_year초기값이 없으면 list[0]의 값을 넣는다.
//								if(that.base_year == ""){
//								that.base_year = list[0];
//								}
								// 주제도 설정 - 년도선택 리스트 태그를 붙인다.
								var output = "";
								//코로나추가 20200722 주용민
								if(window.parent.$thematicMapMain.param.stat_thema_map_id != "QNj43PFUT220190612100733746ocaFOXLaj3" && window.parent.$thematicMapMain.param.stat_thema_map_id != "onb6f4rRh320190902160751679iQUr3aVwTT" && window.parent.$thematicMapMain.param.stat_thema_map_id != "sAXkcVzk5V202007141335257355ued9032uw" && window.parent.$thematicMapMain.param.stat_thema_map_id != "kmOpHLH5cK202106100936161097g5G9nLCFE"){
								//코로나추가 20200722 주용민
									output = '<span>년도선택</span>';
									output += '<select id="select_base_year" onchange="javascript:srvLogWrite(\'B0\',\'03\',\'03\',\'00\',$(\'.helperText span\').text(),$(\'#select_base_year option:selected\').val()+\'년\');$thematicMapFrame05.Popup.show();$thematicMapFrame05.ui.mapList[0].changeRegionBound()">';
	
									for(var i=0;i<list.length-1;i++){
										output += '<option>';
										output += list[i];
										output += '</option>';
									}
									output += '<option selected="true">'+list[list.length-1]+'</option>'
									$("#base_year").html(output);
								}

								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "uHaX8JJqyh20201014110114231lgMgsJnINP"){
//									var cancer_type_lv = $("#cancer_list a.on").attr("id");
//									that.getThemaMapData("cancer_data","00",cancer_type_lv.substr(-1,1));
									that.getThemaMapData("cancer_data","00");
								}
								
								//코로나추가 20200722 주용민
								var covidHtml = "";
								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw" || window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE"){
									covidHtml = '<span>일별선택</span>';
									
									covidHtml += '<select id="select_base_year" onchange="javascript:$thematicMapFrame05.ui.mapList[0].covidMonth();$thematicMapFrame05.ui.mapList[0].changeRegionBound(true);">';
									
									for(var i=0;i<list.length-1;i++){
										covidHtml += '<option value='+list[i]+'>';
										covidHtml += list[i] + "년";
										covidHtml += '</option>';
									}
									covidHtml += '<option selected="true" value='+list[list.length-1]+'>'+list[list.length-1]+"년"+'</option>';
									$("#base_year").html(output);
									$("#base_year").append(covidHtml);
									
									that.covidMonth();
								}
								//코로나추가 20200722 주용민
								//카드 사용금액
								var output4 = "";
								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "onb6f4rRh320190902160751679iQUr3aVwTT"){
									output4 = '<span>월별선택</span>';
//									output4 += '<select id="select_base_year" onchange="javascript:$thematicMapFrame05.ui.mapList[0].changeRegionBound()">';
									output4 += '<select id="select_base_year" onchange="javascript:$thematicMapFrame05.ui.mapList[0].makeMonth();$thematicMapFrame05.ui.mapList[0].changeRegionBound();">';
									
									for(var i=0;i<list.length-1;i++){
										output4 += '<option value='+list[i]+'>';
										output4 += "20"+list[i]+"년";
										output4 += '</option>';
									}
									output4 += '<option selected="true" value='+list[list.length-1]+'>'+"20"+list[list.length-1]+"년"+'</option>';
									output4 += '</select>';
									$("#base_year").append(output4);
									that.makeMonth();
								}
								
//								var output4 = "";
//								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "onb6f4rRh320190902160751679iQUr3aVwTT"){
//									output4 = '<span>월별선택</span>';
//									output4 += '<select id="select_base_year" onchange="javascript:srvLogWrite(\'B0\',\'03\',\'03\',\'00\',$(\'.helperText span\').text(),$(\'#select_base_year option:selected\').val()+\'년\');$thematicMapFrame05.Popup.show();$thematicMapFrame05.ui.mapList[0].changeRegionBound()">';
//									
//									for(var i=0;i<list.length-1;i++){
//										output4 += '<option value='+list[i]+'>';
//										output4 += "20"+list[i].substr(0,2)+"년 "+list[i].substr(2,2)+"월";
//										output4 += '</option>';
//									}
//									output4 += '<option selected="true" value='+list[list.length-1]+'>'+"20"+list[list.length-1].substr(0,2)+"년 "+list[list.length-1].substr(2,2)+"월"+'</option>'
//									$("#base_year").html(output4);
//								}
								
								//소방청 생활안전사고 출동건수
								var output2="",output3="";
								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "QNj43PFUT220190612100733746ocaFOXLaj3"){
									output += '<span>기간선택</span>';
									output += '<a onclick="$thematicMapFrame05.ui.mapList[0].periodClick(\'select_base_year\')" class="first select_base_year" style="cursor:pointer;">년도</a>';
									output += '<a onclick="$thematicMapFrame05.ui.mapList[0].periodClick(\'select_quarter\')" class="select_quarter" style="cursor:pointer;">분기</a>';
									output += '<a onclick="$thematicMapFrame05.ui.mapList[0].periodClick(\'select_monthly\')" class="last select_monthly" style="cursor:pointer;">월</a>	';
									output += '<br/><select id="select_base_year" style="margin-left:66px;" onchange="javascript:srvLogWrite(\'B0\',\'03\',\'03\',\'00\',$(\'.helperText span\').text(),$(\'#select_base_year\').val()+\'년\');javascript:$(\'#select_quarter option:last\').prop(\'selected\',true);javascript:$(\'#select_monthly option:last\').prop(\'selected\',true);$thematicMapFrame05.Popup.show();$thematicMapFrame05.ui.mapList[0].changeRegionBound()">';
	
									for(var i=0;i<list.length-1;i++){
										output += '<option>';
										output += list[i];
										output += '</option>';
									}
									output += '<option selected="true">'+list[list.length-1]+'</option>';
									output += '</select>';
									$("#base_year").html(output);
									$("#base_year").css("height","80px");
									$(".select_base_year").addClass("on");
									
									// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
//									$(".sqListBox.sq03 .sqList").css("height","280px");
									// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
									
									$.ajax({
										type: "GET",
										url: contextPath + "/ServiceAPI/thematicMap/getThemaMapSafeAccident.json",
										async : false,
										data : {
											base_year : list[list.length-1],
											period_div : 1
										},
										success: function(res) {
											if (res.errCd == "0") {
												var result = res.result;
												output2 += '<select id="select_quarter" style="margin-left:5px;display:none;" onchange="$thematicMapFrame05.ui.mapList[0].changeRegionBound();">';
//												output2 += '<option value="0">분기</option>';
												for(var i=0;i<result.detailInfo.length-1;i++){
													output2 += '<option>';
													output2 += result.detailInfo[i].period_value;
													output2 += '</option>';
												}
												output2 += '<option selected="true">'+result.detailInfo[result.detailInfo.length-1].period_value+'</option>'
												output2 += '</select>';
												$("#base_year").append(output2);
											}
										}
									})
									$.ajax({
										type: "GET",
										url: contextPath + "/ServiceAPI/thematicMap/getThemaMapSafeAccident.json",
										async : false,
										data : {
											base_year : list[list.length-1],
											period_div : 2
										},
										success: function(res) {
											if (res.errCd == "0") {
												var result = res.result;
												output3 += '&nbsp;<select id="select_monthly" style="margin-left:5px;display:none;" onchange="$thematicMapFrame05.ui.mapList[0].changeRegionBound();">';
//												output3 += '<option value="0">월</option>';
												for(var i=0;i<result.detailInfo.length-1;i++){
													output3 += '<option>';
													output3 += result.detailInfo[i].period_value;
													output3 += '</option>';
												}
												output3 += '<option selected="true">'+result.detailInfo[result.detailInfo.length-1].period_value+'</option>'
												output3 += '</select>';
												$("#base_year").append(output3);
											}
										}
									})
								}
								//200423수정 시작
								//20년수정반영 시작
								//시계열 연도...
								/*
								var html = "";
								for(var i=0;i<list.length;i++){
									html += "<li id='li_y"+list[i]+"'>";
									html += "<input type='checkbox' id='y"+list[i]+"' value='"+list[i]+"' class='year_input' checked = 'checked' style='position:static; display: none;'/>";
									html += "	<div id='div_y"+list[i]+"'>"+list[i]+"</div>";
									html += "</li>";
								}
								$("#tableTimeSeries").append(html);
								*/
								//20년수정반영 끝
								//200423수정 끝
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

				this.getThemaMapData = function getThemaMapData(param, adm_cd, options, callback, zoomLevel){// 2019-04-19 박길섭
//					console.log("getThemaMapData zoomLevel = " + zoomLevel);
					//코로나추가 20200722 주용민
					if(adm_cd == null || adm_cd == ""){
						adm_cd = "00";
					}
					if(adm_cd == "00"){
						$("#covidDbTabs_toggle2").removeClass("on");
						$("#covidDbTabs_toggle1").addClass("on");
					}
//					that.tmpAdmCd = adm_cd;
					//코로나추가 20200722 주용민
					var thema_map_data_id = param;
					var area_type = $("#selectValue2").val();	
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "onb6f4rRh320190902160751679iQUr3aVwTT"){
						var selectYear = $("#select_base_year").val()+$("#select_base_year_2").val();												
					}else{
						var selectYear = $("#select_base_year").val();						
					}
					//소방청생활안전사고 출동건수추가
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "QNj43PFUT220190612100733746ocaFOXLaj3"){
						var selectQuarter_val = $("#select_quarter >option:selected").val();
						var selectMonthly_val = $("#select_monthly >option:selected").val();
						var selectQuarter = $("#select_quarter >option:selected").text();
						var selectMonthly = $("#select_monthly >option:selected").text();
						var period_div,period_value;
						if($(".select_quarter").hasClass("on")){
							period_div=1;
							period_value = selectQuarter;
						}
						if($(".select_monthly").hasClass("on")){
							period_div=2;
							period_value = selectMonthly;
						}
					}
					//소방청생활안전사고 출동건수 추가 끝
					
					//코로나추가 20200722 주용민
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw"){
						$thematicMapFrame05.ui.removeCovidMarker();
						var covidYearVal = $("#select_base_year >option:selected").val();
						var covidMonthVal = $("#covid_month >option:selected").val();
						var covidDayVal = $("#covid_day >option:selected").val();
					}
					//코로나추가 20200722 주용민
					
					//암발생현황 추가
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "uHaX8JJqyh20201014110114231lgMgsJnINP"){
						var cancer_type_div_cd = $("#cancer_list a.on").attr("id").substr(-1,1);
					}
					//암발생현황 추가

					//감염병발생현황 추가
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "MmLSKu8PgQ20201022173339083sOVy6YCGQj"){
						var icd_clst_nm = $("#infection_list a.on").text();
						var chart_disp_order = 0;
					}
					//감염병발생현황 추가
					
					//기온/강수량 추가
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "RZ3pr7Maou20201106160851389D0RGtYCGpW"){
						var weather_type_cd = "";
						if($("#leftValue").hasClass("on")){
							weather_type_cd = $("#weather_type1 a.on").attr("id").substr(-1,1);
						}else{
							weather_type_cd = $("#weather_type2 a.on").attr("id").substr(-1,1);
						}
					}
					//기온/강수량 추가
					
					//보행자 차량사고 추가
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "wPsSdFX8Wt20210520161423833UZjHClj5U3"){
						$thematicMapFrame05.ui.removeCarAccMarker();
						var caracc_type_cd = $("#caracc_type a.on").attr("id").substr(-1,1);
						if($("#caracc_occur_point").hasClass("on")){
							var gubun = "tooltip";
						}
					}
					//보행자 차량사고 추가
					
					//코로나 예방접종 추가
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE"){
						$thematicMapFrame05.ui.removeCovidVaccMarker();
						var covidYearVal = $("#select_base_year >option:selected").val();
						var covidMonthVal = $("#covid_month >option:selected").val();
						var covidDayVal = $("#covid_day >option:selected").val();
						var covid_vacc_cd = "";
						if($("#leftValue").hasClass("on")){
//							covid_vacc_cd = $("#vacc_type a.on").attr("id").substr(-1,1);
							covid_vacc_cd = $("#vacc_type a.on").attr("id").substr(-2,1);
						}else{
//							covid_vacc_cd = $("#vacc_type2 a.on").attr("id").substr(-1,1);
							covid_vacc_cd = $("#vacc_type a.on").attr("id").substr(-1,1);
						}
						if($("#vacc_hospital").hasClass("on")){
							var gubun = "tooltip";
						}
					}
					//코로나 예방접종 추가
					
					//공영자전거 운영 현황
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "8mjCr1kWql20201123140825772vKMjQsNcRw"){
						if($("#bike1").hasClass("on")){
							$(".sqListBox.sq03 .sqList ul li a.first:eq(0)").text("수(개)");
						}else if($("#bike2").hasClass("on")){
							$(".sqListBox.sq03 .sqList ul li a.first:eq(0)").text("수(대)");
						}else if($("#bike3").hasClass("on")){
							$(".sqListBox.sq03 .sqList ul li a.first:eq(0)").text("수(건)");
						}
					}
					//공영자전거 운영 현황
					
					//area_type : 지역구분, bnd_year : 기준년도, selectedRegion : 지역경계
					
					if (this.isTimeSeries) {
						selectYear = options.year;
					}
					// mng_s 20190503 김건민
					if (that.add_data_disp_yn == "Y" && $("#etcValue").hasClass("on")) {
						selectYear = that.thema_stat_data_base_year;
					}
					// mng_e 20190503 김건민
					// area_type이 auto면 지역상관없이 모두 가져온다.
					$.ajax({
						type: "GET",
						url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapData.json",							
						data : {
							thema_map_data_id : thema_map_data_id,
							area_type : area_type,
							adm_cd : adm_cd,
							stat_data_base_year : selectYear,
							//소방청param
							period_div : period_div,
							period_value : period_value,
							base_year : selectYear,
							// 소방청param
							//코로나추가 20200722 주용민
							covid_year_val : covidYearVal,
							covid_month_val : covidMonthVal,
							covid_day_val : covidDayVal,
							//코로나추가 20200722 주용민
							cancer_type_div_cd : cancer_type_div_cd,
							icd_clst_nm : icd_clst_nm,
							chart_disp_order : chart_disp_order,
							weather_type_cd : weather_type_cd,
							caracc_type_cd : caracc_type_cd,
							covid_vacc_cd : covid_vacc_cd,
							gubun : gubun
						},
						success: function(res) {
							console.log("success");
							if (res.errCd == "0") {
								var detailInfo = {};
								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "RZ3pr7Maou20201106160851389D0RGtYCGpW"){
									for(var i=0;i<res.result.detailInfo.length;i++){
										if(res.result.detailInfo[i].adm_cd == "29" && $("#select_base_year option:selected").val() =="2019" && $("#weather1").hasClass("on")){
											var idx = res.result.detailInfo.indexOf(res.result.detailInfo[i]);
											res.result.detailInfo.splice(idx,1);
											i--;
										}
									}
								}
								//통계 주제도 데이터 가져오기 전에 레이어를 지운다.
								if( window.parent.$thematicMapMain.param.stat_thema_map_id != "sAXkcVzk5V202007141335257355ued9032uw" && window.parent.$thematicMapMain.param.stat_thema_map_id != "kmOpHLH5cK202106100936161097g5G9nLCFE" ){
									that.gMap.eachLayer(function(layer){
										if (layer.feature) {
											layer.remove(); 
										}
									});
								}

								//? 00이면 시도데이터
								if(adm_cd=="00"){
									res["pAdmCd"] = "00";
								}else{
									res["pAdmCd"] = adm_cd;
								}

								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "uHaX8JJqyh20201014110114231lgMgsJnINP"){
									for(var i=0;i<res.result.detailInfo.length;i++){
										if(res.result.detailInfo[i].adm_cd == "99"){
											$("#cancer_etc span").empty();
											if($("#selectValue").val() == "leftValue"){
												$("#cancer_etc span").append(res.result.detailInfo[i].left_data_val + "명");
											}else if($("#selectValue").val() == "rightValue"){
												$("#cancer_etc span").append(res.result.detailInfo[i].right_data_val + "명");
											}
											var idx = res.result.detailInfo.indexOf(res.result.detailInfo[i]);
											res.result.detailInfo.splice(idx,1);
											i--;
										}
									}
								}
								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "MmLSKu8PgQ20201022173339083sOVy6YCGQj"){
									for(var i=0;i<res.result.detailInfo.length;i++){
										if(res.result.detailInfo[i].adm_cd == "99"){
											$("#infection_etc span").empty();
											if($("#selectValue").val() == "leftValue"){
												$("#infection_etc span").append(res.result.detailInfo[i].left_data_val + "건");
											}
											var idx = res.result.detailInfo.indexOf(res.result.detailInfo[i]);
											res.result.detailInfo.splice(idx,1);
											i--;
										}
									}
								}
								
								//코로나 예방접종현황
								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE"){
									for(var i=0;i<res.result.detailInfo.length;i++){
										if(res.result.detailInfo[i].adm_cd == "00" || res.result.detailInfo[i].adm_cd == "99"){
											var idx = res.result.detailInfo.indexOf(res.result.detailInfo[i]);
											res.result.detailInfo.splice(idx,1);
											i--;
										}else {
											var tempVal = ( ($("#selectValue").val() == "leftValue") ? res.result.detailInfo[i].left_data_val : res.result.detailInfo[i].right_data_val );
											detailInfo[ res.result.detailInfo[i].adm_cd ] = tempVal;
										}
									}
//									that.isFirstDraw = true;
									that.makeCovidChart();
									if(window.parent.$thematicMapMain.param.param == "0"){
										$("#coronaVaccPop").hide();
									}
//									$.ajax({
//										type: "GET",
//										url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapData.json",							
//										data : {
//											thema_map_data_id : 'covid19_vacc_data',
//											gubun : 'vacc_cnt'
//										},
//										success: function(res) {
//											if (res.errCd == "0") {
//												var result = res.result.detailInfo[0];
//												if(window.parent.$thematicMapMain.param.param == "0"){
//													$("#coronaVaccPop").hide();
//												}else{
//													$("#coronaVaccPop").show();
//												}
//												vacc_cnt_html = "" 
//													+"    <html><head><link rel='stylesheet' href='/css/corona/css/base.css'><link rel='stylesheet' href='/css/corona/css/common.css'></head><body style='box-sizing: border-box;' ><main style='box-sizing: border-box;' >                                                                                             "
//													   +"        <div style='box-sizing: border-box;' class='board' id='corona_vacc_board'>                                                                                             "
//													   +"            <div   style='box-sizing: border-box;'  class='head'>                                                                                          "
//													   +" 				<ul class='popup_tab'>			"
////													   +"      <a style='width:100%;margin-right:10px' href='/view/thematicMap/thematicMapMain?stat_thema_map_id=sAXkcVzk5V202007141335257355ued9032uw&theme=CTGR_005&mapType=05' target='_top'><li id='con1'><span class='ico'></span>코로나 발생현황</li></a>			"
////													   +"      <a style='width:100%;margin-left:10px' href='/view/thematicMap/thematicMapMain?stat_thema_map_id=kmOpHLH5cK202106100936161097g5G9nLCFE&theme=CTGR_005&mapType=05' target='_top'><li id='con2' class='on'><span class='ico'></span>예방접종 현황</li></a>				"
//													   +"      <a style='width:100%;margin-right:10px' href='javascript:$(\'#coronaVaccPop\').hide();$(\'#coronaPop\').show();'><li id='con1'><span class='ico'></span>코로나 발생현황</li></a>			"
//													   +"      <a style='width:100%;margin-left:10px' href='javascript:$(\'#coronaPop\').hide();$(\'#coronaVaccPop\').show();'><li id='con2' class='on'><span class='ico'></span>예방접종 현황</li></a>				"
//													   +"    </ul><hr style='display:block;'>		"
//													   +"                <h1 style='font-size:18px;margin-top:20px'>코로나바이러스 감염증-19 예방접종현황</h1>                                                              "
////													   +"                <h2 style='font-size:14px;text-align:center;'>" + result.base_month +"." + result.base_day + ". 00시 기준, 2020.01.03. 이후 누계</h2>                                                                               "
//													   +"                <h2 style='font-size:14px;text-align:center;'>" + result.base_month +"." + result.base_day + ". 00시 기준</h2>                                                                               "
//													   +"            </div>                                                                                                      "
//													   +"            <div class='popup_cont on' style='padding-top:10px;'>                                                                                     "
//													   +"            	<div class='vaccination_status'>                                                                                     "
//													   +"            		<div class='tit bg1'>1차 접종</div>                                                                                     "
//													   +"            		<div class='result'>                                                                                     "
//													   +"            			<div class='item'>                                                                                     "
//													   +"            				<h5>1회차<br />당일 누적</h5>                                                                                     "
//													   +"            				<p class='num'>" + appendCommaToNumber(result.total_fst_lnocl_cnt) + "명</p>                                                                                     "
//													   +"           			</div>                                                                                                  "
//													   +"            			<div class='item'>                                                                                     "
//													   +"            				<h5>1회차<br />전일 실적</h5>                                                                                     "
//													   +"            				<p class='num'>" + appendCommaToNumber(result.today_fst_lnocl_cnt) + "명</p>                                                                                     "
//													   +"           			</div>                                                                                                  "
//													   +"            			<div class='item'>                                                                                     "
//													   +"            				<h5>1회차<br />전일 누적</h5>                                                                                     "
//													   +"            				<p class='num'>" + appendCommaToNumber(result.bfrt_fst_lnocl_cnt) + "명</p>                                                                                     "
//													   +"           			</div>                                                                                                 "
//													   +"           		</div>                                                                                                  "
//													   +"           	</div>                                                                                                  "
//													   +"            	<div class='vaccination_status'>                                                                                     "
//													   +"            		<div class='tit bg2'>접종 완료</div>                                                                                     "
//													   +"            		<div class='result'>                                                                                     "
//													   +"            			<div class='item'>                                                                                     "
//													   +"            				<h5>접종완료<br />당일 누적</h5>                                                                                     "
//													   +"            				<p class='num'>" + appendCommaToNumber(result.total_scd_lnocl_cnt) + "명</p>                                                                                     "
//													   +"           			</div>                                                                                                  "
//													   +"            			<div class='item'>                                                                                     "
//													   +"            				<h5>접종완료<br />전일 실적</h5>                                                                                     "
//													   +"            				<p class='num'>" + appendCommaToNumber(result.today_scd_lnocl_cnt) + "명</p>                                                                                     "
//													   +"           			</div>                                                                                                  "
//													   +"            			<div class='item'>                                                                                     "
//													   +"            				<h5>접종완료<br />전일 누적</h5>                                                                                     "
//													   +"            				<p class='num'>" + appendCommaToNumber(result.bfrt_scd_lnocl_cnt) + "명</p>                                                                                     "
//													   +"           			</div>                                                                                                  "
//													   +"           		</div>                                                                                                  "
//													   +"           	</div>                                                                                                  "
//													   +"            </div>                                                                                                  "
//													   +"            <div    style='box-sizing: border-box;margin-top:123px;'  class='foot'>                                                                                          "
//													   +"                <div    style='box-sizing: border-box;'  class='fLeft'>                                                                                     "
//													   +"                    <input type='checkbox' name='corona_close' value='OK' id='corona_close' onclick=\"$thematicMapFrame05.ui.closeWin('coronaVaccPop', 'N', 1);\"><label for='corona_close'>1일간 이 창을 더 이상 열지 않음</label>         "
//													   +"                </div>                                                                                                  "
//													   +"                <button     class='fRight'  onclick=\"$thematicMapFrame05.ui.closeWin('coronaVaccPop', 'N', 1);\">창닫기<img src='/images/corona/btn_close2.png' alt='close'>                       "
//													   +"                </button>                                                                                               "
//													   +"                                                                                                                        "
//													   +"            </div>                                                                                                      "
//													   +"            <button     class='cls'  onclick=\"$thematicMapFrame05.ui.closeWin('coronaVaccPop', 'N', 1);\"><img src='/images/corona/btn_close.png' alt='close' ></button>                            "
//													   +"        </div>                                                                                                          "
//													   +"    </main></body></html>                                                                                                          "
//													   ;
//											
//											$("#vacc_cnt").html(vacc_cnt_html);
//											}
//										}
//									});
								}
								//코로나 예방접종현황

								//코로나추가 20200722 주용민
								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw"){
									for(var i=0;i<res.result.detailInfo.length;i++){
//										if(res.result.detailInfo[i].adm_cd == "00" || res.result.detailInfo[i].adm_cd == "99"){
//											if(res.result.detailInfo[i].adm_cd == "99"){
//												$("#quar div").empty();
//												if($("#selectValue").val() == "leftValue"){
//													$("#quar div").append("검역 - "+ res.result.detailInfo[i].left_data_val + "명");
//												}else if($("#selectValue").val() == "rightValue"){
//													$("#quar div").append("검역 - "+ res.result.detailInfo[i].right_data_val + "명");
//												}
//											}
//											var idx = res.result.detailInfo.indexOf(res.result.detailInfo[i]);
//											res.result.detailInfo.splice(idx,1);
//											i--;
										if(res.result.detailInfo[i].adm_cd == "00"){
											var idx = res.result.detailInfo.indexOf(res.result.detailInfo[i]);
											res.result.detailInfo.splice(idx,1);
											i--;
										}else if(res.result.detailInfo[i].adm_cd == "99"){
												$("#quar div").empty();
												if($("#selectValue").val() == "leftValue"){
													$("#quar div").append("검역 - "+ res.result.detailInfo[i].left_data_val + "명");
												}else if($("#selectValue").val() == "rightValue"){
													$("#quar div").append("검역 - "+ res.result.detailInfo[i].right_data_val + "명");
												}
										} else {
											var tempVal = ( ($("#selectValue").val() == "leftValue") ? res.result.detailInfo[i].left_data_val : res.result.detailInfo[i].right_data_val );
											detailInfo[ res.result.detailInfo[i].adm_cd ] = tempVal;
										}
									}
									if(that.tmpAdmCd == "")
										that.tmpAdmCd = "00";
									
									that.makeCovidChart();
									
									$.ajax({
										type: "GET",
										url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapData.json",							
										data : {
											thema_map_data_id : 'covid19_vacc_data',
											gubun : 'vacc_cnt'
										},
										success: function(res) {
											if (res.errCd == "0") {
												var result = res.result.detailInfo[0];
												if(window.parent.$thematicMapMain.param.param == "0"){
													$("#coronaVaccPop").hide();
												}
												vacc_cnt_html = "" 
													+"    <html><head><link rel='stylesheet' href='/css/corona/css/base.css'><link rel='stylesheet' href='/css/corona/css/common.css'></head><body style='box-sizing: border-box;' ><main style='box-sizing: border-box;' >                                                                                             "
													   +"        <div style='box-sizing: border-box;' class='board' id='corona_vacc_board'>                                                                                             "
													   +"            <div   style='box-sizing: border-box;'  class='head'>                                                                                          "
													   +" 				<ul class='popup_tab'>			"
													   +"      <a style='width:100%;margin-right:10px' href='javascript:void(0);'><li class='con1'><span class='ico'></span>코로나 발생현황</li></a>			"
													   +"      <a style='width:100%;margin-left:10px' href='javascript:void(0);'><li class='con2 on'><span class='ico'></span>예방접종 현황</li></a>				"
													   +"    </ul><hr style='display:block;'>		"
													   +"                <h1 style='font-size:18px;'>코로나바이러스 감염증-19 예방접종현황</h1>                                                              "
													   +"                <h2 style='font-size:14px;text-align:center;'>" + result.base_month +"." + result.base_day + ". 00시 기준</h2>                                                                               "
													   +"            </div>                                                                                                      "
													   +"            <div class='popup_cont on' style='padding-top:10px;'>                                                                                     "
													   +"            	<div class='vaccination_status style01'>                                                                                     "
													   +"            		<div class='tit'>1차 접종</div>                                                                                     "
													   +"            		<div class='result'>                                                                                     "
												       +"  						<div class='equals sign_ico'>		"
											           +"							<img src='/images/corona/equals_ico.png' alt=''>	"
											           +"						</div>		"
											           +"						<div class='plus sign_ico'>			"
											           +"							<img src='/images/corona/plus_ico.png' alt=''>		"
											           +"						</div>		"
													   +"            			<div class='item style01'>                                                                                     "
													   +"            				<h5><img src='/images/corona/result_icon01.png' alt=''>1회차<br />당일 누적</h5>                                                                                     "
													   +"            				<p class='num'>" + appendCommaToNumber(result.total_fst_lnocl_cnt) + "명</p>                                                                                     "
													   +"           			</div>                                                                                                  "
													   +"            			<div class='item style02'>                                                                                     "
													   +"            				<h5><img src='/images/corona/result_icon02.png' alt=''>1회차<br />당일 신규</h5>                                                                                     "
													   +"            				<p class='num'>" + appendCommaToNumber(result.today_fst_lnocl_cnt) + "명</p>                                                                                     "
													   +"           			</div>                                                                                                  "
													   +"            			<div class='item style03'>                                                                                     "
													   +"            				<h5><img src='/images/corona/result_icon03.png' alt=''>1회차<br />전일 누적</h5>                                                                                     "
													   +"            				<p class='num'>" + appendCommaToNumber(result.bfrt_fst_lnocl_cnt) + "명</p>                                                                                     "
													   +"           			</div>                                                                                                 "
													   +"           		</div>                                                                                                  "
													   +"           	</div>                                                                                                  "
													   +"            	<div class='vaccination_status style01' style='margin-bottom:20px;'>                                                                                     "
													   +"            		<div class='tit'>2차 접종</div>                                                                                     "
													   +"            		<div class='result'>                                                                                     "
													   +"  						<div class='equals sign_ico'>		"
													   +"							<img src='/images/corona/equals_ico.png' alt=''>	"
													   +"						</div>		"
													   +"						<div class='plus sign_ico'>			"
													   +"							<img src='/images/corona/plus_ico.png' alt=''>		"
													   +"						</div>		"
													   +"            			<div class='item style01'>                                                                                     "
													   +"            				<h5><img src='/images/corona/result_icon01.png' alt=''>2회차<br />당일 누적</h5>                                                                                     "
													   +"            				<p class='num'>" + appendCommaToNumber(result.total_scd_lnocl_cnt) + "명</p>                                                                                     "
													   +"           			</div>                                                                                                  "
													   +"            			<div class='item style02'>                                                                                     "
													   +"            				<h5><img src='/images/corona/result_icon02.png' alt=''>2회차<br />당일 신규</h5>                                                                                     "
													   +"            				<p class='num'>" + appendCommaToNumber(result.today_scd_lnocl_cnt) + "명</p>                                                                                     "
													   +"           			</div>                                                                                                  "
													   +"            			<div class='item style03'>                                                                                     "
													   +"            				<h5><img src='/images/corona/result_icon03.png' alt=''>2회차<br />전일 누적</h5>                                                                                     "
													   +"            				<p class='num'>" + appendCommaToNumber(result.bfrt_scd_lnocl_cnt) + "명</p>                                                                                     "
													   +"           			</div>                                                                                                 "
													   +"           		</div>                                                                                                  "
													   +"           	</div>                                                                                                  "
													   +"            	<div class='vaccination_status style02'>                                                                                     "
													   +"            		<div class='tit'><span class='ico'>3차 접종</div>                                                                                     "
													   +"            		<div class='result'>                                                                                     "
												       +"  						<div class='equals sign_ico'>		"
											           +"							<img src='/images/corona/equals_ico.png' alt=''>	"
											           +"						</div>		"
											           +"						<div class='plus sign_ico'>			"
											           +"							<img src='/images/corona/plus_ico.png' alt=''>		"
											           +"						</div>		"
													   +"            			<div class='item style01'>                                                                                     "
													   +"            				<h5><img src='/images/corona/result_icon04.png' alt=''>3회차<br />당일 누적</h5>                                                                                     "
													   +"            				<p class='num'>" + appendCommaToNumber(result.total_third_lnocl_cnt) + "명</p>                                                                                     "
													   +"           			</div>                                                                                                  "
													   +"            			<div class='item style02'>                                                                                     "
													   +"            				<h5><img src='/images/corona/result_icon05.png' alt=''>3회차<br />당일 신규</h5>                                                                                     "
													   +"            				<p class='num'>" + appendCommaToNumber(result.today_third_lnocl_cnt) + "명</p>                                                                                     "
													   +"           			</div>                                                                                                  "
													   +"            			<div class='item style03'>                                                                                     "
													   +"            				<h5><img src='/images/corona/result_icon06.png' alt=''>3회차<br />전일 누적</h5>                                                                                     "
													   +"            				<p class='num'>" + appendCommaToNumber(result.bfrt_third_cnt) + "명</p>                                                                                     "
													   +"           			</div>                                                                                                  "
													   +"           		</div>                                                                                                  "
													   +"           	</div>                                                                                                  "
													   +"            </div>                                                                                                  "
													   +"            <div    style='box-sizing: border-box;margin-top:43px;'  class='foot'>                                                                                          "
													   +"                <div    style='box-sizing: border-box;'  class='fLeft'>                                                                                     "
													   +"                    <input type='checkbox' name='corona_close' value='OK' id='corona_close' onclick=\"$thematicMapFrame05.ui.closeWin('coronaVaccPop', 'N', 1);\"><label for='corona_close'>1일간 이 창을 더 이상 열지 않음</label>         "
													   +"                </div>                                                                                                  "
													   +"                <button     class='fRight'  onclick=\"$thematicMapFrame05.ui.closeWin('coronaVaccPop', 'N', 1);\">창닫기<img src='/images/corona/btn_close2.png' alt='close'>                       "
													   +"                </button>                                                                                               "
													   +"                                                                                                                        "
													   +"            </div>                                                                                                      "
													   +"            <button     class='cls'  onclick=\"$thematicMapFrame05.ui.closeWin('coronaVaccPop', 'N', 1);\"><img src='/images/corona/btn_close.png' alt='close' ></button>                            "
													   +"        </div>                                                                                                          "
													   +"    </main></body></html>                                                                                                          "
													   ;
											
											$("#vacc_cnt").html(vacc_cnt_html);
											}
										}
									});
									
									//mng_s 20200730 kimjoonha 현황판
									$.ajax({
										type: "GET",
										url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapData.json",							
										data : {
											thema_map_data_id : 'covid19_status',
											area_type : 'auto',
											adm_cd : that.tmpAdmCd,
											covid_start : that.covidItem.date,
											covid_month_val : covidMonthVal,
											gubun : 'general_cnt'
										},
										success: function(res) {
											if (res.errCd == "0") {
												if(window.parent.$thematicMapMain.param.param == "0"){
													$("#coronaPop").hide();
												}else{
													$("#general_cnt").show();
												}
												var result = res.result.detailInfo;
												var tmpData = [];
												var tmpData2 = [];
												var data_val;
												
//												$("#general_cnt").show();
												var general_cnt_html = "";
												for(var i=0;i<result.length;i++){
													
													var corona_img = "";
													if(result[i].defcnt_pm == 0) {
														corona_img = "";
													} else if(result[i].defcnt_pm > 0) {
														corona_img = "<img style='vertical-align:middle;' src='/images/corona/arw.png' alt='up'>";
													} else if(result[i].defcnt_pm < 0) {
														corona_img = "<img style='vertical-align:middle;' src='/images/corona/arw2.png' alt='down'>";
													}
													
													var corona_img2 = "";
													if(result[i].isolclearcnt_pm == 0) {
														corona_img2 = "";
													} else if(result[i].isolclearcnt_pm > 0) {
														corona_img2 = "<img style='vertical-align:middle;' src='/images/corona/arw.png' alt='up'>";
													} else if(result[i].isolclearcnt_pm < 0) {
														corona_img2 = "<img style='vertical-align:middle;' src='/images/corona/arw2.png' alt='down'>";
													}
													var corona_img3 = "";
													if(result[i].isolingcnt_pm == 0) {
														corona_img3 = "";
													} else if(result[i].isolingcnt_pm > 0) {
														corona_img3 = "<img style='vertical-align:middle;' src='/images/corona/arw.png' alt='up'>";
													} else if(result[i].isolingcnt_pm < 0) {
														corona_img3 = "<img style='vertical-align:middle;' src='/images/corona/arw2.png' alt='down'>";
													}
													var corona_img4 = "";
													if(result[i].deathcnt_pm == 0) {
														corona_img4 = "";
													} else if(result[i].deathcnt_pm > 0) {
														corona_img4 = "<img style='vertical-align:middle;' src='/images/corona/arw.png' alt='up'>";
													} else if(result[i].deathcnt_pm < 0) {
														corona_img4 = "<img style='vertical-align:middle;' src='/images/corona/arw2.png' alt='down'>";
													} 
													
													general_cnt_html = "" 
														+"    <html><head><link rel='stylesheet' href='/css/corona/css/base.css'><link rel='stylesheet' href='/css/corona/css/common.css'></head><body style='box-sizing: border-box;' ><main style='box-sizing: border-box;' >                                                                                             "
														//+"    <html><head><link rel='stylesheet' href='/css/corona/css/common.css'></head><body style='box-sizing: border-box;' ><main style='box-sizing: border-box;' >                                                                                             "
														//+"    <html><head></head><body><main>                                                                                             "
														   +"        <div style='box-sizing: border-box;' class='board' id='corona_board'>                                                                                             "
														   +"            <div   style='box-sizing: border-box;'  class='head'>                                                                                          "
														   +" 				<ul class='popup_tab'>			"
//														   +"      <a style='width:100%;margin-right:10px' href='/view/thematicMap/thematicMapMain?stat_thema_map_id=sAXkcVzk5V202007141335257355ued9032uw&theme=CTGR_005&mapType=05' target='_top'><li id='con1' class='on'><span class='ico'></span>코로나 발생현황</li></a>			"
//														   +"      <a style='width:100%;margin-left:10px' href='/view/thematicMap/thematicMapMain?stat_thema_map_id=kmOpHLH5cK202106100936161097g5G9nLCFE&theme=CTGR_005&mapType=05' target='_top'><li id='con2'><span class='ico'></span>예방접종 현황</li></a>				"
														   +"      <a style='width:100%;margin-right:10px' href='javascript:void(0);'><li class='con1 on'><span class='ico'></span>코로나 발생현황</li></a>			"
														   +"      <a style='width:100%;margin-left:10px' href='javascript:void(0);'><li class='con2'><span class='ico'></span>예방접종 현황</li></a>				"
														   +"    </ul><hr style='display:block';>		"
														   +"                <h1 style='font-size:18px;'>코로나바이러스 감염증-19 발생현황</h1>                                                              "
														   +"                <h2 style='font-size:14px;text-align:center;'>" + result[i].base_month +"." + result[i].base_day + ". 00시 기준, 2020.01.03. 이후 누계</h2>                                                                               "
														   +"            </div>                                                                                                      "
														   +"            <section class='cont1'>                                                                                     "
														   +"                <div   style='box-sizing: border-box;'  class='left'>                                                                                      "
														   +"                    <div   style='box-sizing: border-box;'  class='numBox ml60'>                                                                           "
														   +"                        <div   style='box-sizing: border-box;'  class='lb'>                                                                                "
														   +"                            <img src='/images/corona/icon_11.png' alt=''>                                           "
														   +"                        </div>                                                                                          "
														   +"                        <div   style='box-sizing: border-box;'  class='rb'>                                                                                "
														   +"                            <div style='font-size:14px;'  style='margin:0; padding:0; box-sizing: border-box; word-break:keep-all;' class='tit'>일일확진자</div>                                                           "
														   +"                            <div style='font-size:20px;'  style='margin:0; padding:0; box-sizing: border-box; word-break:keep-all;' class='num'>" + appendCommaToNumber(result[i].incdec) + "</div>                                                                   "
														   +"                        </div>                                                                                          "
														   +"                    </div>                                                                                              "
														   +"                </div>                                                                                                  "
														   +"                <div   style='box-sizing: border-box;'  class='right'>                                                                                     "
														   +"                    <div   style='box-sizing: border-box;'  class='numBox ml38'>                                                                           "
														   +"                        <div   style='box-sizing: border-box;'  class='lb'>                                                                                "
														   +"                            <img src='/images/corona/icon_12.png' alt=''>                                           "
														   +"                        </div>                                                                                          "
														   +"                        <div   style='box-sizing: border-box;'  class='rb'>                                                                                "
														   +"                            <div style='font-size:14px;'   style='box-sizing: border-box;'  class='tit'>국내발생</div>                                                             "
														   +"                            <div style='font-size:20px;'   style='box-sizing: border-box;'  class='num'>" + appendCommaToNumber(result[i].localocccnt) + "</div>                                                                    "
														   +"                        </div>                                                                                          "
														   +"                    </div>                                                                                              "
														   +"                    <div   style='box-sizing: border-box;'  class='numBox ml26'>                                                                           "
														   +"                        <div   style='box-sizing: border-box;'  class='lb'>                                                                                "
														   +"                            <img src='/images/corona/icon_13.png' alt=''>                                           "
														   +"                        </div>                                                                                          "
														   +"                        <div   style='box-sizing: border-box;'  class='rb'>                                                                                "
														   +"                            <div style='font-size:14px;'   style='box-sizing: border-box;'  class='tit'>해외유입</div>                                                             "
														   +"                            <div style='font-size:20px;'   style='box-sizing: border-box;'  class='num'>" + appendCommaToNumber(result[i].overflowcnt) + "</div>                                                                   "
														   +"                        </div>                                                                                          "
														   +"                    </div>                                                                                              "
														   +"                </div>                                                                                                  "
														   +"            </section>                                                                                                  "
														   +"                                                                                                                        "
														   +"            <section class='cont2'  style='box-sizing: border-box;'  >                                                                                     "
														   +"                <ul  style='box-sizing: border-box;'  >                                                                                                    "
														   +"                    <li   style='box-sizing: border-box;'  class='covid'>                                                                                  "
														   +"                        <img src='/images/corona/icon_21.png' alt=''>                                               "
														   +"                        <div style='font-size:15px; color:white;' class='tit2'>확진환자</div>                                                                "
														   +"                        <div style='font-size:18px; color:white;' class='num2'>" + appendCommaToNumber(result[i].defcnt) + "</div>                                                                  "
														   +"                        <div style='font-size:14px; color:white;' class='plus'>" + appendCommaToNumber(result[i].defcnt_pm) + corona_img + " </div>                        "
														   +"                    </li>                                                                                               "
														   +"                    <li   style='box-sizing: border-box;'  class='rcvy'>                                                                                   "
														   +"                        <img src='/images/corona/icon_22.png' alt=''>                                               "
														   +"                        <div style='font-size:15px; color:white;' class='tit2'>완치</div>                                                                    "
														   +"                        <div style='font-size:18px; color:white;' class='num2'>" + appendCommaToNumber(result[i].isolclearcnt) + "</div>                                                                  "
														   +"                        <div style='font-size:14px; color:white;' class='plus'>" + appendCommaToNumber(result[i].isolclearcnt_pm) + corona_img2 + " </div>                        "
														   +"                    </li>                                                                                               "
														   +"                    <li   style='box-sizing: border-box;'  class='cure'>                                                                                   "
														   +"                        <img src='/images/corona/icon_23.png' alt=''>                                               "
														   +"                        <div style='font-size:15px; color:white;' class='tit2'>치료중</div>                                                                  "
														   +"                        <div style='font-size:18px; color:white;' class='num2'>" + appendCommaToNumber(result[i].isolingcnt) + "</div>                                                                     "
														   +"                        <div style='font-size:14px; color:white;' class='plus'>" + appendCommaToNumber(result[i].isolingcnt_pm) + corona_img3 + " </div>                        "
														   +"                    </li>                                                                                               "
														   +"                    <li   style='box-sizing: border-box;'  class='death'>                                                                                  "
														   +"                        <img src='/images/corona/icon_24.png' alt=''>                                               "
														   +"                        <div style='font-size:15px; color:white;' class='tit2'>사망</div>                                                                    "
														   +"                        <div style='font-size:18px; color:white;' class='num2'>" + appendCommaToNumber(result[i].deathcnt) + "</div>                                                                     "
														   +"                        <div style='font-size:14px; color:white;' class='plus'>" + appendCommaToNumber(result[i].deathcnt_pm) + corona_img4 + " </div>                        "
														   +"                    </li>                                                                                               "
														   +"                </ul>                                                                                                   "
														   +"            </section>                                                                                                  "
														   +"            <section class='cont3' style='box-sizing: border-box;height: 200px;margin-top: 10px;width: 40%;float: left;'> 	 "
														   +"			  </section>"
														   +"            <section class='cont4' style='box-sizing: border-box;height: 200px;margin-top: 10px;width: 60%;float: right;'> 	 "
														   +"			  </section>"
														   +"            <div    style='box-sizing: border-box;'  class='foot'>                                                                                          "
														   +"                <div    style='box-sizing: border-box;'  class='fLeft'>                                                                                     "
														   +"                    <input type='checkbox' name='corona_close' value='OK' id='corona_close' onclick=\"$thematicMapFrame05.ui.closeWin('coronaPop', 'N', 1);\"><label for='corona_close'>1일간 이 창을 더 이상 열지 않음</label>         "
														   +"                </div>                                                                                                  "
														   +"                <button     class='fRight'  onclick=\"$thematicMapFrame05.ui.closeWin('coronaPop', 'N', 1);\">창닫기<img src='/images/corona/btn_close2.png' alt='close'>                       "
														   +"                </button>                                                                                               "
														   +"                                                                                                                        "
														   +"            </div>                                                                                                      "
														   +"            <button     class='cls'  onclick=\"$thematicMapFrame05.ui.closeWin('coronaPop', 'N', 1);\"><img src='/images/corona/btn_close.png' alt='close' ></button>                            "
														   +"        </div>                                                                                                          "
														   +"    </main></body></html>                                                                                                          "
														   ;
												}
												
												$("#general_cnt").html(general_cnt_html);
											}
											
											$.ajax({
												type: "GET",
												url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapData.json",							
												data : {
													thema_map_data_id : 'covid19_status',
													area_type : 'auto',
													adm_cd : that.tmpAdmCd,
													covid_month_val : covidMonthVal,
													covid_day_val : covidDayVal,
													gubun : 'general_cnt_chart'
												},
												success: function(res) {
													if (res.errCd == "0") {
														var result = res.result.detailInfo;
														var tmpData = [];
														var tmpData2 = [];
														var categories = [];
//														//파이차트 데이터 생성
														for (var i=0; i<result.length; i++) {
															var data = result[i];
															if(data.gubun == "남성" || data.gubun == "여성"){
																tmpData.push({
																	name : data.gubun,
																	y : data.conf_case
																});
																tmpData.reverse();
															}else{
																tmpData2.push({
																	name : data.gubun,
																	y : data.conf_case,
																	pct : data.conf_case_rate
																});
																if(data.gubun == "10-19"){
																	data.gubun = "10대"
																}else if(data.gubun == "20-29"){
																	data.gubun = "20대"
																}else if(data.gubun == "30-39"){
																	data.gubun = "30대"
																}else if(data.gubun == "40-49"){
																	data.gubun = "40대"
																}else if(data.gubun == "50-59"){
																	data.gubun = "50대"
																}else if(data.gubun == "60-69"){
																	data.gubun = "60대"
																}else if(data.gubun == "70-79"){
																	data.gubun = "70대"
																}else if(data.gubun == "80 이상"){
																	data.gubun = "80대 이상"
																}else{
																	data.gubun = data.gubun+"세";
																}
																categories.push(data.gubun);
															}
														} 
														//파이차트 생성
														$(".cont3").highcharts({
												            chart: {
										                        plotBackgroundColor: null,
										                        plotBorderWidth: null,
														        plotShadow: false,
												            	type: 'pie',
												            },
												            legend : {
												            	reversed : true
												            },
												            exporting: { enabled: false },
												            title: { 
												            	text: '<span style="font-weight:bold">확진자 성별 비율</span>',
												            	useHTML : true,
												            	style:{
												            		fontSize : '14px',
												            		fontFamily : '나눔고딕'
												            	}
												            },
												            tooltip: {
												            	enabled : false
//												            	pointFormat : '{point.name}: <b>{point.y:,.0f}명 ({point.percentage:.1f}%)</b>'
												            },
												            plotOptions: {
												               series: {
												                    dataLabels: {
												                        enabled: true,
												                        useHTML : true,
												                        format: '<span style="color:white;font-weight:100;text-shadow: -1px 0 #000,0 1px #000,1px 0 #000, 0 -1px #000;">{point.name}: {point.y:,.0f}명<br/>&nbsp;&nbsp;&nbsp;&nbsp;({point.percentage:.1f}%)</span>',
												                        distance : -20
												                    },
												                },
												                pie : {
												                	size : 120,
												                	shadow : false,
												                	showInLegend : true,
												                	colors : ['#ff7f27','#0096ff'],
												                	point:{
												                		events:{
												                			legendItemClick : function(){
												                				return false;
												                			}
												                		}
												                	}
												                }
												            },
												            series: [{
												                data : tmpData
												            }]
												        });	
														$(".cont4").highcharts({
															chart: {
																plotBackgroundColor: null,
																plotBorderWidth: null,
																plotShadow: false,
																type: 'column'
															},
															exporting: { enabled: false },
															title: { 
																text: '<span style="font-weight:bold">확진자 연령별 분포</span>',
																useHTML : true,
																style : {
																	fontSize : '14px',
																	fontFamily : '나눔고딕',
																	fontWeight : 'bold'
																}
															},
															tooltip: {
																enabled: true,
																	pointFormat : '{series.name}: <b>{point.y:,.0f}명 ({point.pct:.1f}%)</b>'
															},
															xAxis : {
																categories : categories
															},
															yAxis :{
																title : false
															},
															plotOptions: {
																column : {
																	pointPadding : 0.2,
																	borderWidth : 0,
																	color : '#3bbee3'
																}
															},
															series: [{
																name : '확진자',
																showInLegend : false,
																data : tmpData2
															}]
														});	
													}
												}
											});
											
										}
									});
									//mng_e 20200730 kimjoonha 현황판
								}
								//코로나추가 20200722 주용민
								var result = res.result.detailInfo;
								that.dataBoardData = res.result.detailInfo;
								
								//소수점 한자리까지 표현
								// 2017. 03. 16 j.h.Seok
								for (var i=0; i<result.length; i++) {
									if (result[i].left_data_val) {
										result[i].left_data_val = parseFloat(result[i].left_data_val).toFixed(1);
									}
									if (result[i].right_data_val) {
										result[i].right_data_val = parseFloat(result[i].right_data_val).toFixed(1);
									}
								}

								// 선택된 기준년도와 같은 자료만 result1에 집어넣는다. 
								var result1 = new Array();
								var k=0;
								for(var i=0;i<result.length;i++){
									if(result[i].base_year==selectYear){
										result1[k] = result[i];
										k++;
									}
								}

								res.result = result1;

								//통계선택에서 증감률(left)를 선택이 되어있으면
								if($("#selectValue").val() == "leftValue"){

									// 테마주제 정보에서 툴팁타이틀을 각 data에 넣는다.
									for(var i=0;i<res.result.length;i++){
										if(window.parent.$thematicMapMain.param.stat_thema_map_id == "8mjCr1kWql20201123140825772vKMjQsNcRw"){
											res.result[i].left_sep_ttip_title = $("#bike_type a.on").text() + " " + that.left_sep_ttip_title;
										}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE"){
											res.result[i].left_sep_ttip_title = $("#vacc_type a.on").text() + " " + that.left_sep_ttip_title;
										}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "wPsSdFX8Wt20210520161423833UZjHClj5U3"){
//											if($("#sigungu").hasClass("on")){
//												res.result[i].left_sep_ttip_title = "10만명당 " + $("#caracc_type a.on").text()+ " " + that.left_sep_ttip_title;
//											}else{
												res.result[i].left_sep_ttip_title = $("#caracc_type a.on").text()+ " " + that.left_sep_ttip_title;
//											}
										}else{
											res.result[i].left_sep_ttip_title = that.left_sep_ttip_title;									  
											res.result[i].left_sep_chart_title = that.left_sep_chart_title;									  
										}
									}									  
									that.setStatsData("normal", res, "left_data_val", that.left_sep_unit);	

								}else if ($("#selectValue").val() == "rightValue") {
									// CAGR 데이터인 경우
									for(var i=0;i<res.result.length;i++){
										if(window.parent.$thematicMapMain.param.stat_thema_map_id == "8mjCr1kWql20201123140825772vKMjQsNcRw"){
											res.result[i].right_sep_ttip_title = $("#bike_type a.on").text() + " " + that.right_sep_ttip_title;
										}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE"){
//											res.result[i].right_sep_ttip_title = $("#vacc_type2 a.on").text() + " " + that.right_sep_ttip_title;
											res.result[i].right_sep_ttip_title = $("#vacc_type a.on").text() + " " + that.right_sep_ttip_title;
										}else{
											res.result[i].right_sep_ttip_title = that.right_sep_ttip_title;
											res.result[i].right_sep_chart_title = that.right_sep_chart_title;
										}
									}								  
									that.setStatsData("normal", res, "right_data_val", that.right_sep_unit);	
									
								}else {
									// 테마주제 정보에서 툴팁타이틀을 각 data에 넣는다.
									for(var i=0;i<res.result.length;i++){
										res.result[i].left_sep_ttip_title = that.sep_map_left_sep_ttip_title;									  
										res.result[i].left_sep_chart_title = that.sep_map_right_sep_ttip_title;									  
									}									  
									that.setStatsData("normal", res, "left_data_val", that.sep_map_left_sep_unit);	
								}

								//주제도 설정 - 지역경계에서 자동 - 경계데이터 가져옴.
								//            - 시도,시군구,읍면동으로 설정되어 있으면 경계데이터를 밖에서 가져옴.
								var region = $("#selectValue2").val();
								$thematicMapFrame05.ui.dataGeoJson = [];

								//경계고정이 아닐때
								if (that.boundary_fix_yn == "N") {
									that.bnd_year = $("#select_base_year").val();
								}
								$("#themaNoticeText").hide();	
								that.maxZoomType();
								
								if( window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw" || window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE" ){
									if( !that.dataGeojson || that.layerRemove ){
										that.openApiBoundarySido( that.bnd_year, function( geojson ){
											thematicCharts( adm_cd, true );
										});
										
										that.layerRemove = false;
									} else {
										for ( var i = 0; i < that.dataGeojsonLayer.features.length; i++) {
											that.dataGeojsonLayer.features[i]["info"] = [];
										}
										
										var tempGeoData = that.combineStatsData( that.dataGeojsonLayer );
										
										$thematicMapFrame05.Popup.close();
										that.removeCaption();
										that.setLegendForStatsData();
										
										var dataGeojson = that.dataGeojson;
										if(dataGeojson != undefined && dataGeojson.length && dataGeojson != null > 0) {
											that.multiLayerControl.dataGeojson = dataGeojson;
										}
//										that.multiLayerControl.dataGeojson = that.dataGeojson;
										legendColor(that.legend.legendColor2, that.legend.legendColor1, "#colorStatus_"+that.legend.id, that.legend.lv,that.legend.id,that.legend);
										
										if( $("#dataMode").val() == "bubble" ){
											if (that.legend.circleMarkerGroup != null) {
												for (var i=0; i<that.legend.circleMarkerGroup.length; i++) {
													var marker = that.legend.circleMarkerGroup[i];
													marker.remove();
												}
											}
											that.legend.circleMarkerGroup = [];
										}
										
										that.dataGeojson.eachLayer( function(layer){
											var layer_adm_cd = layer.feature.properties.adm_cd;
											var val = detailInfo[ layer_adm_cd ];
											var x = layer.feature.properties.x; 
											var y = layer.feature.properties.y;
											
											var showData = parseFloat( val );
											
											if( isNaN( showData ) ){
												showData = "0";
											}
											
											var title = showData + "";
											
											var obj = layer.feature.info[0];
											obj[ obj.showData ] = val;
											
											layer.feature.info[0] = obj;
											
											if( showData <= 0 ){
												fillColor = "#F0FFF0";
											} else {
												fillColor = that.legend.getColor( showData, that.legend.valPerSlice[0] )[0];
											}
											
											if( $("#dataMode").val() == "bubble" ){
												var idx = 0;
												for (var i=0; i<that.legend.legendColor.length; i++) {
													if ( fillColor  == that.legend.legendColor[i]) {
														idx = i;
														break;
													}
												}
												
												var info = layer.feature.info[0];
												var data = info[info.showData];
												var unit = info.unit;
												var title;
												if (info.left_sep_ttip_title != undefined) {
													title = info.left_sep_ttip_title;
												}else {
													title = info.right_sep_ttip_title;
												}

												var toolTip  = "<div style='margin:10px;'>";
								    			toolTip += 		"<div style='font-size:14px;font-weight:bold;color:#3792de;'>"+ layer.feature.properties.adm_nm +"</div>";
								    			toolTip +=		"<div style='height:5px;'></div>";
								    			//코로나추가 20200731 jrj
								    			if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw" || window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE"){
								    				var covidDt = "("+$("#covid_month option:selected").val()+"."+$("#covid_day option:selected").val()+" 기준)";
								    				toolTip += "<div style='font-size:12px;padding-left:5px;'>"+title+covidDt+" : "+appendCommaToNumber(showData)+unit+"</div>";
								    			} else {
								    				toolTip += 		"<div style='font-size:12px;padding-left:5px;'>"+title+" : "+appendCommaToNumber(showData)+" ("+unit+")</div>";
								    			}
								    			toolTip += "</div>";
								    			
												var marker = that.addCircleMarker(x, y, {
													radius : that.legend.legendCircleRadius[idx],
													fillColor : fillColor,
													fillOpacity : layer.options.style.fillOpacity,
													color : layer.options.color,
													weight : layer.options.weight,
													tooltipMsg : toolTip,
													options : {
														idx : idx,
														data : showData
													}
												});

												marker.on({
													click : function(e){
														$(".covidDbTabs").hide();
														$(".dataSideBox").css("height","500px");
														that.adm_nm = layer.feature.properties.adm_nm;;
														that.tmpAdmCd = layer.feature.properties.adm_cd;
														that.getThemaMapDataboardData(layer.feature.properties.adm_cd);
														thematicCharts(layer.feature.properties.adm_cd);

														that.isFirstDraw = true;
//														that.selectedAdmCd = layer.feature.properties.adm_cd;
														that.makeCovidChart();
													}
												});
												
												if( $("#dataMode2").val() == "dataOn" ){
													that.checkShowCaption();
												}

												that.legend.circleMarkerGroup.push( marker );
											} else {
												layer.setStyle({
													weight : layer.options.weight,
													color : layer.options.color,
													dashArray : layer.options.dashArray,
													fillOpacity : layer.options.style.fillOpacity,
													fillColor : fillColor
												}); 

												if( $("#dataMode2").val() == "dataOn" ){
													layer.setCaption({title: title, color:"white"}, [x,y]);
												}
											}						
										});
										
										if( that.tmpAdmCd == "00" ){
											thematicCharts( adm_cd, true );
										}
									}
								} else {
									if(region == "auto"){
										//데이터에 adm_cd의 경우 공백이 뒤에 붙는경우도 봤음 나중에 버그있을시 확인
										if(adm_cd=="00"){
											that.openApiBoundarySido(that.bnd_year, function(geojson) {
												if (that.reqType == "1") {
													if(window.parent.$thematicMapMain.param.stat_thema_map_id == "QNj43PFUT220190612100733746ocaFOXLaj3" || window.parent.$thematicMapMain.param.stat_thema_map_id == "MmLSKu8PgQ20201022173339083sOVy6YCGQj"){
														if(!($("#pieChart").hasClass("on"))){
															thematicCharts(adm_cd, true);
														}
													}else{
														thematicCharts(adm_cd, true);
													}
												}else {
													if(window.parent.$thematicMapMain.param.stat_thema_map_id == "QNj43PFUT220190612100733746ocaFOXLaj3" || window.parent.$thematicMapMain.param.stat_thema_map_id == "MmLSKu8PgQ20201022173339083sOVy6YCGQj"){
														if(!($("#pieChart").hasClass("on"))){
															thematicCharts(adm_cd, false);
														}
													}else{
														thematicCharts(adm_cd, false);
													}
												}
											});
										}else{
											//that.openApiBoundaryHadmarea(adm_cd,that.bnd_year,  "1");//2019-04-19 박길섭
											that.openApiBoundaryHadmarea(adm_cd,that.bnd_year,  "1" , zoomLevel);//2019-04-19 박길섭
										}
									}else{
										//자동이 아니면 getRegionData에서 경계자료를 받는다.
										that.getRegionData(options, callback);
									} 
									
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
								addrCdToNm(parent.$thematicMapMain.themaInfo.base_year, adm_cd, logOptions);
								//코로나추가 20200722 주용민
							}
						} ,
						dataType: "json",
						error:function(e){}  
					});						
				};
				/** 통계 세부 데이터 조회 끝 **/

				/**
				 * 
				 * @name         : getThemaMapDataboardData
				 * @description  : 데이터 보드 수치 값 조회
				 * @date         : 2016. 03. 05. 
				 * @author	     : SseOk
				 * @history 	 : 
				 */
				this.getThemaMapDataboardData = function getThemaMapDataboardData(adm_cd){
					/** 2019-04-18 djlee 수정 시작 **/
					//코로나추가 20200722 주용민
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw"){
							var params = {
									thema_map_data_id : that.thema_map_data_id,
									databoard_adm_cd : adm_cd,
									gubun : "databoard"
							}
					}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "uHaX8JJqyh20201014110114231lgMgsJnINP"){
						var cancer_type_lv = $("#cancer_list a.on").attr("id").substr(-1,1);
						var params = {
								thema_map_data_id : that.thema_map_data_id,
								adm_cd : adm_cd,
								cancer_type_div_cd : cancer_type_lv
						}
					}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "MmLSKu8PgQ20201022173339083sOVy6YCGQj"){
						var icd_clst_nm = $("#infection_list a.on").text();
						var chart_disp_order = 0;
						var params = {
								thema_map_data_id : that.thema_map_data_id,
								adm_cd : adm_cd,
								icd_clst_nm : icd_clst_nm,
								chart_disp_order : chart_disp_order
						}
					}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "RZ3pr7Maou20201106160851389D0RGtYCGpW"){
						var weather_type_cd = "";
						if($("#leftValue").hasClass("on")){
							weather_type_cd = $("#weather_type1 a.on").attr("id").substr(-1,1);
						}else{
							weather_type_cd = $("#weather_type2 a.on").attr("id").substr(-1,1);
						}
						var params = {
								thema_map_data_id : that.thema_map_data_id,
								adm_cd : adm_cd,
								weather_type_cd  : weather_type_cd
						}
					}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "8mjCr1kWql20201123140825772vKMjQsNcRw"){
						if($("#bike1").hasClass("on")){
							that.thema_map_data_id = 'kosis_trmnl_bcycl_cnt_per';
						}else if($("#bike2").hasClass("on")){
							that.thema_map_data_id = 'kosis_hold_bcycl_cnt_per';
						}else if($("#bike3").hasClass("on")){
							that.thema_map_data_id = 'kosis_lend_acmslt_cnt_per';
						}
						var params = {
								thema_map_data_id : that.thema_map_data_id,
								databoard_adm_cd : adm_cd
						}
					}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "wPsSdFX8Wt20210520161423833UZjHClj5U3"){
						var caracc_type_cd = $("#caracc_type a.on").attr("id").substr(-1,1);
						var params = {
								thema_map_data_id : that.thema_map_data_id,
								adm_cd : adm_cd,
								databoard_adm_cd : adm_cd,
								caracc_type_cd  : caracc_type_cd
						}
					}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE"){
						if($("#leftValue").hasClass("on")){
//							var covid_vacc_cd = $("#vacc_type a.on").attr("id").substr(-1,1);
							var covid_vacc_cd = $("#vacc_type a.on").attr("id").substr(-2,1);
						}else if($("#rightValue").hasClass("on")){
//							var covid_vacc_cd = $("#vacc_type2 a.on").attr("id").substr(-1,1);
							var covid_vacc_cd = $("#vacc_type a.on").attr("id").substr(-1,1);
						}
						var params = {
								thema_map_data_id : that.thema_map_data_id,
								databoard_adm_cd : adm_cd,
								covid_vacc_cd : covid_vacc_cd,
								gubun : "databoard"
						}
					}else{
						var params = {
								thema_map_data_id : that.thema_map_data_id,
								databoard_adm_cd : adm_cd
						}
					//코로나추가 20200722 주용민
					}
					/** 2019-04-18 djlee 수정 시작 **/
					if( 'stat_biz_cnt,stat_employee_cnt,stat_whrtlsal_cnt_per,stat_srv_cnt_per,stat_mnfctur_cnt_per,stat_nonglim_fishry_cnt_per'.indexOf(that.thema_map_data_id) != -1) {
						params["base_year"] = $("#select_base_year").val(); 
						if($("#leftValue").hasClass("on") || $("#rightValue").hasClass("on")){
							params["type"] = "01"; 
						}
						if($("#etcValue").hasClass("on")){
							params["type"] = "02"; 
						}
					}
					if($(".select_quarter").hasClass("on")){
						$.ajax({
							type: "GET",
							url: contextPath + "/ServiceAPI/thematicMap/getThemaMapSafeAccident.json",
							async : false,
							data : {
								base_year : $("#select_base_year").val(),
								gubun : 1,
								period_div : 1
							},
							success: function(res) {
								if (res.errCd == "0") {
									//모든 년도가 있는 데이터
									var result = res.result.detailInfo;
									that.dataBoardData = res.result.detailInfo; 
								}
							} ,
							dataType: "json",
							error:function(e){}  
						});						
					}else if($(".select_monthly").hasClass("on")){
						$.ajax({
							type: "GET",
							url: contextPath + "/ServiceAPI/thematicMap/getThemaMapSafeAccident.json",
							async : false,
							data : {
								base_year : $("#select_base_year").val(),
								gubun : 1,
								period_div : 2
							},
							success: function(res) {
								if (res.errCd == "0") {
									//모든 년도가 있는 데이터
									var result = res.result.detailInfo;
									that.dataBoardData = res.result.detailInfo; 
								}
							} ,
							dataType: "json",
							error:function(e){}  
						});						
					}else{
						//코로나추가 20200722 주용민
						if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw" || window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE"){
							$.ajax({
								type: "GET",
								url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapData.json",
								async : false,
								data : params,
								success: function(res) {
									if (res.errCd == "0") {
										//모든 년도가 있는 데이터
										var result = res.result.detailInfo;
										that.dataBoardData = res.result.detailInfo; 
										thematicCharts($thematicMapFrame05.ui.mapList[0].tmpAdmCd);
									}
								} ,
								dataType: "json",
								error:function(e){}  
							});						
						}else{
							$.ajax({
								type: "GET",
								url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapData.json",
								async : false,
								data : params,
								success: function(res) {
									if (res.errCd == "0") {
										//모든 년도가 있는 데이터
										var result = res.result.detailInfo;
										that.dataBoardData = res.result.detailInfo; 
									}
								} ,
								dataType: "json",
								error:function(e){}  
							});						
						}
						//코로나추가 20200722 주용민
						/** 2019-04-18 djlee 수정 끝 **/
					}
				},
				
				this.mapClear = function(){
					
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
					
//					this.heatMap.setUTMKs([]);
					
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
					var base_year = $("#select_base_year").val();
					var quarter = $("#select_quarter").val();
					var monthly = $("#select_monthly").val();
					var period_div = "";
					var period_value = "";
					
					// 버블 삭제
					if (this.legend.circleMarkerGroup != null) {
			    		for (var i=0; i<this.legend.circleMarkerGroup.length; i++) {
				    		var marker = this.legend.circleMarkerGroup[i];
				    		marker.remove();
				    	}
			    		this.legend.circleMarkerGroup = null;
			    	}
					
					if($(".select_base_year").hasClass("on")){
						period_div = 0;
						period_value = "00";
					}else if($(".select_quarter").hasClass("on")){
						period_div = 1;
						period_value = quarter;
					}else if($(".select_monthly").hasClass("on")){
						period_div = 2;
						period_value = monthly;
					}
					
					$.ajax({
						type: "GET",
						url: contextPath + "/ServiceAPI/thematicMap/getThemaMapSafeAccidentChart.json",
						async : false,
						data : {
							base_year : base_year,
							period_div : period_div,
							period_value : period_value
						},
						success: function(res) {
							if (res.errCd == "0") {
								var result = res.result.resultInfo;
								var resultData = [];
								var innerData = [];
								var ChartObj = [];
								var totalCnt = 0;
								var totalPerCnt = 0;
								var cntArr = [];
								var perCntArr = [];
								for(var i=0; i<result.length; i++){
									if(result[i+1] == undefined){
										if(result[i].adm_cd == result[i-1].adm_cd){
											innerData.push(result[i]);
											resultData.push(innerData);
										}else{
											innerData = [];											
											innerData.push(result[i]);
											resultData.push(innerData);
										}
									}else if(result[i].adm_cd == result[i+1].adm_cd && result[i+1] != undefined){
										innerData.push(result[i]);
									}else if(result[i].adm_cd != result[i+1].adm_cd && result[i+1] != undefined){
										innerData.push(result[i]);
										resultData.push(innerData);
										innerData = [];
									}
								}
//								console.log(resultData);
								for(var i=0; i<resultData.length; i++){
									for(var j=0; j<resultData[i].length; j++){
										totalCnt+=parseInt(resultData[i][j].cnt);
										totalPerCnt+=parseInt(resultData[i][j].per_pop);
									}
									cntArr.push(totalCnt);
									perCntArr.push(totalPerCnt);
									ChartObj.push({"totalCnt" : cntArr[i], "totalPerCnt" : perCntArr[i] ,"resultData" : resultData[i], adm_cd : resultData[i][0].adm_cd, adm_nm : resultData[i][0].adm_nm});
									totalCnt = 0;
									totalPerCnt = 0;
								}
								
								
								//pie차트 크기설정을 위한 범례계산
								var corpData = [];
								var tmpCorpData = [];
								var pieCalcInfo;
								if($("#leftValue").hasClass("on")){
									for (var i=0;i <ChartObj.length; i++) {
										tmpCorpData.push(parseInt(ChartObj[i].totalCnt));
									}
								}else if($("#rightValue").hasClass("on")){
									for (var i=0;i <ChartObj.length; i++) {
										tmpCorpData.push(parseInt(ChartObj[i].totalPerCnt));
									}
								}
								corpData.push(tmpCorpData);
								that.legend.calculateLegend(corpData);
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
//								var pieChartWidth = [60, 70, 80, 90, 98, 106, 114];
								var pieChartWidth = [40, 50, 60, 70, 78, 86, 94];
								
//								var colorList = ["#ef356b","#f79339","#f7cb00","#b2cc19","#00b0f0","#0000FF","#9900FF"];
								var colorList = ["rgba(239,53,107,0.7)","rgba(247,147,57,0.7)","rgba(247,203,0,0.7)","rgba(178,204,25,0.7)","rgba(0,176,240,0.7)","rgba(0,0,255,0.7)","rgba(153,0,255,0.7)"];
								
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
										var tmpInnerData = [];
										for (var i=0; i<ChartObj.length; i++) {
											var tmpResult = ChartObj[i];
											if (tmpResult.adm_cd == layer.feature.properties.adm_cd) {
												var x_coord = layer.feature.properties.x;
												var y_coord = layer.feature.properties.y;
												var adm_cd = layer.feature.properties.adm_cd;
												var adm_nm = layer.feature.properties.adm_nm;
												if($("#leftValue").hasClass("on")){
													var calcInfo = that.legend.getColor(parseFloat(tmpResult.totalCnt), that.legend.valPerSlice[0]);
												}else if($("#rightValue").hasClass("on")){
													var calcInfo = that.legend.getColor(parseFloat(tmpResult.totalPerCnt), that.legend.valPerSlice[0]);
												}
												var width = pieChartWidth[calcInfo[1]];
												var margin = -(width/2) + "px";
												var marginTop = -(width/2)-15 + "px";
												
												var html = "";
												if(adm_cd == "39"){	//제주
													html  = "<div id='chart_"+adm_cd+"' style='width:80px;height:"+width+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:"+margin+";margin-top:"+margin+";'>";
													html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;height:6px;width:90px;text-shadow:-1px 0 white,0 1px white,1px 0 white,0 -1px #fff;'>"+adm_nm+"</div>";
													html += 	"<div id='pieChart_"+adm_cd+"' style='background-color:rgba(255,255,255,0);margin-left:15px;margin-top:7px;'></div>";
													html += "</div>";
												} else {
													html  = "<div id='chart_"+adm_cd+"' style='width:"+width+"px;height:"+width+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:"+margin+";margin-top:"+margin+";'>";
													if(adm_cd == "29"){
														html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;height:6px;width:90px;text-shadow:-1px 0 white,0 1px white,1px 0 white,0 -1px #fff;'>"+adm_nm+"</div>";
													}else if(adm_nm.length > 4){
														html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;height:6px;width:62px;text-shadow:-1px 0 white,0 1px white,1px 0 white,0 -1px #fff;'>"+adm_nm+"</div>";
													}else{
														html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;height:6px;text-shadow:-1px 0 white,0 1px white,1px 0 white,0 -1px #fff;'>"+adm_nm+"</div>";
													}
													html += 	"<div id='pieChart_"+adm_cd+"' style='background-color:rgba(255,255,255,0);margin-top:7px;'></div>";
													html += "</div>";
												}
												
												var icon = new sop.DivIcon({html:html, className: "pieChart-sido", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
												
												if(adm_cd == "23"){	// 인천
													x_coord = parseInt(x_coord) - 30000;
												} else if(adm_cd == "29"){	// 세종
													x_coord = parseInt(x_coord) - 8000;
													y_coord = parseInt(y_coord) + 16000;
												} else if(adm_cd == "31"){	// 경기도
													x_coord = parseInt(x_coord) + 38000;
												} else if(adm_cd == "32"){	// 강원도
													x_coord = parseInt(x_coord) + 50000;
												} else if(adm_cd == "33"){	// 충청북도
													x_coord = parseInt(x_coord) + 25000;
												} else if(adm_cd == "36"){	// 전라남도
													x_coord = parseInt(x_coord) + 30000;
//												} else if(adm_cd == "38"){	// 경상남도
//													x_coord = parseInt(x_coord) - 30000;
//													y_coord = parseInt(y_coord) + 20000;
												} else if(adm_cd == "39"){	// 제주
													x_coord = parseInt(x_coord) + 5000;
													y_coord = parseInt(y_coord) - 12000;
												} else if(adm_cd == "25"){	// 대전
													x_coord = parseInt(x_coord) + 8000;
													y_coord = parseInt(y_coord) - 13000;
												}else if(adm_cd == "34"){	// 충청남도
													x_coord = parseInt(x_coord) - 10000;
													y_coord = parseInt(y_coord) + 5000;
												}
												
												var	marker = sop.marker([ x_coord, y_coord ], {
														icon : icon,
														zindexOffset : 999
													});
												
												marker.addTo(that.gMap);
												var tooltipMsg = "<div class='techSidoTooltipBox'>";
												tooltipMsg += 	"<div class='tech_topbar'>"+adm_nm+"</div><br/>";
												tooltipMsg += 	"<table style='width:100% !important;height:100%;border:1px solid black;border-collapse:collapse;'>";
//												tooltipMsg += 	"<span class='tech_tit ico01'></span>";
												tooltipMsg += 	"<tr style='border:1px solid black;'>";
												tooltipMsg += 	"<td style='width:35%;text-align:center;border:1px solid black;font-size:14px;'><strong>사고유형</strong></td>";
												tooltipMsg += 	"<td style='width:18%;text-align:center;border:1px solid black;font-size:14px;'><strong>출동건수</strong></td>";
												tooltipMsg += 	"<td style='width:18%;text-align:center;border:1px solid black;font-size:14px;'><strong>백분율</strong></td>";
												tooltipMsg += 	"<td style='width:29%;text-align:center;border:1px solid black;font-size:14px;'><strong>십만명당 건수</strong></td>";
												tooltipMsg += 	"</tr>";
												
												
												for (var k=0; k<tmpResult.resultData.length; k++) {
													var data = tmpResult.resultData[k];
														tooltipMsg += 	"<tr style='border:1px solid black;'>";
														tooltipMsg += 		"<td style='border:1px solid black;height:25px;font-size:14px;'><div style='margin-left:3px;background-color:" + colorList[k]+ ";width:15px;height:15px;border-radius:75px;float:left;margin-top:2px;'></div><div style='position:absolute;margin-left:23px;'>"+ data.up_cd_nm +"</div></td>";
														tooltipMsg +=       "<td style='text-align:center;border:1px solid black;font-size:14px;'>" + appendCommaToNumber(data.cnt) + "</td>";
														tooltipMsg += 		"<td style='text-align:center;border:1px solid black;font-size:14px;'>" + (data.cnt/tmpResult.totalCnt*100).toFixed(1) + "%</td>";
														tooltipMsg += 		"<td style='text-align:center;border:1px solid black;font-size:14px;'>" + appendCommaToNumber(data.per_pop) + "</td>";
														tooltipMsg +=	"</tr>";
												}
												tooltipMsg +="	</table>";
												tooltipMsg +="</div>";
												
												marker.bindInfoWindow(tooltipMsg);
												
//												//파이차트 데이터 생성
												for (var k=0; k<tmpResult.resultData.length; k++) {
													var data = tmpResult.resultData[k];
													tmpData.push({
														name : "생활안전사고",
														y : parseFloat(data.cnt),
														color : colorList[k]
													});
												}
												
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
										            			marker.openInfoWindow();
										            		}
										            	},
										                width : width,
										                height : width,
										                backgroundColor:'rgba(255, 255, 255, 0)',
//														margin : [-3, 0, 0, 0]
														spacing : [-15, -10, -15, -10]
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
				},
				
				this.infectionPieChart = function(){
					
					var that = this;
					var base_year = $('#select_base_year option:selected').val();
					var icd_clst_nm = $("#infection_list a.on").text();
					var chart_disp_order = 7;
					
					// 버블 삭제
					if (this.legend.circleMarkerGroup != null) {
						for (var i=0; i<this.legend.circleMarkerGroup.length; i++) {
							var marker = this.legend.circleMarkerGroup[i];
							marker.remove();
						}
						this.legend.circleMarkerGroup = null;
					}
					
					$.ajax({
						type: "GET",
						url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapData.json",							
						async : false,
						data : {
							thema_map_data_id : 'infection_data',
							adm_cd : '00',
							base_year : base_year,
							area_type : 'auto',
							icd_clst_nm : icd_clst_nm,
							chart_disp_order : chart_disp_order
						},
						success: function(res) {
							if (res.errCd == "0") {
								for(var i=0;i<res.result.detailInfo.length;i++){
									if(res.result.detailInfo[i].adm_cd == "99"){
										var idx = res.result.detailInfo.indexOf(res.result.detailInfo[i]);
										res.result.detailInfo.splice(idx,1);
										i--;
									}
								}
								var result = res.result.detailInfo;
								var resultData = [];
								var innerData = [];
								var ChartObj = [];
								var totalCnt = 0;
								var totalPerCnt = 0;
								var cntArr = [];
								var perCntArr = [];
								for(var i=0; i<result.length; i++){
									if(result[i+1] == undefined){
										if(result[i].adm_cd == result[i-1].adm_cd){
											innerData.push(result[i]);
											resultData.push(innerData);
										}else{
											innerData = [];											
											innerData.push(result[i]);
											resultData.push(innerData);
										}
									}else if(result[i].adm_cd == result[i+1].adm_cd && result[i+1] != undefined){
										innerData.push(result[i]);
									}else if(result[i].adm_cd != result[i+1].adm_cd && result[i+1] != undefined){
										innerData.push(result[i]);
										resultData.push(innerData);
										innerData = [];
									}
								}
//								console.log(resultData);
								for(var i=0; i<resultData.length; i++){
									for(var j=0; j<resultData[i].length; j++){
										totalCnt+=parseInt(resultData[i][j].left_data_val);
//										totalPerCnt+=parseInt(resultData[i][j].per_pop);
									}
									cntArr.push(totalCnt);
//									perCntArr.push(totalPerCnt);
//									ChartObj.push({"totalCnt" : cntArr[i], "totalPerCnt" : perCntArr[i] ,"resultData" : resultData[i], adm_cd : resultData[i][0].adm_cd});
									ChartObj.push({"totalCnt" : cntArr[i],"resultData" : resultData[i], adm_cd : resultData[i][0].adm_cd});
									totalCnt = 0;
//									totalPerCnt = 0;
								}
								
								
								//pie차트 크기설정을 위한 범례계산
								var corpData = [];
								var tmpCorpData = [];
								var pieCalcInfo;
//								if($("#leftValue").hasClass("on")){
									for (var i=0;i <ChartObj.length; i++) {
										tmpCorpData.push(parseInt(ChartObj[i].totalCnt));
									}
//								}else if($("#rightValue").hasClass("on")){
//									for (var i=0;i <ChartObj.length; i++) {
//										tmpCorpData.push(parseInt(ChartObj[i].totalPerCnt));
//									}
//								}
								corpData.push(tmpCorpData);
								that.legend.calculateLegend(corpData);
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
//								var pieChartWidth = [60, 70, 80, 90, 98, 106, 114];
								var pieChartWidth = [40, 50, 60, 70, 78, 86, 94];
								
//								var colorList = ["#ef356b","#f79339","#f7cb00","#b2cc19","#00b0f0","#0000FF","#9900FF"];
								var colorList = ["rgba(239,53,107,0.7)","rgba(247,147,57,0.7)","rgba(247,203,0,0.7)","rgba(178,204,25,0.7)","rgba(0,176,240,0.7)","rgba(0,0,255,0.7)","rgba(153,0,255,0.7)"];
								
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
										var tmpInnerData = [];
										for (var i=0; i<ChartObj.length; i++) {
											var tmpResult = ChartObj[i];
											if (tmpResult.adm_cd == layer.feature.properties.adm_cd) {
												var x_coord = layer.feature.properties.x;
												var y_coord = layer.feature.properties.y;
												var adm_cd = layer.feature.properties.adm_cd;
												var adm_nm = layer.feature.properties.adm_nm;
//												if($("#leftValue").hasClass("on")){
													var calcInfo = that.legend.getColor(parseFloat(tmpResult.totalCnt), that.legend.valPerSlice[0]);
//												}else if($("#rightValue").hasClass("on")){
//													var calcInfo = that.legend.getColor(parseFloat(tmpResult.totalPerCnt), that.legend.valPerSlice[0]);
//												}
												var width = pieChartWidth[calcInfo[1]];
												var margin = -(width/2) + "px";
												var marginTop = -(width/2)-15 + "px";
												
												var html = "";
												if(adm_cd == "39"){	//제주
													html  = "<div id='chart_"+adm_cd+"' style='width:80px;height:"+width+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:"+margin+";margin-top:"+margin+";'>";
													html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;height:6px;width:90px;text-shadow:-1px 0 white,0 1px white,1px 0 white,0 -1px #fff;'>"+adm_nm+"</div>";
													html += 	"<div id='pieChart_"+adm_cd+"' style='background-color:rgba(255,255,255,0);margin-left:15px;margin-top:7px;'></div>";
													html += "</div>";
												} else {
													html  = "<div id='chart_"+adm_cd+"' style='width:"+width+"px;height:"+width+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:"+margin+";margin-top:"+margin+";'>";
													if(adm_cd == "29"){
														html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;height:6px;width:90px;text-shadow:-1px 0 white,0 1px white,1px 0 white,0 -1px #fff;'>"+adm_nm+"</div>";
													}else if(adm_nm.length > 4){
														html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;height:6px;width:62px;text-shadow:-1px 0 white,0 1px white,1px 0 white,0 -1px #fff;'>"+adm_nm+"</div>";
													}else{
														html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;height:6px;text-shadow:-1px 0 white,0 1px white,1px 0 white,0 -1px #fff;'>"+adm_nm+"</div>";
													}
													html += 	"<div id='pieChart_"+adm_cd+"' style='background-color:rgba(255,255,255,0);margin-top:7px;'></div>";
													html += "</div>";
												}
												
												var icon = new sop.DivIcon({html:html, className: "pieChart-sido", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
												
												if(adm_cd == "23"){	// 인천
													x_coord = parseInt(x_coord) - 30000;
												} else if(adm_cd == "29"){	// 세종
													x_coord = parseInt(x_coord) - 8000;
													y_coord = parseInt(y_coord) + 16000;
												} else if(adm_cd == "31"){	// 경기도
													x_coord = parseInt(x_coord) + 38000;
												} else if(adm_cd == "32"){	// 강원도
													x_coord = parseInt(x_coord) + 50000;
												} else if(adm_cd == "33"){	// 충청북도
													x_coord = parseInt(x_coord) + 25000;
												} else if(adm_cd == "36"){	// 전라남도
													x_coord = parseInt(x_coord) + 30000;
//												} else if(adm_cd == "38"){	// 경상남도
//													x_coord = parseInt(x_coord) - 30000;
//													y_coord = parseInt(y_coord) + 20000;
												} else if(adm_cd == "39"){	// 제주
													x_coord = parseInt(x_coord) + 5000;
													y_coord = parseInt(y_coord) - 12000;
												} else if(adm_cd == "25"){	// 대전
													x_coord = parseInt(x_coord) + 8000;
													y_coord = parseInt(y_coord) - 13000;
												}else if(adm_cd == "34"){	// 충청남도
													x_coord = parseInt(x_coord) - 10000;
													y_coord = parseInt(y_coord) + 5000;
												}
												
												var	marker = sop.marker([ x_coord, y_coord ], {
													icon : icon,
													zindexOffset : 999
												});
												
												marker.addTo(that.gMap);
												var tooltipMsg = "<div class='techSidoTooltipBox'>";
												tooltipMsg += 	"<div class='tech_topbar' style='margin-left:35px;'>"+adm_nm+"</div><br/>";
												tooltipMsg += 	"<table style='width:100% !important;height:100%;border:1px solid black;border-collapse:collapse;'>";
//												tooltipMsg += 	"<span class='tech_tit ico01'></span>";
												tooltipMsg += 	"<tr style='border:1px solid black;'>";
												tooltipMsg += 	"<td style='width:50%;text-align:center;border:1px solid black;font-size:14px;'><strong>감염병</strong></td>";
												tooltipMsg += 	"<td style='width:25%;text-align:center;border:1px solid black;font-size:14px;'><strong>발생건수</strong></td>";
												tooltipMsg += 	"<td style='width:25%;text-align:center;border:1px solid black;font-size:14px;'><strong>백분율</strong></td>";
												tooltipMsg += 	"</tr>";
												
												
												for (var k=0; k<tmpResult.resultData.length; k++) {
													var data = tmpResult.resultData[k];
													tooltipMsg += 	"<tr style='border:1px solid black;'>";
													tooltipMsg += 		"<td style='border:1px solid black;height:25px;font-size:14px;'><div style='margin-left:3px;background-color:" + colorList[k]+ ";width:15px;height:15px;border-radius:75px;float:left;margin-top:2px;'></div><div style='margin-left:23px;'>"+ data.icd_diss_nm +"</div></td>";
													tooltipMsg +=       "<td style='text-align:center;border:1px solid black;font-size:14px;'>" + appendCommaToNumber(data.left_data_val) + "</td>";
													tooltipMsg += 		"<td style='text-align:center;border:1px solid black;font-size:14px;'>" + (data.left_data_val/tmpResult.totalCnt*100).toFixed(2) + "%</td>";
													tooltipMsg +=	"</tr>";
												}
												tooltipMsg +="	</table>";
												tooltipMsg +="</div>";
												
//												marker.bindInfoWindow(tooltipMsg);
												
//												//파이차트 데이터 생성
												for (var k=0; k<tmpResult.resultData.length; k++) {
													var data = tmpResult.resultData[k];
													tmpData.push({
														name : "감염병발생현황",
														y : parseFloat(data.left_data_val),
														color : colorList[k]
													});
												}
												
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
//																marker.openInfoWindow();
																$(".thematicCharts").empty().css({"margin-top":"70px","height":"280px"});
																$(".thematicCharts").append(tooltipMsg);
																$(".thematicBotText").show();
															}
														},
														width : width,
														height : width,
														backgroundColor:'rgba(255, 255, 255, 0)',
//														margin : [-3, 0, 0, 0]
														spacing : [-15, -10, -15, -10]
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
				},
				
				/**
				 * 
				 * @name         : changeRegionBound
				 * @description  : 주제도 설정 - 지역경계를 설정한다, 연도를 변경한다.
				 * @date         : 2015. 11. 16. 
				 * @author	     : 
				 * @history 	 :
				 */
				this.changeRegionBound = function( monthChange ){
					that.monthChange = monthChange;
					$(".sop-overlay-pane>svg>g").show();//20년수정반영
					var map1 = $thematicMapFrame05.ui.mapList[0];

					//코로나지표가 아닐경우 경계를 지움
					if( window.parent.$thematicMapMain.param.stat_thema_map_id != "sAXkcVzk5V202007141335257355ued9032uw" && window.parent.$thematicMapMain.param.stat_thema_map_id != "kmOpHLH5cK202106100936161097g5G9nLCFE" ){
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
					}
					
					//수/율일 경우는 기존 id로 증감률일 때는 분할맵 id로 변경
					if (that.add_data_disp_yn == "Y" && $("#etcValue").hasClass("on")) {
						that.thema_map_data_id = that.initData.sep_map_data_id;
					}else {
						that.thema_map_data_id = that.initData.thema_map_data_id;
					}

					//경계 데이터를 지운다.
					that.regionData = null;
					
					that.markers.clearLayers();
					that.poiAdmCd = "";
					$thematicMapFrame05.ui.poiInfoArray = [];
					
					//자동
					if($("#selectValue2").val()=="auto"){
						if( window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw" || window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE" ){
							that.getThemaMapData(that.thema_map_data_id, that.tmpAdmCd );
						}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "uHaX8JJqyh20201014110114231lgMgsJnINP"){
//							var cancer_type_lv = $("#cancer_list a.on").attr("id");
//							that.getThemaMapData("cancer_data","00",cancer_type_lv.substr(-1,1));
							that.getThemaMapData("cancer_data","00");
						}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "8mjCr1kWql20201123140825772vKMjQsNcRw"){
							if($("#bike1").hasClass("on")){
								that.thema_map_data_id = 'kosis_trmnl_bcycl_cnt_per';
							}else if($("#bike2").hasClass("on")){
								that.thema_map_data_id = 'kosis_hold_bcycl_cnt_per';
							}else if($("#bike3").hasClass("on")){
								that.thema_map_data_id = 'kosis_lend_acmslt_cnt_per';
							}
							that.getThemaMapData(that.thema_map_data_id,"00");
							//공영자전거 운영 현황
						}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "wPsSdFX8Wt20210520161423833UZjHClj5U3" && $("#caracc_occur_point").hasClass("on")){
							that.carAccident();
					    }else {
							if(window.parent.$thematicMapMain.param.stat_thema_map_id == "MmLSKu8PgQ20201022173339083sOVy6YCGQj"){
								$("#timeSeries_type").css("display","none");
								if($("#pieChart").hasClass("on")){
									$(".thematicCharts").empty();
									$(".thematicCharts").html("<div style='text-align:center;'>※ 파이차트 클릭 시 해당 지역의 감염병 발생 건 수와</div><div style='margin-top:5px;text-align:center;'>비율을 확인할 수 있습니다.</div>").css("margin-top","195px");
									$(".thematicTopText,.thematicBotText").hide();
								}
							}
							that.isReloadMode = true;
							that.openApiReverseGeoCode(that.center,that.bnd_year);
						}
						
						$("#timeSeries_type").hide();
						
						//2017.03.30 시도/시군구/읍면동별 전국지도일 경우 그래프 이슈
						$(".thematicCharts").show();
						$("#graph_help_text").hide();
						if (!$(".interactiveDataBoard").hasClass("on")) {
							$(".interactiveDataBoard").click();
						}
								
					}
					//시도별 통계지도
					else if($("#selectValue2").val()=="1"){
						//코로나추가 20200722 주용민	
//						if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw"){
//							that.getThemaMapData(that.thema_map_data_id,that.tmpAdmCd);
//							that.openApiReverseGeoCode(that.center,that.bnd_year);
						//코로나추가 20200722 주용민
//						}else{
							$('#themaInit_'+that.legend.id).trigger("click");
							if(window.parent.$thematicMapMain.param.stat_thema_map_id == "uHaX8JJqyh20201014110114231lgMgsJnINP"){
//								var cancer_type_lv = $("#cancer_list a.on").attr("id");
//								that.getThemaMapData("cancer_data","00",cancer_type_lv.substr(-1,1));
								that.getThemaMapData("cancer_data","00");
								//공영자전거 운영 현황
							}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "8mjCr1kWql20201123140825772vKMjQsNcRw"){
								if($("#bike1").hasClass("on")){
									that.thema_map_data_id = 'kosis_trmnl_bcycl_cnt_per';
								}else if($("#bike2").hasClass("on")){
									that.thema_map_data_id = 'kosis_hold_bcycl_cnt_per';
								}else if($("#bike3").hasClass("on")){
									that.thema_map_data_id = 'kosis_lend_acmslt_cnt_per';
								}
								that.getThemaMapData(that.thema_map_data_id,"00");
								//공영자전거 운영 현황
							}else{
								that.getThemaMapData(that.thema_map_data_id,"00");
							}
							if (that.add_data_disp_yn == "Y" && $("#etcValue").hasClass("on")) {
								$("#timeSeries_type").hide();
								
								// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
	//							$('.sqListBox.sq03 .sqList').css("height","185px"); //2017.03.17 증감에서 수일때 통계표출 항목이 안보이는 문제
								// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
							}else {
								$("#timeSeries_type").show();
								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "QNj43PFUT220190612100733746ocaFOXLaj3"){
									// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
	//								$(".sqListBox.sq03 .sqList").css("height","320px");
									// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
									
									$("#timeSeries_type").css("display","none");
								}
								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "wPsSdFX8Wt20210520161423833UZjHClj5U3"){
									$("#timeSeries_type").css("display","none");
								}
	//							}else{
									// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
	//								$('.sqListBox.sq03 .sqList').css("height","280px"); //2017.03.17 증감에서 수일때 통계표출 항목이 안보이는 문제								
									// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
	//							}
							}
							
							that.openApiReverseGeoCode(that.center,that.bnd_year);
							
							//2017.03.30 시도/시군구/읍면동별 전국지도일 경우 그래프 이슈
						//20년수정반영 시작
						if(!that.isChartClick){
							$(".thematicCharts").hide();
							$(".dscList1").hide();
							$("#graph_help_text").show();
							$(".interactiveDataBoard").addClass("on");
							$(".interactiveDataBoard").click();
						}
						that.isChartClick = false;
						//20년수정반영 끝
					}
					//시군구별 통계지도
					else if($("#selectValue2").val()=="2"){
						$('#themaInit_'+that.legend.id).trigger("click");
						that.getThemaMapData(that.thema_map_data_id,that.curSidoCd);
						$("#timeSeries_type").hide();
						
						//2017.03.17 증감에서 수일때 통계표출 항목이 안보이는 문제
						if ($("#etcValue").hasClass("on")) {
							// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
//							$('.sqListBox.sq03 .sqList').css("height","185px");
							// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
						}else {
							// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
//							$('.sqListBox.sq03 .sqList').css("height","230px");
							// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
						}
						
						that.openApiReverseGeoCode(that.center,that.bnd_year);
						
						//2017.03.30 시도/시군구/읍면동별 전국지도일 경우 그래프 이슈
						//20년수정반영 시작
						if(!that.isChartClick){
							$(".thematicCharts").hide();
							$(".dscList1").hide();
							$("#graph_help_text").show();
							if(!(window.parent.$thematicMapMain.param.stat_thema_map_id == "wPsSdFX8Wt20210520161423833UZjHClj5U3" && $("#top_bottom_on").hasClass("on"))){
								$(".interactiveDataBoard").addClass("on");
								$(".interactiveDataBoard").click();
							}
						}
						that.isChartClick = false;
						//20년수정반영 끝
					}
					//읍면동별 통계지도
					else if($("#selectValue2").val()=="3"){
						$('#themaInit_'+that.legend.id).trigger("click");
						that.getThemaMapData(that.thema_map_data_id,that.curSidoCd + that.curSiggCd);
						$("#timeSeries_type").hide();
						
						//2017.03.17 증감에서 수일때 통계표출 항목이 안보이는 문제
						if ($("#etcValue").hasClass("on")) {
							// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
//							$('.sqListBox.sq03 .sqList').css("height","185px");
							// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
						}else {
							// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
//							$('.sqListBox.sq03 .sqList').css("height","230px");
							// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
						}
						
						that.openApiReverseGeoCode(that.center,that.bnd_year);
						
						//2017.03.30 시도/시군구/읍면동별 전국지도일 경우 그래프 이슈
						//20년수정반영 시작
						if(!that.isChartClick){
							$(".thematicCharts").hide();
							$(".dscList1").hide();
							$("#graph_help_text").show();
							$(".interactiveDataBoard").addClass("on");
							$(".interactiveDataBoard").click();
						}
						that.isChartClick = false;
						//20년수정반영 끝
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

				this.getRegionData = function(options, callback){
					var selectYear = this.bnd_year;
					var region = $("#selectValue2").val();
					var count = "";								
					var startSeq = 0;
					var endSeq = 0;
					
					// 지진
					if(parseInt(selectYear) <= 2017 && window.parent.$thematicMapMain.param.stat_thema_map_id == "41d1dhxBgx20180627145739008kXnl0kFaa8") {
						selectYear = '2016';
					}
										
					switch(parseInt(region)) {
						//전국시도
						case 1:
							$.ajax({
								type: "GET",
								url: contextPath + "/ServiceAPI/thematicMap/GetRegionData.geojson",
								async : false,
								data : {
									base_year : selectYear,
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
										that.setPolygonDataGeojson(res, "normal", undefined, options, callback);
										
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
//							if(!($("#select_base_year >option:selected").text() > 2010 && $("#select_base_year >option:selected").text() < 2015)){
//							if(!(selectYear > 2010 && selectYear < 2015)){							
								that.openApiBoundaryHadmarea2("11", selectYear,  "999", "0", that.thema_atdrc_yn, that.bounds);
								$("#themaNoticeText").show();
//							}else{
//								$.ajax({
//									type: "GET",
//									url: contextPath + "/ServiceAPI/thematicMap/GetRegionDataCount.json",
//									async : false,
//									data : {
//										base_year : selectYear,
//										region : region									 										  
//									},
//									success: function(res) {
//										if (res.errCd == "0") {
//											count = res.result; 
//											var dividedNum = Math.ceil(count/10);
//											for(that.i=1;that.i<11;that.i++){
//												startSeq=endSeq+1; // 1
//												if(that.i==10){
//													endSeq=count;	
//												}else{
//													endSeq=startSeq+dividedNum-1; //8
//												}
//		
//												$.ajax({
//													type: "GET",
//													url: contextPath + "/ServiceAPI/thematicMap/GetRegionData.geojson",
//													async : false,
//													data : {
//														base_year : selectYear,
//														region : region,
//														startSeq : startSeq,
//														endSeq : endSeq,
//														atdrc_yn : that.thema_atdrc_yn
//													},
//													success: function(res) {
//														if (res.errCd == "0") {
//															if(region=="1"){
//																res["pAdmCd"] = "00";
//															}else if(region=="2"){
//																res["pAdmCd"] = that.curSidoCd;
//															}else if(region=="3"){
//																res["pAdmCd"] = that.curSidoCd + that.curSiggCd;
//															}
//															//regionData에 현재 경계데이터를 넣어준다.
//															// 통계선택 및 지도유형이 바뀔때 경계데이타를 재사용해야한다.
//		
//															that.legend.numberData = false;
//															that.setPolygonDataGeojson(res, "multi", that.i);
//														}
//													},								  
//													dataType: "json",
//													error:function(e){}  
//												});	
//											}
//										}
//									},									 
//									dataType: "json",
//									error:function(e){}  
//								});
//							}
//							// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
//							if(that.topBottomState == "ON") {
//								that.showTopBottomDataOnly("ON", true);
//							}
//							// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
							
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
					if(that.i == 10){
						that.i = 1;
					}
					//Count 끝

				};
				
				this.reqEmgReigon = function (type, data, index) {
					var sidoCd = data[index].sido_cd;
					var selectYear = $("#select_base_year").val();
					$.ajax({
						type: "GET",
						// 2017. 03. 29 오류 수정
						url: contextPath + "/js/data/geo_emdong_" + that.bnd_year + "/geo_emd_"+sidoCd+"_" + that.bnd_year + ".js",
						//url: contextPath + "/ServiceAPI/thematicMap/GetRegionData.geojson",
						async : false,
						data : {
							base_year : that.bnd_year,
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
				
				/**
				 * 
				 * @name         : timeSeriesPlay
				 * @description  : 시계열 조회를 시작/중지한다.
				 * @date         : 2016. 07. 12. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */
				this.timeSeriesPlay = function(bool) {
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "QNj43PFUT220190612100733746ocaFOXLaj3"){
						$("#base_year a").removeClass("on");
						$(".select_base_year").addClass("on");
//						$("#select_quarter,#select_monthly").hide();
					}
					this.isTimeSeries = bool;
					var totalCnt = $("#select_base_year option").size();
					if (bool) {
						var idx = 0;
						this.reqTimeSeriesData(idx, totalCnt);
					}
				};
				
				/**
				 * 
				 * @name         : reqTimeSeriesData
				 * @description  : 시계열 정보를 조회한다.
				 * @date         : 2016. 07. 13. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */
				this.reqTimeSeriesData = function(idx, totalCnt) {
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "8mjCr1kWql20201123140825772vKMjQsNcRw"){
						if($("#bike1").hasClass("on")){
							that.thema_map_data_id = 'kosis_trmnl_bcycl_cnt_per';
						}else if($("#bike2").hasClass("on")){
							that.thema_map_data_id = 'kosis_hold_bcycl_cnt_per';
						}else if($("#bike3").hasClass("on")){
							that.thema_map_data_id = 'kosis_lend_acmslt_cnt_per';
						}
					}
					var year = $("#select_base_year option").eq(idx).val();
					var options = {
							year : year,
							totalCnt : totalCnt,
							idx : idx
					};
					this.getThemaMapData(that.thema_map_data_id, "00", options, function(layers, options) {
						if (options.idx == options.totalCnt-1) {
							$thematicMapFrame05.Popup.close();
							//2017.03.17 시계열 범례고정 수정 
							that.setLegendForStatsData();
							layer = layers.sort(function (a, b) { 
								return parseInt(a.year) - parseInt(b.year); 
							});
							var cnt = 0;
							
							that.timer = setInterval(function() {
								if (that.dataGeojson) {
									that.dataGeojson.remove();
								}
								that.addPolygonGeoJson(layers[cnt], "data");
								that.checkShowCaption();
								that.multiLayerControl.dataGeojson = null;
								if($('#dataMode').val()=='bubble'){			
									$('#lgTypeList_'+that.legend.id+' a:eq(2)').trigger("click");
								}else{
									$('#lgTypeList_'+that.legend.id+' a:eq(1)').trigger("click");
								}
								$("#select_base_year").val(layers[cnt].year);
								cnt++;
								if (cnt == layers.length) {
									cnt = 0;
								}
								//지진
								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "41d1dhxBgx20180627145739008kXnl0kFaa8"){
									that.getEarthquake();
								}
								
							},2000);
						}else {
							var idx = options.idx;
							idx++;
							that.reqTimeSeriesData(idx, options.totalCnt);
						}
					});
				};
				

				this.multiLayerControl = {
						multiData : null,
						dataGeojson : null
				};
				
				this.periodClick = function(that){
					var pId = $("#"+that+"");
					var pClass = $("."+that+"");
					$("#base_year a").removeClass("on");
					pClass.addClass("on");
					$("#select_quarter,#select_monthly").hide();
					pId.show();
					$thematicMapFrame05.Popup.show();$thematicMapFrame05.ui.mapList[0].changeRegionBound();
				};
				
				this.makeMonth = function(){
					$("#select_base_year_2").remove();
					var output5 = "";
					$.ajax({
						type: "GET",
						url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapBaseYear.json",
						async : false,
						data : {
							type : "4",
							thema_map_data_id : "credit_card_amount",
							left_year : $("#select_base_year").val()
						},
						success: function(res) {
							if (res.errCd == "0") {
								var list1 = new Array(); 
								for(var i=0;i<res.result.detailInfo.length;i++){
									if(res.result.detailInfo[i].base_year != '9016'){
										list1.push(res.result.detailInfo[i].base_year);
									}
								}
								output5 += '<select id="select_base_year_2" onchange="javascript:$thematicMapFrame05.ui.mapList[0].changeRegionBound()">';
								
								for(var i=0;i<list1.length-1;i++){
									output5 += '<option value='+list1[i]+'>';
									output5 += list1[i]+"월";
									output5 += '</option>';
								}
								output5 += '<option selected="true" value='+list1[list1.length-1]+'>'+list1[i]+"월"+'</option>';
								$("#base_year").append(output5);
							}
						}
					});
				}
				this.covidMonth = function(){
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw" ){
						var cvd_type = "51";
						var cvd_data_id = "covid19_status";
					}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE"){
						var cvd_type = "52";
						var cvd_data_id = "covid19_vacc_data";
					}
					$("#covid_month").remove();
					var covidHtml = "";
					$.ajax({
						type: "GET",
						url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapBaseYear.json",
						async : false,
						data : {
							type : cvd_type,
							thema_map_data_id : cvd_data_id,
							left_year : $("#select_base_year").val()
						},
						success: function(res) {
							if (res.errCd == "0") {
								var list = new Array(); 
								for(var i=0;i<res.result.detailInfo.length;i++){
									list.push(res.result.detailInfo[i].base_month);										
								}
								covidHtml += '<select id="covid_month" onchange="javascript:$thematicMapFrame05.ui.mapList[0].covidDay();$thematicMapFrame05.ui.mapList[0].changeRegionBound(true);">';
								
								for(var i=0;i<list.length-1;i++){
									covidHtml += '<option value='+list[i]+'>';
									covidHtml += list[i]+"월";
									covidHtml += '</option>';
								}
								covidHtml += '<option selected="true" value='+list[list.length-1]+'>'+list[list.length-1]+"월"+'</option>';
								covidHtml += '</select>';
								$("#base_year").append(covidHtml);
								that.covidLastMonth = list[list.length-1];
								that.covidDay();
							}
						}
					});
				}
				//코로나추가 20200722 주용민
				this.covidDay = function(){
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw" ){
						var cvd_type = "6";
						var cvd_data_id = "covid19_status";
					}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE"){
						var cvd_type = "61";
						var cvd_data_id = "covid19_vacc_data";
					}
					$("#covid_day").remove();
					var covidHtml = "";
					$.ajax({
						type: "GET",
						url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapBaseYear.json",
						async : false,
						data : {
							type : cvd_type,
							thema_map_data_id : cvd_data_id,
							left_year : $("#select_base_year").val(),
							left_month : $("#covid_month").val()
						},
						success: function(res) {
							if (res.errCd == "0") {
								var list = new Array(); 
								for(var i=0;i<res.result.detailInfo.length;i++){
									list.push(res.result.detailInfo[i].base_day);										
								}
								covidHtml += '<select id="covid_day" onchange="javascript:$thematicMapFrame05.ui.mapList[0].changeCovidDay()">';
								
								for(var i=0;i<list.length-1;i++){
									covidHtml += '<option value='+list[i]+'>';
									covidHtml += list[i]+"일";
									covidHtml += '</option>';
								}
								
								covidHtml += '<option selected="true" value='+list[list.length-1]+'>'+list[i]+"일"+'</option>'
								
								that.covidMonthLastDay = list[i];
								if( !that.covidLastDay ){
									that.covidLastDay = list[i];
								}
								
								$("#base_year").append(covidHtml);
								
								if( !that.covidPlayYn ){
									that.covidPlayMonth = $("#covid_month").val();
									that.dateCalc();
								}
								
							}
						}
					});
				}
				
				this.changeCovidDay = function(){
					if( !this.covidPlayYn){
						this.covidItem = this.dateCalc();
						this.covidPlayMonth = $("#covid_month").val();
						
						this.changeRegionBound(true);
					}
				};
				
				this.covid = function(){
					var part = $("#covid_type a.on").text();
						$.ajax({
							type: "GET",
							url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapData.json",
							async : false,
							data : {
								thema_map_data_id : 'covid19_status',
								adm_cd : '00',
								area_type : 'auto',
								gubun : 'tooltip',
								part : part
							},
							success: function(res) {
								if (res.errCd == "0") {
									$thematicMapFrame05.ui.removeCovidMarker();
									$thematicMapFrame05.ui.addCovidMarker(res.result.detailInfo);
								}
							} ,
							dataType: "json",
							error:function(e){}  
						});	
					},
					
					//코로나추가 20200727 jrj
					this.dateCalc = function(){
						
						var selMonth = Number( $("#covid_month >option:selected").val() );
						var item = {};
						
						var today = new Date();
						var curYear = today.getFullYear();
						var curMonth = today.getMonth()+1;
						
						var selYear = Number( $("#select_base_year >option:selected").val() );

						var lastDate = new Date( curYear, curMonth, 0 );		//현재 월 말일

						selMonth = ( selMonth < 10 ? '0' : '' ) + selMonth;
						
						var startTime = Date.UTC( selYear, selMonth-1, 1 );
						var startDt = ( selYear+''+selMonth+'01' );
						
						//선택된 월이 현재 월과 같고 오늘 일자가 현재 월의 마지막 일자와 다를 때
						if( ( selYear == curYear ) && ( Number(selMonth) == Number(curMonth) ) && ( Number(that.covidMonthLastDay) != Number(lastDate) ) ){
							var curDt = new Date( curYear, curMonth, that.covidMonthLastDay );
							curDt.setDate( curDt.getDate() - 29 );

							var startYear = curDt.getFullYear();
							
							var startMonth = curDt.getMonth();
							if( startMonth == "00" || startMonth == 0 ){
								startMonth = "12";
								startYear = startYear-1;
							}
							startMonth = ( startMonth < 10 ? '0':'')+startMonth;
														
							that.covidPrevMonth = startMonth;
							
							var startDay = (curDt.getDate());
							startDay = ( startDay < 10 ? '0':'')+startDay;
							
							that.covidPrevDay = startDay;
							
							startDt = startYear+''+startMonth+''+startDay;
							startTime = Date.UTC( startYear, startMonth-1, startDay );
						} else {
							that.covidPrevMonth = "";
							that.covidPrevDay = "";
						}
						
						item.date = startDt;
						item.time = startTime;
						
						that.covidItem = item;
						
						return item;
					},
					
					//코로나추가 20200727 jrj
					this.makeCovidChart = function(){
						if( ( !$thematicMapFrame05.ui.mapList[0].covidPlayYn && that.monthChange ) || that.isFirstDraw ){
							that.isFirstDraw = false;
							that.monthChange = false;
							
//							if( that.selectedAdmCd == "" ){
//								that.selectedAdmCd = "00";
//							}
							if( that.tmpAdmCd == "" ){
								that.tmpAdmCd = "00";
							}
							if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw"){
								var map_data_id = 'covid19_status';
								var data = {
									thema_map_data_id : map_data_id,
									area_type : 'auto', 
//									adm_cd : that.selectedAdmCd,
									adm_cd : that.tmpAdmCd,
									covid_start : that.covidItem.date,	//코로나추가 20200727 jrj
									covid_month_val : ( Number(that.covidPlayMonth) == 1 ? "13" : that.covidPlayMonth ),
									covid_year_val : $("#select_base_year >option:selected").val(),
									gubun : 'chart'
								};
							}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE"){
								var map_data_id = 'covid19_vacc_data';
								var covid_vacc_cd = "";
								if($("#leftValue").hasClass("on")){
//									covid_vacc_cd = $("#vacc_type a.on").attr("id").substr(-1,1);
									covid_vacc_cd = $("#vacc_type a.on").attr("id").substr(-2,1);
								}else{
//									covid_vacc_cd = $("#vacc_type2 a.on").attr("id").substr(-1,1);
									covid_vacc_cd = $("#vacc_type a.on").attr("id").substr(-1,1);
								}
								var data = {
									thema_map_data_id : map_data_id,
									area_type : 'auto', 
									adm_cd : that.tmpAdmCd,
									covid_start : that.covidItem.date,
									covid_month_val : ( Number(that.covidPlayMonth) == 1 ? "13" : that.covidPlayMonth ),
									covid_year_val : $("#select_base_year >option:selected").val(),
									gubun : 'chart',
									covid_vacc_cd : covid_vacc_cd
								}
							}
							$.ajax({
								type: "GET",
								url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapData.json",							
								data : data,
								success: function(res) {
									if (res.errCd == "0") {
										var result = res.result.detailInfo;
										var tmpData = [];
										var tmpData2 = [];
										var categories = [];
										var categoriesArr = [];
										var data_val;
										var plotVal = 1;
										
										var dtData = {};
										
										for(var i=0;i<result.length;i++){
											if($("#selectValue").val() == "leftValue"){
												data_val = result[i].left_data_val;
											}else if($("#selectValue").val() == "rightValue"){
												data_val = result[i].right_data_val;
											}
											
											dtData[ result[i].base_month+""+result[i].base_day ] = i;
											
											//코로나추가 20200727 jrj
											if($("#covid_month option:selected").val() == result[i].base_month &&
													$("#covid_day option:selected").val() == result[i].base_day ) {
												plotVal = i;
											}
											
											that.plotVal = plotVal;
											tmpData.push( data_val );
											categories.push( result[i].base_month + "." + result[i].base_day );
											categoriesArr.push( result[i].base_year + "." + result[i].base_month + "." + result[i].base_day );
										}
										
										dtData.length = result.length;
										that.dtData = dtData;
										
										function covidChartClick( e, idx, xAxis ){
											var chart = xAxis;
											var plotVal = Math.round( idx );
											
											chart.removePlotLine();
											chart.addPlotLine({
												value : plotVal,
												color : '#FF0000',
												width : 2
											});
											
//											var category =  xAxis.categories[ plotVal ];
											var category =  categoriesArr[ plotVal ];
											
											$("#select_base_year").val( category.split(".")[0] );
											that.covidMonth();
											$("#covid_month").val( category.split(".")[1] );
											that.covidDay();
											var $day = $("#covid_day option[value="+ category.split(".")[2] +"]").prop("selected","selected");
											that.changeRegionBound();
											
											$thematicMapFrame05.playCovidIdx = $day.index(); 
										}
										
										$("#covidChart").highcharts({
											chart : {
												animation : false,
												type : 'line',
												events : {
													click : function ( e ) {
														covidChartClick( e, e.xAxis[0].value, e.xAxis[0].axis );
													},
													load : function(){
														var axis = this.xAxis[0];
														var ticks = axis.ticks;
														var points = this.series[0].points;
														
														$.each( points, function( i, item ){
															if( ticks[i] ){
																var label = ticks[i].label.element;
																
																label.style.cursor = "pointer";
																if( points.length -1 <= i ){
																	$(label).css("transform","translate(-15px,0px)");
																}
																
																label.onclick = function( e ){
																	covidChartClick( e, i, axis );
																}
															}
														});
													}
												}
											},
											title : { 
												text : ''
											},
											xAxis : {
												tickInterval : 2,
												categories : categories,
												plotLines : [{
													value : plotVal,
													width : 2,
													color : '#FF0000'
												}]
											},
											yAxis : { min : 0, title : { text : '' } },
											tooltip : {
												enabled:true,
												formatter : function(){
													if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw"){
														return this.x+'<br/><b>확진자 : '+ Highcharts.numberFormat(this.y,0)+'명</b>';
													}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE"){
														return this.x+'<br/><b>접종자 : '+ Highcharts.numberFormat(this.y,0)+'명</b>';
													}
												}
											},
											plotOptions : {
												series : {
													cursor : 'pointer',
													point : {
														events : {
															click : function( e ){
																covidChartClick( e, this.x, this.series.xAxis );
															}
														}
													}
												}
											},
											series : [{
												showInLegend : false,
												name : 'covid',
												data : tmpData
											}]
										});
										
									}
								}
							});
						}
					},
					this.carAccident = function(){
						$.ajax({
							type: "GET",
							url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapData.json",
							data : {
								thema_map_data_id : 'car_accident_data',
								area_type : 'auto',
								adm_cd : '00',
								base_year : $("#select_base_year option:checked").val(),
								stat_data_base_year : $("#select_base_year option:checked").val(), //mng_s 202107029 이진호, 추가
								caracc_type_cd : $("#caracc_type a.on").attr("id").substr(-1,1),
								gubun : 'tooltip'
							},
							success: function(res) {
								if (res.errCd == "0") {
									$thematicMapFrame05.ui.removeCarAccMarker();
									$thematicMapFrame05.ui.addCarAccMarker(res.result.detailInfo);
								}
							} ,
							dataType: "json",
							error:function(e){}  
						});	
					},
					//코로나추가 20200722 주용민	
					this.covidVacc = function(){
						if($("#vacc_hospital").hasClass("on")){
							var gubun = "tooltip";
						}else if($("#vacc_consign").hasClass("on")){
							var gubun = "tooltip2";
						}
						$.ajax({
							type: "GET",
							url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapData.json",
							data : {
								thema_map_data_id : 'covid19_vacc_data',
								area_type : 'auto',
								adm_cd : '00',
								gubun : gubun
							},
							success: function(res) {
								if (res.errCd == "0") {
									$thematicMapFrame05.ui.removeCovidVaccMarker();
									$thematicMapFrame05.ui.addCovidVaccMarker(res.result.detailInfo);
								}
							} ,
							dataType: "json",
							error:function(e){}  
						});	
					}
				}
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
					console.log($thematicMapFrame05.params);
					that.openInitStatData($thematicMapFrame05.params);
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
						//코로나추가 20200722 주용민
						
							switch (that.curPolygonCode) {

							// 전국
							case 1:
								that.markers.clearLayers();
								that.poiAdmCd = "";
								$thematicMapFrame05.ui.poiInfoArray = [];
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
								that.markers.clearLayers();
								that.poiAdmCd = "";
								$thematicMapFrame05.ui.poiInfoArray = [];
								if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == '00') {
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
									if( !(
											( window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw" && $("#covid_hospital").hasClass("on") ) || 
											( window.parent.$thematicMapMain.param.stat_thema_map_id == "wPsSdFX8Wt20210520161423833UZjHClj5U3" && $("#caracc_occur_point").hasClass("on") ) ||  
											( window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE" && $("#vacc_hospital").hasClass("on") ) ||
											( window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE" && $("#vacc_consign").hasClass("on") )
											) ){
										
										that.getThemaMapData(that.thema_map_data_id,"00");
									}
								}
								break;
								
								// 시군구
							//2019-04-19 박길섭 시작
							case 100:
							if(window.parent.$thematicMapMain.param.stat_thema_map_id == "5FLM8BXNH320200521093949554ioKEsoOUGI" && $("#selectValue2").val()=="auto"){
								//that.markers.clearLayers();
								that.poiAdmCd = "";
								$thematicMapFrame05.ui.poiInfoArray = [];
								//최근경계조회조건 하나를 가지고 있다가 비교하여 같으면 기존에 저장된 경계를 호출
								if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd) {
									if (that.dataGeojson == null) {
										that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
									}
									else {
										console.log('aleady exist');
									}
								} else {
									if (that.dataGeojson) {
										that.dataGeojson.remove();
									}
									
									that.getThemaMapData(that.thema_map_data_id,curSidoCd , undefined, undefined , "100");
									that.AreaAndStatsApis(curSidoCd, '0');
								}
								break;
							}else{
								that.markers.clearLayers();
								that.poiAdmCd = "";
								$thematicMapFrame05.ui.poiInfoArray = [];
								//최근경계조회조건 하나를 가지고 있다가 비교하여 같으면 기존에 저장된 경계를 호출
								if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd) {
									if (that.dataGeojson == null) {
										that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
									}
									else {
										console.log('aleady exist');
									}
								} else {
									if (that.dataGeojson) {
										that.dataGeojson.remove();
									}
									//코로나추가 20200729 jrj
									if( !(
											( window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw" && $("#covid_hospital").hasClass("on") ) || 
											( window.parent.$thematicMapMain.param.stat_thema_map_id == "wPsSdFX8Wt20210520161423833UZjHClj5U3" && $("#caracc_occur_point").hasClass("on") ) ||  
											( window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE" && $("#vacc_hospital").hasClass("on") ) ||
											( window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE" && $("#vacc_consign").hasClass("on") )
											) ){
										
										that.getThemaMapData(that.thema_map_data_id,curSidoCd , undefined, undefined , "100");
									}
								}
								break;
							}

						//2019-04-19 박길섭 끝	

						case 3:
							// mng_s 20200526 김건민
							if(window.parent.$thematicMapMain.param.stat_thema_map_id == "5FLM8BXNH320200521093949554ioKEsoOUGI" && $("#selectValue2").val()=="auto"){
								that.poiAdmCd = "";
								$thematicMapFrame05.ui.poiInfoArray = [];
								//최근경계조회조건 하나를 가지고 있다가 비교하여 같으면 기존에 저장된 경계를 호출
								if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd) {
									if (that.dataGeojson == null) {
										that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
									}
									else {
										console.log('aleady exist');
										that.getThemaMapData(that.thema_map_data_id,curSidoCd);//2019-04-22 박길섭
									}
								} else {
									if (that.dataGeojson) {
										that.dataGeojson.remove();
									}
									that.getThemaMapData(that.thema_map_data_id,curSidoCd);
									that.AreaAndStatsApis(curSidoCd, '0');
								}
								break;
							}else{
								that.markers.clearLayers();
								that.poiAdmCd = "";
								$thematicMapFrame05.ui.poiInfoArray = [];
								//최근경계조회조건 하나를 가지고 있다가 비교하여 같으면 기존에 저장된 경계를 호출
								if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd) {
									if (that.dataGeojson == null) {
										that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
									}
									else {
										console.log('aleady exist');
										that.getThemaMapData(that.thema_map_data_id,curSidoCd);//2019-04-22 박길섭
									}
								} else {
									if (that.dataGeojson) {
										that.dataGeojson.remove();
									}
									//코로나추가 20200729 jrj
									if( !(
											( window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw" && $("#covid_hospital").hasClass("on") ) || 
											( window.parent.$thematicMapMain.param.stat_thema_map_id == "wPsSdFX8Wt20210520161423833UZjHClj5U3" && $("#caracc_occur_point").hasClass("on") ) || 
											( window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE" && $("#vacc_hospital").hasClass("on") ) ||
											( window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE" && $("#vacc_consign").hasClass("on") )
											) ){
										that.getThemaMapData(that.thema_map_data_id,curSidoCd);
									}
								}
								break;
							}
							// mng_e 20200526 김건민

							// 동면읍
						case 4:
							that.markers.clearLayers();
							that.poiAdmCd = "";
							$thematicMapFrame05.ui.poiInfoArray = [];
							if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd + curSiggCd) {
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}
								else {
									console.log('aleady exist');
								}
							} else {
								if (that.dataGeojson) {
									that.dataGeojson.remove();
								}
								//코로나추가 20200729 jrj
								if( !(
										( window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw" && $("#covid_hospital").hasClass("on") ) ||
										( window.parent.$thematicMapMain.param.stat_thema_map_id == "wPsSdFX8Wt20210520161423833UZjHClj5U3" && $("#caracc_occur_point").hasClass("on") ) || 
										( window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE" && $("#vacc_hospital").hasClass("on") ) ||
										( window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE" && $("#vacc_consign").hasClass("on") )
										)){
									that.getThemaMapData(that.thema_map_data_id,curSidoCd + curSiggCd);
								}
							}
							break;

							// 집계구
						case 5:
							if (!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd + curSiggCd + curDongCd) {
								if (that.dataGeojson == null) {
									that.setPolygonDataGeojson(that.lastGeojsonInfo.geojson);
								}
								else {
									console.log('aleady exist');
								}
							} else if(!that.isReloadMode && that.lastGeojsonInfo != null && that.lastGeojsonInfo.adm_cd == curSidoCd + curSiggCd && that.poi_disp_yn) {
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
					} else if(that.curPolygonCode > 4 && that.poi_disp_yn) {
						that.AreaAndStatsApis(curSidoCd + curSiggCd + curDongCd, '0');
					} else if(that.curPolygonCode < 5) {
						that.markers.clearLayers();
						that.poiAdmCd = "";
						$thematicMapFrame05.ui.poiInfoArray = [];
					}

					that.isReloadMode = false;
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
						$thematicMapFrame05.ui.poiInfoArray = [];
					}

					console.log('apicallCount', apicallCount);
					if (returnCount !== totalCount && apicallCount > 0) {
//						that.AreaAndStatsApis(options.adm_cd, pageNum + 1);
						that.callThemePOIResult(options.adm_cd, null, pageNum + 1);
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
							tempList.corp_nm = poiList[i].corp_nm;
							tempList.naddr = poiList[i].naddr;
							tempList.class_nm = poiList[i].class_nm;
							tempList.worker_sum = poiList[i].worker_sum;
							
							// mng_s 20200526 김건민 (다문화가구 현황 추가)
							tempList.theme_cd = poiList[i].theme_cd;
							tempList.addr = poiList[i].addr;
							// mng_e 20200526 김건민
							
							$thematicMapFrame05.ui.poiInfoArray.push(tempList);
							
							// mng_s 20200526 김건민
							if(tempList.theme_cd == '99997'){								
								var html = '<table style="text-align:left;table-layout:fixed;width:auto;padding:5px;" >';
								html += '<tr>';
								html += '<th style="text-align: left; word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>다문화가족지원센터</strong></th>';
								html += '</tr>';
								html += '<tbody>';
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 주소: ' + poiList[i].addr + '</td>';
								html += '</tr>'
								html += '<tr>';
								html += '<td style="padding:2px 4px;"> 전화번호 : ' + poiList[i].tel_no + '</td>';
								html += '</tr>'
								html += '</tbody>'	
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
							// mng_e 20200526 김건민
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
}(window, document));
