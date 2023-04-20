
(function(W,D){
	W.$commonAnalysis = W.$commonAnalysis || {};
	
	$(document).ready(function(){
		$commonAnalysis.event.setUIEvent();
		
		$(document).on("change", "#company_year", function(){
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
		});
	});
	
	//UI 내용작성
	$commonAnalysis.ui = {
			type : null,
			idx : 0,
			params : {},
			companyTree : null,
			curSelectedCompanyNode : null,
			selectedUserDataId : null,
			srtIdx : 0,
			currentPage : 1,
			maxCntPerPage : 5,
			selectedDataTypeNm : null,
			selectedBufferTypeNm : null, // 버퍼 분석 - 버퍼 조건 상세 선택 구분
			selectedBoundaryTypeNm : null, 
			selectedDataInfoNm : [],
			selectedBufferInfoNm : [], // 버퍼 조건 이름
			selectedRegionInfoNm : [],
			selectedPolygonInfo : null,
			unit : "",
			isSavedPolygonData : false,
			isSavedPoiData : false,
			isSavedRoadData : false,
			regionPageMode : "range",
			
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
				//네비게이터
				var analysisNm = $commonAnalysis.util.getAnalysisNm(type);
				$("#analysisNm").html(analysisNm);
				
				//분석 및 화면 인덱스 설정
				this.type = type;
				this.idx = idx;
				
				switch(type) {
					case "boundary": //경계분석
						$boundaryAnalysis.ui.doChangeView(type, idx);
						break;
					case "voronoi": //보로노이 다이어그램 분석
						$voronoiAnalysis.ui.doChangeView(type, idx);
						break;
					case "buffer": //버퍼분석
						$bufferAnalysis.ui.doChangeView(type, idx);
						break;
					case "location": //입지계수분석
						$locationAnalysis.ui.doChangeView(type, idx);
						break;
					case "spatial":  //공간자기상관분석
						$spatialAnalysis.ui.doChangeView(type, idx);
						break;
					case "operation": //데이터간 연산분석
						$operationAnalysis.ui.doChangeView(type, idx);
						break;
					default:
						break;
				}
			},
			
			/**
			 * 
			 * @name         : doPrevPageView
			 * @description  : 이전화면으로 이동한다.
			 * @date         : 2018. 08. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doPrevPageView : function() {
				this.doChangeView(this.type, this.idx - 1);
			},
			
			/**
			 * 
			 * @name         : doNextPageView
			 * @description  : 다음화면으로 이동한다.
			 * @date         : 2018. 08. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doNextPageView : function() {
				
				if (this.doCheckValidation(this.type)) {
					
					this.doChangeView(this.type, this.idx + 1);
				}
			},
			
			/**
			 * 
			 * @name         : doExecuteAnalysis
			 * @description  : 분석을 실행한다.
			 * @date         : 2018. 10. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doExecuteAnalysis : function() {
				switch(this.type) {
					case "boundary": //경계분석
						$boundaryAnalysis.ui.doExecuteAnalysis();
						break;
					case "voronoi": //보로노이 다이어그램 분석
						$voronoiAnalysis.ui.doExecuteAnalysis();
						break;
					case "buffer": //버퍼분석
						$bufferAnalysis.ui.doExecuteAnalysis();
						break;
					case "location": //입지계수
						$locationAnalysis.ui.doExecuteAnalysis();						
						break;
					case "spatial": //공간자기상관분석
						$spatialAnalysis.ui.doExecuteAnalysis();
						break;
					case "operation": //데이터간 연산분석
						$operationAnalysis.ui.doExecuteAnalysis();
						break;
					default:
						break;
				}
			},
			
			/**
			 * 
			 * @name         : doCheckValidation
			 * @description  : 다음화면으로 이동할 때, 파라미터를 체크 및 설정한다.
			 * @date         : 2018. 08. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type : 분석타입
			 */
			doCheckValidation : function(type) {
				switch(type) {
					case "boundary": //경계분석
						return $boundaryAnalysis.ui.doCheckValidation(this.idx);
						break;
					case "voronoi":	//보로노이 다이어그램 분석
						return $voronoiAnalysis.ui.doCheckValidation(this.idx);
						break;
					case "buffer": //버퍼분석
						return $bufferAnalysis.ui.doCheckValidation(this.idx);
						break;
					case "location": //입지계수
						return $locationAnalysis.ui.doCheckValidation(this.idx);
						break;
					case "spatial": //공간자기상관분석
						return $spatialAnalysis.ui.doCheckValidation(this.idx);
						break;
					case "operation": //데이터간연산분석
						return $operationAnalysis.ui.doCheckValidation(this.idx);
						break;
					default:
						break;
				}
			},
			
			/**
			 * 
			 * @name         : setParamsForView
			 * @description  : 화면별 파라미터를 설정한다.
			 * @date         : 2018. 09. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type : 화면타입
			 */
			setParamsForView : function(type) {
				var params = null;
				switch(type) {
					case "dataMain": //데이터메인
						params =  this.setParamsDataMain();
						break;
					case "population": //인구조건
						params =  this.setParamsPopulation();
						break;
					case "household": //가구조건
						params =  this.setParamsHousehold();
						break;
					case "house": //주택조건
						params =  this.setParamsHouse();
						break;
					case "aggregation": //농가조건
						params =  this.setParamsAggregation();
						break;
					case "forestry": //임가조건
						params =  this.setParamsForestry();
						break;
					case "fishery": //어가조건
						params =  this.setParamsFishery();
						break;
					case "company": //사업체(전산업)
						params = this.setParamsCompany();
						break;
					case "theme":	//사업체(테마)
						params = this.setParamsTheme();
						break;
					case "boundary": //경계타입선택
						params = this.setParamsBoundary();
						break;
					case "region": //지역선택
						params = this.setParamsRegion();
						break;
					case "polygon": //임의영역 경계
						params = this.setParamsPolygon();
						break;
					case "userPolygon": //사용자경계
						params = this.setParamsUserPolygon();
						break;
					case "calculate": //연산조건
						params = this.setParamsCalculate();
						break;
					case "bCondition": //버퍼조건
						params = this.setParamsBuffer();
						break;
					case "bTheme": //버퍼 상세조건 (사업체)
						params = this.setParamsBufferTheme();
						break;
					case "bUser": //버퍼 상세조건 (사용자 데이터)
						params = this.setParamsBufferDetailUser();
						break;
					case "bPoi":	//버퍼조건 임의 POI
						params = this.setParamsPoi();
						break;
					case "bRoad": //버퍼조건 도로망
						params = this.setParamsRoad();
						break;
					case "bCompanyPoi": //버퍼조건 사업체 POI
						params = this.setParamsCompanyPoi();
						break;
					case "kValue": //공간자기상관분석-근접이웃수
						params = this.setParamsSpatialCondition();
						break;
					default:
						break;
				}
				return params;
			},
			
			/**
			 * 
			 * @name         : setParamsDataMain
			 * @description  : 화면별(데이터 메인) 파라미터를 설정한다.
			 * @date         : 2018. 09. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setParamsDataMain : function() {
				var params = {};
				var type;
				$(".dataTypeBtn").each(function() {
					if ($(this).hasClass("on")) {
						type = $(this).attr("id");
					}
				});
				
				//분석타입 파라미터 설정
				params["analysisType"] = this.type;
				params["dataInfo"] = {"type" : type};
				
				switch(type) {
					//센서스 데이터를 선택
					case "censusData":
						var censusDataType, name;
						$(".censusBtn").each(function() {
							if ($(this).hasClass("on")) {
								censusDataType = $(this).attr("id");
								name = $(this).html();
							}
						});
						this.selectedDataTypeNm = name + "조건";
						
						//파라미터 설정
						params["dataType"] =  censusDataType;
						break;
					//나의데이터를 선택
					case "userData":
						if ($commonAnalysis.ui.selectedUserDataId == null) {
							$message.open("알림", "나의데이터 항목을 선택하세요.");
							return "invalidate";
						}
						
						var userDataType;
						$(".userDataType").each(function() {
							if ($(this).hasClass("on")) {
								userDataType = $(this).attr("id");
							}
						});
						
						var dataNm, columnDesc, scheme;
						var names = [];
						for (var i=0; i<this.userDataList.length; i++) {
							if (this.userDataList[i].resource_id == $commonAnalysis.ui.selectedUserDataId) {
								dataNm = this.userDataList[i].data_name;
								columnDesc = this.userDataList[i].pos_column_desc;
								scheme = this.userDataList[i].user_id;
								names.push(this.userDataList[i].description);
								
							}
						}
						
						//조건이름 설정
						//this.selectedDataTypeNm = "사용자데이터 조건";
						//names.unshift(this.selectedDataTypeNm);
						this.selectedDataInfoNm = names;
						
						//파라미터 설정
						params["dataType"] = userDataType;
						params["category"] = $commonAnalysis.ui.selectedCategory;
						params.dataInfo["params"] = {};
						params.dataInfo.params["resource_id"] = $commonAnalysis.ui.selectedUserDataId;
						params.dataInfo.params["data_name"] = dataNm;
						params.dataInfo.params["pos_column_desc"] = columnDesc;
						params.dataInfo.params["scheme"] = scheme;
		
						break;
					default:
						break;
				}
				return params;
			},
			
			/**
			 * 
			 * @name         : setParamsPopulation
			 * @description  : 화면별(인구조건) 파라미터를 설정한다.
			 * @date         : 2018. 09. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setParamsPopulation : function() {
				var params = {};
				var names = [];
				var year = $("#population_year option:selected").val();	//년도
				var gender = $("input[name=population_gender]:checked").val(); //성별
				var genderNm = $("input[name=population_gender]:checked").parent().next().html();
				
				//조건이름
				names.push(year + "년도");
				names.push(genderNm + "인구");
				
				//연령선택
				if ($("#populationAgeCheck").hasClass("on")) {
					var ageFrom = $("#populationAgeFrom option:selected").val(); //연령시작
					var ageTo = $("#populationAgeTo option:selected").val();	//연령 끝
					var ageNm = ageFrom + "세~" + ageTo + "세";
					
					if (parseInt(ageFrom) >= 100) {
						ageFrom = "100";
						ageNm = ageFrom + "세 이상";
					}
					if (parseInt(ageTo) >= 101) {
						ageTo = "150";
						ageNm = ageFrom + "세 이상";
					}
					params["age_to"] = ageTo;
					params["age_from"] = ageFrom;
					names.push(ageNm);
				}
				
				//교육정도별 선택
				if ($("#populationEduCheck").hasClass("on")) {
					var eduTypeList = [];
					var eduTypeNmList = [];
					$("input[name=population_edu]:checked").each(function() {
						eduTypeList.push($(this).val());
						eduTypeNmList.push($(this).parent().next().html());
					});
					
					if (eduTypeList.length > 0) {
						params["edu_level"] = eduTypeList.join(",");
						names.push(eduTypeNmList.join("|"));
					}					
				}
				
				//혼인정도별 선택
				if ($("#populationMarryCheck").hasClass("on")) {
					var marryTypeList = [];
					var marryTypeNmList = [];
					$("input[name=population_marry]:checked").each(function() {
						marryTypeList.push($(this).val());
						marryTypeNmList.push($(this).parent().next().html());
					});
					
					if (marryTypeList.length > 0) {
						params["mrg_state"] = marryTypeList.join(",");
						names.push(marryTypeNmList.join("|"));
					}					
				}
				
				
				params["year"] = year;
				params["gender"] = gender;
				params["area_type"] = "0";
				params["depth1"] = "POPULATION_HOUSE";
				params["depth2"] = "POPULATION";
				
				//조건이름 설정
				names.unshift(this.selectedDataTypeNm);
				this.selectedDataInfoNm = names;
				
				//API 상세정보
				this.api_id = "API_0302";
				this.filter = "population";
				this.unit = "명";
				
				return params;
			},
			
			/**
			 * 
			 * @name         : setParamsHousehold
			 * @description  : 화면별(가구조건) 파라미터를 설정한다.
			 * @date         : 2018. 09. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setParamsHousehold : function() {
				var params = {};
				var names = [];
				var year = $("#household_year option:selected").val();	//년도
				
				//조건이름
				names.push(year + "년도");
				
				//세대구성
				if ($("#householdTypeCheck").hasClass("on")) {
					var householdTypeList = [];
					var householdTypeNmList = [];
					$("input[name=household_type]:checked").each(function() {
						householdTypeList.push($(this).val());
						householdTypeNmList.push($(this).parent().next().html());
					});
					
					if (householdTypeList.length > 0) {
						params["household_type"] = householdTypeList.join(",");
						names.push(householdTypeNmList.join("|"));
					}					
				}
				
				//점유형태
				if ($("#householdOcptnTab").is(":visible")) {
					if ($("#householdOcptnCheck").hasClass("on")) {
						var ocptnTypeList = [];
						var ocptnTypeNmList = [];
						$("input[name=ocptn_type]:checked").each(function() {
							ocptnTypeList.push($(this).val());
							ocptnTypeNmList.push($(this).parent().next().html());
						});
						
						if (ocptnTypeList.length > 0) {
							params["ocptn_type"] = ocptnTypeList.join(",");
							names.push(ocptnTypeNmList.join("|"));
						}
					}
				}
				params["year"] = year;
				params["area_type"] = "0";
				params["depth1"] = "POPULATION_HOUSE";
				params["depth2"] = "HOUSE1";
				
				//조건이름 설정
				names.unshift(this.selectedDataTypeNm);
				this.selectedDataInfoNm = names;
				
				//API 상세정보
				this.api_id = "API_0305";
				this.filter = "household_cnt";
				this.unit = "가구";
				
				return params;
			},
			
			/**
			 * 
			 * @name         : setParamsHouse
			 * @description  : 화면별(주택조건) 파라미터를 설정한다.
			 * @date         : 2018. 09. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setParamsHouse : function() {
				var params = {};
				var names = [];
				var year = $("#house_year option:selected").val();	//년도
				
				//조건이름
				names.push(year + "년도");
				
				//주택유형
				if ($("#houseTypeCheck").hasClass("on")) {
					var houseTypeList = [];
					var houseTypeNmList = [];
					$("input[name=house_type]:checked").each(function() {
						houseTypeList.push($(this).val());
						houseTypeNmList.push($(this).parent().next().html());
					});
					
					if (houseTypeList.length > 0) {
						params["house_type"] = houseTypeList.join(",");
						names.push(houseTypeNmList.join("|"));
					}
					
				}
				
				//노후년수
				if ($("#houseUsePeriodTab").is(":visible")) {
					if ($("#houseUsePeriodCheck").hasClass("on")) {
						var houseUsePeriod = $("#houseUsePeriod option:selected").val();
						var houseUsePeriodNm = $("#houseUsePeriod option:selected").html();
						params["house_use_prid_cd"] = houseUsePeriod;
						names.push(houseUsePeriodNm);
					}
				}
				
				//건축년도
				if ($("#houseConstYearTab").is(":visible")) {
					if ($("#houseConstYearCheck").hasClass("on")) {
						var houseConstYear = $("#houseConstYear option:selected").val();
						var houseConstYearNm = $("#houseConstYear option:selected").html();
						params["const_year"] = houseConstYear;
						names.push(houseConstYearNm);
					}
				}
				
				//연면적
				if ($("#houseBdspaceCheck").hasClass("on")) {
					var houseBdspaceFrom = $("#houseBdspaceFrom option:selected").val();	//연면적 시작
					var houseBdspaceTo = $("#houseBdspaceTo option:selected").val();	//연면적 끝
					var houseBdspaceNm = houseBdspaceFrom + "㎡~" + houseBdspaceTo + "㎡";
					
					if (parseInt(houseBdspaceFrom) >= 230) {
						houseBdspaceFrom = 230;
						houseBdspaceNm = "230㎡ 이상"; 
					}
					
					if (parseInt(houseBdspaceTo) >= 300) {
						houseBdspaceTo = 9999;
						houseBdspaceNm = "230㎡ 이상"; 
					}
					
					var dataSet = {
							 0 : "01",
							20 : "02",
							40 : "03",
							60 : "04",
							85 : "05",
						   100 : "06",
						   130 : "07",
						   165 : "08",
						   230 : "09",
						  9999 : "10"
					};
					
					var fromData = parseInt(dataSet[houseBdspaceFrom]);
					var toData = parseInt(dataSet[houseBdspaceTo]);
					
					var houseAreaCdList = [];
					for (var i=0; i<toData-fromData; i++) {
						var code = "0"+(fromData+i);
						houseAreaCdList.push(code);
					}
					params["house_area_cd"] = houseAreaCdList.join(",");
					names.push(houseBdspaceNm);
				}
				params["year"] = year;
				params["area_type"] = "0";
				params["depth1"] = "POPULATION_HOUSE";
				params["depth2"] = "HOUSE2";
				
				//조건이름 설정
				names.unshift(this.selectedDataTypeNm);
				this.selectedDataInfoNm = names;
				
				//API 상세정보
				this.api_id = "API_0306";
				this.filter = "house_cnt";
				this.unit = "주택";
				
				return params;
			},
			
			/**
			 * 
			 * @name         : setParamsAggregation
			 * @description  : 화면별(농가조건) 파라미터를 설정한다.
			 * @date         : 2018. 09. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setParamsAggregation : function() {
				var params = {};
				var names = [];
				var filter = "farm_cnt";
				var unit = "가구";
				var api_id = "API_0307";
				var year = $("#aggregation_year option:selected").val();	//년도
				
				//조건이름
				names.push(year + "년도");
				
				//가구원 성별
				if ($("#aggregationGenderCheck").hasClass("on")) {
					var gender = $("input[name=aggregation_gender]:checked").val();
					var genderNm =  $("input[name=aggregation_gender]:checked").parent().next().html();
					params["gender"] = gender;
					names.push(genderNm + "인구");
					filter = "population";
					unit = "명";
					api_id = "API_0310";
				}
				
				//연령선택
				if ($("#aggregationAgeCheck").hasClass("on")) {
					var ageFrom = $("#aggregationAgeFrom option:selected").val(); //연령시작
					var ageTo = $("#aggregationAgeTo option:selected").val();	//연령 끝
					var ageNm = ageFrom + "세~" + ageTo + "세";
					
					if (parseInt(ageFrom) >= 100) {
						ageFrom = "100";
						ageNm = "100세 이상";
					}
					
					if (parseInt(ageTo) >= 101) {
						ageTo = "150";
						ageNm = "100세 이상";
					}
					
					params["gender"] = "0";
					params["age_to"] = ageTo;
					params["age_from"] = ageFrom;
					names.push(ageNm);
					filter = "population";
					unit = "명";
					api_id = "API_0310";
				}	
				params["year"] = year;
				params["area_type"] = "0";
				params["depth1"] = "AGRICULTRUE_FISHERY";
				params["depth2"] = "NONGGA";
				
				//조건이름 설정
				names.unshift(this.selectedDataTypeNm);
				this.selectedDataInfoNm = names;
				
				//api상세정보
				this.api_id = api_id;
				this.filter = filter;
				this.unit = unit;
				
				return params;
			},
			
			/**
			 * 
			 * @name         : setParamsForestry
			 * @description  : 화면별(임가조건) 파라미터를 설정한다.
			 * @date         : 2018. 09. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setParamsForestry : function() {
				var params = {};
				var names = [];
				var filter = "forestry_cnt";
				var unit = "가구";
				var api_id = "API_0308";
				var year = $("#forestry_year option:selected").val();	//년도
				
				//조건이름
				names.push(year + "년도");
				
				//가구원 성별
				if ($("#forestryGenderCheck").hasClass("on")) {
					var gender = $("input[name=forestry_gender]:checked").val();
					var genderNm = $("input[name=forestry_gender]:checked").parent().next().html();
					params["gender"] = gender;
					names.push(genderNm + "인구");
					unit = "명";
					api_id = "API_0310";
				}
				
				//연령선택
				if ($("#forestryAgeCheck").hasClass("on")) {
					var ageFrom = $("#forestryAgeFrom option:selected").val(); //연령시작
					var ageTo = $("#forestryAgeTo option:selected").val();	//연령 끝
					var ageNm = ageFrom + "세~" + ageTo + "세";
					
					if (parseInt(ageFrom) >= 100) {
						ageFrom = "100";
						ageNm = "100세 이상";
					}
					
					if (parseInt(ageTo) >= 101) {
						ageTo = "150";
						ageNm = "100세 이상";
					}
					
					params["gender"] = "0";
					params["age_to"] = ageTo;
					params["age_from"] = ageFrom;
					names.push(ageNm);
					unit = "명";
					api_id = "API_0310";
				}	
				params["year"] = year;
				params["area_type"] = "0";
				params["depth1"] = "AGRICULTRUE_FISHERY";
				params["depth2"] = "IMGA";
				
				//조건이름 설정
				names.unshift(this.selectedDataTypeNm);
				this.selectedDataInfoNm = names;
				
				//API 설정정보
				this.api_id = api_id;
				this.filter = filter;
				this.unit = unit;
				
				return params;
			},
			
			/**
			 * 
			 * @name         : setParamsFishery
			 * @description  : 화면별(어가조건) 파라미터를 설정한다.
			 * @date         : 2018. 09. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setParamsFishery : function() {
				var params = {};
				var names = [];
				var filter = "fishery_cnt";
				var unit = "가구";
				var api_id = "API_0309";
				var year = $("#fishery_year option:selected").val();	//년도
				
				//조건이름
				names.push(year + "년도");
				
				//어가구분
				var ogaType = $("input[name=fishery_type]:checked").val();
				var ogaTypeNm = $("input[name=fishery_type]:checked").parent().next().html();
				names.push(ogaTypeNm);
				
				switch (parseInt(ogaType)) {
					case 1:	//내수면어가
						params["depth2"] = "UOGA_NAESU";
						break;
					case 2:	//해수면어가
						params["depth2"] = "UOGA_HAESU";
						break;
					default:
						break;
				}
				
				//가구원 성별
				if ($("#fisheryGenderCheck").hasClass("on")) {
					var gender = $("input[name=fishery_gender]:checked").val();
					var genderNm = $("input[name=fishery_gender]:checked").parent().next().html();
					params["gender"] = gender;
					names.push(genderNm + "인구");
					unit = "명";
					api_id = "API_0310";
				}
				
				//연령선택
				if ($("#fisheryAgeCheck").hasClass("on")) {
					var ageFrom = $("#fisheryAgeFrom option:selected").val(); //연령시작
					var ageTo = $("#fisheryAgeTo option:selected").val();	//연령 끝
					var ageNm = ageFrom + "세~" + ageTo + "세";
					
					if (parseInt(ageFrom) >= 100) {
						ageFrom = "100";
						ageNm = "100세 이상";
					}
					if (parseInt(ageTo) >= 101) {
						ageTo = "150";
						ageNm = "100세 이상";
					}
					
					params["gender"] = "0";
					params["age_to"] = ageTo;
					params["age_from"] = ageFrom;
					names.push(ageNm);
					unit = "명";
					api_id = "API_0310";
				}	
				params["year"] = year;
				params["area_type"] = "0";
				params["oga_div"] = ogaType;
				params["depth1"] = "AGRICULTRUE_FISHERY";
				
				//조건이름 설정
				names.unshift(this.selectedDataTypeNm);
				this.selectedDataInfoNm = names;
				
				//API 설정정보
				this.api_id = api_id;
				this.filter = filter;
				this.unit = unit;
				
				return params;
			},
			
			/**
			 * 
			 * @name         : setParamsCompany
			 * @description  : 화면별(사업체-전산업) 파라미터를 설정한다.
			 * @date         : 2018. 09. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setParamsCompany : function() {
				var params = {};
				var names = [];
				var filter = "corp_cnt";
				var unit = "개";
				var year = $("#company_year option:selected").val();	//년도
				var targetType = $("input[name=cDataType]:checked").val();  //대상선택
				var targetTypeNm = $("input[name=cDataType]:checked").parent().next().html();  //대상선택
				
				//조건이름
				names.push(year + "년도");
				names.push(targetTypeNm);
				
				//산업분류코드
				var classCd = this.curSelectedCompanyNode.cd;
				if (classCd != null && classCd.length > 0) {
					params["class_code"] = classCd;
				}
				names.push(this.curSelectedCompanyNode.text);

				params["year"] = year;
				params["area_type"] = "0";
				params["targetSelect"] = targetType;
				params["depth1"] = "ALL_COMPANY";
				params["depth2"] = "INDUSTRY";
				
				//조건이름 설정
				names.unshift(this.selectedDataTypeNm);
				this.selectedDataInfoNm = names;
				
				if (targetType == "COMPANY") {
					filter = "corp_cnt";
					unit = "개";
				}else {
					filter = "tot_worker";
					unit = "명";
				}
				
				//API 설정정보
				this.api_id = "API_0304";
				this.filter = filter;
				this.unit = unit;
				
				return params;
			},
			
			/**
			 * 
			 * @name         : setParamsTheme
			 * @description  : 화면별(사업체-테마) 파라미터를 설정한다.
			 * @date         : 2018. 09. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setParamsTheme : function() {
				var params = {};
				var names = [];
				var filter = "corp_cnt";
				var unit = "개";
				var year = $("#theme_year option:selected").val();	//년도
				var targetType = $("input[name=tDataType]:checked").val();  //대상선택
				var themeCd = $("input[name=theme_codes]:checked").val();  //테마코드
				var targetTypeNm = $("input[name=tDataType]:checked").parent().next().html();  //대상선택
				var themeCdNm = $("input[name=theme_codes]:checked").parent().next().html();  //테마코드
				
				//조건이름
				names.push(year + "년도");
				names.push(targetTypeNm);
				names.push(themeCdNm);
				
				params["year"] = year;
				params["area_type"] = "0";
				params["targetSelect"] = targetType;
				params["theme_cd"] = themeCd;
				params["depth1"] = "ALL_COMPANY";
				params["depth2"] = "THEME";
				
				//조건이름 설정
				names.unshift(this.selectedDataTypeNm);
				this.selectedDataInfoNm = names;	
				
				if (targetType == "COMPANY") {
					filter = "corp_cnt";
					unit = "개";
				}else {
					filter = "tot_worker";
					unit = "명";
				}
				
				//API 설정정보
				this.api_id = "API_0304";
				this.filter = filter;
				this.unit = unit;
				
				return params;
			},
			
			/**
			 * 
			 * @name         : setParamsBuffer
			 * @description  : 버퍼분석 버퍼조건 파라미터를 설정한다.
			 * @date         : 2018. 09. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setParamsBuffer : function() {
				var params = {};
				
				//버퍼 조건
				$(".bufferTypeBtn").each(function() {
					var on = $(this).hasClass("on");
					if (on) {
						var bufferType = $(this).attr("id");
						params["type"] = bufferType;
						
						var bufferSeleStep;
						
						switch(bufferType) {
							case "buffer_company":	//사업체 조사
								bufferSeleStep = "1";
								$commonAnalysis.ui.selectedBufferTypeNm = "사업체 조사";
								break;
							case "buffer_poi":		//임의 poi
								bufferSeleStep = "2";
								$commonAnalysis.ui.selectedBufferTypeNm = "임의 POI";
								break;
							case "buffer_user":	// 사용자 데이터
								bufferSeleStep = "3";
								$commonAnalysis.ui.selectedBufferTypeNm = "사용자 데이터";
								break;
							case "buffer_road":	//도로 네트워크
								bufferSeleStep = "4";
								$commonAnalysis.ui.selectedBufferTypeNm = "도로 네트워크";
								break;
							default:
								break;
						}
						params["selstep"] = bufferSeleStep;
					}
				});
				
				return params;
			},
			
			/**
			 * 
			 * @name         : setParamsBufferTheme
			 * @description  : 버퍼분석 버퍼 상세 조건 (사업체) 파라미터를 설정한다.
			 * @date         : 2018. 09. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setParamsBufferTheme : function() {
				var params = {};
				var names = [];
				var year = $("#theme_year option:selected").val();	//년도
				var targetType = $("input[name=tDataType]:checked").val();  //대상선택
				var themeCd = $("input[name=theme_codes]:checked").val();  //테마코드
				var targetTypeNm = $("input[name=tDataType]:checked").parent().next().html();  //대상선택
				var themeCdNm = $("input[name=theme_codes]:checked").parent().next().html();  //테마코드
				
				//조건이름
				names.push(year + "년도");
				names.push(themeCdNm);
				
				params["year"] = year;
				params["area_type"] = "0";
				params["targetSelect"] = targetType;
				params["theme_cd"] = themeCd;
				params["depth1"] = "ALL_COMPANY";
				params["depth2"] = "THEME";

				//조건이름 설정
				this.selectedBufferInfoNm = names;	
				
				return params;
			},
			
			/**
			 * 
			 * @name         : setParamsBufferDetailUser
			 * @description  : 버퍼분석 버퍼 상세 조건 (사용자 데이터) 파라미터를 설정한다.
			 * @date         : 2018. 09. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setParamsBufferDetailUser : function() {
				var params = {};
				var type = "bufferUser";
				
				if ($commonAnalysis.ui.selectedUserDataId == null) {
					$message.open("알림", "나의데이터 항목을 선택하세요.");
					return "invalidate";
				}
				
				var userDataType;
				$(".userDataType").each(function() {
					if ($(this).hasClass("on")) {
						userDataType = $(this).attr("id");
					}
				});

				var dataNm, columnDesc, scheme;
				var names = [];
				for (var i=0; i<this.userDataList.length; i++) {
					if (this.userDataList[i].resource_id == $commonAnalysis.ui.selectedUserDataId) {
						dataNm = this.userDataList[i].data_name;
						columnDesc = this.userDataList[i].pos_column_desc;
						scheme = this.userDataList[i].user_id;
						names.push(this.userDataList[i].description);
						
					}
				}
				
				//조건이름 설정
				this.selectedBufferInfoNm = names;
				
				//파라미터 설정
				params["dataType"] = userDataType;
				params["resource_id"] = $commonAnalysis.ui.selectedUserDataId;
				params["data_name"] = dataNm;
				params["pos_column_desc"] = columnDesc;
				params["scheme"] = scheme
						
				return params;
			},
			
			/**
			 * 
			 * @name         : setParamsBufferPoiCondition
			 * @description  : 버퍼분석의 POI 조건을 설정한다.
			 * @date         : 2018. 11. 22. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 파라미터 정보
			 */
			setParamsBufferPoiCondition : function(params) {
				var pValue = 0;
				var names = [];
				var poiType = $("input[name=poiRadius]:checked").val();  //poi 반경 설정 선택 항목
				var poiTypeNm = $("input[name=poiRadius]:checked").parent().next().html(); //poi 반경 설정 선택 항목
				
				this.selectedBufferInfoNm.push(poiTypeNm);
				
				// poi 반경 설정 거리 값
				if (poiType == "S") { 
					pValue = $("#poiRadiusDistance option:selected").val();	
					this.selectedBufferInfoNm.push(pValue + "m");
				}
				// poi 인구 설정 값
				else { 
					pValue = $("#poiRadiusPopul").val();	
					this.selectedBufferInfoNm.push(pValue);
				}
				
				params["buffer_type"] = poiType;
				params["buffer_size"] = pValue;
			
			},
			
			
			/**
			 * 
			 * @name         : setParamsBufferDetail
			 * @description  : 버퍼분석 버퍼 상세 조건 파라미터를 설정한다.
			 * @date         : 2018. 09. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setParamsBufferDetail : function() {
				var params = {};
				var names = [];
				var bufferYear = $("#theme_year option:selected").val();	//년도
				var bufferTargetType = $("input[name=tDataType]:checked").val();  //대상선택
				var bufferThemeCd = $("input[name=theme_codes]:checked").val();  //테마코드
				var bufferTargetTypeNm = $("input[name=tDataType]:checked").parent().next().html();  //대상선택
				var bufferThemeCdNm = $("input[name=theme_codes]:checked").parent().next().html();  //테마코드

				var bufferPoiType = $("input[name=poiRadius]:checked").val();  //poi 반경 설정 선택 항목
				var bufferPoiTypeNm = $("input[name=poiRadius]:checked").parent().next().html(); //poi 반경 설정 선택 항목
				
				if(bufferPoiType == "DISTANCE"){
					var bufferPoiParam = $("#poiRadiusDistance option:selected").val();	// poi 반경 설정 거리 값
				}else{
					var bufferPoiParam = $("#poiRadiusPopul").val();	// poi 인구 설정 값
				}
				
				if ($("input[name=poiRadius]:checked").val() != "S" && $("#poiRadiusPopul").val() < 500) {
					$message.open("알림", "500이상으로 값을 입력해주세요.");
					return "invalidate";
				}
				//조건이름
				names.push(bufferYear + "년도");
				names.push(bufferTargetTypeNm);
				names.push(bufferThemeCdNm);
				names.push(bufferPoiTypeNm); // poi 조건
				
				params["year"] = bufferYear;
				params["area_type"] = "0";
				params["targetSelect"] = bufferTargetType;
				params["theme_cd"] = bufferThemeCd;
				params["depth1"] = "ALL_COMPANY";
				params["depth2"] = "THEME";
				params["poiType"] = bufferPoiType; // poi 반경 타입
				params["poiParam"] = bufferPoiParam; // poi 반경 값
				
				
				//조건이름 설정
				names.unshift(this.selectedBufferTypeNm);
				this.selectedBufferInfoNm = names;
				
				//단위설정
				this.unit = "개";
				
				return params;
			},
			
			
			/**
			 * 
			 * @name         : setParamsBoundary
			 * @description  : 화면별(경계타입) 파라미터를 설정한다.
			 * @date         : 2018. 09. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setParamsBoundary : function() {
				var params = {};
				
				//경계타입
				$(".boundaryTypeBtn").each(function() {
					var on = $(this).hasClass("on");
					if (on) {
						var boundaryType = $(this).attr("id");
						params["type"] = boundaryType;
						
						var seleStep;
						switch(boundaryType) {
							case "adm":	//행정경계
								seleStep = "1";
								$commonAnalysis.ui.selectedBoundaryTypeNm = "행정동 경계";
								break;
							case "grid":		//그리드경계
								seleStep = "2";
								$commonAnalysis.ui.selectedBoundaryTypeNm = "그리드 경계";
								break;
							case "hexagon":	//헥사곤경계
								seleStep = "3";
								$commonAnalysis.ui.selectedBoundaryTypeNm = "헥사곤 경계";
								break;
							case "random":	//임의경계
								seleStep = "4";
								$commonAnalysis.ui.selectedBoundaryTypeNm = "임의 경계";
								break;
							case "user":	//사용자경계
								seleStep = "5";
								$commonAnalysis.ui.selectedBoundaryTypeNm = "사용자 경계";
								break;
							default:
								break;
						}
						params["selstep"] = seleStep;
					}
				});
				
				return params;
			},
			
			/**
			 * 
			 * @name         : setParamsRegion
			 * @description  : 지역 파라미터를 설정한다.
			 * @date         : 2018. 09. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setParamsRegion : function() {
				var params = {};
				var names = [];
				var admType = $("input[name='admType']:checked").val();
				var admTypeNm = $("input[name='admType']:checked").parent().next().html();
				
				//집계범위 지역일경우
				if (this.regionPageMode == "range") {
					params["admType"] = admType;

					//조건이름
					names.push(admTypeNm + " 범위");
					
					switch(admType) {
						case "sido": //전국(시도)
							break;
						case "sgg": //시군구
							params["sido"] = this.selectedSidoCd;
							names.push( this.selectedSidoNm);
							break;
						case "dong": //읍면동
							if ( this.selectedSggCd == null) {
								params["sido"] = this.selectedSidoCd;
								names.push( this.selectedSidoNm);
							}else {
								params["sido"] = this.selectedSidoCd;
								if (this.selectedSggCd != "all") {
									params["sgg"] = this.selectedSidoCd + this.selectedSggCd;
									names.push( this.selectedSidoNm + " " + this.selectedSggNm);
								}else {
									params["sgg"] = this.selectedSggCd;
									names.push( this.selectedSidoNm);
								}
							}
							break;
						case "totaloa": //집계구
							if ( this.selectedSggCd == null) {
								params["sido"] = this.selectedSidoCd;
								names.push( this.selectedSidoNm);
							}else {
								if (this.selectedDongCd == null) {
									params["sido"] = this.selectedSidoCd;
									if (this.selectedSggCd != "all") {
										params["sgg"] = this.selectedSidoCd + this.selectedSggCd;
										names.push( this.selectedSidoNm + " " + this.selectedSggNm);
									} else {
										params["sgg"] = this.selectedSggCd;
										names.push( this.selectedSidoNm);
									}
									
								}else {
									params["sido"] = this.selectedSidoCd;
									params["sgg"] = this.selectedSidoCd + this.selectedSggCd;
									if (this.selectedDongCd != "all") {
										params["dong"] = this.selectedSidoCd + this.selectedSggCd +this.selectedDongCd;
										names.push( this.selectedSidoNm + " " + this.selectedSggNm + " " + this.selectedDongNm);
									}else {
										params["dong"] = this.selectedDongCd;
										names.push( this.selectedSidoNm + " " + this.selectedSggNm);
									}
								}
							}
							break;
					}
				}else { //일반모드
					var admCd = this.selectedSidoCd;
					var admNm = this.selectedSidoNm;
					
					if (this.selectedSggCd != "all" && this.selectedSggCd != null) {
						admCd += this.selectedSggCd;
						admNm += " " + this.selectedSggNm;
						if (this.selectedDongCd != "all" && this.selectedDongCd != null) {
							admCd += this.selectedDongCd;
							admNm += " " + this.selectedDongNm;
						}
					}
					this.selectedAdmCd = admCd;
					params["adm_cd"] = admCd;
					names.push(admNm);
				}
				

				//그리드 및 헥사곤 경계의 경우
				if (this.params.boundaryInfo != undefined) {
						switch(this.params.boundaryInfo.type) {
							case "grid":
								{
									var spaceValue = $("input[name='gridType']:checked").val();
									var spaceValueNm = $("input[name='gridType']:checked").parent().next().html();
									params["space_value"] = spaceValue;
									names.push(spaceValueNm);
								}
								break;
							case "hexagon":
								{
									var spaceValue = $("input[name='hexagonType']:checked").val();
									var spaceValueNm = $("input[name='hexagonType']:checked").parent().next().html();
									params["space_value"] = spaceValue;
									names.push(spaceValueNm);
								}
								break;
							default:
								break;
						}
				}
				
				//조건이름 설정
				names.unshift(this.selectedBoundaryTypeNm);
				this.selectedRegionInfoNm = names;
				
				return params;
			},
			
			/**
			 * 
			 * @name         : setParamsUserPolygon
			 * @description  : 사용자경계 파라미터를 설정한다.
			 * @date         : 2018. 10. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setParamsUserPolygon : function() {
				var params = {};
				var names = [];
				if (($commonAnalysis.ui.params.boundaryInfo.selstep == "4" || $commonAnalysis.ui.params.boundaryInfo.selstep == "5") &&
				$commonAnalysis.ui.selectedUserPolygonDataId == null) {
					$message.open("알림", "경계데이터 항목을 선택하세요.");
					return "invalidate";
				}
				
				var dataNm, columnDesc, scheme;
				for (var i=0; i<this.userPolygonDataList.length; i++) {
					if (this.userPolygonDataList[i].resource_id == $commonAnalysis.ui.selectedUserPolygonDataId) {
						dataNm = this.userPolygonDataList[i].data_name;
						scheme = this.userPolygonDataList[i].user_id;
						columnDesc = this.userPolygonDataList[i].pos_column_desc;
						names.push(this.userPolygonDataList[i].description);
					}
				}
				
				//파라미터 설정
				params["resource_id"] =  $commonAnalysis.ui.selectedUserPolygonDataId;
				params["data_nm"] = dataNm;
				params["scheme"] = scheme;
				params["pos_column_desc"] = columnDesc;

				//조건이름 설정
				names.unshift(this.selectedBoundaryTypeNm);
				this.selectedRegionInfoNm = names;
				
				return params;
			},
			
			/**
			 * 
			 * @name         : setParamsCalculate
			 * @description  : 데이터연산조건 파라미터를 설정한다.
			 * @date         : 2018. 10. 19. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setParamsCalculate : function() {
				var params = {};
				var names = [];
				var condition = null;
				$(".calculateItem").each(function() {
					var on = $(this).hasClass("on");
					if (on) {
						condition = $(this).attr("id");
						names.push($(this).html());
					}
				});
				
				//파라미터 설정
				params["condition"] = condition;
				
				//조건이름 설정
				this.selectedRegionInfoNm = names;
				
				return params;
			},
			
			/**
			 * 
			 * @name         : setParamsPolygon
			 * @description  : 임의영역 파라미터를 설정한다.
			 * @date         : 2018. 09. 18. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setParamsPolygon : function() {
				if (!this.isSavedPolygonData) {
					if ($commonAnalysisMap.ui.userLayerInfo.length == 0) {
						$message.open("알림", "임의영역 경계를 그려주세요.");
					}else {
						$message.open(
		        				"알림",
		        				"데이터 분석을 위해서는 임의 영역 경계를 저장해야 합니다.<br/>저장 하시겠습니까?",
				    			 btns = [
					    			 {
					    			   title : "저장",
						    			   func : function(opt) {
						    				   opt.close();
						    				   $commonAnalysis.ui.savePopup = null;
						    				   $commonAnalysis.ui.showSavePopup("#polygonSavePopup", "임의영역 경계 저장");
						    			   }
						    		 }, 
				    			     {
									   title : "취소",
									   func : function(opt) {
										   opt.close();
									   }
				    			     } 
				    			 ]
				    	);
					}
					return "invalidate";
				}else {
					return this.selectedPolygonInfo;
				}
			},
			
			/**
			 * 
			 * @name         : setParamsPoi
			 * @description  : 임의영역 POI 파라미터를 설정한다.
			 * @date         : 2018. 11. 07. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
				
			setParamsPoi : function() {
				if (!this.isSavedPoiData) {
					if ($commonAnalysisMap.ui.poiCnt == 0) {
						$message.open("알림", "임의영역 POI를 생성해주세요.");
					} else if ($("input[name=poiRadius]:checked").val() != "S" && $("#poiRadiusPopul").val() < 500) {
						$message.open("알림", "500이상으로 값을 입력해주세요.");
					} else {
						$message.open(
		        				"알림",
		        				"데이터 분석을 위해서는 임의 영역 POI를 저장해야 합니다.<br/>저장 하시겠습니까?",
				    			 btns = [
					    			 {
					    			   title : "저장",
						    			   func : function(opt) {
						    				   opt.close();
						    				   $("#savePoiBtn").addClass("poi");
						    				   $commonAnalysis.ui.savePopup = null;
						    				   $commonAnalysis.ui.showSavePopup("#poiSavePopup", "임의영역 POI 저장");
						    			   }
						    		 }, 
				    			     {
									   title : "취소",
									   func : function(opt) {
										   opt.close();
									   }
				    			     } 
				    			 ]
				    	);
					}
					return "invalidate";
				}else {
					return this.selectedPoiInfo;
				}
			},
			
			/**
			 * 
			 * @name         : setParamsCompanyPoi
			 * @description  : 사업체 POI 파라미터를 설정한다.
			 * @date         : 2018. 12. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setParamsCompanyPoi : function() {
				if (!this.isSavedPoiData) {
					if ($commonAnalysisMap.ui.userLayerInfo == null || $commonAnalysisMap.ui.userLayerInfo.length == 0) {
						$message.open("알림", "POI를 선택해주세요.<br/>POI는 최대 20개까지 선택가능 합니다.");
					}else {
						$message.open(
		        				"알림",
		        				"데이터 분석을 위해서는 사업체 POI를 저장해야 합니다.<br/>저장 하시겠습니까?",
				    			 btns = [
					    			 {
					    			   title : "저장",
						    			   func : function(opt) {
						    				   opt.close();
						    				   $("#savePoiBtn").addClass("company");
						    				   $commonAnalysis.ui.savePopup = null;
						    				   $commonAnalysis.ui.showSavePopup("#poiSavePopup", "POI 저장");
						    			   }
						    		 }, 
				    			     {
									   title : "취소",
									   func : function(opt) {
										   opt.close();
									   }
				    			     } 
				    			 ]
				    	);
					}
					return "invalidate";
				}else {
					return this.selectedPoiInfo;
				}
			},
			
			/**
			 * 
			 * @name         : setParamsRoad
			 * @description  : 도로망 파라미터를 설정한다.
			 * @date         : 2018. 11. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setParamsRoad : function() {
				if (!this.isSavedPolygonData) {
					if ($commonAnalysisMap.ui.userLayerInfo.length == 0) {
						$message.open("알림", "개별 또는 폴리곤을 생성하여 도로망 경계를 선택해주세요.");
					}else {
						$message.open(
		        				"알림",
		        				"데이터 분석을 위해서는 도로망 경계를 저장해야 합니다.<br/>저장 하시겠습니까?",
				    			 btns = [
					    			 {
					    			   title : "저장",
						    			   func : function(opt) {
						    				   opt.close();
						    				   $commonAnalysis.ui.savePopup = null;
						    				   $commonAnalysis.ui.showSavePopup("#polygonSavePopup", "도로망 경계 저장");
						    			   }
						    		 }, 
				    			     {
									   title : "취소",
									   func : function(opt) {
										   opt.close();
									   }
				    			     } 
				    			 ]
				    	);
					}
					return "invalidate";
				}else {
					return this.selectedPolygonInfo;
				}
			},
			
			/**
			 * 
			 * @name         : setParamsSpatialCondition
			 * @description  : 공간자기상관분석-근접이웃수 설정
			 * @date         : 2018. 11. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 파라미터
			 */
			setParamsSpatialCondition : function(params) {
				if ($("#neighborCntPage").is(":visible")) {
					var k_value = $("#user_k_value option:selected").val(); // 공간자기상관분석 근접 이웃 수
					var kValueNm = "근접 이웃 수("+k_value +")";
					params["k_value"] = k_value;
					this.selectedDataInfoNm.push(kValueNm);
				}
			},
			
			/**
			 * 
			 * @name         : showSavePopup
			 * @description  : 팝업을 생성한다.
			 * @date         : 2018. 11. 07. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param id : 팝업 아이디
			 * @param title : 팝업 제목
			 */
			showSavePopup : function(id, title) {
				this.savePopup = $(id).dialog({
					title : title,
					width : "500px",
					height: "280px"
				});
				$commonAnalysis.event.setPopupEvent();	
			},
			
			/**
			 * 
			 * @name         : setIndustryData
			 * @description  : 사업체분류정보를 설정한다.
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @params	res : 결과정보
			 * @params depth : 트리 뎁스
			 * @param class_deg : 사업체 차수(8,9차)
			 * @param class_cd : 산업체분류코드
			 */
			setIndustryData : function(res, depth, class_deg, class_cd) {
				var result = res.result;
				var tmpData = [];
				for(var i=0; i < result.length; i++) {
					var tmpObj = {};
					tmpObj.id = result[i].class_code + "_" + depth;
					tmpObj.cd = result[i].class_code;
						tmpObj.text = result[i].class_nm;
					tmpObj.depth = depth + 1;
					
					if (tmpObj.depth > 1) {
						tmpObj.infoIcon = true;
					} 
				
					if (depth < 3) {
						tmpObj.children = [{"id": tmpObj.id + "_progress", "iconCls": "icon-tree-loading", "text": "Loading"}];
						tmpObj.state = "closed";
					}else {
						tmpObj.childCount = 0;
					}
					tmpData.push(tmpObj);
					
				}

				if ($commonAnalysis.ui.companyTree == null) {
					if (depth == 0) {
						
						//산업체분류 최상위 '산업체 총괄' 추가
						//=============================================================================================//
						var rootData = [];
						var root = {
								id : "root",
								cd : "",
								text : "전산업",
								state : "closed",
								children : [{"id": "root_progress", "iconCls": "icon-tree-loading", "text": "Loading"}],
								isExpanded : true
						};
						rootData.push(root);
						//=============================================================================================//
						
						$commonAnalysis.ui.companyTree = $("#company_TreeBox").easytree({
							slidingTime:0,
							data : rootData,
							allowActivate: true,
				            disableIcons: true,
				            toggled : function(event, nodes, node) {
								if (node.childCount == null) {
									if (node.children.length > 0 ) {
										if(node.children[0].id == node.id + "_progress") {
											if (node.isExpanded) {
												$commonAnalysisApi.request.doReqInterstryCode(
														node.depth,
														class_deg,
														node.cd);
											}
										}
									}
								}
							},
							selected : function(node) {	
								$commonAnalysis.ui.curSelectedCompanyNode = node;
							},
							iconSelected : function(e, id) {
								var id = id.split("_")[1];
								id = id.substring(1, id.length);
								window.open(
										"https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=0"+ class_deg +"&strCategoryCode="+ id,
										"통계분류 홈페이지에 오신것을 환경합니다.",
										"width=420, height=400, menubar=no, status=no, toolbar=no, location=no, scrollbars=yes"
								);
							}
						});
						$commonAnalysis.ui.companyTree.activateNode(tmpData[0].id);
						$commonAnalysis.ui.curSelectedCompanyNode = $commonAnalysis.ui.companyTree.getNode(tmpData[0].id);
						
						//=============================================================================================//
						for (var i=0; i<tmpData.length; i++) {
							$commonAnalysis.ui.companyTree.addNode(tmpData[i], "root");
						}
						$commonAnalysis.ui.companyTree.removeNode("root_progress");
						$commonAnalysis.ui.companyTree.rebuildTree();
						$commonAnalysis.ui.companyTree.activateNode("root");
						$commonAnalysis.ui.curSelectedCompanyNode = $commonAnalysis.ui.companyTree.getNode("root");
						//=============================================================================================//
					} 
				}else {
					for (var i=0; i<tmpData.length; i++) {
						$commonAnalysis.ui.companyTree.addNode(tmpData[i], class_cd + "_" +(depth-1));
					}
					$commonAnalysis.ui.companyTree.removeNode(class_cd + "_" + (depth-1) + "_progress");
					$commonAnalysis.ui.companyTree.rebuildTree();
					$commonAnalysis.ui.companyTree.activateNode(class_cd + "_" + (depth-1));
				}
			},
			
			/**
			 * 
			 * @name         : setSidoList
			 * @description  : 시도정보를 설정한다.
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @params	res : 결과정보
			 */
			setSidoList : function(res) {
				var result = res.result;
				var html = "";
				switch(this.regionPageMode) {
					case "range":		//집계구범위모드
						{
							var admType = $("input[name='admType']:checked").val();

							//최대 2레벨 까지 조회가능하기 때문에
							//집계구 선택 시, 전체 항목은 제거
							//2019-02-07 전구단위에서 읍면동까지 조회할 수 있도록 전체문구 추가
							//경계분석일 경우에만 해당
							/*if (admType != "totaloa" && (this.type == "boundary")) {
								html = "<li><a id='all'>전체</a></li>";
							}
							
							//집계범위가 sido가 아니면 시도정보를 표출한다.
							if (admType != "sido") {
								for (var i=0; i<result.sidoList.length; i++) {
									html += "<li>";
									html +=		"<a id='"+result.sidoList[i].sido_cd+"' data-x_coor='"+result.sidoList[i].x_coor+"'  data-y_coor='"+result.sidoList[i].y_coor+"'>"+result.sidoList[i].sido_nm+"</a>";
									html +=	"</li>";
								}
							}*/
							
							switch(this.type) {
								//2019-02-07 전구단위에서 읍면동까지 조회할 수 있도록 전체문구 추가
								//경계분석일 경우에만 해당
								case "boundary":
									if (admType != "totaloa") {
										html = "<li><a id='all'>전체</a></li>";
									}
									break;
								case "spatial":
									//2019-03-19 공간자기상관분석은 전국시도만 전체 추가 
									if (admType == "sido") {
										html = "<li><a id='all'>전체</a></li>";
									}
									break;
								default:
									break;
							}
							
							//집계범위가 sido가 아니면 시도정보를 표출한다.
							if (admType != "sido") {
								for (var i=0; i<result.sidoList.length; i++) {
									html += "<li>";
									html +=		"<a id='"+result.sidoList[i].sido_cd+"' data-x_coor='"+result.sidoList[i].x_coor+"'  data-y_coor='"+result.sidoList[i].y_coor+"'>"+result.sidoList[i].sido_nm+"</a>";
									html +=	"</li>";
								}
							}
							
							
							
							$("#sidoList").html(html);
							$("#sidoList li").eq(0).addClass("on");

						}
						break;
					case "normal":	//일반모드
					case "buffer" : //버퍼모드
						{
							for (var i=0; i<result.sidoList.length; i++) {
								html += "<li>";
								html +=		"<a id='"+result.sidoList[i].sido_cd+"' data-x_coor='"+result.sidoList[i].x_coor+"'  data-y_coor='"+result.sidoList[i].y_coor+"'>"+result.sidoList[i].sido_nm+"</a>";
								html +=	"</li>";
							}
							$("#sidoList").html(html);
							$("#sidoList li").eq(0).addClass("on");
						}
						break;
					case "lq": //입지계수모드
						{
							html = "<li><a id='all'>전체</a></li>";
							for (var i=0; i<result.sidoList.length; i++) {
								html += "<li>";
								html +=		"<a id='"+result.sidoList[i].sido_cd+"' data-x_coor='"+result.sidoList[i].x_coor+"'  data-y_coor='"+result.sidoList[i].y_coor+"'>"+result.sidoList[i].sido_nm+"</a>";
								html +=	"</li>";
							}
							$("#sidoList").html(html);
							$("#sidoList li").eq(0).addClass("on");
						}
					default:
						break;
				}
				
				$commonAnalysis.event.setRegionEvent();
				$commonAnalysis.ui.selectedSidoCd = "all";
				$commonAnalysis.ui.selectedSidoCd = $("#sidoList li:eq(0)").find("a").attr("id");
				$commonAnalysis.ui.selectedSidoNm = $("#sidoList li:eq(0)").find("a").html();
				
				if (this.regionPageMode == "range") {
					if (admType == "totaloa" || admType == "dong") {
						$("#sidoList li").eq(0).click(); //시도 바로 조회
					}
					$commonAnalysis.util.setAdmTypeDescription(admType); //설명문구 설정
				}else {
					$("#sidoList li").eq(0).click(); //시군구 바로 조회
				}
			},
			
			/**
			 * 
			 * @name         : setSggList
			 * @description  : 시군구정보를 설정한다.
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @params	res : 결과정보
			 */
			setSggList : function(res) {
				var result = res.result;
				var admType = $("input[name='admType']:checked").val();
				var html = "";
				
				//최대 2레벨 까지 조회가능하기 때문에
				//집계구 선택 시, 전체 항목은 제거
				//2019-02-07 서울시 전체 집계구가 가능하도록 수정
				//경계분석만 해당
				if (this.type == "boundary") {
					html += "<li><a id='all'>전체</a></li>"
				}else {
					// && this.regionPageMode != "buffer"
					if (admType != "totaloa") {
						html += "<li><a id='all'>전체</a></li>";
					}
				}

				for (var i=0; i<result.sggList.length; i++) {
					html += "<li>";
					html +=		"<a id='"+result.sggList[i].sgg_cd+"' data-x_coor='"+result.sggList[i].x_coor+"'  data-y_coor='"+result.sggList[i].y_coor+"'>"+result.sggList[i].sgg_nm+"</a>";
					html +=	"</li>";
				}
				$("#sggList").html(html);
				$("#sggList li").eq(0).addClass("on");
				
				$commonAnalysis.event.setRegionEvent();
				$commonAnalysis.ui.selectedSggCd = "all";
				
				switch(this.regionPageMode) {
					case "range":
						if (admType == "totaloa") {
							$("#sggList li").eq(0).click(); //시군구 바로 조회
						}
						$commonAnalysis.util.setAdmTypeDescription(admType); //설명문구 설정
						break;
					case "buffer":
						$("#sggList li").eq(0).click(); //시군구 바로 조회
						$commonAnalysis.util.setAdmTypeDescription(admType); //설명문구 설정
						break;
					default:
						break;
				}
				
			},
			
			/**
			 * 
			 * @name         : setAdmList
			 * @description  : 읍면동정보를 설정한다.
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @params	res : 결과정보
			 */
			setAdmList : function(res) {
				var result = res.result;			
				var admType = $("input[name='admType']:checked").val();
				
				var html = "<li><a id='all'>전체</a></li>";
				for (var i=0; i<result.admList.length; i++) {
					html += "<li>";
					html +=		"<a id='"+result.admList[i].emdong_cd+"' data-x_coor='"+result.admList[i].x_coor+"'  data-y_coor='"+result.admList[i].y_coor+"'>"+result.admList[i].emdong_nm+"</a>";
					html +=	"</li>";
				}
				$("#admList").html(html);
				$("#admList li").eq(0).addClass("on");
				
				$commonAnalysis.event.setRegionEvent();
				$commonAnalysis.ui.selectedDongCd = "all";
				
				if (this.regionPageMode == "range") {
					$commonAnalysis.util.setAdmTypeDescription(admType); //설명문구 설정
				}
			},
			
			/**
			 * 
			 * @name         : userDataListViewPaging
			 * @description  : 사용자데이터 테이블 페이징을 생성한다.
			 * @date         : 2018. 09. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param totalCount: 데이터 갯수
			 * @param totalPage : 총페이지 갯수
			 * @param pageSize : 한페이지당 데이터 갯수
			 * @param data :데이터
			 * @papram pageIndex : 페이지 인덱스
			 */
			userDataListViewPaging : function(totalCount, totalPage, pageSize, data, pageIndex) {
				$('#userDataPage').paging({
					current : pageIndex,
					max : totalPage,
					itemClass : 'number',
					itemCurrent : 'current',
					format : '{0}',
					next :  '>',
					prev : '<',
					first : '<<',
					last : '>>',
					data : data,
					onclick : function(e,page){
						$commonAnalysis.ui.srtIdx = (page - 1) * pageSize;
						$commonAnalysis.ui.currentPage = page;
						$commonAnalysisApi.request.doReqUserData($commonAnalysis.ui.userDatatype, $commonAnalysis.ui.srtIdx);
					}
				});
			},
			
			/**
			 * 
			 * @name         : userPolygonDataListViewPaging
			 * @description  : 사용자 경계데이터 테이블 페이징을 생성한다.
			 * @date         : 2018. 10. 04. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param totalCount: 데이터 갯수
			 * @param totalPage : 총페이지 갯수
			 * @param pageSize : 한페이지당 데이터 갯수
			 * @param data :데이터
			 * @papram pageIndex : 페이지 인덱스
			 */
			userPolygonDataListViewPaging : function(totalCount, totalPage, pageSize, data, pageIndex) {
				$('#userPolygonDataPage').paging({
					current : pageIndex,
					max : totalPage,
					itemClass : 'number',
					itemCurrent : 'current',
					format : '{0}',
					next :  '>',
					prev : '<',
					first : '<<',
					last : '>>',
					data : data,
					onclick : function(e,page){
						$commonAnalysis.ui.srtIdx = (page - 1) * pageSize;
						$commonAnalysis.ui.currentPage = page;
						$commonAnalysisApi.request.doReqUserPolygonData($commonAnalysis.ui.userPolygonDatatype, $commonAnalysis.ui.srtIdx);
					}
				});
			},
			
			/**
			 * 
			 * @name         : getTableHeader
			 * @description  : 테이블 헤더를 설정한다.
			 * @date         : 2018. 09. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			getTableHeader : function() {
				var html = "";
				html +=  "<tr>";
				html +=		"<th style='width:80px;'>선택</th>";
				html +=		"<th style='width:80px;'>순번</th>";
				html +=		"<th style='width:130px;'>종류</th>";
				html +=		"<th>데이터명</th>";
				html +=		"<th style='width:100px;'>날짜</th>";
				html +=	"</tr>";
				
				return html;
			},
			
			/**
			 * 
			 * @name         : setEmptyListTable
			 * @description  : 검색정보가 없을 경우 테이블을 설정한다.
			 * @date         : 2018. 09. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setEmptyListTable : function(id) {
				var html = this.getTableHeader();
				html += "</tr><td colspan=5>검색된 내용이 없습니다.</td></tr>";
				$("#" + id).append(html);
			},
			
			/**
			 * 
			 * @name         : setUserDataListTable
			 * @description  : 사용자데이터 테이블을 세팅한다.
			 * @date         : 2018. 09. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data   : 데이터
			 * @param pageSize : 한페이지당 최대 갯수
			 * @param curPage :현재 페이지
			 * @param type : 타입
			 */
			setUserDataListTable : function(data, pageSize, curPage) {
				//테이블 생성
				var html = this.getTableHeader();	
				var typeNm;
				for (var i=0; i<data.length; i++) {
					var no = (parseInt(curPage)*pageSize) + (i-pageSize);
					html +=	"<tr id='sIdx_"+i+"'>";
					html +=		"<td><input type='checkbox' class='chkEtc userDataCheck' name='userDataCheck'  id='"+data[i].resource_id+"' data-category='"+data[i].category4+"' /></td>";
					html +=		"<td>"+(no+1)+"</td>";
					
					switch (this.userDatatype) {
						case "geoData":
							typeNm = "위치데이터";;
							break;
						case "analysisData":
							typeNm = "분석데이터";
							break;
						case "shareData":
							typeNm = "공유데이터";
							break;
						default:
							typeNm = "분석데이터";
							break;
					}
					
					html +=		"<td>"+typeNm+"</td>";
					html +=		"<td class='al'>"
					html +=			"<div style='width:550px;float:left'>";
					html +=				"<span style='font-size:14px;font-weight:bold;'>"+$commonAnalysis.util.getNullParamCheck(data[i].description)+"</span></br>";
					html +=				"<span>("+data[i].data_name+")</span>";
					html +=			"</div>";
					html +=			"<div>";
					html +=				"<span class='preViewbtn' class ='dataPreView'  onclick='$commonDataFunc.ui.doDataPreview(\""+data[i].data_name+"\",\""+data[i].resource_id+"\",\""+data[i].action_type+"\",\""+data[i].user_id+"\")'>데이터 보기</span>";
					html +=			"</div>";
					html +=		"</td>";
					html +=		"<td>"+data[i].data_create_time+"</td>";
					html +=	"</tr>";
				}
				$("#userDataTable").append(html);
				$(".chkEtc").styler();
				
				
				//페이징을 하더라고 기존에 체크된 항목이 있으면 체크 유지
				if ($commonAnalysis.ui.selectedUserDataId != null) {
					$(".userDataCheck").each(function() {
						var id = $(this).attr("id");
						if (id == $commonAnalysis.ui.selectedUserDataId + "-styler") {
							$(this).addClass("checked");
							$(this).prop("checked", true);
						}
					})
				}
				
				//체크 이벤트 등록
				$(".userDataCheck").on("click", function() {
					$(".userDataCheck").removeClass("checked");
					$(".userDataCheck").prop("checked", false);
					
					$(this).addClass("checked");
					$(this).prop("checked", true);
					
					//선택된 아이디 저장
					var category = $(this).data("category");
					$commonAnalysis.ui.selectedUserDataId = $(this).attr("id").split("-styler")[0];
					$commonAnalysis.ui.selectedCategory = category;
				});
			},
			
			/**
			 * 
			 * @name         : setUserPolygonDataListTable
			 * @description  : 사용자 경계데이터 테이블을 세팅한다.
			 * @date         : 2018. 10. 04. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data   : 데이터
			 * @param pageSize : 한페이지당 최대 갯수
			 * @param curPage :현재 페이지
			 * @param type : 타입
			 */
			setUserPolygonDataListTable : function(data, pageSize, curPage) {
				//테이블 생성
				var html = this.getTableHeader();	
				var typeNm;
				for (var i=0; i<data.length; i++) {
					var no = (parseInt(curPage)*pageSize) + (i-pageSize);
					html +=	"<tr id='sIdx_"+i+"'>";
					html +=		"<td><input type='checkbox' class='chkEtc userPolygonDataCheck' name='userPolygonDataCheck'  id='"+data[i].resource_id+"' /></td>";
					html +=		"<td>"+(no+1)+"</td>";
					
					switch (this.userPolygonDatatype) {
						case "myPolygonData":
							typeNm = "나의데이터";;
							break;
						case "sharePolygonData":
							typeNm = "공유데이터";
							break;
					}
					
					html +=		"<td>"+typeNm+"</td>";
					html +=		"<td class='al'>"
					html +=			"<div style='width:550px;float:left;'>";
					html +=				"<span style='font-size:14px;font-weight:bold;'>"+$commonAnalysis.util.getNullParamCheck(data[i].description)+"</span></br>";
					html +=				"<span>("+data[i].data_name+")</span>";
					html +=			"</div>";
					html +=			"<div>";
					html +=				"<span class='preViewbtn' class ='dataPreView'  onclick='$commonDataFunc.ui.doPolygonPreview(\""+data[i].data_name+"\",\""+data[i].user_id+"\")'>데이터 보기</span>";
					html +=			"</div>";
					html +=		"</td>";
					html +=		"<td>"+data[i].data_create_time+"</td>";
					html +=	"</tr>";
				}
				$("#userPolygonDataTable").append(html);
				$(".chkEtc").styler();
				
				//페이징을 하더라고 기존에 체크된 항목이 있으면 체크 유지
				if ($commonAnalysis.ui.selectedUserPolygonDataId != null) {
					$(".userPolygonDataCheck").each(function() {
						var id = $(this).attr("id");
						if (id == $commonAnalysis.ui.selectedUserPolygonDataId + "-styler") {
							$(this).addClass("checked");
							$(this).prop("checked", true);
						}
					})
				}
				
				//체크 이벤트 등록
				$(".userPolygonDataCheck").on("click", function() {
					$(".userPolygonDataCheck").removeClass("checked");
					$(".userPolygonDataCheck").prop("checked", false);
					
					$(this).addClass("checked");
					$(this).prop("checked", true);
					
					//선택된 아이디 저장
					$commonAnalysis.ui.selectedUserPolygonDataId = $(this).attr("id").split("-styler")[0];
					
				});
			},
			
			/**
			 * 
			 * @name         : setNavStep
			 * @description  : 분석단계영역을 설정한다.
			 * @date         : 2018. 10. 04. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data   : 데이터
			 * @param idx : 인덱스
			 */
			setNavStep : function(idx) {
				$(".stepList li").removeClass("on");
				$(".stepList li:eq("+idx+")").addClass("on");
				
				var width = 382;
				switch(this.type) {
					case "buffer":
					case "operation":
						$(".dataStepBox").addClass("type01");
						width = 286;
						break;
					default:
						width = 382;
						break;
				}
				
				if (idx == 0) {
					$(".stepList li:eq("+idx+")").css({
						"width" : width + "px",
						"margin-left" : "0px"
					});
					$(".stepList li:eq("+idx+")").find(".t01").css("margin-left", "7px");
				}else {
					$(".stepList li:eq("+idx+")").css({
						"width" : (width+20)+"px",
						"margin-left" : "-20px"
					});
					$(".stepList li:eq("+idx+")").find(".t01").css("margin-left", "27px");
				}
				
			}
	};
	
	$commonAnalysis.util = {
			
			/**
			 * 
			 * @name         : getAnalysisNm
			 * @description  : 분석명을 가져온다.
			 * @date         : 2018. 08. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 분석타입
			 */
			getAnalysisNm : function(type) {
				var name = "";
				switch(type) {
					case "boundary":
						name = "경계분석";
						break;
					case "voronoi":
						name = "보로노이 다이어그램";
						break;
					case "buffer":
						name = "버퍼분석";
						break;
					case "location":
						name = "입지계수";
						break;
					case "spatial":
						name = "공간자기상관분석";
						break;
					case "operation":
						name = "데이터 간 연산분석";
						break;
					default:
						break;
				}
				return name;
			},
			
			/**
			 * 
			 * @name         : getAnalysisDescription
			 * @description  : 분석설명정보를 가져온다.
			 * @date         : 2018. 08. 27. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 분석타입
			 */
			getAnalysisDescription : function(type) {
				var desc = "";
				switch(type) {
					case "boundary":
						desc += "경계분석";
						break;
					case "voronoi":
						desc += "보로노이다이어그램 분석";
						break;
					case "buffer":
						desc += "버퍼분석";
						break;
					case "location":
						desc += "입지계수 분석";
						break;
					case "spatial":
						desc += "공간자기상관 분석";
						break;
					case "operation":
						desc += "데이터 간 연산분석";
						break;
					default:
						break;
				}
				
				desc += "을 실행하기 위해서는 분석 대상 데이터를 우선적으로 선택하여야 합니다.";
				desc +=	"분석을 원하시는 데이터의 유형과 상세조건을 선택하시길 바랍니다.";
					
				return desc;
			},
			
			/**
			 * 
			 * @name         : getBoundaryDescription
			 * @description  : 경계설명정보를 가져온다.
			 * @date         : 2018. 09. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 경계타입
			 */
			getBoundaryDescription : function(type) {
				var desc = "";
				switch(type) {
					case "adm":	//행정경계
						desc += "<li>선택하신 행정경계는 시도, 시군구, 읍면동, 집계구 단위의 행정동 경계를 의미합니다.</li>";
						desc += "<li>선택하신 데이터의 행정구역 별 특성을 도출하실 때 활용할 수 있습니다.</li>";
						break;
					case "grid":		//그리드경계
						desc += "<li>선택하신 그리드는 격자 형태의 경계선을 의미하고, 그리드의 크기를 선택할 수 있습니다.</li>";
						desc += "<li>선택하신 데이터의 특성을 그리드 기준으로 도출하실 때 활용할 수 있습니다.</li>";
						break;
					case "hexagon":	//헥사곤경계
						desc += "<li>선택하신 헥사곤은 육각형 형태의 경계선을 의미하며 헥사곤의 크기를 선택할 수 있습니다.</li>";
						desc += "<li>선택하신 데이터의 특성을 헥사곤 기준으로 도출하실 때 활용할 수 있습니다.</li>";
						break;
					case "random":	//임의경계
						desc += "<li>선택하신 임의 경계선은 영역의 모양과 크기를 사용자가 직접 선택할 수 있습니다.</li>";
						desc += "<li>선택하신 데이터의 특성을 선택된 경계를 기준으로 도출하실 때 활용할 수 있습니다.</li>";
						break;
					case "user":	//사용자경계
						desc += "<li>선택하신 사용자 경계는 SGIS pro에서 사용자가 생성한 경계를 의미합니다.</li>";
						desc += "<li>선택하신 데이터의 특성을 해당 경계를 기준으로 도출하실 때 활용할 수 있습니다.</li>";
						break;
					default:
						break;
				}
				return desc;
			},
			
			/**
			 * 
			 * @name         : getBufferDescription
			 * @description  : 버퍼설명정보를 가져온다.
			 * @date         : 2018. 12. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 경계타입
			 */
			getBufferDescription : function(type) {
				var desc = "";
				switch(type) {
					case "buffer_company":	//사업체 조사
						desc += "<li>사업체 조사<br /> “9개의 분류된 테마 카테고리 내에서 테마업종을 선택합니다.”</li>";
						break;
					case "buffer_poi":		//임의 POI 생성
						desc += "<li>임의 POI 생성<br /> “사용자가 버퍼조건이 되는 POI를 직접 생성합니다.”</li>";
						break;
					case "buffer_user":		//사용자데이터
						desc += "<li>사용자 데이터<br /> “등록된 사용자 데이터 목록에서 버퍼조건이 되는 데이터를 선택합니다.”</li>";
						break;
					case "buffer_road":	//도로네트워크
						desc += "<li>도로네트워크 선택<br /> “특정 지역 내의 도로네트워크에서 영역을 통해 선택합니다.”</li>";
						break;
					default:
						break;
				}
				return desc;
			},
			
			/**
			 * 
			 * @name         : setAdmTypeDescription
			 * @description  : 지역선택화면 설명문구를 설정한다.
			 * @date         : 2018. 09. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type   : 경계타입
			 */
			setAdmTypeDescription : function(type) {
				var desc = "";
				
				//시도선택정보
				var sidoCd, sidoNm;
				$("#sidoList li").each(function() {
					var on = $(this).hasClass("on");
					if (on) {
						sidoCd = $(this).find("a").attr("id")
						sidoNm = $(this).find("a").html();
					}
				});
				
				//시군구선택정보
				var sggCd, sggNm;
				$("#sggList li").each(function() {
					var on = $(this).hasClass("on");
					if (on) {
						sggCd = $(this).find("a").attr("id")
						sggNm = $(this).find("a").html();
					}
				});
				
				//읍면동선택정보
				var dongCd, dongNm;
				$("#admList li").each(function() {
					var on = $(this).hasClass("on");
					if (on) {
						dongCd = $(this).find("a").attr("id")
						dongNm = $(this).find("a").html();
					}
				});
				
				switch(type) {
					case "sido":
						desc = "전국을 시도 단위로 분석할 수 있습니다.";
						break;
					case "sgg":
						if (sidoCd == "all") {
							desc = "전국을 시군구 단위로 분석할 수 있습니다.";
						}else {
							desc = sidoNm + "을(를) 시군구 단위로 분석할 수 있습니다."; 
						}
						break;
					case "dong":
						if (sidoCd == "all") {
							desc = "전국을 읍면동 단위로 분석할 수 있습니다.";
						}
						else if (sggCd == "all") {
							desc = sidoNm + "을(를) 읍면동 단위로 분석할 수 있습니다."
						}
						else {
							desc = sidoNm + " " + sggNm + "을(를) 읍면동 단위로 분석할 수 있습니다."; 
						}
						break;
					case "totaloa":
						if (sidoCd == "all") {
							desc = "전국을 집계구 단위로 분석할 수 있습니다.";
						}
						else if (sggCd == "all") {
							desc = sidoNm + "을(를) 집계구 단위로 분석할 수 있습니다."
						}
						else if (dongCd == "all") {
							desc = sidoNm + " " + sggNm + "을(를) 집계구 단위로 분석할 수 있습니다."
						}
						else {
							desc = sidoNm + " " + sggNm + " " + dongNm + "을(를) 집계구 단위로 분석할 수 있습니다."; 
						}
						break;
				}
				
				$("#admTypeDesc").html(desc);
				
			},
			
			/**
			 * 
			 * @name         : getNullParamCheck
			 * @description  : null 파라미터를 체크한다.
			 * @date         : 2018. 09. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data   : 스트링정보
			 */
			getNullParamCheck : function(data) {
				var name = data;
				if (data == undefined || data == null || data.length == 0) {
					name = "-"
				}
				return name;
			}
	};
	
	//EVENT 내용작성
	$commonAnalysis.event = {
			
			setUIEvent : function(){
				
				//슬라이더 생성
				this.slideValue("populationAgeFrom", "populationAgeTo", "#slider-range2", "세", 105);
				this.slideValue("houseBdspaceFrom", "houseBdspaceTo", "#slider-range3", "㎡", 9);
				this.slideValue("aggregationAgeFrom", "aggregationAgeTo", "#slider-range4", "세", 105);
				this.slideValue("forestryAgeFrom", "forestryAgeTo", "#slider-range5", "세", 105);
				this.slideValue("fisheryAgeFrom", "fisheryAgeTo", "#slider-range6", "세", 105);
				
				//년도설정
				this.setDataYearComboBox("company");
				this.setDataYearComboBox("theme");
				
				$('#charset01, #charset02, #charset03, .select, .select01, .chkAll, .chkEtc, .rdEtc').styler({
					select: { 
						selectSearch : false
					}
				});
				
				
				//데이터 선택 이벤트
				$(".dataTypeBtn").on("click", function() {
					$(".dataTypeBtn").removeClass("on");
					$(this).addClass("on");					
					
					//공간자기상관분석의 경우
					if ($commonAnalysis.ui.type == "spatial") {
						var id = $(this).attr("id");
						if (id == "userData") {
							$("#neighborCntPage").show();
						}else {
							$("#neighborCntPage").hide();
						}
					}
				});
				
				//센서스 타입선택
				$(".censusBtn").on("click", function() {
					$(".censusBtn").removeClass('on');
					$(this).addClass("on");
				});
				
				//인구조건-연령선택
				//가구조건-세대구성
				//가구조건-점유형태
				//농가조건-성별선택, 연령선택
				//임가조건-성별선택, 연령선택
				//어가조건-성별선택, 연령선택
				$(".optionCheck").on("click", function() {
					var on = $(this).hasClass("on");
					if (on) {
						 $(this).removeClass("on");
					}else {
						 $(this).addClass("on");
					}
				});
				
				//인구조건-교육정도/혼인정도
				//2010년 이하일때 교육정도/혼인정도
				$("#population_year").on("change", function() {
					var year = $(this).val();
					if (year <= 2010) {
						$("#populationEduTab").show();
						$("#populationMarryTab").show();
					}else {
						$("#populationEduTab").hide();
						$("#populationMarryTab").hide();
						$("#populationEduCheck").prop("checked", false);
						$("#populationMarryCheck").prop("checked", false);
					}
				});
				
				//가구조건-점유형태
				//2015년 이상일때는 점유형태를 제공하지 않음
				$("#household_year").on("change", function() {
					var year = $(this).val();
					if (year > 2010) {
						$("#householdOcptnCheck").prop("checked", false);
						$("#householdOcptnTab").hide();
					}else {
						$("#householdOcptnTab").show();
					}
				});
				
				//주택조건-건축년도
				//2015년 이상일때는 노후년수로 표출
				//2010년 이하일 때는 건축년수로 표출
				$("#house_year").on("change", function() {
					var year = $(this).val();
					if (year > 2010) {
						$("#houseConstYearCheck").prop("checked", false);
						$("#houseUsePeriodTab").show();
						$("#houseConstYearTab").hide();
					}else {
						$("#houseUsePeriodCheck").prop("checked", false);
						$("#houseConstYearTab").show();
						$("#houseUsePeriodTab").hide();
					}
				});
				
				//경계타입 선택 이벤트
				$(".boundaryTypeBtn").on("click", function() {
					$(".boundaryTypeBtn").removeClass("on");
					$(this).addClass("on");	
					
					var type = $(this).attr("id");
					var desc = $commonAnalysis.util.getBoundaryDescription(type);
					$("#boundaryDetailDesc").html(desc);
				});
				
				//버퍼조건 선택 이벤트
				$(".bufferTypeBtn").on("click", function() {
					$(".bufferTypeBtn").removeClass("on");
					$(this).addClass("on");	
					
					var type = $(this).attr("id");
					$("#bufferConditionDetailDesc").html($commonAnalysis.util.getBufferDescription(type));
				});
				
				//집계범위 선택
				$(".admType").on("click", function() {
					//집계범위 선택 시, 시도정보를 새로 조회한다.
					$("#sidoList").empty();
					$("#sggList").empty();
					$("#admList").empty();
					$commonAnalysisApi.request.doReqSidoList(bndYear);
				});
				
				//테마분류 선택
				$(".themaCategoryList dt a").on("click", function(){  
					$(".themaCategoryList dt a").removeClass("on");
					$(".themaCategoryList dd").hide();
					$(this).addClass("on");
					$(this).parents("dt").eq(0).next("dd").show();
				});
				
				//LBDMS 나의데이터 타입
				$(".userDataType").on("click", function() {
					$(".userDataType").removeClass("on");
					$(this).addClass("on");
					
					var type = $(this).attr("id");
					$commonAnalysis.ui.selectedUserDataId = null;
					$commonAnalysis.ui.userDatatype = type;
					$commonAnalysis.ui.currentPage = 1;
					$commonAnalysisApi.request.doReqUserData(type, "0");
				});
				
				//사용자경계 선택
				$(".userPolygonType").on("click", function() {
					$(".userPolygonType").removeClass("on");
					$(this).addClass("on");
					
					var type = $(this).attr("id");
					$commonAnalysis.ui.selectedUserPolygonDataId = null;
					$commonAnalysis.ui.userPolygonDatatype = type;
					$commonAnalysisApi.request.doReqUserPolygonData(type, "0");
				});
				
				//데이터간 연산분석 조건선택
				$(".josabox a").on("click", function(){
					$(".josabox a").removeClass("on");
					$(this).addClass("on");
				});
			},
			
			/**
			 * 
			 * @name         : checkNumber
			 * @description  : poi 버퍼 상세 정보 입력창 숫자 체크
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type : 데이터 타입
			 */
			checkNumber : function(check_form) {
				var numPattern = /([^0-9])/;
			    var numPattern = check_form.value.match(numPattern);
			    if(numPattern != null){
			    	$message.open("알림", "수용 인구는 숫자만 입력 가능 합니다.");
			        check_form.value = "";
			        check_form.focus();
			        return false;
			    }
			},
			
			/**
			 * 
			 * @name         : doChangeArea
			 * @description  : 데이터 영역을 변경한다.(센서스/나의데이터)
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type : 데이터 타입
			 */
			doChangeArea : function(type) {
				$(".censusMainPageTab").hide();
				switch(type) {
					case "census":
						$("#censusArea").show();
						$commonAnalysis.ui.selectedUserDataId = null;
						break;
					case "user":
						$("#userArea").show();
						$("#geoData").trigger("click");
						break;
					case "analysis":
						$("#userArea").show();
						$("#analysisData").trigger("click");
						break;
					default:
						break;
				}
			},
			
			/**
			 * 
			 * @name         : slideValue
			 * @description  : 슬라이드 바 컨트롤.
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			slideValue : function(from, to, slider, etc, limit) {
			    var domFrom = "#"+from;
			    var domTo = "#"+to;
			    var domSlider = slider;
			    var min = 1;
			    var step = 1;
			    var tmpValues = null;
			    var tmpHouseSpaceList = [0, 20, 40, 60, 85, 100, 130, 165, 230, 300];
			    var values = null;
			   
			    //주택면적조건
			    if (from == "houseBdspaceFrom" ) {
			    	min = 0;
			    	step = 1;
			    	values = [0, 1];
			    }else {
			    	min = 0;
			    	step = 5;
			    	values = [10, 65];
			    }
			    
			    //form, to selectbox 데이터 설정
			    var data = 0;
				for (var i=min; i<=limit; i++) {
					if (from != "houseBdspaceFrom") {
						data = i;
						if (i != 0 && i%5 != 0) {
							continue;
						}
					}
					var tmpText = i + etc;
					if (from == "houseBdspaceFrom") {
						data = tmpHouseSpaceList[i];
					    tmpText = tmpHouseSpaceList[i]+etc;
					}
					if (i == limit) {
						tmpText = (limit-5)+"+";
						if (from == "houseBdspaceFrom") {
							tmpText = tmpHouseSpaceList[i-1]+"+";
						}
					} 
					
			        $(domFrom).append($("<option>", { 
			            value: data,
			            text : tmpText
			        }));
			        $(domTo).append($("<option>", { 
			            value: data,
			            text : tmpText
			        }));
			    }
				
				//slider 데이터 초기화
				if (from != "houseBdspaceFrom") {
					$(domFrom).val("10");
			    	$(domTo).val("65");
				}else {
					$(domFrom).val("0");
			    	$(domTo).val("20");
			    	$("."+from).text("약 "+(0/3.3).toFixed(1)+"평");
				    $("."+to).text("약 "+(20/3.3).toFixed(1)+"평");
				}
				
				//from selectbox 이벤트 설정
			    $(domFrom).change(function(){
			    	var spaceTo = $(domTo).val();
			    	var id = $(this).attr("id");
			    	
			    	if (id == "houseBdspaceFrom") {
			    		if (parseInt($(this).val()) >= parseInt(spaceTo)) {
			    			var idx = $(domTo).prop("selectedIndex");
				    		idx = idx-1;
				    		var toData = $(domTo+ " option:eq("+idx+")").val();
				        	$(this).setData(toData);
				        }
			    		var idx = 0;
			    		for (var i=0; i<tmpHouseSpaceList.length; i++) {
			    			if (tmpHouseSpaceList[i] == $(this).val()) {
			    				idx = i;
			    				break;
			    			}
			    		}
			    		$(domSlider).slider("values", 0, idx);
			    		$("."+from).text("약 "+($(this).val()/3.3).toFixed(1)+"평");
			    	}else {
			    		 if (parseInt($(this).val()) >= parseInt(spaceTo)) {
				        	 $(this).setData(parseInt(spaceTo)-5);
				        }
				        $(domSlider).slider("values", 0, $(this).val());
			    	}

			        var fromData = $(this).val();
			        $(domTo+ " option").each(function() {
			        	$(this).show();
			        	if (parseInt(fromData) >= parseInt($(this).val())) {
			        		$(this).hide();
			        	}
			        });
			    });

			  //to selectbox 이벤트 설정
			    $(domTo).change(function(){
			        var spaceFrom = $(domFrom).val();
			        var id = $(this).attr("id");
			        
			        if (id == "houseBdspaceTo") {
			        	if (parseInt($(this).val()) <= parseInt(spaceFrom)) {
			        		var idx = $(domFrom).prop("selectedIndex");
				    		idx = idx+1;
				    		var fromData = $(domFrom+ " option:eq("+idx+")").val();
				        	$(this).setData(fromData);
			        	}
			        	var idx = 0;
			    		for (var i=0; i<tmpHouseSpaceList.length; i++) {
			    			if (tmpHouseSpaceList[i] == $(this).val()) {
			    				idx = i;
			    				break;
			    			}
			    		}
			    		$(domSlider).slider("values", 1, idx);
			        	$("."+to).text("약 "+($(this).val()/3.3).toFixed(1)+"평");
			        }else {
			        	if (parseInt($(this).val()) <= parseInt(spaceFrom)) {
				            $(this).setData(parseInt(spaceFrom)+5);
				        }
			        	
			        	if (parseInt($(this).val()) > 100) {
			        		$(domTo).hide();
			        		$("#" + id + "Text").hide();
			        	}else {
			        		$(domTo).show();
			        		$("#" + id + "Text").show();
			        	}
			        	$(domSlider).slider("values", 1,  $(this).val());
			        }
			    });
			    
			    $(domTo).click(function(){
			    	 var fromData = $(domFrom).val();
			    	 $(domTo+ " option").each(function() {
				        $(this).show();
				        if (parseInt(fromData) >= parseInt($(this).val())) {
				        	$(this).hide();
				        }
				      });
			    });
			    
			    //slider 생성
			    $(domSlider).slider({
			        range: true,
			        min: min,
			        max: limit,
			        step : step,
			        values : values,
			        
			        slide : function(e, ui) {
			        	if (from == "houseBdspaceFrom") {
			        		if (ui.values[1] == limit) {
				        		$(domTo).hide();
				        		if (from == "houseBdspaceFrom") {
				        			$("#houseBdspaceToText").hide();
								    $(".houseBdspaceToText").hide();
								    $(".houseBdspaceTo").hide();
				        		}
				        	}else {
				        		$(domTo).show();
				        		if (from == "houseBdspaceFrom") {
				        			$("#houseBdspaceToText").show();
								    $(".houseBdspaceToText").show();
								    $(".houseBdspaceTo").show();
				        		}
				        	}
				        	
			        		//selectbox->formStyler plugin 사용 후
			        		//데이터를 셋팅하는 함수가 없어서 setData 함수 구현
				        	$(domFrom).setData(tmpHouseSpaceList[ui.values[0]]);
							$(domTo).setData(tmpHouseSpaceList[ui.values[1]]);	
							
							$("."+from).text("약 "+(tmpHouseSpaceList[ui.values[0]]/3.3).toFixed(1)+"평");
					        $("."+to).text("약 "+(tmpHouseSpaceList[ui.values[1]]/3.3).toFixed(1)+"평");
			        	}else {
			        		if (ui.values[1] == limit) {
			        			$(domTo).hide();
			        			$(domTo+"-styler").hide();
			        			$("#"+to+"Text").hide();		        			
			        		}else {
			        			$(domTo).show();
			        			$(domTo+"-styler").show();
			        			$("#"+to+"Text").show();		        			
			        		}					    	
			        		
			        		//selectbox->formStyler plugin 사용 후
			        		//데이터를 셋팅하는 함수가 없어서 setData 함수 구현
						    $(domFrom).setData(ui.values[0]);
						    $(domTo).setData(ui.values[1]);
			        	}
			        },

			        start : function(e, ui) {
			        	if (from == "populationAgeFrom" || from == "aggregationAgeFrom" || from == "forestryAgeFrom" || from == "fisheryAgeFrom" || from == "houseBdspaceFrom") {
			        		tmpValues = ui.values;
			        	}
			        },
			        
			        stop : function(e, ui) {
			        	 if (from == "houseBdspaceFrom") {
			        		 if (ui.values[0] == ui.values[1]) {
				        			if (tmpValues[0] != ui.values[0]) {
				        				$(domSlider).slider("values", 0, ui.values[1]-1);
				        				$(domFrom).setData(tmpHouseSpaceList[ui.values[1]-1]);
									    $(domTo).setData(tmpHouseSpaceList[ui.values[1]]);	
				        			}else {
				        				$(domSlider).slider("values", 1, ui.values[0]+1);
				        				$(domTo).setData(tmpHouseSpaceList[ui.values[0]+1]);
									    $(domFrom).setData(tmpHouseSpaceList[ui.values[0]]);	
				        			}
					        	}
			        	 }else {
			        		 if (ui.values[0] == ui.values[1]) {
				        			if (tmpValues[0] != ui.values[0]) {
				        				$(domSlider).slider("values", 0, ui.values[1]-5);
				        				$(domFrom).setData(ui.values[1]-5);
									    $(domTo).setData(ui.values[1]);	
				        			}else {
				        				$(domSlider).slider("values", 1, ui.values[0]+5);
				        				$(domTo).setData(ui.values[0]+5);
									    $(domFrom).setData(ui.values[0]);	
				        			}
					        	}
			        	 }
			        }
			    });
 			},
 			
 			/**
			 * 
			 * @name         : setDataYearComboBox
			 * @description  : 센서스 년도박스를 선택한다.
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type : 데이터 타입
			 */
 			setDataYearComboBox : function(type) {
 				var html = "";
 				switch(type) {
	 				case "company":
	 					for (var i=companyDataYear; i>=2000; i--) {
	 						html += "<option value='"+i+"'>"+i+"년도</option>";
	 					}
	 					break;
	 				case "theme":
	 					for (var i=companyDataYear; i>=2006; i--) {
	 						html += "<option value='"+i+"'>"+i+"년도</option>";
	 					}
	 					break;
	 				default:
	 					break;
 				}
 				$("#"+type+"_year").html(html);
 			},
 			
 			/**
			 * 
			 * @name         : setPopupEvent
			 * @description  : 팝업이벤트
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
 			setPopupEvent : function() {
 				
 				//임의영역 경계 저장 이벤트
 				$("#savePolygonBtn").on("click", function() {
 					var dataNm = $("#polygonDesc").val();
 					if (dataNm == undefined || dataNm.length == 0) {
 						$message.open("알림", "임의영역 경계명을 입력해주세요.");
 						return;
 					}
 					$commonAnalysis.ui.savePopup.close();
 					
 					//임의영역 경계 저장 후, 다음화면으로 이동
 					$commonAnalysisApi.request.doReqInsertPolygonData(dataNm, $commonAnalysisMap.ui.type, function(res, params) {
 						//조건이름 설정
 						$commonAnalysis.ui.selectedRegionInfoNm.unshift($commonAnalysis.ui.selectedBoundaryTypeNm);
 						$commonAnalysis.ui.selectedRegionInfoNm.push(params.description);
 						$commonAnalysis.ui.selectedPolygonInfo = params;
 						$commonAnalysis.ui.isSavedPolygonData = true;
 	 					$commonAnalysis.ui.doNextPageView();
 					});
 				});
 				
 				//임의영역 POI 저장 이벤트
 				$("#savePoiBtn").on("click", function() {
 					var dataNm = $("#poiDesc").val();
 					if (dataNm == undefined || dataNm.length == 0) {
 						$message.open("알림", "임의영역 POI명을 입력해주세요.");
 						return;
 					}
 					$commonAnalysis.ui.savePopup.close();
 					
 					var type = $(this).attr("class");
 					
 					//임의영역 경계 저장 후, 다음화면으로 이동
 					$commonAnalysisApi.request.doReqInsertPoiData(dataNm, type, function(res, params) {
 						//조건이름 설정
 						$commonAnalysis.ui.selectedBufferInfoNm.unshift($commonAnalysis.ui.selectedBufferTypeNm);
 						$commonAnalysis.ui.selectedBufferInfoNm.push(params.description);
 						$commonAnalysis.ui.selectedPoiInfo = params;
 						$commonAnalysis.ui.isSavedPoiData = true;
 	 					$commonAnalysis.ui.doNextPageView();
 					});
 				});
 			},
 			
 			/**
			 * 
			 * @name         : setRegionEvent
			 * @description  : 지역선택화면 이벤트
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
 			setRegionEvent : function() {
 				
 				//클릭시 시군구요청
				$("#sidoList li").on("click", function() {
					$("#sidoList li").removeClass("on");
					$(this).addClass("on");
					
					//시군구,읍면동 초기화
					$("#sggList").empty();
					$("#admList").empty();
					
					var admType = $("input[name='admType']:checked").val();
					var sido_cd = $(this).find("a").attr("id");
					var sido_nm = $(this).find("a").html();
					var x_coord = $(this).find("a").data("x_coor");
					var y_coord = $(this).find("a").data("y_coor");
					
					$commonAnalysis.ui.selectedSidoCd = sido_cd;
					$commonAnalysis.ui.selectedSidoNm = sido_nm;
					$commonAnalysis.ui.selectedSggCd = null;
					$commonAnalysis.ui.selectedDongCd = null;
					
					if (sido_cd != "all" && admType != "sgg") {
						$commonAnalysis.ui.centerCoord = [x_coord, y_coord];
						$commonAnalysisApi.request.doReqSggList(bndYear, sido_cd);
					}else {
						$commonAnalysis.util.setAdmTypeDescription(admType); //설명문구 설정
					}
				});
				
				//클릭시 시군구요청
				$("#sggList li").on("click", function() {
					$("#sggList li").removeClass("on");
					$(this).addClass("on");
					
					//읍면동 초기화
					$("#admList").empty();
					
					var admType = $("input[name='admType']:checked").val();
					var sgg_cd = $(this).find("a").attr("id");
					var sgg_nm = $(this).find("a").html();
					var x_coord = $(this).find("a").data("x_coor");
					var y_coord = $(this).find("a").data("y_coor");
					
					$commonAnalysis.ui.selectedSggCd = sgg_cd;
					$commonAnalysis.ui.selectedSggNm = sgg_nm;
					$commonAnalysis.ui.selectedDongCd = null;
					
					//집계범위가 sido가 아니면 시도정보를 표출한다.
					if (sgg_cd != "all" && admType != "dong") {
						$commonAnalysis.ui.centerCoord = [x_coord, y_coord];
						$commonAnalysisApi.request.doReqAdmList(bndYear, $commonAnalysis.ui.selectedSidoCd, sgg_cd);
					}else {
						$commonAnalysis.util.setAdmTypeDescription(admType); //설명문구 설정
					}
				});
				
				//클릭시 시군구요청
				$("#admList li").on("click", function() {
					$("#admList li").removeClass("on");
					$(this).addClass("on");
					
					var admType = $("input[name='admType']:checked").val();
					var dong_cd = $(this).find("a").attr("id");
					var dong_nm = $(this).find("a").html();
					var x_coord = $(this).find("a").data("x_coor");
					var y_coord = $(this).find("a").data("y_coor");
					
					$commonAnalysis.ui.selectedDongCd = dong_cd;
					$commonAnalysis.ui.selectedDongNm = dong_nm;
					$commonAnalysis.ui.centerCoord = [x_coord, y_coord];
					$commonAnalysis.util.setAdmTypeDescription(admType); //설명문구 설정
				});
 			}
	};
	
}(window,document));