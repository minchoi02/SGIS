(function(W,D){
	W.$popAlimView = W.$popAlimView || {};
	$(document).ready(function(){
		var url_string = window.location.href;
		var url = new URL(url_string);
		$popAlimView.ui.post_no = url.searchParams.get("post");
		$popAlimView.ui.getpopAlimView();
		$popAlimView.event.setUIEvent();	
	});
	
	$popAlimView.ui = {
			post_no : null,
			doDelete : function(){
					if (confirm("정말 게시물을 삭제하시겠습니까?") == true){
						$popAlimView.request.deletePost($popAlimView.ui.post_no);
					}
			},
			
			getpopAlimView : function(){
				var obj = {
						params : {
							post_no : $popAlimView.ui.post_no
							}
				};
				$popAlimView.request.getpopAlimView(obj);
			}
			
	};
	$popAlimView.request = {
			deletePost : function(ids){
				$.ajax({
					type : "POST",
					url : contextPath +"/api/sysmgt/deletePost.do",
					dataType : "json",
					sync : true,
					data : {"ids":ids,"table":"popup_notice"}
				});
				location.href = contextPath + "/view/sysmgt/popalimLst";
			},
			
			getpopAlimView : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getPopAlimDetail.do", data, function(res) {
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
							tag += '<tr><th>기간</th><td>'+result.notice_start_dt+'~'+result.notice_end_dt+'</td><th>공지여부</th><td>'+result.use_yn+'</td></tr>';
							tag += '<tr><th>높이</th><td>'+result.popup_hight+'</td><th>너비</th><td>'+result.popup_width+'</td></tr>'
							tag += '<tr><th>가로 위치</th><td>'+result.popup_x_pos+'</td><th>세로 위치</th><td>'+result.popup_y_pos+'</td></tr>';
							tag += '<tr><th>이미지보기</th><td colspan="3" class="tb-imgs"><img src="" alt=""></td></tr>';
							$("tbody").append(tag);								
							
							break;
						default:
							$message.open("알림", res.errMsg);
//							break;
					}
				})
		}
	};
	$popAlimView.event = {
			setUIEvent : function(){
				$('#btnModify').on('click',function(){
					location.href=contextPath + '/view/sysmgt/popalimForm?post=' + $popAlimView.ui.post_no;
				});
				$("#btnDelete").off().on("click",function(){
					$popAlimView.ui.doDelete();
				});
			}
			
	};
}(window,document));