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
		$groupEdit.ui.wrd_seq = url.searchParams.get("wrd_seq");
		
		if ($groupEdit.ui.wrd_seq == null || $groupEdit.ui.wrd_seq === 'undefined') {
			$("#btnDelete").hide();
		}
		$groupEdit.ui.getDetail();
		$groupEdit.event.setUIEvent();	
		$log.srvLogWrite("Z1", "07", "01", "04", "", "");
	});
	
	$groupEdit.ui = {
			wrd_seq : null,
			getDetail : function(){
				var obj = {
						params : {
							wrd_seq : $groupEdit.ui.wrd_seq
							}
				};
				if ($groupEdit.ui.wrd_seq != null && $groupEdit.ui.wrd_seq != "") {
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
				$ajax.requestApi(contextPath + "/api/sysmgt/getStdWordDetail.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							if (result == null) return; 
							$("#korean_wrd_nm").val(result.korean_wrd_nm);
							$("#eng_wrd_nm").val(result.eng_wrd_nm);
							$("#eng_abrv_nm").val(result.eng_abrv_nm);
							$("#wrd_desc").val(result.wrd_desc);
							$("#wrd_type").val(result.wrd_type);
							$("#rm").val(result.rm);
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
					location.href=contextPath + '/view/sysmgt/dbStdMng';
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
					$confirmNew.open("확인","해당 단어를 삭제하시겠습니까?");
				});
				//삭제 확인 후 처리 버튼 이벤트
				$(document).on("click","#msgOkBtn",function(){
					var options = {};
					var params = {};
					params.wrd_seq = $groupEdit.ui.wrd_seq;
					options.params = params;
					
					$ajax.requestApi(contextPath + "/api/sysmgt/deleteStdWord.do", options, function(res) {
						//debugger;
						switch(parseInt(res.errCd)) {
							case 0:
								$log.srvLogWrite("Z1", "07", "01", "05", "", "");
								$messageNew.open("알림", "삭제되었습니다.");
								window.location.href = contextPath+"/view/sysmgt/dbStdMng";
								break;
							default:
								$messageNew.open("알림", "문제가 있는 것 같습니다. 관리자에게 문의 바랍니다");
								break;
						}
					});
				});
				$('#btnSave').on('click',function(){
					var options = {};
					var params = {};
					params.wrd_seq = $groupEdit.ui.wrd_seq;
					params.korean_wrd_nm = $.trim($("#korean_wrd_nm").val());
					params.eng_wrd_nm = $.trim($("#eng_wrd_nm").val());
					params.eng_abrv_nm = $.trim($("#eng_abrv_nm").val());
					params.wrd_desc = $.trim($("#wrd_desc").val());
					params.wrd_type = $.trim($("#wrd_type").val());
					params.rm = $.trim($("#rm").val());
					options.params = params;
					
					//$log.srvLogWrite("Z0", "06", "02", "04", "", "");
					if (params.korean_wrd_nm == '') {
						$messageNew.open("알림", "한글명을 입력해주세요.");
						return;
					}
					if (params.eng_wrd_nm == '') {
						$messageNew.open("알림", "영문명을 입력해주세요.");
						return;
					} 
					$ajax.requestApi(contextPath + "/api/sysmgt/saveStdWord.do", options, function(res) {
						//debugger;
						switch(parseInt(res.errCd)) {
							case 0:
								$log.srvLogWrite("Z1", "07", "01", "03", "", "");
								window.location.href = contextPath+"/view/sysmgt/dbStdMng";
								break;
							default:
								$messageNew.open("알림", "문제가 있는 것 같습니다. 관리자에게 문의 바랍니다");
								break;
						}
					});
				});
			}
	};
}(window,document));