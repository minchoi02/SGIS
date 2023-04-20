var v_showData = "tot_ppltn";
var v_showDataName = "총인구";
var v_unit = "명";
var tempInitialSlide = 0;	// 상단 Menu swiper 위치 값

(function(W, D) {
	W.$currentMap = W.$currentMap || {};
	$(document).ready(function() {
		$(".currentContent").hide();
		$(".currentContent:first-child").show();
		
		$currentMap.event.setUIEvent(); // 2020-08-03 [곽제욱] 메인메뉴에서 이동할때와 안할때 구분(맵 호출전에 hide 처리시 map 깨지는 오류 수정)
		
		/** 메인 화면 링크를 통한 메뉴 접근 및 swiper 위치 조정 START */
		// 메인 화면에서 각 상단 Menu명 클릭시 상세검색 화면 출력
		if(menuType != ""){
			//$(".Tabbtn").removeClass("on3");
			$(".nav-layer li").removeClass("on3");
			$("#"+menuType).addClass("on3");
			//$("#mapContent").hide();
			$(".currentAllWrap").show();
			$(".currentContent").hide();
			$('div[name="'+menuType+'_DIV"]').show();
		}
		// 메인 화면에서 각 상단 Menu명 클릭시 내 주변 통계 상단 메뉴 swiper 위치 설정
		if(menuIndex != ""){
			tempInitialSlide = menuIndex;
		}
		var swiper = new Swiper('.swiper-container', {
			slidesPerView : 3.2,
			spaceBetween : 10,
			initialSlide : tempInitialSlide,
			pagination : {
				el : '.swiper-pagination',
				clickable : true,
			},
		});
		
		$(".btn_popClose").click(function() {
			$(".currentAllWrap").hide();
			$(".leftCol .btnNavThematic").removeClass("active")
			$(".maptit03").removeClass("active")
		});
		
		$(".help_popClose").click(function() {
			$("#API_0301_INFO_BOX").hide();
		});
		

		/** 메인 화면 링크를 통한 메뉴 접근 및 swiper 위치 조정 END */
		
		//현재위치로 이동 버튼
		$(document).on("click", "#currentMapMyLocation", function() {
			
			// TODO :: 분할뷰일때 처리 필요
			/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 START */
			common_localtion(
					//지도변수
					$currentMap.ui.map,
					//위치 동의함
					function(my_x, my_y, my_sido_cd, my_sido_nm, my_sgg_cd, my_sgg_nm, my_emdong_cd, my_emdong_nm) {
						//변수 입력
						$currentMap.ui.my_x = my_x;
						$currentMap.ui.my_y = my_y;
						$currentMap.ui.my_sido_cd = my_sido_cd;
						$currentMap.ui.my_sido_nm = my_sido_nm;
						$currentMap.ui.my_sgg_cd = my_sgg_cd;
						$currentMap.ui.my_sgg_nm = my_sgg_nm;
						$currentMap.ui.my_emdong_cd = my_emdong_cd;
						$currentMap.ui.my_emdong_nm = my_emdong_nm;
						
						$currentMap.ui.searchAdmCd = my_sido_cd+my_sgg_cd+my_emdong_cd;
						
						//내 위치 텍스트 
						//$("#currentMapMyLocation_name").text($currentMap.ui.my_sido_nm+" "+$currentMap.ui.my_sgg_nm+" "+$currentMap.ui.my_emdong_nm);
						//2022-11-04 수정 및 추가
						var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>'; // 2022.09.26 송은미 svg 추가
						
						if($currentMap.ui.my_sido_cd == "00"){
							$("#currentMapMyLocation_name").html($currentMap.ui.my_sido_nm);
						}else if($currentMap.ui.my_sido_cd != "00" && $currentMap.ui.my_sgg_cd == "999" && $currentMap.ui.my_emdong_cd == "00"){
							$("#currentMapMyLocation_name").html($currentMap.ui.my_sido_nm);
						}else if($currentMap.ui.my_sido_cd != "00" && $currentMap.ui.my_sgg_cd != "999" && $currentMap.ui.my_emdong_cd == "00"){
							$("#currentMapMyLocation_name").html($currentMap.ui.my_sido_nm+ svg +$currentMap.ui.my_sgg_nm);
						}else{
							$("#currentMapMyLocation_name").html($currentMap.ui.my_sido_nm+ svg +$currentMap.ui.my_sgg_nm+ svg +$currentMap.ui.my_emdong_nm);
						};
						
						var id = $(".on3").attr("id");
						$currentMap.ui.map.mapNavigation.move();
						$currentMap.search[id]();
					}
					,
					//위치 미동의함
					function(){
						
					}
				);
			/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 END */
		});
		
		$("#itemSearchToggle").click(function(){
			if($(".industrySearchBar").css("display") == "none"){
				$(".industrySearchBar").show()
				$("#itemSearchToggle").addClass("on");
			}else{
				$(".industrySearchBar").hide()
				$("#itemSearchToggle").removeClass("on");
			}
		})
		$("#chart-area").hide();
		
		if(sop.Browser.mobile){
			$("#search-item-box button.myposition").addClass("sop-touch");
		}

		$(".leftCol .btnNavThematic").click(function(){
			if(!$(this).hasClass('active')){
        		$(this).addClass('active');
        		$(".nav-layer").css("display","block");
        		$("#common_popup_area").css("display","none");
        		$(".currentAllWrap").css("display","none"); // 2022-10-04 [송은미] click 이벤트 추가
        		$(".maptit03").removeClass("active");
        	}else{
        		$(this).removeClass('active');
        		$(".nav-layer").css("display","none");
        	}
        });
		
		// 2022.09.28 [송은미] click 이벤트 추가
		$(".selectArea").click(function(){
			if(!$(".nav-layer").hasClass('active')){
				$(".nav-layer").css("display","none");
        		$(".leftCol .btnNavThematic").removeClass("active");
        		$(".leftCol .maptit04").removeClass("active");
        		$("#result_list").css("display","none");
        		$(".currentAllWrap").css("display","none"); 
        		$(".maptit03").removeClass("active"); //2022-10-05 [송은미] active 삭제
        	}else{
        		$(this).removeClass('active');
        	}
        });

		//상단 menu 토글
		/*$(".Tabbtn").each(function(){*/
		$(".nav-layer li").each(function(){
			$(this).click(function(){
				if($(this).attr('id') == "API_0301"){
					srvLogWrite('O0', '07', '02', '00', '', '');
				}else if($(this).attr('id') == "API_0302"){
					srvLogWrite('O0', '07', '03', '00', '', '');
				}else if($(this).attr('id') == "API_0305"){
					srvLogWrite('O0', '07', '04', '00', '', '');
				}else if($(this).attr('id') == "API_0306"){
					srvLogWrite('O0', '07', '05', '00', '', '');
				}else if($(this).attr('id') == "API_0304"){
					srvLogWrite('O0', '07', '06', '00', '', '');
				}else if($(this).attr('id') == "API_0310"){
					srvLogWrite('O0', '07', '07', '00', '', '');
				}
				//$(".Tabbtn").removeClass("on3");
				$(".nav-layer li").removeClass("on3");
				$(this).addClass("on3");
				var id = $(this).attr("id");
				//$("#mapContent").hide();
				//$(".currentAllWrap").show();
				$(".currentContent").hide();
				$('div[name="'+id+'_DIV"]').show();
				
				$(".nav-layer").css("display","none");
				$(".leftCol .btnNavThematic").removeClass("active");
				
				//2022-10-05 [송은미] html 변경 추가
				var title = $(".nav-layer li.on3").html();
				var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>'; // 2022.09.26 송은미 svg 추가
				$(".leftCol .btnNavThematic").html(title+svg);
				
				//2022-10-06 [송은미] 선택된 상세검색 title 추가 
				
				$(this).each(function (){
					var sId = "#"+ this.id;
					if(sId == "#API_0301"){
						$(".maptit03").html("총인구(명)"+svg);
						$(sId).addClass("on3");
						$currentMap.ui.serviceGb = "API_0301";
					}
					else if(sId == "#API_0302"){
						$(".maptit03").html("선택"+svg);
						$(sId).addClass("on3");
						$currentMap.ui.serviceGb = "API_0302";
					}
					else if(sId == "#API_0305"){
						$(".maptit03").html("선택"+svg);
						$(sId).addClass("on3");
						$currentMap.ui.serviceGb = "API_0305";
					}
					else if(sId == "#API_0306"){
						$(".maptit03").html("선택"+svg);
						$(sId).addClass("on3");
						$currentMap.ui.serviceGb = "API_0306";
					}
					else if(sId == "#API_0304"){
						$(".maptit03").html("선택"+svg);
						$(sId).addClass("on3");
						$currentMap.ui.serviceGb = "API_0304";
					}
					else if(sId == "#API_0310"){
						$(".maptit03").html("선택"+svg);
						$(sId).addClass("on3");
						$currentMap.ui.serviceGb = "API_0310";
					}
				});
				
				
			});
		});
		
		$(".maptit03").click(function(){
			if(!$(this).hasClass('active')){
				$(this).addClass('active');
        		$(".currentAllWrap").css("display","block");
        		$(".btnNavThematic").removeClass('active');
        		$(".nav-layer").css("display","none");
        		$("#common_popup_area").css("display","none"); //2022-10-05 [송은미] 관심지역변경 팝업 숨김
        	}else{
        		$(this).removeClass('active');
        		$(".currentAllWrap").css("display","none");
        	}
		})
		
		
		$(".chartAreaCloseBtn").click(function(){ 
				//mapAreaToggle();
				$("#chart-area").hide();
				$("#table-area").hide();
		})
		
		// 2022-09-30 [송은미] 이벤트 삭제
/*		$("#interactivePOIPopup_close").click(function(){ 
			$(".maptit03").text("총인구(명)");
		})*/
		
		
		
		// mng_s 2020. 02. 18 j.h.Seok 조사년도 콤보박스 자동생성 추가
		$currentMap.ui.setMainIndexDataYears();
		$currentMap.ui.setCorpDataYears();
		$currentMap.ui.setPplFamilyHouseDataYears();
		$currentMap.ui.setNongImOgaDataYears();
		
		//$currentMap.ui.search();
		// mng_e 2020. 02. 18 j.h.Seok 조사년도 콤보박스 자동생성 추가
		
		/** 2020.09.02[한광희] 메인화면 내주변주요지표 카드 link 조회 추가 START */
		if(tempId != ""){
			$("#"+tempId).parent().trigger("click");
			$("#mapContent").show();
			$(".currentAllWrap").hide();
		}
		/** 2020.09.02[한광희] 메인화면 내주변주요지표 카드 link 조회 추가 END */

	});
	$(window).on("orientationchange",function(){
		setTimeout(function(){
			$currentMap.event.mapResize();
		},100);
	});
	$currentMap.ui = {
		map : null,
		mapData : null,
		
		subNavigation : {
			menu : null//메뉴의 네비게이션
		},
		
		//저장된 위치
		default_sido_cd : "25", // 시도코드
		default_sido_nm : "대전광역시", // 시도명
		default_sido_x : 990493.5945803534, // 시도 x
		default_sido_y : 1815828.82237, // 시도 y
		default_sgg_cd : "030", // 시군구코드
		default_sgg_nm : "서구", // 시군구명
		default_sgg_x : 986097.311596368, // 시군구 x
		default_sgg_y : 1809240.84784, // 시군구 y
		default_emdong_cd : "60", // 읍면동코드
		default_emdong_nm : "둔산2동", // 읍면동명
		default_emdong_x : 989749.2142006928, // 읍면동 x
		default_emdong_y : 1817802.41717, // 읍면동 y
		default_x : 989674, // x
		default_y : 1818313, // y
		
		//내 현재위치
		my_location_yn : "N", // 지도 조회후 내 위치로 오게하기
		my_x : null, // x
		my_y : null, // y
		my_sido_cd : null, // 시도코드
		my_sido_nm : null, // 시도명
		my_sgg_cd : null, // 시군구코드
		my_sgg_nm : null, // 시군구명
		my_emdong_cd : null, // 읍면동코드
		my_emdong_nm : null, // 읍면동명
		
		searchAdmCd : null,
		
		//시, 군,구 데이터
		areaSidoData : {}, // 시도 목록 저장
		areaSggData : {}, // 시군구 목록 저장
		areaEmdongData : {}, // 읍면동 목록 저장
		
		selectDataId : "",					// 선택된 stat 데이터 ID
		
		createMap: function(id) {
			this.map = new sMap.map();
			this.subNavigation.menu = new mapNavigation.UI(this.map);
			this.subNavigation.menu.navigatorId = "popupArea_";
			this.subNavigation.menu.initialize();
			
			this.map.isCurrentLocationMarker = true;
			this.map.isDrawBoundary = false;
			this.map.isPoiControl = true;
			this.map.center = [989674, 1818313];
			this.map.zoom = 1;
			var bookmark = W.bookmark;
			var sgisSearch = false;//통합검색에서 넘어온지 여부
			var sgisSearchParams = {};
			
			if(getParameter("type")&&getParameter("params")&&getParameter("title")){
				sgisSearch = true;
				$.each(decodeURIComponent(getParameter("params")).split("&"),function(cnt,node){
					var splitText = node.split("=")
					sgisSearchParams[splitText[0]] = splitText[1];
				});
				if(getParameter("x")&&getParameter("y")){
					this.map.center = [getParameter("x"),getParameter("y")];
				}
				if(getParameter("adm_cd")){
					this.map.zoom = this.map.getZoomToCd(getParameter("adm_cd"));
				}
				if(sgisSearchParams.year){
					this.map.bnd_year = sgisSearchParams.year;
				}
			}
			
			this.map.createMap($currentMap, id, {
				isLegendControl : true //범례 컨트롤 생성
				,isCurrentLocationMarker:false, // 지도에 현재위치 표시 안함
				isMapNavigator : true,
				isPoiControl : true,
				navigatorOption : {
					id : "popupArea_"
				}
			});
			
			this.map.gMap.whenReady(function() {
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 START */
				//지도 현재위치로 이동
				$currentMap.ui.map.moveCurrentLocation(true, function() {
					//맵의 중앙 adm_cd 가져오기
					$currentMap.ui.map.getCenterToAdmCd(null, function(res) { 
						var lv_my_center = $currentMap.ui.map.gMap.getCenter();
												
						$currentMap.ui.my_x = lv_my_center.x;
						$currentMap.ui.my_y = lv_my_center.y;
						$currentMap.ui.my_sido_cd = res.result.sido_cd;
						$currentMap.ui.my_sido_nm = res.result.sido_nm;
						$currentMap.ui.my_sgg_cd = res.result.sgg_cd;
						$currentMap.ui.my_sgg_nm = res.result.sgg_nm;
						$currentMap.ui.my_emdong_cd = res.result.emdong_cd;
						$currentMap.ui.my_emdong_nm = res.result.emdong_nm;
						
						//내 위치 텍스트
						//$("#currentMapMyLocation_name").text($currentMap.ui.my_sido_nm+" "+$currentMap.ui.my_sgg_nm+" "+$currentMap.ui.my_emdong_nm);
						//2022-11-04 수정 및 추가
						var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>'; // 2022.09.26 송은미 svg 추가
						
						if($currentMap.ui.my_sido_cd == "00"){
							$("#currentMapMyLocation_name").html($currentMap.ui.my_sido_nm);
						}else if($currentMap.ui.my_sido_cd != "00" && $currentMap.ui.my_sgg_cd == "999" && $currentMap.ui.my_emdong_cd == "00"){
							$("#currentMapMyLocation_name").html($currentMap.ui.my_sido_nm);
						}else if($currentMap.ui.my_sido_cd != "00" && $currentMap.ui.my_sgg_cd != "999" && $currentMap.ui.my_emdong_cd == "00"){
							$("#currentMapMyLocation_name").html($currentMap.ui.my_sido_nm+ svg +$currentMap.ui.my_sgg_nm);
						}else{
							$("#currentMapMyLocation_name").html($currentMap.ui.my_sido_nm+ svg +$currentMap.ui.my_sgg_nm+ svg +$currentMap.ui.my_emdong_nm);
						};
						
					});
				});
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 END */
			});

			// 메인화면 검색창에서 조회 후 내 주변 통계 조회
			if(sgisSearch){
				if(sgisSearchParams.isKosis==true){
					common_alert("모바일에선 kosis데이터를 조회할 수 없습니다");
				}else{
					var map = this.map;
					var sgisSearchOptions = getSearchOption(this.map,function(){
						if(hasText(getParameter("title"))){
							var tempTitle = decodeURIComponent(getParameter("title"));
							$(".maptit03").text(tempTitle+"111");
						}
					});
					if(sgisSearchOptions){
						accessTokenInfo(function(){
							map.censusApi.setStatsMapAdmCdCensusData(getParameter("type"),sgisSearchOptions,sgisSearchParams);
							/** 내 주변 통계 메뉴 swiper 위치 조정 START */
							var tempTypeId = decodeURIComponent(getParameter("type"));
							// 주요지표
							if(tempTypeId == "API_0301"){
								tempInitialSlide = 0;
							} 
							// 인구
							else if(tempTypeId == "API_0302"){
								tempInitialSlide = 1;
							}
							// 가구
							else if(tempTypeId == "API_0305"){
								tempInitialSlide = 2;
							}
							// 주택
							else if(tempTypeId == "API_0306"){
								tempInitialSlide = 3;
							}
							// 사업체
							else if(tempTypeId == "API_0304"){
								tempInitialSlide = 4;
							}
							// 농림어가
							else if(tempTypeId == "API_0310"){
								tempInitialSlide = 5;
							}
							var swiper = new Swiper('.swiper-container', {
								slidesPerView : 3.2,
								spaceBetween : 10,
								initialSlide : tempInitialSlide,
								pagination : {
									el : '.swiper-pagination',
									clickable : true,
								},
							});
							/** 내 주변 통계 메뉴 swiper 위치 조정 END */
							
							$("#mapContent").show();
							$(".currentAllWrap").hide();
						});
					}
				}
			}
			
			this.map.addControlEvent("movestart");
			this.map.addControlEvent("moveend");
			this.map.addControlEvent("zoomstart");
			this.map.addControlEvent("zoomend");
			this.map.moveCurrentLocation(false);
			
			$currentMap.ui.map.moveCurrentLocation(true, function() {
				setTimeout(function() {
					if(menuIndex=="" && sgisSearch != true){
						$currentMap.ui.search2(v_showData, v_showDataName, v_unit); // 2020-08-03 [곽제욱] 메인메뉴에서 이동할때와 안할때 구분
					} 
					
					/** 2020.09.02[한광희] 메인화면 내주변주요지표 카드 link 조회 추가 START */
					if(tempId != ""){
						$(".btn_search[data-id='"+menuType+"']").trigger("click");
					}
					/** 2020.09.02[한광희] 메인화면 내주변주요지표 카드 link 조회 추가 END */
				}, 500);
			});
		},
		
		/**
		 * @name : search2
		 * @description : 센서스 데이터 검색
		 * @date : 2020. 07. 09.
		 * @author : 곽제욱
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
									$currentMap.ui.map
											.getCenterToAdmCd(
													null,
													function(res) {
														var adm_cd;
														if (res.errCd == 0
																&& res.result.tot_reg_cd) {
															adm_cd = res.result.tot_reg_cd
														} else {
															adm_cd = $currentMap.ui.map.censusApi.lastParameters.option.adm_cd;
														}
														if (adm_cd.length >= 2) {
															$currentMap.ui.map.mapNavigation
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
																										return false;
																									}
																								});
																			});
															if (adm_cd.length >= 5) {
																$currentMap.ui.map.mapNavigation
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
																											return false;
																										}
																									});
																				});
																if (adm_cd.length >= 7) {
																	$currentMap.ui.map.mapNavigation
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
																												return false;
																											}
																										});
																					});
																	if (adm_cd.length > 7) {
																		if ($currentMap.ui.map.dataBoundary) {
																			$currentMap.ui.map.dataBoundary
																					.eachLayer(function(
																							layer) {
																						if (layer.feature.properties.adm_cd == adm_cd) {
																							if (typeof layer.bringToFront === "function") {
																								layer
																										.bringToFront();
																							}
																							$currentMap.ui.map
																									.layerClickStyle(layer);
																							$currentMap.ui.curAdmCd = adm_cd;
																						}
																					});
																		}
																	}
																}
															}
														}
														$(".Subject nav a")
																.removeClass(
																		"NoneAction");
													});
									$currentMap.search.setArea(data, showData, showDataName, unit);
								}
							}, {
								"year" : year,
								"bnd_year" : $currentMap.ui.map.bnd_year
							});
		},
		
		/**
		 * @name : setTable
		 * @description : 내주변통계 하위에 있는 테이블 값 셋팅
		 * @date : 2020. 07. 09.
		 * @author : 곽제욱
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
		},
		
		/**
		 * @name             : search
		 * @description      : 센서스 데이터 검색
		 * @date             : 2020. 06. 30. 
		 * @author	         : 곽제욱
		 * @history          :
		 */
		search: function(){	
			$currentMap.ui.map.poi.removePoi();	// poi 삭제
			
			var id = $(".on3").attr("id");
			var map = $currentMap.ui.map;
			var itemNavi = $currentMap.ui.subNavigation.menu;
			
			// 검색할 div 하위 List-Concard, List-ConCardFull 클래스 중에서 on
			var subtitleArray = [];
			// 사업체(API_0304), 농림어가(API_0310)은 상세검색 TAB이 나뉘어 있어 해당 TAB 정보만 출력
			if(id == "API_0304" || id == "API_0310"){
				var searchDivId = $("div[name="+id+"_DIV] .current").attr("id");
				subtitleArray = $("#"+searchDivId+"_serch_div").find(".List-ConCard.on, .List-ConCardFull.on").find("h2");
				
				// 사업체>산업분류 검색에서 산업분류는 선택한 분류의 마지막 정보 추가
				if(searchDivId == "industry"){
					subtitleArray.push($(".itemSearchList").find("li.on").find("p")[0]);
				}
			} else {
				subtitleArray = $("div[name="+id+"_DIV]").find(".List-ConCard.on, .List-ConCardFull.on").find("h2");				
			}
			var subtitle = "";
			for(var i=0; i<subtitleArray.length; i++){
				subtitle += subtitleArray[i].innerHTML;
				
				if((i+1)!=subtitleArray.length){
					subtitle += " + ";
				}
			}
			
			// subtitle이 없는경우 처리
			if(subtitle == ""){ 
				if(id=="API_0302"){
					subtitle = "총인구";
				} else if(id=="API_0304"){
					subtitle = "사업체 수";
				} else if(id=="API_0305"){
					subtitle = "총가구";
				} else if(id=="API_0306"){
					subtitle = "총주택";
				} 
			}
			
			//2022-10-21 subtitle 수정
//			$(".maptit03").text(subtitle);
			var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>';
			$(".maptit03").html(subtitle+svg);
			
			itemNavi.move(function(){
				$currentMap.search[id]();
			});
			
		},
		/**
		 * @name		 : dataBoardClick
		 * @description  : 데이터 보드 내역 보기
		 * @date		 : 2020.07.02
		 * @author		 : 곽제욱
		 * @history 	 :
		 * @param
		 */
		dataBoardClick : function(dataId){
			event.stopPropagation();
			$("#currentSelectDiv").show();			
		},
				
		/**
		 * @name         : setItemCurrentLocationNavigator
		 * @description  : 검색조건 년도 세팅
		 * @date         : 2020. 07. 06. 
		 * @author	     : 곽제욱
		 * @history      :
		 * @param
		 * */
		setMainIndexDataYears : function() {
			var html = "";
			
			// 선택된 라디오 버튼 값 확인
			var selectedRadioVal = $(":input:radio[name=API_0301]:checked").val();
			
			// common.js 의 센서스 데이터 년도
			for(var year = censusDataYear; year >= 2000; year--) {
				
				// 농림어가 관련 데이터는 5년 주기
				if(selectedRadioVal == "nongga_cnt" || 
						selectedRadioVal == "imga_cnt" || 
						selectedRadioVal == "naesuoga_cnt" || 
						selectedRadioVal == "haesuoga_cnt") {
					if((year % 5) == 0) {
						html += "<option value = '";
						html += year + "'";
						html += ">" + year + "년</option>";
					}
				} else {
					// 2015년 이전에는 5년단위 전국 총조사, 2015년 부터는 센서스 데이터로 1년주기
					if(year > 2015) {
						html += "<option value = '";
						html += year + "'";
						html += ">" + year + "년</option>";
					} else if((year % 5) == 0) {
						html += "<option value = '";
						html += year + "'";
						html += ">" + year + "년</option>";
					}
				}
			}
			
			$("#API_0301_ppltn_year").html(html);
		},
		
		// 주요지표 사업체, 사업체 공통
		setCorpDataYears : function() {
			var html = "";
			
			for(var year = companyDataYear; year >= 2000; year--) {
				html += "<option value = '";
				html += year + "'";
				html += ">" + year + "년</option>";
			}
			
			$("#API_0301_corp_year").html(html);
			$("#API_0304_year").html(html);
			//2022-10-14 [송은미] 테마검색 년도 추가
			$("#API_0304_year_theme").html(html);
		},
		
		// 인구, 가구, 주택
		setPplFamilyHouseDataYears : function() {
			var html = "";
			
			for(var year = censusDataYear; year >= 2000; year--) {
				if(year > 2015) {
					html += "<option value = '";
					html += year + "'";
					html += ">" + year + "년</option>";
				} else if((year % 5) == 0) {
					html += "<option value = '";
					html += year + "'";
					html += ">" + year + "년</option>";
				}
			}
			
			$("#API_0302_year").html(html);
			$("#API_0305_year").html(html);
			$("#API_0306_year").html(html);
		},
		
		
		// 농림어가
		setNongImOgaDataYears : function() {
			var html = "";
			
			for(var year = censusDataYear; year >= 2000; year--) {
					if((year % 5) == 0) {
						html += "<option value = '";
						html += year + "'";
						html += ">" + year + "년</option>";
					}
				}
			
			$("#API_0310_year").html(html);
			$("#API_0310_year_1").html(html);
		},
		
		/**
		 * @name         : boardGraph
		 * @description  : 상세정보- 그래픽 클릭
		 * @date         : 2020.07.08
		 * @author	     : 곽제욱
		 * @history 	 : 
		 * @param
		 * 		
		 */
		boardGraph : function() {
		},
		/**
		 * @name         : boardTable
		 * @description  : 상세정보- 표 클릭
		 * @date         : 2020.07.08
		 * @author	     : 곽제욱
		 * @history 	 : 
		 * @param
		 * 		
		 */
		boardTable : function() {
		},
		
		/**
		 * 
		 * @name         : createInfoTooltip
		 * @description  : 경계레이어 선택 시, 툴팁을 생성하여 정보를 표출한다.
		 * @date         : 2020. 07. 08. 
		 * @author	     : 곽제욱
		 * @history 	 :
		 * @param event  : 선택된 경계레이어
		 * @param data   : 선택된 경계레이어의 데이터정보
		 */
		createInfoTooltip : function(p_event, p_data, p_type, p_map) {
			
			// HTML 생성
			var lv_html = "<table style='margin:10px;'>";
			lv_html += "<tr><td colspan='3' class='admName' style='font-size: 14px; font-weight: bold; color: #22A6C1;'>";
			lv_html += p_data.properties.adm_nm; 
			lv_html += "</td></tr>";
			if (p_type != "polygon") {
				lv_html += "<tr style='height:5px'></tr>";
			}
			
			// 집계구 정보
			var lv_adm_cd = p_data.properties.adm_cd;
			if(lv_adm_cd != undefined && lv_adm_cd != null && lv_adm_cd.length == 13) {
				if (p_type == "polygon") {
					lv_html += "<tr style='height:5px'></tr>";
				}
				lv_html += "<tr><td class='statsData' style='font-size: 12px; padding-left: 5px;'>집계구 : "+lv_adm_cd+"</td></tr>";
			}
			
			// 데이터
			if (p_type != "polygon") {
				lv_html += "<tr>";
				lv_html += "<td class='statsData' style='font-size: 12px; padding-left: 5px;'>N/A</td>";
				lv_html += "</tr>";
			}
			lv_html += "</table>";
			
			// HTML 화면표시
			p_event.target.bindToolTip(lv_html, {
				direction: 'right',
				noHide:true,
				opacity: 1

			}).addTo(p_map.gMap)._showToolTip(p_event);
		}, 
		
		/**
		 * @name         : closeDashBoard
		 * @description  : 지도보기 기능
		 * @date         : 2020.07.10
		 * @author	     : 곽제욱
		 * @history 	 : 
		 * @param
		 * 		
		 */
		closeDashBoard : function() {
			$("#chart-area").hide();
		},
		
		/**
		 * @name           : showSelect
		 * @description    : 인구리스트 체크시 연령선택 영역 표출
		 * @date           : 2020. 07. 12. 
		 * @author	       : 곽제욱
		 * @history        :
		 * @param map      : map
		 * @param callback : callback
		 */
		showSelect : function(box) {
	    
		    var chboxs = document.getElementsByName("c1");
		    var vis = "none";
		    for(var i=0;i<chboxs.length;i++) { 
		        if(chboxs[i].checked){
		         vis = "flex";
		            break;
		        }
		    }
		    document.getElementById(box).style.display = vis; 
		}
		
	};
	$currentMap.callbackFunc = {
		//해당경계 선택 시, 발생하는 콜백함수
		didSelectedPolygon : function(event, data, type, map) {
			if(type==="data"){
				if(type == "data"){
					// 지역 선택시 해당 지역 정보 표출 START
					var areaTitle = "";
					var areaData = "";
					var areaDataTitle = "";
					var showData = data.info[0].showData;
					var areaTitle2 = data.properties.adm_nm;
					if(areaTitle == "") areaTitle = (data.properties.adm_nm).substring((data.properties.adm_nm).lastIndexOf(" "), data.properties.adm_nm.length);
					areaDataTitle += data.info[0].parameter.year + "년 " + data.info[0].showDataName + " : ";
					if(data.info[0][showData]=='N/A'){
						areaData += '-';
					} else {
						areaData += appendCommaToNumber(data.info[0][showData]) + "(" + data.info[0].unit + ")";
					}
					common_popup_area_click(areaTitle2, areaDataTitle, areaData);
					
						
					// 데이터보드 버튼 databoardBtn (onclick 삭제)
					var html = "<li style='line-height:2.5em;'><a href='#' class='databoardBtn'>데이터보드</a><li>"
					var cnt = $(".MapselectpopCon>ul>li").length;
					if(cnt < 3){
						$(".MapselectpopCon>ul").append(html);
					}
					// 지역 선택시 해당 지역 정보 표출 END
				}
				
			}
		},
		didEndBoundary : function(map,data){
			var adm_cd = map.getAdmCd();
			var adm_nm = "";
			$currentMap.ui.my_sido_cd = "";
			$currentMap.ui.my_sgg_cd = "";
			$currentMap.ui.my_emdong_cd = "";
			if(adm_cd.length ==2){
				if(adm_cd == "00"){
					adm_nm = "전국";
					$currentMap.ui.my_sido_cd = "00";
				} else {
					adm_nm = map.curSidoNm;
					$currentMap.ui.my_sido_cd = map.curSidoCd;
				}
			} else if(adm_cd.length == 5){
				adm_nm = map.curSidoNm + " "+ map.curSggNm;
				$currentMap.ui.my_sido_cd = map.curSidoCd;
				$currentMap.ui.my_sgg_cd = map.curSggCd;
			} else {
				adm_nm = map.curSidoNm + " "+ map.curSggNm + " " + map.curEmdongNm;
				$currentMap.ui.my_sido_cd = map.curSidoCd;
				$currentMap.ui.my_sgg_cd = map.curSggCd;
				$currentMap.ui.my_emdong_cd = map.curEmdongCd;
			}
				if($currentMap.ui.searchAdmCd==null || adm_cd != $currentMap.ui.searchAdmCd){
					$currentMap.ui.searchAdmCd = adm_cd;
					$currentMap.ui.activeAdmCd = adm_cd;
					$currentMap.ui.originalActiveAdmCd = adm_cd;
					//$("#currentMapMyLocation_name").text(adm_nm);
					const message = adm_nm;
					const arr = message.split(" ");
					//console.log(arr[0]);
					var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>'; // 2022.09.26 송은미 svg 추가
					if(arr[1] =="" || arr[1] ==null){
						$("#currentMapMyLocation_name").html(arr[0]);
					}else if (arr[2] =="" || arr[2] ==null){
						$("#currentMapMyLocation_name").html(arr[0]+svg+arr[1]);
					}else {
						$("#currentMapMyLocation_name").html(arr[0]+svg+arr[1]+svg+arr[2]);
					}
				}				
			//}
			if(data){
				$currentMap.search.setArea(data, map.censusApi.lastParameters.option.showData, map.censusApi.lastParameters.option.showDataName, map.censusApi.lastParameters.option.unit);
			}
		},
		// 현재위치로 이동 후 콜백. 현재위치 못찾으면 동작 안함
		didEndMoveCurrentLocation : function(map) {
			$currentMap.ui.search();
		},
	};
	$currentMap.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2020. 07. 08. 
		 * @author	     : 곽제욱
		 * @history      :
		 */
		setUIEvent: function() {
			Kakao.init('167fc6abf0eb4717e1f3de7895a0152a');
			this.mapResize();
			$currentMap.ui.createMap("map");
			//산업분류 코드 리스트 셋팅
			$currentMap.api.setIndustryList();
			
			//POI 버튼 클릭 이벤트
			$(".dataPoiBtn").click(function(){
				common_poiPopupCall();
				//20200813 박은식 poi 매뉴 스와이프 기능 추가 (화면에 그려진 이후 이벤트 실행도되록)
				$("#poi_list").touchFlow({
					axis : "x"
				});		
				$("#poi_list").data("touchFlow").go_page(0);
			});
		    $(".List-ConCardFull").click(function(){
		    	var cnt = $(this).find("#itemDropboxBtn").val();
		    	if($("#itemDropCon"+cnt+"").is(":visible")){
	        		$("#itemDropCon"+cnt+"").hide()
	        	}else{
	        		$("#itemDropCon"+cnt+"").show()
	        	}
	        });
			//radio 버튼 class 변경 이벤트
			$("input:radio").change(function(){
				$(this).parents().parent().parent().childern(".List-ConCardFull").removeClass("on");
				$(this).parents().parent().parent().childern(".List-ConCard").removeClass("on");
				if($(this).is(":checked")){
					$(this).parents().addClass("On");
				}
				
				// mng_s 2020. 02. 18 j.h.Seok 조사년도 콤보박스 자동생성 추가
				$interactive.ui.setMainIndexDataYears();
				$interactive.ui.setCorpDataYears();
				// mng_e 2020. 02. 18 j.h.Seok 조사년도 콤보박스 자동생성 추가
			});
			
			
			//상세검색 선택 오류 로직 추가
			//api0301Div click
			$("#api0301Div>div>.List-ConCard").click(function(){
				// mng_s 2020. 02. 18 j.h.Seok 조사년도 콤보박스 자동생성 추가
				$currentMap.ui.setMainIndexDataYears();
				$currentMap.ui.setCorpDataYears();
				// mng_e 2020. 02. 18 j.h.Seok 조사년도 콤보박스 자동생성 추가
			});
			//checkbox 버튼 class 변경 이벤트
			
			
			//mng_s 20211025 이진호
			//농림어가 대상 선택시 조사년도 다시 불러오기
			//임가는 최소년도가 2005년 부터 이기 때문에 다시 불러와서 셋팅해줘야 함
			$("#api0310Div").find("#API3010_Opt").find("#generation").click(function(){ //가구원별 상세조건 탭 클릭 시 조사년도 다시 세팅 하도록
				var generation_inputVal = $("#api0310Div").find('#generation_serch_div').find('.List-ConCard.on').children('input').val();
				setNongImOgaDataYears2(generation_inputVal);
			});
			
			$("#api0310Div").find("#API3010_Opt").find("#houseHold").click(function(){ //가구별 상세조건 탭 클릭 시 조사년도 다시 세팅하도록
				var houseHold_inputVal = $("#api0310Div").find('#houseHold_serch_div').find('.List-ConCard.on').children('input').val();
				setNongImOgaDataYears2(houseHold_inputVal);
			});
			
			
			$("#api0310Div").find('#data_type').find('.List-ConCard').click(function(){ //'가구원별 상세조건'에서 선택한 대상 항목이 '임가'인지 구별하고 input값이 '2' 또는 'forestry_cnt' 일 경우 임가
				var inputVal = $(this).children('input').val();
				setNongImOgaDataYears2(inputVal);
			});
			
			$("#api0310Div").find('#conditionType').find('.List-ConCard').click(function(){ //'가구별 상세조건'에서 선택한 대상 항목이 '임가'인지 구별하고 input값이 '2' 또는 'forestry_cnt' 일 경우 임가
				var inputVal = $(this).children('input').val();
				setNongImOgaDataYears2(inputVal);
			});
			
			function setNongImOgaDataYears2 (inputVal){ //임가는 다른 농림어가 지표와 달리 최소선택가능 년도가 2005년이기 때문에 분기 처리
				var html = "";
				if(inputVal == "2" || inputVal == "forestry_cnt"){ //임가일 경우
					for(var year = censusDataYear; year >= 2005; year--) {
						if((year % 5) == 0) {
							html += "<option value = '";
							html += year + "'";
							html += ">" + year + "년</option>";
						}
					}
				}else{
					for(var year = censusDataYear; year >= 2000; year--) { // 임가가 아닌 나머지
						if((year % 5) == 0) {
							html += "<option value = '";
							html += year + "'";
							html += ">" + year + "년</option>";
						}
					}
				}
				$("#API_0310_year").html(html);
				$("#API_0310_year_1").html(html);
			};
			//mng_e 20211025 이진호
			
			//선택 조건일 경우 class 변경 이벤트
			$("input:checkbox[data-able]").change(function(){
				var dataAble = $("#"+$(this).data("able"));
				if($(this).is(":checked")){
					dataAble.children().children().removeClass("disabled");
				}else{
					dataAble.children().children().children().parent().removeClass("on");
					dataAble.find("input:checkbox").prop("checked", false);
					dataAble.children().children().addClass("disabled");
				}
				dataAble.find("input,select").prop("disabled",!$(this).is(":checked"));
			});
			//검색 조건에 탭으로 나눠져 있는 class 변경 이벤트
			$(".Detail2_2>.TabGroup .tab-item").click(function(){
				var parent = $(this).parents(".Detail2_2");
				$(this).parents(".TabGroup").children(".tab").removeClass("M_on");
				$(this).parents(".tab").addClass("M_on");
				parent.children(".TabArea").hide();
				parent.children(".TabArea:eq("+$(this).parents(".tab").index()+")").show();
				return false;
			});
			
			//사업체>산업분류검색
			$("#find_search").submit(function(){
				if($(this).find("input[name=keywords]").val()){
					var search = $("#company-list>div[data-text*="+$(this).find("input[name=keywords]").val()+"]");
					console.log(search)
					if(search.length>0){
						$("#company-list>div").hide();
						search.show();
					}else{
						common_confirm(
							"찾으시는 산업분류는 해당 깊이에서 존재하지 않습니다.<br>해당 깊이의 전체목록을 보시겠습니까?",
							function() {
								$("#company-list>div").show();
								return false;
							}
							,""
						);
					}
				}else{
					$("#company-list>div").show();
				}
				return false;
			});
			//사업체>산업분류 변경 이벤트
			$("body").on("change","#company-list input[name=company_list]:radio",function(){
				$currentMap.api.activeClassCode = $(this).val();
				$currentMap.api.activeClassName = $(this).parent().text();
			});
			//테마 검색에서 리스트 클릭시 이벤트
			$(".Theme_List>.theme-list>a").click(function(){
				$(this).parents(".Theme_List").find(".theme-list.Open").removeClass("Open");
				$(this).parent("li").addClass("Open");
				return false;
			});
			//테마 검색에서 테마 변경시 이벤트
			$(".Theme_List input[name=theme-code]:radio").change(function(){
				$(this).parents(".Theme_List").children(".theme-list.Select").removeClass("Select");
				$(this).parents(".theme-list").addClass("Select");
			});
			var hideArea = function(element){
				$(".Content>.Btn_Top>nav>a").not($(element)).removeClass("M_on");
				$("#chart-area,#table-area").hide();
			};
			//지도 버튼 클릭시 이벤트
			$("#map-area-button").click(function(){
				hideArea($(this));
				$(this).addClass("M_on");
				return false;
			});
			//차트 버튼 클릭시 이벤트
			$("#chart-area-button").click(function(){
				if(!$(this).hasClass("NoneAction")){
					hideArea($(this));
					$(this).addClass("M_on");
					$("#chart-area").height($(window).height()/2).show();
					$("html,body").stop().animate({
						scrollTop: $(window).height()/2
					}, 300);
					var chart = $("#chart-area>.chart").highcharts();
					$.each(chart.series[0].data,function(cnt,node){
						if(node.color==$currentMap.search.activeChartColor){
							chart.tooltip.refresh([node])
							return false;
						}
					});
				}
				return false;
			});
			
			//생활환경 정보 이미지 클릭
			$(document).on("click", "#lifeEnvironmentToggle", function() {
				srvLogWrite('O0', '51', '02', '01', '', '');
				var lvThis = $(this);
				// 표시
				if(lvThis.hasClass("infoOff")) {
					lifeEnvironmentToggle(true, $currentMap.ui.my_sido_cd, $currentMap.ui.my_sgg_cd, $currentMap.ui.my_emdong_cd);
				}
				// 감춤
				else {
					lifeEnvironmentToggle(false);
				}
			});
			//농림어가, 사업체 상세조건 클릭
			$(".tabDataboardtxt").click(function(){
				$(this).parent().children().removeClass("current");
				$(this).addClass("current");
				if($(this).parent().children(".tabDataboardtxt").eq(0).hasClass("current")){
					$(this).parent().parent().parent().find(".TabArea").eq(1).hide();
					$(this).parent().parent().parent().find(".TabArea").eq(0).show();
				}else{
					$(this).parent().parent().parent().find(".TabArea").eq(0).hide();
					$(this).parent().parent().parent().find(".TabArea").eq(1).show();
				}
			})
			//생활환경 정보 상세보기
			$(document).on("click", "#lifeEnvironmentPopup_open", function() {
				srvLogWrite('O0', '51', '02', '02', '', '');
				var lvThis = $(this);
				var lvSidoCd = lvThis.attr("sido_cd");
				var lvSggCd = lvThis.attr("sgg_cd");
				var lvEmdongCd = lvThis.attr("emdong_cd");
				if(lvSidoCd == "null") lvSidoCd = "";
				if(lvSggCd == "null") lvSggCd = "";
				if(lvEmdongCd == "null") lvEmdongCd = "";
				if(lvSidoCd != undefined && lvSidoCd != null && lvSidoCd != "" && lvSidoCd != "99") {
					lifeEnvironmentPopupSelect(lvSidoCd, lvSggCd, lvEmdongCd);
				}
			});
			//20200813 박은식 생활환경 팝업 구분 선택
			$(document).on("click", "#lifeEnvironmentPopup_list > ul > li.infoMenu", function() {
				var lvThis = $(this);
				var lvThisIndex = lvThis.data("index");
				var lvThisText = lvThis.children("a").text();
				//메뉴 선택
				$("#lifeEnvironmentPopup_list > ul > li.infoMenu").removeClass("on");
				lvThis.addClass("on");
				
				//화면 표시
				$("#lifeEnvironmentPopup div.infoPage").hide();
				$("#lifeEnvironmentPopup_page_"+lvThisIndex).show();
			});	
			//생활환경 팝업 닫기
			$(document).on("click", "#lifeEnvironmentPopup_close", function() {
				lifeEnvironmentPopupToggle(false);
			});
			
			//각 데이터보드 클릭 이벤트
			//dataBoardCall() 로 변경
			$(document).on("click", ".databoardBtn", function(){

				var chart = $("#currentChart").highcharts();
				if(chart != null){
					//map Area 숨기기
					mapAreaToggle(); //2022-10-05 [송은미] 데이터 보트 활성화 
					$("#common_popup_back").parent().hide();
					$("#common_popup_area_click").hide();
					
					$("#currentMap_databoardDiv").scrollTop(0);	// 2020.09.09[한광희] 데이터보드 스크롤 상단 이동
					//galleryTop.slideTo(1);
				}else{
					common_alert("데이터를 조회하신 후 사용할 수 있습니다", "");
				}

			});
			
			//연령(선택) select box 변경시
			$("#populationAge select,#3fAge select").change(function(){
				var parentId = $(this).parents("p").attr("id");
				var isFrom = /from$/.test($(this).attr("name"));
				var api = $("#search-box>div:visible:not(#Btn_Search_Detail)").data("id");
				var from = parseInt($("#"+parentId+" select[name="+api+"_age_from]").val());
				var to = parseInt($("#"+parentId+" select[name="+api+"_age_to]").val());
				if(from>=to){
					var value = isFrom?to-4:from+4;
					if(value>=100){
						$("#"+parentId+" select[name="+api+"_age_"+(isFrom?"from":"to")+"] option:last").prop("selected",true);
					}else{
						$("#"+parentId+" select[name="+api+"_age_"+(isFrom?"from":"to")+"] option[value="+value+"]").prop("selected",true);
					}
				}
				var ageToLabel = $("#"+parentId+" select[name="+api+"_age_to] option").index($("#"+parentId+" select[name="+api+"_age_to] option:selected"));
				if(ageToLabel == 20){
					$("#"+api+"_age_to_label").hide();
				}else{
					$("#"+api+"_age_to_label").show();
				}
			});
			//연면적(선택) select box	변경시
			$("#API_0306_bdspace_from").change(function() {
				var spaceToOption = $("#API_0306_bdspace_to option").index($("#API_0306_bdspace_to option:selected"));
				var spaceFrom = $("#API_0306_bdspace_from option:eq("+spaceToOption+")").val();
				if (parseInt($(this).val()) >= parseInt(spaceFrom)) {
					$(this).val(spaceFrom);
					spaceToOptionLabel = $("#API_0306_bdspace_from option").index($("#API_0306_bdspace_from option:selected"));
				}
			});
			$("#API_0306_bdspace_to").change(function() {
				var spaceFromOption = $("#API_0306_bdspace_from option").index($("#API_0306_bdspace_from option:selected"));
				var spaceToOptionLabel = $("#API_0306_bdspace_to option").index($("#API_0306_bdspace_to option:selected"));
				var spaceTo = $("#API_0306_bdspace_to option:eq("+spaceFromOption+")").val();
				if (parseInt($(this).val()) <= parseInt(spaceTo)) {
					$(this).val(spaceTo);
					spaceToOptionLabel = $("#API_0306_bdspace_to option").index($("#API_0306_bdspace_to option:selected"));
				}
				if(spaceToOptionLabel == 8){
					$("#houseBdspaceToLabel").hide();
				}else{
					$("#houseBdspaceToLabel").show();
				}
			});
			//주요지표 상세검색 변경시
			$("#search-box .Detail2_1 .List li").click(function(){
				if($("#search-box .Detail2_1 .List :Checked").val() == $("#search-box .Detail2_1 .List li:eq(13) input").val()){
					$("#ppltn").hide();
					$("#corp").show();
				}else{
					$("#ppltn").show();
					$("#corp").hide();
				}
			});
			//인구 조사년도 변경시
			$("#API_0302_year").change(function() {
				
				// mng_s 2020. 02. 18 j.h.Seok 오류 수정, 2015년 센서스 데이터 이후로 교육정도/혼인상태 정보 없음
//				if($("#API_0302_year").val() == 2015){
				if($("#API_0302_year").val() >= 2015){
				// mng_e 2020. 02. 18 j.h.Seok 오류 수정, 2015년 센서스 데이터 이후로 교육정도/혼인상태 정보 없음
					
					$("#API_0302_yaer_check").hide();
					$("#API_0302_yaer_check input[name=API_0302_check]").prop('checked', false);
					//$("#API_0302_yaer_check li").addClass("disabled");
					$("#API_0302_yaer_check div").addClass("disabled");
				}else{
					$("#API_0302_yaer_check").show();
				}
			});
			//가구 조사년도 변경시
			$("#API_0305_year").change(function() {
				
				// mng_s 2020. 02. 18 j.h.Seok 오류 수정, 2015년 센서스 데이터 이후로 점유형태 정보 없음
//				if($("#API_0305_year").val() == 2015){
				if($("#API_0305_year").val() >= 2015){
				// mng_e 2020. 02. 18 j.h.Seok 오류 수정, 2015년 센서스 데이터 이후로 교육정도/혼인상태 정보 없음
					
					$("#API_0305_yaer_check").hide();
					$("#API_0305_yaer_check input[name=API_0305_check]").prop('checked', false);
					$("#API_0305_yaer_check li").addClass("disabled");
				}else{
					$("#API_0305_yaer_check").show();
				}
			});
			//주택 조사년도 변경시
			//mng_s 20211021 이진호 , 2021 센서스 반영
			//default 의 url: sgisContextPath + "/ServiceAPI/map/currentMap/getConstYear.json"이 이상하여 잠시 하드코딩으로 수정
			$("#API_0306_year").change(function() {
				
				$("#UsePridCd select,#ConstYear select").addClass("disabled").prop('disabled', true);
				$("#UsePridCd input,#ConstYear input").prop('checked', false);
				var html = "";
				
				$("#API_0306_const_year").empty();
				
				switch(parseInt(this.value)) {
					case 2020:
						$("#API_0306_const_year").empty();
						html += '<option value="20">2020년</option>';
						html += '<option value="19">2019년</option>';
						html += '<option value="01">2018년</option>';
						html += '<option value="02">2017년</option>';
						html += '<option value="03">2016년</option>';
						html += '<option value="04">2015년</option>';
						html += '<option value="05">2014년</option>';
						html += '<option value="06">2013년</option>';
						html += '<option value="07">2012년</option>';
						html += '<option value="08">2011년</option>';
						html += '<option value="09">2010년</option>';
						html += '<option value="10">2005년 ~ 2009년</option>';
						html += '<option value="11">2000년 ~ 2004년</option>';
						html += '<option value="12">1990년 ~ 1999년</option>';
						html += '<option value="13">1980년 ~ 1989년</option>';
						html += '<option value="14">1979년 이전</option>';
						html += '<option value="99">미상</option>';
						$("#API_0306_const_year").append(html);
						$("#API_0306_const_year").val("20"); //2020
						break;
					case 2019:
						$("#API_0306_const_year").empty();
						html += '<option value="19">2019년</option>';
						html += '<option value="01">2018년</option>';
						html += '<option value="02">2017년</option>';
						html += '<option value="03">2016년</option>';
						html += '<option value="04">2015년</option>';
						html += '<option value="05">2014년</option>';
						html += '<option value="06">2013년</option>';
						html += '<option value="07">2012년</option>';
						html += '<option value="08">2011년</option>';
						html += '<option value="09">2010년</option>';
						html += '<option value="10">2005년 ~ 2009년</option>';
						html += '<option value="11">2000년 ~ 2004년</option>';
						html += '<option value="12">1990년 ~ 1999년</option>';
						html += '<option value="13">1980년 ~ 1989년</option>';
						html += '<option value="14">1979년 이전</option>';
						html += '<option value="99">미상</option>';
						$("#API_0306_const_year").append(html);
						$("#API_0306_const_year").val("19"); //2019
						break;
					case 2018:
						$("#API_0306_const_year").empty();
						html += '<option value="01">2018년</option>';
						html += '<option value="02">2017년</option>';
						html += '<option value="03">2016년</option>';
						html += '<option value="04">2015년</option>';
						html += '<option value="05">2014년</option>';
						html += '<option value="06">2013년</option>';
						html += '<option value="07">2012년</option>';
						html += '<option value="08">2011년</option>';
						html += '<option value="09">2010년</option>';
						html += '<option value="10">2005년 ~ 2009년</option>';
						html += '<option value="11">2000년 ~ 2004년</option>';
						html += '<option value="12">1990년 ~ 1999년</option>';
						html += '<option value="13">1980년 ~ 1989년</option>';
						html += '<option value="14">1979년 이전</option>';
						html += '<option value="99">미상</option>';
						$("#API_0306_const_year").append(html);
						$("#API_0306_const_year").val("01"); //2018
						break;
					case 2017:
						$("#API_0306_const_year").empty();
						html += '<option value="01">2017년</option>';
						html += '<option value="02">2016년</option>';
						html += '<option value="03">2015년</option>';
						html += '<option value="04">2014년</option>';
						html += '<option value="05">2013년</option>';
						html += '<option value="06">2012년</option>';
						html += '<option value="07">2011년</option>';
						html += '<option value="08">2010년</option>';
						html += '<option value="10">2005년 ~ 2009년</option>';
						html += '<option value="11">2000년 ~ 2004년</option>';
						html += '<option value="12">1990년 ~ 1999년</option>';
						html += '<option value="13">1980년 ~ 1989년</option>';
						html += '<option value="14">1979년 이전</option>';
						html += '<option value="99">미상</option>';
						$("#API_0306_const_year").append(html);
						$("#API_0306_const_year").val("01"); //2017
						break;
					case 2016:
						$("#API_0306_const_year").empty();
						html += '<option value="01">2016년</option>';
						html += '<option value="02">2015년</option>';
						html += '<option value="03">2014년</option>';
						html += '<option value="04">2013년</option>';
						html += '<option value="05">2012년</option>';
						html += '<option value="06">2011년</option>';
						html += '<option value="07">2010년</option>';
						html += '<option value="10">2005년 ~ 2009년</option>';
						html += '<option value="11">2000년 ~ 2004년</option>';
						html += '<option value="12">1990년 ~ 1999년</option>';
						html += '<option value="13">1980년 ~ 1989년</option>';
						html += '<option value="14">1979년 이전</option>';
						html += '<option value="99">미상</option>';
						$("#API_0306_const_year").append(html);
						$("#API_0306_const_year").val("01"); //2016
						break;
					case 2015:
						$("#API_0306_const_year").empty();
						html += '<option value="01">2015년</option>';
						html += '<option value="02">2014년</option>';
						html += '<option value="03">2013년</option>';
						html += '<option value="04">2012년</option>';
						html += '<option value="05">2011년</option>';
						html += '<option value="06">2010년</option>';
						html += '<option value="10">2005년 ~ 2009년</option>';
						html += '<option value="11">2000년 ~ 2004년</option>';
						html += '<option value="12">1990년 ~ 1999년</option>';
						html += '<option value="13">1980년 ~ 1989년</option>';
						html += '<option value="14">1979년 이전</option>';
						html += '<option value="99">미상</option>';
						$("#API_0306_const_year").append(html);
						$("#API_0306_const_year").val("01"); //2015
						break;
					case 2010:
						$("#API_0306_const_year").empty();
						html += '<option value="01">2010년</option>';
						html += '<option value="02">2009년</option>';
						html += '<option value="03">2008년</option>';
						html += '<option value="04">2007년</option>';
						html += '<option value="05">2006년</option>';
						html += '<option value="06">2005년</option>';
						html += '<option value="07">2000년 ~ 2004년</option>';
						html += '<option value="08">1995년 ~ 1999년</option>';
						html += '<option value="09">1990년 ~ 1994년</option>';
						html += '<option value="10">1980년 ~ 1989년</option>';
						html += '<option value="11">1970년 ~ 1979년</option>';
						html += '<option value="12">1960년 ~ 1969년</option>';
						html += '<option value="13">1959년 이전</option>';
						html += '<option value="99">미상</option>';
						$("#API_0306_const_year").append(html);
						$("#API_0306_const_year").val("01"); //2010
						break;
					case 2005:
	                   	html  = '<option value="06">2005년</option>';
	                   	html += '<option value="07">2000년~2004년</option>';
	                   	html += '<option value="08">1995년~1999년</option>';
	                   	html += '<option value="09">1990년~1994년</option>';
	                   	html += '<option value="10">1980년~1989년</option>';
	                   	html += '<option value="11">1970년~1979년</option>';
	                   	html += '<option value="12">1960년~1969년</option>';
	                   	html += '<option value="13">1959년 이전</option>';
	                   	$("#API_0306_const_year").append(html);
	                   	$("#API_0306_const_year").val("06"); //2005
						break;
					case 2000:
						
						//mng_s 20211022 이진호, 2000년~2004년 -> 2000년으로 수정
						//html += '<option value="07">2000년~2004년</option>';
						html += '<option value="07">2000년</option>';
						//mng_e 20211022 이진호
	                   	html += '<option value="08">1995년~1999년</option>';
	                   	html += '<option value="09">1990년~1994년</option>';
	                   	html += '<option value="10">1980년~1989년</option>';
	                   	html += '<option value="11">1970년~1979년</option>';
	                   	html += '<option value="12">1960년~1969년</option>';
	                   	html += '<option value="13">1959년 이전</option>';
	                   	$("#API_0306_const_year").append(html);
	                   	$("#API_0306_const_year").val("07"); //2000
						break;
					//default:
						//2010년 이후 건축년도의 코드값이 전부 다름	leekh
						//jQuery.ajax({
					 		//type:"POST",
					 		//url: sgisContextPath + "/ServiceAPI/map/currentMap/getConstYear.json",
					 		//data:{	
					 				//"year": this.value	 				
					 			 // },
					 		//success:function(res){
					 			//var result = res.result;
					 			//for(var i=0; i<result.length; i++){
					 				//html = "";
					 				//var code = result[i].const_year_cd;
					 				//var name = result[i].const_year_nm;
					 				
					 				//html += '<option value="' + code + '">' + name + '</option>';
					 				
					 				//$("#API_0306_const_year").append(html);
					 			//}
					 			//$("#API_0306_const_year").val(result[0].const_year_cd); 

					 		//}
						//});
						//break;
						//mng_e 20211021 이진호
				}

			});
			
			//2022-10-05 [송은미] 상세검색 title svg 추가
			var subtitle = $(".List-ConCard, .List-ConCardFull").find("h2").html();
			var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>'; // 2022.09.26 송은미 svg 추가
			$(".maptit03").html(subtitle+svg);
			
			//각 그리드헤더 클릭 이벤트
			$(".List-ConCard, .List-ConCardFull").each(function(){
				$(this).click(function(){
					//이벤트  조건
					if($(this).hasClass("disabled")){
						return false;
					}
					
					var divId = $(this).parents(".currentContent").attr("id");
					if(divId==""||divId==undefined){
						
					} else if(divId=="api0304Div"){
						var radioName = $(this).children("input").attr("name");
						$(".List-ConCard").children("input[name='"+radioName+"']").not("input[type='checkbox']").parent().removeClass("current");
						$(this).addClass("current");
					}
					$currentMap.ui.map.bnd_year = bndYear;
					
					if($(this).children("input").prop("type") == 'checkbox'){
						if($(this).hasClass("on")){
							$(this).removeClass("on");
							$(this).find("input:checkbox").prop("checked", false);
						}else{
							$(this).addClass("on");
							$(this).find("input:checkbox").prop("checked", true);
						}
					}else if($(this).children("input").prop("type") == 'radio') {
						var radioName = $(this).children("input").attr("name");
						$(".List-ConCard").children("input[name='"+radioName+"']").not("input[type='checkbox']").parent().removeClass("on");
						$(".List-ConCardFull").children("input[name='"+radioName+"']").not("input[type='checkbox']").parent().removeClass("on");
						$(this).addClass("on");
					};
					$(this).find("input:radio").prop("checked", true);
					//2022-11-07 선택 시 subtitle 수정
//					var subtitle = $(this).find("h2").html();
					//2022-10-05 [송은미] 선택 시 subtitle 수정
//					$(".maptit03").text(subtitle);					
					var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>'; // 2022.09.26 송은미 svg 추가
					//$(".maptit03").html(subtitle+svg);
					$(".maptit03").html("선택"+svg);
				});
			});
			
			//지표 조회 버튼 클릭
			$(".btn_search").click(function(){
				/** 필수체크 START */
				var tempId = $(this).data("id");
				// 사업체
				//2022-11-08 주택 지표 관련 이벤트 추가 //비주거용 건물(상가, 공장, 여관 등) 내 주택
				if($('#house_type .List-conRow:eq(2) .List-ConCard.on:eq(0) h2').text().length > 20) {
					let nonBuilding1 = ($('#house_type .List-conRow:eq(2) .List-ConCard.on:eq(0) h2').text()).substr(0, 7);
					let nonBuilding2 = ($('#house_type .List-conRow:eq(2) .List-ConCard.on:eq(0) h2').text()).substr(21, 26);
					$('#house_type .List-conRow:eq(2) .List-ConCard.on:eq(0) h2').text(nonBuilding1+nonBuilding2);
				}
				if(tempId == "API_0304"){
					// 산업분류검색
					if($("#industry").hasClass("current") && $(".itemSearchList").find("li").length == 0){
						common_alert("산업분류를 선택하세요.");
						return false;
					} else if($("#thema").hasClass("current") && $("input:radio[name='theme-code']:checked").parent().hasClass("on") == false){
						common_alert("테마유형을 선택하세요.");
						return false;
					}
				}
				//2022-11-09 상세검색 체크 추가
				if(tempId == "API_0305"){
					// 세대구성(선택)
					if($("#household_type .List-conRow .List-ConCard.on").length > 3){
						common_alert("세대구성은 3개까지만 선택할 수 있습니다.");
						return false;
					} 
				}
				if(tempId == "API_0306"){
					// 산업분류검색
					if($("#house_type .List-conRow .List-ConCard.on").length > 3){
						common_alert("유형은 3개까지만 선택할 수 있습니다.");
						// 2022-12-06 text 원복 
						$('#house_type .List-conRow:eq(2) .List-ConCard:eq(0) h2').text('비주거용 건물(상가, 공장, 여관 등) 내 주택');
						return false;
					} 
				}
				
				/** 필수체크 END */
				
				$("#mapContent").show();
				$(".currentAllWrap").hide();
				$(".maptit03").removeClass("active");
				$currentMap.ui.search();
				//2022-11-23 추가
				$('#house_type .List-conRow:eq(2) .List-ConCard:eq(0) h2').text('비주거용 건물(상가, 공장, 여관 등) 내 주택');

			});
						
			var toggle = false;
	        // 지역설정       selectArea
                   // $("body").on("click", "#selectArea", function() {
	        $("body").on("click", ".selectArea", function() {
				//2020-09-02 [곽제욱] 공통팝업(관심지역 이동) 기능 수정 START
	        	//화면 띄움
	        	//$("#common_popup_back").parent().show();
	        	$("#common_popup_area").show();
	        	
	        	//이전 이벤트 제거
	        	$("#common_popup_back").unbind();
	        	$("#common_popup_area_ok").unbind();
	        	$("#common_popup_area_close").unbind();
	        	
	        	//새로운 이벤트 맵핑
	        	$("#common_popup_back").on("click", function() {
	        		//팝업 숨김
	        		$("#common_popup_back").parent().hide();
	        		$("#common_popup_area").hide();
	        	
	        	});
	        	
	        	$("#common_popup_area_ok").on("click", function() { //확인버튼
	        		//팝업 숨김
	        		$("#common_popup_back").parent().hide();
	        		$("#common_popup_area").hide();
        			var sido_cd = $("#popupArea_sido option:selected").val();
        			var sido_nm = $("#popupArea_sido option:selected").text();
        			var sgg_cd = $("#popupArea_sgg option:selected").val();
        			var sgg_nm = "";
        			var emdong_cd = $("#popupArea_emdong option:selected").val();
        			var emdong_nm = "";
        			
        			if(emdong_cd != "00"){
        				sgg_nm = $("#popupArea_sgg option:selected").text();
        				emdong_nm = $("#popupArea_emdong option:selected").text();
        				var x_coor = $("#popupArea_emdong option:selected").data("x");
        				var y_coor = $("#popupArea_emdong option:selected").data("y");
        			} else if(sgg_cd != "999"){
        				sgg_nm = $("#popupArea_sgg option:selected").text();
        				var x_coor = $("#popupArea_sgg option:selected").data("x");
        				var y_coor = $("#popupArea_sgg option:selected").data("y");
        			} else {
        				var x_coor = $("#popupArea_sido option:selected").data("x");
        				var y_coor = $("#popupArea_sido option:selected").data("y");
        			}

        			common_area_ok_callback(x_coor, y_coor, sido_cd, sido_nm, sgg_cd, sgg_nm, emdong_cd, emdong_nm);
	        	});
	        		
        		$("#common_popup_area_close").on("click", function() {
        			//팝업 숨김
        			$("#common_popup_back").parent().hide();
        			$("#common_popup_area").hide();
    				common_area_cancel_callback();
        		});
	        			
			});
	        
	       	        
	        // 범례 버튼 클릭
			$("body").on("click", "#legendInfoBtn", function(){
				srvLogWrite('O0', '51', '05', '01', '', '');
				if ($('.tooltipbox').css('visibility') == 'hidden'){
					$(this).addClass("on");
					$('.tooltipbox').css('visibility', 'visible');
				} else {
					$(this).removeClass("on");
					$('.tooltipbox').css('visibility', 'hidden');
				}
			});
			
			// 색상 범례 새로고침 이미지 클릭
			$("body").on("click", "#reverseBtn", function(){
				$currentMap.ui.map.legend.reverseColor();
			});
			
			/**
			 * 
			 * @name         : showNumberClick
			 * @description  : 통계값 표출유무 버튼 클릭 시
			 * @date         : 2020.07.10 
			 * @author	     : 주형식
			 * @history 	 :
			 */
			$("#showNumberBtn").click(function(){
				//통계표출 on일 경우 off로 변경
				if($currentMap.ui.map.showCaption) {
					$('.databtn01').removeClass("on");
					srvLogWrite('O0', '51', '04', '00', 'OFF', '');
					$currentMap.ui.map.removeCaption();
				} else {	//통계표출 off일 경우 on으로 변경
					$(".databtn01").addClass("on"); 
					srvLogWrite('O0', '51', '04', '00', 'ON', '');
					$currentMap.ui.map.setCaption();
				}
				
			});
			
			/** 2020.09.09[한광희] 범례 팝업 닫기(X) 버튼 추가 START */
			// 범례 닫기 버튼 이벤트
			$("body").on("click", "#dataRemarks_close", function(){
				$("#legendInfoBtn").removeClass("on");
				$('.tooltipbox').css('visibility', 'hidden');
			});
			/** 2020.09.09[한광희] 범례 팝업 닫기(X) 버튼 추가 END */
		},
		
		/**
		 * @name         : mapResize
		 * @description  : UI 리사이즈에 대한 이벤트. 
		 * @date         : 2020. 07. 08. 
		 * @author	     : 곽제욱
		 * @history      :
		 */
		mapResize: function(){
			$highchartApi.width = $(window).width();
			$("#table-area .scrolls").height($(window).height()-100)
			$currentMap.event.setMapSize();
			$currentMap.event.setItemBoxSize();
		},
		/**
		 * @name         : showItemBox
		 * @description  : 검색 항목 보이기
		 * @date         : 2020. 07. 08. 
		 * @author	     : 곽제욱
		 * @history      :
		 */
		showItemBox: function(){
			$('#search-item-box').show();
			$currentMap.event.setItemBoxSize();
			return false;
		},
		/**
		 * @name         : setItemBoxSize
		 * @description  : 검색 항목 높이 값 변경
		 * @date         : 2020. 07. 08. 
		 * @author	     : 곽제욱
		 * @history      :
		 */
		setItemBoxSize: function(){
//			$("#search-item-box").height($(window).height()-$(".Wrap>.Header").outerHeight(true));
//			$(".DetailBox").height($(window).outerHeight(true) - ($(".Wrap>.Header").outerHeight(true) + $(".Open_Type1>p.SelectArea:visible").outerHeight(true) + $(".SubjectB").outerHeight(true)+$("#Btn_Search_Detail").outerHeight(true)+$(".Open_Type1>h3").outerHeight(true)));
		},
		/**
		 * @name         : setMapSize
		 * @description  : 지도 사이즈 변경
		 * @date         : 2020. 07. 08. 
		 * @author	     : 곽제욱
		 * @history      :
		 */
		setMapSize: function(){
			if($("body").hasClass("full")){
				$("#map").height($(window).height());
			}else{
				$("#map").height($(window).height()-$(".Wrap>.Header").outerHeight(true)-$(".Wrap>.Content>.Btn_Top").outerHeight(true)-$(".Wrap>.Content>.SelectArea").outerHeight(true));
			}
		}
	};
	
	// 데이터보드 클릭 이벤트
	function mapAreaToggle(){
		
		if($("#chart-area").css("display")=="none"){
			$("#chart-area").show();
			
			var galleryThumbs2 = new Swiper("#currentMap_databoardTit", {
				spaceBetween: 0,
		        slidesPerView: 3,
		        freeMode: true,
		        watchSlidesVisibility: true,
		        watchSlidesProgress: true,
		      });
		      var galleryTop2 = new Swiper("#currentMap_databoardDiv", {
		    	  spaceBetween: 10,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					thumbs: {
						swiper: galleryThumbs2
					}
					/** 2020.09.23[한광희] 데이터보드 상단이동 추가 START */
					, on : {
						slideChange : function(){
							$("#currentMap_databoardDiv").scrollTop(0,0);	// 데이터보드 스크롤 상단이동
						}
					}
					/** 2020.09.23[한광희] 데이터보드 상단이동 추가 END */
		      });
		      
		      /** 2020.09.28[한광희] 내주변통계 데이터보드 수정 START */
		      // 표 두번째 탭 선택
		      galleryTop2.slideTo(1);
		      /** 2020.09.28[한광희] 내주변통계 데이터보드 수정 END */
		} else {
			$("#chart-area").hide();
		}
		
	}	
	
	/**
	 * @name           : getSearchOption
	 * @description    : 검색조건 생성
	 * @date           : 2020. 07. 08. 
	 * @author	       : 곽제욱
	 * @history        :
	 * @param map      : map
	 * @param callback : callback
	 */
	function getSearchOption(map,callback){
		var options = {
			"adm_cd" : getParameter("adm_cd")
		};
		if (getParameter("type") == "API_0301") {
			options.showData = getParameter("showData");
			options.unit = "명";
		} else if (getParameter("type") == "API_0302") {
			options.showData = "population";
			options.unit = "명";
		} else if (getParameter("type") == "API_0304") {
			options.showData = "corp_cnt";
			options.unit = "개";
		} else if (getParameter("type") == "API_0305") {
			options.showData = "household_cnt";
			options.unit = "가구";
		} else if (getParameter("type") == "API_0306") {
			options.showData = "house_cnt";
			options.unit = "호";
		} else if (getParameter("type") == "API_0307") {
			options.showData = "farm_cnt";
			options.unit = "가구";
		} else if (getParameter("type") == "API_0308") {
			options.showData = "forestry_cnt";
			options.unit = "가구";
		} else if (getParameter("type") == "API_0309") {
			options.showData = "fishery_cnt";
			options.unit = "가구";
		} else if (getParameter("type") == "API_0310") {
			options.showData = "population";
			options.unit = "명";
		} else{
			return null;
		}
		options.showDataName = map.censusApi[getParameter("type")].showName[options.showData];
		options.callback = function(data){
			$currentMap.search.setArea(data, options.showData, options.showDataName, options.unit);
			$("#search-item-box").hide();
			if(typeof callback==="function"){
				callback();
			}
		};
		return options;
	}
}(window, document));

