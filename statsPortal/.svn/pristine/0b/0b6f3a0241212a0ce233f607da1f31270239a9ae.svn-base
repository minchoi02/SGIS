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
	W.$totSurvMap = W.$totSurvMap || {};

	$(document).ready(
		function() {});
	
	$totSurvMap = {
			noReverseGeoCode : false
	};
	
	$totSurvMap.ui = {
			map : null,
			namespace : "totSurvMap",
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
			selectedItmCd : "", // 선택한 itm_cd
			selectedC1 : "", 	// 선택한 c1
			selectedC2 : "", // 선택한 c2
			selectedC3 : "", // 선택한 c3
			prevZoom : "1", 	// 지도 이동 이벤트에서 드래그를 막기위한 이전 줌 변수 
			isAtdrc : false,	// 비자치구 여부  (ex 수원시 (5자리) 클릭시 구정보 조회) / census 조회시 true면 5자리라도 조회 안하도록
			
			tempTilePerColor : "",
			//데이터
			mapData : null,
			mapStatsData : {}, // 통계정보 저장
			mapRegionData : {}, // 지역경계 저장
			mapRegion : "", // 지역경계 sido, sgg, emdong, totreg
			mapType : "", // 지도유형 color, bubble, heat, poi, grid
			mapToggleId : "", // 맵 토글 id, 슬라이드 이동시에도 하이라이트 처리를 위해 사용
			mapTempColor : "", // 하이라이트를 위한 맵 임시 칼라
			tileTempColor : "", // 타일맵 하이라이트를 위한 임시 칼라 //2020-11-04 [곽제욱] 타일맵 하이라이트 처리를 위한 변수 추가 
			chartToggle : "", // 차트 토글 id가 들어감
			chartToggleYn : "N",
			mapTotalVal : 0, // 2020-11-17 [곽제욱] 맵 total값을 위한 변수 추가
			
			/**
			 * 지도데이터 초기화
			 */
			clearLayer: function() {// used
				$totSurvMain.ui.log("$totSurvMap.ui.clearLayer - begin");

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
			createMap : function(id, seq) {
				
				this.map = new sMap.map();
				
				
				this.map.id = id;
				this.map.isDrop = true;
				this.map.isInnerMapShow = true;
				this.map.isTradeMapShow = false;
				this.map.boundLevel = 0; // 확대 상관없이 지역경계 표시하게함
				this.map.createMap($totSurvMap, id, {
					center : [ 1014426, 1754429 ], // 2020-11-13 [곽제욱] 맵 첫 로딩시 center값 수정 [ 989674, 1818313 ] -> [ 982682, 1744189 ]
					zoom : 1, //9->8
					measureControl : false,
					statisticTileLayer: false
				});
				this.map.addControlEvent("zoomend");
				
				
				this.map.gMap.on("moveend", function (e) {
					var that = $totSurvMap.ui.map;
					if (that.delegate && 
						that.delegate.callbackFunc && 
						that.delegate.callbackFunc.didMapMoveEnd instanceof Function) {
						that.delegate.callbackFunc.didMapMoveEnd(e, that);
					}
				});
				
				//지도 범례 등록
				var legend = new sLegendInfo.legendInfo($totSurvMap.ui.map);
				legend.linkTooltip = function() {}; //툴팁오류 방지
				legend.drawBubbleMap = $totSurvMap.ui.drawBubbleMap; // 버블 지도 Override
				legend.initialize($totSurvMap.ui);
				this.map.legend = legend;
				legend.createLegend();
				
				this.map.gMap.whenReady(function() {
					$totSurvMap.ui.map.createHeatMap();
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
				// HTML 생성
				/** 2020-10-06 [곽제욱] 맵툴팁 직접생성 START */
				$("#mapToolTipTable").css("text-align", "center"); // 2020-11-18 [신예리] 맵툴팁 가운데 정렬
				$("#toolAdmNm").html("<p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956;'>"+data.properties.adm_nm+"</p>"); // 2020-11-17 [곽제욱] 맵 툴팁 스타일 적용
				
				//2020-11-17 [곽제욱] 데이터 비율 계산 추가 START
				var total = $totSurvMap.ui.mapTotalVal;
				var ratio = 0;
		        if(total != 0 && total !=""){
		        	if(data.info.length>0){
		        		ratio = ( data.info[0][data.info[0].showData] / total * 100).toFixed(2)
		        	} else {
		        		ratio = 0;
		        	}
		        } else {
		        	ratio = 100;
		        }
				//2020-11-17 [곽제욱] 데이터 비율 계산 추가 END
				
				//20201012 박은식 다문화 가구 선택 시 단위를 가구로 표시 START
				var lv_html = "";
				if(data.info.length>0){
					lv_html += "<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 0; padding-right: 3px;'>"+appendCommaToNumber(parseFloat(data.info[0][data.info[0].showData]))+"</p>";  // 2020-11-17 [곽제욱] 맵 툴팁 스타일 적용 // 2020.11.18[신예리] margin-top 값 변경
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
					lv_html += " (호)"; // 20201028 박은식 단위변경
				}
				else if($totSurvMain.ui.selectedThema == "농업"){
					// 2020-10-26 [곽제욱] 선택한 차트에 따른 단위 변경 START
					// 2020-11-10 [주형식] 명 -> 가구로 변경 START
//					if($totSurvMap.ui.selectedSurvId == "FS0013" || $totSurvMap.ui.selectedSurvId == "FS0315") {
//						lv_html += " (명)";
//					} else {
						lv_html += " (가구)";
//					}
					// 2020-11-10 [주형식] 명 -> 가구로 변경 END
					// 2020-10-26 [곽제욱] 선택한 차트에 따른 단위 변경 END
				}
				else if($totSurvMain.ui.selectedThema == "임업"){
					/** 2020-11-09[한광희] 입업 단위 변경 START */
					/*if($totSurvMap.ui.selectedSurvId == "FS0235" || $totSurvMap.ui.selectedSurvId == "FS0532"){
						lv_html += " (명)";
					} else {*/
					lv_html += " (가구)";
					/*}*/
					/** 2020-11-09[한광희] 입업 단위 변경 END */
				}
				else if($totSurvMain.ui.selectedThema == "어업"){
				//20201110 박은식 어업 인구에서 가구로 변경 START
//					if($totSurvMap.ui.selectedSurvId == "FS0112" || $totSurvMap.ui.selectedSurvId == "FS0171" || $totSurvMap.ui.selectedSurvId == "FS0413" || $totSurvMap.ui.selectedSurvId == "FS0469"){
						lv_html += " (가구)"; 
//					} else {
//						lv_html += " (가구)";
//					}
				//20201110 박은식 어업 인구에서 가구로 변경 END
				}
				
				//2020-11-17 [곽제욱] 데이터 비율 계산 추가 START
				//"<p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + d.data.region_nm + "</p>" + "<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 5px; padding-right: 3px;'>" + numberFormat(d.data.dt) + "</p>" + unit + "<br>" + "<p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px;'>" + numberFormat(ratio) + "</p>" + "%"
				lv_html += "<br><p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px;'>"+ratio+"</p>%";
				//2020-11-17 [곽제욱] 데이터 비율 계산 추가 END
				
				$("#toolAdmData").html(lv_html);
				// width : 119
				// height : 69
				var x = event.originalEvent.clientX+20; // 2020-11-18 [곽제욱] x좌표 수정
				var y = event.originalEvent.clientY-70;
				$("#mapToolTipTable").css("left", x).css("top", y);
				$("#mapToolTipTable").show();
				
				/** 2020-10-06 [곽제욱] 맵툴팁 직접생성 END */
				
				/** 2020-10-06 [곽제욱] 맵툴팁 직접생성으로 인하여 이전소스 주석처리 START */
				/*
				var lv_html = "<table style='margin:10px; overflow:visible'>";
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

						// kosis 데이터 일경우 3번째 배열이 undefined이고 값이 kosis임
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
									lv_html += " (명)";
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
				
				// HTML 화면표시
				event.target.bindToolTip(lv_html, {
					direction: 'right',
					noHide:true,
					opacity: 1
					//pane: 'infowindowPane'

				}).addTo(map.gMap)._showToolTip(event);
				event.target.tooltip.updateZIndex(900000);
				*/
				/** 2020-10-06 [곽제욱] 맵툴팁 직접생성으로 인하여 이전소스 주석처리 END */
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
				/** 인구 지도 이벤트 버튼 제어*/
				if($totSurvMap.ui.map != null){
					$(".mapExport").show();
					$(".zoom").show();
					$(".out").show();
				}

				var lv_map_region_before = $totSurvMap.ui.mapRegion;
				var lv_map_type_before = $totSurvMap.ui.mapType;
				var lv_surv_id = $totSurvMap.ui.selectedSurvId;
				
				if(p_map_region == undefined || p_map_region == null) {
					p_map_region = $totSurvMain.ui.mapRegion;
				}
				else {
					$totSurvMap.ui.mapRegion = p_map_region;
				}
				if(p_map_type == undefined || p_map_type == null) {
					p_map_type = $totSurvMain.ui.mapType;
				}
				else {
					$totSurvMap.ui.mapType = p_map_type;
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

				//지도 Clear
				$totSurvMap.ui.clearMap($totSurvMap.ui.map);
				//색상/버블
				if(p_map_type == "color" || p_map_type == "bubble") {
					//색상/버블 (시도)
					if(p_map_region == "sido") {
						//
						$totSurvMap.ui.setTotSurvData($totSurvMap.ui.map, "sido", "color", "", "", "",  lv_surv_id, function(p_list) {
							//리스트에서 unit 가져오기
							var lv_unit = "개";
							var lv_unit_nm = "수";
							if(p_list != null && p_list.length > 0) {
								if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
								if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
							}
							//데이터 넣기
							$totSurvMap.ui.map.setStatsData("normal", {"pAdmCd": "00", "result" : p_list}, "dt", lv_unit);
							
							
							//경계 그리기
							$totSurvMap.ui.setTotSurvRegion($totSurvMap.ui.map, "sido", $totSurvMap.ui.getTotSurvRegionYear(), "", "", "", function() {
								if($totSurvMap.ui.mapToggleId != "" && $totSurvMap.ui.mapToggleId != null){
									// 2020-10-06 [곽제욱] 지도 새로 그릴경우 선택된 지역과 이동한 지역이 다를경우, 선택지역으로 세팅 START
									if($totSurvMap.ui.mapToggleId!=$totSurvMain.ui.selectedArea){
										$totSurvMap.ui.mapToggleId = $totSurvMain.ui.selectedArea;
									}
									// 2020-10-06 [곽제욱] 지도 새로 그릴경우 선택된 지역과 이동한 지역이 다를경우, 선택지역으로 세팅 END
									// 랭크이동시 mapToggleId를 초기화하고 하이라이트 처리
									var highLightAmdCd = $totSurvMap.ui.mapToggleId;
									// 맵토글ID 초기화
									$totSurvMap.ui.mapToggleId = "";
									$totSurvMap.ui.map.setPolyLayerHighlight(highLightAmdCd);
									// 하이라이트 처리 후 맵토글ID 세팅
									$totSurvMap.ui.mapToggleId = highLightAmdCd;
									// 2020-11-02 [곽제욱] 타일차트 색변경 추가 START
									if(adm_cd != "00"){
										//20201118 박은식 IE에서 find() 미지원으로 변경 처리 START
					    				var tempColor = '';
					    				for(var i=0;i < $totSurvMain.ui.tilePerColor.length; i++){
					    					if($totSurvMain.ui.tilePerColor[i].adm_cd == adm_cd){
					    						tempColor = $totSurvMain.ui.tilePerColor[i].color
					    					}
					    				}
										//var tempColor = $totSurvMain.ui.tilePerColor.find(function(x) {	return x.adm_cd == adm_cd}).color; 
					    				//20201118 박은식 IE에서 find() 미지원으로 변경 처리 END
										if($totSurvMap.ui.tileTempColor!=""){
											//20201118 박은식 IE에서 find() 미지원으로 변경 처리 START
						    				var tempColor = '';
						    				for(var i=0;i < $totSurvMain.ui.tilePerColor.length; i++){
						    					if($totSurvMain.ui.tilePerColor[i].adm_cd == $totSurvMap.ui.mapToggleId){
						    						tempColor = $totSurvMain.ui.tilePerColor[i].color
						    					}
						    				}
											//var tempColor = $totSurvMain.ui.tilePerColor.find(function(x) {return x.adm_cd == $totSurvMap.ui.mapToggleId}).color;
						    				//20201118 박은식 IE에서 find() 미지원으로 변경 처리 END
						    				$("rect[value='"+$totSurvMap.ui.mapToggleId+"']").attr("fill", tempColor); 
										}
										$totSurvMap.ui.tileTempColor = $("rect[value='"+adm_cd+"']").attr("fill");
							    		$("rect[value='"+adm_cd+"']").attr("fill", "#0086c6"); // 2020-11-02 [곽제욱] 타일차트 색변경 추가
									}
						    		// 2020-11-02 [곽제욱] 타일차트 색변경 추가 END
								}
								// 2020-11-19 [곽제욱] 맵 그리기 완료 + 1초후 loading바 닫기 START
								setTimeout(function(){
									//$totSurvMain.ui.loading(false); 									
								}, 500) // 2020-11-23 [곽제욱] 맵 그리기 완료 1초에서 0.5초로 수정
								// 2020-11-19 [곽제욱] 맵 그리기 완료 + 1초후 loading바 닫기 END
							});
							
						});
						
					}
					//색상/버블 (시군구)
					else if(p_map_region == "sgg") {
						console.log("================  sgg  =================");
						// 비자치구 일경우 
						if($totSurvMap.ui.isAtdrc == true && ($totSurvMain.ui.selectedArea).length == 5 && ($totSurvMap.ui.mapToggleId == "" || $totSurvMain.ui.yearChangeYn == "Y" || gv_type=="locgov" || gv_type=="totFarmLocgov" || gv_type=="totPeopleLocgov" ) ){ // 2020-10-07 [곽제욱] 순위검색 case 예외처리 // 2020-11-05 [곽제욱] 조건 추가
//							//params.region = "sgg";
							var s_sido_cd = "";
							var s_sgg_cd = "";
							
							if($totSurvMain.ui.selectedArea.length == 5){
								/** 2020-10-14 [곽제욱] 조건문 삭제후 하나로 변경 START */
								s_sido_cd = ($totSurvMain.ui.selectedArea).substring(0,2);
								s_sgg_cd  = ($totSurvMain.ui.selectedArea).substring(2,4)+"0";
								// atdrc 상태에서 랭크이동인 경우 맵토글id 재지정
								if($totSurvMain.ui.selectedArea.substring(4,5)!= "0"){
									$totSurvMap.ui.mapToggleId = $totSurvMain.ui.selectedArea; 
								}
								/** 2020-10-14 [곽제욱] 조건문 삭제후 하나로 변경 END */
							} else {
								s_sido_cd = ($totSurvMain.ui.selectedArea).substring(0,2);
								s_sgg_cd  = ($totSurvMain.ui.selectedArea).substring(2,5); 
							}
							console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
							console.log(" sido_cd = " + s_sido_cd);
							console.log(" sgg_cd  = " + s_sgg_cd);
							console.log(" 비자치구 여부 체크 isAtdrc = " + $totSurvMap.ui.isAtdrc);
							console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
							
							$totSurvMap.ui.setTotSurvData($totSurvMap.ui.map, "sgg", "color", s_sido_cd, s_sgg_cd, "", lv_surv_id, function(p_list) {
								//리스트에서 unit 가져오기
								var lv_unit = "개";
								var lv_unit_nm = "수";
								if(p_list != null && p_list.length > 0) {
									if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
									if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
								}
								
								//데이터 넣기
								$totSurvMap.ui.map.setStatsData("normal", {"pAdmCd": s_sido_cd+s_sgg_cd, "result" : p_list}, "dt", lv_unit);
								
								//경계 그리기
								var lv_region = "sgg"; //비자치구 여부 체크
								
								//if(data.atdrc_yn != undefined && data.atdrc_yn != null && data.atdrc_yn == "Y") lv_region = "atdrc";
								$totSurvMap.ui.setTotSurvRegion($totSurvMap.ui.map, lv_region, $totSurvMap.ui.getTotSurvRegionYear(), s_sido_cd+s_sgg_cd, "", "", function() {
									//$totSurvMain.ui.pathChange(lv_region, lv_sido_cd);
									//비자치구인 경우 lv_region을 atrdc 로
									//$totSurvMain.ui.pathChange("atdrc", s_sido_cd+s_sgg_cd); // 2020-10-07 [곽제욱] 행정시도 진입시 선택지역 표출오류 수정  // 2020-10-14 [주형식] atdrc 수정 // 2020-12-01 [곽제욱] 주석처리										

									if($totSurvMain.ui.selectedThema == "인구"){
										$totSurvMain.ui.selectedLevel = 2;
									}
									if($totSurvMap.ui.mapToggleId != "" && $totSurvMap.ui.mapToggleId != null){
										// 랭크이동시 mapToggleId를 초기화하고 하이라이트 처리
										var highLightAmdCd = $totSurvMap.ui.mapToggleId;
										// 맵토글ID 초기화
										$totSurvMap.ui.mapToggleId = "";
										$totSurvMap.ui.map.setPolyLayerHighlight(highLightAmdCd);
										// 하이라이트 처리 후 맵토글ID 세팅
										$totSurvMap.ui.mapToggleId = highLightAmdCd;
										if($totSurvMap.ui.tileTempColor!=""){
											$("rect[value='"+$totSurvMap.ui.mapToggleId+"']").attr("fill", $totSurvMap.ui.tileTempColor); 
										}
										$totSurvMap.ui.tileTempColor = $("rect[value='"+adm_cd+"']").attr("fill");
							    		$("rect[value='"+adm_cd+"']").attr("fill", "#0086c6"); // 2020-11-02 [곽제욱] 타일차트 색변경 추가
							    		// 2020-11-02 [곽제욱] 타일차트 색변경 추가 END
									}
									// 2020-11-19 [곽제욱] 맵 그리기 완료 + 1초후 loading바 닫기 START
									setTimeout(function(){
										//$totSurvMain.ui.loading(false); 									
									}, 500) // 2020-11-23 [곽제욱] 맵 그리기 완료 1초에서 0.5초로 수정
									// 2020-11-19 [곽제욱] 맵 그리기 완료 + 1초후 loading바 닫기 END
								});
							});
							
							
							
						}
						else{
							$totSurvMap.ui.isAtdrc = false;
							$totSurvMap.ui.setTotSurvData($totSurvMap.ui.map, "sgg", "color", lv_sido_cd, lv_sgg_cd, "", lv_surv_id, function(p_list) {
								//리스트에서 unit 가져오기
								var lv_unit = "개";
								var lv_unit_nm = "수";
								if(p_list != null && p_list.length > 0) {
									if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
									if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
								}
								
								//데이터 넣기
								$totSurvMap.ui.map.setStatsData("normal", {"pAdmCd": lv_sido_cd, "result" : p_list}, "dt", lv_unit);
								
								//경계 그리기
								var lv_region = "sgg"; //비자치구 여부 체크

								// 시군구레벨인 경우
								$totSurvMap.ui.setTotSurvRegion($totSurvMap.ui.map, lv_region, $totSurvMap.ui.getTotSurvRegionYear(), lv_sido_cd, "", "", function() {
									//2020-12-01 [곽제욱] pathChange 로직 변경 START
									// $totSurvMain.ui.pathChange(lv_region, lv_sido_cd);
									
									/** 2021.06.01[한광희] 지자체 연계 URL 시군구 셋팅 수정 START */
									lv_sgg = $("#dash_sgg");
									lv_sgg_cd = $("#dash_sgg").val();
									lv_sgg_nm = $("#dash_sgg option:selected").text();
									/** 2021.06.01[한광희] 지자체 연계 URL 시군구 셋팅 수정 END */
									
									var tempRegionCd = lv_sido_cd;
									if(lv_sgg_cd != "999" && lv_sgg_cd != "" && lv_sgg_cd != null){
										tempRegionCd += lv_sgg_cd;
										if(tempRegionCd.substring(4,5)=="0"){
											lv_region = "atdrc";											
										} else {
											lv_region = "emdong";
										}
									}
									$totSurvMain.ui.pathChange(lv_region, tempRegionCd);
									
									//2020-12-01 [곽제욱] pathChange 로직 변경 END
									if($totSurvMain.ui.selectedThema == "인구"){
										$totSurvMain.ui.selectedLevel = 2;
									}
									if($totSurvMap.ui.mapToggleId != "" && $totSurvMap.ui.mapToggleId != null){
										// 랭크이동시 mapToggleId를 초기화하고 하이라이트 처리
										var highLightAmdCd = $totSurvMap.ui.mapToggleId;
										// 맵토글ID 초기화
										$totSurvMap.ui.mapToggleId = "";
										$totSurvMap.ui.map.setPolyLayerHighlight(highLightAmdCd);
										// 하이라이트 처리 후 맵토글ID 세팅
										$totSurvMap.ui.mapToggleId = highLightAmdCd;
										// 2020-11-02 [곽제욱] 타일차트 색변경 추가 START
										if($totSurvMap.ui.tileTempColor!=""){
											$("rect[value='"+$totSurvMap.ui.mapToggleId+"']").attr("fill", $totSurvMap.ui.tileTempColor); 
										}
										$totSurvMap.ui.tileTempColor = $("rect[value='"+adm_cd+"']").attr("fill");
							    		$("rect[value='"+adm_cd+"']").attr("fill", "#0086c6"); // 2020-11-02 [곽제욱] 타일차트 색변경 추가
							    		// 2020-11-02 [곽제욱] 타일차트 색변경 추가 END
									}
									// 2020-11-19 [곽제욱] 맵 그리기 완료 + 1초후 loading바 닫기 START
									setTimeout(function(){
										//$totSurvMain.ui.loading(false); 									
									}, 500) // 2020-11-23 [곽제욱] 맵 그리기 완료 1초에서 0.5초로 수정
									// 2020-11-19 [곽제욱] 맵 그리기 완료 + 1초후 loading바 닫기 END
								});
							});
							
						}
					}
					//색상/버블 (읍면동)
					else if(p_map_region == "emdong") {
						
						console.log("================  emdong  =================");
						
					}
					
					var zoomlevel = $totSurvMap.ui.map.zoom;
					var coord_x;
					var coord_y;
					
					
					var adm_cd = $totSurvMain.ui.selectedArea;
					console.log("[totSurvMap] ###  adm_cd = " + adm_cd);
					
					/** 시도별 zoom 설정 */
					switch (adm_cd.length) {
			            case 2:
			            	if($totSurvMain.ui.selectedLevel == "1" || $totSurvMain.ui.selectedLevel == "0") {
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
			            	} else if($totSurvMain.ui.selectedLevel == "2"){
				            	coord_x = $("#dash_sgg option:selected").data("coor-x");
					            coord_y = $("#dash_sgg option:selected").data("coor-y");
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
			 * 		p_callback : 콜백 함수
			 */
			setTotSurvData : function(p_map, p_region, p_type, p_sido_cd, p_sgg_cd, p_emdong_cd, p_surv_id, p_callback) {
				switch(p_surv_id){
				case "FS0614": 
					p_surv_id="DT_1FS20103";
					break;
				case "FS0112": 
					p_surv_id="DT_1FS15103";
					break;
				case "FS0171":
					p_surv_id="DT_1FI15103";
					break;
				case "FS0413":
					p_surv_id="DT_1FS103";
					break;
				case "FS0469":
					p_surv_id="DT_1FI103";
					break;
				case "FS0621":
					p_surv_id="DT_1FI20103";
					break;
				default:
					break;
				}
				
				//변수 선언
				var lv_tot_surv_id = p_surv_id;
				//adm_cd
				var lv_adm_cd = '';
				if(p_sido_cd == undefined || p_sido_cd == null || p_sido_cd == "" || p_sido_cd == "00"){
					 lv_adm_cd = "up:00";
				} else if(p_sido_cd != undefined || p_sido_cd != null || p_sido_cd != "" || p_sido_cd != "00"){
					lv_adm_cd="up:"+p_sido_cd;
				} else if(p_sgg_cd != undefined || p_sgg_cd != null || p_sgg_cd != "" || p_sgg_cd != "00"){
					lv_adm_cd="up:"+p_sgg_cd;
				}
				var lv_params = {};
				lv_params.surv_id = p_surv_id;
				lv_params.surv_year =  $totSurvMain.ui.selectedYear;
				lv_params.itm_cd = $totSurvMap.ui.selectedItmCd;
				// 비자치구 여부 
				lv_params.isAtdrc = $totSurvMap.ui.isAtdrc;
				var p_c1 = $totSurvMap.ui.selectedC1;
				var p_c2 = $totSurvMap.ui.selectedC2; 
				var l2=""; var l3="",level='000';
				if(p_type != undefined && p_type != null && p_type != "") lv_params.map_ty = p_type;
				//p_region : poi는 기본적으로 all이지만 열지도는 all이 아니므로 all일때는 그냥 파라미터 제외함.
				if(p_region != undefined && p_region != null && p_region != "" && p_region != "all") lv_params.area_bndry_se = p_region;
				if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "") lv_params.sido_cd = p_sido_cd;
				if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "") lv_params.sgg_cd = p_sgg_cd;
				if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") lv_params.emdong_cd = p_emdong_cd;
				if(p_c1 != undefined && p_c1 != null && p_c1 != "") lv_params.c1 = p_c1;
				if(p_c2 != undefined && p_c2 != null && p_c2 != "") lv_params.c2 = p_c2;
				if(p_c1 != undefined && p_c1 != null && p_c1 != "") {
					lv_params.c1 = l2 =  p_c1;
				}
				if(p_c2 != undefined && p_c2 != null && p_c2 != ""){
					lv_params.c2 = l3 = p_c2;
				} 
				if($totSurvMain.ui.selectedArea.length == 2){ 
					level = 'sido'
				} else if($totSurvMain.ui.selectedArea.length == 5 && $totSurvMap.ui.isAtdrc){
					level = 'atdrc'// atdrc
				} else {
					level ='sgg'
				}

				if(p_surv_id == 'DT_1FS20103'){l2="000"; l3="";}
				var api_params = {
						surv_year_list: $totSurvMain.ui.selectedYear							// 수록시점
							, org_id_list: "101"							// 조직번호
								, tbl_id_list: p_surv_id			// 통계표 ID
								, list_var_ord_list: "" 						// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
								, odr_col_list : "CHAR_ITM_SN"
								, prt_type: "part"								    // 출력방식 total:합계
								, char_itm_id_list: lv_params.itm_cd						// 표특성항목
								, adm_cd: ""								// 지역코드
								, adm_unit: "sido"								// 지역단위
								, ov_l1_list: lv_adm_cd								// 항목 1
								, ov_l2_list: "000"								// 항목 2
								, ov_l3_list: ""								// 항목 3
								, ov_l4_list: ""								// 항목 4
								, ov_l5_list: ""								// 항목 5
								, category: ""									// 카테고리 sido, sgg
								, orderby: ""
					}
				
				$.ajax({
					method: "GET",
					async: false,	// 반드시 동기처리 해야 함
					url: sgis4thApiPath, 
					data: api_params, 
					dataType: "json",
				    //type: 'post',
				    data: api_params
				}).always(function(res) { // 전 처리
					if($("#"+p_map.id+"_loading").length) {
						$("#"+p_map.id+"_loading").hide();
					}
				}).done(function (res) { // 완료
					// 2020-11-18 [곽제욱] 비율계산을 위한 맵데이터값 계산로직 START
					var rdata = [];
					res.map(function(value){
						if(value.OV_L1_ID!='00'&&value.OV_L1_ID!='01'&&value.OV_L1_ID!='02'&&value.OV_L1_ID!='03'&&value.OV_L1_ID!='04'
						&&value.OV_L1_ID!='05'){
							rdata.push({adm_cd:value.OV_L1_ID, dt:Number(value.DTVAL_CO), itm_nm:value.CHAR_ITM_NM, region_nm: value.OV_L1_KOR,surv_id:lv_params.surv_id});
							/*if(p_surv_id == 'DT_1AG15103' || p_surv_id == 'DT_1AG104'){
								if(value.CHAR_ITM_NM=='농가')
									rdata.push({adm_cd:value.OV_L1_ID, dt:Number(value.DTVAL_CO), itm_nm:value.CHAR_ITM_NM, region_nm: value.OV_L1_KOR,surv_id:lv_params.surv_id});
							}else{
								if($totSurvMain.ui.selectedNm&&$totSurvMain.ui.selectedNm==value.CHAR_ITM_NM){
									rdata.push({adm_cd:value.OV_L1_ID, dt:Number(value.DTVAL_CO), itm_nm:value.CHAR_ITM_NM, region_nm: value.OV_L1_KOR,surv_id:lv_params.surv_id});
								}
							}*/
							//*********** 어업 차트 3번 주된 어로어업 방법별 어가인 경우 차트 작업 더 해줘야 하는데... 못했음 ***********//
						}
					});
					let rdataObj = {};
					rdata.forEach((d)=>{
						if(rdataObj[d.region_nm]){
							rdataObj[d.region_nm].dt += d.dt;
						}else{
							rdataObj[d.region_nm] = d;
						}
					});
					rdata = [];
					Object.keys(rdataObj).forEach(r=>{rdata.push(rdataObj[r]);});
					
					var totalArray = rdata;
					$totSurvMap.ui.mapTotalVal = 0;
					if(res[0].OV_L1_ID == "00") {
						$totSurvMap.ui.mapTotalVal = parseFloat(res[0].DTVAL_CO);
					} else {
						for(var i=0; i<res.length; i++) {
							if(res[i].OV_L1_KOR != "읍부" && res[i].OV_L1_KOR != "동부" && res[i].OV_L1_KOR != "면부") {
								if($totSurvMain.ui.selectedArea.length == 2) {
									$totSurvMap.ui.checkIsAtdrc(res[i].OV_L1_ID);
									if(!$totSurvMap.ui.isAtdrc){
										$totSurvMap.ui.mapTotalVal += parseFloat(res[i].DTVAL_CO);
									}
								} else if($totSurvMain.ui.selectedArea.length == 5) {
									if($totSurvMain.ui.selectedArea.substring(0,4) == res[i].OV_L1_ID.substring(0,4)) {
										if(res[i].OV_L1_ID.substring(4,5) != "0") {
											$totSurvMap.ui.checkIsAtdrc(res[i].OV_L1_ID);
											if(!$totSurvMap.ui.isAtdrc){
												$totSurvMap.ui.mapTotalVal += parseFloat(res[i].DTVAL_CO);
											}
										}
									} 
								}
							}
						}
					}
					// 2020-11-18 [곽제욱] 비율계산을 위한 맵데이터값 계산로직 START
					//정보 저장
					$totSurvMap.ui.mapStatsData[lv_tot_surv_id+"_"+p_type+"_"+p_region+"_"+lv_adm_cd] = rdata;
					
					//콜백함수 호출
			    	if(typeof p_callback === "function") {
						p_callback(rdata);
					}
				}).fail(function (res) { // 실패
					//$totSurvMain.ui.alert(errorMessage);
				});
				
				/*//파라미터
				var lv_params = {};
				lv_params.surv_id = p_surv_id;
				lv_params.surv_year = (p_surv_id=="PH0298") ? $totSurvMain.ui.timeTotPopulationYear : $totSurvMain.ui.selectedYear;
				lv_params.itm_cd = $totSurvMap.ui.selectedItmCd;
				// 비자치구 여부 
				lv_params.isAtdrc = $totSurvMap.ui.isAtdrc;
				
				var p_c1 = $totSurvMap.ui.selectedC1;
				var p_c2 = $totSurvMap.ui.selectedC2; 
				
				if(p_type != undefined && p_type != null && p_type != "") lv_params.map_ty = p_type;
				//p_region : poi는 기본적으로 all이지만 열지도는 all이 아니므로 all일때는 그냥 파라미터 제외함.
				if(p_region != undefined && p_region != null && p_region != "" && p_region != "all") lv_params.area_bndry_se = p_region;
				if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "") lv_params.sido_cd = p_sido_cd;
				if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "") lv_params.sgg_cd = p_sgg_cd;
				if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") lv_params.emdong_cd = p_emdong_cd;
				if(p_c1 != undefined && p_c1 != null && p_c1 != "") lv_params.c1 = p_c1;
				if(p_c2 != undefined && p_c2 != null && p_c2 != "") lv_params.c2 = p_c2;
				//원 테이블로 조회
				var lv_url = contextPath+"/ServiceAPI/totSurv/common/getTotSurvData.json";
				// ajax 시작
				$.ajax({
					url: lv_url,
				    type: 'post',
				    data: lv_params
				}).always(function(res) { // 전 처리
					if($("#"+p_map.id+"_loading").length) {
						$("#"+p_map.id+"_loading").hide();
					}
				}).done(function (res) { // 완료
					// 2020-11-18 [곽제욱] 비율계산을 위한 맵데이터값 계산로직 START
					$totSurvMap.ui.mapTotalVal = 0;
					var totalArray = res.result.mapData;
					for(var i=0; i<totalArray.length; i++){
						if(totalArray[i].adm_cd != "00"){
							$totSurvMap.ui.mapTotalVal += parseFloat(totalArray[i].dt);
						}
					}
					// 2020-11-18 [곽제욱] 비율계산을 위한 맵데이터값 계산로직 START
					//정보 저장
					$totSurvMap.ui.mapStatsData[lv_tot_surv_id+"_"+p_type+"_"+p_region+"_"+lv_adm_cd] = res.result.mapData;
					
					//콜백함수 호출
			    	if(typeof p_callback === "function") {
						p_callback(res.result.mapData);
					}
				}).fail(function (res) { // 실패
					//$totSurvMain.ui.alert(errorMessage);
				});*/
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
					p_base_year = $totSurvMain.ui.selectedYear;
				}
				
				//시도의 경우 js파일을 사용하기 떄문에 년도를 넣어야함
				if(p_region == "sido"  || p_region == "sgg") {
					//년도 입력 안들어온경우 common.js bndYear 사용
					if(p_base_year == undefined || p_base_year == null || p_base_year == "") {
						p_base_year = $totSurvMain.ui.selectedYear;
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
						$totSurvMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd] = p_res;
						
						//로딩바 숨김
						if($totSurvMain.ui.currentPageName == "totSurvMap" && p_map.id == "totSurvMapMap") {
							//$totSurvMain.ui.loading(false);
						}
						if($("#"+p_map.id+"_loading").length) {
							$("#"+p_map.id+"_loading").hide();
						}
						
						var xcoor = 989674 ;
						var ycoor = 1818313;
						var zoomLevel;
						//20201102 박은식 줌아웃 시 상위지역 코드가 전국 일 경우 줌 level 을 1로 변경 START
						if($totSurvMain.ui.selectedArea == "00"){
							zoomLevel = 1;
						} else {
							zoomLevel = $totSurvMap.ui.map.zoom;
						}
						
		                if($totSurvMain.ui.selectedLevel == "0"){
		                	xcoor = 1014426;
		            		ycoor = 1754429;
		                }
						//20201102 박은식 줌아웃 시 상위지역 코드가 전국 일 경우 줌 level 을 1로 변경 END
						p_map.mapMove([xcoor, ycoor], zoomLevel, true);
						
						//콜백함수 호출
				    	if(typeof p_callback === "function") {
							p_callback();
						}
				    	//$totSurvMain.ui.loading(false); // 2020-10-14 [곽제욱] 맵 그리기 완료후 loading바 닫기 // 2020-11-19 [곽제욱] 주석처리
					});
				}
				//시도 이외의 경계 데이터 조회
				else {
					var params = {};
					params.region = p_region;
					
					// 시군구 경계 (비자치구)
					if(p_region == "sgg"){
						params.region = "atdrc";
						$totSurvMap.ui.isAtdrc = false;
					}	
					
					params.base_year = $totSurvMain.ui.selectedYear;
					
					if(p_sido_cd.length==5){
						if($totSurvMap.ui.mapToggleId != null && $totSurvMap.ui.mapToggleId != ""){
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
					    data: {year:$totSurvMain.ui.selectedYear, region_cd:tempAdmCd},
						dataType: "json",
					}).done(function (res) { // 완료
						if(res.errCd == "0") {
							console.log("################# res = " + res.result.rslt);
							$totSurvMap.ui.isAtdrc = res.result.rslt;
						}
					});
					

					// 비자치구 일경우 
					if($totSurvMap.ui.isAtdrc == true){
						params.region = "sgg";
						// 타일맵에서 클릭시 sgg_cd 값이 없음  
						// $totSurvMain.ui.selectedArea 클릭시 설정한 정보에서 전달 
						if($totSurvMap.ui.mapToggleId != null && $totSurvMap.ui.mapToggleId != ""){
							params.sido_cd = ($totSurvMain.ui.selectedArea).substring(0,2);
							params.sgg_cd  = ($totSurvMain.ui.selectedArea).substring(2,4)+"0";
						} else {
							params.sido_cd = ($totSurvMain.ui.selectedArea).substring(0,2);
							params.sgg_cd  = ($totSurvMain.ui.selectedArea).substring(2,5);
						}
						//params.sido_cd = ($totSurvMain.ui.selectedArea).substring(0,2);
						//params.sgg_cd  = ($totSurvMain.ui.selectedArea).substring(2,5);
						console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
						console.log(" params.region  = " + params.region);
						console.log(" params.sido_cd = " + params.sido_cd);
						console.log(" params.sgg_cd  = " + params.sgg_cd);
						console.log(" 비자치구 여부 체크 isAtdrc = " + $totSurvMap.ui.isAtdrc);
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
							$totSurvMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+p_sido_cd+p_sgg_cd] = res;
							//경계그리기
							p_map.setPolygonDataGeojson(res);
							var xcoor = 0;
							var ycoor = 0;
							var zoomLevel = $totSurvMap.ui.map.zoom;
							var sggZoom = 2;
							var adm_cd = p_sido_cd
							//20201103 박은식 인구를 제외한 대시보드 지역 zoom level 재설정 START
							if($totSurvMain.ui.selectedThema == "인구"){
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
									sggZoom = 1;
								}	
							} else {
								if(adm_cd == '11' || adm_cd == '21' ||
										adm_cd == '24' || adm_cd == '25' || adm_cd == '29'){
									// 서울(11), 부산(21), 광주(24), 대전(25), 세종(29)
									sggZoom = 5;
								} else if(adm_cd == '39' || adm_cd == '22' || adm_cd == '26') {
									// 제주(39), 대구(22), 울산(26)
									sggZoom = 4;
								} else if(adm_cd == '31' || adm_cd == '33' ||
										adm_cd == '34' || adm_cd == '35' || adm_cd == '36' || adm_cd == '38' || adm_cd == '23') {
									// 경기(31),  충북(33), 충남(34), 전북(35), 전남(36), 경남(38), 인천(23)
									sggZoom = 3;
								} else if(adm_cd == '32' || adm_cd == '37') {
									// 강원(32), 경북(37)
									sggZoom = 2;
								} else {
									sggZoom = 1;
								}	
							}
							//20201103 박은식 인구를 제외한 대시보드 지역 zoom level 재설정 END
							// 경기(31) => level 3으로

							$totSurvMain.ui.getSidoSggPos(p_sido_cd+p_sgg_cd);
							
							// p_region 이 시군구 이면 sido 의 center 좌표 가져오기
							if(p_region == "sgg"){
								xcoor = $("#dash_sido option:selected").attr("data-coor-x");
								ycoor = $("#dash_sido option:selected").attr("data-coor-y");
								
								//지도 조회						
								
								zoomLevel = $totSurvMap.ui.map.zoom;
								//if(zoomLevel < sggZoom){
									zoomLevel = sggZoom;
								//}
								//zoomLevel = 4;
								if($totSurvMap.ui.isAtdrc==true){
									xcoor = $("#dash_sgg option:selected").attr("data-coor-x");
									ycoor = $("#dash_sgg option:selected").attr("data-coor-y");
									zoomLevel = 6;
								}
							} else {
								xcoor = $("#dash_sgg option:selected").attr("data-coor-x");
								ycoor = $("#dash_sgg option:selected").attr("data-coor-y");
								//zoomLevel = $totSurvMap.ui.map.zoom;
								zoomLevel = 6
							}
							$totSurvMap.ui.checkIsAtdrc(p_sido_cd+p_sgg_cd.substring(0,2)+"0")
							// 시군구에서 슬라이드 이동(랭킹이동)시 x좌표 y좌표를 선택한 곳으로 세팅
							if($totSurvMap.ui.mapToggleId != "" && $totSurvMap.ui.mapToggleId.length == 5 && !$totSurvMap.ui.isAtdrc){
								var tempAdmCd = $totSurvMap.ui.mapToggleId;
								$totSurvMain.ui.getSidoSggPos(tempAdmCd);
								$("#dash_sido").val(tempAdmCd.substring(0,2));
								xcoor = $("#dash_sgg option:selected").attr("data-coor-x");
								ycoor = $("#dash_sgg option:selected").attr("data-coor-y");
							} else if($totSurvMap.ui.mapToggleId != "" && $totSurvMap.ui.mapToggleId.length == 5 && $totSurvMap.ui.isAtdrc){
								var tempAdmCd = $totSurvMap.ui.mapToggleId.substring(0,4)+"0";
								$totSurvMain.ui.getSidoSggPos(tempAdmCd);
								$("#dash_sido").val(tempAdmCd.substring(0,2));
								xcoor = $("#dash_sgg option:selected").attr("data-coor-x");
								ycoor = $("#dash_sgg option:selected").attr("data-coor-y");
							}
							//20201015 박은식 줌레벨 변경 조건 추가 START
							if($totSurvMap.ui.isAtdrc == true){
								zoomLevel = zoomLevel + $totSurvMain.ui.zoomResize();
							} else{
								if (adm_cd == $totSurvMain.ui.selectedArea){
									zoomLevel = zoomLevel + $totSurvMain.ui.zoomResize();
								}
							}
							$totSurvMap.ui.prevZoom = zoomLevel;
							//20201015 박은식 줌레벨 변경 조건 추가 END
							
							// 2020-11-23 [곽제욱] 각 시도별 x, y 좌표 default 로 잡기 START
							if($totSurvMain.ui.selectedArea == "29"){
			                	xcoor = 977914;
			            		ycoor = 1841405;
			                } else if($totSurvMain.ui.selectedArea == "31"){
			                	xcoor = 965914;
			            		ycoor = 1953341;
			                } else if($totSurvMain.ui.selectedArea == "33"){
			                	xcoor = 1032218;
			            		ycoor = 1850173;
			                } else if($totSurvMain.ui.selectedArea == "34"){
			                	xcoor = 941850;
			            		ycoor = 1837117;
			                } else if($totSurvMain.ui.selectedArea == "38"){
			                	xcoor = 1077530;
			            		ycoor = 1699901;
			                }
			                // 2020-11-23 [곽제욱] 각 시도별 x, y 좌표 default 로 잡기 END
			                
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
				    	//$totSurvMain.ui.loading(false); // 2020-10-14 [곽제욱] 맵 그리기 완료후 loading바 닫기 // 2020-11-19 [곽제욱] 주석처리
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
				if($totSurvMap.ui.mapData == null) {
					return $totSurvMain.ui.selectedYear; // 2020-12-02 [곽제욱] 맵 조회 년도 selectedYear 로 변경
				}
				var lv_data = $totSurvMap.ui.mapData.data;
				var lv_year = $totSurvMain.ui.selectedYear; // 2020-12-02 [곽제욱] 맵 조회 년도 selectedYear 로 변경
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
				$totSurvMain.ui.log("$totSurvMap.ui.openApiBoundarySido - begin");
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
						  
						  $totSurvMap.ui.map = $totSurvMap.ui.mapList[$totSurvMap.ui.curMapId];
						  
						  $totSurvMap.ui.map.mapMove([989674, 1818313], 2);
						  
						  $totSurvMap.ui.lastGeojsonInfo = tmpOption ;
						  $totSurvMap.ui.setPolygonDataGeojson(res);
						  
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
				$totSurvMain.ui.log("$totSurvMap.ui.setPolygonDataGeojson - begin");
				
				var that = $totSurvMap.ui;
				
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
				$totSurvMain.ui.log("$totSurvMap.ui.combineTotSurvData - begin");
				
				this.data = $totSurvMap.ui.MapData;
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
			 * @name           : getCenterToAdmCd
			 * @description    : 지도의 중심점으로 집계구값 얻기
			 * @date           : 2019.08.22
			 * @author	       : 김남민
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
					center = $totSurvMap.ui.map.gMap.getCenter();
					x = center.x;
					y = center.y;
				}
				
				/** 2020.11.12[한광희] 토큰 여부 체크 후 재생성 추가 START */
				if(accessToken == "none" || accessToken == undefined || accessToken == "" || accessToken == null){
					accessTokenInfo();
				}
				/** 2020.11.12[한광희] 토큰 여부 체크 후 재생성 추가 END */
				
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
						target : $totSurvMap.ui
					}
				});
			},
			
			// 비자치구
			//========== 2017.05.29 [개발팀] 지자체 URL 추가 START ===============//
			atdrcList : {
			    "31" : [{
			    	sgg_nm : "수원시",
			    	sgg_list : ["011","012","013","014"],
			    	adm_cd : "31010",
			    	x_coor : "956359.375",
			    	y_coor : "1920275.125"
			    },{
			    	sgg_nm : "성남시",
			    	sgg_list : ["021","022","023"],
			    	adm_cd : "31020",
		    		x_coor : "966039.3125",
		    		y_coor : "1934316.875"
			    	
			    },{
			    	sgg_nm : "안양시",
			    	sgg_list : ["041","042"],
			    	adm_cd : "31040",
		    		x_coor : "949364.4375",
		    		y_coor : "1933882.5"
			    	
			    },{
			    	sgg_nm : "안산시",
			    	sgg_list : ["091","092"],
			    	adm_cd : "31090",
			    	x_coor : "933248.0625",
			    	y_coor : "1921582.875"
			    	
			    },{
			    	sgg_nm : "고양시",
			    	sgg_list : ["101","103","104"],
			    	adm_cd : "31100",
			    	x_coor : "941518.9375",
			    	y_coor : "1963035.75"
			    	
			    },{
			    	sgg_nm : "용인시",
			    	sgg_list : ["191","192","193"],
			    	adm_cd : "31190",
			    	x_coor : "975315.75",
			    	y_coor : "1913666.375"
			    	
			    }],
			    "33" : [{
			    	sgg_nm : "청주시",
			    	sgg_list : ["041","042","043","044"],
			    	adm_cd : "33040",
			    	x_coor : "999888.5625",
			    	y_coor : "1847713.125"
			    	
			    }],
			    "34" : [{
			    	sgg_nm : "천안시",
			    	sgg_list : ["011","012"],
			    	adm_cd : "34010",
			    	x_coor : "973464.0625",
			    	y_coor : "1867364.375"
			    	
			    }],
			    "35" : [{
			    	sgg_nm : "전주시",
			    	sgg_list : ["011","012"],
			    	adm_cd : "35010",
			    	x_coor : "965298.4375",
			    	y_coor : "1759150.375"
			    	
			    }],
			    "37" : [{
			    	sgg_nm : "포항시",
			    	sgg_list : ["011","012"],
			    	adm_cd : "37010",
			    	x_coor : "1162554.625",
			    	y_coor : "1789932.875"
			    	
			    }],
			    "38" : [{
			    	sgg_nm : "창원시",
			    	sgg_list : ["111","112","113","114","115"],
			    	adm_cd : "38110",
			    	x_coor : "1100137",
			    	y_coor : "1690127.875"
			    	
			    }]
			},
			//========== 2017.05.29 [개발팀] 지자체 URL 추가 END ===============//
			/**
			 * checkIsAtdrc
			 * 비자치구 여부 체크 
			 * admCd
			 */
			checkIsAtdrc : function(admCd){
				$totSurvMap.ui.isAtdrc = false;
				// 비자치구 여부 체크
				if(admCd != undefined && admCd.length == 5){
					var tmpSido = admCd.substring(0,2);
					
					
					// ajax 시작
					$.ajax({
						method: "POST",
						async: false,	// 반드시 동기처리 해야 함
						url: contextPath + "/ServiceAPI/totSurv/common/getAtdrcCheck.json",
					    data: {year:$totSurvMain.ui.selectedYear, region_cd:admCd},
						dataType: "json",
					}).done(function (res) { // 완료
						if(res.errCd == "0") {
							console.log("################# res = " + res.result.rslt);
							$totSurvMap.ui.isAtdrc = res.result.rslt;
						}
					});
					
				}
				else{
					$totSurvMap.ui.isAtdrc = false;
				}
			}
	};
	
	// ==============================//
	// map event callback
	// ==============================//
	$totSurvMap.callbackFunc = {

			// 맵이동 시작시, 콜백 호출
			didMapMoveStart : function(event, map) {
				console.log("[totSurvMap.js] didMapMoveStart 호출");
			},

			// 맵이동 종료시, 콜백 호출
			didMapMoveEnd : function(event, map) {
				
				console.log("[totSurvMap.js] didMapMoveEnd 호출");
				console.log("[totSurvMap.js] didMapMoveEnd() $totSurvMap.ui.dropBtnInfo[map.id] [" + $totSurvMap.ui.dropBtnInfo[map.id]);
										
			},
			
			// 맵 줌시작 시, 콜백 호출
			didMapZoomStart : function(event, map) {
			},

			// 맵 줌 종료 시, 콜백 호출
			didMapZoomEnd : function(event, map) {
				console.log(">>>> didMapZoomEnd <<<");

				var lv_zoom = $totSurvMap.ui.map.zoom;
				console.log("lv_zoom = " + lv_zoom);
				var prevZoom = $totSurvMap.ui.prevZoom;
				// 줌레벨이 같을경우 경계 재조회 막음(드래그 이동시 이벤트 X)
				if(prevZoom != lv_zoom){
					
					// 개방형 지도가 아닐경우에만  getCenterToAdmCd 안타도록 개선
					if($(".mapInfo").css('display') == "none" || $(".mapInfo").css('display') == undefined){ // 2020-10-13 [곽제욱] 개방형지도 로직 변경으로 인한 조건문 처리
						var center = $totSurvMap.ui.map.gMap.getCenter();
						$totSurvMap.ui.getCenterToAdmCd(center, function(res) {
							
							$totSurvMain.ui.tileChangeYn = "Y";
							var lv_from_sido_cd = $("#dash_sido").val();
							var lv_from_sgg_cd = $("#dash_sgg").val();
							var lv_from_emdong_cd = $("#dash_emdong").val();
							var lv_to_sido_cd = "";
							var lv_to_sgg_cd = "";
							var lv_to_emdong_cd = "";
							
							// center이 없을경우 맵 그리기 취소
							if(res.result == undefined) {
								/*
								$("#dash_sido").val("99");
								$("#dash_sgg").val("999");
								$totSurvMain.ui.pathChange("nationwide", "00");
								$totSurvMap.ui.map.zoom = "1";
								
								$totSurvMain.ui.selectedArea = "00";
								var selectedThema = $totSurvMain.ui.selectedThema;
								// 각 주제별 차트 변화함수 호출
								if(selectedThema == "인구"){
									$populationDash.event.allChange("00", "1");
									//20201008 박은식 줌아웃, path 초기화 시 해당 rank 지역정보를 전국으로 변경 START
									$("#genderRanking").html("전국의 남녀 성비");
									$("#foreignRanking").html("전국의 외국인 수");
									//20201008 박은식 줌아웃, path 초기화 시 해당 rank 지역정보를 전국으로 변경 END
								}
								else if(selectedThema == "가구"){
									$houseHoldDash.event.allChange("00", "1");
								} 
								else if(selectedThema == "주택"){
									$houseDash.event.allChange("00", "1");
								}
								return;
								*/
								//lv_to_sido_cd = $("#dash_sido").val();
								//lv_to_sgg_cd = $("#dash_sgg").val()
								//lv_to_emdong_cd = $("#dash_emdong").val()
								return;
							}  else {
								lv_to_sido_cd = res.result.sido_cd;
								lv_to_sgg_cd = res.result.sgg_cd;
								lv_to_emdong_cd = res.result.emdong_cd;
							}

							var lv_sido_change_yn = "N";
							var lv_sgg_change_yn = "N";
							var lv_emdong_change_yn = "N";
							var lv_atdrc_change_yn = "N"; // 2020-11-11 [곽제욱] 비자치구 경계 체크로직 추가
							if(lv_from_sido_cd != lv_to_sido_cd) lv_sido_change_yn = "Y";
							if(lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd != lv_to_sgg_cd) lv_sgg_change_yn = "Y";
							if(lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd.substring(0,2) != lv_to_sgg_cd.substring(0,2)) lv_atdrc_change_yn = "Y"; // 2020-11-11 [곽제욱] 비자치구 경계 체크로직 추가
							if(lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd != lv_to_sgg_cd || lv_from_emdong_cd != lv_to_emdong_cd) lv_emdong_change_yn = "Y";

							if(lv_sido_change_yn == "Y" || lv_sgg_change_yn == "Y" || lv_emdong_change_yn == "Y") {
								//접속지역 변경
								//2020-02-13 [김남민] 관심지역 행정구역이 사라지는 현상이 있습니다.
								$totSurvMain.ui.getAreaSido(res.result.sido_cd);
								$totSurvMain.ui.getAreaSgg(res.result.sido_cd, res.result.sgg_cd);
							}
							var adm_cd = lv_to_sido_cd;
							var sggZoom;
							var zoomLevel; // 2020-10-13 [곽제욱] zoomlevel 추가
							/** 시도별 zoom 설정 */
							switch (adm_cd.length) {
								case 2:
									//20210222 박은식 총조사인구 차트선택 이후 맵 조작 시 초기화 START
									if($totSurvMap.ui.selectedObj != undefined && 
							    	   $totSurvMap.ui.selectedObj != null &&
							    	   $totSurvMap.ui.selectedObj != "" &&
							    	   $totSurvMap.ui.selectedObj.attr("id") == "totalPopulation") {
							    		for(var i=0; i < $(".yearBtn").length; i++){
										    if($(".yearBtn").eq(i).hasClass("on")){
										    	$totSurvMain.ui.selectedYear = $(".yearBtn").eq(i).text();
										    }
										}
							    	}
							    	//20210222 박은식 총조사인구 차트선택 이후 맵 조작 시 초기화 END
									//20201103 박은식 인구를 제외한 대시보드 지역 zoom level 재설정 START
									if($totSurvMain.ui.selectedThema == "인구"){
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
											sggZoom = 1;
										}	
									} else {
										if(adm_cd == '11' || adm_cd == '21' ||
												adm_cd == '24' || adm_cd == '25' || adm_cd == '29'){
											// 서울(11), 부산(21), 광주(24), 대전(25), 세종(29)
											sggZoom = 5;
										} else if(adm_cd == '39' || adm_cd == '22' || adm_cd == '26') {
											// 제주(39), 대구(22), 울산(26)
											sggZoom = 4;
										} else if(adm_cd == '31' || adm_cd == '33' ||
												adm_cd == '34' || adm_cd == '35' || adm_cd == '36' || adm_cd == '38' || adm_cd == '23') {
											// 경기(31),  충북(33), 충남(34), 전북(35), 전남(36), 경남(38), 인천(23)
											sggZoom = 3;
										} else if(adm_cd == '32' || adm_cd == '37') {
											// 강원(32), 경북(37)
											sggZoom = 2;
										} else {
											sggZoom = 1;
										}	
									}
									//20201103 박은식 인구를 제외한 대시보드 지역 zoom level 재설정 END
					               break;
					            default:
					            	zoomLevel = 1;
					               break;
					         }
							$totSurvMain.ui.chartSaveClear();//20201120 박은식 chart 선택 초기화(맵 줌인 줌아웃 시 차트가 유지되어 타일맵 색상이 비장상적으로 출력되는 문제 발생)
							//전국 
							if(lv_zoom < sggZoom) {
								//이미 같은 전국이면 조회 안함
								if($totSurvMap.ui.mapRegion != "sido") {
									$totSurvMain.ui.selectedLevel = "0";
									//전국 조회
									$("#dash_sido").val("99");
									$("#dash_sgg").val("999");
									$totSurvMain.ui.pathChange("nationwide", "00");
									
									$totSurvMain.ui.selectedArea = "00";
									var selectedThema = $totSurvMain.ui.selectedThema;
									// 각 주제별 차트 변화함수 호출
									$totSurvMain.ui.selectedLevel = "0";
									if(selectedThema == "인구"){
										$populationDash.event.allChange("00", "1");
										//20201008 박은식 줌아웃, path 초기화 시 해당 rank 지역정보를 전국으로 변경 START
										$("#genderRanking").html("전국의 남녀 성비");
										$("#foreignRanking").html("전국의 외국인 수");
										//20201008 박은식 줌아웃, path 초기화 시 해당 rank 지역정보를 전국으로 변경 END
									}
									else if(selectedThema == "가구"){
										$houseHoldDash.event.allChange("00", "1");
										/** 2020-10-21 [곽제욱] 가구 분기 추가 START */
										$("#houseHoldRatioRanking").html("전국의 가구수 증감");
										$("#oneHouseRanking").html("전국의 1인가구 수");
										/** 2020-10-21 [곽제욱] 가구 분기 추가 END */										
									}
									//20201020 박은식 주택 분기 추가 START
									else if(selectedThema == "주택"){
										$houseDash.event.allChange("00", "1");
										$("#houseRatioRanking").html("전국의 주택 증감율");
										$("#emptyRanking").html("전국의 빈집의 수");
									}
									//20201020 박은식 주택 분기 추가 END
									else if(selectedThema == "농업"){
										$farmDash.event.allChange("00", "1");
									}
									//20201022 박은식 임업, 어업 분기처리 추가 START
									else if(selectedThema == "임업"){
										$forestryDash.event.allChange("00", "1");
										$("#oldForestryRanking").html("전국의 임가 인구 중 고령인구");
										$("#forestryHouseRanking").html("전국의 임가(가구) 수");
									}
									else if(selectedThema == "어업"){
										$fisheryDash.event.allChange("00", "1");
										$("#oldFisheryRanking").html("전국의 어가 인구 중 고령인구");
										$("#fisheryHouseRanking").html("전국의 어가(가구) 수");
									}
									//20201022 박은식 임업, 어업 분기처리 추가 END
								}
								
							}
							// 경기도 -> 전국 이동
							else if(((lv_zoom == 2 && selectedThema == "인구")||(lv_zoom == 1 && selectedThema != "인구")) && $totSurvMain.ui.selectedArea == "00"){//20201103 박은식 줌레벨 기준 변경
								console.log("줌.... 시도 => 전국 = ");
								return;
							}
							else if(lv_zoom >= sggZoom && lv_zoom <= 8
							) {
								var adm_cd2 = lv_to_sido_cd+""+lv_to_sgg_cd;
								var emdongZoom = 6;
								/** 시도별 zoom 설정 */
								switch (adm_cd2.length) {
						            case 5:
						            	$totSurvMap.ui.checkIsAtdrc(adm_cd2.substring(0,4)+"0");
						            	if($totSurvMap.ui.isAtdrc==true){
						            		emdongZoom = 6;
						            	} else {
						            		emdongZoom = 6;
						            	}
						            	break;
						            default:
						            	//zoomLevel = 1;
						               break;
						         }
								if(lv_zoom >= emdongZoom){
									if(!($totSurvMap.ui.mapRegion == "sgg" && lv_sido_change_yn == "N" && !$totSurvMap.ui.isAtdrc)){
										if($totSurvMap.ui.mapRegion!="emdong" && lv_atdrc_change_yn == "Y"){ // 2020-11-11 [곽제욱] 비자치구 경계 체크로직 추가
											$("#dash_sido").val(lv_to_sido_cd);
											$("#dash_sgg").val(lv_to_sgg_cd.substring(0,2)+"0");
											//시군구 조회
											$totSurvMain.ui.selectedArea = lv_to_sido_cd + "" + lv_to_sgg_cd.substring(0,2)+"0";
											$totSurvMain.ui.pathChange("sgg", lv_to_sgg_cd.substring(0,2)+"0");
											$totSurvMap.ui.drawMapData("sgg", "color");
											$totSurvMap.ui.mapRegion = "sgg";
											  
											$totSurvMain.ui.selectedLevel = "2";
											if($totSurvMain.ui.selectedThema == "인구"){
												$populationDash.event.allChange($totSurvMain.ui.selectedArea, "2");
												$populationDash.ui.getRankSet("", "", $totSurvMain.ui.selectedArea);
											}
											else if($totSurvMain.ui.selectedThema == "가구"){
												$houseHoldDash.event.allChange($totSurvMain.ui.selectedArea, "2");
											}
								    		//20201019 박은식 주택 추가 START
											else if($totSurvMain.ui.selectedThema == "주택"){
												$houseDash.event.allChange($totSurvMain.ui.selectedArea, "2");
												$houseDash.ui.getRankSet("", "", $totSurvMain.ui.selectedArea);
											}
											else if($totSurvMain.ui.selectedThema == "농업"){
												$farmDash.event.allChange($totSurvMain.ui.selectedArea, "2");
												$farmDash.ui.getRankSet("", "", $totSurvMain.ui.selectedArea);
											}
											//20201019 박은식 주택 추가 END
											//20201022 박은식 임업, 어업 분기처리 추가 START
											else if($totSurvMain.ui.selectedThema == "임업"){
												$forestryDash.event.allChange($totSurvMain.ui.selectedArea, "2");
											}
											else if($totSurvMain.ui.selectedThema == "어업"){
												$fisheryDash.event.allChange($totSurvMain.ui.selectedArea, "2");
											}
											//20201022 박은식 임업, 어업 분기처리 추가 END
										}
									} 
								} else {
									//이미 같은 시군구이면 조회 안함
									if(!($totSurvMap.ui.mapRegion == "sgg" && lv_sido_change_yn == "N")) {
										$totSurvMain.ui.selectedLevel = "1";
										$("#dash_sido").val(lv_to_sido_cd);
										$totSurvMain.ui.pathChange("sgg", lv_to_sido_cd);
										
										$totSurvMain.ui.selectedArea = lv_to_sido_cd;
										var selectedThema = $totSurvMain.ui.selectedThema;
										// 각 주제별 차트 변화함수 호출
										$totSurvMain.ui.selectedLevel = "2";
										$totSurvMap.ui.mapToggleId = ""; // 2020-10-15 [곽제욱] 맵토글ID 초기화
										if(selectedThema == "인구"){
											$populationDash.event.allChange(lv_to_sido_cd, "1");
											$populationDash.ui.getRankSet("", "", lv_to_sido_cd);
										}
										else if(selectedThema == "가구"){
											$houseHoldDash.event.allChange(lv_to_sido_cd, "1");
											$houseHoldDash.ui.getRankSet("", "", lv_to_sido_cd); // 2020-10-22 [곽제욱] 가구 랭크set 추가
										}
										else if(selectedThema == "농업"){
											$farmDash.event.allChange(lv_to_sido_cd, "1");
											$farmDash.ui.getRankSet("", "", lv_to_sido_cd);
										}
										else if(selectedThema == "주택"){
											$houseDash.event.allChange(lv_to_sido_cd, "1");
											$houseDash.ui.getRankSet("", "", lv_to_sido_cd);//20201019 박은식 주택 rank 셋팅 추가
										}
										//20201022 박은식 임업, 어업 분기처리 추가 START
										else if(selectedThema == "임업"){
											$forestryDash.event.allChange(lv_to_sido_cd, "1");
											$forestryDash.ui.getRankSet("", "", lv_to_sido_cd);
										}
										else if(selectedThema == "어업"){
											$fisheryDash.event.allChange(lv_to_sido_cd, "1");
											$fisheryDash.ui.getRankSet("", "", lv_to_sido_cd);
										}
										//20201022 박은식 임업, 어업 분기처리 추가 END
									} else {
										
									}
								}
								
							}
							//읍면동
							else if (
									(lv_zoom > 1 && lv_zoom <= 3)
									|| (lv_zoom > 3 && lv_zoom <= 5 )
									|| (lv_zoom > 5 && lv_zoom <= 8 )
							) {
								//이미 같은 읍면동이면 조회 안함
								if(!($totSurvMap.ui.mapRegion == "emdong" && lv_sgg_change_yn == "N")) {

								}						
							}
						});
					}
					
					
					$totSurvMap.ui.prevZoom = lv_zoom;
				} 
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
							$totSurvMap.ui.createInfoTooltip(event, data, type, map);
						}
					} else if( map.isInnerMapShow3!=undefined && map.isInnerMapShow3 ) { //mng_s 그리드일 경우 
						if (type == "data") {
								map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
						if (data.info.length > 0) { //데이터가 있을 경우만 툴팁을 보여준다.
							$totSurvMap.ui.createInfoTooltip(event, data, type, map);
						}
					} else {
						if (type == "data") {
								map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
						$totSurvMap.ui.createInfoTooltip(event, data, type, map);
					}
				}else {
					if( map.isInnerMapShow2!=undefined && map.isInnerMapShow2 ) { //mng_s 그리드일 경우 
						//그리드일 경우 화면에 툴팁을 표출하지 않는다. ==> 표출하는것으로 변경됨
						$totSurvMap.ui.createInfoTooltip(event, data, type, map);
					} else {
						$totSurvMap.ui.createInfoTooltip(event, data, type, map);
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
				$("#mapToolTipTable").hide(); // 2020-10-06 [곽제욱] 맵툴팁 직접생성으로 인하여 mouse out 시 하이드처리
				$("#mapToolTipTable").css("left", "-120"); // 2020-11-18 [곽제욱] 맵툴팁 x좌표 화면밖으로 이동하도록 수정 
				$("#mapToolTipTable").css("top", "-120"); // 2020-11-18 [곽제욱] 맵툴팁 y좌표 화면밖으로 이동하도록 수정
			},

			// 경계 선택 시, 콜백 함수
			didSelectedPolygon : function(event, data, type, map) {
				//20210222 박은식 총조사인구 차트선택 이후 맵 조작 시 초기화 START
				if($totSurvMap.ui.selectedObj != undefined && 
		    	   $totSurvMap.ui.selectedObj != null &&
		    	   $totSurvMap.ui.selectedObj != "" &&
		    	   $totSurvMap.ui.selectedObj.attr("id") == "totalPopulation") {
		    		for(var i=0; i < $(".yearBtn").length; i++){
					    if($(".yearBtn").eq(i).hasClass("on")){
					    	$totSurvMain.ui.selectedYear = $(".yearBtn").eq(i).text();
					    }
					}
		    		$populationDash.ui.chartItmClick($totSurvMap.ui.selectedObj, "", "#576574", "");
		    	}
		    	//20210222 박은식 총조사인구 차트선택 이후 맵 조작 시 초기화 END
				//20201201 박은식 데이터가 없는 지역 (N/A) 경계 클릭 시 retrun 처리 START
					if(data.info.length == 0){
						return;
					}
				//20201201 박은식 데이터가 없는 지역 (N/A) 경계 클릭 시 retrun 처리 END
				if (type == "data") {
					if(data.info[0].adm_cd.length == 7 ){
						//alert("kosis 읍면동 정보 클릭!!!");
					}
					else{
						srvLogWrite('P0','01','04','01',$totSurvMain.ui.selectedThema,'year='+$totSurvMain.ui.selectedYear+',adm_cd='+data.info[0].adm_cd);
						
						var title = "";
						if($totSurvMap.ui.mapToggleId != data.info[0].adm_cd) {
							//20201019 박은식 각 태마별 분기처리 추가 START
							// 전체 차트 변경처리
							var selectedThema = $totSurvMain.ui.selectedThema;
							if(selectedThema == "인구"){
								$populationDash.polygonSelectArea = data.properties.adm_cd; //총조사인구 연령별 분포 차트 단위 변경 기준 변수(하이라이트 적용 시 지역 코드 적용)
							}
							else if(selectedThema == "주택"){
								$houseDash.polygonSelectArea = data.properties.adm_cd; //총조사인구 연령별 분포 차트 단위 변경 기준 변수(하이라이트 적용 시 지역 코드 적용)
							}
							else if(selectedThema == "가구"){
								$houseHoldDash.polygonSelectArea = data.properties.adm_cd; 
							}
							else if(selectedThema == "농업"){
								$farmDash.polygonSelectArea = data.properties.adm_cd; 
							}
							else if(selectedThema == "임업"){
								$forestryDash.polygonSelectArea = data.properties.adm_cd; 
							}
							else if(selectedThema == "어업"){
								$fisheryDash.polygonSelectArea = data.properties.adm_cd; 
							}
							//20201019 박은식 각 태마별 분기처리 추가 END
							var adm_cd = data.info[0].adm_cd;
							var sidoCd = adm_cd.substring(0,2);
							var sggCd = "999";
							
							$totSurvMain.ui.selectedLevel = "1"
							if(adm_cd.length == 5){
								$totSurvMain.ui.selectedArea = adm_cd.substring(0,2);
								sggCd = adm_cd.substring(2,5);
								$totSurvMain.ui.selectedLevel = "2";
								$totSurvMain.ui.getSidoSggPos(adm_cd);
							// 2020-11-30 [곽제욱] 지역 선택시 locationPath 지정 START
								if(adm_cd.substring(4,5)=="0"){
									$totSurvMain.ui.pathChange("atdrc", adm_cd);
								} else {
									$totSurvMain.ui.pathChange("emdong", adm_cd);
								}
							} else {
								$totSurvMain.ui.pathChange("sgg", adm_cd);
							}
							// 2020-11-30 [곽제욱] 지역 선택시 locationPath 지정 END
							
							
							$("#dash_sido").val(sidoCd);
							$("#dash_sgg").val(sggCd);
							// 전체 차트 변경처리
							var selectedThema = $totSurvMain.ui.selectedThema;
							// 각 주제별 차트 변화함수 호출
							
							if(selectedThema == "인구"){
								$populationDash.event.allChange(adm_cd, "2");
							}
							else if(selectedThema == "가구"){
								$houseHoldDash.event.allChange(adm_cd, "2");
							}
							else if(selectedThema == "농업"){
								$farmDash.event.allChange(adm_cd, "2");
							}
							else if(selectedThema == "주택"){
								$houseDash.event.allChange(adm_cd, "2");
							}	
							//20201022 박은식 임업,어업 분기처리 추가 START
							else if(selectedThema == "임업"){
								$forestryDash.event.allChange(adm_cd, "2");
							}	
							else if(selectedThema == "어업"){
								$fisheryDash.event.allChange(adm_cd, "2");
							}	
							//20201022 박은식 임업, 어업 분기처리 추가 END
							$totSurvMain.ui.titleChange(adm_cd);
							
							// 선택한 지역 하이라이트
							// 2020-11-02 [곽제욱] 타일차트 색변경 추가 START
							if($totSurvMap.ui.mapToggleId!=""&&$totSurvMap.ui.mapToggleId!="00"){
								//20201118 박은식 IE에서 find() 미지원으로 변경 처리 START
			    				var tempColor = '';
			    				for(var i=0;i < $totSurvMain.ui.tilePerColor.length; i++){
			    					if($totSurvMain.ui.tilePerColor[i].adm_cd == $totSurvMap.ui.mapToggleId){
			    						tempColor = $totSurvMain.ui.tilePerColor[i].color
			    					}
			    				}
								//var tempColor = $totSurvMain.ui.tilePerColor.find(function(x) {return x.adm_cd == $totSurvMap.ui.mapToggleId}).color;
			    				//20201118 박은식 IE에서 find() 미지원으로 변경 처리 END
								$("rect[value='"+$totSurvMap.ui.mapToggleId+"']").attr("fill", tempColor); 
							}
							$totSurvMap.ui.tileTempColor = $("rect[value='"+adm_cd+"']").attr("fill");
							// 2020-11-02 [곽제욱] 타일차트 색변경 추가 END
				    		$totSurvMap.ui.map.setPolyLayerHighlight(adm_cd);
				    		$("rect[value='"+adm_cd+"']").attr("fill", "#0086c6"); // 2020-11-02 [곽제욱] 타일차트 색변경 추가
				    		$totSurvMap.ui.mapToggleId = data.info[0].adm_cd;
						} else { 
							$populationDash.polygonSelectArea = ""; //총조사인구 연령별 분포 차트 단위 변경 기준 변수(하이라이트 토글 시 지역 코드 초기화)
							var adm_cd = data.info[0].adm_cd;
							var sidoCd = adm_cd.substring(0,2);
							var sggCd = "999";
							var selectedThema = $totSurvMain.ui.selectedThema;
							if(adm_cd.length == 5){
								$totSurvMap.ui.checkIsAtdrc(adm_cd.substring(0,4)+"0");
								if($totSurvMap.ui.isAtdrc){
									// 행정시도인 경우(ex : 수원시)
									if(adm_cd.substring(0,4)+"0" == adm_cd){
										$totSurvMain.ui.selectedArea = adm_cd.substring(0,2);
										sggCd = "999";
										$totSurvMain.ui.selectedLevel = "1";
									} else {
										$totSurvMain.ui.selectedArea = adm_cd.substring(0,4)+"0";
										sggCd = adm_cd.substring(2,4)+"0";
										$totSurvMain.ui.selectedLevel = "2";										
									}
									if(selectedThema == "인구"){
										$populationDash.event.allChange($totSurvMain.ui.selectedArea, "2");
									}
									else if(selectedThema == "가구"){
										$houseHoldDash.event.allChange($totSurvMain.ui.selectedArea, "2");
									}
									else if(selectedThema == "농업"){
										$farmDash.event.allChange($totSurvMain.ui.selectedArea, "2");
									}
									else if(selectedThema == "주택"){
										$houseDash.event.allChange($totSurvMain.ui.selectedArea, "2");
									}
									//20201022 박은식 임업,어업 분기처리 추가 START
									else if(selectedThema == "임업"){
										$forestryDash.event.allChange($totSurvMain.ui.selectedArea, "2");
									}
									else if(selectedThema == "어업"){
										$fisheryDash.event.allChange($totSurvMain.ui.selectedArea, "2");
									}
									//20201022 박은식 임업,어업 분기처리 추가 END
									$totSurvMain.ui.pathChange("atdrc", adm_cd.substring(0,4)+"0"); // 2020-11-30 [곽제욱] 선택시 navigation 해제 추가
								} else {
									$totSurvMain.ui.selectedArea = adm_cd.substring(0,2);
									if(selectedThema == "인구"){
										$populationDash.event.allChange($totSurvMain.ui.selectedArea, "2");
									}
									else if(selectedThema == "가구"){
										$houseHoldDash.event.allChange($totSurvMain.ui.selectedArea, "2");
									}
									else if(selectedThema == "농업"){
										$farmDash.event.allChange($totSurvMain.ui.selectedArea, "2");
									}
									else if(selectedThema == "주택"){
										$houseDash.event.allChange($totSurvMain.ui.selectedArea, "2");
									}
									//20201022 박은식 임업,어업 분기처리 추가 START
									else if(selectedThema == "임업"){
										$forestryDash.event.allChange($totSurvMain.ui.selectedArea, "2");
									}
									else if(selectedThema == "어업"){
										$fisheryDash.event.allChange($totSurvMain.ui.selectedArea, "2");
									}
									//20201022 박은식 임업,어업 분기처리 추가 END

									$totSurvMain.ui.pathChange("sgg", adm_cd.substring(0,2)); // 2020-11-30 [곽제욱] 선택시 navigation 해제 추가
								}
							} else if(adm_cd.length == 2){
								sidoCd = "99";
								$totSurvMain.ui.selectedLevel = "0"
								$totSurvMain.ui.selectedArea = "00";
								if(selectedThema == "인구"){
									$populationDash.event.allChange("00", "2");
								}
								else if(selectedThema == "가구"){
									$houseHoldDash.event.allChange("00", "2");
								}
								else if(selectedThema == "농업"){
									$farmDash.event.allChange("00", "2");
								}
								else if(selectedThema == "주택"){
									$houseDash.event.allChange("00", "2");
								}
								//20201022 박은식 임업,어업 분기처리 추가 START
								else if(selectedThema == "임업"){
									$forestryDash.event.allChange("00", "2");
								}
								else if(selectedThema == "어업"){
									$fisheryDash.event.allChange("00", "2");
								}
								//20201022 박은식 임업,어업 분기처리 추가 END
								
								$totSurvMain.ui.pathChange("nationwide", "00"); // 2020-11-30 [곽제욱] 선택시 navigation 해제 추가
							}
							$("#dash_sido").val(sidoCd);
							$("#dash_sgg").val(sggCd);
							if($totSurvMap.ui.mapToggleId != "00"){
								//20201118 박은식 IE에서 find() 미지원으로 변경 처리 START
			    				var tempColor = '';
			    				for(var i=0;i < $totSurvMain.ui.tilePerColor.length; i++){
			    					if($totSurvMain.ui.tilePerColor[i].adm_cd == $totSurvMap.ui.mapToggleId){
			    						tempColor = $totSurvMain.ui.tilePerColor[i].color
			    					}
			    				}
								//var tempColor = $totSurvMain.ui.tilePerColor.find(function(x) {return x.adm_cd == $totSurvMap.ui.mapToggleId}).color; // 2020-11-04 [곽제욱] 타일색 변경 추가
								//20201118 박은식 IE에서 find() 미지원으로 변경 처리 END
								$("rect[value='"+$totSurvMap.ui.mapToggleId+"']").attr("fill", tempColor); // 2020-11-04 [곽제욱] 타일색 변경 추가
							}
							$totSurvMap.ui.map.setPolyLayerHighlight(adm_cd);
							$totSurvMap.ui.mapToggleId = "";
							
							$totSurvMain.ui.titleChange(adm_cd);
						}
						/** 2020-10-20 [곽제욱] 로직 변경 START */
						if($totSurvMain.ui.chartTarget != ""
							&& ($totSurvMain.ui.chartIndex != "" || typeof($totSurvMain.ui.chartIndex) == "number") //20201022 박은식 차트선택 유지 조건 추가
							&& $totSurvMain.ui.chartData != ""
							&& $totSurvMain.ui.chartColor != ""){
							if($totSurvMain.ui.chartTarget == "multiculPopulationChart"){
								$totSurvMain.ui.chartTarget = "";
					    		$totSurvMain.ui.chartIndex = "";
					    		$totSurvMain.ui.chartData = "";
					    		$totSurvMain.ui.chartColor = "";
					    		$totSurvMain.ui.chartTitle = "";
								$totSurvMap.ui.chartToggleYn = "N"
							} else if(!$(".mapExport").hasClass('on')) {
								$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, $totSurvMain.ui.chartData, $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y", $totSurvMain.ui.chartTitle);
							}
						}
						/** 2020-10-20 [곽제욱] 로직 변경 END */
						if($totSurvMain.ui.selectedThema == "인구"){
							$populationDash.ui.getRankSet("","", $totSurvMain.ui.selectedArea); // 2020-11-10 [곽제욱] adm_cd 를 selectedArea 로 변경
							//20201014 박은식 하이라이트 시 선택차트 유지 처리 START
							//20201014 박은식 하이라이트 시 선택차트 유지 처리 END
						} else if(selectedThema == "주택"){
							//20201019 박은식 주택 태마일 때 로직 추가 START
							$houseDash.ui.getRankSet("","", $totSurvMain.ui.selectedArea); // 2020-11-10 [곽제욱] adm_cd 를 selectedArea 로 변경
							//20201019 박은식 주택 태마일 때 로직 추가 END
						/** 2020-10-20 [곽제욱] 가구대시보드 초기화+랭크 세팅 세팅 START */	
						} else if(selectedThema == "가구"){
							$houseHoldDash.ui.getRankSet("","", $totSurvMain.ui.selectedArea); // 2020-11-10 [곽제욱] adm_cd 를 selectedArea 로 변경
							//$houseHoldDash.ui.drawContent("PH0001", "T200", "");
						} else if(selectedThema == "농업"){
							$farmDash.ui.getRankSet("","", $totSurvMain.ui.selectedArea);
						//$houseHoldDash.ui.drawContent("PH0001", "T200", "");
						//20201022 박은식 임업,어가 분기처리 추가 START
						} else if(selectedThema == "임업"){
							$forestryDash.ui.getRankSet("","", $totSurvMain.ui.selectedArea);					
						} else if(selectedThema == "어업"){
							$fisheryDash.ui.getRankSet("","", $totSurvMain.ui.selectedArea);					
						}
						//20201022 박은식 임업,어가 분기처리 추가 END
						/** 2020-10-20 [곽제욱] 가구대시보드 초기화+랭크 세팅 END */
						
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
					$totSurvMapApi.request.userAreaBoundInfo(area, type, map.curPolygonCode, event, map);	
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
	
	$totSurvMap.event = {
			
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

/*********** 센터의 집계구값 얻기 시작 **********/
(function() {
	$class("sop.openApi.personal.findcodeinsmallarea.api").extend(sop.portal.absAPI).define({
		onSuccess: function(status, res, options) {
			if(res.errCd == "0") {
				if(typeof options.callback === "function"){
					options.callback(res);
				}
			}else if(res.errCd == "-401") {
				accessTokenInfo(function(){
					options.target.getCenterToAdmCd(options.center,options.callback);
				});
			}
		},
		onFail: function(status) {
		}
	});
}());
/*********** 센터의 집계구값 얻기 종료 **********/

