/**
 * 
 * @JSName: reqBoardDetail.js
 * @Description: 
 * 
 * @author: jrj
 * @date: 2018.01.31
 * @version V1.0
 * 
 */
var pluploader = {};

(function(W, D) {
	W.$reqBoardDetail = W.$reqBoardDetail || {};
	$reqBoardDetail.searchParameter = '';
	
	var REQ_SEQ = getParameter('REQ_SEQ');
	
	$(document).ready(function() {
		$reqBoardDetail.getCommonCode('REQ_DIV_CD', 'COM038');
		$reqBoardDetail.requestDetail();
		getSearchParameter();
		
		document.getElementById('resetForm').reset();
		
		if( REQ_SEQ == '0' ){
			$("#delBtn,#recvTable,#prgrsTable").addClass('display-none').hide();
		}
		
		if ($.fn.validatebox) {
			$.fn.validatebox.defaults.missingMessage = '이 입력 항목은 필수 입력 항목 입니다.';
		}
		
		$('#REQ_TITLE').validatebox({
			required : true,
			validType : [ 'byteSizeVal[200]' ]
		});

		$('#REQ_CONTENT, #_MOD_AFTER_REQ_CONTENT, #_RE_REQ_CONTENT').validatebox({
			required: true,
			validType:['byteSizeVal[4000]']
		});
		
		$('#REQ_TITLE, #REQ_CONTENT, #_MOD_AFTER_REQ_CONTENT, #_RE_REQ_CONTENT').validatebox('disableValidation');
		
		$('#REQ_TITLE, #REQ_CONTENT, #_MOD_AFTER_REQ_CONTENT, #_RE_REQ_CONTENT').keyup(function() {
			$( this ).validatebox('enableValidation');
		});
		
		//삭제 버튼 클릭
		$('#delBtn').click(function() {
			getConfirmPopup('알림', '삭제하시겠습니까?', 'alert');
			
			$('#ok_alertPopup').click(function() {
				confirmPopupRemove();
				$reqBoardDetail.delData( REQ_SEQ );
			});
			$('#close_confirmPopup').click(function() {
				confirmPopupRemove();
			});
			
		});
		
		//요청 버튼 클릭
		$('#reqBtn').click(function() {
			//pluploader.start();
			$('#REQ_TITLE, #REQ_CONTENT').validatebox('enableValidation');
			
			var REQ_TITLE = $('#REQ_TITLE').val().replace(/(^\s*)|(\s*$)/g, '');
			var REQ_CONTENT = $('#REQ_CONTENT').val().replace(/(^\s*)|(\s*$)/g,'');
			var REQ_DIV_CD = $('#REQ_DIV_CD').val();
			
			if (REQ_TITLE.length == 0) {
				$('#REQ_TITLE').val('');
				$('#REQ_TITLE').focus();
			} else if (REQ_CONTENT.length == 0) {
				getConfirmPopup('알림', '내용을 입력해주세요.', 'alert');
				
				$('#ok_alertPopup, #close_confirmPopup').click(function() {
					confirmPopupRemove();
				});
			} else {
				if ( getBytesCount ( REQ_TITLE ) < 200 ) {
					if ( getBytesCount( REQ_CONTENT ) < 4000 ) {
						$reqBoardDetail.modifyReqBoard( REQ_SEQ, '01' );
					}
				}
			}
		});
		
		//변경후요청 버튼 클릭
		$('#modAfterReqBtn').click(function() {
			$('#_MOD_AFTER_REQ_CONTENT').validatebox('enableValidation');
			var MOD_AFTER_REQ_CONTENT = $('#_MOD_AFTER_REQ_CONTENT').val().replace(/(^\s*)|(\s*$)/g,'');
			
			if (MOD_AFTER_REQ_CONTENT.length == 0) {
				getConfirmPopup('알림', '내용을 입력해주세요.', 'alert');
				
				$('#ok_alertPopup, #close_confirmPopup').click(function() {
					confirmPopupRemove();
				});
				
			} else {
				if ( getBytesCount( MOD_AFTER_REQ_CONTENT ) < 4000 ) {
					$reqBoardDetail.modifyReqBoard( REQ_SEQ, '04', '' );
				}
			}
		});
		
		//추가요청 버튼 클릭
		$('#reReqBtn').click(function() {
			$('#_RE_REQ_CONTENT').validatebox('enableValidation');
			var RE_REQ_CONTENT = $('#_RE_REQ_CONTENT').val().replace(/(^\s*)|(\s*$)/g,'');
			
			if (RE_REQ_CONTENT.length == 0) {
				getConfirmPopup('알림', '내용을 입력해주세요.', 'alert');
				
				$('#ok_alertPopup, #close_confirmPopup').click(function() {
					confirmPopupRemove();
				});
				
			} else {
				if ( getBytesCount( RE_REQ_CONTENT ) < 4000 ) {
					$reqBoardDetail.modifyReqBoard( REQ_SEQ, '07', '' );
				}
			}
		});
		
		//미진행완료 버튼 클릭
		$('#notPrgrsBtn').click(function() {
			$reqBoardDetail.modifyReqBoard( REQ_SEQ, '08', "미진행종료 처리하시겠습니까?" );
		});
		
		//미완료종료 버튼 클릭
		$('#notScsBtn').click(function() {
			$reqBoardDetail.modifyReqBoard( REQ_SEQ, '09', "미완료종료 처리하시겠습니까?" );
		});
		
		//완료 버튼 클릭
		$('#scsBtn').click(function() {
			$reqBoardDetail.modifyReqBoard( REQ_SEQ, '10', "완료 처리하시겠습니까?" );
		});
		
		//목록 버튼 클릭
		$('#listBtn').click(function() {
			location.href = "./../QA/reqBoardList.html?" + $reqBoardDetail.searchParameter;
		});
		
		// + - 버튼 클릭
		$(".toggleBtn").click(function(){
			var $btn = $( this );
			var $next = $( this ).closest('div').next();
				
			if( $btn.hasClass('toggle-on') ){
				$next.addClass('display-none').hide();
				$btn.text("+");
				$btn.removeClass('toggle-on');
			} else {
				$next.removeClass('display-none').attr("style", "display:block;").show();
				$btn.text("-");
				$btn.addClass('toggle-on');
			}
		});
		
		// plupload plugins
		pluploader = new plupload.Uploader({
			url : contextPath + '/ServiceAPI/QA/ReqBoard/addReqBoardFile.json',
			browse_button : 'pickfiles',
			file_data_name : 'FILE',
			filters : {
				mime_types : [ {
					title : "Zip files",
					extensions : "zip"
				}, {
					title : "hwp files",
					extensions : "hwp"
				}, {
					title : "doc files",
					extensions : "doc"
				}, {
					title : "docx files",
					extensions : "docx"
				}, {
					title : "ppt files",
					extensions : "ppt"
				}, {
					title : "pptx files",
					extensions : "pptx"
				}, {
					title : "xls files",
					extensions : "xls"
				}, {
					title : "xlsx files",
					extensions : "xlsx"
				}, {
					title : "txt files",
					extensions : "txt"
				}, {
					title : "bmp files",
					extensions : "bmp"
				}, {
					title : "jpeg files",
					extensions : "jpeg"
				}, {
					title : "jpg files",
					extensions : "jpg"
				}, {
					title : "gif files",
					extensions : "gif"
				}, {
					title : "png files",
					extensions : "png"
				}, {
					title : "pdf files",
					extensions : "pdf"
				} ],
				max_file_size : '20mb',
				multi_selection : false, // can only select
			// one file
			}
		});
		
		pluploader.init();
		
		pluploader.bind('FilesAdded', function(uploader, files) {
			var aTag = "<a onclick='$(\"#fileName\").empty()' style='cursor: pointer' title='삭제'><img src='./../include/img/btn/btn_popup_x.png' alt='삭제'><a/>";
			$('#fileName').html( files[0].name + aTag );
		});
		
		pluploader.bind('FileUploaded', function(up, files, responseObject) {
			var data = $.parseJSON(responseObject.response);
			
			if (data.errCd == "0") {
				if (data.result != null) {
					getConfirmPopup('알림', data.result.msg, 'alert');
					
					if (data.result.success == true) {
						$('#ok_alertPopup, #close_confirmPopup').click(function() {
							confirmPopupRemove();
							$("#listBtn").click();
						});
						
					} else {
						$('#ok_alertPopup, #close_confirmPopup').click(function() {
							confirmPopupRemove();
						});
						
						$('#fileName').empty();
						$('#fileProgress').empty();
					}
				}
			} else {
				getConfirmPopup('알림', data.errMsg, 'alert');
				
				$('#ok_alertPopup, #close_confirmPopup').click(function() {
					confirmPopupRemove();
				});
				
				$('#fileName').empty();
				$('#fileProgress').empty();
			}
		});
		
		pluploader.bind('UploadProgress', function(up, file) {
			$('#fileProgress').text('  ' + file.percent + "%");
		});
		
		pluploader.bind('Error', function(uploader, errObject) {
			$('#fileName').text(errObject.message);
			$('#fileProgress').empty();
		});
	});

	$reqBoardDetail = {
			
		requestDetail : function() {
			var obj = new sop.openApi.requestDetail.api();
			obj.addParam('REQ_SEQ', REQ_SEQ);
			obj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/QA/ReqBoard/getReqBoard.json"
			});
		},
		
		modifyReqBoard : function( REQ_SEQ, REQ_PRGRS_STATS_CD, MSG, LEN ) {
			getConfirmPopup('확인', MSG ? MSG : "요청하시겠습니까?", 'confirm');
			
			$('#ok_confirmPopup').click(function() {
				$reqBoardDetail.addReqBoard( REQ_SEQ, REQ_PRGRS_STATS_CD, MSG );
			});
			
			$('#cancel_confirmPopup,#close_confirmPopup').click(function() {
				confirmPopupRemove();
			});
		},
		
		addReqBoard : function( REQ_SEQ, REQ_PRGRS_STATS_CD, MSG ){
			confirmPopupRemove();
			
			var len = 0;
			
			var sopOpenApiaddReqBoardObj = new sop.openApi.addReqBoard.api();
			sopOpenApiaddReqBoardObj.addParam('REQ_SEQ', REQ_SEQ);
			sopOpenApiaddReqBoardObj.addParam('REQ_PRGRS_STATS_CD', REQ_PRGRS_STATS_CD);
			
			if( REQ_PRGRS_STATS_CD == '01' ){
				sopOpenApiaddReqBoardObj.addParam('REQ_TITLE', $("#REQ_TITLE").val());
				sopOpenApiaddReqBoardObj.addParam('REQ_DIV_CD', $("#REQ_DIV_CD").val());
				sopOpenApiaddReqBoardObj.addParam('REQ_CONTENT', $("#REQ_CONTENT").val());
			} else if( REQ_PRGRS_STATS_CD == '04' ){
				sopOpenApiaddReqBoardObj.addParam('MOD_AFTER_REQ_CONTENT', $("#_MOD_AFTER_REQ_CONTENT").val());
				len = this.byteCheck( [$("#MOD_AFTER_REQ_CONTENT").html(), $("#_MOD_AFTER_REQ_CONTENT").val()], 23 );
				
			} else if( REQ_PRGRS_STATS_CD == '07' ){
				sopOpenApiaddReqBoardObj.addParam('RE_REQ_CONTENT', $("#_RE_REQ_CONTENT").val());
				len = this.byteCheck( [$("#RE_REQ_CONTENT").html(), $("#_RE_REQ_CONTENT").val()], 23 );
			}
			
			if( len > 4000 ){
				getConfirmPopup('알림', '입력할 수 있는 글자 수가 '+ Math.abs(4000-len) +'Byte 초과하였습니다. 관리자에게 문의하시기 바랍니다.', 'alert');
				$('#ok_alertPopup, #close_confirmPopup').click(function() {
					confirmPopupRemove();
				});
			} else {
				sopOpenApiaddReqBoardObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/QA/ReqBoard/addReqBoard.json"
				});
				
			}
		},
		
		delData : function( REQ_SEQ ) {
			var sopOpenApiDelDatatObj = new sop.openApi.delData.api();
			sopOpenApiDelDatatObj.addParam('REQ_SEQ_LIST', REQ_SEQ);
			sopOpenApiDelDatatObj.request({
		        method : "POST",
		        async : false,
		        url : contextPath +"/ServiceAPI/QA/ReqBoard/delReqBoard.json"
		    });
		},
		
		downloadFile : function( FILE_PATH, FILE_ID, FILE_EXTENSION, FILE_CONTENT_TYPE ) {
			var openNewWindow = window.open("about:blank");
			const cnmUrl = "/upload/reqBoard/";

			openNewWindow.location.href= cnmUrl + FILE_ID + "." + FILE_EXTENSION;
		},
		
		getCommonCode : function ( selId, B_CLASS_CD ) {
			var sopOpenApiReqCommonCodeObj = new sop.openApi.reqCommonCode.api();
			sopOpenApiReqCommonCodeObj.addParam('B_CLASS_CD', B_CLASS_CD);
			sopOpenApiReqCommonCodeObj.addParam('selId', selId);
			
			sopOpenApiReqCommonCodeObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/QA/ReqBoard/getCodeList.json"
			});
		},
		
		byteCheck : function( strs, dflt ){
			var l = 0;
			
			for( var i=0; i<strs.length; i++ ){
				if( strs[i] ){
					for( var j=0; j<strs[i].length; j++ ){
						var str = strs[i];
						var c = escape( str.charAt(j) );
						
						if( c.length == 1 ) l++;
						else if( c.indexOf("%u") != -1 ) l += 3;
						else if( c.indexOf("%") != -1 ) l += c.length/3;
					}
				}
			}
			
			l = ( l + dflt );
			return l;
		}
	};
	
	// request board detail
	(function() {
		$class("sop.openApi.requestDetail.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				if (res.errCd == "0") {
					var result = res.result;
					
					if ( result != null ) {
						var today = new Date();
						var reg_de = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
						$("#REQ_DT").text( reg_de );
						$("#REQ_USER_NM").text( result.req_user_nm );
						
						if( result.board != null ){
							// 값 셋팅
							$.each( result.board, function( key, val ){
								key = key.toUpperCase();
								if( $("#" + key).length > 0 ){
									if( $("#" + key).prop('tagName').toUpperCase() == 'SPAN' ){
										val = val.replace(/\n/gi,'<br/>').replace(/\\n/gi,'<br/>');
										$("#" + key).html( val );
									} else {
										$("#" + key).val( val );
									}
								}
							});
							
							var file = '무';
							if (result.board.FILE_NM != null && result.board.FILE_NM != '') {
								file = "<a onclick='$reqBoardDetail.downloadFile(\""
										+ result.board.FILE_PATH
										+ "\",\""
										+ result.board.FILE_SAVE_NM
										+ "\",\""
										+ result.board.FILE_EXTN
										+ "\",\""
										+ result.board.FILE_CONTENT_TYPE
										+ "\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"
										+ result.board.FILE_NM + "." + result.board.FILE_EXTN + "</a>";
							
								$('#reqFile').html(file);
								
							}	
							
							var prgrs_cd = result.board.REQ_PRGRS_STATS_CD;
							var mod_req_dt = result.board.MOD_REQ_DT;
							var work_complete_dt = result.board.WORK_COMPLETE_DT;
							
							// 요청상태가 아닐 경우
							if( prgrs_cd != '01' ){
								$(".step1").find("input,textarea").prop("readonly", "readonly");
								$(".step1").find("select").prop("disabled", true);
								$(".step1").find(".btnBox").addClass("display-none").hide();
								$(".step2-1").removeClass("display-none").show();
								$("#reqFileAdd").addClass("display-none").hide();
							}
							
							if( prgrs_cd >= '03' && mod_req_dt != '' && typeof mod_req_dt != 'undefined' ){
								$(".step2").removeClass("display-none").show();
								
								if( prgrs_cd >= '04' ){
									$(".step2").find("input,textarea").prop("readonly", "readonly");
									$(".step2").find("select").prop("disabled", true);
									$("#modAfterReqBtn").addClass("display-none").hide();
									
									if( prgrs_cd > '04' ){
										$("#notPrgrsBtn").addClass("display-none").hide();
										if( prgrs_cd > '07' ){
											$(".step2").find(".toggleBtn").click();
										}
									}
								}
							}
							
							//변경요청 또는 변경후요청
							if( prgrs_cd == '03' || prgrs_cd == '04' ){
								$(".step2").find(".toggleBtn").click();
							}
							
							if( prgrs_cd >= '06' && work_complete_dt != '' && typeof work_complete_dt != 'undefined' ){
								$(".step3").removeClass("display-none").show();
								
								if( prgrs_cd >= '07' ){
									$(".step3").find("input,textarea").prop("readonly", "readonly");
									$(".step3").find("select").prop("disabled", true);
									$("#reReqBtn").addClass("display-none").hide();
									
									if( prgrs_cd > '07' ){
										$("#notScsBtn,#scsBtn").addClass("display-none").hide();
										$(".step3").find(".toggleBtn").click();
									}
								}
							}
							
							//변경요청 또는 변경후요청
							if( prgrs_cd == '06' || prgrs_cd == '07' ){
								$(".step3").find(".toggleBtn").click();
							}
							
						}
					}
				} else {
					getConfirmPopup('알림', res.errMsg, 'alert');
					
					$('#ok_alertPopup, #close_confirmPopup').click(function() {
						confirmPopupRemove();
					});
				}
			},
			onFail : function(status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				
				$('#ok_alertPopup, #close_confirmPopup').click(function() {
					confirmPopupRemove();
				});
			}
		});
		
		$class("sop.openApi.addReqBoard.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						var fileName = $('#fileName').text().replace(/(^\s*)|(\s*$)/g, '');
						if (fileName != null && fileName.length > 0) {
							
							$('.maskbg').fadeIn(200);
							$('.maskcontent').fadeIn(400);
							
							var parameter = '?REQ_SEQ=' + result.REQ_SEQ;
							pluploader.settings.url = contextPath + '/ServiceAPI/QA/ReqBoard/addReqBoardFile.json' + parameter;
							pluploader.start();
						} else {
							getConfirmPopup('알림', result.msg, 'alert');
							
							$('#ok_alertPopup, #close_confirmPopup').click(function() {
								if (result.success == true) {
									$("#listBtn").click();
								}
								confirmPopupRemove();
							});
						}
					}
				} else {
					getConfirmPopup('알림', res.errMsg, 'alert');
					
					$('#ok_alertPopup, #close_confirmPopup').click(function() {
						confirmPopupRemove();
					});
				}
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);
			},
			onFail : function(status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				
				$('#ok_alertPopup, #close_confirmPopup').click(function() {
					confirmPopupRemove();
				});
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);
			}
		});
		
		$class("sop.openApi.delData.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	            if(res.errCd == "0") { 
	            	var result = res.result;
	            	
	            	if(result != null){
	            		getConfirmPopup('알림', result.msg, 'alert');
	            		
						$('#ok_alertPopup,#close_confirmPopup').click(function(){
							confirmPopupRemove();
						});
						
						location.href = "./../QA/reqBoardList.html?" + $reqBoardDetail.searchParameter;
	            	}
	            } else {
	                getConfirmPopup('알림', res.errMsg, 'alert');
	                
					$('#ok_alertPopup,#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
	            }
	        },
	        onFail : function(status) {
	            getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
	            
				$('#ok_alertPopup,#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
	        }
		});
		
		$class("sop.openApi.reqCommonCode.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						
						var html = '';
						
						$.each( result.BCodeList, function( a,b ){
							html += '<option value="'+b.S_CLASS_CD+'">'+b.S_CLASS_CD_NM+'</option>';
						});
						$( "#"+ result.selId ).html( html );
						
						
					}
				}
				else {
					getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup,#close_confirmPopup').click(function () {
						confirmPopupRemove();
					});
				}
			},
			onFail : function (status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup,#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
			}
		});
		
	}());
}(window, document));

function getSearchParameter(){
	var search = location.search;
	var parameters = '';
	
	search = search.split("?");
	var data = search[1].split("&");
	
	for (i = 0; i <= data.length - 1; i++) {
		if( data[i].indexOf('REQ_SEQ=') < 0 ){
			parameters += "&" + data[i];
		}
	}
	
	$reqBoardDetail.searchParameter = parameters.substr(1);
}
