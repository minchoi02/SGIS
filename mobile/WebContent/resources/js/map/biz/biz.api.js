(function(W, D) {
	W.$biz = W.$biz || {};
	$biz.api = {
		/**
		 * @name           : sggtobcorpcount
		 * @description    : 테마 개수 조회
		 * @date           : 2017. 02. 07.
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param params   : params
		 * @param callback : callback
		 */
		sggtobcorpcount : function(params,callback){
			//alert(callback);
			if(hasText(params.theme_cd)){
				var obj = new sop.portal.biz.api();
				obj.addParam("accessToken", accessToken);
				$.map(params,function(value,key){
					if(hasText(value)){
						obj.addParam(key,value);
					}
				});
				obj.request({
					method : "GET",
					async : true,
					url : openApiPath+"/OpenAPI3/startupbiz/sggtobcorpcount.json",
					options : {
						func : "sggtobcorpcount",
						params : params,
						callback : callback
					}
				});
				
			}else{
				messageAlert.open("알림","테마코드가 존재하지 않습니다");
			}
		},
		/**
		 * @name           : startupbiz
		 * @description    : 추천지역 리스트
		 * @date           : 2017. 02. 08.
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		startupbiz : function(params,callback){
			if(!hasText(params.adm_cd)){
				messageAlert.open("알림","행정동 코드를 확안해주세요");
			}else{
				var obj = new sop.portal.biz.api();
				obj.addParam("accessToken", accessToken);
				$.map(params,function(value,key){
					if(hasText(value)){
						obj.addParam(key,value);
					}
				});
				obj.request({
					method : "GET",
					async : true,
					url : openApiPath+"/OpenAPI3/startupbiz/startupbiz.json",
					options : {
						func:"sggtobcorpcount",
						params : params,
						callback : callback
					}
				});
			}
		},
		/**
		 * @name           : info
		 * @description    : 종합현황
		 * @date           : 2017. 02. 10.
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param type     : 시도 시군구 구분
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		info : function(type,params,callback){
			if(type=="sido"||type=="sgg"){
				if(!hasText(params[type+"_cd"])){
					messageAlert.open("알림"," 행정동 코드를 확인해주세요");
				}else{
					var obj = new sop.portal.biz.api();
					obj.addParam("accessToken", accessToken);
					$.map(params,function(value,key){
						if(hasText(value)){
							obj.addParam(key,value);
						}
					});
					obj.request({
						method : "GET",
						async : true,
						url : openApiPath+"/OpenAPI3/startupbiz/"+type+"tobinfo.json",
						options : {
							func:"info",
							params : params,
							callback : callback
						}
					});
				}
			}else{
				messageAlert.open("알림","잘못된 접근입니다");
			}
		},
		/**
		 * @name           : sidotobgroup
		 * @description    : 테마 정보
		 * @date           : 2017. 02. 10.
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param type     : 시도 시군구 구분
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		group : function(type,params,callback){
			if(type=="sido"||type=="sgg"){
				if(!hasText(params[type+"_cd"])){
					messageAlert.open("알림"," 행정동 코드를 확인해주세요");
				}else if(!hasText(params.theme_cd)){
					messageAlert.open("알림","테마코드가 존재하지 않습니다");
				}else{
					var obj = new sop.portal.biz.api();
					obj.addParam("accessToken", accessToken);
					$.map(params,function(value,key){
						if(hasText(value)){
							obj.addParam(key,value);
						}
					});
					obj.request({
						method : "GET",
						async : true,
						url : openApiPath+"/OpenAPI3/startupbiz/"+type+"tobgroup.json",
						options : {
							func:"group",
							params : params,
							callback : callback
						}
					});
				}
			}else{
				messageAlert.open("알림","잘못된 접근입니다");
			}
		},
		/**
		 * @name           : rank
		 * @description    : 순위 정보
		 * @date           : 2017. 02. 10.
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param type     : 시도 시군구 구분
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		rank : function(type,params,callback){
			if(type=="sido"||type=="sgg"){
				if(!hasText(params[type+"_cd"])){
					messageAlert.open("알림"," 행정동 코드를 확인해주세요");
				}else{
					var obj = new sop.portal.biz.api();
					obj.addParam("accessToken", accessToken);
					$.map(params,function(value,key){
						if(hasText(value)){
							if(type=="sgg"&&key=="sgg_cd"){
								key = "sido_cd";
								value = value.substring(0,2);
							}
							obj.addParam(key,value);
						}
					});
					obj.request({
						method : "GET",
						async : true,
						url : openApiPath+"/OpenAPI3/startupbiz/"+type+"tobrank.json",
						options : {
							func:"rank",
							params : params,
							callback : callback
						}
					});
				}
			}else{
				messageAlert.open("알림","잘못된 접근입니다");
			}
		},
		/**
		 * @name           : poiCompanyDensity
		 * @description    : 
		 * @date           : 2017. 02. 10.
		 * @author	       : 나광흠
		 * @history 	   : 사업체 조회
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		poiCompanyDensity : function(params,callback){
			var type = 1;
			if(!hasText(params.theme_cd)){
				messageAlert.open("알림","테마코드가 존재하지 않습니다");
			}else if(!hasText(params.year)){
				messageAlert.open("알림","년도를 확인해주세요");
			}else{
				var obj = new sop.portal.biz.api();
				if(!hasText(params.adm_cd)||params.adm_cd=="00"){
					obj.addParam("data_type","1");
				}
				$.map(params,function(value,key){
					console.log(key+":"+value)
					if(hasText(value)){
						if(key=="adm_cd"){
							if(value!="00"){
								if(value.length==2){
									obj.addParam("data_type","2");
									type =2;
								}else if(value.length>=5){
									value = value.substring(0,5);
									obj.addParam("data_type","3");
									type=3;
								}
							}
						}
						obj.addParam(key,value);
					}
				});
				$biz.options = {
						func:"poiCompanyDensity",
						type:type,
						url : "/ServiceAPI/bizStats/poiCompanyDensity.json",
						map : map,
						params : params,
						callback : callback
				};
				
				
				obj.request({
					method : "POST",
					async : true,
					url : sgisContextPath+"/ServiceAPI/bizStats/poiCompanyDensity.json",
					options : {
						func:"poiCompanyDensity",
						type:type,
						url : "/ServiceAPI/bizStats/poiCompanyDensity.json",
						map : map,
						params : params,
						callback : callback
					}
				});
			}
		},
		/**
		 * @name           : poiCompanyTimeSeries
		 * @description    : 
		 * @date           : 2017. 02. 10.
		 * @author	       : 나광흠
		 * @history 	   : 차트 값 조회
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		poiCompanyTimeSeries : function(params,callback){
			if(!hasText(params.theme_cd)){
				messageAlert.open("알림","테마코드가 존재하지 않습니다");
			}else{
				var obj = new sop.portal.biz.api();
				$.map(params,function(value,key){
					if(hasText(value)){
						obj.addParam(key,value);
					}
				});
				obj.request({
					method : "POST",
					async : true,
					url : sgisContextPath+"/ServiceAPI/bizStats/poiCompanyTimeSeries.json",
					options : {
						func:"poiCompanyTimeSeries",
						params : params,
						callback : callback
					}
				});
			}
		},
		/**
		 * @name           : corpdistsummary
		 * @description    : 
		 * @date           : 2017. 02. 14.
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		corpdistsummary : function(params,callback){
			var obj = new sop.portal.biz.api();
			obj.addParam("accessToken", accessToken);
			$.map(params,function(value,key){
				if(hasText(value)){
					obj.addParam(key,value);
				}
			});
			obj.request({
				method : "GET",
				async : true,
				url : openApiPath + "/OpenAPI3/startupbiz/corpdistsummary.json",
				options : {
					func:"corpdistsummary",
					params : params,
					callback : callback
				}
			});
		},
		/**
		 * @name           : regiontotal
		 * @description    : 
		 * @date           : 2017. 02. 15.
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		regiontotal : function(params,callback){
			var obj = new sop.portal.biz.api();
			obj.addParam("accessToken", accessToken);
			$.map(params,function(value,key){
				if(hasText(value)){
					obj.addParam(key,value);
				}
			});
			obj.request({
				method : "GET",
				async : true,
				url : openApiPath + "/OpenAPI3/startupbiz/regiontotal.json",
				options : {
					func:"regiontotal",
					params : params,
					callback : callback
				}
			});
		},
		/**
		 * @name           : corpindecrease
		 * @description    : 
		 * @date           : 2017. 02. 15.
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		corpindecrease : function(params,callback){
			var obj = new sop.portal.biz.api();
			obj.addParam("accessToken", accessToken);
			$.map(params,function(value,key){
				if(hasText(value)){
					obj.addParam(key,value);
				}
			});
			obj.request({
				method : "GET",
				async : true,
				url : openApiPath + "/OpenAPI3/startupbiz/corpindecrease.json",
				options : {
					func:"corpindecrease",
					params : params,
					callback : callback
				}
			});
		},
		/**
		 * @name           : mainFacilityList
		 * @description    : 
		 * @date           : 2017. 02. 15.
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		mainFacilityList : function(params,callback){
			var obj = new sop.portal.biz.api();
			$.map(params,function(value,key){
				if(hasText(value)){
					obj.addParam(key,value);
				}
			});
			obj.request({
				method : "POST",
				async : true,
				url : sgisContextPath + "/ServiceAPI/bizStats/mainFacilityList.json",
				options : {
					func:"mainFacilityList",
					params : params,
					callback : callback
				}
			});
		},
		/**
		 * @name           : pplsummary
		 * @description    : 
		 * @date           : 2017. 02. 15.
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		pplsummary : function(params,callback){
			var obj = new sop.portal.biz.api();
			obj.addParam("accessToken", accessToken);
			$.map(params,function(value,key){
				if(hasText(value)){
					obj.addParam(key,value);
				}
			});
			obj.request({
				method : "GET",
				async : true,
				url : openApiPath + "/OpenAPI3/startupbiz/pplsummary.json",
				options : {
					func:"pplsummary",
					params : params,
					callback : callback
				}
			});
		},
		/**
		 * @name           : mfratiosummary
		 * @description    : 
		 * @date           : 2017. 02. 15.
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		mfratiosummary : function(params,callback){
			var obj = new sop.portal.biz.api();
			obj.addParam("accessToken", accessToken);
			$.map(params,function(value,key){
				if(hasText(value)){
					obj.addParam(key,value);
				}
			});
			obj.request({
				method : "GET",
				async : true,
				url: openApiPath + "/OpenAPI3/startupbiz/mfratiosummary.json",
				options : {
					func:"mfratiosummary",
					params : params,
					callback : callback
				}
			});
		},
		/**
		 * @name           : ocptnsummary
		 * @description    : 
		 * @date           : 2017. 02. 15.
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		ocptnsummary : function(params,callback){
			var obj = new sop.portal.biz.api();
			obj.addParam("accessToken", accessToken);
			$.map(params,function(value,key){
				if(hasText(value)){
					obj.addParam(key,value);
				}
			});
			obj.request({
				method : "GET",
				async : true,
				url: openApiPath + "/OpenAPI3/startupbiz/ocptnsummary.json",
				options : {
					func:"ocptnsummary",
					params : params,
					callback : callback
				}
			});
		},
		/**
		 * @name           : housesummary
		 * @description    : 
		 * @date           : 2017. 02. 15.
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		housesummary : function(params,callback){
			var obj = new sop.portal.biz.api();
			obj.addParam("accessToken", accessToken);
			$.map(params,function(value,key){
				if(hasText(value)){
					obj.addParam(key,value);
				}
			});
			obj.request({
				method : "GET",
				async : true,
				url: openApiPath + "/OpenAPI3/startupbiz/housesummary.json",
				options : {
					func:"housesummary",
					params : params,
					callback : callback
				}
			});
		},
		/**
		 * @name           : houseprice
		 * @description    : 
		 * @date           : 2017. 02. 15.
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		houseprice : function(params,callback){
			var obj = new sop.portal.biz.api();
			$.map(params,function(value,key){
				if(hasText(value)){
					obj.addParam(key,value);
				}
			});
			obj.request({
				method : "POST",
				async : true,
				url : sgisContextPath + "/ServiceAPI/bizStats/houseprice.json",
				options : {
					func:"houseprice",
					params : params,
					callback : callback
				}
			});
		},
		/**
		 * @name           : housevolume
		 * @description    : 
		 * @date           : 2017. 02. 15.
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		housevolume : function(params,callback){
			var obj = new sop.portal.biz.api();
			$.map(params,function(value,key){
				if(hasText(value)){
					obj.addParam(key,value);
				}
			});
			obj.request({
				method : "POST",
				async : true,
				url : sgisContextPath + "/ServiceAPI/bizStats/housevolume.json",
				options : {
					func:"housevolume",
					params : params,
					callback : callback
				}
			});
		},
		/**
		 * @name           : housepnilp
		 * @description    : 
		 * @date           : 2017. 02. 15.
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		housepnilp : function(params,callback){
			var obj = new sop.portal.biz.api();
			$.map(params,function(value,key){
				if(hasText(value)){
					obj.addParam(key,value);
				}
			});
			obj.request({
				method : "POST",
				async : true,
				url : sgisContextPath + "/ServiceAPI/bizStats/housepnilp.json",
				options : {
					func:"housevolume",
					params : params,
					callback : callback
				}
			});
		},
		/**
		 * @name           : allCompanyPplHouse
		 * @description    : 
		 * @date           : 2017. 02. 15.
		 * @author	       : 나광흠
		 * @history 	   :
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		allCompanyPplHouse : function(params,callback){
			var obj = new sop.portal.biz.api();
			$.map(params,function(value,key){
				if(hasText(value)){
					obj.addParam(key,value);
				}
			});
			obj.request({
				method : "POST",
				async : true,
				url : sgisContextPath + "/ServiceAPI/bizStats/allCompanyPplHouse.json",
				options : {
					func:"housevolume",
					params : params,
					callback : callback
				}
			});
		}
	};
	$biz.options = null; 
	/*********** 콜백함수 시작 **********/
	(function() {
		$class("sop.portal.biz.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if(res.errCd == "0"){
					if(typeof options.callback==="function"){
						options.callback(res);
					}
				}else if(res.errCd == "-401") {
					accessTokenInfo(function(){
						if(typeof $biz.api[options.func]==="function"){
							$biz.api[options.func](options.params,options.callback);
						}
					});
				}
			},
			onFail: function(status, options) {
			}
		});
	}());
	/*********** 콜백함수 종료 **********/
}(window, document));