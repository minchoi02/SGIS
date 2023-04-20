var bndYear = "2019";

(function(W, D) {
	
	W.$todayStatusMap = W.$todayStatusMap || {};

	// 페이지 로드 이벤트
	$(document).ready(function() {

		//20191121 leekh swipe 문제로 인해 selectbox 작동안해서 버튼 이벤트를 붙임
		$("#todayStatusDetailCloseBtn").click(function() {
				$todayStatusMap.ui.todayStatusDetailPopupToggle(false);
				
				var adm_cd = $("#todayStatusSido").val()+$("#todayStatusSgg").val();
				$todayStatusMap.ui.todayStatus(adm_cd);
				
		});


		$todayStatusMap.event.setMapSize();
		$todayStatusMap.ui.createMap("map");
		$todayStatusMap.event.setUIEvent();
		
		$todayStatusMap.ui.todayStatusSidoCd();	// 시도코드 조회
		$todayStatusMap.ui.todayStatusSggCd('99');	// 시군구코드 조회
		$todayStatusMap.ui.todayStatus('99');	// 오늘의 구인현황 초기 조회
		$("#todayStatusSgg").hide(); 	// 화면 첫 로딩시 시군구 버튼 숨김
		
		//2019-09-17 [김남민] (12) 오늘의 전체 일지리현황 팝업 수정. START
		//2019-12-26 [김남민] 모바일 > 일자리 맵 > 모바일 홈페이지 [오늘 하루 다시 보지 않기] 추가 START
		//오늘의 전체 일자리현황 팝업
		if(common_get_cookie("myNeighberhoodJobTodayStatusPopup_no_today_yn") != "Y") {
			$todayStatusMap.ui.myNeighberhoodJobTodayStatusPopupSelect();
		}
		//2019-12-26 [김남민] 모바일 > 일자리 맵 > 모바일 홈페이지 [오늘 하루 다시 보지 않기] 추가 END
		//2019-09-17 [김남민] (12) 오늘의 전체 일지리현황 팝업 수정. END
	});

	// 윈도우 크기 변경시 윈도우 맞춤.
	$(window).resize(function() {
		setTimeout(function() {
			$todayStatusMap.event.setMapSize();
		}, 100);
	});
	// 가로세로 모드 변경시 윈도우 맞춤.
	$(window).on("orientationchange", function() {
		setTimeout(function() {
			$todayStatusMap.event.setMapSize();
		}, 100);
	});

	// 페이지 UI 변수 및 함수 선언
	$todayStatusMap.ui = {
		map : null,
		todayStatusList : [],
		map_coor_x : "",	// map x 좌표
		map_coor_y : "",	// map y 좌표
		searchAdm_cd : "",
		weekDataList : [],
		
		/** 2019.10.02[한광희] 오늘의 구인현황 상세현황 속도 개선을 위한 변수 선언. START */
		tempAdmCd : "",
		/** 2019.10.02[한광희] 오늘의 구인현황 상세현황 속도 개선을 위한 변수 선언. END */
		
		/** 
		 * @name : todayStatusSidoCd
		 * @description : 시도코드 조회
		 * @date : 2019. 07. 04.
		 * @author : 한광희
		 * @history :
		 */
		todayStatusSidoCd : function(){
			$.ajax({
				type: "post",
				url : contextPath + "/m2019/workroad/getSidoCd.json",
				dataType: 'json',
				data: {sido_cd:"99"},
			    success: function(res){
			    	
			    	if(res.errCd == 0){
			    		var resultList = res.result.resultList;
			    		
			    		for(var i = 0; i < resultList.length; i++){
			    			// 오늘의 구인현황 시도 값 셋팅
			    			$("#todayStatusSido").append("<option value=\"" + resultList[i].sido_cd + "\" data-coor-x=\""+ resultList[i].x_coor + "\" data-coor-y=\"" + resultList[i].y_coor + "\">" +resultList[i].sido_nm + "</option>");
			    			// 오늘의 구인현황 상세 시도 값 셋팅 
			    			$("#todayStatusDetailSidoCd").append("<option value=\"" + resultList[i].sido_cd + "\" data-coor-x=\""+ resultList[i].x_coor + "\" data-coor-y=\"" + resultList[i].y_coor + "\">" +resultList[i].sido_nm + "</option>");
			    		}
			    	} else {
						messageAlert.open('failed!');
					}
				} ,
				error:function(err) {
					messageAlert.open(err.responseText);
				}
			});
		},
		
		/** 
		 * @name : todayStatusSggCd
		 * @description : 시군구코드 조회
		 * @date : 2019. 07. 08.
		 * @author : 한광희
		 * @history :
		 */
		todayStatusSggCd : function(adm_cd){
			$("select[id='todayStatusSgg'] option").remove();
			$("select[id='todayStatusDetailSggCd'] option").remove();
			
			var coorX = $("#todayStatusSido option:selected").data("coor-x");
			var coorY = $("#todayStatusSido option:selected").data("coor-y");
    		$("#todayStatusSgg").append("<option value=\"" + "999" + "\" data-coor-x=\""+ coorX + "\" data-coor-y=\"" + coorY + "\">" +"전체" + "</option>");
    		$("#todayStatusDetailSggCd").append("<option value=\"" + "999" + "\" data-coor-x=\""+ coorX + "\" data-coor-y=\"" + coorY + "\">" +"전체" + "</option>");
			
			$.ajax({
				type: "post",
				url : contextPath + "/m2019/workroad/getSggCd.json",
				dataType: 'json',
				data: {sido_cd:adm_cd,bnd_year:bndYear},
			    success: function(res){
			    	if(res.errCd == 0){
			    		var resultList = res.result.resultList;
			    		
			    		for(var i = 0; i < resultList.length; i++){
			    			// 오늘의 구인현황 시군구 값 셋팅
			    			$("#todayStatusSgg").append("<option value=\"" + resultList[i].sgg_cd + "\" data-coor-x=\""+ resultList[i].x_coor + "\" data-coor-y=\"" + resultList[i].y_coor + "\">" +resultList[i].sgg_nm + "</option>");
			    			// 오늘의 구인현황 상세 시군구 값 셋팅
			    			$("#todayStatusDetailSggCd").append("<option value=\"" + resultList[i].sgg_cd + "\" data-coor-x=\""+ resultList[i].x_coor + "\" data-coor-y=\"" + resultList[i].y_coor + "\">" +resultList[i].sgg_nm + "</option>");
			    		}
			    	} else {
						messageAlert.open('failed!');
					}
				} ,
				error:function(err) {
					messageAlert.open(err.responseText);
				}
			});
		},
		
		/** 2019.10.01[한광희] 주석 추가. START */
		/** 
		 * @name : todayStatus
		 * @description : 오늘의 구인현황 조회
		 * @date : 2019. 07. 08.
		 * @author : 한광희
		 * @history :
		 */
		/** 2019.10.01[한광희] 주석 추가. END */
		todayStatus : function(adm_cd){
			var dataParams = {};
			var map_adm_cd = ""; 
			
			switch(adm_cd.length){
				case 2:
					dataParams.sido_cd = adm_cd;
					break;
				case 5:
					dataParams.sido_cd = adm_cd.substring(0,2);
					dataParams.sgg_cd = adm_cd.substring(2,5);
					break;
				case 7:
					break;
			}
			/** 2019.10.02[한광희] 로딩바 추가.START */
			common_loading(true); // 로딩바 표시
			/** 2019.10.02[한광희] 로딩바 추가.END */
			$.ajax({
				type: "POST",
				url : contextPath + "/m2019/workroad/getTodayStatus.json",
				dataType: 'json',
				async: false,
				data: dataParams,
			    success: function(res){
			    	if(res.errCd == 0){
			    		$todayStatusMap.ui.todayStatusList = res.result.resultList;
			    		
			    		if(res.result.params.sido_cd != '99'){
			    			if(res.result.params.sgg_cd != undefined && res.result.params.sgg_cd != '999'){
			    				map_adm_cd = res.result.params.sido_cd + res.result.params.sgg_cd;
			    			} else {
			    				map_adm_cd = res.result.params.sido_cd;
			    			}
			    		} else {
			    			map_adm_cd = '00';
			    		}

			    		// 가져온 결과로 색지도 표현 START
			    		var option = {"showData":"right_data_val","showDataName":"업체","unit":"업체","adm_cd":map_adm_cd,"setStatsMapCensusData":true,"curPolygonCode":0};
						var data = $todayStatusMap.ui.todayStatusList;
						var parameter = {"year":"2016","bnd_year":bndYear};
						$todayStatusMap.ui.map.setStatsData(option, data, parameter);
			    		// 가져온 결과로 색지도 표현 END	
						
						$todayStatusMap.ui.todayStatusMapMove(map_adm_cd);	// 선택된 지역으로 map 이동
						
						/** 오늘의 구인현황 상세내역 팝업 START */
						var resultDetailList = res.result.resultDetailList;
						var today = resultDetailList[0].reg_dt;
						var lv_all_corp_cnt = resultDetailList[0].all_corp_cnt;
						var lv_all_rcrit_psn_cnt = resultDetailList[0].all_rcrit_psn_cnt;
						var lv_new_corp_cnt = resultDetailList[0].new_corp_cnt;
						var lv_new_rcrit_psn_cnt = resultDetailList[0].new_rcrit_psn_cnt;
						var lv_clos_corp_cnt = resultDetailList[0].clos_corp_cnt;
						var lv_clos_rcrit_psn_cnt = resultDetailList[0].clos_rcrit_psn_cnt;
						var lv_all_corp_cnt_c = resultDetailList[0].all_corp_cnt_c;
						var lv_all_rcrit_psn_cnt_c = resultDetailList[0].all_rcrit_psn_cnt_c;
						var lv_new_corp_cnt_c = resultDetailList[0].new_corp_cnt_c;
						var lv_new_rcrit_psn_cnt_c = resultDetailList[0].new_rcrit_psn_cnt_c;
						var lv_clos_corp_cnt_c = resultDetailList[0].clos_corp_cnt_c;
						var lv_clos_rcrit_psn_cnt_c = resultDetailList[0].clos_rcrit_psn_cnt_c;
						
						var lv_week_all_corp_cnt = resultDetailList[0].all_corp_cnt;
						var lv_week_all_rcrit_psn_cnt = resultDetailList[0].all_rcrit_psn_cnt;
						
						$("#all_corp_cnt").html(appendCommaToNumber(lv_all_corp_cnt));					// 전체구인업체수
						$("#all_rcrit_psn_cnt").html(appendCommaToNumber(lv_all_rcrit_psn_cnt));		// 전체구인자수
						$("#new_corp_cnt").html(appendCommaToNumber(lv_new_corp_cnt));					// 신규등록구인업체수
						$("#new_rcrit_psn_cnt").html(appendCommaToNumber(lv_new_rcrit_psn_cnt));		// 신규등록구인자수
						$("#clos_corp_cnt").html(appendCommaToNumber(lv_clos_corp_cnt));				// 종료마감구인업체수
						$("#clos_rcrit_psn_cnt").html(appendCommaToNumber(lv_clos_rcrit_psn_cnt));		// 종료마감구인자수
											
						/** 전일대비 전체구인업체, 전체구인자수 START */
						//전일대비 (전체구인업체)
						if (lv_all_corp_cnt_c > 0) {
							$("#all_corp_cnt_c_rate_img").html("▲");
							$("#all_corp_cnt_c_rate").html((Number((100 * lv_all_corp_cnt_c / (lv_all_corp_cnt - lv_all_corp_cnt_c)).toFixed(2)))+"%");
							$("#all_corp_cnt_c_rate_img").addClass("td_up");
							$("#all_corp_cnt_c_rate_img").removeClass("td_down");
							$("#all_corp_cnt_c_rate").addClass("td_up");
							$("#all_corp_cnt_c_rate").removeClass("td_down");
						} else if (lv_all_corp_cnt_c < 0) {
							$("#all_corp_cnt_c_rate_img").html("▼");
							$("#all_corp_cnt_c_rate").html((Number(((-100 * lv_all_corp_cnt_c) / (lv_all_corp_cnt + lv_all_corp_cnt_c)).toFixed(2)))+"%");
							$("#all_corp_cnt_c_rate_img").addClass("td_down");
							$("#all_corp_cnt_c_rate_img").removeClass("td_up");
							$("#all_corp_cnt_c_rate").addClass("td_down");
							$("#all_corp_cnt_c_rate").removeClass("td_up");
						}
						//전일대비 (전체구인자수)
						if (lv_all_rcrit_psn_cnt_c > 0) {
							$("#all_rcrit_psn_cnt_c_rate_img").html("▲");
							$("#all_rcrit_psn_cnt_c_rate").html((Number((100 * lv_all_rcrit_psn_cnt_c / (lv_all_rcrit_psn_cnt - lv_all_rcrit_psn_cnt_c)).toFixed(2)))+"%");
							$("#all_rcrit_psn_cnt_c_rate_img").addClass("td_up");
							$("#all_rcrit_psn_cnt_c_rate_img").removeClass("td_down");
							$("#all_rcrit_psn_cnt_c_rate").addClass("td_up");
							$("#all_rcrit_psn_cnt_c_rate").removeClass("td_down");
						} else if (lv_all_rcrit_psn_cnt_c < 0) {
							$("#all_rcrit_psn_cnt_c_rate_img").html("▼");
							$("#all_rcrit_psn_cnt_c_rate").html((Number(((-100 * lv_all_rcrit_psn_cnt_c) / (lv_all_rcrit_psn_cnt + lv_all_rcrit_psn_cnt_c)).toFixed(2)))+"%");
							$("#all_rcrit_psn_cnt_c_rate_img").addClass("td_down");
							$("#all_rcrit_psn_cnt_c_rate_img").removeClass("td_up");
							$("#all_rcrit_psn_cnt_c_rate").addClass("td_down");
							$("#all_rcrit_psn_cnt_c_rate").removeClass("td_up");
						}
						/** 전일대비 전체구인업체, 전체구인자수 END */
						
						/** 전일대비 신규구인업체, 신규구인자수 START */
						//전일대비 (신규구인업체)
						if (lv_new_corp_cnt_c > 0) {
							$("#new_corp_cnt_c_rate_img").html("▲");
							$("#new_corp_cnt_c_rate").html(appendCommaToNumber(lv_new_corp_cnt_c) + "개");
							$("#new_corp_cnt_c_rate_img").addClass("td_up");
							$("#new_corp_cnt_c_rate_img").removeClass("td_down");
							$("#new_corp_cnt_c_rate").addClass("td_up");
							$("#new_corp_cnt_c_rate").removeClass("td_down");
						} else if (lv_new_corp_cnt_c < 0) {
							$("#new_corp_cnt_c_rate_img").html("▼");
							$("#new_corp_cnt_c_rate").html(appendCommaToNumber(Math.abs(lv_new_corp_cnt_c)) + "개");
							$("#new_corp_cnt_c_rate_img").addClass("td_down");
							$("#new_corp_cnt_c_rate_img").removeClass("td_up");
							$("#new_corp_cnt_c_rate").addClass("td_down");
							$("#new_corp_cnt_c_rate").removeClass("td_up");
						}
						//전일대비 (신규구인자수)
						if (lv_new_rcrit_psn_cnt_c > 0) {
							$("#new_rcrit_psn_cnt_c_rate_img").html("▲");
							$("#new_rcrit_psn_cnt_c_rate").html(appendCommaToNumber(lv_new_rcrit_psn_cnt_c) + "명");
							$("#new_rcrit_psn_cnt_c_rate_img").addClass("td_up");
							$("#new_rcrit_psn_cnt_c_rate_img").removeClass("td_down");
							$("#new_rcrit_psn_cnt_c_rate").addClass("td_up");
							$("#new_rcrit_psn_cnt_c_rate").removeClass("td_down");
						} else if (lv_new_rcrit_psn_cnt_c < 0) {
							$("#new_rcrit_psn_cnt_c_rate_img").html("▼");
							$("#new_rcrit_psn_cnt_c_rate").html(appendCommaToNumber(Math.abs(lv_new_rcrit_psn_cnt_c)) + "명");
							$("#new_rcrit_psn_cnt_c_rate_img").addClass("td_down");
							$("#new_rcrit_psn_cnt_c_rate_img").removeClass("td_up");
							$("#new_rcrit_psn_cnt_c_rate").addClass("td_down");
							$("#new_rcrit_psn_cnt_c_rate").removeClass("td_up");
						}
						/** 전일대비 신규구인업체, 신규구인자수 END */
						
						/** 전일대비 종료마감구인업체수, 종료마감구인자수 START */
						//전일대비 (종료마감구인업체수)
						if (lv_clos_corp_cnt_c > 0) {
							$("#clos_corp_cnt_c_rate_img").html("▲");
							$("#clos_corp_cnt_c_rate").html(appendCommaToNumber(lv_clos_corp_cnt_c) + "개");
							$("#clos_corp_cnt_c_rate_img").addClass("td_up");
							$("#clos_corp_cnt_c_rate_img").removeClass("td_down");
							$("#clos_corp_cnt_c_rate").addClass("td_up");
							$("#clos_corp_cnt_c_rate").removeClass("td_down");
						} else if (lv_clos_corp_cnt_c < 0) {
							$("#clos_corp_cnt_c_rate_img").html("▼");
							$("#clos_corp_cnt_c_rate").html(appendCommaToNumber(Math.abs(lv_clos_corp_cnt_c)) + "개");
							$("#clos_corp_cnt_c_rate_img").addClass("td_down");
							$("#clos_corp_cnt_c_rate_img").removeClass("td_up");
							$("#clos_corp_cnt_c_rate").addClass("td_down");
							$("#clos_corp_cnt_c_rate").removeClass("td_up");
						}
						//전일대비 (종료마감구인자수)
						if (lv_clos_rcrit_psn_cnt_c > 0) {
							$("#clos_rcrit_psn_cnt_c_rate_img").html("▲");
							$("#clos_rcrit_psn_cnt_c_rate").html(appendCommaToNumber(lv_clos_rcrit_psn_cnt_c) + "명");
							$("#clos_rcrit_psn_cnt_c_rate_img").addClass("td_up");
							$("#clos_rcrit_psn_cnt_c_rate_img").removeClass("td_down");
							$("#clos_rcrit_psn_cnt_c_rate").addClass("td_up");
							$("#clos_rcrit_psn_cnt_c_rate").removeClass("td_down");
						} else if (lv_clos_rcrit_psn_cnt_c < 0) {
							$("#clos_rcrit_psn_cnt_c_rate_img").html("▼");
							$("#clos_rcrit_psn_cnt_c_rate").html(appendCommaToNumber(Math.abs(lv_clos_rcrit_psn_cnt_c)) + "명");
							$("#clos_rcrit_psn_cnt_c_rate_img").addClass("td_down");
							$("#clos_rcrit_psn_cnt_c_rate_img").removeClass("td_up");
							$("#clos_rcrit_psn_cnt_c_rate").addClass("td_down");
							$("#clos_rcrit_psn_cnt_c_rate").removeClass("td_up");
						}
						/** 전일대비 종료마감구인업체수, 종료마감구인자수 END */
						
						$("#today").html("(" + today.substring(4, 6) + "월 " + today.substring(6, 8) + "일기준.10일단위)"); // 기준일 셋팅
						
						// 오늘의 구인현황 상세화면 상단 전체 업체및구인차트
						$todayStatusMap.ui.todayStatusChart(resultDetailList);
						
						/** 오늘의 구인현황 상세화면 요일별 전체구인현황 차트 START */
						
						/** 요일별 전체구인현황 구인업체및 구인자수 셋팅 START */
						$("#week_all_corp_cnt").html(appendCommaToNumber(lv_week_all_corp_cnt));
						$("#week_all_rcrit_psn_cnt").html(appendCommaToNumber(lv_week_all_rcrit_psn_cnt));
						/** 요일별 전체구인현황 구인업체및 구인자수 셋팅 END */
						
						var categories = [];
						var tmpCategories = [];
						var from, to;
						var i;
						to = new Date(res.result.data_range.to_value.substr(0,4)+"-"+
									  res.result.data_range.to_value.substr(4,2)+"-"+
									  res.result.data_range.to_value.substr(6,2));
						i = new Date(res.result.data_range.from_value.substr(0,4)+"-"+
									 res.result.data_range.from_value.substr(4,2)+"-"+
									 res.result.data_range.from_value.substr(6,2));
						
						while (i <= to) {				
							var tmpYmd = $todayStatusMap.ui.getFormatDate(i);
							categories.push(tmpYmd.substr(6, 2));
							tmpCategories.push(tmpYmd);
							i.setDate(i.getDate()+1);
						}
						
						var chartData = res.result.resultDateStatusList;
						var last_reg_dt = chartData[chartData.length - 1].reg_dt;
						var seriesRawData = [];
						for(var i = 0; i < chartData.length; i++) {
							if(chartData[i].reg_dt == last_reg_dt) {
								seriesRawData.push(chartData[i]);
							}
						}
						
						var lineSeries = [];
						var data = [];
						
						// to get series
						for (var i = 0; i < seriesRawData.length; i++) {
							data = [];
							
							var rawDataArr = [];
							for(var j = 0; j < chartData.length; j++){
								if(chartData[j].rank == i){
									rawDataArr.push(chartData[j]);
								}
							}
							
							var rawData = null;
							var tempData = null;
							
							for (var k = 0; k < tmpCategories.length; k++){
								if (rawDataArr.length != undefined) {// 데이터가 2묶음 이상인 경우
									
									for(var l = 0; l < rawDataArr.length; l++){
										if(rawDataArr[l].reg_dt == tmpCategories[k]){
											rawData = rawDataArr[l]; 
										}
									}
									
									if(rawData != undefined) {
										tempData = rawData;										
									}
								} else if (k == tmpCategories.length - 1) {
									rawData = rawDataArr;
									if(rawData != undefined) {
										tempData = rawData;										
									}
								} else {
									rawData = undefined;
									if(rawData != undefined) {
										tempData = rawData;
									}
								}
								
								if (rawData != undefined) {
									data.push(rawData.corp_irdsrate);
								} else {
									if(tempData != undefined || tempData != null) {
										data.push(tempData.corp_irdsrate);
									} else {
										data.push(0);										
									}
								}
							}
							
							if(seriesRawData[i].class_nm.indexOf("전체") > -1) {
								lineSeries.push({
									name: seriesRawData[i].class_nm,
									data: data
								});													
							}
						}
						
						$todayStatusMap.ui.weekDataList = lineSeries; 
						
						// 차트설정
			            Highcharts.setOptions({
			               lang: {
			                   thousandsSep: ",",
			                   numericSymbols: ["천", "백만", "십억", "조", "천조", "백경"]
			                }
			            });
					
						$('#weekStatusChart').highcharts({
							chart: {
						        type: 'line',
						        width: $(window).width(),
						        height: 200,
						        marginBottom : 50,
						        marginRight: 20,
						        marginTop: 30
						    },
						    showFirstLabel: false,
						    colors: ['#45c4d8', '#755ba6'],
						    title: {
						    	text: '(일)',
						        align: 'right',
						        margin: 10,
						        y:158,
						        style: {
						            color: '#888888',
						            fontSize: '11px'
						        }
						    },
						    xAxis: {
                                labels: {
						            style: {
						                color: '#888888'	// y축 색상
						            }
						        },
						    	categories: categories,
						        tickWidth: 0,
								lineWidth: 1,
								lineColor: '#cccccc'
						    },
						    yAxis: {
						        title: {
						            text: ''
						        },
						        labels: {
						            style: {
						                color: '#999999'	// y축 색상
						            }
						        },
						        gridLineWidth: 0,
						        min: 0
						    },
						    legend: {
						        enabled: false
						    },
						    tooltip: {
						    	enabled: true,
						        crosshairs: true, 
						        style: {
	                                display: "none"
	                             }
						    },
						    plotOptions: {
						        series: {
						        	cursor: 'pointer',
						        	point: {
						        		events: {
						        			click: function (e) {
						        				// 선택된 포인트에 이미지 추가 START
						        				var chart = this.series.chart;
						        	            for(var i = 0; i < chart.series.length; i++) {
						        	            	for(var j = 0; j < chart.series[i].data.length; j++) {
						        	            		if(j == this.index) {
						        	            			chart.series[0].data[j].update({
						        	            				marker: {
						        	            					width: 30,
																	height: 30,
						        	            					symbol: 'url(' + contextPath + '/resources/m2019/images/icon_chart2_company.png)'
						        	            						}
						        	            			});
						        	            			chart.series[1].data[j].update({
						        	            				marker: {
						        	            					width: 30,
																	height: 30,
						        	            					symbol: 'url(' + contextPath + '/resources/m2019/images/icon_chart2_jobseeker.png)'
						        	            						}
						        	            			});
						        	            		} else {
						        	            			chart.series[i].data[j].update({
						        	            				marker: {
						        	            					symbol: 'circle'
						        	            						}
						        	            			});
						        	            		}
						        	            	}
						        	            }
						        				// 선택된 포인트에 이미지 추가 END
						        	            
						        	            // 구인업체수
						        				var allCorpCnt = (this.index  < $todayStatusMap.ui.weekDataList[0].data.length) ? $todayStatusMap.ui.weekDataList[0].data[this.index] : {y: 0};
						        				$("#week_all_corp_cnt").html(appendCommaToNumber(allCorpCnt.y));
						        				// 구인자수
						        				var allRcritPsnCnt = (this.index  < $todayStatusMap.ui.weekDataList[1].data.length) ? $todayStatusMap.ui.weekDataList[1].data[this.index] : {y: 0};
						        				$("#week_all_rcrit_psn_cnt").html(appendCommaToNumber(allRcritPsnCnt.y));
							            	}
						        		}
						            }					            
						        }
						    },
						    series: lineSeries
						}, function (chart){
							// 오늘의 구인현황 상세 화면 첫 조회시 요일별 전체구인현황 마지막값에 이미지 추가
							var chart = this;
	        	            for(var i = 0; i < chart.series.length; i++) {
	        	            	for(var j = 0; j < chart.series[i].data.length; j++) {
	        	            		if(j == chart.series[i].data.length-1) {
	        	            			chart.series[0].data[j].update({
	        	            				marker: {
	        	            					width: 30,
	        									height: 30,
	        	            					symbol: 'url(' + contextPath + '/resources/m2019/images/icon_chart2_company.png)'
	        	            						}
	        	            			});
	        	            			chart.series[1].data[j].update({
	        	            				marker: {
	        	            					width: 30,
	        									height: 30,
	        	            					symbol: 'url(' + contextPath + '/resources/m2019/images/icon_chart2_jobseeker.png)'
	        	            						}
	        	            			});
	        	            		}
	        	            	}
	        	            }
						});
						/** 오늘의 구인현황 상세화면 요일별 전체구인현황 차트 START */
						
						/** 오늘의 구인현황 상세내역 팝업 END */
			    	} else {
						messageAlert.open('failed!');
					}
				} ,
				error:function(err) {
					messageAlert.open(err.responseText);
				}
				/** 2019.10.02[한광희] 로딩바 추가. START */
				,complete : function() {
//					debugger;
			    	common_loading(false); // 로딩바 감춤
			    }
				/** 2019.10.02[한광희] 로딩바 추가. START */
			});
		},
		
		/**
		 * @name : todayStatusChart
		 * @description : 오늘의 구인현황 상세화면 상단 전체 업체및구인차트
		 * @date : 2019. 07. 11.
		 * @author : 한광희
		 * @history :
		 * @param 
		 */
		todayStatusChart : function(chartData){			
			var ChartData = [];		//차트 데이터
			
			ChartData.push(Number(chartData[0].all_corp_cnt));	// 전체업체수
			ChartData.push(Number(chartData[0].all_rcrit_psn_cnt));	// 전체구인자수

			// 차트설정
            Highcharts.setOptions({
               lang: {
                   thousandsSep: ",",
                   numericSymbols: ["천", "백만", "십억", "조", "천조", "백경"]
                }
            });
			
			$('#todayStatusChart').highcharts({
				chart: {
					backgroundColor: {
			            linearGradient: [500, 500, 500, 0],
			            stops: [
			            	[0, '#3F84C5'],	// 하단 백그라운드 색
			            	[1, '#2C6DB6']	// 상단 백그라운드 색
			            ]
			        },
			        renderTo: 'container',
			        type: 'column',
			        width: $(window).width(),
			        height: 200,
			        marginBottom : 20,
			        marginTop: 70,
			        showAxes: false
			    },
			    title: {
			        text: ''
			    },
			    xAxis: {
			    	categories: [],
			        tickWidth: 0,
			        labels: {
			        	enabled: false
			        },
			        lineWidth: 0
			    },
			    yAxis: {
			        title: {
			            text: ''
			        },
			        labels: {
			            style: {
			                color: '#BCC9E7'	// y축 색상
			            }
			        },
			        gridLineWidth: 0,
			        maxPadding: 0.5
			    },
			    legend: {
			        enabled: false
			    },
			    plotOptions: {
			        series: {
			            borderWidth: 0,
			            dataLabels: {
			                enabled: true,
			                allowOverlap:true,
			                style: {
			                	color: '#FFFFFF',
			                	textOutline : "0px",
			                	fontWeight: "normal",
			                	textShadow: false,
			                	fontSize: "20px"
			                }
			            },
			            enableMouseTracking: false,
			            shadow: false
			        }
			    },
			    series: [{
			    	name : "",
			        data : ChartData,
			        color: {
						linearGradient: {
							x1: 0,
							x2: 0,
							y1: 0,
							y2: 1
						},
						stops: [
							[0, '#ffffff'],
							[1, '#63a4d9']
						]
			        }
			    }]
			}, function (chart){
				var chart = this,
			    leftOffset = chart.plotLeft,
			    topOffset = chart.plotTop,
			    series = chart.series[0],
			    xAxis = series.xAxis,
			    yAxis = series.yAxis,
			    points = series.points;
				var index = 0;
				
				points.forEach(function(point) {
					var x = xAxis.toPixels(point.x) - leftOffset,
					y = yAxis.toPixels(point.y) - topOffset;

					if(index == 0){
						chart.renderer.image().attr({
					      href: contextPath + '/resources/m2019/images/icon_chart1_company.png',
					      x: x-15,
					      y: y-10,
					      width:30,
					      height:30,
					      zIndex: 10
					    }).add(series.group);
					} else if(index == 1) {
						chart.renderer.image().attr({
					      href: contextPath + '/resources/m2019/images/icon_chart1_jobseeker.png',
					      x: x-15,
					      y: y-10,
					      width:30,
					      height:30,
					      zIndex: 10
					    }).add(series.group);
					}
				    index++;
				});
			});
		},
		
		/**
		 * @name : todayStatusMapMove
		 * @description : 지도 이동
		 * @date : 2019. 07. 08.
		 * @author : 한광희
		 * @history :
		 * @param 
		 */
		todayStatusMapMove : function(adm_cd){
			var coord_x = "";
			var coord_y = ""; 
			var zoomlevel = "";
						
			// 지도 x,y 좌표 및 zoomlevel 설정
            switch (adm_cd.length) {
				case 2:
					coord_x = $("#todayStatusSido option:selected").data("coor-x");
	                coord_y = $("#todayStatusSido option:selected").data("coor-y");
	                
	                if(adm_cd == '11' || adm_cd == '21' || adm_cd == '22' ||
	                		adm_cd == '24' || adm_cd == '25' || adm_cd == '26' || adm_cd == '29'){
	                	// 서울(11), 부산(21), 대구(22), 광주(24), 대전(25), 울산(26), 세종(29) 
	                	zoomlevel = 4;
	                } else if(adm_cd == '23' || adm_cd == '39') {
	                	// 인천(23), 제주(39)
	                	zoomlevel = 3;
	                } else if(adm_cd == '31' || adm_cd == '32' || adm_cd == '33' ||
	                		adm_cd == '34' || adm_cd == '35' || adm_cd == '36' || adm_cd == '37' || adm_cd == '38') {
	                	// 경기(31), 강원(32), 충북(33), 충남(34), 전북(35), 전남(36), 경북(37), 경남(38)
	                	zoomlevel = 2;
	                } else {
	                	zoomlevel = 1;
	                }
					break;
				case 5:
					coord_x = $("#todayStatusSgg option:selected").data("coor-x");
	                coord_y = $("#todayStatusSgg option:selected").data("coor-y");
	                zoomlevel = 5;
					break;
				default:
					coord_x = 990480.875;
            		coord_y = 1815839.375;
            		zoomlevel = 1;
					break;
			}
			            
			this.map.mapMove([coord_x, coord_y], zoomlevel, 0);	// 선택된 지역으로 이동
		},
		
		/** * yyyyMMdd 포맷으로 반환 */ 
		getFormatDate: function(date){ 
			var year = date.getFullYear();	//yyyy 
			var month = (1+date.getMonth());	//M 
			month = month >= 10 ? month : '0' + month;	//month 두자리로 저장 
			var day = date.getDate();	//d 
			day = day >= 10 ? day : '0' + day;	//day 두자리로 저장 
			return year + '' + month + '' + day;
		},
		
		/**
		 * @name : createMap
		 * @description : 지도 생성
		 * @date : 2019. 07. 03.
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
			this.map.createMap($todayStatusMap, id, {
				/*
				isZoomControl : true,
				isCurrentControl : true,
				isMapSizeControl : true,
				isPoiControl : true,
				isMapNavigator : true,
				navigatorOption : {
					id : "map-navigator-",
					min : "emdong"
				},
				mapStatToggleOption : // 통계 폴리곤 토글 버튼의 옵션
				{
					defaultShowMapStat : false
				// 초기에 지도의 통계를 보여줄지의 유무
				},
				isMapCaptionToggleControl : true,// 통계 캡션 토글 버튼 생성 유무
				mapCaptionToggleOption : // 통계 캡션 토글 옵션
				{
					defaultShowCaption : false,// 초기에 지도의 통계 캡션을 보여줄지의 유무
					callback : function(isOn) {
					}
				}
				*/
			});
			/*
			this.map.addControlEvent("movestart");
			this.map.addControlEvent("moveend");
			this.map.addControlEvent("zoomstart");
			this.map.addControlEvent("zoomend");
			this.map.addControlEvent("drag");
			this.map.addControlEvent("dragend");
			*/
			this.map.gMap.whenReady(function() {
				// $todayStatusMapApi.request.initialize();
				
			});	
		},
		
		/**
		 * @name : todayStatusDetailPopupToggle
		 * @description : 오늘의 구인현황 상세
		 * @date : 2019.07.10
		 * @author : 한광희
		 * @history :
		 * @param :
		 * 		p_flag : true/false => 표시/감춤 
		 */
		todayStatusDetailPopupToggle : function(p_flag) {
			//표시
			if(p_flag == true) {
				srvLogWrite('M0','10','04','01',$("#todayStatusDetailSidoCd option:selected").text()+' '+$("#todayStatusDetailSggCd option:selected").text(),''); // 상세현황 보기
				
				$("#todayStatusDetailPopup").css("top",$(window).outerHeight(true)+"px");
				$("#todayStatusDetailPopup").show().animate({
					top : 0
				},400,function(){
					$("body").children("div.Wrap").children("div.Header").hide(); //.Content 하위 객체는 .Header 위에 표시될 수 없음.
					
					$todayStatusMap.ui.tempAdmCd = $("#todayStatusSido").val() + $("#todayStatusSgg").val();
				});
			}
			//감춤
			else {
				$("body").children("div.Wrap").children("div.Header").show(); //.Content 하위 객체는 .Header 위에 표시될 수 없음.
				$("#todayStatusDetailPopup").animate({
					top : $(window).outerHeight(true)
				},400,function(){
					$("#todayStatusDetailPopup").hide();
					
					/** 2019.10.02[한광희] 오늘의 구인현황 상세현황 닫힘 속도 개선으로 인한 지도 재조회 위치 수정. START */
					var adm_cd = $("#todayStatusDetailSidoCd").val()+$("#todayStatusDetailSggCd").val();
					if($todayStatusMap.ui.tempAdmCd != adm_cd){
						$todayStatusMap.ui.todayStatus(adm_cd);						
					}
					/** 2019.10.02[한광희] 오늘의 구인현황 상세현황 닫힘 속도 개선으로 인한 지도 재조회 위치 수정. END */
				});
			}
		},
		
		//2019-09-17 [김남민] (12) 오늘의 전체 일지리현황 팝업 수정. START
		/**
		 * @name : myNeighberhoodJobTodayStatusPopupSelect
		 * @description : 오늘의 전체 일자리현황 팝업 조회
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param
		 * 		 
		 */
		myNeighberhoodJobTodayStatusPopupSelect : function(p_sido_cd, p_sido_nm, p_sgg_cd, p_sgg_nm) {
			srvLogWrite('M0','10','04','02',$("#todayStatusDetailSidoCd option:selected").text()+' '+$("#todayStatusDetailSggCd option:selected").text(),''); // 지역 설정
			
			common_loading(true); // 로딩바 표시
			// ajax 시작
			$.ajax({
			    url: contextPath + "/m2019/workroad/todayAllJobStatusPopupSelect.json",
			    type: 'post',
			    dataType: 'json',
			    data: {
			    	data: "data",
			    	sido_cd : p_sido_cd,
			    	sido_nm : p_sido_nm,
			    	sgg_cd : p_sgg_cd,
			    	sgg_nm : p_sgg_nm
			    }
			}).done(function (res) { // 완료
				if(res.errCd == "0") {
					var lvParams = res.result.params;
					var lvResultList = res.result.resultList;
					if(lvResultList != null && lvResultList.length > 0) {
						//조회결과
						var lv_reg_dt = lvResultList[0].reg_dt;
						var lv_all_corp_cnt = lvResultList[0].all_corp_cnt;
						var lv_all_rcrit_psn_cnt = lvResultList[0].all_rcrit_psn_cnt;
						var lv_new_corp_cnt = lvResultList[0].new_corp_cnt;
						var lv_new_rcrit_psn_cnt = lvResultList[0].new_rcrit_psn_cnt;
						var lv_clos_corp_cnt = lvResultList[0].clos_corp_cnt;
						var lv_clos_rcrit_psn_cnt = lvResultList[0].clos_rcrit_psn_cnt;
						var lv_all_corp_cnt_c = lvResultList[0].all_corp_cnt_c;
						var lv_all_rcrit_psn_cnt_c = lvResultList[0].all_rcrit_psn_cnt_c;
						var lv_new_corp_cnt_c = lvResultList[0].new_corp_cnt_c;
						var lv_new_rcrit_psn_cnt_c = lvResultList[0].new_rcrit_psn_cnt_c;
						var lv_clos_corp_cnt_c = lvResultList[0].clos_corp_cnt_c;
						var lv_clos_rcrit_psn_cnt_c = lvResultList[0].clos_rcrit_psn_cnt_c;
						
						//지역명
						if(lvParams.sido_nm != null && lvParams.sido_nm != "" && lvParams.sido_nm != "null") {
							if(lvParams.sgg_nm != null && lvParams.sgg_nm != "" && lvParams.sgg_nm != "null") {
								$("#myNeighberhoodJobTodayStatusPopup_adm_nm").html(lvParams.sido_nm+" "+lvParams.sgg_nm);
							}
							else {
								$("#myNeighberhoodJobTodayStatusPopup_adm_nm").html(lvParams.sido_nm);
							}
						}
						else {
							$("#myNeighberhoodJobTodayStatusPopup_adm_nm").html("전체");
						}
						
						//기준일자
						if(lv_reg_dt != null && lv_reg_dt != "" && lv_reg_dt.length == 8) {
							$("#myNeighberhoodJobTodayStatusPopup_reg_dt").html("("+lv_reg_dt.substr(4,2)+"월 "+lv_reg_dt.substr(6,2)+"일 기준)");
						}
						
						//구인업체 & 구인자수
						$("#myNeighberhoodJobTodayStatusPopup [name='all_corp_cnt']").html(appendCommaToNumber(lv_all_corp_cnt));
						$("#myNeighberhoodJobTodayStatusPopup [name='all_rcrit_psn_cnt']").html(appendCommaToNumber(lv_all_rcrit_psn_cnt));
						$("#myNeighberhoodJobTodayStatusPopup [name='new_corp_cnt']").html(appendCommaToNumber(lv_new_corp_cnt));
						$("#myNeighberhoodJobTodayStatusPopup [name='new_rcrit_psn_cnt']").html(appendCommaToNumber(lv_new_rcrit_psn_cnt));
						$("#myNeighberhoodJobTodayStatusPopup [name='clos_corp_cnt']").html(appendCommaToNumber(lv_clos_corp_cnt));
						$("#myNeighberhoodJobTodayStatusPopup [name='clos_rcrit_psn_cnt']").html(appendCommaToNumber(lv_clos_rcrit_psn_cnt));
						
						//전일대비 (구인업체)
						if (lv_all_corp_cnt_c > 0) {
							$("#myNeighberhoodJobTodayStatusPopup [name='all_corp_cnt_c_rate']").html("▲ "+(Number((100 * lv_all_corp_cnt_c / (lv_all_corp_cnt - lv_all_corp_cnt_c)).toFixed(2)))+"%");
							$("#myNeighberhoodJobTodayStatusPopup [name='all_corp_cnt_c_rate']").addClass("td_up");
						} else if (lv_all_corp_cnt_c < 0) {
							$("#myNeighberhoodJobTodayStatusPopup [name='all_corp_cnt_c_rate']").html("▼ "+(Number(((-100 * lv_all_corp_cnt_c) / (lv_all_corp_cnt + lv_all_corp_cnt_c)).toFixed(2)))+"%");
							$("#myNeighberhoodJobTodayStatusPopup [name='all_corp_cnt_c_rate']").addClass("td_down");
						}
						
						//전일대비 (구인자수)
						if (lv_all_rcrit_psn_cnt_c > 0) {
							$("#myNeighberhoodJobTodayStatusPopup [name='all_rcrit_psn_cnt_c_rate']").html("▲ "+(Number((100 * lv_all_rcrit_psn_cnt_c / (lv_all_rcrit_psn_cnt - lv_all_rcrit_psn_cnt_c)).toFixed(2)))+"%");
							$("#myNeighberhoodJobTodayStatusPopup [name='all_rcrit_psn_cnt_c_rate']").addClass("td_up");
						} else if (lv_all_rcrit_psn_cnt_c < 0) {
							$("#myNeighberhoodJobTodayStatusPopup [name='all_rcrit_psn_cnt_c_rate']").html("▼ "+(Number(((-100 * lv_all_rcrit_psn_cnt_c) / (lv_all_rcrit_psn_cnt + lv_all_rcrit_psn_cnt_c)).toFixed(2)))+"%");
							$("#myNeighberhoodJobTodayStatusPopup [name='all_rcrit_psn_cnt_c_rate']").addClass("td_down");
						}
						
						//팝업 호출
						$todayStatusMap.ui.myNeighberhoodJobTodayStatusPopupToggle(true);
					}
				}else if(res.errCd == "-401") {
					//common_alert(res.errMsg);
				}else{
					//common_alert(res.errMsg);
				}
			}).fail(function (res) { // 실패
				//common_alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				common_loading(false); // 로딩바 감춤
			});
			// ajax 끝
		},
		
		/**
		 * @name : myNeighberhoodJobTodayStatusPopupToggle
		 * @description : 오늘의 전체 일자리현황 팝업 토글
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_flag : true/false => 표시/감춤 
		 */
		myNeighberhoodJobTodayStatusPopupToggle : function(p_flag) {
			//표시
			if(p_flag == true) {
				//화면 띄움
				$("#common_popup_back").parent().show();
				$("#myNeighberhoodJobTodayStatusPopup").appendTo($("body"));
				$("#myNeighberhoodJobTodayStatusPopup").show();
				
				//이전 이벤트 제거
				$("#common_popup_back").unbind();
				
				//새로운 이벤트 맵핑
				$("#common_popup_back").click(function() {
					$("#myNeighberhoodJobTodayStatusPopup_close").click();
				});
			}
			//감춤
			else {
				//화면 띄움
				$("#common_popup_back").parent().hide();
				$("#myNeighberhoodJobTodayStatusPopup").hide();
			}
		}
		//2019-09-17 [김남민] (12) 오늘의 전체 일지리현황 팝업 수정. END
	};
	
	// 지도 콜백 함수 선언
	$todayStatusMap.callbackFunc = {
		// 해당경계 선택 시, 발생하는 콜백함수
		didSelectedPolygon : function(event, data, type, map) {
			if(type == "data"){
				var lvAdmCd = data.properties.adm_cd;
				var tmpTodayStatusList = $todayStatusMap.ui.todayStatusList;
				var areaTitle = "";
				var allCorpCnt = "";
				var allRcritPsnCnt = "";
				
				for(var i = 0; i < tmpTodayStatusList.length; i++){
					if(lvAdmCd == tmpTodayStatusList[i].adm_cd){
						areaTitle =  tmpTodayStatusList[i].adm_nm;					// 오늘의 구인현황:시도명
						allCorpCnt = tmpTodayStatusList[i].right_data_val;			// 오늘의 구인현황:전체 업체수
						allRcritPsnCnt = tmpTodayStatusList[i].right_data_val2;		// 오늘의 구인현황:전체모집인원수
					}
				}
				
				// 지도선택 시도콤보 값 변경
				$("#todayStatusSido option").each(function(index, element){
					if($( element ).val() == lvAdmCd) {
						$("#todayStatusSido option[value='" + lvAdmCd + "']").prop("selected", true);
						return false;
					}
				});
				
				// 지도에서 시도 선택에 따른 시군구 값 표출
				if(lvAdmCd.length == 2){
					if(lvAdmCd != '99'){
						$("#todayStatusSgg").show();
						$todayStatusMap.ui.todayStatusSggCd(lvAdmCd);	// 시군구코드 조회
					} else {
						$("#todayStatusSgg").hide();
					}
				} else if(lvAdmCd.length == 5) {
					// 지도선택 시군구콤보 값 변경
					$("#todayStatusSgg option").each(function(index, element){
						if($( element ).val() == lvAdmCd.substring(2,5)) {
							$("#todayStatusSgg option[value='" + lvAdmCd.substring(2,5) + "']").prop("selected", true);
							return false;
						}
					});
				}
				
				/** 오늘의 구인현황 상세화면 select box 변경 START */
				// 지도 선택시 상세 조회 화면 시도 콤보 값 변경
				$("#todayStatusDetailSidoCd option").each(function(index, element){
					if($( element ).val() == lvAdmCd) {
						$("#todayStatusDetailSidoCd option[value='" + lvAdmCd + "']").prop("selected", true);
						return false;
					}
				});
				// 지도 선택시 상세 조회 화면 시도 콤보 값 변경
				$("#todayStatusDetailSggCd option").each(function(index, element){
					if($( element ).val() == lvAdmCd.substring(2,5)) {
						$("#todayStatusDetailSggCd option[value='" + lvAdmCd.substring(2,5) + "']").prop("selected", true);
						return false;
					}
				});
				/** 오늘의 구인현황 상세화면 select box 변경 END */
				
				// 지역 선택시 해당 지역 정보 표출 START
				$("#alertBox").show();
                                // mng_s 20191119 이금은
				if(areaTitle == "") areaTitle = (data.properties.adm_nm).substring((data.properties.adm_nm).lastIndexOf(" "), data.properties.adm_nm.length);
				$("#todayStatusAreaTitle").html(areaTitle);
				if(allCorpCnt == ""){
					$("#todayStatusAreaData").html("구인정보 없음");					
				} else {
					$("#todayStatusAreaData").html(appendCommaToNumber(allCorpCnt) + "업체 / " + appendCommaToNumber(allRcritPsnCnt) + "명");	
				}
                                // mng_e 20191119 이금은
				// 지역 선택시 해당 지역 정보 표출 END			
				
				
				// 일자리보기 버튼 클릭에 따른 값 셋팅 START
				if(lvAdmCd.length == 2){
					$("#todayStatusAlertBoxJobDetail").attr("sido_cd",lvAdmCd);
					$("#todayStatusAlertBoxJobDetail").attr("sgg_cd","");
				} else if(lvAdmCd.length >= 5) {
					$("#todayStatusAlertBoxJobDetail").attr("sido_cd",lvAdmCd.substring(0,2));
					$("#todayStatusAlertBoxJobDetail").attr("sgg_cd",lvAdmCd.substring(2,5));
				}
				// 일자리보기 버튼 클릭에 따른 값 셋팅 END
				
				if(lvAdmCd.length < 6){
					$todayStatusMap.ui.todayStatus(lvAdmCd);	// 선택된 시도의 시군구 정보 조회					
				}
			}
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
	
	$todayStatusMap.util = {
			/**
			 * 숫자에 천단위 콤마추가 및 꼬리말 추가
			 */
			addComma : function (pNumberString, pTrailer) {
				if (pNumberString == undefined) {
					return "";
				}
				
				var parts = pNumberString.toString().split(".");
				var str = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
				
			    if (typeof pTrailer != 'undefined') {
			    	str += pTrailer;
			    }
			    
			    return str;
			}
	};

	$todayStatusMap.event = {
		/**
		 * @name : setUIEvent
		 * @description : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 * @date : 2019.07.03
		 * @author : 한광희
		 * @history :
		 */
		setUIEvent : function() {
			// 지역정보 alert 닫기버튼
			$(document).on("click", "#todayStatusAlertBoxClose", function(){
				$("#alertBox").hide();
			});
			
			// 지역정보 alert 일자리보기버튼
			$(document).on("click", "#todayStatusAlertBoxJobDetail", function(){
				srvLogWrite('M0','10','03','00',$("#todayStatusSido option:selected").text()+' '+$("#todayStatusSgg option:selected").text(),''); // 일자리 보기

				var lvThis = $(this);
				var lvSidoCd = lvThis.attr("sido_cd");
				var lvSggCd = lvThis.attr("sgg_cd");
				location.href = contextPath+"/m2019/workroad/myNeighberhoodJobMap.sgis?list_gubun=1&sido_cd="+lvSidoCd+"&sgg_cd="+lvSggCd;
			});
			
			// 오늘의 구인현황 시도 콤보 박스 클릭
			$(document).on("click", "#todayStatusSido", function(){
				$("#alertBox").hide();
			});			
			// 오늘의 구인현황 시도 콤보박스 값 변경
			$(document).on("change", "#todayStatusSido", function() {
				$todayStatusMap.ui.todayStatus($(this).val());		// 시도 선택에 따른 오늘의 구인현황  조회
				
				$("#todayStatusDetailSidoCd").val($(this).val());	// 오늘의 구인현황 상세화면 시도코드 셋팅
				srvLogWrite('M0','10','02','00',$("#todayStatusSido option:selected").text(),''); // 지역 설정

				// 시도 코드가 전국이 아닐경우 시군구 코드 선택하도록 화면에서 표출하고 시도값이 전국일 경우 시군구 선택 못하도록 적용
				if($(this).val() != '99'){
					$("#todayStatusSgg").show();
				} else {
					$("#todayStatusSgg").hide();
				}
				$todayStatusMap.ui.todayStatusSggCd($(this).val());	// 시군구코드 조회
			});
			
			// 오늘의 구인현황 시군구 콤보 박스 클릭
			$(document).on("click", "#todayStatusSgg", function(){
				$("#alertBox").hide();
			});			
			// 오늘의 구인현황 시군구 콤보박스 값 변경
			$(document).on("change", "#todayStatusSgg", function() {
				var adm_cd = $("#todayStatusSido").val() + $(this).val();
				$todayStatusMap.ui.todayStatus(adm_cd);		// 시군구 선택에 따른 값 조회
				
				$("#todayStatusDetailSggCd").val($(this).val());	// 오늘의 구인현황 상세화면 시도코드 셋팅				srvLogWrite('M0','10','02','00',$("#todayStatusSido option:selected").text()+' '+$("#todayStatusSgg option:selected").text(),''); // 지역 설정
				srvLogWrite('M0','10','02','00',$("#todayStatusSido option:selected").text()+' '+$("#todayStatusSgg option:selected").text(),''); // 지역 설정
			});
			
			/** 오늘의 구인현황 상세화면 관련 Event START */
			// 오늘의 구인현황 상세내역 시도 콤보박스 값 변경
			$(document).on("change", "#todayStatusDetailSidoCd", function() {
				$todayStatusMap.ui.todayStatus($(this).val());		// 시도 선택에 따른 오늘의 구인현황  조회
				
				$("#todayStatusSido").val($(this).val());	// 오늘의 구인현황 메인화면 시도코드 셋팅
				srvLogWrite('M0','10','04','02',$("#todayStatusDetailSidoCd option:selected").text(),''); // 지역 설정
				
				// 시도 코드가 전국이 아닐경우 시군구 코드 선택하도록 화면에서 표출하고 시도값이 전국일 경우 시군구 선택 못하도록 적용
				if($(this).val() != '99'){
					$("#todayStatusSgg").show();
				} else {
					$("#todayStatusSgg").hide();
				}
				$todayStatusMap.ui.todayStatusSggCd($(this).val());	// 시군구코드 조회
			});
			
			// 오늘의 구인현황 상세내역 시군구 콤보박스 값 변경
			$(document).on("change", "#todayStatusDetailSggCd", function() {
				var adm_cd = $("#todayStatusDetailSidoCd").val() + $(this).val();
				$todayStatusMap.ui.todayStatus(adm_cd);		// 시군구 선택에 따른 값 조회
				
				$("#todayStatusSgg").val($(this).val());	// 오늘의 구인현황 상세화면 시도코드 셋팅
				srvLogWrite('M0','10','04','02',$("#todayStatusDetailSidoCd option:selected").text()+' '+$("#todayStatusDetailSggCd option:selected").text(),''); // 지역 설정
			});
			
			// 상세현황 버튼 스와이프 기능 STRAT
			$("#detailStatusBtnDev").swipe({
				threshold : 10,
				// 펼치기
				swipeUp:function(event, direction) {
					$("#alertBox").hide();
					$todayStatusMap.ui.todayStatusDetailPopupToggle(true);
				},
				// 버튼 클릭
				tap:function(event, target) {
					$("#alertBox").hide();
					$todayStatusMap.ui.todayStatusDetailPopupToggle(true);
				}
			});	
			
//selectbox 문제로 주석처리함. leekh 20191121
//			$("#todayStatusDetailPopup").swipe({
//				threshold : 10,
				// 접기
//				swipeDown:function(event, direction) {
//					$todayStatusMap.ui.todayStatusDetailPopupToggle(false);
					
					/** 2019.10.02[한광희] 오늘의 구인현황 상세현황 닫힘 속도 개선으로 인한 주석처리. START */
					// 지도 재조회
					/*var adm_cd = $("#todayStatusSido").val()+$("#todayStatusSgg").val();
					$todayStatusMap.ui.todayStatus(adm_cd);*/
					/** 2019.10.02[한광희] 오늘의 구인현황 상세현황 닫힘 속도 개선으로 인한 주석처리. END */
//				},
				// 닫기 버튼 클릭
//				tap:function(event, target) {
//					var lvThis = $(target);
//					var lvThisId = lvThis.attr("id");
//					if(lvThisId == "todayStatusDetailCloseBtn") {
//						setTimeout(function() {
//							$todayStatusMap.ui.todayStatusDetailPopupToggle(false);
							
							/** 2019.10.02[한광희] 오늘의 구인현황 상세현황 닫힘 속도 개선으로 인한 주석처리. START */
							// 지도 재조회
							/*var adm_cd = $("#todayStatusSido").val()+$("#todayStatusSgg").val();
							$todayStatusMap.ui.todayStatus(adm_cd);*/
							/** 2019.10.02[한광희] 오늘의 구인현황 상세현황 닫힘 속도 개선으로 인한 주석처리. END */
//						}, 10);
//					}
//				}
//			});
			// 상세현황 버튼 스와이프 기능 END
			/** 오늘의 구인현황 상세화면 관련 Event END */
			
			//2019-09-17 [김남민] (12) 오늘의 전체 일지리현황 팝업 수정. START
			//오늘의 전체 일자리현황 팝업 닫기 버튼
			$(document).on("click", "#myNeighberhoodJobTodayStatusPopup_close", function() {
				//2019-12-26 [김남민] 모바일 > 일자리 맵 > 모바일 홈페이지 [오늘 하루 다시 보지 않기] 추가 START
				//오늘 하루 다시 보지 않기 저장
				if($("#myNeighberhoodJobTodayStatusPopup_check").prop("checked")) {
					common_set_cookie("myNeighberhoodJobTodayStatusPopup_no_today_yn","Y",1);
				}
				else {
					common_remove_cookie("myNeighberhoodJobTodayStatusPopup_no_today_yn");
				}
				//2019-12-26 [김남민] 모바일 > 일자리 맵 > 모바일 홈페이지 [오늘 하루 다시 보지 않기] 추가 END
				
				//오늘의 전체 일자리현황 팝업 닫음
				$todayStatusMap.ui.myNeighberhoodJobTodayStatusPopupToggle(false);
			});
			//2019-09-17 [김남민] (12) 오늘의 전체 일지리현황 팝업 수정. END
		},
		/**
		 * @name : setMapSize
		 * @description : 지도 사이즈 변경
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 */
		setMapSize : function() {
			var lvMapHeight = Number($(window).outerHeight(true)) - Number($(".Wrap>.Header").outerHeight(true));
			$("#map").height(lvMapHeight);
		}
	};
	
}(window, document));	