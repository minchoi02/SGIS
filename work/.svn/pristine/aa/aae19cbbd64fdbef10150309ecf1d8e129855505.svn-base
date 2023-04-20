(function(W,D){
	W.$shareLst = W.$shareLst || {};
	$(document).ready(function(){
		$shareLst.ui.getShareLst();
		$shareLst.event.setUIEvent();	

		$log.srvLogWrite("Z1", "03", "09", "01", "", "");
	});
	
	$shareLst.ui = {
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
						$shareLst.request.deletePost(checkBoxIds.toString());
					}
				}
			},
			
			getShareLst : function(){
				//debugger;
				var searchType = $shareLst.ui.searchType;
				var searchText = $shareLst.ui.searchText;
				var searchPage = $shareLst.ui.pageNum;
				var selectValue = $shareLst.ui.selectViewCount;
				var obj = {
						params : {
							searchType:searchType,
							searchText:searchText,
							searchPage:searchPage,
							selectViewCount:selectValue
							}
				};
				$shareLst.request.getShareLst(obj);
			},
			
			updateViewCnt: function(post_no){
				$shareLst.request.updateViewCnt(post_no);
			}
			
	};
	$shareLst.request = {
			deletePost : function(ids){
				$.ajax({
					type : "POST",
					url : contextPath +"/api/sysmgt/deleteShareBoard.do",
					dataType : "json",
					sync : true,
					data : {"ids":ids}
				});
				$log.srvLogWrite("Z1", "03", "08", "03", ids, "");
				
				if($(".postnumber").length == 1){$shareLst.ui.pageNum = $shareLst.ui.pageNum - 1}
				$shareLst.ui.getShareLst();
			},
			
			getShareLst : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getShareLst.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							if(res.shareLst.length == 0){
								//alert("'"+$shareLst.ui.searchText + "'에 대한 검색 결과가 없습니다.")
								$shareLst.ui.searchText = null;
								$("#searchText").val("");
								$("tbody tr").remove();
								break;
							}
							$("tbody tr").remove()
							var selectValue = $shareLst.ui.selectViewCount;
							var totaldata = res.shareLst[0].total;
							var page = $shareLst.ui.pageNum;
							var totalpage = Math.ceil(totaldata / selectValue);
							var firstpage = Math.floor((page-1)/10) * 10 + 1
							$(".paging ul li").remove();	
							var lastpage = totalpage;
							$shareLst.ui.lastpage = lastpage;
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
							for(var i=0; i < res.shareLst.length;i++){
								var tag = "";
								tag = tag + '<tr><td><span class="checkbox solo"><input id="c'+res.shareLst[i].post_no+'" name="checkTF" style="display:none" type="checkbox" >';
								tag = tag + '<label for="c'+res.shareLst[i].post_no+'">&nbsp;</label>';
								tag = tag + '</span></td>';
								tag = tag + '<td class="postnumber">'+res.shareLst[i].row+'</td>';
								tag = tag + '<td class="title left">';
								tag = tag + '<a class="share-title" href="' + contextPath + '/view/sysmgt/shareView?post='+res.shareLst[i].post_no+'">'+res.shareLst[i].title+'<em class="icon file"></em></a></td>';
								tag = tag + '<td class="username">'+res.shareLst[i].user_nm+'</td>';
								tag = tag + '<td class="postdate">'+res.shareLst[i].reg_ts+'</td>';
								tag = tag + '<td class="view-cnt">'+res.shareLst[i].hits+'</td>'; 
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
				url : contextPath +"/api/sysmgt/updateShareBoardHits.do",
				dataType : "json",
				data : {"post_no":post_no}
			});
		}
	};
	$shareLst.event = {
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
					$shareLst.ui.doDelete();
				});
				
				$("#selectViewCount").off().on("change",function(){
					$shareLst.ui.pageNum = 1;
					$shareLst.ui.selectViewCount = $("#selectViewCount option:selected").val();
					$shareLst.ui.getShareLst();
				});
				
				$("#btnSearch").off().on("click",function(){
					$shareLst.ui.searchType = $("#searchType option:selected").val();
					$shareLst.ui.searchText = $("#searchText").val();
					
					$log.srvLogWrite("Z1", "03", "08", "02", "", "");
					$shareLst.ui.getShareLst();
				});
				$(".paging ul").off().on("click",".select-page",function(){
					$shareLst.ui.pageNum = this.text;
					$shareLst.ui.getShareLst();
				});
				$(".first").off().on("click",function(){
					if($shareLst.ui.pageNum != 1){
						$shareLst.ui.pageNum = 1;
						$shareLst.ui.getShareLst();
					}
				});
				$(".prev").off().on("click",function(){
					if((parseInt($shareLst.ui.pageNum) - 1) > 0){
						$shareLst.ui.pageNum = parseInt($shareLst.ui.pageNum) - 1;
						$shareLst.ui.getShareLst();
					}
				});
				$(".end").off().on("click",function(){
					if($shareLst.ui.pageNum != $shareLst.ui.lastpage){
						$shareLst.ui.pageNum = $shareLst.ui.lastpage;
						$shareLst.ui.getShareLst();	
					}
				});
				$(".next").off().on("click",function(){
					if((parseInt($shareLst.ui.pageNum) + 1) <= $shareLst.ui.lastpage){
						$shareLst.ui.pageNum = parseInt($shareLst.ui.pageNum) + 1;
						$shareLst.ui.getShareLst();
					}
				});
				$(document).on("click",".share-title",function(){
					var post_no = this.parentElement.parentElement.getElementsByTagName("input").item(0).id.replace("c","");
					$shareLst.ui.updateViewCnt(post_no);
				});
			}
	};
}(window,document));