/**
 * 대화형 통계지도 화면에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2010/09/10  초기 작성
 * author : 권차욱, 김성현
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$policyStaticMap = W.$policyStaticMap || {};
	$(document).ready(
		function() {
			srvLogWrite( "E0", "01", "01", "00", "", "" ); // jrj 로그 >> 정책통계지도 메인 뷰
			
			$policyStaticMap.noReverseGeoCode = true;
			$policyStaticMap.ui.createMap("mapRgn_1", 0);
			$policyStaticMap.ui.createMap("mapRgn_2", 1);
			$policyStaticMap.event.setUIEvent();
			
			// mng_s 20190405 김건민
			$(window).resize(function() {
				if($(window).height() <= 740){

					$(".list_btn").css('bottom', '-100px');
					$(".nav-list").css('height', '150%');
					$(".menuAutoClose").css('bottom', '-120px');
					//$(".scrollBox").css('height', 'calc(100% - 107px)');
					$(".nav-sidebar").css('overflow', 'auto');
				}else if (iHeight == 750){
					$(".list_btn").css('bottom', '87px');
					$(".nav-list").css('height', '100%');
					$(".menuAutoClose").css('bottom', '69px');
					//$(".menuAutoClose").css('bottom', '-244px');
					//$(".scrollBox").css('height', 'calc(100% - 107px)');
					$(".directions-details").css('top', '70%');
				}else{
					$(".list_btn").css('bottom', '111px');
					$(".menuAutoClose").css('bottom', '88px');
					$(".nav-list").css('height', '100%');
					//$(".list_btn").css('bottom', '-100px');
					//$(".menuAutoClose").css('bottom', '-244px');
					//$(".nav-list").css('height', '100%');
					//$(".nav-sidebar").css('overflow', 'hidden');
				}
			});
			
			
			var iWidth = $(window).width();
			var iHeight = $(window).height();
			
			if (iHeight <= 740) {
				$(".list_btn").css('bottom', '-100px');
				$(".nav-list").css('height', '150%');
				$(".menuAutoClose").css('bottom', '-120px');
				$(".directions-details").css('top', '70%');
				$(".nav-sidebar").css('overflow', 'auto');
			}else if (iHeight == 750){
				$(".list_btn").css('bottom', '87px');
				$(".nav-list").css('height', '100%');
				$(".menuAutoClose").css('bottom', '69px');
				//$(".menuAutoClose").css('bottom', '-244px');
				//$(".scrollBox").css('height', 'calc(100% - 107px)');
				$(".directions-details").css('top', '70%');
			}else{
				//$(".list_btn").css('bottom', '-187px');
				$(".list_btn").css('bottom', '111px');
				$(".nav-list").css('height', '100%');
				//$(".menuAutoClose").css('bottom', '-244px');
				//$(".scrollBox").css('height', 'calc(100% - 107px)');
				$(".directions-details").css('top', '70%');
			}
			
			// mng_e 20190405 김건민
			
	});
	
	$policyStaticMap = {
			noReverseGeoCode : false
	};
	$policyStaticMap.ui = {
			namespace : "policyStaticMap",
			mapList : [],
			mapInfoList : [],
			curMapId : 0,
			reportPopup : null,
			isLocalGov : false, //지자체 URL 유무
			isTemp : false,     //임시저장 유무
			localGovData : null,//지자체 URL 파라미터,
			localGovUrl : null, //지자체 URL
			settingInfo : {},   //지표설정정보
			loginUserId : "",   //사용자 아이디
			poiLayerList : [], 		//poi 레이어 리스트 
			analysisOriginMultiData : null,
			analysisCurrentMultiData : null,
			defaultPoiCnt : 200, //최소 POI 필터링 숫자
			mapBounds : null,
			result : true, // getMyPosition 유무
			
			//2019-04-22 [김남민] 정책통계지도 > 9차(8차), 10차 분리 적용. START
			demandYearHtml : "", // 년도리스트
			//2019-04-22 [김남민] 정책통계지도 > 9차(8차), 10차 분리 적용. END
			
			getLogParams : function(){
				var params = "지역:"+$policyStaticMap.ui.settingInfo["adm_nm"];
				return params;
			},
			
			/**
			 * 
			 * @name         : doAnalysisShareInfo
			 * @description  : 파라미터 정보를 분석한다.
			 * @date         : 2017. 05. 29. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 지자체/임시저장
			 * @param data   : 파라미터정보
			 */
			doAnalysisShareInfo : function (type, data) {
				var sido_cd = $policyStaticMapLeftmenu.ui.defaultSidoCd;
				var sgg_cd = $policyStaticMapLeftmenu.ui.defaultSggCd;
				var admCd = null;
				
				switch(type) {
					case "localgov": //지자체 연계 URL
						admCd = this.setLocalGovInfo(data, sido_cd, sgg_cd);
						sido_cd = admCd.sido_cd;
						sgg_cd = admCd.sgg_cd;
						break;
					case "temp": //임시저장
						admCd = this.setTempInfo(data, sido_cd, sgg_cd);
						sido_cd = admCd.sido_cd;
						sgg_cd = admCd.sgg_cd;
						break;
					case "soc":		//생활SOC
						sido_cd = "31";
						sgg_cd = "31011";
						admCd = this.setSocInfo( data, sido_cd, sgg_cd );
						break;
					default:
						this.getMyPosition();
						//mng_s 20180330_김건민
						if(this.result){
							$policyStaticMap.request.reqGeocode(953931, 1952053);
						}
						//mng_e 20180330_김건민
						$policyStaticMapLeftmenu.event.openAnimate(1);
						
						//2019-01-22 LNB 최하단에 메뉴 자동닫기 추가. (초기화면 변경 원상복구 처리)
//						//2018-12-21 정책통계지도 > LNB화면 > LNB하단의 ≡목록 메뉴 구현
//						var lvID = "CTGR_001";
//						$(".themul li, .thematic li").removeClass("on");
//						$(".themul li, .thematic li").each(function() {
//							if(lvID == $(this).attr("id")) $(this).addClass("on");
//						});
//						$policyStaticMapLeftmenu.event.openAnimate(2);
//						var lvFlag = false;
//				        var lvIntervalGetDetailCategoryList = setInterval(function(){
//				        	var lvDataAdmCd = $("#current-sgg-select option:selected").attr("data-adm_cd");
//				            if(lvFlag == false && lvDataAdmCd != undefined) {
//				            	lvFlag == true;
//				            	$policyStaticMapLeftmenu.ui.getDetailCategoryList(lvID);  // 2017.08.11 [개발팀] 세부지표 리스트 조회
//				            	clearInterval(lvIntervalGetDetailCategoryList);
//				            }
//				            //console.log(lvDataAdmCd);
//				        }, 500);
//						$(".normalBox01").scrollTop(0);
//						$(".quickBox.step01").stop().animate({ "left": "-244px" }, 200);
//			            $(".nav-sidebar").stop().animate({ "left": "0px" }, 200);
//			            //2018-12-19 LNB화면 최소화시에도 대상지역 선택 표출 필요
//			            $("#current-sido-select-2").parent().parent().css({"left":"auto","right":"0"});
//			            $("#current-sido-select-2").parent().parent().show();
//			            
						break;
				}
				
				$policyStaticMapLeftmenu.ui.getSidoList("current", sido_cd, sgg_cd, function() {
					switch(type) {
						case "localgov":
							$policyStaticMap.ui.localGovCallback(sido_cd, sgg_cd);
							break;
						case "temp":
							$policyStaticMap.ui.tempInfoCallback(sido_cd, sgg_cd, data);
							break;
						default:
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : setLocalGovInfo
			 * @description  : 지자체연계 정보를 설정한다.
			 * @date         : 2017. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data   : 파라미터정보
			 * @param sido_cd: 시도코드
			 * @param sgg_cd : 시군구코드
			 */
			setLocalGovInfo : function(data, sido_cd, sgg_cd) {
				if (data.code != undefined && !isNaN(parseInt(data.code))) {
					if (data.isbnu == undefined || data.isbnu == "false") {
						this.localGovData = data;
						this.isLocalGov = true;
						this.isLocalGovUrl = document.location.href;
												
						switch(data.code.length) {
							case 2:
								sido_cd = data.code;
								sgg_cd = null;
								break;
							case 5:
								sido_cd = data.code.substring(0,2);
								sgg_cd = data.code.substring(2,5);
								break;
							default:
								break;
						}
						
						$("#policy-sido-select").val(sido_cd);
						$(".headerEtc").hide();
						$(".headerContents").hide();
						$("#footer").hide();
						$(".containerBox").css({
							"top" : "0px",
							"height" : "100%"
						});
						$("#bookmarkBtn").hide();
						$("#shareBtn").hide();
						
					}else if (data.isbnu == "true") {
						$(".headerEtc").show();
						$(".headerContents").show();
						$("#footer").show();
					}
				}
				return {
					"sido_cd" : sido_cd,
					"sgg_cd" : sgg_cd
				}
			},
			
			/**
			 * 
			 * @name         : setTempInfo
			 * @description  : 정책통계지도 임시저장 정보를 설정한다.
			 * @date         : 2017. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data   : 파라미터정보
			 * @param sido_cd: 시도코드
			 * @param sgg_cd : 시군구코드
			 */
			setTempInfo : function(data, sido_cd, sgg_cd) {
				this.isTemp = true;	
				
				$(".inner").css("display","none");
				
				if (data.region_cd != null && 
					data.region_cd != undefined) {
					var adm_cd = data.region_cd;
					if (adm_cd != 00) {
						switch(adm_cd.length) {
							case 2:
								sido_cd = adm_cd;
								break;
							case 5:
								sido_cd = adm_cd.substring(0,2);
								sgg_cd = adm_cd.substring(2,5);
								break;
							case 7:
								break;
						}
					}
				}
				
				$(".headerEtc").hide();
				$(".headerContents").hide();
				$("#footer").hide();
				$(".containerBox").css({
					"top" : "0px",
					"height" : "100%"
				});
				$("#clearBtn").hide();
				$("#reportBtn").hide();
				$("#bookmarkBtn").hide();
				$("#shareBtn").hide();
				$("#dataManageBtn").hide();
				$("#helpBtn").hide();
				
				return {
					"sido_cd" : sido_cd,
					"sgg_cd" : sgg_cd
				}
			},
			
			setSocInfo : function( data, sido_cd, sgg_cd ){ //생활SOC
				
				$policyStaticMap.ui.doMaxSize(1);
				
//				$(".headerEtc, .headerContents, #footer").hide();
//				$(".containerBox").css({ "top" : "0px", "height" : "100%" });
				
//				$("#clearBtn,#bookmarkBtn,#shareBtn,#dataManageBtn,#helpBtn").hide();
				
				$policyStaticMapLeftmenu.ui.getSidoList("current", sido_cd, sgg_cd, function(){
					$("#current-sido-select,#current-sido-select-2").prop("disabled", true);
				});
				
				return {
					"sido_cd" : sido_cd,
					"sgg_cd" : sgg_cd
				}
			},
			
			/**
			 * 
			 * @name         : localGovCallback
			 * @description  : 지자체연계 콜백함수
			 * @date         : 2017. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param sido_cd: 시도코드
			 * @param sgg_cd : 시군구코드
			 */
			localGovCallback : function(sido_cd, sgg_cd) {
				$(".global_nav, .searchArea").hide(); // 2020.10.22 '.global_nav, .searchArea,' 추가
				switch(sido_cd) {
					case "00":
						$("#current-sido-select option[value='"+$policyStaticMapLeftmenu.ui.defaultSidoCd+"']").prop("selected", true);
						//2018-12-19 LNB화면 최소화시에도 대상지역 선택 표출 필요
						if($("#current-sido-select-2").length > 0) $("#current-sido-select-2 option[value='"+$policyStaticMapLeftmenu.ui.defaultSidoCd+"']").prop("selected", true);
						break;
					default:
						$("#current-sido-select option[value='"+sido_cd+"']").prop("selected", true);
						//2018-12-19 LNB화면 최소화시에도 대상지역 선택 표출 필요
						if($("#current-sido-select-2").length > 0) $("#current-sido-select-2 option[value='"+sido_cd+"']").prop("selected", true);
						$policyStaticMapLeftmenu.ui.getSggList("current", sido_cd, "", function() {
							setTimeout(function() {
								$policyStaticMap.ui.localGovSetNavi(sido_cd, sgg_cd);
								$policyStaticMap.ui.getLocalGovBoundary(sido_cd, sgg_cd);
							}, 200);
						});
						break;
				}
			},
			
			/**
			 * 
			 * @name         : localGovCallback
			 * @description  : 정책통계지도 임시저장 콜백함수
			 * @date         : 2017. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param sido_cd: 시도코드
			 * @param sgg_cd : 시군구코드
			 * @param data   : 파라미터 정보 
			 */
			tempInfoCallback : function(sido_cd, sgg_cd, data) {
				switch(sido_cd) {
					case "00":
						$("#current-sido-select option[value='"+$policyStaticMapLeftmenu.ui.defaultSidoCd+"']").prop("selected", true);
						//2018-12-19 LNB화면 최소화시에도 대상지역 선택 표출 필요
						if($("#current-sido-select-2").length > 0) $("#current-sido-select-2 option[value='"+$policyStaticMapLeftmenu.ui.defaultSidoCd+"']").prop("selected", true);
						if (data.idx_id != undefined) {
							$policyStaticMapLeftmenu.ui.getPolicyMapInfoByIdxId(data.idx_id);
						}
						break;
					default:
						$("#current-sido-select option[value='"+sido_cd+"']").prop("selected", true).trigger("change");
						//2018-12-19 LNB화면 최소화시에도 대상지역 선택 표출 필요
						if($("#current-sido-select-2").length > 0) $("#current-sido-select-2 option[value='"+sido_cd+"']").prop("selected", true);
						
						if (sgg_cd != null && sgg_cd != "") {
							$policyStaticMapLeftmenu.ui.getSggList("current", sido_cd, sgg_cd, function() {
								$("#current-sgg-select option[value='"+sgg_cd+"']").prop("selected", true).trigger("change");
								if (data.idx_id != undefined) {
									$policyStaticMapLeftmenu.ui.getPolicyMapInfoByIdxId(data.idx_id);
								}
							});
						}else {
							if (data.idx_id != undefined) {
								$policyStaticMapLeftmenu.ui.getPolicyMapInfoByIdxId(data.idx_id);
							}
						}
						break;
				}
			},
			
			/**
			 * 
			 * @name         : getMyPosition
			 * @description  : 현재 위치를 가져온다.
			 * @date         : 2017. 10. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			getMyPosition : function(){
				//mng_s 20180330_김건민	
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function (position) {
						var utmkXY = new sop.LatLng(position.coords.latitude, position.coords.longitude);
						result = false;
						$policyStaticMap.request.reqGeocode(utmkXY.x, utmkXY.y);
					}, function (error) {
						result = false;
						$policyStaticMap.ui.setRegionCd($policyStaticMapLeftmenu.ui.defaultSidoCd);
						console.log("브라우져가 기능을 제공하지 않습니다.");
					});
				}else {
					result = false;
					$policyStaticMap.ui.setRegionCd($policyStaticMapLeftmenu.ui.defaultSidoCd);
					console.log("브라우져가 기능을 제공하지 않습니다.");
				}
				//mng_e 20180330_김건민
			},
	
			/**
			 * 
			 * @name         : createMap
			 * @description  : 맵 및 맵에 오버레이될 그래프, 범례 등을 생성한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱, 김성현
			 * @history 	 :
			 * @param id	 : 맵 아이디
			 * @param seq	 : 맵 순서
			 */
			createMap : function(id, seq) {
				var map = new sMap.map();
				map.createMap($policyStaticMap, id, {
					center : [ 989674, 1818313 ],
					zoom : 8, //9->8
					measureControl : false,
					statisticTileLayer: true
				});
				
				map.id = seq;
				//map.addControlEvent("movestart");
				//map.addControlEvent("moveend");
				//map.addControlEvent("zoomend");	
								
				//범례 호출 함수
				var legend = new sLegendInfo.legendInfo(map);
				legend.initialize($policyStaticMap.ui);
				map.legend = legend;
				legend.createLegend();
				legend.legendType = "equal";
				//작업부분 끝
				
				//사용자지정컨트롤설정
				$policyStaticMap.ui.mapList[seq] = map;
				var drawControl = new Draw.Control.Manager();
				map.gMap.addControl(drawControl); 
				map.drawControl = drawControl;
				map.gMap.whenReady(function() {
					map.createHeatMap();
					map.mapMove([map.gMap.getCenter().x,map.gMap.getCenter().y],8);
					
					//지도이동 동기화 이벤트 설정
					if ($policyStaticMap.ui.mapList.length == 2) {
						var isLocked = $("#mapRgn_lock_btn").attr("alt");
						if (isLocked == "locked") {
							$policyStaticMap.event.mapSyncEvent();
						}else {
							$policyStaticMap.event.mapUnSyncEvent();
						}
					}
					
				});
				
				map.gMap.on("moveend", function(e) {
					$policyStaticMap.callbackFunc.didMapMoveEnd(e, map);
				});
				
			},
			
			/**
			 * 
			 * @name         : doReqStatsData
			 * @description  : 수요변화지표를 조회한다.
			 * @date         : 2017. 08. 21. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param options: 파라미터정보
			 * @param map	 : 맵정보
			 */
			doReqStatsData : function(data, map) {

				$policyStaticMapApi.ui.clear(map);
				this.analysisOriginMultiData = null;
				this.analysisCurrentMultiData = null;

				if( data.call_param.year == "" ){
					return false;
				}

				switch(parseInt(this.settingInfo["idx_type"])) {
					case 1:	//수요변화지표
						this.doDemandIndexData(data, map);
						$("#legend_"+this.mapList[1].legend.id).show();
						break;
					case 2:	//통계연산형지표
						this.doCalculateIndexData(data, map);
						$("#legend_"+this.mapList[1].legend.id).show();
						break;
					case 3: //시설분석형지표
						this.doAnalysisIndexData(data, map);
						$("#legend_"+this.mapList[1].legend.id).hide();
						break;
					default:
						break;
				}
			},
			
			/**
			 * 
			 * @name         : doReqPoiData
			 * @description  : 통계정보를 조회한다.
			 * @date         : 2017. 09. 15. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param options : 파라미터정보
			 */
			doReqPoiData : function(data, map) {
				var titleList = [];
				map.multiLayerControl.multiData = [];
				this.analysisOriginMultiData = null;
				this.analysisCurrentMultiData = null;
				
				var setData = this.setPoiParams(data, map);
				switch(parseInt(data.data_div)) {
					case 1:	 //센서스통계
						$policyStaticMapApi.ui.doCensusPoiData(setData, map);
						break;
					case 3: //나의데이터
						$policyStaticMapApi.ui.doUserPoiData(setData, map);
						break;
					case 4:	 //협업형데이터
						$policyStaticMapApi.ui.doLocalPoiData(setData, map);
						break;
					case 5:	 //LBDMS 데이터
						$policyStaticMapApi.ui.doLbdmsPoiData(setData, map);
						break;
					case 6: //생활SOC
						$policyStaticMapApi.ui.doSocPoiData(setData, map); 
						break;
					default:
						break;
				}
				titleList.push(data.title);
				
				//타이릍 설정
				var tmpOptions = {
					title : titleList.join(",")
				};
				this.setTitle(tmpOptions, map);
			},
			
			/**
			 * 
			 * @name         : setPoiParams
			 * @description  : POI데이터 파라미터를 설정한다.
			 * @date         : 2017. 09. 15. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param type   : 타입정보
			 * @param options: 파라미터정보
			 * @param map    : 맵정보
			 */
			setPoiParams : function(options, map) {
				var call_param = options.call_param;
				if (typeof(options.call_param) == "string") call_param = eval("("+options.call_param+")");
				var map_param = eval("("+options.map_param+")");

				if( $policyStaticCombineMap.ui.poiTitleNm != map_param.showTitle ){
					$policyStaticCombineMap.ui.poiTitleNm = $policyStaticCombineMap.ui.poiTitleNm+($policyStaticCombineMap.ui.poiTitleNm==""?"":",")+map_param.showTitle;
				}
				if( $policyStaticCombineMap.ui.poiSourceNm != options.source ){
					$policyStaticCombineMap.ui.poiSourceNm = $policyStaticCombineMap.ui.poiSourceNm+($policyStaticCombineMap.ui.poiSourceNm==""?"":",")+options.source;
				}

				var paramsData = {
						call_url : options.call_url,
						params : call_param,
						unit : map_param.unit,
						filter : map_param.showData,
						title : map_param.showTitle,
						map_div : options.map_div-1,
						adm_nm : this.settingInfo["adm_nm"],
						data_div : options.data_div,
						data_type : options.data_type,
						call_info_serial : options.call_info_serial,
						map_param : map_param
				};
				//비자치구 여부 체크
				var isAtdrc = false;
				var adm_cd = this.settingInfo["adm_cd"];
				var sido_cd = adm_cd.substring(0,2);
				if ($psmCombine.ui.atdrcList[sido_cd]){
					$.each($psmCombine.ui.atdrcList[sido_cd],function(sidoCnt, sidoNode){
						if (sidoNode.adm_cd == adm_cd) {
							isAtdrc = true;
						}
					});
				}
				
				if (isAtdrc) {
					//2017.01.08 [개발팀] 비자치구 조회 수정
					paramsData.params["atdrc_type"] = "1";
				}
				
				switch(options.data_div) {
					case "1":	 //센서스통계
						//20201028 수정
						if( options.idx_id == '2547676290201710301551567684108432782' ){
							paramsData.params["base_year"] = companyDataYear;
						} else {
							if( call_param.type && call_param.type == 'company' ){
								paramsData.params["base_year"] = companyDataYear;
							} else {
								paramsData.params["base_year"] = dataYear;
							}
						}

						paramsData.params["adm_cd"] = adm_cd;
						break;
					case "4":	 //협업형데이터
						paramsData.params["base_year"] = bndYear;
						paramsData.params["page_num"] = "1";
						paramsData.params["page_size"] = "1000000";
						switch(adm_cd.length) {
							case 2: //시도
								paramsData.params["sido_cd"] = adm_cd;
								break;
								break;
							case 5: //시군구
								paramsData.params["sido_cd"] = adm_cd.substring(0,2);
								paramsData.params["sgg_cd"] = adm_cd.substring(2,5);
								break;
							case 7: //읍면동
								paramsData.params["sido_cd"] = adm_cd.substring(0,2);
								paramsData.params["sgg_cd"] = adm_cd.substring(2,5);
								paramsData.params["emdong_cd"] = adm_cd.substring(5,7);
								break;
						}
						break;
					case "3": //나의데이터
						paramsData.params["adm_cd"] = adm_cd;
						break;
					default:
						break;
				}
				
				return paramsData;
			},
			
			/**
			 * 
			 * @name         : doDemandIndexData
			 * @description  : 수요변화지표를 조회한다.
			 * @date         : 2017. 08. 21. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param options: 파라미터정보
			 * @param map	 : 맵정보
			 */
			doDemandIndexData  : function(data, map) {
				var setData = this.setParams(data, map);
				
				switch(data.data_div) {
					case "3": //나의데이터
						map.multiLayerControl.multiData = [];
						$policyStaticMapApi.ui.doUserStatsData(setData, map);
						break;
					default:
						map.multiLayerControl.multiData = [];
						for (var k=0; k<setData.admList.length; k++) {
							setData.param.params["adm_cd"] = setData.admList[k];
							$policyStaticMapApi.ui.doCensusStatsData(setData, map);
						}
						break;
				}
			},
			
			/**
			 * 
			 * @name         : doCalculateIndexData
			 * @description  : 통계연산형지표를 조회한다.
			 * @date         : 2017. 09. 08. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param options: 파라미터정보
			 * @param map	 : 맵정보
			 */
			doCalculateIndexData : function(options, map) {
				var setData = this.setParams(options, map);
				
				switch(parseInt(setData.param.data_div)) {
					case 1:   //센서스 통계
						map.multiLayerControl.multiData = [];

						//20201029 사업체당 평균 인구 현황 총인구
						if( options.idx_id == '8292308888201710301617197294119290010' ){
							if( options.call_info_serial == 1 ){
								setData.param.params["year"] = dataYear;
							} else {
								setData.param.params["year"] = companyDataYear;
							}
						}

						for (var k=0; k<setData.admList.length; k++) {
							setData.param.params["adm_cd"] = setData.admList[k];
							$policyStaticMapApi.ui.doCensusStatsData(setData, map);
						}
						break;
					case 3: //나의데이터
						map.multiLayerControl.multiData = [];
						$policyStaticMapApi.ui.doUserStatsData(setData, map);
						break;
					case 2: //KOSIS
						setData.param.params["gis_se"] = setData.admList[0];

						map.multiLayerControl.multiData = [];
						for (var k=0; k<setData.admList.length; k++) {
							setData.param.params["gis_se"] = setData.admList[k];
							$policyStaticMapApi.ui.doKosisStatsData(setData, map);
						}

						break;
					case 4: //협업형 데이터
						map.multiLayerControl.multiData = [];
						setData.param.params["adm_cd"] = setData.admList[0];
						$policyStaticMapApi.ui.checkLocalParams(setData, function() {
							for (var k=0; k<setData.admList.length; k++) {
								setData.param.params["adm_cd"] = setData.admList[k];
								$policyStaticMapApi.ui.doLocalStatsData(setData, map);
							}
						});
						break;
					case 5: //LBDMS 데이터
						map.multiLayerControl.multiData = [];
						setData.param.params["adm_cd"] = setData.admList[0];
						$policyStaticMapApi.ui.checkLbdmsParams(setData, function() {
							for (var k=0; k<setData.admList.length; k++) {
								setData.param.params["adm_cd"] = setData.admList[k];
								$policyStaticMapApi.ui.doLbdmsStatsData(setData, map);
							}
						});
						break;
					case 6: //생활SOC
						map.multiLayerControl.multiData = [];

						for (var k=0; k<setData.admList.length; k++) {
							setData.param.params["adm_cd"] = setData.admList[k];
							$policyStaticMapApi.ui.doSocData(setData, map);
						}
						break;
					default:
						break;
				}
			},
			
			/**
			 * 
			 * @name         : doAnalysisIndexData
			 * @description  : 시설분석형지표를 조회한다.
			 * @date         : 2017. 09. 13. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param api_id : API 아이디
			 * @param options: 파라미터정보
			 * @param map	 : 맵정보
			 */
			doAnalysisIndexData : function(options, map) {
				var setData = this.setParams(options, map);
				
				switch(parseInt(setData.param.data_div)) {
					case 1:   //센서스 통계
						map.multiLayerControl.multiData = [];
						for (var k=0; k<setData.admList.length; k++) {
							setData.param.params["adm_cd"] = setData.admList[k];
							$policyStaticMapApi.ui.doCensusStatsData(setData, map);
						}
						break;
					case 2: //KOSIS
						map.multiLayerControl.multiData = [];
						setData.param.params["gis_se"] = setData.admList[0];

						for (var k=0; k<setData.admList.length; k++) {
							setData.param.params["gis_se"] = setData.admList[k];
							$policyStaticMapApi.ui.doKosisStatsData(setData, map);
						}
						break;
					case 3: //나의데이터
						map.multiLayerControl.multiData = [];
						$policyStaticMapApi.ui.doUserStatsData(setData, map);
						break;
					case 4: //협업형 데이터
						map.multiLayerControl.multiData = [];
						setData.param.params["adm_cd"] = setData.admList[0];
						$policyStaticMapApi.ui.checkLocalParams(setData, function() {
							for (var k=0; k<setData.admList.length; k++) {
								setData.param.params["adm_cd"] = setData.admList[k];
								$policyStaticMapApi.ui.doLocalStatsData(setData, map);
							}
						});
						break;
					case 5: //LBDMS 데이터
						map.multiLayerControl.multiData = [];
						setData.param.params["adm_cd"] = setData.admList[0];
						$policyStaticMapApi.ui.checkLbdmsParams(setData, function() {
							for (var k=0; k<setData.admList.length; k++) {
								setData.param.params["adm_cd"] = setData.admList[k];
								$policyStaticMapApi.ui.doLbdmsStatsData(setData, map);
							}
						});
						break;
					case 6: //생활SOC
						map.multiLayerControl.multiData = [];

						for (var k=0; k<setData.admList.length; k++) {
							setData.param.params["adm_cd"] = setData.admList[k];
							$policyStaticMapApi.ui.doSocData(setData, map);
						}
						break;
					default:
						break;
				}
			},
			
			/**
			 * 
			 * @name         : setParams
			 * @description  : 통계파라미터 정보를 설정한다.
			 * @date         : 2017. 08. 20. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param type : 통계타입
			 * @param options : 파라미터정보
			 * @param map : map 정보
			 */
			setParams : function(options, map) {
				var call_param = options.call_param;
				if (typeof(options.call_param) == "string") call_param = eval("("+options.call_param+")");
				var map_param = eval("("+options.map_param+")");
				
				var mapType = "color";
				var paramsData = {
						call_url : options.call_url,
						params : call_param,
						unit : map_param.unit,
						filter : map_param.showData,
						title : map_param.showTitle,
						map_div : options.map_div-1,
						adm_nm : this.settingInfo["adm_nm"],
						data_div : options.data_div,
						data_type : options.data_type,
						mapType : mapType
				};
				
				//데이터타입설정
				var dataType = "census";
				switch(parseInt(options.data_div)) {
					case 1:
						dataType = "census";
						break;
					case 2:
						dataType = "kosis";
						break;
					case 3:
						dataType = "userData";
						break;
					case 4:
						dataType = "local";
						break;
					case 5:
						dataType = "lbdms";
						break;
					case 6:
						dataType = "soc"; //생활SOC
						break;
				}
				paramsData["dataType"] = dataType;
 				
				//비자치구 여부 체크
				var isAtdrc = false;
				var admList = [];
				var adm_cd = this.settingInfo["adm_cd"];
				var sido_cd =  adm_cd.substring(0,2);
				if ($psmCombine.ui.atdrcList[sido_cd]){
					$.each($psmCombine.ui.atdrcList[sido_cd],function(sidoCnt, sidoNode){
						if (sidoNode.adm_cd == adm_cd) {
							isAtdrc = true;
							for (var i=0; i<sidoNode.sgg_list.length; i++) {
								admList.push(sido_cd + sidoNode.sgg_list[i]);
							}
						}
					});
				}
				
				if (!isAtdrc) {
					admList.push(adm_cd);
				}
				
				paramsData["isAtdrc"] = isAtdrc;

				switch (parseInt(options.data_div)) {
					case 1:   //센서스 통계
						paramsData.params["bnd_year"] = map.bnd_year;
						
						//왼쪽지도가 열지도일 때,
						//현재 경계레벨과 상관없이 2레벨 조회
						if (map_param.mapType != undefined && 
							map_param.mapType == "heat") {
							paramsData.mapType = "heat";
							if (paramsData.params.low_search == "1") {
								paramsData.params.low_search = "2";
							} 
						}
						break;
					case 2:    //kosis 통계
						paramsData["etc"] = {};
						paramsData.etc["gis_se"] = map_param.gis_se;
						paramsData.etc["adm_cd"] = adm_cd;
						paramsData.etc["low_search"] = $("#boundLevelTitle option:selected").val();
						paramsData.params.gis_se = adm_cd;
						break;
					case 3: 	//나의데이터
						paramsData["etc"] = {};
						paramsData.etc["low_search"] = $("#boundLevelTitle option:selected").val();
						paramsData.etc["bnd_year"] = map.bnd_year;
						break;
					case 4:    //공공데이터(LBDMS)
					case 5:	   //LBDMS 데이터
						paramsData["etc"] = {};
						paramsData.params["low_search"] = $("#boundLevelTitle option:selected").val();
						paramsData.params["bnd_year"] = map.bnd_year;
						break;
					
					default:
						break;
				}
				
				return {
					"param" : paramsData,
					"admList" : admList
				};
			},
			
			/**
			 * 
			 * @name         : setTitle
			 * @description  : 통계정보를 타이틀을 설정한다.
			 * @date         : 2017. 08. 24. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param options: 파라미터정보
			 * @param map	 : 맵정보
			 */
			setTitle : function(options, map) {
				var id = map.id;
				var title = options.title;
				
				//년도가 있으면 년도정보 설정
				if (options.year != undefined) {
					title += " ("+options.year+")";
				}
				
				$("#title_"+(id+1)).html(title);
			},
			
			/**
			 * 
			 * @name         : doCombineMap
			 * @description  : 통계정보를 융합한다.
			 * @date         : 2017. 08. 24. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 */
			doCombineMap : function() {
				if ($policyStaticMap.ui.checkCombine()) {
					//mng_s 20180206 주용민
					$("#mapRgn_1 #legendDataSlider, #mapRgn_2 #legendDataSlider").attr("id","");
					//mng_e 20180206 주용민
					$policyStaticMapApi.loadingBar.show(1);
					
					srvLogWrite( "E0", "04", "05", "01", $policyStaticMap.ui.settingInfo.policy_idx_nm, $policyStaticMap.ui.getLogParams() ); // jrj 로그 > 융합하기 정책 스토리
					
					setTimeout(function() {
						$policyStaticCombineMap.ui.initCombineMap($policyStaticMap.ui);
						$policyStaticMapApi.loadingBar.close();
					}, 200);
					apiLogWrite2("S0", "S40", "융합", "융합결과 보기", "00", "없음");
				}else {
					messageAlert.open("알림", "융합할 수 없는 조회결과입니다.");
				}
			},
			
			/**
			 * 
			 * @name         : checkCombine
			 * @description  : 융합정보를 체크한다.
			 * @date         : 2017. 08. 25. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 */
			checkCombine : function() {
				var isCombine = true;
				switch (parseInt(this.settingInfo.idx_type)) {
					case 1: //수요변화 지표
						for (var i=0; i<this.mapList.length; i++) {
							var map = this.mapList[i];
							if (map.multiLayerControl.dataGeojson == null ||
								map.multiLayerControl.dataGeojson.length == 0 ||
								map.data[0].result.length == 0) {
								isCombine = false;
							}
						}
						break;
					case 2: //통계연산형 지표
						for (var i=0; i<this.mapList.length; i++) {
							var map = this.mapList[i];
							if (map.multiLayerControl.dataGeojson == null ||
								map.multiLayerControl.dataGeojson.length == 0 ||
								map.data[0].result.length == 0) {
								isCombine = false;
							}
						}
						break;
					case 3: //시설 분석형 지표
						for (var i=0; i<this.mapList.length; i++) {
							var map = this.mapList[i];
							switch(map.id) {
								case 0:
									if (map.multiLayerControl.dataGeojson == null ||
										map.multiLayerControl.dataGeojson.length == 0 ||
										map.data[0].result.length == 0) {
										isCombine = false;
									}
									//왼쪽지도가 열지도일 경우, 데이터치환
									if (this.analysisCurrentMultiData != null) {
										map.multiLayerControl.multiData = $policyStaticMap.ui.analysisCurrentMultiData;
									}
									break;
								case 1:
									if (this.poiLayerList.length == 0) {
										isCombine = false;
									}
									break;
							}
						}
						break;
					default:
						isCombine = false;
						break;
				}
				
				return isCombine;
			},
			
			/**
			 * 
			 * @name         : setDemandYearList
			 * @description  : 년도정보를 설정한다.
			 * @date         : 2017. 08. 21. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param options: 파라미터정보
			 * @param idx    : 인덱스정보
			 */
			setDemandYearList : function(apiId, options, map_div, data_div, sHtml, parameter) {
				$("#policySelectBox_"+(map_div+1)).html("");
				var idx_type = $policyStaticMap.ui.settingInfo["idx_type"];
				
				switch (parseInt(idx_type)) {
					case 1: //수요변화지표
						switch (parseInt(data_div)) {
							case 3: 
								$("#policySelectBox_"+(map_div+1)).html(sHtml);
								$("#policySelectBox_"+(map_div+1) + " option:eq(0)").attr("selected", "selected");
								break;
							default:
								var html = "";
								switch(apiId) {
									case "API_0301": //인구총조사
										//2018.02.08 [개발팀]
										switch(parameter.filter) {
											//사업체수와 종사자수이면 사업체년도 설정
											case "employee_cnt":
											case "corp_cnt":
												this.setCensusDataYear(1, map_div+1);
												break;
											//농림어가일 경우, 년도수정
											case "nongga_cnt":		//농가수
											case "nongga_ppltn":	//농가인구수
											case "naesuoga_cnt":	//내수면어가수
											case "naesuoga_ppltn":	//내수면어가인구수
											case "haesuoga_cnt":	//해수면어가수
											case "haesuoga_ppltn":	//해수면어가인구수
												this.setCensusDataYear(2, map_div+1);
												break;
											case "imga_cnt":		//임가수
											case "imga_ppltn":		//임가인구수
												this.setCensusDataYear(3, map_div+1);
												break;
											default:
												this.setCensusDataYear(0, map_div+1);
												break;
										}
										break;
									case "API_0304":
										this.setCensusDataYear(1, map_div+1);
										break;
									case "API_0307": //농가
									case "API_0309": //어가
										this.setCensusDataYear(2, map_div+1);
										break;
									case "API_0308": //임가
										this.setCensusDataYear(3, map_div+1);
										break;
									default:
										this.setCensusDataYear(0, map_div+1);
										break;
								}
								//조회년도 선택 부분			//SRV_DT_POLICYMAP_APIPARAM 에서 json 형태로 year 세팅
								$("#policySelectBox_"+(map_div+1)).val(options.year);
								break;
						}
						$(".policySelectBox").show();
						break;
					case 2:
						$(".policySelectBox").hide();
						//2018-12-19 LNB화면 최소화시에도 대상지역 선택 표출 필요
						$("#current-sido-select-2").parent().parent().show();
						break;
					case 3:
						$(".policySelectBox").hide();
						//2018-12-19 LNB화면 최소화시에도 대상지역 선택 표출 필요
						$("#current-sido-select-2").parent().parent().show();
						break;
					default:
						break;
				}
				
				//2018.01.08 [개발팀]
				//사업체 테마코드 조회일 경우, 년도를 2006이상만 나오도록
				if (options.theme_cd != undefined) {
					$("#policySelectBox_"+(map_div+1)+ " option").each(function() {
						if (parseInt($(this).val()) < 2006) {
							$(this).hide();
						}
					});
				}
				
				//2018.01.09 [개발팀]
				//임가는 2005년부터 설정
				if (parameter.filter == "imga_cnt" ||
					parameter.filter == "imga_ppltn" ||
					parameter.filter == "forestry_cnt") {
					$("#policySelectBox_"+(map_div+1)+ " option").each(function() {
						if (parseInt($(this).val()) < 2005) {
							$(this).hide();
						}
					});
				}
			},
			
			/**
			 * 
			 * @name         : setCensusDataYear
			 * @description  : 년도정보를 체크하고, 생성한다.
			 * @date         : 2017. 10. 18. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param type   : 년도생성 타입
			 * @param idx    : 인덱스정보
			 */
			setCensusDataYear : function(type, idx) {
				var html = "";
				switch(type) {
					case 0:
						if (parseInt(dataYear) > 2015) {
							for (var i=parseInt(dataYear); i>2015; i--) {
								html += "<option value='"+i+"'>"+i+"년</option>";
							}
							for (var i=parseInt(dataYear); i>=2000; i--) {
								if((i % 5) == 0) {
									html += "<option value='"+i+"'>"+i+"년</option>";
								}
							}
						}else {
							for (var i=parseInt(dataYear); i>=2000; i--) {
								if((i % 5) == 0) {
									html += "<option value='"+i+"'>"+i+"년</option>";
								}
							}
						}
						break;
					case 1:
						//2019-04-22 [김남민] 정책통계지도 > 9차(8차), 10차 분리 적용. START
						/*
							고용,소득,소비
								rsEJy3oJwG20170803172737334I49JoFMEGz : 종사자 수 분포 변화
								xpwJJxztnG20170808142737332HyvJxM3FHs : PC방 변화
								EwwunnFpJK201708081427373326K8vsErJuJ : 슈퍼마켓의 변화
								onppztzErp20170808142737333z8tyqHzI9w : 제과점 변화
								pyL5xrpKKF20170808152137332Lu5p9E6DKt : 치킨전문점 변화
								uHzorzuwyw20170808152137332v7rFoJoL2I : 커피전문점 변화
								8292308888201710301617197294119290010 : 사업체당 평균 인구 현황
								3751353392201712061200288355280432955 : 사업체당 평균 종사자 수
							산업분야
								rH4wnv36It20170803172737334nvKrIEMnzF : 총사업체 분포 변화
								DMspq6u4Mv201708031727373349yHup4JG7w : 도소매업 변화
								yDMKDIKzyn20170808142737331vsqnssqM1z : 제조업 변화
						*/
						if(
							$policyStaticMapLeftmenu.ui.idx_id == "rsEJy3oJwG20170803172737334I49JoFMEGz"
							|| $policyStaticMapLeftmenu.ui.idx_id == "xpwJJxztnG20170808142737332HyvJxM3FHs"
							|| $policyStaticMapLeftmenu.ui.idx_id == "EwwunnFpJK201708081427373326K8vsErJuJ"
							|| $policyStaticMapLeftmenu.ui.idx_id == "onppztzErp20170808142737333z8tyqHzI9w"
							|| $policyStaticMapLeftmenu.ui.idx_id == "pyL5xrpKKF20170808152137332Lu5p9E6DKt"
							|| $policyStaticMapLeftmenu.ui.idx_id == "uHzorzuwyw20170808152137332v7rFoJoL2I"
							//|| $policyStaticMapLeftmenu.ui.idx_id == "8292308888201710301617197294119290010"
							//|| $policyStaticMapLeftmenu.ui.idx_id == "3751353392201712061200288355280432955"
								
							|| $policyStaticMapLeftmenu.ui.idx_id == "rH4wnv36It20170803172737334nvKrIEMnzF"
							|| $policyStaticMapLeftmenu.ui.idx_id == "DMspq6u4Mv201708031727373349yHup4JG7w"
							|| $policyStaticMapLeftmenu.ui.idx_id == "yDMKDIKzyn20170808142737331vsqnssqM1z"
							
							//2019-05-03 [김남민] 융합결과보기 선택 시 우측 출처에 저장되었던 년도가 중복적으로 표시 됨. START
							|| $policyStaticMapLeftmenu.ui.year_9016_yn == "Y"
							//2019-05-03 [김남민] 융합결과보기 선택 시 우측 출처에 저장되었던 년도가 중복적으로 표시 됨. END
						) {
							if($policyStaticMapLeftmenu.ui.idx_id == "uHzorzuwyw20170808152137332v7rFoJoL2I") {
								html += "<option value='2019' datatype='10'>2019년</option>";
								html += "<option value='2018' datatype='10'>2018년</option>";
								html += "<option value='2017' datatype='10'>2017년</option>";
								html += "<option value='9016' datatype='10'>2016년</option>";
							}
							else {
								if(parseInt(companyDataYear) <= 2016) {
									var dataType = 10;
									for( var i=2016; i<=companyDataYear; i++ ){
										html += "<option value='"+( i == 2016 ? 9016 : i )+"' datatype='"+dataType+"'>"+i+"년</option>";
									}
								}
								
								var orderYear = 2000;
								if( $policyStaticMapLeftmenu.ui.idx_id == "xpwJJxztnG20170808142737332HyvJxM3FHs"
									|| $policyStaticMapLeftmenu.ui.idx_id == "EwwunnFpJK201708081427373326K8vsErJuJ"
									|| $policyStaticMapLeftmenu.ui.idx_id == "onppztzErp20170808142737333z8tyqHzI9w"
									|| $policyStaticMapLeftmenu.ui.idx_id == "pyL5xrpKKF20170808152137332Lu5p9E6DKt" ){
									orderYear = 2006;
								}
								
								for ( var i=parseInt(companyDataYear); i >= 2000; i--) {
									if(i <= 2005) {
										html += "<option value='"+i+"' datatype='8'>"+i+"년</option>";
									}
									else if( i > 2005 && i <= 2016 ){
										html += "<option value='"+i+"' datatype='9'>"+i+"년</option>";
									} else {
										html += "<option value='"+i+"' datatype='10'>"+i+"년</option>";
									}

									if(i == 2017) {
										html += "<option value='9016' datatype='10'>2016년</option>";
									}
								}
							}
						}
						else {
							//20201027 companyDataYear > dataYear
							for ( var i=parseInt(dataYear); i >= 2000; i--) {
								html += "<option value='"+i+"'>"+i+"년</option>";
							}
						}
						//2019-04-22 [김남민] 정책통계지도 > 9차(8차), 10차 분리 적용. END
						break;
					//2018.02.08 [개발팀] 농림어가년도
					case 2: //농가_어가
						for (var i=parseInt(dataYear); i>=2000; i--) {
							if((i % 5) == 0) {
								html += "<option value='"+i+"'>"+i+"년</option>";
							}
						}
						break;
					case 3: //임가
						for (var i=parseInt(dataYear); i>=2005; i--) {
							if((i % 5) == 0) {
								html += "<option value='"+i+"'>"+i+"년</option>";
							}
						}
						break;
				}
				//2019-04-22 [김남민] 정책통계지도 > 9차(8차), 10차 분리 적용. START
				$policyStaticMap.ui.demandYearHtml = html;
				//2019-04-22 [김남민] 정책통계지도 > 9차(8차), 10차 분리 적용. END
				$("#policySelectBox_"+ idx).html(html);
			},
			
			//2019-04-22 [김남민] 정책통계지도 > 9차(8차), 10차 분리 적용. START
			/**
			 * 
			 * @name         : setDemandYearListShowHide
			 * @description  : 년도정보를 Show/Hide 처리한다. (9차, 10차 분리조회)
			 * @date         : 2019. 04. 22. 
			 * @author	     : 김남민.
			 * @history 	 :
			 * @param 없음   : 없음
			 */
			setDemandYearListShowHide : function() {
				var lvSelectFirstYn = "N";
				var lvTobeYear = $("#policySelectBox_1");
				//var lvTobeYearDataType = $("#policySelectBox_1 option:selected").attr("datatype");
				var lvTobeYearDataText = $("#policySelectBox_1 option:selected").text();
				var lvTobeYearDataValue = $("#policySelectBox_1").val();
				var lvAsisYear = $("#policySelectBox_2");
				//var lvAsisYearDataType = $("#policySelectBox_2 option:selected").attr("datatype");
				var lvAsisYearDataText = $("#policySelectBox_2 option:selected").text();
				var lvAsisYearDataValue = $("#policySelectBox_2").val();
				
				//Tobe (10차 2016 제거)
				lvTobeYear.find("option").each(function() {
					//var lvDataType = $(this).attr("datatype");
					var lvDataText = $(this).text();
					var lvDataValue = $(this).val();
					//10차 2016 제거
					if(lvDataValue == "9016") {
						$(this).remove();
					}
				});
				
				//2019-04-23 [김남민] 정책통계지도 > 좌측을 Tobe 우측을 Asis로 변경. START
				if($policyStaticMapLeftmenu.ui.selectFirstYn == "Y") {
					$policyStaticMapLeftmenu.ui.selectFirstYn = "N";
					lvSelectFirstYn = "Y";
					//Tobe 리스트의 첫번째 강제 선택
					lvTobeYear.prop("selectedIndex", 0);
					if(lvTobeYearDataValue != lvTobeYear.val() && lvTobeYearDataValue != "2015") {
						lvTobeYear.change();
					}
					//lvTobeYearDataType = $("#policySelectBox_1 option:selected").attr("datatype");
					lvTobeYearDataText = $("#policySelectBox_1 option:selected").text();
					lvTobeYearDataValue = $("#policySelectBox_1").val();
				}
				//2019-04-23 [김남민] 정책통계지도 > 좌측을 Tobe 우측을 Asis로 변경. END
				
				//Asis (Tobe가 10차인경우 10차만 Tobe가 9차(8차)인경우 9차(8차)만)
				/*
					고용,소득,소비
						rsEJy3oJwG20170803172737334I49JoFMEGz : 종사자 수 분포 변화
						xpwJJxztnG20170808142737332HyvJxM3FHs : PC방 변화
						EwwunnFpJK201708081427373326K8vsErJuJ : 슈퍼마켓의 변화
						onppztzErp20170808142737333z8tyqHzI9w : 제과점 변화
						pyL5xrpKKF20170808152137332Lu5p9E6DKt : 치킨전문점 변화
						uHzorzuwyw20170808152137332v7rFoJoL2I : 커피전문점 변화
						8292308888201710301617197294119290010 : 사업체당 평균 인구 현황
						3751353392201712061200288355280432955 : 사업체당 평균 종사자 수
					산업분야
						rH4wnv36It20170803172737334nvKrIEMnzF : 총사업체 분포 변화
						DMspq6u4Mv201708031727373349yHup4JG7w : 도소매업 변화
						yDMKDIKzyn20170808142737331vsqnssqM1z : 제조업 변화
				*/
				if(
					$policyStaticMapLeftmenu.ui.idx_id == "rsEJy3oJwG20170803172737334I49JoFMEGz"
					|| $policyStaticMapLeftmenu.ui.idx_id == "xpwJJxztnG20170808142737332HyvJxM3FHs"
					|| $policyStaticMapLeftmenu.ui.idx_id == "EwwunnFpJK201708081427373326K8vsErJuJ"
					|| $policyStaticMapLeftmenu.ui.idx_id == "onppztzErp20170808142737333z8tyqHzI9w"
					|| $policyStaticMapLeftmenu.ui.idx_id == "pyL5xrpKKF20170808152137332Lu5p9E6DKt"
					|| $policyStaticMapLeftmenu.ui.idx_id == "uHzorzuwyw20170808152137332v7rFoJoL2I"
					//|| $policyStaticMapLeftmenu.ui.idx_id == "8292308888201710301617197294119290010"
					//|| $policyStaticMapLeftmenu.ui.idx_id == "3751353392201712061200288355280432955"
						
					|| $policyStaticMapLeftmenu.ui.idx_id == "rH4wnv36It20170803172737334nvKrIEMnzF"
					|| $policyStaticMapLeftmenu.ui.idx_id == "DMspq6u4Mv201708031727373349yHup4JG7w"
					|| $policyStaticMapLeftmenu.ui.idx_id == "yDMKDIKzyn20170808142737331vsqnssqM1z"
						
					//2019-05-03 [김남민] 융합결과보기 선택 시 우측 출처에 저장되었던 년도가 중복적으로 표시 됨. START
					|| $policyStaticMapLeftmenu.ui.year_9016_yn == "Y"
					//2019-05-03 [김남민] 융합결과보기 선택 시 우측 출처에 저장되었던 년도가 중복적으로 표시 됨. END
				) {
					//10차
					if(lvTobeYearDataValue >= 2017) {
						lvAsisYear.html($policyStaticMap.ui.demandYearHtml);
						lvAsisYear.find("option").each(function() {
							//var lvDataType = $(this).attr("datatype");
							var lvDataText = $(this).text();
							var lvDataValue = $(this).val();
							//미만만 표시
							try {
								if(Number(lvDataText.replace(/년/g,"")) >= Number(lvTobeYearDataText.replace(/년/g,""))) {
									$(this).remove();
								}
							} catch(e) { }
							//10차 아닌경우 제거
//							if(lvDataValue != "2017" && lvDataValue != "2018" && lvDataValue != "9016") {
//								$(this).remove();
//							}

							if( lvDataValue < 2017 && lvDataValue != "9016") {
								$(this).remove();
							}

						});
						lvAsisYear.val(lvAsisYearDataValue);
						if(lvSelectFirstYn == "Y") {
							//lvAsisYear.find("option[value='"+lvTobeYearDataValue+"']").next().attr("selected","selected");
							lvAsisYear.prop("selectedIndex", 0);
							lvAsisYear.change();
						}
						//기존에 선택된 값이 사라진 경우 값 다시 불러오기
						else if(lvAsisYear.val() == null) {
							//lvAsisYear.find("option[value='"+lvTobeYearDataValue+"']").next().attr("selected","selected");
							lvAsisYear.prop("selectedIndex", 0);
							lvAsisYear.change();
						}
					}
					//9차(8차)
					else {
						lvAsisYear.html($policyStaticMap.ui.demandYearHtml);
						lvAsisYear.find("option").each(function() {
							//var lvDataType = $(this).attr("datatype");
							var lvDataText = $(this).text();
							var lvDataValue = $(this).val();
							//미만만 표시
							try {
								if(lvDataText.replace(/년/g,"") >= lvTobeYearDataText.replace(/년/g,"")) {
									$(this).remove();
								}
							} catch(e) { }
							//10차 인경우 제거
							if(lvDataValue >= 2017 || lvDataValue == "9016") {
								$(this).remove();
							}
						});
						lvAsisYear.val(lvAsisYearDataValue);
						if(lvSelectFirstYn == "Y") {
							//lvAsisYear.find("option[value='"+lvTobeYearDataValue+"']").next().attr("selected","selected");
							lvAsisYear.prop("selectedIndex", 0);
							lvAsisYear.change();
						}
						//기존에 선택된 값이 사라진 경우 값 다시 불러오기
						else if(lvAsisYear.val() == null) {
							//lvAsisYear.find("option[value='"+lvTobeYearDataValue+"']").next().attr("selected","selected");
							lvAsisYear.prop("selectedIndex", 0);
							
							if( lvTobeYearDataValue <= 2006 && ( $policyStaticMapLeftmenu.ui.idx_id == "xpwJJxztnG20170808142737332HyvJxM3FHs"
								|| $policyStaticMapLeftmenu.ui.idx_id == "EwwunnFpJK201708081427373326K8vsErJuJ"
									|| $policyStaticMapLeftmenu.ui.idx_id == "onppztzErp20170808142737333z8tyqHzI9w"
									|| $policyStaticMapLeftmenu.ui.idx_id == "pyL5xrpKKF20170808152137332Lu5p9E6DKt" ) ){
								
								$policyStaticMapApi.ui.clear($policyStaticMap.ui.mapList[1]);
							} else {
								lvAsisYear.change();
							}
						}
					}
				}
				//Asis
				else {
					lvAsisYear.html($policyStaticMap.ui.demandYearHtml);
					lvAsisYear.find("option").each(function() {
						//var lvDataType = $(this).attr("datatype");
						var lvDataText = $(this).text();
						var lvDataValue = $(this).val();
						//미만만 표시
						try {
							if(lvDataText.replace(/년/g,"") >= lvTobeYearDataText.replace(/년/g,"")) {
								$(this).remove();
							}
						} catch(e) { }
					});
					lvAsisYear.val(lvAsisYearDataValue);
					if(lvSelectFirstYn == "Y") {
						//lvAsisYear.find("option[value='"+lvTobeYearDataValue+"']").next().attr("selected","selected");
						lvAsisYear.prop("selectedIndex", 0);
						lvAsisYear.change();
					}
					//기존에 선택된 값이 사라진 경우 값 다시 불러오기
					else if(lvAsisYear.val() == null) {
						//lvAsisYear.find("option[value='"+lvTobeYearDataValue+"']").next().attr("selected","selected");
						lvAsisYear.prop("selectedIndex", 0);
						lvAsisYear.change();
					}
				}
			},
			//2019-04-22 [김남민] 정책통계지도 > 9차(8차), 10차 분리 적용. END
			
			/**
			 * 
			 * @name         : createInfoTooltip
			 * @description  : 툴팁정보를 생성한다.
			 * @date         : 2017. 08. 21. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 경계데이터정보
			 * @param type   : 경계타입
			 * @param map    : 맵정보
			 */
			createInfoTooltip : function(event, data, type, map) {
				var html = "<table style='margin:10px;'>";
				if (type == "data") {
					if (data.info != undefined && data.info.length > 0) {
						var tmpData = map.multiLayerControl.multiData[0].data;
						switch(data.info[0].api_id) {
							case "API_KOSIS": //KOSIS
								var searchYear = ( tmpData.option.params.kosis_data_year === '9016' ? '2016' : tmpData.option.params.kosis_data_year ) + "년";
								
								html += "<tr><td class='admName'>"
									 + data.properties.adm_nm 
									 + "</td></tr>"
									 + "<tr style='height:5px'></tr>"
									 + "<tr>"
									 + "<td style='font-size:12px;padding-left:5px;'>"+ searchYear +" 통계정보 : " + appendCommaToNumber(data.info[0].DATA)
								
									 if (data.info[0].unit != undefined && data.info[0].unit.length > 0)	{
										 html += "("+data.info[0].unit+")";
									 } 
									 + "</td>";
									 + "</tr>";
								
								//집계구 일경우
								if (data.properties.adm_cd.length > 7) {
									html += "<tr>";
									html += "<td class='statsData'>( " + data.properties.adm_cd + " )</td>";
									html += "</tr>";
								}
								break;
							case "API_MYDATA":	//나의데이터
								html += "<tr><td class='admName'>"
									 + data.properties.adm_nm 
									 + "</td></tr>"
									 + "<tr style='height:5px'></tr>"
									 + "<tr>"
									 + "<td style='font-size:12px;padding-left:5px;'>" + data.info[0].title + " : " + appendCommaToNumber(data.info[0].data_cnt) + "</td>"
									 + "</tr>";
								
								//집계구 일경우
								if (data.properties.adm_cd.length > 7) {
									html += "<tr>";
									html += "<td class='statsData'>( " + data.properties.adm_cd + " )</td>";
									html += "</tr>";
								}
								break;
							case "API_LOCAL": //협업형데이터
								html += "<tr><td class='admName'>"
									 + data.properties.adm_nm 
									 + "</td></tr>"
									 + "<tr style='height:5px'></tr>"
									 + "<tr>"
									 + "<td style='font-size:12px;padding-left:5px;'>" + data.info[0].div_nm + " : " + appendCommaToNumber(data.info[0].cnt) + "("+data.info[0].unit+")</td>"
									 + "</tr>";
								
								//집계구 일경우
								if (data.properties.adm_cd.length > 7) {
									html += "<tr>";
									html += "<td class='statsData'>( " + data.properties.adm_cd + " )</td>";
									html += "</tr>";
								}
								break;
							case "API_LBDMS": //LBDMS데이터
								html += "<tr><td class='admName'>"
									 + data.properties.adm_nm 
									 + "</td></tr>"
									 + "<tr style='height:5px'></tr>"
									 + "<tr>"
									 + "<td style='font-size:12px;padding-left:5px;'>통계정보 : " + appendCommaToNumber(data.info[0].cnt) + "</td>"
									 + "</tr>";
								
								//집계구 일경우
								if (data.properties.adm_cd.length > 7) {
									html += "<tr>";
									html += "<td class='statsData'>( " + data.properties.adm_cd + " )</td>";
									html += "</tr>";
								}
								break;
							case "API_SOC": //생활SOC
								html += "<tr><td class='admName'>"+ data.properties.adm_nm+ "</td></tr>";
								html +=	"<tr style='height:5px'></tr>";
								html +=	"<tr>";
								html +=	"<td style='font-size:12px;padding-left:5px;'>";
								
								if( $policyStaticMapLeftmenu.ui.idx_id == 'soc_ppltn' ){
									if( map.id == 0 ){
										html += $policyStaticSocMap.ui.cur_ppltn_div_nm +" : " + appendCommaToNumber(data.info[0].val) + "(명)</td>";
									} else {
										html += $policyStaticSocMap.ui.cur_fac_cl_nm +" : " + appendCommaToNumber(data.info[0].cnt) + "(개)</td>";
									}
								} else if( $policyStaticMapLeftmenu.ui.idx_id == 'soc_wghvr' ){
									if( map.id == 0 ){
										html += $policyStaticSocMap.ui.cur_fac_cl_nm +" : " + appendCommaToNumber(data.info[0].val) + "("+data.info[0].unit+")</td>";
									} else {
										html += $policyStaticSocMap.ui.cur_fac_cl_nm +" : " + appendCommaToNumber(data.info[0].cnt) + "("+data.info[0].unit+")</td>";
									}
								} else if( $policyStaticMapLeftmenu.ui.idx_id == 'soc_ctgry' ){
									if( map.id == 0 ){
										html += "인구 : " + appendCommaToNumber(data.info[0].val) + "("+data.info[0].unit+")</td>";
									} else {
										html += $policyStaticSocMap.ui.cur_fac_cl_nm +" : " + appendCommaToNumber(data.info[0].cnt) + "("+data.info[0].unit+")</td>";
									}
								}
								
								html += "</tr>";
								
								//집계구 일경우
								if (data.properties.adm_cd.length > 7) {
									html += "<tr>";
									html += "<td class='statsData'>( " + data.properties.adm_cd + " )</td>";
									html += "</tr>";
								}
								break;
							default:
								var searchYear = ( tmpData.option.params.year === '9016' ? '2016' : tmpData.option.params.year ) + "년";
							
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
									"fishery_cnt" : "어가수",
									"tot_family" : "총가구",
									"avg_fmember_cnt" : "평균가구원수",
									"tot_house" : "총주택",
									"nongga_cnt" : "농가(가구)",
									"nongga_ppltn" : "농가(인구)",
									"imga_cnt" : "임가(가구)",
									"imga_ppltn" : "임가인구",
									"naesuoga_cnt" : "내수면총어가",
									"naesuoga_ppltn" : "내수면 어가 인구", //2018.01.09 [개발팀] 문구수정
									"haesuoga_cnt" : "해수면총어가",
									"haesuoga_ppltn" : "해수면 어가 인구", //2018.01.09 [개발팀] 문구수정
									"employee_cnt" : "종사자수",
									"data_cnt" : "결합정보"
								};
								
							for (var i = 0; i < data.info.length; i++) {
								var tmpData = data.info[i];
								if (i == 0) {
									if (data.properties.adm_nm !== undefined) {
										html += "<tr><td class='admName'>"
											 + data.properties.adm_nm
											 + "</td></tr>"
											 + "<tr style='height:5px'></tr>";
									}
									
									//집계구 일경우
									if (data.properties.adm_cd.length > 7) {
										html += "<tr>";
										html += "<td class='statsData'>집계구 : " + data.properties.adm_cd + "</td>";
										html += "</tr>";
									}
								}
								
								if (tmpData.showData != undefined && tmpData.showData.length > 0) {
									var filterName = ""; 
									var title = "";
									if (showName[tmpData.showData] != undefined) {
										filterName = showName[tmpData.showData];
									}else{
										if(tmpData.div_nm!=null && tmpData.div_nm != undefined){
											filterName = tmpData.div_nm;
										}
									}
									html += "<tr style='font-size:12px;padding-left:5px;'>";
									//2019-04-22 [김남민] 정책통계지도 > 9차(8차), 10차 분리 적용. START
									if (filterName.length > 0) {
										title = (searchYear.replace(/9016/g,"2016")) +" " + filterName + " : ";
									} else {
										title = (searchYear.replace(/9016/g,"2016")) + " : ";
									}
									//2019-04-22 [김남민] 정책통계지도 > 9차(8차), 10차 분리 적용. END
									
									//5미만의 데이터의 경우, N/A처리
									//인구총괄의 경우, 평균나이, 인구밀도, 노령화지수, 노년부양비, 유년부양비, 총부양비는 제외
									var value;
									if (parseFloat(tmpData[tmpData.showData]) < 5 && 
										tmpData.showData != "avg_age" &&
										tmpData.showData != "ppltn_dnsty" &&
										tmpData.showData != "aged_child_idx" && 
										tmpData.showData != "oldage_suprt_per" &&
										tmpData.showData != "juv_suprt_per" && 
										tmpData.showData != "tot_suprt_per" &&
										tmpData.showData != "tot_worker" &&
										tmpData.showData != "avg_fmember_cnt" &&
										tmpData.showData != "employee_cnt" &&
										tmpData.showData != "cnt") {
										value = "N/A";
									}else {
										value = appendCommaToNumber(tmpData[tmpData.showData]);
									}
									
									if (value != "N/A") {
										html += "<td class='statsData'>"+title+value+" ("+tmpData.unit+")</td>";
									}else {
										html += "<td class='statsData'>"+title+value+"</td>";
									}
									html += "</td></tr>";
								}	
							}
							break;
						}
					}else {
						html += "<tr><td class='statsData'>N/A</td></td>";
					}
				}else if (type == "polygon") {
					var html = "<table style='margin:10px;'>";
					if (data.properties.adm_nm !== undefined) {
						html += "<tr><td class='admName'>"
							 + data.properties.adm_nm 
							 + "</td></tr>"
							 + "<tr style='height:5px'></tr>";
					}
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
			
			//2018-12-27 지도화면 우측에 공통기능 이미지 표출 위성/일반 지도 확대/축소 이미지 표출.
			/**
			 * @name         : createSatelliteCRS
			 * @description  : 위성지도에 사용하는 좌표체계 생성
			 * @date         : 2018. 12. 27. 
			 * @author	     : 김남민
			 * @history 	 :
			 */
			createSatelliteCRS : function(){
				var code = 'EPSG:900913';
				var def = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs';
				var options = {
					resolutions: [
						156543.0339,
						78271.51695,
						39135.758475,
						19567.8792375,
						9783.93961875,
						4891.969809375,
						2445.9849046875,
						1222.99245234375,
						611.496226171875,
						305.7481130859375,
						152.87405654296876,
						76.43702827148438,
						38.21851413574219,
						19.109257067871095,
						9.554628533935547,
						4.777314266967774,
						2.388657133483887,
						1.1943285667419434,
						0.5971642833709717,
						0.29858214168548586,
						0.14929107084274293
					],
					origin: [-20037508.34, 20037508.34]
				};

				// 새로 정의한 CRS 객체 생성.
				var crs = new sop.CRS.Proj(code, def, options);

				// projection 영역 설정.
				crs.projection.bounds = sop.bounds(
						[13232210.28055642, 3584827.864295762],
						[15238748.249933105, 5575460.5658249445]);

				return crs;
			},
			
			//2018-12-27 지도화면 우측에 공통기능 이미지 표출 위성/일반 지도 확대/축소 이미지 표출.
			/**
			 * @name         : createTileLayer
			 * @description  : 타일레이어 토글버튼 생성
			 * @date         : 2018. 12. 27. 
			 * @author	     : 김남민
			 * @history 	 :
			 */
			createTileLayer : function(map, crs, baseLayer, targetLayer, zoomMargin){
				if (arguments.length < 5) {
					throw new Error('Fail check arguments length. current = ' + arguments.length);
				}

				if (map.hasLayer(baseLayer)) {
					return;
				}
				var center = map.getCenter();
				//var zoom = map.zoom;
				var zoom = map.getZoom();
				map.removeLayer(targetLayer);
				map.options.crs = crs;
				baseLayer.addTo(map);

				//좌표 초기화
				//map.setView(sop.utmk(953820, 1953437), 9);
				map.setView(center, (zoom+zoomMargin));
			},
			
			//2018-12-27 지도화면 우측에 공통기능 이미지 표출 위성/일반 지도 확대/축소 이미지 표출.
			/**
			 * @name         : createSatelliteTileLayer
			 * @description  : 위성 타일레이어 생성
			 * @date         : 2018. 12. 27. 
			 * @author	     : 김남민
			 * @history 	 :
			 */
			createSatelliteTileLayer : function(){
				
				//mng_s 20210506 이진호, 위성지도 URL 수정
				//mng_s 20201119 크롬에서 위성지도가 나오지 않아서 수정
				//var satTileURL = "http://xdworld.vworld.kr:8080/2d/Satellite/201301/{z}/{x}/{y}.jpeg";
				//var satTileURL = "https://xdworld.vworld.kr/2d/Satellite/201301/{z}/{x}/{y}.jpeg";
				var satTileURL = "https://xdworld.vworld.kr/2d/Satellite/service/{z}/{x}/{y}.jpeg";
				//mng_e 20210506 이진호
				
				var satTileOptions = {
					maxZoom: 19,
					minZoom: 6
				};
				var satTileLayer = new sop.TileLayer(satTileURL, satTileOptions);
				return satTileLayer;
			},
			
			//2018-12-27 지도화면 우측에 공통기능 이미지 표출 위성/일반 지도 확대/축소 이미지 표출.
			/**
			 * @name         : mapModeSet
			 * @description  : 지도타입 선택
			 * @date         : 2018. 12. 27. 
			 * @author	     : 김남민
			 * @history 	 :
			 */
			mapModeSet : function(pType){
				//버튼 CSS 변경
				$(".BtnAdmin .bnd_grid_radio span").each(function() {
					var lvElement = $(this);
					var lvElementText = lvElement.text();
					lvElement.removeClass("on");
					if (pType == "settlite" && lvElementText == "위성") {
						lvElement.addClass("on");
					} else if (pType == "normal" && lvElementText == "일반") {
						lvElement.addClass("on");
					}
				});
				
				//Map List
				var lvMapList = $policyStaticMap.ui.mapList;
				var lvMapInfoList = $policyStaticMap.ui.mapInfoList;
				
				//Map Mode 변경
				if(lvMapList != null && lvMapList.length > 0) {
					for(var i = 0; i < lvMapList.length; i++) {
						
						var type = $(this).find("a").attr("name");
						
						var map = lvMapList[i];
		                var mapInfo = {
	                		zoomMargin : 0,
	                		crs : null,
	                		baseTileLayer : null,
	                		targetTileLayer : null
		                };
						
		                if(lvMapInfoList != null && lvMapInfoList.length > i) {
		                	mapInfo = lvMapInfoList[i];
		                }
		                
		                var zoomMargin = mapInfo.zoomMargin;
		                var crs = mapInfo.crs;
		                var baseTileLayer = mapInfo.baseTileLayer;
		                var targetTileLayer = mapInfo.targetTileLayer;
		                
						if (pType == "settlite") {
							if(map.mapMode == "settlite") break;
							map.mapMode = "settlite";
							crs = $policyStaticMap.ui.createSatelliteCRS();
							baseTileLayer = $policyStaticMap.ui.createSatelliteTileLayer();
							targetTileLayer = map.gMap.statisticTileLayer;
							zoomMargin = baseTileLayer.options.minZoom - targetTileLayer.options.minZoom;
							if(i < (lvMapList.length - 1)) zoomMargin = 0;
							$policyStaticMap.ui.createTileLayer(map.gMap, crs, baseTileLayer, targetTileLayer, zoomMargin);
						}else {
							if(map.mapMode != "settlite") break;
							map.mapMode = "normal";
							targetTileLayer = baseTileLayer;
							baseTileLayer = map.gMap.statisticTileLayer;
							zoomMargin = baseTileLayer.options.minZoom - targetTileLayer.options.minZoom;
							if(i < (lvMapList.length - 1)) zoomMargin = 0;
							$policyStaticMap.ui.createTileLayer(map.gMap, sop.CRS.UTMK, baseTileLayer, targetTileLayer, zoomMargin);
						}
						
						/*if ($policyStaticMap.ui && 
							$policyStaticMap.ui.callbackFunc && 
							$policyStaticMap.ui.callbackFunc.didMapChangeMode instanceof Function) {
							$policyStaticMap.ui.callbackFunc.didMapChangeMode(pType, map);
						}*/
						
						mapInfo.zoomMargin = zoomMargin;
						mapInfo.crs = crs;
						mapInfo.baseTileLayer = baseTileLayer;
						mapInfo.targetTileLayer = targetTileLayer;
						
						$policyStaticMap.ui.mapInfoList[i] = mapInfo;
						$policyStaticMap.ui.mapList[i] = map;
					}
				}
			},
			
			/**
			 * @name         : reportDataSet
			 * @description  : 보고서 데이터 세팅
			 * @date         : 2017. 01. 31. 
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			reportDataSet : function(){
				if($(".policyStaticMapDataBoard").hasClass("disabled")){
					messageAlert.open("알림", "검색 후 이용해주세요.");
				}else{
					srvLogWrite( "E0", "02", "02", "00", $policyStaticMap.ui.settingInfo.policy_idx_nm, $policyStaticMap.ui.getLogParams() ); // jrj 로그 > 보고서 보기
					
					$policyStaticMap.ui.reportPopup = window.open(contextPath+"/js/policyStatic/report/policyStaticMap.report.html", "reportPrint","width=850, height=700, scrollbars=yes");
				}
			},
			
			/**
			 * @name         : reportLoad
			 * @description  : 보고서를 생성한다.
			 * @date         : 2017. 01. 31. 
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			reportLoad : function() {
				//그래프
				var chart = [];
				var data = getChartSvgData("#targetChartsDB");
				if (data != undefined) {
					chart.push({title:"그래프 정보", data:data});
				}
				
				//표
				var grid = $("#dataGridDB").clone();
				
				setTimeout(function() {
					var mapImageList = [];
					doCapture(0, mapImageList);
				},300);
				
				function doCapture(idx, mapImageList) {
					var agent = navigator.userAgent.toLowerCase();
					if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {

						var mapId = "#mapRgn_"+(idx+1);
						html2canvas($(mapId), {
							logging: true,
							useCORS: false,
							proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
							onrendered: function(canvas) {
								var data = canvas.toDataURL();
								mapImageList.push(data);	
								
								if (mapImageList.length == 2) {
									var options = {
											mapWidth : $(mapId).width(),
											mapHeight : $(mapId).height(),
											chart : chart,
											grid : grid,
											mapData : mapImageList,
											type : "normal"
									};

									var popup = $policyStaticMap.ui.reportPopup.$policyStaticMap.report;
									popup.setData(options);
								}else {
									idx++;
									doCapture(idx, mapImageList);	
								}
							}
						});

					} else {
						var mapId = "#mapRgn_"+(idx+1);
						html2canvas($(mapId)[0], {
							logging: true,
							useCORS: false,
							proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
						}).then(function(canvas) {
								var data = canvas.toDataURL();
								mapImageList.push(data);	
								
								if (mapImageList.length == 2) {
									var options = {
											mapWidth : $(mapId).width(),
											mapHeight : $(mapId).height(),
											chart : chart,
											grid : grid,
											mapData : mapImageList,
											type : "normal"
									};

									var popup = $policyStaticMap.ui.reportPopup.$policyStaticMap.report;
									popup.setData(options);
								}else {
									idx++;
									doCapture(idx, mapImageList);	
								}
						});
					}
				
				};
				
				function getChartSvgData(id){
					var tmpChart = $(id).highcharts();
					if(tmpChart){
						var doc = document.querySelector(id);
						var svg = doc.querySelector("svg");
						var xml  = new XMLSerializer().serializeToString(svg);
			            var canvas = document.createElement("canvas");
			            canvg(canvas, xml);
			            return canvas.toDataURL();
					}
				}
			},
			
			/**
			 * @name         : localGovSetNavi
			 * @description  : 지자체 접속 시, 네비게이터 설정
			 * @date         : 2017. 05. 29. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param sido_cd: 시도코드
			 * @param sgg_cd : 시군구코드
			 */
			localGovSetNavi : function(sido_cd, sgg_cd) {
				if (sgg_cd != null) {
					$("#current-sgg-select option").each(function() {
						if ($(this).data("adm_cd") == sido_cd + sgg_cd) {
							$(this).prop("selected", true);
						}
					});
				}
				$("#current-sido-select").attr("disabled", true);

				//지자체 url에 행정동 코드가 입력되었을 때, 
				//해당 행정동코드 하위의 것만 표출되도록 수정
				var adm_cd = null;
				if (sgg_cd != null) {
					adm_cd = sido_cd + sgg_cd;
				}else {
					adm_cd = sido_cd;
				}

				//해당 지역에 맞는 시군구지역만 표출
				$("#current-sgg-select option").each(function() {
					var tmpAdmCd = $(this).data("adm_cd");
					if (tmpAdmCd != undefined) {
						switch(adm_cd.length) {
							case 2:
								break;
							case 5:
								if(adm_cd.substring(0,4) != tmpAdmCd.toString().substring(0,4)) {
									$(this).remove();
								}
								break;
							default:
								$(this).remove();
								break;
						}
					}					
				});
				
				//카테고리 호출
				$policyStaticMapLeftmenu.ui.getCategoryCnt(adm_cd);
			},
			
			/**
			 * @name         : getLocalGovBoundary
			 * @description  : 지자체 접속 시, 해당 지자체 경계표출
			 * @date         : 2017. 05. 29. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param sido_cd: 시도코드
			 * @param sgg_cd : 시군구코드
			 */
			getLocalGovBoundary : function(sido_cd, sgg_cd) {
				$policyStaticMap.noReverseGeoCode = true;
				var admCdList = [];
				var isAtdrc = false;
				if ($psmCombine.ui.atdrcList[sido_cd]){
					$.each($psmCombine.ui.atdrcList[sido_cd],function(sidoCnt,sidoNode){
						if (sidoNode.adm_cd == sido_cd + sgg_cd) {
							isAtdrc = true;
						}
					});
				}

				//비자치구 여부 판단
				var low_search = "1"; 
				if (isAtdrc) {
					low_search = "0";
					admCdList = $("#current-sgg-select option:selected").val();
					admCdList = admCdList.split(",");
					for (var i=0; i<admCdList.length; i++) {
						admCdList[i] = sido_cd + admCdList[i];
					}
				}else {
					var admCd = sido_cd
					if (sgg_cd != null) {
						admCd = sido_cd + sgg_cd;
					}
					admCdList.push(admCd);
				}	
				
				for (var i=0; i<this.mapList.length; i++) {
					var map = this.mapList[i];
					$policyStaticMapApi.ui.clear(map);
					
					for (var k=0; k<admCdList.length; k++) {
						var admCd = admCdList[k];
						var bounds = null;
						map.multiLayerControl.dataGeojson = [];
						map.multiLayerControl.openApiBoundaryHadmarea(admCd, bndYear, low_search, null, "0", function(res, map) {
							var geojson = map.addPolygonGeoJson(res, "polygon");
							map.multiLayerControl.dataGeojson.push(geojson);
							$policyStaticMap.ui.setLayerStyle(map);	
							
							//경계정보 표출
							if (admCdList.length == map.multiLayerControl.dataGeojson.length) {
								for (var v=0; v<map.multiLayerControl.dataGeojson.length; v++) {
									if (v==0) {
										bounds = map.multiLayerControl.dataGeojson[v].getBounds();
									}else {
										bounds.extend(map.multiLayerControl.dataGeojson[v].getBounds());
									}
								}
								
								map.gMap.fitBounds(bounds, {
									animate : false
								});
							}
						});	
					}
				}
			},
			
			/**
			 * @name         : setMoveMap
			 * @description  : 맵을 이동한다.
			 * @date         : 2017. 06. 16. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param coord_x: x좌표
			 * @param coord_y: y좌표
			 * @param map    : 맵정보
			 * @param pZoom  : 줌레벨
			 */
			setMoveMap :function(coord_x, coord_y, map, pZoom) {
				//zoom 설정
				var zoom = 5;
				if (this.localGovData != null) {
					if (this.localGovData.zoom != undefined) {
						if (!isNaN(this.localGovData.zoom) && 
							parseInt(Number(this.localGovData.zoom)) == this.localGovData.zoom &&
							!isNaN(parseInt(this.localGovData.zoom, 10))) {
							zoom = parseInt(this.localGovData.zoom);
						}
					}

					//좌표설정
					var isCoordX = false;
					var isCoordY = false;
					if (this.localGovData.coord_x != undefined && 
						this.localGovData.coord_y != undefined) {
						if (!isNaN(this.localGovData.coord_x) && 
								parseFloat(Number(this.localGovData.coord_x)) == this.localGovData.coord_x &&
								!isNaN(parseFloat(this.localGovData.coord_x, 10))) {
								isCoordX = true;
						}
						if (!isNaN(this.localGovData.coord_y) && 
								parseFloat(Number(this.localGovData.coord_y)) == this.localGovData.coord_y &&
								!isNaN(parseFloat(this.localGovData.coord_y, 10))) {
								isCoordY = true;
						}
						if (isCoordX && isCoordY) {
							coord_x = parseFloat(this.localGovData.coord_x);
							coord_y = parseFloat(this.localGovData.coord_y);
						}
					}
					if ( pZoom != null )zoom = pZoom;
					map.mapMove([coord_x, coord_y], zoom);
				} else {
					if ( pZoom != null )zoom = pZoom;
					map.mapMove([coord_x, coord_y], zoom);
				}
			},
			
			/**
			 * @name         : setLayerStyle
			 * @description  : 경계의 스타일 설정
			 * @date         : 2017. 05. 29. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param map	 : 맵정보
			 */
			setLayerStyle : function(map) {
				for(var i=0; i<map.multiLayerControl.dataGeojson.length; i++) {
					map.multiLayerControl.dataGeojson[i].eachLayer(function(layer) {
						layer.setStyle({
							weight : 2,
							color : "#4169e1",
							dashArray : "",
							fillOpacity : 0.5,
							fillColor : "#4169e1"
						});
						layer.on({
							mouseout : function(e) {
								var tmpLayer = e.target;
								tmpLayer.setStyle({
									weight : 2,
									color : "#4169e1",
									dashArray : "",
									fillOpacity :0.5,
									fillColor : "#4169e1"
								});
							}
						});
					});
				}
			},
			
			/**
			 * 
			 * @name         : doClearMap
			 * @description  : 맵의 오버레이를 초기화한다.
			 * @date         : 2017. 05. 29. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doClearMap : function() {
				var url = contextPath + "/view/map/policyStaticMap/";
				if (this.isLocalGov) {
					url = this.isLocalGovUrl;
				}
				window.location.href = url;
			},
			//2019-06-26 박길섭 시작
			doMaxSize : function(type) {
				var ck = $(".tb_sizing").hasClass("on"); 
				if(!ck){
					$(".tb_sizing").addClass("on");
					$(".tb_sizing").children().attr("src","/img/ico/ico_toolbars12.png");
//					$("header").css({"height":"10px", "width":"100%"}); 
					$(".global_nav, .searchArea, .headerEtc, .gnb, .headerContents form").hide(); // 2020.10.22 '.global_nav, .searchArea,' 추가
					$(".headerContents h1").css({"height":"10px"});
					$(".headerContents h1 img").hide();
					$(".containerBox").css({"height":"calc(100% - 10px)", "top":"10px"});
				}else{
					$(".tb_sizing").removeClass("on");
					$(".tb_sizing").children().attr("src","/img/ico/ico_toolbars01.png");
//					$("header").css({"height":"104px", "width":"970px"}); 
					$(".global_nav, .searchArea, .headerEtc, .gnb, .headerContents form").show(); // 2020.10.22 '.global_nav, .searchArea,' 추가
					$(".headerContents h1").css({"height":"78px"});
					$(".headerContents h1 img").show();
					$(".containerBox").css({"height":"calc(100% - 104px)", "top":"104px"});
				}
				
				for (var i=0; i<this.mapList.length; i++) {
					if (this.mapList[i] != null) {
						this.mapList[i].update();
					}
				}
			},
			//2019-06-26 박길섭 끝
			/**
			 * 
			 * @name         : doSetPoiSetting
			 * @description  : POI설정정보를 저장한다.
			 * @date         : 2017. 09. 19. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 */
			doSetPoiSetting : function(idx, map_param) {
				var options = map_param.settingInfo;
				var poiList = this.poiLayerList;

				poiList[idx]["settingInfo"] = {
					mode : "indivisual",
					shapeCd : options.shapeCd,
					colorCd : options.colorCd,
					radiusColorCd : options.radiusColorCd,
					radius : options.radius,
					radiusOpacity : options.radiusOpacity,
					heatRadius : options.heatRadius,
					heatOpacity : options.heatOpacity
				};
				this.doApplyPoiSetting(poiList[idx]);
			},
			
			/**
			 * 
			 * @name         : doApplyPoiSetting
			 * @description  : POI설정정보를 적용한다
			 * @date         : 2017. 09. 20. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param poiInfo: POI설정정보
			 */
			doApplyPoiSetting : function(poiInfo) {
				var map = this.mapList[1];
				var setInfo = poiInfo.settingInfo;
				var markerGroup = poiInfo.markerGroup;
				var heatGroup = poiInfo.heatGroup;
				var clusterGroup = poiInfo.clusterGroup;
				
				clusterGroup.clearLayers();
				markerGroup.clearLayers();
				if (heatGroup) {
					heatGroup.setUTMKs([]);
				}
				
				switch(parseInt(setInfo.shapeCd)) {
					case 1:
					case 2:
					case 3:
					case 4:
						//마커를 생성한다.
						if (poiInfo.data.length > this.defaultPoiCnt && poiInfo.adm_cd.length == 2) {
							poiInfo["markerType"] = "cluster";
							this.drawPoiMarker(poiInfo, map, 2);
						}else {
							poiInfo["markerType"] = "normal";
							this.drawPoiMarker(poiInfo, map, 1);
						}
						break;
					case 5:
						//열지도를 생성한다.
						poiInfo["markerType"] = "heatMap";
						this.drawPoiHeatMap(poiInfo, map);
						break;
				}
				
				//반경정보 삭제
				var circleGroup = poiInfo.circleGroup;
				if (circleGroup != null) {
					for (var i=0; i<circleGroup.length; i++) {
						circleGroup[i].remove();
					}
				}
				
				//반경정보가 있을 경우, 반경정보 표출
				if (setInfo.radius != 0) {
					this.drawPoiCircle(poiInfo, map);
				}

			},
			
			/**
			 * 
			 * @name         : setMarker
			 * @description  : POI정보를 세팅한다.
			 * @date         : 2017. 12. 05. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param dataList: POI데이터
			 * @param iconUrl	 : icon url
			 * @param markerGroup : 마커그룹
			 * @param poiInfo : 설정정보
			 */
			setMarker : function(dataList, iconUrl, markerGroup, poiInfo) {
				var icon = sop.icon({
					iconUrl: iconUrl,
					shadowUrl: '/img/marker/theme_shadow.png',
					iconAnchor: [7, 7 ],
					iconSize: [ 14, 14 ],
					infoWindowAnchor: [1, -16]
				});
				var marker = sop.marker([ dataList.coor_x, dataList.coor_y ], {
					icon : icon,
					opacity : 0.7
				});
				marker.info = dataList;
				markerGroup.addLayer(marker);
					
				var html = "";
				html += '<table class="policyPoiTooltip">';
				switch (poiInfo.type) {
					case "census":	//센서스 POI 통계
						html += '<tr>';
						html += 	'<th>' + dataList.corp_nm + '</th>';
						html += 	'<td></td>';
						html += '</tr>';
						html += '<tr>';
						html +=		'<td>'+ dataList.naddr + '</td>';
						html += '</tr>';
						break;
					case "local": //협업형 POI 통계
						html += '<tr>';
						html += 	'<th>' + dataList.div_nm + '</th>';
						html += 	'<td></td>';
						html += '</tr>';
						break;
					case "userData": //사용자 POI 통계
						html += '<tr>';
						html += 	'<th>' + dataList.title + '</th>';
						html += 	'<td></td>';
						html += '</tr>';
						break;
					case "soc": //생활SOC
						html += '<tr>';
						html += 	'<th>' + dataList.fac_nm + '</th>';
						html += 	'<td></td>';
						html += '</tr>';
				}
				
				html += '</table>';
				marker.bindInfoWindow(html);
			},
			
			/**
			 * 
			 * @name         : drawPoiMarker
			 * @description  : POI정보를 표출한다.
			 * @date         : 2017. 09. 21. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param poiInfo: POI정보
			 * @param map	 : 맵정보
			 */
			drawPoiMarker : function(poiInfo, map, type, mapBounds) {
				var setInfo = poiInfo.settingInfo;
				var dataList = poiInfo.data;
				var markerGroup = null;//poiInfo.markerGroup;
				
				switch (type) {
					case 1:
						markerGroup = poiInfo.markerGroup;
						break;
					case 2:
						markerGroup = poiInfo.clusterGroup;
						break;
				}
				markerGroup.clearLayers();
				
				var iconUrl = "";
				switch(parseInt(setInfo.shapeCd)) {
					case 1: //원
						iconUrl = "/img/policyStatic/ico_circle_0"+setInfo.colorCd+".png";
						break;
					case 2:	//사각형
						iconUrl = "/img/policyStatic/ico_rectangle_0"+setInfo.colorCd+".png";
						break;
					case 3:	//마름모
						iconUrl = "/img/policyStatic/ico_rhrombus_0"+setInfo.colorCd+".png";
						break;
					case 4:	//역삼각형
						iconUrl = "/img/policyStatic/ico_triangle_0"+setInfo.colorCd+".png";
						break;
					case 5: //열지도
						break;
				}
				
				for (var i=0; i<dataList.length; i++) {
					if (mapBounds != null && mapBounds != undefined) {
						if (mapBounds.contains(sop.utmk(dataList[i].coor_x, dataList[i].coor_y))) {
							this.setMarker(dataList[i], iconUrl, markerGroup, poiInfo);
						}
					}else {
						this.setMarker(dataList[i], iconUrl, markerGroup, poiInfo);
					}
				}
			},
			
			/**
			 * 
			 * @name         : drawPoiCircle
			 * @description  : 반경정보를 표출한다.
			 * @date         : 2017. 09. 20. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param poiInfo: POI정보
			 * @param map	 : 맵정보
			 */
			drawPoiCircle : function(poiInfo, map) {
				var setInfo = poiInfo.settingInfo;
				var markerGroup = poiInfo.markerGroup;
				var circleGroup = [];
				markerGroup.eachLayer(function(marker) {
					var fillColor = "#0070C0";
					switch (parseInt(setInfo.radiusColorCd)) {
						case 1:
							fillColor = "#0070C0";
							break;
						case 2:
							fillColor = "#ff0000";
							break;
						case 3:
							fillColor = "#0E4000";
							break;
						case 4:
							fillColor = "#000"; 
							break;
						case 5:
							fillColor = "#ffff00";
							break;
					}
					var utmk = marker.getUTMK();
					var circle = sop.circle([utmk.x, utmk.y], setInfo.radius, {
						color : fillColor,
						fillColor : fillColor,
						fillOpacity : setInfo.radiusOpacity / 100,
						opacity :0,
						weight : 0,
						renderer : this.renderer
					});
					circle.addTo(map.gMap);
					circleGroup.push(circle);
				});
				poiInfo.circleGroup = circleGroup;
			},
			
			/**
			 * 
			 * @name         : drawHeatMap
			 * @description  : 열지도를 표출한다.
			 * @date         : 2017. 09. 21. 
			 * @author	     : 권차욱.
			 * @history 	 :
			 * @param poiInfo: POI정보
			 * @param map	 : 맵정보
			 */
			drawPoiHeatMap : function(poiInfo, map) {
				var dataList = poiInfo.data;
				var setInfo = poiInfo.settingInfo;
				var heatGroup = poiInfo.heatGroup;
				if (heatGroup) {
					heatGroup.setUTMKs([]);
				}
				
				var gradient = {};
				switch (parseInt(setInfo.colorCd)) {
					case 1: //파란색계열
						gradient = {
							"0.4" : "#3678F3",
							"0.6" : "#86CCF3",
							"0.7" : "#0070C0",
							"0.8" : "#342FF1",
							"1.0" : "#0000ff"
						};
						break;
					case 2: //빨간색계열
						gradient = {
							"0.4" : "#F6B24C",
							"0.6" : "#FD891E",
							"0.7" : "#F95007",
							"0.8" : "#F91C08",
							"1.0" : "#FF0000"
						};
						break;
					case 3: //녹색계열
						gradient = {
							"0.4" : "#5ACB5E",
							"0.6" : "#05D10C",
							"0.7" : "#059F0A",
							"0.8" : "#057908",
							"1.0" : "#0E4000"
						};
						break;
					case 4: //검은색계열
						gradient = {
							"0.4" : "#C8C6C6",
							"0.6" : "#908F8F",
							"0.7" : "#5C5A5A",
							"0.8" : "#2A2A2A",
							"1.0" :"#000"
						}; 
						break;
					case 5: //노란색계열
						gradient = {
							"0.4" : "#F5F57D",
							"0.6" : "#F2F268",
							"0.7" : "#D2F13B",
							"0.8" : "#CFF50C",
							"1.0" : "#ffff00"
						};
						break;
					case 6: //열지도기본색계열
						gradient = {
							"0.4": 'blue',
						    "0.6": 'cyan',
						    "0.7": 'lime',
						    "0.8": 'yellow',
						    "1.0": 'red'
						 };
						break;
				}
				var heatLayer = sop.heatLayer();
				heatLayer.addTo(map.gMap);
				heatLayer.setOptions({
					radius: 20,
					blur: 20,
					max: 1,
					gradient : gradient,
					renderer : this.renderer
				});
				for (var i=0; i<dataList.length; i++) {
					if (heatLayer) {
						heatLayer.addUTMK([
							 parseFloat(dataList[i].coor_x),
							 parseFloat(dataList[i].coor_y),
							 1
						]);
					}
				}
				poiInfo.heatGroup = heatLayer;
			},
			
			/**
			 * 
			 * @name         : setRegionCd
			 * @description  : 현재위치를 기반으로 콤보박스의 지역을 설정한다.
			 * @date         : 2017. 09. 30. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param adm_cd : 행정동코드
			 */
			setRegionCd : function(adm_cd) {
				if (adm_cd == null) {
					return;
				}
				var sidoCd = null;
				var sggCd = null;
				
				switch(adm_cd.length) {
					case 2:
						sidoCd = adm_cd.substring(0,2);
						break;
					default:
						sidoCd = adm_cd.substring(0,2);
						sggCd = adm_cd.substring(3,3);
						break;
				}
				
				$("#current-sido-select option[value="+sidoCd+"]").prop("selected", true);
				//2018-12-19 LNB화면 최소화시에도 대상지역 선택 표출 필요
				if($("#current-sido-select-2").length > 0) $("#current-sido-select-2 option[value="+sidoCd+"]").prop("selected", true);
				
				$policyStaticMapLeftmenu.ui.getSggList("current", sidoCd, "");		
				$policyStaticMapLeftmenu.ui.getCategoryCnt(sidoCd);
				
				setTimeout(function() {
					$policyStaticMap.ui.setMapPosition();
				}, 200);
			},
			
			/**
			 * 
			 * @name         : setMapPosition
			 * @description  : 지도의 위치를 설정한다.
			 * @date         : 2017. 09. 30. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setMapPosition : function() {
				$policyStaticMap.noReverseGeoCode = true;
				for(var i=0; i<this.mapList.length; i++) {
					var map = this.mapList[i];
					var coord_x, coord_y, zoom;
					if (i==0) {
						coord_x = $("#current-sido-select option:selected").data("coor-x");
						coord_y = $("#current-sido-select option:selected").data("coor-y");
						zoom = 5;
					}
					this.setMoveMap(coord_x, coord_y, map, zoom);
				}
			},
			
			/**
			 * 
			 * @name         : setOriginData
			 * @description  : 시설분석형지표의 왼쪽지도 열지도변환을 위해 기존데이터 조회
			 * @date         : 2017. 11. 14. 
			 * @author	     : 권차욱
			 * @history 	 : 정영심사무관 요청, 시설분석형지도에서 왼쪽맵에도 열지도변환이 되어야함.(현재 경계에서 최대2레벨 조회 열지도)
			 */
			setOriginData : function(options, map) {
				//왼쪽지도가 열지도일 때,
				//현재 경계레벨과 상관없이 2레벨 조회
				if (options.param.mapType != undefined && 
					options.param.mapType == "heat") {
					var boundLevel = $("#boundLevelTitle option:selected").val();
					if (boundLevel == "1") {
						options.param.params.low_search = boundLevel;
						$policyStaticMap.ui.analysisCurrentMultiData = deepCopy(map.multiLayerControl.multiData); 
						$policyStaticMap.ui.analysisCurrentMultiData["type"] = "heat";
						map.multiLayerControl.multiData = [];
						for (var i=0; i<options.admList.length; i++) {
							options.param.params["adm_cd"] = options.admList[i];
							$policyStaticMapApi.request.reqCensusStatsData(deepCopy(options.param), options, map, function(res, parameter, options, map) { 
								$policyStaticMapApi.request.reqBoundaryData(parameter, res, options, map, function(geoData) {
									if (options.admList.length == map.multiLayerControl.multiData.length) {
										res = $policyStaticMapApi.ui.checkStatsData(res, geoData);
										res = $policyStaticMapApi.ui.sortData(res, parameter, map);
										map.setStatsData("normal", res, parameter.filter, parameter.unit);
										map.multiLayerControl.multiData.layer = [];
										
										for (var k=0; k<map.multiLayerControl.multiData.length; k++) {
											var layer = map.multiLayerControl.multiData[k].layer;
											map.multiLayerControl.multiData.layer.push(map.combineStatsData(layer, true));
										}
										$policyStaticMap.ui.analysisOriginMultiData = deepCopy(map.multiLayerControl.multiData);
										$policyStaticMap.ui.analysisOriginMultiData["type"] = "heat";
										//map.multiLayerControl.multiData = $policyStaticMap.ui.analysisCurrentMultiData;
										$policyStaticMap.ui.checkOpenDataBoard();
										
									}
								});
							});
						}
					}else {
						map.multiLayerControl.multiData["type"] = "heat";
					}
				}
			},
			
			/**
			 * 
			 * @name         : setLegendMode
			 * @description  : 범례모드를 설정한다.
			 * @date         : 2017. 11. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param mode   : 범례타입
			 * @param map 	 : map정보
			 */
			setLegendMode : function(mode, map) {
				$("#lgTypeList_"+map.legend.id+">li>a").each(function() {
					var type = $(this).attr("data-type");
					if (type == mode) {
						$(this).click();
					}
				});
				
				if (mode == "heat") {
					$("#btn_legendSetting_"+map.legend.id).hide();
				}else {
					$("#btn_legendSetting_"+map.legend.id).show();
				}
			},
			
			/**
			 * 
			 * @name         : checkOpenDataBoard
			 * @description  : 범례모드를 설정한다.
			 * @date         : 2017. 11. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param mode   : 범례타입
			 * @param map 	 : map정보
			 */
			checkOpenDataBoard : function() {
				var mapA = $policyStaticMap.ui.mapList[0];
				var mapB = $policyStaticMap.ui.mapList[1];
				switch(parseInt($policyStaticMap.ui.settingInfo.idx_type)) {
					case 1:
					case 2:
						if (mapA.multiLayerControl.multiData.length > 0 &&
							mapB.multiLayerControl.multiData.length > 0) {
							$policyStaticMapDataBoard.Combine.mapLoad();
						}
						break;
					case 3:
						var dataList = $policyStaticMapLeftmenu.ui.dataList;
						var tmpDataList = jQuery.grep(dataList, function (a) { 
							return a.data_type == "04" || a.data_type == "05"; 
						});

						if (tmpDataList.length == $policyStaticMap.ui.poiLayerList.length) {
							if (mapA.multiLayerControl.dataGeojson != null && 
								mapA.multiLayerControl.dataGeojson.length > 0) {
								$policyStaticMapDataBoard.Combine.mapLoad();
							}
						}
						break;
				}
			}
	};
	
	$policyStaticMap.request = {
			/**
			 * 
			 * @name         : reqGeocode
			 * @description  : 지오코딩을 조회한다.
			 * @date         : 2017. 09. 30. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param x_coor : x좌표
			 * @param y_coor : y좌표
			 */
			reqGeocode : function(x_coor, y_coor) {
				$.ajax({
		    		url : openApiPath + "/OpenAPI3/addr/rgeocode.json",
		    		data : {
		    			accessToken : accessToken,
		    			addr_type : "20",
		    			x_coor : x_coor,
		    			y_coor : y_coor
		    		},
					type : "GET",
					success : function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								var result = res.result[0];
								if (result != null) {
									var sido_cd = result.sido_cd;
									var sgg_cd = result.sgg_cd;
									var emdong_cd = result.emdong_cd;
									var adm_cd = null;
									if (sido_cd != undefined) {
										adm_cd = sido_cd;
										if (sgg_cd != undefined) {
											adm_cd = sido_cd + sgg_cd;
											if (emdong_cd != undefined) {
												adm_cd = sido_cd + sgg_cd + emdong_cd;
											}
										}
									}
									$policyStaticMap.ui.setRegionCd(adm_cd);
								}
								break;
							case -100:
								break;
							case -401:
								accessTokenInfo(function() {
									$policyStaticMap.request.reqGeocode(x_coor, y_coor);
								});
								break;
						}
					},
					async : false,
					dataType : "json",
					error: function(x,o,e) {
						$policyStaticMap.ui.setRegionCd($policyStaticMapLeftmenu.ui.defaultSidoCd);
					}
				});						
			}
	};
	
	$policyStaticMap.event = {
			
			/**
			 * 
			 * @name         : mapSyncEvent
			 * @description  : 지도 1,2의 이벤트를 동기화한다.
			 * @date         : 2017. 10. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			mapSyncEvent :  function() {
				var lMap = $policyStaticMap.ui.mapList[0].gMap;
				var rMap = $policyStaticMap.ui.mapList[1].gMap;
				lMap.sync(rMap);
				rMap.sync(lMap);
			},
			
			/**
			 * 
			 * @name         : mapUnSyncEvent
			 * @description  : 지도 1,2의 이벤트를 동기화를 해제한다.
			 * @date         : 2017. 10. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			mapUnSyncEvent : function() {
				var lMap = $policyStaticMap.ui.mapList[0].gMap;
				var rMap = $policyStaticMap.ui.mapList[1].gMap;
				lMap.unsync(rMap);
				rMap.unsync(lMap);
			},
			
			/**
			 * 
			 * @name         : setUIEvent
			 * @description  : 이벤트를 설정한다.
			 * @date         : 2017. 10. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setUIEvent : function() {
				$(".policySelectBox").hide();
				$("#naviTitle").hide();
				$("#boundLevelTitle").hide();
				//$("#sTitle").hide();
				
				//년도선택 이벤트
				$("body").on("change", ".yearSelectBox", function() {
					if($(".policyStaticMapDataBoard").hasClass("on")){
						//데이터보드 닫기
						$(".dataSideBox").removeClass("full");
						$(".dataSideBox").stop().animate({"right":"-1500px"},200);
						$(".policyStaticMapDataBoard").removeClass("on").stop().animate({"right":"0"},200);
					}
					
					srvLogWrite( "E0", "04", "01", "00", $policyStaticMap.ui.settingInfo.policy_idx_nm, $policyStaticMap.ui.getLogParams() ); // jrj 로그 > 조회년도 선택
					
					var id = $(this).attr("id");
					var idx = id.split("_")[1];
					var map = $policyStaticMap.ui.mapList[parseInt(idx)-1];
					var options = $policyStaticMapLeftmenu.ui.arrParamList[parseInt(idx)-1];
					var year = $(this).val();
					var sCall_param = options.call_param;
					if(typeof(options.call_param) == "string") sCall_param = eval("("+options.call_param+")");
					
					switch(parseInt(options.data_div)) {
						case 3 :
							var result = $policyStaticMapApi.ui.userData[map.id][year];
							var res = {
									errCd : "0",
									id : "API_MYDATA",
									result : result,
									dataType : "userData"
							};
							var setData = $policyStaticMap.ui.setParams(options, map);
							setData.param["year"] = year;
							map.multiLayerControl.multiData = [];
							$policyStaticMapApi.ui.doUserBoundData(res, setData, map);
							break;
						default:
							sCall_param["year"] = year;
							options.call_param = sCall_param;
							$policyStaticMapLeftmenu.ui.arrParamList[parseInt(idx)-1]=options;  // 바뀐 apiparam을 저장.
							$policyStaticMap.ui.doReqStatsData(options, $policyStaticMap.ui.mapList[parseInt(idx)-1]);
							break;
					}
				});
				
				//경계레벨선택 이벤트
				$("body").on("change", "#boundLevelTitle", function() {
					if( $(this).val() != "1" && $policyStaticMap.ui.settingInfo.idx_id == '3074823551201711211711119354566751530' ){
						messageAlert.open("알림","민방위대피시설 분포 현황은 시군구까지만 조회가 가능하여 선택된 지역의 통계를 볼 수 없습니다.");
						$(this).val("1");
					} else {
						if($(".policyStaticMapDataBoard").hasClass("on")){
							//데이터보드 닫기
							$(".dataSideBox").removeClass("full");
							$(".dataSideBox").stop().animate({"right":"-1500px"},200);
							$(".policyStaticMapDataBoard").removeClass("on").stop().animate({"right":"0"},200);
						}
						
						var info = $policyStaticMap.ui.settingInfo.policy_idx_nm;
						var params = $policyStaticMap.ui.getLogParams();
						
						if( $("#current-sgg-select option:selected").text() == "전체" ) {
							if( $( this ).val() == "2" ){
								srvLogWrite( "E0", "04", "02", "01", info.policy_idx_nm, params ); // jrj 로그 > 경계 선택 읍면동 경계
							} 
						} else {
							if( $( this ).val() == "1" ){
								srvLogWrite( "E0", "04", "02", "01", info.policy_idx_nm, params ); // jrj 로그 > 경계 선택 읍면동 경계
							} else {
								srvLogWrite( "E0", "04", "02", "02", info.policy_idx_nm, params ); // jrj 로그 > 경계 선택 집계구 경계
							}
						}
						
						var kosisYn = "N";
						var kosisIdx = 0;
						for (var i = 0; i < $policyStaticMapLeftmenu.ui.arrParamList.length; i++) {
							if ($policyStaticMapLeftmenu.ui.arrParamList[i].data_div == "2") {
								kosisYn = "Y";
								kosisIdx = i;
							}
						}
						if (kosisYn == "Y") { // KOSIS 데이터
							var setData = $policyStaticMap.ui.setParams($policyStaticMapLeftmenu.ui.arrParamList[kosisIdx], $policyStaticMap.ui.mapList[kosisIdx]);
							setData.param.params["gis_se"] = setData.admList[0];
							$policyStaticMapApi.ui.checkKosisParams(setData, "Y", function() {
								var lengthVal = 2;
								if ( $policyStaticMap.ui.settingInfo["idx_type"] == "3" ) {  // 시설분석형 일경우 2번째 지도는 조회안함
									lengthVal = 1;
								}
								
								for (var idx=0;  idx< lengthVal; idx++) {
									var map = $policyStaticMap.ui.mapList[parseInt(idx)];
									var options = $policyStaticMapLeftmenu.ui.arrParamList[parseInt(idx)];
									var sCall_param = options.call_param;
									if (options.data_div != "2") {
										if(typeof(options.call_param) == "string") sCall_param = eval("("+options.call_param+")");
										sCall_param["low_search"] = $("#boundLevelTitle").val();
										options.call_param = sCall_param;
										$policyStaticMapLeftmenu.ui.arrParamList[parseInt(idx)]=options;  // 바뀐 apiparam을 저장.
									}
									$policyStaticMap.ui.doReqStatsData(options, map);
								}
							});
						} else {
							var lengthVal = 2;
							if ( $policyStaticMap.ui.settingInfo["idx_type"] == "3" ) {  // 시설분석형 일경우 2번째 지도는 조회안함
								lengthVal = 1;
							}
							for (var idx=0;  idx< lengthVal; idx++) {
								var map = $policyStaticMap.ui.mapList[parseInt(idx)];
								var options = $policyStaticMapLeftmenu.ui.arrParamList[parseInt(idx)];
								var sCall_param = options.call_param;
								var j = parseInt(idx)+1;
								if(typeof(options.call_param) == "string") sCall_param = eval("("+options.call_param+")");
		
								switch(parseInt(options.data_div)) {
									case 2 : // KOSIS 데이터
										$policyStaticMap.ui.doReqStatsData(options, map);
										break;
									case 3 : // 사용자 데이터
										var result = $policyStaticMapApi.ui.userData[map.id][$("#policySelectBox_"+j).val()];
										var res = {
												errCd : "0",
												id : "API_MYDATA",
												result : result,
												dataType : "userData"
										};
										var setData = $policyStaticMap.ui.setParams(options, map);
										setData.param["low_search"] = $(this).val();
										map.multiLayerControl.multiData = [];
										$policyStaticMapApi.ui.doUserBoundData(res, setData, map);
										break;
									case 6 :
										sCall_param["low_search"] = $(this).val();
										
										$policyStaticSocMap.ui.selBoundLevel = $(this).val();
										
										options.call_param = sCall_param;
										$policyStaticMapLeftmenu.ui.arrParamList[parseInt(idx)]=options;  // 바뀐 apiparam을 저장.
										$policyStaticMap.ui.doReqStatsData(options, $policyStaticMap.ui.mapList[parseInt(idx)]);
										
										break;
									default:
										sCall_param["low_search"] = $(this).val();
										options.call_param = sCall_param;
										$policyStaticMapLeftmenu.ui.arrParamList[parseInt(idx)]=options;  // 바뀐 apiparam을 저장.
										$policyStaticMap.ui.doReqStatsData(options, $policyStaticMap.ui.mapList[parseInt(idx)]);
										//mng_s 20180212 주용민
										if(idx == 0){
											if('yDMKDIKzyn20170803172737331vsqnssqM1z' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S47", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('2sMtuGwJID20170803172737331rtyMEvKyso' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S48", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('xpwJJxztnG20170803172737331HyvJxM3FHs' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S49", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('EwwunnFpJK201708031727373316K8vsErJuJ' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S50", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('onppztzErp20170803172737331z8tyqHzI9w' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S51", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('MLD6xDDuHs20170803172737332wKuuvtvsq4' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S52", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('ysE4vzDMqx20170803172737333GyKIrExLJF' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S53", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('qqnLo3nzJu20170803172737333sF0GorqFtu' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S54", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('r3KxpDLnz520170803172737333Est1pnrzqx' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S55", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('KsK7HuJ6vL20170803172737333H3osD1tpuE' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S56", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('HoMCJ0uHEz20170803172737334KGyGroEKqo' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S57", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('0210176233201710301539320124465875560' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S60", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('GnCDxoqD8q201708031727373316EE5yvyDDD' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S61", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('wE7JnMvoGu20170803172737332pxynvLs2qF' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S62", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('65rvHsrIzu20170803172737332sHJzvzpwJE' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S63", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('uHzorzuwyw20170803172737332v7rFoJoL2I' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S64", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('MLD6xDDuHs20170808152137332wKuuvtvsq4' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S65", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('9221137705201710301546072662443762660' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S67", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('2547676290201710301551567684108432782' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S68", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('2088944725201711211657122621829462177' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S69", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('2635651540201711301541034840754001433' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S70", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('3724842547201711201014253871792207583' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S71", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('3458556422201710301554388959489997313' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S72", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('7960926159201711211700328741236696657' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S73", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('rsEJy3oJwG20170803172737334I49JoFMEGz' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S74", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('xpwJJxztnG20170808142737332HyvJxM3FHs' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S75", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('EwwunnFpJK201708081427373326K8vsErJuJ' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S76", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('onppztzErp20170808142737333z8tyqHzI9w' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S77", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('pyL5xrpKKF20170808152137332Lu5p9E6DKt' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S78", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('uHzorzuwyw20170808152137332v7rFoJoL2I' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S79", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('6460310735201710301625000622232552773' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S80", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('8292308888201710301617197294119290010' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S81", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('3751353392201712061200288355280432955' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S82", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('wu5oMryvM720170803172737331sJnsFLDrpy' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S83", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('rzzGswqnLv20170803172737332zKLutDGw5E' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S84", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('q5MFyLCnFt20170803172737332tGMGtq9Kwn' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S85", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('GFLnoGyFF220170803172737332qMvwFn5v7t' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S86", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('ntpJEMwwsx20170803172737333xxvMIJ5rGK' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S87", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('H1LGyrMIEF20170803172737333DxGrxxtEsr' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S88", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('FJMJwwpKvz20170803172737333HtKMuowG7o' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S89", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('nvsDwtnIMM20170803172737333tzyypxrpuE' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S90", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('rH4wnv36It20170803172737334nvKrIEMnzF' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S91", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('DMspq6u4Mv201708031727373349yHup4JG7w' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S92", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('yDMKDIKzyn20170808142737331vsqnssqM1z' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S93", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('4567814844201710301633013080966785401' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S94", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('5075653758201711211705104277120963624' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S95", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('3074823551201711211711119354566751530' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S96", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('8547921299201711211707478631593010966' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S97", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('4846938690201712181802041978059514311' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "S98", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
											else if('8599077428201710301634346508152047319' == $policyStaticMap.ui.settingInfo["idx_id"])
												apiLogWrite2("S0", "SA0", $policyStaticMap.ui.settingInfo["policy_idx_nm"], "category_id="+$policyStaticMap.ui.settingInfo["category_id"]+"&adm_cd="+$policyStaticMap.ui.settingInfo["adm_cd"]+"&idx_type="+$policyStaticMap.ui.settingInfo["idx_type"], "00", $policyStaticMap.ui.settingInfo["adm_nm"]);
										}
										//mng_e 20180212 주용민
										break;
									}
							}
						}
					}
				});
				
				//지도 이동 싱크버튼 이벤트 
				$("body").on("click", "#mapRgn_lock_btn", function() {
					var tempVal = $("#mapRgn_lock_btn").attr("alt");
					if (tempVal == "locked") {
						$("#mapRgn_lock_btn").attr("alt", "unlocked");
						$("#mapRgn_lock_btn").attr("src", "/img/common/icon_temp_sseok_2.png");
						$policyStaticMap.event.mapUnSyncEvent();						
					} else {
						$("#mapRgn_lock_btn").attr("alt", "locked");
						$("#mapRgn_lock_btn").attr("src", "/img/common/icon_temp_sseok.png");
						$policyStaticMap.event.mapSyncEvent();
					}
					
					srvLogWrite( "E0", "04", "03", "00", "", ( tempVal != "locked" ? "동기화" : "비동기화" ) ); // jrj 로그 > 지도화면 동기화 설정
				});
			}
			
	};
	
	// ==============================//
	// map event callback
	// ==============================//
	$policyStaticMap.callbackFunc = {
			// 맵 줌 종료 시, 콜백 호출
			didMapMoveEnd : function(event, map) {
				if (map.id == 1 && $policyStaticMap.ui.poiLayerList.length > 0) {
					var mapBounds = map.gMap.getBounds();
					var poiList = $policyStaticMap.ui.poiLayerList;
					if (map.gMap._zoom >= 9) {
						//중심좌표가 화면영역에 벗어났을 경우, poi를 그린다.
						/*if ($policyStaticMap.ui.mapBounds != null &&
							$policyStaticMap.ui.mapBounds.contains(map.gMap.getCenter())) {
							return;
						}*/
						$policyStaticMap.ui.mapBounds = mapBounds;
						for (var i=0; i<poiList.length; i++) {
							switch(poiList[i].markerType) {
								case "cluster":
									poiList[i].clusterGroup.clearLayers();
									$policyStaticMap.ui.drawPoiMarker(poiList[i], map, 1, $policyStaticMap.ui.mapBounds);
									break;
								case "normal":
									$policyStaticMap.ui.drawPoiMarker(poiList[i], map, 1, $policyStaticMap.ui.mapBounds);
									break;
								default:
									break;
							}
							
							//반경정보 삭제
							var circleGroup = poiList[i].circleGroup;
							if (circleGroup != null) {
								for (var k=0; k<circleGroup.length; k++) {
									circleGroup[k].remove();
								}
							}
								
							//반경정보가 있을 경우, 반경정보 표출
							var setInfo = poiList[i].settingInfo;
							if (setInfo.radius != 0) {
								$policyStaticMap.ui.drawPoiCircle(poiList[i], map);
							}

						}
					}else {
						for (var i=0; i<poiList.length; i++) {
							switch(poiList[i].markerType) {
								case "cluster":
									var cnt = poiList[i].markerGroup.getLayers().length;
									if (cnt > 0) {
										poiList[i].markerGroup.clearLayers();
										$policyStaticMap.ui.drawPoiMarker(poiList[i], map, 2);
										
										//반경정보 삭제
										var circleGroup = poiList[i].circleGroup;
										if (circleGroup != null) {
											for (var k=0; k<circleGroup.length; k++) {
												circleGroup[k].remove();
											}
										}
									}
									break;
								case "normal":
									//마커를 다 그리면 더 이상 그리지 않는다.
									var cnt = poiList[i].markerGroup.getLayers().length;
									if (cnt == poiList[i].data.length) {
										return;
									}
									$policyStaticMap.ui.drawPoiMarker(poiList[i], map, 1);
									
									//반경정보 삭제
									var circleGroup = poiList[i].circleGroup;
									if (circleGroup != null) {
										for (var k=0; k<circleGroup.length; k++) {
											circleGroup[k].remove();
										}
									}
										
									//반경정보가 있을 경우, 반경정보 표출
									var setInfo = poiList[i].settingInfo;
									if (setInfo.radius != 0) {
										$policyStaticMap.ui.drawPoiCircle(poiList[i], map);
									}
									break;
								default:
									break;
							}
						}
					}
				}
				 
			},
			
			// 마우스오버
			didMouseOverPolygon : function(event, data, type, map) {
				if (type != "polygon") {
					if (type == "data") {
						if (data.info.length > 0) {
							map.legend.selectLegendRangeData(event.target.options.fillColor);
						}
					}
					$policyStaticMap.ui.createInfoTooltip(event, data, type, map);
				}else {
					$policyStaticMap.ui.createInfoTooltip(event, data, type, map);
				}
			}
	};
	
}(window, document));
