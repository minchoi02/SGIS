(function(W,D){
	W.$collectLegDb = W.$collectLegDb || {};
	$(document).ready(function(){
		$(function() {
		    $(".dialog").dialog({
		      autoOpen: false,
		      width: 'auto',
		      height: 'auto',
		      modal: true,
		      resizable: false,
		      minimizable: false,
		      minimizeIcon: 'ui-icon-minus'
		    });
		});
		$collectLegDb.ui.getDataLst();
		$collectLegDb.event.setUIEvent();	
	});
	
	$collectLegDb.ui = {
			srtIdx : 0,
			currentPage : 1,
			maxCntPerPage : 50,
			searchText : null,
			searchType : null,
			pageNum : 1,
			selectViewCount: 10,
			lastpage: 1,
			
			/**
			 * 
			 * @name         : viewPaging
			 * @description  : 페이징을 생성한다.
			 * @date         : 2019. 07. 12. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param totalCount: 데이터 갯수
			 * @param totalPage : 총페이지 갯수
			 * @param pageSize : 한페이지당 데이터 갯수
			 * @param data :데이터
			 * @papram pageIndex : 페이지 인덱스
			 */
			viewPaging : function(totalCount, totalPage, pageSize, data, pageIndex) {
				$(".total").text(pageIndex + " / " + totalPage + " 페이지 총 " + totalCount + "건")
				$('.paging').paging({
					current : pageIndex,
					max : totalPage,
					itemClass : 'number',
					itemCurrent : 'current',
					format : '{0}',
					next :  '>',
					prev : '<',
					first : '<<',
					last : '>>',
					data : data,
					onclick : function(e,page){
						$collectLegDb.ui.srtIdx = (page - 1) * pageSize;
						$collectLegDb.ui.currentPage = page;
						$collectLegDb.ui.getDataLst();
					}
				});
			},
			
			doDelete : function(){
				postCnt = $("input[name=checkTF]:checked").length
				if (postCnt > 0){
					if (confirm(postCnt + " 개의 게시물을 삭제하시겠습니까?") == true){
						var checkBoxIds = [];
						$("input[name=checkTF]:checked").each(function(){
							var tid = this.id
							checkBoxIds.push(tid.replace("c",""));
						})
						$collectLegDb.request.deletePost(checkBoxIds.toString());
					}
				}
			},
			
			getDataLst : function(){
				//debugger;
				var searchPage = $collectLegDb.ui.pageNum;
				var selectValue = $collectLegDb.ui.selectViewCount;
				var obj = {
					params : {
						searchPage:$collectLegDb.ui.currentPage,
						selectViewCount:$collectLegDb.ui.selectViewCount,
						searchText:$collectLegDb.ui.searchText
					}
				};
				$collectLegDb.request.getDataLst(obj);
			}
	};
	$collectLegDb.request = {
			deletePost : function(ids){
				$.ajax({
					type : "POST",
					url : contextPath +"/api/sysmgt/deletePost.do",
					dataType : "json",
					sync : true,
					data : {"ids":ids,"table":"collect_leg"},
					success: function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$collectLegDb.ui.getDataLst();
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
			
			getDataLst : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getLegalLst.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							
							//log generate by cis
							var log_param = "searchButton";
							log_param += ", Category - " + $("#prjSetSearchSelectBox option:selected").text();
							log_param += ", word - " + $.trim($("#prjSetSearchText").val());
							//$log.srvLogWrite("Z0", "06", "04", "02", "", log_param);
							
							if (result.length > 0) {
								var totalPage = Math.ceil( result[0].total / $collectLegDb.ui.maxCntPerPage);
								$collectLegDb.ui.viewPaging(result[0].total, totalPage, $collectLegDb.ui.maxCntPerPage, result, $collectLegDb.ui.currentPage);
								var html = "";
								for(var i=0; i < result.length;i++){
									html = html + '<tr><td><span class="checkbox solo"><input id="c'+result[i].id+'" name="checkTF" style="display:none" type="checkbox" >';
									html = html + '<label for="c'+result[i].id+'">&nbsp;</label>';
									html = html + '</span></td>';
									html = html + '<td class="postnumber">'+result[i].row+'</td>';
									html = html + '<td class="title left">';
									html = html + '<a class="notice-title" href="' + contextPath + '/view/collectData/collectLegDbView?post_no='+result[i].id+'">'+result[i].title+'<em class="icon file"></em></a></td>';
									html = html + '<td class="postdate">'+result[i].reg_ts+'</td>';
									html = html + '</tr>'; 
								}
								$("#dataTbl > tbody").empty().append(html);
							}else {
								var html = '<tr><td colspan="4">데이터가 없습니다.</td></tr>'; 
								$("#dataTbl > tbody").empty().append(html); 								
								$(".paging").empty()
							}

							break;
						default:
							$message.open("알림", res.errMsg);
//							break;
					}
				})
		}
	};
	$collectLegDb.event = {
			setUIEvent : function(){
				$("tbody").off().on("click","input[name=checkTF]",function(){
					if(!this.checked) {
						if($("#all").is(":checked") == true){
							$("#all").prop("checked",false);
						}
					}
				});
				
				$("#btnDelete").off().on("click",function(){
					$collectLegDb.ui.doDelete();
				});
				
				$("#selectlist").off().on("change",function(){
					$collectLegDb.ui.pageNum = 1;
					$collectLegDb.ui.selectViewCount = $("#selectlist option:selected").val();
					$collectLegDb.ui.getDataLst();
				});
				
				$("#btnSearch").off().on("click",function(){
					$collectLegDb.ui.searchType = $("#searchType option:selected").val();
					$collectLegDb.ui.searchText = $("#searchText").val();
					$collectLegDb.ui.getDataLst();
				});
			}
	};
}(window,document));