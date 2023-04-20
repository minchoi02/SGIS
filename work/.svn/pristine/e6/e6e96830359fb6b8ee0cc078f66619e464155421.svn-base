
(function(W,D){
	W.$collectMolitDb = W.$collectMolitDb || {};
	
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
		$collectMolitDb.event.setUIEvent();
	});
	
	//UI 내용작성
	$collectMolitDb.ui = {
			srtIdx : 0,
			currentPage : 1,
			maxCntPerPage : 10,
			code : '',
			
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
				var searchText = $.trim($("#searchText").val());
				
				var options = {	
					params : {
						startIdx : startIdx,
						resultCnt : this.maxCntPerPage
					}
				};
				
				if (searchText.length > 0) {
					options.params["searchText"] = searchText;
				}
				
				options.params["code"] = $collectMolitDb.ui.code;
				return options;
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
			collectMolitDbPaging : function(totalCount, totalPage, pageSize, data, pageIndex) {
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
						$collectMolitDb.ui.srtIdx = (page - 1) * pageSize;
						$collectMolitDb.ui.currentPage = page;
						$collectMolitDb.request.doReqCollectMolitDbList($collectMolitDb.ui.srtIdx);
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
				$("#collectMolitDb > tbody").empty();
			},
			
			number_to_human_size : function(x) {
				  var s = [' B', ' KB', ' MB', ' GB', ' TB', ' PB'];
				  var e = Math.floor(Math.log(x) / Math.log(1024));
				  return (x / Math.pow(1024, e)).toFixed(1) + "" + s[e];
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
					var no = (parseInt(curPage)*pageSize) + (i-pageSize) + 1;
					html +=	"<tr id='sIdx_"+i+"'>";
					html +=		"<td><span class='checkbox solo'><input type='checkbox' name='collect_seq' id='c_" + data[i].collect_seq +"' value='"+data[i].collect_seq+"'><label for='c_" + data[i].collect_seq +"'>&nbsp;</label></span></td>";
					html +=		"<td>"+no+"</td>";
					html +=		"<td><a href='" + contextPath + "/api/sysmgt/collectfiledownload?code=" +$collectMolitDb.ui.code+ "&collect_seq="+data[i].collect_seq+"&fn="+data[i].file_nm+"'>"+data[i].file_nm+"</a></td>";
					html +=		"<td>"+data[i].col_org+"</td>";
					html +=		"<td>"+data[i].cl_nm+"</td>";
					html +=		"<td>"+data[i].col_period+"</td>";
					html +=		"<td>"+$collectMolitDb.ui.number_to_human_size(data[i].data_size)+"</td>";
					html +=		"<td>"+data[i].reg_dt+"</td>";
					html +=	"</tr>";
				}
				$("#collectMolitDb > tbody").empty();
				$("#collectMolitDb > tbody:last").append(html);
			}
	};
	
	//AJAX 내용작성
	$collectMolitDb.request = {
			
			/**
			 * 
			 * @name         : doReqCollectMolitDbList
			 * @description  : 주소DB현황 정보를 조회한다.
			 * @date         : 2019. 08. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param startIdx : 시작 인덱스
			 */
			doReqCollectMolitDbList : function(startIdx) {
				var options = $collectMolitDb.ui.setParams(startIdx);
				$ajax.requestApi(contextPath + "/api/collect/getCollectList.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							$("#collectMolitDb > tbody").empty();
							
							//log generate by cis
							var log_param = "searchButton";
							log_param += ", Category - " + $("#addrDbStsSearchSelectBox option:selected").text();
							log_param += ", word - " + $.trim($("#addrDbStsSearchText").val());
							
							//$log.srvLogWrite("Z0", "06", "04", "02", "", log_param);
							
							if (result.length > 0) {
								var totalPage = Math.ceil( result[0].total / $collectMolitDb.ui.maxCntPerPage);
								$collectMolitDb.ui.collectMolitDbPaging(result[0].total, totalPage, $collectMolitDb.ui.maxCntPerPage, result, $collectMolitDb.ui.currentPage);
								$collectMolitDb.ui.setAddrDbStsListTable(result, $collectMolitDb.ui.maxCntPerPage, $collectMolitDb.ui.currentPage);
							}else {
								$collectMolitDb.ui.setEmptyListTable();
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
	$collectMolitDb.event = {
			setUIEvent : function(){
				$("#btnSearch").off().on("click",function(){
					$log.srvLogWrite("Z4", "02", "01", "02", "", "");
					$collectMolitDb.request.doReqCollectMolitDbList(0);	
				});
				
				//삭제 버튼 이벤트
				$("#deleteBtn").on("click", function(e) {
					$confirmNew.open("확인","해당 데이터를 삭제하시겠습니까?");
				});
				//삭제 확인 후 처리 버튼 이벤트
				$(document).on("click","#msgOkBtn",function(){
					postCnt = $("input[name=collect_seq]:checked").length
					if (postCnt > 0){
						var checkBoxIds = [];
						$("input[name=collect_seq]:checked").each(function(){
							var tid = $(this).val();
							checkBoxIds.push(tid);
						})
						
						var options = {};
						var params = {};
						params.collect_seq = checkBoxIds.join(",");
						options.params = params;
						
						$ajax.requestApi(contextPath + "/api/collect/deleteCollect.do", options, function(res) {
							//debugger;
							switch(parseInt(res.errCd)) {
								case 0:
									$messageNew.open("알림", "삭제되었습니다.");
									window.location.href = contextPath+"/view/collectData/collectMolitDb";
									break;
								default:
									$messageNew.open("알림", res.errMsg);
									break;
							}
						});
					}
				});
				
				$collectMolitDb.ui.currentPage = 1;
				
			}
	};
	
}(window,document));