/**
 * 
 * @JSName: boardUpdate
 * @Description:
 * 
 * @author: liudandan
 * @date: 2014/11/04/ 15:00:00
 * @version V1.0
 * 
 */
//for return
var searchWordType = getParameter('searchWordType');
var searchWord = getParameter('searchWord');
var PRIORITY_DISP_YN = getParameter('PRIORITY_DISP_YN');
var pageNumber = getParameter('pageNumber');
var order = getParameter('order');
var sort = getParameter('sort');
var pluploader = {};
(function(W, D) {
	W.$DevfaqUpdate = W.$DevfaqUpdate || {};
	// get From URL
	var POST_NO = getParameter('POST_NO');
	var uploadFile = null;
	$(document)
	.ready(
			function() {
				// reset page
				document.getElementById('resetForm').reset();
				if ($.fn.validatebox) {
					$.fn.validatebox.defaults.missingMessage = '이 입력 항목은 필수 입력 항목 입니다.';
				}
				CKEDITOR.replace('POST_CONTENT', {
					filebrowserUploadUrl : contextPath + "/js/plugins/ckeditor/ckeditorImageUpload.jsp?realUrl=" + contextPath
					+ "/upload/temp/&realDir=/upload/temp/",
					toolbar : [

					           {
					        	   name : 'basicstyles',
					        	   groups : [ 'basicstyles', 'cleanup' ],
					        	   items : [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ]
					           },
					           {
					        	   name : 'colors',
					        	   items : [ 'TextColor', 'BGColor' ]
					           },
					           {
					        	   name : 'paragraph',
					        	   groups : [ 'list', 'indent', 'blocks', 'align', 'bidi' ],
					        	   items : [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft',
					        	             'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ]
					           }, {
					        	   name : 'links',
					        	   items : [ 'Link', 'Anchor' ]
					           }, '/', {
					        	   name : 'insert',
					        	   items : [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'SpecialChar' ]
					           }, {
					        	   name : 'styles',
					        	   items : [ 'Styles', 'Format', 'Font', 'FontSize' ]
					           } ]
				});
				CKEDITOR.on('dialogDefinition', function(ev) {
					var dialogName = ev.data.name;
					var dialog = ev.data.definition.dialog;
					var dialogDefinition = ev.data.definition;
					if (dialogName == 'image') {
						dialog.on('show', function(obj) {
							this.selectPage('Upload'); // 업로드텝으로 시작
						});
						dialogDefinition.removeContents('advanced'); // 자세히탭
						// 제거
						dialogDefinition.removeContents('Link'); // 링크탭
						// 제거
					}
					if (dialogName == 'link') {
						dialogDefinition.removeContents('upload'); // 업로드탭 제거
						dialogDefinition.removeContents('advanced'); // 자세히탭 제거

						var target = ev.data.definition.getContents('target');
						var targetField = target.get( 'linkTargetType' );
						targetField['default'] = 'popup';
						var tempSelectItems = [];
						$.each(targetField.items, function(key, value){
							if(key == 2) {
								tempSelectItems.push(this);
							}
						});
						targetField.items = tempSelectItems;

						var aa = $("input[class='cke_dialog_ui_checkbox_input']");
						var bb = $("input[type=checkbox]");
						console.log(aa);
						console.log(bb);
					}
				});
				// request Board information
				$DevfaqUpdate.reqBoard();
				$('#POST_TITLE').validatebox({
					required : true,
					validType : [ 'byteSizeVal[200]' ]
				});
				$('#POST_TITLE').validatebox('disableValidation');
				/*
				 * $('#POST_CONTENT').validatebox({ required: true,
				 * validType:['byteSizeVal[4000]'] });
				 * $('#POST_CONTENT').validatebox('disableValidation');
				 */
				$("#POST_TITLE").keyup(function() {
					$("#POST_TITLE").validatebox('enableValidation');
				});

				// click the modify button
				$('#modifyButton')
				.click(
						function() {
							$('#POST_TITLE').validatebox('enableValidation');
							// $('#POST_CONTENT').validatebox('enableValidation');
							var POST_TITLE = $('#POST_TITLE').val().replace(/(^\s*)|(\s*$)/g, '');
							// var POST_CONTENT =
							// $('#POST_CONTENT').val().replace(/(^\s*)|(\s*$)/g,
							// '');
							var POST_CONTENT = CKEDITOR.instances.POST_CONTENT.getData();
							if (POST_TITLE.length == 0) {
								$('#POST_TITLE').val('');
								$('#POST_TITLE').focus();
							} else if (POST_CONTENT.length == 0) {
								getConfirmPopup('알림', '내용을 입력해주세요.', 'alert');
								$('#ok_alertPopup').click(function() {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function() {
									confirmPopupRemove();
								});
							} else if ($('#POST_TITLE').validatebox('isValid')) {
								if (getBytesCount(POST_TITLE) < 200) {
									if (getBytesCount(POST_CONTENT) < 4000) {
										getConfirmPopup('확인', '수정하시겠습니까?', 'confirm');
										$('#ok_confirmPopup')
										.click(
												function() {
													var PRIORITY_DISP_YN = $('#PRIORITY_DISP_YN').val();
													$DevfaqUpdate.updateBoardInner(POST_NO, encodeURIComponent(POST_TITLE),
															PRIORITY_DISP_YN, encodeURIComponent(POST_CONTENT));
													confirmPopupRemove();
												});
										$('#cancel_confirmPopup').click(function() {
											confirmPopupRemove();
										});
										$('#close_confirmPopup').click(function() {
											confirmPopupRemove();
										});
									} else {
										getConfirmPopup('알림', '내용이 지정된  입력범위를 4000Byte 초과하였습니다.', 'alert');
										$('#ok_alertPopup').click(function() {
											confirmPopupRemove();
										});
										$('#close_confirmPopup').click(function() {
											confirmPopupRemove();
										});
									}
								} else {
									getConfirmPopup('알림', '제목이 지정된  입력범위를 200Byte 초과하였습니다.', 'alert');
									$('#ok_alertPopup').click(function() {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function() {
										confirmPopupRemove();
									});
								}
							}
						});
				// click the cancel button
				$('#cancelButton').click(
						function() {
							location.href = "./../QA/DevfaqManage.html?searchWordType=" + searchWordType + "&searchWord=" + searchWord + "&pageNumber="
							+ pageNumber + "&sort=" + sort + "&order=" + order + "&PRIORITY_DISP_YN=" + PRIORITY_DISP_YN;

						});

			});
	$DevfaqUpdate = {
			// request Board
			reqBoard : function() {
				var sopOpenApiReqBoardObj = new sop.openApi.reqBoard.api();
				sopOpenApiReqBoardObj.addParam('POST_NO', POST_NO);
				sopOpenApiReqBoardObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/QA/DevfaqManage/getFAQ.json"
				});
			},
			updateBoardInner : function(POST_NO, POST_TITLE, PRIORITY_DISP_YN, POST_CONTENT) {
				var sopOpenApiupdateBoardInnerObj = new sop.openApi.updateBoardInner.api();
				sopOpenApiupdateBoardInnerObj.addParam('POST_NO', POST_NO);
				sopOpenApiupdateBoardInnerObj.addParam('POST_TITLE', POST_TITLE);
				sopOpenApiupdateBoardInnerObj.addParam('PRIORITY_DISP_YN', PRIORITY_DISP_YN);
				sopOpenApiupdateBoardInnerObj.addParam('POST_CONTENT', POST_CONTENT);
				sopOpenApiupdateBoardInnerObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/QA/DevfaqManage/updateFAQ.json"
				});
			}
	};
	// request Board
	(function() {
		$class("sop.openApi.reqBoard.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						if (result.board != null) {
							$("#BMcontent").html(result.board.POST_TITLE);
							var titleText = $("#BMcontent").text();
							$('#POST_TITLE').val(titleText);

							$('#POST_CONTENT').html(result.board.POST_CONTENT);
							CKEDITOR.instances.POST_CONTENT.setData($('#POST_CONTENT').text());
							$('#PRIORITY_DISP_YN').val(result.board.PRIORITY_DISP_YN);
						}
					}
				} else {
					getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup').click(function() {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function() {
						confirmPopupRemove();
					});
				}
			},
			onFail : function(status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function() {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function() {
					confirmPopupRemove();
				});
			}
		});
	}());
	// updateBoardAfter upload file
	(function() {
		$class("sop.openApi.updateBoardAfterFile.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				if (res.errCd == "0") {
					getConfirmPopup('알림', res.result.msg, 'alert');
					$('#ok_alertPopup').click(function() {
						location.href = './../QA/DevfaqManage.html';
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function() {
						location.href = './../QA/DevfaqManage.html';
						confirmPopupRemove();
					});
				} else {
					getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup').click(function() {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function() {
						confirmPopupRemove();
					});
				}
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);
			},
			onFail : function(status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function() {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function() {
					confirmPopupRemove();
				});
			}
		});
	}());
	//updateBoardInner upload file
	(function() {
		$class("sop.openApi.updateBoardInner.api").extend(sop.cnm.absAPI).define(
				{
					onSuccess : function(status, res) {
						if (res.errCd == "0") {
							getConfirmPopup('알림', res.result.msg, 'alert');
							$('#ok_alertPopup').click(
									function() {
										location.href = "./../QA/DevfaqManage.html?searchWordType=" + searchWordType + "&searchWord=" + searchWord
										+ "&pageNumber=" + pageNumber + "&sort=" + sort + "&order=" + order + "&PRIORITY_DISP_YN=" + PRIORITY_DISP_YN;
										confirmPopupRemove();
									});
							$('#close_confirmPopup').click(
									function() {
										location.href = "./../QA/DevfaqManage.html?searchWordType=" + searchWordType + "&searchWord=" + searchWord
										+ "&pageNumber=" + pageNumber + "&sort=" + sort + "&order=" + order + "&PRIORITY_DISP_YN=" + PRIORITY_DISP_YN;
										confirmPopupRemove();
									});
						} else {
							getConfirmPopup('알림', res.errMsg, 'alert');
							$('#ok_alertPopup').click(function() {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function() {
								confirmPopupRemove();
							});
						}
					},
					onFail : function(status) {
						getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
						$('#ok_alertPopup').click(function() {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function() {
							confirmPopupRemove();
						});
					}
				});
	}());
}(window, document));
