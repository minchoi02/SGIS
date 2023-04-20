(function(W,D){
	W.$qnaView = W.$qnaView || {};
	$(document).ready(function(){
		var url_string = window.location.href;
		var url = new URL(url_string);
		$qnaView.ui.post_no = url.searchParams.get("post");
		$qnaView.ui.getqnaView();
		$qnaView.event.setUIEvent();	
		
		$log.srvLogWrite("Z1", "03", "02", "06", "", "");
	});
	
	$qnaView.ui = {
			post_no : null,
			doDelete : function(){
					if (confirm("정말 게시물을 삭제하시겠습니까?") == true){
						$qnaView.request.deletePost($qnaView.ui.post_no);
					}
			},
			
			getqnaView : function(){
				var obj = {
						params : {
							post_no : $qnaView.ui.post_no
							}
				};
				$qnaView.request.getqnaView(obj);
			}
			
	};
	$qnaView.request = {
			deletePost : function(ids){
				$.ajax({
					type : "POST",
					url : contextPath +"/api/sysmgt/deletePost.do",
					dataType : "json",
					sync : true,
					data : {"ids":ids,"table":"qna"}
				});

				$log.srvLogWrite("Z1", "03", "02", "03", "", "");
				location.href = contextPath + "/view/sysmgt/qnaLst";
			},
			
			getqnaView : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getQnaDetail.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							if(res.result.length == 0){
								alert("결과가 없습니다.")
								break;
							}
							
							var files = "";
							var result = res.result[0];
							$("#user_nm").html(result.user_nm);
							$("#title").html(result.title);
							$("#reg_ts").html(result.reg_ts);
							$("#view_cnt").html(result.view_cnt);
							$("#ans_yn").html(result.ans_yn);
							if(result.attach != null){
								files += "<a href='"+ contextPath +"/api/file/download.do?postNo="+result.post_no+"&attach="+result.attach+"&path="+result.path+"' download>" + result.file_nm+'</a>';
								files += '<em>('+result.file_size+')</em>';
							}
							$("#files").append(files);								
							$("#content").html(result.content);
							var comment = result.comment;
							if (typeof comment == "undefined" || comment == null) comment = "";
							editor.setValue(comment);
							
							break;
						default:
							$message.open("알림", res.errMsg);
//							break;
					}
				})
		}
	};
	$qnaView.event = {
			setUIEvent : function(){
				$('#btnModify').on('click',function(){
					location.href=contextPath + '/view/sysmgt/qnaForm?post=' + $qnaView.ui.post_no;
				});
				$("#btnDelete").off().on("click",function(){
					$qnaView.ui.doDelete();
				});
				$('#btnAnswer').on('click',function(){
					var data = {};
					var params = {};
					params.post_no = $qnaView.ui.post_no;
					params.comment = editor.getValue();
					params.table = "qna";
					data.params = params
					$ajax.requestApi(contextPath + "/api/sysmgt/saveAnswer.do", data, function(res) {
						//debugger;
						switch(parseInt(res.errCd)) {
						case 0:
							//log generate by cis
							//$log.srvLogWrite("Z0", "06", "02", "04", "", "");
							
							//목록으로 이동
							window.location.href = "qnaLst";
							break;
						default:
							$messageNew.open("알림", res.errMsg);
							break;
						}
					})
				});
			}
			
	};
}(window,document));