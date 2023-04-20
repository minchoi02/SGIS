/**
 * 
 * @JSName: WorkRoadStatsItemManageDetail.js
 * @Description: 일자리 통계항목 관리 상세 js
 * 
 * @author: 한광희
 * @date: 2019.08.02
 * @version V1.0
 *
 */
(function(W, D) {
	W.$WorkRoadStatsItemManageDetail = W.$WorkRoadStatsItemManageDetail || {};
	// get From URL
	var LINK_ID = getParameter('LINK_ID');
	// for return
	var STAT_NM = getParameter('STAT_NM');
	var STAT_DEFINITION = getParameter('STAT_DEFINITION');
	var STAT_EXP = getParameter('STAT_EXP');
	var COLCT_SOURCE = getParameter('COLCT_SOURCE');
	var UPDT_CYCLE = getParameter('UPDT_CYCLE');
	var STAT_PATH = getParameter('STAT_PATH');
	var REFRN_URL = getParameter('REFRN_URL');
	$(document).ready(
			function() {
				CKEDITOR.replace('POST_CONTENT', 
						{
							resize_enabled : false,
							removePlugins : 'toolbar,elementspath',
							readOnly : true					
						});

				$WorkRoadStatsItemManageDetail.requestDetail();
				$('#modifyButton').click(
						function() {
							getConfirmPopup('확인', '수정하시겠습니까?', 'confirm');
							$('#ok_confirmPopup').click(
									function() {
										srvLogWrite("L0", "04", "03", "05", "", "");
										location.href = './../DT/WorkRoadStatsItemManageUpdate.html?LINK_ID=' + LINK_ID + "&STAT_NM=" + STAT_NM + "&STAT_DEFINITION="
												+ STAT_DEFINITION + "&STAT_EXP=" + STAT_EXP + "&COLCT_SOURCE=" + COLCT_SOURCE + "&UPDT_CYCLE=" + UPDT_CYCLE + "&STAT_PATH=" + STAT_PATH + "&REFRN_URL=" + REFRN_URL;
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
							location.href = "./../DT/WorkRoadStatsItemManage.html";
						});

			});

	$WorkRoadStatsItemManageDetail = {
		requestDetail : function() {
			var sopOpenApiRequestDetailObj = new sop.openApi.requestDetail.api();
			sopOpenApiRequestDetailObj.addParam('POST_NO', LINK_ID);
			sopOpenApiRequestDetailObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/DT/WorkRoadStatsItemManage/getWorkRoadStatsItemManage.json"
			});
		}
	};
	// request detail
	(function() {
		$class("sop.openApi.requestDetail.api")
				.extend(sop.cnm.absAPI)
				.define(
						{
							onSuccess : function(status, res) {
								if (res.errCd == "0") {
									var result = res.result;
									if (result != null) {
										$('#link_id').text(result.rows[0].LINK_ID);						// 연계ID
										$('#stat_nm').text(result.rows[0].STAT_NM);						// 통계명
										$('#stat_definition').text(result.rows[0].STAT_DEFINITION);		// 정의
										$('#colct_source').text(result.rows[0].COLCT_SOURCE);			// 수집출처
										$('#updt_cycle').text(result.rows[0].UPDT_CYCLE);				// 갱신주기
										$('#stat_path').text(result.rows[0].STAT_PATH);					// 통계경로
										$('#refrn_url').text(result.rows[0].REFRN_URL);					// 참조 URL
										$('#POST_CONTENT').html(result.rows[0].STAT_EXP);				// 설명
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