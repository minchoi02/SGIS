(function(W, D) {
	var sync=false;
	W.$partitionMap = W.$partitionMap || {};
	$(document).ready(function(){
		$partitionMap.ui.setPartitionClass();
		$partitionMap.ui.setLegendWidth();

	});
	$(window).on("orientationchange",function(){
		setTimeout(function(){
			$partitionMap.ui.setPartitionClass();
			$partitionMap.ui.setLegendWidth();
			var infowindow = $($partitionMap.ui.rightmap.infoWindow._div).html();
			if(setInfoPosition($partitionMap.ui.rightmap)){
				$partitionMap.ui.rightmap.infoWindow.update(infowindow);
			}
			common_loading(false); // 로딩바
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
			
			if($partitionMap.ui.leftmap != null){
				$partitionMap.ui.leftmap.legend.legendPanel.width(legendPanalWidth);
			}
			if($partitionMap.ui.rightmap != null){
				$partitionMap.ui.rightmap.legend.legendPanel.width(legendPanalWidth);
			}
		},
		
		/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 START */
		/**
		 * @name         : setCurLocation
		 * @description  : 현재 위치 변경
		 * @date         : 2020.09.10
		 * @author	     : 한광희
		 * @history      :
		 * @param map    : sidoCd, sggCd, emdongCd
		 */
		setCurLocation : function(sidoCd, sggCd, emdongCd){
			console.log("[setCurLocation] sidoCd = " + sidoCd + ", sggCd = " + sggCd + ", emdongCd = " + emdongCd);
			$partitionMap.ui.leftmap.curSidoCd = sidoCd;
			$partitionMap.ui.leftmap.curSggCd = sggCd; 
			$partitionMap.ui.leftmap.curEmdongCd = emdongCd;
			$partitionMap.ui.rightmap.curSidoCd = sidoCd;
			$partitionMap.ui.rightmap.curSggCd = sggCd; 
			$partitionMap.ui.rightmap.curEmdongCd = emdongCd;
			
		},
		/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 END */
		
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
			
			thematicInfo = $thematic.ui.getThematicInfo();
			
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
				isMapCaptionToggleControl :true, //통계 캡션 토글 버튼 생성 유무
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
				isMapSizeControl : false,
				isMapNavigator : false,
				// 범례 일단 주석
				isLegendControl : true,
				navigatorOption : {
					id : "map-navigator-"
				},
				legendWidth : $(window).width()
			});
			map.addControlEvent("movestart");
			map.addControlEvent("moveend");
			map.addControlEvent("zoomstart");
			map.addControlEvent("zoomend");
			map.addControlEvent("drag");
			map.addControlEvent("dragend");
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
			common_loading(true); // 로딩바
			thematicInfo = $thematic.ui.getThematicInfo();
			
			var searchType = $("#statsType>li>a.on").data("id"); 
			
			map.delegate.ui[map.target+"CurData"] = [];
			$("#barchart-area").empty();
			var adm_cd = map.getAdmCd();
			var isLeft = map.target=="leftmap";
			var thematicId = isLeft?thematicInfo.themaMapDataId:thematicInfo.sepMapDataId;
			var year = thematicInfo.statDataBaseYear;
			
			/** 2020.09.22[한광희] 주제도별 지역경계에 해당 하는 지역 코드 설정 START */
			if(thematicInfo.maxExpnsnLevel == '01'){
				adm_cd = '00';
			} else if(thematicInfo.maxExpnsnLevel == '02'){
				adm_cd = adm_cd.substring(0,2);
			} else if(thematicInfo.maxExpnsnLevel == '03'){
				adm_cd = adm_cd.substring(0,5);
			}
			/** 2020.09.22[한광희] 주제도별 지역경계에 해당 하는 지역 코드 설정 END */
			
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
						unit : unit,
						callback : function(){
							mapSync(map,false);
							common_loading(false); // 로딩바
						}
					},res.result.detailInfo,{
						year : year
					});
					
					if(res.result.detailInfo.length<=0){
						$("#chart-area-button,#table-area-button").addClass("NoneAction");
						$("#chartDataToggleBtn").hide();
						$("#chartTableArea").hide();
					}
					
					/** 2020.09.09[한광희] 데이터 조회 후 목록 숨김 START */
					$thematic.ui.thematicListPopupToggle(false);
	                $(".swiperBtn").removeClass("close"); // 버튼 화살표 변경되도록 class 추가
	                /** 2020.09.09[한광희] 데이터 조회 후 목록 숨김 END */
	                	                
	                /** 2020.09.09[한광희] 분할뷰 지도 설명 추가 START */
	                $("#leftmap .infoWindow").empty();
	                $("#leftmap").find(".infoWindow").eq(0).append(
	            		$("<div/>", {"style":"padding:7px;"}).append(
//	            			$("<div/>", {"style": "font-size:12px; padding-left:5px;", "text":thematicInfo["baseYear"]+"년 "+thematicInfo["leftSepTtipTitle"]})
	            			$("<div/>", {"style": "font-size:12px; padding-left:5px;", "text":thematicInfo["statDataBaseYear"]+"년 "+thematicInfo["leftSepTtipTitle"]})
	            		)
	                );
	                $("#rightmap .infoWindow").empty();
	                $("#rightmap").find(".infoWindow").eq(0).append(
	            		$("<div/>", {"style":"padding:7px;"}).append(
//	            			$("<div/>", {"style": "font-size:12px; padding-left:5px;", "text":thematicInfo["baseYear"]+"년 "+thematicInfo["sepMapLeftSepTtipTitle"]})
	            			$("<div/>", {"style": "font-size:12px; padding-left:5px;", "text":thematicInfo["sepMapDataYear"]+"년 "+thematicInfo["sepMapLeftSepTtipTitle"]})
	            		)
	                );
	                /** 2020.09.09[한광희] 분할뷰 지도 설명 추가 END */	                
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
			
			thematicInfo = $thematic.ui.getThematicInfo();
			
			var opposite = getOpposite(map);
			//var searchType = $("#stat_sel_"+map.id+">a.on").data("id");
			/** 2020.09.08[한광희] 분할뷰 통계선택 수정 START */
			//var searchType = $('#stats_right').hasClass("on") == true ? "right" : "left";
			var searchType = $("#statsType>li>a.on").data("id");
			/** 2020.09.08[한광희] 분할뷰 통계선택 수정 END */
			//$("#stat_sel_"+opposite.id+">a").removeClass("on");
			//$("#stat_sel_"+opposite.id+">a[data-id="+searchType+"]").addClass("on");
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
			/** 2020.09.09[한광희] 분할뷰 지도 설명 추가 및 오류 수정 START */
			var unit, showDataName;
			var isLeft = map.target=="leftmap";
						
			if(isLeft){
				unit = thematicInfo[searchType+"SepUnit"];
				showDataName = thematicInfo[searchType+"SepTtipTitle"];
			}else{
				unit = thematicInfo["sepMap"+searchType.charAt(0).toUpperCase() + searchType.slice(1)+"SepUnit"];
				showDataName = thematicInfo["sepMap"+searchType.charAt(0).toUpperCase() + searchType.slice(1)+"SepTtipTitle"];
			}
			map.infoWindow.update("");
			map.setStatsData({
				adm_cd : map.getAdmCd(),
				showData : searchType+"_data_val",
				showDataName : showDataName,
				unit : unit
			},map.delegate.ui[map.target+"CurData"],{year : map.bnd_year});
			
			$("#leftmap .infoWindow").empty();
            $("#leftmap").find(".infoWindow").eq(0).append(
        		$("<div/>", {"style":"padding:7px;"}).append(
//        			$("<div/>", {"style": "font-size:12px; padding-left:5px;", "text":thematicInfo["baseYear"]+"년 "+thematicInfo["rightSepTtipTitle"]})
        			$("<div/>", {"style": "font-size:12px; padding-left:5px;", "text":thematicInfo["statDataBaseYear"]+"년 "+thematicInfo["rightSepTtipTitle"]})
        		)
            );
            $("#rightmap .infoWindow").empty();
            $("#rightmap").find(".infoWindow").eq(0).append(
        		$("<div/>", {"style":"padding:7px;"}).append(
//        			$("<div/>", {"style": "font-size:12px; padding-left:5px;", "text":thematicInfo["baseYear"]+"년 "+thematicInfo["sepMapRightSepTtipTitle"]})
        			$("<div/>", {"style": "font-size:12px; padding-left:5px;", "text":thematicInfo["sepMapDataYear"]+"년 "+thematicInfo["sepMapRightSepTtipTitle"]})
        		)
            );
            /** 2020.09.09[한광희] 분할뷰 지도 설명 추가 및 오류 수정 */
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
		common_loading(true); // 로딩바
		var opposite = getOpposite(map);
		if(opposite){
			if(isSetView){
				opposite.gMap.setView(map.gMap.getCenter(), map.gMap.getZoom(), {
					animate : false
				}, function(){
					common_loading(false); // 로딩바
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
		common_loading(true); // 로딩바
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
			common_loading(false); // 로딩바
			map.infoWindow.updateData(data);
		}
	}
	var sync = false;
	$partitionMap.callbackFunc = {
		didMapMoveStart : function(event, map) {
			common_loading(true); // 로딩바
		},
		didMapMoveEnd : function(event, map){	
			common_loading(false); // 로딩바
			if(sync){
				sync = false;
				mapSync(map,true);
			}
		},
		didMapDragEnd : function(event, map){
			sync = true;
			mapSync(map,false);
			common_loading(false); // 로딩바
		},
		didMapZoomEnd : function(event, map){
			mapSync(map,true);
			common_loading(false); // 로딩바
		},
		didMapDrag : function(event, map) {
			common_loading(true); // 로딩바
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
			common_loading(false); // 로딩바
			// 지도 이동에 따른 위치 정보 저장 
			$thematic.ui.my_x = map.center[0];
			$thematic.ui.my_y = map.center[1];
			$thematic.ui.my_sido_cd = map.curSidoCd;
			$thematic.ui.my_sido_nm = map.curSidoNm;
			$thematic.ui.my_sgg_cd = map.curSggCd;
			$thematic.ui.my_sgg_nm = map.curSggNm;
			$thematic.ui.my_emdong_cd = map.curEmdongCd;
			$thematic.ui.my_emdong_nm = map.curEmdongNm;
			
			//내 위치 텍스트
			/*$("#thematicMapMyLocation_name").text($thematic.ui.my_sido_nm+" "+$thematic.ui.my_sgg_nm+" "+$thematic.ui.my_emdong_nm);*/
			//2022-12-21 svg 추가
			var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>';
			$("#thematicMapMyLocation_name").html($thematic.ui.my_sido_nm+ svg +$thematic.ui.my_sgg_nm+ svg +$thematic.ui.my_emdong_nm);
			
			map.delegate.ui.search(map);			
		},
		didSelectedPolygon : function(event, data, type, map) {
			$("#leftmap").find(".infoWindow").eq(0).empty();
			$("#rightmap").find(".infoWindow").eq(0).empty();
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