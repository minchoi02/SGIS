/**
 * 
 * @JSName: WorkRoadStatsInfoSmAdd
 * @Description:
 * 
 * @author: 김남민
 * @date: 2019/08/01/ 08:30:00
 * @version V1.0
 * 
 */

//for return
(function(W, D) {
	W.$WorkRoadStatsInfoSmAdd = W.$WorkRoadStatsInfoSmAdd || {};
	// get From URL
	$(document).ready(function() {
		
		// reset page
		document.getElementById('resetForm').reset();
		
		//목록 버튼
		$('#cancelButton').click(function() {
			location.href = './WorkRoadStatsInfoSm.html';
		});
		
		//Validation
		if ($.fn.validatebox) {
			$.fn.validatebox.defaults.missingMessage = '이 입력 항목은 필수 입력 항목 입니다.';
		}
		//등록ID(REG_ID) 필수값
		$('#REG_ID').validatebox({
			required : true,
			validType : [ 'byteSizeVal[100]' ]
		});
		$('#REG_ID').validatebox('disableValidation');
		$("#REG_ID").keyup(function() {
			$("#REG_ID").validatebox('enableValidation');
		});
		//연계ID(LINK_ID) 필수값
		$('#LINK_ID').validatebox({
			required : true,
			validType : [ 'byteSizeVal[10]' ]
		});
		$('#LINK_ID').validatebox('disableValidation');
		$("#LINK_ID").keyup(function() {
			$("#LINK_ID").validatebox('enableValidation');
		});
		//수급자료명(LINK_NM) 필수값
		$('#LINK_NM').validatebox({
			required : true,
			validType : [ 'byteSizeVal[500]' ]
		});
		$('#LINK_NM').validatebox('disableValidation');
		$("#LINK_NM").keyup(function() {
			$("#LINK_NM").validatebox('enableValidation');
		});
		//접속URL(CONECT_URL) 필수값
		$('#CONECT_URL').validatebox({
			required : true,
			validType : [ 'byteSizeVal[500]' ]
		});
		$('#CONECT_URL').validatebox('disableValidation');
		$("#CONECT_URL").keyup(function() {
			$("#CONECT_URL").validatebox('enableValidation');
		});
		//접속PORT(CONECT_PORT) 필수값
		$('#CONECT_PORT').validatebox({
			required : true,
			validType : [ 'byteSizeVal[10]' ]
		});
		$('#CONECT_PORT').validatebox('disableValidation');
		$("#CONECT_PORT").keyup(function() {
			$("#CONECT_PORT").validatebox('enableValidation');
		});
		//접속승인키(CONECT_CONFM_KEY) 필수값
		$('#CONECT_CONFM_KEY').validatebox({
			required : true,
			validType : [ 'byteSizeVal[500]' ]
		});
		$('#CONECT_CONFM_KEY').validatebox('disableValidation');
		$("#CONECT_CONFM_KEY").keyup(function() {
			$("#CONECT_CONFM_KEY").validatebox('enableValidation');
		});
		
		/** 2020-04-29 [곽제욱] 추가된 컬럼중 필수값 체크 START */
		//메뉴명(STAT_PATH) 필수값
		$('#STAT_PATH').validatebox({
			required : true,
			validType : [ 'byteSizeVal[300]' ]
		});
		$('#STAT_PATH').validatebox('disableValidation');
		$("#STAT_PATH").keyup(function() {
			$("#STAT_PATH").validatebox('enableValidation');
		});
		//표출타입(DISP_TYPE) 필수값
		$('#DISP_TYPE').validatebox({
			required : true,
			validType : [ 'byteSizeVal[10]' ]
		});
		$('#DISP_TYPE').validatebox('disableValidation');
		$("#DISP_TYPE").keyup(function() {
			$("#DISP_TYPE").validatebox('enableValidation');
		});
	
		/** 2020-04-29 [곽제욱] 추가된 컬럼중 필수값 체크 END */

		//확인 버튼
		$('#modifyButton').click(function() {
			//Validation
			$('#REG_ID').validatebox('enableValidation');
			$('#LINK_ID').validatebox('enableValidation');
			$('#LINK_NM').validatebox('enableValidation');
			$('#CONECT_URL').validatebox('enableValidation');
			$('#CONECT_PORT').validatebox('enableValidation');
			$('#CONECT_CONFM_KEY').validatebox('enableValidation');
			/** 2020-04-29 [곽제욱] 추가된 컬럼중 필수값 체크 START */
			$('#STAT_PATH').validatebox('enableValidation');
			$('#DISP_TYPE').validatebox('enableValidation');
			var STAT_PATH = $('#STAT_PATH').val().replace(/(^\s*)|(\s*$)/g, '');
			var DISP_TYPE = $('#DISP_TYPE').val().replace(/(^\s*)|(\s*$)/g, '');
			/** 2020-04-29 [곽제욱] 추가된 컬럼중 필수값 체크 END */
			var REG_ID = $('#REG_ID').val().replace(/(^\s*)|(\s*$)/g, '');
			var LINK_ID = $('#LINK_ID').val().replace(/(^\s*)|(\s*$)/g, '');
			var LINK_NM = $('#LINK_NM').val().replace(/(^\s*)|(\s*$)/g, '');
			var CONECT_URL = $('#CONECT_URL').val().replace(/(^\s*)|(\s*$)/g, '');
			var CONECT_PORT = $('#CONECT_PORT').val().replace(/(^\s*)|(\s*$)/g, '');
			var CONECT_CONFM_KEY = $('#CONECT_CONFM_KEY').val().replace(/(^\s*)|(\s*$)/g, '');
			if (!$('#REG_ID').validatebox('isValid')) {
				$('#REG_ID').val('');
				$('#REG_ID').focus();
			} else if (!$('#LINK_ID').validatebox('isValid')) {
				$('#LINK_ID').val('');
				$('#LINK_ID').focus();
			} else if (!$('#LINK_NM').validatebox('isValid')) {
				$('#LINK_NM').val('');
				$('#LINK_NM').focus();
			} else if (!$('#CONECT_URL').validatebox('isValid')) {
				$('#CONECT_URL').val('');
				$('#CONECT_URL').focus();
			} else if (!$('#CONECT_PORT').validatebox('isValid')) {
				$('#CONECT_PORT').val('');
				$('#CONECT_PORT').focus();
			} else if (!$('#CONECT_CONFM_KEY').validatebox('isValid')) {
				$('#CONECT_CONFM_KEY').val('');
				$('#CONECT_CONFM_KEY').focus();
			}
			/** 2020-04-29 [곽제욱] 추가된 컬럼중 필수값 체크 START */
			else if (!$('#STAT_PATH').validatebox('isValid')) {
				$('#STAT_PATH').val('');
				$('#STAT_PATH').focus();
			}
			else if (!$('#DISP_TYPE').validatebox('isValid')) {
				$('#DISP_TYPE').val('');
				$('#DISP_TYPE').focus();
			}
			/** 2020-04-29 [곽제욱] 추가된 컬럼중 필수값 체크 END */
			//등록
			else {
				getConfirmPopup('확인', '등록하시겠습니까?', 'confirm');
				$('#ok_confirmPopup').unbind();
				$('#ok_confirmPopup').click(function() {
					$WorkRoadStatsInfoSmAdd.addData();
					confirmPopupRemove();
				});
				$('#cancel_confirmPopup').unbind();
				$('#cancel_confirmPopup').click(function() {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').unbind();
				$('#close_confirmPopup').click(function() {
					confirmPopupRemove();
				});
			}
		});
	});

	$WorkRoadStatsInfoSmAdd = {
			//등록
			addData : function() {
			var sopOpenApiaddDataObj = new sop.openApi.addData.api();
			var REG_ID = $('#REG_ID').val().replace(/(^\s*)|(\s*$)/g, '');
			var LINK_ID = $('#LINK_ID').val().replace(/(^\s*)|(\s*$)/g, '');
			var LINK_NM = $('#LINK_NM').val().replace(/(^\s*)|(\s*$)/g, '');
			var COLCT_SOURCE = $('#COLCT_SOURCE').val().replace(/(^\s*)|(\s*$)/g, '');
			var CONECT_URL = $('#CONECT_URL').val().replace(/(^\s*)|(\s*$)/g, '');
			var CONECT_PORT = $('#CONECT_PORT').val().replace(/(^\s*)|(\s*$)/g, '');
			var CONECT_CONFM_KEY = $('#CONECT_CONFM_KEY').val().replace(/(^\s*)|(\s*$)/g, '');
			/** 2020-04-29 [곽제욱] 추가된 컬럼에 대한 데이터 처리 START			 */
			var STAT_PATH = $('#STAT_PATH').val().replace(/(^\s*)|(\s*$)/g, '');
			var DISP_TYPE = $('#DISP_TYPE').val().replace(/(^\s*)|(\s*$)/g, '');
			var STAT_NM = $('#STAT_NM').val().replace(/(^\s*)|(\s*$)/g, '');
			var STAT_INFO = $('#STAT_INFO').val().replace(/(^\s*)|(\s*$)/g, '');
			var ETC_LINK_MTH = $('#ETC_LINK_MTH').val().replace(/(^\s*)|(\s*$)/g, '');
			var REFRN_URL = $('#REFRN_URL').val().replace(/(^\s*)|(\s*$)/g, '');
			//var MOD_DT = $('#MOD_DT').val().replace(/(^\s*)|(\s*$)/g, '');
			sopOpenApiaddDataObj.addParam('STAT_PATH', encodeURIComponent(STAT_PATH));
			sopOpenApiaddDataObj.addParam('DISP_TYPE', encodeURIComponent(DISP_TYPE));
			if($("input:radio[name='LINK_YN']").is(":checked")) sopOpenApiaddDataObj.addParam('LINK_YN', encodeURIComponent($("input:radio[name='LINK_YN']:checked").val().replace(/(^\s*)|(\s*$)/g, '')));
			if(STAT_NM != "")sopOpenApiaddDataObj.addParam('STAT_NM', encodeURIComponent(STAT_NM));
			if(STAT_INFO != "") sopOpenApiaddDataObj.addParam('STAT_INFO', encodeURIComponent(STAT_INFO));
			if(ETC_LINK_MTH != "") sopOpenApiaddDataObj.addParam('ETC_LINK_MTH', encodeURIComponent(ETC_LINK_MTH));
			if(REFRN_URL != "") sopOpenApiaddDataObj.addParam('REFRN_URL', encodeURIComponent(REFRN_URL));
			//sopOpenApiupdateDataObj.addParam('MOD_DT', encodeURIComponent(MOD_DT));
			/** 2020-04-29 [곽제욱] 추가된 컬럼에 대한 데이터 처리 END			 */
			sopOpenApiaddDataObj.addParam('REG_ID', encodeURIComponent(REG_ID));
			sopOpenApiaddDataObj.addParam('LINK_ID', encodeURIComponent(LINK_ID));
			sopOpenApiaddDataObj.addParam('LINK_NM', encodeURIComponent(LINK_NM));
			if(COLCT_SOURCE != "") sopOpenApiaddDataObj.addParam('COLCT_SOURCE', encodeURIComponent(COLCT_SOURCE));
			sopOpenApiaddDataObj.addParam('CONECT_URL', encodeURIComponent(CONECT_URL));
			sopOpenApiaddDataObj.addParam('CONECT_PORT', encodeURIComponent(CONECT_PORT));
			sopOpenApiaddDataObj.addParam('CONECT_CONFM_KEY', encodeURIComponent(CONECT_CONFM_KEY));
			sopOpenApiaddDataObj.addParam('UPDT_CYCLE', encodeURIComponent($("input:radio[name='UPDT_CYCLE']:checked").val().replace(/(^\s*)|(\s*$)/g, '')));
			sopOpenApiaddDataObj.addParam('USE_YN', encodeURIComponent($("input:radio[name='USE_YN']:checked").val().replace(/(^\s*)|(\s*$)/g, '')));
			sopOpenApiaddDataObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/DT/workRoadStatsInfoSm/AddWorkRoadStatsInfoSm.json"
			});
		}
	};
	
	//등록
	(function() {
		$class("sop.openApi.addData.api").extend(sop.cnm.absAPI).define(
				{
					onSuccess : function(status, res) {
						if (res.errCd == "0") {
							getConfirmPopup('알림', res.result.msg, 'alert');
							if(res.result.success == true) {
								$('#ok_alertPopup').unbind();
								$('#ok_alertPopup').click(function() {
									location.href = './WorkRoadStatsInfoSm.html';
									confirmPopupRemove();
								});
							}
							else {
								$('#ok_alertPopup').unbind();
								$('#ok_alertPopup').click(function() {
									confirmPopupRemove();
								});
							}
							$('#close_confirmPopup').unbind();
							$('#close_confirmPopup').click(function() {
								confirmPopupRemove();
							});
						} else {
							getConfirmPopup('알림', res.errMsg, 'alert');
							$('#ok_alertPopup').unbind();
							$('#ok_alertPopup').click(function() {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').unbind();
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
