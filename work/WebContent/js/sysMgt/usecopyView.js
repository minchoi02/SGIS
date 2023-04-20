(function(W,D){
	W.$usecopyView = W.$usecopyView || {};
	$(document).ready(function(){
		var url_string = window.location.href;
		var url = new URL(url_string);
		$usecopyView.ui.post_no = url.searchParams.get("post");
		$usecopyView.ui.getusecopyView();
		$usecopyView.event.setUIEvent();	
		$log.srvLogWrite("Z1", "03", "07", "06", "", "");
	});
	
	$usecopyView.ui = {
			post_no : null,
			doDelete : function(){
					if (confirm("정말 게시물을 삭제하시겠습니까?") == true){
						$usecopyView.request.deletePost($usecopyView.ui.post_no);
					}
			},
			
			getusecopyView : function(){
				var obj = {
						params : {
							post_no : $usecopyView.ui.post_no
							}
				};
				$usecopyView.request.getusecopyView(obj);
			}
			
	};
	$usecopyView.request = {
			deletePost : function(ids){
				$.ajax({
					type : "POST",
					url : contextPath +"/api/sysmgt/deletePost.do",
					dataType : "json",
					sync : true,
					data : {"ids":ids,"table":"movie"}
				});
				$log.srvLogWrite("Z1", "03", "07", "03", "", "");
				location.href = contextPath + "/view/sysmgt/usecopyLst";
			},
			
			getusecopyView : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getUseCopyDetail.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							if(res.result.length == 0){
								alert("결과가 없습니다.")
								break;
							}
							$("tbody tr").remove()
							
							var tag = "";
							var result = res.result[0];
							tag += '<tr><th>제목</th><td colspan="3">'+result.title+'</td></tr>';
							tag += '<tr><th>작성자</th><td>'+result.user_nm+'</td><th>작성일</th><td>'+result.reg_ts+'</td></tr>';
							tag += '<tr><th>조회수</th><td colspan="3">'+result.view_cnt+'</td></tr>'
							tag += '<tr><th>내용</th><td colspan="3" class="tb-content">'+result.content+'</td></tr>'
							if(result.attach != null){
								tag += '<tr><th>첨부파일</th><td colspan="3" class="tb-files">'+"<a href='"+ contextPath +"/api/file/download.do?postNo="+result.post_no+"&attach="+result.attach+"&path="+result.path+"' download>" + result.file_nm+'</a>';
								tag += '<em>('+result.file_size+')</em>';
								tag += '</td></tr>';
							}
							$("tbody").append(tag);								
							
							break;
						default:
							$message.open("알림", res.errMsg);
//							break;
					}
				})
		}
	};
	$usecopyView.event = {
			setUIEvent : function(){
				$('#btnModify').on('click',function(){
					location.href=contextPath + '/view/sysmgt/usecopyForm?post=' + $usecopyView.ui.post_no;
				});
				$("#btnDelete").off().on("click",function(){
					$usecopyView.ui.doDelete();
				});
			}
			
	};
}(window,document));