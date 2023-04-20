/**
 * 총조사시각화 시계열 지도
 *
 * history :
 * 2020.10.07			총조사시각화 시계열 지도
 *
 *
 * author : 주형식
 * version : 1.0
 * see :
 *
 */
(function(W, D) {
	W.$totSurvTmsMap = W.$totSurvTmsMap || {};
	$(document).ready(
		function() {});
	
	$totSurvTmsMap = {
			noReverseGeoCode : false,
			// 2020-11-03 [곽제욱] 로딩바 추가 START
			loadingBar : {
				loadCnt : 0,
				closeCnt : 0,
				show : function (type) {
					this.loadCnt += 1;
					if ($( "#loadingbar" ).length != null && $( "#loadingbar" ).length > 0) {
						return;
					}
					this.blockUI = document.createElement("DIV");
					this.blockUI.setAttribute("id", "loadingbar");
					this.blockUI.style.backgroundColor = "#D3D3D3";
					this.blockUI.style.border = "0px solid black";
					this.blockUI.style.position = "absolute";
					this.blockUI.style.left = '0px';
					this.blockUI.style.top = '0px';
					if (window.innerHeight == undefined) {
						this.blockUI.style.height = document.documentElement.clientHeight + 'px';
						this.blockUI.style.width = document.documentElement.clientWidth + 'px';
					}
					else {
						this.blockUI.style.height = window.innerHeight + 'px';
						this.blockUI.style.width = window.innerWidth + 'px';
					}
					this.blockUI.style.zIndex = "10000";
					this.blockUI.style.filter = "alpha(opacity=60);";
					this.blockUI.style.MozOpacity = 0.6;
					this.blockUI.style.opacity = 0.6;
					this.blockUI.style.KhtmlOpacity = 0.6;
					document.body.appendChild(this.blockUI);
					
					this.popupUI = document.createElement("DIV");
					this.popupUI.style.position = "absolute";
					this.popupUI.style.height = '10px';
					this.popupUI.style.lineHeight = '50px';
					this.popupUI.style.paddingBottom = '40px';
					this.popupUI.style.width = '400px';
					this.popupUI.style.top = '50%';
					this.popupUI.style.left = '50%';
					this.popupUI.style.zIndex = "11000";
					this.popupUI.style.cursor = 'wait';
					var divHeight = this.popupUI.style.height.replace('px', '');
					var divWidth = this.popupUI.style.width.replace('px', '');
					this.popupUI.style.margin = '-' + divHeight / 2 + 'px 0 0 -' + divWidth / 2 + 'px';
					this.popupUI.style.textAlign = 'center';
					
					var errorMsg = null;
					switch(type) {
						case 1:
							this.popupUI.style.backgroundColor = "rgb(255, 255, 255)";
							this.popupUI.style.border = "3px solid rgb(0,0,0)";
							errorMsg = "<p>데이터 로딩중입니다. 잠시만 기다려주세요.</p>";
							break;
						case 2:
							errorMsg = "<img src='/img/common/loding_type01.gif'/>";
							break;
					}
					this.popupUI.innerHTML = errorMsg;
					document.body.appendChild(this.popupUI);
				},
				close : function () {
					this.closeCnt += 1;
//					if (this.loadCnt == this.closeCnt) {
						if (!sop.Util.isUndefined(this.blockUI)) {
							document.body.removeChild(this.blockUI);
							delete this.blockUI;
						}
						if (!sop.Util.isUndefined(this.popupUI)) {
							D.body.removeChild(this.popupUI);
							delete this.popupUI;
						}
						this.loadCnt = 0;
						this.closeCnt = 0;
//					}
					
				}
			}
		// 2020-11-03 [곽제욱] 로딩바 추가 END
	};
	$totSurvTmsMap.ui = {
			map : null,
			namespace : "totSurvTmsMap",
			mapList : [],
			mapInfoList : [],
			curMapId : 0,
			reportPopup : null,
			isLocalGov : false, //지자체 URL 유무
			isTemp : false,     //임시저장 유무
			localGovData : null,//지자체 URL 파라미터,
			localGovUrl : null, //지자체 URL
			settingInfo : {},   //지표설정정보
			loginUserId : "",   //사용자 아이디
			poiLayerList : [], 		//poi 레이어 리스트 
			analysisOriginMultiData : null,
			analysisCurrentMultiData : null,
			defaultPoiCnt : 200, //최소 POI 필터링 숫자
			mapBounds : null,
			result : true, // getMyPosition 유무
			prevZoom : "0", // 지도 이동 이벤트에서 드래그를 막기위한 이전 줌 변수 
			prevSido : "",  // 이전 시도 값
			
			//데이터 추가.
			mapData : null,
			mapStatsData : {}, // 통계정보 저장
			mapRegionData : {}, // 지역경계 저장
			mapRegion : "sido", // 지역경계 sido, sgg, emdong, totreg // 2020-10-15 [곽제욱] 맵 경계구분자 디폴트값 추가
			mapType : "", // 지도유형 color, bubble, heat, poi, grid
			mapToggleId : "", // 2020-10-08 [곽제욱] 시계열 맵 토글 id 추가
			leftMapTempColor : "", // 2020-10-08 [곽제욱] 시계열 왼쪽 맵 하이라이트 처리를 위한 색 저장 변수
			rightMapTempColor : "", // 2020-10-08 [곽제욱] 시계열 오른쪽맵 하이라이트 처리를 위한 색 저장 변수
			leftMapFlag : false, // 2020-10-27 [곽제욱] 로딩바를 위한 시계열 좌측맵 flag
			rightMapFlag : false, // 2020-10-27 [곽제욱] 로딩바를 위한 시계열 우측맵 flag
			
			demandYearHtml : "", // 년도리스트
			
			getLogParams : function(){
				var params = "지역:"+$totSurvTmsMap.ui.settingInfo["adm_nm"];
				return params;
			},
			
			/**
			 * 
			 * @name         :  
			 * @description  : 지도 Clear
			 * @date         : 2020. 08. 19. 
			 * @author	     : 곽제욱
			 * @history 	 :
			 */
			clearMap : function(p_map) {
				//경계 Clear
				try { p_map.clearLayer(); } catch(e) { }
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
				if(p_map.mapMode!="white"){
					p_map.markers.clearLayers();
				}
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
			 * @name : drawMapData
			 * @description : 지도 데이터 그리기
			 * @date : 2020.08.12
			 * @author : 곽제욱
			 * @history :
			 * @param :
			 * 		p_map_region : 지역경계
			 * 		p_map_type : 지도유형(heat 고정)
			 * 		p_map_gbn   : 맵 구분 (left, right)
			 */
			drawMapData : function(p_map_region, p_map_type, p_map_gbn, year) {
				$totSurvMain.ui.loading(true); // 2020-10-14 [곽제욱] 맵 그리기 시작할때 loading바 생성
				//맵 구분 변수 (left, right)
				var selMap;
				if(p_map_gbn == "left"){
					selMap = $totSurvTmsMap.ui.mapList[0];
				}
				else if(p_map_gbn == "right"){
					selMap = $totSurvTmsMap.ui.mapList[1];
				}
				
				var lv_map_region_before = $totSurvTmsMap.ui.mapRegion;
				var lv_map_type_before = $totSurvTmsMap.ui.mapType;
				var lv_surv_id = $totSurvTmsMap.ui.selectedSurvId;
				
				if(p_map_region == undefined || p_map_region == null) {
					p_map_region = $totSurvMain.ui.mapRegion;
				}
				else {
					$totSurvTmsMap.ui.mapRegion = p_map_region;
				}
				if(p_map_type == undefined || p_map_type == null) {
					p_map_type = $totSurvMain.ui.mapType;
				}
				else {
					$totSurvTmsMap.ui.mapType = p_map_type;
				}
				
				//지역변수
				var lv_adm_cd = "00";
				var lv_adm_nm = "전국";
				var lv_adm_coor_x = 990480.875;
				var lv_adm_coor_y = 1815839.375;
								
				/* 총조사 시각화의 경우 각 시도정보는  $totSurvMain.ui.selectedArea 로 가져온다 */
				var lv_sido = $("#dash_sido");
				var lv_sido_cd = $("#dash_sido").val();
				var lv_sido_nm = $("#dash_sido option:selected").text();
				var lv_sido_coor_x = $("#dash_sido option:selected").attr("data-coor-x");
				var lv_sido_coor_y = $("#dash_sido option:selected").attr("data-coor-y");
				var lv_sgg = $("#dash_sgg");
				var lv_sgg_cd = $("#dash_sgg").val();
				var lv_sgg_nm = $("#dash_sgg option:selected").text();
				var lv_sgg_coor_x = $("#dash_sgg option:selected").attr("data-coor-x");
				var lv_sgg_coor_y = $("#dash_sgg option:selected").attr("data-coor-y");
				var lv_emdong = $("#dash_emdong");
				var lv_emdong_cd = $("#dash_emdong").val();
				var lv_emdong_nm = $("#dash_emdong option:selected").text();
				var lv_emdong_coor_x = $("#dash_emdong option:selected").attr("data-coor-x");
				var lv_emdong_coor_y = $("#dash_emdong option:selected").attr("data-coor-y");
				
				//지역변수 데이터 정리
				if(lv_sido_cd != "99") {
					lv_adm_coor_x = lv_sido_coor_x;
					lv_adm_coor_y = lv_sido_coor_y;
				}
				if(lv_sgg_cd != "999") {
					lv_adm_coor_x = lv_sgg_coor_x;
					lv_adm_coor_y = lv_sgg_coor_y;
				}
				if(lv_emdong_cd != "99") {
					lv_adm_coor_x = lv_emdong_coor_x;
					lv_adm_coor_y = lv_emdong_coor_y;
				}
				
				if(lv_sido_cd == "99") lv_sido_cd = "00";
				lv_adm_cd = lv_sido_cd + lv_sgg_cd + lv_emdong_cd;
				lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm + " " + lv_emdong_nm;
				if(lv_sido_cd == "99") lv_adm_cd = "00";
				else if(lv_sgg_cd == "999") lv_adm_cd = lv_sido_cd;
				else if(lv_emdong_cd == "99") lv_adm_cd = lv_sido_cd + lv_sgg_cd;
				if(lv_sido_cd == "99") lv_adm_nm = lv_sido_nm;
				else if(lv_sgg_cd == "999") lv_adm_nm = lv_sido_nm;
				else if(lv_emdong_cd == "99") lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm;
				
				// TODO :: clear 
				//지도 Clear
				$totSurvTmsMap.ui.clearMap(selMap);
				
				//색상/버블
				if(p_map_type == "color" || p_map_type == "bubble") {
					//색상/버블 (시도)
					if(p_map_region == "sido") {
						//
						$totSurvTmsMap.ui.setTotSurvData(selMap, "sido", "color", "", "", "",  lv_surv_id, year, function(p_list) {
							//리스트에서 unit 가져오기
							var lv_unit = "개";
							var lv_unit_nm = "수";
							if(p_list != null && p_list.length > 0) {
								if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
								if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
							}
							
							//데이터 넣기
							selMap.setStatsData("normal", {"pAdmCd": "00", "result" : p_list}, "dt", lv_unit);
							
							//경계 그리기
							$totSurvTmsMap.ui.setTotSurvRegion(selMap, "sido", year, "", "", "", p_map_gbn, function() { // 2020-10-15 [곽제욱] 로딩바 완료처리를 위한 p_map_gbn 구분자 추가
								if($totSurvTmsMap.ui.mapToggleId != "" && $totSurvTmsMap.ui.mapToggleId != null){ // 2020-10-08 [곽제욱] tmsMapToggld 로 변경
									// 랭크이동시 mapToggleId를 초기화하고 하이라이트 처리
									var highLightAmdCd = $totSurvTmsMap.ui.mapToggleId; // 2020-10-08 [곽제욱] tmsMapToggld 로 변경
									// 맵토글ID 초기화
									$totSurvTmsMap.ui.mapToggleId = "";// 2020-10-08 [곽제욱] tmsMapToggld 로 변경
									selMap.setPolyLayerHighlight2(highLightAmdCd, p_map_gbn);
									//$totSurvTmsMap.ui.mapList[0].setPolyLayerHighlight2(highLightAmdCd, "left"); // 2020-10-08 [곽제욱] 시계열 맵 전용 하이라이트 처리함수로 변경
									//$totSurvTmsMap.ui.mapList[1].setPolyLayerHighlight2(highLightAmdCd, "right"); // 2020-10-08 [곽제욱] 시계열 맵 전용 하이라이트 처리함수로 변경
									// 하이라이트 처리 후 맵토글ID 세팅
									$totSurvTmsMap.ui.mapToggleId = highLightAmdCd; // 2020-10-08 [곽제욱] tmsMapToggld 로 변경
								}
							});
							
							//데이터 조회
							if($totSurvMain.ui.selectedThema == "인구"){
								$totSurvMain.ui.selectedLevel = 1;
							}
							
						});
						
					}
					//색상/버블 (시군구)
					else if(p_map_region == "sgg") {
						
						console.log("================  sgg  =================");
						
						$totSurvTmsMap.ui.setTotSurvData(selMap, "sgg", "color", lv_sido_cd, lv_sgg_cd, "", lv_surv_id, year, function(p_list) {
							//리스트에서 unit 가져오기
							var lv_unit = "개";
							var lv_unit_nm = "수";
							if(p_list != null && p_list.length > 0) {
								if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
								if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
							}
							
							//데이터 넣기
							selMap.setStatsData("normal", {"pAdmCd": lv_sido_cd, "result" : p_list}, "dt", lv_unit);
							
							//경계 그리기
//							var lv_region = ""; //비자치구 여부 체크
//							if($totSurvMap.ui.isAtdrc){
								var lv_region = "sgg";		
//								lv_sido_cd = $totSurvMain.ui.selectedArea;
//							}
//							else{
//								lv_region = "atdrc"; //비자치구
//							}
							console.log("lv_region = " + lv_region);
							console.log("lv_sido_cd = " + lv_sido_cd);
							
							$totSurvTmsMap.ui.setTotSurvRegion(selMap, lv_region, year, lv_sido_cd, "", "", p_map_gbn, function() { // 2020-10-15 [곽제욱] 로딩바 완료처리를 위한 p_map_gbn 구분자 추가
								
								if($totSurvMain.ui.selectedThema == "인구"){
									$totSurvMain.ui.selectedLevel = 2;
								}
								if($totSurvTmsMap.ui.mapToggleId != "" && $totSurvTmsMap.ui.mapToggleId != null){
									// 랭크이동시 mapToggleId를 초기화하고 하이라이트 처리
									var highLightAmdCd = $totSurvTmsMap.ui.mapToggleId;
									// 맵토글ID 초기화
									$totSurvTmsMap.ui.mapToggleId = "";
									selMap.setPolyLayerHighlight2(highLightAmdCd, p_map_gbn);
									//$totSurvTmsMap.ui.mapList[0].setPolyLayerHighlight2(highLightAmdCd, "left");
									//$totSurvTmsMap.ui.mapList[1].setPolyLayerHighlight2(highLightAmdCd, "right");
									// 하이라이트 처리 후 맵토글ID 세팅
									$totSurvTmsMap.ui.mapToggleId = highLightAmdCd;
								}
							});
						});
						
					}
					//색상/버블 (읍면동)
					else if(p_map_region == "emdong") {
						console.log("================  emdong  =================");
					}
					
					var zoomlevel = $totSurvTmsMap.ui.mapList[0].zoom;
					var coord_x;
					var coord_y;
										
					var adm_cd = $totSurvMain.ui.selectedArea;
					console.log("[totSurvMap] ###  adm_cd = " + adm_cd);
					
					/** 시도별 zoom 설정 */
					switch (adm_cd.length) {
			            case 2:
			               coord_x = $("#dash_sido option:selected").data("coor-x");
			               coord_y = $("#dash_sido option:selected").data("coor-y");
			                   
			                   if(adm_cd == '11' || adm_cd == '21' || adm_cd == '22' ||
			                         adm_cd == '24' || adm_cd == '25' || adm_cd == '26' || adm_cd == '29'){
			                      // 서울(11), 부산(21), 대구(22), 광주(24), 대전(25), 울산(26), 세종(29) 
			                   } else if(adm_cd == '23' || adm_cd == '39') {
			                      // 인천(23), 제주(39)
			                   } else if(adm_cd == '31' || adm_cd == '32' || adm_cd == '33' ||
			                         adm_cd == '34' || adm_cd == '35' || adm_cd == '36' || adm_cd == '37' || adm_cd == '38') {
			                      // 경기(31), 강원(32), 충북(33), 충남(34), 전북(35), 전남(36), 경북(37), 경남(38)
			                   }
			               break;
			            case 5:
			               coord_x = $("#dash_sgg option:selected").data("coor-x");
			               coord_y = $("#dash_sgg option:selected").data("coor-y");
			               break;
			            default:
			            	  coord_x = 990480.875;
			                  coord_y = 1815839.375;
			               break;
			         }
					
					console.log("zoomlevel = " + zoomlevel);	
						
					setTimeout(function(){
						$totSurvMain.ui.loading(false); 									
					}, 500);
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
			 *      p_surv_id   :
			 *      p_year : 년도
			 * 		p_callback : 콜백 함수
			 */
			setTotSurvData : function(p_map, p_region, p_type, p_sido_cd, p_sgg_cd, p_emdong_cd, p_surv_id, p_year, p_callback) {
				//변수 선언
				var lv_tot_surv_id = p_surv_id;
				
				//adm_cd
				var lv_adm_cd = "00";
				if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "" && p_sido_cd != "00") {
					lv_adm_cd = p_sido_cd;
					if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "" && p_sgg_cd != "999") {
						lv_adm_cd += p_sgg_cd;
						if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") lv_adm_cd += p_emdong_cd;
					}
				}
				
				//파라미터
				var lv_params = {};
				lv_params.surv_id = p_surv_id;
				lv_params.surv_year = p_year;
				lv_params.itm_cd = $totSurvTmsMap.ui.selectedItmCd;
				//lv_params.isAtdrc = $totSurvMap.ui.isAtdrc; //비자치구 여부 체크
				lv_params.isAtdrc = false;
				
				var p_c1 = $totSurvTmsMap.ui.selectedC1;
				
				if(p_type != undefined && p_type != null && p_type != "") lv_params.map_ty = p_type;
				//p_region : poi는 기본적으로 all이지만 열지도는 all이 아니므로 all일때는 그냥 파라미터 제외함.
				if(p_region != undefined && p_region != null && p_region != "" && p_region != "all") lv_params.area_bndry_se = p_region;
				if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "") lv_params.sido_cd = p_sido_cd;
				if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "") lv_params.sgg_cd = p_sgg_cd;
				if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") lv_params.emdong_cd = p_emdong_cd;
				if(p_c1 != undefined && p_c1 != null && p_c1 != "") lv_params.c1 = p_c1;

				//원 테이블로 조회
				var lv_url = contextPath+"/ServiceAPI/totSurv/common/getTotSurvData.json";
				// ajax 시작
				$.ajax({
					url: lv_url,
				    type: 'post',
				    data: lv_params
				}).always(function(res) { // 전 처리
					
				}).done(function (res) { // 완료
					//정보 저장
					$totSurvTmsMap.ui.mapStatsData[lv_tot_surv_id+"_"+p_type+"_"+p_region+"_"+lv_adm_cd] = res.result.mapData;
					
					//콜백함수 호출
			    	if(typeof p_callback === "function") {
						p_callback(res.result.mapData);
					}
				}).fail(function (res) { // 실패
					
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
			setTotSurvRegion : function(p_map, p_region, p_base_year, p_sido_cd, p_sgg_cd, p_emdong_cd, p_map_gbn, p_callback) {
				/** 2020-10-27 [곽제욱] 로딩바를 위한 좌측, 우측맵 플래그 세팅 START */
				if(p_map_gbn == "left"){
					$totSurvTmsMap.ui.leftMapFlag = false;
				} else if(p_map_gbn == "right"){
					$totSurvTmsMap.ui.rightMapFlag = false;
				}
				/** 2020-10-27 [곽제욱] 로딩바를 위한 좌측, 우측맵 플래그 세팅 END */
				//년도 입력이 들어왔는데 bndYear 보다 큰 경우 bndYear 사용 
				p_base_year = p_base_year;
				
				//시도의 경우 js파일을 사용하기 떄문에 년도를 넣어야함
				if(p_region == "sido"  || p_region == "sgg") {
					//년도 입력 안들어온경우 common.js bndYear 사용
					if(p_base_year == undefined || p_base_year == null || p_base_year == "") {
						p_base_year = $totSurvMain.ui.selectedYear;
					}
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
					p_map.lastGeojsonInfo = null;
					//시도경계 불러오기
					p_map.openApiBoundarySido(p_base_year, function(p_map2, p_res) {
						//정보 저장
						$totSurvTmsMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd] = p_res;
						
						var xcoor = 989674 ;
						var ycoor = 1818313;
						var zoomLevel = p_map.zoom;						
						//콜백함수 호출
				    	if(typeof p_callback === "function") {
							p_callback();
						}
				    	
				    	/** 2020-10-27 [곽제욱] 로딩바를 위한 좌측, 우측맵 플래그 세팅 START */
						if(p_map_gbn == "left"){
							$totSurvTmsMap.ui.leftMapFlag = true;
						} else if(p_map_gbn == "right"){
							$totSurvTmsMap.ui.rightMapFlag = true;
						}
						/** 2020-10-27 [곽제욱] 로딩바를 위한 좌측, 우측맵 플래그 세팅 END */

						/** 2020-10-27 [곽제욱] 로딩바를 위한 좌측, 우측맵 플래그 세팅 START */
						if($totSurvTmsMap.ui.leftMapFlag == true && $totSurvTmsMap.ui.rightMapFlag == true){
							//$totSurvMain.ui.loading(false); // 2020-10-14 [곽제욱] 맵 그리기 시작할때 loading바 생성		 
						} 
						/** 2020-10-27 [곽제욱] 로딩바를 위한 좌측, 우측맵 플래그 세팅 END */
					});
				}
				//시도 이외의 경계 데이터 조회
				else {
					var params = {};
					params.region = p_region;
					params.base_year = p_base_year;
					
					tempAdmCd = p_sido_cd;
					//
					
					p_sido_cd = tempAdmCd.substring(0,2);
					p_sgg_cd = tempAdmCd.substring(2,5);				
					
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
							
							//20201013 박은식 줌 level 설정 추가 START
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
							
							//정보 저장
							$totSurvTmsMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd] = res;
							//경계그리기
							p_map.setPolygonDataGeojson(res);
							var xcoor = 0;
							var ycoor = 0;
							//$totSurvMain.ui.getSidoSggPos(p_sido_cd+p_sgg_cd);
							
							// p_region 이 시군구 이면 sido 의 center 좌표 가져오기
							if(p_region == "sgg"){
								xcoor = $("#dash_sido option:selected").attr("data-coor-x");
								ycoor = $("#dash_sido option:selected").attr("data-coor-y");

								zoomLevel = $totSurvMap.ui.map.zoom;
								zoomLevel = sggZoom;

								if($totSurvMap.ui.isAtdrc==true){
									xcoor = $("#dash_sgg option:selected").attr("data-coor-x");
									ycoor = $("#dash_sgg option:selected").attr("data-coor-y");
									zoomLevel = 6;
								}
							} else {
								xcoor = $("#dash_sgg option:selected").attr("data-coor-x");
								ycoor = $("#dash_sgg option:selected").attr("data-coor-y");
								zoomLevel = 6
							}
							//$totSurvMap.ui.checkIsAtdrc(p_sido_cd+p_sgg_cd.substring(0,2)+"0")
							
							// p_region 이 시군구 이면 sido 의 center 좌표 가져오기
							if(p_region == "sgg"){
								xcoor = $("#dash_sido option:selected").attr("data-coor-x");
								ycoor = $("#dash_sido option:selected").attr("data-coor-y");
								//zoomLevel = 4;
							} else {
								xcoor = $("#dash_sgg option:selected").attr("data-coor-x");
								ycoor = $("#dash_sgg option:selected").attr("data-coor-y");
								//zoomLevel = 6;
							}
							
							//20201013 박은식 줌 level 설정 추가 END
							
							//20201012 박은식 줌 레벨 조절 START
							if(adm_cd == '21'){
								zoomLevel = zoomLevel; 
							}else {
								zoomLevel = zoomLevel + $totSurvMain.ui.zoomResize();
							}
							
							//20201012 박은식 줌 레벨 조절 END
							p_map.mapMove([xcoor, ycoor], zoomLevel, true);
							
						}else if(res.errCd == "-401") {
							//$totSurvMain.ui.alert(res.errMsg);
						}else{
							//$totSurvMain.ui.alert(res.errMsg);
						}
					}).fail(function (res) { // 실패
						//$totSurvMain.ui.alert(errorMessage);
					}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
						
						/** 2020-10-27 [곽제욱] 로딩바를 위한 좌측, 우측맵 플래그 세팅 START */
						if(p_map_gbn == "left"){
							$totSurvTmsMap.ui.leftMapFlag = true;
						} else if(p_map_gbn == "right"){
							$totSurvTmsMap.ui.rightMapFlag = true;
						}
						/** 2020-10-27 [곽제욱] 로딩바를 위한 좌측, 우측맵 플래그 세팅 END */
						
						if($("#"+p_map.id+"_loading").length) {
							$("#"+p_map.id+"_loading").hide();
						}
						//콜백함수 호출
				    	if(typeof p_callback === "function") {
							p_callback();
						}
				    	
				    	/** 2020-10-27 [곽제욱] 로딩바를 위한 좌측, 우측맵 플래그 세팅 START */
						if($totSurvTmsMap.ui.leftMapFlag == true && $totSurvTmsMap.ui.rightMapFlag == true){
							// 2020-10-14 [곽제욱] 맵 그리기 시작할때 loading바 생성 START
							//$totSurvMain.ui.loading(false); 
							// 2020-10-14 [곽제욱] 맵 그리기 시작할때 loading바 생성 END			    	
						} 
						/** 2020-10-27 [곽제욱] 로딩바를 위한 좌측, 우측맵 플래그 세팅 END */
					});
					// ajax 끝
				}
				
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
				if($totSurvTmsMap.ui.mapData == null) {
					return bndYear;
				}
				var lv_data = $totSurvTmsMap.ui.mapData.data;
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
			 * @name         : doCombineMap
			 * @description  : 통계정보를 융합한다.
			 * @date         : 2020. 09. 24. 
			 * @author	     : 주형식
			 * @history 	 :
			 */
			doCombineMap : function() {
				console.log("##### doCombineMap");
				srvLogWrite('P0','03','03','02',$totSurvMain.ui.selectedThema,'leftYear='+$totSurvMain.ui.leftSelectedYear+',rightYear='+$totSurvMain.ui.rightSelectedYear);
				
				$("#modal").attr("style", "width: 100%; height:"+($(window).outerHeight()+11)+"px; opacity:0.4; background-color:black; position: fixed; z-index: 9999; left:0; top:-11px");
					$totSurvTmsMap.loadingBar.show(1); // 2020-11-03 [곽제욱] 변수명 변경
					
					setTimeout(function() {
						$populationTmsCombineMap.ui.initCombineMap();
						$totSurvTmsMap.loadingBar.close(); // 2020-11-03 [곽제욱] 변수명 변경
					}, 200);
			},
			
			/**
			 * 
			 * @name         : createMap
			 * @description  : 맵 및 맵에 오버레이될 그래프, 범례 등을 생성한다.
			 * @date         : 2020. 09. 11. 
			 * @author	     : 주형식
			 * @history 	 :
			 * @param id	 : 맵 아이디
			 * @param seq	 : 맵 순서
			 */
			createMap : function(id, seq) {
				console.log("############  createMap   id = " + id + ", seq = " + seq);
				var map = new sMap.map();
				map.createMap($totSurvTmsMap, id, {
					center : [ 990480, 1815839 ],
					// 2020-10-14 [주형식] 배주무관님 요청으로 최소 줌레벨 변경  1 -> 0 
					zoom : 0, //9->8
					measureControl : false,
					statisticTileLayer: true
				});
				
				
				map.id = seq;
				map.addControlEvent("zoomend");
								
				//범례 호출 함수
				var legend = new sLegendInfo.legendInfo(map);
				legend.initialize($totSurvTmsMap.ui);
				map.legend = legend;
				legend.createLegend();
				//legend.legendType = "equal";
				//작업부분 끝
				
				//사용자지정컨트롤설정
				$totSurvTmsMap.ui.mapList[seq] = map;
				var drawControl = new Draw.Control.Manager();
				map.gMap.addControl(drawControl); 
				map.drawControl = drawControl;
				map.gMap.whenReady(function() {
					map.createHeatMap();
//					map.mapMove([map.gMap.getCenter().x,map.gMap.getCenter().y],8);
					
					//지도이동 동기화 이벤트 설정
					if ($totSurvTmsMap.ui.mapList.length == 2) {
						$totSurvTmsMap.event.mapSyncEvent();
					}
					
				});
				
				map.gMap.on("moveend", function(e) {
					$totSurvTmsMap.callbackFunc.didMapMoveEnd(e, map);
				});
				
				
			},
			
			
			/**
			 * 
			 * @name         : createInfoTooltip
			 * @description  : 툴팁정보를 생성한다.
			 * @date         : 2020. 09. 21. 
			 * @author	     : 주형식
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 경계데이터정보
			 * @param type   : 경계타입
			 * @param map    : 맵정보
			 */
			createInfoTooltip : function(event, data, type, map) {
				// HTML 생성
				/** 2020-10-14 [주형식] 맵툴팁 직접생성 START */
				$("#toolAdmNm").html(data.properties.adm_nm);
				//20201012 박은식 다문화 가구 선택 시 단위를 가구로 표시 START
				var lv_html = "";
				if(data.info.length>0){
					lv_html += appendCommaToNumber(parseFloat(data.info[0][data.info[0].showData]));
				} else {
					lv_html += "N/A"
				}
				if($totSurvMain.ui.selectedThema == "인구" && data.info.length>0){
					lv_html += (data.info[0].surv_id == 'PH0205') ? " (가구)" : " (명)";
				}
				//20201012 박은식 다문화 가구 선택 시 단위를 가구로 표시 END
				else if($totSurvMain.ui.selectedThema == "가구"){
					lv_html += " (가구)";
				}
				else if($totSurvMain.ui.selectedThema == "주택"){
					lv_html += " (주택)";
				}
				else if($totSurvMain.ui.selectedThema == "농업"){
					lv_html += " (수)";
				}
				else if($totSurvMain.ui.selectedThema == "임업"){
					lv_html += " (수)";
				}
				else if($totSurvMain.ui.selectedThema == "어업"){
					lv_html += " (명)";
				}
				
				$("#toolAdmData").html(lv_html);
				// width : 119
				// height : 69
				var x = event.originalEvent.clientX;
				var y = event.originalEvent.clientY-70;
				$("#mapToolTipTable").css("left", x).css("top", y);
				$("#mapToolTipTable").show();
				/** 2020-10-14 [주형식] 맵툴팁 직접생성 END */
				
				/** 2020-10-14 [주형식] 맵툴팁 직접생성으로 인하여 이전소스 주석처리 START */
				/*
				var lv_html = "<table style='margin:10px;'>";
				lv_html += "<tr><td colspan='3' class='admName' style='font-size: 14px; font-weight: bold; color: #3792de;'>";
				lv_html += data.properties.adm_nm; 
				lv_html += "</td></tr>";
				if (type != "polygon") {
					lv_html += "<tr style='height:5px'></tr>";
				}
				
				// 집계구 정보
				var lv_adm_cd = data.properties.adm_cd;
				if(lv_adm_cd != undefined && lv_adm_cd != null && lv_adm_cd.length == 13) {
					if (type == "polygon") {
						lv_html += "<tr style='height:5px'></tr>";
					}
					lv_html += "<tr><td class='statsData' style='font-size: 12px; padding-left: 5px;'>집계구 : "+lv_adm_cd+"</td></tr>";
				}
				
				// 데이터
				if (type != "polygon") {
					lv_html += "<tr>";
					if(data.info != null && data.info.length > 0) {
						var lv_title = "";
						if(data.info[0].tooltip_cn != undefined && data.info[0].tooltip_cn != null && data.info[0].tooltip_cn != "") lv_title += (""+data.info[0].tooltip_cn).replace(lv_title,"").trim();
						
						/**  kosis 데이터 일경우 3번째 배열이 undefined이고 값이 kosis임 
						if(data.info[2] != undefined && data.info[2] == "kosis"){
							console.log("kosis data");
							var lv_value = ""+appendCommaToNumber(parseFloat(data.info[0]));
							if(lv_value.indexOf(".") == 0) lv_value = "0"+lv_value;
							if(lv_title != "") {
								lv_html += "<td class='statsData' style='font-size: 12px; padding-left: 5px;'>"+lv_title+"</td>";
								lv_html += "<td>&nbsp;:&nbsp;</td>";
							}
							lv_html += "<td>";
							lv_html += lv_value;
							if(data.info[1] != undefined && data.info[1] != "") {
								lv_html += " ("+ data.info[1] +")";
							}
							lv_html += "</td>";
						}
						else{
							var lv_value = ""+appendCommaToNumber(parseFloat(data.info[0][data.info[0].showData]));
							if(lv_value.indexOf(".") == 0) lv_value = "0"+lv_value;
							if(lv_title != "") {
								lv_html += "<td class='statsData' style='font-size: 12px; padding-left: 5px;'>"+lv_title+"</td>";
								lv_html += "<td>&nbsp;:&nbsp;</td>";
							}
							lv_html += "<td>";
							lv_html += lv_value;
							if(data.info[0].unit != undefined && data.info[0].unit != null && data.info[0].unit != "") {
								//lv_html += " ("+ data.info[0].unit +")";
								if($totSurvMain.ui.selectedThema == "인구"){
									lv_html += " (명)";
								}
								else if($totSurvMain.ui.selectedThema == "가구"){
									lv_html += " (가구)";
								}
								else if($totSurvMain.ui.selectedThema == "주택"){
									lv_html += " (주택)";
								}
								else if($totSurvMain.ui.selectedThema == "농업"){
									lv_html += " (수)";
								}
								else if($totSurvMain.ui.selectedThema == "임업"){
									lv_html += " (수)";
								}
								else if($totSurvMain.ui.selectedThema == "어업"){
									lv_html += " (수)";
								}
							}
							lv_html += "</td>";
						}
					} else {
						lv_html += "<td class='statsData' style='font-size: 12px; padding-left: 5px;'>N/A</td>";
					}
					lv_html += "</tr>";
				}
				lv_html += "</table>";
				
				event.target.bindToolTip(lv_html, {
					direction: 'right',
					noHide:true,
					opacity: 1,
					pane:"infowindowPane"
				}).addTo(map.gMap)._showToolTip(event);
				*/
				/** 2020-10-14 [주형식] 맵툴팁 직접생성으로 인하여 이전소스 주석처리 END */
			},
			
			
			/**
			 * @name         : setMoveMap
			 * @description  : 맵을 이동한다.
			 * @date         : 2020. 09. 16. 
			 * @author	     : 주형식
			 * @history 	 :
			 * @param coord_x: x좌표
			 * @param coord_y: y좌표
			 * @param map    : 맵정보
			 * @param pZoom  : 줌레벨
			 */
			setMoveMap :function(coord_x, coord_y, map, pZoom) {
				//zoom 설정
				var zoom = 5;
				if (this.localGovData != null) {
					if (this.localGovData.zoom != undefined) {
						if (!isNaN(this.localGovData.zoom) && 
							parseInt(Number(this.localGovData.zoom)) == this.localGovData.zoom &&
							!isNaN(parseInt(this.localGovData.zoom, 10))) {
							zoom = parseInt(this.localGovData.zoom);
						}
					}

					//좌표설정
					var isCoordX = false;
					var isCoordY = false;
					if (this.localGovData.coord_x != undefined && 
						this.localGovData.coord_y != undefined) {
						if (!isNaN(this.localGovData.coord_x) && 
								parseFloat(Number(this.localGovData.coord_x)) == this.localGovData.coord_x &&
								!isNaN(parseFloat(this.localGovData.coord_x, 10))) {
								isCoordX = true;
						}
						if (!isNaN(this.localGovData.coord_y) && 
								parseFloat(Number(this.localGovData.coord_y)) == this.localGovData.coord_y &&
								!isNaN(parseFloat(this.localGovData.coord_y, 10))) {
								isCoordY = true;
						}
						if (isCoordX && isCoordY) {
							coord_x = parseFloat(this.localGovData.coord_x);
							coord_y = parseFloat(this.localGovData.coord_y);
						}
					}
					if ( pZoom != null )zoom = pZoom;
					map.mapMove([coord_x, coord_y], zoom);
				} else {
					if ( pZoom != null )zoom = pZoom;
					map.mapMove([coord_x, coord_y], zoom);
				}
			},
			
			/**
			 * @name         : setLayerStyle
			 * @description  : 경계의 스타일 설정
			 * @date         : 2020. 09. 19. 
			 * @author	     : 주형식
			 * @history 	 :
			 * @param map	 : 맵정보
			 */
			setLayerStyle : function(map) {
				for(var i=0; i<map.multiLayerControl.dataGeojson.length; i++) {
					map.multiLayerControl.dataGeojson[i].eachLayer(function(layer) {
						layer.setStyle({
							weight : 2,
							color : "#4169e1",
							dashArray : "",
							fillOpacity : 0.5,
							fillColor : "#4169e1"
						});
						layer.on({
							mouseout : function(e) {
								var tmpLayer = e.target;
								tmpLayer.setStyle({
									weight : 2,
									color : "#4169e1",
									dashArray : "",
									fillOpacity :0.5,
									fillColor : "#4169e1"
								});
							}
						});
					});
				}
			},
			
			
			/**
			 * 
			 * @name         : setRegionCd
			 * @description  : 현재위치를 기반으로 콤보박스의 지역을 설정한다.
			 * @date         : 2020. 09. 30. 
			 * @author	     : 주형식
			 * @history 	 :
			 * @param adm_cd : 행정동코드
			 */
			setRegionCd : function(adm_cd) {
				if (adm_cd == null) {
					return;
				}
				var sidoCd = null;
				var sggCd = null;
				
				switch(adm_cd.length) {
					case 2:
						sidoCd = adm_cd.substring(0,2);
						break;
					default:
						sidoCd = adm_cd.substring(0,2);
						sggCd = adm_cd.substring(3,3);
						break;
				}
				
				$("#current-sido-select option[value="+sidoCd+"]").prop("selected", true);
				if($("#current-sido-select-2").length > 0) $("#current-sido-select-2 option[value="+sidoCd+"]").prop("selected", true);
				
				$totSurvTmsMapLeftmenu.ui.getSggList("current", sidoCd, "");		
				$totSurvTmsMapLeftmenu.ui.getCategoryCnt(sidoCd);
				
				setTimeout(function() {
					$totSurvTmsMap.ui.setMapPosition();
				}, 200);
			},
			
			/**
			 * 
			 * @name         : setMapPosition
			 * @description  : 지도의 위치를 설정한다.
			 * @date         : 2017. 09. 30. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setMapPosition : function() {
				$totSurvTmsMap.noReverseGeoCode = true;
				for(var i=0; i<this.mapList.length; i++) {
					var map = this.mapList[i];
					var coord_x, coord_y, zoom;
					if (i==0) {
						coord_x = $("#current-sido-select option:selected").data("coor-x");
						coord_y = $("#current-sido-select option:selected").data("coor-y");
						zoom = 5;
					}
					this.setMoveMap(coord_x, coord_y, map, zoom);
				}
			},
			
			/**
			 * @name           : getCenterToAdmCd
			 * @description    : 지도의 중심점으로 집계구값 얻기
			 * @date           : 2020.09.22
			 * @author	       : 주형식
			 * @history        :
			 * @param center   : 중심
			 * @param callback : callback
			 */
			getCenterToAdmCd : function(center,callback) {
				var obj = new sop.openApi.personal.findcodeinsmallarea.api();
				var x,y;
				if(Object.prototype.toString.call(center)==="[object Array]"&&center.length==2){
					x = center[0];
					y = center[1];
				}else{
					center = $totSurvTmsMap.ui.mapList[0].gMap.getCenter();
					x = center.x;
					y = center.y;
				}
				obj.addParam("accessToken", accessToken);
				obj.addParam("x_coor", x);
				obj.addParam("y_coor", y);
				obj.request({
					method : "GET",
					async : true, // false : 로딩표시, true : 로딩숨김
					url : openApiPath+"/OpenAPI3/personal/findcodeinsmallarea.json",
					options : {
						callback : callback,
						center : center,
						target : $totSurvTmsMap.ui // 2020-10-08 [곽제욱] target : $totSurvTmsMap 으로 변경
					}
				});
			}
	};
	
	$totSurvTmsMap.request = {
			/**
			 * 
			 * @name         : reqGeocode
			 * @description  : 지오코딩을 조회한다.
			 * @date         : 2020. 09. 30. 
			 * @author	     : 주형식
			 * @history 	 :
			 * @param x_coor : x좌표
			 * @param y_coor : y좌표
			 */
			reqGeocode : function(x_coor, y_coor) {
				$.ajax({
		    		url : openApiPath + "/OpenAPI3/addr/rgeocode.json",
		    		data : {
		    			accessToken : accessToken,
		    			addr_type : "20",
		    			x_coor : x_coor,
		    			y_coor : y_coor
		    		},
					type : "GET",
					success : function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								var result = res.result[0];
								if (result != null) {
									var sido_cd = result.sido_cd;
									var sgg_cd = result.sgg_cd;
									var emdong_cd = result.emdong_cd;
									var adm_cd = null;
									if (sido_cd != undefined) {
										adm_cd = sido_cd;
										if (sgg_cd != undefined) {
											adm_cd = sido_cd + sgg_cd;
											if (emdong_cd != undefined) {
												adm_cd = sido_cd + sgg_cd + emdong_cd;
											}
										}
									}
									$totSurvTmsMap.ui.setRegionCd(adm_cd);
								}
								break;
							case -100:
								break;
							case -401:
								accessTokenInfo(function() {
									$totSurvTmsMap.request.reqGeocode(x_coor, y_coor);
								});
								break;
						}
					},
					async : false,
					dataType : "json",
					error: function(x,o,e) {
						$totSurvTmsMap.ui.setRegionCd($totSurvTmsMapLeftmenu.ui.defaultSidoCd);
					}
				});						
			},
			
	};
	
	$totSurvTmsMap.event = {
			
			/**
			 * 
			 * @name         : mapSyncEvent
			 * @description  : 지도 1,2의 이벤트를 동기화한다.
			 * @date         : 2020. 10. 10. 
			 * @author	     : 주형식
			 * @history 	 :
			 */
			mapSyncEvent :  function() {
				var lMap = $totSurvTmsMap.ui.mapList[0].gMap;
				var rMap = $totSurvTmsMap.ui.mapList[1].gMap;
				lMap.sync(rMap);
				rMap.sync(lMap);
			},
			
			/**
			 * 
			 * @name         : mapUnSyncEvent
			 * @description  : 지도 1,2의 이벤트를 동기화를 해제한다.
			 * @date         : 2020. 10. 10. 
			 * @author	     : 주형식
			 * @history 	 :
			 */
			mapUnSyncEvent : function() {
				var lMap = $totSurvTmsMap.ui.mapList[0].gMap;
				var rMap = $totSurvTmsMap.ui.mapList[1].gMap;
				lMap.unsync(rMap);
				rMap.unsync(lMap);
			},
			
			/**
			 * 
			 * @name         : setUIEvent
			 * @description  : 이벤트를 설정한다.
			 * @date         : 2020. 10. 10. 
			 * @author	     : 주형식
			 * @history 	 :
			 */
			setUIEvent : function() {
				$(".policySelectBox").hide();
				$("#naviTitle").hide();
				$("#boundLevelTitle").hide();
				//$("#sTitle").hide();
				
				//년도선택 이벤트
				$("body").on("change", ".yearSelectBox", function() {
					if($(".policyStaticMapDataBoard").hasClass("on")){
						//데이터보드 닫기
						$(".dataSideBox").removeClass("full");
						$(".dataSideBox").stop().animate({"right":"-1500px"},200);
						$(".policyStaticMapDataBoard").removeClass("on").stop().animate({"right":"0"},200);
					}
					
					srvLogWrite( "E0", "04", "01", "00", $totSurvTmsMap.ui.settingInfo.policy_idx_nm, $totSurvTmsMap.ui.getLogParams() ); // jrj 로그 > 조회년도 선택
					
					var id = $(this).attr("id");
					var idx = id.split("_")[1];
					var map = $totSurvTmsMap.ui.mapList[parseInt(idx)-1];
					var options = $totSurvTmsMapLeftmenu.ui.arrParamList[parseInt(idx)-1];
					var year = $(this).val();
					var sCall_param = options.call_param;
					if(typeof(options.call_param) == "string") sCall_param = eval("("+options.call_param+")");
					
					switch(parseInt(options.data_div)) {
						case 3 :
							var result = $totSurvTmsMapApi.ui.userData[map.id][year];
							var res = {
									errCd : "0",
									id : "API_MYDATA",
									result : result,
									dataType : "userData"
							};
							var setData = $totSurvTmsMap.ui.setParams(options, map);
							setData.param["year"] = year;
							map.multiLayerControl.multiData = [];
							$totSurvTmsMapApi.ui.doUserBoundData(res, setData, map);
							break;
						default:
							sCall_param["year"] = year;
							options.call_param = sCall_param;
							$totSurvTmsMapLeftmenu.ui.arrParamList[parseInt(idx)-1]=options;  // 바뀐 apiparam을 저장.
							$totSurvTmsMap.ui.doReqStatsData(options, $totSurvTmsMap.ui.mapList[parseInt(idx)-1]);
							break;
					}
				});
				
			}
			
	};
	
	// ==============================//
	// map event callback
	// ==============================//
	$totSurvTmsMap.callbackFunc = {
			// 맵 줌 종료 시, 콜백 호출
			didMapMoveEnd : function(event, map) {
				
			},
			
			// 마우스오버
			didMouseOverPolygon : function(event, data, type, map) {
				if (type != "polygon") {
					if (type == "data") {
						if (data.info.length > 0) {
							map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
					}
					$totSurvTmsMap.ui.createInfoTooltip(event, data, type, map);
				}else {
					$totSurvTmsMap.ui.createInfoTooltip(event, data, type, map);
				}
			}
			,
			
			// 맵 줌 종료 시, 콜백 호출
			didMapZoomEnd : function(event, map) {

			   if(map.id == 0){
				   
				   var lv_zoom = $totSurvTmsMap.ui.mapList[0].zoom;
				   var beforeSido = $totSurvTmsMap.ui.prevSido;
				   
				   var center = $totSurvTmsMap.ui.mapList[0].gMap.getCenter();
				   $totSurvTmsMap.ui.getCenterToAdmCd(center, function(res) {
					   
						if(res == undefined || res.result == undefined || $totSurvMain.ui.selectedArea == "") { //20201013 박은식 and조건 or로 변경
							return;
						}
						var lv_to_sido_cd = res.result.sido_cd;
						var lv_to_sgg_cd = res.result.sgg_cd;
						var lv_to_emdong_cd = res.result.emdong_cd;
						

						var adm_cd = lv_to_sido_cd;
						var sggZoom;
						/** 시도별 zoom 설정 */
						switch (adm_cd.length) {
				            case 2:       
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
					                   } else {
					                	   sggZoom = 1;  // zoom level 변경  1-> 0
					                   }	
				               break;
				            default:
				            	zoomLevel = 1;  // zoom level 변경 1-> 0
				               break;
				         }
						//전국
						if(lv_zoom < sggZoom) {
							//이미 같은 전국이면 조회 안함
							if($totSurvTmsMap.ui.mapRegion != "sido" || $totSurvTmsMap.ui.mapList[0].zoom == "0"){ // 2020-10-15 [곽제욱] 같은시도레벨이면 조회하지 않도록 변경
								$("#dash_sido").val("99");
								$("#dash_sgg").val("999");
								$totSurvMain.ui.tmsPathChange("nationwide", "00");
								$totSurvMain.ui.selectedArea = "00";
								
								$totSurvMain.ui.leftSelectedYear = $('#selLeftYear option:selected').val();
								$totSurvTmsMap.ui.mapToggleId = ""; // 2020-10-08 [곽제욱] 시계열 맵토글 ID로 변경
								$populationTms.ui.drawContent("PH0001", "T100", "", "left", $('#selLeftYear option:selected').val());
								
								$totSurvMain.ui.rightSelectedYear = $('#selRightYear option:selected').val();
								$populationTms.ui.drawContent("PH0001", "T100", "", "right", $('#selRightYear option:selected').val());
								$("#leftMapDiv > h5").text('지도  - 전국')
					    		$("#rightMapDiv > h5").text('지도 - 전국')
					    		$totSurvTmsMap.ui.mapRegion = "sido";  // 2020-10-15 [곽제욱] 같은시도레벨이면 조회하지 않도록 변경
							} // 2020-10-15 [곽제욱] 같은시도레벨이면 조회하지 않도록 변경
						}
						else if(lv_zoom >= sggZoom && lv_zoom <= 8
						//시군구
						) {
							
							// 2020-10-15 [주형식] 필요없는 로직 삭제 START
							if($totSurvTmsMap.ui.mapRegion!="sgg"){
								$("#dash_sido").val(lv_to_sido_cd);
								//시군구 조회
								
								$totSurvMain.ui.selectedArea = lv_to_sido_cd;
								$totSurvTmsMap.ui.mapToggleId = ""; // 2020-10-08 [곽제욱] 시계열 맵토글 ID로 변경
								$totSurvMain.ui.tmsPathChange("sgg", lv_to_sido_cd);
								$totSurvMain.ui.leftSelectedYear = $('#selLeftYear option:selected').val();
                      			$populationTms.ui.drawContent("PH0001", "T100", "", "left", $('#selLeftYear option:selected').val());
                      			
                      			$totSurvMain.ui.rightSelectedYear = $('#selRightYear option:selected').val();
                      			$populationTms.ui.drawContent("PH0001", "T100", "", "right", $('#selRightYear option:selected').val());
                      			$("#leftMapDiv > h5").text('지도 - ' + res.result.sido_nm)
					    		$("#rightMapDiv > h5").text('지도 - ' + res.result.sido_nm)
							}
							// 2020-10-15 [주형식] 필요없는 로직 삭제 END
							
						}
						/**20200921 박은식 줌 이동 시 chart 정보 업데이트 */
						$populationTms.ui.searchData($("#selLeftYear").val(), $("#selRightYear").val());
						$populationTms.ui.searchTimeGenderAgeData($("#selLeftYear").val(), $("#selRightYear").val(), $totSurvMain.ui.selectedArea);
						$populationTms.ui.createAgeGenderTable($populationTms.rightTimeGenderAgePopulation, "rightTable");
						$populationTms.ui.createAgeGenderTable($populationTms.leftTimeGenderAgePopulation, "leftTable");
						if($totSurvMain.ui.selectedArea == '00' || $totSurvMain.ui.selectedArea == '99'){
						    $("#rankChartTitle").text("총인구 광역시도 중 랭킹")
						    $("#totalSgg").css("left", "140px")
						    $("#totalSgg").attr("id", "totalSido")
							$("#timeRankPopulationChart").empty();
							//총인구 광역시도 중 랭킹 정보 전국일 경우 표출될 택스트 위치
							var sidoHtml = "";
							sidoHtml += "<div class='DataNone' id='timeRankPopulationChartNone'>";
							sidoHtml += "	<img src='/images/totSurv/locationclick.png' alt='지역을 선택하세요'>";
							sidoHtml += "	<p>지역을 선택하시면 랭킹차트가 표출됩니다.</p>";
							sidoHtml += "</div>";
							$("#timeRankPopulationChart").html(sidoHtml)
					   }
					});
					$totSurvTmsMap.ui.prevZoom = lv_zoom;

			   }// end map.id 0             
			},
			
			/** 2020-10-14 [주형식] 맵툴팁 직접생성으로 인하여 mouse out 시 하이드처리 START */
			// 마우스 out 시, 콜백 함수
			didMouseOutPolygon : function(event, data, type, map) {
				$("#mapToolTipTable").hide();
			},
			/** 2020-10-14 [주형식] 맵툴팁 직접생성으로 인하여 mouse out 시 하이드처리 END */
			
			
			// 경계 선택 시, 콜백 함수
			didSelectedPolygon : function(event, data, type, map) {

				console.log("data = " + JSON.stringify(data.properties));
				console.log("adm_cd = " + data.properties.adm_cd);
				console.log("adm_nm = " + data.properties.adm_nm);
				
				srvLogWrite('P0','01','04','01',$totSurvMain.ui.selectedThema,'year='+$totSurvMain.ui.selectedYear+',adm_cd='+data.properties.adm_cd);

				if($totSurvTmsMap.ui.mapToggleId != data.properties.adm_cd) { // 2020-10-08 [곽제욱] 시계열 맵토글 ID로 변경				
					// 선택한 지역 하이라이트
					$totSurvTmsMap.ui.mapList[0].setPolyLayerHighlight2(data.properties.adm_cd, "left"); // 2020-10-08 [곽제욱] 시계열 맵 토글관련 수정
					$totSurvTmsMap.ui.mapList[1].setPolyLayerHighlight2(data.properties.adm_cd, "right"); // 2020-10-08 [곽제욱] 시계열 맵 토글관련 수정
		    		$totSurvTmsMap.ui.mapToggleId = data.properties.adm_cd; // 2020-10-08 [곽제욱] 시계열 맵토글 ID로 변경
		    		
		    		$("#leftMapDiv > h5").text('지도 - ' + data.properties.adm_nm)
		    		$("#rightMapDiv > h5").text('지도 - ' + data.properties.adm_nm)
		    		
		    		var sido_cd = data.properties.adm_cd.substring(0,2);
		    		$totSurvMain.ui.selectedArea = $totSurvTmsMap.ui.mapToggleId; // 2020-10-08 [곽제욱] 시계열 맵토글 ID로 변경
		    		if(data.properties.adm_cd.length == 5){
		    			var sgg_cd = data.properties.adm_cd.substring(2,5);
		    			$totSurvMain.ui.getSidoSggPos(sido_cd+sgg_cd);
		    		}  else {
		    			//$totSurvMain.ui.selectedArea = "00";
		    		}
		    		
		    		$("#dash_sido").val(sido_cd);

		    		
		    		$populationTms.ui.searchData($("#selLeftYear").val(), $("#selRightYear").val());
					$populationTms.ui.searchTimeGenderAgeData($("#selLeftYear").val(), $("#selRightYear").val(), $totSurvMain.ui.selectedArea);
					var regionGb = "";
					if(data.properties.adm_cd.length == 2){
						 regionGb = "sgg";
					} else {
						 regionGb = "emdong";
					}
					$totSurvMain.ui.tmsPathChange(regionGb, data.properties.adm_cd);
				} else { 
					var regionGb = "";
					if(data.properties.adm_cd.length == 5){
						regionGb = "sgg";
						$totSurvMain.ui.selectedArea = data.properties.adm_cd.substring(0,2);
						$totSurvMain.ui.tmsPathChange(regionGb, $totSurvMain.ui.selectedArea);
					} else if(data.properties.adm_cd.length == 2){
						$totSurvMain.ui.selectedArea = "00";
						$totSurvMain.ui.tmsPathChange("nationwide", $totSurvMain.ui.selectedArea);
					}
					$totSurvTmsMap.ui.mapList[0].setPolyLayerHighlight2(data.properties.adm_cd, "left"); // 2020-10-08 [곽제욱] 시계열 맵 토글관련 수정
					$totSurvTmsMap.ui.mapList[1].setPolyLayerHighlight2(data.properties.adm_cd, "right"); // 2020-10-08 [곽제욱] 시계열 맵 토글관련 수정
					$totSurvTmsMap.ui.mapToggleId = ""; // 2020-10-08 [곽제욱] 시계열 맵토글 ID로 변경
					
					if($totSurvMain.ui.selectedArea == '00'){
						$("#leftMapDiv > h5").text('지도 - 전국')
			    		$("#rightMapDiv > h5").text('지도 - 전국')
					} else {
						$("#leftMapDiv > h5").text('지도 - ' + data.properties.adm_nm.split(' ')[0])
			    		$("#rightMapDiv > h5").text('지도 - ' + data.properties.adm_nm.split(' ')[0])
					}
					
					
					$populationTms.ui.searchData($("#selLeftYear").val(), $("#selRightYear").val());
					$populationTms.ui.searchTimeGenderAgeData($("#selLeftYear").val(), $("#selRightYear").val(), $totSurvMain.ui.selectedArea);
					
					
				}				
			},
			
	};
	
}(window, document));