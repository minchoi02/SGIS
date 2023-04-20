
(function(W,D){
	W.$addrDbSts = W.$addrDbSts || {};
	
	$(document).ready(function(){
		$addrDbSts.event.setUIEvent();
		$log.srvLogWrite("Z3", "01", "01", "01", "", "");
	});
	
	//UI 내용작성
	$addrDbSts.ui = {
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
						$addrDbSts.ui.srtIdx = (page - 1) * pageSize;
						$addrDbSts.ui.currentPage = page;
						$addrDbSts.request.doReqAddrDbStsList($addrDbSts.ui.srtIdx);
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
				$("#addrDBStstList > tbody").empty();
			},
			
			/**
			 * 
			 * @name         : setAddrDbStsListTable
			 * @description  : 주소DB현황 테이블을 세팅한다.
			 * @date         : 2019. 07. 12. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param data   : 데이터
			 * @param pageSize : 한페이지당 최대 갯수
			 * @param curPage :현재 페이지
			 * @param type : 타입
			 */
			setAddrDbStsListTable : function(data, pageSize, curPage) {
				//테이블 생성
				var html = "";
				for (var i=0; i<data.length; i++) {
					var no = (parseInt(curPage)*pageSize) + (i-pageSize);
					html +=	"<tr id='sIdx_"+i+"'>";
					html +=		"<td>"+data[i].addrdb_collect_dt+"</td>";//
					html +=		"<td>"+data[i].addrdb_load_dt+"</td>";//
					html +=		"<td>"+$commonFunc.appendCommaToNumber(data[i].addrdb_collect_cnt)+"</td>";//
					html +=		"<td>"+$commonFunc.appendCommaToNumber(data[i].addrdb_load_cnt)+"</td>";//
					html +=		"<td>"+$commonFunc.appendCommaToNumber(data[i].addrdb_old_cnt)+"</td>";//
					html +=		"<td>"+data[i].addrdb_lucene+"</td>";//
					html +=		"<td>"+data[i].addrdb_sevice+"</td>";//
					html +=		"<td><a href='" + contextPath + "/api/sysmgt/collectfiledownload?code=addr&collect_seq=0&fn="+data[i].file_nm+"'>"+data[i].file_nm+"</a></td>";
					html +=	"</tr>";
				}
				$("#addrDBStstList > tbody").empty();
				$("#addrDBStstList > tbody:last").append(html);
			}
	};
	
	//AJAX 내용작성
	$addrDbSts.request = {
			
			/**
			 * 
			 * @name         : doReqAddrDbStsList
			 * @description  : 주소DB현황 정보를 조회한다.
			 * @date         : 2019. 08. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param startIdx : 시작 인덱스
			 */
			doReqAddrDbStsList : function(startIdx) {
				var options = $addrDbSts.ui.setParams(startIdx);
				$ajax.requestApi(contextPath + "/api/collect/getAddrDBStstList.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							$("#addrDBStstList > tbody").empty();
							
							//log generate by cis
							var log_param = "searchButton";
							log_param += ", Category - " + $("#addrDbStsSearchSelectBox option:selected").text();
							log_param += ", word - " + $.trim($("#addrDbStsSearchText").val());
							
							//$log.srvLogWrite("Z0", "06", "04", "02", "", log_param);
							
							if (result.length > 0) {
								var totalPage = Math.ceil( result[0].total / $addrDbSts.ui.maxCntPerPage);
								$addrDbSts.ui.addrListViewPaging(result[0].total, totalPage, $addrDbSts.ui.maxCntPerPage, result, $addrDbSts.ui.currentPage);
								$addrDbSts.ui.setAddrDbStsListTable(result, $addrDbSts.ui.maxCntPerPage, $addrDbSts.ui.currentPage);
							}else {
								$addrDbSts.ui.setEmptyListTable();
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
	$addrDbSts.event = {
			
			setUIEvent : function(){
				
				$addrDbSts.ui.currentPage = 1;
				$addrDbSts.request.doReqAddrDbStsList(0);	
				
			}
	};
	
}(window,document));