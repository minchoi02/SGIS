/**
 * 맵에 관한 공통 메소드
 */
(function (W, D) {
	var defaultStyle = {weight: 2,opacity: 1,color: "#666666",dashArray: 3,fillOpacity: 0};//폴리곤 기본 스타일
	W.sMap = W.sMap || {};
	sMap = {
		map : function() {
			var that = this;
			this.id = null;//현재 지도 아이디
			this.bnd_year = bndYear;//경계 년도
			this.delegate = null;//sMap을 호출한 오브젝트
			this.gMap = null;//sop map
			this.target = null;//지도를 생성한 id
			this.defaultColor = "#f16b41";//지도의 기본 색상 
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
			this.mapNavigation = null;//지도 네비게이션
			this.currentDefaultZoom = 10;//현재위치 이동할때 기본 줌
			this.geojson = null;//경계 json
			this.boundary = null;//지도의 현재 경계
			this.dataBoundary = null;//지도의 통계 데이터 경계
			this.data = [];//지도에 뿌려진 데이터 값
			this.showCaption = false;//데이터 표출 유무
			this.activeLayer = null;//현재 레이어
			this.isLayer = false;//지도를 클릭한게 layer 유무
			this.activeLayerColor = "#0086c6";//선택된 경계 테두리 색상
			this.isCurrentLocationMarker = false;//현재 위치로 이동하면 마커 찍을지 유무
			this.currentLocationMarker = null;//현재 위치 마커
			this.currentLocationCircle = null;//현재 위치 써클
			this.mapControlButton = null;//지도 설정 컨트롤
			this.isDrawStat = true;//통계를 그릴지 말지 여부
			this.isZoomControl = true;//확대 축소
			this.isHideLegendControl = false;//범례 숨김 여부
			this.chooseLegendColor = null;//범례 색상
			this.borough = null;//자치구는 1
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
			 *  mapControlButtonOption : 지도 컨트롤 박스의 옵션
			 *  	{
			 *  		position : 생성 위치
			 *  	}
			 *  mapStatToggleOption : 통계 폴리곤 토글 버튼의 옵션
			 *  	{
			 *  		defaultShowMapStat : 초기에 지도의 통계를 보여줄지의 유무
			 *  		callback : callback(isOn)
			 *  	}
			 *  mapCaptionToggleOption : 통계 캡션 토글 옵션
			 *  	{
			 *  		defaultShowCaption : 초기에 지도의 통계 캡션을 보여줄지의 유무
			 *  		callback : callback(isOn)
			 *  	}
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
					zoomControl:false
				});
				sop.control.scale({position:"bottomright"}).addTo(this.gMap);
				this.gMap.scrollWheelZoom.disable();
				if(option){
					if(option.defaultColor){
						this.defaultColor = option.defaultColor;
					}
					if ($.isNumeric(option.zoom)) {
						this.zoom = option.zoom;
					}
					if ($.isNumeric(option.currentDefaultZoom)) {
						this.currentDefaultZoom = option.currentDefaultZoom;
					}
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
				//범례생성
				this.isZoomControl = option.isZoomControl===true;
				this.isHideLegendControl = option.isHideLegendControl===true;
				this.legend = new sLegendInfo.legendInfo(this);
				if(this.defaultColor){
					this.legend.defaultColor = this.defaultColor;
				}
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
					this.legend.createRetunControl();//귀농,귀어,귀촌 버튼
				}
//				this.censusApi = new sCensusApi.request(this);
//				this.gMap.on("click",function(e){
//					if(!that.isLayer){
//						that.removeActiveStyle();
//					}
//					that.isLayer = false;
//				});
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
						that.zoom = that.gMap.getZoom();
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
			 * @name        : getAdmCd
			 * @description : 행정동코드를 curPolygonCode에 따라 갖고온다(최대 읍면동까지)
			 * @date        : 2016. 03. 16. 
			 * @author      : 나광흠
			 * @history     :
			 */
			this.getAdmCd = function(){
//				console.log("[2020] common > map.js> this.curPolygonCode = " + this.curPolygonCode);
				if(this.curPolygonCode<=1){
					return "00";
				}else if(this.curPolygonCode==2){
//					console.log("[2020] common > map.js> this.curPolygonCode == 2  [ curSidoCd = " + this.curSidoCd + "]");
					return this.curSidoCd;
				}else if(this.curPolygonCode==3){
//					console.log("[2020] common > map.js> this.curPolygonCode == 3  [ curSidoCd + curSggCd = " + this.curSidoCd+this.curSggCd+ "]");
					return this.curSidoCd+this.curSggCd;
				}else if(this.curPolygonCode>=4){
//					console.log("[2020] common > map.js> this.curPolygonCode >= 4  [ curSidoCd + curSggCd + curEmdongCd = " + this.curSidoCd+this.curSggCd+this.curEmdongCd+ "]");
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
					dataType: "json",
					async : false,
					success: function(res) {
						that.setBoundary(res,isDataBoundary,callback);
					}
				});
			};
			/**
			 * @name                 : _boundary
			 * @description          : OpenAPI 경계 정보
			 * @date                 : 2016. 03. 16. 
			 * @author               : 나광흠
			 * @history              :
			 * @param isDataBoundary : 데이터 경계인지 유무
			 * @param adm_cd         : 행정동 코드
			 * @param parameters     : 데이터 경계 유무
			 * @param callback       : callback
			 */
			this._boundary = function(isDataBoundary, adm_cd,parameters,callback){
				this.setPolygonCode();
				if(adm_cd){
					// 시군구 경계 (비자치구)
					if(adm_cd.length==2){
						parameters = {
							region : "atdrc",
							base_year : this.bnd_year,
							sido_cd : adm_cd
						};
					}else if(adm_cd.length==5){
						parameters = {
							region : "sgg",
							base_year : this.bnd_year,
							sido_cd : parameters.sido_cd,
							sgg_cd : parameters.sgg_cd
						};
					}
					$.ajax({
						method: "GET",
						async: false,
						url: sgisContextPath + "/ServiceAPI/totSurv/common/getTotSurvRegion.geojson",
						data: parameters,
						dataType: "json",
						success: function(res) {
							that.setBoundary(res,isDataBoundary,callback);
						}
					});
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
				if(isDataBoundary){
					boundary = "dataBoundary";
				}else{
					boundary = "boundary";
				}
				if(this[boundary]){
					this[boundary].remove()
				}
				this[boundary] = this.getSopBoundary(geojson);
				if(!isDataBoundary&&!(this.boundary&&this.dataBoundary&&this.dataBoundary.getBounds().equals(this.boundary.getBounds()))){
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
				
				return sop.geoJson(geojson, {
					style: function () {
						var activeStyle = $.extend(true, {}, defaultStyle);
						activeStyle.type="polygon";
						return activeStyle;
					},
					onEachFeature: layerEvent.bind(that)
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
				const fillColor = layer.options.fillColor;
				that.removeActiveStyle();
				that.activeLayer = layer;
				layer.bringToFront();
				layer.setStyle({
					weight: 4,
					color: that.activeLayerColor,
					dashArray: layer.options.dashArray,
					fillOpacity: layer.options.fillOpacity,
					fillColor: fillColor
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
			 *  	admCdKey : 보여줄 데이터 값의 key
			 *  	showData : 보여줄 데이터 값의 key
			 *  	showDataName : 보여줄 데이터 이름
			 *  	unit : 단위
			 *  	callback : callback
			 * 	}
			 * @param data      : 데이터
			 * @param parameter : parameter
			 */
			this.setStatsData = function(option,data,parameter){
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
				var admCdKey = option.admCdKey?option.admCdKey:"adm_cd";
				this._boundary(true,adm_cd,parameter,function(){
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
							if(this[admCdKey]==layerAdmCd){
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
			};
			/**
			 * @name              : updatePolygonGeoJson
			 * @description       : polygon 색상 업데이트
			 * @date              : 2016. 03. 16. 
			 * @author            : 나광흠
			 * @history           :
			 * @param type        : type
			 * @param colorChange : 색상만 교체하는지의 여부
			 */
			this.updatePolygonGeoJson = function (type,colorChange) {
				if(this.dataBoundary != null){
					this.dataBoundary.eachLayer(function (layer) {
						if(layer.feature&&layer.feature.info&&layer.feature.info.length>0){
							$.each(layer.feature.info,function(cnt,node){
								if(node.showData&&hasText(node[node.showData])&&node[node.showData]!=="N/A"){
									that.setLayerColor(layer,that.legend.getColor(node[node.showData], that.legend.valPerSlice[cnt])[0],type,colorChange);
								}else{
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
						if(layer.feature&&layer.feature.info&&layer.feature.info.length>0){
							$.each(layer.feature.info,function(cnt,node){
								if(node.showData&&hasText(node.result[node.showData])&&node[node.showData]!=="N/A"){
									that.setLayerColor(layer,that.legend.getColor(node.result[node.showData], that.legend.valPerSlice[cnt])[0],"data",colorChange);
								}else{
									that.setLayerColor(layer,"#F0FFF0","data",colorChange);
								}
							});
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
				}
			};
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
			this.setLayerColor = function(layer,fillColor,type,colorChange){
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
			/**
			 * @name          : setCaption
			 * @description   : polygon위에 통계값 보여주기
			 * @date          : 2016. 03. 16. 
			 * @author        : 나광흠
			 * @history       :
			 */			
			this.setCaption = function () {
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
			};
			/**
			 * @name          : removeCaption
			 * @description   : polygon위에 통계값 삭제
			 * @date          : 2016. 03. 16. 
			 * @author        : 나광흠
			 * @history       :
			 */
			this.removeCaption = function () {
				that.showCaption = false;
				if (this.dataBoundary != null) {
					this.dataBoundary.eachLayer(function (layer) {
						layer.removeCaption();
					});
				}
			};
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
					defaultStyle.fillColor = that.activeLayer.options.originalFillColor;
					defaultStyle.fillOpacity = that.activeLayer.options.fillOpacity;
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
			this.getAddress = function(sido_cd, objId){
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
			this.copyDataBoundary = function(target){
				if(target.dataBoundary){
					target.dataBoundary.remove()
				}
				target.dataBoundary = sop.geoJson(this.dataBoundary.toGeoJSON(),{
					style: layerStyle,
					onEachFeature: layerEvent.bind(target)
				});
				const mapLayers = this.dataBoundary.getLayers();
				const copyLayers = target.dataBoundary.getLayers();
				copyLayers.forEach(function(layer,index){
					target.setLayerColor(layer,mapLayers[index].options.originalFillColor?mapLayers[index].options.originalFillColor:mapLayers[index].options.fillColor,"data",false);
				});
				target.dataBoundary.addTo(target.gMap)
			}
		}
	};
	function layerStyle(){
		var activeStyle = $.extend(true, {}, defaultStyle);
		activeStyle.type="polygon";
		return activeStyle;
	}
	function layerEvent(feature, layer){
		const that = this;
		layer.on({
			click : function (e) {
				layer.bringToFront();
				if(layer.options.originalFillColor===undefined){
					layer.options.originalFillColor = layer.options.fillColor;
				}
				layer.options.fillColor = "#0086c6";
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
}(window, document));
