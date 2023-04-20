
(function(W,D){
	W.$commonAnalysisApi = W.$commonAnalysisApi || {};
	
	$(document).ready(function(){
		
	});
	
	$commonAnalysisApi.ui = {
	
			setParams : function(type) {
				var params = {};
				switch(type) {
					case "polygon": //임의영역 경계
						{
							//데이터명 설정
							var dataNm = "gis_" + $commonFunc.makeRandomDigitString(13);
							var actionType = "CREATE_GIS";
							var geometryType = "POLYGON";
							var posColumnDesc = {
									pos_col_infos : [
									           {
									        	   pos_method : "GEOM",
									        	   table_columns : "",
									        	   pos_columns : "geom"
									           }
									]
							};
							
							var typeList = [];
							var geomList = [];
							for (var i=0; i<$commonAnalysisMap.ui.userLayerInfo.length; i++) {
								typeList.push($commonAnalysisMap.ui.userLayerInfo[i].type);
								geomList.push($commonAnalysisMap.ui.userLayerInfo[i].area);
							}
							
							params = {
									"data_nm" : dataNm,
									"action_type" : actionType,
									"geometry_type" : geometryType,
									"pos_column_desc" : JSON.stringify(posColumnDesc),
									"polygon_type" : typeList.join("@"),
									"geom" : geomList.join("@")
							}
							
						}
						break;
					case "poi": //임의영역 POI
						{
							//데이터명 설정
							var dataNm = "gis_" + $commonFunc.makeRandomDigitString(13);
							var actionType = "CREATE_POI";
							var geometryType = "POINT";
							var posColumnDesc = {
									pos_col_infos : [
									           {
									        	   pos_method : "XY",
									        	   table_columns : "",
									        	   pos_columns : "x,y"
									           }
									]
							};

							var poiList = [];
							if ($commonAnalysisMap.ui.featureLayer != null) {
								$commonAnalysisMap.ui.featureLayer.eachLayer(function(marker) {
									marker
									poiList.push(JSON.stringify({
										"corp_nm" : marker.options.title,
										"x" : marker.options.x,
										"y" : marker.options.y
									}));
								});
							}
							
							params = {
									"data_nm" : dataNm,
									"action_type" : actionType,
									"geometry_type" : geometryType,
									"pos_column_desc" : JSON.stringify(posColumnDesc),
									"poi" : poiList.join("@")
							}
						}
						break;
					case "road" : //도로망 경계
						{
							//데이터명 설정
							var dataNm = "gis_" + $commonFunc.makeRandomDigitString(13);
							var actionType = "CREATE_ROAD";
							var geometryType = "LINESTRING";
							var posColumnDesc = {
									pos_col_infos : [
									           {
									        	   pos_method : "GEOM",
									        	   table_columns : "",
									        	   pos_columns : "geom"
									           }
									]
							};
							
							var typeList = [];
							var geomList = [];
							for (var i=0; i<$commonAnalysisMap.ui.userLayerInfo.length; i++) {
								typeList.push($commonAnalysisMap.ui.userLayerInfo[i].type);
								geomList.push($commonAnalysisMap.ui.userLayerInfo[i].area);
							}
							
							params = {
									"data_nm" : dataNm,
									"action_type" : actionType,
									"geometry_type" : geometryType,
									"pos_column_desc" : JSON.stringify(posColumnDesc),
									"polygon_type" : typeList.join("@"),
									"geom" : geomList.join("@")
							}
						}
						break;
					case "company": //사업체 POI
					{
						//데이터명 설정
						var dataNm = "gis_" + $commonFunc.makeRandomDigitString(13);
						var actionType = "CREATE_POI";
						var geometryType = "POINT";
						var posColumnDesc = {
								pos_col_infos : [
								           {
								        	   pos_method : "XY",
								        	   table_columns : "",
								        	   pos_columns : "x,y"
								           }
								]
						};

						var poiList = [];
						if ($commonAnalysisMap.ui.userLayerInfo != null) {
							for (var i=0; i<$commonAnalysisMap.ui.userLayerInfo.length; i++) {
								var marker = $commonAnalysisMap.ui.userLayerInfo[i].layer;
								poiList.push(JSON.stringify({
									"corp_nm" : marker.options.title,
									"x" : marker.options.x,
									"y" : marker.options.y
								}));
							}
						}
						
						params = {
								"data_nm" : dataNm,
								"action_type" : actionType,
								"geometry_type" : geometryType,
								"pos_column_desc" : JSON.stringify(posColumnDesc),
								"poi" : poiList.join("@")
						}
					}
					break;
					default:
						break;
					}
				return params;
			}
			
	};
	
	//AJAX 내용작성
	$commonAnalysisApi.request = {
			
			/**
			 * 
			 * @name         : doReqInterstryCode
			 * @description  : 산업분류코드를 조회한다.
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param	depth : 트리뎁스
			 * @param class_deg : 사업체 차수(8,9차)
			 * @param class_cd : 산업분류코드 
			 */
			doReqInterstryCode : function(depth, class_deg, class_cd) {
				var options = {
						isBeforSend : false,
						method : "GET",
						params : {
							"accessToken" : accessToken,
							"class_deg" : class_deg
						}
				};
				
				if (class_cd != null) {
					options.params["class_code"] = class_cd;
				} 

				$ajax.requestApi(openApiPath+"/OpenAPI3/stats/industrycode.json", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							$commonAnalysis.ui.setIndustryData(res,depth, class_deg, class_cd );
							break;
						case -401:
							$commonAnalysis.request.doReqInterstryCode(depth, class_deg, class_cd);
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqSidoList
			 * @description  : 시도정보를 조회한다.
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param	base_year : 기준년도
			 */
			doReqSidoList : function(base_year, callback) {
				var options = {
						isBeforSend : false,
						params : {
							"base_year" : base_year
						}
				};

				$ajax.requestApi(contextPath + "/api/sop/getSidoAddressList.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (callback != undefined && callback != null && typeof callback === "function") {
								callback.call(undefined, res);
							}else {
								$commonAnalysis.ui.setSidoList(res);
							}
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqSggList
			 * @description  : 시군구정보를 조회한다.
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param	base_year : 기준년도
			 * @param sido_cd : 시도코드
			 */
			doReqSggList : function(base_year, sido_cd, callback) {
				var options = {
						isBeforSend : false,
						params : {
							"base_year" : base_year,
							"sido_cd" : sido_cd
						}
				};

				$ajax.requestApi(contextPath + "/api/sop/getSggAddressList.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (callback != undefined && callback != null && typeof callback === "function") {
								callback.call(undefined, res);
							}else {
								$commonAnalysis.ui.setSggList(res);
							}
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqAdmList
			 * @description  : 읍면동정보를 조회한다.
			 * @date         : 2018. 09. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param	base_year : 기준년도
			 * @param sido_cd : 시도코드
			 * @param sgg_cd : 시군구코드
			 */
			doReqAdmList : function(base_year, sido_cd, sgg_cd, callback) {
				var options = {
						isBeforSend : false,
						params : {
							"base_year" : base_year,
							"sido_cd" : sido_cd,
							"sgg_cd" : sgg_cd
						}
				};

				$ajax.requestApi(contextPath +"/api/sop/getAdmAddressList.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (callback != undefined && callback != null && typeof callback === "function") {
								callback.call(undefined, res);
							}else {
								$commonAnalysis.ui.setAdmList(res);
							}
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqUserData
			 * @description  : 사용자데이터를 조회한다.
			 * @date         : 2018. 09. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param	type :  geoData(위치데이터), analysisData(분석이력), shareData(공유데이터)
			 * @param startIdx : 시작번호
			 */
			doReqUserData : function(type, startIdx) {
				var options = {
						isBeforSend : false,
						params : {
							type : type,
							startIdx : startIdx,
							resultCnt : $commonAnalysis.ui.maxCntPerPage
						}
				};
				
				
				$ajax.requestApi(contextPath + "/api/analysis/getUserDataList.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							$("#userDataTable").empty();
							$("#userDataPage").show();
							
							var result = res.result;
							if (result.length > 0) {
								$commonAnalysis.ui.userDataList = result;
								var totalPage = Math.ceil( result[0].total / $commonAnalysis.ui.maxCntPerPage);
								$commonAnalysis.ui.userDataListViewPaging(result.length, totalPage, $commonAnalysis.ui.maxCntPerPage, result, $commonAnalysis.ui.currentPage);
								$commonAnalysis.ui.setUserDataListTable(result, $commonAnalysis.ui.maxCntPerPage, $commonAnalysis.ui.currentPage);
							}else {
								$("#userDataPage").hide();
								$commonAnalysis.ui.setEmptyListTable("userDataTable");
							}
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqInsertPolygonData
			 * @description  : 사용자 임의영역경계를 저장한다.
			 * @date         : 2018. 09. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param	dataNm :  데이터명
			 */
			doReqInsertPolygonData : function(dataNm, type, callback) {
				var params = $commonAnalysisApi.ui.setParams(type);
				params["description"] = $.trim(dataNm);
				
				var options = {
						isBeforSend : true,
						params : params
				};
				
				$ajax.requestApi(contextPath + "/api/analysis/setUserPolygonData.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (callback != undefined && callback != null && typeof callback === "function") {
								 params["resource_id"] = res.resource_id;
								 callback.call(undefined, res, params);
							 }
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqInsertPoiData
			 * @description  : 사용자 임의영역 POI를 저장한다.
			 * @date         : 2018. 12. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param	dataNm :  데이터명
			 */
			doReqInsertPoiData : function(dataNm, type,  callback) {
				var params = $commonAnalysisApi.ui.setParams(type);
				params["description"] = $.trim(dataNm);
				
				var options = {
						isBeforSend : true,
						params : params
				};
				
				$ajax.requestApi(contextPath + "/api/analysis/setUserPoiData.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (callback != undefined && callback != null && typeof callback === "function") {
								 params["resource_id"] = res.resource_id;
								 callback.call(undefined, res, params);
							 }
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqUserPolygonData
			 * @description  : 사용자 임의영역경계를 조회한다.
			 * @date         : 2018. 09. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type :  타입
			 * @param startIdx : 시작인덱스
			 */
			doReqUserPolygonData : function(type, startIdx) {
				var options = {
						isBeforSend : true,
						params : {
							type : type,
							startIdx : startIdx,
							resultCnt : $commonAnalysis.ui.maxCntPerPage
						}
				};
				
				$ajax.requestApi(contextPath + "/api/analysis/getUserPolygonDataList.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							$("#userPolygonDataTable").empty();
							$("#userPolygonDataPage").show();
							
							var result = res.result;
							if (result.length > 0) {
								$commonAnalysis.ui.userPolygonDataList = result;
								var totalPage = Math.ceil( result[0].total / $commonAnalysis.ui.maxCntPerPage);
								$commonAnalysis.ui.userPolygonDataListViewPaging(result.length, totalPage, $commonAnalysis.ui.maxCntPerPage, result, $commonAnalysis.ui.currentPage);
								$commonAnalysis.ui.setUserPolygonDataListTable(result, $commonAnalysis.ui.maxCntPerPage, $commonAnalysis.ui.currentPage);
							}else {
								$("#userPolygonDataPage").hide();
								$commonAnalysis.ui.setEmptyListTable("userPolygonDataTable");
							}
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqExecuteAnalysis
			 * @description  : 분석을 요청한다.
			 * @date         : 2018. 09. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param url :  url
			 * @param params : 파라미터 정보
			 * @param callback : 콜백정보
			 */
			doReqExecuteAnalysis : function(url, params, callback) {
				var options = {
						isBeforSend : true,
						params : params
				};
				
				$ajax.requestApi(url, options,  function(res) {
					if (res.success != undefined && res.success) {
						if (callback != undefined && callback != null && typeof callback === "function") {
							callback.call(undefined, res.data.EXECUTE_ID);
						}
					}else {
						if (res.reason == "null object") {
							$message.open("알림", "분석서버가 실행중이지 않거나 분석서버 내 문제로 인해 분석을 실행할 수 없습니다.<br/>관리자에게 문의부탁드립니다.");
						}else {
							$message.open("알림", "분석실행 중 문제가 발생하였습니다.<br/>분석조건을 다시 한번 확인해주세요.");
						}
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqExecuteAnalysisDetailInfo
			 * @description  : 분석상세정보를 저장한다.
			 * @date         : 2018. 09. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param url :  url
			 * @param executeId : 분석실행 아이디
			 * @param params : 상세 파라미터 정보
			 */
			doReqExecuteAnalysisDetailInfo : function(executeId, params) {
				params["execute_id"] = executeId;
				var options = {
						isBeforSend : true,
						params : params
				};
				
				$ajax.requestApi(contextPath + "/api/analysis/insertAnalysisParamInfo.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							
							setTimeout(function () {
								location.href=contextPath + "/view/myData/myDataManagement.do"
			                }, 3000)
							
							$message.open(
			        				"알림",
			        				"분석이 정상적으로 수행되었습니다.</br>분석대상의 공간적 영역 범위에 따라 소요시간이 길어질 수 있습니다.",
					    			 btns = [
						    			 {
						    			   title : "확인",
							    			   func : function(opt) {
							    				   opt.close();
							    				   window.location.href=contextPath + "/view/myData/myDataManagement.do"
							    			   }
							    		 }
					    			 ]
					    	);
							break;
						default:
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqChkAreaData
			 * @description  : 경계정보 체크
			 * @date         : 2018. 09. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param url :  url
			 * @param params : 상세 파라미터 정보
			 * @param callback : 콜백정보
			 */
			doReqChkAreaData : function(params, callback) {
				var options = {
						isBeforSend : false,
						params : params
				};
				
				$ajax.requestApi(mngDomain + "/api/my/myData/chkAreaData.do", options,  function(res) {
					if (res.success != undefined && res.success) {
						if (callback != undefined && callback != null && typeof callback === "function") {
							callback.call(undefined, res);
						}
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqChkOperationAnalysisAreaData
			 * @description  : 데이터간연산분석 경계데이터 같은지 체크.
			 * @date         : 2018. 09. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param url :  url
			 * @param params : 상세 파라미터 정보
			 * @param callback : 콜백정보
			 */
			doReqChkOperationAnalysisAreaData : function(params, callback) {
				var options = {
						isBeforSend : true,
						params : params
				};
				
				$ajax.requestApi(contextPath + "/api/analysis/getCheckOperationBoundary.do", options,  function(res) {
					if (callback != undefined && callback != null && typeof callback === "function") {
						callback.call(undefined, res);
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqRoadPolygonData
			 * @description  : 도로망 경계정보를 조회한다.
			 * @date         : 2018. 11. 19. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param adm_cd : 행정동코드
			 * @param callback : 콜백정보
			 */
			doReqRoadPolygonData : function(adm_cd, callback) {
				var options = {
						isBeforSend : true,
						params : {
							adm_cd : adm_cd
						}
				};
				
				$ajax.requestApi(contextPath + "/api/analysis/getRoadPolygonData.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (callback != undefined && callback != null && typeof callback === "function") {
								callback.call(undefined, res);
							}
							break;
						default:
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqBoundaryInfo
			 * @description  : 경계정보를 조회한다.
			 * @date         : 2018. 11. 19. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param adm_cd : 행정동코드
			 * @param callback : 콜백정보
			 */
			doReqBoundaryInfo : function(adm_cd, callback) {
				var options = {
						isBeforSend : true,
						params : {
							adm_cd : adm_cd,
							low_search : "0"
						}
				};
				
				$ajax.requestApi(contextPath + "/api/sop/getBoundaryInfo.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (callback != undefined && callback != null && typeof callback === "function") {
								callback.call(undefined, res);
							}
							break;
						default:
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqCompanyPoiList
			 * @description  : 사업체 POI 정보를 조회한다.
			 * @date         : 2018. 12. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 파라미터정보
			 * @param callback : 콜백정보
			 */
			doReqCompanyPoiList : function(params, callback) {
				var options = {
						isBeforSend : true,
						params : params
				};
				
				$ajax.requestApi(contextPath + "/api/analysis/getCompanyPoiData.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (callback != undefined && callback != null && typeof callback === "function") {
								callback.call(undefined, res);
							}
							break;
						default:
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqUserPoiList
			 * @description  : 사용자 POI 정보를 조회한다.
			 * @date         : 2018. 12. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 파라미터정보
			 * @param callback : 콜백정보
			 */
			doReqUserPoiList : function(params, callback) {
				var options = {
						isBeforSend : true,
						params : params
				};
				
				$ajax.requestApi(contextPath + "/api/analysis/getUserPoiData.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (callback != undefined && callback != null && typeof callback === "function") {
								callback.call(undefined, res);
							}
							break;
						default:
							break;
					}
				});
			}
	};

	
}(window,document));