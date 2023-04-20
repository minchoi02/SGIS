(function(W,D){
	W.$shareView = W.$shareView || {};
	$(document).ready(function(){
		var url_string = window.location.href;
		var url = new URL(url_string);
		$shareView.ui.post_no = url.searchParams.get("post");
		$shareView.ui.getshareView();
		$shareView.event.setUIEvent();	
		$log.srvLogWrite("Z1", "03", "08", "06", "", "");
	});
	
	$shareView.ui = {
			post_no : null,
			doDelete : function(){
					if (confirm("정말 게시물을 삭제하시겠습니까?") == true){
						$shareView.request.deletePost($shareView.ui.post_no);
					}
			},
			
			getshareView : function(){
				var obj = {
						params : {
							post_no : $shareView.ui.post_no
							}
				};
				$shareView.request.getshareView(obj);
			}
			
	};
	$shareView.request = {
			deletePost : function(ids){
				$.ajax({
					type : "POST",
					url : contextPath +"/api/sysmgt/deletePost.do",
					dataType : "json",
					sync : true,
					data : {"ids":ids,"table":"movie"}
				});
				$log.srvLogWrite("Z1", "03", "08", "03", ids, "");
				location.href = contextPath + "/view/sysmgt/shareLst";
			},
			
			getshareView : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getShareDetail.do", data, function(res) {
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
							/*
							if(result.re_content != null){
								tag += '<tr><th>댓글</th><td colspan="3" class="tb-re"><span class="inputs"><input id="reply" type="text" value="'+result.re_content+'" readonly></span></td></tr>';
							}else{
								tag += '<tr><th>댓글</th><td colspan="3" class="tb-re"><span class="inputs"><input id="reply" type="text" value="" readonly></span></td></tr>';
							} */
							$("tbody").append(tag);								
							
							break;
						default:
							$message.open("알림", res.errMsg);
//							break;
					}
				})
		}
	};
	$shareView.event = {
			setUIEvent : function(){
				$('#btnModify').on('click',function(){
					location.href=contextPath + '/view/sysmgt/shareForm?post=' + $shareView.ui.post_no;
				});
				$("#btnDelete").off().on("click",function(){
					$shareView.ui.doDelete();
				});
			}
			
	};
}(window,document));