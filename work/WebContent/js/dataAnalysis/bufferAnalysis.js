
(function(W,D){
	W.$bufferAnalysis = W.$bufferAnalysis || {};
	
	$(document).ready(function(){
		$bufferAnalysis.event.setUIEvent();
	});
	
	//UI 내용작성
	$bufferAnalysis.ui = {
			params : {},
			
			/**
			 * 
			 * @name         : doChangeView
			 * @description  : 분석조건화면을 전환한다.
			 * @date         : 2018. 08. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 분석타입
			 * @param idx    : 화면 인덱스
			 */
			doChangeView : function(type, idx) {

				//화면전환 설정
				this.setChangePageView(type, idx);
			},
			
			/**
			 * 
			 * @name         : setChangePageView
			 * @description  : 분석화면 설정
			 * @date         : 2018. 08. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param idx    : 화면 인덱스
			 */
			setChangePageView : function(type, idx) {
				var desc;
				switch(idx) {
					case 0:
						$("#analysisDesc").html( $commonAnalysis.util.getAnalysisDescription(type));
						this.showDataSelectMainView(type);
						break;
					case 1:
						$("#censusMainPage").hide();
						//사용자가 센서스 데이터를 선택했는지
						//아니면 나의데이터를 선택했는지에 따라 다음화면이 달라짐
						//센서스 데이터 - 센서스 조건설정 화면으로 이동
						//나의 데이터 - 경계설정 화면으로 이동
						switch($commonAnalysis.ui.params.dataInfo.type) {
							case "censusData":
								this.showCensusDetailView();
								break;
							case "userData": // 지역선택 화면
								this.showBoundaryView();
								//this.showBufferView();
								break;
							default:
								break;
						}
						break;
					case 2: 
						$("#censusMainPage").hide();
						//사용자 설정 여부와 관계 없이 버퍼 조건 선택 화면으로 이동
						switch($commonAnalysis.ui.params.dataInfo.type) {
							case "censusData": // 지역선택 화면
								this.showBoundaryView();
								//this.showBufferView();
								break;
							case "userData":
								// 행정경계만 존재
								$("#gridArea").hide();
								$("#hexagonArea").hide();
								this.showRegionView();
								
								break;
							default:
								break;
						}
						break;	
					case 3: // 버퍼 상세 조건 선택 화면
						$("#censusMainPage").hide();
						switch($commonAnalysis.ui.params.dataInfo.type) {
							case "censusData":
								// 행정경계만 존재
								$("#gridArea").hide();
								$("#hexagonArea").hide();
								this.showRegionView();
								break;
							case "userData":
								this.showBufferView();								
								break;
							default:
								break;
						}
						break;		
					case 4:
						//사용자가 센서스 데이터를 선택했는지
						//아니면 나의데이터를 선택했는지에 따라 다음화면이 달라짐
						//센서스 데이터 - 경계설정 화면으로 이동
						//나의 데이터 -지역선택 화면으로 이동
						switch($commonAnalysis.ui.params.dataInfo.type) {
							case "censusData":
								this.showBufferView();								
								break;
							case "userData":
								switch(parseInt($commonAnalysis.ui.params.bufferInfo.selstep)) {
									case 1:	//사업체조사
										this.showBufferCompanyView();
										break;
									case 2:	//임의 POI 생성
										this.showBufferPoiView();
										break;
									case 3:	//사용자 데이터
										this.showBufferUserDataView();
										break;	
									case 4:	//도로네트워크 선택
										this.showBufferRoadView();
										break;
									default:
										break;
								}
								break;
							default:
								break;
						}
						break;
					case 5:
						//사용자가 센서스 데이터를 선택했는지
						//아니면 나의데이터를 선택했는지에 따라 다음화면이 달라짐
						//센서스 데이터 - 지역선택 화면으로 이동
						//나의 데이터 -
						switch($commonAnalysis.ui.params.dataInfo.type) {
							case "censusData":
								switch(parseInt($commonAnalysis.ui.params.bufferInfo.selstep)) {
										case 1:	//사업체조사
											this.showBufferCompanyView();
											break;
										case 2:	//임의 POI 생성
											this.showBufferPoiView();
											break;
										case 3:	//사용자 데이터
											this.showBufferUserDataView();
											break;	
										case 4:	//도로네트워크 선택
											this.showBufferRoadView();
											break;
										default:
											this.showSummaryView();
											break;
									}
									break;
							case "userData":
								this.showSummaryView();
								break;
							default:
								break;
						}
						break;
					case 6:
						switch($commonAnalysis.ui.params.dataInfo.type) {
							case "censusData":
								switch(parseInt($commonAnalysis.ui.params.bufferInfo.selstep)) {
									case 1:	//사업체조사
										if ($commonAnalysis.ui.params.bufferInfo.buffer_type == "D") {
											this.showBufferCompanyPoiView();
										}else {
											this.showSummaryView();
										}
										break;
									case 3: //사용자데이터
										if ($commonAnalysis.ui.params.bufferInfo.buffer_type == "D") {
											this.showBufferUserPoiView();
										}else {
											this.showSummaryView();
										}
										break;
									default:
										this.showSummaryView();
										break;
								}
								break;
							case "userData":
								break;
							default:
								break;
						}
						break;
					default:
						this.showSummaryView();
						break;
				}
			},
			
			/**
			 * 
			 * @name         : showDataSelectMainView
			 * @description  : 경계분석 첫페이지 화면
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showDataSelectMainView : function() {
				$(".pageView").hide();
				$(".prevPageBtn").hide();
				$(".excuteBtn").hide();
				$(".nextPageBtn").show();
				$("#censusMainPage").show();
				
				// 버퍼 상세조건 사용자 데이터 에서 숨긴 페이지 재 표출
				$("#analysisDesc").show();
				$("#censusArea").show();
				$(".analysisSelectBox").show();
				
				//센서스 데이터 선택영역 표출
				$("#userData").hide();
				$(".dataTypeBtn").removeClass("on");
				$("#censusData").addClass("on");
				$("#censusData").addClass("t04");
				
				//센서스 데이터 선택영역 표출
				$commonAnalysis.event.doChangeArea("census");
				
				//단계설정
				$commonAnalysis.ui.setNavStep(0);
			},
			
			/**
			 * 
			 * @name         : showBoundaryView
			 * @description  : 경계타입 선택화면
			 * @date         : 2018. 09. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showBoundaryView : function() {
				$(".pageView").hide();
				$(".prevPageBtn").show();
				$(".nextPageBtn").show();
				$(".excuteBtn").hide();
				$("#boundaryPage").show();
				
				//보로노이 다이어그램은 행정경계만 지원한다.
				$(".analysisTypeList li a").each(function() {
					var type = $(this).attr("id");
					if (type == "adm") {
						$(this).parent().addClass("t03");
					}else {
						$(this).parent().hide();
					}
				});
				
				//단계설정
				$commonAnalysis.ui.setNavStep(1);
			},
			
			/**
			 * 
			 * @name         : showBufferCompanyView
			 * @description  : 버퍼상세조건뷰-사업체조사
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showBufferCompanyView : function() {
				$(".pageView").hide();
				$(".prevPageBtn").show();
				$(".nextPageBtn").show();
				$(".excuteBtn").hide();
				
				//버퍼조건-사업체조사 화면에서 숨김 페이지 재 표출 
				$("#censusDetailPage").show();
				$(".censusDetailArea").hide();
				$("#themeArea").show();
				$("#defaultDesc").hide();
				$("#bufferDetailDesc").show();
				$("#poiRadiusPage").show();
				$("#themeTarget").hide();
				$("#dynamicPoiArea").show();
		
				//단계설정
				$commonAnalysis.ui.setNavStep(2);
			},
			
			/**
			 * 
			 * @name         : showBufferCompanyPoiView
			 * @description  : 버퍼상세조건뷰-사업체조사(POI)
			 * @date         : 2018. 12. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showBufferCompanyPoiView : function() {
				$(".pageView").hide();
				$(".prevPageBtn").show();
				$(".nextPageBtn").show();
				$(".excuteBtn").hide();
				
				//버퍼조건-사용자데이터 화면에서 숨김 페이지 재 표출 
				$("#bufferPolygonPage").show();
				$("#poiRadiusPage").hide();
				$("#dynamicPoiArea").hide();
				$("#bufferPolygonPageTitle").html("POI분석은 사용자가 생성한 POI를 기준으로 버퍼를 생성하고, 분석하는 서비스입니다. POI는 최대 20개로 제한하고 있습니다.");
				
				//지도 초기화
				$commonAnalysis.ui.isSavedPoiData = false;
				$commonAnalysisMap.ui.userLayerInfo = [];
				if ($commonAnalysisMap.ui.mapList.length > 0) {
					var map = $commonAnalysisMap.ui.mapList[1];
					map.gMap.remove();
				} 
				
				//지도 생성
				$commonAnalysisMap.ui.type = "company";
				$commonAnalysisMap.ui.createMap("mapRgn_2", 1, {
					intrPoiControl : false,
					intrSettingControl : false,
					mapTypeControl : false,
					intrZoomControl : true,
					searchAnalysisPoiControl : true
				});
		
				//단계설정
				$commonAnalysis.ui.setNavStep(2);
			},
			
			/**
			 * 
			 * @name         : showBufferUserPoiView
			 * @description  : 버퍼상세조건뷰-사용자데이터(POI)
			 * @date         : 2018. 12. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showBufferUserPoiView : function() {
				$(".pageView").hide();
				$(".prevPageBtn").show();
				$(".nextPageBtn").show();
				$(".excuteBtn").hide();
				
				//버퍼조건-사용자데이터 화면에서 숨김 페이지 재 표출 
				$("#bufferPolygonPage").show();
				$("#poiRadiusPage").hide();
				$("#dynamicPoiArea").hide();
				$("#bufferPolygonPageTitle").html("POI분석은 사용자가 생성한 POI를 기준으로 버퍼를 생성하고, 분석하는 서비스입니다. POI는 최대 20개로 제한하고 있습니다.");
				
				//지도 초기화
				$commonAnalysis.ui.isSavedPoiData = false;
				$commonAnalysisMap.ui.userLayerInfo = [];
				if ($commonAnalysisMap.ui.mapList.length > 0) {
					var map = $commonAnalysisMap.ui.mapList[1];
					map.gMap.remove();
				} 
				
				//지도 생성
				$commonAnalysisMap.ui.type = "user";
				$commonAnalysisMap.ui.createMap("mapRgn_2", 1, {
					intrPoiControl : false,
					intrSettingControl : false,
					mapTypeControl : false,
					intrZoomControl : true,
					searchAnalysisPoiControl : true
				});
		
				//단계설정
				$commonAnalysis.ui.setNavStep(2);
			},
			
			/**
			 * 
			 * @name         : showBufferUserDataView
			 * @description  : 버퍼상세조건뷰-사용자데이터
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showBufferUserDataView : function() {
				$(".pageView").hide();
				$(".prevPageBtn").show();
				$(".nextPageBtn").show();
				$(".excuteBtn").hide();
				
				
				
				//버퍼조건-사용자데이터 화면에서 숨김 페이지 재 표출 
				$("#censusMainPage").show();
				$(".analysisSelectBox").hide();
				$("#poiRadiusPage").show();
				$("#dynamicPoiArea").show();
				
				//버퍼조건 사용자 데이터 호출을 위한 키값 변경
				$("#analysisData").attr("id", "analysisPoiData");
				$("#shareData").attr("id", "sharePoiData");
				
				$commonAnalysis.event.doChangeArea('user');
				
				//단계설정
				$commonAnalysis.ui.setNavStep(2);
			},
			
			/**
			 * 
			 * @name         : showBufferPoiView
			 * @description  :버퍼상세조건뷰-임의POI생성
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showBufferPoiView : function() {
				$(".pageView").hide();
				$(".prevPageBtn").show();
				$(".nextPageBtn").show();
				$(".excuteBtn").hide();
				
				//버퍼조건-사용자데이터 화면에서 숨김 페이지 재 표출 
				$("#bufferPolygonPage").show();
				$("#poiRadiusPage").show();
				$("#dynamicPoiArea").show();
				$("#bufferPolygonPageTitle").html("임의 POI분석은 사용자가 생성한 POI를 기준으로 버퍼를 생성하고, 분석하는 서비스입니다. POI는 최대 20개로 제한하고 있습니다.");
				
				//지도 초기화
				$commonAnalysis.ui.isSavedPoiData = false;
				$commonAnalysisMap.ui.userLayerInfo = [];
				if ($commonAnalysisMap.ui.mapList.length > 0) {
					var map = $commonAnalysisMap.ui.mapList[1];
					map.gMap.remove();
				} 
				
				//지도 생성
				$commonAnalysisMap.ui.type = "poi";
				$commonAnalysisMap.ui.createMap("mapRgn_2", 1, {
					intrPoiControl : false,
					intrSettingControl : false,
					mapTypeControl : false,
					intrZoomControl : true,
					searchPoiControl : true
				});
			},
			
			/**
			 * 
			 * @name         : showBufferRoadView
			 * @description  :버퍼상세조건뷰-도로네트워크
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showBufferRoadView : function() {
				$(".pageView").hide();
				$(".prevPageBtn").show();
				$(".nextPageBtn").show();
				$(".excuteBtn").hide();
				
				//버퍼조건-사용자데이터 화면에서 숨김 페이지 재 표출 
				$("#bufferPolygonPage").show();
				$("#poiRadiusPage").show();
				$("#dynamicPoiArea").hide();
				$("#bufferPolygonPageTitle").html("도로망분석은 도로망을 기준으로 버퍼를 생성하고, 분석하는 서비스입니다. 먼저, 개별 또는 폴리곤으로 분석할 도로망을 선택해주세요.");
				
				//지도 초기화
				$commonAnalysis.ui.isSavedRoadData = false;
				$commonAnalysisMap.ui.userLayerInfo = [];
				if ($commonAnalysisMap.ui.mapList.length > 0) {
					var map = $commonAnalysisMap.ui.mapList[1];
					map.gMap.remove();
				}
				
				//지도 생성
				$commonAnalysisMap.ui.type = "road";
				$commonAnalysisMap.ui.createMap("mapRgn_2", 1, {
					intrPoiControl : false,
					intrSettingControl : false,
					mapTypeControl : false,
					intrZoomControl : true,
					searchPoiControl : false,
					searchAnalysisControl : true
				});
							
			},
			
			/**
			 * 
			 * @name         : showCensusDetailView
			 * @description  : 경계분석 센서스 상세조건설정 화면
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showCensusDetailView : function() {
				$(".pageView").hide();
				$(".prevPageBtn").show();
				$(".nextPageBtn").show();
				$(".excuteBtn").hide();
				
				//버퍼조건-경계분석 센서스 상세조건설정 화면에서 숨김 페이지 재 표출 
				$("#censusDetailPage").show();
				$(".censusDetailArea").hide();
				$("#" + $commonAnalysis.ui.params.dataType + "Area").show();
				$("#defaultDesc").show();
				$("#bufferDetailDesc").hide();
				$("#themeTarget").show();
				
				//단계설정
				$commonAnalysis.ui.setNavStep(0);
				
				//산업체분류코드 조회
				if ($commonAnalysis.ui.params.dataType == "company") {
					var class_deg = "";
					if(parseInt($("#company_year").val()) <= 2005) {
						class_deg = "8";
					} else if(parseInt($("#company_year").val()) > 2005 && parseInt($("#company_year").val()) <= 2016) {
						class_deg = "9";
					} else if(parseInt($("#company_year").val()) > 2016) {
						class_deg = "10";
					}
					$commonAnalysis.ui.companyTree = null;
					$commonAnalysis.ui.curSelectedCompanyNode = null;
					$commonAnalysisApi.request.doReqInterstryCode(0, class_deg);
				}	
			},
			
			/**
			 * 
			 * @name         : showBufferView
			 * @description  : 버퍼 조건 선택화면
			 * @date         : 2018. 09. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showBufferView : function() {
				$(".pageView").hide();
				$(".prevPageBtn").show();
				$(".nextPageBtn").show();
				$(".excuteBtn").hide();
				
				//숨김 페이지 재 표출 
				$("#bufferOptionPage").show(); // 버퍼 조건 
				
				//단계설정
				$commonAnalysis.ui.setNavStep(2);
			},
			
			/**
			 * 
			 * @name         : showRegionView
			 * @description  : 경계분석 지역선택 화면
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showRegionView : function() {
				$(".pageView").hide();
				$(".prevPageBtn").show();
				$(".nextPageBtn").show();
				$(".excuteBtn").hide();
				
				//숨김 페이지 재 표출 
				$("#regionPage").show();
				
				//집계범위영역 숨김
				$("#admTypeArea").find("tbody").hide();
				
				//단계설정
				$commonAnalysis.ui.setNavStep(1);
				
				//시도정보 조회
				$commonAnalysis.ui.regionPageMode = "buffer";
				$commonAnalysisApi.request.doReqSidoList(bndYear); 
			},
			
			/**
			 * 
			 * @name         : showSummaryView
			 * @description  : 요약정보 화면 
			 * @date         : 2018. 10. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showSummaryView : function() {
				$(".pageView").hide();
				
				//2019-02-01 이전버튼 추가 수정
				//$(".prevPageBtn").hide();
				$("#analysisTitle").val("");
				
				$(".nextPageBtn").hide();
				$(".excuteBtn").show();
				
				//숨김 페이지 재 표출 
				$("#summaryPage").show();
				
				//단계설정
				$commonAnalysis.ui.setNavStep(3);
				
				//요약분석명 설정
				$("#summaryNm").html($commonAnalysis.util.getAnalysisNm("buffer"));
				
				//데이터 조건 설정
				var html = "";
				var dataNames = this.params.dataInfo.names;
				for (var i=0; i<dataNames.length; i++) {
					html += "<div class='inp02'><a>"+dataNames[i]+"</a></div>";
				}
				$("#dataTextArea").html(html);
				
				//버퍼 조건 설정
				var html = "";
				var dataNames = this.params.bufferInfo.names;
				for (var i=0; i<dataNames.length; i++) {
					html += "<div class='inp02'><a>"+dataNames[i]+"</a></div>";
				}
				$("#bufferTextArea").html(html);
				$("#bufferInfoText").show();
				
				//지역조건 설정
				var html = "";
				var regionNames = this.params.regionInfo.names;
				for (var i=0; i<regionNames.length; i++) {
					html += "<div class='inp02'><a>"+regionNames[i]+"</a></div>";
				}
				$("#regionTextArea").html(html);
			},
			
			/**
			 * 
			 * @name         : doCheckValidation
			 * @description  : 화면별 선택항목을 체크한다.
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param idx : 화면 인덱스
			 */
			doCheckValidation : function(idx) {	
				console.log(idx);
				console.log(this.params);
				switch(idx) {
					case 0:
						var checkParams = $commonAnalysis.ui.setParamsForView("dataMain");
						if (checkParams == "invalidate") {
							return false;
						}
						this.params = checkParams;
						break;
					case 1:
						switch(this.params.dataInfo.type) {
							case "censusData":
								this.params.dataInfo["params"] = $commonAnalysis.ui.setParamsForView(this.params.dataType);
								if (this.params.dataType == "company") {
									if (this.params.dataInfo.params.class_code == undefined || this.params.dataInfo.params.class_code.length < 5) {
										$message.open("알림", "POI가 많으면 분석의 성능이슈가 발생하므로 산업체분류의 최하위단계를 선택하여 주세요.");
										return false;
									}
								}
								break;
							case "userData": // 지역 선택
								this.params["boundaryInfo"] = $commonAnalysis.ui.setParamsForView("boundary");
								break;
							default:
								break;
						}
						break;	
					case 2:
						switch(this.params.dataInfo.type) {
							case "censusData": // 지역선택
								this.params["boundaryInfo"] = $commonAnalysis.ui.setParamsForView("boundary");
								break;
							case "userData": // 지역 상세
								switch(parseInt(this.params.boundaryInfo.selstep)) {
									case 2: //임의영역
										var checkParams = $commonAnalysis.ui.setParamsForView("polygon");
										if (checkParams == "invalidate") {
											return false;
										}
										this.params["regionInfo"] = checkParams;
										break;
									case 3:	//사용자경계
										var checkParams = $commonAnalysis.ui.setParamsForView("userPolygon");
										if (checkParams == "invalidate") {
											return false;
										}
										this.params["regionInfo"] = checkParams;
										break;
									default:
										this.params["regionInfo"] = $commonAnalysis.ui.setParamsForView("region");
										break;
								}
								break;
							default:
								break;
						}
						break;
					case 3: 
						switch(this.params.dataInfo.type) {
							case "censusData": // 지역 상세
								switch(parseInt(this.params.boundaryInfo.selstep)) {
									case 2: //임의영역
										var checkParams = $commonAnalysis.ui.setParamsForView("polygon");
										if (checkParams == "invalidate") {
											return false;
										}
										this.params["regionInfo"] = checkParams;
										break;
									case 3:	//사용자경계
										var checkParams = $commonAnalysis.ui.setParamsForView("userPolygon");
										if (checkParams == "invalidate") {
											return false;
										}
										this.params["regionInfo"] = checkParams;
										break;
									default:
										this.params["regionInfo"] = $commonAnalysis.ui.setParamsForView("region");
										break;
								}
								break;
							case "userData":
								this.params["bufferInfo"] = $commonAnalysis.ui.setParamsForView("bCondition");
								break;
							default:
								break;
						}
						break;	
					case 4:
						switch(this.params.dataInfo.type) {
							case "censusData": // 버퍼 조건
								this.params["bufferInfo"] = $commonAnalysis.ui.setParamsForView("bCondition");
								break;
							case "userData": // 버퍼 상세 조건
								switch(parseInt(this.params.bufferInfo.selstep)) {
									case 1:	//사업체조사
										this.params.bufferInfo["params"] = $commonAnalysis.ui.setParamsForView("bTheme");
										break;
									case 2:	//임의POI
										var checkParams = $commonAnalysis.ui.setParamsForView("bPoi");
										if (checkParams == "invalidate") {
											return false;
										}
										this.params.bufferInfo["params"] = checkParams;
										break;
									case 3:	//사용자데이터
										var checkBufferParams = $commonAnalysis.ui.setParamsForView("bUser");
										if (checkBufferParams == "invalidate") {
											return false;
										}
										this.params.bufferInfo["params"] = checkBufferParams;
										break;
									case 4:	//도로망
										var checkParams = $commonAnalysis.ui.setParamsForView("bRoad");
										if (checkParams == "invalidate") {
											return false;
										}
										this.params.bufferInfo["params"] = checkParams;
										break;
									default:
										break;
								}
								
								//poi 반경 조건을 설정
								$commonAnalysis.ui.setParamsBufferPoiCondition(this.params.bufferInfo);
								break;
							default:
								break;
						}
						break;
					case 5:
						switch(this.params.dataInfo.type) {
							case "censusData":
								switch (parseInt(this.params.bufferInfo.selstep)) {
									case 1:	//사업체 조사
										this.params.bufferInfo["params"] = $commonAnalysis.ui.setParamsForView("bTheme");
										break;
									case 2: //임의 POI
										var checkParams = $commonAnalysis.ui.setParamsForView("bPoi");
										if (checkParams == "invalidate") {
											return false;
										}
										this.params.bufferInfo["params"] = checkParams;
										break;
									case 3: //사용자데이터
										var checkBufferParams = $commonAnalysis.ui.setParamsForView("bUser");
										if (checkBufferParams == "invalidate") {
											return false;
										}
										this.params.bufferInfo["params"] = checkBufferParams;
										break;
									case 4: //도로망
										var checkParams = $commonAnalysis.ui.setParamsForView("bRoad");
										if (checkParams == "invalidate") {
											return false;
										}
										this.params.bufferInfo["params"] = checkParams;
										break;
									default:
										break;
								}
								
								var poiType = $("input[name=poiRadius]:checked").val();  //poi 반경 설정 선택 항목
								// poi 반경 설정 거리 값
								if (poiType != "S" && $("#poiRadiusPopul").val() < 500) {
									$message.open("알림", "500이상으로 값을 입력해주세요.");
									return false;
								};
								
								//poi 반경 조건을 설정
								$commonAnalysis.ui.setParamsBufferPoiCondition(this.params.bufferInfo);
								break;
							case "userData":
								/*var checkParams = $commonAnalysis.ui.setParamsForView("userPolygon");
								if (checkParams == "invalidate") {
									return false;
								}
								this.params["regionInfo"] = checkParams;*/
								break;
							default:
								break;
						}
						break;
					case 6:
						switch(this.params.dataInfo.type) {
						case "censusData":
							switch (parseInt(this.params.bufferInfo.selstep)) {
								case 1:	//사업체 조사
								case 3: //사용자데이터
									var checkParams = $commonAnalysis.ui.setParamsForView("bCompanyPoi");
									if (checkParams == "invalidate") {
										return false;
									}
									this.params.bufferInfo["params"] = checkParams;
									this.params.bufferInfo.selstep = "2";
									break;
								default:
									break;
							}
							break;
						case "userData":
							break;
						default:
							break;
					}
						break;
					default:
						break;
				}
				
				//데이터 조건설정이름 설정
				if (this.params.dataInfo != undefined) {
					this.params.dataInfo["names"] = $commonAnalysis.ui.selectedDataInfoNm;
				}
				
				//버퍼 조건설정이름 설정
				if (this.params.bufferInfo != undefined) {
					this.params.bufferInfo["names"] = $commonAnalysis.ui.selectedBufferInfoNm;
				}
				
				//지역 조건설정이름 설정
				if (this.params.regionInfo != undefined) {
					this.params.regionInfo["names"] = $commonAnalysis.ui.selectedRegionInfoNm;
				}

				$commonAnalysis.ui.params = this.params;
				console.log($commonAnalysis.ui.params);
				return true;
			},
			
			/**
			 * 
			 * @name         : doExecuteAnalysis
			 * @description  : 분석실행을 수행한다.
			 * @date         : 2018. 10. 04. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doExecuteAnalysis : function() {
				var title = $("#analysisTitle").val();
				if (title == undefined || title.length == 0) {
					$message.open("알림", "분석명을 입력해주세요.");
					return;
				}
				
				var params = $bufferAnalysis.util.getParams(this.params);
				var detailParams = $bufferAnalysis.util.getDetailParams(this.params);
				params["result_table_desc"] = $.trim(title);
				
				console.log(params);
				console.log(detailParams);
				
				
				var log_param = "Params - " + detailParams.param;
				$log.srvLogWrite("Z0", "04", "04", "02", "", log_param);
				
				//분석실행
				$auth.doLoginMng(function(){
					$commonAnalysisApi.request.doReqExecuteAnalysis(mngDomain +"/api/my/myData/analyzeBufferData.do", params, function(id) {
						if (id != undefined && id != null) {
							$commonAnalysisApi.request.doReqExecuteAnalysisDetailInfo(id, detailParams);
						}else {
							$message.open("알림", "알 수 없는 오류로 분석 수행을 하지 못하였습니다.");
						}
					});
				});
			}
	};
	
	$bufferAnalysis.util = {
			
			getParams : function(data) {
				var params = {};
				var condition = [];
				var scheme = $("#user_id").html();
				switch(data.dataInfo.type) {
					case "censusData": //센서스 데이터
						switch(parseInt(data.bufferInfo.selstep)) {
							case 1:	//사업체
								{
									var corpCondition = []
									for (var key in data.bufferInfo.params) {
										var tmpParams = {
												"key" : key,
												"value" : data.bufferInfo.params[key]
										};
										corpCondition.push(tmpParams);
									}
									params["corp_condition"] = JSON.stringify(corpCondition);
								}
								break;
							case 2:	//임의POI
								params["data_name"] = data.bufferInfo.params.data_nm;
								break;
							case 3:	//사용자데이터
								params["data_table_schema"] = data.bufferInfo.params.scheme;
								params["data_name"] = data.bufferInfo.params.data_name;
								break;
							case 4: //도로망
								if (data.bufferInfo.params.data_nm != undefined) {
									params["data_name"] = data.bufferInfo.params.data_nm;
								}
								break;
							default:
								break;
						}
						
						params["area_cd"] =  data.regionInfo.adm_cd;
						params["selstep"] =  data.bufferInfo.selstep;
						params["result_table_name"] = "lbdms_buffer_" + $commonFunc.makeRandomDigitString(13);
						params["batch_yn"] = "Y";
						params["buffer_type"] = data.bufferInfo.buffer_type;
						params["buffer_size"] = data.bufferInfo.buffer_size;
						
						//조건설정
						for (var key in data.dataInfo.params) {
							var tmpParams = {
									"key" : key,
									"value" : data.dataInfo.params[key]
							};
							condition.push(tmpParams);
						}
						params["condition"] = JSON.stringify(condition);
	
						break;
					case "userData": //사용자 데이터
						break;
					default:
						break;
				}
				
				return params;
			},
			
			getDetailParams : function(data) {
				var params = {
						analysis_type : "BUFFER",
						bord_type : data.bufferInfo.selstep
				};
				
				var dataParams = {};
				for (var p in data.dataInfo.params) {
					if (p != "targetSelect" && p != "depth1" && p != "depth2") {
						dataParams[p] = data.dataInfo.params[p];
					}
				}
				dataParams["adm_cd"] = data.regionInfo.adm_cd;
				dataParams["low_search"] = "1";
				
				var condition = {
						dataInfo : data.dataInfo.names.join(","),
						regionInfo : data.regionInfo.names.join(","),
						bufferInfo : data.bufferInfo.names.join(","),
						unit : $commonAnalysis.ui.unit,
						params : dataParams,
						api_id : $commonAnalysis.ui.api_id,
						filter : $commonAnalysis.ui.filter,
						bufferType : data.bufferInfo.buffer_type
				};
				params["param"] = JSON.stringify(condition);
				
				return params;
			}
			
		
	};
	
	//EVENT 내용작성
	$bufferAnalysis.event = {
			
			setUIEvent : function(){
				
			}
	};
	
}(window,document));