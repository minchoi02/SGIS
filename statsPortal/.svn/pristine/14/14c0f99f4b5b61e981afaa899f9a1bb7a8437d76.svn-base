/**
 * 대쉬보드 맵 서비스
 *
 * history : 1.0, 2021/08/10  초기 작성
 * author : hjh
 * version : 1.0
 * see :
 *
 */
(function(W, D) {
	W.$administStatsMap = W.$administStatsMap || {};

	$(document).ready(function() {
	});


	$administStatsMap = {
			noReverseGeoCode : false
	};

	$administStatsMap.ui = {
			regionCd : "00",
			map : null,
			namespace : "administStatsMap",
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
			selectedPK : "", // 선택한 객체(차트의 경우 rect)
			selectedSurvId : "",// 선택한 지표id
			selectedItmCd : "", // 선택한 itm_cd
			selectedC1 : "", 	// 선택한 c1
			selectedC2 : "", // 선택한 c2
			selectedC3 : "", // 선택한 c3

			selectedParams : {},
			selectedKey : "",
			selectedCallback : undefined,
			selectedMapTitle : "",
			selectedUnit : "(명)",

			prevZoom : "1", 	// 지도 이동 이벤트에서 드래그를 막기위한 이전 줌 변수
			isAtdrc : false,	// 비자치구 여부  (ex 수원시 (5자리) 클릭시 구정보 조회) / census 조회시 true면 5자리라도 조회 안하도록
			isLoading : false,	// 로딩이미지 여부

			//데이터
			mapData : null,
			mapStatsData : {}, // 통계정보 저장
			mapRegionData : {}, // 지역경계 저장
			mapRegion : "", // 지역경계 sido, sgg, emdong, totreg
			mapType : "", // 지도유형 color, bubble, heat, poi, grid
			mapToggleId : "", // 맵 토글 id, 슬라이드 이동시에도 하이라이트 처리를 위해 사용
			mapToggleId1 : "", // 맵 토글 id, 슬라이드 이동시에도 하이라이트 처리를 위해 사용
			mapTempColor : "", // 하이라이트를 위한 맵 임시 칼라
			mapTempColor1 : "", // 하이라이트를 위한 맵 임시 칼라
			tileTempColor : "", // 타일맵 하이라이트를 위한 임시 칼라 //2020-11-04 [곽제욱] 타일맵 하이라이트 처리를 위한 변수 추가
			tileTempColor1 : "", // 타일맵 하이라이트를 위한 임시 칼라 //2020-11-04 [곽제욱] 타일맵 하이라이트 처리를 위한 변수 추가
			chartToggle : "", // 차트 토글 id가 들어감
			chartToggleYn : "N",
			mapTotalVal : 0, // 2020-11-17 [곽제욱] 맵 total값을 위한 변수 추가
			mapCenter : {}, // 지도확대, 줌인/아웃 시 중심값 저장 

			/**
			 * 지도데이터 초기화
			 */
			clearLayer: function() {// used
				$administStatsMain.ui.log("$administStatsMap.ui.clearLayer - begin");

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

				//this.map.id = id;
				this.map.id = seq;
				this.map.isDrop = true;
				this.map.isInnerMapShow = true;
				this.map.isTradeMapShow = false;
				this.map.boundLevel = 0; // 확대 상관없이 지역경계 표시하게함
				this.map.createMap($administStatsMap, id, {
					center : [ 1064426, 1780429 ], // 2020-11-13 [곽제욱] 맵 첫 로딩시 center값 수정 [ 989674, 1818313 ] -> [ 982682, 1744189 ]
					//center : [ 957594, 1780541 ],
					zoom : 1, //9->8
					measureControl : false,
					statisticTileLayer: false
				});
				this.map.addControlEvent("zoomend");


				this.map.gMap.on("moveend", function (e) {
					var that = $administStatsMap.ui.map;
					if (that.delegate &&
						that.delegate.callbackFunc &&
						that.delegate.callbackFunc.didMapMoveEnd instanceof Function) {
						that.delegate.callbackFunc.didMapMoveEnd(e, that);
					}
				});

				//지도 범례 등록
				//var legend = new sLegendInfo.legendInfo($administStatsMap.ui.map);
				var legend = new sLegendInfo.legendInfo(this.map);
				legend.linkTooltip = function() {}; //툴팁오류 방지
				legend.drawBubbleMap = $administStatsMap.ui.drawBubbleMap; // 버블 지도 Override
				legend.initialize($administStatsMap.ui);
				this.map.legend = legend;
				legend.createLegend();
				
				//사용자지정컨트롤설정
				this.mapList[seq] = this.map;
				
				if(seq == 1){
					$administStatsMap.ui.mapList[seq].gMap._size['x'] = 830;
				}
				//this.map.gMap.whenReady(function() {
				this.mapList[seq].gMap.whenReady(function() {
					//$administStatsMap.ui.map.createHeatMap();
					$administStatsMap.ui.mapList[seq].createHeatMap();
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
				//srvLogWrite("C0", "07", "05", "00", "", "");		//전체화면확대
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
				var total = $administStatsMap.ui.mapTotalVal;
				var ratio = 0;
		        if(total != 0 && total !=""){
		        	if(data.info.length>0){
		        		if(data.info[0].showData != undefined) {
		        			ratio = ( data.info[0][data.info[0].showData] / total * 100).toFixed(2)
		        		} else {
		        			ratio = 0;
		        		}
		        	} else {
		        		ratio = 0;
		        	}
		        } else {
		        	ratio = 100;
		        }
				//2020-11-17 [곽제욱] 데이터 비율 계산 추가 END

				//20201012 박은식 다문화 가구 선택 시 단위를 가구로 표시 START
				var lv_html = "";
				//let befDt = $houseDash.data.before, totDt = 0, incDec = 0, incDecStr = ""; 
				if(data.info.length>0) {
					/*for(var i=0; i<befDt.length; i++) {
						if(befDt[i].ADM_CD == data.properties.adm_cd) {
							totDt += parseInt(befDt[i].DTVAL_CO);
						}
					}
					
					incDec = ((totDt-parseFloat(data.info[0][data.info[0].showData])) / totDt * 100).toFixed(1);
					
					if(befDt.length > 0) {
						if(incDec < 0) {
							incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
						} else if(incDec > 0) {
							incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
						} else {
							incDecStr = "변동 없음";
						}
					} else {
						incDecStr = "전년도 자료 없음";
					}*/
					/* 2022-02-24 [이영호] 귀농, 귀촌, 귀어 서울-대전-광주는 자료없음 처리 START */
					if(sClassCd == "0401" || sClassCd == "0402" || sClassCd == "0403") {
						if(data.info[0].adm_cd == "11"
							|| data.info[0].adm_cd == "24"
							|| data.info[0].adm_cd == "25") {
							lv_html += "<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 0; padding-right: 3px;'>자료없음</p>";  // 2020-11-17 [곽제욱] 맵 툴팁 스타일 적용 // 2020.11.18[신예리] margin-top 값 변경
						} else {
							lv_html += "<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 0; padding-right: 3px;'>"+appendCommaToNumber(parseFloat(data.info[0][data.info[0].showData]))+"</p>";  // 2020-11-17 [곽제욱] 맵 툴팁 스타일 적용 // 2020.11.18[신예리] margin-top 값 변경
							lv_html += "<span>"+$administStatsMap.ui.selectedUnit+"</span>";
						}
					} else {
						lv_html += "<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 0; padding-right: 3px;'>"+appendCommaToNumber(parseFloat(data.info[0][data.info[0].showData]))+"</p>";  // 2020-11-17 [곽제욱] 맵 툴팁 스타일 적용 // 2020.11.18[신예리] margin-top 값 변경
						lv_html += "<span>"+$administStatsMap.ui.selectedUnit+"</span>";
					}
					/* 2022-02-24 [이영호] 귀농, 귀촌, 귀어 서울-대전-광주는 자료없음 처리 END */
				} else {
					lv_html += "N/A"
				}
				if(							// 단위가 %일 경우 합계에서 평균을 구할 필요가 없음
					tblId != "DT_1NW1020"		// 신혼부부 특성별 평균 출생아 수
					&& tblId != "DT_1NW1022"	// 신혼부부 특성별 첫째자녀의 평균 출산 소요기간
					&& tblId != "DT_1NW1024"	// 신혼부부 특성별 첫째출산 후 둘째자녀 사이의 평균 출산 소요기간
					&& tblId != "DT_1NW1027"	// 신혼부부 특성별 소득(근로·사업소득) 현황
					&& tblId != "DT_1NW1035"	// 신혼부부 특성별 금융권 대출잔액 현황
					&& tblId != "DT_1NW2017"	// 초혼 신혼부부 특성별 평균 출생아 수
					&& tblId != "DT_1NW2019"	// 초혼 신혼부부 특성별 첫째자녀의 평균 출산 소요기간
        			&& tblId != "DT_1NW2021"	// 초혼 신혼부부 특성별 첫째출산 후 둘째자녀 사이의 평균 출산 소요기간
        			&& tblId != "DT_1NW3017"	// 재혼 신혼부부 특성별 평균 출생아 수
        			&& tblId != "DT_1NW3019"	// 재혼 신혼부부 특성별 첫째자녀의 평균 출산 소요기간
        			&& tblId != "DT_1NW3021"	// 재혼 신혼부부 특성별 첫째출산 후 둘째자녀 사이의 평균 출산 소요기간
        			&& tblId != "DT_1NW1005"	// 신혼부부 특성별 혼인종류별 평균 혼인연령
        			&& tblId != "DT_1OH0511"	// 거주지역별 1인당 평균 소유 주택수
				) {
					/* 2022-02-24 [이영호] 귀농, 귀촌, 귀어 서울-대전-광주는 자료없음으로 비중도 표시 안함 START */
					if(sClassCd == "0401" || sClassCd == "0402" || sClassCd == "0403") {
						if(data.info[0].adm_cd != "11"
							&& data.info[0].adm_cd != "24"
							&& data.info[0].adm_cd != "25") {
							lv_html += "<br><p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px;'>"+ratio+"</p><span>%</span>";
						}
					} else {
						lv_html += "<br><p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px;'>"+ratio+"</p><span>%</span>";
					}
					/* 2022-02-24 [이영호] 귀농, 귀촌, 귀어 서울-대전-광주는 자료없음으로 비중도 표시 안함 END */
				}
				//lv_html += "<br><p style='color:#EE3520; font-weight: 100; display: inline-block; margin-top: 3px; padding-right: 3px;'>"+incDecStr+"</p><span style='margin-right: 20px;'></span>";

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
								if($administStatsMain.ui.selectedThema == "신혼부부"){
									lv_html += " (명)";
								}
								else if($administStatsMain.ui.selectedThema == "주택소유"){
									lv_html += " (주택)";
								}
								else if($administStatsMain.ui.selectedThema == "중장년층"){
									lv_html += " (수)";
								}
								else if($administStatsMain.ui.selectedThema == "귀농·귀어·귀촌"){
									lv_html += " (수)";
								}
								else if($administStatsMain.ui.selectedThema == "통계더보기"){
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
			drawMapData : function(p_map_region, p_map_type, selectedSggCd) {
				$administStatsMain.ui.loading(true); // 2020-10-14 [곽제욱] 맵 그리기 시작할때 loading바 생성
				//$administStatsMain.ui.loading($administStatsMap.ui.isLoading); // 2020-10-14 [곽제욱] 맵 그리기 시작할때 loading바 생성
				/** 인구 지도 이벤트 버튼 제어*/
				//if($administStatsMap.ui.map != null){
				if($administStatsMap.ui.mapList[$administStatsMap.ui.curMapId] != null){
//					$(".mapExport").show();
					$(".zoom").show();
					$(".out").show();
				}

				var lv_map_region_before = $administStatsMap.ui.mapRegion;
				var lv_map_type_before = $administStatsMap.ui.mapType;

				// 2021.08.31[hjh]
				var selectedParams = $administStatsMap.ui.selectedParams;
				var selectedKey = $administStatsMap.ui.selectedKey;
				var selectedCallback = $administStatsMap.ui.selectedCallback;

				if(p_map_region == undefined || p_map_region == null) {
					p_map_region = $administStatsMain.ui.mapRegion;
				}
				else {
					$administStatsMap.ui.mapRegion = p_map_region;
				}
				if(p_map_type == undefined || p_map_type == null) {
					p_map_type = $administStatsMain.ui.mapType;
				}
				else {
					$administStatsMap.ui.mapType = p_map_type;
				}

				//지역변수
				var lv_adm_cd = "00";
				var lv_adm_nm = "전국";
				/*var lv_adm_coor_x = 990480.875;
				var lv_adm_coor_y = 1815839.375;*/
				var lv_adm_coor_x = 957594;
				var lv_adm_coor_y = 1780541;
				
				/* 행정통계 시각화의 경우 각 시도정보는  $administStatsMain.ui.selectedArea 로 가져온다 */
				var lv_sido = $("#dash_sido");
				var lv_sido_cd = $("#dash_sido").val() == undefined ? "99" : $("#dash_sido").val();
				//var lv_sido_cd = selectedSggCd;
				var lv_sido_nm = $("#dash_sido option:selected").text();
				var lv_sido_coor_x = $("#dash_sido option:selected").attr("data-coor-x");
				var lv_sido_coor_y = $("#dash_sido option:selected").attr("data-coor-y");
				var lv_sgg = $("#dash_sgg");
				var lv_sgg_cd = $("#dash_sgg").val() == undefined ? "999" : $("#dash_sgg").val();
				var lv_sgg_nm = $("#dash_sgg option:selected").text();
				var lv_sgg_coor_x = $("#dash_sgg option:selected").attr("data-coor-x");
				var lv_sgg_coor_y = $("#dash_sgg option:selected").attr("data-coor-y");
				var lv_emdong = $("#dash_emdong");
				var lv_emdong_cd = $("#dash_emdong").val() == undefined ? "99" : $("#dash_emdong").val();
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

				
				/*if(selectedSggCd != undefined) {
					lv_sido_cd = selectedSggCd;
				}*/
				lv_sido_cd = $administStatsMain.ui.selectedArea;
				
				//지도 Clear
				//$administStatsMap.ui.clearMap($administStatsMap.ui.map);
				$administStatsMap.ui.clearMap($administStatsMap.ui.mapList[$administStatsMap.ui.curMapId]);
				
				var mapToggleId = "";
				if($("#mapRgn_2").is(":visible")){
					if($administStatsMap.ui.curMapId == 1){
						mapToggleId = $administStatsMap.ui.mapToggleId1;
					}else if($administStatsMap.ui.curMapId == 0){
						mapToggleId = $administStatsMap.ui.mapToggleId;
					}
				}else{
					mapToggleId = $administStatsMap.ui.mapToggleId;
				}
				
				if(chkRegionEnd == "시군구"){
					if($("#mapRgn_2").is(":visible")){
						$administStatsMap.ui.mapList[0].zoom = 2;
						$administStatsMap.ui.mapList[1].zoom = 2;
					}else{
						$administStatsMap.ui.mapList[0].zoom = 2;
					}
				}
				
				//색상/버블
				if(p_map_type == "color" || p_map_type == "bubble") {
					//색상/버블 (시도)
					if(p_map_region == "sido") {
						//
						//$administStatsMap.ui.setAdministStatsData($administStatsMap.ui.map, "sido", "color", "", "", "",  "", "", selectedCallback, function(p_list) {
						$administStatsMap.ui.setAdministStatsData($administStatsMap.ui.mapList[$administStatsMap.ui.curMapId], "sido", "color", "", "", "",  "", "", selectedCallback, function(p_list) {
							//리스트에서 unit 가져오기
							var lv_unit = "개";
							var lv_unit_nm = "수";
							if(p_list != null && p_list.length > 0) {
								if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
								if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
							}
							//데이터 넣기
							//$administStatsMap.ui.map.setStatsData("normal", {"pAdmCd": "00", "result" : p_list}, "dt", lv_unit);
							$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setStatsData("normal", {"pAdmCd": "00", "result" : p_list}, "dt", lv_unit);

							//경계 그리기
							//$administStatsMap.ui.setAdministStatsRegion($administStatsMap.ui.map, "sido", $administStatsMap.ui.getAdministStatsRegionYear(), "", "", "", function() {
							$administStatsMap.ui.setAdministStatsRegion($administStatsMap.ui.mapList[$administStatsMap.ui.curMapId], "sido", $administStatsMap.ui.getAdministStatsRegionYear(), "", "", "", function() {
								var mapToggleId = "";
								if($("#mapRgn_2").is(":visible")){
									if($administStatsMap.ui.curMapId == 1){
										mapToggleId = $administStatsMap.ui.mapToggleId1;
									}else if($administStatsMap.ui.curMapId == 0){
										mapToggleId = $administStatsMap.ui.mapToggleId;
									}
								}else{
									mapToggleId = $administStatsMap.ui.mapToggleId;
								}
								
								//if($administStatsMap.ui.mapToggleId != "" && $administStatsMap.ui.mapToggleId != null){
								if(mapToggleId != "" && mapToggleId != null){
									// 2020-10-06 [곽제욱] 지도 새로 그릴경우 선택된 지역과 이동한 지역이 다를경우, 선택지역으로 세팅 START
									//if($administStatsMap.ui.mapToggleId!=$administStatsMain.ui.selectedArea){
									if(mapToggleId!=$administStatsMain.ui.selectedArea){
										if($administStatsMap.ui.curMapId == 1){
											$administStatsMap.ui.mapToggleId1 = $administStatsMain.ui.selectedArea;
										}else if($administStatsMap.ui.curMapId == 0){
											$administStatsMap.ui.mapToggleId = $administStatsMain.ui.selectedArea;
										}
									}
									// 2020-10-06 [곽제욱] 지도 새로 그릴경우 선택된 지역과 이동한 지역이 다를경우, 선택지역으로 세팅 END
									// 랭크이동시 mapToggleId를 초기화하고 하이라이트 처리
									//var highLightAmdCd = $administStatsMap.ui.mapToggleId;
									if($("#mapRgn_2").is(":visible")){
										if($administStatsMap.ui.curMapId == 1){
											var highLightAmdCd = $administStatsMap.ui.mapToggleId1;
											// 맵토글ID 초기화
											$administStatsMap.ui.mapToggleId1 = "";
											$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight(highLightAmdCd);
											// 하이라이트 처리 후 맵토글ID 세팅
											$administStatsMap.ui.mapToggleId1 = highLightAmdCd;
										}else{
											var highLightAmdCd = $administStatsMap.ui.mapToggleId;
											// 맵토글ID 초기화
											$administStatsMap.ui.mapToggleId = "";
											$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight(highLightAmdCd);
											// 하이라이트 처리 후 맵토글ID 세팅
											$administStatsMap.ui.mapToggleId = highLightAmdCd;
										}
									}else{
										var highLightAmdCd = $administStatsMap.ui.mapToggleId;
										// 맵토글ID 초기화
										$administStatsMap.ui.mapToggleId = "";
										$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight(highLightAmdCd);
										// 하이라이트 처리 후 맵토글ID 세팅
										$administStatsMap.ui.mapToggleId = highLightAmdCd;
									}
									//$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight(highLightAmdCd);
									
								}
								// 2020-11-19 [곽제욱] 맵 그리기 완료 + 1초후 loading바 닫기 START
								setTimeout(function(){
									//$administStatsMain.ui.loading(false);
									$administStatsMain.ui.loading($administStatsMap.ui.isLoading);
									//$administStatsMap.ui.map.setPolyLayerHighlight($houseDash.polygonSelectArea);
									//$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight($houseDash.polygonSelectArea);
						    		/*if($("#mapRgn_2").is(":visible")){
						    			if($administStatsMap.ui.curMapId == 1){
						    				$administStatsMap.ui.mapToggleId1 = $houseDash.polygonSelectArea1;
											$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight($houseDash.polygonSelectArea1);
						    			}else if($administStatsMap.ui.curMapId == 0){
						    				$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
											$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight($houseDash.polygonSelectArea);
						    			}
						    		}else{
						    			$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
										$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight($houseDash.polygonSelectArea);
						    		}*/
								}, 500) // 2020-11-23 [곽제욱] 맵 그리기 완료 1초에서 0.5초로 수정
								// 2020-11-19 [곽제욱] 맵 그리기 완료 + 1초후 loading바 닫기 END
							});

						});

					}
					//색상/버블 (시군구)
					else if(p_map_region == "sgg") {
						console.log("================  sgg  =================");
						
						
						//var lv_zoom = $administStatsMap.ui.map.zoom;
						//$administStatsMap.ui.map.setZoom((lv_zoom + 2));
						//lv_sido_cd = $administStatsMain.ui.selectedArea;
						
						var mapToggleId = "";
						if($("#mapRgn_2").is(":visible")){
			    			if($administStatsMap.ui.curMapId == 1){
			    				mapToggleId = $administStatsMap.ui.mapToggleId1;
			    			}else if($administStatsMap.ui.curMapId == 0){
			    				mapToggleId = $administStatsMap.ui.mapToggleId;
			    			}
			    		}else{
		    				mapToggleId = $administStatsMap.ui.mapToggleId;
			    		}
						
						// 비자치구 일경우
						//if($administStatsMap.ui.isAtdrc == true && ($administStatsMain.ui.selectedArea).length == 5 && ($administStatsMap.ui.mapToggleId == "" || $administStatsMain.ui.yearChangeYn == "Y" || gv_type=="locgov" || gv_type=="totFarmLocgov" || gv_type=="totPeopleLocgov" ) ){ // 2020-10-07 [곽제욱] 순위검색 case 예외처리 // 2020-11-05 [곽제욱] 조건 추가
						if($administStatsMap.ui.isAtdrc == true && ($administStatsMain.ui.selectedArea).length == 5 && (mapToggleId == "" || $administStatsMain.ui.yearChangeYn == "Y" || gv_type=="locgov" || gv_type=="totFarmLocgov" || gv_type=="totPeopleLocgov" ) ){ // 2020-10-07 [곽제욱] 순위검색 case 예외처리 // 2020-11-05 [곽제욱] 조건 추가
//							//params.region = "sgg";
							var s_sido_cd = "";
							var s_sgg_cd = "";

							if($administStatsMain.ui.selectedArea.length == 5){
								/** 2020-10-14 [곽제욱] 조건문 삭제후 하나로 변경 START */
								s_sido_cd = ($administStatsMain.ui.selectedArea).substring(0,2);
								s_sgg_cd  = ($administStatsMain.ui.selectedArea).substring(2,4)+"0";
								// atdrc 상태에서 랭크이동인 경우 맵토글id 재지정
								if($administStatsMain.ui.selectedArea.substring(4,5)!= "0"){
									
									if($("#mapRgn_2").is(":visible")){
						    			if($administStatsMap.ui.curMapId == 1){
											$administStatsMap.ui.mapToggleId1 = $administStatsMain.ui.selectedArea;
						    			}else if($administStatsMap.ui.curMapId == 0){
											$administStatsMap.ui.mapToggleId = $administStatsMain.ui.selectedArea;
						    			}
						    		}else{
										$administStatsMap.ui.mapToggleId = $administStatsMain.ui.selectedArea;
						    		}
								}
								/** 2020-10-14 [곽제욱] 조건문 삭제후 하나로 변경 END */
							} else {
								s_sido_cd = ($administStatsMain.ui.selectedArea).substring(0,2);
								s_sgg_cd  = ($administStatsMain.ui.selectedArea).substring(2,5);
							}
							console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
							console.log(" sido_cd = " + s_sido_cd);
							console.log(" sgg_cd  = " + s_sgg_cd);
							console.log(" 비자치구 여부 체크 isAtdrc = " + $administStatsMap.ui.isAtdrc);
							console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

							//$administStatsMap.ui.setAdministStatsData($administStatsMap.ui.map, "sgg", "color", s_sido_cd, s_sgg_cd, "", selectedParams, selectedKey, selectedCallback, function(p_list) {
							$administStatsMap.ui.setAdministStatsData($administStatsMap.ui.mapList[$administStatsMap.ui.curMapId], "sgg", "color", s_sido_cd, s_sgg_cd, "", selectedParams, selectedKey, selectedCallback, function(p_list) {
								//리스트에서 unit 가져오기
								var lv_unit = "개";
								var lv_unit_nm = "수";
								
								//p_list = $administStatsMain.ui.areaSggData[$administStatsMain.ui.selectedArea];
								
								if(p_list != null && p_list.length > 0) {
									if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
									if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
								}

								//데이터 넣기
								//$administStatsMap.ui.map.setStatsData("normal", {"pAdmCd": s_sido_cd+s_sgg_cd, "result" : p_list}, "dt", lv_unit);
								$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setStatsData("normal", {"pAdmCd": s_sido_cd+s_sgg_cd, "result" : p_list}, "dt", lv_unit);

								//경계 그리기
								var lv_region = "sgg"; //비자치구 여부 체크

								//if(data.atdrc_yn != undefined && data.atdrc_yn != null && data.atdrc_yn == "Y") lv_region = "atdrc";
								//$administStatsMap.ui.setAdministStatsRegion($administStatsMap.ui.map, lv_region, $administStatsMap.ui.getAdministStatsRegionYear(), s_sido_cd+s_sgg_cd, "", "", function() {
								$administStatsMap.ui.setAdministStatsRegion($administStatsMap.ui.mapList[$administStatsMap.ui.curMapId], lv_region, $administStatsMap.ui.getAdministStatsRegionYear(), s_sido_cd, s_sgg_cd, "", function() {
									//$administStatsMain.ui.pathChange(lv_region, lv_sido_cd);
									//비자치구인 경우 lv_region을 atrdc 로
									//$administStatsMain.ui.pathChange("atdrc", s_sido_cd+s_sgg_cd); // 2020-10-07 [곽제욱] 행정시도 진입시 선택지역 표출오류 수정  // 2020-10-14 [주형식] atdrc 수정 // 2020-12-01 [곽제욱] 주석처리

									if($administStatsMain.ui.selectedThema == "신혼부부"){
										$administStatsMain.ui.selectedLevel = 2;
									}
									//if($administStatsMap.ui.mapToggleId != "" && $administStatsMap.ui.mapToggleId != null){
									if(mapToggleId != "" && mapToggleId != null){
							    		if($("#mapRgn_2").is(":visible")){
											if($administStatsMap.ui.curMapId == 1){
												var highLightAmdCd = $administStatsMap.ui.mapToggleId1;
												// 맵토글ID 초기화
												$administStatsMap.ui.mapToggleId1 = "";
												$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight(highLightAmdCd);
												// 하이라이트 처리 후 맵토글ID 세팅
												$administStatsMap.ui.mapToggleId1 = highLightAmdCd;
												// 랭크이동시 mapToggleId를 초기화하고 하이라이트 처리
												if($administStatsMap.ui.tileTempColor1!=""){
													$("rect[value='"+$administStatsMap.ui.mapToggleId1+"']").attr("fill", $administStatsMap.ui.tileTempColor1);
												}
												$administStatsMap.ui.tileTempColor1 = $("rect[value='"+adm_cd+"']").attr("fill");
									    		$("rect[value='"+adm_cd+"']").attr("fill", "#0086c6"); // 2020-11-02 [곽제욱] 타일차트 색변경 추가
									    		// 2020-11-02 [곽제욱] 타일차트 색변경 추가 END
											}else if($administStatsMap.ui.curMapId == 0){
												var highLightAmdCd = $administStatsMap.ui.mapToggleId;
												// 맵토글ID 초기화
												$administStatsMap.ui.mapToggleId = "";
												$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight(highLightAmdCd);
												// 하이라이트 처리 후 맵토글ID 세팅
												$administStatsMap.ui.mapToggleId = highLightAmdCd;
												// 랭크이동시 mapToggleId를 초기화하고 하이라이트 처리
												if($administStatsMap.ui.tileTempColor!=""){
													$("rect[value='"+$administStatsMap.ui.mapToggleId+"']").attr("fill", $administStatsMap.ui.tileTempColor);
												}
												$administStatsMap.ui.tileTempColor = $("rect[value='"+adm_cd+"']").attr("fill");
									    		$("rect[value='"+adm_cd+"']").attr("fill", "#0086c6"); // 2020-11-02 [곽제욱] 타일차트 색변경 추가
									    		// 2020-11-02 [곽제욱] 타일차트 색변경 추가 END
											}
										}else{
											var highLightAmdCd = $administStatsMap.ui.mapToggleId;
											// 맵토글ID 초기화
											$administStatsMap.ui.mapToggleId = "";
											$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight(highLightAmdCd);
											// 하이라이트 처리 후 맵토글ID 세팅
											$administStatsMap.ui.mapToggleId = highLightAmdCd;
											// 랭크이동시 mapToggleId를 초기화하고 하이라이트 처리
											if($administStatsMap.ui.tileTempColor!=""){
												$("rect[value='"+$administStatsMap.ui.mapToggleId+"']").attr("fill", $administStatsMap.ui.tileTempColor);
											}
											$administStatsMap.ui.tileTempColor = $("rect[value='"+adm_cd+"']").attr("fill");
								    		$("rect[value='"+adm_cd+"']").attr("fill", "#0086c6"); // 2020-11-02 [곽제욱] 타일차트 색변경 추가
								    		// 2020-11-02 [곽제욱] 타일차트 색변경 추가 END
										}
							    		
							    		
									}
									// 2020-11-19 [곽제욱] 맵 그리기 완료 + 1초후 loading바 닫기 START
									setTimeout(function(){
										$administStatsMain.ui.loading(false);
										//$administStatsMain.ui.loading($administStatsMap.ui.isLoading);
										//$administStatsMap.ui.map.setPolyLayerHighlight($houseDash.polygonSelectArea);
										//$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight($houseDash.polygonSelectArea);
							    		//$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
									}, 500) // 2020-11-23 [곽제욱] 맵 그리기 완료 1초에서 0.5초로 수정
									// 2020-11-19 [곽제욱] 맵 그리기 완료 + 1초후 loading바 닫기 END
								});
							});
						}
						else{
							$administStatsMap.ui.isAtdrc = false;
							//$administStatsMap.ui.setAdministStatsData($administStatsMap.ui.map, "sgg", "color", lv_sido_cd, lv_sgg_cd, "", selectedParams, selectedKey, selectedCallback, function(p_list) {
							$administStatsMap.ui.setAdministStatsData($administStatsMap.ui.mapList[$administStatsMap.ui.curMapId], "sgg", "color", lv_sido_cd.substring(0,2), lv_sgg_cd, "", selectedParams, selectedKey, selectedCallback, function(p_list) {
								//리스트에서 unit 가져오기
								var lv_unit = "개";
								var lv_unit_nm = "수";
								
								//p_list = $administStatsMain.ui.areaSggData[$administStatsMain.ui.selectedArea];
								
								if(p_list != null && p_list.length > 0) {
									if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
									if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
								}

								//데이터 넣기
								//$administStatsMap.ui.map.setStatsData("normal", {"pAdmCd": lv_sido_cd, "result" : p_list}, "dt", lv_unit);
								$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setStatsData("normal", {"pAdmCd": lv_sido_cd.substring(0,2), "result" : p_list}, "dt", lv_unit);

								//경계 그리기
								var lv_region = "sgg"; //비자치구 여부 체크
								
								// 시군구레벨인 경우
								//$administStatsMap.ui.setAdministStatsRegion($administStatsMap.ui.map, lv_region, $administStatsMap.ui.getAdministStatsRegionYear(), lv_sido_cd, "", "", function() {
								//$administStatsMap.ui.setAdministStatsRegion($administStatsMap.ui.mapList[$administStatsMap.ui.curMapId], lv_region, $administStatsMap.ui.getAdministStatsRegionYear(), lv_sido_cd, "", "", function() {
								$administStatsMap.ui.setAdministStatsRegion($administStatsMap.ui.mapList[$administStatsMap.ui.curMapId], lv_region, $administStatsMap.ui.getAdministStatsRegionYear(), lv_sido_cd.substring(0,2), "", "", function() {
									//2020-12-01 [곽제욱] pathChange 로직 변경 START
									// $administStatsMain.ui.pathChange(lv_region, lv_sido_cd);

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
									//$administStatsMain.ui.pathChange(lv_region, tempRegionCd);

									//2020-12-01 [곽제욱] pathChange 로직 변경 END
									if($administStatsMain.ui.selectedThema == "신혼부부"){
										$administStatsMain.ui.selectedLevel = 2;
									}
									
									//if($administStatsMap.ui.mapToggleId != "" && $administStatsMap.ui.mapToggleId != null){
									if(mapToggleId != "" && mapToggleId != null){
							    		if($("#mapRgn_2").is(":visible")){
											if($administStatsMap.ui.curMapId == 1){
												var highLightAmdCd = $administStatsMap.ui.mapToggleId1;
												// 맵토글ID 초기화
												$administStatsMap.ui.mapToggleId1 = "";
												$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight(highLightAmdCd);
												// 하이라이트 처리 후 맵토글ID 세팅
												$administStatsMap.ui.mapToggleId1 = highLightAmdCd;
												// 랭크이동시 mapToggleId를 초기화하고 하이라이트 처리
												if($administStatsMap.ui.tileTempColor1!=""){
													$("rect[value='"+$administStatsMap.ui.mapToggleId1+"']").attr("fill", $administStatsMap.ui.tileTempColor1);
												}
												$administStatsMap.ui.tileTempColor1 = $("rect[value='"+adm_cd+"']").attr("fill");
									    		$("rect[value='"+adm_cd+"']").attr("fill", "#0086c6"); // 2020-11-02 [곽제욱] 타일차트 색변경 추가
									    		// 2020-11-02 [곽제욱] 타일차트 색변경 추가 END
											}else if($administStatsMap.ui.curMapId == 0){
												var highLightAmdCd = $administStatsMap.ui.mapToggleId;
												// 맵토글ID 초기화
												$administStatsMap.ui.mapToggleId = "";
												$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight(highLightAmdCd);
												// 하이라이트 처리 후 맵토글ID 세팅
												$administStatsMap.ui.mapToggleId = highLightAmdCd;
												// 랭크이동시 mapToggleId를 초기화하고 하이라이트 처리
												if($administStatsMap.ui.tileTempColor!=""){
													$("rect[value='"+$administStatsMap.ui.mapToggleId+"']").attr("fill", $administStatsMap.ui.tileTempColor);
												}
												$administStatsMap.ui.tileTempColor = $("rect[value='"+adm_cd+"']").attr("fill");
									    		$("rect[value='"+adm_cd+"']").attr("fill", "#0086c6"); // 2020-11-02 [곽제욱] 타일차트 색변경 추가
									    		// 2020-11-02 [곽제욱] 타일차트 색변경 추가 END
											}
										}else{
											var highLightAmdCd = $administStatsMap.ui.mapToggleId;
											// 맵토글ID 초기화
											$administStatsMap.ui.mapToggleId = "";
											$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight(highLightAmdCd);
											// 하이라이트 처리 후 맵토글ID 세팅
											$administStatsMap.ui.mapToggleId = highLightAmdCd;
											// 랭크이동시 mapToggleId를 초기화하고 하이라이트 처리
											if($administStatsMap.ui.tileTempColor!=""){
												$("rect[value='"+$administStatsMap.ui.mapToggleId+"']").attr("fill", $administStatsMap.ui.tileTempColor);
											}
											$administStatsMap.ui.tileTempColor = $("rect[value='"+adm_cd+"']").attr("fill");
								    		$("rect[value='"+adm_cd+"']").attr("fill", "#0086c6"); // 2020-11-02 [곽제욱] 타일차트 색변경 추가
								    		// 2020-11-02 [곽제욱] 타일차트 색변경 추가 END
										}
							    		
							    		
									}
									
									var polygonSelectArea = "";
									if($administStatsMap.ui.curMapId == 0){
										polygonSelectArea = $houseDash.polygonSelectArea;
									}else if($administStatsMap.ui.curMapId == 1){
										polygonSelectArea = $houseDash.polygonSelectArea1;
									}
									
									// 2020-11-19 [곽제욱] 맵 그리기 완료 + 1초후 loading바 닫기 START
									setTimeout(function(){
										$administStatsMain.ui.loading(false);
										//$administStatsMain.ui.loading($administStatsMap.ui.isLoading);
										//$administStatsMap.ui.map.setPolyLayerHighlight($houseDash.polygonSelectArea);
										//$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight($houseDash.polygonSelectArea);
							    		//$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
										/*
										$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight(polygonSelectArea);
							    		if($("#mapRgn_2").is(":visible")){
							    			if($administStatsMap.ui.curMapId == 1){
							    				$administStatsMap.ui.mapToggleId1 = $houseDash.polygonSelectArea1;
							    			}else{
							    				$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
							    			}
							    		}else{
							    			$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
							    		}
							    		*/
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

					//var zoomlevel = $administStatsMap.ui.map.zoom;
					var zoomlevel = $administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].zoom;
					var coord_x;
					var coord_y;


					var adm_cd = $administStatsMain.ui.selectedArea;
					console.log("[administStatsMap] ###  adm_cd = " + adm_cd);

					/** 시도별 zoom 설정 */
					switch (adm_cd.length) {
			            case 2:
			            	if($administStatsMain.ui.selectedLevel == "1" || $administStatsMain.ui.selectedLevel == "0") {
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
			            	} else if($administStatsMain.ui.selectedLevel == "2"){
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
					if($administStatsMap.ui.mapToggleId == "" ||$administStatsMap.ui.mapToggleId1 == ""){
						$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight("00");
					}
					console.log("zoomlevel = " + zoomlevel);
				}
				//열지도
				else if(p_map_type == "heat") {}
				//POI
				else if(p_map_type == "poi") {}
			},

			/**
			 *
			 * @name         : setAdministStatsData
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
			setAdministStatsData : function(p_map, p_region, p_type, p_sido_cd, p_sgg_cd, p_emdong_cd, selectedParams, selectedKey, selectedCallback, p_callback) {

				selectedKey = 'OV_L2_ID';
				
				//var res = chartData;
				
				var code = "";
				var resultMapData = {};
				if(typeof selectedCallback === "function") {
					resultMapData = selectedCallback(res);
				}else{
					var forResultMapData = {};
					resultMapData = {
						result : {
							mapData : []
						}
					};
					
					if(p_region == "sido"){
						var searchGubun = "";
						var tbl_id = $("#modalSearchTitle option:selected").data('tbl_id');
						if(tbl_id == "DT_1NW1003" || tbl_id == "DT_1NW1005" || tbl_id == "DT_1NW1006" || tbl_id == "DT_1NW1014"|| tbl_id == "DT_1NW1016"
						 || tbl_id == "DT_1NW1017" || tbl_id == "DT_1NW1018" || tbl_id == "DT_1NW1020" || tbl_id == "DT_1NW1021" || tbl_id == "DT_1NW1022" || tbl_id == "DT_1NW1023"
						 || tbl_id == "DT_1NW1024" || tbl_id == "DT_1NW1025" || tbl_id == "DT_1NW1026" || tbl_id == "DT_1NW1027" || tbl_id == "DT_1NW1028" || tbl_id == "DT_1NW1029"
						 || tbl_id == "DT_1NW1030" || tbl_id == "DT_1NW1031" || tbl_id == "DT_1NW1035" || tbl_id == "DT_1NW2003" || tbl_id == "DT_1NW2011" || tbl_id == "DT_1NW2013"
						 || tbl_id == "DT_1NW2014" || tbl_id == "DT_1NW2015" || tbl_id == "DT_1NW2017" || tbl_id == "DT_1NW2018" || tbl_id == "DT_1NW2019" || tbl_id == "DT_1NW2020"
						  || tbl_id == "DT_1NW2021" || tbl_id == "DT_1NW2022" || tbl_id == "DT_1NW2023" || tbl_id == "DT_1NW2025" || tbl_id == "DT_1NW2026" || tbl_id == "DT_1NW2027"
						   || tbl_id == "DT_1NW2028" || tbl_id == "DT_1NW3003" || tbl_id == "DT_1NW3011" || tbl_id == "DT_1NW3013" || tbl_id == "DT_1NW3014" || tbl_id == "DT_1NW3015"
						    || tbl_id == "DT_1NW3017" || tbl_id == "DT_1NW3018" || tbl_id == "DT_1NW3019" || tbl_id == "DT_1NW3020" || tbl_id == "DT_1NW3021" || tbl_id == "DT_1NW3022"
						     || tbl_id == "DT_1NW3023" || tbl_id == "DT_1NW3025" || tbl_id == "DT_1NW3026" || tbl_id == "DT_1NW3027" || tbl_id == "DT_1NW3028") {
							searchGubun = "2";	//특성별목록이면 시도별 데이터만 조회
						}
						//for(var i=0; i<sidoValues.length; i++){
						for(var i=0; i<sidoValuesDesc.length; i++){
							/*if($('.modal-location').is(":visible")){
								if(i > Number($("#RankText").text().substring(0, $("#RankText").text().length-1))-1){
									break;
								}
							}*/
							var forMapData = {};
								forMapData.adm_cd = sidoValuesDesc[i].id;
								//forMapData.region_nm = sidoCategories[i];
								//forMapData.dt = sidoValues[i].y;
								forMapData.region_nm = sidoValuesDesc[i].name;
								forMapData.dt = sidoValuesDesc[i].y;
							resultMapData.result.mapData.push(forMapData);
						}
						code = "00";
					}else if(p_region == "sgg"){
						$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea;
						
						if($administStatsMain.ui.selectedArea == "") {
							$administStatsMain.ui.selectedArea = "00";
						}
						
						let dispOpt = $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()];
						
						let param = {
							surv_year_list: $("#modalSearchYear option:selected").val() // 수록시점
						   	, org_id_list: "101" // 조직번호
						   	, tbl_id_list: $("#modalSearchTitle option:selected").data("tbl_id") // 통계표 ID
						   	, list_var_ord_list: "" // 차트화 할 대상 T20, T21, T22, T31, T32, T41,
						   	, prt_type: "part" // 출력방식 total:합계, part
						   	, char_itm_id_list: "" // 표특성항목
						   	, adm_cd: "" // 지역코드
						   	, adm_unit: "" // 지역단위
						   	, ov_l1_list: "" // 항목 1
						   	, ov_l2_list: "" // 항목 2
						   	, ov_l3_list: "" // 항목 3
						   	, ov_l4_list: "" // 항목 4
						   	, ov_l5_list: "" // 항목 5
						   	, category: "" // 카테고리 sido, sgg
						   	, orderby: "DTVAL_CO"
						};
						
						fn_bindItmList(dispOpt, param);
						let regionVarId = "ov_l" + dispOpt[0].regionVarOrd + "_list";
						let dispVarId = "", stackVarId = "";
						if(dispOpt[0].dispVarOrd == 0) {
							dispVarId = "char_itm_id_list";
						} else {
							dispVarId = "ov_l" + dispOpt[0].dispVarOrd + "_list";
						}
						
						if(dispOpt[0].stackVarOrd == 0) {
							stackVarId = "char_itm_id_list";
						} else {
							stackVarId = "ov_l" + dispOpt[0].stackVarOrd + "_list";
						}
						
						var searchGubun = "";
						var tbl_id = $("#modalSearchTitle option:selected").data('tbl_id');
						if(tbl_id == "DT_1NW1003" || tbl_id == "DT_1NW1005" || tbl_id == "DT_1NW1006" || tbl_id == "DT_1NW1014"|| tbl_id == "DT_1NW1016"
						 || tbl_id == "DT_1NW1017" || tbl_id == "DT_1NW1018" || tbl_id == "DT_1NW1020" || tbl_id == "DT_1NW1021" || tbl_id == "DT_1NW1022" || tbl_id == "DT_1NW1023"
						 || tbl_id == "DT_1NW1024" || tbl_id == "DT_1NW1025" || tbl_id == "DT_1NW1026" || tbl_id == "DT_1NW1027" || tbl_id == "DT_1NW1028" || tbl_id == "DT_1NW1029"
						 || tbl_id == "DT_1NW1030" || tbl_id == "DT_1NW1031" || tbl_id == "DT_1NW1035" || tbl_id == "DT_1NW2003" || tbl_id == "DT_1NW2011" || tbl_id == "DT_1NW2013"
						 || tbl_id == "DT_1NW2014" || tbl_id == "DT_1NW2015" || tbl_id == "DT_1NW2017" || tbl_id == "DT_1NW2018" || tbl_id == "DT_1NW2019" || tbl_id == "DT_1NW2020"
						  || tbl_id == "DT_1NW2021" || tbl_id == "DT_1NW2022" || tbl_id == "DT_1NW2023" || tbl_id == "DT_1NW2025" || tbl_id == "DT_1NW2026" || tbl_id == "DT_1NW2027"
						   || tbl_id == "DT_1NW2028" || tbl_id == "DT_1NW3003" || tbl_id == "DT_1NW3011" || tbl_id == "DT_1NW3013" || tbl_id == "DT_1NW3014" || tbl_id == "DT_1NW3015"
						    || tbl_id == "DT_1NW3017" || tbl_id == "DT_1NW3018" || tbl_id == "DT_1NW3019" || tbl_id == "DT_1NW3020" || tbl_id == "DT_1NW3021" || tbl_id == "DT_1NW3022"
						     || tbl_id == "DT_1NW3023" || tbl_id == "DT_1NW3025" || tbl_id == "DT_1NW3026" || tbl_id == "DT_1NW3027" || tbl_id == "DT_1NW3028") {
							searchGubun = "2";	//특성별목록이면 시도별 데이터만 조회
						}
						
						if($houseDash.isChange) {
							if(chartMode == "sido") {
								param[regionVarId] = "up:00";
							} else {
								param[regionVarId] = "up:" + $administStatsMain.ui.selectedArea.substring(0,2);
							}
						} else {
							if(chartMode == "sgg") {
								param[regionVarId] = "up:" + $administStatsMain.ui.selectedArea.substring(0,2);
							}
						}
						
						for(let i=0; i<dispOpt.length; i++) {
							if(dispOpt[i].varOrd == dispOpt[0].dispVarOrd) {
								if($houseDash.chartItmClick != "") {
									if(dispOpt[i].itmId == $houseDash.chartItmClick) {
										param[dispVarId] = dispOpt[i].itmId;
									}
								} else {
									if(dispOpt[i].subsumYn == "Y") {
										param[dispVarId] = dispOpt[i].itmId;
									}
								}
							}
						}
						for(let i=0; i<dispOpt.length; i++) {
							if(dispOpt[i].varOrd == dispOpt[0].stackVarOrd) {
								if($houseDash.chartStackItmClick != "") {
									if(dispOpt[i].itmId == $houseDash.chartStackItmClick) {
										param[stackVarId] = dispOpt[i].itmId;
									}
								} else {
									if(dispOpt[i].subsumYn == "Y") {
										param[stackVarId] = dispOpt[i].itmId;
									}
								}
							}
						}
						
						$.ajax({
							method: "GET",
							async: false,	// 반드시 동기처리 해야 함
							//url: "/view/kosisApi/TotsurvStatData.do",
							url: sgis4thApiPath,
							data: param, // 
							dataType: "json",
							success: function(res) {
								//2021-08-09 [이영호] 비율계산을 위한 맵데이터값 계산로직 START 경총
								//if(res[0].ADM_CD.length == 2) {
									$administStatsMap.ui.mapTotalVal = 0;
									if(res[0]["OV_L" + dispOpt[0].regionVarOrd + "_ID"] == "00") {
										$administStatsMap.ui.mapTotalVal = parseFloat(res[0].DTVAL_CO);
									} else {
										for(var i=0; i<res.length; i++) {
											$administStatsMap.ui.mapTotalVal += parseFloat(res[i].DTVAL_CO);
										}
									}
								//}
								
								
								for(var i=0; i<res.length; i++) {
									var forMapData = {};
									forMapData.adm_cd = res[i]["OV_L" + dispOpt[0].regionVarOrd + "_ID"];
									forMapData.region_nm = res[i]["OV_L" + dispOpt[0].regionVarOrd + "_KOR"];
									forMapData.dt = res[i].DTVAL_CO;
									resultMapData.result.mapData.push(forMapData);
								}
							},
							error: function(e) {
								//$administStatsMain.ui.alert(errorMessage);
							}
						});
					}
					
					/**
					for (var i = 0; i < res.length; i++) {
						if (typeof forResultMapData[res[i].OV_L1_ID] == "undefined") {
							forResultMapData[res[i].OV_L1_ID] = new Object();
						}
						forResultMapData[res[i].OV_L1_ID][res[i][selectedKey]] = res[i];
					}

					for ( var key1 in forResultMapData) {
						var forMapData = {};
						for ( var key2 in forResultMapData[key1]) {
							forMapData.adm_cd = forResultMapData[key1][key2].OV_L1_ID;
							forMapData.region_nm = forResultMapData[key1][key2].OV_L1_KOR;
							if(forMapData.dt){
								forMapData.dt = parseFloat(forMapData.dt) + parseFloat(forResultMapData[key1][key2].DTVAL_CO);	
							}else{
								forMapData.dt = forResultMapData[key1][key2].DTVAL_CO;
							}
							
						}
						resultMapData.result.mapData.push(forMapData);
					}
					*/
				}

				// 2020-11-18 [곽제욱] 비율계산을 위한 맵데이터값 계산로직 START
				$administStatsMap.ui.mapTotalVal = 0;
				var totalArray = resultMapData.result.mapData;
				for(var i=0; i<totalArray.length; i++){
					//if(totalArray[i].adm_cd != "00"){
					//if(totalArray[i].adm_cd != code){
						$administStatsMap.ui.mapTotalVal += parseFloat(totalArray[i].dt);
					//}
				}

				//콜백함수 호출
				if(typeof p_callback === "function") {
					p_callback(resultMapData.result.mapData);
				}
				/**
				$.ajax({
					method : "POST",
					async : false, // 반드시 동기처리 해야 함
					//url : contextPath + "/view/kosisApi/TotsurvStatData.do",
					url: sgis4thApiPath,
					data : selectedParams,
					dataType : "json",
					error : function(e) {
						alert('failed');
					}
				}).always(function(res) { // 전 처리
					if($("#"+p_map.id+"_loading").length) {
						$("#"+p_map.id+"_loading").hide();
					}
				}).done(function (res) { // 완료
					if (res.length > 0) {
						var resultMapData = {};
						if(typeof selectedCallback === "function") {
							resultMapData = selectedCallback(res);
						}else{
							var forResultMapData = {};
							resultMapData = {
								result : {
									mapData : []
								}
							};

							for (var i = 0; i < res.length; i++) {
								if (typeof forResultMapData[res[i].OV_L1_ID] == "undefined") {
									forResultMapData[res[i].OV_L1_ID] = new Object();
								}
								forResultMapData[res[i].OV_L1_ID][res[i][selectedKey]] = res[i];
							}

							for ( var key1 in forResultMapData) {
								var forMapData = {};
								for ( var key2 in forResultMapData[key1]) {
									forMapData.adm_cd = forResultMapData[key1][key2].OV_L1_ID;
									forMapData.region_nm = forResultMapData[key1][key2].OV_L1_KOR;
									forMapData.dt = forResultMapData[key1][key2].DTVAL_CO;
								}
								resultMapData.result.mapData.push(forMapData);
							}
						}

						// 2020-11-18 [곽제욱] 비율계산을 위한 맵데이터값 계산로직 START
						$administStatsMap.ui.mapTotalVal = 0;
						var totalArray = resultMapData.result.mapData;
						for(var i=0; i<totalArray.length; i++){
							if(totalArray[i].adm_cd != "00"){
								$administStatsMap.ui.mapTotalVal += parseFloat(totalArray[i].dt);
							}
						}

						//콜백함수 호출
						if(typeof p_callback === "function") {
							p_callback(resultMapData.result.mapData);
						}
					}
				});
				*/
			},

			/**
			 *
			 * @name         : setAdministStatsRegion
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
			setAdministStatsRegion : function(p_map, p_region, p_base_year, p_sido_cd, p_sgg_cd, p_emdong_cd, p_callback) {
				//년도 입력이 들어왔는데 bndYear 보다 큰 경우 bndYear 사용
				if(p_base_year != undefined && p_base_year != null && p_base_year != "" && p_base_year > bndYear) {
					p_base_year = $administStatsMain.ui.selectedYear;
				}

				//시도의 경우 js파일을 사용하기 떄문에 년도를 넣어야함
				if(p_region == "sido"  || p_region == "sgg") {
					//년도 입력 안들어온경우 common.js bndYear 사용
					if(p_base_year == undefined || p_base_year == null || p_base_year == "") {
						p_base_year = $administStatsMain.ui.selectedYear;
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
						$administStatsMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd] = p_res;

						//로딩바 숨김
						if($administStatsMain.ui.currentPageName == "administStatsMap" && p_map.id == "administStatsMapMap") {
							$administStatsMain.ui.loading(false);
						}
						if($("#"+p_map.id+"_loading").length) {
							$("#"+p_map.id+"_loading").hide();
						}

						var xcoor = 957594;
						var ycoor = 1780541;
						var zoomLevel;
						zoomLevel = 1;
						//20201102 박은식 줌아웃 시 상위지역 코드가 전국 일 경우 줌 level 을 1로 변경 START
						/*if($administStatsMain.ui.selectedArea == "00"){
							zoomLevel = 1;
						} else {
							//zoomLevel = $administStatsMap.ui.map.zoom;
							zoomLevel = $administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].zoom;
						}*/

		                if($administStatsMain.ui.selectedLevel == "0"){
		                	xcoor = 957594;
							ycoor = 1780541;
		                }
						//20201102 박은식 줌아웃 시 상위지역 코드가 전국 일 경우 줌 level 을 1로 변경 END
						p_map.mapMove([xcoor, ycoor], zoomLevel, true);

						//콜백함수 호출
				    	if(typeof p_callback === "function") {
							p_callback();
						}
				    	//$administStatsMain.ui.loading(false); // 2020-10-14 [곽제욱] 맵 그리기 완료후 loading바 닫기 // 2020-11-19 [곽제욱] 주석처리
					});
				}else{
					var params = {};
					params.region = p_region;
					
					// 시군구 경계 (비자치구)
					if(p_region == "sgg"){
						params.region = "atdrc";
						$administStatsMap.ui.isAtdrc = false;
					}	
					
					params.base_year = $administStatsMain.ui.selectedYear;
					
					if(p_sido_cd.length==5){
						if($administStatsMap.ui.mapToggleId != null && $administStatsMap.ui.mapToggleId != ""){
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
					    data: {year:$administStatsMain.ui.selectedYear, region_cd:tempAdmCd},
						dataType: "json",
					}).done(function (res) { // 완료
						if(res.errCd == "0") {
							console.log("################# res = " + res.result.rslt);
							$administStatsMap.ui.isAtdrc = res.result.rslt;
						}
					});
					
					if($houseDash.isChange) {
						if($houseDash.areaMode == "sido") {
							
						} else {
							params.sido_cd = $administStatsMain.ui.selectedArea.substring(0,2);
						}
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
							$administStatsMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+p_sido_cd+p_sgg_cd] = res;
							//경계그리기
							p_map.setPolygonDataGeojson(res);
						}else if(res.errCd == "-401") {
							//$administStatsMain.ui.alert(res.errMsg);
						}else{
							//$administStatsMain.ui.alert(res.errMsg);
						}
					}).fail(function (res) { // 실패
						//$administStatsMain.ui.alert(errorMessage);
					}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)

						if($("#"+p_map.id+"_loading").length) {
							$("#"+p_map.id+"_loading").hide();
						}
						
						//콜백함수 호출
				    	if(typeof p_callback === "function") {
							p_callback();
						}
				    	//$administStatsMain.ui.loading(false); // 2020-10-14 [곽제욱] 맵 그리기 완료후 loading바 닫기 // 2020-11-19 [곽제욱] 주석처리
					});
					// ajax 끝
				}
				
			},

			/**
			 *
			 * @name         : getAdministStatsRegionYear
			 * @description  : 지도 경계 년도 가져오기
			 * @date         : 2020. 08. 13.
			 * @author	     : 곽제욱
			 * @history 	 :
			 * @param
			 */
			getAdministStatsRegionYear : function() {
				if($administStatsMap.ui.mapData == null) {
					return $administStatsMain.ui.selectedYear; // 2020-12-02 [곽제욱] 맵 조회 년도 selectedYear 로 변경
				}
				var lv_data = $administStatsMap.ui.mapData.data;
				var lv_year = $administStatsMain.ui.selectedYear; // 2020-12-02 [곽제욱] 맵 조회 년도 selectedYear 로 변경
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
				$administStatsMain.ui.log("$administStatsMap.ui.openApiBoundarySido - begin");
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

						  $administStatsMap.ui.map = $administStatsMap.ui.mapList[$administStatsMap.ui.curMapId];

						  $administStatsMap.ui.map.mapMove([989674, 1818313], 2);

						  $administStatsMap.ui.lastGeojsonInfo = tmpOption ;
						  $administStatsMap.ui.setPolygonDataGeojson(res);

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
				$administStatsMain.ui.log("$administStatsMap.ui.setPolygonDataGeojson - begin");

				var that = $administStatsMap.ui;

				if(that.MapData.length > 0){
					geoData = this.combineAdministStatsData(geoData);
				}

				// res = combineAdministStatsData(res);
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

			combineAdministStatsData : function (boundData, isPass) {// used
				$administStatsMain.ui.log("$administStatsMap.ui.combineAdministStatsData - begin");

				this.data = $administStatsMap.ui.MapData;
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
					//center = $administStatsMap.ui.map.gMap.getCenter();
					center = $administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].gMap.getCenter();
					x = center.x;
					y = center.y;
				}
				//$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].mapMove([x, y], $administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].zoom);
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
						target : $administStatsMap.ui
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
				$administStatsMap.ui.isAtdrc = false;
				// 비자치구 여부 체크
				if(admCd != undefined && admCd.length == 5){
					var tmpSido = admCd.substring(0,2);


					// ajax 시작
					$.ajax({
						method: "POST",
						async: false,	// 반드시 동기처리 해야 함
						url: contextPath + "/ServiceAPI/administStats/common/getAtdrcCheck.json",
					    data: {year:$administStatsMain.ui.selectedYear, region_cd:admCd},
						dataType: "json",
					}).done(function (res) { // 완료
						if(res.errCd == "0") {
							console.log("################# res = " + res.result.rslt);
							$administStatsMap.ui.isAtdrc = res.result.rslt;
						}
					});

				}
				else{
					$administStatsMap.ui.isAtdrc = false;
				}
			}
	};

	// ==============================//
	// map event callback
	// ==============================//
	$administStatsMap.callbackFunc = {

			// 맵이동 시작시, 콜백 호출
			didMapMoveStart : function(event, map) {
				console.log("[administStatsMap.js] didMapMoveStart 호출");
			},

			// 맵이동 종료시, 콜백 호출
			didMapMoveEnd : function(event, map) {
				$houseDash.event.clearSelection();
				console.log("[administStatsMap.js] didMapMoveEnd 호출");
				console.log("[administStatsMap.js] didMapMoveEnd() $administStatsMap.ui.dropBtnInfo[map.id] [" + $administStatsMap.ui.dropBtnInfo[map.id]);

			},

			// 맵 줌시작 시, 콜백 호출
			didMapZoomStart : function(event, map) {
			},

			// 맵 줌 종료 시, 콜백 호출
			didMapZoomEnd : function(event, map) {
				console.log(">>>> didMapZoomEnd <<<");
				//줌 인, 아웃시 시도, 시군구조회 기능 없앰
				return false;
				if($("#modalSearchTitle option:selected").val() == null){
					return false;
				}
				//if(Object.keys($administStatsMap.ui.mapCenter).length == 0 && chkRegionEnd == "시군구"){
				if($administStatsMap.ui.mapCenter['x'] == 0 && $administStatsMap.ui.mapCenter['y'] == 0 && chkRegionEnd == "시군구"){
					$administStatsMap.ui.mapCenter = {};
					return false;
				}
				var lv_map_region_before = $administStatsMap.ui.mapRegion;
				
				//맵분할 변수
				var mapToggleId = "";
				if($("#mapRgn_2").is(":visible")){
					if(map.id == 1){
						$administStatsMap.ui.curMapId = map.id;
						mapToggleId = $administStatsMap.ui.mapToggleId1;
					}else if(map.id == 0){
						$administStatsMap.ui.curMapId = map.id;
						mapToggleId = $administStatsMap.ui.mapToggleId;
					}
				}else{
					$administStatsMap.ui.curMapId = map.id;
					mapToggleId = $administStatsMap.ui.mapToggleId;
				}
				
				if(mapToggleId == "" || mapToggleId.length == 2){
					$administStatsMap.ui.mapRegion = "sido";
				}else if(mapToggleId.length == 5){
					$administStatsMap.ui.mapRegion = "sgg";
				}else if(mapToggleId.length == 7){
					$administStatsMap.ui.mapRegion = "emdong";
				}else{
					$administStatsMap.ui.mapRegion = "country";
				}
				
				//var lv_zoom = $administStatsMap.ui.map.zoom;
				var lv_zoom = $administStatsMap.ui.mapList[map.id].zoom;
				console.log("lv_zoom = " + lv_zoom);
				var prevZoom = $administStatsMap.ui.prevZoom;
				
				// 줌레벨이 같을경우 경계 재조회 막음(드래그 이동시 이벤트 X)
				if(prevZoom != lv_zoom){

					// 개방형 지도가 아닐경우에만  getCenterToAdmCd 안타도록 개선
					//if($(".mapInfo").css('display') == "none" || $(".mapInfo").css('display') == undefined){ // 2020-10-13 [곽제욱] 개방형지도 로직 변경으로 인한 조건문 처리
						if(map.mouseOverAdmCd != null || map.mouseOverAdmCd != undefined ) {
							if($administStatsMap.ui.mapRegion == "" || $administStatsMap.ui.mapRegion == "sido"){
								for(var m = 0; m < $administStatsMain.ui.areaSidoData["00"].length; m++){
									if($administStatsMain.ui.areaSidoData["00"][m].sido_cd == map.mouseOverAdmCd){
										$administStatsMap.ui.mapCenter['x'] = $administStatsMain.ui.areaSidoData["00"][m].x_coor;
										$administStatsMap.ui.mapCenter['y'] = $administStatsMain.ui.areaSidoData["00"][m].y_coor;
										break;
									}
								}
							}else{
								if($administStatsMain.ui.areaSggData[map.mouseOverAdmCd.substring(0, 2)] != null){
									for(var m = 0; m < $administStatsMain.ui.areaSggData[map.mouseOverAdmCd.substring(0, 2)].length; m++){
										if($administStatsMain.ui.areaSggData[map.mouseOverAdmCd.substring(0, 2)][m].sgg_cd == map.mouseOverAdmCd.substring(2, 5)){
											$administStatsMap.ui.mapCenter['x'] = $administStatsMain.ui.areaSggData[map.mouseOverAdmCd.substring(0, 2)][m].x_coor;
											$administStatsMap.ui.mapCenter['y'] = $administStatsMain.ui.areaSggData[map.mouseOverAdmCd.substring(0, 2)][m].y_coor;
											break;
										}
									}
								}else{
									for(var m = 0; m < $administStatsMain.ui.areaSidoData["00"].length; m++){
										if($administStatsMain.ui.areaSidoData["00"][m].sido_cd == map.mouseOverAdmCd){
											$administStatsMap.ui.mapCenter['x'] = $administStatsMain.ui.areaSidoData["00"][m].x_coor;
											$administStatsMap.ui.mapCenter['y'] = $administStatsMain.ui.areaSidoData["00"][m].y_coor;
											break;
										}
									}
								}
							}
						}
						var center = new Array();
						center[0]  = $administStatsMap.ui.mapCenter['x'];
						center[1] = $administStatsMap.ui.mapCenter['y'];
						console.log(center);
						//$administStatsMap.ui.getCenterToAdmCd($administStatsMap.ui.map.gMap.getCenter(), function(res) {
						$administStatsMap.ui.getCenterToAdmCd(center, function(res) {
							$administStatsMain.ui.tileChangeYn = "Y";
							//var lv_from_sido_cd = $("#dash_sido").val();
							//var lv_from_sgg_cd = $("#dash_sgg").val();
							//var lv_from_emdong_cd = $("#dash_emdong").val();
							var lv_to_sido_cd = "";
							var lv_to_sgg_cd = "";
							var lv_to_emdong_cd = "";

							// center이 없을경우 맵 그리기 취소
							if(res.result == undefined) {
								$("#dash_sido").val("99");
								$("#dash_sgg").val("999");
								//$administStatsMain.ui.pathChange("nationwide", "00");
								//$administStatsMap.ui.map.zoom = "1";
								$administStatsMap.ui.mapList[map.id].setZoom(1);

								$administStatsMain.ui.selectedArea = "00";
								var selectedThema = $administStatsMain.ui.selectedThema;
								// 각 주제별 차트 변화함수 호출
								if(selectedThema == "신혼부부"){
									//$newlyDash.event.allChange("00", "1");
									//20201008 박은식 줌아웃, path 초기화 시 해당 rank 지역정보를 전국으로 변경 START
									//$("#genderRanking").html("전국의 남녀 성비");
									//$("#foreignRanking").html("전국의 외국인 수");
									//20201008 박은식 줌아웃, path 초기화 시 해당 rank 지역정보를 전국으로 변경 END
								}
								else if(selectedThema == "가구"){
									//$houseHoldDash.event.allChange("00", "1");
								}
								else if(selectedThema == "주택소유"){
									//$houseDash.event.allChange("00", "1");
								}
								lv_to_sido_cd = $("#dash_sido").val();
								lv_to_sgg_cd = $("#dash_sgg").val()
								lv_to_emdong_cd = $("#dash_emdong").val()
								return;
							}  else {
								if( (map.id == 0 && $administStatsMap.ui.mapToggleId != '') || (map.id == 1 && $administStatsMap.ui.mapToggleId1 != '')  ){
									var dt = 0;
									var msg = "";
									for(var i=0; i < map.dataForCombine.result.length; i++){
										var code = "";
										if($administStatsMap.ui.mapRegion == "sido"){
											code = res.result.sido_cd;
										}else if($administStatsMap.ui.mapRegion == "sgg"){
											code = res.result.sgg_cd;
										}else if($administStatsMap.ui.mapRegion == "emdong"){
											code = res.result.emdong_cd;
										}
										if(code == map.dataForCombine.result[i].adm_cd){
											dt = map.dataForCombine.result[i].dt;
											msg = map.dataForCombine.result[i].region_nm;
										}
									}
									/*if(dt == 0){
										alert(msg + " 데이터가 존재하지 않습니다.");
										return false;
									}*/
								}
								//if(!$houseDash.searchParamReset){
									console.log(res.result);
									lv_to_sido_cd = res.result.sido_cd;
									lv_to_sgg_cd = res.result.sgg_cd;
									lv_to_emdong_cd = res.result.emdong_cd;
								//}
								if(lv_map_region_before == "sgg" && ((map.id == 0 && $administStatsMap.ui.mapToggleId == '') || (map.id == 1 && $administStatsMap.ui.mapToggleId1 == '')) ){
									lv_to_sido_cd = "";
									lv_to_sgg_cd = "";
									lv_to_emdong_cd = "";
								}
							}

							var lv_sido_change_yn = "N";
							var lv_sgg_change_yn = "N";
							var lv_emdong_change_yn = "N";
							var lv_atdrc_change_yn = "N"; // 2020-11-11 [곽제욱] 비자치구 경계 체크로직 추가
							//if(lv_from_sido_cd != lv_to_sido_cd) lv_sido_change_yn = "Y";
							//if(lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd != lv_to_sgg_cd) lv_sgg_change_yn = "Y";
							//if(lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd.substring(0,2) != lv_to_sgg_cd.substring(0,2)) lv_atdrc_change_yn = "Y"; // 2020-11-11 [곽제욱] 비자치구 경계 체크로직 추가
							//if(lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd != lv_to_sgg_cd || lv_from_emdong_cd != lv_to_emdong_cd) lv_emdong_change_yn = "Y";

							if(lv_sido_change_yn == "Y" || lv_sgg_change_yn == "Y" || lv_emdong_change_yn == "Y") {
								//접속지역 변경
								//2020-02-13 [김남민] 관심지역 행정구역이 사라지는 현상이 있습니다.
								//$administStatsMain.ui.getAreaSido(res.result.sido_cd);
								//$administStatsMain.ui.getAreaSgg(res.result.sido_cd, res.result.sgg_cd);
								$administStatsMain.ui.getSidoSggPos(res.result.sido_cd + "" + res.result.sgg_cd);
							}
							var adm_cd = lv_to_sido_cd;
							var sggZoom;
							var zoomLevel; // 2020-10-13 [곽제욱] zoomlevel 추가
							/** 시도별 zoom 설정 */
							switch (adm_cd.length) {
								case 2:
									//20201103 박은식 인구를 제외한 대시보드 지역 zoom level 재설정 START
									if($administStatsMain.ui.selectedThema == "신혼부부"){
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
							$administStatsMain.ui.chartSaveClear();//20201120 박은식 chart 선택 초기화(맵 줌인 줌아웃 시 차트가 유지되어 타일맵 색상이 비장상적으로 출력되는 문제 발생)
							//전국
							if(lv_zoom < sggZoom) {
								//이미 같은 전국이면 조회 안함
								if($administStatsMap.ui.mapRegion != "sido") {
									$administStatsMain.ui.selectedLevel = "0";
									//전국 조회
									$("#dash_sido").val("99");
									$("#dash_sgg").val("999");
									$administStatsMain.ui.selectedArea = "00";
									$administStatsMain.ui.pathChange("nationwide", "00");
									
									var selectedThema = $administStatsMain.ui.selectedThema;
									// 각 주제별 차트 변화함수 호출
									$administStatsMain.ui.selectedLevel = "0";
									if(selectedThema == "신혼부부"){
										//$newlyDash.event.allChange("00", "1");
										//20201008 박은식 줌아웃, path 초기화 시 해당 rank 지역정보를 전국으로 변경 START
										//$("#genderRanking").html("전국의 남녀 성비");
										//$("#foreignRanking").html("전국의 외국인 수");
										//20201008 박은식 줌아웃, path 초기화 시 해당 rank 지역정보를 전국으로 변경 END
									}
									//20201020 박은식 주택 분기 추가 START
									else if(selectedThema == "주택소유"){
										//$houseDash.event.allChange("00", "1");
										//$("#houseRatioRanking").html("전국의 주택 증감율");
										//$("#emptyRanking").html("전국의 빈집의 수");
									}
									//20201020 박은식 주택 분기 추가 END
									else if(selectedThema == "중장년층"){
										//$middlDash.event.allChange("00", "1");
									}
									//20201022 박은식 귀농·귀어·귀촌, 통계더보기 분기처리 추가 START
									else if(selectedThema == "귀농·귀어·귀촌"){
										//$retunDash.event.allChange("00", "1");
										//$("#oldForestryRanking").html("전국의 임가 인구 중 고령인구");
										//$("#retunHouseRanking").html("전국의 임가(가구) 수");
									}
									else if(selectedThema == "통계더보기"){
										//$moresDash.event.allChange("00", "1");
										//$("#oldFisheryRanking").html("전국의 어가 인구 중 고령인구");
										//$("#moresHouseRanking").html("전국의 어가(가구) 수");
									}
									//20201022 박은식 귀농·귀어·귀촌, 통계더보기 분기처리 추가 END
									
									//chart그리기
									var chartOrd = $("#modalSearchTitle option:selected").val();
									var year = $("#modalSearchYear option:selected").val();
									var item_id = $("#modalSearchTitle option:selected").data('item_id');
									var regin_var_ord = $("#modalSearchTitle option:selected").data('region_var_ord');
									var obj_var_id = $("#modalSearchTitle option:selected").data('obj_var_id');
									var disp_obj_var_id = $("#modalSearchTitle option:selected").data('disp_obj_var_id');
									var var_ord = $("#modalSearchTitle option:selected").data('var_ord');
		
									var	region_code = "00";
									//var	region_code = lv_to_sido_cd;
									var sgg_code = '';
									var emdong_code = '';
									
									//if($("#modalSearchTitle option:selected").text().indexOf($(".toggle.on").text().replace('전체', '').trim()+' 특성별') > -1){
									var tbl_id = $("#modalSearchTitle option:selected").data('tbl_id');
									if(tbl_id == "DT_1NW1003" || tbl_id == "DT_1NW1005" || tbl_id == "DT_1NW1006" || tbl_id == "DT_1NW1014"|| tbl_id == "DT_1NW1016"
									 || tbl_id == "DT_1NW1017" || tbl_id == "DT_1NW1018" || tbl_id == "DT_1NW1020" || tbl_id == "DT_1NW1021" || tbl_id == "DT_1NW1022" || tbl_id == "DT_1NW1023"
									  || tbl_id == "DT_1NW1024" || tbl_id == "DT_1NW1025" || tbl_id == "DT_1NW1026" || tbl_id == "DT_1NW1027" || tbl_id == "DT_1NW1028" || tbl_id == "DT_1NW1029"
									   || tbl_id == "DT_1NW1030" || tbl_id == "DT_1NW1031" || tbl_id == "DT_1NW1035" || tbl_id == "DT_1NW2003" || tbl_id == "DT_1NW2011" || tbl_id == "DT_1NW2013"
									    || tbl_id == "DT_1NW2014" || tbl_id == "DT_1NW2015" || tbl_id == "DT_1NW2017" || tbl_id == "DT_1NW2018" || tbl_id == "DT_1NW2019" || tbl_id == "DT_1NW2020"
									     || tbl_id == "DT_1NW2021" || tbl_id == "DT_1NW2022" || tbl_id == "DT_1NW2023" || tbl_id == "DT_1NW2025" || tbl_id == "DT_1NW2026" || tbl_id == "DT_1NW2027"
									   	  || tbl_id == "DT_1NW2028" || tbl_id == "DT_1NW3003" || tbl_id == "DT_1NW3011" || tbl_id == "DT_1NW3013" || tbl_id == "DT_1NW3014" || tbl_id == "DT_1NW3015"
									       || tbl_id == "DT_1NW3017" || tbl_id == "DT_1NW3018" || tbl_id == "DT_1NW3019" || tbl_id == "DT_1NW3020" || tbl_id == "DT_1NW3021" || tbl_id == "DT_1NW3022"
										    || tbl_id == "DT_1NW3023" || tbl_id == "DT_1NW3025" || tbl_id == "DT_1NW3026" || tbl_id == "DT_1NW3027" || tbl_id == "DT_1NW3028"){
										region_code = "2"+ region_code;
									}
									
									$('.tag_sido').text(res.result.sido_nm);
									if(!$("#sidoClose").is(":visible")){
										$('.tag-item').append('<button class="tag-del" id="sidoClose" onclick="javascript: modalSearchBtn();">');
									}
									if(map.id == 1){
										getChartsData(chartOrd, year, item_id, regin_var_ord, obj_var_id, disp_obj_var_id, var_ord, region_code, sgg_code, emdong_code);
										if(lv_to_sido_cd != $administStatsMap.ui.mapToggleId1){
											//종심지역으로 지도 이동
											//$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].mapMove([$administStatsMap.ui.mapCenter['x'], $administStatsMap.ui.mapCenter['y']], lv_zoom, false);
											$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기
											$administStatsMap.ui.mapToggleId1 = res.result.sido_cd; // 2020-10-15 [곽제욱] 맵토글ID 초기화
											$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight(res.result.sido_cd);
										}
										$administStatsMap.ui.mapToggleId1 = ""; // 2020-10-15 [곽제욱] 맵토글ID 초기화
										//$houseDash.polygonSelectedAreaNm1 = res.result.sido_nm;
										//$houseDash.polygonSelectArea1 = res.result.sido_cd;
										$houseDash.polygonSelectedAreaNm = "";
										$houseDash.polygonSelectArea = "";
										$houseDash.chartItmClick1 = "";
									}else if(map.id == 0){
										getChartsData(chartOrd, year, item_id, regin_var_ord, obj_var_id, disp_obj_var_id, var_ord, region_code, sgg_code, emdong_code);
										if(lv_to_sido_cd != $administStatsMap.ui.mapToggleId){
											//종심지역으로 지도 이동
											//$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].mapMove([$administStatsMap.ui.mapCenter['x'], $administStatsMap.ui.mapCenter['y']], lv_zoom, false);
											$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기
											$administStatsMap.ui.mapToggleId = res.result.sido_cd; // 2020-10-15 [곽제욱] 맵토글ID 초기화
											$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight(res.result.sido_cd);
										}
										$administStatsMap.ui.mapToggleId = ""; // 2020-10-15 [곽제욱] 맵토글ID 초기화
										//$houseDash.polygonSelectedAreaNm = res.result.sido_nm;
										//$houseDash.polygonSelectArea = res.result.sido_cd;
										$houseDash.polygonSelectedAreaNm = "";
										$houseDash.polygonSelectArea = "";
										$houseDash.chartItmClick = "";
									}
								}else{
									$administStatsMain.ui.selectedLevel = "0";
									//전국 조회
									$("#dash_sido").val("99");
									//$("#dash_sido").val(lv_to_sido_cd);
									$("#dash_sgg").val("999");
									$administStatsMain.ui.selectedArea = "00";
									$administStatsMain.ui.pathChange("nationwide", "00");
									
									var selectedThema = $administStatsMain.ui.selectedThema;
									// 각 주제별 차트 변화함수 호출
									$administStatsMain.ui.selectedLevel = "0";
									if(selectedThema == "신혼부부"){
										//$newlyDash.event.allChange("00", "1");
										//20201008 박은식 줌아웃, path 초기화 시 해당 rank 지역정보를 전국으로 변경 START
										//$("#genderRanking").html("전국의 남녀 성비");
										//$("#foreignRanking").html("전국의 외국인 수");
										//20201008 박은식 줌아웃, path 초기화 시 해당 rank 지역정보를 전국으로 변경 END
									}
									//20201020 박은식 주택 분기 추가 START
									else if(selectedThema == "주택소유"){
										//$houseDash.event.allChange("00", "1");
										//$("#houseRatioRanking").html("전국의 주택 증감율");
										//$("#emptyRanking").html("전국의 빈집의 수");
									}
									//20201020 박은식 주택 분기 추가 END
									else if(selectedThema == "중장년층"){
										//$middlDash.event.allChange("00", "1");
									}
									//20201022 박은식 귀농·귀어·귀촌, 통계더보기 분기처리 추가 START
									else if(selectedThema == "귀농·귀어·귀촌"){
										//$retunDash.event.allChange("00", "1");
										//$("#oldForestryRanking").html("전국의 임가 인구 중 고령인구");
										//$("#retunHouseRanking").html("전국의 임가(가구) 수");
									}
									else if(selectedThema == "통계더보기"){
										//$moresDash.event.allChange("00", "1");
										//$("#oldFisheryRanking").html("전국의 어가 인구 중 고령인구");
										//$("#moresHouseRanking").html("전국의 어가(가구) 수");
									}
									//20201022 박은식 귀농·귀어·귀촌, 통계더보기 분기처리 추가 END
									
									//chart그리기
									var chartOrd = $("#modalSearchTitle option:selected").val();
									var year = $("#modalSearchYear option:selected").val();
									var item_id = $("#modalSearchTitle option:selected").data('item_id');
									var regin_var_ord = $("#modalSearchTitle option:selected").data('region_var_ord');
									var obj_var_id = $("#modalSearchTitle option:selected").data('obj_var_id');
									var disp_obj_var_id = $("#modalSearchTitle option:selected").data('disp_obj_var_id');
									var var_ord = $("#modalSearchTitle option:selected").data('var_ord');
		
									var	region_code = "00";
									//var	region_code = lv_to_sido_cd;
									var sgg_code = '';
									var emdong_code = '';
									
									//if($("#modalSearchTitle option:selected").text().indexOf($(".toggle.on").text().replace('전체', '').trim()+' 특성별') > -1){
									var tbl_id = $("#modalSearchTitle option:selected").data('tbl_id');
									if(tbl_id == "DT_1NW1003" || tbl_id == "DT_1NW1005" || tbl_id == "DT_1NW1006" || tbl_id == "DT_1NW1014"|| tbl_id == "DT_1NW1016"
									 || tbl_id == "DT_1NW1017" || tbl_id == "DT_1NW1018" || tbl_id == "DT_1NW1020" || tbl_id == "DT_1NW1021" || tbl_id == "DT_1NW1022" || tbl_id == "DT_1NW1023"
									  || tbl_id == "DT_1NW1024" || tbl_id == "DT_1NW1025" || tbl_id == "DT_1NW1026" || tbl_id == "DT_1NW1027" || tbl_id == "DT_1NW1028" || tbl_id == "DT_1NW1029"
									   || tbl_id == "DT_1NW1030" || tbl_id == "DT_1NW1031" || tbl_id == "DT_1NW1035" || tbl_id == "DT_1NW2003" || tbl_id == "DT_1NW2011" || tbl_id == "DT_1NW2013"
									    || tbl_id == "DT_1NW2014" || tbl_id == "DT_1NW2015" || tbl_id == "DT_1NW2017" || tbl_id == "DT_1NW2018" || tbl_id == "DT_1NW2019" || tbl_id == "DT_1NW2020"
									     || tbl_id == "DT_1NW2021" || tbl_id == "DT_1NW2022" || tbl_id == "DT_1NW2023" || tbl_id == "DT_1NW2025" || tbl_id == "DT_1NW2026" || tbl_id == "DT_1NW2027"
									   	  || tbl_id == "DT_1NW2028" || tbl_id == "DT_1NW3003" || tbl_id == "DT_1NW3011" || tbl_id == "DT_1NW3013" || tbl_id == "DT_1NW3014" || tbl_id == "DT_1NW3015"
									       || tbl_id == "DT_1NW3017" || tbl_id == "DT_1NW3018" || tbl_id == "DT_1NW3019" || tbl_id == "DT_1NW3020" || tbl_id == "DT_1NW3021" || tbl_id == "DT_1NW3022"
										    || tbl_id == "DT_1NW3023" || tbl_id == "DT_1NW3025" || tbl_id == "DT_1NW3026" || tbl_id == "DT_1NW3027" || tbl_id == "DT_1NW3028"){
										region_code = "2"+ region_code;
									}
									
									if(map.id == 1){
										getChartsData(chartOrd, year, item_id, regin_var_ord, obj_var_id, disp_obj_var_id, var_ord, region_code, sgg_code, emdong_code);
										//if(lv_to_sido_cd != $administStatsMap.ui.mapToggleId1){
											$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight(res.result.sido_cd);
										//}
										//$administStatsMap.ui.mapToggleId1 = ""; // 2020-10-15 [곽제욱] 맵토글ID 초기화
										$administStatsMap.ui.mapToggleId1 = res.result.sido_cd; // 2020-10-15 [곽제욱] 맵토글ID 초기화
										$houseDash.polygonSelectedAreaNm1 = res.result.sido_nm;
										$houseDash.polygonSelectArea1 = res.result.sido_cd;
										$houseDash.chartItmClick1 = "";
									}else if(map.id == 0){
										getChartsData(chartOrd, year, item_id, regin_var_ord, obj_var_id, disp_obj_var_id, var_ord, region_code, sgg_code, emdong_code);
										//if(lv_to_sido_cd != $administStatsMap.ui.mapToggleId){
											$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight(res.result.sido_cd);
										//}
										//$administStatsMap.ui.mapToggleId = ""; // 2020-10-15 [곽제욱] 맵토글ID 초기화
										$administStatsMap.ui.mapToggleId = res.result.sido_cd; // 2020-10-15 [곽제욱] 맵토글ID 초기화
										$houseDash.polygonSelectedAreaNm = res.result.sido_nm;
										$houseDash.polygonSelectArea = res.result.sido_cd;
										$houseDash.chartItmClick = "";
									}
									//if((map.id == 0 && lv_to_sido_cd != $administStatsMap.ui.mapToggleId) || (map.id == 1 && lv_to_sido_cd != $administStatsMap.ui.mapToggleId1)){
									//종심지역으로 지도 이동
									//$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].mapMove([$administStatsMap.ui.mapCenter['x'], $administStatsMap.ui.mapCenter['y']], lv_zoom, false);
									$administStatsMain.ui.selectedArea = res.result.sido_cd;
								}
								
								if($("#mapRgn_2").is(":visible")){
									if(($administStatsMap.ui.mapToggleId.length == 2 && $administStatsMap.ui.mapToggleId1.length == 2) || 
									($administStatsMap.ui.mapToggleId.length == 2 && $administStatsMap.ui.mapToggleId1 == '') || 
									($administStatsMap.ui.mapToggleId == '' && $administStatsMap.ui.mapToggleId1.length == 2) || 
									($administStatsMap.ui.mapToggleId == '' && $administStatsMap.ui.mapToggleId1 == '') ){
										$("#panel4").show();
										$("#panel41").hide();
									}else if(($administStatsMap.ui.mapToggleId.length == 5 && $administStatsMap.ui.mapToggleId1.length == 5)){
										$("#panel4").hide();
										$("#panel41").show();
									}else{
										$("#panel4").show();
										$("#panel41").show();
									}
								}else{
									if($administStatsMap.ui.mapToggleId.length == 2 || $administStatsMap.ui.mapToggleId == ''){
										$("#panel4").show();
										$("#panel41").hide();
									}else if($administStatsMap.ui.mapToggleId.length == 5){
										$("#panel4").hide();
										$("#panel41").show();
									}
								}
								
							}
							else if(lv_zoom >= sggZoom && lv_zoom <= 8
							) {
								if($houseDash.regionEnd != "시군구" && $houseDash.regionEnd != "읍면동" ){
									return false;
								}
								var adm_cd2 = lv_to_sido_cd+""+lv_to_sgg_cd;
								var emdongZoom = 6;
								/** 시도별 zoom 설정 */
								switch (adm_cd2.length) {
						            case 5:
						            	$administStatsMap.ui.checkIsAtdrc(adm_cd2.substring(0,4)+"0");
						            	if($administStatsMap.ui.isAtdrc==true){
						            		emdongZoom = 6;
						            	} else {
						            		emdongZoom = 6;
						            	}
						            	break;
						            default:
						            	//zoomLevel = 1;
						               break;
						         }
								if(lv_zoom >= emdongZoom){ // 읍면동 조회?
									if($houseDash.regionEnd != "읍면동" ){
										return false;
									}
									lv_atdrc_change_yn = "N";
									if(!($administStatsMap.ui.mapRegion == "sgg" && lv_sido_change_yn == "N" && !$administStatsMap.ui.isAtdrc)){
										lv_atdrc_change_yn = "Y";
										if($administStatsMap.ui.mapRegion!="emdong" && lv_atdrc_change_yn == "Y"){ // 2020-11-11 [곽제욱] 비자치구 경계 체크로직 추가
											$("#dash_sido").val(lv_to_sido_cd);
											$("#dash_sgg").val(lv_to_sgg_cd);
											$("#dash_emdong").val(lv_to_emdong_cd);
											//시군구 조회
											$administStatsMain.ui.selectedArea = lv_to_sido_cd + "" + lv_to_sgg_cd + "" + lv_to_emdong_cd;
											$administStatsMain.ui.pathChange("emdong", lv_to_sido_cd + "" + lv_to_sgg_cd + "" + lv_to_emdong_cd);
											$administStatsMap.ui.drawMapData("emdong", "color");
											$administStatsMap.ui.mapRegion = "emdong";

											$administStatsMain.ui.selectedLevel = "2";
											if($administStatsMain.ui.selectedThema == "신혼부부"){
												//$newlyDash.event.allChange($administStatsMain.ui.selectedArea, "2");
												//$newlyDash.ui.getRankSet("", "", $administStatsMain.ui.selectedArea);
											}
								    		//20201019 박은식 주택 추가 START
											else if($administStatsMain.ui.selectedThema == "주택소유"){
												//$houseDash.event.allChange($administStatsMain.ui.selectedArea, "2");
												//$houseDash.ui.getRankSet("", "", $administStatsMain.ui.selectedArea);
											}
											else if($administStatsMain.ui.selectedThema == "중장년층"){
												//$middlDash.event.allChange($administStatsMain.ui.selectedArea, "2");
												//$middlDash.ui.getRankSet("", "", $administStatsMain.ui.selectedArea);
											}
											//20201019 박은식 주택 추가 END
											//20201022 박은식 귀농·귀어·귀촌, 통계더보기 분기처리 추가 START
											else if($administStatsMain.ui.selectedThema == "귀농·귀어·귀촌"){
												//$retunDash.event.allChange($administStatsMain.ui.selectedArea, "2");
											}
											else if($administStatsMain.ui.selectedThema == "통계더보기"){
												//$moresDash.event.allChange($administStatsMain.ui.selectedArea, "2");
											}
											//20201022 박은식 귀농·귀어·귀촌, 통계더보기 분기처리 추가 END
										}
									}
								} else {
									//이미 같은 시군구이면 조회 안함
									lv_to_emdong_cd = "";
									res.result.emdong_nm = "";
									$administStatsMap.ui.isLoading = true;
									$administStatsMain.ui.loading(true);
									if(!($administStatsMap.ui.mapRegion == "sgg" && lv_sido_change_yn == "N")) {
										//$administStatsMain.ui.selectedLevel = "1";
										$("#dash_sido").val(lv_to_sido_cd);
										$("#dash_sgg").val(lv_to_sgg_cd);
										$("#dash_emdong").val(lv_to_emdong_cd);
										//$administStatsMain.ui.pathChange("sgg", lv_to_sido_cd+""+lv_to_sgg_cd);

										$administStatsMain.ui.selectedArea = lv_to_sido_cd+""+lv_to_sgg_cd;
										var selectedThema = $administStatsMain.ui.selectedThema;
										// 각 주제별 차트 변화함수 호출
										$administStatsMain.ui.selectedLevel = "2";
										
										//$administStatsMap.ui.mapToggleId = ""; // 2020-10-15 [곽제욱] 맵토글ID 초기화
										if(map.id == 1){
											$administStatsMap.ui.mapToggleId1 = ""; // 2020-10-15 [곽제욱] 맵토글ID 초기화
										}else if(map.id == 0){
											$administStatsMap.ui.mapToggleId = ""; // 2020-10-15 [곽제욱] 맵토글ID 초기화
										}
										
										if(selectedThema == "신혼부부"){
											//$newlyDash.event.allChange(lv_to_sido_cd, "1");
											//$newlyDash.ui.getRankSet("", "", lv_to_sido_cd);
										}
										else if(selectedThema == "중장년층"){
											//$middlDash.event.allChange(lv_to_sido_cd, "1");
											//$middlDash.ui.getRankSet("", "", lv_to_sido_cd);
										}
										else if(selectedThema == "주택소유"){
											//$houseDash.event.allChange(lv_to_sido_cd, "1");
											//$houseDash.ui.getRankSet("", "", lv_to_sido_cd);//20201019 박은식 주택 rank 셋팅 추가
										}
										//20201022 박은식 귀농·귀어·귀촌, 통계더보기 분기처리 추가 START
										else if(selectedThema == "귀농·귀어·귀촌"){
											//$retunDash.event.allChange(lv_to_sido_cd, "1");
											//$retunDash.ui.getRankSet("", "", lv_to_sido_cd);
										}
										else if(selectedThema == "통계더보기"){
											//$moresDash.event.allChange(lv_to_sido_cd, "1");
											//$moresDash.ui.getRankSet("", "", lv_to_sido_cd);
										}
										//20201022 박은식 귀농·귀어·귀촌, 통계더보기 분기처리 추가 END
										
										$administStatsMain.ui.pathChange("sgg", lv_to_sido_cd+""+lv_to_sgg_cd);
									} else {
										//
										$("#dash_sido").val(lv_to_sido_cd);
										$("#dash_sgg").val(lv_to_sgg_cd.substring(0,2)+"0");
										//$administStatsMain.ui.pathChange("sgg", lv_to_sido_cd+""+lv_to_sgg_cd);

										$administStatsMain.ui.selectedArea = lv_to_sido_cd+""+lv_to_sgg_cd;
										var selectedThema = $administStatsMain.ui.selectedThema;
										// 각 주제별 차트 변화함수 호출
										$administStatsMain.ui.selectedLevel = "2";
										
										//$administStatsMap.ui.mapToggleId = ""; // 2020-10-15 [곽제욱] 맵토글ID 초기화
										if(map.id == 1){
											$administStatsMap.ui.mapToggleId1 = ""; // 2020-10-15 [곽제욱] 맵토글ID 초기화
										}else if(map.id == 0){
											$administStatsMap.ui.mapToggleId = ""; // 2020-10-15 [곽제욱] 맵토글ID 초기화
										}
										
										if(selectedThema == "신혼부부"){
											//$newlyDash.event.allChange(lv_to_sido_cd, "1");
											//$newlyDash.ui.getRankSet("", "", lv_to_sido_cd);
										}
										else if(selectedThema == "중장년층"){
											//$middlDash.event.allChange(lv_to_sido_cd, "1");
											//$middlDash.ui.getRankSet("", "", lv_to_sido_cd);
										}
										else if(selectedThema == "주택소유"){
											//$houseDash.event.allChange(lv_to_sido_cd, "1");
											//$houseDash.ui.getRankSet("", "", lv_to_sido_cd);//20201019 박은식 주택 rank 셋팅 추가
										}
										//20201022 박은식 귀농·귀어·귀촌, 통계더보기 분기처리 추가 START
										else if(selectedThema == "귀농·귀어·귀촌"){
											//$retunDash.event.allChange(lv_to_sido_cd, "1");
											//$retunDash.ui.getRankSet("", "", lv_to_sido_cd);
										}
										else if(selectedThema == "통계더보기"){
											//$moresDash.event.allChange(lv_to_sido_cd, "1");
											//$moresDash.ui.getRankSet("", "", lv_to_sido_cd);
										}
										//20201022 박은식 귀농·귀어·귀촌, 통계더보기 분기처리 추가 END
										
										$administStatsMain.ui.pathChange("sgg", lv_to_sido_cd+""+lv_to_sgg_cd);
										
									}
									
									
								}
								
								//chart그리기
								var chartOrd = $("#modalSearchTitle option:selected").val();
								var year = $("#modalSearchYear option:selected").val();
								var item_id = $("#modalSearchTitle option:selected").data('item_id');
								var regin_var_ord = $("#modalSearchTitle option:selected").data('region_var_ord');
								var obj_var_id = $("#modalSearchTitle option:selected").data('obj_var_id');
								var disp_obj_var_id = $("#modalSearchTitle option:selected").data('disp_obj_var_id');
								var var_ord = $("#modalSearchTitle option:selected").data('var_ord');
	
								//var	region_code = '00';
								var sgg_code = '';
								var	region_code = lv_to_sido_cd;
								var sgg_code = lv_to_sgg_cd;
								var emdong_code = lv_to_emdong_cd;
								
								//$houseDash.polygonSelectArea = region_code + sgg_code;
								if($administStatsMap.ui.curMapId == 0){
									$houseDash.polygonSelectArea = region_code + sgg_code + emdong_code;
									if($administStatsMap.ui.mapRegion == "sgg"){
										$houseDash.polygonSelectedAreaNm = res.result.sgg_nm;
									}else if($administStatsMap.ui.mapRegion == "emdong"){
										$houseDash.polygonSelectedAreaNm = res.result.emdong_nm;
									}
								}else if($administStatsMap.ui.curMapId == 1){
									$houseDash.polygonSelectArea1 = region_code + sgg_code + emdong_code;
									if($administStatsMap.ui.mapRegion == "sgg"){
										$houseDash.polygonSelectedAreaNm1 = res.result.sgg_nm;
									}else if($administStatsMap.ui.mapRegion == "emdong"){
										$houseDash.polygonSelectedAreaNm1 = res.result.emdong_nm;
									}
								}
								$administStatsMap.ui.isLoading = false;
								getChartsData(chartOrd, year, item_id, regin_var_ord, obj_var_id, disp_obj_var_id, var_ord, region_code, sgg_code, emdong_code);

							}
							//읍면동
							else if (
									//(lv_zoom > 1 && lv_zoom <= 3) || (lv_zoom > 3 && lv_zoom <= 5 ) || (lv_zoom > 5 && lv_zoom <= 8 )
									lv_zoom >= emdongZoom && lv_zoom <= 12
							) {
								if($houseDash.regionEnd != "읍면동" ){
									return false;
								}
								//이미 같은 읍면동이면 조회 안함
								if(!($administStatsMap.ui.mapRegion == "emdong" && lv_sgg_change_yn == "N")) {

								}else{
									$("#dash_sido").val(lv_to_sido_cd);
									$("#dash_sgg").val(lv_to_sgg_cd.substring(0,2)+"0");
									$("#dash_emdong").val(lv_to_sgg_cd.substring(0,2)+"0");
									//$administStatsMain.ui.pathChange("emdong", lv_to_sido_cd+""+lv_to_sgg_cd);

									$administStatsMain.ui.selectedArea = lv_to_sido_cd+""+lv_to_sgg_cd;
									var selectedThema = $administStatsMain.ui.selectedThema;
									// 각 주제별 차트 변화함수 호출
									$administStatsMain.ui.selectedLevel = "2";
									
									//$administStatsMap.ui.mapToggleId = ""; // 2020-10-15 [곽제욱] 맵토글ID 초기화
									if(map.id == 1){
										$administStatsMap.ui.mapToggleId1 = ""; // 2020-10-15 [곽제욱] 맵토글ID 초기화
									}else if(map.id == 0){
										$administStatsMap.ui.mapToggleId = ""; // 2020-10-15 [곽제욱] 맵토글ID 초기화
									}
									
									if(selectedThema == "신혼부부"){
										//$newlyDash.event.allChange(lv_to_sido_cd, "1");
										//$newlyDash.ui.getRankSet("", "", lv_to_sido_cd);
									}
									else if(selectedThema == "중장년층"){
										//$middlDash.event.allChange(lv_to_sido_cd, "1");
										//$middlDash.ui.getRankSet("", "", lv_to_sido_cd);
									}
									else if(selectedThema == "주택소유"){
										//$houseDash.event.allChange(lv_to_sido_cd, "1");
										//$houseDash.ui.getRankSet("", "", lv_to_sido_cd);//20201019 박은식 주택 rank 셋팅 추가
									}
									//20201022 박은식 귀농·귀어·귀촌, 통계더보기 분기처리 추가 START
									else if(selectedThema == "귀농·귀어·귀촌"){
										//$retunDash.event.allChange(lv_to_sido_cd, "1");
										//$retunDash.ui.getRankSet("", "", lv_to_sido_cd);
									}
									else if(selectedThema == "통계더보기"){
										//$moresDash.event.allChange(lv_to_sido_cd, "1");
										//$moresDash.ui.getRankSet("", "", lv_to_sido_cd);
									}
									//20201022 박은식 귀농·귀어·귀촌, 통계더보기 분기처리 추가 END
									
									$administStatsMain.ui.pathChange("emdong", lv_to_sido_cd+""+lv_to_sgg_cd);
									
								}
								
								
							}
						});
					}


					$administStatsMap.ui.prevZoom = lv_zoom;
					$administStatsMap.ui.mapCenter = {};
					//$houseDash.searchParamReset = false;
				//}
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
							$administStatsMap.ui.createInfoTooltip(event, data, type, map);
						}
					} else if( map.isInnerMapShow3!=undefined && map.isInnerMapShow3 ) { //mng_s 그리드일 경우
						if (type == "data") {
							map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
						if (data.info.length > 0) { //데이터가 있을 경우만 툴팁을 보여준다.
							$administStatsMap.ui.createInfoTooltip(event, data, type, map);
						}
					} else {
						if (type == "data") {
							map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
						$administStatsMap.ui.createInfoTooltip(event, data, type, map);
					}
				}else {
					if( map.isInnerMapShow2!=undefined && map.isInnerMapShow2 ) { //mng_s 그리드일 경우
						//그리드일 경우 화면에 툴팁을 표출하지 않는다. ==> 표출하는것으로 변경됨
						$administStatsMap.ui.createInfoTooltip(event, data, type, map);
					} else {
						$administStatsMap.ui.createInfoTooltip(event, data, type, map);
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
				$administStatsMain.ui.selectedArea = data.properties.adm_cd;
				/*if(data.info[0].dt == 0){
					alert(data.info[0].region_nm+" 데이터가 존재하지 않습니다.");
					return false;
				}*/
				
				$houseDash.event.clearSelection();
				//선택한 맵 id저장
				console.log("curMapId = " + map.id);
				$administStatsMap.ui.curMapId = map.id;
				//$administStatsMap.ui.mapList[map.id].curSidoCd = data.info[0].adm_cd;
				
				//20201201 박은식 데이터가 없는 지역 (N/A) 경계 클릭 시 retrun 처리 START
					if(data.info.length == 0){
						return;
					}
				//20201201 박은식 데이터가 없는 지역 (N/A) 경계 클릭 시 retrun 처리 END
				if (type == "data") {
					//modalSearchBtn(data.info[0].adm_cd, '');

					$('.city_select').css('width',140 + 20 + (data.info[0].region_nm.length * 20) + 'px')
					$('.city_select_sido').text(data.info[0].region_nm);
					
					$('.city_select button').remove();
					var btnele = $('<button class="locationClose" id="sidoClose" onclick="javascript:modalSearchBtn();">');
					$('.city_select').append(btnele);
					
					//csy
					//if(data.info[0].adm_cd.length == 7 ){
					if(data.properties.adm_cd.length == 7 ){
						//alert("kosis 읍면동 정보 클릭!!!");
					}
					else{
						$administStatsMain.ui.loading(true); // 2020-10-14 [곽제욱] 맵 그리기 시작할때 loading바 생성
						//$administStatsMain.ui.loading($administStatsMap.ui.isLoading); // 2020-10-14 [곽제욱] 맵 그리기 시작할때 loading바 생성
						//srvLogWrite('P0','01','04','01',$administStatsMain.ui.selectedThema,'year='+$administStatsMain.ui.selectedYear+',adm_cd='+data.info[0].adm_cd);
						//srvLogWrite('P0','01','04','01',$administStatsMain.ui.selectedThema,'year='+$administStatsMain.ui.selectedYear+',adm_cd='+data.properties.adm_cd);

						var title = "";
						
						if($administStatsMap.ui.curMapId == 0){
							$houseDash.polygonSelectedAreaNm = data.properties.adm_nm;
							$houseDash.polygonSelectArea = data.properties.adm_cd;
						}else if($administStatsMap.ui.curMapId == 1){
							$houseDash.polygonSelectedAreaNm1 = data.properties.adm_nm;
							$houseDash.polygonSelectArea1 = data.properties.adm_cd;
						}
						
						$(".pancon1h .selectedArea, .pancon3h .selectedArea").remove();
						
						var mapToggleId = "";
						
						if($("#mapRgn_2").is(":visible")){
							if($administStatsMap.ui.curMapId == 1){
								mapToggleId = $administStatsMap.ui.mapToggleId1;
							}else if($administStatsMap.ui.curMapId == 0){
								mapToggleId = $administStatsMap.ui.mapToggleId;
							}
						}else{
							mapToggleId = $administStatsMap.ui.mapToggleId;
						}
						
						if(mapToggleId != data.properties.adm_cd) {	//현재 선택된 지역이 아닌 다른지역 선택
							$('.tag_sido').text(data.properties.adm_nm);
							if(!$("#sidoClose").is(":visible")){
								$('.tag-item').append('<button class="tag-del" id="sidoClose" onclick="javascript: modalSearchBtn();">');
							}
							
							var chartOrd = $("#modalSearchTitle option:selected").val();
							var item_id = $("#modalSearchTitle option:selected").data('item_id');
							var year = $("#modalSearchYear option:selected").val();
							var regin_var_ord = $("#modalSearchTitle option:selected").data('region_var_ord');
							var obj_var_id = $("#modalSearchTitle option:selected").data('obj_var_id');
							var disp_obj_var_id = $("#modalSearchTitle option:selected").data('disp_obj_var_id');
							var var_ord = $("#modalSearchTitle option:selected").data('var_ord');

							//var	region_code = data.info[0].adm_cd;
							var	region_code = data.properties.adm_cd;
							//var sgg_code = data.properties.adm_cd.substring(2,5);
							//var emdong_code = '';
							
							var searchGubun = "";
							var tbl_id = $("#modalSearchTitle option:selected").data('tbl_id');
							if(tbl_id == "DT_1NW1003" || tbl_id == "DT_1NW1005" || tbl_id == "DT_1NW1006" || tbl_id == "DT_1NW1014"|| tbl_id == "DT_1NW1016"
							 || tbl_id == "DT_1NW1017" || tbl_id == "DT_1NW1018" || tbl_id == "DT_1NW1020" || tbl_id == "DT_1NW1021" || tbl_id == "DT_1NW1022" || tbl_id == "DT_1NW1023"
							 || tbl_id == "DT_1NW1024" || tbl_id == "DT_1NW1025" || tbl_id == "DT_1NW1026" || tbl_id == "DT_1NW1027" || tbl_id == "DT_1NW1028" || tbl_id == "DT_1NW1029"
							 || tbl_id == "DT_1NW1030" || tbl_id == "DT_1NW1031" || tbl_id == "DT_1NW1035" || tbl_id == "DT_1NW2003" || tbl_id == "DT_1NW2011" || tbl_id == "DT_1NW2013"
							 || tbl_id == "DT_1NW2014" || tbl_id == "DT_1NW2015" || tbl_id == "DT_1NW2017" || tbl_id == "DT_1NW2018" || tbl_id == "DT_1NW2019" || tbl_id == "DT_1NW2020"
							  || tbl_id == "DT_1NW2021" || tbl_id == "DT_1NW2022" || tbl_id == "DT_1NW2023" || tbl_id == "DT_1NW2025" || tbl_id == "DT_1NW2026" || tbl_id == "DT_1NW2027"
							   || tbl_id == "DT_1NW2028" || tbl_id == "DT_1NW3003" || tbl_id == "DT_1NW3011" || tbl_id == "DT_1NW3013" || tbl_id == "DT_1NW3014" || tbl_id == "DT_1NW3015"
							    || tbl_id == "DT_1NW3017" || tbl_id == "DT_1NW3018" || tbl_id == "DT_1NW3019" || tbl_id == "DT_1NW3020" || tbl_id == "DT_1NW3021" || tbl_id == "DT_1NW3022"
							     || tbl_id == "DT_1NW3023" || tbl_id == "DT_1NW3025" || tbl_id == "DT_1NW3026" || tbl_id == "DT_1NW3027" || tbl_id == "DT_1NW3028") {
								searchGubun = "2";	//특성별목록이면 시도별 데이터만 조회
							}else{
								searchGubun = "";
							}

							region_code = region_code;

							if(chkRegionEnd == "시군구" && region_code.length == 2 && chartMode == "sido"){
								for(var m = 0; m < $administStatsMain.ui.areaSidoData["00"].length; m++){
									if($administStatsMain.ui.areaSidoData["00"][m].sido_cd == map.mouseOverAdmCd){
										$administStatsMap.ui.mapCenter['x'] = $administStatsMain.ui.areaSidoData["00"][m].x_coor;
										$administStatsMap.ui.mapCenter['y'] = $administStatsMain.ui.areaSidoData["00"][m].y_coor;
										break;
									}
								}
								var center = new Array();
								center[0]  = $administStatsMap.ui.mapCenter['x'];
								center[1] = $administStatsMap.ui.mapCenter['y'];

								//sgg_code = region_code.substring(2,5);
								$houseDash.polygonSelectArea = region_code;
								//$administStatsMap.ui.mapToggleId = region_code;
								
								$houseDash.isChange = false;
								getChartsData(chartOrd, year, item_id, regin_var_ord, obj_var_id, disp_obj_var_id, var_ord, searchGubun + region_code);
											
								//20201019 박은식 각 태마별 분기처리 추가 END
								//var adm_cd = data.info[0].adm_cd;
								var adm_cd = region_code;
								//var sidoCd = adm_cd.substring(0,2);
								//var sggCd = "999";
								//var sggCd = sgg_code;
	
								$administStatsMain.ui.selectedLevel = "1"
								if(data.properties.adm_cd.length == 5){
									$administStatsMain.ui.selectedArea = region_code;
									$administStatsMain.ui.selectedLevel = "2";
									//$administStatsMain.ui.getSidoSggPos(region_code);
									$administStatsMain.ui.pathChange("sgg", region_code);
								} else {
									$administStatsMain.ui.selectedArea = adm_cd;
									$administStatsMain.ui.pathChange("sgg", region_code);
									
									/*if($('.modal-location').is(":visible")){
										findRank(adm_cd);
										$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기
									}*/
								}
								// 2020-11-30 [곽제욱] 지역 선택시 locationPath 지정 END
	
	
								$("#dash_sido").val(region_code.substring(0,2));
								$("#dash_sgg").val(region_code.substring(2,5));
								// 전체 차트 변경처리
								var selectedThema = $administStatsMain.ui.selectedThema;
	
								// 선택한 지역 하이라이트
								// 2020-11-02 [곽제욱] 타일차트 색변경 추가 START
								//if($administStatsMap.ui.mapToggleId!=""&&$administStatsMap.ui.mapToggleId!="00"){
								if(mapToggleId!="" && mapToggleId!="00"){
									//20201118 박은식 IE에서 find() 미지원으로 변경 처리 START
				    				var tempColor = '';
				    				var sindex = 0;
				    				var eIndex = 0;
				    				if($("#mapRgn_2").is(":visible")){
				    					if($administStatsMap.ui.curMapId == 1){
				    						var sindex = 17;
				    						var eindex = 34;
				    					}else if($administStatsMap.ui.curMapId == 0){
				    						var sindex = 0;
				    						var eindex = 17;
				    					}
				    				}else{
				    					var sindex = 0;
				    					var eindex = 17;
				    				}
				    				//for(var i=0;i < $administStatsMain.ui.tilePerColor.length; i++){
				    				for(var i=sindex;i < eindex; i++){
				    					//if($administStatsMain.ui.tilePerColor[i].adm_cd == $administStatsMap.ui.mapToggleId){
				    					if($administStatsMain.ui.tilePerColor.length > 0) {
				    						if($administStatsMain.ui.tilePerColor[i].adm_cd == mapToggleId){
				    							tempColor = $administStatsMain.ui.tilePerColor[i].color
				    						}				    						
				    					}
				    				}
									//var tempColor = $administStatsMain.ui.tilePerColor.find(function(x) {return x.adm_cd == $administStatsMap.ui.mapToggleId}).color;
				    				//20201118 박은식 IE에서 find() 미지원으로 변경 처리 END
									//$("rect[value='"+$administStatsMap.ui.mapToggleId+"']").attr("fill", tempColor);
									$("rect[value='"+mapToggleId+"']").attr("fill", tempColor);
								}
								
								//$administStatsMap.ui.tileTempColor = $("rect[value='"+adm_cd+"']").attr("fill");
								if($("#mapRgn_2").is(":visible")){
					    			if($administStatsMap.ui.curMapId == 1){
										$administStatsMap.ui.tileTempColor1 = $("rect[value='"+adm_cd+"']").attr("fill");
									}else{
										$administStatsMap.ui.tileTempColor = $("rect[value='"+adm_cd+"']").attr("fill");
									}
					    		}else{
									$administStatsMap.ui.tileTempColor = $("rect[value='"+adm_cd+"']").attr("fill");
					    		}
								
								// 2020-11-02 [곽제욱] 타일차트 색변경 추가 END
					    		$administStatsMap.ui.map.setPolyLayerHighlight(adm_cd);
					    		//$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight(adm_cd);
					    		$("rect[value='"+adm_cd+"']").attr("fill", "#0086c6"); // 2020-11-02 [곽제욱] 타일차트 색변경 추가
					    		/*if($("#mapRgn_2").is(":visible")){
					    			if($administStatsMap.ui.curMapId == 1){
						    			//$administStatsMap.ui.mapToggleId1 = data.info[0].adm_cd;
						    			$administStatsMap.ui.mapToggleId1 = data.properties.adm_cd;
									}else{
						    			//$administStatsMap.ui.mapToggleId = data.info[0].adm_cd;
						    			$administStatsMap.ui.mapToggleId = data.properties.adm_cd;
									}
					    		}else{
					    			//$administStatsMap.ui.mapToggleId = data.info[0].adm_cd;
					    			$administStatsMap.ui.mapToggleId = data.properties.adm_cd;
					    		}*/
							}else{
								$houseDash.isChange = false;
								getChartsData(chartOrd, year, item_id, regin_var_ord, obj_var_id, disp_obj_var_id, var_ord, searchGubun + region_code);

								var region_code = data.properties.adm_cd;
	
								$administStatsMain.ui.selectedLevel = "1"
								if(data.properties.adm_cd.length == 5){
									//$administStatsMain.ui.selectedArea = adm_cd+""+sggCd;
									$administStatsMain.ui.selectedLevel = "2";
									$administStatsMain.ui.getSidoSggPos(region_code);
									$administStatsMain.ui.pathChange("sgg", region_code);
								} else {
									//$administStatsMain.ui.selectedArea = adm_cd;
									$administStatsMain.ui.pathChange("sgg", region_code);
								}
								// 2020-11-30 [곽제욱] 지역 선택시 locationPath 지정 END
	
	
								$("#dash_sido").val(region_code.substring(0,2));
								$("#dash_sgg").val(region_code.substring(2,5));
								// 전체 차트 변경처리
								var selectedThema = $administStatsMain.ui.selectedThema;

								if(mapToggleId!="" && mapToggleId!="00"){
									//20201118 박은식 IE에서 find() 미지원으로 변경 처리 START
									if($administStatsMap.ui.map != null) {
										if($administStatsMap.ui.map.dataGeojson != null) {
											$administStatsMap.ui.map.dataGeojson.eachLayer(function(layer) {
												var fillColor = layer.options.fillColor;
												var dashArray = layer.options.dashArray;
												for(var j=0; j<$administStatsMain.ui.tilePerColor.length; j++){
													if(layer.feature.properties.adm_cd == $administStatsMain.ui.tilePerColor[j].adm_cd) {
														fillColor = $administStatsMain.ui.tilePerColor[j].color;
														layer.setStyle({
															weight : 1,
															color : "white",
															dashArray : dashArray,
															fillOpacity : layer.options.fillOpacity,
															fillColor : fillColor
														});
													}
												}
											});
										}
									}
									$("rect[value='"+mapToggleId+"']").attr("fill", tempColor);
								}
								
								//$administStatsMap.ui.tileTempColor = $("rect[value='"+adm_cd+"']").attr("fill");
								if($("#mapRgn_2").is(":visible")){
					    			if($administStatsMap.ui.curMapId == 1){
										$administStatsMap.ui.tileTempColor1 = $("rect[value='"+region_code+"']").attr("fill");
									}else{
										$administStatsMap.ui.tileTempColor = $("rect[value='"+region_code+"']").attr("fill");
									}
					    		}else{
									$administStatsMap.ui.tileTempColor = $("rect[value='"+region_code+"']").attr("fill");
					    		}
								
								// 2020-11-02 [곽제욱] 타일차트 색변경 추가 END
					    		$administStatsMap.ui.map.setPolyLayerHighlight(region_code);
					    		$("rect[value='"+region_code+"']").attr("fill", "#0086c6"); // 2020-11-02 [곽제욱] 타일차트 색변경 추가
				    		}
				    		
						} else {
							if(mapToggleId != "") {
								$('.tag_sido').text(data.properties.adm_nm);
								if(!$("#sidoClose").is(":visible")){
									$('.tag-item').append('<button class="tag-del" id="sidoClose" onclick="javascript: modalSearchBtn();">');
								}
							}else{
								$('.tag_sido').text("전국");
								$("#sidoClose").remove();
							}	
							//$newlyDash.polygonSelectArea = ""; //행정통계인구 연령별 분포 차트 단위 변경 기준 변수(하이라이트 토글 시 지역 코드 초기화)
							
							//var adm_cd = data.info[0].adm_cd;
							var region_code = data.properties.adm_cd;
							//var sidoCd = adm_cd.substring(0,2);
							//var sggCd = data.properties.adm_cd.substring(2,5);
							var selectedThema = $administStatsMain.ui.selectedThema;
							/*if(sggCd == ""){
								sggCd = "999";
							}*/
							if(region_code.length == 5){
								//sgg_code = "000";
								$administStatsMap.ui.checkIsAtdrc(region_code.substring(0,4)+"0");
								if($administStatsMap.ui.isAtdrc){
									// 행정시도인 경우(ex : 수원시)
									if(region_code.substring(4,5) == "0"){
										$administStatsMain.ui.selectedArea = region_code.substring(0,2);
										//sggCd = "999";
										$administStatsMain.ui.selectedLevel = "1";
									} else {
										$administStatsMain.ui.selectedArea = region_code.substring(0,4)+"0";
										$administStatsMain.ui.selectedLevel = "2";
									}
									$administStatsMain.ui.pathChange("atdrc", region_code.substring(0,4)+"0"); // 2020-11-30 [곽제욱] 선택시 navigation 해제 추가
								} else {
									$administStatsMain.ui.selectedArea = region_code.substring(0,2);
									$administStatsMain.ui.pathChange("sgg", region_code.substring(0,2)); // 2020-11-30 [곽제욱] 선택시 navigation 해제 추가
								}
								
								let polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm.split(" ");
								if(polygonSelectedAreaNm.length > 0) {
									$houseDash.polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm.split(" ")[0];
									polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
								} else {
									polygonSelectedAreaNm = "전국"
								}
								
								$('.tag_sido').text(polygonSelectedAreaNm);
								$houseDash.polygonSelectArea = $houseDash.polygonSelectArea.substring(0,2);
								region_code = region_code.substring(0,2);
							} else if(region_code.length == 2){
								$administStatsMap.ui.map.setPolyLayerHighlight(region_code);
								region_code = '00';
								//sgg_code = '';
								//emdong_code = '';
								sidoCd = "99";
								
								if($administStatsMap.ui.curMapId == 0){
									$houseDash.polygonSelectArea = "";
									$houseDash.polygonSelectedAreaNm = "";
								}else if($administStatsMap.ui.curMapId == 1){
									$houseDash.polygonSelectArea1 = "";
									$houseDash.polygonSelectedAreaNm1 = "";
								}
								
								var tbl_id = $("#modalSearchTitle option:selected").data('tbl_id');
								if(tbl_id == "DT_1NW1003" || tbl_id == "DT_1NW1005" || tbl_id == "DT_1NW1006" || tbl_id == "DT_1NW1014"|| tbl_id == "DT_1NW1016"
								 || tbl_id == "DT_1NW1017" || tbl_id == "DT_1NW1018" || tbl_id == "DT_1NW1020" || tbl_id == "DT_1NW1021" || tbl_id == "DT_1NW1022" || tbl_id == "DT_1NW1023"
								  || tbl_id == "DT_1NW1024" || tbl_id == "DT_1NW1025" || tbl_id == "DT_1NW1026" || tbl_id == "DT_1NW1027" || tbl_id == "DT_1NW1028" || tbl_id == "DT_1NW1029"
								   || tbl_id == "DT_1NW1030" || tbl_id == "DT_1NW1031" || tbl_id == "DT_1NW1035" || tbl_id == "DT_1NW2003" || tbl_id == "DT_1NW2011" || tbl_id == "DT_1NW2013"
								    || tbl_id == "DT_1NW2014" || tbl_id == "DT_1NW2015" || tbl_id == "DT_1NW2017" || tbl_id == "DT_1NW2018" || tbl_id == "DT_1NW2019" || tbl_id == "DT_1NW2020"
								     || tbl_id == "DT_1NW2021" || tbl_id == "DT_1NW2022" || tbl_id == "DT_1NW2023" || tbl_id == "DT_1NW2025" || tbl_id == "DT_1NW2026" || tbl_id == "DT_1NW2027"
								   	  || tbl_id == "DT_1NW2028" || tbl_id == "DT_1NW3003" || tbl_id == "DT_1NW3011" || tbl_id == "DT_1NW3013" || tbl_id == "DT_1NW3014" || tbl_id == "DT_1NW3015"
								       || tbl_id == "DT_1NW3017" || tbl_id == "DT_1NW3018" || tbl_id == "DT_1NW3019" || tbl_id == "DT_1NW3020" || tbl_id == "DT_1NW3021" || tbl_id == "DT_1NW3022"
									    || tbl_id == "DT_1NW3023" || tbl_id == "DT_1NW3025" || tbl_id == "DT_1NW3026" || tbl_id == "DT_1NW3027" || tbl_id == "DT_1NW3028"){
									region_code = "2"+ region_code;
								}
								
								$administStatsMain.ui.selectedLevel = "0"
								$administStatsMain.ui.selectedArea = "00";
								$administStatsMain.ui.pathChange("nationwide", "00"); // 2020-11-30 [곽제욱] 선택시 navigation 해제 추가
							}
							
							var chartOrd = $("#modalSearchTitle option:selected").val();
							var year = $("#modalSearchYear option:selected").val();
							var item_id = $("#modalSearchTitle option:selected").data('item_id');
							var regin_var_ord = $("#modalSearchTitle option:selected").data('region_var_ord');
							var obj_var_id = $("#modalSearchTitle option:selected").data('obj_var_id');
							var disp_obj_var_id = $("#modalSearchTitle option:selected").data('disp_obj_var_id');
							var var_ord = $("#modalSearchTitle option:selected").data('var_ord');

							getChartsData(chartOrd, year, item_id, regin_var_ord, obj_var_id, disp_obj_var_id, var_ord, region_code);
													
							/*if($('.modal-location').is(":visible")){
								findRank(adm_cd);
								$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기
							}*/
							
							$("#dash_sido").val(region_code.substring(0,2));
							$("#dash_sgg").val(region_code.substring(2,5));
							//if($administStatsMap.ui.mapToggleId != "00"){
							if(mapToggleId != "00"){
								//20201118 박은식 IE에서 find() 미지원으로 변경 처리 START
			    				var tempColor = '';
			    				
			    				var sindex = 0;
			    				var eIndex = 0;
			    				if($("#mapRgn_2").is(":visible")){
			    					if($administStatsMap.ui.curMapId == 1){
			    						var sindex = 17;
			    						var eindex = 34;
			    					}else if($administStatsMap.ui.curMapId == 0){
			    						var sindex = 0;
			    						var eindex = 17;
			    					}
			    				}else{
			    					var sindex = 0;
			    					var eindex = 17;
			    				}
			    				
			    				//for(var i=0;i < $administStatsMain.ui.tilePerColor.length; i++){
			    				for(var i=sindex;i < eindex; i++){
			    					//if($administStatsMain.ui.tilePerColor[i].adm_cd == $administStatsMap.ui.mapToggleId){
			    					if($administStatsMain.ui.tilePerColor[i] != undefined) {
			    						if($administStatsMain.ui.tilePerColor[i].adm_cd == mapToggleId){
				    						tempColor = $administStatsMain.ui.tilePerColor[i].color
				    					}
			    					}
			    				}
								//var tempColor = $administStatsMain.ui.tilePerColor.find(function(x) {return x.adm_cd == $administStatsMap.ui.mapToggleId}).color; // 2020-11-04 [곽제욱] 타일색 변경 추가
								//20201118 박은식 IE에서 find() 미지원으로 변경 처리 END
								//$("rect[value='"+$administStatsMap.ui.mapToggleId+"']").attr("fill", tempColor); // 2020-11-04 [곽제욱] 타일색 변경 추가
								$("rect[value='"+mapToggleId+"']").attr("fill", tempColor); // 2020-11-04 [곽제욱] 타일색 변경 추가
							}
							//$administStatsMap.ui.map.setPolyLayerHighlight(adm_cd);
							$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight(region_code);
							if($("#mapRgn_2").is(":visible")){
								if($administStatsMap.ui.curMapId == 1){
									$administStatsMap.ui.mapToggleId1 = "";
								}else{
									$administStatsMap.ui.mapToggleId = "";
								}
							}else{
								$administStatsMap.ui.mapToggleId = "";
							}

						}
						/** 2020-10-20 [곽제욱] 로직 변경 START */
						if($administStatsMain.ui.chartTarget != ""
							&& ($administStatsMain.ui.chartIndex != "" || typeof($administStatsMain.ui.chartIndex) == "number") //20201022 박은식 차트선택 유지 조건 추가
							&& $administStatsMain.ui.chartData != ""
							&& $administStatsMain.ui.chartColor != ""){
							if($administStatsMain.ui.chartTarget == "multiculPopulationChart"){
								$administStatsMain.ui.chartTarget = "";
					    		$administStatsMain.ui.chartIndex = "";
					    		$administStatsMain.ui.chartData = "";
					    		$administStatsMain.ui.chartColor = "";
					    		$administStatsMain.ui.chartTitle = "";
								$administStatsMap.ui.chartToggleYn = "N"
							}
//							else if(!$(".mapExport").hasClass('on')) {
//								$administStatsMain.ui.chartSelectedSave($administStatsMain.ui.chartTarget, $administStatsMain.ui.chartData, $administStatsMain.ui.chartColor, $administStatsMain.ui.chartIndex, "Y", $administStatsMain.ui.chartTitle);
//							}
						}
						/** 2020-10-20 [곽제욱] 로직 변경 END */
						if($administStatsMain.ui.selectedThema == "신혼부부"){
							$newlyDash.ui.getRankSet("","", $administStatsMain.ui.selectedArea); // 2020-11-10 [곽제욱] adm_cd 를 selectedArea 로 변경
							//20201014 박은식 하이라이트 시 선택차트 유지 처리 START
							//20201014 박은식 하이라이트 시 선택차트 유지 처리 END
						} else if(selectedThema == "주택소유"){
							//20201019 박은식 주택 태마일 때 로직 추가 START
							$houseDash.ui.getRankSet("","", $administStatsMain.ui.selectedArea); // 2020-11-10 [곽제욱] adm_cd 를 selectedArea 로 변경
							//20201019 박은식 주택 태마일 때 로직 추가 END
						/** 2020-10-20 [곽제욱] 가구대시보드 초기화+랭크 세팅 세팅 START */
						} else if(selectedThema == "중장년층"){
							$middlDash.ui.getRankSet("","", $administStatsMain.ui.selectedArea);
						//$houseHoldDash.ui.drawContent("PH0001", "T200", "");
						//20201022 박은식 귀농·귀어·귀촌,어가 분기처리 추가 START
						} else if(selectedThema == "귀농·귀어·귀촌"){
							$retunDash.ui.getRankSet("","", $administStatsMain.ui.selectedArea);
						} else if(selectedThema == "통계더보기"){
							$moresDash.ui.getRankSet("","", $administStatsMain.ui.selectedArea);
						}
						//20201022 박은식 귀농·귀어·귀촌,어가 분기처리 추가 END
						/** 2020-10-20 [곽제욱] 가구대시보드 초기화+랭크 세팅 END */

					}
					
					$administStatsMain.ui.logWrite( $("#modalSearchTitle option:selected").text(), "02", region_code ); //jrj 로그 [지역선택]
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
					$administStatsMapApi.request.userAreaBoundInfo(area, type, map.curPolygonCode, event, map);
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

	$administStatsMap.event = {

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

