(function(W, D) {
	W.sCensusApi = W.sCensusApi || {};
	
	sCensusApi = {
		request : function(map){
			var that = this;
			this.excludeAdmCd = [];//검색 제외할 행정동 코드
			this.lastParameters = {};
			this.API_0301 = {
				url : "/OpenAPI3/stats/population.json",
				showName : {
					"tot_ppltn" : "총인구",
					"avg_age" : "평균나이",
					"ppltn_dnsty" : "인구밀도",
					"aged_child_idx" : "노령화지수",
					"oldage_suprt_per" : "노년부양비",
					"juv_suprt_per" : "유년부양비",
					"tot_family" : "총가구",
					"avg_fmember_cnt" : "평균가구원수",
					"tot_house" : "총주택",
					"nongga_cnt" : "농가",
					"nongga_ppltn" : "농가 인구",
					"imga_cnt" : "임가",
					"imga_ppltn" : "임가 인구",
					"naesuoga_cnt" : "내수면 어가",
					"naesuoga_ppltn" : "내수면 어가 인구",
					"haesuoga_cnt" : "해수면 어가",
					"haesuoga_ppltn" : "해수면 어가인구",
					"employee_cnt" : "종업원수",
					"corp_cnt" : "사업체수"
				}
			};
			this.API_0302 = {
				url : "/OpenAPI3/stats/innersearchpopulation.json",
				showName : {
					"population" : "인구수",
					"avg_age" : "평균나이"
				}
			};
			this.API_0303 = {
				url : "/OpenAPI3/stats/industrycode.json",
				showName : {
					"class_code" : "코드",
					"class_nm" : "코드명"
				}
			};
			this.API_0304 = {
				url : "/OpenAPI3/stats/company.json",
				showName : {
					"corp_cnt" : "사업체 수",
					"tot_worker" : "총 종사자 수"
				}
				
			};
			this.API_0305 = {
				url : "/OpenAPI3/stats/household.json",
				showName : {
					"household_cnt" : "가구수",
					"family_member_cnt" : "총 가구원 수",
					"avg_family_member_cnt" : "평균가구원수"
				}
			};
			this.API_0306 = {
				url : "/OpenAPI3/stats/house.json",
				showName : {
					"house_cnt" : "주택수"
				}
			};
			this.API_0307 = {
				url : "/OpenAPI3/stats/farmhousehold.json",
				showName : {
					"farm_cnt" : "농가 수",
					"population" : "농가인구 수",
					"avg_population" : "농가 평균 인구 수"
				}
			};
			this.API_0308 = {
				url : "/OpenAPI3/stats/forestryhousehold.json",
				showName : {
					"forestry_cnt" : "가구 수",
					"population" : "임가 인구 수",
					"avg_population" : "임가 평균인구 수"
				}
			};
			this.API_0309 = {
				url : "/OpenAPI3/stats/fisheryhousehold.json",
				showName : {
					"fishery_cnt" : "어가 수",
					"population" : "어가인구 수",
					"avg_population" : "어가 평균 인구 수"
				}
			};
			this.API_0310 = {
				url : "/OpenAPI3/stats/householdmember.json",
				showName : {
					"population" : "인구 수"
				}
			};
			this.API_0602 = {
				url :"/OpenAPI3/startupbiz/pplsummary.json",
				showName : {
					"apart_per" : "아파트",
					"row_house_per" : "연립/다세대",
					"officetel_per" : "오피스텔",
					"detach_house_per" : "단독주택",
					"dom_soc_fac_per" : "기숙사 및 사회시설",
					"etc_per" : "기타"
				}
			};
			this.API_0604 = {
				url : "/OpenAPI3/startupbiz/housesummary.json",
				showName : {
					"teenage_less_than_per" : "10대 미만",
					"teenage_per" : "10대",
					"twenty_per" : "20대",
					"thirty_per" : "30대",
					"forty_per" : "40대",
					"fifty_per" : "50대",
					"sixty_per" : "60대",
					"seventy_more_than_per" : "70대 이상"
				}
			};
			this.API_0606 = {
				url : "/OpenAPI3/startupbiz/ocptnsummary.json",
				showName : {
					"self_per" : "자가", 
					"lease_per" : "전세", 
					"monrent_per" : "월세" 
				}
			}
			/**
			 * @name            : setStatsMapAdmCdCensusData
			 * @description     : 센서스 데이터
			 * @date            : 2016. 03. 16. 
			 * @author          : 나광흠
			 * @history         :
			 * @param api       : api id
			 * @param option    : 지도에 뿌려줄 옵션
			 * 	{
			 * 		onlyGetData : 지도에는 셋팅안하고 데이터만 얻을지의 유무
			 * 		curPolygonCode : curPolygonCode
			 * 		adm_cd : 행정동 코드
			 * 		showData : 보여줄 데이터 값의 key
			 * 		showDataName : 보여줄 데이터 이름
			 * 		unit : 단위
			 * 		callback : callback
			 * 	}
			 * @param parameter : parameter
			 */
			this.setStatsMapAdmCdCensusData = function(api,option,parameter){
				if(!hasText(option.showDataName)&&hasText(option.showData)){
					option.showDataName = this[api][option.showData];
				}
				if(this.excludeAdmCd&&this.excludeAdmCd.length>0&&this.excludeAdmCd.indexOf(option.adm_cd)>-1){
					if(typeof option.callback === "function"){
						option.callback();
					}
					return;
				}
				var url = openApiPath+that[api].url;
				if(api=="API_0304"&&!hasText(parameter.class_code)&&!hasText(parameter.theme_cd)){//사업체 검색이고 전산업일 경우는 API_0301 로 바라보게 변경 
					url = openApiPath+that["API_0301"].url;
				}
				if(url){
					map.setPolygonCode();
					var obj = new sop.openApi.map.census.api();
					obj.addParam("accessToken", accessToken);
					if(/^API_03/.test(api)&&!hasText(option.low_search)){
						obj.addParam("low_search", 1);
					}
					$.map(parameter,function(value,key){
						if(value){
							obj.addParam(key, value);
						}
					});
					if(!option.onlyGetData){
						option.curPolygonCode = map.curPolygonCode;
						that.lastParameters = {
							api : api,
							option : $.extend(true,{},option),
							parameter : parameter
						};
						if(map.curPolygonCode>1&&option.adm_cd){
							obj.addParam("adm_cd", option.adm_cd);
						}
					}else{
						if(option.adm_cd){
							obj.addParam("adm_cd", option.adm_cd);
						}
					}
					obj.request({
						method : "GET",
						async : false,
						url : url,
						options : {
							target : that,
							map : map,
							api : api,
							option : option,
							parameter : parameter
						}
					});
				}else{
					common_alert("API가 잘못 되었습니다");	// 2020.09.28[한광희] 팝업 수정
				}
			};
			/**
			 * @name            : setStatsMapAdmCdCensusData
			 * @description     : 행정동 코드를 지도객체에서 갖고와서 센서스 데이터 조회
			 * @date            : 2016. 03. 16. 
			 * @author          : 나광흠
			 * @history         :
			 * @param api       : api id
			 * @param option    : 지도에 뿌려줄 옵션
			 * 	{
			 * 		onlyGetData : 지도에는 셋팅안하고 데이터만 얻을지의 유무
			 * 		curPolygonCode : curPolygonCode
			 * 		adm_cd : 행정동 코드
			 * 		showData : 보여줄 데이터 값의 key
			 * 		showDataName : 보여줄 데이터 이름
			 * 		unit : 단위
			 * 		callback : callback
			 * 	}
			 * @param parameter : parameter
			 */
			this.setStatsMapCensusData = function(api,option,parameter){
				delete option.adm_cd;
				delete option.curPolygonCode;
				option.adm_cd = map.getAdmCd();
				option.setStatsMapCensusData = true;
				that.setStatsMapAdmCdCensusData(api,option,parameter);
			}
		}
	};
	/*********** OpenAPI 경계 Start **********/
	(function () {
		$class("sop.openApi.map.census.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				if(res.errCd == "0") {
					if(options.option.onlyGetData){
						if(typeof options.option.callback === "function"){
							options.option.callback(res);
						}
					}else{
						options.map.setStatsData(options.option,res.result,options.parameter);
					}
				}else if(res.errCd == "-401") {
					accessTokenInfo(function(){
						if(options.option.setStatsMapCensusData){
							options.target.setStatsMapCensusData(options.api,options.option,options.parameter);
						}else{
							options.target.setStatsMapAdmCdCensusData(options.api,options.option,options.parameter);
						}
					});
				}else{
					if(options.map.dataBoundary){
						options.map.dataBoundary.remove();
					}
					common_alert(res.errMsg);	// 2020.09.28[한광희] 팝업 수정
					if(typeof options.option.callback === "function"){
						options.option.callback(res);
					}
				}
			},
			onFail : function (status) {
				common_alert(errorMessage);	// 2020.09.28[한광희] 팝업 수정
			}
		});
	}());
	/*********** OpenAPI 경계. End **********/
}(window, document));