
(function(W,D){
	W.$commonDataFunc = W.$commonDataFunc || {};
	
	$(document).ready(function(){
		$commonDataFunc.event.setUIEvent();
	});
	
	//UI 내용작성
	$commonDataFunc.ui = {
			map : null,
			
			/**
			 * 
			 * @name         : doFavorite
			 * @description  : 즐겨찾기를 수행한다.
			 * @date         : 2018. 11. 08. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doFavorite : function(resource_id, callback) {
				$message.open(
						"그룹공유", 
						"해당 분석결과를 즐겨찾기 하시겠습니까?",
						 btns = [
			    			 {
			    			   title : "즐겨찾기",
				    			   func : function(opt) {
				    				   opt.close();
				    				   $commonDataFunc.request.doReqFavorite(resource_id, function() {
				    					   if (callback != undefined && callback != null && typeof callback === "function") {
												callback.call(undefined);
				    					   }	
				    				   });
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
			},
			
			/**
			 * 
			 * @name         : doDataPreview
			 * @description  : 데이터 미리보기를 수행한다.
			 * @date         : 2018. 11. 08. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doDataPreview : function(data_name, resource_id, action_type, user_id) {
				$commonDataFunc.data.currentPage = 1;
				var startIdx = $commonDataFunc.data.currentPage;
				$commonDataFunc.ui.dataPreviewPopup = null;				
				
				$commonDataFunc.data.srtIdx = 0;
				$commonDataFunc.data.resource_id = resource_id;
				$commonDataFunc.data.data_name = data_name;
				$commonDataFunc.data.user_id = user_id;
				
				var pageIdx;
				pageIdx = $commonDataFunc.data.currentPage;
				var showListCount = 10;
				var startIdx = showListCount * (pageIdx -1);
				
				$commonDataFunc.request.doReqResourceInfo(startIdx,showListCount,user_id,data_name,resource_id, function(res) {
					$commonDataFunc.data.allData = res;
					var columnInfo = JSON.parse(res.data.info.kor_column_desc);
					var rowList = res.data.resource;

					if (res.data != undefined) {
						var result = res.data;
						var maxCntPerPage = showListCount
						var totalPage = Math.ceil(parseInt(result.info.data_cnt) / maxCntPerPage);
						
						$commonDataFunc.ui.drawGrid($commonDataFunc.ui.getDataGridInfo(result));
						
						//팝업호출
						if(typeof $commonDataFunc.ui.dataPreviewPopup == "undefined" || $commonDataFunc.ui.dataPreviewPopup == null ){ // 팝업이 없을 경우만 
							$commonDataFunc.ui.dataPreviewPopup = $commonDataFunc.ui.createPopup("#dataView", "데이터 미리보기", 1200, 752);
							try {
								$commonDataFunc.ui.setDataListViewPaging(result[0].total, totalPage, maxCntPerPage, result, $commonDataFunc.data.currentPage);
							} catch(e) {}
						
						
							//가로 스크롤 생성
							$("#dataViewTable").css("display","inline-block");
							var trWidth = $("#dataViewTable > tbody > tr").width();
							if(trWidth < 1141){
								$("#dataViewTable").css("display","inline-table");
							}
						}
					}
				});
				
				
			},
			
			/**
			 * 
			 * @name         : drawGrid
			 * @description  : 그리드정보를 표출한다.
			 * @date         : 2018. 11. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param html : html 정보
			 */
			drawGrid : function(html) {
				$("#dataViewTable").empty();
				$("#dataViewTable").html(html);
				
			},
			
			/**
			 * 
			 * @name         : getListNo
			 * @description  : 순번정보를 설정한다.
			 * @date         : 2018. 11. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param idx    : 인덱스 번호
			 */
			getListNo : function(idx) {
				var no = ($commonDataFunc.data.srtIdx + idx) + 1;
				return no;
			},
			/**
			 * 
			 * @name         : getDataGridInfo
			 * @description  : 위치정보를 설정한다.
			 * @date         : 2018. 11. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data : 위치정보
			 */
			getDataGridInfo : function(data) {
				var columnInfo = JSON.parse(data.info.kor_column_desc);
				var columnList  = [];
				var dataList = data.resource;
				
				var html  = "<colgroup>";
				 	  html +=		"<col width='60' style='width:60px;'>";
				for (var i=0; i<columnInfo.length; i++) {
					columnList.push(columnInfo[i].column_id);
					//html +=	"<col width='120' style='width:120px;'>";
					html +=	"<col width=''>";
				}
			    html += 		"</colgroup>";
				html += "<tr>"
				html += "<th style='min-width:60px;'>순번</th>"; 	
				for (var i=0; i<columnInfo.length; i++) {
					  html += "<th style='min-width:150px;'>" + columnInfo[i].column_name + "</th>";
				}
				html += "</tr>";

				for (var i=0; i<dataList.length; i++) {
					html +=	"<tr>";
					html +=	"<td>" + $commonDataFunc.ui.getListNo(i) + "</td>";
					for (var j=0; j<columnList.length; j++) {
						var id = columnList[j].toLowerCase();
						//html +=	"<td>" + dataList[i][id]+ "</td>";
						html +=	"<td><div class ='previewTd'>" + dataList[i][id]+ "</div></td>";
					}
					html +=	"</tr>";
				}
				
				return html;
			},
			
			
			/**
			 * 
			 * @name         : setDataListViewPaging
			 * @description  : 미리보기 페이징을 생성한다.
			 * @date         : 2018. 11. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param totalCount: 데이터 갯수
			 * @param totalPage : 총페이지 갯수
			 * @param pageSize : 한페이지당 데이터 갯수
			 * @param data :데이터
			 * @papram pageIndex : 페이지 인덱스
			 */
			setDataListViewPaging : function(totalCount, totalPage, pageSize, data, pageIndex) {
				$('#gridPaging').paging({
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
						
						$commonDataFunc.data.currentPage = page;
						$commonDataFunc.data.srtIdx = (page - 1) * pageSize;
						var resource_id = $commonDataFunc.data.resource_id;
						var data_name = $commonDataFunc.data.data_name;
						var user_id = $commonDataFunc.data.user_id;
						
						var showListCount = 10;
						var startIdx = showListCount * (page -1);
						$commonDataFunc.data.srtIdx = (page - 1) * pageSize;
						
						$commonDataFunc.request.doReqResourceInfo(startIdx,showListCount,user_id,data_name,resource_id, function(res) {
							$commonDataFunc.data.allData = res;
							var columnInfo = JSON.parse(res.data.info.kor_column_desc);
							var rowList = res.data.resource;
							if (res.data != undefined) {
								var result = res.data;
								var maxCntPerPage = showListCount
								var totalPage = Math.ceil(parseInt(result.info.data_cnt) / maxCntPerPage);
								
								$commonDataFunc.ui.drawGrid($commonDataFunc.ui.getDataGridInfo(result));
								$commonDataFunc.ui.setDataListViewPaging(result[0].total, totalPage, maxCntPerPage, result, $commonDataFunc.data.currentPage);
							}
						});
					}
				});
			},
			
			/**
			 * 
			 * @name         : doPolygonPreview
			 * @description  : 지도 미리보기 화면을 표출한다.
			 * @date         : 2018. 11. 21. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data_name : 테이블명
			 * @param scheme : 스키마명
			 */
			doPolygonPreview : function(data_name, scheme) {
				$commonDataFunc.request.doReqUserBoundaryData(data_name, scheme, function(res) {
					$commonDataFunc.ui.mapPopup = $commonDataFunc.ui.createPopup("#mapPopup", "데이터 미리보기", 950,  690);
					$commonDataFunc.ui.createMapView(res);
				});
			},
			
			/**
			 * 
			 * @name         : createMapView
			 * @description  : 지도를 생성한다.
			 * @date         : 2018. 11. 21. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data : 경계 데이터
			 */
			createMapView : function(data) {
				
				//기존 맵 삭제
				if (this.map != null) {
					this.map.gMap.remove();
					$("#commonMap").empty();
				}
				
				//지도 생성
				var map = new sMap.map();
				map.createMap($commonDataFunc, "commonMap", {
					center : [ 989674, 1818313 ],
					zoom : 8,
					measureControl : false,
					statisticTileLayer: true
				});
				
				var btnInfo = new $mapBtn.btnInfo(map, $commonDataFunc);
				map.mapBtnInfo = btnInfo;
				
				this.map = map;
				
				var options = {
						intrPoiControl : false,
						intrSettingControl : false,
						mapTypeControl : false,
						intrZoomControl : false
				};
				btnInfo.createUI(options);
				
				map.gMap.whenReady(function() {
					var result = data.result;
					if (result.length > 0) {
						var geojson = map.convertFeatureData(result, "", "", "normal");
						map.addPolygonGeoJson(geojson, "polygon");
						
						if (map.geojson != null) {
							map.geojson.eachLayer(function(layer) {
								layer.setStyle({
									weight : 3,
									color : "#F06292",
									dashArray : "",
									fillOpacity : 0.3,
									fillColor : "#F06292"
								});
							});
						}
						
						bounds = map.geojson.getBounds();
						if (bounds != null) {
							map.gMap.fitBounds(bounds, {
								animate : false
							});
						}
					}
				});
			},
			
			/**
			 * 
			 * @name         : doShare
			 * @description  : 그룹공유를 수행한다.
			 * @date         : 2018. 10. 25. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param id : 맵 엘리먼트 아이디
			 * @param resource_id : 데이터 리소스 아이디
			 * @param callback :  콜백함수
			 */
			doShare : function(id, resource_id, callback) {
				$commonDataFunc.ui.showSharePopup(function() {
					var content = $.trim($("#popTextArea").val())
					if (content.lenth == 0 || content == "") {
						$message.open("알림", "설명문구를 입력하세요.");
						return;
					}else {
						$message.open(
								"그룹공유", 
								"해당 분석결과를 그룹공유 하시겠습니까?",
								 btns = [
					    			 {
					    			   title : "공유",
						    			   func : function(opt) {
						    				   if ( $commonDataFunc.ui.sharePopup != null) {
						    					   $commonDataFunc.ui.sharePopup.close();
						    				   }
						    				   opt.close();
						    				   
						    				   content = content.replace(/(\n|\r\n)/g, '<br>');
						    				   
						    				   if (id != undefined && id != null) {
						    					   $commonDataFunc.util.doCapture(id, function(data) {
							    					   $commonDataFunc.request.doReqSaveCaptureImage(data, function(res) {
							    						   var params = {
							    								   "yn" : "Y",
							    								   "resource_id" : resource_id,
							    								   "attach" : JSON.stringify(res.result),
							    								   "content" : content
							    						   };
							    						   $commonDataFunc.request.doReqShare(params, function() {
							    							   if (callback != undefined && callback != null && typeof callback === "function") {
																	callback.call(undefined);
							    							   }	
									    				   });
							    					   });
							    				   });
						    				   }else {
						    					   var params = {
					    								   "yn" : "Y",
					    								   "resource_id" : resource_id,
					    								   "content" : content
					    						   };
					    						   $commonDataFunc.request.doReqShare(params, function() {
					    							   if (callback != undefined && callback != null && typeof callback === "function") {
															callback.call(undefined);
					    							   }	
							    				   });
						    				   }
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
				});
			},
			
			/**
			 * 
			 * @name         : doSendSgis
			 * @description  : SGIS 전송신청을 체크를 수행한다.
			 * @date         : 2018. 11. 06. 
			 * @author	     : 최재영
			 * @history 	 :	2018.11.07 권차욱 수정
			 * @param user_id : 사용자아이디
			 * @param resource_id :  데이터 리소스 아이디
			 * @param callback :  콜백함수
			 */
			doSendSgis : function(user_id, resource_id, callback) {
				$commonDataFunc.request.doReqCheckTransfer(user_id, resource_id, function(res) {
					$commonDataFunc.ui.showSgisInfo(res);
				});
			},
			
			/**
			 * 
			 * @name         : doApply
			 * @description  : SGIS 전송신청을 수행한다.
			 * @date         : 2018. 11. 06. 
			 * @author	     : 최재영
			 * @history 	 :	2018.11.07 권차욱 수정
			 */
			doApply : function(status) {
				var resource = this.checkTransferInfo.resource;
				var data_nm = this.checkTransferInfo.resource.data_nm;
				var srvNm = $("#info_link_srv_nm").val();
				var srvRealm = $("#info_link_srv_realm").val();
				var openDataNm = $.trim($("#open_data_nm").val()); 
				
				if(openDataNm == ""){
					$message.open("알림","신청이름을 입력해주세요.");
					return;
				}else{
					var data = {
							action_name : data_nm,
							kairos_table_name : data_nm,
							save_type : "APPEND",
							open_data_nm : openDataNm,
							info_link_srv_nm : srvNm,
							info_link_srv_realm : srvRealm,
							SYS_URL : "",
							SYS_CD : "S"
					}
					if(status == "new"){
						$commonDataFunc.request.doReqTransfer(resource.resource_id, data, function() {
							$commonDataFunc.ui.sgisSendPopup.close();
						});
					}else{
						$commonDataFunc.request.doReqRetryTransfer(resource.resource_id, data, function() {
							$commonDataFunc.ui.sgisSendPopup.close();
						});	
					}
					
				}
			},
			
			/**
			 * 
			 * @name         : doCancelApply
			 * @description  : SGIS 전송신청 취소를 수행한다.
			 * @date         : 2018. 11. 06. 
			 * @author	     : 최재영
			 * @history 	 :	2018.11.07 권차욱 수정
			 */
			doCancelApply : function() {
				var data_nm = this.checkTransferInfo.resource.data_nm;
				var resource_id = this.checkTransferInfo.resource.resource_id;
				
				//신청취소 요청
				$commonDataFunc.request.doReqCancelTransfer(resource_id, data_nm, function() {
					$commonDataFunc.ui.sgisSendPopup.close();
				});	
			},
			
			/**
			 * 
			 * @name         : doRetrySend
			 * @description  : SGIS 재전송 요청을 수행한다.
			 * @date         : 2018. 11. 06. 
			 * @author	     : 최재영
			 * @history 	 :	2018.11.07 권차욱 수정
			 */
			doRetrySend : function() {
				var data_nm = this.checkTransferInfo.resource.data_nm;
				var resource_id = this.checkTransferInfo.resource.resource_id;
				/*$commonDataFunc.ui.sgisSendPopup.close();*/
				$("#applyView").show();
				$("#checkView").hide();
				$(".pSgisBtn").hide();
				$("#applyBtn").show();
				$("#applyBtn").data("type","modify");
				//신청취소 요청
				/*$commonDataFunc.request.doReqRetryTransfer(resource_id, data_nm, function() {
					$commonDataFunc.ui.sgisSendPopup.close();
				});	*/
			},
			
			/**
			 * 
			 * @name         : doFileDownload
			 * @description  : 파일다운로드 요청을 수행한다..
			 * @date         : 2018. 11. 06. 
			 * @author	     : 최재영
			 * @history 	 :	2018.11.07 권차욱 수정
			 * @param scheme : 스키마
			 * @param resource_id : 데이터 리소스 아이디
			 */
			doFileDownload : function(scheme, resource_id) {
				$message.open(
						"다운로드", 
						"확장자 : <select class='downFormat' style='width:80%' id='downloadType'>" +
						"<option value='txt'>text</option>" +
						"<option value='xlsx'>excel</option>" +
						"<option value='shp'>shp</option>"+
						"</select>",
						 btns = [
			    			 {
			    			   title : "다운로드",
				    			   func : function(opt) {
				    				   opt.close();
				    				   
				    				   var downLoadList = new Array();
				    				   var obj = {
				    						   id : String(resource_id),
				    						   type : $("#downloadType").val()
				    				   };
				    				   downLoadList.push(obj);
				    				   $commonDataFunc.request.doReqDownLoad(downLoadList, scheme);
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
			},
			
			/**
			 * 
			 * @name         : doMultiFileDownLoad
			 * @description  : 멀티 파일다운로드 요청을 수행한다..
			 * @date         : 2018. 11. 06. 
			 * @author	     : 최재영
			 * @history 	 :	2018.11.07 권차욱 수정
			 * @param downloadList : 다운로드 데이터 정보
			 * @param scheme : 스키마
			 */
			doMultiFileDownLoad : function(downloadList, scheme) {
				if (downloadList.length > 0) {
					var html = "";
					for (var i=0; i<downloadList.length; i++) {
						html +=	"<tr class='h50'>";
						html += 		"<td style='text-align:left;padding-left: 20px;'>" + downloadList[i].data_nm + "</td>";
						html += 		"<td>";
						html +=			"<select id='"+downloadList[i].resource_id+"' class='downFormat downloadSelectBox'>";
						
						//파일형식
						var format = downloadList[i].format.split(",");
						for (var j=0; j<format.length; j++) {
							html +=			"<option value='"+format[j]+"'>"+format[j]+"</option>";
						}

						html +=			"</select>";
						html +=		"</td>"
						html +=	"</tr>";
					}
					
					$("#downloadPopup").find("#fileCnt").html("총 "+downloadList.length+ " 개의 데이터가 다운로드 됩니다.");
					$("#downloadPopup").find(".fileDownloadTable").empty();
					$("#downloadPopup").find(".fileDownloadTable").append(html);
					$("#fileDownloadArea").attr("data-scheme", scheme);
					
					var height = $("#fileDownloadArea").parent().height() + 150;
					
					this.fileDownloadPopup = this.createPopup("#downloadPopup", "파일다운로드", 700,  height);

				}
			},
			
			/**
			 * 
			 * @name         : doReqMultiFileDownload
			 * @description  : 멀티 파일 다운로드를 수행한다.
			 * @date         : 2018. 11. 06. 
			 * @author	     : 최재영
			 * @history 	 :	2018.11.07 권차욱 수정
			 */
			doReqMultiFileDownload : function() {
				var scheme = $("#fileDownloadArea").data("scheme");
				var el = $(".downloadSelectBox");
				var downloadList = [];
				el.each(function() {
					var resource_id = $(this).attr("id");
					var format = $(this).val();
					
					downloadList.push({
						id : resource_id,
						type : format
					});
				});
				
				
				var log_param = "";
				
				for(var i = 0; i < downloadList.length; i++) {
					if(i != 0) {
						log_param += ", ";
					}
					
					log_param += "[Resource_id - " + downloadList[i].resource_id;
					log_param += ", File_format - " + downloadList[i].format;
					log_param += "]";
				}
				
				$log.srvLogWrite("Z0", "03", "02", "04", "", log_param);
				

				if (downloadList.length > 0) {
					$commonDataFunc.request.doReqDownLoad(downloadList, scheme);
				}else {
					$message.open("다운로드할 대상이 없습니다.");
				}
				this.fileDownloadPopup.close();
			}, 
				
			/**
			 * 
			 * @name         : showSharePopup
			 * @description  : 공유팝업을 표출한다.
			 * @date         : 2018. 10. 05. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param callback : 콜백함수
			 */
			showSharePopup : function(callback) {
				  this.sharePopup = this.createPopup("#sharePopup", "공유하기", 600,  390, callback);
			},
			
			/**
			 * 
			 * @name         : showSgisInfo
			 * @description  : SGIS로 파일 전송 신청을 수행한다.
			 * @date         : 2018. 10. 05. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param res : 결과정보
			 */
			showSgisInfo : function(res){
				$commonDataFunc.ui.checkTransferInfo = res;
				//SGIS 전송신청이 없을 경우
				if(res.info.cnt == 0){
					//팝업호출
					$("#applyView").show();
					$("#checkView").hide();
					$(".pSgisBtn").hide();
					$("#applyBtn").show();
					$("#applyBtn").data("type","new");
					this.sgisSendPopup = $commonDataFunc.ui.createPopup("#sgisSendPopup", "SGIS 전송 신청", 450, 310);		
				}else{
					var step = res.info.req.procs_state_cd;
					
					//전송상태 이미지 초기화
					$("#applyView").hide();
					$("#checkView").show();
					$("#sendStatus").removeClass("sts02");
					$("#sendStatus").removeClass("sts03");
					this.sgisSendPopup = $commonDataFunc.ui.createPopup("#sgisSendPopup", "SGIS 전송상태", 430, 310);	
					
					switch(step){
						case "REQ" : //신청
							$("#sendTitle").html("SGIS+로 전송신청이 접수되어 검토중에 있습니다.");
							$("#sendStatus").addClass("sts02");
							$(".pSgisBtn").hide();
							$("#sendCancelBtn").show();
							break;
						case "GRA" :	//승인(승인만)
							$("#sendTitle").html("SGIS+로 전송신청이 승인되었습니다.");
							$("#sendStatus").addClass("sts02");
							$("#applyBtn").hide();
							$(".pSgisBtn").hide();
							$("#cancelBtn").html("확인");
							break;
						case "ERR" :	//승인(실패)
							$("#sendTitle").html("SGIS+로 전송중 실패하였습니다.");
							$("#sendStatus").addClass("sts02");
							$("#applyBtn").hide();
							$(".pSgisBtn").hide();
							$("#cancelBtn").html("확인");
							break;				
						case "END" :	//승인(완료)
							$("#sendTitle").html("SGIS+로 전송이 성공하였습니다.");
							$("#sendStatus").addClass("sts03");
							$("#applyBtn").hide();
							$(".pSgisBtn").hide();
							$("#cancelBtn").html("확인");
							break;										
						case "RET" : //거절
							$("#sendTitle").html("SGIS+로 전송신청이 거절되었습니다.");
							$("#sendStatus").addClass("sts01");
							$(".pSgisBtn").hide();
							$("#retrySendBtn").show();
							break;
					}
					
					//팝업호출
				}
			},
			
			/**
			 * 
			 * @name         : createPopup
			 * @description  : 팝업을 생성한다.
			 * @date         : 2018. 11. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param id : 팝업 아이디
			 * @param title :  팝업 제목
			 * @param w :  팝업 너비
			 * @param h : 팝업 높이
			 * @param callback :  콜백함수
			 */
			createPopup : function(id, title, w, h, callback) {
				var popup = $(id).dialog({
					title : title,
					width : w + "px",
					height: h + "px"
				});
				$commonDataFunc.event.setPopupEvent(callback);	
				return popup;
			},
			
			
	};
	
	$commonDataFunc.util = {
			
			/**
			 * 
			 * @name         : doCapture
			 * @description  : 지도 캡쳐를 수행한다.
			 * @date         : 2018. 10. 25. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param id : 지도아이디
			 * @param callback : 콜백함수
			 */
			doCapture : function (id, callback) {
				var agent = navigator.userAgent.toLowerCase();
					if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
						html2canvas($(id), {
							logging: false,
			                useCORS: false,
			                proxy: contextPath+"/api/common/getCaptureImageData.jsonp",
			 				onrendered: function(canvas) {
			                	var data = canvas.toDataURL();
			                	if (callback != undefined && callback != null && typeof callback === "function") {
									 callback.call(undefined, data);
								 }
			 				}
			 			});
					} else {
						html2canvas($(id)[0], {
							logging: false,
		                    useCORS: false,
		                    proxy: contextPath+"/api/common/getCaptureImageData.jsonp"
						}).then(function(canvas) {
							var data = canvas.toDataURL();
		                	if (callback != undefined && callback != null && typeof callback === "function") {
								 callback.call(undefined, data);
							 }
			 			});
					}
			},
			
			/**
			 * 
			 * @name         : getChartSvgData
			 * @description  : 그래프를 캡쳐한다.
			 * @date         : 2018. 10. 25. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param id : 그래프 아이디
			 */
			getChartSvgData : function (id){
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
	};
	
	//AJAX 내용작성
	$commonDataFunc.request = {
			
			/**
			 * 
			 * @name         : doReqFavorite
			 * @description  : 즐겨찾기를 요청한다.
			 * @date         : 2018. 11. 08. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param resourceId    : 분석결과 아이디
			 * @param callback : 콜백함수
			 */
			doReqFavorite : function(resourceId, callback) {
				var options = {
						isBeforSend : true,
						method : "POST",
						params : {
							yn : "Y",
							resource_id : resourceId
						}
				};
				$ajax.requestApi(contextPath+"/api/myData/favorite.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (callback != undefined && callback != null && typeof callback === "function") {
								callback.call(undefined, res);
							}	
							$message.open("알림", "즐겨찾기를 완료하였습니다.");
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqResourceInfo
			 * @description  : 데이터 미리보기를 요청한다
			 * @date         : 2018. 11. 08. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param resourceId    : 분석결과 아이디
			 * @param callback : 콜백함수
			 */
			doReqResourceInfo : function(startIdx,resultCnt,user_id,data_name,resource_id, callback){
				$.ajax({
					url : contextPath+"/api/myData/selectResourceInfo.do",
					type : "POST",
					data : {
						schema : user_id,
						data_nm : data_name,
						resultCnt : Number(startIdx) + Number(resultCnt),
						startIdx : startIdx,
						resource_id : resource_id
					},
					
					beforeSend : function(){
						$mask.show();
					},
					success : function(res) {
						if (res.data != undefined) {
							if (callback != undefined && callback != null && typeof callback === "function") {
								callback.call(undefined, res);
							}
						}
					},
					error : function(xhr, textStatus, error) {
						console.log(error);
					},
					complete : function(data) {
						$mask.hide();
					}
				});
				
			},
			
			/**
			 * 
			 * @name         : doReqShare
			 * @description  : 그룹공유을 요청한다.
			 * @date         : 2018. 10. 25. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param resourceId    : 분석결과 아이디
			 * @param callback : 콜백함수
			 */
			doReqShare : function(params, callback) {
				var options = {
						isBeforSend : true,
						method : "POST",
						params : params
				};
				$ajax.requestApi(contextPath+"/api/myData/share.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (callback != undefined && callback != null && typeof callback === "function") {
								callback.call(undefined, res);
							}	
							$message.open("알림", "그룹공유를 완료하였습니다.");
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqSaveCaptureImage
			 * @description  : 캡쳐이미지를 저장한다.
			 * @date         : 2018. 11. 09. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data : 이미지정보
			 * @param callabck :  콜백정보
			 */
			doReqSaveCaptureImage : function(data, callback) {
					var base64ImageContent = data.replace(/^data:image\/(png|jpg);base64,/, "");				
					var options = {
							isBeforSend : true,
							method : "POST",
							params : {
								data : base64ImageContent
							}
					};
					$ajax.requestApi(contextPath+"/api/common/saveCaptureImage.do", options,  function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								if (callback != undefined && callback != null && typeof callback === "function") {
									callback.call(undefined, res);
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
			 * @name         : doReqCheckTransfer
			 * @description  : SGIS 전송 체크
			 * @date         : 2018. 10. 10. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param user_id : user_id
			 * @param resourceId    : resourceId
			 * @param callback : 콜백함수
			 */
			doReqCheckTransfer : function(user_id, resourceId, callback){
				var options = {
						isBeforSend : true,
						method : "POST",
						params : {
							resource_id : resourceId,
							user_id : user_id
						}
				};
				$ajax.requestApi(contextPath+"/api/dataTransfer/checkTransfer.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (callback != undefined && callback != null && typeof callback === "function") {
								callback.call(undefined, res);
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
			 * @name         : doReqTransfer
			 * @description  : SGIS 전송
			 * @date         : 2018. 10. 24. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param resource_id :  데이터 리소스 아이디
			 * @param data : 데이저
			 * @param callback :  콜백함수
			 */
			doReqTransfer : function(resource_id , data, callback){
				var options = {
						isBeforSend : true,
						method : "POST",
						params : {
							resource_id : resource_id,
							data : JSON.stringify(data),
						}
				};
				$ajax.requestApi(contextPath+"/api/dataTransfer/reqTransfer.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (callback != undefined && callback != null && typeof callback === "function") {
								callback.call(undefined, res);
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
			 * @name         : doReqCancelTransfer
			 * @description  : SGIS 전송 취소
			 * @date         : 2018. 10. 24. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param resource_id : 리소스 아이디
			 * @param data_nm :  데이터명
			 * @param callback : 콜백함수
			 */
			doReqCancelTransfer : function(resource_id , data_nm, callback){
				var options = {
						isBeforSend : true,
						method : "POST",
						params : {
							resource_id : resource_id,
							data_nm : data_nm,
						}
				};
				$ajax.requestApi(contextPath+"/api/dataTransfer/cancelReqTransfer.do", options,  function(res) {
					console.log(res);
					switch(parseInt(res.errCd)) {
						case 0:
							if (callback != undefined && callback != null && typeof callback === "function") {
								callback.call(undefined, res);
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
			 * @name         : doReqRetryTransfer
			 * @description  : 전송 요청
			 * @date         : 2018. 10. 24. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param resource_id : 데이터 리소스 아이디
			 * @param data_nm : 데이터명
			 * @param callback : 콜백 함수
			 */
			doReqRetryTransfer : function(resource_id , data , callback){
				console.log(data);
				console.log(JSON.stringify(data));
				console.log(data.open_data_nm);
				//resource_id : resource_id,
				//open_data_nm : data.open_data_nm,
				//info_link_srv_nm : data.info_link_srv_nm,
				//info_link_srv_realm : data.info_link_srv_realm
				data.resource_id = resource_id
				var options = {
						isBeforSend : true,
						method : "POST",
						params : {
							resource_id : resource_id,
							data : JSON.stringify(data),
						}
				};
				$ajax.requestApi(contextPath+"/api/dataTransfer/retryReqTransfer.do", options,  function(res) {
					console.log(res);
					switch(parseInt(res.errCd)) {
						case 0:
							if (callback != undefined && callback != null && typeof callback === "function") {
								callback.call(undefined, res);
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
			 * @name         : doReqDownLoad
			 * @description  : 데이터 다운로드
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param downLoadList : 다운로드 정보
			 * @param schema : 스키마 정보
			 */
			doReqDownLoad : function(downLoadList, schema){
				var options = {
						isBeforSend : true,
						method : "POST",
						params : {
							list : JSON.stringify(downLoadList),
							schema : schema
						}
				};
				$ajax.requestApi(contextPath+"/api/myData/downLoad.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var url = contextPath+"/api/myData/getFile.do";
							window.open(url,"_self","enabled");
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqUserBoundaryData
			 * @description  : 사용자경계정보를 조회한다.
			 * @date         : 2018. 10. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param table_nm    : 테이블명
			 * @param scheme : 스키마정보
			 * @param callback : 콜백함수
			 */
			doReqUserBoundaryData : function(table_nm, scheme, callback) {
				var options = {
						isBeforSend : true,
						method : "POST",
						params : {
							"table_nm" : table_nm,
							"scheme" : scheme
						}
				};
				$ajax.requestApi(contextPath + "/api/analysis/getBoundaryData.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (res.result.length > 0) {
								if (callback != undefined && callback != null && typeof callback === "function") {
									callback.call(undefined, res);
								}
							}
							break;
						case -401:
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			}
			
	};
	
	$commonDataFunc.callbackFunc = {
			
			/**
			 * 
			 * @name         : didMouseOutPolygon
			 * @description  : 해당경계 mouse out 시, 발생하는 콜백함수
			 * @date         : 2018. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 일반경계 및 데이터경계 타입
			 */
			didMouseOutPolygon : function(event, data, type, map) {
				if ($commonDataFunc.ui.type != "polygon") {
					if (map.geojson != null) {
						map.geojson.eachLayer(function(layer) {
							layer.setStyle({
								weight : 3,
								color : "#F06292",
								dashArray : "",
								fillOpacity : 0.3,
								fillColor : "#F06292"
							});
						});
					}
				}
			},
	};
	
	//EVENT 내용작성
	$commonDataFunc.event = {
			
			setUIEvent : function(){

			},
			
			setPopupEvent : function(callback) {
				
				//공유하기
				$("#shareBtn").off().on("click", function() {
					console.log("공유하기");
					if (callback != undefined && callback != null && typeof callback === "function") {
						callback.call(undefined);
					}		
				});
				
				//공유취소
				$("#shareCancelBtn").off().on("click", function() {
					console.log("공유취소");
					$commonDataFunc.ui.sharePopup.close();
				});
				
				//데이터 미리보기 취소
				$("#dataViewCancelBtn").off().on("click", function() {
					$commonDataFunc.ui.dataPreviewPopup.close();
				});
				
				//전송신청버튼 이벤트
				$("#applyBtn").on("click", function() {
					$commonDataFunc.ui.doApply($(this).data("type"));
				});
				
				//취소버튼 이벤트
				$("#cancelBtn").on("click", function() {
					$commonDataFunc.ui.sgisSendPopup.close();
				});
				
				//전송취소버튼 이벤트
				$("#sendCancelBtn").on("click", function() {
					$commonDataFunc.ui.doCancelApply();
				});
				
				//재전송버튼 이벤트
				$("#retrySendBtn").on("click", function() {
					$commonDataFunc.ui.doRetrySend();
				});
				
				//파일다운로드 이벤트
				$("#downloadBtn").on("click", function() {
					$commonDataFunc.ui.doReqMultiFileDownload();
				});
				
				//파일다운로드 취소
				$("#downloadCancelBtn").on("click", function() {
					$commonDataFunc.ui.fileDownloadPopup.close();
				});
				
				//맵 팝업 취소
				$("#mapCancelBtn").on("click", function() {
					$commonDataFunc.ui.mapPopup.close();
				});
				
				
				//SGIS 전송 콤보박스 이벤트
				$("#info_link_srv_nm").on("change", function() {
					var srv = $("#info_link_srv_nm option:selected").data("srv");
					switch(parseInt(srv)) {
						case 1:
							$("#info_link_srv_realm_area").show();
							break;
						case 2:
						case 3:
							$("#info_link_srv_realm_area").hide();
							break;
						default:
							break;
					}
				});
			}
	};
	$commonDataFunc.data = {
			allData : null,
			resourceInfo : null,
			resourceList : null,
			kor_column_desc : null,
			total : null,
			currentPage : 1,
			schema : null,
			data_nm : null,
			state : 'read',
			/*modifyStatus : false,*/
			deleteRow : new Array(),
			deleteColumn : new Array(),
			addRow : new Array(),
			
			resource_id : null,
			data_name : null,
			user_id : null,
			srtIdx : 0,
			
			setKorColumnDesc : function(){
				var columnInfo = $dataPreviewDetail.data.kor_column_desc;
				var columnDataType = JSON.parse($("#columnDataType").val());
				
				for(var i = 0; i < columnInfo.length; i++){
					var column_id = columnInfo[i].column_id;
					for(var j = 0 ; j < columnDataType.length; j++){
						if(column_id.toLowerCase() == columnDataType[j].column_name){
							columnInfo[i].dataType = columnDataType[j].data_type;
							break;
						}
					}
				}
				$dataPreviewDetail.data.kor_column_desc = columnInfo;
			}
	};
	
}(window,document));