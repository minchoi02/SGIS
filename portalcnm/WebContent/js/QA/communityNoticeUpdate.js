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
// for return
var searchWordType = getParameter('searchWordType');
var searchWord = getParameter('searchWord');
var PRIORITY_DISP_YN = getParameter('PRIORITY_DISP_YN');
var pageNumber = getParameter('pageNumber');
var order = getParameter('order');
var sort = getParameter('sort');
var pluploader = {};
(function(W, D) {
	W.$boardUpdate = W.$boardUpdate || {};
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
						$boardUpdate.reqBoard();
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
																			var DELETE_FILE_YN = 'N';
																			if ($('#delAttachmentCheckbox').is(':checked') == true) {
																				DELETE_FILE_YN = 'Y';
																			}
																			var FILE_YN = 'N';
																			if (($('#delAttachmentCheckbox').is(':checked') == true
																					&& $('#fileName').html() != null && $('#fileName').html().replace(
																					/(^\s*)|(\s*$)/g, '') != '')
																					|| ($('#oldFile').html() == '' && $('#fileName').html() != null && $(
																							'#fileName').html().replace(/(^\s*)|(\s*$)/g, '') != '')
																					|| ($('#delAttachmentCheckbox').is(':visible') == false
																							&& $('#fileName').html() != null && $('#fileName').html().replace(
																							/(^\s*)|(\s*$)/g, '') != '')
																					|| ($('#delAttachmentCheckbox').is(':checked') == false
																							&& $('#oldFile').html() != null && $('#oldFile').html().replace(
																							/(^\s*)|(\s*$)/g, '') != '')) {
																				FILE_YN = 'Y';
																			}
																			if (FILE_YN == 'Y') {
																				if (DELETE_FILE_YN == 'Y') {
																					$('.maskbg').fadeIn(200);
																					$('.maskcontent').fadeIn(400);
																					pluploader.start();
																				}
																				if (DELETE_FILE_YN == 'N') {
																					if ($('#delAttachmentSpan').is(':visible') == false) {
																						$('.maskbg').fadeIn(200);
																						$('.maskcontent').fadeIn(400);
																						pluploader.start();
																					} else {
																						$boardUpdate.updateBoardInner(POST_NO, encodeURIComponent(POST_TITLE),
																								PRIORITY_DISP_YN, encodeURIComponent(POST_CONTENT),
																								DELETE_FILE_YN, FILE_YN);
																					}
																				}
																			} else {
																				$boardUpdate.updateBoardInner(POST_NO, encodeURIComponent(POST_TITLE),
																						PRIORITY_DISP_YN, encodeURIComponent(POST_CONTENT), DELETE_FILE_YN,
																						FILE_YN);
																			}
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
									location.href = "./../QA/communityNoticeManage.html?searchWordType=" + searchWordType + "&searchWord=" + searchWord + "&pageNumber="
											+ pageNumber + "&sort=" + sort + "&order=" + order + "&PRIORITY_DISP_YN=" + PRIORITY_DISP_YN;

								});
						// plupload plugins
						pluploader = new plupload.Uploader({
							url : contextPath + '/ServiceAPI/QA/CommunityNoticeManage/addBoardFile.json',
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
							},
						});
						pluploader.init();
						pluploader
								.bind(
										'FilesAdded',
										function(uploader, files) {
											$('#fileName')
													.html(
															files[0].name
																	+ "<a title='삭제' style='cursor:pointer' onclick='delFile()'><img src='./../include/img/btn/btn_popup_x.png' alt='삭제'><a/>");
										});
						pluploader.bind('UploadProgress', function(up, file) {
							$('#fileProgress').html('  ' + file.percent + "%");
						});
						pluploader.bind('Error', function(uploader, errObject) {
							getConfirmPopup('알림', errObject.message, 'alert');
							$('#ok_alertPopup').click(function() {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function() {
								confirmPopupRemove();
							});
						});
						pluploader.bind('FileUploaded', function(up, files, responseObject) {
							var data = $.parseJSON(responseObject.response);
							if (data.errCd == 0) {
								if (data.result.success == true) {
									var resp = data.result.FILE;
									var FILE_EXTENSION = resp.FILE_EXTENSION;
									var FILE_ID = resp.FILE_ID;
									var POST_TITLE = $('#POST_TITLE').val().replace(/(^\s*)|(\s*$)/g, '');
									// var POST_CONTENT=
									// $('#POST_CONTENT').val().replace(/(^\s*)|(\s*$)/g,
									// '');
									var POST_CONTENT = CKEDITOR.instances.POST_CONTENT.getData();
									var PRIORITY_DISP_YN = $('#PRIORITY_DISP_YN').val();
									var FILE_NM = resp.FILE_NM;
									var FILE_CONTENT_TYPE = resp.FILE_CONTENT_TYPE;
									var FILE_PATH = resp.FILE_PATH;
									var DELETE_FILE_YN = 'N';
									if ($('#delAttachmentCheckbox').is(':checked') == true) {
										DELETE_FILE_YN = 'Y';
									}
									var FILE_YN = 'Y';
									$boardUpdate.updateBoardAfterFile(POST_NO, POST_TITLE, PRIORITY_DISP_YN, POST_CONTENT, DELETE_FILE_YN, FILE_YN,
											FILE_EXTENSION, FILE_ID, FILE_NM, FILE_CONTENT_TYPE, FILE_PATH);
								}
							} else {
								getConfirmPopup('알림', data.errMsg, 'alert');
								$('#ok_alertPopup').click(function() {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function() {
									confirmPopupRemove();
								});
							}
						});
						// click the delete file checkbox
						$('#delAttachmentCheckbox').click(function() {
							if ($('#delAttachmentCheckbox').is(':checked')) {
								$('#oldFile').hide();
								$('#fileName').show();
								$('#pickfiles').show();
								pluploader.setOption('browse_button', 'pickfiles');
							} else {
								$('#oldFile').show();
								$('#fileName').hide();
								$('#pickfiles').hide();
								pluploader.setOption('browse_button', 'pickfiles1');
							}
						});

					});
	$boardUpdate = {
		// request Board
		reqBoard : function() {
			var sopOpenApiReqBoardObj = new sop.openApi.reqBoard.api();
			sopOpenApiReqBoardObj.addParam('POST_NO', POST_NO);
			sopOpenApiReqBoardObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/QA/CommunityNoticeManage/getBoard.json"
			});
		},
		updateBoardAfterFile : function(POST_NO, POST_TITLE, PRIORITY_DISP_YN, POST_CONTENT, DELETE_FILE_YN, FILE_YN, FILE_EXTENSION, FILE_ID, FILE_NM,
				FILE_CONTENT_TYPE, FILE_PATH) {
			var sopOpenApiUpdateBoardAfterFileObj = new sop.openApi.updateBoardAfterFile.api();
			sopOpenApiUpdateBoardAfterFileObj.addParam('POST_NO', POST_NO);
			sopOpenApiUpdateBoardAfterFileObj.addParam('POST_TITLE', encodeURIComponent(POST_TITLE));
			sopOpenApiUpdateBoardAfterFileObj.addParam('PRIORITY_DISP_YN', PRIORITY_DISP_YN);
			sopOpenApiUpdateBoardAfterFileObj.addParam('POST_CONTENT', encodeURIComponent(POST_CONTENT));
			sopOpenApiUpdateBoardAfterFileObj.addParam('DELETE_FILE_YN', DELETE_FILE_YN);
			sopOpenApiUpdateBoardAfterFileObj.addParam('FILE_YN', FILE_YN);
			sopOpenApiUpdateBoardAfterFileObj.addParam('FILE_EXTENSION', FILE_EXTENSION);
			sopOpenApiUpdateBoardAfterFileObj.addParam('FILE_ID', FILE_ID);
			sopOpenApiUpdateBoardAfterFileObj.addParam('FILE_NM', FILE_NM);
			sopOpenApiUpdateBoardAfterFileObj.addParam('FILE_CONTENT_TYPE', FILE_CONTENT_TYPE);
			sopOpenApiUpdateBoardAfterFileObj.addParam('FILE_PATH', FILE_PATH);
			sopOpenApiUpdateBoardAfterFileObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/QA/CommunityNoticeManage/updateBoard.json"
			});
		},
		updateBoardInner : function(POST_NO, POST_TITLE, PRIORITY_DISP_YN, POST_CONTENT, DELETE_FILE_YN, FILE_YN) {
			var sopOpenApiupdateBoardInnerObj = new sop.openApi.updateBoardInner.api();
			sopOpenApiupdateBoardInnerObj.addParam('POST_NO', POST_NO);
			sopOpenApiupdateBoardInnerObj.addParam('POST_TITLE', POST_TITLE);
			sopOpenApiupdateBoardInnerObj.addParam('PRIORITY_DISP_YN', PRIORITY_DISP_YN);
			sopOpenApiupdateBoardInnerObj.addParam('POST_CONTENT', POST_CONTENT);
			sopOpenApiupdateBoardInnerObj.addParam('DELETE_FILE_YN', DELETE_FILE_YN);
			sopOpenApiupdateBoardInnerObj.addParam('FILE_YN', FILE_YN);
			sopOpenApiupdateBoardInnerObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/QA/CommunityNoticeManage/updateBoard.json"
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
							if (result.board.FILE_YN == 'Y') {
								if (result.file != null) {
									$('#FILE').hide();
									$('#oldFile').text(result.file.FILE_NM + '.' + result.file.FILE_EXTENSION);
								}
							} else if (result.board.FILE_YN == 'N') {
								$('#FILE').show();
								$('#delAttachmentSpan').hide();
							}
						}
						if ($('#oldFile').html() != '') {
							$('#pickfiles').hide();
							pluploader.setOption('browse_button', 'pickfiles1');
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
						location.href = './../QA/communityNoticeManage.html';
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function() {
						location.href = './../QA/communityNoticeManage.html';
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
										location.href = "./../QA/communityNoticeManage.html?searchWordType=" + searchWordType + "&searchWord=" + searchWord
												+ "&pageNumber=" + pageNumber + "&sort=" + sort + "&order=" + order + "&PRIORITY_DISP_YN=" + PRIORITY_DISP_YN;
										confirmPopupRemove();
									});
							$('#close_confirmPopup').click(
									function() {
										location.href = "./../QA/communityNoticeManage.html?searchWordType=" + searchWordType + "&searchWord=" + searchWord
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
function delFile() {
	pluploader.removeFile(pluploader.files[0]);
	$('#fileName').html('');
}