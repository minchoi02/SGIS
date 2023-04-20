(function(W,D){
	W.$useGuideLst = W.$useGuideLst || {};
	$(document).ready(function(){
		$useGuideLst.ui.getUseGuideLst();
		$useGuideLst.event.setUIEvent();	

		$log.srvLogWrite("Z1", "03", "06", "01", "", "");
	});
	
	$useGuideLst.ui = {
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
						$useGuideLst.request.deletePost(checkBoxIds.toString());
					}
				}
			},
			
			getUseGuideLst : function(){
				//debugger;
				var searchType = $useGuideLst.ui.searchType;
				var searchText = $useGuideLst.ui.searchText;
				var page = $useGuideLst.ui.pageNum;
				var selectValue = $useGuideLst.ui.selectViewCount;
				var obj = {
						params : {
							searchType:searchType,
							searchText:searchText,
							page:page,
							selectValue:selectValue
							}
				};
				$useGuideLst.request.getUseGuideLst(obj);
			},
			
			updateViewCnt: function(post_no){
				$useGuideLst.request.updateViewCnt(post_no);
			}
			
	};
	$useGuideLst.request = {
			deletePost : function(ids){
				$.ajax({
					type : "POST",
					url : contextPath +"/api/sysmgt/deletePost.do",
					dataType : "json",
					sync : true,
					data : {"ids":ids,"table":"case_list"}
				});	

				$log.srvLogWrite("Z1", "03", "06", "03", "", "");
				if($(".postnumber").length == 1){$useGuideLst.ui.pageNum = $useGuideLst.ui.pageNum - 1}
				$useGuideLst.ui.getUseGuideLst();
			},
			
			getUseGuideLst : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getUseGuideLst.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							if(res.useGuideLst.length == 0){
								//alert("'"+$useGuideLst.ui.searchText + "'에 대한 검색 결과가 없습니다.")
								$useGuideLst.ui.searchText = null;
								$("#searchText").val("");
								$("tbody tr").remove();
								break;
							}
							$("tbody tr").remove()
							var selectValue = $useGuideLst.ui.selectViewCount;
							var totaldata = res.useGuideLst[0].total;
							var page = $useGuideLst.ui.pageNum;
							var totalpage = Math.ceil(totaldata / selectValue);
							var firstpage = Math.floor((page-1)/10) * 10 + 1
							$(".paging ul li").remove();	
							var lastpage = totalpage;
							$useGuideLst.ui.lastpage = lastpage;
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
							for(var i=0; i < res.useGuideLst.length;i++){
								var tag = "";
								tag = tag + '<tr><td><span class="checkbox solo"><input id="c'+res.useGuideLst[i].post_no+'" name="checkTF" style="display:none" type="checkbox" >';
								tag = tag + '<label for="c'+res.useGuideLst[i].post_no+'">&nbsp;</label>';
								tag = tag + '</span></td>';
								tag = tag + '<td class="postnumber">'+res.useGuideLst[i].row+'</td>';
								tag = tag + '<td class="title left">';
								tag = tag + '<a class="guide-title" href="' + contextPath + '/view/sysmgt/useguideView?post='+res.useGuideLst[i].post_no+'">'+res.useGuideLst[i].title+'</a></td>';
								tag = tag + '<td class="username">'+res.useGuideLst[i].user_nm+'</td>';
								tag = tag + '<td class="postdate">'+res.useGuideLst[i].reg_ts+'</td>';
								tag = tag + '<td class="view-cnt">'+res.useGuideLst[i].view_cnt+'</td>'; 
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
				data : {"post_no":post_no,"table":"case_list"}
			});
		}
	};
	$useGuideLst.event = {
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
					$useGuideLst.ui.doDelete();
				});
				
				$("#selectViewCount").off().on("change",function(){
					$useGuideLst.ui.pageNum = 1;
					$useGuideLst.ui.selectViewCount = $("#selectViewCount option:selected").val();
					$useGuideLst.ui.getUseGuideLst();
				});
				
				$("#btnSearch").off().on("click",function(){
					$useGuideLst.ui.searchType = $("#searchType option:selected").val();
					$useGuideLst.ui.searchText = $("#searchText").val();	

					$log.srvLogWrite("Z1", "03", "06", "02", "", "");
					$useGuideLst.ui.getUseGuideLst();
				});
				$(".paging ul").off().on("click",".select-page",function(){
					$useGuideLst.ui.pageNum = this.text;
					$useGuideLst.ui.getUseGuideLst();
				});
				$(".first").off().on("click",function(){
					if($useGuideLst.ui.pageNum != 1){
						$useGuideLst.ui.pageNum = 1;
						$useGuideLst.ui.getUseGuideLst();
					}
				});
				$(".prev").off().on("click",function(){
					if((parseInt($useGuideLst.ui.pageNum) - 1) > 0){
						$useGuideLst.ui.pageNum = parseInt($useGuideLst.ui.pageNum) - 1;
						$useGuideLst.ui.getUseGuideLst();
					}
				});
				$(".end").off().on("click",function(){
					if($useGuideLst.ui.pageNum != $useGuideLst.ui.lastpage){
						$useGuideLst.ui.pageNum = $useGuideLst.ui.lastpage;
						$useGuideLst.ui.getUseGuideLst();	
					}
				});
				$(".next").off().on("click",function(){
					if((parseInt($useGuideLst.ui.pageNum) + 1) <= $useGuideLst.ui.lastpage){
						$useGuideLst.ui.pageNum = parseInt($useGuideLst.ui.pageNum) + 1;
						$useGuideLst.ui.getUseGuideLst();
					}
				});
				$(document).on("click",".guide-title",function(){
					var post_no = this.parentElement.parentElement.getElementsByTagName("input").item(0).id.replace("c","");
					$useGuideLst.ui.updateViewCnt(post_no);
				});
			}
	};
}(window,document));