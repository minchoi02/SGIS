/**
 * 오늘의 구인 현황 서브 스크립트
 * 경로 : 일자리 맵 서비스 > 오늘의 구인 현황 > 
 * 
 * history : 
 *	2018.09.17	ywKim	신규
 *
 * author : ywKim
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$tsSub = W.$tsSub || {};
	
	$tsSub.ui = {
		arrParamSubList : new Array(),
		categories : [],						// 데이터용 카테고리 (챠트 카테고리와 다름) - 2019.01.02	ywKim	추가
		categoryTooltips : [],					// 카테고리의 데이터 구간(기간) - 2019.01.15	ywKim	추가
		data_todayCategories : [],				// 2019.05.14[한광희] 일자리 정보 누락처리(값이 Null일 경우 전일 데이터 사용): 정보를 가진 날짜를 담기위한 변수
		today : "",								// 2019.06.17[한광희] 기간조회 기능 활성화에 따른 변수 선언
		searchDataType : "D",					// 2019.06.17[한광희] 기간조회 기능 활성화에 따른 변수 선언
		//2019-09-03 [김남민] 일자리 맵 > 오늘의 구인현황 > Sub 팝업 에서 차트 선택후 지역 변경시 발생하는 오류 수정. START
		data_today : "",
		//2019-09-03 [김남민] 일자리 맵 > 오늘의 구인현황 > Sub 팝업 에서 차트 선택후 지역 변경시 발생하는 오류 수정. END
		/**
		 * @name         : 화면 띄우기
		 * @description  : 
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param
		 */
		show : function(argParams) {
			$workRoad.ui.showLayer('#tsSub');
			// set Global Param
			this.arrParamSubList = argParams;
						
			// 시도 선택
			this.getSidoList("current", argParams.sido_cd, argParams.sgg_cd, function() {
				
			});
			
			$tsSub.ui.today = argParams.today;						// 2019.06.17[한광희] 기간조회 기능 활성화에 따른 변수 선언
			$tsSub.ui.searchDataType = argParams.search_type;		// 2019.06.17[한광희] 기간조회 기능 활성화에 따른 변수 선언
			
			this.todayStatusDetailList(argParams);
			this.popupIntroChartDetail(argParams);
			//$tsDataBoard.ui.todayStatusSidoDB();
		},
		/**
		 * @name         : 화면 닫기
		 * @description  : 
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param
		 */
		hide : function() {
			$workRoad.ui.hideLayer('#tsSub');
		},
		/**
		 * 시도선택에 따라 동적으로 정보 테이블의 제목 변경
		 * @param adm_cd	: 시도 코드
		 * @param sgg_cd    : 2019.05.13[한광희] 시군구 코드 추가
		 */
		displayTitle : function(adm_cd, sgg_cd) {
			var adm_nm = "전국";
			if (adm_cd != "99") {
				adm_nm = $("#tsSub #current-sido-select-sub option:selected").text();
			}
			
			/** 
			 * 2019.05.13[한광희] 시군구 선택시 해당 시군구 명칭 설정 시작
			 */
			var sgg_nm = "";
			if (sgg_cd != "999") {
				sgg_nm = $("#tsSub #current-sgg-select-sub option:selected").text();
				adm_nm = adm_nm + " " + sgg_nm;
			}
			/** 
			 * 2019.05.13[한광희] 시군구 선택시 해당 시군구 명칭 설정 종료
			 */
			/** 2020.05.11[주형식] 오늘의 일자리 현황 사람인 정보 추가 START */
			/** 2019.06.17[한광희] 오늘의 구인현황 기간조회 활설화에 따른 수정 START */
			if($tsMain.ui.searchDataType == "M"){
				//$("#tsSub #tsTitle").html("워크넷 & 인크루트를 통해 본 이달의 " + adm_nm + " 구인 현황");
				$("#tsSub #tsTitle").html("워크넷 & 인크루트 & 사람인를 통해 본 이달의 " + adm_nm + " 구인 현황");
			} else if($tsMain.ui.searchDataType == "W"){
				//$("#tsSub #tsTitle").html("워크넷 & 인크루트를 통해 본 금주의 " + adm_nm + " 구인 현황");
				$("#tsSub #tsTitle").html("워크넷 & 인크루트 & 사람인를 통해 본 금주의 " + adm_nm + " 구인 현황");
			} else {
				//$("#tsSub #tsTitle").html("워크넷 & 인크루트를 통해 본 오늘의 " + adm_nm + " 구인 현황");
				$("#tsSub #tsTitle").html("워크넷 & 인크루트 & 사람인를 통해 본 오늘의 " + adm_nm + " 구인 현황");
			}
			/** 2019.06.17[한광희] 오늘의 구인현황 기간조회 활설화에 따른 수정 END */
			/** 2020.05.11[주형식] 오늘의 일자리 현황 사람인 정보 추가 END */
		},
		/**
		 * @name         : todayStatusDetailList
		 * @description  : 오늘의 구인현황 상세 조회
		 * @date         : 2018.10.01
		 * @author	     : 현재훈
		 * @history 	 : 
		 * 		2018.10.01	현재훈	신규 작성
		 * 		2019.07.03[한광희]  일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용):정보를 가지고 있는 날짜를 담은 변수 추가
		 * @param param  : 부모전달 조회 조건
		 */
		todayStatusDetailList : function (argParams, data_today) {
			var dataParams = {};
			dataParams = argParams;		
			
			var lenghSggCd = dataParams.sgg_cd;
			if (lenghSggCd.length > 4) {				
				dataParams.sgg_cd = lenghSggCd.substring(2,5);
			}
			/** 2019-04-30[한광희] 읍면동단위 표시를 위한 수정 시작
			 *  시군구 '전체' 선택시 초기값 셋팅
			 */
			else if (lenghSggCd.length == 2) {
				dataParams.sgg_cd = "999";
			}
			/** 2019-04-30[한광희] 읍면동단위 표시를 위한 수정 종료 */
			
			/** 2019.07.03[한광희]  일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용):정보를 가지고 있는 날짜를 담은 변수 추가 START */
			if(data_today != null){
				dataParams.data_today = data_today;
			}
			/** 2019.07.03[한광희]  일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용):정보를 가지고 있는 날짜를 담은 변수 추가 END */
	
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/todayStatus/getTodayStatusDetail.json",
				async: false,
				dataType: "json",
				data: dataParams,
				success: function(res) {
					if (res.errCd == 0) {
						var todayStatusList = res.result.todayStatusList;
						
						/** 2019.06.17[한광희] 기간조회 기능 활성화에 따른 기능 수정 START */
						if($tsSub.ui.searchDataType == "M") {
							$("#tsSub #tsToday").html("[" + $workRoad.util.monthWithSign(res.result.today, ".") + "]");
						} else if($tsSub.ui.searchDataType == "W") {
							$("#tsSub #tsToday").html("[" + $workRoad.util.weekWithSign(res.result.todayYYYYWW, ".") + "]");
						} else {
							$("#tsSub #tsToday").html("[" + $workRoad.util.dateWithSign(res.result.today, ".") + "]");
						}
						/** 2019.06.17[한광희] 기간조회 기능 활성화에 따른 기능 수정 END */
						
						//$("#tsSub #tsToday").html("[" + $workRoad.util.dateWithSign(res.result.today, ".") + "]");	// 2019.06.17[한광희] 기간조회 기능 활성화에 따른 주석처리
						$("#tsSub #tsTable tbody").empty();
						$tsSub.ui.displayTitle(dataParams.sido_cd, dataParams.sgg_cd);	// 2019.05.13[한광희] 시군구 콤보박스 변경에 따른 명칭 설정에 따른 변수 추가(dataParams.sgg_cd)
//									"	<td>" + techCdList[i].s_class_cd + "</td>" +
						for(var i=0; i<todayStatusList.length; i++){
							var html = '';
							html += '<tr>';
							html += '	<td>' +  todayStatusList[i].title_nm + '</td>';
							
							if (todayStatusList[i].title_nm == "전체구인") {
								html += $wrmTodayStatus.ui.getCellHtml({
									value1: todayStatusList[i].corp_cnt,
									value2: todayStatusList[i].corp_cnt_c,
									operation: '%',
									unit: ' 업체',
									icoUnit: '%',
								});
								html += $wrmTodayStatus.ui.getCellHtml({
									value1: todayStatusList[i].rcrit_psn_cnt, 
									value2: todayStatusList[i].rcrit_psn_cnt_c, 
									operation: '%',
									unit: ' 명',
									icoUnit: '%',
								});
							} else {
								html += $wrmTodayStatus.ui.getCellHtml({
									value1: todayStatusList[i].corp_cnt,
									value2: todayStatusList[i].corp_cnt_c,
									unit: ' 업체',
									icoUnit: '개',
								});
								html += $wrmTodayStatus.ui.getCellHtml({
									value1: todayStatusList[i].rcrit_psn_cnt, 
									value2: todayStatusList[i].rcrit_psn_cnt_c, 
									unit: ' 명',
									icoUnit: '명',
								});
							}
							html += '</tr>';
							$("#tsSub #tsTable tbody").append(html);
						}
						
						$workRoad.event.setToolTip(".job-arrow");
						
					} else {
						alert('failed!');
					}
				} ,
				error:function(err) {
					alert(err.responseText);
				}  
			});
		},
		
		/**
		 * @name         : popupIntroChartDetail
		 * @description  : 오늘의 구인현황 상세 조회 (그래프)
		 * @date         : 2018.10.01 
		 * @author	     : 현재훈
		 * @history 	 :
		 * 	2018.12.10	ywKim	변경: 기간(주,달,분기,반기)에 따른 챠트 조회 기능 추가
		 */
		popupIntroChartDetail : function(argParams){
			console.log("$tsSub.ui.popupIntroChartDetail() called.");
			
			var dataParams = {};
			dataParams = argParams;
			
			var lenghSggCd = dataParams.sgg_cd;
			if (lenghSggCd.length > 4) {				
				dataParams.sgg_cd = lenghSggCd.substring(2,5);
			}
			/** 2019-04-30[한광희] 읍면동단위 표시를 위한 수정 시작
			 *  시군구 '전체' 선택시 초기값 셋팅
			 */
			else if (lenghSggCd.length == 2) {
				dataParams.sgg_cd = "999";
			}
			/** 2019-04-30[한광희] 읍면동단위 표시를 위한 수정 종료 */
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/todayStatus/getIntroDataDetail.json",
				async: false,
				dataType: "json",
				data: dataParams,
				success: function(res) {
					if(res.errCd == 0){						
						var introData = res.result.introData;		// 리턴데이터						
						var today = parseInt(res.result.today);	// 현재일자 20180628
						//today = dataParams.today.substring(4,8);	// 현재일자 0628
						var search_type = res.result.search_type;
						var categories = [];
						var tmpCategories = [];
						var categoryTooltips = [];					// 카테고리(Week)툴팁용 - 2019-01-07	ywKim	추가
							
						// to get categories..	(main = sub)					
						var from, to;
						var fromYear, toYear;
						var i;
						var y;						
						if (search_type == "D") {
							from = res.result.data_range.from_value.toDate("yyyymmdd");
							to = res.result.data_range.to_value.toDate("yyyymmdd");
							i = res.result.data_range.from_value.toDate("yyyymmdd");

							while (i <= to) {								
//								console.log(i.yyyymmdd());
								var tmpYmd = i.yyyymmdd();
								categories.push(tmpYmd.substr(4, 2) + "/" + tmpYmd.substr(6, 2));
								tmpCategories.push(tmpYmd);
								i.addDays(1);
							}
							
							$('.mainChart_stepBox #charts_type01').next().click();	// 2019.06.04[한광희] 오늘의 구인형황 하단 1일, 1주, 1달, 3달 버튼 기능 수정:1일 일경우 전체구인수, 전체 구인업체수 차트 표시
							
						} else {
							$('.mainChart_stepBox #charts_type02').next().click();	// 2019.06.04[한광희] 오늘의 구인형황 하단 1일, 1주, 1달, 3달 버튼 기능 수정:1일 일경우 신규구인수, 신규 구인업체수 차트 표시
							
							fromYear = parseInt(res.result.data_range.from_value.substr(0, 4));
							toYear = parseInt(res.result.data_range.to_value.substr(0, 4));
							from = parseInt(res.result.data_range.from_value.substr(4, 2));
							to = parseInt(res.result.data_range.to_value.substr(4, 2));
							
							y = fromYear;
							i = from;
							
							// 카테고리(Week)툴팁용 - 2019-01-07	ywKim	추가
							if (search_type == "W") {
								var fromDate = new Date(res.result.data_range.from_yyyymmdd.substr(0, 4),
														res.result.data_range.from_yyyymmdd.substr(4, 2) - 1,
														res.result.data_range.from_yyyymmdd.substr(6, 2));
								var toDate = new Date(res.result.data_range.from_yyyymmdd.substr(0, 4),
														res.result.data_range.from_yyyymmdd.substr(4, 2) - 1,
														res.result.data_range.from_yyyymmdd.substr(6, 2));
								toDate.addDays(6);
							}
							
							while ((y < toYear) || (y == toYear && i <= to)) {
//								console.log(y + " " + i.pad(2));
								
								switch (search_type) {
								case "W": 
									categories.push(i + "주");
									
									// 년도가 바뀔때 전년도 마지막 주와 다음년도 첫째주를 모두 추가한다.
									if (fromDate.getFullYear() != toDate.getFullYear()) {
										var f = fromDate.yyyymmdd(".");
										var t = fromDate.last_yyyymmdd(".");
										if (f == t) {
											categoryTooltips.push(f);
										} else {
											categoryTooltips.push(f + " ~ " + t);
										}
										
										f = toDate.first_yyyymmdd(".");
										t = toDate.yyyymmdd(".");
										if (f == t) {
											categoryTooltips.push(f);
										} else {
											categoryTooltips.push(f + " ~ " + t);
										}										
									} else {
										// 카테고리(Week)툴팁용 - 2019-01-07	ywKim	추가
										categoryTooltips.push(fromDate.yyyymmdd(".") + " ~ " + toDate.yyyymmdd("."));
									}
									
									fromDate.addDays(7); 
									toDate.addDays(7);
									
									break;								
//								case "W": categories.push(i + "주"); break;
								case "M": 
									if (y > 2018 || (y == 2018 && i > 10)) {	// 조건추가: 2018년 10월 이전 데이터는 의미 없음 - 2018.01.07	ywKim	변경
										categories.push(i + "월"); 
									}
									break;
//								case "M": categories.push(i + "월"); break;
								case "Q": categories.push(y.toString().substr(2, 2) + "." + i + "Q"); break;
								case "H": categories.push(y.toString().substr(2, 2) + "." + i + "H"); break;
								default: categories.push(i + " " + search_type); break;
								}
								
								// 조건추가: 2018년 10월 이전 데이터는 의미 없음 - 2018.01.07	ywKim	변경
								if (search_type == "M") {
									if (y > 2018 || (y == 2018 && i > 10)) {
										tmpCategories.push(y + i.pad(2));
									}
								} else {
									tmpCategories.push(y + i.pad(2));
								}
								
								i++;

								if ((search_type == "W" && i > 53) ||	// ?? 마지막주와 다음해의 첫주에 대한 데이터 처리가 애매모호함.
									(search_type == "M" && i > 12) ||
									(search_type == "Q" && i > 4) ||
									(search_type == "H" && i > 2)) {
									y++;
									i = 1;
								}
							}
						}
//						for(var i=0; i<introData.length; i++){
//							if(i==0) m_class_nm = introData[i].class_nm;
//							data.push(parseFloat(introData[i].sum_cnt));							
//							categories.push(introData[i].reg_dt);
//							tmpCategories.push(introData[i].reg_dt);
//						}
						$tsSub.ui.categories = tmpCategories;			// 2019.01.02	ywKim	추가
						$tsSub.ui.categoryTooltips = categoryTooltips;	// 카테고리의 데이터 구간 - 2019.01.15	ywKim	추가
						
						var lineSeries = [];
						var data = [];
						var m_class_nm = introData[0].class_nm;
						
						// to get series
						var rawDataArr = introData;
						var rawData = null;
						
						var tempData = null;	// 2019.05.13[한광희] 일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용)를 위한 변수 선언
						var j = 0;				// 2019.05.13[한광희] 일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용)를 위한 변수 선언
						
						for (var k = 0; k < tmpCategories.length; k++){
							rawData = $.pick(rawDataArr, {reg_dt: tmpCategories[k]});
							
							if (rawData != undefined) {
								data.push(rawData.corp_irdsrate);
								
								// 2019.05.13[한광희] 일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용) 시작
								tempData = rawData;	
								j = k;
								$tsSub.ui.data_todayCategories.push(tmpCategories[k]);
								// 2019.05.13[한광희] 일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용) 종료
							} else {
								// data.push(0);	// 2019.05.13[한광희] 일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용)에 따른 주석 처리
								
								// 2019.05.13[한광희] 일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용) 시작
								if(tempData != undefined || tempData != null) {
									data.push(tempData.corp_irdsrate);
									
									$tsSub.ui.data_todayCategories.push(tmpCategories[j]);
								} else {
									data.push(0);								
									$tsSub.ui.data_todayCategories.push(tmpCategories[k]);
								}
								// 2019.05.13[한광희] 일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용) 종료
							}
						}
						
						lineSeries.push({
							name: m_class_nm,
							data: data,
						});
					
						
//						var lineSeries = [];
//						var data = [];		
//						var m_class_nm = "";
//						var detail_type = dataParams.series+"-COR";
//						
//						lineSeries.push({
//							name: m_class_nm,
//							data: data
//						});
						
						Highcharts.setOptions({
						    lang: {
						    	numericSymbols: ['천', '백만', '십억', '조', '천조', '백경']
						    }
						});
						$('#tsSub #iaChartBoxSub').highcharts({
							chart: {
								margin:[10,0,30,60],		// 순서 top, right, bottom, left
							    height: '145',//'200'
							    width: '480',
							},	
							colors: ['#ff0000', '#f79339', '#ffc000', '#92d050', '#00b0f0', '#0000FF', '#7030a0'], //2018.01.11 [개발팀] 컬러수정
							tooltip: { 
								enabled: true, 
								shared: true,
								formatter: function () {	// 2018.12.10	ywKim	추가							
									var s = "<span>" + this.x + "</span>";	// 제목
									$.each(this.points, function() {
										s += "<br/>";
										s += "<span style='color:" + this.series.color + "'>" + this.series.name + "</span>: ";
										s += "<b style='font-family:NanumBarunGothic;'>";
										s += $workRoad.util.addComma(this.y);
										s += "</b>";
									});
									return s;
				                }
							},
							title: { text: '' },
							subtitle: { text: '' },
							exporting: { enabled: false },
							xAxis: {
								categories: categories,
								labels: {						// 카테고리(Week)툴팁용 - 2019-01-07	ywKim	추가
					                enabled: true,
					                formatter: function() {
					                	if (categoryTooltips.length > this.pos) {
					                		return '<span title="' + categoryTooltips[this.pos] + '">' + this.value + '</span>';
					                	} else {
					                		return '<span>' + this.value + '</span>';
					                	}
					                },
					                useHTML: true,
					            },
								title: { text: '' },
								gridLineWidth: 1,
								lineWidth: 1,
								lineColor: "#000000",
								tickWidth: 0
							},
							yAxis: {
								min: 0, 
								title: { text: ''},
								labels: { overflow: 'justify' },
								lineWidth: 1,
								lineColor: "#000000",
								tickWidth: 0
							}, 
							plotOptions: {
								series: {
									states: { },
						            cursor: 'pointer',
						            point: {
						                events: {
						                    click: function (e) {
						                    	//$tsSub.ui.selectedDetailPop(this.series.name);
						                    	//지도 데이터 조회
						                    	
						                    	if(dataParams.seriesIndex == '1' || dataParams.seriesIndex == '3'){
						                    		detail_type = dataParams.series+"-PSN";
						                    	} else {
						                    		detail_type = dataParams.series+"-COR";
						                    	}

						                    	// 2019.01.02	ywKim	변경
						                    	var curDate = (this.index < $tsSub.ui.categories.length) ? $tsSub.ui.categories[this.index] : this.category;
						                    	var dateRage = (this.index < $tsSub.ui.categoryTooltips.length) ? $tsSub.ui.categoryTooltips[this.index] : "";

						        				// 2019.03.13 접근log 생성
						        				srvLogWrite('D0', '02', '02', '03', '', '');
						        				
						                    	console.log(this.series + " / " + detail_type + " / "+ curDate);
						                    	// $tsMap.ui.getTodayStatusMapData("", dataParams.sido_cd, detail_type, curDate, search_type, dateRage);	// 2019.01.15	ywKim	변경	|	2019.05.13[한광희] 주석처리
//						                    	$tsMap.ui.getTodayStatusMapData("", dataParams.sido_cd, detail_type, curDate);				// old - 2019.01.15
//						    					$tsMap.ui.getTodayStatusMapData("", dataParams.sido_cd, detail_type, this.category, $wrmTodayStatus.ui.today);	// old
						                    	
						                    	/**
						                    	 * 2019.05.13[한광희] 오늘의 구인현황 SUB 화면 그래프 포인트 클릭에 따른 Map 처리 시작
						                    	 */
						                    	var adm_cd = "";
						                    	if(dataParams.sgg_cd != "999") {
						                    		adm_cd = dataParams.sido_cd + dataParams.sgg_cd; 
						                    	} else {
						                    		adm_cd = dataParams.sido_cd;
						                    	}
						                    	
						                    	// 일자리 누락 처리에 따른 차트에서 실제 날짜 정보를 가져와 변수에 추가
						                    	var data_today = (this.index < $tsSub.ui.data_todayCategories.length) ? $tsSub.ui.data_todayCategories[this.index] : this.data_todayCategories; 
												//2019-09-03 [김남민] 일자리 맵 > 오늘의 구인현황 > Sub 팝업 에서 차트 선택후 지역 변경시 발생하는 오류 수정. START
						                    	$tsSub.ui.data_today = data_today;
						                    	//2019-09-03 [김남민] 일자리 맵 > 오늘의 구인현황 > Sub 팝업 에서 차트 선택후 지역 변경시 발생하는 오류 수정. END
						                    	$tsMap.ui.getTodayStatusMapData("", adm_cd, detail_type, curDate, search_type, dateRage, data_today);
						                    	/**
						                    	 * 2019.05.13[한광희] 오늘의 구인현황 SUB 화면 그래프 포인트 클릭에 따른 Map 처리 종료
						                    	 */
						                    	
						                    	// 오늘의 구인현황 데이터 상세 조회
						                    	$tsSub.ui.arrParamSubList.today = curDate;
						    					$tsSub.ui.todayStatusDetailList($tsSub.ui.arrParamSubList, data_today);	// 2019.07.03 오늘의 구인현황:일자리 정보 누락에 따른 변수 추가 
						                    }
						                }
						            },
						            marker: {
						                lineWidth: 1
						            }
								},
								bar: {
									dataLabels: { enabled: false }
								}
							},
							legend: { 
								enabled: false,
						        align: 'center',
						        verticalAlign: 'bottom',
						        borderWidth: 0
//						        layout: 'vertical',
//						        align: 'right'
//						        verticalAlign: 'middle'
							},
							credits: {  enabled: false },
							series: lineSeries
						});
						Highcharts.setOptions({
						    lang: {
						    	// default
						        numericSymbols: ['k', 'M', 'G', 'T', 'P', 'E']
						    }
						});
						
					} else {
						alert('failed!');
					}
				} ,
				error:function(err) {
					alert(err.responseText);
				}  
			});
		},
		
		//2019-01-09 상세 지역 변경 시 메인에도 반영 처리.
		/**
		 * @name         : setSidoValue
		 * @description  : 지역 값 반영
		 * @date         : 2019. 01. 09. 
		 * @author	     : 김남민
		 * @history 	 :
		 * @param type
		 * @param defaultSido
		 * @param defaultSgg
		 */
		setSidoValue: function(type,defaultSido,defaultSgg) {
			if(type != undefined && type != null && type != "") {
				if(defaultSido != undefined && defaultSido != null && defaultSido != "") {
					$("#"+type+"-sido-select-sub").val(defaultSido);
					$tsSub.ui.getSggList(type, defaultSido, defaultSgg);
				}
				if(defaultSgg != undefined && defaultSgg != null && defaultSgg != "") {
					$("#"+type+"-sgg-select-sub").val(defaultSgg);
				}
			}
		},
		
		/**
		 * @name         : getSidoList
		 * @description  : 지역선택 - 시도 선택시 시군구 목록 조회
		 * @date         : 2018. 10. 01. 
		 * @author	     : 현재훈
		 * @history 	 :
		 * @param type
		 * @param defaultSido
		 * @param defaultSgg
		 * @param callback
		 */
		getSidoList: function(type,defaultSido,defaultSgg,callback) {			
			$("#tsSub #"+type+"-sido-select-sub, #tsSub #"+type+"-sgg-select-sub").prop("disabled",true);
			$.ajax({
				method: "POST",
				async: false,	// 2019.05.14[한광희] 기존 true에서 false로 변경(새로고침 후 처음 페이지 로딩시 '워크넷 & 인크루트를 통해 본 오늘의 OOOOOO 구인 현황' 문구에 시도 정보 미 출력으로 인한 변경)  
				url: contextPath + "/ServiceAPI/map/sidoAddressList.json",
				data: {
					//base_year: $tsSub.ui.mapList[0].bnd_year
					base_year: "2016"
				},
				dataType: "json",
				success: function(res) {
					$("#tsSub #"+type+"-sido-select-sub").empty();
					$("#tsSub #"+type+"-sgg-select-sub").empty();
					if(res.errCd=="0"){
						$("#tsSub #"+type+"-sido-select-sub").append($("<option/>",{text:"전체",value:"99","data-coor-x":"","data-coor-y":""}));
						$("#tsSub #"+type+"-sgg-select-sub").append($("<option/>",{text:"전체",value:"999","data-coor-x":"","data-coor-y":"","data-adm_cd":"999"}));
						
						$.each(res.result.sidoList,function(cnt,node){
							if(defaultSido==node.sido_cd){
								$tsSub.ui.getSggList(type, node.sido_cd, defaultSgg);
							}
							$("#tsSub #"+type+"-sido-select-sub").append($("<option/>",{text:node.sido_nm,value:node.sido_cd,selected:(defaultSido==node.sido_cd),"data-coor-x":node.x_coor,"data-coor-y":node.y_coor}));
						});
					}
					
					$("#tsSub #"+type+"-sido-select-sub, #tsSub #"+type+"-sgg-select-sub").prop("disabled",false);
					//2019-06-21 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START
					if(gv_url == "todayStatus" && (gv_type == "full" || gv_type == "lnb") && gv_sido_cd != "" && gv_sido_cd != "99") {
						// 시도 콤보박스 disable 처리
						//$("#tsSub #"+type+"-sido-select-sub").css("background-color","#EEEEEE !important"); //이미 background-color가 !important로 선언된게 있어서 Chrome에서 동작안함.
						var lvTempStyle = $("#tsSub #"+type+"-sido-select-sub").attr("style");
						if(lvTempStyle == undefined) lvTempStyle = "";
						$("#tsSub #"+type+"-sido-select-sub").attr("style","background-color:#EEEEEE !important;"+lvTempStyle);
						$("#tsSub #"+type+"-sido-select-sub").prop("disabled",true);
						$("#tsSub #"+type+"-sido-select-sub").css("cursor","auto");
					}
					//2019-06-21 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. END
					if(typeof callback === "function"){
						callback();
					}
				},
				error: function(e) {
					$("#tsSub #"+type+"-sido-select-sub, #tsSub #"+type+"-sgg-select-sub").prop("disabled",false);
				}
			});
		},
		
		/**
		 * @name             : $houseAnalysisMap.leftmenu.getSggList
		 * @description      : 시군구리스트
		 * @date             : 2018. 10. 01. 
		 * @author	         : 현재훈
		 * @history          :
		 * @param type       : 'current' 주거현황보기 'inter-recommend' 추천지역찾기의 관심지역 
		 * @param sido_cd    : 시도 코드
		 * @param defaultSgg : 처음 셋팅해줄 시군구 코드
		 * @param callback   : callback
		 */
		getSggList: function(type,sido_cd,defaultSgg,callback) {
			$("#tsSub #"+type+"-sgg-select-sub").prop("disabled",true);
			$.ajax({
				method: "POST",
				async: false,	// 2019.05.14[한광희] 기존 true에서 false로 변경(새로고침 후 처음 페이지 로딩시 '워크넷 & 인크루트를 통해 본 오늘의 OOOOOO 구인 현황' 문구에 시도 정보 미 출력으로 인한 변경) 
				url: contextPath + "/ServiceAPI/map/sggAddressList.json",
				data: {
					sido_cd: sido_cd,
					base_year: "2016"
				},
				dataType: "json",
				success: function(res) {
					$("#tsSub #"+type+"-sgg-select-sub").empty();
					if(res.errCd=="0"){
						var coorX = $("#tsSub #current-sido-select-sub option:selected").data("coor-x");
						var coorY = $("#tsSub #current-sido-select-sub option:selected").data("coor-y");
						$("#tsSub #"+type+"-sgg-select-sub").append($("<option/>",{text:"전체",value:"999","data-coor-x":coorX,"data-coor-y":coorY, "data-adm_cd":sido_cd}));  // 2017-08-17 [개발팀] 전체일 때 data-adm_cd 값 추가
						$.each(res.result.sggList,function(cnt,node){
							//2017.05.29 [개발팀] 지자체 URL 추가 - 비자치구 코드 추가
							$("#tsSub #"+type+"-sgg-select-sub").append($("<option/>",{text:node.sgg_nm,value:node.sgg_cd,selected:(defaultSgg==node.sgg_cd),"data-coor-x":node.x_coor,"data-coor-y":node.y_coor,"data-adm_cd":sido_cd+node.sgg_cd}));
						});
						if("policy"==type || "current" == type){ //2017.05.29 [개발팀] 지역별 수요변화 비자치구추가
							if($psmCombine.ui.atdrcList[sido_cd]){
								$.each($psmCombine.ui.atdrcList[sido_cd],function(sidoCnt,sidoNode){
									var op,index,empty = true;
									$.each(this.sgg_list,function(cnt,node){
										op = $("#tsSub #"+type+"-sgg-select-sub option[value="+node+"]");
										if(op.length>0){
											empty = false;
											if(index==undefined){
												index = op.index();
											}else{
												index = Math.min(index,op.index());
											}
										}
									});
									if(!empty){
										//2017.05.29 [개발팀] 지자체 URL 추가 - 비자치구 코드 추가
										$("#tsSub #"+type+"-sgg-select-sub option:eq("+index+")").before($("<option/>",{text:sidoNode.sgg_nm,value:sidoNode.sgg_list.join(","),"data-coor-x":op.data("coor-x"),"data-coor-y":op.data("coor-y"), "data-adm_cd":sidoNode.adm_cd}));
									}
								});
							}
						}

					}else if(res.errCd=="-401"){
						accessTokenInfo(function() {
							$tsSub.ui.getSggList(type,sido_cd,defaultSgg);
						});
					}
					$("#tsSub #"+type+"-sgg-select-sub").prop("disabled",false);
					if(typeof callback === "function"){
						callback();
					}
				},
				error: function(e) {
					$("#tsSub #"+type+"-sgg-select-sub").prop("disabled",false);
				}
			});
		},				
		
	};	
	
	$tsSub.event = {
			/**
			 * @name		 : 이벤트 바인딩 
			 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
			 * @date		 : 2018.09.17
			 * @author		 : ywKim
			 * @history 	 :
			 * 		2018.09.17	ywKim	신규
			 */
			setUIEvent: function() {
				console.log("■$tsSub.event.setUIEvent() called.");
			
				//시도 콤보박스 이벤트
				$workRoad.event.set("change", "#tsSub #current-sido-select-sub", function(){
					var type = $(this).data("type");
					var sido_cd = $(this).val();
					//2019-09-03 [김남민] 일자리 맵 > 오늘의 구인현황 > Sub 팝업 에서 차트 선택후 지역 변경시 발생하는 오류 수정. START
					var data_today = null;
					if($tsSub.ui.data_today != "") data_today = $tsSub.ui.data_today;
					//2019-09-03 [김남민] 일자리 맵 > 오늘의 구인현황 > Sub 팝업 에서 차트 선택후 지역 변경시 발생하는 오류 수정. END
					
					$wrmTodayStatus.ui.sido_nm = $(this).find("option:selected").text();
					$tsSub.ui.getSggList($(this).data("type"), sido_cd, "");
					$tsSub.ui.arrParamSubList.sido_cd = sido_cd;
					$tsSub.ui.arrParamSubList.sgg_cd = '999';
					
					//손원웅_임시 추가 20181114
					$tsMain.ui.tsMain_coor_x = $(this).find('option:selected').data('coor-x');
					$tsMain.ui.tsMain_coor_y = $(this).find('option:selected').data("coor-y");
					
					// 2019.03.13 접근log 생성
					srvLogWrite('D0', '02', '01', '02', '', 'sido_cd='+sido_cd);
					
					// 오늘의 구인현황 데이터 상세 조회
					//2019-09-03 [김남민] 일자리 맵 > 오늘의 구인현황 > Sub 팝업 에서 차트 선택후 지역 변경시 발생하는 오류 수정. START
					$tsSub.ui.todayStatusDetailList($tsSub.ui.arrParamSubList, data_today);
					//2019-09-03 [김남민] 일자리 맵 > 오늘의 구인현황 > Sub 팝업 에서 차트 선택후 지역 변경시 발생하는 오류 수정. END
					// 차트 데이터 상세 조회
					$tsSub.ui.popupIntroChartDetail($tsSub.ui.arrParamSubList);
					
					// 지도 데이터 상세조회
					var detail_type = "";
					if($tsSub.ui.arrParamSubList.seriesIndex == '1' || $tsSub.ui.arrParamSubList.seriesIndex == '3'){
                		detail_type = $tsSub.ui.arrParamSubList.series+"-PSN";
                	} else {
                		detail_type = $tsSub.ui.arrParamSubList.series+"-COR";
                	}
					//2019-09-03 [김남민] 일자리 맵 > 오늘의 구인현황 > Sub 팝업 에서 차트 선택후 지역 변경시 발생하는 오류 수정.START
                	$tsMap.ui.getTodayStatusMapData("", $tsSub.ui.arrParamSubList.sido_cd, detail_type, $wrmTodayStatus.ui.selected_today, $tsSub.ui.searchDataType, null, data_today);	// 2019.06.17[한광희] 오늘의 구인현황 기간조회 기능 활성화에 따른 기능 수정:$tsSub.ui.searchDataType 변수 추가
					//2019-09-03 [김남민] 일자리 맵 > 오늘의 구인현황 > Sub 팝업 에서 차트 선택후 지역 변경시 발생하는 오류 수정.END
					//2019-01-09 상세 지역 변경 시 메인에도 반영 처리.
					$tsMain.ui.setSidoValue($(this).data("type"), $(this).val());
					
					/**
					 * 2019.05.13[한광희] 오늘의 구인현황 상세 시도 변경시 메인화면 정보 변경 처리 시작
					 */
					// 오늘의 구인현황 데이터 조회
					$tsMain.ui.todayStatusList(sido_cd);
					// 차트 데이터 조회
					$tsMain.ui.popupIntroChart({adm_cd: sido_cd});
					/**
					 * 2019.05.13[한광희] 오늘의 구인현황 상세 시도 변경시 메인화면 정보 변경 처리 종료
					 */
				});
				
				//시군구 콤보박스 이벤트
				$workRoad.event.set("change", "#tsSub #current-sgg-select-sub", function(){
					//2019-09-03 [김남민] 일자리 맵 > 오늘의 구인현황 > Sub 팝업 에서 차트 선택후 지역 변경시 발생하는 오류 수정. START
					var data_today = null;
					if($tsSub.ui.data_today != "") data_today = $tsSub.ui.data_today;
					//2019-09-03 [김남민] 일자리 맵 > 오늘의 구인현황 > Sub 팝업 에서 차트 선택후 지역 변경시 발생하는 오류 수정. END
					var sgg_cd = $("#tsSub #current-sgg-select-sub option:selected").attr("data-adm_cd");
					$tsSub.ui.arrParamSubList.sgg_cd = sgg_cd;

					// 오늘의 구인현황 데이터 상세 조회
					//2019-09-03 [김남민] 일자리 맵 > 오늘의 구인현황 > Sub 팝업 에서 차트 선택후 지역 변경시 발생하는 오류 수정. START
					$tsSub.ui.todayStatusDetailList($tsSub.ui.arrParamSubList, data_today);
					//2019-09-03 [김남민] 일자리 맵 > 오늘의 구인현황 > Sub 팝업 에서 차트 선택후 지역 변경시 발생하는 오류 수정. END
					// 차트 데이터 상세 조회
					$tsSub.ui.popupIntroChartDetail($tsSub.ui.arrParamSubList);
					
					/** 2019-04-30[한광희] 읍면동단위 표시를 위한 수정 시작
					 *  시군구 콤보박스 선택시 지도에 읍면동단위 표시 
					 */
					$wrmTodayStatus.ui.sgg_nm = $(this).find("option:selected").text();	// 2019.05.13[한광희] 지역(시군구) 선택시 데이터보드 지역항목에 시군구 명칭 설정
					
					// 지도 데이터 상세조회
					var detail_type = "";
					if($tsSub.ui.arrParamSubList.seriesIndex == '1' || $tsSub.ui.arrParamSubList.seriesIndex == '3'){
                		detail_type = $tsSub.ui.arrParamSubList.series+"-PSN";
                	} else {
                		detail_type = $tsSub.ui.arrParamSubList.series+"-COR";
                	}
					//2019-09-03 [김남민] 일자리 맵 > 오늘의 구인현황 > Sub 팝업 에서 차트 선택후 지역 변경시 발생하는 오류 수정. START
					$tsMap.ui.getTodayStatusMapData("", sgg_cd, detail_type, $wrmTodayStatus.ui.selected_today, $tsSub.ui.searchDataType, null, data_today);	// 2019.06.17[한광희] 오늘의 구인현황 기간조회 기능 활성화에 따른 기능 수정:$tsSub.ui.searchDataType 변수 추가
					//2019-09-03 [김남민] 일자리 맵 > 오늘의 구인현황 > Sub 팝업 에서 차트 선택후 지역 변경시 발생하는 오류 수정. END
					/** 2019-04-30[한광희] 읍면동단위 표시를 위한 수정 종료 */
					
					//2019-01-09 상세 지역 변경 시 메인에도 반영 처리.
					//$tsMain.ui.setSidoValue($("#tsSub #current-sido-select-sub").data("type"), $("#tsSub #current-sido-select-sub").val(), $(this).val());
                    $tsMain.ui.setSidoValue($("#tsSub #current-sido-select-sub").data("type"), null, $(this).val());
					
					// 2019.03.13 접근log 생성
					var slwParams = "";
					slwParams += 'sido_cd=' + $("#current-sido-select-sub").find("option:selected").val() +',';
				    slwParams += 'sgg_cd='  + $("#current-sgg-select-sub").find("option:selected").val();
					srvLogWrite('D0', '02', '01', '03', '', slwParams);
					
					/**
					 * 2019.05.13[한광희] 오늘의 구인현황 상세 시군구 변경시 메인화면 정보 변경 처리 시작
					 */
					// 오늘의 구인현황 데이터 조회
					$tsMain.ui.todayStatusList(sgg_cd);
					// 차트 데이터 조회
					$tsMain.ui.popupIntroChart({adm_cd: sgg_cd});
					/**
					 * 2019.05.13[한광희] 오늘의 구인현황 상세 시군구 변경시 메인화면 정보 변경 처리 종료
					 */

				});
				
				// 닫기 버튼
				$workRoad.event.set("click", "#tsSub .topbar a", function() {
					$tsMain.ui.show();
				});
				
				// 기간 버튼 클릭
				$workRoad.event.set("click", "#tsSub .date-list li", function(){
					var searchType = $(this).find("a").attr("data-val");
					$tsSub.ui.arrParamSubList.search_type = searchType;

					// 2019.01.15	ywKim	추가
					var sido_cd = $("#tsSub #current-sido-select-sub option:selected").val();
					$tsSub.ui.arrParamSubList.sido_cd = sido_cd;
					$tsSub.ui.arrParamSubList.sgg_cd = '999';
					// old - 2019.01.15
//					var sgg_cd = $("#tsSub #current-sgg-select-sub option:selected").attr("data-adm_cd");
//					$tsSub.ui.arrParamSubList.sgg_cd = sgg_cd;
					
					// 차트 데이터 조회
					$tsSub.ui.popupIntroChartDetail($tsSub.ui.arrParamSubList);
					
					// 2019.03.13 접근log 생성
					switch (searchType) {
						case "D": 
							srvLogWrite('D0', '02', '01', '06', '', '');
					    	break;
						case "W": 
							srvLogWrite('D0', '02', '01', '07', '', '');
					    	break;
						case "M": 
							srvLogWrite('D0', '02', '01', '08', '', '');
					    	break;
						case "Q": 
					    	break;
						case "H": 
					    	break;
					    default : 
					    	break;
					};
					
				});				
			},			
	}
	
}(window, document));