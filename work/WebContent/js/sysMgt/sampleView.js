(function(W,D){
	W.$sampleView = W.$sampleView || {};
	$(document).ready(function(){
		var url_string = window.location.href;
		var url = new URL(url_string);
		$sampleView.ui.post_no = url.searchParams.get("post");
		$sampleView.ui.getsampleView();
		$sampleView.event.setUIEvent();	
		
		$log.srvLogWrite("Z1", "03", "08", "06", "", "");
	});
	
	$sampleView.ui = {
			post_no : null,
			doDelete : function(){
					if (confirm("정말 게시물을 삭제하시겠습니까?") == true){
						$sampleView.request.deletePost($sampleView.ui.post_no);
					}
			},
			
			getsampleView : function(){
				var obj = {
						params : {
							post_no : $sampleView.ui.post_no
							}
				};
				$sampleView.request.getsampleView(obj);
			}
			
	};
	$sampleView.request = {
			deletePost : function(ids){
				$.ajax({
					type : "POST",
					url : contextPath +"/api/sysmgt/deletePost.do",
					dataType : "json",
					sync : true,
					data : {"ids":ids,"table":"sample_data"},
					success: function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$log.srvLogWrite("Z1", "03", "08", "03", ids, "");
								location.href = contextPath + "/view/sysmgt/sampleLst";
								break;
							default:
								break;
						}
			        },
			        complete: function() {
			        	$mask.hide();
			        },
			        error: function() {
			        	$messageNew.open("알림", res.errMsg);
			        }
				});
			},
			
			getsampleView : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getSampleDetail.do", data, function(res) {
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
							break;
					}
				})
		}
	};
	$sampleView.event = {
			setUIEvent : function(){
				$('#btnModify').on('click',function(){
					location.href=contextPath + '/view/sysmgt/sampleForm?post=' + $sampleView.ui.post_no;
				});
				$("#btnDelete").off().on("click",function(){
					$sampleView.ui.doDelete();
				});
			}
			
	};
}(window,document));