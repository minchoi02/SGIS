/**
 * 창업지원 화면에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2014/11/05  초기 작성
 * author : 권차욱, 김성현, 석진혁
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$bizStatsMapApi = W.$bizStatsMapApi || {};
	
	$bizStatsMapApi.request = {
			
			API_0301_URL : "/OpenAPI3/stats/population.json",
			API_0302_URL : "/OpenAPI3/stats/innersearchpopulation.json",
			API_0303_URL : "/OpenAPI3/stats/industrycode.json",
			API_0304_URL : "/OpenAPI3/stats/company.json",
			API_0305_URL : "/OpenAPI3/stats/household.json",
			API_0306_URL : "/OpenAPI3/stats/house.json",
			API_0307_URL : "/OpenAPI3/stats/farmhousehold.json",
			API_0308_URL : "/OpenAPI3/stats/forestryhousehold.json",
			API_0309_URL : "/OpenAPI3/stats/fisheryhousehold.json",
			API_0310_URL : "/OpenAPI3/stats/householdmember.json",
			API_0601_URL : "/OpenAPI3/startupbiz/startupbiz.json",
			API_0615_URL : "/OpenAPI3/startupbiz/sggtobcorpcount.json",
			API_COMPANY_DENSITY_URL : "/ServiceAPI/bizStats/poiCompanyDensity.json",
			API_COMPANY_OPEN_URL : "/ServiceAPI/bizStats/poiCompanyOpen.json",
			API_COMPANY_BEST_URL : "/ServiceAPI/bizStats/poiCompanyBest.json", //mng_s
			
			/**
			 * 
			 * @name         : openApiPplSummary
			 * @description  : 창업통계
			 * @date         : 2014. 11. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param : options
			 */
			openApiPplSummary : function(options) {
				var parameter = "";
				//타이틀
				var title = options.title;	
				for(var i = 0; i < options.params.length; i++) {
					parameter += options.params[i].key + "=" + options.params[i].value + "&";
				}
				//줌레벨
				var zoomLevel = options.map.zoom;
				//지역정보
				var adm_nm = options.adm_nm;
				apiLogWrite2('B0', 'B01', title, parameter, zoomLevel, adm_nm);
				// mng_s 20190423 김건민
				srvLogWrite('G1', '07', '02', '00', title , '');
				// mng_e 20190423 김건민
				var sopOpenApiPplSummaryObj = new sop.openApi.pplsummary.api();
				sopOpenApiPplSummaryObj.addParam("accessToken", accessToken);
				
				var isBndYear = false;
				for (var i = 0; i < options.params.length; i++) {
					sopOpenApiPplSummaryObj.addParam(options.params[i].key, options.params[i].value);
				}
				
				if ( options.adm_cd != "00") {
					sopOpenApiPplSummaryObj.addParam("adm_cd", options.adm_cd);
				}
				
				sopOpenApiPplSummaryObj.request({
					method : "GET",
					async : false,
					url : openApiPath + this.API_0601_URL,
					options : {
						btntype : "areaSearch",
						params : options,
						url : this.API_0601_URL,
					}
				});
			},
			
			/**
			 * 
			 * @name         : openApiStatBaseYearProcess
			 * @description  : 통계별최신년도 정보를 조회한다.
			 * @date         : 2014. 10. 17. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			openApiStatBaseYearProcess : function(api_id, params, options) {
				var sopStatBaseYearObj = new sop.portal.statBaseYear.api();
				var param_info = new Array();
				for (key in params) {
					param_info.push(key);
				}
				sopStatBaseYearObj.addParam("api_id", api_id);
				sopStatBaseYearObj.addParam("param_info", param_info);
				sopStatBaseYearObj.request({
					method : "POST",
				    async : true,
				    url : contextPath+"/ServiceAPI/map/interactive/statBaseYear.json",
				    options : {
				    	api_id : api_id,
				    	params : params,
				    	options : options
				    }
				});
			},
			
			/**
			 * 
			 * @name         : openApiBizStats
			 * @description  : 창업통계정보를 호출한다.
			 * @date         : 2014. 10. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 통계정보 파라미터
			 */
			openApiBizStats : function(params) {
				var sopOpenApiBizStatsObj = new sop.openApi.bizStats.api();
				var paramInfo = params.param_info.paramInfo;
				for (k in paramInfo) {
					if (k == "adm_cd") {
						if(paramInfo[k] == "00") {
							continue;
						}
					}
					sopOpenApiBizStatsObj.addParam(k, paramInfo[k]);
				} 
				
				sopOpenApiBizStatsObj.addParam("accessToken", accessToken);		
				sopOpenApiBizStatsObj.request({
					method : "GET",
					async : false,
					url : openApiPath + params.api_call_url,
					options : {
						btntype : "normal",
						params : params,
					}
				});
			},
			
			/**
			 * 
			 * @name         : openApiSggCompanyCnt
			 * @description  : 전국 시군구 사업체 정보를 호출한다.
			 * @date         : 2015. 11. 20. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param themeCd : 테마코드
			 */
			openApiSggCompanyCnt : function(adm_cd, themeCd, themeNm, map, idx) {
				
				/*
				alert("[bizStatsMapApi.js]openApiSggCompanyCnt() adm_cd[" + adm_cd);
				alert("[bizStatsMapApi.js]openApiSggCompanyCnt() themeCd[" + themeCd);
				alert("[bizStatsMapApi.js]openApiSggCompanyCnt() themeNm[" + themeNm);
				alert("[bizStatsMapApi.js]openApiSggCompanyCnt() map[" + map);
				alert("[bizStatsMapApi.js]openApiSggCompanyCnt() idx[" + idx);
				*/
				if(idx == undefined) {
					idx = "0";//사업체
				}
				
				var sopOpenApiSggCompanyCntObj = new sop.openApi.sggCompanyCnt.api();
				sopOpenApiSggCompanyCntObj.addParam("theme_cd", themeCd);
				sopOpenApiSggCompanyCntObj.addParam("accessToken", accessToken);	
				sopOpenApiSggCompanyCntObj.request({
					method : "GET",
					async : false,
					url : openApiPath + this.API_0615_URL,
					options : {
			        	btntype : "chart",
			        	api_id : "API_0615",
			        	params : {
			        		jobAreaThemeCd : adm_cd,
							theme_cd : themeCd,
							adm_nm : "전국"
			        	},
			        	map : map,
			        	themeCd : themeCd,
						themeNm : themeNm,
						url : this.API_0615_URL,
						idx : idx
			        }
				});
			},
			/**
			 * 
			 * @name         : openApiSggMap
			 * @description  : 시군구 맵 색 변화를 위한 전국 사업체 수, 업종 비율, 거주인구, 직장인구, 가구 수, 종사자 수, 평균종사자 수 에 대한 값 호출
			 * @date         : 2018. 09. 14. 
			 * @author	     : 박길섭
			 * @history 	 :
			 * @param themeCd : 테마코드
			 */
			openApiSggMap : function(themeCd, themeNm, map,type) {
				/*if(idx == undefined) {
					idx = "0";//사업체
				}*/
				// 2020년 SGIS고도화 3차(테마코드) 시작 - DB에서 사용하는 테이블 내의 theme_cd와 완전히 일치시키기 위한 작업  (pse)
				if($themeCdCommon.isBigThemeCd(themeCd)) {
					themeCd += '000'; 
				}
				if(themeCd === '00') {
					themeCd += '00';
				}
				// 2020년 SGIS고도화 3차(테마코드) 끝 - DB에서 사용하는 테이블 내의 theme_cd와 완전히 일치시키기 위한 작업  (pse)
				var sopOpenApiSggMapObj = new sop.openApi.openApiSggMap.api();
				sopOpenApiSggMapObj.addParam("sido_cd", null);
				sopOpenApiSggMapObj.addParam("chart_or_map", null);	
				sopOpenApiSggMapObj.addParam("theme_cd", themeCd);
				sopOpenApiSggMapObj.addParam("accessToken", accessToken);	
				sopOpenApiSggMapObj.request({
					method : "GET",
					async : false,
					url : openApiPath + "/OpenAPI3/startupbiz/sggbarchart.json",
					options : {
			        	btntype : "chart",
			        	api_id : "API_0629",
			        	params : {
			        		themeCd : themeCd,
							themeNm : themeNm,
			        	},
			        	map : map,
			        	type : type
			        }
				});
			},
			
			/**
			 * 
			 * @name         : openApiPoiCompanyDensity
			 * @description  : 업종별 밀집도정보를 조회한다. - 업종별 poi정보
			 * @date         : 2015. 11. 24. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param themeCd : 테마코드
			 * @param admCd : 행정동코드
			 * @param year	: 데이터년도
			 * @param pageNum : 조회시작 인덱스
			 * @param resultCount : 조회갯수
			 */
			openApiPoiCompanyDensity_back : function(themeCd, admCd, year, pageNum, resultCount, map, options) {
				var sopOpenApiPoiCompanyDensityObj = new sop.openApi.poiCompanyDensity.api();
				sopOpenApiPoiCompanyDensityObj.addParam("theme_cd", themeCd);
				//sopOpenApiPoiCompanyDensityObj.addParam("adm_cd", admCd);
				sopOpenApiPoiCompanyDensityObj.addParam("year", year);
				sopOpenApiPoiCompanyDensityObj.addParam("pagenum", pageNum);
				sopOpenApiPoiCompanyDensityObj.addParam("resultcount", resultCount);
				sopOpenApiPoiCompanyDensityObj.request({
					method : "POST",
					async : true,
					url : contextPath + this.API_COMPANY_DENSITY_URL,
					options : {
						themeCd : themeCd,
						//admCd : admCd,
						year : year,
						pageNum : pageNum,
						resultCount : resultCount,
						url : this.API_COMPANY_DENSITY_URL,
						map : map,
						options : options
					}
				});
			},
			
			
			/**
			 * 
			 * @name         : openApiPoiCompanyDensity
			 * @description  : 업종별 밀집도정보를 조회한다. - 업종별 poi정보
			 * @date         : 2016. 06. 15. 
			 * @author	     : 최재영
			 * @history 	 : 열지도를 집계데이터로 뿌리기 위해 별도로 생성한 정보
			 * @param themeCd : 테마코드
			 * @param admCd : 행정동코드
			 * @param year	: 데이터년도
			 * @param pageNum : 조회시작 인덱스
			 * @param resultCount : 조회갯수
			 */
			openApiPoiCompanyDensity : function(type, params, map, callback) {
				
				var sopOpenApiPoiCompanyDensityObj = new sop.openApi.poiCompanyDensityTest.api();
				for (var p in params) {
					if (p !== "etc") {
						sopOpenApiPoiCompanyDensityObj.addParam(p, params[p]);
					}
				}
				var parameter = "";
				for (var p in params) {
					parameter += p + "=" + params[p] + "& "
				}
				parameter += "data_type= " + type + "&";
				sopOpenApiPoiCompanyDensityObj.addParam("data_type", type);
				sopOpenApiPoiCompanyDensityObj.request({
					method : "POST",
					async : false,
					url : contextPath + this.API_COMPANY_DENSITY_URL,
					options : {
						type : type,
						params : params,
						url : this.API_COMPANY_DENSITY_URL,
						map : map,
						callback : callback
					}
				});
				apiLogWrite2('B0', 'B34', '업종밀집도 시계열현황', parameter, map.zoom, "없음");
				
				/*var sopOpenApiPoiCompanyDensityObj = new sop.openApi.poiCompanyDensity.api();
				sopOpenApiPoiCompanyDensityObj.addParam("theme_cd", themeCd);
				sopOpenApiPoiCompanyDensityObj.addParam("year", year);
				sopOpenApiPoiCompanyDensityObj.addParam("pagenum", pageNum);
				sopOpenApiPoiCompanyDensityObj.addParam("resultcount", resultCount);
				sopOpenApiPoiCompanyDensityObj.request({
					method : "POST",
					async : true,
					url : contextPath + this.API_COMPANY_DENSITY_URL,
					options : {
						themeCd : themeCd,
						//admCd : admCd,
						year : year,
						pageNum : pageNum,
						resultCount : resultCount,
						url : this.API_COMPANY_DENSITY_URL,
						map : map,
						options : options
					}
				});*/
			},
			/**
			 * 
			 * @name         : openApiLqMap
			 * @description  : 전국 입지계수 지도 정보를 호출한다.
			 * @date         : 2018. 09. 04. 
			 * @author	     : 박길섭
			 * @history 	 :
			 * @param themeCd : 테마코드
			 */
			openApiLqMap : function(themeCd, themeNm,type,map,year) {
				/*alert("[bizStatsMapApi.js]openApiSggCompanyCnt() adm_cd[" + adm_cd);
				alert("[bizStatsMapApi.js]openApiSggCompanyCnt() themeCd[" + themeCd);
				alert("[bizStatsMapApi.js]openApiSggCompanyCnt() themeNm[" + themeNm);
				alert("[bizStatsMapApi.js]openApiSggCompanyCnt() map[" + map);
				alert("[bizStatsMapApi.js]openApiSggCompanyCnt() idx[" + idx);
				
				if(idx == undefined) {
					idx = "0";//사업체
				}*/
				
				var sopApiLqMap = new sop.portal.LqMap.api();
				sopApiLqMap.addParam("accessToken", accessToken);
				sopApiLqMap.addParam("theme_cd",themeCd);
				sopApiLqMap.addParam("year",year);
				sopApiLqMap.request({
					method : "GET",
					async : false,
					//url : openApiPath + "/OpenAPI3/startupbiz/sidolqofcountry.json",				// 2020년 SGIS고도화 3차(테마코드) - 기존 요청 URL 주석처리 (pse)
					url : contextPath + "/ServiceAPI/OpenAPI3/startupbiz/sidolqofcountry.json" ,	// 2020년 SGIS고도화 3차(테마코드)	- 새로운 요청 URL 코드 추가 (pse)
					options : {
			        	api_id : "API_0627",
			        	params : {
			        		/*adm_cd : options.params.adm_cd,
			        		adm_nm : options.params.adm_nm,
			        		year : options.params.year,*/
			        		theme_nm : themeNm,
							theme_cd : themeCd,
							year	: year,
							map_information_type	: type,
							type	: type,
							depth	: null,
			        	},
			        	map : map
			        	
			        }
				});
			},
			/**
			 * 
			 * @name         : openApiLqMapSgg
			 * @description  : 시군구 입지계수 지도 정보를 호출한다.
			 * @date         : 2018. 09. 21. 
			 * @author	     : 박길섭
			 * @param	: options
			 * @history 	 :
			 */
			openApiLqMapSgg : function(adm_cd,theme_cd,mapInfo,map,year,region,adm_nm) {
				
				var sopApiLqMapSgg = new sop.portal.LqMapSgg.api();
				sopApiLqMapSgg.addParam("accessToken", accessToken);
				sopApiLqMapSgg.addParam("sido_cd",adm_cd.slice(0,2));
				sopApiLqMapSgg.addParam("theme_cd",theme_cd);
				sopApiLqMapSgg.addParam("region",region);
				sopApiLqMapSgg.addParam("year",year);
				sopApiLqMapSgg.request({
					method : "GET",
					async : false,
					//url : openApiPath + "/OpenAPI3/startupbiz/sgglqofsidosgg.json",			// 2020년 SGIS고도화 3차(테마코드) - 기존 요청 url 주석 (pse)
					url : contextPath + "/ServiceAPI/OpenAPI3/startupbiz/sgglqofsidosgg.json",	// 2020년 SGIS고도화 3차(테마코드) - 새로운 요청 url 작성 (pse)
					options : {
			        	btntype : "chart",
			        	api_id : "API_0628",
			        	params : {
			        		adm_cd : adm_cd,
			        		region : region,
			        		year : year,
			        		sido_cd : adm_cd.slice(0,2),
			        		adm_nm : adm_nm,
			        		//year : options.params.year,
			        		//theme_nm : theme_nm,
							theme_cd : theme_cd,
							type : mapInfo,
							map_information_type	: mapInfo,
							depth : "first"
			        	},
			        	map : map
			        	
			        }
				});
			},
			
			/**
			 * 
			 * @name         : openApiPoiCompanyOpen
			 * @description  : 지자체 인허가 업종별 개업 현황
			 * @date         : 2017 
			 * @author	     : 
			 * @history 	 : 
			 * @param themeCd : 테마코드
			 * @param admCd : 행정동코드
			 * @param year	: 데이터년도
			 * @param pageNum : 조회시작 인덱스
			 * @param resultCount : 조회갯수
			 */
			openApiPoiCompanyOpen : function(type, params, map, callback) {
				
				var sopOpenApiPoiCompanyOpenObj = new sop.openApi.poiCompanyOpenTest.api();
				for (var p in params) {
					if (p !== "etc") {
						sopOpenApiPoiCompanyOpenObj.addParam(p, params[p]);
					}
				}
				
				
				sopOpenApiPoiCompanyOpenObj.addParam("data_type", type);
				// mng_s 20190522 김건민
				sopOpenApiPoiCompanyOpenObj.addParam("apvpermymd", apvpermymd);
				// mng_e 20190522 김건민
				//=================== apiLogWrite start ======================
				var logAreaCode = map.curSidoCd+map.curSiggCd;
				var logAreaNm = map.curSidoNm + map.curSiggNm;
				var logThemeCd = params.theme_cd;
				var logYear = params.year;
				var logParam = "areaCode=" +logAreaCode + "&themeCd=" + logThemeCd + "&year=" + logYear;
				
				apiLogWrite2("B0", "B38", "업종별 개업 현황", logParam, "00", logAreaNm);
				//=================== apiLogWrite end =========================
				
				sopOpenApiPoiCompanyOpenObj.request({
					method : "POST",
					async : false,
					url : contextPath + this.API_COMPANY_OPEN_URL,
					options : {
						type : type,
						params : params,
						url : this.API_COMPANY_OPEN_URL,
						map : map,
						apvpermymd : apvpermymd,
						callback : callback
					}
				});
				
			},
			
			//mng_s 업종별 뜨는 지역의 동코드 3개 가져오기
			getCompanyBestArea : function(type, params, map) {
				
				var getCompanyBestAreaObj = new sop.openApi.getCompanyBestArea.api();
				for (var p in params) {
					if (p !== "etc") {
						getCompanyBestAreaObj.addParam(p, params[p]);
					}
				}
				
				
				getCompanyBestAreaObj.addParam("data_type", type);
				
				
				//=================== apiLogWrite start ======================
				var logAreaCode = map.curSidoCd+map.curSiggCd;
				var logAreaNm = map.curSidoNm + map.curSiggNm;
				var logThemeCd = params.theme_cd;
				var logYear = params.year;
				var logParam = "areaCode=" +logAreaCode + "&themeCd=" + logThemeCd + "&year=" + logYear;
				
				apiLogWrite2("B0", "B39", "업종별 뜨는 지역", logParam, "00", logAreaNm);
				//=================== apiLogWrite end =========================
				
				getCompanyBestAreaObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/bizStats/getCompanyBestArea.json",
					options : {
						type : type,
						params : params,
						map : map
					}
				});
				
			},
			
			//mng_s 업종별 뜨는 지역 POI
			getCompanyBestAreaPOI : function(map) {
				
				var getCompanyBestAreaPOIObj = new sop.openApi.getCompanyBestAreaPOI.api();
				
				getCompanyBestAreaPOIObj.addParam("target", map);				
				getCompanyBestAreaPOIObj.addParam("map", map);				
				getCompanyBestAreaPOIObj.addParam("jobBestAdmCd", $bizStatsMap.ui.jobBestAdmCd);				
				getCompanyBestAreaPOIObj.addParam("job_best_from", $bizStatsLeftMenu.ui.job_best_from_poi);				
				getCompanyBestAreaPOIObj.addParam("job_best_to", $bizStatsLeftMenu.ui.job_best_to_poi);				
				getCompanyBestAreaPOIObj.addParam("job_best_themeCd", $bizStatsLeftMenu.ui.job_best_themeCd);				
				
				getCompanyBestAreaPOIObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/bizStats/getCompanyBestAreaPOI.json",
					options : {
						target : map,
						map : map,
						jobBestAdmCd : $bizStatsMap.ui.jobBestAdmCd,
						job_best_from : $bizStatsLeftMenu.ui.job_best_from_poi,
						job_best_to : $bizStatsLeftMenu.ui.job_best_to_poi,
						job_best_themeCd : $bizStatsLeftMenu.ui.job_best_themeCd
					}
				});
				
			},
			
			/**
			 * 
			 * @name         : setStatsData
			 * @description  : 
			 * @date         : 2014. 10. 30. 2018. 09.04
			 * @author	     : 권차욱, 박길섭 추가
			 * @history 	 :
			 * @param @param res
			 * @param @param options
			 */
			setStatsData : function (res, options) {
				var typeList = {
						"intro"  		: 0,	//시도별 생활업종 현황
						"jobArea" 		: 1,	//시군구별 생활업종 현활
						"jobChange"		: 2,	//업종 밀집도 현황
						"jobOpen"		: 7,	//지자체 인허가
						"areaInfo"		: 3,	//생활업종 후보지 검색
						"areaSearch"			: 4,	//생활업종 후보지 정보 보기
						"publicData"			: 5,	//공공데이터
						"userData"				: 6,	//사용자데이터
						"lqMap"					: 10	//입지계수현황 지도
						
					};
				var curSelectedStatsType = $bizStatsLeftMenu.ui.curSelectedStatsType!=null?$bizStatsLeftMenu.ui.curSelectedStatsType:null;
					
				var tmpOptions = {};
				var paramsArr = {};
				tmpOptions["map_type"] = "BMAP";
				paramsArr["curSelectedStatsType"] = curSelectedStatsType;
				switch(typeList[curSelectedStatsType]) {
					case 0:
						var params = options.params;
						var map = options.params.map != null?options.params.map:options.map;
						
						tmpOptions["title"] = "시도별 생활업종 현황";
						tmpOptions["url"] = "/OpenAPI3/startupbiz/sidobusinessinfo.json";
						tmpOptions["api_id"] = "none";
						tmpOptions["zoomlevel"] = map.zoom;
						tmpOptions["center"] = map.center;
						paramsArr["map_information_type"]=params.map_information_type;
						paramsArr["adm_cd"] = params.adm_cd;
						paramsArr["adm_nm"] = params.adm_nm;
						
						tmpOptions["params"] = paramsArr;
						
						map.shareInfo.setShareInfo(tmpOptions, "bizStats", map.id);
						break;
					case 10:
						
						var map = $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId];
						
						tmpOptions["title"] = "업종별 입지계수 지도";
						tmpOptions["url"] = "none";
						tmpOptions["api_id"] = options.api_id;
						tmpOptions["zoomlevel"] = map.zoom;
						tmpOptions["center"] = map.center;
						//paramsArr["event"] = options.params.event;
						paramsArr["map_information_type"]=options.params.map_information_type;
						paramsArr["theme_cd"] = options.params.theme_cd;
						paramsArr["theme_nm"] = options.params.theme_nm;
						paramsArr["year"] = options.params.year;
						paramsArr["adm_cd"] = options.params.adm_cd;
						paramsArr["adm_nm"] = options.params.adm_nm;
						//paramsArr["region"] =$bizStatsMap.ui.lqMap.region;//전국대비 or 시도대비
						paramsArr["depth"] = options.params.depth;//depth
						tmpOptions["params"] = paramsArr;
						
						map.shareInfo.setShareInfo(tmpOptions, "bizStats", map.id);
						
						break;	
					case 1:
						var params = options.params;
						var map = $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId];
						
						tmpOptions["title"] = "시군구별 생활업종 현황"
						tmpOptions["themeCd"] = options.themeCd;
						tmpOptions["themeNm"] = options.themeNm;
						tmpOptions["url"] = options.url;
						tmpOptions["api_id"] = options.api_id;
						tmpOptions["zoomlevel"] = map.zoom;
						tmpOptions["center"] = map.center;
						
						if(options.dataBoard !=undefined && options.dataBoard.jobAreaThemeCd != undefined){
							paramsArr["jobAreaThemeCd"] = options.dataBoard.jobAreaThemeCd;
						}else if(params.jobAreaThemeCd !=undefined){
							paramsArr["jobAreaThemeCd"] = params.jobAreaThemeCd;
						}
						paramsArr["theme_cd"] = options.themeCd;
						paramsArr["theme_nm"] = options.themeNm;
						paramsArr["adm_cd"] = params.adm_cd;
						paramsArr["adm_nm"] = params.adm_nm;						
						tmpOptions["params"] = paramsArr;
						
						map.shareInfo.setShareInfo(tmpOptions, "bizStats", map.id);
						break;
					case 2:
						
						var params = options.params;
						var map = $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId];
						
						tmpOptions["title"] = "업종별 밀집도 현황"
						tmpOptions["url"] = "none";
						tmpOptions["api_id"] = "none";
						tmpOptions["zoomlevel"] = map.zoom;
						tmpOptions["center"] = map.center;
						
						paramsArr["theme_cd"] = params.theme_cd;
						paramsArr["theme_nm"] = params.theme_nm;
						paramsArr["adm_cd"] = params.adm_cd;
						paramsArr["adm_nm"] = params.adm_nm;						
						paramsArr["year"] = params.year;
						tmpOptions["params"] = paramsArr;
						
						map.shareInfo.setShareInfo(tmpOptions, "bizStats", map.id);
						break;
					case 7:
						
						var params = options.params;
						var map = $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId];
						
						tmpOptions["title"] = "업종별 개업 현황"
						tmpOptions["url"] = "none";
						tmpOptions["api_id"] = "none";
						tmpOptions["zoomlevel"] = map.zoom;
						tmpOptions["center"] = map.center;
						
						paramsArr["theme_cd"] = params.theme_cd;
						paramsArr["theme_nm"] = params.theme_nm;
						paramsArr["adm_cd"] = params.adm_cd;
						paramsArr["adm_nm"] = params.adm_nm;						
						paramsArr["year"] = params.year;
						tmpOptions["params"] = paramsArr;
						
						map.shareInfo.setShareInfo(tmpOptions, "bizStats", map.id);
						break;
					case 3:
						var result = res.result;
						var params = options.params;
						var map = params.map;
						var mapInfo = map.mapInfo;
						var dataBoard = $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].dataBoard;	//9월 서비스
						
						tmpOptions["title"] = "생활업종 후보지 정보 보기"
						tmpOptions["url"] = params.api_call_url;
						tmpOptions["api_id"] = params.param_info.api_id;
						tmpOptions["zoomlevel"] = map.zoom;
						tmpOptions["center"] = map.center;
						
						paramsArr["adm_cd"] = params.param_info.paramInfo.adm_cd;
						paramsArr["adm_nm"] = params.param_info.adm_nm;						
						paramsArr["bnd_year"] = params.param_info.paramInfo.bnd_year;
						paramsArr["low_search"] = params.param_info.paramInfo.low_search;
						paramsArr["year"] = params.param_info.paramInfo.year;
						paramsArr["unit"] = params.param_info.unit;						
						paramsArr["title"] = params.param_info.title;
						paramsArr["showData"] = params.param_info.showData;
						paramsArr["isKosis"] = params.param_info.isKosis;
						paramsArr["btntype"] = options.btntype;
												
						tmpOptions["params"] = paramsArr;
						
						map.shareInfo.setShareInfo(tmpOptions, "bizStats", map.id);
						
						break;
					case 4:
						
						var result = res.result;
						var params = options.params;
						var map = params.map;
						var mapInfo = map.mapInfo;
						var dataBoard = $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].dataBoard;	//9월 서비스
						
						res["pAdmCd"] = params.adm_cd;
						
						if ($bizStatsMap.ui.share_info_type == "bookmark") {
							map.mapMove([$bizStatsMap.ui.bookmark_mapcenter[0],$bizStatsMap.ui.bookmark_mapcenter[1]], $bizStatsMap.ui.bookmark_zoom_level);
						}
						
						map.setStatsData("bizStats", res, "bizStats", params.unit);	
						map.autoDownBoundary();
						
						/*var params = {
								map : map,
								adm_cd : data.properties.adm_cd,
								adm_nm : data.properties.adm_nm,
								x : data.properties.x,
								y : data.properties.y
							};*/
						var options = $bizStatsDataBoard.ui.mapData[map.id].options;
						options["params"] = params;
						$bizStatsDataBoard.ui.updateDataBoard(options, "areaSearch");
						
						tmpOptions["title"] = "생활업종 후보지 검색"
						tmpOptions["url"] = options.url;
						tmpOptions["api_id"] = params.api_id;
						tmpOptions["zoomlevel"] = map.zoom;
						tmpOptions["center"] = map.center;
						
						paramsArr["adm_cd"] = params.adm_cd;
						paramsArr["adm_nm"] = params.adm_nm;						
						paramsArr["title"] = params.title;
						paramsArr["type"] = params.type;
						paramsArr["unit"] = params.unit;						
						paramsArr["view_type"] = params.view_type;
						paramsArr["btntype"] = options.btntype;
												
						var codeParamsArr = [];
						for (var p = 0; p < params.params.length; p++){
							var tmpDataArr = {key:params.params[p].key, value:params.params[p].value};
							codeParamsArr.push(tmpDataArr);
						}
						paramsArr["codeParams"] = codeParamsArr;
						
