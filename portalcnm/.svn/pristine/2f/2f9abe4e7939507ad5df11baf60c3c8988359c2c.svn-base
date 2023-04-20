/**
 * 
 * @JSName: boardAdd
 * @Description: modify by liudandan 2014/11/17/ 17:00:00
 * 
 * @author: chenzhanchao
 * @date:2014/11/03/ 08:30:00
 * @version V1.0
 * 
 */
// for return
var BOARD_CD = getParameter('BOARD_CD');
var searchWordType = getParameter('searchWordType');
var searchWord = getParameter('searchWord');
var PRIORITY_DISP_YN = getParameter('PRIORITY_DISP_YN');
var pageNumber = getParameter('pageNumber');
var order = getParameter('order');
var sort = getParameter('sort');
var pluploader = {};
(function(W, D) {
	W.$boardAdd = W.$boardAdd || {};
	$(document)
			.ready(
					function() {
						$(".boardName1").html( $(".leftMenu>ul>li>a.on").text() );
						$(".boardName2").html( $(".sub>li>a.on").text() );
						
						document.getElementById('resetForm').reset();
						if ($.fn.validatebox) {
							$.fn.validatebox.defaults.missingMessage = '이 입력 항목은 필수 입력 항목 입니다.';
						}
						$('#POST_TITLE').validatebox({
							required : true,
							validType : [ 'byteSizeVal[200]' ]
						});
						$('#POST_TITLE').validatebox('disableValidation');

						/*
						 * $('#POST_CONTENT').validatebox({ required: true,
						 * validType:['byteSizeVal[4000]'] });
						 */

						// $('#POST_CONTENT').validatebox('disableValidation');
						CKEDITOR.replace('POST_CONTENT', {
							filebrowserUploadUrl : contextPath + "/js/plugins/ckeditor/ckeditorImageUpload.jsp?realUrl=" + contextPath
									+ "/upload/temp/&realDir=/upload/temp/",
							toolbar : [

									{
										name : 'basicstyles',
										groups : [ 'basicstyles', 'cleanup' ],
										items : [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ]
									}, {
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
										items : [ 'Image', 'Flash', 'Table', 'HorizontalRule',  'SpecialChar' ]
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

						$("#POST_TITLE").keyup(function() {
							$("#POST_TITLE").validatebox('enableValidation');
						});

						// click the add button
						$('#addButton').click(function() {
							$('#POST_TITLE').validatebox('enableValidation');
							// $('#POST_CONTENT').validatebox('enableValidation');
							var POST_TITLE = $('#POST_TITLE').val().replace(/(^\s*)|(\s*$)/g, '');
							// var POST_CONTENT =
							// $('#POST_CONTENT').val().replace(/(^\s*)|(\s*$)/g,
							// '');
							var POST_CONTENT = CKEDITOR.instances.POST_CONTENT.getData();

							var PRIORITY_DISP_YN = $('#PRIORITY_DISP_YN').val();
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
										getConfirmPopup('확인', '등록하시겠습니까?', 'confirm');
										$('#ok_confirmPopup').click(function() {
											var fileName = $('#fileName').text().replace(/(^\s*)|(\s*$)/g, '');
											if (fileName != null && fileName.length > 0) {
												$('.maskbg').fadeIn(200);
												$('.maskcontent').fadeIn(400);
												pluploader.start();
											} else {
												$boardAdd.addBoard(POST_TITLE, PRIORITY_DISP_YN, POST_CONTENT, 'N');
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
									$boardAdd.list();
								});
						// plupload plugins
						pluploader = new plupload.Uploader({
							url : contextPath + '/ServiceAPI/QA/BoardManage/addBoardFile.json',
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
																	+ "<a onclick='$(\"#fileName\").empty()' style='cursor: pointer' title='삭제'><img src='./../include/img/btn/btn_popup_x.png' alt='삭제'><a/>");
										});
						pluploader.bind('FileUploaded', function(up, files, responseObject) {
							var data = $.parseJSON(responseObject.response);
							if (data.errCd == "0") {
								if (data.result != null) {
									if (data.result.success == true) {
										var POST_TITLE = $('#POST_TITLE').val().replace(/(^\s*)|(\s*$)/g, '');
										// var POST_CONTENT =
										// $('#POST_CONTENT').val().replace(/(^\s*)|(\s*$)/g,
										// '');
										var POST_CONTENT = CKEDITOR.instances.POST_CONTENT.getData();
										var PRIORITY_DISP_YN = $('#PRIORITY_DISP_YN').val();
										$boardAdd.addBoard(encodeURIComponent(POST_TITLE), PRIORITY_DISP_YN, POST_CONTENT, 'Y', data.result.FILE);
									} else {
										getConfirmPopup('알림', data.result.msg, 'alert');
										$('#ok_alertPopup').click(function() {
											confirmPopupRemove();
										});
										$('#close_confirmPopup').click(function() {
											confirmPopupRemove();
										});
										$('#fileName').empty();
										$('#fileProgress').empty();
									}
								}
							} else {
								getConfirmPopup('알림', data.errMsg, 'alert');
								$('#ok_alertPopup').click(function() {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function() {
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
	$boardAdd = {
		addBoard : function(POST_TITLE, PRIORITY_DISP_YN, POST_CONTENT, FILE_YN, FILE) {
			var sopOpenApiAddBoardObj = new sop.openApi.addBoard.api();
			if( BOARD_CD ){
				sopOpenApiAddBoardObj.addParam('BOARD_CD', BOARD_CD);
			}
			sopOpenApiAddBoardObj.addParam('POST_TITLE', POST_TITLE);
			sopOpenApiAddBoardObj.addParam('PRIORITY_DISP_YN', PRIORITY_DISP_YN);
			sopOpenApiAddBoardObj.addParam('POST_CONTENT', encodeURIComponent(POST_CONTENT));
			sopOpenApiAddBoardObj.addParam('FILE_YN', FILE_YN);
			if (FILE_YN == 'Y') {
				sopOpenApiAddBoardObj.addParam('FILE_ID', FILE.FILE_ID);
				sopOpenApiAddBoardObj.addParam('FILE_NM', FILE.FILE_NM);
				sopOpenApiAddBoardObj.addParam('FILE_EXTENSION', FILE.FILE_EXTENSION);
				sopOpenApiAddBoardObj.addParam('FILE_PATH', FILE.FILE_PATH);
				sopOpenApiAddBoardObj.addParam('FILE_CONTENT_TYPE', FILE.FILE_CONTENT_TYPE);
			}
			sopOpenApiAddBoardObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/QA/BoardManage/addBoard.json"
			});
		},
		
		list : function(){
			var url = './../QA/boardManage.html';
			
			if( BOARD_CD == 'BOARD_012' ){
				url = './../QA/eduBoardManage.html';
			}
			
			location.href = url + "?searchWordType=" + searchWordType + "&searchWord=" + searchWord + "&pageNumber="
			+ pageNumber + "&sort=" + sort + "&order=" + order + "&PRIORITY_DISP_YN=" + PRIORITY_DISP_YN;
		}
	};
	(function() {
		$class("sop.openApi.addBoard.api").extend(sop.cnm.absAPI).define(
				{
					onSuccess : function(status, res) {
						var result = res.result;
						if (res.errCd == "0") {
							if (result != null) {
								getConfirmPopup('알림', result.msg, 'alert');
								$('#ok_alertPopup').click(
										function() {
											if (result.success == true) {
												$boardAdd.list();
											}
											confirmPopupRemove();
										});
								$('#close_confirmPopup').click(
										function() {
											if (result.success == true) {
												$boardAdd.list();
											}
											confirmPopupRemove();
										});
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
						$('.maskbg').fadeOut(800);
						$('.maskcontent').fadeOut(800);
					}
				});
	}());
}(window, document));