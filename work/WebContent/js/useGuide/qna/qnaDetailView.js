
(function(W,D){
	W.$qnaDetailView = W.$qnaDetailView || {};
	
	$(document).ready(function(){
		$qnaDetailView.event.setUIEvent();
	});
	
	//UI 내용작성
	$qnaDetailView.ui = {
			
			/**
			 * 
			 * @name         : setBoardContent
			 * @description  : Q&A 상세정보를 세팅한다.
			 * @date         : 2018. 07. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data   : 데이터
			 */
			setBoardContent : function(data) {
				$("#qnaDetailView").show();
				$("#qnaListView").hide();
				$("#qnaWriteView").hide();
				$("#qnaModifyView").hide();
				
				var areaId = $("#qnaDetailView");
				var detailInfo = data.user_nm + " " + data.reg_ts + "  조회수 : " + data.view_cnt;
				areaId.find("#postTitle").html(data.title);
				areaId.find("#postRegDt").html(detailInfo);
				
				console.log(data);
				//수정버튼 show/hide
				if (data.isMyData == "Y") {
					$("#qnaModifyModeBtn").show();
					$("#qnaDeleteBtn").show();
				}else {
					$("#qnaModifyModeBtn").hide();
					$("#qnaDeleteBtn").hide();
				}
				
				//첨부파일 추가
				if (data.fileList != undefined && data.fileList.length > 0) {
					$("#qnaAttachFileArea").show();
					var html = "";
					for (var i=0; i<data.fileList.length; i++) {
						html +=	"<a href='"+ contextPath +"/api/file/download.do?postNo="+data.post_no+"&attach="+data.fileList[i].attach+"&path="+data.fileList[i].path+"' download>" + data.fileList[i].file_nm + "("+data.fileList[i].file_size+")" + "</a>";
					}
					$(".attachFileArea").html(html);
				}
				
				//답변
				if (data.comment != undefined) {
					$(".comment").show();
					$("#qnaComment").html(data.comment);
				}
				
				var content = data.content.replace(/&quot;/gi, "'"); 
				content = content.replace(/\n/gi, "<br/>"); // 190220 개행 수정 
				areaId.find('#qnaDetailContentArea').html(content);				
			},
			
			/**
			 * 
			 * @name         : doDeleteQna
			 * @description  : 게시글을 삭제한다.
			 * @date         : 2018. 07. 23. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doDeleteQna : function() {
				$message.open(
        				"알림",
        				"게시글를 삭제하시겠습니까?",
		    			 btns = [
			    			 {
			    			   title : "삭제",
				    			   func : function(opt) {
				    				   opt.close();
				    				   $qnaDetailView.request.doReqQnaDelete($qnaDetailView.ui.qnaDetailInfo.post_no);
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
	};
	
	//AJAX 내용작성
	$qnaDetailView.request = {
			
			/**
			 * 
			 * @name         : doReqQnaDetailInfo
			 * @description  : Q&A 상세정보를 조회한다.
			 * @date         : 2018. 07. 16. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param postNo : 게시물 번호
			 */
			doReqQnaDetailInfo : function(postNo) {
				var options = {
					params : {
						postNo : postNo
					}
				};
			
				$ajax.requestApi(contextPath + "/api/use/qna/getQnaDetailInfo.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							$qnaDetailView.ui.qnaDetailInfo = result;
							$qnaDetailView.ui.setBoardContent(result);
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqQnaDelete
			 * @description  : Q&A 상세정보를 삭제한다.
			 * @date         : 2018. 07. 23. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doReqQnaDelete : function(postNo) {
				var options = {
					params : {
						postNo : postNo
					}
				};
			
				if ($qnaDetailView.ui.qnaDetailInfo.fileList != undefined && 
					$qnaDetailView.ui.qnaDetailInfo.fileList.length > 0) {
					options.params["attach"] = $aes.encrypt($qnaDetailView.ui.qnaDetailInfo.fileList[0].attach);
				}
			
				$ajax.requestApi(contextPath + "/api/use/qna/deleteQnaInfo.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							window.location.href = contextPath + "/view/use/guideMain/qna";
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			}
	};
	
	//EVENT 내용작성
	$qnaDetailView.event = {
			
			setUIEvent : function(){
				
				//글수정 버튼 이벤트
				$("#qnaModifyModeBtn").on("click", function(e) {
					e.preventDefault();
					window.location.href = contextPath + "/view/use/qna/qnaModifyView?post_no=" + $qnaDetailView.ui.qnaDetailInfo.post_no;
				});
				
				//글삭제 버튼 이벤트
				$("#qnaDeleteBtn").on("click", function(e) {
					e.preventDefault();
					$qnaDetailView.ui.doDeleteQna();
				});
				
			}
	};
	
}(window,document));