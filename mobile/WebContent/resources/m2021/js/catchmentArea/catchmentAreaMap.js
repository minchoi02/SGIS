/**
 * 생활권역서비스 화면에 대한 클래스
 * 
 * history : 2021/08/25 초기 작성
 * 
 */
(function (W, D) {
	W.$catchmentAreaMap = W.$catchmentAreaMap || {};
	$(document).ready(
		function() {
			if(get_cookie("lc_info_agree_yn") == 'Y'){
				$(".location__agree").hide();
			}
			$catchmentAreaMap.event.setUIEvent();	
			$catchmentAreaMap.event.setSize();	
		}
		
	);
	/*$(window).on("beforeunload", function() {
		return 'Dialog text here2.';
	});*/
	
	$(window).on("resize", function() {
		// 화면 가로모드 세로모드 각각 다른 function 필요시 사용
		/*if(window.matchMedia('(orientation: portrait)').matches){
			console.log('세로');
		}else {
			console.log('가로');
		}*/
		$catchmentAreaMap.event.setSize();	
		//var height = $(".mapArea").css('height');
		//$("#map").height(height);
	});
	//2022-10-13 [송은미] 관심지역변경 팝업 수정 및 추가
    $(document).ready(function(){
    	// 읍면동 초기화
    	$(".valueEmd").click(function(){
    		$("#emdong button").removeClass("selected");
    		$(".valueEmd").html("읍면동");
    		
    		$(".sidoContainer").css("display","none");
    		$(".sggContainer").css("display","none");
    		$(".emdongContainer").css("display","block");
    		
    	})
    	$(".valueSgg").click(function(){
    		$("#sgg button").removeClass("selected");
    		$(".valueSgg").html("시군구");
    		$("#emdong button").removeClass("selected");
    		$(".valueEmd").html("읍면동");
    		
    		$(".sidoContainer").css("display","none");
    		$(".sggContainer").css("display","block");
    		$(".emdongContainer").css("display","none");
    		
    	})
    	$(".valueSido").click(function(){
    		$("#sido button").removeClass("selected");
    		$(".valueSido").html("시도");
    		$("#sgg button").removeClass("selected");
    		$(".valueSgg").html("시군구");
    		$("#emdong button").removeClass("selected");
    		$(".valueEmd").html("읍면동");
    		
    		$(".sidoContainer").css("display","block");
    		$(".sggContainer").css("display","none");
    		$(".emdongContainer").css("display","none");
    		
    	})
    });
	
	$catchmentAreaMap = {

	};
	
	$catchmentAreaMap.ui = {
			
			map : null, // 지도
			map_report : null,
			// 내 현재위치
			my_location_yn : "N", // 지도 조회후 내 위치로 오게하기
			my_x : null, // x
			my_y : null, // y
			my_sido_cd : null, // 시도코드
			my_sido_nm : null, // 시도명
			my_sgg_cd : null, // 시군구코드
			my_sgg_nm : null, // 시군구명
			my_emdong_cd : null, // 읍면동코드
			my_emdong_nm : null, // 읍면동명
			searchAdmCd : null,
			location_agree : false,
			mapList : [],
			subNavigation : {
				menu : null// 메뉴의 네비게이션
			},
			curMapId : 0,
			// 위치 저장
			default_sido_cd : "25", // 시도코드
			default_sido_nm : "대전광역시", // 시도명
			default_sido_x : 990493.5945803534, // 시도 x
			default_sido_y : 1815828.82237, // 시도 y
			default_sgg_cd : "030", // 시군구코드
			default_sgg_nm : "서구", // 시군구명
			default_sgg_x : 986097.311596368, // 시군구 x
			default_sgg_y : 1809240.84784, // 시군구 y
			default_emdong_cd : "60", // 읍면동코드
			default_emdong_nm : "둔산2동", // 읍면동명
			default_emdong_x : 989749.2142006928, // 읍면동 x
			default_emdong_y : 1817802.41717, // 읍면동 y
			default_x : 989674, // x
			default_y : 1818313, // y
			saShpColor : ["#EF595C", "#8481E8", "#60BC4C", "#FFAA01"],		// ["#0070C0",
																			// "#D887E8",
																			// "#70AD47",
																			// "#FFAA01"]
																			// //FFC6D7,
																			// FFC6D7,
																			// D6FFC6,
																			// E7CF70
			// 데이터
			mapData : null,
			mapStatsData : {}, // 통계정보 저장
			mapRegionData : {}, // 지역경계 저장
			mapRegion : "", // 지역경계 sido, sgg, emdong, totreg
			mapType : "", // 지도유형 color, bubble, heat, poi, grid
			
			// 시, 군,구 데이터
			areaSidoData : {}, // 시도 목록 저장
			areaSggData : {}, // 시군구 목록 저장
			areaEmdongData : {}, // 읍면동 목록 저장
			
			
			MarKer_name : "",
			MarKer_roadAdres : "",
			// 선택된 마커 데이터
			useMarker : false, 
			selectSidoCd : "",
			selectSggCd : "",
			selectemdCd : "",	
			selectCoordinate_x : "",
			selectCoordinate_x : "",
			isUsingOA : true,
			classDeg : 10,	// 산업분류 "10" 차
			isReportShow : false,
			isReportType : "",
			reportRangeText : "",
			reportSelectRange : 0, // 보고서 출력시 선택한 범위 갯수
			reportSelectIndex : [],
			statsBaseYear01 : ["2020","2019", "2018", "2017", "2016", "2015"],	// 인구,가구,주택에
																				// 대한
																				// 통계년도
																				// ["2019",
																				// "2018",
																				// "2017",
																				// "2016",
																				// "2015"]
			statsBaseYear02 : ["2019","2018", "2017", "2016"],	// 사업체,종사자에 대한
																// 통계년도
			map1PoiMarkerMap : {},
			maxAreaUsing100mGrid : 30000000,
			grid_selected_layer : null,
			legendIdx : 0,
			createMap : function(id) {
				var sgisSearchParams = {};
				this.map = new sMap.map();

				this.subNavigation.menu = new mapNavigation.UI(this.map);
				this.subNavigation.menu.navigatorId = "catchmentArea_";
				this.subNavigation.menu.initialize();
				var height = $(".mapArea").css('height');
				//$("#map").height(height);
				this.map.isZoomStart = false;
				this.map.isCurrentLocationMarker = false;
				this.map.isDrawBoundary = false;
				this.map.center = [989674, 1818313];
				this.map.zoom = 8;
				this.map.isZoomControl = false;
				this.map.target = "map";
				this.map.mapControlButton = null;
				this.map.markers = null;
				
				var sgisSearchParams = {};
				var btnInfo = new catchmentAreaBtnInfo.btnInfo(this.map, $catchmentAreaMap.ui);
				this.map.mapBtnInfo = btnInfo;
				btnInfo.createUI({
					catchmentArea : true
				});	
				
				if(getParameter("type")&&getParameter("params")&&getParameter("title")){
					sgisSearch = true;
					$.each(decodeURIComponent(getParameter("params")).split("&"),function(cnt,node){
						var splitText = node.split("=")
						sgisSearchParams[splitText[0]] = splitText[1];
					});
					if(getParameter("x")&&getParameter("y")){
						this.map.center = [getParameter("x"),getParameter("y")];
					}
					if(getParameter("adm_cd")){
						this.map.zoom = this.map.getZoomToCd(getParameter("adm_cd"));
					}
					if(sgisSearchParams.year){
						this.map.bnd_year = sgisSearchParams.year;
					}
				}
				
				// 범례 호출 함수
				var legend = new cLegendInfo.catchmentAreaLegendInfo(this.map);			
				legend.initialize($catchmentAreaMap.ui);
				this.map.legend = legend;
				// legend.createLegend();
				legend.legendType = "auto";				
				// 작업부분 끝
				
				this.map.createMap($catchmentAreaMap, id, {
					isLegendControl : false // 범례 컨트롤 생성
					,isCurrentLocationMarker:true // 지도에 현재위치 표시 안함
					,isMapNavigator : true,
					navigatorOption : {
						id : "catchmentArea_"
					}
				});
				
				this.map.addControlEvent("movestart");
				this.map.addControlEvent("moveend");
				this.map.addControlEvent("zoomstart");
				this.map.addControlEvent("zoomend");
				this.map.addControlEvent("click");
				this.map.moveCurrentLocation(true);
				this.mapList[0] = this.map;
				this.map.markers = new sop.LayerGroup();
				this.map.gMap.addLayer(this.map.markers); 
				this.map.markers2 = new sop.LayerGroup();
				this.map.gMap.addLayer(this.map.markers2);
				
				
				this.map.multiLayerControl ={
					multiData : null,
					dataGeojson : null,
					clear : function () {
						if (this.dataGeojson != null) {
							for (var i=0; i<this.dataGeojson.length; i++) {
								this.dataGeojson[i].remove();
							}
						}
					}
				};
				
				this.map.chkIfInteractive = function() {
					var rstVal = false;
					if (this.delegate && this.delegate.ui && this.delegate.ui.chkIfInteractive != undefined) {
						if(arguments.length == 2){
							rstVal = this.delegate.ui.chkIfInteractive(arguments[0], arguments[1]);
						}else{
							rstVal = this.delegate.ui.chkIfInteractive();
						}
					}
					return rstVal;
				};
				
				this.map.clearLayer = function() {
					if (this.dataGeojson) {
						// 2016.09.01 9월 서비스
						this.clearToolTip();
						this.dataGeojson.remove();
						this.removeCaption();
					}
					
					if (this.geojson) {
						this.geojson.remove();
					}
				};
				
				this.map.clearToolTip = function() {
					if (this.dataGeojson != null) {
						this.dataGeojson.eachLayer(function(tmplayer) {
							var e = {
									target : tmplayer
									// , utmk :
									// sop.utmk([tmplayer.feature.properties.x,
									// tmplayer.feature.properties.y])
							};
							// this.map.setPolyLayerMouseout(e);
							tmplayer.unbindToolTip();
						});
					}
				};
				
				this.map.clearDataOverlay = function () {
					if (this.dataGeojson) {
						this.dataGeojson.remove();
						this.removeCaption();
					}
					
					if (this.geojsonData) {
						this.geojsonData.remove();
						this.removeCaption();
					}

					if (this.tradeGeojson) {
						this.tradeGeojson.remove();
					}
					
					this.bnd_year = bndYear;
					this.data = [];
					this.combineData = [];
					this.dataGeojson = null;
					this.curDropPolygonCode = null;
					this.valPerSlice = [];
					this.legendValue = [];
					this.lastGeojsonInfo = null;
					this.isNoReverseGeocode = false;
					this.isTradeMapShow = false;
					this.lastDrawList = [];
					this.legendValue.user = [];
					if (this.drawControl) {
						this.drawControl.removeOverlay();
					}
					this.selectedBoundMode = null;
					this.selectedBoundList = [];
					this.dataGeojsonLayer = null;
					this.curAdmCd = null;
					this.dataForCombine = null;
					this.multiLayerControl.clear();
					this.legend.removeDataOverlay();
					this.legend.data = [];
					
					if (this.heatMap) {
						this.heatMap.setUTMKs([]);
					}
					
					this.gMap.eachLayer(function(layer) {
						if (layer._layer) {
							_layer.remove();
						}
					});
				};
				
				this.map.gMap.whenReady(function(){
					
				});		
			},
			createMap_report : function(id) {
				var sgisSearchParams = {};
				this.map_report = new sMap.map();

				var height = $(".mapArea").css('height');
				$("#map_report").height(height);
				this.map_report.isZoomStart = false;
				this.map_report.isCurrentLocationMarker = false;
				this.map_report.isDrawBoundary = false;
				this.map_report.zoom = 8;
				this.map_report.isZoomControl = false;
				this.map_report.target = "map_report";
				this.map_report.mapControlButton = null;
				// 마커
				this.map_report.markers = null;
				
				var sgisSearchParams = {};
				
				if(getParameter("type")&&getParameter("params")&&getParameter("title")){
					sgisSearch = true;
					$.each(decodeURIComponent(getParameter("params")).split("&"),function(cnt,node){
						var splitText = node.split("=")
						sgisSearchParams[splitText[0]] = splitText[1];
					});
					if(getParameter("x")&&getParameter("y")){
						this.map_report.center = [getParameter("x"),getParameter("y")];
					}
					if(getParameter("adm_cd")){
						this.map_report.zoom = this.map.getZoomToCd(getParameter("adm_cd"));
					}
					if(sgisSearchParams.year){
						this.map_report.bnd_year = sgisSearchParams.year;
					}
				}
				
				// 범례 호출 함수
				var legend = new cLegendInfo.catchmentAreaLegendInfo(this.map_report);			
				legend.initialize($catchmentAreaMap.ui);
				this.map_report.legend = legend;
				legend.legendType = "auto";				
				// 작업부분 끝
				
				this.map_report.createMap($catchmentAreaMap, id, {
					isLegendControl : false // 범례 컨트롤 생성
					,isCurrentLocationMarker:true // 지도에 현재위치 표시 안함
					,isMapNavigator : true,
					navigatorOption : {
						id : "catchmentArea_"
					}
				});
				
				this.map_report.addControlEvent("movestart");
				this.map_report.addControlEvent("moveend");
				this.map_report.addControlEvent("zoomstart");
				this.map_report.addControlEvent("zoomend");
				this.map_report.addControlEvent("click");
				this.map_report.moveCurrentLocation(false);
				this.mapList[1] = this.map_report;
				this.map_report.markers = new sop.LayerGroup();
				this.map_report.gMap.addLayer(this.map_report.markers); 
				this.map_report.multiLayerControl ={
					multiData : null,
					dataGeojson : null,
					clear : function () {
						if (this.dataGeojson != null) {
							for (var i=0; i<this.dataGeojson.length; i++) {
								this.dataGeojson[i].remove();
							}
						}
					}
				};
				
				this.map_report.chkIfInteractive = function() {
					var rstVal = false;
					if (this.delegate && this.delegate.ui && this.delegate.ui.chkIfInteractive != undefined) {
						if(arguments.length == 2){
							rstVal = this.delegate.ui.chkIfInteractive(arguments[0], arguments[1]);
						}else{
							rstVal = this.delegate.ui.chkIfInteractive();
						}
					}
					return rstVal;
				};
				
				this.map_report.clearLayer = function() {
					if (this.dataGeojson) {
						this.clearToolTip();
						this.dataGeojson.remove();
						this.removeCaption();
					}
					
					if (this.geojson) {
						this.geojson.remove();
					}
				};
				
				this.map_report.clearToolTip = function() {
					if (this.dataGeojson != null) {
						this.dataGeojson.eachLayer(function(tmplayer) {
							var e = {
									target : tmplayer
									// , utmk :
									// sop.utmk([tmplayer.feature.properties.x,
									// tmplayer.feature.properties.y])
							};
							// this.map.setPolyLayerMouseout(e);
							tmplayer.unbindToolTip();
						});
					}
				};
				
				this.map_report.clearDataOverlay = function () {
					if (this.dataGeojson) {
						// this.clearToolTip();
						this.dataGeojson.remove();
						this.removeCaption();
					}
					
					if (this.geojsonData) {
						// this.clearToolTip();
						this.geojsonData.remove();
						this.removeCaption();
					}

					if (this.tradeGeojson) {
						this.tradeGeojson.remove();
					}
					
					this.bnd_year = bndYear;
					this.data = [];
					this.combineData = [];
					this.dataGeojson = null;
					this.curDropPolygonCode = null;
					this.valPerSlice = [];
					this.legendValue = [];
					this.lastGeojsonInfo = null;
					this.isNoReverseGeocode = false;
					this.isTradeMapShow = false;
					this.lastDrawList = [];
					this.legendValue.user = [];
					if (this.drawControl) {
						this.drawControl.removeOverlay();
					}
					this.selectedBoundMode = null;
					this.selectedBoundList = [];
					this.dataGeojsonLayer = null;
					this.curAdmCd = null;
					this.dataForCombine = null;
					this.multiLayerControl.clear();
					this.legend.removeDataOverlay();
					this.legend.data = []; // 9월 서비스
					
					if (this.heatMap) {
						this.heatMap.setUTMKs([]);
					}
					
					this.gMap.eachLayer(function(layer) {
						if (layer._layer) {
							_layer.remove();
						}
					});
				};
				
				this.map_report.gMap.whenReady(function(){
					
				});		
			},
				
			getMap : function(seq) {
				var map;
				if(seq != undefined && seq != null){
					map = this.mapList[seq];
				}else{
					map = this.mapList[0];
				}
				
				return map;
			},
			
			// 초기 시도값 설정
			setSido : function(p_sido_cd) {
				$.ajax({
				    url: openApiPath + "/OpenAPI3/addr/stageWR.json?",
				    type: 'get', // api는 get으로 받아야함
				    dataType : 'json',
				    async: false,
				    data: {
				    	accessToken:accessToken,
				    	pg_yn: "0",
				    	bnd_year: bndYear
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						var lvResultList = res.result;
						for(var i = 0; i < lvResultList.length; i++) {
							if(lvResultList[i].cd == p_sido_cd) {
								if(lvResultList[i].addr_name == '대전광역시'){
									//2022-10-13 [송은미] 관심지역변경 팝업 수정 및 추가
									//$("#sido").append("<button type = 'button' class = 'option__btn sido_btn selected' value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\"   >"+lvResultList[i].addr_name+"</button>");
									$("#sido").append("<button type = 'button' style='min-width: auto; width:33.3%; float:left; margin:0; box-sizing:border-box; height:40px; color:##4f4f4f; border-radius: 0; border: 1px solid #e5e5e5; margin:-1px 0 0 -1px; " +
											"font-size: 12px;' class = 'option__btn sido_btn selected' value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\"   >"+lvResultList[i].addr_name+"</button>");
								}else{
									//$("#sido").append("<button type = 'button' class = 'option__btn sido_btn' value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\"   >"+lvResultList[i].addr_name+"</button>");
									$("#sido").append("<button type = 'button' style='min-width: auto; width:33.3%; float:left; margin:0; box-sizing:border-box; height:40px; color:##4f4f4f; border-radius: 0; border: 1px solid #e5e5e5; margin:-1px 0 0 -1px; " +
											"font-size: 12px;' class = 'option__btn sido_btn' value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\"   >"+lvResultList[i].addr_name+"</button>");
								}
							}
							else {
								if(lvResultList[i].addr_name == '대전광역시'){
									//$("#sido").append("<button type = 'button' class = 'option__btn sido_btn selected' value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\"   >"+lvResultList[i].addr_name+"</button>");
									$("#sido").append("<button type = 'button' style='min-width: auto; width:33.3%; float:left; margin:0; box-sizing:border-box; height:40px; color:##4f4f4f; border-radius: 0; border: 1px solid #e5e5e5; margin:-1px 0 0 -1px; " +
											"font-size: 12px;' class = 'option__btn sido_btn selected' value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\"   >"+lvResultList[i].addr_name+"</button>");
								}else{
									//$("#sido").append("<button type = 'button' class = 'option__btn sido_btn' value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\"   >"+lvResultList[i].addr_name+"</button>");
									$("#sido").append("<button type = 'button' style='min-width: auto; width:33.3%; float:left; margin:0; box-sizing:border-box; height:40px; color:##4f4f4f; border-radius: 0; border: 1px solid #e5e5e5; margin:-1px 0 0 -1px; " +
											"font-size: 12px;' class = 'option__btn sido_btn' value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\"   >"+lvResultList[i].addr_name+"</button>");
								}
							}
						}
					}else if(res.errCd == "-401") {
						/** accessToken 만료시 재갱신 후 재 조회 START */
						accessTokenInfo(function(){
							console.log('[catchmentAreaMap.js]시군구 재조회');
							$catchmentAreaMap.ui.setSido();
							$(".option__btn.sido_btn.selected").trigger("click");
							$(".option__btn.sgg_btn.selected").trigger("click");
						});
						/** accessToken 만료시 재갱신 후 재 조회 END */
					}else{
					}
				}).fail(function (res) { // 실패
					$catchmentAreaMap.ui.setSido();
					$(".option__btn.sido_btn.selected").trigger("click");
					$(".option__btn.sgg_btn.selected").trigger("click");
					accessTokenInfo(function(){
					});
				}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				});
				// ajax 끝
			},
			
			getSido : function(p_sido_cd){
				// 기본값(전체)
				// 기존에 저장된 정보 있음
				// ajax 시작
					$.ajax({
						url: "/ServiceAPI/map/sidoAddressList.json",
					    type: 'post',
					    dataType : 'json',
					    async: false,
					    data: {
					    	base_year:bndYear
					    }
					}).done(function (res) { // 완료
						if(res.errCd == "0") {
							var lvResultList = res.result.sidoList;
							for(var i = 0; i < lvResultList.length; i++) {
								if(lvResultList[i].sido_cd == p_sido_cd) {
									$catchmentAreaMap.ui.default_sido_cd = lvResultList[i].sido_cd;
									$catchmentAreaMap.ui.default_sido_nm = lvResultList[i].sido_nm;
								}
							}
						}else if(res.errCd == "-401") {
							// common_alert(res.errMsg);
						}else{
							// common_alert(res.errMsg);
						}
					}).fail(function (res) { // 실패
						// common_alert(errorMessage);
					}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
						common_loading(false); // 로딩바 숨김
					});
					// ajax 끝
			},
			getSgg : function(p_sido_cd, p_sgg_cd){
					// ajax 시작
					$.ajax({
						url: "/ServiceAPI/map/sggAddressList.json",
					    type: 'post',
					    dataType : 'json',
					    async: false,
					    data: {
					    	base_year : bndYear,
					    	sido_cd : p_sido_cd
					    }
					}).done(function (res) { // 완료
						if(res.errCd == "0") {		
							// 시군구 목록 추가
							var lvResultList = res.result.sggList;
							for(var i = 0; i < lvResultList.length; i++) {
								if(lvResultList[i].sgg_cd == p_sgg_cd) {
									$catchmentAreaMap.ui.default_sgg_cd = lvResultList[i].sgg_cd;
									$catchmentAreaMap.ui.default_sgg_nm = lvResultList[i].sgg_nm ;
								} 
							}
						}else if(res.errCd == "-401") {
							// common_alert(res.errMsg);
						}else{
							// common_alert(res.errMsg);
						}
					}).fail(function (res) { // 실패
						// common_alert(errorMessage);
					}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
						common_loading(false); // 로딩바 숨김
					});
					// ajax 끝
				
			
				
			},
			getEmdong : function(p_sido_cd, p_sgg_cd, p_emdong_cd){
					// ajax 시작
					$.ajax({
						url: "/ServiceAPI/map/admAddressList.json",
					    type: 'post',
					    dataType : 'json',
					    async: false,
					    data: {
					    	base_year : bndYear,
					    	sido_cd : p_sido_cd,
					    	sgg_cd : p_sgg_cd
					    }
					}).done(function (res) { // 완료
						if(res.errCd == "0") {
							// 읍면동 목록 추가
							var lvResultList = res.result.admList;
							for(var i = 0; i < lvResultList.length; i++) {
								if(lvResultList[i].emdong_cd == p_emdong_cd) {
									$catchmentAreaMap.ui.default_emdong_cd = lvResultList[i].emdong_cd;
									$catchmentAreaMap.ui.default_emdong_nm = lvResultList[i].emdong_nm;	
								}
							}
						}else if(res.errCd == "-401") {
							// common_alert(res.errMsg);
						}else{
							// common_alert(res.errMsg);
						}
					}).fail(function (res) { // 실패
						// common_alert(errorMessage);
					}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
						common_loading(false); // 로딩바 숨김
					});
					// ajax 끝
				
			},
			
			/**
			 * @name : getCurrentLocation
			 * @description : 현재위치 좌표 얻기
			 * @date : 2019.08.22
			 * @author : 김남민
			 * @history :
			 * @param :
			 *            callback : callback 함수
			 */
			getCurrentLocation : function(callback){

				var center = [989674, 1818313];
				if(common_get_cookie("lc_info_agree_yn") == "Y"){
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(function(position) {
							var utmkXY = new sop.LatLng(position.coords.latitude, position.coords.longitude);
							center = [utmkXY.x, utmkXY.y];
							if(typeof callback === "function"){
								callback(center,true);
							}
						}, function(error) {
							var message;
							if (error.code === 1) {
								message = "현재위치를 동의하지 않았습니다";
							} else if (error.code === 2) {
								message = "GPS를 확인할 수 없습니다";
							} else {
								message = "현재 위치를 찾는데 실패하였습니다";
							}
							console.warn(message);
							if(typeof callback === "function"){
								callback(center,false,error.code,message);
							}
						}, {
							timeout: 5000
						});
					}else{
						if(typeof callback === "function"){
							callback(center,false,"현재 위치를 찾는데 실패하였습니다");
						}
					}
					
				}else {
					if(typeof callback === "function"){
						//callback(center,false,"현재 위치를 찾는데 실패하였습니다");
						callback(center,true);
					}
					
				}
				
				return center;
			},
			
		    /**
			 * @name : getMyPositionCallback
			 * @description : 내 위치 조회 후 콜백
			 * @date : 2019.08.22
			 * @author : 김남민
			 * @history :
			 * @param :
			 */
			getMyPositionCallback : function() {
				// 현재위치 반영
				
				// 위치 저장
				$catchmentAreaMap.ui.default_sido_cd = $catchmentAreaMap.ui.my_sido_cd;
				$catchmentAreaMap.ui.default_sido_nm = $catchmentAreaMap.ui.my_sido_nm;
				$catchmentAreaMap.ui.default_sgg_cd = $catchmentAreaMap.ui.my_sgg_cd;
				$catchmentAreaMap.ui.default_sgg_nm = $catchmentAreaMap.ui.my_sgg_nm;
				$catchmentAreaMap.ui.default_emdong_cd = $catchmentAreaMap.ui.my_emdong_cd;
				$catchmentAreaMap.ui.default_emdong_nm = $catchmentAreaMap.ui.my_emdong_nm;
				$catchmentAreaMap.ui.default_x = $catchmentAreaMap.ui.my_x;
				$catchmentAreaMap.ui.default_y = $catchmentAreaMap.ui.my_y;
				
				$catchmentAreaMap.ui.setPositionText();
			},
			
			getCodeData : function(pParam) {
				var params = $catchmentAreaMenu.ui.reqSetParams2("API_202093", pParam);
				$catchmentAreaMap.ui.requestOpenApi(params);
			},
			/**
			 * @name : setPositionText
			 * @description : 위치 텍스트 변경
			 * @date : 2019.08.22
			 * @author : 김남민
			 * @history :
			 * @param :
			 */
			setPositionText : function() {
				// 변수 선언
				var lv_adm_nm = "전국";
				var lv_adm_cd = "99"
					
				var lv_sido_cd = $catchmentAreaMap.ui.default_sido_cd;
				var lv_sido_nm = $catchmentAreaMap.ui.default_sido_nm;
				var lv_sgg_cd = $catchmentAreaMap.ui.default_sgg_cd;
				var lv_sgg_nm = $catchmentAreaMap.ui.default_sgg_nm;
				var lv_emdong_cd = $catchmentAreaMap.ui.default_emdong_cd;
				var lv_emdong_nm = $catchmentAreaMap.ui.default_emdong_nm;
				// 데이터 정리
				lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm + " " + lv_emdong_nm;
				lv_adm_cd = lv_sido_cd + lv_sgg_cd + lv_emdong_cd;
				if(lv_sido_cd == "99") {
					lv_adm_nm = lv_sido_nm; 
					lv_adm_cd = lv_sido_cd;
				}
				else if(lv_sgg_cd == "999"){
					lv_adm_nm = lv_sido_nm;
					lv_adm_cd = lv_sgg_cd;
				}
				else if(lv_emdong_cd == "99"){
					lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm;
					lv_adm_cd = lv_sido_cd + lv_sgg_cd;
				}

//				$("#currentMapMyLocation_name").text(lv_adm_nm);
				$("#currentMapMyLocation_name").attr('value',lv_adm_cd);
				
				//2022-10-13 [송은미] svg 추가
				const message = lv_adm_nm;
				const arr = message.split(" ");
				console.log(arr[0]);
				var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>'; // 2022.09.26 송은미 svg 추가
				$("#currentMapMyLocation_name").html(arr[0]+svg+arr[1]+svg+arr[2]);
			},
			
			/**
			 * 
			 * @name : requestOpenApi
			 * @description : 통계정보를 요청한다.
			 * 
			 */
			requestOpenApi : function(options, complexOption) {
				
				console.log("[catchmentAreaMain.js] requestOpenApi() 호출");

				var api_id = typeof options === 'string' ? options : options.api_id;
				
				console.log("[catchmentAreaMain.js] requestOpenApi() api_id [" + api_id);
				
				if 	    (api_id == "API_202001") $catchmentAreaMainApi.request.openApiTestStats(options);
				else if (api_id == "API_202013") $catchmentAreaMainApi.request.reportSrvAreaStats(options);
				else if (api_id == "API_202014") $catchmentAreaMainApi.request.reportGridAreaStats(options);
				else if (api_id == "API_202093") $catchmentAreaMainApi.request.getCodeList(options);
				else if (api_id == "API_202094") $catchmentAreaMainApi.request.getCharacteristicsStats(options);
				else if (api_id == "API_202095") $catchmentAreaMainApi.request.getCorrelationAnalysis(complexOption);
				else if (api_id == "API_202098") $catchmentAreaMainApi.request.getCharacteristicsStatsTot(options);
				
				// pageCallReg(); // 페이지 호출통계
			},
			
			/**
			 * @name : getCenterToAdmCd
			 * @description : 지도의 중심점으로 집계구값 얻기
			 * @date : 2019.08.22
			 * @author : 김남민
			 * @history :
			 * @param center :
			 *            중심
			 * @param callback :
			 *            callback
			 */
			getCenterToAdmCd : function(center,callback) {
				var obj = new sop.openApi.personal.findcodeinsmallarea.api();
				var x,y;
				if(Object.prototype.toString.call(center)==="[object Array]"&&center.length==2){
					x = center[0];
					y = center[1];
				}else{
					center = $catchmentAreaMap.ui.map.gMap.getCenter();
					x = center.x;
					y = center.y;
				}
				obj.addParam("accessToken", accessToken);
				obj.addParam("x_coor", x);
				obj.addParam("y_coor", y);
				obj.request({
					method : "GET",
					async : true, // false : 로딩표시, true : 로딩숨김
					url : openApiPath+"/OpenAPI3/personal/findcodeinsmallarea.json",
					options : {
						callback : callback,
						center : center,
						target : $catchmentAreaMap.ui
					}
				});
			},
			/**
			 * 
			 * @name : searchFacilitiesList
			 * @description : 검색 리버스지오코딩 API
			 * 
			 */
			searchFacilitiesList : function(select_x, select_y, targetPOI, roadAdres, jibunAdres){
				var	point = 'POINT('
					point += select_x + " " + select_y;
					point += ')';

				// 변수 및 할당 추가 (시작) - 박상언 2020-10-15 작성
				var mapId = 0;
				var poiSelectBtnDomId = ""; 
				var sel_addr1_id = "";
				var sel_addr2_id = "";
				if(mapId === 0) {
					poiSelectBtnDomId = "poiSelectButten";
					sel_addr1_id = "sel_addr1";
					sel_addr2_id = "sel_addr2";
					
					if(roadAdres !== null && roadAdres !== undefined && roadAdres != '검색된 시설이 없습니다.'){
						$catchmentAreaObj.tobeSelected_locRdAdres = roadAdres;
					}
				}
				// 변수 및 할당 추가 (끝) - 박상언 2020-10-15 작성
				
				var sopPortalgetPtFcltsObj = new sop.portal.sopPortalgetPtFcltsList.api();
				sopPortalgetPtFcltsObj.addParam("point", point);
				sopPortalgetPtFcltsObj.request({
					method : "POST",
					async : true,
					/*
					 * url :
					 * "/ServiceAPI/OpenAPI3/catchmentArea/getPointFacilitiesList.json",
					 */
					url : "/ServiceAPI/OpenAPI3/catchmentArea/getPointFacilitiesList.json",
					options : {
						callback : function(result){							
							
							if((jibunAdres === undefined || jibunAdres === null || jibunAdres === "") && (result === undefined)){
								// 지번주소 없으면 도로명도 없는걸로
								alert( "선택한 지점은 주소가 없는 곳입니다. 다른 곳을 선택하여 주시기 바랍니다.");
								return;
							}
							if(roadAdres != "" && roadAdres != null && roadAdres != undefined){
								$('#road_name').text(roadAdres);	
					        }else{
					        	$('#road_name').text("검색된 도로명 주소가 없습니다.");
					        }
							$('#address_name').text(jibunAdres);
							
							var html = '';
							if(result != undefined){
								$.each(result, function(index, item){
								html += 		'<li id="'+item.ksic_5_cd+'"><a href="javascript:void(0);" id="sufid_'+item.sufid+'" value="'+item.x+'/'+item.y+'">'+item.corp_nm+'</a></li>';
								});
							}else{
								html += 		'<li><a href="javascript:void(0);">검색된 시설이 없습니다.</a></li>';
							}
							$('.point__list').html(html);
							$('.point__con.point__address').attr("value",select_x + "/" +select_y);
						    $('.point__select').stop().fadeIn(500);
						}
					}
				});
									
				
			},
			/**
			 * 
			 * @name : searchReverseGeoApi
			 * @description : 검색 리버스지오코딩 API
			 * 
			 */
			searchReverseGeoApi : function(select_x, select_y, targetPOI){
				$.ajax({
			        type: "GET",
			        url: "https://map.ngii.go.kr/openapi/search.xml",
			        data: {
			        	x : select_x,
			        	y : select_y,
			            target:"reverseGeo",
			            // apikey:"iRZU9B0q0cc-Sli4OUVssw",
			            // apikey:"681A8A4458D8640F67284FF671EC2359",
						apikey:"E83672BED4060203EEE31799616A1199",	// 운영 반영시 해당
																	// url로 테스트
																	// 한다
						// apikey:"924F124D2B4E0FD86234D75A9F4C271D",
			        },
			        dataType : "jsonp",
			        crossDomain:true,
			        success: function(result) {
			            var xmlData = jQuery.parseXML(result.xmlStr);
			            var header = $(xmlData).find("header");
			            var responseCode = header.find("responseCode").text();
			            var responseMessage = header.find("responseMessage").text();
			            var jibunAdres = '';
			            var roadAdres = '';
			            var html ="";
			            if(responseCode!="0"&&responseCode!="100"){
			            	jibunAdres = responseMessage;
			            }else{
			            	if($(xmlData).find("contents").find("jibunAdres").length==0){
			            		var errHtml = "";
			                	if($("input:checkbox[id='schTypeGbA01']").is(":checked")){
			                		errHtml = "현재 시군구에 해당하는 검색결과가 없습니다.";
			                	}else{
			                		errHtml = "현재 보이는 화면 내에서는 해당하는 검색결과가 없습니다.";
			                	}
			            		roadAdres = errHtml;
			            	}else{
			            		jibunAdres = $(xmlData).find("contents").find("jibun").find("jibunAdres").text();
			            		roadAdres = $(xmlData).find("contents").find("road").find("roadAdres").text();
			            	}
			            }
			            
			            jibunAdres = $(xmlData).find("contents").find("jibun").find("jibunAdres").text();
	            		roadAdres = $(xmlData).find("contents").find("road").find("roadAdres").text();

		            	$catchmentAreaMap.ui.searchFacilitiesList(select_x, select_y, targetPOI, roadAdres, jibunAdres);
			           
			          },
			        error : function(xhr, ajaxSettings, thrownError){
			        	console.log("error");
			        }
			    });
			},
			/**
			 * 
			 * @name : moveTargetArea
			 * @description : 해당 좌표로 화면 및 마커를 생성한다.
			 * 
			 */
			moveTargetArea : function(name, roadAdres, x, y ,poiMappingval, mapId, callerGb, zoom, sufid, jibunAdres){
				
				$catchmentAreaMap.ui.selectCoordinate_x = x;
				$catchmentAreaMap.ui.selectCoordinate_y = y;					
							
				$catchmentAreaMap.ui.my_x = x;
				$catchmentAreaMap.ui.my_y = y;
	
				$catchmentAreaMap.ui.MarKer_name = name;
				$catchmentAreaMap.ui.MarKer_roadAdres = roadAdres;
				$catchmentAreaMap.ui.map.mapMove([$catchmentAreaMap.ui.my_x, $catchmentAreaMap.ui.my_y], 10);
				
				if(roadAdres == undefined  || roadAdres == null || roadAdres == '' || roadAdres == 'undefined'){
					$('#point__roadaddress').html('<dt>도로명</dt> <dd>검색된 도로명 주소가 없습니다.</dd>');
				}else{
					$('#point__roadaddress').html('<dt>도로명</dt> <dd>'+roadAdres + '</dd>');
				}
				
				if(jibunAdres == undefined || jibunAdres == null || jibunAdres == '' || jibunAdres == 'undefined' ){
					$('#point__jibunaddress').html('<dt>지번</dt> <dd>검색된 지번 주소가 없습니다.</dd>');
				}else{
					$('#point__jibunaddress').html('<dt>지번</dt> <dd>'+jibunAdres+ '</dd>');
				}
				
				$('.point__tit').text(name);
				$('#point__submit').attr('value',x+'/'+y+'/'+name);
				$('.modal.point__confirm').css("display","block");
			},
			/**
			 * 
			 * @name : creatSearchPoiMarker
			 * @description : 검색 후 마크생성를 생성한다.
			 * 
			 */
			creatSearchPoiMarker : function(name, roadAdres, x, y){	// 파라미터
																	// (mapId)
																	// 추가 - 박상언
																	// 2020-10-14
																	// 작성
				var map = $catchmentAreaMap.ui.getMap(0);	// 인자값 (mapId) 추가 -
															// 박상언 2020-10-14 작성
				
				var markerIcon = sop.icon({
					iconUrl: contextPath +"/resources/m2021/images/map/i_pin--on.png",
					iconAnchor: [12.5, 40 ],
					iconSize: [ 25, 40 ],
					infoWindowAnchor: [1, -34]
				});
				
				var marker = sop.marker([ x, y ], {
					icon: markerIcon
				});
				map.markers.addLayer(marker);	
				marker.on({
					click : function (e){
						var data = [name,roadAdres];
						$catchmentAreaMap.ui.createSrvAreaMarkerInfoTooltip(e,data,$catchmentAreaMap.ui.map);
					}
				});
				$catchmentAreaObj.setTobeSelectedLoc(name, roadAdres, marker);
				
			},
			/**
			 * 
			 * @name : creatSearchPoiMarker_report
			 * @description : 보고서 써클 마커
			 * 
			 */
			creatSearchPoiMarker_report : function(x, y){	// 파라미터 (mapId) 추가 -
															// 박상언 2020-10-14 작성
				var map = $catchmentAreaMap.ui.getMap(1);	// 인자값 (mapId) 추가 -
															// 박상언 2020-10-14 작성
				
				var markerIcon = sop.icon({
					iconUrl: contextPath +"/resources/m2021/images/map/i_pin--on.png",
					iconAnchor: [12.5, 40 ],
					iconSize: [ 25, 40 ],
					infoWindowAnchor: [1, -34]
				});
				
				var marker = sop.marker([ x, y ], {
					icon: markerIcon
				});
				
				map.markers.addLayer(marker);	
				
			},
			/**
			 * 
			 * @name : adjustRangeValue
			 * @description : 주행시간은 3.6초, 주행거리는 50m 축소하여 생활권역 영역 설정
			 * @history :
			 */
			adjustRangeValue : function(pGb, pVal) {
				// pGb : T-주행시간, D-주행거리
				var rstVal = pVal;
				
				if(pGb == "T" || pGb == "D"){
					var corrVal = 4; 
					if(pGb == "D"){
						corrVal = 50;
					}
					
					if(rstVal instanceof Array){
						rstVal = rstVal.slice();
	    				var loopCnt = rstVal.length;
	    				for(var i=0; i<loopCnt; i++){
	    					if(typeof rstVal[i] === 'string'){
	    						rstVal[i] = String(Number(rstVal[i]) - corrVal);
	    					}else if(typeof rstVal[i] === 'number'){
	    						rstVal[i] = rstVal[i] - corrVal;
	    					}	    					
	    				}						
					}else{
    					if(typeof rstVal === 'string'){
    						rstVal = String(Number(rstVal) - corrVal);
    					}else if(typeof rstVal === 'number'){
    						rstVal = rstVal - corrVal;
    					}						
					}
				}
				
				return rstVal;
			},
			
			/**
			 * 
			 * @name : restoreRangeValue
			 * @description : 축소하였던 범위값 원복
			 * @history :
			 */
			restoreRangeValue : function(pGb, pResData) {
				// pGb : T-주행시간, D-주행거리
				var resData = pResData; 
				if(resData === undefined || resData === null){
					return;
				}
				
				if(pGb == "T" || pGb == "D"){
					var corrVal = 4; 
					if(pGb == "D"){
						corrVal = 50;
					}
					
					if(resData.hasOwnProperty('saPolygons') && resData.saPolygons.hasOwnProperty('features')){
						var features = resData.saPolygons.features;
						$.each(features, function(index, item){							
							features[index].attributes.ToBreak = features[index].attributes.ToBreak + corrVal;
							if(features[index].attributes.FromBreak !== 0){
								features[index].attributes.FromBreak = features[index].attributes.FromBreak + corrVal;
							}							
						});
					}
				}				
			},
			
			/**
			 * 
			 * @name : createSrvAreaInfoTooltip
			 * @description : 생활권역 도형 선택 시, 툴팁을 생성하여 정보를 표출한다.
			 * @history :
			 * @param event :
			 *            선택된 경계레이어
			 * @param data :
			 *            선택된 경계레이어의 데이터정보
			 */
			createSrvAreaInfoTooltip : function(event, data, type, map) {
				$('.sop-tooltip.sop-zoom-animated.sop-tooltip-right').remove();
				var html = "<table style='margin:10px;' id='geoToolTip'>";
				html += "<tr><td class='gToolTipTitle'>" + data.info.geoNm + " 영역</td></tr>";
				html += "<tr style='height:5px'></tr>";				
				html += "<tr><td class='gStatsData'>면적 : ";
				html += $catchmentAreaMap.ui.comma((Number(data.info.geoArea) / 1000000).toFixed(2));
				html += " ㎢</td></tr>";	
				if(data.info.hasOwnProperty('pops')){
					html += "<tr><td class='gStatsData'>기준년도 : ";
					html += data.info.statsYear;
					html += " 년</td></tr>";	
					html += "<tr><td class='gStatsData'>총인구 : ";
					html += $catchmentAreaMap.ui.comma(data.info.pops);
					html += " 명</td></tr>";						
				}
				html += "</table>";

				event.target.bindToolTip(html, {
					direction: 'right',
					noHide:true,
					opacity: 1

				}).addTo(map.gMap)._showToolTip(event);
				
				$(".sop-tooltip").parent().css({"width" : "150px"} );
				$(".sop-tooltip").css({"border" : "2px solid " + event.target.options.fillColor} );			
				
				$("#geoToolTip .gToolTipTitle")
					.css("font-size", "14px")
					.css("font-weight", "bold")
					.css("color", "#3792de");
				$("#geoToolTip .gStatsData")
					.css("font-size", "12px")
					.css("padding-left", "5px");
			},
			createSrvAreaMarkerInfoTooltip : function(event, data, map) {
				$('.sop-tooltip.sop-zoom-animated.sop-tooltip-right').remove();
				var html = "<table style='margin:10px;' id='geoToolTip'>";
				html += "<tr><td class='gToolTipTitle'>지점 정보</td></tr>";
				html += "<tr style='height:5px'></tr>";				
				html += "<tr><td class='gStatsData'>";
				html += data[0];
				html += "</td></tr>";	
				html += "</table>";

				event.target.bindToolTip(html, {
					direction: 'right',
					noHide:true,
					opacity: 1

				}).addTo(map.gMap)._showToolTip(event);
				
				// djlee 수정
				$(".sop-tooltip").parent().css({"width" : "150px"} );
				$(".sop-tooltip").css({"border" : "2px solid "} );		
				
				$("#geoToolTip .gToolTipTitle")
					.css("font-size", "14px")
					.css("font-weight", "bold")
					.css("color", "#3792de");
				$("#geoToolTip .gStatsData")
					.css("font-size", "12px")
					.css("padding-left", "5px");
			},
			
			comma : function(str){
				str = String(str);
		        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
			},
			/**
			 * 
			 * @name : getGridLevel
			 * @description : 생활권역 영역 면적에 따른 서비스 제공 격자를 반환한다.
			 * @history :
			 */
			getGridLevel : function(pArea) {

				var gLvl = "";
				var shpArea = Number(pArea);
				if(shpArea <= $catchmentAreaMap.ui.maxAreaUsing100mGrid){		// 30㎢
					gLvl = "100m";
				}else{
					gLvl = "500m";
				}
				
				return gLvl;
			},
			/**
			 * 
			 * @name : getBaseYear
			 * @description : 통계 기준년도를 구한다.
			 * @history :
			 */
			getBaseYear : function(pSelGb){
				// pSelGb: 1-, 2-, 3-격자, 4-격자 년도, 5-
				var rstYear = "";
				if(pSelGb == "1"){
					rstYear = $("#bYearSel01 option:selected").val();
				}else if(pSelGb == "2"){
					rstYear = $("#bYearSel02 option:selected").val();
				}else if(pSelGb == "3"){
					rstYear = $("#bYearSel03 option:selected").val();
				}else if(pSelGb == "4"){
					rstYear = $("#bYearSel06 option:selected").val(); // 격자
				}else if(pSelGb == "5"){
					rstYear = $("#bYearSel05 option:selected").val();
				}
				
				return rstYear;
			},
			/**
			 * 
			 * @name : processWithStoredInfo
			 * @description : 저장된 통계정보로 화면을 꾸민다.
			 * @history :
			 */
			processWithStoredInfo : function(pGb, pStoredData) {
				// pGb : S01-통계정보(전체 정보 > 기본정보 보기), S02-통계정보(전체 정보 > 특성별 통계 보기),
				// S03-통계정보(격자 분포)
				
				var stoData = pStoredData;
				if(pGb == "S01"){
					$catchmentAreaMenu.ui.setServiceAreaStatisticsData(stoData.data.result, stoData.opt);
				}else if(pGb == "S02"){
					$catchmentAreaMenu.ui.setCharacteristicsStatsData(stoData.data.result, stoData.opt);				
				}else if(pGb == "S03"){
					
				}
			},
			
			/**
			 * 
			 * @name : setCodeData
			 * @description : 코드 정보를 처리한다.
			 * @history :
			 */
			setCodeData : function(pRst, pOpt) {
				
				var processGb = pOpt.codeInfo.processGb;
				if(processGb != undefined && processGb != null){
					var elemId = pOpt.codeInfo.elemId;
					if(processGb == "sel"){
						$(elemId).empty();
						$.each(pRst, function(index, item){
							if(item.s_class_cd_nm.length == 5){
								$(elemId).append('<button type = "button" data-value="' + item.s_class_cd + '">' + item.s_class_cd_nm + '</button>');
							}else{
								$(elemId).append('<button type = "button" data-value="' + item.s_class_cd + '" style = "width : 50%">' + item.s_class_cd_nm + '</button>');
							}
						});
					}
					
					// 필요 시 추가 else if
					
				}
			},
			/**
			 * 
			 * @name : createSrvAreaShape
			 * @description : 격자의 배경 이미지 생성
			 * @history :
			 */
			createSrvAreaShape : function(pRangeType, pRangeVal, pMapId, pMode) {
				// pMode : Y-시간적 비교분석, undefined-그 외
				
				var mapId = pMapId || 0;	// 맵 아이디는 기본값을 0으로 세팅
				var geoData;
				if(mapId === 0) {
					geoData = $catchmentAreaObj.getShapeInfo(pRangeType, pRangeVal);					
				} else if(mapId === 1) {
					if(pMode === 'Y'){
						geoData = $catchmentAreaObj.getShapeInfo(pRangeType, pRangeVal);
					}else{
						geoData = $catchmentAreaObj.getShapeInfo(pRangeType, pRangeVal, 'T');
					}
				}else{
					geoData = $catchmentAreaObj.getShapeInfo(pRangeType, pRangeVal);
				}				
				
				if(!$catchmentAreaObj.isEmptyObject(geoData)){
					if(pRangeType == "stats_radio_r_grid"){
						var circle = new sop.circle(sop.utmk(geoData.info.geoX, geoData.info.geoY), geoData.info.geoRadius,{
							stroke : true,
							weight : 1,
							opacity : 1,
							fill : true,
							fillColor : null,
							fillOpacity : 0.3,
							color : "#457bf5",
							clickable : false
						});
	
						var that = $catchmentAreaMap.ui.getMap(mapId);	// mapId
																		// 인자값
																		// 추가
						that.markers2.addLayer(circle);					
					}else{		
						var drawObj;
						if(mapId === 0) {
							drawObj = $catchmentAreaMap.draw;					
						}
						
	
						if(drawObj !== undefined){	
							var shapeOpt = {
								stroke : true,
								weight : 1,
								opacity : 1,
								fill : true,
								fillColor : null,
								fillOpacity : 0.3,
								color : "#457bf5",		// #457bf5
								clickable : false
							};

							var polygonPoints = geoData.geometry.rings[geoData.maxIndex];
							var pointArr = [];
							for(var x=0; x < polygonPoints.length; x++){
								var xPoint = polygonPoints[x][0];
								var yPoint = polygonPoints[x][1];
								
								var point = sop.point(xPoint, yPoint);
								
								pointArr.push(point);
							}				
							drawObj._polygon = new sop.Polygon(pointArr, shapeOpt);
							drawObj._polygonGroup.addLayer(drawObj._polygon);
							drawObj.polygon();
							
						}
					}
				}
			},
			
			createInfoTooltip : function(event, data, type, map, lgdIdx){
				$('.sop-tooltip.sop-zoom-animated.sop-tooltip-right').remove();
				
				var legendIdx = 0;
				var isNewChoice = true;
				var statData = [];
				if(map.curSelectedLayer == event.target){
					isNewChoice = false;
					map.curSelectedLayer = null;
					legendIdx = $catchmentAreaMap.ui.legendIdx;
					$('#grid_click').hide();
					return;
				}else{
					map.curSelectedLayer = event.target;
					if(data.info.length != 0){
						statData = data.info[0][data.info[0].showData];
					}
					if($.isNumeric(statData)){
						legendIdx = map.legend.getColor(statData, map.legend.valPerSlice[0])[1];
						$catchmentAreaMap.ui.legendIdx = legendIdx;
					}
				}
				var html_grid = '';
				var grid_color;
				var grid_level = data.dataIdx;
				html_grid += '<span class="legend__box"> </span> '+ (legendIdx+1) +'구간';
				$('#selected_grid_bg_color li').removeClass('on');
				if(legendIdx == 0){
					grid_color = '#f2eee3';
					$('#selected_grid_bg_color li:eq(6)').addClass('on');
				}else if(legendIdx == 1){
					grid_color = '#e5db9e';
					$('#selected_grid_bg_color li:eq(5)').addClass('on');
				}else if(legendIdx == 2){
					grid_color = '#ddc178';
					$('#selected_grid_bg_color li:eq(4)').addClass('on');
				}else if(legendIdx == 3){
					grid_color = '#d29171';
					$('#selected_grid_bg_color li:eq(3)').addClass('on');
				}else if(legendIdx == 4){
					grid_color = '#c9795e';
					$('#selected_grid_bg_color li:eq(2)').addClass('on');
				}else if(legendIdx == 5){
					grid_color = '#9d5848';
					$('#selected_grid_bg_color li:eq(1)').addClass('on');
				}else if(legendIdx == 6){
					grid_color = '#7d3d31';
					$('#selected_grid_bg_color li:eq(0)').addClass('on');
				}
				$('#gird_legned_gugan').html(html_grid);
				$('.legend__box').css('background-color',grid_color);
				this.map.clearToolTip
				var txt_unit = '';
				// 인구 수
				if(data.info[0].showData == 'ppltn_cnt'){// 인구
					txt_unit += 	'인구 수';
				}else if(data.info[0].showData == 'family_cnt'){// 가구
					txt_unit += 	'가구 수';
				}else if(data.info[0].showData == 'resid_cnt'){// 주택
					txt_unit += 	'주택 수';
				}else if(data.info[0].showData == 'copr_cnt'){// 사업체
					txt_unit += 	'사업체 수';
				}else if(data.info[0].showData == 'employee_cnt'){// 종사자
					txt_unit += 	'종사자 수';
				}else{// 공시지가
					txt_unit += 	'격자 내 공시지가';
				}
				
				var year = data.info[0]['base_year'];// 년도
				var grid_code_nm = data.properties['adm_nm'];// 격자코드
				var total = $catchmentAreaMap.ui.comma(data.info[0][data.info[0].showData]); // 명수
				var unit = data.info[0].unit; // 단위
				var selected;
				if(data.show2 == null || data.show2 == undefined || data.show2 == 0){
					selected = data.show1;
				}else{
					selected = data.show1 +',' + data.show2; // 선택한 조건
				}
				
				
				var html = '';
				html += '<b>';
				html += total;
				html += '</b>'+unit;
				
				$('#grid_code_info').text(grid_code_nm + ' 격자의 통계정보  ' + txt_unit);
				$('#grid_click_year').text(year+'년  ' + txt_unit);
				$('#grid_click_total').html(html);
				$('#grid_click_selected').text(selected);
				if($('#grid_size_select li input.active').attr('data-gridleveldiv')  == '100m'){
					$('#grid_click_level').text('100m격자');
				}else if($('#grid_size_select li input.active').attr('data-gridleveldiv')  == '500m'){
					$('#grid_click_level').text('500m격자');
				}else if($('#grid_size_select li input.active').attr('data-gridleveldiv')  == '1k'){
					$('#grid_click_level').text('1km격자');
				}
				$('#grid_click').show();
				
				$('#grid_code_nm').text(grid_code_nm);
				$('#grid_click_total02').text($catchmentAreaMap.ui.comma(total) + unit);
				
				map.clearToolTip();
			
			}
			
			
	};
	
	$catchmentAreaMap.event = {
			
			setUIEvent : function(){
				
				$('.logo > p').text('생활권역 통계지도');
				$('#menu-depth2-a').hide();
				$catchmentAreaMap.ui.createMap("map");
				$catchmentAreaMap.ui.createMap_report("map_report");
				
				$catchmentAreaMap.ui.setSido();
				$(".option__btn.sido_btn.selected").trigger("click");
				$(".option__btn.sgg_btn.selected").trigger("click");
			},
			
			setSize :function(){
				$('.zoom_controller').css({'left' : $(window).width() - 45 + 'px'});
			}
	
			
			
	};
	
	$catchmentAreaMap.arcgis = {};
	$catchmentAreaMap.arcgis.url = {
			
			routeArea : "https://link.kostat.go.kr/arcgis/rest/services/test01/division_verify_area_route/NAServer/Service%20Area/solveServiceArea"
	};
	$catchmentAreaMap.arcgis.routeArea = {};
	$catchmentAreaMap.arcgis.routeArea.paramsForRouteArea = {
			f : "json",
			facilities: null,
			impedanceAttributeName: 'LEAD_TIME',					// LEAD_TIME,
																	// 링크길이
			defaultBreaks: 600,
			outSR: 5179,
			returnFacilities: false,
			returnBarriers: false,
			returnPolylineBarriers: false,
			returnPolygonBarriers: false,
			outputLines: 'esriNAOutputLineNone',
			outputPolygons: 'esriNAOutputPolygonSimplified'	
	};
	$catchmentAreaMap.arcgis.routeArea.mapId = 0;
	$catchmentAreaMap.arcgis.event = {
			/**
			 * @name : calculateSearchArea
			 * @description : 대상처 생활권역 산정
			 * @date : 2020. 05. 29.
			 * @author : 웨이버스
			 */	
        	calculateSearchArea : function(x_coordinate, y_coordinate , areaMins, mapId, rangeType, selectIdx) {
        		
        		if(areaMins === undefined || areaMins === null || areaMins.length < 1){
        			return;
        		}
        		
        		mapId = mapId || 0;	// mapId 기본값 세팅
        		if($catchmentAreaMap.ui.isUsingOA && (mapId == 0)){ 
        			$catchmentAreaMap.arcgis.event.calculateSearchAreaUsingOA(x_coordinate, y_coordinate, areaMins, mapId, rangeType, selectIdx);
        			return;
        		}
        		
        		if($catchmentAreaMap.ui.isUsingOA && (mapId == 99)){ // 격자 분포
																		// 조회에서
																		// 영역 넓이
																		// 구하기위해서
																		// 사용
        			$catchmentAreaMap.arcgis.event.calculateSearchAreaUsingOA(x_coordinate, y_coordinate, areaMins, mapId, rangeType, selectIdx);
        			return;
        		}
        
        		var features = [];        		
        		var spatialReference = { "wkid":5179,"latestWkid":5179 };
        		
        		var xCord = x_coordinate;
        		var yCord = y_coordinate;
        		
        		// 출발지 입력;
        		features.push( { geometry : { x : xCord, y : yCord , spatialReference : spatialReference } } );
        		console.log('features');
        		console.log(features);
        		features = JSON.stringify( {features : features} );

        		var adjustedAreaMins;
        		if(rangeType === 0){		// rangeType : 0(주행시간), 1(주행거리)
        			adjustedAreaMins = $catchmentAreaMap.ui.adjustRangeValue('T', areaMins); // qw
        		}else if(rangeType === 1){
        			adjustedAreaMins = $catchmentAreaMap.ui.adjustRangeValue('D', areaMins);
        		}
        		
        		if(mapId === 0) {
        			$catchmentAreaMap.arcgis.routeArea.paramsForRouteArea.facilities = features;
        			$catchmentAreaMap.arcgis.routeArea.paramsForRouteArea.defaultBreaks = adjustedAreaMins;
        			if(rangeType === 1){// rangeType : 0(주행시간), 1(주행거리)
        				$catchmentAreaMap.arcgis.routeArea.paramsForRouteArea.impedanceAttributeName = '링크길이';
        			}else{
        				$catchmentAreaMap.arcgis.routeArea.paramsForRouteArea.impedanceAttributeName = 'LEAD_TIME';
        			}
        		}
        		
        		var gisServiceDivisionVerifyRouteServiceAreaObj = new gis.service.divisionVerifyRouteServiceArea.api(); 
        		
        		var t = $catchmentAreaMap.arcgis.routeArea; 

        		for ( var k in t.paramsForRouteArea )
        		{
        			gisServiceDivisionVerifyRouteServiceAreaObj.addParam(k, encodeURI(t.paramsForRouteArea[k]));	
        			
        		}
        		
        		gisServiceDivisionVerifyRouteServiceAreaObj.request({
					method : "GET",
					async : false,
					url : $catchmentAreaMap.arcgis.url.routeArea,
					options : t.options
        		});        		
			},
			calculateSearchAreaUsingOA : function(x_coordinate, y_coordinate , areaMins, mapId, rangeType, selectIdx) {
        		
        		var features = [];        		
        		var spatialReference = { "wkid":5179,"latestWkid":5179 };
        		
        		var xCord = x_coordinate;
        		var yCord = y_coordinate;
        		var t = null;
        		
        		// 출발지 입력;
        		features.push( { geometry : { x : xCord, y : yCord , spatialReference : spatialReference } } );
        		console.log('features');
        		console.log(features);
        		features = JSON.stringify( {features : features} );

        		// 요청 시 범위 값을 조정해 주고, 응답 처리 시 원복
        		var adjustedAreaMins;
        		if(rangeType === 0){		// rangeType : 0(주행시간), 1(주행거리)
        			adjustedAreaMins = $catchmentAreaMap.ui.adjustRangeValue('T', areaMins); 
        		}else if(rangeType === 1){
        			adjustedAreaMins = $catchmentAreaMap.ui.adjustRangeValue('D', areaMins);
        		}
        		
        		if(mapId === 0 || mapId == 99) {
        			$catchmentAreaMap.arcgis.routeArea.paramsForRouteArea.facilities = features;
        			$catchmentAreaMap.arcgis.routeArea.paramsForRouteArea.defaultBreaks = adjustedAreaMins;
        			if(rangeType === 1){// rangeType : 0(주행시간), 1(주행거리)
        				$catchmentAreaMap.arcgis.routeArea.paramsForRouteArea.impedanceAttributeName = '링크길이';
        			}else{
        				$catchmentAreaMap.arcgis.routeArea.paramsForRouteArea.impedanceAttributeName = 'LEAD_TIME';
        			}
        			t = $catchmentAreaMap.arcgis.routeArea;
        		}
        		var a = new sop.portal.sopPortalgetPtFcltsList.api();
        		var gisServiceDivisionVerifyRouteServiceAreaObj = new gis.service.divisionVerifyRouteServiceAreaUsingOA.api();       		
        		

        		for ( var k in t.paramsForRouteArea )
        		{
        			gisServiceDivisionVerifyRouteServiceAreaObj.addParam(k, encodeURI(t.paramsForRouteArea[k]));	
        			
        		}
        		
        		var params = {};
        		params.xCord = xCord;
        		params.yCord = yCord;
        		params.rangeType = (rangeType == 0 ? "T" :(rangeType == 1 ? "D" : ""));
        		params.areaMins = areaMins;
        		params.selectIdx = selectIdx;
        		
        		gisServiceDivisionVerifyRouteServiceAreaObj.request({
					method : "GET",
					async : false,
					url : "/ServiceAPI/OpenAPI3/catchmentArea/serviceAreaGeometry.json",
					options : {
						mapId : mapId,
						params : params
					}
        		});        		
			}
			
	};
	
	$catchmentAreaMap.draw ={

			map : null,
			_map : null,
			_init : false,
			_polygoninit : false,
			_polylineGroup : new sop.LayerGroup(),
			_polylines : null,
			_polygonGroup : new sop.LayerGroup(),
			_polygon : null,
			polygon : function(){
				
				// 초기화
				if (!this._polygoninit) {
					this.initPolygon();
				}
				
				this._polygonGroup.addLayer(this._polygon);
				this._polygon.addTo(this._map);
				
			},
			polyline : function(path, move) {
				if (!Array.isArray(path)) {
					return messageAlert.open("알림", "경로 데이터의 형식이 맞지 않습니다.");
				}
				// 초기화
				if (!this._init) {
					this.initPolyline();
				}
				
				// polyine 객체생성
				this._polyline = new sop.Polyline([], {
					stroke: true,
					color: '#1B66FF',
					weight: 6,
					opacity: 0.7,
					fill: false
				}).addTo(this._map);
				
				// 그리기
				for (var i = 0; i < path.length; i++) {
					if( (path[i][0]) == "" || path[i][1] == "") continue;
					this._polyline.addUTMK({ x: path[i][0], y: path[i][1] });
				}
				
				// 폴리라인 레이어 추가
				this._polylineGroup.addLayer(this._polyline);
				
				move = (move == null)?true:(move)?true:false;
				if ( move )
				{
					// 지도 extent 이동
					this._map.panInsideBounds(_polyline.getBounds());
				}
							
			},
			polylines : function(arrayJsonData) {
				if (!Array.isArray(arrayJsonData)) {
					return messageAlert.open("알림", "경로 데이터의 형식이 맞지 않습니다.");
				}
				// 초기화
				if (!this._init) {
					this.initPolyline();
				}
				
				var _jsonData;
				var _polyline;
				var _utmkBounds = null;
				var _bounds;
				var _path;
				var _seq;
				var _path_id;
				var _member_id;
				var _idx;
				var marker;
				var markerIcon;
				var type;
				var randomColor;
				
				for (var j = 0; j < arrayJsonData.length; j++) {
					_jsonData = arrayJsonData[j];
					_path = _jsonData['path'];
					_seq = _jsonData['target_seq'];
					_path_id = _jsonData['path_id'];
					_member_id = _jsonData['member_id'];
					_idx = _seq - 1;
					
					// polyine 객체생성 (랜덤색상)
					randomColor = getRandomColor();
					_polyline = new sop.Polyline([], {
						stroke: true,
						color: randomColor,
						weight: 6,
						opacity: 0.7,
						fill: false,
						idx :_idx,
						seq : _seq,
						path_id : _path_id,
						member_id : _member_id
						
					}).addTo(this._map);
					if( _path.length == 0 || isNaN( _path[0][0] ) || isNaN( _path[0][1] )) continue;
					// 그리기
					for (var i = 0; i < _path.length; i++) {
						_polyline.addUTMK({ x: _path[i][0], y: _path[i][1] });
					}

					// 폴리라인 레이어 추가
					this._polylineGroup.addLayer(_polyline);
					
					// 폴리라인 클릭 시
					_polyline.on("click", function() {
						var that = $catchmentAreaMap.ui;
						var pageSize = that.secondPageSize;
						var dataList = that.secondTargetList;
						
						// 분장 대상처 목록 팝업
						that.selectRowForPopUp = this.options.seq;
						that.divisionVerifyTargetPathInfoPopup('full', this.options.idx,  this.options.path_id,  this.options.member_id);
						
						// 데이터보드의 해당 row 선택
						for(var i = 0; i < dataList.length; i ++) {
							if(dataList[i][2] == this.options.seq) {
								var options = {
										idx : i
									,	name : "INST_GROUP_ID"
									,	type : "second"
								}
								that.validateFocus(options);
								break;
							}
						}
					});
					
					
					// 출발지 아이콘 POI 그리기
					type = 'start_multi';
	    			markerIcon = new sop.DivIcon({
						html: "<div class='route_start_icon'></div>",
						iconSize: new sop.Point(50, 45),
						iconAnchor: new sop.Point(16, 42)
					});
					marker = sop.marker([ _path[0][0], _path[0][1] ], {
						icon: markerIcon
					});
					// 기존 마커가 있다면 삭제
					if ($divisionVerifyDataBoard.route.marker[type][_path_id]) {
						this._map.removeLayer($divisionVerifyDataBoard.route.marker[type][_path_id]);
						delete $catchmentAreaMain.route.marker[type][_path_id];
					}
					// 마커 저장
					$divisionVerifyDataBoard.route.marker[type][_path_id] = marker;
					// 지도상에 마커 추가
					this._map.addLayer(marker);
					
					
					// 도착지 아이콘 POI 그리기
					type = 'end_multi';
	    			markerIcon = new sop.DivIcon({
						html: "<div class='route_end_icon'></div>",
						iconSize: new sop.Point(50, 45),
						iconAnchor: new sop.Point(16, 42)
					});
					marker = sop.marker([ _path[_path.length-1][0], _path[_path.length-1][1] ], {
						icon: markerIcon
					});
					// 기존 마커가 있다면 삭제
					if ($divisionVerifyDataBoard.route.marker[type][_path_id]) {
						this._map.removeLayer($divisionVerifyDataBoard.route.marker[type][_path_id]);
						delete $catchmentAreaMain.route.marker[type][_path_id];
					}
					// 마커 저장
					$catchmentAreaMain.route.marker[type][_path_id] = marker;
					// 지도상에 마커 추가
					this._map.addLayer(marker);
					
					// 총괄의 경우 표출 안하는 사양에서 텍스트 라벨만 표출 안하는 것으로 변경 됨[정재호]
	    			// if( _member_id != $divisionVerifyDataBoard.ui.manager )
					{
	    				// 대상처 POI 및 순번 라벨 그리기
	    				// 이재현 테스트용 대상처 좌표 코드 (박종하 수정요망)
	    				var divisionTargetInfo = $divisionVerifyDataBoard.ui.getDivisionTargetInfo( _idx );
	    				var i = 0, iLen = divisionTargetInfo.length;
	    				for( ; i < iLen ; ++i )
	    				{
	    					var io = divisionTargetInfo[i];
	    					var data = {};
	    					data.TARGET_SEQ = io.target_id;
	    					data.IDX = i+1;
	    					data.X_COOR = io.X_COOR;
	    					data.Y_COOR = io.Y_COOR;
	    					
	    					type = 'target_multi';
	    					var iconHtml = "";
	    					iconHtml += "<div class='route_target_marker_icon_search' style='background-color:"+randomColor+";'>";
	    					if( _member_id != $divisionVerifyDataBoard.ui.manager ) {
	    						iconHtml += 	"<div class='route_poi_number_search on'>"+data.IDX+"</div>";
	    					}
	    					iconHtml += "</div>";
	    					var markerIcon = new sop.DivIcon({
	    						html: iconHtml,
	    						iconSize: new sop.Point(60, 0),
	    						iconAnchor: new sop.Point(7, 7),
	    						infoWindowAnchor: new sop.Point(1, -5)
	    					});
	    					marker = sop.marker([data.X_COOR, data.Y_COOR],{
	    						icon:markerIcon,
	    						data : data
	    					});
	    					
	    					// 기존 마커가 있다면 삭제
	    					if ($divisionVerifyDataBoard.route.marker[type][data.TARGET_SEQ]) {
	    						this._map.removeLayer($divisionVerifyDataBoard.route.marker[type][data.TARGET_SEQ]);
	    						delete $divisionVerifyDataBoard.route.marker[type][data.TARGET_SEQ];
	    					}
	    					// 마커 저장
	    					$divisionVerifyDataBoard.route.marker[type][data.TARGET_SEQ] = marker;
	    					// 지도상에 마커 추가
	    					this._map.addLayer(marker);
	    				
	    				}
	    				
					}
	    			if ( _polyline == null ) return;
					// extent 구하기
					_bounds = _polyline.getBounds();
					
					if (!_utmkBounds) {
						_utmkBounds = _bounds;
					}
					if (_utmkBounds._southWest.x > _bounds._southWest.x) {
						_utmkBounds._southWest.x = _bounds._southWest.x;
					}
					if (_utmkBounds._southWest.y > _bounds._southWest.y) {
						_utmkBounds._southWest.y = _bounds._southWest.y;
					}
					if (_utmkBounds._northEast.x < _bounds._northEast.x) {
						_utmkBounds._northEast.x = _bounds._northEast.x;
					}
					if (_utmkBounds._northEast.y < _bounds._northEast.y) {
						_utmkBounds._northEast.y = _bounds._northEast.y;
					}
				}
				
				// 지도 extent 이동
				if ( _utmkBounds == null ) return;
				
				this._map.fitBounds(_utmkBounds);
			},
			initPolygon : function () {
				this.map = $catchmentAreaMap.ui.mapList[0];
				this._map = $catchmentAreaMap.ui.mapList[0].gMap;

				this._map.addLayer(this._polygonGroup);
				
				this._polygoninit = true;
			},		
			initPolyline : function () {
				this.map = $catchmentAreaMap.ui.mapList[0];
				this._map = $catchmentAreaMap.ui.mapList[0].gMap;

				// 폴리라인 그룹 레이어 추가
				// this._polylineGroup.addLayer(this._polyline);
				this._map.addLayer(this._polylineGroup);
				
				this._init = true;
			},
			removePolyline : function() {
				if( !this._map ) return;
				this._map.removeLayer(this._polylineGroup);
				this._polylineGroup.clearLayers();
				this._init = false;
			},
			removePolygon : function() {
				if( !this._map ) return;
				this._map.removeLayer(this._polygonGroup);
				this._polygonGroup.clearLayers();
				this._polygoninit = false;			
			},
			removePath : function() {
				if( !this._map ) return;
				// this._map.removeLayer(this._polylineGroup);
				if( !this._polyline ) return;
				this._polylineGroup.removeLayer( this._polyline);
				// this._init = false;
			}
		
	};
	
	$catchmentAreaMap.draw_report ={

			map : null,
			_map : null,
			_init : false,
			_polygoninit : false,
			_polylineGroup : new sop.LayerGroup(),
			_polylines : null,
			_polygonGroup : new sop.LayerGroup(),
			_polygon : null,
			polygon : function(){
				
				// 초기화
				if (!this._polygoninit) {
					this.initPolygon();
				}
				
				this._polygonGroup.addLayer(this._polygon);
				this._polygon.addTo(this._map);
				
			},
			polyline : function(path, move) {
				if (!Array.isArray(path)) {
					return messageAlert.open("알림", "경로 데이터의 형식이 맞지 않습니다.");
				}
				// 초기화
				if (!this._init) {
					this.initPolyline();
				}
				
				// polyine 객체생성
				this._polyline = new sop.Polyline([], {
					stroke: true,
					color: '#1B66FF',
					weight: 6,
					opacity: 0.7,
					fill: false
				}).addTo(this._map);
				
				// 그리기
				for (var i = 0; i < path.length; i++) {
					if( (path[i][0]) == "" || path[i][1] == "") continue;
					this._polyline.addUTMK({ x: path[i][0], y: path[i][1] });
				}
				
				// 폴리라인 레이어 추가
				this._polylineGroup.addLayer(this._polyline);
				
				move = (move == null)?true:(move)?true:false;
				if ( move )
				{
					// 지도 extent 이동
					this._map.panInsideBounds(_polyline.getBounds());
				}
							
			},
			polylines : function(arrayJsonData) {
				if (!Array.isArray(arrayJsonData)) {
					return messageAlert.open("알림", "경로 데이터의 형식이 맞지 않습니다.");
				}
				// 초기화
				if (!this._init) {
					this.initPolyline();
				}
				
				var _jsonData;
				var _polyline;
				var _utmkBounds = null;
				var _bounds;
				var _path;
				var _seq;
				var _path_id;
				var _member_id;
				var _idx;
				var marker;
				var markerIcon;
				var type;
				var randomColor;
				
				for (var j = 0; j < arrayJsonData.length; j++) {
					_jsonData = arrayJsonData[j];
					_path = _jsonData['path'];
					_seq = _jsonData['target_seq'];
					_path_id = _jsonData['path_id'];
					_member_id = _jsonData['member_id'];
					_idx = _seq - 1;
					
					// polyine 객체생성 (랜덤색상)
					randomColor = getRandomColor();
					_polyline = new sop.Polyline([], {
						stroke: true,
						color: randomColor,
						weight: 6,
						opacity: 0.7,
						fill: false,
						idx :_idx,
						seq : _seq,
						path_id : _path_id,
						member_id : _member_id
						
					}).addTo(this._map);
					if( _path.length == 0 || isNaN( _path[0][0] ) || isNaN( _path[0][1] )) continue;
					// 그리기
					for (var i = 0; i < _path.length; i++) {
						_polyline.addUTMK({ x: _path[i][0], y: _path[i][1] });
					}

					// _polyline Canvas 마우스 포인터 변경 class 추가
					// sop.DomUtil.addClass(_polyline._renderer._container,
					// 'sop-clickable');
					
					// 폴리라인 레이어 추가
					this._polylineGroup.addLayer(_polyline);
					
					// 폴리라인 클릭 시
					_polyline.on("click", function() {
						var that = $catchmentAreaMap.ui;
						var pageSize = that.secondPageSize;
						var dataList = that.secondTargetList;
						
						// 분장 대상처 목록 팝업
						that.selectRowForPopUp = this.options.seq;
						that.divisionVerifyTargetPathInfoPopup('full', this.options.idx,  this.options.path_id,  this.options.member_id);
						
						// 데이터보드의 해당 row 선택
						for(var i = 0; i < dataList.length; i ++) {
							if(dataList[i][2] == this.options.seq) {
								var options = {
										idx : i
									,	name : "INST_GROUP_ID"
									,	type : "second"
								}
								that.validateFocus(options);
								break;
							}
						}
					});
					
					
					// 출발지 아이콘 POI 그리기
					type = 'start_multi';
	    			markerIcon = new sop.DivIcon({
						html: "<div class='route_start_icon'></div>",
						iconSize: new sop.Point(50, 45),
						iconAnchor: new sop.Point(16, 42)
					});
					marker = sop.marker([ _path[0][0], _path[0][1] ], {
						icon: markerIcon
					});
					// 기존 마커가 있다면 삭제
					if ($divisionVerifyDataBoard.route.marker[type][_path_id]) {
						this._map.removeLayer($divisionVerifyDataBoard.route.marker[type][_path_id]);
						delete $catchmentAreaMain.route.marker[type][_path_id];
					}
					// 마커 저장
					$divisionVerifyDataBoard.route.marker[type][_path_id] = marker;
					// 지도상에 마커 추가
					this._map.addLayer(marker);
					
					
					// 도착지 아이콘 POI 그리기
					type = 'end_multi';
	    			markerIcon = new sop.DivIcon({
						html: "<div class='route_end_icon'></div>",
						iconSize: new sop.Point(50, 45),
						iconAnchor: new sop.Point(16, 42)
					});
					marker = sop.marker([ _path[_path.length-1][0], _path[_path.length-1][1] ], {
						icon: markerIcon
					});
					// 기존 마커가 있다면 삭제
					if ($divisionVerifyDataBoard.route.marker[type][_path_id]) {
						this._map.removeLayer($divisionVerifyDataBoard.route.marker[type][_path_id]);
						delete $catchmentAreaMain.route.marker[type][_path_id];
					}
					// 마커 저장
					$catchmentAreaMain.route.marker[type][_path_id] = marker;
					// 지도상에 마커 추가
					this._map.addLayer(marker);
					
					// 총괄의 경우 표출 안하는 사양에서 텍스트 라벨만 표출 안하는 것으로 변경 됨[정재호]
	    			// if( _member_id != $divisionVerifyDataBoard.ui.manager )
					{
	    				// 대상처 POI 및 순번 라벨 그리기
	    				var divisionTargetInfo = $divisionVerifyDataBoard.ui.getDivisionTargetInfo( _idx );
	    				var i = 0, iLen = divisionTargetInfo.length;
	    				for( ; i < iLen ; ++i )
	    				{
	    					var io = divisionTargetInfo[i];
	    					var data = {};
	    					data.TARGET_SEQ = io.target_id;
	    					data.IDX = i+1;
	    					data.X_COOR = io.X_COOR;
	    					data.Y_COOR = io.Y_COOR;
	    					
	    					type = 'target_multi';
	    					var iconHtml = "";
	    					iconHtml += "<div class='route_target_marker_icon_search' style='background-color:"+randomColor+";'>";
	    					if( _member_id != $divisionVerifyDataBoard.ui.manager ) {
	    						iconHtml += 	"<div class='route_poi_number_search on'>"+data.IDX+"</div>";
	    					}
	    					iconHtml += "</div>";
	    					var markerIcon = new sop.DivIcon({
	    						html: iconHtml,
	    						iconSize: new sop.Point(60, 0),
	    						iconAnchor: new sop.Point(7, 7),
	    						infoWindowAnchor: new sop.Point(1, -5)
	    					});
	    					marker = sop.marker([data.X_COOR, data.Y_COOR],{
	    						icon:markerIcon,
	    						data : data
	    					});
	    					
	    					// 기존 마커가 있다면 삭제
	    					if ($divisionVerifyDataBoard.route.marker[type][data.TARGET_SEQ]) {
	    						this._map.removeLayer($divisionVerifyDataBoard.route.marker[type][data.TARGET_SEQ]);
	    						delete $divisionVerifyDataBoard.route.marker[type][data.TARGET_SEQ];
	    					}
	    					// 마커 저장
	    					$divisionVerifyDataBoard.route.marker[type][data.TARGET_SEQ] = marker;
	    					// 지도상에 마커 추가
	    					this._map.addLayer(marker);
	    				
	    				}
	    				
					}
	    			if ( _polyline == null ) return;
					// extent 구하기
					_bounds = _polyline.getBounds();
					
					if (!_utmkBounds) {
						_utmkBounds = _bounds;
					}
					if (_utmkBounds._southWest.x > _bounds._southWest.x) {
						_utmkBounds._southWest.x = _bounds._southWest.x;
					}
					if (_utmkBounds._southWest.y > _bounds._southWest.y) {
						_utmkBounds._southWest.y = _bounds._southWest.y;
					}
					if (_utmkBounds._northEast.x < _bounds._northEast.x) {
						_utmkBounds._northEast.x = _bounds._northEast.x;
					}
					if (_utmkBounds._northEast.y < _bounds._northEast.y) {
						_utmkBounds._northEast.y = _bounds._northEast.y;
					}
				}
				
				// 지도 extent 이동
				if ( _utmkBounds == null ) return;
				
				this._map.fitBounds(_utmkBounds);
			},
			initPolygon : function () {
				this.map = $catchmentAreaMap.ui.mapList[1];
				this._map = $catchmentAreaMap.ui.mapList[1].gMap;

				this._map.addLayer(this._polygonGroup);
				
				this._polygoninit = true;
			},		
			initPolyline : function () {
				this.map = $catchmentAreaMap.ui.mapList[1];
				this._map = $catchmentAreaMap.ui.mapList[1].gMap;

				// 폴리라인 그룹 레이어 추가
				// this._polylineGroup.addLayer(this._polyline);
				this._map.addLayer(this._polylineGroup);
				
				this._init = true;
			},
			removePolyline : function() {
				if( !this._map ) return;
				this._map.removeLayer(this._polylineGroup);
				this._polylineGroup.clearLayers();
				this._init = false;
			},
			removePolygon : function() {
				if( !this._map ) return;
				this._map.removeLayer(this._polygonGroup);
				this._polygonGroup.clearLayers();
				this._polygoninit = false;			
			},
			removePath : function() {
				if( !this._map ) return;
				// this._map.removeLayer(this._polylineGroup);
				if( !this._polyline ) return;
				this._polylineGroup.removeLayer( this._polyline);
				// this._init = false;
			}
		
	
	};
			// 지도 콜백 함수
	$catchmentAreaMap.callbackFunc = {
			didSelectedPolygon : function(event, data, type, map) {
				if(data.info[0] != null ){
					$catchmentAreaMap.ui.createInfoTooltip(event, data, type, map);
					// $('.color__list > dd > ul > li:eq(0)').trigger('click');
					var layer = event.target;
					var layer_past = $catchmentAreaMap.ui.grid_selected_layer;
					if(layer_past != null){
						layer_past.setStyle({
							weight : 1,
							color : "#7b3e30",
							dashArray : layer.options.dashArray ,
							fillOpacity : layer_past.options.fillOpacity,
							fillColor : layer_past.options.fillColor
						});
					}
					if(layer == map.curSelectedLayer){
						layer.setStyle({
							weight : 3,
							color : "#008aff",
							dashArray : layer.options.dashArray ,
							fillOpacity : layer.options.fillOpacity,
							fillColor : layer.options.fillColor
						});
						$catchmentAreaMap.ui.grid_selected_layer = layer;
					}
				}
			}
			// 지도이동. createMap()에서 "movestart" 이벤트 선언시 콜백됨.
			,didMapMoveStart : function(event, map) {
			}
			
			// 지도이동종료. createMap()에서 "moveend" 이벤트 선언시 콜백됨.
			,didMapMoveEnd : function(event, map) {
				$catchmentAreaMap.ui.getCenterToAdmCd($catchmentAreaMap.ui.map.gMap.getCenter(), function(res) {
					if(res.result == undefined) return;
					
					var lv_from_sido_cd = $("#statsMePopupArea_sido").val(); // 수정
																				// 해야함
					var lv_from_sgg_cd = $("#statsMePopupArea_sgg").val(); // 수정
																			// 해야함
					var lv_from_emdong_cd = $("#statsMePopupArea_emdong").val(); // 수정
																					// 해야함
					var lv_to_sido_cd = res.result.sido_cd;
					var lv_to_sgg_cd = res.result.sgg_cd;
					var lv_to_emdong_cd = res.result.emdong_cd;
					var lv_sido_change_yn = "N";
					var lv_sgg_change_yn = "N";
					var lv_emdong_change_yn = "N";
					// 생활환경 종합 지도 영역 이동에 따른 해당 위치 값 저장
					$catchmentAreaMap.ui.my_sido_cd = res.result.sido_cd;
					$catchmentAreaMap.ui.my_sgg_cd = res.result.sgg_cd;
					$catchmentAreaMap.ui.my_emdong_cd = res.result.emdong_cd;
					
					if(lv_from_sido_cd != lv_to_sido_cd) lv_sido_change_yn = "Y";
					if(lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd != lv_to_sgg_cd) lv_sgg_change_yn = "Y";
					if(lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd != lv_to_sgg_cd || lv_from_emdong_cd != lv_to_emdong_cd) lv_emdong_change_yn = "Y";
					
					if(lv_sido_change_yn == "Y" || lv_sgg_change_yn == "Y" || lv_emdong_change_yn == "Y") {
						
						// 접속지역 변경
						$catchmentAreaMap.ui.getSido(res.result.sido_cd);
						$catchmentAreaMap.ui.getSgg(res.result.sido_cd, res.result.sgg_cd);
						$catchmentAreaMap.ui.getEmdong(res.result.sido_cd, res.result.sgg_cd, res.result.emdong_cd);			
						
						// 텍스트 변경
						$catchmentAreaMap.ui.setPositionText();

					}
					
					// 지도 조회
					// 변수
				});
				
				
				
			}// 줌 시작. createMap()에서 "zoomstart" 이벤트 선언시 콜백됨.
			,didMapZoomStart : function(event, map) {
				// console.log("didMapZoomStart - START");
			}
			// 줌 종료. createMap()에서 "zoomend" 이벤트 선언시 콜백됨.
			,didMapZoomEnd : function(event, map) {
				var a = event.target._zoom;
				var map = $catchmentAreaMap.ui.map;
				map.isZoomStart = true;
				map.zoom = event.target._zoom;
				if(map.zoom <= 1){
					if (map.mapBtnInfo != null) {
						map.mapBtnInfo.changeZoomLevelTitle("전국");
					}
				}else if(map.zoom > 1 && map.zoom <= 3){
					if (map.mapBtnInfo != null) {
						map.mapBtnInfo.changeZoomLevelTitle("시도");
					}
				}else if(map.zoom > 3 && map.zoom <= 5){
					if (map.mapBtnInfo != null) {
						map.mapBtnInfo.changeZoomLevelTitle("시군구");
					}
				}else if(map.zoom > 5 && map.zoom <= 8){
					if (map.mapBtnInfo != null) {
						map.mapBtnInfo.changeZoomLevelTitle("읍면동");
					}
				}else if(map.zoom > 8){
					if (map.mapBtnInfo != null) {
						map.mapBtnInfo.changeZoomLevelTitle("집계구");
					}
				}
				// console.log("didMapZoomEnd - START");
			}
			// 지도 드래그. createMap()에서 "drag" 이벤트 선언시 콜백됨.
			,didMapDrag : function(event, map) {
				// console.log("didMapDrag - START");
			}
			// 지도 드래그 종료. createMap()에서 "dragend" 이벤트 선언시 콜백됨.
			,didMapDragEnd : function(event, map) {
				// console.log("didMapDragEnd - START");
			}
			,didMapClick : function(event, map) {
				var mapId = 0; // map이 1개 이므로 0으로 고정
				var userMarker = $catchmentAreaMap.ui.useMarker;
				if(mapId === 0){
					if($catchmentAreaMap.ui.useMarker){
						$catchmentAreaMap.ui.useMarker = false;
						$("#searchPoi").removeClass("active");
						map.markers.clearLayers(); // 마커 초기화
						
						var markerIcon = sop.icon({
							iconUrl: contextPath +"/resources/m2021/images/map/i_pin--on.png",
							iconAnchor: [12.5, 40 ],
							iconSize: [ 25, 40 ],
							infoWindowAnchor: [1, -34]
						});
						
						var marker = new sop.marker(event.utmk, {icon : markerIcon});
					
						$catchmentAreaObj.setTobeSelectedTargetLoc("", "", marker);
						
						$catchmentAreaMap.ui.searchReverseGeoApi(event.utmk.x, event.utmk.y, marker);
						$catchmentAreaMap.ui.selectCoordinate_x = event.utmk.x;
						$catchmentAreaMap.ui.selectCoordinate_y = event.utmk.y;
						
						map.markers.addLayer(marker);
						
					}
				}
			},

			/**
			 * 
			 * @name : didMouseClickPolygon
			 * @description : 해당경계 mouse click 시, 발생하는 콜백함수
			 * 
			 */
			didMouseClickPolygon : function(event, data, type, map) {
				if(type == "saShp"){
					
					var geoData;
					if(map != undefined || map != null){
						geoData = $catchmentAreaObj.getShapeInfo(data.rangeType, data.rangeVal);
					}					
					if(geoData !== undefined && !$catchmentAreaObj.isEmptyObject(geoData)){
						$catchmentAreaMap.ui.createSrvAreaInfoTooltip(event, geoData, type, map);
					}
				}
				
			},
	};
	
	
	/**
	 * @name : common_localtion
	 * @description : 위치동의
	 * @date : 2020.06.09
	 * @author : 한광희
	 * @history :
	 * @param p_map :
	 *            지도 p_callback : 위치동의시 동작할 함수 p_callback2 : 위치미동의시 동작할 함수
	 */
	function common_localtion(p_map, p_callback, p_callback2) {
		// 변수선언
		// get_cookie 오류 해결하면 수정해야함
		var my_lc_info_agree_yn = get_cookie("lc_info_agree_yn");
		var my_center = null;
		var my_x = null;
		var my_y = null;
		var my_sido_cd = "";
		var my_sido_nm = "";
		var my_sgg_cd = "";
		var my_sgg_nm = "";
		var my_emdong_cd = "";
		var my_emdong_nm = "";
		
		
		if(my_lc_info_agree_yn == '' || my_lc_info_agree_yn == null || my_lc_info_agree_yn == undefined){
			if($catchmentAreaMap.ui.location_agree){
				$catchmentAreaMap.ui.getCurrentLocation(function(p_center, p_flag, p_msg, p_msg2) {
					if(p_flag == true) {
						// 변수 입력
						$catchmentAreaMap.ui.my_x = p_center[0];
						$catchmentAreaMap.ui.my_y = p_center[1];
						// 내 위치 조회 후 콜백
						
						// 변수 입력
						$catchmentAreaMap.ui.getCenterToAdmCd(p_center, function(res) {
							// 변수 입력
							$catchmentAreaMap.ui.my_location_yn = "Y";
							$catchmentAreaMap.ui.my_sido_cd = res.result.sido_cd;
							$catchmentAreaMap.ui.my_sido_nm = res.result.sido_nm;
							$catchmentAreaMap.ui.my_sgg_cd = res.result.sgg_cd;
							$catchmentAreaMap.ui.my_sgg_nm = res.result.sgg_nm;
							$catchmentAreaMap.ui.my_emdong_cd = res.result.emdong_cd;
							$catchmentAreaMap.ui.my_emdong_nm = res.result.emdong_nm;
							
							
							// 내 위치 조회 후 콜백
							$catchmentAreaMap.ui.getMyPositionCallback();
							// 내 위치 지도이동
							$catchmentAreaMap.ui.map.mapMove([$catchmentAreaMap.ui.my_x, $catchmentAreaMap.ui.my_y], 10);
							// 내 위치 정보 조회
							// $catchmentAreaMap.ui.setArea("ok");
						});					
					}
				});
			}else{
				$(".location__agree").show();
			}
		}else{
			// 위치동의 신규 또는 미동의.
			if(my_lc_info_agree_yn != "Y" ) { 
				// 팝업 표시
				$(".location__agree").show();
				
			}
			// 기존에 위치동의 완료.
			else { // /지도 현재위치로 이동
				$catchmentAreaMap.ui.getCurrentLocation(function(p_center, p_flag, p_msg, p_msg2) {
					if(p_flag == true) {
						// 변수 입력
						$catchmentAreaMap.ui.my_x = p_center[0];
						$catchmentAreaMap.ui.my_y = p_center[1];
						// 내 위치 조회 후 콜백
						
						// 변수 입력
						$catchmentAreaMap.ui.getCenterToAdmCd(p_center, function(res) {
							// 변수 입력
							$catchmentAreaMap.ui.my_location_yn = "Y";
							$catchmentAreaMap.ui.my_sido_cd = res.result.sido_cd;
							$catchmentAreaMap.ui.my_sido_nm = res.result.sido_nm;
							$catchmentAreaMap.ui.my_sgg_cd = res.result.sgg_cd;
							$catchmentAreaMap.ui.my_sgg_nm = res.result.sgg_nm;
							$catchmentAreaMap.ui.my_emdong_cd = res.result.emdong_cd;
							$catchmentAreaMap.ui.my_emdong_nm = res.result.emdong_nm;
							
							
							// 내 위치 조회 후 콜백
							$catchmentAreaMap.ui.getMyPositionCallback();
							// 내 위치 지도이동
							$catchmentAreaMap.ui.map.mapMove([$catchmentAreaMap.ui.my_x, $catchmentAreaMap.ui.my_y], 10);
							// 내 위치 정보 조회
							// $catchmentAreaMap.ui.setArea("ok");
						});					
					}
				});
				
			}
		}
		
	}


	/**
	 * @name : get_cookie
	 * @description : 쿠키 조회
	 * @date : 2020.06.09
	 * @author : 한광희
	 * @history :
	 * @param :
	 */
	function get_cookie(p_name) {
		var lvResultData = "";
		// ajax 시작
		$.ajax({
		    url: contextPath + "/m2019/login/getCookie.json",
		    type: 'post',
		    dataType : 'json',
		    async: false,
		    data: {
		    	name : p_name
		    },
		    beforeSend: function (xhr, settings) {
		    	var csrfSafeMethod = function(method) {
					return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
				}
				if (!sgisServiceApiRegexp.test(settings.url)&&!csrfSafeMethod(settings.type) && !this.crossDomain) {
					xhr.setRequestHeader("_csrf", "${_csrf.token}");
					if(settings.data){
						if(settings.data instanceof FormData){
							xhr.setRequestHeader("X-CSRF-TOKEN", csrf_token);
						}else{
							if(settings.data.indexOf(csrf_name+"=")==-1){
								settings.data+="&"+csrf_name+"="+csrf_token;
							}
						}
					}else{
						settings.data+=csrf_name+"="+csrf_token;
					}
				}
			}
		}).done(function (res) { // 완료
			if(res.errCd == "0") {
				lvResultData = res.result.resultData;
			}else if(res.errCd == "-401") {
				// common_alert(res.errMsg);
			}else{
				// common_alert(res.errMsg);
			}
		}).fail(function (res) { // 실패
			// common_alert(errorMessage);
		}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
			// common_loading(false);
		});
		// ajax 끝
		return lvResultData;
	}

	/**
	 * @name : set_cookie
	 * @description : 쿠키 저장
	 * @date : 2020.06.09
	 * @author : 한광희
	 * @history :
	 * @param :
	 */
	function set_cookie(p_name, p_value, p_expires_day) {
		// ajax 시작
		$.ajax({
		    url: contextPath + "/m2019/login/setCookie.json",
		    type: 'post',
		    dataType : 'json',
		    async: false,
		    data: {
		    	name : p_name,
		    	value : p_value,
		    	expires_day : p_expires_day
		    },
		    beforeSend: function (xhr, settings) {
		    	var csrfSafeMethod = function(method) {
					return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
				}
				if (!sgisServiceApiRegexp.test(settings.url)&&!csrfSafeMethod(settings.type) && !this.crossDomain) {
					xhr.setRequestHeader("_csrf", "${_csrf.token}");
					if(settings.data){
						if(settings.data instanceof FormData){
							xhr.setRequestHeader("X-CSRF-TOKEN", csrf_token);
						}else{
							if(settings.data.indexOf(csrf_name+"=")==-1){
								settings.data+="&"+csrf_name+"="+csrf_token;
							}
						}
					}else{
						settings.data+=csrf_name+"="+csrf_token;
					}
				}
			}
		});
		// ajax 끝
	}

	/**
	 * @name : remove_cookie
	 * @description : 쿠키 삭제
	 * @date : 2020.06.09
	 * @author : 한광희
	 * @history :
	 * @param :
	 */
	function remove_cookie(p_name) {
		// ajax 시작
		$.ajax({
		    url: contextPath + "/m2019/login/removeCookie.json",
		    type: 'post',
		    dataType : 'json',
		    async: false,
		    data: {
		    	name : p_name
		    },
		    beforeSend: function (xhr, settings) {
		    	var csrfSafeMethod = function(method) {
					return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
				}
				if (!sgisServiceApiRegexp.test(settings.url)&&!csrfSafeMethod(settings.type) && !this.crossDomain) {
					xhr.setRequestHeader("_csrf", "${_csrf.token}");
					if(settings.data){
						if(settings.data instanceof FormData){
							xhr.setRequestHeader("X-CSRF-TOKEN", csrf_token);
						}else{
							if(settings.data.indexOf(csrf_name+"=")==-1){
								settings.data+="&"+csrf_name+"="+csrf_token;
							}
						}
					}else{
						settings.data+=csrf_name+"="+csrf_token;
					}
				}
			}
		});
		// ajax 끝
	}
	

	// 광역시,도 선택시 시군구 선택 버튼 생성
	$(document).on("click", ".sido_btn", function(){
		$(".sgg-group *").remove();
		var p_sgg_cd = $(".option__btn.selected").val();
		var p_sido_cd = $(this).val();
		
		// ajax 시작
		$.ajax({
		    url: openApiPath + "/OpenAPI3/addr/stageWR.json?",
		    type: 'get', // api는 get으로 받아야함
		    dataType : 'json',
		    async: false,
		    data: {
		    	accessToken: accessToken,
		    	pg_yn: "0",
		    	cd: p_sido_cd,
		    	bnd_year: bndYear
		    }
		}).done(function (res) { // 완료
			if(res.errCd == "0") {
				var lvResultList = res.result;
				for(var i = 0; i < lvResultList.length; i++) {
					if(lvResultList[i].cd.slice(-3) == p_sgg_cd) {
						//2022-10-13 [송은미] 관심지역변경 팝업 수정 및 추가
						//$(".sgg-group").append("<button type = 'button' class = 'option__btn sgg_btn' value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\"  >"+lvResultList[i].addr_name + " </button>");
						$(".sgg-group").append("<button type = 'button' style='min-width: auto; width:33.3%; float:left; margin:0; box-sizing:border-box; height:40px; color:##4f4f4f; border-radius: 0; border: 1px solid #e5e5e5; margin:-1px 0 0 -1px; " +
											"font-size: 12px;' class = 'option__btn sgg_btn' value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\"  >"+lvResultList[i].addr_name + " </button>");
					}
					else {
						if(lvResultList[i].addr_name == "서구"){
							//$(".sgg-group").append("<button type = 'button' class = 'option__btn sgg_btn selected' value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\"  >"+lvResultList[i].addr_name + " </button>");
							$(".sgg-group").append("<button type = 'button' style='min-width: auto; width:33.3%; float:left; margin:0; box-sizing:border-box; height:40px; color:##4f4f4f; border-radius: 0; border: 1px solid #e5e5e5; margin:-1px 0 0 -1px; " +
											"font-size: 12px;' class = 'option__btn sgg_btn selected' value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\"  >"+lvResultList[i].addr_name + " </button>");
						}else{
							//$(".sgg-group").append("<button type = 'button' class = 'option__btn sgg_btn' value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\"  >"+lvResultList[i].addr_name + " </button>");
							$(".sgg-group").append("<button type = 'button' style='min-width: auto; width:33.3%; float:left; margin:0; box-sizing:border-box; height:40px; color:##4f4f4f; border-radius: 0; border: 1px solid #e5e5e5; margin:-1px 0 0 -1px; " +
											"font-size: 12px;' class = 'option__btn sgg_btn' value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\"  >"+lvResultList[i].addr_name + " </button>");
						}
					}
				}
				$(".sgg-group").append("<p class='my-5px notice' style= 'color: #d43212; display: none;' ><img src='/mobile/resources/m2021/images/i_notice--red.png' alt='광역시·도와 시·군·구는 기본 선택 조건입니다.'>광역시·도와 시·군·구는 기본 선택 조건입니다.</p>");
			}else if(res.errCd == "-401") {
				/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 START */
				accessTokenInfo(function(){
					sggCdSelect(p_sido_cd, p_sgg_cd);
				});
				/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 END */
				// common_alert(res.errMsg);
			}else{
				// common_alert(res.errMsg);
			}
		}).fail(function (res) { // 실패
			/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 START */
			accessTokenInfo(function(){
				sggCdSelect(p_sido_cd, p_sgg_cd);
			});
			/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 END */
			// common_alert(errorMessage);
		}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
			// common_loading(false);
// //시 도 선택시 시 군 구 첫번쨰 주소가 자동 선택되게하기.
			if(p_sido_cd != 25){				
				$('#sgg').children('button').first().trigger('click');								
			}	
		});
		// ajax 끝
	});
	
	
	
	// 시,군,구 선택시 해당 읍,면,동 가져오는 function
	$(document).on("click", ".sgg_btn", function(){
		var p_sgg_cd = "sgg";
		var p_sido_cd = $(this).val().slice(0,2);
		var p_emdong_cd = $(this).val();
		//2022-10-13 [송은미] 관심지역변경 팝업 수정 및 추가
		//$("#emdong_select option").remove();		
		$("#emdong").empty();
/*		$(".sidoContainer").css("display","none");
		$(".sggContainer").css("display","none");
		$(".emdongContainer").css("display","block");*/
		
		$.ajax({
		    url: openApiPath + "/OpenAPI3/addr/stageWR.json?",
		    type: 'get', // api는 get으로 받아야함
		    dataType : 'json',
		    async: false,
		    data: {
		    	accessToken:accessToken,
		    	pg_yn: "0",
		    	cd: p_emdong_cd,
		    	bnd_year: bndYear
		    }
		}).done(function (res) { // 완료
			if(res.errCd == "0") {
				var lvResultList = res.result;
				// 디폴트값 없이 리스트 출력
				//2022-10-13 [송은미] 관심지역변경 팝업 수정 및 추가
//				$("#emdong_select").append('<option value="'+0+'">'+'읍·면·동 선택'+'</option>');
				for(var i = 0; i < lvResultList.length; i++) {
					if(lvResultList[i].cd.slice(-2) == p_emdong_cd) {
						//$("#emdong_select").append("<option value=\""+lvResultList[i].cd.slice(-2)+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\"  >"+lvResultList[i].addr_name+"</option>");
						$("#emdong").append("<button type = 'button' style='min-width: auto; width:33.3%; float:left; margin:0; box-sizing:border-box; height:40px; color:##4f4f4f; border-radius: 0; border: 1px solid #e5e5e5; margin:-1px 0 0 -1px; " +
											"font-size: 12px;' class = 'option__btn emdong_btn' value=\""+lvResultList[i].cd.slice(-2)+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\"  >"+lvResultList[i].addr_name + " </button>");
					}
					else {
						//$("#emdong_select").append("<option value=\""+lvResultList[i].cd.slice(-2)+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\"  >"+lvResultList[i].addr_name+"</option>");
						$("#emdong").append("<button type = 'button' style='min-width: auto; width:33.3%; float:left; margin:0; box-sizing:border-box; height:40px; color:##4f4f4f; border-radius: 0; border: 1px solid #e5e5e5; margin:-1px 0 0 -1px; " +
											"font-size: 12px;' class = 'option__btn emdong_btn' value=\""+lvResultList[i].cd.slice(-2)+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\"  >"+lvResultList[i].addr_name + " </button>");
					}
				}
			}else if(res.errCd == "-401") {
				/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 START */
				accessTokenInfo(function(){
				});
				/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 END */
				// common_alert(res.errMsg);
			}else{
				// common_alert(res.errMsg);
			}
		}).fail(function (res) { // 실패
			/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 START */
			accessTokenInfo(function(){
			});
			/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 END */
			// common_alert(errorMessage);
		}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
			// common_loading(false);
		});
		// ajax 끝
	});
	
	
	// 위치 허용 function
	$(document).on("click", "#catchmentareamyLocation", function() {
		
		common_localtion(
				// 지도변수
				$catchmentAreaMap.ui.map,
				// 위치 동의함
				function(my_x, my_y, my_sido_cd, my_sido_nm, my_sgg_cd, my_sgg_nm, my_emdong_cd, my_emdong_nm) {
					// 변수 입력
					$catchmentAreaMap.ui.my_x = my_x;
					$catchmentAreaMap.ui.my_y = my_y;
					$catchmentAreaMap.ui.my_sido_cd = my_sido_cd;
					$catchmentAreaMap.ui.my_sido_nm = my_sido_nm;
					$catchmentAreaMap.ui.my_sgg_cd = my_sgg_cd;
					$catchmentAreaMap.ui.my_sgg_nm = my_sgg_nm;
					$catchmentAreaMap.ui.my_emdong_cd = my_emdong_cd;
					$catchmentAreaMap.ui.my_emdong_nm = my_emdong_nm;
					
					$catchmentAreaMap.ui.searchAdmCd = my_sido_cd+my_sgg_cd+my_emdong_cd;
					// 내 위치 텍스트
					$("#currentMapMyLocation_name").text($catchmentAreaMap.ui.my_sido_nm+" "+$catchmentAreaMap.ui.my_sgg_nm+" "+$catchmentAreaMap.ui.my_emdong_nm);
					$catchmentAreaMap.ui.map.mapNavigation.move();
				}
				,
				// 위치 미동의함
				function(){
					
				}
			);
	
		});
	
	$(document).on("click", "#searchPoi", function() { // 지도에서 지점 선택 버튼
		srvLogWrite('O0', '12', '03', '01', '', '');
		$('#map__spot__tooltip').hide();
		if($("#searchPoi").hasClass("active")){
			$catchmentAreaMap.ui.useMarker = false;
			$("#searchPoi").removeClass("active");
			$('#map').removeClass('selMapIco');			
		}else{
			$("#searchPoi").addClass("active");
		
			var map = $catchmentAreaMap.ui.getMap(0);
			if(map.zoom == 0 || map.zoom == 1 || map.zoom == 2 || map.zoom == 3){
				alert("현재 지도레벨에서는 정확한 지점 선택할 수 없습니다. 지도를 확대한 다음 다시 지점을 선택해주세요.");
				$("#searchPoi").removeClass("active");
				return false;
			}else{
				$catchmentAreaMap.ui.useMarker = true;
				$('#map').addClass('selMapIco');
			}
		}
	});
	
	$(document).on("click", "#searchPoi_restart", function() {
		srvLogWrite('O0', '12', '03', '01', '재선택', '');
		if($("#searchPoi_restart").hasClass("active")){
			$("#searchPoi_restart").removeClass("active");
		}else{
			$("#searchPoi_restart").addClass("active");
		}
		$('#restart_select_popup').show();
	});
	
	$(document).on("click", "#restart_submit", function() {
		$catchmentAreaMenu.ui.clearLayers(0);
		$catchmentAreaMenu.ui.backBtn_common(1);
		$catchmentAreaMap.ui.map.markers.clearLayers();
		$catchmentAreaMap.ui.map.markers2.clearLayers();

		$("#menu_1").addClass("active");
		$("#setting_info_display").css("display","none");
		$("#back_btn").hide();
		$("#searchPoi_restart").hide();
		$(".notice").hide();
		$('#searchPoi_restart').removeClass('active');
		$('#restart_select_popup').hide();
		$(".map__result__tit > p").text("지점 선택");
		$(".map__result__tit > h3").text("통계를 조회할 지점을 선택해 주십시오.");
		$("#searchPoi").show();
		$('#search_text_previous').val('');
		$('.slide_up').css('display','block');
		$catchmentAreaMenu.ui.search_accuracy_list_search = [];
		$catchmentAreaMenu.ui.search_accuracy_list = [];
		if(get_cookie("lc_info_agree_yn") == 'Y'){
			$('#catchmentareamyLocation').trigger('click');
		}
	});
	
	$(document).on("click", "#restart_cancel", function() {
		$('#searchPoi_restart').removeClass('active');
		$("#restart_select_popup").css("display","none");
	});
	
	
	$(document).on("click", "#option_clear", function() {
		// 초기화시 대전, 서구 디폴트값 변경
		$('#sido button[value=25]').trigger("click");
		$('#sgg button[value=25030]').trigger("click");
		
	});
	// 지도에서 지점 선택 취소 버튼
	$(document).on("click", "#cancelPoiButten", function() {
		$catchmentAreaMap.ui.map.markers.clearLayers(); // 마커 초기화
		$('.point__list *').remove();
	    $('.point__select').stop().fadeOut(0);
	});

	$(document).on("click", "#radius_standard_submit", function() {
		if($('#default_type_select button.on').val() == 0){
    		$('#stats03').trigger('click');
    	}else if($('#default_type_select button.on').val() == 1){
    		$('#stats03_grid').trigger('click');
    	}
    	$('#information_check').trigger('click');
		$('#radius_standard_yesorno').hide();
	});
	
	$(document).on("click", "#radius_standard_cancel", function() {
		$catchmentAreaMenu.ui.clearLayers();
		$('#back_btn').trigger('click');
		
	});
	
	// 조회 조건 적용
	$(document).on("click", "#option_apply", function() {
		
			// 변수 입력
			/*$catchmentAreaMap.ui.my_location_yn = "Y";
			$catchmentAreaMap.ui.my_sido_cd = $('.sido_btn.selected').val();
			$catchmentAreaMap.ui.my_sido_nm = $('.sido_btn.selected').text();
			$catchmentAreaMap.ui.my_sgg_cd = $('.sgg_btn.selected').val();
			$catchmentAreaMap.ui.my_sgg_nm = $('.sgg_btn.selected').text();*/
			$catchmentAreaMap.ui.my_location_yn = "Y";
			$catchmentAreaMap.ui.my_sido_cd = $("#popupArea_sido option:selected").val();
			$catchmentAreaMap.ui.my_sido_nm = $("#popupArea_sido option:selected").text();
			$catchmentAreaMap.ui.my_sgg_cd = $("#popupArea_sgg option:selected").val();
			$catchmentAreaMap.ui.my_sgg_nm = $("#popupArea_sgg option:selected").text();
			$catchmentAreaMap.ui.my_emdong_cd = $("#popupArea_emdong option:selected").val();
			$catchmentAreaMap.ui.my_emdong_nm = $("#popupArea_emdong option:selected").text();
			//2022-10-13 [송은미] 관심지역변경 팝업 수정 및 추가
			/*if(($("#emdong_select option:selected").val() == undefined && ($('.sgg_btn.selected').val() != undefined) || ($('#emdong_select option:selected').val() == '0'))){*/
			if(($("#popupArea_emdong option:selected").val() == undefined && ($('#popupArea_sgg option:selected').val() != undefined) || ($('#popupArea_emdong option:selected').val() == '0'))){
				srvLogWrite('O0', '12', '02', '02', $catchmentAreaMap.ui.my_sido_nm+" "+$catchmentAreaMap.ui.my_sgg_nm, '');
				$catchmentAreaMap.ui.my_emdong_cd = "99";
				$catchmentAreaMap.ui.my_emdong_nm = " ";
				$catchmentAreaMap.ui.my_x = $('.sgg_btn.selected').attr("data-x");
				$catchmentAreaMap.ui.my_y = $('.sgg_btn.selected').attr("data-y");
				// 내 위치 조회 후 콜백
				$catchmentAreaMap.ui.getMyPositionCallback();
				// 내 위치 지도이동
				$catchmentAreaMap.ui.map.mapMove([$catchmentAreaMap.ui.my_x, $catchmentAreaMap.ui.my_y], 7);
				$('.option').stop().animate({'right':'-100%'},500);
			/*}else if($("#emdong_select option:selected").val() == undefined && $('.sgg_btn.selected').val() == undefined) {*/
			}else if($("#popupArea_emdong option:selected").val() == undefined && $('#popupArea_sgg option:selected').val() == undefined) {	
				  $('#sgg > p').show();
				return
			}else{
				//2022-10-13 [송은미] 관심지역변경 팝업 수정 및 추가
				$catchmentAreaMap.ui.my_emdong_cd = $("#popupArea_emdong option:selected").val();
				$catchmentAreaMap.ui.my_emdong_nm = $("#popupArea_emdong option:selected").text();
				$catchmentAreaMap.ui.my_x = $("#popupArea_emdong option:selected").attr("data-x");
				$catchmentAreaMap.ui.my_y = $("#popupArea_emdong option:selected").attr("data-y");
				
/*				$catchmentAreaMap.ui.my_emdong_cd = $("#emdong_select option:selected").val();
				$catchmentAreaMap.ui.my_emdong_nm = $("#emdong_select option:selected").text();
				$catchmentAreaMap.ui.my_x = $("#emdong_select option:selected").attr("data-x");
				$catchmentAreaMap.ui.my_y = $("#emdong_select option:selected").attr("data-y");*/
				
/*				$catchmentAreaMap.ui.my_emdong_cd = $("#emdong button.selected").val();
				$catchmentAreaMap.ui.my_emdong_nm = $("#emdong button.selected").text();
				$catchmentAreaMap.ui.my_x = $("#emdong button.selected").attr("data-x");
				$catchmentAreaMap.ui.my_y = $("#emdong button.selected").attr("data-y");
				srvLogWrite('O0', '12', '02', '02', $catchmentAreaMap.ui.my_sido_nm+" "+$catchmentAreaMap.ui.my_sgg_nm+" "+$catchmentAreaMap.ui.my_emdong_nm, '');
*/				
				// 내 위치 조회 후 콜백
				$catchmentAreaMap.ui.getMyPositionCallback();
				// 내 위치 지도이동
				$catchmentAreaMap.ui.map.mapMove([$catchmentAreaMap.ui.my_x, $catchmentAreaMap.ui.my_y], 10);
				$('.option').stop().animate({'right':'-100%'},500);

			}
			//2022-10-13 [송은미] 관심지역변경 팝업 수정 및 추가
/*			var a = $("#emdong_select option[class ='selected']").val();
			var b = $(".sido_btn.selected").val();*/
			//2022-11-02 관심지역변경 팝업 수정 및 추가
			var a = $("#popupArea_emdong option:selected").val();
			var b = $("#popupArea_sido option:selected").val();
			$(".popBack").css("display","none");
			//2022-12-22 관심지역변경 팝업 수정
//			$("#catchmentAreamap_option_setting_board").css("display","none");
			$("#common_popup_area").css("display","none");
			
			
	});	
	
	$(document).on("click", "#mylocationaccept", function() {
		set_cookie("lc_info_agree_yn", "Y", 365);
		$catchmentAreaMap.ui.location_agree = true;
		$('.location__agree').hide();
		$('#catchmentareamyLocation').trigger('click');
	});
	
	$(document).on("click", "#mylocationcancel", function() {
		$catchmentAreaMap.ui.location_agree = false;
		$('.location__agree').hide();
	});
	
