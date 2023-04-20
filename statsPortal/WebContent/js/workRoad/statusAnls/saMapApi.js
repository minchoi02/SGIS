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
	W.$saMapApi = W.$saMapApi || {};

	//$saMapApi.grid_legend_new = [[]]; //그리드의 범례 데이터 세팅 mng_s

	$saMapApi.request = {

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
			API_FUSION_URL : "/ServiceAPI/stats/fusionstats.json",
			API_USERAREA_URL : "/ServiceAPI/map/userAreaBoundInfo.geojson",

			GRID_LEGEND_0301_URL : "/OpenAPI3/stats/gridlegend.json",

			combineFailCnt : 0,

			//9월 서비스
			mask : {
				show : function () {
					$workRoad.ui.addFnc03List("$saMapApi.request.mask.show");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
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
					$workRoad.ui.addFnc03List("$saMapApi.request.mask.close");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
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
			 * @name         : openApiWorkData
			 * @description  : OpenAPI 구인자료현황 정보를 조회한다.
			 * @date         : 2018. 10. 09.
			 * @author	     : 현재훈
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 */
			openApiWorkData : function(params) {// used
				$workRoad.ui.log("$saMapApi.request.openApiWorkData - begin");

				console.log("[saMapApi.js] openApiWorkData filterParam : " + params.filter);
				var sopOpenApiWorkDataObj = new sop.openApi.sa.workData.api();
				sopOpenApiWorkDataObj.addParam("accessToken", accessToken);

				var isBndYear = false;
				for (var i = 0; i < params.param.length; i++) {
					if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){

					}else{
						//console.log("[saMapApi.js] sopOpenApiWorkDataObj.addParam key / value : "+params.param[i].key + " / " + params.param[i].value);
						sopOpenApiWorkDataObj.addParam(params.param[i].key, params.param[i].value);
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
					sopOpenApiWorkDataObj.addParam("adm_cd", params.adm_cd);
				}
				sopOpenApiWorkDataObj.addParam("bnd_year", params.map.bnd_year);


				//mng_s kimjoonha grid 그리드에서 호출하였을 경우
				if(params.map.isInnerMapShow2) {
					sopOpenApiWorkDataObj.addParam("adm_cd", "11010"); //그리드일경우 임의의 값 세팅(않하면 에러가 나서...)
					var area = "";
					area = 'RECTANGLE(';
					area += params.map.bounds._southWest.x + ' ' + params.map.bounds._southWest.y + ',';
					area += params.map.bounds._northEast.x + ' ' + params.map.bounds._northEast.y;
					area += ')';
					sopOpenApiWorkDataObj.addParam("area", area);
					sopOpenApiWorkDataObj.addParam("zoom", params.map.zoom);
				}

				//mng_s kimjoonha bnd_grid 행정구역 그리드에서 호출하였을 경우
				if(params.map.isInnerMapShow3) {
					var bnd_grid = "bnd_grid";
					sopOpenApiWorkDataObj.addParam("bnd_grid", bnd_grid);
					sopOpenApiWorkDataObj.addParam("zoom", params.map.zoom);
					sopOpenApiWorkDataObj.addParam("adm_cd", encodeURIComponent(params.adm_cd));
				}

				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				if (params.async != undefined && params.async) {
					async = params.async;
				}

				// get URL
				var contextUrl = "";
				if(params.filter == "indust_class"){
					contextUrl = "/ServiceAPI/workRoad/statusAnls/getStatusAnlsIndustryClass.json";
				}else if(params.filter == "rcrit_jssfc"){
					contextUrl = "/ServiceAPI/workRoad/statusAnls/getStatusAnlsJobClass.json";
				}else if(params.filter == "entrprs_type"){
					contextUrl = "/ServiceAPI/workRoad/statusAnls/getStatusAnlsEnterpriseType.json";
				}else if(params.filter == "emplym_type"){
					contextUrl = "/ServiceAPI/workRoad/statusAnls/getStatusAnlsEmploymentType.json";
				}else if(params.filter == "wage_type"){
					contextUrl = "/ServiceAPI/workRoad/statusAnls/getStatusAnlsWageType.json";
				}else if(params.filter == "acdmcr"){
					contextUrl = "/ServiceAPI/workRoad/statusAnls/getStatusAnlsEducationLevel.json";
				}else if(params.filter == "career"){
					contextUrl = "/ServiceAPI/workRoad/statusAnls/getStatusAnlsCareerLevel.json";
				//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
				}else if(params.filter == "status_anls_all"){
					contextUrl = "/ServiceAPI/workRoad/statusAnls/getStatusAnlsAll.json";
					//2019-08-19 [김남민] 일자리 맵 > 구인 현황분석 > 통계 조회 원복. START
					for(var i = 0; i < params.param.length; i++) {
						var lvTempKey = params.param[i].key;
						var lvTempValue = params.param[i].value;
						/** 2021.06.02[hjh] 월평균자료 조회 기능 추가 START */
						if(lvTempKey == "month") { // 월별
							params.filter = "indust_class";
							contextUrl = "/ServiceAPI/workRoad/statusAnls/getStatusAnlsMnby.json";
							sopOpenApiWorkDataObj.removeParam(lvTempKey);
							params.param.splice(i,1);
							i--;
						}
						/** 2021.06.02[hjh] 월평균자료 조회 기능 추가 END */
						if(lvTempKey == "industClassAllYn") { // 업종
							params.filter = "indust_class";
							contextUrl = "/ServiceAPI/workRoad/statusAnls/getStatusAnlsIndustryClass.json";
							sopOpenApiWorkDataObj.removeParam(lvTempKey);
							params.param.splice(i,1);
							i--;
						}
						if(lvTempKey == "jobClassAllYn") { // 직종
							params.filter = "rcrit_jssfc";
							contextUrl = "/ServiceAPI/workRoad/statusAnls/getStatusAnlsJobClass.json";
							sopOpenApiWorkDataObj.removeParam(lvTempKey);
							params.param.splice(i,1);
							i--;
						}
						if(lvTempKey == "enterpriseTypeAllYn") { // 기업형태
							params.filter = "entrprs_type";
							contextUrl = "/ServiceAPI/workRoad/statusAnls/getStatusAnlsEnterpriseType.json";
							sopOpenApiWorkDataObj.removeParam(lvTempKey);
							params.param.splice(i,1);
							i--;
						}
						if(lvTempKey == "employmentTypeAllYn") { // 고용형태
							params.filter = "emplym_type";
							contextUrl = "/ServiceAPI/workRoad/statusAnls/getStatusAnlsEmploymentType.json";
							sopOpenApiWorkDataObj.removeParam(lvTempKey);
							params.param.splice(i,1);
							i--;
						}
						if(lvTempKey == "wagetyTypeAllYn") { // 임금수준
							params.filter = "wage_type";
							contextUrl = "/ServiceAPI/workRoad/statusAnls/getStatusAnlsWageType.json";
							sopOpenApiWorkDataObj.removeParam(lvTempKey);
							params.param.splice(i,1);
							i--;
						}
						if(lvTempKey == "educationLevelAllYn") { // 요구학력
							params.filter = "acdmcr";
							contextUrl = "/ServiceAPI/workRoad/statusAnls/getStatusAnlsEducationLevel.json";
							sopOpenApiWorkDataObj.removeParam(lvTempKey);
							params.param.splice(i,1);
							i--;
						}
						if(lvTempKey == "careerLevelAllYn") { // 요구경력
							params.filter = "career";
							contextUrl = "/ServiceAPI/workRoad/statusAnls/getStatusAnlsCareerLevel.json";
							sopOpenApiWorkDataObj.removeParam(lvTempKey);
							params.param.splice(i,1);
							i--;
						}
						// 임금수준 변수명 변경
						if(lvTempKey == "wagetyType") {
							sopOpenApiWorkDataObj.addParam("wagety2", lvTempValue);
							params.param.push({
								key : "wagety2",
								value : lvTempValue
							});
							sopOpenApiWorkDataObj.removeParam(lvTempKey);
							params.param.splice(i,1);
							i--;
						}
						// 기간설정 안씀
						if(lvTempKey == "term") {
							sopOpenApiWorkDataObj.removeParam(lvTempKey);
							params.param.splice(i,1);
							i--;
						}
					}
					//2019-08-19 [김남민] 일자리 맵 > 구인 현황분석 > 통계 조회 원복. END
				}
				//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END


				var url = contextPath + contextUrl;

				sopOpenApiWorkDataObj.request({
					method : "POST",
					async : async,
					url : url,
					options : {
						params : params,
						url : contextUrl,
					}
				});
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
				$workRoad.ui.addFnc03List("$saMapApi.request.openApiTotalPopulation");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도

				console.log("[saMapApi.js] openApiTotalPopulation() 호출");

				var sopOpenApiTotalPopulationObj = new sop.openApi.sa.totalPopulation.api();
				sopOpenApiTotalPopulationObj.addParam("accessToken", accessToken);

				var isBndYear = false;
				var zeroLevelYn = true;
				for (var i = 0; i < params.param.length; i++) {
					if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){

					}else{
						sopOpenApiTotalPopulationObj.addParam(params.param[i].key, params.param[i].value);
					}
					if (params.param[i].key == "bnd_year") {
						params.param[i].value = params.map.bnd_year;
						isBndYear = true;
					}
					if(params.param[i].key =="low_search" && params.param[i].value == "0" && params.adm_cd == '00' ){
						if(params.map.isInnerMapShow2) { //mng_s
							sopOpenApiTotalPopulationObj.addParam("adm_cd", "11010");
						} else {

							//2017-11-24 [개발팀] 총조사주요지표 0레벨 조회(남한경계) 되도록 수정
							//messageAlert.open("알림", "경계레벨 0의 경우에는 전국레벨에서 조회를 할 수 없습니다");
							//zeroLevelYn = false;
						}
					}
				}

				if (!isBndYear) {
					params.param.push({key:"bnd_year", value:params.map.bnd_year});
				}

				if ( params.adm_cd != "00") {
					sopOpenApiTotalPopulationObj.addParam("adm_cd", params.adm_cd);
				}
				sopOpenApiTotalPopulationObj.addParam("bnd_year", params.map.bnd_year);

				console.log("[saMapApi.js] openApiTotalPopulation() params.map.isInnerMapShow2 [" + params.map.isInnerMapShow2);
				console.log("[saMapApi.js] openApiTotalPopulation() params.map.isInnerMapShow3 [" + params.map.isInnerMapShow3);
				console.log("[saMapApi.js] openApiTotalPopulation() zeroLevelYn [" + zeroLevelYn);

				//mng_s kimjoonha grid 그리드에서 호출하였을 경우
				if(params.map.isInnerMapShow2) {
					sopOpenApiTotalPopulationObj.addParam("adm_cd", "11010"); //그리드일경우 임의의 값 세팅(않하면 에러가 나서...)
					var area = "";
					area = 'RECTANGLE(';
					area += params.map.bounds._southWest.x + ' ' + params.map.bounds._southWest.y + ',';
					area += params.map.bounds._northEast.x + ' ' + params.map.bounds._northEast.y;
					area += ')';
					sopOpenApiTotalPopulationObj.addParam("area", area);
					sopOpenApiTotalPopulationObj.addParam("zoom", params.map.zoom);
				}

				//mng_s kimjoonha bnd_grid 행정구역 그리드에서 호출하였을 경우 20180208
				if(params.map.isInnerMapShow3) {
					//sopOpenApiTotalPopulationObj.addParam("adm_cd", "11010"); //그리드일경우 임의의 값 세팅(않하면 에러가 나서...)
					//sopOpenApiTotalPopulationObj.addParam("adm_cd", "11010"); //행정구역 그리드는 adm_cd 값이 있어야함 위에서 세팅하지만 테스트 후 고쳐야할 수도 있음.

					/*
					var sido_cd = "";
					var sgg_cd = "";
					var emdong_cd = "";

					if(params.map.curSidoCd != null && params.map.curSidoCd != undefined ) {
						sido_cd = params.map.curSidoCd;
					}
					if(params.map.curSiggCd != null && params.map.curSiggCd != undefined ) {
						sgg_cd = params.map.curSiggCd;
					}
					if(params.map.curDongCd != null && params.map.curDongCd != undefined ) {
						emdong_cd = params.map.curDongCd;
					}


					var bnd_grid = "bnd_grid";

					sopOpenApiTotalPopulationObj.addParam("bnd_grid", bnd_grid);
					sopOpenApiTotalPopulationObj.addParam("zoom", params.map.zoom);
					sopOpenApiTotalPopulationObj.addParam("sido_cd", sido_cd);
					sopOpenApiTotalPopulationObj.addParam("sgg_cd", sgg_cd);
					sopOpenApiTotalPopulationObj.addParam("emdong_cd", emdong_cd);

					*/

					var bnd_grid = "bnd_grid";

					sopOpenApiTotalPopulationObj.addParam("bnd_grid", bnd_grid);
					sopOpenApiTotalPopulationObj.addParam("zoom", params.map.zoom);


					//mng_s 중요 원래는 adm_cd를 사용해야 하는데, 행정구역 그리드의 경우
					//adm_cd와 adm_nm의 값은 동일 한데 기존 소스에서 adm_cd가 7자리를 넘어가면 7자리로 substring(0,7)을
					//해버린다. 그래서 그런 부분을 찾아서 예외처리를 했지만 너무 많아서 adm_nm을 사용하려 한다.
					//추후 문제가 된다면 adm_cd를 사용하되 substring(0,7)을 찾아서 예외처리 해주어야 한다. 20180213 김준하
					//일단 adm_cd로 사용할 수 있도록 예외처리함. 정 않되면 adm_nm을 사용해야하지만 adm_cd를 사용하자...
					sopOpenApiTotalPopulationObj.addParam("adm_cd", encodeURIComponent(params.adm_cd));
					//sopOpenApiTotalPopulationObj.addParam("adm_cd", encodeURIComponent(params.adm_nm));


				}

				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				if (params.async != undefined && params.async) {
					async = params.async;
				}

				if(zeroLevelYn){
					sopOpenApiTotalPopulationObj.request({
						method : "GET",
						async : async, //9월 서비스
						url : openApiPath + this.API_0301_URL,
						options : {
							params : params,
							url : this.API_0301_URL,
						}
					});
				}
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
				$workRoad.ui.addFnc03List("$saMapApi.request.gridLegendTotalPopulation");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도

				console.log("[saMapApi.js] gridLegendTotalPopulation() 호출");

				var gridLegendTotalPopulationObj = new sop.openApi.sa.gridLegendTotalPopulation.api();
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

				/*
				gridLegendTotalPopulationObj.addParam("year", year);
				gridLegendTotalPopulationObj.addParam("age_from", age_from);
				gridLegendTotalPopulationObj.addParam("age_to", age_to);
				gridLegendTotalPopulationObj.addParam("gender", gender);
				gridLegendTotalPopulationObj.addParam("household_type", household_type);
				*/

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
			openApiSearchPopulation : function(params) {
				$workRoad.ui.addFnc03List("$saMapApi.request.openApiSearchPopulation");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var sopOpenApiSearchPopulationObj = new sop.openApi.sa.searchPopulation.api();
				sopOpenApiSearchPopulationObj.addParam("accessToken", accessToken);

				var isBndYear = false;
				for (var i = 0; i < params.param.length; i++) {

					if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){

					}else{
						sopOpenApiSearchPopulationObj.addParam(params.param[i].key,
								params.param[i].value);
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
					sopOpenApiSearchPopulationObj.addParam("adm_cd", params.adm_cd);
				}
				sopOpenApiSearchPopulationObj.addParam("bnd_year", params.map.bnd_year);


				//mng_s kimjoonha grid 그리드에서 호출하였을 경우
				if(params.map.isInnerMapShow2) {
					sopOpenApiSearchPopulationObj.addParam("adm_cd", "11010"); //그리드일경우 임의의 값 세팅(않하면 에러가 나서...)
					var area = "";
					area = 'RECTANGLE(';
					area += params.map.bounds._southWest.x + ' ' + params.map.bounds._southWest.y + ',';
					area += params.map.bounds._northEast.x + ' ' + params.map.bounds._northEast.y;
					area += ')';
					sopOpenApiSearchPopulationObj.addParam("area", area);
					sopOpenApiSearchPopulationObj.addParam("zoom", params.map.zoom);
				}

				//mng_s kimjoonha bnd_grid 행정구역 그리드에서 호출하였을 경우 20180208
				if(params.map.isInnerMapShow3) {
					var bnd_grid = "bnd_grid";
					sopOpenApiSearchPopulationObj.addParam("bnd_grid", bnd_grid);
					sopOpenApiSearchPopulationObj.addParam("zoom", params.map.zoom);
					sopOpenApiSearchPopulationObj.addParam("adm_cd", encodeURIComponent(params.adm_cd));
				}


				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				if (params.async != undefined && params.async) {
					async = params.async;
				}

				sopOpenApiSearchPopulationObj.request({
					method : "GET",
					async : async, //9월 서비스
					url : openApiPath + this.API_0302_URL,
					options : {
						params : params,
						url : this.API_0302_URL,
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
			openApiHouseHold : function(params) {
				$workRoad.ui.addFnc03List("$saMapApi.request.openApiHouseHold");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var sopOpenApiHouseHoldObj = new sop.openApi.sa.houseHold.api();
				sopOpenApiHouseHoldObj.addParam("accessToken", accessToken);

				var isBndYear = false;
				for (var i = 0; i < params.param.length; i++) {
					if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){

					}else{
						sopOpenApiHouseHoldObj.addParam(params.param[i].key, params.param[i].value);
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
					sopOpenApiHouseHoldObj.addParam("adm_cd", params.adm_cd);
				}
				sopOpenApiHouseHoldObj.addParam("bnd_year", params.map.bnd_year);


				//mng_s kimjoonha grid 그리드에서 호출하였을 경우
				if(params.map.isInnerMapShow2) {
					sopOpenApiHouseHoldObj.addParam("adm_cd", "11010"); //그리드일경우 임의의 값 세팅(않하면 에러가 나서...)
					var area = "";
					area = 'RECTANGLE(';
					area += params.map.bounds._southWest.x + ' ' + params.map.bounds._southWest.y + ',';
					area += params.map.bounds._northEast.x + ' ' + params.map.bounds._northEast.y;
					area += ')';
					sopOpenApiHouseHoldObj.addParam("area", area);
					sopOpenApiHouseHoldObj.addParam("zoom", params.map.zoom);
				}

				//mng_s kimjoonha bnd_grid 행정구역 그리드에서 호출하였을 경우
				if(params.map.isInnerMapShow3) {
					var bnd_grid = "bnd_grid";
					sopOpenApiHouseHoldObj.addParam("bnd_grid", bnd_grid);
					sopOpenApiHouseHoldObj.addParam("zoom", params.map.zoom);
					sopOpenApiHouseHoldObj.addParam("adm_cd", encodeURIComponent(params.adm_cd));
				}

				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				if (params.async != undefined && params.async) {
					async = params.async;
				}

				sopOpenApiHouseHoldObj.request({
					method : "GET",
					async : async,	//9월 서비스
					url : openApiPath + this.API_0305_URL,
					options : {
						params : params,
						url : this.API_0305_URL,
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
			openApiHouseHoldMember : function(params) {
				$workRoad.ui.addFnc03List("$saMapApi.request.openApiHouseHoldMember");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var sopOpenApiHouseHoldMemberObj = new sop.openApi.sa.houseHoldMember.api();
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
				if (params.async != undefined && params.async) {
					async = params.async;
				}

				sopOpenApiHouseHoldMemberObj.request({
					method : "GET",
					async : async,	//9월 서비스
					url : openApiPath + this.API_0310_URL,
					options : {
						params : params,
						url : this.API_0310_URL,
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
			openApiFarmHouseHold : function(params) {
				$workRoad.ui.addFnc03List("$saMapApi.request.openApiFarmHouseHold");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var sopOpenApiFarmHouseHoldObj = new sop.openApi.sa.FarmHouseHold.api();
				sopOpenApiFarmHouseHoldObj.addParam("accessToken", accessToken);

				var isBndYear = false;
				for (var i = 0; i < params.param.length; i++) {
					if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){

					}else{
						sopOpenApiFarmHouseHoldObj.addParam(params.param[i].key, params.param[i].value);
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
					sopOpenApiFarmHouseHoldObj.addParam("adm_cd", params.adm_cd);
				}
				sopOpenApiFarmHouseHoldObj.addParam("bnd_year", params.map.bnd_year);

				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				if (params.async != undefined && params.async) {
					async = params.async;
				}

				sopOpenApiFarmHouseHoldObj.request({
					method : "GET",
					async : async,	//9월 서비스
					url : openApiPath + this.API_0307_URL,
					options : {
						params : params,
						url : this.API_0307_URL,
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
			openApiForestryHouseHold : function(params) {
				$workRoad.ui.addFnc03List("$saMapApi.request.openApiForestryHouseHold");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var sopOpenApiForestryHouseHoldObj = new sop.openApi.sa.ForestryHouseHold.api();
				sopOpenApiForestryHouseHoldObj.addParam("accessToken", accessToken);

				var isBndYear = false;
				for (var i = 0; i < params.param.length; i++) {
					if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){

					}else{
						sopOpenApiForestryHouseHoldObj.addParam(params.param[i].key, params.param[i].value);
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
					sopOpenApiForestryHouseHoldObj.addParam("adm_cd", params.adm_cd);
				}
				sopOpenApiForestryHouseHoldObj.addParam("bnd_year", params.map.bnd_year);

				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				if (params.async != undefined && params.async) {
					async = params.async;
				}

				sopOpenApiForestryHouseHoldObj.request({
					method : "GET",
					async : async,	//9월 서비스
					url : openApiPath + this.API_0308_URL,
					options : {
						params : params,
						url : this.API_0308_URL,
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
			openApiFisheryHouseHold : function(params) {
				$workRoad.ui.addFnc03List("$saMapApi.request.openApiFisheryHouseHold");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var sopOpenApiFisheryHouseHoldObj = new sop.openApi.sa.FisheryHouseHold.api();
				sopOpenApiFisheryHouseHoldObj.addParam("accessToken", accessToken);

				var isBndYear = false;
				for (var i = 0; i < params.param.length; i++) {
					if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){

					}else{
						sopOpenApiFisheryHouseHoldObj.addParam(params.param[i].key, params.param[i].value);
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
					sopOpenApiFisheryHouseHoldObj.addParam("adm_cd", params.adm_cd);
				}
				sopOpenApiFisheryHouseHoldObj.addParam("bnd_year", params.map.bnd_year);

				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				if (params.async != undefined && params.async) {
					async = params.async;
				}

				sopOpenApiFisheryHouseHoldObj.request({
					method : "GET",
					async : async,	//9월 서비스
					url : openApiPath + this.API_0309_URL,
					options : {
						params : params,
						url : this.API_0309_URL,
					}
				});
			},


			/**
			 *
			 * @name         : openApiInterstryCode
			 * @description  : OpenAPI 산업체분류 정보를 조회한다.
			 * @date         : 2014. 10. 11.
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 * @param adm_cd : 행정동코드
			 * @param filterParam : 경계레이어 선택 시, 표출된 파라미터(key)정보
			 * @param title : 드랍한 버튼의 타이틀정보am
			 */
			openApiInterstryCode : function(depth, class_deg, class_cd) {
				$workRoad.ui.addFnc03List("$saMapApi.request.openApiInterstryCode");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var sopOpenApiInderstryCodeObj = new sop.openApi.sa.InderstryCode.api();
				sopOpenApiInderstryCodeObj.addParam("accessToken", accessToken);
				sopOpenApiInderstryCodeObj.addParam("class_deg", class_deg);
				if (class_cd != null) {
					sopOpenApiInderstryCodeObj.addParam("class_code", class_cd);
				}

				sopOpenApiInderstryCodeObj.request({
					method : "GET",
					async : true,
					url : openApiPath + this.API_0303_URL,
					options : {
						depth : depth,
						class_deg : class_deg,
						class_cd : class_cd
					}
				});
			},


			/**
			 *
			 * @name         : openApiCompany
			 * @description  : OpenAPI 사업체분류 정보를 조회한다.
			 * @date         : 2014. 10. 11.
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 선택된 api 파라미터정보
			 * @param adm_cd : 행정동코드
			 * @param filterParam : 경계레이어 선택 시, 표출된 파라미터(key)정보
			 * @param title : 드랍한 버튼의 타이틀정보am
			 */
			openApiCompany : function(params) {
				$workRoad.ui.addFnc03List("$saMapApi.request.openApiCompany");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도

				console.log("[saMap.js] openApiCompany() 호출");

				var sopOpenApiCompanyObj = new sop.openApi.sa.Company.api();
				sopOpenApiCompanyObj.addParam("accessToken", accessToken);

				var api_url = "";
				var isBndYear = false;
				for (var i = 0; i < params.param.length; i++) {
					if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){

					}else{
						sopOpenApiCompanyObj.addParam(params.param[i].key, params.param[i].value);
					}

					if (params.param[i].key == "bnd_year") {
						params.param[i].value = params.map.bnd_year;
						isBndYear = true;
					}

					//전산업인지 아닌지 체크 (전산업으로 선택했을 경우 총조사주요지표 API로 검색한다.)
					if(params.param[i].key == "class_code" || params.param[i].key == "theme_cd") {	//class_code값이 있으면 전산업이 아님
						api_url = this.API_0304_URL;
					}
				}

				//api_url 값이 없으면 전산업이다. (총조사주요지표 API로 검색)
				if(api_url == "") {
					api_url = this.API_0301_URL;
					for (var i = 0; i < params.param.length; i++) {
						if (params.param[i].key == "area_type") {
							params.param.splice(params.param.indexOf(params.param[i]), 1);		//area_type 파라미터 삭제
						}
					}
					sopOpenApiCompanyObj.removeParam("area_type");
				}

				//api_url 값이 없으면 전산업이다. (총조사주요지표 API로 검색)
				if(api_url == "") {
					api_url = this.API_0301_URL;
					for (var i = 0; i < params.param.length; i++) {
						if (params.param[i].key == "area_type") {
							params.param.splice(params.param.indexOf(params.param[i]), 1);		//area_type 파라미터 삭제
						}
					}
					sopOpenApiCompanyObj.removeParam("area_type");
				}

				if (!isBndYear) {
					params.param.push({key:"bnd_year", value:params.map.bnd_year});
				}

				if ( params.adm_cd != "00") {
					sopOpenApiCompanyObj.addParam("adm_cd", params.adm_cd);
				}

				sopOpenApiCompanyObj.addParam("bnd_year", params.map.bnd_year);

				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				if (params.async != undefined && params.async) {
					async = params.async;
				}

				//mng_s kimjoonha grid 그리드에서 호출하였을 경우
				if(params.map.isInnerMapShow2) {
					sopOpenApiCompanyObj.addParam("adm_cd", "11010"); //그리드일경우 임의의 값 세팅(않하면 에러가 나서...)
					var area = "";
					area = 'RECTANGLE(';
					area += params.map.bounds._southWest.x + ' ' + params.map.bounds._southWest.y + ',';
					area += params.map.bounds._northEast.x + ' ' + params.map.bounds._northEast.y;
					area += ')';
					sopOpenApiCompanyObj.addParam("area", area);
					sopOpenApiCompanyObj.addParam("zoom", params.map.zoom);
				}

				//mng_s kimjoonha bnd_grid 행정구역 그리드에서 호출하였을 경우
				if(params.map.isInnerMapShow3) {
					var bnd_grid = "bnd_grid";
					sopOpenApiCompanyObj.addParam("bnd_grid", bnd_grid);
					sopOpenApiCompanyObj.addParam("zoom", params.map.zoom);
					sopOpenApiCompanyObj.addParam("adm_cd", encodeURIComponent(params.adm_cd));
				}

				sopOpenApiCompanyObj.request({
					method : "GET",
					async : async,	//9월 서비스
					url : openApiPath + api_url,
					options : {
						params : params,
						url : api_url,
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
			openApiHouse : function(params) {
				$workRoad.ui.addFnc03List("$saMapApi.request.openApiHouse");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var sopOpenApiHouseObj = new sop.openApi.sa.House.api();
				sopOpenApiHouseObj.addParam("accessToken", accessToken);

				var isBndYear = false;
				for (var i = 0; i < params.param.length; i++) {
					if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){

					}else{
						sopOpenApiHouseObj.addParam(params.param[i].key, params.param[i].value);
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
					sopOpenApiHouseObj.addParam("adm_cd", params.adm_cd);
				}
				sopOpenApiHouseObj.addParam("bnd_year", params.map.bnd_year);

				//mng_s kimjoonha grid 그리드에서 호출하였을 경우
				if(params.map.isInnerMapShow2) {
					sopOpenApiHouseObj.addParam("adm_cd", "11010"); //그리드일경우 임의의 값 세팅(않하면 에러가 나서...)
					var area = "";
					area = 'RECTANGLE(';
					area += params.map.bounds._southWest.x + ' ' + params.map.bounds._southWest.y + ',';
					area += params.map.bounds._northEast.x + ' ' + params.map.bounds._northEast.y;
					area += ')';
					sopOpenApiHouseObj.addParam("area", area);
					sopOpenApiHouseObj.addParam("zoom", params.map.zoom);
				}

				//mng_s kimjoonha bnd_grid 행정구역 그리드에서 호출하였을 경우
				if(params.map.isInnerMapShow3) {
					var bnd_grid = "bnd_grid";
					sopOpenApiHouseObj.addParam("bnd_grid", bnd_grid);
					sopOpenApiHouseObj.addParam("zoom", params.map.zoom);
					sopOpenApiHouseObj.addParam("adm_cd", encodeURIComponent(params.adm_cd));
				}

				//시계열조회시 로딩아이콘 숨기기
				//9월 서비스
				var async = false;
				if (params.async != undefined && params.async) {
					async = params.async;
				}

				sopOpenApiHouseObj.request({
					method : "GET",
					async : async,	//9월 서비스
					url : openApiPath + this.API_0306_URL,
					options : {
						params : params,
						url : this.API_0306_URL,
					}
				});
			},


			/**
			 *
			 * @name         : openApiRecentParamInfo
			 * @description  : 메인화면 예시의 상세파라미터정보를 가져온다.
			 * @date         : 2014. 10. 13.
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param hist_id : 북마크 및 공유정보 key(id)
			 */
			openApiMainRecentParamInfo : function (hist_id) {
				$workRoad.ui.addFnc03List("$saMapApi.request.openApiMainRecentParamInfo");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var sopOpenApiMainRecentParamInfoObj = new sop.openApi.sa.mainRecentParamInfo.api();
				sopOpenApiMainRecentParamInfoObj.addParam("hist_id", hist_id);
				sopOpenApiMainRecentParamInfoObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/common/MainRecentParamInfo.json"
				});
			},


			/**
			 *
			 * @name         : openApiShareForStats
			 * @description  : 공유 또는 북마크된 통계정보를 호출한다.
			 * @date         : 2014. 10. 13.
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 통계정보 파라미터
			 */
			openApiShareForStats : function(params, adm_cd) {
				$workRoad.ui.addFnc03List("$saMapApi.request.openApiShareForStats");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var sopOpenApiShareForStatsObj = new sop.openApi.sa.shareForStats.api();
				var paramInfo = params.param_info.paramInfo;
				for (k in paramInfo) {
					if (k == "adm_cd") {
						if(adm_cd == "00") {
							continue;
						}
						sopOpenApiShareForStatsObj.addParam(k, adm_cd);
					}else {
						sopOpenApiShareForStatsObj.addParam(k, paramInfo[k]);
					}
				}

				if(params.param_info.isKosis) {
					saMapEtc.org_id = paramInfo.org_id;
					saMapEtc.tbl_id = paramInfo.tbl_id;
//					saMapEtc.gis_se = paramInfo.gis_se;
					saMapEtc.gis_se = params.param_info.gis_se_bak;
					saMapEtc.kosis_data_item = paramInfo.kosis_data_item;
					saMapEtc.kosis_data_period = paramInfo.kosis_data_period;
					saMapEtc.kosis_data_year = paramInfo.kosis_data_year;
					saMapEtc.kosis_data_item_detail = paramInfo.kosis_data_item_detail;
					saMapEtc.pAdmCd = paramInfo.gis_se;

					saMapEtc.kosis_obj_var_id = paramInfo.obj_var_id;
					saMapEtc.kosis_field_id = paramInfo.field_id;

					sopOpenApiShareForStatsObj.request({
						method : "GET",
						async : false,
						url : kosisApiPath + params.api_call_url,
						options : {
							params : params,
							adm_cd : adm_cd
						}
					});
				} else {
					//조건결합일 경우, post
					var method = "GET";
					var url = openApiPath + params.api_call_url;
					if (params.param_info.btntype == "items") {
						method = "POST";
						url = contextPath + params.api_call_url
					}else {
						sopOpenApiShareForStatsObj.addParam("accessToken", accessToken);
					}

					sopOpenApiShareForStatsObj.request({
						method : method,
						async : false,
						url : url,
						options : {
							params : params,
							adm_cd : adm_cd
						}
					});
				}

			},


			/**
			 *
			 * @name         : openApiUserDrawForStats
			 * @description  : 사용자지정영역 조회를 수행한다.
			 * @date         : 2015. 1. 26.
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param params : 해당 통계파라미터 정보
			 * @param @param area   : 사용자 영역
			 * @param @param layer  : 사용자영역 레이어
			 */
			openApiUserDrawForStats : function(params, area, layer) {
				$workRoad.ui.addFnc03List("$saMapApi.request.openApiUserDrawForStats");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var url = "";
				var method = "GET";

				var sopOpenApiUserDrawForStatsObj = new sop.openApi.sa.userDrawForStats.api();
				for (var i = 0; i < params.param.length; i++) {
					sopOpenApiUserDrawForStatsObj.addParam(params.param[i].key, params.param[i].value);
				}

				if (Object.prototype.toString.call( params.api_id ) === "[object Array]") {
					url = contextPath + this.API_FUSION_URL;
					method = "POST"; //9월 서비스
				}else {
					if 		(params.api_id == "API_0301") url = this.API_0301_URL;
					else if (params.api_id == "API_0302") url = this.API_0302_URL;
					else if (params.api_id == "API_0303") url = this.API_0303_URL;
					else if (params.api_id == "API_0304") url = this.API_0304_URL;
					else if (params.api_id == "API_0305") url = this.API_0305_URL;
					else if (params.api_id == "API_0306") url = this.API_0306_URL;
					else if (params.api_id == "API_0307") url = this.API_0307_URL;
					else if (params.api_id == "API_0308") url = this.API_0308_URL;
					else if (params.api_id == "API_0309") url = this.API_0309_URL;
					else if (params.api_id == "API_0310") url = this.API_0310_URL;

					url = openApiPath + url;
					method = "GET";
					sopOpenApiUserDrawForStatsObj.addParam("accessToken", accessToken);
				}

				sopOpenApiUserDrawForStatsObj.addParam("area_type", "1");
				sopOpenApiUserDrawForStatsObj.addParam("area", area);
				sopOpenApiUserDrawForStatsObj.request({
					method : method,
					async : false,
					url : url,
					options : {
						params : params,
						area : area,
						layer : layer
					}
				});
			},


			/**
			 *
			 * @name         : openApiLoginProcess
			 * @description  : 로그인을 수행한다.
			 * @date         : 2014. 10. 14.
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param id : 회원 아이디
			 * @param pwd : 회원 비밀번호
			 * @param options : 옵션정보
			 */
			openApiLoginProcess : function(id, pwd) {
				$workRoad.ui.addFnc03List("$saMapApi.request.openApiLoginProcess");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var sopLoginObj = new sop.portal.sa.login.api();
				sopLoginObj.addParam("member_id", id);
				sopLoginObj.addParam("pw", pwd);
				sopLoginObj.request({
					method : "POST",
				    async : false,
				    url : contextPath+"/ServiceAPI/member/login.json",
				    options : {
				    	id : id,
				    	pwd : pwd
				    }
				});
			},


			/*********** 로그인 프로세스 Start **********/
			openApiDeveloperLoginProcess : function(id, pwd) {
				$workRoad.ui.addFnc03List("$saMapApi.request.openApiDeveloperLoginProcess");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var sopDeveloperLoginObj = new sop.portal.sa.developerLogin.api();
				sopDeveloperLoginObj.addParam("member_id", id);
				sopDeveloperLoginObj.addParam("pw", pwd);
				sopDeveloperLoginObj.request({
				    method : "POST",
				    async : false,
				    url : developApiPath+"/member/login.json"
				});
			},
			/*********** 로그인 프로세스 End **********/

			/**
			 *
			 * @name         : openApiStatBaseYearProcess
			 * @description  : 통계별최신년도 정보를 조회한다.
			 * @date         : 2014. 10. 17.
			 * @author	     : 김성현
			 * @history 	 :
			 */
			openApiStatBaseYearProcess : function() {// used
				$workRoad.ui.log("$saMapApi.request.openApiStatBaseYearProcess - begin");

				var searchbtnCnt = $saSubMenu.ui.searchbtnCnt - 1;
				var sopStatBaseYearObj = new sop.portal.sa.statBaseYear.api();
				var param_info = new Array();
				param_info.push("low_search");
				for (var i = 0; i < $saSubMenu.ui.arParamList.length; i++) {
					if($saSubMenu.ui.arParamList[i].idx == $saSubMenu.ui.searchbtnCnt-1) {
						for(var x = 0; x < $saSubMenu.ui.arParamList[i].params.length; x ++) {
							var params = $saSubMenu.ui.arParamList[i].params[x];
							param_info.push(params.key);
						}
						break;
					}
				}

				sopStatBaseYearObj.addParam("api_id", $saSubMenu.ui.curSelectedDetailStatsType.substring(0,8));
				sopStatBaseYearObj.addParam("param_info", param_info);
				sopStatBaseYearObj.request({
					method : "POST",
				    async : true,
				    url : contextPath+"/ServiceAPI/map/interactive/statBaseYear.json",
				});
			},

			/**
			 *
			 * @name         : openApiGeocode
			 * @description  : 지역 명칭으로 x, y 좌표를 구한다.
			 * @date         : 2015. 01. 08.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param address : 검색어
			 */
			openApiGeocode : function(address) {
				$workRoad.ui.addFnc03List("$saMapApi.request.openApiGeocode");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var sopOpenApiGeocodeObj = new sop.openApi.sa.geocode.api();
				sopOpenApiGeocodeObj.addParam("accessToken", accessToken);
				sopOpenApiGeocodeObj.addParam("address", encodeURIComponent(encodeURIComponent(address)));
				sopOpenApiGeocodeObj.request({
			        method : "GET",
			        async : false,
			        url : openApiPath+"/OpenAPI3/addr/geocode.json",
			        options : {
			        	address : address
				    }
			    });
			},

			/**
			 * @name         : openApiSOP
			 * @description  : SOP 검색.
			 * @date         : 2015. 01. 08.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param searchword 검색어
			 * @param pagenum 페이지
			 */
			openApiSOP : function(searchword, pagenum) {
				$workRoad.ui.addFnc03List("$saMapApi.request.openApiSOP");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var sopOpenApiSOPObj = new sop.openApi.sa.sopsearch.api();
				sopOpenApiSOPObj.addParam("accessToken", accessToken);
				sopOpenApiSOPObj.addParam("searchword", encodeURIComponent(encodeURIComponent(searchword)));
				sopOpenApiSOPObj.addParam("pagenum", pagenum);
				sopOpenApiSOPObj.request({
			        method : "GET",
			        async : false,
			        url : openApiPath+"/OpenAPI3/search/sop.json",
			        options : {
			        	searchword : searchword,
			        	pagenum : pagenum
			        }
			    });
			},

			/**
			 * @name         : openApiKOSIS
			 * @description  : KOSIS 검색
			 * @date         : 2015. 01. 08.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param searchword 검색어
			 * @param pagenum 페이지
			 */
//			openApiKOSIS : function(searchword, pagenum) {
//				$workRoad.ui.addFnc03List("$saMapApi.request.openApiKOSIS");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
//				var sopOpenApiKOSISObj = new sop.openApi.sa.kosissearch.api();
//				sopOpenApiKOSISObj.addParam("accessToken", accessToken);
//				sopOpenApiKOSISObj.addParam("searchword", encodeURIComponent(encodeURIComponent(searchword)));
//				sopOpenApiKOSISObj.addParam("pagenum", pagenum);
//				sopOpenApiKOSISObj.request({
//			        method : "GET",
//			        async : false,
//			        url : openApiPath+"/OpenAPI3/search/kosis.json",
//			        options : {
//			        	searchword : searchword,
//			        	pagenum : pagenum
//			        }
//			    });
//			},

			//9월 서비스
			/**
			 * @name         : openApiItemCombine
			 * @description  : 결합조건 검색 API
			 * @date         : 2015. 01. 08.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param params
			 */
			openApiItemCombine : function(params) {
				$workRoad.ui.addFnc03List("$saMapApi.request.openApiItemCombine");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var sopOpenApiItemCombineObj = new sop.openApi.sa.itemcombine.api();
				var api_url = contextPath + $saMapApi.request.API_FUSION_URL;		//초기값은 기본 결합조건api주소
				var methodType = "POST";

				for (var i = 0; i < params.noneParams.length; i++) {	//조회조건이 아닌 파라미터중에서 fusion_query_type 값 확인
					if(params.noneParams[i].key == "fusion_query_type") {
						if(params.noneParams[i].value == "population" || params.noneParams[i].value == "household" || params.noneParams[i].value == "house") {		//인구, 가구, 주택 조건
							if(params.noneParams[i].value == "population") {
								api_url = openApiPath + $saMapApi.request.API_0302_URL;		//인구 OPENAPI 호출
							} else if(params.noneParams[i].value == "household") {
								api_url = openApiPath + $saMapApi.request.API_0305_URL;		//가구 OPENAPI 호출
							} else if(params.noneParams[i].value == "house") {
								api_url = openApiPath + $saMapApi.request.API_0306_URL;		//주택 OPENAPI 호출
							}
							methodType = "GET";
							sopOpenApiItemCombineObj.addParam("accessToken", accessToken);
						}
					}
				}

				var isBndYear = false;
				if(params.adm_cd == "00"){
					var result = confirm("인구, 가구, 주택 조건결합인 경우 \n 속도가 지연될 수도 있습니다. \n 계속 조회하시겠습니까? ");
					if(result == true){
						for (var i = 0; i < params.param.length; i++) {
							if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){

							}else{
								sopOpenApiItemCombineObj.addParam(params.param[i].key, params.param[i].value);
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
							sopOpenApiItemCombineObj.addParam("adm_cd", params.adm_cd);
						}
						sopOpenApiItemCombineObj.addParam("bnd_year", params.map.bnd_year);
						sopOpenApiItemCombineObj.request({
							method : methodType,
							async : false,
							url : api_url,
							options : {
								btntype : "items",
								params : params,
								url : api_url
							}
						});
					}
				}else{
					for (var i = 0; i < params.param.length; i++) {
						if(params.param[i].key == 'adm_cd' && params.adm_cd == '00'){

						}else{
							sopOpenApiItemCombineObj.addParam(params.param[i].key, params.param[i].value);
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
						sopOpenApiItemCombineObj.addParam("adm_cd", params.adm_cd);
					}
					sopOpenApiItemCombineObj.addParam("bnd_year", params.map.bnd_year);
					sopOpenApiItemCombineObj.request({
						method : methodType,
						async : false,
						url : api_url,
						options : {
							btntype : "items",
							params : params,
							url : api_url
						}
					});
				}
			},

			/**
			 *
			 * @name         : searchReverseGeoCode
			 * @description  : 좌표 정보로 행정동을 조회한다.(통계표 검색)
			 * @date         : 2015. 01. 08.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param stat_id API아이디
			 */
			searchReverseGeoCode : function (division, url, title) {
				$workRoad.ui.addFnc03List("$saMapApi.request.searchReverseGeoCode");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var sopSearchReverseGeoCodeObj = new sop.openApi.sa.searchReverseGeoCode.api();
				sopSearchReverseGeoCodeObj.addParam("accessToken", accessToken);
				sopSearchReverseGeoCodeObj.addParam("addr_type", "20");
				sopSearchReverseGeoCodeObj.addParam("x_coor", $saMap.ui.x);
				sopSearchReverseGeoCodeObj.addParam("y_coor", $saMap.ui.y);

				//API 고유 아이디를 뽑아온다.   ex)0301
				var startLen = url.indexOf("?type=");
				var type = url.substring(startLen+6, startLen+10);

				sopSearchReverseGeoCodeObj.request({
					method : "GET",
					async : true,
					url : openApiPath + "/OpenAPI3/addr/rgeocode.json",
					options : {
						target : this,
						url : url,
						division : division,
						type : type,
						startLen : startLen,
						title : title
					}
				});
			},

			/**
			 *
			 * @name         : userAreaBoundInfo
			 * @description  : 사용자영역 경계정보를 조회한다.
			 * @date         : 2015. 11. 26.
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param area   : 영역정보
			 * @param type	 : 영역타입(circle, rectangle, polygon)
			 */
			userAreaBoundInfo : function (area, type, code, layer, map) {
				$workRoad.ui.addFnc03List("$saMapApi.request.userAreaBoundInfo");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
				var userAreaBoundObj = new sop.openApi.sa.userAreaBoundObj.api();
				userAreaBoundObj.addParam("area", area);
				userAreaBoundObj.addParam("type", type);
				userAreaBoundObj.addParam("code", code);
				userAreaBoundObj.request({
					method : "POST",
					async : false,
					url : contextPath + this.API_USERAREA_URL,
					options : {
						target : this,
						url : contextPath + this.API_USERAREA_URL,
						type : type,
						area : area,
						layer : layer,
						map : map
					}
				});
			},

			/**
			 *
			 * @name         : setStatsData
			 * @description  :
			 * @date         : 2014. 10. 30.
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param res
			 * @param @param options
			 */
			setStatsData : function (res, options, isContry) {// used
				$workRoad.ui.log("$saMapApi.request.setStatsData - begin");

				var result = res.result;
				var params = options.params;
				var map = params.map;
				var mapInfo = map.mapInfo;
				var dataBoard = $saDataBoard.ui.mapData[$saDataBoard.ui.map_id].dataBoard;	//9월 서비스

				if (isContry != undefined && isContry)  {
					res["pAdmCd"] = "";
				}else {
					res["pAdmCd"] = params.adm_cd;
				}

				//=================================================================//
				//2016.03.29 수정, N/A일 경우, 데이터에서 제외
				//2016.06.07 kcu 수, 인구밀도, 노령화지수, 노년부양비, 유년부양비, 평균나이, 평균가구원이 0일 경우 데이터에서 제외
				//mng_s 20180109 주용민
				var tmpResult = [];
				var tmpResult2 = [];
				for (var i=0; i<result.length; i++) {
					console.log("[saMapApi.js] params.filter : " + params.filter);
					if (!(result[i][params.filter] == "N/A"   ||
						 (params.filter == "ppltn_dnsty"      ||	//인구밀도
						  params.filter == "aged_child_idx"   ||	//노령화지수
						  params.filter == "oldage_suprt_per" ||	//노년부양비
						  params.filter == "juv_suprt_per"    ||	//유년부양비
						  params.filter == "avg_age" 		  ||	//평균나이
						  params.filter == "avg_fmember_cnt"        //평균가구원
						 ) && result[i][params.filter] == "0") ) {
						tmpResult.push(result[i]);
					}else{
						tmpResult2.push(result[i]);
					}
				}
				res.result = tmpResult;
				res.result2 = tmpResult2;
				//mng_e
				//=================================================================//

				//9월 서비스
				if (!dataBoard.isTimeSeriesPlay) {
					map.clearLayer();
					if (map.drawControl != null) {				// 예외처리 - 2019.01.07	ywKim	변경
						map.drawControl.removeOverlay();
					}
					map.multiLayerControl.clear();
				}


				//통계정보를 sort한다.
				if (res.result != null && res.result.length > 0) {
					res.result = res.result.sort(function(a, b) {
						return parseFloat(b[params.filter])-parseFloat(a[params.filter])
					});
				}

				//mng_s 20171027 주용민
				//인구총괄일 경우, 사용자지정영역을 그릴수 없다.
				if (res.id == "API_0301") {
					//총조사일 경우 설명 문구 보여줌
//					$("#noticeTextPopup0"+(parseInt(map.id)+1)).show();
					//사업체의 전산업일 경우 API_0301을 API_0304로 변경
					if(params.api_id == "API_0304") {
						res.id = "API_0304";
						options.params.param.push({"key" : "area_type", "value" : "0"});
					}
//				} else {
					//나머지는 설명 문구 숨김
//					$("#noticeTextPopup0"+(parseInt(map.id)+1)).hide();
				}
				// 구인자료현황 조회 추가
				console.log("[saMapApi.js] res.id / options.params.title / options.params.unit / map.id : " + res.id + " / " + options.params.title  + " / " +  options.params.unit  + " / " +  map.id);


				if (res.id == "API_WORK") {
					options.params.param.push({"key" : "area_type", "value" : "1"});
				}

				//설명문구
				if(map.isInnerMapShow2){
					//그리드의 경우 지도 좌측 아래의 빨간 문구를 보여주지 않는다.
					$("#noticeTextPopup0"+(parseInt(map.id)+1)).hide();
				} else {
					$("#noticeTextPopup0"+(parseInt(map.id)+1)).show();
				}
				//mng_e 20171027 주용민

				// 일반검색 버튼일 경우,
				if ($saMap.ui.searchBtnType == "normal") {

					// 북마크,공유정보 설정
					//9월 서비스
					options["zoomlevel"] = map.zoom;
					options["center"] = map.center;
					options["btntype"] = "normal";
					options.params.param.push({"key" : "adm_cd", "value" : params.adm_cd});
//					map.shareInfo.setShareInfo(options, "normal", map.id);// 2018.10.24	ywKim	주석
					$saMap.ui.updateSearchTitle(options.params.title, options.params.unit, map.id);

					//시계열 조회일 경우
					if (dataBoard.isTimeSeriesPlay) {
						dataBoard.timeSeriesPushData.push({
							"res" : res,
							"options": options
						});
						$saDataBoard.ui.doReqTimeSeries();

					} else {
						map.setStatsData("normal", res, params.filter, params.unit);
						if (params.view_type == "TS") {
							//2016.03.18 수정, 경계레벨 0,2일 때, 시계열조회 문제
							if (map.boundLevel == "1") {
								map.openApiReverseGeoCode(map.center);
							}else {
								map.autoDownBoundary();
							}
						}else {
							if(params.view_type == "NM"){	//2018.11.07 오늘의 구인현황 콤보박스 선택 시, 시도 레벨 조회 추가
								map.openApiReverseGeoCode(map.center);
							}else{
								map.autoDownBoundary();
							}
						}

						//데이터보드 업데이트
						$saDataBoard.ui.updateDataBoard(res, options);

						//API 로그
						//9월 서비스
						apiLogWrite("A0", options);
					}

					//API 로그
					//apiLogWrite("A0", options);

				} else {

					//범례결합시, 하나라도 통신에러나 검색결과가 없을 경우, 초기화한다.
					if ($saMapApi.request.combineFailCnt > 0) {
						map.clearDataOverlay();
//						$saMap.ui.shareUrlInfoList = [];// 2018.10.24	ywKim	주석
						return;
					}
					map.setStatsData("combine", res, params.filter, params.unit);

					// 요청된 api정보가 모두 수신되었을 경우,
					if (map.combineData.length == 2) {
						map.autoDownBoundary();
						$(mapInfo.pieChartObj).hide();
						$(mapInfo.barChartObj).hide();
						$(mapInfo.timeSeriesObj).hide();
//						$("#timeSeriesDiv").hide();

						//결합일경우, 범례설정
						mapInfo.setLegendRange();
					}

					// 북마크,공유정보 설정
					options["zoomlevel"] = map.zoom;
					options["center"] = map.center;
					options["btntype"] = "combine";
					options.params.param.push({"key" : "adm_cd", "value" : params.adm_cd});
//					map.shareInfo.setShareInfo(options, "normal", map.id);// 2018.10.24	ywKim	주석

					// 2018.10.24	ywKim	주석
//					if (map.combineData.length == 2) {
//						var shareUrlInfoList = map.shareInfo.shareUrlInfo;
//						var combineTitle = "";
//						var api_ids = "";
//						for( var i = 0; i < shareUrlInfoList.length; i ++ ) {
//							if(i == 0) {
//								combineTitle += shareUrlInfoList[i].title;
//								api_ids += shareUrlInfoList[i].params.api_id;
//							} else {
//								combineTitle += " | " + shareUrlInfoList[i].title;
//								api_ids += " | " + shareUrlInfoList[i].params.api_id;
//							}
//						}
//
//						options.params.api_id = api_ids;
//						options.params.title = combineTitle;
//						$saMap.ui.updateSearchTitle(combineTitle, map.id);
//
//						//API 로그
//						apiLogWrite("A0", options);
//					}

				}
				map.setDroppedInfo();
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
				$workRoad.ui.addFnc03List("$saMapApi.request.setMultiStatsData");	// 임시 - 2019.01.10	ywKim	추가: 사용 안하는 함수 찾는 용도
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

				if (map.drawControl != null) {				// 예외처리 - 2019.01.07	ywKim	변경
					map.drawControl.removeOverlay();
				}
				map.multiLayerControl.setStatsData("normal", res, options, false);
				$saMap.ui.updateSearchTitle(options.params.title, options.params.unit, map.id);
			},

			checkContryData : function(res, options, map) {// used
				$workRoad.ui.log("$saMapApi.request.checkContryData - begin");

				var isContry = false;
				for (var i=0;i<options.params.param.length; i++) {
					if (options.params.param[i].key == "low_search" && options.params.param[i].value == "0") {
						if (options.params.adm_cd == "00") {
							var tmpData = 0;
							for (var i=0; i<res.result.length; i++) {
								if (res.result[i][options.params.filter] == "N/A") {
									res.result[i][options.params.filter] = 0;
								}
								tmpData += parseFloat(res.result[i][options.params.filter]);
							}
							res.result = [];

							var tmpResult = {};
							tmpResult["adm_cd"] = "00";
							tmpResult["adm_nm"] = "전국",
							tmpResult[options.params.filter] = tmpData;
							res.result.push(tmpResult);
							map.lastGeojsonInfo = null;
							isContry = true;
							break;
						}
					}
				}
				return isContry;
			}

	};

	// 최초 한번만 설정되도록 하는 코드임 - 2018.10.17	ywKim	추가
	if ($workRoad.ui.isSetCallback('saMapApi')) return;

	/** ********* OpenAPI 구인자료 현황 조회 Start ********* */
	(function() {
		$class("sop.openApi.sa.workData.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						console.log("[saMapApi.js] sop.openApi.sa.workData.api 호출");
						console.log("[saMapApi.js] sop.openApi.sa.workData.api res.errCd [" + res.errCd);
						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								var isContry = $saMapApi.request.checkContryData(res, options, map);
								if (map.selectedBoundMode == "multi") {
									$saMapApi.request.setMultiStatsData(res, options, isContry);
								}else {
									$saMapApi.request.setStatsData(res, options, isContry);
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$saMapApi.request.openApiWorkData(options.params);
								});
								break;
							case -100:
								if (map.selectedBoundMode == "multi") {
									res["result"] = [];
									$saMapApi.request.setMultiStatsData(res, options);
								}else {
									messageAlert.open(
											"알림",
											"구인자료현황 조회결과가 존재하지 않습니다.",
											function done() {
												map.openApiReverseGeoCode(map.center);
											}
									);
								}
								break;
							default:
								$saMapApi.request.combineFailCnt++;
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
	/** ********* OpenAPI 구인자료 현황 조회  End ********* */

	/** ********* OpenAPI 인구통계총괄 Start ********* */
	(function() {
		$class("sop.openApi.sa.totalPopulation.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {

						console.log("[saMapApi.js] sop.openApi.sa.totalPopulation.api 호출");
						console.log("[saMapApi.js] sop.openApi.sa.totalPopulation.api res.errCd [" + res.errCd);

						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								var isContry = $saMapApi.request.checkContryData(res, options, map);
								if (map.selectedBoundMode == "multi") {
									$saMapApi.request.setMultiStatsData(res, options, isContry);
								}else {
									$saMapApi.request.setStatsData(res, options, isContry);
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$saMapApi.request.openApiTotalPopulation(options.params);
								});
								break;
							case -100:
								if (map.selectedBoundMode == "multi") {
									res["result"] = [];
									$saMapApi.request.setMultiStatsData(res, options);
								}else {
									messageAlert.open(
											"알림",
											"검색결과가 존재하지 않습니다.",
											function done() {
												map.openApiReverseGeoCode(map.center);
											}
									);
									//시계열에서 검색값이 없을 경우
									$saDataBoard.ui.emptyTimerBaseInsert(res, options);
								}
								break;
							default:
								$saMapApi.request.combineFailCnt++;
								map.clearDataOverlay();
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status, options) {

						console.log("[saMapApi.js] sop.openApi.sa.totalPopulation.api onFail 호출");
						console.log("[saMapApi.js] sop.openApi.sa.totalPopulation.api status [" + status);

						var map = options.params.map;
						map.clearData();
						//map.mapInfo.resetTimeSeries(); => 다른것으로 대체
					}
				});
	}());
	/** ********* OpenAPI 인구통계총괄 End ********* */

	/** ********* GridLegend 인구통계총괄 Start ********* */
	(function() {
		$class("sop.openApi.sa.gridLegendTotalPopulation.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {

						console.log("[saMapApi.js] sop.openApi.sa.gridLegendTotalPopulation.api 호출");
						console.log("[saMapApi.js] sop.openApi.sa.gridLegendTotalPopulation.api res.errCd [" + res.errCd);

						var map = options.params.map;

						var result = res.result;
						var tmpData = [[]];

						/*
						if ( result==undefined) {

							//for(var i=0; i < 11; i++) {
							//	tmpData[0].push(i);//result가 undefined일 경우 임의값 세팅
							//}

							//messageAlert.open("알림", "요청 가능 시간이 초과 되었습니다. 다시 한번 요청해 주시기 바랍니다.");
						} else {
							tmpData[0].push(0.01); //범례에서 최소값을 제외하고 화면에 뿌리므로 여기에 최소 더미값을 세팅한다.
							for(var i=0; i < result.length; i++) {
								tmpData[0].push(Number(result[i].val));

							}
						}
						*/
						//일정시간 경과 후 result==undefined가 되는데... 일단 그냥 가자 위에처럼 처리했더니 좀 이상해서...
						//다른 처리를 하지 않고 이렇게 가면 정상 작동된다. 하지만 디버그 툴을 띄워 놓으면 스크립트 오류가 나기는 한다.
						//그냥 이렇게 가는게 정답일듯 하다.
						tmpData[0].push(0.01); //범례에서 최소값을 제외하고 화면에 뿌리므로 여기에 최소 더미값을 세팅한다.
						for(var i=0; i < result.length; i++) {
							tmpData[0].push(Number(result[i].exmpl_value));

						}

						//this.grid_legend_new = [[50000000,500000000,900000000,1000000000,3000000000,5000000000,70000000000,100000000000,500000000000,900000000000]];
						//map.grid_legend_new = tmpData[[0]];
						map.grid_legend_new = tmpData;

						//$("#legendColor_"+options.params.map.legend.id+ " li>a").eq(0).click();
						$("#legendColor_"+map.legend.id+ " li>a").eq(map.gridLegendClickNum).click(); //mng_s 그리드 범례요청

					},
					onFail : function(status, options) {

						console.log("[saMapApi.js] sop.openApi.sa.gridLegendTotalPopulation.api onFail 호출");
						console.log("[saMapApi.js] sop.openApi.sa.gridLegendTotalPopulation.api status [" + status);

						//테스트용
						//options.params.map.grid_legend_new = [[50000000,500000000,900000000,1000000000,3000000000,5000000000,70000000000,100000000000,500000000000,900000000000]];

						//console.log("[saMapApi.js] sop.openApi.sa.gridLegendTotalPopulation.api options.params.map.grid_legend_new [" + options.params.map.grid_legend_new);

						//console.log("[saMapApi.js] sop.openApi.sa.gridLegendTotalPopulation.api click ");
						//$("#legendColor_"+options.params.map.legend.id+ " li>a").eq(0).click();

						//var map = options.params.map;
						//map.clearData();
					}
				});
	}());
	/** ********* GridLegend 인구통계총괄 End ********* */


	/** ********* OpenAPI 인구통계세부조건검색 Start ********* */
	(function() {
		$class("sop.openApi.sa.searchPopulation.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								var isContry = $saMapApi.request.checkContryData(res, options, map);
								if (map.selectedBoundMode == "multi") {
									$saMapApi.request.setMultiStatsData(res, options, isContry);
								}else {
									$saMapApi.request.setStatsData(res, options, isContry);
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$saMapApi.request.openApiSearchPopulation(options.params);
								});
								break;
							case -100:
								if (map.selectedBoundMode == "multi") {
									res["result"] = [];
									$saMapApi.request.setMultiStatsData(res, options);
								}else {
									messageAlert.open(
											"알림",
											"검색결과가 존재하지 않습니다.",
											function done() {
												map.openApiReverseGeoCode(map.center);
											}
									);
								}
								break;
							default:
								$saMapApi.request.combineFailCnt++;
								map.clearDataOverlay();

								//시계열에서 검색값이 없을 경우
								$saDataBoard.ui.emptyTimerBaseInsert(res, options);
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						//map.mapInfo.resetTimeSeries(); => 다른것으로 대체
					}
				});
	}());
	/** ********* OpenAPI 인구통계세부조건검색 End ********* */


	/** ********* OpenAPI 가구통계검색 Start ********* */
	(function() {
		$class("sop.openApi.sa.houseHold.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								var isContry = $saMapApi.request.checkContryData(res, options, map);
								if (map.selectedBoundMode == "multi") {
									$saMapApi.request.setMultiStatsData(res, options, isContry);
								}else {
									$saMapApi.request.setStatsData(res, options, isContry);
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$saMapApi.request.openApiHouseHold(options.params);
								});
								break;
							case -100:
								if (map.selectedBoundMode == "multi") {
									res["result"] = [];
									$saMapApi.request.setMultiStatsData(res, options);
								}else {
									messageAlert.open(
											"알림",
											"검색결과가 존재하지 않습니다.",
											function done() {
												map.openApiReverseGeoCode(map.center);
											}
									);
								}
								break;
							default:
								$saMapApi.request.combineFailCnt++;
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
	/** ********* OpenAPI 가구통계검색 End ********* */


	/** ********* OpenAPI 가구원통계검색 Start ********* */
	(function() {
		$class("sop.openApi.sa.houseHoldMember.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								var isContry = $saMapApi.request.checkContryData(res, options, map);
								if (map.selectedBoundMode == "multi") {
									$saMapApi.request.setMultiStatsData(res, options, isContry);
								}else {
									$saMapApi.request.setStatsData(res, options, isContry);
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$saMapApi.request.openApiHouseHoldMember(options.params);
								});
								break;
							case -100:
								if (map.selectedBoundMode == "multi") {
									res["result"] = [];
									$saMapApi.request.setMultiStatsData(res, options);
								}else {
									messageAlert.open(
											"알림",
											"검색결과가 존재하지 않습니다.",
											function done() {
												map.openApiReverseGeoCode(map.center);
											}
									);
								}
								break;
							default:
								$saMapApi.request.combineFailCnt++;
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
	/** ********* OpenAPI 가구원통계검색 End ********* */


	/** ********* OpenAPI 농가통계검색 Start ********* */
	(function() {
		$class("sop.openApi.sa.FarmHouseHold.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								var isContry = $saMapApi.request.checkContryData(res, options, map);
								if (map.selectedBoundMode == "multi") {
									$saMapApi.request.setMultiStatsData(res, options, isContry);
								}else {
									$saMapApi.request.setStatsData(res, options, isContry);
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$saMapApi.request.openApiFarmHouseHold(options.params);
								});
								break;
							case -100:
								if (map.selectedBoundMode == "multi") {
									res["result"] = [];
									$saMapApi.request.setMultiStatsData(res, options);
								}else {
									messageAlert.open(
											"알림",
											"검색결과가 존재하지 않습니다.",
											function done() {
												map.openApiReverseGeoCode(map.center);
											}
									);
								}
								break;
							default:
								$saMapApi.request.combineFailCnt++;
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
	/** ********* OpenAPI 농가통계검색 End ********* */


	/** ********* OpenAPI 임가통계검색 Start ********* */
	(function() {
		$class("sop.openApi.sa.ForestryHouseHold.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								var isContry = $saMapApi.request.checkContryData(res, options, map);
								if (map.selectedBoundMode == "multi") {
									$saMapApi.request.setMultiStatsData(res, options, isContry);
								}else {
									$saMapApi.request.setStatsData(res, options, isContry);
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$saMapApi.request.openApiForestryHouseHold(options.params);
								});
								break;
							case -100:
								if (map.selectedBoundMode == "multi") {
									res["result"] = [];
									$saMapApi.request.setMultiStatsData(res, options);
								}else {
									messageAlert.open(
											"알림",
											"검색결과가 존재하지 않습니다.",
											function done() {
												map.openApiReverseGeoCode(map.center);
											}
									);
								}
								break;
							default:
								$saMapApi.request.combineFailCnt++;
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
	/** ********* OpenAPI 임가통계검색 End ********* */


	/** ********* OpenAPI 어가통계검색 Start ********* */
	(function() {
		$class("sop.openApi.sa.FisheryHouseHold.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								var isContry = $saMapApi.request.checkContryData(res, options, map);
								if (map.selectedBoundMode == "multi") {
									$saMapApi.request.setMultiStatsData(res, options, isContry);
								}else {
									$saMapApi.request.setStatsData(res, options, isContry);
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$saMapApi.request.openApiFisheryHouseHold(options.params);
								});
								break;
							case -100:
								if (map.selectedBoundMode == "multi") {
									res["result"] = [];
									$saMapApi.request.setMultiStatsData(res, options);
								}else {
									messageAlert.open(
											"알림",
											"검색결과가 존재하지 않습니다.",
											function done() {
												map.openApiReverseGeoCode(map.center);
											}
									);
								}
								break;
							default:
								$saMapApi.request.combineFailCnt++;
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
	/** ********* OpenAPI 어가통계검색 End ********* */


	/** ********* OpenAPI 산업체분류 Start ********* */
	(function() {
		$class("sop.openApi.sa.InderstryCode.api").extend(sop.portal.absAPI)
		.define(
				{
					onSuccess : function(status, res, options) {
						var result = res.result;
						if (res.errCd == "0") {
							var tmpData = [];
							for(var i=0; i < result.length; i++) {
								var tmpObj = {};
								tmpObj.id = result[i].class_code + "_" + options.depth;
								tmpObj.cd = result[i].class_code;
 								tmpObj.text = result[i].class_nm;
								tmpObj.depth = options.depth + 1;

								if (tmpObj.depth > 1) {
									tmpObj.infoIcon = true;
								}

								if (options.depth < 3) {
									tmpObj.children = [{"id": tmpObj.id + "_progress", "iconCls": "icon-tree-loading", "text": "Loading"}];
									tmpObj.state = "closed";
								}else {
									tmpObj.childCount = 0;
								}
								tmpData.push(tmpObj);

							}

							if ($saSubMenu.ui.companyTree == null) {
								if (options.depth == 0) {

									//산업체분류 최상위 '산업체 총괄' 추가
									//mng_s 20180412_김건민 text : 전산업 -> 전체산업으로 변경
									//=============================================================================================//
									var rootData = [];
									var root = {
											id : "root",
											cd : "",
											text : "전체산업",
											state : "closed",
											children : [{"id": "root_progress", "iconCls": "icon-tree-loading", "text": "Loading"}],
											isExpanded : true
									};
									rootData.push(root);
									//=============================================================================================//
									//mng_e 20180412_김건민
									$saSubMenu.ui.companyTree = $("#company_TreeBox").easytree({
										slidingTime:0,
							            building:$saSubMenu.event.companyListTreeWidth,
							            stateChanged:$saSubMenu.event.companyListTreeWidth,
							            toggled:$saSubMenu.event.companyListTreeWidth,
										data : rootData,
										allowActivate: true,
							            disableIcons: true,
							            toggled : function(event, nodes, node) {
											if (node.childCount == null) {
												if (node.children.length > 0 ) {
													if(node.children[0].id == node.id + "_progress") {
														if (node.isExpanded) {
															$saMapApi.request.openApiInterstryCode(
																	node.depth,
																	options.class_deg,
																	node.cd);
														}
													}
												}
											}
										},
										selected : function(node) {
											$saSubMenu.ui.curSelectedCompanyNode = node;
										},
										iconSelected : function(e, id) {
											var id = id.split("_")[1];
											id = id.substring(1, id.length);
											window.open(
													"https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=0"+ options.class_deg +"&strCategoryCode="+ id,
													//"http://kostat.go.kr/kssc/stclass/StClassAction.do?method=ksscTree&classKind=1&catgrp=&code=" + id + "&kssc=popup",
													"통계분류 홈페이지에 오신것을 환경합니다.",
													"width=420, height=400, menubar=no, status=no, toolbar=no, location=no, scrollbars=yes"
											);
										}
									});
									$saSubMenu.ui.companyTree.activateNode(tmpData[0].id);
									$saSubMenu.ui.curSelectedCompanyNode = $saSubMenu.ui.companyTree.getNode(tmpData[0].id);

									//=============================================================================================//
									for (var i=0; i<tmpData.length; i++) {
										$saSubMenu.ui.companyTree.addNode(tmpData[i], "root");
									}
									$saSubMenu.ui.companyTree.removeNode("root_progress");
									$saSubMenu.ui.companyTree.rebuildTree();
									$saSubMenu.ui.companyTree.activateNode("root");
									$saSubMenu.ui.curSelectedCompanyNode = $saSubMenu.ui.companyTree.getNode("root");
									//=============================================================================================//
								}
							}else {
								for (var i=0; i<tmpData.length; i++) {
									$saSubMenu.ui.companyTree.addNode(tmpData[i], options.class_cd + "_" +(options.depth-1));
								}
								$saSubMenu.ui.companyTree.removeNode(options.class_cd + "_" + (options.depth-1) + "_progress");
								$saSubMenu.ui.companyTree.rebuildTree();
								$saSubMenu.ui.companyTree.activateNode(options.class_cd + "_" + (options.depth-1));
							}
						} else if (res.errCd == "-401") {
							accessTokenInfo(function() {
								$saMapApi.request.openApiInterstryCode(
										options.depth,
										options.class_deg,
										options.class_cd);
							});
						} else {
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status) {
					}
				});
	}());
	/** ********* OpenAPI 산업체분류 End ********* */


	/** ********* OpenAPI 사업체분류 Start ********* */
	(function() {
		$class("sop.openApi.sa.Company.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								var isContry = $saMapApi.request.checkContryData(res, options, map);
								if (map.selectedBoundMode == "multi") {
									$saMapApi.request.setMultiStatsData(res, options, isContry);
								}else {
									$saMapApi.request.setStatsData(res, options, isContry);
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$saMapApi.request.openApiCompany(options.params);
								});
								break;
							case -100:
								if (map.selectedBoundMode == "multi") {
									res["result"] = [];
									$saMapApi.request.setMultiStatsData(res, options);
								}else {
									messageAlert.open(
											"알림",
											"검색결과가 존재하지 않습니다.",
											function done() {
												map.openApiReverseGeoCode(map.center);
											}
									);
								}
								break;
							default:
								$saMapApi.request.combineFailCnt++;
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
	/** ********* OpenAPI 사업체분류 End ********* */


	/** ********* OpenAPI 주택분류 Start ********* */
	(function() {
		$class("sop.openApi.sa.House.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var map = options.params.map;
						switch (parseInt(res.errCd)) {
							case 0:
								var isContry = $saMapApi.request.checkContryData(res, options, map);
								if (map.selectedBoundMode == "multi") {
									$saMapApi.request.setMultiStatsData(res, options, isContry);
								}else {
									$saMapApi.request.setStatsData(res, options, isContry);
								}
								break;
							case -401:
								accessTokenInfo(function() {
									$saMapApi.request.openApiHouse(options.params);
								});
								break;
							case -100:
								if (map.selectedBoundMode == "multi") {
									res["result"] = [];
									$saMapApi.request.setMultiStatsData(res, options);
								}else {
									messageAlert.open(
											"알림",
											"검색결과가 존재하지 않습니다.",
											function done() {
												map.openApiReverseGeoCode(map.center);
											}
									);
								}
								break;
							default:
								$saMapApi.request.combineFailCnt++;
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
	/** ********* OpenAPI 주택분류 End ********* */

	/** ********* 메인예시 파라미터정보조회 시작 ********* */
	(function() {
		$class("sop.openApi.sa.mainRecentParamInfo.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res) {
						var result = res.result;
						switch (parseInt(res.errCd)) {
							case 0:
								var infoList = result.infoList;
								$saMap.ui.searchBtnType = "normal";
								if (infoList.length > 1) {
									$saMap.ui.searchBtnType = "combine";
								}
								$saMap.ui.setRevertParams(infoList, "recent");

								for (var i=0; i<infoList.length; i++) {
									var params = JSON.parse(infoList[i].param_info);
									infoList[i]["param_info"] = params;
									if ($saMap.ui.searchBtnType == "combine") {
										infoList[i]["param_info"]["title"] = infoList[i].title.split(" | ")[i];
									}else {
										infoList[i]["param_info"]["title"] = infoList[i].title;
									}
									$saMapApi.request.openApiShareForStats(infoList[i]);
								}
								break;
							default:
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status) {
					}
				});
	}());
	/** ********* 메인예시 파라미터정보조회 종료 ********* */


	/** ********* 북마크/공유 통계정보조회 시작 ********* */
	(function() {
		$class("sop.openApi.sa.shareForStats.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var result = res.result;
						var mapId = getMapDivisionId();		//검색 시 적용 될 지도(맵 분할 시)
						var map = $saMap.ui.mapList[mapId];
						var mapInfo = map.mapInfo;
						var params = options.params.param_info;
						if (map.drawControl != null) {				// 예외처리 - 2019.01.07	ywKim	변경
							map.drawControl.removeOverlay();
						}

						if (res.errCd == "0") {
							var isContry = false;
							for (var p in params.paramInfo) {
								if ( p == "low_search" && params.paramInfo[p] == "0") {
									if (params.paramInfo.adm_cd == "00") {
										var tmpData = 0;
										for (var i=0; i<res.result.length; i++) {
											if (res.result[i][params.showData] == "N/A") {
												res.result[i][params.showData] = 0;
											}
											tmpData += parseFloat(res.result[i][params.showData]);
										}
										res.result = [];

										var tmpResult = {};
										tmpResult["adm_cd"] = "00";
										tmpResult["adm_nm"] = "전국",
										tmpResult[params.showData] = tmpData;
										res.result.push(tmpResult);
										map.lastGeojsonInfo = null;
										isContry = true;
										break;
									}
								}
							}

							//2016.03.29 수정, N/A일 경우, 데이터에서 제외
							var tmpResult = [];
							for (var i=0; i<res.result.length; i++) {
								if (res.result[i][params.showData] != "N/A") {
									tmpResult.push(res.result[i]);
								}
							}
							res.result = tmpResult;

							//2016.03.30 수정, sort 추가
							//통계정보를 sort한다.
							if (res.result != null && res.result.length > 0) {
								res.result = res.result.sort(function(a, b) {
									return parseFloat(b[params.showData])-parseFloat(a[params.showData])
								});
							}

							//사업체 조사에서 전산업일 경우 API_0304로 변경
							if(res.id == "API_0301" && options.params.param_info.api_id == "API_0304") {
								res.id = "API_0304";
							}

							var kosisParams = options.params.param_info;
							if(kosisParams.isKosis) {
								map.clearDataOverlay();
								saMapEtc.tbl_id_linked = kosisParams.paramInfo.tbl_id;
								saMapEtc.map = map;

								var year = saMapEtc.kosis_data_year;
								if(year.length > 4) {
									year = year.substring(0, 4);
								}
								map.bnd_year = year;

								result = result.kosisData;
								saMapEtc.kosis_result_data = [];
								saMapEtc.kosis_result_data = result;
								saMapEtc.kosis_select_menu_text = decodeURI(options.params.param_info.title);
								saMapEtc.curSelectedTitle = decodeURI(options.params.param_info.title);
								saMapEtc.setKosisStatsData(null, options);

								options["zoomlevel"] = map.zoom;
								options["center"] = map.center;
								options["dist_level"] = saMapEtc.gis_se;
								options.params["map"] = map;
//								map.shareInfo.setShareInfo(options.params, "share", map.id);// 2018.10.24	ywKim	주석
								map.mapMove(kosisParams.mapInfo.center,kosisParams.mapInfo.zoomlevel, false);
								$saDataBoard.ui.updateDataBoard(res, options);
								return;
							}

							if (isContry) {
								res["pAdmCd"] = "";
							}else {
								res["pAdmCd"] = options.params.param_info.paramInfo.adm_cd;
							}

							$saMap.ui.data = res;
							map.bnd_year = params.paramInfo.bnd_year;

							// 일반검색 버튼일 경우,
							if ($saMap.ui.searchBtnType == "normal") {
								var tmpAdmCd = "";
								if (params.paramInfo.adm_cd.indexOf(",") != -1) {
									map.multiLayerControl.setStatsData("normal", res, options, true);
									tmpAdmCd = options.params.adm_cd;
								}else {
									map.setStatsData("normal", res, params.showData, params.unit);
									tmpAdmCd = options.params.param_info.paramInfo.adm_cd;
								}
								if (params.legend != undefined && params.legend.type != undefined) {
									map.legend.setLegendParams(params.legend.type, params.legend.color, params.legend.level);
								}
								map.mapMove(params.mapInfo.center, params.mapInfo.zoomlevel, false);
								$saMap.ui.updateSearchTitle(options.params.param_info.title, options.params.param_info.unit, map.id);

								var params = new Array();
								for (p in options.params.param_info.paramInfo) {
									params.push({
										"key" : p,
										"value" : options.params.param_info.paramInfo[p]
									});
								}

								var tmpOptions = {
									type : "A0",
									params : {
										api_id : options.params.param_info.api_id,
										filter : options.params.param_info.showData,
										map : map,
										param : params,
										title : options.params.param_info.title,
										unit : options.params.param_info.unit,
										adm_cd : tmpAdmCd,
										adm_nm : result[0].adm_nm
									},
									btntype : "items"
								}

								if (options.params.param_info.btntype != "items") {
									tmpOptions.btntype = "normal";
								}
								map.shareInfo.setShareInfo(options.params, "share", map.id);

								//시계열 초기값 세팅
								$saDataBoard.ui.timeSeriesInit(tmpOptions.params);

								$saDataBoard.ui.updateDataBoard(res, tmpOptions);	//데이터보드

								//API로그 쌓기 (행정동코드로 지역 조회)
								addrCdToNm(map.bnd_year, tmpOptions.params.adm_cd, tmpOptions);

							}

						} else if (res.errCd == "-401") {
							accessTokenInfo(function() {
								$saMapApi.request.openApiShareForStats(options.params, options.adm_cd);
							});
						} else if (res.errCd == "-100") {
							if (map.selectedBoundMode == "multi") {
								res["result"] = [];
								map.multiLayerControl.setStatsData("normal", res, options, true);
							}else {
								messageAlert.open(
										"알림",
										"검색결과가 존재하지 않습니다.",
										function done() {
											map.openApiReverseGeoCode(map.center);
										}
								);
							}
						}
					},
					onFail : function(status, options) {
						var mapId = getMapDivisionId();		//검색 시 적용 될 지도(맵 분할 시)
						var map = $saMap.ui.mapList[mapId];
						map.clearData();
					}
				});
	}());
	/** ********* 북마크/공유 통계정보조회 종료 ********* */


	/** ********* 로그인 시작 ********* */
	(function() {
		$class("sop.portal.sa.login.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						if (res.errCd == "0") {
							var result = res.result;
							sessionInfo();
							$(".deem").hide();
							$(".login_pop").hide();

							// 2018.10.24	ywKim	주석
//							$saMapApi.request.openApiRegBookmark(
//									$saMap.ui.shareUrlInfoList[parseInt($saMap.ui.curMapId)],
//									$saMap.ui.share_type,
//									$saMap.ui.curMapId+1);

							//개발자 로그인
							$saMapApi.request.openApiDeveloperLoginProcess(options.id, options.pwd);

						} else {
							messageAlert.open("알림", res.errMsg);

							//비밀번호 초기화
							$(".plogin_pw").val("");
						}
					},
					onFail : function(status) {
					}
				});
	}());
	/** ********* 로그인 종료 ********* */

	/** ********* 개발자 로그인 시작 ********* */
	(function() {
		$class("sop.portal.sa.developerLogin.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						if (res.errCd == "0") {
						} else {
						}
					},
					onFail : function(status) {
					}
				});
	}());
	/** ********* 개발자 로그인 종료 ********* */


	/** ********* 통계별최신년도정보 조회 시작 ********* */
	(function() {
		$class("sop.portal.sa.statBaseYear.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						if (res.errCd == "0") {
							var result = res.result;
							if(result.base_year != null) {
								var searchbtnCnt = $saSubMenu.ui.searchbtnCnt - 1;
								var param_info = null;
								var tmpParamList = null;
								for (var i = 0; i < $saSubMenu.ui.arParamList.length; i++) {
									if($saSubMenu.ui.arParamList[i].idx == searchbtnCnt) {
										tmpParamList = $saSubMenu.ui.arParamList[i];
										param_info = tmpParamList.params;
										break;
									}
								}

								var maxYear = "";
								if (param_info != null) {
									/*for(var i = 0; i < param_info.length; i ++) {
										if(param_info[i].key == "year") {
											param_info[i].value = result.base_year;
											maxYear = result.base_year;
											break;
										}
									}*/
									maxYear = result.base_year;
									if(tmpParamList != null) {
										tmpParamList["maxYear"] = maxYear;
									}
								}
							}
						} else {
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status) {
					}
				});
	}());
	/** ********* 통계별최신년도정보 조회 종료 ********* */

	/** ********* 사용자지정영역검색 시작 ********* */
	(function() {
		$class("sop.openApi.sa.userDrawForStats.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						if (res.errCd == "0") {
							var result = res.result[0];
							var radius = 0;
							if (options.layer.layer.layerType == "circle") {
								radius = parseFloat(options.layer.layer._mRadius);
							}else {
								radius = 100;
							}
							var html = "<table style='width:"+ radius +"px; margin-top:-40px; margin-left:-"+radius/2+"px'>";

							//사용자 지정데이터가 5미만 일시, N/A로 처리=> 개인정보이슈
							if (parseFloat(result[options.params.filter]) <= 5) {
								html += "<tr>";
								html += 	"<td align='center' style='font-size:2.0em; color:#262626';>";
								html += 	"N/A";
								html += 	"</td>"
								html += "</tr>";
							}else {
								html += "<tr>";
								html += 	"<td align='center' style='font-size:2.0em; color:#262626'; font-weight:bold>";
								html += 	appendCommaToNumber(result[options.params.filter]);
								html += 	"<span style='font-size:12px;'>(" + options.params.unit + ")</span>";
								html += 	"</td>";
								html += "</tr>";
							}
							html += "</table>";

							options.layer.layer.setCaption({
								title : html,
								showAllZoomLevel : false
							});

						} else {
							options.layer.shapeGroup.thisShapeRemove();
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status, options) {
						options.layer.shapeGroup.thisShapeRemove();
					}
				});
	}());
	/** ********* 사용자지정영역검색 종료 ********* */

	/*********** (통계표) OpenAPI 지오코딩 검색 Start **********/
	(function() {
	    $class("sop.openApi.sa.geocode.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	            if(res.errCd == "0") {
	            	var result = res.result;
	            	for(var  i = 0; i < result.resultdata.length; i ++) {
	            		var dongCd = "";
	            		if(result.resultdata[i].addr_type == "1") {		//시도
	            			dongCd = "00";
	            		} else if(result.resultdata[i].addr_type == "2") {	//시군구
	            			dongCd = "00000";
	            		} else {
	            			dongCd = "0000000";	//읍면동
	            		}

	            		var arrayKey = $saMap.ui.sKeyword.split(" ");
	            		if(arrayKey.length < 2) {
	            			$saMap.ui.addressAdmCd = "";
	            			$saMap.ui.x = "962202";
		            		$saMap.ui.y = "1839421";
	            		} else {
	            			$saMap.ui.addressAdmCd = dongCd;
	            			$saMap.ui.x = result.resultdata[i].x;
		            		$saMap.ui.y = result.resultdata[i].y;
	            		}

	            		break;
	            	}
	            } else if (res.errCd == "-401") {
	            	accessTokenInfo(function() {
	            		$saMapApi.request.openApiGeocode(options.address);
	            	});
	            }  else if (res.errCd == "-100") {
	            	$saMap.ui.addressAdmCd = "";
        			$saMap.ui.x = "962202";
            		$saMap.ui.y = "1839421";
	            }
	            else {
	                //messageAlert.open("알림", res.errMsg);
	            }

	            //SOP 검색
	            var arrayKey = $saMap.ui.sKeyword.split(" ");
	            if(arrayKey.length < 2) {
					$saMapApi.request.openApiSOP($saMap.ui.sKeyword, $saMap.ui.sopCurrentPageIndex);
	            } else {
	            	$saMapApi.request.openApiSOP($saMap.ui.searchKeyword, $saMap.ui.sopCurrentPageIndex);
	            }
	            //KOSIS 검색
//	            $saMapApi.request.openApiKOSIS($saMap.ui.sKeyword, $saMap.ui.kosisCurrentPageIndex);
	        },
	        onFail : function(status) {
	        	//SOP 검색
	        	var arrayKey = $saMap.ui.sKeyword.split(" ");
	            if(arrayKey.length < 2) {
					$saMapApi.request.openApiSOP($saMap.ui.sKeyword, $saMap.ui.sopCurrentPageIndex);
	            } else {
	            	$saMapApi.request.openApiSOP($saMap.ui.searchKeyword, $saMap.ui.sopCurrentPageIndex);
	            }
	            //KOSIS 검색
//	            $saMapApi.request.openApiKOSIS($saMap.ui.sKeyword, $saMap.ui.kosisCurrentPageIndex);
	        }
	    });
	}());
	/*********** (통계표) OpenAPI 지오코딩 검색 End **********/

	/*********** (통계표) OpenAPI SOP 검색 Start **********/
	(function() {
	    $class("sop.openApi.sa.sopsearch.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
            	$("#sopListTable").empty();
            	$("#sopListTablePage").empty();
	            if(res.errCd == "0") {
	            	var result = res.result;

	            	//SOP
	            	var html = "<div class='search_result_list' style='margin: 10px 10px 10px 10px;'>";
       			 	html += "<p style='font-weight: bold;'>대화형 통계지도 검색결과</p>";
       			 	html += "<ul>";
	            	for(var i = 0; i < result.resultdata.length; i++) {
	            		var elem = result.resultdata[i];
	            		html += "<li id='sopList_"+i+"' style='line-height: 30px;'>";
	            		html += "	<div style='float: left; font-size: 5px;'>● </div>"	//리버스지오코딩 : 법정동->행정동
	            		html += "	<div style='cursor: pointer; margin-left: 20px; font-size: 11px;' onclick=\"javascript:$saMapApi.request.searchReverseGeoCode('sop', '"+elem.url + "','"+elem.nm+"')\">" + elem.nm + "</div>";
	            		html += "</li>";
	            	}
	            	html += "</ul>";
	            	html += "</div>";
            		$("#sopListTable").html(html);

            		if(result.totalcount > 5){
            			var htmlPage = "<div id='sopPaging' class='pagenation' align='center' style='width: 100%;'><span class='pages'></span></div>";
            			$("#sopListTablePage").html(htmlPage);
            		}
            		$saMap.ui.sopPaging(result.totalcount, $saMap.ui.sopCurrentPageIndex);

	            } else if(res.errCd == "-401") {
	            	accessTokenInfo(function() {
	            		$saMapApi.request.openApiSOP(options.searchword, options.pagenum);
	            	});
	            }
	        },
	        onFail : function(status) {
	        }
	    });
	}());
	/*********** (통계표) OpenAPI SOP 검색 End **********/

	/*********** (통계표) OpenAPI KOSIS 검색 Start **********/
//	(function() {
//	    $class("sop.openApi.sa.kosissearch.api").extend(sop.portal.absAPI).define({
//	        onSuccess : function(status, res, options) {
//	        	$("#kosisListTable").empty();
//	        	$("#kosisListTablePage").empty();
//	            if(res.errCd == "0") {
//	            	var result = res.result;
//	            	$saMap.ui.searchKosisParam = [];
//            		//KOSIS
//	            	if(result.resultdata != undefined) {
//	            		var html = "<div class='search_result_list' style='margin: 10px 10px 10px 10px;'>";
//	            			 html += "<p style='font-weight: bold;'>행정구역통계 검색결과</p>";
//	            			 html += "<ul>";
//	            		for(var x = 0; x < result.resultdata.length; x ++) {
//	            			var elem = result.resultdata[x];
//	            			elem["type"] = "kosis";
//	            			elem["adm_cd"] = $saMap.ui.addressAdmCd;
//	            			elem["x"] = $saMap.ui.x;
//	            			elem["y"] = $saMap.ui.y;
//
//	            			html += "<li style='line-height: 30px;'>";
//	            			html += 	"<div style='float: left; font-size: 5px;'>● </div>"	//리버스지오코딩 : 법정동->행정동
//	        	            html += "	<div style='cursor: pointer; margin-left: 20px; font-size: 11px;' onclick=\"javascript:$saMapApi.request.searchReverseGeoCode('kosis', '"+x + "', '"+elem.stat_title+"')\">" /*+ elem.menu_level_nm1  + " > " */+ elem.stat_title + "</div>";
//	            			html += "</li>";
//
//	            			$saMap.ui.searchKosisParam.push(elem);
//	            		}
//
//	            		html += "</ul>";
//	            		html += "</div>";
//	            		$("#kosisListTable").html(html);
//	            		if(result.totalcount > 5){
//		            		var htmlPage = "<div id='kosisPaging' class='pagenation' align='center' style='width: 100%;'><span class='pages'></span>";
//		            		$("#kosisListTablePage").html(htmlPage);
//	            		}
//	            		$saMap.ui.kosisPaging(result.totalcount, $saMap.ui.kosisCurrentPageIndex);
//	            	}
//
//	            } else if(res.errCd == "-401") {
//	            	accessTokenInfo(function() {
//	            		$saMapApi.request.openApiKOSIS(options.searchword, options.pagenum);
//	            	});
//	            }
//	        },
//	        onFail : function(status) {
//	        }
//	    });
//	}());
	/*********** (통계표) OpenAPI KOSIS 검색 End **********/

	/** ********* (통계표) OpenAPI 리버스지오코딩 Start ********* */
	(function () {
		$class("sop.openApi.sa.searchReverseGeoCode.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var that = options.target;
				if (res.errCd == "0") {
					var result = res.result[0];
					if ($saMap.ui.addressAdmCd != "") {
						if (options.division == "sop") {		//SOP
							if($saMap.ui.addressAdmCd.length == 2) {
								$saMap.ui.addressAdmCd = result.sido_cd;
							}else if ($saMap.ui.addressAdmCd.length == 5) {
								$saMap.ui.addressAdmCd = result.sido_cd + result.sgg_cd;
							}else if ($saMap.ui.addressAdmCd.length == 7) {
								$saMap.ui.addressAdmCd = result.sido_cd + result.sgg_cd + result.emdong_cd;
							}else {
								$saMap.ui.addressAdmCd = "00";
							}
						} else {	//KOSIS
							$saMap.ui.addressAdmCd = result.sido_cd + result.sgg_cd + result.emdong_cd;
						}
					}


					if(options.division == "sop") {
						var elem = [];
						elem["type"] = options.type;
            			elem["adm_cd"] = $saMap.ui.addressAdmCd;
            			elem["x"] = $saMap.ui.x;
            			elem["y"] = $saMap.ui.y;
            			elem["params"] = getAllParameter(decodeURIComponent(options.url).substring(options.startLen+11, options.url.length));
            			elem["title"] = options.title;
            			$saMap.ui.searchSOPParam = [elem];
            			$saMap.ui.analysisSearchInfo("sop", 0);
					} else if(options.division == "kosis") {
						var x = options.url;
						$saMap.ui.searchKosisParam[x]["adm_cd"] = $saMap.ui.addressAdmCd;
						$saMap.ui.searchKosisParam[x]["x"] = $saMap.ui.x;
						$saMap.ui.searchKosisParam[x]["y"] = $saMap.ui.y;
						$saMap.ui.searchKosisParam[x]["title"] = options.title;
						$saMap.ui.analysisSearchInfo("kosis", x);
					}
				}
				else if (res.errCd == "-401") {
					accessTokenInfo(function() {
						that.searchReverseGeoCode(options.division, options.url, options.title);
					});
				}
				else {
					if(options.division == "sop") {
						var elem = [];
						elem["type"] = options.type;
            			elem["adm_cd"] = $saMap.ui.addressAdmCd;
            			elem["x"] = $saMap.ui.x;
            			elem["y"] = $saMap.ui.y;
            			elem["params"] = getAllParameter(decodeURIComponent(options.url).substring(options.startLen+11, options.url.length));
            			elem["title"] = options.title;
            			$saMap.ui.searchSOPParam = [elem];
            			$saMap.ui.analysisSearchInfo("sop", 0);
					} else if(options.division == "kosis") {
						var x = options.url;
						$saMap.ui.searchKosisParam[x]["adm_cd"] = $saMap.ui.addressAdmCd;
						$saMap.ui.searchKosisParam[x]["x"] = $saMap.ui.x;
						$saMap.ui.searchKosisParam[x]["y"] = $saMap.ui.y;
						$saMap.ui.searchKosisParam[x]["title"] = options.title;
						$saMap.ui.analysisSearchInfo("kosis", x);
					}
				}
			},
			onFail : function (status, options) {
				if(options.division == "sop") {
					var elem = [];
					elem["type"] = options.type;
        			elem["adm_cd"] = $saMap.ui.addressAdmCd;
        			elem["x"] = $saMap.ui.x;
        			elem["y"] = $saMap.ui.y;
        			elem["params"] = getAllParameter(decodeURIComponent(options.url).substring(options.startLen+11, options.url.length));
        			elem["title"] = options.title;
        			$saMap.ui.searchSOPParam = [elem];
        			$saMap.ui.analysisSearchInfo("sop", 0);
				} else if(options.division == "kosis") {
					var x = options.url;
					$saMap.ui.searchKosisParam[x]["adm_cd"] = $saMap.ui.addressAdmCd;
					$saMap.ui.searchKosisParam[x]["x"] = $saMap.ui.x;
					$saMap.ui.searchKosisParam[x]["y"] = $saMap.ui.y;
					$saMap.ui.searchKosisParam[x]["title"] = options.title;
					$saMap.ui.analysisSearchInfo("kosis", x);
				}
			}
		});
	}());
	/** ********* (통계표) OpenAPI 리버스지오코딩. End ********* */

	/** ********* 조건결합통계 Start ********* */
	(function() {
		$class("sop.openApi.sa.itemcombine.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						if (res.errCd == "0") {
							var params = options.params;
							var map = params.map;
							var result = res.result;
							var resId = res.id;	//9월 서비스
							var isContry = $saMapApi.request.checkContryData(res, options, map);
							if (isContry) {
								res["pAdmCd"] = "";
							}else {
								res["pAdmCd"] = params.adm_cd;
							}

							if (map.drawControl != null) {				// 예외처리 - 2019.01.07	ywKim	변경
								map.drawControl.removeOverlay();
							}

							//API ID가 인구, 가구, 주택 조회일 경우 결합조건으로 변경
							//9월 서비스
							if(resId == "API_0302" || resId == "API_0305" || resId == "API_0306") {
								res.id = "4011";
								var tmpData = [];
								for(var i = 0; i < result.length; i ++) {	//population 데이터를 data_cnt로 옮기는 작업
									var tmpDataCnt = "";
									if(resId == "API_0302") {
										tmpDataCnt = result[i].population;
									} else if(resId == "API_0305") {
										tmpDataCnt = result[i].household_cnt;
									} else if(resId == "API_0306") {
										tmpDataCnt = result[i].house_cnt;
									}
									tmpData.push({
										"adm_cd" : result[i].adm_cd,
										"adm_nm" : result[i].adm_nm,
										"data_cnt" : tmpDataCnt
									});
								}
								res.result = tmpData;
							}

							$saMapApi.request.setStatsData(res, options, isContry);
							map.autoDownBoundary();

							// 북마크,공유정보 설정
							options["zoomlevel"] = map.zoom;
							options["center"] = map.center;
							options["btntype"] = "items";
//							$saMap.ui.setShareInfo(options, "normal", map.id);
							map.shareInfo.setShareInfo(options, "normal", map.id);

						} else if (res.errCd == "-401") {
							accessTokenInfo(function() {
								$saMapApi.request.openApiItemCombine(options.params);
							});
						} else {
							var map = options.params.map;
							map.clearDataOverlay();
							//map.mapInfo.resetMapInfo();
							//map.mapInfo.emptyTimerBaseInsert(res, options);
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
						//map.mapInfo.resetTimeSeries();
					}
				});
	}());
	/** ********* 조건결합통계 End ********* */

	/** ********* 사용자영역 경계조회 Start ********* */
	(function() {
		$class("sop.openApi.sa.userAreaBoundObj.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var map = options.map;
						var layer = options.layer;
						switch (parseInt(res.errCd)) {
							case 0:
								if (map.geojson) {
									map.geojson.remove();
								}
								if (map.dataGeojson) {
									map.dataGeojson.remove();
								}
								map.multiLayerControl.clear();
								layer.shapeGroup.thisShapeRemove();
								map.addPolygonGeoJson(res, "polygon");
								if (map.geojson) {
									map.geojson.eachLayer(function(layer) {
										layer.setStyle({
											weight : 3,
											color : "white",
											dashArray : layer.options.dashArray,
											fillOpacity : 0.7,
											fillColor : "#F06292"
										});
										map.selectedBoundList.push(layer);
									});
								}
								break;
							default:
								layer.shapeGroup.thisShapeRemove();
								map.mapBtnInfo.doClearSelectedBound();
								map.mapBtnInfo.setFixedBoundBtn(false);
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status, options) {
						var map = options.map;
						var layer = options.layer;
						layer.shapeGroup.thisShapeRemove();
						map.mapBtnInfo.doClearSelectedBound();
						map.mapBtnInfo.setFixedBoundBtn(false);
					}
				});
	}());
	/** ********* 사용자영역 경계조회 End ********* */

}(window, document));