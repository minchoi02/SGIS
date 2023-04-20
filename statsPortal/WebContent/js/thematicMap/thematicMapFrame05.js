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
	W.$thematicMapFrame05 = W.$thematicMapFrame05 || {};

	$(document).ready(
		function() {	
			
			//mng_s 화면 크기 조정 - full 20210421 djlee
			if(document.location.href.indexOf("type=full") > 1 ){
				$thematicMapFrame05.ui.doMaxSize(1);
			}
			//mng_e
			
			$thematicMapFrame05.params = getAllParameter();
			$thematicMapFrame05.ui.createMap("mapRgn_1", 0);
			$thematicMapFrame05.event.setUIEvent();
			var mapNavi1 = new mapNavigation.UI();
			mapNavi1.create("mapNavi_1", 1, $thematicMapFrame05.ui);	
			//메뉴에서 카타고리 정보 가져온다.
			$thematicMapFrame05.request.getCategory();	
			
			//leftBox 사이즈 height 줄인다.
			
			// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
//			$('.sqListBox.sq03 .sqList').css("height","230px");		
			// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
			$(".lgListBox li:eq(0)").hide();
			$(".sideQuick.sq03").click();
			
			//시작시 데이터보드를 오픈한다.
			$(".interactiveDataBoard").click();			
			
			//mng_s 20200730
			if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw"){
				if( getCookie("coronaPop") == "N" ){ // 첫화면 접속시, '하루안보기' popup 여부
					$("#coronaPop").hide();	
				} else {
					$("#coronaPop").show();	
				}
			}
			
			if(window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE"){
				if( getCookie("coronaVaccPop") == "N" ){ // 첫화면 접속시, '하루안보기' popup 여부
					$("#coronaVaccPop").hide();	
				} else {
					$("#coronaVaccPop").show();	
				}
			}
	});
	
	$thematicMapFrame05.ui = {
			mapList : [],
			curMapId : 0,
			dataGeoJson : [],
			namespace: "thematicMap",
			reportPopup : null,
			poiInfoArray : [],		// poi 정보 저장 배열
			paramInfo : null,
			//코로나추가 20200722 주용민			
			addCovidMarker : function(result){
				var map = this.mapList[this.curMapId];
				this.markers = sop.markerClusterGroup({
					animateAddingMarkers: true
				});
				$.each(result,function(cnt,node){
				    var marker = sop.marker([node.x_coor,node.y_coor],{
				    	icon : sop.icon({
							iconUrl: contextPath+"/img/marker/marker/hospital_ico.png",
							iconSize: [25, 40]
						})
				    });
					marker.addTo($thematicMapFrame05.ui.markers);
					var html = "";
					html += "<h1 style='font-size: 15px;font-weight: bold;'>"+node.clnc_div_nm+"<br></h1><br>";
					html += "<h4>기  관  명 : "+node.clnc_inst_nm+"</h4>";
					html += "<h4>주       소 : "+node.clnc_inst_addr+"</h4>";
					if(node.clnc_div_nm == "국민안심병원"){
						html += "<h4>진료 유형 : "+node.clnc_clnic_type_nm+"</h4>";
					}
					html += "<h4>전화 번호 : "+node.clnc_tel_no+"</h4>";
					marker.bindInfoWindow(html,{
						minWidth:270,
						maxWidth:540,
						minHeight:250,
						maxHeight:500
					});
				});
				map.gMap.addLayer(this.markers);
			},
			
			removeCovidMarker : function(){
				var map = this.mapList[this.curMapId];
				if($thematicMapFrame05.ui.markers !=null){
					$thematicMapFrame05.ui.markers.removeFrom(map.gMap);
				}
				this.markers = null;
			},
			//코로나추가 20200722 주용민
			
			//보행자 차량사고
			addCarAccMarker : function(result){
				var map = this.mapList[this.curMapId];
				this.markers = sop.markerClusterGroup({
					animateAddingMarkers: true
				});
				$.each(result,function(cnt,node){
					var marker = sop.marker([node.x_coord,node.y_coord],{
						icon : sop.icon({
							iconUrl: contextPath+"/img/marker/marker/pedestrian_ico.png",
							iconSize: [25, 40]
						})
					});
					marker.addTo($thematicMapFrame05.ui.markers);
					marker.on({
						click : function(e){
							$.ajax({
								type: "GET",
								url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapData.json",
								data : {
									thema_map_data_id : 'car_accident_data',
									area_type : 'auto',
									adm_cd : '00',
									base_year : $("#select_base_year option:checked").val(),
									stat_data_base_year : $("#select_base_year option:checked").val(), //mng_s 20210729 이진호, 추가
									caracc_type_cd : $("#caracc_type a.on").attr("id").substr(-1,1),
									gubun : 'tooltip2',
									acdnt_no : node.acdnt_no
								},
								success: function(res) {
									if (res.errCd == "0") {
										var result = res.result.detailInfo[0];
										var html = "";
										html += "<table class='carAccTb' style='border:1px solid black;'><tbody>";
										html += "<tr>";
										html += "<td class='td-h'>사건번호</td>";
										html += "<td class='td1'>"+result.acdnt_no+"</td>";
										html += "<td class='td-h'>법규위반</td>";
										html += "<td class='td1'>"+result.wrngdor_violt_nm+"</td>";
										html += "</tr>";
										html += "<tr>";
										html += "<td class='td-h'>사고일시</td>";
										html += "<td class='td1'>"+result.acdnt_dt.substr(0,4)+"년 "+result.acdnt_dt.substr(4,2)+"월 "+result.acdnt_dt.substr(6,2)+"일 "+result.acdnt_dt.substr(8,2)+"시</td>";
										html += "<td class='td-h'>가해운전자 차종</td>";
										html += "<td class='td1'>"+result.wrngdor_vhcty_nm+"</td>";
										html += "</tr>";
										html += "<tr>";
										html += "<td class='td-h'>요일</td>";
										html += "<td class='td1'>"+result.acdnt_dayofweek+"요일</td>";
										html += "<td class='td-h'>가해운전자 성별</td>";
										html += "<td class='td1'>"+result.wrngdor_gender_nm+"</td>";
										html += "</tr>";
										html += "<tr>";
										html += "<td class='td-h'>시군구</td>";
										html += "<td class='td1'>"+result.sido_nm+" "+result.sgg_nm+" "+result.emdong_nm+"</td>";
										html += "<td class='td-h'>가해운전자 연령</td>";
										html += "<td class='td1'>"+result.wrngdor_age_nm+"</td>";
										html += "</tr>";
										html += "<tr>";
										html += "<td class='td-h'>사고유형</td>";
										html += "<td class='td1'>"+result.acdnt_type_nm+"</td>";
										html += "<td class='td-h'>가해운전자 상해정도</td>";
										html += "<td class='td1'>"+result.wrngdor_inj_nm+"</td>";
										html += "</tr>";
										html += "<tr>";
										html += "<td class='td-h'>사망자수</td>";
										html += "<td class='td1'>"+result.dprs_cnt+"</td>";
										html += "<td class='td-h'>피해운전자 차종</td>";
										html += "<td class='td1'>"+result.sufrer_vhcty_nm+"</td>";
										html += "</tr>";
										html += "<tr>";
										html += "<td class='td-h'>중상자수</td>";
										html += "<td class='td1'>"+result.swpsn_cnt+"</td>";
										html += "<td class='td-h'>피해운전자 성별</td>";
										html += "<td class='td1'>"+result.sufrer_gender_nm+"</td>";
										html += "</tr>";
										html += "<tr>";
										html += "<td class='td-h'>경상자수</td>";
										html += "<td class='td1'>"+result.sinjpsn_cnt+"</td>";
										html += "<td class='td-h'>피해운전자 연령</td>";
										html += "<td class='td1'>"+result.sufrer_age_nm+"</td>";
										html += "</tr>";
										html += "<tr>";
										html += "<td class='td-h'>부상신고자수</td>";
										html += "<td class='td1'>"+result.inj_aplcnt_cnt+"</td>";
										html += "<td class='td-h'>피해운전자 상해정도</td>";
										html += "<td class='td1'>"+result.sufrer_inj_nm+"</td>";
										html += "</tr>";
										html += "<tr>";
										html += "<td class='td-h'>노면상태</td>";
										html += "<td class='td1'>"+result.rdsrfc_sttus_nm+"</td>";
										html += "<td class='td-h'>기상상태</td>";
										html += "<td class='td1'>"+result.wether_sttus_nm+"</td>";
										html += "</tr>";
										html += "<tr>";
										html += "<td class='td-h'>도로형태</td>";
										html += "<td class='td1' style='border-right:none;'>"+result.road_sttus_nm+"</td>";
										html += "<td colspan='2' style='border:1px solid #e0e0e0;border-left:none;'></td>";
										html += "</tr>";
										html += "</tbody></table>";
										marker.bindInfoWindow(html,{
											minWidth:550,
											maxWidth:560,
											minHeight:250,
											maxHeight:500
										}).openInfoWindow();
									}
								} ,
								dataType: "json",
								error:function(e){}  
							});	
						}
					});
				});
				map.gMap.addLayer(this.markers);
				$thematicMapFrame05.Popup.close();
			},
			
			removeCarAccMarker : function(){
				var map = this.mapList[this.curMapId];
				if($thematicMapFrame05.ui.markers !=null){
					$(".sop-infowindow").hide();
					$thematicMapFrame05.ui.markers.removeFrom(map.gMap);
				}
				this.markers = null;
			},
			//보행자 차량사고
			
			//코로나 예방접종현황
			addCovidVaccMarker : function(result){
				var map = this.mapList[this.curMapId];
				this.markers = sop.markerClusterGroup({
					animateAddingMarkers: true
				});
				$.each(result,function(cnt,node){
					var marker = sop.marker([node.x_coor,node.y_coor],{
						icon : sop.icon({
							iconUrl: contextPath+"/img/marker/marker/hospital_ico.png",
							iconSize: [25, 40]
						})
					});
					marker.addTo($thematicMapFrame05.ui.markers);
					var html = "";
					if($("#vacc_hospital").hasClass("on")){
						html += "<h1 style='font-size: 15px;font-weight: bold;'>"+node.cnter_nm+"<br></h1><br>";
						html += "<h4>시  설	명 : "+node.fac_nm+"</h4>";
						html += "<h4>주       소 : "+node.addr+"</h4>";
						if(node.tel_no != null){
							html += "<h4>전화번호 : "+node.tel_no+"</h4>";
						}
						html += "<h4>센터유형 : "+node.cnter_type_nm+"</h4>";
						marker.bindInfoWindow(html,{
							minWidth:270,
							maxWidth:540,
							minHeight:250,
							maxHeight:500
						});
					}else if($("#vacc_consign").hasClass("on")){
						marker.on({
							click : function(e){
								$.ajax({
									type: "GET",
									url: contextPath + "/ServiceAPI/thematicMap/GetThemaMapData.json",
									data : {
										thema_map_data_id : 'covid19_vacc_data',
										area_type : 'auto',
										adm_cd : '00',
										gubun : 'tooltip3',
										inst_cd : node.inst_cd
									},
									success: function(res) {
										if (res.errCd == "0") {
											var result = res.result.detailInfo[0];
											var html = "";
											html += "<h1 style='font-size: 15px;font-weight: bold;'>"+result.inst_nm+"<br></h1><br>";
											html += "<h4>주     소 : "+result.addr+"</h4>";
											html += "<h4>전화번호 : "+result.tel_no+"</h4>";
											if(result.lunch_start_time != null){
												html += "<h4>점심시작시간 : "+result.lunch_start_time.substr(0,2)+"시 "+result.lunch_start_time.substr(2,2)+"분</h4>";
											}
											if(result.lunch_end_time != null){
												html += "<h4>점심종료시간 : "+result.lunch_end_time.substr(0,2)+"시 "+result.lunch_end_time.substr(2,2)+"분</h4>";
											}
											if(result.clnic_start_time != null){
												html += "<h4>진료시작시간 : "+result.clnic_start_time.substr(0,2)+"시 "+result.clnic_start_time.substr(2,2)+"분</h4>";
											}
											if(result.clnic_end_time != null){
												html += "<h4>진료종료시간 : "+result.clnic_end_time.substr(0,2)+"시 "+result.clnic_end_time.substr(2,2)+"분</h4>";
											}
											marker.bindInfoWindow(html,{
												minWidth:270,
												maxWidth:540,
												minHeight:250,
												maxHeight:500
											}).openInfoWindow();
										}
									}
								});
							}
						});
					}
				});
				map.gMap.addLayer(this.markers);
				$thematicMapFrame05.Popup.close();
			},
			
			removeCovidVaccMarker : function(){
				var map = this.mapList[this.curMapId];
				if($thematicMapFrame05.ui.markers !=null){
					$(".sop-infowindow").hide();
					$thematicMapFrame05.ui.markers.removeFrom(map.gMap);
				}
				this.markers = null;
			},
			//코로나 예방접종현황
			
			//mng_s 20200730 kimjoonha
			//하루동안 안 보기  
			closeWin : function (cookieName, value, expiredays) {
				if($("#coronaPop,#coronaVaccPop").find("input[name='corona_close']").is(":checked")) {
					$thematicMapFrame05.ui.setCookie(cookieName, value, expiredays);
				}
				
				$("#coronaPop,#coronaVaccPop").hide();			
				
			}, 		
			setCookie : function(cookieName, value, expiredays) {		
			    var expireDt = new Date();   
			    expireDt.setDate(expireDt.getDate() + expiredays);   
			    document.cookie = cookieName + "=" + value + "; path=/; expires=" + expireDt.toString() + ";" ;		
			}, 		
			getCookie : function (cookieName) {		 
				var cName, cValue="", val;
				if(document.cookie != null){
					val = document.cookie.split(';');
					for(var i = 0; i < val.length; i++){
						cName = val[i].substr(0,val[i].indexOf("="));
						cValue = val[i].substr(val[i].indexOf("=") + 1);
						if(cookieName == cName) break;						
					}
				}
				return cValue;
			 }, 
			 delCookie : function (cookieName) {
				var expireDt = new Date();   
			    expireDt.setDate(expireDt.getDate() - 1);   
			    document.cookie = cookieName + "=" + escape("Y") + "; path=/; expires=" + expireDt.toString() + ";" ;
			 },
			
			
			
			
			
			doAnalysisShareInfo : function(data) {
				if (data.type == "bookmark") {
					var map = this.mapList[0];
					map.openInitStatData($thematicMapFrame05.params, function() {
						
						//조회년도
						$("#select_base_year").val(data.select_base_year);
						
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
							
						//통계선택
						$("#selectValue").val(data.stat_sel);
						$("#stat_sel > a").each(function() {
							if ($(this).hasClass("on")) {
								$(this).removeClass("on");
							}
						});
						$("#"+data.stat_sel).addClass("on");
						
						if (data.stat_sel != "etcValue") {
							$("#base_year").show();
						}else {
							$("#base_year").hide();
						}
						$thematicMapFrame05.Popup.show();
						map.changeRegionBound();
	
						
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
						$thematicMapFrame05.ui.changeDataMode();
						
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
						$thematicMapFrame05.ui.changeDataMode2();
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
				var map = new sMap.map();
				
				map.createMap($thematicMapFrame05, id, {
					center : [ 989674, 1818313 ],
					zoom : 1, 
					measureControl : false,
					statisticTileLayer: true
				});
				
				map.id = seq;
				map.addControlEvent("movestart");
				map.addControlEvent("moveend");
				map.addControlEvent("zoomend");	
				
				//범례 호출 함수 
				var legend = new sLegendInfo.legendInfo(map);			
				legend.initialize($thematicMapFrame05.ui);
				map.legend = legend;
				legend.createLegend();
				//작업부분 끝
				
				//코로나 추가 20200729 jrj
				if( $thematicMapFrame05.params.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw" ){
					$("#data_type > a").eq(1).removeClass("on");
					$("#data_type > a").eq(0).addClass("on");
					
					legend.numberData = true;
					$('#dataMode2').val("dataOn"); 
				}
				
				var btnInfo = new interactiveMapBtnInfo.btnInfo(map);	
				map.mapBtnInfo = btnInfo;

				btnInfo.createUI({
					intrPoiControl : false,
					intrSettingControl : false,
					mapTypeControl : true,
					bizZoomControl : true
				});	
				
				//공유
				var shareInfo = new share.shareInfo(map, $thematicMapFrame05.ui);
				map.shareInfo = shareInfo;
				$thematicMapFrame05.params["url"] = "/view/thematicMap/thematicMapMain";
				map.shareInfo.setThematicMapShareInfo($thematicMapFrame05.params, "05");
				
				
				//사용자지정컨트롤설정
				this.mapList[seq] = map;
				
				//갤러리 등록
				$galleryAdd.delegate = this;
							
				map.gMap.whenReady(function() {
					map.createHeatMap();	
				});
				
				if (window.parent.$thematicMapMain) {
					$thematicMapFrame05.ui.doAnalysisShareInfo(window.parent.$thematicMapMain.param);
				}else {
					$thematicMapFrame05.request.getStatsThemeMapList($thematicMapFrame05.params.id);
				}
				
				//북마크
				setTimeout(function() {
					map.openApiReverseGeoCode(map.center);
				}, 300);
			},
			/**
			 * @name         : reportLoad
			 * @description  : 보고서의 데이터를 설정한다.
			 * @date         : 2015. 11. 10. 
			 * @author	     : 권차욱
			 */
			reportLoad : function() {
				var map = this.mapList[this.curMapId];
				var mapType = "thematicMap";
				var divId = "#mapRgn_" + (map.id + 1);
				
				var title, adm_nm, origin, companyObj, subTitle;
				var chart = null;
				var legend = null;
				var param = {};
				var selectOption = $("#selectValue").val(); // 통계 선택 (수/율)
				var base_year = $("#select_base_year").val(); // 데이터 년도
				var menuType = {
						"publicData" : 0,	//공공데이터
						"kosis"      : 1,	//kosis
				};
				
//				//databoard
//				var idx = $publicDataBoard.ui.mapData[map.id].options.viewIndex;
//				adm_nm = $publicDataBoard.ui.mapData[map.id].options.result.target.info.resultList[0].adm_m;
//				companyObj = $publicDataBoard.ui.mapData[map.id].options.result.target.info.resultList[idx];

				$(".sop-control-scale").attr("data-html2canvas-ignore", true);
				
				var dataList = {
					id : map.id, 
					divId : divId,
					geojson : map.dataGeojsonLayer, 
					data : map.dataForCombine,
					legend : {
						valPerSlice : map.legend.valPerSlice,
						legendColor : map.legend.legendColor,
						legendId: "#legend_"+map.legend.id,
						legendType : map.legend.legendType
					},
					scale : $(".sop-control-scale").html(),
//					param : this.dropBtnInfo[map.id], // dropBtnInfo가 null임
					param : map.initData, // 초기데이터
					zoom : map.zoom,
					center : map.center,
					isCaption : map.legend.numberData,
					dataType : map.legend.selectType,
					origin : $("#thematicMapOrigin").html(),
					selectOption : selectOption,
					base_year : base_year

				};
				
				//2017.03.09 보고서 수정
				//==================================================================================================================================//
//				setTimeout(function() {
//					html2canvas($(divId), {
//						logging: true,
//	                    useCORS: false,
//	                    proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
//		 				onrendered: function(canvas) {
		 					//익스플로러 예외처리
		 					//2017.03.14 svg처리
		 					/*var agent = navigator.userAgent.toLowerCase();
	                     	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
	                     		var doc = document.querySelector(divId); 
	                     		var mapContainer = null;
	                     		for (var i=0; i<doc.childNodes.length; i++) {
	                     			var tmpClassName = doc.childNodes[i].className;
	                     			if (tmpClassName.indexOf("sop-map-pane") != -1) {
	                     				mapContainer = doc.childNodes[i];
	                     				break;
	                     			}
	                     		}
	                     		if (mapContainer != null) {
	                     			var svgList = mapContainer.querySelectorAll("svg");
		                     		for (var i=0; i<svgList.length; i++) {
		                     			var svg = svgList[i];
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
			setTimeout(function() {
				var agent = navigator.userAgent.toLowerCase();
				if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
					html2canvas($(divId), {
						logging: true,
	                    useCORS: false,
	                    proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
		 				onrendered: function(canvas) {
	                    	var data = canvas.toDataURL();
	                    	var options = {
    	 							mapType : mapType,
    	 							mapClone : $(divId).clone(),
    	 							mapWidth : $(divId).width(),
    	 							mapHeight : $(divId).height(),
    	 							chart : chart,
    	 							legend :legend,
    	 							mapData : data
    	 					};
	                    	var popup = $thematicMapFrame05.ui.reportPopup.$reportForm.ui;
	        				if($thematicMapFrame05.ui.poiInfoArray.length < 1) {
	        					popup.setData(deepCopy(dataList), options, $thematicMapFrame05.ui.dataGeoJson);
	        				} else {
	        					// mng_s 20200529 김건민 (다문화가구원 현황)
	        					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "5FLM8BXNH320200521093949554ioKEsoOUGI"){
	        						popup.setData(deepCopy(dataList), options, $thematicMapFrame05.ui.dataGeoJson, null);
	        					}else{
	        						popup.setData(deepCopy(dataList), options, $thematicMapFrame05.ui.dataGeoJson, $thematicMapFrame05.ui.poiInfoArray);
	        					}
	        					// mng_e 20200529 김건민
	        				}

		 				}
		 			});
				}else{
					html2canvas($(divId)[0], {
						logging: true,
	                    useCORS: false,
	                    proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp"
					}).then(function(canvas) {
                    	var data = canvas.toDataURL();
                    	var options = {
	 							mapType : mapType,
	 							mapClone : $(divId).clone(),
	 							mapWidth : $(divId).width(),
	 							mapHeight : $(divId).height(),
	 							chart : chart,
	 							legend :legend,
	 							mapData : data
	 					};
                    	var popup = $thematicMapFrame05.ui.reportPopup.$reportForm.ui;
        				if($thematicMapFrame05.ui.poiInfoArray.length < 1) {
        					popup.setData(deepCopy(dataList), options, $thematicMapFrame05.ui.dataGeoJson);
        				} else {
        					// mng_s 20200529 김건민 (다문화가구원 현황)
        					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "5FLM8BXNH320200521093949554ioKEsoOUGI"){
        						popup.setData(deepCopy(dataList), options, $thematicMapFrame05.ui.dataGeoJson, null);
        					}else{
        						popup.setData(deepCopy(dataList), options, $thematicMapFrame05.ui.dataGeoJson, $thematicMapFrame05.ui.poiInfoArray);
        					}
        					// mng_e 20200529 김건민
           				}
		 			});
				}
			},300);
				//==================================================================================================================================//

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
				this.curMapId = parseInt(type)-1;
				var map = this.mapList[this.curMapId];
				if (map.dataGeojson == null && 
					map.multiLayerControl.dataGeojson == null 
//					&& $publicDataBoard.ui.chartDataList[map.id] == null
					) {
					messageAlert.open("알림", "출력할 결과가 없습니다.");
	 				return;
				}
				$thematicMapFrame05.ui.reportPopup = 
					window.open("/js/thematicMap/report/05/reportForm.html", "reportPrint","width=850, height=700, scrollbars=yes");
			},
			
			
			/**
			 * 
			 * @name         : changeLeftRightValue
			 * @description  : 주제도 통계 선택을 변경한다. 
			 * @date         : 2015. 11. 13. 
			 * @author	     : 
			 * @history 	 :
			 */
			changeLeftRightValue : function(type) {
				var map1 = $thematicMapFrame05.ui.mapList[0];
				
				if($("#stat_sel > a").length > 1){
					switch(type) {
					case 1:
						if(window.parent.$thematicMapMain.param.stat_thema_map_id == "8mjCr1kWql20201123140825772vKMjQsNcRw"){
							setTimeout(function(){
								$("#select_base_year").prepend("<option>2016</option>");
							},1000);
						}
					case 2:
						$("#base_year").show();
						//코로나추가 20200730 jrj
						if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw"){
							if(map1.tmpAdmCd == "00"){
								$(".thematicCharts").css("margin-top","70px");
								$(".dataSideBox").css("height","550px");
							} else {
								$(".thematicCharts").css("margin-top","10px");
								$(".dataSideBox").css("height","500px");
							}
						}
						if(window.parent.$thematicMapMain.param.stat_thema_map_id == "RZ3pr7Maou20201106160851389D0RGtYCGpW"){
							if($("#leftValue").hasClass("on")){
								$("#weather_type2").hide();
								$("#weather_type1").show();
								$("#weather_type2 a").removeClass("on");
								$("#weather1").addClass("on");
							}else{
								$("#weather_type1").hide();
								$("#weather_type2").show();			
								$("#weather_type1 a").removeClass("on");
								$("#weather4").addClass("on");
							}
						}
						if(window.parent.$thematicMapMain.param.stat_thema_map_id == "8mjCr1kWql20201123140825772vKMjQsNcRw"){
							if($("#select_base_year option:eq(0)").val() == "2016"){
								$("#select_base_year option:eq(0)").remove();
							}
						}
//						if(window.parent.$thematicMapMain.param.stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE"){
//							if($("#leftValue").hasClass("on")){
//								$("#vacc_type2").hide();
//								$("#vacc_type").show();
//								if($("#vacc3").hasClass("on")){
//									$("#vacc1").addClass("on");
//								}else if($("#vacc4").hasClass("on")){
//									$("#vacc2").addClass("on");
//								}
//								$("#vacc_type2 a").removeClass("on");
//								$(".covidDbTabs").css("display","table");
//							}else{
//								$("#vacc_type").hide();
//								$("#vacc_type2").show();			
//								if($("#vacc1").hasClass("on")){
//									$("#vacc3").addClass("on");
//								}else if($("#vacc2").hasClass("on")){
//									$("#vacc4").addClass("on");
//								}
//								$("#vacc_type a").removeClass("on");
//								$(".covidDbTabs").css("display","table");
//							}
//						}
						break;
					case 3:
						$("#base_year").hide();
						break;
					}
					map1.selectStatsOption = true;
					map1.changeRegionBound(type);						
					map1.selectStatsOption = false;					
				} else {
					// 통계선택이 하나일 경우 갱신 안하도록
					$thematicMapFrame05.Popup.close();
				}
				
				map1.isFirstDraw = true;
				map1.getThemaMapDataboardData( map1.tmpAdmCd );
				
				//mng_s 20210531 이진호
				//시계열 타입 주제도에서 지역을 클릭 후 통계선택을 변경하면 데이터보드가 변경될 때 불필요한 데이터보드가 출력되는 현상 수정
				//아래 thematicCharts( map1.tmpAdmCd ); 주석처리만 하였음, 추후 아래 주석 코드 때문에 문제 발생 시 주석 해제
				//thematicCharts( map1.tmpAdmCd );
				//mng_e 20210531 이진호
				
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
				var map1 = $thematicMapFrame05.ui.mapList[0];	
				var tempData1 = this.dataGeoJson;
				
				if(tempData1 != undefined && tempData1.length && tempData1 != null > 0) {
					map1.multiLayerControl.dataGeojson = tempData1;
				}
				
				if (map1.isTimeSeries) {
					map1.multiLayerControl.dataGeojson = null;
				}
				
				if(window.parent.$thematicMapMain.param.stat_thema_map_id == "QNj43PFUT220190612100733746ocaFOXLaj3" || window.parent.$thematicMapMain.param.stat_thema_map_id == "MmLSKu8PgQ20201022173339083sOVy6YCGQj"){
					if($("#pieChartFlag").val() == "on" && ( $("#dataMode").val() == "bubble" || $("#dataMode").val() == "color" ) ){
						map1.mapClear();
						$("#pieChartFlag").val("off");
					}
					
					if( $("#dataMode").val() == "bubble" || $("#dataMode").val() == "color" ){
//						$("#autoRegion").removeClass('last');
//						$("#sido").show();
//						$("#sido").attr('class', 'last');
						map1.setZoom();
					}
				}
				
				if($('#dataMode').val()=='bubble'){			
//					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "MmLSKu8PgQ20201022173339083sOVy6YCGQj"){
//						$(".thematicCharts").text("").css("margin-top","");
//						$(".thematicTopText,.thematicBotText").show();
//					}
					if(map1.geojson)
						map1.geojson.remove();
					$('#lgTypeList_'+map1.legend.id+' a:eq(2)').trigger("click");
					$("#legendBox_"+ map1.legend.id).show();
					//코로나추가 20200722 주용민	
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw"){
						$(".thematicTopText").show();
					}else{
						$("#dataBoard").hide();	
						
						//mng_s 20200727 이진호, 시계열 중 코로나 제외한 나머지 sop-right 위치 변경
						$(".sop-right").css("right", "0px");
						//mng_e 20200727 이진호
						
					}
					//코로나추가 20200722 주용민						
				}else if($('#dataMode').val()=='color'){
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "MmLSKu8PgQ20201022173339083sOVy6YCGQj"){
						$(".thematicCharts").css({"margin-top":"","height":"360px"});
						$(".thematicTopText,.thematicBotText").show();
					}
					$('#lgTypeList_'+map1.legend.id+' a:eq(1)').trigger("click");
					$("#legendBox_"+ map1.legend.id).show();
					$("#dataBoard").show();
					$("#interactiveDataboard").click();
					
					//mng_s 20200727 이진호
					//지도유형이 color 일 경우 sop-right 버튼 위치 수정 / 코로나 제외 처리
					if(window.parent.$thematicMapMain.param.stat_thema_map_id != "sAXkcVzk5V202007141335257355ued9032uw"){
						$(".sop-right").css("right", "405px");
					}
					//mng_e 20200727 이진호
					
					if (map1.dataGeojson == null) {
						//leekh 갤러리 등록된 내용 오류때문에 안나오는 현상 수정 20180614
							if(map1.lastGeojsonInfo != null){
								map1.setPolygonDataGeojson(map1.lastGeojsonInfo.geojson);
							}
						}
				}else if($("#dataMode").val()=="pieChart"){
					$("#legendBox_"+ map1.legend.id).hide();
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "MmLSKu8PgQ20201022173339083sOVy6YCGQj"){
						$("#dataBoard").show();
						$(".sop-right").css("right", "405px");
						$(".thematicCharts").empty();
						$(".thematicCharts").html("<div style='text-align:center;'>※ 파이차트 클릭 시 해당 지역의 감염병 발생 건 수와</div><div style='margin-top:5px;text-align:center;'>비율을 확인할 수 있습니다.</div>").css("margin-top","195px");
						$(".thematicTopText,.thematicBotText").hide();
					}else{
						$("#dataBoard").hide();
					}
					map1.lastGeojsonInfo = null;
					map1.openApiReverseGeoCode(map1.center,map1.bnd_year);
				}
				map1.checkShowCaption();
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
				
				var map1 = $thematicMapFrame05.ui.mapList[0];				
				if($('#dataMode2').val()=='dataOff'){
					map1.legend.numberData = false;
					//map1.changeRegionBound();	
				}else{
					map1.legend.numberData = true;
					//map1.changeRegionBound();	
				}				
				map1.checkShowCaption();
			},	
			
			/**
			 * 
			 * @name         : timeSeriesPlay
			 * @description  : 시계열을 시작/중지한다.
			 * @date         : 2016. 07. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			timeSeriesPlay : function(bool) {
				var map = $thematicMapFrame05.ui.mapList[0];
				map.timeSeriesPlay(bool);
			},
			
			
			/**
			 * 
			 * @name         : doMaxSize
			 * @description  : 맵을 최대화한다.
			 * @date         : 2015. 10. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			//20년수정반영(주석달기) 시작
			/*doMaxSize : function(type) {
				var ck = $(".tb_sizing").hasClass("on"); 
				if(!ck){
					$(".tb_sizing").addClass("on");
					$(".tb_sizing").children().attr("src","/img/ico/ico_toolbars12.png");
//					$("header").css({"height":"26px", "width":"100%"}); 
					$(".headerEtc, .gnb, .headerContents form").hide();
					$(".headerContents h1").css({"height":"26px"});
					$(".headerContents h1 img").css({"height":"26px", "margin":"0 0 0 10px"});
					$(".containerBox").css({"height":"calc(100% - 26px)", "top":"26px"});
				}else{
					$(".tb_sizing").removeClass("on");
					$(".tb_sizing").children().attr("src","/img/ico/ico_toolbars01.png");
//					$("header").css({"height":"104px", "width":"970px"}); 
					$(".headerEtc, .gnb, .headerContents form").show();
					$(".headerContents h1").css({"height":"78px"});
					$(".headerContents h1 img").css({"height":"45px", "margin":"18px 0 0 0"});
					$(".containerBox").css({"height":"calc(100% - 50px)", "top":"104px"});
				}
				
				for (var i=0; i<this.mapList.length; i++) {
					if (this.mapList[i] != null) {
						this.mapList[i].update();
					}
				}
			},*/
			
			
			/**
			 * 
			 * @name         : doClearMap
			 * @description  : 맵의 오버레이를 초기화한다.
			 * @date         : 2015. 10. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			/*doClearMap : function(type) {
				this.curMapId = parseInt(type)-1;
				if (this.mapList.length > 0) {
					var map = this.mapList[this.curMapId];
					map.clearDataOverlay();
					map.drawControl.removeOverlay();
					map.shareInfo.clearShareData();
					map.legend.legendInit();
				}
				this.dropBtnInfo[this.curMapId] = [];
			},*/
			
			
			/**
			 * 
			 * @name         : doShare
			 * @description  : 공유를 수행한다.
			 * @date         : 2015. 10. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			/*doShare : function(type) {
				this.curMapId = parseInt(type)-1;
				var shareInfo = this.mapList[this.curMapId].shareInfo;
				if (shareInfo.checkShare("SHARE")) {
					var shareData = shareInfo.shareUrlInfo;
					var title = "";
					for (var i=0; i<shareData.length; i++) {
						title += $.trim(shareData[i].title);
						if (shareData.length > 1 && i==0) {
							title += " | ";
						}
					}	
					shareInfo.doShare(title);
				}
			},*/
			//20년수정반영(주석달기) 끝
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
			 * @name         : doCombineMap
			 * @description  : 범례결합창을 표출한다.
			 * @date         : 2015. 10. 20. 
			 * @author	     : 김성현
			 * @param  type	 : 맵타입
			 */
			doCombineMap : function(type) {
				var isCombine = true;
				//console.log(this.mapList);
				//console.log(this.mapList[0].dataGeojson);
				//console.log(this.mapList[0].multiLayerControl.dataGeojson);
				for (var i=0; i<this.mapList.length; i++) {
					if (this.mapList[i] != null) {
						var map = this.mapList[i];
						if (map.dataGeojson == null && map.multiLayerControl.dataGeojson == null) {
							isCombine = false;
							break;
						}
					}
				}
				if (isCombine) {
					$thematicMapFrame05.ui.combinePopup = 
						window.open(
							"/view/map/interactiveCombineMap", 
							"combinePopup",
							"top=50, left=100, width=1200, height=800, menubar=no, status=no, toolbar=no, location=no, resizable=yes"
						);	
				}else {
					messageAlert.open("알림", "2개 이상의 조회된 통계정보가 있을때만<br/>범례결합 기능을 사용할 수 있습니다.");
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
				var popup = $thematicMapFrame05.ui.combinePopup.$combineMap.ui;
				popup.setData(deepCopy(data));
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
				var isMap1ContentShow =  $("#mapRgn_1").is(":visible");
				var isMap2ContentShow =  $("#mapRgn_2").is(":visible");
				var isMap3ContentShow =  $("#mapRgn_3").is(":visible");
				var createMapId, updateId;
				
				if (isMap1ContentShow & isMap2ContentShow & isMap3ContentShow) {
					messageAlert.open("알림", "지도는 3개까지만 생성할 수 있습니다.")
					return;
				}
				
				//표출된 맵뷰에 따른 플래그 설정
				if (isMap1ContentShow & isMap2ContentShow) {
					createMapId = 2;
					updateId = 1;
				}else if (isMap1ContentShow & isMap3ContentShow) {
					createMapId = 1;
					updateId = 2;
				}else if (isMap2ContentShow & isMap3ContentShow) { 
					createMapId = 0;
					updateId = 3;
				}else if (isMap1ContentShow) {
					createMapId = 1;
					updateId = 4;
				}else if (isMap2ContentShow) {
					createMapId = 0;
					updateId = 5;
				}else if (isMap3ContentShow) {
					createMapId = 0;
					updateId = 6;
				}

				//지도생성
				this.createMap("mapRgn_" + (createMapId+1), createMapId);
				var mapNavi = new mapNavigation.UI();
				mapNavi.firstBoolean = false;
				mapNavi.create("mapNavi_" + (createMapId+1), createMapId+1, $thematicMapFrame05.ui);
				
				var sceneInx = $(".sceneBox.on").length; 
				$(".sceneBox").eq(createMapId).show().addClass("on");
				if(sceneInx==1){ 
					$(".sceneBox").stop().animate({"width":"50%"},200, function() {
						for (var i=0; i<$thematicMapFrame05.ui.mapList.length; i++) {
							if ($thematicMapFrame05.ui.mapList[i] != null) {
								$thematicMapFrame05.ui.mapList[i].update();
							}
						}
					});
					$(".sceneRela").css({"border-left":"3px solid #000"});
					$(".sceneRela").eq(0).css({"border-left":"0"});
				}else if(sceneInx==2){ 
					$(".sceneBox").css({"position":"absolute"});
					$(".sceneBox").stop().animate({"width":"600px", "height":"500px"},200, function() {
						for (var i=0; i<$thematicMapFrame05.ui.mapList.length; i++) {
							if ($thematicMapFrame05.ui.mapList[i] != null) {
								$thematicMapFrame05.ui.mapList[i].update();
							}
						}
					}); 
					$(".sceneRela").css({"border-left":"0"});
					$(".resizeIcon").show();
					$(".sceneBox").each(function(i){
						$(this).css({"z-index":parseInt(10-i), "border":"3px solid #333"})
						.animate({"top":parseInt(50*(i+1))+"px", "left":parseInt(150*(i+1))+"px"},200);
					});
					$( ".sceneBox" ).draggable({containment: ".containerBox>.rela"}).resizable();
					$( ".sceneBox" ).on("resize", function() {
						for (var i=0; i<$thematicMapFrame05.ui.mapList.length; i++) {
							if ($thematicMapFrame05.ui.mapList[i] != null) {
								$thematicMapFrame05.ui.mapList[i].update();
							}
						}
					});
				} 
				
				$(".sceneBox.on").each(function(index) {
					$(this).find(".tb_radio").hide();
				});				
			
				//기존지도정보 복사
				switch(updateId) {
					case 1:
						this.mapList[2].mapMove(this.mapList[0].center, this.mapList[0].zoom);
						break;
					case 2:
					case 4:
						this.mapList[1].mapMove(this.mapList[0].center, this.mapList[0].zoom);
						break;
					case 3:
					case 5:
						this.mapList[0].mapMove(this.mapList[1].center, this.mapList[1].zoom);
						break;
					case 6:
						this.mapList[0].mapMove(this.mapList[2].center, this.mapList[2].zoom);
						break;
				}
				
				$(".interactiveDataBoard").hide();
				$(".interactiveView").css("display","inline-block");
				$(".tb_close").show();
				$(".interactiveView").each(function(i){
					$(".tb_mapAdd").text("VIEW"+parseInt(i+1));
				}); 
				
				var sceneInx = $(".sceneBox.on").length;
				if (sceneInx > 1) {
					$(".tb_combine").parent().show();
					$(".viewTitle > span").show();
				}else {
					$(".viewTitle > span").hide();
				}
				
			},
			
			
			/**
			 * 
			 * @name         : doRemoveMap
			 * @description  : 맵을 삭제한다.
			 * @date         : 2015. 10. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 1:1번맵, 2:2번맵, 3:3번맵
			 */
			doRemoveMap : function(type) {
				this.curMapId = parseInt(type)-1;
				if (this.mapList[this.curMapId] !== undefined) {
					this.mapList[this.curMapId].gMap.remove();
					this.mapList[this.curMapId] = null;
				}
				
				$(".sceneBox").eq(this.curMapId).removeClass("on").hide();
				var sceneInx = $(".sceneBox.on").length;  
				if(sceneInx==1){  
					$(".sceneBox").stop().animate({"width":"100%"},200, function() {
						for (var i=0; i<$thematicMapFrame05.ui.mapList.length; i++) {
							if ($thematicMapFrame05.ui.mapList[i] != null) {
								$thematicMapFrame05.ui.mapList[i].update();
							}
						}
					}); 
					$(".tb_close, .interactiveView").hide();
					$(".interactiveDataBoard").show();
					$(".sceneBox.on").eq(0).find(".sceneRela").css({"border-left":"0px"});
					$(".sceneBox.on").each(function(index) {
						$(this).find(".tb_radio").show();
					});
				}else if(sceneInx==2){
					$(".sceneBox").stop().animate({"width":"50%"},200, function() {
						for (var i=0; i<$thematicMapFrame05.ui.mapList.length; i++) {
							if ($thematicMapFrame05.ui.mapList[i] != null) {
								$thematicMapFrame05.ui.mapList[i].update();
							}
						}
					});
					$(".sceneBox").draggable("destroy").resizable("destroy").css({"position":"static", "border":"0", "height":"100%"});
					$(".sceneBox.on").eq(1).find(".sceneRela").css({"border-left":"3px solid #000"});
					$(".sceneBox.on").each(function(index) {
						$(this).find(".tb_radio").hide();
					});
				}
				
				$(this).hide(); 
				$(".resizeIcon").hide();
				$(".interactiveView").each(function(i){
					$(this).text("VIEW"+parseInt(i+1));
				});
				
				var isMap1ContentShow =  $("#mapRgn_1").is(":visible");
				var isMap2ContentShow =  $("#mapRgn_2").is(":visible");
				var isMap3ContentShow =  $("#mapRgn_3").is(":visible");
				
				if (isMap1ContentShow & isMap2ContentShow & isMap3ContentShow) {
					messageAlert.open("알림", "지도는 3개까지만 생성할 수 있습니다.")
					return;
				}
				
				//표출된 맵뷰에 따른 플래그 설정
				if (isMap1ContentShow & isMap2ContentShow) {
					this.curMapId = 0;
				}else if (isMap1ContentShow & isMap3ContentShow) {
					this.curMapId = 0;
				}else if (isMap2ContentShow & isMap3ContentShow) { 
					this.curMapId = 1;
				}else if (isMap1ContentShow) {
					this.curMapId = 0;
				}else if (isMap2ContentShow) {
					this.curMapId = 1;
				}else if (isMap3ContentShow) {
					this.curMapId = 2;
				}
				
			},
				
			/**
			 * 
			 * @name         : shareToKakaoStory
			 * @description  : 카카오스토리 공유를 수행한다.
			 * @date         : 2015. 10. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param		 : 
			 * @param    	 : 
			 */
			shareToKakaoStory : function() {
				var shareInfo = this.mapList[this.curMapId].shareInfo;
				var linkUrl = $("#sharedlg").find($("input")).val();
				shareInfo.doShareToKakaoStory(linkUrl);
			},
			
			
			/**
			 * 
			 * @name         : createInfoTooltip
			 * @description  : 경계레이어 선택 시, 툴팁을 생성하여 정보를 표출한다.
			 * @date         : 2015. 10. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 선택된 경계레이어
			 * @param data   : 선택된 경계레이어의 데이터정보
			 */
			createInfoTooltip : function(event, data, type, map) {
				var html = "<table style='margin:10px;'>";
				var searchYear = "";

				/*if(this.curDropParams[map.id] != undefined) {
					for(var i = 0; i < this.curDropParams[map.id].param.length; i ++) {
						if (this.curDropParams[map.id].param[i].key == "year") {
							searchYear = this.curDropParams[map.id].param[i].value + "년 ";
						}
					}	
				}*/
				
				if (type == "data") {
					if (data.info.length > 0) {
						
						//kosis
						if(data.info[2] == "kosis") {
							var html = "<table style='margin:10px;'>";
							if (data.properties.adm_nm !== undefined) {
								html += "<tr><td class='admName'>"
									 + data.properties.adm_nm 
									 + "</td></tr>"
									 + "<tr style='height:5px'></tr>";
							}
							
							if(data.info[0] != null && data.info[0] != undefined && data.info[0] != 'NaN') {
								/*//5미만의 데이터의 경우, N/A처리
								var value;
								if (parseFloat(data.info[0]) < 5) {
									value = "N/A";
								}else {
									value = appendCommaToNumber(data.info[0]);
								}*/
								var value = appendCommaToNumber(parseFloat(data.info[0]));
								html += "<tr><td class='statsData'>"
										+ searchYear + value;
							} else {
								html += "<tr><td class='statsData'>-";
							}
							
							if (data.info[1] != undefined) {
								html += " (" + data.info[1] + ")";
							}
						    html += "</td></tr>";
						}else {
							var showName = {
								"tot_ppltn" : "총인구",
								"tot_ppltn_male" : "총인구(남자)",
								"tot_ppltn_fem" : "총인구(여자)",
								"avg_age" : "평균나이",
								"avg_age_male" : "평균나이(남자)",
								"avg_age_fem" : "평균나이(여자)",
								"ppltn_dnsty" : "인구밀도",
								"aged_child_idx" : "노령화지수",
								"oldage_suprt_per" : "노년부양비",
								"juv_suprt_per" : "유년부양비",
								"tot_suprt_per" : "총부양비",
								"population" : "인구",
								"tot_worker" : "종사자수",
								"corp_cnt" : "사업체수",
								"household_cnt" : "가구수",
								"house_cnt" : "주택수",
								"farm_cnt" : "농가수",
								"forestry_cnt" : "임가수",
								"fishery_cnt" : "어가수"
								
							};
							
							for (var i = 0; i < data.info.length; i++) {
								var tmpData = data.info[i];
//								if (i == 0) {
//									if (tmpData.adm_nm !== undefined) {
//										html += "<tr><td class='admName'>"
//											 + tmpData.adm_nm 
//											 + "</td></tr>"
//											 + "<tr style='height:5px'></tr>";
//									}
//								}
							
							if(data.properties.adm_nm !== undefined){
								//데이터보드에 쓸 행정구역 이름을 map.js에 저장한다.
								map.adm_nm = data.properties.adm_nm;
								html += "<tr><td class='admName'>"
									 + data.properties.adm_nm 
									 + "</td></tr>"
									 + "<tr style='height:5px'></tr>";							
							}
								
								
								if (tmpData.showData != undefined && tmpData.showData.length > 0) {
									var filterName = "";
									// 선택된 adm_cd를 map.js에 저장한다.
									$thematicMapFrame05.ui.mapList[0].selectedAdmCd = tmpData.adm_cd;
									
									
									//tmpData.showData ( left_setp_value )
									
									
//									if (showName[tmpData.showData] != undefined) {
//										filterName = showName[tmpData.showData];
//									}
									
									if($("#selectValue").val()=="leftValue" || $("#selectValue").val()=="etcValue"){
										filterName = tmpData.left_sep_ttip_title;
									}else {
										filterName = tmpData.right_sep_ttip_title;
									}
									html += "<tr>";
//									if (filterName.length > 0) {
//										html += "<td class='statsData'>"+searchYear +" " + filterName+ "</td>"
//										 	 + "<td>&nbsp;:&nbsp;</td>";
//									} else {
//										html += "<td class='statsData'>"+searchYear +" </td>"
//									 	 + "<td>&nbsp;:&nbsp;</td>";
//									}
									if (filterName.length > 0) {
										// mng_s 2017. 10. 25 j.h.Seok
										if(filterName.indexOf("20") != -1) {
											html += "<td class='statsData'>" + filterName+ "</td>"
											+ "<td>&nbsp;:&nbsp;</td>";
										} else {
											if(window.parent.$thematicMapMain.param.stat_thema_map_id == "QNj43PFUT220190612100733746ocaFOXLaj3"){
												if($(".select_quarter").hasClass("on")){
													html += "<td class='statsData'>"+tmpData.base_year+"년 " + tmpData.period_value.substr(0,1) + "분기 " + filterName+ "</td>"
													+ "<td>&nbsp;:&nbsp;</td>";
												}else if($(".select_monthly").hasClass("on")){
													html += "<td class='statsData'>"+tmpData.base_year+"년 " + tmpData.period_value + "월 " + filterName+ "</td>"
													+ "<td>&nbsp;:&nbsp;</td>";
												}else{
													html += "<td class='statsData'>"+tmpData.base_year+"년" +" " + filterName+ "</td>"
													+ "<td>&nbsp;:&nbsp;</td>";
												}
											}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "onb6f4rRh320190902160751679iQUr3aVwTT"){
												html += "<td class='statsData'>20"+tmpData.base_year.substr(0,2)+"년 "+tmpData.base_year.substr(2,2)+"월 " + filterName+ "</td>"
												+ "<td>&nbsp;:&nbsp;</td>";
											
											//코로나추가 20200731 jrj
											}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw"){
												var covidDt = "("+$("#covid_month option:selected").val()+"."+$("#covid_day option:selected").val()+" 기준)";
												html += "<td class='statsData'>"+filterName+covidDt+"</td>"
												+ "<td>&nbsp;:&nbsp;</td>";
											}else{
												html += "<td class='statsData'>"+tmpData.base_year+"년" +" " + filterName+ "</td>"
												+ "<td>&nbsp;:&nbsp;</td>";
											}
										}
										// mng_e 2017. 10. 25 j.h.Seok
									} else {
										html += "<td class='statsData'>"+tmpData.base_year+"년" +" </td>"
										+ "<td>&nbsp;:&nbsp;</td>";
									}
									
									//5미만의 데이터의 경우, N/A처리
									//인구총괄의 경우, 평균나이, 인구밀도, 노령화지수, 노년부양비, 유년부양비, 총부양비는 제외
									var value;
									if (parseFloat(tmpData[tmpData.showData]) < 5 && 
										tmpData.showData != "avg_age" &&
										tmpData.showData != "ppltn_dnsty" &&
										tmpData.showData != "aged_child_idx" && 
										tmpData.showData != "oldage_suprt_per" &&
										tmpData.showData != "juv_suprt_per" && 
										tmpData.showData != "tot_suprt_per") {
										value = appendCommaToNumber(parseFloat(tmpData[tmpData.showData]));
									}else {
										value = appendCommaToNumber(parseFloat(tmpData[tmpData.showData]));
									}
									
									html += "<td>"
										 + value;
									
									if (value != "N/A") {
										if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw"){
											html += tmpData.unit;
										} else {
											html +=  " ("+ tmpData.unit +")";
										}
									}
									
								/*	//노령화지수, 노년부양비, 유년부양비, 총부양비의 경우, 단위삭제
									if (tmpData.showData != "aged_child_idx" && 
										tmpData.showData != "oldage_suprt_per" &&
										tmpData.showData != "juv_suprt_per" && 
										tmpData.showData != "tot_suprt_per" && value != "N/A") {
										html +=  " ("+ tmpData.unit +")";
									}*/

									html += "</td></tr>";
								}	
							}
						}
					}else {
						map.adm_nm = data.properties.adm_nm;
						html += "<tr><td class='admName'>"
							 + data.properties.adm_nm 
							 + "</td></tr>"
							 + "<tr style='height:5px'></tr>";	
						html += "<tr><td class='statsData'>N/A</td></td>";
					}
					
				}else if (type == "build") {
					var info = data.properties;
					var lowest = "";
					var highest = "지상" + Math.abs(info.highest_flr) + "(층)";
					if(info.lowest_flr < 0) {
						lowest = "지하" + Math.abs(info.lowest_flr) + "(층)";	
					}else {
						lowest = "지상" + Math.abs(info.lowest_flr) + "(층)";	
					}
					
					var bd_nm = "";
					if(info.bd_nm != undefined && info.bd_nm.length > 0 ) {
						bd_nm = info.bd_nm;
					}
					html += "<tr><td class='admName'>" + bd_nm + "</td></tr>" 
					     +  "<tr style='height:10px;'></tr>" 
					     +  "<tr><td class='statsData'>" +lowest + " ~ "+ highest +"</td></tr>" 
					     +	"<tr style='height:5px;'></tr>" 
					     +  "<tr><td class='statsData'>" + info.bd_naddr + "</td></tr>";
				}
				html += "</table>";

				event.target.bindToolTip(html, {
					direction: 'right',
					noHide:true,
					opacity: 1

				}).addTo(map.gMap)._showToolTip(event);
				
				// djlee 수정
				$(".sop-tooltip").parent().css({"width" : "270px"} );
				
				$(".admName")
					.css("font-size", "14px")
					.css("font-weight", "bold")
					.css("color", "#3792de");
				$(".statsData")
					.css("font-size", "12px")
					.css("padding-left", "2px");
				$("table").css("width","initial");
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
				if 	    (api_id == "API_0301") $thematicMapFrame05Api.request.openApiTotalPopulation(options);
				else if (api_id == "API_0302") $thematicMapFrame05Api.request.openApiSearchPopulation(options);
				else if (api_id == "API_0303") $thematicMapFrame05Api.request.openApiInderstryCode(options);
				else if (api_id == "API_0304") $thematicMapFrame05Api.request.openApiCompany(options);
				else if (api_id == "API_0305") $thematicMapFrame05Api.request.openApiHouseHold(options);
				else if (api_id == "API_0306") $thematicMapFrame05Api.request.openApiHouse(options);
				else if (api_id == "API_0307") $thematicMapFrame05Api.request.openApiFarmHouseHold(options);
				else if (api_id == "API_0308") $thematicMapFrame05Api.request.openApiForestryHouseHold(options);
				else if (api_id == "API_0309") $thematicMapFrame05Api.request.openApiFisheryHouseHold(options);
				else if (api_id == "API_0310") $thematicMapFrame05Api.request.openApiHouseHoldMember(options);
				
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
			//20년수정반영 시작 (공유메서드)
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
			//20년수정반영 끝 (공유메서드)
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
						var stat_sel, region_boundary, map_type, data_type, select_base_year;
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
								"iframe_url" : window.location.protocol+"//"+window.location.host+"/view/thematicMap/thematicMapFrame05"
							};
						
						
						for (var i=0; i<shareData.length; i++) {
							shareData[i].params.paramInfo = params;
							//2017.02.22 이미지캡쳐 수정
							var captureTargetId = "#mapRgn_"+type;
							shareData[i].params["mapCaptureId"] = captureTargetId;
						}
						
						//갤러리 등록일 경우
						if (srvType != undefined && srvType != "THEME") {
							switch (srvType) {
								case "gallary":
									var captureTargetId = "#mapRgn_"+type;
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
		 				$("#fullScreen").children().attr("src","/img/ico/ico_toolbars12.png");//20년수정반영 (toolbars12.png)
		 				$("#fullScreen").addClass("on");
		 				$("header",window.parent.document).hide();
		 				$(".map_dummy",window.parent.document).css("height","100vh");
		 			}else{
		 				$("#fullScreen").children().attr("src","/img/ico/ico_toolbars01.png");//20년수정반영 (toolbars01.png)
		 				$("#fullScreen").removeClass("on");
		 				$("header",window.parent.document).show();
		 				$(".map_dummy",window.parent.document).css("height","865px"); // 20년수정반영 (전체화면 해제시 화면 높이를 833px ==> 865px로 수정) 
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
	 			var map1 = $thematicMapFrame05.ui.mapList[0];//20년수정반영 ($thematicMapFrame04 => 05 로 수정)
				map1.legend.numberData = false;
				map1.checkShowCaption();
	 		},
			//20년수정반영 끝 (초기화  메서드)
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
										logging: true,
					                    useCORS: false,
					                    proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
					                    onrendered: function(canvas) {
											var blob = canvas.msToBlob();
											var title = window.parent.$thematicMapMain.themaInfo.title.replace(/\s/gi,"_");
											window.navigator.msSaveBlob(blob,title+'.png');
					                    }
							    	});
								} else {
							    	html2canvas($("#mapRgn_1")[0], {
										logging: true,
					                    useCORS: false,
					                    proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp"
									}).then(function(canvas) {
										var a = document.createElement('a');
										a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
										var title = window.parent.$thematicMapMain.themaInfo.title.replace(/\s/gi,"_");
										a.download = title+".png";
										a.click();
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
			},
			// mng_s 20200713 김건민 (IE에서는 이미지 다운로드시 기능상 숫자 겹칩이 발생이므로 수정함.)
	   		chartImageDown : function(){
	   			var agent = navigator.userAgent.toLowerCase();
				if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ){
					messageConfirm.open( "알림", "IE에서는 이미지 다운로드시 기능상 숫자 겹침이 발생하므로 크롬을 이용해주시기 바랍니다.",
						btns = [
									{
		   					        	title : "확인",
		   					        	fAgm : null,
		   					        	disable : false,
		   					        	func : function(opt) {}
		   					        }   
								]
						);
				}else{
					messageConfirm.open( "알림", "해당 차트 이미지를 저장 하시겠습니까?",
		   					btns = [
		   					        {
		   					        	title : "저장",
		   					        	fAgm : null,
		   					        	disable : false,
		   					        	func : function(opt) {
	   					        			html2canvas($(".dataSideContents")[0], {
	   					        				logging: true,
	   					        				useCORS: false,
	   					        				proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp"
	   					        			}).then(function(canvas) {
	   					        				var a = document.createElement('a');
	   					        				a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	   					        				var title = window.parent.$thematicMapMain.themaInfo.title.replace(/\s/gi,"_");
	   					        				a.download = title+".png";
	   					        				a.click();
	   					        			});
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
	   			/*messageConfirm.open( "알림", "해당 차트 이미지를 저장 하시겠습니까?",
	   					btns = [
	   					        {
	   					        	title : "저장",
	   					        	fAgm : null,
	   					        	disable : false,
	   					        	func : function(opt) {
	   					        		var agent = navigator.userAgent.toLowerCase();
	   					        		
	   					        		if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
	   					        			html2canvas($(".dataSideContents"), {
	   					        				logging: true,
	   					        				useCORS: false,
	   					        				proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
	   					        				onrendered: function(canvas) {
	   					        					var blob = canvas.msToBlob();
	   					        					var title = window.parent.$thematicMapMain.themaInfo.title.replace(/\s/gi,"_");
	   					        					window.navigator.msSaveBlob(blob,title+'.png');
	   					        				}
	   					        			});
	   					        		} else {
	   					        			html2canvas($(".dataSideContents")[0], {
	   					        				logging: true,
	   					        				useCORS: false,
	   					        				proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp"
	   					        			}).then(function(canvas) {
	   					        				var a = document.createElement('a');
	   					        				a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	   					        				var title = window.parent.$thematicMapMain.themaInfo.title.replace(/\s/gi,"_");
	   					        				a.download = title+".png";
	   					        				a.click();
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
	   			);*/
	   		}
			// mng_e 20200713 김건민
	};
	
	// ==============================//
	// map event callback
	// ==============================//
	$thematicMapFrame05.callbackFunc = {

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
				
				var poiControl = map.mapBtnInfo;
				if (map.zoom < 10 && map.isInnerMapShow) {
					$thematicMapFrame05.ui.doInnerMap(map.id+1);
				}

				//사업체 POI 없애기
				if (map.zoom < 10 && poiControl.isOpenPOI) {
					messageAlert.open("알림", "해당 레벨에서는 사업체 POI정보를 볼 수 없습니다.");
					poiControl.clearPOI();
				}
			},

			// 드랍종료 시, 콜백 호출
			didMapDropEnd : function(event, source, layer, data, map) {
				// api_id?
				var api_id = "";
				// index?
				var index = null;

				// share정보 초기화
				
				
				$thematicMapFrame05.ui.curMapId = map.id;
				$thematicMapFrame05Api.request.combineFailCnt = 0;
				map.shareInfo.shareUrlInfo = [];
				map.dropInfo = null;
				
				//id?
				// prop() : javascirpt 프로퍼티를 취급
				var id = $("#" + source.prop("id")).find("a").attr("id"); 
				// tmpParamList?
				var tmpParamList = deepCopy($interactiveLeftMenu.ui.arParamList);

				//kosis
				if (id.split("-")[0] == "kosis") {
					var tempAdmCd = data.adm_cd;
					if (tempAdmCd == "00") {
						tempAdmCd = "1";
					}
					var admCdLen = tempAdmCd.length;
					interactiveMapKosis.map = map;
					index = id.split("-")[1];
//					$thematicMapFrame05.ui.changeBtnLineColor("kosis", tmpParamList,
//							index, map);
	
					var selParams = [];
					for (var i = 0; i < tmpParamList.length; i++) {
						if (tmpParamList[i].idx == index) {
							interactiveMapKosis.curSelectedTitle = tmpParamList[i].title;
							selParams.push(tmpParamList[i].params);
							break;
						}
					}
					interactiveMapKosis.reqSetKosisParam(selParams, tempAdmCd, map);
					$interactiveLeftMenu.ui.updateSearchBtnEffect(id, map.id);
					return;
				} else {
					map.bnd_year = map.bnd_year;
					$thematicMapFrame05.ui.searchBtnType = "normal";
					api_id = id.split("-")[0];
					index = id.split("-")[1];
					$interactiveLeftMenu.ui.updateSearchBtnEffect(id, map.id);
	
					var tmpParam = null;
					for (var i = 0; i < tmpParamList.length; i++) {
						if (tmpParamList[i].idx == index) {
							tmpParam = tmpParamList[i];
							$thematicMapFrame05.ui.dropBtnInfo[map.id] = tmpParamList[i];
							break;
						}
					}
				}

				// 다중선택일 경우
				if (map.selectedBoundMode == "multi") {
					for (var i = 0; i < map.selectedBoundList.length; i++) {
						var adm_cd = map.selectedBoundList[i].feature.properties.adm_cd;
						var adm_nm = map.selectedBoundList[i].feature.properties.adm_nm;
						if (adm_cd.length > 7) {
							adm_cd = adm_cd.substring(0, 7);
						}
						$thematicMapFrame05.ui.curAdmCode = adm_cd;
						map.curAdmCd = adm_cd;
	
						if (tmpParam != null) {
							var params = $thematicMapFrame05.ui.reqSetParams(tmpParam, adm_cd, adm_nm, api_id, map);
							$thematicMapFrame05.ui.curDropParams[map.id] = params;
							$thematicMapFrame05.ui.requestOpenApi(params);
						}
					}
				} else {
					if (data.adm_cd.length > 7) {
						data.adm_cd = data.adm_cd.substring(0, 7);
					}
					$thematicMapFrame05.ui.curAdmCode = data.adm_cd;
					map.curAdmCd = data.adm_cd;
	
					if (tmpParam != null) {
						var params = $thematicMapFrame05.ui.reqSetParams(tmpParam,data.adm_cd, data.adm_nm, api_id, map);
						//console.log(params);
						//시계열 초기값 세팅
						$interactiveDataBoard.ui.timeSeriesInit(params);
						
						$thematicMapFrame05.ui.curDropParams[map.id] = params;
						$thematicMapFrame05.ui.requestOpenApi(params);
					}
					map.setBoundSelectedMoode(null);
					map.mapBtnInfo.setFixedBoundBtn(false);
				}
			},
			
			// 더블클릭 시, 콜백 호출
			didMapDoubleClick : function(btn_id, tmpParam) {
				var map = $thematicMapFrame05.ui.mapList[$thematicMapFrame05.ui.curMapId];				
				var index = null;
				var adm_cd = "";
				var adm_name= "";
				var api_id = "";
								
				// share정보 초기화
				$thematicMapFrame05.ui.curMapId = map.id;
				map.shareInfo.shareUrlInfo = [];
				map.dropInfo = null;
				
				$thematicMapFrame05Api.request.combineFailCnt = 0;
				var id = btn_id;

				// kosis
				if (id.split("-")[0] == "kosis") {
				} else {
					map.bnd_year = map.bnd_year;
					$thematicMapFrame05.ui.searchBtnType = "normal";
					api_id = id.split("-")[0];
					index = id.split("-")[1];
	
					// 버튼 시각 효과
					$interactiveLeftMenu.ui.updateSearchBtnEffect(id, map.id);
					$thematicMapFrame05.ui.dropBtnInfo[map.id] = tmpParam;
				}
				
				if (map.selectedBoundMode == "multi") {
					for (var i=0; i<map.selectedBoundList.length; i++) {
						var adm_cd = map.selectedBoundList[i].feature.properties.adm_cd;
						var adm_nm = map.selectedBoundList[i].feature.properties.adm_nm;
						if (adm_cd.length > 7) {
							adm_cd = adm_cd.substring(0,7);
						}

						$thematicMapFrame05.ui.curAdmCode = adm_cd;
						map.curAdmCd = adm_cd;

						if (tmpParam != null) {		
							var params = $thematicMapFrame05.ui.reqSetParams(tmpParam, adm_cd, adm_nm, api_id, map);
							$thematicMapFrame05.ui.curDropParams[map.id] = params;
							$thematicMapFrame05.ui.requestOpenApi(params);
						}
					}
				}else {
					var center = map.gMap.getCenter();
					map.gMap.eachLayer(function(layer){
						 if( layer._containsPoint) {
							 var point = map.gMap.utmkToLayerPoint(center);  
			                    if (layer._containsPoint(point)){
			                    	adm_cd = layer.feature.properties.adm_cd;
			                    	adm_nm = layer.feature.properties.adm_nm;
			                    }
						 }
					});
					
					if (adm_cd.length == 0) {
						messageAlert.open("알림", "조회할 경게정보가 없습니다.<br/>경계를 조회해주세요.");
						return;
					}

					if (adm_cd.length > 7) {
						adm_cd = adm_cd.substring(0,7);
					}
					
					$thematicMapFrame05.ui.curAdmCode = adm_cd;
					map.curAdmCd = adm_cd;
					map.curDropCd = adm_cd;

					if (tmpParam != null) {				
						var params = $thematicMapFrame05.ui.reqSetParams(tmpParam, adm_cd, adm_nm, api_id, map);
						$thematicMapFrame05.ui.curDropParams[map.id] = params;
						$thematicMapFrame05.ui.requestOpenApi(params);
					}
					map.setBoundSelectedMoode(null);
					map.mapBtnInfo.setFixedBoundBtn(false);
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
			didMouseOverPolygon : function(event, data, type, map) {	
				if (type != "polygon") {
					if (type == "data") {
						if (data.info.length > 0) {
							map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
					}
					// event , data, type , map?
					// event, feature , "data" , sMap
					$thematicMapFrame05.ui.createInfoTooltip(event, data, type, map);
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
			 * @name         : didSelectedPolygon
			 * @description  : 해당경계 선택 시, 발생하는 콜백함수
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 일반경계 및 데이터경계 타입
			 */
			didSelectedPolygon : function(event, data, type, map) {
				if (type == "data") {
					// 차트 하이라이트 효과
					//map.mapInfo.selectChartData(data.properties, data.dataIdx);
					// 범례 하이라이트 효과
					//map.mapInfo.selectLegendRangeData(event.target.options.fillColor);
					
				}else if (type == "build") {
					if ($thematicMapFrame05.ui.buildPopup != null) {
						$thematicMapFrame05.ui.buildPopup.close();
					}
					
					var top = $("#mapRgn_"+(map.id+1)).offset().top + 100;
					var left = $("#mapRgn_"+(map.id+1)).offset().left + 
							   $("#mapRgn_"+(map.id+1)).width()/2 - 400/2;

					$thematicMapFrame05.ui.buildPopup = 
						window.open(
							"/view/indoor/indoorMap?sufid=" + data.properties.sufid, 
							"건물상세정보",
							"top="+top+", left="+left+", width=800, height=680, menubar=no, status=no, toolbar=no, location=no, resizable=yes"
						);
					
				}
				
				//다중경계선택
				if (map.selectedBoundMode != null && map.selectedBoundMode == "multi") {
					var layer = event.target;
					var boundList = map.selectedBoundList;
					var tmpBoundList = [];
					var isEqualLayer = false;
					for (var i=0; i<boundList.length; i++) {
						if (boundList[i].feature.properties.adm_cd == layer.feature.properties.adm_cd) {
							map.clearLayerStyle(layer);
							isEqualLayer = true;
						}else {
							tmpBoundList.push(boundList[i]);
						}
					}
					map.selectedBoundList = tmpBoundList;
					
					if (isEqualLayer) {
						return;
					}
					
					if (boundList.length >= 3) {
						messageAlert.open("알림", "다중경계는 최대 3개까지 선택가능합니다.");
						return;
					}
					
					layer.setStyle({
						weight : 5,
						color : layer.options.color,
						dashArray : layer.options.dashArray,
						fillOpacity : 0.7,
						fillColor : "#FFF56E"
					});
					map.selectedBoundList.push(layer);
				}
				
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
	
	$thematicMapFrame05.event = {
			
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
							if (id == $thematicMapFrame05.ui.curMapId) {
								isSameView = true;
							}
						});						
						
						if (!isSameView) {
							if (tmpView[0] < tmpView[1]) {
								$thematicMapFrame05.ui.curMapId = tmpView[0];
							}else {
								$thematicMapFrame05.ui.curMapId = tmpView[1];
							}
							
							var id = "view" + ($thematicMapFrame05.ui.curMapId + 1);
							switch($thematicMapFrame05.ui.curMapId) {
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
				
/*				$(".tb_mapAdd").click(function(){ 
					$(".interactiveDataBoard").hide();
					$(".interactiveView").css("display","inline-block");
					$(".tb_close").show();
					$(".interactiveView").each(function(i){
						$(this).text("VIEW"+parseInt(i+1));
					}); 
					
					var sceneInx = $(".sceneBox.on").length;
					if (sceneInx > 1) {
						$(".tb_combine").parent().show();
						$(".viewTitle > span").show();
					}else {
						$(".viewTitle > span").hide();
					}
					
			    });*/
				
				$(".sceneBox").click(function(){
					var sceneInx = $(".sceneBox.on").length; 
					var id = $(this).attr("id");
					if (sceneInx > 1) {
						if (!isClose) {
							$(".sceneBox").find(".toolBar").css("background", "#ffffff");
						}
						if (id == "view1") {
							$thematicMapFrame05.ui.curMapId = 0;
							$(this).find(".toolBar").css("background", "#0070c0");
						}else if (id == "view2") {
							$thematicMapFrame05.ui.curMapId = 1;
							$(this).find(".toolBar").css("background", "#9ed563");
						}else {
							$thematicMapFrame05.ui.curMapId = 2;
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

			},
			
			// mng_s 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
			refreshThemaList : function(select_obj) {
				var categoryId = select_obj.id.substring(0, 8);
				window.parent.$thematicMapMain.request.sortType[categoryId] = select_obj.value;
				$thematicMapFrame05.getCategoryList.getMenuList(categoryId);
			}
			// mng_e 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
			
			
	};
			$thematicMapFrame05.Popup = {
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
	
	
			$thematicMapFrame05.request = {
				//카타고리 정보를 가져온다.
				getCategory : function () {
					$statsPotal.api.thematicMap.getCategory({
						method : 'POST',
						success : $thematicMapFrame05.response.successCateList
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
		
			$thematicMapFrame05.response = {
				successCateList : function (stats, res) {
					// 좌측 카탈로그 리스트 받아서 붙이기 
					if (res.errCd === 0) {
						categoryList = res.result.cateList;
						
						for ( var i = 0; i < categoryList.length; i++) {							
							//var html = "<li style='background:url("+categoryList[i].category_icon_url+");background-size:30px 30px;background-repeat:no-repeat;background-position:left'><a href='javascript:$thematicMapFrame05.getCategoryList.getMenuList(\""+categoryList[i].thema_map_category+"\");'>"+categoryList[i].category_nm+"</a></li>";
							//$('.qmIcon01').append(html);
							var html = '<li><a data-id="'+categoryList[i].thema_map_category+'"  href="javascript:$thematicMapFrame05.getCategoryList.getMenuList(\''+categoryList[i].thema_map_category+'\');">'+categoryList[i].category_nm+'</a></li>';
							$('.themul').append(html);
							
//							html = '<li><a data-id="'+categoryList[i].thema_map_category+'"  href="javascript:$thematicMapFrame05.getCategoryList.getMenuList(\''+categoryList[i].thema_map_category+'\');" title="'+categoryList[i].category_nm+'"><span>'+categoryList[i].category_nm+'</span></a></li>';
							$('.nav-list').append(html);
							
						}						
					}
				}				
			};
			
			$thematicMapFrame05.getCategoryList = {
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
								html += 'onchange="javascript:$thematicMapFrame05.event.refreshThemaList(this)";>';
								html += '<option value="recommend">추천순 정렬</option> <option value="favorite">인기순 정렬</option> <option value="alphabet">가나다순 정렬</option> </select>';
//								html += '<a id="sort_tooltip" class="theme_sort_tooltip" title="' + sortTooltipText + '"><img src="/img/ico/ico_help05.png" width="20" height="20" alt="정렬방식 도움말 팝업"/></a>';
								$('.subj_list').append(html);
								
								$("#" + selectId).val(tempSortType);
								// mng_e 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
								
								$thematicMapFrame05.setCategoryList.setCategoryListHtml(res);
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
			
//			<div class="totalResult tr01">
//			<div class="stepBox">
//			    <ul id="stepBoxUl">
//			        
//			    </ul>
//			</div> 
//		  </div>
			
//            <input type="checkbox" id="rd_juger01" />
//            <label for="rd_juger01" data-subj="주제도 특성" title="<span class='sp01'>시도11</span><span class='sp01'>시군구12</span><span class='sp02'>다중뷰14</span>">갤혼기간 10년 이하 가구의 주택 점유형태 지역별 분포, 2010</label>
//       		 </li>
			
			$thematicMapFrame05.setCategoryList = {
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
									if( list[i].stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw" ){
										html += '<img src="/img/common/ico_new.png" style="margin-left:5px;height:15px;margin-top:3px;">';
									}else if (list[i].stat_thema_map_id == "kmOpHLH5cK202106100936161097g5G9nLCFE" ){
										html += '<img src="/img/common/ico_new.png" style="margin-left:5px;height:15px;margin-top:3px;">';
									}else if (list[i].stat_thema_map_id == "wPsSdFX8Wt20210520161423833UZjHClj5U3" ){
										html += '<img src="/img/common/ico_new.png" style="margin-left:5px;height:15px;margin-top:3px;">';
									}
									html += '</li>';
								//mng_s 20211214 주용민
								}else if(list[i].category=="CTGR_006"){
									html += '<label id="rd_juger'+i+'" data-id="'+list[i].stat_thema_map_id+'" data-theme="'+list[i].category+'" data-mapType="'+list[i].thema_map_type+'" onclick="parent.location.href=\'/view/thematicMap/thematicMapMain?stat_thema_map_id=' + list[i].stat_thema_map_id + '&theme=' + list[i].category + '&mapType=' + list[i].thema_map_type + tempSortStr + typeYN + '\'" id="" for="">'+list[i].title+'</label></li>';
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
									$thematicMapFrame05.ui.paramInfo = JSON.parse(res.result.themeParamInfoList[0].param_info);
									$thematicMapFrame05.ui.paramInfo.paramInfo["type"] = "bookmark"
									$thematicMapFrame05.ui.doAnalysisShareInfo($thematicMapFrame05.ui.paramInfo.paramInfo);
								}
							},
							onFail : function(status, options) {
							}
						});
			}());
		
	
}(window, document));