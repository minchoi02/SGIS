/**
 * 
 * @JSName: boardDetail
 * @Description: modify by liudandan 2014/11/17/ 17:00:00
 * 
 * @author: chenzhanchao
 * @date: 2014/10/28/ 01:30:00
 * @version V1.0
 * 
 */
(function(W, D) {
	W.$DevbannerDetail = W.$DevbannerDetail || {};
	// get From URL
	var POST_NO = getParameter('POSTNO');
	// for return
	var searchWordType = getParameter('searchWordType');
	var searchWord = getParameter('searchWord');
	var PRIORITY_DISP_YN = getParameter('PRIORITY_DISP_YN');
	var pageNumber = getParameter('pageNumber');
	var order = getParameter('order');
	var sort = getParameter('sort');
	$(document).ready(
			function() {
				CKEDITOR.replace('POST_CONTENT', {
					resize_enabled : false,
					removePlugins : 'toolbar,elementspath',
					readOnly : true	
				});
				window.parent.CKEDITOR.tools.callFunction('${CKEditorFuncNum','${readDir}','전송 완료');

				$DevbannerDetail.requestDetail();
				$('#modifyButton').click(
						function() {
							srvLogWrite("L0", "03", "06", "03", "", "");
							getConfirmPopup('확인', '수정하시겠습니까?', 'confirm');
							$('#ok_confirmPopup').click(
									function() {
										location.href = './../QA/DevbannerUpdate.html?POST_NO=' + POST_NO + "&searchWordType=" + searchWordType + "&searchWord="
												+ searchWord + "&pageNumber=" + pageNumber + "&sort=" + sort + "&order=" + order + "&PRIORITY_DISP_YN="
												+ PRIORITY_DISP_YN;
										confirmPopupRemove();
									});
							$('#cancel_confirmPopup').click(function() {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function() {
								confirmPopupRemove();
							});
						});

				$('#toContantButton').click(
						function() {
							location.href = "./../DT/BannerManage.html?searchWordType=" + searchWordType + "&searchWord=" + searchWord + "&pageNumber="
									+ pageNumber + "&sort=" + sort + "&order=" + order + "&PRIORITY_DISP_YN=" + PRIORITY_DISP_YN;
						});

			});

	$DevbannerDetail = {
		requestDetail : function() {
			var sopOpenApiRequestDetailObj = new sop.openApi.requestDetail.api();
			sopOpenApiRequestDetailObj.addParam('POST_NO', POST_NO);
			console.log("POST_NO");
			sopOpenApiRequestDetailObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/QA/DevfaqManage/getBanner.json"
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
	// request board detail
	(function() {
		$class("sop.openApi.requestDetail.api")
				.extend(sop.cnm.absAPI)
				.define(
						{
							onSuccess : function(status, res) {
								if (res.errCd == "0") {
									var result = res.result;
									if (result != null) {
										$('#postTitle').html(result.board.POST_TITLE);
										var PRIORITY_DISP_YN = result.board.PRIORITY_DISP_YN;
										if (PRIORITY_DISP_YN != null && PRIORITY_DISP_YN == 'Y')
											PRIORITY_DISP_YN = "네";
										else
											PRIORITY_DISP_YN = "아니오";

										$('#priority_disp_yn').text(PRIORITY_DISP_YN);
										$('#POST_CONTENT').html(result.board.POST_CONTENT);
										$('#LINK_URL').html(result.board.LINK_URL);
										CKEDITOR.instances.POST_CONTENT.setData($('#POST_CONTENT'));

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
	// download file
	(function() {
		$class("sop.openApi.downloadFile.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				if (res.errCd == "0") {
					var result = res.result;
					if (result != null) {
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(function() {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function() {
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