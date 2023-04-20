(function(W, D) {
	W.$policyStaticMapLeftmenu = W.$policyStaticMapLeftmenu || {};
	var poi_nm;
	W.popupMapLoad = function(){
		$("#view3-map")[0].contentWindow.$("body").addClass("static-iframe");
		$("#view3-map")[0].contentWindow.$("#policy-info-title").text($policyStaticMapLeftmenu.ui.policy_info.result.info.title);
		$("#view3-map")[0].contentWindow.$("#policy-title-update").val($policyStaticMapLeftmenu.ui.policy_info.result.info.title);
		if($policyStaticMapLeftmenu.ui.policy_info.result.info.is_writer=="N"){
			$("#view3-map")[0].contentWindow.$("#btn-update").remove();
			$("#view3-map")[0].contentWindow.$("#btn-delete").remove();
		}
		if($policyStaticMapLeftmenu.ui.policy_info.result.info.is_writer=="Y"){
			$("#view3-map")[0].contentWindow.$("#btn-update").click(function(){
				$("#view3-map")[0].contentWindow.$("#policy-show").hide();
				$("#view3-map")[0].contentWindow.$("#policy-update").show();
				$("#view3-map")[0].contentWindow.$policyWriteMapCombine.ui.communityList("community-list-update",1,null);
				$.each($policyStaticMapLeftmenu.ui.policy_info.result.info.community,function(){
					$("#view3-map")[0].contentWindow.$("#community-"+this.cmmnty_map_id).prop("checked", true).trigger("change");
				});
				$("#view3-map")[0].contentWindow.$("#policy-title-update").trigger("keypress");
				$("#view3-map")[0].contentWindow.$("#policy-content-update").trigger("keypress");
				$("#view3-map")[0].contentWindow.$("#policy-url-update").trigger("keypress");
			});
			$("#view3-map")[0].contentWindow.$("#btn-submit-update").click(function(){
				var text = "";
				$.each($("#view3-map")[0].contentWindow.$("#community-list-update input"),function(){
					if($(this).is(":checked")){
						text+=$(this).val()+",";
					}
				});
				var obj = new sop.portal.policy.update.api();
		    	obj.addParam("policy_stat_map_serial",$policyStaticMapLeftmenu.ui.policy_info.result.info.policy_stat_map_serial);
		    	obj.addParam("title",encodeURIComponent($("#view3-map")[0].contentWindow.$("#policy-title-update").val()));
		    	obj.addParam("exp",encodeURIComponent($("#view3-map")[0].contentWindow.$("#policy-content-update").val()));
		    	obj.addParam("url",encodeURIComponent($("#view3-map")[0].contentWindow.$("#policy-url-update").val()));
		    	if(text!=""){
		    		obj.addParam("cmmnty_map_id",text);
		    	}
				obj.request({
					method : "POST",				
					async : true,
					url : contextPath+"/ServiceAPI/policyWrite/update.json"
				});
			});
			$("#view3-map")[0].contentWindow.$("#btn-cancel-update").click(function(){
				$("#view3-map")[0].contentWindow.$("#policy-show").show();
				$("#view3-map")[0].contentWindow.$("#policy-update").hide();
			});
			$("#view3-map")[0].contentWindow.$("#btn-delete").click(function(){
				messageConfirm.open(
		    			 "알림", 
		    			 "삭제 하시겠습니까.",
		    			 btns = [
							{
							    title : "네 ",
							    fAgm : null,
							    disable : false,
							    func : function(opt) {
							    	var obj = new sop.portal.policy.del.api();
							    	obj.addParam("policy_stat_map_serial",$policyStaticMapLeftmenu.ui.policy_info.result.info.policy_stat_map_serial);
									obj.request({
										method : "POST",				
										async : true,
										url : contextPath+"/ServiceAPI/policyWrite/delete.json"
									});
							    }
							 },
							 
		    			     {
							   title : "아니오",
							   fAgm : null,
							   disable : false,
							   func : function(opt) {}
		    			     }   
		    			 ]
		    	);
			});
		}
		if($policyStaticMapLeftmenu.ui.policy_info.result.info.exp){
			var tagsToReplace = {'"': '&quot;','&': '&amp;','<': '&lt;','>': '&gt;',"'": '&#039;'};
			function replaceTag(tag) {
				var s = tagsToReplace[tag] || tag;
				return s;
			}
			$("#view3-map")[0].contentWindow.$("#policy-info-content").html($policyStaticMapLeftmenu.ui.policy_info.result.info.exp.replace(/[&<>\"\'\{\}]/g, replaceTag).replace(/\n/g, "<br/>"));
			$("#view3-map")[0].contentWindow.$("#policy-content-update").html($policyStaticMapLeftmenu.ui.policy_info.result.info.exp);
		}else{
			$("#view3-map")[0].contentWindow.$("#policy-info-content").remove();
			$("#view3-map")[0].contentWindow.$("label[for=policy-info-content]").parent("h4").remove();
		}
		if($policyStaticMapLeftmenu.ui.policy_info.result.info.url){
			var prependUrl = /^http(s?):\/\//.test($policyStaticMapLeftmenu.ui.policy_info.result.info.url)?"":"http://";
			$("#view3-map")[0].contentWindow.$("#policy-info-url").empty().append("<a href='"+prependUrl+$policyStaticMapLeftmenu.ui.policy_info.result.info.url+"' target='_blank'>"+$policyStaticMapLeftmenu.ui.policy_info.result.info.url+"</a>");
			$("#view3-map")[0].contentWindow.$("#policy-url-update").empty().val($policyStaticMapLeftmenu.ui.policy_info.result.info.url);
		}else{
			$("#view3-map")[0].contentWindow.$("#policy-info-url").remove();
			$("#view3-map")[0].contentWindow.$("label[for=policy-info-url]").parent("h4").remove();
		}
		if($policyStaticMapLeftmenu.ui.policy_info.result.info.community){
			if($policyStaticMapLeftmenu.ui.policy_info.result.info.community.length>0){
				$("#view3-map")[0].contentWindow.$("#policy-info-community-list").empty();
				$.each($policyStaticMapLeftmenu.ui.policy_info.result.info.community,function(){
					$("#view3-map")[0].contentWindow.$("#policy-info-community-list").append(
						"<li>"+
							"<label style='background:none;'>"+
								"<a href='"+location.origin+contextPath+"/view/community/view?cmmnty_map_id="+this.cmmnty_map_id+"' target='_blank'>"+this.cmmnty_map_nm+"</a>"+
							"</label>"+
						"</li>"
					);
				});
			}else{
				$("#view3-map")[0].contentWindow.$("label[for=policy-info-community-list]").parent("h4").remove();
				$("#view3-map")[0].contentWindow.$("#policy-info-community-list").remove();
			}
		}else{
			$("#view3-map")[0].contentWindow.$("label[for=policy-info-community-list]").parent("h4").remove();
			$("#view3-map")[0].contentWindow.$("#policy-info-community-list").remove();
		}
		
		var curDropParams = [],titleArray = [];
		function createParam(type){
			var api_info = $policyStaticMapLeftmenu.ui.policy_info.result.api_info[type];
			var info = $policyStaticMapLeftmenu.ui.policy_info.result.info;
			var params = api_info.params;
			if(api_info.api_id=="kosis"){
				params.push({"key":"adm_cd","value":info.region_cd});
				params.push({"key":"adm_nm","value":info.region_nm});
			}
			return {
				adm_cd : info.region_cd,
				adm_nm : info.region_nm,
				param : params,
				title : api_info.disp_nm,
				unit : api_info.disp_unit,
				filter : api_info.disp_value,
				api_id : api_info.api_id,
				map : $policyStaticMap.ui.mapList[type=="01"?0:1]
			}; 
		}
		function createTitle(id,type){
			var api_info = $policyStaticMapLeftmenu.ui.policy_info.result.api_info[type];
			var info = $policyStaticMapLeftmenu.ui.policy_info.result.info;
			return {
				id : id,
				curDropParams : curDropParams[id],
				mapType: (api_info.api_id=="kosis"?"kosis":"normal"),
				title : (api_info.api_id=="kosis"?"KOSIS 지역통계":api_info.disp_nm),
				unit : api_info.disp_unit,
				gis_se : (info.region_cd==null||info.region_cd==undefined||info.region_cd=="00"?1:2)
			};
		}
		curDropParams.push(createParam("01"));
		titleArray.push(createTitle(0,"01"));
		if($policyStaticMapLeftmenu.ui.policy_info.result.info.div_cd=="02"){
			curDropParams.push(createParam("02"));
			titleArray.push(createTitle(1,"02"));
		}else{
			titleArray.push({id:1,title:$policyStaticMapLeftmenu.ui.policy_info.result.api_info["02"].disp_nm});
		}
		$("#view3-map")[0].contentWindow.$("#btn-write").remove();
		var popup = $("#view3-map")[0].contentWindow.$policyWriteMapCombine.ui;
		popup.setCombineData(
			$policyStaticMapLeftmenu.ui.policy_info.result.info.div_cd=="01"?"dataPoi":"dataData",//dataPoi : 버퍼 , dataData : 연산 
			curDropParams,
			$psmCombine.ui.combineDataSet,
			$policyStaticMapLeftmenu.ui.policy_info.result.info.nomfrm,//연산
			$psmCombine.ui.cdgLayer, 
			$psmCombine.ui.mapList, 
			$psmCombine.ui.cpoiMarkerList, 
			$policyStaticMapLeftmenu.ui.policy_info.result.info.srv_distance,
			titleArray
		);
		$("#view3-map")[0].contentWindow.$("#0").show().trigger("click");
	}
	
	$(document).ready(function() {
		$policyStaticMapLeftmenu.event.setUIEvent();
	});
	
	$policyStaticMapLeftmenu.ui = {
		policy_info : null,//DB에서 불러온 정책정보
		defaultSidoCd : "11",//기본 시도 코드 : 11:서울특별시
		defaultSggCd : null,//기본 시군구 코드
		arrParamList : new Array(), // 조회된 파라미터 정보배열     //2017.09.06 [개발팀] 조회기능추가
		dataList : [],
		//2019-05-03 [김남민] 커피전문점 선택 후 좌측 메뉴 자동으로 닫혔을 경우 다시 통계메뉴를 클릭하면 세부지표 선택 메뉴가 호출되어야 함. (05-07 추가수정) START
		ctgr_id : "",
		//2019-05-03 [김남민] 커피전문점 선택 후 좌측 메뉴 자동으로 닫혔을 경우 다시 통계메뉴를 클릭하면 세부지표 선택 메뉴가 호출되어야 함. (05-07 추가수정) END
		//2019-04-22 [김남민] 정책통계지도 > 9차(8차), 10차 분리 적용. START
		idx_id : "",
		//2019-04-22 [김남민] 정책통계지도 > 9차(8차), 10차 분리 적용. END
		//2019-04-23 [김남민] 정책통계지도 > 좌측을 Tobe 우측을 Asis로 변경. START
		selectFirstYn : "N",
		//2019-04-23 [김남민] 정책통계지도 > 좌측을 Tobe 우측을 Asis로 변경. END
		//2019-05-03 [김남민] 융합결과보기 선택 시 우측 출처에 저장되었던 년도가 중복적으로 표시 됨. START
		year_9016_yn : "N",
		//2019-05-03 [김남민] 융합결과보기 선택 시 우측 출처에 저장되었던 년도가 중복적으로 표시 됨. END
		
		/**
		 * @name         : getSidoList
		 * @description  : 지역선택 - 시도 선택시 시군구 목록 조회
		 * @date         : 2016. 11. 28. 
		 * @author	     : 송종대
		 * @history 	 :
		 * @param type
		 * @param defaultSido
		 * @param defaultSgg
		 * @param callback
		 */
		getSidoList: function(type,defaultSido,defaultSgg,callback) {
			$("#"+type+"-sido-select,#"+type+"-sgg-select").prop("disabled",true);
			$.ajax({
				method: "POST",
				async: true,
				url: contextPath + "/ServiceAPI/map/sidoAddressList.json",
				data: {
					base_year: $policyStaticMap.ui.mapList[0].bnd_year
				},
				dataType: "json",
				success: function(res) {
					$("#"+type+"-sido-select").empty();
					if(res.errCd=="0"){
						$.each(res.result.sidoList,function(cnt,node){
							if(defaultSido==node.sido_cd){
								$policyStaticMapLeftmenu.ui.getSggList(type, node.sido_cd, defaultSgg);
							}
							$("#"+type+"-sido-select").append($("<option/>",{text:node.sido_nm,value:node.sido_cd,selected:(defaultSido==node.sido_cd),"data-coor-x":node.x_coor,"data-coor-y":node.y_coor}));
						});
						//2018-12-19 LNB화면 최소화시에도 대상지역 선택 표출 필요
						if($("#"+type+"-sido-select-2").length > 0) {
							$("#"+type+"-sido-select-2").html($("#"+type+"-sido-select").html());
						}
					}
					
					$("#"+type+"-sido-select,#"+type+"-sgg-select").prop("disabled",false);
					//2018-12-19 LNB화면 최소화시에도 대상지역 선택 표출 필요
					if($("#"+type+"-sido-select-2").length > 0) $("#"+type+"-sido-select-2").prop("disabled",false);
					if($("#"+type+"-sgg-select-2").length > 0) $("#"+type+"-sgg-select-2").prop("disabled",false);
					if(typeof callback === "function"){
						callback();
					}
				},
				error: function(e) {
					$("#"+type+"-sido-select,#"+type+"-sgg-select").prop("disabled",false);
					//2018-12-19 LNB화면 최소화시에도 대상지역 선택 표출 필요
					if($("#"+type+"-sido-select-2").length > 0) $("#"+type+"-sido-select-2").prop("disabled",false);
					if($("#"+type+"-sgg-select-2").length > 0) $("#"+type+"-sgg-select-2").prop("disabled",false);
				}
			});
		},
		
		/**
		 * @name             : $houseAnalysisMap.leftmenu.getSggList
		 * @description      : 시군구리스트
		 * @date             : 2015. 12. 09. 
		 * @author           : 나광흠
		 * @history          :
		 * @param type       : 'current' 주거현황보기 'inter-recommend' 추천지역찾기의 관심지역 
		 * @param sido_cd    : 시도 코드
		 * @param defaultSgg : 처음 셋팅해줄 시군구 코드
		 * @param callback   : callback
		 */
		getSggList: function(type,sido_cd,defaultSgg,callback) {
			$("#"+type+"-sgg-select").prop("disabled",true);
			$.ajax({
				method: "POST",
				async: true,
				url: contextPath + "/ServiceAPI/map/sggAddressList.json",
				data: {
					sido_cd: sido_cd,
					base_year: $policyStaticMap.ui.mapList[0].bnd_year
				},
				dataType: "json",
				success: function(res) {
					$("#"+type+"-sgg-select").empty();
					if(res.errCd=="0"){
						var coorX = $("#current-sido-select option:selected").data("coor-x");
						var coorY = $("#current-sido-select option:selected").data("coor-y");
						$("#"+type+"-sgg-select").append($("<option/>",{text:"전체",value:"999","data-coor-x":coorX,"data-coor-y":coorY, "data-adm_cd":sido_cd}));  // 2017-08-17 [개발팀] 전체일 때 data-adm_cd 값 추가
						$.each(res.result.sggList,function(cnt,node){
							//2017.05.29 [개발팀] 지자체 URL 추가 - 비자치구 코드 추가
							$("#"+type+"-sgg-select").append($("<option/>",{text:node.sgg_nm,value:node.sgg_cd,selected:(defaultSgg==node.sgg_cd),"data-coor-x":node.x_coor,"data-coor-y":node.y_coor,"data-adm_cd":sido_cd+node.sgg_cd}));
						});
						if("policy"==type || "current" == type){ //2017.05.29 [개발팀] 지역별 수요변화 비자치구추가
							if($psmCombine.ui.atdrcList[sido_cd]){
								$.each($psmCombine.ui.atdrcList[sido_cd],function(sidoCnt,sidoNode){
									var op,index,empty = true;
									$.each(this.sgg_list,function(cnt,node){
										op = $("#"+type+"-sgg-select option[value="+node+"]");
										if(op.length>0){
											empty = false;
											if(index==undefined){
												index = op.index();
											}else{
												index = Math.min(index,op.index());
											}
										}
									});
									if(!empty){
										//2017.05.29 [개발팀] 지자체 URL 추가 - 비자치구 코드 추가
										$("#"+type+"-sgg-select option:eq("+index+")").before($("<option/>",{text:sidoNode.sgg_nm,value:sidoNode.sgg_list.join(","),"data-coor-x":op.data("coor-x"),"data-coor-y":op.data("coor-y"), "data-adm_cd":sidoNode.adm_cd}));
									}
								});
							}
						}
						//2018-12-19 LNB화면 최소화시에도 대상지역 선택 표출 필요
						if($("#"+type+"-sgg-select-2").length > 0) {
							$("#"+type+"-sgg-select-2").html($("#"+type+"-sgg-select").html());
						}
						
						if( $policyStaticMap.ui.soc_yn ){ //생활SOC
							$("#CTGR_008").click();
							$policyStaticSocMap.ui.setParam();
						}
					}else if(res.errCd=="-401"){
						accessTokenInfo(function() {
							$policyStaticMapLeftmenu.ui.getSggList(type,sido_cd,defaultSgg);
						});
					}
					$("#"+type+"-sgg-select").prop("disabled",false);
					if(typeof callback === "function"){
						callback();
					}
					
				},
				error: function(e) {
					$("#"+type+"-sgg-select").prop("disabled",false);
				}
			});
		},

		/**
		 * @name              : getPolicyMapInfoByIdxId
		 * @description       : idx_id로 정책통계지도 조회 
		 * @date              : 2017. 09. 21. 
		 * @author            : 김보민
		 * @history           :
		 * @param id
		 * @param map_idx
		 */
		getPolicyMapInfoByIdxId : function(idx_id) {
			
			//2019-04-22 [김남민] 정책통계지도 > 9차(8차), 10차 분리 적용. START
			$policyStaticMapLeftmenu.ui.idx_id = idx_id;
			//2019-04-22 [김남민] 정책통계지도 > 9차(8차), 10차 분리 적용. END
			//2019-04-23 [김남민] 정책통계지도 > 좌측을 Tobe 우측을 Asis로 변경. START
			$policyStaticMapLeftmenu.ui.selectFirstYn = "Y";
			//2019-04-23 [김남민] 정책통계지도 > 좌측을 Tobe 우측을 Asis로 변경. END
			//2019-05-03 [김남민] 융합결과보기 선택 시 우측 출처에 저장되었던 년도가 중복적으로 표시 됨. START
			$policyStaticMapLeftmenu.ui.year_9016_yn = "N";
			//2019-05-03 [김남민] 융합결과보기 선택 시 우측 출처에 저장되었던 년도가 중복적으로 표시 됨. END			
			
			//데이터보드 닫기
			$policyStaticMapApi.ui.clearPoi();
			$(".dataSideBox").removeClass("full");
			$(".dataSideBox").stop().animate({"right":"-1500px"},200);
			$(".policyStaticMapDataBoard").removeClass("on").stop().animate({"right":"0"},200);
			$(".policyStaticMapDataBoard").removeClass("disabled");
			
			var parameters = {
					idx_id: idx_id
			};
			
			$.ajax({
				url: contextPath + "/ServiceAPI/policyStatic/getPolicyMapInfoByIdxId.json",
				type:"POST",
				data: parameters,
				async: true,
				dataType:"json",
				success: function(res) {
					if(res.errCd=="0"){
						var result = res.result;
						
						$policyStaticMap.ui.settingInfo["adm_nm"] = $("#current-sido-select option:selected").text()+" "+$("#current-sgg-select option:selected").text();
						if($policyStaticMap.ui.settingInfo["adm_cd"] == undefined){
							$policyStaticMap.ui.settingInfo["adm_cd"] = $("#current-sgg-select option:selected").attr("data-adm_cd");
						}
						$policyStaticMap.ui.settingInfo["idx_type"] = result.idx_type;
						$policyStaticMap.ui.settingInfo["region_cd"] = result.region_cd;
						$policyStaticMap.ui.settingInfo["src_inst_cd"] = result.source_inst_cd;
						$policyStaticMap.ui.settingInfo["usr_id"] = result.usr_id;
						$policyStaticMap.ui.settingInfo["policy_idx_content"] = result.policy_idx_content;
						$policyStaticMap.ui.settingInfo["policy_idx_nm"] = result.policy_idx_nm;
						$policyStaticMap.ui.settingInfo["idx_id"] = idx_id;
						$policyStaticMap.ui.settingInfo["nomfrm_cd"] = result.nomfrm_cd;
						$policyStaticMap.ui.settingInfo["nomfrm_base_map_div"] = result.nomfrm_base_map_div;
						$policyStaticMap.ui.settingInfo["category_id"] = result.category_id;
						$policyStaticMap.ui.settingInfo["disp_nm"] = result.disp_nm;
						$policyStaticMap.ui.settingInfo["disp_unit"] = result.disp_unit;
						
						var idxTypeTxt="";
						switch(parseInt(result.idx_type)){
							case 1: idxTypeTxt="지역별 수요변화형 >"; break;
							case 2: idxTypeTxt="지역별 통계연산형 >"; break;
							case 3: idxTypeTxt="지역별 시설분석형 >"; break;
						}
						
						var params = $policyStaticMap.ui.getLogParams();
						
						switch( result.category_id ){
							case "CTGR_001": srvLogWrite( "E0", "03", "01", "00", result.policy_idx_nm, params ); break; // jrj 로그 > 인구∙가구∙주택 분야 12종 지표 조회
							case "CTGR_002": srvLogWrite( "E0", "03", "02", "00", result.policy_idx_nm, params ); break; // jrj 로그 > 보건∙복지 분야 8종 지표 조회
							case "CTGR_003": srvLogWrite( "E0", "03", "03", "00", result.policy_idx_nm, params ); break; // jrj 로그 > 교육∙문화 분야 4종 지표 조회
							case "CTGR_004": srvLogWrite( "E0", "03", "04", "00", result.policy_idx_nm, params ); break; // jrj 로그 > 고용∙소득∙소비 분야 8종 지표 조회
							case "CTGR_005": srvLogWrite( "E0", "03", "05", "00", result.policy_idx_nm, params ); break; // jrj 로그 > 산업∙생산 분야 11종 지표 조회
							case "CTGR_006": srvLogWrite( "E0", "03", "06", "00", result.policy_idx_nm, params ); break; // jrj 로그 > 환경∙안전 분야 5종 지표 조회
							case "CTGR_007": srvLogWrite( "E0", "03", "07", "00", result.policy_idx_nm, params ); break; // jrj 로그 > 재정∙행정 분야 1종 지표 조회
						}
						
						if( !$policyStaticMap.ui.soc_yn ){
							$("#boundLevelTitle").val("2");
							$("#boundLevelTitle").html("<option value='1'>읍면동경계</option><option value='2'>집계구경계</option>");
							if ($("#current-sgg-select option:selected").text() == "전체") {
								$policyStaticMap.ui.settingInfo["adm_nm"] = $("#current-sido-select option:selected").text();
								$("#boundLevelTitle").val("1");
								$("#boundLevelTitle").html("<option value='1'>시군구경계</option><option value='2'>읍면동경계</option>");
							}
							if ( $policyStaticMap.ui.settingInfo["src_inst_cd"] == "2"  ) {  // 지자체 지표일 경우
								$("#boundLevelTitle").prop("disabled", true);
							} else {
								$("#boundLevelTitle").prop("disabled", false);
							}
						} else { //생활SOC
							$("#imgMapBtn").show();
							$policyStaticMap.ui.settingInfo["adm_nm"] = $("#current-sido-select option:selected").text();
							
							var boundLevel = $policyStaticSocMap.ui.selBoundLevel;
							
							if( $policyStaticMap.ui.settingInfo["adm_cd"].length > 2 ){
								$("#boundLevelTitle").html("<option value='2'>읍면동경계</option>");
							} else {
								$("#boundLevelTitle").html("<option value='1'>시군구경계</option>" +
										"<option value='2'"+( boundLevel == "2" ? " selected='selected'" : "")+">읍면동경계</option>");
							}
						}
						
						$("#sTitle").html(idxTypeTxt+" "+$("#current-sido-select option:selected").text()+" "+$("#current-sgg-select option:selected").text()+" "+result.policy_idx_nm);
						$("#naviTitle").html($policyStaticMap.ui.settingInfo["adm_nm"]);
						$("#naviTitle").show();
						$("#boundLevelTitle").show();
						$("#sTitle").show();
						var parameters = {
								idx_id: idx_id
						};
						$.ajax({
							url: contextPath + "/ServiceAPI/policyStatic/getPolicyStaticApiParam.json",
							type:"POST",
							data: parameters,
							async: true,
							dataType:"json",
							success: function(res) {
								if(res.errCd=="0"){
									$policyStaticMapLeftmenu.ui.dataList = res.result.apiparam_list;
									var kosisYn = "N";
									var kosisIdx = 0;
									$.each(res.result.apiparam_list,function(cnt,node){
										if (node.data_div == "2") {
											kosisYn = "Y";
											kosisIdx = cnt;
										}
									});
									
									if ( kosisYn == "Y") {  //KOSIS 데이터 (조회전 체크팝업 띄우기)
										var setData = $policyStaticMap.ui.setParams(res.result.apiparam_list[kosisIdx], $policyStaticMap.ui.mapList[kosisIdx]);
										setData.param.params["gis_se"] = setData.admList[0];
										$policyStaticMapApi.ui.checkKosisParams(setData, "N", function() {
											$policyStaticMapApi.ui.clearPoi();
											$.each(res.result.apiparam_list,function(cnt,node){
												$policyStaticMapLeftmenu.ui.arrParamList[node.call_info_serial-1]=node;
												if (node.data_type == "04" || node.data_type == "05") {
													$policyStaticMap.ui.doReqPoiData(node, $policyStaticMap.ui.mapList[node.map_div-1]);
												} else {
													var callParam = eval("("+node.call_param+")");
													if ( $policyStaticMap.ui.settingInfo["src_inst_cd"] == "1"  &&   // 기관코드가 통계청이고 지역코드가 '00'인것
															$policyStaticMap.ui.settingInfo["region_cd"] == "00" ) {
														if (callParam["low_search"] != undefined) {
															callParam["low_search"] = 1; 
															node.call_param = callParam;
														}
													} else {  // 지자체 등록 시 또는 지역코드가 '00'이 아닌 것
														if (callParam["low_search"] != undefined) {
															$("#boundLevelTitle").val(callParam["low_search"]);
														}
													}
													$policyStaticMap.ui.doReqStatsData(node, $policyStaticMap.ui.mapList[node.map_div-1]);
												}
											});
										});
									} else {
										$policyStaticMapApi.ui.clearPoi();
										//2019-04-23 [김남민] 정책통계지도 > 좌측을 Tobe 우측을 Asis로 변경. START
										var lvMinYear = "9999";
										var lvMaxYear = "0000";
										$.each(res.result.apiparam_list,function(cnt,node){
											var lvCallParam = node.call_param;
											if(typeof(node.call_param) == "string") {
												lvCallParam = eval("("+node.call_param+")");
											}
											//2019-05-03 [김남민] 융합결과보기 선택 시 우측 출처에 저장되었던 년도가 중복적으로 표시 됨. START
											var lvCheckYear = (""+lvCallParam.year).replace(/9016/g,"2016");
											var lvCheckYear2 = (""+lvCallParam.year);
											//2019-05-03 [김남민] 융합결과보기 선택 시 우측 출처에 저장되었던 년도가 중복적으로 표시 됨. END
											if(Number(lvMinYear) > Number(lvCheckYear)) {
												lvMinYear = lvCheckYear2;
											}
											if(Number(lvMaxYear) < Number(lvCheckYear)) {
												lvMaxYear = lvCheckYear2;
											}
										});
										//2019-04-23 [김남민] 정책통계지도 > 좌측을 Tobe 우측을 Asis로 변경. END
										$.each(res.result.apiparam_list,function(cnt,node){
											//2019-04-22 [김남민] 정책통계지도 > 9차(8차), 10차 분리 적용. START
											/*
											고용,소득,소비
												rsEJy3oJwG20170803172737334I49JoFMEGz : 종사자 수 분포 변화
												xpwJJxztnG20170808142737332HyvJxM3FHs : PC방 변화
												EwwunnFpJK201708081427373326K8vsErJuJ : 슈퍼마켓의 변화
												onppztzErp20170808142737333z8tyqHzI9w : 제과점 변화
												pyL5xrpKKF20170808152137332Lu5p9E6DKt : 치킨전문점 변화
												uHzorzuwyw20170808152137332v7rFoJoL2I : 커피전문점 변화
												8292308888201710301617197294119290010 : 사업체당 평균 인구 현황
												3751353392201712061200288355280432955 : 사업체당 평균 종사자 수
											산업분야
												rH4wnv36It20170803172737334nvKrIEMnzF : 총사업체 분포 변화
												DMspq6u4Mv201708031727373349yHup4JG7w : 도소매업 변화
												yDMKDIKzyn20170808142737331vsqnssqM1z : 제조업 변화
											*/
											if(
												$policyStaticMapLeftmenu.ui.idx_id == "rsEJy3oJwG20170803172737334I49JoFMEGz"
												|| $policyStaticMapLeftmenu.ui.idx_id == "xpwJJxztnG20170808142737332HyvJxM3FHs"
												|| $policyStaticMapLeftmenu.ui.idx_id == "EwwunnFpJK201708081427373326K8vsErJuJ"
												|| $policyStaticMapLeftmenu.ui.idx_id == "onppztzErp20170808142737333z8tyqHzI9w"
												|| $policyStaticMapLeftmenu.ui.idx_id == "pyL5xrpKKF20170808152137332Lu5p9E6DKt"
												|| $policyStaticMapLeftmenu.ui.idx_id == "uHzorzuwyw20170808152137332v7rFoJoL2I"
												//|| $policyStaticMapLeftmenu.ui.idx_id == "8292308888201710301617197294119290010"
												//|| $policyStaticMapLeftmenu.ui.idx_id == "3751353392201712061200288355280432955"
													
												|| $policyStaticMapLeftmenu.ui.idx_id == "rH4wnv36It20170803172737334nvKrIEMnzF"
												|| $policyStaticMapLeftmenu.ui.idx_id == "DMspq6u4Mv201708031727373349yHup4JG7w"
												|| $policyStaticMapLeftmenu.ui.idx_id == "yDMKDIKzyn20170808142737331vsqnssqM1z"
											) {
												var lvCallParam = node.call_param;
												if(typeof(node.call_param) == "string") {
													lvCallParam = eval("("+node.call_param+")");
												}
												if(node.call_info_serial == 1) {
													lvCallParam.year = companyDataYear;
												}
												if(node.call_info_serial == 2) {
													lvCallParam.year = "";
												}
												node.call_param = JSON.stringify(lvCallParam);
											}
											//2019-04-22 [김남민] 정책통계지도 > 9차(8차), 10차 분리 적용. END
											//2019-04-23 [김남민] 정책통계지도 > 좌측을 Tobe 우측을 Asis로 변경. START
											else {
												//수요변화지표
												if($policyStaticMap.ui.settingInfo["idx_type"] == "1") {
													var lvCallParam = node.call_param;
													if(typeof(node.call_param) == "string") {
														lvCallParam = eval("("+node.call_param+")");
													}
													if(node.call_info_serial == 1 && lvMaxYear != "0000") {
														if(lvMaxYear == "2015") lvCallParam.year = lvMaxYear;
														else lvCallParam.year = dataYear;
													}
													if(node.call_info_serial == 2 && lvMinYear != "9999") {
														lvCallParam.year = "";
													}
													node.call_param = JSON.stringify(lvCallParam);
													//2019-05-03 [김남민] 융합결과보기 선택 시 우측 출처에 저장되었던 년도가 중복적으로 표시 됨. START
													if(lvMaxYear == companyDataYear && lvMinYear == "9016") {
														$policyStaticMapLeftmenu.ui.year_9016_yn = "Y";
													}
													//2019-05-03 [김남민] 융합결과보기 선택 시 우측 출처에 저장되었던 년도가 중복적으로 표시 됨. END
												}
											}
											//2019-04-23 [김남민] 정책통계지도 > 좌측을 Tobe 우측을 Asis로 변경. END
											$policyStaticMapLeftmenu.ui.arrParamList[node.call_info_serial-1]=node;
											if (node.data_type == "04" || node.data_type == "05") {
												$policyStaticMap.ui.doReqPoiData(node, $policyStaticMap.ui.mapList[node.map_div-1]);
											} else {
												var callParam = eval("("+node.call_param+")");
												
												if( $policyStaticMap.ui.soc_yn ){ //생활SOC
													if( $("#boundLevelTitle option:selected").val() == "2" && $("#current-sgg-select-2 option:selected").val() == "999" ){
														callParam["low_search"] = "2";
													} else {
														callParam["low_search"] = "1";
													}
													
													if( $policyStaticMapLeftmenu.ui.idx_id == 'soc_wghvr' ){
														$("#imgMapBtn").show();
													} else {
														$("#imgMapBtn").hide();
													}
													
													node.callParam = callParam;
													node.call_param = JSON.stringify( callParam );
													
//													$("#boundLevelTitle").val(callParam["low_search"]);
												} else {
													if ( $policyStaticMap.ui.settingInfo["src_inst_cd"] == "1"  &&   // 기관코드가 통계청이고 지역코드가 '00'인것
															$policyStaticMap.ui.settingInfo["region_cd"] == "00" ) {
														if (callParam["low_search"] != undefined) {
															callParam["low_search"] = 1; 
															node.call_param = callParam;
														}
													} else {  // 지자체 등록 시 또는 지역코드가 '00'이 아닌 것
														if (callParam["low_search"] != undefined) {
															$("#boundLevelTitle").val(callParam["low_search"]);
														}
													}
												}
												
												$policyStaticMap.ui.doReqStatsData(node, $policyStaticMap.ui.mapList[node.map_div-1]);
											}
										});
									}

									//2019-01-22 LNB 최하단에 메뉴 자동닫기 추가. (자동닫기 선택되었을때만 닫기 처리)
									if($("#menuAutoClose_radio").attr("checked") == "checked") {
										if ($("#demand").hasClass("on")) {
											$("#demand").removeClass("on");
										}
										
										$policyStaticMapLeftmenu.event.closeAnimate(1);
										$policyStaticMapLeftmenu.event.closeAnimate(2);
									}
									
									//mng_s 20180212 주용민
									if('yDMKDIKzyn20170803172737331vsqnssqM1z' == result.idx_id)
										apiLogWrite2("S0", "S47", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('2sMtuGwJID20170803172737331rtyMEvKyso' == result.idx_id)
										apiLogWrite2("S0", "S48", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('xpwJJxztnG20170803172737331HyvJxM3FHs' == result.idx_id)
										apiLogWrite2("S0", "S49", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('EwwunnFpJK201708031727373316K8vsErJuJ' == result.idx_id)
										apiLogWrite2("S0", "S50", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('onppztzErp20170803172737331z8tyqHzI9w' == result.idx_id)
										apiLogWrite2("S0", "S51", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('MLD6xDDuHs20170803172737332wKuuvtvsq4' == result.idx_id)
										apiLogWrite2("S0", "S52", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('ysE4vzDMqx20170803172737333GyKIrExLJF' == result.idx_id)
										apiLogWrite2("S0", "S53", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('qqnLo3nzJu20170803172737333sF0GorqFtu' == result.idx_id)
										apiLogWrite2("S0", "S54", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('r3KxpDLnz520170803172737333Est1pnrzqx' == result.idx_id)
										apiLogWrite2("S0", "S55", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('KsK7HuJ6vL20170803172737333H3osD1tpuE' == result.idx_id)
										apiLogWrite2("S0", "S56", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('HoMCJ0uHEz20170803172737334KGyGroEKqo' == result.idx_id)
										apiLogWrite2("S0", "S57", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('0210176233201710301539320124465875560' == result.idx_id)
										apiLogWrite2("S0", "S60", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('GnCDxoqD8q201708031727373316EE5yvyDDD' == result.idx_id)
										apiLogWrite2("S0", "S61", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('wE7JnMvoGu20170803172737332pxynvLs2qF' == result.idx_id)
										apiLogWrite2("S0", "S62", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('65rvHsrIzu20170803172737332sHJzvzpwJE' == result.idx_id)
										apiLogWrite2("S0", "S63", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('uHzorzuwyw20170803172737332v7rFoJoL2I' == result.idx_id)
										apiLogWrite2("S0", "S64", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('MLD6xDDuHs20170808152137332wKuuvtvsq4' == result.idx_id)
										apiLogWrite2("S0", "S65", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('9221137705201710301546072662443762660' == result.idx_id)
										apiLogWrite2("S0", "S67", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('2547676290201710301551567684108432782' == result.idx_id)
										apiLogWrite2("S0", "S68", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('2088944725201711211657122621829462177' == result.idx_id)
										apiLogWrite2("S0", "S69", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('2635651540201711301541034840754001433' == result.idx_id)
										apiLogWrite2("S0", "S70", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('3724842547201711201014253871792207583' == result.idx_id)
										apiLogWrite2("S0", "S71", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('3458556422201710301554388959489997313' == result.idx_id)
										apiLogWrite2("S0", "S72", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('7960926159201711211700328741236696657' == result.idx_id)
										apiLogWrite2("S0", "S73", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('rsEJy3oJwG20170803172737334I49JoFMEGz' == result.idx_id)
										apiLogWrite2("S0", "S74", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('xpwJJxztnG20170808142737332HyvJxM3FHs' == result.idx_id)
										apiLogWrite2("S0", "S75", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('EwwunnFpJK201708081427373326K8vsErJuJ' == result.idx_id)
										apiLogWrite2("S0", "S76", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('onppztzErp20170808142737333z8tyqHzI9w' == result.idx_id)
										apiLogWrite2("S0", "S77", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('pyL5xrpKKF20170808152137332Lu5p9E6DKt' == result.idx_id)
										apiLogWrite2("S0", "S78", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('uHzorzuwyw20170808152137332v7rFoJoL2I' == result.idx_id)
										apiLogWrite2("S0", "S79", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('6460310735201710301625000622232552773' == result.idx_id)
										apiLogWrite2("S0", "S80", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('8292308888201710301617197294119290010' == result.idx_id)
										apiLogWrite2("S0", "S81", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('3751353392201712061200288355280432955' == result.idx_id)
										apiLogWrite2("S0", "S82", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('wu5oMryvM720170803172737331sJnsFLDrpy' == result.idx_id)
										apiLogWrite2("S0", "S83", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('rzzGswqnLv20170803172737332zKLutDGw5E' == result.idx_id)
										apiLogWrite2("S0", "S84", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('q5MFyLCnFt20170803172737332tGMGtq9Kwn' == result.idx_id)
										apiLogWrite2("S0", "S85", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('GFLnoGyFF220170803172737332qMvwFn5v7t' == result.idx_id)
										apiLogWrite2("S0", "S86", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('ntpJEMwwsx20170803172737333xxvMIJ5rGK' == result.idx_id)
										apiLogWrite2("S0", "S87", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('H1LGyrMIEF20170803172737333DxGrxxtEsr' == result.idx_id)
										apiLogWrite2("S0", "S88", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('FJMJwwpKvz20170803172737333HtKMuowG7o' == result.idx_id)
										apiLogWrite2("S0", "S89", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('nvsDwtnIMM20170803172737333tzyypxrpuE' == result.idx_id)
										apiLogWrite2("S0", "S90", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('rH4wnv36It20170803172737334nvKrIEMnzF' == result.idx_id)
										apiLogWrite2("S0", "S91", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('DMspq6u4Mv201708031727373349yHup4JG7w' == result.idx_id)
										apiLogWrite2("S0", "S92", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('yDMKDIKzyn20170808142737331vsqnssqM1z' == result.idx_id)
										apiLogWrite2("S0", "S93", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('4567814844201710301633013080966785401' == result.idx_id)
										apiLogWrite2("S0", "S94", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('5075653758201711211705104277120963624' == result.idx_id)
										apiLogWrite2("S0", "S95", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('3074823551201711211711119354566751530' == result.idx_id)
										apiLogWrite2("S0", "S96", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('8547921299201711211707478631593010966' == result.idx_id)
										apiLogWrite2("S0", "S97", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('4846938690201712181802041978059514311' == result.idx_id)
										apiLogWrite2("S0", "S98", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									else if('8599077428201710301634346508152047319' == result.idx_id)
										apiLogWrite2("S0", "SA0", result.policy_idx_nm, "category_id="+result.category_id+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+result.idx_type, "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
									//mng_e 20180212 주용민s
								}
							},
							error: function(data){
								messageAlert.open("알림","서버에서 처리 중 에러가 발생하였습니다.");
								return false;
							}
						});
					}
				},
				error: function(data){
					messageAlert.open("알림","서버에서 처리 중 에러가 발생하였습니다.");
					return false;
				}
			});
			
		},
		
		/**
		 * @name              : getCenter
		 * @description       : 지역선택 센터좌표 조회
		 * @date              : 2017. 05. 29. 
		 * @author            : 권차욱
		 * @history           :
		 * @param type
		 * @returns {String}
		 */
		getCenter : function(type){
			var center = [$("#"+type+"-sgg-select option:selected").data("coor-x"), $("#"+type+"-sgg-select option:selected").data("coor-y")];
			return center;
		},

		/**
		 * @name         : getCategoryCnt
		 * @description  : 카테고리 갯수 조회(정책분야선택)
		 * @date         : 2017. 08. 10. 
		 * @author	     : 김보민
		 * @history 	 :
		 * @returns
		 */
		getCategoryCnt: function(region_cd) {
			$(".categoryCntC").text("0");

			var parameters = {
					region_cd: region_cd
			};
			
			//임시저장모드일 경우, 임시저장 지표만 불러온다.
			if ($policyStaticMap.ui.isTemp) {
				parameters["srv_yn"] = "N";
			}else {
				parameters["srv_yn"] = "Y";
			}
			
			$.ajax({
				url: contextPath + "/ServiceAPI/policyStatic/getCategoryCnt.json",
				type:"POST",
				data: parameters,
				async: true,
				dataType:"json",
				success: function(res) {
					if(res.errCd=="0"){
						$.each(res.result.catecnt_info,function(cnt,node){
							$("#"+node.category_id+"Cnt").text(node.cnt);
						});
					}
				},
				error: function(data){
					messageAlert.open("알림","서버에서 처리 중 에러가 발생하였습니다.");
					return false;
				}
			});
		},

		/**
		 * @name         : getDetailCategoryList
		 * @description  : 세부지표 리스트 조회
		 * @date         : 2017. 08. 11. 
		 * @author	     : 김보민
		 * @history 	 :
		 * @returns
		 */
		getDetailCategoryList: function(category_id) {
			$("#cateDetailList01").html("");
			$("#cateDetailList02").html("");
			$("#cateDetailList03").html("");
			
			var parameters = {
					category_id: category_id,
					region_cd: $("#current-sgg-select option:selected").attr("data-adm_cd")
			};
			
			//임시저장모드일 경우, 임시저장 지표만 불러온다.
			if ($policyStaticMap.ui.isTemp) {
				parameters["srv_yn"] = "N";
			}else {
				parameters["srv_yn"] = "Y";
			}
			
			$.ajax({
				url: contextPath + "/ServiceAPI/policyStatic/getDetailCategoryList.json",
				type:"POST",
				data: parameters,
				async: true,
				dataType:"json",
				success: function(res) {
					var cnt01 =0, cnt02 =0, cnt03 =0;
					if(res.errCd=="0"){
						var srcInstCd = "";
						$.each(res.result.cateDetail_list,function(cnt,node){
							//leekh 20180201 개발팀 수정 요청 start
							
							//srcInstCd = node.source_inst_cd == "1" ?"<a> 통계청 </a>":"<a class='t01'>지자체</a>";		//원본 소스
							var strChulChe = "통계청";
							var styleChulChe = "";
							if(node.source_inst_cd == "1"){
								srcInstCd =  "<a> 통계청 </a>";
							}else if(node.source_inst_cd == "2"){
								srcInstCd = "<a class='t01'>지자체</a>";
							}else if(node.source_inst_cd == "3"){
								if( node.idx_id == '9221137705201710301546072662443762660' ){
									strChulChe = "보건복지부";
								} else if(node.idx_id == '4567814844201710301633013080966785401'){
									strChulChe = "경찰청";
								} else if(node.idx_id == '5075653758201711211705104277120963624' || node.idx_id == '3074823551201711211711119354566751530'){
									strChulChe = "행정안전부";
								} else{
									strChulChe = "공공데이터";
								}
								styleChulChe = "style='width:55px; right:0px; position:absolute'";
								srcInstCd = "<a " + styleChulChe +">" + strChulChe + "</a>";
							} else if(node.source_inst_cd == "4"){
								var soctitle = '';
								
								if( node.idx_id == 'soc_ppltn' ){
									soctitle = '- 서비스인구는 해당인구수/시설물을 나타내는 것으로서 행정구역별로 시설수의 공급정도를 나타낸다.<br>- 생활SOC 최적지를 선정하기 위해서 서비스인구가 적은 우선 공급지역을 파악할 수 있습니다.';
								} else if( node.idx_id == 'soc_wghvr' ){
									soctitle = '- 주민의 거주지에서 생활SOC 시설까지 도로를 이용하여 도달하는 평균거리입니다.<br>- 다른 시군 및 읍면동과 비교를 통해 거주주민 대비 관내시설의 부족여부를 확인하여<br/>';
									soctitle += ' 향후 생활SOC를 최우선적으로 공급해야 되는 지역을 선정하는데 기초자료로 활용할 수 있습니다.';
								} else if( node.idx_id == 'soc_ctgry' ){
									soctitle = '- 주민의 거주지에서 생활SOC 시설까지 도보 또는 자동차를 이동시 걸리는 시간입니다.<br>- 다른 시군 및 읍면동과 비교를 통해 거주주민 대비 관내시설의 부족여부를 확인할 수 있으며<br>';
									soctitle += ' 생활SOC별로 최우선적으로 공급해야 되는 지역을 선정하는데 기초자료로 활용할 수 있습니다.';
								}
								var atag = '<a href="javascript:void(0)" style="width:22px !important;position:relative;cursor:pointer;';
								atag += 'background-color:transparent;outline:none;opacity:1;" class="ar idxTooltip" data-subj="'+ node.policy_idx_nm +'" title="'+ soctitle +'">';
								atag += '<img src="/img/ico/ico_tooltip01.png" alt="물음표" class="mCS_img_loaded">';
								
								srcInstCd = atag;
							}
							//leekh 20180201 end
							
							var tabindex = cnt + 106;
							//2018-12-27 이전에 조회한 정보 유지하여 표출.
							var lvLabelClass = "idxNmCls";
							if($policyStaticMap.ui.settingInfo["idx_id"] == node.idx_id) {
								lvLabelClass += " on";
							}
							var html = "<li category_id='"+node.category_id+"' idx_id='"+node.idx_id+"'><input type='radio' name='rd_mainIdx'><label for='rd_mainIdx' class='"+lvLabelClass+"' tabindex='"+tabindex+"'>"+node.policy_idx_nm+"</label>"+srcInstCd+"</li>";
							switch(parseInt(node.idx_type)) {
								case 1: //수요변화지표
									cnt01++;
									$("#cateDetailList01").append(html);
									break;
								case 2: //통계연산지표
									cnt02++;
									$("#cateDetailList02").append(html);
									break;
								case 3: //시설분석지표
									cnt03++;
									$("#cateDetailList03").append(html);
									break;
							}
							
							if( $policyStaticMap.ui.soc_yn ){
								$('.idxTooltip').tooltip({
									open: function( event, ui ) {
										var target = $(this);
										setTimeout(function() {
											$(".ui-tooltip .subj").text(target.attr("data-subj"));
											ui.tooltip.css("max-width", "500px");
											ui.tooltip.css("box-shadow","0 0 7px #3B80EF");
										},100);
									},position: {
										my: "left top", at: "right top", 
										collision : "flip",
										using: function( position, feedback ) {
											if ($(feedback.target)[0].element[0].outerHTML.indexOf("data-subj") != -1) {
												$( this ).css( position ).prepend("<span class='subj'></span>");
											}else {
												$( this ).css( position ); 
											}
											
											$( "<div>" )
											.addClass( feedback.vertical )
											.addClass( feedback.horizontal )
											.appendTo( this );
										}
									},
									content: function() {
										return $(this).prop("title");
									}
								});
							}
						});
						$("#cnt01").text(cnt01<10?"0"+cnt01:cnt01);
						$("#cnt02").text(cnt02<10?"0"+cnt02:cnt02);
						$("#cnt03").text(cnt03<10?"0"+cnt03:cnt03);
					}
				},
				error: function(data){
					messageAlert.open("알림","서버에서 처리 중 에러가 발생하였습니다.");
					return false;
				}
			});
		}
	};
	
	$policyStaticMapLeftmenu.event = {
			
			setUIEvent : function() {
				
				$(".normalBox01").css("height", "calc(100% - 82px)");
				$(".scrollBox").mCustomScrollbar({axis:"y",advanced: { autoExpandHorizontalScroll: true }});
				$(".mCSB_container").css("margin-right", "10px");
				
				//시도 콤보박스 이벤트
				$("body").on("change", "#current-sido-select", function(){
					$("#current-sido-select-2").val($(this).val());
					$policyStaticMapLeftmenu.event.closeAnimate(2);
					var adm_cd = $(this).val();
					$policyStaticMapLeftmenu.ui.getSggList($(this).data("type"), adm_cd, "");
					if( !$policyStaticMap.ui.soc_yn ){
						$policyStaticMapLeftmenu.ui.getCategoryCnt(adm_cd);   // 2017.09.07 [개발팀] 수정
					}
					$policyStaticMap.ui.settingInfo["adm_cd"] = adm_cd;
					$policyStaticMap.ui.setMapPosition();
				});
				
				//시도 콤보박스 이벤트 2 (2018-12-19 LNB화면 최소화시에도 대상지역 선택 표출 필요)
				$("body").on("change", "#current-sido-select-2", function(){
					$("#current-sido-select").val($(this).val());
					$("#current-sido-select").trigger("change");
					if($policyStaticMap.ui.settingInfo["idx_id"] != undefined && $(".nav-sidebar").css("left") != "0px") {
						$policyStaticCombineMap.ui.poiTitleNm = "";
						$policyStaticCombineMap.ui.poiSourceNm = "";
						$policyStaticMapLeftmenu.ui.arrParamList = new Array();
						$policyStaticMapLeftmenu.ui.getPolicyMapInfoByIdxId($policyStaticMap.ui.settingInfo["idx_id"]);
					}
					else if($(".nav-sidebar").css("left") == "0px") {
						var lvID = "CTGR_001";
						for(var i = 1; i <= 3; i++) {
							if($("#cateDetailList0"+i+" li").length > 0) {
								$("#cateDetailList0"+i+" li").each(function() {
									lvID = $(this).attr("category_id");
									return false;
								});
							}
						}
						$("#"+lvID).trigger("click");
					}
					//2019-01-28 IE 포커스 오류 수정
					$(this).focus();
				});
				
				//시군구 콤보박스 이벤트
				$("body").on("change", "#current-sgg-select", function(){
					$("#current-sgg-select-2").val($(this).val());
//					$policyStaticMapLeftmenu.event.closeAnimate(2);
					var sigungu = $("#current-sgg-select option:selected").attr("data-adm_cd");
					if( !$policyStaticMap.ui.soc_yn ){
						$policyStaticMapLeftmenu.ui.getCategoryCnt(sigungu);
					}
					
					$policyStaticMap.ui.settingInfo["adm_cd"] = sigungu;
					$policyStaticMap.ui.setMapPosition();
				});
				
				//시군구 콤보박스 이벤트 2 (2018-12-19 LNB화면 최소화시에도 대상지역 선택 표출 필요)
				$("body").on("change", "#current-sgg-select-2", function(){
					if( $policyStaticMap.ui.settingInfo.idx_id == '3074823551201711211711119354566751530' && $(this).val() != "999" && $(".nav-sidebar").css("left") != "0px" ){
						messageAlert.open("알림","민방위대피시설 분포 현황은 시군구까지만 조회가 가능하여 선택된 지역의 통계를 볼 수 없습니다.");
						$("#current-sgg-select, #current-sgg-select-2").val("999");
					} else {
						$("#current-sgg-select").val($(this).val());
						$("#current-sgg-select").trigger("change");
						
						if($policyStaticMap.ui.settingInfo["idx_id"] != undefined && $(".nav-sidebar").css("left") != "0px") {
							$policyStaticCombineMap.ui.poiTitleNm = "";
							$policyStaticCombineMap.ui.poiSourceNm = "";
							$policyStaticMapLeftmenu.ui.arrParamList = new Array();
							$policyStaticMapLeftmenu.ui.getPolicyMapInfoByIdxId($policyStaticMap.ui.settingInfo["idx_id"]);
						}
						else if($(".nav-sidebar").css("left") == "0px") {
							var lvID = "CTGR_001";
							for(var i = 1; i <= 3; i++) {
								if($("#cateDetailList0"+i+" li").length > 0) {
									$("#cateDetailList0"+i+" li").each(function() {
										lvID = $(this).attr("category_id");
										return false;
									});
								}
							}
							$("#"+lvID).trigger("click");
						}
					}
				});
				
				//왼쪽메뉴 show/hide - 1depth
				$("body").on("click", "#demand, .stepClose",function() {//2019-06-20 박길섭
					//2018-12-27 이전에 조회한 정보 유지하여 표출.
					//$(".themul li").removeClass("on");
					var on = $(this).hasClass("on");
					$(".sideQuick").removeClass("on");
					if(!on){
						$(".sideQuick").addClass("on");//2019-06-20 박길섭
						$(".quickBox .bottom > a.stepClose").addClass("on");//2019-06-20 박길섭
						$(this).addClass("on");
						//2019-05-03 [김남민] 커피전문점 선택 후 좌측 메뉴 자동으로 닫혔을 경우 다시 통계메뉴를 클릭하면 세부지표 선택 메뉴가 호출되어야 함. (05-07 추가수정) START
						if( ( $policyStaticMapLeftmenu.ui.ctgr_id != "" && $policyStaticMapLeftmenu.ui.idx_id != "" ) 
								|| $policyStaticMap.ui.soc_yn ) {
							$policyStaticMapLeftmenu.event.openAnimate(1);
							$("#"+$policyStaticMapLeftmenu.ui.ctgr_id).click();
						}
						else {
							$policyStaticMapLeftmenu.event.openAnimate(1);
						}
						//2019-05-03 [김남민] 커피전문점 선택 후 좌측 메뉴 자동으로 닫혔을 경우 다시 통계메뉴를 클릭하면 세부지표 선택 메뉴가 호출되어야 함. (05-07 추가수정) END
					}else{
						$policyStaticMapLeftmenu.event.closeAnimate(1);
					}	
				});
				//2019-06-20 박길섭 시작
				/*//닫기 버튼 클릭 시
				$("body").on("click",".stepClose",function(){
					console.log("stepClose");
					$(".sideQuick").removeClass("on");
					$policyStaticMapLeftmenu.event.closeAnimate($(this).data("id"));
				});*/
				//2019-06-20 박길섭 끝
				//카테고리 선택
				$("body").on("click", ".themul li , .thematic li", function() {
					//2018-12-27 이전에 조회한 정보 유지하여 표출.
					var lvID = $(this).attr("id");
					$(".themul li, .thematic li").removeClass("on");
					$(".themul li, .thematic li").each(function() {
						if(lvID == $(this).attr("id")) $(this).addClass("on");
					});
					//2019-05-03 [김남민] 커피전문점 선택 후 좌측 메뉴 자동으로 닫혔을 경우 다시 통계메뉴를 클릭하면 세부지표 선택 메뉴가 호출되어야 함. (05-07 추가수정) START
					$policyStaticMapLeftmenu.ui.ctgr_id = lvID;
					//2019-05-03 [김남민] 커피전문점 선택 후 좌측 메뉴 자동으로 닫혔을 경우 다시 통계메뉴를 클릭하면 세부지표 선택 메뉴가 호출되어야 함. (05-07 추가수정) END
//					$("body").on("click", ".ctgrList li", function() {
//					$(".themul li").removeClass("on");
//					$(this).addClass("on");
					
					$policyStaticMapLeftmenu.event.openAnimate(2);
					
					$policyStaticMapLeftmenu.ui.getDetailCategoryList($(this).attr("id"));  // 2017.08.11 [개발팀] 세부지표 리스트 조회
					
					if( $policyStaticMap.ui.soc_yn ){ //생활SOC
		            	$(".stepClose").addClass("on");
		            	$("#fac-select-div").show().animate({"left":"560px","right":"auto"},200);
		            	
		            	if( $policyStaticMapLeftmenu.ui.idx_id == 'soc_ctgry' ){
							$("#ctgry-select-div").show().animate({"left":"760px","right":"auto"},200);
						} else {
							$("#ctgry-select-div").hide();
						}
		            }
					
					$(".normalBox01").scrollTop(0);
					$(".quickBox.step01").stop().animate({ "left": "-244px" }, 200);
		            $(".nav-sidebar").stop().animate({ "left": "0px" }, 200);
		            //2018-12-19 LNB화면 최소화시에도 대상지역 선택 표출 필요
		            //2019-01-22 LNB 최하단에 메뉴 자동닫기 추가. (메뉴 안닫힐때 위치가 겹치는 부분이 있어서 변경)
		            //$("#current-sido-select-2").parent().parent().css({"left":"auto","right":"0"});
		            $("#current-sido-select-2").parent().parent().animate({"left":"360px","right":"auto"},200);
		            $("#current-sido-select-2").parent().parent().show();
				});
				
				//2018-12-21 정책통계지도 > LNB화면 > LNB하단의 ≡목록 메뉴 구현
				//목록 선택
				$("body").on("click", ".nav-sidebar .list_btn", function() {
					$policyStaticMapLeftmenu.event.closeAnimate(2);
					//2018-12-27 이전에 조회한 정보 유지하여 표출.
					//$(".themul li").removeClass("on");
					$(".sideQuick").removeClass("on");
					$("#demand").addClass("on");
					$policyStaticMapLeftmenu.event.openAnimate(1);
				});
				
				//지표항목 선택
				$("body").on("click",".mainIdxRadio label",function(evt){
					if( $(this).closest("li").attr("idx_id") == '3074823551201711211711119354566751530' ){
						if( $("#current-sgg-select").val() != "999" || $("#current-sgg-select-2").val() != "999" ){
							messageAlert.open("알림","민방위대피시설 분포 현황은 시군구까지만 조회가 가능하여 선택된 지역의 통계를 볼 수 없습니다.");
							evt.preventDefault();
							evt.stopImmediatePropagation();
						} else {
							$(".mainIdxRadio label").removeClass("on");
							$(this).addClass("on");
						}
					} else {
						$(".mainIdxRadio label").removeClass("on");
						$(this).addClass("on");
					}
			    });
				
				//세부지표 선택
				$("body").on("click", ".mainIdxRadio li", function() {
					$policyStaticCombineMap.ui.poiTitleNm = "";
					$policyStaticCombineMap.ui.poiSourceNm = "";
					$policyStaticMapLeftmenu.ui.arrParamList = new Array();
					$policyStaticMapLeftmenu.ui.getPolicyMapInfoByIdxId($(this).attr("idx_id"));
				});
				
				//하단 패밀리사이트
				$("body").on("click","#bottomService",function(){
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$("#bottomServiceLayer").show();
					}else{
						$(this).removeClass("on");
						$("#bottomServiceLayer").hide();
					}
				});
				
				//========= 2017.12.21 [개발팀] 접근성 시정조치 START ==========//
				
				$("body").on("focus", "#depth_2_menu label", function(e) {
					$("#depth_2_menu label").each(function(idx) {
						$("#depth_2_menu label").eq(idx).css("opacity", "1");
					});
					$(this).css("outline", "none");
					$(this).css("opacity", "0.7");
				});
				
				$("body").on("keydown", "#depth_2_menu label", function(e) {
					if (e.keyCode == 13) {
						$(this).trigger("click");
					}
				});
				
				$("body").on("focus", ".containerBox", function() {
					$(".ulDiv").trigger("mouseout");
				});
				
				$(".skipNav").keydown(function(e) {
					if (e.keyCode == 13) {
						$("#clearBtn").focus();
					}
				});
				
				$("body").on("keydown", ".ctgrList li", function(e) {
					if (e.keyCode == 13) {
						$(this).trigger("click");
					}
				});
				
				$("body").on("focus", ".containerBox a", function() {
					$(this).css("outline", "none");
					$(this).css("opacity", "0.7");
				});
				
				$("body").on("focusout", ".containerBox a", function() {
					$(this).css("opacity", "1");
				});
				//========= 2017.12.21 [개발팀] 접근성 시정조치 END ==========//
				
				//2019-01-22 LNB 최하단에 메뉴 자동닫기 추가.
				// 메뉴 자동닫기 라디오 버튼 (2개 공통 이벤트)
				// id="menuAutoClose_radio" (#menuAutoClose_radio) //검색용 주석
				// id="menuAutoClose_radio2" (#menuAutoClose_radio2) //검색용 주석
				$("body").on("click",".leftArea .menuAutoClose label",function(){
		        	if($(this).hasClass("on")) {
						$(".leftArea .menuAutoClose label").removeClass("on");
						$(".leftArea .menuAutoClose input").removeAttr("checked");
		        	}
		        	else {
		        		$(".leftArea .menuAutoClose label").addClass("on");
						$(".leftArea .menuAutoClose label").prev().attr("checked", "checked");
		        	}
			    });
				
				
			},
			
			/**
			 * @name             : openAnimate
			 * @description      : 왼쪽메뉴 show
			 * @date             : 2017. 08. 08.
			 * @author	         : 권차욱
			 * @history 	     :
			 * @param seq  : 순서
			 */
			openAnimate : function(seq) {
				switch(seq) {
					case 1 : //1depth
//						$(".nav-sidebar").stop().animate({ "left": "0px" }, 200);
						$(".quickBox.step01").stop().animate({"left":"0"},200);
						$("#current-sido-select-2").parent().parent().hide();
						break;
					case 2: //2depth
						$(".quickBox.step02").stop().animate({"left":"80px"},200);
						break;
				}
			},
			
			/**
			 * @name             : closeAnimate
			 * @description      : 왼쪽메뉴 show
			 * @date             : 2017. 08. 08.
			 * @author	         : 권차욱
			 * @history 	     :
			 * @param seq  : 순서
			 */
			closeAnimate : function(seq){
				$(".quickBox .bottom > a.stepClose").removeClass("on");//2019-06-20 박길섭
				switch(seq) {
					case 1 : //1depth
//						$(".nav-sidebar").stop().animate({ "left": "-380px" }, 200);
						$(".quickBox.step01").stop().animate({"left":"-220px"},200);//2019-06-20 박길섭
						$(".quickBox.step02").stop().animate({"left":"-380px"},200);
						//2018-12-27 메뉴스위치 ON/OFF 수정.
						$(".nav-sidebar").stop().animate({ "left": "-380px" }, 200);
						//2018-12-19 LNB화면 최소화시에도 대상지역 선택 표출 필요
						$("#current-sido-select-2").parent().parent().css({"left":"0","right":"auto"});
						$("#current-sido-select-2").parent().parent().show();
						
						if( $policyStaticMap.ui.soc_yn ){ //생활SOC
							$("#fac-select-div").css({"left":"200px","right":"auto"}).show();
							
							if( $policyStaticMapLeftmenu.ui.idx_id == 'soc_ctgry' ){
								$("#ctgry-select-div").css({"left":"400px","right":"auto"}).show();
							} else {
								$("#ctgry-select-div").hide();
							}
						}
						break;
					case 2: //2depth
						$(".quickBox.step02").stop().animate({"left":"-279px"},200);//2019-06-20 박길섭
						$(".nav-sidebar").stop().animate({ "left": "-380px" }, 200);
						//2018-12-19 LNB화면 최소화시에도 대상지역 선택 표출 필요
						$("#current-sido-select-2").parent().parent().css({"left":"0","right":"auto"});
						$("#current-sido-select-2").parent().parent().show();
						
						if( $policyStaticMap.ui.soc_yn ){ //생활SOC
							$("#fac-select-div").css({"left":"200px","right":"auto"}).show();
							
							if( $policyStaticMapLeftmenu.ui.idx_id == 'soc_ctgry' ){
								$("#ctgry-select-div").css({"left":"400px","right":"auto"}).show();
							}
						}
						break;
				}
			},
			
			/**
			 * @name             : toggle
			 * @description      : 세부카테고리 show/hide
			 * @date             : 2017. 08. 08.
			 * @author	         : 권차욱
			 * @history 	     :
			 * @param obj  : this
			 */
			toggle:function(obj){
				var ck = $(obj).hasClass("on");
				if(ck){
					$(obj).removeClass("on");
					$(obj).next("ul").hide();
				}else{
					$(obj).addClass("on");	
					$(obj).next("ul").show();
				}
			}
	};
}(window, document));
