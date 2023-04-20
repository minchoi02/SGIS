/**
 * 일자리 맵 서비스 > 지도영역에 대한 클래스
 * 
 * history : 
 * 		2018.09.18	ywKim	대화형통계지도 소스 복사
 * 							  - 기존 주석 제거
 * 							  - 불필요한 부분 주석
 * 								doInnerMap(), doInnerMap2(), doInnerMap3()
 *		2018.09.20	ywKim	신규 - Copy of 정책통계지도
 * 
 * author : ywKim
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$ssaMap = W.$ssaMap || {};

	$ssaMap = {
			noReverseGeoCode : false
	};
	
	$ssaMap.ui = {
			namespace : "vjssaMap",
			searchBtnType : "normal",
			mapList : [],
			curMapId : 0,
			isInnerMapShow : false,
			curDropParams : [],
			combinePopup : null,
			buildPopup : null,
			reportPopup : null,
			dropBtnInfo : [],
			dataTypeList : [],
			tutoIndex : 0,
			toolTipTitle : "",		// 툴팁 N/A 처리용
			toolTipUnit : "",		// 툴팁 N/A 처리용
			isShare : false,		// 공유된 정보 유무
			shareData : [],			// 공유된 정보 데이터
			lastGeojsonInfo : null,
			data : [],
			map : "",
			
			/**
			 * 지도데이터 초기화
			 */
			clearLayer: function() {// used
				$workRoad.ui.log("$ssaMap.ui.clearLayer - begin");

				var map = this.mapList[this.curMapId];
				map.clearLayer();
			},

			/**
			 * 
			 * @name         : getTodayStatusMapData
			 * @description  : 오늘의 구인현황 맵 화면 조회
			 * @date         : 2016. 01. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			getTodayStatusMapData : function(btn_id, adm_cd, detail_type) {// used
				$workRoad.ui.log("$ssaMap.ui.getTodayStatusMapData - begin");
				
				var map = $ssaMap.ui.mapList[$ssaMap.ui.curMapId];
				if(btn_id == "" || btn_id == null){
					btn_id = "API_WORK-0";
				}
				
				/*
				var dataParams = {};
				dataParams.today = "20180628";						
				dataParams.sido_cd = "99";
				dataParams.sgg_cd = "999";*/
				
				//20181204 추가_손원웅
				var today = "";
				var tmpToday = "";				
				var dataParams = {};
				if(today == undefined || today == ""){	// 샘플 데이터 조회용 / undefined 조건 추가 - 2018.11.08	ywKim	변경
					dataParams.today = "20180628";		
				} else if (today.length == 8) {			// Normal Case - 2018.11.07	ywKim	추가
					dataParams.today = today;
				} else{									// today 포맷이 MM/dd
					tmpToday = today.replace('/','');					
					tmpToday = (new Date()).getFullYear() + tmpToday;	// 하드코딩 제거 - 2018.11.08	ywKim	변경
					dataParams.today = tmpToday;
				}								
				dataParams.sido_cd = "99";
				dataParams.sgg_cd = "999";
				
				if (adm_cd != 00 && adm_cd != undefined && adm_cd != null) {				
					switch(adm_cd.length) {
						case 2:
							dataParams.sido_cd = adm_cd;
							break;
						case 5:
							dataParams.sido_cd = adm_cd.substring(0,2);
							dataParams.sgg_cd = adm_cd.substring(2,5);
							break;
						case 7:
							break;
					}
				}
				
				var tmpParam = [];
				var tmpArParamName = new Array(); // 선택된 파라미터이름 정보
				tmpArParamName.push("TEST");
				var tmpArNoneParams = new Array();		//API 조회조건에 사용되지 않는 파라미터
				tmpArNoneParams.push("");
				var tmpArParams = new Array();
				tmpArParams.push({	key: "year",	value: dataParams.today.substring(0, 4)	});// 하드코딩 제거 - 2018.11.08	ywKim	변경	
				tmpArParams.push({	key: "today",	value: dataParams.today	});
				tmpArParams.push({	key: "sido_cd",	value: dataParams.sido_cd	});
				tmpArParams.push({	key: "sgg_cd",	value: dataParams.sgg_cd	});
				tmpArParams.push({	key: "detail_type",	value: detail_type	});
				
				// 단위 설정
				var unit = "명";
				if(detail_type.indexOf("COR") > -1){
					unit = "업체";
				}
				tmpParam.push({
									idx: 1,
									params : tmpArParams,
									noneParams : tmpArNoneParams,
									names : tmpArParamName,
									filterParam: "right_data_val",
									unit: unit,
									showData: "right_data_val"									
								});
				
				var map = $ssaMap.ui.mapList[$ssaMap.ui.curMapId];				
				var index = null;
				var adm_cd = "99";
				var adm_nm= "전체";
				var api_id = "";
						
				// 임시 - 2018.11.14	ywKim	변경
//				// share정보 초기화
//				$ssaMap.noReverseGeoCode = false;
//				$ssaMap.ui.curMapId = map.id;
//				$ssaMapApi.request.combineFailCnt = 0;
				
				//공유 (나의 데이터에서는 shareInfo가 null)
				/*var shareInfo = new share.shareInfo(map, $ssaMap.ui);
				map.shareInfo = shareInfo;
				map.shareInfo.shareUrlInfo = [];
				map.dropInfo = null;*/
				
				//경계고정을 하였을 경우,
				//현재 보이는 경계로 다중선택처럼 layer를 저장한다.
				if (map.isFixedBound) {
					map.setBoundSelectedMoode("multi");
					if (map.selectedBoundList.length == 0) {
						map.setBoundSelectedLayer();
					}
				}
				
				var id = btn_id;
				//var atdrcYn = $("#"+id).find(".atdrc_yn").html();
				var atdrcYn = "0";
									
				map.bnd_year = map.bnd_year;
				$ssaMap.ui.searchBtnType = "normal";
				api_id = id.split("-")[0];
				index = id.split("-")[1];

				// 버튼 시각 효과
				//$ssaMapFrame.ui.updateSearchBtnEffect(id, map.id);
				$ssaMap.ui.dropBtnInfo[map.id] = tmpParam;
				$ssaMap.ui.setDataType(map.id, "census");				
						
				var center = map.gMap.getCenter();
				map.gMap.eachLayer(function(layer){
					 if( layer._containsPoint) {
						 var point = map.gMap.utmkToLayerPoint(center);  
		                    if (layer._containsPoint(point)){
		                    	adm_cd = layer.feature.properties.adm_cd;
		                    	adm_nm = layer.feature.properties.adm_nm;
		                    }
					 }
				});
				
				/*if (adm_cd.length == 0 && !map.isInnerMapShow2) { //mng_s
					messageAlert.open("알림", "초기화 버튼을 클릭하여 경계를 조회해주세요.");
					return;
				}*/
				
				//전국단위에서 경계레벨 0과 2로 조회할 경우
				//데이터를 조회하지 않는다.
				if (map.boundLevel == "2") {
					if (adm_cd == "00") {
						map.clearDataOverlay();
						messageAlert.open("알림", "경계레벨 2의 경우는 전국레벨에서 조회를 할 수 없습니다.");
						return;
					}
				}

				if (tmpParam != null) {
					var params = $ssaMap.ui.reqSetParams(tmpParam, adm_cd, adm_nm, api_id, map);
					
					//시계열 초기값 세팅
					//$tsDataBoard.ui.timeSeriesInit(params);
					$ssaMap.ui.curDropParams[map.id] = params;
					$ssaMap.ui.requestOpenApi(params);
					
					if ( map.isInnerMapShow2 ) {
						$ssaMap.ui.requestGridLegend(params); //mng_s 그리드 범례요청
					}
				}
				map.setBoundSelectedMoode(null);
				map.mapBtnInfo.setFixedBoundBtn(false);															
				
			},
			
			/**
			 * 
			 * @name         : getFirstMapDataLoad
			 * @description  : 오늘의 구인현황 최초 화면 조회
			 * @date         : 2016. 01. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			getFirstMapDataLoad : function(btn_id) {
				$workRoad.ui.addFnc04List("$ssaMap.ui.getFirstMapDataLoad");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				if(btn_id == "" || btn_id == null){
					btn_id = "API_WORK-0";
				}
				
				var tmpParam = [];
				var tmpArParamName = new Array(); // 선택된 파라미터이름 정보
				tmpArParamName.push("TEST");
				var tmpArNoneParams = new Array();		//API 조회조건에 사용되지 않는 파라미터
				tmpArNoneParams.push("");
				var tmpArParams = new Array();
				tmpArParams.push({	key: "year",	value: "2016"	});	
				tmpArParams.push({	key: "today",	value: "20180628"	});
				tmpArParams.push({	key: "sido_cd",	value: "99"	});
				tmpArParams.push({	key: "sgg_cd",	value: "999"	});
				tmpArParams.push({	key: "detail_type",	value: "ALL-COR"	});
				tmpParam.push({
									idx: 1,
									params : tmpArParams,
									noneParams : tmpArNoneParams,
									names : tmpArParamName,
									filterParam: "right_data_val",
									unit: "구인명",
									showData: "right_data_val"									
								});
				
				var map = $ssaMap.ui.mapList[$ssaMap.ui.curMapId];				
				var index = null;
				var adm_cd = "99";
				var adm_nm= "전체";
				var api_id = "";
						
				// 임시 - 2018.11.14	ywKim	변경
//				// share정보 초기화
//				$ssaMap.noReverseGeoCode = false;
//				$ssaMap.ui.curMapId = map.id;
//				$ssaMapApi.request.combineFailCnt = 0;
				
				//공유 (나의 데이터에서는 shareInfo가 null)
				/*var shareInfo = new share.shareInfo(map, $ssaMap.ui);
				map.shareInfo = shareInfo;
				map.shareInfo.shareUrlInfo = [];
				map.dropInfo = null;*/
				
				//경계고정을 하였을 경우,
				//현재 보이는 경계로 다중선택처럼 layer를 저장한다.
				if (map.isFixedBound) {
					map.setBoundSelectedMoode("multi");
					if (map.selectedBoundList.length == 0) {
						map.setBoundSelectedLayer();
					}
				}
				
				var id = btn_id;
				//var atdrcYn = $("#"+id).find(".atdrc_yn").html();
				var atdrcYn = "0";
	
				map.bnd_year = map.bnd_year;
				$ssaMap.ui.searchBtnType = "normal";
				api_id = id.split("-")[0];
				index = id.split("-")[1];

				// 버튼 시각 효과
				//$ssaMapFrame.ui.updateSearchBtnEffect(id, map.id);
				$ssaMap.ui.dropBtnInfo[map.id] = tmpParam;
				$ssaMap.ui.setDataType(map.id, "census");				
				
				/*if (map.selectedBoundMode == "multi") {
					map.multiLayerControl.clear();
					
					if (map.selectedBoundList.length > 0) {
						var admList = null;
						if (map.selectedBoundList[0].feature.properties.adm_cd.length > 7) {
							for (var i=0; i<map.selectedBoundList.length; i++) {
								var adm_cd = map.selectedBoundList[i].feature.properties.adm_cd;
								var adm_nm = map.selectedBoundList[i].feature.properties.adm_nm;
								
								//전국단위에서 경계레벨 0과 2로 조회할 경우
								//데이터를 조회하지 않는다.
								if (map.boundLevel == "2") {
									if (adm_cd == "00") {
										map.clearDataOverlay();
										messageAlert.open("알림", "경계레벨 2의 경우는 전국레벨에서 조회를 할 수 없습니다.");
										map.setBoundSelectedMoode(null);
										map.mapBtnInfo.setFixedBoundBtn(false);
										return;
									}
								}
								
								if (admList == null) admList = [];
								admList.push(adm_cd.substring(0,7));
							}
							if (admList.length > 0) {
								//데이터 중복제거
								var tmpData = [];
								$.each(admList, function(k, el){
									if($.inArray(el, tmpData) === -1) tmpData.push(el);
								});
								admList = tmpData;
						
								for (var i=0; i<admList.length; i++) {
									if (tmpParam != null) {
										//map.selectedBoundList = admList;
										var params = $ssaMap.ui.reqSetParams(tmpParam, admList[i], adm_nm, api_id, map, "gibgae");
										$ssaMap.ui.curDropParams[map.id] = params;
										$ssaMap.ui.requestOpenApi(params);
									}
								}
							}
							
						}else {
							for (var i = 0; i < map.selectedBoundList.length; i++) {
								var adm_cd = map.selectedBoundList[i].feature.properties.adm_cd;
								var adm_nm = map.selectedBoundList[i].feature.properties.adm_nm;
								
								//전국단위에서 경계레벨 0과 2로 조회할 경우
								//데이터를 조회하지 않는다.
								if (map.boundLevel == "2") {
									if (adm_cd == "00") {
										map.clearDataOverlay();
										messageAlert.open("알림", "경계레벨 2의 경우는 전국레벨에서 조회를 할 수 없습니다.");
										map.setBoundSelectedMoode(null);
										map.mapBtnInfo.setFixedBoundBtn(false);
										return;
									}
								}
			
								if (tmpParam != null) {
									var params = $ssaMap.ui.reqSetParams(tmpParam, adm_cd, adm_nm, api_id, map);
									$ssaMap.ui.curDropParams[map.id] = params;
									$ssaMap.ui.requestOpenApi(params);
								}
							}
						}
					}
					
				}else {*/
					var center = map.gMap.getCenter();
					map.gMap.eachLayer(function(layer){
						 if( layer._containsPoint) {
							 var point = map.gMap.utmkToLayerPoint(center);  
			                    if (layer._containsPoint(point)){
			                    	adm_cd = layer.feature.properties.adm_cd;
			                    	adm_nm = layer.feature.properties.adm_nm;
			                    }
						 }
					});
					
					/*if (adm_cd.length == 0 && !map.isInnerMapShow2) { //mng_s
						messageAlert.open("알림", "초기화 버튼을 클릭하여 경계를 조회해주세요.");
						return;
					}*/
					
					//전국단위에서 경계레벨 0과 2로 조회할 경우
					//데이터를 조회하지 않는다.
					if (map.boundLevel == "2") {
						if (adm_cd == "00") {
							map.clearDataOverlay();
							messageAlert.open("알림", "경계레벨 2의 경우는 전국레벨에서 조회를 할 수 없습니다.");
							return;
						}
					}

					if (tmpParam != null) {
						var params = $ssaMap.ui.reqSetParams(tmpParam, adm_cd, adm_nm, api_id, map);
						
						//시계열 초기값 세팅
						//$tsDataBoard.ui.timeSeriesInit(params);
						$ssaMap.ui.curDropParams[map.id] = params;
						$ssaMap.ui.requestOpenApi(params);
						
						if ( map.isInnerMapShow2 ) {
							$ssaMap.ui.requestGridLegend(params); //mng_s 그리드 범례요청
						}
					}
					map.setBoundSelectedMoode(null);
					map.mapBtnInfo.setFixedBoundBtn(false);
				//}
				
				//mng_s
				if ( map.isInnerMapShow2 ) {
					//mng_s 20180104 주용민 투명도
					$(".btn_legendSetting").show(); 
					$(".lgListBox li").hide();
					$(".lgListBox li:last").show();
					$(".opacityLayer").css("left","450px");
					$("#grid_title_1").show();
					var grid_level = "";
					if(map.zoom=="0") {
						grid_level = "100km";
					} else if( map.zoom=="1" || map.zoom=="2" || map.zoom=="3" || map.zoom=="4" || map.zoom=="5") {
						grid_level = "10km";
					}  else if(map.zoom=="6" || map.zoom=="7" || map.zoom=="8") {
						grid_level = "1km";
					}  else if(map.zoom=="9" || map.zoom=="10" || map.zoom=="11" || map.zoom=="12" || map.zoom=="13") {
						grid_level = "100m";
					} 
					$("#grid_title_1").html("<span style='font-weight:bold;'>지도레벨 : " + map.zoom + "</span>(0~13), &nbsp;&nbsp;<span style='font-weight:bold;'> 격자레벨 : " + grid_level + "</span>(100km/10km/1km/100m)");
				}
				
				
				//mng_s 20180208 bnd_grid 행정구역그리드와 전체화면 그리드의 경우 grid_level이 다를 수 있으므로 주의요망
				if ( map.isInnerMapShow3 ) {
					//mng_s 20180104 주용민 투명도
					$(".btn_legendSetting").show(); 
					$(".lgListBox li").hide();
					$(".lgListBox li:last").show();
					$(".opacityLayer").css("left","450px");
					$("#grid_title_1").show();
					var grid_level = "";
					if(map.zoom=="0") {
						grid_level = "100km";
					} else if( map.zoom=="1" || map.zoom=="2" || map.zoom=="3" || map.zoom=="4" || map.zoom=="5") {
						grid_level = "10km";
					}  else if(map.zoom=="6" || map.zoom=="7" || map.zoom=="8") {
						grid_level = "1km";
					}  else if(map.zoom=="9" || map.zoom=="10" || map.zoom=="11" || map.zoom=="12" || map.zoom=="13") {
						grid_level = "100m";
					} 
					$("#grid_title_1").html("<span style='font-weight:bold;'>지도레벨 : " + map.zoom + "</span>(0~13), &nbsp;&nbsp;<span style='font-weight:bold;'> 격자레벨 : " + grid_level + "</span>(100km/10km/1km/100m)");
				}
				
			},
			
			/**
			 * 
			 * @name         : setDataType
			 * @description  : 현재 조회한 데이터타입을 설정한다.
			 * @date         : 2016. 01. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setDataType : function(mapId, type) {// used
				$workRoad.ui.log("$ssaMap.ui.setDataType - begin");
				
				if (this.dataTypeList != null && 
					Object.prototype.toString.call(this.dataTypeList) === "[object Array]") {
					if (type == "poi") {
						if (this.dataTypeList[mapId] != "" && this.dataTypeList[mapId] != null) {
							return;
						}
					}
					this.dataTypeList[mapId] = type;
					if (type == "userData") {
						$ssaMapFrame.ui.curSelectedStatsType = "userData";
					}
					
				}
			},
			
			/**
			 * 
			 * @name         : createMap
			 * @description  : 맵 및 맵에 오버레이될 그래프, 범례 등을 생성한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱, 김성현
			 * @history 	 :
			 */
			createMap : function(id, seq) {// used
				$workRoad.ui.log("$ssaMap.ui.createMap - begin");
				
				var map = new sMap.map();
				map.createMap($ssaMap, id, {
					center : [ 989674, 1818313 ],
					zoom : 2, //9->8
					measureControl : false,
					statisticTileLayer: true
				});
				
				map.id = seq;
				map.addControlEvent("drop", {accept : ".dragItem"});
				map.addControlEvent("movestart");
				map.addControlEvent("moveend");
				map.addControlEvent("zoomend");	
				map.addControlEvent("draw");
								
				//범례 호출 함수 
				var legend = new sLegendInfo.legendInfo(map);			
				legend.initialize($ssaMap.ui);
				map.legend = legend;
				legend.createLegend();
				legend.legendType = "auto";
				//작업부분 끝
				
				var btnInfo = new ssaMapBtnInfo.btnInfo(map, $ssaMap.ui);			
//						var btnInfo = new ssaMapBtnInfo.btnInfo(map, $ssaMap.ui);
				map.mapBtnInfo = btnInfo;
				btnInfo.createUI({
					intrPoiControl : false,			// 본PRJ에서 필요없음 - 2019.01.07	ywKim	변경
					intrSettingControl : false,		// 본PRJ에서 필요없음 - 2019.01.07	ywKim	변경
					mapTypeControl : false,			// 본PRJ에서 필요없음 - 2019.01.07	ywKim	변경
					intrZoomControl : true
				});	
				
				// 임시 - 2018.11.14	ywKim	변경
				//공유
//						var shareInfo = new share.shareInfo(map, $ssaMap.ui);
//						map.shareInfo = shareInfo;
				
				//사용자지정컨트롤설정
				this.mapList[seq] = map;
				
				//갤러리 등록
//						$galleryAdd.delegate = this;

				map.gMap.whenReady(function() {
					map.createHeatMap();
				});
				
				// 범례 (좌측하단)
				//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START
				if(gv_type == "full") {
					$(".ssaMap .sop-bottom.sop-left").css("left", "55px");
				}
				else {
					$(".ssaMap .sop-bottom.sop-left").css("left", "131px");
				}
				//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. END

				//2019-06-10 [김남민] 일자리 맵 서비스 > 메뉴 이동 후에도 전체 화면 확대 유지. START
				if(gv_screen == "full") $ssaMap.ui.doMaxSize(1);
				//2019-06-10 [김남민] 일자리 맵 서비스 > 메뉴 이동 후에도 전체 화면 확대 유지. END
				
				return map; //9월 서비스
			},
			
