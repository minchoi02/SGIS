/**
 * 
 * @JSName: WorkRoadStatsItemManageUpdate
 * @Description: 일자리 통계항목 관리 수정 js
 * 
 * @author: 한광희
 * @date: 2019.08.05
 * @version V1.0
 * 
 */
(function(W, D) {
	W.$WorkRoadStatsItemManageUpdate = W.$WorkRoadStatsItemManageUpdate || {};
	// for return
	var LINK_ID = getParameter('LINK_ID');
	var STAT_NM = getParameter('STAT_NM');
	var STAT_DEFINITION = getParameter('STAT_DEFINITION');
	var STAT_EXP = getParameter('STAT_EXP');
	var COLCT_SOURCE = getParameter('COLCT_SOURCE');
	var UPDT_CYCLE = getParameter('UPDT_CYCLE');
	var STAT_PATH = getParameter('STAT_PATH');
	var REFRN_URL = getParameter('REFRN_URL');
	$(document).ready(function() {
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

		$('#cancelButton').click(
				function() {
					location.href = "./WorkRoadStatsItemManage.html";

				});
		// request Board information
		$WorkRoadStatsItemManageUpdate.requestDetail();

		// click the modify button
		$('#modifyButton').click(
				function() {
					var stat_nm = $('#stat_nm').val();	 								// 통계명
					var stat_definition = $('#stat_definition').val();					// 정의
					var colct_source = $('#colct_source').val();	 					// 수집출처
					var updt_cycle = $('#updt_cycle').val();							// 갱신주기
					var stat_path = $('#stat_path').val();	 							// 통계경로
					var refrn_url = $('#refrn_url').val();	 							// 참조 URL
					var POST_CONTENT = CKEDITOR.instances.POST_CONTENT.getData().replace(/(?:\r\n|\r|\n)/g, "");		// 통계 설명
					
					if (getBytesCount(POST_CONTENT) < 1000) {
						getConfirmPopup('확인', '수정하시겠습니까?', 'confirm');
						$('#ok_confirmPopup').click(
								function() {
									$WorkRoadStatsItemManageUpdate.updateWorkRoadStatsItemManage(LINK_ID, stat_nm, stat_definition, colct_source, updt_cycle, stat_path, refrn_url, POST_CONTENT);
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
				});
		// click the cancel button

	});

	$WorkRoadStatsItemManageUpdate = {
		requestDetail : function() {
			var sopOpenApiRequestDetailObj = new sop.openApi.requestDetail.api();
			sopOpenApiRequestDetailObj.addParam('POST_NO', encodeURIComponent(LINK_ID));
			sopOpenApiRequestDetailObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/DT/WorkRoadStatsItemManage/getWorkRoadStatsItemManage.json"
			});
		},
		updateWorkRoadStatsItemManage : function(LINK_ID, STAT_NM, STAT_DEFINITION, COLCT_SOURCE, UPDT_CYCLE, STAT_PATH, REFRN_URL, POST_CONTENT) {
			var sopOpenApiUpdateWorkRoadStatsItemManageObj = new sop.openApi.updateWorkRoadStatsItemManage.api();
			sopOpenApiUpdateWorkRoadStatsItemManageObj.addParam('LINK_ID', encodeURIComponent(LINK_ID));
			
			if(STAT_NM != ""){
				sopOpenApiUpdateWorkRoadStatsItemManageObj.addParam('STAT_NM', encodeURIComponent(STAT_NM));					// 통계명				
			}
			if(STAT_DEFINITION != ""){
				sopOpenApiUpdateWorkRoadStatsItemManageObj.addParam('STAT_DEFINITION', encodeURIComponent(STAT_DEFINITION));	// 통계정의				
			}
			if(POST_CONTENT != ""){
				sopOpenApiUpdateWorkRoadStatsItemManageObj.addParam('STAT_EXP', encodeURIComponent(POST_CONTENT));				// 통계설명				
			}
			if(COLCT_SOURCE != ""){
				sopOpenApiUpdateWorkRoadStatsItemManageObj.addParam('COLCT_SOURCE', encodeURIComponent(COLCT_SOURCE));			// 수집출처				
			}
			if(UPDT_CYCLE != ""){
				sopOpenApiUpdateWorkRoadStatsItemManageObj.addParam('UPDT_CYCLE', encodeURIComponent(UPDT_CYCLE));				// 갱신주기				
			}
			if(STAT_PATH != ""){
				sopOpenApiUpdateWorkRoadStatsItemManageObj.addParam('STAT_PATH', encodeURIComponent(STAT_PATH));				// 통계경로				
			}
			if(REFRN_URL != ""){
				sopOpenApiUpdateWorkRoadStatsItemManageObj.addParam('REFRN_URL', encodeURIComponent(REFRN_URL));				// 참조 URL
			}
			sopOpenApiUpdateWorkRoadStatsItemManageObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/DT/WorkRoadStatsItemManage/updateWorkRoadStatsItemManage.json"
			});
		}
	};
	// request Board
	(function() {
		$class("sop.openApi.requestDetail.api").extend(sop.cnm.absAPI).define(
				{
					onSuccess : function(status, res) {
						if (res.errCd == "0") {
							var result = res.result;
							if (result != null) {
								var link_id = result.rows[0].LINK_ID;
								$('#link_id').html(LINK_ID);
								$('#link_id').val(LINK_ID);
								var stat_nm = result.rows[0].STAT_NM;
								$('#stat_nm').val(stat_nm);
								var stat_definition = result.rows[0].STAT_DEFINITION;
								$('#stat_definition').val(stat_definition);
								var colct_source = result.rows[0].COLCT_SOURCE;
								$('#colct_source').val(colct_source);
								var updt_cycle = result.rows[0].UPDT_CYCLE;
								$('#updt_cycle').val(updt_cycle);
								var stat_path = result.rows[0].STAT_PATH;
								$('#stat_path').val(stat_path);
								var refrn_url = result.rows[0].REFRN_URL;
								$('#refrn_url').val(refrn_url);
								$('#POST_CONTENT').html(result.rows[0].STAT_EXP);
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
	//updateWorkRoadStatsItemManage upload file
	(function() {
		$class("sop.openApi.updateWorkRoadStatsItemManage.api").extend(sop.cnm.absAPI).define(
				{
					onSuccess : function(status, res) {
						if (res.errCd == "0") {
							getConfirmPopup('알림', res.result.msg, 'alert');
							$('#ok_alertPopup').click(
									function() {
										location.href = "./../DT/WorkRoadStatsItemManage.html";
										confirmPopupRemove();
									});
							$('#close_confirmPopup').click(
									function() {
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
