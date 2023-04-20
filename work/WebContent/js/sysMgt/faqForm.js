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
		$dataForm.ui.getfaqForm();
		$dataForm.event.setUIEvent();	
		$log.srvLogWrite("Z1", "03", "03", "04", "", "");
	});
	
	$dataForm.ui = {
		post_no : null,
		getfaqForm : function(){
			var obj = {
					params : {
						post_no : $dataForm.ui.post_no
						}
			};
			$dataForm.request.getfaqForm(obj);
		},
		cancel : function(){
			if(confirm("정말 게시물 작성을 취소하시겠습니까?") == true){
				window.location.href = contextPath + '/view/sysmgt/faqLst'; //noticeLst
			}
		}
	};
	$dataForm.request = {
		getfaqForm : function(data){
			$ajax.requestApi(contextPath + "/api/sysmgt/getFaqDetail.do", data, function(res) {
				//debugger;
				switch(parseInt(res.errCd)) {
					case 0:
						if(res.faqView.length == 0){
							alert("결과가 없습니다.")
							break;
						}
						$("#title").val(res.faqView.title);
						$("#content").val(res.faqView.content);
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
			$('#btnSave').on('click',function(){
				var params = {};
				params.post_no = $dataForm.ui.post_no;
				params.title = $.trim($("#title").val());
				params.content = $.trim($("#content").val());
				params.table = "faq";
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
						success: function(res) {
							switch(parseInt(res.errCd)) {
								case 0:
									//log generate by cis
									$log.srvLogWrite("Z1", "03", "03", "03", "", "");
									
									//목록으로 이동
									window.location.href = contextPath+"/view/sysmgt/faqLst";
									break;
								default:
									$messageNew.open("알림", "문제가 발생한것 같습니다. 관리자에게 문의바랍니다.");
									break;
							}
				        },
				        complete: function() {
				        	$mask.hide();
				        },
				        error: function() {
				        	$messageNew.open("알림", "문제가 발생한것 같습니다. 관리자에게 문의바랍니다.");
				        }
					}).submit();
				}
			});
		}
	};
}(window,document));