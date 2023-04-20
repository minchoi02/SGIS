(function(W, D) {
	$(document).ready(function(){
		$biz.search.event.setUIEvent();
	});
	W.$biz = W.$biz || {};
	$biz.search = {
		init : function(){//초기화
			$biz.ui.map.infoWindow.update("");
			$biz.ui.recommendListControl.hide();
			$("#census-map-button-"+$biz.ui.map.id).remove();
			$biz.ui.map.gMap.setMaxZoom(13);
			$biz.ui.map.isDrawBoundary = false;
			$("#databaord-area-button").addClass("NoneAction");
			$("#chartTableArea").hide();
			
			function removeGeojson(obj){
				if(hasText(obj)){
					$.each(obj,function(){
						this.remove();
					});
				}
			}
			removeGeojson($biz.search.currentState.geojson);
			removeGeojson($biz.search.changeBusiness.geojson);
			if(hasText($biz.search.proposedSite.geojson)){
				$biz.search.proposedSite.geojson.remove();
			}
			if($biz.ui.map.dataBoundary){
				$biz.ui.map.dataBoundary.remove();
			}
			
			//열지도 클리어
			if ($biz.ui.map.heatMap) {
					$biz.ui.map.heatMap.remove();
					//sop.HeatLayer.onRemove($biz.ui.map);
					
				//map.heatMapList[map.mapList[map.curMapId].id] = null;
			}			
			
		},
		currentState : {//생활업종 현황보기
			adm_cd : null,//행정동 코드
			adm_nm : null,//행정동 이름
			geojson : null,//geojson
			theme_cd : null,//테마코드
			search : function(){
				
				srvLogWrite('M0','07', '01', '02', '', '');
				
				setGeojson("currentState");
			}
		},
		changeBusiness : {//업종밀집도 변화
			adm_cd : null,//행정동 코드
			adm_nm : null,//행정동 이름
			geojson : null,//geojson
			theme_cd : null,//테마코드
			search : function(){
				//setGeojson("changeBusiness");
				
				srvLogWrite('M0','07', '02', '02', '', '');
				
				changeBusiness("changeBusiness");
			}
		},
		proposedSite : {//생화업종 후보지검색
			adm_cd : null,//행정동 코드
			geojson : null,//geojson
			census_adm_cd : null,//센서스 데이터 행정동 코드
			search : function(){
				
				$biz.search.init();
				this.adm_cd = $biz.ui.subNavigation.menu.getAdmCd();
				if(hasText(this.adm_cd)){
					this.adm_cd = this.adm_cd.substring(0,5);
				}
				var params = {
					adm_cd : $biz.search.proposedSite.adm_cd
				};
				if($(".wonSet>div:visible").find("input:radio:checked,select").length>0){
					$(".wonSet>div:visible").find("input:radio:checked,select").each(function(){
						params[$(this).attr("name")] = $(this).val();
					});
					$biz.ui.map.mapMove(
						$biz.ui.subNavigation.menu.getCoor(),
						$biz.ui.map.getZoomToCd($biz.ui.subNavigation.menu.getAdmCd()),
						false,
						function(){
							var abs = new sop.portal.absAPI();
							abs.onBlockUIPopup();
							$biz.api.startupbiz(params,function(res){
								if(res.errCd=="0"){
									$.ajax({
										method: "GET",
										async: false,
										url: openApiPath + "/OpenAPI3/boundary/hadmarea.geojson",
										data: {
											accessToken:accessToken,
											year : $biz.ui.map.bnd_year,
											adm_cd: $biz.search.proposedSite.adm_cd,
											low_search: "1"
										},
										dataType: "json",
										success: function(node) {
											var admCdArray = [];
											var id = uuid();
											var ul = $("<ul/>");
											$biz.ui.recommendListControl.empty();
											$.each(res.result,function(){
												admCdArray.push(this.adm_cd);
											});
											$biz.search.proposedSite.geojson = sop.geoJson(node, {
												style: function () {
													return {
														weight : 1,
														color : "white",
														dashArray : 1.75,
														fillOpacity : 0.7,
														fillColor : "#F0FFF0"
													};
												},
												onEachFeature: function (feature, layer) {
													if(admCdArray.indexOf(layer.feature.properties.adm_cd)>-1){
														ul.append($("<li/>").append(
															$("<label/>").append(
																$("<input/>",{type:"radio","name":"recommend-"+id,"data-coor-x":layer.feature.properties.x,"data-coor-y":layer.feature.properties.y,"data-adm-cd":layer.feature.properties.adm_cd}),
																layer.feature.properties.adm_nm	
															)
														));
														layer.on({
															click : function (e) {
																layer.bringToFront();
																$biz.ui.recommendListControl.show();
																var zoom = 1;
																if(layer.feature.properties.adm_cd.length<=2){
																	zoom = 4;
																}else if(layer.feature.properties.adm_cd.length<=5){
																	zoom = 6;
																}else{
																	zoom = 9;
																}
																$biz.ui.map.isDrawBoundary = true;
																abs.onBlockUIPopup();
																$biz.ui.map.mapMove([layer.feature.properties.x,layer.feature.properties.y],zoom,false,function(){
																	$biz.search.proposedSite.census_adm_cd = layer.feature.properties.adm_cd;
																	$biz.ui.recommendListControl.getAdmCdRadio($biz.search.proposedSite.census_adm_cd).prop("checked",true);
																	$biz.ui.map.mapControlButton.addChildren($("<li/>",{"id":"census-map-button-"+$biz.ui.map.id,"class":"sgis"}).append($("<span/>",{"text":"센서스 데이터"}),$("<select/>").append(
																		$("<option/>",{"text":"총사업체","data-api":"API_0301","data-show-data":"corp_cnt","data-show-data-name":"총사업체","data-unit":"개"}),
																		$("<option/>",{"text":"총인구","data-api":"API_0302","data-show-data":"population","data-show-data-name":"총인구","data-unit":"명"}),
																		$("<option/>",{"text":"총가구","data-api":"API_0305","data-show-data":"household_cnt","data-show-data-name":"총가구","data-unit":"가구"}),
																		$("<option/>",{"text":"총주택","data-api":"API_0306","data-show-data":"house_cnt","data-show-data-name":"총주택","data-unit":"호"})
																	).change(function(){
																		var option = $(this).find("option:selected");
																		$biz.ui.map.censusApi.setStatsMapAdmCdCensusData(option.data("api"),{
																			"adm_cd" : $biz.search.proposedSite.census_adm_cd,
																			"showData" : option.data("show-data"),
																			"showDataName" : option.data("show-data-name"),
																			"unit" : option.data("unit"),
																			"callback" : function(res){
																				$biz.search.proposedSite.geojson.remove();
																				$("#databaord-area-button").removeClass("NoneAction");
																				$("#chartTableArea").show();
																				abs.onBlockUIClose();
																			}
																		},{
																			"bnd_year" : $biz.ui.map.bnd_year,
																			"year" : option.data("api")=="API_0301"?companyDataYear:censusDataYear
																		});
																	})));
																	$("#census-map-button-"+$biz.ui.map.id+" select option:first").prop("selected",true).trigger("change");
																});
															}
														}).setStyle({
															fillOpacity : 0.7,
															fillColor : "red"
														}).bringToFront();
													}
												}
											});
											$biz.search.proposedSite.geojson.addTo($biz.ui.map.gMap);
											$biz.ui.recommendListControl.update(ul);
											$biz.ui.recommendListControl.show();
										},
										error: function(e) {}
									});	
									abs.onBlockUIClose();
								}else{
									messageAlert.open("알림",res.errMsg);
									abs.onBlockUIClose();
								}
							});
							$("#search-item-box").hide();
						}
					);
					var title = $(".gnb h2").text();
					var parameter = "";
					for(key in params){
						parameter += [key] +" : "+ params[key] + "&";
					}
					var zoomLevel = $biz.ui.map.zoom;
					var adm_nm = $("#map-navigator-sub-menu-sido option:selected").text() + " " + $("#map-navigator-sub-menu-sgg option:selected").text();
					apiLogWrite2("L0", "L05", title, parameter, zoomLevel, adm_nm);
				}else{
					messageAlert.open("알림","최소 1개이상 조건을 선택하세요.");
				}
			}
		}
	};
	$biz.search.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2017. 02. 07. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setUIEvent: function() {
			//조회버튼 이벤트
			$("#biz-search-button").click(function(){
				
				var type = $("#itemSubject a.M_on").data("type");
				
				//데이터 보드 컨트롤 해야함
				
				var typeFunc = $biz.search[changePipeToUpperCase(type)];
				//alert(typeFunc);
				
				console.log("[biz.search.js] typeFunc [" + typeFunc);
				
				if(typeof typeFunc!=="undefined"){
					if(typeof typeFunc.search==="function"){
						//alert("searchSTart");
						//alert(typeFunc);
						typeFunc.search();		//setGeoJson호출
					}else{
						console.error("search function 이 존재하지 않습니다");
					}
				}else{
					messageAlert.open("알림","잘못된 접근입니다");
				}
			});
			
			$("#heatLegendBtn").click(function(){
				srvLogWrite('M0','07', '03', '04', '', '');
				if($(".heatArea").css("display")=="none"){
					$(".heatArea").show();
				}else{
					$(".heatArea").hide();
				}
			});
		}
	};
	/**
	 * @name           : setGeojson
	 * @description    : geo 셋팅 
	 * @date           : 2017. 02. 07. 
	 * @author	       : 김도형
	 * @history        :
	 * @param type     : currentState(생활업종 현황보기),changeBusiness(업종밀집도 변화)
	 * @param callback : callback
	 */
	function setGeojson(type,callback){
		$(".heatArea").hide();
		$(".legend-panel").show();
		$(".setting_control").show();
		$("#heatLegendBtn").hide();
		console.log("[biz.search.js] setGeojson 호출 [");
		
		if(type!="currentState"&&type!="changeBusiness"){
			messageAlert.open("알림","잘못된 접근입니다");
			return false;
		}
		var map = $biz.ui.map;
		$biz.search.init();
		$biz.ui.map.gMap.setMaxZoom(6);
		var abs = new sop.portal.absAPI();
		abs.onBlockUIPopup();
		var zoom = map.getZoomToCd($biz.ui.subNavigation.menu.getAdmCd());
		
		$biz.ui.map.mapMove(
			$biz.ui.subNavigation.menu.getCoor(),
			zoom,
			false,
			function(){
				var navigatorId = $biz.ui.subNavigation.menu.navigatorId;
				if($("#"+navigatorId+"sgg").val()!=="999"){
					$biz.search[type].adm_cd = $("#"+navigatorId+"sido").val()+$("#"+navigatorId+"sgg").val();
					$biz.search[type].adm_nm =  $("#"+navigatorId+"sido option:selected").text()+" "+$("#"+navigatorId+"sgg option:selected").text();
				}else{
					$biz.search[type].adm_cd = $("#"+navigatorId+"sido").val();
					$biz.search[type].adm_nm =  $("#"+navigatorId+"sido option:selected").text();
				}
				var sidoList = $("#"+navigatorId+"sido option:not(option[value=00])");
				var sidoCnt = 0;
				$biz.search[type].geojson = {};
				
				
					$.each(sidoList,function(cnt,node){
						$.ajax({
							type : "GET",
							url : sgisContextPath + "/js/data/geo_sgg_"+map.bnd_year+"/geo_sgg_"+$(node).val()+"_"+map.bnd_year+".js",
							async : true,
							success : function(res) {
								if(res.errCd=="0"){
									$biz.search[type].geojson[$(node).val()] = map.getSopBoundary(res);
									$biz.search[type].geojson[$(node).val()].addTo(map.gMap);
									$biz.search[type].geojson[$(node).val()].eachLayer(function (layer){
										layer.setStyle({
											weight : layer.options.weight,
											color : "white",
											dashArray : 1.75,
											fillOpacity : 0.7,
											fillColor : "#F0FFF0",
											type:"data"
										});
									});
									
									//map.dataBoundary = $biz.search[type].geojson[$(node).val()];
									
								}
								sidoCnt++;
								if(sidoList.length==sidoCnt){
									$biz.search[type].theme_cd = $("#"+$("#itemSubject a.M_on").data("type")+" .Check input").val();
									
									$biz.api.sggtobcorpcount({theme_cd:$biz.search[type].theme_cd},function(res){
										if(res.errCd=="0"){
											var data = [];
											$.each(res.result,function(cnt,node){
												data.push(parseFloat($.isNumeric(node.corp_cnt)?node.corp_cnt:0));
											});
											
											map.data = [data];
											map.legend.calculateLegend([data]);
											
											
											
											/*
											$.each(res.result,function(cnt,node){
												$.each($biz.search[type].geojson[node.sido_cd].getLayers(),function(layerCnt,layer){ //원본
													map.dataBoundary = $biz.search[type].geojson[node.sido_cd] ;
												});
											});
											//map.dataBoundary = $biz.search[type].geojson;
											
											
											$.each(res.result,function(cnt,node){
												map.dataBoundary.push($.each($biz.search[type].geojson[node.sido_cd]));
											});
											
											//map.dataBoundary._layers = $biz.search[type].geojson;
											*/
											
											
											$.each(res.result,function(cnt,node){
												
												//$.each(map.dataBoundary.getLayers());
												
												$.each($biz.search[type].geojson[node.sido_cd].getLayers(),function(layerCnt,layer){ //원본
												//$.each(map.dataBoundary.getLayers(),function(layerCnt,layer){
												
													//map.dataBoundary = $biz.search[type].geojson[node.sido_cd] ;
												
												
													
													
													if(layer.feature.properties.adm_cd==node.sido_cd+node.sgg_cd){
														var showData = $.isNumeric(node.corp_cnt)?node.corp_cnt:"N/A";
														layer.feature.info = [];
														layer.feature.info[0] = {
																showDataName : node.theme_cd_nm,
																showData : "corp_cnt",
																unit : "개",
																result : node
														};
														layer.setStyle({
															weight : layer.options.weight,
															color : "white",
															dashArray : 1.75,
															fillOpacity : 0.7,
															fillColor : map.legend.getColor(node.corp_cnt, map.legend.valPerSlice[0])[0],
															type:"data"
														});
														if($biz.ui.map.showCaption===true){
															$biz.ui.drawCaption($biz.search[type].geojson[node.sido_cd],layer);
														}
														
														//map.dataBoundary = $biz.search[type].geojson[node.sido_cd] ;
														
														return false;
													}
													
													//map.dataBoundary = $biz.search[type].geojson[node.sido_cd] ;
													
												});
												
												
											});
											
											//map.dataBoundary = $biz.search[type].geojson[$(node).val()];
											
											//map;
											//map.gMap;
											//map.gMap.dataBoundary;
											
											map.legend.updateLegendRangeColor();
										}
										$("#databaord-area-button").removeClass("NoneAction");
										$("#chartTableArea").show();
										abs.onBlockUIClose();
										if(typeof callback === "function"){
											callback();
										}
									});
									
								}
							},
							dataType: "json",
							error:function(e){
								abs.onBlockUIClose();
							}  
						});
					});
				
				$("#search-item-box").hide();
			}
		);
		var title = $(".gnb h2").text();
		var parameter = "";
		if($(".subject1").hasClass("M_on")){
			parameter = $(".subject1").text() + "," + $(".biz_select1 .Check").text().trim(); 
		}else if($(".subject2").hasClass("M_on")){
			parameter = $(".subject2").text() + "," + $(".biz_select2 .Check").text().trim(); 
		}
		$("#map-title>h3").text();
		var zoomLevel = $biz.ui.map.zoom;
		var adm_nm = $("#map-navigator-sub-menu-sido option:selected").text() + " " + $("#map-navigator-sub-menu-sgg option:selected").text();
		apiLogWrite2("L0", "L05", title, parameter, zoomLevel, adm_nm);
	}
	
	/**
	 * @name           : changeBusiness
	 * @description    : geo 셋팅 
	 * @date           : 2017. 02. 07. 
	 * @author	       : 김도형
	 * @history        :
	 * @param type     : changeBusiness(업종밀집도 변화)
	 * @param callback : callback
	 */
	function changeBusiness(type,callback){
		//heatMap STart
		$("#search-item-box").hide();
		$(".legend-panel").hide();
		$(".heatArea").hide();
		$(".setting_control").hide();
		$("#heatLegendBtn").show();
		
		var map = $biz.ui.map;
		$biz.search.init();
		$biz.ui.map.gMap.setMaxZoom(11);
		var abs = new sop.portal.absAPI();
		abs.onBlockUIPopup();
		var zoom = map.getZoomToCd($biz.ui.subNavigation.menu.getAdmCd());
		
		
		var v_theme_cd = $("#"+$("#itemSubject a.M_on").data("type")+" .Check input").val();
		
		var navigatorId = $biz.ui.subNavigation.menu.navigatorId;
		if($("#"+navigatorId+"sgg").val()!=="999"){
			$biz.search[type].adm_cd = $("#"+navigatorId+"sido").val()+$("#"+navigatorId+"sgg").val();
			$biz.search[type].adm_nm =  $("#"+navigatorId+"sido option:selected").text()+" "+$("#"+navigatorId+"sgg option:selected").text();
		}else{
			$biz.search[type].adm_cd = $("#"+navigatorId+"sido").val();
			$biz.search[type].adm_nm =  $("#"+navigatorId+"sido option:selected").text();
		} 
		
		$biz.search.changeBusiness.theme_cd = v_theme_cd;
		
		$biz.api.poiCompanyDensity(
		{
			theme_cd:v_theme_cd, 
			year:this.companyDataYear,
			adm_cd:$biz.search[type].adm_cd
			
		},function(res){
			if(res.errCd=="0"){
			
				var options = $biz.options;
				//var map = options.map;
				var minOpacity = 0.01;
				var radius = map.heatRadius;
				var blur = map.heatBlur;
				var zoomLevelHeat = map.zoomLevelHeat;
				var max = 1;
				
				
				
				var heat = sop.heatLayer();
				heat.addTo(map.gMap);
				
				map.heatMap = heat;
				
				if (map.heatMap) {
					map.heatMap.setUTMKs([]);
				}
				
				
				
				if ($biz.ui.heatMapList[options.map.id] == null) {
					$biz.ui.heatMapList[options.map.id] = {
							type : "heatMap",
							data : [],
							theme_cd : options.params.theme_cd,
							year : options.params.year,
							data_type : options.type,
							adm_cd : options.params.adm_cd
					};
				}else{
					$biz.ui.heatMapList[options.map.id]["data"]=[];
					$biz.ui.heatMapList[options.map.id]["data_type"] = options.type;
					$biz.ui.heatMapList[options.map.id]["adm_cd"] = options.params.adm_cd;
				}
				
				
				
				var companyList = res.result;
				var tmpData = [];
				for (var i=0; i<companyList.length; i++) {
					tmpData.push(companyList[i].cnt);
				}
				
				map.data = [tmpData];
				
				var max = null;
				
				var radius = 20;
				var blur = 30;
				
				//타입별 열지도 표출
				//1:전국시도, 2:시군구, 3:읍면동
				//1,2일 경우, 가중치 열지도(집계), 3일경우, 기본 열지도(POI)
				switch(parseInt(options.type)) {
					case 1:
					case 2:
						max = Math.max.apply(null, tmpData);
						map.zoomLevelHeat = false;
					//	map.setHeatMapOptions(map.heatRadius, map.heatBlur, max);
						
						if(map.heatMap != null){
							map.heatRadius = radius;
							map.heatBlur = blur;
							//9월 서비스
							var hMax = max;
							var zlHeat = true;
							if (map.zoomLevelHeat) {
								hMax = 1;
							}

							//열지도 
							map.heatMap.setOptions({
								minOpacity: 0.01,
								radius: radius,
								blur: blur,
								max: hMax, //9월 서비스
								zoomLevelHeat : this.zoomLevelHeat //9월 서비스
							});
							
						}
						
						$biz.ui.heatMapList[options.map.id].data_type = options.type;
						
						
						for (var i=0; i<companyList.length; i++) {
							$biz.ui.heatMapList[options.map.id]["data"].push(companyList[i]);
							if (map.heatMap) {
								map.heatMap.addUTMK([
									 parseFloat(companyList[i].x),
									 parseFloat(companyList[i].y),
									 companyList[i].cnt
								]);
							}
							if(i == companyList.length-1){
								//alert(companyList.length + "complate");
							}
						}
						break;
					case 3:
					/*	map.zoomLevelHeat = true;
						map.setHeatMapOptions(map.heatRadius, map.heatBlur,1);
						$biz.ui.heatMapList[options.map.id].data_type = options.type;
						for (var i=0; i<companyList.length; i++) {
							$biz.ui.heatMapList[options.map.id]["data"].push(companyList[i]);
							map.addHeatMap(companyList[i].x, companyList[i].y, 1);
						}
						break;*/
						max = Math.max.apply(null, tmpData);
						map.zoomLevelHeat = false;
					//	map.setHeatMapOptions(map.heatRadius, map.heatBlur, max);
						
						if(map.heatMap != null){
							map.heatRadius = radius;
							map.heatBlur = blur;
							//9월 서비스
							var hMax = max;
							var zlHeat = true;
							if (map.zoomLevelHeat) {
								hMax = 1;
							}

							//열지도 
							map.heatMap.setOptions({
								minOpacity: 0.01,
								radius: radius,
								blur: blur,
								max: hMax, //9월 서비스
								zoomLevelHeat : this.zoomLevelHeat //9월 서비스
							});
							
						}
						
						$biz.ui.heatMapList[options.map.id].data_type = options.type;
						
						
						for (var i=0; i<companyList.length; i++) {
							$biz.ui.heatMapList[options.map.id]["data"].push(companyList[i]);
							if (map.heatMap) {
								map.heatMap.addUTMK([
									 parseFloat(companyList[i].x),
									 parseFloat(companyList[i].y),
									 companyList[i].cnt
								]);
							}
							if(i == companyList.length-1){
								//alert(companyList.length + "complate");
							}
						}
						break;
				}
			}
			
			abs.onBlockUIClose();
			
		});
		
		var title = $(".gnb h2").text();
		var parameter = "";
		if($(".subject1").hasClass("M_on")){
			parameter = $(".subject1").text() + "," + $(".biz_select1 .Check").text().trim(); 
		}else if($(".subject2").hasClass("M_on")){
			parameter = $(".subject2").text() + "," + $(".biz_select2 .Check").text().trim(); 
		}
		$("#map-title>h3").text();
		var zoomLevel = $biz.ui.map.zoom;
		var adm_nm = $("#map-navigator-sub-menu-sido option:selected").text() + " " + $("#map-navigator-sub-menu-sgg option:selected").text();
		
		
		
		//열지도 범례 start
		var radius = 20;
		var blur = 30;
		$(".heatRadiusText").html("20");
		$(".heatRadiusSlider").slider({
		    range: false, 
			min : 5,
			max : 40, //2016.09.12 9월 서비스 : 80->40
			values : [20],
		    slide : function(e, ui) {
		       $(".heatRadiusText").html(ui.value);
		       	radius = ui.value;
				map.heatMap.setOptions({
					minOpacity: 0.01,
					radius: radius,
					blur: blur,
				//	max: hMax, //9월 서비스
					max: 1,
					zoomLevelHeat : this.zoomLevelHeat //9월 서비스
				});
		    }
		});
		
		$(".heatBlurText").html("30");
		
		//흐림도 조절
		$(".heatBlurSlider").slider({
		    range: false, 
			min : 20,	//2016.09.12 9월 서비스 : 5->20
			max : 120,
			values : [30],
		    slide : function(e, ui) {
		    	$(".heatBlurText").html(ui.value);
		    		blur = ui.value;
					map.heatMap.setOptions({
						minOpacity: 0.01,
						radius: radius,
						blur: blur,
					//	max: hMax, //9월 서비스
						max: 1,
						zoomLevelHeat : this.zoomLevelHeat //9월 서비스
					});
				}
		});
		//$("#legendBox_"+that.id).find(".heatRadiusText").html($("#legendBox_"+that.id).find(".heatRadiusSlider").slider("values")[0]);
		//$("#legendBox_"+that.id).find(".heatBlurText").html($("#legendBox_"+that.id).find(".heatBlurSlider").slider("values")[0]);

		
		//열지도 범례 end
		
		
		/*
		 * */
		$("#databaord-area-button").removeClass("NoneAction");
		$("#chartTableArea").show();
		
		
		
		
	}
	
	
	
	
	
	
	
	
	/** ********* 업종별 사업체 밀집도 새로 Test ********* */
	(function() {
		$class("sop.openApi.poiCompanyDensityTest.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						switch(parseInt(res.errCd)) {
							case 0:
								var map = options.map;
								//map.dataGeojson = map.geojson;
								if (map.heatMap) {
									map.heatMap.setUTMKs([]);
								}
								
								map.legend.setLegendParams("heat", map.legend.legendColor, map.legend.lv);
								
								if ($biz.ui.share_info_type == "bookmark") {
									
									map.mapMove([$biz.ui.bookmark_mapcenter[0],$biz.ui.bookmark_mapcenter[1]], $biz.ui.bookmark_zoom_level);
									$biz.ui.heatMapList[options.map.id] = {
											type : "heatMap",
											data : [],
											theme_cd : options.params.theme_cd,
											year : options.params.year,
											data_type : options.type,
											adm_cd : options.params.adm_cd
									};
								} else {
								
									if ($biz.ui.heatMapList[options.map.id] == null) {
										$biz.ui.heatMapList[options.map.id] = {
												type : "heatMap",
												data : [],
												theme_cd : options.params.theme_cd,
												year : options.params.year,
												data_type : options.type,
												adm_cd : options.params.adm_cd
										};
									}else{
										$biz.ui.heatMapList[options.map.id]["data"]=[];
										$biz.ui.heatMapList[options.map.id]["data_type"] = options.type;
										$biz.ui.heatMapList[options.map.id]["adm_cd"] = options.params.adm_cd;
									}
								}
								
								
								var companyList = res.result;
								//heatMap 생성
								var tmpData = [];
								for (var i=0; i<companyList.length; i++) {
									tmpData.push(companyList[i].cnt);
								}
								var max = null;
								
								//타입별 열지도 표출
								//1:전국시도, 2:시군구, 3:읍면동
								//1,2일 경우, 가중치 열지도(집계), 3일경우, 기본 열지도(POI)
								switch(parseInt(options.type)) {
									case 1:
									case 2:
										max = Math.max.apply(null, tmpData);
										map.zoomLevelHeat = false;
										map.setHeatMapOptions(map.heatRadius, map.heatBlur, max);
										$biz.ui.heatMapList[options.map.id].data_type = options.type;
										for (var i=0; i<companyList.length; i++) {
											$biz.ui.heatMapList[options.map.id]["data"].push(companyList[i]);
											map.addHeatMap(companyList[i].x, companyList[i].y, companyList[i].cnt);
										}
										break;
									case 3:
										map.zoomLevelHeat = true;
										map.setHeatMapOptions(map.heatRadius, map.heatBlur,1);
										$biz.ui.heatMapList[options.map.id].data_type = options.type;
										for (var i=0; i<companyList.length; i++) {
											$biz.ui.heatMapList[options.map.id]["data"].push(companyList[i]);
											map.addHeatMap(companyList[i].x, companyList[i].y, 1);
										}
										break;
								}
								if (options.callback != null && options.callback instanceof Function) {
									options.callback.call(undefined, res);
								}
								break;
							default:
								if ($biz.ui.heatMapList[options.map.id] != null) {
									$biz.ui.heatMapList[options.map.id]["data"]=[];
									$biz.ui.heatMapList[options.map.id]["data_type"] = options.type;
									$biz.ui.heatMapList[options.map.id]["adm_cd"] = options.params.adm_cd;
								}
								break;
						}
					},
					onFail : function(status, options) {
						if ($biz.ui.heatMapList[options.map.id] != null) {
							$biz.ui.heatMapList[options.map.id]["data"]=[];
							$biz.ui.heatMapList[options.map.id]["data_type"] = options.type;
							$biz.ui.heatMapList[options.map.id]["adm_cd"] = options.params.adm_cd;
						}
					}
				});
	}());
	/** ********* 업종별 사업체 밀집도 종료 ********* */
	
	
	
	
}(window, document));

