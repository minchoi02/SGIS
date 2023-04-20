(function(W,D){
	W.$collectSnsDb = W.$collectSnsDb || {};
	$(document).ready(function(){
		$(function() {
		    $(".dialog").dialog({
		      autoOpen: false,
		      width: 'auto',
		      height: 'auto',
		      resizable: false,
		      minimizable: false,
		      minimizeIcon: 'ui-icon-minus'
		    });
		});
		$collectSnsDb.ui.getDataLst();
		$collectSnsDb.event.setUIEvent();	
		$log.srvLogWrite("Z4", "06", "01", "01", "", "");
	});
	
	$collectSnsDb.ui = {
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
				$(".total").text(pageIndex + " / " + $commonFunc.appendCommaToNumber(totalPage) + " 페이지 총 " + $commonFunc.appendCommaToNumber(totalCount) + "건")
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
						$collectSnsDb.ui.srtIdx = (page - 1) * pageSize;
						$collectSnsDb.ui.currentPage = page;
						$collectSnsDb.ui.getDataLst();
					}
				});
			},
			
			getDataLst : function(){
				//debugger;
				var searchPage = $collectSnsDb.ui.pageNum;
				var selectValue = $collectSnsDb.ui.selectViewCount;
				var obj = {
					params : {
						searchPage:$collectSnsDb.ui.currentPage,
						selectViewCount:$collectSnsDb.ui.selectViewCount,
						searchText:$collectSnsDb.ui.searchText
					}
				};
				$collectSnsDb.request.getDataLst(obj);
			}
	};
	$collectSnsDb.request = {
			getDataLst : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getCollectSnsDb.do", data, function(res) {
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
								var totalPage = Math.ceil( result[0].total / $collectSnsDb.ui.maxCntPerPage);
								$collectSnsDb.ui.viewPaging(result[0].total, totalPage, $collectSnsDb.ui.maxCntPerPage, result, $collectSnsDb.ui.currentPage);
								var html = "";
								for(var i=0; i < result.length;i++){
									html = html + '<tr>';
									html = html + '<td class="postnumber">'+result[i].rnk+'</td>';
									html = html + '<td class="title right">'+result[i].percentage+'</td>';
									html = html + '<td class="title left">'+result[i].noun+'</td>';
									html = html + '<td class="title right">'+$commonFunc.appendCommaToNumber(result[i].df)+'</td>';
									html = html + '<td class="title left">'+result[i].noun_rel_set+'</td>';
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
	$collectSnsDb.event = {
			setUIEvent : function(){
				$("#selectlist").off().on("change",function(){
					$collectSnsDb.ui.pageNum = 1;
					$collectSnsDb.ui.selectViewCount = $("#selectlist option:selected").val();
					$collectSnsDb.ui.getDataLst();
				});
				
				$("#btnSearch").off().on("click",function(){
					$collectSnsDb.ui.pageNum = 1;
					$collectSnsDb.ui.searchType = $("#searchType option:selected").val();
					$collectSnsDb.ui.searchText = $("#searchText").val();
					$collectSnsDb.ui.getDataLst();
				});
			}
	};
}(window,document));