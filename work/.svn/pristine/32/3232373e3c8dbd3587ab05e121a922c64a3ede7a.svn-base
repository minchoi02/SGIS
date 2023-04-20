
(function(W,D){
	W.$boundaryAnalysis = W.$boundaryAnalysis || {};
	
	$(document).ready(function(){
		$boundaryAnalysis.event.setUIEvent();
	});
	
	//UI 내용작성
	$boundaryAnalysis.ui = {
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
						this.showDataSelectMainView(type);
						break;
					case 1:
						//사용자가 센서스 데이터를 선택했는지
						//아니면 나의데이터를 선택했는지에 따라 다음화면이 달라짐
						//센서스 데이터 - 센서스 조건설정 화면으로 이동
						//나의 데이터 - 경계설정 화면으로 이동
						switch($commonAnalysis.ui.params.dataInfo.type) {
							case "censusData":
								this.showCensusDetailView();
								break;
							case "userData":
								this.showBoundaryView();
								break;
							default:
								break;
						}
						break;
					case 2:
						//사용자가 센서스 데이터를 선택했는지
						//아니면 나의데이터를 선택했는지에 따라 다음화면이 달라짐
						//센서스 데이터(행정동경계) - 지역선택화면으로 이동
						//센서스 데이터(임의경계) - 임의경계화면으로 이동
						//센서스 데이터(그리드) - 그리드경계화면으로 이동
						//센서스 데이터(헥사곤) - 헥사곤경계화면으로 이동
						//나의 데이터 - 요약화면으로 이동
						switch($commonAnalysis.ui.params.dataInfo.type) {
							case "censusData":
								this.showBoundaryView();
								break;
							case "userData":
								switch(parseInt($commonAnalysis.ui.params.boundaryInfo.selstep)) {
									case 1:	//행정경계
										this.showRegionView();
										break;
									case 2: //그리드
										this.showRegionView("grid");
										break;
									case 3:	//헥사곤
										this.showRegionView("hexagon");
										break;
									case 4:	//임의경계
										this.showPolygonView();
										break;
									case 5:	//사용자경계
										this.showUserPolygonView();
										break
									default:
										break;
								}
								break;
							default:
								break;
						}
						break;
					case 3:
						//사용자가 센서스 데이터를 선택했는지
						//아니면 나의데이터를 선택했는지에 따라 다음화면이 달라짐
						//센서스 데이터(행정동경계) - 지역선택화면으로 이동
						//센서스 데이터(임의경계) - 임의경계화면으로 이동
						//센서스 데이터(그리드) - 그리드경계화면으로 이동
						//센서스 데이터(헥사곤) - 헥사곤경계화면으로 이동
						//나의 데이터 - 요약화면으로 이동
						switch($commonAnalysis.ui.params.dataInfo.type) {
							case "censusData":
								switch(parseInt($commonAnalysis.ui.params.boundaryInfo.selstep)) {	
									case 1:	//행정경계
										this.showRegionView();
										break;
									case 2: //그리드
										this.showRegionView("grid");
										break;
									case 3:	//헥사곤
										this.showRegionView("hexagon");
										break;
									case 4:	//임의경계
										this.showPolygonView();
										break;
									case 5:	//사용자경계
										this.showUserPolygonView();
										break
									default:
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
					case 4:
						//센서스데이터 일 경우에만 해당
						this.showSummaryView();
						break;
					default:
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
			showDataSelectMainView : function(type) {
				$(".pageView").hide();
				$(".prevPageBtn").hide();
				$(".nextPageBtn").show();
				$(".excuteBtn").hide();
				$("#censusMainPage").show();

				//센서스 데이터 선택영역 표출
				$("#analysisDesc").html( $commonAnalysis.util.getAnalysisDescription(type));
				
				//데이터 타입을 체크하여 화면을 초기화한다.
				$("#analysisData").hide();
				$("#shareData").attr("id", "sharePoiData");
				$(".dataTypeBtn").each(function() {
					if ($(this).hasClass("on")) {
						var id = $(this).attr("id");
						if (id == "censusData") {
							$("#censusArea").show();
							$("#userArea").hide();
							$commonAnalysis.event.doChangeArea("census");
						}else {
							$("#censusArea").hide();
							$("#userArea").show();
						}
					}
				});
				
				//단계설정
				$commonAnalysis.ui.setNavStep(0);
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
				$("#censusDetailPage").show();
				$(".censusDetailArea").hide();
				$("#" + $commonAnalysis.ui.params.dataType + "Area").show();
				
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
				if ($boundaryAnalysis.ui.params.dataInfo.type!="userData") {
					$("#boundaryPage > ul.analysisTypeList > li").hide();
					$("#boundaryPage > ul.analysisTypeList > li:nth-child(1)").show();
				}
				
				//단계설정
				$commonAnalysis.ui.setNavStep(1);
			},
			
			/**
			 * 
			 * @name         : showRegionView
			 * @description  : 경계분석 지역선택 화면
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showRegionView : function(type) {
				$(".pageView").hide();
				$(".prevPageBtn").show();
				$(".nextPageBtn").show();
				$(".excuteBtn").hide();
				$("#regionPage").show();
				
				//경계타입
				switch(type) {
					case "grid":	//그리드경계
						$("#gridArea").show();
						$("#hexagonArea").hide();
						break;
					case "hexagon": //헥사곤경계
						$("#gridArea").hide();
						$("#hexagonArea").show();
						break;
					default:
						$("#gridArea").hide();
						$("#hexagonArea").hide();
						break;
				}

				//단계설정
				$commonAnalysis.ui.setNavStep(1);
				
				//시도정보 조회
				$commonAnalysis.ui.regionPageMode = "range";
				$commonAnalysisApi.request.doReqSidoList(bndYear); 
			},
			
			/**
			 * 
			 * @name         : showPolygonView
			 * @description  : 임의영역 선택 화면
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showPolygonView : function() {
				$(".pageView").hide();
				$(".prevPageBtn").show();
				$(".nextPageBtn").show();
				$(".excuteBtn").hide();
				$("#polygonPage").show();
				
				//지도 초기화
				$commonAnalysis.ui.isSavedPolygonData = false;
				$commonAnalysisMap.ui.userLayerInfo = [];
				if ($commonAnalysisMap.ui.mapList.length > 0) {
					var map = $commonAnalysisMap.ui.mapList[0];
					map.gMap.remove();
				} 
				
				//지도 생성
				$commonAnalysisMap.ui.type = "polygon";
				$commonAnalysisMap.ui.createMap("mapRgn_1", 0, {
					intrPoiControl : false,
					intrSettingControl : false,
					mapTypeControl : false,
					intrZoomControl : true,
					searchControl : true
				});
			},
			
			/**
			 * 
			 * @name         : showUserPolygonView
			 * @description  : 사용자 경계조회 화면
			 * @date         : 2018. 10. 04. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showUserPolygonView : function() {
				$(".pageView").hide();
				$(".prevPageBtn").show();
				$(".nextPageBtn").show();
				$(".excuteBtn").hide();
				$("#userPolygonPage").show();
				
				//나의 경계데이터 조회
				$("#myPolygonData").trigger("click");
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
				$("#summaryPage").show();
				
				//단계설정
				$commonAnalysis.ui.setNavStep(2);
				
				//요약분석명 설정
				$("#summaryNm").html($commonAnalysis.util.getAnalysisNm("boundary"));
				
				//데이터 조건 설정
				var html = "";
				var dataNames = this.params.dataInfo.names;
				for (var i=0; i<dataNames.length; i++) {
					html += "<div class='inp02'><a>"+dataNames[i]+"</a></div>";
				}
				$("#dataTextArea").html(html);
				
				//지역조건 설정
				var html = "";
				var regionNames = this.params.regionInfo.names;
				for (var i=0; i<regionNames.length; i++) {
					html += "<div class='inp02'><a>"+regionNames[i]+"</a></div>";
				}
				$("#regionTextArea").html(html);
				
				
				var dataInfo_type = $commonAnalysis.ui.params.dataInfo.type;
				var data = {};
				data.data_nm = $commonAnalysis.ui.params.dataInfo.params.data_name;
				$("#summaryField").empty();
				
				if (dataInfo_type == "userData") {
					$.ajax({
						type : "POST",
						url : contextPath + "/api/myData/getColumn.do",
						sync : true,
						data : data,
						success: function(res) {
							switch(parseInt(res.errCd)) {
								case 0:
									var optHtml = "";
									var cols = res.result;
									for (var coli = 0;coli < cols.length;coli++) {
										var optHtml = "<option value='" + cols[coli].column_name + "'>" + cols[coli].column_name + "</option>";
										$("#summaryField").append(optHtml);
									}
									
									break;
								default:
									$message.open("알림", res.errMsg);
								break;
							}
				        },
				        complete: function() {
				        },
				        error: function() {
				        	$messageNew.open("알림", res.errMsg);
				        }
					});
					$("#summaryInfoText").show();					
				}
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
								break;
							case "userData":
								this.params["boundaryInfo"] = $commonAnalysis.ui.setParamsForView("boundary");
								break;
							default:
								break;
						}
						break;
					case 2:
						switch(this.params.dataInfo.type) {
							case "censusData":
								this.params["boundaryInfo"] = $commonAnalysis.ui.setParamsForView("boundary");
								break;
							case "userData":
								switch(parseInt(this.params.boundaryInfo.selstep)) {
									case 4: //임의영역
										var checkParams = $commonAnalysis.ui.setParamsForView("polygon");
										if (checkParams == "invalidate") {
											return false;
										}
										this.params["regionInfo"] = checkParams;
										break;
									case 5:	//사용자경계
										var checkParams = $commonAnalysis.ui.setParamsForView("userPolygon");
										if (checkParams == "invalidate") {
											return false;
										}
										this.params["regionInfo"] = checkParams;
										break;
									default:
										this.params["regionInfo"] = $commonAnalysis.ui.setParamsForView("region");
										if (this.params["regionInfo"] == "invalidate")	return false;
										break;
								}
								break;
							default:
								break;
						}
						break;
					case 3:
						switch(this.params.dataInfo.type) {
							case "censusData":
								switch(parseInt(this.params.boundaryInfo.selstep)) {
									case 4: //임의영역
										var checkParams = $commonAnalysis.ui.setParamsForView("polygon");
										if (checkParams == "invalidate") {
											return false;
										}
										this.params["regionInfo"] = checkParams;
										break;
									case 5:	//사용자경계
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
								switch(parseInt(this.params.boundaryInfo.selstep)) {
								case 4: //임의영역
									var checkParams = $commonAnalysis.ui.setParamsForView("polygon");
									if (checkParams == "invalidate") {
										return false;
									}
									this.params["regionInfo"] = checkParams;
									break;
								case 5:	//사용자경계
									var checkParams = $commonAnalysis.ui.setParamsForView("userPolygon");
									if (checkParams == "invalidate") {
										return false;
									}
									this.params["regionInfo"] = checkParams;
									break;
								default:
									this.params["regionInfo"] = $commonAnalysis.ui.setParamsForView("region");
									if (this.params["regionInfo"] == "invalidate")	return false;
									break;
								}
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
				console.log(this.params);
				var title = $("#analysisTitle").val();
				if (title == undefined || title.length == 0) {
					$message.open("알림", "분석명을 입력해주세요.");
					return;
				}
				
				var params = $boundaryAnalysis.util.getParams(this.params);
				var detailParams = $boundaryAnalysis.util.getDetailParams(this.params);
				params["result_table_desc"] = $.trim(title);
				
				console.log(params);
				console.log(detailParams);
				
				
				var log_param = "Params - " + detailParams.param;
				$log.srvLogWrite("Z0", "04", "02", "02", "", log_param);
				
				//분석실행
				$auth.doLoginMng(function(){
					$commonAnalysisApi.request.doReqExecuteAnalysis(mngDomain +"/api/my/myData/analyzeAreaData.do", params, function(id) {
						if (id != undefined && id != null) {
							$commonAnalysisApi.request.doReqExecuteAnalysisDetailInfo(id, detailParams);
						}else {
							$message.open("알림", "알 수 없는 오류로 분석 수행을 하지 못하였습니다.");
						}
					});
				});				
			}
	};
	
	$boundaryAnalysis.util = {
			
			getParams : function(data) {
				var params = {};
				var condition = [];
				var scheme = $("#user_id").html();
				switch(data.dataInfo.type) {
					case "censusData": //센서스 데이터
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
						params["data_table_schema"] = data.dataInfo.params.scheme;
						params["data_name"] = data.dataInfo.params.data_name;
						if($("#summaryInfoCheck").is(":checked")){
							params["summaryField"] = $("#summaryField").val();
							params["summaryOper"] = $("#summaryOper").val();
						}else{
							params["summaryField"] = "";
							params["summaryOper"] = "";
						}
						break;
					default:
						break;
				}
				
				switch(parseInt(data.boundaryInfo.selstep)) {
					case 1:	//행정경계
						params["admType"] = data.regionInfo.admType;
						for (var key in data.regionInfo) {
							if (key != "names" ) {
								params[ key] = data.regionInfo[key];
							}
						}
						break;
					case 2:	//헥사곤경계
					case 3: //그리드 경계
						params["admType"] = data.regionInfo.admType;
						for (var key in data.regionInfo) {
							if (key != "names" &&
								key != "action_type" &&
								key != "geometry_type" &&
								key != "pos_column_desc" &&
								key != "polygon_type" &&
								key != "geom" &&
								key != "resource_id" &&
								key != "description" &&
								key != "data_nm") {
								params[ key] = data.regionInfo[key];
							}
						}
						break;
					case 4:	//임의경계
						params["area_name"] = data.regionInfo.data_nm;
						params["area_table_schema"] = scheme;
						
						for (var key in data.regionInfo) {
							if (key != "names" &&
								key != "action_type" &&
								key != "geometry_type" &&
								key != "pos_column_desc" &&
								key != "polygon_type" &&
								key != "geom" &&
								key != "resource_id" &&
								key != "description" &&
								key != "data_nm") {
								params[ key] = data.regionInfo[key];
							}
						}
						break;
					case 5:	//나의데이터
						params["area_name"] = data.regionInfo.data_nm;
						params["area_table_schema"] = data.regionInfo.scheme;
						break;
					default:
						break;
				}
				
				params["selstep"] =  data.boundaryInfo.selstep;
				params["result_table_name"] = "lbdms_adm_" + $commonFunc.makeRandomDigitString(13);
				params["batch_yn"] = "Y";
				
				return params;
			},
			
			getDetailParams : function(data) {
				var params = {
						analysis_type : "BOUNDARY",
						bord_type : data.boundaryInfo.selstep
				};
				var condition = {
						dataInfo : data.dataInfo.names.join(","),
						regionInfo : data.regionInfo.names.join(","),
						unit : $commonAnalysis.ui.unit
				};
				params["param"] = JSON.stringify(condition);
				
				return params;
			}
		
	};
	
	//EVENT 내용작성
	$boundaryAnalysis.event = {
			
			setUIEvent : function(){
				
				//가구 조건 하위 체크시 상위도 자동 체크 190225
				$("input[name=household_type]").click(function(){
					if($("#householdTypeCheck").is(":checked")){
					}else{
						$('#householdTypeCheck-styler').trigger('click');
					}
				});
				
				//주택 조건 하위 체크시 상위도 자동 체크 190225
				$("input[name=house_type]").click(function(){
					if($("#houseTypeCheck").is(":checked")){
					}else{
						$('#houseTypeCheck-styler').trigger('click');
					}
				});
				
				//교육정도별 체크시 상위도 자동 체크 190225
				$("input[name=population_edu]").click(function(){
					if($("#populationEduCheck").is(":checked")){
					}else{
						$('#populationEduCheck-styler').trigger('click');
					}
				});
				
				//혼인정도별 체크시 상위도 자동 체크 190225
				$("input[name=population_marry]").click(function(){
					if($("#populationMarryCheck").is(":checked")){
					}else{
						$('#populationMarryCheck-styler').trigger('click');
					}
				});
				
				//점유형태별 체크시 상위도 자동 체크 190225
				$("input[name=ocptn_type]").click(function(){
					if($("#householdOcptnCheck").is(":checked")){
					}else{
						$('#householdOcptnCheck-styler').trigger('click');
					}
				});
				
				//집계조건 선택시
				$("#summaryInfoCheck").click(function(){
					if($("#summaryInfoCheck").is(":checked")){
						$("#summaryField").removeAttr("disabled"); 
						$("#summaryOper").removeAttr("disabled");
					}else{
						$("#summaryField").attr("disabled", "true"); 
						$("#summaryOper").attr("disabled", "true");
					}
				});
			}
	};
	
}(window,document));