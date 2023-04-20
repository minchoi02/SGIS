(function(W, D) {
	W.$singleMap = W.$singleMap || {};
	$(document).ready(function(){
		$singleMap.event.setUIEvent();
		
		$("#map-navigator-sido").change(function(){
			if($("#map-navigator-sido option:selected")[0].value == "00" || $("#map-navigator-sgg option:selected")[0].value == "999"){
				$singleMap.ui.map.mapNavigation.move();
				singleMapLog();
			}
		});
		$("#map-navigator-sgg").change(function(){
			if($("#map-navigator-emdong option:selected")[0].value == "00"){
				$singleMap.ui.map.mapNavigation.move();
				singleMapLog();
			}			
		});				
		$("#map-navigator-emdong").change(function(){
			$singleMap.ui.map.mapNavigation.move();
			singleMapLog();
		});							
	});
		
	function singleMapLog(){
		var title = $(".gnb h2").text();
		var parameter = $("#map-title>h3").text();
		var zoomLevel = $singleMap.ui.map.mapNavigation.zoom;
		var adm_nm = $("#map-navigator-sido option:selected").text() + " " + $("#map-navigator-sgg option:selected").text() + " " + $("#map-navigator-emdong option:selected").text();
		apiLogWrite2("L0", "L02", title, parameter, zoomLevel, adm_nm);
	}	
	$singleMap.ui = {
		curData : null,//현재 데이터
		map : null,//지도
		/**
		 * @name         : createMap
		 * @description  : 지도 생성
		 * @date         : 2016. 05. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		createMap: function() {
			this.map = new sMap.map();
			if(thematicInfo.bordFixYn=="Y"){
				this.map.bnd_year = thematicInfo.baseYear;
			}else{
				this.map.bnd_year = thematicInfo.statDataBaseYear;
			}
			this.map.isDrawBoundary = false;
			this.map.center = [989674, 1818313];
			var legendOption = {};
			if(thematicInfo.themaMapType=="07"){
				this.map.zoom = 8;
			}else{
				this.map.zoom = 1;
			}
			if(hasText(thematicInfo.atdrcYn) && thematicInfo.atdrcYn === "1") {
				this.map.borough = "1";
			}
			
			if(thematicInfo.themaMapType=="04"){
				legendOption.legendType = "negative";
				legendOption.useNegative = true;
			}
			this.map.createMap($singleMap, "map", {
				isMapCaptionToggleControl :thematicInfo.themaMapType!="07",
				isZoomControl : true,
				isCurrentControl : true,
				isMapSizeControl : true,
				isPoiControl : false,
				isMapNavigator : true,
				navigatorOption : {
					id : "map-navigator-"
				},
				isLegendControl : thematicInfo.themaMapType!="07",
				legendOption : legendOption
			});
			this.map.addControlEvent("movestart");
			this.map.addControlEvent("moveend");
			this.map.addControlEvent("zoomstart");
			this.map.addControlEvent("zoomend");
			$thematic.ui.setInitZoom(this.map);
			if(thematicInfo.themeCd){
				this.map.poi = new sPoi(this.map);
				this.map.poi.limitZoom = 8;
				this.map.poi.limitMessage = false;
				this.map.poi.markers = sop.markerClusterGroup({
					animateAddingMarkers: true
				});
				this.map.gMap.addLayer(this.map.poi.markers);
				this.map.poi.active = true;
				this.map.poi.theme_cd = thematicInfo.themeCd;
				if(thematicInfo.themaMapType=="07"){
					this.map.poi.getThemePoi(0);
				}
			}
			this.map.createInfoWindow("topright");
			this.map.moveCurrentLocation(false);
		},
		/**
		 * @name         : changeItem
		 * @description  : 검색 조건 변경
		 * @date         : 2016. 05. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 * @param map    : map
		 */
		changeItem : function(map){
			$singleMap.ui.search($singleMap.ui.map);
		},
		/**
		 * @name           : search
		 * @description    : 검색
		 * @date           : 2016. 05. 03. 
		 * @author	       : 나광흠
		 * @history        :
		 * @param map      : 지도
		 */
		search : function(map){
			var searchType = $("#stat_sel_"+map.id+">a.on").data("id");
			$singleMap.ui.curData = [];
			$singleMap.ui.curChartData = [];
			$("#barchart-area").empty();
			var adm_cd = map.getAdmCd();
			var stat_data_base_year = null;
			var data_id= thematicInfo.themaMapDataId;
			var isType05Pc = thematicInfo.themaMapType=="05"&&thematicInfo.addDataDispYn==="Y"&&$("#stat_sel_"+map.id+">a.on").data("type")==="pc";
			if(thematicInfo.themaMapType=="05"){
				if(isType05Pc){
					data_id = thematicInfo.sepMapDataId;
					stat_data_base_year = $("#base_year_"+$singleMap.ui.map.id+" select option:last").val();
				}else{
					stat_data_base_year = $("#base_year_"+$singleMap.ui.map.id+" select").val();
				}
			}else if(thematicInfo.themaMapType=="04"){
				if($("#stat_sel_"+map.id+">a.on").data("type")==="number"){
					stat_data_base_year = $("#base_year_"+$singleMap.ui.map.id+" select").val();
				}else{
					stat_data_base_year = thematicInfo.statDataBaseYear;
				}
			}else{
				stat_data_base_year = thematicInfo.statDataBaseYear;
			}
			if(thematicInfo.maxExpnsnLevel=="03"&&thematicInfo.poiDispYn==="Y"){
				adm_cd = adm_cd.substring(0,5);
			}
			$thematic.ui.getData(
				map,
				adm_cd,
				data_id,
				stat_data_base_year,
				function(res){
					if(thematicInfo.themaMapType=="05"){
						$singleMap.ui.curChartData = res.result.detailInfo;
						$.each(res.result.detailInfo,function(cnt,node){
							if(node.base_year==stat_data_base_year){
								$singleMap.ui.curData.push(node);
							}
						});
					}else{
						$singleMap.ui.curData = res.result.detailInfo;
					}
					
					map.setStatsData({
						adm_cd : adm_cd,
						showData : searchType+"_data_val",
						showDataName : thematicInfo[searchType+"SepTtipTitle"],
						unit : isType05Pc?thematicInfo.sepMapLeftSepUnit:thematicInfo[searchType+"SepUnit"]
					},$singleMap.ui.curData,{
						year : stat_data_base_year
					});
					
					$("#barchart-area").empty();
					if(res.result.detailInfo.length>0){
						if(/0(4|5)/.test(thematicInfo.themaMapType)){
							$("#chart-area-button").removeClass("NoneAction");
							$("#chartTableArea").show();
							var category=[];
							var dataArray=[];
							$.each(res.result.detailInfo,function(cnt,node){
								var name;
								$.each($singleMap.ui.map.dataBoundary.getLayers(),function(layerCnt,layer){
									if(node.adm_cd==layer.feature.properties.adm_cd){
										name = layer.feature.properties.adm_nm;
										return false;
									}
								});
								category.push(name);
								dataArray.push(node[searchType+"_data_val"]?parseFloat(node[searchType+"_data_val"]):0);
							});
							setHighchart(map,"",category,dataArray);
						}
					}else{
						$("#chart-area-button,#table-area-button").addClass("NoneAction");
						
						$("#chartDataToggleBtn").hide();
						$("#chartTableArea").hide();
					}
				});
		}
	};
	$singleMap.callbackFunc = {
		//해당경계 선택 시, 발생하는 콜백함수
		didSelectedPolygon : function(event, data, type, map) {
			if(thematicInfo.themaMapType!="07"&&type==="data"){
				map.infoWindow.updateData(data);
				updateBarchart(map,data)
			}
		},
		didEndBoundary : function(map,data){
			if(thematicInfo.themaMapType!="07"){
				map.delegate.ui.search(map);
			}
		}
	};
	$singleMap.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 03. 22. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setUIEvent: function() {
			$singleMap.ui.createMap();
			this.setMapSize();
			if(thematicInfo.themaMapType!="07"){
				$thematic.ui.createMapSettingBox($singleMap.ui,$singleMap.ui.map);
				$singleMap.ui.search($singleMap.ui.map);
				var hideArea = function(element){
					$(".Content>.Btn_Top>nav>a").not($(element)).removeClass("M_on");
					element.addClass("M_on");
					$("#chart-area,#map").hide();
				};
				$("#map-area-button").click(function(){
					hideArea($(this));
					$("#map").show();
					$singleMap.ui.map.gMap.invalidateSize();
					return false;
				});
			}
			//차트 버튼 클릭시 이벤트
			if(/0(4|5)/.test(thematicInfo.themaMapType)){
				$("#chart-area-button").click(function(){
					if(!$(this).hasClass("NoneAction")){
						var hasActiveLayer = false;
						$.each($singleMap.ui.map.dataBoundary.getLayers(),function(cnt,node){
							if($singleMap.ui.map.activeLayerColor==node.options.color){
								hasActiveLayer = true;
								return false;
							}
						});
						if($("#barchart-area").children().length>0){
							hideArea($(this));
							$("#chart-area").show();
							
							$(".menuListToggle1").hide();
							$("#chartTableArea").hide();
							
						}else{
							messageAlert.open("알림","해당 지역의 차트 데이터가 존재하지 않습니다");
						}
					}
					return false;
				});
			}
		},
		/**
		 * @name         : setMapSize
		 * @description  : 지도 사이즈 변경
		 * @date         : 2016. 03. 22. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setMapSize : function(){
			if($("body").hasClass("full")){
				$("#map").height($(window).height());
			}else{
				var height = $(window).height()-$(".Wrap>.Header").outerHeight(true)-$(".Wrap>.Content>.Btn_Top").outerHeight(true)-$(".Wrap>.Content>.SelectArea").outerHeight(true);
				$("#map").height(height);
			}
			$singleMap.ui.map.gMap.invalidateSize();
		}
	};
	/**
	 * @name          : updateBarchart
	 * @description   : 막대차트 수정
	 * @date          : 2016. 03. 22. 
	 * @author	      : 나광흠
	 * @history       :
	 * @param map     : 지도
	 * @param feature : feature
	 */
	function updateBarchart(map,feature){
		$("#barchart-area").empty();
		$("#barchart-area").css({position:"absolute"}); //통계주제도에서 데이터보드가 지도 아래쪽에 그려져서 않보이는것처럼 되는 현상 수정함. 다른 서비스에 영향이 있는지 봐야함
		if(/0(4|5)/.test(thematicInfo.themaMapType)){
			var url = null;
			var parameters = {
				thema_map_data_id : thematicInfo.themaMapDataId
			};
			if(thematicInfo.themaMapType=="04"){
				url = sgisContextPath+"/ServiceAPI/thematicMap/GetThemaMapChange.json";
				parameters.adm_cd = feature.properties.adm_cd
			}else{
				url = sgisContextPath+"/ServiceAPI/thematicMap/GetThemaMapData.json";
				parameters.databoard_adm_cd = feature.properties.adm_cd
			}
			$.ajax({
				type : "GET",
				url : url,
				data : parameters,
				async: false,
				dataType:"json",
				success : function (res) {
					$singleMap.ui.curChartData = res.result.detailInfo;
					var category = [];
					var dataArray = [];
					var dataObject = {};
					var dataList;
					$.each(res.result.detailInfo,function(cnt,node){
						var is04 = thematicInfo.themaMapType=="04";
						//04 증감
						//05 시계열
						var year = is04?node.irds_year:node.base_year;
						var data = is04?"chart_value":$("#stat_sel_"+map.id+" a.on").data("id")+"_data_val";
						if(feature.properties.adm_cd==node.adm_cd){
							if(category.indexOf(year)==-1){
								category.push(year+"년");
							}
							if(dataObject[year+"년"]){
								dataObject[year+"년"] += node[data];
							}else{
								dataObject[year+"년"] = node[data];
							}
						}
					});
					category = category.sort();
					$.each(category,function(cnt,node){
						dataArray.push(dataObject[node]?parseFloat(dataObject[node]):0);
					});
					$(top.document).find(".Btn_Top>nav>.Btn_Top4").removeClass("NoneAction");
					setHighchart(map,feature.properties.adm_nm,category,dataArray);
					return false;
				},
				error : function (e) {}
			});
			
		}
	}
	/**
	 * @name              : setHighchart
	 * @description       : 차트 생성
	 * @date              : 2016. 03. 22. 
	 * @author	          : 나광흠
	 * @history           :
	 * @param map         : 지도
	 * @param adm_nm      : 행정동 이름
	 * @param xAxisCat    : 카테고리
	 * @param retDataList : 데이터
	 */
	function setHighchart(map,adm_nm, xAxisCat, retDataList){
		if(window.orientation!=undefined){
			if(window.orientation===0){
				$(top.document).find("#barchart-area").css({"padding-bottom":"0px"});
			}else{
				$(top.document).find("#barchart-area").css({"padding-bottom":"60px"});
			}
		}
		var chartWidth = $(window).width();
		var outerHeight = $(window).outerHeight(true)-($("header:visible").outerHeight(true)+$(".MapTitle").outerHeight(true)+$("p.SelectArea").outerHeight(true)+$(".Btn_Top").outerHeight(true))-100;
		var chartHeight = outerHeight>400?outerHeight:$(window).outerHeight(true)-100;
		var title = thematicInfo[$("#stat_sel_"+map.id+">a.on").data("id")+"SepChartTitle"];
		$("#barchart-area").highcharts({
			chart: {
				backgroundColor: "white",
				width: chartWidth,
				height: chartHeight,
				zoomType: false
			},
			title: {text: title},
			subtitle: {text: adm_nm},
			colors: ["#3BBEE3", "#E91E63"],
			xAxis: [{
				categories: xAxisCat,
				crosshair: true
			}],
			yAxis: [{
				labels: {
					formatter: function() {
						return Highcharts.numberFormat(this.value, 0);
					},
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				title: {
					text: "",
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				}
			}, {
				title: {
					text: "",
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},labels: {
					enabled : false,
					format: "",
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},opposite: true
			}],
			tooltip: {
				shared: true
			},
			legend: {
				enabled : false 
			},
			plotOptions: {
				spline: {
					dataLabels: {
						enabled: true
					},
					enableMouseTracking: false
				}
			},
			series: [{
				name: title,
				type: "column",
				data: retDataList,
				tooltip: {
					valueSuffix: ""
				}
			}, {
				name: "b",
				type: "spline",
				data: retDataList,
				tooltip: {
					valueSuffix: ""
				}
			}]
		});
	}
}(window, document));