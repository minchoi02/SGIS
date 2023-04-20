(function(W,D){
	W.$shareBoardDetail = W.$shareBoardDetail || {};
	$(document).ready(function(){
		$shareBoardDetail.event.setUIEvent();
			
	});
	
	$shareBoardDetail.ui = {
			currentPage : 1,
			srtIdx : 0,
			currentReplyPage : 1,
			maxCntReplyPage : 5,
			replySrtIdx : 0,

			/**
			 * 
			 * @name         : doShareBoardDetailView
			 * @description  : 공유데이터 상세정보 설정
			 * @date         : 2018. 11. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type : 데이터 타입
			 * @param data : 공유데이터 상세정보
			 */
			doShareBoardDetailView : function(type, data) {
				if (data != undefined && data != null && data != "") {
					var shareBoardDetailInfo = JSON.parse(data);
					this.shareBoardDetailInfo = shareBoardDetailInfo;
					this.shareBoardDetailInfo ["type"] = type;
					console.log(shareBoardDetailInfo);
					//공유데이터 제목
					if(shareBoardDetailInfo.kor_data_nm != undefined && shareBoardDetailInfo.kor_data_nm  != '' && shareBoardDetailInfo.kor_data_nm  != null){
						$("#shareBoardTitle").html(shareBoardDetailInfo.kor_data_nm);
					}else{
						$("#shareBoardTitle").html(shareBoardDetailInfo.description);
					}
					
					
					
					
					
					//공유데이터 등록일자
					$("#shareBoardRegtime").html(shareBoardDetailInfo.data_create_time);
					
					//공유데이터 내용
					shareBoardDetailInfo.content = shareBoardDetailInfo.content.replace(/(<br>|&lt;br&gt;)/g, '\r\n');
					$("#shareBoardContent").html(shareBoardDetailInfo.content);
					
					//로그인한 사용자와 공유게시판 사용자가 같을 경우
					//삭제버튼 생성
					var user_id = $("#user_id").html();
					if (shareBoardDetailInfo.user_id == user_id) {
						$("#deleteShareBoardBtn").show();
						$("#modifyShareBoardBtn").show();
					}
					
					if (type == "analysis") {
						//썸네일 이미지 설정
						if (shareBoardDetailInfo.image_data != undefined) {
							this.setThumnailImage(shareBoardDetailInfo.image_data, shareBoardDetailInfo.image_width, shareBoardDetailInfo.image_height);
						}
						
						//분석데이터 조회
						this.doAnalysisData(0);
					}else {
						//위치/원본데이터 조회
						this.doGeoData(0);
					}
					
					//댓글정보 조회
					this.doShareBoardReplyList(0);
				}
			},
			
			/**
			 * 
			 * @name         : doAnalysisData
			 * @description  : 분석데이터정보를 요청한다.
			 * @date         : 2018. 11. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param startIdx : 시작인덱스
			 */
			doAnalysisData : function(startIdx) {
				this.srtIdx = startIdx;
				var params = {
						"table_nm" : this.shareBoardDetailInfo.data_nm,
						"action_type" :  this.shareBoardDetailInfo.analysis_type,
						"startIdx" : startIdx,
						"resultCnt" : $("#viewCntSelecBox").val(),
						"scheme" :  this.shareBoardDetailInfo.user_id
				};
				$shareBoardDetail.request.doReqAnalysisResultData(params, function(res) {
					var result = res.result;
					var maxCntPerPage = Number($("#viewCntSelecBox").val());
					var totalPage = Math.ceil(result[0].total / maxCntPerPage);
					$shareBoardDetail.ui.setShareBoardDataListViewPaging(result[0].total, totalPage, maxCntPerPage, result, $shareBoardDetail.ui.currentPage);
					
					switch($shareBoardDetail.ui.shareBoardDetailInfo.analysis_type) {
						case "BOUNDARY": //경계분석
							$shareBoardDetail.ui.drawGrid($shareBoardDetail.ui.getBoundaryGridInfo(res));
							break;
						case "VORONOI": //보로노이다이어그램
							$shareBoardDetail.ui.drawGrid($shareBoardDetail.ui.getVoronoiGridInfo(res));
							break;
						case "BUFFER": //버퍼분석
							$shareBoardDetail.ui.drawGrid($shareBoardDetail.ui.getBufferGridInfo(res));
							break;
						case "LQ":	 //입지계수 분석
							$shareBoardDetail.ui.drawGrid($shareBoardDetail.ui.getLqGridInfo(res));
							break;
						case "OPERATION": //데이터 연산간 분석
							$shareBoardDetail.ui.drawGrid($shareBoardDetail.ui.getOperationGridInfo(res));
							break;
						case "SPATIAL": //공간자기상관분석
							$shareBoardDetail.ui.drawGrid($shareBoardDetail.ui.getSpatialGridInfo(res));
							break;
						default:
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doGeoData
			 * @description  : 위치데이터정보를 요청한다.
			 * @date         : 2018. 11. 14. 
			 * @author	     : 최재영
			 * @history 	 :
			 * @param startIdx : 시작인덱스
			 */
			doGeoData : function(startIdx) {
				this.srtIdx = startIdx;
				var resultCnt = Number(startIdx) + Number($("#viewCntSelecBox").val());
				var params = {
						"data_nm" : this.shareBoardDetailInfo.data_nm,
						"startIdx" : startIdx,
						"resultCnt" : resultCnt,
						"schema" :  this.shareBoardDetailInfo.user_id,
						"resource_id" : this.shareBoardDetailInfo.resource_id
				};
				$shareBoardDetail.request.doReqGeoData(params, function(res) {
					if (res.data != undefined) {
						
						var result = res.data;
						var maxCntPerPage = Number($("#viewCntSelecBox").val());
						var totalPage = Math.ceil(parseInt(result.info.data_cnt) / maxCntPerPage);
						$shareBoardDetail.ui.setShareBoardDataListViewPaging(parseInt(result.info.data_cnt), totalPage, maxCntPerPage, result, $shareBoardDetail.ui.currentPage);
						$shareBoardDetail.ui.drawGrid($shareBoardDetail.ui.getDataGridInfo(result));
					}
				});
			},
			
			/**
			 * 
			 * @name         : doSaveReply
			 * @description  : 댓글정보를 저장한다.
			 * @date         : 2018. 11. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doSaveReply : function() {
				var content = $.trim($("#replyInput").val());
				if (content.length == 0) {
					$message.open("알림", "댓글을 입력해주세요.");
					return;
				}
				
				var params = {
						"content" : content,
						"share_board_no" : this.shareBoardDetailInfo.share_board_no
				};
				$shareBoardDetail.request.doReqSaveReply(params, function(res) {
					$shareBoardDetail.ui.doShareBoardReplyList(0);
				});
			},
			
			/**
			 * 
			 * @name         : doShareBoardReplyList
			 * @description  : 댓글정보를 조회한다.
			 * @date         : 2018. 11. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param startIdx : 시작인덱스
			 */
			doShareBoardReplyList : function(startIdx) {
				this.replySrtIdx = startIdx;
				var params = {
						"share_board_no" : this.shareBoardDetailInfo.share_board_no,
						"startIdx" : startIdx,
						"resultCnt" : this.maxCntReplyPage
				};
				$shareBoardDetail.request.doReqReplyList(params, function(res) {
					console.log(res);
				});
			},
			
			/**
			 * 
			 * @name         : doDeleteReply
			 * @description  : 댓글정보를 삭제한다.
			 * @date         : 2018. 11. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param replyNo : 댓글번호
			 * @param shareBoardNo : 공유게시판 번호
			 */
			doDeleteReply : function(replyNo, shareBoardNo) {
				$message.open(
        				"알림",
        				"해당 댓글을 삭제하시겠습니까?",
		    			 btns = [
			    			 {
			    			   title : "삭제",
				    			   func : function(opt) {
				    				   opt.close();
				    				   var params = {
				    							"reply_no" : replyNo,
				    							"share_board_no" : shareBoardNo
				    					};
				    					$shareBoardDetail.request.doReqDeleteReply(params, function(res) {
				    						$shareBoardDetail.ui.doShareBoardReplyList(0);
				    					});
				    			   }
				    		 }, 
		    			     {
							   title : "취소",
							   func : function(opt) {
								   //회원정보 페이지로 이동
								   opt.close();
							   }
		    			     } 
		    			 ]
		    	);
			},
			
			/**
			 * 
			 * @name         : doAnalysisResultMap
			 * @description  : 분석결과화면으로 이동한다.
			 * @date         : 2018. 11. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doAnalysisResultMap : function() {
				if (this.shareBoardDetailInfo != null) {
					switch(this.shareBoardDetailInfo.type) {
						case "analysis":	//분석데이터
							window.open(contextPath + "/view/analysis/resultMap?id=" + this.shareBoardDetailInfo.resource_id);
							break;
						case "coord":		//위치데이터
							window.open(contextPath + "/view/myData/resultMap?resource_id=" + this.shareBoardDetailInfo.resource_id);
							break;
						default:
							$message.open("알림", "위치데이터로 변환하지 않은 데이터는 지도보기를 할 수 없습니다.");
							break;
					}
				}
			},
			
			/**
			 * 
			 * @name         : doDeleteShareBoard
			 * @description  : 공유데이터를 삭제한다.
			 * @date         : 2018. 11. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doDeleteShareBoard : function() {
				if (this.shareBoardDetailInfo != null) {
					$message.open(
	        				"알림",
	        				"해당 공유게시판을 삭제하시겠습니까?",
			    			 btns = [
				    			 {
				    			   title : "삭제",
					    			   func : function(opt) {
					    				   opt.close();
					    				   var params = {
					    							"share_board_no" : $shareBoardDetail.ui.shareBoardDetailInfo.share_board_no,
					    							"resource_id" : $shareBoardDetail.ui.shareBoardDetailInfo.resource_id
					    					};
					    					$shareBoardDetail.request.doReqDeleteShareBoardInfo(params, function(res) {
					    						window.location.href = contextPath + "/view/shareBoard/shareBoardMain";
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
				}
			},
			
			/**
			 * 
			 * @name         : doModifyShareBoard
			 * @description  : 공유데이터를 수정모드로 전환한다.
			 * @date         : 2018. 11. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doModifyShareBoard : function() {
				if (this.shareBoardDetailInfo != null) {
					$message.open(
	        				"알림",
	        				"해당 공유게시판을 수정모드로 전환하시겠습니까?",
			    			 btns = [
				    			 {
				    			   title : "확인",
					    			   func : function(opt) {
					    				  opt.close();
					    				  $("#shareBoardContent").attr("readonly", false);
					    				  $("#shareBoardContent").focus();
					    				  $("#modifyArea").show();
					    			   }
					    		 }, 
			    			     {
								   title : "취소",
								   func : function(opt) {
									   opt.close();
									   $("#shareBoardContent").attr("readonly", true);
									   $("#modifyArea").hide();
								   }
			    			     } 
			    			 ]
			    	);
				}
			},
			
			/**
			 * 
			 * @name         : doUpdateShareBoard
			 * @description  : 공유데이터를 업데이트한다.
			 * @date         : 2018. 11. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doUpdateShareBoard : function() {
				if (this.shareBoardDetailInfo != null) {
					var content = $.trim($("#shareBoardContent").val());
					if (content.length == 0) {
						$message.open("알림", "공유게시판 설명문구를 작성해주세요.");
						return;
					}
					content = content.replace(/(\n|\r\n)/g, '<br>');
					
					$message.open(
	        				"알림",
	        				"수정된 내용을 업데이트 하시겠습니까?",
			    			 btns = [
				    			 {
				    			   title : "확인",
					    			   func : function(opt) {
					    				  opt.close();
					    				  var params = {
					    						  "share_board_no" : $shareBoardDetail.ui.shareBoardDetailInfo.share_board_no,
					    						  "content" : content
					    				  };
					    				  $shareBoardDetail.request.doReqUpdateShareBoardInfo(params, function() {
					    					  window.location.reload();
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
				}
			},
			
			/**
			 * 
			 * @name         : doDownload
			 * @description  : 공유데이터를 다운로드한다.
			 * @date         : 2018. 11. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doDownload : function() {
				if (this.shareBoardDetailInfo != null) {
					$commonDataFunc.ui.doFileDownload(this.shareBoardDetailInfo.user_id, this.shareBoardDetailInfo.resource_id);
				}
				
				//log generate by cis
				var log_param = "ResourceID - " + this.shareBoardDetailInfo.resource_id;
				log_param += ", UserId - " + this.shareBoardDetailInfo.user_id;
				$log.srvLogWrite("Z0", "05", "08", "00", "", log_param);
			},
			
			/**
			 * 
			 * @name         : doRecmd
			 * @description  : 해당 공유게시판을 추천한다.
			 * @date         : 2018. 11. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doRecmd : function() {
				if (this.shareBoardDetailInfo != null) {
					$message.open(
	        				"알림",
	        				"해당 공유게시판을 추천하시겠습니까?",
			    			 btns = [
				    			 {
				    			   title : "추천",
					    			   func : function(opt) {
					    				   opt.close();
					    				   var params = {
					    							"share_board_no" : $shareBoardDetail.ui.shareBoardDetailInfo.share_board_no
					    					};
					    					$shareBoardDetail.request.doReqRecmdShareBoardInfo(params, function() {
					    						$message.open("알림", "추천을 완료하였습니다.");
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
				}
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
				$("#dataTable").empty();
				$("#dataTable").html(html);
			},
			
			/**
			 * 
			 * @name         : setThumnailImage
			 * @description  : 썸네일 이미지를 설정한다.
			 * @date         : 2018. 11. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param image : 이미지 데이터
			 * @param w : 이미지 너비
			 * @param h :  이미지 높이
			 */
			setThumnailImage : function(image, w, h) {
				var rate = w/h;
				var height = $(".pic").height();
				var width = parseInt(height*rate);
				var reportMapCss = {
	 	 				"width" : width+"px",
		 	 			"height" : height+"px",
		 	 			"overflow":"hidden",
		 	 			"margin-left" : parseInt((600 - width) / 2) + "px"
	 	 		};
				$("#thumnail").attr("src", image);
				$("#thumnail").css(reportMapCss);
			},
			
			/**
			 * 
			 * @name         : setShareBoardDataListViewPaging
			 * @description  : 공유게시판 페이징을 생성한다.
			 * @date         : 2018. 11. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param totalCount: 데이터 갯수
			 * @param totalPage : 총페이지 갯수
			 * @param pageSize : 한페이지당 데이터 갯수
			 * @param data :데이터
			 * @papram pageIndex : 페이지 인덱스
			 */
			setShareBoardDataListViewPaging : function(totalCount, totalPage, pageSize, data, pageIndex) {
				$('#shareBoardPage').paging({
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
						var showListCount = $("#viewCntSelecBox").val();
						$shareBoardDetail.ui.currentPage = page;
						$shareBoardDetail.ui.srtIdx = (page - 1) * pageSize;
						
						if ($shareBoardDetail.ui.shareBoardDetailInfo.type == "analysis") {
							$shareBoardDetail.ui.doAnalysisData($shareBoardDetail.ui.srtIdx);
						}else {
							$shareBoardDetail.ui.doGeoData($shareBoardDetail.ui.srtIdx);
						}
					}
				});
			},
			
			/**
			 * 
			 * @name         : setShareBoardReplyListViewPaging
			 * @description  : 공유게시판 댓글목록 페이징을 생성한다.
			 * @date         : 2018. 11. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param totalCount: 데이터 갯수
			 * @param totalPage : 총페이지 갯수
			 * @param pageSize : 한페이지당 데이터 갯수
			 * @param data :데이터
			 * @papram pageIndex : 페이지 인덱스
			 */
			setShareBoardReplyListViewPaging : function(totalCount, totalPage, pageSize, data, pageIndex) {
				$('#replyPage').paging({
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
						$shareBoardDetail.ui.replySrtIdx = (page - 1) * pageSize;
						$shareBoardDetail.ui.currentReplyPage = page;
						$shareBoardDetail.ui.doShareBoardReplyList($shareBoardDetail.ui.replySrtIdx);
					}
				});
			},
			
			/**
			 * 
			 * @name         : setShareBoardReplyList
			 * @description  : 댓글정보를 설정한다.
			 * @date         : 2018. 11. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data : 댓글정보
			 */
			setShareBoardReplyList : function(data) {
				var html = "";
				if (data.result.length > 0) {
					$("#replyPage").show();
					var user_id = $("#user_id").html();
					for (var i=0; i<data.result.length; i++) {
						html +=	"<li>";
						html +=		"<div class='contentArea'>";
						html +=			"<p class='t01'>"+data.result[i].user_id+" ("+data.result[i].reg_ts+")</p>";
						html +=			"<p class='t02'>"+data.result[i].content+"</p>";
						html +=	"</div>";
						html +=	"<div class='btnArea'>";
						
						//자신을 댓글만 삭제할 수 있음
						if (data.result[i].user_id == user_id) {
							html +=		"<a id='deleteReplyBtn' class='t03' onclick='javascript:$shareBoardDetail.ui.doDeleteReply(\""+data.result[i].reply_no+"\", \""+data.result[i].share_board_no+"\");'>삭제하기</a>";
						}
						
						html +=	"</div>";
						html +=	"</li>";
					}
				}else {
					$("#replyPage").hide();
					html +=	"<li>";
					html +=		"<p class='t02 emptyArea'>등록된 댓글정보가 없습니다.</p>";
					html +=	"</li>";
				}
				
				$("#replyList").html(html);
				
				//삭제버튼 margin
				$(".replyList li").each(function() {
					var marginTop = ($(this).find(".contentArea").height() - $(this).find("#deleteReplyBtn").height()) / 2;
					$(this).find(".btnArea").css("margin-top", marginTop);
				});				
			},
			
			/**
			 * 
			 * @name         : getBoundaryGridInfo
			 * @description  : 경계분석정보를 설정한다.
			 * @date         : 2018. 11. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data : 경계분석 정보
			 */
			getBoundaryGridInfo : function(data) {
				var total = 0;
				for (var i=0; i<data.result.length; i++) {
					total += parseFloat(data.result[i].data);
				}
				
				var html  = "<colgroup>";
					  html +=		"<col width='60' style='width:60px;'>";
					  html +=		"<col width=''>";
				 	  html +=		"<col width=''>";
					  html +=		"<col width=''>";
					  html +=		"<col width=''>";
					  html += "</colgroup>";
					  html += "<tr>";
					  html += 	"<th>순번</th>";
					  html += 	"<th>행정경계코드</th>";
					  html += 	"<th>지역명</th>";
					  html += 	"<th>분석결과(값)</th>";
					  html += 	"<th>비율(%)</th>";
					  html += "</tr>";
					  
				for (var i=0; i<data.result.length; i++) {
					html +=	"<tr>";
					html +=		"<td>" +$shareBoardDetail.util.getListNo(i) + "</td>";
					html +=		"<td>" + $shareBoardDetail.util.isUndefined(data.result[i].bnd_cd) + "</td>";
					
					if (data.result[i].adm_nm != undefined) {
						html +=	"<td>" + data.result[i].adm_nm + "</td>";
					}else {
						html +=	"<td>경계_" + $shareBoardDetail.util.getListNo(i) + "</td>";
					}
					
					html +=		"<td class='ar'>" + $commonFunc.appendCommaToNumber(data.result[i].data) + "</td>";
					html +=		"<td class='ar'>" + $commonFunc.appendCommaToNumber(((data.result[i].data / total) * 100).toFixed(2)) + "</td>";
					html +=	"</tr>";
				}
				return html;
			},
			
			/**
			 * 
			 * @name         : getVoronoiGridInfo
			 * @description  : 보로노이분석정보를 설정한다.
			 * @date         : 2018. 11. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data : 경계분석 정보
			 */
			getVoronoiGridInfo : function(data) {
				var total = 0;
				for (var i=0; i<data.result.length; i++) {
					total += parseFloat(data.result[i].data);
				}
				var avg = parseFloat((total / data.result.length).toFixed(2)) ;
				var rate = parseFloat(((avg / total) * 100).toFixed(2));

				var html  = "<colgroup>";
					  html +=		"<col width='60' style='width:60px;'>";
					  html +=		"<col width=''>";
				 	  html +=		"<col width=''>";
					  html +=		"<col width=''>";
					  html +=		"<col width=''>"; 
					  html += "</colgroup>";
					  html += "<tr>";
					  html += 	"<th>순번</th>";
					  html += 	"<th>POI명</th>";
					  html += 	"<th>POI영향면적(㎡)</th>";
					  html += 	"<th>전체면적대비비율(%)</th>";
					  html += 	"<th>평균비율대비</th>";
					  html += "</tr>";
					  
				for (var i=0; i<data.result.length; i++) {
					var ratePerTotal = parseFloat(((data.result[i].data / total) * 100).toFixed(2));
					var perAvgRate = parseFloat((ratePerTotal - rate).toFixed(2));
					
					html +=	"<tr>";
					html +=		"<td>" + $shareBoardDetail.util.getListNo(i) + "</td>";
					html +=		"<td>POI_" + $shareBoardDetail.util.getListNo(i) + "</td>";
					html +=		"<td>" + $commonFunc.appendCommaToNumber(data.result[i].data) + "</td>";
					html +=		"<td class='ar'>" + $commonFunc.appendCommaToNumber(ratePerTotal) + "</td>";
					
					if (perAvgRate >= 0) {
						html +=	"<td class='ar cr'>" + $commonFunc.appendCommaToNumber(perAvgRate) + "</td>";
					}else {
						html +=	"<td class='ar cb'>" + $commonFunc.appendCommaToNumber(perAvgRate) + "</td>";
					}
					html +=	"</tr>";
				}
				return html;
			},
			
			/**
			 * 
			 * @name         : getOperationGridInfo
			 * @description  : 데이터연산분석정보를 설정한다.
			 * @date         : 2018. 11. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data : 경계분석 정보
			 */
			getOperationGridInfo : function(data) {
				var html  = "<colgroup>";
					  html +=		"<col width='60' style='width:60px;'>";
					  html +=		"<col width=''>";
				 	  html +=		"<col width=''>";
					  html +=		"<col width=''>";
					  html +=		"<col width=''>"; 
					  html +=		"<col width=''>"; 
					  html += "</colgroup>";
					  html += "<tr>";
					  html += 	"<th>순위</th>";
					  html += 	"<th>행정경계코드</th>";
					  html += 	"<th>지역명</th>";
					  html += 	"<th>데이터A(값)</th>";
					  html += 	"<th>데이터B(값)</th>";
					  html += 	"<th>분석결과(값)</th>";
					  html += "</tr>";
				  
				for (var i=0; i<data.result.length; i++) {
					html +=	"<tr>";
					html +=		"<td>" + $shareBoardDetail.util.getListNo(i) + "</td>";
					html +=		"<td>" + data.result[i].bnd_cd + "</td>";
					html +=		"<td>" + data.result[i].adm_nm + "</td>";
					html +=		"<td class='ar'>" + $commonFunc.appendCommaToNumber(data.result[i].data1) + "</td>";
					html +=		"<td class='ar'>" + $commonFunc.appendCommaToNumber(data.result[i].data2) + "</td>";
					html +=		"<td class='ar'>" + $commonFunc.appendCommaToNumber(data.result[i].data) + "</td>";
					html +=	"</tr>";
				}
				
				return html;
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
					html +=	"<col width=''>";
				}
			    html += 		"</colgroup>";
				html += "<tr>"
				html += "<th>순번</th>"; 	
				for (var i=0; i<columnInfo.length; i++) {
					  html += "<th>" + columnInfo[i].column_name + "</th>";
				}
				html += "</tr>";

				for (var i=0; i<dataList.length; i++) {
					html +=	"<tr>";
					html +=	"<td>" + $shareBoardDetail.util.getListNo(i) + "</td>";
					for (var j=0; j<columnList.length; j++) {
						var id = columnList[j].toLowerCase();
						html +=	"<td>" + dataList[i][id] + "</td>";
					}
					html +=	"</tr>";
				}
				
				return html;
			},
			
			/**
			 * 
			 * @name         : getBufferGridInfo
			 * @description  : 버퍼분석 테이블정보를 구성한다.
			 * @date         : 2018. 11. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data : 분석정보
			 */
			getBufferGridInfo : function(data) {
				var html  = "<colgroup>";
					  html +=		"<col width='60' style='width:60px;'>";
					  html +=		"<col width=''>";
				 	  html +=		"<col width=''>";
					  html +=		"<col width=''>";
					  html += "</colgroup>";
					  html += "<tr>";
					  html += 	"<th>순위</th>";
					  html += 	"<th>버퍼명</th>";
					  html += 	"<th>버퍼면적(㎡)</th>";
					  html += 	"<th>분석결과(값)</th>";
					  html += 	"<th>결과 당 면적(㎡)</th>";
					  html += "</tr>";
				  
				for (var i=0; i<data.result.length; i++) {
					var avg = 0;
					if (data.result[i].data != 0) {
						avg = (parseFloat(data.result[i]._area) / parseFloat(data.result[i].data)).toFixed(2);
					}
					html +=	"<tr>";
					html +=		"<td>" + $shareBoardDetail.util.getListNo(i) + "</td>";
					html +=		"<td>버퍼_" + $shareBoardDetail.util.getListNo(i)+ "</td>";
					html +=		"<td class='ar'>" + $commonFunc.appendCommaToNumber(parseFloat(data.result[i]._area.toFixed(2))) + "</td>";
					html +=		"<td class='ar'>" + $commonFunc.appendCommaToNumber(data.result[i].data) + "</td>";
					html +=		"<td class='ar'>" + $commonFunc.appendCommaToNumber(avg) + "</td>";
					html +=	"</tr>";
				}
				
				return html;
			},
			
			/**
			 * 
			 * @name         : getSpatialGridInfo
			 * @description  : 공간자기상관분석 테이블정보를 구성한다.
			 * @date         : 2018. 11. 29. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data : 분석정보
			 */
			getSpatialGridInfo : function(data) {
				var html  = "<colgroup>";
				  html +=		"<col width='60' style='width:60px;'>";
				  html +=		"<col width=''>";
			 	  html +=		"<col width=''>";
				  html +=		"<col width=''>";
				  html +=		"<col width=''>";
			 	  html +=		"<col width=''>";
				  html += "</colgroup>";
				  html += "<tr>";
				  html += 	"<th>순위</th>";
				  html += 	"<th>지역명</th>";
				  html += 	"<th>행정동코드</th>";
				  html += 	"<th>모란지수(값)</th>";
				  html += 	"<th>공간자기상관도</th>";
				  html += 	"<th>유의수준(p-value)</th>";
				  html += "</tr>";
			  
				for (var i=0; i<data.result.length; i++) {
					html +=	"<tr>";
					html +=		"<td>" +$shareBoardDetail.util.getListNo(i) + "</td>";
					html +=		"<td class='ar'>" + data.result[i].adm_nm + "</td>";
					html +=		"<td class='ar'>" + data.result[i].bnd_cd + "</td>";
					html +=		"<td class='ar'>" + $commonFunc.appendCommaToNumber(data.result[i].moran) + "</td>";
					html +=		"<td class='ar'>" + $shareBoardDetail.util.getMoranNm(data.result[i].moran) + "</td>";
					html +=		"<td class='ar'>" + $commonFunc.appendCommaToNumber(data.result[i].p_value) + "</td>";
					html +=	"</tr>";
				}
				
				return html;
			},
			
			/**
			 * 
			 * @name         : getLqGridInfo
			 * @description  : 입지분석 테이블정보를 구성한다.
			 * @date         : 2018. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data : 분석정보
			 */
			getLqGridInfo : function(data) {
				var html  = "<colgroup>";
					  html +=		"<col width='60' style='width:60px;'>";
					  html +=		"<col width=''>";
				 	  html +=		"<col width=''>";
					  html +=		"<col width=''>";
					  html += "</colgroup>";
					  html += "<tr>";
					  html += 	"<th>순위</th>";
					  html += 	"<th>행정경계코드</th>";
					  html += 	"<th>지역명</th>";
					  html += 	"<th>분석결과(값)</th>";
					  html += "</tr>";
					  
				for (var i=0; i<data.result.length; i++) {
					html +=	"<tr>";
					html +=		"<td>" + (i+1) + "</td>";
					html +=		"<td>" + data.result[i].bnd_cd + "</td>";
					html +=		"<td>" + data.result[i].adm_nm + "</td>";
					html +=		"<td class='ar'>" + $commonFunc.appendCommaToNumber(data.result[i].data) + "</td>";
					html +=	"</tr>";
				}
				
				return html;
			}
			
	};
	
	$shareBoardDetail.util = {

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
				var no = ($shareBoardDetail.ui.srtIdx + idx) + 1;
				return no;
			},
			
			isUndefined : function(str) {
				var tmpStr = "";
				if (str == undefined || str == null) {
					tmpStr = "-";
				}else {
					tmpStr = str;
				}
				return tmpStr;
			},
			
			/**
			 * 
			 * @name         : getMoranNm
			 * @description  : 모란지수 범례정보를 리턴한다.
			 * @date         : 2018. 11. 29. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data	 : 모란지수
			 */
			getMoranNm : function(data) {
				var name = "";
				if (data >= 2.57) {
					name = "매우 높음";
				}else if (1.96 <= data && data < 2.57) {
					name = "높음";
				}else if (1.64 <= data && data < 1.96) {
					name = "약간 높음";
				}else if (-1.64 <= data && data < 1.64) {
					name = "보통";
				}else if (-1.96 <= data && data < -1.64) {
					name = "약간 낮음";
				}else if (-2.5 <= data && data < -1.96) {
					name = "낮음";
				}else {
					name = "매우 낮음";
				}
				return name;
			}
	};

	$shareBoardDetail.request = {
			
			/**
			 * 
			 * @name         : doReqAnalysisResultData
			 * @description  : 분석결과정보를 조회한다.
			 * @date         : 2018. 11. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params    : 파라미터정보
			 * @param map    : 맵 정보
			 * @param callback : 콜백함수
			 */
			doReqAnalysisResultData : function(params, callback) {
				var options = {
						isBeforSend : true,
						method : "POST",
						params : params
				};
				$ajax.requestApi(contextPath + "/api/analysis/getAnalysisResultData.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (res.result.length > 0) {
								if (callback != undefined && callback != null && typeof callback === "function") {
									callback.call(undefined, res);
								}
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
			 * @name         : doReqGeoData
			 * @description  : 위치결과정보를 조회한다.
			 * @date         : 2018. 11. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params    : 파라미터정보
			 * @param map    : 맵 정보
			 * @param callback : 콜백함수
			 */
			doReqGeoData : function(params, callback) {
				var options = {
						isBeforSend : true,
						method : "POST",
						params : params
				};
				$ajax.requestApi(contextPath + "/api/myData/selectResourceInfo.do", options,  function(res) {
					if (res.data != undefined) {
						if (callback != undefined && callback != null && typeof callback === "function") {
							callback.call(undefined, res);
						}
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqSaveReply
			 * @description  : 댓글정보를 저장한다.
			 * @date         : 2018. 11. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params    : 파라미터정보
			 * @param callback : 콜백함수
			 */
			doReqSaveReply : function(params, callback) {
				var options = {
						isBeforSend : true,
						method : "POST",
						params : params
				};
				$ajax.requestApi(contextPath + "/api/shareboard/insertShareBoardReplyInfo.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (callback != undefined && callback != null && typeof callback === "function") {
								callback.call(undefined, res);
							}
							
							//log generate by cis
							var log_param = "ShareBoardNo - " + options.params.share_board_no;
							log_param += ", Contents - " + options.params.content;
							$log.srvLogWrite("Z0", "05", "09", "00", "", log_param);
							
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqReplyList
			 * @description  : 댓글정보를 조회한다.
			 * @date         : 2018. 11. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params    : 파라미터정보
			 */
			doReqReplyList : function(params) {
				var options = {
						isBeforSend : false,
						method : "POST",
						params : params
				};
				$ajax.requestApi(contextPath + "/api/shareboard/getShareBoardReplyList.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							if (result.length > 0) {
								var totalPage = Math.ceil(result[0].total / $shareBoardDetail.ui.maxCntReplyPage);
								$shareBoardDetail.ui.setShareBoardReplyListViewPaging(result[0].total, totalPage, $shareBoardDetail.ui.maxCntReplyPage, result, $shareBoardDetail.ui.currentReplyPage);
							}
							$shareBoardDetail.ui.setShareBoardReplyList(res);
							break;
						default:  
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqDeleteReply
			 * @description  : 댓글정보를 삭제한다.
			 * @date         : 2018. 11. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params    : 파라미터정보
			 */
			doReqDeleteReply : function(params, callback) {
				var options = {
						isBeforSend : true,
						method : "POST",
						params : params
				};
				$ajax.requestApi(contextPath + "/api/shareboard/deleteShareBoardReplyInfo.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (callback != undefined && callback != null && typeof callback === "function") {
								callback.call(undefined, res);
							}
							
							//log generate by cis
							var log_param = "ShareBoardNo - " + options.params.share_board_no;
							log_param += ", ReplyNo - " + options.params.reply_no;
							$log.srvLogWrite("Z0", "05", "10", "00", "", log_param);
							
							break;
						default:  
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqDeleteShareBoardInfo
			 * @description  : 공유게시판 정보를 삭제한다.
			 * @date         : 2018. 11. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params    : 파라미터정보
			 */
			doReqDeleteShareBoardInfo : function(params, callback) {
				var options = {
						isBeforSend : true,
						method : "POST",
						params : params
				};
				$ajax.requestApi(contextPath + "/api/shareboard/deleteShareBoardInfo.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (callback != undefined && callback != null && typeof callback === "function") {
								callback.call(undefined, res);
							}
							
							//log generate by cis
							var log_param = "ShareBoardNo - " + options.params.share_board_no;
							log_param += ", ResourceID - " + options.params.resource_id;
							$log.srvLogWrite("Z0", "05", "06", "00", "", log_param);
							
							break;
						default:  
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqRecmdShareBoardInfo
			 * @description  : 공유게시판 정보를 추천한다.
			 * @date         : 2018. 11. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params    : 파라미터정보
			 */
			doReqRecmdShareBoardInfo : function(params, callback) {
				var options = {
						isBeforSend : true,
						method : "POST",
						params : params
				};
				$ajax.requestApi(contextPath + "/api/shareboard/updateRecmdShareBoardInfo.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (callback != undefined && callback != null && typeof callback === "function") {
								callback.call(undefined, res);
							}
							
							//log generate by cis
							var log_param = "ShareBoardNo - " + options.params.share_board_no;
							$log.srvLogWrite("Z0", "05", "07", "00", "", log_param);
							
							break;
						default:  
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqUpdateShareBoardInfo
			 * @description  : 공유게시판 정보를 업데이트한다.
			 * @date         : 2018. 11. 14. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params    : 파라미터정보
			 * @param callback : 콜백함수
			 */
			doReqUpdateShareBoardInfo : function(params, callback) {
				var options = {
						isBeforSend : true,
						method : "POST",
						params : params
				};
				$ajax.requestApi(contextPath + "/api/shareboard/updateShareBoardInfo.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (callback != undefined && callback != null && typeof callback === "function") {
								callback.call(undefined, res);
							}
							
							//log generate by cis
							var log_param = "ShareBoardNo - " + options.params.share_board_no;
							log_param += ", Contents - " + options.params.content;
							$log.srvLogWrite("Z0", "05", "05", "00", "", log_param);
							
							break;
						default:  
							$message.open("알림", res.errMsg);
							break;
					}
				});
			}
	};
	
	$shareBoardDetail.event = {
			setUIEvent : function(){
				
				//차트 스크롤적용
				$("#shareBoardContent").mCustomScrollbar({axis:"y"});
				$(".mCSB_container").css("margin-right", "0px");
				
				//더보기 이벤트
				$("#viewCntSelecBox").on("change", function() {
					//분석데이터 조회
					$shareBoardDetail.ui.currentPage = 1;
					if ($shareBoardDetail.ui.shareBoardDetailInfo.type == "analysis") {
						$shareBoardDetail.ui.doAnalysisData(0);
					}else {
						$shareBoardDetail.ui.doGeoData(0);
					}
				});
				
				//댓글입력
				$("#shareBoardReply").on("click", function() {
					$shareBoardDetail.ui.doSaveReply();
				});
				
				//댓글삭제하기
				$("#deleteReplyBtn").on("click", function() {
					
				});
				
				//댓글남기기
				$("#replyBtn").on("click", function() {
					var replyNo = $(this).data("reply_no");
					var shareBoardNo = $(this).data("share_board_no");
					console.log(replyNo);
					console.log(shareBoardNo);
				});
				
				//수정취소 이벤트
				$("#cancelShareBoardBtn").on("click", function() {
					window.location.reload();
				});
				
			}
	};

	
}(window,document));