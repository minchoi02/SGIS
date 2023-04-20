(function(W,D){
	W.$legalView = W.$legalView || {};
	$(document).ready(function(){
		var url_string = window.location.href;
		var url = new URL(url_string);
		$legalView.ui.post_no = url.searchParams.get("post_no");
		$legalView.ui.getlegalView();
		$legalView.event.setUIEvent();	
	});
	
	$legalView.ui = {
			post_no : null,
			doDelete : function(){
					if (confirm("정말 게시물을 삭제하시겠습니까?") == true){
						$legalView.request.deletePost($legalView.ui.post_no);
					}
			},
			
			getlegalView : function(){
				var obj = {
						params : {
							post_no : $legalView.ui.post_no
							}
				};
				$legalView.request.getlegalView(obj);
			}
			
	};
	$legalView.request = {
			deletePost : function(ids){
				$.ajax({
					type : "POST",
					url : contextPath +"/api/sysmgt/deletePost.do",
					dataType : "json",
					sync : true,
					data : {"ids":ids,"table":"collect_leg"}
				});
				location.href = contextPath + "/view/collectData/collectLegDb";
			},
			
			getlegalView : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getLegalDetail.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							if(result == null){
								break;
							}
							$("#dataView > tbody").empty()
							
							var tag = "";
							tag += '<tr><th>제목</th><td colspan="3">'+result.title+'</td></tr>';
							tag += '<tr><th>작성자</th><td>'+result.user_nm+'</td><th>작성일</th><td>'+result.reg_ts+'</td></tr>';
							tag += '<tr><th>내용</th><td colspan="3" class="tb-content">'+result.content+'</td></tr>';
							if(result.attach != null){
								tag += '<tr><th>첨부파일</th><td colspan="3" class="tb-files">'+"<a href='"+ contextPath +"/api/file/download.do?postNo="+result.post_no+"&attach="+result.attach+"&path="+result.path+"' download>" + result.file_nm+'</a>';
								tag += '<em>('+result.file_size+')</em>';
								tag += '</td></tr>';
							}
							$("#dataView > tbody").append(tag);								
							
							break;
						default:
							$message.open("알림", res.errMsg);
//							break;
					}
				})
		}
	};
	$legalView.event = {
			setUIEvent : function(){
				$('#btnModify').on('click',function(){
					location.href=contextPath + '/view/collectData/collectLegDbForm?post_no=' + $legalView.ui.post_no;
				});
				$("#btnDelete").off().on("click",function(){
					$legalView.ui.doDelete();
				});
			}
			
	};
}(window,document));