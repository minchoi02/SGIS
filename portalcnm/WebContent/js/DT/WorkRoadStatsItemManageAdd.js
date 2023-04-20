/**
 * 
 * @JSName: WorkRoadStatsItemManageAdd.js
 * @Description: 일자리 통계항목 관리 신규추가 js
 * 
 * @author: 한광희
 * @date:2019.08.02
 * @version V1.0
 * 
 */
// for return
var pluploader = {};
(function(W, D) {
	W.$WorkRoadStatsItemManageAdd = W.$WorkRoadStatsItemManageAdd || {};
	$(document)
			.ready(
					function() {
						document.getElementById('resetForm').reset();
						$('#addButton').hide();
						$('#addButtonDisabled').show();
						if ($.fn.validatebox) {
							$.fn.validatebox.defaults.missingMessage = '이 입력 항목은 필수 입력 항목 입니다.';
						}
						$('#LINK_ID').validatebox({
							required : true,
							validType : [ 'byteSizeVal[10]' ]
						});
						$('#LINK_ID').validatebox('disableValidation');						
						
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

						$("#LINK_ID").keyup(function() {
							$("#LINK_ID").validatebox('enableValidation');
						});

						// 연계 ID 중복확인
						$('#overlButton').click(function(){
							var check = $('#LINK_ID').val();
							if(check.length<1){
								getConfirmPopup("알림", "연계 ID는 10자리 이하입니다.", 'alert');
								$('#ok_alertPopup').click(function() {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function() {
									confirmPopupRemove();
								});
							}else{
								$WorkRoadStatsItemManageAdd.overlapData(check);
							}
						});
						
						// click the add button
						$('#addButton').click(function() {
							$('#LINK_ID').validatebox('enableValidation');
							
							var LINK_ID = $('#LINK_ID').val().replace(/(^\s*)|(\s*$)/g, '');	// 연계 ID
							var STAT_NM = $('#STAT_NM').val();	 								// 통계명
							var STAT_DEFINITION = $('#STAT_DEFINITION').val();					// 정의
							var COLCT_SOURCE = $('#COLCT_SOURCE').val();	 					// 수집출처
							var UPDT_CYCLE = $('#UPDT_CYCLE').val();							// 갱신주기
							var STAT_PATH = $('#STAT_PATH').val();	 							// 통계경로
							var REFRN_URL = $('#REFRN_URL').val();	 							// 참조 URL
							var POST_CONTENT = CKEDITOR.instances.POST_CONTENT.getData().replace(/(?:\r\n|\r|\n)/g, "");		// 통계 설명
							
							if ($('#LINK_ID').validatebox('isValid')) {
								if (getBytesCount(POST_CONTENT) < 1000) {
									getConfirmPopup('확인', '등록하시겠습니까?', 'confirm');
									$('#ok_confirmPopup').click(function() {
										$WorkRoadStatsItemManageAdd.addWorkRoadStatsItemManage(LINK_ID, STAT_NM, STAT_DEFINITION, COLCT_SOURCE, UPDT_CYCLE, STAT_PATH, REFRN_URL, POST_CONTENT);
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
							}
						});
						// click the cancel button
						$('#cancelButton').click(
								function() {
									location.href = "./../DT/WorkRoadStatsItemManage.html";
								});
					});
	$WorkRoadStatsItemManageAdd = {
		addWorkRoadStatsItemManage : function(LINK_ID, STAT_NM, STAT_DEFINITION, COLCT_SOURCE, UPDT_CYCLE, STAT_PATH, REFRN_URL, POST_CONTENT) {
			var sopOpenApiAddWorkRoadStatsItemManageObj = new sop.openApi.addWorkRoadStatsItemManage.api();
			sopOpenApiAddWorkRoadStatsItemManageObj.addParam('LINK_ID', encodeURIComponent(LINK_ID));						// 연계 ID
			
			if(STAT_NM != ""){
				sopOpenApiAddWorkRoadStatsItemManageObj.addParam('STAT_NM', encodeURIComponent(STAT_NM));					// 통계명				
			}
			if(STAT_DEFINITION != ""){
				sopOpenApiAddWorkRoadStatsItemManageObj.addParam('STAT_DEFINITION', encodeURIComponent(STAT_DEFINITION));	// 통계정의				
			}
			if(POST_CONTENT != ""){
				sopOpenApiAddWorkRoadStatsItemManageObj.addParam('STAT_EXP', encodeURIComponent(POST_CONTENT));				// 통계설명				
			}
			if(COLCT_SOURCE != ""){
				sopOpenApiAddWorkRoadStatsItemManageObj.addParam('COLCT_SOURCE', encodeURIComponent(COLCT_SOURCE));			// 수집출처				
			}
			if(UPDT_CYCLE != ""){
				sopOpenApiAddWorkRoadStatsItemManageObj.addParam('UPDT_CYCLE', encodeURIComponent(UPDT_CYCLE));				// 갱신주기				
			}
			if(STAT_PATH != ""){
				sopOpenApiAddWorkRoadStatsItemManageObj.addParam('STAT_PATH', encodeURIComponent(STAT_PATH));				// 통계경로				
			}
			if(REFRN_URL != ""){
				sopOpenApiAddWorkRoadStatsItemManageObj.addParam('REFRN_URL', encodeURIComponent(REFRN_URL));				// 참조 URL
			}
			sopOpenApiAddWorkRoadStatsItemManageObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/DT/WorkRoadStatsItemManage/addWorkRoadStatsItemManage.json"
			});
		},overlapData : function(LINK_ID){
			var check = $('#LINK_ID').val();
			var sopOpenApiLINKIDObj = new sop.openApi.linkID.api();
			sopOpenApiLINKIDObj.addParam('CHECK_WORD', encodeURIComponent($('#LINK_ID').val().replace(/(^\s*)|(\s*$)/g, '')));
			sopOpenApiLINKIDObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/DT/WorkRoadStatsItemManage/checkLINKID.json"
			});
		}
	};
	(function() {
		$class("sop.openApi.addWorkRoadStatsItemManage.api").extend(sop.cnm.absAPI).define(
				{
					onSuccess : function(status, res) {
						var result = res.result;
						if (res.errCd == "0") {
							if (result != null) {
								getConfirmPopup('알림', result.msg, 'alert');
								$('#ok_alertPopup').click(
										function() {
											if (result.success == true) {
												location.href = "./../DT/WorkRoadStatsItemManage.html";
											}
											confirmPopupRemove();
										});
								/*$('#close_confirmPopup').click(
										function() {
											if (result.success == true) {
												location.href = "./../QA/boardManage.html?searchWordType=" + searchWordType + "&searchWord=" + searchWord
														+ "&pageNumber=" + pageNumber + "&sort=" + sort + "&order=" + order + "&PRIORITY_DISP_YN="
														+ PRIORITY_DISP_YN;
											}
											confirmPopupRemove();
										});*/
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
	(function() {
		$class("sop.openApi.linkID.api").extend(sop.cnm.absAPI).define(
				{
					onSuccess : function(status, res) {
			        	var result = res.result;
			            if(res.errCd == "0") { 
			            	if(result != null){
			            		if(result.success == true){
			            			getConfirmPopup('알림', result.msg, 'alert');
			        				$('#ok_alertPopup').click(function(){
			        					confirmPopupRemove();
			        				});
			        				$('#close_confirmPopup').click(function(){
			        					confirmPopupRemove();
			        				});
			        				$('#addButton').show();
									$('#addButtonDisabled').hide();
			            		} else {
			            			getConfirmPopup('알림', '입력하신 연계 ID는 중복입니다. 다시 입력하세요.', 'alert');
			        				$('#ok_alertPopup').click(function(){
			        					confirmPopupRemove();
			        				});
			        				$('#close_confirmPopup').click(function(){
			        					confirmPopupRemove();
			        				});
			        				$('#TTIP_ID').val('');
			            		}
			            	}
			            } else {
			                getConfirmPopup('알림', res.errMsg, 'alert');
		    				$('#ok_alertPopup').click(function(){
		    					confirmPopupRemove();
		    				});
		    				$('#close_confirmPopup').click(function(){
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
						$('.maskbg').fadeOut(800);
						$('.maskcontent').fadeOut(800);
					}
				});
	}());
}(window, document));