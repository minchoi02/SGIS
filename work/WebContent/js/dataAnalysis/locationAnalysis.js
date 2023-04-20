
(function(W,D){
	W.$locationAnalysis = W.$locationAnalysis || {};
	
	$(document).ready(function(){
		$locationAnalysis.event.setUIEvent();
	});
	
	//UI 내용작성
	$locationAnalysis.ui = {
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
						this.showCensusDetailView();
						break;
					case 2:
						this.showBoundaryView();
						break;
					case 3:
						$("#gridArea").hide();
						$("#hexagonArea").hide();
						this.showRegionView();
						break;
					case 4:
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
			showDataSelectMainView : function() {
				$(".pageView").hide();
				$(".prevPageBtn").hide();
				$(".nextPageBtn").show();
				$(".excuteBtn").hide();
				$("#censusMainPage").show();
				
				$(".populationArea").hide();
				$(".aggregationArea").hide();
				
				//센서스 데이터 선택영역 표출
				$("#userData").hide();
				$(".dataTypeBtn").removeClass("on");
				$("#censusData").addClass("on");
				$("#censusData").addClass("t04");

				//인구와 농림어업 조건은 숨김
				$(".populationArea").hide();
				$(".aggregationArea").hide();
				$(".companyArea").addClass("t03");
				
				$commonAnalysis.event.doChangeArea("census");
				
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
				
				//입지계수는 행정경계만 지원한다.
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
				$("#regionPage").show();
				
				//집계범위영역 숨김
				$("#admTypeArea").find("tbody").hide();
				
				//단계설정
				$commonAnalysis.ui.setNavStep(1);
				
				//시도정보 조회
				$commonAnalysis.ui.regionPageMode = "lq";
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
				$("#summaryPage").show();
				
				//단계설정
				$commonAnalysis.ui.setNavStep(2);
				
				//요약분석명 설정
				$("#summaryNm").html($commonAnalysis.util.getAnalysisNm("location"));
				
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
						this.params.dataInfo["params"] = $commonAnalysis.ui.setParamsForView(this.params.dataType);
						break;
					case 2:
						this.params["boundaryInfo"] = $commonAnalysis.ui.setParamsForView("boundary");
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
				
				var params = $locationAnalysis.util.getParams(this.params);
				var detailParams = $locationAnalysis.util.getDetailParams(this.params);
				params["result_table_desc"] = $.trim(title);
				
				
				var log_param = "Params - " + detailParams.param;
				$log.srvLogWrite("Z0", "04", "05", "02", "", log_param);
				
				//분석실행
				$auth.doLoginMng(function(){
					$commonAnalysisApi.request.doReqExecuteAnalysis(mngDomain +"/api/my/myData/locationRank.do", params, function(id) {
						if (id != undefined && id != null) {
							$commonAnalysisApi.request.doReqExecuteAnalysisDetailInfo(id, detailParams);
						}else {
							$message.open("알림", "알 수 없는 오류로 분석 수행을 하지 못하였습니다.");
						}
					});
				});
			}
	};
	
	$locationAnalysis.util = {
			
			getParams : function(data) {
				var params = {};
				var condition = [];
				var scheme = $("#user_id").html();
				
				params["area_cd"] =  data.regionInfo.adm_cd;
				params["selstep"] =  data.boundaryInfo.selstep;
				params["result_table_name"] = "lbdms_lq_" + $commonFunc.makeRandomDigitString(13);
				params["batch_yn"] = "Y";
				
				//조건설정
				for (var key in data.dataInfo.params) {
					var tmpParams = {
							"key" : key,
							"value" : data.dataInfo.params[key]
					};
					condition.push(tmpParams);
				}
				params["condition"] = JSON.stringify(condition);
				
				return params;
			},
			
			getDetailParams : function(data) {
				var params = {
						analysis_type : "LQ",
						bord_type : data.boundaryInfo.selstep
				};
				var condition = {
						dataInfo : data.dataInfo.names.join(","),
						regionInfo : data.regionInfo.names.join(","),
						unit : "LQ"
				};
				params["param"] = JSON.stringify(condition);
				
				return params;
			}
			
		
	};
	
	$locationAnalysis.request = {
	
			doReqExecuteAnalysis : function(params) {
				var options = {
						isBeforSend : true,
						params : params
				};
				
				$ajax.requestApi(mngDomain +"/api/my/myData/analyzeData.do", options,  function(res) {
					if (res.success != undefined && res.success) {
						$message.open(
		        				"알림",
		        				"경계분석이 정상적으로 수행되었습니다.</br>분석완료까지 수 분이 걸릴수 있습니다.",
				    			 btns = [
					    			 {
					    			   title : "확인",
						    			   func : function(opt) {
						    				   opt.close();
						    				   window.location.href=contextPath + "/view/myData/myDataManagement"
						    			   }
						    		 }
				    			 ]
				    	);
					}
				});
			}
	};
	
	//EVENT 내용작성
	$locationAnalysis.event = {
			
			setUIEvent : function(){
				
			}
	};
	
}(window,document));