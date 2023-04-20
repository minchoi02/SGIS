(function(W, D) {
	W.$sample = W.$sample || {};
	$(document).ready(function() {
		$sample.event.setUIEvent();
	});
	$(window).on("orientationchange",function(){
		setTimeout(function(){
			$sample.event.mapResize();
		},100);
	});
	$sample.ui = {
		map : null,//지도
		/**
		 * @name        : createMap
		 * @description : 지도 생성
		 * @date        : 2016. 08. 03.
		 * @author	    : 나광흠
		 * @history 	:
		 * @param id    : html tag id
		 */
		createMap: function(id) {
			this.map = new sMap.map();
			this.map.createMap($sample, id, {
				isZoomControl : true,//줌 컨트롤 버튼 생성 유무
				isCurrentControl : true,//현재위치 버튼 생성 유무
				isMapControlButton : true,//지도 컨트롤 박스 생성 유무 
				mapControlButtonOption : //지도 컨트롤 박스의 옵션
				{
					position : "topright"//생성 위치
				},
				isMapStatToggleControl : true,//통계 폴리곤 토글 버튼 생성 유무 
											  //createMap 할때 넘겨준 객체에서 ui.setStats이란 메소드가 존재해야합니다. ex : $sample.ui.setStats
				mapStatToggleOption : //통계 폴리곤 토글 버튼의 옵션
				{
					defaultShowMapStat : true,//초기에 지도의 통계를 보여줄지의 유무
					callback : function(isOn){//콜백(on유무)
					}
				},
				isMapCaptionToggleControl : true,//통계 캡션 토글 버튼 생성 유무
				mapCaptionToggleOption : //통계 캡션 토글 옵션
				{
					defaultShowCaption : true,//초기에 지도의 통계 캡션을 보여줄지의 유무
					callback : function(isOn){//콜백(on유무)
					}
				},
				isPoiControl : true,//POI 컨트롤 버튼 생성 유무
				isMapSizeControl : true,//지도 전체화면 버튼 생성 유무
				isMapNavigator : true,//지도 네비게이션 생성 유무
				navigatorOption : //지도 네비게이션 옵션
				{
					id : "map-navigator-"//네비게이터 아이디(ex : navigator-sido 면 sido를 제거하고 navigator)
//					min : "sido",//최소 지역(sido,sgg,emdong) 옵션
//					max : "emdong"//최대 지역(sido,sgg,emdong) 옵션
				},
				isLegendControl : true,//범례 컨트롤 생성 유무
				legendOption : //범례 옵션
				{
					//legend 객체에 있는 옵션을 참고해주세요
				}
			});
			this.map.addControlEvent("movestart");
			this.map.addControlEvent("moveend");
			this.map.addControlEvent("zoomstart");
			this.map.addControlEvent("zoomend");
			this.map.addControlEvent("drag");
			this.map.addControlEvent("dragend");
			this.map.createInfoWindow("topright");
			this.map.moveCurrentLocation(false);//현재 GPS 위치로 이동
		},
		setStats : function(){
		}
	};
	$sample.callbackFunc = {
		/**
		 * @name         : didMapMoveStart
		 * @description  : 지도 이동시 발생하는 콜백
		 *                 map객체에서 이벤트 등록이 필요합니다.
		 *                 ex : map.addControlEvent("movestart"); 
		 * @date         : 2016. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 * @param event  : event
		 * @param map    : 지도에 관련된 객체
		 */
		didMapMoveStart : function(event,map){
		},
		/**
		 * @name         : didMapMoveEnd
		 * @description  : 지도 이동 종료시 발생하는 콜백
		 *                 map객체에서 이벤트 등록이 필요합니다.
		 *                 ex : map.addControlEvent("moveend"); 
		 * @date         : 2016. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 * @param event  : event
		 * @param map    : 지도에 관련된 객체
		 */
		didMapMoveEnd : function(event,map){
		},
		/**
		 * @name         : didMapZoomStart
		 * @description  : 지도 줌변경 시작시 발생하는 콜백
		 *                 map객체에서 이벤트 등록이 필요합니다.
		 *                 ex : map.addControlEvent("zoomstart"); 
		 * @date         : 2016. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 * @param event  : event
		 * @param map    : 지도에 관련된 객체
		 */
		didMapZoomStart : function(event,map){
		},
		/**
		 * @name         : didMapZoomEnd
		 * @description  : 지도 줌변경 종료시 발생하는 콜백
		 *                 map객체에서 이벤트 등록이 필요합니다.
		 *                 ex : map.addControlEvent("zoomend"); 
		 * @date         : 2016. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 * @param event  : event
		 * @param map    : 지도에 관련된 객체
		 */
		didMapZoomEnd : function(event,map){
		},
		/**
		 * @name         : didMapDrag
		 * @description  : 지도 드래그시 발생하는 콜백
		 *                 map객체에서 이벤트 등록이 필요합니다.
		 *                 ex : map.addControlEvent("drag"); 
		 * @date         : 2016. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 * @param event  : event
		 * @param map    : 지도에 관련된 객체
		 */
		didMapDrag : function(event,map){
		},
		/**
		 * @name         : didMapDragEnd
		 * @description  : 지도 드래그 종료시 발생하는 콜백
		 *                 map객체에서 이벤트 등록이 필요합니다.
		 *                 ex : map.addControlEvent("dragend"); 
		 * @date         : 2016. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 * @param event  : event
		 * @param map    : 지도에 관련된 객체
		 */
		didMapDragEnd : function(event,map){
		},
		/**
		 * @name          : didSelectedPolygon
		 * @description   : 경계 선택시 발생하는 콜백
		 * @date          : 2016. 08. 03. 
		 * @author	      : 나광흠
		 * @history       :
		 * @param event   : event
		 * @param feature : 경계 정보
		 * @param type    : 경계 타입
		 * @param map     : 지도에 관련된 객체
		 */
		didSelectedPolygon : function(event, feature, type, map){
			if(type==="data"){
				map.infoWindow.updateData(feature);//데이터 표현을 infowindow 하고 싶을땐 해당 사용 
//				map.createInfoTooltip(event, feature, type, map);//데이터 표현을 tooltip 하고 싶을땐 해당 사용 
			}
		},
		/**
		 * @name          : didSyncPolygon
		 * @description   : 여러개의 지도가 존재할시 싱크 맞출때 필요한 콜백
		 * @date          : 2016. 08. 03. 
		 * @author	      : 나광흠
		 * @history       :
		 * @param event   : event
		 * @param feature : 경계 정보
		 * @param type    : 경계 타입
		 * @param map     : 지도에 관련된 객체
		 */
		didSyncPolygon : function(event, feature, type, map){
		},
		/**
		 * @name          : didEndMoveCurrentLocation
		 * @description   : 현재위치버튼 클릭시 이동후 발생하는 콜백
		 * @date          : 2016. 08. 03. 
		 * @author	      : 나광흠
		 * @history       :
		 * @param map     : 지도에 관련된 객체
		 */
		didEndMoveCurrentLocation : function(map){
		},
		/**
		 * @name          : didCurrentLocationCircle
		 * @description   : 현재위치 표시해주는 marker주변 circle을 클릭시 발생하는 콜백
		 *                  map 객체에서 currentLocationMarker,currentLocationCircle가 true로 되어있어야합니다
		 * @date          : 2016. 08. 03. 
		 * @author	      : 나광흠
		 * @history       :
		 * @param event   : event
		 * @param layer   : 경계
		 * @param map     : 지도에 관련된 객체
		 */
		didCurrentLocationCircle : function(event, layer, map){
		},
		/**
		 * @name        : didEndBoundary
		 * @description : 경계 다 그리고 난 후 발생하는 콜백
		 * @date        : 2016. 08. 03. 
		 * @author	    : 나광흠
		 * @history     :
		 * @param map   : 지도에 관련된 객체
		 * @param data  : 경계의 통계 정보
		 */
		didEndBoundary : function(map,data){
		}
	};
	$sample.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setUIEvent: function() {
			this.mapResize();
			$sample.ui.createMap("map");
			
			//map객체의 isAutoRefreshCensusApi이면 censusApi호출후 지도 이동하면 자동으로 재 조회 합니다
			$sample.ui.map.censusApi.setStatsMapCensusData(
				"API_0301",//호출 API ID
				{//지도에 표현해줄 내용
					"showData" : "tot_ppltn",//api 조회 후 response에서 보여줄 key
					"showDataName" : "총인구",//임의로 설정할 수 있습니다. 만약 이 옵션을 빼면 기본 이름을 호출 합니다
					"unit" : "명",//단위
					"callback" : function(data){
					}
				},
				{//api호출 파라미터
					"year":censusDataYear,
					"bnd_year":$sample.ui.map.bnd_year
				}
			);
		},
		/**
		 * @name         : mapResize
		 * @description  : UI 리사이즈에 대한 이벤트. 
		 * @date         : 2017. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		mapResize: function(){
			$sample.event.setMapSize();
		},
		/**
		 * @name         : setMapSize
		 * @description  : 지도 사이즈 변경
		 * @date         : 2016. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setMapSize: function(){
			if($("body").hasClass("full")){
				$("#map").height($(window).height());
			}else{
				$("#map").height($(window).height()-$(".Wrap>.Header").outerHeight(true)-$(".Wrap>.Content>.SelectArea").outerHeight(true));
			}
			if($sample.ui.map&&$sample.ui.map.gMap){
				$sample.ui.map.gMap.invalidateSize();
			}
		}
	};
}(window, document));