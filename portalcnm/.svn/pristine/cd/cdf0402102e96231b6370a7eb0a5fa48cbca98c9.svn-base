/**
 * 공공데이터 데이터보드에 관한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/11/18  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$publicDataBoard = W.$publicDataBoard || {};
	
	$(document).ready(function() {
		$publicDataBoard.event.setUIEvent();	//UI에 사용되는 이벤트를 설정한다.
		$publicDataBoard.ui.mapDataSetting();	//지도별 데이터 형식 세팅
	});
	
	$publicDataBoard.ui = {
			gubun : "",				//interactiveMap, bizStatsMap
			mapData : [],				//지도별 데이터
			map : null,				//지도 (sMap.map)
			map_id : "0",				//지도 ID (0, 1, 2)
			
			/**
			 * 
			 * @name         : mapDataSetting
			 * @description  : 지도별 데이터 형식 세팅
			 * @date         : 2015. 10. 28. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			mapDataSetting : function() {
				var tempObj = {};
				for(var i = 0; i < 3; i ++) {
					tempObj = {
							"options" : {
								map : null,
								viewIndex : 0,				//현재 보고 있는 Index (페이징)
								markerGroup : [],			//POI 그룹
								result : [],					//POI 상세결과 리스트
								circle : null,				//임의영역 반경 서클
								circleGeojson : null,	//임의영역 반경 경계
								radius : 100,				//서클 크기
								mapBounds : null		//지도 바운더리
							},
							"type" : ""
					}
					this.mapData.push(tempObj);					
				}
			},
			
			/**
			 * @name         : updatePublicData
			 * @description  :	공공데이터 조회
			 * @date         : 2015. 11. 18. 
			 * @author	     : 김성현
			 * @param	: delegate, type 공공데이터 타입
			 * @history 	 :
			 */
			updatePublicData : function(delegate, type) {
				console.log(delegate);
				console.log(type);
				
				//초기화
				this.reset();
				
				//메모리에 저장
				this.gubun = delegate.namespace;
				this.map_id = delegate.curMapId;
				this.map = delegate.mapList[this.map_id];
				this.mapData[this.map_id].options.map = this.map;
				this.mapData[this.map_id].type = type;
				
				//데이터보드 열기
				var sceneInx = $(".sceneBox.on").length;
				if(sceneInx == 1) {
					if(this.gubun == "interactiveMap") {
						$interactiveDataBoard.event.dataBoardOpen();	
					} else if(this.gubun == "bizStatsMap") {
						$bizStatsDataBoard.event.dataBoardOpen();		
					}
				}
				
				//줌레벨이 10이 아닐경우 10으로 변경
				if(this.map.zoom != 10) {
					this.map.setZoom(10);	
				} else {	//줌레벨이 10이면 현재 상태에서 조회
					this.map.markers.clearLayers();
					$publicDataBoard.ui.reqPoi();	
				}
			},
			
			/**
			 * @name         : reqPoi
			 * @description  :	공공데이터 API 요청
			 * @date         : 2015. 11. 19. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			reqPoi : function() {
				//데이터보드 전체 숨기고 공공데이터보드만 열기
				$(".dataBoardDiv").hide();
				$(".publicDataDT").hide();
				$(".publicDataDD").hide();
				$("#publicDataDiv").show();
				
				//유동인구 정보
				if(this.mapData[this.map_id].type == "population") {
					this.updatePopulation();
				} else if(this.mapData[this.map_id].type == "school") {	//학교인구 정보
					this.updateSchool();
				} else if(this.mapData[this.map_id].type == "metro") {	//지하철 승하차
					this.updateMetro();
				} else if(this.mapData[this.map_id].type == "bus") {	//버스 정류장
					this.updateBusStop();
				}
			},
	
			/**
			 * @name         : updatePopulation
			 * @description  :	유동인구 조회
			 * @date         : 2015. 11. 18. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			updatePopulation : function() {
				$("#publicPopulationDiv").show();
				$("#publicPopulationDiv").prev().show();
				//유동인구 요청 API
				this.requestFloatPplninfo();
			},
			
			/**
			 * @name         : updateSchool
			 * @description  :	학교 조회
			 * @date         : 2015. 11. 24. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			updateSchool : function() {
				$("#publicSchoolDiv").show();
				$("#publicSchoolDiv").prev().show();
				//학교정보 요청 API
				this.requestSchoolPplninfo();
			},
			
			/**
			 * @name         : updateMetro
			 * @description  :	지하철 승하차 조회
			 * @date         : 2015. 11. 25. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			updateMetro : function() {
				$("#publicMetroDiv").show();
				$("#publicMetroDiv").prev().show();
				//학교정보 요청 API
				this.requestMetroPplninfo();
			},
			
			/**
			 * @name         : updateBusStop
			 * @description  :	버스정류장 조회
			 * @date         : 2015. 11. 25. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			updateBusStop : function() {
				$("#publicBusStopDiv").show();
				$("#publicBusStopDiv").prev().show();
				//버스정류장 정보 요청 API
				this.requestBusStopinfo();
			},
			
			/**
			 * @name         : listDataClick
			 * @description  :	검색 리스트에서 선택 시
			 * @date         : 2015. 11. 19. 
			 * @author	     : 김성현
			 * @param 		: idx 인덱스
			 * @history 	 :
			 */
			listDataClick : function(idx) {
				var mapData = this.mapData[this.map_id];
				
				//POI 클릭 이벤트
				mapData.options.markerGroup[idx].marker.fire("click");
				
				//POI 위치로 이동 
				var centerX = mapData.options.markerGroup[idx].marker.info.x;
				var centerY = mapData.options.markerGroup[idx].marker.info.y;
				this.map.mapMove([centerX, centerY], this.map.zoom);
			},
			
			/**
			 * @name         : circleInfo
			 * @description  :	서클 그리기
			 * @date         : 2015. 11. 20. 
			 * @author	     : 김성현
			 * @param 		: result 선택 마커정보
			 * @history 	 :
			 */
			circleInfo : function (result) {
				var mapData = this.mapData[this.map_id];
				//기존 서클 삭제
				mapData.options.map.removeMarker(mapData.options.circle);
				
				var centerX = result.target.info.x;
				var centerY = result.target.info.y;
				//원형 반경 그리기
				var circle = sop.circle(sop.utmk(centerX, centerY), mapData.options.radius, {
					color : "white",
					fillColor : "#EAEAEA",
					fillOpacity : 0.2,
					opacity :0.2,
					weight : 0,
					renderer: sop.svg()
				});
				circle.addTo(mapData.options.map.gMap);
				mapData.options.circle = circle;		//현재 서클 메모리에 저장
				
				//임의영역 반경 내 집계구경계 정보 API (geojson)
				this.circleAreaTotInfo();
			},
			
			/**
			 * @name         : circleAreaTotInfo
			 * @description  :	임의영역 반경 내 집계구경계 정보 API (geojson)
			 * @date         : 2015. 11. 20. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			circleAreaTotInfo : function () {
				var mapData = this.mapData[this.map_id];
				var area = "CIRCLE(" + 
										mapData.options.circle._utmk.x + " " + 
										mapData.options.circle._utmk.y + "," + 
										mapData.options.circle.getRadius()+ 
		    						")";
				var sopPortalCircleAreaTotInfoDrawObj = new sop.portal.circleAreaTotInfo.api();
				sopPortalCircleAreaTotInfoDrawObj.addParam("area", area);
				sopPortalCircleAreaTotInfoDrawObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/publicData/circleAreaTotInfo.geojson"
				});
			},
			
			/**
			 * @name         : circleAreaFullInfo
			 * @description  :	임의영역 반경 내 주요 정보 API
			 * @date         : 2015. 11. 24. 
			 * @author	     : 김성현
			 * @param		: tot_list 집계구코드 목록
			 * @history 	 :
			 */
			circleAreaFullInfo : function (tot_list) {
				var sopPortalCircleAreaTotFullDrawObj = new sop.portal.circleAreaFullInfo.api();
				sopPortalCircleAreaTotFullDrawObj.addParam("tot_list", tot_list);
				sopPortalCircleAreaTotFullDrawObj.addParam("bnd_year", bndYear);
				sopPortalCircleAreaTotFullDrawObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/publicData/circleAreaFullInfo.json"
				});
			},
			
			/**
			 * @name         : circleRadiusSliderClick
			 * @description  :	임의영역 반경 슬라이더 선택 시
			 * @date         : 2015. 11. 20. 
			 * @author	     : 김성현
			 * @param		: radius 선택된 반지름
			 * @history 	 :
			 */
			circleRadiusSliderClick : function (radius) {
				var mapData = this.mapData[this.map_id];
				//선택된 마커가 없다면 리턴
				if(mapData.options.result.length == 0) {
					return;
				} else {
					//반지름
					var paramRadius = 0;
					if(radius == 1) {
						paramRadius = 100;
					} else if(radius == 2) {
						paramRadius = 300;
					} else if(radius == 3) {
						paramRadius = 500;
					} else if(radius == 4) {
						paramRadius = 1000;
					}
					mapData.options.radius = paramRadius;	//영역 크기 메모리에 저장
					this.circleInfo(mapData.options.result);
				}
			},
			
			/**
			 * @name         : publicPopulationPrev
			 * @description  :	유동인구 차트 이전 버튼 클릭 시
			 * @date         : 2015. 11. 19. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			publicPopulationPrev : function() {
				var mapData = this.mapData[this.map_id];
				//검색 결과가 없을 경우 리턴
				if(mapData.options.result.length == 0) {
					return;
				}
				//viewIndex가 0보다 클경우 1씩 줄여나간다.
				if(parseInt(mapData.options.viewIndex) > 0) {
					mapData.options.viewIndex = mapData.options.viewIndex - 1;	
				} else {	//0이면 리턴
					return;
				}
				
				this.floatPplnChartDraw(mapData.options.result);
			},
			
			/**
			 * @name         : publicPopulationNext
			 * @description  :	유동인구 차트 다음 버튼 클릭 시
			 * @date         : 2015. 11. 19. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			publicPopulationNext : function() {
				var mapData = this.mapData[this.map_id];
				//검색 결과가 없을 경우 리턴
				if(mapData.options.result.length == 0) {
					return;
				}
				//viewIndex가 전체 페이지보다 작을경우 1씩 늘린다.
				var maxLength = mapData.options.result.target.info.resultList.length;
				if(parseInt(mapData.options.viewIndex) < (maxLength-1)) {
					mapData.options.viewIndex = mapData.options.viewIndex + 1;	
				} else {	//끝페이지면 리턴
					return;
				}
				
				this.floatPplnChartDraw(mapData.options.result);
			},
			
			/**
			 * @name         : publicSchoolPrevNext
			 * @description  :	학교 차트 이전, 다음 버튼 클릭 시
			 * @date         : 2015. 11. 25. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			publicSchoolPrevNext : function() {
				var mapData = this.mapData[this.map_id];
				//검색 결과가 없을 경우 리턴
				if(mapData.options.result.length == 0) {
					return;
				}
				
				if($("#publicSchoolChartDiv01").is(":visible")) {
					$("#publicSchoolChartDiv01").hide();
					$("#publicSchoolChartDiv02").show();
					$("#publicSchoolTitle").html("학교별 평균 학생/교직원 현황");
				} else if($("#publicSchoolChartDiv02").is(":visible")) {
					$("#publicSchoolChartDiv01").show();
					$("#publicSchoolChartDiv02").hide();
					$("#publicSchoolTitle").html("해당학교 학생/교직원 현황");
				}
			},
			
			/**
			 * @name         : publicMetroPrev
			 * @description  :	지하철 승하차 차트 이전 버튼 클릭 시
			 * @date         : 2015. 11. 25. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			publicMetroPrev : function() {
				var mapData = this.mapData[this.map_id];
				if($("#publicMetroChart01").is(":visible")) {		//요일평균 승하차인원 정보
					$("#publicMetroTitle").html("요일평균 / 승하차인원 정보");
					$(".metroChartDiv").hide();
					$("#publicMetroChart03").show();
					this.metroWeekPplnChartDraw(mapData.options.result);
				} else if($("#publicMetroChart02").is(":visible")) {			//일평균 승하차인원 정보
					$("#publicMetroTitle").html("일평균 / 승하차인원 정보");
					$(".metroChartDiv").hide();
					$("#publicMetroChart01").show();
				} else if($("#publicMetroChart03").is(":visible")) {			//월평균 승하차인원 정보
					$("#publicMetroTitle").html("월평균 / 승하차인원 정보");
					$(".metroChartDiv").hide();
					$("#publicMetroChart02").show();
					this.metroMonthPplnChartDraw(mapData.options.result);
				}
			},
			
			/**
			 * @name         : publicMetroNext
			 * @description  :	지하철 승하차 차트 다음 버튼 클릭 시
			 * @date         : 2015. 11. 25. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			publicMetroNext : function() {
				var mapData = this.mapData[this.map_id];
				if($("#publicMetroChart01").is(":visible")) {		//월평균 승하차인원 정보
					$("#publicMetroTitle").html("월평균 / 승하차인원 정보");
					$(".metroChartDiv").hide();
					$("#publicMetroChart02").show();
					this.metroMonthPplnChartDraw(mapData.options.result);
				} else if($("#publicMetroChart02").is(":visible")) {			//요일평균 승하차인원 정보
					$("#publicMetroTitle").html("요일평균 / 승하차인원 정보");
					$(".metroChartDiv").hide();
					$("#publicMetroChart03").show();
					this.metroWeekPplnChartDraw(mapData.options.result);
				} else if($("#publicMetroChart03").is(":visible")) {			//일평균 승하차인원 정보
					$("#publicMetroTitle").html("일평균 / 승하차인원 정보");
					$(".metroChartDiv").hide();
					$("#publicMetroChart01").show();
				}
			},
			
			/**
			 * @name         : requestFloatPplninfo
			 * @description  :	유동인구 요청 API
			 * @date         : 2015. 11. 19. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			requestFloatPplninfo : function () {
				this.mapData[this.map_id].type = "population";
				var bounds = this.map.gMap.getBounds();
				this.mapData[this.map_id].options.mapBounds = bounds;
				var sopPortalFloatPplnPoiDrawObj = new sop.portal.floatPplnPoi.api();
				sopPortalFloatPplnPoiDrawObj.addParam("minx", bounds._southWest.x);
				sopPortalFloatPplnPoiDrawObj.addParam("miny", bounds._southWest.y);
				sopPortalFloatPplnPoiDrawObj.addParam("maxx", bounds._northEast.x);
				sopPortalFloatPplnPoiDrawObj.addParam("maxy", bounds._northEast.y);
				sopPortalFloatPplnPoiDrawObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/bizStats/poietcfloatppln.json",
					options : {
						btntype: "etc",
						api_id : "10013",
						title : "유동인구",
						params : {
							minx : bounds._southWest.x,
							miny : bounds._southWest.y,
							maxx : bounds._northEast.x,
							maxy : bounds._northEast.y
						},
						map : this.map
					}
				});
			},
			
			/**
			 * @name         : floatPplnChartDraw
			 * @description  :	유동인구 차트 및 내용 그리기
			 * @date         : 2015. 11. 19. 
			 * @author	     : 김성현
			 * @param	result 결과값 리스트
			 * @history 	 :
			 */
			floatPplnChartDraw : function (result) {
				var info = result.target.info;
				var resultList = result.target.info.resultList;
				var maleData = new Array();
				var femaleData = new Array();
				
				var idx = this.mapData[this.map_id].options.viewIndex;
				maleData.push(parseInt(resultList[idx].male_agegp_10_cnt));
				maleData.push(parseInt(resultList[idx].male_agegp_20_cnt));
				maleData.push(parseInt(resultList[idx].male_agegp_30_cnt));
				maleData.push(parseInt(resultList[idx].male_agegp_40_cnt));
				maleData.push(parseInt(resultList[idx].male_agegp_50_cnt));
				femaleData.push(parseInt(resultList[idx].fem_agegp_10_cnt));
				femaleData.push(parseInt(resultList[idx].fem_agegp_20_cnt));
				femaleData.push(parseInt(resultList[idx].fem_agegp_30_cnt));
				femaleData.push(parseInt(resultList[idx].fem_agegp_40_cnt));
				femaleData.push(parseInt(resultList[idx].fem_agegp_50_cnt));
				
				var minValue = Math.min.apply(null, maleData);
				var maxValue = Math.max.apply(null, femaleData);
				
				//ex) 2010년 6월 9일 / 12~13시<br />총조사인구 : 341명 / 날씨 : 말음
				var titleHtml = makeYYYYMMDDString(resultList[idx].surv_dt) + " / " + resultList[idx].surv_time + "<br />총조사인구 : " + resultList[idx].fltppltn_sum + "명 / 날씨 : " + resultList[idx].wethr;
				$("#publicPopulationTitle").html(titleHtml);
				
				$("#publicPopulationChart").highcharts({
					chart : {
						type : 'column', width: 500, height: 300
					},
					title: {
			            text: ''
			        },
			        xAxis: {
			            categories: ['10대', '20대', '30대', '40대', '50대']
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: ''
			            }
			        },
			        tooltip: {
			            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
			            shared: true
			        },
			        plotOptions: {
			            column: {
			                stacking: 'percent'
			            }
			        },
			        series: [{
			            name: '여자',
			            data: femaleData
			        }, {
			            name: '남자',
			            data: maleData
			        }]
				});
			},
			
			/**
			 * @name         : requestSchoolPplninfo
			 * @description  :	학교정보 요청 API
			 * @date         : 2015. 11. 24. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			requestSchoolPplninfo : function () {
				this.mapData[this.map_id].type = "school";
				var bounds = this.map.gMap.getBounds();
				this.mapData[this.map_id].options.mapBounds = bounds;
				var sopPortalSchoolPplnPoiDrawObj = new sop.portal.schoolPplnPoi.api();
				sopPortalSchoolPplnPoiDrawObj.addParam("minx", bounds._southWest.x);
				sopPortalSchoolPplnPoiDrawObj.addParam("miny", bounds._southWest.y);
				sopPortalSchoolPplnPoiDrawObj.addParam("maxx", bounds._northEast.x);
				sopPortalSchoolPplnPoiDrawObj.addParam("maxy", bounds._northEast.y);
				sopPortalSchoolPplnPoiDrawObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/bizStats/poietcschoolppln.json",
					options : {
						btntype: "etc",
						api_id : "10015",
						title : "학교인구",
						params : {
							minx : bounds._southWest.x,
							miny : bounds._southWest.y,
							maxx : bounds._northEast.x,
							maxy : bounds._northEast.y
						},
						map : this.map
					}
				});
			},
			
			/**
			 * @name         : sggSchoolAvg
			 * @description  :	시군구 평균 학교정보 요청 API
			 * @date         : 2015. 11. 24. 
			 * @author	     : 김성현
			 * @param		: tot_reg_cd 집계구코드
			 * @param		: elsm 학교구분
			 * @history 	 :
			 */
			sggSchoolAvg : function (tot_reg_cd, elsm) {
				var sopPortalSggSchoolAvgDrawObj = new sop.portal.sggSchoolAvg.api();
				sopPortalSggSchoolAvgDrawObj.addParam("tot_reg_cd", tot_reg_cd);
				sopPortalSggSchoolAvgDrawObj.addParam("elsm", elsm);
				sopPortalSggSchoolAvgDrawObj.addParam("bnd_year", bndYear);
				sopPortalSggSchoolAvgDrawObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/publicData/sggSchoolAvg.json"
				});
			},
			
			/**
			 * @name         : schoolPplnChartDraw
			 * @description  :	학교 차트 및 내용 그리기
			 * @date         : 2015. 11. 24. 
			 * @author	     : 김성현
			 * @param	result 결과값 리스트
			 * @history 	 :
			 */
			schoolPplnChartDraw : function (result) {
				var stuCnt = result.target.info.stdnt_cnt;		//학생수
				var facCnt = result.target.info.tcher_cnt;		//교직원수
				var stuPer = parseInt(stuCnt / (stuCnt + facCnt) * 100);	//학생%
				var facPer = parseInt(facCnt / (stuCnt + facCnt) * 100);		//교직원%
				
				$("#schoolStdtCnt").text(appendCommaToNumber(stuCnt));			//총학생수
				$("#schoolTcherCnt").text(appendCommaToNumber(facCnt));		//총교직원수
				$("#schoolTperS").text((stuCnt/facCnt).toFixed(1));			//교직원 1명당 학생수
				
				$("#publicSchoolChart").highcharts({
					chart : {
						margin : [ 0, 0, 50, 0 ]	
					},
					colors: ['#92D050', '#595959'],
					tooltip: { enabled: false },
    				navigation: { buttonOptions: { enabled: false } }, 
    		        title: {
    		            text: ''
    		        },
		            tooltip: {
		                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		            },
		            plotOptions: {
    		            pie: {
    		                dataLabels: {
    		                    enabled: true,
    		                    distance: -50,
    		                    style: {
    		                        fontWeight: 'bold',
    		                        color: 'white',
    		                        textShadow: '0px 1px 2px black'
    		                    }
    		                },
    		                startAngle: 0,
    		                endAngle: 360,
    		                center: ['50%', '50%'], borderWidth: 0,
    		                showInLegend: true
    		            }
    		        },
    		        series: [{
    			        type: 'pie',
    		            name: '비율',
    		            data: [
    		                ['학생수',  stuPer],
    		                ['교직원',  facPer]
    		            ],
    					dataLabels: {
    						enabled: true, rotation: -45, color: '#333333', align: 'right', x: -4004, y: 20, style: { fontSize: '15px', fontWeight: 'normal' }
    					}
    		        }]
		        });
			},
			
			/**
			 * @name         : requestMetroPplninfo
			 * @description  :	지하철 승하차 요청 API
			 * @date         : 2015. 11. 25. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			requestMetroPplninfo : function () {
				this.mapData[this.map_id].type = "metro";
				var bounds = this.map.gMap.getBounds();
				this.mapData[this.map_id].options.mapBounds = bounds;
				var sopPortalMetroPplnPoiDrawObj = new sop.portal.metroPplnPoi.api();
				sopPortalMetroPplnPoiDrawObj.addParam("minx", bounds._southWest.x);
				sopPortalMetroPplnPoiDrawObj.addParam("miny", bounds._southWest.y);
				sopPortalMetroPplnPoiDrawObj.addParam("maxx", bounds._northEast.x);
				sopPortalMetroPplnPoiDrawObj.addParam("maxy", bounds._northEast.y);
				sopPortalMetroPplnPoiDrawObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/bizStats/poietcmetroppln.json",
					options : {
						btntype: "etc",
						api_id : "10014",
						title : "지하철승하차인구",
						params : {
							minx : bounds._southWest.x,
							miny : bounds._southWest.y,
							maxx : bounds._northEast.x,
							maxy : bounds._northEast.y
						},
						map : this.map
					}
				});
			},
			
			/**
			 * @name         : metroDayPplnChartDraw
			 * @description  :	지하철 승하차 차트 및 내용 그리기 (일평균)
			 * @date         : 2015. 11. 25. 
			 * @author	     : 김성현
			 * @param	result 결과값 리스트
			 * @history 	 :
			 */
			metroDayPplnChartDraw : function (result) {
				$(".metroChartDiv").hide();
				$("#publicMetroChart01").show();
				
				//타이틀
				$("#publicMetroTitle").html("일평균 / 승하차인원 정보");
				
				//승차
				var onResult = result.target.info.onResult;	
				var onList = new Array();
				onList.push(parseInt(onResult.hour1_psn_cnt), parseInt(onResult.hour2_psn_cnt), parseInt(onResult.hour3_psn_cnt), parseInt(onResult.hour4_psn_cnt));
				onList.push(parseInt(onResult.hour5_psn_cnt), parseInt(onResult.hour6_psn_cnt), parseInt(onResult.hour7_psn_cnt), parseInt(onResult.hour8_psn_cnt));
				onList.push(parseInt(onResult.hour9_psn_cnt), parseInt(onResult.hour10_psn_cnt), parseInt(onResult.hour11_psn_cnt), parseInt(onResult.hour12_psn_cnt));
				onList.push(parseInt(onResult.hour13_psn_cnt), parseInt(onResult.hour14_psn_cnt), parseInt(onResult.hour15_psn_cnt), parseInt(onResult.hour16_psn_cnt));
				onList.push(parseInt(onResult.hour17_psn_cnt), parseInt(onResult.hour18_psn_cnt), parseInt(onResult.hour19_psn_cnt), parseInt(onResult.hour20_psn_cnt));
				onList.push(parseInt(onResult.hour21_psn_cnt), parseInt(onResult.hour22_psn_cnt), parseInt(onResult.hour23_psn_cnt), parseInt(onResult.hour24_psn_cnt));
				
				//하차
				var offResult = result.target.info.offResult;
				var offList = new Array();
				offList.push(parseInt(offResult.hour1_psn_cnt), parseInt(offResult.hour2_psn_cnt), parseInt(offResult.hour3_psn_cnt), parseInt(offResult.hour4_psn_cnt));
				offList.push(parseInt(offResult.hour5_psn_cnt), parseInt(offResult.hour6_psn_cnt), parseInt(offResult.hour7_psn_cnt), parseInt(offResult.hour8_psn_cnt));
				offList.push(parseInt(offResult.hour9_psn_cnt), parseInt(offResult.hour10_psn_cnt), parseInt(offResult.hour11_psn_cnt), parseInt(offResult.hour12_psn_cnt));
				offList.push(parseInt(offResult.hour13_psn_cnt), parseInt(offResult.hour14_psn_cnt), parseInt(offResult.hour15_psn_cnt), parseInt(offResult.hour16_psn_cnt));
				offList.push(parseInt(offResult.hour17_psn_cnt), parseInt(offResult.hour18_psn_cnt), parseInt(offResult.hour19_psn_cnt), parseInt(offResult.hour20_psn_cnt));
				offList.push(parseInt(offResult.hour21_psn_cnt), parseInt(offResult.hour22_psn_cnt), parseInt(offResult.hour23_psn_cnt), parseInt(offResult.hour24_psn_cnt));
				
				$("#publicMetroChart01").highcharts({
			        chart: {
			        	backgroundColor: 'white', width: 500, height: 300
			        },
			        title: {
			        	text : ''
			        },
			        xAxis: {
			            categories: ['00~01', '01~02', '02~03', '03~04', '04~05', '05~06', '06~07', '07~08', '08~09', '09~10', 
			                         	'10~11', '11~12', '12~13', '13~14', '14~15', '15~16', '16~17', '17~18', '18~19', '19~20',
			                         	'20~21', '21~22', '22~23', '23~24'],
			            labels: {
			                rotation: -45,
			                style: {
			                	fontSize: '9px;'
			                }
			        	}
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: ''
			            }
			        },
			        tooltip: {
			        	pointFormat: '{point.y}명'
			        },
			        plotOptions: {
			            column: {
			                borderWidth: 0
			            }
			        },
			        series:[{
			        	name : '승차인원',
			        	data : onList,
			        	color : '#5CD1E5'
			        }, {
			        	name : '하차인원',
			        	data : offList,
			        	color : '#595959'
			        }]
			    });
			},
			
			/**
			 * @name         : metroMonthPplnChartDraw
			 * @description  :	지하철 승하차 차트 및 내용 그리기 (월평균)
			 * @date         : 2015. 11. 25. 
			 * @author	     : 김성현
			 * @param	result 결과값 리스트
			 * @history 	 :
			 */
			metroMonthPplnChartDraw : function(result) {
				var sopPortalMetroMonthPplnDrawObj = new sop.portal.metroMonthPplnChart.api();
				sopPortalMetroMonthPplnDrawObj.addParam("x", result.target.info.x);
				sopPortalMetroMonthPplnDrawObj.addParam("y", result.target.info.y);
				sopPortalMetroMonthPplnDrawObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/publicData/metroMonthPpln.json"
				});
			},
			
			/**
			 * @name         : metroWeekPplnChartDraw
			 * @description  :	지하철 승하차 차트 및 내용 그리기 (요일평균)
			 * @date         : 2015. 11. 25. 
			 * @author	     : 김성현
			 * @param	result 결과값 리스트
			 * @history 	 :
			 */
			metroWeekPplnChartDraw : function(result) {
				var sopPortalMetroWeekPplnDrawObj = new sop.portal.metroWeekPplnChart.api();
				sopPortalMetroWeekPplnDrawObj.addParam("x", result.target.info.x);
				sopPortalMetroWeekPplnDrawObj.addParam("y", result.target.info.y);
				sopPortalMetroWeekPplnDrawObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/publicData/metroWeekPpln.json"
				});
			},
			
			/**
			 * @name         : requestBusStopinfo
			 * @description  :	버스정류장 요청 API
			 * @date         : 2015. 11. 25. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			requestBusStopinfo : function () {
				this.mapData[this.map_id].type = "busStop";
				var bounds = this.map.gMap.getBounds();
				this.mapData[this.map_id].options.mapBounds = bounds;
				var sopPortalBusStopPoiDrawObj = new sop.portal.busStopPoi.api();
				sopPortalBusStopPoiDrawObj.addParam("minx", bounds._southWest.x);
				sopPortalBusStopPoiDrawObj.addParam("miny", bounds._southWest.y);
				sopPortalBusStopPoiDrawObj.addParam("maxx", bounds._northEast.x);
				sopPortalBusStopPoiDrawObj.addParam("maxy", bounds._northEast.y);
				sopPortalBusStopPoiDrawObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/bizStats/poietcbusstop.json",
					options : {
						btntype: "etc",
						api_id : "10012",
						title : "버스정류장",
						params : {
							minx : bounds._southWest.x,
							miny : bounds._southWest.y,
							maxx : bounds._northEast.x,
							maxy : bounds._northEast.y
						},
						map : this.map
					}
				});
			},
			
			/**
			 * @name         : remove
			 * @description  :	공공데이터 삭제
			 * @date         : 2015. 11. 24. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			remove : function() {
				//대화형통계지도 데이터보드 보이기
				$(".dataBoardDiv").hide();
				$("#viewDataBoard").show();
				
				//초기화
				this.reset();
			},
			
			/**
			 * @name         : reset
			 * @description  :	공공데이터 초기화
			 * @date         : 2015. 11. 19. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			reset : function() {
				var mapData = this.mapData[this.map_id];
				
				$("#publicDataList").html("");		//리스트 지움
				$("#publicDataCnt").html("0");		//검색된 개수
				$("#publicPopulationTitle").html("");		//차트 타이틀 지움
				$("#publicPopulationChart").empty();	//차트 초기화
				
				$("#publicDataSlide").slider("value", 1);	//반경영역 50미터
				
				//서클이 있으면 삭제
				if(mapData.options.circle != null) {
					mapData.options.circleGeojson.remove();
					mapData.options.circle.remove();	
				}
				//마커 전체 삭제
				for(var i = 0; i < mapData.options.markerGroup.length; i ++) {
					this.map.markers.removeLayer(mapData.options.markerGroup[i].marker);
				}
				
				var options = {
						map : null,
						viewIndex : 0,				//현재 보고 있는 Index (페이징)
						markerGroup : [],			//POI 그룹
						result : [],					//POI 상세결과 리스트
						circle : null,				//임의영역 반경 서클
						circleGeojson : null,	//임의영역 반경 경계
						radius : 100,				//서클 크기
						mapBounds : null		//지도 바운더리
				}
				this.mapData[this.map_id].options = options;
				this.mapData[this.map_id].type = "";
			}
	};

	$publicDataBoard.event = {
			/**
			 * 
			 * @name         : setUIEvent
			 * @description  : 데이터보드 UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date         : 2015. 11. 18. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */	
			setUIEvent : function() {
				var body = $("body");
				
				//임의반경영역 설정
				$("#publicDataSlide").slider({ 
			    	min: 1,
			        max: 4,
			        value : 1,
			        slide: function( event, ui ) {
			        	//슬라이더 선택 시
			        	$publicDataBoard.ui.circleRadiusSliderClick(ui.value);
			          }
			    });
			}
	};
	
	/** ********* 임의영역 반경 내 집계구경계 정보 Start ********* */
	(function () {
		$class("sop.portal.circleAreaTotInfo.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var publicDataBoard = $publicDataBoard.ui.mapData[$publicDataBoard.ui.map_id];
				if (res.errCd == "0") {
					var geojson = sop.geoJson(res);
					//기존 경계 삭제
					if(publicDataBoard.options.circleGeojson != null) {
						publicDataBoard.options.circleGeojson.remove();
					}
					//경계 추가
					publicDataBoard.options.circleGeojson = geojson;
					geojson.addTo(publicDataBoard.options.map.gMap);
					
					//집계구 코드만 꺼내온다.
					var totRegCdList = [];
					for(var i = 0; i < res.features.length; i ++) {
						totRegCdList.push(res.features[i].properties.tot_reg_cd);
					}	//영역 내 정보 가져오기
					$publicDataBoard.ui.circleAreaFullInfo(totRegCdList);
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* 임의영역 반경 내 집계구경계 정보 End ********* */
	
	/** ********* 임의영역 반경 내 주요 정보 Start ********* */
	(function () {
		$class("sop.portal.circleAreaFullInfo.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				if (res.errCd == "0") {
					var totalInfo = res.result.totalInfo;
					var themeInfo = res.result.themeInfo;
				
					$("#circlePeople").text(appendCommaToNumber(totalInfo.ppltn_cnt));		//반경 내 인구
					$("#circleFamily").text(appendCommaToNumber(totalInfo.family_cnt));		//반경 내 가구
					$("#circleHouse").text(appendCommaToNumber(totalInfo.resid_cnt));		//반경 내 주택
					$("#circleCorp").text(appendCommaToNumber(totalInfo.corp_cnt));			//반경 내 사업체
					
					if(themeInfo != null) {
						//주요 사업체 테마 차트
						$("#publicDataThemeChart").highcharts({
							chart : {
								type : 'column'
							},
							title : {
								text : '반경 내 주요 시설물 수'
							},
							subtitle : {
								text : ''
							},
							xAxis : {
								type : 'category',
								labels : {
									rotation : -45,
									style : {
										fontSize : '11px'
									}
								}
							},
							yAxis : {
								min : 0,
								title : {
									text : ''
								}
							},
							legend : {
								enabled : false
							},
							tooltip : {
								pointFormat : '<b>{point.y}개</b>'
							},
							series : [ {
								name : 'Population',
								data : [ 
								         	[ '교육시설', themeInfo.theme_sum_01 ],
								         	[ '공공기관', themeInfo.theme_sum_02 ],
								         	[ '금융시설', themeInfo.theme_sum_03 ],
								         	[ '의료시설', themeInfo.theme_sum_04 ],
								         	[ '대중교통', themeInfo.theme_sum_05 ],
								         	[ '방범/방재', themeInfo.theme_sum_06 ],
								         	[ '백화점/중대형마트', themeInfo.theme_sum_07 ],
								         	[ '편의점', themeInfo.theme_sum_08 ],
								         	[ '극장/영화관', themeInfo.theme_sum_09 ] 
								         ],
								dataLabels : {
									enabled : false
								}
							} ]
						});
						
					} else {
						$("#publicDataThemeChart").empty();
					}
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* 임의영역 반경 내 주요 정보 End ********* */
	
	/** ********* 유동인구 POI Start ********* */
	(function () {
		$class("sop.portal.floatPplnPoi.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var map = options.map;
				var result = res.result;
				var publicDataBoard = $publicDataBoard.ui.mapData[$publicDataBoard.ui.map_id];
				
				//마커그룹 초기화
				publicDataBoard.options.markerGroup = [];
				
				if (res.errCd == "0") {
					var html = "";
					//지도영역 내 조회된 정보 목록
					for(var i = 0; i < result.length; i ++) {
						html += "<li><a href='javascript:$publicDataBoard.ui.listDataClick("+i+");'>"+(i+1)+". "+result[i][0].surv_region+" 유동인구</a></li>";
					}
					$("#publicDataList").html(html);
					
					//검색된 개수
					$("#publicDataCnt").html(result.length);
					
					//해당 POI 통계정보
					for(var i = 0; i < result.length; i ++) {
						for(var x = 0; x < result[i].length; x ++) {
							if((x+1) == result[i].length) {
								var _markerIcon = sop.icon({
									iconUrl: '/img/idm/marker-icon.png',
									shadowUrl: '/img/marker/theme_shadow.png',
									iconAnchor: [ 12.5, 40 ],
									iconSize: [ 25, 40 ],
									infoWindowAnchor: [1, -34]
								});
								var _marker = sop.marker([ result[i][x].x, result[i][x].y ], {
									icon: _markerIcon
								});
								
								_marker.info = result[i][x];
								_marker.addTo(map.markers);
								_marker.info["resultList"] = result[i];
								
								var infoHtml = "";
								infoHtml += "<table style='text-align:left;width:300px;white-space: nowrap;word-break:break-all;padding:5px;'>";
								infoHtml += "	<tr>";
								infoHtml += "		<th><strong>" + result[i][x].surv_region + " 유동인구</strong></th>";
								infoHtml += "	</tr>";
								infoHtml += "<table>";
								_marker.bindInfoWindow(infoHtml,{autoPan: false});
								
								//마커 클릭 시
								_marker.on("click", function(result) {
									//서클 생성
									$publicDataBoard.ui.circleInfo(result);
									//인포윈도우 열기
									_marker.openInfoWindow();
									//페이징 0으로 초기화
									publicDataBoard.options.viewIndex = 0;
									//결과 리스트 저장
									publicDataBoard.options.result = result;
									//차트 그리기
									$publicDataBoard.ui.floatPplnChartDraw(result);
								});
								
								publicDataBoard.options.markerGroup.push({
									"idx" : i,
									"marker" : _marker
								});
							}
						}
					}

					//API 로그
					setTimeout(apiLogWrite("B0", options), 2000);
				} else {
					//초기화
//					$publicDataBoard.ui.reset();
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* 유동인구 POI End ********* */
	
	/** ********* 학교인구 POI Start ********* */
	(function () {
		$class("sop.portal.schoolPplnPoi.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var map = options.map;
				var result = res.result;
				var publicDataBoard = $publicDataBoard.ui.mapData[$publicDataBoard.ui.map_id];
				
				//마커그룹 초기화
				publicDataBoard.options.markerGroup = [];
				
				if (res.errCd == "0") {
					var html = "";
					//지도영역 내 조회된 정보 목록
					for(var i = 0; i < result.length; i ++) {
						html += "<li><a href='javascript:$publicDataBoard.ui.listDataClick("+i+");'>"+(i+1)+". "+result[i].school_nm+"</a></li>";
					}
					$("#publicDataList").html(html);
					
					//검색된 개수
					$("#publicDataCnt").html(result.length);
					
					//해당 POI 통계정보
					for(var i = 0; i < result.length; i ++) {
						var _markerIcon = sop.icon({
							iconUrl: '/img/marker/marker/70_01.png',
							shadowUrl: '/img/marker/theme_shadow.png',
							iconAnchor: [ 12.5, 40 ],
							iconSize: [ 25, 40 ],
							infoWindowAnchor: [1, -34]
						});
						var _marker = sop.marker([ result[i].x, result[i].y ], {
							icon: _markerIcon
						});
						_marker.info = result[i];
						_marker.addTo(map.markers);
						_marker.info["resultList"] = result[i];
						
						var infoHtml = "";
						infoHtml += "<table style='text-align:left;width:300px;white-space: nowrap;word-break:break-all;padding:5px;'>";
						infoHtml += "	<tr>";
						infoHtml += "		<th><strong>" + result[i].school_nm + "</strong></th>";
						infoHtml += "	</tr>";
						infoHtml += "<table>";
						_marker.bindInfoWindow(infoHtml,{autoPan: false});
						
						//마커 클릭 시
						_marker.on("click", function(result) {
							//서클 생성
							$publicDataBoard.ui.circleInfo(result);
							//인포윈도우 열기
							_marker.openInfoWindow();
							//결과 리스트 저장
							publicDataBoard.options.result = result;
							//차트 그리기
							$publicDataBoard.ui.schoolPplnChartDraw(result);
							//시군구 평균 학교정보 요청 API
							$publicDataBoard.ui.sggSchoolAvg(result.target.info.tot_reg_cd, result.target.info.elsm);
						});
						
						publicDataBoard.options.markerGroup.push({
							"idx" : i,
							"marker" : _marker
						});
					}
					
					//API 로그
					setTimeout(apiLogWrite("B0", options), 2000);
				} else {
					//초기화
//					$publicDataBoard.ui.reset();
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* 학교인구 POI End ********* */
	
	/** ********* 시군구 평균 학생/교사 정보 Start ********* */
	$class("sop.portal.sggSchoolAvg.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			var sggAvg = res.result.sggAvg;
			var sggGroupAvg = res.result.sggGroupAvg;
			
			if(res.errCd == "0") {
				$("#sggNmSchool").text(sggAvg.sgg_nm + " " + sggAvg.elsm);		//시군구명 + 학교구분
				$("#schoolStdtAvg").text(sggAvg.stdnt_cnt);		//총학생수 평균
				$("#schoolTcherAvg").text(sggAvg.tcher_cnt);		//총교직원수 평균
				
				var xAxisCat = [];	//X축 카테고리
				var stdntList = [];	//학생 수
				var tcherList = [];	//교직원 수
				for(var i = 0; i < sggGroupAvg.length; i ++) {
					xAxisCat.push(sggGroupAvg[i].elsm);
					stdntList.push(parseInt(sggGroupAvg[i].stdnt_cnt));
					tcherList.push(parseInt(sggGroupAvg[i].tcher_cnt));
				}
				
				//학교별 평균 학생/교직원 현황
				$("#publicSchoolGroupChart").highcharts({
					chart : {
						type : 'column', width: 500, height: 300
					},
					colors: ['#92D050', '#595959'],
					title: {
			            text: ''
			        },
			        xAxis: {
			            categories: xAxisCat,
			            labels : { 
							rotation : -45
						}
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: ''
			            }
			        },
			        tooltip: {
			            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
			            shared: true
			        },
			        plotOptions: {
			            column: {
			                stacking: 'percent'
			            }
			        },
			        series: [{
			            name: '학생',
			            data: stdntList
			        }, {
			            name: '교직원',
			            data: tcherList
			        }]
				});
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 시군구 평균 학생/교사 정보 End ********* */
	
	/** ********* 지하철승하차인구 (일평균) POI Start ********* */
	$class("sop.portal.metroPplnPoi.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			var map = options.map;
			var result = res.result;
			var publicDataBoard = $publicDataBoard.ui.mapData[$publicDataBoard.ui.map_id];
			//마커그룹 초기화
			publicDataBoard.options.markerGroup = [];
			
			if (res.errCd == "0") {
				var html = "";
				//지도영역 내 조회된 정보 목록
				for(var i = 0; i < result.length; i ++) {
					html += "<li><a href='javascript:$publicDataBoard.ui.listDataClick("+i+");'>"+(i+1)+". "+result[i][0].station_nm+"</a></li>";
				}
				$("#publicDataList").html(html);
				
				//검색된 개수
				$("#publicDataCnt").html(result.length);
				
				//해당 POI 통계정보
				for(var i = 0; i < result.length; i ++) {
					var _markerIcon = sop.icon({
						iconUrl: '/img/marker/marker/30_01.png',
						shadowUrl: '/img/marker/theme_shadow.png',
						iconAnchor: [ 12.5, 40 ],
						iconSize: [ 25, 40 ],
						infoWindowAnchor: [1, -34]
					});
					var _marker = sop.marker([ result[i][0].x, result[i][0].y ], {
						icon: _markerIcon
					});
					_marker.info = result[i][0];
					_marker.addTo(map.markers);
					_marker.info["onResult"] = result[i][0];
					_marker.info["offResult"] = result[i][1];
					
					var infoHtml = "";
					infoHtml += "<table style='text-align:left;width:100px;white-space: nowrap;word-break:break-all;padding:5px;'>";
					infoHtml += "	<tr>";
					infoHtml += "		<th><strong>" + result[i][0].station_nm + "</strong></th>";
					infoHtml += "	</tr>";
					infoHtml += "<table>";
					_marker.bindInfoWindow(infoHtml,{autoPan: false});
					
					//마커 클릭 시
					_marker.on("click", function(result) {
						//서클 생성
						$publicDataBoard.ui.circleInfo(result);
						//인포윈도우 열기
						_marker.openInfoWindow();
						//결과 리스트 저장
						publicDataBoard.options.result = result;
						//차트 그리기
						$publicDataBoard.ui.metroDayPplnChartDraw(result);
					});
					
					publicDataBoard.options.markerGroup.push({
						"idx" : i,
						"marker" : _marker
					});
				}
				//API 로그
				setTimeout(apiLogWrite("B0", options), 2000);
			} else {
				//초기화
//				$publicDataBoard.ui.reset();
			}
		},
		onFail : function (status) {
		}
	});
	/** ********* 지하철승하차인구 (일평균) POI End ********* */
	
	/** ********* 지하철승하차인구 차트 (월평균) Start ********* */
	$class("sop.portal.metroMonthPplnChart.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			var result = res.result;
			if(res.errCd == "0") {
				//승차
				var onList = new Array();
				for(var i = 0; i < result.monthOnList.length; i ++) {
					onList.push(parseInt(result.monthOnList[i].hour_psn_avg));
				}
				//하차
				var offList = new Array();
				for(var i = 0; i < result.monthOffList.length; i ++) {
					offList.push(parseInt(result.monthOffList[i].hour_psn_avg));
				}
				
				$("#publicMetroChart02").highcharts({
			        chart: {
			        	backgroundColor: 'white', width: 500, height: 300
			        },
			        title: {
			        	text : ''
			        },
			        xAxis: {
			            categories: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
			            labels: {
			                style: {
			                	fontSize: '9px;'
			                }
			        	}
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: ''
			            }
			        },
			        tooltip: {
			        	pointFormat: '{point.y}명'
			        },
			        plotOptions: {
			            column: {
			                borderWidth: 0
			            }
			        },
			        series:[{
			        	name : '승차인원',
			        	data : onList,
			        	color : '#5CD1E5'
			        }, {
			        	name : '하차인원',
			        	data : offList,
			        	color : '#595959'
			        }]
			    });
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 지하철승하차인구 차트 (월평균) End ********* */
	
	/** ********* 지하철승하차인구 차트 (요일 평균) Start ********* */
	$class("sop.portal.metroWeekPplnChart.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			var result = res.result;
			if(res.errCd == "0") {
				//승차
				var onList = new Array();
				for(var i = 0; i < result.weekOnList.length; i ++) {
					onList.push(parseInt(result.weekOnList[i].hour_psn_avg));
				}
				//하차
				var offList = new Array();
				for(var i = 0; i < result.weekOffList.length; i ++) {
					offList.push(parseInt(result.weekOffList[i].hour_psn_avg));
				}
				
				$("#publicMetroChart03").highcharts({
			        chart: {
			        	backgroundColor: 'white', width: 500, height: 300
			        },
			        title: {
			        	text : ''
			        },
			        xAxis: {
			            categories: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
			            labels: {
			                style: {
			                	fontSize: '9px;'
			                }
			        	}
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: ''
			            }
			        },
			        tooltip: {
			        	pointFormat: '{point.y}명'
			        },
			        plotOptions: {
			            column: {
			                borderWidth: 0
			            }
			        },
			        series:[{
			        	name : '승차인원',
			        	data : onList,
			        	color : '#5CD1E5'
			        }, {
			        	name : '하차인원',
			        	data : offList,
			        	color : '#595959'
			        }]
			    });
			}
		},
		onFail : function(status) {
		}
	});
	/** ********* 지하철승하차인구 차트 (요일 평균) End ********* */
	
	/** ********* 버스정류장 POI Start ********* */
	$class("sop.portal.busStopPoi.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			var map = options.map;
			var result = res.result;
			var publicDataBoard = $publicDataBoard.ui.mapData[$publicDataBoard.ui.map_id];
			//마커그룹 초기화
			publicDataBoard.options.markerGroup = [];
			console.log(res);
			if (res.errCd == "0") {
				var html = "";
				//지도영역 내 조회된 정보 목록
				for(var i = 0; i < result.length; i ++) {
					html += "<li><a href='javascript:$publicDataBoard.ui.listDataClick("+i+");'>"+(i+1)+". "+result[i].busstop_nm+"</a></li>";
				}
				$("#publicDataList").html(html);
				
				//검색된 개수
				$("#publicDataCnt").html(result.length);
				
				//해당 POI 통계정보
				for(var i = 0; i < result.length; i ++) {
					var _markerIcon = sop.icon({
						iconUrl: '/img/marker/marker/30_02.png',
						shadowUrl: '/img/marker/theme_shadow.png',
						iconAnchor: [ 12.5, 40 ],
						iconSize: [ 25, 40 ],
						infoWindowAnchor: [1, -34]
					});
					var _marker = sop.marker([ result[i].x, result[i].y ], {
						icon: _markerIcon
					});
					_marker.info = result[i];
					_marker.addTo(map.markers);
					
					var infoHtml = "";
					infoHtml += "<table style='text-align:left;width:100px;white-space: nowrap;word-break:break-all;padding:5px;'>";
					infoHtml += "	<tr>";
					infoHtml += "		<th><strong>" + result[i].busstop_nm + "</strong></th>";
					infoHtml += "	</tr>";
					infoHtml += "<table>";
					_marker.bindInfoWindow(infoHtml,{autoPan: false});
					
					//마커 클릭 시
					_marker.on("click", function(result) {
						//서클 생성
						$publicDataBoard.ui.circleInfo(result);
						//인포윈도우 열기
						_marker.openInfoWindow();
						//결과 리스트 저장
						publicDataBoard.options.result = result;
					});
					
					publicDataBoard.options.markerGroup.push({
						"idx" : i,
						"marker" : _marker
					});
				}
				//API 로그
				setTimeout(apiLogWrite("B0", options), 2000);
			} else {
				//초기화
//				$publicDataBoard.ui.reset();
			}
		},
		onFail : function (status) {
		}
	});
	/** ********* 버스정류장 POI End ********* */
}(window, document));