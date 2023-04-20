(function(W,D){
	W.$sampleLst = W.$sampleLst || {};
	$(document).ready(function(){
		$sampleLst.ui.getSampleLst();
		$sampleLst.event.setUIEvent();	
		
		$log.srvLogWrite("Z1", "03", "08", "01", "", "");
	});
	
	$sampleLst.ui = {
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
						$sampleLst.request.deletePost(checkBoxIds.toString());
					}
				}
			},
			
			getSampleLst : function(){
				//debugger;
				var searchType = $sampleLst.ui.searchType;
				var searchText = $sampleLst.ui.searchText;
				var searchPage = $sampleLst.ui.pageNum;
				var selectValue = $sampleLst.ui.selectViewCount;
				var obj = {
						params : {
							searchType:searchType,
							searchText:searchText,
							searchPage:searchPage,
							selectViewCount:selectValue
							}
				};
				$sampleLst.request.getSampleLst(obj);
			},
			
			updateViewCnt: function(post_no){
				$sampleLst.request.updateViewCnt(post_no);
			}
			
	};
	$sampleLst.request = {
			deletePost : function(ids){
				$.ajax({
					type : "POST",
					url : contextPath +"/api/sysmgt/deletePost.do",
					dataType : "json",
					sync : true,
					data : {"ids":ids,"table":"sample_data"}
				});
				$log.srvLogWrite("Z1", "03", "08", "03", ids, "");
				if($(".postnumber").length == 1){$sampleLst.ui.pageNum = $sampleLst.ui.pageNum - 1}
				$sampleLst.ui.getSampleLst();
			},
			
			getSampleLst : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getSampleLst.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							if(res.sampleLst.length == 0){
								//alert("'"+$useCopyLst.ui.searchText + "'에 대한 검색 결과가 없습니다.")
								$sampleLst.ui.searchText = null;
								$("#searchText").val("");
								$("tbody tr").remove();
								break;
							}
							$("tbody tr").remove();
							$("tbody tr").remove()
							var selectValue = $sampleLst.ui.selectViewCount;
							var totaldata = res.sampleLst[0].total;
							var page = $sampleLst.ui.pageNum;
							var totalpage = Math.ceil(totaldata / selectValue);
							var firstpage = Math.floor((page-1)/10) * 10 + 1
							$(".paging ul li").remove();	
							var lastpage = totalpage;
							$sampleLst.ui.lastpage = lastpage;
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
							for(var i=0; i < res.sampleLst.length;i++){
								var tag = "";
								tag = tag + '<tr><td><span class="checkbox solo"><input id="c'+res.sampleLst[i].post_no+'" name="checkTF" style="display:none" type="checkbox" >';
								tag = tag + '<label for="c'+res.sampleLst[i].post_no+'">&nbsp;</label>';
								tag = tag + '</span></td>';
								tag = tag + '<td class="postnumber">'+res.sampleLst[i].row+'</td>';
								tag = tag + '<td class="title left">';
								tag = tag + '<a class="sample-title" href="' + contextPath + '/view/sysmgt/sampleView?post='+res.sampleLst[i].post_no+'">'+res.sampleLst[i].title+'<em class="icon file"></em></a></td>';
								tag = tag + '<td class="username">'+res.sampleLst[i].user_nm+'</td>';
								tag = tag + '<td class="postdate">'+res.sampleLst[i].reg_ts+'</td>';
								tag = tag + '<td class="view-cnt">'+res.sampleLst[i].view_cnt+'</td>'; 
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
				data : {"post_no":post_no,"table":"sample_data"}
			});
		}
	};
	$sampleLst.event = {
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
					$sampleLst.ui.doDelete();
				});
				
				$("#selectViewCount").off().on("change",function(){
					$sampleLst.ui.pageNum = 1;
					$sampleLst.ui.selectViewCount = $("#selectViewCount option:selected").val();
					$sampleLst.ui.getSampleLst();
				});
				
				$("#btnSearch").off().on("click",function(){
					$sampleLst.ui.searchType = $("#searchType option:selected").val();
					$sampleLst.ui.searchText = $("#searchText").val();
					$log.srvLogWrite("Z1", "03", "08", "02", "", "");
					$sampleLst.ui.getSampleLst();
				});
				$(".paging ul").off().on("click",".select-page",function(){
					$sampleLst.ui.pageNum = this.text;
					$sampleLst.ui.getSampleLst();
				});
				$(".first").off().on("click",function(){
					if($sampleLst.ui.pageNum != 1){
						$sampleLst.ui.pageNum = 1;
						$sampleLst.ui.getSampleLst();
					}
				});
				$(".prev").off().on("click",function(){
					if((parseInt($sampleLst.ui.pageNum) - 1) > 0){
						$sampleLst.ui.pageNum = parseInt($sampleLst.ui.pageNum) - 1;
						$sampleLst.ui.getSampleLst();
					}
				});
				$(".end").off().on("click",function(){
					if($sampleLst.ui.pageNum != $sampleLst.ui.lastpage){
						$sampleLst.ui.pageNum = $sampleLst.ui.lastpage;
						$sampleLst.ui.getSampleLst();	
					}
				});
				$(".next").off().on("click",function(){
					if((parseInt($sampleLst.ui.pageNum) + 1) <= $sampleLst.ui.lastpage){
						$sampleLst.ui.pageNum = parseInt($sampleLst.ui.pageNum) + 1;
						$sampleLst.ui.getSampleLst();
					}
				});
				$(document).on("click",".sample-title",function(){
					var post_no = this.parentElement.parentElement.getElementsByTagName("input").item(0).id.replace("c","");
					$sampleLst.ui.updateViewCnt(post_no);
				});
			}
	};
}(window,document));