(function(W, D) {
	W.$singleMap = W.$singleMap || {};
	$(document).ready(function(){
	});
		
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
			this.map.createMap($singleMap, "singleMap", {
				isZoomControl : false,
				isCurrentControl : false,
				isMapSizeControl : true,
				isMapCaptionToggleControl: false,
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
			/** 2020.09.15[한광희] 코로나19 추가 START */
			thematicInfo = $thematic.ui.getThematicInfo();
			if(thematicInfo.statThemaMapId =="sAXkcVzk5V202007141335257355ued9032uw"){
				if($("#covidThema2").hasClass("on")){
					$.ajax({
						type: "POST",
						url : contextPath + "/m2020/thematic/selectThematicMapData.json",
						dataType: 'json',
						async: false,
						data:{stat_thema_map_id:'kmOpHLH5cK202106100936161097g5G9nLCFE'},
					    success: function(res){
					    	if(res.errCd == 0){
					    		thematicInfo = res.result.themeMapInfoList;
					    		$("#change_stat_thema").show();
//					    		$("#change_stat_thema_item li").remove();
					    		if($("#change_stat_thema_item li").length < 1){
									$("#change_stat_thema_item").append(
											$("<li/>", {"style":"display:block;", "class":"on"}).append(
													$("<a/>",{"id":"vacc14","href":"#","class":"on", "text":"1회차"}).click(function(){
														$(this).parent().parent().find("li").removeClass("on");
														$(this).parent().parent().find("a").removeClass("on");
														$(this).parent().addClass("on");
														$(this).addClass("on");
														
														thematicInfo.themaMapDataId = "covid_vacc_data";
														$singleMap.ui.search($singleMap.ui.map);
													})
											),
											$("<li/>", {"style":"display:block;"}).append(
													$("<a/>",{"id":"vacc25","href":"#", "text":"2회차"}).click(function(){
														$(this).parent().parent().find("li").removeClass("on");
														$(this).parent().parent().find("a").removeClass("on");
														$(this).parent().addClass("on");
														$(this).addClass("on");
														
														thematicInfo.themaMapDataId = "covid_vacc_data";
														$singleMap.ui.search($singleMap.ui.map);
													})
											),
											$("<li/>", {"style":"display:block;"}).append(
													$("<a/>",{"id":"vacc36","href":"#", "text":"3회차"}).click(function(){
														$(this).parent().parent().find("li").removeClass("on");
														$(this).parent().parent().find("a").removeClass("on");
														$(this).parent().addClass("on");
														$(this).addClass("on");
														
														thematicInfo.themaMapDataId = "covid_vacc_data";
														$singleMap.ui.search($singleMap.ui.map);
													})
											)
									);
					    		}
								var type = $("#statsType").find("a.on").data("id");
								$(".maptit04").text(thematicInfo.title+" ("+thematicInfo[type+"SepNm"]+")");
					    	}
					    }
					});
				}else{
		    		$("#change_stat_thema").hide();
		    		$("#change_stat_thema_item li").remove();
					var type = $("#statsType").find("a.on").data("id");
					$(".maptit04").text(thematicInfo.title+" ("+thematicInfo[type+"SepNm"]+")");
				}
			}else{
				/** 2020.09.15[한광희] 코로나19 추가 END */
				thematicInfo = $thematic.ui.getThematicInfo();
			}
			$singleMap.ui.search($singleMap.ui.map);
		},
		
		/**
		 * @name         : setCurLocation
		 * @description  : 현재 위치 변경
		 * @date         : 2016. 05. 03. 
		 * @author	     : 주형식
		 * @history      :
		 * @param map    : sidoCd, sggCd, emdongCd
		 */
		setCurLocation : function(sidoCd, sggCd, emdongCd){
			console.log("[setCurLocation] sidoCd = " + sidoCd + ", sggCd = " + sggCd + ", emdongCd = " + emdongCd);
			$singleMap.ui.map.curSidoCd = sidoCd;
			$singleMap.ui.map.curSggCd = sggCd; 
			$singleMap.ui.map.curEmdongCd = emdongCd;
			
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
			common_loading(true); // 로딩바	/** 2020.09.15[한광희] 로딩바 추가 */
			// 년도 및 통계선택 초기화
			$('#yearStatSelectInfo').hide();
			$("#yearStatSelectInfoBtn").removeClass("on");
			/** 2020.09.15[한광희] 맵 조회시 범례 숨김 START */
			$("#btnrvTotletop").removeClass("on");
			$('.tooltipbox').css('visibility', 'hidden');
			/** 2020.09.15[한광희] 맵 조회시 범례 숨김 END */
			
//			thematicInfo = $thematic.ui.getThematicInfo();
			var searchType = $("#statsType>li>a.on").data("id"); 
			$singleMap.ui.curData = [];
			var adm_cd = map.getAdmCd();
			var stat_data_base_year = null;
			var data_id= thematicInfo.themaMapDataId;
			var isType05Pc = thematicInfo.themaMapType=="05"&&thematicInfo.addDataDispYn=="Y"&&$("#statsType>li>a.on").data("type")=="pc";
			
			// mng_s 2021.01.07 통계선택css 주용민
//			if((thematicInfo.themaMapType == "05" || thematicInfo.themaMapType == "15") && thematicInfo.addDataDispYn == "Y"){
			if(thematicInfo.themaMapType == "05" || thematicInfo.themaMapType == "15"){
				$("#statsType").css("display","table-row");
			}else{
				$("#statsType").css("display","flex");
			}
			// mng_s 2021.01.07 통계선택css 주용민
			
			if(thematicInfo.statThemaMapId == "2qAx0jvYOk20180802165500441EHhhaQZQaK" || thematicInfo.statThemaMapId == "OuQf1ZhcWo20190822091422257GkbDsfsZHi" || thematicInfo.statThemaMapId == "3SnEYaTafC20181127142830568kSyMYbSg3S"){
				var select_dataType = $("#select_dataType option:selected").val();
				select_dataType = select_dataType.replace("분","")
				data_id = data_id + "_" + select_dataType;
			}
			
			// mng_s 2020. 12. 24 j.h.Seok 통계주제도 통합
			if(thematicInfo.themaMapType == "05" || thematicInfo.themaMapType == "15"){
//			if(thematicInfo.themaMapType=="05"){
			// mng_e 2020. 12. 24 j.h.Seok 통계주제도 통합
			
				if(isType05Pc){
					data_id = thematicInfo.sepMapDataId;
					stat_data_base_year = $("#base_year option:last").val();
				}else{
					if(thematicInfo.statThemaMapId == "onb6f4rRh320190902160751679iQUr3aVwTT"){
						stat_data_base_year = $("#base_year2 option:selected").val() + $("#base_month2 option:selected").val();
					}else{
						stat_data_base_year = $("#base_year option:selected").val();
					}
				}
			}else if(thematicInfo.themaMapType=="04"){
				if($("#statsType>li>a.on").data("type")=="number"){
					stat_data_base_year = $("#base_year option:selected").val();
				}else{
					stat_data_base_year = thematicInfo.statDataBaseYear;
				}
			}else{
				stat_data_base_year = thematicInfo.statDataBaseYear;
			}
			if(thematicInfo.maxExpnsnLevel=="03"&&thematicInfo.poiDispYn==="Y"){
				adm_cd = adm_cd.substring(0,5);
			}
			
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
				data_id,
				stat_data_base_year,
				function(res){
					if(thematicInfo.themaMapType=="05"){
						$.each(res.result.detailInfo,function(cnt,node){
							if(node.base_year==stat_data_base_year){
								$singleMap.ui.curData.push(node);
							}
						});
						if(thematicInfo.statThemaMapId == "41d1dhxBgx20180627145739008kXnl0kFaa8"){
							$(".colorck02 > li:eq(3) > a").click();
							$thematic.event.getEarthquake();
						}
					}else{
						$singleMap.ui.curData = res.result.detailInfo;
					}
										
					map.setStatsData({
						adm_cd : adm_cd,
						showData : searchType+"_data_val",
						showDataName : thematicInfo[searchType+"SepTtipTitle"],
						/** 2020.09.15[한광희] 로딩바 추가 START */
						unit : isType05Pc?thematicInfo.sepMapLeftSepUnit:thematicInfo[searchType+"SepUnit"],
						callback : function(){
							common_loading(false); // 로딩바
						}
						/** 2020.09.15[한광희] 로딩바 추가 END */
					},$singleMap.ui.curData,{
						year : stat_data_base_year
					});
										
					/** 2020.09.09[한광희] 데이터 조회 후 목록 숨김 START */
					$thematic.ui.thematicListPopupToggle(false);
	                $(".swiperBtn").removeClass("close"); // 버튼 화살표 변경되도록 class 추가
	                /** 2020.09.09[한광희] 데이터 조회 후 목록 숨김 END */
				});
		}
	};
	$singleMap.callbackFunc = {
		//해당경계 선택 시, 발생하는 콜백함수
		didSelectedPolygon : function(event, data, type, map) {
			
			thematicInfo = $thematic.ui.getThematicInfo();
			
			/** 2020.09.15[한광희] 코로나19 추가 START */
			if(thematicInfo.themaMapDataId == "COVID19"){
				var showData = data.info[0].showData;
				var showDataName = data.info[0].showDataName == undefined ? "" : data.info[0].showDataName;
				var base_month = data.info[0].result.base_month == undefined ? "" : data.info[0].result.base_month;
				var base_day = data.info[0].result.base_day == undefined ? "" : data.info[0].result.base_day;
				if(showDataName == "신규 확진자"){
					var areaDataTitle = showDataName+"("+base_month+"."+base_day+ " 기준) :";
				} else {
					var areaDataTitle = "1.3 이후 "+showDataName+"("+base_month+"."+base_day+ " 기준) :";					
				}
				var unit = data.info[0].unit == undefined ? "" : "("+data.info[0].unit+")";
				var showData = data.info[0].result[showData] == undefined ? "0" : data.info[0].result[showData];
				var areaData = appendCommaToNumber(showData) + unit;
				common_popup_area_click(data.properties.adm_nm, areaDataTitle, areaData);
			} else {
				if(thematicInfo.themaMapType!="07"&&type==="data"){
					var showData = data.info[0].showData;
					var showDataName = data.info[0].showDataName == undefined ? "" : data.info[0].showDataName;
					var base_year = data.info[0].result.base_year == undefined ? "" : data.info[0].result.base_year;
					var areaDataTitle = base_year + "년 " + showDataName + " :";				
					var unit = data.info[0].unit == undefined ? "" : "("+data.info[0].unit+")";
					var showData = data.info[0].result[showData] == undefined ? "0" : data.info[0].result[showData];
					var areaData = appendCommaToNumber(showData) + unit;
					common_popup_area_click(data.properties.adm_nm, areaDataTitle, areaData);
				}
			}
			/** 2020.09.15[한광희] 코로나19 추가 END */
		},
		didEndBoundary : function(map,data){
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
			var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>';
			$("#thematicMapMyLocation_name").html($thematic.ui.my_sido_nm+ svg +$thematic.ui.my_sgg_nm+ svg +$thematic.ui.my_emdong_nm);
			
			
			thematicInfo = $thematic.ui.getThematicInfo();
			
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
			thematicInfo = $thematic.ui.getThematicInfo();
			
			$singleMap.ui.createMap();
			this.setMapSize();
			if(thematicInfo.themaMapType!="07"){
				$thematic.ui.createMapSettingBox($singleMap.ui,$singleMap.ui.map);
				//$singleMap.ui.search($singleMap.ui.map);
				var hideArea = function(element){
					$(".Content>.Btn_Top>nav>a").not($(element)).removeClass("M_on");
					element.addClass("M_on");
				};
				$("#map-area-button").click(function(){
					hideArea($(this));
					$("#map").show();
					$singleMap.ui.map.gMap.invalidateSize();
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
	
	
}(window, document));