(function(W,D){
	W.$popalimForm = W.$popalimForm || {};
	$(document).ready(function(){
		var url_string = window.location.href;
		var url = new URL(url_string);
		$popalimForm.ui.post_no = url.searchParams.get("post");
		$popalimForm.ui.getpopalimForm();
		$popalimForm.event.setUIEvent();	
	});
	
	$popalimForm.ui = {
			post_no : null,
			getpopalimForm : function(){
				var obj = {
						params : {
							post_no : $popalimForm.ui.post_no
							}
				};
				$popalimForm.request.getpopalimForm(obj);
			}
			
	};
	$popalimForm.request = {
			getpopalimForm : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getPopAlimDetail.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							if(res.result.length == 0){
								alert("결과가 없습니다.")
								break;
							}
							$("#title-input").val(res.result[0].title);
							$("#start-date").val(res.result[0].notice_start_dt);
							$("#end-date").val(res.result[0].notice_end_dt);
							if(res.result[0].use_yn == "게시"){
								$("#on").prop('checked',true);
							}else{
								$("#off").prop('checked',true);
							}
							if(res.result[0].file_nm != null){
								var file = res.result[0].file_nm;
								for(var i=1;i<res.result.length;i++){
									file += "," + res.result[i].file_nm
								}
								$("#file-name").val(file);
							}
							$("#height").val(res.result[0].popup_hight);
							$("#width").val(res.result[0].popup_width);
							$("#x-pos").val(res.result[0].popup_x_pos);
							$("#y-pos").val(res.result[0].popup_y_pos);
							
							break;
						default:
							break;
					}
				})
		}
	};
	$popalimForm.event = {
			setUIEvent : function(){
				$('#btnCancel').on('click',function(){
					location.href=contextPath + '/view/sysmgt/popalimLst';
				});
			}
	};
}(window,document));