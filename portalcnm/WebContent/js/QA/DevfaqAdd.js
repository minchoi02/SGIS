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
var searchWordType = getParameter('searchWordType');
var searchWord = getParameter('searchWord');
var PRIORITY_DISP_YN = getParameter('PRIORITY_DISP_YN');
var pageNumber = getParameter('pageNumber');
var order = getParameter('order');
var sort = getParameter('sort');
var pluploader = {};
(function(W, D) {
	W.$DevfaqAdd = W.$DevfaqAdd || {};
	$(document)
			.ready(
					function() {
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
											$DevfaqAdd.addBoard(POST_TITLE, PRIORITY_DISP_YN, POST_CONTENT);
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
						// plupload plugins
						
						
					});
	$DevfaqAdd = {
		addBoard : function(POST_TITLE, PRIORITY_DISP_YN, POST_CONTENT) {
			var sopOpenApiAddBoardObj = new sop.openApi.addBoard.api();
			sopOpenApiAddBoardObj.addParam('POST_TITLE', POST_TITLE);
			sopOpenApiAddBoardObj.addParam('PRIORITY_DISP_YN', PRIORITY_DISP_YN);
			sopOpenApiAddBoardObj.addParam('POST_CONTENT', encodeURIComponent(POST_CONTENT));
			sopOpenApiAddBoardObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/QA/DevfaqManage/addFAQ.json"
			});
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
												location.href = "./../QA/DevfaqManage.html?searchWordType=" + searchWordType + "&searchWord=" + searchWord
														+ "&pageNumber=" + pageNumber + "&sort=" + sort + "&order=" + order + "&PRIORITY_DISP_YN="
														+ PRIORITY_DISP_YN;
											}
											confirmPopupRemove();
										});
								$('#close_confirmPopup').click(
										function() {
											if (result.success == true) {
												location.href = "./../QA/DevfaqManage.html?searchWordType=" + searchWordType + "&searchWord=" + searchWord
														+ "&pageNumber=" + pageNumber + "&sort=" + sort + "&order=" + order + "&PRIORITY_DISP_YN="
														+ PRIORITY_DISP_YN;
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