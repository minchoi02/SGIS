
(function(W,D){
	W.$analysisResultMap = W.$analysisResultMap || {};
	
	$(document).ready(function(){
		$analysisResultMap.event.setUIEvent();
		$analysisResultMap.ui.createMap("mapRgn_1", 0);
		
	});
	
	//UI 내용작성
	$analysisResultMap.ui = {
			namespace : "analysisResultMap",
			mapList : [],
			analysisInfo : null,
			map : null,

		/**
		 * 
		 * @name         : createMap
		 * @description  : 맵 및 맵에 오버레이될 그래프, 범례 등을 생성한다.
		 * @date         : 2018. 09. 17. 
		 * @author	     : 권차욱
		 * @history 	 :
		 */
		createMap : function(id, seq) {
			var map = new sMap.map();
			map.createMap($analysisResultMap, id, {
				center : [ 989674, 1818313 ],
				zoom : 8,
				measureControl : false,
				statisticTileLayer: true
			});
			
			map.id = seq;
			map.addControlEvent("movestart");
			map.addControlEvent("moveend");
			map.addControlEvent("zoomend");	
			map.addControlEvent("draw");
			
			//범례 호출 함수 
			var legend = new sLegendInfo.legendInfo(map);			
			legend.initialize($analysisResultMap.ui);
			map.legend = legend;
			legend.createLegend();
			legend.legendType = "auto";
			
			var btnInfo = new $mapBtn.btnInfo(map, $analysisResultMap);
			map.mapBtnInfo = btnInfo;
			
			var options = {
				intrPoiControl : false,
				intrSettingControl : false,
				mapTypeControl : true,
				intrZoomControl : true
			};
			btnInfo.createUI(options);
			
			//사용자지정컨트롤설정
			this.mapList[seq] = map;
			this.map = map;
			
			map.gMap.whenReady(function() {
				map.createHeatMap();
			});
	
			return map;
		},
		
		/**
		 * 
		 * @name         : doAnalysisResultView
		 * @description  : 분석결과정보를 조회한다.
		 * @date         : 2018. 10. 10. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param data : 분석결과기본정보
		 */
		doAnalysisResultView : function(info, paramInfo) {
			if (info != undefined && info != null) {
				info = JSON.parse(info.replace(/\t/g,' '));
				paramInfo = JSON.parse(paramInfo.replace(/\t/g,' '));
				info["paramInfo"] = paramInfo;
				this.analysisInfo = info;
				
				console.log(this.analysisInfo);
				
				if ($("#user_id").text() != this.analysisInfo.user_id){
					$("#sgisTransfer").hide();
					$("#groupShare").hide();
				}
				//기본정보 설정
				this.setAnalysisTitle(info);
				
				//데이터보드 설정
				$analysisDataBoard.ui.setAnalysisInfo(info);
				
				//센서스데이터조회
				var map = this.mapList[0];
				if (this.analysisInfo.paramInfo.analysis_type == "BUFFER") {
					//센서스데이터 조회 : 최인섭 수정(2017년 데이터 미반영)
					//if (info.paramInfo.param.params.year == "2017") info.paramInfo.param.params.year = "2016";
					$analysisResultMapApi.ui.doCensusResultData(info.paramInfo.param, map, function(res, map) {
						//분석결과 데이터 조회
						$analysisResultMapApi.ui.doAnalysisResultData(info, map, function(res, map) {
							$analysisDataBoard.ui.setResultData(info.paramInfo.analysis_type, res, map);
						});
					});
				}else {
					//분석결과 데이터 조회
					$analysisResultMapApi.ui.doAnalysisResultData(info, map, function(res, map) {
						$analysisDataBoard.ui.setResultData(info.paramInfo.analysis_type, res, map);
					});
				}
			}
		},
		
		/**
		 * 
		 * @name         : setAnalysisTitle
		 * @description  : 분석결과화면의 제목을 설정한다.
		 * @date         : 2018. 10. 10. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param data   : 선택된 경계레이어의 데이터정보
		 */
		setAnalysisTitle : function(data) {
			$("#analysisTitle").html(data.description);
			$("#analysisType").html($analysisResultMap.util.getAnalysisTypeNm(data.paramInfo.analysis_type));
		},
		
		/**
		 * 
		 * @name         : createInfoTooltip
		 * @description  : 경계레이어 선택 시, 툴팁을 생성하여 정보를 표출한다.
		 * @date         : 2018. 10. 10. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param event  : 선택된 경계레이어
		 * @param data   : 선택된 경계레이어의 데이터정보
		 */
		createInfoTooltip : function(event, data, type, map) {
			var html = "<table style='margin:10px;'>";
			if (type == "data") {
				if (data.info != undefined && data.info.length > 0) {
					if ( data.properties.adm_nm != undefined && data.properties.adm_nm != null) {
						html += "<tr><td class='admName'>" + data.properties.adm_nm + "</td></tr>"
					}
					html += "<tr style='height:5px'></tr>";
					html += "<tr>";
					html += "<td style='font-size:12px;padding-left:5px;'>";
					
					if (data.info[map.id].data != undefined) {
						html +=	"분석결과 정보 : " + $commonFunc.appendCommaToNumber(data.info[map.id].data);
					}else {
						html +=	"분석결과 정보 : " + $commonFunc.appendCommaToNumber(data.info[map.id][data.info[map.id].showData]);
					}
					
					//단위가 있다면 단위표시
					if (data.info[map.id].unit != undefined && data.info[map.id].unit.length > 0) {
						html += "&nbsp;(" + data.info[map.id].unit + ")";
					}
					html +=	"</td>";
					html += "</tr>";
					
					if (data.properties.adm_cd != undefined && data.properties.adm_nm != null) {
						//집계구 일경우
						if (data.properties.adm_cd.length > 7) {
							html += "<tr>";
							html += "<td class='statsData'>( " + data.properties.adm_cd + " )</td>";
							html += "</tr>";
						}
					}
				}else {
					html += "<tr><td class='statsData'>N/A</td></td>";
				}
			}else if (type == "buffer") {
				var title = "버퍼_" + (data.properties.dataIdx + 1);
				if ( data.properties.corp_nm != undefined && data.properties.corp_nm != null) {
					title += " (" + data.properties.corp_nm + ")";
				}
				html += "<tr><td class='admName'>" + title + "</td></tr>"
				html += "<tr style='height:5px'></tr>";
				html += "<tr>";
				html += "<td style='font-size:12px;padding-left:5px;'>";
				
				var bufferTypeNm = "";
				if (data.properties.buffer_type == "S") {
					bufferTypeNm = "POI 정적분석 기준 : ";
				}else {
					bufferTypeNm = "POI 동적분석 기준 : ";
				}
				html +=	bufferTypeNm + $commonFunc.appendCommaToNumber(data.properties.data);
				
				//단위가 있다면 단위표시
				if (data.properties.unit != undefined && data.properties.unit.length > 0) {
					html += "&nbsp;(" + data.properties.unit + ")";
				}
				
				var avg = 0;
				if (data.properties.data != 0) {
					avg =  $commonFunc.appendCommaToNumber((parseFloat(data.properties._area.toFixed(2)) / parseFloat(data.properties.data)).toFixed(2));
				}
				
				html +=	"</td>";
				html += "</tr>";
				html += "<tr style='height:5px'></tr>";
				html +=	"<tr>";
				html +=	"<td style='font-size:12px;padding-left:5px;'>";
				html +=	"버퍼반경 : " +  $commonFunc.appendCommaToNumber(parseFloat(data.properties._area.toFixed(2))) + "(㎡) / " +  $commonFunc.appendCommaToNumber(data.properties.data)  + "&nbsp;(" + data.properties.unit + ")";
				html += "</td>";
				html +=	"<tr>";
				html +=	"<td style='font-size:12px;padding-left:5px;'>";
				html +=	"( 1" + data.properties.unit + " 당 " + avg + "㎡ )";
				html += "</td>";
				html +=	"</tr>";
				
			}
			
			html += "</table>";

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
		},
		
		/**
		 * 
		 * @name         : doSendSgis
		 * @description  : SGIS로 파일 전송 신청을 수행한다.
		 * @date         : 2018. 11. 05. 
		 * @author	     : 최재영
		 * @history 	 :
		 */
		doSendSgis : function() {
			var resource_id = $analysisResultMap.ui.analysisInfo.resource_id;
			var scheme = $("#user_id").html();
			
			
			var log_param = "Resource_id - " + resource_id;
			log_param += ", Schema - " + scheme;
			
			switch(this.analysisInfo.paramInfo.analysis_type) {
		 	case "BOUNDARY":
		 		$log.srvLogWrite("Z0", "04", "02", "04", "", log_param);
		 		break;
		 	case "VORONOI":
		 		$log.srvLogWrite("Z0", "04", "03", "04", "", log_param);
		 		break;
		 	case "BUFFER":
		 		$log.srvLogWrite("Z0", "04", "04", "04", "", log_param);
		 		break;
		 	case "LQ":
		 		$log.srvLogWrite("Z0", "04", "05", "04", "", log_param);
		 		break;
		 	case "SPATIAL":
		 		$log.srvLogWrite("Z0", "04", "06", "04", "", log_param);
		 		break;
		 	case "OPERATION":
		 		$log.srvLogWrite("Z0", "04", "07", "04", "", log_param);
		 		break;
		 	}
			
			$commonDataFunc.ui.doSendSgis(scheme, resource_id);
		},
		
		/**
		 * 
		 * @name         : doShare
		 * @description  : 그룹공유를 수행한다.
		 * @date         : 2018. 10. 25. 
		 * @author	     : 권차욱
		 * @history 	 :
		 */
		doShare : function() {
			if (this.analysisInfo.inst_share_yn == "N") {
				var mapId = "#mapRgn_" + ($analysisResultMap.ui.map.id + 1);
				
				
				var log_param = "Resource_id - " + this.analysisInfo.resource_id;
				
				switch(this.analysisInfo.paramInfo.analysis_type) {
			 	case "BOUNDARY":
			 		$log.srvLogWrite("Z0", "04", "02", "06", "", log_param);
			 		break;
			 	case "VORONOI":
			 		$log.srvLogWrite("Z0", "04", "03", "06", "", log_param);
			 		break;
			 	case "BUFFER":
			 		$log.srvLogWrite("Z0", "04", "04", "06", "", log_param);
			 		break;
			 	case "LQ":
			 		$log.srvLogWrite("Z0", "04", "05", "06", "", log_param);
			 		break;
			 	case "SPATIAL":
			 		$log.srvLogWrite("Z0", "04", "06", "06", "", log_param);
			 		break;
			 	case "OPERATION":
			 		$log.srvLogWrite("Z0", "04", "07", "06", "", log_param);
			 		break;
			 	}
				
				$commonDataFunc.ui.doShare(mapId, this.analysisInfo.resource_id, function() {
					$analysisResultMap.ui.analysisInfo.inst_share_yn = "Y";
				});
			}else {
				$message.open("알림", "이미 그룹공유된 분석결과입니다.");
			}
		},
		
		/**
		 * 
		 * @name         : doFavorite
		 * @description  : 즐겨찾기를 수행한다.
		 * @date         : 2018. 11. 08. 
		 * @author	     : 권차욱
		 * @history 	 :
		 */
		doFavorite : function() {
			if (this.analysisInfo.fav_yn == "N") {
				
				var log_param = "Resource_id - " + this.analysisInfo.resource_id;
				
				switch(this.analysisInfo.paramInfo.analysis_type) {
			 	case "BOUNDARY":
			 		$log.srvLogWrite("Z0", "04", "02", "07", "", log_param);
			 		break;
			 	case "VORONOI":
			 		$log.srvLogWrite("Z0", "04", "03", "07", "", log_param);
			 		break;
			 	case "BUFFER":
			 		$log.srvLogWrite("Z0", "04", "04", "07", "", log_param);
			 		break;
			 	case "LQ":
			 		$log.srvLogWrite("Z0", "04", "05", "07", "", log_param);
			 		break;
			 	case "SPATIAL":
			 		$log.srvLogWrite("Z0", "04", "06", "07", "", log_param);
			 		break;
			 	case "OPERATION":
			 		$log.srvLogWrite("Z0", "04", "07", "07", "", log_param);
			 		break;
			 	}
				
				$commonDataFunc.ui.doFavorite(this.analysisInfo.resource_id, function() {
					$analysisResultMap.ui.analysisInfo.fav_yn = "Y";
				});
			}else {
				$message.open("알림", "이미 즐겨찾기된 분석결과입니다.");
			}
		},
		
		/**
		 * 
		 * @name         : doFileDownload
		 * @description  : 분석결과 데이터를 다운로드한다.
		 * @date         : 2018. 10. 25. 
		 * @author	     : 권차욱
		 * @history 	 :
		 */
		doFileDownload : function() {
			var scheme = $analysisResultMap.ui.analysisInfo.user_id;
			var resource_id = $analysisResultMap.ui.analysisInfo.resource_id;
			
			
			var log_param = "Resource_id - " + resource_id;
			log_param += ", Schema - " + scheme;
			
			switch(this.analysisInfo.paramInfo.analysis_type) {
		 	case "BOUNDARY":
		 		$log.srvLogWrite("Z0", "04", "02", "05", "", log_param);
		 		break;
		 	case "VORONOI":
		 		$log.srvLogWrite("Z0", "04", "03", "05", "", log_param);
		 		break;
		 	case "BUFFER":
		 		$log.srvLogWrite("Z0", "04", "04", "05", "", log_param);
		 		break;
		 	case "LQ":
		 		$log.srvLogWrite("Z0", "04", "05", "05", "", log_param);
		 		break;
		 	case "SPATIAL":
		 		$log.srvLogWrite("Z0", "04", "06", "05", "", log_param);
		 		break;
		 	case "OPERATION":
		 		$log.srvLogWrite("Z0", "04", "07", "05", "", log_param);
		 		break;
		 	}
			
			$commonDataFunc.ui.doFileDownload(scheme, resource_id);
		},
		
		/**
		 * 
		 * @name         : doReport
		 * @description  : 보고서를 생성한다.
		 * @date         : 2018. 10. 25. 
		 * @author	     : 권차욱
		 * @history 	 :
		 */
		doReport : function() {
			
			var log_param = "Resource_id - " + this.analysisInfo.resource_id;
			
			switch(this.analysisInfo.paramInfo.analysis_type) {
		 	case "BOUNDARY":
		 		$log.srvLogWrite("Z0", "04", "02", "08", "", log_param);
		 		break;
		 	case "VORONOI":
		 		$log.srvLogWrite("Z0", "04", "03", "08", "", log_param);
		 		break;
		 	case "BUFFER":
		 		$log.srvLogWrite("Z0", "04", "04", "08", "", log_param);
		 		break;
		 	case "LQ":
		 		$log.srvLogWrite("Z0", "04", "05", "08", "", log_param);
		 		break;
		 	case "SPATIAL":
		 		$log.srvLogWrite("Z0", "04", "06", "08", "", log_param);
		 		break;
		 	case "OPERATION":
		 		$log.srvLogWrite("Z0", "04", "07", "08", "", log_param);
		 		break;
		 	}
			
			this.reportPopup = window.open(
					contextPath+"/js/common/report/reportForm.jsp?callback=$analysisResultMap.ui", 
					"reportPrint",
					"width=850, height=700, scrollbars=yes");
		},
		
		/**
		 * 
		 * @name         : reportLoad
		 * @description  : 보고서의 정보를 설정한다.
		 * @date         : 2018. 10. 25. 
		 * @author	     : 권차욱
		 * @history 	 :
		 */
		reportLoad : function() {
			console.log("show");
			
			//그래프
			var chart = [];
			
			if ($analysisResultMap.ui.analysisInfo.paramInfo.analysis_type != "SPATIAL") {
				var data = $commonDataFunc.util.getChartSvgData("#chart01");
				if (data != undefined) {
					chart.push({title:"그래프 정보", data:data});
				}
			}else {
				var data2 = $commonDataFunc.util.getChartSvgData("#chart02");
				if (data2 != undefined) {
					chart.push({title:"그래프 정보", data:data2});
				}
				
				var data3 = $commonDataFunc.util.getChartSvgData("#chart03");
				if (data3 != undefined) {
					chart.push({title:"그래프 정보", data:data3});
				}
			}
			
			
			//표
			var grid = $("#gridTable").clone();
			var mapId = "#mapRgn_" + ($analysisResultMap.ui.map.id + 1);
			setTimeout(function() {
				var mapImageList = [];
				$commonDataFunc.util.doCapture(mapId, function(data) {
					mapImageList.push(data);
					var options = {
 							mapWidth : $(mapId).width(),
 							mapHeight : $(mapId).height(),
 							chart : chart,
 							grid : grid,
 							mapData : mapImageList,
 							data : $analysisResultMap.ui.analysisInfo
 					};
					var popup = $analysisResultMap.ui.reportPopup.$reportForm.ui;
 					popup.setData(options);
				});
			},300);
		}
	};
	
	$analysisResultMap.util = {
			
			/**
			 * 
			 * @name         : getAnalysisTypeNm
			 * @description  : 경계타입명을 가져온다.
			 * @date         : 2018. 10. 25. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type : 분석타입
			 */
			getAnalysisTypeNm : function(type) {
				var name = "";
				switch(type) {
					case "BOUNDARY":	//경계분석
						name = "경계분석";
						break;
					case "VORONOI":		//보로노이다이어그램
						name = "보로노이다이어그램";
						break;
					case "BUFFER":			//버퍼분석
						name = "버퍼분석";
						break;
					case "LQ":					//입지계수 분석
						name = "입지계수";
						break;
					case "OPERATION":	//데이터 연산간 분석
						name = "데이터 간 연산분석";
						break;
					case "SPATIAL":			//공간자기상관분석
						name = "공간자기상관분석";
						break;
					default:
						break;
				}
				return name;
			}
	};
	
	$analysisResultMap.callbackFunc = {

			/**
			 * 
			 * @name         : didMapMoveEnd
			 * @description  : 해당경계 move end 시, 발생하는 콜백함수
			 * @date         : 2017. 08. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param map   : 맵 객체
			 */
			didMapMoveEnd : function(event, map) {
				if ($analysisResultMap.ui.analysisInfo.paramInfo.analysis_type == "VORONOI") {
					var poiList = $analysisResultMapApi.ui.poiDataList;
					var mapBounds = map.gMap.getBounds();
					
					//데이터수가 50개보다 크면,
					//점 표시를 줌레벨 5부터 화면 영역안에 있는 부분만 표출
					//그렇지 않은 경우, 한번에 표출
					if (map.zoom <= 5) {
						if ($analysisResultMapApi.ui.featureLayer != null) {
							$analysisResultMapApi.ui.mapBounds = null;
							map.gMap.removeLayer($analysisResultMapApi.ui.featureLayer);
						}
					}else {
						if ($analysisResultMapApi.ui.featureLayer != null) {
							if (poiList.result.length > 50) {
								if ($analysisResultMapApi.ui.mapBounds != null) {
									if (!mapBounds.contains($analysisResultMapApi.ui.mapBounds.getCenter())) {
										$analysisResultMapApi.ui.drawMarker(poiList, map, "data", "dot");
										map.gMap.addLayer($analysisResultMapApi.ui.featureLayer);
									}
								}else {
									$analysisResultMapApi.ui.drawMarker(poiList, map, "data", "dot");
									map.gMap.addLayer($analysisResultMapApi.ui.featureLayer);
								}
							}else {
								$analysisResultMapApi.ui.drawMarker(poiList, map, "data", "dot");
								map.gMap.addLayer($analysisResultMapApi.ui.featureLayer);
							}
						}
					}
				}
			},
			
			/**
			 * 
			 * @name         : didMouseOverPolygon
			 * @description  : 해당경계 mouse over 시, 발생하는 콜백함수
			 * @date         : 2017. 08. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 일반경계 및 데이터경계 타입
			 */
			didMouseOverPolygon : function(event, data, type, map, refresh) {	
				var layer = event.target;
				if (type != "polygon") {
					if (type == "buffer") {
						map.legend.selectLegendRangeData(event.target.options.fillColor);
						if (refresh == undefined) {
							$analysisDataBoard.ui.selectChartData(data.properties.dataIdx, map.id);
						}
					}else if (type == "data") {
						if ($analysisResultMap.ui.analysisInfo.paramInfo.analysis_type != "BUFFER") {
							if (data.info!=undefined&&data.info.length > 0) {
								map.legend.selectLegendRangeData(event.target.options.fillColor);
								if (refresh == undefined) {
									$analysisDataBoard.ui.selectChartData(data.info[0].dataIdx, map.id);
								}
							}
						}
					}
					$analysisResultMap.ui.createInfoTooltip(event, data, type, map);
				}
			},

			
			/**
			 * 
			 * @name         : didMouseOutPolygo
			 * @description  : 해당경계 mouse out 시, 발생하는 콜백함수
			 * @date         : 2017. 08. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 일반경계 및 데이터경계 타입
			 */
			didMouseOutPolygon : function(event, data, type, map) {
				var layer = event.target;
				if (type == "buffer") {
					layer.setStyle({
						weight : 0,
						fillOpacity : 0.4
					});
				}
			}

	};
	
	//EVENT 내용작성
	$analysisResultMap.event = {
			
			setUIEvent : function(){
				
			}
	};
	
}(window,document));