//						var conditionsParamsArr =  [];
//						for (var p = 0; p < params.conditions.length; p++){
//							var tmpDataArr = {category:params.conditions[p].category, value:params.conditions[p].value};
//							conditionsParamsArr.push(tmpDataArr);
//						}
//						paramsArr["conditionsParams"] = conditionsParamsArr;
//						
//						var namesParamsArr = [];
//						for (var p = 0; p < params.names.length; p++){
//							namesParamsArr.push(params.names[p]);
//						}
//						paramsArr["namesParams"] = namesParamsArr;
						
						tmpOptions["params"] = paramsArr;
						
						map.shareInfo.setShareInfo(tmpOptions, "bizStats", map.id);
						
						break;
					case 5:
						break;
					case 6:
						var result = res.result;
						var params = options.params;
						var map = params.map;
						var mapInfo = map.mapInfo;
						
						res["pAdmCd"] = params.adm_cd;

						map.setStatsData("bizStats", res, "bizStats", params.unit);	
						map.autoDownBoundary();
						
						options["zoomlevel"] = map.zoom;
						options["btntype"] = "normal";
						options.params.api_id = "API_0601";
						
						//API 로그
						apiLogWrite("B0", options);
						break;
					
				}
			}
	};
	
	/** ********* OpenAPI 창업통계 Start ********* */
	(function() {
		$class("sop.openApi.pplsummary.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var map = options.params.map;
						
						if ($bizStatsMap.ui.share_info_type == "bookmark") {
							map.mapMove([$bizStatsMap.ui.bookmark_mapcenter[0],$bizStatsMap.ui.bookmark_mapcenter[1]], $bizStatsMap.ui.bookmark_zoom_level);
						}
						
						//alert("[bizStatsMapApi.js] sop.openApi.pplsummary.api ==> $bizStatsMap.ui.share_info_type [" + $bizStatsMap.ui.share_info_type);
						
						
						switch(parseInt(res.errCd)) {
							case 0:
								$bizStatsDataBoard.ui.mapData[map.id].options["dataBoard"]= {};
								$bizStatsDataBoard.ui.mapData[map.id].options.dataBoard["candidateList"] = res.result;
								$bizStatsMapApi.request.setStatsData(res, options);
								break;
							case -401:
								accessTokenInfo(function() {
									$bizStatsMapApi.request.openApiPplSummary(options.params);
								});
								break;
							default:
								map.clearData();
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
					}
				});
	}());
	/** ********* OpenAPI 창업통계 End ********* */
	
	/** ********* 통계별최신년도정보 조회 시작 ********* */
	(function() {
		$class("sop.portal.statBaseYear.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var result = res.result;
						var info = options.options.info;
						switch(parseInt(res.errCd)) {
							case 0:
								//사업체일 경우 
								if(options.api_id == "API_0301") {
									$bizStatsMapApi.request.openApiBizStats(info);
								} else {	//기타
									if(result.base_year != null) {
										info.param_info.paramInfo["year"] = result.base_year;
										$bizStatsMapApi.request.openApiBizStats(info);
									}else {
										$bizStatsMapApi.request.openApiBizStats(info);
									}
								}
								break;
							default:
								$bizStatsMapApi.request.openApiBizStats(info);
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	/** ********* 통계별최신년도정보 조회 종료 ********* */
	
	/** ********* 창업통계정보조회 시작 ********* */
	(function() {
		$class("sop.openApi.bizStats.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var result = res.result;
						var map = options.params.map;
						var params = options.params.param_info;
						
						
						if ($bizStatsMap.ui.share_info_type == "bookmark") {
							map.mapMove([$bizStatsMap.ui.bookmark_mapcenter[0],$bizStatsMap.ui.bookmark_mapcenter[1]], $bizStatsMap.ui.bookmark_zoom_level);
						}
						
						switch(parseInt(res.errCd)) {
							case 0:
								res["pAdmCd"] = options.params.param_info.paramInfo.adm_cd;
								//N/A의 경우 0으로 치환
								for (var i=0; i<result.length; i++) {
									if (result[i][params.showData] == "N/A") {
										result[i][params.showData] = "0";
									}
								}
								
								$bizStatsMap.ui.data = res;	
								// 일반검색 버튼일 경우,
								map.setStatsData("normal", res, params.showData, params.unit);
								map.autoDownBoundary();
								if (params.mapInfo.zoomlevel == map.zoom) {
									map.openApiReverseGeoCode(params.mapInfo.center);
								}
								
								//API 로그
								apiLogWrite("B0", options);
								
								$bizStatsMapApi.request.setStatsData(res, options);
								break;
							case -401:
								accessTokenInfo(function() {
									$bizStatsMapApi.request.openApiBizStats(options);
								});
								break;
							default:
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status, options) {
						var map = options.params.map;
						map.clearData();
					}
				});
	}());
	/** ********* 창업통계정보조회 종료 ********* */
	
	/** ********* 전국시도별 사업체수 시작 ********* */
	(function() {
		
		$class("sop.openApi.sggCompanyCnt.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var data=res.result;
						
						var map = options.map;
						switch(parseInt(res.errCd)) {
							case 0:
								var result = res.result;
								var tmpData = [];
								var data = [];
								var sidoCdList = [];
								
								var showData, unit;
								switch(parseInt(options.idx)) {
									case 0:	//사업체
										showData = "corp_cnt";
										unit = "개";
										break;
									case 1:	//업종비율
										showData = "corp_cnt";//"upregion_vs_corp_per";
										unit = "개";//"%";
										break;
									case 2:	//거주인구
										showData = "corp_vs_ppltn_rate";
										unit = "명";
										break;
									case 3:	//직장인구
										showData = "corp_vs_worker_rate";
										unit = "명";
										break;
									case 4:	//가구수
										showData = "corp_vs_family_rate";
										unit = "가구";
										break;
									case 5:	//업종종사자수
										showData = "biz_worker_cnt";
										unit = "명";
										break;
									case 6: //평균종사자수
										showData = "avg_worker_rate";
										unit = "명";
										break;
								}
								
								//alert("[bizStatsMapApi.js]sop.openApi.sggCompanyCnt.api result.length[" + result.length);
								
								for (var i=0; i<result.length; i++) {
								//for (var i=0; i<3; i++) {
									result[i][showData]=parseFloat(result[i][showData]).toFixed(0);
									tmpData.push(parseFloat(result[i][showData]));
									sidoCdList.push(result[i].sido_cd);
									
									//alert("result[i][showData] ==>["+ result[i][showData]);
									//alert(result[i].sido_cd);
									
								}
								
								data.push(tmpData);
								
								map.data = null;
								map.legend.valPerSlice = map.legend.calculateLegend(data);
								map.setStatsData("normal", res, showData, unit);
								map.mapMode = "color";
								//$("#bizLegend_bubble").removeClass("on");
								//$bizStatsMap.ui.setChangeColorMode();
								$("#bizLegend_color").hasClass("on");
								if ($("#bizLegend_bubble").hasClass("on")) {
									$bizStatsMap.ui.setChangeBubbleMode();
								}else {
									map.mapMode = "color";
									$bizStatsMap.ui.setChangeColorMode();
								}
								data = null;
								tmpData = null;
								
								//API 로그
								apiLogWrite("B0", options);
								
								$bizStatsMapApi.request.setStatsData(res, options);
								
								break;
							case -401:
								accessTokenInfo(function() {
									$bizStatsMapApi.request.openApiSggCompanyCnt(options.params.jobAreaThemeCd, options.themeCd, options.themeNm, options.map, options.idx);
								});
								break;
							default:
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	/** ********* 전국 시도별 사업체수 종료 ********* */
	
	/** ********* 업종별 사업체 밀집도 시작 ********* */
	(function() {
		$class("sop.openApi.poiCompanyDensity.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var map = options.map;
						var totalCount, returnCount, pageNum, apicallCount; 
						switch(parseInt(res.errCd)) {
							case 0:
								totalCount = res.result[0].totalcount;
								returnCount = res.result[0].returncount;
								pageNum = res.result[0].pagenum;
								apicallCount = parseInt(totalCount / (options.resultCount * (pageNum + 1)));
								
								if (returnCount !== totalCount && apicallCount > 0) {
										$bizStatsMapApi.request.openApiPoiCompanyDensity(
												options.themeCd, 
												"",//options.admCd,
												options.year,
												pageNum + 1, 
												500,
												options.map);
								}else {
									if (totalCount !== 0) {
										map.dataGeojson = map.geojson;
										if (map.geojson) {
											map.geojson.remove();
										}
										map.legend.setLegendParams("heat", map.legend.legendColor, map.legend.lv);
									}else {
										messageAlert.open("알림", "조회된 정보가없습니다.");
									}
								}
								
								if ($bizStatsMap.ui.heatMapList[options.map.id] == null) {
									$bizStatsMap.ui.heatMapList[options.map.id] = {
											type : "heatMap",
											data : []
									};
								}
								
								//heatMap 생성
								var companyList = res.result[0].company_list;
								for (var i=0; i<companyList.length; i++) {
									$bizStatsMap.ui.heatMapList[options.map.id]["data"].push(companyList[i]);
									map.zoomLevelHeat = false;
									map.addHeatMap(companyList[i].x, companyList[i].y, 1);
								}
								break;
							default:
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	/** ********* 업종별 사업체 밀집도 종료 ********* */
	
	
	
	/** ********* 업종별 사업체 밀집도 새로 Test ********* */
	(function() {
		$class("sop.openApi.poiCompanyDensityTest.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						switch(parseInt(res.errCd)) {
							case 0:
								var map = options.map;
								//map.dataGeojson = map.geojson;
								if (map.heatMap) {
									map.heatMap.setUTMKs([]);
								}
								
								map.legend.setLegendParams("heat", map.legend.legendColor, map.legend.lv);
								
								if ($bizStatsMap.ui.share_info_type == "bookmark") {
									
									map.mapMove([$bizStatsMap.ui.bookmark_mapcenter[0],$bizStatsMap.ui.bookmark_mapcenter[1]], $bizStatsMap.ui.bookmark_zoom_level);
									$bizStatsMap.ui.heatMapList[options.map.id] = {
											type : "heatMap",
											data : [],
											theme_cd : options.params.theme_cd,
											year : options.params.year,
											data_type : options.type,
											adm_cd : options.params.adm_cd
									};
								} else {
								
									if ($bizStatsMap.ui.heatMapList[options.map.id] == null) {
										$bizStatsMap.ui.heatMapList[options.map.id] = {
												type : "heatMap",
												data : [],
												theme_cd : options.params.theme_cd,
												year : options.params.year,
												data_type : options.type,
												adm_cd : options.params.adm_cd
										};
									}else{
										$bizStatsMap.ui.heatMapList[options.map.id]["data"]=[];
										$bizStatsMap.ui.heatMapList[options.map.id]["data_type"] = options.type;
										$bizStatsMap.ui.heatMapList[options.map.id]["adm_cd"] = options.params.adm_cd;
									}
								}
								
								
								var companyList = res.result;
								//heatMap 생성
								var tmpData = [];
								for (var i=0; i<companyList.length; i++) {
									tmpData.push(companyList[i].cnt);
								}
								var max = null;
								
								//타입별 열지도 표출
								//1:전국시도, 2:시군구, 3:읍면동
								//1,2일 경우, 가중치 열지도(집계), 3일경우, 기본 열지도(POI)
								switch(parseInt(options.type)) {
									case 1:
									case 2:
										max = Math.max.apply(null, tmpData);
										map.zoomLevelHeat = false;
										map.setHeatMapOptions(map.heatRadius, map.heatBlur, max);
										$bizStatsMap.ui.heatMapList[options.map.id].data_type = options.type;
										for (var i=0; i<companyList.length; i++) {
											$bizStatsMap.ui.heatMapList[options.map.id]["data"].push(companyList[i]);
											map.addHeatMap(companyList[i].x, companyList[i].y, companyList[i].cnt);
										}
										break;
									case 3:
										// mng_s 20200312 김건민
										var tmpData2 = [];
										for (var i=0; i<companyList.length; i++) {
											tmpData2.push(companyList[i].wgt);
										}
										max = Math.max.apply(null, tmpData2);
										map.zoomLevelHeat = false;
										map.setHeatMapOptions(map.heatRadius, map.heatBlur,max);
										$bizStatsMap.ui.heatMapList[options.map.id].data_type = options.type;
										for (var i=0; i<companyList.length; i++) {
											$bizStatsMap.ui.heatMapList[options.map.id]["data"].push(companyList[i]);
											map.addHeatMap(companyList[i].x, companyList[i].y, companyList[i].wgt);
										}
										// mng_e 20200312 김건민
										break;
								}
								if (options.callback != null && options.callback instanceof Function) {
									options.callback.call(undefined, res);
								}
								break;
							default:
								if ($bizStatsMap.ui.heatMapList[options.map.id] != null) {
									$bizStatsMap.ui.heatMapList[options.map.id]["data"]=[];
									$bizStatsMap.ui.heatMapList[options.map.id]["data_type"] = options.type;
									$bizStatsMap.ui.heatMapList[options.map.id]["adm_cd"] = options.params.adm_cd;
								}
								break;
						}
					},
					onFail : function(status, options) {
						if ($bizStatsMap.ui.heatMapList[options.map.id] != null) {
							$bizStatsMap.ui.heatMapList[options.map.id]["data"]=[];
							$bizStatsMap.ui.heatMapList[options.map.id]["data_type"] = options.type;
							$bizStatsMap.ui.heatMapList[options.map.id]["adm_cd"] = options.params.adm_cd;
						}
					}
				});
	}());
	/** ********* 업종별 사업체 밀집도 종료 ********* */
	/** ********* 지자체 인허가 시작 ********* */
	(function() {
		$class("sop.openApi.poiCompanyOpenTest.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						switch(parseInt(res.errCd)) {
							case 0:
								var map = options.map;
								//map.dataGeojson = map.geojson;
								if (map.heatMap) {
									map.heatMap.setUTMKs([]);
								}
								
								map.legend.setLegendParams("heat", map.legend.legendColor, map.legend.lv);
								
								/*
								alert("[bizStatsMapApi.js] $bizStatsMap.ui.heatMapList[options.map.id] [" + $bizStatsMap.ui.heatMapList[options.map.id]);
								alert("[bizStatsMapApi.js] options.params.theme_cd] [" + options.params.theme_cd);
								alert("[bizStatsMapApi.js] options.type [" + options.type);
								alert("[bizStatsMapApi.js] options.params.adm_cd [" + options.params.adm_cd);
								*/
								//alert("[bizStatsMapApi.js] map.center[0] [" + map.center[0]);
								
								if ($bizStatsMap.ui.share_info_type == "bookmark") {
									//alert("페이지를 로딩 중입니다...");
									//messageAlert.open("알림", "페이지를 로딩 중입니다.");
									
									map.mapMove([$bizStatsMap.ui.bookmark_mapcenter[0],$bizStatsMap.ui.bookmark_mapcenter[1]], $bizStatsMap.ui.bookmark_zoom_level);
									//map.mapMove([map.center[0],map.center[1]], $bizStatsMap.ui.bookmark_zoom_level);
									$bizStatsMap.ui.heatMapList[options.map.id] = {
											type : "heatMap",
											data : [],
											theme_cd : options.params.theme_cd,
											year : options.params.year,
											data_type : options.type,
											adm_cd : options.params.adm_cd
									};
								} else {
								
									if ($bizStatsMap.ui.heatMapList[options.map.id] == null || $bizStatsMap.ui.heatMapList[options.map.id]==undefined) {
										$bizStatsMap.ui.heatMapList[options.map.id] = {
												type : "heatMap",
												data : [],
												theme_cd : options.params.theme_cd,
												year : options.params.year,
												data_type : options.type,
												adm_cd : options.params.adm_cd
										};
									}else{
										$bizStatsMap.ui.heatMapList[options.map.id]["data"]=[];
										$bizStatsMap.ui.heatMapList[options.map.id]["data_type"] = options.type;
										$bizStatsMap.ui.heatMapList[options.map.id]["adm_cd"] = options.params.adm_cd;
									}
								}
								
								
								
								var companyList = res.result;
								//heatMap 생성
								var tmpData = [];
								for (var i=0; i<companyList.length; i++) {
									tmpData.push(companyList[i].cnt);
								}
								var max = null;
								
								//alert("[bizStatsMapApi.js] options.type [" + options.type);
								//alert("[bizStatsMapApi.js] companyList.length [" + companyList.length);
								//alert("[bizStatsMapApi.js] options.map.id [" + options.map.id);
								
								//타입별 열지도 표출
								//1:전국시도, 2:시군구, 3:읍면동
								//1,2일 경우, 가중치 열지도(집계), 3일경우, 기본 열지도(POI)
								switch(parseInt(options.type)) {
									case 1:
									case 2:
										max = Math.max.apply(null, tmpData);
										map.zoomLevelHeat = false;
										map.setHeatMapOptions(map.heatRadius, map.heatBlur, max);
										$bizStatsMap.ui.heatMapList[options.map.id].data_type = options.type;
										for (var i=0; i<companyList.length; i++) {
											$bizStatsMap.ui.heatMapList[options.map.id]["data"].push(companyList[i]);
											map.addHeatMap(companyList[i].x, companyList[i].y, companyList[i].cnt);
										}
										break;
									case 3:
										// mng_s 20200312 김건민
										var tmpData2 = [];
										for (var i=0; i<companyList.length; i++) {
											tmpData2.push(companyList[i].wgt);
										}
										max = Math.max.apply(null, tmpData2);
										map.zoomLevelHeat = true;
										map.setHeatMapOptions(map.heatRadius, map.heatBlur,max);
										$bizStatsMap.ui.heatMapList[options.map.id].data_type = options.type;
										for (var i=0; i<companyList.length; i++) {
											$bizStatsMap.ui.heatMapList[options.map.id]["data"].push(companyList[i]);
											map.addHeatMap(companyList[i].x, companyList[i].y, companyList[i].wgt);
										}
										// mng_e 20200312 김건민
										break;
								}
								if (options.callback != null && options.callback instanceof Function) {
									options.callback.call(undefined, res);
								}
								break;
							default:
								if ($bizStatsMap.ui.heatMapList[options.map.id] != null) {
									$bizStatsMap.ui.heatMapList[options.map.id]["data"]=[];
									$bizStatsMap.ui.heatMapList[options.map.id]["data_type"] = options.type;
									$bizStatsMap.ui.heatMapList[options.map.id]["adm_cd"] = options.params.adm_cd;
								}
								break;
						}
					},
					onFail : function(status, options) {
						if ($bizStatsMap.ui.heatMapList[options.map.id] != null) {
							$bizStatsMap.ui.heatMapList[options.map.id]["data"]=[];
							$bizStatsMap.ui.heatMapList[options.map.id]["data_type"] = options.type;
							$bizStatsMap.ui.heatMapList[options.map.id]["adm_cd"] = options.params.adm_cd;
						}
					}
				});
	}());
	/** ********* 지자체 인허가 종료 ********* */
	
	/** ********* 뜨는 지역 3개 가져오기 시작 ********* */
	(function() {
		$class("sop.openApi.getCompanyBestArea.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						
						var result = res.result;
						var corp_cnt;
						var map = options.map;
						var tmpData = [];
						var data = [];
						var sidoCdList = [];
						var unit = "개";
						var showData = "corp_cnt";
						var api_id="API-10025";
						var jobBest3List = "";
						var srch_from = options.params.param_job_best_from;
						var srch_to = options.params.param_job_best_to;
						var dolsanemd = "";
						/*
						var tmpParamList = deepCopy($bizStatsMapLeftMenu.ui.arParamList);
						var tmpParam = null;
						for (var i = 0; i < tmpParamList.length; i++) {
							if (tmpParamList[i].idx == index) {
								tmpParam = tmpParamList[i];
								$bizStatsMap.ui.dropBtnInfo[map.id] = tmpParamList[i];
								break;
							}
						}
						*/
						
						switch(parseInt(res.errCd)) {
							case 0:
								corp_cnt = res.result[0].corp_cnt;
								
								res["pAdmCd"] = res.result[0].adm_cd;
								
								if(map.multiLayerControl.multiData != null) {
									map.multiLayerControl.multiData = [];
								}
								
								if (corp_cnt != 0) {
									for (var i=0; i<result.length; i++) {
										tmpData.push(parseFloat(result[i].corp_cnt));
										sidoCdList.push(result[i].adm_cd);
										
										var adm_cd = result[i].adm_cd;
										var adm_nm = result[i].adm_nm;
										var cnt = result[i].corp_cnt;
					
										
										//var params = $bizStatsMap.ui.reqSetParams(options, adm_cd, adm_nm, api_id, map);
										
										var params = {
												param : options.params,
												noneParams : options.noneParams,
												adm_cd : adm_cd,
												adm_nm : adm_nm,
												filter : options.filterParam,
												unit : unit,
												title : options.title,
												api_id : api_id,
												map : map,
												view_type : "NM",
												maxYear : options.maxYear
										};
										
										options.params = params;
										
										$bizStatsMap.ui.curDropParams[map.id] = params;
										//$bizStatsMap.ui.requestOpenApi(params);
										
										map.drawControl.removeOverlay();
										
										
										
										map.legend.legendType = "auto"; //equal로 할 경우 특정 지표에서 1로 되는 문제가 있어서 auto로 변경함
										map.legend.selectType = "color";
										
										map.center = [result[0].x,result[0].y];
										
										
										if ( i==0 && adm_cd == "3602011") { //여수시 돌산읍이면 너무 커서 타임아웃을 줘야한다 ==> 두번째 루프를 돌때는 바뀌므로 돌산읍만 처리하려면 조건문을 다시 작성해야함. 일단 모두 타임아웃을 주는걸로 가려함.
											dolsanemd = "dolsan";
										}
										/*
										if(dolsanemd == "dolsan") {
											
											if(i==0) {
												map.multiLayerControl.setStatsData2("normal", res, options, false);
											} else if(i==1){
												setTimeout(function() {
													map.multiLayerControl.setStatsData2("normal", res, options, false);
			             						},500);
											} else if(i==2){
												setTimeout(function() {
													map.multiLayerControl.setStatsData2("normal", res, options, false);
			             						},5000);
											}
											
										} else {
											map.multiLayerControl.setStatsData2("normal", res, options, false);
										}
										*/
										
										map.multiLayerControl.setStatsData2("normal", res, options, false);
										
										
										
										/*
										if(i==0) {
											map.multiLayerControl.setStatsData2("normal", res, options, false);
										} else {
											setTimeout(function() {
												map.multiLayerControl.setStatsData2("normal", res, options, false);
		             						},3000);
										}
										*/
										
										
										if (i==0) {
											jobBest3List += "<li><div class='rela'>"
												+ "<a id='goJobBestFirstArea" + i + "' class='round on' href='javascript:$bizStatsMap.ui.goJobBestArea(\"" + result[i].x + "\",\"" + result[i].y + "\",\"" + map + "\",\"" + i + "\",\"" + adm_cd + "\",\"" + srch_from + "\",\"" + srch_to + "\");'>"
												+ "<span class='ss'>" + adm_nm + " (기간중 개업한 업체수 : " + cnt + "개)</span>"
												+ "</a></div></li>";
										} else {
											jobBest3List += "<li><div class='rela'>"
												+ "<a id='goJobBestFirstArea" + i + "' class='round' href='javascript:$bizStatsMap.ui.goJobBestArea(\"" + result[i].x + "\",\"" + result[i].y + "\",\"" + map + "\",\"" + i + "\",\"" + adm_cd + "\",\"" + srch_from + "\",\"" + srch_to + "\");'>"
												+ "<span class='ss'>" + adm_nm + " (기간중 개업한 업체수 : " + cnt + "개)</span>"
												+ "</a></div></li>";
										}
										
										
									}
									
									//map.data = result;
									
									//map.mapMode = "color";
									//$bizStatsMap.ui.setChangeColorMode();
									
									$("#jobBest3List").html("<ul class='compareSelectList'>" + jobBest3List + "</ul>");
									
									
									map.center = [result[0].x,result[0].y];
									$bizStatsMap.ui.jobBestCnt = $bizStatsMap.ui.jobBestCnt +1;
									if($bizStatsMap.ui.jobBestCnt < 2) {
										map.mapMove(map.center, 5); //최초 로딩시 2단계 더 들어가서 5로 세팅함. 그 다음 부터는 정상적으로 세팅한 값으로 됨.(이유는 모름)
									} else {
										map.mapMove(map.center, 7);
									}
									
									/*
									setTimeout(function() {
										$bizStatsMap.ui.jobBestCnt = $bizStatsMap.ui.jobBestCnt +1;
										if($bizStatsMap.ui.jobBestCnt < 2) {
											map.mapMove(map.center, 5); //최초 로딩시 2단계 더 들어가서 5로 세팅함. 그 다음 부터는 정상적으로 세팅한 값으로 됨.(이유는 모름)
										} else {
											map.mapMove(map.center, 7);
										}
									}, 3000);
									*/
									
									$bizStatsMap.ui.jobBestAdmCd = res.result[0].adm_cd; //데이터보드에서 카테고리 탭을 클릭했을때 admcd를 여기서 세팅해준다.
									
									//파라미터
									var paramObj = {
											params : {
												adm_cd : res.result[0].adm_cd, //조회 후 corp_cnt가 가장 많은 첫번째 지역을 세팅해준다.
												//adm_nm : options.params.adm_nm,
												//year : year,
												//theme_cd : options.params.param.param.param.theme_cd,
												//theme_nm : themeNm,
												//map : options.params.map,
												//param_sido_cd : options.params.param_sido_cd,
												//param_sgg_cd : options.params.param_sgg_cd,
												param_job_best_from : srch_from,
												param_job_best_to : srch_to
											}
									};
									$bizStatsDataBoardApi.request.jobBestBarChart(paramObj);
									
									////console.log("[bizStatsMapApi.js] map.zoom [" + map.zoom);
									/*
									setTimeout(function() {
										$('#goJobBestFirstArea0').click();
									}, 5000);
									*/
									if(dolsanemd == "dolsan") {
										setTimeout(function() {
											map.mapMove([1026872,1637645], 7);
										}, 1000); //돌산읍의 경우만 색지도가 않그려지는 현상이 있어서 이렇게 처리함
									}
									
									
									/*
									data.push(tmpData);
									map.data = null;
									map.legend.valPerSlice = map.legend.calculateLegend(data);
									map.setStatsData("normal", res, showData, unit);
									
									if ($("#bizLegend_bubble").hasClass("on")) {
										$bizStatsMap.ui.setChangeBubbleMode();
									}else {
										map.mapMode = "color";
										$bizStatsMap.ui.setChangeColorMode();
									}
									data = null;
									tmpData = null;
									
									//API 로그
									//apiLogWrite("B0", options);
									
									$bizStatsMapApi.request.setStatsData(res, options);
									*/
									
									
								}else {
									messageAlert.open("알림", "검색 결과가 존재하지 않습니다.");
								}
								break;
							
							case -100:
								
								$("#jobBest3List").html("<ul class='compareSelectList'><li><div class='rela'>검색 결과가 존재하지 않습니다.</div></li></ul>");
								$('#jobBestTab10').empty();
								$('#jobBestTab20').empty();
								$('#jobBestTab30').empty();
								$('#jobBestTab40').empty();
								$('#jobBestTab50').empty();
								
								messageAlert.open("알림", "조회된 정보가없습니다.");
								break;
								
							default:
								
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	/** ********* 뜨는 지역 3개 가져오기 종료 ********* */
	
	/** ********* POI 뜨는 지역 3개 POI 가져오기 시작 ********* */
	(function() {
		$class("sop.openApi.getCompanyBestAreaPOI.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var that = options.target;
						
						var result = res.result;
						
						switch(parseInt(res.errCd)) {
							case 0:
								var poiList = res.result.company_list;
								
								if (poiList.length > 0) {
									for ( var i = 0; i < poiList.length; i++) {
										var _markerIcon = sop.icon({
											iconUrl : '/img/marker/marker/70_07.png',
											shadowUrl : '/img/marker/theme_shadow.png',
											iconAnchor : [ 13, 40 ],
											iconSize : [ 25, 40 ],
											infoWindowAnchor: [1, -34]
										});

										var _marker = sop.marker([ poiList[i].x, poiList[i].y ], {
											icon : _markerIcon
										});

										_marker.info = poiList[i];
										_marker.addTo(that.markers);

										var tel_num = "";
										if (!sop.Util.isUndefined(poiList[i].tel_no)) {
											tel_num = poiList[i].tel_no;
											tel_num = appendHyphenToPhoneNumber(tel_num);
										}

										var tempList = {};
										tempList.corp_nm = poiList[i].corp_nm;
										tempList.naddr = poiList[i].naddr;
										tempList.class_nm = poiList[i].class_nm;
										tempList.worker_sum = poiList[i].worker_sum;
										//$thematicMapFrame03.ui.poiInfoArray.push(tempList);

										var html = '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
										html += '<tr>';
										html += '<th style="text-align: left; word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + poiList[i].corp_nm + '</strong></th>';
										html += '<td >';
										html += '</td>';
										html += '</tr>';
										//html += '<tr>';
										//html += ' <th style="text-align: left; word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:12px;">&nbsp;' + poiList[i].naddr + '</th>';
										//html += '<td >';
										//html += '</td>';
										//html += '</tr>';
										html += '</table>';
										_marker.bindInfoWindow(html);
									}
								} else {
									messageAlert.open("알림", "검색 결과가 존재하지 않습니다.");
								}
								break;
							
							case -100:
								messageAlert.open("알림", "조회된 정보가없습니다.");
								break;
								
							default:
								
								break;
						}
					},
					onFail : function(status, options) {
						/*
						var that = options.target;
						//var poiList = res.result.company_list;
						
						poiList = [{"worker_sum":3,"adm_cd":"3334031","theme_cd":"9003","class_code":"Q86201","corp_nm":"유의원","adm_addr":"충청북도 영동군 용산면","tot_reg_cd":"3334031020001","class_nm":"일반 의원","y":"1807215","sufid":"200710295186301807215467","x":"1029518","theme_nm":"편의/문화/병원"},{"worker_sum":2,"adm_cd":"3334031","theme_cd":"8007","class_code":"Q86300","corp_nm":"부상보건진료소","adm_addr":"충청북도 영동군 용산면","tot_reg_cd":"3334031020002","class_nm":"공중 보건 의료업","y":"1806901","sufid":"200810240477901806901457","x":"1024049","theme_nm":"기업/기타의료업"},{"worker_sum":2,"adm_cd":"3334031","theme_cd":"8007","class_code":"Q86300","corp_nm":"매금보건진료소","adm_addr":"충청북도 영동군 용산면","tot_reg_cd":"3334031020003","class_nm":"공중 보건 의료업","y":"1809672","sufid":"200810290298101809670050","x":"1029030","theme_nm":"기업/기타의료업"},{"worker_sum":3,"adm_cd":"3334031","theme_cd":"8007","class_code":"Q86300","corp_nm":"용산보건지소","adm_addr":"충청북도 영동군 용산면","tot_reg_cd":"3334031020004","class_nm":"공중 보건 의료업","y":"1807549","sufid":"201110293329701807549179","x":"1029333","theme_nm":"기업/기타의료업"}];
						
						if (poiList.length > 0) {
							for ( var i = 0; i < poiList.length; i++) {
								var _markerIcon = sop.icon({
									iconUrl : '/img/marker/marker/70_07.png',
									shadowUrl : '/img/marker/theme_shadow.png',
									iconAnchor : [ 13, 40 ],
									iconSize : [ 25, 40 ],
									infoWindowAnchor: [1, -34]
								});

								var _marker = sop.marker([ poiList[i].x, poiList[i].y ], {
									icon : _markerIcon
								});

								_marker.info = poiList[i];
								_marker.addTo(that.markers);

								var tel_num = "";
								if (!sop.Util.isUndefined(poiList[i].tel_no)) {
									tel_num = poiList[i].tel_no;
									tel_num = appendHyphenToPhoneNumber(tel_num);
								}

								var tempList = {};
								tempList.corp_nm = poiList[i].corp_nm;
								tempList.naddr = poiList[i].naddr;
								tempList.class_nm = poiList[i].class_nm;
								tempList.worker_sum = poiList[i].worker_sum;
								//$thematicMapFrame03.ui.poiInfoArray.push(tempList);

								var html = '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
								html += '<tr>';
								html += '<th style="text-align: left; word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + poiList[i].corp_nm + '</strong></th>';
								html += '<td >';
								html += '</td>';
								html += '</tr>';
								//html += '<tr>';
								//html += ' <th style="text-align: left; word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:12px;">&nbsp;' + poiList[i].naddr + '</th>';
								//html += '<td >';
								//html += '</td>';
								//html += '</tr>';
								html += '</table>';
								_marker.bindInfoWindow(html);
							}
						} else {
							messageAlert.open("알림", "검색 결과가 존재하지 않습니다.");
						}
						*/
					}
				});
	}());
	/** ********* POI 뜨는 지역 3개 POI 가져오기 종료 ********* */
//////////////박길섭///////////////////////
	
	$class("sop.portal.sidoLifeCompanyInfo.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			//console.log("sop.portal.sidoLifeCompanyInfo.api start .... 1");
			
			var result = res.result.data;
			var map = options.map;
			
			switch(parseInt(res.errCd)) {
				case 0:
					
					//pie차트 크기설정을 위한 범례계산
					var corpData = [];
					var tmpCorpData = [];
					for (var i=0;i <result.length; i++) {
						tmpCorpData.push(parseInt(result[i].total_cnt));
					}
					corpData.push(tmpCorpData);
					map.legend.calculateLegend(corpData);
					tmpCorpData = null;
					
					//파이차트 마커 초기화
//					if ($technicalBizMap.ui.sidoPieChartMarkers == null) {
//						$technicalBizMap.ui.sidoPieChartMarkers = [];
//					}else {
//						for (var i=0; i<$technicalBizMap.ui.sidoPieChartMarkers.length; i++) {
//							$technicalBizMap.ui.sidoPieChartMarkers[i].remove();
//						}
//					}
					
					//파이차트너비
					var pieChartWidth = [60, 70, 80, 90, 98, 106, 114];
					// 2020년 SGIS고도화 3차(테마코드) 시작 - 기존 코드 주석 처리 (pse)
					/*
					var colorList = {
						"11" : "#FFC621",	//음식점
						"12" : "#E8771A",	//서비스
						"13" : "#019878",	//도소매
						"14" : "#017967",	//숙박업
						"21" : "#1778cc",					
						"22" : "#5b3fb2",	
						"23" : "#000000"	
					};
					var colorList = {
							"color_1" : "#ef356b",	//음식점
							"color_2" : "#f79339",	//서비스
							"color_3" : "#f7cb00",	//도소매
							"color_4" : "#b2cc19",	//숙박업 //원래값	
							"color_1" :	"#FFC621",
							"color_2" :	"#E8771A",
							"color_3" :	"#1778cc",
							"color_4" :	"#017967",
							"color_5" : "#00AAFF",					
							"color_6" : "#0000FF",	
							"color_7" : "#9900FF"	
					};
					*/
					// 2020년 SGIS고도화 3차(테마코드) 끝  - 기존 코드 주석 처리 (pse)
					
					var type = "sido";
					
					
					//파이차트마커 생성
					if (map.geojson) {
						
						map.geojson.eachLayer(function(layer) {
							
							var tmpData = [];
							
							for (var i=0; i<result.length; i++) {
								var tmpResult = result[i];
								if (tmpResult.sido_cd == layer.feature.properties.adm_cd) {
									var x_coord = layer.feature.properties.x;
									var y_coord = layer.feature.properties.y;
									var adm_cd = layer.feature.properties.adm_cd;
									var adm_nm = layer.feature.properties.adm_nm;
									var calcInfo = map.legend.getColor(parseFloat(tmpResult.total_cnt), map.legend.valPerSlice[0]);
									var width = pieChartWidth[calcInfo[1]];
									var margin = -(width/2) + "px";
									if(adm_cd=="31"){
										var html  = "<div id='chart_"+adm_cd+"' class='remove_chart' style='width:"+width+"px;height:"+width+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:-31px;margin-top:-47px;'>";
											html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;'>"+adm_nm+"</div>";
											html += 	"<div id='pieChart_"+adm_cd+"'></div>";
											html += "</div>";
									}
									else if(adm_cd=="11"){
										var html  = "<div id='chart_"+adm_cd+"' class='remove_chart' style='width:"+width+"px;height:"+width+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:-73px;margin-top:-68px;'>";
											html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;'>"+adm_nm+"</div>";
											html += 	"<div id='pieChart_"+adm_cd+"'></div>";
											html += "</div>";
									}
									else{
										var html  = "<div id='chart_"+adm_cd+"' class='remove_chart' style='width:"+width+"px;height:"+width+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:"+margin+";margin-top:"+margin+";'>";
											html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;'>"+adm_nm+"</div>";
											html += 	"<div id='pieChart_"+adm_cd+"'></div>";
											html += "</div>";
									}
									var icon = new sop.DivIcon({html:html, className: "pieChart-sido", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
									var marker = sop.marker([ x_coord, y_coord ], {
										icon : icon
									});
									marker.addTo(map.gMap);
									
									
									
									// mng_s 20200615 김건민 (문구 수정함)
									var tooltipMsg = "<div class='techSidoTooltipBox' >";
										tooltipMsg += 	"<div class='tech_topbar'>"+adm_nm+" 비율</div>";
										tooltipMsg += 	"<div class='tech_popContents'>";
										tooltipMsg += 		"<div class='tech_typelabel'>";
										tooltipMsg +=   		"<p class='tech_txtSubj'>총사업체 수 : "+appendCommaToNumber(tmpResult.total_cnt)+"개</p>";	
									
										// 2020년 SGIS고도화 3차(테마코드) 시작 - 기존코드 주석처리(pse)
										/*
										tmpData.push({
											num : 1,
											name :  "음식점",
											cnt : parseFloat(tmpResult.rstrt_corp_cnt),
											y : parseFloat(tmpResult.rstrt_per),
											color : colorList["color_1"]
										});
										tmpData.push({
											num : 2,
											name : "생활서비스",
											cnt :parseFloat(tmpResult.srv_corp_cnt),
											y : parseFloat(tmpResult.srv_per),
											color : colorList["color_2"]
										});
										tmpData.push({
											num : 3,
											name : "소매업",
											cnt : parseFloat(tmpResult.whrtlsal_corp_cnt),
											y : parseFloat(tmpResult.whrtlsal_per),
											color : colorList["color_3"]
										});
										tmpData.push({
											num : 4,
											name : "숙박업",
											cnt : parseFloat(tmpResult.lodgebiz_corp_cnt),
											y : parseFloat(tmpResult.lodgebiz_per),
											color : colorList["color_4"]
										});
										// mng_e 20200615 김건민
										////////////////////2018.08.09 박길섭//////////////////////////////////////////
										*/
										// 2020년 SGIS고도화 3차(테마코드) 끝 - 기존코드 주석처리(pse)

										// 2020년 SGIS고도화 3차(테마코드) 시작  - 하드코딩 해소 (pse)
										$themeCdCommon.bigThemeCdList.forEach(function(item,index){
										    tmpData.push({
										        num: index+1,
										        name: item.b_theme_cd_nm,
										        cnt: parseFloat(tmpResult[item.b_theme_cd.toLowerCase() + '_corp_cnt']),
										        y: parseFloat(tmpResult[item.b_theme_cd.toLowerCase() + '_per']),
										        //color: colorList['color_'+(index+1)],
										        color: $themeCdCommon.bigThemeCdList[index].color,
										        cls : 'ico0' + (index+1)
										    });
										});
										// 2020년 SGIS고도화 3차(테마코드) 끝  - 하드코딩 해소 (pse)
										
									for(var i=0;i<tmpData.length;i++){
										
										// 2020년 SGIS고도화 3차(테마코드) 시작 - 기존 코드 주석처리 (switch 문 하드 코딩 해소) (pse)
										/*
										switch(tmpData[i].num){
											case 1:
												cls = "ico01";
												break;
											case 2:
												cls ="ico02";
												break;
											case 3:
												cls = "ico03";
												break;
											case 4:
												cls = "ico04";
												break;
										}		
										*/
										// 2020년 SGIS고도화 3차(테마코드) 끝  (pse)
										if (i%2==0) {
											tooltipMsg += "<div class='tech_valuebox'>";
										}
										tooltipMsg += 	"<span class='tooltip-boolit' style='background-color:"+tmpData[i].color+"'>"+'' +"</span>"; // 2020년 SGIS고도화 3차(테마코드) - 기존에는 이미지 파일을  class='tech_tit' 에 넣음. 이것을 inline-block으로 대체(pse)
										tooltipMsg += 	"<span class='tech_tit "+tmpData[i].cls+"'>"+tmpData[i].name+"</span>";						// 2020년 SGIS고도화 3차(테마코드) - cls ==> tmpData[i].cls 로 변경 (pse)
										//tooltipMsg += 	"<span class='tech_tit "+cls+"'>"+tmpData[i].name+"</span>";  // 2020년 SGIS고도화 3차(테마코드) - 기존 코드 주석처리
										tooltipMsg +=	"<div class='tech_val'>";
										tooltipMsg +=  		"<p class='t01'>"+tmpData[i].y+"%</p>";
										tooltipMsg += 		"<p class='t02'>"+appendCommaToNumber(tmpData[i].cnt)+"개</p>";
										tooltipMsg +=	"</div>";
										
										
										if (i != 0 && i%2!=0) {
											tooltipMsg += "</div>";
										}
										
										if (i == 3) {
											tooltipMsg += "<hr style='color:#888;'/>";
										}	
										
										
									}
									var intro="intro";
									////사업체차트타입
									var charttype=1;
									tooltipMsg += 	"</div>";
									tooltipMsg +=		"<div class='tech_btnBox'>";
									tooltipMsg +=			"<a href='javascript:$bizStatsMap.ui.doUpdateDataboard(\""+adm_cd+"\", \""+adm_nm+"\", \""+intro+"\", \""+charttype+"\");' class='tech_btnGtype t01' style='color:#5b5b5b;'>지역통계 데이터보기</a>";
									tooltipMsg +=		"</div>";//$bizStatsMap.callbackFunc.didSelectedPolygon(e, layer.feature, layer.options.type, map);
									tooltipMsg +=	"</div>";
									tooltipMsg += "</div>";
									marker.bindInfoWindow(tooltipMsg);
									
									//파이차트 생성
									$("#pieChart_"+adm_cd).highcharts({
							            chart: {
							                type: 'pie',
							                width : width,
							                height : width,
							                backgroundColor:'rgba(255, 255, 255, 0)',
							                margin : [-3, 0, 0, 0],
							                //2017.10.17 [개발팀] 라이브러리 버전업그레이드로 인한 이벤트 오동작 오류 수정
							                events: {
							                    click: function(event) {
							                        marker.openInfoWindow();
							                        /*if(adm_cd=="11"){
							                        	$(".sop-infowindow").css("left","-209px");
							                        }
							                        else if(adm_cd=="31"){
							                        	$(".sop-infowindow").css("bottom","-23px");
							                        	$(".sop-infowindow").css("left","-156px");
							                        }*/
							                    }
							                }
							            },
							            exporting: { enabled: false },
							            title: {
							                text: ''
							            },
							            tooltip: {
							                 pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
							            },
							            plotOptions: {
							            	series: {
							                    dataLabels: {
							                        enabled: false,
							                        format: '{point.name}: {point.y:.1f}%'
							                    },
							                    enableMouseTracking: false
							                },
							                pie : {
							                	shadow : false,
							                	borderWidth: 0
							                }
							            },
							            series: [{
							                name: 'Brands',
							                colorByPoint: true,
							                data: tmpData
							            }]
							        });	
									
									
//									if(adm_cd == "37"){
//										html  = "<div id='chart_"+adm_cd+"' style='width:"+width+"px;height:"+width+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:"+margin+";margin-top:"+margin+";'>";
//										html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;'>"+"����"+"</div>";
//										html += 	"<div id='pieChart_"+adm_cd+"'></div>";
//									    html += "</div>";
//									    
//									    icon2 = new sop.DivIcon({html:html, className: "justText", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
//										var marker2 = sop.marker([ x_coord+290000, y_coord+90000], {
//											icon : icon2
//										});
//										marker2.addTo(map.gMap);
//										$technicalBizMap.ui.sidoPieChartMarkers.push(marker2);
//										html  = "<div id='chart_"+adm_cd+"' style='width:"+width+"px;height:"+width+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:"+margin+";margin-top:"+margin+";'>";
//										html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;'>"+"�︪��"+"</div>";
//										html += 	"<div id='pieChart_"+adm_cd+"'></div>";
//									    html += "</div>";
//
//									    
//									    
//									    icon2 = new sop.DivIcon({html:html, className: "justText", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
//										marker2 = sop.marker([ x_coord+200000, y_coord+120000 ], {
//											icon : icon2
//										});
//										marker2.addTo(map.gMap);
//										$technicalBizMap.ui.sidoPieChartMarkers.push(marker2);
//									}
									
									break;
								} 
							}
						});
						
						map.shareInfo.setTechnicalBizShareInfo(options, "sido", map.id);
					}
					break;
				case -401:
					accessTokenInfo(function() {
						$bizStatsMapApi.ui.doSidoIntro();
					});
					break;
				default:
					messageAlert.open("알림", res.errMsg);
					break;
			}
			apiLogWrite("B0", options);
			$bizStatsMapApi.request.setStatsData(res, options);		
		},
		onFail : function(status) {
			//console.log("onFail 123");
		}
	});
	$class("sop.portal.sidoLifeWorkerInfo.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			//console.log("sop.portal.sidoLifeWorkerInfo.api start ... 2");
			
			var result = res.result.data;
			var map = options.map;
			
			
			switch(parseInt(res.errCd)) {
				case 0:
					
					//pie차트 크기설정을 위한 범례계산
					var corpData = [];
					var tmpCorpData = [];
					for (var i=0;i <result.length; i++) {
						tmpCorpData.push(parseInt(result[i].total_worker_cnt));
					}
					corpData.push(tmpCorpData);
					map.legend.calculateLegend(corpData);
					tmpCorpData = null;
					
					//파이차트 마커 초기화
//					if ($technicalBizMap.ui.sidoPieChartMarkers == null) {
//						$technicalBizMap.ui.sidoPieChartMarkers = [];
//					}else {
//						for (var i=0; i<$technicalBizMap.ui.sidoPieChartMarkers.length; i++) {
//							$technicalBizMap.ui.sidoPieChartMarkers[i].remove();
//						}
//					}
					
					//파이차트너비
					var pieChartWidth = [60, 70, 80, 90, 98, 106, 114];
					// 2020년 SGIS고도화 3차(테마코드) 시작 - 기존 코드 주석 처리 (pse)
					/*
					var colorList = {
							"11" : "#FFC621",	//음식점
							"12" : "#E8771A",	//서비스
							"13" : "#019878",	//도소매
							"14" : "#017967",	//숙박업
							"21" : "#1778cc",					
							"22" : "#5b3fb2",	
							"23" : "#000000"		
					};
					var colorList = {
							"color_1" : "#ef356b",	//음식점
							"color_2" : "#f79339",	//서비스
							"color_3" : "#f7cb00",	//도소매
							"color_4" : "#b2cc19",	//숙박업 ///원래값	
							"color_1" :	"#FFC621",
							"color_2" :	"#E8771A",
							"color_3" :	"#1778cc",
							"color_4" :	"#017967",
							"color_5" : "#00AAFF",					
							"color_6" : "#0000FF",	
							"color_7" : "#9900FF"	
					};
					*/
					// 2020년 SGIS고도화 3차(테마코드) 끝  - 기존 코드 주석 처리 (pse)
					
					var type = "sido";
					
					
					//파이차트마커 생성
					if (map.geojson) {
						
						map.geojson.eachLayer(function(layer) {
							
							var tmpData = [];
							
							for (var i=0; i<result.length; i++) {
								var tmpResult = result[i];
								if (tmpResult.sido_cd == layer.feature.properties.adm_cd) {
									var x_coord = layer.feature.properties.x;
									var y_coord = layer.feature.properties.y;
									var adm_cd = layer.feature.properties.adm_cd;
									var adm_nm = layer.feature.properties.adm_nm;
									var calcInfo = map.legend.getColor(parseFloat(tmpResult.total_worker_cnt), map.legend.valPerSlice[0]);
									var width = pieChartWidth[calcInfo[1]];
									var margin = -(width/2) + "px";
									if(adm_cd=="31"){
										var html  = "<div id='chart_"+adm_cd+"' class='remove_chart' style='width:"+width+"px;height:"+width+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:-31px;margin-top:-47px;'>";
											html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;'>"+adm_nm+"</div>";
											html += 	"<div id='pieChart_"+adm_cd+"'></div>";
											html += "</div>";
									}
									else if(adm_cd=="11"){
										var html  = "<div id='chart_"+adm_cd+"' class='remove_chart' style='width:"+width+"px;height:"+width+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:-73px;margin-top:-68px;'>";
											html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;'>"+adm_nm+"</div>";
											html += 	"<div id='pieChart_"+adm_cd+"'></div>";
											html += "</div>";
									}
									else{
										var html  = "<div id='chart_"+adm_cd+"' class='remove_chart' style='width:"+width+"px;height:"+width+"px;z-index:10000;background-color:rgba(255,255,255,0);margin-left:"+margin+";margin-top:"+margin+";'>";
											html +=     "<div style='text-align:center;font-weight:bold;font-size:12px;'>"+adm_nm+"</div>";
											html += 	"<div id='pieChart_"+adm_cd+"'></div>";
											html += "</div>";
									}

									var icon = new sop.DivIcon({html:html, className: "pieChart-sido", iconSize: new sop.Point(7, 7), iconAnchor: new sop.Point(6,6), infoWindowAnchor: new sop.Point(1,-5)});
									var marker = sop.marker([ x_coord, y_coord ], {
										icon : icon
									});
									marker.addTo(map.gMap);
									
									
									
									// mng_s 20200615 김건민 (문구 수정함.)
									var tooltipMsg = "<div class='techSidoTooltipBox'>";
										tooltipMsg += 	"<div class='tech_topbar'>"+adm_nm+" 비율</div>";
										tooltipMsg += 	"<div class='tech_popContents'>";
										tooltipMsg += 		"<div class='tech_typelabel'>";
										tooltipMsg +=   		"<p class='tech_txtSubj'>총종사자 수 : "+appendCommaToNumber(tmpResult.total_worker_cnt)+"명</p>";	
										// 2020년 SGIS고도화 3차(테마코드) 시작 - 기존 코드 주석처리 (pse)
										/*
										tmpData.push({
											num : 1,
											name :  "음식점",
											cnt : parseFloat(tmpResult.rstrt_worker_cnt),
											y : parseFloat(tmpResult.rstrt_worker_per),
											color : colorList["color_1"]
										});
										tmpData.push({
											num : 2,
											name : "생활서비스",
											cnt :parseFloat(tmpResult.srv_worker_cnt),
											y : parseFloat(tmpResult.srv_worker_per),
											color : colorList["color_2"]
										});
										tmpData.push({
											num : 3,
											name : "소매업",
											cnt : parseFloat(tmpResult.whrtlsal_worker_cnt),
											y : parseFloat(tmpResult.whrtlsal_worker_per),
											color : colorList["color_3"]
										});
										tmpData.push({
											num : 4,
											name : "숙박업",
											cnt : parseFloat(tmpResult.lodgebiz_worker_cnt),
											y : parseFloat(tmpResult.lodgebiz_worker_per),
											color : colorList["color_4"]
										});
										// mng_e 20200615 김건민
										////////////////////2018.08.09 박길섭//////////////////////////////////////////
										*/
										// 2020년 SGIS고도화 3차(테마코드) 끝 - 기존 코드 주석처리 (pse)
										
										// 2020년 SGIS고도화 3차(테마코드) 시작 - 새로운 테마코드 대분류에 대한 데이터를 처리하기 위한 코드 추가 (pse)
										$themeCdCommon.bigThemeCdList.forEach(function(item,index){
										    tmpData.push({
										        num: index+1,
										        name: item.b_theme_cd_nm,
										        cnt: parseFloat(tmpResult[item.b_theme_cd.toLowerCase() + '_worker_cnt']),
										        y: parseFloat(tmpResult[item.b_theme_cd.toLowerCase() + '_worker_per']),
										        //color: colorList['color_'+(index+1)],
										        color: $themeCdCommon.bigThemeCdList[index].color,
										        cls: "ico0" + (index+1)
										    });
										});
										// 2020년 SGIS고도화 3차(테마코드) 끝 - 새로운 테마코드 대분류에 대한 데이터를 처리하기 위한 코드 추가 (pse)
										
									for(var i=0;i<tmpData.length;i++){
										// 2020년 SGIS고도화 3차(테마코드) 시작 - 기존 코드 주석처리 (pse)
										/*
										var cls;
										switch(tmpData[i].num){
											case 1:
												cls = "ico01";
												break;
											case 2:
												cls ="ico02";
												break;
											case 3:
												cls = "ico03";
												break;
											case 4:
												cls = "ico04";
												break;
										}		
										*/
										// 2020년 SGIS고도화 3차(테마코드) 끝 - 기존 코드 주석처리 (pse)
										if (i%2==0) {
											tooltipMsg += "<div class='tech_valuebox'>";
										}
										tooltipMsg += 	"<span class='tooltip-boolit' style='background-color:"+tmpData[i].color+"'></span>"; // 2020년 SGIS고도화 3차(테마코드) - 기존에는 이미지 파일을  class='tech_tit' 에 넣음. 이것을 inline-block으로 대체 (pse)
										tooltipMsg += 	"<span class='tech_tit "+tmpData[i].cls+"'>"+tmpData[i].name+"</span>";					// 2020년 SGIS고도화 3차(테마코드) - cls ==> tmpData[i].cls로 변경 (pse)
										//tooltipMsg += 	"<span class='tech_tit "+cls+"'>"+tmpData[i].name+"</span>";							// 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리
										tooltipMsg +=	"<div class='tech_val'>";
										tooltipMsg +=  		"<p class='t01'>"+tmpData[i].y+"%</p>";
										tooltipMsg += 		"<p class='t02'>"+appendCommaToNumber(tmpData[i].cnt)+"명</p>";
										tooltipMsg +=	"</div>";
										
										
										if (i != 0 && i%2!=0) {
											tooltipMsg += "</div>";
										}
										
										if (i == 3) {
											tooltipMsg += "<hr style='color:#888;'/>";
										}	
										
										
									}
									
									var intro ="intro";
									////종사자차트타입
									var charttype=2;
									tooltipMsg += 	"</div>";
									tooltipMsg +=		"<div class='tech_btnBox'>";
									tooltipMsg +=			"<a href='javascript:$bizStatsMap.ui.doUpdateDataboard(\""+adm_cd+"\", \""+adm_nm+"\", \""+intro+"\", \""+charttype+"\");' class='tech_btnGtype t01' style='color:#5b5b5b;'>지역통계 데이터보기</a>";
									tooltipMsg +=		"</div>";//$bizStatsMap.callbackFunc.didSelectedPolygon(e, layer.feature, layer.options.type, map);
									tooltipMsg +=	"</div>";
									tooltipMsg += "</div>";
									marker.bindInfoWindow(tooltipMsg);
									//파이차트 생성
									
									$("#pieChart_"+adm_cd).highcharts({
							            chart: {
							                type: 'pie',
							                width : width,
							                height : width,
							                backgroundColor:'rgba(255, 255, 255, 0)',
							                margin : [-3, 0, 0, 0],
							                //2017.10.17 [개발팀] 라이브러리 버전업그레이드로 인한 이벤트 오동작 오류 수정
							                events: {
							                    click: function(event) {
							                        marker.openInfoWindow();
							                        /*if(adm_cd=="11"){
							                        	$(".sop-infowindow").css("left","-209px");
							                        }
							                        else if(adm_cd=="31"){
							                        	$(".sop-infowindow").css("bottom","-23px");
							                        	$(".sop-infowindow").css("left","-156px");
							                        }*/
							                    }
							                }
							            },
							            exporting: { enabled: false },
							            title: {
							                text: ''
							            },
							            tooltip: {
							                 pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
							            },
							            plotOptions: {
							            	series: {
							                    dataLabels: {
							                        enabled: false,
							                        format: '{point.name}: {point.y:.1f}%'
							                    },
							                    enableMouseTracking: false
							                },
							                pie : {
							                	shadow : false,
							                	borderWidth: 0
							                }
							            },
							            series: [{
							                name: 'Brands',
							                colorByPoint: true,
							                data: tmpData
							            }]
							        });	
									
		
									
									break;
								} 
							}
						});
						
						map.shareInfo.setTechnicalBizShareInfo(options, "sido", map.id);
					}
					break;
				case -401:
					accessTokenInfo(function() {
						$bizStatsMapApi.ui.doSidoWorkerIntro();
					});
					break;
				default:
					messageAlert.open("알림", res.errMsg);
					break;
			}
			apiLogWrite("B0", options);
			$bizStatsMapApi.request.setStatsData(res, options);	
		},
		onFail : function(status) {
			//console.log("onFail 123");
		}
	});
	/////박길섭 추가 lqmap 전국대비 시도 지도
	$class("sop.portal.LqMap.api").extend(sop.portal.absAPI).define({
						onSuccess : function(status, res, options) {
							
							var map = options.map;
							//console.log("onSuccess");
							var result = res.result;
							
							
							var type = options.params.type;
							
							if (res.errCd == 0) { // 정상 수행
								var sidoCdList = [];
								var tmpData = [];
								var data =[];
								var showData = "";
								//var statsData = new Array();
								var unit = "LQ";
								
								
								var featureData = res.result;
								
								for(var i=0; i<featureData.length;i++){
									sidoCdList.push(featureData[i].sido_cd);
									//featureData[i].adm_cd = featureData[i].sido_cd;
									featureData[i].adm_nm = featureData[i].sido_nm;
									if(type=="worker"||type=="worker_lq"){
										tmpData.push(parseFloat(featureData[i].worker_lq));
										showData = "worker_lq";
										featureData[i][showData] = Number(featureData[i][showData]);
									}
									else{
										tmpData.push(parseFloat(featureData[i].corp_lq));
										showData = "corp_lq";
										featureData[i][showData] = Number(featureData[i][showData]);
									}
									featureData[i].unit = unit;
									featureData[i].showData = showData;
									featureData[i].type = "lq";
								}
								
								map.openApiBoundarySido(map.bnd_year, function(t , r) {
									$(r.features).each(function(index, elem ){
										var geojson = map.addPolygonGeoJson(elem, "polygon");
										  if (map.multiLayerControl.dataGeojson == null) {
											  map.multiLayerControl.dataGeojson = [];
											}
										map.multiLayerControl.dataGeojson.push(geojson);
										if(r.features.length - 1 == index){
											data.push(tmpData);
											map.data = null;
											map.legend.valPerSlice = map.legend.calculateLegend(data);
											
											res.result = featureData;
											res.pAdmCd = "00";
											map.setStatsData("normal",res,showData,unit);
											$bizStatsMap.ui.setLqMapSidoChangeColorMode();
										}
										
										
										
									});
									
//									var dataBoardOption = {
//											featureData : res.result,
//											standard : options.standard,
//											adm_cd : res.pAdmCd,
//											year : "2016",
//											selectThemeCd : "5002",
//											base_region : "country",
//											params : {
//												map : map
//											}
//									}
//									$technicalBizDataBoard.ui.updateDataBoard(dataBoardOption,"lq");	
								});
								$bizStatsMapApi.request.setStatsData(result,options);
								
								/*if ($("#bizLegend_bubble").hasClass("on")) {
									$bizStatsMap.ui.setChangeBubbleMode();
								}else {*/
								//map.mapMode = "";
								//$bizStatsMap.ui.setChangeColorMode();
								/*}*/
							} else if (res.errCd == -100) { // 데이터 없음

							} else if (res.errCd == -401) { // 오류 발생 (OpenAPI)
								accessTokenInfo(function() {
									//$bizStatsMapApi.request.openApiLqMap(options.options);
								});
							}
						}
					});
	/////박길섭 추가 lqmap 전국대비 시군구 지도
	$class("sop.portal.LqMapSgg.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			var map = options.map;
			//console.log("onSuccess");
			var result = res.result;
			
			var type = options.params.type;
			if (res.errCd == 0) { // 정상 수행
				var sidoCdList = [];
				var tmpData = [];
				var data =[];
				var showData = "";
				//var statsData = new Array();
				var unit = "LQ";
				
				
				var featureData = res.result;
				
				for(var i=0; i<featureData.length;i++){
					sidoCdList.push(featureData[i].sido_cd);
					//featureData[i].adm_cd = featureData[i].sido_cd;
					featureData[i].adm_nm = featureData[i].sido_nm;
					if(type=="worker"||type=="worker_lq"){//지도정보기준 종사자
						tmpData.push(parseFloat(featureData[i].worker_lq));
						showData = "worker_lq";
						featureData[i][showData] = Number(featureData[i][showData]);
					}
					else{//지도정보기준 사업체
						tmpData.push(parseFloat(featureData[i].corp_lq));
						showData = "corp_lq";
						featureData[i][showData] = Number(featureData[i][showData]);
					}
					featureData[i].unit = unit;
					featureData[i].showData = showData;
					featureData[i].type = "lq";
				}
				map.setStatsData("normal",res,showData,unit);
				map.openApiBoundaryHadmarea(options.params.adm_cd.slice(0,2),map.bnd_year,"1",null, function(t , r) {
					
					$(r.features).each(function(index, elem ){
						
						var geojson = map.addPolygonGeoJson(elem, "polygon");
						  if (map.multiLayerControl.dataGeojson == null) {
							  map.multiLayerControl.dataGeojson = [];
							}
						  map.multiLayerControl.dataGeojson.push(geojson);
						 
//						  $(map.multiLayerControl.dataGeojson).each(function(i , v){
//							  //console.log("rrrrrrrrrrrrrrrr");
//							 //console.log(v);
//						  });
						  if(!map.dataGeojson){
							  map.dataGeojson = map.multiLayerControl.dataGeojson[0];
							  map.dataGeojson._mapToAdd._animateToZoom = 20;
							  //map.dataGeojson._map._size.x = 800; 
							  //map.dataGeojson._map._size.y = 800; 
							  //map.dataGeojson._map._size._zoom = 100;
						  }
						  if(r.features.length - 1 == index){
							data.push(tmpData);
							map.data = null;
							map.legend.valPerSlice = map.legend.calculateLegend(data);
							
							res.result = featureData;
							res.pAdmCd = "00";
							map.setStatsData("normal",res,showData,unit);
							$bizStatsMap.ui.setLqMapSggChangeColorMode();
						}
						
						//$(".rightQuick.rq05").trigger("click");
						//$(".rightQuick.rq05").trigger("click");
						
						
						
					});
					
//					var dataBoardOption = {
//							featureData : res.result,
//							standard : options.standard,
//							adm_cd : res.pAdmCd,
//							year : "2016",
//							selectThemeCd : "5002",
//							base_region : "country",
//							params : {
//								map : map
//							}
//					}
//					$technicalBizDataBoard.ui.updateDataBoard(dataBoardOption,"lq");	
				});
				
				$bizStatsMapApi.request.setStatsData(result,options);//공유하기
				/*if ($("#bizLegend_bubble").hasClass("on")) {
					$bizStatsMap.ui.setChangeBubbleMode();
				}else {*/
				//map.mapMode = "";
				//$bizStatsMap.ui.setChangeColorMode();
				/*}*/
			} else if (res.errCd == -100) { // 데이터 없음

			} else if (res.errCd == -401) { // 오류 발생 (OpenAPI)
				accessTokenInfo(function() {
					//$bizStatsMapApi.request.openApiLqMap(options.options);
				});
			}
		}
	});
	/** ********* 전국시군구 지도 ********* */
	(function() {
		$class("sop.openApi.openApiSggMap.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						
						var map = options.map;
						switch(parseInt(res.errCd)) {
							case 0:
								var result = res.result;
								var tmpData = [];
								var data = [];
								var sidoCdList = [];
								var showData="", unit="";
								if(options.type=="corp_cnt"){
									showData = "corp_cnt";
									unit = "개";
								}
								else if(options.type=="corp_per"){
									showData = "corp_cnt";
									unit = "개";
								}
								else if(options.type=="resid_ppltn_cnt"){
									showData = "resid_ppltn_cnt";
									unit = "명/1개";
								}
								else if(options.type=="work_population_cnt"){
									showData = "work_population_cnt";
									unit = "명/1개";
								}
								else if(options.type=="households_cnt"){
									showData = "households_cnt";
									unit = "가구/1개";
								}
								else if(options.type=="worker_cnt"){
									showData = "worker_cnt";
									unit = "명";
								}
								else if(options.type=="avg_worker_cnt"){
									showData = "avg_worker_cnt";
									unit = "명";
								}
								for (var i=0; i<result.length; i++) {
								//for (var i=0; i<3; i++) {
									//seriesData[index] = parseFloat(value.replace(",", "."));
									result[i][showData]=parseFloat(result[i][showData]).toFixed(0);
									tmpData.push(result[i][showData]);
									//tmpData.push(result[i][theme_cd_nm]);수정해야할지 박길섭
									sidoCdList.push(result[i].sido_cd);
									
									//alert("result[i][showData] ==>["+ result[i][showData]);
									//alert(result[i].sido_cd);
									
								}
								data.push(tmpData);
								
								map.data = null;
								map.legend.valPerSlice = map.legend.calculateLegend(data);
								map.setStatsData("normal", res, showData, unit);
								//$("#bizLegend_color").hasClass("on");
								//$("#bizLegend_bubble").removeClass("on");
								if ($("#bizLegend_bubble").hasClass("on")) {
									$bizStatsMap.ui.setChangeBubbleMode();
								}else {
									map.mapMode = "color";
									$bizStatsMap.ui.setChangeColorMode();
								}
								
								data = null;
								tmpData = null;
								
								//API 로그
								apiLogWrite("B0", options);
								
								$bizStatsMapApi.request.setStatsData(res, options);
								
								break;
							case -401:
								accessTokenInfo(function() {
									$bizStatsMapApi.request.openApiSggCompanyCnt(options.params.jobAreaThemeCd, options.themeCd, options.themeNm, options.map, options.idx);
								});
								break;
							default:
								break;
						}
					},
					onFail : function(status, options) {
					}
				});
	}());
	/** ********* 전국 시군구 지도 종료 ********* */
	
}(window, document));