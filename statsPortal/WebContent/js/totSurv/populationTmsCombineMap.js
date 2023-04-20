/**
 * 총조사시각화 융합보기 맵
 *
 * history :
 * 2020.10.04			총조사시각화 융합보기 맵
 *
 *
 * author : 주형식
 * version : 1.0
 * see :
 *
 */
(function(W, D) {
	W.$populationTmsCombineMap = W.$populationTmsCombineMap || {};
	$populationTmsCombineMap.noReverseGeoCode = true;
	$(document).ready(function() {
		$populationTmsCombineMap.event.setUIEvent();
	});
	
	$populationTmsCombineMap.ui = {
			combineDataSet : null,
			openerMapList : [],
			cdgLayer : null,
			openerArParamList : [],
			layerGroup : null,
			namespace : "thematicMap04",//negative legend 사용을 위한 namespace
			mapList : [],
			data : null,
			layerGroup : [],
			isSameHeatMapType : false,
			heatMapIdx : [],
			reportPopup : null,
			popupWidth : 0, //2017.05.29 [개발팀] 융합창 너비
			popupHeight : 0, //2017.05.29 [개발팀] 융합창 높이
			calcData : null,
			selectedRelationPolicyMapList : [], //2017.09.20 [개발팀] 수정기능
			poiTitleNm : "",
			poiSourceNm : "",
			featureLayer : null,
			clusterLayer : null,
			circleLayer : null,
			mapBounds : null,
			isZoom : false, //2018.02.06 [개발팀]
			
			//데이터 추가.
			mapData : null,
			mapStatsData : {}, // 통계정보 저장
			mapRegionData : {}, // 지역경계 저장
			mapRegion : "", // 지역경계 sido, sgg, emdong, totreg
			mapType : "", // 지도유형 color, bubble, heat, poi, grid
			par_width:"",	// 부모 가로 맵사이즈 
			par_height:"",  // 부모 세로 맵사이즈
			
			/**
			 * 
			 * @name         : initCombineMap
			 * @description  : 융합팝업창을 초기화한다.
			 * @date         : 2017. 07. 25. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			initCombineMap : function(delegate) {
				
				$populationTmsCombineMap.ui.par_width = $('#mapRgn_1').width();
				$populationTmsCombineMap.ui.par_height = $('#mapRgn_1').height();
				
				//this.delegate = delegate;
				$populationTmsCombineMap.ui.resizePopup();
				$populationTmsCombineMap.ui.createMap("mapCombine");
			
				if($totSurvTmsMap.ui.mapRegion =="sido" || $totSurvMain.ui.selectedArea == "00"){
					$populationTmsCombineMap.ui.drawTmsMapData("sido", "color", $populationTmsCombineMap.ui.map , $totSurvMain.ui.rightSelectedYear, $totSurvMain.ui.leftSelectedYear);
				}
				else if($totSurvTmsMap.ui.mapRegion =="sgg" && $totSurvMain.ui.selectedArea != "00"){
					$populationTmsCombineMap.ui.drawTmsMapData("sgg", "color", $populationTmsCombineMap.ui.map , $totSurvMain.ui.rightSelectedYear, $totSurvMain.ui.leftSelectedYear);
				}
				
				$('#mapRgn_1').width($populationTmsCombineMap.ui.par_width);
				$('#mapRgn_2').width($populationTmsCombineMap.ui.par_width);
			},
			
			
			/**
			 * 
			 * @name         : resizePopup
			 * @description  : 융합팝업창의 크기를 리사이즈한다.
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 */
			resizePopup : function() {
				var dWidth = $(document).width();
				var dHeight = $(document).height();
				var pWidth = dWidth-400;
				var pHeight = dHeight-200;
				var marginLeft = parseInt((dWidth-pWidth)/2);
				var marginTop = parseInt((dHeight-pHeight)/2) + 50;
				
								
				
				if (pWidth > 700) {
					pWidth = 1000; //20201203 박은식 - 높이값 수정 //20210309 박은식 size 변경
				}
				
				if (pHeight < 740) {
					pHeight = 719; //20201203 박은식 - 높이값 수정 //20210309 박은식 size 변경
				}
				
				
				$(".policyStaticBox").css({
					"width" : pWidth,
					"height" : pHeight	
				});
				
				$("#mapContents").css({ // 20210310 박은식 id로 변경
					//20210309 박은식 size 변경START
					"width" : "982px", //20201203 박은식 - 넓이값 수정 677 -> 572
					"height" : "719px"
					//20210309 박은식 size 변경END
				});
				
				//팝업표출
				$populationTmsCombineMap.event.popupShow();

			},
			
			
			
			
			/**
			 * 
			 * @name         : createMap
			 * @description  : 맵 및 맵에 오버레이될 그래프, 범례 등을 생성한다.
			 * @date         : 2017. 07. 25. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			createMap : function(id) {
				var map = new sMap.map();
				map.createMap($populationTmsCombineMap, id, {
					center : [ 989674, 1818313 ],
					zoom : 0,
					measureControl : false,
					statisticTileLayer: true
				});
				
				map.id = 0;

				//범례 호출 함수 
				var legend = new sLegendInfo.legendInfo(map);
				legend.initialize($populationTmsCombineMap.ui);
				map.legend = legend;
				legend.createLegend();
				// 2020.10.12 범례타입 변경 hsJu
				legend.legendType = "negative";
				legend.linkTooltip();
				
				//타입설정버튼 숨김
				//정책통계지도 등록 시, 타입변경은 의미없음
				$("#legendPopEvent00_"+ map.legend.id).parent().hide();
				
				//사용자지정컨트롤설정
				this.map = map;
				this.mapList[map.id] = map;

				map.gMap.whenReady(function() {
					map.createHeatMap();
					$populationTmsCombineMap.ui.clear(map); //2018.02.06 [개발팀]
					//$populationTmsCombineMap.ui.drawCombine();
				});
				
				map.gMap.on("moveend", function(e) {
					$populationTmsCombineMap.callbackFunc.didMapMoveEnd(e, map);
				});
				
				return map;
			},
			
			
			
			
			/**
			 * 
			 * @name         : setLegend
			 * @description  : 범례를 설정한다.
			 * @date         : 2017. 08. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 범례타입
			 * @param map    : 맵 정보
			 */
			setLegend : function(type, data) {
				if (type == null) {
					type = "color";
				}
				this.map.legend.legendType = type;
				this.map.legend.valPerSlice = this.map.legend.calculateLegend(data);
			},
			
			/**
			 * 
			 * @name         : drawPolygon
			 * @description  : 폴리곤을 그린다.
			 * @date         :  
			 * @author	     : 
			 * @history 	 :
			 * @param map    : 맵 정보
			 */
			drawPolygon : function(combineData, map) {
				map.multiLayerControl.dataGeojson = [];
				var bounds = null;
				for (var k=0; k<combineData.length; k++) {
					var layer = combineData[k].layer;
					layer = map.combineStatsData(layer, true);
					map.multiLayerControl.dataGeojson.push(map.addPolygonGeoJson(layer, "data"));
					
					//경계위치조정
					if (k==0) {
						bounds = map.multiLayerControl.dataGeojson[k].getBounds();
					}else {
						bounds.extend(map.multiLayerControl.dataGeojson[k].getBounds());
					}
					map.gMap.fitBounds(bounds, {
						animate : false
					});
				}
			},
			
			
			
			
			
			
			/**
			 * 
			 * @name         : clear
			 * @description  : 지도경계정보를 초기화한다.
			 * @date         : 
			 * @author	     : 
			 * @history 	 :
			 * @param map    : 맵 정보
			 */
			clear : function(map) {
				if (map.multiLayerControl.dataGeojson != null) {
					for (var i=0; i<map.multiLayerControl.dataGeojson.length; i++) {
						map.multiLayerControl.dataGeojson[i].remove();
					}
					map.multiLayerControl.dataGeojson = [];
				}
				
				map.gMap.eachLayer(function(layer) {
					if (layer._layer) {
						_layer.remove();
					}
				});
				
				
				//마커 초기화
				if (this.featureLayer != null) {
					this.featureLayer.clearLayers();
					this.featureLayer = null;
				}
				
				if (this.clusterLayer != null) {
					this.clusterLayer.clearLayers();
					this.clusterLayer = null;
				}
				
				if (this.circleLayer != null) {
					this.circleLayer.clearLayers();
					this.circleLayer = null;
				}
				
				this.mapBounds = null;
				
			},
			
			
			
			
			
			
			
			
			
			/**
			 * 
			 * @name         : createInfoTooltip
			 * @description  : 경계레이어 선택 시, 툴팁을 생성하여 정보를 표출한다.
			 * @date         : 
			 * @author	     : 
			 * @history 	 :
			 * @param event  : 선택된 경계레이어
			 * @param data   : 선택된 경계레이어의 데이터정보
			 */
			createInfoTooltip : function(event, data, type, map) {
				
				/** 2020.10.28 크롬에서 툴팁안되서 변경*/
				/** 2020-10-14 [주형식] 맵툴팁 직접생성 START */
				$("#toolAdmNm2").html(data.properties.adm_nm);
				
				var lv_html = "";
				if (data.info != undefined && data.info.length > 0) {
					var value = appendCommaToNumber(data.info[0][data.info[0].showData]);
					var rt = data.info[0].rt;
					var unit = "명";
					//lv_html += appendCommaToNumber(parseFloat(data.info[0][data.info[0].showData]));
					lv_html += "융합데이터(증감) : <p style='color:"+((Number(data.info[0][data.info[0].showData]) > 0 )? "#ec2828" : "#0982d8")+"; font-weight: 700; display: inline-block; margin-top: 0; padding-right: 3px;'>" + value + "</p> ("+unit+")<br>" + data.info[0].e_year + "대비 (증감률) : <p style='color:"+((Number(rt) > 0 )? "#ec2828" : "#0982d8")+"; font-weight: 700; display: inline-block; margin-top: 0; padding-right: 3px;'>" + rt + "</p> (%) </td>";  //20201202 박은식 style추가 및 증감율에 따른 TEXT 색상 변경
					
				} else {
					lv_html += "N/A"
				}
				
				
				$("#toolAdmData2").html(lv_html);
				// width : 119
				// height : 69
				var x = event.originalEvent.clientX;
				var y = event.originalEvent.clientY-70;
								
				$("#mapToolTipTable2").css("left", x).css("top", y);
				
				if($('#mapToolTipTable2').css("display") == "none"){
					$("#mapToolTipTable2").show();
				}
				
				/** 2020-10-14 [주형식] 맵툴팁 직접생성 END */
				
				/** 2020-10-14 [주형식] 맵툴팁 직접생성으로 인하여 이전소스 주석처리 START */
				/*
				var html = "";
				if (type == "data") {
					var title = $populationTmsCombineMap.ui.dispTitle;
					//var unit = $populationTmsCombineMap.ui.dispUnit;
					var unit = "명";
					if (data.info != undefined && data.info.length > 0) {
						
						var html = "<table style='margin:10px;'>";
						for (var i = 0; i < data.info.length; i++) {
							var tmpData = data.info[i];
							if (data.properties.adm_nm !== undefined) {
								html += "<tr><td class='admName'>"
									 + data.properties.adm_nm
									 + "</td></tr>"
									 + "<tr style='height:5px'></tr>";
							}
							
							//집계구 일경우
							if (data.properties.adm_cd.length > 7) {
								html += "<tr>";
								html += "<td class='statsData'>집계구 : " + data.properties.adm_cd + "</td>";
								html += "</tr>";
							}
							
							if (tmpData.showData != undefined && tmpData.showData.length > 0) {
								var value = appendCommaToNumber(tmpData[tmpData.showData]);
								var rt = tmpData.rt;

								html += "<tr style='font-size:12px;padding-left:5px;'>";
								if (unit != null && unit.length > 0) {
									html += "<td class='statsData'> 융합데이터(증감) : " + value + " ("+unit+")<br>" + tmpData.e_year + "대비 (증감율) : " + rt + " (%) </td>";
								}else {
									html += "<td class='statsData'> 융합데이터(증감) : " + value + "<br> " + tmpData.e_year + "대비 (증감율) : " + rt + " (%) </td>";;
								}
								html += "</td></tr>";
							}	
						}
						html += "</table>";
						
					}else {
							html = "<table style='margin:10px;'>"
					             + 	"<tr><td class='statsData'>N/A</td></td>";
								 + "</table>";
					}
				}
			
				event.target.bindToolTip(html, {
					direction: 'right',
					noHide:true,
					opacity: 1,
					pane:"infowindowPane"
				}).addTo(map.gMap)._showToolTip(event);
				
				$(".admName")
					.css("font-size", "14px")
					.css("font-weight", "bold")
					.css("color", "#3792de");
				$(".statsData")
					.css("font-size", "12px")
					.css("padding-left", "5px");
				*/
				/** 2020-10-14 [주형식] 맵툴팁 직접생성으로 인하여 이전소스 주석처리 END */
			},
			
			
			/**
			 * @name : drawTmsMapData
			 * @description : 지도 데이터 그리기
			 * @date : 2020.08.12
			 * @author : 곽제욱
			 * @history :
			 * @param :
			 * 		p_map_region : 지역경계
			 * 		p_map_type : 지도유형(heat 고정)
			 * 		p_map_gbn   : 맵 구분 (left, right)
			 */
			drawTmsMapData : function(p_map_region, p_map_type, p_map, s_year, e_year ) {
				var selMap =  $populationTmsCombineMap.ui.map;
				
				var lv_map_region_before = $populationTmsCombineMap.ui.mapRegion;
				var lv_map_type_before = $populationTmsCombineMap.ui.mapType;
				var lv_surv_id = $totSurvMain.ui.selectedSurvId;
				
				if(p_map_region == undefined || p_map_region == null) {
					p_map_region = $totSurvMain.ui.mapRegion;
				}
				else {
					$populationTmsCombineMap.ui.mapRegion = p_map_region;
				}
				if(p_map_type == undefined || p_map_type == null) {
					p_map_type = $totSurvMain.ui.mapType;
				}
				else {
					$populationTmsCombineMap.ui.mapType = p_map_type;
				}
				
				//지역변수
				var lv_adm_cd = "00";
				var lv_adm_nm = "전국";
				var lv_adm_coor_x = 990480.875;
				var lv_adm_coor_y = 1815839.375;
				
				// 선택된(줌된) 정보로 시도콤보 설정
				var sido = "";
				if($totSurvMain.ui.selectedArea.length == 5){
					sido = $totSurvMain.ui.selectedArea.substring(0,2);
				}
				else if($totSurvMain.ui.selectedArea.length == 2){
					sido = $totSurvMain.ui.selectedArea;
				}
				
				$("#dash_sido").val(sido);
				/* 총조사 시각화의 경우 각 시도정보는  $totSurvMain.ui.selectedArea 로 가져온다 */
//				var lv_sido = $("#dash_sido");
				var lv_sido_cd = $("#dash_sido").val();
				var lv_sido_nm = $("#dash_sido option:selected").text();
//				var lv_sido_coor_x = $("#dash_sido option:selected").attr("data-coor-x");
//				var lv_sido_coor_y = $("#dash_sido option:selected").attr("data-coor-y");
//				var lv_sgg = $("#dash_sgg");
				var lv_sgg_cd = $("#dash_sgg").val();
//				var lv_sgg_nm = $("#dash_sgg option:selected").text();
//				var lv_sgg_coor_x = $("#dash_sgg option:selected").attr("data-coor-x");
//				var lv_sgg_coor_y = $("#dash_sgg option:selected").attr("data-coor-y");
//				var lv_emdong = $("#dash_emdong");
//				var lv_emdong_cd = $("#dash_emdong").val();
//				var lv_emdong_nm = $("#dash_emdong option:selected").text();
//				var lv_emdong_coor_x = $("#dash_emdong option:selected").attr("data-coor-x");
//				var lv_emdong_coor_y = $("#dash_emdong option:selected").attr("data-coor-y");
				
				//지역변수 데이터 정리
//				if(lv_sido_cd != "99") {
//					lv_adm_coor_x = lv_sido_coor_x;
//					lv_adm_coor_y = lv_sido_coor_y;
//				}
//				if(lv_sgg_cd != "999") {
//					lv_adm_coor_x = lv_sgg_coor_x;
//					lv_adm_coor_y = lv_sgg_coor_y;
//				}
//				if(lv_emdong_cd != "99") {
//					lv_adm_coor_x = lv_emdong_coor_x;
//					lv_adm_coor_y = lv_emdong_coor_y;
//				}
				
//				if(lv_sido_cd == "99") lv_sido_cd = "00";
//				lv_adm_cd = lv_sido_cd + lv_sgg_cd + lv_emdong_cd;
//				lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm + " " + lv_emdong_nm;
//				if(lv_sido_cd == "99") lv_adm_cd = "00";
//				else if(lv_sgg_cd == "999") lv_adm_cd = lv_sido_cd;
//				else if(lv_emdong_cd == "99") lv_adm_cd = lv_sido_cd + lv_sgg_cd;
//				if(lv_sido_cd == "99") lv_adm_nm = lv_sido_nm;
//				else if(lv_sgg_cd == "999") lv_adm_nm = lv_sido_nm;
//				else if(lv_emdong_cd == "99") lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm;
				
				//지도 Clear
				$populationTmsCombineMap.ui.clearMap(selMap);
				
				//색상/버블
				if(p_map_type == "color" || p_map_type == "bubble") {
					//색상/버블 (시도)
					if(p_map_region == "sido") {
						
						$populationTmsCombineMap.ui.setTmsCombineData(selMap, "sido", "color", "", "", "",  "PH0001", s_year, e_year, function(p_list) {
							//리스트에서 unit 가져오기
							var lv_unit = "명";
							var lv_unit_nm = "수";
							if(p_list != null && p_list.length > 0) {
								if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
								if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
							}
							
							//데이터 넣기
							selMap.setStatsData("normal", {"pAdmCd": "00", "result" : p_list}, "calculat", lv_unit);
							
							// 타이틀 설정
							$('#popupTitle').text(" " + "전국" + " 인구의 변화");
							
							//경계 그리기
							$populationTmsCombineMap.ui.setTotSurvRegion(selMap, "sido", s_year, "", "", "", function() {
								
							});
							
							// 2020-10-14 zoom level 변경
							$populationTmsCombineMap.ui.map.setZoom(1); //20210310 박은식 융합보기 줌레벨 변경처리 
							
						});
						
					}
					//색상/버블 (시군구)
					else if(p_map_region == "sgg") {
						
						console.log("================  sgg  =================");
						
						$populationTmsCombineMap.ui.setTmsCombineData(selMap, "atdrc", "color", lv_sido_cd, lv_sgg_cd, "", "PH0001", s_year, e_year, function(p_list) {  // 비자치구 경겨로 변경 [2020-10-08]
							//리스트에서 unit 가져오기
							var lv_unit = "개";
							var lv_unit_nm = "수";
							if(p_list != null && p_list.length > 0) {
								if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
								if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
							}
							
							//데이터 넣기
							selMap.setStatsData("normal", {"pAdmCd": lv_sido_cd, "result" : p_list}, "calculat", lv_unit);
							
							// 타이틀 설정
							$('#popupTitle').text(" " + lv_sido_nm + " 인구의 변화");							
							//경계 그리기
							//var lv_region = "atdrc"; // 비자치구 경겨로 변경 [2020-10-08]
							var lv_region = "sgg"; // 비자치구 경겨로 변경 [2020-10-08]
							$populationTmsCombineMap.ui.setTotSurvRegion(selMap, lv_region, s_year, lv_sido_cd, "", "", function() {
								if($totSurvMap.ui.mapToggleId != "" && $totSurvMap.ui.mapToggleId != null){
								}
							});
							
							// zoom level
							$populationTmsCombineMap.ui.map.mapMove($totSurvTmsMap.ui.mapList[0].center, $totSurvTmsMap.ui.mapList[0].zoom);
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
					console.log("[populationTmsCombineMap] ###  adm_cd = " + adm_cd);
					
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
					//20210310 박은식 융합보기 중심점 및 줌레벨 변경처리 START
					if($totSurvMain.ui.selectedArea == '00'){
						var lv_zoom = $populationTmsCombineMap.ui.map,zoom;
						$populationTmsCombineMap.ui.map.mapMove([990480.875, 1800313], lv_zoom,false)
					}
					//20210310 박은식 융합보기 중심점 및 줌레벨 변경처리 END
					
				}
				//열지도
				else if(p_map_type == "heat") {}
				//POI
				else if(p_map_type == "poi") {}
			},
			
			/**
			 * 
			 * @name         : setTmsCombineData
			 * @description  : 시계열 융합보기 데이터 가져오기
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
			setTmsCombineData : function(p_map, p_region, p_type, p_sido_cd, p_sgg_cd, p_emdong_cd, p_surv_id, st_year, ed_year, p_callback) {
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
				lv_params.start_year = st_year;
				lv_params.end_year = ed_year;
				lv_params.itm_cd = $populationTmsCombineMap.ui.selectedItmCd;
				
				var p_c1 = $populationTmsCombineMap.ui.selectedC1;
				
				if(p_type != undefined && p_type != null && p_type != "") lv_params.map_ty = p_type;
				//p_region : poi는 기본적으로 all이지만 열지도는 all이 아니므로 all일때는 그냥 파라미터 제외함.
				if(p_region != undefined && p_region != null && p_region != "" && p_region != "all") lv_params.area_bndry_se = p_region;
				if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "") lv_params.sido_cd = p_sido_cd;
				if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "") lv_params.sgg_cd = p_sgg_cd;
				if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") lv_params.emdong_cd = p_emdong_cd;
				if(p_c1 != undefined && p_c1 != null && p_c1 != "") lv_params.c1 = p_c1;
				
				
				// 비자치구 조회 파라메터 설정 - 2020.10.08
				//lv_params.isAtdrc = true;
				
				var lv_url = contextPath+"/ServiceAPI/totSurv/populationDash/getTmsCombineData.json";
				// ajax 시작
				$.ajax({
					url: lv_url,
				    type: 'post',
				    data: lv_params
				}).always(function(res) { // 전 처리
					
				}).done(function (res) { // 완료
					//정보 저장
					$populationTmsCombineMap.ui.mapStatsData[lv_tot_surv_id+"_"+p_type+"_"+p_region+"_"+lv_adm_cd] = res.result.mapData;
					
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
			setTotSurvRegion : function(p_map, p_region, p_base_year, p_sido_cd, p_sgg_cd, p_emdong_cd, p_callback) {

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
						$populationTmsCombineMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd] = p_res;
						
						var xcoor = 989674 ;
						var ycoor = 1818313;
						var zoomLevel = p_map.zoom;						
						//콜백함수 호출
				    	if(typeof p_callback === "function") {
							p_callback();
						}
					});
				}
				//시도 이외의 경계 데이터 조회
				else {
					var params = {};
					params.region = p_region;
					params.base_year = p_base_year;
					
					tempAdmCd = p_sido_cd;
					
					//p_sido_cd = tempAdmCd.substring(0,2);
					//p_sgg_cd = tempAdmCd.substring(2,5);				
					
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
							$populationTmsCombineMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd] = res;
							//경계그리기
							p_map.setPolygonDataGeojson(res);
							var xcoor = 0;
							var ycoor = 0;

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
							
							if($totSurvMap.ui.mapToggleId != "" && $totSurvMap.ui.mapToggleId.length == 5){
								var tempAdmCd = $totSurvMap.ui.mapToggleId;
								$totSurvMain.ui.getSidoSggPos(tempAdmCd);
								$("#dash_sido").val(tempAdmCd.substring(0,2));
								xcoor = $("#dash_sgg option:selected").attr("data-coor-x");
								ycoor = $("#dash_sgg option:selected").attr("data-coor-y");
							}
							zoomLevel = p_map.zoom;
							
							//p_map.mapMove([xcoor, ycoor], zoomLevel, true);
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
				if($populationTmsCombineMap.ui.mapData == null) {
					return bndYear;
				}
				var lv_data = $totSurvMap.ui.mapData.data;
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
			
			
			
			
			
			
			
			
	};
	
	$populationTmsCombineMap.event = {
			setUIEvent : function() {
				
			},
	
			
			
			/**
			 * 
			 * @name         : popupShow
			 * @description  : 정책통계지도 융합팝업창을 표출한다. 
			 * @date         : 2017. 08. 25. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */	
			popupShow : function() {
				$("#combineMap").show();
			},
			
			/**
			 * 
			 * @name         : popupClose
			 * @description  : 정책통계지도 융합팝업창을 닫는다. 
			 * @date         : 2017. 08. 25. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */	
			popupClose : function() {
				var map = $populationTmsCombineMap.ui.map;
				if (map !== null && map !== undefined) {
					map.gMap.remove();
					map = null;
				}
				
				
				$populationTmsCombineMap.ui.par_width;
				$populationTmsCombineMap.ui.par_height;
				
				$("#modal").hide();
				$("#combineMap").hide();
			}
	};
	
	
	
		$populationTmsCombineMap.callbackFunc = {
			// 맵 줌 종료 시, 콜백 호출
			didMapMoveEnd : function(event, map) {
			},
			
			didMouseOverPolygon : function(event, data, type, map) {
				if (type != "polygon") {
					if (type == "data") {
						if (data.info.length > 0) {
							map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
					}
					$populationTmsCombineMap.ui.createInfoTooltip(event, data, type, map);
				}
			},
			
			/** 2020-10-14 [주형식] 맵툴팁 직접생성으로 인하여 mouse out 시 하이드처리 START */
			// 마우스 out 시, 콜백 함수
			didMouseOutPolygon : function(event, data, type, map) {
				$("#mapToolTipTable2").hide();
			},
			/** 2020-10-14 [주형식] 맵툴팁 직접생성으로 인하여 mouse out 시 하이드처리 END */
			
	};
	
	
}(window, document));