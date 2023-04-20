(function (W, D) {
	W.mapNavigation = W.mapNavigation || {};
	mapNavigation = {
		UI : function (map) {
			var that = this;
			var allSido = $("<option/>",{"value":"00","data-x":"990480.875","data-y":"1815839.375","text":"전국"});
			var allSgg = $("<option/>",{"value":"999","data-x":"990480.875","data-y":"1815839.375","text":"전체"});
			var allEmdong = $("<option/>",{"value":"00","data-x":"990480.875","data-y":"1815839.375","text":"전체"});
			var navigatorId = null;//네비게이터 html tag id
			this.maxLocation = null;//sido,sgg,emdong
			this.minLocation = null;//sido,sgg,emdong
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
					$("#"+that.navigatorId+"sido,#"+that.navigatorId+"sgg,#"+that.navigatorId+"emdong").empty().off("change");
					this.setSido("","","",callback);
					$("#"+that.navigatorId+"sido").on("change",function(event,callback){
						that.isUseLoading = true;
						that.setSgg($(this).val(),"","",callback);
						
						//우리동네 생활업종에서 생활업종 현황보기일경우 전체 제거함
						if(typeof($biz) != 'undefined'){
							if($biz.ui.selectAreaGb == "A"){
								if($("#"+that.navigatorId+"sgg option:first").val()=="999"){
									setTimeout(function(){
										$("#"+that.navigatorId+"sgg option:first").remove();
									},100);
								}
							}
						}
						
					});
					$("#"+that.navigatorId+"sgg").on("change",function(event,callback){
						that.isUseLoading = true;
						that.setEmdong($("#"+that.navigatorId+"sido").val(),$(this).val(),"",callback);
					});
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
				return getAdmCd($("#"+that.navigatorId+"sido").val(),$("#"+that.navigatorId+"sgg").val(),$("#"+that.navigatorId+"emdong").val());
			};
			/**
			 * @name            : getCoor
			 * @description     : 네비게이터에 셋팅된 좌표 얻기
			 * @date            : 2017. 02. 08. 
			 * @author          : 나광흠
			 * @history         :
			 */
			this.getCoor = function(){
				if(hasText($("#"+that.navigatorId+"sido").val())&&$("#"+that.navigatorId+"sido").val()!="00"){
					if(hasText($("#"+that.navigatorId+"sgg").val())&&$("#"+that.navigatorId+"sgg").val()!="999"){
						if(hasText($("#"+that.navigatorId+"emdong").val())&&$("#"+that.navigatorId+"emdong").val()!="00"){
							return [$("#"+that.navigatorId+"emdong option:selected").data("x"),$("#"+that.navigatorId+"emdong option:selected").data("y")];
						}else{
							return [$("#"+that.navigatorId+"sgg option:selected").data("x"),$("#"+that.navigatorId+"sgg option:selected").data("y")];
						}
					}else{
						return [$("#"+that.navigatorId+"sido option:selected").data("x"),$("#"+that.navigatorId+"sido option:selected").data("y")];
					}
				}else{
					return [$("#"+that.navigatorId+"sido option:selected").data("x"),$("#"+that.navigatorId+"sido option:selected").data("y")];
				}
			};
			/**
			 * @name            : getAdmCd
			 * @description     : 행정동 코드 얻기
			 * @date            : 2016. 03. 23. 
			 * @author          : 나광흠
			 * @history         :
			 * @param sido_cd   : 시도 코드
			 * @param sgg_cd    : 시군구 코드
			 * @param emdong_cd : 읍면동 코드
			 */
			function getAdmCd(sido_cd,sgg_cd,emdong_cd){
				if(hasText(sido_cd)&&sido_cd!="00"){
					if(hasText(sgg_cd)&&sgg_cd!="999"){
						if(hasText(emdong_cd)&&emdong_cd!="00"){
							return sido_cd+sgg_cd+emdong_cd;
						}else{
							return sido_cd+sgg_cd;
						}
					}else{
						return sido_cd;
					}
				}else{
					return "";
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
			 * @param emdong_cd : 읍면동 코드
			 * @param callback  : callback
			 */
			this.setSido = function(sido_cd,sgg_cd,emdong_cd,callback){
				var abs = new sop.portal.absAPI();
				if(that.isUseLoading!==false){
					abs.onBlockUIPopup();
				}
				that.stage("","0",function(res){
					$("#"+that.navigatorId+"sido").prop("disabled",true).empty()
					if(that.isCountry===true){
						$("#"+that.navigatorId+"sido").append(allSido);
						
					}
					$("#"+that.navigatorId+"sgg").prop("disabled",true).empty().append(allSgg);
				
					//우리동네 생활업종에서 생활업종 현황보기일경우 전체 제거함
					if(typeof($biz) != 'undefined'){
						if($biz.ui.selectAreaGb == "A"){
							if($("#"+that.navigatorId+"sgg option:first").val()=="999"){
								setTimeout(function(){
									$("#"+that.navigatorId+"sgg option:first").remove();
								},100);
							}
						}
					}

					$("#"+that.navigatorId+"emdong").prop("disabled",true).empty().append(allEmdong);
					$.each(res.result,function(cnt,node){
						// 주소 세팅하는 부분 
						
						$("#"+that.navigatorId+"sido").append($("<option/>",{
							"value":node.cd,
							"data-x":node.x_coor,
							"data-y":node.y_coor,
							"text":node.addr_name,
							"selected":node.cd==sido_cd
						}));
						$("#"+that.navigatorId+"sido").prop("disabled",false);
					});
					if(sido_cd){
						if(sido_cd!="00"){
							that.setSgg(sido_cd,sgg_cd,emdong_cd,callback);
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
					abs.onBlockUIClose();
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
			 * @param emdong_cd : 읍면동 코드
			 * @param callback  : callback
			 */
			this.setSgg = function(sido_cd,sgg_cd,emdong_cd,callback){
				var abs = new sop.portal.absAPI();
				if(that.isUseLoading!==false){
					abs.onBlockUIPopup();
				}
				
				if(this.maxLocation&&this.maxLocation=="sido"){
					abs.onBlockUIClose();
					if(typeof callback === "function"){
						callback();
					}
					return false;
				}
				if(hasText(sido_cd)&&sido_cd!="00"){
					that.stage(getAdmCd(sido_cd),"0",function(res){
						// 2020-09-02 [곽제욱] 관심지역이 중복으로 발생하는 오류 수정 start
						$("#"+that.navigatorId+"sgg").html();
						$("#"+that.navigatorId+"sgg").prop("disabled",false).empty().append(allSgg);
						$("#"+that.navigatorId+"emdong").prop("disabled",false).empty().append(allEmdong);
						// 2020-09-02 [곽제욱] 관심지역이 중복으로 발생하는 오류 수정 end
						$.each(res.result,function(cnt,node){
							$("#"+that.navigatorId+"sgg").append($("<option/>",{
								"value":node.cd.substring(2,5),
								"data-x":node.x_coor,
								"data-y":node.y_coor,
								"text":node.addr_name,
								"selected":node.cd.substring(2,5)==sgg_cd
							}));
						});
						if(sido_cd&&sido_cd!="00"){
							$("#"+that.navigatorId+"sgg").prop("disabled",false);
						}
						that.setEmdong(sido_cd,sgg_cd,emdong_cd,callback);
						abs.onBlockUIClose();
					});
				}else{
					/** 2020-09-24 [곽제욱] 관심지역이동 지역 전국 선택시 시군구, 읍면동 초기화 추가 START */
					$("#"+that.navigatorId+"sgg").html();
					$("#"+that.navigatorId+"emdong").html();
					$("#"+that.navigatorId+"sgg").prop("disabled",false).empty().append(allSgg);
					$("#"+that.navigatorId+"emdong").prop("disabled",false).empty().append(allEmdong);
					/** 2020-09-24 [곽제욱] 관심지역이동 지역 전국 선택시 시군구, 읍면동 초기화 추가 END */
					abs.onBlockUIClose();
				}
			};
			/**
			 * @name            : setEmdong
			 * @description     : 읍면동 네비게이터 셋팅
			 * @date            : 2016. 03. 23. 
			 * @author          : 나광흠
			 * @history         :
			 * @param sido_cd   : 시도 코드
			 * @param sgg_cd    : 시군구 코드
			 * @param emdong_cd : 읍면동 코드
			 * @param callback  : callback
			 */
			this.setEmdong = function(sido_cd,sgg_cd,emdong_cd,callback){
				var abs = new sop.portal.absAPI();
				if(that.isUseLoading!==false){
					abs.onBlockUIPopup();
				}
				if(this.maxLocation&&this.maxLocation=="sido"&&this.maxLocation=="sgg"){
					abs.onBlockUIClose();
					if(typeof callback === "function"){
						callback();
					}
					return false;
				}
				if(hasText(sido_cd)&&sido_cd!="00"&&hasText(sgg_cd)&&sgg_cd!="999"){
					that.stage(getAdmCd(sido_cd,sgg_cd),"0",function(res){
						// 2020-09-02 [곽제욱] 관심지역이 중복으로 발생하는 오류 수정 start
						$("#"+that.navigatorId+"emdong").html();
						$("#"+that.navigatorId+"emdong").prop("disabled",false).empty().append(allEmdong);
						// 2020-09-02 [곽제욱] 관심지역이 중복으로 발생하는 오류 수정 end
						$.each(res.result,function(cnt,node){
							$("#"+that.navigatorId+"emdong").append($("<option/>",{
								//2022-12-06 읍면동 코드 개편으로 읍면동 자릿수가 3자리로 늘어남에 따른 수정
								//"value":node.cd.substring(5,7),
								"value":node.cd.substring(5,8),
								"data-x":node.x_coor,
								"data-y":node.y_coor,
								"text":node.addr_name,
								//"selected":node.cd.substring(5,7)==emdong_cd
								"selected":node.cd.substring(5,8)==emdong_cd
							}));
						});
						if(sgg_cd&&sgg_cd!="999"){
							$("#"+that.navigatorId+"emdong").prop("disabled",false);
						}
						if(typeof callback === "function"){
							callback();
						}
						abs.onBlockUIClose();
					});
				}else{
					/** 2020-09-24 [곽제욱] 관심지역이동 시군구에서 전체 선택시 읍면동 초기화 추가 START */
					$("#"+that.navigatorId+"emdong").html();
					$("#"+that.navigatorId+"emdong").prop("disabled",false).empty().append(allEmdong);
					/** 2020-09-24 [곽제욱] 관심지역이동 시군구에서 전체 선택시 읍면동 초기화 추가 END */
					abs.onBlockUIClose();
				}
			};
			/**
			 * @name           : move
			 * @description    : 지도 이동
			 * @date           : 2016. 03. 23. 
			 * @author         : 나광흠
			 * @history        :
			 * @param callback : callback
			 * @param abs      : sop.portal.absAPI 객체를 넘기면 만약 최소 레벨에서 경고창 보여줄 시 로딩 이미지 삭제 
			 */
			this.move = function(callback,abs){
				var element;
				var hasSido = $("#"+that.navigatorId+"sido").val()!="00";
				var hasSgg = $("#"+that.navigatorId+"sgg").val()!="999";
				var hasEmdong = $("#"+that.navigatorId+"emdong").val()!="00";
				var zoom = map.getZoomToCd($("#"+that.navigatorId+"sido").val()+$("#"+that.navigatorId+"sgg").val()+$("#"+that.navigatorId+"emdong").val());
				this.zoom = zoom;
				
				if($("#"+that.navigatorId+"emdong").val()!="00"&&!$("#"+that.navigatorId+"emdong").prop("disabled")){
					element = $("#"+that.navigatorId+"emdong option:selected");
				}else if($("#"+that.navigatorId+"sgg").val()!="999"&&!$("#"+that.navigatorId+"sgg").prop("disabled")){
					element = $("#"+that.navigatorId+"sgg option:selected");
				}else{
					element = $("#"+that.navigatorId+"sido option:selected");
				}
				if(this.minLocation){
					if(abs&&typeof abs ==="object"&&typeof abs.onBlockUIClose==="function"&&abs.blockUI){
						typeof abs.onBlockUIClose();
					}
					if(this.minLocation=="sido"&&!hasSido){
						common_alert("시도를 선택해주세요");	// 2020.09.28[한광희] 팝업 수정
						return;
					}else if(this.minLocation=="sgg"&&!hasSgg){
						common_alert("시군구를 선택해주세요");		// 2020.09.28[한광희] 팝업 수정
						return;
					}else if(this.minLocation=="emdong"&&!hasEmdong){
						common_alert("읍면동을 선택해주세요");		// 2020.09.28[한광희] 팝업 수정
						return;
					}
				}
				map.mapMove([element.data("x"),element.data("y")],zoom,false,callback);
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