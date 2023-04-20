/**
 * 인터랙티브맵 화면에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2014/08/29  초기 작성
 * author : 권차욱, 김성현, 석진혁
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$totSurvDetailMapApi = W.$totSurvDetailMapApi || {};
		
	$totSurvDetailMapApi.census_result_data = [];
	$totSurvDetailMapApi.region_cd = "";
	
	
	$totSurvDetailMapApi = {
			loadingBar : {
				loadCnt : 0,
				closeCnt : 0,
				show : function (type) {
					this.loadCnt += 1;
					if ($( "#loadingbar" ).length != null && $( "#loadingbar" ).length > 0) {
						return;
					}
					this.blockUI = document.createElement("DIV");
					this.blockUI.setAttribute("id", "loadingbar");
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
					
					var errorMsg = null;
					switch(type) {
						case 1:
							this.popupUI.style.backgroundColor = "rgb(255, 255, 255)";
							this.popupUI.style.border = "3px solid rgb(0,0,0)";
							errorMsg = "<p>데이터 로딩중입니다. 잠시만 기다려주세요.</p>";
							break;
						case 2:
							errorMsg = "<img src='/img/common/loding_type01.gif'/>";
							break;
					}
					this.popupUI.innerHTML = errorMsg;
					document.body.appendChild(this.popupUI);
				},
				close : function () {
					this.closeCnt += 1;
//					if (this.loadCnt == this.closeCnt) {
						if (!sop.Util.isUndefined(this.blockUI)) {
							document.body.removeChild(this.blockUI);
							delete this.blockUI;
						}
						if (!sop.Util.isUndefined(this.popupUI)) {
							D.body.removeChild(this.popupUI);
							delete this.popupUI;
						}
						this.loadCnt = 0;
						this.closeCnt = 0;
//					}
					
				}
			}
	};
	
	
	
	$totSurvDetailMapApi.request = {
			
			API_0301_URL : "/OpenAPI3/stats/population.json",
			API_0302_URL : "/OpenAPI3/stats/innersearchpopulation.json",	//9월서비스 권차욱 api명 변경
			API_0303_URL : "/OpenAPI3/stats/industrycode.json",
			API_0304_URL : "/OpenAPI3/stats/company.json",
			API_0305_URL : "/OpenAPI3/stats/household.json",
			API_0306_URL : "/OpenAPI3/stats/house.json",
			API_0307_URL : "/OpenAPI3/stats/farmhousehold.json",
			API_0308_URL : "/OpenAPI3/stats/forestryhousehold.json",
			API_0309_URL : "/OpenAPI3/stats/fisheryhousehold.json",
			API_0310_URL : "/OpenAPI3/stats/householdmember.json",
			//2020년수정변경 시작: 4시군구 조회(ggm)
			//20200427 수정 시작 (ggm)
			API_0301_1_URL : "/ServiceAPI/OpenAPI3/stats/populationForBorough.json",
			API_0302_1_URL : "/ServiceAPI/OpenAPI3/stats/innersearchpopulationForBorough.json",    	// 인구
			API_0304_1_URL : "/ServiceAPI/OpenAPI3/stats/companyForBorough.json",
			API_0305_1_URL : "/ServiceAPI/OpenAPI3/stats/householdForBorough.json",					// 가구
			API_0306_1_URL : "/ServiceAPI/OpenAPI3/stats/houseForBorough.json",
			API_0307_1_URL : "/ServiceAPI/OpenAPI3/stats/farmhouseholdForBorough.json",
			API_0308_1_URL : "/ServiceAPI/OpenAPI3/stats/forestryhouseholdForBorough.json",
			API_0309_1_URL : "/ServiceAPI/OpenAPI3/stats/fisheryhouseholdForBorough.json",
			API_0310_1_URL : "/ServiceAPI/OpenAPI3/stats/householdmemberForBorough.json",			//20200417 수정 (ggm)
			//20200427 수정 끝
			//2020년수정변경 끝			
			API_FUSION_URL : "/ServiceAPI/stats/fusionstats.json",
			
			GRID_LEGEND_0301_URL : "/OpenAPI3/stats/gridlegend.json",
			
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
					
					 var errorMsg = "<p>데이터 로딩중입니다. 잠시만 기다려주세요.</p>";
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
			 * @name         : openApiTotalPopulation
			 * @description  : OpenAPI 인구통계총괄 정보를 조회한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 */
			openApiTotalPopulation : function(params) {
				console.log("[totSurvMapApi.js] openApiTotalPopulation() 호출");
				console.log(params);
				
				var sopOpenApiTotalPopulationObj = new sop.openApi.totalPopulation.api();
				sopOpenApiTotalPopulationObj.addParam("accessToken", accessToken);
				
				// 시도 
				sopOpenApiTotalPopulationObj.addParam("adm_cd", "25030");
				// 선택된 년도 설정
				sopOpenApiTotalPopulationObj.addParam("year", $totSurvDetail.ui.bndYear);
				// 년도 TODO
				sopOpenApiTotalPopulationObj.addParam("bnd_year", "2019");
				// 구분
				sopOpenApiTotalPopulationObj.addParam("gender", "0");
				// 공통 // 기본 ???
				sopOpenApiTotalPopulationObj.addParam("low_search", "1");
				sopOpenApiTotalPopulationObj.addParam("area_type", "0");				
				
				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				
				console.log("---------------------");
				console.log(sopOpenApiTotalPopulationObj);
				console.log("---------------------");
				
				sopOpenApiTotalPopulationObj.request({
					method : "GET",
					async : async, //9월 서비스
					url : contextPath + "/ServiceAPI/OpenAPI3/stats/innersearchpopulationForBorough.json",
					options : {
						url : "/ServiceAPI/OpenAPI3/stats/innersearchpopulationForBorough.json",
					}
				});	
			},
			
			
			/**
			 * 
			 * @name         : gridLegendTotalPopulation
			 * @description  : 그리드 범례 인구통계총괄 정보를 조회한다.
			 *                 각 서비스별로 만들려고 하다가 그럴 필요없이 여기서 params.api_id를 넘겨서
			 *                 하나의 서블릿에서 처리하려한다.
			 * @date         : 2017. 7. 27. 
			 * @author	     : 
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 */
			gridLegendTotalPopulation : function(params) {
				
				console.log("[interactiveMapApi.js] gridLegendTotalPopulation() 호출");
				
				var gridLegendTotalPopulationObj = new sop.openApi.gridLegendTotalPopulation.api();
				gridLegendTotalPopulationObj.addParam("accessToken", accessToken);
				
				gridLegendTotalPopulationObj.addParam("zoom", params.map.zoom);
				
				var year = "";
				var age_from = "";
				var age_to = "";
				var gender = "";
				var household_type = ""; //세대구성
				var house_type = ""; //주택유형
				var house_use_prid_cd = ""; //노후년수
				var house_area_cd = ""; //연면적
				var const_year = ""; //건축년도
				
				for (var i = 0; i < params.param.length; i++) {
					if(params.param[i].key == 'year'){
						year =  params.param[i].value;
						gridLegendTotalPopulationObj.addParam("year", year);
					}
					if(params.param[i].key == 'age_from'){
						age_from =  params.param[i].value;
						gridLegendTotalPopulationObj.addParam("age_from", age_from);
					}
					if(params.param[i].key == 'age_to'){
						age_to =  params.param[i].value;
						gridLegendTotalPopulationObj.addParam("age_to", age_to);
					}
					if(params.param[i].key == 'gender'){
						gender =  params.param[i].value;
						gridLegendTotalPopulationObj.addParam("gender", gender);
					}
					if(params.param[i].key == 'household_type'){
						household_type =  params.param[i].value;
						gridLegendTotalPopulationObj.addParam("household_type", household_type);
					}
					if(params.param[i].key == 'house_type'){
						house_type =  params.param[i].value;
						gridLegendTotalPopulationObj.addParam("house_type", house_type);
					}
					if(params.param[i].key == 'house_use_prid_cd'){
						house_use_prid_cd =  params.param[i].value;
						gridLegendTotalPopulationObj.addParam("house_use_prid_cd", house_use_prid_cd);
					}
					if(params.param[i].key == 'house_area_cd'){
						house_area_cd =  params.param[i].value;
						gridLegendTotalPopulationObj.addParam("house_area_cd", house_area_cd);
					}
					if(params.param[i].key == 'const_year'){
						const_year =  params.param[i].value;
						gridLegendTotalPopulationObj.addParam("const_year", const_year);
					}
				}
				
				gridLegendTotalPopulationObj.addParam("what_service", params.api_id);
				
				
				//=================== apiLogWrite start ======================
				var logAreaCode = params.map.curSidoCd+params.map.curSiggCd;
				var logAreaNm = params.map.curSidoNm + params.map.curSiggNm;
				var logThemeCd = params.api_id;
				var logYear = year;
				var logParam = "areaCode=" +logAreaCode + "&themeCd=" + logThemeCd + "&year=" + logYear;
				
				apiLogWrite2("A0", "A31", "그리드", logParam, "00", logAreaNm);
				//=================== apiLogWrite end =========================
								
				//=============== 이 부분은 총조사 주요지표만 해당되는듯하다. ============
				//코딩한지가 좀 되서 기억이 잘 나지는 않는데 범례값을 가져오는 부분에서 메뉴 구분은
				//what_service로 해야할 듯 하다.
				//what_service가 API_0301(총조사 주요지표), API_0302(인구), API_0304(전국사업체조사) 등등...
				//사업체의 경우 뒷단 서비스 값을 불러오는 부분은 전산업일 경우 총조사 주요지표를 사용한다.
				//그리드의 경우 무조건 전산업이므로 사업체는 총조사 주요지표의 뒷단 로직을 사용하는것으로 간주하면 될듯
				var title_cd = "1";
				
				if(params.title == "총인구") {
					title_cd = "1";
				} else if(params.title == "가구") {
					title_cd = "2";
				} else if(params.title == "평균 가구원") {
					title_cd = "3";
				} else if(params.title == "주택") {
					title_cd = "4";
				} else if(params.title == "사업체수") {
					title_cd = "5";
				} else if(params.title == "종사자수") {
					title_cd = "6"; //테스트를 위하여 일단 1로 세팅한다.추후 6으로 변경요망
				}
				gridLegendTotalPopulationObj.addParam("title", title_cd);
				//==================================
				
				var async = false;
				
				gridLegendTotalPopulationObj.request({
					method : "GET",
					async : async,
					url : openApiPath + this.GRID_LEGEND_0301_URL,
					options : {
						params : params,
						url : this.GRID_LEGEND_0301_URL,
					}
				});
			
			},
			
			
			/**
			 * 
			 * @name         : openApiSearchPopulation
			 * @description  : OpenAPI 인구통계세부조건 정보를 조회한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 */
			openApiSearchPopulation : function(region_cd) {
				console.log("openApiSearchPopulation  [ region_cd = " + region_cd + "]");
				
				console.log("----------------------------------------------------------");
				console.log("region_cd  = " + region_cd);
				console.log("selectArea = " + $totSurvMain.ui.selectedArea);
				console.log("----------------------------------------------------------");
				
				// hshs
				var sopOpenApiSearchPopulationObj = new sop.openApi.searchPopulation.api();
				sopOpenApiSearchPopulationObj.addParam("accessToken", accessToken);
				
				$totSurvDetailMapApi.region_cd = region_cd;
				// 시도 
				sopOpenApiSearchPopulationObj.addParam("adm_cd", region_cd);
				// 선택된 년도 설정
				sopOpenApiSearchPopulationObj.addParam("year", $totSurvDetail.ui.bndYear);
				// 년도 TODO
				sopOpenApiSearchPopulationObj.addParam("bnd_year", "2019");
				// 구분
				sopOpenApiSearchPopulationObj.addParam("gender", "0");
				// 공통 // 기본 ???
				sopOpenApiSearchPopulationObj.addParam("low_search", "1");
				sopOpenApiSearchPopulationObj.addParam("area_type", "0");
								
				var async = false;
				
				sopOpenApiSearchPopulationObj.request({
					method : "GET",
					async : async, //9월 서비스
					url : contextPath + this.API_0302_1_URL,		//20200427 수정 (ggm)
					options : {
						url : this.API_0302_1_URL,
					}
				});	
				
			},

			
			/**
			 * 
			 * @name         : openApiHouseHold
			 * @description  : OpenAPI 가구통계 정보를 조회한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 */
			openApiHouseHold : function(region_cd) {
				
				console.log("----------------------------------------------------------");
				console.log("region_cd = " + region_cd);
				console.log("selectArea = " + $totSurvMain.ui.selectedArea);
				console.log("----------------------------------------------------------");
				
				var sopOpenApiHouseHoldObj = new sop.openApi.houseHold.api();
				sopOpenApiHouseHoldObj.addParam("accessToken", accessToken);
				
				$totSurvDetailMapApi.region_cd = region_cd;
				// 시도 
				sopOpenApiHouseHoldObj.addParam("adm_cd", region_cd);
				// 선택된 년도 설정
				sopOpenApiHouseHoldObj.addParam("year", $totSurvDetail.ui.bndYear);
				// 년도 TODO
				sopOpenApiHouseHoldObj.addParam("bnd_year", "2019");
				// 공통 // 기본 ???
				sopOpenApiHouseHoldObj.addParam("low_search", "1");
				sopOpenApiHouseHoldObj.addParam("area_type", "0");
				
				var async = false;

				sopOpenApiHouseHoldObj.request({
					method : "GET",
					async : async,	//9월 서비스
					url : contextPath + "/ServiceAPI/OpenAPI3/stats/householdForBorough.json",	//20200427 수정 (ggm)
					options : {
						url : "/ServiceAPI/OpenAPI3/stats/householdForBorough.json",
					}
				});					
			},

			
			/**
			 * 
			 * @name         : openApiHouseHoldMember
			 * @description  : OpenAPI 가구원통계 정보를 조회한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 */
			openApiHouseHoldMember : function(region_cd) {
				var sopOpenApiHouseHoldMemberObj = new sop.openApi.houseHoldMember.api();
				sopOpenApiHouseHoldMemberObj.addParam("accessToken", accessToken);
				
				var isBndYear = false;
				for (var i = 0; i < params.param.length; i++) {
					if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){
						
					}else{
						sopOpenApiHouseHoldMemberObj.addParam(params.param[i].key, params.param[i].value);
					}
					if (params.param[i].key == "bnd_year") {
						params.param[i].value = params.map.bnd_year;
						isBndYear = true;
					}
				}
				
				if (!isBndYear) {
					params.param.push({key:"bnd_year", value:params.map.bnd_year});
				}

				if ( params.adm_cd != "00") {
					sopOpenApiHouseHoldMemberObj.addParam("adm_cd", params.adm_cd);
				}
				sopOpenApiHouseHoldMemberObj.addParam("bnd_year", params.map.bnd_year);
				
				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				
				//20200417 수정 시작 (ggm)
				if($interactiveMap.ui.chkIfInteractive() && !params.map.isInnerMapShow2 && !params.map.isInnerMapShow3 && (params.is_zoom_lvl4 == "Y" || params.is_non_self == "Y")){
					sopOpenApiHouseHoldMemberObj.addParam("is_zoom_lvl4", params.is_zoom_lvl4);			//4시군구 처리용
					sopOpenApiHouseHoldMemberObj.addParam("is_non_self", params.is_non_self);			//4시군구 처리용
					sopOpenApiHouseHoldMemberObj.request({
						method : "GET",
						async : async,	//9월 서비스
						url : contextPath + this.API_0310_1_URL,	//20200427 수정 (ggm)
						options : {
							url : this.API_0310_1_URL,
						}
					});			
				}else{
					sopOpenApiHouseHoldMemberObj.request({
						method : "GET",
						async : async,	//9월 서비스
						url : openApiPath + this.API_0310_URL,
						options : {
							url : this.API_0310_URL,
						}
					});
				}
				//20200417 수정 끝
			},

			
			/**
			 * 
			 * @name         : openApiSearchPopulation
			 * @description  : OpenAPI 주택통계세부조건 정보를 조회한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 */
			openApiSearchHouse : function(region_cd) {
				console.log("openApiSearchHouse  [ region_cd = " + region_cd + "]");
				
				console.log("----------------------------------------------------------");
				console.log("region_cd  = " + region_cd);
				console.log("selectArea = " + $totSurvMain.ui.selectedArea);
				console.log("----------------------------------------------------------");
				
				// hshs
				var sopOpenApiSearchHouseObj = new sop.openApi.searchHouse.api();
				sopOpenApiSearchHouseObj.addParam("accessToken", accessToken);
				
				$totSurvDetailMapApi.region_cd = region_cd;
				// 시도 
				sopOpenApiSearchHouseObj.addParam("adm_cd", region_cd);
				// 선택된 년도 설정
				sopOpenApiSearchHouseObj.addParam("year", $totSurvDetail.ui.bndYear);
				// 년도 TODO
				sopOpenApiSearchHouseObj.addParam("bnd_year", "2019");
				// 구분
				sopOpenApiSearchHouseObj.addParam("gender", "0");
				// 공통 // 기본 ???
				sopOpenApiSearchHouseObj.addParam("low_search", "1");
				sopOpenApiSearchHouseObj.addParam("area_type", "0");
				
				var async = false;
				
				sopOpenApiSearchHouseObj.request({
					method : "GET",
					async : async, //9월 서비스
					url : contextPath + "/ServiceAPI/OpenAPI3/stats/houseForBorough.json",		//20200427 수정 (ggm)
					options : {
						url :"/ServiceAPI/OpenAPI3/stats/houseForBorough.json",
					}
				});	
				
			},
			
			
			/**
			 * 
			 * @name         : openApiFarmHouseHold
			 * @description  : OpenAPI 농가통계 정보를 조회한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 */
			openApiFarmHouseHold : function(region_cd) {
				var sopOpenApiFarmHouseHoldObj = new sop.openApi.FarmHouseHold.api();
				sopOpenApiFarmHouseHoldObj.addParam("accessToken", accessToken);
				
				$totSurvDetailMapApi.region_cd = region_cd;
				
				// 시도 
				sopOpenApiFarmHouseHoldObj.addParam("adm_cd", region_cd);
				// 선택된 년도 설정
				sopOpenApiFarmHouseHoldObj.addParam("year", $totSurvDetail.ui.bndYear);
				// 년도 TODO
				sopOpenApiFarmHouseHoldObj.addParam("bnd_year", "2019");
				// 공통 // 기본 ???
				sopOpenApiFarmHouseHoldObj.addParam("low_search", "1");
				sopOpenApiFarmHouseHoldObj.addParam("area_type", "0");
				
				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;

				sopOpenApiFarmHouseHoldObj.request({
					method : "GET",
					async : async,	//9월 서비스
					url : contextPath + "/ServiceAPI/OpenAPI3/stats/farmhouseholdForBorough.json",
					options : {
//						params : params,
						url : "/ServiceAPI/OpenAPI3/stats/farmhouseholdForBorough.json",
					}
				});					
			},

			
			/**
			 * 
			 * @name         : openApiForestryHouseHold
			 * @description  : OpenAPI 임가통계 정보를 조회한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 */
			openApiForestryHouseHold : function(region_cd) {
				var sopOpenApiForestryHouseHoldObj = new sop.openApi.ForestryHouseHold.api();
				sopOpenApiForestryHouseHoldObj.addParam("accessToken", accessToken);
				
				$totSurvDetailMapApi.region_cd = region_cd;
				
				// 시도 
				sopOpenApiForestryHouseHoldObj.addParam("adm_cd", region_cd);
				// 선택된 년도 설정
				sopOpenApiForestryHouseHoldObj.addParam("year", $totSurvDetail.ui.bndYear);
				// 년도 TODO
				sopOpenApiForestryHouseHoldObj.addParam("bnd_year", "2019");
				// 공통 // 기본 ???
				sopOpenApiForestryHouseHoldObj.addParam("low_search", "1");
				sopOpenApiForestryHouseHoldObj.addParam("area_type", "0");
				
				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;

				sopOpenApiForestryHouseHoldObj.request({
					method : "GET",
					async : async,	//9월 서비스
					url : contextPath + "/ServiceAPI/OpenAPI3/stats/forestryhouseholdForBorough.json",
					options : {
						url : "/ServiceAPI/OpenAPI3/stats/forestryhouseholdForBorough.json",
					}
				});
			},

			
			/**
			 * 
			 * @name         : openApiFisheryHouseHold
			 * @description  : OpenAPI 어가통계 정보를 조회한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 */
			openApiFisheryHouseHold : function(region_cd, oga_div) {
				var sopOpenApiFisheryHouseHoldObj = new sop.openApi.FisheryHouseHold.api();
				sopOpenApiFisheryHouseHoldObj.addParam("accessToken", accessToken);
				
				$totSurvDetailMapApi.region_cd = region_cd;
				
				// 내수면어가 1: 해수면어가 :2
				sopOpenApiFisheryHouseHoldObj.addParam("oga_div", oga_div);
				// 시도 (보령시)
				sopOpenApiFisheryHouseHoldObj.addParam("adm_cd", region_cd);
				// 선택된 년도 설정
				sopOpenApiFisheryHouseHoldObj.addParam("year", $totSurvDetail.ui.bndYear);
				// 년도 TODO
				sopOpenApiFisheryHouseHoldObj.addParam("bnd_year", "2019");
				// 공통 // 기본 ???
				sopOpenApiFisheryHouseHoldObj.addParam("low_search", "1");
				sopOpenApiFisheryHouseHoldObj.addParam("area_type", "0");
				
				var async = false;

				sopOpenApiFisheryHouseHoldObj.request({
					method : "GET",
					async : async,	//9월 서비스
					url : contextPath + "/ServiceAPI/OpenAPI3/stats/fisheryhouseholdForBorough.json",
					options : {
						url : "/ServiceAPI/OpenAPI3/stats/fisheryhouseholdForBorough.json",
					}
				});					
			},
			
			/**
			 * 
			 * @name         : openApiHouse
			 * @description  : OpenAPI 주택통계 정보를 조회한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 */
			openApiHouse : function(region_cd) {
				
				var sopOpenApiHouseObj = new sop.openApi.House.api();
				sopOpenApiHouseObj.addParam("accessToken", accessToken);
				$totSurvDetailMapApi.region_cd = region_cd;
				// 시도 
				sopOpenApiHouseObj.addParam("adm_cd", region_cd);
				// 선택된 년도 설정
				sopOpenApiHouseObj.addParam("year", $totSurvDetail.ui.bndYear);
				
				sopOpenApiHouseObj.addParam("bnd_year", "2019");
				// 공통 // 기본 ???
				sopOpenApiHouseObj.addParam("low_search", "1");
				sopOpenApiHouseObj.addParam("area_type", "0");
				
				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				
				sopOpenApiHouseObj.request({
					method : "GET",
					async : async,	//9월 서비스
					url : contextPath + this.API_0306_1_URL,	//20200427 수정 (ggm)
					options : {
						url : this.API_0306_1_URL,
					}
				});					
			},
					
			/**
			 * 
			 * @name         : setStatsDataPopulation
			 * @description  : 인구 결과 표시
			 * @date         : 2020. 09. 10. 
			 * @author	     : 
			 * @history 	 :
			 * @param @param res
			 * @param @param options
			 */
			setStatsDataPopulation : function (res, options, isContry) {
				console.log("[totSurvMapApi.js] setStatsDataPopulation() 호출");
				console.log("----------------------------------------------------------");
				console.log("region_cd  = " + $totSurvDetailMapApi.region_cd);
				console.log("selectArea = " + $totSurvMain.ui.selectedArea);
				console.log("----------------------------------------------------------");
				
				
				var result = res.result;
				//var map = params.map;
				var map = $totSurvDetailMap.ui.map;
				
				console.log("result = " + result);
				console.log("result 2 = " + JSON.stringify(result));
				
				map.clearLayer();
				map.multiLayerControl.clear();
				
				if (map.geojson != null) {
					map.geojson.remove();
					map.geojson = null;
				}
				
				// hshs TODO : 선택된 코드로 변경
				var lv_unit = "명";
				$totSurvDetailMap.ui.map.setStatsData("normal", {"pAdmCd": $totSurvDetailMapApi.region_cd, "result" : result}, "population", lv_unit);
				
				//경계 그리기
				if($totSurvDetailMapApi.region_cd.length == 5){
					var lv_region = "emdong";					
				} else {
					var lv_region = "totreg";
				}
				// 선택된 년도 설정
				var year = $totSurvDetail.ui.bndYear;
				$totSurvDetailMap.ui.setTotSurvOpenApiRegion($totSurvDetailMap.ui.map, lv_region, year, $totSurvDetailMapApi.region_cd, "", "", function() {
				});
				
				
			},
			
			/**
			 * 
			 * @name         : setStatsDataHouseHold
			 * @description  : 가구 결과 표시
			 * @date         : 2020. 09. 10. 
			 * @author	     : 
			 * @history 	 :
			 * @param @param res
			 * @param @param options
			 */
			setStatsDataHouseHold : function (res, options, isContry) {
				
				console.log("[totSurvMapApi.js] setStatsDataHouseHold() 호출");
				
				var result = res.result;
				var map = $totSurvDetailMap.ui.map;
				
				console.log("result 2 = " + JSON.stringify(result));
				
				map.clearLayer();
				map.multiLayerControl.clear();
				
				if (map.geojson != null) {
					map.geojson.remove();
					map.geojson = null;
				}
				
				// hshs TODO : 선택된 코드로 변경
				var lv_unit = "가구";
				$totSurvDetailMap.ui.map.setStatsData("normal", {"pAdmCd": $totSurvDetailMapApi.region_cd, "result" : result}, "household_cnt", lv_unit);
				
				//경계 그리기
				if($totSurvDetailMapApi.region_cd.length == 5){
					var lv_region = "emdong";					
				} else {
					var lv_region = "totreg";
				}
				var year = "2018";
				$totSurvDetailMap.ui.setTotSurvOpenApiRegion($totSurvDetailMap.ui.map, lv_region, year, $totSurvDetailMapApi.region_cd, "", "", function() {
				});
				
			},
			
			/**
			 * 
			 * @name         : setStatsDataHouse
			 * @description  : 주택 결과 표시
			 * @date         : 2020. 09. 10. 
			 * @author	     : 
			 * @history 	 :
			 * @param @param res
			 * @param @param options
			 */
			setStatsDataHouse : function (res, options, isContry) {
				
				console.log("[totSurvMapApi.js] setStatsDataHouse() 호출");
				
				var result = res.result;
				var map = $totSurvDetailMap.ui.map;
				
				console.log("result 2 = " + JSON.stringify(result));
				
				map.clearLayer();
				map.multiLayerControl.clear();
				
				if (map.geojson != null) {
					map.geojson.remove();
					map.geojson = null;
				}
				
				// hshs TODO : 선택된 코드로 변경
				var lv_unit = "호";
				$totSurvDetailMap.ui.map.setStatsData("normal", {"pAdmCd": $totSurvDetailMapApi.region_cd, "result" : result}, "house_cnt", lv_unit);
				
				//경계 그리기
				if($totSurvDetailMapApi.region_cd.length == 5){
					var lv_region = "emdong";					
				} else {
					var lv_region = "totreg";
				}
				var year = "2018";
				$totSurvDetailMap.ui.setTotSurvOpenApiRegion($totSurvDetailMap.ui.map, lv_region, year, $totSurvDetailMapApi.region_cd, "", "", function() {
				});
				
			},
			
			/**
			 * 
			 * @name         : setStatsDataFarmHouseHold
			 * @description  : 농가 결과 표시
			 * @date         : 2020. 09. 10. 
			 * @author	     : 
			 * @history 	 :
			 * @param @param res
			 * @param @param options
			 */
			setStatsDataFarmHouseHold : function (res, options, isContry) {
				
				console.log("[totSurvMapApi.js] setStatsDataFarmHouseHold() 호출");
				
				var result = res.result;
				var map = $totSurvDetailMap.ui.map;
				
				console.log("result 2 = " + JSON.stringify(result));
				
				map.clearLayer();
				map.multiLayerControl.clear();
				
				if (map.geojson != null) {
					map.geojson.remove();
					map.geojson = null;
				}
				
				// hshs TODO : 선택된 코드로 변경
				var lv_unit = "가구";
				$totSurvDetailMap.ui.map.setStatsData("normal", {"pAdmCd": $totSurvDetailMapApi.region_cd, "result" : result}, "farm_cnt", lv_unit);
				
				//경계 그리기
				if($totSurvDetailMapApi.region_cd.length == 5){
					var lv_region = "emdong";					
				} else {
					var lv_region = "totreg";
				}
				var year = "2018";
				$totSurvDetailMap.ui.setTotSurvOpenApiRegion($totSurvDetailMap.ui.map, lv_region, year, $totSurvDetailMapApi.region_cd, "", "", function() {
				});
				
			},
			
			/**
			 * 
			 * @name         : setStatsDataForestry
			 * @description  : 임가 결과 표시
			 * @date         : 2020. 09. 10. 
			 * @author	     : 
			 * @history 	 :
			 * @param @param res
			 * @param @param options
			 */
			setStatsDataForestry : function (res, options, isContry) {
				
				console.log("[totSurvMapApi.js] setStatsDataForestry() 호출");
				
				var result = res.result;
				var map = $totSurvDetailMap.ui.map;
				
				console.log("result 2 = " + JSON.stringify(result));
				
				map.clearLayer();
				map.multiLayerControl.clear();
				
				if (map.geojson != null) {
					map.geojson.remove();
					map.geojson = null;
				}
				
				// hshs TODO : 선택된 코드로 변경
				var lv_unit = "가구";
				$totSurvDetailMap.ui.map.setStatsData("normal", {"pAdmCd": $totSurvDetailMapApi.region_cd, "result" : result}, "forestry_cnt", lv_unit);
				
				//경계 그리기
				if($totSurvDetailMapApi.region_cd.length == 5){
					var lv_region = "emdong";					
				} else {
					var lv_region = "totreg";
				}
				var year = "2015";
				$totSurvDetailMap.ui.setTotSurvOpenApiRegion($totSurvDetailMap.ui.map, lv_region, year, $totSurvDetailMapApi.region_cd, "", "", function() {
				});
				
			},
			
			/**
			 * 
			 * @name         : setStatsFishery
			 * @description  : 어가(해수면) 결과 표시
			 * @date         : 2020. 09. 10. 
			 * @author	     : 
			 * @history 	 :
			 * @param @param res
			 * @param @param options
			 */
			setStatsFishery : function (res, options, isContry) {
				
				console.log("[totSurvMapApi.js] setStatsFishery() 호출");
				
				var result = res.result;
				var map = $totSurvDetailMap.ui.map;
				
				console.log("result 2 = " + JSON.stringify(result));
				
				map.clearLayer();
				map.multiLayerControl.clear();
				
				if (map.geojson != null) {
					map.geojson.remove();
					map.geojson = null;
				}
				
				// hshs TODO : 선택된 코드로 변경
				var lv_unit = "명";
				$totSurvDetailMap.ui.map.setStatsData("normal", {"pAdmCd": $totSurvDetailMapApi.region_cd, "result" : result}, "fishery_cnt", lv_unit);
				
				//경계 그리기
				if($totSurvDetailMapApi.region_cd.length == 5){
					var lv_region = "emdong";					
				} else {
					var lv_region = "totreg";
				}
				var year = "2015";
				$totSurvDetailMap.ui.setTotSurvOpenApiRegion($totSurvDetailMap.ui.map, lv_region, year, $totSurvDetailMapApi.region_cd, "", "", function() {
				});
				
			},
			
			/**
			 * 
			 * @name         : setMultiStatsData
			 * @description  : 
			 * @date         : 2015. 10. 29. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param res
			 * @param @param options
			 */
			setMultiStatsData : function (res, options, isContry) {
				var result = res.result;
				var params = options.params;
				var map = params.map;
				
				if (isContry != undefined && isContry) {
					res["pAdmCd"] = "";
				}else {
					res["pAdmCd"] = params.adm_cd;
				}
				
				//2016.03.29 수정, N/A일 경우, 데이터에서 제외
				var tmpResult = [];
				for (var i=0; i<result.length; i++) {
					if (map.selectedBoundMode == "multi") {
						if (map.selectedBoundList[0].feature.properties.adm_cd.length > 7) {
							var isPass = false;
							for (var k=0; k<map.selectedBoundList.length; k++) {
								if (result[i].adm_cd == map.selectedBoundList[k].feature.properties.adm_cd) {
									isPass = false;
									break;
								}else {
									isPass = true;
								}
							}
							if (isPass) {
								continue;
							}
						}
						
					}
					if (result[i][params.filter] != "N/A") {
						tmpResult.push(result[i]);
					}
				}
				res.result = tmpResult;
				
				//2016.03.30 수정, sort 추가
				//통계정보를 sort한다.
				if (res.result != null && res.result.length > 0) {
					res.result = res.result.sort(function(a, b) {
						return parseFloat(b[params.filter])-parseFloat(a[params.filter])
					});
				}
				
				map.drawControl.removeOverlay();
				map.multiLayerControl.setStatsData("normal", res, options, false);
				$interactiveMap.ui.updateSearchTitle(options.params.title, options.params.unit, map.id);
			},
			
			checkContryData : function(res, options, map) {
				var isContry = false;
				console.log("res = " + JSON.stringify(res));
				console.log("options = " + JSON.stringify(options));
				return isContry;
			}
			
	};

	
	/** ********* OpenAPI 인구주택총조사 Start ********* */
	(function() {
		$class("sop.openApi.searchPopulation.api").extend(sop.portal.absAPI)
		.define(
			{
				onSuccess : function(status, res, options) {
					var map = $totSurvDetailMap.ui.map;
					switch (parseInt(res.errCd)) {
						case 0:
							// 개방형지도 지역 선택 표출 및 class 추가
							$("#openAPIBtn").addClass("on");
							$("select[name='OpenAPISelectBox']").show();
							
							var isContry = $totSurvDetailMapApi.request.checkContryData(res, options, map);
							// 인구 읍면동 경계 조회 함수 
							$totSurvDetailMapApi.request.setStatsDataPopulation(res, options, isContry);
		    				
							break;
						case -401:
							accessTokenInfo(function() {
								$totSurvDetailMapApi.request.openApiSearchPopulation(options.params);
							});
							break;
						case -100:
							commonTotSurv_alert("검색결과가 존재하지 않습니다.");
							// 개방형지도 지역 선택 표출 및 class 추가
							$("#openAPIBtn").addClass("on");
							$("select[name='OpenAPISelectBox']").show();
							break;
						case -200:
							commonTotSurv_alert("개방형지도 정보가 없습니다.");
							// 개방형지도 지역 선택 숨김 및 class 삭제
							$("#openAPIBtn").removeClass("on");
							$("select[name='OpenAPISelectBox']").hide();
							break;
						default:
							$totSurvDetailMapApi.request.combineFailCnt++;
							map.clearDataOverlay();
							break;
					}
				},
				onFail : function(status, options) {
					var map = options.params.map;
					map.clearData();
				}
			});
	}());
	/** ********* OpenAPI 인구주택총조사 End ********* */

	
	/** ********* OpenAPI 가구통계검색 Start ********* */
	(function() {
		$class("sop.openApi.houseHold.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						var map = $totSurvDetailMap.ui.map;
						switch (parseInt(res.errCd)) {
							case 0:
								// 개방형지도 지역 선택 표출 및 class 추가
								$("#openAPIBtn").addClass("on");
								$("select[name='OpenAPISelectBox']").show();
								
								var isContry = $totSurvDetailMapApi.request.checkContryData(res, options, map);
								$totSurvDetailMapApi.request.setStatsDataHouseHold(res, options, isContry);
								
								break;
							case -401:
								accessTokenInfo(function() {
									$totSurvDetailMapApi.request.openApiHouseHold(options.params);
								});
								break;
							case -100:
								commonTotSurv_alert("검색결과가 존재하지 않습니다.");
								// 개방형지도 지역 선택 표출 및 class 추가
								$("#openAPIBtn").addClass("on");
								$("select[name='OpenAPISelectBox']").show();
								break;
							case -200:
								commonTotSurv_alert("개방형지도 정보가 없습니다.");
								// 개방형지도 지역 선택 숨김 및 class 삭제
								$("#openAPIBtn").removeClass("on");
								$("select[name='OpenAPISelectBox']").hide();
								break;
							default:
								$totSurvDetailMapApi.request.combineFailCnt++;
								map.clearDataOverlay();
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
	/** ********* OpenAPI 가구통계검색 End ********* */

	
	/** ********* OpenAPI 가구원통계검색 Start ********* */
	(function() {
		$class("sop.openApi.houseHoldMember.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						var map = $totSurvDetailMap.ui.map;
						switch (parseInt(res.errCd)) {
							case 0:
								// 개방형지도 지역 선택 표출 및 class 추가
								$("#openAPIBtn").addClass("on");
								$("select[name='OpenAPISelectBox']").show();
								var isContry = $totSurvDetailMapApi.request.checkContryData(res, options, map);
								if (map.selectedBoundMode == "multi") {
									$totSurvDetailMapApi.request.setMultiStatsData(res, options, isContry);		
								}else {
									$totSurvDetailMapApi.request.setStatsData(res, options, isContry);		
								}
								
								break;
							case -401:
								accessTokenInfo(function() {
									$totSurvDetailMapApi.request.openApiHouseHoldMember(options.params);
								});
								break;
							case -100:
								commonTotSurv_alert("검색결과가 존재하지 않습니다.");
								// 개방형지도 지역 선택 표출 및 class 추가
								$("#openAPIBtn").addClass("on");
								$("select[name='OpenAPISelectBox']").show();
								break;
							case -200:
								commonTotSurv_alert("개방형지도 정보가 없습니다.");
								// 개방형지도 지역 선택 숨김 및 class 삭제
								$("#openAPIBtn").removeClass("on");
								$("select[name='OpenAPISelectBox']").hide();
								break;
							default:
								$totSurvDetailMapApi.request.combineFailCnt++;
								map.clearDataOverlay();
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
	/** ********* OpenAPI 가구원통계검색 End ********* */

	
	/** ********* OpenAPI 농가통계검색 Start ********* */
	(function() {
		$class("sop.openApi.FarmHouseHold.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						var map = $totSurvDetailMap.ui.map;
						switch (parseInt(res.errCd)) {
							case 0:
								// 개방형지도 지역 선택 표출 및 class 추가
								$("#openAPIBtn").addClass("on");
								$("select[name='OpenAPISelectBox']").show();
								
								var isContry = $totSurvDetailMapApi.request.checkContryData(res, options, map);
								$totSurvDetailMapApi.request.setStatsDataFarmHouseHold(res, options, isContry);		
								
								break;
							case -401:
								accessTokenInfo(function() {
									$totSurvDetailMapApi.request.openApiFarmHouseHold(options.params);
								});
								break;
							case -100:
								commonTotSurv_alert("검색결과가 존재하지 않습니다.");
								// 개방형지도 지역 선택 표출 및 class 추가
								$("#openAPIBtn").addClass("on");
								$("select[name='OpenAPISelectBox']").show();
								break;
							case -200:
								commonTotSurv_alert("개방형지도 정보가 없습니다.");
								// 개방형지도 지역 선택 숨김 및 class 삭제
								$("#openAPIBtn").removeClass("on");
								$("select[name='OpenAPISelectBox']").hide();
								break;
							default:
								$totSurvDetailMapApi.request.combineFailCnt++;
								map.clearDataOverlay();
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
	/** ********* OpenAPI 농가통계검색 End ********* */

	
	/** ********* OpenAPI 임가통계검색 Start ********* */
	(function() {
		$class("sop.openApi.ForestryHouseHold.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						var map = $totSurvDetailMap.ui.map;
						switch (parseInt(res.errCd)) {
							case 0:
								// 개방형지도 지역 선택 표출 및 class 추가
								$("#openAPIBtn").addClass("on");
								$("select[name='OpenAPISelectBox']").show();
								
								var isContry = $totSurvDetailMapApi.request.checkContryData(res, options, map);
								$totSurvDetailMapApi.request.setStatsDataForestry(res, options, isContry);	
								
								break;
							case -401:
								accessTokenInfo(function() {
									$totSurvDetailMapApi.request.openApiForestryHouseHold(options.params);
								});
								break;
							case -100:
								commonTotSurv_alert("검색결과가 존재하지 않습니다.");
								// 개방형지도 지역 선택 표출 및 class 추가
								$("#openAPIBtn").addClass("on");
								$("select[name='OpenAPISelectBox']").show();
								break;
							case -200:
								commonTotSurv_alert("개방형지도 정보가 없습니다.");
								// 개방형지도 지역 선택 숨김 및 class 삭제
								$("#openAPIBtn").removeClass("on");
								$("select[name='OpenAPISelectBox']").hide();
								break;
							default:
								$totSurvDetailMapApi.request.combineFailCnt++;
								map.clearDataOverlay();
								break;
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
					}
				});
	}());
	/** ********* OpenAPI 임가통계검색 End ********* */

	
	/** ********* OpenAPI 어가통계검색 Start ********* */
	(function() {
		$class("sop.openApi.FisheryHouseHold.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						var map = $totSurvDetailMap.ui.map;
						switch (parseInt(res.errCd)) {
							case 0:
								// 개방형지도 지역 선택 표출 및 class 추가
								$("#openAPIBtn").addClass("on");
								$("select[name='OpenAPISelectBox']").show();
								
								var isContry = $totSurvDetailMapApi.request.checkContryData(res, options, map);
								$totSurvDetailMapApi.request.setStatsFishery(res, options, isContry);
								
								break;
							case -401:
								accessTokenInfo(function() {
									$totSurvDetailMapApi.request.openApiFisheryHouseHold(options.params);
								});
								break;
							case -100:
								commonTotSurv_alert("검색결과가 존재하지 않습니다.");
								// 개방형지도 지역 선택 표출 및 class 추가
								$("#openAPIBtn").addClass("on");
								$("select[name='OpenAPISelectBox']").show();
								break;
							case -200:
								commonTotSurv_alert("개방형지도 정보가 없습니다.");
								// 개방형지도 지역 선택 숨김 및 class 삭제
								$("#openAPIBtn").removeClass("on");
								$("select[name='OpenAPISelectBox']").hide();
								break;
							default:
								$totSurvDetailMapApi.request.combineFailCnt++;
								map.clearDataOverlay();
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
	/** ********* OpenAPI 어가통계검색 End ********* */
	
	/** ********* OpenAPI 주택분류 Start ********* */
	(function() {
		$class("sop.openApi.House.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {	
						var map = $totSurvDetailMap.ui.map;
						switch (parseInt(res.errCd)) {
							case 0:
								// 개방형지도 지역 선택 표출 및 class 추가
								$("#openAPIBtn").addClass("on");
								$("select[name='OpenAPISelectBox']").show();
								
								var isContry = $totSurvDetailMapApi.request.checkContryData(res, options, map);
								$totSurvDetailMapApi.request.setStatsDataHouse(res, options, isContry);		
								
								break;
							case -401:
								accessTokenInfo(function() {
									$totSurvDetailMapApi.request.openApiHouse(options.params);
								});
								break;
							case -100:
								if (map.selectedBoundMode == "multi") {
									res["result"] = [];
									$totSurvDetailMapApi.request.setMultiStatsData(res, options);	
								}else {
								}
								// 개방형지도 지역 선택 표출 및 class 추가
								$("#openAPIBtn").addClass("on");
								$("select[name='OpenAPISelectBox']").show();
								break;
							case -200:
								commonTotSurv_alert("개방형지도 정보가 없습니다.");
								// 개방형지도 지역 선택 숨김 및 class 삭제
								$("#openAPIBtn").removeClass("on");
								$("select[name='OpenAPISelectBox']").hide();
								break;
							default:
								$totSurvDetailMapApi.request.combineFailCnt++;
								map.clearDataOverlay();
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
	/** ********* OpenAPI 주택분류 End ********* */
	
}(window, document));
