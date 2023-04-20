(function(W, D) {
	var sync=false;
	W.$partitionMap = W.$partitionMap || {};
	$(document).ready(function(){
		$partitionMap.ui.setPartitionClass();
		$partitionMap.event.setUIEvent();
		$partitionMap.ui.setLegendWidth();

		$("#map-navigator-sido").change(function(){
			if($("#map-navigator-sido option:selected")[0].value == "00" || $("#map-navigator-sgg option:selected")[0].value == "999"){
				$partitionMap.ui.leftmap.mapNavigation.move();
				patitionMapLog();
			}
		});
		$("#map-navigator-sgg").change(function(){
			if($("#map-navigator-emdong option:selected")[0].value == "00"){
				$partitionMap.ui.leftmap.mapNavigation.move();
				patitionMapLog();
			}			
		});				
		$("#map-navigator-emdong").change(function(){
			$partitionMap.ui.leftmap.mapNavigation.move();
			patitionMapLog();
		});
		
		function patitionMapLog(){
			var title = $(".gnb h2").text();
			var parameter = $("#map-title>h3").text();
			var zoomLevel = $partitionMap.ui.leftmap.mapNavigation.zoom;
			var adm_nm = $("#map-navigator-sido option:selected").text() + " " + $("#map-navigator-sgg option:selected").text() + " " + $("#map-navigator-emdong option:selected").text();
			apiLogWrite2("L0", "L02", title, parameter, zoomLevel, adm_nm);
		}	
	});
	$(window).on("orientationchange",function(){
		setTimeout(function(){
			$partitionMap.ui.setPartitionClass();
			$partitionMap.ui.setLegendWidth();
			var infowindow = $($partitionMap.ui.rightmap.infoWindow._div).html();
			if(setInfoPosition($partitionMap.ui.rightmap)){
				$partitionMap.ui.rightmap.infoWindow.update(infowindow);
			}
			$partitionMap.event.setMapSize();
			$partitionMap.ui.leftmap.mapControlButton.hide();
			$partitionMap.ui.rightmap.mapControlButton.hide();
			window.scrollTo(0,1);
		},100);
	});
	$partitionMap.ui = {
		leftmap : null,//좌측 지도
		leftmapCurData : null,//좌측 데이터
		rightmap : null,//우측 지도
		rightmapCurData : null,//우측 데이터
		/**
		 * @name             : setPartitionClass
		 * @description      : 모바일 세로,가로 모드에 따른 vertical,horizontal class 셋팅
		 * @date             : 2016. 05. 03. 
		 * @author	         : 나광흠
		 * @history          :
		 */
		setPartitionClass : function(){
			var mapSizeButton;
			if(!window.orientation || window.orientation == 0){
				$("#map-box").removeClass("horizontal").addClass("vertical");
				mapSizeButton = $("#leftmap .control_item.map_size_control");
			}else{
				$("#map-box").removeClass("vertical").addClass("horizontal");
				mapSizeButton = $("#rightmap .control_item.map_size_control");
			}
			if($("body").hasClass("full")){
				mapSizeButton.removeClass("upscale").addClass("downscale");
			}else{
				mapSizeButton.removeClass("downscale").addClass("upscale");
			}
		},
		/**
		 * @name             : setLegendWidth
		 * @description      : 범례 넓이 셋팅
		 * @date             : 2016. 05. 03. 
		 * @author	         : 나광흠
		 * @history          :
		 */
		setLegendWidth : function(){
			var legendPanalWidth;
			if(!window.orientation || window.orientation == 0){
				legendPanalWidth = $(window).width();
			}else{
				legendPanalWidth = $(window).width()/2;
			}
			$partitionMap.ui.leftmap.legend.legendPanel.width(legendPanalWidth);
			$partitionMap.ui.rightmap.legend.legendPanel.width(legendPanalWidth);
		},
		/**
		 * @name        : createMap
		 * @description : 지도 생성
		 * @date        : 2016. 05. 03. 
		 * @author	    : 나광흠
		 * @history     :
		 * @param type  : left,right
		 */
		createMap: function(type) {
			var map = new sMap.map();
			if(thematicInfo.bordFixYn=="Y"){
				map.bnd_year = thematicInfo.baseYear;
			}else{
				map.bnd_year = thematicInfo.statDataBaseYear;
			}
			if(hasText(thematicInfo.atdrcYn) && thematicInfo.atdrcYn === "1") {
				map.borough = "1";
			}
			map.isDrawBoundary = false;
			map.center = [989674, 1818313];
			map.zoom = 1;
			map.createMap($partitionMap, type+"map", {
				isMapCaptionToggleControl :true,
				mapCaptionToggleOption : {
					callback : function(isOn){
						var oppositeMap = getOpposite(map);
						$("#caption-button-"+oppositeMap.id).find("a").removeClass("on");
						$("#caption-button-"+oppositeMap.id).find("a[data-id="+(isOn?"on":"off")+"]").addClass("on");
						if(isOn){
							oppositeMap.setCaption();
						}else{
							oppositeMap.removeCaption();
						}
					}
				},
				isMapSizeControl : true,
				isMapNavigator : true,
				navigatorOption : {
					id : "map-navigator-"
				},
				legendWidth : $(window).width()/2
			});
			map.addControlEvent("movestart");
			map.addControlEvent("moveend");
			map.addControlEvent("zoomstart");
			map.addControlEvent("zoomend");
			map.addControlEvent("drag");
			map.addControlEvent("dragend");
			map.legend.legendPanel.width($(window).width()/2);
			$thematic.ui.setInitZoom(map);
			$thematic.ui.createMapSettingBox($partitionMap.ui,map);
			map.createInfoWindow("topright");
			this[type+"map"] = map;
			map.moveCurrentLocation(false);
		},
		/**
		 * @name         : search
		 * @description  : 검색
		 * @date         : 2016. 05. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 * @param map    : 지도
		 */
		search : function(map){
			var searchType = $("#stat_sel_"+$partitionMap.ui.leftmap.id+">a.on").data("id");
			map.delegate.ui[map.target+"CurData"] = [];
			$("#barchart-area").empty();
			var adm_cd = map.getAdmCd();
			var isLeft = map.target=="leftmap";
			var thematicId = isLeft?thematicInfo.themaMapDataId:thematicInfo.sepMapDataId;
			var year = thematicInfo.statDataBaseYear;
			$thematic.ui.getData(
				map,
				adm_cd,
				thematicId,
				year,
				function(res){
					map.delegate.ui[map.target+"CurData"] = res.result.detailInfo;
					var unit,showDataName;
					if(isLeft){
						unit = thematicInfo[searchType+"SepUnit"];
						showDataName = thematicInfo[searchType+"SepTtipTitle"].replace(/^\s+|\s+$/gm,'');
					}else{
						var type = searchType.charAt(0).toUpperCase()+searchType.slice(1);
						unit = thematicInfo["sepMap"+type+"SepUnit"];
						showDataName = thematicInfo["sepMap"+type+"SepTtipTitle"].replace(/^\s+|\s+$/gm,'');
					}
					
					map.setStatsData({
						adm_cd : adm_cd,
						showData : searchType+"_data_val",
						showDataName : showDataName,
						unit : unit
					},res.result.detailInfo,{
						year : year
					});
					
					if(res.result.detailInfo.length<=0){
						$("#chart-area-button,#table-area-button").addClass("NoneAction");
						$("#chartDataToggleBtn").hide();
						$("#chartTableArea").hide();
					}
				});
		},
		/**
		 * @name            : changeItem
		 * @description     : 검색 조건 변경
		 * @date            : 2016. 05. 03. 
		 * @author	        : 나광흠
		 * @history         :
		 * @param map       : map
		 */
		changeItem : function(map){
			var opposite = getOpposite(map);
			var searchType = $("#stat_sel_"+map.id+">a.on").data("id");
			$("#stat_sel_"+opposite.id+">a").removeClass("on");
			$("#stat_sel_"+opposite.id+">a[data-id="+searchType+"]").addClass("on");
			this.changeStat($partitionMap.ui.leftmap,searchType);
			this.changeStat($partitionMap.ui.rightmap,searchType);
		},
		/**
		 * @name             : changeStat
		 * @description      : 검색 조건 변경
		 * @date             : 2016. 05. 03. 
		 * @author	         : 나광흠
		 * @history          :
		 * @param map        : 지도
		 * @param searchType : 검색조건 타입
		 */
		changeStat : function(map,searchType){
			var unit;
			var isLeft = map.terget=="leftmap";
			if(isLeft){
				unit = thematicInfo[searchType+"SepUnit"];
			}else{
				unit = thematicInfo["sepMap"+searchType.charAt(0).toUpperCase() + searchType.slice(1)+"SepUnit"];
			}
			map.infoWindow.update("");
			map.setStatsData({
				adm_cd : map.getAdmCd(),
				showData : searchType+"_data_val",
				showDataName : thematicInfo[searchType+"SepTtipTitle"],
				unit : thematicInfo[searchType+"SepUnit"]
			},map.delegate.ui[map.target+"CurData"],{year : map.bnd_year});
		}
	};
	/**
	 * @name            : mapSync
	 * @description     : 좌우측 지도 위치 맞추기
	 * @date            : 2016. 05. 03. 
	 * @author	        : 나광흠
	 * @history         :
	 * @param map       : 지도
	 * @param isSetView : 위치 이동할지 여부
	 */
	function mapSync(map,isSetView){
		var opposite = getOpposite(map);
		if(opposite){
			if(isSetView){
				opposite.gMap.setView(map.gMap.getCenter(), map.gMap.getZoom(), {
					animate : true
				});
			}
			map.gMap.fire("rgeoevent");
			opposite.gMap.fire("rgeoevent");
		}
	}
	/**
	 * @name            : getOpposite
	 * @description     : 반대측 지도 리턴
	 * @date            : 2016. 05. 03. 
	 * @author	        : 나광흠
	 * @history         :
	 * @param map       : 지도
	 */
	function getOpposite(map){
		if(map.target=="leftmap"){
			return $partitionMap.ui.rightmap;
		}else if(map.target=="rightmap"){
			return $partitionMap.ui.leftmap;
		}else{
			return null;
		}
	}
	/**
	 * @name            : setInfoPosition
	 * @description     : 검색 조건 변경
	 * @date            : 2016. 05. 03. 
	 * @author	        : 나광흠
	 * @history         :
	 * @param map       : 지도
	 */
	function setInfoPosition(map){
		if(map.target == "rightmap"){
			var position;
			if(!window.orientation || window.orientation == 0){
				position = "topright";
			}else{
				position = "topleft";
			}
			if(map.infoWindow.getPosition()!=position){
				map.infoWindow.setPosition(position);
			}
			return true;
		}else{
			return false;
		}
	}
	/**
	 * @name            : setInfoWindow
	 * @description     : 통계값 셋팅
	 * @date            : 2016. 05. 03. 
	 * @author	        : 나광흠
	 * @history         :
	 * @param data      : 데이터
	 * @param map       : 지도
	 */
	function setInfoWindow(data,map){
		if (map.infoWindow != null) {
			setInfoPosition(map);
			map.infoWindow.updateData(data);
		}
	}
	var sync = false;
	$partitionMap.callbackFunc = {
		didMapMoveEnd : function(event, map){
			if(sync){
				sync = false;
				mapSync(map,true);
			}
		},
		didMapDragEnd : function(event, map){
			sync = true;
			mapSync(map,false);
		},
		didMapZoomEnd : function(event, map){
			mapSync(map,true);
		},
		didMapDrag : function(event, map) {
			sync = false;
			var opposite = getOpposite(map);
			if(opposite){
				var len = map.gMap.dragging._positions.length;
				var positions = map.gMap.dragging._positions;
				if(len>1){
					var pos = positions[len-1].subtract(positions[len-2]); 
					opposite.gMap.panBy(pos.multiplyBy(-1), {animate : false});
				}
			}
		},
		didEndBoundary : function(map,data){
			map.delegate.ui.search(map);
		},
		didSelectedPolygon : function(event, data, type, map) {
			setInfoWindow(data,map);
			$.each(getOpposite(map).dataBoundary.getLayers(),function(cnt,layer) {
				if(data.properties.adm_cd == layer.feature.properties.adm_cd) {
					layer.fire("sync", {action : "click"});
					return false;
				}
			});
		},
		didSyncPolygon : function(event, data, type, map) {
			setInfoWindow(data,map);
		}
	};
	$partitionMap.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 03. 22. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setUIEvent: function() {
			$partitionMap.ui.createMap("left");
			$partitionMap.ui.createMap("right");
			this.setMapSize();
			$("#map-area-button").click(function(){
				$(this).parent().children().not($(this)).removeClass("M_on");
				$(this).addClass("M_on");
				return false;
			});
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
				height = $(window).height();
			}else{
				height = $(window).height()-$(".Wrap>.Header").outerHeight(true)-$(".Wrap>.Content>.Btn_Top").outerHeight(true)-$(".Wrap>.Content>.SelectArea").outerHeight(true);
			}
			if($("#map-box").hasClass("horizontal")){
				$("#map-box").children("div").height(height);
			}else{
				$("#map-box").children("div").height(height/2);
			}
			if(window.orientation && window.orientation != 0){
				height = height+100;
			}
			$partitionMap.ui.leftmap.gMap.invalidateSize();
			$partitionMap.ui.rightmap.gMap.invalidateSize();
		}
	};
}(window, document));