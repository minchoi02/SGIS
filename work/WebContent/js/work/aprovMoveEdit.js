(function(W,D){
	W.$aprovMoveEdit = W.$aprovMoveEdit || {};
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
		$aprovMoveEdit.ui.req_seq = url.searchParams.get("req_seq");
		$aprovMoveEdit.ui.getDetail();
		$aprovMoveEdit.event.setUIEvent();	
		
		$log.srvLogWrite("Z1", "05", "03", "04", "", "");
	});
	
	$aprovMoveEdit.ui = {
			req_seq : null,
			aprove_yn : null,
			getDetail : function(){
				var obj = {
						params : {
							req_seq : $aprovMoveEdit.ui.req_seq
							}
				};
				if ($aprovMoveEdit.ui.req_seq != null && $aprovMoveEdit.ui.req_seq != "") {
					$aprovMoveEdit.request.getDetail(obj);
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
	$aprovMoveEdit.request = {
			getDetail : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getAprovMoveDetail.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							if (result == null) return; 
							$("#user-id").val(result.user_id);
							$("#user_nm").html(result.user_nm);
							$("#req_dt").html(result.req_dt);
							
							if (result.grant_yn=="Y") {
								$("#grant_dt").html(result.grant_dt + "(승인)");
							} else if (result.grant_yn=="N") {
								$("#grant_dt").html(result.grant_dt + "(반려)");
							} else {
								$("#grant_dt").html("-");	
							}
								
							$("#trans_table_name").html(result.trans_table_name);
							$("#req_content").html(result.req_content);
							$("#info_link_srv_nm").html(result.info_link_srv_nm);
							$("#info_link_srv_realm").html(result.info_link_srv_realm);
							$("#req_content").val(result.req_content);
							$("#procs_content").val(result.procs_content);
							break;
						default:
							break;
					}
				})
		}
	};
	$aprovMoveEdit.event = {
			setUIEvent : function(){
				$('#btnCancel').on('click',function(){
					location.href=contextPath + '/view/sysmgt/aprovMove';
				});
				//승인 버튼 이벤트
				$("#btnAprove").on("click", function(e) {
					$aprovMoveEdit.ui.aprove_yn = "Y";
					$confirmNew.open("확인","승인 처리하시겠습니까?");
				});
				//반려 버튼 이벤트
				$("#btnReject").on("click", function(e) {
					if ($("#procs_content").val() == "") {
						$messageNew.open("알림", "반려시 사유는 필수 입력사항입니다.");
						return;
					}
					$aprovMoveEdit.ui.aprove_yn = "N";
					$confirmNew.open("확인","반려 하시겠습니까?");
				});
				//처리 확인 버튼 이벤트
				$(document).on("click","#msgOkBtn",function(){
					var options = {};
					var params = {};
					params.req_seq = $aprovMoveEdit.ui.req_seq;
					params.grant_yn = $aprovMoveEdit.ui.aprove_yn;
					params.procs_content = $("#procs_content").val();
					options.params = params;
					
					$ajax.requestApi(contextPath + "/api/sysmgt/saveAprovMove.do", options, function(res) {
						var aprove_yn = "승인";
						
						$log.srvLogWrite("Z1", "05", "03", "04", "", "");
						if ($aprovMoveEdit.ui.aprove_yn=="N") aprove_yn = "반려";
						switch(parseInt(res.errCd)) {
							case 0:
								$messageNew.open("알림", aprove_yn + "되었습니다.");
								window.location.href = contextPath+"/view/sysmgt/aprovMove";
								break;
							default:
								$messageNew.open("알림", res.errMsg);
								break;
						}
					});
				});
			}
	};
}(window,document));