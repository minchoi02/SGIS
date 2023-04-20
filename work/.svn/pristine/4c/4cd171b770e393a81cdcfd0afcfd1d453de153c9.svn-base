(function(W,D){
	W.$groupEdit = W.$groupEdit || {};
	$(document).ready(function(){
		$(function() {
		    $(".dialog").dialog({
		      autoOpen: false,
		      width: 'auto',
		      height: 'auto',
		      modal: true,
		      resizable: false,
		      minimizable: false,
		      minimizeIcon: 'ui-icon-minus'
		    });
		});
		var url_string = window.location.href;
		var url = new URL(url_string);
		$groupEdit.ui.inst_seq = url.searchParams.get("inst_seq");
		if ($groupEdit.ui.inst_seq == null || $groupEdit.ui.inst_seq === 'undefined') {
			$("#btnDelete").hide();
		}
			
		$groupEdit.ui.getDetail();
		$groupEdit.event.setUIEvent();	
		$log.srvLogWrite("Z1", "06", "03", "04", "", "");
	});
	
	$groupEdit.ui = {
			inst_seq : null,
			getDetail : function(){
				var obj = {
						params : {
							inst_seq : $groupEdit.ui.inst_seq
							}
				};
				if ($groupEdit.ui.inst_seq != null && $groupEdit.ui.inst_seq != "") {
					$groupEdit.request.getDetail(obj);
				}
			},
			/**
			 * 
			 * @name         : setParams
			 * @description  : 파라미터를 설정한다.
			 * @date         : 2019. 07. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param startIdx : 시작인덱스
			 */
			setParams : function(startIdx) {
				var title = $.trim($("#title-input").val());
				var content = editor.getValue();
				
				var options = {	
					params : {}
				};
				
				if (title.length > 0) {
					options.params["title"] = title;
				}
				if (content.length > 0) {
					options.params["content"] = content;
				}
				return options;
			},
			
	};
	$groupEdit.request = {
			getDetail : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getInstitutionDetail.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							if (result == null) return; 
							$("#inst_nm").val(result.inst_nm);
							$("#inst_desc").val(result.inst_desc);
							break;
						default:
							break;
					}
				})
		}
	};
	$groupEdit.event = {
			setUIEvent : function(){
				$('#btnCancel').on('click',function(){
					location.href=contextPath + '/view/sysmgt/groupLst';
				});
				//파일선택 취소
				$("#deletFileBtn").on("click", function(e) {
					e.preventDefault();
					$("#searchFile").val("");
					$("#searchFileTxt").val("");
				});
				//파일선택 이벤트
				$("#searchFile").on("change", function(e) {
					e.preventDefault();
					var filePath = e.target.value;
					var fileName = filePath.substring(filePath.lastIndexOf('\\') + 1);
					$("#searchFileTxt").val(fileName);
					$("#deletFileBtn").show();
				});
				//파일선택 
				$("#searchFileBtn").on("click", function(e) {
					e.preventDefault();
					$("#searchFile").trigger("click");
				});
				//삭제 버튼 이벤트
				$("#btnDelete").on("click", function(e) {
					$confirmNew.open("확인","해당 소속기관을 삭제하시겠습니까?");
				});
				//삭제 확인 후 처리 버튼 이벤트
				$(document).on("click","#msgOkBtn",function(){
					var options = {};
					var params = {};
					params.inst_seq = $groupEdit.ui.inst_seq;
					options.params = params;
					
					$ajax.requestApi(contextPath + "/api/sysmgt/deleteInstitution.do", options, function(res) {
						//debugger;
						switch(parseInt(res.errCd)) {
							case 0:
								$messageNew.open("알림", "삭제되었습니다.");
								$log.srvLogWrite("Z1", "06", "03", "05", "", "");
								window.location.href = contextPath+"/view/sysmgt/groupLst";
								break;
							default:
								$messageNew.open("알림", res.errMsg);
								break;
						}
					});
				});
				$('#btnSave').on('click',function(){
					var options = {};
					var params = {};
					params.inst_seq = $groupEdit.ui.inst_seq;
					params.inst_nm = $.trim($("#inst_nm").val());
					params.inst_desc = $.trim($("#inst_desc").val());
					options.params = params;
					
					//$log.srvLogWrite("Z0", "06", "02", "04", "", "");
					
					if (params.inst_nm == '') {
						$messageNew.open("알림", "기관명을 입력해주세요.");
					} else {
						$ajax.requestApi(contextPath + "/api/sysmgt/saveInstitution.do", options, function(res) {
							//debugger;
							switch(parseInt(res.errCd)) {
								case 0:
									$log.srvLogWrite("Z1", "06", "03", "03", "", "");
									window.location.href = contextPath+"/view/sysmgt/groupLst";
									break;
								default:
									$messageNew.open("알림", "등록에 문제가 있는 것 같습니다. 관리자에게 문의 바랍니다");
									break;
							}
						});
					}
				});
			}
	};
}(window,document));