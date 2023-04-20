
(function(W,D){
	W.$qnaModifyView = W.$qnaModifyView || {};
	
	$(document).ready(function(){
		$qnaModifyView.event.setUIEvent();
	});
	
	//UI 내용작성
	$qnaModifyView.ui = {
			
			/**
			 * 
			 * @name         : doQnaModifyMode
			 * @description  : 게시글 수정하기를 모드로 변환한다.
			 * @date         : 2018. 07. 23. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doQnaModifyMode : function(data) {

				//Q&A 상세정보
				if (data != null) {
					var title = data.title;
					var content = data.content.replace(/&quot;/gi, "'");
					var fileList = data.fileList;
					
					$("#qnaModifyView").find("#postTitle").val(title);
					$("#qnaModifyView").find("#qnaModifyContentArea").html(content);
					
					//첨부파일 추가
					$(".qnaAttachFileArea").remove();
					if (fileList != undefined && fileList.length > 0) {
						for (var i=0; i<fileList.length; i++) {
							$("#qnaModifyView").find("#qnaFile").val(fileList[i].file_nm);
						}
						$("#deletFileBtn").show();
					}
				}
			},
			
			/**
			 * 
			 * @name         : doQnaModifyCancel
			 * @description  : 게시글 작성하기를 취소한다.
			 * @date         : 2018. 07. 23. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doQnaModifyCancel : function() {
				$message.open(
        				"알림",
        				"게시글 수정을 취소하시겠습니까?",
		    			 btns = [
			    			 {
			    			   title : "확인",
				    			   func : function(opt) {
				    				   opt.close();
				    				   window.location.href = contextPath+"/view/use/qna/qnaDetailView?post_no=" + $qnaModifyView.ui.qnaDetailInfo.post_no;
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
			 * @name         : doModifyQna
			 * @description  : 게시글을 등록한다.
			 * @date         : 2018. 07. 23. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doModifyQna : function() {
				if (this.validateCheck()) {
					$message.open(
	        				"알림",
	        				"게시글를 수정하시겠습니까?",
			    			 btns = [
				    			 {
				    			   title : "등록",
					    			   func : function(opt) {
					    				   opt.close();
					    				   $qnaModifyView.request.doReqQnaModify();
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
			 * @name         : validateCheck
			 * @description  : 게시글 파라미터를 체크한다.
			 * @date         : 2018. 07. 23. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			validateCheck : function() {
				var title = $.trim($("#qnaModifyForm").find("#postTitle").val());
				var content = $.trim($("#qnaModifyForm").find("#qnaModifyContentArea").val());
				
				//게시글 제목
				if (title == undefined || title == null || title.length == 0) {
					$message.open("알림", "게시글 제목을 입력해주세요.");
					return false;
				}

				this.params = {};
				this.params = {
						title : $aes.encrypt(title),
						content : $aes.encrypt(content),
						postNo :  $qnaModifyView.ui.qnaDetailInfo.post_no
				};
				
				if ($qnaModifyView.ui.qnaDetailInfo.fileList != undefined && 
						$qnaModifyView.ui.qnaDetailInfo.fileList.length > 0) {
					this.params["attach"] = $aes.encrypt($qnaModifyView.ui.qnaDetailInfo.fileList[0].attach);
				}
				
				return true;
			}
	};
	
	//AJAX 내용작성
	$qnaModifyView.request = {
			
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
							$qnaModifyView.ui.qnaDetailInfo = result;
							$qnaModifyView.ui.doQnaModifyMode(result);
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqQnaReg
			 * @description  : 게시글을 등록한다.
			 * @date         : 2018. 07. 23. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doReqQnaModify : function() {
				$("#qnaModifyForm").ajaxForm({
					async: false,
					type : "POST",
					url : contextPath+"/api/use/qna/updateQnaInfo.do",
					dataType: "json",
					encoding: "utf-8",
					data : $qnaModifyView.ui.params,
					beforeSubmit: function(data, frm, opt) {
						var file = $("#qnaModifyForm").find('#searchTextFile').val();
						if (file.length > 0) {
							var ext = $("#qnaModifyForm").find('#searchTextFile').val().split('.').pop().toLowerCase();
							if($.inArray(ext, $file.extension) == -1) {
								$message.open("알림", "업로드가 제한된 파일 입니다.");
								return false;
							}
						}
						$mask.show();
						return true;
					},
					success: function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								//목록으로 이동
								window.location.href = contextPath+"/view/use/guideMain/qna";
								break;
							default:
								$message.open("알림", res.errMsg);
								break;
						}
			        },
			        complete: function() {
			        	$mask.hide();
			        },
			        error: function() {
			        	$message.open("알림", res.errMsg);
			        }
				}).submit();
			}
			
	};
	
	//EVENT 내용작성
	$qnaModifyView.event = {
			
			setUIEvent : function(){
				
				//글쓰기 취소
				$("#qnaModifyCancelBtn").on("click", function(e) {
					e.preventDefault();
					$qnaModifyView.ui.doQnaModifyCancel();
				});
				
				//글쓰기 등록
				$("#qnaModifyBtn").on("click", function(e) {
					e.preventDefault();
					$qnaModifyView.ui.doModifyQna();
				});	
				
				//파일찾기
				$("#qnaModifyForm").find("#searchFileBtn").on("click", function(e) {
					e.preventDefault();
					$("#qnaModifyForm").find("#searchTextFile").trigger("click");
				});
				
				//파일선택 취소
				$("#qnaModifyForm").find("#deletFileBtn").on("click", function(e) {
					e.preventDefault();
					$("#qnaModifyForm").find("#qnaFile").val("");
					$("#qnaModifyForm").find("#searchTextFile").val("");
					$("#deletFileBtn").hide();
				});
				
				//파일선택 이벤트
				$("#qnaModifyForm").find("#searchTextFile").on("change", function(e) {
					e.preventDefault();
					var filePath = e.target.value;
					var fileName = filePath.substring(filePath.lastIndexOf('\\') + 1);
					$("#qnaModifyForm").find("#qnaFile").val(fileName);
					$("#deletFileBtn").show();
				});
			}
	};
	
}(window,document));