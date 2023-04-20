
(function(W,D){
	W.$collectJobDb = W.$collectJobDb || {};
	
	$(document).ready(function(){
		$collectJobDb.event.setUIEvent();
		$log.srvLogWrite("Z4", "07", "01", "01", "", "");
	});
	
	//UI 내용작성
	$collectJobDb.ui = {
			srtIdx : 0,
			currentPage : 1,
			maxCntPerPage : 10,
			
			/**
			 * 
			 * @name         : initView
			 * @description  : 화면을 초기화한다.
			 * @date         : 2019. 07. 17. 
			 * @author	     : 최인섭
			 * @history 	 :
			 */
			initView : function() {
				this.srtIdx = 0;
				this.currentPage = 1;
				this.maxCntPerPage = 10;
			},
			
			/**
			 * 
			 * @name         : setParams
			 * @description  : 파라미터를 설정한다.
			 * @date         : 2019. 07. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param startIdx : 시작인덱스
			 */
			setParams : function(startIdx) {
			},
			
			/**
			 * 
			 * @name         : boardListViewPaging
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
			addrListViewPaging : function(totalCount, totalPage, pageSize, data, pageIndex) {
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
						$collectJobDb.ui.srtIdx = (page - 1) * pageSize;
						$collectJobDb.ui.currentPage = page;
						$collectJobDb.request.doReqCollectJobDbList($collectJobDb.ui.srtIdx);
					}
				});
			},
			
			/**
			 * 
			 * @name         : setEmptyListTable
			 * @description  : 검색정보가 없을 경우 테이블을 설정한다.
			 * @date         : 2019. 07. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 */
			setEmptyListTable : function() {
				var html = "</tr><td colspan='7'>검색된 내용이 없습니다.</td></tr>";
				$("#jobDBStstList > tbody").empty();
			},
			
			/**
			 * 
			 * @name         : setCollectJobDbListTable
			 * @description  : 주소DB현황 테이블을 세팅한다.
			 * @date         : 2019. 07. 12. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param data   : 데이터
			 * @param pageSize : 한페이지당 최대 갯수
			 * @param curPage :현재 페이지
			 * @param type : 타입
			 */
			setCollectJobDbListTable : function(data, pageSize, curPage) {
				//테이블 생성
				var html = "";
				for (var i=0; i<data.length; i++) {
					var no = (parseInt(curPage)*pageSize) + (i-pageSize);
					html +=	"<tr id='sIdx_"+i+"'>";
					html +=		"<td>"+data[i].collect_dt +"</td>";
					html +=		"<td>"+$commonFunc.appendCommaToNumber(data[i].worknet_cnt)+"</td>";
					html +=		"<td>"+$commonFunc.appendCommaToNumber(data[i].incruit_cnt)+"</td>";
					html +=		"<td>"+data[i].geocoding_dt+"</td>";
					html +=		"<td>"+data[i].cleanprocess_dt+"</td>";
					html +=		"<td>"+data[i].transfer_dt+"</td>";
					html +=	"</tr>";
				}
				$("#jobDBStstList > tbody").empty();
				$("#jobDBStstList > tbody:last").append(html);
			}
	};
	
	//AJAX 내용작성
	$collectJobDb.request = {
			
			/**
			 * 
			 * @name         : doReqCollectJobDbList
			 * @description  : 주소DB현황 정보를 조회한다.
			 * @date         : 2019. 08. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param startIdx : 시작 인덱스
			 */
			doReqCollectJobDbList : function(startIdx) {
				var options = $collectJobDb.ui.setParams(startIdx);
				$ajax.requestApi(contextPath + "/api/collect/getCollectJobSts.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							$("#addrDBStstList > tbody").empty();
							
							//log generate by cis
							var log_param = "searchButton";
							log_param += ", Category - " + $("#collectJobDbSearchSelectBox option:selected").text();
							log_param += ", word - " + $.trim($("#collectJobDbSearchText").val());
							
							//$log.srvLogWrite("Z0", "06", "04", "02", "", log_param);
							
							if (result.length > 0) {
								var totalPage = Math.ceil( result[0].total / $collectJobDb.ui.maxCntPerPage);
								$collectJobDb.ui.addrListViewPaging(result[0].total, totalPage, $collectJobDb.ui.maxCntPerPage, result, $collectJobDb.ui.currentPage);
								$collectJobDb.ui.setCollectJobDbListTable(result, $collectJobDb.ui.maxCntPerPage, $collectJobDb.ui.currentPage);
							}else {
								$collectJobDb.ui.setEmptyListTable();
							}
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			}
	};
	
	//EVENT 내용작성
	$collectJobDb.event = {
			
			setUIEvent : function(){
				
				$collectJobDb.ui.currentPage = 1;
				$collectJobDb.request.doReqCollectJobDbList(0);	
				
			}
	};
	
}(window,document));