/******************************
 * 일자리 증감 지도 데이터 함수 START [함수원형 : openApiBoundarySido(), setPolygonDataGeojson(), combineStatsData()]
 ******************************/
			// 전국시도경계가져오기
			ssaJobGrowthOpenApiBoundarySido : function (year, callback) {// used
				$workRoad.ui.log("$ssaMap.ui.ssaJobGrowthOpenApiBoundarySido - begin");

				$.ajax({
					  type: "GET",
					  url: "/js/data/geo_sido_" + year + ".js",
					  success: function(res) {
						  res["pAdmCd"] = "00";
						  var tmpOption = {
								  year : year,
								  adm_cd : "00"
						  }
						  
						  $ssaMap.ui.map = $ssaMap.ui.mapList[$ssaMap.ui.curMapId];
						  
						  $ssaMap.ui.map.mapMove([989674, 1818313], 2);
						  
						  $ssaMap.ui.lastGeojsonInfo = tmpOption ;
						  $ssaMap.ui.ssaJobGrowthSetPolygonDataGeojson(res);
						  
						  if (callback != undefined && callback != null && callback instanceof Function) {
							  callback.call(undefined, this, res); //9월 서비스
						  }
					  } ,
					  dataType: "json",
					  error:function(e){  
				            //alert(e.responseText);  
				      }  
				});
			},
			
			ssaJobGrowthSetPolygonDataGeojson : function (geoData) {// used
				$workRoad.ui.log("$ssaMap.ui.ssaJobGrowthSetPolygonDataGeojson - begin");

				var that = $ssaJobGrowthDetailPopup.ui;
				var mapType = $ssaJobGrowth.ui.MapType;
				
				if(that.MapData.length > 0){
					geoData = this.ssaJobGrowthCombineStatsData(geoData);
				}
				
				// res = combineStatsData(res);
				if (geoData.combine && this.data.length > 0) {
					if (this.map.dataGeojson) {
						this.map.dataGeojson.remove();
						//this.removeCaption();
						this.map.dataGeojson = null;
					}
					this.map.addPolygonGeoJson(geoData, "data");
					
					this.map.dataGeojsonLayer = geoData;
					if (this.map.legend != null) {
						//this.legend.changeDataMode(this.legend.selectType);
						this.map.legend.changeDataMode(that.MapType);
					}
					/*
					if (mapType != null || mapType != "") {
						console.log("mapType null or 공백 아니다!!!");
						//this.map.legend.changeDataMode(that.MapType);
						this.map.legend.changeDataMode(mapType);
					}else{
						console.log("mapType null or 공백!!!");
						this.map.legend.changeDataMode(that.MapType);
					}
					*/
				}
				else {
					this.map.addPolygonGeoJson(geoData, "polygon");
					
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
					if (this.data[0].kosis) {
						interactiveMapKosis.setResultDataOnMap();
					}
				}
				
				//손원웅 20181011 왜 비웠는지?
				//this.data = [];
				if (this.map.delegate && this.map.delegate.callbackFunc && this.map.delegate.callbackFunc.didFinishedHadmaArea instanceof Function) {
					this.map.delegate.callbackFunc.didFinishedHadmaArea(geoData, that);
				}
			},
			
			ssaJobGrowthCombineStatsData : function (boundData, isPass) {// used
				$workRoad.ui.log("$ssaMap.ui.ssaJobGrowthCombineStatsData - begin");
				
				this.data = $ssaJobGrowthDetailPopup.ui.MapData;
				//this.dataPolygonCode = this.curPolygonCode;	// 조회했던 경계레벨

				for ( var k = 0; k < this.data.length; k++) {
					if (this.data[k] != null) {
						boundData["combine"] = true;
					}else {
						boundData["combine"] = false;
					}
					
					for ( var i = 0; i < boundData.features.length; i++) {
						var adm_cd = boundData.features[i].properties.adm_cd;
						if (boundData.features[i].info == null) {
							boundData.features[i]["info"] = [];
						}
						
						if (this.data[k] != null) {
							if(this.data[k].result != null) {
								for ( var x = 0; x < this.data[k].result.length; x++) {
									for (key in this.data[k].result[x]) {
										if (key == "adm_cd") {
											if (adm_cd == this.data[k].result[x].adm_cd) {
												this.data[k].result[x]["showData"] = this.data[k].showData;
												//this.data[k].result[x]["api_id"] = this.data[k].id;
												this.data[k].result[x]["unit"] = this.data[k].unit;
												this.data[k].result[x]["legendIndex"] = k;
												boundData.features[i].info.push(this.data[k].result[x]);
												boundData.features[i]["dataIdx"] = x;
												//boundData.features[i]["_dataIdx"] = this.data[k].result[x]["_dataIdx"];
												boundData.features[i]["dataLength"] = this.data.length;
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
				
				// 대화형 통계지도 툴팁 N/A 처리용
				if(document.location.href.match("interactiveMap")){
					$todayStatusMap.ui.toolTipTitle = this.data[0].showData;
					$todayStatusMap.ui.toolTipUnit = this.data[0].unit;	

				}
				
				return boundData;
				
			},
/******************************
 * 일자리 증감 지도 데이터 함수 END [함수원형 : openApiBoundarySido(), setPolygonDataGeojson(), combineStatsData()]
 ******************************/

/******************************
 * 일자리 질 지도 데이터 함수 START [함수원형 : openApiBoundarySido(), setPolygonDataGeojson(), combineStatsData()]
 ******************************/
			// 전국시도경계가져오기
			ssaJobQualityOpenApiBoundarySido : function (year, callback) {// used
				$workRoad.ui.log("$ssaMap.ui.ssaJobQualityOpenApiBoundarySido - begin");

				$.ajax({
					  type: "GET",
					  url: "/js/data/geo_sido_" + year + ".js",
					  success: function(res) {
						  res["pAdmCd"] = "00";
						  var tmpOption = {
								  year : year,
								  adm_cd : "00"
						  }
						  
						  $ssaMap.ui.map = $ssaMap.ui.mapList[$ssaMap.ui.curMapId];
						  
						  $ssaMap.ui.map.mapMove([989674, 1818313], 2);
						  
						  $ssaMap.ui.lastGeojsonInfo = tmpOption ;
						  $ssaMap.ui.ssaJobQualitySetPolygonDataGeojson(res);
						  
						  if (callback != undefined && callback != null && callback instanceof Function) {
							  callback.call(undefined, this, res); //9월 서비스
						  }
					  } ,
					  dataType: "json",
					  error:function(e){  
				            //alert(e.responseText);  
				      }  
				});
			},
			
			ssaJobQualitySetPolygonDataGeojson : function (geoData) {// used
				$workRoad.ui.log("$ssaMap.ui.ssaJobQualitySetPolygonDataGeojson - begin");

				var that = $ssaJobQualityDetailPopup.ui;
				
				if(that.MapData.length > 0){
					geoData = this.ssaJobQualityCombineStatsData(geoData);
				}
				
				// res = combineStatsData(res);
				if (geoData.combine && this.data.length > 0) {
					if (this.map.dataGeojson) {
						this.map.dataGeojson.remove();
						//this.removeCaption();
						this.map.dataGeojson = null;
					}
					this.map.addPolygonGeoJson(geoData, "data");
					
					this.map.dataGeojsonLayer = geoData;
					if (this.map.legend != null) {
						//this.legend.changeDataMode(this.legend.selectType);
						this.map.legend.changeDataMode(that.MapType);
					}
				}
				else {
					this.map.addPolygonGeoJson(geoData, "polygon");
					
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
					if (this.data[0].kosis) {
						interactiveMapKosis.setResultDataOnMap();
					}
				}
				
				//손원웅 20181011 왜 비웠는지?
				//this.data = [];
				if (this.map.delegate && this.map.delegate.callbackFunc && this.map.delegate.callbackFunc.didFinishedHadmaArea instanceof Function) {
					this.map.delegate.callbackFunc.didFinishedHadmaArea(geoData, that);
				}
			},
			
			ssaJobQualityCombineStatsData : function (boundData, isPass) {// used
				$workRoad.ui.log("$ssaMap.ui.ssaJobQualityCombineStatsData - begin");
				
				this.data = $ssaJobQualityDetailPopup.ui.MapData;
				//this.dataPolygonCode = this.curPolygonCode;	// 조회했던 경계레벨

				for ( var k = 0; k < this.data.length; k++) {
					if (this.data[k] != null) {
						boundData["combine"] = true;
					}else {
						boundData["combine"] = false;
					}
					
					for ( var i = 0; i < boundData.features.length; i++) {
						var adm_cd = boundData.features[i].properties.adm_cd;
						if (boundData.features[i].info == null) {
							boundData.features[i]["info"] = [];
						}
						
						if (this.data[k] != null) {
							if(this.data[k].result != null) {
								for ( var x = 0; x < this.data[k].result.length; x++) {
									for (key in this.data[k].result[x]) {
										if (key == "adm_cd") {
											if (adm_cd == this.data[k].result[x].adm_cd) {
												this.data[k].result[x]["showData"] = this.data[k].showData;
												//this.data[k].result[x]["api_id"] = this.data[k].id;
												this.data[k].result[x]["unit"] = this.data[k].unit;
												this.data[k].result[x]["legendIndex"] = k;
												boundData.features[i].info.push(this.data[k].result[x]);
												boundData.features[i]["dataIdx"] = x;
												//boundData.features[i]["_dataIdx"] = this.data[k].result[x]["_dataIdx"];
												boundData.features[i]["dataLength"] = this.data.length;
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
				
				// 대화형 통계지도 툴팁 N/A 처리용
				if(document.location.href.match("interactiveMap")){
					$todayStatusMap.ui.toolTipTitle = this.data[0].showData;
					$todayStatusMap.ui.toolTipUnit = this.data[0].unit;	

				}
				
				return boundData;
				
			},
/******************************
 * 일자리 질 지도 데이터 함수 END [함수원형 : openApiBoundarySido(), setPolygonDataGeojson(), combineStatsData()]
 ******************************/
			
/******************************
 * 경제상황 지도 데이터 함수 START [함수원형 : openApiBoundarySido(), setPolygonDataGeojson(), combineStatsData()]
 ******************************/
			// 전국시도경계가져오기
			ssaEconomicSituationOpenApiBoundarySido : function (year, callback) {
				$workRoad.ui.addFnc04List("$ssaMap.ui.ssaEconomicSituationOpenApiBoundarySido");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				$.ajax({
					  type: "GET",
					  url: "/js/data/geo_sido_" + year + ".js",
					  success: function(res) {
						  res["pAdmCd"] = "00";
						  var tmpOption = {
								  year : year,
								  adm_cd : "00"
						  }
						  
						  $ssaMap.ui.map = $ssaMap.ui.mapList[$ssaMap.ui.curMapId];
						  
						  $ssaMap.ui.map.mapMove([989674, 1818313], 2);
						  
						  $ssaMap.ui.lastGeojsonInfo = tmpOption ;
						  $ssaMap.ui.ssaEconomicSituationSetPolygonDataGeojson(res);
						  
						  if (callback != undefined && callback != null && callback instanceof Function) {
							  callback.call(undefined, this, res); //9월 서비스
						  }
					  } ,
					  dataType: "json",
					  error:function(e){  
				            //alert(e.responseText);  
				      }  
				});
			},
			
			ssaEconomicSituationSetPolygonDataGeojson : function (geoData) {
				$workRoad.ui.addFnc04List("$ssaMap.ui.ssaEconomicSituationSetPolygonDataGeojson");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var that = $ssaEconomicSituationDetailPopup.ui;
				
				if(that.MapData.length > 0){
					geoData = this.ssaEconomicSituationCombineStatsData(geoData);
				}
				
				// res = combineStatsData(res);
				if (geoData.combine && this.data.length > 0) {
					if (this.map.dataGeojson) {
						this.map.dataGeojson.remove();
						//this.removeCaption();
						this.map.dataGeojson = null;
					}
					this.map.addPolygonGeoJson(geoData, "data");
					
					this.map.dataGeojsonLayer = geoData;
					if (this.map.legend != null) {
						//this.legend.changeDataMode(this.legend.selectType);
						this.map.legend.changeDataMode(that.MapType);
					}
				}
				else {
					this.map.addPolygonGeoJson(geoData, "polygon");
					
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
					if (this.data[0].kosis) {
						interactiveMapKosis.setResultDataOnMap();
					}
				}
				
				//손원웅 20181011 왜 비웠는지?
				//this.data = [];
				if (this.map.delegate && this.map.delegate.callbackFunc && this.map.delegate.callbackFunc.didFinishedHadmaArea instanceof Function) {
					this.map.delegate.callbackFunc.didFinishedHadmaArea(geoData, that);
				}
			},
			
			ssaEconomicSituationCombineStatsData : function (boundData, isPass) {
				$workRoad.ui.addFnc04List("$ssaMap.ui.ssaEconomicSituationCombineStatsData");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				
				this.data = $ssaEconomicSituationDetailPopup.ui.MapData;
				//this.dataPolygonCode = this.curPolygonCode;	// 조회했던 경계레벨

				for ( var k = 0; k < this.data.length; k++) {
					if (this.data[k] != null) {
						boundData["combine"] = true;
					}else {
						boundData["combine"] = false;
					}
					
					for ( var i = 0; i < boundData.features.length; i++) {
						var adm_cd = boundData.features[i].properties.adm_cd;
						if (boundData.features[i].info == null) {
							boundData.features[i]["info"] = [];
						}
						
						if (this.data[k] != null) {
							if(this.data[k].result != null) {
								for ( var x = 0; x < this.data[k].result.length; x++) {
									for (key in this.data[k].result[x]) {
										if (key == "adm_cd") {
											if (adm_cd == this.data[k].result[x].adm_cd) {
												this.data[k].result[x]["showData"] = this.data[k].showData;
												//this.data[k].result[x]["api_id"] = this.data[k].id;
												this.data[k].result[x]["unit"] = this.data[k].unit;
												this.data[k].result[x]["legendIndex"] = k;
												boundData.features[i].info.push(this.data[k].result[x]);
												boundData.features[i]["dataIdx"] = x;
												//boundData.features[i]["_dataIdx"] = this.data[k].result[x]["_dataIdx"];
												boundData.features[i]["dataLength"] = this.data.length;
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
				
				// 대화형 통계지도 툴팁 N/A 처리용
				if(document.location.href.match("interactiveMap")){
					$todayStatusMap.ui.toolTipTitle = this.data[0].showData;
					$todayStatusMap.ui.toolTipUnit = this.data[0].unit;	

				}
				
				return boundData;
				
			},
/******************************
 * 경제상황 지도 데이터 함수 END [함수원형 : openApiBoundarySido(), setPolygonDataGeojson(), combineStatsData()]
 ******************************/

// 2020-04-24 [곽제욱] 삶의 질 지도 함수 START
/******************************
 * 삶의 질 지도 데이터 함수 START [함수원형 : openApiBoundarySido(), setPolygonDataGeojson(), combineStatsData()]
 ******************************/
			// 전국시도경계가져오기
			ssaLifeQualityOpenApiBoundarySido : function (year, callback) {// used
				$workRoad.ui.log("$ssaMap.ui.ssaLifeQualityOpenApiBoundarySido - begin");

				$.ajax({
					  type: "GET",
					  url: "/js/data/geo_sido_" + year + ".js",
					  success: function(res) {
						  res["pAdmCd"] = "00";
						  var tmpOption = {
								  year : year,
								  adm_cd : "00"
						  }
						  
						  $ssaMap.ui.map = $ssaMap.ui.mapList[$ssaMap.ui.curMapId];
						  
						  $ssaMap.ui.map.mapMove([989674, 1818313], 2);
						  
						  $ssaMap.ui.lastGeojsonInfo = tmpOption ;
						  $ssaMap.ui.ssaLifeQualitySetPolygonDataGeojson(res);
						  
						  if (callback != undefined && callback != null && callback instanceof Function) {
							  callback.call(undefined, this, res); //9월 서비스
						  }
					  } ,
					  dataType: "json",
					  error:function(e){  
				            //alert(e.responseText);  
				      }  
				});
			},
			
			ssaLifeQualitySetPolygonDataGeojson : function (geoData) {// used
				$workRoad.ui.log("$ssaMap.ui.ssaLifeQualitySetPolygonDataGeojson - begin");

				var that = $ssaLifeQualityDetailPopup.ui;
				var mapType = $ssaLifeQuality.ui.MapType;
				
				if(that.MapData.length > 0){
					geoData = this.ssaLifeQualityCombineStatsData(geoData);
				}
				
				// res = combineStatsData(res);
				if (geoData.combine && this.data.length > 0) {
					if (this.map.dataGeojson) {
						this.map.dataGeojson.remove();
						//this.removeCaption();
						this.map.dataGeojson = null;
					}
					this.map.addPolygonGeoJson(geoData, "data");
					
					this.map.dataGeojsonLayer = geoData;
					if (this.map.legend != null) {
						//this.legend.changeDataMode(this.legend.selectType);
						this.map.legend.changeDataMode(that.MapType);
					}
					/*
					if (mapType != null || mapType != "") {
						console.log("mapType null or 공백 아니다!!!");
						//this.map.legend.changeDataMode(that.MapType);
						this.map.legend.changeDataMode(mapType);
					}else{
						console.log("mapType null or 공백!!!");
						this.map.legend.changeDataMode(that.MapType);
					}
					*/
				}
				else {
					this.map.addPolygonGeoJson(geoData, "polygon");
					
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
					if (this.data[0].kosis) {
						interactiveMapKosis.setResultDataOnMap();
					}
				}
				
				//손원웅 20181011 왜 비웠는지?
				//this.data = [];
				if (this.map.delegate && this.map.delegate.callbackFunc && this.map.delegate.callbackFunc.didFinishedHadmaArea instanceof Function) {
					this.map.delegate.callbackFunc.didFinishedHadmaArea(geoData, that);
				}
			},
			
			ssaLifeQualityCombineStatsData : function (boundData, isPass) {// used
				$workRoad.ui.log("$ssaMap.ui.ssaLifeQualityCombineStatsData - begin");
				
				this.data = $ssaLifeQualityDetailPopup.ui.MapData;
				//this.dataPolygonCode = this.curPolygonCode;	// 조회했던 경계레벨

				for ( var k = 0; k < this.data.length; k++) {
					if (this.data[k] != null) {
						boundData["combine"] = true;
					}else {
						boundData["combine"] = false;
					}
					
					for ( var i = 0; i < boundData.features.length; i++) {
						var adm_cd = boundData.features[i].properties.adm_cd;
						if (boundData.features[i].info == null) {
							boundData.features[i]["info"] = [];
						}
						
						if (this.data[k] != null) {
							if(this.data[k].result != null) {
								for ( var x = 0; x < this.data[k].result.length; x++) {
									for (key in this.data[k].result[x]) {
										if (key == "adm_cd") {
											if (adm_cd == this.data[k].result[x].adm_cd) {
												this.data[k].result[x]["showData"] = this.data[k].showData;
												//this.data[k].result[x]["api_id"] = this.data[k].id;
												this.data[k].result[x]["unit"] = this.data[k].unit;
												this.data[k].result[x]["legendIndex"] = k;
												boundData.features[i].info.push(this.data[k].result[x]);
												boundData.features[i]["dataIdx"] = x;
												//boundData.features[i]["_dataIdx"] = this.data[k].result[x]["_dataIdx"];
												boundData.features[i]["dataLength"] = this.data.length;
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
				
				// 대화형 통계지도 툴팁 N/A 처리용
				if(document.location.href.match("interactiveMap")){
					$todayStatusMap.ui.toolTipTitle = this.data[0].showData;
					$todayStatusMap.ui.toolTipUnit = this.data[0].unit;	

				}
				
				return boundData;
				
			},
/******************************
 * 삶의 질 지도 지도 데이터 함수 END [함수원형 : openApiBoundarySido(), setPolygonDataGeojson(), combineStatsData()]
 ******************************/			
// 2020-04-24 [곽제욱] 삶의 질 지도 함수 END
			
			//일자리현황 전국시도경계가져오기
			openApiBoundarySido : function (year, callback) {// used
				$workRoad.ui.log("$ssaMap.ui.openApiBoundarySido - begin");
				
				$.ajax({
					  type: "GET",
					  url: "/js/data/geo_sido_" + year + ".js",
					  success: function(res) {
						  res["pAdmCd"] = "00";
						  var tmpOption = {
								  year : year,
								  adm_cd : "00"
						  }
						  
						  $ssaMap.ui.map = $ssaMap.ui.mapList[$ssaMap.ui.curMapId];
						  
						  $ssaMap.ui.map.mapMove([989674, 1818313], 2);
						  
						  $ssaMap.ui.lastGeojsonInfo = tmpOption ;
						  $ssaMap.ui.setPolygonDataGeojson(res);
						  
						  if (callback != undefined && callback != null && callback instanceof Function) {
							  callback.call(undefined, this, res); //9월 서비스
						  }
					  } ,
					  dataType: "json",
					  error:function(e){  
				            //alert(e.responseText);  
				      }  
				});
			},
			
			setPolygonDataGeojson : function (geoData) {// used
				$workRoad.ui.log("$ssaMap.ui.setPolygonDataGeojson - begin");
				
				var that = $ssaDetailPopup.ui;
				
				if(that.MapData.length > 0){
					geoData = this.combineStatsData(geoData);
				}
				
				// res = combineStatsData(res);
				if (geoData.combine && this.data.length > 0) {
					if (this.map.dataGeojson) {
						this.map.dataGeojson.remove();
						//this.removeCaption();
						this.map.dataGeojson = null;
					}
					this.map.addPolygonGeoJson(geoData, "data");
					
					this.map.dataGeojsonLayer = geoData;
					if (this.map.legend != null) {
						//this.legend.changeDataMode(this.legend.selectType);
						this.map.legend.changeDataMode(that.MapType);
					}
				}
				else {
					this.map.addPolygonGeoJson(geoData, "polygon");
					
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
					if (this.data[0].kosis) {
						interactiveMapKosis.setResultDataOnMap();
					}
				}
				
				//손원웅 20181011 왜 비웠는지?
				//this.data = [];
				if (this.map.delegate && this.map.delegate.callbackFunc && this.map.delegate.callbackFunc.didFinishedHadmaArea instanceof Function) {
					this.map.delegate.callbackFunc.didFinishedHadmaArea(geoData, that);
				}
			},
			
			combineStatsData : function (boundData, isPass) {// used
				$workRoad.ui.log("$ssaMap.ui.combineStatsData - begin");
				
				this.data = $ssaDetailPopup.ui.MapData;
				//this.dataPolygonCode = this.curPolygonCode;	// 조회했던 경계레벨

				for ( var k = 0; k < this.data.length; k++) {
					if (this.data[k] != null) {
						boundData["combine"] = true;
					}else {
						boundData["combine"] = false;
					}
					
					for ( var i = 0; i < boundData.features.length; i++) {
						var adm_cd = boundData.features[i].properties.adm_cd;
						if (boundData.features[i].info == null) {
							boundData.features[i]["info"] = [];
						}
						
						if (this.data[k] != null) {
							if(this.data[k].result != null) {
								for ( var x = 0; x < this.data[k].result.length; x++) {
									for (key in this.data[k].result[x]) {
										if (key == "adm_cd") {
											if (adm_cd == this.data[k].result[x].adm_cd) {
												this.data[k].result[x]["showData"] = this.data[k].showData;
												//this.data[k].result[x]["api_id"] = this.data[k].id;
												this.data[k].result[x]["unit"] = this.data[k].unit;
												this.data[k].result[x]["legendIndex"] = k;
												boundData.features[i].info.push(this.data[k].result[x]);
												boundData.features[i]["dataIdx"] = x;
												boundData.features[i]["_dataIdx"] = this.data[k].result[x]["_dataIdx"];
												boundData.features[i]["dataLength"] = this.data.length;
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
				
				// 대화형 통계지도 툴팁 N/A 처리용
				if(document.location.href.match("interactiveMap")){
					$todayStatusMap.ui.toolTipTitle = this.data[0].showData;
					$todayStatusMap.ui.toolTipUnit = this.data[0].unit;	

				}
				
				return boundData;
				
			},
			
			setLegendForStatsData : function (isPass) {// used
				$workRoad.ui.log("$ssaMap.ui.setLegendForStatsData - begin");
				
				var that = $ssaMap.ui;
				var arData = new Array();
				if (this.data.length > 0) {
					for ( var k = 0; k < this.data.length; k++) {
						var tmpData = new Array();
						if (this.data[k].showData) {								
							if(this.data[k].result != null) {
								for ( var i = 0; i < this.data[k].result.length; i++) {
									for (key in this.data[k].result[i]) {
										if (key == this.data[k].showData) {
											tmpData.push(parseFloat(this.data[k].result[i][key]));
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
				//20181011 손원웅_isPass 조건 삭제
				//if (isPass == undefined || !isPass) {
					// mng_s  20170802 정책통계지도 범례 좌측으로 고정
					var curPage = document.location.href;
					//var pageNum = curPage.length;
					var matchStr = "policyStaticMap";
					
					//var pageName = curPage.substring(pageNum-15, pageNum);
					if(curPage.match(matchStr)){
						if(this.id == "0"){
							arData2 = arData;//test
							
							that.map.legend.valPerSlice = that.map.legend.calculateLegend(arData);//test
						}else{
							if(arData2[0].length != 0){
								arData = arData2
							}
							that.map.legend.valPerSlice = that.map.legend.calculateLegend(arData);
						}
					}else{
						that.map.legend.valPerSlice = that.map.legend.calculateLegend(arData);//test
						
						
						
						//mng_s 20171016 VIEW가 여러개일 때 범례 고정관련 수정
						if ( this.target == "mapRgn_1" ) {
							sLegendInfo.legendInfo.fixed_legend_val1 = arData;
						} else if ( this.target == "mapRgn_2" ) {
							sLegendInfo.legendInfo.fixed_legend_val2 = arData;
						} else if ( this.target == "mapRgn_3" ) {
							sLegendInfo.legendInfo.fixed_legend_val3 = arData;
						}
						
					}
					//mng_e  20170802 정책통계지도 범례 좌측으로 고정
				//}
				
			},
			//20181207 commonMap.js 에 addPolygonGeoJson 사용
			/*addPolygonGeoJson : function (obj, type, opt) {
				var that = $ssaMap.ui;
				
				console.log("[map.js] addPolygonGeoJson() 상위111 호출");
				console.log("[map.js] addPolygonGeoJson() 상위111 type [" + type);
				
				var adm_cd = "";
				var geojson = sop.geoJson(obj, {
					style : that.setPolygonGeoJsonStyle(type),
					onEachFeature : function (feature, layer) {
						adm_cd = layer.feature.properties.adm_cd;
						that.setLayerColor(feature, layer);								
						layer.on({
							mouseover : function (e) {
								that.map.isMouseOver = true;
								if (!that.map.isLayerMouseEventDisabled) {
									that.map.clearToolTip(); //9월 서비스
									that.map.setPolyLayerMouseover(e);
									if (that.map.infoControl != null) {
										that.map.infoControl.update(feature.properties);
									}
									if (feature.properties.adm_cd != undefined &&
										feature.properties.adm_cd.length > 0) {
										that.map.mouseOverAdmCd = feature.properties.adm_cd;
									}
									// mouse over , 사용자 콜백
									if (that.map.delegate && 
										that.map.delegate.callbackFunc &&
										that.map.delegate.callbackFunc.didMouseOverPolygon) {
										that.map.delegate.callbackFunc.didMouseOverPolygon(e, feature, layer.options.type, that.map);
									}
								}
							},
							mouseout : function (e) {
								that.map.isMouseOver = false;
								if (!that.map.isLayerMouseEventDisabled) {
									that.map.setPolyLayerMouseout(e);
									// mouse out, 사용자 콜백
									if (that.map.delegate && 
										that.map.delegate.callbackFunc &&
										that.map.delegate.callbackFunc.didMouseOutPolygon) {
										that.map.delegate.callbackFunc.didMouseOutPolygon(e, feature, layer.options.type, that.map);
									}
								}
							},
							click : function (e) {
								if (!that.map.isLayerMouseEventDisabled) {
									var layer = e.target;
									if (!sop.Browser.ie) {
										layer.bringToFront();
									}	
									if (that.map.delegate && 
										that.map.delegate.callbackFunc && 
										that.map.delegate.callbackFunc.didSelectedPolygon) {
										that.map.delegate.callbackFunc.didSelectedPolygon(e, feature, layer.options.type, that.map);
									}
								}
							},
							
							drop : function (e) {
								var layer = e.target;
								that.map.curDropPolygonCode = that.map.curPolygonCode;
								that.map.isNoReverseGeocode = true;
								that.map.dropEvent = e;
								that.map.curDropCd = layer.feature.properties.adm_cd;
								
								if (!that.map.isInnerMapShow3) { //mng_s 20180213 행정구역 그리드의 경우 읍면동으로 내려가면 8 자리인데 7자리로 자르면 않됨
									if (that.map.curDropCd.length > 7) {
										that.map.curDropCd = that.map.curDropCd.substring(0,7);
									}
								}

								// fitBounds는 moveend 이벤트가 발생하므로,
								// moveend에서 drop 이벤트를 처리한다.
								this.gMap.fitBounds(layer.getBounds(), {
									maxZoom : this.zoom,
									animate : false
								});

								var zoom = that.map.zoom;	
								that.map.mapMove([layer.dropUTMK.x, layer.dropUTMK.y], that.map.setZoomCalibrate(zoom, 6));
								
								if (that.map.delegate && 
									that.map.delegate.callbackFunc && 
									that.map.delegate.callbackFunc.didMapDropEnd instanceof Function) {
									that.map.delegate.callbackFunc.didMapDropEnd(e.dropEvent, e.dropSource, e.target, e.target.feature.properties, that.map);
								}
								
								that.map.isMouseOver = false;
								
							},
							sync : function (e) {
								if(e.action == "mouseover") {
									that.map.isMouseOver = true;		
									that.map.setPolyLayerMouseover(e);
									
									if (that.map.infoControl != null) {
										that.map.infoControl.update(e.target.feature);
									}
																		
									if (feature.properties.adm_cd != undefined &&
										feature.properties.adm_cd.length > 0) {
										that.map.mouseOverAdmCd = e.target.feature.properties.adm_cd;
									}
									
									// mouse over , 사용자 콜백
									if (that.map.delegate && 
										that.map.delegate.callbackFunc &&
										that.map.delegate.callbackFunc.didMouseOverPolygon) {
										that.map.delegate.callbackFunc.didMouseOverPolygon(e, e.target.feature, layer.options.type, that.map,that.map.id);
									}
										
								} else if(e.action == "mouseout") {
									//$thematicMapFrame06.ui.mapList[0].setPolyLayerMouseout(e);
									//$thematicMapFrame06.ui.mapList[1].setPolyLayerMouseout(e);
								}
							}
						
						});
					},
					type : type, // 일반경계인지, 데이터경계인지 구분
					layerCode : that.map.curPolygonCode,
				
				});
				
				if (type == "polygon" || type == "build" || type == "industry") {
					that.map.geojson = geojson;
				}else if (type == "trade") {
					that.map.tradeGeojson = geojson;
				}else {
					that.map.dataGeojson = geojson;
					
				}
					
				if (opt) {
					if (opt.group) {
						if (type == "polygon" || type == "build" || type == "industry") {
							that.map.geojson.addTo(opt.group);
						}else if (type == "trade") {
							that.map.tradeGeojson.addTo(opt.group);
						}else {
							that.map.dataGeojson.addTo(opt.group);
						}
					}
					else {
						if (type == "polygon" || type == "build" || type == "industry") {
							that.map.geojson.addTo(that.map.gMap);
						}else if (type == "trade") {
							that.map.tradeGeojson.addTo(that.map.gMap);
						}else {
							that.map.dataGeojson.addTo(that.map.gMap);
						}		
					}
				}
				else {
					if (type == "polygon" || type == "build" || type == "industry") {
						that.map.geojson.addTo(that.map.gMap);
					}else if (type == "trade") {
						that.map.tradeGeojson.addTo(that.map.gMap);
					}else {
						that.map.dataGeojson.addTo(that.map.gMap);
					}	
				}
				
				if(adm_cd != null && adm_cd != undefined){
					console.log("[map.js] addPolygonGeoJson() 상위111 adm_cd[" + adm_cd);
					console.log("[map.js] addPolygonGeoJson() 상위111 adm_cd.length[" + adm_cd.length);
				}
				
				//집계구경계의 중심좌표 설정
				if (!that.map.isTradeMapShow && !that.map.isInnerMapShow && !that.map.isInnerMapShow3) { //mng_s 20180209 isInnerMapShow3 추가
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
					if (that.map.combineCallback != undefined && that.map.combineCallback != null && that.map.combineCallback instanceof Function) {
						that.map.combineCallback.call(undefined, that.map, that.map.dataGeojson);
					  }
				}
				
				if ( that.map.isInnerMapShow2 ) {
					$("#legendColor_"+that.map.legend.id+ " li>a").eq(that.map.gridLegendClickNum).click(); //mng_s 그리드 범례요청
					
					
					console.log("[map.js] addPolygonGeoJson() 상위111 map.legend.legendColor [" + map.legend.legendColor);
					
					$("#legendColor_"+map.legend.id+" >li>a").each(function() {
						if ($(map).attr("data-color") == map.legend.legendColor) {
							$(map).click();
						}
					});
					
				}
				
				if ( that.map.isInnerMapShow3 ) {
					$("#legendColor_"+that.map.legend.id+ " li>a").eq(that.map.gridLegendClickNum).click(); //mng_s 행정구역 그리드 범례요청
				}
				
				return geojson;
			},
			*/
			setLayerColor : function (feature, layer) {
				$workRoad.ui.addFnc04List("$ssaMap.ui.setLayerColor");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var that = $ssaMap.ui;
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
										fillColor : that.map.legend.getColor(feature.info[x][param], that.map.legend.valPerSlice[x])[0]
									});
									break;
								}
							}
						}
					}
				}
			},
			
			setPolygonGeoJsonStyle : function (type) {
				$workRoad.ui.addFnc04List("$ssaMap.ui.setPolygonGeoJsonStyle");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도			
				// 일반경계일 경우, 색상을 채우지않고,
				// 데이터경계일 경우, 색상을 채운다.
				var color = "#666666";
				var fillColor = "white";
				var weight = 1.75;
				var fillOpacity = 0.7;
				var dashArray =  '3';
				
			/*	switch (this.mapMode) {
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
				}*/
				
				switch (type) {
					case "data":
						color = "white", 
						fillColor = "#F0FFF0";
						weight = 1;
						/*//mng_s 20180104 주용민 투명도
						if(sop.isInnerMapShow2) {
							if($legendInfo.ui.slideInfo.slideValue2 == undefined){
								$legendInfo.ui.slideInfo.slideValue2 = 0.7;
							};
							this.dataPolygonFillOpacity = $legendInfo.ui.slideInfo.slideValue2;
							fillOpacity = this.dataPolygonFillOpacity;
							$("#legendDataSlider").slider("option","value",fillOpacity);
						} else if(sop.isInnerMapShow3) { //mng_s 20180219 추가
							if($legendInfo.ui.slideInfo.slideValue2 == undefined){
								$legendInfo.ui.slideInfo.slideValue2 = 0.7;
							};
							this.dataPolygonFillOpacity = $legendInfo.ui.slideInfo.slideValue2;
							fillOpacity = this.dataPolygonFillOpacity;
							$("#legendDataSlider").slider("option","value",fillOpacity);
						} else {
							if($legendInfo.ui.slideInfo.slideValue1 == undefined){
								$legendInfo.ui.slideInfo.slideValue1 = 0.7;
							};
							this.dataPolygonFillOpacity = $legendInfo.ui.slideInfo.slideValue1;
							fillOpacity = this.dataPolygonFillOpacity;
							$("#legendDataSlider").slider("option","value",fillOpacity);
						}
						//mng_e
*/						dashArray = "";
						break;
					case "build":
						fillColor = "#9c0095";
						weight = 2.5;
						fillOpacity = 0.7;
						break;
					case "trade":
						return {
							weight : 2.5,
							opacity : 1,
							color : color,
							dashArray: '3',
							fillOpacity : 0.7,
							fillColor : "#9c0095",
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
			},
			
			
			/**
			 * 
			 * @name         : doMaxSize
			 * @description  : 맵을 최대화한다.
			 * @date         : 2015. 10. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doMaxSize : function(type) {// used
				$workRoad.ui.log("$ssaMap.ui.doMaxSize - begin");
				
				var ck = $(".tb_sizing").hasClass("on"); 
				if(!ck){
					$(".tb_sizing").addClass("on");
					$(".tb_sizing").children().attr("src","/images/workRoad/ico/ico_toolbars12.png");
					$(".tb_sizing").eq(0).attr("title","전체 화면 축소").data("ui-tooltip-title","전체 화면 축소"); // 2019.08.21 이금은 추가
					$(".tb_sizing").eq(1).attr("title","전체 화면 축소").data("ui-tooltip-title","전체 화면 축소"); // 2019.08.21 이금은 추가
					$(".tb_sizing").eq(2).attr("title","전체 화면 축소").data("ui-tooltip-title","전체 화면 축소"); // 2019.08.21 이금은 추가
					$("header").css({"height":"10px", "width":"100%"}); 
					$(".global_nav, .searchArea, .headerEtc, .gnb, .headerContents form").hide(); // 2020.10.22 '.global_nav, .searchArea,' 추가
					$(".headerContents h1").css({"height":"10px"});
					$(".headerContents h1 img").hide();
					$(".containerBox").css({"height":"calc(100% - 10px)", "top":"10px"});
					$(".searchArea").css("display", "none"); // 검색영역 - 2018.11.13	ywKim	추가
				}else{
					//2019-06-10 [김남민] 일자리 맵 서비스 > 메뉴 이동 후에도 전체 화면 확대 유지. START
					gv_screen = "";
					//2019-06-10 [김남민] 일자리 맵 서비스 > 메뉴 이동 후에도 전체 화면 확대 유지. END
					$(".tb_sizing").removeClass("on");
					$(".tb_sizing").children().attr("src","/images/workRoad/ico/ico_toolbars01.png");
					$(".tb_sizing").eq(0).attr("title","전체 화면 확대").data("ui-tooltip-title","전체 화면 확대"); // 2019.08.21 이금은 추가
					$(".tb_sizing").eq(1).attr("title","전체 화면 확대").data("ui-tooltip-title","전체 화면 확대"); // 2019.08.21 이금은 추가
					$(".tb_sizing").eq(2).attr("title","전체 화면 확대").data("ui-tooltip-title","전체 화면 확대"); // 2019.08.21 이금은 추가
					$("header").css({"height":"104px", "width":"100%"}); // 너비 100%로 - 2018.11.13	ywKim	변경
					$(".global_nav, .searchArea, .headerEtc, .gnb, .headerContents form").show(); // 2020.10.22 '.global_nav, .searchArea,' 추가
					$(".headerContents h1").css({"height":"78px"});
					$(".headerContents h1 img").show();
					$(".containerBox").css({"height":"calc(100% - 105px)", "top":"105px"});
					//2019-06-10 [김남민] 일자리 맵 서비스 > 메뉴 이동 후에도 전체 화면 확대 유지. START
					$(".searchArea").css("display", "block"); // 검색영역 - 2018.11.13	ywKim	추가
					//2019-06-10 [김남민] 일자리 맵 서비스 > 메뉴 이동 후에도 전체 화면 확대 유지. END
				}
				
				for (var i=0; i<this.mapList.length; i++) {
					if (this.mapList[i] != null) {
						this.mapList[i].update();
					}
				}
			},
			
			
			/**
			 * 
			 * @name         : doClearMap
			 * @description  : 맵의 오버레이를 초기화한다.
			 * @date         : 2015. 10. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doClearMap : function(type, isStatsInfoClear) {// used
				$workRoad.ui.log("$ssaMap.ui.doClearMap - begin");
				
				$ssaMap.noReverseGeoCode = false;
				this.curMapId = parseInt(type)-1;
				if (this.mapList.length > 0) {
					var map = this.mapList[this.curMapId];
					if (isStatsInfoClear == undefined || isStatsInfoClear) {
						map.clearDataOverlay();
					}
					
					if (map.drawControl != null) {				// 예외처리 - 2019.01.07	ywKim	변경
						map.drawControl.removeOverlay();
					}
					
					// 임시 - 2018.11.14	ywKim	변경
//					if(map.shareInfo != null) {
//						map.shareInfo.clearShareData();
//					}
					map.legend.legendInit();
					map.mapBtnInfo.doClearSelectedBound();
					map.mapBtnInfo.setFixedBoundBtn(false);
					map.mapBtnInfo.isOpenPOI = false; //2016.10.04 추가
					if($ssaMapFrame.event.marker != null){
						$ssaMapFrame.event.marker.remove();
					}
					this.dataTypeList[this.curMapId] = null;
				}
				this.dropBtnInfo[this.curMapId] = [];
				var viewId = this.curMapId+1;
				$("#title_"+viewId).empty();
				$("#title_"+viewId).hide();
				$("#helper_"+viewId).show();
				
				// 임시 - 2018.11.14	ywKim	변경
//				$mydataDataBoard.ui.delegateSetting($ssaMap.ui);			//나의데이터 세팅
//				$publicDataBoard.ui.delegateSetting($ssaMap.ui);			//공공데이터 세팅
				
				//데이터보드 초기화
				$ssaDataBoard.ui.reset(this.curMapId);
				
				// 임시 - 2018.11.14	ywKim	변경
//				$publicDataBoard.ui.remove(this.curMapId);
//				$mydataDataBoard.ui.remove(this.curMapId);
				
				//초기화한 지도정보와 매핑되는 버튼 Effect 수정
				$ssaMapFrame.ui.updateSearchBtnEffect("", this.curMapId);
			},
			
			
			
			/**
			 * 
			 * @name         : doShare
			 * @description  : 공유를 수행한다.
			 * @date         : 2015. 10. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doShare : function(type) {
				$workRoad.ui.addFnc04List("$ssaMap.ui.doShare");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				
				// 임시 - 2018.11.14	ywKim	변경
//				this.curMapId = parseInt(type)-1;
//				var shareInfo = this.mapList[this.curMapId].shareInfo;
//				var map = this.mapList[this.curMapId];
//				if(shareInfo == null) {
//					messageAlert.open("알림", "공유할 수 없는 데이터입니다.");
//				} else {
//					if (shareInfo.checkShare("SHARE")) {
//						var shareData = shareInfo.shareUrlInfo;
//						var title = "";
//						for (var i=0; i<shareData.length; i++) {
//							title += $.trim(shareData[i].params.title);
//							if (shareData.length > 1 && i==0) {
//								title += " | ";
//							}
//							
//							//2016.10.25 lbdms 캡쳐를 위한 정보 수정
//							if (shareData[i].params != undefined) {
//								if (shareData[i].params.mapInfo != undefined) {
//									shareData[i].params.mapInfo.center = map.center;
//									shareData[i].params.mapInfo.zoomlevel = map.zoom;
//								}
//							}
//						}	
//						shareInfo.doShare(title);
//					}
//				}
				
			},
			
			
			/**
			 * 
			 * @name         : doBookMark
			 * @description  : 북마크를 수행한다.
			 * @date         : 2015. 10. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doBookMark : function(type, srvType) {
				$workRoad.ui.addFnc04List("$ssaMap.ui.doBookMark");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				
				// 임시 - 2018.11.14	ywKim	변경
//				console.log("[ssaMap.js] doBookMark() 호출");
//				
//				this.curMapId = parseInt(type)-1;
//				var shareInfo = this.mapList[this.curMapId].shareInfo;
//				var map = this.mapList[this.curMapId];
//				
//				console.log("[ssaMap.js] doBookMark() srvType [" + srvType);
//				
//				
//				if(shareInfo == null) {
//					messageAlert.open("알림", "저장할 수 없는 데이터입니다.");
//				} else {
//					if (shareInfo.checkShare("BMARK", srvType)) {
//						var shareData = shareInfo.shareUrlInfo;
//						shareData[0]["params"]["curPolygonCode"] = map.dataPolygonCode;
//						var title = "";
//						for (var i=0; i<shareData.length; i++) {
//							title += $.trim(shareData[i].title);
//							if (shareData.length > 1 && i==0) {
//								title += " | ";
//							}
//							
//							//2017.02.22 이미지캡쳐 수정
//							var captureTargetId = "#mapRgn_"+type;
//							
//							//2016.10.25 lbdms 캡쳐를 위한 정보 수정
//							if (shareData[i].params != undefined) {
//								if (shareData[i].params.mapInfo != undefined) {
//									shareData[i].params.mapInfo.center = map.center;
//									shareData[i].params.mapInfo.zoomlevel = map.zoom;
//								}
//								//2017.02.22 이미지캡쳐 수정
//								shareData[i].params["mapCaptureId"] = captureTargetId;
//							}
//							
//							//나의 데이터인 경우
//							if (shareData[i].params.type == "userData") {
//								var value = "";
//								for (var k=1; k<=4; k++) {
//									$("#dbTypeCk0"+k).each(function() {
//										if ($(this).is(":checked")) {
//											value = $(this).val();
//										}
//									});
//								}
//								shareData[i].params.paramInfo["type"] = value;
//							}
//								
//							
//						}
//						
//						//갤러리 등록일 경우
//						if (srvType != undefined && srvType != "IMAP") {
//							switch (srvType) {
//								case "gallary":
//									var captureTargetId = "#mapRgn_"+type;
//									$galleryAdd.map = map;
//									$galleryAdd.makeImageURL("IMAP", captureTargetId);
//									break;
//								case "report":
//									this.reportPopup.$reportFormEvent.UI.makeImageURL("IMAP");
//									break;
//							}
//							return;
//						} 
//						
//						var currentdate = new Date(); 
//					    var datetime = currentdate.getFullYear() + "-"
//					    			+ (currentdate.getMonth()+1)  + "-" 
//					    			+ currentdate.getDate() + " "
//					                + currentdate.getHours() + ":"  
//					                + currentdate.getMinutes() + ":" 
//					                + currentdate.getSeconds();
//					    
//						$("#savesubj").val(title);
//						$("#savedate").val(datetime);
//						
//						$(".deem").show();
//						$("#myGalleryPop").hide();
//						$("#bookmarkdlg").show();
//					}
//				}
			},
			
			
			/**
			 * 
			 * @name         : doInnerMap
			 * @description  : 
			 * @date         : 2015. 10. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param type
			 */
//					doInnerMap : function(type, isShow) {
//						
//						console.log("[ssaMap.js] doInnerMap 호출 type [" + type + "] isShow [" + isShow +"]");
//						
//						this.curMapId = parseInt(type)-1;
//						var map = this.mapList[this.curMapId];
//						map.setInnerMap(isShow);
//						
//						if (isShow) {
//							$(".grid_radio").hide();//mng_s 김준하
//							$("#btnList_"+type).find("ul").hide();
//							$("#btnList_"+type).css("margin-right", "5px");
//							map.mapBtnInfo.controlHide("poi");
//							map.mapBtnInfo.controlHide("setting");
//							map.clearDataOverlay();
//						}else {
//							$(".grid_radio").show();//mng_s 김준하
//							$("#btnList_"+type).find("ul").show();
//							$("#btnList_"+type).css("margin-right", "0px");
//							map.mapBtnInfo.controlShow("poi");
//							map.mapBtnInfo.controlShow("setting");
//						}	
//						
//					},
			
			/**
			 * 
			 * @name         : doInnerMap2
			 * @description  : 그리드 보기 버튼 클릭시 지도 세팅
			 * @date         : 2017. 07. 10. 
			 * @author	     : 김준하
			 * @history 	 :
			 * @param @param type
			 */
//					doInnerMap2 : function(type, isShow) {
//						
//						console.log("[ssaMap.js] doInnerMap2 호출 type [" + type + "] isShow [" + isShow +"]");
//						
//						this.curMapId = parseInt(type)-1;
//						var map = this.mapList[this.curMapId];
//						map.setInnerMap2(isShow);
//						
//						if (isShow) {
////							commonPopupObj.openWin("grid_laypopup");
//							
//							$("#btnList_"+type).find(".tb_mapAdd").hide();
////							$("#btnList_"+type).find(".bnd_grid_radio").hide(); //행정구역 그리드 하이드
//							$("#btnList_"+type).find(".tb_radio").hide(); //사업체 전개도 하이드
//							$("#btnList_"+type).find(".tb_share").hide(); //공유버튼 하이드
//							$("#btnList_"+type).find(".tb_bookmark").hide(); //북마크 하이드
//							$("#btnList_"+type).find(".tb_report").hide(); //리포트 하이드
//							//mng_s 범례 설정버튼 show/hide
//							$(".btn_legendSetting").hide(); //범례 환경설정 버튼 하이드
//							//mng_e 범례 설정버튼 show/hide
//							$("#btnList_"+type).css("margin-right", "-150px");
//							map.mapBtnInfo.controlHide("poi");
//							map.mapBtnInfo.controlHide("setting");
//							map.clearDataOverlay();
//							//그리드 경계를 불러오는 로직을 넣으면 된다.
//							//here grid bnd()
//						}else {
//							//초기화가 완벽하게 않되므로 최초페이지를 그냥 호출한다. 이렇게 않하려면 위쪽 소스를 주석해제 한다. 하지만 초기화가 제대로 되진 않는다.
//							location.href = "/view/map/ssaMap/mainIndexView";
//							
//						}	
//						
//					},
			
			/**
			 * 
			 * @name         : doInnerMap3
			 * @description  : 행정구역 그리드 보기 버튼 클릭시 지도 세팅
			 * @date         : 2018. 02. 06. 
			 * @author	     : 김준하
			 * @history 	 :
			 * @param @param type
			 */
//					doInnerMap3 : function(type, isShow) {
//						
//						console.log("[ssaMap.js] doInnerMap3 호출 type [" + type + "] isShow [" + isShow +"]");
//						
//						this.curMapId = parseInt(type)-1;
//						var map = this.mapList[this.curMapId];
//						map.setInnerMap3(isShow);
//						
//						if (isShow) {
//							$("#btnList_"+type).find(".tb_mapAdd").hide();
//							$("#btnList_"+type).find(".grid_radio").hide(); //그리드 하이드
//							$("#btnList_"+type).find(".tb_radio").hide(); //사업체 전개도 하이드
//							$("#btnList_"+type).find(".tb_share").hide(); //공유버튼 하이드
//							$("#btnList_"+type).find(".tb_bookmark").hide(); //북마크 하이드
//							$("#btnList_"+type).find(".tb_report").hide(); //리포트 하이드
//							//mng_s 범례 설정버튼 show/hide
//							$(".btn_legendSetting").hide(); //범례 환경설정 버튼 하이드
//							//mng_e 범례 설정버튼 show/hide
//							$("#btnList_"+type).css("margin-right", "-150px");
//							map.mapBtnInfo.controlHide("poi");
//							map.mapBtnInfo.controlHide("setting");
//							map.clearDataOverlay();
//							//그리드 경계를 불러오는 로직을 넣으면 된다.
//							//here grid bnd()
//						}else {
//							//초기화가 완벽하게 않되므로 최초페이지를 그냥 호출한다. 이렇게 않하려면 위쪽 소스를 주석해제 한다. 하지만 초기화가 제대로 되진 않는다.
//							location.href = "/view/map/ssaMap/mainIndexView";
//							
//						}	
//						
//					},
			
			
			/**
			 * @name         : doCombineMap
			 * @description  : 범례결합창을 표출한다.
			 * @date         : 2015. 10. 20. 
			 * @author	     : 김성현
			 * @param  type	 : 맵타입
			 */
			doCombineMap : function(type) {
				$workRoad.ui.addFnc04List("$ssaMap.ui.doCombineMap");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var isCombine = true;
				var cnt = 0;
				for (var i=0; i<this.mapList.length; i++) {
					if (this.mapList[i] != null) {
						var map = this.mapList[i];
						var markerCnt = 0;
						map.markers.eachLayer(function(layer) {
							markerCnt++;
						});
						if (map.dataGeojson != null || 
							map.multiLayerControl.dataGeojson != null ||
//							$mydataDataBoard.ui.mapData[map.id].options.rowDataArray.length != 0 ||	// 임시 - 2018.11.14	ywKim	변경 
							markerCnt > 0) {
							cnt++;
						}
					}
				}
				
				if (cnt < 2) {
					isCombine = false;
				}
				
				if (isCombine) {
					$ssaMap.ui.combinePopup = 
						window.open(
							"/view/map/interactiveCombineMap", 
							"combinePopup",
							"top=50, left=100, width=1200, height=800, menubar=no, status=no, toolbar=no, location=no, resizable=yes"
						);	
				}else {
					messageAlert.open("알림", "2개 이상의 조회된 통계정보가 있을때만<br/>지도 겹쳐보기 기능을 사용할 수 있습니다.");
				}
			},
			
			
			/**
			 * @name         : mapLoad
			 * @description  : 범례결합창의 데이터를 설정한다.
			 * @date         : 2015. 10. 20. 
			 * @author	     : 김성현
			 * @param  type	 : 맵타입
			 */
			mapLoad : function() {
				$workRoad.ui.addFnc04List("$ssaMap.ui.mapLoad");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var data = [];
				for (var i=0; i<this.mapList.length; i++) {
					if (this.mapList[i]) {
						var map = this.mapList[i];
						var markerCnt = 0;
						
						map.markers.eachLayer(function() {
							markerCnt++;
						});
						if (map.dataGeojsonLayer == null && 
//							$mydataDataBoard.ui.mapData[map.id].options.rowDataArray.length == 0 &&	// 임시 - 2018.11.14	ywKim	변경 
							markerCnt == 0) {
							continue;
						}
						
						// 임시 - 2018.11.14	ywKim	변경
//						if ($mydataDataBoard.ui.mapData[map.id].options.rowDataArray.length > 0) {
//							data.push({
//								id : map.id, 
//								geojson : null, 
//								data : $mydataDataBoard.ui.mapData[map.id].options,
//								legend : {
//									valPerSlice : map.legend.valPerSlice,
//									legendColor : map.legend.legendColor,
//									type : map.legend.selectType
//								},
//								param:{
//									title : $mydataDataBoard.ui.mapData[map.id].options.title
//								},
//								zoom:map.zoom,
//								center:map.center,
//								adm_cd : map.curDropCd,
//								type : "MY"
//							});
//						}else 
						if (markerCnt > 0) {
							data.push({
								id : map.id, 
								geojson : null, 
								data : map.mapBtnInfo.markerGroup,
								legend : {
									valPerSlice : map.legend.valPerSlice,
									legendColor : map.legend.legendColor,
									type : map.legend.selectType
								},
								param:{
									title : map.mapBtnInfo.selectedPoiTitle
								},
								zoom:map.zoom,
								center:map.center,
								adm_cd : map.curDropCd,
								type : "POI"
							});
						}else {
							data.push({
								id : map.id, 
								geojson : map.dataGeojsonLayer, 
								data : map.dataForCombine,
								legend : {
									valPerSlice : map.legend.valPerSlice,
									legendColor : map.legend.legendColor,
									type : map.legend.selectType
								},
								param:this.dropBtnInfo[map.id],
								zoom:map.zoom,
								center:map.center,
								adm_cd : map.curDropCd,
								type : this.dataTypeList[map.id]
							});
						}
						
					}
					
				}
				var popup = $ssaMap.ui.combinePopup.$combineMap.ui;
				popup.setData(data);
			},
			
			//============ 2017.06.26 [개발팀] kcu 공공데이터 추가 START ============//
			/**
			 * @name         : reportLoad
			 * @description  : 보고서의 데이터를 설정한다.
			 * @date         : 2015. 11. 10. 
			 * @author	     : 권차욱
			 */
			reportLoad : function() {
				$workRoad.ui.addFnc04List("$ssaMap.ui.reportLoad");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var map = this.mapList[this.curMapId];
				var mapType = "ssaMap";
				var divId = "#mapRgn_" + (map.id + 1);
				
				var title, adm_nm, origin, companyObj, subTitle, dataType, mapData, param, options, poiData, chartId;
				var chart = [];
				var legend = null;
				var param = {};
				var menuType = {
						"publicData" : 0,	//공공데이터
						"kosis"      : 1,	//kosis
						"userData"	 : 2,	//나의데이터
						"poi"		 : 3,   //사업체/테마
				};
				
				//데이터타입이 없을 경우 (북마크나 공유로 넘어왔을 경우)
				if (this.dataTypeList[map.id] == undefined || this.dataTypeList[map.id] == null) {
					// 2016. 03. 23 j.h.Seok 수정
					if(this.dropBtnInfo[0] == undefined || this.dropBtnInfo[0].filterParam == null) {
						this.dataTypeList[map.id] = "kosis";
					} else {
						this.dataTypeList[map.id] = "census";
					}
				}
				
				if (this.dataTypeList[map.id] != undefined && this.dataTypeList[map.id] != null) {
					switch (menuType[this.dataTypeList[map.id]]) {
						// 임시 - 2018.11.14	ywKim	변경
//						case 0:
//							mapType = "publicData";
//							var subMenu = {
//								"population" : 0,	//유동인구
//								"school"	 : 1,	//학교인구
//								"metro"		 : 2,	//지하철승하차
//								"busStop"	 : 3,	//버스정류장
//								"cctv"		 : 4	//cctv 2017.06.26 [개발팀] kcu 공공데이터 추가
//							};
//							
//							options = $publicDataBoard.ui.mapData[map.id].options;
//							dataType = $publicDataBoard.ui.mapData[map.id].type;
//							switch (subMenu[$publicDataBoard.ui.mapData[map.id].type]) {
//								case 0:
//									var idx = options.viewIndex;
//									chartId = "publicPopulationChart";
//									poiData = options.result.target.info.resultList[idx];
//									adm_nm = options.result.target.info.resultList[0].adm_nm;
//									$publicDataBoard.ui.chartDataList[map.id][0] = {category:"publicData", type:"poiInfo", data:options.result.target.info.resultList[idx]};
//									mapData = $publicDataBoard.ui.chartDataList[map.id];
//									title = "유동인구 정보" + "  ("+adm_nm+")"; 
//									subTitle = poiData.surv_region+ " 유동인구 ("+makeYYYYMMDDString(poiData.surv_dt)+ " "+poiData.surv_time+")";
//									origin = "중소기업청, 전국 주요상권 유동인구 DB(2010)";
//									break;
//								case 1:
//									adm_nm = "";
//									chartId = "publicSchoolChart";
//									poiData = options.result.target.info.resultList;
//									$publicDataBoard.ui.chartDataList[map.id][0] = {category:"publicData", type:"poiInfo", data:options.result.target.info.resultList};
//									mapData = $publicDataBoard.ui.chartDataList[map.id];
//									title = "학교인구 정보" + "  ("+poiData.school_nm+")"; 
//									subTitle = poiData.school_nm;
//									origin = "한국교육개발원, 교육기본통계(유초중등통계,고등통계)(2013)";
//									break;
//								case 2:
//									adm_nm = "";
//									chartId = $(".metroChartDiv:visible").attr("id");
//									poiData = options.result.target.info;
//									$publicDataBoard.ui.chartDataList[map.id][0] = {category:"publicData", type:"poiInfo", data:options.result.target.info};
//									var tmpChartData = [];
//									if (chartId == "publicMetroChart01") {
//										for (var i=0; i<$publicDataBoard.ui.chartDataList[map.id].length; i++) {
//											if ($publicDataBoard.ui.chartDataList[map.id][i].type == "poiInfo" || 
//												$publicDataBoard.ui.chartDataList[map.id][i].type == "circleAreaInfo") {
//												tmpChartData.push($publicDataBoard.ui.chartDataList[map.id][i]);
//											}
//										}
//									}else if (chartId == "publicMetroChart02") {
//										for (var i=0; i<$publicDataBoard.ui.chartDataList[map.id].length; i++) {
//											if ($publicDataBoard.ui.chartDataList[map.id][i].type == "metro_month" || 
//												$publicDataBoard.ui.chartDataList[map.id][i].type == "circleAreaInfo") {
//												tmpChartData.push($publicDataBoard.ui.chartDataList[map.id][i]);
//											}
//										}
//									}else {
//										for (var i=0; i<$publicDataBoard.ui.chartDataList[map.id].length; i++) {
//											if ($publicDataBoard.ui.chartDataList[map.id][i].type == "metro_dayofweek" || 
//												$publicDataBoard.ui.chartDataList[map.id][i].type == "circleAreaInfo") {
//												tmpChartData.push($publicDataBoard.ui.chartDataList[map.id][i]);
//											}
//										}
//									}
//									
//									mapData = tmpChartData;
//									title = "지하철 승하차인구 정보" + "  ("+poiData.sido_nm+" "+poiData.station_nm+")"; 
//									subTitle = poiData.sido_nm+" "+poiData.station_nm;
//									origin = "철도 노선별 관리기관, 지하철 이용현황(2015,2016)";
//									break;
//								case 3:
//									adm_nm = "";
//									poiData = options.result.target.info;
//									mapData = $publicDataBoard.ui.chartDataList[map.id];
//									title = "버스정류장 정보" + "  ("+poiData.busstop_nm+")"; 
//									subTitle = poiData.busstop_nm;
//									origin = "교통안전공단,버스정류장 위치정보(2016)";
//									break;
//								//2017.06.26 [개발팀] kcu 공공데이터 추가 
//								case 4:
//									var tmpChart = null;
//									var isCCTV = true;
//									var curMarker = null;
//									var name = "";
//									adm_nm = "";
//									poiData = options.result;
//									mapData = $publicDataBoard.ui.chartDataList[map.id];
//									curMarker = $publicDataBoard.ui.selectedCctvObj;
//									title = "세종권역 통행흐름정보";
//									if (curMarker.cctv_lc_id != undefined) {
//										subTitle = curMarker.lc_nm;
//										isCCTV = true;
//									}else {
//										subTitle = curMarker.busstop_nm;
//										isCCTV = false;
//									}
//									origin = "충청청,세종권역정보(2017)";
//									
//									if (isCCTV) {
//										//월별통계 차트정보 - 주말/주중 그래프
//										var data = getChartSvgData("#weekendChart");
//										if (data != undefined) {
//											chart.push({title:"월별통계정보(주중/주말)", data:data});
//										}
//
//										//월별통계 차트정보 - 출퇴근시간대별 그래프
//										var data = getChartSvgData("#rushHoursChart");
//										if (data != undefined) {
//											chart.push({title:"월별통계정보(출퇴근시간)", data:data});
//										}
//
//										//시간대별 차트정보 - 시간대별 그래프
//										var data = getChartSvgData("#timeseriesChart");
//										if (data != undefined) {
//											chart.push({title:"시간대별통계정보(시간대별)", data:data});
//										}
//										
//										//시간대별 차트정보 - 시간대별 그래프
//										var data = getChartSvgData("#dayOfWeekChart");
//										if (data != undefined) {
//											chart.push({title:"시간대별통계정보(요일별)", data:data});
//										}
//		
//									}else {
//										//월별통계정보 - 주중 승하차
//										var data = getChartSvgData("#brtMonthDayOfWeekChart");
//										if (data != undefined) {
//											chart.push({title:"월별통계정보(주중 승하차)", data:data});
//										}
//										
//										//월별통계정보 - 주말 승하차
//										var data = getChartSvgData("#brtMonthWeekendChart");
//										if (data != undefined) {
//											chart.push({title:"월별통계정보(주말 승하차)", data:data});
//										}
//										
//										//월별통계정보 - 출근시간 승하차
//										var data = getChartSvgData("#brtMonthOnWorkGraphArea");
//										if (data != undefined) {
//											chart.push({title:"월별통계정보(출근시간 승하차)", data:data});
//										}
//										
//										//월별통계정보 - 퇴근시간 승하차
//										var data = getChartSvgData("#brtMonthOffWorkChart");
//										if (data != undefined) {
//											chart.push({title:"월별통계정보(퇴근시간 승하차)", data:data});
//										}
//										
//										//시간대별통계정보 - 주중 시간대별
//										var data = getChartSvgData("#brtTimeSeriesDayOfWeekChart");
//										if (data != undefined) {
//											chart.push({title:"시간대별통계정보(주중 시간대별)", data:data});
//										}
//										
//										//시간대별통계정보 - 주말 시간대별
//										var data = getChartSvgData("#brtTimeSeriesWeekendChart");
//										if (data != undefined) {
//											chart.push({title:"시간대별통계정보(주말 시간대별)", data:data});
//										}
//										
//										//시간대별통계정보 - 출근 시간대별
//										var data = getChartSvgData("#brtTimeSeriesOnWorkChart");
//										if (data != undefined) {
//											chart.push({title:"시간대별통계정보(출근 시간대별)", data:data});
//										}
//										
//										//시간대별통계정보 - 퇴근 시간대별
//										var data = getChartSvgData("#brtTimeSeriesOffWorkChart");
//										if (data != undefined) {
//											chart.push({title:"시간대별통계정보(퇴근 시간대별)", data:data});
//										}
//									}
//									break;
//								default:
//									break;
//							}
//								
//							param = {
//								title : title,
//								subTitle: subTitle,
//								adm_nm : adm_nm
//							};
//							
//							//POI통계정보
//							//2017.06.26 [개발팀] kcu 공공데이터 추가 
//							var data = getChartSvgData("#"+chartId);
//							if (data != undefined) {
//								chart.push({title:subTitle, data:data});
//							}
//							
//							
//							//반경내 사업체정보
//							//2017.06.26 [개발팀] kcu 공공데이터 추가 
//							var data = getChartSvgData("#publicDataThemeChart");
//							if (data != undefined) {
//								chart.push({title:subTitle, data:data});
//							}							
//							break;
//						case 2:
//							mapType = "userData";
//							dataType = mapType;
//							mapData = $mydataDataBoard.ui.mapData[map.id].options;
//							if ($mydataDataBoard.ui.selectedMyData != null) {
//								subTitle = $mydataDataBoard.ui.selectedMyData.title;
//							}
//							param = {
//									title : "나의 데이터",
//									subTitle: subTitle
//							};
//							break;
						case 3:
							mapType = "poi";
							dataType = mapType;
							mapData = map.markers;
							param = {
									title : "POI 데이터",
									subTitle: map.mapBtnInfo.selectedPoiTitle
							};
							break;
						default:
							if (this.dataTypeList[map.id] == "kosis") {
								origin = "KOSIS";
							}else {
								origin = $("#dataBoardOrigin").html();
							}
							param = this.dropBtnInfo[map.id];
							mapData = map.dataForCombine;
							dataType = map.legend.selectType;
							break;
					}
				}
				
				if(mapType == "ssaMap"){
					//2017.03.28 2레벨 조회일 경우, 파이차트 숨김
					if ($("#viewDataBoard").find(".topAreaChartsBox").is(":visible")) {
						chart = [
								    {
								    	title : "지역특성그래프", 
								    	data : [
								    	    $("#viewDataBoard").find(".topAreaChartsBox").clone(),
								    	    $("#viewDataBoard").find(".pieLegend").clone()
								    	]
								    }
								];
					}
				}
				
				//2017.06.26 [개발팀] kcu 공공데이터 추가 
				function getChartSvgData(id){
					$workRoad.ui.addFnc04List("$ssaMap.ui.reportLoad.getChartSvgData");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
					var tmpChart = $(id).highcharts();
					if(tmpChart){
						var doc = document.querySelector(id);
						var svg = doc.querySelector("svg");
						var xml  = new XMLSerializer().serializeToString(svg);
			            var canvas = document.createElement("canvas");
			            canvg(canvas, xml);
			            return canvas.toDataURL();
					}
				}
				
				var dataList = {
					id : map.id, 
					divId : divId,
					geojson : map.dataGeojsonLayer, 
					data : mapData,
					legend : {
						valPerSlice : map.legend.valPerSlice,
						legendColor : map.legend.legendColor,
						legendId: "#legend_"+map.legend.id,
						legendType : map.legend.legendType
					},
					param : param,
					zoom : map.zoom,
					center : map.center,
					isCaption : map.legend.numberData,
					dataType : dataType,
					origin : origin,
					markers : map.markers
				};
				
				//2017.02.22 이미지캡쳐 수정
				//==================================================================================================================================//
				setTimeout(function() {
					html2canvas($(divId), {
						logging: true,
	                    useCORS: false,
	                    proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
		 				onrendered: function(canvas) {

	                    	var data = canvas.toDataURL();
	                    	var options = {
		 							mapType : mapType,
		 							mapClone : $(divId).clone(),
		 							mapWidth : $(divId).width(),
		 							mapHeight : $(divId).height(),
		 							chart : chart,
		 							legend :legend,
		 							mapData : data
		 					};
		 					var popup = $ssaMap.ui.reportPopup.$reportForm.ui;
		 					popup.delegate = $ssaMap.ui;
		 					popup.map = map;
		 					//'공공데이터'를 제외한 메뉴들만 변경된 보고서디자인 적용을 위해
		 					popup.setNewDiv(mapType);
		 					popup.setData(dataList, options);	
		 					
		 					
		 				}
		 			});
				},300);
				//==================================================================================================================================//
				
				
			},
			//============ 2017.06.26 공공데이터 추가 END ============//
			
			/**
			 * @name         : reportDataSet
			 * @description  : 보고서 데이터 세팅
			 * @date         : 2015. 10. 01. 
			 * @author	     : 김성현
			 * @param  res 결과데이터
			 * @param  options  기타데이터
			 */
			reportDataSet : function(type) {
				$workRoad.ui.addFnc04List("$ssaMap.ui.reportDataSet");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				this.curMapId = parseInt(type)-1;
				var map = this.mapList[this.curMapId];
				if (map.dataGeojson == null && 
					map.multiLayerControl.dataGeojson == null) {
					if (this.dataTypeList[map.id] != undefined && this.dataTypeList[map.id] != null) {
//						if (this.dataTypeList[map.id] == "publicData") {
//							if ($publicDataBoard.ui.mapData[map.id].options.result.length == 0) {
//								messageAlert.open("알림", "보고서 출력은 통계조회 후 이용할 수 있습니다.</br>POI를 선택해주세요.");
//								return;
//							}
//						}else if (this.dataTypeList[map.id] == "userData") {
//							if ($("#searchMethodBox").find("input:checked").length == 0) {
//								messageAlert.open("알림", "보고서 출력은 통계조회 후 이용할 수 있습니다.");
//								return;
//							}
//						}else 
						if (this.dataTypeList[map.id] == "poi") {
							if (map.markers == null) {
								messageAlert.open("알림", "보고서 출력은 통계조회 후 이용할 수 있습니다");
								return;
							}else {
								var cnt =0;
								map.markers.eachLayer(function(layer) {
									cnt++;
								});
								if (cnt == 0) {
									messageAlert.open("알림", "보고서를 출력할 정보가 없습니다.");
									return;
								}
							}
						}
						else {
							messageAlert.open("알림", "보고서 출력은 통계조회 후 이용할 수 있습니다.");
			 				return;
						}
					}else {
						messageAlert.open("알림", "보고서 출력은 통계조회 후 이용할 수 있습니다.");
		 				return;
					}
				}
				$ssaMap.ui.reportPopup = 
					window.open("/js/common/report/reportForm.html", "reportPrint","width=850, height=700, scrollbars=yes");
			},
			
			
			/**
			 * 
			 * @name         : doAddMap
			 * @description  : 맵을 추가한다.
			 * @date         : 2015. 10. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doAddMap : function(type) {// used
				$workRoad.ui.log("$ssaMap.ui.doAddMap - begin");

				$("#rotationTip,#tuto_start_btn,.grid_radio,.tb_radio").hide();
				
				var isMap1ContentShow =  $("#mapRgn_1").is(":visible");
				var isMap2ContentShow =  $("#mapRgn_2").is(":visible");
				var isMap3ContentShow =  $("#mapRgn_3").is(":visible");
				var createMapId, updateId;
				
				if (isMap1ContentShow & isMap2ContentShow & isMap3ContentShow) {
					messageAlert.open("알림", "지도는 3개까지만 생성할 수 있습니다.")
					return;
				}
				
				//표출된 맵뷰에 따른 플래그 설정
				if (isMap1ContentShow & isMap2ContentShow) {
					createMapId = 2;
					updateId = 1;
				}else if (isMap1ContentShow & isMap3ContentShow) {
					createMapId = 1;
					updateId = 2;
				}else if (isMap2ContentShow & isMap3ContentShow) { 
					createMapId = 0;
					updateId = 3;
				}else if (isMap1ContentShow) {
					createMapId = 1;
					updateId = 4;
				}else if (isMap2ContentShow) {
					createMapId = 0;
					updateId = 5;
				}else if (isMap3ContentShow) {
					createMapId = 0;
					updateId = 6;
				}

				var sceneInx = $(".sceneBox.on").length; 
				$(".sceneBox").eq(createMapId).show().addClass("on");
				if(sceneInx==1){ 
					$(".sceneBox").stop().animate({"width":"50%"},200, function() {
						for (var i=0; i<$ssaMap.ui.mapList.length; i++) {
							if ($ssaMap.ui.mapList[i] != null) {
								$ssaMap.ui.mapList[i].update();
							}
						}
					});
					$(".sceneRela").css({"border-left":"3px solid #000"});
					$(".sceneRela").eq(0).css({"border-left":"0"});
				}else if(sceneInx==2){ 
					$(".sceneBox").css({"position":"absolute"});
					$(".sceneBox").stop().animate({"width":"800px", "height":"500px"},200, function() {
						for (var i=0; i<$ssaMap.ui.mapList.length; i++) {
							if ($ssaMap.ui.mapList[i] != null) {
								$ssaMap.ui.mapList[i].update();
							}
						}
					}); 
					$(".sceneRela").css({"border-left":"0"});
					$(".resizeIcon").show();
					$(".sceneBox").each(function(i){
						$(this).css({"z-index":parseInt(10-i), "border":"3px solid #333"})
						.animate({"top":parseInt(50*(i+1))+"px", "left":parseInt(150*(i+1))+"px"},200);
					});
					$( ".sceneBox" ).draggable({containment: ".containerBox>.rela"}).resizable();
					$( ".sceneBox" ).on("resize", function() {
						for (var i=0; i<$ssaMap.ui.mapList.length; i++) {
							if ($ssaMap.ui.mapList[i] != null) {
								$ssaMap.ui.mapList[i].update();
							}
						}
					});
				} 
				
				//지도생성
				//heatMap 생성에 버그가 있음
				//맵이 완전히 생성되어 화면에 표출된 다음, heatMap을 생성해야 오류가 안남
				var map = this.createMap("mapRgn_" + (createMapId+1), createMapId); //9월 서비스
				var mapNavi = new mapNavigation.UI();
				mapNavi.firstBoolean = false;
				mapNavi.create("mapNavi_" + (createMapId+1), createMapId+1, $ssaMap.ui);
				
				//범례고정 show/hide
				//9월 서비스
				for (var i=0; i<this.mapList.length; i++) {
					if (this.mapList[i] != null) {
						this.mapList[i].legend.showLegendFixed();
					}
				}
				
				$(".sceneBox.on").each(function(index) {
					$(this).find(".tb_radio").hide();
				});				
			
				//기존지도정보 복사
				switch(updateId) {
					case 1:
						this.mapList[2].mapMove(this.mapList[0].center, this.mapList[0].zoom);
						break;
					case 2:
					case 4:
						this.mapList[1].mapMove(this.mapList[0].center, this.mapList[0].zoom);
						break;
					case 3:
					case 5:
						this.mapList[0].mapMove(this.mapList[1].center, this.mapList[1].zoom);
						break;
					case 6:
						this.mapList[0].mapMove(this.mapList[2].center, this.mapList[2].zoom);
						break;
				}
				
				$(".interactiveView").css("display","inline-block");
				$(".tb_close").show();
				$(".interactiveView").each(function(i){
					$(".tb_mapAdd").text("VIEW"+parseInt(i+1));
				}); 
				
				var sceneInx = $(".sceneBox.on").length;
				if (sceneInx > 1) {
					$(".tb_combine").parent().show();
					$(".viewTitle > span").show();
				}else {
					$(".viewTitle > span").hide();
				}
				
				$("#helper_" + parseInt(createMapId+1)).show();
				$("#title_" + parseInt(createMapId+1)).text("");
				$("#title_" + parseInt(createMapId+1)).hide();
				//mng_s 20180104 주용민 다중뷰 투명도 hide
				$(".lgListBox li:last").hide();
				//mng_e
			},
			
			
			/**
			 * 
			 * @name         : doRemoveMap
			 * @description  : 맵을 삭제한다.
			 * @date         : 2015. 10. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 1:1번맵, 2:2번맵, 3:3번맵
			 */
			doRemoveMap : function(type) {// used
				$workRoad.ui.log("$ssaMap.ui.doRemoveMap - begin");
				
				this.doClearMap(type, true);
				this.curMapId = parseInt(type)-1;
				if (this.mapList[this.curMapId] !== undefined) {
					this.mapList[this.curMapId].gMap.remove();
					this.mapList[this.curMapId] = null;
				}
				
				$(".sceneBox").eq(this.curMapId).removeClass("on").hide();
				var sceneInx = $(".sceneBox.on").length;  
				if(sceneInx==1){  
					$(".sceneBox").stop().animate({"width":"100%"},200, function() {
						for (var i=0; i<$ssaMap.ui.mapList.length; i++) {
							if ($ssaMap.ui.mapList[i] != null) {
								$ssaMap.ui.mapList[i].update();
							}
						}
					});
					
					$(".tb_close, .interactiveView").hide();
					$(".interactiveDataBoard").show();
					$(".sceneBox.on").eq(0).find(".sceneRela").css({"border-left":"0px"});
					$(".sceneBox.on").each(function(index) {
						$(this).find("#rotationTip,#tuto_start_btn,.grid_radio,.tb_radio").show();
					});
				}else if(sceneInx==2){
					$(".sceneBox").stop().animate({"width":"50%"},200, function() {
						for (var i=0; i<$ssaMap.ui.mapList.length; i++) {
							if ($ssaMap.ui.mapList[i] != null) {
								$ssaMap.ui.mapList[i].update();
							}
						}
					});
					
					$(".sceneBox").draggable("destroy").resizable("destroy").css({"position":"static", "border":"0", "height":"100%"});
					$(".sceneBox.on").eq(1).find(".sceneRela").css({"border-left":"3px solid #000"});
				}
				
				//범례고정 show/hide
				//9월 서비스
				for (var i=0; i<this.mapList.length; i++) {
					if (this.mapList[i] != null) {
						this.mapList[i].legend.hideLegendFixed(this.curMapId);
					}
				}
				
				$(this).hide(); 
				$(".resizeIcon").hide();
				$(".interactiveView").each(function(i){
					$(this).text("VIEW"+parseInt(i+1));
				});
				
				var isMap1ContentShow =  $("#mapRgn_1").is(":visible");
				var isMap2ContentShow =  $("#mapRgn_2").is(":visible");
				var isMap3ContentShow =  $("#mapRgn_3").is(":visible");
				
				if (isMap1ContentShow & isMap2ContentShow & isMap3ContentShow) {
					messageAlert.open("알림", "지도는 3개까지만 생성할 수 있습니다.")
					return;
				}
				
				//삭제한 지도정보와 매핑되는 버튼 Effect 수정
				$("#title_"+type).empty();
				$("#title_"+type).hide();
				$("#helper_"+type).show();
				$ssaMapFrame.ui.updateSearchBtnEffect("", this.curMapId);
								
				//표출된 맵뷰에 따른 플래그 설정
				if (isMap1ContentShow & isMap2ContentShow) {
					this.curMapId = 0;
				}else if (isMap1ContentShow & isMap3ContentShow) {
					this.curMapId = 0;
				}else if (isMap2ContentShow & isMap3ContentShow) { 
					this.curMapId = 1;
				}else if (isMap1ContentShow) {
					this.curMapId = 0;
				}else if (isMap2ContentShow) {
					this.curMapId = 1;
				}else if (isMap3ContentShow) {
					this.curMapId = 2;
				}
				
				// 임시 - 2018.11.14	ywKim	변경
//				$mydataDataBoard.ui.delegateSetting($ssaMap.ui);			//나의데이터 세팅
//				$publicDataBoard.ui.delegateSetting($ssaMap.ui);			//공공데이터 세팅
				
				//현재 선택된 맵으로 데이터보드 다시 그리기
				$ssaDataBoard.ui.reDraw(this.curMapId);
			},
			
			/**
			 * 
			 * @name         : doAnalysisShareInfo
			 * @description  : 공유된 정보를 분석하여, 통계정보를 조회한다.
			 * @date         : 2015. 11. 16. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param key    : 공유ID
			 */
			doAnalysisShareInfo : function (type, data) {
				$workRoad.ui.addFnc04List("$ssaMap.ui.doAnalysisShareInfo");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				if (type.length == 0 || data.length == 0) {
					var mapNavi1 = new mapNavigation.UI();
					mapNavi1.firstBoolean = true;
					mapNavi1.create("mapNavi_1", 1, $ssaMap.ui);	
					
					//서브메뉴 선택 시, 해당 항목에 대한 2단계 메뉴창을 open한다.
					if (type == "mainIndexView" 	  ||
						type == "populationHouseView" ||
						type == "3fView"			  ||
						type == "companyView"	      ||
						type == "kosisView"			  ||
						type == "publicDataView"	  ||
						type == "userDataView"		  ||
						type == "userdata") {
						if  (type.indexOf("View") != -1) {
							setTimeout(function() {
								$ssaMapFrame.ui.setDetailStatsPanel(type.split("View")[0]);
							}, 200);
						}
					}
					return false;
				}
				
				// 임시 - 2018.11.14	ywKim	변경
//				if(type != "kosis" && data.param_info != undefined){
//					this.isShare = true;
//					this.shareData["data"] = JSON.parse(data.param_info);
//				}
				
				var map = this.mapList[0];
				var mapNavi1 = new mapNavigation.UI();
				mapNavi1.create("mapNavi_1", 1, $ssaMap.ui);
				
				var typeList = {
					"bookmark"  		: 0,	//북마크
					"sharedata" 		: 1,	//공유
					"totalindex"		: 2,	//인구총괄
					"population"		: 3,	//인구통계
					"company"			: 4,	//사업체통계
					"household"			: 5,	//가구통계
					"house"				: 6,	//주택통계
					"farmhousehold"		: 7,	//농가통계
					"forestryhousehold" : 8,	//임가통계
					"fisheryhousehold"	: 9,	//어가통계
					"householdmember"	: 10,	//가구원통계
					"kosis"				: 11,	//kosis통계
					"recentdata"		: 12,	//메인최신통계
					"userdata"			: 13,   //사용자데이터
					"publicdata"		: 14	//공공데이터 	2017.07.13 [개발팀] kcu 공공데이터 url
				};
				
				var apiInfo = [
				       {id:"API_0301", url:"/OpenAPI3/stats/population.json", unit:"명"},  									//인구총괄
				       {id:"API_0302", url:"/OpenAPI3/stats/innersearchpopulation.json", unit:"명", showData:"population"},	//인구통계  9월서비스 권차욱 api명 변경
				       {id:"API_0304", url:"/OpenAPI3/stats/company.json", unit:"개", showData:"corp_cnt"},					//사업체통계
				       {id:"API_0305", url:"/OpenAPI3/stats/household.json", unit:"가구", showData:"household_cnt"},		//가구통계
				       {id:"API_0306", url:"/OpenAPI3/stats/house.json", unit:"호", showData:"house_cnt"},					//주택통계
				       {id:"API_0307", url:"/OpenAPI3/stats/farmhousehold.json", unit:"가구", showData:"farm_cnt"},			//농가통계
				       {id:"API_0308", url:"/OpenAPI3/stats/forestryhousehold.json", unit:"가구", showData:"forestry_cnt"},	//임가통계
				       {id:"API_0309", url:"/OpenAPI3/stats/fisheryhousehold.json", unit:"가구", showData:"fishery_cnt"},	//어가통계
				       {id:"API_0310", url:"/OpenAPI3/stats/householdmember.json", unit:"명", showData:"population"},		//가구원통계
				];
				
				//인구총괄 showData
				var totalIndex_showData = {
						"tot_ppltn" 	  : 0,
						"avg_fmember_cnt" : 1,
						"nongga_ppltn" 	  : 2,
						"imga_ppltn" 	  : 3,
						"naesuoga_ppltn"  : 4,
						"haesuoga_ppltn"  : 5,
						"avg_age"		  : 6,
						"ppltn_dnsty"	  : 7,
						"aged_child_idx"  : 8,
						"oldage_suprt_per": 9,
						"juv_suprt_per"	  : 10,
						"tot_family"	  : 11,
						"nongga_cnt"	  : 12,
						"imga_cnt"		  : 13,
						"naesuoga_cnt"    : 14,
						"haesuoga_cnt"    : 15,
						"tot_house"		  : 16,
						"corp_cnt"		  : 17,
						"employee_cnt"	  : 18
				};
				
				var url, title, unit, isKosis = false, api_id, center, zoomlevel, showData, paramInfo = {};
				var admCdList = [];
				switch(typeList[type]) {
					case 0:
					case 1:
					case 12:
						this.searchBtnType = "normal";
						url = data.api_call_url;
						data["param_info"] = JSON.parse(data.param_info);
						
						// 임시 - 2018.11.14	ywKim	변경
//						if (data.param_info.type == "userData") {
//							$mydataDataBoard.ui.setShareData(data.param_info);
//							$mydataDataBoard.ui.updateMyData(data.param_info.paramInfo.data_id, data.param_info.title);
//							return;
//						}else 
						{
							//사업체검색에서 전산업일 경우 area_type을 삭제
							if(url == "/OpenAPI3/stats/population.json" && data.param_info.api_id == "API_0304") {
								delete data.param_info.paramInfo["area_type"];
							}
							
							if (data.param_info.title == undefined) {
								title = data.hist_nm;
							}else {
								title = data.param_info.title;
							}
							data["param_info"]["title"] = title;	
							
							//kosis일 경우, api_id와 title을 강제로 세팅한다.
							if (data.param_info.isKosis) {
								data.param_info["api_id"] = "kosis";
								ssaMapKosis.curSelectedTitle = data.param_info.title;
							}
							
							if (data.param_info.paramInfo.adm_cd.indexOf(",") != -1) {
								admCdList = data.param_info.paramInfo.adm_cd.split(",");
							}else {
								admCdList.push(data.param_info.paramInfo.adm_cd)
							}
						}
						break;
					case 2:
					case 3:
					case 4:
					case 5:
					case 6:
					case 7:
					case 8:
					case 9:
					case 10:
						this.searchBtnType = "normal";
						api_id = apiInfo[typeList[type]-2].id;
						url = apiInfo[typeList[type]-2].url;
						admCdList.push(data.adm_cd);
						center = [data.x, data.y];
						title = data.title;
						isKosis = false;
						
						//단위설정
						if (type == "totalindex") {
							switch(totalIndex_showData[data.showData]) {
								case 0:
								case 1:
								case 2:
								case 3:
								case 4:
								case 5:
								case 18:
									unit = "명";
									break;
								case 6:
									unit = "세";
									break;
								case 7:
									unit = "명/㎢";
									break;
								case 8:
								case 9:
								case 10:
									unit = "일백명당 명";
									break;
								case 11:
								case 12:
								case 13:
								case 14:
								case 15:
									unit = "가구";
									break;
								case 16:
									unit = "호";
									break;
								case 17:
									unit = "개";
									break;
							}
						}else {
							unit = apiInfo[typeList[type]-2].unit;
						}
						
						//showData 설정
						switch (typeList[type]) {
							case 0:
							case 1:
							case 2:
								showData = data.showData;
								break;
							default:
								showData = apiInfo[typeList[type]-2].showData;
								break;
						}
						
						//파라미터정보 설정
						for (p in data) {
							if (p != "x" && 
								p != "y" &&
								p != "showData" &&
								p != "title") {
								paramInfo[p] = data[p];
							}
						}
						paramInfo["bnd_year"] = bndYear;
						
						//행정동코드 및 줌레벨 설정
						if (data.adm_cd == null) {
							data.adm_cd = "00";
							center = [966298, 1898301];
						}
						
						if (data.adm_cd == "00") {
							zoomlevel = 2;
						}else {
							switch (data.adm_cd.length) {
							case 2:
								zoomlevel = 4;
								break;
							case 5:
								zoomlevel = 6;
								break;
							case 7:
								zoomlevel = 9;
								break;
							default:
								zoomlevel = 2;
								data.adm_cd = "00";
								break;
							}
						}		
						break;
					case 11:
						api_id = "kosis";
						isKosis = true;
						
						ssaMapKosis.gis_se = data.gis_se;
						ssaMapKosis.org_id = data.kosis_org_id;
						ssaMapKosis.tbl_id = data.kosis_tb_id;
						ssaMapKosis.adm_cd = data.adm_cd;
						ssaMapKosis.atdrc_yn = data.atdrc_yn;
						
						// j.h.Seok
						if(data.adm_cd == undefined || data.adm_cd == null) {
							ssaMapKosis.adm_cd = '00';
						}
						
						if(data.obj_var_id != undefined) {
							ssaMapKosis.kosis_obj_var_id = data.obj_var_id;
						}
						
						if(data.field_id != undefined) {
							ssaMapKosis.kosis_field_id = data.field_id
						}
						
						var url = "/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDataList.do";
						var zoom = "0";
						
						var title = decodeURIComponent(data.title);
						ssaMapKosis.curSelectedTitle = title;
						ssaMapKosis.kosis_select_menu_text = title;
						
						ssaMapKosis.gis_se = ssaMapKosis.gis_se.replace(/(^\s*)|(\s*$)/gi, "");
						ssaMapKosis.gis_se = parseInt(ssaMapKosis.gis_se);
						
						//전국경계
						if(ssaMapKosis.adm_cd == "00" || ssaMapKosis.adm_cd == "") {
							zoom = "2";
							ssaMapKosis.adm_cd = "1";
						} else {
							switch(ssaMapKosis.gis_se) {
							case 1: //전국시도
								zoom = "2";
								if(ssaMapKosis.adm_cd != undefined && ssaMapKosis.adm_cd.length >= 2) {
									ssaMapKosis.adm_cd = "1";
								} else {
									ssaMapKosis.adm_cd = "1";
								}
								break;

							case 2: //시군구
								zoom = "4"; //5->4
								if(ssaMapKosis.adm_cd != undefined && ssaMapKosis.adm_cd.length >= 5) {
									ssaMapKosis.adm_cd = ssaMapKosis.adm_cd.substring(0, 2);
								} else {
									ssaMapKosis.adm_cd = "1";
								}
								break;

							case 3: //읍면동 
								zoom = "6"; //7->6
								if(ssaMapKosis.adm_cd != undefined && ssaMapKosis.adm_cd.length > 2) {
									ssaMapKosis.adm_cd = ssaMapKosis.adm_cd.substring(0, 5);
								} else {
									ssaMapKosis.adm_cd = "1";
								}
								break;
							}
						}
						
						admCdList.push(ssaMapKosis.adm_cd);
						
						// j.h.Seok
						if(data.x == undefined || data.x == null || data.y == undefined || data.y == null) {
							center = ["989674", "1818313"];
						} else {
							center = [data.x, data.y];
						}
						
						zoomlevel = zoom;
						
						var options = new Array();
						options.push({
							key : "gis_se",
							value : ssaMapKosis.gis_se
						});
						
						options.push({
							key : "org_id",
							value : ssaMapKosis.org_id
						});
						
						options.push({
							key : "tbl_id",
							value : ssaMapKosis.tbl_id
						});
						
						options.push({
							key : "adm_cd",
							value : ssaMapKosis.adm_cd
						});
						
						options.push({
							key : "center",
							value : center
						});
						
						options.push({
							key : "url",
							value : url
						});
						
						options.push({
							key : "zoom",
							value : zoom
						});
						
						options.push({
							key : "title",
							value : ssaMapKosis.curSelectedTitle
						});
						
						if(ssaMapKosis.kosis_obj_var_id == null || ssaMapKosis.kosis_obj_var_id == undefined) {
							ssaMapKosis.getKosisDetailOption(options);
						} else {
							ssaMapKosis.getKosisStaticDataFieldForSearchList(options);
						}
						break;
					// 임시 - 2018.11.14	ywKim	변경
//					case 13:
//						$ssaMapFrame.ui.curSelectedStatsType = "userData";
//						$mydataDataBoard.ui.updateMyData(data.id, data.title);
//						map.openApiReverseGeoCode(map.center);
//						return;
//						break;
//					//2017.07.13 [개발팀] 공공데이터 url	
//					case 14:
//						$ssaMapFrame.ui.curSelectedStatsType = "publicData";
//						if (data.id != undefined && data.id.length > 0) {
////									closeRotationTip('interactive_laypopup', 1);
//							$(".headerEtc").hide();
//							$(".headerContents").hide();
//							$("#footer").hide();
//							$(".containerBox").css({
//								"top" : "0px",
//								"height" : "100%"
//							});
//							$("#map_left_btn").hide();
//							$(".sideQuick.sq03").hide();
//							$(".tb_bookmark").parent().hide();
//							$(".tb_share").parent().hide();
//							$(".tb_mapAdd").parent().hide();
//							$(".tb_radio").hide();
//							$("#rotationTip").hide();
//							$("#tuto_start_btn").hide();
//							$(".helperText").hide();
//							$(".helperText").next().hide();
//							
//							//선택항목창 닫기
//							var sq03 = $(".sideQuick.sq03");
//							if(sq03.hasClass("on")){
//								$(sq03).click();
//							}
//							
//							//왼쪽 메뉴창 닫기
//							var sq02 = $(".sideQuick.sq02");
//							if(sq02.hasClass("on")){
//								$(sq02).click();
//							}
//							
//							//범례 최소화
//							$("#btn_legend_"+map.legend.id).click();
//							
//							$ssaMap.noReverseGeoCode = true;
//								map.multiLayerControl.dataGeojson = [];
//								map.multiLayerControl.openApiBoundaryHadmarea("29", bndYear, "0", null, "0", function(res) {
//									var geojson = map.addPolygonGeoJson(res, "polygon");
//									if (geojson) {
//										geojson.eachLayer(function(layer) {
//											layer.feature["info"] = [];
//											layer.feature["tooltip"] = false; //2017.07.24 [개발팀] 공공데이터 - 경계 툴팁제거
//											layer.setStyle({
//												weight : 2,
//												color : "#4169e1",
//												dashArray : "",
//												fillOpacity : 0.1,
//												fillColor : "#4169e1"
//											});
//											layer.on({
//												mouseout : function(e) {
//													var tmpLayer = e.target;
//													tmpLayer.setStyle({
//														weight : 2,
//														color : "#4169e1",
//														dashArray : "",
//														fillOpacity :0.1,
//														fillColor : "#4169e1"
//													});
//												}
//											});
//										}) 
//									};
//									$publicDataBoard.ui.updatePublicData(data.id);
//								});
//							
//						}
//						return;
//						break;
					default:
						break;
				};

				// 임시 - 2018.11.14	ywKim	변경
//				var shareInfo = {
//						api_call_url : url,
//						param_info : {
//							api_id :api_id,
//							isKosis : isKosis,
//							mapInfo : {
//								center : center,
//								zoomlevel : zoomlevel
//							},
//							paramInfo : paramInfo,
//							showData : showData,
//							title : title,
//							unit : unit
//						},
//						title : title
//				};
//				
//				//북마크/공유/메인최신통계 일 경우
//				if (typeList[type] == 0 || typeList[type] == 1 || typeList[type] == 12) {
//					shareInfo.param_info = data.param_info;
//				}
//				
//				if(!isKosis) {
//					var tmpShareInfo = [];
//					var tmpParams = deepCopy(shareInfo);
//					tmpShareInfo.push(tmpParams);
//					$ssaMapFrame.ui.setRevertParams(tmpShareInfo, "share");
//					this.updateSearchTitle(shareInfo.param_info.title, shareInfo.param_info.unit, 0);
//					
//					if (admCdList.length > 1) {
//						map.setBoundSelectedMoode("multi");
//						map.mapBtnInfo.setFixedBoundBtn(true);
//					}
//					for (var i=0; i<admCdList.length; i++) {
//						$ssaMapApi.request.openApiShareForStats(tmpParams, admCdList[i]);
//					}
//				}
//				
//				
//				map.curDropCd = shareInfo.param_info.paramInfo.adm_cd;
//				$ssaMap.ui.dropBtnInfo[map.id] = $ssaMapFrame.ui.arParamList[0];
//				if ( shareInfo.param_info.paramInfo != null &&  shareInfo.param_info.paramInfo != undefined) {
//					for (var p in  shareInfo.param_info.paramInfo) {
//						if (p == "year") {
//							this.curDropParams[map.id] = {}
//							this.curDropParams[map.id]["param"] = [];
//							var tmpParams = {
//							     "key": "year", 
//							     "value": shareInfo.param_info.paramInfo[p]
//							};
//							this.curDropParams[map.id]["param"].push(tmpParams);
//							tmpParams = null;
//						}
//					}
//				}
				
				return true;
			},
			
			/**
			 * 
			 * @name         : doDone
			 * @description  : 경계정보를 설정한다.
			 * @date         : 2015. 12. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */
			doDone : function(type) {
				$workRoad.ui.addFnc04List("$ssaMap.ui.doDone");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var map = this.mapList[this.curMapId];
				if (type == "settings") {
					if ($("#bndYear").val() != map.bnd_year) {
						map.bnd_year = $("#bndYear").val();
						map.openApiReverseGeoCode(map.center);
					}	
					map.bnd_year = $("#bndYear").val();
				}
				
				// 임시 - 2018.11.14	ywKim	변경
//				else if (type == "sharedlg") {
//					copyToClipboard($("#sharedlg").find($("input")).val());
//				}
//				else if (type == "bookmarkdlg") {
//					map.shareInfo.doBookMark($("#savesubj").val());
//				}
				else if (type == "uploadFile") {
					$("#fileSearch").val("");
					$("#filePathField").val("");
				}
				
				// 임시 - 2018.11.14	ywKim	변경
//				if (type != "sharePeriodSetting") {
//					$(".deem").hide();
//				}
				$("#"+type).hide();
				
			},
			
			
			/**
			 * 
			 * @name         : doCancel
			 * @description  : 경계정보 설정을 취소한다.
			 * @date         : 2015. 10. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */
			doCancel : function(type) {
				$workRoad.ui.addFnc04List("$ssaMap.ui.doCancel");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				if (type == "settings") {
					$("#bndYear").val(this.mapList[this.curMapId].bnd_year);
				}else if (type == "uploadFile") {
					$("#fileSearch").val("");
					$("#filePathField").val("");
				}
				
				// 임시 - 2018.11.14	ywKim	변경
//				if (type != "sharePeriodSetting") {
//					$(".deem").hide();
//				}
				$("#"+type).hide();
				
			},
			
			/**
			 * 
			 * @name         : updateSearchTitle
			 * @description  : 통계제목을 설정한다. 
			 * @date         : 2015. 10. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */
			updateSearchTitle : function(title, unit, mapId) {
				$workRoad.ui.addFnc04List("$ssaMap.ui.updateSearchTitle");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var viewId = mapId+1;
				if (unit != undefined) {
					title = title + "(" + unit + ")";
				}
				
				$("#helper_" + viewId).hide();
				$("#title_" + viewId).text(title);
				$("#title_" + viewId).show();
			},
			
			
			/**
			 * 
			 * @name         : shareToKakaoStory
			 * @description  : 카카오스토리 공유를 수행한다.
			 * @date         : 2015. 10. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param		 : 
			 * @param    	 : 
			 */
			shareToKakaoStory : function() {
				$workRoad.ui.addFnc04List("$ssaMap.ui.shareToKakaoStory");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				// 임시 - 2018.11.14	ywKim	변경
//				var shareInfo = this.mapList[this.curMapId].shareInfo;
//				var linkUrl = $("#sharedlg").find($("input")).val();
//				shareInfo.doShareToKakaoStory(linkUrl);
			},
			
			/**
			 * @name         : informationPopClose
			 * @description  : SGIS 서비스 이용시 유의사항 팝업 닫기
			 * @date         : 2016. 02. 01. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
//					informationPopClose : function() {
//						$("#notice_mini_pop").hide();
//					},
			
			/**
			 * @name         : informationPopOpen
			 * @description  : SGIS 서비스 이용시 유의사항 팝업 열기
			 * @date         : 2016. 02. 01. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
//					informationPopOpen : function() {
//						if($("#notice_mini_pop").css("display") == "none") {
//							$("#notice_mini_pop").show();
//						} else {
//							$("#notice_mini_pop").hide();
//						}
//					},
			
			/**
			 * 
			 * @name         : createInfoTooltip
			 * @description  : 경계레이어 선택 시, 툴팁을 생성하여 정보를 표출한다.
			 * @date         : 2015. 10. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 선택된 경계레이어
			 * @param data   : 선택된 경계레이어의 데이터정보
			 */
			createInfoTooltip : function(event, data, type, map) {// used
				$workRoad.ui.log("$ssaMap.ui.createInfoTooltip - begin");
				
				var html = "<table style='margin:10px;'>";
				var searchYear = "";
				var that = this;
				var showName = {
									"tot_ppltn" : "총인구",
									"tot_ppltn_male" : "총인구(남자)",
									"tot_ppltn_fem" : "총인구(여자)",
									"avg_age" : "평균나이",
									"avg_age_male" : "평균나이(남자)",
									"avg_age_fem" : "평균나이(여자)",
									"ppltn_dnsty" : "인구밀도",
									"aged_child_idx" : "노령화지수",
									"oldage_suprt_per" : "노년부양비",
									"juv_suprt_per" : "유년부양비",
									"tot_suprt_per" : "총부양비",
									"population" : "인구",
									"tot_worker" : "종사자수",
									"corp_cnt" : "사업체수",
									"household_cnt" : "가구수",
									"house_cnt" : "주택수",
									"farm_cnt" : "농가수",
									"forestry_cnt" : "임가수",
									"fishery_cnt" : "어가수",
									"tot_family" : "총가구",
									"avg_fmember_cnt" : "평균가구원수",
									"tot_house" : "총주택",
									"nongga_cnt" : "농가(가구)",
									"nongga_ppltn" : "농가(인구)",
									"imga_cnt" : "임가(가구)",
									"imga_ppltn" : "임가인구",
									"naesuoga_cnt" : "내수면총어가",
									"naesuoga_ppltn" : "내수면어가인구",
									"haesuoga_cnt" : "해수면총어가",
									"haesuoga_ppltn" : "해수면어가인구",
									"employee_cnt" : "종사자수"
								};
				if(this.curDropParams[map.id] != undefined) {
					for(var i = 0; i < this.curDropParams[map.id].param.length; i ++) {
						if (this.curDropParams[map.id].param[i].key == "year") {
							//지도 추가하여 비교시 년도 표시가 다르게 나와서 원복(17.06.07)
							searchYear = this.curDropParams[map.id].param[i].value + "년 ";
						}
					}	
				}
				
				if (type == "data") {
					if (data.info.length > 0) {
						
						//kosis
						if(data.info[2] == "kosis") {
							var html = "<table style='margin:10px;'>";
							if (data.properties.adm_nm !== undefined) {
								html += "<tr><td class='admName'>"
									 + data.properties.adm_nm 
									 + "</td></tr>"
									 + "<tr style='height:5px'></tr>";
							}
							
							if(data.info[0] != null && data.info[0] != undefined && data.info[0] != 'NaN') {
								var value = appendCommaToNumber(data.info[0]);
								html += "<tr><td class='statsData'>"
										+ searchYear + value;
							} else {
								html += "<tr><td class='statsData'>-";
							}
							
							if (data.info[1] != undefined) {
								html += " (" + data.info[1] + ")";
							}
						    html += "</td></tr>";
						}else {
							//나의 데이터일 경우
							if(data.info[0].api_id == "API_MYDATA") {
								html += "<tr><td class='admName'>"
									 + data.properties.adm_nm 
									 + "</td></tr>"
									 + "<tr style='height:5px'></tr>";
								for(var i = 0; i < data.info[0].userData.length; i ++) {
									html += "<tr>";
									html += "<td>" + data.info[0].userData[i].title + " : " + data.info[0].userData[i].data + "</td>";
									html += "</tr>";
								}
								
								//집계구 일경우
								if (data.properties.adm_cd.length > 7) {
									html += "<tr>";
									html += "<td class='statsData'>( " + data.properties.adm_cd + " )</td>";
									html += "</tr>";
								}
								
							} else {	//일반 조회일 경우								
								for (var i = 0; i < data.info.length; i++) {
									var tmpData = data.info[i];
									if (i == 0) {
										if (data.properties.adm_nm !== undefined) {
											html += "<tr><td class='admName'>"
												 + data.properties.adm_nm
												 + "</td></tr>"
												 + "<tr style='height:5px'></tr>";
										}
										
										//집계구 일경우
										if (data.properties.adm_cd.length > 7 && !sop.isInnerMapShow2 && !sop.isInnerMapShow3) { //mng_s !sop.isInnerMapShow2==>그리드가 아니면
											html += "<tr>";
											html += "<td class='statsData'>";
											html += ( data.dataIdx + 1 ) + '_';
											html += "집계구 : " + data.properties.adm_cd + "</td>";
											html += "</tr>";
										}
									}
									
									if (tmpData.showData != undefined && tmpData.showData.length > 0) {
										var filterName = ""; 
										var title = "";
										if (showName[tmpData.showData] != undefined) {
											filterName = showName[tmpData.showData];
										}
										html += "<tr style='font-size:12px;padding-left:5px;'>";
//										if (filterName.length > 0) {
//											title = searchYear +" " + filterName + " : ";
//										} else {
//											title = searchYear + " : ";
//										}		
										title = tmpData.prd_de + " : ";								
										
										//5미만의 데이터의 경우, N/A처리
										//인구총괄의 경우, 평균나이, 인구밀도, 노령화지수, 노년부양비, 유년부양비, 총부양비는 제외
										var value;
										if (parseFloat(tmpData[tmpData.showData]) < 5 && 
											tmpData.showData != "avg_age" &&
											tmpData.showData != "ppltn_dnsty" &&
											tmpData.showData != "aged_child_idx" && 
											tmpData.showData != "oldage_suprt_per" &&
											tmpData.showData != "juv_suprt_per" && 
											tmpData.showData != "tot_suprt_per" &&
											// 2016. 03. 24 j.h.Seok modify
											tmpData.showData != "tot_worker" &&
											tmpData.showData != "avg_fmember_cnt" &&
											tmpData.showData != "employee_cnt") {
											
											//mng_s
											if (sop.isInnerMapShow2) { //그리드 이면
											
											} else if (sop.isInnerMapShow3) { //행정구역 그리드 이면 5미만도 표시해 준다
												value = appendCommaToNumber(tmpData[tmpData.showData]);
											} else {
												//2019-01-07 취업자증감 대구광역시 -18천명인데 지도상에는 N/A로 표출됨 음수값 표현 없음
												//value = "N/A";
												value = appendCommaToNumber(tmpData[tmpData.showData]);
											}											
											
										}else {
											value = appendCommaToNumber(tmpData[tmpData.showData]);
										}
										
										if (value != "N/A") {
											
											//mng_s
											if (sop.isInnerMapShow2) { //그리드 이면
												
												//mng_s
												if(value == "5미만") { //그리드이면 5미만으로 표시
													value = "5미만";
												} else {
													//map.grid_legend_new[0][0]는 더미값 0.01 이므로 사용않함.
													if(Number(tmpData[tmpData.showData]) < Number(map.grid_legend_new[0][1])) {
														value = appendCommaToNumber(map.grid_legend_new[0][1]) + " 이하";
													} else if(Number(map.grid_legend_new[0][1]) <  Number(tmpData[tmpData.showData]) && Number(tmpData[tmpData.showData]) <= Number(map.grid_legend_new[0][2]) ) {
														value = appendCommaToNumber(map.grid_legend_new[0][1]) + "~" + appendCommaToNumber(map.grid_legend_new[0][2]) + " 이하";
													} else if(Number(map.grid_legend_new[0][2]) <  Number(tmpData[tmpData.showData]) && Number(tmpData[tmpData.showData]) <= Number(map.grid_legend_new[0][3]) ) {
														value = appendCommaToNumber(map.grid_legend_new[0][2]) + "~" + appendCommaToNumber(map.grid_legend_new[0][3]) + " 이하";
													} else if(Number(map.grid_legend_new[0][3]) <  Number(tmpData[tmpData.showData]) && Number(tmpData[tmpData.showData]) <= Number(map.grid_legend_new[0][4]) ) {
														value = appendCommaToNumber(map.grid_legend_new[0][3]) + "~" + appendCommaToNumber(map.grid_legend_new[0][4]) + " 이하";
													} else if(Number(map.grid_legend_new[0][4]) <  Number(tmpData[tmpData.showData]) && Number(tmpData[tmpData.showData]) <= Number(map.grid_legend_new[0][5]) ) {
														value = appendCommaToNumber(map.grid_legend_new[0][4]) + "~" + appendCommaToNumber(map.grid_legend_new[0][5]) + " 이하";
													} else if(Number(map.grid_legend_new[0][5]) <  Number(tmpData[tmpData.showData]) && Number(tmpData[tmpData.showData]) <= Number(map.grid_legend_new[0][6]) ) {
														value = appendCommaToNumber(map.grid_legend_new[0][5]) + "~" + appendCommaToNumber(map.grid_legend_new[0][6]) + " 이하";
													} else if(Number(map.grid_legend_new[0][6]) <  Number(tmpData[tmpData.showData]) && Number(tmpData[tmpData.showData]) <= Number(map.grid_legend_new[0][7]) ) {
														value = appendCommaToNumber(map.grid_legend_new[0][6]) + "~" + appendCommaToNumber(map.grid_legend_new[0][7]) + " 이하";
													} else if(Number(map.grid_legend_new[0][7]) <  Number(tmpData[tmpData.showData]) && Number(tmpData[tmpData.showData]) <= Number(map.grid_legend_new[0][8]) ) {
														value = appendCommaToNumber(map.grid_legend_new[0][7]) + "~" + appendCommaToNumber(map.grid_legend_new[0][8]) + " 이하";
													} else if(Number(map.grid_legend_new[0][8]) <  Number(tmpData[tmpData.showData]) && Number(tmpData[tmpData.showData]) <= Number(map.grid_legend_new[0][9]) ) {
														value = appendCommaToNumber(map.grid_legend_new[0][8]) + "~" + appendCommaToNumber(map.grid_legend_new[0][9]) + " 이하";
													} else if(Number(map.grid_legend_new[0][9]) <  Number(tmpData[tmpData.showData])  ) {
														value = appendCommaToNumber(map.grid_legend_new[0][9]) + " 초과";
													}
												}
											}
											
											//mng_s
											if (sop.isInnerMapShow3) { //행정구역 그리드 이면
												if(value == "5미만") { //그리드이면 5미만으로 표시
													value = "5미만";
												}
											}
											// 2020-07-24 [곽제욱] unit(단위)가 공백인경우 괄호 제거 START
											if(tmpData.unit==null||tmpData.unit==""){
												html += "<td class='statsData'>"+title+value+"</td>";
											} else {
												html += "<td class='statsData'>"+title+value+" ("+tmpData.unit+")</td>";
											}
											// 2020-07-24 [곽제욱] unit(단위)가 공백인경우 괄호 제거 END
											
										}else {
											html += "<td class='statsData'>"+title+value+"</td>";
										}
									
										html += "</td></tr>";
									}	
								}

							}
						}
					}else {
						//mng_s
						if (sop.isInnerMapShow2 || sop.isInnerMapShow3) { //그리드 이면
							html += "<tr><td class='statsData'></td></td>";
						} else {
							if (data.properties.adm_nm !== undefined) {
								html += "<tr><td class='admName'>"
									 + data.properties.adm_nm
									 + "</td></tr>"
									 + "<tr style='height:5px'></tr>";
							}
							//집계구 일경우
							if (data.properties.adm_cd.length > 7) {
								html += "<tr>";
								html += "<td class='statsData'>";
								html += "집계구 : " + data.properties.adm_cd + "</td>";
								html += "</tr>";
							}
							
							var filterName = ""; 
							var title = "";
							if (showName[that.toolTipTitle] != undefined) {
								filterName = showName[that.toolTipTitle];
							}
							html += "<tr style='font-size:12px;padding-left:5px;'>";
							if (filterName.length > 0) {
								title = searchYear +" " + filterName + " : ";
							} else {
								title = searchYear + " : ";
							}
							
							if($ssaMap.ui.mapList[0].dataType == "kosis" && $ssaMap.ui.mapList[0].dataForCombine[0].UNIT != undefined){
								html += "<td class='statsData'>"+title+" 0("+$ssaMap.ui.mapList[0].dataForCombine[0].UNIT+")</td>";
							} else {
								// N/A > 0 으로 표시 2019.12.26 jrj
								html += "<td class='statsData'>"+title+" 0 ("+ ( that.mapList[0].data[0] ? that.mapList[0].data[0].unit : that.toolTipUnit ) +")</td>";
							}
						}
						
					}
					
				}else if (type == "build") {
					var info = data.properties;
					var lowest = "";
					var highest = "지상" + Math.abs(info.highest_flr) + "(층)";
					if(info.lowest_flr < 0) {
						lowest = "지하" + Math.abs(info.lowest_flr) + "(층)";	
					}else {
						lowest = "지상" + Math.abs(info.lowest_flr) + "(층)";	
					}
					
					var bd_nm = "";
					if(info.bd_nm != undefined && info.bd_nm.length > 0 ) {
						bd_nm = info.bd_nm;
					}
					html += "<tr><td class='admName'>" + bd_nm + "</td></tr>" 
					     +  "<tr style='height:10px;'></tr>" 
					     +  "<tr><td class='statsData'>" +lowest + " ~ "+ highest +"</td></tr>" 
					     +	"<tr style='height:5px;'></tr>" 
					     +  "<tr><td class='statsData'>" + info.bd_naddr + "</td></tr>";
				}else if (type == "polygon") {
					var html = "<table style='margin:10px;'>";
					if (data.properties.adm_nm !== undefined) {
						html += "<tr><td class='admName'>"
							 + data.properties.adm_nm 
							 + "</td></tr>"
							 + "<tr style='height:5px'></tr>";
					}
				}
				
				html += "</table>";

				event.target.bindToolTip(html, {
					direction: 'right',
					noHide:true,
					opacity: 1

				}).addTo(map.gMap)._showToolTip(event);
				
				$(".admName")
					.css("font-size", "14px")
					.css("font-weight", "bold")
					.css("color", "#3792de");
				$(".statsData")
					.css("font-size", "12px")
					.css("padding-left", "5px");
				
				$("div.sop-tooltip.sop-zoom-animated.sop-tooltip-right").css("width", "140px"); // 툽팁 너비가 작은 원인 불명으로 강제 너비 늘리기 - 2018.11.30	ywKim	신규
			},
			
			
			/**
			 * 
			 * @name         : requestOpenApi
			 * @description  : 통계정보를 요청한다.
			 * @date         : 2015. 10. 08. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param options
			 */
			requestOpenApi : function(options) {// used
				$workRoad.ui.log("$ssaMap.ui.requestOpenApi - begin");
				
				//param의 adm_cd가 00(전국)일 경우 adm_cd 삭제
				var tmpOptions = [];
				for (var i = 0; i < options.param.length; i ++) {
					if((options.param[i].key == "adm_cd" && options.param[i].value == "00")|| options.param[i].key == "adm_cd") { //9월 서비스
					} else {
						tmpOptions.push(options.param[i]);
					} 
				}
				options.param = tmpOptions;

				var api_id = options.api_id;
				
				/*if 	    (api_id == "API_0301") $ssaMapApi.request.openApiTotalPopulation(options);
				else if (api_id == "API_0302") $ssaMapApi.request.openApiSearchPopulation(options);
				else if (api_id == "API_0303") $ssaMapApi.request.openApiInderstryCode(options);
				else if (api_id == "API_0304") $ssaMapApi.request.openApiCompany(options);
				else if (api_id == "API_0305") $ssaMapApi.request.openApiHouseHold(options);
				else if (api_id == "API_0306") $ssaMapApi.request.openApiHouse(options);
				else if (api_id == "API_0307") $ssaMapApi.request.openApiFarmHouseHold(options);
				else if (api_id == "API_0308") $ssaMapApi.request.openApiForestryHouseHold(options);
				else if (api_id == "API_0309") $ssaMapApi.request.openApiFisheryHouseHold(options);
				else if (api_id == "API_0310") $ssaMapApi.request.openApiHouseHoldMember(options);
				else if (api_id == "API_4011") $ssaMapApi.request.openApiItemCombine(options);*/
				if (api_id == "API_WORK") $ssaMapApi.request.openApiWorkData(options);	// 구인현황조회 추가
				pageCallReg();
				
			},
			
			/**
			 * 
			 * @name         : requestGridLegend
			 * @description  : 좌측 범례의 확정값 요청한다.
			 * @date         : 2017. 07. 27. 
			 * @author	     : 김준하
			 * @history 	 :
			 * @param options
			 */
			requestGridLegend : function(options) {
				$workRoad.ui.addFnc04List("$ssaMap.ui.requestGridLegend");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var api_id = options.api_id;
				//주의할점 경고!!! 실제 페이지를 불러올때 아래 함수가 없으면 맵이 정상작동을 않함. 
				//개발중이어서 다 만들지 않은 상태에서 테스트 하다보니 지도를 드래그 했을때 격자를 못그림
				//각 서비스별로 나눌 필요가 없어서 하나로 사용한다.
				$ssaMapApi.request.gridLegendTotalPopulation(options);
				
				pageCallReg(); //그리드 페이지 통계
				
			},
			
			
			/**
			 * 
			 * @name         : reqSetParams
			 * @description  : 통계정보 파라미터를 설정한다.
			 * @date         : 2015. 10. 30. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param options
			 */
			reqSetParams : function (tmpParam, adm_cd, adm_nm, api_id, map, type) {// used
				$workRoad.ui.log("$ssaMap.ui.reqSetParams - begin");
				
				//0레벨,2레벨 집계구 조회일 경우,
				//레벨상관없이 집계구가 나와야 하므로, low_search를 강제로 1로 주기위에
				//소스위치를 옮김
				var low_search;
				if (adm_cd.length > 7 || type == "gibgae") {
					if (map.isInnerMapShow3) { //mng_s 20180213 행정구역 그리드의 경우 8자리일 경우 8자리를 유지해야함
						low_search = "0";
					} else {
						low_search = "1";
						adm_cd = adm_cd.substring(0, 7);
					}
				}else {
					low_search = map.boundLevel;
				}
				this.curAdmCode = adm_cd;
				map.curAdmCd = adm_cd;
				map.curDropCd = adm_cd;
				
				var params = {
						param : tmpParam[0].params,
						noneParams : tmpParam[0].noneParams,
						adm_cd : adm_cd,
						adm_nm : adm_nm,
						filter : tmpParam[0].filterParam,
						unit : tmpParam[0].unit,
						title : tmpParam[0].title,
						api_id : api_id,
						map : map,
						view_type : "NM",
						maxYear : tmpParam[0].maxYear
				};	
				params.param.push({
					key : "low_search",
					value : low_search
				});
				
				return params;
			}
	};

	// ==============================//
	// map event callback
	// ==============================//
	$ssaMap.callbackFunc = {

			// 맵이동 시작시, 콜백 호출
			didMapMoveStart : function(event, map) {// used
				$workRoad.ui.log("$ssaMap.callbackFunc.didMapMoveStart - begin");
			},

			// 맵이동 종료시, 콜백 호출
			didMapMoveEnd : function(event, map) {// used
				$workRoad.ui.log("$ssaMap.callbackFunc.didMapMoveEnd - begin");
				
				var poiControl = map.mapBtnInfo;
				
				//테마poi조회
				/*if (poiControl.isOpenPOI && 
					poiControl.isShow &&
					poiControl.themeCd != undefined && 
					poiControl.themeCd.length > 0) {
					
					console.log("[ssaMap.js] didMapMoveEnd 테마poi조회");
					
						if (poiControl.mapBounds == null) {
							map.markers.clearLayers();
							poiControl.reqThemePoiInfo(poiControl.themeCd, "0");
						}else {
							if (!poiControl.mapBounds.contains(map.gMap.getCenter())) {
								map.markers.clearLayers();
								poiControl.reqThemePoiInfo(poiControl.themeCd, "0");
							}
						}	
				}*/
				
				//사업체poi조회
				/*if (poiControl.isOpenPOI && 
						poiControl.isShow &&
						poiControl.class_cd != undefined && 
						poiControl.class_cd.length > 0) {
					
						console.log("[ssaMap.js] didMapMoveEnd 사업체poi조회");
					
							if (poiControl.mapBounds == null) {
								map.markers.clearLayers();
								poiControl.reqCompanyPoiInfo(poiControl.class_cd, "9", "0");
							}else {
								if (!poiControl.mapBounds.contains(map.gMap.getCenter())) {
									map.markers.clearLayers();
									poiControl.reqCompanyPoiInfo(poiControl.class_cd, "9", "0");
								}
							}	
					}*/
				
				//공공데이터 조회
				/*var publicDataBoard = $publicDataBoard.ui.mapData[map.id];
				if (publicDataBoard.type != undefined && 
					publicDataBoard.type.length > 0 && 
					$publicDataBoard.ui.isShow) {

					//2017.06.26 [개발팀] 공공데이터 추가 - 대전-세종간 통행정보
					if (publicDataBoard.type != "cctv") {
						if(publicDataBoard.options.mapBounds == null) {
							map.markers.clearLayers();
							$publicDataBoard.ui.reqPoi();
						} else {
							if (!publicDataBoard.options.mapBounds.contains(map.gMap.getCenter())) {
								map.markers.clearLayers();
								$publicDataBoard.ui.reqPoi();
							}
						}	
					}
				}*/
				
				//나의데이터
				/*if ($mydataDataBoard && 
						$mydataDataBoard.callbackFunc &&
						$mydataDataBoard.callbackFunc.didMapMoveEnd) {
					
					console.log("[ssaMap.js] didMapMoveEnd 나의데이터");
					
					$mydataDataBoard.callbackFunc.didMapMoveEnd(event, map);
				}
				
				if( map.isInnerMapShow2!=undefined && map.isInnerMapShow2 ) { //mng_s 그리드일 경우 
					if($ssaMap.ui.dropBtnInfo[map.id] != null && $ssaMap.ui.dropBtnInfo[map.id]!=undefined) {
						$(".dragItem .M_on").dblclick();
					}
				}*/
				
			},
			
			// 맵 줌시작 시, 콜백 호출
			didMapZoomStart : function(event, map) {
				$workRoad.ui.addFnc04List("$ssaMap.callbackFunc.didMapZoomStart");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
			},

			// 맵 줌 종료 시, 콜백 호출
			didMapZoomEnd : function(event, map) {// used
				$workRoad.ui.log("$ssaMap.callbackFunc.didMapZoomEnd - begin");
/*				
				//mng_s
				if(map.isInnerMapShow2) {
					
					//mng_s
					var grid_level = "";
					if(map.zoom=="0") {
						grid_level = "100km";
					} else if( map.zoom=="1" || map.zoom=="2" || map.zoom=="3" || map.zoom=="4" || map.zoom=="5") {
						grid_level = "10km";
					}  else if(map.zoom=="6" || map.zoom=="7" || map.zoom=="8") {
						grid_level = "1km";
					}  else if(map.zoom=="9" || map.zoom=="10" || map.zoom=="11" || map.zoom=="12" || map.zoom=="13") {
						grid_level = "100m";
					} 
					$("#grid_title_1").html("<span style='font-weight:bold;'>지도레벨 : " + map.zoom + "</span>(0~13), &nbsp;&nbsp;<span style='font-weight:bold;'> 격자레벨 : " + grid_level + "</span>(100km/10km/1km/100m)");
					
					
					if(map.geojson != null) {
						map.geojson.remove();
					}
					if(map.dataGeojson != null) {
						map.dataGeojson.remove();
					}
					
					map.openApiBoundaryHadmarea("11010", map.bnd_year, "1", "0", map.boundaryCallback, map.bounds); //그리드이므로 adm_cd는 임의의 값을 넣어줌
					if($ssaMap.ui.dropBtnInfo[map.id] != null && $ssaMap.ui.dropBtnInfo[map.id]!=undefined) {
						$(".dragItem .M_on").dblclick();	
					}
				}
				
				//mng_s 20180213
				if(map.isInnerMapShow3) {
					
					//mng_s
					var grid_level = "";
					if(map.zoom=="0") {
						grid_level = "100km";
					} else if( map.zoom=="1" || map.zoom=="2" || map.zoom=="3" || map.zoom=="4" || map.zoom=="5") {
						grid_level = "10km";
					}  else if(map.zoom=="6" || map.zoom=="7" || map.zoom=="8") {
						grid_level = "1km";
					}  else if(map.zoom=="9" || map.zoom=="10" || map.zoom=="11" || map.zoom=="12" || map.zoom=="13") {
						grid_level = "100m";
					} 
					$("#grid_title_1").html("<span style='font-weight:bold;'>지도레벨 : " + map.zoom + "</span>(0~13), &nbsp;&nbsp;<span style='font-weight:bold;'> 격자레벨 : " + grid_level + "</span>(100km/10km/1km/100m)");
				}
				
				var poiControl = map.mapBtnInfo;
//						if (map.zoom < 10 && map.isInnerMapShow) {
//							$ssaMap.ui.doInnerMap(map.id+1);
//						}

				//사업체 POI 없애기
				if (map.zoom < 9 && poiControl.isOpenPOI && poiControl.isShow) {
					poiControl.isShow = false;
					messageConfirm.open(
			    			 "알림", 
			    			 "해당 레벨부터는 사업체 POI정보를 볼 수 없습니다.<br>" +
			    			 "유지하기 버튼을 누르면 집계구레벨로 이동할 시 다시 POI를 볼 수 있습니다.",
			    			 btns = [
								{
								    title : "그만보기",
								    fAgm : null,
								    disable : false,
								    func : function(opt) {
								    	poiControl.clearPOI();
								    }
								 },
								 
			    			     {
								   title : "유지하기",
								   fAgm : null,
								   disable : false,
								   func : function(opt) {}
			    			     }   
			    			 ]
			    	);
				}else if (map.zoom > 9 && poiControl.isOpenPOI && !poiControl.isShow) {
					poiControl.isShow = true;
				}
*/				
				//공공데이터 POI  없애기
				//var publicDataBoard = $publicDataBoard.ui.mapData[map.id];
				
				//2017.06.26 [개발팀] 공공데이터 추가 - 대전-세종간 통행정보
				/*if (publicDataBoard.type != "cctv") {
					if (map.zoom < 9 && publicDataBoard.options.map != null && $publicDataBoard.ui.isShow) {
						$publicDataBoard.ui.isShow = false;
						messageConfirm.open(
				    			 "알림", 
				    			 "해당 레벨부터는 공공데이터 POI정보를 볼 수 없습니다.<br>" +
				    			 "유지하기 버튼을 누르면 집계구레벨로 이동할 시 다시 POI를 볼 수 있습니다.",
				    			 btns = [
									{
									    title : "그만보기",
									    fAgm : null,
									    disable : false,
									    func : function(opt) {
									    	$publicDataBoard.ui.remove(map.id);
									    }
									 },
									 
				    			     {
									   title : "유지하기",
									   fAgm : null,
									   disable : false,
									   func : function(opt) {}
				    			     }   
				    			 ]
				    	);
					}else if (map.zoom > 9 && 
							  publicDataBoard.options.map != null && 
							  !$publicDataBoard.ui.isShow) {
						$publicDataBoard.ui.isShow = true;
					}
				}*/
				
			},
			
			
			// 드랍종료 시, 콜백 호출
			didMapDropEnd : function(event, source, layer, data, map) {
				$workRoad.ui.addFnc04List("$ssaMap.callbackFunc.didMapDropEnd");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				if( map.isInnerMapShow2!=undefined && map.isInnerMapShow2 ) { //mng_s 그리드일 경우
					//그리드는 드랍 이벤트 없음
				} else {
					var api_id = "";
					var index = null;

					// 임시 - 2018.11.14	ywKim	변경
//					// share정보 초기화
//					$ssaMap.noReverseGeoCode = false;
//					$ssaMap.ui.curMapId = map.id;
//					$ssaMapApi.request.combineFailCnt = 0;
//					
//					//공유 (나의 데이터에서는 shareInfo가 null)
//					var shareInfo = new share.shareInfo(map, $ssaMap.ui); //share.shareInfo()는 bookmarkAndShareInfo.js에 있는듯 하다.
//					map.shareInfo = shareInfo;
//					map.shareInfo.shareUrlInfo = [];
//					map.dropInfo = null;
					
					if ($ssaMap.ui.curDropParams == undefined) {
						$ssaMap.ui.curDropParams = [];
					}
					
					var id = $("#" + source.prop("id")).find("a").attr("id");
					var atdrcYn = $("#" + source.prop("id")).find(".atdrc_yn").html();
					var tmpParamList = deepCopy($ssaMapFrame.ui.arParamList);
					//경계고정을 하였을 경우,
					//현재 보이는 경계로 다중선택처럼 layer를 저장한다.
					if (map.isFixedBound) {
						map.setBoundSelectedMoode("multi");
						if (map.selectedBoundList.length == 0) {
							map.setBoundSelectedLayer();
						}
					}
					
					//kosis
					if (id.split("-")[0] == "kosis") {
						map.curAdmCd = data.adm_cd;
						var tempAdmCd = data.adm_cd;
						if (tempAdmCd == "00") {
							tempAdmCd = "1";
						}
						var admCdLen = tempAdmCd.length;
						ssaMapKosis.map = map;
						index = id.split("-")[1];

						var selParams = [];
						for (var i = 0; i < tmpParamList.length; i++) {
							if (tmpParamList[i].idx == index) {
								ssaMapKosis.curSelectedTitle = tmpParamList[i].title;
								selParams.push(tmpParamList[i].params);
								break;
							}
						}
						
						//kosis 년도정도 설정
						var kosisYear = null;
						for (var k=0; k<selParams[0].length; k++) {
							if (selParams[0][k].key == "kosis_data_year") {
								kosisYear = selParams[0][k].value;
								if (kosisYear.length > 4) {
									kosisYear = kosisYear.substring(0,4);
								}
								break;
							}
						}
						if (kosisYear != null) {
							$ssaMap.ui.curDropParams[map.id] = {
									param : [{
										key : "year",
										value : kosisYear
									}]
							};
						}
						
						$ssaMap.ui.setDataType(map.id, "kosis");
						$ssaMap.ui.dropBtnInfo[map.id] = tmpParamList[i];
						$ssaMap.ui.dropBtnInfo[map.id]["isKosis"] = true;
						ssaMapKosis.reqSetKosisParam(selParams, tempAdmCd, atdrcYn, map);
						$ssaMapFrame.ui.updateSearchBtnEffect(id, map.id);
						return;
						
					} else {
						//코시스에서 조회된 세부항목설정창을 닫는다.
						$("#kosisArea").hide();
						
						//전국단위에서 경계레벨 0과 2로 조회할 경우
						//데이터를 조회하지 않는다.
						if (map.boundLevel == "2") {
							if (data.adm_cd == "00") {
								map.clearDataOverlay();
								messageAlert.open("알림", "경계레벨 2의 경우는 전국레벨에서 조회를 할 수 없습니다.");
								return;
							}
						}
						
						map.bnd_year = bndYear;
						$ssaMap.ui.setDataType(map.id, "census");
						$ssaMap.ui.searchBtnType = "normal";
						api_id = id.split("-")[0];
						index = id.split("-")[1];
						$ssaMapFrame.ui.updateSearchBtnEffect(id, map.id);
		
						var tmpParam = null;
						for (var i = 0; i < tmpParamList.length; i++) {
							if (tmpParamList[i].idx == index) {
								tmpParam = tmpParamList[i];
								$ssaMap.ui.dropBtnInfo[map.id] = tmpParamList[i];
								break;
							}
						}
					}
					
					// 다중선택일 경우
					if (map.selectedBoundMode == "multi") {
						map.multiLayerControl.clear();
						if (map.selectedBoundList.length > 0) {
							var admList = null;
							if (map.selectedBoundList[0].feature.properties.adm_cd.length > 7) {
								for (var i=0; i<map.selectedBoundList.length; i++) {
									var adm_cd = map.selectedBoundList[i].feature.properties.adm_cd;
									var adm_nm = map.selectedBoundList[i].feature.properties.adm_nm;
									if (admList == null) admList = [];
									admList.push(adm_cd.substring(0,7));
								}
								if (admList.length > 0) {
									//데이터 중복제거
									var tmpData = [];
									$.each(admList, function(k, el){
										if($.inArray(el, tmpData) === -1) tmpData.push(el);
									});
									admList = tmpData;
							
									for (var i=0; i<admList.length; i++) {
										if (tmpParam != null) {
											var params = $ssaMap.ui.reqSetParams(tmpParam, admList[i], adm_nm, api_id, map, "gibgae");
											$ssaMap.ui.curDropParams[map.id] = params;
											$ssaMap.ui.requestOpenApi(params);
										}
									}
								}
								
							}else {
								for (var i = 0; i < map.selectedBoundList.length; i++) {
									var adm_cd = map.selectedBoundList[i].feature.properties.adm_cd;
									var adm_nm = map.selectedBoundList[i].feature.properties.adm_nm;
				
									if (tmpParam != null) {
										var params = $ssaMap.ui.reqSetParams(tmpParam, adm_cd, adm_nm, api_id, map);
										$ssaMap.ui.curDropParams[map.id] = params;
										$ssaMap.ui.requestOpenApi(params);
									}
								}
							}
						}
						
					} else {
						if (tmpParam != null) {
							var params = $ssaMap.ui.reqSetParams(tmpParam, data.adm_cd, data.adm_nm, api_id, map);

							//시계열 초기값 세팅
							$ssaDataBoard.ui.timeSeriesInit(params);
							$ssaMap.ui.curDropParams[map.id] = params;
							$ssaMap.ui.requestOpenApi(params);
						}
						map.setBoundSelectedMoode(null);
					}
				}
			},
			
			
			// 더블클릭 시, 콜백 호출
			didMapDoubleClick : function(btn_id, tmpParam) {
				$workRoad.ui.addFnc04List("$ssaMap.callbackFunc.didMapDoubleClick");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var map = $ssaMap.ui.mapList[$ssaMap.ui.curMapId];				
				var index = null;
				var adm_cd = "";
				var adm_name= "";
				var api_id = "";
				
				// 임시 - 2018.11.14	ywKim	변경
//				// share정보 초기화
//				$ssaMap.noReverseGeoCode = false;
//				$ssaMap.ui.curMapId = map.id;
//				$ssaMapApi.request.combineFailCnt = 0;
//				
//				//공유 (나의 데이터에서는 shareInfo가 null)
//				var shareInfo = new share.shareInfo(map, $ssaMap.ui);
//				map.shareInfo = shareInfo;
//				map.shareInfo.shareUrlInfo = [];
//				map.dropInfo = null;
				
				//경계고정을 하였을 경우,
				//현재 보이는 경계로 다중선택처럼 layer를 저장한다.
				if (map.isFixedBound) {
					map.setBoundSelectedMoode("multi");
					if (map.selectedBoundList.length == 0) {
						map.setBoundSelectedLayer();
					}
				}
				
				var id = btn_id;
				var atdrcYn = $("#"+id).find(".atdrc_yn").html();
				// kosis
				if (id.split("-")[0] == "kosis") {
					var tempAdmCd = "";
					var tempAdmNm = "";
					
					var center = map.gMap.getCenter();
					map.gMap.eachLayer(function(layer){
						 if( layer._containsPoint) {
							 var point = map.gMap.utmkToLayerPoint(center);  
			                    if (layer._containsPoint(point)){
			                    	tempAdmCd = layer.feature.properties.adm_cd;
			                    	tempAdmNm = layer.feature.properties.adm_nm;
			                    }
						 }
					});
					
					if (tempAdmCd.length == 0 && !map.isInnerMapShow2) { //mng_s
						messageAlert.open("알림", "초기화 버튼을 클릭하여 경계를 조회해주세요.");
						return;
					}
					if (!map.isInnerMapShow3) { //mng_s 20180213 행정구역 그리드의 경우 읍면동으로 내려가면 8 자리인데 7자리로 자르면 않됨
						if (tempAdmCd.length > 7) {
							tempAdmCd = tempAdmCd.substring(0,7);
						}
					}
					
					if (tempAdmCd == "00") {
						tempAdmCd = "1";
					}
					var admCdLen = tempAdmCd.length;
					ssaMapKosis.map = map;
					index = id.split("-")[1];

					var selParams = [];
					selParams.push(tmpParam.params);
					
					//kosis 년도정도 설정
					var kosisYear = null;
					for (var k=0; k<selParams[0].length; k++) {
						if (selParams[0][k].key == "kosis_data_year") {
							kosisYear = selParams[0][k].value;
							if (kosisYear.length > 4) {
								kosisYear = kosisYear.substring(0,4);
							}
							break;
						}
					}
					if (kosisYear != null) {
						$ssaMap.ui.curDropParams[map.id] = {
								param : [{
									key : "year",
									value : kosisYear
								}]
						};
					}
					
					$ssaMap.ui.setDataType(map.id, "kosis");
					ssaMapKosis.reqSetKosisParam(selParams, tempAdmCd, atdrcYn, map);
					$ssaMapFrame.ui.updateSearchBtnEffect(id, map.id);
					return;
				} else {
					
					//코시스에서 조회된 세부항목설정창을 닫는다.
					$("#kosisArea").hide();
					
					map.bnd_year = map.bnd_year;
					$ssaMap.ui.searchBtnType = "normal";
					api_id = id.split("-")[0];
					index = id.split("-")[1];

					// 버튼 시각 효과
					$ssaMapFrame.ui.updateSearchBtnEffect(id, map.id);
					$ssaMap.ui.dropBtnInfo[map.id] = tmpParam;
					$ssaMap.ui.setDataType(map.id, "census");
				}
				
				if (map.selectedBoundMode == "multi") {
					map.multiLayerControl.clear();
					
					if (map.selectedBoundList.length > 0) {
						var admList = null;
						if (map.selectedBoundList[0].feature.properties.adm_cd.length > 7) {
							for (var i=0; i<map.selectedBoundList.length; i++) {
								var adm_cd = map.selectedBoundList[i].feature.properties.adm_cd;
								var adm_nm = map.selectedBoundList[i].feature.properties.adm_nm;
								
								//전국단위에서 경계레벨 0과 2로 조회할 경우
								//데이터를 조회하지 않는다.
								if (map.boundLevel == "2") {
									if (adm_cd == "00") {
										map.clearDataOverlay();
										messageAlert.open("알림", "경계레벨 2의 경우는 전국레벨에서 조회를 할 수 없습니다.");
										map.setBoundSelectedMoode(null);
										map.mapBtnInfo.setFixedBoundBtn(false);
										return;
									}
								}
								
								if (admList == null) admList = [];
								admList.push(adm_cd.substring(0,7));
							}
							if (admList.length > 0) {
								//데이터 중복제거
								var tmpData = [];
								$.each(admList, function(k, el){
									if($.inArray(el, tmpData) === -1) tmpData.push(el);
								});
								admList = tmpData;
						
								for (var i=0; i<admList.length; i++) {
									if (tmpParam != null) {
										//map.selectedBoundList = admList;
										var params = $ssaMap.ui.reqSetParams(tmpParam, admList[i], adm_nm, api_id, map, "gibgae");
										$ssaMap.ui.curDropParams[map.id] = params;
										$ssaMap.ui.requestOpenApi(params);
									}
								}
							}
							
						}else {
							for (var i = 0; i < map.selectedBoundList.length; i++) {
								var adm_cd = map.selectedBoundList[i].feature.properties.adm_cd;
								var adm_nm = map.selectedBoundList[i].feature.properties.adm_nm;
								
								//전국단위에서 경계레벨 0과 2로 조회할 경우
								//데이터를 조회하지 않는다.
								if (map.boundLevel == "2") {
									if (adm_cd == "00") {
										map.clearDataOverlay();
										messageAlert.open("알림", "경계레벨 2의 경우는 전국레벨에서 조회를 할 수 없습니다.");
										map.setBoundSelectedMoode(null);
										map.mapBtnInfo.setFixedBoundBtn(false);
										return;
									}
								}
			
								if (tmpParam != null) {
									var params = $ssaMap.ui.reqSetParams(tmpParam, adm_cd, adm_nm, api_id, map);
									$ssaMap.ui.curDropParams[map.id] = params;
									$ssaMap.ui.requestOpenApi(params);
								}
							}
						}
					}
					
				}else {
					var center = map.gMap.getCenter();
					map.gMap.eachLayer(function(layer){
						 if( layer._containsPoint) {
							 var point = map.gMap.utmkToLayerPoint(center);  
			                    if (layer._containsPoint(point)){
			                    	adm_cd = layer.feature.properties.adm_cd;
			                    	adm_nm = layer.feature.properties.adm_nm;
			                    }
						 }
					});
					
					if (adm_cd.length == 0 && !map.isInnerMapShow2) { //mng_s
						messageAlert.open("알림", "초기화 버튼을 클릭하여 경계를 조회해주세요.");
						return;
					}
					
					//전국단위에서 경계레벨 0과 2로 조회할 경우
					//데이터를 조회하지 않는다.
					if (map.boundLevel == "2") {
						if (adm_cd == "00") {
							map.clearDataOverlay();
							messageAlert.open("알림", "경계레벨 2의 경우는 전국레벨에서 조회를 할 수 없습니다.");
							return;
						}
					}

					if (tmpParam != null) {				
						var params = $ssaMap.ui.reqSetParams(tmpParam, adm_cd, adm_nm, api_id, map);
						
						//시계열 초기값 세팅
						$ssaDataBoard.ui.timeSeriesInit(params);
						$ssaMap.ui.curDropParams[map.id] = params;
						$ssaMap.ui.requestOpenApi(params);
						
						if ( map.isInnerMapShow2 ) {
							$ssaMap.ui.requestGridLegend(params); //mng_s 그리드 범례요청
						}
					}
					map.setBoundSelectedMoode(null);
					map.mapBtnInfo.setFixedBoundBtn(false);
				}
				
				//mng_s
				if ( map.isInnerMapShow2 ) {
					//mng_s 20180104 주용민 투명도
					$(".btn_legendSetting").show(); 
					$(".lgListBox li").hide();
					$(".lgListBox li:last").show();
					$(".opacityLayer").css("left","450px");
					$("#grid_title_1").show();
					var grid_level = "";
					if(map.zoom=="0") {
						grid_level = "100km";
					} else if( map.zoom=="1" || map.zoom=="2" || map.zoom=="3" || map.zoom=="4" || map.zoom=="5") {
						grid_level = "10km";
					}  else if(map.zoom=="6" || map.zoom=="7" || map.zoom=="8") {
						grid_level = "1km";
					}  else if(map.zoom=="9" || map.zoom=="10" || map.zoom=="11" || map.zoom=="12" || map.zoom=="13") {
						grid_level = "100m";
					} 
					$("#grid_title_1").html("<span style='font-weight:bold;'>지도레벨 : " + map.zoom + "</span>(0~13), &nbsp;&nbsp;<span style='font-weight:bold;'> 격자레벨 : " + grid_level + "</span>(100km/10km/1km/100m)");
				}
				
				
				//mng_s 20180208 bnd_grid 행정구역그리드와 전체화면 그리드의 경우 grid_level이 다를 수 있으므로 주의요망
				if ( map.isInnerMapShow3 ) {
					//mng_s 20180104 주용민 투명도
					$(".btn_legendSetting").show(); 
					$(".lgListBox li").hide();
					$(".lgListBox li:last").show();
					$(".opacityLayer").css("left","450px");
					$("#grid_title_1").show();
					var grid_level = "";
					if(map.zoom=="0") {
						grid_level = "100km";
					} else if( map.zoom=="1" || map.zoom=="2" || map.zoom=="3" || map.zoom=="4" || map.zoom=="5") {
						grid_level = "10km";
					}  else if(map.zoom=="6" || map.zoom=="7" || map.zoom=="8") {
						grid_level = "1km";
					}  else if(map.zoom=="9" || map.zoom=="10" || map.zoom=="11" || map.zoom=="12" || map.zoom=="13") {
						grid_level = "100m";
					} 
					$("#grid_title_1").html("<span style='font-weight:bold;'>지도레벨 : " + map.zoom + "</span>(0~13), &nbsp;&nbsp;<span style='font-weight:bold;'> 격자레벨 : " + grid_level + "</span>(100km/10km/1km/100m)");
				}
				
			},
			
			/**
			 * 
			 * @name         : didMouseOverPolygon
			 * @description  : 해당경계 mouse over 시, 발생하는 콜백함수
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 일반경계 및 데이터경계 타입
			 */
			didMouseOverPolygon : function(event, data, type, map) {// used
				$workRoad.ui.log("$ssaMap.callbackFunc.didMouseOverPolygon - begin");
				
				for(var i=0; i<$ssaDataBoard.ui.tempIdxList.length; i++){
					if(data.properties.adm_nm == $ssaDataBoard.ui.tempIdxList[i].item){
						data.dataIdx = $ssaDataBoard.ui.tempIdxList[i]._dataIdx;
					}
				}
				
				//2017.07.25 [개발팀] 공공데이터 관련 - 툴팁 pass
				if (data.tooltip != undefined && !data.tooltip) {
					return;
				}
				if (type != "polygon") {
					if( map.isInnerMapShow2!=undefined && map.isInnerMapShow2 ) { //mng_s 그리드일 경우 
						//그리드일 경우 화면에 툴팁을 표출하지 않는다. ==> 표출하는것으로 변경됨
						if (type == "data") {
								$ssaDataBoard.ui.selectChartData(data.properties, data.dataIdx, map.id);
								map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
						if (data.info.length > 0) { //데이터가 있을 경우만 툴팁을 보여준다.
							$ssaMap.ui.createInfoTooltip(event, data, type, map);
						}
					} else if( map.isInnerMapShow3!=undefined && map.isInnerMapShow3 ) { //mng_s 그리드일 경우 
						if (type == "data") {
								$ssaDataBoard.ui.selectChartData(data.properties, data.dataIdx, map.id);
								map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
						if (data.info.length > 0) { //데이터가 있을 경우만 툴팁을 보여준다.
							$ssaMap.ui.createInfoTooltip(event, data, type, map);
						}
					} else {
						if (type == "data") { 
								$ssaDataBoard.ui.selectChartData(data.properties, data.dataIdx, map.id);
								map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
						$ssaMap.ui.createInfoTooltip(event, data, type, map);
					}
				}else {
					if( map.isInnerMapShow2!=undefined && map.isInnerMapShow2 ) { //mng_s 그리드일 경우 
						//그리드일 경우 화면에 툴팁을 표출하지 않는다. ==> 표출하는것으로 변경됨
						$ssaMap.ui.createInfoTooltip(event, data, type, map);
					} else {
						$ssaMap.ui.createInfoTooltip(event, data, type, map);
					}
				}
			},

			
			/**
			 * 
			 * @name         : didMouseOutPolygo
			 * @description  : 해당경계 mouse out 시, 발생하는 콜백함수
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 일반경계 및 데이터경계 타입
			 */
			didMouseOutPolygon : function(event, data, type, map) {// used
				$workRoad.ui.log("$ssaMap.callbackFunc.didMouseOutPolygon - begin");
				
				if (map.selectedBoundMode != null && map.selectedBoundMode == "multi") {
					for (var i=0; i<map.selectedBoundList.length; i++) {
						var layer = map.selectedBoundList[i];
						if (event.target == layer) {
							layer.setStyle({
								weight : 3,
								color : "white",
								dashArray : layer.options.dashArray,
								fillOpacity : 0.7,
								fillColor : "#F06292"
							});
						}
					}
				}
			},

			
			/**
			 * 
			 * @name         : didSelectedPolygon
			 * @description  : 해당경계 선택 시, 발생하는 콜백함수
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 일반경계 및 데이터경계 타입
			 */
			didSelectedPolygon : function(event, data, type, map) {// used
				$workRoad.ui.log("$ssaMap.callbackFunc.didSelectedPolygon - begin");
				
				if (type == "data") {
				
				}else if (type == "build") {
					if ($ssaMap.ui.buildPopup != null) {
						$ssaMap.ui.buildPopup.close();
					}
					
					var top = $("#mapRgn_"+(map.id+1)).offset().top + 100;
					var left = $("#mapRgn_"+(map.id+1)).offset().left + 
							   $("#mapRgn_"+(map.id+1)).width()/2 - 400/2;

					$ssaMap.ui.buildPopup = 
						window.open(
							"/view/indoor/indoorMap?sufid=" + data.properties.sufid, 
							"건물상세정보",
							"top="+top+", left="+left+", width=800, height=680, menubar=no, status=no, toolbar=no, location=no, resizable=yes"
						);
					
				}
				
				//다중경계선택
				if (map.selectedBoundMode != null && map.selectedBoundMode == "multi") {
					var layer = event.target;
					var boundList = map.selectedBoundList;
					var tmpBoundList = [];
					var isEqualLayer = false;
					
					for (var i=0; i<boundList.length; i++) {
						if (boundList[i].feature.properties.adm_cd == layer.feature.properties.adm_cd) {
							map.clearLayerStyle(layer);
							isEqualLayer = true;
						}else {
							tmpBoundList.push(boundList[i]);
						}
					}
					map.selectedBoundList = tmpBoundList;
					
					if (isEqualLayer) {
						return;
					}
					
					if (layer.options.origin == undefined) {
						layer.options["origin"] = {
								weight : layer.options.weight,
								color : layer.options.color,
								dashArray : layer.options.dashArray,
								fillOpacity : layer.options.fillOpacity,
								fillColor : layer.options.fillColor	
						};
					}					
					
					layer.setStyle({
						weight : 3,
						color : "white",
						dashArray : layer.options.dashArray,
						fillOpacity : 0.7,
						fillColor : "#F06292"
					});
					map.selectedBoundList.push(layer);
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
				$workRoad.ui.addFnc04List("$ssaMap.callbackFunc.didDrawCreate");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var layer = event.layer;
				var area = "";
				
				//다각형 및 사각형일때, 특정 영역을 넘어서면 알림 메시지 호출
				if (type == "polygon" || type == "rectangle") {
					var shapeArea = layer._getArea();
					if (shapeArea > 113000000) {
						messageAlert.open('최적의 서비스 속도를 위해 사용자 임의영역 면적이 113000000m² 이하가 되어야 합니다.');
						layer._shapeGroup.removeLayer(layer._shape);
						layer._shape = null;
						layer._map.dragging.enable();
						map.mapBtnInfo.doClearSelectedBound();
						map.mapBtnInfo.setFixedBoundBtn(false);
						return;
					}
				}
				
				if(type == "polygon") {
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
				else if(type == "circle") {
					area = "CIRCLE(" + 
						    	layer._utmk.x + " " + 
						    	layer._utmk.y + "," + 
						    	layer.getRadius()+ 
						    ")";
				}
				else if(type == "rectangle") {
					area = "RECTANGLE(" +
								layer._utmks[0][0].x + " " + 
								layer._utmks[0][0].y + "," + 
								layer._utmks[0][2].x + " " +
								layer._utmks[0][2].y + 
							")";
				}
				
				if (map.curPolygonCode == 5) {
					map.setZoom(9);
					map.curPolygonCode = 5;
				}
				map.selectedBoundMode = "multi";
				map.selectedBoundList = [];
				
				//전국
				if (map.curPolygonCode == "1") {
					if (map.geojson) {
						map.geojson.remove();
					}
					if (map.dataGeojson) {
						map.dataGeojson.remove();
					}
					map.multiLayerControl.clear();
					map.openApiBoundaryContry(function(map, res) {
						map.addPolygonGeoJson(res, "polygon");
						if (map.geojson) {
							map.geojson.eachLayer(function(layer) {
								layer.setStyle({
									weight : 3,
									color : "white",
									dashArray : layer.options.dashArray,
									fillOpacity : 0.7,
									fillColor : "#F06292"
								});
								map.selectedBoundList.push(layer);
							});
						}
						event.shapeGroup.thisShapeRemove();
					});
				}else {
					$ssaMapApi.request.userAreaBoundInfo(area, type, map.curPolygonCode, event, map);	
				}
				
			},
			
			/**
			 * 
			 * @name         : didFinishedMultidata
			 * @description  : 사용자경계(multi layer data) 조회 후, 콜백
			 * @date         : 2016. 02. 04. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param dataList 표출된 데이터리스트
			 * @param admCdList 행정동코드리스트
			 * @param @param map   델리케이트
			 */
			didFinishedMultidata : function(dataList, admCdList, map) {
				$workRoad.ui.addFnc04List("$ssaMap.callbackFunc.didFinishedMultidata");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var admNameList = [];
				for (var i=0; i<dataList.length; i++) {
					var layer = dataList[i].layer;
					admNameList.push(layer.features[0].properties.adm_nm);
				}
				var options = {
						params : {
							adm_cd : admCdList.join(","),
							adm_nm : admNameList.join(","),
							title : "사용자영역 통계",
							map : map
						}
				};
				
				//나의 데이터일 경우 데이터보드를 실행하지 않고 멈춘다.
				if($ssaMapFrame.ui.curSelectedStatsType == "userData") {
					return;
				}
				
				$ssaDataBoard.ui.updateDataBoardMulti(dataList, options);
			}

	};

	$ssaMap.event = {
			
			/**
			 * 
			 * @name         : setUIEvent
			 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date         : 2014. 10. 15. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */	
			setUIEvent : function() {// used
				$workRoad.ui.log("$ssaMap.event.setUIEvent - begin");
				
//						Kakao.init('167fc6abf0eb4717e1f3de7895a0152a');
				$("#openShare").click(function() {
					$workRoad.ui.addFnc04List("$ssaMap.event.setUIEvent[1]");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
					
				});
				
				var isClose = false;
				$(".tb_close").click(function(){// used
					$workRoad.ui.log('$ssaMap.event.setUIEvent.[$(".tb_close").click] - begin');
					
					isClose = true;
					$(this).hide(); 
					$(".resizeIcon").hide();
					$(".interactiveView").each(function(i){
						$(this).text("VIEW"+parseInt(i+1));
					});
					
					var sceneInx = $(".sceneBox.on").length;
					if (sceneInx == 1) {
						$(".tb_combine").parent().hide();
						$(".viewTitle > span").hide();
					}else if (sceneInx == 2) {
						var tmpView = [];
						var isSameView = false;
						$(".sceneBox.on").each(function() {
							var id = parseInt($(this).attr("id").split("view")[1])-1;
							tmpView.push(id);
							if (id == $ssaMap.ui.curMapId) {
								isSameView = true;
							}
						});						
						
						if (!isSameView) {
							if (tmpView[0] < tmpView[1]) {
								$ssaMap.ui.curMapId = tmpView[0];
							}else {
								$ssaMap.ui.curMapId = tmpView[1];
							}
							
							var id = "view" + ($ssaMap.ui.curMapId + 1);
							switch($ssaMap.ui.curMapId) {
								case 0:
									$("#"+id).find(".toolBar").css("background", "#0070c0");
									break;
								case 1:
									$("#"+id).find(".toolBar").css("background", "#9ed563");
									break;
								case 2:
									$("#"+id).find(".toolBar").css("background", "#ff0066");
									break;
							}
						}	
					}
			    }); 
			
				$(".sceneBox").click(function(){// used
					$workRoad.ui.log('$ssaMap.event.setUIEvent.[$(".sceneBox").click] - begin');
					
					var sceneInx = $(".sceneBox.on").length; 
					var id = $(this).attr("id");
					var xVal = "";
					var xVal2 = "";
					if (sceneInx > 1) {
						if (!isClose) {
							$(".sceneBox").find(".toolBar").css("background", "#ffffff");
						}
						if (id == "view1") {
							$ssaMap.ui.curMapId = 0;
							$(this).find(".toolBar").css("background", "#0070c0");
							xVal = $("#wrmSubTitle1").text();
							xVal2 = $("#wrmSubTitle1DetailPopup").val();
						}else if (id == "view2") {
							$ssaMap.ui.curMapId = 1;
							$(this).find(".toolBar").css("background", "#9ed563");
							xVal = $("#wrmSubTitle2").text();
							xVal2 = $("#wrmSubTitle2DetailPopup").val();
						}else {
							$ssaMap.ui.curMapId = 2;
							$(this).find(".toolBar").css("background", "#ff0066");
							xVal = $("#wrmSubTitle3").text();
							xVal2 = $("#wrmSubTitle3DetailPopup").val();
						}
						$(".sceneBox").find(".tb_mapAdd").parent().show();
						
						if (sceneInx == 3) {
							$(".sceneBox").find(".tb_mapAdd").parent().hide();
							$(".sceneBox").css({"z-index":"8", "border":"2px solid #333"});
							$(this).css({"z-index":"10"});
							
						}
					}else {
						$(".sceneBox").find(".toolBar").css("background", "#ffffff");
					}
					isClose = false;
					
					var curMapId = $ssaMap.ui.curMapId;
					var dataType = $ssaMap.ui.dataTypeList[curMapId];		//census, kosis, publicData, userData
					
					// 임시 - 2018.11.14	ywKim	변경
//					$mydataDataBoard.ui.delegateSetting($ssaMap.ui);			//나의데이터 세팅
//					$publicDataBoard.ui.delegateSetting($ssaMap.ui);			//공공데이터 세팅
					
					//다른 분할맵을 선택할 경우
					if(curMapId != $ssaDataBoard.ui.map_id) {
						
						//경제상황
						if(xVal2 == "ssaEconomicSituationDetailPopup") {
							//20181213 추가_손원웅 *분기 데이터명으로 인해, 아래 로직 순서 지켜주세요.
							if(xVal != ""){
								if($ssaEconomicSituation.ui.SearchParam.Link_id == "I3401" || $ssaEconomicSituation.ui.SearchParam.Link_id == "I3402" || $ssaEconomicSituation.ui.SearchParam.Link_id == "I3403" || $ssaEconomicSituation.ui.SearchParam.Link_id == "I3405" || $ssaEconomicSituation.ui.SearchParam.Link_id == "I3406") {
									$ssaEconomicSituationDetailPopup.ui.selectDataBoardMap(xVal);	//지도
									
									/*if($ssaEconomicSituation.ui.MapType == "color"){
			                    		$ssaMap.ui.getTodayStatusMapData("", "", "", xVal);	//지도 년도 세팅
			                    	}*/
			                    	
			                    	$ssaDataBoard.ui.updateTargetAreaEconomicSituationChart(xVal);	//데이터보드 차트
			                    	$ssaDataBoard.ui.updateTargetAreaEconomicSituationTable(xVal);	//데이터보드 표
			                    	
			                    	//데이터보드 정보표시(통계명, 출처, 자료갱신일)
									$workRoad.ui.selectJobStatsDataInfo($ssaEconomicSituation.ui.SearchParam.Link_id
										, function(data) {
											var title = data.stat_nm + " (" + $workRoad.util.dateWithSign(data.create_dt, ".") + ")";
											//var sido_nm = ($wrmTodayStatus.ui.sido_nm.length > 0) ? $wrmTodayStatus.ui.sido_nm : "전국";
											
											$("#ssaDataBoard #ssaStatPath").html(data.stat_path);
											$("#ssaDataBoard #ssaTitle").html(title);					// 제목
											$("#ssaDataBoard #ssaOrigin").html(data.colct_source);		// 출처
											$("#ssaDataBoard #ssaArea").html(data.recent_updt_de);		// 자료갱신일
											
											console.log("SearchPopupMap - DataInfo data : " + JSON.stringify(data));
										}, function(err) {
											alert(err);
									});
								}
								else {
									$ssaEconomicSituationDetailPopup.ui.SearchPopupData();
									$ssaEconomicSituationDetailPopup.ui.SearchPopupChart();
									$ssaEconomicSituationDetailPopup.ui.SearchPopupMap();										
								}
							}else{
								$ssaEconomicSituationDetailPopup.ui.SearchPopupData();
								$ssaEconomicSituationDetailPopup.ui.SearchPopupChart();
								$ssaEconomicSituationDetailPopup.ui.SearchPopupMap();
							}
						}
						//일자리 증감
						else if(xVal2 == "ssaJobGrowthDetailPopup") {
							//20181213 추가_손원웅 *분기 데이터명으로 인해, 아래 로직 순서 지켜주세요.
							if(xVal != ""){
								if($ssaJobGrowth.ui.SearchParam.Link_id == "E3224" || $ssaJobGrowth.ui.SearchParam.Link_id == "I3220" || $ssaJobGrowth.ui.SearchParam.Link_id == "E3218" || $ssaJobGrowth.ui.SearchParam.Link_id == "E3208" || $ssaJobGrowth.ui.SearchParam.Link_id == "I3207" || $ssaJobGrowth.ui.SearchParam.Link_id == "I3206") {
									$ssaJobGrowthDetailPopup.ui.selectDataBoardMap(xVal);	//지도
									
									/*if($ssaEconomicSituation.ui.MapType == "color"){
			                    		$ssaMap.ui.getTodayStatusMapData("", "", "", xVal);	//지도 년도 세팅
			                    	}*/
			                    	
									$ssaDataBoard.ui.updateTargetAreaJobGrowthChart(xVal);	//차트
									$ssaDataBoard.ui.updateTargetAreaJobGrowthTable(xVal);	//테이블
									
									//데이터보드 정보표시(통계명, 출처, 자료갱신일)
									$workRoad.ui.selectJobStatsDataInfo($ssaJobGrowth.ui.SearchParam.Link_id
										, function(data) {
											var title = data.stat_nm + " (" + $workRoad.util.dateWithSign(data.create_dt, ".") + ")";
											//var sido_nm = ($wrmTodayStatus.ui.sido_nm.length > 0) ? $wrmTodayStatus.ui.sido_nm : "전국";
											
											$("#ssaDataBoard #ssaStatPath").html(data.stat_path);
											$("#ssaDataBoard #ssaTitle").html(title);					// 제목
											$("#ssaDataBoard #ssaOrigin").html(data.colct_source);		// 출처
											$("#ssaDataBoard #ssaArea").html(data.recent_updt_de);		// 자료갱신일
											
											console.log("SearchPopupMap - DataInfo data : " + JSON.stringify(data));
										}, function(err) {
											alert(err);
									});
								} else {
									$ssaJobGrowthDetailPopup.ui.SearchPopupData();
									$ssaJobGrowthDetailPopup.ui.SearchPopupChart();
									$ssaJobGrowthDetailPopup.ui.SearchPopupMap();
								}
							}else{
								$ssaJobGrowthDetailPopup.ui.SearchPopupData();
								$ssaJobGrowthDetailPopup.ui.SearchPopupChart();
								$ssaJobGrowthDetailPopup.ui.SearchPopupMap();
							}
						}
						//일자리 질
						else if(xVal2 == "ssaJobQualityDetailPopup") {
							//20181213 추가_손원웅 *분기 데이터명으로 인해, 아래 로직 순서 지켜주세요.
							if(xVal != ""){
								//2020-04-20 [곽제욱] 저임금 근로자 비율 맵 변경 START
								if($ssaJobQuality.ui.SearchParam.Link_id == "I3306" || $ssaJobQuality.ui.SearchParam.Link_id == "I3306_1" || 
										$ssaJobQuality.ui.SearchParam.Link_id == "E3303") {
								//2020-04-20 [곽제욱] 저임금 근로자 비율 맵 변경 END
									$ssaJobQualityDetailPopup.ui.selectDataBoardMap(xVal);	//지도
									
									/*if($ssaJobQuality.ui.MapType == "color"){
			                    		$ssaMap.ui.getTodayStatusMapData("", "", "", xVal);	//지도 년도 세팅
			                    	}*/
			                    	
			                    	$ssaDataBoard.ui.updateTargetAreaJobQualityChart(xVal); //차트
									$ssaDataBoard.ui.updateTargetAreaJobQualityTable(xVal); //테이블
									
									
									//근로자비율 데이터보드 정보표시를 위한 link_id 변경처리
									var lvItem = "";
									
									if($ssaJobQuality.ui.SearchParam.Link_id == "I3306_1"){
										lvItem = "I3306";
									}else{
										lvItem = $ssaJobQuality.ui.SearchParam.Link_id;
									}
									
									//데이터보드 정보표시(통계명, 출처, 자료갱신일)
									$workRoad.ui.selectJobStatsDataInfo(lvItem
										, function(data) {
											var title = data.stat_nm + " (" + $workRoad.util.dateWithSign(data.create_dt, ".") + ")";
											//var sido_nm = ($wrmTodayStatus.ui.sido_nm.length > 0) ? $wrmTodayStatus.ui.sido_nm : "전국";
											
											$("#ssaDataBoard #ssaStatPath").html(data.stat_path);
											$("#ssaDataBoard #ssaTitle").html(title);					// 제목
											$("#ssaDataBoard #ssaOrigin").html(data.colct_source);		// 출처
											$("#ssaDataBoard #ssaArea").html(data.recent_updt_de);		// 자료갱신일
											
											console.log("SearchPopupMap - DataInfo data : " + JSON.stringify(data));
										}, function(err) {
											alert(err);
									});
								} else {
									$ssaJobQualityDetailPopup.ui.SearchPopupData();
									$ssaJobQualityDetailPopup.ui.SearchPopupChart();
									$ssaJobQualityDetailPopup.ui.SearchPopupMap();
								}
							}else{
								$ssaJobQualityDetailPopup.ui.SearchPopupData();
								$ssaJobQualityDetailPopup.ui.SearchPopupChart();
								$ssaJobQualityDetailPopup.ui.SearchPopupMap();
							}
						}
						//삶의 질
						else if(xVal2 == "ssaLifeQualityDetailPopup") {
							$ssaLifeQualityDetailPopup.ui.SearchPopupData();
							$ssaLifeQualityDetailPopup.ui.SearchPopupChart();
							$ssaLifeQualityDetailPopup.ui.SearchPopupMap();
						}
						//일자리 현황
						else {
							if(dataType == "census" || dataType == "kosis") {
								//현재 선택된 맵으로 데이터보드 다시 그리기
								//$ssaDataBoard.ui.reDraw(curMapId, dataType);
								
								//20181213 추가_손원웅 *분기 데이터명으로 인해, 아래 로직 순서 지켜주세요.
								if(xVal != ""){
									$ssaDetailPopup.ui.selectDataBoardMap(xVal);	//지도
									
									if($ssaJobStatus.ui.SearchParam.Link_id == "I3116") {
										//청년실업률용 분기 카테고리
										xVal = xVal.replace(/년 /g,"0").replace(/분기/g,"");
									}
									
									if($ssaJobStatus.ui.MapType == "color"){
			                    		$ssaMap.ui.getTodayStatusMapData("", "", "", xVal);	//지도 년도 세팅
			                    	}
			                    	
			                    	$ssaDataBoard.ui.updateTargetAreaChart(xVal);	//데이터보드 차트
			                    	$ssaDataBoard.ui.updateTargetAreaTable(xVal);		//데이터보드 표
			                    	
			                    	//데이터보드 정보표시(통계명, 출처, 자료갱신일)
									$workRoad.ui.selectJobStatsDataInfo($ssaJobStatus.ui.SearchParam.Link_id
										, function(data) {
											var title = data.stat_nm + " (" + $workRoad.util.dateWithSign(data.create_dt, ".") + ")";
											
											$("#ssaDataBoard #ssaStatPath").html(data.stat_path);
											$("#ssaDataBoard #ssaTitle").html(title);					// 제목
											$("#ssaDataBoard #ssaOrigin").html(data.colct_source);		// 출처
											$("#ssaDataBoard #ssaArea").html(data.recent_updt_de);		// 자료갱신일
										}, function(err) {
											alert(err);
									});
								}else{
									$ssaDetailPopup.ui.SearchPopup();
								}
								
//							 임시 - 2018.11.14	ywKim	변경
//							} else if(dataType == "userData") {
//								//현재 선택된 맵으로 데이터보드 다시 그리기
//								$mydataDataBoard.ui.reDraw(curMapId);
//							} else if(dataType == "publicData") {
//								//현재 선택된 맵으로 데이터보드 다시 그리기
//								$publicDataBoard.ui.reDraw(curMapId);
							} else {
								//조회된 데이터가 없으면 데이터보드 삭제
								$ssaDataBoard.ui.reset(curMapId);
							}
						}
					}
					$ssaDataBoard.ui.map_id = curMapId;		//현재 선택된 맵 아이디 저장
					
					//Left Menu 통계표출 연동
//							$ssaMapFrame.ui.showNumberSetting();
			    });
				/*
				//사업체전개도 토글버튼
				$(".tb_radio .fl").click(function(){ 
					$(".tb_radio").css("background","url(/img/bg/bg_tbradio_on.png)");  
			    });
				$(".tb_radio .fr").click(function(){ 
					$(".tb_radio").css("background","url(/img/bg/bg_tbradio_off.png)");  
			    });
				
				//mng_s
				//그리드 토글버튼
				$(".grid_radio .fl").click(function(){ 
					$(".grid_radio").css("background","url(/img/bg/bg_gridradio_on.png)");
					
					$ssaMapFrame.ui.isInnerMapShow2 = false;
					
					//좌측메뉴 보이기
					$("#gridHideLeftBtn01").show();
					$("#gridHideLeftBtn02").show();
					$("#gridHideLeftBtn03").show();	
					$("#gridHideLeftBtn04").show();	
			    });
				$(".grid_radio .fr").click(function(){
					$(".grid_radio").css("background","url(/img/bg/bg_gridradio_off.png)");
					
					$ssaMapFrame.ui.isInnerMapShow2 = true;
					sop.isInnerMapShow2 = true;
					
					$ssaMap.ui.doClearMap(1); //지도 초기화
					
					//좌측메뉴 숨기기
					$("#gridHideLeftBtn01").hide();
					$("#gridHideLeftBtn02").hide();
					$("#gridHideLeftBtn03").hide();
					$("#gridHideLeftBtn04").hide();
					$("#gridHideCombineBtn").hide(); //인구주택총조사의 결합조건 탭 하이드
					$("#gridHideShowNumberBtn").hide(); //통계표출 하이드
					
					$("#helper_1").hide(); //왼쪽 통계메뉴 버튼을 클릭하여... 하이드
					$("#title_1").html("");//다른 부분에서 조회된 좌측 상단의 타이틀 초기화
					$("#manual_icon_1").hide(); //이용법 하이드
					
					//총조사 주요지표의 2depths의 메뉴 숨기기
					$("#li_mainIndex_radio02").hide();
					$("#li_mainIndex_radio03").hide();
					$("#li_mainIndex_radio04").hide();
					$("#li_mainIndex_radio05").hide();
					$("#li_mainIndex_radio06").hide();
					$("#li_mainIndex_radio08").hide();
					
					$("#li_mainIndex_radio10").hide();
					$("#li_mainIndex_radio11").hide();
					$("#li_mainIndex_radio12").hide();
					$("#li_mainIndex_radio13").hide();
					$("#li_mainIndex_radio14").hide();
					$("#li_mainIndex_radio15").hide();
					$("#li_mainIndex_radio16").hide();
					$("#li_mainIndex_radio17").hide();
					
					//인구주택총조사 인구조건의 2010년도 이하의 메뉴 숨기기 ==> 2010년 이하로 콤보박스
					//변경시 쇼/하이드가 되므로 ssaMapFrame.js에서 처리함.
					//메뉴가 이미 보인 상태에서도 동작해야 하므로 여기서도 하이드 해야함.
					$("#populationEduTab").hide();
					$("#populationMarryTab").hide();
					$("#householdOcptnTab").hide();
					
					$("#houseTypeTabSpan").hide();//주택조건의 주택유형(다중선택을 단일선택으로)
					$("#houseTypeTabGrid").show();//주택조건의 주택유형(다중선택을 단일선택으로)
					
					$("#gridCompanyThemaHide").hide();//전국사업체조사의 테마업종탭 하이드
					$("#gridCompanyKsscHide").hide();//전국사업체조사의 표준산업분류목록 버튼 하이드
					$("#companyClassListDiv").hide();//전국사업체조사의 3depth의 표준산업분류목록 하이드
					
					//데이터보드쪽 하이드
					$(".dataBoardArea").hide();
					$("#dataBoardStatsSum").hide();
					$("#viewCurrentRegionData_dt_area").hide();
					$("#viewCurrentRegionData_dd_area").hide();
					$(".btn_clockTypeSetting").hide(); //시계열 설정버튼
					//$(".btn_clockTypeSetting").show();
					$(".btn_clockTypePlay").hide(); //시계열 플레이버튼 하이드
					
					$(".btn_legendSetting").hide(); //범례 환경설정 버튼 하이드
					
					console.log("[ssaMap.js] $ssaMapFrame.ui.searchbtnCnt [" + $ssaMapFrame.ui.searchbtnCnt);
					//그리드로 넘어오기전 생성된 버튼을 제거한다. 그리드에서 서비스 하지 않는 버튼이 있기 때문에
					if($ssaMapFrame.ui.searchbtnCnt!=undefined && $ssaMapFrame.ui.searchbtnCnt>0) {
						for(i=0; i<$ssaMapFrame.ui.searchbtnCnt; i++) {
							$ssaMapFrame.ui.deleteSearchBtn(i);
						}
					}
					
					//지도레벨과 격자레벨 보여주기 여기에 하나있고, 조회전 줌didMapZoomEnd, 3000줄 정도에 하나가 더 있다. 수정시 3군데 다 해주어야한다.
					$("#grid_title_1").show();
					var grid_level = "";
					var map = $ssaMap.ui.mapList[$ssaMap.ui.curMapId];
					if(map.zoom=="0") {
						grid_level = "100km";
					} else if( map.zoom=="1" || map.zoom=="2" || map.zoom=="3" || map.zoom=="4" || map.zoom=="5") {
						grid_level = "10km";
					}  else if(map.zoom=="6" || map.zoom=="7" || map.zoom=="8") {
						grid_level = "1km";
					}  else if(map.zoom=="9" || map.zoom=="10" || map.zoom=="11" || map.zoom=="12" || map.zoom=="13") {
						grid_level = "100m";
					} 
					$("#grid_title_1").html("<span style='font-weight:bold;'>지도레벨 : " + map.zoom + "</span>(0~13), &nbsp;&nbsp;<span style='font-weight:bold;'> 격자레벨 : " + grid_level + "</span>(100km/10km/1km/100m)");
					
					$("#grid_lg_color_0").attr("style","background :rgb(137,14,79)");//pink
					$("#grid_lg_color_1").attr("style","background :rgb(255,111,0)");//amber
					$("#grid_lg_color_2").attr("style","background :rgb(27,94,32)");//green
					$("#grid_lg_color_3").attr("style","background :rgb(1,87,155)");//light blue
					$("#grid_lg_color_4").attr("style","background :rgb(26,35,126)");//indigo
					$("#grid_lg_color_5").attr("style","background :rgb(74,20,140)");//purple
					
					
			    });
				*/
				
				//============================================================================================================
				//mng_s 행정구역 그리드 20180208
				//행정구역 그리드 토글버튼
//						$(".bnd_grid_radio .fl").click(function(){ 
//							$(".bnd_grid_radio").css("background","url(/img/bg/bg_bnd_gridradio_on.png)");
//							
//							$ssaMapFrame.ui.isInnerMapShow3 = false;
//							
//							//좌측메뉴 보이기
//							$("#gridHideLeftBtn01").show();
//							$("#gridHideLeftBtn02").show();
//							$("#gridHideLeftBtn03").show();	
//							$("#gridHideLeftBtn04").show();	
//					    });
//						$(".bnd_grid_radio .fr").click(function(){
//							$(".bnd_grid_radio").css("background","url(/img/bg/bg_bnd_gridradio_off.png)");
//							
//							$ssaMapFrame.ui.isInnerMapShow3 = true;
//							sop.isInnerMapShow3 = true;
//							
//							$ssaMap.ui.doClearMap(1); //지도 초기화
//							
//							//좌측메뉴 숨기기
//							$("#gridHideLeftBtn01").hide();
//							$("#gridHideLeftBtn02").hide();
//							$("#gridHideLeftBtn03").hide();
//							$("#gridHideLeftBtn04").hide();
//							$("#gridHideCombineBtn").hide(); //인구주택총조사의 결합조건 탭 하이드
//							$("#gridHideShowNumberBtn").hide(); //통계표출 하이드
//							
//							$("#helper_1").hide(); //왼쪽 통계메뉴 버튼을 클릭하여... 하이드
//							$("#title_1").html("");//다른 부분에서 조회된 좌측 상단의 타이틀 초기화
//							$("#manual_icon_1").hide(); //이용법 하이드
//							
//							//총조사 주요지표의 2depths의 메뉴 숨기기
//							$("#li_mainIndex_radio02").hide();
//							$("#li_mainIndex_radio03").hide();
//							$("#li_mainIndex_radio04").hide();
//							$("#li_mainIndex_radio05").hide();
//							$("#li_mainIndex_radio06").hide();
//							$("#li_mainIndex_radio08").hide();
//							
//							$("#li_mainIndex_radio10").hide();
//							$("#li_mainIndex_radio11").hide();
//							$("#li_mainIndex_radio12").hide();
//							$("#li_mainIndex_radio13").hide();
//							$("#li_mainIndex_radio14").hide();
//							$("#li_mainIndex_radio15").hide();
//							$("#li_mainIndex_radio16").hide();
//							$("#li_mainIndex_radio17").hide();
//							
//							//인구주택총조사 인구조건의 2010년도 이하의 메뉴 숨기기 ==> 2010년 이하로 콤보박스
//							//변경시 쇼/하이드가 되므로 ssaMapFrame.js에서 처리함.
//							//메뉴가 이미 보인 상태에서도 동작해야 하므로 여기서도 하이드 해야함.
//							$("#populationEduTab").hide();
//							$("#populationMarryTab").hide();
//							$("#householdOcptnTab").hide();
//							
//							$("#houseTypeTabSpan").hide();//주택조건의 주택유형(다중선택을 단일선택으로)
//							$("#houseTypeTabGrid").show();//주택조건의 주택유형(다중선택을 단일선택으로)
//							
//							$("#gridCompanyThemaHide").hide();//전국사업체조사의 테마업종탭 하이드
//							$("#gridCompanyKsscHide").hide();//전국사업체조사의 표준산업분류목록 버튼 하이드
//							$("#companyClassListDiv").hide();//전국사업체조사의 3depth의 표준산업분류목록 하이드
//							
//							//데이터보드쪽 하이드
//							$(".dataBoardArea").hide();
//							$("#dataBoardStatsSum").hide();
//							
//							$("#viewCurrentRegionData_dt_area").show();
//							
//							$("#viewCurrentRegionData_dd_area").show();
//							
//							$(".btn_excelDownload").hide(); //엑셀다운로드 하이드
//							
//							$(".btn_clockTypeSetting").hide(); //시계열 설정버튼
//							$(".btn_clockTypePlay").hide(); //시계열 플레이버튼 하이드
//							
//							$(".btn_legendSetting").hide(); //범례 환경설정 버튼 하이드
//							
//							console.log("[ssaMap.js] bnd_grid 행정구역 그리드 $ssaMapFrame.ui.searchbtnCnt [" + $ssaMapFrame.ui.searchbtnCnt);
//							//그리드로 넘어오기전 생성된 버튼을 제거한다. 그리드에서 서비스 하지 않는 버튼이 있기 때문에
//							if($ssaMapFrame.ui.searchbtnCnt!=undefined && $ssaMapFrame.ui.searchbtnCnt>0) {
//								for(i=0; i<$ssaMapFrame.ui.searchbtnCnt; i++) {
//									$ssaMapFrame.ui.deleteSearchBtn(i);
//								}
//							}
//							
//							//지도레벨과 격자레벨 보여주기 여기에 하나있고, 조회전 줌didMapZoomEnd, 3000줄 정도에 하나가 더 있다. 수정시 3군데 다 해주어야한다.
//							$("#grid_title_1").show();
//							var grid_level = "";
//							var map = $ssaMap.ui.mapList[$ssaMap.ui.curMapId];
//							
//							// 행정구역 그리드의 경우 이 부분은 나중에 수정해주어야 함. 아직 수정 않함. 20180208
//							if(map.zoom=="0") {
//								grid_level = "100km";
//							} else if( map.zoom=="1" || map.zoom=="2" || map.zoom=="3" || map.zoom=="4" || map.zoom=="5") {
//								grid_level = "10km";
//							}  else if(map.zoom=="6" || map.zoom=="7" || map.zoom=="8") {
//								grid_level = "1km";
//							}  else if(map.zoom=="9" || map.zoom=="10" || map.zoom=="11" || map.zoom=="12" || map.zoom=="13") {
//								grid_level = "100m";
//							} 
//							$("#grid_title_1").html("<span style='font-weight:bold;'>지도레벨 : " + map.zoom + "</span>(0~13), &nbsp;&nbsp;<span style='font-weight:bold;'> 격자레벨 : " + grid_level + "</span>(100km/10km/1km/100m)");
//							
//							$("#grid_lg_color_0").attr("style","background :rgb(137,14,79)");//pink
//							$("#grid_lg_color_1").attr("style","background :rgb(255,111,0)");//amber
//							$("#grid_lg_color_2").attr("style","background :rgb(27,94,32)");//green
//							$("#grid_lg_color_3").attr("style","background :rgb(1,87,155)");//light blue
//							$("#grid_lg_color_4").attr("style","background :rgb(26,35,126)");//indigo
//							$("#grid_lg_color_5").attr("style","background :rgb(74,20,140)");//purple
//							
//							
//					    });	
				//mng_e 행정구역 그리드 20180208
				
				
				
				//투명도 설정 바
				$("#dataSlider_item").slider({
			    	range: "min",
			        min: 0.2,
			        max: 1,
			        value: 1,
			        step : 0.2,
			        slide: function( event, ui ) {  //ui.value
						$workRoad.ui.addFnc04List("$ssaMap.event.setUIEvent[4]");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
			        	$(".sqListBox.sq03").css("background-color", "rgba(255,255,255,"+ui.value+")");
				    }
			    });
			},
		};
		
	}(window, document));