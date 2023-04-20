/**
 * 생활권역서비스 Open API에 대한 클래스
 * 
 * history : 2020/06/16 초기 작성 version : 1.0 see : 
 *
 */
(function(W, D) {
	W.$catchmentAreaMainApi = W.$catchmentAreaMainApi || {};
	
	$catchmentAreaMainApi.request = {
			
			API_202001_URL : "/ServiceAPI/OpenAPI3/catchmentArea/testStats.json",
			//API_202006_URL : "/ServiceAPI/OpenAPI3/catchmentArea/getSrvAreaGridStatDataList.json", //데이터보드 영향권 통계정보 조회
			API_202007_URL : "/ServiceAPI/OpenAPI3/catchmentArea/getGridSrvAreaGridStatDataList.json", //격자 통계정보 조회
			API_202010_URL : "/ServiceAPI/OpenAPI3/catchmentArea/getGridSrvAreaDataBoardList.json", //데이터 보드 : 격자 통계정보 조회
			API_202092_URL : "/ServiceAPI/OpenAPI3/catchmentArea/serviceAreaStatistics.json", //데이터보드 영향권 통계정보 조회
			API_202093_URL : "/ServiceAPI/OpenAPI3/catchmentArea/getCodeList.json", //공통 코드 조회
			API_202094_URL : "/ServiceAPI/OpenAPI3/catchmentArea/characteristicStatistics.json", //특성별 통계 조회
			API_202095_URL : "/ServiceAPI/OpenAPI3/catchmentArea/correlationAnalysis.json",//상관관계분석
			API_202097_URL : "/ServiceAPI/OpenAPI3/catchmentArea/gridStatistics.json", //격자통계 통합(bsca) 조회
			
			//SGIS4_생활권역 시작
			API_202081_URL : "/ServiceAPI/OpenAPI3/catchmentArea/ksicInfo.json", //한국표준산업분류 정보 조회
			API_202082_URL : "/ServiceAPI/OpenAPI3/catchmentArea/settingInfo.json", //생활권역 설정정보 조회
			
			//SGIS4_생활권역 끝
			
			// SGIS4_1025_생활권역_임의영역 시작
			API_202090_URL : "/ServiceAPI/OpenAPI3/catchmentArea/scopeInfo.json", //생활권역 임의값 범위정보조회
			// SGIS4_1025_생활권역_임의영역 끝
			
			combineFailCnt : 0,
			
			//9월 서비스
			mask : {
				show : function () {
					this.blockUI = document.createElement("DIV");
					this.blockUI.style.backgroundColor = "#D3D3D3";
					this.blockUI.style.border = "0px solid black";
					this.blockUI.style.position = "absolute";
					this.blockUI.style.left = '0px';
					this.blockUI.style.top = '0px';
					if (window.innerHeight == undefined) {
						this.blockUI.style.height = document.documentElement.clientHeight + 'px';
						this.blockUI.style.width = document.documentElement.clientWidth + 'px';
					}
					else {
						this.blockUI.style.height = window.innerHeight + 'px';
						this.blockUI.style.width = window.innerWidth + 'px';
					}
					this.blockUI.style.zIndex = "10000";
					this.blockUI.style.filter = "alpha(opacity=60);";
					this.blockUI.style.MozOpacity = 0.6;
					this.blockUI.style.opacity = 0.6;
					this.blockUI.style.KhtmlOpacity = 0.6;
					document.body.appendChild(this.blockUI);
					
					this.popupUI = document.createElement("DIV");
					this.popupUI.style.backgroundColor = "rgb(255, 255, 255)";
					this.popupUI.style.border = "3px solid rgb(0,0,0)";
					this.popupUI.style.position = "absolute";
					this.popupUI.style.height = '10px';
					this.popupUI.style.lineHeight = '50px';
					this.popupUI.style.paddingBottom = '40px';
					this.popupUI.style.width = '400px';
					this.popupUI.style.top = '50%';
					this.popupUI.style.left = '50%';
					this.popupUI.style.zIndex = "11000";
					this.popupUI.style.cursor = 'wait';
					var divHeight = this.popupUI.style.height.replace('px', '');
					var divWidth = this.popupUI.style.width.replace('px', '');
					this.popupUI.style.margin = '-' + divHeight / 2 + 'px 0 0 -' + divWidth / 2 + 'px';
					this.popupUI.style.textAlign = 'center';
					
					/*this.popupUI.style.position = "absolute";
	                this.popupUI.style.height = '10px';
	                this.popupUI.style.lineHeight = '50px';
	                this.popupUI.style.paddingBottom='40px';
	                this.popupUI.style.width ='400px';
	                this.popupUI.style.top ='50%';
	                this.popupUI.style.left = '50%';
	                this.popupUI.style.zIndex = "11000";*/
					
					 var errorMsg = "<p>데이터 로딩중입니다. 잠시만 기다려주세요.</p>";
					//var errorMsg = "<img src='/img/common/loding_type01.gif'/>";
					this.popupUI.innerHTML = errorMsg;
					
					document.body.appendChild(this.popupUI);
				},
				close : function () {
					if (!sop.Util.isUndefined(this.blockUI)) {
						document.body.removeChild(this.blockUI);
						delete this.blockUI;
					}
					if (!sop.Util.isUndefined(this.popupUI)) {
						D.body.removeChild(this.popupUI);
						delete this.popupUI;
					}
				}
			},

			/**
			 * 
			 * @name         : setStatsData
			 * @description  : 
			 * 
			 */
			setStatsData : function (res, options) {
				
				console.log("[catchmentAreaMainApi.js] setStatsData() 호출");
				
				var result = res.result;
				var params = options.params;
				var map = params.map;
				var mapInfo = map.mapInfo;
				
				//통계정보를 sort한다.
				if (res.result != null && res.result.length > 0) {
					res.result = res.result.sort(function(a, b) {
						return parseFloat(b[params.filter])-parseFloat(a[params.filter])
					});
				}


				map.setStatsData("normal", res, params.filter, params.unit);	
				map.openApiCatchmentGridArea(params.features.geometry.rings[0]);
	
				map.setDroppedInfo();
			},
			
			/**
			 * 
			 * @name         : setGridData
			 * @description  : 격자 경계 조회
			 * 
			 */
			setGridData : function (res, options, type, mapId, needPromise) {
				mapId = mapId || 0;	// 맵 아이디는 기본값을 0으로 세팅
				console.log("[catchmentAreaMainApi.js] setGridData() 호출");
				console.log(options);
				console.log(res);
				var result = res.result;
				var params = options.params;
				var map = $catchmentAreaMain.ui.getMap(mapId);
				var promiseResult = null;
				
				//통계정보를 sort한다.
				if (res.result != null && res.result.length > 0) {
					res.result = res.result.sort(function(a, b) {
						return parseFloat(b[params.filter])-parseFloat(a[params.filter])
					});
				}
				console.log(params.filter)
				console.log(params.unit);
				res['show1'] = options.params['show1'];
				res['show2'] = options.params['show2'];
				map.setStatsData("normal", res, params.filter, params.unit);
				
				if(type == "circle"){
					if(needPromise === true) {
						promiseResult = new Promise(function(resolve,reject){ 
							map.openApiCatchmentCircleGridAreaWithPromise(params.area, params.radius, params.grid_level, resolve, reject);
						});
					} else {
						map.openApiCatchmentCircleGridArea(params.area, params.radius, params.grid_level);						
					}
				}else{
					console.log("Nocircle");
					if(needPromise === true) {
						promiseResult = new Promise(function(resolve,reject){ 
							map.openApiCatchmentGridAreaWithPromise(params.polygonPoints, params.grid_level, options.params.area, resolve, reject) 
						});
					} else {
						map.openApiCatchmentGridArea(params.polygonPoints, params.grid_level, options.params.area);						
					}
				}
				
				map.setDroppedInfo();
				if(needPromise === true) return promiseResult;
			},
			
			/**
			 * 
			 * @name         : openApiTestStats
			 * @description  : 
			 * 
			 */			/**
			 * 

			 * @description  : 테스트용 통계 정보를 조회한다.
			 * 
			 */
			openApiTestStats : function(params) {
				console.log("[catchmentAreaMainApi.js] openApiTestStats() 호출");
				console.log(params);
				
				var sopOpenApiTestObj = new sop.openApi.test.api();
				sopOpenApiTestObj.addParam("accessToken", accessToken);
				sopOpenApiTestObj.addParam("year", "2018");
				sopOpenApiTestObj.addParam("zoom", 8);
				
				var features = params.features;
				var polyPoints = features.geometry.rings[0];
				var area = "";
				area = 'POLYGON((';
				for(var i = 0; i < polyPoints.length; i++) {
					area += polyPoints[i][0] + " " + 
					polyPoints[i][1] + ",";
					
					if(i == polyPoints.length - 1) {
						area += polyPoints[i][0] + " " + 
						polyPoints[i][1];
					}					
				}					
				area += '))';				
				sopOpenApiTestObj.addParam("area", area);
				
				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				if (params.async != undefined && params.async) {
					async = params.async;
				}

				sopOpenApiTestObj.request({
					method : "POST",
					async : async,
					url : contextPath + this.API_202001_URL,
					options : {
						params : params,
						url : this.API_202001_URL
					}
				});
			},
			
			/**
			 * 
			 * @name         : getSrvAreaGridStatDataList
			 * @description  : 데이터보드 영향권 격자데이터 조회
			 * 
			 */
//			getSrvAreaGridStatDataList : function(params){
//				var sopPortalApigetSrvGridListObj = new sop.portal.getSrvAreaGridStatDataList.api();
//				sopPortalApigetSrvGridListObj.addParam("accessToken", accessToken);
//				sopPortalApigetSrvGridListObj.addParam("base_year", params.base_year);		
//				sopPortalApigetSrvGridListObj.addParam("area", params.area);
//				sopPortalApigetSrvGridListObj.addParam("srvAreaType", params.srvAreaType);
//				if(params.radius != null && params.radius != "" && params.radius != undefined){
//					sopPortalApigetSrvGridListObj.addParam("radius", params.radius);
//				}
//				
//				sopPortalApigetSrvGridListObj.request({
//					method : "POST",
//					async : true,
//					url : contextPath + this.API_202006_URL,
//					options : {
//						params : params,
//						url : this.API_202006_URL
//					}
//				});
//			},
			
			getGridSrvAreaGridStatDataList : function(params){
				console.log("getGridSrvAreaGridStatDataList 호출");
				var sopPortalApiGridStatDataListObj = new sop.portal.getGridSrvAreaGridStatDataList.api();
				sopPortalApiGridStatDataListObj.addParam("accessToken", accessToken);
				sopPortalApiGridStatDataListObj.addParam("base_year", params.base_year);
				sopPortalApiGridStatDataListObj.addParam("classDeg", params.classDeg);
				sopPortalApiGridStatDataListObj.addParam("grid_level", params.grid_level);
				sopPortalApiGridStatDataListObj.addParam("area", params.area);
				sopPortalApiGridStatDataListObj.addParam("statType", params.statType);
				sopPortalApiGridStatDataListObj.addParam("srvAreaType", params.srvAreaType);
				if(params.radius != null && params.radius != "" && params.radius != undefined){
					sopPortalApiGridStatDataListObj.addParam("radius", params.radius);
				}
				if((params.sufid !== undefined && params.sufid !== null && params.sufid !== "") && (params.rangeCd !== undefined && params.rangeCd !== null && params.rangeCd !== "")){
					sopPortalApiGridStatDataListObj.addParam("sufid", params.sufid);
					sopPortalApiGridStatDataListObj.addParam("rangeCd", params.rangeCd);
				}				
				if(params.statType == "pops"){
					if(params.gender != "null" && params.gender != undefined){
						sopPortalApiGridStatDataListObj.addParam("gender", params.gender);
					}
//					if(params.ageCd != "null" && params.ageCd != undefined){
//						sopPortalApiGridStatDataListObj.addParam("ageCd", params.ageCd);
//					}
					if(params.ageFromCd != undefined && params.ageFromCd != null && params.ageFromCd != ""){
						sopPortalApiGridStatDataListObj.addParam("ageFromCd", params.ageFromCd);
					}
					if(params.ageToCd != undefined && params.ageToCd != null && params.ageToCd != ""){
						sopPortalApiGridStatDataListObj.addParam("ageToCd", params.ageToCd);
					}
				}else if(params.statType == "family"){
					if(params.householdType != "null" && params.householdType != undefined){
						sopPortalApiGridStatDataListObj.addParam("householdType", params.householdType);
					}
				}else if(params.statType == "house"){
					if(params.rd_resid_type != "null" && params.rd_resid_type != undefined){
						sopPortalApiGridStatDataListObj.addParam("rd_resid_type", params.rd_resid_type);
					}					
					if(params.const_year != undefined && params.const_year != null && params.const_year != ""){
						sopPortalApiGridStatDataListObj.addParam("const_year", params.const_year);
					}
					if(params.house_area_cd != undefined && params.house_area_cd != null && params.house_area_cd != ""){
						sopPortalApiGridStatDataListObj.addParam("house_area_cd", params.house_area_cd);
					}					
				}else if(params.statType == "copr"){
					if(params.ksic_3_cd != "null" && params.ksic_3_cd != undefined){
						sopPortalApiGridStatDataListObj.addParam("ksic_3_cd", params.ksic_3_cd);
					}
					if(params.grdstatType != "null" && params.grdstatType != undefined){
						sopPortalApiGridStatDataListObj.addParam("grdstatType", params.grdstatType);
					}
					//SGIS4_생활권역 시작
					if(params.isLifeBiz != "null" && params.isLifeBiz != undefined){
						sopPortalApiGridStatDataListObj.addParam("isLifeBiz", params.isLifeBiz);
					}
					//SGIS4_생활권역 끝
				}
				
				var async = true;
				if (params.async != undefined && params.async != null) {
					async = params.async;
				}
				
				sopPortalApiGridStatDataListObj.request({
					method : "POST",
					async : async,
					url : contextPath + this.API_202007_URL,
					options : {
						params : params,
						url : this.API_202007_URL
					}
				});
			},
			
			getGridSrvAreaDataBoardList : function(params, promiseParam){
				console.log("[catchmentAreaMainApi.js] getGridSrvAreaDataBoardList() 호출");
				console.log(params);
				var sopPortalApiGridSrvAreaDataBoardObj = new sop.portal.getGridSrvAreaDataBoardList.api();
				sopPortalApiGridSrvAreaDataBoardObj.addParam("accessToken", accessToken);				
				sopPortalApiGridSrvAreaDataBoardObj.addParam("base_year", params.base_year);
				sopPortalApiGridSrvAreaDataBoardObj.addParam("classDeg", params.classDeg);
				sopPortalApiGridSrvAreaDataBoardObj.addParam("grid_level", params.grid_level);
				sopPortalApiGridSrvAreaDataBoardObj.addParam("area", params.area);
				sopPortalApiGridSrvAreaDataBoardObj.addParam("statType", params.statType);
				sopPortalApiGridSrvAreaDataBoardObj.addParam("srvAreaType", params.srvAreaType);
				if(params.radius != null && params.radius != "" && params.radius != undefined){
					sopPortalApiGridSrvAreaDataBoardObj.addParam("radius", params.radius);
				}
				if((params.sufid !== undefined && params.sufid !== null && params.sufid !== "") && (params.rangeCd !== undefined && params.rangeCd !== null && params.rangeCd !== "")){
					sopPortalApiGridSrvAreaDataBoardObj.addParam("sufid", params.sufid);
					sopPortalApiGridSrvAreaDataBoardObj.addParam("rangeCd", params.rangeCd);
				}
				
				if(params.statType == "pops"){
					if(params.gender != "null" && params.gender != undefined){
						sopPortalApiGridSrvAreaDataBoardObj.addParam("gender", params.gender);
					}
//					if(params.ageCd != "null" && params.ageCd != undefined){
//						sopPortalApiGridSrvAreaDataBoardObj.addParam("ageCd", params.ageCd);
//					}
					if(params.ageFromCd != undefined && params.ageFromCd != null && params.ageFromCd != ""){
						sopPortalApiGridSrvAreaDataBoardObj.addParam("ageFromCd", params.ageFromCd);
					}
					if(params.ageToCd != undefined && params.ageToCd != null && params.ageToCd != ""){
						sopPortalApiGridSrvAreaDataBoardObj.addParam("ageToCd", params.ageToCd);
					}					
				}else if(params.statType == "family"){
					if(params.householdType != "null" && params.householdType != undefined){
						sopPortalApiGridSrvAreaDataBoardObj.addParam("householdType", params.householdType);
					}
				}else if(params.statType == "house"){
					if(params.rd_resid_type != "null" && params.rd_resid_type != undefined){
						sopPortalApiGridSrvAreaDataBoardObj.addParam("rd_resid_type", params.rd_resid_type);
					}
					if(params.const_year != undefined && params.const_year != null && params.const_year != ""){
						sopPortalApiGridSrvAreaDataBoardObj.addParam("const_year", params.const_year);
					}
					if(params.house_area_cd != undefined && params.house_area_cd != null && params.house_area_cd != ""){
						sopPortalApiGridSrvAreaDataBoardObj.addParam("house_area_cd", params.house_area_cd);
					}					
				}else if(params.statType == "copr"){
					if(params.ksic_3_cd != "null" && params.ksic_3_cd != undefined){
						sopPortalApiGridSrvAreaDataBoardObj.addParam("ksic_3_cd", params.ksic_3_cd);
					}
					if(params.grdstatType != "null" && params.grdstatType != undefined){
						sopPortalApiGridSrvAreaDataBoardObj.addParam("grdstatType", params.grdstatType);
					}
					//SGIS4_생활권역 시작
					if(params.isLifeBiz != "null" && params.isLifeBiz != undefined){
						sopPortalApiGridSrvAreaDataBoardObj.addParam("isLifeBiz", params.isLifeBiz);
					}
					//SGIS4_생활권역 끝					
				}
				
				sopPortalApiGridSrvAreaDataBoardObj.request({
					method : "POST",
					async : true,
					url : contextPath + this.API_202010_URL,
					options : {
						params : params,
						url : this.API_202010_URL,
						promiseParam : promiseParam
					}
				});
			},

			getGridStatDataList : function(params, promiseParam){
				console.log("[catchmentAreaMainApi.js] getGridStatDataList() 호출");
				console.log(params);
				var sopPortalApiGridStatDataObj = new sop.portal.getGridStatDataList.api();
				sopPortalApiGridStatDataObj.addParam("accessToken", accessToken);				
				sopPortalApiGridStatDataObj.addParam("base_year", params.base_year);
				sopPortalApiGridStatDataObj.addParam("classDeg", params.classDeg);
				sopPortalApiGridStatDataObj.addParam("grid_level", params.grid_level);
				sopPortalApiGridStatDataObj.addParam("area", params.area);
				sopPortalApiGridStatDataObj.addParam("statType", params.statType);
				sopPortalApiGridStatDataObj.addParam("srvAreaType", params.srvAreaType);
				if(params.radius != null && params.radius != "" && params.radius != undefined){
					sopPortalApiGridStatDataObj.addParam("radius", params.radius);
				}
				
				if(params.statType == "pops"){
					if(params.gender != "null" && params.gender != undefined){
						sopPortalApiGridStatDataObj.addParam("gender", params.gender);
					}
//					if(params.ageCd != "null" && params.ageCd != undefined){
//						sopPortalApiGridStatDataObj.addParam("ageCd", params.ageCd);
//					}
					if(params.ageFromCd != undefined && params.ageFromCd != null && params.ageFromCd != ""){
						sopPortalApiGridStatDataObj.addParam("ageFromCd", params.ageFromCd);
					}
					if(params.ageToCd != undefined && params.ageToCd != null && params.ageToCd != ""){
						sopPortalApiGridStatDataObj.addParam("ageToCd", params.ageToCd);
					}					
				}else if(params.statType == "family"){
					if(params.householdType != "null" && params.householdType != undefined){
						sopPortalApiGridStatDataObj.addParam("householdType", params.householdType);
					}
				}else if(params.statType == "house"){
					if(params.rd_resid_type != "null" && params.rd_resid_type != undefined){
						sopPortalApiGridStatDataObj.addParam("rd_resid_type", params.rd_resid_type);
					}
					if(params.const_year != undefined && params.const_year != null && params.const_year != ""){
						sopPortalApiGridStatDataObj.addParam("const_year", params.const_year);
					}
					if(params.house_area_cd != undefined && params.house_area_cd != null && params.house_area_cd != ""){
						sopPortalApiGridStatDataObj.addParam("house_area_cd", params.house_area_cd);
					}					
				}else if(params.statType == "copr"){
					if(params.ksic_3_cd != "null" && params.ksic_3_cd != undefined){
						sopPortalApiGridStatDataObj.addParam("ksic_3_cd", params.ksic_3_cd);
					}
					if(params.grdstatType != "null" && params.grdstatType != undefined){
						sopPortalApiGridStatDataObj.addParam("grdstatType", params.grdstatType);
					}
				}
				
				sopPortalApiGridStatDataObj.request({
					method : "POST",
					async : true,
					url : contextPath + this.API_202097_URL,
					options : {
						params : params,
						url : this.API_202097_URL,
						promiseParam : promiseParam
					}
				});
			},
			
			/**
			 * 
			 * @name         : getServiceAreaStatistics
			 * @description  : 데이터보드 영향권 통계데이터 조회
			 * 
			 */
			getServiceAreaStatistics : function(params){

				var sopPortalServiceAreaStatisticsObj = new sop.portal.getServiceAreaStatistics.api();
				sopPortalServiceAreaStatisticsObj.addParam("accessToken", accessToken);
				sopPortalServiceAreaStatisticsObj.addParam("classDeg", params.classDeg);
				sopPortalServiceAreaStatisticsObj.addParam("base_year", params.base_year);
				sopPortalServiceAreaStatisticsObj.addParam("copr_base_year", params.copr_base_year);
				sopPortalServiceAreaStatisticsObj.addParam("area", params.area);
				sopPortalServiceAreaStatisticsObj.addParam("srvAreaType", params.srvAreaType);
				if(params.radius != null && params.radius != "" && params.radius != undefined){
					sopPortalServiceAreaStatisticsObj.addParam("radius", params.radius);
				}
				if(params.grid_level !== undefined && params.grid_level !== ""){
					sopPortalServiceAreaStatisticsObj.addParam("grid_level", params.grid_level);
				}
				sopPortalServiceAreaStatisticsObj.addParam("workGb", params.workGb);
				if((params.sufid !== undefined && params.sufid !== null && params.sufid !== "") && (params.rangeCd !== undefined && params.rangeCd !== null && params.rangeCd !== "")){
					sopPortalServiceAreaStatisticsObj.addParam("sufid", params.sufid);
					sopPortalServiceAreaStatisticsObj.addParam("rangeCd", params.rangeCd);
				}

				var async = true;
				if (params.async != undefined && params.async != null) {
					async = params.async;
				}
				
				sopPortalServiceAreaStatisticsObj.request({
					method : "POST",
					async : async,
					url : contextPath + this.API_202092_URL,
					options : {
						params : params,
						url : this.API_202092_URL
					}
				});
			},
			
			/**
			 * 
			 * @name         : getCodeList
			 * @description  : 공통 코드 조회
			 * 
			 */
			getCodeList : function(params){

				var sopPortalServiceAreaCodeObj = new sop.portal.serviceAreaCode.api();
				sopPortalServiceAreaCodeObj.addParam("accessToken", accessToken);
				sopPortalServiceAreaCodeObj.addParam("bClassCd", params.codeInfo.bClassCd);
				if(params.codeInfo.sClassCd != undefined && params.codeInfo.sClassCd != null && params.codeInfo.sClassCd != ""){
					sopPortalServiceAreaCodeObj.addParam("sClassCd", params.codeInfo.sClassCd);
				}
				if(params.codeInfo.cdExp != undefined && params.codeInfo.cdExp != null && params.codeInfo.cdExp != ""){
					sopPortalServiceAreaCodeObj.addParam("cdExp", params.codeInfo.cdExp);
				}

				var async = true;
				if (params.async != undefined && params.async != null) {
					async = params.async;
				}
				
				sopPortalServiceAreaCodeObj.request({
					method : "POST",
					async : async,
					url : contextPath + this.API_202093_URL,
					options : {
						params : params,
						url : this.API_202093_URL
					}
				});
			},

			/**
			 * 
			 * @name         : getCharacteristicsStats
			 * @description  : 데이터보드 특성별 통계데이터 조회
			 * 
			 */
			getCharacteristicsStats : function(params){

				var sopPortalCharacteristicsStatsObj = new sop.portal.getCharacteristicsStats.api();
				sopPortalCharacteristicsStatsObj.addParam("accessToken", accessToken);
				sopPortalCharacteristicsStatsObj.addParam("classDeg", params.classDeg);
				sopPortalCharacteristicsStatsObj.addParam("base_year", params.base_year);
				sopPortalCharacteristicsStatsObj.addParam("copr_base_year", params.copr_base_year);
				sopPortalCharacteristicsStatsObj.addParam("area", params.area);
				sopPortalCharacteristicsStatsObj.addParam("srvAreaType", params.srvAreaType);
				if(params.radius != undefined && params.radius != null && params.radius != ""){
					sopPortalCharacteristicsStatsObj.addParam("radius", params.radius);
				}
				if(params.grid_level != undefined && params.grid_level != null && params.grid_level != ""){
					sopPortalCharacteristicsStatsObj.addParam("grid_level", params.grid_level);
				}
				if(params.pops_cond != undefined && params.pops_cond != null && params.pops_cond != ""){
					sopPortalCharacteristicsStatsObj.addParam("pops_cond", params.pops_cond);
				}
				if(params.family_cond != undefined && params.family_cond != null && params.family_cond != ""){
					sopPortalCharacteristicsStatsObj.addParam("family_cond", params.family_cond);
				}
				if(params.house_cond != undefined && params.house_cond != null && params.house_cond != ""){
					sopPortalCharacteristicsStatsObj.addParam("house_cond", params.house_cond);
				}
				if(params.copr_cond != undefined && params.copr_cond != null && params.copr_cond != ""){
					sopPortalCharacteristicsStatsObj.addParam("copr_cond", params.copr_cond);
				}
				if(params.employee_cond != undefined && params.employee_cond != null && params.employee_cond != ""){
					sopPortalCharacteristicsStatsObj.addParam("employee_cond", params.employee_cond);
				}

				var async = true;
				if (params.async != undefined && params.async != null) {
					async = params.async;
				}
				//SGIS4_1025_생활권역 시작
				if(params.stats_class_gb != undefined && params.stats_class_gb != null && params.stats_class_gb != ""){
					sopPortalCharacteristicsStatsObj.addParam("stats_class_gb", params.stats_class_gb);
				}
				//SGIS4_1025_생활권역 끝
				
				sopPortalCharacteristicsStatsObj.request({
					method : "POST",
					async : async,
					url : contextPath + this.API_202094_URL,
					options : {
						params : params,
						url : this.API_202094_URL
					}
				});
			},
			
			/**
			 * 
			 * @name         : getCorrelationAnalysis
			 * @description  : 상관관계분석에 필요한 분석결과를 요청한다.
			 * 
			 */
			getCorrelationAnalysis : function(complexOption){
				
				$.ajax({
				    type: 'POST',
				    url : contextPath + '/ServiceAPI/OpenAPI3/catchmentArea/correlationAnalysis.json',
				    data : { json_data : JSON.stringify(complexOption)},
				    success : function(result) {
				        console.log(result.result);
				        var size = complexOption.length;
				        var correlationResult = result.result; 
				        var axisArr = complexOption.map(function(item,index){ return item.itemLbl });
				        var series = [];
				        for(var i = 0; i < size ; i++) {
				        	for(var j = 0; j < size ; j++) {
				        		if(i === j) {
				        			series.push([i,j, 1.0]);
				        		} else {
				        			var r = correlationResult[i+j-1];
				        			r = parseFloat(r.toFixed(2))
				        			series.push([i, j, r]);
				        		}
				        	}
				        }
				        var title = "상관관계 분석 결과";
				        
				        $catchmentAreaDataBoard.ui.createHeatMapChart("correlationChart", axisArr, series, title, 490, 500);
				        $catchmentAreaDataBoard.event.getDataBoard(5);
				    },
				    error : function(xhr, status, error) {
				        console.error(error);
				    }
				});
			},
			
			/**
			 * 
			 * @name         : reportSrvAreaStats
			 * @description  : 보고서용 영향권데이터 조회
			 * 
			 */
			reportSrvAreaStats: function(params){
				var sopPortalSrvAreaReportStatsObj = new sop.portal.getSrvAreaReportStatis.api();
				sopPortalSrvAreaReportStatsObj.addParam("accessToken", accessToken);
				sopPortalSrvAreaReportStatsObj.addParam("classDeg", params.classDeg);
				sopPortalSrvAreaReportStatsObj.addParam("base_year", params.base_year);
				sopPortalSrvAreaReportStatsObj.addParam("copr_base_year", params.copr_base_year);
				sopPortalSrvAreaReportStatsObj.addParam("area", params.area);
				sopPortalSrvAreaReportStatsObj.addParam("srvAreaType", params.srvAreaType);
				if(params.radius != null && params.radius != "" && params.radius != undefined){
					sopPortalSrvAreaReportStatsObj.addParam("radius", params.radius);
				}
				sopPortalSrvAreaReportStatsObj.addParam("workGb", params.workGb);
				if((params.sufid !== undefined && params.sufid !== null && params.sufid !== "") && (params.rangeCd !== undefined && params.rangeCd !== null && params.rangeCd !== "")){
					sopPortalSrvAreaReportStatsObj.addParam("sufid", params.sufid);
					sopPortalSrvAreaReportStatsObj.addParam("rangeCd", params.rangeCd);
				}
				
				var async = true;
				if (params.async != undefined && params.async != null) {
					async = params.async;
				}
				
				sopPortalSrvAreaReportStatsObj.request({
					method : "POST",
					async : async,
					url : contextPath + this.API_202092_URL,
					options : {
						params : params,
						url : this.API_202092_URL
					}
				});
			},
			
			/**
			 * 
			 * @name         : reportGridAreaStats
			 * @description  : 보고서용 격자데이터 조회
			 * 
			 */
			reportGridAreaStats: function(params){
				var sopPortalGridAreaReportStatsObj = new sop.portal.getGridAreaReportStatis.api();
				sopPortalGridAreaReportStatsObj.addParam("accessToken", accessToken);
				sopPortalGridAreaReportStatsObj.addParam("base_year", params.base_year);
				sopPortalGridAreaReportStatsObj.addParam("classDeg", params.classDeg);
				sopPortalGridAreaReportStatsObj.addParam("grid_level", params.grid_level);
				sopPortalGridAreaReportStatsObj.addParam("area", params.area);
				sopPortalGridAreaReportStatsObj.addParam("statType", params.statType);
				sopPortalGridAreaReportStatsObj.addParam("srvAreaType", params.srvAreaType);
				if(params.radius != null && params.radius != "" && params.radius != undefined){
					sopPortalGridAreaReportStatsObj.addParam("radius", params.radius);
				}
				if((params.sufid !== undefined && params.sufid !== null && params.sufid !== "") && (params.rangeCd !== undefined && params.rangeCd !== null && params.rangeCd !== "")){
					sopPortalGridAreaReportStatsObj.addParam("sufid", params.sufid);
					sopPortalGridAreaReportStatsObj.addParam("rangeCd", params.rangeCd);
				}				
				if(params.statType == "pops"){
					if(params.gender != "null" && params.gender != undefined){
						sopPortalGridAreaReportStatsObj.addParam("gender", params.gender);
					}
//					if(params.ageCd != "null" && params.ageCd != undefined){
//						sopPortalGridAreaReportStatsObj.addParam("ageCd", params.ageCd);
//					}
					if(params.ageFromCd != undefined && params.ageFromCd != null && params.ageFromCd != ""){
						sopPortalGridAreaReportStatsObj.addParam("ageFromCd", params.ageFromCd);
					}
					if(params.ageToCd != undefined && params.ageToCd != null && params.ageToCd != ""){
						sopPortalGridAreaReportStatsObj.addParam("ageToCd", params.ageToCd);
					}					
				}else if(params.statType == "family"){
					if(params.householdType != "null" && params.householdType != undefined){
						sopPortalGridAreaReportStatsObj.addParam("householdType", params.householdType);
					}
				}else if(params.statType == "house"){
					if(params.rd_resid_type != "null" && params.rd_resid_type != undefined){
						sopPortalGridAreaReportStatsObj.addParam("rd_resid_type", params.rd_resid_type);
					}
				}else if(params.statType == "copr"){
					if(params.ksic_3_cd != "null" && params.ksic_3_cd != undefined){
						sopPortalGridAreaReportStatsObj.addParam("ksic_3_cd", params.ksic_3_cd);
					}
					if(params.grdstatType != "null" && params.grdstatType != undefined){
						sopPortalGridAreaReportStatsObj.addParam("grdstatType", params.grdstatType);
					}
					//SGIS4_생활권역 시작
					if(params.isLifeBiz != "null" && params.isLifeBiz != undefined){
						sopPortalGridAreaReportStatsObj.addParam("isLifeBiz", params.isLifeBiz);
					}
					//SGIS4_생활권역 끝						
				}
				sopPortalGridAreaReportStatsObj.request({
					method : "POST",
					async : true,
					url : contextPath + this.API_202010_URL,
					options : {
						params : params,
						url : this.API_202010_URL
					}
				});
			},
			
			/**
			 * 
			 * @name         : getGridInfo
			 * @description  : 상세분석에서 좌,우 지도에 나올 격자들의 데이터를 읽어온다.
			 * 
			 */
			getGridInfo: function (option, url) {	// data{} 속성 추가 - 수정완료 2020-11-02 , 13:16
				url = url || contextPath + '/ServiceAPI/OpenAPI3/catchmentArea/getGridSrvAreaGridStatDataList.json';
			    return new Promise(function (resolve, reject) {
			        $.ajax({
			        	method : "POST",
			            url: url,
			        	dataType: 'json',
			            data: {
			            	accessToken     : option.accessToken,
			            	area        	: option.area,
			            	base_year       : option.base_year,
			            	grid_level      : option.grid_level,
			            	radius      	: option.radius,
			            	statType        : option.statType,
			            	srvAreaType     : option.srvAreaType,
			            	gender      	: option.gender,
			            	//ageCd       	: option.ageCd,
			            	ageFromCd		: option.ageFromCd,
			            	ageToCd			: option.ageToCd,			            	
			            	householdType   : option.householdType, // family_cnt ==> householdType 로 변경
			            	rd_resid_type   : option.rd_resid_type,
			            	const_year   	: option.const_year,
			            	house_area_cd   : option.house_area_cd,
			            	ksic_3_cd       : option.ksic_3_cd,
			            	grdstatType     : option.grdstatType,
			            	classDeg		: option.classDeg
			            },
			            success: function (result) {
			                var promiseResult = {
		                		result: result,
			                    mapId: option.mapId
			                };
			                resolve(promiseResult);
			            },
			            error: function (error) {
			                reject(new Error('지도('+ option.mapId +')과 관련된 데이터 조회시 문제가 생겼습니다.'));
			            }
			        });
			    
			    });
			}
			
			//SGIS4_생활권역 시작
			,
			
			/**
			 * 
			 * @name         : getKSICinfo
			 * @description  : 한국표준산업분류 정보 조회
			 * 
			 */
			getKSICinfo : function(params) {
				var sopPortalKSICinfoObj = new sop.portal.KSICinfo.api();
				sopPortalKSICinfoObj.addParam("accessToken", accessToken);
				sopPortalKSICinfoObj.addParam("classDeg", params.classDeg);
				sopPortalKSICinfoObj.addParam("workGb", params.workGb);
				
				if (params.classCd != undefined && params.classCd != null && params.classCd != "") {
					sopPortalKSICinfoObj.addParam("classCd", params.classCd);
				}
				if (params.schWord != undefined && params.schWord != null && params.schWord != "") {
					sopPortalKSICinfoObj.addParam("schWord", params.schWord);
				}
				if (params.schClassCd != undefined && params.schClassCd != null && params.schClassCd != "") {
					sopPortalKSICinfoObj.addParam("schClassCd", params.schClassCd);
				}
				if (params.schMinDepth != undefined && params.schMinDepth != null && params.schMinDepth != "") {
					sopPortalKSICinfoObj.addParam("schMinDepth", params.schMinDepth);
				}
				if (params.pageNo != undefined && params.pageNo != null && params.pageNo != "") {
					sopPortalKSICinfoObj.addParam("pageNo", params.pageNo);
				}
				if (params.pageSize != undefined && params.pageSize != null && params.pageSize != "") {
					sopPortalKSICinfoObj.addParam("pageSize", params.pageSize);
				}
				if (params.ksicCd != undefined && params.ksicCd != null && params.ksicCd != "") {
					sopPortalKSICinfoObj.addParam("ksicCd", params.ksicCd);
				}

				var async = true;
				if (params.async != undefined && params.async != null) {
					async = params.async;
				}
				
				sopPortalKSICinfoObj.request({
					method : "POST",
					async : async,
					url : contextPath + this.API_202081_URL,
					options : {
						params : params,
						url : this.API_202081_URL
					}
				});
			},			

			/**
			 * 
			 * @name         : getSettingInfo
			 * @description  : 생활권역 설정정보 조회
			 * 
			 */
			getSettingInfo : function(params) {
				var sopPortalSettingInfoObj = new sop.portal.SettingInfo.api();
				sopPortalSettingInfoObj.addParam("accessToken", accessToken);
				sopPortalSettingInfoObj.addParam("workGb", params.workGb);
				
				if (params.classDeg != undefined && params.classDeg != null && params.classDeg != "") {
					sopPortalSettingInfoObj.addParam("classDeg", params.classDeg);
				}

				var async = true;
				if (params.async != undefined && params.async != null) {
					async = params.async;
				}
				
				sopPortalSettingInfoObj.request({
					method : "POST",
					async : async,
					url : contextPath + this.API_202082_URL,
					options : {
						params : params,
						url : this.API_202082_URL
					}
				});
			},		// SGIS4_1025_생활권역_임의영역 수정
			//SGIS4_생활권역 끝
			
			// SGIS4_1025_생활권역_임의영역 시작
			/**
			 * 
			 * @name         : getScopeInfo
			 * @description  : 생활권역 임의값 범위정보 조회
			 * 
			 */
			getScopeInfo : function(params) {
				var sopPortalScopeInfoObj = new sop.portal.ScopeInfo.api(); 
				sopPortalScopeInfoObj.addParam("accessToken", accessToken);

				if (params.classDeg != undefined && params.classDeg != null && params.classDeg != "") {
					sopPortalScopeInfoObj.addParam("classDeg", params.classDeg);
				}
				var async = true;
				
				if (params.async != undefined && params.async != null) {
					async = params.async;
				}
				
				sopPortalScopeInfoObj.request({
					method : "POST",
					async : async,
					url : contextPath + this.API_202090_URL,
					options : {
						params : params,
						url : this.API_202090_URL
					}
				});
			},
			// SGIS4_1025_생활권역_임의영역 끝
			
			//SGIS4_1025_생활권역 시작
			/**
			 * 
			 * @name         : getCorrelationAnalysisTot
			 * @description  : 특성별 총값 조회
			 * 
			 */
			getCharacteristicsStatsTot : function(params){
				var sopPortalCTotStatsObj = new sop.portal.getCharacteristicsTotStats.api();
				sopPortalCTotStatsObj.addParam("accessToken", accessToken);
				sopPortalCTotStatsObj.addParam("classDeg", params.classDeg);
				sopPortalCTotStatsObj.addParam("base_year", params.base_year);
				sopPortalCTotStatsObj.addParam("copr_base_year", params.copr_base_year);
				sopPortalCTotStatsObj.addParam("area", params.area);
				sopPortalCTotStatsObj.addParam("srvAreaType", params.srvAreaType);
				if(params.radius != undefined && params.radius != null && params.radius != ""){
					sopPortalCTotStatsObj.addParam("radius", params.radius);
				}
				if(params.grid_level != undefined && params.grid_level != null && params.grid_level != ""){
					sopPortalCTotStatsObj.addParam("grid_level", params.grid_level);
				}
				if(params.pops_cond != undefined && params.pops_cond != null && params.pops_cond != ""){
					sopPortalCTotStatsObj.addParam("pops_cond", params.pops_cond);
				}
				if(params.family_cond != undefined && params.family_cond != null && params.family_cond != ""){
					sopPortalCTotStatsObj.addParam("family_cond", params.family_cond);
				}
				if(params.house_cond != undefined && params.house_cond != null && params.house_cond != ""){
					sopPortalCTotStatsObj.addParam("house_cond", params.house_cond);
				}
				if(params.copr_cond != undefined && params.copr_cond != null && params.copr_cond != ""){
					sopPortalCTotStatsObj.addParam("copr_cond", params.copr_cond);
				}
				if(params.employee_cond != undefined && params.employee_cond != null && params.employee_cond != ""){
					sopPortalCTotStatsObj.addParam("employee_cond", params.employee_cond);
				}

				var async = true;
				if (params.async != undefined && params.async != null) {
					async = params.async;
				}
				if(params.stats_class_gb != undefined && params.stats_class_gb != null && params.stats_class_gb != ""){
					sopPortalCTotStatsObj.addParam("stats_class_gb", params.stats_class_gb);
				}
				
				sopPortalCTotStatsObj.request({
					method : "POST",
					async : async,
					url : contextPath + this.API_202094_URL,
					options : {
						params : params,
						url : this.API_202094_URL
					}
				});
			}
			//SGIS4_1025_생활권역 끝
	};

	/** ********* OpenAPI 테스트 통계검색 Start ********* */
	(function() {
		$class("sop.openApi.test.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								$catchmentAreaMainApi.request.setStatsData(res, options);		
								break;
							case -401:
								accessTokenInfo(function() {
									$catchmentAreaMainApi.request.openApiTestStats(options.params);
								});
								break;
							case -100:

									messageAlert.open(
											"알림", 
											"검색결과가 존재하지 않습니다.",
											function done() {
												map.openApiReverseGeoCode(map.center);
											}
									);

								break;
							default:
								$catchmentAreaMainApi.request.combineFailCnt++;
								map.clearDataOverlay();
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						//map.mapInfo.resetTimeSeries(); => 다른 것으로 대체
					}
				});
	}());
	/** ********* OpenAPI 테스트  통계검색 End ********* */
	/*********** 데이터보드 영향권 통계조회 Start **********/
