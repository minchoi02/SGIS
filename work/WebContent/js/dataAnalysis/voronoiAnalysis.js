
(function(W,D){
	W.$voronoiAnalysis = W.$voronoiAnalysis || {};
	
	$(document).ready(function(){
		$voronoiAnalysis.event.setUIEvent();
	});
	
	//UI 내용작성
	$voronoiAnalysis.ui = {
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
						//센서스 데이터 - 경계설정 화면으로 이동
						//나의 데이터 -지역선택 화면으로 이동
						switch($commonAnalysis.ui.params.dataInfo.type) {
							case "censusData":
								this.showBoundaryView();
								break;
							case "userData":
								this.showRegionView();
								break;
							default:
								break;
						}
						break;
					case 3:
						//사용자가 센서스 데이터를 선택했는지
						//아니면 나의데이터를 선택했는지에 따라 다음화면이 달라짐
						//센서스 데이터 - 지역선택 화면으로 이동
						//나의 데이터 - 요약화면으로 이동
						switch($commonAnalysis.ui.params.dataInfo.type) {
							case "censusData":
								this.showRegionView();
								break;
							case "userData":
								this.showSummaryView();
								break;
							default:
								break;
						}
						break;
					case 4:
						//센서스데이터만 해당
						this.showSummaryView();
						break;
					default:
						break;
				}
			},
			
			/**
			 * 
			 * @name         : showDataSelectMainView
			 * @description  : 보로노이 다이어그램 첫페이지 화면
			 * @date         : 2018. 10. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showDataSelectMainView : function(type) {
				$(".pageView").hide();
				$(".prevPageBtn").hide();
				$(".nextPageBtn").show();
				$(".excuteBtn").hide();
				$("#censusMainPage").show();
				$("#analysisDesc").html( $commonAnalysis.util.getAnalysisDescription(type));
				
				//보로노이 다이어그램은 POI형태만 해당되므로
				//인구와 농림어업 조건은 숨김
				$(".populationArea").hide();
				$(".aggregationArea").hide();
				$(".companyArea").addClass("t03");
				
				//나의데이터탭 아이디변경
				//POI형태의 분석이력만 조회되도록 변경
				$("#analysisData").attr("id", "analysisPoiData");
				$("#shareData").attr("id", "sharePoiData");
				
				if($("#theme").hasClass("on")){ // 데이터 선택 후 이전 뷰로 이동 시 선택한 클래스 유지 수정
					$("#theme").addClass("on")
				}else{
					$("#company").addClass("on");
				}
				
				//데이터 타입을 체크하여 화면을 초기화한다.
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
			 * @description  : 보로노이 다이어그램 분석 센서스 상세조건설정 화면
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
			 * @name         : showRegionView
			 * @description  : 보로노이 다이어그램 분석 지역선택 화면
			 * @date         : 2018. 10. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showRegionView : function() {
				$(".pageView").hide();
				$(".prevPageBtn").show();
				$(".nextPageBtn").show();
				$(".excuteBtn").hide();
				$("#regionPage").show();
				
				//집계범위영역 숨김
				$("#admTypeArea").find("tbody").hide();

				
				//단계설정
				$commonAnalysis.ui.setNavStep(1);
				
				//시도정보 조회
				$commonAnalysis.ui.regionPageMode = "normal";
				$commonAnalysisApi.request.doReqSidoList(bndYear); 
			},
						
			/**
			 * 
			 * @name         : showSummaryView
			 * @description  : 요약정보 화면 
			 * @date         : 2018. 10. 01 
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
				$("#summaryNm").html($commonAnalysis.util.getAnalysisNm("voronoi"));
				
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
								if (this.params.dataType == "company") {
									if (this.params.dataInfo.params.class_code == undefined || this.params.dataInfo.params.class_code.length < 5) {
										$message.open("알림", "POI가 많으면 분석의 성능이슈가 발생하므로 산업체분류의 최하위단계를 선택하여 주세요.");
										return false;
									}
								}
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
								this.params["regionInfo"] = $commonAnalysis.ui.setParamsForView("region");
								break;
							default:
								break;
						}
						break;
					case 3:
						this.params["regionInfo"] = $commonAnalysis.ui.setParamsForView("region");
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
				
				var params = $voronoiAnalysis.util.getParams(this.params);
				var detailParams = $voronoiAnalysis.util.getDetailParams(this.params);
				params["description"] = $.trim(title);
				
				console.log(params);
				console.log(detailParams);
				
				
				var log_param = "Params - " + detailParams.param;
				$log.srvLogWrite("Z0", "04", "03", "02", "", log_param);
				
				//분석실행
				$auth.doLoginMng(function(){
					$commonAnalysisApi.request.doReqExecuteAnalysis(mngDomain +"/api/my/dense/voronoiAnalysis.do", params, function(id) {
						if (id != undefined && id != null) {
							$commonAnalysisApi.request.doReqExecuteAnalysisDetailInfo(id, detailParams);
						}else {
							$message.open("알림", "알 수 없는 오류로 분석 수행을 하지 못하였습니다.");
						}
					});
				});
			}
	};
	
	$voronoiAnalysis.util = {
			
			getParams : function(data) {
				var params = {};
				var condition = [];
				var schecme = $("#user_id").html();
				switch(data.dataInfo.type) {
					case "censusData": //센서스 데이터
						params["data_type"] = "sgis";
						params["area_cd"] =  data.regionInfo.adm_cd;
						
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
						params["data_type"] = "mydata";
						params["area_cd"] =  data.regionInfo.adm_cd;
						params["data_table_schema"]  = data.dataInfo.params.scheme;
						params["data_name"] = data.dataInfo.params.data_name;
						params["resource_user_id"] = data.dataInfo.params.scheme;
						params["resource_id"] = data.dataInfo.params.resource_id;
						params["lbdms_x"] =  "x";
						params["lbdms_y"] =  "y";
						params["analysis_column"] =  "";
						break;
					default:
						break;
				}
				
				return params;
			},
			
			getDetailParams : function(data) {
				var params = {
						analysis_type : "VORONOI",
						bord_type : data.boundaryInfo.selstep
				};
				var condition = {
						dataInfo : data.dataInfo.names.join(","),
						regionInfo : data.regionInfo.names.join(","),
						unit : "㎡"
				};
				params["param"] = JSON.stringify(condition);
				
				return params;
			}
			
		
	};
	
	//EVENT 내용작성
	$voronoiAnalysis.event = {
			
			setUIEvent : function(){
				
			}
	};
	
}(window,document));