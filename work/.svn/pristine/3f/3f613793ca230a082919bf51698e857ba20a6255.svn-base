(function(W,D){
	W.$userMngEdit = W.$userMngEdit || {};
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
		$userMngEdit.ui.user_no = url.searchParams.get("user_no");
		$userMngEdit.ui.getDetail();
		$userMngEdit.event.setUIEvent();	
	});
	
	$userMngEdit.ui = {
			user_no : null,
			user_id : null,
			grant_yn : null,
			getDetail : function(){
				var obj = {
						params : {
							user_no : $userMngEdit.ui.user_no
							}
				};
				if ($userMngEdit.ui.user_no != null && $userMngEdit.ui.user_no != "") {
					$userMngEdit.request.getDetail(obj);
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
	$userMngEdit.request = {
			getDetail : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getUserMngDetail.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							if (result == null) return; 
							$("#req_content").val(result.req_content);
							$("#user_nm").val(result.user_nm + " (" +result.user_id + ")");
							$userMngEdit.ui.user_id = result.user_id;
							//$("#user_nm").val(result.user_nm);
							$("#user_pw").val(result.user_pw);
							$("#user_div").val(result.user_div);
							$("#dept").val(result.dept);
							$("#job_pos").val(result.job_pos);
							$("#email").val(result.email);
							$("#tel_no").val(result.tel_no);
							$("#tel_no2").val(result.tel_no2);
							$("#grant_yn").val(result.grant_yn);
							$("#use_yn").val(result.use_yn);
							$("#grant_ts").val(result.grant_ts);
							$("#stop_ts").val(result.stop_ts);
							$("#reg_ts").val(result.reg_ts);
							$("#restrict_ip").val(result.restrict_ip);
							$("#inst_manager_yn").val(result.inst_manager_yn);
							
							if (result.use_yn=="Y" || result.use_yn == "") {
								$("#btnStopStart").html("사용정지");
							} else {
								$("#btnStopStart").html("정지 해제");
							}
							
							var result2 = res.result2;
							for (var arri=0;arri<result2.length;arri++) {
								var obj = result2[arri];
								option = $("<option value='"+obj.inst_seq+"'>" + obj.inst_nm + "</option>");
								$('#inst_seq').append(option);
							}
							
							var result3 = res.result3;
							var html = "";
							for (var arri=0;arri<result3.length;arri++) {
								var obj = result3[arri];
								html = html + '<tr>';
								html = html + '<td>'+obj.login_ts+'</td>';
								html = html + '<td>'+obj.ip+'</td>';
								html = html + '<td>'+obj.login_sts+'</td>';
								html = html + '</tr>'; 
							}
							$("#dataTbl > tbody").empty().append(html);
							
							$("#inst_seq").val(result.inst_seq);
							break;
						default:
							break;
					}
				})
		}
	};
	$userMngEdit.event = {
			setUIEvent : function(){
				$('#btnCancel').on('click',function(){
					location.href='/view/sysmgt/userMng';
				});
				//승인 버튼 이벤트
				$("#btnAprove").on("click", function(e) {
					$userMngEdit.ui.grant_yn = "Y";
					$confirmNew.open("확인","승인 처리하시겠습니까?");
				});
				//반려 버튼 이벤트
				$("#btnReject").on("click", function(e) {
					if ($("#return_msg").val() == "") {
						$messageNew.open("알림", "반려시 사유는 필수 입력사항입니다.");
						return;
					}
					$userMngEdit.ui.grant_yn = "X";
					$confirmNew.open("확인","반려 하시겠습니까?");
				});
				//패스워드 초기화 버튼 이벤트
				$("#btnPasswordInit").on("click", function(e) {
					var options = {};
					var params = {};
					params.user_id = $userMngEdit.ui.user_id;
					options.params = params;
					
					$ajax.requestApi(contextPath + "/api/sysmgt/initPassword.do", options, function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$messageNew.open("패스워드 초기화 알림", res.result + " 입니다.");
								break;
							default:
								$messageNew.open("알림", res.errMsg);
								break;
						}
					});
				});
				
				//사용정지/해제
				$("#btnStopStart").on("click", function(e) {
					var useTxt = "";
					var options = {};
					var params = {};
					params.user_no = $userMngEdit.ui.user_no;
					if ($("#use_yn").val() == "Y") {
						params.use_yn = "N";
						useTxt = "아이디가 사용정지되었습니다.";
					} else {
						params.use_yn = "Y";
						useTxt = "아이디가 사용정지가 해제되었습니다.";
					}
					options.params = params;
					
					$ajax.requestApi(contextPath + "/api/sysmgt/stopUserMng.do", options, function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$messageNew.open("알림", useTxt);
								break;
							default:
								$messageNew.open("알림", res.errMsg);
								break;
						}
					});
				});

				//회원정보수정
				$("#btnModify").on("click", function(e) {
					var useTxt = "";
					var options = {};
					var params = {};
					params.user_no = $userMngEdit.ui.user_no;
					params.user_id = $userMngEdit.ui.user_id;
					params.user_pw = $("#user_pw").val();
					params.inst_seq = $("#inst_seq").val();
					params.inst_manager_yn = $("#inst_manager_yn").val();
					params.dept = $("#dept").val();
					params.job_pos = $("#job_pos").val();
					params.email = $("#email").val();
					params.tel_no = $("#tel_no").val();
					params.tel_no2 = $("#tel_no2").val();
					params.user_div = $("#user_div").val();
					params.restrict_ip = $("#restrict_ip").val();
					params.multi_connect_lmtt_yn = $("#multi_connect_lmtt_yn").val();
					params.use_start_date = $("#use_start_date").val();
					params.use_end_date = $("#use_end_date").val();
					options.params = params;
					
					$ajax.requestApi(contextPath + "/api/sysmgt/saveUserMng.do", options, function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$messageNew.open("알림", "회원정보가 수정되었습니다.");
								break;
							default:
								$messageNew.open("알림", res.errMsg);
								break;
						}
					});
				});
				
				//처리 확인 버튼 이벤트
				$(document).on("click","#msgOkBtn",function(){
					var options = {};
					var params = {};
					params.user_no = $userMngEdit.ui.user_no;
					params.grant_yn = $userMngEdit.ui.grant_yn;
					params.return_msg = $("#return_msg").val();
					options.params = params;
					
					$ajax.requestApi(contextPath + "/api/sysmgt/saveGrantYN.do", options, function(res) {
						var grant_yn = "승인";
						if ($userMngEdit.ui.grant_yn=="X") grant_yn = "반려";
						switch(parseInt(res.errCd)) {
							case 0:
								$messageNew.open("알림", grant_yn + "되었습니다.");
								window.location.href = contextPath+"/view/sysmgt/userMng";
								break;
							default:
								$messageNew.open("알림", res.errMsg);
								break;
						}
					});
				});
				

				//사용자 삭제
				$("#btnDelete").on("click", function(e) {
					if (!confirm("삭제하시겠습니까?")) return;
					
					var useTxt = "";
					var options = {};
					var params = {};
					params.user_no = $userMngEdit.ui.user_no;
					options.params = params;
					
					$ajax.requestApi(contextPath + "/api/sysmgt/deleteUserMng.do", options, function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$messageNew.open("알림", "사용자가 삭제되었습니다.");
								window.location.href = contextPath+"/view/sysmgt/userMng";
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