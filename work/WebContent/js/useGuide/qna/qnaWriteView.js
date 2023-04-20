
(function(W,D){
	W.$qnaWriteView = W.$qnaWriteView || {};
	
	$(document).ready(function(){
		$qnaWriteView.event.setUIEvent();
	});
	
	//UI 내용작성
	$qnaWriteView.ui = {
			
			/**
			 * 
			 * @name         : doQnaWriteCancel
			 * @description  : 게시글 작성하기를 취소한다.
			 * @date         : 2018. 07. 23. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doQnaWriteCancel : function() {
				$message.open(
        				"알림",
        				"게시글 작성을 취소하시겠습니까?",
		    			 btns = [
			    			 {
			    			   title : "확인",
				    			   func : function(opt) {
				    				   opt.close();
				    				   window.location.href = contextPath+"/view/use/guideMain/qna";
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
			 * @name         : doRegQna
			 * @description  : 게시글을 등록한다.
			 * @date         : 2018. 07. 23. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doRegQna : function() {
				if (this.validateCheck()) {
					$message.open(
	        				"알림",
	        				"게시글를 등록하시겠습니까?",
			    			 btns = [
				    			 {
				    			   title : "등록",
					    			   func : function(opt) {
					    				   opt.close();
					    				   $qnaWriteView.request.doReqQnaReg();
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
				var title = $.trim($("#qnaWriteForm").find("#postTitle").val());
				var content = $.trim($("#qnaWriteForm").find("#qnaWriteContentArea").val());//CKEDITOR.instances.qnaWriteContentArea.getData();
				
				//게시글 제목
				if (title == undefined || title == null || title.length == 0) {
					$message.open("알림", "게시글 제목을 입력해주세요.");
					return false;
				}

				this.params = {};
				this.params = {
						title : $aes.encrypt(title),
						content : $aes.encrypt(content)
				};
				return true;
			}
	};
	
	//AJAX 내용작성
	$qnaWriteView.request = {
			
			/**
			 * 
			 * @name         : doReqQnaReg
			 * @description  : 게시글을 등록한다.
			 * @date         : 2018. 07. 23. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doReqQnaReg : function() {
				$("#qnaWriteForm").ajaxForm({
					async: false,
					type : "POST",
					url :  contextPath+"/api/use/qna/insertQnaInfo.do",
					dataType: "json",
					encoding: "utf-8",
					data : $qnaWriteView.ui.params,
					beforeSubmit: function(data, frm, opt) {
						var file = $("#qnaWriteForm").find('#searchTextFile').val();
						if (file.length > 0) {
							var ext = $("#qnaWriteForm").find('#searchTextFile').val().split('.').pop().toLowerCase();
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
								//log generate by cis
								$log.srvLogWrite("Z0", "06", "02", "04", "", "");
								
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
	$qnaWriteView.event = {
			
			setUIEvent : function(){
				
				//글쓰기 취소
				$("#qnaWriteCancelBtn").on("click", function(e) {
					e.preventDefault();
					$qnaWriteView.ui.doQnaWriteCancel();
				});
				
				//글쓰기 등록
				$("#qnaRegBtn").on("click", function(e) {
					e.preventDefault();
					$qnaWriteView.ui.doRegQna();
				});	
				
				//파일찾기
				$("#qnaWriteForm").find("#searchFileBtn").on("click", function(e) {
					e.preventDefault();
					$("#qnaWriteForm").find("#searchTextFile").trigger("click");
				});
				
				//파일선택 취소
				$("#qnaWriteForm").find("#deletFileBtn").on("click", function(e) {
					e.preventDefault();
					$("#qnaWriteForm").find("#qnaFile").val("");
					$("#qnaWriteForm").find("#searchTextFile").val("");
					$("#deletFileBtn").hide();
				});
				
				//파일선택 이벤트
				$("#qnaWriteForm").find("#searchTextFile").on("change", function(e) {
					e.preventDefault();
					var filePath = e.target.value;
					var fileName = filePath.substring(filePath.lastIndexOf('\\') + 1);
					$("#qnaWriteForm").find("#qnaFile").val(fileName);
					$("#deletFileBtn").show();
				});
			}
	};
	
}(window,document));