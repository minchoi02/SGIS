(function(W,D){
	W.$gridInfo = W.$gridInfo || {};
	
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
		$gridInfo.event.setUIEvent();
	});
	
	//UI 내용 작성
	$gridInfo.ui = {
			start : 0,
			currentPage : 1,
			maxCntPerPage : 10,
			lastpage : null,
			
			//화면 초기화
			initView : function(){
				this.start = 0;
				this.currentPage = 1;
				this.maxCntPerPage = 10;
			},
			
			//파라미터 설정
			setParams : function(start){
				var options = {
					params : {
						start : start,
						resultCnt : this.maxCntPerPage
					}
				};
				return options;
			
			},
			
			// 페이징 생성
			gridInfoPaging : function(totalCount, totalPage, pageSize, data, pageIndex) {
				$(".total").text(pageIndex + " / " + totalPage + " 페이지 총" + totalCount + " 건")
				$('.paging').paging({
					current : pageIndex,
					max : totalPage,
					itemClass : 'number',
					itemCurrent : 'current',
					format : '{0}',
					next : '>',
					prev : '<',
					first : '<<',
					last : '>>',
					data : data,
					onclick : function(e, page){
						$gridInfo.ui.start = (page - 1) * pageSize;
						$gridInfo.ui.currentPage = page;
						$gridInfo.request.doReqgridInfoList($gridInfo.ui.start);
					}
				});
			},
				
			// 검색정보가 없을 경우
			setEmptyListTable : function() {
				var html = "</tr><td colspan='4'>검색된 내용이 없습니다.</td></tr>";
				$("#gridInfo > tbody").empty();
			},
			
			
			// 품질점검 현황 테이블 생성하기   res.gridInfo
			setCareerListTable : function(data, pageSize, curPage) {
				// 테이블 생성하기
				var html = "";
				for(var i = 0; i < data.length; i++){
					var no = (parseInt(curPage) * pageSize) + (i - pageSize) + 1;
					//work_no, work_nm, data_type, base_year, grid_type, select_code, work_state, err_msg, start_dt
					html +=	"<tr id='sIdx_"+i+"'>";
					html +=		"<td>" + no + "</td>"; //이력 시퀀스
					html +=     "<td>" + data[i].work_nm + "</td>"; //업무명
					html +=     "<td>" + data[i].start_dt + "</td>"; //생성일
					html +=		"<td><a href='" + contextPath + "/api/sysmgt/downloadPG.do?work_no=" + data[i].work_no + "'>다운로드</a></td>";//경로
					html +=	"</tr>";
				}
				$("#gridInfo > tbody").empty();
				$("#gridInfo > tbody:last").append(html);
			}
	};
	
	//AJAX 내용 작성
	$gridInfo.request = {
			//품질 검사 현황 정보 조회
			doReqgridInfoList : function(start){
				
				var options = $gridInfo.ui.setParams(start);
				$ajax.requestApi(contextPath + "/api/prjmng/getGridInfoList.do", options, function(res){
					
					switch(parseInt(res.errCd)){
						case 0:
							var result = res.result;
							$("#gridInfo > tbody").empty();
							
							if (result.length > 0){
								var totalpage = Math.ceil(result[0].total / $gridInfo.ui.maxCntPerPage);
								$gridInfo.ui.gridInfoPaging(result[0].total, totalpage, $gridInfo.ui.maxCntPerPage, result, $gridInfo.ui.currentPage);
								$gridInfo.ui.setCareerListTable(result, $gridInfo.ui.maxCntPerPage, $gridInfo.ui.currentPage);
							}
							else {
								$gridInfo.ui.setEmptyListTable();		
								}
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			}
	};
	
	//event 작성
	$gridInfo.event = {
			setUIEvent : function(){

				
				$gridInfo.ui.currentPage = 1;

				}

	};	
}(window, document));

