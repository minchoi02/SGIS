(function(W,D){
	W.$qnaLst = W.$qnaLst || {};
	$(document).ready(function(){
		$qnaLst.ui.getQnaLst();
		$qnaLst.event.setUIEvent();	

		$log.srvLogWrite("Z1", "03", "02", "01", "", "");
	});
	
	$qnaLst.ui = {
			searchText : null,
			searchType : null,
			pageNum : 1,
			selectViewCount: 10,
			lastpage: null,
			doDelete : function(){
				var postCnt = $("input[name=checkTF]:checked").length
				if (postCnt > 0){
					if (confirm(postCnt + " 개의 게시물을 삭제하시겠습니까?") == true){
						var checkBoxIds = [];
						//debugger;
						$("input[name=checkTF]:checked").each(function(){
							var tid = this.id
							checkBoxIds.push(tid.replace("c",""));
						})
						$qnaLst.request.deletePost(checkBoxIds.toString());
					}
				}
			},
			
			getQnaLst : function(){
				//debugger;
				var searchType = $qnaLst.ui.searchType;
				var searchText = $qnaLst.ui.searchText;
				var searchPage = $qnaLst.ui.pageNum;
				var selectValue = $qnaLst.ui.selectViewCount;
				var obj = {
						params : {
							searchType:searchType,
							searchText:searchText,
							searchPage:searchPage,
							selectViewCount:selectValue
							}
				};
				$qnaLst.request.getQnaLst(obj);
			},
			
			updateViewCnt: function(post_no){
				$qnaLst.request.updateViewCnt(post_no);
			}
			
	};
	$qnaLst.request = {
			deletePost : function(ids){
				$.ajax({
					type : "POST",
					url : contextPath +"/api/sysmgt/deletePost.do",
					dataType : "json",
					sync : true,
					data : {"ids":ids,"table":"qna"}
				});

				$log.srvLogWrite("Z1", "03", "02", "03", "", "");
				if($(".postnumber").length == 1){$qnaLst.ui.pageNum = $qnaLst.ui.pageNum - 1}
				$qnaLst.ui.getQnaLst();
			},
			
			getQnaLst : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getQnaLst.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							if(res.qnaLst.length == 0){
								//alert("'"+$qnaLst.ui.searchText + "'에 대한 검색 결과가 없습니다.")
								$qnaLst.ui.searchText = null;
								$("#searchText").val("");
								$("tbody tr").remove();
								break;
							}
							$("tbody tr").remove()
							var selectValue = $qnaLst.ui.selectViewCount;
							var totaldata = res.qnaLst[0].total;
							var page = $qnaLst.ui.pageNum;
							var totalpage = Math.ceil(totaldata / selectValue);
							var firstpage = Math.floor((page-1)/10) * 10 + 1
							$(".paging ul li").remove();	
							var lastpage = totalpage;
							$qnaLst.ui.lastpage = lastpage;
							if(lastpage > 10 && firstpage <= 10)
							{
								lastpage = 10
							}
							else if((lastpage - firstpage) > 10)
							{
									lastpage = firstpage + 9;
							}
							for(var i = firstpage; i <= lastpage;i++){
								if(i == page){
									$(".paging ul").append('<li class="is-active"><a href="javascript:void(0)">'+i+'</a></li>');
								}else{
									$(".paging ul").append('<li><a class="select-page" href="javascript:void(0)">'+i+'</a></li>');
								}
							}
							for(var i=0; i < res.qnaLst.length;i++){
								var tag = "";
								tag = tag + '<tr><td><span class="checkbox solo"><input id="c'+res.qnaLst[i].post_no+'" name="checkTF" style="display:none" type="checkbox" >';
								tag = tag + '<label for="c'+res.qnaLst[i].post_no+'">&nbsp;</label>';
								tag = tag + '</span></td>';
								tag = tag + '<td class="postnumber">'+res.qnaLst[i].row+'</td>';
								tag = tag + '<td class="title left">';
								tag = tag + '<a class="qna-title" href="' + contextPath + '/view/sysmgt/qnaView?post='+res.qnaLst[i].post_no+'">'+res.qnaLst[i].title+'<em class="icon file"></em></a></td>';
								tag = tag + '<td class="username">'+res.qnaLst[i].user_nm+'</td>';
								tag = tag + '<td class="postdate">'+res.qnaLst[i].reg_ts+'</td>';
								tag = tag + '<td class="view-cnt">'+res.qnaLst[i].view_cnt+'</td>'; 
								tag = tag + '<td><span class="label c1">'+res.qnaLst[i].ans_yn+'</span></td></tr>'; 
								$("tbody").append(tag); 								
							}
							break;
						default:
							$message.open("알림", res.errMsg);
//							break;
					}
				})
		},
		updateViewCnt : function(post_no){ 
			$.ajax({
				type : "POST",
				url : contextPath +"/api/sysmgt/updateViewCnt.do",
				dataType : "json",
				data : {"post_no":post_no,"table":"qna"}
			});
		}
	};
	$qnaLst.event = {
			setUIEvent : function(){
				
				$("#all").off().on("click",function(){
					//debugger;
					if(this.checked) {
				        // Iterate each checkbox
				        $(':checkbox').each(function() {
				            this.checked = true;                        
				        });
				    } else {
				        $(':checkbox').each(function() {
				            this.checked = false;                       
				        });
				        
				    }
				});
				
				$("tbody").off().on("click","input[name=checkTF]",function(){
					if(!this.checked) {
						if($("#all").is(":checked") == true){
							$("#all").prop("checked",false);
						}
					}
				});
				
				$("#btnDelete").off().on("click",function(){
					$qnaLst.ui.doDelete();
				});
				
				$("#selectViewCount").off().on("change",function(){
					$qnaLst.ui.pageNum = 1;
					$qnaLst.ui.selectViewCount = $("#selectViewCount option:selected").val();
					$qnaLst.ui.getQnaLst();
				});
				
				$("#btnSearch").off().on("click",function(){
					$qnaLst.ui.searchType = $("#searchType option:selected").val();
					$qnaLst.ui.searchText = $("#searchText").val();

					$log.srvLogWrite("Z1", "03", "02", "02", "", "");
					$qnaLst.ui.getQnaLst();
				});
				$(".paging ul").off().on("click",".select-page",function(){
					$qnaLst.ui.pageNum = this.text;
					$qnaLst.ui.getQnaLst();
				});
				$(".first").off().on("click",function(){
					if($qnaLst.ui.pageNum != 1){
						$qnaLst.ui.pageNum = 1;
						$qnaLst.ui.getQnaLst();
					}
				});
				$(".prev").off().on("click",function(){
					if((parseInt($qnaLst.ui.pageNum) - 1) > 0){
						$qnaLst.ui.pageNum = parseInt($qnaLst.ui.pageNum) - 1;
						$qnaLst.ui.getQnaLst();
					}
				});
				$(".end").off().on("click",function(){
					if($qnaLst.ui.pageNum != $qnaLst.ui.lastpage){
						$qnaLst.ui.pageNum = $qnaLst.ui.lastpage;
						$qnaLst.ui.getQnaLst();	
					}
				});
				$(".next").off().on("click",function(){
					if((parseInt($qnaLst.ui.pageNum) + 1) <= $qnaLst.ui.lastpage){
						$qnaLst.ui.pageNum = parseInt($qnaLst.ui.pageNum) + 1;
						$qnaLst.ui.getQnaLst();
					}
				});
				$(document).on("click",".qna-title",function(){
					var post_no = this.parentElement.parentElement.getElementsByTagName("input").item(0).id.replace("c","");
					$qnaLst.ui.updateViewCnt(post_no);
				});
			}
	};
}(window,document));