(function (W, D) {
	W.mapNavigation = W.mapNavigation || {};
	mapNavigation = {
		UI : function (map) {
			var that = this;
			/*var allSido = $("<button/>",{"type":"button","class":"option__btn","aria-checked":"true","data-value":"00","data-x":"990480.875","data-y":"1815839.375","text":"전국"}).click(function(){
				$(this).parent().find("button").attr("aria-checked",false); */
			var allSido = $("<option/>",{"class":"option__btn","aria-checked":"true","data-value":"00","data-x":"990480.875","data-y":"1815839.375","text":"전국"}).click(function(){
				$(this).parent().find("option").attr("aria-checked",false);
				$(this).attr("aria-checked",true);
				that.isUseLoading = true;
				that.setSgg($(this).data("value"),"");
			});
//			var allSgg = $("<button/>",{"type":"button","class":"option__btn","aria-checked":"true","data-value":"999","data-x":"990480.875","data-y":"1815839.375","text":"전체"});
			var allSgg = $("<option/>",{"class":"option__btn","aria-checked":"true","data-value":"999","data-x":"990480.875","data-y":"1815839.375","text":"전체"});
			var navigatorId = null;//네비게이터 html tag id
			this.maxLocation = null;//sido,sgg
			this.minLocation = null;//sido,sgg
			this.isCountry = true;//전국 추가 유무
			this.isUseLoading = true;//로딩 보여줄지 유무
			/**
			 * @name            : initialize
			 * @description     : 초기화
			 * @date            : 2016. 03. 23. 
			 * @author          : 나광흠
			 * @history         :
			 * @param callback  : callback
			 */
			this.initialize = function(callback){
				if(this.navigatorId){
					$("#"+that.navigatorId+"sido,#"+that.navigatorId+"sgg").empty();
					this.setSido("","",callback);
				}else{
					console.error("네비게이션 아이디를 작성하세요");
				}
			};
			/**
			 * @name            : getAdmCd
			 * @description     : 행정동 코드 얻기
			 * @date            : 2016. 03. 23. 
			 * @author          : 나광흠
			 * @history         :
			 */
			this.getAdmCd = function(){
			/*	let sgg = $("#"+that.navigatorId+"sgg").find("button[aria-checked=true]").data("value");
				return getAdmCd($("#"+that.navigatorId+"sido").find("button[aria-checked=true]").data("value").toString(),sgg?sgg.toString():"");
			*/
				let sgg = $("#"+that.navigatorId+"sgg").find("option:selected").data("value");
				return getAdmCd($("#"+that.navigatorId+"sido").find("option:selected").data("value").toString(),sgg?sgg.toString():"");
			};
			/**
			 * @name            : getAdmCd
			 * @description     : 행정동 코드 얻기
			 * @date            : 2016. 03. 23. 
			 * @author          : 나광흠
			 * @history         :
			 * @param sido_cd   : 시도 코드
			 * @param sgg_cd    : 시군구 코드
			 */
			function getAdmCd(sido_cd,sgg_cd){
				if(hasText(sido_cd)&&sido_cd!="00"){
					if(hasText(sgg_cd)&&sgg_cd!="999"){
						return sido_cd+sgg_cd;
					}else{
						return sido_cd;
					}
				}else{
					return "00";
				}
			}
			/**
			 * @name            : setSido
			 * @description     : 시도 네비게이터 셋팅
			 * @date            : 2016. 03. 23. 
			 * @author          : 나광흠
			 * @history         :
			 * @param sido_cd   : 시도 코드
			 * @param sgg_cd    : 시군구 코드
			 * @param callback  : callback
			 */
			this.setSido = function(sido_cd,sgg_cd,callback){
				var abs = new sop.portal.absAPI();
				if(that.isUseLoading!==false){
					common_loading(true);
				}
				that.stage("","0",function(res){
					let sort = ["11","24","22","25","21","26","23","32","31","38","37","36","35","34","33","29","39"];
					$("#"+that.navigatorId+"sido").prop("disabled",true).empty();
					if(that.isCountry===true){
						$("#"+that.navigatorId+"sido").append(allSido);
					}
					$("#"+that.navigatorId+"sgg").prop("disabled",true).empty().append(allSgg.attr({"aria-checked":"true"}).click(function(){
						//$(this).parent().find("button").attr("aria-checked",false);
						$(this).parent().find("option:selected").attr("aria-checked",false);
						$(this).attr("aria-checked",true);
					}));
					$.each(res.result,function(cnt,node){
						let index = sort.indexOf(node.cd);
						sort[index] = node;
					});

					$.each(sort,function(cnt,node){
						// 주소 세팅하는 부분 
						//$("#"+that.navigatorId+"sido").append($("<button/>",{
						$("#"+that.navigatorId+"sido").append($("<option/>",{
							"type":"button",
							"class":"option__btn",
							"data-value":node.cd,
							"data-x":node.x_coor,
							"data-y":node.y_coor,
							"text":node.addr_name,
							"aria-checked":node.cd==sido_cd
						}).click(function(){
							//$(this).parent().find("button").attr("aria-checked",false);
							$(this).parent().find("option:selected").attr("aria-checked",false);
							$(this).attr("aria-checked",true);
							that.isUseLoading = true;
							that.setSgg($(this).data("value"),"",callback);
						}));
						$("#"+that.navigatorId+"sido").prop("disabled",false);
					});
					if(sido_cd){
						if(sido_cd!="00"){
							that.setSgg(sido_cd,sgg_cd,callback);
						}else{
							if(typeof callback === "function"){
								callback();
							}
						}
					}else{
						if(typeof callback === "function"){
							callback();
						}
					}
				});
			};
			/**
			 * @name            : setSgg
			 * @description     : 시군구 네비게이터 셋팅
			 * @date            : 2016. 03. 23. 
			 * @author          : 나광흠
			 * @history         :
			 * @param sido_cd   : 시도 코드
			 * @param sgg_cd    : 시군구 코드
			 * @param callback  : callback
			 */
			this.setSgg = function(sido_cd,sgg_cd,callback){
				if(that.isUseLoading!==false){
					common_loading(true);
				}
				
				if(this.maxLocation&&this.maxLocation=="sido"){
					if(typeof callback === "function"){
						callback();
					}
					return false;
				}
				if(hasText(sido_cd)&&sido_cd!="00"){
					allSido.removeAttr("aria-checked");
					//$("#"+that.navigatorId+"sido button[data-value="+sido_cd+"]").attr("aria-checked",true);
					$("#"+that.navigatorId+"sido option:selected[data-value="+sido_cd+"]").attr("aria-checked",true);
					
					
					$.ajax({
						type: "POST",
						url: contextPath+"/m2021/map/totSurv/getSggList.json",
						data:{
							year:map.bnd_year,
							sido_cd:sido_cd
						},
						dataType: "json",
						async : true,
						success: function(res) {
							$("#"+that.navigatorId+"sgg").prop("disabled",false).empty().append(allSgg.attr({"aria-checked":"true"}).click(function(){
								//$(this).parent().find("button").attr("aria-checked",false);
								$(this).parent().find("option:selected").attr("aria-checked",false);
								$(this).attr("aria-checked",true);
							}));
							let hasCheck = false
							$.each(res.result,function(cnt,node){
								if(hasCheck===false){
									hasCheck = node.sgg_cd==sgg_cd;
								}
								//$("#"+that.navigatorId+"sgg").append($("<button/>",{
								$("#"+that.navigatorId+"sgg").append($("<option/>",{
									"type":"button",
									"class":"option__btn",
									"data-value":node.sgg_cd,
									"data-x":node.x_coor,
									"data-y":node.y_coor,
									"text":node.sgg_nm,
									"aria-checked":node.sgg_cd==sgg_cd
								}).click(function(){
									//$(this).parent().find("button").attr("aria-checked",false);
									$(this).parent().find("option:selected").attr("aria-checked",false);
									$(this).attr("aria-checked",true);
								}));
							});
							if(hasCheck){
								allSgg.removeAttr("aria-checked");
							}
							if(sido_cd&&sido_cd!="00"){
								$("#"+that.navigatorId+"sgg").prop("disabled",false);
							}
							common_loading(false);
						},
						error: function(err) {
							common_loading(false);
						}
					});
				}else{
					/** 2020-09-24 [곽제욱] 관심지역이동 지역 전국 선택시 시군구, 읍면동 초기화 추가 START */
					$("#"+that.navigatorId+"sgg").html();
					$("#"+that.navigatorId+"sgg").prop("disabled",false).empty().append(allSgg.attr({"aria-checked":"true"}).click(function(){
						//$(this).parent().find("button").attr("aria-checked",false);
						$(this).parent().find("option:selected").attr("aria-checked",false);
						$(this).attr("aria-checked",true);
					}));
					common_loading(false);
					/** 2020-09-24 [곽제욱] 관심지역이동 지역 전국 선택시 시군구, 읍면동 초기화 추가 END */
				}
			};
			/**
			 * @name           : stage
			 * @description    : 단계별 주소 조회
			 * @date           : 2016. 03. 23. 
			 * @author         : 나광흠
			 * @history        :
			 * @param adm_cd   : 행정동 코드
			 * @param pg_yn    : 경계 포함 여부(0:미포함,1:포함)
			 * @param callback : callback
			 */
			this.stage = function (adm_cd,pg_yn,callback) {
				var obj = new sop.openApi.stage.api();
				obj.noLoading = true;
				obj.addParam("accessToken", accessToken);
				if(adm_cd&&adm_cd!="00"){
					obj.addParam("cd", adm_cd);
				}
				obj.addParam("pg_yn", pg_yn);
				obj.request({
					method : "GET",
					async : false,
					url : openApiPath + "/OpenAPI3/addr/stage.json",
					options : {
						target : this,
						adm_cd : adm_cd,
						pg_yn : pg_yn,
						callback : callback
					}
				});
			};
		}
	};
	
	/*********** OpenAPI 단계별 주소 조회 Start **********/
	(function () {
		$class("sop.openApi.stage.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var map = options.target;
				if(res.errCd == "-401") {
					accessTokenInfo(function(){
						options.target.stage(options.adm_cd,options.pg_yn,options.callback);
					});
				}else{
					if(typeof options.callback==="function"){
						options.callback(res);
					}
				}
			},
			onFail : function (status) {
				common_alert(errorMessage);		// 2020.09.28[한광희] 팝업 수정
			}
		});
	}());
	/*********** OpenAPI 단계별 주소 조회. End **********/
}(window, document));