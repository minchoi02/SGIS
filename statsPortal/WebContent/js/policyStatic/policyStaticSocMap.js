/**
 * 정책통계지도 생활 SOC
 * 
 * history : 네이버시스템(주), 1.0, 2021/07/13  초기 작성
 * author : jrj
 * version : 1.0
 * see : 
 *
 */

(function(W, D) {
	W.$policyStaticSocMap = W.$policyStaticSocMap || {};
	$(document).ready(function() {
		$policyStaticSocMap.ui.centerMove( $policyStaticMap.ui.mapList[0] );
		$policyStaticSocMap.request.getFacCodeList( $("#fac-type-select-2 option:selected").val(), 'N' );
		
		$("body").on("change", "#fac-type-select-2", function( e, callBack ){
			$policyStaticSocMap.request.getFacCodeList( $("#fac-type-select-2 option:selected").val(), 'N', callBack );
		});
		
		$("body").on("change", "#fac-select-2", function(){
			if( $("#imgMapDiv").hasClass("on") ){
				$("#socImgMap").prop("src", ("/img/policyStatic/soc_wghvr/"+ $("#fac-select-2 option:selected").val() +".jpg"));
			}
			
			$policyStaticSocMap.ui.changeEvent();
		});
		
		$("body").on("change", "#ctgry-select-2", function(){
			$policyStaticSocMap.ui.changeEvent();
		});
		
		$("#imgMapBtn").click(function(){
			if( $policyStaticMapLeftmenu.ui.idx_id ){
				$("#socImgMap").prop("src", ("/img/policyStatic/soc_wghvr/"+ $("#fac-select-2 option:selected").val() +".jpg"));
				$("#imgMapDiv").show().addClass("on");
			} else {
				alert("지표를 조회한 후 클릭해주세요.");
			}
		});
		
		$("#imgMapClose").click(function(){
			$("#imgMapDiv").hide().removeClass("on");
			$("#imgMapBtn").show();
		});
		
		$("#imgMapDiv").draggable({ 
			cursor : "pointer",
			zIndex : 9999,
			appendTo : "body",
			start : function(e, ui) {
			},
			drag : function(e, ui) {
			},
			stop : function(e, ui) {
			}
		});
		
	});
	
	$policyStaticSocMap = {
		noReverseGeoCode : false
	};
	$policyStaticSocMap.ui = {
		cur_ppltn_div_nm : '',  //현재 지표 인구 구분 명칭(총인구,만5-6세,,,등)
		cur_fac_nm : '',		//현재 지표 시설물 명칭
		
		boundaryData : function(res, parameter, options, map) { //callback
			//경계정보 호출 및 draw
			$policyStaticMapApi.ui.setBoundaryData(parameter, res, options, map, function(parameter, map) {
				if (parameter.mapType == "heat") {
					$policyStaticMap.ui.setLegendMode("heat", map);
					$policyStaticMap.ui.setOriginData(options, map);
				}else {
					$policyStaticMap.ui.setLegendMode("color", map);
				}
				
				if( options.admList ){
					if( options.admList[0].length == 2 ){
						$policyStaticSocMap.ui.centerMove( $policyStaticMap.ui.mapList[0] );
					}
				}
			});		
		},
	
		changeEvent : function( gubun ){
			if( $policyStaticMapLeftmenu.ui.idx_id && $(".nav-sidebar").css("left") != "0px" ){
				$policyStaticCombineMap.ui.poiTitleNm = "";
				$policyStaticCombineMap.ui.poiSourceNm = "";
				$policyStaticMapLeftmenu.ui.arrParamList = new Array();
				$policyStaticMapLeftmenu.ui.getPolicyMapInfoByIdxId($policyStaticMap.ui.settingInfo["idx_id"]);
			}
			
		},
		
		//URL로 접근시 parameter 셋팅
		//view/soc/policyStaticSocMap?idx_id=soc_ppltn&adm_cd=37011&fac_cd=B05&region_div=2
		setParam : function(){
			if( $policyStaticMap.ui.soc_yn && $policyStaticSocMap.ui.soc_param
					&& $policyStaticSocMap.ui.soc_param.idx_id ){
				var soc_param = $policyStaticSocMap.ui.soc_param;
				
				console.log( 'soc_param === >> ', soc_param );
				
       			var fac_type = soc_param.fac_cd.substr(0,1);
       			var sgg_cd = soc_param.adm_cd.substr(2,soc_param.adm_cd.length);
       			sgg_cd = ( sgg_cd == '' ? '999' : sgg_cd );
       			
       			$policyStaticSocMap.ui.selBoundLevel = soc_param.region_div;
       			
       			if( soc_param.idx_id == 'soc_ctgry' && soc_param.dstnc_ctgry ){
       				$("#ctgry-select-2").val( soc_param.dstnc_ctgry );
       			}
       			
       			sgg_cd = ( sgg_cd == '010' ? '011,012' : sgg_cd ); //포항시
       			$("#current-sgg-select,#current-sgg-select-2").val( sgg_cd ).trigger("change");
       			
       			$("#fac-type-select-2").val( fac_type ).trigger("change", function(){
	       			$("#fac-select-2").val( soc_param.fac_cd );
	       			
	       			$policyStaticMapLeftmenu.ui.idx_id = soc_param.idx_id;
	       			$("li[idx_id='"+ soc_param.idx_id +"']").click();
       			});
       			
       		}
		},
		
		//경상북도 전체 경계일 경우 center 값 다시 잡아줌
		centerMove : function( map ){
			map.mapMove([(1097754),(1830589)], 3 );
		},
		
		getPpltnName : function( ppltn_div ){
			var ppltn_div_nm = '';
			
			switch( ppltn_div ) {
				case '1': ppltn_div_nm = '총인구'; break;
				case '2': ppltn_div_nm = '유아인구'; break;
				case '3': ppltn_div_nm = '만5_6세'; break;
				case '4': ppltn_div_nm = '초등학생'; break;
				case '5': ppltn_div_nm = '중학생'; break;
				case '6': ppltn_div_nm = '유소년인구'; break;
				case '7': ppltn_div_nm = '생산인구'; break;
				case '8': ppltn_div_nm = '고령인구'; break;
			}
			
			this.cur_ppltn_div_nm = ppltn_div_nm;
		}
		
	};
	
	$policyStaticSocMap.request = {
		//시설물 분류 코드 목록 조회
		getFacCodeList : function( type, access_yn, callBack ){
			console.log('access_yn>>>',access_yn);
			$.ajax({
				method: "POST",
				async: true,
				url: contextPath + "/view/soc/getFacCodeList.json",
				data: {
					fac_ty_cd: type,
					access_yn : access_yn
				},
				dataType: "json",
				success: function(res) {
					console.log( res );
					if( res && res.fac_cl_list ){
						var list = res.fac_cl_list;
						var html = '';
						
						$.each( list, function( idx, item ){
							html += '<option value="'+ item.fac_cd +'">'+item.fac_cl_nm+'</option>';
						});
						
						$("#fac-select-2").html( html ).trigger("change");
						
						if( callBack ){
							callBack();
						}
					}
				},
				error: function(e) {
				}
			});
		}
		
	};
	
	$policyStaticSocMap.event = {};
	
	$policyStaticSocMap.callbackFunc = {};
	
}(window, document));
