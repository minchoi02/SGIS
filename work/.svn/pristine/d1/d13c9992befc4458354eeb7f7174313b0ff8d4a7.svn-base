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
		$dataForm.ui.post_no = url.searchParams.get("post_no");
		$dataForm.ui.getDetail();
		$dataForm.event.setUIEvent();	
	});
	
	$dataForm.ui = {
			post_no : null,
			getDetail : function(){
				var obj = {
						params : {
							post_no : $dataForm.ui.post_no
							}
				};
				if ($dataForm.ui.post_no != null && $dataForm.ui.post_no != "") {
					$dataForm.request.getDetail(obj);
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
	$dataForm.request = {
			getDetail : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getLegalDetail.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							if (result == null) return; 
							$("#title-input").val(result.title);
							editor.setValue(result.content);
							if(result.file_nm != null){
								var file = result.file_nm;
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
				location.href=contextPath + '/view/collectData/collectLegDb';
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
				params.table = "collect_leg";
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
									//$log.srvLogWrite("Z0", "06", "02", "04", "", "");
									
									//목록으로 이동
									window.location.href = contextPath+"/view/collectData/collectLegDb";
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