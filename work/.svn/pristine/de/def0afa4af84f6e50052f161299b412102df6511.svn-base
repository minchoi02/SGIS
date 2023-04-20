
(function(W,D){
	W.$commonAnalysisMap = W.$commonAnalysisMap || {};
	
	$(document).ready(function(){
		$commonAnalysisMap.event.setUIEvent();
	});
	
	//UI 내용작성
	$commonAnalysisMap.ui = {
			type : "polygon",
			mapList : [],
			userLayerInfo : [],

		/**
		 * 
		 * @name         : createMap
		 * @description  : 맵 및 맵에 오버레이될 그래프, 범례 등을 생성한다.
		 * @date         : 2018. 09. 17. 
		 * @author	     : 권차욱
		 * @history 	 :
		 */
		createMap : function(id, seq, options) {
			var map = new sMap.map();
			map.createMap($commonAnalysisMap, id, {
				center : [ 989674, 1818313 ],
				zoom : 8,
				measureControl : false,
				statisticTileLayer: true
			});
			
			map.id = seq;
			map.addControlEvent("movestart");
			map.addControlEvent("moveend");
			map.addControlEvent("zoomstart");	
			map.addControlEvent("zoomend");	
			map.addControlEvent("draw");
			map.addControlEvent("delete");
			map.addControlEvent("edit");
			
			var btnInfo = new $mapBtn.btnInfo(map, $commonAnalysisMap);
			map.mapBtnInfo = btnInfo;
			
			if (options == null || options == undefined) {
				options = {
						intrPoiControl : true,
						intrSettingControl : false,
						mapTypeControl : true,
						intrZoomControl : true
					}
			}
			btnInfo.createUI(options);
			
			//사용자지정컨트롤설정
			this.mapList[seq] = map;
			
			map.gMap.whenReady(function() {
				map.createHeatMap();
				map.analysisMode = $commonAnalysisMap.ui.type;
				
				switch($commonAnalysisMap.ui.type) {
					case "poi": //임의POI
						{
							$commonAnalysisMap.ui.poiCnt = 0;
							$commonAnalysisMap.ui.featureLayer = null;
							$commonAnalysisApi.request.doReqBoundaryInfo($commonAnalysis.ui.selectedAdmCd, function(res) {
								var result = res.result;
								if (result.length > 0) {
									var geojson = map.convertFeatureData(result, "", "", "normal");
									map.addPolygonGeoJson(geojson, "polygon");
									map.geojson.eachLayer(function(layer) {
										layer.setStyle({
											weight : 3,
											color : "#F06292",
											dashArray : "",
											fillOpacity : 0.3,
											fillColor : "#F06292"
										});
									});
									
									bounds = map.geojson.getBounds();
									if (bounds != null) {
										map.gMap.fitBounds(bounds, {
											animate : false
										});
									}
								}
							});
						}
						break;
					case "road": //도로네트워크
						{
							$commonAnalysisApi.request.doReqRoadPolygonData($commonAnalysis.ui.selectedAdmCd, function(res) {
								var result = res.result;
								if (result.length > 0) {
									var geojson = map.convertFeatureData(result, "", "", "normal");
									map.addPolygonGeoJson(geojson, "polygon");
									map.geojson.eachLayer(function(layer) {
										layer.setStyle({
											weight : 3,
											color : "#F06292",
											dashArray : "",
											fillOpacity : 0.3,
											fillColor : "#F06292"
										});
									});
									
									bounds = map.geojson.getBounds();
									if (bounds != null) {
										map.gMap.fitBounds(bounds, {
											animate : false
										});
									}
								}
							});
						}
						break;
					case "company": //사업체조사-동적버퍼
						{
							$commonAnalysisApi.request.doReqBoundaryInfo($commonAnalysis.ui.selectedAdmCd, function(res) {
								var result = res.result;
								if (result.length > 0) {
									var geojson = map.convertFeatureData(result, "", "", "normal");
									map.addPolygonGeoJson(geojson, "polygon");
									map.geojson.eachLayer(function(layer) {
										layer.setStyle({
											weight : 3,
											color : "#F06292",
											dashArray : "",
											fillOpacity : 0.3,
											fillColor : "#F06292"
										});
									});
									
									bounds = map.geojson.getBounds();
									if (bounds != null) {
										map.gMap.fitBounds(bounds, {
											animate : false
										});
									}
									
									$commonAnalysisMap.ui.poiCnt = 0;
									$commonAnalysisMap.ui.featureLayer = null;
									var params = $commonAnalysis.ui.params.bufferInfo.params;
									params["adm_cd"] = $commonAnalysis.ui.params.regionInfo.adm_cd;
									$commonAnalysisApi.request.doReqCompanyPoiList(params, function(res) {
										var result = res.result;
										console.log(result);
										$commonAnalysisMap.ui.drawCompanyMarker(result, map);
										
									});
								}
							});
						}
						break;
					case "user": //사용자데이터-동적버퍼
					{
						$commonAnalysisApi.request.doReqBoundaryInfo($commonAnalysis.ui.selectedAdmCd, function(res) {
							var result = res.result;
							if (result.length > 0) {
								var geojson = map.convertFeatureData(result, "", "", "normal");
								map.addPolygonGeoJson(geojson, "polygon");
								map.geojson.eachLayer(function(layer) {
									layer.setStyle({
										weight : 3,
										color : "#F06292",
										dashArray : "",
										fillOpacity : 0.3,
										fillColor : "#F06292"
									});
								});
								
								bounds = map.geojson.getBounds();
								if (bounds != null) {
									map.gMap.fitBounds(bounds, {
										animate : false
									});
								}
								
								$commonAnalysisMap.ui.poiCnt = 0;
								$commonAnalysisMap.ui.featureLayer = null;
								var params = $commonAnalysis.ui.params.bufferInfo.params;
								params["adm_cd"] = $commonAnalysis.ui.params.regionInfo.adm_cd;
								$commonAnalysisApi.request.doReqUserPoiList(params, function(res) {
									var result = res.result;
									console.log(result);
									$commonAnalysisMap.ui.drawCompanyMarker(result, map);
									
								});
							}
						});
					}
					break;
					default:
						break;
				}
			});
	
			return map;
		},
		
		/**
		 * 
		 * @name         : drawMarker
		 * @description  : 마커를 생성한다.
		 * @date         : 2018. 11. 02. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param x : x좌표
		 * @param y : y좌표
		 * @param map : 맵 객체
		 */
		drawMarker : function(x, y, map) {
			if (map.geojson != null) {
				
				//마커 레이어 생성
				if (this.featureLayer == null) {
					this.poiCnt = 0;
					this.featureLayer = sop.featureGroup();
					map.gMap.addLayer(this.featureLayer);
				}else {
					if (this.poiCnt >= 20) {
						$message.open("알림", "POI 개수가 20개가 초과되어 더이상 POI를 생성할 수 없습니다.");
						return;
					}
				}
				
				//경계내에 마커가 위치하는지 체크 후 마커생성
				if ($commonAnalysisMap.util.isMarkerInsidePolygon(x, y, map.geojson)) {
					var currentdate = new Date();
					var id = $commonFunc.makeStamp(currentdate);

					var tooltip  = "<div class='markerTooltip'>";
						  tooltip += 	"<div class='mTitle' style='text-align:center;'>POI_"+id+"</div>";
						  tooltip +=		"<button class='deleteBtn' onclick='javascript:$commonAnalysisMap.event.deleteMarker(\""+id+"\");'>삭제</button>";
						  tooltip += "</div>";
					  
					var icon = sop.icon({
						  iconUrl: contextPath + '/img/map/marker-icon.png',
						  shadowUrl: contextPath + '/img/map/marker-shadow.png',
						  iconAnchor: [12.5, 41 ],
						  iconSize: [ 25, 41 ],
						  infoWindowAnchor: [0, -41]
					});
					
					var marker = sop.marker([ x, y ], {
						  icon : icon,
						  id : id,
						  x : x,
						  y :  y,
						  title : "POI_"+id
					});
					marker.bindInfoWindow(tooltip);
					
					this.featureLayer.addLayer(marker);
					this.poiCnt++;
				}else {
					$message.open("알림", "선택한 지역에서 벗어난 POI입니다.");
				}
			}
		},
		
		/**
		 * 
		 * @name         : drawCompanyMarker
		 * @description  : 마커를 생성한다.
		 * @date         : 2018. 12. 26. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param poiList : poi 정보
		 * @param map : 맵 객체
		 */
		drawCompanyMarker : function(poiList, map) {
			//마커 레이어 생성
			if (this.featureLayer == null) {
				this.poiCnt = 0;
				
				if (poiList.length > 100) {
					this.featureLayer = sop.markerClusterGroup();
				}else {
					this.featureLayer = sop.featureGroup();
				}
				map.gMap.addLayer(this.featureLayer);
			}
			
			//경계내에 마커가 위치하는지 체크 후 마커생성
			for (var i=0; i<poiList.length; i++) {
				if ($commonAnalysisMap.util.isMarkerInsidePolygon(poiList[i].x, poiList[i].y, map.geojson)) {
					var title = poiList[i].corp_nm;
					if (title == undefined) {
						title = "POI_" + (i+1);
					}
					var tooltip  = "<div class='markerTooltip'>";
						  tooltip += 	"<div class='mTitle' style='text-align:center;'>"+title+"</div>";
						  tooltip += "</div>";
					  
					var icon = sop.icon({
						  iconUrl: contextPath + '/img/map/marker-icon.png',
						  shadowUrl: contextPath + '/img/map/marker-shadow.png',
						  iconAnchor: [12.5, 41 ],
						  iconSize: [ 25, 41 ],
						  infoWindowAnchor: [0, -41]
					});
					
					var marker = sop.marker([ poiList[i].x, poiList[i].y ], {
						  icon : icon,
						  id : i,
						  x : poiList[i].x,
						  y :  poiList[i].y,
						  title : title
					});
					marker.bindInfoWindow(tooltip);
					marker["selected"] = false;
					marker["id"] = i;
					this.featureLayer.addLayer(marker);
					
					marker.on("click", function(e) {
						$commonAnalysisMap.callbackFunc.didSelectedPoi(e, map);
					});
				}
			}
			
		}
	};
	
	$commonAnalysisMap.util = {
	
			/**
			 * 
			 * @name         : isMarkerInsidePolygon
			 * @description  : 폴리곤 내의 특정 포인트가 포함되는지 여부 판단
			 * @date         : 2018. 11. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param x : 체크할 x좌표
			 * @param y : 체크할 y좌표
			 * @param polygon : 폴리곤
			 */
			isMarkerInsidePolygon : function(x, y, polygon) {
				 var inside = false;
				 polygon.eachLayer(function(layer) {
					 var polyPoints = layer._utmks[0][0];
					 inside = false;
				     for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
				        var xi = polyPoints[i].x, yi = polyPoints[i].y;
				        var xj = polyPoints[j].x, yj = polyPoints[j].y;
				        var intersect = ((yi > y) != (yj > y))  && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
				        
				        if (intersect) {
				        	inside = !inside;
				        }	
				     }   
				 });
				 return inside;
			},
			
			initUserLayerStyle : function() {
				if ($commonAnalysisMap.ui.type != "company") {
					if ($commonAnalysisMap.ui.userLayerInfo.length > 0) {
						for (var i=0; i<$commonAnalysisMap.ui.userLayerInfo.length; i++) {
							var layer = $commonAnalysisMap.ui.userLayerInfo[i].layer;
							layer.setStyle({
								weight : 3,
								color : "#0070C0",
								dashArray : "",
								fillOpacity : 0.3,
								fillColor : "#0070C0"
							});
						}
					}
				}
			},
			
			initPoiStyle : function() {
				if ($commonAnalysisMap.ui.userLayerInfo.length > 0) {
					for (var i=0; i<$commonAnalysisMap.ui.userLayerInfo.length; i++) {
						var marker = $commonAnalysisMap.ui.userLayerInfo[i].layer;
						var icon = sop.icon({
							  iconUrl: contextPath + '/img/map/marker-icon.png',
							  shadowUrl: contextPath + '/img/map/marker-shadow.png',
							  iconAnchor: [12.5, 41 ],
							  iconSize: [ 25, 41 ],
						});
						marker.setIcon(icon);
						marker["selected"] = false;
					}
				}
			},
			
			initPolygonStyle : function(map) {
				if (map.geojson != null) {
					map.geojson.eachLayer(function(layer) {
						layer.setStyle({
							weight : 3,
							color : "#F06292",
							dashArray : "",
							fillOpacity : 0.3,
							fillColor : "#F06292"
						});
					});
				}
			},
			
			setSelectedLayer : function(layer) {
				layer.setStyle({
					weight : 3,
					color : "#0070C0",
					dashArray : "",
					fillOpacity : 0.3,
					fillColor : "#0070C0"
				});
				
				polygonType = "RECTANGLE";
				area = "LINESTRING(";
				for(var i = 0; i < layer.getUTMKs()[0].length; i++) {
					area += layer.getUTMKs()[0][i].x + " " + 
							 layer.getUTMKs()[0][i].y;
					
					if(i != layer.getUTMKs()[0].length - 1) {
						area += ","
					}
				}
				area += ")";

				layer["id"] = $commonFunc.makeRandomThirtySevenDigitString();	
				$commonAnalysisMap.ui.userLayerInfo.push({
					id : layer.id,
					type : polygonType,
					area : area,
					layer : layer
				});
			}
	};
	
	$commonAnalysisMap.callbackFunc = {
			
			/**
			 * 
			 * @name         : didDrawPolygonChangeMode
			 * @description  : 임의영역경계 그리기 모드변경
			 * @date         : 2018. 09. 18. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param map : 맵 객체
			 * @param type : 폴리곤 타입
			 */
			didDrawPolygonChangeMode : function(map, type) {
				if (type == undefined) {
					type = $("input[name='polygonType']:checked").val();
				}
				map.setBoundSelectedMoode(type);
				switch(type) {
					case "circle":
						$("#mapRgn_"+(map.id+1)).find(".draw-circle-sub-out").click();
						break;
					case "rectangle":
						$("#mapRgn_"+(map.id+1)).find(".draw-rectangle-sub-out").click();
						break;
					case "polygon":
						$("#mapRgn_"+(map.id+1)).find(".draw-polygon-sub-out").click();
						break;
					default:
						break;
				}
			},
			
			/**
			 * 
			 * @name         : didDrawEachMode
			 * @description  : 임의영역경계-개별모드
			 * @date         : 2018. 11. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param map   맵 객체
			 */
			didDrawEachMode : function(map) {
				if ($commonAnalysisMap.ui.type == "company" || $commonAnalysisMap.ui.type == "user") {
					$commonAnalysisMap.ui.selectedPoiMode = true;
				}else {
					map.drawControl.removeOverlay();	
					map.setBoundSelectedMoode(null);
					$commonAnalysisMap.ui.userLayerInfo = [];
					$commonAnalysisMap.util.initPolygonStyle(map);
				}
			},
			
			/**
			 * 
			 * @name         : didDeletePolygonData
			 * @description  : 임의영역경계 초기화
			 * @date         : 2018. 09. 18. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param map   델리케이트
			 */
			didInitPolygonData : function(map) {
				switch($commonAnalysisMap.ui.type) {
					case "polygon":
						map.drawControl.removeOverlay();	
						map.setBoundSelectedMoode(null);
						$commonAnalysisMap.ui.userLayerInfo = [];
						break;
					case "road":
						map.drawControl.removeOverlay();	
						map.setBoundSelectedMoode(null);
						$commonAnalysisMap.ui.userLayerInfo = [];
						$commonAnalysisMap.util.initPolygonStyle(map);
						break;
					case "company":
					case "user":
						map.drawControl.removeOverlay();	
						map.setBoundSelectedMoode(null);
						$commonAnalysisMap.ui.selectedPoiMode = false;
						$commonAnalysisMap.util.initPoiStyle();
						$commonAnalysisMap.ui.userLayerInfo = [];
						break
					default:
						if ($commonAnalysisMap.ui.featureLayer != null) {
							$commonAnalysisMap.ui.featureLayer.clearLayers();
							$commonAnalysisMap.ui.poiCnt = 0;
						}
						break;
				}
			},
			
			/**
			 * 
			 * @name         : didDrawCreate
			 * @description  : 사용자지정 draw 이벤트콜백
			 * @date         : 2014. 10. 30. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param event 이벤트객체
			 * @param @param type  객체타입
			 * @param @param map   델리케이트
			 */
			didDrawCreate : function(event, type, map) {
				var layer = event.layer;
				var area = "";
				var polygonType= "";
				
				//다각형 및 사각형일때, 특정 영역을 넘어서면 알림 메시지 호출
				if (type == "polygon" || type == "rectangle") {
					var shapeArea = layer._getArea();
					if (shapeArea > 113000000) {
						$message.open('최적의 서비스 속도를 위해 사용자 임의영역 면적이 113000000m² 이하가 되어야 합니다.');
						layer._shapeGroup.removeLayer(layer._shape);
						layer._shape = null;
						layer._map.dragging.enable();
						map.mapBtnInfo.doClearSelectedBound();
						map.mapBtnInfo.setFixedBoundBtn(false);
						return;
					}
				}
				
				if (map.analysisMode != "road") {
					switch(type) {
						case "circle":
							{
								polygonType = "CIRCLE";
								area = "POLYGON((";
								var points = layer.toPolygon(120, map.gMap);
								
								//폴리곤이라 처음 좌표와 마지막 좌표가 같아야 함
								points.push({
									x : points[0].x,
									y : points[0].y,
								})
						        for (var i = 0; i < points.length; i++) {
						        	area += points[i].x + " " + points[i].y;
									if(i != points.length - 1) {
										area += ","
									}
						        }
								area += "))";
							}
							break;
						case "polygon":
						case "rectangle":
							{
								polygonType = "RECTANGLE";
								area = "POLYGON((";
								for(var i = 0; i < layer.getUTMKs()[0].length; i++) {
									area += layer.getUTMKs()[0][i].x + " " + 
											 layer.getUTMKs()[0][i].y + ",";
									
									if(i == layer.getUTMKs()[0].length - 1) {
										area += layer.getUTMKs()[0][0].x + " " + 
										         layer.getUTMKs()[0][0].y;
									}
								}
								area += "))";
							}
							break;
						default:
							break;
					}
	
					layer["id"] = $commonFunc.makeRandomThirtySevenDigitString();	
					$commonAnalysisMap.ui.userLayerInfo.push({
						id : layer.id,
						type : polygonType,
						area : area
					});
				}else {
					var bounds = layer.getBounds();
					if (map.geojson != null) {
						map.geojson.eachLayer(function(layer) {
							if (bounds.intersects(layer.getBounds())) {
								$commonAnalysisMap.util.setSelectedLayer(layer);
							}
						});
					} 	
				}
			},
			
			/**
			 * 
			 * @name         : didDeletePolygon
			 * @description  : 임의영역경계 삭제 이벤트 콜백
			 * @date         : 2018. 09. 18. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event : 이벤트객체
			 * @param type : 객체타입
			 * @param map   델리케이트
			 */
			didDeletePolygon : function(event, type, map) {
				var layer = event.layer;
				if ($commonAnalysisMap.ui.type == "polygon") {
					var result = $.grep($commonAnalysisMap.ui.userLayerInfo, function(e){ 
					     return e.id != layer.id; 
					});
					$commonAnalysisMap.ui.userLayerInfo = result;
				}else {
					$commonAnalysisMap.ui.userLayerInfo = [];
					$commonAnalysisMap.util.initPolygonStyle(map);
				}
			},
			
			/**
			 * 
			 * @name         : didDrawEdit
			 * @description  : 임의영역경계 생성중 이벤트 콜백
			 * @date         : 2018. 12. 21. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event : 이벤트객체
			 * @param type : 객체타입
			 * @param map   델리케이트
			 */
			didDrawEdit : function(event, type, map) {
				var layer = event.layer;
				if (map.gMap.getBounds().overlaps(layer.getBounds())) {
					console.log("1");
				}else {
					console.log("2");
				}
			},
			
			/**
			 * 
			 * @name         : didMouseOutPolygo
			 * @description  : 해당경계 mouse out 시, 발생하는 콜백함수
			 * @date         : 2018. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 일반경계 및 데이터경계 타입
			 */
			didMouseOutPolygon : function(event, data, type, map) {
				if ($commonAnalysisMap.ui.type != "polygon") {
					$commonAnalysisMap.util.initPolygonStyle(map);
				}
				
				//선택된 폴리곤 스탈일 지정
				$commonAnalysisMap.util.initUserLayerStyle();
			},
			
			/**
			 * 
			 * @name         : didSelectedPolygon
			 * @description  : 해당경계 선택 시, 발생하는 콜백함수
			 * @date         : 2018. 11. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 일반경계 및 데이터경계 타입
			 */
			didSelectedPolygon : function(event, data, type, map) {
				var layer = event.target;
				if ($commonAnalysisMap.ui.type == "road") {
					if ($commonAnalysisMap.ui.type != "polygon") {
						$commonAnalysisMap.util.setSelectedLayer(layer);
					}
				}
			},
			
			/**
			 * 
			 * @name         : didDrawPoi
			 * @description  : POI를 생성한다.
			 * @date         : 2018. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param map  : 맵 객체
			 */
			didDrawPoi : function(map) {
				$message.open("알림", "지도에 마우스 왼클릭을 하여 POI를 생성하세요.");
				
				//지도 클릭이벤트 설정
				map.gMap.off("click");
				map.gMap.on("click", function(e) {
					
					//경계에 포함되는 마커만 생성
					var center = e.utmk;
					$commonAnalysisMap.ui.drawMarker(center.x, center.y, map);
					
				});
			},
			
			/**
			 * 
			 * @name         : didSelectedPoi
			 * @description  : POI를 선택한다.
			 * @date         : 2018. 12. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param e : 이벤트
			 * @param map  : 맵 객체
			 */
			didSelectedPoi : function(e, map) {
				if ($commonAnalysisMap.ui.selectedPoiMode) {
					var marker = e.target;
					var iconUrl = contextPath + '/img/map/marker-icon.png';
					if (!marker.selected) {
						if ($commonAnalysisMap.ui.userLayerInfo.length >= 20) {
							$message.open("알림", "POI 개수가 20개가 초과되어 더이상 POI를 생성할 수 없습니다.");
							return;
						}
						
						iconUrl = contextPath + '/img/map/marker-icon-red.png';
						marker["selected"] = true;
						
						//선택된 마커 저장
						$commonAnalysisMap.ui.userLayerInfo.push({
							id : marker.id,
							type : "poi",
							layer : marker
						});

					}else {
						iconUrl = contextPath + '/img/map/marker-icon.png';
						marker["selected"] = false;
								
						//선택된 마커 삭제
						$commonAnalysisMap.ui.userLayerInfo = $.grep($commonAnalysisMap.ui.userLayerInfo, function(e){ 
						     return e.id != marker.id; 
						});
					}
					
					var icon = sop.icon({
						  iconUrl: iconUrl,
						  shadowUrl: contextPath + '/img/map/marker-shadow.png',
						  iconAnchor: [12.5, 41 ],
						  iconSize: [ 25, 41 ],
					});
					marker.setIcon(icon);
				}
			}
			
			
	};
	
	//EVENT 내용작성
	$commonAnalysisMap.event = {
			
			setUIEvent : function(){

			},
			
			/**
			 * 
			 * @name         : deleteMarker
			 * @description  : 마커를 삭제한다.
			 * @date         : 2018. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param id  : 마커 아이디
			 */
			deleteMarker : function(id) {
				if ($commonAnalysisMap.ui.featureLayer != null) {
					$commonAnalysisMap.ui.featureLayer.eachLayer(function(marker) {
						if (marker.options.id == id) {
							marker.remove();
							$commonAnalysisMap.ui.featureLayer.removeLayer(marker); //2019-02-20 수정
							$commonAnalysisMap.ui.poiCnt--;
						}
					});
				}
			}
	};
	
}(window,document));