/**   
 *
 * @JSName: GridDetail
 * @Description:  
 *
 * @author: liudandan   
 * @date: 2014/11/03/ 16:00:00    
 * @version V1.0      
 *    
 */
(function(W, D) {
	W.$reqQuestion = W.$reqQuestion || {};
	//get From URL
	var POST_NO = getParameter('POST_NO');
	var BOARD_CD = getParameter('BOARD_CD');
	//for return
	var BOARD_CD_RETURN = getParameter('BOARD_CD_SEND');
	var keywordSelect = getParameter('keywordSelect');
	var keywordInput = getParameter('keywordInput');
	var pageNumber = getParameter('pageNumber');
	
	var POST_DEPTH = null;
	var PARENT_POST_ID = null;
	$(document).ready(function(){
		
		srvLogWrite("L0", "05", "01", "31", "", "");
		//request Question
		$reqQuestion.requestData();
		//click the contant button
		$('#toContantButton').click(function(){
			location.href = './../QA/boardGridManage.html?BOARD_CD=' + BOARD_CD_RETURN + '&keywordSelect=' + keywordSelect + '&keywordInput=' + keywordInput + '&pageNumber=' + pageNumber;
		});
	});
	//request Question
	$reqQuestion = {
		requestData : function() {
			var sopOpenApiReqQuestionObj = new sop.openApi.reqQuestion.api();
			sopOpenApiReqQuestionObj.addParam('POST_NO', POST_NO);
			sopOpenApiReqQuestionObj.addParam('BOARD_CD', BOARD_CD);
			sopOpenApiReqQuestionObj.request({
		        method : "POST",
		        async : false,
		        url : contextPath +"/ServiceAPI/QA/BoardManage/getGridQuestion.json"
		    });
		},
		downloadFile : function(FILE_PATH, FILE_ID, FILE_EXTENSION, FILE_CONTENT_TYPE) {
			$('#FILE_PATH').val(FILE_PATH);
			$('#FILE_ID').val(FILE_ID);
			$('#FILE_EXTENSION').val(FILE_EXTENSION);
			$('#FILE_CONTENT_TYPE').val(FILE_CONTENT_TYPE);
			$('#downLoadFileForm').submit();
		}
	};
	//request Question
	(function() {
	    $class("sop.openApi.reqQuestion.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	        	var result = res.result;
	            if(res.errCd == "0") { 
	            	if(result != null){
	            		if(result.info != null){
	            			//등록일시   new date
		            		$('#GridDetailTbody').find('td').eq(0).text(result.info.REG_TS);
		            		//카테고리   type
		            		/*$('#APIDetailTbody').find('td').eq(1).text(result.info.S_CLASS_CD_NM);*/
		            		//조회수  query count
		            		$('#GridDetailTbody').find('td').eq(2).text(result.info.POST_HITS);
		            		//이름  name
		            		$('#GridDetailTbody').find('td').eq(4).text(result.info.MEMBER_NM);
		            		//연락처  phone
		            		$('#GridDetailTbody').find('td').eq(5).text(result.info.CP_NO);
		            		//이메일  email
		            		$('#GridDetailTbody').find('td').eq(6).text(result.info.EMAIL);
		            		//제목  title
		            		$('#GridDetailTbody').find('td').eq(7).text(result.info.POST_TITLE);
		            		//내용  content
		            		$('#GridDetailTbody').find('td').eq(8).html(result.info.POST_CONTENT.replace(/\n/g,'<br/>'));
		            		POST_DEPTH = result.info.POST_DEPTH;
		            		PARENT_POST_ID = result.info.PARENT_POST_ID;
	            		}
	            		//첨부파일  attachment
            			var file = result.file;
            			var fileLines = '';
            			var filePath = '';
	            		if(file != null && file != ''){	            			
	            			if(file.FILE_PATH != null && file.FILE_PATH != ''){
	            				filePath = file.FILE_PATH.substr(file.FILE_PATH.indexOf('/upload'));
	            			}
	            			filePath = filePath + file.FILE_ID + '.' + file.FILE_EXTENSION;
	            			fileLines = "<a onclick='$reqQuestion.downloadFile(\"" + result.file.FILE_PATH + "\",\"" + encodeURIComponent(result.file.FILE_ID) + "\",\"" + result.file.FILE_EXTENSION + "\",\"" + result.file.FILE_CONTENT_TYPE + "\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>" + result.file.FILE_NM + "." + result.file.FILE_EXTENSION + "</a>";
	            		//	fileLines = "<a href='" + filePath + "' target='_blank' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>" + file.FILE_NM + "." + file.FILE_EXTENSION + "</a>";
	            		
	            			var filePath = "https://sgis.kostat.go.kr" + result.file.FILE_PATH  + encodeURIComponent(result.file.FILE_ID) + "."  + result.file.FILE_EXTENSION;
		            		
		            		$("#attFile").html("<a href='" + filePath +"'>" +  encodeURIComponent(result.file.FILE_ID) + "."  + result.file.FILE_EXTENSION + "</a>" );
	            			
	            		
	            		} else{
	            			fileLines = '무';
	            			$("#attFile").html("무");
	            		}
	            		$('#GridDetailTbody').find('td').eq(9).html(fileLines);
	            		
	            		
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
	//download file
	(function() {
	    $class("sop.openApi.downloadFile.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	            if(res.errCd == "0") { 
	            	var result = res.result;
	            	if(result != null){
	            		getConfirmPopup('알림', result.msg, 'alert');
	    				$('#ok_alertPopup').click(function(){
	    					confirmPopupRemove();
	    				});
	    				$('#close_confirmPopup').click(function(){
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