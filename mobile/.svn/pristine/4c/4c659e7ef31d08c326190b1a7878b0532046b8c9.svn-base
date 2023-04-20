/**
 * 맵에 관한 공통 메소드
 */
//if($(location).attr('pathname').match("workroad")) bndYear="2019"; // 2019.10.31(목)~2019.11.07(목) 한시적 운영

(function (W, D) {
	W.sMap = W.sMap || {};
	sMap = {
		map : function() {
			var that = this;
			this.id = null;//현재 지도 아이디
			this.bnd_year = bndYear;//경계 년도
			this.delegate = null;//sMap을 호출한 오브젝트
			this.gMap = null;//sop map
			this.target = null;//지도를 생성한 id 
			this.center = [989641.25, 1818258.75];//기본 중심값
			this.zoom = 9;//기본 줌레벨
			this.curPolygonCode = null;//[0 : 전국(줌 레벨 0~1)][1 : 시도(줌 레벨 2~3)],[2 : 시군구 : (줌 레벨 4~5)], [3 : 읍면동 : (줌 레벨 6~8)], [4 : 집계구 : (줌 레벨 8 이상)]
			this.curSidoCd = null;//현재 시도 코드
			this.curSggCd = null;//현재 시군구 코드
			this.curEmdongCd = null;//현재 읍면동 코드
			this.curSidoNm = null;//현재 시도 이름
			this.curSggNm = null;//현재 시군구 이름
			this.curEmdongNm = null;//현재 읍면동 이름
			this.legend = null;//범례
			this.poi = null;//poi
			this.censusApi = null;//센서스 api
			this.isAutoRefreshCensusApi = true;
			this.mapNavigation = null;//지도 네비게이션
			this.currentDefaultZoom = 10;//현재위치 이동할때 기본 줌
			this.geojson = null;//경계 json
			this.boundary = null;//지도의 현재 경계
			this.isDrawBoundary = true;//지도에 경계를 그릴지 여부
			this.dataBoundary = null;//지도의 통계 데이터 경계
			this.data = [];//지도에 뿌려진 데이터 값
			this.showCaption = false;//데이터 표출 유무
			this.activeLayer = null;//현재 레이어
			this.isLayer = false;//지도를 클릭한게 layer 유무
			this.activeLayerColor = "#0086c6";//선택된 경계 테두리 색상
			this.isCurrentLocationMarker = false;//현재 위치로 이동하면 마커 찍을지 유무
			this.currentLocationMarker = null;//현재 위치 마커
			this.currentLocationCircle = null;//현재 위치 써클
			this.infoWindow = null;//지도 설정 창
			this.mapControlButton = null;//지도 설정 컨트롤
			this.isDrawStat = true;//통계를 그릴지 말지 여부
			this.chooseLegendColor = null;//범례 색상
			this.borough = null;//자치구는 1
			this.dataGeojson = null;
			this.boundLevel = "1";
			this.mapMode = "normal";
			//this.theme_load_cnt = "";//통계주제도 로딩 카운트로 처음 불러올때 현재 위치를 찾아서 콤보박스를 구성하는데 조회시 페이지 전체가 로딩이 되므로 다시 세팅되므로 조회버튼이 클릭되면 현재 위치로 변경이 않되도록 하기 위한 변수
			
			/**
			 * @name           : createMap
			 * @description    : 맵을 생성한다.
			 * @date           : 2016. 03. 16. 
			 * @author         : 나광흠
			 * @history        :
			 * @param delegate : 맵을 생성한 object
			 * @param target   : 맵이 생성될 곳의 id
			 * @param option   : 옵션
			 * {
			 *  minZoom : minZoom
			 *  maxZoom : maxZoom
			 *  isZoomControl : 줌 컨트롤 버튼 생성 유무
			 *  isCurrentControl : 현재위치 버튼 생성 유무
			 *  isMapControlButton : 지도 컨트롤 박스 생성 유무 
			 *  mapControlButtonOption : 지도 컨트롤 박스의 옵션
			 *  	{
			 *  		position : 생성 위치
			 *  	}
			 *  isMapStatToggleControl : 통계 폴리곤 토글 버튼 생성 유무
			 *  mapStatToggleOption : 통계 폴리곤 토글 버튼의 옵션
			 *  	{
			 *  		defaultShowMapStat : 초기에 지도의 통계를 보여줄지의 유무
			 *  		callback : callback(isOn)
			 *  	}
			 *  isMapCaptionToggleControl : 통계 캡션 토글 버튼 생성 유무
			 *  mapCaptionToggleOption : 통계 캡션 토글 옵션
			 *  	{
			 *  		defaultShowCaption : 초기에 지도의 통계 캡션을 보여줄지의 유무
			 *  		callback : callback(isOn)
			 *  	}
			 *  isPoiControl : POI 컨트롤 버튼 생성 유무
			 *  isMapSizeControl : 지도 전체화면 버튼 생성 유무
			 *  isMapNavigator : 지도 네비게이션 생성 유무
			 *  navigatorOption : 지도 네비게이션 옵션
			 *  	{
			 *  		id : 네비게이터 아이디(ex : navigator-sido 면 sido를 제거하고 navigator)
			 *  		isCountry : 전국 추가 여부
			 *  		min : 최소 지역(sido,sgg,emdong)
			 *  		max : 최대 지역(sido,sgg,emdong)
			 *          callback : callback
			 *  	}
			 *  isLegendControl : 범례 컨트롤 생성 유무
			 *  legendOption : 범례 옵션
			 *  	{
			 *  		legend 객체에 있는 옵션을 참고해주세요
			 *  	}
			 * }
			 */
			this.createMap = function (delegate, target, option) {
				this.id = uuid();
				if(delegate){
					this.delegate = delegate;
				}else{
					console.error("delegate undefined");
					return false;
				}
				if(target){
					this.target = target;
				}else{
					console.error("delegate undefined");
					return false;
				}
				
				this.gMap = sop.map(this.target,{
					zoomControl:option.isZoomControl
				});
				if(option){
					if($.isNumeric(option.minZoom)){
						if(parseInt(option.minZoom)<0){
							option.minZoom = 0;
						}
						this.gMap.setMinZoom(option.minZoom);
					}
					if($.isNumeric(option.maxZoom)){
						if(parseInt(option.maxZoom)<0){
							option.maxZoom = 0;
						}
						this.gMap.setMaxZoom(option.maxZoom);
					}
					
					if(/^true$/.test(option.isCurrentControl)){//현재위치 버튼 생성
						this.createCurrentLocationButton();
					}
					if(/^true$/.test(option.isZoomControl)){//줌레벨 변경 버튼 생성
						var zoomControl = this.gMap.zoomControl;
						zoomControl.setPosition("topleft");
					}
					if(/^true$/.test(option.isMapSizeControl)){//지도 전체화면 버튼 생성
						if(delegate&&delegate.event&&delegate.event.setMapSize){
							//this.createMapSizeControlButton();
						}else{
							console.warn("delegate event setMapSize undefined");
						}
					}
					if(
						/^true$/.test(option.isMapControlButton)||
						/^true$/.test(option.isMapStatToggleControl)||
						/^true$/.test(option.isMapCaptionToggleControl)){//지도 설정 버튼 생성
						this.createMapControlButton(option.mapControlButtonOption);
					}
					if(/^true$/.test(option.isPoiControl)){//POI 버튼 생성
						//this.createPoiControl(); 2020-07-17[곽제욱] poi 2번생성하는->1번생성으로 변경
						this.createPoiControl2();
						
						$(".poitop100px").css("top", "100px");
					}
					if(/^true$/.test(option.isMapStatToggleControl)){//통계지도 토글 버튼 생성
						if(delegate&&delegate.ui&&delegate.ui.setStats){
							this.createMapStatToggleControlButton(option.mapStatToggleOption);
						}else{
							console.warn("delegate ui setStats undefined");
						}
					}
					if(/^true$/.test(option.isMapCaptionToggleControl)){//통계 캡션 토글 버튼 생성
						this.createMapCaptionToggleControlButton(option.mapCaptionToggleOption);
					}
					if(/^true$/.test(option.isMapNavigator)){//네비게이터 생성
						this.mapNavigation = new mapNavigation.UI(this);
						option.navigatorOption = option.navigatorOption||{};
						if(option.navigatorOption.min){
							this.mapNavigation.minLocation = option.navigatorOption.min;
						}
						if(option.navigatorOption.max){
							this.mapNavigation.maxLocation = option.navigatorOption.max;
						}
						if(/^false$/.test(option.navigatorOption.isCountry)){
							this.mapNavigation.isCountry = false;
						}
						this.mapNavigation.navigatorId = option.navigatorOption.id;
						this.mapNavigation.initialize(option.navigatorOption.callback);
					}
				}
				this.gMap.setView(sop.utmk(this.center[0], this.center[1]), this.zoom);
				that.openApiReverseGeoCode(that.center);
				//범례생성
				this.legend = new cLegendInfo.catchmentAreaLegendInfo(this);
				if(this.chooseLegendColor){
					this.legend.chooseLegendColor = this.chooseLegendColor;
				}
				if(option.isLegendControl===undefined||option.isLegendControl===null){
					option.isLegendControl = true;
				}
				if(/^true$/.test(option.isLegendControl)){
					if(option.legendOption){
						$.map(option.legendOption,function(value,key){
							that.legend[key] = value;
						})
					}
					this.legend.createLegendControl();//범례 설정창
				}
				this.censusApi = new sCensusApi.request(this);
				this.gMap.on("click",function(e){
					if(!that.isLayer){
						that.removeActiveStyle();
					}
					that.isLayer = false;
				});
				
			};
			/**
			 * @name            : initialize
			 * @description     : 초기화
			 * @date            : 2016. 03. 16. 
			 * @author          : 나광흠
			 * @history         :
			 */
			this.initialize = function(){
				this.data = [];
				if(this.boundary!=null){
					this.boundary.remove();
				}
				if(this.dataBoundary!=null){
					this.dataBoundary.remove();
				}
				this.boundary = null;
				this.dataBoundary = null;
				if(this.geojson==null){
					this.getBoundary(false);
				}else{
					this.setBoundary(this.geojson,false);
				}
			};
			/**
			 * @name        : setPolygonCode
			 * @description : curPolygonCode 를 셋팅한다.
			 * @date        : 2016. 03. 16. 
			 * @author      : 나광흠
			 * @history     :
			 */
			this.setPolygonCode = function(){
				var zoom = this.gMap.getZoom();
				if(zoom<=1){
					this.curPolygonCode = 0;
				}else if(zoom<=3){
					this.curPolygonCode = 1;
				}else if(zoom<=5){
					this.curPolygonCode = 2;
				}else if(zoom<=8){
					this.curPolygonCode = 3;
				}else{
					this.curPolygonCode = 4;
				}
			};
			/**
			 * @name        : addControlEvent
			 * @description : 이벤트 등록
			 * @date        : 2016. 03. 16. 
			 * @author      : 나광흠
			 * @history     :
			 * @param type  : 이벤트 타입
			 */
			this.addControlEvent = function (type) {
				// 지도이동
				if (type == "movestart") {
					this.gMap.on("movestart", function (e) {
						if (that.delegate && that.delegate.callbackFunc && that.delegate.callbackFunc.didMapMoveStart instanceof Function) {
							that.delegate.callbackFunc.didMapMoveStart(e, that);
						}
					});
				}
				// 지도이동종료
				else if (type == "moveend") {
					this.gMap.on("moveend", function (e) {
						var center = e.target.getCenter();
						that.openApiReverseGeoCode([center.x,center.y]);
						if(that.poi){
							that.poi.refreshPoi();
						}
						if (that.delegate && that.delegate.callbackFunc && that.delegate.callbackFunc.didMapMoveEnd instanceof Function) {
							that.delegate.callbackFunc.didMapMoveEnd(e, that);
						}
					});
				}
				// 줌 시작
				else if (type == "zoomstart") {
					this.gMap.on("zoomstart", function (e) {
						if (that.delegate && that.delegate.callbackFunc && that.delegate.callbackFunc.didMapZoomStart instanceof Function) {
							that.delegate.callbackFunc.didMapZoomStart(e, that);
						}
					});
				}
				// 줌 종료
				else if (type == "zoomend") {
					this.gMap.on("zoomend", function (e) {
						if(that.poi){
							that.poi.refreshPoi();
						}
						if (that.delegate && that.delegate.callbackFunc && that.delegate.callbackFunc.didMapZoomEnd instanceof Function) {
							that.delegate.callbackFunc.didMapZoomEnd(e, that);
						}
					});
				}
				// 지도 드래그
				else if (type == "drag") {
					this.gMap.on("drag", function (e) {
						if (that.delegate && that.delegate.callbackFunc && that.delegate.callbackFunc.didMapDrag instanceof Function) {
							that.delegate.callbackFunc.didMapDrag(e, that);
						}
					});
				}
				// 지도 드래그 종료
				else if (type == "dragend") {
					this.gMap.on("dragend", function (e) {
						if (that.delegate && that.delegate.callbackFunc && that.delegate.callbackFunc.didMapDragEnd instanceof Function) {
							that.delegate.callbackFunc.didMapDragEnd(e, that);
						}
					});
				}
				// SGIS4_생활권역_모바일 시작
				else if (type == "click") {
					this.gMap.on("click", function (e) {
						if (that.delegate && that.delegate.callbackFunc && that.delegate.callbackFunc.didMapDragEnd instanceof Function) {
							that.delegate.callbackFunc.didMapClick(e, that);
						}
					});
				}
				// SGIS4_생활권역_모바일 끝
			};
			/**
			 * @name              : geocode
			 * @description       : OpenAPI 지오코딩
			 * @date              : 2016. 03. 16. 
			 * @author            : 나광흠
			 * @history           :
			 * @param address     : 주소
			 * @param pagenum     : 페이지 번호
			 * @param resultcount : 리스트에 몇개 보여줄지의 개수
			 * @param callback    : callback
			 */
			this.geocode = function(address,pagenum,resultcount,callback){
				if(address){
					var obj = new sop.openApi.addr.geocode.api();
					obj.addParam("accessToken", accessToken);
					obj.addParam("address", address);
					if(pagenum){
						obj.addParam("pagenum", pagenum);
					}
					if(resultcount){
						obj.addParam("resultcount", resultcount);
					}
					obj.request({
						method : "GET",
						async : false,
						url : openApiPath + "/OpenAPI3/addr/geocode.json",
						options : {
							target : this,
							address : address,
							pagenum : pagenum,
							resultcount : resultcount,
							callback : callback
						}
					});
				}
			}
			/**
			 * @name            : reverseGeoCode
			 * @description     : OpenAPI 리버스지오코딩
			 * @date            : 2016. 03. 16. 
			 * @author          : 나광흠
			 * @history         :
			 * @param addr_type : 10:도로명,20:읍면동,21:지번함
			 * @param center    : 지도 중심
			 * @param callback  : callback
			 */
			this.reverseGeoCode = function(addr_type,center,callback){
				var obj = new sop.openApi.reverseGeoCodeCallback.api();
				obj.addParam("accessToken", accessToken);
				obj.addParam("addr_type", addr_type);
				obj.addParam("x_coor", center[0]);
				obj.addParam("y_coor", center[1]);
				obj.request({
					method : "GET",
					async : false,
					url : openApiPath + "/OpenAPI3/addr/rgeocode.json",
					options : {
						target : this,
						addr_type : addr_type,
						center : center,
						callback : callback
					}
				});
			}
			/**
			 * @name         : openApiReverseGeoCode
			 * @description  : OpenAPI 리버스지오코딩
			 * @date         : 2016. 03. 16. 
			 * @author       : 나광흠
			 * @history      :
			 * @param center : 지도 중심
			 */
			this.openApiReverseGeoCode = function (center) {
				var obj = new sop.openApi.reverseGeoCode.api();
				obj.noLoading = true;
				obj.addParam("accessToken", accessToken);
				obj.addParam("addr_type", "20");
				obj.addParam("x_coor", center[0]);
				obj.addParam("y_coor", center[1]);
				obj.request({
					method : "GET",
					async : false,
					url : openApiPath + "/OpenAPI3/addr/rgeocode.json",
					options : {
						target : this,
						center : center
					}
				});
			};
			
			/**
			 * @name         : openApiReverseGeoCode2
			 * @description  : OpenAPI 리버스지오코딩2 통계주제도 첫페이지 로딩시 콤보박스를 현재 위치로 세팅 
			 * @date         : 2017.11.08
			 * @author       : 김준하
			 * @history      :
			 * @param center : 지도 중심
			 */
			this.openApiReverseGeoCode2 = function (center) {
				var obj = new sop.openApi.reverseGeoCode2.api();
				obj.noLoading = true;
				obj.addParam("accessToken", accessToken);
				obj.addParam("addr_type", "20");
				obj.addParam("x_coor", center[0]);
				obj.addParam("y_coor", center[1]);
				obj.request({
					method : "GET",
					async : false,
					url : openApiPath + "/OpenAPI3/addr/rgeocode.json",
					options : {
						target : this,
						center : center
					}
				});
			};
			
			/**
			 * @name        : getAdmCd
			 * @description : 행정동코드를 curPolygonCode에 따라 갖고온다(최대 읍면동까지)
			 * @date        : 2016. 03. 16. 
			 * @author      : 나광흠
			 * @history     :
			 */
			this.getAdmCd = function(){
				console.log("[2020] common > map.js> this.curPolygonCode = " + this.curPolygonCode);
				if(this.curPolygonCode<=1){
					return "00";
				}else if(this.curPolygonCode==2){
					console.log("[2020] common > map.js> this.curPolygonCode == 2  [ curSidoCd = " + this.curSidoCd + "]");
					return this.curSidoCd;
				}else if(this.curPolygonCode==3){
					console.log("[2020] common > map.js> this.curPolygonCode == 3  [ curSidoCd + curSggCd = " + this.curSidoCd+this.curSggCd+ "]");
					return this.curSidoCd+this.curSggCd;
				}else if(this.curPolygonCode>=4){
					console.log("[2020] common > map.js> this.curPolygonCode >= 4  [ curSidoCd + curSggCd + curEmdongCd = " + this.curSidoCd+this.curSggCd+this.curEmdongCd+ "]");
					return this.curSidoCd+this.curSggCd+this.curEmdongCd;
				}
			};
			/**
			 * @name                 : getSouthKoreaSidoBoundary
			 * @description          : 전국 시도 정보
			 * @date                 : 2016. 03. 16. 
			 * @author               : 나광흠
			 * @history              :
			 * @param isDataBoundary : 데이터 경계 유무
			 * @param callback       : callback
			 */
			function getSouthKoreaSidoBoundary(isDataBoundary,callback){
				$.ajax({
					type: "POST",
					url: sgisContextPath+"/js/data/geo_sido_"+that.bnd_year+".js",
					//url: contextPath+"/resources/js/data/geo_sido_"+that.bnd_year+".js",	// 2020.03.31[한광희] 운영 반영 금지 개발서버 환경
					dataType: "json",
					async : false,
					success: function(res) {
						that.setBoundary(res,isDataBoundary,callback);
					}
				});
			};
			/**
			 * @name                 : getBoundary
			 * @description          : OpenAPI 경계 정보
			 * @date                 : 2016. 03. 16. 
			 * @author               : 나광흠
			 * @history              :
			 * @param adm_cd         : 행정동 코드
			 * @param isDataBoundary : 데이터 경계 유무
			 * @param callback       : callback
			 */
			this._boundary = function(adm_cd,isDataBoundary,callback){
				this.setPolygonCode();
				if(adm_cd){
					var obj = new sop.openApi.boundary.api();
					var boundaryType = adm_cd.length>=7?"statsarea":"hadmarea";
					obj.noLoading = true;
					obj.addParam("accessToken", accessToken);
					obj.addParam("year", this.bnd_year);
					obj.addParam("adm_cd", adm_cd);
					if(this.borough){
						obj.addParam("borough", this.borough);
					}
					obj.request({
						method : "GET",
						async : false,
						url : openApiPath + "/OpenAPI3/boundary/"+boundaryType+".geojson",
						options : {
							target : this,
							isDataBoundary : isDataBoundary,
							adm_cd : adm_cd,
							callback : callback
						}
					});
				}else{
					getSouthKoreaSidoBoundary(isDataBoundary,callback);
				}
			};
			/**
			 * @name                 : getBoundary
			 * @description          : OpenAPI 경계 정보
			 * @date                 : 2016. 03. 16. 
			 * @author               : 나광흠
			 * @history              :
			 * @param isDataBoundary : 데이터 경계 유무
			 * @param callback       : callback
			 */
			this.getBoundary = function(isDataBoundary,callback){
				if(this.boundary!=null){
					this.boundary.remove();
					this.boundary = null;
				}
				if(this.curPolygonCode>1){
					var adm_cd = this.getAdmCd();
					if(adm_cd){
						that._boundary(adm_cd,isDataBoundary,callback);
					}
				}else{
					getSouthKoreaSidoBoundary(isDataBoundary,callback);
				}
			};
			/**
			 * @name                 : setBoundary
			 * @description          : 지도에 경계를 그린다.
			 * @date                 : 2016. 03. 16. 
			 * @author               : 나광흠
			 * @history              :
			 * @param geojson        : geojson
			 * @param isDataBoundary : 데이터 경계인지 유무
			 * @param callback       : callback
			 */
			this.setBoundary = function(geojson,isDataBoundary,callback){
				this.geojson = geojson;
				var boundary;
				
				
				//==================== test
				//isDataBoundary = true;
				//this.isDrawBoundary = true;
				//===================
				console.log("[map.js] isDataBoundary [" + isDataBoundary);
				console.log("[map.js] this.isDrawBoundary [" + this.isDrawBoundary);
				
				
				
				
				if(isDataBoundary){
					boundary = "dataBoundary";
				}else{
					boundary = "boundary";
				}
				if(this[boundary]){
					this[boundary].remove()
				}
				this[boundary] = this.getSopBoundary(geojson);
				if(this.isDrawBoundary&&!isDataBoundary&&!(this.boundary&&this.dataBoundary&&this.dataBoundary.getBounds().equals(this.boundary.getBounds()))){
					this[boundary].addTo(this.gMap);
					if(geojson.features[0].properties.adm_cd.length > 7) {
						this[boundary].eachLayer(function(layer) {
							if (layer.feature.properties.adm_cd.length > 7) {
								try{
									var center = layer.getCenter();
									layer.feature.properties.x = center.x;
									layer.feature.properties.y = center.y;
								}catch(e){
									console.warn(e);
								}
							}
						});
					}
				}
				if(typeof callback === "function"){
					callback();
				}
			};
			/**
			 * @name          : getSopBoundary
			 * @description   : 경계 객체
			 * @date          : 2016. 03. 16. 
			 * @author        : 나광흠
			 * @history       :
			 * @param geojson : geojson
			 */
			this.getSopBoundary = function(geojson){
				var defaultStyle = {weight: 2,opacity: 1,color: "#666666",dashArray: 3,fillOpacity: 0};//폴리곤 기본 스타일
				return sop.geoJson(geojson, {
					style: function () {
						var activeStyle = $.extend(true, {}, defaultStyle);
						activeStyle.type="polygon";
						return activeStyle;
					},
					onEachFeature: function (feature, layer) {
						layer.on({
							click : function (e) {
								layer.bringToFront();
								that.layerClickStyle(layer);
								if(that.currentLocationCircle){
									that.currentLocationCircle.bringToFront();
								}
								// mouse over , 사용자 콜백
								if (that.delegate && 
									that.delegate.callbackFunc &&
									that.delegate.callbackFunc.didSelectedPolygon) {
									that.delegate.callbackFunc.didSelectedPolygon(e, feature, layer.options.type, that);
								}
								if(that.mapControlButton){
									that.mapControlButton.hide();
								}
							},
							sync : function (e) {
								if(e.action == "click") {
									layer.bringToFront();
									that.layerClickStyle(layer);
									if (that.delegate && 
										that.delegate.callbackFunc &&
										that.delegate.callbackFunc.didSyncPolygon) {
										that.delegate.callbackFunc.didSyncPolygon(e, feature, layer.options.type, that);
									}
								}
							}
						});
					}
				});
			}
			/**
			 * @name          : layerClickStyle
			 * @description   : 
			 * @date          : 2016. 03. 16. 
			 * @author        : 나광흠
			 * @history       :
			 * @param geojson : geojson
			 */
			this.layerClickStyle = function(layer){
				that.isLayer = true;
				that.removeActiveStyle();
				that.activeLayer = layer;
				layer.bringToFront();
				layer.setStyle({
					weight: 4,
					color: that.activeLayerColor,
					dashArray: layer.options.dashArray,
					fillOpacity: layer.options.fillOpacity,
					fillColor: layer.options.fillColor,
				});
			}
			/**
			 * @name            : setStatsData
			 * @description     : 경계에 데이터를 셋팅한다.
			 * @date            : 2016. 03. 16. 
			 * @author          : 나광흠
			 * @history         :
			 * @param options   : 지도에 뿌려줄 옵션
			 * 	{
			 *  	adm_cd : 행정동 코드
			 *  	showData : 보여줄 데이터 값의 key
			 *  	showDataName : 보여줄 데이터 이름
			 *  	unit : 단위
			 *  	callback : callback
			 * 	}
			 * @param data      : 데이터
			 * @param parameter : parameter
			 */
			this.setStatsData = function (type, data, showDataParamName, unit, length) {
				
				console.log("[catchmentAreaMap.js] setStatsData() 호출 interactiveMapApi.js와 이름이 같으므로 주의요망");
				console.log(data);
				this.data = [];
				
				if (data != null) {
					if (showDataParamName != null && showDataParamName.length > 0) {
						data["showData"] = showDataParamName;
					}
					if (unit != null && unit.length > 0) {
						data["unit"] = unit;
					}
					this.data.push(data);
					this.dataForCombine = data;
				}
				
				// 일반 검색조건일 경우
				if (type == "normal" || type == "bizStats") {
					this.dataType = type;	
				}
				else {
					this.dataType = type;
					if (length == undefined) {
						if (this.combineData.length >= 2) {
							this.combineData = [];
						}
					}
					
					this.combineData.push(data);
					
					if (length != undefined && !isNaN(length)) {
						if (this.combineData.length == length) {
							this.data = this.combineData;
						}
					}else {
						if (this.combineData.length == 2) {
							this.data = this.combineData;
						}
					}
					
					
				}
			};
			/*this.setStatsData = function(option,data,parameter){
				if(that.infoWindow&&that.infoWindow!=null){
					that.infoWindow.update("");
				}
				if(that.boundary){
					that.boundary.remove();
				}
				if(that.dataBoundary){
					that.dataBoundary.remove();
					that.dataBoundary = null;
				}
				that.data = [];
				var adm_cd;
				if(option.adm_cd&&option.adm_cd!="00"){
					adm_cd = option.adm_cd;
				}
				this._boundary(adm_cd,true,function(){
					var statData = $.extend(true, {}, data);
					var pushData = {
						showData : option.showData,
						showDataName : option.showDataName,
						unit : option.unit,
						parameter : parameter
					};
					$.each(that.dataBoundary.getLayers(),function(cnt,node){
						var layerAdmCd = node.feature.properties.adm_cd;
						node.feature.info = [];
						$.each(statData,function(){
							if(this.adm_cd==layerAdmCd){
								if(!node.feature.info){
									node.feature.info = [];
								}
								var extendPushData = $.extend(true,{},pushData);
								extendPushData.result = this;
								var value = this[option.showData]==="N/A"?0:this[option.showData];
								extendPushData[option.showData] = parseFloat(isNaN(value)?0:value);
								node.feature.info.push(extendPushData);
							}
						});
					});
					var mapData = [];
					$.each(that.dataBoundary.getLayers(),function(rootCnt,rootNode){
						if(this.feature.info.length==0){
							var extendPushData = $.extend(true,{},pushData);
							extendPushData[option.showData] = "N/A";
							rootNode.feature.info.push(extendPushData);
						}else{
							$.each(this.feature.info,function(cnt,node){
								var value = node[node.showData]==="N/A"?0:node[node.showData];
								mapData.push(parseFloat(isNaN(value)?0:value));
							});
						}
					});
					mapData = [mapData];
					that.legend.calculateLegend(mapData);
					that.updatePolygonGeoJson("data");
					if(typeof option.callback === "function"){
						option.callback(data);
					}
					that.data = mapData;
					if(that.dataBoundary&&that.isDrawStat){
						that.dataBoundary.remove();
						that.dataBoundary.addTo(that.gMap)
					}
					if(hasText(adm_cd)&&adm_cd.length>7){
						that.setCaption();
					}else{
						setTimeout(function(){
							if(that.showCaption){
								that.setCaption();
							}
						},100);
					}
				});
			};*/
			/**
			 * @name              : updatePolygonGeoJson
			 * @description       : polygon 색상 업데이트
			 * @date              : 2016. 03. 16. 
			 * @author            : 나광흠
			 * @history           :
			 * @param type        : type
			 * @param colorChange : 색상만 교체하는지의 여부
			 */
			// SGIS4 모바일__ 수정!!
			this.updatePolygonGeoJson = function () {
				if (this.dataGeojson != null) {
					this.dataGeojson.eachLayer(function (layer) {
						if (layer.feature) {
							that.setLayerColor(layer.feature, layer);
						}
						
					});
				}
				
				if (this.multiLayerControl.dataGeojson != null) {
					for (var i=0; i<this.multiLayerControl.dataGeojson.length; i++) {
						var dataGeojson = this.multiLayerControl.dataGeojson[i];
						dataGeojson.eachLayer(function (layer) {
							if (layer.feature) {
								that.setLayerColor(layer.feature, layer);
							}
							
						});
					}
					
				}
			};	
			/*this.updatePolygonGeoJson = function (type,colorChange) {
				
				console.log("[map.js] updatePolygonGeoJson 함수 호출");
				console.log("[map.js] this.dataBoundary [" + this.dataBoundary);
				
				if(this.dataBoundary != null){
					this.dataBoundary.eachLayer(function (layer) {
						
						
						//console.log("[map.js] layer.feature [" + layer.feature);
						//console.log("[map.js] layer.feature.info [" + layer.feature.info); //생활업종의 경우 info가 undefined이다 . 이부분 조사필요함.
						//console.log("[map.js] layer.feature.info.length [" + layer.feature.info.length);
						
						if(layer.feature&&layer.feature.info&&layer.feature.info.length>0){
							
							//console.log("[map.js] layer.feature&&layer.feature.info [" + layer.feature&&layer.feature.info);
							
							$.each(layer.feature.info,function(cnt,node){
								if(node.showData&&hasText(node[node.showData])&&node[node.showData]!=="N/A"){
									that.setLayerColor(layer,that.legend.getColor(node[node.showData], that.legend.valPerSlice[cnt])[0],type,colorChange);
								}else{
									//that.setLayerColor(layer,that.legend.getColor(node[node.showData], that.legend.valPerSlice[cnt])[0],type,colorChange);
									that.setLayerColor(layer,"#F0FFF0",type,colorChange);
								}
							});
						}else{
							that.setLayerColor(layer,"#F0FFF0",type,colorChange);
						}
						
					});
					if(that.isCurrentLocationMarker){
						if(that.currentLocationCircle){
							setTimeout(function(){
								that.currentLocationCircle.bringToFront();
							},1);
						}
					}
					that.legend.updateLegendRangeColor();
				} else {
					that.gMap.eachLayer(function (layer) {
					//that.geojson.eachLayer(function (layer) {
						
						if(layer.feature&&layer.feature.info&&layer.feature.info.length>0){
							
							//console.log("[map.js] layer.feature&&layer.feature.info [" + layer.feature&&layer.feature.info);
							
							$.each(layer.feature.info,function(cnt,node){
								//that.setLayerColor(layer,that.legend.getColor(node.result[node.showData], that.legend.valPerSlice[cnt])[0],type,colorChange);
								if(node.showData&&hasText(node.result[node.showData])&&node[node.showData]!=="N/A"){
									that.setLayerColor(layer,that.legend.getColor(node.result[node.showData], that.legend.valPerSlice[cnt])[0],"data",colorChange);
									
								}else{
									//that.setLayerColor(layer,that.legend.getColor(node[node.showData], that.legend.valPerSlice[cnt])[0],type,colorChange);
									that.setLayerColor(layer,"#F0FFF0","data",colorChange);
								}
							});
						}else{
							//that.setLayerColor(layer,"#F0FFF0",type,colorChange);
						}
						
						//===========================================================

						//layer.removeCaption();
						if(layer.feature != undefined){
							
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
										$.each(that.dataBoundary.getLayers(),function(cnt,dataLayer){
											if(dataLayer._containsPoint){
												var point = that.gMap.mouseEventToLayerPoint(e); // 터치 포인트
												if(dataLayer._containsPoint(point)){
													dataLayer.fire("click");
													return false;
												}
											}
										});
									});
								}
							}
							
						}
						//===========================================================
						
						
						
					});
					if(that.isCurrentLocationMarker){
						if(that.currentLocationCircle){
							setTimeout(function(){
								that.currentLocationCircle.bringToFront();
							},1);
						}
					}
					that.legend.updateLegendRangeColor();
				}
			};*/
			/**
			 * @name              : setLayerColor
			 * @description       : polygon 색상 채우기
			 * @date              : 2016. 03. 16. 
			 * @author            : 나광흠
			 * @history           :
			 * @param layer       : layer
			 * @param fillColor   : polygon 채울 색상
			 * @param type        : type
			 * @param colorChange : 색상 병경 유무
			 */
			
			/*this.setLayerColor = function(layer,fillColor,type,colorChange){
				var color = "white";
				if(!type){
					type = layer.options.type;
				}
				if(colorChange){
					color = layer.options.color; 
				}
				layer.setStyle({
					weight : layer.options.weight,
					color : color,
					dashArray : 1.75,
					fillOpacity : 0.7,
					fillColor : fillColor,
					type:type
				});
			};*/
			
			this.setLayerColor = function (feature, layer) {
				if (this.dataType == "normal") {
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
											fillColor : that.legend.getColor(feature.info[x][param], that.legend.valPerSlice[x])[0]
										});
										break;
									}
								}
							}
						}
					}
				}
				/*
				feature["combine"] = false;
				if (feature.info) {
					for ( var x = 0; x < feature.info.length; x++) {
						if (feature.info[x].adm_cd == feature.properties.adm_cd) {
							layer.setStyle({
								weight : layer.options.weight,
								color : layer.options.color,
								dashArray : layer.options.dashArray,
								fillOpacity : layer.options.fillOpacity,
								fillColor : "#000000f"
							});
						}
					}
				}*/
			};
			/**
			 * @name           : mapMove
			 * @description    : 지도 이동
			 * @date           : 2016. 03. 16. 
			 * @author         : 나광흠
			 * @history        :
			 * @param center   : center 배열
			 * @param zoom     : 줌 레벨
			 * @param animate  : animate
			 * @param callback : callback
			 */
			this.mapMove = function (center, zoom, animate, callback) {
				if (center) {
					if(!animate) {
						animate = false;
					}
					if(!zoom) {
						zoom = this.gMap.getZoom();
					}
					this.gMap.setView(sop.utmk(center[0], center[1]), zoom, {
						animate : animate
					});
				}
				if(typeof callback === "function"){
					setTimeout(function(){
						callback();
					},500);
				}
			};
			this.combineStatsData = function (boundData, isPass) {//
				
				console.log("[catchmentAreaMap.js] combineStatsData() 호출");
				this.dataPolygonCode = this.curPolygonCode;	// 조회했던 경계레벨
				
				for ( var k = 0; k < that.data.length; k++) {
					if (that.data[k] != null) {
						boundData["combine"] = true;
					}else {
						boundData["combine"] = false;
					}
							
					for ( var i = 0; i < boundData.features.length; i++) {
						var adm_cd = boundData.features[i].properties.adm_cd;
						if (boundData.features[i].info == null) {
							boundData.features[i]["info"] = [];
						}
						
						if (that.data[k] != null) {
							if(that.data[k].result != null) {
								for ( var x = 0; x < that.data[k].result.length; x++) {
									for (key in that.data[k].result[x]) {
										if (key == "adm_cd") {
											if (adm_cd == that.data[k].result[x].adm_cd) {
												//SGIS4_0629_생활권역 시작
												var atl = that.data[k].result[x][that.data[k].showData];
												if(atl !== 0){
												//SGIS4_0629_생활권역 끝	
													that.data[k].result[x]["showData"] = that.data[k].showData;
													that.data[k].result[x]["api_id"] = that.data[k].id;
													that.data[k].result[x]["unit"] = that.data[k].unit;
													that.data[k].result[x]["legendIndex"] = k;
													boundData.features[i].info.push(that.data[k].result[x]);
													boundData.features[i]["dataIdx"] = x;
													boundData.features[i]["_dataIdx"] = that.data[k].result[x]["_dataIdx"];
													boundData.features[i]["show1"] = that.data[k].show1;
													boundData.features[i]["show2"] = that.data[k].show2;
													boundData.features[i]["dataLength"] = that.data.length;
												//SGIS4_0629_생활권역 시작	
												}
												//SGIS4_0629_생활권역 끝
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

				this.setLegendForStatsData(boundData.features.length, isPass); //민정 작업중 격자 색상 
				
				// 대화형 통계지도 툴팁 N/A 처리용
				if(document.location.href.match("interactiveMap")){
					$interactiveMap.ui.toolTipTitle = that.data[0].showData;
					$interactiveMap.ui.toolTipUnit = that.data[0].unit;	

				}
				
				return boundData;
				
			},
			
			this.setLegendForStatsData = function (boundCnt, isPass) {
				var arData = new Array();
				if (that.data.length > 0) {
					for ( var k = 0; k < that.data.length; k++) {
						var tmpData = new Array();
						if (that.data[k].showData) {
							if(that.data[k].result != null) {
								for ( var i = 0; i < that.data[k].result.length; i++) {
									for (key in that.data[k].result[i]) {
										if (key == that.data[k].showData) {
											
											//개인정보보호 때문에 특정 센서스 정보의 경우, 5미만은 4로 치환한다.
											if (key === "tot_ppltn" 	 ||	  //총인구
											    key === "tot_ppltn_male" ||   //총인구(남자)
											    key === "tot_ppltn_fem"  ||   //총인구(여자)
											    key === "population"     ||	  //인구
											    key === "household_cnt"  ||   //가구수
											    key === "house_cnt"      ||   //주택수
											    key === "farm_cnt"		 ||   //농가수
											    key === "forestry_cnt"   ||   //임가수
											    key === "fishery_cnt"    ||	  //어가수
											    key === "tot_family"     ||   //총가구
											    key === "tot_house"		 ||   //총주택
											    key === "nongga_cnt"     ||	  //농가(가구)
											    key === "nongga_ppltn"	 ||   //농가(인구)
											    key === "imga_cnt"		 ||   //임가(가구)
											    key === "imga_ppltn"     ||   //임가인구
											    key === "naesuoga_cnt"   ||   //내수면총어가
											    key === "naesuoga_ppltn" ||	  //해수면어가인구
											    key === "haesuoga_cnt"   ||   //해수면총어가
											    key === "haesuoga_ppltn" ||   //해수면어가인구
											    key === "corp_cnt"		||	  //사업체수 2016.03.24 수정. 사업체통계에서 5미만일 경우, N/A처리
											    key === "ppltn_cnt" ||//생활권역(인구)
											    key === "fmember_cnt" ||//생활권역(가구)
											    key === "resid_cnt" ||//생활권역(주택)
											    key === "corp_cnt" ||//생활권역(주택)
											    key === "employee_cnt" ||//생활권역(주택)
											    key === "olnlp" //생활권역(주택)
											   ) {
												/*if (parseFloat(that.data[k].result[i][key]) < (this.securityStandardCnt + 1)) {	// "N/A" < 숫자 ==> 무조건 false
													
													//mng_s 20180831
													if (this.isInnerMapShow3) {
														
													} else {
														that.data[k].result[i][key] = this.securityStandardCnt;
													}
													
												}*/
												
												// 데이터 조회에서 'N/A'를 받도록 쿼리가 수정된 이후에는 이 주석을 풀어준다.
												//if(that.data[k].result[i][key] === 'N/A') {
													// that.data[k].result[i][key] = this.securityStandardCnt;
												//}
												
											}
											
											if (this.isInnerMapShow3) {
												if (parseFloat(that.data[k].result[i][key]) > 0) {
													tmpData.push(parseFloat(that.data[k].result[i][key]));
												}
											} 
											// 범례 보안 사항 적용 - 2020-11-02 박상언
											else if(that.data[k].result[i][key] === 'N/A') {
												// 범례에 대한 범위 계산을 할때에는 securityStandardCnt에서 정한 값으로 한다.
												tmpData.push(this.securityStandardCnt);
											}
											else {
												tmpData.push(parseFloat(that.data[k].result[i][key]));
											}
											
											
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
				if (isPass == undefined || !isPass) {					
					// mng_s  20170802 정책통계지도 범례 좌측으로 고정
					var curPage = document.location.href;
					//var pageNum = curPage.length;
					var matchStr = "policyStaticMap";
					
					//var pageName = curPage.substring(pageNum-15, pageNum);
					if(curPage.match(matchStr)){
						if(this.id == "0"){
							
							arData2 = arData;//test
							that.legend.valPerSlice = that.legend.calculateLegend(arData);//test
						}else{
							if(arData2[0].length != 0){
								arData = arData2
							}
							that.legend.valPerSlice = that.legend.calculateLegend(arData);
						}
					}else{
						var mapRgnNum = -1;
						if( this.target && this.target.indexOf('mapRgn_') !== -1) {
							mapRgnNum = this.target.slice(-1);	// this.target의 맨끝에 있는 번호를 알아온다. this.id+1 값과 같은 값이다.
						}
						// 추가 이유
						// 여태 작업할 때는 cLegendInfo.catchmentAreaLegendInfo.fixed_legend_val{숫자} 를 사용해서 범례 구간별 격자 개수를 세었다.
						// 하지만 변수값인 배열은 calculateLegend를 거치면서 중복이 모두 사라진다. 그래서 차트를 그릴 때, 범례 구간별 격자의 개수가 실제 데이터 개수와 맞지 않는 문제가 생겼다.
						// 중복 제거가 안된 배열을  fixed_legend_data_duplicate_remain{숫자} 에 넣어놓겠다. 사용처는 catchmentAreaLeftMenu.js > setSyncGrid 메소드
						var duplicate_remain_arData = arData[0].slice();
						cLegendInfo.catchmentAreaLegendInfo['fixed_legend_data_duplicate_remain'+mapRgnNum] = duplicate_remain_arData;
						cLegendInfo.catchmentAreaLegendInfo['fixed_boundCnt_'+mapRgnNum] = boundCnt;
						that.legend.valPerSlice = that.legend.calculateLegend(arData);//test
						that.legend.setGoganSum(that.legend.valPerSlice[0], duplicate_remain_arData, boundCnt);		// 구간합 표시(생활권역은 지도가 2개여도 각각 호출하므로 배열크기가 1)

						cLegendInfo.catchmentAreaLegendInfo['fixed_legend_val'+mapRgnNum] = arData;
						//mng_s 20171016 VIEW가 여러개일 때 범례 고정관련 수정
						
					}
					//mng_e  20170802 정책통계지도 범례 좌측으로 고정
				}
				
			};
			
			this.setPolygonDataGeojson = function (geoData) {
				
				console.log("[catchmentAreaMap.js] setPolygonDataGeojson() 호출");
				console.log("[catchmentAreaMap.js] setPolygonDataGeojson() this.geojson [" + this.geojson);
				console.log("[catchmentAreaMap.js] setPolygonDataGeojson() this.boundLevel [" + this.boundLevel);
				console.log("[catchmentAreaMap.js] setPolygonDataGeojson() geoData.pAdmCd [" + geoData.pAdmCd);
				
				if (this.isInnerMapShow2) { //mng_s 그리드일 경우 바운드레벨을 0으로 세팅
					this.boundLevel = 0;
					//this.openApiReverseGeoCode(that.center); //무한루프에 빠짐...ㅠㅠ
				}
				if (this.isInnerMapShow3) { //mng_s 행정구역 그리드일 경우 바운드레벨을 0으로 세팅
					this.boundLevel = 0;
					//this.openApiReverseGeoCode(that.center); //무한루프에 빠짐...ㅠㅠ
				}
				
				// 기존 경계 지우기
				//2017.04.05 2레벨 조회일 경우, 경계가 겹치는 이슈
				//======================START===========================//
				if (/*this.geojson ||*/ this.boundLevel == "2") { // gd !!
					//현재 경계코드와 geojson의 경계코드가 맞지않을 경우, 경계를 버린다.
					//pAdmCd는 현재경계의 상위 행정동코드로 이를 바탕으로 해당 경계의 임시경계코드를 정의하고,
					//현재 경계코드와 임시경계코드를 비교하여 그릴지 말지를 결정한다.
					/*if (geoData.pAdmCd != undefined && this.boundLevel == "1") {
						var tmpLayerCode = 5;
						if (geoData.pAdmCd == "00") {
							tmpLayerCode = 2;
						}else {
							switch (geoData.pAdmCd.length) {
								//전국
								case 0:
									tmpLayerCode = 1;
									break;
									//전국시도
								case 2:
									tmpLayerCode = 3;
									break;
									//시군구
								case 5:
									tmpLayerCode = 4;
									break;
									//읍면동
								case 7:
									tmpLayerCode = 5;
									break;
							}
						}
						
						if (tmpLayerCode != this.curPolygonCode) {
							return;
						}
					}*/
					
					//현재 경계코드와 geojson의 경계코드가 맞지않을 경우, 경계를 버린다.
					//pAdmCd는 현재경계의 상위 행정동코드로 이를 바탕으로 해당 경계의 임시경계코드를 정의하고,
					//현재 경계코드와 임시경계코드를 비교하여 그릴지 말지를 결정한다.
					console.log("this.boundLevel = " + this.boundLevel);
					if (geoData.pAdmCd != undefined) {
						switch(parseInt(this.boundLevel)) {
							case 1:
								var tmpLayerCode = 5;
								if (geoData.pAdmCd == "00") {
									tmpLayerCode = 2;
								}else {
									switch (geoData.pAdmCd.length) {
										//전국
										case 0:
											tmpLayerCode = 1;
											break;
										//전국시도
										case 2:
											tmpLayerCode = 3;
											break;
										//시군구
										case 5:
											tmpLayerCode = 4;
											break;
										//읍면동
										case 7:
											tmpLayerCode = 5;
											break;
									}
								}
								
								console.log("[catchmentAreaMap.js] setPolygonDataGeojson() tmpLayerCode [" + tmpLayerCode);
								console.log("[catchmentAreaMap.js] setPolygonDataGeojson() this.curPolygonCode [" + this.curPolygonCode);
								console.log("[catchmentAreaMap.js] setPolygonDataGeojson() this.isInnerMapShow2 [" + this.isInnerMapShow2);
								
								if (!this.isInnerMapShow2 && !this.isInnerMapShow3) { //mng_s 그리드가 아닐경우에는 리턴
									// djlee 수정
									if (tmpLayerCode != this.curPolygonCode) {//&& this.curPolygonCode != 100 //2019-03-11 박길섭
										if(!document.location.href.match("technicalBizMap"))	// 기술업종 통계지도-지원시설, 산업단지 조회에서 시도 클릭시 경계표출안됨
											return;
									}
								}
								break;
							case 2:
								//2레벨 조회일 경우, data 유무를 판별
								//1.data가 있을 때 : 2레벨 조회시로 간 주하여 진행
								//2.data가 없을 때 : 2레벨 조회 후, 센터 기준으로 일반 경계를 불러오는 것으로 간주하고, 경계를 표출하지 않음
								var tmpLayerCode = 5;
								var isDataLayer = false;
								if (this.data.length > 0) {
									isDataLayer = true;
								}
								switch (geoData.pAdmCd.length) {
									case 2:
										if (isDataLayer) {
											tmpLayerCode = 4;
										}else {
											tmpLayerCode = 3;
										}
										break;
									case 5:
										if (isDataLayer) {
											tmpLayerCode = 5;
										}else {
											tmpLayerCode = 4;
										}
										break;
									case 7:
										tmpLayerCode = 5;
										break;
								}

								var isContains = false;
								if (this.dataGeojson != null) {
									this.dataGeojson.eachLayer(function(layer) {
										 if( layer._containsPoint) {
											 var point = that.gMap.utmkToLayerPoint(that.gMap.getCenter());  
							                    if (layer._containsPoint(point)){
							                    	isContains = true;
							                    }
										 }
									});
									
									// djlee 수정
									if (isContains && (tmpLayerCode == this.curPolygonCode)) {//&& this.curPolygonCode != 100 //2019-03-11 박길섭
										if (this.geojson) {
											this.geojson.remove();
											this.geojson = null;
										}
										return;
									}
								}
								break;
						}
						
					}
				
					if (this.geojson) {
						this.geojson.remove();
						this.geojson = null;
					}
				}
				//======================END===========================//
				
				console.log("[catchmentAreaMap.js] setPolygonDataGeojson() 22222 this.data.length [" + this.data.length);
				
				// 경계데이터에 통계정보를 병합하고, 경계를 그린다.
				if (this.data.length > 0) {
					
					console.log("[catchmentAreaMap.js] setPolygonDataGeojson() geoData.pAdmCd [" + geoData.pAdmCd +"] this.data[0].pAdmCd [" + this.data[0].pAdmCd);
					
					//if(this.isInnerMapShow2){ //mng_s 그리드면
						
					//}
					
					if ( this.data[0].kosis || this.data[0].ecountry ) {
						if(geoData.features.length > 0) {
							if(this.data[0].pAdmCd < 2) {
								this.data[0].pAdmCd = "00";
							}
							
							if (geoData.pAdmCd != this.data[0].pAdmCd) {
								return;
							}
							
							if( this.data[0].kosis ){
								geoData = interactiveMapKosis.combineKosisStatsData(geoData);
							} else {
								geoData = $interactiveMapEcountry.combineEcountryStatsData(geoData);
							}
						} else {
							return;
						}
					} else {
						
						if(!this.isInnerMapShow2 && !this.isInnerMapShow3){ //mng_s 그리드가 아니면(행정구역 그리드 조건 추가 20180208)
							if (geoData.pAdmCd != this.data[0].pAdmCd) {
								return;
							}
						}
						geoData = this.combineStatsData(geoData);
					}
					
					//시계열때문에 드랍된 현재위치정보를 저장한다.
					//this.setDroppedInfo();
				}
				
				
				console.log("[catchmentAreaMap.js] setPolygonDataGeojson() geoData.combine [" + geoData.combine);
				
				// res = combineStatsData(res);
				if (geoData.combine && this.data.length > 0) {
					if (this.dataGeojson) {
						this.dataGeojson.remove();
						this.removeCaption();
						this.dataGeojson = null;
					}
					this.addPolygonGeoJson(geoData, "data");
					this.dataGeojsonLayer = geoData;
					if (this.legend != null) {
						this.legend.changeDataMode(this.legend.selectType);
					}
					this.checkShowCaption();
					
					if (this.isMiniMapDraw) {
						if (this.miniMap.geojson) {
							this.miniMap.geojson.remove();
							this.miniMap.geojson = null;
						}
						this.miniMap.mapMove([989674, 1818313], 8, false);
						this.miniMap.addPolygonGeoJson(geoData, "mini");
					}
				}
				else {
					
					this.addPolygonGeoJson(geoData, "polygon");
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
					if ( this.data[0].kosis ) {
						interactiveMapKosis.setResultDataOnMap();
					} else if( this.data[0].ecountry ){
						$interactiveMapEcountry.setResultDataOnMap();
					}
				}
		
				this.data = [];
				if (this.delegate && this.delegate.callbackFunc && this.delegate.callbackFunc.didFinishedHadmaArea instanceof Function) {
					this.delegate.callbackFunc.didFinishedHadmaArea(geoData, that);
				}
			};
			
			this.setPolygonGeoJsonStyle = function (type) {			
				// 일반경계일 경우, 색상을 채우지않고,
				// 데이터경계일 경우, 색상을 채운다.
				/*var color = "#ffb2a5";
				var fillColor = "#F0FFF0";
				var fillOpacity = 0.7;
				var weight = 1;
				
				return {
					weight : weight,
					opacity : 1,
					color : color,
					//dashArray: 3,
					fillOpacity : fillOpacity,
					fillColor : fillColor
				};*/
				
				var color = "#666666";
				var fillColor = "white";
				var weight = 1.75;
				var fillOpacity = 0;
				var dashArray =  '0';//박길섭 수정
				
				switch (this.mapMode) {
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
				}
				
				switch (type) {
					case "data":
						color = "#7b3e30";		//"white" 
						fillColor = "#F0FFF0";
						weight = 1;
						//mng_s 20180104 주용민 투명도
						if(sop.isInnerMapShow2) {
							if($catchmentAreaLegendInfo.ui.slideInfo.slideValue2 == undefined){
								$catchmentAreaLegendInfo.ui.slideInfo.slideValue2 = 0.7;
							};
							this.dataPolygonFillOpacity = $catchmentAreaLegendInfo.ui.slideInfo.slideValue2;
							fillOpacity = this.dataPolygonFillOpacity;
							$("#legendDataSlider").slider("option","value",fillOpacity);
						} else if(sop.isInnerMapShow3) { //mng_s 20180219 추가
							if($catchmentAreaLegendInfo.ui.slideInfo.slideValue2 == undefined){
								$catchmentAreaLegendInfo.ui.slideInfo.slideValue2 = 0.7;
							};
							this.dataPolygonFillOpacity = $catchmentAreaLegendInfo.ui.slideInfo.slideValue2;
							fillOpacity = this.dataPolygonFillOpacity;
							$("#legendDataSlider").slider("option","value",fillOpacity);
						} else {
							if($catchmentAreaLegendInfo.ui.slideInfo.slideValue1 == undefined){
								$catchmentAreaLegendInfo.ui.slideInfo.slideValue1 = 0.7;
							};
							this.dataPolygonFillOpacity = $catchmentAreaLegendInfo.ui.slideInfo.slideValue1;
							fillOpacity = this.dataPolygonFillOpacity;
							$("#legendDataSlider").slider("option","value",fillOpacity);
						}
						//mng_e
						dashArray = "";
						break;
					case "build":
						fillColor = "#9c0095";//박길섭 수정
						weight = 2.5;
						fillOpacity = 0.7;
						break;
					case "trade":
						return {
							weight : 2.5,
							opacity : 1,
							color : color,
							dashArray: '0',
							fillOpacity : 0.7,
							fillColor : "#9c0095",//박길섭 수정
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
			};
			
			this.addPolygonGeoJson = function (obj, type, opt) {
				console.log("addPolygonGeoJson start ...............");
				console.log("[catchmentAreaMap.js] addPolygonGeoJson() 하위222 호출");
				
				var geojson = sop.geoJson(obj, {
					style : this.setPolygonGeoJsonStyle(type),
					onEachFeature : function (feature, layer) {
						that.setLayerColor(feature, layer);	
						layer.on({
							click : function (e) {
								var layer = e.target;
								if (!sop.Browser.ie) {
									layer.bringToFront();
								}

								if (that.delegate && 
									that.delegate.callbackFunc && 
									that.delegate.callbackFunc.didSelectedPolygon) {
									that.delegate.callbackFunc.didSelectedPolygon(e, feature, layer.options.type, that);
								}
								
							},
						
						});
					},
					type : type, // 일반경계인지, 데이터경계인지 구분
				
				});
				
				if (type == "polygon" || type == "build" || type == "industry") {
					this.geojson = geojson;
				}else if (type == "trade") {
					this.tradeGeojson = geojson;
				}else {
					this.dataGeojson = geojson;
					
				}
				
				if (opt) {
					if (opt.group) {
						if (type == "polygon" || type == "build" || type == "industry") {
							this.geojson.addTo(opt.group);
						}else if (type == "trade") {
							this.tradeGeojson.addTo(opt.group);
						}else {
							this.dataGeojson.addTo(opt.group);
						}
					}
					else {
						if (type == "polygon" || type == "build" || type == "industry") {
							this.geojson.addTo(this.gMap);
						}else if (type == "trade") {
							this.tradeGeojson.addTo(this.gMap);
						}else {
							this.dataGeojson.addTo(this.gMap);
						}		
					}
				}
				else {
					if (type == "polygon" || type == "build" || type == "industry") {
						this.geojson.addTo(this.gMap);
					}else if (type == "trade") {
						this.tradeGeojson.addTo(this.gMap);
					}else {
						this.dataGeojson.addTo(this.gMap);
					}	
				}
				
				
			};
			/**
			 * @name                : moveCurrentLocation
			 * @description         : 현재위치로 이동
			 * @date                : 2016. 03. 16. 
			 * @author              : 나광흠
			 * @history             :
			 * @param isShowMessage : 현재 위치 못찾으면 경고창 보여줄지의 여부
			 * @param callback      : callback
			 */
			this.moveCurrentLocation = function(isShowMessage,callback) {
				var sopAbs = new sop.portal.absAPI();
				sopAbs.onBlockUIPopup();
				that.getCurrentLocation(function(center,success,errCd,errMsg){
					if(success){
						var zoom = that.currentDefaultZoom;
						if(that.mapNavigation&&that.mapNavigation.maxLocation){
							if(that.mapNavigation.maxLocation=="sido"){
								zoom = 4;
							}else if(that.mapNavigation.maxLocation=="sgg"){
								zoom = 6;
							}else if(that.mapNavigation.maxLocation=="emdong"){
								zoom = 9;
							}
						}
						that.mapMove(center, zoom,false,callback);
						if(that.currentLocationMarker){
							that.currentLocationMarker.remove();
						}
						if(that.currentLocationCircle){
							that.currentLocationCircle.remove();
						}
						if(that.isCurrentLocationMarker){
							var marker = sop.marker(center,{icon: sop.icon({
								iconUrl: contextPath+"/resources/images/map/marker/current.png",
								iconSize: [20,20]
							})});
							marker.bindInfoWindow('<div style="color: #457bc3;font-size: 14px;">현재 위치<div>',{closeButton:false});
							marker.addTo(that.gMap);
							that.currentLocationMarker = marker;
							var circle = sop.circle(center,100,{
								stroke : false
							}); //써클 생성
							circle.addTo(that.gMap);
							that.currentLocationCircle = circle;
							if (that.delegate && that.delegate.callbackFunc && that.delegate.callbackFunc.didCurrentLocationCircle instanceof Function) {
								circle.on("click",function(e){
									if(that.dataBoundary){
										that.removeActiveStyle();
										var returnLayer = null;
										var tmpUtmkPoint = that.gMap.utmkToLayerPoint([e.utmk.x,e.utmk.y]);
										$.each(that.dataBoundary.getLayers(),function(cnt,layer){
											if(layer&&layer._containsPoint&&layer._containsPoint(tmpUtmkPoint)){
												layer.bringToFront();
												circle.bringToFront();
												that.layerClickStyle(layer);
												returnLayer = layer;
												return false;
											}
										});
									}
									that.delegate.callbackFunc.didCurrentLocationCircle(e,returnLayer,that);
								});
							}
						}
					}else{
						if(isShowMessage){
							common_alert(errMsg);
						}
					}
					sopAbs.onBlockUIClose();
				})
			};
			/**
			 * @name           : getCurrentLocation
			 * @description    : 현재위치 좌표 얻기
			 * @date           : 2016. 03. 16. 
			 * @author         : 나광흠
			 * @history        :
			 * @param callback : callback
			 */
			this.getCurrentLocation = function(callback){
				/** 2020.09.10[한광희] 위치미동의시 기준지역(대전 서구 둔산2동) 설정 START */
				//var center = [989674, 1818313];
				var center = [989749, 1817802];
				
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
								//callback(center,false,error.code,message);
								callback(center,true);
							}
						}, {
							timeout: 5000
						});
					}else{
						if(typeof callback === "function"){
							//callback(center,false,"현재 위치를 찾는데 실패하였습니다");
							callback(center,true);
						}
					}
				} else {
					if(typeof callback === "function"){
						//callback(center,false,"현재 위치를 찾는데 실패하였습니다");
						callback(center,true);
					}
				}
				/** 2020.09.10[한광희] 위치미동의시 기준지역(대전 서구 둔산2동) 설정 END */
				return center;
			};
			
			this.checkShowCaption = function () {
				if (this.legend.numberData && (this.dataGeojson != null || this.multiLayerControl.dataGeojson)) {
					this.setCaption();
				}else {
					this.removeCaption();
				}
			};
			
			/**
			 * @name          : setCaption
			 * @description   : polygon위에 통계값 보여주기
			 * @date          : 2016. 03. 16. 
			 * @author        : 나광흠
			 * @history       :
			 */			
			/*this.setCaption = function () {
				that.showCaption = true;
				if (this.dataBoundary != null&&that.isDrawStat) {
					this.dataBoundary.eachLayer(function(layer) {
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
									$.each(that.dataBoundary.getLayers(),function(cnt,dataLayer){
										if(dataLayer._containsPoint){
											var point = that.gMap.mouseEventToLayerPoint(e); // 터치 포인트
											if(dataLayer._containsPoint(point)){
												dataLayer.fire("click");
												return false;
											}
										}
									});
								});
							}
						}
					});
				}
			};*/
			
			this.setCaption = function () {
				this.removeCaption();
				//2016.09.22 버블일 경우, 캡션을 보여준다.
				if (this.legend != undefined && this.legend.selectType == "bubble") {
					if (this.legend.circleMarkerGroup != undefined && this.legend.circleMarkerGroup.length > 0) {
						for (var i=0; i<this.legend.circleMarkerGroup.length; i++) {
							var layer = this.legend.circleMarkerGroup[i];
							layer.setCaption({title:appendCommaToNumber(layer.options.options.data), color:"white"});
						}
					}
				}else {
					if (this.dataGeojson != null) {
						this.dataGeojson.eachLayer(function(layer) {
							var x = layer.feature.properties.x;
							var y = layer.feature.properties.y;
							if (layer.feature.combine) {
								if (layer.feature.combineData != undefined) {
									layer.setCaption({title:appendCommaToNumber(layer.feature.combineData), color:"white"}, [x,y]);
								}else {
									layer.setCaption({title:"N/A", color:"#808080", showAllZoomLevel: false}, [x,y]);
								}
							}else if(layer.feature.info.length > 1) {
								layer.setCaption({title:appendCommaToNumber(layer.feature.info[0]), color:"white", showAllZoomLevel: false},[x,y]);
							}else {
								if (layer.feature.info.length > 0) {
									for (param in layer.feature.info[0]) {
										if (layer.feature.info[0].showData == param) {
											if (parseFloat(layer.feature.info[0][param]) < 5 && 
													param != "avg_age" &&
													param != "ppltn_dnsty" &&
													param != "aged_child_idx" && 
													param != "oldage_suprt_per" &&
													param != "juv_suprt_per" && 
													param != "tot_suprt_per" &&
													//2016.03.24 수정, 사업체일 경우, 5미만 N/A처리
													//param != "corp_cnt" &&
													param != "tot_worker" &&
													param != "avg_fmember_cnt" &&
													param != "employee_cnt") {
												layer.setCaption({title:"N/A", color:"white"}, [x,y]);
											}else {
												layer.setCaption({title:appendCommaToNumber(layer.feature.info[0][param]), color:"white", showAllZoomLevel: false}, [x,y]);	
											}
											break;
										}
									}
								}else {
									layer.setCaption({title:"N/A", color:"#808080"}, [x,y]);
								}
							}
						});
					}

					if (this.multiLayerControl.dataGeojson != null) {
						for(var i=0; i<this.multiLayerControl.dataGeojson.length; i++) {
							var dataGeojson = this.multiLayerControl.dataGeojson[i];
							dataGeojson.eachLayer(function (layer) {
								if (layer.feature.info.length > 0) {
									for (param in layer.feature.info[0]) {
										if (layer.feature.info[0].showData == param) {
											layer.setCaption({title:appendCommaToNumber(layer.feature.info[0][param]), color:"white", showAllZoomLevel: false});
											break;
										}
									}
								}else {
									layer.setCaption({title:"N/A", color:"#808080"});
								}
							});
						}
					}
				}
				
			};
			/**
			 * @name          : removeCaption
			 * @description   : polygon위에 통계값 삭제
			 * @date          : 2016. 03. 16. 
			 * @author        : 나광흠
			 * @history       :
			 */
			/*this.removeCaption = function () {
				that.showCaption = false;
				if (this.dataBoundary != null) {
					this.dataBoundary.eachLayer(function (layer) {
						layer.removeCaption();
					});
				}
			};*/
			this.removeCaption = function () {
				if (this.dataGeojson != null) {
					this.dataGeojson.eachLayer(function (layer) {
						layer.removeCaption();
						layer.captionObj = null;
					});
				}
				if (this.multiLayerControl.dataGeojson != null) {
					for(var i=0; i<this.multiLayerControl.dataGeojson.length; i++) {
						var dataGeojson = this.multiLayerControl.dataGeojson[i];
						dataGeojson.eachLayer(function (layer) {
							layer.removeCaption();
							layer.captionObj = null;
						});
					}
				}
				
				//2016.09.22 버블일 경우, 캡션을 제거한다.
				if (this.legend != undefined && this.legend.selectType == "bubble") {
					if (this.legend.circleMarkerGroup != undefined && this.legend.circleMarkerGroup.length > 0) {
						for (var i=0; i<this.legend.circleMarkerGroup.length; i++) {
							var layer = this.legend.circleMarkerGroup[i];
							layer.removeCaption();
							layer.captionObj = null;
						}
					}
				}
			}
			/**
			 * @name          : removeActiveStyle
			 * @description   : 활성화 되어있는 polygon 기본 스타일로 변경
			 * @date          : 2016. 03. 16. 
			 * @author        : 나광흠
			 * @history       :
			 */
			this.removeActiveStyle = function(){
				if(that.activeLayer&&that.activeLayer!=null){
					var defaultStyle;
					if(that.activeLayer.options.type){
						if(that.activeLayer.options.type=="data"){
							defaultStyle = {weight: 2,color: "white",dashArray: 1.75};//데이터
						}else{
							defaultStyle = {weight: 2,opacity: 1,color: "#666666",dashArray: 3};//경계
						}
					}
					that.activeLayer.unbindToolTip();
					if(that.activeLayer.options.fillColor!==defaultStyle.fillColor){
						defaultStyle.fillColor = that.activeLayer.options.fillColor;
						defaultStyle.fillOpacity = that.activeLayer.options.fillOpacity;
					}
					that.activeLayer.setStyle(defaultStyle);
					that.activeLayer = null;
				}
				if(that.legend&&that.legend!=null&&that.legend.legendPanel){
					that.legend.legendPanel.find("li").removeClass("M_on");
					try{
						that.legend.legendPanel.find("li").tooltip("hide");
					}catch(e){
						//tooltip이 없을때입니다
					}
				}
				if(that.infoWindow&&that.infoWindow!=null){
					that.infoWindow.update("");
				}
			};
			/**
			 * @name          : createCurrentLocationButton
			 * @description   : 현재 위치 버튼 생성
			 * @date          : 2016. 03. 18. 
			 * @author        : 나광흠
			 * @history       :
			 */
			this.createCurrentLocationButton = function() {
				var currentLocationControl = sop.control({
					position: 'topleft'
				});
				currentLocationControl.onAdd = function(map) {
					this._div = sop.DomUtil.create('div', 'control_item current_location_control');
					sop.DomEvent.disableClickPropagation(this._div);
					sop.DomEvent.disableScrollPropagation(this._div);
					this.update();
					$(this._div).attr("id", 'currentLocationControl_' + that.id).attr("title", "현재위치");
					return this._div;
				};
				currentLocationControl.update = function(props) {
					sop.DomEvent.on(this._div, 'click', function() {
						
						if(document.location.href.match("interactive")){
//							srvLogWrite("M0","05", "02", "05", "", "");	//대화형통계지도 내 위치로 이동  log
						}else if(document.location.href.match("house")){
//							srvLogWrite("M0","06", "04", "03", "", "");	//살고싶은 우리동네 내 위치로 이동  log
							
						}
						
						that.moveCurrentLocation(true,function(){
							if (that.delegate && that.delegate.callbackFunc && that.delegate.callbackFunc.didEndMoveCurrentLocation instanceof Function) {
								that.delegate.callbackFunc.didEndMoveCurrentLocation(that);
							}
						});
					}, this);
				};
				currentLocationControl.addTo(this.gMap);
			};
			/**
			 * @name          : createMapSizeControlButton
			 * @description   : 지도 사이즈 변경 버튼 생성
			 * @date          : 2016. 03. 24. 
			 * @author        : 나광흠
			 * @history       :
			 */
			this.createMapSizeControlButton = function() {
				var mapSizeControl = sop.control({
					position: 'topright'
				});
				mapSizeControl.onAdd = function(map) {
					this._div = sop.DomUtil.create('div', 'control_item map_size_control upscale');
					sop.DomEvent.disableClickPropagation(this._div);
					sop.DomEvent.disableScrollPropagation(this._div);
					sop.DomEvent.on(this._div, 'click', function() {
						if($(this._div).hasClass("upscale")){
							$("#up-and-down-button").hide();
							$(this._div).removeClass("upscale").addClass("downscale");
							$("body").addClass("full");
						}else{
							$("#up-and-down-button").show();
							$(this._div).removeClass("downscale").addClass("upscale");
							$("body").removeClass("full");
						}
						that.delegate.event.setMapSize();
						that.gMap.invalidateSize();
					}, this);
					return this._div;
				};
				mapSizeControl.addTo(this.gMap);
			};
			/**
			 * @name           : createMapStatToggleControlButton
			 * @description    : 지도 통계 토글 버튼 생성
			 * @date           : 2016. 03. 24. 
			 * @author         : 나광흠
			 * @history        :
			 * @param option   : option
			 * 	{
			 * 		defaultShowMapStat : 초기에 지도의 통계를 보여줄지의 유무
			 * 		callback : callback
			 * 	}
			 */
			this.createMapStatToggleControlButton = function(option) {
				option = option||{};
				if(option.defaultShowMapStat===undefined||option.defaultShowMapStat===null){
					option.defaultShowMapStat = true;
				}
				that.isDrawStat = /^true$/.test(option.defaultShowMapStat);
				var defaultIsDrawBoundary = that.isDrawStat; 
				function addClass(element){
					$(element).parent().find("a").removeClass("on");
					$(element).addClass("on");
				}
				function setOption(is){
					that.isDrawBoundary = is;
					that.isDrawStat = is;
					if(typeof option.callback === "function"){
						option.callback(is);
					}
				}
				that.mapControlButton.addChildren($("<li/>",{"class":"sgis"}).append(
					$("<span/>",{"text":"통계"}),
					$("<a/>",{"class":(that.isDrawStat?"on":""),"text":"on"}).click(function(){
						
						if(document.location.href.match("community")){
//							srvLogWrite("M0","08", "03", "09", "", "on");	
						}
						
						addClass($(this));
						that.isDrawBoundary = defaultIsDrawBoundary;
						if(that.dataBoundary){
							that.dataBoundary.addTo(that.gMap);
						}
						that.delegate.ui.setStats();
						setOption(true);
						if(that.showCaption){
							that.setCaption();
						}
					}),
					$("<a/>",{"class":(that.isDrawStat?"":"on"),"text":"off"}).click(function(){
						
						if(document.location.href.match("community")){
//							srvLogWrite("M0","08", "03", "09", "", "off");	
						}
						
						addClass($(this));
						that.isDrawBoundary = false;
						if(that.dataBoundary){
							if(that.infoWindow&&that.infoWindow!=null){
								that.infoWindow.update("");
							}
							that.dataBoundary.remove();
						}
						setOption(false);
					})
				));
			};
			/**
			 * @name           : createMapCaptionToggleControlButton
			 * @description    : 지도 캡션 토글 버튼 생성
			 * @date           : 2016. 07. 08. 
			 * @author         : 나광흠
			 * @history        :
			 * @param option   : option
			 * 	{
			 *  	defaultShowCaption : 초기에 지도의 통계 캡션을 보여줄지의 유무
			 *  	callback : callback
			 *  }
			 */
			this.createMapCaptionToggleControlButton = function(option) {
				option = option||{};
				if(option.defaultShowCaption===undefined||option.defaultShowCaption===null){
					option.defaultShowCaption = false;
				}
				that.showCaption = /^true$/.test(option.defaultShowCaption);
				function addClass(element){
					$(element).parent().find("a").removeClass("on");
					$(element).addClass("on");
				}
				that.mapControlButton.addChildren($("<li/>",{"id":"caption-button-"+that.id,"class":"sgis"}).append(
					$("<span/>",{"text":"통계 표출"}),
					$("<a/>",{"class":(that.showCaption?"on":""),"text":"on","data-id":"on"}).click(function(){
						
						if(document.location.href.match("current")){	
//							srvLogWrite("M0","03", "02", "03", "", "on");	
						}else if(document.location.href.match("interactive")){
//							srvLogWrite("M0","05", "02", "04", "", "on");	
						}else if(document.location.href.match("biz")){
//							srvLogWrite("M0","07", "03", "01", "", "on");	
						} 
						
						addClass($(this));
						that.setCaption();
						if(typeof option.callback === "function"){
							option.callback(true);
						}
					}),
					$("<a/>",{"class":(that.showCaption?"":"on"),"text":"off","data-id":"off"}).click(function(){
						
						
						
						if(document.location.href.match("current")){	
//							srvLogWrite("M0","03", "02", "03", "", "off");	
						}else if(document.location.href.match("interactive")){
//							srvLogWrite("M0","05", "02", "04", "", "off");	
						}else if(document.location.href.match("biz")){
//							srvLogWrite("M0","07", "03", "01", "", "off");	
						}
						
						
						addClass($(this));
						that.removeCaption();
						if(typeof option.callback === "function"){
							option.callback(false);
						}
					})
				));
			};
			this.openApiGridArea = function(bounds) {
				
				console.log("[catchmentAreaMap.js] openApiGridArea() 호출");
				
				var area = "";
				area = 'RECTANGLE(';
				area += bounds._southWest.x + ' ' + bounds._southWest.y + ',';
				area += bounds._northEast.x + ' ' + bounds._northEast.y;
				area += ')';
				
				var sopOpenApiGridAreaObj = new sop.openApi.gridarea.api();
				sopOpenApiGridAreaObj.addParam("accessToken", accessToken);
				
				sopOpenApiGridAreaObj.addParam("area", area);
				//아래 파라미터는 나중에 조정해야할 수도 있고 현재는 임시로 넣어둠.
				sopOpenApiGridAreaObj.addParam("adm_cd", "00");
				sopOpenApiGridAreaObj.addParam("low_search", "0");
				sopOpenApiGridAreaObj.addParam("year", "2015");
				sopOpenApiGridAreaObj.addParam("borough", "00");
				
				console.log("[catchmentAreaMap.js] openApiGridArea() sopOpenApiGridAreaObj.request 111");
				
				sopOpenApiGridAreaObj.request({
					method : "GET",
					async : true,
					url : openApiPath + "/OpenAPI3/boundary/gridarea.geojson",
					options : {
						target : this,
						area : area,
						year : "2015",
						low_search : "1"
					}
                });
				
				console.log("[catchmentAreaMap.js] openApiGridArea() sopOpenApiGridAreaObj.request 222");

			};

			//생활권역 그리드(주행시간, 거리)
			this.openApiCatchmentGridArea = function(bounds, grid_level, paramArea, promiseParam) {
				
				console.log("[catchmentAreaMap.js] openApiCatchmentGridArea() 호출");
				
				that.catchmentAreabounds = bounds; 
				var area = "";
				
				if(!paramArea) {
					area = 'POLYGON((';
					for(var i = 0; i < bounds.length; i++) {
						area += bounds[i][0] + " " + 
								bounds[i][1] + ",";
						
						if(i == bounds.length - 1) {
							area += bounds[i][0] + " " + 
							bounds[i][1];
						}					
					}					
					area += '))';
				} else {
					area = paramArea;
				}
				
				var sopOpenApiCatchmentGridObj = new sop.openApi.catchmentGrid.api();
				sopOpenApiCatchmentGridObj.addParam("accessToken", accessToken);
				sopOpenApiCatchmentGridObj.addParam("area", area);
				sopOpenApiCatchmentGridObj.addParam("grid_level", grid_level);
				sopOpenApiCatchmentGridObj.addParam("srvAreaType", 1);
				
				sopOpenApiCatchmentGridObj.request({
					method : "POST",
					async : true,
					url : "/ServiceAPI/OpenAPI3/catchmentArea/srvAreaHadmarea.geojson",
					options : {
						target : this,
						area : area,
						grid_level : grid_level,
						resolve : (promiseParam ? promiseParam.resolve : null),
						reject : (promiseParam ? promiseParam.reject : null)
					}
                });
			};
			
			//생활권역 그리드(주행시간, 거리)
			this.openApiCatchmentGridAreaWithPromise = function(bounds, grid_level, paramArea, resolve, reject) {
				
				console.log("[catchmentAreaMap.js] openApiCatchmentGridAreaWithPromise() 호출");
				
				that.catchmentAreabounds = bounds; 
				var area = "";
				
				if(!paramArea) {
					area = 'POLYGON((';
					for(var i = 0; i < bounds.length; i++) {
						area += bounds[i][0] + " " + 
								bounds[i][1] + ",";
						
						if(i == bounds.length - 1) {
							area += bounds[i][0] + " " + 
							bounds[i][1];
						}					
					}					
					area += '))';
				} else {
					area = paramArea;
				}
				
				var sopOpenApiCatchmentGridObj = new sop.openApi.catchmentGrid.api();
				sopOpenApiCatchmentGridObj.addParam("accessToken", accessToken);
				sopOpenApiCatchmentGridObj.addParam("area", area);
				sopOpenApiCatchmentGridObj.addParam("grid_level", grid_level);
				sopOpenApiCatchmentGridObj.addParam("srvAreaType", 1);
				
				sopOpenApiCatchmentGridObj.request({
					method : "POST",
					async : true,
					url : "/ServiceAPI/OpenAPI3/catchmentArea/srvAreaHadmarea.geojson",
					options : {
						target : this,
						area : area,
						grid_level : grid_level,
						resolve : resolve,
						reject : reject
					}
                });
			};
			
			//생활권역 그리드(반경)
			this.openApiCatchmentCircleGridArea = function(bounds, radius, grid_level) {
				
				console.log("[catchmentAreaMap.js] openApiCatchmentCircleGridArea() 호출");
				console.log(bounds);
				that.catchmentAreabounds = bounds; 
				var area = bounds;
				
				var sopOpenApiCatchmentGridObj = new sop.openApi.catchmentCircleGrid.api();
				sopOpenApiCatchmentGridObj.addParam("accessToken", accessToken);
				sopOpenApiCatchmentGridObj.addParam("area", area);
				sopOpenApiCatchmentGridObj.addParam("radius", radius);
				sopOpenApiCatchmentGridObj.addParam("grid_level", grid_level);
				sopOpenApiCatchmentGridObj.addParam("srvAreaType", 2);
				
				sopOpenApiCatchmentGridObj.request({
					method : "POST",
					async : true,
					url : "/ServiceAPI/OpenAPI3/catchmentArea/srvAreaHadmarea.geojson",
					options : {
						target : this,
						area : area,
						radius : radius,
						grid_level : grid_level
					}
                });
			};
			
			
			this.openApiCatchmentCircleGridAreaWithPromise = function(bounds, radius, grid_level, resolve, reject) {
				
				console.log("[catchmentAreaMap.js] openApiCatchmentCircleGridAreaWithPromise() 호출");
				console.log(bounds);
				that.catchmentAreabounds = bounds; 
				var area = bounds;
				
				var sopOpenApiCatchmentGridObj = new sop.openApi.catchmentCircleGrid.api();
				sopOpenApiCatchmentGridObj.addParam("accessToken", accessToken);
				sopOpenApiCatchmentGridObj.addParam("area", area);
				sopOpenApiCatchmentGridObj.addParam("radius", radius);
				sopOpenApiCatchmentGridObj.addParam("grid_level", grid_level);
				sopOpenApiCatchmentGridObj.addParam("srvAreaType", 2);
				
				sopOpenApiCatchmentGridObj.request({
					method : "POST",
					async : true,
					url : "/ServiceAPI/OpenAPI3/catchmentArea/srvAreaHadmarea.geojson",
					options : {
						target : this,
						area : area,
						radius : radius,
						grid_level : grid_level,
						resolve : resolve,
						reject : reject
					}
                });
			};
			/**
			 * @name          : createPoiControl
			 * @description   : POI 버튼 생성
			 * @date          : 2016. 03. 24. 
			 * @author        : 나광흠
			 * @history       :
			 */
			this.createPoiControl = function() {
				var poiControl = sop.control({
					position: 'topleft'
				});
				this.poi = new sPoi(that);
				this.poi.createPoi();
				poiControl.onAdd = function(map) {
					this._div = sop.DomUtil.create('div', 'poiControl');
					
					var addPoi = $("<div/>", {
						"class": "control_item control_btn poi",
						title: "POI 표출"
					});
					var removePoi = $("<div/>", {
						"class": "control_item poi_remove_control",
						"id" : "removeButton",
						title: "POI 삭제"
					});
					$(this._div).append(
				//		addPoi,
						removePoi
					);
					sop.DomEvent.disableClickPropagation(this._div);
					sop.DomEvent.disableScrollPropagation(this._div);
				//	this.update(addPoi, removePoi);
					this.update(removePoi);
					return this._div;
				};
				poiControl.update = function(removeButton) {
				//	$(addButton).off().click(function() {
				//		that.poi.panelShow();
				//	});
					$(removeButton).off().click(function() {
						that.poi.removePoi();
						$("#removeButton").hide();
					});
				};
				poiControl.addTo(this.gMap);
				$("#removeButton").hide();	// POI 표출했을때만 보이도록
			};
			/**
			 * @name          : createPoiControl2
			 * @description   : POI 버튼 생성
			 * @date          : 2017. 07. 05. 
			 * @author        : 
			 * @history       :
			 */
			this.createPoiControl2 = function() {
				var poiControl = sop.control({
					position: 'bottomleft',
					top:'50px'
				});
				this.poi = new sPoi(that);
				this.poi.createPoi();
				poiControl.onAdd = function(map) {
					this._div = sop.DomUtil.create('div', 'poiControl');
					
					var addPoi = $("<div/>", {
						"class": "",
						"display":"none",
						title: "POI 표출",
						"id" : "poiPageCall",
						text : ''
							
					});
				//	var removePoi = $("<div/>", {
				//		"class": "control_item poi_remove_control",
				//		title: "POI 삭제"
				//	});
					$(this._div).append(
							addPoi
				//			removePoi
					);
					sop.DomEvent.disableClickPropagation(this._div);
					sop.DomEvent.disableScrollPropagation(this._div);
						this.update(addPoi);
					return this._div;
				};
				poiControl.update = function(addButton) {
					$(addButton).off().click(function() {
						that.poi.panelShow();
					});
				};
				poiControl.addTo(this.gMap);
			};
			/**
			 * @name          : getZoomToCd
			 * @description   : 행정동 코드로 zoom 레벨얻기
			 * @date          : 2016. 03. 24. 
			 * @author        : 나광흠
			 * @history       :
			 * @param adm_cd  : 행정동 코드
			 */
			this.getZoomToCd = function(adm_cd){
				if(adm_cd){
					if(adm_cd.length>=2){
						var sido_cd = adm_cd.substring(0,2);
						if(sido_cd=="00"){
							return 1;
						}else{
							if(adm_cd.length>=5){
								var sgg_cd = adm_cd.substring(2,5);
								if(sgg_cd=="999"){
									return 4;
								}else{
									if(adm_cd.length>=7){
										var emdong_cd = adm_cd.substring(5,7);
										if(emdong_cd=="00"){
											return 6;
										}else{
											return 9;
										}
									}else{
										return 6;
									}
								}
							}else{
								return 4;
							}
						}
					}else{
						return 1;
					}
				}else{
					return 1;
				}
			};
			/**
			 * @name          : getInfoTooltipText
			 * @description   : 툴팁 내용
			 * @date          : 2016. 03. 24. 
			 * @author        : 나광흠
			 * @history       :
			 * @param data    : data
			 * @param map     : map
			 */
			this.getInfoTooltipText = function(data,map){
				var html="<div style='padding:7px;'>";
				if(data.info&&data.info.length>0){
					var result = data.info[0];
					if(data.info[0].result){
						result = data.info[0].result;
					}
					if(data.info.length==1&&(!hasText(data.info[0].showData)||result[data.info[0].showData]==="N/A")){
						html+="<div>N/A</div>";
					}else{
						html+="<div style='font-size:14px; font-family:NanumSquareB; color:#457bc3;'>"+data.properties.adm_nm+"</div>";
						if(data.properties.adm_cd.length>7){
							html+="<div style='font-size:12px;padding-left:5px;'>집계구 : "+data.properties.adm_cd+"</div>";
						}
						$.each(data.info,function(cnt,node){
							var year="";
							var value = 0;
							if(node.parameter&&node.parameter.year){
								year = node.parameter.year+"년 ";
							}
							if(node.result[node.showData]!="N/A"&&$.isNumeric(node.result[node.showData])){
								value = parseFloat(node.result[node.showData]);
							}
							if(map.legend){
								var panel = map.legend.legendPanel;
								var panelItem = panel.find("li");
								panelItem.removeClass("M_on");
								try{
									panelItem.tooltip("hide");
								}catch(e){
									//tooltip이 없을때입니다
								}
								
								$.each(panelItem,function(cnt,node){
									var min = parseFloat($(node).data("min"));
									var max = parseFloat($(node).data("max"));
									var isActive = false;
									if(min<=value&&max>=value){
										var item = panel.find("li:eq("+cnt+")");
										item.addClass("M_on");
										if(panel.is(":visible")){
											try{
												//item.tooltip("show");	// 2020.09.03[한광희] 통계주제도 분할뷰 수정
											}catch(e){
												//tooltip이 없을때입니다
											}
										}
										return false;
									}
								});
							}
							html+="<div style='font-size:12px;padding-left:5px;'>";
							html+=year;
							if(hasText(node.showDataName)){
								html+=node.showDataName+" : ";
							}
							if(that.delegate.search&&that.delegate.search.isIndicator==true){
								var pointIndexOf = value.toString().indexOf(".");
								if(pointIndexOf > -1&&value.toString().substring(pointIndexOf+1).length>=2){
									value = value.toFixed(2);
								}
							}
							if($.isNumeric(node.result[node.showData])){
								html+=appendCommaToNumber(value);
							}else{
								html+=node.result[node.showData];
							}
							html+=(node.unit?"("+node.unit+")":"");
							html+="</div>";
						});
					}
				}else{
					html+="<div>N/A</div>";
				}
				html+="</div>";
				return html;
			};
			/**
			 * @name         : createInfoTooltip
			 * @description  : 경계레이어 선택 시, 툴팁을 생성하여 정보를 표출한다.
			 * @date         : 2016. 03. 17. 
			 * @author	     : 나광흠
			 * @history      :
			 * @param event  : 선택된 경계레이어
			 * @param data   : 선택된 경계레이어의 데이터정보
			 * @param type   : 타입
			 * @param map    : 지도
			 */
			this.createInfoTooltip =  function(event, data, type, map) {
				var option = {
					direction:"left",
					noHide:true,
					opacity : 0.8,
					pane:"infowindowPane"
				};
				if(hasText(event.layerPoint)&&hasText(event.layerPoint.x)){
					option.direction = event.layerPoint.x>180?"left":"right";
				}else{
					event.utmk = [data.properties.x,data.properties.y];
				}
				event.target.bindToolTip(this.getInfoTooltipText(data,map), option).addTo(map.gMap)._showToolTip(event);
			};
			/**
			 * @name            : createInfoWindow
			 * @description     : 데이터 셋팅해줄 window 생성
			 * @date            : 2016. 05. 03. 
			 * @author	        : 나광흠
			 * @history         :
			 * @param position  : 위치
			 */
			this.createInfoWindow = function (position) {
				var infoWindow = sop.control({
					position : position
				});
				infoWindow.onAdd = function () {
					this._div = sop.DomUtil.create('div', 'infoWindow');
					$(this._div).css({
						"font":"12px/14px Arial, Helvetica, sans-serif",
						"background":"rgba(255,255,255,1)",
						"box-shadow":"0 0 15px rgba(0,0,0,0.2)",
						"border-radius": "5px",
						"opacity": "0.8"
					}).on("click",function(e){
						if(that.dataBoundary){
							var point = that.gMap.mouseEventToLayerPoint(e); // 터치 포인트
							$.each(that.dataBoundary.getLayers(),function(cnt,layer){
								if(layer&&layer._containsPoint&&layer._containsPoint(point)){
									layer.bringToFront();
									layer.fire("click");
									return false;
								}
							});
						}
					});
					sop.DomEvent.disableClickPropagation(this._div);
					this.update();
					return this._div;
				};
				
				infoWindow.updateData = function (data) {
					var html;
					if (!sop.Util.isUndefined(data.info) && data.info.length > 0) {
						html = that.getInfoTooltipText(data,that);
					}else {
						html = '데이터가 존재하지 않습니다';
					}
					this.update(html);
				};
				infoWindow.update= function (props) {
					if(props != null && props != undefined) {
						this._div.innerHTML = props;
					}
				};
				that.infoWindow = infoWindow;
				infoWindow.addTo(that.gMap);
			};
			
			this.setLegendColor = function () {
				if (this.dataGeojson || this.multiLayerControl.dataGeojson) {
					this.updatePolygonGeoJson();
				}
			};
			/**
			 * @name           : getCenterToAdmCd
			 * @description    : 지도의 중심점으로 집계구값 얻기
			 * @date           : 2016. 03. 28. 
			 * @author	       : 나광흠
			 * @history        :
			 * @param center   : 중심
			 * @param callback : callback
			 */
			this.getCenterToAdmCd = function(center,callback){
				var obj = new sop.openApi.personal.findcodeinsmallarea.api();
				var x,y;
				if(Object.prototype.toString.call(center)==="[object Array]"&&center.length==2){
					x = center[0];
					y = center[1];
				}else{
					center = this.gMap.getCenter();
					x = center.x;
					y = center.y;
				}
				obj.addParam("accessToken", accessToken);
				obj.addParam("x_coor", x);
				obj.addParam("y_coor", y);
				obj.request({
					method : "GET",
					async : false,
					url : openApiPath+"/OpenAPI3/personal/findcodeinsmallarea.json",
					options : {
						callback : callback,
						center : center,
						target : this
					}
				});
			};
			/**
			 * @name          : createMapControlButton
			 * @description   : 지도 컨트롤 버튼 생성
			 * @date          : 2016. 07. 12. 
			 * @author        : 나광흠
			 * @history       :
			 * @param option  : option
			 * 	{
			 *  	position : 생성 위치
			 *  }
			 */
			this.createMapControlButton = function(option){
				option = option||{};
				if(typeof option.position !== "string"||!/topleft|topright|bottomleft|bottomright/.test(option.position)){
					option.position = "topright";
				}
				var mapControl = sop.control({
					position : option.position
				});
				mapControl.onAdd = function () {
					this._div = sop.DomUtil.create('div', 'mapSetting');
					var mapControl = this;
					var html = '',btnPosition;
					html+='	<div class="control_item setting_control"></div>';
					html+='	<div class="box" style="'+option.position.replace(/top|bottom/,"")+":-380px;"+'top:0px;">';
					html+='		<div class="title">지도 설정<a href="javascript:void(0)" class="close" onclick=""></a></div>';
					html+='		<div class="list"><ul></ul></div>';
					html+='	</div>';
					$(this._div).append(html);
					sop.DomEvent.disableClickPropagation(this._div);
					sop.DomEvent.disableScrollPropagation(this._div);
					
					$(this._div).find(".control_item.setting_control").click(function(){
						mapControl.show();
					});
					$(this._div).find(".close").click(function(){
						mapControl.hide();
					});
					return this._div;
				};
				mapControl.addChildren=function(html) {
					$(this._div).find(".box>.list>ul").append(html);
				};
				mapControl.show=function() {
					var animate = {};
					animate[option.position.replace(/top|bottom/,"")] = "0px";
					$(this._div).find(".box").stop().animate(animate,200);
				};
				mapControl.hide=function() {
					var animate = {};
					animate[option.position.replace(/top|bottom/,"")] = "-380px";
					$(this._div).find(".box").stop().animate(animate,200);
				};
				mapControl.addTo(that.gMap);
				that.mapControlButton = mapControl;
			};
////////////////////////////////////////////////////////////////////////////
			//====================== 다중선택 컨트롤러 START =========================//
			////////////////////////////////////////////////////////////////////////////
			this.multiLayerControl = {
				multiData : null,
				dataGeojson : null,
				clear : function () {
					if (this.dataGeojson != null) {
						for (var i=0; i<this.dataGeojson.length; i++) {
							this.dataGeojson[i].remove();
						}
					}
					this.multiData = null;
					this.dataGeojson = null;
				},
				setStatsData : function (type, data, options, isShare) {
					var showDataParamName = "";
					var unit = "";
					var adm_cd = "";
					var length = 0;
					if (isShare) {
						showDataParamName = options.params.param_info.showData;
						unit = options.params.param_info.unit;
						adm_cd = options.adm_cd;
						length = options.params.param_info.paramInfo.adm_cd.split(",").length;
					}else {
						showDataParamName = options.params.filter;
						unit = options.params.unit;
						adm_cd = options.params.adm_cd;
						if (that.selectedBoundList != null) {
							if (that.selectedBoundList[0].feature != undefined) {
								var tmpAdmCdList = [];
								var tmpSortAdmCdList = [];
								for (var i=0; i<that.selectedBoundList.length; i++) {
									var tmpAdmCd = that.selectedBoundList[i].feature.properties.adm_cd;
									if (!this.isInnerMapShow3) { //mng_s 20180213 행정구역 그리드의 경우 8자리일 경우 8자리를 유지해야함
										if (tmpAdmCd.length > 7) {
											tmpAdmCd = tmpAdmCd.substring(0,7);
										}
									}
									tmpAdmCdList.push(tmpAdmCd);
								}
								
								$.each(tmpAdmCdList, function(i, el){
									if($.inArray(el, tmpSortAdmCdList) === -1) tmpSortAdmCdList.push(el);
								});
								length = tmpSortAdmCdList.length;
							}else {
								length = that.selectedBoundList.length;
							}	
						}
					}
					
					if (this.multiData == null) {this.multiData = [];}
					if (this.dataGeojson == null) {this.dataGeojson = [];}
					
					if (data != null) {
						if (showDataParamName != null && showDataParamName.length > 0) {
							data["showData"] = showDataParamName;
						}
						if (unit != null && unit.length > 0) {
							data["unit"] = unit;
						}
						
						//debugger;
						this.reqBoundary(adm_cd, data, "0", function() {
							if (that.multiLayerControl.multiData.length == length) {
								if (that.geojson) {
									that.geojson.remove();
								}
								var tmpMultiData = [];
								var admCdList = [];
								var tmpAdmCd = that.multiLayerControl.multiData[0].data.pAdmCd
								tmpMultiData.push(that.multiLayerControl.multiData[0]);
								admCdList.push(that.multiLayerControl.multiData[0].layer.pAdmCd);
								for (var i=1; i<that.multiLayerControl.multiData.length; i++) {
									var adm_cd = that.multiLayerControl.multiData[i].layer.pAdmCd;
									admCdList.push(adm_cd);
									if (tmpAdmCd != adm_cd) {
										tmpMultiData.push(that.multiLayerControl.multiData[i]);
									}
								}
								that.multiLayerControl.multiData = tmpMultiData;
								that.dataForCombine = that.multiLayerControl.multiData;
								if (that.isMultiControlDownBoundary) {
									that.multiLayerControl.autoDownBoundary();
								}
								that.multiLayerControl.setPolygonDataGeojson(that.multiLayerControl.multiData);
								if (that.legend != null) {
									that.legend.changeDataMode(that.legend.selectType);
								}
								that.checkShowCaption();
								
								if (that.shareInfo != null) {
									if (isShare) {
										that.shareInfo.setShareInfo(options, "share", that.id);
									}else {
										options["zoomlevel"] = that.zoom;
										options["center"] = that.center;
										options["btntype"] = "normal";
										if (options.params.param) {
											options.params.param.push({"key" : "adm_cd", "value" : admCdList.join()});
										}
										options.params.adm_cd = admCdList.join();
										that.shareInfo.setShareInfo(options, "normal", that.id);
									}
								}
								
								// multilayer 콜백
								if (that.delegate && 
									that.delegate.callbackFunc &&
									that.delegate.callbackFunc.didFinishedMultidata) {
									that.delegate.callbackFunc.didFinishedMultidata(that.multiLayerControl.multiData, admCdList, that);
								}
								
								tmpMultiData = null;
								admCdList = null;
								that.isMultiControlDownBoundary = true;
							}
						});
					}
				},
				
				//========================== mng_s 업종별 뜨는 지역 ==============================
				setStatsData2 : function (type, data, options, isShare) {
					var showDataParamName = "";
					var unit = "";
					var adm_cd = "";
					var length = 0;
					if (isShare) {
						showDataParamName = options.params.param_info.showData;
						unit = options.params.param_info.unit;
						adm_cd = options.adm_cd;
						length = options.params.param_info.paramInfo.adm_cd.split(",").length;
					}else {
						//showDataParamName = options.params.filter;
						showDataParamName = "corp_cnt";
						unit = options.params.unit;
						adm_cd = options.params.adm_cd;
						//if (that.selectedBoundList != null) {
						//	if (that.selectedBoundList[0].feature != undefined) {
								var tmpAdmCdList = [];
								var tmpSortAdmCdList = [];
								for (var i=0; i<options.params.length; i++) {
									var tmpAdmCd = options.params.adm_cd;
									if (!this.isInnerMapShow3) { //mng_s 20180212
										if (tmpAdmCd.length > 7) {
											tmpAdmCd = tmpAdmCd.substring(0,7);
										}
									}
									tmpAdmCdList.push(tmpAdmCd);
								}
								
								$.each(tmpAdmCdList, function(i, el){
									if($.inArray(el, tmpSortAdmCdList) === -1) tmpSortAdmCdList.push(el);
								});
								length = data.result.length;
						//	}else {
						//		length = that.selectedBoundList.length;
						//	}	
						//}
					}
					
					if (this.multiData == null) {this.multiData = [];}
					if (this.dataGeojson == null) {this.dataGeojson = [];}
					
					if (data != null) {
						if (showDataParamName != null && showDataParamName.length > 0) {
							data["showData"] = showDataParamName;
						}
						if (unit != null && unit.length > 0) {
							data["unit"] = unit;
						}
						
						/*
						setTimeout(function() {
							
						}, 1000);
						*/
					
						this.reqBoundary(adm_cd, data, "0", function() {
							if (that.multiLayerControl.multiData.length == length) {
								if (that.geojson) {
									that.geojson.remove();
								}
								var tmpMultiData = [];
								var admCdList = [];
								var tmpAdmCd = that.multiLayerControl.multiData[0].data.pAdmCd
								tmpMultiData.push(that.multiLayerControl.multiData[0]);
								admCdList.push(that.multiLayerControl.multiData[0].layer.pAdmCd);
								for (var i=1; i<that.multiLayerControl.multiData.length; i++) {
									var adm_cd = that.multiLayerControl.multiData[i].layer.pAdmCd;
									admCdList.push(adm_cd);
									if (tmpAdmCd != adm_cd) {
										tmpMultiData.push(that.multiLayerControl.multiData[i]);
									}
								}
								that.multiLayerControl.multiData = tmpMultiData;
								that.dataForCombine = that.multiLayerControl.multiData;
								if (that.isMultiControlDownBoundary) {
									that.multiLayerControl.autoDownBoundary();
								}
								that.multiLayerControl.setPolygonDataGeojson(that.multiLayerControl.multiData);
								if (that.legend != null) {
									that.legend.changeDataMode(that.legend.selectType);
									//that.legend.changeDataMode("color");
								}
								that.checkShowCaption();
								
								if (that.shareInfo != null) {
									if (isShare) {
										that.shareInfo.setShareInfo(options, "share", that.id);
									}else {
										//options["zoomlevel"] = that.zoom;
										options["zoomlevel"] = 7; //업종별 뜨는 지역은 7레벨
										//options["center"] = that.center;
										options["center"] = [that.multiLayerControl.multiData[0].data.result[0].x,that.multiLayerControl.multiData[0].data.result[0].y];
										options["btntype"] = "normal";
										if (options.params.param) {
											//options.params.param.push({"key" : "adm_cd", "value" : admCdList.join()});
										}
										options.params.adm_cd = admCdList.join();
										that.shareInfo.setShareInfo(options, "normal", that.id);
									}
								}
								
								// multilayer 콜백
								if (that.delegate && 
									that.delegate.callbackFunc &&
									that.delegate.callbackFunc.didFinishedMultidata) {
									that.delegate.callbackFunc.didFinishedMultidata(that.multiLayerControl.multiData, admCdList, that);
								}
								
								tmpMultiData = null;
								admCdList = null;
								that.isMultiControlDownBoundary = false;
							}
						});
						
						
					}
				},
				
				
				//========================== mng_e 업종별 뜨는 지역 ==============================
				
				reqBoundary : function(adm_cd, data, atdrc_yn, callback) {
					switch(parseInt(that.boundLevel)) {
						case 0:	//하위경계 0레벨
							switch (that.curPolygonCode) {
								case 1:
									this.openApiBoundaryContry(data, callback);
									break;
								case 2:
								case 3:
								case 4:
									this.openApiBoundaryHadmarea(adm_cd, that.bnd_year, that.boundLevel, data, atdrc_yn, callback);
									break;
								case 5:
									this.openApiBoundaryStatsarea(adm_cd, that.bnd_year, data, callback);
									break;
								default:
									break;	
							}
							break;
						case 1: //하위경계 1레벨
							switch (that.curPolygonCode) {
								case 1:
									this.openApiBoundarySido(that.bnd_year, data, callback);
									break;
								case 2:
								case 3:
									this.openApiBoundaryHadmarea(adm_cd, that.bnd_year, "1", data, atdrc_yn, callback);
									break;
								case 4:
								case 5:
									this.openApiBoundaryStatsarea(adm_cd, that.bnd_year, data, callback);
									break;
								default:
									break;	
							}
							break;
						case 2:	//하위경계 2레벨
							switch (that.curPolygonCode) {
								case 1:
									break;
								case 2:
								case 3:
									this.openApiBoundaryHadmarea(adm_cd, that.bnd_year, that.boundLevel, data, atdrc_yn, callback);
									break;
								case 4:
								case 5:
									this.openApiBoundaryStatsarea(adm_cd, that.bnd_year, data, callback);
									break;
								default:
									break;	
							}
							break;
					}

				},
				autoDownBoundary : function () {
					that.setBoundSelectedMoode(null);
					/*if (that.mapBtnInfo != null) {
						that.mapBtnInfo.setFixedBoundBtn(false);
					}*/
					
					if (that.dataGeojson != null) {
						that.dataGeojson.remove();		
						that.removeCaption();
						that.dataGeojson = null;
					}

					switch(parseInt(that.boundLevel)) {
						case 1: //하위경계 1레벨
							switch (that.curPolygonCode) {
								case 1:
									that.setZoom(2);
									break;
								case 2:
									that.setZoom(4);
									break;
								case 3:
									that.setZoom(7); 
									break;
								case 4:
									that.setZoom(9);
									break;
								default:
									break;	
							}
							break;
						case 2:	//하위경계 2레벨
							switch (that.curPolygonCode) {
								case 1:
									break;
								case 2:
									that.setZoom(7);
									break;
								case 3:
									that.setZoom(9);
									break;
								case 4:
									that.setZoom(9);
									break;
								case 5:
									break;
								default:
									break;	
							}
						break;
				}
				},
				setPolygonDataGeojson : function (Ldata) {
					var tmpLegendData = [];
					for (var i=0; i<Ldata.length; i++) {
						var showData = Ldata[i].data.showData;
						for (var k=0; k<Ldata[i].data.result.length; k++) {
							var tmpData = Ldata[i].data.result[k];
							tmpLegendData.push(parseFloat(tmpData[showData]));
						}
					}

					var legendData = [];
					legendData.push(tmpLegendData);
					//mng_s
					var curPage = document.location.href;
					var matchStr = "policyStaticMap";
					if(curPage.match(matchStr)){
						if(that.id == 0){
							 legendData2 = legendData;
							that.legend.valPerSlice = that.legend.calculateLegend(legendData);
						}else{
							legendData = legendData2;
							that.legend.valPerSlice = that.legend.calculateLegend(legendData2);
						}
					}else{
						that.legend.valPerSlice = that.legend.calculateLegend(legendData);
					}
					
					var tmpDataGeojsonLayer = [];
					for (var i=0; i<Ldata.length; i++) {
						var tmpData = Ldata[i];
						tmpData.layer = this.combineStatsData(Ldata[i]);
						if (tmpData.layer.combine) {
							this.dataGeojson.push(that.addPolygonGeoJson(tmpData.layer, "data"));
							tmpDataGeojsonLayer.push(tmpData.layer);
						}
						
						if (tmpData.data.kosis) {
							interactiveMapKosis.setResultDataOnMap();
						}

						if (tmpData.data.ecountry) {
							$interactiveMapEcountry.setResultDataOnMap();
						}
					}
					that.dataGeojson = null;
					that.dataGeojsonLayer = tmpDataGeojsonLayer;
					that.checkShowCaption();
					
					
					if (that.isMiniMapDraw) {
						if (that.miniMap.geojson) {
							that.miniMap.geojson.remove();
							that.miniMap.geojson = null;
						}
						that.miniMap.mapMove([989674, 1818313], 8, false);
						that.miniMap.addPolygonGeoJson(geoData, "mini");
					}

					this.Ldata = [];
					
				},
				combineStatsData : function (Ldata) {
					var data = Ldata.data;
					var boundData = Ldata.layer;
					if (data != null) {
						boundData["combine"] = true;
					}else {
						boundData["combine"] = false;
					}
					
					for ( var i=0; i<boundData.features.length; i++) {
						var adm_cd = boundData.features[i].properties.adm_cd;
						if (boundData.features[i].info == null) {
							boundData.features[i]["info"] = [];
						}
						
						if (data != null) {
							if (data.result != null) {
								for ( var x=0; x<data.result.length; x++) {
									for (key in data.result[x]) {
										if (key == "adm_cd") {
											if (adm_cd == data.result[x].adm_cd) {
												data.result[x]["showData"] = data.showData;
												data.result[x]["api_id"] = data.id;
												data.result[x]["unit"] = data.unit;
												data.result[x]["legendIndex"] = 0;
												data.result[x]["adm_nm"] = boundData.features[i].properties.adm_nm;
												boundData.features[i].info.push(data.result[x]);
												boundData.features[i]["dataIdx"] = x;
												break;
											}
											break;
										}
									}
								}
							}
						}
					}
					return boundData;
				},
				openApiBoundaryContry : function (data, callback) {
					$.ajax({
						  type: "GET",
						  url: "/js/data/geo.js",
						  success: function(res) {
							  res["pAdmCd"] = "";
							  that.multiLayerControl.multiData.push({
								 data : data,
								 layer : res
							  });
							  if (callback != undefined && typeof callback === "function") {
								  callback.call(undefined, res);
							  }
						  } ,
						  dataType: "json",
						  error:function(e){}  
					});
				},
				openApiBoundarySido : function (year, data, callback) {
					$.ajax({
						  type: "GET",
						  url: "/js/data/geo_sido_" + year + ".js",
						  success: function(res) {
							  res["pAdmCd"] = "00";
							  that.multiLayerControl.multiData.push({
								  data : data,
								  layer : res
							  });
							  if (callback != undefined && typeof callback === "function") {
								  callback.call(undefined, res);
							  }
						  } ,
						  dataType: "json",
						  error:function(e){}  
					});
				},
				
				//지역 다중선택일경우
				openApiBoundaryHadmarea : function (adm_cd, year, low_search, data, atdrc_yn, callback) {
					console.log("openApiBoundaryHadmarea2");
					console.log("openApiBoundaryHadmarea2");
					console.log("openApiBoundaryHadmarea2");
					console.log("openApiBoundaryHadmarea2");
					var params = null;
					if (atdrc_yn != undefined && atdrc_yn == "1") {
						params = {
							"accessToken" : accessToken, 
							"adm_cd" : adm_cd, 
							"year" : year, 
							"low_search" : low_search,
							"borough" : "1"
						};
					}else {
						params = {
							"accessToken" : accessToken, 
							"adm_cd" : adm_cd, 
							"year" : year, 
							"low_search" : low_search
						};
					}
					
					console.log("[map.js] sopOpenApiHadmareaObj.request 2222 호출전...");
					//mng_s 업종별 뜨는 지역만 async를 false로 변경
					var async_setting = true;
					//console.log("[map.js] sopOpenApiHadmareaObj.request $bizStatsLeftMenu [" + $bizStatsLeftMenu );
					
					try { //기술업종에서 $bizStatsLeftMenu가 정의되어있지 않다고 에러가 나서 에러처리를 해줘도 무조건 에러가 나와서 try/catch로 처리함 
						if($bizStatsLeftMenu.ui.jobBestSido != undefined && $bizStatsLeftMenu.ui.jobBestSido != ""){
							async_setting = false;
						} else {
							async_setting = true;
						}
					} catch (exception) {
						async_setting = true;
					}
					
					
					
					$.ajax({
						  type: "GET",
						  async: async_setting, //mng_s kimjoonha 20101031 여수시 돌산읍이 색지도로 표시 않되는 부분은 이걸 주석해제하면 해결되지만 해당 지역으로 센터 이동이 않되므로 일단 주석으로 가야된다.
						  url: openApiPath + "/OpenAPI3/boundary/hadmarea.geojson",
						  data : params,
						  success: function(res) {
							  switch(parseInt(res.errCd)) {
								  case 0:
									  res["pAdmCd"] = adm_cd;
									  if (that.multiLayerControl.multiData != null) {
										  
										  console.log("[map.js] openApiBoundaryHadmarea() 111");
										  
										  that.multiLayerControl.multiData.push({
											  data : data,
											  layer : res
										  });
									  }
									  if (callback != undefined && typeof callback === "function") {
										  
										  console.log("[map.js] openApiBoundaryHadmarea() 222");
										  
										  callback.call(undefined, res, that); //2017.05.29 [개발팀]
									  }
									  break;
								  case -401:
									  accessTokenInfo(function() {
										  that.multiLayerControl.openApiBoundaryHadmarea(adm_cd, year, low_search, data, atdrc_yn, callback);
									  });
									  break;
							  }
							 
						  },
						  beforeSend:function(){
							  $("div").remove(".ajax_mask");
						      $("div").remove(".ajax_loading");
							  var length = $("body").find(".ajax_mask").length;
							  	if (length == 0) {
							  		var mask = "<div class='ajax_mask'><div>";
								  	var loading = "<div class='ajax_loading'><img class='ajax_loading_img'/><div>";
							        $('body').append(mask);
								  	$('.ajax_mask').append(loading);
							  	}
						  },
						  complete:function(){
						        $("div").remove(".ajax_mask");
						        $("div").remove(".ajax_loading");
						  },
						  dataType: "json",
						  error:function(e){}  
					});
				},
				openApiBoundaryStatsarea : function (adm_cd, year, data, callback) {
					
					console.log("[map.js] openApiBoundaryStatsarea() /OpenAPI3/boundary/statsarea.geojson 호출전 adm_cd [" + adm_cd + "]");
					console.log("[map.js] openApiBoundaryStatsarea() this.isInnerMapShow3 [" + this.isInnerMapShow3 + "]");
					
					$.ajax({
						  type: "GET",
						  url: openApiPath + "/OpenAPI3/boundary/statsarea.geojson",
						  data : {
							  "accessToken" : accessToken, 
							  "adm_cd" : adm_cd, 
							  "year" : year
						  },
						  success: function(res) {
							  switch(parseInt(res.errCd)) {
								  case 0:
									  res["pAdmCd"] = adm_cd;
									  if (that.multiLayerControl.multiData != null) {
										  that.multiLayerControl.multiData.push({
											  data : data,
											  layer : res
										  });
									  }
									  
									  if (callback != undefined && typeof callback === "function") {
										  callback.call(undefined, res);
									  }
									 break;
								  case -401:
									  accessTokenInfo(function() {
										  that.multiLayerControl.openApiBoundaryStatsarea(adm_cd, year, data, callback);
									  });
									  break;
							  }
							  
						  },
						  beforeSend:function(){
							  $("div").remove(".ajax_mask");
						      $("div").remove(".ajax_loading");
							  var length = $("body").find(".ajax_mask").length;
							  	if (length == 0) {
							  		var mask = "<div class='ajax_mask'><div>";
								  	var loading = "<div class='ajax_loading'><img class='ajax_loading_img'/><div>";
							        $('body').append(mask);
								  	$('.ajax_mask').append(loading);
							  	}
						  },
						  complete:function(){
						        $("div").remove(".ajax_mask");
						        $("div").remove(".ajax_loading");
						  },
						  dataType: "json",
						  error:function(e){}  
					});
				}
			};
			////////////////////////////////////////////////////////////////////////////
			//======================= 다중선택 컨트롤러 END ==========================//
			////////////////////////////////////////////////////////////////////////////
			this.setDroppedInfo = function() {
				this.dropInfo = {
						center : this.center,
						zoom : this.zoom
				}
			};
			
			this.getAddress = function(sido_cd, objId){
				
				console.log("[mobile map.js] getAddress(sido_cd, objId)");
				
				var sggCd = null;
				$("#" + objId).html("");
				
					$.ajax({
						method: "GET",
						async: false,
						url: openApiPath + "/OpenAPI3/addr/stage.json",
						data: {
							accessToken:accessToken,
							cd: sido_cd,
							pg_yn: "0"
						},
						dataType: "json",
						success: function(res) {
							if(res.errCd=="0"&&res.result.length>0){
								for(var i=0; i<res.result.length; i++){
									var addr_name = res.result[i].addr_name;
									var cd = res.result[i].cd;
									
									if(objId == "sggSelect"){
										cd = cd.substring(2,5);
									}else if(objId = "emdSelect"){
										cd = cd.substring(5,7);
									} 
									
									var x_coor = res.result[i].x_coor;
									var y_coor = res.result[i].y_coor;
									
									var str="<option value="+ cd + " data-x=" + x_coor + " data-y=" + x_coor   +">" + addr_name + "</option>";
									/*
									<option value="00" data-x="990480.875" data-y="1815839.375">전국</option>
									 */
									$("#" + objId).append(str);
								}
							}
						},
						error: function(e) {}
					});
			}
			
			
		}
	};
	/*********** OpenAPI 리버스지오코딩 시작 **********/
	(function () {
		$class("sop.openApi.reverseGeoCode.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var map = options.target;
				if(res.errCd == "0") {
					var result = res.result[0];
					var prePolygonCode = map.curPolygonCode;
					map.setPolygonCode();
					var changeBoundary = false;
					map.center = options.center;
					if(prePolygonCode!=map.curPolygonCode){
						var tempPrePolygonCode = prePolygonCode==0?1:prePolygonCode;
						var tempCurPolygonCode = map.curPolygonCode==0?1:map.curPolygonCode;
						changeBoundary = tempPrePolygonCode!=tempCurPolygonCode;
					}else{
						if(map.curPolygonCode>1){
							if(map.curPolygonCode==2){
								if(map.curSidoCd != result.sido_cd){
									changeBoundary = true;
								}
							}else if(map.curPolygonCode==3){
								if(map.curSidoCd != result.sido_cd){
									changeBoundary = true;
								}else if(map.curSggCd != result.sgg_cd){
									changeBoundary = true;
								}
							}else if(map.curPolygonCode==4){
								if(map.curSidoCd != result.sido_cd){
									changeBoundary = true;
								}else if(map.curSggCd != result.sgg_cd){
									changeBoundary = true;
								}else if(map.curEmdongCd != result.emdong_cd){
									changeBoundary = true;
								}
							}else{
								changeBoundary = true;
							}
						}
					}
					map.curSidoCd = result.sido_cd;
					map.curSggCd = result.sgg_cd;
					map.curEmdongCd = result.emdong_cd;
					map.curSidoNm = result.sido_nm;
					map.curSggNm = result.sgg_nm;
					map.curEmdongNm = result.emdong_nm;
					if(changeBoundary){
						if(map.infoWindow&&map.infoWindow!=null){
							map.infoWindow.update("");
						}
						map.getBoundary(false,function(){
							if(map.delegate && map.delegate.callbackFunc && map.delegate.callbackFunc.didStartBoundary instanceof Function) {
								map.delegate.callbackFunc.didStartBoundary(map);
							}
							var callback = function(data){
								if(map.delegate && map.delegate.callbackFunc && map.delegate.callbackFunc.didEndBoundary instanceof Function) {
									map.delegate.callbackFunc.didEndBoundary(map,data);
								}
							};
							if(map.isDrawStat&&map.isAutoRefreshCensusApi&&map.censusApi&&Object.keys(map.censusApi.lastParameters).length>0){
								var census = map.censusApi;
								var option = $.extend(true,{},census.lastParameters.option);
								option.callback = callback;
								census.setStatsMapCensusData(census.lastParameters.api,option,census.lastParameters.parameter);
							}else{
								callback(null);
							}
						});
					}
					if(map.mapNavigation){
						if(changeBoundary){
							if(map.curPolygonCode<2){
								$("#"+map.mapNavigation.navigatorId+"sido").val("00");
							}else{
								map.mapNavigation.isUseLoading = false;
								if(map.curPolygonCode==2){
									map.mapNavigation.setSido(map.curSidoCd);
									if(map.delegate&&map.delegate.ui&&typeof map.delegate.ui.subNavigation==="object"&&Object.keys(map.delegate.ui.subNavigation).length>0){
										$.each(Object.keys(map.delegate.ui.subNavigation),function(cnt,node){
											if(typeof map.delegate.ui.subNavigation[node]!=="undefined"&&typeof map.delegate.ui.subNavigation[node].setSido === "function"){
												map.delegate.ui.subNavigation[node].isUseLoading = false;
												map.delegate.ui.subNavigation[node].setSido(map.curSidoCd);
											}
										});
									}
								}else if(map.curPolygonCode==3){
									map.mapNavigation.setSido(map.curSidoCd,map.curSggCd);
									if(map.delegate&&map.delegate.ui&&typeof map.delegate.ui.subNavigation==="object"&&Object.keys(map.delegate.ui.subNavigation).length>0){
										$.each(Object.keys(map.delegate.ui.subNavigation),function(cnt,node){
											if(typeof map.delegate.ui.subNavigation[node]!=="undefined"&&typeof map.delegate.ui.subNavigation[node].setSido === "function"){
												map.delegate.ui.subNavigation[node].isUseLoading = false;
												map.delegate.ui.subNavigation[node].setSido(map.curSidoCd,map.curSggCd);
											}
										});
									}
								}else if(map.curPolygonCode>3){
									if($("#"+map.mapNavigation.navigatorId+"sido").val()+$("#"+map.mapNavigation.navigatorId+"sgg").val()+$("#"+map.mapNavigation.navigatorId+"emdong").val()!=map.curSidoCd+map.curSggCd+map.curEmdongCd){
										map.mapNavigation.setSido(map.curSidoCd,map.curSggCd,map.curEmdongCd);
										if(map.delegate&&map.delegate.ui&&typeof map.delegate.ui.subNavigation==="object"&&Object.keys(map.delegate.ui.subNavigation).length>0){
											$.each(Object.keys(map.delegate.ui.subNavigation),function(cnt,node){
												if(typeof map.delegate.ui.subNavigation[node]!=="undefined"&&typeof map.delegate.ui.subNavigation[node].setSido === "function"){
													map.delegate.ui.subNavigation[node].isUseLoading = false;
													map.delegate.ui.subNavigation[node].setSido(map.curSidoCd,map.curSggCd,map.curEmdongCd);
												}
											});
										}
									}
								}
							}
						}
					}
				}else if(res.errCd == "-401") {
					accessTokenInfo(function(){
						options.target.openApiReverseGeoCode(options.center);
					});
				}else{
					map.center = null;
					map.curSidoCd = null;
					map.curSggCd = null;
					map.curEmdongCd = null;
					map.curSidoNm = null;
					map.curSggNm = null;
					map.curEmdongNm = null;
					if(map.boundary){
						map.boundary.remove();
					}
					map.boundary = null;
				}
			},
			onFail : function (status) {
				common_alert(errorMessage);
			}
		});
	}());
	/*********** OpenAPI 리버스지오코딩. 종료 **********/
	
	/*********** OpenAPI 리버스지오코딩2 시작 **********/
	(function () {
		$class("sop.openApi.reverseGeoCode2.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var map = options.target;
				if(res.errCd == "0") {
					var result = res.result[0];
					result.sido_cd;
					result.sgg_cd;
					result.emdong_cd;
					
					console.log("[mobile map.js] result.sido_cd [" + result.sido_cd + "] result.sgg_cd [" + result.sgg_cd + "] result.emdong_cd [" + result.emdong_cd );
					
					$("#sidoSelect").val(result.sido_cd) ;
					map.getAddress(result.sido_cd, "sggSelect");
					$("#sggSelect").val(result.sgg_cd) ;
					map.getAddress(result.sido_cd+result.sgg_cd, "emdSelect");
					$("#emdSelect").val(result.emdong_cd) ;
					
					
				}else if(res.errCd == "-401") {
					accessTokenInfo(function(){
						options.target.openApiReverseGeoCode2(options.center);
					});
				}else{
					map.center = null;
					map.curSidoCd = null;
					map.curSggCd = null;
					map.curEmdongCd = null;
					map.curSidoNm = null;
					map.curSggNm = null;
					map.curEmdongNm = null;
					if(map.boundary){
						map.boundary.remove();
					}
					map.boundary = null;
				}
			},
			onFail : function (status) {
				common_alert(errorMessage);
			}
		});
	}());
	/*********** OpenAPI 리버스지오코딩2. 종료 **********/
	
	/*********** OpenAPI 경계 시작 **********/
	(function () {
		$class("sop.openApi.boundary.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var map = options.target;
				if(res.errCd == "0") {
					map.setBoundary(res,options.isDataBoundary,options.callback);
				}else if(res.errCd == "-401") {
					accessTokenInfo(function(){
						if(options.adm_cd){
							options.target._boundary(options.adm_cd,options.isDataBoundary,options.callback);
						}else{
							options.target.getBoundary(options.isDataBoundary,options.callback);
						}
					});
				}else{
					if(typeof options.callback === "function"){
						options.callback();
					}
				}
			},
			onFail : function (status) {
				common_alert(errorMessage);
			}
		});
	}());
	/*********** OpenAPI 경계 종료 **********/
	/*********** OpenAPI 리버스지오코딩 콜백 시작 **********/
	(function () {
		$class("sop.openApi.reverseGeoCodeCallback.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var map = options.target;
				if(res.errCd == "-401") {
					accessTokenInfo(function(){
						options.target.reverseGeoCode(options.addr_type,options.center,options.callback);
					});
				}else{
					if(typeof options.callback === "function"){
						options.callback(res);
					}
				}
			},
			onFail : function (status) {
				common_alert(errorMessage);
			}
		});
	}());
	/*********** OpenAPI 리버스지오코딩 콜백 종료 **********/
	/*********** 지오코딩 시작 **********/
	(function() {
		$class("sop.openApi.addr.geocode.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				var map = options.target;
				if(res.errCd == "-401") {
					accessTokenInfo(function(){
						options.target.geocode(options.address,options.pagenum,options.resultcount,options.callback);
					});
				}else{
					if(typeof options.callback === "function"){
						options.callback(res);
					}
				}
			},
			onFail: function(status) {
				common_alert(errorMessage);
			}
		});
	}());
	/*********** 소통지도 리스트 종료 **********/
	/*********** 센터의 집계구값 얻기 시작 **********/
	(function() {
		$class("sop.openApi.personal.findcodeinsmallarea.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if(res.errCd == "0") {
					if(typeof options.callback === "function"){
						options.callback(res);
					}
				}else if(res.errCd == "-401") {
					accessTokenInfo(function(){
						options.target.getCenterToAdmCd(options.center,options.callback);
					});
				}
			},
			onFail: function(status) {
				common_alert(errorMessage);
			}
		});
	}());
	/*********** 센터의 집계구값 얻기 종료 **********/
	/** ********* OpenAPI 생활권역 반경기준 격자경계 검색 Start ********* */
	(function () {
		$class("sop.openApi.catchmentCircleGrid.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				console.log("[catchmentAreaMap.js] sop.openApi.catchmentCircleGrid.api res.errCd [" + res.errCd);
				console.log(res.features.length);
				if(options.target.id === 0) {
					$catchmentAreaMenu.ui.girdCnt = res.features.length;					
				} else if(options.target.id === 1) {
					$catchmentAreaDataBoard.ui.girdCnt2 = res.features.length;
				}
				//$catchmentAreaDataBoard.ui.settingGridinfo(res.features.length);
				var that = options.target;
				if (res.errCd == "0") {
					options["geojson"] = res;
					that.lastGeojsonInfo = options;
					res["pAdmCd"] = options.adm_cd;
					options.target.setPolygonDataGeojson(res);	// 여기서 실제 격자를 그리게 된다.
					
					var dataGeojson = that.dataGeojson;
					if(dataGeojson != undefined && dataGeojson != null){
						that.gMap.fitBounds(dataGeojson.getBounds());
					}					
					
					//9월 서비스
					if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
						options.callback.call(undefined, that, res);
					}
					if(options.resolve) { 
						options.resolve(options.target);
					}
				}
				else if (res.errCd == "-401") {
					accessTokenInfo(function() {
						that.openApiCatchmentGridArea(options.target.catchmentAreabounds); //9월 서비스
					});
					//9월 서비스
					if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
						options.callback.call(undefined, that, res);
					}
					if(options.reject){options.reject(status);}
				}
				else {
					//messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
				console.log("[catchmentAreaMap.js] sop.openApi.catchmentCircleGrid.api onFail [" + status);
				if(options.reject){options.reject(status);}
			}
		});
	}());
	/** ********* OpenAPI 생활권역 반경기준 격자경계 검색 검색 End ********* */
	/** ********* OpenAPI 생활권역 주행시간,거리기준 격자경계 검색 Start ********* */
	(function () {
		$class("sop.openApi.catchmentGrid.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				console.log("[catchmentAreaMap.js] sop.openApi.catchmentGrid.api res.errCd [" + res.errCd);
				console.log(res);
				
				//$catchmentAreaDataBoard.ui.settingGridinfo(res.features.length);
				var that = options.target;
				if (res.errCd == "0") {
					options["geojson"] = res;
					that.lastGeojsonInfo = options;
					res["pAdmCd"] = options.adm_cd;
					options.target.setPolygonDataGeojson(res);
					
					var dataGeojson = that.dataGeojson;
					if(dataGeojson != undefined && dataGeojson != null){
						that.gMap.fitBounds(dataGeojson.getBounds());
					}
					
					//9월 서비스
					if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
						options.callback.call(undefined, that, res);
					}
					if(options.resolve) { 
						//options.target.setDroppedInfo();
						options.resolve(options.target);
					}
					
				}
				else if (res.errCd == "-401") {
					accessTokenInfo(function() {
						that.openApiCatchmentGridArea(options.target.catchmentAreabounds); //9월 서비스
					});
					//9월 서비스
					if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
						options.callback.call(undefined, that, res);
					}
					if(options.reject) { options.reject(status);}
				}
				else {
					//messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
				console.log("[catchmentAreaMap.js] sop.openApi.catchmentGrid.api onFail [" + status);
				if(options.reject) { options.reject(status);}
			}
		});
	}());
	/** ********* OpenAPI 생활권역 주행시간,거리기준 격자경계 검색 End ********* */
}(window, document));