function helpPopup(id){
	$(".helpPopBack").show();
	$("#"+id).show();
}

function helpPopupClose(id){
	$(".helpPopBack").hide();
	$("#"+id).hide();
}

// 2020-09-02 [곽제욱] 관심지역이동 콜백함수 START
function common_area_ok_callback(x_coor, y_coor, sido_cd, sido_nm, sgg_cd, sgg_nm, emdong_cd, emdong_nm) {
	//변수 입력
	$currentMap.ui.my_x = x_coor;
	$currentMap.ui.my_y = y_coor;
	$currentMap.ui.my_sido_cd = sido_cd;
	$currentMap.ui.my_sido_nm = sido_nm;
	$currentMap.ui.my_sgg_cd = sgg_cd;
	$currentMap.ui.my_sgg_nm = sgg_nm;
	$currentMap.ui.my_emdong_cd = emdong_cd;
	$currentMap.ui.my_emdong_nm = emdong_nm;
	//$currentMap.ui.mapStat.indicator.adm_cd = sido_cd+sgg_cd+emdong_cd;
	
	/** 2020-09-24 [곽제욱] 관심지역이동 선택시 검색전 현재시도, 시군구, 읍면동 세팅 START */
	
	$currentMap.ui.map.curSidoCd = sido_cd;
	if(sgg_cd != "999" && sgg_cd != ""){
		$currentMap.ui.map.curSggCd = sgg_cd;
	} else if(sgg_cd == "999"){
		$currentMap.ui.map.curSggCd = "";
	}
	if(emdong_cd != "00" && emdong_cd != ""){
		$currentMap.ui.map.curEmdongCd = emdong_cd;
	} else if(emdong_cd == "00"){
		$currentMap.ui.map.curEmdongCd = "";
	}
	/** 2020-09-24 [곽제욱] 관심지역이동 선택시 검색전 현재시도, 시군구, 읍면동 END */
	
	//내 위치 텍스트
            //$("#currentMapMyLocation_name").text($currentMap.ui.my_sido_nm+" "+$currentMap.ui.my_sgg_nm+" "+$currentMap.ui.my_emdong_nm);
	var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>'; // 2022.09.26 송은미 svg 추가
	$("#currentMapMyLocation_name").html($currentMap.ui.my_sido_nm+ svg +$currentMap.ui.my_sgg_nm+ svg +$currentMap.ui.my_emdong_nm);
								
	var id = $(".on3").attr("id");
	$currentMap.ui.map.mapNavigation.move();
	$currentMap.ui.map.setPolygonCode(); // 2020-09-24 [곽제욱] 관심지역이동 선택시 검색전 폴리곤코드 세팅 
	$currentMap.search[id]();
	
	// $('#currentMapMyLocation_name').text($("#popupArea_sido option:checked").text() +" "+ $("#popupArea_sgg option:checked").text() +" "+ $("#popupArea_emdong option:checked").text()); // 2020-09-24 [곽제욱] 관심지역이동시 지역명 표출이 중복되어 주석처리									
}

