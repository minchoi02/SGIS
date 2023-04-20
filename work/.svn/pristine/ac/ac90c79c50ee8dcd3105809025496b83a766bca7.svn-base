(function(W,D){
	W.$useCopyLst = W.$useCopyLst || {};
	$(document).ready(function(){
		$useCopyLst.ui.getUseCopyLst();
		$useCopyLst.event.setUIEvent();	
		
		$log.srvLogWrite("Z1", "03", "07", "01", "", "");
	});
	
	$useCopyLst.ui = {
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
						$useCopyLst.request.deletePost(checkBoxIds.toString());
					}
				}
			},
			
			getUseCopyLst : function(){
				//debugger;
				var searchType = $useCopyLst.ui.searchType;
				var searchText = $useCopyLst.ui.searchText;
				var searchPage = $useCopyLst.ui.pageNum;
				var selectValue = $useCopyLst.ui.selectViewCount;
				var obj = {
						params : {
							searchType:searchType,
							searchText:searchText,
							searchPage:searchPage,
							selectViewCount:selectValue
							}
				};
				$useCopyLst.request.getUseCopyLst(obj);
			},
			
			updateViewCnt: function(post_no){
				$useCopyLst.request.updateViewCnt(post_no);
			}
			
	};
	$useCopyLst.request = {
			deletePost : function(ids){
				$.ajax({
					type : "POST",
					url : contextPath +"/api/sysmgt/deletePost.do",
					dataType : "json",
					sync : true,
					data : {"ids":ids,"table":"movie"}
				});
				$log.srvLogWrite("Z1", "03", "07", "03", "", "");
				if($(".postnumber").length == 1){$useCopyLst.ui.pageNum = $useCopyLst.ui.pageNum - 1}
				$useCopyLst.ui.getUseCopyLst();
			},
			
			getUseCopyLst : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getUseCopyLst.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							if(res.useCopyLst.length == 0){
								//alert("'"+$useCopyLst.ui.searchText + "'에 대한 검색 결과가 없습니다.")
								$useCopyLst.ui.searchText = null;
								$("#searchText").val("");
								$("tbody tr").remove();
								break;
							}
							$("tbody tr").remove();
							var selectValue = $useCopyLst.ui.selectViewCount;
							var totaldata = res.useCopyLst[0].total;
							var page = $useCopyLst.ui.pageNum;
							var totalpage = Math.ceil(totaldata / selectValue);
							var firstpage = Math.floor((page-1)/10) * 10 + 1
							$(".paging ul li").remove();	
							var lastpage = totalpage;
							$useCopyLst.ui.lastpage = lastpage;
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
							for(var i=0; i < res.useCopyLst.length;i++){
								var tag = "";
								tag = tag + '<tr><td><span class="checkbox solo"><input id="c'+res.useCopyLst[i].post_no+'" name="checkTF" style="display:none" type="checkbox" >';
								tag = tag + '<label for="c'+res.useCopyLst[i].post_no+'">&nbsp;</label>';
								tag = tag + '</span></td>';
								tag = tag + '<td class="postnumber">'+res.useCopyLst[i].row+'</td>';
								tag = tag + '<td class="title left">';
								tag = tag + '<a class="usecopy-title" href="' + contextPath + '/view/sysmgt/usecopyView?post='+res.useCopyLst[i].post_no+'">'+res.useCopyLst[i].title+'<em class="icon file"></em></a></td>';
								tag = tag + '<td class="username">'+res.useCopyLst[i].user_nm+'</td>';
								tag = tag + '<td class="postdate">'+res.useCopyLst[i].reg_ts+'</td>';
								tag = tag + '<td class="view-cnt">'+res.useCopyLst[i].view_cnt+'</td>'; 
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
				data : {"post_no":post_no,"table":"movie"}
			});
		}
	};
	$useCopyLst.event = {
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
					$useCopyLst.ui.doDelete();
				});
				
				$("#selectViewCount").off().on("change",function(){
					$useCopyLst.ui.pageNum = 1;
					$useCopyLst.ui.selectViewCount = $("#selectViewCount option:selected").val();
					$useCopyLst.ui.getUseCopyLst();
				});
				
				$("#btnSearch").off().on("click",function(){
					$useCopyLst.ui.searchType = $("#searchType option:selected").val();
					$useCopyLst.ui.searchText = $("#searchText").val();
					$log.srvLogWrite("Z1", "03", "07", "02", "", "");
					$useCopyLst.ui.getUseCopyLst();
				});
				$(".paging ul").off().on("click",".select-page",function(){
					$useCopyLst.ui.pageNum = this.text;
					$useCopyLst.ui.getUseCopyLst();
				});
				$(".first").off().on("click",function(){
					if($useCopyLst.ui.pageNum != 1){
						$useCopyLst.ui.pageNum = 1;
						$useCopyLst.ui.getUseCopyLst();
					}
				});
				$(".prev").off().on("click",function(){
					if((parseInt($useCopyLst.ui.pageNum) - 1) > 0){
						$useCopyLst.ui.pageNum = parseInt($useCopyLst.ui.pageNum) - 1;
						$useCopyLst.ui.getUseCopyLst();
					}
				});
				$(".end").off().on("click",function(){
					if($useCopyLst.ui.pageNum != $useCopyLst.ui.lastpage){
						$useCopyLst.ui.pageNum = $useCopyLst.ui.lastpage;
						$useCopyLst.ui.getUseCopyLst();	
					}
				});
				$(".next").off().on("click",function(){
					if((parseInt($useCopyLst.ui.pageNum) + 1) <= $useCopyLst.ui.lastpage){
						$useCopyLst.ui.pageNum = parseInt($useCopyLst.ui.pageNum) + 1;
						$useCopyLst.ui.getUseCopyLst();
					}
				});
				$(document).on("click",".usecopy-title",function(){
					var post_no = this.parentElement.parentElement.getElementsByTagName("input").item(0).id.replace("c","");
					$useCopyLst.ui.updateViewCnt(post_no);
				});
			}
	};
}(window,document));