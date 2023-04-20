(function(W, D) {
	$(document).ready(function() {
		
		srvLogWrite('M0','07', '01', '01', '', '');
		
		
		$biz.event.setUIEvent();
		
		
		
		$("#menuListToggle").click(function(){
			//	mapAreaToggle();
				if($("#itemArea").css("display")=="block"){
					$("#itemArea").hide();
				}else{
					$("#itemArea").show();
				}
		});
		$("#subject1").click(function(){
			
			srvLogWrite('M0','07', '01', '02', '', '');
			
			$biz.event.showItemBox();
			$(".subject1").trigger("click");
			$("#itemArea").hide();
			$("#search-item-box-title").html("생활업종 현황보기");
			$biz.ui.selectAreaGb = "A";
			if($("#map-navigator-sub-menu-sgg option:first").val()=="999"){
				setTimeout(function(){
					$("#map-navigator-sub-menu-sgg option:first").remove();
				},100);
			}
			//전체 제거
		});
		$("#subject2").click(function(){
			
			srvLogWrite('M0','07', '01', '03', '', '');
			
			$biz.event.showItemBox();
			$(".subject2").trigger("click");
			$("#itemArea").hide();
			$("#search-item-box-title").html("업종밀집도 변화");
			$biz.ui.selectAreaGb = "B";
			
			if($("#map-navigator-sub-menu-sgg option:first").val()!="999"){
				setTimeout(function(){
					$("#map-navigator-sub-menu-sgg").prepend("<option value='999' data-x='990480.875' data-y='1815839.375'>전체</option>");
				},100);
			}
			
			
		});
		$("#subject3").click(function(){
			$biz.event.showItemBox();
			$(".subject3").trigger("click");
			$("#itemArea").hide();
		});
		
		$("#chartTableArea").click(function(){
			srvLogWrite('M0','07', '03', '02', '', '');
			$("#databaord-area-button").trigger("click");
		});
		
		
		
		//$('#search-item-box').hide();
	});
	W.$biz = W.$biz || {};
	$(window).on("orientationchange",function(){
		setTimeout(function(){
			$biz.event.mapResize();
		},100);
	});
	$biz.ui = {
		selectAreaGb : "A",
		map : null,//지도
		recommendListControl : null,//후보지역 리스트 컨트롤
		subNavigation : {
			menu : null//메뉴 네비게이터
		},
		heatMapList : [],
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
			this.map.isAutoRefreshCensusApi = false;
			this.map.isDrawBoundary = false;
			//this.map.isDrawBoundary = true;
			setNavigator("menu");
			this.map.createMap($biz, id, {
				maxZoom : 6,
				isCurrentControl : true,
				isZoomControl : true,
				isMapNavigator : true,
				navigatorOption : {
					id : "map-navigator-",
					isCountry:false
				},	
				isMapCaptionToggleControl : true,
				mapCaptionToggleOption : {
					callback : function(isOn){
						$biz.ui.setCaption(isOn);
					}
				},
				isMapSizeControl : true
			});
			this.map.addControlEvent("movestart");
			this.map.addControlEvent("moveend");
			this.map.addControlEvent("zoomstart");
			this.map.addControlEvent("zoomend");
			this.map.createInfoWindow("topright");
			this.createRecommendListControl();
		},
		setStats : function(){
			
		},
		/**
		 * @name        : setCaption
		 * @description : 캡션
		 * @date        : 2017. 02. 09.
		 * @author	    : 나광흠
		 * @history 	:
		 * @param isOn  : 보여줄지 유무
		 */
		setCaption : function (isOn) {
			var boundaryList;
			if($biz.search.changeBusiness.geojson){
				boundaryList = $biz.search.changeBusiness.geojson;
			}else if($biz.search.currentState){
				boundaryList = $biz.search.currentState.geojson;
			}else{
				return false;
			}
			$.each(boundaryList,function(cnt,boundary){
				if(isOn===true){
					boundary.eachLayer(function(layer) {
						$biz.ui.drawCaption(boundary,layer);
					});
				}else{
					if(boundary != null) {
						boundary.eachLayer(function (layer) {
							layer.removeCaption();
						});
					}
				}
			});
		},
		/**
		 * @name           : setCaption
		 * @description    : 캡션 생성
		 * @date           : 2017. 02. 09.
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param boundary : 경계
		 * @param layer    : 레이어
		 */
		drawCaption : function(boundary,layer){
			layer.removeCaption();
			if(layer.feature.properties.adm_cd.length > 7) {
				if(!hasText(layer.feature.properties.x)||!hasText(layer.feature.properties.y)){
					try{
						var center = layer.getCenter();
						layer.feature.properties.x = center.x;
						layer.feature.properties.y = center.y;
					}catch(e){
						console.warn(e);
					}
				}
			}
			var x = layer.feature.properties.x;
			var y = layer.feature.properties.y;
			if(x&&y){
				if(layer.feature.info&&layer.feature.info.length>0){
					var info = layer.feature.info[0];
					if(info.result){
						var value,color;
						if($.isNumeric(info.result[info.showData])){
							value = appendCommaToNumber(parseFloat(info.result[info.showData]));
							color = "#222222";
						}else{
							value = info.result[info.showData];
							color = "#c51404ff";
						}
						layer.setCaption({title:value, color:color}, [x,y]);
					}else{
						layer.setCaption({title:"N/A", color:"#fff"}, [x,y]);
					}
				}else{
					layer.setCaption({title:"N/A", color:"#fff"}, [x,y]);
				}
				if(layer.captionObj&&layer.captionObj._captionspan){
					$(layer.captionObj._captionspan).click(function(e){
						$.each(boundary.getLayers(),function(cnt,dataLayer){
							if(dataLayer._containsPoint){
								var point = $biz.ui.map.gMap.mouseEventToLayerPoint(e); // 터치 포인트
								if(dataLayer._containsPoint(point)){
									dataLayer.fire("click");
									return false;
								}
							}
						});
					});
				}
			}
		},
		/**
		 * @name          : createRecommendListControl
		 * @description   : 후보지역 리스트 버튼 생성
		 * @date          : 2017. 02. 15. 
		 * @author        : 나광흠
		 * @history       :
		 */
		createRecommendListControl : function() {
			var map = $biz.ui.map;
			var mapListControl = sop.control({
				position: 'bottomleft'
			});
			mapListControl.onAdd = function() {
				this._div = sop.DomUtil.create('div', 'map-list');
				var mapList = $("<div/>",{"class":"history-list","style":"left:-320px;"}).append($("<div/>",{"class":"recommend-list"}),$("<div/>",{"class":"item-list","style":"height:28px;padding:13px 0 0 100px;"}));
				var mapListButton = $("<div/>",{"class":"button-box"}).append($("<a/>", {
					html: '<span>후보지역</span><img src="'+contextPath+'/resources/images/common/icon_totalmenu.gif" alt="후보지역버튼">'
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
					
					
					
					$biz.search.init();
					$biz.search.proposedSite.geojson.addTo(map.gMap);
					var adm_cd = $(this).data("adm-cd").toString();
					$.each($biz.search.proposedSite.geojson.getLayers(),function(cnt,node){
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
	};
	$biz.callbackFunc = {
		didSelectedPolygon : function(event, data, type, map) {
			if(type==="data"){
				map.infoWindow.updateData(data);
			}
		}
	};
	$biz.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 06. 29. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setUIEvent: function() {
			this.mapResize();
			$biz.ui.createMap("map");
			//데이터보드보기
			$("#databaord-area-button").click(function(){
				if(!$("#databaord-area-button").hasClass("NoneAction")){
					$(".Open_Type1").hide();
					$biz.event.setItemBoxSize();
					var type = $("#itemSubject a.M_on").data("type");
					var titleText = "";
					var themeCdVal ="";
					if(type == "current-state"){
						themeCdVal = $("input[name=theme_current-state]:checked").val();
					}else if(type == "change-business"){
						themeCdVal = $("input[name=theme_change-business]:checked").val();
					}
					
					var themeCdGb = themeCdVal.substring(0,1);
					
					
					var tabSelectNum = "1";
					if(themeCdGb == "5"){
						tabSelectNum = "1";
					}else if(themeCdGb == "2"){
						tabSelectNum = "2";
					}else if(themeCdGb == "1"){
						tabSelectNum = "3";
					}else if(themeCdGb == "4"){
						tabSelectNum = "4";
					}
					
					var titleText = "";
					
					if(themeCdVal == "5001"){
						titleText = "한식";
					}else if (themeCdVal == "5002"){
						titleText = "중식";
					}else if (themeCdVal == "5003"){
						titleText = "일식";
					}else if (themeCdVal == "5004"){
						titleText = "분식";
					}else if (themeCdVal == "5005"){
						titleText = "서양식";
					}else if (themeCdVal == "5006"){
						titleText = "제과점";
					}else if (themeCdVal == "5007"){
						titleText = "패스트푸드";
					}else if (themeCdVal == "5008"){
						titleText = "치킨";
					}else if (themeCdVal == "5009"){
						titleText = "호프 및 간이주점";
					}else if (themeCdVal == "5010"){
						titleText = "카페";
					}else if (themeCdVal == "5011"){
						titleText = "기타 외국식";
					}else if (themeCdVal == "2001"){
						titleText = "문구점";
					}else if (themeCdVal == "2002"){
						titleText = "서점";
					}else if (themeCdVal == "2003"){
						titleText = "편의점";
					}else if (themeCdVal == "2004"){
						titleText = "식료품점";
					}else if (themeCdVal == "2005"){
						titleText = "휴대폰점";
					}else if (themeCdVal == "2006"){
						titleText = "의류";
					}else if (themeCdVal == "2007"){
						titleText = "화장품/방향제";
					}else if (themeCdVal == "2008"){
						titleText = "철물점";
					}else if (themeCdVal == "2009"){
						titleText = "주유소";
					}else if (themeCdVal == "2010"){
						titleText = "꽃집";
					}else if (themeCdVal == "2011"){
						titleText = "슈퍼마켓";
					}else if (themeCdVal == "1001"){
						titleText = "인테리어";
					}else if (themeCdVal == "1002"){
						titleText = "목욕탕";
					}else if (themeCdVal == "1003"){
						titleText = "교습학원";
					}else if (themeCdVal == "1004"){
						titleText = "어학원";
					}else if (themeCdVal == "1005"){
						titleText = "예체능학원";
					}else if (themeCdVal == "1006"){
						titleText = "부동산중개업";
					}else if (themeCdVal == "1007"){
						titleText = "이발소";
					}else if (themeCdVal == "1008"){
						titleText = "미용실";
					}else if (themeCdVal == "1009"){
						titleText = "세탁소";
					}else if (themeCdVal == "1010"){
						titleText = "PC방";
					}else if (themeCdVal == "1011"){
						titleText = "노래방";
					}else if (themeCdVal == "4001"){
						titleText = "호텔";
					}else if (themeCdVal == "4002"){
						titleText = "여관(모텔포함) 및 여인숙";
					}else if (themeCdVal == "4003"){
						titleText = "팬션";
					}
					
					

					if(type=="current-state"){
					//	alert("데이터 보드 탭 선택 : " + "#current-state-"+($biz.search.currentState.adm_cd.length==2?"sido":"sgg")+"-databoard nav a:nth-child(2)aaa");
						
						
						$("#current-state-title-area").html("생활업종 현황보기 - " + titleText);
						
						$("#current-state-"+($biz.search.currentState.adm_cd.length==2?"sido":"sgg")+"-databoard nav a:nth-child(" + tabSelectNum + ")").trigger("click");
					}else if(type=="change-business"){
						
						$("#change-business-databoard-title-area").html("업종밀집도 변화- " + titleText);
						
						$("#change-business-databoard .select-box-area a[data-theme="+$biz.search.changeBusiness.theme_cd+"]").trigger("click");
//						$("#change-business-databoard .select-box-area").scrollLeft($("#change-business-databoard .select-box-area a[data-theme="+$biz.search.changeBusiness.theme_cd+"]").offset().left);
						$("#change-business-databoard .select-box-area").scrollLeft(0);
					}else if(type=="proposed-site"){
						$("#proposed-site-databoard nav a:first").trigger("click");
					}
				}
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
			$biz.event.setMapSize();
			$biz.event.setItemBoxSize();
		},
		/**
		 * @name         : showItemBox
		 * @description  : 검색 항목 보이기
		 * @date         : 2016. 03. 22. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		showItemBox: function(){
			$("#search-item-box").show();
			$biz.event.setItemBoxSize();
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
			$(".Open_Type1").height($(window).height()-$(".Wrap>.Header").outerHeight(true));
			//$(".MenuBox").height($(window).height()-$(".Wrap>.Header").outerHeight(true)-$(".BtnClose").outerHeight(true)-$("#itemSubject").outerHeight(true)-$(".SelectArea").outerHeight(true)-$(".Btn_Search").outerHeight(true)-$("#search-box").outerHeight(true)-10);
			$(".MenuBox").height($(window).height()-$(".Wrap>.Header").outerHeight(true)-$(".BtnClose").outerHeight(true)-$("#itemSubject").outerHeight(true)-$(".SelectArea").outerHeight(true)-$(".Btn_Search").outerHeight(true)-$("#search-box").outerHeight(true)-50);
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
			if($biz.ui.map&&$biz.ui.map.gMap){
				$biz.ui.map.gMap.invalidateSize();
			}
		}
	};
	/**
	 * @name         : setNavigator
	 * @description  : 지역 네비게이터 셋팅
	 * @date         : 2017. 02. 06. 
	 * @author	     : 나광흠
	 * @history      :
	 */
	function setNavigator(id){
		$biz.ui.subNavigation[id] = new mapNavigation.UI($biz.ui.map);
		$biz.ui.subNavigation[id].isCountry = false;
		$biz.ui.subNavigation[id].navigatorId = "map-navigator-sub-"+id+"-";
		$biz.ui.subNavigation[id].initialize();
	}
}(window, document));