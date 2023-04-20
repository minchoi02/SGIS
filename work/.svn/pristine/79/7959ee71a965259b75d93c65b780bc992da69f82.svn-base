(function(W,D){
	W.$useinfoLst = W.$useinfoLst || {};
	$(document).ready(function(){
		$useinfoLst.ui.getUseInfoLst();
		$useinfoLst.event.setUIEvent();	

		$log.srvLogWrite("Z1", "03", "04", "01", "", "");
	});
	
	$useinfoLst.ui = {
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
						$useinfoLst.request.deletePost(checkBoxIds.toString());
					}
				}
			},
			
			getUseInfoLst : function(){
				//debugger;
				var searchType = $useinfoLst.ui.searchType;
				var searchText = $useinfoLst.ui.searchText;
				var searchPage = $useinfoLst.ui.pageNum;
				var selectValue = $useinfoLst.ui.selectViewCount;
				var obj = {
						params : {
							searchType:searchType,
							searchText:searchText,
							searchPage:searchPage,
							selectViewCount:selectValue
							}
				};
				$useinfoLst.request.getUseInfoLst(obj);
			},
			
			updateViewCnt: function(post_no){
				$useinfoLst.request.updateViewCnt(post_no);
			}
			
	};
	$useinfoLst.request = {
			deletePost : function(ids){
				$.ajax({
					type : "POST",
					url : contextPath +"/api/sysmgt/deletePost.do",
					dataType : "json",
					sync : true,
					data : {"ids":ids,"table":"help"}
				});

				$log.srvLogWrite("Z1", "03", "04", "03", "", "");
				if($(".postnumber").length == 1){$useinfoLst.ui.pageNum = $useinfoLst.ui.pageNum - 1}
				$useinfoLst.ui.getUseInfoLst();
			},
			
			getUseInfoLst : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getUseInfoLst.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							if(res.useinfoLst.length == 0){
								//alert("'"+$useinfoLst.ui.searchText + "'에 대한 검색 결과가 없습니다.")
								$useinfoLst.ui.searchText = null;
								$("#qna-search").val("");
								$("tbody tr").remove();
								break;
							}
							$("tbody tr").remove();
							var selectValue = $useinfoLst.ui.selectViewCount;
							var totaldata = res.useinfoLst[0].total;
							var page = $useinfoLst.ui.pageNum;
							var totalpage = Math.ceil(totaldata / selectValue);
							var firstpage = Math.floor((page-1)/10) * 10 + 1
							$(".paging ul li").remove();	
							var lastpage = totalpage;
							$useinfoLst.ui.lastpage = lastpage;
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
							for(var i=0; i < res.useinfoLst.length;i++){
								var tag = "";
								tag = tag + '<tr><td><span class="checkbox solo"><input id="c'+res.useinfoLst[i].post_no+'" name="checkTF" style="display:none" type="checkbox" >';
								tag = tag + '<label for="c'+res.useinfoLst[i].post_no+'">&nbsp;</label>';
								tag = tag + '</span></td>';
								tag = tag + '<td class="postnumber">'+res.useinfoLst[i].row+'</td>';
								tag = tag + '<td class="title left">';
								tag = tag + '<a class="qna-title" href="' + contextPath + '/view/sysmgt/useinfoView?post='+res.useinfoLst[i].post_no+'">'+res.useinfoLst[i].title+'<em class="icon file"></em></a></td>';
								tag = tag + '<td class="postdate">'+res.useinfoLst[i].reg_ts+'</td>';
								tag = tag + '<td class="view-cnt">'+res.useinfoLst[i].view_cnt+'</td>'; 
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
				data : {"post_no":post_no,"table":"help"}
			});
		}
	};
	$useinfoLst.event = {
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
					$useinfoLst.ui.doDelete();
				});
				
				$("#selectViewCount").off().on("change",function(){
					$useinfoLst.ui.pageNum = 1;
					$useinfoLst.ui.selectViewCount = $("#selectViewCount option:selected").val();
					$useinfoLst.ui.getUseInfoLst();
				});
				
				$("#btnSearch").off().on("click",function(){
					//debugger;
					$useinfoLst.ui.searchType = $("#searchType option:selected").val();
					$useinfoLst.ui.searchText = $("#searchText").val();

					$log.srvLogWrite("Z1", "03", "04", "02", "", "");
					$useinfoLst.ui.getUseInfoLst();
				});
				$(".paging ul").off().on("click",".select-page",function(){
					$useinfoLst.ui.pageNum = this.text;
					$useinfoLst.ui.getUseInfoLst();
				});
				$(".first").off().on("click",function(){
					if($useinfoLst.ui.pageNum != 1){
						$useinfoLst.ui.pageNum = 1;
						$useinfoLst.ui.getUseInfoLst();
					}
				});
				$(".prev").off().on("click",function(){
					if((parseInt($useinfoLst.ui.pageNum) - 1) > 0){
						$useinfoLst.ui.pageNum = parseInt($useinfoLst.ui.pageNum) - 1;
						$useinfoLst.ui.getUseInfoLst();
					}
				});
				$(".end").off().on("click",function(){
					if($useinfoLst.ui.pageNum != $useinfoLst.ui.lastpage){
						$useinfoLst.ui.pageNum = $useinfoLst.ui.lastpage;
						$useinfoLst.ui.getUseInfoLst();	
					}
				});
				$(".next").off().on("click",function(){
					if((parseInt($useinfoLst.ui.pageNum) + 1) <= $useinfoLst.ui.lastpage){
						$useinfoLst.ui.pageNum = parseInt($useinfoLst.ui.pageNum) + 1;
						$useinfoLst.ui.getUseInfoLst();
					}
				});
				$(document).on("click",".qna-title",function(){
					var post_no = this.parentElement.parentElement.getElementsByTagName("input").item(0).id.replace("c","");
					$useinfoLst.ui.updateViewCnt(post_no);
				});
			}
	};
}(window,document));