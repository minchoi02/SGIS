(function(W, D) {
	const defaultCenter = [1009818, 1790781];
	W.$totSurvMap = W.$totSurvMap || {};
	$(document).ready(function() {
		$totSurvMap.event.setUIEvent();
	});
	let isLoad = false;
	$(window).on("orientationchange",function(){
		setTimeout(function(){
			$totSurvMap.event.mapResize();
		},100);
	});
	$totSurvMap.ui = {
		viewMapAdmCd:"00",
		/**
		 * @name         : tooltipMap 
		 * @description  : 레이어 팝업으로 나오는 지도에대한 툴팁
		 */
		tooltipMap:{
			selectedAdmCd:null,//선택된 지역 코드
			selectedAdmNm:"전국",//선택된 지역 이름
			didSelectedPolygon : null,//선택된 지역 폴리곤
			/**
			 * @name                     : tooltipMap 
			 * @description              : 레이어 팝업으로 나오는 지도에대한 툴팁
			 * @param tooltipCallback    : tooltip callback
			 */
			show:function({tooltipCallback}){
				if(typeof tooltipCallback === "function"){
					tooltipCallback();
				}
				$("#tooltip-map-modal-title").empty().append(
					$("<p>",{"text":$totSurvMap.ui.year["top-map"]+'년 vs '+$totSurvMap.ui.year["map"]+"년"}),
					$("<h3/>").append($totSurvMap.ui.tooltipMap.selectedAdmNm+' 인구 변화'),
					$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
						$('#tooltip-map-container').hide();
						$('.dim').hide();
						return false;
					}).append($("<span/>",{"class":"btn-close btn-close--black"}))
				);
				$("#tooltip-map-tooltip").hide();
				$("#tooltip-map-container,.dim").show();
				$totSurvMap.ui.map["tooltip-map"].gMap.invalidateSize();
				$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
			}
		},
		locationNameArray:["전국"],//현재 지역 명칭array
		admCd : $.heum.hasData($.heum.getAllParameter().admCd)?$.heum.getAllParameter().admCd:null,//지도에 뿌려준 코드
		selectedAdmNm : null,//선택된 지역 이름
		isAtdrc : false,	// 비자치구 여부  (ex 수원시 (5자리) 클릭시 구정보 조회) / census 조회시 true면 5자리라도 조회 안하도록
		year : {
			"top-map" : null,
			"map" : null
		},
		theme:null,//현재 페이지 테마 명
		map : {},//지도
		/**
		 * @name         : getMataDataUrl
		 * @description  : kosis url 조회
		 * @param survId : 조사ID
		 */
		getMataDataUrl:function(survId){
			$.ajax({
				method: "POST",
				async: true,
				url: sgisContextPath + "/ServiceAPI/totSurv/common/getTotSurvInfo.json",
				data: {"survId": survId},
				dataType: "json",
				success: function(res) {
					if (res.errCd == "0") {
						// 총조사시각화정보
						window.open(res.result.totSurvInfo[0].surv_url,"_blank"); 
					}
				},
				error: function(e) {
					console.error(e);
				}
			});
		},
		/**
		 * @name         : themeData 
		 * @description  : 테마에 대한 필요 정보들
		 */
		themeData:{
			population : {//인구
				defaultColor : "#f16b41",
				name:"인구",
				mapData : {
					getParameters : function(){
						return {
							surv_id : "PH0001",
							itm_cd : "T100"
						};
					},
					unit:"명"
				}
			}
		},
		/**
		 * @name             : getData
		 * @description      : 총조사 시각화 지도에 대한데이터 얻기 
		 * @param map        : 지도 객체
		 * @param parameters : 파라미터
		 */
		getData:function(id){
			common_loading(true);
			var themeInfo = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
			var _this = this;
			this.admCd = this.admCd==null?"00":this.admCd;
			let map = _this.map;
			if(!$.heum.hasData(id)){
				id = "map";
			}
			let parameters = $.extend(true, {
				surv_year: $totSurvMap.ui.year[id], 
				isAtdrc : $totSurvMap.ui.isAtdrc,
				map_ty: "color",
			}
			, this.getAreaBndryParameters()
			, themeInfo.mapData.getParameters());
			if(this.admCd=="00"){
				$("#population-for-time-container").show();
			}else{
				$("#population-for-time-container").hide();
			}
			$.ajax({
				method: "POST",
				async: true,	// 반드시 동기처리 해야 함
				url: sgisContextPath + "/ServiceAPI/totSurv/common/getTotSurvData.json",
				data: parameters,
				dataType: "json",
				success: function(res) {
					if (res.errCd == "0") {
						$("[data-id=year-region-name]").text(map[id].bnd_year+"년 "+_this.locationNameArray[_this.locationNameArray.length-1]);
						map[id].setStatsData({
							adm_cd: _this.admCd,
							admCdKey:"adm_cd",
					 		showData : "dt",
					 		unit : themeInfo.mapData.unit,
							callback:function(){
								if(id==="map"){
									if(typeof window.createTotSur==="function"){
										window.createTotSur();
									}
									isLoad = true;
								}
//								if(_this.admCd=="00"){
//									map[id].gMap.setView(defaultCenter,1);
//								}else{
									map[id].gMap.fitBounds(map[id].dataBoundary)
//								}
							}
						},res.result.mapData,parameters);
					}
				},
				complete : function(){
				}
			});
		},
		/**
		 * @name        : getAreaBndryParameters
		 * @description : 지역 파라미터 데이터 얻기
		 */
		getAreaBndryParameters:function(){
			let result = {};
			if(!$.heum.hasData($totSurvMap.ui.admCd)||$totSurvMap.ui.admCd.length == 2){
				if($.heum.hasData($totSurvMap.ui.admCd)&&$totSurvMap.ui.admCd!="00"){
					result.area_bndry_se = "sgg";
					result.sido_cd = $totSurvMap.ui.admCd;
					result.sgg_cd = "999";
				}else{
					result.area_bndry_se = "sido";
				}
			}else if($totSurvMap.ui.admCd.length == 5){
				result.area_bndry_se = "sgg";
				result.sido_cd = $totSurvMap.ui.admCd.substring(0,2);
				result.sgg_cd = $totSurvMap.ui.admCd.substring(2,5);
			}else if($totSurvMap.ui.admCd.length == 7){
				result.area_bndry_se = "emdong";
			}else{
				result.area_bndry_se = "totreg";
			}
			return result;
		},
		/**
		 * @name        : createMap
		 * @description : 지도 생성
		 * @param id    : html tag id
		 */
		createMap: function(id) {
			if($.heum.hasData($totSurvMap.ui.theme)){
				var themeInfo = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
				this.map[id] = new sMap.map();
				let year = $totSurvMap.ui.year[id]
				if($("[data-id="+id+"-year]").is("select")){
					$("[data-id="+id+"-year]").val(year);
				}else{
					$("[data-id="+id+"-year]").text(year+"년");
				}
				this.map[id].bnd_year = year;
				this.map[id].createMap($totSurvMap, id, {
					defaultColor : themeInfo.defaultColor,
					zoom:2,
					currentDefaultZoom:2,
					isZoomControl : id!=="top-map",//줌 컨트롤 버튼 생성 유무
					isCurrentControl : false,//현재위치 버튼 생성 유무
					isMapControlButton : false,//지도 컨트롤 박스 생성 유무 
					isMapStatToggleControl : false,//통계 폴리곤 토글 버튼 생성 유무 
												  //createMap 할때 넘겨준 객체에서 ui.setStats이란 메소드가 존재해야합니다. ex : $totSurvMap.ui.setStats
					mapStatToggleOption : //통계 폴리곤 토글 버튼의 옵션
					{
						defaultShowMapStat : false,//초기에 지도의 통계를 보여줄지의 유무
						callback : function(isOn){//콜백(on유무)
						}
					},
					isMapCaptionToggleControl : false,//통계 캡션 토글 버튼 생성 유무
					mapCaptionToggleOption : //통계 캡션 토글 옵션
					{
						defaultShowCaption : true,//초기에 지도의 통계 캡션을 보여줄지의 유무
						callback : function(isOn){//콜백(on유무)
						}
					},
					isMapSizeControl : false,//지도 전체화면 버튼 생성 유무
					isMapNavigator : id!=="top-map",//지도 네비게이션 생성 유무
					navigatorOption : //지도 네비게이션 옵션
					{
						id : "map-navigator-"//네비게이터 아이디(ex : navigator-sido 면 sido를 제거하고 navigator)
					},
					isLegendControl : true,//범례 컨트롤 생성 유무
					isHideLegendControl : id==="top-map",//범례 컨트롤 숨김 유무
					legendOption : //범례 옵션
					{
						//legend 객체에 있는 옵션을 참고해주세요
					}
				});
				this.map[id].addControlEvent("movestart");
				this.map[id].addControlEvent("moveend");
				this.map[id].addControlEvent("zoomstart");
				this.map[id].addControlEvent("zoomend");
				this.map[id].addControlEvent("drag");
				this.map[id].addControlEvent("dragend");
				if(id!=="tooltip-map"){
					this.getData(id);
				}
			}
		}
	};
	let sync = false;
	/**
	 * @name            : getOpposite
	 * @description     : 반대측 지도 리턴
	 * @date            : 2016. 05. 03. 
	 * @author	        : 나광흠
	 * @history         :
	 * @param map       : 지도
	 */
	function getOpposite(map){
		if(map.target=="map"){
			return $totSurvMap.ui.map["top-map"];
		}else if(map.target=="top-map"){
			return $totSurvMap.ui.map.map;
		}else{
			return null;
		}
	}
	/**
	 * @name            : mapSync
	 * @description     : 지도 위치 맞추기
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
	let isFireClick = false;
	$totSurvMap.callbackFunc = {
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
			sync = true;
			mapSync(map,false);
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
			if(sync){
				sync = false;
				mapSync(map,true);
			}
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
			sync = true;
			mapSync(map,false);
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
			sync = true;
			mapSync(map,false);
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
			sync = false;
			mapSync(map,true);
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
			sync = true;
			mapSync(map,false);
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
				var themeInfo = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
				if(map.target!=="tooltip-map"){
					$("#"+map.target+"-tooltip").empty().append(
						$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
							$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year[map.target]+"년 총인구"}),
							$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
								$(this).parents("[id$=-tooltip]").hide();
								return false;
							}).append($("<span/>",{"class":"btn-close btn-close--black"}))
						),
						$("<div/>",{"class":"modal__body"}).append(
							$("<p/>").append(
								$("<span/>",{"class":"color-blue font-large fwbold","text":feature.info[0].result.region_nm}),
							),
							$("<p/>").append(
								$("<span/>",{"class":"color-red font-large fwbold","text":$.heum.setThousandSeparator(feature.info[0].result.dt)}),"명"
							),
							(
								feature.properties.adm_cd.length>=5?null:
								$("<a/>",{"href":"#","text":"지역 이동"}).click(function(){
									$totSurvMap.ui.viewMapAdmCd = $totSurvMap.ui.admCd;
									$totSurvMap.ui.map.map.dataBoundary.eachLayer(function(layer){
										if($totSurvMap.ui.admCd==layer.feature.properties.adm_cd){
											$totSurvMap.ui.locationNameArray.push(layer.feature.properties.adm_nm);
											$("#location-text").empty();
											$totSurvMap.ui.locationNameArray.forEach(function(item){
												$("#location-text").append($("<p/>",{"text":item}));
											});
											$("#map-tooltip,#top-map-tooltip").hide();
											$totSurvMap.ui.getData("map");
											$totSurvMap.ui.getData("top-map");
										}
									});
									return false;
								})
							)
						)
					).show();
					if(map.target=="map"){
						$("[id$=chart],[id$=legend]").empty();
						$("#location-text").empty();
						$totSurvMap.ui.locationNameArray.forEach(function(item){
							$("#location-text").append($("<p/>",{"text":item}));
						});
						$("#location-text").append($("<p/>",{"text":feature.info[0].result.region_nm}));
						$totSurvMap.ui.admCd = feature.properties.adm_cd;
						$totSurvMap.ui.selectedAdmNm = feature.info[0].result.region_nm;
						if(isFireClick===false){
							$totSurvMap.ui.map["top-map"].dataBoundary.eachLayer(function(layer){
								if(layer.feature.properties.adm_cd==feature.info[0].result.adm_cd){
									isFireClick = true;
									layer.fire("click");
								}
							});
							if(typeof window.createTotSur==="function"){
								window.createTotSur();
							}
						}else{
							isFireClick = false;
						}
					}else{
						if(isFireClick===false){
							$totSurvMap.ui.map.map.dataBoundary.eachLayer(function(layer){
								if(layer.feature.properties.adm_cd==feature.info[0].result.adm_cd){
									isFireClick = true;
									layer.fire("click");
								}
							});
							if(typeof window.createTotSur==="function"){
								window.createTotSur();
							}
						}else{
							isFireClick = false;
						}
					}
				}else{
					$totSurvMap.ui.tooltipMap.selectedAdmCd = feature.properties.adm_cd;
					$totSurvMap.ui.tooltipMap.selectedAdmNm = feature.info[0].result.region_nm;
					$("#tooltip-map-tooltip").empty().append(
						$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
							$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.tooltipMap.selectedAdmNm}),
							$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
								$("#tooltip-map-tooltip").hide();
								return false;
							}).append($("<span/>",{"class":"btn-close btn-close--black"}))
						),
						$("<div/>",{"class":"modal__body"}).append(
							$("<p/>").append(
								$("<span/>",{"class":"","text":"증감 인구" }),
								$("<span/>",{"class":"color-red font-large fwbold","text":$.heum.setThousandSeparator(feature.info[0].result.calculat)}),"명"
							),
							$("<p/>").append(
								$("<span/>",{"class":"","text":"증감률" }),
								$("<span/>",{"class":"color-blue font-large fwbold","text":$.heum.setThousandSeparator(feature.info[0].result.rt)}),"%"
							)
						)
					).show();
				}
				
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
	$totSurvMap.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setUIEvent: function() {
			this.mapResize();
			let parameters = $.heum.getAllParameter();
			const parameterAdmCd = parameters.admCd;
			$totSurvMap.ui.theme = parameters.theme;
			$totSurvMap.ui.yearList = [];
			var themeInfo = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
			$.ajax({
				method: "POST",
				async: false,
				url: sgisContextPath + "/ServiceAPI/totSurv/common/getTotTms.json",
				data: { thema: themeInfo.name },
				dataType: "json",
				success: function(res) {
					if (res.errCd == "0") {
						if($.heum.hasData(res.result.tmsData)&&res.result.tmsData.length>0){
							let cycle = res.result.tmsData[0].updt_cycle.replace("년","");
							if(!$.heum.hasData(cycle)){
								cycle = 1;
							}
							for(var i=parseInt(res.result.tmsData[0].end_year);i>=parseInt(res.result.tmsData[0].start_year);i-=parseInt(cycle)){
								$totSurvMap.ui.yearList.push(i);
								$("#year-list").append($("<button/>",{"type":"button","class":"option__btn","text":i+"년","data-value":i}).click(function(){
									$(this).parent().children().attr("aria-checked",false);
									$(this).attr("aria-checked",true);
								}));
							}
							if($totSurvMap.ui.theme=="population"){
								$("#year-list").append($("<button/>",{"type":"button","class":"option__btn","text":"시계열","data-value":"time"}).click(function(){
									$(this).parent().children().attr("aria-checked",false);
									$(this).attr("aria-checked",true);
								}));
							}
							$("#year-list>button:last").trigger("click");
						}
					}
				},
				error: function(e) {
					console.error(e);
				}
			});
			
			if($.heum.hasData(parameterAdmCd)&&parameterAdmCd!="00"){
				$.ajax({
					type: "GET",
					url: openApiPath+"/OpenAPI3/addr/stage.json",
					data:{
						accessToken:accessToken,
						pg_yn:0
					},
					dataType: "json",
					async : false,
					success: function(res) {
						if(res.errCd=="0"){
							res.result.some((data)=>{
								if(data.cd==parameterAdmCd.substring(0,2)){
									$totSurvMap.ui.locationNameArray.push(data.addr_name);
									$totSurvMap.ui.admCd = data.cd;
									return true;
								}
							})
						}
					}
				});
				if(parameterAdmCd.length>=5){
					$.ajax({
						type: "POST",
						url: contextPath+"/m2021/map/totSurv/getSggList.json",
						data:{
							year:$totSurvMap.ui.yearList[0],
							sido_cd:parameterAdmCd.substring(2,5)
						},
						dataType: "json",
						async : false,
						success: function(res) {
							if(res.errCd=="0"){
								res.result.some((data)=>{
									if(data.sgg_cd==parameterAdmCd.substring(2,5)){
										$totSurvMap.ui.locationNameArray.push(data.sgg_nm);
										$totSurvMap.ui.admCd += data.sgg_cd;
										return true;
									}
								})
							}
						}
					});
				}
				$("#location-text").empty();
				$totSurvMap.ui.locationNameArray.forEach(function(item){
					$("#location-text").append($("<p/>",{"text":item}));
				});
			}
			
			$totSurvMap.ui.year.map = $totSurvMap.ui.yearList[0];
			$totSurvMap.ui.year["top-map"] = $totSurvMap.ui.yearList[1];
			
			$totSurvMap.ui.createMap("map");
			$totSurvMap.ui.createMap("top-map");
			
			$totSurvMap.ui.map.map.bnd_year = $totSurvMap.ui.yearList[0];
			$totSurvMap.ui.map["top-map"].bnd_year = $totSurvMap.ui.yearList[1];
			
			$totSurvMap.ui.createMap("tooltip-map");
			$($totSurvMap.ui.map["tooltip-map"].legend.legendPanel).hide();
			$totSurvMap.ui.map["tooltip-map"].bnd_year = $totSurvMap.ui.map.map.bnd_year;
			$totSurvMap.ui.map["tooltip-map"].legend.legendType="negative";
			$totSurvMap.ui.map["tooltip-map"].legend.useNegative=true;
			
			$totSurvMap.ui.yearList.forEach(function(year,index){
				if(index>0){
					$("select[data-id=top-map-year]").append($("<option/>",{"text":year+"년","value":year}));
				}
				if(index<$totSurvMap.ui.yearList.length-1){
					$("select[data-id=map-year]").append($("<option/>",{"text":year+"년","value":year}));
				}
			});
			$("select[data-id=top-map-year]").val($totSurvMap.ui.yearList[1]);
			$("select[data-id=map-year]").val($totSurvMap.ui.yearList[0]);
			const changeYear=(id)=>{
				$totSurvMap.ui.map[id].dataBoundary.remove()
				$totSurvMap.ui.map[id].bnd_year = $("select[data-id="+id+"-year]").val()
				$totSurvMap.ui.year[id] = $totSurvMap.ui.map[id].bnd_year;
				$("#"+id+"-tooltip").hide();
				$totSurvMap.ui.admCd = $totSurvMap.ui.viewMapAdmCd;
				$totSurvMap.ui.getData(id);
			}
			$("select[data-id=top-map-year]").change(function(){
				$("select[data-id=top-map-year]").val($(this).val());
				changeYear("map");
				changeYear("top-map");
				if(typeof window.createTotSur==="function"){
					window.createTotSur();
				}
			});
			$("select[data-id=map-year]").change(function(){
				$("select[data-id=map-year]").val($(this).val());
				const year = parseInt($(this).val());
				const topYear = parseInt($("select[data-id=top-map-year]").val());
				if(topYear>=year){
					$("select[data-id=top-map-year]").empty();
					for(let i=$totSurvMap.ui.yearList.indexOf(year)+1;i<$totSurvMap.ui.yearList.length;i++){
						$("select[data-id=top-map-year]").append($("<option/>",{"text":$totSurvMap.ui.yearList[i]+"년","value":$totSurvMap.ui.yearList[i]}));
					}
				}
				changeYear("map");
				changeYear("top-map");
				if(typeof window.createTotSur==="function"){
					window.createTotSur();
				}
			});
			// 맵 이미지 저장
			$("[data-save-image=true]").click(function(){
				const _this = this;
				if(confirm($(_this).data("confirm-text"))){
					common_loading(true);
					let options = {
						logging: true,
						useCORS: false,
						proxy: sgisContextPath+"/ServiceAPI/community/html2canvasproxy.jsonp"
					};
					html2canvas($("#"+$(_this).data("target"))[0], options).then(function(canvas) {
						var themeInfo = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
						var a = document.createElement('a');
						a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
						a.download = themeInfo.name+".png";
						a.click();
					});
				}
				return false;
			});
			//필터 이벤트
			$("#filter-form").submit(()=>{
				const year = $("#year-list button[aria-checked=true]").data("value");
				if(year=="time"){
					$totSurvMap.ui.locationNameArray = ["전국"];
					let sidoButton = $("#map-navigator-sido button[aria-checked=true]:not([data-value=00])");
					if(sidoButton.length>0){
						$totSurvMap.ui.locationNameArray.push(sidoButton.text());
						let sggButton = $("#map-navigator-sgg button[aria-checked=true]:not([data-value=999])");
						if(sggButton.length>0){
							$totSurvMap.ui.locationNameArray.push(sggButton.text());
						}
					}
					$("#location-text").empty();
					$totSurvMap.ui.locationNameArray.forEach(function(item){
						$("#location-text").append($("<p/>",{"text":item}));
					});
					$("#filter-close-button").trigger("click");
					$totSurvMap.ui.admCd = $totSurvMap.ui.map.map.mapNavigation.getAdmCd();
					$totSurvMap.ui.getData("map");
					$totSurvMap.ui.getData("top-map");
				}else{
					location.href=contextPath+"/m2021/map/totSurv.sgis?theme="+$totSurvMap.ui.theme+"&admCd="+$totSurvMap.ui.map.map.mapNavigation.getAdmCd()+"&year="+year;
				}
				return false;
			});
			//융합 결과 보기 이벤트
			$("#combine-button").click(()=>{
				common_loading(true);
				const themeInfo = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
				let parameters = $.extend(true, {
					start_year: $totSurvMap.ui.year["map"], 
					end_year: $totSurvMap.ui.year["top-map"], 
					area_bndry_se : $totSurvMap.ui.isAtdrc,
					map_ty: "color",
				}
				, $totSurvMap.ui.getAreaBndryParameters()
				, themeInfo.mapData.getParameters());
				$.ajax({
					method: "POST",
					async: true,
					url: sgisContextPath + "/ServiceAPI/totSurv/populationDash/getTmsCombineData.json",
					data: parameters,
					dataType: "json",
					success: function(res) {
						if (res.errCd == "0") {
							$totSurvMap.ui.tooltipMap.show({
							});
							$totSurvMap.ui.map["tooltip-map"].setStatsData({
								adm_cd: $totSurvMap.ui.admCd,
								admCdKey:"adm_cd",
						 		showData : "calculat",
						 		unit : themeInfo.mapData.unit,
								callback:function(){
//									if($totSurvMap.ui.admCd=="00"){
//										$totSurvMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
//									}else{
										$totSurvMap.ui.map["tooltip-map"].gMap.fitBounds($totSurvMap.ui.map["tooltip-map"].dataBoundary);
//									}
								}
							},res.result.mapData,parameters);
						}
					},
					error: function(e) {
						console.error(e);
					},
					complete: function(){
					}
				});
				return false;
			});
		},
		/**
		 * @name         : mapResize
		 * @description  : UI 리사이즈에 대한 이벤트. 
		 * @date         : 2017. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		mapResize: function(){
			$totSurvMap.event.setMapSize();
			if(isLoad === true){
				$totSurvMap.ui.getData("map");
				$totSurvMap.ui.getData("top-map");
			}
		},
		/**
		 * @name         : setMapSize
		 * @description  : 지도 사이즈 변경
		 * @date         : 2016. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setMapSize: function(){
			Object.keys($totSurvMap.ui.map).forEach(function(key){
				if($totSurvMap.ui.map[key]&&$totSurvMap.ui.map[key].gMap){
					$totSurvMap.ui.map[key].gMap.invalidateSize();
				}
			});
		}
	};
}(window, document));