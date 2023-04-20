(function(W, D) {
	var activeFillColor = "#c00";
	var activeFillOpacity = "0.7";
	var defaultFillOpacity = "0.2";
	
	W.$houseSearchMap = W.$houseSearchMap || {};
	var searchItem = [];//검색조건 담기
	// 페이지 로드 이벤트
	$(document).ready(function() {
		$houseSearchMap.event.setMapSize();
		$houseSearchMap.ui.createMap("map");
		$houseSearchMap.event.setUIEvent();
		
		$("#idealtype-navigator>li").removeClass("current");	// 간편동네 찾기 step 선택 삭제
		$("#idealtype-navigator>li:first").addClass("current");	// 간편동네 찾기 step1 선택 추가
		$("#ideal-type-step2,#ideal-type-step3").hide();		// step2, step3 숨김
		$("#ideal-type-step1").show();							// step1 표출
		$houseSearchMap.ui.ideal_sido_list();	// 시도 코드 조회
		
		// 조회목록 리스트 안보이도록 설정
		$("#result_list2").animate({height: 0},300);
		
		$(".leftCol .btnNavThematic").click(function(){
			var svg = '<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z" fill="#222222"/></svg>';
	    	if(!$(this).hasClass('active')){
        		$(this).addClass('active');
        		$(".nav-layer").css("display","block");
        	}else{
        		$(this).removeClass('active');
        		$(".nav-layer").css("display","none");
        	}
        });
		
	});

	// 윈도우 크기 변경시 윈도우 맞춤.
	$(window).resize(function() {
		setTimeout(function() {
			$houseSearchMap.event.setMapSize();
		}, 100);
	});
	// 가로세로 모드 변경시 윈도우 맞춤.
	$(window).on("orientationchange", function() {
		setTimeout(function() {
			$houseSearchMap.event.setMapSize();
		}, 100);
	});

	// 페이지 UI 변수 및 함수 선언
	$houseSearchMap.ui = {
		map : null, //지도
		recommendDataGeojson : null,//추천지역
		activeAdmCd : null,//현재 활성화된 곳의 행정동 코드
		originalActiveAdmCd : null,//검색한 행정동 코드
		
		//내 현재위치
		/** 2020.09.08[한광희] 위치 미동의시 기본위치 설정 추가 START */
		my_x : 989749.2142006928, // x
		my_y : 1817802.41717, // y
		my_sido_cd : "25", // 시도코드
		my_sido_nm : "대전광역시", // 시도명
		my_sgg_cd : "030", // 시군구코드
		my_sgg_nm : "서구", // 시군구명
		my_emdong_cd : "60", // 읍면동코드
		my_emdong_nm : "둔산2동", // 읍면동명
		/** 2020.09.08[한광희] 위치 미동의시 기본위치 설정 추가 END */
				
		/**
		 * @name		: step2init
		 * @description : step2 초기화
		 * @date		: 2020.07.08
		 * @author		: 한광희
		 * @history 	:
		 */
		step2init : function(){
			searchItem = [];
			$("#ideal-type-search-item-list ul").empty();
		},
		
		/**
		 * @name		: step3init
		 * @description : step3 초기화
		 * @date		: 2020.07.08
		 * @author		: 한광희
		 * @history 	:
		 */
		step3init : function(){
			$("#ideal-type-final-search-item-list li").remove();
		},
		
		/**
		 * @name		: setSearchItemStep2
		 * @description : step2에 조건 리스트 생성하기
		 * @date		: 2020.07.08
		 * @author		: 한광희
		 * @history 	:
		 */
		setSearchItemStep2 : function(){
			$houseSearchMap.ui.step2init();
			var indicatorArray = [];
			$("#ideal-type-step1 div[data-type=radio][data-search-item=true].on,#ideal-type-step select:not(#ideal-type-sido,#ideal-type-sgg)").each(function(){
				var element;
				if($(this).is("select")){
					element = $(this).children("option:selected");
				}else{
					element = $(this);
				}
				$.each(idealTypeInfoList[$(element).data("parent-id")].children[$(element).data("id")].children,function(cnt,node){
					if(indicatorArray.indexOf(node.b_class_idx_id+node.m_class_idx_id)<=-1){
						indicatorArray.push(node.b_class_idx_id+node.m_class_idx_id);
						$("#"+node.type+"-list").append(
							$("<li/>",{
								"class":"normal",
								"data-b_class_search_serial":node.b_class_search_serial,
								"data-m_class_search_serial":node.m_class_search_serial,
								"data-s_class_search_serial":node.s_class_search_serial,
								"data-type":node.type,
								"text":node.det_exp
							}).click(function(){
								if(!$(this).hasClass("on")&&$("#ideal-type-search-item-list li.on").length>=6){
									common_alert("조회 할수있는 조건은 최대 6개까지입니다");
									return false;
								}
								if($(this).hasClass("on")){
									$(this).removeClass("on");
									var item = $(this);
									$.each(searchItem,function(cnt,node){
										if($(node).is(item)){
											searchItem.splice(cnt, 1);
											return false;
										}
									});
								}else{
									$(this).addClass("on");
									searchItem.push($(this));
								}
							})
						);
					}
				});
			});
			$("#ideal-type-step2").show();
			$("#ideal-type-step1").hide();
		},
		
		/**
		 * @name		: setSearchItemStep3
		 * @description : step3에 조건 리스트 생성하기
		 * @date		: 2020.07.08
		 * @author		: 한광희
		 * @history 	:
		 */
		setSearchItemStep3 : function(){
			if($("#ideal-type-search-item-list li.on").length>0){
				$houseSearchMap.ui.step3init();
				$.each(searchItem,function(cnt,node){
					$("#ideal-type-final-search-item-list").append(
						$("<li/>", {"data-This":"This"}).data({
							"b_class_search_serial":$(node).data("b_class_search_serial"),
							"m_class_search_serial":$(node).data("m_class_search_serial"),
							"s_class_search_serial":$(node).data("s_class_search_serial")
						}).append(
							$("<span/>", {"text":cnt+1}),
							$("<div/>", {"class" : $(node).data("type")}).append(
								$("<p/>", {"text":$(node).text()})
							),
							$("<a/>",{"class":"listDeleteBtn"})
						)
					);
				});
			}else{
				common_alert("조회하실 조건을 선택해주세요");
				return false;
			}
		},
		
		/**
		 * @name : createMap
		 * @description : 지도 생성
		 * @date : 2020.06.25
		 * @author : 한광희
		 * @history :
		 * @param id :
		 *            html tag id
		 */
		createMap : function(id) {
			this.map = new sMap.map();
			this.map.isCurrentLocationMarker = true;
			this.map.isAutoRefreshCensusApi = false;
			this.map.isDrawBoundary = false;
			this.map.center = [ 990480.875, 1815839.375 ];
			this.map.zoom = 1;
			this.map.createMap($houseSearchMap, id, {
			});		
			this.map.gMap.whenReady(function() {
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 START */
				//지도 현재위치로 이동
				$houseSearchMap.ui.map.moveCurrentLocation(true, function() {
					//맵의 중앙 adm_cd 가져오기
					$houseSearchMap.ui.map.getCenterToAdmCd(null, function(res) { 
						var lv_my_center = $houseSearchMap.ui.map.gMap.getCenter();
						$houseSearchMap.ui.my_x = lv_my_center.x;
						$houseSearchMap.ui.my_y = lv_my_center.y;
						$houseSearchMap.ui.my_sido_cd = res.result.sido_cd;
						$houseSearchMap.ui.my_sido_nm = res.result.sido_nm;
						$houseSearchMap.ui.my_sgg_cd = res.result.sgg_cd;
						$houseSearchMap.ui.my_sgg_nm = res.result.sgg_nm;
						$houseSearchMap.ui.my_emdong_cd = res.result.emdong_cd;
						$houseSearchMap.ui.my_emdong_nm = res.result.emdong_nm;
						
						//내 위치 텍스트
						/*$("#myMapAreaText").text($houseSearchMap.ui.my_sido_nm+" "+$houseSearchMap.ui.my_sgg_nm);*/
						//2022-11-21 svg 추가
						var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>';
						$("#myMapAreaText").html($houseSearchMap.ui.my_sido_nm+svg+$houseSearchMap.ui.my_sgg_nm);
					});
				});
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 END */
			});
		},
		
		/**
		 * @name : ideal_sido_list
		 * @description : 시도 목록
		 * @date : 2020.07.08
		 * @author : 한광희
		 * @history :
		 * @param :
		 */
		ideal_sido_list : function(p_sido_cd) {
			// 기본값(전체)
			$("#ideal-type-sido").html("<option value=\"00\" data-x=\"990480.875\" data-y=\"1815839.375\">전국</option>");
			// ajax 시작
			$.ajax({
			    url: openApiPath + "/OpenAPI3/addr/stageWR.json",
			    type: 'get', //api는 get으로 받아야함
			    dataType : 'json',
			    async: false,
			    data: {
			    	accessToken:accessToken,
			    	pg_yn: "0",
			    	bnd_year: bndYear
			    }
			}).done(function (res) { // 완료
				if(res.errCd == "0") {
					var lvResultList = res.result;
					for(var i = 0; i < lvResultList.length; i++) {
						if(lvResultList[i].cd == p_sido_cd) {
							$("#ideal-type-sido").append("<option value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].addr_name+"</option>");
						}
						else {
							$("#ideal-type-sido").append("<option value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].addr_name+"</option>");
						}
					}
				}else if(res.errCd == "-401") {
					//common_alert(res.errMsg);
				}else{
					//common_alert(res.errMsg);
				}
			}).fail(function (res) { // 실패
				//common_alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				//common_loading(false);
			});
			// ajax 끝
		},
		
		/**
		 * @name : ideal_sgg_list
		 * @description : 시군구 목록
		 * @date : 2020.07.08
		 * @author : 한광희
		 * @history :
		 * @param :
		 */
		ideal_sgg_list : function(p_sido_cd, p_sgg_cd) {
			// 기본값(전체)
			$("#ideal-type-sgg").html("<option value=\"999\" data-x=\"990480.875\" data-y=\"1815839.375\">전체</option>");
			// ajax 시작
			$.ajax({
			    url: openApiPath + "/OpenAPI3/addr/stageWR.json",
			    type: 'get', //api는 get으로 받아야함
			    dataType : 'json',
			    async: false,
			    data: {
			    	accessToken: accessToken,
			    	pg_yn: "0",
			    	cd: p_sido_cd,
			    	bnd_year: bndYear
			    }
			}).done(function (res) { // 완료
				if(res.errCd == "0") {
					var lvResultList = res.result;
					for(var i = 0; i < lvResultList.length; i++) {
						if(lvResultList[i].cd.slice(-3) == p_sgg_cd) {
							$("#ideal-type-sgg").append("<option value=\""+ lvResultList[i].cd.slice(-3)+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].addr_name+"</option>");
						}
						else {
							$("#ideal-type-sgg").append("<option value=\""+ lvResultList[i].cd.slice(-3)+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].addr_name+"</option>");
						}
					}
				}else if(res.errCd == "-401") {
					//common_alert(res.errMsg);
				}else{
					//common_alert(res.errMsg);
				}
			}).fail(function (res) { // 실패
				//common_alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				//common_loading(false);
			});
			// ajax 끝
		},
				
		/**
		 * @name            : getMapOptions
		 * @description     : 지도 옵션 얻기
		 * @date            : 2020.07.06
		 * @author	        : 한광희
		 * @history 	    :
		 * @param adm_cd    : 행정동코드
		 */
		getMapOptions:function(adm_cd){
			if(adm_cd){
				adm_cd = adm_cd.toString();
			}
			var zoom = 1,sido_cd="",sgg_cd="",emdong_cd="";
			if(adm_cd&&adm_cd.length>=2&&adm_cd.substring(0,2)!="00"){
				sido_cd = adm_cd.substring(0,2);
				zoom = 2;
				$houseSearchMap.ui.my_sido_cd = adm_cd.substring(0,2);	// 생활환경종합 정보를 위한 시도코드 셋팅
				if(adm_cd.length>=5&&adm_cd.substring(2,5)!="999"){
					sgg_cd = adm_cd.substring(2,5);
					zoom = 4;
					$houseSearchMap.ui.my_sgg_cd = adm_cd.substring(2,5);	// 생활환경종합 정보를 위한 시군구코드 셋팅
					if(adm_cd.length>=7&&adm_cd.substring(5,7)!="00"){
						emdong_cd = adm_cd.substring(5,7);
						zoom = 7;
						$houseSearchMap.ui.my_emdong_cd = adm_cd.substring(5,7);	// 생활환경종합 정보를 위한 읍면동코드 셋팅
					}
				}
			}
						
			return {zoom:zoom,sido_cd:sido_cd,sgg_cd:sgg_cd,emdong_cd:emdong_cd,adm_cd:sido_cd+sgg_cd+emdong_cd};
		},
		
		
		/**
		 * @name                : idealType
		 * @description         : 간편 동네 찾기
		 * @date                : 2020.07.06
		 * @author	            : 한광희
		 * @history 	        :
		*/
		idealType : {
			importance_cd_nm : [],
			importance_cd : [],
			importance_val : [],
			importance_val_text : [],
			importance_asis_val : [],
			importance_search_val : [],
			importance_search_val_text : [],
			importance_disp_lev : [],
			itemArray : [],
			now_resid_sido_cd : null,
			inter_resid_sido_cd : null,
			inter_resid_sgg_cd : null,
			
			init: function(){
				this.importance_cd_nm = [];
				this.importance_cd = [];
				this.importance_val = [];
				this.importance_val_text = [];
				this.importance_asis_val = [];
				this.importance_search_val = [];
				this.importance_search_val_text = [];
				this.importance_disp_lev = [];
				this.itemArray = [];
				this.now_resid_sido_cd = null;                          
				this.now_resid_sgg_cd = null;                          
				this.inter_resid_sido_cd = null; 
				this.inter_resid_sgg_cd = null;
				if($houseSearchMap.ui.recommendDataGeojson){
					$houseSearchMap.ui.recommendDataGeojson.remove();
				}
			},
			search : function(){
				srvLogWrite('O0', '09', '03', '02', '', '');
				var abs = new sop.portal.absAPI();
				this.init();
				if($("#ideal-type-final-search-item-list li[data-this='This']").length>0){
					$("#ideal-type-final-search-item-list li[data-this='This']").each(function(cnt,node){
						if(hasText($(node).data("b_class_search_serial"))&&hasText($(node).data("m_class_search_serial"))&&hasText($(node).data("s_class_search_serial"))){
							var ideal = idealTypeInfoList[$(node).data("b_class_search_serial")].children[$(node).data("m_class_search_serial")].children[$(node).data("s_class_search_serial")];
							var mClassInfo = bClassInfoList[ideal.b_class_idx_id].indicator[ideal.m_class_idx_id];
							if(hasText(ideal)){
								var wghtval = $(node).find("span").text();
								$houseSearchMap.ui.idealType.importance_cd.push(ideal.m_class_idx_id);
								$houseSearchMap.ui.idealType.importance_val.push(6-cnt);
								$houseSearchMap.ui.idealType.importance_asis_val.push(6-cnt);
								$houseSearchMap.ui.idealType.importance_search_val.push(ideal.order_base);
								$houseSearchMap.ui.idealType.importance_disp_lev.push(mClassInfo.disp_level);
							}else{
								console.warn("\""+$(node).find(".title").text()+"\" 지표가 잘못 설정 되어있습니다");
							}
						}else{
							console.warn("\""+$(node).find(".title").text()+"\" 지표가 설정이 되지 않았습니다");
						}
					});
				}else{
					common_alert("우선순위 설정이 잘못되었습니다");
					return false;
				}
				$houseSearchMap.ui.idealType.now_resid_sido_cd = "00"; 
				$houseSearchMap.ui.idealType.now_resid_sgg_cd = "999";
				$houseSearchMap.ui.idealType.inter_resid_sido_cd = $("#ideal-type-sido").val();
				$houseSearchMap.ui.idealType.inter_resid_sgg_cd = $("#ideal-type-sgg").val();
				abs.onBlockUIPopup();
				
				//$("#databoard-area-title").html(dashBoardTitle);
				$houseSearchMap.ui.recommendSearch(abs);
			}
		},
		
		/**
		 * @name                : recommendSearch
		 * @description         : 추천지역찾기 프로세스
		 * @date                : 2020.07.06
		 * @author	            : 한광희
		 * @history 	        :
		*/
		recommendSearch : function(abs){
			$.ajax({
				url : sgisContextPath+"/ServiceAPI/house/recommendAreaLists.geojson",
				type:"POST",
				data: {
					now_resid_sido_cd : "00", 
					now_resid_sgg_cd : "999",
					inter_resid_sido_cd : $houseSearchMap.ui.getRecommendObject().inter_resid_sido_cd,
					inter_resid_sgg_cd : $houseSearchMap.ui.getRecommendObject().inter_resid_sgg_cd,
					importance_cd : $houseSearchMap.ui.getRecommendObject().importance_cd.join(),
					importance_val : $houseSearchMap.ui.getRecommendObject().importance_val.join(),
					base_year : $houseSearchMap.ui.map.bnd_year,
					importance_asis_val : $houseSearchMap.ui.getRecommendObject().importance_val.join(),
					importance_search_val : $houseSearchMap.ui.getRecommendObject().importance_search_val.join(),
					importance_disp_lev : $houseSearchMap.ui.getRecommendObject().importance_disp_lev.join()
				},
				async: true,
				dataType:"json",
				success: function(res){
					var parameter = "";
					parameter += "now_resid_sido_cd=" + $houseSearchMap.ui.getRecommendObject().now_resid_sido_cd + "&";
					parameter += "now_resid_sgg_cd=" + $houseSearchMap.ui.getRecommendObject().now_resid_sgg_cd + "&";
					parameter += "inter_resid_sido_cd=" + $houseSearchMap.ui.getRecommendObject().inter_resid_sido_cd + "&";
					parameter += "inter_resid_sgg_cd=" + $houseSearchMap.ui.getRecommendObject().inter_resid_sgg_cd + "&";
					parameter += "importance_cd=" + $houseSearchMap.ui.getRecommendObject().importance_cd.join() + "&";
					parameter += "importance_val="+ $houseSearchMap.ui.getRecommendObject().importance_val.join() + "&";
					parameter += "base_year=" + $houseSearchMap.ui.map.bnd_year + "&";
					parameter += "importance_asis_val=" + $houseSearchMap.ui.getRecommendObject().importance_val.join() + "&";
					parameter += "importance_search_val=" + $houseSearchMap.ui.getRecommendObject().importance_search_val.join() + "&";
					parameter += "importance_disp_lev=" + $houseSearchMap.ui.getRecommendObject().importance_disp_lev.join() + "&";
					
					var zoomLevel = $houseSearchMap.ui.map.currentDefaultZoom;
					
					if(res.errCd=="0"){
						if(res.features.length>0){
							$("#search-item-box").hide();	// 간편동네 찾기 조회조건 숨김
							$("#house_list_div").empty();	// 추천지역리스트 초기화
														
							var id = uuid();
							var ul = $("<ul/>", {"id":"house_list_ul"});
							$.each(res.features, function(cnt, node){
								if(cnt == 0){
									ul.append($("<li/>", {"class":"gridrow bb", "style":"padding:10px 0"}).append(
										$("<span/>", {"class":"indexnumber on", "text":cnt+1}),
										$("<p/>", {"class":"indextext on", "text":node.properties.adm_nm, "name":"recommend-"+id,"data-coor-x":node.properties.x,"data-coor-y":node.properties.y,"data-adm-cd":node.properties.adm_cd})
									));
								} else {
									ul.append($("<li/>", {"class":"gridrow bb", "style":"padding:10px 0"}).append(
										$("<span/>", {"class":"indexnumber", "text":cnt+1}),
										$("<p/>", {"class":"indextext", "text":node.properties.adm_nm, "name":"recommend-"+id,"data-coor-x":node.properties.x,"data-coor-y":node.properties.y,"data-adm-cd":node.properties.adm_cd})
									));
								}
							});
							
							$("#house_list_div").append(ul);	// 추천지역리스트 셋팅
														
							// 지도 1위 리스트 항목 위치 이동
							var adm_cd = res.features[0].properties.adm_cd;
							$houseSearchMap.ui.map.mapMove([res.features[0].properties.x,res.features[0].properties.y], $houseSearchMap.ui.getMapOptions(adm_cd).zoom, false);
														
							drawRegionPolygon(res);	// 지역에 대한 폴리곤 생성
							$houseSearchMap.ui.activeAdmCd = adm_cd;
							$houseSearchMap.ui.originalActiveAdmCd = adm_cd;
						}else{
							common_alert("검색된 추천지역리스트가 없습니다.");
						}
					}else{
						common_alert(res.errMsg);
					}
					abs.onBlockUIClose();
				},
				error: function(data){
					common_alert(errorMessage);
					abs.onBlockUIClose();
					return false;
				}
			});
		},
		
		/**
		 * @name         : getRecommendObject
		 * @description  : 추천지역찾기 오브젝트 반환
		 * @date         : 2020.07.06
		 * @author	     : 한광희
		 * @history 	 :
		 */
		getRecommendObject : function(){
			return $houseSearchMap.ui.idealType;
		},
		
		/**
		 * @name        : activeLayer
		 * @description : 레이어 활성화
		 * @date        : 2020.07.06
		 * @author	    : 한광희
		 * @history 	:
		 * @param layer	: layer
		 */
		activeLayer : function(layer){
			if($houseSearchMap.ui.recommendDataGeojson){
				$.each($houseSearchMap.ui.recommendDataGeojson.getLayers(),function(cnt,node){
					if(node.options.fillOpacity==activeFillOpacity){
						node.setStyle({
							fillOpacity: defaultFillOpacity
						});
						return false;
					}
				});
				layer.setStyle({
					fillOpacity: activeFillOpacity
				});
				$houseSearchMap.ui.activeAdmCd = layer.feature.properties.adm_cd;
			}
			//$house.databoard.clear();
		},
		
		/**
		 * @name		  : getUniqName
		 * @description   : 원하는 엘리먼트 타입 갖고오기
		 * @date		  : 2020.07.06
		 * @author		  : 한광희
		 * @history 	  :
		 * @param element : jquery selector
		 * @param getType : html attribute name
		 */
		getUniqName : function(element,getType){
			var names = element.map(function() {
				if(/^data-/.test(getType)){
					return $(this).data(getType.replace("data-",""));
				}else{
					return $(this).attr(getType);
				}
			}).get();
			var unique = $.grep(names, function(v, i) {
			    return $.inArray(v, names) === i
			});
			return unique;
		}
	};
	
	// 지도 콜백 함수 선언
	$houseSearchMap.callbackFunc = {
		// 해당경계 선택 시, 발생하는 콜백함수
		didSelectedPolygon : function(event, data, type, map) {
			//console.log("didSelectedPolygon - START");
		}
		// 지도이동. createMap()에서 "movestart" 이벤트 선언시 콜백됨. 
		,didMapMoveStart : function(event, map) {
			//console.log("didMapMoveStart - START");
		}
		// 지도이동종료. createMap()에서 "moveend" 이벤트 선언시 콜백됨.
		,didMapMoveEnd : function(event, map) {
			//console.log("didMapMoveEnd - START");
		}
		// 줌 시작. createMap()에서 "zoomstart" 이벤트 선언시 콜백됨. 
		,didMapZoomStart : function(event, map) {
			//console.log("didMapZoomStart - START");
		}
		// 줌 종료. createMap()에서 "zoomend" 이벤트 선언시 콜백됨. 
		,didMapZoomEnd : function(event, map) {
			//console.log("didMapZoomEnd - START");
		}
		// 지도 드래그. createMap()에서 "drag" 이벤트 선언시 콜백됨. 
		,didMapDrag : function(event, map) {
			//console.log("didMapDrag - START");
		}
		// 지도 드래그 종료. createMap()에서 "dragend" 이벤트 선언시 콜백됨. 
		,didMapDragEnd : function(event, map) {
			//console.log("didMapDragEnd - START");
		}
	};

	$houseSearchMap.event = {
		/**
		 * @name : setUIEvent
		 * @description : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 * @date : 2020.07.06
		 * @author : 한광희
		 * @history :
		 */
		setUIEvent : function() {
			// 상단 영역 클릭시 해당 화면 이동 이벤트
			$("body").on("click", "#idealtype-navigator>li", function(){
				var currentIndex = $(this).data("tab");
				
				if(currentIndex>1 && typeof $houseSearchMap.ui["setSearchItemStep"+(currentIndex)]==="function"){
					if($houseSearchMap.ui["setSearchItemStep"+(currentIndex)]()===false){
						return false;
					}
				}

				$("#idealtype-navigator>li").removeClass("current");
				$("#idealtype-navigator>li:eq("+(currentIndex-1)+")").addClass("current");
				$("#ideal-type-step>.tab-content").hide();
				$("#ideal-type-step>.tab-content:eq("+(currentIndex-1)+")").show();
				$("#ideal-type-step>.tab-content").removeClass("current");
				$("#ideal-type-step>.tab-content:eq("+(currentIndex-1)+")").addClass("current");
				
			});
			
			// 관심동네 선택
			$("body").on("click", "#ideal-type-step div[data-type=radio]", function(){
				var element = $(this);
				$.each($("#ideal-type-step div[data-type=radio][data-name="+$(this).data("name")+"]"),function(){
					var addImagePath = "";
					if($(this).is(element)){
						$(this).addClass("on");
					}else{
						$(this).removeClass("on");
					}
				});
				return false;
			});
			
			// 관심 거주지 변경시
			$("#stand-recommend-location select").change(function(){
				$.ajax({
					url : sgisContextPath+"/ServiceAPI/house/standardAreaLists.json",
					type:"POST",
					data: {
						sido_cd : $("#stand-recommend-sido").val(),
						sgg_cd : $("#stand-recommend-sgg").val()
					},
					async: true,
					dataType:"json",
					success: function(res){
						if(res.errCd=="0"){
							$.each(res.result.summaryList,function(cnt,node){
								var parent = $("#recommend-box .indecator-item[data-id="+node.m_class_idx_id+"]").parent();
								var step = parent.children(".SetStepSelect");
								var orderStrong = parent.find(".bagic strong");
								parent.find(".bagic").data("value",node.order);
								if(node.order=="1"){
									orderStrong.text(" 하");
								}else if(node.order=="2"){
									orderStrong.text(" 중");
								}else if(node.order=="3"){
									orderStrong.text(" 상");
								}
							});
						}
					},
					error: function(data){
						common_alert(errorMessage);
						return false;
					}
				});
			});
			
			//일자리 찾기 팝업 시도 변경시 시군구 불러오기
			$(document).on("change", "#ideal-type-sido", function() {
				$houseSearchMap.ui.ideal_sgg_list($(this).val());
			});
			
			// 희망거주유형 선택
			$("body").on("click", ".sfbSchool li>a", function(){
				$(".sfbSchool li>a").removeClass("current");
				$(this).addClass("current");
			});
			
			/** 간편동네 찾기 다음,이전 버튼 이벤트 START */
			$("body").on("click", "button[name=nextPage], button[name=prevPage]", function(){
				
				var boxIndex = $("#ideal-type-step>.tab-content").index($(this).parents(".tab-content"));
				var currentIndex;
				if($(this).attr("name") == "nextPage"){
					currentIndex = boxIndex+1;
					if(currentIndex>0 && typeof $houseSearchMap.ui["setSearchItemStep"+(currentIndex+1)]==="function"){
						if($houseSearchMap.ui["setSearchItemStep"+(currentIndex+1)]()===false){
							return false;
						}
					}
				} else if($(this).attr("name") == "prevPage"){
					currentIndex = boxIndex-1;
				} else {
					return false;
				}
				$("#idealtype-navigator>li").removeClass("current");
				$("#idealtype-navigator>li:eq("+currentIndex+")").addClass("current");
				$("#ideal-type-step>.tab-content").hide();
				$("#ideal-type-step>.tab-content:eq("+currentIndex+")").show();
				$("#ideal-type-step>.tab-content").removeClass("current");
				$("#ideal-type-step>.tab-content:eq("+currentIndex+")").addClass("current");
				
			});
			/** 간편동네 찾기 다음,이전 버튼 이벤트 END */
			
			//step3(우선순위설정)에서 순서 변경
			$("#ideal-type-final-search-item-list").sortable({
				update: function(event, ui) {
					$("#ideal-type-final-search-item-list li div").each(function(cnt,node){
						$(node).parent().find("span").text(cnt+1);
					});
				}
			});
		    $("#ideal-type-final-search-item-list").disableSelection();
		    
		    // 추천지역리스트 위아래 스와이프 펼치기/접기
			$("#houseListBtn").swipe({
	            threshold : 10,
	            //펼치기
	            swipeUp:function(event, direction) {
	               $("#result_list2").animate({height: 280},300);
	            },
	            //접기
	            swipeDown:function(event, direction) {
	               $("#result_list2").animate({height: 0},300);
	            },
	            //클릭
	            tap:function(event, target) {
	               if($("#result_list2").height() > 0){
	                  $("#result_list2").animate({height: 0},300);
	                  $(".swiperBtn").removeClass("close"); // 버튼 화살표 변경되도록 class 추가
/*	               } else {
		                  $("#result_list").animate({height: 280},300);
*/
	                  $('.Btnarea h2.tit svg').css({'transform':'rotate(180deg)'});
	                  $(".sop-map-pane").css("transform","translate3d(0px,0px,0px)"); //2022-11-03 추가
	               } else {
	                  $("#result_list2").animate({height: 280},300);
	                  $(".swiperBtn").addClass("close"); // 버튼 화살표 변경되도록 class 추가
	                  $("#common_popup_area").css("display","none"); //관심지역 닫기
	                  $('.Btnarea h2.tit svg').css({'transform':'rotate(0deg)'});
	                  $(".sop-map-pane").css("transform","translate3d(0px,-200px,0px)"); //2022-11-03 추가
	                  $(".nav-layer").css("display","none"); //2022-11-15 추가
	  				  $(".leftCol .btnNavThematic").removeClass('active');
	               }
	            }
	         });
		    
			// 추천지역 리스트 클릭 이벤트
			$("body").on("click", "#house_list_div .gridrow>p.indextext", function(){
				srvLogWrite('O0', '09', '03', '03', $(this).text(), '');
				$("#house_list_div").find(".on").removeClass("on");	// 추천지역 리스트 on class 삭제
				$(this).parent().find("span").addClass("on");	// 추천지역 리스트 선택한 항목 class 추가
				$(this).parent().find("p").addClass("on");	// 추천지역 리스트 선택한 항목 class 추가
				$("#result_list2").animate({height: 0},300); //2022-11-03 추가
				
				var map = $houseSearchMap.ui.map;
				if(map.dataBoundary){
					map.isAutoRefreshCensusApi = false;
					map.dataBoundary.remove();
				}
				var adm_cd = $(this).data("adm-cd").toString();
				$houseSearchMap.ui.activeAdmCd = adm_cd;
				$houseSearchMap.ui.originalActiveAdmCd = adm_cd;
				$houseSearchMap.ui.map.mapMove([$(this).data("coor-x"),$(this).data("coor-y")],$houseSearchMap.ui.getMapOptions(adm_cd).zoom);
				$.each($houseSearchMap.ui.recommendDataGeojson.getLayers(),function(cnt,node){
					if(node.feature.properties.adm_cd==adm_cd){
						map.gMap.fitBounds(node,{
							animate : false
						});
						node.fire("click");
						return false;
					}
				});
			});
			
			// 우선순위 설정 화면 목록 X 버튼 이벤트
			$(document).on("click", ".listDeleteBtn", function(event){
				event.stopPropagation();
				$(this).parents("li").remove();	// 해당 li 삭제
				
				// 우선순위 항목 순위 재 설정
				$("#ideal-type-final-search-item-list li").each(function(cnt,node){
					$(node).find("span").text(cnt+1);
				});
			});
			
			//생활환경 정보 이미지 클릭
			$(document).on("click", "#lifeEnvironmentToggle", function() {
				srvLogWrite('O0', '51', '02', '01', '', '');
				var lvThis = $(this);
				// 표시
				if(lvThis.hasClass("infoOff")) {
					lifeEnvironmentToggle(true, $houseSearchMap.ui.my_sido_cd, $houseSearchMap.ui.my_sgg_cd, $houseSearchMap.ui.my_emdong_cd);
				}
				// 감춤
				else {
					lifeEnvironmentToggle(false);
				}
				//2022-11-15 추가
				$(".nav-layer").css("display","none");
				$(".leftCol .btnNavThematic").removeClass('active');
			});
			
			//생활환경 정보 상세보기
			$(document).on("click", "#lifeEnvironmentPopup_open", function() {
				srvLogWrite('O0', '51', '02', '02', '', '');
				var lvThis = $(this);
				var lvSidoCd = lvThis.attr("sido_cd");
				var lvSggCd = lvThis.attr("sgg_cd");
				var lvEmdongCd = lvThis.attr("emdong_cd");
				if(lvSidoCd == "null") lvSidoCd = "";
				if(lvSggCd == "null") lvSggCd = "";
				if(lvEmdongCd == "null") lvEmdongCd = "";
				if(lvSidoCd != undefined && lvSidoCd != null && lvSidoCd != "" && lvSidoCd != "99") {
					lifeEnvironmentPopupSelect(lvSidoCd, lvSggCd, lvEmdongCd);
				}
			});
			
			//생활환경 팝업 닫기
			$(document).on("click", "#lifeEnvironmentPopup_close", function() {
				lifeEnvironmentPopupToggle(false);
			});
			
			//생활환경 팝업 구분 선택
			$(document).on("click", "#lifeEnvironmentPopup_list > ul > li.infoMenu", function() {
				var lvThis = $(this);
				var lvThisIndex = lvThis.data("index");
				var lvThisText = lvThis.children("a").text();
				
				//메뉴 선택
				$("#lifeEnvironmentPopup_list > ul > li.infoMenu").removeClass("on");
				lvThis.addClass("on");
				
				//화면 표시
				$("#lifeEnvironmentPopup div.infoPage").hide();
				$("#lifeEnvironmentPopup_page_"+lvThisIndex).show();
			});	
			
			/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 START */
			//현재위치로 이동 버튼
			$(document).on("click", "#myMapLocation", function() {
				//위치동의 팝업 호출
				common_localtion(
					//지도변수
						$houseSearchMap.ui.map,
					//위치 동의함
					function(my_x, my_y, my_sido_cd, my_sido_nm, my_sgg_cd, my_sgg_nm, my_emdong_cd, my_emdong_nm) {
						//변수 입력
						$houseSearchMap.ui.my_x = my_x;
						$houseSearchMap.ui.my_y = my_y;
						$houseSearchMap.ui.my_sido_cd = my_sido_cd;
						$houseSearchMap.ui.my_sido_nm = my_sido_nm;
						$houseSearchMap.ui.my_sgg_cd = my_sgg_cd;
						$houseSearchMap.ui.my_sgg_nm = my_sgg_nm;
						$houseSearchMap.ui.my_emdong_cd = my_emdong_cd;
						$houseSearchMap.ui.my_emdong_nm = my_emdong_nm;
						
						//내 위치 텍스트
						//$("#myMapAreaText").text($houseSearchMap.ui.my_sido_nm+" "+$houseSearchMap.ui.my_sgg_nm);
						//2022-11-21 svg 추가
						var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>';
						$("#myMapAreaText").html($houseSearchMap.ui.my_sido_nm+svg+$houseSearchMap.ui.my_sgg_nm);
					},
					//위치 미동의함
					function() {
					}
				);
			});
			/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 END */
		},
		
		/**
		 * @name : setMapSize
		 * @description : 지도 사이즈 변경
		 * @date : 2020.06.25
		 * @author : 한광희
		 * @history :
		 */
		setMapSize : function() {
			var lvMapHeight = Number($(window).outerHeight(true)) - Number($(".Wrap>.Header").outerHeight(true));
			$("#map").height(lvMapHeight);
		}		
	};
	
	
	/**
	 * @name         : drawRegionPolygon
	 * @description  : 지역에 대한 폴리곤 생성
	 * @date         : 2020.07.06
	 * @author	     : 한광희
	 * @history 	 :
	 * @param data   : 폴리곤 생성해줄 데이터
	 */
	function drawRegionPolygon(data){
		var map = $houseSearchMap.ui.map;
		var defaultStyle = {
			weight : 1.25,
			opacity : 1,
			color : "white",
			dashArray: "",
			fillOpacity : defaultFillOpacity,
			fillColor : activeFillColor,
			type:"region",
		};
		$houseSearchMap.ui.recommendDataGeojson = sop.geoJson(data, {
			style: function (feature) {
				var style = $.extend(true, {}, defaultStyle);
				if(feature.properties.fillColor){
					style.fillColor = feature.properties.fillColor;
				}
				return style;
			},
			onEachFeature: function (feature, layer) {
				layer.on("click",function(e){
					$houseSearchMap.ui.recommendDataGeojson.eachLayer(function(layer) {
						layer.removeCaption();
					});
					layer.setCaption({title:layer.feature.properties.adm_nm, color:"#000",size:"15px"}, [layer.feature.properties.x,layer.feature.properties.y]);
					if(layer.captionObj&&layer.captionObj._captionspan){
						$(layer.captionObj._captionspan).click(function(e){
							$.each($houseSearchMap.ui.recommendDataGeojson.getLayers(),function(cnt,recommendLayer){
								if(recommendLayer._containsPoint ) {
									var point = $houseSearchMap.ui.map.gMap.mouseEventToLayerPoint(e); // 터치 포인트
									if( recommendLayer._containsPoint(point)){
										recommendLayer.fire("click");
									}
								}
							});
						});
						$(layer.captionObj._captionspan).css({
							"font-family": "나눔고딕B",
							"text-shadow": "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
							"-moz-text-shadow": "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
							"-webkit-text-shadow": "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"
						});
					}
					$houseSearchMap.ui.activeLayer(layer);
					
					/** 지도에서 선택한 지역 리스트에서 선택 및 스크롤 이동 START */
					$("#house_list_div").find(".on").removeClass("on");	// 추천지역 리스트 on class 삭제
					$("#house_list_div").find("p[data-adm-cd="+layer.feature.properties.adm_cd+"]").parent().find("span").addClass("on");
					$("#house_list_div").find("p[data-adm-cd="+layer.feature.properties.adm_cd+"]").parent().find("p").addClass("on");
					var scroll = $("#house_list_div").find("p[data-adm-cd="+layer.feature.properties.adm_cd+"]").parent().position();
					$("#house_list_div").stop().animate({
						scrollTop: $("#house_list_div").find("p[data-adm-cd="+layer.feature.properties.adm_cd+"]").parent().offset().top-$("#house_list_div").children("ul").offset().top
					}, 801);
					/** 지도에서 선택한 지역 리스트에서 선택 및 스크롤 이동 END */
					
					if($houseSearchMap.ui.recommendMarker){
						$houseSearchMap.ui.recommendMarker.remove();
					}
					$houseSearchMap.ui.recommendMarker = sop.marker([layer.feature.properties.x,layer.feature.properties.y],{adm_cd:layer.feature.properties.adm_cd});
					$houseSearchMap.ui.recommendMarker.addTo(map.gMap);
				});
			}
		}).addTo(map.gMap);
		if($houseSearchMap.ui.recommendDataGeojson){
			$houseSearchMap.ui.recommendDataGeojson.getLayers()[0].fire("click");
		}
	}
}(window, document));	