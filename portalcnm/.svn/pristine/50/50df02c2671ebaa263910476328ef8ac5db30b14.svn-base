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
var BOARD_CD = getParameter('BOARD_CD');
(function(W, D) {
	W.$faqDetail = W.$faqDetail || {};
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
				$(".boardName1").html( $(".leftMenu>ul>li>a.on").text() );
				$(".boardName2").html( $(".sub>li>a.on").text() );
				
				srvLogWrite("L0", "05", "01", "15", "", "");
				CKEDITOR.replace('POST_CONTENT', {
					resize_enabled : false,
					removePlugins : 'toolbar,elementspath',
					readOnly : true					
				});

				$faqDetail.requestDetail();
				$('#modifyButton').click(
						function() {
							srvLogWrite("L0", "05", "01", "16", "", "");
							getConfirmPopup('확인', '수정하시겠습니까?', 'confirm');
							$('#ok_confirmPopup').click(
									function() {
										location.href = './../QA/faqUpdate.html?BOARD_CD='+BOARD_CD+'&POST_NO=' + POST_NO + "&searchWordType=" + searchWordType + "&searchWord="
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
							var url = './../QA/faqManage.html';
							
							if( BOARD_CD == 'BOARD_013' ){
								url = './../QA/eduFaqManage.html';
							}
								
							location.href = url+"?searchWordType=" + searchWordType + "&searchWord=" + searchWord + "&pageNumber="
									+ pageNumber + "&sort=" + sort + "&order=" + order + "&PRIORITY_DISP_YN=" + PRIORITY_DISP_YN;
						});

			});

	$faqDetail = {
		requestDetail : function() {
			var sopOpenApiRequestDetailObj = new sop.openApi.requestDetail.api();
			sopOpenApiRequestDetailObj.addParam('BOARD_CD', BOARD_CD);
			sopOpenApiRequestDetailObj.addParam('POST_NO', POST_NO);
			sopOpenApiRequestDetailObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/QA/BoardManage/getFAQ.json"
			});
		},
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
										CKEDITOR.instances.POST_CONTENT.setData($('#POST_CONTENT').text());

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