//	(function () {
//		$class("sop.portal.getSrvAreaGridStatDataList.api").extend(sop.portal.absAPI).define({
//			onSuccess : function (status, res, options) {
//				console.log("sop.portal.getSrvAreaGridStatDataList.api 호출");
//				console.log(res);
//				var result  = res.result;
//				$catchmentAreaDataBoard.ui.settiongSrvAreaDataBoard(result);
//			},
//			onFail : function (status) {
//				
//			}
//		});
//	}());
	/*********** 영향권 통계조회 End **********/
	/*********** 격자별 통계조회 Start **********/
	(function () {
		$class("sop.portal.getGridSrvAreaGridStatDataList.api").extend(gis.service.absAPI).define({
			onSuccess : function (status, res, options) {

				$catchmentAreaMask.endUnitWork(options.params.identifier);
				
				if (res.result != null && res.result.length > 0) {
					if(options.params.rangeType == "stats03"){
						$catchmentAreaMain.ui.createSrvAreaShape(options.params.rangeType, options.params.rangeVal, options.params.mapId);
						$catchmentAreaMainApi.request.setGridData(res, options, "circle", options.params.mapId);
					}else{
						//격자가 속한 영향권 호출(보기에 별로임)
						$catchmentAreaMain.ui.createSrvAreaShape(options.params.rangeType, options.params.rangeVal, options.params.mapId);
						
						$catchmentAreaMainApi.request.setGridData(res, options, "time", options.params.mapId);
					}
				}else{
					var type = options.params.statType;
					var coprType = options.params.grdstatType;
				    var statSuffix = $catchmentAreaDataBoard.ui.getTypeUnit(type, coprType);
				    var statNm = "";
					if(type == "idlv"){
						statNm = statSuffix;
					}else{
						statNm = "[" + options.params.schCondNm + "] " + statSuffix;
					}
					
					//SGIS4_0629_생활권역 시작
					caMessageAlert.open("알림", "영역 내 " + statNm+ "에 대한 [" + options.params.base_year + "]년도 격자별 통계값이 '0'입니다.");
					//SGIS4_0629_생활권역 끝
				}
			},
			onFail : function (status, options) {
				
				$catchmentAreaMask.endUnitWork(options.params.identifier);
			}
		});
	}());
	/*********** 격자별 통계조회 End **********/
	/*********** 데이터보드 격자 통계조회 Start **********/
	(function () {
		$class("sop.portal.getGridSrvAreaDataBoardList.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				
				$catchmentAreaMask.endUnitWork(options.params.identifier);
				
				if (res.result != null && res.result.gridStat != null && res.result.gridStat.length > 0) {
					var result = res.result;
					var type = options.params.statType
					var unit = options.params.unit
					if(!options.promiseParam) {
						$catchmentAreaDataBoard.ui.settiongGridDataBoard(result, options);
					} else {
						options.promiseParam.resolve(res);
					}
					
					$catchmentAreaDataBoard.event.getDataBoard(2);
					//SGIS4_생활권역 시작
					$('.main_btn_top > .btn06').show();
					//SGIS4_생활권역 끝
				}else{
					var type = options.params.statType;
					var coprType = options.params.grdstatType;
				    var statSuffix = $catchmentAreaDataBoard.ui.getTypeUnit(type, coprType);
				    var statNm = "";
					if(type == "idlv"){
						statNm = statSuffix;
					}else{
						statNm = "[" + options.params.schCondNm + "] " + statSuffix;
					}
					
					caMessageAlert.open("알림", "영역 내 " + statNm+ "에 대한 연도별 통계값이 '0'입니다.");

					$('.close_btn02').trigger('click');
					$('.pop_btn01').hide();
					//SGIS4_생활권역 시작
					$('.main_btn_top > .btn06').hide(); //통계정보 없을 시 보고서 버튼 숨김
					//SGIS4_생활권역 끝
				}
			},
			onFail : function (status, options) {
				
				$catchmentAreaMask.endUnitWork(options.params.identifier);
				options.promiseParam.reject(status);
			}
		});
	}());
	/*********** 데이터보드 격자 통계조회 End **********/
	/*********** 격자통계 통합(bsca) 조회 Start **********/
	(function () {
		$class("sop.portal.getGridStatDataList.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				
				$catchmentAreaMask.endUnitWork(options.params.identifier);
				
				if (res.result != null && res.result.mapStat != null && res.result.mapStat.length > 0 && res.result.gridStat != null && res.result.gridStat.length > 0) {
					// 기존 API_202007 처리
					var resCopy = $.extend({}, res);
					resCopy.result = res.result.mapStat;
					
					if(options.params.rangeType == "stats03"){
						$catchmentAreaMain.ui.createSrvAreaShape(options.params.rangeType, options.params.rangeVal, options.params.mapId);
						$catchmentAreaMainApi.request.setGridData(resCopy, options, "circle", options.params.mapId);
					}else{
						//격자가 속한 영향권 호출(보기에 별로임)
						$catchmentAreaMain.ui.createSrvAreaShape(options.params.rangeType, options.params.rangeVal, options.params.mapId);
						
						$catchmentAreaMainApi.request.setGridData(resCopy, options, "time", options.params.mapId);
					}
					
					// 기존 API_202010 처리
					var result = res.result;
					if(!options.promiseParam) {
						$catchmentAreaDataBoard.ui.settiongGridDataBoard(result, options);
					} else {
						options.promiseParam.resolve(res);
					}					
				}else{
					caMessageAlert.open("알림", "검색결과가 존재하지 않습니다.");
				}
			},
			onFail : function (status, options) {
				
				$catchmentAreaMask.endUnitWork(options.params.identifier);
				options.promiseParam.reject(status);
			}
		});
	}());
	/*********** 격자통계 통합(bsca) 조회 End **********/	
	/*********** 영향권 통계정보 조회 Start **********/
	(function() {
		$class("sop.portal.getServiceAreaStatistics.api").extend(gis.service.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						
						$catchmentAreaMask.endUnitWork(options.params.identifier);
						
						switch (parseInt(res.errCd)) {
							case 0:
								var result  = res.result;
								
								$catchmentAreaObj.setStatisticsInfo('S01', res.result, options);
								
								$catchmentAreaDataBoard.ui.setServiceAreaStatisticsData(result, options);								
								break;
							case -100:
								// 검색결과가 존재하지 않습니다.
								break;
							case -401:
								accessTokenInfo(function() {
									$catchmentAreaMainApi.request.getServiceAreaStatistics(options.params);
								});
								break;	
						}
					},
					onFail : function(status, options) {
						
						$catchmentAreaMask.endUnitWork(options.params.identifier);
					}
				});
	}());
	/*********** 영향권 통계정보 조회 End **********/
	/*********** 공통 코드 조회 Start **********/
	(function() {
		$class("sop.portal.serviceAreaCode.api").extend(gis.service.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						switch (parseInt(res.errCd)) {
							case 0:
								var result  = res.result;
								$catchmentAreaMain.ui.setCodeData(result, options.params);								
								break;
							case -401:
								accessTokenInfo(function() {
									$catchmentAreaMainApi.request.getCodeList(options.params);
								});
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	/*********** 공통 코드 조회 End **********/
	/*********** 특성별 통계정보 조회 Start **********/
	(function() {
		$class("sop.portal.getCharacteristicsStats.api").extend(gis.service.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						
						$catchmentAreaMask.endUnitWork(options.params.identifier);
						
						switch (parseInt(res.errCd)) {
							case 0:
								var result  = res.result;
								
								//SGIS4_1025_생활권역 시작
								//$catchmentAreaObj.setStatisticsInfo('S02', res.result, options);
								$catchmentAreaDataBoard.ui.setChkDeatailData(result, options);
								//$catchmentAreaDataBoard.ui.setCharacteristicsStatsData(result, options);								
								//SGIS4_1025_생활권역 끝
								break;
							case -401:
								accessTokenInfo(function() {
									$catchmentAreaMainApi.request.getCharacteristicsStats(options.params);
								});
								break;
						}
					},
					onFail : function(status, options) {
						
						$catchmentAreaMask.endUnitWork(options.params.identifier);
					}
				});
	}());
	/*********** 특성별 통계정보 조회 End **********/	
	/*********** 영향권 보고서 통계정보 조회 End **********/	
	(function() {
		$class("sop.portal.getSrvAreaReportStatis.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						switch (parseInt(res.errCd)) {
							case 0:
								var result  = res.result;
								$catchmentAreaMain.ui.reportLoad(result, options);
								break;
							case -401:
								accessTokenInfo(function() {
									$catchmentAreaMainApi.request.reportSrvAreaStats(options.params);
								});
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	/*********** 영향권 보고서 통계정보 조회 End **********/
	/*********** 격자 보고서 통계정보 조회 End **********/	
	(function() {
		$class("sop.portal.getGridAreaReportStatis.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						switch (parseInt(res.errCd)) {
							case 0:
								var result  = res.result;
								$catchmentAreaMain.ui.reportLoad(result, options);
								break;
							case -401:
								accessTokenInfo(function() {
									$catchmentAreaMainApi.request.reportGridAreaStats(options.params);
								});
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	/*********** 격자 보고서 통계정보 조회 End **********/
	
	//SGIS4_생활권역 시작
	/** ********* OpenAPI 산업체분류 Start ********* */
	(function() {
		$class("sop.portal.KSICinfo.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						if (res.errCd == "0") {							
							if(options.params.workGb == "T"){
								$catchmentAreaKSIC.ui.setTree(res, options);
							}else if(options.params.workGb == "S"){
								$catchmentAreaKSIC.ui.setList(res, options);
							}else if(options.params.workGb == "D"){
								$catchmentAreaKSIC.ui.setDetail(res, options);
							}	
						} else if (res.errCd == "-401") {
							accessTokenInfo(function() {
								$catchmentAreaMainApi.request.getKSICinfo(options.params);
							});
						} else if (res.errCd == "-100") {
							if(options.params.workGb == "T"){
								messageAlert.open("알림", res.errMsg);
							}else if(options.params.workGb == "S"){
								$catchmentAreaKSIC.ui.setEmptyList();
							}else if(options.params.workGb == "D"){
								messageAlert.open("알림", res.errMsg);
							}							
						} else {
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status) {
					}
				});
	}());
	/** ********* OpenAPI 산업체분류 End ********* */	
	/** ********* OpenAPI 생활권역 설정정보 Start ********* */
	(function() {
		$class("sop.portal.SettingInfo.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						if (res.errCd == "0") {							
							if(options.params.workGb == "recmd"){
								$catchmentAreaLeftMenu.ui.setRecmdList(res, options);
							}else if(options.params.workGb == "lifeBiz"){
								$catchmentAreaLeftMenu.ui.setLifeBizList(res, options);
							}
						} else if (res.errCd == "-401") {
							accessTokenInfo(function() {
								$catchmentAreaMainApi.request.getSettingInfo(options.params);
							});
						} else if (res.errCd == "-100") {
							//							
						} else {
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status) {
					}
				});
	}());
	/** ********* OpenAPI 생활권역 설정정보 End ********* */	
	
	//SGIS4_생활권역 끝
	
	// SGIS4_1025_생활권역_임의영역 시작
	/** ********* 생활권역 임의값 범위정보 Start ********* */
	(function() {
		$class("sop.portal.ScopeInfo.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
//						alert('res.result.list; : ' + JSON.stringify(res.result.list));
						if (res.errCd == "0") {							
								$catchmentAreaLeftMenu.ui.setScopeInfo(res, options);
						} else if (res.errCd == "-401") {
//							accessTokenInfo(function() {
//								$catchmentAreaMainApi.request.getSettingInfo(options.params);
//							});
						} else if (res.errCd == "-100") {
							//							
						} else {
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status) {
					}
				});
	}());
	/** ********* 생활권역 임의값 범위정보 End ********* */	
	// SGIS4_1025_생활권역_임의영역 끝
	//SGIS4_1025_생활권역 시작
	/*********** 특성별 총값 통계정보 조회 Start **********/
	(function() {
		$class("sop.portal.getCharacteristicsTotStats.api").extend(gis.service.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						$catchmentAreaMask.endUnitWork(options.params.identifier);
						switch (parseInt(res.errCd)) {
							case 0:
								var result  = res.result;
								var resultOpt = options.params;
								
								//일단 인구 주택만 해당
								if(result.hasOwnProperty('pops')){
									$catchmentAreaDataBoard.ui.setChkDetailAllData('pops', resultOpt, result.pops_class);
								}else if(result.hasOwnProperty('house')){
									$catchmentAreaDataBoard.ui.setChkDetailAllData('house', resultOpt, result.house_class);
								}							
								break;
							case -401:
								accessTokenInfo(function() {
									$catchmentAreaMainApi.request.getCharacteristicsTotStats(options.params);
								});
								break;
						}
					},
					onFail : function(status, options) {
						
						$catchmentAreaMask.endUnitWork(options.params.identifier);
					}
				});
	}());
	/*********** 특성별 총값 통계정보 조회 End **********/
	//SGIS4_1025_생활권역 끝
}(window, document));