/*	$(document).on("click", ".sido-group button", function() {
		$('.sido-group button').removeClass("selected");
		$(this).addClass("selected");
		//2022-10-13 [송은미] 관심지역변경 팝업 수정 및 추가
		$(".valueSido").html($(this).text());
		$(".sidoContainer").css("display","none");
		$(".sggContainer").css("display","block");
		$(".emdongContainer").css("display","none");
	});

	$(document).on("click", ".sgg-group button", function() {
		$('.sgg-group button').removeClass("selected");		
		$(this).addClass("selected");
		//2022-10-13 [송은미] 관심지역변경 팝업 수정 및 추가
		$(".valueSgg").html($(this).text());
	});*/
	
	//2022-10-13 [송은미] 관심지역변경 팝업 수정 및 추가
	/*$(document).on("click", "#emdong_select", function() {
		$("#emdong_select").find("option").removeClass("selected");
		 $("option:selected", this).addClass("selected");
	});*/
	
/*	$(document).on("click", "#emdong button", function() {
		$("#emdong button").removeClass("selected");
		$(this).addClass("selected");
		$(".valueEmd").html($(this).text());
	});*/

	$(document).on("click", "#point__submit", function() {
		$catchmentAreaMap.ui.map.markers2.clearLayers(); // 검색된 마커 초기화
		
		$catchmentAreaMap.ui.creatSearchPoiMarker($catchmentAreaMap.ui.MarKer_name,$catchmentAreaMap.ui.MarKer_roadAdres,$catchmentAreaMap.ui.my_x,$catchmentAreaMap.ui.my_y);
		$('#stats01').trigger('click');
		$('#stats01_grid').trigger('click');
 	    var locInfos = $(this).attr("value").split("/");
		$("#menu_1").css("display", "none");
		$("#menu_1").removeClass("active");
		$("#menu_2").css("display", "none");
		$("#menu_2").removeClass("active");
		$("#menu_4").css("display", "none");
		$("#menu_4").removeClass("active");
		$("#menu_3").css("display", "block");
		$("#menu_3").addClass("active");
		var height =  $(window).height()*0.45;
		$(".modal.point__confirm").css("display","block");
		$("#information_check").show();
		$('#slide-area .btn-slideup span').hide();
		
		var address = $("#point__submit").val();
		$catchmentAreaMenu.ui.selectCoordinate_x = locInfos[0];
		$catchmentAreaMenu.ui.selectCoordinate_y = locInfos[1];
		$catchmentAreaMenu.ui.getSrvareaScopeList(locInfos[0], locInfos[1]); // 기준
																				// 선택
																				// 세팅
		$('.slide_down').css("display","block");
		$('.map__result__tit p').text('생활권역 설정');
		$('.map__result__tit h3').text(address.split('/')[2]);
		$(".map__search").animate({
            'height' : '95%'
        },400,function(){
        	$(".map__slideup").prop("style","box-shadow: none;");
            $(".swiper_menu.active").css("display", "block");
        });
		
		$(".map__below").animate({
            'height' : '90%'
        },400,function(){
        	$(".map__slideup").prop("style","box-shadow: none;");
            $(".swiper_menu.active").css("display", "block");
        });       
		 
		$(".modal.point__confirm").hide();

	});
	
	$(document).on("click", "#submitPoiButten", function() {
		
		$catchmentAreaMenu.ui.clearLayers();
		$catchmentAreaMap.ui.map.markers.clearLayers();
		$('#fixed_selected').trigger('click');
		$('#grid_fixed_selected').trigger('click');
		var selLoc = "";
		var select_x = "";
		var select_y = "";
		var address = "";
		var road_address = "";
		if($("input[name='sel_addr1']:checked").attr("id") == "sel_addr1"){
			srvLogWrite('O0', '12', '04', '01', '주소 선택', '');
			select_x = $(".point__con.point__address").attr("value").split("/")[0];
			select_y = $(".point__con.point__address").attr("value").split("/")[1];
			address = $("#address_name").text();
			road_address = $("#road_name").text();
		}else if ($("input[name='sel_addr2']:checked").attr("id") == "sel_addr2"){
			srvLogWrite('O0', '12', '04', '01', '시설 선택', '');
			if($(".point__list li .active").attr("value") == undefined || $(".point__list li .active").attr("value") == "" || $(".point__list li .active").attr("value") == null){
				return;
			}
			select_x = $(".point__list li .active").attr("value").split("/")[0];
			select_y = $(".point__list li .active").attr("value").split("/")[1];
			address = $(".point__list li .active").text();
			road_address = $("#road_name").text();
		}
		$catchmentAreaMenu.ui.selectCoordinate_x = select_x;
		$catchmentAreaMenu.ui.selectCoordinate_y = select_y;
	    $catchmentAreaObj.setSelectedLoc(select_x, select_y, 'M2', "");
  	    $catchmentAreaObj.tobeSelected_locNm = selLoc;
  	    
		$catchmentAreaMap.ui.creatSearchPoiMarker(address,road_address,select_x,select_y);
		$('#back_btn').show();

		if(select_x == "" || select_y == "" || address == ""){
			alert("다시 시도해주세요."); 
		}else{
			$("#setting_info_display").css("display", "none");
			$('#stats01').trigger('click');
			$('#stats01_grid').trigger('click');
			$("#menu_1").css("display", "none");
			$("#menu_1").removeClass("active");
			$("#menu_2").css("display", "none");
			$("#menu_2").removeClass("active");
			$("#menu_4").css("display", "none");
			$("#menu_4").removeClass("active");
			$("#menu_3").css("display", "block");
			$("#menu_3").addClass("active");
			var height =  $(window).height()*0.35;
			
			$("#information_check").show();
		
			$catchmentAreaMenu.ui.getSrvareaScopeList(select_x, select_y); // 기준
																			// 선택
																			// 세팅
			
			$('.map__result__tit p').text('생활권역 설정');
			$('.map__result__tit h3').text(address);// 주소
			$('.map__result__tit h3').attr("value",select_x + "/" + select_y);
			$('#slide-area .btn-slideup span').hide();
			
			$(".map__search").animate({
				'height' : '95%'
			},400,function(){
				$(".map__slideup").prop("style","box-shadow: none;");
				$(".swiper_menu.active").css("display", "block");
			});
			
			$(".map__below").animate({
				'height' : '90%'
			},400,function(){
				$(".map__slideup").prop("style","box-shadow: none;");
				$(".swiper_menu.active").css("display", "block");
			});       
			$('.slide_down').css("display","block");
			$(".modal.point__confirm").hide();
		
		}
		$('.modal').hide();
		$('.dim').hide();
	});
	
	$(document).on("click", "#point__cancel", function() {
		$(".modal.point__confirm").css("display","none");
	});
	
	
	// 지점 선택 라디오 버튼
	$(document).on("click", "#sel_addr1", function() {
		$("input:radio[name = 'sel_addr1']").prop('checked',true);
		$("input:radio[name = 'sel_addr2']").prop('checked',false);
	});
	
	$(document).on("click", "#sel_addr2", function() {	
		$("input:radio[name = 'sel_addr1']").prop('checked',false);
		$("input:radio[name = 'sel_addr2']").prop('checked',true);
	});
	
	$(document).on("click", ".point__list > li > a", function() {
		$("input:radio[name = 'sel_addr1']").prop('checked',false);
		$("input:radio[name = 'sel_addr2']").prop('checked',true);		
		$(".point__list li *").removeClass("active");
		$(this).addClass("active");
	});

	
	
	/** ********* 포인트검색에 따른 시설물 검색 Start ********* */

	(function () {
		$class("sop.portal.sopPortalgetPtFcltsList.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				result = res.result;

				if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
					options.callback.call(undefined, result);
				}
			},
			onFail : function (status) {
				
			}
		});
	}());
	/** ********* 포인트검색에 따른 시설물 검색 End ********* */
	(function() {
	    $class("gis.service.divisionVerifyRouteServiceAreaUsingOA.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
		    	console.log("gis.service.divisionVerifyRouteServiceAreaUsingOA.api 호출");
		    	console.log(res);

				if (res.errCd == "0") {
					
					if(options.mapId === 0){
						$catchmentAreaObj.setGeometryInfo(res.result, options);						
					}else if(options.mapId === 1){
						$catchmentAreaObj.setTargetGeometryInfo(res.result, options);						
					}else if(options.mapId === 99){
						$catchmentAreaObj.setGeometryInfo(res.result, options);	
							return;
					}

					var that = $catchmentAreaMap.ui.getMap(options.mapId);
					var resData = JSON.parse(res.result);
					if(resData.hasOwnProperty('error') || resData.saPolygons.features.length == 0){
						// 네트워크 정보가 없어서 400 리턴
						$('#radius_standard_yesorno').show();
						return;
					}
					
					// 조정하였던 범위값 원복
	        		if(options.params.rangeType === "T"){		// rangeType :
																// T(주행시간),
																// D(주행거리)
	        			$catchmentAreaMap.ui.restoreRangeValue('T', resData);
	        		}else if(options.params.rangeType === "D"){
	        			$catchmentAreaMap.ui.restoreRangeValue('D', resData);
	        		}					

					var result = resData.saPolygons.features;
					var drawObj = null;
					if(options.mapId === 0) {
						drawObj = $catchmentAreaMap.draw; // draw해야함
						$catchmentAreaMenu.ui.boundarySize_1 = Math.round(result[0].attributes.Shape_Area);	// boundarySize_1
																											// 는 오직
																											// 상세분석의
																											// 좌측지도(기존지도)에
																											// 격자
																											// 생성시에
																											// 참고하는
																											// 변수다.
																											// 그외에서는
																											// 사용되지
																											// 않는
																											// 변수다.
																											// 남용 X
						
						if($catchmentAreaMenu.ui.report_clear){					
							$catchmentAreaMap.ui.mapList = options.params.selectIdx.params.mapList;
							console.log($catchmentAreaMap.ui.mapList);
							drawObj = $catchmentAreaReport.draw;
						}
					}
		        	var polygonPointsArr = []; // 선택된영역
		        	
		        	// console.log(result);
		        	shapeOptions = [{
		        		stroke : true,
		        		weight : 1.5,
		        		opacity : 0.7,
		        		fill : true,
		        		fillColor : $catchmentAreaMap.ui.saShpColor[3],
		        		fillOpacity : 0.3,
		        		color : $catchmentAreaMap.ui.saShpColor[3],
		        		clickable : true
		        	},{
		        		stroke : true,
		        		weight : 1.5,
		        		opacity : 0.7,
		        		fill : true,
		        		fillColor : $catchmentAreaMap.ui.saShpColor[2],
		        		fillOpacity : 0.3,
		        		color : $catchmentAreaMap.ui.saShpColor[2],
		        		clickable : true
		        	},{
		        		stroke : true,
		        		weight : 1.5,
		        		opacity : 0.7,
		        		fill : true,
		        		fillColor : $catchmentAreaMap.ui.saShpColor[1],
		        		fillOpacity : 0.3,
		        		color : $catchmentAreaMap.ui.saShpColor[1],
		        		clickable : true
		        	},{
		        		stroke : true,
		        		weight : 1.5,
		        		opacity : 0.7,
		        		fill : true,
		        		fillColor : $catchmentAreaMap.ui.saShpColor[0],
		        		fillOpacity : 0.3,
		        		color : $catchmentAreaMap.ui.saShpColor[0],
		        		clickable : true
		        	}];

		        	var outerBounds;
		        	$.each(result, function(index, item){
		        		var pointArr = [];
		        		var maxIndex  = null;
			        	var maxLength = null;
		        		$.each(result[index].geometry.rings,function(index, item){
		        			if(maxIndex == null){
		        				maxIndex = index;
		        				maxLength = item.length;
		        			}else{
		        				if(maxLength < item.length){
		        					maxIndex = index;
		        					maxLength = item.length;
		        				}
		        			}
		        		});
		        		var polygonPoints = item.geometry.rings[maxIndex];
		        		polygonPointsArr.push(polygonPoints);
		        		
		        		for(var x=0; x < polygonPoints.length; x++){
			        		var xPoint = polygonPoints[x][0];
			        		var yPoint = polygonPoints[x][1];
			        		
			        		var point = sop.point(xPoint, yPoint);
			        		
			        		pointArr.push(point);
			        	}
		        		
		        		var colorIdx = index + (shapeOptions.length - result.length);
		        		if(options.params.selectIdx !== undefined && options.params.areaMins.length === 1){
		        			// 상세분석에서 한개의 도형만 요청한 경우(도형 색상이 순서대로 지정되지않고, 범위선택 버튼
							// 따라가야하는 경우는 이것뿐임)
		        			colorIdx = shapeOptions.length - Number(options.params.selectIdx) - 1;
		        		}

		        		drawObj._polygon = new sop.Polygon(pointArr, shapeOptions[colorIdx]);
			        	drawObj._polygonGroup.addLayer(drawObj._polygon);
			        	
			        	drawObj._polygon.on({
							click : function (e) {
								var geoData = {};
								geoData.rangeType = options.params.rangeType;
								geoData.rangeVal = result[index].attributes.ToBreak;
								$catchmentAreaMap.callbackFunc.didMouseClickPolygon(e, geoData, 'saShp', that);
							}
						});			        	

			        	if(index == 0){
			        		outerBounds = drawObj._polygon.getBounds();
			        	}
		        	});
		        	
		        	drawObj.polygon();
		        	if(outerBounds != undefined && outerBounds != null){
		        		drawObj.map.gMap.fitBounds(outerBounds);
		        	}
		        	

		        	// detailOpen 사용 이유: 상세분석을 할 때도 현재 이 메소드가 실행되고, 좌측, 우측 지도에
					// "1개"의 도형을 그린다. 그러므로 polygonPointsArr의 길이가 1짜리인 배열이 오고
		        	// 이것을 $catchmentAreaLeftMenu.ui.selectPolygonPointsArr에
					// 넣으면, 기존에
					// $catchmentAreaLeftMenu.ui.selectPolygonPointsArr에 있는 길이가
					// 2이상인 배열은 더 사용을 못한다.
		        	// 이게 문제가 되는 유스케이스는 [ 통계정보 보기 > 상세분석에서 도형 그림 > 격자로 넘어가서 동그라미
					// 조건(ex:5분, 10분)을 클릭 ].
		        	// 이를 방지하기 위해서 상세분석 기능을 사용 중인 것을 의미하는 detailOpen 변수를 추가하고,
					// if 조건문에 사용한다.
		        	if(options.mapId === 0 ) { $catchmentAreaMenu.ui.selectPolygonPointsArr = polygonPointsArr; }
		        	
		        	var chkMsg = $catchmentAreaMenu.ui.prechkForReqGridStat();
		        	
		        	if($('#default_type_select button.on').val() == 0){
		        		srvLogWrite('O0', '12', '04', '04', '영역 내 정보 조회', '');
		        		$('#menu_4_button button').eq(0).trigger('click');
		        		$('#statistics_check_btn').trigger('click');
		        	}else if($('#default_type_select button.on').val() == 1){
		        		srvLogWrite('O0', '12', '04', '04', '격자 분포 조회', '');
		        		var base_year = $catchmentAreaMap.ui.getBaseYear('4');
				    	var range = $catchmentAreaMenu.ui.getRangeType();
				    	$catchmentAreaMenu.ui.settingGridAreaMap(base_year, range);
		        	}
		
		        	
				} else if (res.errCd == "-401") {

				} else {
					// messageAlert.open("알림", res.errMsg);
					messageAlert.open("알림", "네트워크 분석 서비스가 원할하지 않습니다.<br/>잠시 후 다시 이용해 주세요.");
				}	        	
	
	        },
	        onFail : function(status) {
	        }
	    });
	}());	
	/** ********* ArcGIS Server Route Service Area 조회 End ********* */
	/** ********* ArcGIS Server Route Service Area 조회 Start ********* */
	(function() {
	    $class("gis.service.divisionVerifyRouteServiceArea.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
		    	console.log("gis.service.divisionVerifyRouteServiceArea.api 호출!!!!");
		    	console.log(res);
		    	var result = res.saPolygons.features;
	        	var drawObj = $catchmentAreaMap.draw;
	        	var polygonPointsArr = []; // 선택된영역
	        	
	        	console.log(result);
	        	shapeOptions = [{
	        		stroke : true,
	        		weight : 2,
	        		opacity : 0.9,
	        		fill : true,
	        		fillColor : null,
	        		fillOpacity : 0.2,
	        		color : '#0070C0',		// FFC6D7
	        		clickable : true
	        	},{
	        		stroke : true,
	        		weight : 2,
	        		opacity : 0.9,
	        		fill : true,
	        		fillColor : null,
	        		fillOpacity : 0.2,
	        		color : '#D887E8',		// FFC6D7
	        		clickable : true
	        	},{
	        		stroke : true,
	        		weight : 2,
	        		opacity : 0.9,
	        		fill : true,
	        		fillColor : null,
	        		fillOpacity : 0.2,
	        		color : '#70AD47',		// D6FFC6
	        		clickable : true
	        	},{
	        		stroke : true,
	        		weight : 2,
	        		opacity : 0.9,
	        		fill : true,
	        		fillColor : null,
	        		fillOpacity : 0.2,
	        		color : '#FFAA01',		// E7CF70
	        		clickable : true
	        	}];

	        	$.each(result, function(index, item){
	        		var pointArr = [];
	        		var maxIndex  = null;
		        	var maxLength = null;
	        		$.each(result[index].geometry.rings,function(index, item){
	        			if(maxIndex == null){
	        				maxIndex = index;
	        				maxLength = item.length;
	        			}else{
	        				if(maxLength < item.length){
	        					maxIndex = index;
	        					maxLength = item.length;
	        				}
	        			}
	        		});
	        		var polygonPoints = item.geometry.rings[maxIndex];
	        		polygonPointsArr.push(polygonPoints);
	        		
	        		for(var x=0; x < polygonPoints.length; x++){
		        		var xPoint = polygonPoints[x][0];
		        		var yPoint = polygonPoints[x][1];
		        		
		        		var point = sop.point(xPoint, yPoint);
		        		
		        		pointArr.push(point);
		        	}
	        		drawObj._polygon = new sop.Polygon(pointArr, shapeOptions[index]);
		        	drawObj._polygonGroup.addLayer(drawObj._polygon);
	        	});
	        	
	        	drawObj.polygon();
	        	
	        	$catchmentAreaMenu.ui.selectPolygonPointsArr = polygonPointsArr; 

	        	var that = $catchmentAreaMap.ui; 			
        		
	        },
	        onFail : function(status) {
	        }
	    });
	}());
	
}(window, document));

