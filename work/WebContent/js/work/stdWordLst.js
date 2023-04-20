(function(W,D){
	W.$stdWordLst = W.$stdWordLst || {};
	$(document).ready(function(){

		$stdWordLst.ui.getDataLst();
		$stdWordLst.event.setUIEvent();	
		$log.srvLogWrite("Z1", "07", "01", "01", "", "");
	});
	
	$stdWordLst.ui = {
			srtIdx : 0,
			currentPage : 1,
			maxCntPerPage : 10,
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
				$(".total").text(pageIndex + " / " + totalPage + " 페이지 총 " + $commonFunc.appendCommaToNumber(totalCount) + "건")
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
						$stdWordLst.ui.srtIdx = (page - 1) * pageSize;
						$stdWordLst.ui.currentPage = page;
						$stdWordLst.ui.getDataLst();
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
						$stdWordLst.request.deletePost(checkBoxIds.toString());
					}
				}
			},
			
			getDataLst : function(){
				var options = {
						params : {
							searchPage:$stdWordLst.ui.currentPage,
							selectViewCount:$stdWordLst.ui.selectViewCount,
							searchText:$stdWordLst.ui.searchText
						}
				};
				$stdWordLst.request.getDataLst(options);
			}
	};
	$stdWordLst.request = {
			deletePost : function(inst_seq){
				$.ajax({
					type : "POST",
					url : contextPath +"/api/sysmgt/deleteStdWord.do",
					dataType : "json",
					sync : true,
					data : {"inst_seq":inst_seq},
					success: function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$stdWordLst.ui.getDataLst();
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
				$ajax.requestApi(contextPath + "/api/sysmgt/getStdWordLst.do", data, function(res) {
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
								var totalPage = Math.ceil( result[0].total / $stdWordLst.ui.maxCntPerPage);
								$stdWordLst.ui.viewPaging(result[0].total, totalPage, $stdWordLst.ui.maxCntPerPage, result, $stdWordLst.ui.currentPage);
								var html = "";
								for(var i=0; i < result.length;i++){
									html = html + '<tr><td class="postnumber">'+result[i].row+'</td>';
									html = html + '<td class="title left">';
									html = html + '<a class="notice-title" href="' + contextPath + '/view/sysmgt/stdWordEdit?wrd_seq='+result[i].wrd_seq+'">'+result[i].korean_wrd_nm+'</a></td>';
									html = html + '<td>'+result[i].eng_wrd_nm+'</td>';
									html = html + '<td>'+result[i].eng_abrv_nm+'</td>';
									html = html + '<td>'+result[i].wrd_desc+'</td>';
									html = html + '<td>'+result[i].wrd_type+'</td>';
									html = html + '<td>'+result[i].rm+'</td>';
									html = html + '</tr>'; 
								}
								$("#dataTbl > tbody").empty().append(html);
							}else {
								var html = '<tr><td colspan="7">데이터가 없습니다.</td></tr>'; 
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
	$stdWordLst.event = {
			setUIEvent : function(){
				$("#btnSearch").off().on("click",function(){
					$stdWordLst.ui.searchText = $("#searchText").val();
					$log.srvLogWrite("Z1", "07", "01", "02", "", "");
					$stdWordLst.ui.getDataLst();
				});
				
				$("#btnAdd").off().on("click",function(){
					location.href="stdWordEdit";
				});
			}
	};
}(window,document));