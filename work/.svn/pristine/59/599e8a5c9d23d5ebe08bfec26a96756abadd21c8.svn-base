(function(W,D){
	W.$noticeLst = W.$noticeLst || {};
	$(document).ready(function(){
		$noticeLst.ui.getNoticeLst();
		$noticeLst.event.setUIEvent();	

		$log.srvLogWrite("Z1", "03", "01", "01", "", "");
	});
	
	$noticeLst.ui = {
			searchText : null,
			searchType : null,
			pageNum : 1,
			selectViewCount: 10,
			lastpage: 1,
			doDelete : function(){
				postCnt = $("input[name=checkTF]:checked").length
				if (postCnt > 0){
					if (confirm(postCnt + " 개의 게시물을 삭제하시겠습니까?") == true){
						var checkBoxIds = [];
						$("input[name=checkTF]:checked").each(function(){
							var tid = this.id
							checkBoxIds.push(tid.replace("c",""));
						})
						$noticeLst.request.deletePost(checkBoxIds.toString());
					}
				}
			},
			
			getNoticeLst : function(){
				//debugger;
				var searchType = $noticeLst.ui.searchType;
				var searchText = $noticeLst.ui.searchText;
				var searchPage = $noticeLst.ui.pageNum;
				var selectValue = $noticeLst.ui.selectViewCount;
				var obj = {
						params : {
							searchType:searchType,
							searchText:searchText,
							searchPage:searchPage,
							selectViewCount:selectValue
							}
				};
				$noticeLst.request.getNoticeLst(obj);
			},
			updateViewCnt: function(post_no){
				$noticeLst.request.updateViewCnt(post_no);
			}
			
	};
	$noticeLst.request = {
			deletePost : function(ids){
				$.ajax({
					type : "POST",
					url : contextPath +"/api/sysmgt/deletePost.do",
					dataType : "json",
					sync : true,
					data : {"ids":ids,"table":"notice"}
				});
				
				$log.srvLogWrite("Z1", "03", "01", "03", ids, "");
				
				if($(".postnumber").length == 1){$noticeLst.ui.pageNum = $noticeLst.ui.pageNum - 1}
				$noticeLst.ui.getNoticeLst();
			},
			
			getNoticeLst : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getNoticeLst.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							if(res.noticeLst.length == 0){
								//alert("'"+$noticeLst.ui.searchText + "'에 대한 검색 결과가 없습니다.")
								$noticeLst.ui.searchText = null;
								$("#searchText").val("");
								$("tbody tr").remove();
								break;
							}
							$("tbody tr").remove()
							var selectValue = $noticeLst.ui.selectViewCount;
							var totaldata = res.noticeLst[0].total;
							var page = $noticeLst.ui.pageNum;
							var totalpage = Math.ceil(totaldata / selectValue);
							var firstpage = Math.floor((page-1)/10) * 10 + 1
							$(".paging ul li").remove();	
							var lastpage = totalpage;
							$noticeLst.ui.lastpage = lastpage;
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
							for(var i=0; i < res.noticeLst.length;i++){
								var tag = "";
								tag = tag + '<tr><td><span class="checkbox solo"><input id="c'+res.noticeLst[i].id+'" name="checkTF" style="display:none" type="checkbox" >';
								tag = tag + '<label for="c'+res.noticeLst[i].id+'">&nbsp;</label>';
								tag = tag + '</span></td>';
								tag = tag + '<td class="postnumber">'+res.noticeLst[i].row+'</td>';
								tag = tag + '<td class="title left">';
								tag = tag + '<a class="notice-title" href="' + contextPath + '/view/sysmgt/noticeView?post='+res.noticeLst[i].id+'">'+res.noticeLst[i].title+'<em class="icon file"></em></a></td>';
								tag = tag + '<td class="postdate">'+res.noticeLst[i].reg_ts+'</td>';
								tag = tag + '<td class="view-cnt">'+res.noticeLst[i].view_cnt+'</td></tr>'; 
								$("tbody").append(tag); 								
							}
							$("#cnt-page").text(""+page+" / "+totalpage+" 페이지 총 "+totaldata)
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
				data : {"post_no":post_no,"table":"notice"}
			});
		}
	};
	$noticeLst.event = {
			setUIEvent : function(){
				
				$("#all").off().on("click",function(){
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
					$noticeLst.ui.doDelete();
				});
				
				$("#selectViewCount").off().on("change",function(){
					$noticeLst.ui.pageNum = 1;
					$noticeLst.ui.selectViewCount = $("#selectViewCount option:selected").val();
					$noticeLst.ui.getNoticeLst();
				});
				
				$("#btnSearch").off().on("click",function(){
					$log.srvLogWrite("Z1", "03", "01", "02", "", "");
					$noticeLst.ui.searchType = $("#searchType option:selected").val();
					$noticeLst.ui.searchText = $("#searchText").val();
					$noticeLst.ui.getNoticeLst();
				});
				$(".paging ul").off().on("click",".select-page",function(){
					//debugger;
					$noticeLst.ui.pageNum = this.text;
					$noticeLst.ui.getNoticeLst();
				});
				$(".first").off().on("click",function(){
					if($noticeLst.ui.pageNum != 1){
						$noticeLst.ui.pageNum = 1;
						$noticeLst.ui.getNoticeLst();
					}
				});
				$(".prev").off().on("click",function(){
					if((parseInt($noticeLst.ui.pageNum) - 1) > 0){
						$noticeLst.ui.pageNum = parseInt($noticeLst.ui.pageNum) - 1;
						$noticeLst.ui.getNoticeLst();
					}
				});
				$(".end").off().on("click",function(){
					//debugger;
					if($noticeLst.ui.pageNum != $noticeLst.ui.lastpage){
						$noticeLst.ui.pageNum = $noticeLst.ui.lastpage;
						$noticeLst.ui.getNoticeLst();	
					}
				});
				$(".next").off().on("click",function(){
					//debugger;
					if((parseInt($noticeLst.ui.pageNum) + 1) <= $noticeLst.ui.lastpage){
						$noticeLst.ui.pageNum = parseInt($noticeLst.ui.pageNum) + 1;
						$noticeLst.ui.getNoticeLst();
					}
				});
				$(document).on("click",".notice-title",function(){
					//debugger;
					var post_no = this.parentElement.parentElement.getElementsByTagName("input").item(0).id.replace("c","");
					$noticeLst.ui.updateViewCnt(post_no);
				});
			}
	};
}(window,document));