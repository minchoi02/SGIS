(function(W,D){
	W.$popalimLst = W.$popalimLst || {};
	$(document).ready(function(){
		$popalimLst.ui.getPopAlimLst();
		$popalimLst.event.setUIEvent();	
	});
	
	$popalimLst.ui = {
			searchText : null,
			searchType : null,
			pageNum : 1,
			selectViewCount: 10,
			lastpage: null,
			doDelete : function(){
				//debugger;
				var postCnt = $("input[name=checkTF]:checked").length
				if (postCnt > 0){
					if (confirm(postCnt + " 개의 게시물을 삭제하시겠습니까?") == true){
						var checkBoxIds = [];
						//debugger;
						$("input[name=checkTF]:checked").each(function(){
							var tid = this.id
							checkBoxIds.push(tid.replace("c",""));
						})
						$popalimLst.request.deletePost(checkBoxIds.toString());
					}
				}
			},
			
			getPopAlimLst : function(){
				//debugger;
				var searchType = $popalimLst.ui.searchType;
				var searchText = $popalimLst.ui.searchText;
				var page = $popalimLst.ui.pageNum;
				var selectValue = $popalimLst.ui.selectViewCount;
				var obj = {
						params : {
							searchType:searchType,
							search:searchText,
							page: page,
							selectValue:selectValue
							}
				};
				$popalimLst.request.getPopAlimLst(obj);
			}
			
	};
	$popalimLst.request = {
			deletePost : function(ids){
				$.ajax({
					type : "POST",
					url : contextPath +"/api/sysmgt/deletePost.do",
					dataType : "json",
					sync : true,
					data : {"ids":ids,"table":"popup_notice"}
				});
				if($(".postnumber").length == 1){$popalimLst.ui.pageNum = $popalimLst.ui.pageNum - 1}
				$popalimLst.ui.getPopAlimLst();
			},
			
			getPopAlimLst : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getPopAlimLst.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							if(res.popalimLst.length == 0){
								//alert("'"+$popalimLst.ui.searchText + "'에 대한 검색 결과가 없습니다.")
								$popalimLst.ui.searchText = null;
								$("#popalim-search").val("");
								$("tbody tr").remove();
								break;
							}
							$("tbody tr").remove()
							var selectValue = $popalimLst.ui.selectViewCount;
							var totaldata = res.popalimLst[0].total;
							var page = $popalimLst.ui.pageNum;
							var totalpage = Math.ceil(totaldata / selectValue);
							var firstpage = Math.floor((page-1)/10) * 10 + 1
							$(".paging ul li").remove();	
							var lastpage = totalpage;
							$popalimLst.ui.lastpage = lastpage;
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
							for(var i=0; i < res.popalimLst.length;i++){
								var tag = "";
								tag = tag + '<tr><td><span class="checkbox solo"><input id="c'+res.popalimLst[i].post_no+'" name="checkTF" style="display:none" type="checkbox" >';
								tag = tag + '<label for="c'+res.popalimLst[i].post_no+'">&nbsp;</label>';
								tag = tag + '</span></td>';
								tag = tag + '<td class="postnumber">'+res.popalimLst[i].row+'</td>';
								tag = tag + '<td class="title left">';
								tag = tag + '<a class="popalim-title" href="' + contextPath + '/view/sysmgt/popalimView?post='+res.popalimLst[i].post_no+'">'+res.popalimLst[i].title+'<em class="icon file"></em></a></td>';
								tag = tag + '<td class="postdate">'+res.popalimLst[i].dt_ts+'</td>';
								if(res.popalimLst[i].use_yn == "미게시"){
									tag = tag + '<td><span class="label c3">미게시</span></td>'; 
								}else{
									tag = tag + '<td><span class="label c4">게시</span></td>'; 
								}
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
	};
	$popalimLst.event = {
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
					$popalimLst.ui.doDelete();
				});
				
				$("#selectViewCount").off().on("change",function(){
					$popalimLst.ui.pageNum = 1;
					$popalimLst.ui.selectViewCount = $("#selectViewCount option:selected").val();
					$popalimLst.ui.getPopAlimLst();
				});
				
				$("#btnSearch").off().on("click",function(){
					//debugger;
					$popalimLst.ui.searchType = $("#searchType option:selected").val();
					$popalimLst.ui.searchText = $("#popalim-search").val();
					$popalimLst.ui.getPopAlimLst();
				});
				$(".paging ul").off().on("click",".select-page",function(){
					$popalimLst.ui.pageNum = this.text;
					$popalimLst.ui.getPopAlimLst();
				});
				$(".first").off().on("click",function(){
					if($popalimLst.ui.pageNum != 1){
						$popalimLst.ui.pageNum = 1;
						$popalimLst.ui.getPopAlimLst();
					}
				});
				$(".prev").off().on("click",function(){
					if((parseInt($popalimLst.ui.pageNum) - 1) > 0){
						$popalimLst.ui.pageNum = parseInt($popalimLst.ui.pageNum) - 1;
						$popalimLst.ui.getPopAlimLst();
					}
				});
				$(".end").off().on("click",function(){
					if($popalimLst.ui.pageNum != $popalimLst.ui.lastpage){
						$popalimLst.ui.pageNum = $popalimLst.ui.lastpage;
						$popalimLst.ui.getPopAlimLst();	
					}
				});
				$(".next").off().on("click",function(){
					if((parseInt($popalimLst.ui.pageNum) + 1) <= $popalimLst.ui.lastpage){
						$popalimLst.ui.pageNum = parseInt($popalimLst.ui.pageNum) + 1;
						$popalimLst.ui.getPopAlimLst();
					}
				});
			}
	};
}(window,document));