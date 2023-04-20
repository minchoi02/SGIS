/**   
 *
 * @JSName: QAReply
 * @Description:  
 *
 * @author: liudandan   
 * @date: 2014/11/03/ 17:00:00    
 * @version V1.0      
 *    
 */
//for return
var BOARD_CD_RETURN = getParameter('BOARD_CD_SEND');
var S_CLASS_CD_NM = getParameter('S_CLASS_CD_NM');
var keywordSelect = getParameter('keywordSelect');
var keywordInput = getParameter('keywordInput');
var pageNumber = getParameter('pageNumber');
var low_rank_s_class_cd = "";
var BOARD_CD = getParameter('BOARD_CD');
(function(W, D) {
	W.$QAReply = W.$QAReply|| {};
	//get From URL
	var type = getParameter('type');
	var POST_NO = getParameter('POST_NO');
	var POST_DEPTH =parseInt( getParameter('POST_DEPTH'))+1;
	
	var PARENT_POST_ID = getParameter('PARENT_POST_ID');
	//answer content before modify
	var answerContent = '';
	$(document).ready(function(){
		$(".boardName1").html( $(".leftMenu>ul>li>a.on").text() );
		$(".boardName2").html( $(".sub>li>a.on").text() );
		
		console.log("POST_DEPTH",POST_DEPTH);
		//clear answer content
		$('#answerContent').html('');
		if ($.fn.validatebox){
			$.fn.validatebox.defaults.missingMessage = '이 입력 항목은 필수 입력 항목 입니다.';
		}
		if(type == 'reply'){
			//request Question
			$QAReply.reqQuestion();
		} else if(type == 'update'){
			//request Answer
			$QAReply.reqAnswer();
		}
		//click the contant button
		$('#toContantButton').click(function(){
			$QAReply.list();
		});
		$('#answerContent').validatebox({
			required: true,
			validType:['byteSizeVal[4000]']
		});
		$('#answerContent').keyup(function(){
			$('#answerContent').validatebox('enableValidation');
		});
		$('#answerContent').validatebox('disableValidation');
		//click the reply/modify button
		$('#replyOrModifyButton').click(function(){
			$('#answerContent').validatebox('enableValidation');
			var answerContentNew = $('#answerContent').val().replace(/(^\s*)|(\s*$)/g, '');
			if(answerContentNew.length == 0){
				$('#answerContent').html('');
				$('#answerContent').focus();
			}/* else if(answerContentNew == answerContent){
//				$.messager.show({
//					title:'',
//					msg:'Nothing changed!',
//					timeout:1500,
//					showType:'show',
//					style:{
//						right:'',
//						top:document.body.scrollTop+document.documentElement.scrollCenter,
//						bottom:''
//					}
//				});
				return false;
			}*/ else /*if(answerContentNew != answerContent)*/{
				if(type == 'reply'){
					if($("#answerContent").validatebox('isValid')){
						getConfirmPopup('확인', '등록하시겠습니까?', 'confirm');
						$('#ok_confirmPopup').click(function(){
							$QAReply.replyQuestion();
							confirmPopupRemove();
						});
						$('#cancel_confirmPopup').click(function(){
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function(){
							confirmPopupRemove();
						});
					}
				} else if(type == 'update'){
					if($("#answerContent").validatebox('isValid')){
						srvLogWrite("L0", "05", "01", "11", "", "");
						getConfirmPopup('확인', '수정하시겠습니까?', 'confirm');
						$('#ok_confirmPopup').click(function(){
							$QAReply.updateAnswer();
							confirmPopupRemove();
						});
						$('#cancel_confirmPopup').click(function(){
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function(){
							confirmPopupRemove();
						});
					}
				}
			}
		});
	});
	$QAReply = {
			//request Answer
			reqAnswer : function() {
				var sopOpenApiReqAnswerObj = new sop.openApi.reqAnswer.api();
				sopOpenApiReqAnswerObj.addParam('BOARD_CD', BOARD_CD);
				sopOpenApiReqAnswerObj.addParam('POST_NO', POST_NO);
				sopOpenApiReqAnswerObj.addParam('POST_DEPTH', POST_DEPTH);
				sopOpenApiReqAnswerObj.addParam('PARENT_POST_ID', PARENT_POST_ID);
				sopOpenApiReqAnswerObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/QA/QAManage/getAnswer.json"
			    });
			},
			//update Answer
			updateAnswer : function() {
				var sopOpenApiUpdateAnswerObj = new sop.openApi.updateAnswer.api();
				sopOpenApiUpdateAnswerObj.addParam('BOARD_CD', BOARD_CD);
				sopOpenApiUpdateAnswerObj.addParam('POST_NO', POST_NO);
				var post_content = $('#answerContent').val().replace(/(^\s*)|(\s*$)/g, '');
				sopOpenApiUpdateAnswerObj.addParam('POST_CONTENT',encodeURIComponent(post_content));
				var tempIndex = post_content.indexOf("\n");
				if(tempIndex == -1) tempIndex = post_content.length;
				if(tempIndex > 60 ) tempIndex = 60;
				sopOpenApiUpdateAnswerObj.addParam('POST_TITLE',encodeURIComponent(post_content.substring(0, tempIndex)));
				sopOpenApiUpdateAnswerObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/QA/QAManage/updateAnswer.json"
			    });
			},
			//request Question
			reqQuestion : function() {
				var sopOpenApiReqQuestionObj = new sop.openApi.reqQuestion.api();
				sopOpenApiReqQuestionObj.addParam('POST_NO', POST_NO);
				sopOpenApiReqQuestionObj.addParam('BOARD_CD', BOARD_CD);
				sopOpenApiReqQuestionObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/QA/QAManage/getQuestion.json"
			    });
			},
			//reply question
			replyQuestion : function() {
				var sopOpenApiReplyQuestionObj = new sop.openApi.replyQuestion.api();
				sopOpenApiReplyQuestionObj.addParam('BOARD_CD', BOARD_CD);
				sopOpenApiReplyQuestionObj.addParam('POST_NO', POST_NO);
				sopOpenApiReplyQuestionObj.addParam('POST_DEPTH', POST_DEPTH);
				sopOpenApiReplyQuestionObj.addParam('PARENT_POST_ID', PARENT_POST_ID);
				var post_content = $('#answerContent').val().replace(/(^\s*)|(\s*$)/g, '');
				sopOpenApiReplyQuestionObj.addParam('POST_CONTENT',encodeURIComponent(post_content));
				var tempIndex = post_content.indexOf("\n");
				if(tempIndex == -1) tempIndex = post_content.length;
				if(tempIndex > 60 ) tempIndex = 60;
				sopOpenApiReplyQuestionObj.addParam('POST_TITLE',encodeURIComponent(post_content.substring(0, tempIndex)));
				sopOpenApiReplyQuestionObj.addParam('LOW_RANK_S_CLASS_CD',low_rank_s_class_cd);
				sopOpenApiReplyQuestionObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/QA/QAManage/replyQuestion.json"
			    });
			},
			
			list : function(){
				var url = './../QA/QASearch.html';
				
				if( BOARD_CD == 'BOARD_014' ){
					url = './../QA/eduQASearch.html';
				}
				
				location.href = url+'?BOARD_CD=' + BOARD_CD_RETURN + '&S_CLASS_CD_NM=' + S_CLASS_CD_NM + '&keywordSelect=' + keywordSelect + '&keywordInput=' + keywordInput + '&pageNumber=' + pageNumber;
			}
	};
	//request Answer
	(function() {
	    $class("sop.openApi.reqAnswer.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	        	var result = res.result;
	            if(res.errCd == "0") { 
	            	if(result != null){
	            		if(result.question != null){
	            			$('#questionTitle').html(result.question.POST_TITLE);
	            			//$('#questionTitle').text($('#questionTitle').text());
	            			$('#questionContent').html(result.question.POST_CONTENT.replace(/\n/g,'<br/>'));
	            		}
	            		if(result.answer != null){
	            			$('#answerContent').html(result.answer.POST_CONTENT);
	            			answerContent = $('#answerContent').html().replace(/(^\s*)|(\s*$)/g, '');
	            		}
	            	}
	            } else {
	                getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup').click(function(){
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
	            }
	        },
	        onFail : function(status) {
	            getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
	        }
	    });
	}());
	//update Answer
	(function() {
	    $class("sop.openApi.updateAnswer.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	        	var result = res.result;
	            if(res.errCd == "0") { 
	            	if(result != null){
	            		getConfirmPopup('알림', result.msg, 'alert');
	    				$('#ok_alertPopup').click(function(){
	    					if(result.success == true){
	    						$QAReply.list();
		    				}
	    					confirmPopupRemove();
	    				});
	    				$('#close_confirmPopup').click(function(){
	    					if(result.success == true){
	    						$QAReply.list();
		    				}
	    					confirmPopupRemove();
	    				});
	            	}
	            } else {
	                getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup').click(function(){
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
	            }
	        },
	        onFail : function(status) {
	            getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
	        }
	    });
	}());
	//request Question
	(function() {
	    $class("sop.openApi.reqQuestion.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	        	var result = res.result;
	            if(res.errCd == "0") { 
	            	if(result != null){
	            		if(result.info != null){
	            			$('#questionTitle').html(result.info.POST_TITLE);
	            			$('#questionContent').html(result.info.POST_CONTENT.replace(/\n/g,'<br/>'));
	            			low_rank_s_class_cd = result.info.LOW_RANK_S_CLASS_CD;
	            		}
	            	}
	            } else {
	                getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup').click(function(){
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
	            }
	        },
	        onFail : function(status) {
	            getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
	        }
	    });
	}());
	//reply question
	(function() {
	    $class("sop.openApi.replyQuestion.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	        	var result = res.result;
	            if(res.errCd == "0") { 
	            	if(result != null){
	            		getConfirmPopup('알림', result.msg, 'alert');
	    				$('#ok_alertPopup').click(function(){
	    					if(result.success == true){
	    						$QAReply.list();
		    				}
	    					confirmPopupRemove();
	    				});
	    				$('#close_confirmPopup').click(function(){
	    					if(result.success == true){
	    						$QAReply.list();
		    				}
	    					confirmPopupRemove();
	    				});
	            	}
	            } else {
	                getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup').click(function(){
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
	            }
	        },
	        onFail : function(status) {
	            getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
	        }
	    });
	}());
}(window, document));