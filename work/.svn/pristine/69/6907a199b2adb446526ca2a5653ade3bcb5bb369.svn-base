
(function(W,D){
	W.$operationAnalysis = W.$operationAnalysis || {};
	
	$(document).ready(function(){
		$operationAnalysis.event.setUIEvent();
	});
	
	//UI 내용작성
	$operationAnalysis.ui = {
			params : {},
			isCheckArea : false,
			
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
						this.showDataSelectMainView(0, type);
						break;
					case 1:
						this.showDataSelectMainView(1);
						break;
					case 2:
						this.showCalculateView();
						break;
					case 3:
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
			showDataSelectMainView : function(idx, type) {
				$(".pageView").hide();
				$(".excuteBtn").hide();
				$("#censusMainPage").show();
				$("#analysisDesc").html( $commonAnalysis.util.getAnalysisDescription(type));
				
				//데이터 A 선택화면에서는 다음버튼만 표출
				//데이터 B 선택화면에서는 이전/다음버튼 표출
				if (idx == 0) {
					$("#geoData").hide();
					$(".prevPageBtn").hide();
					$(".nextPageBtn").show();
				}else {
					$("#geoData").hide();
					$(".prevPageBtn").show();
					$(".nextPageBtn").show();
				}
				
				$operationAnalysis.ui.isCheckArea = false;
				
				//데이터간 연산분석은 
				$("#censusData").hide();
				$(".dataTypeBtn").removeClass("on");
				$("#userData").addClass("on");
				$("#userData").addClass("t03");
				
				//사용자 데이터 선택영역 표출
				$commonAnalysis.event.doChangeArea("analysis");
				
				//데이터 타입을 체크하여 화면을 초기화한다.
				$(".dataTypeBtn").each(function() {
					if ($(this).hasClass("on")) {
						var id = $(this).attr("id");
						if (id == "censusData") {
							$("#censusArea").show();
							$("#userArea").hide();
						}else {
							$("#censusArea").hide();
							$("#userArea").show();
						}
					}
				});
				
				//단계설정
				$commonAnalysis.ui.setNavStep(idx);
			},
				
			/**
			 * 
			 * @name         : showCalculateView
			 * @description  : 연산기준 설정화면
			 * @date         : 2018. 10. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showCalculateView : function() {
				$(".pageView").hide();
				$(".prevPageBtn").show();
				$(".nextPageBtn").show();
				$(".excuteBtn").hide();
				$("#calculatePage").show();
				
				//단계설정
				$commonAnalysis.ui.setNavStep(2);
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
				$commonAnalysis.ui.setNavStep(3);
				
				//요약분석명 설정
				$("#summaryNm").html($commonAnalysis.util.getAnalysisNm("operation"));
				
				//데이터 조건 설정
				for (var i=0; i<this.params.dataInfo.length; i++) {
					var html = "";
					var dataNames = this.params.dataInfo[i].names;
					for (var k=0; k<dataNames.length; k++) {
						html += "<div class='inp02'><a>"+dataNames[k]+"</a></div>";
					}
					$("#data"+(i+1)+"TextArea").html(html);
				}
				
				
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
						this.params = $commonFunc.deepCopy(checkParams);
						this.params.dataInfo = [];
						this.params.dataInfo[idx] = checkParams.dataInfo;
						this.params.dataInfo[idx]["names"] = $commonAnalysis.ui.selectedDataInfoNm;
						break;
					case 1:
						var checkParams = $commonAnalysis.ui.setParamsForView("dataMain");
						if (checkParams == "invalidate") {
							return false;
						}
						this.params.dataInfo[idx] = checkParams.dataInfo;
						this.params.dataInfo[idx]["names"] = $commonAnalysis.ui.selectedDataInfoNm;
						
						//두 통계간 경계체크
						if (!this.isCheckArea) {
							this.doCheckArea(this.params, function(success) {
								if (success) {
									$commonAnalysis.ui.doNextPageView();
								}
							});
							return false;
						}
						break;
					case 2:
						this.params["regionInfo"] = $commonAnalysis.ui.setParamsForView("calculate");
						this.params.regionInfo["names"] = $commonAnalysis.ui.selectedRegionInfoNm;
						break;
					default:
						break;
				}
				
				$commonAnalysis.ui.params = this.params;
				return true;
			},
			
			/**
			 * 
			 * @name         : doCheckArea
			 * @description  : 경계가 같은지 체크한다.
			 * @date         : 2018. 10. 04. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data : 파라미터 정보
			 * @param callback : 콜백함수
			 */
			doCheckArea : function(data, callback) {
				var params = {};
				if (data.dataInfo.length == 2) {
					var tmpParams = {};
					tmpParams["status"] = false;
					tmpParams["condition"] = "";
					for (var i=0; i<data.dataInfo.length; i++) {
						tmpParams["data"+(1+i)] = {
								data_nm :  data.dataInfo[i].params.data_name,
								user_id : data.dataInfo[i].params.scheme,
						};
					}
					tmpParams = JSON.stringify(tmpParams);
					params["jsonStr"] = tmpParams;
							
					//분석실행
					$auth.doLoginMng(function(res){
						$commonAnalysisApi.request.doReqChkOperationAnalysisAreaData(params, function(res) {
							switch(parseInt(res.errCd)) {
								case 0:
									if (callback != undefined && callback != null && typeof callback === "function") {
										$operationAnalysis.ui.isCheckArea = true;
										callback.call(undefined, true);
									}
									break;
								default:
									$message.open("알림", res.errMsg);
									break;
							}
						});
					});
				}
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
				
				var tmpParams = $operationAnalysis.util.getParams(this.params);
				var detailParams = $operationAnalysis.util.getDetailParams(this.params);
				tmpParams["result_table_desc"] = $.trim(title);
				
				var params = {
						jsonStr : JSON.stringify(tmpParams)
				};
				
				console.log(params);
				console.log(detailParams);
				
				
				var log_param = "Params - " + detailParams.param;
				$log.srvLogWrite("Z0", "04", "07", "02", "", log_param);
				
				//분석실행
				$auth.doLoginMng(function(){
					$commonAnalysisApi.request.doReqExecuteAnalysis(mngDomain +"/api/my/myData/procAnalyOpt.do", params, function(id) {
						if (id != undefined && id != null) {
							$commonAnalysisApi.request.doReqExecuteAnalysisDetailInfo(id, detailParams);
						}else {
							$message.open("알림", "알 수 없는 오류로 분석 수행을 하지 못하였습니다.");
						}
					});
				});
				
			}
	};
	
	$operationAnalysis.util = {
			
			/**
			 * 
			 * @name         : getParams
			 * @description  : 파라미터를 가져온다.
			 * @date         : 2018. 10. 04. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data : 파라미터 정보
			 */
			getParams : function(data) {
				var params = {};
				params["status"] = false;
				params["result_table_nm"] = "lbdms_calc_" + $commonFunc.makeRandomDigitString(13);
				params["batch_yn"] = "Y";
				params["condition"] = data.regionInfo.condition;
				params["admTotYn"] = "N";
				
				for (var i=0; i<data.dataInfo.length; i++) {
					params["data"+(1+i)] = {
							data_name: data.dataInfo[i].params.data_name,
							resource_id : data.dataInfo[i].params.resource_id,
							user_id : data.dataInfo[i].params.scheme
					}
				}
				
				return params;
			},
			
			/**
			 * 
			 * @name         : getDetailParams
			 * @description  : 상세 파라미터를 가져온다.
			 * @date         : 2018. 10. 04. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data : 파라미터 정보
			 */
			getDetailParams : function(data) {
				var params = {
						analysis_type : "OPERATION"
				};
				
				var condition = {
						regionInfo : data.regionInfo.names.join(","),
						unit : ""
				};
				
				var tmpDataInfo = [];
				for (var i=0; i<data.dataInfo.length; i++) {
					tmpDataInfo.push(data.dataInfo[i].names);
					condition["data"+(1+i)] = {
							data_nm : data.dataInfo[i].params.data_name,
							resource_id : data.dataInfo[i].params.resource_id,
							scheme : data.dataInfo[i].params.scheme
					}
				} 
				condition["dataInfo"] = tmpDataInfo.join(",");
				params["param"] = JSON.stringify(condition);
				console.log(params);
				return params;
			}
		
	};
	
	//EVENT 내용작성
	$operationAnalysis.event = {
			
			setUIEvent : function(){
				
			}
	};
	
}(window,document));