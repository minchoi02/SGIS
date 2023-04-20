/**
 * 국가DB 전개도 화면
 * 
 * history : 네이버시스템(주), 1.0, 2014/11/20 초기 작성 author : wodus version : 1.0 see :
 * 
 */
(function (W, D) {
	W.$indoorMapView = W.$indoorMapView || {};
	
	$(document).ready(function () {
		// get Params
		var param = getAllParameter();
		
		if (param.sufid == undefined) {
			alert('bed request!');
			return;
		}
		else{
			$indoorMapView.ui.buildInfo.sufid = param.sufid;
		}

		// UI 초기화
		$indoorMapView.ui.initialize(400); 
		
		// Map 생성
		$indoorMapView.ui.createMap('map'); 
		
		// building info request
		$indoorMapView.request.getBuildingindoorMapView($indoorMapView.ui.buildInfo.sufid);
		
		//mng_s 20210504 이진호
		//사업체 전개도 상단 '?' 버튼에 마우스 오버시 보이는 문구의 출처년도를 common.js의 companyDataYear 의 값으로 자동 변경되게 끔 수정 (하드코딩 수정)
		var helpTooltip_title = "전개도는 전국사업체조사를 통해 현장조사 지원에 필요한 \n건물을 대상으로 평면도를 제공하고 있으며," +
				"\n일부 층은 작성에 필요한 정보가 부족하여\n전개도 서비스가 제공되지 않을 수 있음을 양해바랍니다." +
				"\n(자료기준일 : "+companyDataYear+".12.31.)";
		$(".floor-Info").children("#help_tooltip").attr('title', helpTooltip_title);
		//mng_e 20210504 이진호
		
	});
	
	$.mapViewChange = function(w) {
		$indoorMapView.ui.isMapCreated = false;
		$indoorMapView.ui.isGeoJsonCreated = undefined;
		sop.DomUtil.get('map')._sop = false;

		// UI 초기화
		$indoorMapView.ui.initialize(w); 
		
		// Map 생성
		$indoorMapView.ui.createMap('map'); 
		
		// building info request
		$indoorMapView.request.getBuildingindoorMapView($indoorMapView.ui.buildInfo.sufid);
	};
	
	$indoorMapView.ui = {
			floor	: "",//addClass(on)된 층 찾기 2019-04-02 박길섭
			sMap 			: null, // map.js의 map객체
			_figureType		: { "dev" : "01", "front" : "10", "hybrid" : "11", "none" : "0" }, // AB : 앞자리(정면도 0 or 1), 뒷자리(평면도 0 or 1)

			buildInfo		: {
				totalInfo : {},
				sufid			: '',
				buildName		: '',
				mainFloor		: 0,
				lowestFlr		: 0,
				highestFlr		: 0,
				devFigureType	: 0,
				defaultImg		: '',
				selectImg		: '',
				bdAdmAddr : '',
				arFloorAll		: new Array(),  /*floorsInfoList*/
				arThemeAll		: new Array()   /*pieChartList*/
			},
			curFloor		: 0,
			baseFloor : 0,
			
			floorInfo		: {
				arCompany 	: new Array(),	/*flrThemeList*/
				arTheme		: new Array(),	/*flrCompanyList*/
				arFacility	: new Array()
			},
			
			geoJsonObj		: {
				FigureFloor		: {},
				FigureCompany	: {},
				FigureEtc		: {}
			},
			isfloorGeoJson 		: false,
			isCompanyGeoJson 	: false,
			isEtcGeoJson 		: false,

			isMapCreated 		: false,
			isMarkerCompany		: false,
			isMarkerFacility	: false,
			
			minLevel		: 12,
			maxLevel		: 17,
			baseZoomLevel	: 14,
			
			addedLayerGroup : {
				buildingLayers : {},
				markers : {}
			},
			
			initialize : function (w) {
				this.initWindow(w);
				this.sMap = new sMap.map();
			},
			
			createMap : function (target) {

				var maxBounds = sop.utmkBounds(sop.utmk([951495, 1950977]), sop.utmk([951618, 1951079]));
				
				if (!this.isMapCreated) {
					// 최초 로딩시
					this.sMap.createMap($indoorMapView, target, {
						zoom : this.baseZoomLevel,
						maxZoom : this.maxLevel,
						minZoom : this.minLevel,
						buildingLayer: false
					} )
					this.sMap.MainObj = $indoorMapView;
					this.isMapCreated = true;
					
					// 이벤트 등록
					this.sMap.addControlEvent("zoomend zoomlevelschange");
					
				}
				this.initializeMap();
			},
			
			/**
			 * 
			 * @name         : initializeMap
			 * @description  : Map 관련 info 초기화
			 * @date         : 2014. 11. 28. 
			 * @author	     : 
			 * @history 	 :
			 */
			initializeMap : function () {
				if (this.isGeoJsonCreated) {
					
					this.geoJsonObj.FigureFloor		= {};
					this.geoJsonObj.FigureCompany	= {};
					this.geoJsonObj.FigureEtc		= {};

					this.isfloorGeoJson		= false,
					this.isCompanyGeoJson	= false,
					this.isEtcGeoJson		= false,
					
					//console.log('this.sMap.gMap: ',this.sMap.gMap);
					this.sMap.geojson.onRemove(this.sMap.gMap); // sop.geojson 
					this.sMap.geojson = {}; // sop.geojson 
					this.sMap.clearDataOverlay();
					this.isGeoJsonCreated = false;
					
					this.clearAll();
				
//					console.log('initializeMap!!');
				}
			},
			
			//건물 정보 (result는 따로 조회한 값)
			setBuildingInfo : function(result) {
				if(result.floors.length==0){
					result.floors=result.floors2;
				}
				//OpenAPI에서 가져온 정보
				var openApiInfo = $indoorMapView.ui.buildInfo.totalInfo;
				
//				this.buildInfo.sufid			= result.sufid;
//				this.buildInfo.buildName		= result.bd_nm;
//				this.buildInfo.lowestFlr		= result.lowest_flr;
//				this.buildInfo.highestFlr		= result.highest_flr;
//				this.buildInfo.devFigureType	= result.dev_figure_type;
//				this.buildInfo.floorCnt			= Math.abs(result.highest_flr) + Math.abs(result.lowest_flr);
				
				this.buildInfo.sufid			= openApiInfo.sufid;
				
				//mng_s 20201202 이진호
				//사업체 전개도 보기에서 건물이름이 없는경우 건물이름 들어가는 자리에 undefined 라고 출력되는 현상 수정
				if(openApiInfo.bd_nm == null || undefined){
					console.log("this building name is null or undefined");
					this.buildInfo.buildName 	= "";
				}else{
					this.buildInfo.buildName	= openApiInfo.bd_nm;
				}
				//mng_e 20201202 이진호
				
				this.buildInfo.lowestFlr		= openApiInfo.lowest_flr;
				this.buildInfo.highestFlr		= openApiInfo.highest_flr;
				this.buildInfo.devFigureType	= openApiInfo.dev_figure_type;
				//this.buildInfo.floorCnt			= Math.abs(openApiInfo.highest_flr) + Math.abs(openApiInfo.lowest_flr); 2019-03-26 박길섭 시작
				this.buildInfo.floorCnt			= result.floors.length;// 2019-04-05 박길섭 
				this.buildInfo.bdNaddr	= openApiInfo.bd_naddr;// 2019-04-08 박길섭
				if(openApiInfo.bd_adm_addr != null){	//20190710 leekh 수정
					this.buildInfo.bdAdmAddr	= openApiInfo.bd_adm_addr.split(" ");// 2019-04-08 박길섭
					this.buildInfo.bdAdmAddr	= "("+this.buildInfo.bdAdmAddr[2]+" "+this.buildInfo.bdAdmAddr[3]+")";// 2019-04-08 박길섭
				}else{
					this.buildInfo.bdAdmAddr = "";
				}
				//this.buildInfo.defaultImg		= result.default_img;
				//this.buildInfo.selectImg		= result.select_img;
				this.buildInfo.arFloorAll		= result.floors;
				this.buildInfo.arThemeAll		= result.distribution;
				if(this.buildInfo.arFloorAll[0].flr_no == undefined){
					this.buildInfo.arFloorAll[0].flr_no = this.buildInfo.arFloorAll[0].main_flr;
				}
				//지하부터 지상까지 총 합이 10층이 넘을 경우 기본층을 맨 밑으로
				if(this.buildInfo.floorCnt > 10) {
					this.baseFloor = this.buildInfo.floorCnt - 10;	
				}
				
				/*$.each(this.buildInfo.arFloorAll, function(i){
		            if (this.main_yn.trim() == 'Y') {
		            	$indoorMapView.ui.buildInfo.mainFloor = this.flr_no;
		            	$indoorMapView.ui.curFloor = this.flr_no;
						
						//$(".planar_sectionc .planar_section01 .planar_sec01_tit").html(this.flr_no + "층 평면도");
						//$(".planar_sectionb .planar_section01 .planar_sec01_tit").html(this.flr_no + "층 업종별 사업체");
		            	var floorTitle = "";
						if(eval(this.flr_no) >= 0) {
							floorTitle = this.flr_no + "F";
						}
						else {
							floorTitle = "B" + Math.abs(this.flr_no);
						}
						$("h3.floor-number").html(floorTitle);
						
						$indoorMapView.ui.initializeMap();
						// main-floor info request
						$indoorMapView.request.getFloorindoorMapView($indoorMapView.ui.buildInfo.sufid, $indoorMapView.ui.curFloor);
					}
		        });*/
				//대표층 설정 2019-03-26 박길섭 시작
				$indoorMapView.ui.buildInfo.mainFloor = this.buildInfo.arFloorAll[0].main_flr;
            	$indoorMapView.ui.curFloor = this.buildInfo.arFloorAll[0].main_flr;
            	$indoorMapView.ui.floor	= this.buildInfo.arFloorAll[0].main_flr;
				//$(".planar_sectionc .planar_section01 .planar_sec01_tit").html(this.flr_no + "층 평면도");
				//$(".planar_sectionb .planar_section01 .planar_sec01_tit").html(this.flr_no + "층 업종별 사업체");
            	var floorTitle = "";
				if(eval(this.buildInfo.arFloorAll[0].main_flr) >= 0) {
					floorTitle = this.buildInfo.arFloorAll[0].main_flr + "F";
				}
				else {
					floorTitle = "B" + Math.abs(this.buildInfo.arFloorAll[0].main_flr);
				}
				$("h3.floor-number").html(floorTitle);
				
				$indoorMapView.ui.initializeMap();
				// main-floor info request
				$indoorMapView.request.getFloorindoorMapView($indoorMapView.ui.buildInfo.sufid, $indoorMapView.ui.curFloor);
				//대표층 설정 2019-03-26 박길섭 끝
				var floorImgHtml = $indoorMapView.formatter.getFloorImgListHtml(this.buildInfo, result.floors[result.floors.length-1].flr_no, result.floors[0].flr_no);
				var floorImgJs = $indoorMapView.formatter.getFloorImgListJs(this.buildInfo.arFloorAll, this.buildInfo.floorCnt);
				//$indoorMapView.formatter.setChartListHtml(this.buildInfo.arThemeAll);//2019-04-02 박길섭
				//2019-04-08 박길섭 시작
				if(this.buildInfo.bdNaddr==undefined||this.buildInfo.bdNaddr==""){
					var titleInfo = this.buildInfo.buildName;
				}
				else{
					var titleInfo = this.buildInfo.buildName + '<span class="title-address">' + this.buildInfo.bdNaddr +" "+ this.buildInfo.bdAdmAddr + '</span>';
				}
				//2019-04-08 박길섭 끝
				$("h2.view-title").html(titleInfo);
				$("ul.floor-list").html(floorImgHtml);
				//2019-03-26 박길섭 시작
				var main_flr_index=0;
				if(this.buildInfo.arFloorAll.length>10){//사업체를 대표층 기준 10개만 추출하기위해
					for(var i=0;i<this.buildInfo.arFloorAll.length;i++){
						if(this.buildInfo.arFloorAll[i].flr_no==this.buildInfo.arFloorAll[i].main_flr){
							main_flr_index = i;
						}
						//$(".floor-list").find('#va-title'+this.buildInfo.arFloorAll[i].flr_no).css("display","block");	
					}
					if(main_flr_index>=0&&main_flr_index<=9){
						for(var i=0;i<this.buildInfo.arFloorAll.length;i++){
							if(i<10){
								$(".floor-list").find('#va-title'+this.buildInfo.arFloorAll[i].flr_no).show();
							}
							else{
								$(".floor-list").find('#va-title'+this.buildInfo.arFloorAll[i].flr_no).hide();
							}
						}
					}
					else{
						for(var i=0;i<this.buildInfo.arFloorAll.length;i++){
							if(main_flr_index-9<=i&&i<=main_flr_index){
								$(".floor-list").find('#va-title'+this.buildInfo.arFloorAll[i].flr_no).show();
							}
							else{
								$(".floor-list").find('#va-title'+this.buildInfo.arFloorAll[i].flr_no).hide();
							}
						}
					}
				}
				//2019-03-26 박길섭 끝
				//2019-03-27 박길섭 시작
				/*for(var i=0;i<this.buildInfo.arFloorAll.length;i++){
					$('#va-title'+this.buildInfo.arFloorAll[i].flr_no).css({"background-color":"#4374D9","border":"#4374D9"});
				}
				if(this.buildInfo.arFloorAll[0]!=null||this.buildInfo.arFloorAll[0]!=undefined){
					$('#va-title'+this.buildInfo.arFloorAll[this.buildInfo.arFloorAll.length-1].flr_no).find("a").trigger("click");
				}
				else{
					$(".floor-list li:last-child").find("a").trigger("click");//2019-03-19 박길섭
				}*/
				//2019-03-27 박길섭 끝
				//$(".indoor-middleright").prepend(floorImgJs);
				
				// default floor addClass on
				//this.setCurrentFlrForAux(this.buildInfo.mainFloor);
				
				//스크롤 맨 밑으로 내리기
				//$(".floor-list").scrollTop((this.buildInfo.floorCnt * 25) - 250);
			},
			
			setFloorInfo : function(result) {
				this.floorInfo.arCompany = result.companylist;
				this.floorInfo.arTheme = result.theme_cd_list;
				this.floorInfo.arFacility = result.facilitylist;
				
				//mng_s 20201207 이진호
				//사업체 마커 생성 주석 해제
				//this.setMarkerCompany(this.floorInfo.arCompany);//사업체 마커 생성 2019-04-02 박길섭 
				this.setMarkerCompany(this.floorInfo.arCompany);//사업체 마커 생성
				//mng_e 20201207 이진호
				
				var fltThemeMain_cd = '';
				
				if(this.floorInfo.arCompany.length >0) {
					fltThemeMain_cd		= this.floorInfo.arCompany[this.floorInfo.arCompany.length-1].theme_cd;
				}

				//var floorThemeHtml = $indoorMapView.formatter.getFlrThemeListHtml(this.floorInfo.arTheme);
				var floorCompanyAllHtml = $indoorMapView.formatter.getFlrCompanyAllListHtml(this.floorInfo.arCompany ,this.floorInfo.arTheme);
				//var floorCompanyHtml = $indoorMapView.formatter.getFlrCompanyListHtml(this.floorInfo.arCompany , fltThemeMain_cd);

				//$("#planar_select01_b").html(floorThemeHtml);
				$(".infor-list-box").html(floorCompanyAllHtml);
				//$("#planar_select02_b").html(floorCompanyHtml);
				
				$indoorMapView.request.getFigureFloorindoorMapView(this.buildInfo.sufid, this.curFloor);
				
				// 정면도만
				/*if(this.buildInfo.devFigureType == this._figureType.front) {
					
//					console.log(this.buildInfo.arFloorAll);
					
					//$(".planar_sectionb .open_info_modify").find(">a").toggleClass("on");
					$(".layer_pop_planar").show();
					$(".open_info_modify").hide();
				}
				// 평면도만
				else if(this.buildInfo.devFigureType == this._figureType.dev) {
					if(this.isDevfigure(this.curFloor) == true) {
						// selected-floor vector request
						this.initializeMap();
						$indoorMapView.request.getFigureFloorindoorMapView(this.buildInfo.sufid, this.curFloor);
						$(".open_info_modify").show();
					}
				}
				// 혼합
				else if(this.buildInfo.devFigureType == this._figureType.hybrid) {
					if(this.isDevfigure(this.curFloor) == true) {
						// selected-floor vector request
						this.initializeMap();
						$indoorMapView.request.getFigureFloorindoorMapView(this.buildInfo.sufid, this.curFloor);
						$(".planar_sectionb .planar_section01 .open_info_modify").show();
					}else{
						$(".open_info_modify").hide();
						$(".layer_pop_planar").show();
					}
				}*/
				
				this.setMarkerFacility(this.floorInfo.arFacility);
				
			},
			setFigureFloor : function(features) {
				//$(".layer_pop_planar").hide();
				
				if(features.length > 0){
					this.geoJsonObj.FigureFloor = features;
					this.setGeoJson(features, 'floor', {fit: true});
				}
				
				//mng_s 20210219 이진호
				//사업체 전개도 보기에서 확대 후 해당 층수를 누르면 사업체 POI Marker 가 보이지 않는 현상 수정
				//this.baseZoomLevel = this.sMap.gMap.getZoom();
				this.baseZoomLevel =  $indoorMapView.ui.baseZoomLevel;
				//mng_e 20210219 이진호
				
//				console.log("baseZoomLevel: ", this.baseZoomLevel);
				//$indoorMapView.request.getFigureEtcindoorMapView(this.buildInfo.sufid, this.curFloor); 20181026주석
				$indoorMapView.request.getFigureCompanyindoorMapView(this.buildInfo.sufid, this.curFloor);
			},
			//사업체마커
			setMarkerCompany : function(obj) {
				var zoomLevel = this.sMap.gMap.getZoom();
				var layerGroup = sop.layerGroup().addTo(this.sMap.gMap);

				for ( var i = 0; i < obj.length; i++) {
					var x = obj[i].center_x;
					var y = obj[i].center_y;
					var theme_cd = obj[i].theme_cd;
					var corp_nm = obj[i].corp_nm;
					var iconUrl = "";
					var decilist_serial = obj[i].decilist_serial;
					
					if(theme_cd != undefined) {
						// 2020년 SGIS고도화 3차(테마코드) 시작 - 이미지 안뜸, 기존코드 주석처리 및 새로운 코드로 대체 (pse)
						//var tmp = theme_cd.toString();
						//var theme_cd_front = tmp.substring(0,1);
						var theme_cd_front = null;
						if(theme_cd.toString().length === 4 && (theme_cd.toString().substr(1) === '000')) {
							theme_cd_front = theme_cd.toString().charAt(0);
						} else {
							theme_cd_front = $themeCdCommon.findSmallThemeDetail(theme_cd).b_theme_cd;							
						}
						iconUrl = '/img/marker/circleMarker/c_'+theme_cd_front+'.png';
						// 2020년 SGIS고도화 3차(테마코드) 끝 - 이미지 안뜸, 기존코드 주석처리 및 새로운 코드로 대체 (pse)
					} else {
						iconUrl = '/img/marker/circleMarker/c_10_00_on.png';
					}
					
					var infoMsg = '<ul>';
					var theme_cd_nm = '';
					if(theme_cd == null || theme_cd == '') {
						theme_cd_nm = '기타';
					}
					else {
						for ( var j = 0; j < this.floorInfo.arTheme.length; j++) {
							if(theme_cd == this.floorInfo.arTheme[j].theme_cd){
								theme_cd_nm = this.floorInfo.arTheme[j].theme_cd_nm;
							}
							//2019-03-20 박길섭 시작
							/*else {//임시적용 : 운영에 적용하면 큰일남 20181012
								theme_cd_nm = '코드누락';
							}*/
							//2019-03-20 박길섭 끝
						}
					}
					infoMsg += '<li><span>'+ corp_nm.trim() +'</span> '+ theme_cd_nm +'</li>';
					infoMsg += '</ul>';
					
					if(zoomLevel < 16) {
						
						layerGroup.addLayer(this.addIconMarker(sop.utmk([x,y]), iconUrl, decilist_serial, infoMsg));
					}
					else {
						var html  = "<div style='width: 100px; height: 50px; z-index: 10000; background-color: rgba(255, 255, 255, 0);'>";
						html +=     "<div style='width: 100px; text-align: left; font-size: 11px; font-weight: bold;font-family:나눔고딕;'><img src='"+iconUrl+"' width='23px' height='23px'/><br/>"+corp_nm+"</div>";//2019-04-03 박길섭
						html += "</div>";
						
						layerGroup.addLayer(this.addIconCustomMarker(x, y, html, decilist_serial, infoMsg));
					}
				}

				this.removeMarkerLayer('company');
				this.addedLayerGroup.markers['company'] = layerGroup;

				isMarkerCompany = true;
			},
			//기타시설물마커
			setMarkerFacility : function(obj) {
				var layerGroup = sop.layerGroup().addTo(this.sMap.gMap);

				for ( var i = 0; i < obj.length; i++) {
					var x = obj[i].center_x;
					var y = obj[i].center_y;
					var fac_type = obj[i].fac_type;
					/*
0001	사업체전개도	출입구	
0002	사업체전개도	엘리베이터	
0003	사업체전개도	에스컬레이터	
0004	사업체전개도	계단	
0005	사업체전개도	화장실	
0006	사업체전개도	비상구	
0007	사업체전개도	주차장(주차장입구)	

					 */
					//2019-04-05 박길섭 시작
					if(fac_type=='0006'){
						fac_type='0007';
					}
					//2019-04-05 박길섭 끝
					var iconUrl = '/img/marker/facilityMarker/'+fac_type+'.png';
					layerGroup.addLayer(this.addIconMarker(sop.utmk([x,y]), iconUrl, null, null));
				}
				
				this.removeMarkerLayer('facility');
				this.addedLayerGroup.markers['facility'] = layerGroup;
				isMarkerFacility = true;
			},
			
			setFigureCompany : function(features) {
				if(features.length > 0){
					this.geoJsonObj.FigureCompany = features;
					
					var themeGeojson = new Array();
					
					//테마별 layer 분류
					var tempThemeCd = null;
					for(var j=0; j < this.geoJsonObj.FigureCompany.length; j++) {
						// loop 시작
						//2019-04-09 박길섭 시작
						//tempThemeCd = this.geoJsonObj.FigureCompany[j].properties.theme_cd_front;
						themeGeojson.push(this.geoJsonObj.FigureCompany[j]);
						this.setGeoJson(themeGeojson, 'company_theme');
						/*if( j == 0) {
							tempThemeCd = this.geoJsonObj.FigureCompany[j].properties.theme_cd_front;
						}else if(j == this.geoJsonObj.FigureCompany.length -1 ) {
							if( tempThemeCd == this.geoJsonObj.FigureCompany[j].properties.theme_cd_front) {
								themeGeojson.push(this.geoJsonObj.FigureCompany[j]);
								//this.setGeoJson(themeGeojson, 'company_theme_' + tempThemeCd);
								this.setGeoJson(themeGeojson, 'company_theme' + tempThemeCd);
							}
						}else{
							if( tempThemeCd == this.geoJsonObj.FigureCompany[j].properties.theme_cd_front) {
								themeGeojson.push(this.geoJsonObj.FigureCompany[j]);
							}else if( tempThemeCd !== this.geoJsonObj.FigureCompany[j].properties.theme_cd_front) {
								//this.setGeoJson(themeGeojson, 'company_theme_' + tempThemeCd);
								this.setGeoJson(themeGeojson, 'company_theme' + tempThemeCd);
								
								tempThemeCd = this.geoJsonObj.FigureCompany[j].properties.theme_cd_front;
								themeGeojson = [];
								themeGeojson.push(this.geoJsonObj.FigureCompany[j]);
							}
						}*/
						//2019-04-09 박길섭 끝
					}
				}
			},
			setFigureEtc : function(features) {
				if(features.length > 0){
					//this.geoJsonObj.FigureEtc = features;
					//this.setGeoJson(features, 'etc');
				}
			},

			setGeoJson : function (geoJsonObj, type, opt) {
				this.isGeoJsonCreated = true;
				
				var layerGroup = sop.layerGroup().addTo(this.sMap.gMap);

				if(this.addedLayerGroup.buildingLayers[type]) {
//					console.log('remove buildingLayers type: ', type);
					this.sMap.gMap.removeLayer(this.addedLayerGroup.buildingLayers[type]);
				}
				
				if(type == 'company_theme') {
					var theme_com = [], theme_etc = [], theme_fac = [],theme_fac2 = [], theme_null = [], theme_duct = [];//2020-01-12 수정
					//10 : 사업체, 20 : 빈공간, 31 ~ 37 : 기타시설물, 40 : 덕트공간
					for(var i = 0; i < geoJsonObj.length; i++) {
						var subType = geoJsonObj[i].properties.type;
						if(subType == '10') theme_com.push(geoJsonObj[i]);
						else if(subType == '20') theme_etc.push(geoJsonObj[i]);
						else if(subType == '30'||subType == '32'||subType == '33'||subType == '34'||subType == '35'||subType == '37') theme_fac.push(geoJsonObj[i]);//2020-01-12 수정
						else if(subType == '31'||subType == '36')theme_fac2.push(geoJsonObj[i]);
						else if(subType == '40') theme_duct.push(geoJsonObj[i]);//2020-01-12 수정
						else theme_null.push(geoJsonObj[i]);
					}
					if(theme_com.length > 0) layerGroup.addLayer(this.sMap.addPolygonGeoJson(theme_com, 'new_company_theme_10', opt));
					if(theme_etc.length > 0) layerGroup.addLayer(this.sMap.addPolygonGeoJson(theme_etc, 'new_company_theme_20', opt));
					if(theme_fac.length > 0) layerGroup.addLayer(this.sMap.addPolygonGeoJson(theme_fac, 'new_company_theme_30', opt));
					if(theme_fac2.length > 0) layerGroup.addLayer(this.sMap.addPolygonGeoJson(theme_fac2, 'new_company_theme_3136', opt));////////////////2020-02-12 수정
					if(theme_duct.length > 0) layerGroup.addLayer(this.sMap.addPolygonGeoJson(theme_duct, 'new_company_theme_40', opt));//2020-01-12 수정
					if(theme_null.length > 0) layerGroup.addLayer(this.sMap.addPolygonGeoJson(theme_null, 'new_company_theme_99', opt));
				}
				else {
					this.sMap.addPolygonGeoJson(geoJsonObj, type, opt);//건물경계 삭제 2019-04-09 박길섭
					//layerGroup.addLayer(this.sMap.addPolygonGeoJson(geoJsonObj, type, opt));//건물경계 삭제 2019-04-09 박길섭
				}
				//$(".sop-overlay-pane>.sop-zoom-animated>.sop-clickable").eq(0).hide();//건물경계 삭제 2019-04-09 박길섭
				this.addedLayerGroup.buildingLayers[type] = layerGroup;
				
			},
			
			addIconMarker : function (utmkPoint, iconUrl, decilist_serial, infoMsg) {
					
				busIcon = sop.icon({
					iconUrl: iconUrl,
					//shadowUrl: 'bus-shadow.png',
					iconSize:     [23, 23],
					//shadowSize:   [32, 32],
					iconAnchor:   [11, 11],
					//shadowAnchor: [5, 0],
					//popupAnchor:  [-3, -76]
				});

				return this.sMap.addMarker(utmkPoint, {icon: busIcon}, decilist_serial, infoMsg);
			},
			
			addIconCustomMarker : function (x, y, html, decilist_serial, infoMsg) {
				return this.sMap.addCustomMarker(x, y, html, decilist_serial, infoMsg);
			},
			
			clearAll : function() {
				this.clearBuildingLayer();
				this.clearMarkers();
			},

			clearBuildingLayer : function() {
				var key;
				for (key in this.addedLayerGroup.buildingLayers) {
					this.addedLayerGroup.buildingLayers[key].remove();
				}
			},

			clearMarkers : function() {
				var key;
				for (key in this.addedLayerGroup.markers) {
					this.addedLayerGroup.markers[key].remove();
				}
				isMarkerFacility = false;
			},
			
			removeMarkerLayer : function(key) {
				if(this.addedLayerGroup.markers[key]) {
					this.addedLayerGroup.markers[key].remove();
				}
			},
			
	
			/*info화면 function*/
			
			// html ui 호출 함수
			getFloor : function(floor) {
				$('#map').css('display', 'block');
				$('#noneMap').css('display', 'none');
				$indoorMapView.ui.removeMarkerLayer('company');//2019-04-09 박길섭
				$indoorMapView.request.getFloorindoorMapView(this.buildInfo.sufid,floor);
				/*$(".planar_sectionc .planar_section01 .planar_sec01_tit").html(floor + "층 평면도");
				$(".planar_sectionb .planar_section01 .planar_sec01_tit").html(floor + "층 업종별 사업체");*/
				var floorTitle = "";
				if(eval(floor) >= 0) {
					floorTitle = floor + "F";
				}
				else {
					floorTitle = "B" + Math.abs(floor);
				}
				$("h3.floor-number").html(floorTitle);
				
				//$(".layer_pop_planar").hide();
				//기능이 안 먹음 확인 필요
				//$(".planar_sectionc .open_info_modify").find(">a").toggleClass("on");
				$('ul.floor-list').find('li').each(function(i, el) {
					if(el.id == ('va-title'+floor)) {
						$(el).addClass('on');
						$indoorMapView.ui.floor=floor;//2019-04-02 박길섭
					}
					else $(el).removeClass('on');
				});
				// default floor addClass on
				//this.setCurrentFlrForAux(floor);
				//this.setPastFlrForAux(this.curFloor);
				
				this.curFloor = floor;
			},
	
			getCompanyOnTheme : function(theme) {
				var floorCompanyHtml = $indoorMapView.formatter.getFlrCompanyListHtml(this.floorInfo.arCompany, theme);
				$("#planar_select02_b").html(floorCompanyHtml);
				// 해당 폴리곤을 하이라이트
				this.selectThemeCorp(theme);
			},
			
			//층 클릭 시
			getOnlyCompanyList : function(floor) {
				this.curFloor = floor;
				/*
				$(".planar_sectionb .open_info_modify").find(">a").toggleClass("on");
				//$(".layer_pop_planar").show();
				console.log("getOnlyCompanyList css('display'): ", $(".layer_pop_planar").css('display'));
				if($(".layer_pop_planar").css('display') == 'none') {
					$(".layer_pop_planar").show();
				}

				$indoorMapView.request.getFloorindoorMapView(this.buildInfo.sufid,floor);
				*/
			},
			
			isDevfigure : function(floor) {
				var rtn = false;
				if(this.buildInfo.arFloorAll !== null){
					$.each(this.buildInfo.arFloorAll, function(i){
						if (this.flr_no == Number(floor)) {
							//혼합층인 경우 정면도층(N1), 평면도층(N0), 메인층(Y) 분기
							if (this.main_yn.trim() != 'N1') {
								console.log("***********평면도 층*******************");
								rtn = true;
							}else{
								console.log("***********정면도 층*******************");
							}
						}
			        });
				}
				return rtn;
			},
			
			setZoom : function(i) {
				var curZoom = this.sMap.gMap.getZoom();
				if((Number(curZoom + i) <= Number(this.maxLevel)) && (Number(curZoom + i) >= Number(this.minLevel)))
					this.sMap.gMap.setZoom(curZoom + i);
				/*
				if(Number(curZoom) == Number(this.maxLevel)){
					this.sMap.gMap.setZoom(Number(this.minLevel));
				}else{
					this.sMap.gMap.setZoom(curZoom + 1);
				}
				*/
			},
			//2019-04-04 박길섭 시작
			changeZoom : function() {
				setTimeout(function(){
					var curZoom = Number($indoorMapView.ui.sMap.gMap.getZoom());
					var baseZoom = $indoorMapView.ui.baseZoomLevel;
					if(curZoom == Number($indoorMapView.ui.maxLevel)){
						$(".planar_sectionc .planar_section01 .planar_sec01box").html('<a href="#"><img src="/img/idm/btn_glass.gif" alt="" /> 축소</a>');
					}else{
						$(".planar_sectionc .planar_section01 .planar_sec01box").html('<a href="#"><img src="/img/idm/btn_glass.gif" alt="" /> 확대</a>');
					}
					
					//mng_s 20201207 이진호
					//if문 조건 수정
					//if(curZoom <= baseZoom || baseZoom == 0) {
					if(curZoom < baseZoom || baseZoom == 0) {
						$indoorMapView.ui.removeMarkerLayer('company');
						if(curZoom==baseZoom&&$(".infor-list-box>ul>li>a>span").hasClass("on")){
							$indoorMapView.ui.setMarkerCompany($indoorMapView.ui.floorInfo.arCompany);
						}
					} else {
						if($indoorMapView.ui.isMarkerCompany == false) {
							$indoorMapView.ui.setMarkerCompany($indoorMapView.ui.floorInfo.arCompany);
						}
					}},200);
					//mng_e 20201207 이진호
				
				
			},//2019-04-04 박길섭 끝
			goMainFloor : function() {
				if(this.curFloor !== this.buildInfo.mainFloor) {
					this.getFloor(this.buildInfo.mainFloor);
				}
				//2019-04-05 박길섭 시작
				//대표층이 10개단위로 끊겼을때 숨김이 발생할시 보이도록 오류처리
				var main_flr_index=0;
				if(this.buildInfo.arFloorAll.length>10&&$(".floor-list").find('#va-title'+this.buildInfo.mainFloor).css('display')=='none'){
					for(var i=0;i<this.buildInfo.arFloorAll.length;i++){
						if(this.buildInfo.arFloorAll[i].flr_no==this.buildInfo.arFloorAll[i].main_flr){
							main_flr_index = i;
						}
					}
					if(main_flr_index>=0&&main_flr_index<=9){
						for(var i=0;i<this.buildInfo.arFloorAll.length;i++){
							if(i<10){
								$(".floor-list").find('#va-title'+this.buildInfo.arFloorAll[i].flr_no).show();
							}
							else{
								$(".floor-list").find('#va-title'+this.buildInfo.arFloorAll[i].flr_no).hide();
							}
						}
					}
					else{
						for(var i=0;i<this.buildInfo.arFloorAll.length;i++){
							if(main_flr_index-9<=i&&i<=main_flr_index){
								$(".floor-list").find('#va-title'+this.buildInfo.arFloorAll[i].flr_no).show();
							}
							else{
								$(".floor-list").find('#va-title'+this.buildInfo.arFloorAll[i].flr_no).hide();
							}
						}
					}
				}
				//2019-04-05 박길섭 끝
			}, 
			
			setCurrentFlrForAux : function(flr) {
				// default floor addClass on
				var aux_id = 'va-slice-';
				var aux_class = 'va-slice va-slice-';
				
				if(flr > 0) {
					aux_id += 'F' + Math.abs(flr).toString();
					aux_class += 'F' + Math.abs(flr).toString() + ' on';
				}else{
					aux_id += 'B' + Math.abs(flr).toString();
					aux_class += 'B' + Math.abs(flr).toString() + ' on';
				}
			
				if(document.getElementById(aux_id)) { document.getElementById(aux_id).className = aux_class; }
				
			},
			
			setPastFlrForAux : function(flr) {
				// default floor addClass on
				var aux_id = 'va-slice-';
				var aux_class = 'va-slice va-slice-';
				
				if(flr > 0) {
					aux_id += 'F' + Math.abs(flr).toString();
					aux_class += 'F' + Math.abs(flr).toString();
				}else{
					aux_id += 'B' + Math.abs(flr).toString();
					aux_class += 'B' + Math.abs(flr).toString();
				}
				
				if(document.getElementById(aux_id)) { document.getElementById(aux_id).className = aux_class; }

			},
			
			removeSelectedPolygon : function() {
				
			},
			
			selectThemeCorp : function(theme_cd) {
				var corpGeojson = new Array();
				
				for(var i = 0; i < this.floorInfo.arCompany.length; i++) {
					if(theme_cd == undefined){
						if(this.floorInfo.arCompany[i].theme_cd == undefined){
							
							for(var j=0; j < this.geoJsonObj.FigureCompany.length; j++) {
								if( this.floorInfo.arCompany[i].decilist_serial == this.geoJsonObj.FigureCompany[j].properties.decilist_serial) {
									corpGeojson.push(this.geoJsonObj.FigureCompany[j]);
								}
							}
						}
					}else if(theme_cd.toString() == this.floorInfo.arCompany[i].theme_cd) {
						for(var j=0; j < this.geoJsonObj.FigureCompany.length; j++) {
							if( this.floorInfo.arCompany[i].decilist_serial == this.geoJsonObj.FigureCompany[j].properties.decilist_serial) {
								corpGeojson.push(this.geoJsonObj.FigureCompany[j]);
							}
						}
					}
				}
				this.setGeoJson(corpGeojson, 'selectCompany');
				this.sMap.gMap.fitBounds(this.sMap.geojson.getBounds());
			},
			
			//평면도 사업체 선택
			selectCorp : function(corp_sn) {
				this.setMarkerCompany($indoorMapView.ui.floorInfo.arCompany);//2019-04-05 박길섭
				/*var corpGeojson = new Array();
				for(var i = 0; i < this.floorInfo.arCompany.length; i++) {
					if(Number(corp_sn) == Number(this.floorInfo.arCompany[i].decilist_serial)) {
						for(var j=0; j < this.geoJsonObj.FigureCompany.length; j++) {
							if( this.floorInfo.arCompany[i].decilist_serial == this.geoJsonObj.FigureCompany[j].properties.decilist_serial) {
								corpGeojson.push(this.geoJsonObj.FigureCompany[j]);
							}
						}
					}
				}
				var tmpGeojson = this.setGeoJson(corpGeojson, 'selectCompany',{fit: true});*/

				$('.infor-list-box').find('span').each(function() {
					$(this).removeClass('on');
				});
				$('span#span_'+corp_sn).addClass('on');
				
				var x = 0, y = 0;
				for(var i = 0; i < this.floorInfo.arCompany.length; i++) {
					if(Number(corp_sn) == Number(this.floorInfo.arCompany[i].decilist_serial)) {
						x = this.floorInfo.arCompany[i].center_x;
						y = this.floorInfo.arCompany[i].center_y;
					}
				}
				this.sMap.gMap.setView(sop.utmk(x, y), 16);
			},
			
			getCompanyInfo : function(corp_sn) {
				var retVal = {};
				for(var i = 0; i < this.floorInfo.arCompany.length; i++) {
					if(Number(corp_sn) == Number(this.floorInfo.arCompany[i].decilist_serial)) {
						var theme_cd_nm = this.getThemeInfo(this.floorInfo.arCompany[i].theme_cd);
						retVal = {decilist_serial: this.floorInfo.arCompany[i].decilist_serial
								, corp_nm: this.floorInfo.arCompany[i].corp_nm
//								, tel_no: this.floorInfo.arCompany[i].tel_no
								, theme_cd_nm: theme_cd_nm
						}
					}
				}
				return retVal;
			},
			
			getThemeInfo : function(theme_cd) {
				var retVal = '';
				for(var i = 0; i < this.floorInfo.arTheme.length; i++) {
					if(Number(theme_cd) == Number(this.floorInfo.arTheme[i].theme_cd)) {
						retVal = this.floorInfo.arTheme[i].theme_cd_nm;
					}
				}
				return retVal;
			},
			
			/**
			 * 
			 * @name         : createInfoTooltip
			 * @description  : 경계레이어 선택 시, 툴팁을 생성하여 정보를 표출한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 선택된 경계레이어
			 * @param data   : 선택된 경계레이어의 데이터정보
			 */
			createInfoTooltip : function(event, data, type, map) {
				var html = "";
				if (type.substring(0,13) == "company_theme" || type == "selectCompany") {
					if (data && data.properties) {
						if (data.properties.decilist_serial) {
							var companyInfo = this.getCompanyInfo(data.properties.decilist_serial);
							if(companyInfo.corp_nm != undefined) {
								html += "<table width=150px height=40px style='margin:10px; background:#FFFFFF'>"
									 +  "<tr ><td class='admName'>" + companyInfo.corp_nm  + "</td></tr>";	
							}
						}
						else {
							var html = "<div style='padding: 3px;'>해당 사업체의 정보가 없습니다.</div>";
						}
					}
				}else if (type == "etc") {
					// fac_type : X(공실), S(계단), E(엘리베이터), T(화장실)
					if (data && data.properties) {
						if (data.properties.fac_type) {
							if (data.properties.fac_type.trim() != "X") {
								html += "<table width=150px height=40px style='margin:10px; background:#FFFFFF'>";

//								if (data.properties.fac_type.trim() == "X") {
//									html += "<tr ><td class='admName'>공실</td></tr>";
//								}
								if (data.properties.fac_type.trim() == "S") {
									html += "<tr ><td class='admName'>계단</td></tr>";
								}
								if (data.properties.fac_type.trim() == "E") {
									html += "<tr ><td class='admName'>엘리베이터</td></tr>";
								}
								if (data.properties.fac_type.trim() == "T") {
									html += "<tr ><td class='admName'>화장실</td></tr>";
								}
								if (data.properties.fac_type.trim() == "D") {
									html += "<tr ><td class='admName'>출입구</td></tr>";
								}
								if (data.properties.fac_type.trim() == "M") {
									html += "<tr ><td class='admName'>무빙워크</td></tr>";
								}
							}
						}
					}
				}else{
					var html = "<div style='padding: 3px;'>해당 위치의 정보가 없습니다.</div>";
				}
				html += "</table>";

				event.target.bindToolTip(html, {
					pane : 'infowindowPane',
					direction : 'right',
					noHide : true,
					opacity : 0.8
				}).addTo(this.sMap.gMap)._showToolTip(event);
				
				$(".admName")
				.css("font-size", "15px")
				.css("font-weight", "bold")
				.css("color", "#3792de")
				.css("background", "#FFFFFF");
				$(".statsData")
				.css("font-size", "12px")
				.css("padding-left", "5px")
				.css("background", "#FFFFFF");
			},
			
			initWindow : function(w) {
				$("#content #floor-map-area #map").css("width","100%");//2019-03-15 박길섭
				$("#content #floor-map-area #map").css("height","100%");//2019-03-15 박길섭
				$("#content #floor-map-area #map").css("position","absolute");//2019-03-15 박길섭
			}
	
	};
	
	$indoorMapView.callbackFunc = {

			// 맵이동 시작시, 콜백 호출
			didMapMoveStart : function(event, map) {
			},

			// 맵이동 종료시, 콜백 호출
			didMapMoveEnd : function(event, map) {
			},

			// 맵 줌시작 시, 콜백 호출
			didMapZoomStart : function(event, map) {
				//console.log('didMapZoomStart');
			},

			// 맵 줌 종료 시, 콜백 호출
			didMapZoomEnd : function(event, map) {
				$indoorMapView.ui.changeZoom();
			},

			/**
			 * 
			 * @name         : didMouseOverPolygon
			 * @description  : 해당경계 mouse over 시, 발생하는 콜백함수
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 층경계(floor), 사업체경계(company), 기타시설물(etc)
			 */
			didMouseOverPolygon : function(event, data, type, map) {	
				if (type == "floor") {
				}else {
					$indoorMapView.ui.createInfoTooltip(event, data, type, map);
				}
			}
	};
	
	$indoorMapView.event = {
			/**
			 * 
			 * @name         : highPlus
			 * @description  : 층목록 위로
			 * @date         : 2018. 10. 30.
			 * @author	     : KSY
			 * @history 	 :
			 * @param
			 */	
			highPlus : function() {
				//2019-04-02 박길섭 시작
				/*var totalCnt = $indoorMapView.ui.buildInfo.floorCnt;
				var styleDisplay = $('ul.floor-list').find('li')[0].style.display;
				if(styleDisplay == 'block') {
					//alert('최상층입니다.');
				}
				else {
					var vMax = 0, vMin = totalCnt, chk = true;
					$('ul.floor-list').find('li').each(function(i) {
						if($(this).context.style.display == 'block') {
							vMin = i;
							if(chk) vMax = i;
							chk = false;
						}
					});
					$('ul.floor-list').find('li')[vMax-1].style.display = 'block';
					$('ul.floor-list').find('li')[vMin].style.display = 'none';
				}*/
				//사업체가 있는 층만 보여지기 때문에 인덱스 단위로 설정
				var floor = $indoorMapView.ui.floor;//현재 보여지고 있는 층
				var presentIndex = $(".floor-list").find('#va-title'+floor).index();
				var maxFlr = $('ul.floor-list').find('li').eq(0).attr('id').slice(8);
				var nextIndex = presentIndex-1;
				var hideIndex = presentIndex+9;
				var nextFlr = 0;
				if(floor==maxFlr){
					//alert('최상층입니다.');
				}
				else{
					nextFlr = $('ul.floor-list').find('li').eq(nextIndex).attr('id').slice(8);
					if($(".floor-list").find('.va-title').eq(nextIndex).css('display')=='none'){
						$indoorMapView.ui.getFloor(nextFlr);
						$(".floor-list").find('.va-title').eq(nextIndex).show();
						$(".floor-list").find('.va-title').eq(hideIndex).hide();
					}
					else{
						$indoorMapView.ui.getFloor(nextFlr);
					}
					//$(".floor-list").find('#va-title'+).show();
				}
				//2019-04-02 박길섭 끝
			},
			/**
			 * 
			 * @name         : lowPlus
			 * @description  : 층목록 아래로
			 * @date         : 2018. 10. 30.
			 * @author	     : KSY
			 * @history 	 :
			 * @param
			 */	
			lowPlus : function() {
				//2019-04-02 박길섭 시작
				/*var totalCnt = $indoorMapView.ui.buildInfo.floorCnt;
				var styleDisplay = $('ul.floor-list').find('li')[totalCnt-1].style.display;
				if(styleDisplay == 'block') {
					//alert('최하층입니다.');
				}
				else {
					var vMax = 0, vMin = totalCnt, chk = true;
					$('ul.floor-list').find('li').each(function(i) {
						if($(this).context.style.display == 'block') {
							vMin = i;
							if(chk) vMax = i;
							chk = false;
						}
					});
					$('ul.floor-list').find('li')[vMin+1].style.display = 'block';
					$('ul.floor-list').find('li')[vMax].style.display = 'none';
				}*/
				//사업체가 있는 층만 보여지기 때문에 인덱스 단위로 설정
				var floor = $indoorMapView.ui.floor;//현재 보여지고 있는 층
				var presentIndex = $(".floor-list").find('#va-title'+floor).index();
				var minFlr = $('ul.floor-list').find('li').eq($('ul.floor-list>li').length-1).attr('id').slice(8);
				var nextIndex = presentIndex+1;
				var hideIndex = presentIndex-9;
				var nextFlr = 0;
				if(floor==minFlr){
					//alert('최상층입니다.');
				}
				else{
					nextFlr = $('ul.floor-list').find('li').eq(nextIndex).attr('id').slice(8);
					if($(".floor-list").find('.va-title').eq(nextIndex).css('display')=='none'){
						$indoorMapView.ui.getFloor(nextFlr);
						$(".floor-list").find('.va-title').eq(nextIndex).show();
						$(".floor-list").find('.va-title').eq(hideIndex).hide();
					}
					else{
						$indoorMapView.ui.getFloor(nextFlr);
					}
					//$(".floor-list").find('#va-title'+).show();
				}
					
				//2019-04-02 박길섭 끝
			},
			/**
			 * 
			 * @name         : noneMap
			 * @description  : 층정보 없는 페이지
			 * @date         : 2018. 10. 30.
			 * @author	     : KSY
			 * @history 	 :
			 * @param
			 */	
			noneMap : function(floor) {
				$('#map').css('display', 'none');
				$('#noneMap').css('display', 'block');
				$('div.infor-list-box').empty();
				
				var floorTitle = "";
				if(eval(floor) >= 0) {
					floorTitle = floor + "F";
				}
				else {
					floorTitle = "B" + Math.abs(floor);
				}
				$("h3.floor-number").html(floorTitle);
				
				$('ul.floor-list').find('li').each(function(i, el) {
					if(el.id == ('va-title'+floor)) {
						$(el).addClass('on');
					}
					else $(el).removeClass('on');
				});
				// default floor addClass on
				//this.setCurrentFlrForAux(floor);
				//this.setPastFlrForAux(this.curFloor);
				
				$indoorMapView.ui.curFloor = floor;
			},
			/**
			 * 
			 * @name         : clickMaker
			 * @description  : 마커 click 시, 발생하는 콜백함수
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			clickMaker : function(serial) {
				$('.infor-list-box').find('span').each(function() {
					$(this).removeClass('on');
				});
				$('span#span_'+serial).addClass('on');
			}
		};
			
	
	
	$indoorMapView.request = {
			
		SvcAPI_7001_URL : "/ServiceAPI/figure/building.json",
		//SvcAPI_7002_URL : "/ServiceAPI/figure/floor.json",
		//SvcAPI_7003_URL : "/ServiceAPI/figure/floorfigure.geojson",
		//SvcAPI_7004_URL : "/ServiceAPI/figure/figurefloor.geojson",
//		SvcAPI_7005_URL : "/ServiceAPI/figure/figurecompany.geojson",
		//SvcAPI_7006_URL : "/ServiceAPI/figure/figureetc.geojson",
		
		//개별건물속성 호출 (OpenAPI)
		getBuildingindoorMapView : function (sufid) {
			var sopPortalBuildingIndoorObj = new sop.portali.buildingIndoor.api();
			sopPortalBuildingIndoorObj.addParam("accessToken", accessToken);
			sopPortalBuildingIndoorObj.addParam("sufid", sufid);
			sopPortalBuildingIndoorObj.request({
				method : "GET",
				async : true,
				url : openApiPath + "/OpenAPI3/figure/buildingattribute.json",
				options : {
		        	btntype : "indoor",
		        	api_id : "API_0802",
		        	params : {
		        		sufid : sufid
		        	},
		        	map : $indoorMapView.ui.sMap
		        }
			});
		},
		
		//건물 업종분포도, 입체도 호출
		getBuildingInfoView : function (res, sufid) {
			var requestParam = {
				sufid : sufid,
				base_year : $indoorMapView.ui.sMap.bnd_year
			};
			$indoorMapView.ui.buildInfo.totalInfo = res;		//기본값 저장
			$.ajax({
				url: this.SvcAPI_7001_URL,
				data: requestParam,
				type: 'POST',
				dataType: 'json',
				success: $indoorMapView.response.successBuildingindoorMapView,
				error:function(e){ 
					console.log("e");
				}
			});
		},
		
		//개별 건물의 층 별 사업체 정보 호출 (OpenAPI)
		getFloorindoorMapView : function (sufid, flr_no) {
			var sopPortalFloorIndoorObj = new sop.portali.floorIndoor.api();
			sopPortalFloorIndoorObj.addParam("accessToken", accessToken);
			sopPortalFloorIndoorObj.addParam("sufid", sufid);
			sopPortalFloorIndoorObj.addParam("flr_no", flr_no);
			sopPortalFloorIndoorObj.request({
				method : "GET",
				async : true,
				url : openApiPath + "/OpenAPI3/figure/floorcompanyinfo.json",
				options : {
		        	btntype : "indoor",
		        	api_id : "API_0806",
		        	params : {
		        		sufid : sufid,
						flr_no	: flr_no
		        	},
		        	map : $indoorMapView.ui.sMap
		        }
			});
		},
		
		//개별 건물의 층별 외각 공간정보 (OpenAPI)
		getFigureFloorindoorMapView : function (sufid, flr_no) {
			var sopPortalFloorBoundaryObj = new sop.portali.floorBoundary.api();
			sopPortalFloorBoundaryObj.addParam("accessToken", accessToken);
			sopPortalFloorBoundaryObj.addParam("sufid", sufid);
			sopPortalFloorBoundaryObj.addParam("flr_no", flr_no);
			sopPortalFloorBoundaryObj.request({
				method : "GET",
				async : true,
				url : openApiPath + "/OpenAPI3/figure/floorboundary.geojson",
				options : {
		        	btntype : "indoor",
		        	api_id : "API_0803",
		        	params : {
		        		sufid : sufid,
						flr_no	: flr_no
		        	},
		        	map : $indoorMapView.ui.sMap
		        }
			});
		},
		
		//개별 건물의 층별 사업체 공간정보 (OpenAPI)
		getFigureCompanyindoorMapView : function (sufid, flr_no) {
			var sopPortalFloorCompanyObj = new sop.portali.floorCompany.api();
			sopPortalFloorCompanyObj.addParam("accessToken", accessToken);
			sopPortalFloorCompanyObj.addParam("sufid", sufid);
			sopPortalFloorCompanyObj.addParam("flr_no", flr_no);
			sopPortalFloorCompanyObj.request({
				method : "GET",
				async : true,
				url : openApiPath + "/OpenAPI3/figure/floorcompany.geojson",
				options : {
		        	btntype : "indoor",
		        	api_id : "API_0804",
		        	params : {
		        		sufid : sufid,
						flr_no	: flr_no
		        	},
		        	map : $indoorMapView.ui.sMap
		        }
			});
		},
		
		//개별 건물의 층별 기타시설물 공간정보 (OpenAPI)
		getFigureEtcindoorMapView : function (sufid, flr_no) {
			var sopPortalFloorEtcFacilityObj = new sop.portali.floorEtcFacility.api();
			sopPortalFloorEtcFacilityObj.addParam("accessToken", accessToken);
			sopPortalFloorEtcFacilityObj.addParam("sufid", sufid);
			sopPortalFloorEtcFacilityObj.addParam("flr_no", flr_no);
			sopPortalFloorEtcFacilityObj.request({
				method : "GET",
				async : false,
				url : openApiPath + "/OpenAPI3/figure/flooretcfacility.geojson",
				options : {
		        	btntype : "indoor",
		        	api_id : "API_0805",
		        	params : {
		        		sufid : sufid,
						flr_no	: flr_no
		        	},
		        	map : $indoorMapView.ui.sMap
		        }
			});
		}
	};
	
	$indoorMapView.response = {
		successBuildingindoorMapView : function (res) {
			if (res.errCd == 0) {
				console.log('<<< response BuildingindoorMapView', res);
				$indoorMapView.ui.setBuildingInfo(res.result);
			}
			else{
				alert( res.errMsg + '(error code:'+ res.errCd +', trId:' + res.trId + ')' );
			}
		},
		successFloorindoorMapView : function (res) {
			if (res.errCd == 0) {
				console.log('<<< response FloorindoorMapView', res);
				$indoorMapView.ui.setFloorInfo(res.result);
			}
			else{
				alert( res.errMsg + '(error code:'+ res.errCd +', trId:' + res.trId + ')' );
			}
		},
		successFigureFloorindoorMapView : function (res) {
			if (res.errCd == 0) {
				console.log('<<< response FigureFloorindoorMapView', res);
				$indoorMapView.ui.setFigureFloor(res.features);
			}
			else{
				console.log('<<< response FigureFloorindoorMapView: ', 'errCd('+ res.errCd +'), trId(' + res.trId + ')' );
			}
		},
		successFigureCompanyindoorMapView : function (res) {
			if (res.errCd == 0) {
				console.log('<<< response FigureCompanyindoorMapView', res);
				$indoorMapView.ui.setFigureCompany(res.features);
			}
			else{
				console.log('<<< response FigureCompanyindoorMapView: ', 'errCd('+ res.errCd +'), trId(' + res.trId + ')' );
			}
		},
		successFigureEtcindoorMapView : function (res) {
			if (res.errCd == 0) {
				console.log('<<< response FigureEtcindoorMapView', res);
				$indoorMapView.ui.setFigureEtc(res.features);
			}
			else{
				console.log('<<< response FigureEtcindoorMapView: ', 'errCd('+ res.errCd +'), trId(' + res.trId + ')' );
			}
		}
	};

	$indoorMapView.formatter = {
		/**
		 * 
		 * @name         			: getFloorImgListHtml
		 * @description  			: building info API (7002) 성공시 콜백, 
		 * 				   				건물전체 입체도 html 생성
		 * @history 	 			:
		 * @param flooorInfoListObj	: 전개도 있는 층정보 List
		 * @param lowest_flr   		: 최저층
		 * @param highest_flr   	: 최고층
		 */
		getFloorImgListHtml : function (pBuildInfo, lowest_flr, highest_flr) {
			var obj = pBuildInfo.arFloorAll;//평면도 존재 층
			var flooorInfoListObjHtml = '';
			
			var lowView = 0;
			var highView = 0;
			if(pBuildInfo.floorCnt > 10) {
				if(Math.abs(eval(lowest_flr) - eval(pBuildInfo.mainFloor)) > 5)
					lowView = eval(pBuildInfo.mainFloor) - 5;
				else lowView = eval(lowest_flr);
				
				if(Math.abs(eval(highest_flr) - eval(pBuildInfo.mainFloor)) > 5)
					highView = eval(pBuildInfo.mainFloor) + 5;
				else highView = eval(highest_flr);
				
				if((Math.abs(lowView) + Math.abs(highView)) < 10) {
					if(eval(highView) == eval(highest_flr))
						lowView = lowView - (10 - (Math.abs(lowView) + Math.abs(highView)));
					if(eval(lowView) == eval(lowest_flr))
						highView = highView + (10 - (Math.abs(lowView) + Math.abs(highView)));
				}
			}
			
			
			var tot_floor = 0;
			//var displayVal = '';
			//2019-04-05 박길섭 시작
			for ( var n = eval(highest_flr); n >= eval(lowest_flr); n--) {
				//전개도가  지하 만 있을 경우 
				if(lowest_flr < 0 && n == lowest_flr && pBuildInfo.arFloorAll.length == 1){
					//flooorInfoListObjHtml += '<li class="va-title on" id="va-title'+lowest_flr+'" style="display: block;">';
					flooorInfoListObjHtml += '<li class="va-title on" id="va-title'+lowest_flr+'">';
					flooorInfoListObjHtml += '<a href="javascript:void(0);" onclick="$indoorMapView.ui.getFloor('+lowest_flr+');">B'+Math.abs(n)+'</a>';
					flooorInfoListObjHtml += '</li>';
				}
				var bSearch = '0';
				//지하층인 경우
				if(n <= 0){
					var onClass = "";
					if(pBuildInfo.mainFloor == (n-1)) onClass = "on";
					
					/*if(pBuildInfo.floorCnt > 10 && lowView > (n-1)) displayVal = 'none';
					else displayVal = 'block';*/
					for ( var m = 0; m < obj.length; m++) {
						if(highest_flr<0 && pBuildInfo.arFloorAll.length > 1){//모두 지하층만 나오는경우
							bSearch = '1';
							if(pBuildInfo.mainFloor == (n)) onClass = "on";
							//flooorInfoListObjHtml += '<li class="va-title ' + onClass + '" id="va-title' + (n) + '" style="display: ' + displayVal + ';">';
							flooorInfoListObjHtml += '<li class="va-title ' + onClass + '" id="va-title' + (n)+'">';
							flooorInfoListObjHtml += '<a href="javascript:void(0);" onclick="$indoorMapView.ui.getFloor('+ (n) +');">B'+ Math.abs(n) +'</a>';
							flooorInfoListObjHtml += '</li>';
						}
						else{
							if ((n-1) == obj[m].flr_no){
								bSearch = '1';
								//flooorInfoListObjHtml += '<li class="va-title ' + onClass + '" id="va-title' + (n-1) + '" style="display: ' + displayVal + ';">';
								flooorInfoListObjHtml += '<li class="va-title ' + onClass + '" id="va-title' + (n-1) +'">';
								flooorInfoListObjHtml += '<a href="javascript:void(0);" onclick="$indoorMapView.ui.getFloor('+ (n-1) +');">B'+ Math.abs(n-1) +'</a>';
								flooorInfoListObjHtml += '</li>';
							}
						}
						
					}
					//사업체 없는곳 전개도 안나오게
					/*if(bSearch == '0'){
						flooorInfoListObjHtml += '<li class="va-title va-none ' + onClass + '" id="va-title' + (n-1) + '" style="display: ' + displayVal + ';">';
						flooorInfoListObjHtml += '<a href="javascript:void(0);" onclick="$indoorMapView.event.noneMap('+ (n-1) +');">B'+ Math.abs(n-1) +'</a>';
						flooorInfoListObjHtml += '</li>';
					}*/
					tot_floor++;
				}
				//지상층인 경우
				else if(n > 0){
					var onClass = "";
					if(pBuildInfo.mainFloor == n) onClass = "on";
					
					/*if(pBuildInfo.floorCnt > 10 && highView < n) displayVal = 'none';
					else displayVal = 'block';*/
					
					for ( var p = 0; p < obj.length; p++) {
						if (n == obj[p].flr_no){
							bSearch = '1';
							//flooorInfoListObjHtml += '<li class="va-title ' + onClass + '" id="va-title' + n + '" style="display: ' + displayVal + ';">';
							flooorInfoListObjHtml += '<li class="va-title ' + onClass + '" id="va-title' + n + '";">';
							flooorInfoListObjHtml += '<a href="javascript:void(0);" onclick="$indoorMapView.ui.getFloor('+ n +');">'+ n +'F</a>';
							flooorInfoListObjHtml += '</li>';
						}
					}
					//사업체 없는곳 전개도 안나오게 2019-04-05 박길섭 시작
					/*if(bSearch == '0'){
						flooorInfoListObjHtml += '<li class="va-title va-none ' + onClass + '" id="va-title' + n + '" style="display: ' + displayVal + ';">';
						flooorInfoListObjHtml += '<a href="javascript:void(0);" onclick="$indoorMapView.event.noneMap('+ n +');">'+ n +'F</a>';
						flooorInfoListObjHtml += '</li>';
					}*/
					//2019-04-05 박길섭 끝
					tot_floor++;
				}
			}
			
			return flooorInfoListObjHtml;
		},
		//2019-04-05 박길섭 끝
		getFloorImgListJs : function (obj, total_flr_Num) {
			var flooorInfoListObjHtml = '';
			var visibleSlices = (total_flr_Num > 10) ? 10 : 10/*total_flr_Num*/ ;
//			var expandedHeight = (total_flr_Num > 10) ? total_flr_Num : 10 ;
			var expandedHeight = 28;
			flooorInfoListObjHtml += '<script type="text/javascript">';
			flooorInfoListObjHtml += '$(function() {';
			flooorInfoListObjHtml += '	$("#va-accordion").vaccordion({';
			flooorInfoListObjHtml += '		visibleSlices	: 10,';
			flooorInfoListObjHtml += '		expandedHeight	: '+ expandedHeight +',';
			flooorInfoListObjHtml += '		animOpacity		: 1,';
			flooorInfoListObjHtml += '		contentAnimSpeed: 1,';
			flooorInfoListObjHtml += '		baseFloor: ' + $indoorMapView.ui.baseFloor;
			flooorInfoListObjHtml += '	});';
			flooorInfoListObjHtml += '});';
			flooorInfoListObjHtml += '</script>';

			return flooorInfoListObjHtml;
		},
		setChartListHtml : function (BuildChartListObj) {
			/*var results = [];
			
			for(var i=0; i<BuildChartListObj.length; i++){
				var array = [ BuildChartListObj[i].b_theme_cd_nm , Number(BuildChartListObj[i].corp_per) ] ;
				results.push(array);
			}
				
			// Build the chart
	        $('#container').highcharts({
	            chart: {
	                plotBackgroundColor: null,
	                plotBorderWidth: null,
	                plotShadow: false,
					margin: [10, 70, 60, 0]
	            },

				legend: {
					width: 100,
					align: 'right',
					verticalAlign: 'top',
					itemMarginBottom: 5,
					layout: 'vertical',
					x: 20,
					y: 0,
					symbolWidth: 6,
					symbolHeight: 6,
					floating: true
				},

	            title: {
	                text: ''
	            },
	            tooltip: {
	                pointFormat: '{series.data.name}:<b>{point.percentage:.1f}%</b>'
	            },
	            plotOptions: {
	                pie: {
	                    allowPointSelect: true,
	                    cursor: 'pointer',
	                    dataLabels: {
	                        enabled: false
	                    },
	                    showInLegend: true
	                }
	            },
	            series: [{
	                type: 'pie',
	                data: results
	            }]
	        });*/
		},
		
		//평면도 테마코드 목록
		getFlrThemeListHtml : function (obj) {
			var result = '<ul>';
			
			for ( var i = obj.length-1; i >= 0; i--) {
				var theme_name = '';
				if(obj[i].theme_cd_nm.length > 11){
					theme_name = obj[i].theme_cd_nm.substring(0,11)+'...';
				}else{
					theme_name = obj[i].theme_cd_nm;
				}
				result += '<li onclick="$indoorMapView.ui.getCompanyOnTheme('+ obj[i].theme_cd +');"><a href="#">'+ theme_name +'</a></li>';
			}
			result += '</ul>';
			
			return result;
		},
		
		//평면도 사업체 목록
		getFlrCompanyListHtml : function (obj, themeCd) {
			var result = '';
			if(themeCd != null && (themeCd.length != 0)) {
				result += '<dl>';
				
				for ( var i = 0; i < obj.length; i++) {
					if(Number(obj[i].theme_cd) == Number(themeCd)){
						result += '<dt onclick="$indoorMapView.ui.selectCorp(\''+ obj[i].decilist_serial +'\');"><a href="#">'+ obj[i].corp_nm.trim() +'</a></dt>';
//						result += '<dd onclick="$indoorMapView.ui.selectCorp('+ obj[i].decilist_serial +');"><a href="#">'+ obj[i].tel_no +'</a></dd>';
					}
				}
				result += '</dl>';
			}else{
				result += '<dl>';
				for ( var i = 0; i < obj.length; i++) {
					if(obj[i].theme_cd == themeCd){
						result += '<dt onclick="$indoorMapView.ui.selectCorp(\''+ obj[i].decilist_serial +'\');"><a href="#">'+ obj[i].corp_nm.trim() +'</a></dt>';
					}
				}
				result += '</dl>';
			}
			
			return result;
		},
		getFlrCompanyAllListHtml : function (companyObj, themeObj) {
			var result = '<ul>';
			
			if (companyObj.length == 0) {
				result += "<li>해당 층의 사업체 정보가 없습니다.</li>";
			}else {
				for ( var i = 0; i < companyObj.length; i++) {
					var theme_cd_nm = '';
					if(companyObj[i].theme_cd == null || companyObj[i].theme_cd == '') {
						theme_cd_nm = '기타';
					}
					else {
						for ( var j = 0; j < themeObj.length; j++) {
							if(companyObj[i].theme_cd == themeObj[j].theme_cd){
								theme_cd_nm = themeObj[j].theme_cd_nm;
							}
							else {//임시적용 : 운영에 적용하면 큰일남 20181012
								//theme_cd_nm = '코드누락';
							}
						}
					}
					///$indoorMapView.ui.selectCorp
//					result += '<li><a href="#"><span>'+ companyObj[i].corp_nm.trim() +'</span> / '+ companyObj[i].tel_no +'&nbsp;'+ theme_cd_nm +'</a></li>';
					result += '<li><a href="javascript:void(0);" onclick="$indoorMapView.ui.selectCorp(\'' + companyObj[i].decilist_serial + '\');"><span id="span_'+companyObj[i].decilist_serial+'">'+ companyObj[i].corp_nm.trim() +'</span> '+ theme_cd_nm +'</a></li>';
				}
			}
			result += '</ul>';
			
			return result;
		}
	};
	
	/** ********* 개별건물속성 Start ********* */
	$class("sop.portali.buildingIndoor.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			var result = res.result;
			console.log(options);
			if(res.errCd == "0") {
				//건물 업종분포도, 입체도 호출
				$indoorMapView.request.getBuildingInfoView(result, options.params.sufid);
				//API 로그
				options.adm_nm = result.bd_adm_addr;
				apiLogWrite("A0", options);
				
			} else if (res.errCd == "-401") {
        		accessTokenInfo(function() {
        			$indoorMapView.request.getBuildingindoorMapView(options.params.sufid);
            	});
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 개별건물속성 End ********* */
	
	/** ********* 개별 건물의 층 별 사업체 정보 호출 Start ********* */
	$class("sop.portali.floorIndoor.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			var result = res.result;
			if(res.errCd == "0") {
				$indoorMapView.response.successFloorindoorMapView(res);
				//API 로그
				options.adm_nm = $indoorMapView.ui.buildInfo.bdAdmAddr;
				apiLogWrite("A0", options);
				
			} else if (res.errCd == "-401") {
        		accessTokenInfo(function() {
        			$indoorMapView.request.getFloorindoorMapView(options.params.sufid, options.params.flr_no);
            	});
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 개별 건물의 층 별 사업체 정보 호출 End ********* */
	
	/** ********* 개별 건물의 층별 외각 공간정보 호출 Start ********* */
	$class("sop.portali.floorBoundary.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			var result = res.result;
			if(res.errCd == "0") {
				$indoorMapView.response.successFigureFloorindoorMapView(res);
				//API 로그
				options.adm_nm = $indoorMapView.ui.buildInfo.bdAdmAddr;
				apiLogWrite("A0", options);
				
			} else if (res.errCd == "-401") {
        		accessTokenInfo(function() {
        			$indoorMapView.request.getFigureFloorindoorMapView(options.params.sufid, options.params.flr_no);
            	});
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 개별 건물의 층별 외각 공간정보 호출 End ********* */
	
	/** ********* 개별 건물의 층별 사업체 공간정보 호출 Start ********* */
	$class("sop.portali.floorCompany.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			//var result = res.result;
			if(res.errCd == "0") {
				$indoorMapView.response.successFigureCompanyindoorMapView(res);
				//API 로그
				options.adm_nm = $indoorMapView.ui.buildInfo.bdAdmAddr;
				apiLogWrite("A0", options);
				
			} else if (res.errCd == "-401") {
        		accessTokenInfo(function() {
        			$indoorMapView.request.getFigureCompanyindoorMapView(options.params.sufid, options.params.flr_no);
            	});
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 개별 건물의 층별 사업체 공간정보 호출 End ********* */
	
	/** ********* 개별 건물의 층별 기타시설물 공간정보 호출 Start ********* */
	$class("sop.portali.floorEtcFacility.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			//var result = res.result;
			if(res.errCd == "0") {
				$indoorMapView.response.successFigureEtcindoorMapView(res);
				//API 로그
				options.adm_nm = $indoorMapView.ui.buildInfo.bdAdmAddr;
				apiLogWrite("A0", options);
				
			} else if (res.errCd == "-401") {
        		accessTokenInfo(function() {
        			$indoorMapView.request.getFigureEtcindoorMapView(options.sufid, options.flr_no);
            	});
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 개별 건물의 층별 기타시설물 공간정보 호출 End ********* */
	
}(window, document));