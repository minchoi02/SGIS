(function(W,D){
	W.$groupLst = W.$groupLst || {};
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
		$groupLst.ui.getDataLst();
		$groupLst.event.setUIEvent();	
		
		$log.srvLogWrite("Z1", "06", "03", "01", "", "");
	});
	
	$groupLst.ui = {
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
						$groupLst.ui.srtIdx = (page - 1) * pageSize;
						$groupLst.ui.currentPage = page;
						$groupLst.ui.getDataLst();
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
						$groupLst.request.deletePost(checkBoxIds.toString());
					}
				}
			},
			
			getDataLst : function(){
				var options = {
						params : {
							searchPage:$groupLst.ui.pageNum,
							selectValue:$groupLst.ui.selectViewCount,
							searchText:$groupLst.ui.searchText
						}
				};
				$groupLst.request.getDataLst(options);
			}
	};
	$groupLst.request = {
			deletePost : function(inst_seq){
				$.ajax({
					type : "POST",
					url : contextPath +"/api/sysmgt/deleteInstitution.do",
					dataType : "json",
					sync : true,
					data : {"inst_seq":inst_seq},
					success: function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$log.srvLogWrite("Z1", "06", "03", "05", "", "");
								$groupLst.ui.getDataLst();
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
				$ajax.requestApi(contextPath + "/api/sysmgt/getInstitutionLst.do", data, function(res) {
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
								var totalPage = Math.ceil( result[0].total / $groupLst.ui.maxCntPerPage);
								$groupLst.ui.viewPaging(result[0].total, totalPage, $groupLst.ui.maxCntPerPage, result, $groupLst.ui.currentPage);
								var html = "";
								for(var i=0; i < result.length;i++){
									html = html + '<tr><td class="postnumber">'+result[i].row+'</td>';
									html = html + '<td class="title left">';
									html = html + '<a class="notice-title" href="' + contextPath + '/view/sysmgt/groupEdit?inst_seq='+result[i].inst_seq+'">'+result[i].inst_nm+'</a></td>';
									html = html + '<td>'+result[i].inst_desc+'</td>';
									html = html + '</tr>'; 
								}
								$("#dataTbl > tbody").empty().append(html);
							}else {
								var html = '<tr><td colspan="3">데이터가 없습니다.</td></tr>'; 
								$("#dataTbl > tbody").empty().append(html); 								
								$(".paging").empty();
							}

							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
					
				})
		}
	};
	$groupLst.event = {
			setUIEvent : function(){
				$("#btnSearch").off().on("click",function(){
					$groupLst.ui.searchText = $("#searchText").val();
					
					$log.srvLogWrite("Z1", "06", "03", "02", "", "");
					$groupLst.ui.getDataLst();
				});
				
				$("#btnAdd").off().on("click",function(){
					location.href="groupEdit";
				});
			}
	};
}(window,document));