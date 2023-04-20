(function(W, D) {
	var activeFillColor = "#c00";
	var activeFillOpacity = "0.7";
	var defaultFillOpacity = "0.2";
	var dataAreaSize = 350;
	
	W.$recomendHouseMap = W.$recomendHouseMap || {};

	// 페이지 로드 이벤트
	$(document).ready(function() {
		//생활환경 상단 리스트 좌우 스크롤
		$("#houseMap_list").touchFlow({
			axis : "x"
		});
				
		$recomendHouseMap.event.setMapSize();
		$recomendHouseMap.ui.createMap("map");
		$recomendHouseMap.event.setUIEvent();	
		
		
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
        
		/* 2022-11-24 이벤트 추가  */
		$(".nav-layer li").click(function(){
			$(this).addClass('on3');
		});
		
	});

	// 윈도우 크기 변경시 윈도우 맞춤.
	$(window).resize(function() {
		setTimeout(function() {
			$recomendHouseMap.event.setMapSize();
		}, 100);
	});
	// 가로세로 모드 변경시 윈도우 맞춤.
	$(window).on("orientationchange", function() {
		setTimeout(function() {
			$recomendHouseMap.event.setMapSize();
		}, 100);
	});

	// 페이지 UI 변수 및 함수 선언
	$recomendHouseMap.ui = {
		map : null, //지도
		recommendDataGeojson : null,//추천지역
		activeAdmCd : null,//현재 활성화된 곳의 행정동 코드
		originalActiveAdmCd : null,//검색한 행정동 코드
		databoardAdmCd : null,	// 데이터보드 지역코드
		
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
		
		descIndicatorChart ://지표별 상세현황 막대차트 내림차순 정렬할 지표 
		[
			"HMM0006"/*주택-노후주택비율*/,"HMM0008"/*주택-면적당 아파트가격*/,
			"HMM0013"/*안전-화재안전*/,"HMM0014"/*안전-교통사고안전*/,
			"HMM0020"/*교육-교원 1인당 학생수*/,
			"HMM0023"/*복지문화-유치원 및 보육시설*/,"HMM0024"/*복지문화-병의원 및 약국*/,"HMM0025"/*복지문화-노인복지시설*/,"HMM0026",/*복지문화-사회복지시설*/
			"HMM0028"/*안전-범죄안전*/,"HMM0029"/*안전-안전사고*/,"HMM0030"/*안전-자살안전*/,"HMM0031"/*안전-감염병 안전*/,"HMM0032"/*안전-자연재해 안전*/
		],
		bClassInfoList : {
			"HML0001": {
				text:"자연",
				rgbColor:"137,190,75"
			},
			"HML0002": {
				text:"주택",
				rgbColor:"82,157,197"
			},
			"HML0003": {
				text:"지역 인구",
				rgbColor:"236,128,171"
			},
			"HML0004": {
				text:"안전",
				rgbColor:"245,207,90"
			},
			"HML0005": {
				text:"생활 편의 교통",
				rgbColor:"90,183,183"
			},
			"HML0006": {
				text:"교육",
				rgbColor:"139,131,201"
			},
			"HML0007": {
				text:"복지 문화",
				rgbColor:"28,44,129"
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
			this.map.createMap($recomendHouseMap, id, {
			});		
			this.map.gMap.whenReady(function() {
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 START */
				//지도 현재위치로 이동
				$recomendHouseMap.ui.map.moveCurrentLocation(true, function() {
					//맵의 중앙 adm_cd 가져오기
					$recomendHouseMap.ui.map.getCenterToAdmCd(null, function(res) { 
						var lv_my_center = $recomendHouseMap.ui.map.gMap.getCenter();
						$recomendHouseMap.ui.my_x = lv_my_center.x;
						$recomendHouseMap.ui.my_y = lv_my_center.y;
						$recomendHouseMap.ui.my_sido_cd = res.result.sido_cd;
						$recomendHouseMap.ui.my_sido_nm = res.result.sido_nm;
						$recomendHouseMap.ui.my_sgg_cd = res.result.sgg_cd;
						$recomendHouseMap.ui.my_sgg_nm = res.result.sgg_nm;
						$recomendHouseMap.ui.my_emdong_cd = res.result.emdong_cd;
						$recomendHouseMap.ui.my_emdong_nm = res.result.emdong_nm;
						
						//내 위치 텍스트
						/*$("#myMapAreaText").text($recomendHouseMap.ui.my_sido_nm+" "+$recomendHouseMap.ui.my_sgg_nm);*/
						//2022-11-21 svg 추가
						var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>';
						$("#myMapAreaText").html($recomendHouseMap.ui.my_sido_nm+svg+$recomendHouseMap.ui.my_sgg_nm);
					});
				});
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 END */
			});
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
				$recomendHouseMap.ui.my_sido_cd = adm_cd.substring(0,2);	// 생활환경종합 정보를 위한 시도코드 셋팅
				if(adm_cd.length>=5&&adm_cd.substring(2,5)!="999"){
					sgg_cd = adm_cd.substring(2,5);
					zoom = 4;
					$recomendHouseMap.ui.my_sgg_cd = adm_cd.substring(2,5);	// 생활환경종합 정보를 위한 시군구코드 셋팅
					if(adm_cd.length>=7&&adm_cd.substring(5,7)!="00"){
						emdong_cd = adm_cd.substring(5,7);
						zoom = 7;
						$recomendHouseMap.ui.my_emdong_cd = adm_cd.substring(5,7);	// 생활환경종합 정보를 위한 읍면동코드 셋팅
					}
				}
			}
						
			return {zoom:zoom,sido_cd:sido_cd,sgg_cd:sgg_cd,emdong_cd:emdong_cd,adm_cd:sido_cd+sgg_cd+emdong_cd};
		},
		
		
		/**
		 * @name                : recommend
		 * @description         : 추천지역찾기
		 * @date                : 2020.07.06
		 * @author	            : 한광희
		 * @history 	        :
		*/
		recommend : {
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
			inter_resid_sido_cd : "00",
			inter_resid_sgg_cd : "999",
			
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
				this.inter_resid_sido_cd = "00"; 
				this.inter_resid_sgg_cd = "999";
				if($recomendHouseMap.ui.recommendDataGeojson){
					$recomendHouseMap.ui.recommendDataGeojson.remove();
				}
			},
			
			search : function(){
				var abs = new sop.portal.absAPI();
				if($("input:checkbox[name=houseIndex]:checked").length > 0){
					this.init();
					$recomendHouseMap.ui.recommendMarker = null;
					abs.onBlockUIPopup();
					$("input:checkbox[name=houseIndex]:checked").each(function(){
						$recomendHouseMap.ui.recommend.importance_cd_nm.push($(this).parent().find("label").data("subj")); // 지표 id 명
						$recomendHouseMap.ui.recommend.importance_cd.push($(this).parent().find("label").data("id")); // 지표 id 값
						$recomendHouseMap.ui.recommend.importance_val.push($(this).parent().parent().find("select").val());	// 가중치 값
						$recomendHouseMap.ui.recommend.importance_val_text.push($(this).parent().parent().find("select option:checked").text());	// 가중치 값 명칭
						$recomendHouseMap.ui.recommend.importance_asis_val.push($(this).parent().parent().find("span").data("value"));	// 기준지역표 값
						$recomendHouseMap.ui.recommend.importance_search_val.push($(this).parent().parent().find("a.on").data("value"));	// 정렬기준 값
						$recomendHouseMap.ui.recommend.importance_search_val_text.push($(this).parent().parent().find("a.on").text());	// 정렬기준 명칭
						$recomendHouseMap.ui.recommend.importance_disp_lev.push($(this).parent().find("label").data("level"));	// level
						$recomendHouseMap.ui.recommend.now_resid_sido_cd = "00";	// 기준지역 시도코드
						$recomendHouseMap.ui.recommend.now_resid_sgg_cd = "999";	// 기준지역 시군구코드
					});
					srvLogWrite('O0', '09', '02', '03', $recomendHouseMap.ui.recommend.importance_cd_nm.join(","), '');
				} else {
					common_alert("지표설정을 하나이상 선택 해주세요.");
					return;
				}
				
				$recomendHouseMap.ui.recommendSearch(abs);
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
					inter_resid_sido_cd : $recomendHouseMap.ui.getRecommendObject().inter_resid_sido_cd,
					inter_resid_sgg_cd : $recomendHouseMap.ui.getRecommendObject().inter_resid_sgg_cd,
					importance_cd : $recomendHouseMap.ui.getRecommendObject().importance_cd.join(),
					importance_val : $recomendHouseMap.ui.getRecommendObject().importance_val.join(),
					base_year : $recomendHouseMap.ui.map.bnd_year,
					importance_asis_val : $recomendHouseMap.ui.getRecommendObject().importance_val.join(),
					importance_search_val : $recomendHouseMap.ui.getRecommendObject().importance_search_val.join(),
					importance_disp_lev : $recomendHouseMap.ui.getRecommendObject().importance_disp_lev.join()
				},
				async: true,
				dataType:"json",
				success: function(res){
					var parameter = "";
					parameter += "now_resid_sido_cd=" + $recomendHouseMap.ui.getRecommendObject().now_resid_sido_cd + "&";
					parameter += "now_resid_sgg_cd=" + $recomendHouseMap.ui.getRecommendObject().now_resid_sgg_cd + "&";
					parameter += "inter_resid_sido_cd=" + $recomendHouseMap.ui.getRecommendObject().inter_resid_sido_cd + "&";
					parameter += "inter_resid_sgg_cd=" + $recomendHouseMap.ui.getRecommendObject().inter_resid_sgg_cd + "&";
					parameter += "importance_cd=" + $recomendHouseMap.ui.getRecommendObject().importance_cd.join() + "&";
					parameter += "importance_val="+ $recomendHouseMap.ui.getRecommendObject().importance_val.join() + "&";
					parameter += "base_year=" + $recomendHouseMap.ui.map.bnd_year + "&";
					parameter += "importance_asis_val=" + $recomendHouseMap.ui.getRecommendObject().importance_val.join() + "&";
					parameter += "importance_search_val=" + $recomendHouseMap.ui.getRecommendObject().importance_search_val.join() + "&";
					parameter += "importance_disp_lev=" + $recomendHouseMap.ui.getRecommendObject().importance_disp_lev.join() + "&";
					
					var zoomLevel = $recomendHouseMap.ui.map.currentDefaultZoom;
					
					if(res.errCd=="0"){
						if(res.features.length>0){
							$("#search-item-box").hide();	// 지표설정 숨김
							$("#house_list_div").empty();	// 추천지역리스트 초기화
							
							/** 추천지역리스트 영역에 지표 설정 선택한 이미지 표출 START */
							$("#recommendSelectItemImg").empty();
							var img = [];
							$.each($recomendHouseMap.ui.recommend.importance_cd, function(cnt, node){
								img.push($("<img/>", {"src": contextPath+"/resources/m2020/images/sub/house/icon_"+node+".png",
													  "data-id": node,
													  "data-original-title":"<div style='text-align:left;white-space: nowrap;'> 지표명 : "+$recomendHouseMap.ui.recommend.importance_cd_nm[cnt]+"<br>중요도 : "+$recomendHouseMap.ui.recommend.importance_search_val_text[cnt]+"<br>가중치 : "+$recomendHouseMap.ui.recommend.importance_val_text[cnt]+"</div>",
													  "data-html":true
													  }).tooltip()
										);
							});
							$("#recommendSelectItemImg").append(img);
							/** 추천지역리스트 영역에 지표 설정 선택한 이미지 표출 END */
							
							var id = uuid();
							var ul = $("<ul/>", {"id":"house_list_ul"});
							$.each(res.features, function(cnt, node){
								if(cnt == 0){
									ul.append($("<li/>", {"class":"gridrow bb", "style":"padding:10px 0; flex-direction: column;"}).append(
										$("<div/>", {"class" : "gridrowSub"}).append(
											$("<span/>", {"class":"indexnumber on", "text":cnt+1}),
											$("<p/>", {"class":"indextext on", "text":node.properties.adm_nm, "name":"recommend-"+id,"data-coor-x":node.properties.x,"data-coor-y":node.properties.y,"data-adm-cd":node.properties.adm_cd}),
											$("<a/>", {"class":"databoardBtn", "text":"데이터보드"}),
											$("<a/>", {"class":"databoardDdrop", "data-index":cnt+1})
										),										
										$("<div/>", {"id":"hopeCardbox_"+(cnt+1), "style":"display:flex; width: 100%; flex-direction: row;"})
									));
								} else {
									ul.append($("<li/>", {"class":"gridrow bb", "style":"padding:10px 0; flex-direction: column;"}).append(
										$("<div/>", {"class" : "gridrowSub"}).append(
											$("<span/>", {"class":"indexnumber", "text":cnt+1}),
											$("<p/>", {"class":"indextext", "text":node.properties.adm_nm, "name":"recommend-"+id,"data-coor-x":node.properties.x,"data-coor-y":node.properties.y,"data-adm-cd":node.properties.adm_cd}),
											$("<a/>", {"class":"databoardBtn", "text":"데이터보드"}),
											$("<a/>", {"class":"databoardDdrop", "data-index":cnt+1})										
										),
										$("<div/>", {"id":"hopeCardbox_"+(cnt+1), "style":"display:flex; width: 100%; flex-direction: row;"})
									));
								}
							});
							
							$("#house_list_div").append(ul);	// 추천지역리스트 셋팅
														
							// 지도 1위 리스트 항목 위치 이동
							var adm_cd = res.features[0].properties.adm_cd;
							$recomendHouseMap.ui.map.mapMove([res.features[0].properties.x,res.features[0].properties.y], $recomendHouseMap.ui.getMapOptions(adm_cd).zoom, false);
							
							$("#maptit").text(res.features[0].properties.adm_nm);	// 지도 상단 영역 추천지역리스트 선택한 지역명칭 표시
							
							drawRegionPolygon(res);	// 지역에 대한 폴리곤 생성
							$recomendHouseMap.ui.activeAdmCd = adm_cd;
							$recomendHouseMap.ui.originalActiveAdmCd = adm_cd;
							
							// 조회목록 리스트 안보이도록 설정
							$("#result_list2").animate({height: 0},300);
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
			return $recomendHouseMap.ui.recommend;
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
			if($recomendHouseMap.ui.recommendDataGeojson){
				$.each($recomendHouseMap.ui.recommendDataGeojson.getLayers(),function(cnt,node){
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
				$recomendHouseMap.ui.activeAdmCd = layer.feature.properties.adm_cd;
			}
		},
		
		/**
		 * @name        : smallLocationChartBridge
		 * @description : 소지역정보 차트 그리기
		 * @date        : 2020.07.27
		 * @author	    : 한광희
		 * @history     :
		 * @param index : 0=(연령대별 인구),1=(주택종류),2=(자가/임차),3=(사업체 수)
		 */
		smallLocationChartBridge :function(index){
			if(index==0){//연령대별 인구
				getChartAdmCd(function(isSido,adm_cd){
					ageGroupChart(isSido,adm_cd);
				});
			}else if(index==1){//주택종류
				getChartAdmCd(function(isSido,adm_cd){
					houseChart(isSido,adm_cd);
				});
			}else if(index==2){//사업체 수
				companyChart();
			}else{
				return;
			}
		}
	};
	
	// 지도 콜백 함수 선언
	$recomendHouseMap.callbackFunc = {
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
	
	$recomendHouseMap.event = {
		/**
		 * @name : setUIEvent
		 * @description : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 * @date : 2020.07.06
		 * @author : 한광희
		 * @history :
		 */
		setUIEvent : function() {
			
			// 추천지역찾기 지표 대분류 선택
			$("#housetab li[class^=infoMenu]>a").click(function(){
				var continueStatus = true;
				
				if($(this).is(".on")){
					continueStatus = false;
				}
				
				if(continueStatus){
					$(this).parents("#housetab").find("li[class^=infoMenu]").removeClass("on");
					$(this).parent("li").addClass("on");
					
					var indexPageId = "#house_indexPage_" + $(this).parent("li").attr("data-index");
					$(".hopelifeCardWrap").css('display', 'none');
					$(indexPageId).css('display', 'block');
				}
				
				return false;
			});
			
			// 추천지역찾기 지표설정 중분류(중요도) 박스 선택
			$("body").on("click", ".hopeCard", function(){
				$(this).find("input[type='checkbox']").trigger("click");
			});
			
			/** 2020.09.15[한광희] 추천지역찾기 지표설정 체크 이미지 선택 START */
			// 추천지역찾기 지표설정 중분류(중요도) 체크 이미지 선택
			$("body").on("click", ".hopeCard label", function(e){
				e.stopPropagation();
				$(this).find("input[type='checkbox']").trigger("click");
			});
			/** 2020.09.15[한광희] 추천지역찾기 지표설정 체크 이미지 선택 END */
			
			// 추천지역찾기 지표설정 중분류(중요도) 선택
			$(".hopeCard_check input[type='checkbox']").click(function(){
				if($("input:checkbox[name=houseIndex]:checked").length > 9){
					$(this).prop("checked", false);
					common_alert("최대 9개까지 선택하실 수 있습니다.");
					return;
				}
				
				// 각 대분류별 중분류 선택 건수 셋팅
				var checkCnt = $(this).parent().parent().parent().parent().find("input:checkbox[name=houseIndex]:checked").length;
				if(checkCnt > 0){
					$("#housetab").find("a[data-id="+$(this).data("parent-id")+"]").parent().children("span").html(checkCnt);
					$("#housetab").find("a[data-id="+$(this).data("parent-id")+"]").parent().children("span").addClass("lifeMenucount");					
				} else {
					$("#housetab").find("a[data-id="+$(this).data("parent-id")+"]").parent().children("span").html("");
					$("#housetab").find("a[data-id="+$(this).data("parent-id")+"]").parent().children("span").removeClass("lifeMenucount");
				}
			});
			
			//추천지역 찾기 정렬 기준 버튼 클릭 이벤트
			$(".cardList a").click(function(){
				$(this).parent().find("a").removeClass("on");
				$(this).addClass("on");
			});
			
			// 재설정 버튼 클릭 이벤트
			$("#house_item_reset").click(function(){
				// 선택 항목 초기화
				$(".hopeCard_check>input:checkbox[name=houseIndex]").prop("checked", false);
				$("#selectLifeStyle").html("");
				$("#housetab").find("span").html("");
				$("#housetab").find("span").removeClass("lifeMenucount");
				$("#housetab li[class^=infoMenu]>a[data-id='HML0001']").trigger("click");
				
				// 지표설정 화면
				$("#search-item-box").show();
			});
			
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
	                  $(".sop-map-pane").css("transform","translate3d(0px,0px,0px)"); //2022-10-24 이벤트 추가
	               } else {
	                  $("#result_list2").animate({height: 280},300);
	                  $(".swiperBtn").addClass("close"); // 버튼 화살표 변경되도록 class 추가
	                  $("#common_popup_area").css("display","none"); //관심지역 닫기
	                  $('.Btnarea h2.tit svg').css({'transform':'rotate(0deg)'});
	                  $(".sop-map-pane").css("transform","translate3d(0px,-200px,0px)"); //2022-10-24 이벤트 추가
	                  $(".nav-layer").css("display","none"); //2022-11-15 추가
	  				  $(".leftCol .btnNavThematic").removeClass('active');
	               }
	            }
	         });
			
			// 추천지역 리스트 클릭 이벤트
			$("body").on("click", "#house_list_div p.indextext", function(){
				srvLogWrite('O0', '09', '02', '04', $(this).text(), '');
				$("#house_list_div").find(".on").removeClass("on");	// 추천지역 리스트 on class 삭제
				$(this).parent().find("span").addClass("on");	// 추천지역 리스트 선택한 항목 class 추가
				$(this).parent().find("p").addClass("on");	// 추천지역 리스트 선택한 항목 class 추가
				$("#result_list2").animate({height: 0},300); //2022-11-03 추가
				
				var map = $recomendHouseMap.ui.map;
				if(map.dataBoundary){
					map.isAutoRefreshCensusApi = false;
					map.dataBoundary.remove();
				}
				var adm_cd = $(this).data("adm-cd").toString();
				$("#maptit").text($(this).text());	// 지도 상단 영역 추천지역리스트 선택한 지역명칭 표시
				$recomendHouseMap.ui.activeAdmCd = adm_cd;
				$recomendHouseMap.ui.originalActiveAdmCd = adm_cd;
				$recomendHouseMap.ui.map.mapMove([$(this).data("coor-x"),$(this).data("coor-y")],$recomendHouseMap.ui.getMapOptions(adm_cd).zoom);
				$.each($recomendHouseMap.ui.recommendDataGeojson.getLayers(),function(cnt,node){
					if(node.feature.properties.adm_cd==adm_cd){
						map.gMap.fitBounds(node,{
							animate : false
						});
						node.fire("click");
						return false;
					}
				});
			});
			
			// 추천지역 리스트 더보기 클릭
			$("body").on("click", ".databoardDdrop", function(){
				var adm_cd = $(this).parent().children("p").data("adm-cd");
				var mapOption = $recomendHouseMap.ui.getMapOptions(adm_cd);
				var totalMapOption = $recomendHouseMap.ui.getMapOptions("00");
				var year = $recomendHouseMap.ui.map.bnd_year;
				var elementId = $(this).parent().parent().find("div:eq(1)").attr("id");
				var elementItem = [];
				var tempIndex = $(this).data("index");
				
				if($(this).is(".on")){
					$(this).removeClass("on");
					$("#"+elementId).hide();
				} else {
					$(this).addClass("on");
					$("#"+elementId).show();
					
					if($("#"+elementId).find("ul").length == 0){
						/** 추천지역리스트 더보기 화면 셋팅 START */
						$.each($recomendHouseMap.ui.recommend.importance_cd, function(cnt, node){
							elementItem.push(
								$("<li/>", {"style":"box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px; width: auto;"}).append(
									$("<div/>", {"class":"hopeCardbox", "id":elementId+"_"+node, "style":"width:100%;"}).append(
										$("<div/>", {"class":"hopeCard", "style":"width: 165px; flex: 1 auto; min-height: 150px;"}).append(
											$("<ul/>", {"class":"cardList"}).append(
												$("<li/>", {"style":"width: 150px;"}).append(
													$("<img/>", {"src": contextPath+"/resources/m2020/images/sub/house/icon_"+node+".png"})
												),
												$("<li/>", {"class":"cardList-tit", "style":"font-size: 14px;", "text":$("#"+node).parent().find("label").data("text")}),
												$("<li/>", {"class":"conLi"}).append(
													$("<p/>", {"text":"전국"}),
													$("<div/>").append(
														$("<span/>", { "style":"color:#2DC2DA; padding-left: 10px; font-size: 13px;", "id":"country_"+tempIndex+"_"+node}),
														$("<span/>", {"style":"font-size: 13px; color: #596070; font-weight: 500;"})
													)
												),
												$("<li/>", {"class":"conLi"}).append(
													$("<p/>", {"text":"현재지역"}),
													$("<div/>").append(
														$("<span/>", {"style":"color:#f26c5e; padding-left: 10px; font-size: 13px;", "id":"this_"+tempIndex+"_"+node}),
														$("<span/>", {"style":"font-size: 13px; color: #596070; font-weight: 500;"})
													)
												)
											)
										)
									)
								)
							);
						});

						$("#"+elementId).append(
							$("<ul/>", {"style":"display: flex; flex-direction: row;"}).append(elementItem)	
						);
						// 추천지역리스트 더보기 좌우 스크롤
						$("#"+elementId).find("span.swiper-notification").remove();
						$("#"+elementId).find("ul:first").addClass("swiper-wrapper");
						$("#"+elementId).find("ul:first>li").addClass("swiper-slide");
						var swiper = new Swiper("#"+elementId, {
							slidesPerView: 'auto',
							spaceBetween: 2,
							pagination : {
								el : '.swiper-pagination',
								clickable : true,
							},
						});
						/*$("#"+elementId).touchFlow({
							axis : "x"
						});*/
						/** 추천지역리스트 더보기 화면 셋팅 END */
						
						// 추천지역리스트 더보기 데이터 셋팅
						$.each($recomendHouseMap.ui.recommend.importance_cd, function(cnt, node){
							// 전국
							setRecomendAreaAvgText(elementId, bClassInfoList[$("#"+node).data("parent-id")].indicator[node], totalMapOption, year, "Y");
							// 현재지역
							setRecomendAreaAvgText(elementId, bClassInfoList[$("#"+node).data("parent-id")].indicator[node], mapOption, year, "N");
						});
					}
				}
				
			});
			
			// 데이터보드 클릭
			$("body").on("click", ".databoardBtn", function(){
				srvLogWrite('O0', '09', '02', '05', ' ', '');
				$("#databoard-area").show();
				$(".nav-layer").hide();
				$(".btnNavThematic").removeClass("active");
				$recomendHouseMap.ui.databoardAdmCd = $(this).parent().find("p").data("adm-cd");
				$(".gallery-thumbBox").find("a:first").click();	// 데이터보드 지역종합현황보기 클릭
				$(this).parent().find("p").click();	// 선택한 데이터보드의 추천지역 클릭 이벤트
			});
			
			// 데이터보드 탭 클릭
			$("body").on("click", ".gallery-thumbBox a", function(){
				$(".gallery-thumbstxt div").removeClass("current");
				$(this).parent().parent().addClass("current");
				$("#databoard-box>.Detail2_1").hide();
				$("#databoard-box>.Detail2_1:eq("+$(this).parent().parent().index()+")").show();
				
				if($(this).parent().parent().index() == 0){	// 지역종합현황보기
					regionSpiderChart($recomendHouseMap.ui.databoardAdmCd);
				} else if($(this).parent().parent().index() == 1){	// 지표별 상세현황
					// 지표별 상세현황 리스트 좌우 스크롤
					$("#recomendHouse-databoard-tab").touchFlow({
						axis : "x"
					});
					$("#recomendHouse-databoard-tab").data("touchFlow").go_page(0);
										
					indicatorChart(bClassInfoList[Object.keys(bClassInfoList)[0]].indicator[Object.keys(bClassInfoList[Object.keys(bClassInfoList)[0]].indicator)[0]]);
				} else if($(this).parent().parent().index() == 2){	// 소지역정보
					$recomendHouseMap.ui.smallLocationChartBridge(0);
				}
			});
			
			// 데이터보드 지표별상세현황 분류 클릭
			$("body").on("click", "#recomendHouse-databoard-tab li[class^=infoMenu]>a", function(){				
				var continueStatus = true;
				
				if($(this).is(".on")){
					continueStatus = false;
				}
				
				if(continueStatus){
					$(this).parents("#recomendHouse-databoard-tab").find("li[class^=infoMenu]").removeClass("on");
					$(this).parent("li").addClass("on");
					
					var indexPageId = "#indicator-navigator_" + $(this).parent("li").attr("data-index");
					$("#indicator-navigator>div").css('display', 'none');
					$(indexPageId).css('display', 'flex');
					$(indexPageId).find("[data-class-type=m]:first").click();	// 지표별 상세현황 첫번째 중분류 선택
				}
				
				return false;				
			});
			
			// 지표별 상세현황 중분류 클릭
			$("body").on("click", "#indicator-navigator [data-class-type=m]", function(){
				$(this).parent().parent().find("div").removeClass("on");
				$(this).parent().addClass("on");
				$("#indicator-navigator [data-class-type=m]").removeClass("on");
				$(this).addClass("on");
				if($("#indicator-chart").highcharts()){
					$("#indicator-chart").highcharts().destroy();
				}				
				indicatorChart(bClassInfoList[$(this).data("parent-id")].indicator[$(this).data("id")]);
				return false;
			});
			
			// 소지역정보 탭 클릭
			$("body").on("click", "#databoard-box .houseDatatabWrap a.tab-item", function(){
				$(this).parents(".houseDatatabWrap").find(".houseDatatab").removeClass("on");
				$(this).parent().addClass("on");
				$(this).parents(".Detail2_1").find(".TabArea").hide()
				$(this).parents(".Detail2_1").find(".TabArea:eq("+$(this).parent().index()+")").show();
				$recomendHouseMap.ui.smallLocationChartBridge($(this).parent().index());
				return false;
			});
		
			// 관심지역 이미지 클릭
			$("body").on("click", "#selectArea", function(){
				common_area(
					"sgg",	// 관심지역 표출 범위
					$recomendHouseMap.ui.my_sido_cd,
					$recomendHouseMap.ui.my_sgg_cd,
					"", // 읍면동 코드
					// 변경
					function(x_coor, y_coor, sido_cd, sido_nm, sgg_cd, sgg_nm, emdong_cd, emdong_nm) {
						//변수 입력
						$recomendHouseMap.ui.my_x = x_coor;
						$recomendHouseMap.ui.my_y = y_coor;
						$recomendHouseMap.ui.my_sido_cd = sido_cd;
						$recomendHouseMap.ui.my_sido_nm = sido_nm;
						$recomendHouseMap.ui.my_sgg_cd = sgg_cd;
						$recomendHouseMap.ui.my_sgg_nm = sgg_nm;
						$recomendHouseMap.ui.my_emdong_cd = "";
						$recomendHouseMap.ui.my_emdong_nm = "";
						
						$recomendHouseMap.ui.recommend.inter_resid_sido_cd = sido_cd;	// 관심지역 시도코드
						$recomendHouseMap.ui.recommend.inter_resid_sgg_cd = sgg_cd;	// 관심지역 시군구코드
						
						// 지도 초기화
						if($recomendHouseMap.ui.recommendDataGeojson){
							$recomendHouseMap.ui.recommendDataGeojson.remove();
						}
						// 조회
						var abs = new sop.portal.absAPI();
						$recomendHouseMap.ui.recommendSearch(abs);
					},
					// 취소
					function() {
					}
				);
				
				$("#result_list2").animate({height: 0},300);
				//2022-11-15 추가
				$(".nav-layer").css("display","none");
				$(".leftCol .btnNavThematic").removeClass('active');
				
			});
			
			// 라이프스타일 별 지표설정 버튼 클릭 이벤트
			$("body").on("click", "#lifeStyle", function(){
				$("#lifeStyle-box").show();
				return false;
			});
			
			// 라이프스타일 선택 이벤트
			$("body").on("click", "#lifeStyleList>div", function(){
				srvLogWrite('O0', '09', '02', '02', $(this).find("p").text(), '');
				/** 2020.09.02[한광희] 라이프스타일 선택 수정 START */
				if(!$(this).is(".on")){
					// 선택
					$("#lifeStyleList>div").removeClass("on");
					$(this).addClass("on");
					$("#selectLifeStyle").text(" : " + $(this).find("p").text());	// 지표설정 화면 선택한 라이프스타일 명칭 셋팅					
				} else {
					// 재 선택시 선택 안됨으로 표시
					$("#lifeStyleList>div").removeClass("on");
					$("#selectLifeStyle").text("");	// 지표설정 화면 선택한 라이프스타일 명칭 셋팅
				}
				/** 2020.09.02[한광희] 라이프스타일 선택 수정 END */
			});
			
			// 라이프스타일 선택완료 버튼 클릭 이벤트
			$("body").on("click", "#lifestyleSelect_ok", function(){
				/** 2020.09.02[한광희] 라이프스타일 미선택시 alert 표출 START */
				if($("#lifeStyleList>div").is(".on")){
					$(".hopeCard_check>input:checkbox[name=houseIndex]").prop("checked", false);
					$("#housetab").find("span").html("");
					$("#housetab").find("span").removeClass("lifeMenucount");
					
					var items = $("#lifeStyleList>div.on").data("items");
					$.each(items, function(cnt, node){
						/** 지표 대분류 탭 선택 START */
						if(cnt==0 && !$("#housetab li[class^=infoMenu]>a[data-id="+node.b_class_idx_id+"]").parent("li").hasClass("on")){
							$("#housetab li[class^=infoMenu]>a[data-id="+node.b_class_idx_id+"]").trigger("click");
						}
						/** 지표 대분류 탭 선택 END */
						
						$(".hopeCard_check>input:checkbox[id="+node.m_class_idx_id+"]").trigger("click");	// 지표 중분류 선택
						$(".hopeCard>ul>li .SetStepSelect[id="+node.m_class_idx_id+"]").val(node.wghtval).attr("selected",true);	// 지표 중분류 가중치 선택
						$(".hopeCard>ul>li>a:"+(node.order_base_disp=='2'&&node.default_value=='0'?'first':'last')).trigger("click");	// 지표 중분류 정렬기준 선택
						
					});
					
					$("#lifeStyle-box").hide();
				} else {
					common_alert("라이프스타일을 선택하세요.");
				}
				/** 2020.09.02[한광희] 라이프스타일 미선택시 alert 표출 END */
			});
			
			/** 2020.09.02[한광희 라이프스타일 닫기버튼 이벤트 수정 START */
			// 라이프스타일 닫기버튼 클릭 시 초기화 이벤트
			$("body").on("click", "#lifestyleSelect_close", function(){
				$("#lifeStyleList>div").removeClass("on");
				$("#selectLifeStyle").text("");	// 지표설정 화면 선택한 라이프스타일 명칭 셋팅
				$('#lifeStyle-box').hide();
				
				/** 2020.09.15[한광희] 이전버튼 클릭시 선택된 지표 초기화 START */
				$(".hopeCard_check>input:checkbox[name=houseIndex]").prop("checked", false);
				$("#housetab").find("span").html("");
				$("#housetab").find("span").removeClass("lifeMenucount");
				$("#housetab li[class^=infoMenu]>a[data-id='HML0001']").trigger("click");
				/** 2020.09.15[한광희] 이전버튼 클릭시 선택된 지표 초기화 END */
				
				return false
			});
			/** 2020.09.02[한광희 라이프스타일 닫기버튼 이벤트 수정 END */
			
			//생활환경 정보 이미지 클릭
			$(document).on("click", "#lifeEnvironmentToggle", function() {
				srvLogWrite('O0', '51', '02', '01', '', '');
				var lvThis = $(this);
				// 표시
				if(lvThis.hasClass("infoOff")) {
					lifeEnvironmentToggle(true, $recomendHouseMap.ui.my_sido_cd, $recomendHouseMap.ui.my_sgg_cd, $recomendHouseMap.ui.my_emdong_cd);
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
			
			//현재위치로 이동 버튼
			$(document).on("click", "#myMapLocation", function() {
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 START */
				//위치동의 팝업 호출
				common_localtion(
					//지도변수
						$recomendHouseMap.ui.map,
					//위치 동의함
					function(my_x, my_y, my_sido_cd, my_sido_nm, my_sgg_cd, my_sgg_nm, my_emdong_cd, my_emdong_nm) {
						//변수 입력
						$recomendHouseMap.ui.my_x = my_x;
						$recomendHouseMap.ui.my_y = my_y;
						$recomendHouseMap.ui.my_sido_cd = my_sido_cd;
						$recomendHouseMap.ui.my_sido_nm = my_sido_nm;
						$recomendHouseMap.ui.my_sgg_cd = my_sgg_cd;
						$recomendHouseMap.ui.my_sgg_nm = my_sgg_nm;
						$recomendHouseMap.ui.my_emdong_cd = my_emdong_cd;
						$recomendHouseMap.ui.my_emdong_nm = my_emdong_nm;
						
						//내 위치 텍스트
						/*$("#myMapAreaText").text($recomendHouseMap.ui.my_sido_nm+" "+$recomendHouseMap.ui.my_sgg_nm);*/
						//2022-11-21 svg 추가
						var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>';
						$("#myMapAreaText").html($recomendHouseMap.ui.my_sido_nm+svg+$recomendHouseMap.ui.my_sgg_nm);
						
					},
					//위치 미동의함
					function() {
					}
				);
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 END */
			});
			
			$(".TabArea .origin_txt.census").text("출처 : "+censusDataYear+" 인구주택총조사");
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
		var map = $recomendHouseMap.ui.map;
		var defaultStyle = {
			weight : 1.25,
			opacity : 1,
			color : "white",
			dashArray: "",
			fillOpacity : defaultFillOpacity,
			fillColor : activeFillColor,
			type:"region",
		};
		$recomendHouseMap.ui.recommendDataGeojson = sop.geoJson(data, {
			style: function (feature) {
				var style = $.extend(true, {}, defaultStyle);
				if(feature.properties.fillColor){
					style.fillColor = feature.properties.fillColor;
				}
				return style;
			},
			onEachFeature: function (feature, layer) {
				layer.on("click",function(e){
					$recomendHouseMap.ui.recommendDataGeojson.eachLayer(function(layer) {
						layer.removeCaption();
					});
					layer.setCaption({title:layer.feature.properties.adm_nm, color:"#000",size:"15px"}, [layer.feature.properties.x,layer.feature.properties.y]);
					if(layer.captionObj&&layer.captionObj._captionspan){
						$(layer.captionObj._captionspan).click(function(e){
							$.each($recomendHouseMap.ui.recommendDataGeojson.getLayers(),function(cnt,recommendLayer){
								if(recommendLayer._containsPoint ) {
									var point = $recomendHouseMap.ui.map.gMap.mouseEventToLayerPoint(e); // 터치 포인트
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
					$recomendHouseMap.ui.activeLayer(layer);
					
					// 선택한 지역 명칭 설정
					$("#maptit").text(layer.feature.properties.adm_nm);
					/** 지도에서 선택한 지역 리스트에서 선택 및 스크롤 이동 START */
					$("#house_list_div").find("span").removeClass("on");	// 추천지역 리스트 on class 삭제
					$("#house_list_div").find("p").removeClass("on");	// 추천지역 리스트 on class 삭제
					$("#house_list_div").find("p[data-adm-cd="+layer.feature.properties.adm_cd+"]").parent().find("span").addClass("on");
					$("#house_list_div").find("p[data-adm-cd="+layer.feature.properties.adm_cd+"]").parent().find("p").addClass("on");
					var scroll = $("#house_list_div").find("p[data-adm-cd="+layer.feature.properties.adm_cd+"]").parent().position();
					$("#house_list_div").stop().animate({
						scrollTop: $("#house_list_div").find("p[data-adm-cd="+layer.feature.properties.adm_cd+"]").parent().parent().offset().top-$("#house_list_div").children("ul").offset().top
					}, 801);
					/** 지도에서 선택한 지역 리스트에서 선택 및 스크롤 이동 END */
					
					if($recomendHouseMap.ui.recommendMarker){
						$recomendHouseMap.ui.recommendMarker.remove();
					}
					$recomendHouseMap.ui.recommendMarker = sop.marker([layer.feature.properties.x,layer.feature.properties.y],{adm_cd:layer.feature.properties.adm_cd});
					$recomendHouseMap.ui.recommendMarker.addTo(map.gMap);
				});
			}
		}).addTo(map.gMap);
		if($recomendHouseMap.ui.recommendDataGeojson){
			$recomendHouseMap.ui.recommendDataGeojson.getLayers()[0].fire("click");
		}
	}
	
	/**
	 * @name          : getChartHeight
	 * @description   : 차트 높이 구하기
	 * @date          : 2020.07.21
	 * @author	      : 한광희
	 * @history 	  :
	 * @param sido_cd : 시도코드
	 */
	function getChartHeight(){
		var chartHeight = $("#databoard-area").height()-dataAreaSize;
		if(chartHeight<200){
			chartHeight = $(window).height();
		}
		return chartHeight;
	}
	
	/**
	 * @name            : regionSpiderChart
	 * @description     : 지역종합현황보기 스파이더 차트 그리기
	 * @date            : 2020.07.21
	 * @author	        : 한광희
	 * @history 	    :
	 */
	function regionSpiderChart(p_adm_cd){
		var abs = new sop.portal.absAPI();
		abs.onBlockUIPopup();
		var adm_cd = p_adm_cd;
		var mapOption = $recomendHouseMap.ui.getMapOptions(adm_cd);
		$houseMap.api.areaIndexChartLists($recomendHouseMap.ui.map.bnd_year, mapOption.sido_cd,mapOption.sgg_cd,mapOption.emdong_cd,null,function(res){
			var sido_nm="",sgg_nm="",emdong_nm="";
			if (res.errCd == "0") {
				var getValueName = "z_score";
				function calc(list){
					var array = [];
					if(list&&list.length>0){
						$.each(list,function(cnt,node){
							array.push(parseFloat(node[getValueName]));
						});
					}
					return array;
				}
				function appendLabelName(selector,appendName){
					selector.update({name:appendName+selector.name+" 평균"});
				}
				var categories = [];
				var series = [];
				$.each($recomendHouseMap.ui.bClassInfoList,function(cnt,node){
					categories.push(node.text);
				});
				
				// 전국 데이터는 무조건 5로 하드코딩으로 변경
				function changeCountryZscore(obj){
					$.each(obj.list,function(){
						this.z_score = "5";
					});
				}
				changeCountryZscore(res.result.country);
				series.push({name:"전국",data:calc(res.result.country.list)});
				if(mapOption.sgg_cd&&mapOption.sgg_cd!="999"){
					if(mapOption.emdong_cd&&mapOption.emdong_cd!="00"){
						series.push({name:res.result.sgg.info.addr,data:calc(res.result.sgg.list)})
						series.push({name:res.result.emdong.info.addr,data:calc(res.result.emdong.list)})
					}else{
						series.push({name:res.result.sido.info.addr,data:calc(res.result.sido.list)});
						series.push({name:res.result.sgg.info.addr,data:calc(res.result.sgg.list)})
					}
				}else{
					series.push({name:res.result.sido.info.addr,data:calc(res.result.sido.list)});
				}
				
				// 전국평균
				var tempAllZScore = 0;
				if(series[0].data.length > 0){
					for(var i = 0; i < series[0].data.length; i++){
						tempAllZScore += series[0].data[i];
					}
					$("#databoard_page_0_all_avg").html(((new Number(tempAllZScore / series[0].data.length).toFixed(2) * 100) / 100));
				} else {
					$("#databoard_page_0_all_avg").html("0");
				}
				// 추천지역 평균
				$("#databoard_page_0_this_title").text(series[2].name + " 평균");
				var tempThisZScore = 0;
				if(series[2].data.length > 0){
					for(var i = 0; i < series[2].data.length; i++){
						tempThisZScore += series[2].data[i];
					}
					$("#databoard_page_0_this_avg").html(((new Number(tempThisZScore / series[2].data.length).toFixed(2) * 100) / 100));
				} else {
					$("#databoard_page_0_this_avg").html("0");
				}
				
				var maxResult = -10;
				var selectwgtval = 0;
				for(var i=0; i<series[series.length-1].data.length; i++){
					var tempResult = parseFloat(series[series.length-1].data[i]);
					if(maxResult <= tempResult){
						maxResult = tempResult;
						selectwgtval = i;
					}
				}
				var interArea = $.extend(true, {}, series[series.length-1]);
				var compareSeries = [interArea];
				$houseMap.api.areaIndexChartLists($recomendHouseMap.ui.map.bnd_year,"00","999",null,null,function(res){
					if(res.errCd=="0"){
						// 종합 탭 하단 지표 설정을 위한 전국 정보 저장
						var tempCountryList = [];
						for(var i = 0; i < res.result.country.list.length; i++){
							tempCountryList.push(res.result.country.list[i].z_score);
						}
						
						// 전국 값 5로 셋팅
						changeCountryZscore(res.result.country);
						compareSeries.unshift({name:"전국",data:calc(res.result.country.list)});
						
						//차트 생성
						$("#databoard_page_0_chart").highcharts({
							chart: {
						        polar: true,
						        type: "line",
						        margin: [0, 50, 0, 50]
						    },
						    colors: ["#a1c1e5", "#f26c5e"],
						    title: {
						        text: ""
						    },
						    xAxis: {
						        categories: categories,
						        tickmarkPlacement: "on",
						        lineWidth: 0
						    },
						    yAxis: {
						        gridLineInterpolation: "polygon",
						        lineWidth: 0,
						        min: 0,
						        max: 10,
						        minorTickInterval: 1
						    },
						    tooltip: {
						        shared: true
						    },
						    legend: {
						        enabled: false
						    },
						    series: [{
						        name: compareSeries[0].name,
						        data: compareSeries[0].data,
						        pointPlacement: "on",
						        marker: {
						        	symbol: "circle"
						        }
						    }, {
						        name: compareSeries[1].name,
						        data: compareSeries[1].data,
						        pointPlacement: "on",
						        marker: {
						        	symbol: "circle"
						        }
						    }]
						});
						
						/** 종합 탭 - 하단 지표 셋팅 START */	
						var maxResult = -10;
						var selectwgtval = 0;
						for(var i=0; i<compareSeries[0].data.length; i++){
							var tempResult = parseFloat(compareSeries[1].data[i]);
							if(maxResult <= tempResult){
								maxResult = tempResult;
								selectwgtval = i;
							}
						}
						// 종합 지표 이미지 link
						// 자연
						var tmepImgSrc = "";
						if(categories[selectwgtval] == "자연"){
							tmepImgSrc = contextPath+"/resources/m2020/images/common/icon_info_menu1.png";
						}
						// 주택
						else if(categories[selectwgtval] == "주택"){
							tmepImgSrc = contextPath+"/resources/m2020/images/common/icon_info_menu2.png";
						}
						// 지역인구
						else if(categories[selectwgtval] == "지역 인구"){
							tmepImgSrc = contextPath+"/resources/m2020/images/common/icon_info_menu3.png";
						} 
						// 안전
						else if(categories[selectwgtval] == "안전"){
							tmepImgSrc = contextPath+"/resources/m2020/images/common/icon_info_menu4.png";
						} 
						// 생활편의교통
						else if(categories[selectwgtval] == "생활 편의 교통"){
							tmepImgSrc = contextPath+"/resources/m2020/images/common/icon_info_menu5.png";
						}
						// 교육
						else if(categories[selectwgtval] == "교육"){
							tmepImgSrc = contextPath+"/resources/m2020/images/common/icon_info_menu6.png";
						}
						// 복지문화
						else if(categories[selectwgtval] == "복지 문화"){
							tmepImgSrc = contextPath+"/resources/m2020/images/common/icon_info_menu7.png";
						}
						$("#databoard_page_0_info_img").attr("src", tmepImgSrc);

						// 종합 지표 타이틀
						$("#databoard_page_0_info_title").text(categories[selectwgtval]+" 좋음");
						// 지역명
						$("#databoard_page_0_this_admNm").text(compareSeries[1].name);	
						// 종합 지표(전국) 값
						$("#databoard_page_0_info_all").text(tempCountryList[selectwgtval]);
						// 종합 지표(지역) 값
						var tempScore = (compareSeries[1].data[selectwgtval] - tempCountryList[selectwgtval]).toFixed(2);
						var infoThisHtml = "";
						if(tempScore > 0){
							$("#databoard_page_0_info_this").text(compareSeries[1].data[selectwgtval]+ " (▲ " + tempScore + ")");
							$("#databoard_page_0_info_this").addClass("i_red");
							$("#databoard_page_0_info_this").removeClass("i_blue");
						} else if(tempScore < 0){
							$("#databoard_page_0_info_this").text(compareSeries[1].data[selectwgtval]+ " (▼ " + tempScore + ")");
							$("#databoard_page_0_info_this").removeClass("i_red");
							$("#databoard_page_0_info_this").addClass("i_blue");
						}
						/** 종합 탭 - 하단 지표 셋팅 END */
					}
				});
			} else if (res.errCd == "-100") {
				console.warn(res.errMsg);
			} else {
				common_alert(res.errMsg);
			}
			abs.onBlockUIClose();
		});
	}
	
	/**
	 * @name               : indicatorChart
	 * @description        : 지표별 상세현황
	 * @date               : 2020.07.27
	 * @author	           : 한광희
	 * @history 	       :
	 * @param mClassObject : 중분류
	 */
	function indicatorChart(mClassObject){
		//기준지역 표시 유무
		var isSetStand = true;
		/**
		 * 기준 그래프 제외 대상
		 * 생활편의교통 
		 *      - 편의시설 수 : HMM0015
		 *      - 쇼핑시설 수 : HMM0016
		 *      - 외식시설 수 : HMM0017
		 *      - 잡화점 수 : HMM0033
		 * 교육 
		 *      - 고등교육기관 수 : HMM0021
		 *      - 학원 수 : HMM0022
		 * 복지문화 
		 *      - 문화시설 수 : HMM0027
		 *      - 체육시설 수 : HMM0027
		 */
		if(/^HMM00(15|16|17|21|22|27|33|34)$/.test(mClassObject.m_class_idx_id)){
			isSetStand = false;
		}
		var abs = new sop.portal.absAPI();
		abs.onBlockUIPopup();
		$("#indicator-avg-list,#stand-indicator-avg-list").empty().hide();
		$("th[data-stand=true]").hide();
		var adm_cd = $recomendHouseMap.ui.databoardAdmCd;
		var mapOption = $recomendHouseMap.ui.getMapOptions(adm_cd);
		var year = $recomendHouseMap.ui.map.bnd_year,searchLevel;
		if(!hasText(mapOption.adm_cd)){
			searchLevel = 1;
		}else if(mapOption.adm_cd.length==2){
			searchLevel = 2;
		}else if(mapOption.adm_cd.length>=5){
			searchLevel = 3;
		}
		if(searchLevel>mClassObject.disp_level){
			searchLevel = mClassObject.disp_level;
		}
		setAvgText($("#indicator-avg-list"),mClassObject,mapOption,year,searchLevel,"N",isSetStand);
		setIndicatorData(mClassObject,"00",isSetStand,function(standResponse){
			var standData={};
			if(hasText(standResponse.result.emdong)){
				standData = standResponse.result.emdong
			}else if(hasText(standResponse.result.sgg)){
				standData = standResponse.result.sgg
			}else if(hasText(standResponse.result.sido)){
				standData = standResponse.result.sido
			}else if(hasText(standResponse.result.country)){
				standData = standResponse.result.country
			}
			$houseMap.api.houseAnalysisOrderLists(searchLevel,mClassObject.b_class_idx_id,mClassObject.m_class_idx_id,year,mapOption.sido_cd,mapOption.sgg_cd,function(res){
				var data = [];
				var lineData = [];
				$.each(res.result,function(cnt,node){
					var short_adm_nm,y;
					if(mClassObject.b_class_idx_id=="HML0001"&&(mClassObject.m_class_idx_id=="HMM0001"||mClassObject.m_class_idx_id=="HMM0002")){
						y = parseFloat(node.z_score);
					}else{
						y = parseFloat(node.value);
					}
					data.push({
						name : node.short_adm_nm,
						y : y,
						color : (mapOption.adm_cd.substring(0,node.adm_cd.length)==node.adm_cd?"#FF0000":"#ccc")
					});
					lineData.push({
						y : parseFloat(standData.avg_value)
					});
				});
				var title;
				if(mClassObject.m_class_idx_id=="HMM0023"){
					title = "보육시설 대비 5세이하 인구 수";
				}else if(mClassObject.m_class_idx_id=="HMM0024"){
					title = "병의원 및 약국 대비 인구 수";
				}else if(mClassObject.m_class_idx_id=="HMM0025"){
					title = "노인복지시설 대비 65세 이상 인구 수";
				}else if(mClassObject.m_class_idx_id=="HMM0026"){
					title = "사회복지시설 대비 인구 수";
				}else{
					title = mClassObject.m_class_idx_nm;
				}
				data = data.sort(dynamicSort(($recomendHouseMap.ui.descIndicatorChart.indexOf(mClassObject.m_class_idx_id)>-1?"-":"")+"y"));
				if(isSetStand){
					data.unshift({
						name : "<br>기준 : "+standData.adm_nm,
						y : parseFloat(standData.avg_value),
						color : "#0054FF"
					});
					lineData.unshift({
						y : parseFloat(standData.avg_value)
					});
					drawIndicatorChart(title, res.result[0].unit, data,{
						type: 'spline',
		                data: lineData,
		                lineColor : "#0054FF",
		                marker: {
		                	enabled: false
		                },
		                enableMouseTracking: false
					});
				}else{
					drawIndicatorChart(title, res.result[0].unit, data,{});
				}
				abs.onBlockUIClose();
			});
		});
	}
	
	/**
	 * @name                      : chart
	 * @description               : 지표별 상세현황 차트 그리기
	 * @date                      : 2020.07.20
	 * @author                    : 한광희
	 * @history                   :
	 * @param dataName            : 데이터 이름
	 * @param unit                : 단위
	 * @param data                : 데이터 : [{name:"이름",y:"y축 값"}]
	 * @param lineData            : 선 데이터
	 */
	function drawIndicatorChart(dataName, unit, data, lineData) {
		var xAxisLabelIndex = 0;
		var xAxisCat = [];
		$.each(data,function(cnt,node){
			xAxisCat.push(node.name.split(";")[0]);
		});
		var datalength = data.length-1;
		var series = {
			data: data,
			type: "column",
			tooltip: {valueSuffix: ""}
		};
		var chartHeight = getChartHeight()-100;
		var chartOption = {
			backgroundColor: 'white',
			width: $(window).width(),
			height: chartHeight
		};
		var seriesArray;
		if(hasText(lineData)){
			seriesArray = [series,lineData];
		}else{
			seriesArray = [series];
		}
		$("#indicator-chart").highcharts({
			chart: chartOption,
			title: {
				text: ''
			},
			xAxis: {
				categories: xAxisCat,
				type: "category",
				labels: {
					enabled: false
				}
			},
			yAxis: {
				title: {
					text: ''
				},
				labels: {
					enabled: true
				}
			},
			series: seriesArray,
			tooltip: {
				formatter : function(){
					var header = '<div><span>'+this.points[0].key.replace("<br>", "").split(";")[0]+'</span><div/>';
					var pointer = "";
					$.each(this.points,function(){
						pointer+='<div><span style="color:'+this.series.color+';padding:0">'+dataName+': </span><span style="font-weight: bold;">'+appendCommaToNumber(this.y)+'</span>'+(unit?"("+unit+")":"")+'</div>';
					});
					return header+pointer;
				},
				shared: true,
				useHTML: true
			},
			plotOptions: {
				column: {
					borderWidth: 0
				},
				series: {
					cursor: 'pointer',
					point: {
						events: {
							click: function(e) {
								this.series.chart.tooltip.refresh([this]);
							}
						}
					}
				}
			},
			legend: {
				enabled: false
			}
		});
	}
	
	/**
	 * @name               : setAvgText
	 * @description        : 상세별 지표현황 평균값 셋팅
	 * @date               : 2020.07.27
	 * @author	           : 한광희
	 * @history 	       :
	 * @param element      : jquery selector
	 * @param mClassObject : 중분류
	 * @param mapOption    : 지도 옵션
	 * @param year         : 년도
	 * @param searchLevel  : 검색 레벨
	 * @param stand_is     : 파라미터에 기준지역 여부(Y,N)
	 * @param isSetStand   : 기준지역을 셋팅할지의 여부
	 * @param callback     : callback
	 */
	function setAvgText(element,mClassObject,mapOption,year,searchLevel,stand_is,isSetStand,callback){
		var parameters = {
			b_class_idx_id : mClassObject.b_class_idx_id,
			m_class_idx_id : mClassObject.m_class_idx_id,
			year : year,
			level : searchLevel,
			stand_is : stand_is
		};
		if(hasText(mapOption.sido_cd)){
			parameters.sido_cd = mapOption.sido_cd;
		}
		if(hasText(mapOption.sgg_cd)){
			parameters.sgg_cd = mapOption.sgg_cd;
		}
		if(hasText(mapOption.emdong_cd)){
			parameters.emdong_cd = mapOption.emdong_cd;
		}
		$.ajax({
			url : sgisContextPath+"/ServiceAPI/house/houseAnalysisAvgLists.json",
			type:"POST",
			data: parameters,
			async: true,
			dataType:"json",
			success: function(res){
				if(res.errCd=="0"){
					element.show().empty();
					if(element.attr("id")=="stand-indicator-avg-list"){
						$("th[data-stand=true]").show();
					}
					function create(data){
						if(data){
							element.append($("<div/>").append(
								$("<p/>", {"text":data.adm_nm+" "}),
								$("<span/>",{"text":(appendCommaToNumber(data.avg_value))}),
								(data.unit?" "+data.unit:"")
							));
						}
					}
					
					create(res.result.country);
					create(res.result.sido);
					create(res.result.sgg);
					create(res.result.emdong);
					
					if(typeof callback === "function"){
						callback(res);
					}
				}
			},
			error: function(data){
				common_alert(errorMessage);
				return false;
			}
		});
	}
	
	/**
	 * @name               : setRecomendAreaAvgText
	 * @description        : 추천지역리스트 평균값 셋팅
	 * @date               : 2020.07.27
	 * @author	           : 한광희
	 * @history 	       :
	 * @param element      : jquery selector
	 * @param mClassObject : 중분류
	 * @param mapOption    : 지도 옵션
	 * @param year         : 년도
	 * @param stand_is     : 파라미터에 기준지역 여부(Y,N)
	 * @param callback     : callback
	 */
	function setRecomendAreaAvgText(element,mClassObject,mapOption,year,stand_is,callback){
		if(!hasText(mapOption.adm_cd)){
			searchLevel = 1;
		}else if(mapOption.adm_cd.length==2){
			searchLevel = 2;
		}else if(mapOption.adm_cd.length>=5){
			searchLevel = 3;
		}
		if(searchLevel>mClassObject.disp_level){
			searchLevel = mClassObject.disp_level;
		}
		
		var parameters = {
			b_class_idx_id : mClassObject.b_class_idx_id,
			m_class_idx_id : mClassObject.m_class_idx_id,
			year : year,
			level : searchLevel,
			stand_is : stand_is
		};
		if(hasText(mapOption.sido_cd)){
			parameters.sido_cd = mapOption.sido_cd;
		}
		if(hasText(mapOption.sgg_cd)){
			parameters.sgg_cd = mapOption.sgg_cd;
		}
		if(hasText(mapOption.emdong_cd)){
			parameters.emdong_cd = mapOption.emdong_cd;
		}
		
		// 전국 현위치 값 저장 변수 선언
		var country_avg_value = "";
		var country_unit = "";
		var this_area_avg_value = "";
		var this_area_unit = "";
		
		$.ajax({
			url : sgisContextPath+"/ServiceAPI/house/houseAnalysisAvgLists.json",
			type:"POST",
			data: parameters,
			async: false,
			dataType:"json",
			success: function(res){
				if(res.errCd=="0"){
					// 현재지역 값 셋팅
					if(res.result.emdong != null){
						this_area_avg_value = res.result.emdong.avg_value;
						this_area_unit = (res.result.emdong.unit?"("+res.result.emdong.unit+")":"");
						$("#"+element+"_"+mClassObject.m_class_idx_id).find("span:eq(2)").text(appendCommaToNumber(this_area_avg_value));	// 값
						$("#"+element+"_"+mClassObject.m_class_idx_id).find("span:eq(3)").text(this_area_unit);	// 단위
					} else if(res.result.sgg != null){
						this_area_avg_value = res.result.sgg.avg_value;
						this_area_unit = (res.result.sgg.unit?"("+res.result.sgg.unit+")":"");
						$("#"+element+"_"+mClassObject.m_class_idx_id).find("span:eq(2)").text(appendCommaToNumber(this_area_avg_value));	// 값
						$("#"+element+"_"+mClassObject.m_class_idx_id).find("span:eq(3)").text(this_area_unit);	// 단위
					} else if(res.result.sido != null){
						this_area_avg_value = res.result.sido.avg_value;
						this_area_unit = (res.result.sido.unit?"("+res.result.sido.unit+")":"");
						$("#"+element+"_"+mClassObject.m_class_idx_id).find("span:eq(2)").text(appendCommaToNumber(this_area_avg_value));	// 값
						$("#"+element+"_"+mClassObject.m_class_idx_id).find("span:eq(3)").text(this_area_unit);	// 단위
					} 
					
					// 전국 값 셋팅
					if(res.result.country != null){
						country_avg_value = res.result.country.avg_value;
						country_unit = (res.result.country.unit?"("+res.result.country.unit+")":"");
						$("#"+element+"_"+mClassObject.m_class_idx_id).find("span:eq(0)").text(appendCommaToNumber(country_avg_value));	// 값
						$("#"+element+"_"+mClassObject.m_class_idx_id).find("span:eq(1)").text(country_unit);	// 단위
					}
					
					if(typeof callback === "function"){
						callback(res);
					}
				}
			},
			error: function(data){
				common_alert(errorMessage);
				return false;
			}
		});
	}
	
	/**
	 * @name               : setIndicatorData
	 * @description        : 상세별 지표현황 값 셋팅
	 * @date               : 2020.07.27
	 * @author	           : 한광희
	 * @history 	       :
	 * @param mClassObject : 중분류
	 * @param adm_cd       : 행정동 코드
	 * @param isSetStand   : 기준지역을 셋팅할지의 여부
	 * @param callback     : callback
	 */
	function setIndicatorData(mClassObject,adm_cd,isSetStand,callback){
		var mapOption = $recomendHouseMap.ui.getMapOptions(adm_cd);
		var year = $recomendHouseMap.ui.map.bnd_year,searchLevel;
		if(!hasText(mapOption.adm_cd)){
			searchLevel = 1;
		}else if(mapOption.adm_cd.length==2){
			searchLevel = 2;
		}else if(mapOption.adm_cd.length>=5){
			searchLevel = 3;
		}
		if(searchLevel>mClassObject.disp_level){
			searchLevel = mClassObject.disp_level;
		}
		setAvgText($("#stand-indicator-avg-list"),mClassObject,mapOption,year,searchLevel,"Y",isSetStand,callback);
	}
	
	/**
	 * @name           : getChartAdmCd
	 * @description    : 차트 adm_cd 구하기
	 * @date           : 2020.07.27
	 * @author	       : 한광희
	 * @history        :
	 * @param callback : callback
	 */
	function getChartAdmCd(callback){
		if(typeof callback === "function"){
			var adm_cd = $recomendHouseMap.ui.databoardAdmCd;
			if(adm_cd.length<=2){
				accessTokenInfo(function(){
					callback(true,getFirstSggCd(adm_cd));
				});
			}else{
				callback(false,adm_cd);
			}
		}
	}
	
	/**
	 * @name          : getFirstSggCd
	 * @description   : 해당 시도의 첫번째 시군구 받기
	 * @date          : 2020.07.27
	 * @author	      : 한광희
	 * @history 	  :
	 * @param sido_cd : 시도코드
	 */
	function getFirstSggCd(sido_cd){
		var sggCd = null;
		if(sido_cd&&sido_cd.length==2){
			$.ajax({
				method: "GET",
				async: false,
				url: openApiPath + "/OpenAPI3/addr/stage.json",
				data: {
					accessToken:accessToken,
					cd: sido_cd,
					pg_yn: "0"
				},
				dataType: "json",
				success: function(res) {
					if(res.errCd=="0"&&res.result.length>0){
						sggCd = res.result[0].cd;
					}
				},
				error: function(e) {}
			});
		}
		return sggCd;
	}
	
	/**
	 * @name         : ageGroupChart
	 * @description  : 연령대별인구 차트
	 * @date         : 2020.07.27
	 * @author	     : 한광희
	 * @history      :
	 * @param isSido : 시도 코드인지 유무 
	 * @param adm_cd : 행정동 코드
	 */
	function ageGroupChart(isSido,adm_cd){
		var chartArea = "#databoard-box .TabArea:first>.chart";
		var abs = new sop.portal.absAPI();
		abs.onBlockUIPopup();
		$recomendHouseMap.ui.map.censusApi.setStatsMapAdmCdCensusData("API_0602",{
			"adm_cd" : adm_cd,
			"onlyGetData" : true,
			"callback" : function(res){
				var chartHeight = $("#databoard-area").height()-dataAreaSize;
				if(res.errCd=="0"){
					var categories = ['10세 이하', '10대', '20대', '30대', '40대', '50대', '60대', '70세 이상'];
					var series = new Array();
					var setData = function(data){
						var tempData = new Array();
						tempData.push({y:parseFloat($.isNumeric(data.teenage_less_than_per)?data.teenage_less_than_per:0)});//10대 미만 비율
						tempData.push({y:parseFloat($.isNumeric(data.teenage_per)?data.teenage_per:0)});//10대 비율
						tempData.push({y:parseFloat($.isNumeric(data.twenty_per)?data.twenty_per:0)});//20대 비율
						tempData.push({y:parseFloat($.isNumeric(data.thirty_per)?data.thirty_per:0)});//30대 비율
						tempData.push({y:parseFloat($.isNumeric(data.forty_per)?data.forty_per:0)});//40대 비율
						tempData.push({y:parseFloat($.isNumeric(data.fifty_per)?data.fifty_per:0)});//50대 비율
						tempData.push({y:parseFloat($.isNumeric(data.sixty_per)?data.sixty_per:0)});//60대 비율
						tempData.push({y:parseFloat($.isNumeric(data.seventy_more_than_per)?data.seventy_more_than_per:0)});//70대 이상 비율
						series.push({
							"name": data.adm_nm,
							"data": tempData
						});
					};
					$.each(res.result,function(cnt,node){
						if(isSido){
							if(node.adm_cd==adm_cd.substring(0,2)){
								setData(node);
								return false;
							}
						}else{
							setData(node);
						}
					});
					
					$(chartArea).highcharts({
						chart: {
							backgroundColor: {
					            linearGradient: [500, 500, 500, 0],
					            stops: [
					            	[0, '#fff'],	// 하단 백그라운드 색
					            	[1, '#fff']	// 상단 백그라운드 색
					            ]
					        },
					        type: 'column',
					        width: $(window).width(),
					        height: getChartHeight()
					    },
					    title : true,
					    xAxis: {
					    	categories: categories
					    },
					    yAxis: {
					        title: {
					            text: ''
					        },
					        labels: {
					            formatter: function () {
					            	 return appendCommaToNumber(this.value);
					            }
					        }

					    },
					    legend: {
					        enabled: true
					    },
					    tooltip:{
					    	enabled:false
					    },						    
					    plotOptions: {
					        series: {
					            borderWidth: 0,
					            shadow: false,
					            point: {
					                events: {
					                    click: function (event) {
					                    	$("#databoard-chartCategoryTitle").html(this.category);
					                        $("#databoard-area-title").html(series[0].name);
				                        	$("#databoard-area-data").html(appendCommaToNumber(series[0].data[event.currentTarget.index].y) + "<span>%</span>");
					                        $("#databoard-parent-area-title").html(series[1].name);
				                        	$("#databoard-parent-area-data").html(appendCommaToNumber(series[1].data[event.currentTarget.index].y) + "<span>%</span>");
				                        	// 읍면동까지 데이터 조회시 전국 정보 series[2]
				                        	if(series.length > 2){
				                        		$("#databoard-topParent").show();
				                        		$("#databoard-topParent-area-title").html(series[2].name);
					                        	$("#databoard-topParent-area-data").html(appendCommaToNumber(series[2].data[event.currentTarget.index].y) + "<span>%</span>");
				                        	} else{
				                        		$("#databoard-topParent").hide();
				                        	}
				                        	
					                    },
		                                update: function (event) {
		                                	$("#databoard-chartCategoryTitle").html(this.category);
		                                	$("#databoard-area-title").html(series[0].name);
				                        	$("#databoard-area-data").html(appendCommaToNumber(series[0].data[event.currentTarget.index].y) + "<span>%</span>");
					                        $("#databoard-parent-area-title").html(series[1].name);
				                        	$("#databoard-parent-area-data").html(appendCommaToNumber(series[1].data[event.currentTarget.index].y) + "<span>%</span>");
				                        	// 읍면동까지 데이터 조회시 전국 정보 series[2]
				                        	if(series.length > 2){
				                        		$("#databoard-topParent").show();
				                        		$("#databoard-topParent-area-title").html(series[2].name);
					                        	$("#databoard-topParent-area-data").html(appendCommaToNumber(series[2].data[event.currentTarget.index].y) + "<span>%</span>");
				                        	} else{
				                        		$("#databoard-topParent").hide();
				                        	}
		                                }
					                }
					            }
					        }
					    },

					    series: series
					});
					// 첫번째 데이터 클릭
			        var chart = $(chartArea).highcharts();
			        chart.series[0].data[0].update();
					
				}else if(res.errCd=="-100"){
					setEmptyChartText(chartArea,chartHeight);
				}
				abs.onBlockUIClose();
			}
		});
	}
	/**
	 * @name         : houseChart
	 * @description  : 주택종류 차트
	 * @date         : 2020.07.27
	 * @author	     : 한광희
	 * @history 	 :
	 * @param isSido : 시도 코드인지 유무 
	 * @param adm_cd : 행정동 코드 
	 */
	function houseChart(isSido,adm_cd){
		var chartArea = "#databoard-box .TabArea:eq(1)>.chart";
		var abs = new sop.portal.absAPI();
		abs.onBlockUIPopup();
		$recomendHouseMap.ui.map.censusApi.setStatsMapAdmCdCensusData("API_0604",{
			"adm_cd" : adm_cd,
			"onlyGetData" : true,
			"callback" : function(res){
				var chartHeight = $("#databoard-area").height()-dataAreaSize;
				if(res.errCd=="0"){
					var series = [];
					var categories = ['아파트', '연립/다세대', '단독주택', '기타'];
					var setData = function(data){
						var tempData = new Array();
						tempData.push({y:parseFloat($.isNumeric(data.apart_per)?data.apart_per:0)});//아파트-  비율
						tempData.push({y:parseFloat($.isNumeric(data.row_house_per)?data.row_house_per:0)});//연립/다세대 - 비율
						tempData.push({y:parseFloat($.isNumeric(data.detach_house_per)?data.detach_house_per:0)});//단독주택 - 비율
						tempData.push({y:parseFloat($.isNumeric(data.etc_per)?data.etc_per:0)});//기타 - 비율
						series.push({
							"name": data.adm_nm,
							"data": tempData
						});
					};
					$.each(res.result,function(cnt,node){
						if(isSido){
							if(node.adm_cd==adm_cd.substring(0,2)){
								setData(node);
								return false;
							}
						}else{
							setData(node);
						}
					});
					
					$(chartArea).highcharts({
						chart: {
							backgroundColor: {
					            linearGradient: [500, 500, 500, 0],
					            stops: [
					            	[0, '#fff'],	// 하단 백그라운드 색
					            	[1, '#fff']	// 상단 백그라운드 색
					            ]
					        },
					        type: 'column',
					        width: $(window).width(),
					        height: getChartHeight()
					    },
					    title : true,
					    xAxis: {
					    	categories: categories
					    },
					    yAxis: {
					        title: {
					            text: ''
					        },
					        labels: {
					            formatter: function () {
					            	 return appendCommaToNumber(this.value);
					            }
					        }

					    },
					    legend: {
					        enabled: true
					    },
					    tooltip:{
					    	enabled:false
					    },						    
					    plotOptions: {
					        series: {
					            borderWidth: 0,
					            shadow: false,
					            point: {
					                events: {
					                    click: function (event) {
					                    	$("#databoard-chartCategoryTitle").html(this.category);
					                        $("#databoard-area-title").html(series[0].name);
				                        	$("#databoard-area-data").html(appendCommaToNumber(series[0].data[event.currentTarget.index].y) + "<span>%</span>");
					                        $("#databoard-parent-area-title").html(series[1].name);
				                        	$("#databoard-parent-area-data").html(appendCommaToNumber(series[1].data[event.currentTarget.index].y) + "<span>%</span>");
				                        	// 읍면동까지 데이터 조회시 전국 정보 series[2]
				                        	if(series.length > 2){
				                        		$("#databoard-topParent").show();
				                        		$("#databoard-topParent-area-title").html(series[2].name);
					                        	$("#databoard-topParent-area-data").html(appendCommaToNumber(series[2].data[event.currentTarget.index].y) + "<span>%</span>");
				                        	} else{
				                        		$("#databoard-topParent").hide();
				                        	}
					                    },
		                                update: function (event) {
		                                	$("#databoard-chartCategoryTitle").html(this.category);
		                                	$("#databoard-area-title").html(series[0].name);
				                        	$("#databoard-area-data").html(appendCommaToNumber(series[0].data[event.currentTarget.index].y) + "<span>%</span>");
					                        $("#databoard-topParent-area-title").html(series[1].name);
				                        	$("#databoard-topParent-area-data").html(appendCommaToNumber(series[1].data[event.currentTarget.index].y) + "<span>%</span>");
				                        	// 읍면동까지 데이터 조회시 전국 정보 series[2]
				                        	if(series.length > 2){
				                        		$("#databoard-topParent").show();
				                        		$("#databoard-topParent-area-title").html(series[2].name);
					                        	$("#databoard-topParent-area-data").html(appendCommaToNumber(series[2].data[event.currentTarget.index].y) + "<span>%</span>");
				                        	} else{
				                        		$("#databoard-topParent").hide();
				                        	}
		                                }
					                }
					            }
					        }
					    },

					    series: series
					});
					// 첫번째 데이터 클릭
			        var chart = $(chartArea).highcharts();
			        chart.series[0].data[0].update();
					
				}else if(res.errCd=="-100"){
					setEmptyChartText(chartArea,chartHeight);
				}
				abs.onBlockUIClose();
				return false;
			}
		});
	}
	/**
	 * @name         : companyChart
	 * @description  : 사업체 수 차트
	 * @date         : 2020.07.27
	 * @author	     : 한광희
	 * @history 	 :
	 */
	function companyChart(){
		var chartArea = "#databoard-box .TabArea:eq(2)>.chart";
		var abs = new sop.portal.absAPI();
		abs.onBlockUIPopup();
		var adm_cd = $recomendHouseMap.ui.databoardAdmCd.toString();
		var series = [];
		var categories = ['종사자 수', '사업체 수'];
		var unit = ['명', '개'];
		var setListData = function(adm_cd){
			$.ajax({
				url : openApiPath+"/OpenAPI3/stats/population.json",
				type:"GET",
				data: {
					accessToken : accessToken,
					year : companyDataYear,
					bnd_year : $recomendHouseMap.ui.map.bnd_year,
					adm_cd : adm_cd
				},
				async: false,
				dataType:"json",
				success: function(res){
					if(res.errCd=="0"){
						var tempData = new Array();
						tempData.push({y:parseFloat($.isNumeric(res.result[0].employee_cnt)?res.result[0].employee_cnt:0)});
						tempData.push({y:parseFloat($.isNumeric(res.result[0].corp_cnt)?res.result[0].corp_cnt:0)});
						series.push({
							"originalName": res.result[0].adm_nm,
							"name": res.result[0].adm_nm,
							"data": tempData
						});
					}
				},
				error: function(data){
					common_alert(errorMessage);
					return false;
				}
			});
		};
		accessTokenInfo(function(){
			if(adm_cd.length>=7){
				setListData(adm_cd.substring(0,7));
			}
			if(adm_cd.length>=5){
				setListData(adm_cd.substring(0,5));
			}
			if(adm_cd.length>=2){
				setListData(adm_cd.substring(0,2));
			}
			for(var i = series.length-2 ;i>=0;i--){
				series[i].name = series[i].name.replace(series[i+1].originalName,"");
			}
			$("#databoard-box .TabArea:eq(2)>.origin_txt").text("출처 : "+companyDataYear+" 전국사업체조사");

			$(chartArea).highcharts({
				chart: {
					backgroundColor: {
			            linearGradient: [500, 500, 500, 0],
			            stops: [
			            	[0, '#fff'],	// 하단 백그라운드 색
			            	[1, '#fff']	// 상단 백그라운드 색
			            ]
			        },
			        type: 'column',
			        width: $(window).width(),
			        height: getChartHeight()
			    },
			    title : true,
			    xAxis: {
			    	categories: categories
			    },
			    yAxis: {
			        title: {
			            text: ''
			        },
			        labels: {
			            formatter: function () {
			            	 return appendCommaToNumber(this.value);
			            }
			        }

			    },
			    legend: {
			        enabled: true
			    },
			    tooltip:{
			    	enabled:false
			    },						    
			    plotOptions: {
			        series: {
			            borderWidth: 0,
			            shadow: false,
			            point: {
			                events: {
			                    click: function (event) {
			                    	$("#databoard-chartCategoryTitle").html(this.category);
			                        $("#databoard-area-title").html(series[0].name);
		                        	$("#databoard-area-data").html(appendCommaToNumber(series[0].data[event.currentTarget.index].y) + "<span>" + unit[event.currentTarget.index] + "</span>");
			                        $("#databoard-parent-area-title").html(series[1].name);
		                        	$("#databoard-parent-area-data").html(appendCommaToNumber(series[1].data[event.currentTarget.index].y) + "<span>" + unit[event.currentTarget.index] + "</span>");
		                        	// 읍면동까지 데이터 조회시 전국 정보 series[2]
		                        	if(series.length > 2){
		                        		$("#databoard-topParent").show();
		                        		$("#databoard-topParent-area-title").html(series[2].name);
			                        	$("#databoard-topParent-area-data").html(appendCommaToNumber(series[2].data[event.currentTarget.index].y) + "<span>" + unit[event.currentTarget.index] + "</span>");
		                        	} else{
		                        		$("#databoard-topParent").hide();
		                        	}
			                    },
                                update: function (event) {
                                	$("#databoard-chartCategoryTitle").html(this.category);
                                	$("#databoard-area-title").html(series[0].name);
		                        	$("#databoard-area-data").html(appendCommaToNumber(series[0].data[event.currentTarget.index].y) + "<span>" + unit[event.currentTarget.index] + "</span>");
			                        $("#databoard-parent-area-title").html(series[1].name);
		                        	$("#databoard-parent-area-data").html(appendCommaToNumber(series[1].data[event.currentTarget.index].y) + "<span>" + unit[event.currentTarget.index] + "</span>");
		                        	// 읍면동까지 데이터 조회시 전국 정보 series[2]
		                        	if(series.length > 2){
		                        		$("#databoard-topParent").show();
		                        		$("#databoard-topParent-area-title").html(series[2].name);
			                        	$("#databoard-topParent-area-data").html(appendCommaToNumber(series[2].data[event.currentTarget.index].y) + "<span>" + unit[event.currentTarget.index] + "</span>");
		                        	} else{
		                        		$("#databoard-topParent").hide();
		                        	}
                                }
			                }
			            }
			        }
			    },

			    series: series
			});
			// 첫번째 데이터 클릭
	        var chart = $(chartArea).highcharts();
	        chart.series[0].data[0].update();
			
			abs.onBlockUIClose();
		});
	}
		
	/**
	 * @name              : setEmptyChartText
	 * @description       : 소지역정보 값이 없을때 문구 셋팅
	 * @date              : 2020.07.27
	 * @author	          : 한광희
	 * @history 	      :
	 * @param chartArea   : chart selector
	 * @param chartHeight : chart 높이
	 */
	function setEmptyChartText(chartArea,chartHeight){
		if($(chartArea).highcharts()){
			$(chartArea).highcharts().destroy();
		}
		$(chartArea).empty().append($("<div/>",{style:"height:"+chartHeight+"px;","class":"empty-box"}).append($("<div/>",{text:"데이터가 존재하지 않습니다"})));
	}	
}(window, document));	