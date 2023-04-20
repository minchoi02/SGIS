(function(W,D){
	W.$dataForm = W.$dataForm || {};
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
		$dataForm.ui.post_no = url.searchParams.get("post");
		$dataForm.ui.getnoticeForm();
		$dataForm.event.setUIEvent();	
		$log.srvLogWrite("Z1", "03", "01", "05", "", "");
	});
	
	$dataForm.ui = {
		post_no : null,
		getnoticeForm : function(){
			var obj = {
					params : {
						post_no : $dataForm.ui.post_no
						}
			};
			$dataForm.request.getnoticeForm(obj);
		},
		cancel : function(){
			if(confirm("정말 게시물 작성을 취소하시겠습니까?") == true){
				window.location.href = contextPath + '/view/sysmgt/noticeLst';
			}
		}
	};
	$dataForm.request = {
		getnoticeForm : function(data){
			$ajax.requestApi(contextPath + "/api/sysmgt/getNoticeDetail.do", data, function(res) {
				//debugger;
				switch(parseInt(res.errCd)) {
					case 0:
						if(res.noticeView.length == 0){
							alert("결과가 없습니다.")
							break;
						}
						$("#title-input").val(res.noticeView[0].title);
						editor.setValue(res.noticeView[0].content);
						if(res.noticeView[0].file_nm != null){
							var file = res.noticeView[0].file_nm;
							for(var i=1;i<res.noticeView.length;i++){
								file += "," + res.noticeView[i].file_nm
							}
							$("#file-name").val(file);
						}
						break;
					default:
						break;
				}
			})
		}
	};
	$dataForm.event = {
		setUIEvent : function(){
			$('#btnCancel').on('click',function(){
				//debugger;
				$dataForm.ui.cancel();
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
			$('#btnSave').on('click',function(){
				var params = {};
				params.post_no = $dataForm.ui.post_no;
				params.title = $.trim($("#title-input").val());
				params.content = editor.getValue();
				params.table = "notice";
				if (params.title == '') {
					$messageNew.open("알림", "제목을 입력해주세요.");
				} else {
					$("#boardForm").ajaxForm({
						async: false,
						type : "POST",
						url :  contextPath+"/api/sysmgt/savePost.do",
						dataType: "json",
						encoding: "utf-8",
						data : params,
						beforeSubmit: function(data, frm, opt) {
							var file = $("#boardForm").find('#searchFile').val();
							if (file.length > 0) {
								var ext = $("#searchFile").val().split('.').pop().toLowerCase();
								if($.inArray(ext, $file.extension) == -1) {
									$messageNew.open("알림", "업로드가 제한된 파일 입니다.");
									return false;
								}
							}
							$mask.show();
							return true;
						},
						success: function(res) {
							switch(parseInt(res.errCd)) {
								case 0:
									//log generate by cis
									$log.srvLogWrite("Z1", "03", "01", "04", "", "");
									
									//목록으로 이동
									window.location.href = contextPath+"/view/sysmgt/noticeLst";
									break;
								default:
									$messageNew.open("알림", res.errMsg);
									break;
							}
				        },
				        complete: function() {
				        	$mask.hide();
				        },
				        error: function() {
				        	$messageNew.open("알림", res.errMsg);
				        }
					}).submit();
				}
			});
		}
	};
}(window,document));