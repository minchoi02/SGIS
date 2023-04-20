/**
 * 대쉬보드 맵 서비스
 * 
 * history : 1.0, 2020/08/10  초기 작성
 * author : 곽제욱
 * version : 1.0
 * see : 
 * 
 */
(function(W, D) {
	W.$totSurvDetailMap = W.$totSurvDetailMap || {};

	$(document).ready(
		function() {});
	
	$totSurvDetailMap = {
			noReverseGeoCode : false
	};
	
	$totSurvDetailMap.ui = {
			map : null,
			namespace : "totSurvDetailMap",
			searchBtnType : "normal",
			mapList : [],
			curBtnId : '',
			curMapId : 0,
			isInnerMapShow : false,
			curDropParams : [],
			combinePopup : null,
			buildPopup : null,
			reportPopup : null,
			dropBtnInfo : [],
			dataTypeList : [],
			tutoIndex : 0,
			selectedObj : "", // 선택한 객체(차트의 경우 rect)
			selectedSurvId : "",// 선택한 지표id
			selectedItemSeq : "",	// 주제별 차트 id
			selectedItmCd : "", // 선택한 itm_cd
			selectedC1 : "", 	// 선택한 c1
			selectedC2 : "", // 선택한 c2
			selectedC3 : "", // 선택한 c3
			prevZoom : "1", 	// 지도 이동 이벤트에서 드래그를 막기위한 이전 줌 변수 
			isAtdrc : false,	// 비자치구 여부  (ex 수원시 (5자리) 클릭시 구정보 조회) / census 조회시 true면 5자리라도 조회 안하도록
			
			
			//데이터
			mapData : null,
			mapStatsData : {}, // 통계정보 저장
			mapRegionData : {}, // 지역경계 저장
			mapRegion : "", // 지역경계 sido, sgg, emdong, totreg
			mapType : "", // 지도유형 color, bubble, heat, poi, grid
			mapToggleId : "", // 맵 토글 id, 슬라이드 이동시에도 하이라이트 처리를 위해 사용
			mapTempColor : "", // 하이라이트를 위한 맵 임시 칼라
			chartToggle : "", // 차트 토글 id가 들어감
			chartToggleYn : "N",
			
			/** 개방형 지도 줌 level 조정 START */
			openApiZoomUpRegion : ["11250","11090","11160","11210","11050","11180","11110","11100","11060","11200","11140","11130","11040","11080","11240","11150","11190","11030","11010","11070",
									"2505060","2505061","2505057","2505054","2505062","2505051","2501057","2501055","2503073","2503053","2503060","2503066","2504063","2504059","2504067","2504064","2504054",
									"2504065","2504057","2502058","2502067","2502057","21070","21030","21060","21050","21140","21130","21040","22040","22030","23070","23090","23060","26010","31104","31110",
									"31160","31021","31022","31011","31013","31042","31140","31193"],
			openApiZoomDownRegion : ["25010", "25030","25040","2501073","21120","21310","23310","23010","24050","29010","31250","31230","31130","31220","31260","31380","31280","31350","31191","31210","31200",
									"31070","31240","32040","32380","32410","32020","32360","32010","32050","32310","32370","33320","33340","33330","33370","33350","33041","33042","33020","34020","34310","34060",
									"34080","34330","34340","34040","34370","34011","34012","34350","34360","35370","35020","35060","35050","35330","35380","35360","35030","35350","35340","35040","36320","36060",
									"36330","36040","36310","36360","36030","36440","36410","36450","36430","37100","37370","37050","37310","37090","37410","37380","37360","37390","37011","37012","38340","38070",
									"38350","38080","38060","38100","38310","38030","38330","38113","38111","38050","38320"],
			openApiZoomDoubleUpRegion : ["11170","11020","2505052","2505056","2505059","2505055","2501063","2501064","2501078","2501080","2501079","2501077","2501065","2501060",
										"2501076","2501056","2501068","2501053","2503062","2503064","2503065","2503072","2503061","2503063","2503052","2503059","2503074","2503069",
										"2503055","2503051","2503056","2503067","2503068","2503057","2502055","2502053","2502056","2502068","2502059","2502062","2502060","2502065","2502066",
										"2502051","2502054","2502063","2502064","21010","22010","23020"],
			openApiZoomDoubleDownRegion : ["22310","26310","31370","31270","32030","32400","32070","32330","32390","32350","32340","32320","33360","33380","33030","34030","34050","34380","35310","35320","36390",
											"36350","36420","36480","36020","36460","36380","36470","36400","36370","37020","37030","37080","37040","37350","37340","37060","37070","37400","37420","37320","37330",
											"38090","38390","38370","38360","38380","38400","39020","39010"],
			openApiZoomThreeDownRegion : ["23320"],
			/** 개방형 지도 줌 level 조정 END */
			
			/**
			 * 지도데이터 초기화
			 */
			clearLayer: function() {// used
				$totSurvMain.ui.log("$totSurvDetailMap.ui.clearLayer - begin");

				var map = this.mapList[this.curMapId];
				map.clearLayer();
			},

			
			/**
			 * 
			 * @name         : createMap
			 * @description  : 맵 및 맵에 오버레이될 그래프, 범례 등을 생성한다.
			 * @date         : 2020.08.10
			 * @author	     : 곽제욱
			 * @history 	 :
			 */
			createMap : function(id) {
				
				this.map = new sMap.map();
				
				
				this.map.id = id;
				this.map.isDrop = true;
				this.map.isInnerMapShow = true;
				this.map.isTradeMapShow = false;
				this.map.boundLevel = 0; // 확대 상관없이 지역경계 표시하게함
				this.map.createMap($totSurvDetailMap, id, {
					center : [ 989674, 1818313 ],
					zoom : 1, //9->8
					measureControl : false,
					statisticTileLayer: false
				});
				this.map.addControlEvent("zoomend");
				
				
				this.map.gMap.on("moveend", function (e) {
					var that = $totSurvDetailMap.ui.map;
					if (that.delegate && 
						that.delegate.callbackFunc && 
						that.delegate.callbackFunc.didMapMoveEnd instanceof Function) {
						that.delegate.callbackFunc.didMapMoveEnd(e, that);
					}
				});
				this.map.gMap.scrollWheelZoom.disable();	// 마우스 휠로 zoom 실행 방지
				
				//지도 범례 등록
				var legend = new sLegendInfo.legendInfo($totSurvDetailMap.ui.map);
				legend.linkTooltip = function() {}; //툴팁오류 방지
				legend.drawBubbleMap = $totSurvDetailMap.ui.drawBubbleMap; // 버블 지도 Override
				legend.initialize($totSurvDetailMap.ui);
				this.map.legend = legend;
				legend.createLegend();
				
				//mng_s 20210326 이진호, 총조사시각화디테일에서 범례 생성
				$('.sop-control').css('display', 'inline-block');
				if($(".legendRing").attr("data-ing") == "max"){
					$(".btn_legend").trigger("click");
				} else if($(".legendRing").attr("data-ing") == "min"){
					$(".btn_legend").trigger("click").trigger("click");
				}
				$("#grid_lg_color_0").attr("data-color", "#4F7001").attr("start-color", "#D4D05D").text("#4F7001").css("background", "#4F7001");
				//mng_e 20210326 이진호
				
				this.map.gMap.whenReady(function() {
					$totSurvDetailMap.ui.map.createHeatMap();
				});

			},
			
			/**
			 * 
			 * @name         : clearMap
			 * @description  : 지도 Clear
			 * @date         : 2020. 08. 19. 
			 * @author	     : 곽제욱
			 * @history 	 :
			 */
			clearMap : function(p_map) {
				//2019-11-27 경계 Clear 수정. START
				//경계 Clear
				try { p_map.clearLayer(); } catch(e) { }
				// 2017. 05. 15 개발팀 수정요청
				p_map.bnd_year = bndYear;
				p_map.data = [];
				p_map.combineData = [];
				p_map.dataGeojson = null;
				p_map.curDropPolygonCode = null;
				p_map.valPerSlice = [];
				p_map.legendValue = [];
				p_map.lastGeojsonInfo = null;
				p_map.isNoReverseGeocode = false;
				p_map.isTradeMapShow = false;
				p_map.lastDrawList = [];
				p_map.legendValue.user = [];
				if (p_map.drawControl) {
					p_map.drawControl.removeOverlay();
				}
				//2019년반영 시작
				if(p_map.mapMode!="white"){
					p_map.markers.clearLayers();
				}
				//2019년반영 끝
				p_map.selectedBoundMode = null;
				p_map.selectedBoundList = [];
				p_map.dataGeojsonLayer = null;
				p_map.curAdmCd = null;
				p_map.dataForCombine = null;
				p_map.multiLayerControl.clear();
				p_map.legend.removeDataOverlay();
				p_map.legend.data = []; //9월 서비스
				if (p_map.heatMap) {
					p_map.heatMap.setUTMKs([]);
				}
				p_map.gMap.eachLayer(function(layer) {
					if (layer._layer) {
						_layer.remove();
					}
				});

				p_map.markers.clearLayers();

			},
			
			/**
			 * 
			 * @name         : doMaxSize
			 * @description  : 맵을 최대화한다.
			 * @date         : 
			 * @author	     : 
			 * @history 	 :
			 */
			doMaxSize : function(type) {
				srvLogWrite("C0", "07", "05", "00", "", "");		//전체화면확대
				var ck = $(".tb_sizing").hasClass("on"); 
				if(!ck){
					$("header .util").css("top","-16px");  //2019-03-15 박길섭
					$(".tb_sizing").addClass("on");
					$(".tb_sizing").children().attr("src","/img/ico/ico_toolbars12.png");
					$(".headerEtc, .gnb, .headerContents form").hide();
					$(".headerContents h1").css({"height":"10px"});
					$(".headerContents h1 img").hide();
					$(".containerBox").css({"height":"calc(100% - 10px)", "top":"10px"});
					$(".searchArea").css("display", "none");//190305 방민정수정
				}else{
					$(".inner").css("margin","-1px auto"); //2019-03-19 박길섭
					$("header .util").css("top","0px");  //2019-03-15 박길섭
					$(".tb_sizing").removeClass("on");
					$(".tb_sizing").children().attr("src","/img/ico/ico_toolbars01.png"); 
					$(".headerEtc, .gnb, .headerContents form").show();
					$(".headerContents h1").css({"height":"78px"});
					$(".headerContents h1 img").show();
					$(".containerBox").css({"height":"calc(100% - 104px)", "top":"104px"});
					$(".searchArea").css("display", "");//190305 방민정수정
				}
				
				for (var i=0; i<this.mapList.length; i++) {
					if (this.mapList[i] != null) {
						this.mapList[i].update();
					}
				}
			},				
			
			/**
			 * 
			 * @name         : doAddMap
			 * @description  : 맵을 추가한다.
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 */
			doAddMap : function(type) {},
			
			
			/**
			 * 
			 * @name         : doRemoveMap
			 * @description  : 맵을 삭제한다.
			 * @date         : 
			 * @author	     : 
			 * @history 	 :
			 * @param type   : 1:1번맵, 2:2번맵, 3:3번맵
			 */
			doRemoveMap : function(type) {},
						
			/**
			 * 
			 * @name         : doDone
			 * @description  : 경계정보를 설정한다.
			 * @date         : 
			 * @author	     : 
			 * @history 	 :
			 * @param
			 */
			doDone : function(type) {},
			
			
			/**
			 * 
			 * @name         : doCancel
			 * @description  : 경계정보 설정을 취소한다.
			 * @date         : 
			 * @author	     : 
			 * @history 	 :
			 * @param
			 */
			doCancel : function(type) {},
			
			/**
			 * 
			 * @name         : createInfoTooltip
			 * @description  : 경계레이어 선택 시, 툴팁을 생성하여 정보를 표출한다.
			 * @date         : 2015. 10. 12. 
			 * @author	     : 
			 * @history 	 :
			 * @param event  : 선택된 경계레이어
			 * @param data   : 선택된 경계레이어의 데이터정보
			 */
			createInfoTooltip : function(event, data, type, map) {
				// 집계구 일경우 집계구 번호 출력
				if(data.properties.adm_cd.length > 7){
					// HTML 생성				
					$("#toolAdmNm").html(data.properties.adm_cd);					
				} else {
					// HTML 생성				
					$("#toolAdmNm").html(data.properties.adm_nm);
				}
				
				var lv_html = "";
				if(data.info.length>0){
					lv_html += "<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 0; padding-right: 3px;'>"+appendCommaToNumber(parseFloat(data.info[0][data.info[0].showData]))+"</p>"; //2020.12.09[신예리] 맵 툴팁 스타일 적용 
					/*lv_html += appendCommaToNumber(parseFloat(data.info[0][data.info[0].showData]));*/ //2020.12.09[신예리] 맵 툴팁 스타일 적용으로 인한 주석 처리
				} else {
					lv_html += "N/A"
				}
				// 단위
				if(data.info.length>0){
					lv_html += " ("+data.info[0].unit+")";
				}
				
				$("#toolAdmData").html(lv_html);
				// width : 119
				// height : 69
				var x = event.originalEvent.clientX;
				var y = event.originalEvent.clientY-70;				
				$("#toolAdmNm").html("<p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; text-align: center;'>"+data.properties.adm_nm+"</p>"); //2020.12.09[신예리] 맵 툴팁 스타일 적용
				$("#mapToolTipTable").css("left", x).css("top", y);
				$("#mapToolTipTable").show();
			},
			
			
			/**
			 * 
			 * @name         : requestOpenApi
			 * @description  : 통계정보를 요청한다.
			 * @date         : 2015. 10. 08. 
			 * @author	     : .
			 * @history 	 :
			 * @param options
			 */
			requestOpenApi : function(options) {},
			
			/**
			 * @name : drawMapData
			 * @description : 지도 데이터 그리기
			 * @date : 2020.08.12
			 * @author : 곽제욱
			 * @history :
			 * @param :
			 * 		p_map_region : 지역경계
			 * 		p_map_type : 지도유형(heat 고정)
			 */
			drawMapData : function(p_map_region, p_map_type) {
				$totSurvMain.ui.loading(true); // 2020-10-14 [곽제욱] 맵 그리기 시작할때 loading바 생성
				if($totSurvDetailMap.ui.map != null){
					$(".zoom").show();
					$(".out").show();
				}

				var lv_map_region_before = $totSurvDetailMap.ui.mapRegion;
				var lv_map_type_before = $totSurvDetailMap.ui.mapType;
				var lv_surv_id = $totSurvDetailMap.ui.selectedSurvId;
				
				if(p_map_region == undefined || p_map_region == null) {
					p_map_region = $totSurvMain.ui.mapRegion;
				}
				else {
					$totSurvDetailMap.ui.mapRegion = p_map_region;
				}
				if(p_map_type == undefined || p_map_type == null) {
					p_map_type = $totSurvMain.ui.mapType;
				}
				else {
					$totSurvDetailMap.ui.mapType = p_map_type;
				}
								
				//지역변수
				var lv_adm_cd = "00";
				var lv_adm_nm = "전국";
				var lv_adm_coor_x = 990480.875;
				var lv_adm_coor_y = 1815839.375;
								
				/* 총조사 시각화의 경우 각 시도정보는  $totSurvDetail.ui.admCd 로 가져온다 */
				var lv_sido = $("#areaPopup_sido");
				var lv_sido_cd = $("#areaPopup_sido").val();
				var lv_sido_nm = $("#areaPopup_sido option:selected").text();
				var lv_sido_coor_x = $("#areaPopup_sido option:selected").attr("data-coor-x");
				var lv_sido_coor_y = $("#areaPopup_sido option:selected").attr("data-coor-y");
				var lv_sgg = $("#areaPopup_sgg");
				var lv_sgg_cd = $("#areaPopup_sgg").val();
				var lv_sgg_nm = $("#areaPopup_sgg option:selected").text();
				var lv_sgg_coor_x = $("#areaPopup_sgg option:selected").attr("data-coor-x");
				var lv_sgg_coor_y = $("#areaPopup_sgg option:selected").attr("data-coor-y");
				
				//지역변수 데이터 정리
				if(lv_sido_cd != "99") {
					lv_adm_coor_x = lv_sido_coor_x;
					lv_adm_coor_y = lv_sido_coor_y;
				}
				if(lv_sgg_cd != "999") {
					lv_adm_coor_x = lv_sgg_coor_x;
					lv_adm_coor_y = lv_sgg_coor_y;
				}
				
				if(lv_sido_cd == "99") lv_sido_cd = "00";
				lv_adm_cd = lv_sido_cd + lv_sgg_cd;
				lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm;
				if(lv_sido_cd == "99") lv_adm_cd = "00";
				else if(lv_sgg_cd == "999") lv_adm_cd = lv_sido_cd;
				if(lv_sido_cd == "99") lv_adm_nm = lv_sido_nm;
				else if(lv_sgg_cd == "999") lv_adm_nm = lv_sido_nm;
				console.log("aaa : p_map_region : " + p_map_region );
				//지도 Clear
				$totSurvDetailMap.ui.clearMap($totSurvDetailMap.ui.map);

				//색상/버블
				if(p_map_type == "color" || p_map_type == "bubble") {
					//색상/버블 (시도)
					if(p_map_region == "sido") {
						//
						$totSurvDetailMap.ui.setTotSurvData($totSurvDetailMap.ui.map, "sido", "color", "", "", "",  lv_surv_id, function(p_list) {
							//리스트에서 unit 가져오기
							var lv_unit = "개";
							var lv_unit_nm = "수";
							if(p_list != null && p_list.length > 0) {
								if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
								if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
							}
							//데이터 넣기
							$totSurvDetailMap.ui.map.setStatsData("normal", {"pAdmCd": "00", "result" : p_list}, "dt", lv_unit);
							
							
							//경계 그리기
							$totSurvDetailMap.ui.setTotSurvRegion($totSurvDetailMap.ui.map, "sido", $totSurvDetail.ui.bndYear, "", "", "", function() {
								if($totSurvDetailMap.ui.mapToggleId!=$totSurvDetail.ui.admCd){
									$totSurvDetailMap.ui.mapToggleId = $totSurvDetail.ui.admCd;
								}
								// 랭크이동시 mapToggleId를 초기화하고 하이라이트 처리
								var highLightAmdCd = $totSurvDetailMap.ui.mapToggleId;
								// 맵토글ID 초기화
								$totSurvDetailMap.ui.mapToggleId = "";
								$totSurvDetailMap.ui.map.setDetailPolyLayerHighlight(highLightAmdCd);
								// 하이라이트 처리 후 맵토글ID 세팅
								$totSurvDetailMap.ui.mapToggleId = highLightAmdCd;
							});
							
						});
						
					}
					//색상/버블 (시군구)
					else if(p_map_region == "sgg") {
						console.log("================  sgg  =================");
						console.log("aaa : isAtdrc : " + $totSurvDetailMap.ui.isAtdrc); 
						console.log("aaa : mapToggleId : " + $totSurvDetailMap.ui.mapToggleId);
						// 비자치구 일경우 
//						if($totSurvDetailMap.ui.isAtdrc == true && ($totSurvDetail.ui.admCd).length == 5 && ($totSurvDetailMap.ui.mapToggleId == "") ){ // 2020-10-07 [곽제욱] 순위검색 case 예외처리
						if($totSurvDetailMap.ui.isAtdrc == true && ($totSurvDetail.ui.admCd).length == 5 ){ // 2021-08-27 [김종현] 비자치구에서 토글시 오류 처리
//							//params.region = "sgg";
							var s_sido_cd = "";
							var s_sgg_cd = "";
							
							if($totSurvDetail.ui.admCd.length == 5){
								s_sido_cd = ($totSurvDetail.ui.admCd).substring(0,2);
								s_sgg_cd  = ($totSurvDetail.ui.admCd).substring(2,4)+"0";
								// atdrc 상태에서 랭크이동인 경우 맵토글id 재지정
								if($totSurvDetail.ui.admCd.substring(4,5)!= "0"){
									$totSurvDetailMap.ui.mapToggleId = $totSurvDetail.ui.admCd; 
								}
							} else {
								s_sido_cd = ($totSurvDetail.ui.admCd).substring(0,2);
								s_sgg_cd  = ($totSurvDetail.ui.admCd).substring(2,5); 
							}
							console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
							console.log(" sido_cd = " + s_sido_cd);
							console.log(" sgg_cd  = " + s_sgg_cd);
							console.log(" 비자치구 여부 체크 isAtdrc = " + $totSurvDetailMap.ui.isAtdrc);
							console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
							
							$totSurvDetailMap.ui.setTotSurvData($totSurvDetailMap.ui.map, "sgg", "color", s_sido_cd, s_sgg_cd, "", lv_surv_id, function(p_list) {
								//리스트에서 unit 가져오기
								var lv_unit = "개";
								var lv_unit_nm = "수";
								if(p_list != null && p_list.length > 0) {
									if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
									if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
								}
								
								//데이터 넣기
								$totSurvDetailMap.ui.map.setStatsData("normal", {"pAdmCd": s_sido_cd+s_sgg_cd, "result" : p_list}, "dt", lv_unit);
								
								//경계 그리기
								var lv_region = "sgg"; //비자치구 여부 체크
								
								$totSurvDetailMap.ui.setTotSurvRegion($totSurvDetailMap.ui.map, lv_region, $totSurvDetail.ui.bndYear, s_sido_cd+s_sgg_cd, "", "", function() {
									if($totSurvDetailMap.ui.mapToggleId!=$totSurvDetail.ui.admCd){
										$totSurvDetailMap.ui.mapToggleId = $totSurvDetail.ui.admCd;
									}
									// 랭크이동시 mapToggleId를 초기화하고 하이라이트 처리
									var highLightAmdCd = $totSurvDetailMap.ui.mapToggleId;
									// 맵토글ID 초기화
									$totSurvDetailMap.ui.mapToggleId = "";
									$totSurvDetailMap.ui.map.setDetailPolyLayerHighlight(highLightAmdCd);
									// 하이라이트 처리 후 맵토글ID 세팅
									$totSurvDetailMap.ui.mapToggleId = highLightAmdCd;
								});
							});
							
							
							
						}
						else{
							$totSurvDetailMap.ui.isAtdrc = false;
							$totSurvDetailMap.ui.setTotSurvData($totSurvDetailMap.ui.map, "sgg", "color", lv_sido_cd, lv_sgg_cd, "", lv_surv_id, function(p_list) {
								//리스트에서 unit 가져오기
								var lv_unit = "개";
								var lv_unit_nm = "수";
								if(p_list != null && p_list.length > 0) {
									if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
									if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
								}
								
								//데이터 넣기
								$totSurvDetailMap.ui.map.setStatsData("normal", {"pAdmCd": lv_sido_cd, "result" : p_list}, "dt", lv_unit);
								
								//경계 그리기
								var lv_region = "sgg"; //비자치구 여부 체크

								// 시군구레벨인 경우
								$totSurvDetailMap.ui.setTotSurvRegion($totSurvDetailMap.ui.map, lv_region, $totSurvDetail.ui.bndYear, lv_sido_cd, "", "", function() {
									if($totSurvDetailMap.ui.mapToggleId!=$totSurvDetail.ui.admCd){
										$totSurvDetailMap.ui.mapToggleId = $totSurvDetail.ui.admCd;
									}
									// 랭크이동시 mapToggleId를 초기화하고 하이라이트 처리
									var highLightAmdCd = $totSurvDetailMap.ui.mapToggleId;
									// 맵토글ID 초기화
									$totSurvDetailMap.ui.mapToggleId = "";
									$totSurvDetailMap.ui.map.setDetailPolyLayerHighlight(highLightAmdCd);
									// 하이라이트 처리 후 맵토글ID 세팅
									$totSurvDetailMap.ui.mapToggleId = highLightAmdCd;
								});
							});
							
						}
					}
					//색상/버블 (읍면동)
					else if(p_map_region == "emdong") {
						
						console.log("================  emdong  =================");
						
					}
					
					var zoomlevel = $totSurvDetailMap.ui.map.zoom;
					var coord_x;
					var coord_y;
					
					
					var adm_cd = $totSurvDetail.ui.admCd;
					console.log("[totSurvDetailMap] ###  adm_cd = " + adm_cd);					
				}
				//열지도
				else if(p_map_type == "heat") {}
				//POI
				else if(p_map_type == "poi") {}
			},
			
			/**
			 * 
			 * @name         : setTotSurvData
			 * @description  : 지도 데이터 가져오기
			 * @date         : 2020. 08. 12. 
			 * @author	     : 곽제욱
			 * @history 	 : 
			 * @param
			 * 		p_map : 지도
			 * 		p_region : 경계 구분 (sido/sgg/emdong/totreg) (시도/시군구/읍면동/소지역)
			 * 		p_type : 유형 (color/heat/poi) (색상(버블)/열지도/POI)
			 * 		p_sido_cd : 시도 코드 (옵션)
			 * 		p_sgg_cd : 시군구 코드 (옵션)
			 * 		p_emdong_cd : 읍면동 코드 (옵션)
			 * 		p_callback : 콜백 함수
			 */
			setTotSurvData : function(p_map, p_region, p_type, p_sido_cd, p_sgg_cd, p_emdong_cd, p_surv_id, p_callback) {
				
				//변수 선언
				var dataParams = {};
				dataParams.survId  = p_surv_id;
				dataParams.year  = $totSurvDetail.ui.bndYear;
				dataParams.item_seq  = $totSurvDetailMap.ui.selectedItemSeq;
				dataParams.region_cd = $totSurvDetail.ui.admCd;
				dataParams.isAtdrc = $totSurvDetail.ui.isAtdrc;
				
				// 주제별 차트 item 클릭 변수 설정
				if($totSurvDetail.ui.chartClickItmCd != ""){
					dataParams.itm_cd = $totSurvDetail.ui.chartClickItmCd;					
				}
				if($totSurvDetail.ui.chartClickC1 != ""){
					dataParams.c1 = $totSurvDetail.ui.chartClickC1;					
				}
				if($totSurvDetail.ui.chartClickC2 != ""){
					dataParams.c2 = $totSurvDetail.ui.chartClickC2;					
				}
				if($totSurvDetail.ui.chartClickC3 != ""){
					dataParams.c3 = $totSurvDetail.ui.chartClickC3;					
				}
				if($totSurvDetail.ui.dispDataType != ""){
					dataParams.disp_data_type = $totSurvDetail.ui.dispDataType;
				}
				
				//원 테이블로 조회
				var lv_url = contextPath+"/ServiceAPI/totSurv/detail/getTotDetailMapData.json";
				// ajax 시작
				$.ajax({
					url: lv_url,
				    type: 'post',
				    data: dataParams
				}).always(function(res) { // 전 처리
					if($("#"+p_map.id+"_loading").length) {
						$("#"+p_map.id+"_loading").hide();
					}
				}).done(function (res) { // 완료
					//정보 저장
					$totSurvDetailMap.ui.mapStatsData[p_surv_id+"_color_"+$totSurvDetail.ui.bndYear+"_"+res.result.level+"_"+$totSurvDetail.ui.admCd] = res.result.mapData;
					
					//콜백함수 호출
			    	if(typeof p_callback === "function") {
						p_callback(res.result.mapData);
					}
				}).fail(function (res) { // 실패
					//$totSurvMain.ui.alert(errorMessage);
				});
				// ajax 끝
			
			},
			
			/**
			 * 
			 * @name         : setTotSurvRegion
			 * @description  : 지도 경계 그리기
			 * @date         : 2020. 08. 13. 
			 * @author	     : 곽제욱
			 * @history 	 : 
			 * @param
			 * 		p_map : 지도 객체
			 * 		p_region : 경계 구분 (sido/sgg/emdong/totreg) (시도/시군구/읍면동/소지역)
			 * 		p_base_year : 대상년도 (옵션)
			 * 		p_sido_cd : 시도 코드 (옵션)
			 * 		p_sgg_cd : 시군구 코드 (옵션)
			 * 		p_emdong_cd : 읍면동 코드 (옵션)
			 * 		p_callback : 콜백 함수
			 */
			setTotSurvRegion : function(p_map, p_region, p_base_year, p_sido_cd, p_sgg_cd, p_emdong_cd, p_callback) {
				//년도 입력이 들어왔는데 bndYear 보다 큰 경우 bndYear 사용 
				if(p_base_year != undefined && p_base_year != null && p_base_year != "" && p_base_year > bndYear) {
					p_base_year = $totSurvDetail.ui.bndYear;
				}
				
				//시도의 경우 js파일을 사용하기 떄문에 년도를 넣어야함
				if(p_region == "sido"  || p_region == "sgg") {
					//년도 입력 안들어온경우 common.js bndYear 사용
					if(p_base_year == undefined || p_base_year == null || p_base_year == "") {
						p_base_year = $totSurvDetail.ui.bndYear;
					}
				}
				
				if($("#"+p_map.id+"_loading").length) {
					$("#"+p_map.id+"_loading").show();
				}
				
				//이미 불러온 정보는 다시 불러오지 않게 처리
				var lv_adm_cd = "00";
				var lv_year = "max";
				if(p_base_year != undefined && p_base_year != null && p_base_year != "") {
					lv_year = p_base_year;
				}
				if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "" && p_sido_cd != "00") {
					lv_adm_cd = p_sido_cd;
					if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "" && p_sgg_cd != "999") {
						lv_adm_cd += p_sgg_cd;
						if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") lv_adm_cd += p_emdong_cd;
					}
				}
				
				//시도 인 경우 데이터 양이 많아 속도가 느려지므로 geo_sido_xxxx.js 사용
				if(p_region == "sido") {
					//년도 입력 안들어온경우 common.js bndYear 사용
					if(p_base_year == undefined || p_base_year == null || p_base_year == "") {
						p_base_year = bndYear;
					}
					p_map.lastGeojsonInfo = null;
					//시도경계 불러오기
					p_map.openApiBoundarySido(p_base_year, function(p_map2, p_res) {
						//정보 저장
						$totSurvDetailMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd] = p_res;
						
						//로딩바 숨김
						if($totSurvMain.ui.currentPageName == "totSurvDetailMap" && p_map.id == "totSurvDetailMapMap") {
							//$totSurvMain.ui.loading(false);
						}
						if($("#"+p_map.id+"_loading").length) {
							$("#"+p_map.id+"_loading").hide();
						}
						
						var xcoor = 989674 ;
						var ycoor = 1818313;
						var zoomLevel = 1;
						p_map.mapMove([xcoor, ycoor], zoomLevel, true);
						
						//콜백함수 호출
				    	if(typeof p_callback === "function") {
							p_callback();
						}
				    	//$totSurvMain.ui.loading(false);
					});
				}
				//시도 이외의 경계 데이터 조회
				else {
					var params = {};
					params.region = p_region;
					
					// 시군구 경계 (비자치구)
					if(p_region == "sgg"){
						params.region = "atdrc";
						$totSurvDetailMap.ui.isAtdrc = false;
					}	
					
					params.base_year = $totSurvDetail.ui.bndYear;
					console.log("aaa : p_sido_cd : " + p_sido_cd);
					if(p_sido_cd.length==5){
						if($totSurvDetailMap.ui.mapToggleId != null && $totSurvDetailMap.ui.mapToggleId != ""){
							tempAdmCd = p_sido_cd.substring(0,4)+"0";
							p_sido_cd = tempAdmCd.substring(0,2);
							p_sgg_cd = tempAdmCd.substring(2,4)+"0";
						} else {
							tempAdmCd = p_sido_cd.substring(0,5);
							p_sido_cd = tempAdmCd.substring(0,2);
							p_sgg_cd = tempAdmCd.substring(2,5);
						}		
					} else {
						tempAdmCd = p_sido_cd.substring(0,2);
						p_sido_cd = tempAdmCd.substring(0,2);
					}
					
					if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "" && p_sido_cd != "00") params.sido_cd = p_sido_cd; 
					if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "" && p_sgg_cd != "999") params.sgg_cd = p_sgg_cd; 
					if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") params.emdong_cd = p_emdong_cd;
					
					// 비자치구 여부 체크
					// ajax 시작
					$.ajax({
						method: "POST",
						async: false,	// 반드시 동기처리 해야 함
						url: contextPath + "/ServiceAPI/totSurv/common/getAtdrcCheck.json",
					    data: {year:$totSurvDetail.ui.bndYear, region_cd:tempAdmCd},
						dataType: "json",
					}).done(function (res) { // 완료
						if(res.errCd == "0") {
							console.log("################# res = " + res.result.rslt);
							$totSurvDetailMap.ui.isAtdrc = res.result.rslt;
						}
					});
					

					// 비자치구 일경우 
					if($totSurvDetailMap.ui.isAtdrc == true){
						params.region = "sgg";
						// 타일맵에서 클릭시 sgg_cd 값이 없음  
						// $totSurvDetail.ui.admCd 클릭시 설정한 정보에서 전달 
						if($totSurvDetailMap.ui.mapToggleId != null && $totSurvDetailMap.ui.mapToggleId != ""){
							params.sido_cd = ($totSurvDetail.ui.admCd).substring(0,2);
							params.sgg_cd  = ($totSurvDetail.ui.admCd).substring(2,4)+"0";
						} else {
							params.sido_cd = ($totSurvDetail.ui.admCd).substring(0,2);
							params.sgg_cd  = ($totSurvDetail.ui.admCd).substring(2,5);
						}
						console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
						console.log(" params.region  = " + params.region);
						console.log(" params.sido_cd = " + params.sido_cd);
						console.log(" params.sgg_cd  = " + params.sgg_cd);
						console.log(" 비자치구 여부 체크 isAtdrc = " + $totSurvDetailMap.ui.isAtdrc);
						console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
					} 

						
					// ajax 시작
					$.ajax({
					    url: contextPath + "/ServiceAPI/totSurv/common/getTotSurvRegion.geojson",
					    type: 'get',
					    data: params
					}).done(function (res) { // 완료
						if(res.errCd == "0") {
							
							//지역모드세팅
							res.pAdmCd = "00";
							if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "" && p_sido_cd != "00") res.pAdmCd = p_sido_cd; 
							if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "" && p_sgg_cd != "999") res.pAdmCd += p_sgg_cd; 
							if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") res.pAdmCd += p_emdong_cd;
							
							//정보 저장
							$totSurvDetailMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+p_sido_cd+p_sgg_cd+p_emdong_cd] = res;
							//경계그리기
							p_map.setPolygonDataGeojson(res);
							var xcoor = 0;
							var ycoor = 0;
							var zoomLevel = $totSurvDetailMap.ui.map.zoom;
							var sggZoom = 2;
							var adm_cd = p_sido_cd
							if(adm_cd == '11' || adm_cd == '21' || adm_cd == '22' ||
								adm_cd == '24' || adm_cd == '25' || adm_cd == '26' || adm_cd == '29'){
								// 서울(11), 부산(21), 대구(22), 광주(24), 대전(25), 울산(26), 세종(29) 
			                	sggZoom = 5;
			                } else if(adm_cd == '23' || adm_cd == '39') {
			                    // 인천(23), 제주(39)
			                	sggZoom = 4;
			                } else if(adm_cd == '31' || adm_cd == '32' || adm_cd == '33' ||
			                	adm_cd == '34' || adm_cd == '35' || adm_cd == '36' || adm_cd == '37' || adm_cd == '38') {
			                    // 경기(31), 강원(32), 충북(33), 충남(34), 전북(35), 전남(36), 경북(37), 경남(38)
			                	sggZoom = 3;
			                }
							
							// 경기(31) => level 3으로

							//$totSurvDetailMap.ui.getSidoSggPos(p_sido_cd+p_sgg_cd);
							
							// p_region 이 시군구 이면 sido 의 center 좌표 가져오기
							if(p_region == "sgg"){
								xcoor = $("#areaPopup_sido option:selected").attr("data-coor-x");
								ycoor = $("#areaPopup_sido option:selected").attr("data-coor-y");
								
								//지도 조회						
								
								zoomLevel = $totSurvDetailMap.ui.map.zoom;
								//if(zoomLevel < sggZoom){
									zoomLevel = sggZoom;
								//}
								//zoomLevel = 4;
								if($totSurvDetailMap.ui.isAtdrc==true){
									xcoor = $("#areaPopup_sgg option:selected").attr("data-coor-x");
									ycoor = $("#areaPopup_sgg option:selected").attr("data-coor-y");
									zoomLevel = 6;
								}
							} else {
								xcoor = $("#areaPopup_sgg option:selected").attr("data-coor-x");
								ycoor = $("#areaPopup_sgg option:selected").attr("data-coor-y");
								//zoomLevel = $totSurvDetailMap.ui.map.zoom;
								zoomLevel = 6
							}
							$totSurvDetailMap.ui.checkIsAtdrc(p_sido_cd+p_sgg_cd.substring(0,2)+"0");
							
							// 시군구에서 슬라이드 이동(랭킹이동)시 x좌표 y좌표를 선택한 곳으로 세팅
							if($totSurvDetailMap.ui.mapToggleId != "" && $totSurvDetailMap.ui.mapToggleId.length == 5 && !$totSurvDetailMap.ui.isAtdrc){
								var tempAdmCd = $totSurvDetailMap.ui.mapToggleId;
								$totSurvDetailMap.ui.getSidoSggPos(tempAdmCd);
								$("#areaPopup_sido").val(tempAdmCd.substring(0,2));
								xcoor = $("#areaPopup_sgg option:selected").attr("data-coor-x");
								ycoor = $("#areaPopup_sgg option:selected").attr("data-coor-y");
							} else if($totSurvDetailMap.ui.mapToggleId != "" && $totSurvDetailMap.ui.mapToggleId.length == 5 && $totSurvDetailMap.ui.isAtdrc){
								var tempAdmCd = $totSurvDetailMap.ui.mapToggleId;
								$totSurvDetailMap.ui.getSidoSggPos(tempAdmCd);
								$("#areaPopup_sido").val(tempAdmCd.substring(0,2));
								xcoor = $("#areaPopup_sgg option:selected").attr("data-coor-x");
								ycoor = $("#areaPopup_sgg option:selected").attr("data-coor-y");
							}
							
							// 줌레벨 변경
							if($totSurvDetailMap.ui.isAtdrc == true){
								zoomLevel = zoomLevel + $totSurvDetailMap.ui.zoomResize();
							} else{
								if (adm_cd == $totSurvDetail.ui.admCd){
									zoomLevel = zoomLevel + $totSurvDetailMap.ui.zoomResize();
								}
							}
							$totSurvDetailMap.ui.prevZoom = zoomLevel;
							
							p_map.mapMove([xcoor, ycoor], zoomLevel, true);
						}else if(res.errCd == "-401") {
							//$totSurvMain.ui.alert(res.errMsg);
						}else{
							//$totSurvMain.ui.alert(res.errMsg);
						}
					}).fail(function (res) { // 실패
						//$totSurvMain.ui.alert(errorMessage);
					}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)

						if($("#"+p_map.id+"_loading").length) {
							$("#"+p_map.id+"_loading").hide();
						}
						
						//콜백함수 호출
				    	if(typeof p_callback === "function") {
							p_callback();
						}
				    	//$totSurvMain.ui.loading(false);
					});
					// ajax 끝
				}
				
			},
			
			/**
			 * 
			 * @name         : setTotSurvOpenApiRegion
			 * @description  : 지도 경계 그리기(개방형 지도)
			 * @date         : 2020.10.29
			 * @author	     : 한광희
			 * @history 	 : 
			 * @param
			 * 		p_map : 지도 객체
			 * 		p_region : 경계 구분 (sido/sgg/emdong/totreg) (시도/시군구/읍면동/소지역)
			 * 		p_base_year : 대상년도 (옵션)
			 * 		p_sido_cd : 시도 코드 (옵션)
			 * 		p_sgg_cd : 시군구 코드 (옵션)
			 * 		p_emdong_cd : 읍면동 코드 (옵션)
			 * 		p_callback : 콜백 함수
			 */
			setTotSurvOpenApiRegion : function(p_map, p_region, p_base_year, p_sido_cd, p_sgg_cd, p_emdong_cd, p_callback) {
				//년도 입력이 들어왔는데 bndYear 보다 큰 경우 bndYear 사용 
				if(p_base_year != undefined && p_base_year != null && p_base_year != "" && p_base_year > bndYear) {
					p_base_year = $totSurvDetail.ui.bndYear;
				}
				
				//시도의 경우 js파일을 사용하기 떄문에 년도를 넣어야함
				if(p_region == "sido"  || p_region == "sgg") {
					//년도 입력 안들어온경우 common.js bndYear 사용
					if(p_base_year == undefined || p_base_year == null || p_base_year == "") {
						p_base_year = $totSurvDetail.ui.bndYear;
					}
				}
				
				if($("#"+p_map.id+"_loading").length) {
					$("#"+p_map.id+"_loading").show();
				}
				
				//이미 불러온 정보는 다시 불러오지 않게 처리
				var lv_adm_cd = "00";
				var lv_year = "max";
				if(p_base_year != undefined && p_base_year != null && p_base_year != "") {
					lv_year = p_base_year;
				}
				if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "" && p_sido_cd != "00") {
					lv_adm_cd = p_sido_cd;
					if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "" && p_sgg_cd != "999") {
						lv_adm_cd += p_sgg_cd;
						if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") lv_adm_cd += p_emdong_cd;
					}
				}
				
				var params = {};
				params.region = p_region;
				params.base_year = $totSurvDetail.ui.bndYear;
				
				if(p_sido_cd.length==5){
					tempAdmCd = p_sido_cd.substring(0,5);
					p_sido_cd = tempAdmCd.substring(0,2);
					p_sgg_cd = tempAdmCd.substring(2,5);
				} else if(p_sido_cd.length==7){
					tempAdmCd = p_sido_cd;
					p_sido_cd = tempAdmCd.substring(0,2);
					p_sgg_cd = tempAdmCd.substring(2,5);
					p_emdong_cd = tempAdmCd.substring(5,7);
				} else {
					tempAdmCd = p_sido_cd.substring(0,2);
					p_sido_cd = tempAdmCd.substring(0,2);
				}
				
				if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "" && p_sido_cd != "00") params.sido_cd = p_sido_cd; 
				if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "" && p_sgg_cd != "999") params.sgg_cd = p_sgg_cd; 
				if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") params.emdong_cd = p_emdong_cd;
										
				// ajax 시작
				$.ajax({
				    url: contextPath + "/ServiceAPI/totSurv/common/getTotSurvRegion.geojson",
				    type: 'get',
				    data: params
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						
						//지역모드세팅
						res.pAdmCd = "00";
						if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "" && p_sido_cd != "00") res.pAdmCd = p_sido_cd; 
						if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "" && p_sgg_cd != "999") res.pAdmCd += p_sgg_cd; 
						if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") res.pAdmCd += p_emdong_cd;
						
						//정보 저장
						$totSurvDetailMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+p_sido_cd+p_sgg_cd] = res;
						//경계그리기
						p_map.setPolygonDataGeojson(res);
						var xcoor = 0;
						var ycoor = 0;
						var zoomLevel = $totSurvDetailMap.ui.map.zoom;				
						
						if(p_region == "emdong"){
							xcoor = $("#OpenAPI_sgg option:selected").attr("data-coor-x");
							ycoor = $("#OpenAPI_sgg option:selected").attr("data-coor-y");
							zoomLevel = 6;
							
						} else {
							xcoor = $("#OpenAPI_emdong option:selected").attr("data-coor-x");
							ycoor = $("#OpenAPI_emdong option:selected").attr("data-coor-y");
							zoomLevel = 7;
						}
						
						// 줌레벨 변경
						zoomLevel = zoomLevel + $totSurvDetailMap.ui.openApiZoomResize(tempAdmCd);
						$totSurvDetailMap.ui.prevZoom = zoomLevel;
						
						p_map.mapMove($totSurvDetailMap.ui.getOpenAPISidoSggPos($totSurvDetailMapApi.region_cd), zoomLevel, false);
					}else if(res.errCd == "-401") {
						//$totSurvMain.ui.alert(res.errMsg);
					}else{
						//$totSurvMain.ui.alert(res.errMsg);
					}
				}).fail(function (res) { // 실패
					//$totSurvMain.ui.alert(errorMessage);
				}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)

					if($("#"+p_map.id+"_loading").length) {
						$("#"+p_map.id+"_loading").hide();
					}
					
					//콜백함수 호출
			    	if(typeof p_callback === "function") {
						p_callback();
					}
			    	//$totSurvMain.ui.loading(false);
				});
				// ajax 끝
				
			},
			
			/**
			 * @name         : zoomResize  
			 * @description  : zoom level 추가 조절
			 *                 
			 * @date         : 2020.09.28
			 * @author	     : 
			 * @history 	 :
			 * @parameter
			 */
			zoomResize : function(){
				var zoomSize = 0;
				var adm_cd = "";
				if($totSurvDetailMap.ui.isAtdrc){
					adm_cd = $totSurvDetail.ui.admCd.substring(0,4)+"0";
				} else {
					adm_cd = $totSurvDetail.ui.admCd;
				}
				
				if($totSurvMain.ui.zoomUpRegion.indexOf(adm_cd) > -1){
					zoomSize = -1;
				} else if($totSurvMain.ui.zoomDownRegion.indexOf(adm_cd) > -1) {
					// 2020.10.12 hsJu 자치구, 비자치구 줌레벨 수정  START
					if($totSurvDetail.ui.admCd.lastIndexOf(0,4) > -1){
						if(!$totSurvDetailMap.ui.isAtdrc){
							zoomSize = 1;
						}
					}
					else{
						zoomSize = -1;
					}
					// 2020.10.12 hsJu 자치구, 비자치구 줌레벨 수정  END
				} else if($totSurvMain.ui.zoomDoubleUpRegion.indexOf(adm_cd) > -1){
					zoomSize = -2;
				} else if($totSurvMain.ui.zoomDoubleDownRegion.indexOf(adm_cd) > -1){
					zoomSize = 2;
				}
				return zoomSize;
			},
			
			/**
			 * @name         : openApiZoomResize  
			 * @description  : 개방형지도 zoom level 조정
			 *                 
			 * @date         : 2020.11.05
			 * @author	     : 한광희
			 * @history 	 :
			 * @parameter
			 */
			openApiZoomResize : function(tempAdmCd){
				var zoomSize = 0;
				
				if($totSurvDetailMap.ui.openApiZoomUpRegion.indexOf(tempAdmCd) > -1){
					zoomSize = 1;
				} else if($totSurvDetailMap.ui.openApiZoomDownRegion.indexOf(tempAdmCd) > -1) {
					zoomSize = -1;
				} else if($totSurvDetailMap.ui.openApiZoomDoubleUpRegion.indexOf(tempAdmCd) > -1){
					zoomSize = 2;
				} else if($totSurvDetailMap.ui.openApiZoomDoubleDownRegion.indexOf(tempAdmCd) > -1){
					zoomSize = -2;
				} else if($totSurvDetailMap.ui.openApiZoomThreeDownRegion.indexOf(tempAdmCd) > -1){
					zoomSize = -3;
				}
				return zoomSize;
			},
			
			/**
			 * 
			 * @name         : getTotSurvRegionYear
			 * @description  : 지도 경계 년도 가져오기
			 * @date         : 2020. 08. 13. 
			 * @author	     : 곽제욱
			 * @history 	 : 
			 * @param
			 */
			getTotSurvRegionYear : function() {
				if($totSurvDetailMap.ui.mapData == null) {
					return bndYear;
				}
				var lv_data = $totSurvDetailMap.ui.mapData.data;
				var lv_year = bndYear;
				if(lv_data.surv_year != undefined && lv_data.surv_year != null && lv_data.surv_year != "" && (""+lv_data.surv_year).length > 4) {
					lv_year = lv_data.surv_year.substr(0,4);
					if($.isNumeric(lv_year) == false) {
						if(lv_data.surv_year != undefined && lv_data.surv_year != null && lv_data.surv_year != "") {
							lv_year = lv_data.surv_year;
						}
						else {
							lv_year = bndYear;
						}
					}
				}
				else if(lv_data.surv_year != undefined && lv_data.surv_year != null && lv_data.surv_year != "") {
					lv_year = lv_data.surv_year;
				}
				return lv_year;
			},
			
			/**
			 * 
			 * @name         : openApiBoundarySido
			 * @description  : 지도 경계 년도 가져오기
			 * @date         : 2020. 08. 13. 
			 * @author	     : 곽제욱
			 * @history 	 : 
			 * @param
			 */
			//일자리현황 전국시도경계가져오기
			openApiBoundarySido : function (year, callback) {// used
				$totSurvMain.ui.log("$totSurvDetailMap.ui.openApiBoundarySido - begin");
				this.lastGeojsonInfo ;
				
				$.ajax({
					  type: "GET",
					  url: "/js/data/geo_sido_" + year + ".js",
					  success: function(res) {
						  res["pAdmCd"] = "00";
						  var tmpOption = {
								  year : year,
								  adm_cd : "00"
						  }
						  
						  $totSurvDetailMap.ui.map = $totSurvDetailMap.ui.mapList[$totSurvDetailMap.ui.curMapId];
						  
						  $totSurvDetailMap.ui.map.mapMove([989674, 1818313], 2);
						  
						  $totSurvDetailMap.ui.lastGeojsonInfo = tmpOption ;
						  $totSurvDetailMap.ui.setPolygonDataGeojson(res);
						  
						  if (callback != undefined && callback != null && callback instanceof Function) {
							  callback.call(undefined, this, res); //9월 서비스
						  }
					  } ,
					  dataType: "json",
					  error:function(e){  
				            //alert(e.responseText);  
				      }  
				});
			},
			
			/**
			 * 
			 * @name         : setPolygonDataGeojson
			 * @description  : 지도 경계 년도 가져오기
			 * @date         : 2020. 08. 13. 
			 * @author	     : 곽제욱
			 * @history 	 : 
			 * @param
			 */
			setPolygonDataGeojson : function (geoData) {// used
				$totSurvMain.ui.log("$totSurvDetailMap.ui.setPolygonDataGeojson - begin");
				
				var that = $totSurvDetailMap.ui;
				
				if(that.MapData.length > 0){
					geoData = this.combineTotSurvData(geoData);
				}
				
				// res = combineTotSurvData(res);
				if (geoData.combine && this.data.length > 0) {
					if (this.map.dataGeojson) {
						this.map.dataGeojson.remove();
						//this.removeCaption();
						this.map.dataGeojson = null;
					}
					this.map.addPolygonGeoJson(geoData, "data");
					
					this.map.dataGeojsonLayer = geoData;
					if (this.map.legend != null) {
						//this.legend.changeDataMode(this.legend.selectType);
						this.map.legend.changeDataMode(that.MapType);
					}
				}
				else {
					this.map.addPolygonGeoJson(geoData, "polygon");
					
					// 데이터경계가 있을 경우,
					// 지역경계가 데이터경계와 같을 때, 해당 지역경계를 지운다.
					if (this.dataGeojson) {
						if (this.geojson.getBounds().equals(this.dataGeojson.getBounds())) {
							this.geojson.remove();
						}	
					}
					
					if (this.multiLayerControl != undefined && this.multiLayerControl.dataGeojson) {
						for (var i=0; i<this.multiLayerControl.dataGeojson.length; i++) {
							var dataGeojson = this.multiLayerControl.dataGeojson[i];
							if (this.geojson.getBounds().equals(dataGeojson.getBounds())) {
								this.geojson.remove();
							}	
						}
					}
				}
				
				if (this.data.length > 0) {
					if (this.data[0].kosis) {
						//interactiveMapKosis.setResultDataOnMap();
					}
				}
				
				//손원웅 20181011 왜 비웠는지?
				//this.data = [];
				if (this.map.delegate && this.map.delegate.callbackFunc && this.map.delegate.callbackFunc.didFinishedHadmaArea instanceof Function) {
					this.map.delegate.callbackFunc.didFinishedHadmaArea(geoData, that);
				}
			},
			
			combineTotSurvData : function (boundData, isPass) {// used
				$totSurvMain.ui.log("$totSurvDetailMap.ui.combineTotSurvData - begin");
				
				this.data = $totSurvDetailMap.ui.MapData;
				//this.dataPolygonCode = this.curPolygonCode;	// 조회했던 경계레벨

				for ( var k = 0; k < this.data.length; k++) {
					if (this.data[k] != null) {
						boundData["combine"] = true;
					}else {
						boundData["combine"] = false;
					}
					
					for ( var i = 0; i < boundData.features.length; i++) {
						var adm_cd = boundData.features[i].properties.adm_cd;
						if (boundData.features[i].info == null) {
							boundData.features[i]["info"] = [];
						}
						
						if (this.data[k] != null) {
							if(this.data[k].result != null) {
								for ( var x = 0; x < this.data[k].result.length; x++) {
									for (key in this.data[k].result[x]) {
										if (key == "adm_cd") {
											if (adm_cd == this.data[k].result[x].adm_cd) {
												this.data[k].result[x]["showData"] = this.data[k].showData;
												this.data[k].result[x]["unit"] = this.data[k].unit;
												this.data[k].result[x]["legendIndex"] = k;
												boundData.features[i].info.push(this.data[k].result[x]);
												boundData.features[i]["dataIdx"] = x;
												boundData.features[i]["_dataIdx"] = this.data[k].result[x]["_dataIdx"];
												boundData.features[i]["dataLength"] = this.data.length;
												break;
											}
											break;
										}
									}
									
									
								}

							}
						}
						
					}
				}

				return boundData;
				
			},
			
			/**
			 * checkIsAtdrc
			 * 비자치구 여부 체크 
			 * admCd
			 */
			checkIsAtdrc : function(admCd){
				$totSurvDetailMap.ui.isAtdrc = false;
				// 비자치구 여부 체크
				if(admCd != undefined && admCd.length == 5){
					var tmpSido = admCd.substring(0,2);
					
					
					// ajax 시작
					$.ajax({
						method: "POST",
						async: false,	// 반드시 동기처리 해야 함
						url: contextPath + "/ServiceAPI/totSurv/common/getAtdrcCheck.json",
					    data: {year:$totSurvDetail.ui.bndYear, region_cd:admCd},
						dataType: "json",
					}).done(function (res) { // 완료
						if(res.errCd == "0") {
							console.log("################# res = " + res.result.rslt);
							$totSurvDetailMap.ui.isAtdrc = res.result.rslt;
						}
					});
					
				}
				else{
					$totSurvDetailMap.ui.isAtdrc = false;
				}
			},
			
			/**
			 * @name         : getSidoSggPos  
			 * @description  : region_cd의 지도상의 center좌표값 반환
			 *                 region_cd
			 * @date         : 2020.09.11
			 * @author	     : 
			 * @history 	 :
			 */
			 getSidoSggPos : function(region_cd){
				
				var sido;
				var sgg ;
				if(region_cd.length == 2){
					$("#areaPopup_sido option:selected").removeAttr("selected");
					sido = region_cd.substring(0,2);
					if(sido != "99"){
						$totSurvDetail.ui.getAreaPopupSido(sido);	// 시도코드 조회
						$totSurvDetail.ui.getAreaPopupSgg(sido, "999");
						console.log(" val = " + $("#areaPopup_sido option:selected").val());
						console.log(" x = " + $("#areaPopup_sido option:selected").attr("data-coor-x"));
						console.log(" Y = " + $("#areaPopup_sido option:selected").attr("data-coor-y"));
						
						$("span[name='itemSggNm']").html("");
						$("span[name='itemSggNm']").html($("#areaPopup_sido option:selected").text());
						
						return [$("#areaPopup_sido option:selected").attr("data-coor-x"), $("#areaPopup_sido option:selected").attr("data-coor-y")];
					}
					//20201201 박은식 선택된 경계 재선택 시 초기화 로직 추가 START 
					else {
						$totSurvDetail.ui.getAreaPopupSgg("99", "999");
						console.log(" val = " + $("#areaPopup_sido option:selected").val());
						console.log(" x = " + $("#areaPopup_sido option:selected").attr("data-coor-x"));
						console.log(" Y = " + $("#areaPopup_sido option:selected").attr("data-coor-y"));
						
						$("span[name='itemSggNm']").html("");
						$("span[name='itemSggNm']").html($("#areaPopup_sido option:selected").text());
						
						return [$("#areaPopup_sido option:selected").attr("data-coor-x"), $("#areaPopup_sido option:selected").attr("data-coor-y")];
					//20201201 박은식 선택된 경계 재선택 시 초기화 로직 추가 END
					}
				}
				else if(region_cd.length == 5){
					$("#areaPopup_sgg option:selected").removeAttr("selected");
					sido = region_cd.substring(0,2);
					sgg =  region_cd.substring(2,5);
					if(sido != undefined && sgg != null){
						if($totSurvMap.ui.mapToggleId == "" && $totSurvDetail.ui.admCd.length ==5 && ($totSurvDetail.ui.admCd != region_cd)){
							console.log(">>> 지도 선택 해제");
							
							sido = $totSurvDetail.ui.admCd.substring(0,2);
							sgg =  $totSurvDetail.ui.admCd.substring(2,5);
							$totSurvDetail.ui.getAreaPopupSgg(sido, sgg);
							
							console.log(" val = " + $("#areaPopup_sgg option:selected").val());
							console.log(" x = " + $("#areaPopup_sgg option:selected").attr("data-coor-x"));
							console.log(" Y = " + $("#areaPopup_sgg option:selected").attr("data-coor-y"))
						}
						else{
							$totSurvDetail.ui.getAreaPopupSgg(sido, sgg);
							console.log(" val = " + $("#areaPopup_sgg option:selected").val());
							console.log(" x = " + $("#areaPopup_sgg option:selected").attr("data-coor-x"));
							console.log(" Y = " + $("#areaPopup_sgg option:selected").attr("data-coor-y"))
						}
						
						$("span[name='itemSggNm']").html("");
						$("span[name='itemSggNm']").html($("#areaPopup_sido option:selected").text()+" "+$("#areaPopup_sgg option:selected").text());
						return [$("#areaPopup_sido option:selected").attr("data-coor-x"), $("#areaPopup_sido option:selected").attr("data-coor-y")];
					}
				}
					
			},
			
			/**
			 * @name         : getOpenAPISidoSggPos  
			 * @description  : region_cd의 지도상의 center좌표값 반환
			 *                 region_cd
			 * @date         : 2020.09.11
			 * @author	     : 
			 * @history 	 :
			 */
			 getOpenAPISidoSggPos : function(region_cd){
				var sido;
				var sgg ;
				var emdong;
				if(region_cd.length == 2){
					$("#OpenAPI_sido option:selected").removeAttr("selected");
					sido = region_cd.substring(0,2);
					if(sido != "99"){
						$totSurvDetail.ui.getOpenAPIAreaSido(sido);	// 시도코드 조회
						$totSurvDetail.ui.getOpenAPIAreaSgg(sido, "999");
						console.log(" val = " + $("#OpenAPI_sido option:selected").val());
						console.log(" x = " + $("#OpenAPI_sido option:selected").attr("data-coor-x"));
						console.log(" Y = " + $("#OpenAPI_sido option:selected").attr("data-coor-y"));
												
						return [$("#OpenAPI_sido option:selected").attr("data-coor-x"), $("#OpenAPI_sido option:selected").attr("data-coor-y")];
					}
				}
				else if(region_cd.length == 5){
					$("#OpenAPI_sgg option:selected").removeAttr("selected");
					sido = region_cd.substring(0,2);
					sgg =  region_cd.substring(2,5);
					if(sido != undefined && sgg != null){
						$totSurvDetail.ui.getOpenAPIAreaSgg(sido, sgg);
						console.log(" val = " + $("#OpenAPI_sgg option:selected").val());
						console.log(" x = " + $("#OpenAPI_sgg option:selected").attr("data-coor-x"));
						console.log(" Y = " + $("#OpenAPI_sgg option:selected").attr("data-coor-y"))
						return [$("#OpenAPI_sgg option:selected").attr("data-coor-x"), $("#OpenAPI_sgg option:selected").attr("data-coor-y")];
					}
				} else if(region_cd.length == 7){
					$("#OpenAPI_emdong option:selected").removeAttr("selected");
					sido = region_cd.substring(0,2);
					sgg =  region_cd.substring(2,5);
					emdong =  region_cd.substring(5,7);
					if(sido != undefined && sgg != null && emdong != null){
						$totSurvDetail.ui.getOpenAPIAreaEmdong(sido, sgg, emdong);
						console.log(" val = " + $("#OpenAPI_emdong option:selected").val());
						console.log(" x = " + $("#OpenAPI_emdong option:selected").attr("data-coor-x"));
						console.log(" Y = " + $("#OpenAPI_emdong option:selected").attr("data-coor-y"))
						return [$("#OpenAPI_emdong option:selected").attr("data-coor-x"), $("#OpenAPI_emdong option:selected").attr("data-coor-y")];
					}
				}
					
			},
	};
	
	// ==============================//
	// map event callback
	// ==============================//
	$totSurvDetailMap.callbackFunc = {

			// 맵이동 시작시, 콜백 호출
			didMapMoveStart : function(event, map) {
				console.log("[totSurvDetailMap.js] didMapMoveStart 호출");
			},

			// 맵이동 종료시, 콜백 호출
			didMapMoveEnd : function(event, map) {
				
				console.log("[totSurvDetailMap.js] didMapMoveEnd 호출");
				console.log("[totSurvDetailMap.js] didMapMoveEnd() $totSurvDetailMap.ui.dropBtnInfo[map.id] [" + $totSurvDetailMap.ui.dropBtnInfo[map.id]);
										
			},
			
			// 맵 줌시작 시, 콜백 호출
			didMapZoomStart : function(event, map) {
			},

			// 맵 줌 종료 시, 콜백 호출
			didMapZoomEnd : function(event, map) {
			},
						
			// 드랍종료 시, 콜백 호출
			didMapDropEnd : function(event, source, layer, data, map) {},
			
			
			// 더블클릭 시, 콜백 호출
			didMapDoubleClick : function(btn_id, tmpParam) {},
			
			// 마우스 over 시, 콜백 호출
			didMouseOverPolygon : function(event, data, type, map) {	
				if (data.tooltip != undefined && !data.tooltip) {
					return;
				}
				if (type != "polygon") {
					if( map.isInnerMapShow2!=undefined && map.isInnerMapShow2 ) { //mng_s 그리드일 경우 
						//그리드일 경우 화면에 툴팁을 표출하지 않는다. ==> 표출하는것으로 변경됨
						if (type == "data") {
								map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
						if (data.info.length > 0) { //데이터가 있을 경우만 툴팁을 보여준다.
							$totSurvDetailMap.ui.createInfoTooltip(event, data, type, map);
						}
					} else if( map.isInnerMapShow3!=undefined && map.isInnerMapShow3 ) { //mng_s 그리드일 경우 
						if (type == "data") {
								map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
						if (data.info.length > 0) { //데이터가 있을 경우만 툴팁을 보여준다.
							$totSurvDetailMap.ui.createInfoTooltip(event, data, type, map);
						}
					} else {
						if (type == "data") {
								map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
						$totSurvDetailMap.ui.createInfoTooltip(event, data, type, map);
					}
				}else {
					if( map.isInnerMapShow2!=undefined && map.isInnerMapShow2 ) { //mng_s 그리드일 경우 
						//그리드일 경우 화면에 툴팁을 표출하지 않는다. ==> 표출하는것으로 변경됨
						$totSurvDetailMap.ui.createInfoTooltip(event, data, type, map);
					} else {
						$totSurvDetailMap.ui.createInfoTooltip(event, data, type, map);
					}
				}
			},

			
			// 마우스 out 시, 콜백 함수
			didMouseOutPolygon : function(event, data, type, map) {
				if (map.selectedBoundMode != null && map.selectedBoundMode == "multi") {
					for (var i=0; i<map.selectedBoundList.length; i++) {
						var layer = map.selectedBoundList[i];
						if (event.target == layer) {
							layer.setStyle({
								weight : 3,
								color : "white",
								dashArray : layer.options.dashArray,
								fillOpacity : 0.7,
								fillColor : "#F06292"
							});								
						}
					}
				}
				$("#mapToolTipTable").hide();
			},

			// 경계 선택 시, 콜백 함수
			didSelectedPolygon : function(event, data, type, map) {
				if (type == "data") {
					if(data.info[0].adm_cd.length == 7 ){
						//alert("kosis 읍면동 정보 클릭!!!");
					}
					else{
						if($("#openAPIBtn").hasClass("on")){
							return false;
						}
						
						var title = "";

						if($totSurvDetailMap.ui.mapToggleId != data.info[0].adm_cd) {
							var adm_cd = data.info[0].adm_cd;
							var sidoCd = adm_cd.substring(0,2);
							var sggCd = "999";
							$totSurvDetail.ui.admCd = adm_cd;
							$totSurvDetailMap.ui.getSidoSggPos(adm_cd);
							
							$totSurvDetail.ui.getDataJson($totSurvDetailMap.ui.selectedSurvId, $totSurvDetailMap.ui.selectedItemSeq, "2")
							
							// 선택한 지역 하이라이트
				    		$totSurvDetailMap.ui.map.setDetailPolyLayerHighlight(adm_cd);
				    		$totSurvDetailMap.ui.mapToggleId = data.info[0].adm_cd;
				    		
				    		if($totSurvMain.ui.chartTarget != ""
				    			&& typeof($totSurvMain.ui.chartIndex) == "number"
				    			&& $totSurvMain.ui.chartColor != ""){
				    			 
				    			$totSurvDetail.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
				    		}
   						//20201201 박은식 선택된 경계 재선택 시 초기화 START
						} else {
							if($totSurvDetailMap.ui.mapToggleId.length == 2){
								var adm_cd = $totSurvDetailMap.ui.mapToggleId;
								$totSurvDetailMap.ui.map.setDetailPolyLayerHighlight(adm_cd);
								$totSurvDetailMap.ui.mapToggleId = "99";
								$totSurvDetail.ui.admCd = "99";
								$totSurvDetail.ui.getDataJson($totSurvDetailMap.ui.selectedSurvId, $totSurvDetailMap.ui.selectedItemSeq, "2")
								$totSurvDetailMap.ui.getSidoSggPos("99")
							} else {
								if($totSurvDetailMap.ui.isAtdrc == true){
									var adm_cd = $totSurvDetailMap.ui.mapToggleId.substring(0,4)+"0";
									$totSurvDetailMap.ui.map.setDetailPolyLayerHighlight(adm_cd);
									$totSurvDetailMap.ui.mapToggleId = $totSurvDetailMap.ui.mapToggleId.substring(0,4)+"0"
									$totSurvDetail.ui.admCd = adm_cd;
									$totSurvDetail.ui.getDataJson($totSurvDetailMap.ui.selectedSurvId, $totSurvDetailMap.ui.selectedItemSeq, "2")
									$totSurvDetailMap.ui.getSidoSggPos(adm_cd)
								} else {
									var adm_cd = $totSurvDetailMap.ui.mapToggleId.substring(0,2);
									$totSurvDetailMap.ui.map.setDetailPolyLayerHighlight(adm_cd);
									$totSurvDetailMap.ui.mapToggleId = $totSurvDetailMap.ui.mapToggleId.substring(0,2);
									$totSurvDetail.ui.admCd = adm_cd;
									$totSurvDetail.ui.getDataJson($totSurvDetailMap.ui.selectedSurvId, $totSurvDetailMap.ui.selectedItemSeq, "2")
									$totSurvDetailMap.ui.getSidoSggPos(adm_cd)
								}
							}
							$totSurvDetail.ui.getDataJson($totSurvDetailMap.ui.selectedSurvId, $totSurvDetailMap.ui.selectedItemSeq, "2")
							if($totSurvMain.ui.chartTarget != ""
				    			&& typeof($totSurvMain.ui.chartIndex) == "number"
				    			&& $totSurvMain.ui.chartColor != ""){
				    			 
				    			$totSurvDetail.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
							}
   						//20201201 박은식 선택된 경계 재선택 시 초기화 END
						}
					}
				}
				
			},

			
			/**
			 * 
			 * @name         : didDrawCreate
			 * @description  : 사용자지정 draw 이벤트콜백
			 * @date         : 2014. 10. 30. 
			 * @author	     : 
			 * @history 	 :
			 * @param @param event 이벤트객체
			 * @param @param type  객체타입
			 * @param @param map   델리케이트
			 */
			didDrawCreate : function(event, type, map) {
				var layer = event.layer;
				var area = "";
				
				//다각형 및 사각형일때, 특정 영역을 넘어서면 알림 메시지 호출
				if (type == "polygon" || type == "rectangle") {
					var shapeArea = layer._getArea();
					if (shapeArea > 113000000) {
						messageAlert.open('최적의 서비스 속도를 위해 사용자 임의영역 면적이 113000000m² 이하가 되어야 합니다.');
						layer._shapeGroup.removeLayer(layer._shape);
						layer._shape = null;
						layer._map.dragging.enable();
						map.mapBtnInfo.doClearSelectedBound();
						map.mapBtnInfo.setFixedBoundBtn(false);
						return;
					}
				}
				
				if(type == "polygon") {
					area = "POLYGON((";
					for(var i = 0; i < layer.getUTMKs()[0].length; i++) {
						area += layer.getUTMKs()[0][i].x + " " + 
								 layer.getUTMKs()[0][i].y + ",";
						
						if(i == layer.getUTMKs()[0].length - 1) {
							area += layer.getUTMKs()[0][0].x + " " + 
							         layer.getUTMKs()[0][0].y;
						}
					}
					area += "))";
				}
				else if(type == "circle") {
					area = "CIRCLE(" + 
						    	layer._utmk.x + " " + 
						    	layer._utmk.y + "," + 
						    	layer.getRadius()+ 
						    ")";
				}
				else if(type == "rectangle") {
					area = "RECTANGLE(" +
								layer._utmks[0][0].x + " " + 
								layer._utmks[0][0].y + "," + 
								layer._utmks[0][2].x + " " +
								layer._utmks[0][2].y + 
							")";
				}
				
				if (map.curPolygonCode == 5) {
					map.setZoom(9);
					map.curPolygonCode = 5;
				}
				map.selectedBoundMode = "multi";
				map.selectedBoundList = [];
				
				//전국
				if (map.curPolygonCode == "1") {
					if (map.geojson) {
						map.geojson.remove();
					}
					if (map.dataGeojson) {
						map.dataGeojson.remove();
					}
					map.multiLayerControl.clear();
					map.openApiBoundaryContry(function(map, res) {
						map.addPolygonGeoJson(res, "polygon");
						if (map.geojson) {
							map.geojson.eachLayer(function(layer) {
								layer.setStyle({
									weight : 3,
									color : "white",
									dashArray : layer.options.dashArray,
									fillOpacity : 0.7,
									fillColor : "#F06292"
								});
								map.selectedBoundList.push(layer);
							});
						}
						event.shapeGroup.thisShapeRemove();
					});
				}else {
					$totSurvDetailMapApi.request.userAreaBoundInfo(area, type, map.curPolygonCode, event, map);	
				}
				
			},
			
			/**
			 * 
			 * @name         : didFinishedMultidata
			 * @description  : 사용자경계(multi layer data) 조회 후, 콜백
			 * @date         : 
			 * @author	     : 
			 * @history 	 :
			 * @param dataList 표출된 데이터리스트
			 * @param admCdList 행정동코드리스트
			 * @param @param map   델리케이트
			 */
			didFinishedMultidata : function(dataList, admCdList, map) {}

	};
	
	$totSurvDetailMap.event = {
			
			/**
			 * 
			 * @name         : setUIEvent
			 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date         : 2014. 10. 15. 
			 * @author	     : 
			 * @history 	 :
			 * @param
			 */	
			setUIEvent : function() {}
	};
	
}(window, document));



