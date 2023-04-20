var dashBoardTitle = "";
(function(W, D) {
	$(document).ready(function() {
		$house.event.setUIEvent();
		
		srvLogWrite('M0','06', '01', '01', '', '');
		
		$("#menuListToggle").click(function(){
			//	mapAreaToggle();
				if($("#itemArea").css("display")=="block"){
					$("#itemArea").hide();
				}else{
					$("#itemArea").show();
				}
			})
			
			$("#subject2").click(function(){
				$house.event.showItemBox();
				$("#itemArea").hide();
				$("#search-item-box-area").html("추천지역찾기");
				$(".subject2").trigger("click");
				
				srvLogWrite('M0','06', '01', '01', '', '');
				
			})
			$("#subject1").click(function(){
				$house.event.showItemBox();
				$("#itemArea").hide();
				$("#search-item-box-area").html("주거현황보기");
				$(".subject1").trigger("click");
				
				srvLogWrite('M0','06', '02', '01', '', '');
				
			})
			$("#subject3").click(function(){
				$house.event.showItemBox();
				$("#itemArea").hide();
				$("#search-item-box-area").html("간편동네찾기");
				$("#subjectMenu3").trigger("click");
				
				srvLogWrite('M0','06', '03', '01', '', '');
				
			})
			
			$("#chartTableArea").click(function(){
				srvLogWrite('M0','06', '04', '04', '', '');
				$("#databaord-area-button").trigger("click");
				$("#databoard-area").html();
				
				
				$("#databoard-box").height($("#databoard-box").height() + 40);
			})
			
			
			//$('#search-item-box').hide();
			
			
			
			
			//databaord-area-button
			
			
			
			
			//#search-item-box .Subject.SubjectB a
		
		
	});
	W.$house = W.$house || {};
	$(window).on("orientationchange",function(){
		setTimeout(function(){
			$house.event.mapResize();
		},100);
	});
	$house.noReverseGeoCode = true;
	$house.ui = {
		map : null,//지도
		recommendDataGeojson : null,//추천지역
		recommendListControl : null,//추천지역 리스트 컨트롤 박스
		/**
		 * @name        : createMap
		 * @description : 지도 생성
		 * @date        : 2016. 04. 05.
		 * @author	    : 나광흠
		 * @history 	:
		 * @param id    : html tag id
		 */
		createMap: function(id) {
			this.map = new sMap.map();
			this.map.chooseLegendColor = [
			 {"background":"rgb(149, 50, 102)","start":"#cccccc","end":"#953266"},
			 {"background":"rgb(127,173,62)","start":"#cccccc","end":"rgb(127,173,62)"},
			 {"background":"rgb(25,126,191)","start":"#cccccc","end":"rgb(25,126,191)"},
			 {"background":"rgb(219,76,96)","start":"#cccccc","end":"rgb(219,76,96)"},
			 {"background":"rgb(222,170,0)","start":"#cccccc","end":"rgb(222,170,0)"},
			 {"background":"rgb(229,99,47)","start":"#cccccc","end":"rgb(229,99,47)"},
			 {"background":"rgb(126, 56, 116)","start":"#cccccc","end":"rgb(126, 56, 116)"},
			 {"background":"rgb(28, 44, 129)","start":"#cccccc","end":"rgb(28, 44, 129)"}
			];
			this.map.isDrawBoundary = false;
			this.map.center = [989674, 1818313];
			this.map.zoom = 1;
			this.map.createMap($house, id, {
				isZoomControl : true,
				isCurrentControl : true,
				isMapSizeControl : true,
				isPoiControl : false,
				isMapNavigator : true,
				isMapControlButton : true,
				navigatorOption : {
					id : "map-navigator-"
				},
				isLegendControl : true
			});
			this.map.addControlEvent("movestart");
			this.map.addControlEvent("moveend");
			this.map.addControlEvent("zoomstart");
			this.map.addControlEvent("zoomend");
			this.map.createInfoWindow("topright");
			this.createRecommendListControl();
			this.map.censusApi.excludeAdmCd.push("00");
			this.map.legend.legendPanel.hide();
			createMapStatTree();
			this.map.gMap.on("click",function(e){
				if(!$(e.originalEvent.target).is("path")){
					$house.search.activeAdmCd = $house.search.originalActiveAdmCd;
				}
			});
		},
		/**
		 * @name          : createRecommendListControl
		 * @description   : 추천지역 리스트 버튼 생성
		 * @date          : 2016. 03. 26. 
		 * @author        : 나광흠
		 * @history       :
		 */
		createRecommendListControl : function() {
			var map = $house.ui.map;
			var mapListControl = sop.control({
				position: 'bottomleft'
			});
			mapListControl.onAdd = function() {
				this._div = sop.DomUtil.create('div', 'map-list');
				var mapList = $("<div/>",{"class":"history-list","style":"left:-320px;"}).append($("<div/>",{"class":"recommend-list"}),$("<div/>",{"class":"item-list","style":"height:28px;padding:10px 0 0 70px;"}));
				var mapListButton = $("<div/>",{"class":"button-box"}).append($("<a/>", {
					html: '<span>추천지역</span>'
				})).click(function(){
					mapListControl.toggle();
					return false;
				});
				$(this._div).append(mapListButton,mapList).hide();
				this.mapList = mapList;
				this.mapListButton = mapListButton;
				sop.DomEvent.disableClickPropagation(this._div);
				sop.DomEvent.disableScrollPropagation(this._div);
				$("body").on("click",".map-list .history-list>div.recommend-list input:radio",function(){
					
					srvLogWrite('M0','06', '04', '01', '', '');
					
					map.legend.legendPanel.hide();
					map.mapControlButton.hide();
					$house.ui.map.infoWindow.update("");
					$("#map-stat-tree").fancytree("getTree").visit(function(node){
						node.setSelected(false);
					});
					if(map.dataBoundary){
						map.isAutoRefreshCensusApi = false;
						map.dataBoundary.remove();
					}
					$house.search.isIndicator = false;
					$house.ui.recommendDataGeojson.remove();
					$house.ui.recommendDataGeojson.addTo(map.gMap);
					var adm_cd = $(this).data("adm-cd").toString();
					$house.search.activeAdmCd = adm_cd;
					$house.search.originalActiveAdmCd = adm_cd;
					map.mapMove([$(this).data("coor-x"),$(this).data("coor-y")],$house.databoard.getMapOptions(adm_cd).zoom);
					$.each($house.ui.recommendDataGeojson.getLayers(),function(cnt,node){
						if(node.feature.properties.adm_cd==adm_cd){
							map.gMap.fitBounds(node,{
								animate : false
							});
							node.fire("click");
							return false;
						}
					});
				});
				return this._div;
			};
			mapListControl.update = function(element){
				$(this._div).find(".history-list>div.recommend-list").append(element);
			};
			mapListControl.updateItem = function(element){
				$(this._div).find(".history-list>div.item-list").append(element);
			};
			mapListControl.empty = function(){
				$(this._div).find(".history-list>div").empty();
			};
			mapListControl.show = function(){
				$(this._div).show();
			};
			mapListControl.hide = function(){
				$(this._div).hide();
			};
			mapListControl.open = function(){
				this.mapListButton.addClass("on");
				this.mapList.stop().animate({
					left: "0px"
				}, 300);
			};
			mapListControl.close = function(){
				this.mapListButton.removeClass("on");
				this.mapList.stop().animate({
					left: "-320px"
				}, 300);
			};
			mapListControl.toggle = function(){
				if(this.mapListButton.hasClass("on")){
					this.close();
				}else{
					this.open();
				}
			};
			mapListControl.getAdmCdRadio = function(adm_cd){
				if(adm_cd){
					return $(this._div).find(".history-list>div.recommend-list input:radio[data-adm-cd="+adm_cd.toString()+"]");
				}else{
					return null;
				}
			};
			mapListControl.addTo(map.gMap);
			this.recommendListControl = mapListControl;
		},
		/**
		 * @name          : enabledTree
		 * @description   : 트리 enabled
		 * @date          : 2016. 08. 09. 
		 * @author        : 나광흠
		 * @history       :
		 */
		enabledTree : function(){
			$("#map-stat-tree").fancytree("enable");
			$("#map-stat-tree").fancytree("getTree").visit(function(node){
				node.setSelected(false);
			});
		},
		/**
		 * @name          : disabledTree
		 * @description   : 트리 disabled
		 * @date          : 2016. 08. 09. 
		 * @author        : 나광흠
		 * @history       :
		 */
		disabledTree : function(){
			$house.ui.map.mapControlButton.hide();
			$("#map-stat-tree").fancytree("disable");
			$("#map-stat-tree").fancytree("getTree").visit(function(node){
				node.setSelected(false);
				node.setExpanded(false);
			});
		},
		/**
		 * @name		  : getUniqName
		 * @description   : 원하는 엘리먼트 타입 갖고오기
		 * @date		  : 2016. 12. 05. 
		 * @author		  : 나광흠
		 * @history 	  :
		 * @param element : jquery selector
		 * @param getType : html attribute name
		 */
		getUniqName : function(element,getType){
			var names = element.map(function() {
				if(/^data-/.test(getType)){
					return $(this).data(getType.replace("data-",""));
				}else{
					return $(this).attr(getType);
				}
			}).get();
			var unique = $.grep(names, function(v, i) {
			    return $.inArray(v, names) === i
			});
			return unique;
		}
	};
	$house.callbackFunc = {
		//해당경계 선택 시, 발생하는 콜백함수
		didSelectedPolygon : function(event, data, type, map) {
			if(type==="data"){
				map.infoWindow.updateData(data);
				$house.databoard.clear();
				$house.search.activeAdmCd = data.properties.adm_cd;
			}
		},
		didStartBoundary : function(map){
			var adm_cd = map.getAdmCd();
			map.isAutoRefreshCensusApi = false;
			if($house.search.isCensus==true){
				if($house.search.searchAdmCd==null || adm_cd.substring(0,$house.search.searchAdmCd.length) == $house.search.searchAdmCd){
					$house.search.activeAdmCd = adm_cd;
					$house.search.originalActiveAdmCd = adm_cd;
					map.isAutoRefreshCensusApi = true;
				}
			}
		},
		didEndBoundary : function(map,data){
			var adm_cd = map.getAdmCd();
			if($house.search.isIndicator==true){
				if($house.search.searchAdmCd==null || adm_cd.substring(0,$house.search.searchAdmCd.length) == $house.search.searchAdmCd){
					$house.search.activeAdmCd = adm_cd;
					$house.search.originalActiveAdmCd = adm_cd;
					$house.search.mapStat.indicator.adm_cd = adm_cd?adm_cd:"00";
					$house.search.mapStat.indicator.search();
				}
			}
		},
		didMapMoveStart : function(event, map){
			if($house.search.isShowDataboard != true){
				$("#databaord-area-button").addClass("NoneAction");
				
				$("#chartTableArea").hide();
			}
		},
		didMapMoveEnd : function(event, map){
			if($house.search.isShowDataboard == true){
				$("#databaord-area-button").removeClass("NoneAction");
				$("#chartTableArea").show();
			}
		}
	};
	$house.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 06. 29. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setUIEvent: function() {
			this.mapResize();
			$house.ui.createMap("map");
			$("#map-area-button").click(function(){
				$("#databaord-area").hide();
			});
		},
		/**
		 * @name         : mapResize
		 * @description  : UI 리사이즈에 대한 이벤트. 
		 * @date         : 2016. 03. 22. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		mapResize: function(){
			$house.event.setMapSize();
			$house.event.setItemBoxSize();
		},
		/**
		 * @name         : showItemBox
		 * @description  : 검색 항목 보이기
		 * @date         : 2016. 03. 22. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		showItemBox: function(){
			$(".Subject.SubjectB a:first").trigger("click");
			$("#search-item-box").show();
			$house.event.setItemBoxSize();
			return false;
		},
		/**
		 * @name         : setItemBoxSize
		 * @description  : 검색 항목 높이 값 변경
		 * @date         : 2016. 03. 22. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setItemBoxSize: function(){
			$(".Open_Type1").height($(window).height()-$(".Wrap>.Header").outerHeight(true)-10);
			$(".DetailBox").height($(window).outerHeight(true) - 40 - ($(".Wrap>.Header").outerHeight(true) + $(".SubjectB:visible").outerHeight(true)+$(".DetailBox:visible .Btn_Search:visible").outerHeight(true)+$(".Open_Type1:visible>h3").outerHeight(true)));
		},
		/**
		 * @name         : setMapSize
		 * @description  : 지도 사이즈 변경
		 * @date         : 2016. 03. 22. 
		 * @author	     : 나광흠
		 * @history      : 
		 */
		setMapSize: function(){
			if($("body").hasClass("full")){
				$("#map").height($(window).height());
			}else{
				$("#map").height($(window).height()-$(".Wrap>.Header").outerHeight(true)-$(".Wrap>.Content>.Btn_Top").outerHeight(true));
			}
			if($house.ui.map&&$house.ui.map.gMap){
				$house.ui.map.gMap.invalidateSize();
			}
		}
	};
	/**
	 * @name         : createMapStatTree
	 * @description  : 트리 생성
	 * @date         : 2016. 08. 09. 
	 * @author	     : 나광흠
	 * @history      :
	 */
	function createMapStatTree(){
		$house.ui.map.mapControlButton.addChildren("<li id='map-stat-tree' class='fancytree-radio' style='text-align: left;margin: 0 -10px -5px -10px;'></li>");
		var indicatorData = [];
		$.map(bClassInfoList,function(value,key){
			if(bClassInfoList[key].info.recmd_region_search_disp_yn=="Y"){
				var children = [];
				$.map(value.indicator,function(node,cnt){
					var maxAreaName;
					if(node.disp_level=='1'){
						maxAreaName = "시도";
					}else if(node.disp_level=='2'){
						maxAreaName = "시군구";
					}else if(node.disp_level=='3'){
						maxAreaName = "읍면동";
					}else{
						return;
					}
					children.push({
						title: node.m_class_idx_nm+"<span style='background: #2f4d6a;color: #fff;border-radius: 4px;padding: 2px 4px;font-size: 8px;margin-left: 7px;'>"+maxAreaName+"</span>",
						mode : "indicator",
						b_class_idx_id:node.b_class_idx_id,
						m_class_idx_id:node.m_class_idx_id
					});
				});
				indicatorData.push({
					title:$house.databoard.bClassInfoList[key].text,
					hideCheckbox: true,
					folder: true,
					children:children
				});
			}
		});
		$("#map-stat-tree").fancytree({
			autoScroll: true,
			checkbox: true,
			disabled: true,
			selectMode: 1,
			debugLevel: 0,
			source: 
			[{
				title: "지표 데이터",
				hideCheckbox: true,
				folder: true,
				children: indicatorData
			}, {
				title: "센서스 데이터",
				hideCheckbox: true,
				folder: true,
				children: [{
					title: "연령대별 인구",
					hideCheckbox: true,
					folder: true,
					children: [{
						title: "총인구",
						mode : "census",
						api_id : "API_0301",
						parameters : {
							"year":censusDataYear,
							"bnd_year":$house.ui.map.bnd_year
						},
						options:{
							"showData" : "tot_ppltn",
							"showDataName" : "총인구",
							"unit" : "명"
						}
					}, {
						title: "10대 이하",
						mode : "census",
						api_id : "API_0302",
						parameters : {
							"age_from":"0",
							"age_to":"10",
							"year":censusDataYear,
							"bnd_year":$house.ui.map.bnd_year,
							"low_search":"1"
							
						},
						options:{
							"showData" : "population",
							"showDataName" : "10대 이하",
							"unit" : "명"
						}
					}, {
						title: "10대",
						mode : "census",
						api_id : "API_0302",
						parameters : {
							"age_from":"10",
							"age_to":"19",
							"year":censusDataYear,
							"bnd_year":$house.ui.map.bnd_year,
							"low_search":"1"
							
						},
						options:{
							"showData" : "population",
							"showDataName" : "10대",
							"unit" : "명"
						}
					}, {
						title: "20대",
						mode : "census",
						api_id : "API_0302",
						parameters : {
							"age_from":"20",
							"age_to":"29",
							"year":censusDataYear,
							"bnd_year":$house.ui.map.bnd_year,
							"low_search":"1"
							
						},
						options:{
							"showData" : "population",
							"showDataName" : "20대",
							"unit" : "명"
						}
					}, {
						title: "30대",
						mode : "census",
						api_id : "API_0302",
						parameters : {
							"age_from":"30",
							"age_to":"39",
							"year":censusDataYear,
							"bnd_year":$house.ui.map.bnd_year,
							"low_search":"1"
							
						},
						options:{
							"showData" : "population",
							"showDataName" : "30대",
							"unit" : "명"
						}
					}, {
						title: "40대",
						mode : "census",
						api_id : "API_0302",
						parameters : {
							"age_from":"40",
							"age_to":"49",
							"year":censusDataYear,
							"bnd_year":$house.ui.map.bnd_year,
							"low_search":"1"
							
						},
						options:{
							"showData" : "population",
							"showDataName" : "40대",
							"unit" : "명"
						}
					}, {
						title: "50대",
						mode : "census",
						api_id : "API_0302",
						parameters : {
							"age_from":"50",
							"age_to":"59",
							"year":censusDataYear,
							"bnd_year":$house.ui.map.bnd_year,
							"low_search":"1"
							
						},
						options:{
							"showData" : "population",
							"showDataName" : "50대",
							"unit" : "명"
						}
					}, {
						title: "60대",
						mode : "census",
						api_id : "API_0302",
						parameters : {
							"age_from":"60",
							"age_to":"69",
							"year":censusDataYear,
							"bnd_year":$house.ui.map.bnd_year,
							"low_search":"1"
							
						},
						options:{
							"showData" : "population",
							"showDataName" : "60대",
							"unit" : "명"
						}
					}, {
						title: "70대 이상",
						mode : "census",
						api_id : "API_0302",
						parameters : {
							"age_from":"70",
							"age_to":"150",
							"year":censusDataYear,
							"bnd_year":$house.ui.map.bnd_year,
							"low_search":"1"
							
						},
						options:{
							"showData" : "population",
							"showDataName" : "70대 이상",
							"unit" : "명"
						}
					}]
				}, {
					title: "주택종류",
					hideCheckbox: true,
					folder: true,
					children: [{
						title: "아파트",
						mode : "census",
						api_id : "API_0306",
						parameters : {
							"house_type":"02",
							"year":censusDataYear,
							"bnd_year":$house.ui.map.bnd_year,
							"low_search":"1"
							
						},
						options:{
							"showData" : "house_cnt",
							"showDataName" : "아파트",
							"unit" : "호"
						}
					}, {
						title: "연립/다세대",
						mode : "census",
						api_id : "API_0306",
						parameters : {
							"house_type":"03,04",
							"year":censusDataYear,
							"bnd_year":$house.ui.map.bnd_year,
							"low_search":"1"
							
						},
						options:{
							"showData" : "house_cnt",
							"showDataName" : "연립/다세대",
							"unit" : "호"
						}
					}, {
						title: "단독주택",
						mode : "census",
						api_id : "API_0306",
						parameters : {
							"house_type":"01",
							"year":censusDataYear,
							"bnd_year":$house.ui.map.bnd_year,
							"low_search":"1"
							
						},
						options:{
							"showData" : "house_cnt",
							"showDataName" : "단독주택",
							"unit" : "호"
						}
					}, {
						title: "기타",
						mode : "census",
						api_id : "API_0306",
						parameters : {
							"house_type":"10",
							"year":censusDataYear,
							"bnd_year":$house.ui.map.bnd_year,
							"low_search":"1"
							
						},
						options:{
							"showData" : "house_cnt",
							"showDataName" : "기타",
							"unit" : "호"
						}
					}]
				}, {
					title: "사업체 수",
					hideCheckbox: true,
					folder: true,
					children: [{
						title: "종사자 수",
						mode : "census",
						api_id : "API_0304",
						parameters : {
							"year":censusDataYear,
							"bnd_year":$house.ui.map.bnd_year,
							"low_search":"1"
								
						},
						options:{
							"showData" : "employee_cnt",
							"showDataName" : "종사자 수",
							"unit" : "명"
						}
					}, {
						title: "사업체 수",
						mode : "census",
						api_id : "API_0304",
						parameters : {
							"year":censusDataYear,
							"bnd_year":$house.ui.map.bnd_year,
							"low_search":"1"
								
						},
						options:{
							"showData" : "corp_cnt",
							"showDataName" : "사업체 수",
							"unit" : "개"
						}
					}]
				}]
			}],
			click: function(event, data) {
				srvLogWrite('M0','06', '04', '02', '', '');
				if(data.targetType!="expander"&&data.targetType!="checkbox"){
					if(data.node.folder){
						data.node.toggleExpanded();
					}else{
						data.node.setSelected(false);
						data.node.setSelected(true);
					}
				}
			},
			select: function(event, data) {
				var map = $house.ui.map;
				if(data.node.selected){
					function removeRecommendLayer(){
						if(!$house.search.isAbode&&$house.ui.recommendDataGeojson){
							$house.ui.recommendDataGeojson.remove();
						}
					}
					var adm_cd = $house.search.originalActiveAdmCd;
					$house.ui.map.infoWindow.update("");
					if(data.node.data.mode=="indicator"){
						removeRecommendLayer();
						var indicator = $house.search.mapStat.indicator;
						indicator.b_class_idx_id = data.node.data.b_class_idx_id;
						indicator.m_class_idx_id = data.node.data.m_class_idx_id;
						indicator.adm_cd = adm_cd;
						indicator.search(function(options){
							if(hasText(options.adm_cd)){
								if($house.search.isAbode===false&&hasText($house.ui.recommendMarker)){
									map.mapMove([$house.ui.recommendMarker._utmk.x,$house.ui.recommendMarker._utmk.y],options.zoom);
								}else{
									$.ajax({
										url : openApiPath+"/OpenAPI3/boundary/hadmarea.geojson",
										type: "GET",
										data:{
											accessToken : accessToken,
											year : $house.ui.map.bnd_year,
											adm_cd : options.adm_cd, 
											low_search : 0
										},
										async: true,
										dataType:"json",
										success: function(res){
											if(res.errCd=="0"){
												map.mapMove([res.features[0].properties.x,res.features[0].properties.y],options.zoom);
											}
										}
									});
								}
							}else{
								map.mapMove([989674, 1818313],options.zoom);
							}
						});
					}else if(data.node.data.mode=="census"){
						$house.search.isCensus = true;
						var parameters = $.extend(true, {}, data.node.data.parameters);
						var options = $.extend(true, {}, data.node.data.options);
						map.legend.legendPanel.show();
						map.isAutoRefreshCensusApi = false;
						$house.search.isIndicator = false;
						options.callback = function(res){
							$house.ui.map.legend.legendOptionPanel.find(".colorck a:eq(0)").click();
							$house.ui.map.legend.legendOptionPanel.find(" .btn_roption>.bg_blue").click();
							map.isAutoRefreshCensusApi = true;
						};
						removeRecommendLayer();
						if($house.search.isAbode==true){
							$.each($("#legend-option-"+$house.ui.map.id+" li a.circle"),function(){
								$(this).data({
									"start":$(this).data("original-start"),
									"end":$(this).data("original-end")
								});
							});
							map.censusApi.setStatsMapCensusData(data.node.data.api_id,options,parameters);
						}else if($house.search.isAbode==false){
							var radio = $house.ui.recommendListControl.getAdmCdRadio($house.search.originalActiveAdmCd);
							map.mapMove([radio.data("coor-x"),radio.data("coor-y")],$house.databoard.getMapOptions(adm_cd).zoom,false,function(){
								parameters.adm_cd = adm_cd;
								options.adm_cd = adm_cd;
								map.borough = null;
								map.censusApi.setStatsMapAdmCdCensusData(data.node.data.api_id,options,parameters);
							});
						}else{
							return;
						}
					}else{
						return false;
					}
					map.mapControlButton.hide();
				}
			}
		});
	}
}(window, document));