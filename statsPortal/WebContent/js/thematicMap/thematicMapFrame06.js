/**
 * 대화형 통계지도 화면에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/09/10  초기 작성
 * author : 권차욱, 김성현
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$thematicMapFrame06 = W.$thematicMapFrame06 || {};

	$(document).ready(
		function() {	
			
			//mng_s 화면 크기 조정 - full 20210421 djlee
			if(document.location.href.indexOf("type=full") > 1 ){
				$thematicMapFrame06.ui.doMaxSize(1);
			}
			//mng_e
			
			$thematicMapFrame06.params = getAllParameter();
			$thematicMapFrame06.ui.createMap("mapRgn_1", 0);
			$thematicMapFrame06.event.setUIEvent();
			var mapNavi1 = new mapNavigation.UI();	
			
			//메뉴에서 카타고리 정보 가져온다.
			$thematicMapFrame06.request.getCategory();	
			
			//네비게이션을 만든다.
			mapNavi1.create("mapNavi_1", 1, $thematicMapFrame06.ui);	
			
			//지도를 추가한다.
			$thematicMapFrame06.ui.doAddMap();
			
			setTimeout(function() {
				if (window.parent.$thematicMapMain) {
					$thematicMapFrame06.ui.doAnalysisShareInfo(window.parent.$thematicMapMain.param);
				}else {
					$thematicMapFrame06.request.getStatsThemeMapList($thematicMapFrame06.params.id);
				}
			}, 500);
			

			//leftBox 사이즈 height 줄인다.
			
			// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
//			$('.sqListBox.sq03 .sqList').css("height","185px");						
			// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
			$(".sideQuick.sq03").click();
			
	});
	
	$thematicMapFrame06.ui = {
			mapList : [],
			curMapId : 0,
			namespace: "thematicMap",
			reportPopup : null,
			paramInfo : null,
			
			doAnalysisShareInfo : function(data) {
				if (data.type == "bookmark") {
					var map = this.mapList[0];
					map.openInitStatData($thematicMapFrame06.params, function() {
							
						//통계선택
						$("#selectValue").val(data.stat_sel);
						$("#stat_sel > a").each(function() {
							if ($(this).hasClass("on")) {
								$(this).removeClass("on");
							}
						});
						switch (data.stat_sel) {
							case "leftValue" :
								$("#stat_sel > a").eq(0).addClass("on");
								break;
							case "rightValue" :
								$("#stat_sel > a").eq(1).addClass("on");
								break;
						}

						//지역경계
						$("#selectValue2").val(data.region_boundary);
						$("#region_boundary > a").each(function() {
							if ($(this).hasClass("on")) {
								$(this).removeClass("on");
							}
						});
						switch (data.region_boundary) {
							case "auto" :
								$("#region_boundary > a").eq(0).addClass("on");
								break;
							case "1" :
								$("#region_boundary > a").eq(1).addClass("on");
								break;
							case "2" :
								$("#region_boundary > a").eq(2).addClass("on");
								break;
							case "3" :
								$("#region_boundary > a").eq(3).addClass("on");
								break;
						}
						
						//지도유형
						$("#dataMode").val(data.map_type);
						$("#map_type > a").each(function() {
							if ($(this).hasClass("on")) {
								$(this).removeClass("on");
							}
						});
						switch (data.map_type) {
							case "color" :
								$("#map_type > a").eq(0).addClass("on");
								break;
							case "bubble" :
								$("#map_type > a").eq(1).addClass("on");
								break;
						}
						$thematicMapFrame06.ui.changeDataMode();
						
						//통계표출
						$("#dataMode2").val(data.data_type);
						$("#data_type > a").each(function() {
							if ($(this).hasClass("on")) {
								$(this).removeClass("on");
							}
						});
						switch (data.data_type) {
							case "dataOn" :
								$("#data_type > a").eq(0).addClass("on");
								break;
							case "dataOff" :
								$("#data_type > a").eq(1).addClass("on");
								break;
						}
						$thematicMapFrame06.ui.changeDataMode2();
					});
				}
			},
			
			/**
			 * 
			 * @name         : createMap
			 * @description  : 맵 및 맵에 오버레이될 그래프, 범례 등을 생성한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱, 김성현
			 * @history 	 :
			 */
			createMap : function(id, seq) {
//				$("#view1").attr("style","width:50%");
				var map = new sMap.map();
				
				map.createMap($thematicMapFrame06, id, {
					center : [ 989674, 1818313 ],
					zoom : 1, 
					measureControl : false,
					statisticTileLayer: true
				});
				
				map.id = seq;
				map.addControlEvent("rgeoevent");
				map.addControlEvent("zoomend");	
		
				//범례 호출 함수 
				var legend = new sLegendInfo.legendInfo(map);			
				legend.initialize($thematicMapFrame06.ui);
				map.legend = legend;
				legend.createLegend();
				//작업부분 끝
				
				var btnInfo = new interactiveMapBtnInfo.btnInfo(map);	
				map.mapBtnInfo = btnInfo;

				btnInfo.createUI({
					intrPoiControl : false,
					intrSettingControl : false,
					mapTypeControl : false, //true (위성, 확대축소)
					bizZoomControl : false  //true
				});	
				
				map.createInfoControl();
				
				//공유
				var shareInfo = new share.shareInfo(map, $thematicMapFrame06.ui);
				map.shareInfo = shareInfo;
				$thematicMapFrame06.params["url"] = "/view/thematicMap/thematicMapMain";
				map.shareInfo.setThematicMapShareInfo($thematicMapFrame06.params, "06");
				
				
				//사용자지정컨트롤설정
				this.mapList[seq] = map;
				
				//갤러리 등록
				$galleryAdd.delegate = this;
							
				map.gMap.whenReady(function() {
					map.createHeatMap();	
				});
				
				//$thematicMapFrame06.ui.doAnalysisShareInfo(window.parent.$thematicMapMain.param);
				
				
				//북마크
				setTimeout(function() {
					map.openApiReverseGeoCode(map.center);
				}, 300);
				
			},
			
			/**
			 * 
			 * @name         : doAddMap
			 * @description  : 맵을 추가한다.
			 * @date         : 2015. 10. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doAddMap : function(type) {		
				//지도생성
				this.createMap("mapRgn_2", 1);
				var mapNavi = new mapNavigation.UI();
				mapNavi.firstBoolean = false;
				mapNavi.create("mapNavi_2", 2, $thematicMapFrame06.ui);				
		
				//가운데 버튼 추가
				var leftVal = $("#mapRgn_2").width()-22;

				$("#mapRgn_lock_btn").css("position", "absolute");
				$("#mapRgn_lock_btn").css("z-index", "500");
				$("#mapRgn_lock_btn").css("top", "50%");
				$("#mapRgn_lock_btn").css("left", "49%");
				$("#mapRgn_lock_btn").css("cursor", "pointer");
				
				
				
				// 범례의 타입설정 버튼을 지운다.
				$("#view1 .lgListBox li:eq(0)").hide();
				$("#view2 .lgListBox li:eq(0)").hide();
				
				$thematicMapFrame06.ui.mapList[0].commonMoveEventLeft();
				$thematicMapFrame06.ui.mapList[1].commonMoveEventRight();
			},
			
			/**
			 * @name         : reportLoad
			 * @description  : 보고서의 데이터를 설정한다.
			 * @date         : 2015. 11. 10. 
			 * @author	     : 권차욱
			 */
			reportLoad : function() {
				var map1 = this.mapList[0];
				var map2 = this.mapList[1];
				var dataGeoJson = [];
				dataGeoJson.push(map1.dataGeoJsonArray);
				dataGeoJson.push(map2.dataGeoJsonArray);
							
				var mapType = "thematicMap";
				var divId1 = "#mapRgn_1";
				var divId2 = "#mapRgn_2";
				
				var title, adm_nm, origin, companyObj, subTitle;
				var chart = null;
				var legend = null;
				var param = {};
				var selectOption = $("#selectValue").val(); // 통계 선택 (수/율)
				
				$(".sop-control-scale").attr("data-html2canvas-ignore", true);
				
				var dataList1 = { 					
						id : map1.id, 
						divId : divId1,
						geojson : map1.dataGeojsonLayer, 
						data : map1.dataForCombine,
						legend : {
							valPerSlice : map1.legend.valPerSlice,
							legendColor : map1.legend.legendColor,
							legendId: "#legend_"+map1.legend.id,
							legendType : map1.legend.legendType
						},
						scale : $(".sop-control-scale").eq(0).html(),
						param : map1.initData, // 초기데이터
						zoom : map1.zoom,
						center : map1.center,
						isCaption : map1.legend.numberData,
						dataType : map1.legend.selectType,
						selectOption : selectOption,
						origin : $("#thematicMapOrigin").html(),
				};
				
				var dataList2 = {
						id : map2.id, 
						divId : divId2,
						geojson : map2.dataGeojsonLayer, 
						data : map2.dataForCombine,
						legend : {
							valPerSlice : map2.legend.valPerSlice,
							legendColor : map2.legend.legendColor,
							legendId: "#legend_"+map2.legend.id,
							legendType : map2.legend.legendType
						},
						param : map2.initData, // 초기데이터
						zoom : map2.zoom,
						center : map2.center,
						isCaption : map2.legend.numberData,
						dataType : map2.legend.selectType,
						selectOption : selectOption,
						origin : $("#thematicMapOrigin2").html(),
				};
				
				var targetId = [divId1, divId2];
				var canvasList = [];
    			for (var i=0; i<targetId.length; i++) {
					var agent = navigator.userAgent.toLowerCase();
					if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
	    				var capture = html2canvas($(targetId[i]), {
	                        logging: true,
	                        useCORS: false,
	                        proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
	                        onrendered : function(canvas, id) {
	                        	//익스플로러 예외처리
	                        	//2017.03.14 svg처리
	                        	/*var agent = navigator.userAgent.toLowerCase();
		                     	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
		                     		var doc = document.querySelector(id.selector); 
		                     		var mapContainer = null;
		                     		for (var x=0; x<doc.childNodes.length; x++) {
		                     			var tmpClassName = doc.childNodes[x].className;
		                     			if (tmpClassName.indexOf("sop-map-pane") != -1) {
		                     				mapContainer = doc.childNodes[x];
		                     				break;
		                     			}
		                     		}
		                     		if (mapContainer != null) {
		                     			var svgList = mapContainer.querySelectorAll("svg");
			                     		for (var x=0; x<svgList.length; x++) {
			                     			var svg = svgList[x];
			                     			var xml  = new XMLSerializer().serializeToString(svg);
				                            var tmpCanvas = document.createElement("canvas");
				                            canvg(tmpCanvas, xml);
				                            var marginLeft = (tmpCanvas.width - canvas.width)/2;
				                            var marginTop = (tmpCanvas.height - canvas.height)/2;
				                            var ctx = canvas.getContext("2d");
				                            ctx.drawImage(tmpCanvas, -marginLeft, -marginTop, tmpCanvas.width, tmpCanvas.height);
			                     		}
		                     		}
		                     	}*/
	                        	canvasList.push(canvas); 
	                        	if (canvasList.length == targetId.length) {
	                        		var targetCanvas = document.createElement("canvas");
	                        		var width = canvas.width;
	                        		var height = canvas.height;
	                        		var dx = 0, dy = 0;
	                        		targetCanvas.width = canvas.width *2;
	                        		targetCanvas.height = canvas.height;
	                        		var ctx = targetCanvas.getContext("2d");
	                    			for (var x=0; x<canvasList.length; x++) {
	                    				if (x != 0) {
	                    					dx += width;
	                    				}
	                    				ctx.drawImage(canvasList[x], dx, dy, width, height);
	                    			}
	                    			
	                    			var data = targetCanvas.toDataURL();  
	                        		
	                        		
	                        		var options1 = {				
	            							mapType : mapType,
	            							mapWidth : $(divId1).width()*2,
	            							mapHeight : $(divId1).height(),
	            							chart : chart,
	            							legend :legend,	
	            							id : map1.id,
	            							mapData : data
	                        		};
	            				
		            				var options2 = {
		            						mapType : mapType,
		            						mapClone : $(divId2).clone(),
		            						mapWidth : $(divId2).width()*2,
		            						mapHeight : $(divId2).height(),
		            						chart : chart,
		            						legend :legend,
		            						id : map2.id,
		            						mapData : data
		            				};
		            								
		            				var popup =  $thematicMapFrame06.ui.reportPopup.$reportForm.ui;
		            				popup.setData(deepCopy(dataList1),deepCopy(dataList2),options1,options2,dataGeoJson);
	                        		
	                        	}
	                        	
	                        }
	                    });
					}else{
	    				var capture = html2canvas($(targetId[i])[0], {
							logging: true,
		                    useCORS: false,
		                    proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp"
						}).then(function(canvas) {
                        	canvasList.push(canvas); 
                        	if (canvasList.length == targetId.length) {
                        		var targetCanvas = document.createElement("canvas");
                        		var width = canvas.width;
                        		var height = canvas.height;
                        		var dx = 0, dy = 0;
                        		targetCanvas.width = canvas.width *2;
                        		targetCanvas.height = canvas.height;
                        		var ctx = targetCanvas.getContext("2d");
                    			for (var x=0; x<canvasList.length; x++) {
                    				if (x != 0) {
                    					dx += width;
                    				}
                    				ctx.drawImage(canvasList[x], dx, dy, width, height);
                    			}
                    			
                    			var data = targetCanvas.toDataURL();  
                        		
                        		
                        		var options1 = {				
            							mapType : mapType,
            							mapWidth : $(divId1).width()*2,
            							mapHeight : $(divId1).height(),
            							chart : chart,
            							legend :legend,	
            							id : map1.id,
            							mapData : data
                        		};
            				
	            				var options2 = {
	            						mapType : mapType,
	            						mapClone : $(divId2).clone(),
	            						mapWidth : $(divId2).width()*2,
	            						mapHeight : $(divId2).height(),
	            						chart : chart,
	            						legend :legend,
	            						id : map2.id,
	            						mapData : data
	            				};
	            								
	            				var popup =  $thematicMapFrame06.ui.reportPopup.$reportForm.ui;
	            				popup.setData(deepCopy(dataList1),deepCopy(dataList2),options1,options2,dataGeoJson);
                        		
                        	}
						});
					}
    			}
				
				
				
				
			},
			
			/**
			 * @name         : reportDataSet
			 * @description  : 보고서 데이터 세팅
			 * @date         : 2015. 10. 01. 
			 * @author	     : 김성현
			 * @param  res 결과데이터
			 * @param  options  기타데이터
			 */
			reportDataSet : function(type) {
				var tempVal = $("#mapRgn_lock_btn").attr("alt");
					if(tempVal=="locked"){
					
					this.curMapId = parseInt(type)-1;
					var map = this.mapList[this.curMapId];
					if (map.dataGeojson == null && 
						map.multiLayerControl.dataGeojson == null 
						) {
						messageAlert.open("알림", "출력할 결과가 없습니다.");
		 				return;
					}
					$thematicMapFrame06.ui.reportPopup = 
						window.open("/js/thematicMap/report/06/reportForm.html", "reportPrint","width=850, height=700, scrollbars=yes");
				}else{
					messageAlert.open("알림", "화면 중단에 있는 자물쇠 버튼을 눌러주세요.<br><br><img src='/img/common/icon_temp_sseok_2.png'>");
				}
			},
			
			/**
			 * 
			 * @name         : changeLeftRightValue
			 * @description  : 주제도 통계 선택을 변경한다. 
			 * @date         : 2015. 11. 13. 
			 * @author	     : 
			 * @history 	 :
			 */
			changeLeftRightValue : function() {
				if($("#stat_sel > a").length > 1){
					var map1 = $thematicMapFrame06.ui.mapList[0];
					var map2 = $thematicMapFrame06.ui.mapList[1];
					map1.selectStatsOption = true;
					map1.changeRegionBound();						
					map1.selectStatsOption = false;
					map2.selectStatsOption = true;
					map2.changeRegionBound();						
					map2.selectStatsOption = false;								
				} else {
					// 통계선택이 하나일 경우 갱신 안하도록
					$thematicMapFrame06.Popup.close();
				}
			},		
			
			
			/**
			 * 
			 * @name         : changeDataMode
			 * @description  : 주제도 지도유형 변경한다. 
			 * @date         : 2015. 12. 3. 
			 * @author	     : 
			 * @history 	 :
			 */
			changeDataMode : function() {
				var map1 = $thematicMapFrame06.ui.mapList[0];
				var map2 = $thematicMapFrame06.ui.mapList[1];
				
				var tempData1 = map1.dataGeoJsonArray;
				var tempData2 = map2.dataGeoJsonArray;
				
				//시군구, 읍면동인 경우에만 multiLayerControl를 이용한다.
		
					//밑에 없으면 이상해짐
					if(tempData1 != undefined && tempData1.length && tempData1 != null > 0) {
						map1.multiLayerControl.dataGeojson = tempData1;
					}
					if(tempData2 != undefined && tempData2.length && tempData2 != null> 0) {
						map2.multiLayerControl.dataGeojson = tempData2;
					}

					
				if($('#dataMode').val()=='bubble'){		
					//changeDataMode
					$('#lgTypeList_'+map1.legend.id+' a:eq(2)').trigger("click");
					$('#lgTypeList_'+map2.legend.id+' a:eq(2)').trigger("click");
					
					//mng_s 20200715 이진호
					//지도유형이 버블일 경우 상단 툴팁 안보이게 처리
					$("#view1").find(".sop-top.sop-right").css('display', 'none');
					$("#view2").find(".sop-top.sop-left").css('display', 'none');
					//mng_e 20200715 이진호
				}else{
					$('#lgTypeList_'+map1.legend.id+' a:eq(1)').trigger("click");
					$('#lgTypeList_'+map2.legend.id+' a:eq(1)').trigger("click");
					
					//mng_s 20200715 이진호
					//지도유형이 버블이 아닐경우 상단 툴팁 보이게
					$("#view1").find(".sop-top.sop-right").css('display', '');
					$("#view2").find(".sop-top.sop-left").css('display', '');
					//mng_e 20200715 이진호
				}		
				map1.checkShowCaption();
				map2.checkShowCaption();
			},	
			
			/**
			 * 
			 * @name         : changeDataMode2
			 * @description  : caption on/off 변경한다. 
			 * @date         : 2015. 12.22. 
			 * @author	     : 
			 * @history 	 :
			 */
			changeDataMode2 : function() {
				
				var map1 = $thematicMapFrame06.ui.mapList[0];				
				var map2 = $thematicMapFrame06.ui.mapList[1];				
				if($('#dataMode2').val()=='dataOff'){
					map1.legend.numberData = false;
					//map1.changeRegionBound();	
					map2.legend.numberData = false;
					//map2.changeRegionBound();	
				}else{
					map1.legend.numberData = true;
					//map1.changeRegionBound();	
					map2.legend.numberData = true;
					//map2.changeRegionBound();	
				}
				map1.checkShowCaption();
				map2.checkShowCaption();
				
			},	
			
			/**
			 * 
			 * @name         : doInnerMap
			 * @description  : 
			 * @date         : 2015. 10. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param type
			 */
			doInnerMap : function(type, isShow) {
				this.curMapId = parseInt(type)-1;
				var map = this.mapList[this.curMapId];
				map.setInnerMap(isShow);
				
				if (isShow) {
					$("#btnList_"+type).find("ul").hide();
					$("#btnList_"+type).css("margin-right", "5px");
					map.mapBtnInfo.controlHide("poi");
					map.mapBtnInfo.controlHide("setting");
					map.clearDataOverlay();
				}else {
					$("#btnList_"+type).find("ul").show();
					$("#btnList_"+type).css("margin-right", "0px");
					map.mapBtnInfo.controlShow("poi");
					map.mapBtnInfo.controlShow("setting");
				}	
				
			},
			
			/**
			 * @name         : mapLoad
			 * @description  : 범례결합창의 데이터를 설정한다.
			 * @date         : 2015. 10. 20. 
			 * @author	     : 김성현
			 * @param  type	 : 맵타입
			 */
			mapLoad : function() {
				var data = [];
				for (var i=0; i<this.mapList.length; i++) {
					if (this.mapList[i] != null) {
						var map = this.mapList[i];
						//console.log(map.dataForCombine);
						data.push({
							id : map.id, 
							geojson : map.dataGeojsonLayer, 
							data : map.dataForCombine,
							legend : {
								valPerSlice : map.legend.valPerSlice,
								legendColor : map.legend.legendColor
							},
							param:this.dropBtnInfo[map.id],
							zoom:map.zoom,
							center:map.center,
							adm_cd : map.curAdmCd
						});
					}
					
				}
				var popup = $thematicMapFrame06.ui.combinePopup.$combineMap.ui;
				popup.setData(deepCopy(data));
			},	
			
			/**
			 * 
			 * @name         : requestOpenApi
			 * @description  : 통계정보를 요청한다.
			 * @date         : 2015. 10. 08. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param options
			 */
			requestOpenApi : function(options) {
				options.map.isDrop = true;
				options.map.undoDropLayerBounds();
				
				//param의 adm_cd가 00(전국)일 경우 adm_cd 삭제
				var tmpOptions = [];
				for (var i = 0; i < options.param.length; i ++) {
					if(options.param[i].key == "adm_cd" && options.param[i].value == "00") {
					} else {
						tmpOptions.push(options.param[i]);
					} 
				}
				options.param = tmpOptions;

				var api_id = options.api_id;
				if 	    (api_id == "API_0301") $thematicMapFrame06Api.request.openApiTotalPopulation(options);
				else if (api_id == "API_0302") $thematicMapFrame06Api.request.openApiSearchPopulation(options);
				else if (api_id == "API_0303") $thematicMapFrame06Api.request.openApiInderstryCode(options);
				else if (api_id == "API_0304") $thematicMapFrame06Api.request.openApiCompany(options);
				else if (api_id == "API_0305") $thematicMapFrame06Api.request.openApiHouseHold(options);
				else if (api_id == "API_0306") $thematicMapFrame06Api.request.openApiHouse(options);
				else if (api_id == "API_0307") $thematicMapFrame06Api.request.openApiFarmHouseHold(options);
				else if (api_id == "API_0308") $thematicMapFrame06Api.request.openApiForestryHouseHold(options);
				else if (api_id == "API_0309") $thematicMapFrame06Api.request.openApiFisheryHouseHold(options);
				else if (api_id == "API_0310") $thematicMapFrame06Api.request.openApiHouseHoldMember(options);
				
			},
			
			
			/**
			 * 
			 * @name         : reqSetParams
			 * @description  : 통계정보 파라미터를 설정한다.
			 * @date         : 2015. 10. 30. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param options
			 */
			reqSetParams : function (tmpParam, adm_cd, adm_nm, api_id, map) {
				var params = {
						param : tmpParam.params,
						noneParams : tmpParam.noneParams,
						adm_cd : adm_cd,
						adm_nm : adm_nm,
						filter : tmpParam.filterParam,
						unit : tmpParam.unit,
						title : tmpParam.title,
						api_id : api_id,
						map : map,
						view_type : "NM",
						maxYear : tmpParam.maxYear
				};	
				params.param.push({
					key : "low_search",
					value : map.boundLevel
				});
				
				return params;
			},
			//20년수정반영 시작 (공유 메서드)
			doShare : function(type) {
				this.curMapId = parseInt(type)-1;
				var shareInfo = this.mapList[this.curMapId].shareInfo;
				var map = this.mapList[this.curMapId];
				var shareData = shareInfo.shareUrlInfo;
				var stat_sel, region_boundary, map_type, data_type, select_base_year;
				var title = "";
				//통계선택
				$("#stat_sel > a").each(function() {
					if ($(this).hasClass("on")) {
						stat_sel = $("#selectValue").val();
					}
				});
				
				//지역선택
				$("#region_boundary > a").each(function() {
					if ($(this).hasClass("on")) {
						region_boundary = $("#selectValue2").val();
					}
				});
				
				//지도유형
				$("#map_type > a").each(function() {
					if ($(this).hasClass("on")) {
						map_type = $("#dataMode").val();
					}
				});
				
				//통계표출
				$("#data_type > a").each(function() {
					if ($(this).hasClass("on")) {
						data_type = $("#dataMode2").val();
					}
				});
				
				//조회년도
				select_base_year = $("#select_base_year option:selected").text();
				var params = {
						"stat_sel" : stat_sel,
						"region_boundary" : region_boundary,
						"map_type" : map_type,
						"data_type" : data_type,
						"stat_thema_map_id" : window.parent.$thematicMapMain.param.stat_thema_map_id,
						"theme" : window.parent.$thematicMapMain.param.theme,
						"mapType" : window.parent.$thematicMapMain.param.mapType,
						"select_base_year" : select_base_year,
						"iframe_url" : window.location.protocol+"//"+window.location.host+"/view/thematicMap/thematicMapFrame04"
					};
				if(shareInfo == null) {
					messageAlert.open("알림", "공유할 수 없는 데이터입니다.");
				} else {
					if (shareInfo.checkShare("SHARE")) {
						for (var i=0; i<shareData.length; i++) {
							title = $(".helperText > span").html();
							//2016.10.25 lbdms 캡쳐를 위한 정보 수정
							if (shareData[i].params != undefined) {
								if (shareData[i].params.mapInfo != undefined) {
									shareData[i].params.mapInfo.center = map.center;
									shareData[i].params.mapInfo.zoomlevel = map.zoom;
									shareData[i].params.paramInfo = params;
									//2017.02.22 이미지캡쳐 수정
									var captureTargetId = "#mapRgn_"+type;
									shareData[i].params["mapCaptureId"] = captureTargetId;
								}
							}
						}	
						shareInfo.doShare(title, "THEME");
					}
				}
				
			},
			shareToKakaoStory : function() {
				var shareInfo = this.mapList[this.curMapId].shareInfo;
				var linkUrl = $("#sharedlg").find($("input")).val();
				shareInfo.doShareToKakaoStory(linkUrl);
			},
			//20년수정반영 끝 (공유 메서드)
			/**
			 * 
			 * @name         : doBookMark
			 * @description  : 북마크를 수행한다.
			 * @date         : 2017. 01. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doBookMark : function(type, srvType) {
				this.curMapId = parseInt(type)-1;
				var shareInfo = this.mapList[this.curMapId].shareInfo;
				var map = this.mapList[this.curMapId];
				
				if(shareInfo == null) {
					messageAlert.open("알림", "저장할 수 없는 데이터입니다.");
				} else {
					if (shareInfo.checkShare("BMARK", srvType)) {
						var shareData = shareInfo.shareUrlInfo;
						var stat_sel, region_boundary, map_type, data_type;
						var title = $(".helperText > span").html();
						
						//통계선택
						$("#stat_sel > a").each(function() {
							if ($(this).hasClass("on")) {
								stat_sel = $("#selectValue").val();
							}
						});
						
						//지역선택
						$("#region_boundary > a").each(function() {
							if ($(this).hasClass("on")) {
								region_boundary = $("#selectValue2").val();
							}
						});
						
						//지도유형
						$("#map_type > a").each(function() {
							if ($(this).hasClass("on")) {
								map_type = $("#dataMode").val();
							}
						});
						
						//통계표출
						$("#data_type > a").each(function() {
							if ($(this).hasClass("on")) {
								data_type = $("#dataMode2").val();
							}
						});
						
						var params = {
								"stat_sel" : stat_sel,
								"region_boundary" : region_boundary,
								"map_type" : map_type,
								"data_type" : data_type,
								"stat_thema_map_id" : window.parent.$thematicMapMain.param.stat_thema_map_id,
								"theme" : window.parent.$thematicMapMain.param.theme,
								"mapType" : window.parent.$thematicMapMain.param.mapType,
								"iframe_url" : window.location.protocol+"//"+window.location.host+"/view/thematicMap/thematicMapFrame06"
							};
						
						
						for (var i=0; i<shareData.length; i++) {
							shareData[i].params.paramInfo = params;
							//2017.02.22 이미지캡쳐 수정
							shareData[i].params["mapCaptureId"] = ["#mapRgn_1", "#mapRgn_2"];
						}
						
						//갤러리 등록일 경우
						if (srvType != undefined && srvType != "THEME") {
							switch (srvType) {
								case "gallary":
									var captureTargetId = ["#mapRgn_1", "#mapRgn_2"];
									$galleryAdd.map = map;
									$galleryAdd.makeImageURL("THEME", captureTargetId);
									break;
								case "report":
									this.reportPopup.$reportFormEvent.UI.makeImageURL("THEME");
									break;
							}
							return;
						} 
						
						var currentdate = new Date(); 
					    var datetime = currentdate.getFullYear() + "-"
					    			+ (currentdate.getMonth()+1)  + "-" 
					    			+ currentdate.getDate() + " "
					                + currentdate.getHours() + ":"  
					                + currentdate.getMinutes() + ":" 
					                + currentdate.getSeconds();
					    
						$("#savesubj").val(title);
						$("#savedate").val(datetime);
						
						$(".deem").show();
						$("#myGalleryPop").hide();
						$("#bookmarkdlg").show();
					}
				}
			},
			
			/**
			 * 
			 * @name         : doDone
			 * @description  : 경계정보를 설정한다.
			 * @date         : 2017. 01. 15. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */
			doDone : function(type) {
				var map = this.mapList[this.curMapId];
				if (type == "sharedlg") {
					copyToClipboard($("#sharedlg").find($("input")).val());
				}
				else if (type == "bookmarkdlg") {
					map.shareInfo.doBookMark($("#savesubj").val(), "THEME");
				}
				$("#"+type).hide();	
				$(".deem").hide();
			},
			
			/**
			 * 
			 * @name         : doCancel
			 * @description  : 경계정보 설정을 취소한다.
			 * @date         : 2017. 01. 15. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */
			doCancel : function(type) {
				$("#"+type).hide();	
				$(".deem").hide();
			},
	   		 doMaxSize : function(){
		 			var ck = $("#fullScreen").hasClass("on"); 
		 			if(!ck){
		 				$("#fullScreen").children().attr("src","/img/ico/ico_toolbars12.png");//20년수정반영  (아이콘 변화)
		 				$("#fullScreen").addClass("on");
		 				$("header",window.parent.document).hide();
		 				$(".map_dummy",window.parent.document).css("height","100vh");
		 			}else{
		 				$("#fullScreen").children().attr("src","/img/ico/ico_toolbars01.png");//20년수정반영  (아이콘 변화)
		 				$("#fullScreen").removeClass("on");
		 				$("header",window.parent.document).show();
		 				$(".map_dummy",window.parent.document).css("height","865px");// 20년수정반영 (전체화면 해제시 화면 높이를 833px ==> 865px로 수정) 
		 			}
					for (var i=0; i<this.mapList.length; i++) {
						if (this.mapList[i] != null) {
							this.mapList[i].update();
						}
					}
	 		},
	 		//20년수정반영 시작 (초기화 메서드)
			doClearMap : function(type) {
				$(".dscList").hide();
				$(".thematicCharts").hide();
	 			$(".sop-overlay-pane>svg>g").hide();
	 			var map1 = $thematicMapFrame06.ui.mapList[0];				
				var map2 = $thematicMapFrame06.ui.mapList[1];				
				map1.legend.numberData = false;
				map2.legend.numberData = false;
				map1.checkShowCaption();
				map2.checkShowCaption();
	 		},
			//20년수정반영 끝 (초기화 메서드)
	 		mapImageDown : function(){
				messageConfirm.open( "알림", "해당 이미지를 저장 하시겠습니까?",
	    			 btns = [
						{
						    title : "저장",
						    fAgm : null,
						    disable : false,
						    func : function(opt) {
						    	var agent = navigator.userAgent.toLowerCase();
						    	
						    	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
						    		html2canvas($("#mapRgn_1"), {
						    			logging: false,
						    			useCORS: false,
						    			proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
						    			onrendered: function(canvas1) {
											var title = window.parent.$thematicMapMain.themaInfo.title.replace(/\s/gi,"_");
											
											if( window.parent.$thematicMapMain.themaInfo.left_sep_ttip_title ){
							    				title = window.parent.$thematicMapMain.themaInfo.left_sep_ttip_title.replace(/\s/gi,"");									
							    			} 
											var blob = canvas1.msToBlob();
											window.navigator.msSaveBlob(blob,title+'.png');
							    			
							    			html2canvas($("#mapRgn_2"), {
							    				logging: false,
							    				useCORS: false,
							    				proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
							    				onrendered: function(canvas2) {
								    				if( window.parent.$thematicMapMain.themaInfo.left_sep_ttip_title ){
								    					title = window.parent.$thematicMapMain.themaInfo.sep_map_left_sep_ttip_title.replace(/\s/gi,"");									
								    				} 
								    				var blob2 = canvas2.msToBlob();
													window.navigator.msSaveBlob(blob2,title+'.png');
							    				}
							    			});
							    		}
						    		});

						    	} else {
						    		html2canvas($("#mapRgn_1")[0], {
						    			logging: false,
						    			useCORS: false,
						    			proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp"
						    		}).then(function(canvas) {
						    			var title = window.parent.$thematicMapMain.themaInfo.title.replace(/\s/gi,"_");
						    			
						    			var a = document.createElement('a');
						    			a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
						    			if( window.parent.$thematicMapMain.themaInfo.left_sep_ttip_title ){
						    				title = window.parent.$thematicMapMain.themaInfo.left_sep_ttip_title.replace(/\s/gi,"");									
						    			} 
						    			a.download = title+".png";
						    			a.click();
						    			
						    			html2canvas($("#mapRgn_2")[0], {
						    				logging: false,
						    				useCORS: false,
						    				proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp"
						    			}).then(function(canvas) {
						    				var a = document.createElement('a');
						    				a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
						    				if( window.parent.$thematicMapMain.themaInfo.left_sep_ttip_title ){
						    					title = window.parent.$thematicMapMain.themaInfo.sep_map_left_sep_ttip_title.replace(/\s/gi,"");									
						    				} 
						    				a.download = title+".png";
						    				a.click();
						    			});
						    		});
						    	}
						    }
						 },
	    			     {
						   title : "취소",
						   fAgm : null,
						   disable : false,
						   func : function(opt) {}
	    			     }   
	    			 ]
		    	);
			}
	};
	
	// ==============================//
	// map event callback
	// ==============================//
	$thematicMapFrame06.callbackFunc = {

			// 맵이동 시작시, 콜백 호출
			didMapMoveStart : function(event, map) {
			},

			// 맵이동 종료시, 콜백 호출
			didMapMoveEnd : function(event, map) {
				var poiControl = map.mapBtnInfo;
				
				//테마poi조회
				if (poiControl.isOpenPOI && 
					poiControl.themeCd != undefined && 
					poiControl.themeCd.length > 0) {
						if (poiControl.mapBounds == null) {
							map.markers.clearLayers();
							poiControl.reqThemePoiInfo(poiControl.themeCd, "0");
						}else {
							if (!poiControl.mapBounds.contains(map.gMap.getCenter())) {
								map.markers.clearLayers();
								poiControl.reqThemePoiInfo(poiControl.themeCd, "0");
							}
						}	
				}
				
				//사업체poi조회
				if (poiControl.isOpenPOI && 
						poiControl.class_cd != undefined && 
						poiControl.class_cd.length > 0) {
							if (poiControl.mapBounds == null) {
								map.markers.clearLayers();
								poiControl.reqCompanyPoiInfo(poiControl.class_cd, "9", "0");
							}else {
								if (!poiControl.mapBounds.contains(map.gMap.getCenter())) {
									map.markers.clearLayers();
									poiControl.reqCompanyPoiInfo(poiControl.class_cd, "9", "0");
								}
							}	
					}
			},

			// 맵 줌시작 시, 콜백 호출
			didMapZoomStart : function(event, map) {
			},

			// 맵 줌 종료 시, 콜백 호출
			didMapZoomEnd : function(event, map) {
				//20200611 수정 시작 (ggm)
				if(map.mapBtnInfo.refreshWhiteMap){
					map.mapBtnInfo.refreshWhiteMap();
				}
				//20200611 수정 끝				
				
				if (map.zoom < 10 && map.isInnerMapShow) {
					$thematicMapFrame06.ui.doInnerMap(map.id+1);
				}
			},

			
			/**
			 * 
			 * @name         : didMouseOverPolygon
			 * @description  : 해당경계 mouse over 시, 발생하는 콜백함수
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 일반경계 및 데이터경계 타입
			 */
			didMouseOverPolygon : function(event, data, type, map, mapid) {	
				if (type != "polygon") {
					if (type == "data") {
						if (data.info.length > 0) {
							map.legend.selectLegendRangeData(event.target.options.fillColor);						
						}
					}
				}
			},

			
			/**
			 * 
			 * @name         : didMouseOutPolygo
			 * @description  : 해당경계 mouse out 시, 발생하는 콜백함수
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 일반경계 및 데이터경계 타입
			 */
			didMouseOutPolygon : function(event, data, type, map) {
			},

			/**
			 * 
			 * @name         : didDrawCreate
			 * @description  : 사용자지정 draw 이벤트콜백
			 * @date         : 2014. 10. 30. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param event 이벤트객체
			 * @param @param type  객체타입
			 * @param @param map   델리케이트
			 */
			didDrawCreate : function(event, type, map) {
			}

	};
	
	$thematicMapFrame06.event = {
			
			/**
			 * 
			 * @name         : setUIEvent
			 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date         : 2014. 10. 15. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */	
			setUIEvent : function() {
				Kakao.init('167fc6abf0eb4717e1f3de7895a0152a');//20년수정반영 (카카오 초기화)
				var isClose = false;
				$(".tb_close").click(function(){ 
					isClose = true;
					$(this).hide(); 
					$(".resizeIcon").hide();
					$(".interactiveView").each(function(i){
						$(this).text("VIEW"+parseInt(i+1));
					});
					
					var sceneInx = $(".sceneBox.on").length;
					if (sceneInx == 1) {
						$(".tb_combine").parent().hide();
						$(".viewTitle > span").hide();
					}else if (sceneInx == 2) {
						var tmpView = [];
						var isSameView = false;
						$(".sceneBox.on").each(function() {
							var id = parseInt($(this).attr("id").split("view")[1])-1;
							tmpView.push(id);
							if (id == $thematicMapFrame06.ui.curMapId) {
								isSameView = true;
							}
						});						
						
						if (!isSameView) {
							if (tmpView[0] < tmpView[1]) {
								$thematicMapFrame06.ui.curMapId = tmpView[0];
							}else {
								$thematicMapFrame06.ui.curMapId = tmpView[1];
							}
							
							var id = "view" + ($thematicMapFrame06.ui.curMapId + 1);
							switch($thematicMapFrame06.ui.curMapId) {
								case 0:
									$("#"+id).find(".toolBar").css("background", "#0070c0");
									break;
								case 1:
									$("#"+id).find(".toolBar").css("background", "#9ed563");
									break;
								case 2:
									$("#"+id).find(".toolBar").css("background", "#ff0066");
									break;
							}
						}	
					}
			    }); 
				
				$(".sceneBox").click(function(){
					var sceneInx = $(".sceneBox.on").length; 
					var id = $(this).attr("id");
					if (sceneInx > 1) {
						if (!isClose) {
							$(".sceneBox").find(".toolBar").css("background", "#ffffff");
						}
						if (id == "view1") {
							$thematicMapFrame06.ui.curMapId = 0;
							$(this).find(".toolBar").css("background", "#0070c0");
						}else if (id == "view2") {
							$thematicMapFrame06.ui.curMapId = 1;
							$(this).find(".toolBar").css("background", "#9ed563");
						}else {
							$thematicMapFrame06.ui.curMapId = 2;
							$(this).find(".toolBar").css("background", "#ff0066");
						}
						$(".sceneBox").find(".tb_mapAdd").parent().show();
						
						if (sceneInx == 3) {
							$(".sceneBox").find(".tb_mapAdd").parent().hide();
							$(".sceneBox").css({"z-index":"8", "border":"2px solid #333"});
							$(this).css({"z-index":"10"});
							
						}
					}else {
						$(".sceneBox").find(".toolBar").css("background", "#ffffff");
					}
					isClose = false;
			    });
				
				$(".tb_radio .fl").click(function(){ 
					$(".tb_radio").css("background","url(/img/bg/bg_tbradio_on.png)");  
			    });
				$(".tb_radio .fr").click(function(){ 
					$(".tb_radio").css("background","url(/img/bg/bg_tbradio_off.png)");  
			    });
				
				$("#mapRgn_lock_btn").click(function() {
		   			 srvLogWrite('B0','04','02','00',window.parent.$thematicMapMain.themaInfo.title,'');
					var tempVal = $("#mapRgn_lock_btn").attr("alt");
					
					if(tempVal == "locked") {
						$("#mapRgn_lock_btn").attr("alt", "unlocked");
						$("#mapRgn_lock_btn").attr("src", "/img/common/icon_temp_sseok_2.png");
						$("#mapNavi_2").show();
						$("#view2 .interactiveIco").show();
												
					} else {
						$("#mapRgn_lock_btn").attr("alt", "locked");
						$("#mapRgn_lock_btn").attr("src", "/img/common/icon_temp_sseok.png");
						$("#mapNavi_2").hide();
						$("#view2 .interactiveIco").hide();
						
						$thematicMapFrame06.ui.mapList[0].gMap.fire("zoomend");
					}
				});

			},
			
			// mng_s 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
			refreshThemaList : function(select_obj) {
				var categoryId = select_obj.id.substring(0, 8);
				window.parent.$thematicMapMain.request.sortType[categoryId] = select_obj.value;
				$thematicMapFrame06.getCategoryList.getMenuList(categoryId);
			}
			// mng_e 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
			
			
	};
	
			$thematicMapFrame06.request = {
				//카타고리 정보를 가져온다.
				getCategory : function () {
					$statsPotal.api.thematicMap.getCategory({
						method : 'POST',
						success : $thematicMapFrame06.response.successCateList
					});
				},
				
				getStatsThemeMapList : function (id) {
					var sopthemeMapParamListObj = new sop.portal.themeMapParamList.api();
					sopthemeMapParamListObj.addParam("hist_id", id);
					sopthemeMapParamListObj.request({
						method : "POST",
					    async : true,
					    url : contextPath+"/ServiceAPI/thematicMap/GetStatsThemeMapParamInfo.json",
					    options : {}
					});
				}
			};
		
			$thematicMapFrame06.response = {
				successCateList : function (stats, res) {
					
					//console.log("$thematicMapFrame06 start ");
					// 좌측 카탈로그 리스트 받아서 붙이기 
					if (res.errCd === 0) {
						categoryList = res.result.cateList;
						
						for ( var i = 0; i < categoryList.length; i++) {							
							//var html = "<li style='background:url("+categoryList[i].category_icon_url+");background-size:30px 30px;background-repeat:no-repeat;background-position:left'><a href='javascript:$thematicMapFrame06.getCategoryList.getMenuList(\""+categoryList[i].thema_map_category+"\");'>"+categoryList[i].category_nm+"</a></li>";
							//$('.qmIcon01').append(html);
							var html = '<li><a data-id="'+categoryList[i].thema_map_category+'"  href="javascript:$thematicMapFrame06.getCategoryList.getMenuList(\''+categoryList[i].thema_map_category+'\');">'+categoryList[i].category_nm+'</a></li>';
							$('.themul').append(html);
//							html = '<li><a data-id="'+categoryList[i].thema_map_category+'"  href="javascript:$thematicMapFrame06.getCategoryList.getMenuList(\''+categoryList[i].thema_map_category+'\');" title="'+categoryList[i].category_nm+'"><span>'+categoryList[i].category_nm+'</span></a></li>';
							$('.nav-list').append(html);
							
						}						
					}
				}				
			};
			
			$thematicMapFrame06.Popup = {
					show : function () {
						this.blockUI = document.createElement("DIV");
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
						this.popupUI.style.backgroundColor = "rgb(255, 255, 255)";
						this.popupUI.style.border = "3px solid rgb(0,0,0)";
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
						
						/*this.popupUI.style.position = "absolute";
		                this.popupUI.style.height = '10px';
		                this.popupUI.style.lineHeight = '50px';
		                this.popupUI.style.paddingBottom='40px';
		                this.popupUI.style.width ='400px';
		                this.popupUI.style.top ='50%';
		                this.popupUI.style.left = '50%';
		                this.popupUI.style.zIndex = "11000";*/
						
						var errorMsg = "<p>데이터 로딩중입니다. 잠시만 기다려주세요.</p>";
						//var errorMsg = "<img src='/img/common/loding_type01.gif'/>";
						this.popupUI.innerHTML = errorMsg;
						
						document.body.appendChild(this.popupUI);
					},
					close : function () {
						if (!sop.Util.isUndefined(this.blockUI)) {
							document.body.removeChild(this.blockUI);
							delete this.blockUI;
						}
						if (!sop.Util.isUndefined(this.popupUI)) {
							D.body.removeChild(this.popupUI);
							delete this.popupUI;
						}
					}
				
				};
			
			$thematicMapFrame06.getCategoryList = {
					getMenuList : function (thema_map_category){
						// mng_s 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
						var tempSortType = window.parent.$thematicMapMain.request.sortType[thema_map_category];
						// mng_e 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
						$.ajax({
							  type: "POST",
							  url: contextPath + "/ServiceAPI/thematicMap/GetMenuCategoryList.json",
							  async : false,
							  data : {
								  cate_id : thema_map_category
								  // mng_s 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
								  , sort_type : tempSortType
								  // mng_e 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
							  },
							  success: function(res) {
								  
								  $('.subj_list').empty();
								  $('.radioType').empty();
								  $('.subj_list').text(res.result.categoryList[0].category_nm+" 주제도 목록");
									
									// mng_s 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
									var selectId = thema_map_category + "_sort";
									var sortTooltipText = "";
									sortTooltipText += "정렬 방식 설명 </br>";
									sortTooltipText += "</br>";
									sortTooltipText += "추천순 정렬	:	실 생활에 유용한 추천 정보 순서 </br>";
									sortTooltipText += "인기순 정렬	:	최근 1달동안 조회수가 높은 순서 </br>";
									sortTooltipText += "가나다순 정렬	:	제목의 오름차순 순서 </br>";
									
									var html = "";
									html += '<select id=' + selectId + ' style="-webkit-appearance: menulist; margin-left: 15px; color:#4f87b6; font-size:13.5px; line-height: 1; padding: 5px; cursor: pointer;" ';
									html += 'onchange="javascript:$thematicMapFrame06.event.refreshThemaList(this)";>';
									html += '<option value="recommend">추천순 정렬</option> <option value="favorite">인기순 정렬</option> <option value="alphabet">가나다순 정렬</option> </select>';
//									html += '<a id="sort_tooltip" class="theme_sort_tooltip" title="' + sortTooltipText + '"><img src="/img/ico/ico_help05.png" width="20" height="20" alt="정렬방식 도움말 팝업"/></a>';
									$('.subj_list').append(html);
									
									$("#" + selectId).val(tempSortType);
									// mng_e 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
									
								  $thematicMapFrame06.setCategoryList.setCategoryListHtml(res);
								  $(".sideQuick.xw").css("left","370px");//박길섭추가
								  $(".sqListBox.sq03").css("left","360px");//박길섭추가
							  },								  
							  dataType: "json",
							  error:function(e){}  
						});
						var stat_thema_map_id = window.parent.$thematicMapMain.param.stat_thema_map_id;
						$(".radioType > li").each(function(index, elem){
							if($(elem).find("label").data("id") == stat_thema_map_id){
								$(elem).find("label").addClass("on");
							}
						});
					}
			};
				
			$thematicMapFrame06.setCategoryList = {
					setCategoryListHtml : function(res){
						
						var list = res.result.categoryList;
						var html = "";
						
						// mng_s 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
						var tempSortKeys = Object.keys(window.parent.$thematicMapMain.request.sortType);
						var tempSortStr = "&CTGRS=";
						for(var i = 0; i < tempSortKeys.length; i++) {
							tempSortStr += tempSortKeys[i];
							tempSortStr += ":";
							tempSortStr += window.parent.$thematicMapMain.request.sortType[tempSortKeys[i]];
							
							if(i != tempSortKeys.length - 1) {
								tempSortStr += ",";
							}
						}
						// mng_e 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
						var typeYN = '';
						if(document.location.href.indexOf("type=full") > 1){
							typeYN = "&type=full";
						}
						for(var i=0;i<list.length;i++){															
							if(list[i].thema_map_type=="02"){
								html += "<li><input type='radio' name='' id='' value='' />";
								html += '<label id="rd_juger'+i+'" data-id="'+list[i].stat_thema_map_id+'" data-theme="'+list[i].category+'" data-mapType="'+list[i].thema_map_type+'" onclick="javascript:parent.location.href=\'/view/thematicMap/thematicMapMainOld?stat_thema_map_id=' + list[i].stat_thema_map_id + '&theme=' + list[i].category + '&mapType=' + list[i].thema_map_type + typeYN + '\'" id="" for="">'+list[i].title+'</label></li>';
							}else{
								html += "<li><input type='radio' name='' id='' value='' />";
								
								// mng_s 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
								if(list[i].category=="CTGR_001"){
									html += '<label id="rd_juger'+i+'" data-id="'+list[i].stat_thema_map_id+'" data-theme="'+list[i].category+'" data-mapType="'+list[i].thema_map_type+'" onclick="parent.location.href=\'/view/thematicMap/thematicMapMain?stat_thema_map_id=' + list[i].stat_thema_map_id + '&theme=' + list[i].category + '&mapType=' + list[i].thema_map_type + tempSortStr + typeYN + '\'" id="" for="">'+list[i].title+'</label></li>';
								}else if(list[i].category=="CTGR_002"){
									html += '<label id="rd_juger'+i+'" data-id="'+list[i].stat_thema_map_id+'" data-theme="'+list[i].category+'" data-mapType="'+list[i].thema_map_type+'" onclick="parent.location.href=\'/view/thematicMap/thematicMapMain?stat_thema_map_id=' + list[i].stat_thema_map_id + '&theme=' + list[i].category + '&mapType=' + list[i].thema_map_type + tempSortStr + typeYN + '\'" id="" for="">'+list[i].title+'</label></li>';
								}else if(list[i].category=="CTGR_003"){
									html += '<label id="rd_juger'+i+'" data-id="'+list[i].stat_thema_map_id+'" data-theme="'+list[i].category+'" data-mapType="'+list[i].thema_map_type+'" onclick="parent.location.href=\'/view/thematicMap/thematicMapMain?stat_thema_map_id=' + list[i].stat_thema_map_id + '&theme=' + list[i].category + '&mapType=' + list[i].thema_map_type + tempSortStr + typeYN + '\'" id="" for="">'+list[i].title+'</label></li>';
								}else if(list[i].category=="CTGR_004"){
									html += '<label id="rd_juger'+i+'" data-id="'+list[i].stat_thema_map_id+'" data-theme="'+list[i].category+'" data-mapType="'+list[i].thema_map_type+'" onclick="parent.location.href=\'/view/thematicMap/thematicMapMain?stat_thema_map_id=' + list[i].stat_thema_map_id + '&theme=' + list[i].category + '&mapType=' + list[i].thema_map_type + tempSortStr + typeYN + '\'" id="" for="">'+list[i].title+'</label></li>';
								}else if(list[i].category=="CTGR_005"){
									html += '<label id="rd_juger'+i+'" data-id="'+list[i].stat_thema_map_id+'" data-theme="'+list[i].category+'" data-mapType="'+list[i].thema_map_type+'" onclick="parent.location.href=\'/view/thematicMap/thematicMapMain?stat_thema_map_id=' + list[i].stat_thema_map_id + '&theme=' + list[i].category + '&mapType=' + list[i].thema_map_type + tempSortStr + typeYN + '\'" id="" for="">'+list[i].title+'</label>';
									// mng_s 20201102 김건민
									if( list[i].stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw" ){
										html += '<img src="/img/common/ico_new.png" style="margin-left:5px;height:15px;margin-top:3px;">';
									}else if (list[i].stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE" ){
										html += '<img src="/img/common/ico_new.png" style="margin-left:5px;height:15px;margin-top:3px;">';
									}else if (list[i].stat_thema_map_id == "wPsSdFX8Wt20210520161423833UZjHClj5U3" ){
										html += '<img src="/img/common/ico_new.png" style="margin-left:5px;height:15px;margin-top:3px;">';
									}
									html += '</li>';
									// mng_e 20201102 김건민
								//mng_s 20211214 주용민
								}else if(list[i].category=="CTGR_006"){
									html += '<label id="rd_juger'+i+'" data-id="'+list[i].stat_thema_map_id+'" data-theme="'+list[i].category+'" data-mapType="'+list[i].thema_map_type+'" onclick="parent.location.href=\'/view/thematicMap/thematicMapMain?stat_thema_map_id=' + list[i].stat_thema_map_id + '&theme=' + list[i].category + '&mapType=' + list[i].thema_map_type + tempSortStr +  typeYN + '\'" id="" for="">'+list[i].title+'</label></li>';
								}
								//mng_e 20211214 주용민
								
//								if(list[i].category=="CTGR_001"){
//									html += '<label id="rd_juger'+i+'" data-id="'+list[i].stat_thema_map_id+'" data-theme="'+list[i].category+'" data-mapType="'+list[i].thema_map_type+'" onclick="parent.location.href=\'/view/thematicMap/thematicMapMain?stat_thema_map_id=' + list[i].stat_thema_map_id + '&theme=' + list[i].category + '&mapType=' + list[i].thema_map_type + '\'" id="" for="">'+list[i].title+'</label></li>';
//								}else if(list[i].category=="CTGR_002"){
//									html += '<label id="rd_juger'+i+'" data-id="'+list[i].stat_thema_map_id+'" data-theme="'+list[i].category+'" data-mapType="'+list[i].thema_map_type+'" onclick="parent.location.href=\'/view/thematicMap/thematicMapMain?stat_thema_map_id=' + list[i].stat_thema_map_id + '&theme=' + list[i].category + '&mapType=' + list[i].thema_map_type + '\'" id="" for="">'+list[i].title+'</label></li>';
//								}else if(list[i].category=="CTGR_003"){
//									html += '<label id="rd_juger'+i+'" data-id="'+list[i].stat_thema_map_id+'" data-theme="'+list[i].category+'" data-mapType="'+list[i].thema_map_type+'" onclick="parent.location.href=\'/view/thematicMap/thematicMapMain?stat_thema_map_id=' + list[i].stat_thema_map_id + '&theme=' + list[i].category + '&mapType=' + list[i].thema_map_type + '\'" id="" for="">'+list[i].title+'</label></li>';
//								}else if(list[i].category=="CTGR_004"){
//									html += '<label id="rd_juger'+i+'" data-id="'+list[i].stat_thema_map_id+'" data-theme="'+list[i].category+'" data-mapType="'+list[i].thema_map_type+'" onclick="parent.location.href=\'/view/thematicMap/thematicMapMain?stat_thema_map_id=' + list[i].stat_thema_map_id + '&theme=' + list[i].category + '&mapType=' + list[i].thema_map_type + '\'" id="" for="">'+list[i].title+'</label></li>';
//								}else if(list[i].category=="CTGR_005"){
//									html += '<label id="rd_juger'+i+'" data-id="'+list[i].stat_thema_map_id+'" data-theme="'+list[i].category+'" data-mapType="'+list[i].thema_map_type+'" onclick="parent.location.href=\'/view/thematicMap/thematicMapMain?stat_thema_map_id=' + list[i].stat_thema_map_id + '&theme=' + list[i].category + '&mapType=' + list[i].thema_map_type + '\'" id="" for="">'+list[i].title+'</label></li>';
//								}
								// mng_e 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
							}
						}
						//console.log(html);
						$('.radioType').append(html);
						
						for(var i=0;i<list.length;i++){	
							var dataType = "";
							// 시도,시군구,읍면동,집계구 설정(공통)
							if(list[i].max_expnsn_level == '01') {
								dataType += '<span class="sp01">시도</span>';
							} else if(list[i].max_expnsn_level == '02') {
								// 2016. 03. 28 j.h.Seok
								dataType += '<span class="sp01">시군구</span>';
							} else if(list[i].max_expnsn_level == '03') {
								dataType += '<span class="sp01">읍면동</span>';
							} else if(list[i].max_expnsn_level == '04'){
								dataType += '<span class="sp01">집계구</span>';
							}
							
							// 주제도 유형 정보
							if(list[i].thema_map_type=='02'){
								// 예전 데이터의 경우 disp_mthd 와 max_expnsn으로 박스표시
								dataType += '<span class="sp02">'+list[i].disp_method+'</span>';	
							}else{
								// theme_map_type이 다른경우 max_expnsn
								
								// mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
//								if(list[i].thema_map_type == '03'){
								if(list[i].thema_map_type == '03' || list[i].thema_map_type == '13'){
								// mng_e 2020. 12. 01 j.h.Seok 통계주제도 통합
									
									dataType += '<span class="sp02">색상</span>'
								}else if(list[i].thema_map_type == '04'){
									dataType += '<span class="sp02">증감</span>';
								}
								
								// mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
//								else if(list[i].thema_map_type == '05'){
								else if(list[i].thema_map_type == '05' || list[i].thema_map_type == '15'){
								// mng_e 2020. 12. 01 j.h.Seok 통계주제도 통합
									
									dataType += '<span class="sp02">시계열</span>';
								}else if(list[i].thema_map_type == '06'){
									dataType += '<span class="sp02">분할뷰</span>';
								}else if(list[i].thema_map_type == '07'){
									dataType += '<span class="sp02">POI</span>';
								}
							}
							
							//데이터 년도
							dataType += '<span class="sp03">'+list[i].year_info+'</span>';
							$('#rd_juger'+i).attr('title',dataType);
						}
						linkTooltip();
					}
			};
			
			(function() {
				$class("sop.portal.themeMapParamList.api").extend(sop.portal.absAPI).define(
						{
							onSuccess : function(status, res, options) {
								//console.log(res);
								var result = res.result.themeParamInfoList[0];
								if (result.param_info) {
									$thematicMapFrame06.ui.paramInfo = JSON.parse(res.result.themeParamInfoList[0].param_info);
									$thematicMapFrame06.ui.paramInfo.paramInfo["type"] = "bookmark"
									$thematicMapFrame06.ui.doAnalysisShareInfo($thematicMapFrame06.ui.paramInfo.paramInfo);
								}
							},
							onFail : function(status, options) {
							}
						});
			}());
		
	
}(window, document));