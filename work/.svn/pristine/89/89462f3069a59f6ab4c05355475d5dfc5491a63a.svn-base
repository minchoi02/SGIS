(function(W,D){
	W.$userMng = W.$userMng || {};
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
		var url_string = window.location.href;
		var url = new URL(url_string);
		$userMng.ui.grant_yn = url.searchParams.get("grant_yn");
		
		$userMng.ui.getDataLst();
		$userMng.event.setUIEvent();	
		$log.srvLogWrite("Z1", "04", "01", "01", "", "");
	});
	
	$userMng.ui = {
			srtIdx : 0,
			currentPage : 1,
			maxCntPerPage : 10,
			searchText : null,
			searchType : null,
			pageNum : 1,
			selectViewCount: 100,
			lastpage: 1,
			grant_yn: null,
			
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
				$('.pages').paging({
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
						$userMng.ui.srtIdx = (page - 1) * pageSize;
						$userMng.ui.currentPage = page;
						$userMng.ui.getDataLst();
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
						$userMng.request.deletePost(checkBoxIds.toString());
					}
				}
			},
			
			getDataLst : function(){
				var options = {
						params : {
							searchPage:$userMng.ui.currentPage,
							selectViewCount:$userMng.ui.selectViewCount,
							searchText:$userMng.ui.searchText,
							grant_yn:$userMng.ui.grant_yn
						}
				};
				$userMng.request.getDataLst(options);
			}
	};
	$userMng.request = {
			getDataLst : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getUserMngLst.do", data, function(res) {
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
								var totalPage = Math.ceil( result[0].total / $userMng.ui.selectViewCount);
								$userMng.ui.viewPaging(result[0].total, totalPage, $userMng.ui.maxCntPerPage, result, $userMng.ui.currentPage);
								var html = "";
								for(var i=0; i < result.length;i++){
									html = html + '<tr><td class="postnumber">'+result[i].row+'</td>';
									html = html + '<td class="title left">';
									html = html + '<a class="notice-title" href="' + contextPath + '/view/use/userSdcMngEdit?user_no='+result[i].user_no+'">'+result[i].user_nm+'</a></td>';
									html = html + '<td>'+result[i].user_div+'</td>';
									html = html + '<td>'+result[i].institute+'</td>';
									if (typeof result[i].login_ts != 'undefined') {
										html = html + '<td>'+result[i].login_ts+'</td>';
									} else {
										html = html + '<td></td>';
									}
									
									html = html + '<td>'+result[i].login_fail_cnt+'</td>';
									html = html + '</tr>'; 
								}
								$("#dataTbl > tbody").empty().append(html);
							}else {
								var html = '<tr><td colspan="6">데이터가 없습니다.</td></tr>'; 
								$("#dataTbl > tbody").empty().append(html); 								
								$(".paging").empty();
							}

							break;
						default:
							$messageNew.open("알림", res.errMsg);
							break;
					}
					
				})
		}
	};
	$userMng.event = {
			setUIEvent : function(){
				$("#btnSearch").off().on("click",function(){
					$userMng.ui.searchText = $("#searchText").val();
					
					$log.srvLogWrite("Z1", "04", "01", "02", "", "");
					$userMng.ui.getDataLst();
				});
				
				$("#btnAdd").off().on("click",function(){
					location.href="userMngEdit";
				});
				
				
				$("#selectViewCount").off().on("change",function(){
					$userMng.ui.pageNum = 1;
					$userMng.ui.selectViewCount = $("#selectViewCount option:selected").val();
					$userMng.ui.getDataLst();
				});
			}
	};
}(window,document));