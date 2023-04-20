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
	W.$TTIPDetail = W.$TTIPDetail || {};
	// get From URL
	var TTIP_ID = getParameter('TTIP_ID');
	// for return
	var TITLE = getParameter('TITLE');
	var MENU_NM = getParameter('MENU_NM');
	var TTIP_EXP = getParameter('TTIP_EXP');
	var CLASS_CD = getParameter('CLASS_CD');
	$(document).ready(
			function() {
				CKEDITOR.replace('POST_CONTENT', 
						{
							resize_enabled : false,
							removePlugins : 'toolbar,elementspath',
							readOnly : true					
						});

				$TTIPDetail.requestDetail();
				$('#modifyButton').click(
						function() {
							getConfirmPopup('확인', '수정하시겠습니까?', 'confirm');
							$('#ok_confirmPopup').click(
									function() {
										srvLogWrite("L0", "04", "03", "05", "", "");
										location.href = './../DT/TTIPUpdate.html?TTIP_ID=' + TTIP_ID + "&TITLE=" + TITLE + "&MENU_NM="
												+ MENU_NM + "&TTIP_EXP=" + TTIP_EXP + "&CLASS_CD=" + CLASS_CD;
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
							location.href = "./../DT/EXPTTIPManage.html";
						});

			});

	$TTIPDetail = {
		requestDetail : function() {
			var sopOpenApiRequestDetailObj = new sop.openApi.requestDetail.api();
			sopOpenApiRequestDetailObj.addParam('POST_NO', TTIP_ID);
			sopOpenApiRequestDetailObj.addParam('CLASS_CD', CLASS_CD);
			sopOpenApiRequestDetailObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/DT/TTIPManage/getTTIP.json"
			});
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
										
										$('#postTitle').html(result.rows[0].TTIP_NM);
										
										var PRIORITY_DISP_YN = result.rows[0].MENU_CLASS_CD;
										if(PRIORITY_DISP_YN=='A0'){
											PRIORITY_DISP_YN = "대화형통계지도";
										}else if(PRIORITY_DISP_YN=='B0'){
											PRIORITY_DISP_YN = "생활업조지도";
										}else if(PRIORITY_DISP_YN=='C0'){
											PRIORITY_DISP_YN = "통계소통지도";
										}else if(PRIORITY_DISP_YN=='D0'){
											PRIORITY_DISP_YN = "주거지분석";
										}
										var ttip_id = result.rows[0].TTIP_ID;
										$('#priority_disp_yn').text(PRIORITY_DISP_YN);
										$('#ttip_id').text(ttip_id);
										$('#POST_CONTENT').html(result.rows[0].TTIP_EXP);
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
	// download file
}(window, document));