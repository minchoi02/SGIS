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
		$dataForm.ui.getsampleForm();
		$dataForm.event.setUIEvent();	
		$log.srvLogWrite("Z1", "03", "08", "05", "", "");
	});
	
	$dataForm.ui = {
		post_no : null,
		getsampleForm : function(){
			var obj = {
					params : {
						post_no : $dataForm.ui.post_no
						}
			};
			$dataForm.request.getsampleForm(obj);
		},
		cancel : function(){
			if(confirm("정말 게시물 작성을 취소하시겠습니까?") == true){
				window.location.href = contextPath + '/view/sysmgt/sampleLst';
			}
		}
	};
	$dataForm.request = {
		getsampleForm : function(data){
			$ajax.requestApi(contextPath + "/api/sysmgt/getSampleDetail.do", data, function(res) {
				//debugger;
				switch(parseInt(res.errCd)) {
					case 0:
						if(res.result.length == 0){
							alert("결과가 없습니다.")
							break;
						}
						$("#title-input").val(res.result[0].title);
						editor.setValue(res.result[0].content);
						if(res.result[0].file_nm != null){
							var file = res.result[0].file_nm;
							for(var i=1;i<res.result.length;i++){
								file += "," + res.result[i].file_nm
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
			$("#file-add").on("click",function() {
				if($dataForm.ui.file_num < 5){
					$dataForm.ui.file_num = $dataForm.ui.file_num + 1;
					var number = $dataForm.ui.file_num;
					var top = (number - 1) * 40;
					var tag = "";
					tag += '<div><span class="inputs" style="margin-top:5px;"><input class="file-name" name="file-n'+number+'" type="text" disabled></span>';
					tag += '<div style="position: absolute;right:0;top:'+top+'px;">';
					tag += '<button type="button" name="file-n'+number+'" class="btn lager line angular file-find">파일찾기</button>';
					tag += '<span><button type="button" name="file-n'+number+'" class="btn lager line angular file-delete">삭제</button></span>';
					tag += '<input class="file-input" name="file-n'+number+'" type="file" style="width:0px;height:0px;position:absolute;left:-9999999px;"></div></div>';
					$(".file-field").append(tag);
				}else{
					alert("파일은 최대 5개까지만 업로드가 가능합니다.");
				}
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
				params.table = "sample_data";
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
									$log.srvLogWrite("Z1", "03", "08", "04", "", "");
									
									//목록으로 이동
									window.location.href = contextPath+"/view/sysmgt/sampleLst";
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