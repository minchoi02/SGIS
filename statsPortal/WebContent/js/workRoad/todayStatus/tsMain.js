/**
 * 오늘의 구인 현황 메인 스크립트
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
	W.$tsMain = W.$tsMain || {};
	
	$tsMain.ui = {		
		noReverseGeoCode : true,
		defaultSidoCd : "99",			//기본 시도 코드 : 99:전체
		defaultSggCd : null,			//기본 시군구 코드
		arrParamList : new Array(), 	// 조회된 파라미터 정보배열     //2017.09.06 [개발팀] 조회기능추가
		dataList : [],
		defaultDetailType : "ALL-COR",	//기본 차트 종류(ALL-COR, ALL-PSN, NEW-COR, NEW-PSN)
		tsMain_coor_x : "",
		tsMain_coor_y : "",
		searchDataType : "",			// 2019.06.17[한광희] 오늘의 구인현황 기간조회 기능 활성화에 따른 변수 추가
		mapDate_value : "",				// 2019.06.19[한광희] 오늘의 구인현황 기간조회 기능 활성화에 따른 변수 추가
		showNumber_click : null,        // 2020.03.27 이금은 '통계표출' 기능 추가

		ready : function() {
			//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START
			if(gv_url == "todayStatus" && (gv_type == "full" || gv_type == "lnb") && gv_sido_cd != "") {
				this.defaultSidoCd = gv_sido_cd;
				if(gv_sgg_cd != "" && gv_sgg_cd != "999") this.defaultSggCd = gv_sgg_cd;
				else this.defaultSggCd = "";
			}
			//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. END
			
			if ($('#tsMain').css('display') != 'none') {
				return;
			}
			
			// 시도 선택
			var sido_cd = this.defaultSidoCd;
			var sgg_cd = this.defaultSggCd;
			this.getSidoList("current", sido_cd, sgg_cd, function() {
				
			});
			
			//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START
			if(gv_url == "todayStatus" && (gv_type == "full" || gv_type == "lnb") && gv_sido_cd != "") {
				// 오늘의 구인현황 데이터 조회
				this.todayStatusList(this.defaultSidoCd+this.defaultSggCd);
			}
			else {
				// 오늘의 구인현황 데이터 조회
				this.todayStatusList();
			}
			//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. END
			
			//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START
			if(gv_url == "todayStatus" && (gv_type == "full" || gv_type == "lnb") && gv_sido_cd != "") {
				// 오늘의 구인현황 데이터 조회
				this.popupIntroChart({adm_cd : this.defaultSidoCd+this.defaultSggCd});
			}
			else {
				// 차트 데이터 조회
				this.popupIntroChart();
			}
			//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. END
			
			//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START
			if(gv_url == "todayStatus" && (gv_type == "full" || gv_type == "lnb") && gv_sido_cd != "") {
				if(this.defaultSggCd != "") {
					$tsMain.ui.tsMain_coor_x = $("#tsMain #current-sgg-select").find('option:selected').data('coor-x');
					$tsMain.ui.tsMain_coor_y = $("#tsMain #current-sgg-select").find('option:selected').data("coor-y");
				}
				else {
					$tsMain.ui.tsMain_coor_x = $("#tsMain #current-sido-select").find('option:selected').data('coor-x');
					$tsMain.ui.tsMain_coor_y = $("#tsMain #current-sido-select").find('option:selected').data("coor-y");
				}
				
				if(gv_coord_x != "" && gv_coord_x_first_yn == "Y") {
					gv_coord_x_first_yn = "N";
					$tsMain.ui.tsMain_coor_x = gv_coord_x;
				}
				if(gv_coord_y != "" && gv_coord_y_first_yn == "Y") {
					gv_coord_y_first_yn = "N";
					$tsMain.ui.tsMain_coor_y = gv_coord_y;
				}
				
				// map 데이터 조회
				$tsMap.ui.getTodayStatusMapData("", this.defaultSidoCd+this.defaultSggCd, $tsMain.ui.defaultDetailType, $wrmTodayStatus.ui.today);
			}
			else {
				// map 데이터 조회
				$tsMap.ui.getFirstMapDataLoad("", $wrmTodayStatus.ui.today);	// wrmTodayStatus.js에서 이동 / today 추가 - 2018.11.08	ywKim	변경
				//$tsMap.ui.getFirstMapDataLoad(null,null);
			}
			//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. END
			
			$tsMain.ui.show();
			
//			// 2019.03.13 접근log 생성
//			srvLogWrite('D0', '02', '01', '01', '', '');
//			srvLogWrite('D0', '02', '01', '02', '', 'sido_cd='+sido_cd);
//			srvLogWrite('D0', '02', '01', '03', '', 'sido_cd='+sido_cd+',sgg_cd='+sgg_cd);
//			srvLogWrite('D0', '02', '01', '04', '', '');
//			srvLogWrite('D0', '02', '01', '06', '', '');

		},		
		/**
		 * @name         : 화면 띄우기
		 * @description  : 
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param
		 */
		show : function() {			
			$workRoad.ui.showLayer('#tsMain', {
				scrollOptions: {
					key:$('#tsMain'), 
					target:$('#tsMain .cont-box'), 
					mCustom : true,
					maxHeight : 560
				}
			});
			
			$workRoad.ui.toggleLayer("#tsMain", true);
			
			//시각화 위치 조정
			//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START
			if(gv_type != "full") {
				$("#view1 .sop-left .sop-control").css("left", $("#tsMain").css("left"));
			}
			//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. END
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
			$workRoad.ui.hideLayer('#tsMain');
		},
		/**
		 * 시도선택에 따라 동적으로 정보 테이블의 제목 변경
		 * @param adm_cd	: 시도 코드
		 * @param sgg_cd    : 2019.05.13[한광희] 시군구 코드 추가
		 */
		displayTitle : function(adm_cd, sgg_cd) {
			var adm_nm = "전국";
			
			if (adm_cd != "99") {
				adm_nm = $("#tsMain #current-sido-select option:selected").text();
			}
			
			/** 
			 * 2019.05.13[한광희] 시군구 선택시 해당 시군구 명칭 설정 시작
			 */
			var sgg_nm = "";
			if (sgg_cd != "999") {
				sgg_nm = $("#tsMain #current-sgg-select option:selected").text();
				adm_nm = adm_nm + " " + sgg_nm;
			}
			/** 
			 * 2019.05.13[한광희] 시군구 선택시 해당 시군구 명칭 설정 종료
			 */
			
			/** 2020.05.11[주형식] 오늘의 일자리 현황 사람인 정보 추가 START */
			/** 2019.06.17[한광희] 오늘의 구인현황 기간조회 활설화에 따른 수정 START */
			if($tsMain.ui.searchDataType == "W"){
				//$("#tsMain #tsTitle").html("워크넷 & 인크루트를 통해 본 금주의 " + adm_nm + " 구인 현황");
				$("#tsMain #tsTitle").html("워크넷 & 인크루트 & 사람인을 통해 본 금주의 " + adm_nm + " 구인 현황");
			} else if($tsMain.ui.searchDataType == "M"){
				//$("#tsMain #tsTitle").html("워크넷 & 인크루트를 통해 본 이달의 " + adm_nm + " 구인 현황");
				$("#tsMain #tsTitle").html("워크넷 & 인크루트 & 사람인을 통해 본 이달의 " + adm_nm + " 구인 현황");
			} else {
				//$("#tsMain #tsTitle").html("워크넷 & 인크루트를 통해 본 오늘의 " + adm_nm + " 구인 현황");
				$("#tsMain #tsTitle").html("워크넷 & 인크루트 & 사람인을 통해 본 오늘의 " + adm_nm + " 구인 현황");
			}
			/** 2019.06.17[한광희] 오늘의 구인현황 기간조회 활설화에 따른 수정 END */
			/** 2020.05.11[주형식] 오늘의 일자리 현황 사람인 정보 추가 END */
		},
		
		/**
		 * @name         : todayStatusList
		 * @description  : 오늘의 구인현황 조회
		 * @date         : 2018.10.01
		 * @author	     : 현재훈
		 * @param        : adm_cd - 시도/시군군 코드
		 * @history 	 : 
		 * 		2018.09.17	ywKim	신규
		 */
		todayStatusList : function (adm_cd) {
			var dataParams = {};
//			dataParams.today = "20180628";						
			dataParams.sido_cd = "99";
			dataParams.sgg_cd = "999";
			
			/** 2019.06.17[한광희] 오늘의 구인현황 기간조회 기능 활성화에 따늘 수정 START */
			if($tsMain.ui.searchDataType != ""){
				dataParams.search_type = $tsMain.ui.searchDataType;				
			}
			/** 2019.06.17[한광희] 오늘의 구인현황 기간조회 기능 활성화에 따늘 수정 END */
			
			if (adm_cd != 00 && adm_cd != undefined && adm_cd != null) {				
				switch(adm_cd.length) {
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
			}
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/todayStatus/getTodayStatus.json",
				async: false,
				dataType: "json",
				data: dataParams,
				success: function(res) {			    				     
					if (res.errCd == 0) {
						var todayStatusList = res.result.todayStatusList;
						
						/** 2019.06.17[한광희] 기간조회 기능 활성화에 따른 기능 수정 START */
						if($tsMain.ui.searchDataType == "W") {
							$("#tsMain #tsToday").html("[" + $workRoad.util.weekWithSign(res.result.todayStatusList[0].reg_dt, ".") + "]");
							$tsMain.ui.mapDate_value = res.result.todayStatusList[0].reg_dt;	// 지도 튤팁 날짜
						} else if($tsMain.ui.searchDataType == "M") {
							$("#tsMain #tsToday").html("[" + $workRoad.util.monthWithSign(res.result.today, ".") + "]");
							$tsMain.ui.mapDate_value = res.result.today;		// 지도 튤팁 날짜
						} else {
							$("#tsMain #tsToday").html("[" + $workRoad.util.dateWithSign(res.result.today, ".") + "]");
							$tsMain.ui.mapDate_value = $wrmTodayStatus.ui.today;		// 지도 튤팁 날짜
						}
						/** 2019.06.17[한광희] 기간조회 기능 활성화에 따른 기능 수정 END */												
						
						// $("#tsMain #tsToday").html("[" + $workRoad.util.dateWithSign(res.result.today, ".") + "]");		// 2019.06.17[한광희] 기간조회 기능 활성화에 따른 주석처리
						$("#tsMain #tsTable tbody").empty();
						$tsMain.ui.displayTitle(dataParams.sido_cd, dataParams.sgg_cd);	// 2019.05.13[한광희] 시군구 콤보박스 변경에 따른 명칭 설정에 따른 변수 추가(dataParams.sgg_cd)
						
						for(var i = 0; i < todayStatusList.length; i++){
							var html = $wrmTodayStatus.ui.getRowHtml(todayStatusList[i]);							
							$("#tsMain #tsTable tbody").append(html);
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
		 * @name         : popupIntroChart
		 * @description  : 오늘의구인현황 차트조회
		 * @date         : 2018. 10. 01. 
		 * @author	     : 현재훈
		 * @history 	 :
		 * 	2018.12.10	ywKim	변경: 기간(주,달,분기,반기)에 따른 챠트 조회 기능 추가
		 * @param today
		 */
		popupIntroChart : function(pParams){
			
			var dataParams = {};
//			dataParams.today = "20180628";						
			dataParams.sido_cd = "99";
			dataParams.sgg_cd = "999";
			dataParams.search_type = "D";
			
			if (pParams != undefined) {
				if (pParams.adm_cd != 00 && pParams.adm_cd != undefined && pParams.adm_cd != null) {
					switch(pParams.adm_cd.length) {
						case 2:
							dataParams.sido_cd = pParams.adm_cd;
							break;
						case 5:
							dataParams.sido_cd = pParams.adm_cd.substring(0,2);
							dataParams.sgg_cd = pParams.adm_cd.substring(2,5);
							break;
						case 7:
							break;
					}
				}
				
				if (pParams.search_type != undefined)
					dataParams.search_type = pParams.search_type;
			}
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/todayStatus/getIntroData.json",
				async: false,
				dataType: "json",
				data: dataParams,
				success: function(res) {
					if(res.errCd == 0){
						$('#tsMain #iaChartBoxMain2').hide(); // 화면 숨김

					    // 2019.04.18 접근log 생성
					    srvLogWrite('D0', '02', '01', '09', 'sido_cd:'+dataParams.sido_cd+', '
                                 						   + 'sgg_cd:'+dataParams.sgg_cd+', '
					    		                           + 'charts_type:'+$("input:radio[name='charts_type']:checked").val()+', '
					    		                           + 'search_type:'+dataParams.search_type
					    		                           , JSON.stringify(dataParams));
					     
						var introData = res.result.introData;		// 리턴데이터
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

//							$('.mainChart_stepBox #charts_type01').next().click();	// 2019.06.04[한광희] 오늘의 구인형황 하단 1일, 1주, 1달, 3달 버튼 기능 수정:1일 일경우 전체구인수, 전체 구인업체수 차트 표시
							
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
						
						// to get series base data
						var last_reg_dt = introData[introData.length - 1].reg_dt;
						var seriesRawData = $.pick(introData, {reg_dt: last_reg_dt});
						var lineSeries = [];
						//2019-01-18 오늘의 구인 현황 메인차트 수정. 전체 신규 차트 분리 라디오 제어.
						var lineSeries1 = [];
						var lineSeries2 = [];
						var data = [];

						// to get series
						for (var i = 0; i < seriesRawData.length; i++) {
							data = [];
							var rawDataArr = $.pick(introData, {rank: i});
							var rawData = null;
							
							var tempData = null;	// 2019.05.13[한광희] 일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용)를 위한 변수 선언
							
							for (var k = 0; k < tmpCategories.length; k++){
								if (rawDataArr.length != undefined) {// 데이터가 2묶음 이상인 경우
									rawData = $.pick(rawDataArr, {reg_dt: tmpCategories[k]});
									
									// 2019.05.13[한광희] 일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용) 시작
									if(search_type == "D") {
										if(rawData != undefined) {
											tempData = rawData;										
										}										
									}
									// 2019.05.13[한광희] 일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용) 종료
								} else if (k == tmpCategories.length - 1) {
									rawData = rawDataArr;
									
									// 2019.05.13[한광희] 일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용) 시작
									if(search_type == "D") {
										if(rawData != undefined) {
											tempData = rawData;										
										}
									}
									// 2019.05.13[한광희] 일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용) 종료
								} else {
									rawData = undefined;
									
									// 2019.05.13[한광희] 일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용) 시작
									if(search_type == "D") {
										if(rawData != undefined) {
										tempData = rawData;										
										}
									}
									// 2019.05.13[한광희] 일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용) 종료
								}
								
								if (rawData != undefined) {
									data.push(rawData.corp_irdsrate);
								} else {
									// data.push(0);	// 2019.05.13[한광희] 일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용)에 따른 주석 처리
									
									// 2019.05.13[한광희] 일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용) 시작
									if(search_type == "D") {
										if(tempData != undefined || tempData != null) {
											data.push(tempData.corp_irdsrate);
										} else {
											data.push(0);										
										}										
									} else {
										data.push(0);
									}
									// 2019.05.13[한광희] 일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용) 종료
								}
							}
							
							lineSeries.push({
								name: seriesRawData[i].class_nm,
								data: data
								//2019-01-15 메인차트 Y축 왼쪽 전체, 우측 신규로 나누기.
								//2019-01-18 오늘의 구인 현황 메인차트 수정. 전체 신규 차트 분리 라디오 제어.
								//yAxis: (seriesRawData[i].class_nm.indexOf("전체") != -1) ? 0 : 1
							});
							
							//2019-01-18 오늘의 구인 현황 메인차트 수정. 전체 신규 차트 분리 라디오 제어.
							if(seriesRawData[i].class_nm.indexOf("전체") > -1) {
								lineSeries1.push({
									name: seriesRawData[i].class_nm,
									data: data
								});						
							}
							
							//2019-01-18 오늘의 구인 현황 메인차트 수정. 전체 신규 차트 분리 라디오 제어.
							if(seriesRawData[i].class_nm.indexOf("신규") > -1) {
								lineSeries2.push({
									name: seriesRawData[i].class_nm,
									data: data
								});
							}
						}
						
						var chartMargin = [];
						//2019-01-15 메인차트 Y축 왼쪽 전체, 우측 신규로 나누기.
						//2019-01-18 오늘의 구인 현황 메인차트 수정. 전체 신규 차트 분리 라디오 제어.
						if (search_type == "W") {
							chartMargin = [10,5,50,60];// 순서 top, right, bottom, left
						} else {
							chartMargin = [10,5,50,50];
						}
						
						Highcharts.setOptions({
						    lang: {
						    	numericSymbols: ['천', '백만', '십억', '조', '천조', '백경']
						    }
						});
						//2019-01-18 오늘의 구인 현황 메인차트 수정. 전체 신규 차트 분리 라디오 제어.
						//통합차트(안씀)
//						$('#tsMain #iaChartBoxMain').highcharts({
//							chart: {
//								margin:chartMargin,
//							    height: '250'//'400'
//							},	
//							showFirstLabel: false,
//							colors: ['#ff0000', '#f79339', '#ffc000', '#92d050', '#00b0f0', '#0000FF', '#7030a0'], //2018.01.11 [개발팀] 컬러수정
//							tooltip: { 
//								shared: true, 
//								crosshairs: true,
//								formatter: function () {	// 2018.12.10	ywKim	추가							
//									var s = "<span>" + this.x + "</span>";	// 제목
//									$.each(this.points, function() {
//										s += "<br/>";
//										s += "<span style='color:" + this.series.color + "'>" + this.series.name + "</span>: ";
//										s += "<b style='font-family:NanumBarunGothic;'>";
//										s += $workRoad.util.addComma(this.y);
//										s += "</b>";
//									});
//									return s;
//				                }
//							},
//							title: { text: '' },
//							subtitle: { text: '' },
//							exporting: { enabled: false },							
//							xAxis: {
//								categories: categories,//tmpCategories,
//					            labels: {						// 카테고리(Week)툴팁용 - 2019-01-07	ywKim	추가
//					                enabled: true,
//					                formatter: function() {
//					                	if (categoryTooltips.length > this.pos) {
//					                		return '<span title="' + categoryTooltips[this.pos] + '">' + this.value + '</span>';
//					                	} else {
//					                		return '<span>' + this.value + '</span>';
//					                	}
//					                },
//					                useHTML: true,
//					            },
//								title: { text: '' },// '일자'
//								gridLineWidth: 1,
//								lineWidth: 1,
//								lineColor: "#000000",
//								tickWidth: 0
//								/*min: 0,
//								max: 3,
//								scrollbar: {
//						            enabled: true
//						        },
//						        tickLength: 0,*/	// 스크롤 작동 안함 [참고 : https://jsfiddle.net/BhavyaAprajita/zja90wf2/1/]
//							},
//							//2019-01-15 메인차트 Y축 왼쪽 전체, 우측 신규로 나누기.
//							//2019-01-18 오늘의 구인 현황 메인차트 수정. 전체 신규 차트 분리 라디오 제어.
//							yAxis: {
//								//min: 0,
//								title: { text: ''},
//								lineWidth: 1,
//								lineColor: "#000000",
//								tickWidth: 0
//							}, 
//							plotOptions: {								
//								series: {
//									//allowPointSelect : true,
//									//states: { },
//						            cursor: 'pointer',
//						            point: {
//						                events: {						                	
//						                    click: function (e) {						                    	
//						                    	//console.log(this.series.name + " / " + this.series.index + " / " + e.currentTarget.index + " / " + e.point.series.index + " / " + this.series.data.name);
//						                    	if(this.series.name.indexOf("전체") != -1){
//						                    		dataParams.series = "ALL";						                    							                    	
//						                    	}else{
//						                    		dataParams.series = "NEW";
//						                    	}	
//						                    	dataParams.today = $wrmTodayStatus.ui.today;
//						                    	dataParams.seriesIndex = this.series.index;
//						                    	$tsMain.ui.selectedDetailPop(dataParams);									
//						                    }
//						                }
//						            },					            				                    
//						            marker: {
//						                lineWidth: 1
//						            }
//								},
//								bar: {
//									dataLabels: { enabled: true }
//								}
//							},							
//							legend: { 
//								//enabled: true,
//						        align: 'center',
//						        verticalAlign: 'bottom',
//						        borderWidth: 0,
//						        /* 2019-01-08 그래프 아래 범례 글자 짤림 */
//						        y: 22,
////						        layout: 'vertical',
////						        align: 'right',
////						        verticalAlign: 'middle'
//							},
//							credits: {  enabled: false },
//							series: lineSeries
//							
//						});
						//2019-01-18 오늘의 구인 현황 메인차트 수정. 전체 신규 차트 분리 라디오 제어.
						//전체차트
						$('#tsMain #iaChartBoxMain1').highcharts({
							chart: {
								margin:chartMargin,
								width: '534', // 2021.02.05 이금은 추가
							    height: '250',//'400'
							    events: {
							    	load: function () {
							    		var lvChartsType = $("input:radio[name='charts_type']:checked").val();
							    		if(lvChartsType != "1") $('#tsMain #iaChartBoxMain1').hide(); // 화면 숨김
							    	}
							    }
							},	
							showFirstLabel: false,
							colors: ['#ff0000', '#f79339'],
							tooltip: { 
								shared: true, 
								crosshairs: true,
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
								categories: categories,//tmpCategories,
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
								title: { text: '' },// '일자'
								gridLineWidth: 1,
								lineWidth: 1,
								lineColor: "#000000",
								tickWidth: 0
								/*min: 0,
								max: 3,
								scrollbar: {
						            enabled: true
						        },
						        tickLength: 0,*/	// 스크롤 작동 안함 [참고 : https://jsfiddle.net/BhavyaAprajita/zja90wf2/1/]
							},
							//2019-01-15 메인차트 Y축 왼쪽 전체, 우측 신규로 나누기.
							//2019-01-18 오늘의 구인 현황 메인차트 수정. 전체 신규 차트 분리 라디오 제어.
							yAxis: {
								//min: 0,
								title: { text: ''},
								lineWidth: 1,
								lineColor: "#000000",
								tickWidth: 0
							}, 
							plotOptions: {								
								series: {
									//allowPointSelect : true,
									//states: { },
						            cursor: 'pointer',
						            point: {
						                events: {						                	
						                    click: function (e) {						                    	
						                    	//console.log(this.series.name + " / " + this.series.index + " / " + e.currentTarget.index + " / " + e.point.series.index + " / " + this.series.data.name);
						                    	if(this.series.name.indexOf("전체") != -1){
						                    		dataParams.series = "ALL";						                    							                    	
						                    	}else{
						                    		dataParams.series = "NEW";
						                    	}	
						                    	dataParams.today = $wrmTodayStatus.ui.today;
						                    	dataParams.seriesIndex = this.series.index;
						                    	$tsMain.ui.selectedDetailPop(dataParams);									
						                    }
						                }
						            },					            				                    
						            marker: {
						                lineWidth: 1
						            }
								},
								bar: {
									dataLabels: { enabled: true }
								}
							},							
							legend: { 
								//enabled: true,
						        align: 'center',
						        verticalAlign: 'bottom',
						        borderWidth: 0,
						        /* 2019-01-08 그래프 아래 범례 글자 짤림 */
						        y: 22,
//						        layout: 'vertical',
//						        align: 'right',
//						        verticalAlign: 'middle'
							},
							credits: {  enabled: false },
							series: lineSeries1
							
						});
						//2019-01-18 오늘의 구인 현황 메인차트 수정. 전체 신규 차트 분리 라디오 제어.
						//신규차트
// mng_e 20200331 이금은 신규차트 주석처리			
//						$('#tsMain #iaChartBoxMain2').highcharts({
//							chart: {
//								margin:chartMargin,
//							    height: '250',//'400'
//								events: {
//							    	load: function () {
//							    		var lvChartsType = $("input:radio[name='charts_type']:checked").val();
//							    		if(lvChartsType != "2") $('#tsMain #iaChartBoxMain2').hide(); // 화면 숨김
//							    	}
//							    }
//							},	
//							showFirstLabel: false,
//							// colors: ['#ffc000', '#92d050'],	// 2019.06.04[한광희] 하단 1일, 1주, 1달, 3달 버튼 처리로 인한 기존 차트 색상 주석 처리
//							colors: ['#ff0000', '#f79339'],		// 2019.06.04[한광희] 하단 1일, 1주, 1달, 3달 버튼 처리로 인한 차트 색상 변경
//							tooltip: { 
//								shared: true, 
//								crosshairs: true,
//								formatter: function () {	// 2018.12.10	ywKim	추가							
//									var s = "<span>" + this.x + "</span>";	// 제목
//									$.each(this.points, function() {
//										s += "<br/>";
//										s += "<span style='color:" + this.series.color + "'>" + this.series.name + "</span>: ";
//										s += "<b style='font-family:NanumBarunGothic;'>";
//										s += $workRoad.util.addComma(this.y);
//										s += "</b>";
//									});
//									return s;
//				                }
//							},
//							title: { text: '' },
//							subtitle: { text: '' },
//							exporting: { enabled: false },							
//							xAxis: {
//								categories: categories,//tmpCategories,
//					            labels: {						// 카테고리(Week)툴팁용 - 2019-01-07	ywKim	추가
//					                enabled: true,
//					                formatter: function() {
//					                	if (categoryTooltips.length > this.pos) {
//					                		return '<span title="' + categoryTooltips[this.pos] + '">' + this.value + '</span>';
//					                	} else {
//					                		return '<span>' + this.value + '</span>';
//					                	}
//					                },
//					                useHTML: true,
//					            },
//								title: { text: '' },// '일자'
//								gridLineWidth: 1,
//								lineWidth: 1,
//								lineColor: "#000000",
//								tickWidth: 0
//								/*min: 0,
//								max: 3,
//								scrollbar: {
//						            enabled: true
//						        },
//						        tickLength: 0,*/	// 스크롤 작동 안함 [참고 : https://jsfiddle.net/BhavyaAprajita/zja90wf2/1/]
//							},
//							//2019-01-15 메인차트 Y축 왼쪽 전체, 우측 신규로 나누기.
//							//2019-01-18 오늘의 구인 현황 메인차트 수정. 전체 신규 차트 분리 라디오 제어.
//							yAxis: {
//								//min: 0,
//								title: { text: ''},
//								lineWidth: 1,
//								lineColor: "#000000",
//								tickWidth: 0
//							}, 
//							plotOptions: {								
//								series: {
//									//allowPointSelect : true,
//									//states: { },
//						            cursor: 'pointer',
//						            point: {
//						                events: {						                	
//						                    click: function (e) {						                    	
//						                    	//console.log(this.series.name + " / " + this.series.index + " / " + e.currentTarget.index + " / " + e.point.series.index + " / " + this.series.data.name);
//						                    	if(this.series.name.indexOf("전체") != -1){
//						                    		dataParams.series = "ALL";						                    							                    	
//						                    	}else{
//						                    		dataParams.series = "NEW";
//						                    	}	
//						                    	dataParams.today = $wrmTodayStatus.ui.today;
//						                    	dataParams.seriesIndex = this.series.index+2;	// 2019.06.17[한광희] 오늘의 구인현황 기간조회 기능 활성화에 따른 수정
//						                    	$tsMain.ui.selectedDetailPop(dataParams);									
//						                    }
//						                }
//						            },					            				                    
//						            marker: {
//						                lineWidth: 1
//						            }
//								},
//								bar: {
//									dataLabels: { enabled: true }
//								}
//							},							
//							legend: { 
//								//enabled: true,
//						        align: 'center',
//						        verticalAlign: 'bottom',
//						        borderWidth: 0,
//						        /* 2019-01-08 그래프 아래 범례 글자 짤림 */
//						        y: 22,
////						        layout: 'vertical',
////						        align: 'right',
////						        verticalAlign: 'middle'
//							},
//							credits: {  enabled: false },
//							series: lineSeries2
//							
//						});
// mng_e 20200331 이금은						
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
					$("#"+type+"-sido-select").val(defaultSido);
					$tsMain.ui.getSggList(type, defaultSido, defaultSgg);
				}
				if(defaultSgg != undefined && defaultSgg != null && defaultSgg != "") {
					$("#"+type+"-sgg-select").val(defaultSgg);
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
			$("#tsMain #"+type+"-sido-select, #tsMain #"+type+"-sgg-select").prop("disabled",true);
			$.ajax({
				method: "POST",
				//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발.
				async: false,
				url: contextPath + "/ServiceAPI/map/sidoAddressList.json",
				data: {
					//base_year: $tsMain.ui.mapList[0].bnd_year
					base_year: "2016"
				},
				dataType: "json",
				success: function(res) {
					$("#tsMain #"+type+"-sido-select").empty();
					if(res.errCd=="0"){
						$("#tsMain #"+type+"-sido-select").append($("<option/>",{text:"전체",value:"99","data-coor-x":"","data-coor-y":""}));
						$.each(res.result.sidoList,function(cnt,node){
							if(defaultSido==node.sido_cd){
								$tsMain.ui.getSggList(type, node.sido_cd, defaultSgg);
							}
							$("#tsMain #"+type+"-sido-select").append($("<option/>",{text:node.sido_nm,value:node.sido_cd,selected:(defaultSido==node.sido_cd),"data-coor-x":node.x_coor,"data-coor-y":node.y_coor}));
						});
					}
					
					$("#tsMain #"+type+"-sido-select, #tsMain #"+type+"-sgg-select").prop("disabled",false);
					//2019-06-21 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START
					if(gv_url == "todayStatus" && (gv_type == "full" || gv_type == "lnb") && gv_sido_cd != "" && gv_sido_cd != "99") {
						// 시도 콤보박스 disable 처리
						//$("#tsMain #"+type+"-sido-select").css("background","#EEEEEE !important"); //이미 background-color가 !important로 선언된게 있어서 Chrome에서 동작안함.
						var lvTempStyle = $("#tsMain #"+type+"-sido-select").attr("style");
						if(lvTempStyle == undefined) lvTempStyle = "";
						$("#tsMain #"+type+"-sido-select").attr("style","background-color:#EEEEEE !important;"+lvTempStyle);
						$("#tsMain #"+type+"-sido-select").prop("disabled",true);
						$("#tsMain #"+type+"-sido-select").css("cursor","auto");
					}
					//2019-06-21 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. END
					if(typeof callback === "function"){
						callback();
					}
				},
				error: function(e) {
					$("#tsMain #"+type+"-sido-select, #tsMain #"+type+"-sgg-select").prop("disabled",false);
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
			$("#tsMain #"+type+"-sgg-select").prop("disabled",true);
			$.ajax({
				method: "POST",
				//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발.
				async: false,
				url: contextPath + "/ServiceAPI/map/sggAddressList.json",
				data: {
					sido_cd: sido_cd,
					base_year: bndYear
				},
				dataType: "json",
				success: function(res) {
					$("#tsMain #"+type+"-sgg-select").empty();
					if(res.errCd=="0"){
						var coorX = $("#tsMain #current-sido-select option:selected").data("coor-x");
						var coorY = $("#tsMain #current-sido-select option:selected").data("coor-y");
						$("#tsMain #"+type+"-sgg-select").append($("<option/>",{text:"전체",value:"999","data-coor-x":coorX,"data-coor-y":coorY, "data-adm_cd":sido_cd}));  // 2017-08-17 [개발팀] 전체일 때 data-adm_cd 값 추가
						$.each(res.result.sggList,function(cnt,node){
							//2017.05.29 [개발팀] 지자체 URL 추가 - 비자치구 코드 추가
							$("#tsMain #"+type+"-sgg-select").append($("<option/>",{text:node.sgg_nm,value:node.sgg_cd,selected:(defaultSgg==node.sgg_cd),"data-coor-x":node.x_coor,"data-coor-y":node.y_coor,"data-adm_cd":sido_cd+node.sgg_cd}));
						});
						/* mng_s 20200611 이금은
						if("policy"==type || "current" == type){ //2017.05.29 [개발팀] 지역별 수요변화 비자치구추가
							if($psmCombine.ui.atdrcList[sido_cd]){
								$.each($psmCombine.ui.atdrcList[sido_cd],function(sidoCnt,sidoNode){
									var op,index,empty = true;
									$.each(this.sgg_list,function(cnt,node){
										op = $("#tsMain #"+type+"-sgg-select option[value="+node+"]");
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
										$("#tsMain #"+type+"-sgg-select option:eq("+index+")").before($("<option/>",{text:sidoNode.sgg_nm,value:sidoNode.sgg_list.join(","),"data-coor-x":op.data("coor-x"),"data-coor-y":op.data("coor-y"), "data-adm_cd":sidoNode.adm_cd}));
									}
								});
							}
						}
						mng_e 20200611 이금은 */

					}else if(res.errCd=="-401"){
						accessTokenInfo(function() {
							$tsMain.ui.getSggList(type,sido_cd,defaultSgg);
						});
					}
					$("#tsMain #"+type+"-sgg-select").prop("disabled",false);
					if(typeof callback === "function"){
						callback();
					}
				},
				error: function(e) {
					$("#tsMain #"+type+"-sgg-select").prop("disabled",false);
				}
			});
		},
		
		selectedDetailPop : function(argParams){
			// 시도,시군구 조회 설정
			argParams.sido_cd = $('#tsMain #current-sido-select').val();
			argParams.sgg_cd = $('#tsMain #current-sgg-select').val();

//			//2019.03.14 접속로그 생성
//			if(argParams.seriesIndex == 0){
//				srvLogWrite('D0', '02', '02', '01', '', ''); //전체
//			} else {
//				srvLogWrite('D0', '02', '02', '02', '', ''); //신규				
//			}
			
			$tsSub.ui.show(argParams);
			$tsMain.ui.hide();
		},
		
		/**
		 * 
		 * @name         : localGovCallback
		 * @description  : 지자체연계 콜백함수
		 * @date         : 2018. 10. 01. 
		 * @author	     : 현재훈
		 * @history 	 :
		 * @param sido_cd: 시도코드
		 * @param sgg_cd : 시군구코드
		 */
		localGovCallback : function(sido_cd, sgg_cd) {
			switch(sido_cd) {
				case "00":
					$("#tsMain #current-sido-select option[value='"+$tsMain.ui.defaultSidoCd+"']").prop("selected", true);
					break;
				default:
					$("#tsMain #current-sido-select option[value='"+sido_cd+"']").prop("selected", true);
					$tsMain.ui.getSggList("current", sido_cd, "", function() {
						setTimeout(function() {
							//$policyStaticMap.ui.localGovSetNavi(sido_cd, sgg_cd);
							//$policyStaticMap.ui.getLocalGovBoundary(sido_cd, sgg_cd);
						}, 200);
					});
					break;
			}
		},
		
	};	
	
	$tsMain.event = {
			/**
			 * @name		 : 이벤트 바인딩 
			 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
			 * @date		 : 2018.09.17
			 * @author		 : ywKim
			 * @history 	 :
			 * 		2018.09.17	ywKim	신규
			 */
			setUIEvent: function() {
				console.log("■$tsMain.event.setUIEvent() called.");
				
				$workRoad.event.set("click", "#tsMain #tsMainMapView", function() {					
					$tsMap.ui.getFirstMapDataLoad(null,null);
				});
				// 토글버튼 클릭
				$workRoad.event.set("click", "#tsMain .wrmToggleBtn", function() {
					$workRoad.ui.toggleLayer("#tsMain");
				});
                // 통계표출 버튼 토글
                $workRoad.event.set("click", "#tsMain .stats-toggle-btn", function() {

                    var map_id = $tsMap.ui.curMapId;
                    var legend = $tsMap.ui.mapList[map_id].legend;

                    var ck = $(this).hasClass("on");
                    if (ck) {
                        $(this).removeClass("on");
                        $(this).text("off");
                    } else {
                        $(this).addClass("on");
                        $(this).text("on");
                    }

                    if ($tsMap.ui.showNumber_click != null) {
                        $tsMap.ui.showNumber_click(!ck);
                    }

                    //통계값 표출유무 설정 호출
                    legend.showNumberData();

                    // 접근log
                    //srvLogWrite('D0', '00', '00', '00', '', $(this).text());
                });

				// 닫기 버튼
				$workRoad.event.set("click", "#tsMain .topbar>a", function() {
					$workRoad.ui.toggleLayer("#tsMain");
				});				
				
				//시도 콤보박스 이벤트
				$workRoad.event.set("change", "#tsMain #current-sido-select", function(){
					//2019-01-21 (전체 조회 시) 지도에 마우스 오버시 나오는 툴팁에 구인자수 추가. (구분자 추가)
					$tsMap.ui.toolTipDataLength = "2";
					
					var type = $(this).data("type");
					var sido_cd = $(this).val();
					$wrmTodayStatus.ui.sido_nm = $(this).find("option:selected").text();
					$tsMain.ui.tsMain_coor_x = $(this).find('option:selected').data('coor-x');
					$tsMain.ui.tsMain_coor_y = $(this).find('option:selected').data("coor-y");
					
					$tsMain.ui.getSggList($(this).data("type"), sido_cd, "");
					
					// 오늘의 구인현황 데이터 조회
					$tsMain.ui.todayStatusList(sido_cd);

					$wrmTodayStatus.ui.sgg_nm = "";	// 2019.06.04[한광희] 시도 변경시 시군구 값 null 처리
					/** 2019.06.04[한광희] 오늘의 구인현황 하단 버튼(1일,1주, 1달, 3달) 기능 활성화에 따른 수정 START */
					// 차트 데이터 조회
					if($tsMain.ui.searchDataType != "") {
						$tsMain.ui.popupIntroChart({adm_cd: sido_cd, search_type: $tsMain.ui.searchDataType});
					} else {
						$tsMain.ui.popupIntroChart({adm_cd: sido_cd});
					}
					/** 2019.06.04[한광희] 오늘의 구인현황 하단 버튼(1일,1주, 1달, 3달) 기능 활성화에 따른 수정 END */
					// 차트 데이터 조회
					// $tsMain.ui.popupIntroChart({adm_cd: sido_cd});	// 2019.06.04[한광희] 오늘의 구인현황 하단 버튼(1일,1주, 1달, 3달) 기능 활성화에 따른 주석처리
					// 지도 데이터 조회
					/** 2019.06.17[한광희] 오늘의 구인현황 하단 버튼(1일,1주, 1달, 3달) 기능 활성화에 따른 수정 START */
					if($tsMain.ui.searchDataType != "") {
						$tsMap.ui.getTodayStatusMapData("", sido_cd, $tsMain.ui.defaultDetailType, $tsMain.ui.mapDate_value, $tsMain.ui.searchDataType);
					} else {
						$tsMap.ui.getTodayStatusMapData("", sido_cd, $tsMain.ui.defaultDetailType, $tsMain.ui.mapDate_value);						
					}
					/** 2019.06.17[한광희] 오늘의 구인현황 하단 버튼(1일,1주, 1달, 3달) 기능 활성화에 따른 수정 END */
					
					//2019-01-09 상세 지역 변경 시 메인에도 반영 처리.
					$tsSub.ui.setSidoValue($(this).data("type"), $(this).val());
					
//					// 2019.03.13 접근log 생성
//					srvLogWrite('D0', '02', '01', '02', '', 'sido_cd='+sido_cd);

				});
				
				//시군구 콤보박스 이벤트
				$workRoad.event.set("change", "#tsMain #current-sgg-select", function(){
					var sgg_cd = $("#tsMain #current-sgg-select option:selected").attr("data-adm_cd");

					$tsMain.ui.tsMain_coor_x = $(this).find('option:selected').data('coor-x');
					$tsMain.ui.tsMain_coor_y = $(this).find('option:selected').data("coor-y");
					
					// 차트 데이터 조회
					// $tsMain.ui.popupIntroChart({adm_cd: sido_cd});	// 2019.06.04[한광희] 오늘의 구인현황 하단 버튼(1일,1주, 1달, 3달) 기능 활성화에 따른 주석처리
					
					/** 2019.06.04[한광희] 오늘의 구인현황 하단 버튼(1일,1주, 1달, 3달) 기능 활성화에 따른 수정 START */
					// 차트 데이터 조회
					if($tsMain.ui.searchDataType != "") {
						$tsMain.ui.popupIntroChart({adm_cd: sgg_cd, search_type: $tsMain.ui.searchDataType});
					} else {
						$tsMain.ui.popupIntroChart({adm_cd: sgg_cd});
					}
					/** 2019.06.04[한광희] 오늘의 구인현황 하단 버튼(1일,1주, 1달, 3달) 기능 활성화에 따른 수정 END */
										
					/** 2019-04-30[한광희] 읍면동단위 표시를 위한 수정 시작
					 *  시군구 콤보박스 선택시 지도에 읍면동단위 표시 
					 */
					$wrmTodayStatus.ui.sgg_nm = $(this).find("option:selected").text();	// 2019.05.13[한광희] 지역(시군구) 선택시 데이터보드 지역항목에 시군구 명칭 설정
					// 2019.05.13[한광희] 오늘의 구인현황 데이터 조회 추가
					$tsMain.ui.todayStatusList(sgg_cd);
					$tsMap.ui.toolTipDataLength = "2";
					// 지도 데이터 조회
					/** 2019.06.17[한광희] 오늘의 구인현황 하단 버튼(1일,1주, 1달, 3달) 기능 활성화에 따른 수정 START */
					if($tsMain.ui.searchDataType != "") {
						$tsMap.ui.getTodayStatusMapData("", sgg_cd, $tsMain.ui.defaultDetailType, $tsMain.ui.mapDate_value, $tsMain.ui.searchDataType);
					} else {
						$tsMap.ui.getTodayStatusMapData("", sgg_cd, $tsMain.ui.defaultDetailType, $tsMain.ui.mapDate_value);						
					}
					/** 2019.06.17[한광희] 오늘의 구인현황 하단 버튼(1일,1주, 1달, 3달) 기능 활성화에 따른 수정 END */
					
					/** 2019-04-30[한광희] 읍면동단위 표시를 위한 수정 종료 */
					
					//2019-01-09 상세 지역 변경 시 메인에도 반영 처리.
					//$tsMain.ui.setSidoValue($("#tsMain #current-sido-select").data("type"), $("#tsSub #current-sido-select-sub").val(), $(this).val());
					$tsSub.ui.setSidoValue($("#tsMain #current-sido-select").data("type"), null, $(this).val());
					
//					// 2019.03.13 접근log 생성
//					var slwParams = "";
//					slwParams += 'sido_cd=' + $("#current-sido-select").find("option:selected").val() +',';
//				    slwParams += 'sgg_cd='  + $("#current-sgg-select").find("option:selected").val();
//					srvLogWrite('D0', '02', '01', '03', '', slwParams);
				});
				
				// 기간 버튼 클릭
				$workRoad.event.set("click", "#tsMain .date-list li", function(){
					var searchType = $(this).find("a").attr("data-val");
					var sgg_cd = $("#tsMain #current-sgg-select option:selected").attr("data-adm_cd");

					// 차트 데이터 조회
					$tsMain.ui.popupIntroChart({adm_cd: sgg_cd, search_type: searchType});
					
					/** 2019.06.04[한광희] 오늘의 구인현황 하단 버튼(1일,1주, 1달, 3달) 기능 활성화에 따른 수정 START */
					$tsMain.ui.searchDataType = searchType;	// 하단 기간 버튼클릭 후 시도, 시군구 선택시 기간 정보 설정 
					$tsMain.ui.todayStatusList(sgg_cd);
					$tsMap.ui.toolTipDataLength = "2";
					// 지도 데이터 조회
					$tsMap.ui.getTodayStatusMapData("", sgg_cd, $tsMain.ui.defaultDetailType, $tsMain.ui.mapDate_value, searchType);	// 2019.06.19[한광희] 오늘의 구인현황 기간조회 기능 활성화에 따른 기능 변경
					/** 2019.06.04[한광희] 오늘의 구인현황 하단 버튼(1일,1주, 1달, 3달) 기능 활성화에 따른 수정 END */
					
//					// 2019.03.13 접근log 생성
//					switch (searchType) {
//						case "D": 
//							srvLogWrite('D0', '02', '01', '06', '', '');
//					    	break;
//						case "W": 
//							srvLogWrite('D0', '02', '01', '07', '', '');
//					    	break;
//						case "M": 
//							srvLogWrite('D0', '02', '01', '08', '', '');
//					    	break;
//						case "Q": 
//					    	break;
//						case "H": 
//					    	break;
//					    default : 
//					    	break;
//					};
					
				});
				
				//2019-01-18 오늘의 구인 현황 메인차트 수정. 전체 신규 차트 분리 라디오 제어.
				// 메인차트 > 전체 신규 선택하기 라디오 버튼
		        $workRoad.event.set("click",".mainChart_stepBox label",function(){
					$(".mainChart_stepBox label").removeClass("on");
					$(".mainChart_stepBox input").removeAttr("checked");
					
					$(this).addClass("on");
					$(this).prev().attr("checked", "checked");
					
					var lvValue = $(this).prev().val();
					if(lvValue == "1") {
						$('#tsMain #iaChartBoxMain2').hide();
						$('#tsMain #iaChartBoxMain1').show();
						
//						// 2019.03.13 접근log 생성
//						srvLogWrite('D0', '02', '01', '04', '', '');

					}
					else if(lvValue == "2") {
						$('#tsMain #iaChartBoxMain1').hide();
						$('#tsMain #iaChartBoxMain2').show();
						
//						// 2019.03.13 접근log 생성
//						srvLogWrite('D0', '02', '01', '05', '', '');

					}
			    });
			},			
	}		
		
}(window, document));