// common 기능
function makeRandomThirtySevenDigitString () {
	var front = makeRandomDigitString(10);
	var currentdate = new Date();
	var timestamp = makeStamp(currentdate);
	var end = makeRandomDigitString(10);
	
	return front + timestamp + end;
}

function makeRandomDigitString (x) {
	var s = "";
	while (s.length < x && x > 0) {
		var r = Math.random();
		s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
	}
	return s;
}

//2022-11-02 이벤트 추가
$(document).on("click", "#currentMapMyLocation_name", function(){
	common_area(
		"emdong",	// 관심지역 표출 범위
		$catchmentAreaMap.ui.my_sido_cd,
		$catchmentAreaMap.ui.my_sgg_cd,
		$catchmentAreaMap.ui.my_emdong_cd,
		// 변경
		function(x_coor, y_coor, sido_cd, sido_nm, sgg_cd, sgg_nm, emdong_cd, emdong_nm) {
			//변수 입력
			$catchmentAreaMap.ui.my_x = x_coor;
			$catchmentAreaMap.ui.my_y = y_coor;
			$catchmentAreaMap.ui.my_sido_cd = sido_cd;
			$catchmentAreaMap.ui.my_sido_nm = sido_nm;
			$catchmentAreaMap.ui.my_sgg_cd = sgg_cd;
			$catchmentAreaMap.ui.my_sgg_nm = sgg_nm;
			$catchmentAreaMap.ui.my_emdong_cd = emdong_cd;
			$catchmentAreaMap.ui.my_emdong_nm = emdong_nm;
//					$currentMap.ui.mapStat.indicator.adm_cd = sido_cd+sgg_cd;
			
			//내 위치 텍스트
			var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>'; // 2022.09.26 송은미 svg 추가
			$("#currentMapMyLocation_name").html($catchmentAreaMap.ui.my_sido_nm+ svg +$catchmentAreaMap.ui.my_sgg_nm+ svg +$catchmentAreaMap.ui.my_emdong_nm);
			
			$catchmentAreaMap.ui.map.mapMove([$catchmentAreaMap.ui.my_x, $catchmentAreaMap.ui.my_y]);	// 데이터 조회														
		},
		// 취소
		function() {
		}
	);
});