function common_area_cancel_callback(){
	
}
/*function sidoData() {
	let accessToken = "4deda9c7-4e98-4602-b6ab-42e0dc67c53e";
	$.ajax({
	    url: openApiPath + "/OpenAPI3/addr/stageWR.json",
	    type: 'get', //api는 get으로 받아야함
	    dataType : 'json',
	    async: false,
	    data: {
	    	accessToken:accessToken,
	    	pg_yn: "0"
	    }
	}).done(function (res) {
		let result = res.result;
		console.log(result);
	});
}
function sggData() {
	accessToken = "4deda9c7-4e98-4602-b6ab-42e0dc67c53e";
	$.ajax({
	    url: openApiPath + "/OpenAPI3/addr/stageWR.json",
	    type: 'get', //api는 get으로 받아야함
	    dataType : 'json',
	    async: false,
	    data: {
	    	accessToken: accessToken,
	    	pg_yn: "0",
	    }
	}).done(function (res) {
		let result2 = res.result;
		console.log(result2);
	}); 
}*/
// 2020-09-02 [곽제욱] 관심지역이동 콜백함수 END

	/**
	 * @name : 
	 * @description : 관심지역변경 팝업 호출
	 * @date : 2022.09.16
	 * @author : 송은미
	 * @history :
	 */
	$(document).on("click", "#currentMapMyLocation_name", function(){
		common_area(
					"emdong",	// 관심지역 표출 범위
					$currentMap.ui.my_sido_cd,
					$currentMap.ui.my_sgg_cd,
					$currentMap.ui.my_emdong_cd, // 읍면동 코드
					// 변경
					function(x_coor, y_coor, sido_cd, sido_nm, sgg_cd, sgg_nm, emdong_cd, emdong_nm) {
						//변수 입력
						$currentMap.ui.my_x = x_coor;
						$currentMap.ui.my_y = y_coor;
						$currentMap.ui.my_sido_cd = sido_cd;
						$currentMap.ui.my_sido_nm = sido_nm;
						$currentMap.ui.my_sgg_cd = sgg_cd;
						$currentMap.ui.my_sgg_nm = sgg_nm;
						$currentMap.ui.my_emdong_cd = emdong_cd;
						$currentMap.ui.my_emdong_nm = emdong_nm;
//						$currentMap.ui.mapStat.indicator.adm_cd = sido_cd+sgg_cd;
						
						//내 위치 텍스트
						var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>'; // 2022.09.26 송은미 svg 추가
						//$("#currentMapMyLocation_name").html($currentMap.ui.my_sido_nm+ svg +$currentMap.ui.my_sgg_nm+ svg +$currentMap.ui.my_emdong_nm);
						
					
						
						$currentMap.ui.map.mapNavigation.move([$currentMap.ui.my_x, $currentMap.ui.my_y]);	// 지도이동													
					},
					// 취소
					function() {
					}
				);
	});