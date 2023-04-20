(function(W, D) {
	W.$bizMap = W.$bizMap || {};
	$bizMap.api = {
		/**
		 * @name           : sggtobcorpcount
		 * @description    : 테마 개수 조회
		 * @date           : 2020.07.10
		 * @author	       : 한광희
		 * @history 	   :
		 * @param params   : params
		 * @param callback : callback
		 */
		sggtobcorpcount : function(params,callback){
			//alert(callback);
			if(hasText(params.theme_cd)){
				var obj = new sop.portal.bizMap.api();
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
				common_alert("테마코드가 존재하지 않습니다");
			}
		},
		
		/**
		 * @name           : poiCompanyDensity
		 * @description    : 
		 * @date           : 2020.07.15
		 * @author	       : 한광희
		 * @history 	   : 사업체 조회
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		poiCompanyDensity : function(params,callback){
			var type = 1;
			if(!hasText(params.theme_cd)){
				common_alert("테마코드가 존재하지 않습니다");
			}else if(!hasText(params.year)){
				common_alert("년도를 확인해주세요");
			}else{
				var obj = new sop.portal.bizMap.api();
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
				$bizMap.options = {
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
		 * @date           : 2020.07.20
		 * @author	       : 한광희
		 * @history 	   : 차트 값 조회
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		poiCompanyTimeSeries : function(params,callback){
			if(!hasText(params.theme_cd)){
				common_alert("테마코드가 존재하지 않습니다");
			}else{
				var obj = new sop.portal.bizMap.api();
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
		 * @name           : info
		 * @description    : 종합현황
		 * @date           : 2020.07.20
		 * @author	       : 한광희
		 * @history 	   :
		 * @param type     : 시도 시군구 구분
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		info : function(type,params,callback){
			if(type=="sido"||type=="sgg"){
				if(!hasText(params[type+"_cd"])){
					common_alert(" 행정동 코드를 확인해주세요");
				}else{
					var obj = new sop.portal.bizMap.api();
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
				common_alert("잘못된 접근입니다");
			}
		},
		/**
		 * @name           : rank
		 * @description    : 순위 정보
		 * @date           : 2020.07.20
		 * @author	       : 한광희
		 * @history 	   :
		 * @param type     : 시도 시군구 구분
		 * @param params   : 파라미터
		 * @param callback : callback
		 */
		rank : function(type,params,callback){
			if(type=="sido"||type=="sgg"){
				if(!hasText(params[type+"_cd"])){
					common_alert(" 행정동 코드를 확인해주세요");
				}else{
					var obj = new sop.portal.bizMap.api();
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
				common_alert("잘못된 접근입니다");
			}
		}
	};
	$bizMap.options = null; 
	/*********** 콜백함수 시작 **********/
	(function() {
		$class("sop.portal.bizMap.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if(res.errCd == "0"){
					if(typeof options.callback==="function"){
						options.callback(res);
					}
				}else if(res.errCd == "-401") {
					accessTokenInfo(function(){
						if(typeof $bizMap.api[options.func]==="function"){
							$bizMap.api[options.func](options.params,options.callback);
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