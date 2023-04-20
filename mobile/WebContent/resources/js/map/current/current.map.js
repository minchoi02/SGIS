var v_showData = "tot_ppltn";
var v_showDataName = "총인구";
var v_unit = "명";

var v_areainfo4_gubun = "5";

var chartGubun = "subject3";

function reStartInit() {
	$current.ui.chageLocation2();
	var title = $(".gnb h2").text();
	var zoomLevel = $current.ui.map.mapNavigation.zoom;
	var adm_nm = $("#map-navigator-sido option:selected").text() + " "
			+ $("#map-navigator-sgg option:selected").text() + " "
			+ $("#map-navigator-emdong option:selected").text();
	$("#itemArea").hide();
	apiLogWrite2("L0", "L01", title, "없음", zoomLevel, adm_nm);
}

function areainfo4_gubun(gubun) {
	v_areainfo4_gubun = gubun;
	$("#chartTableArea").trigger("click");
}

(function(W, D) {
	W.$current = W.$current || {};

	$(document)
			.ready(
					function() {
						$(".tab li").css("width",
								$(window).width() / 4);
						$(".tab_new").css("width",
								$(window).width() / 3);
						$current.event.setUIEvent();
						$(function() {
							$("#map-navigator-emdong")
									.change(
											function() {
												 $current.ui.chageLocation2();
											//	$current.ui.search2(v_showData,
											//			v_showDataName, v_unit);
												var title = $(".gnb h2").text();
												var zoomLevel = $current.ui.map.mapNavigation.zoom;
												var adm_nm = $(
														"#map-navigator-sido option:selected")
														.text()
														+ " "
														+ $(
																"#map-navigator-sgg option:selected")
																.text()
														+ " "
														+ $(
																"#map-navigator-emdong option:selected")
																.text();
												apiLogWrite2("L0", "L01",
														title, "없음", zoomLevel,
														adm_nm);
											});
						});

						$("#menuListToggle").click(function() {
							// mapAreaToggle();
							if ($("#itemArea").css("display") == "block") {
								$("#itemArea").hide();
							} else {
								$("#itemArea").show();
							}
						})

						$(".tab li").click(function() {
							$(".tab li").removeClass("on");
							$(this).addClass("on");

						})

						$(".interactive02").click(function() {
//							$("#tot_ppltn_btn").trigger("click");
						});
						$("#tot_ppltn_btn").click(function() {
							
							
							srvLogWrite("M0","03", "03", "01", "", "");	
							
							v_showData = "tot_ppltn";
							v_showDataName = "총인구";
							v_unit = "명";
							reStartInit();

							chartGubun = "subject3";

							// $(".subject3").trigger("click");
							// $("#topCloseArea").show();
						});

						$("#tot_house_btn").click(function() {
							srvLogWrite("M0","03", "04", "01", "", "");		
							v_showData = "tot_house";
							v_showDataName = "총주택";
							v_unit = "호";
							reStartInit();

							chartGubun = "subject4";

							/*
							 * $(".subject4").trigger("click");
							 * $("#topCloseArea").show();
							 */
						});

						$("#corp_cnt_btn").click(function() {
							// v_showData = "tot_corp";
							srvLogWrite("M0","03", "05", "01", "", "");
							v_showData = "corp_cnt";
							v_showDataName = "총사업체";
							v_unit = "사업체";
							reStartInit();
							chartGubun = "subject5";
							/*
							 * $(".subject5").trigger("click");
							 * $("#topCloseArea").show();
							 */

						});

						$("#subject4_tab").click(function() {
							$(".subject4").trigger("click");
						});

						$(".house-price").click(function() {
							$(".subject6").trigger("click"); 
							$("#house-price").trigger("click");

								$("#house-price").addClass("tab_new");
								$("#house-trade").addClass("tab_new");
								
								$("#house-price").css("width", "33%");
								$("#house-trade").css("width", "33%");

								$("#house-price").show();
								$("#house-trade").show();
								
							
						});

						$(".house-trade").click(function() {
							$(".subject6").trigger("click");
							$("#house-trade").trigger("click");
							
								$("#house-price").addClass("tab_new");
								$("#house-trade").addClass("tab_new");
								
								$("#house-price").css("width", "33%");
								$("#house-trade").css("width", "33%");
								
								$("#house-price").show();
								$("#house-trade").show();
						});

						$(".BtnClose").click(function() {
							$(".subject1").trigger("click");
							$("#topCloseArea").hide();
							$(".tab").hide();
							$("#tabArea").hide();
							$("#chartTableArea").show();
						});

						$("#chartTableArea").click(function() {
							
							
							if("tot_ppltn" == v_showData){
								srvLogWrite("M0","03", "03", "02", "", "");		//인구 데이터 보기
							}else if("tot_house" == v_showData){
								srvLogWrite("M0","03", "04", "02", "", "");		//총주택 데이터 보기
							}else if("corp_cnt" == v_showData){
								srvLogWrite("M0","03", "05", "02", "", "");		//사업체 데이터 보기
								
							}
							
							if($(".MapTitle").css("display")!="none"){		//제목타이틀이 있을때(내지역 통계가 조회되었을때 제목 타이틀이 표출됨)에만 클릭이 되도록 변경
								$("#chartTableArea").hide();
								
								$("." + chartGubun).trigger("click");
								$("#topCloseArea").show();
								
								if (v_showData == "corp_cnt") {
									$(".tab").show();
									$("#tabArea").show();
								} else {
									$(".tab").hide();
									$("#tabArea").hide();
								}
							}

						});

					});
	$(window).on("orientationchange", function() {
		setTimeout(function() {
			$current.event.mapResize();
		}, 100);
	});
	$current.ui = {
		map : null,// 지도 객체
		curAdmCd : null,// 현재 행정동 코드
		/**
		 * @name : createMap
		 * @description : 지도 생성
		 * @date : 2016. 04. 05.
		 * @author : 나광흠
		 * @history :
		 * @param id :
		 *            html tag id
		 */
		createMap : function(id) {
			this.map = new sMap.map();
			this.map.isCurrentLocationMarker = true;
			this.map.isAutoRefreshCensusApi = false;
			this.map.isDrawBoundary = false;
			this.map.center = [ 989674, 1818313 ];
			this.map.zoom = 1;
			this.map.createMap($current, id, {
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
			});
			this.map.addControlEvent("movestart");
			this.map.addControlEvent("moveend");
			this.map.addControlEvent("zoomstart");
			this.map.addControlEvent("zoomend");
			$current.ui.map.moveCurrentLocation(true, function() {
				setTimeout(function() {
					$current.ui.search2(v_showData, v_showDataName, v_unit);
					$current.api.setChart($(".Content>.SubjectC>nav>a.M_on")
							.index());
				}, 500);
			});
		},
		setStats : function() {
		},
		/**
		 * @name : chageLocation
		 * @description : 지역 네비게이터 조회 클릭시
		 * @date : 2016. 03. 29.
		 * @author : 나광흠
		 * @history :
		 */
		chageLocation : function() {
			var abs = new sop.portal.absAPI();
			abs.onBlockUIPopup();
			$current.ui.map.mapNavigation.move(function() {
				$current.ui.search();
				$current.api.setChart($(".Content>.SubjectC>nav>a.M_on")
						.index());
				abs.onBlockUIClose();
			}, abs);
		},
		/**
		 * @name : chageLocation2
		 * @description : 인구, 거처, 사업체 선택시
		 * @date : 2017. 07. 12.
		 * @author : 이경현
		 * @history :
		 */
		chageLocation2 : function() {
			
			srvLogWrite("M0","03", "02", "01", "", "");		//지역설정
			
			var abs = new sop.portal.absAPI();
			abs.onBlockUIPopup();
			$current.ui.map.mapNavigation.move(function() {
				// 조회시 지역 및 조회조건 설정
				// 조건을 어떻게 처리할지 로직이 필요

				$current.ui.search2(v_showData, v_showDataName, v_unit);
				$current.api.setChart($(".Content>.SubjectC>nav>a.M_on")
						.index());
				abs.onBlockUIClose();
			}, abs);
		},
		/**
		 * @name : search
		 * @description : 센서스 데이터 검색
		 * @date : 2016. 03. 22.
		 * @author : 나광흠
		 * @history :
		 */
		search : function() {
			$("div[id^=map-table-]").empty().data("adm_cd", "").hide();
			this.map.censusApi
					.setStatsMapCensusData(
							"API_0301",
							{
								"showData" : "tot_ppltn",
								"showDataName" : "총인구",
								"unit" : "명",
								"callback" : function(data) {
									$current.ui.map
											.getCenterToAdmCd(
													null,
													function(res) {
														var adm_cd;
														if (res.errCd == 0
																&& res.result.tot_reg_cd) {
															adm_cd = res.result.tot_reg_cd
														} else {
															adm_cd = $current.ui.map.censusApi.lastParameters.option.adm_cd;
														}
														$current.ui
																.setTable("전국");
														if (adm_cd.length >= 2) {
															$current.ui.map.mapNavigation
																	.stage(
																			"",
																			"0",
																			function(
																					res) {
																				$
																						.each(
																								res.result,
																								function(
																										cnt,
																										node) {
																									if (node.cd == adm_cd
																											.substring(
																													0,
																													2)) {
																										$current.ui
																												.setTable(
																														node.addr_name,
																														adm_cd
																																.substring(
																																		0,
																																		2));
																										return false;
																									}
																								});
																			});
															if (adm_cd.length >= 5) {
																$current.ui.map.mapNavigation
																		.stage(
																				adm_cd
																						.substring(
																								0,
																								2),
																				"0",
																				function(
																						res) {
																					$
																							.each(
																									res.result,
																									function(
																											cnt,
																											node) {
																										if (node.cd == adm_cd
																												.substring(
																														0,
																														5)) {
																											$current.ui
																													.setTable(
																															node.addr_name,
																															adm_cd
																																	.substring(
																																			0,
																																			5));
																											return false;
																										}
																									});
																				});
																if (adm_cd.length >= 7) {
																	$current.ui.map.mapNavigation
																			.stage(
																					adm_cd
																							.substring(
																									0,
																									5),
																					"0",
																					function(
																							res) {
																						$
																								.each(
																										res.result,
																										function(
																												cnt,
																												node) {
																											if (node.cd == adm_cd
																													.substring(
																															0,
																															7)) {
																												$current.ui
																														.setTable(
																																node.addr_name,
																																adm_cd
																																		.substring(
																																				0,
																																				7));
																												return false;
																											}
																										});
																					});
																	if (adm_cd.length > 7) {
																		if ($current.ui.map.dataBoundary) {
																			$current.ui.map.dataBoundary
																					.eachLayer(function(
																							layer) {
																						if (layer.feature.properties.adm_cd == adm_cd) {
																							if (typeof layer.bringToFront === "function") {
																								layer
																										.bringToFront();
																							}
																							$current.ui.map
																									.layerClickStyle(layer);
																							$current.ui.curAdmCd = adm_cd;
																						}
																					});
																		}
																		$current.ui
																				.setTable(
																						"집계구("
																								+ adm_cd
																								+ ")",
																						adm_cd);
																	}
																}
															}
														}
														$(".Subject nav a")
																.removeClass(
																		"NoneAction");
													});
								}
							}, {
								"year" : censusDataYear,
								"bnd_year" : $current.ui.map.bnd_year
							});
		},
		/**
		 * @name : search2
		 * @description : 센서스 데이터 검색
		 * @date : 2017. 07. 11.
		 * @author : leekh
		 * @history :
		 */
		search2 : function(showData, showDataName, unit) {
			var search2Flag = true;
			var year = censusDataYear;
			if (showData == "corp_cnt") {
				// mng_s 2020. 02. 18 j.h.Seok 사업체 조회 시 데이터 기준년도 common.js 에서 호출
//				year = "2015";
				year = companyDataYear;
				// mng_e 2020. 02. 18 j.h.Seok 사업체 조회 시 데이터 기준년도 common.js 에서 호출
			}

			$("div[id^=map-table-]").empty().data("adm_cd", "").hide();
			this.map.censusApi
					.setStatsMapCensusData(
							"API_0301",
							{
								"showData" : showData,
								// "showData" : "corp_cnt",
								// "showData" : "tot_house",
								"showDataName" : showDataName,
								// "showDataName" : "총사업체 수",
								"unit" : unit,
								"callback" : function(data) {
									$current.ui.map
											.getCenterToAdmCd(
													null,
													function(res) {
														var adm_cd;
														if (res.errCd == 0
																&& res.result.tot_reg_cd) {
															adm_cd = res.result.tot_reg_cd
														} else {
															adm_cd = $current.ui.map.censusApi.lastParameters.option.adm_cd;
														}
														$current.ui
																.setTable("전국");
														if (adm_cd.length >= 2) {
															$current.ui.map.mapNavigation
																	.stage(
																			"",
																			"0",
																			function(
																					res) {
																				$
																						.each(
																								res.result,
																								function(
																										cnt,
																										node) {
																									if (node.cd == adm_cd
																											.substring(
																													0,
																													2)) {
																										$current.ui
																												.setTable(
																														node.addr_name,
																														adm_cd
																																.substring(
																																		0,
																																		2));
																										return false;
																									}
																								});
																			});
															if (adm_cd.length >= 5) {
																$current.ui.map.mapNavigation
																		.stage(
																				adm_cd
																						.substring(
																								0,
																								2),
																				"0",
																				function(
																						res) {
																					$
																							.each(
																									res.result,
																									function(
																											cnt,
																											node) {
																										if (node.cd == adm_cd
																												.substring(
																														0,
																														5)) {
																											$current.ui
																													.setTable(
																															node.addr_name,
																															adm_cd
																																	.substring(
																																			0,
																																			5));
																											return false;
																										}
																									});
																				});
																if (adm_cd.length >= 7) {
																	$current.ui.map.mapNavigation
																			.stage(
																					adm_cd
																							.substring(
																									0,
																									5),
																					"0",
																					function(
																							res) {
																						$
																								.each(
																										res.result,
																										function(
																												cnt,
																												node) {
																											if (node.cd == adm_cd
																													.substring(
																															0,
																															7)) {
																												$current.ui
																														.setTable(
																																node.addr_name,
																																adm_cd
																																		.substring(
																																				0,
																																				7));
																												return false;
																											}
																										});
																					});
																	if (adm_cd.length > 7) {
																		if ($current.ui.map.dataBoundary) {
																			$current.ui.map.dataBoundary
																					.eachLayer(function(
																							layer) {
																						if (layer.feature.properties.adm_cd == adm_cd) {
																							if (typeof layer.bringToFront === "function") {
																								layer
																										.bringToFront();
																							}
																							$current.ui.map
																									.layerClickStyle(layer);
																							$current.ui.curAdmCd = adm_cd;
																						}
																					});
																		}
																		$current.ui
																				.setTable(
																						"집계구("
																								+ adm_cd
																								+ ")",
																						adm_cd);
																	}
																}
															}
														}
														$(".Subject nav a")
																.removeClass(
																		"NoneAction");
													});
								}
							}, {
								"year" : year,
								"bnd_year" : $current.ui.map.bnd_year
							});
		},
		/**
		 * @name : setTable
		 * @description : 내주변통계 하위에 있는 테이블 값 셋팅
		 * @date : 2016. 03. 28.
		 * @author : 나광흠
		 * @history :
		 * @param adm_nm :
		 *            행정동 이름
		 * @param adm_cd :
		 *            행정동 코드
		 */
		setTable : function(adm_nm, adm_cd) {
			var table;
			if (adm_cd) {
				table = $("#map-table-"
						+ (adm_cd.length > 7 ? "o" : adm_cd.length));
			} else {
				table = $("#map-table-country");
			}
			if (table.data("adm_cd") != adm_cd) {
				table.empty();
				var obj = new sop.openApi.population.setTable.api();
				obj.addParam("accessToken", accessToken);

				// mng_s 2020. 02. 18 j.h.Seok 아래 부분 주석 처리
				// corp_cnt 는 2015년 데이터가 없어서 조치함
//				var year = censusDataYear;
//				if (v_showData == "corp_cnt") {
//					year = "2014";
//				}
				
				var year = censusDataYear;
				// mng_e 2020. 02. 18 j.h.Seok 아래 부분 주석 처리
				
				var parameters = {
					"year" : year,
					"bnd_year" : $current.ui.map.bnd_year
				};
				if (adm_cd && adm_cd.length > 7) {
					parameters.adm_cd = adm_cd.substring(0, 7);
					parameters.low_search = "1";
				} else {
					if (adm_cd) {
						parameters.adm_cd = adm_cd;
					}
					parameters.low_search = "0";
				}
				$.map(parameters, function(value, key) {
					obj.addParam(key, value);
				});
				obj.request({
					method : "GET",
					async : false,
					url : openApiPath + "/OpenAPI3/stats/population.json",
					options : {
						table : table,
						adm_cd : adm_cd,
						adm_nm : adm_nm,
						parameters : parameters
					}
				});
			}
		}
	};
	$current.callbackFunc = {
		// 해당경계 선택 시, 발생하는 콜백함수
		didSelectedPolygon : function(event, data, type, map) {
			if (type === "data") {
				$current.ui.curAdmCd = data.properties.adm_cd;
				map.delegate.ui.setTable("집계구(" + data.properties.adm_cd + ")",
						data.properties.adm_cd);
			}
		},
		// 현재위치로 이동 후 콜백. 현재위치 못찾으면 동작 안함
		didEndMoveCurrentLocation : function(map) {
			srvLogWrite("M0","03", "02", "04", "", "");	
			$current.ui.search();
		},
		// 현재위치 circle 클릭시 이벤트
		didCurrentLocationCircle : function(event, layer, map) {
			if (layer && layer.feature && layer.feature.properties
					&& layer.feature.properties.adm_cd) {
				map.delegate.ui.setTable("집계구("
						+ layer.feature.properties.adm_cd + ")",
						layer.feature.properties.adm_cd);
			}
		}
	};
	$current.event = {
		/**
		 * @name : setUIEvent
		 * @description : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 * @date : 2016. 03. 22.
		 * @author : 나광흠
		 * @history :
		 */
		setUIEvent : function() {
			this.mapResize();
			$current.ui.createMap("map");
			$(".Content>.SubjectC>nav>a").click(
					function() {
						//
						if (!$(this).parent("nav").children("a").hasClass(
								"NoneAction")) {
							$(this).parent("nav").children("a").removeClass(
									"M_on");
							$(this).addClass("M_on");
							// if($(this).index()==0||$(this).index()==4){
							if ($(this).index() == 0) {
								$(".MapArea>.Map").show();
								$("#menuListToggle").show();
								$current.ui.map.gMap.invalidateSize();
							} else {
								$(".MapArea>.Map").hide();
								$("#menuListToggle").hide();
							}
							$("div[id^=areainfo-]").hide();
							$("#areainfo-" + $(this).index()).show();
							$current.api.setChart($(this).index());
						}
					});
			$("div[id^=areainfo]>.tab").click(
					function() {
						var parent = $(this).parent();
						parent.children(".tab").removeClass("M_on");
						$(this).addClass("M_on");
						parent.children(".chart-box").hide();
						parent.children(
								".chart-box:eq("
										+ parent.children(".tab")
												.index($(this)) + ")").show();
						$current.api
								.setChart($(".Content>.SubjectC>nav>a.M_on")
										.index());
					});
			$("div[id^=areainfo] .radio_style input:radio").change(
					function() {
						$current.api
								.setChart($(".Content>.SubjectC>nav>a.M_on")
										.index());
					});
			// 사업체 업종별 증감 대분류 중분류 컨트롤
			$("#areainfo-4-incdec a")
					.click(
							function() {
								$(this).parent().find("a").removeClass("M_on");
								$(this).addClass("M_on");
								var menuNum = $(this).index() + 1;
								$(".swiper-wrapper>.swiper-slide").hide();
								$(".swiper-wrapper>#areainfo4-swiper" + menuNum)
										.show();
								$(".swiper-wrapper>#areainfo4-swiper" + menuNum)
										.first().trigger("click");
								$("#incDecSwiper>div").first().css("transform",
										"translate3d(0px, 0px, 0px)");
							});
		},
		/**
		 * @name : mapResize
		 * @description : UI 리사이즈에 대한 이벤트.
		 * @date : 2016. 03. 22.
		 * @author : 나광흠
		 * @history :
		 */
		mapResize : function() {
			$current.event.setMapSize();
		},
		/**
		 * @name : setMapSize
		 * @description : 지도 사이즈 변경
		 * @date : 2016. 03. 22.
		 * @author : 나광흠
		 * @history :
		 */
		setMapSize : function() {
			if ($("body").hasClass("full")) {
				$("#map").height($(window).height())-10;
			} else {
				$("#map").height($(window).height() - 80);
				// $("#map").height($(window).height()/1.5);
				// alert($("#map").height($(window).height()));
			}
		}
	};
	/** ********* 테이블 셋팅 시작 ********* */
	(function() {
		$class("sop.openApi.population.setTable.api")
				.extend(sop.portal.absAPI)
				.define(
						{
							onSuccess : function(status, res, options) {
								if (res.errCd == "0") {
									options.table
											.data("adm_cd", options.adm_cd);
									var result = getResultData(res, options);
									if (result) {
										options.table
												.append(
														'<table class="TableSt">'
																+ '	<caption>'
																+ options.adm_nm
																+ '</caption>'
																+ '	<thead>'
																+ '		<tr>'
																+ '			<th scope="col">구분</th>'
																+ '			<th scope="col">값</th>'
																+ '		</tr>'
																+ '	</thead>'
																+ '	<tbody>'
																+ '		<tr>'
																+ '			<td scope="row">인구(명)</td>'
																+ '			<td>'
																+ appendCommaToNumber(result.tot_ppltn)
																+ '</td>'
																+ '		</tr>'
																+ '		<tr>'
																+ '			<td scope="row">평균연령(세)</td>'
																+ '			<td>'
																+ appendCommaToNumber(result.avg_age)
																+ '</td>'
																+ '		</tr>'
																+ '		<tr>'
																+ '			<td scope="row">가구수(개)</td>'
																+ '			<td>'
																+ appendCommaToNumber(result.tot_family)
																+ '</td>'
																+ '		</tr>'
																+ '		<tr>'
																+ '			<td scope="row">사업체수(개)</td>'
																+ '			<td data-type="company"></td>'
																+ '		</tr>'
																+ '	</tbody>'
																+ '</table>')
												.show();
										var obj = new sop.openApi.company.setTable.api();
										obj
												.addParam("accessToken",
														accessToken);
										$.map(options.parameters, function(
												value, key) {
											if (key != "year") {
												obj.addParam(key, value);
											}
										});
										obj.addParam("year", companyDataYear);
										obj
												.request({
													method : "GET",
													async : false,
													url : openApiPath
															+ "/OpenAPI3/stats/population.json",
													options : {
														table : options.table,
														adm_cd : options.adm_cd,
														adm_nm : options.adm_nm
													}
												});
									}
								} else if (res.errCd == "-401") {
									accessTokenInfo(function() {
										$current.ui.setTable(options.adm_nm,
												options.adm_cd);
									});
								}
							},
							onFail : function(status) {
								messageAlert.open("알림", errorMessage);
							}
						});
	}());
	/** ********* 테이블 셋팅 종료 ********* */
	/** ********* 테이블 셋팅 시작 ********* */
	(function() {
		$class("sop.openApi.company.setTable.api")
				.extend(sop.portal.absAPI)
				.define(
						{
							onSuccess : function(status, res, options) {
								if (res.errCd == "0") {
									var result = getResultData(res, options);
									options.table
											.find("td[data-type=company]")
											.text(
													appendCommaToNumber(result.corp_cnt));
								} else if (res.errCd == "-401") {
									accessTokenInfo(function() {
										$current.ui.setTable(options.adm_nm,
												options.adm_cd);
									});
								}
							},
							onFail : function(status) {
								messageAlert.open("알림", errorMessage);
							}
						});
	}());
	/** ********* 테이블 셋팅 종료 ********* */
	function getResultData(res, options) {
		var result;
		if (options.adm_cd && options.adm_cd.length > 7) {
			$.each(res.result, function(cnt, node) {
				if (options.adm_cd == node.adm_cd) {
					result = node;
					return false;
				}
			});
		} else {
			if (hasText(options.adm_cd)) {
				result = res.result[0];
			} else {
				result = {};
				$.each(res.result, function(cnt, node) {
					$.map(node, function(value, key) {
						if (key != "adm_cd" && key != "adm_nm") {
							if (!hasText(result[key])) {
								result[key] = 0;
							}
							if ($.isNumeric(value)) {
								result[key] += parseFloat(value);
							}
						}
					});
				});
				$
						.map(
								result,
								function(value, key) {
									if (/^avg_/.test(key)) {
										if ($.isNumeric(result[key])) {
											result[key] = (parseFloat(result[key]) / res.result.length)
													.toFixed(1);
										}
									}
								});
			}
		}
		return result;
	}
}(window, document));