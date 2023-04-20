
(function(W,D){
	W.$qnaView = W.$qnaView || {};
	
	$(document).ready(function(){
		$qnaView.event.setUIEvent();
	});
	
	//UI 내용작성
	$qnaView.ui = {
			srtIdx : 0,
			currentPage : 1,
			maxCntPerPage : 10,
			qnaDetailInfo : null,
			
			/**
			 * 
			 * @name         : initView
			 * @description  : 화면을 초기화한다.
			 * @date         : 2018. 07. 17. 
			 * @author	     : 권차욱
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
			 * @date         : 2018. 07. 16. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param startIdx : 시작인덱스
			 */
			setParams : function(startIdx) {
				//this.maxCntPerPage = parseInt($("#qnaCntSelectBox option:selected").val());
				var searchText = $.trim($("#searchText").val());
				var searchType = $("#searchType option:selected").val();
				
				var options = {
					params : {
						startIdx : startIdx,
						resultCnt : this.maxCntPerPage
					}
				};
				
				if (searchText.length > 0) {
					options.params["type"] = searchType;
					options.params["searchText"] = searchText;
				}
				return options;
			},
			
			/**
			 * 
			 * @name         : qnaListViewPaging
			 * @description  : 게시판 테이블 페이징을 생성한다.
			 * @date         : 2018. 07. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param totalCount: 데이터 갯수
			 * @param totalPage : 총페이지 갯수
			 * @param pageSize : 한페이지당 데이터 갯수
			 * @param data :데이터
			 * @papram pageIndex : 페이지 인덱스
			 */
			qnaListViewPaging : function(totalCount, totalPage, pageSize, data, pageIndex) {
				$('#qnaPage').paging({
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
						$qnaView.ui.srtIdx = (page - 1) * pageSize;
						$qnaView.ui.currentPage = page;
						$qnaView.request.doReqQnaList($qnaView.ui.srtIdx);
					}
				});
			},
			
			/**
			 * 
			 * @name         : getTableHeader
			 * @description  : 테이블 헤더를 설정한다.
			 * @date         : 2018. 07. 16. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			getTableHeader : function() {
				var html = "";
				var colspan = 6;
				
				html +=  "<tr style='height:35px;'>";
				html +=		"<th class='wd80'>번호</th>";
				html +=		"<th>제목</th>";
				html +=		"<th class='wd120'>작성자</th>";
				html +=		"<th class='wd120'>작성일</th>";
				html +=		"<th class='wd120'>조회수</th>";
				html +=		"<th class='wd120'>답변여부</th>";
				html +=	"</tr>";
				
				return info = {
						header : html,
						colspan : colspan
				};
			},
			
			/**
			 * 
			 * @name         : setEmptyListTable
			 * @description  : 검색정보가 없을 경우 테이블을 설정한다.
			 * @date         : 2018. 07. 16. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setEmptyListTable : function() {
				var info = this.getTableHeader();
				var html = info.header;
				html += "</tr><td colspan="+info.colspan+">검색된 내용이 없습니다.</td></tr>";
				$("#qnaTable").append(html);	
			},
			
			/**
			 * 
			 * @name         : setqnaListTable
			 * @description  : qna 테이블을 세팅한다.
			 * @date         : 2018. 07. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data   : 데이터
			 * @param pageSize : 한페이지당 최대 갯수
			 * @param curPage :현재 페이지
			 * @param type : 타입
			 */
			setQnaListTable : function(data, pageSize, curPage) {
				//테이블 생성
				var info = this.getTableHeader();	
				var html = info.header;
				for (var i=0; i<data.length; i++) {
					var no = (parseInt(curPage)*pageSize) + (i-pageSize);
					html +=	"<tr id='sIdx_"+i+"'>";
					html +=		"<td>"+(no+1)+"</td>";
					html +=		"<td class='left'><a href='"+ contextPath +"/view/use/qna/qnaDetailView?post_no="+data[i].post_no+"'>"+data[i].title+"</a></td>";
					html +=		"<td>"+data[i].user_nm+"</td>";
					html +=		"<td>"+data[i].reg_ts+"</td>";
					html +=		"<td>"+data[i].view_cnt+"</td>";
					html +=		"<td>"+data[i].ans_yn+"</td>";
					html +=	"</tr>";
				}
				$("#qnaTable").append(html);	
			}
	};
	
	//AJAX 내용작성
	$qnaView.request = {
			
			/**
			 * 
			 * @name         : doReqqnaList
			 * @description  : qna 정보를 조회한다.
			 * @date         : 2018. 07. 16. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param startIdx : 시작 인덱스
			 */
			doReqQnaList : function(startIdx) {
				var options = $qnaView.ui.setParams(startIdx);
				$ajax.requestApi(contextPath + "/api/use/qna/getQnaList.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							$("#qnaTable").empty();
							
							//log generate by cis
							var log_param = "searchButton";
							log_param += ", Category - " + $("#searchType option:selected").text();
							log_param += ", word - " + $.trim($("#searchText").val());
							
							$log.srvLogWrite("Z0", "06", "02", "02", "", log_param);
							
							if (result.length > 0) {
								var totalPage = Math.ceil( result[0].total / $qnaView.ui.maxCntPerPage);
								$qnaView.ui.qnaListViewPaging(result[0].total, totalPage, $qnaView.ui.maxCntPerPage, result, $qnaView.ui.currentPage);
								$qnaView.ui.setQnaListTable(result, $qnaView.ui.maxCntPerPage, $qnaView.ui.currentPage);
							}else {
								$qnaView.ui.setEmptyListTable();
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
	$qnaView.event = {
			
			setUIEvent : function(){
				
				//검색버튼 이벤트
				$("#btnSearch").on("click", function(e) {
					e.preventDefault();
					$qnaView.ui.currentPage = 1;
					$qnaView.request.doReqQnaList(0);					
				});
				
				//글쓰기 버튼 이벤트
				$("#qnaWriteModeBtn").on("click", function(e) {
					e.preventDefault();
					window.location.href = contextPath + "/view/use/qna/qnaWriteView";
				});
			}
	};
	
}(window,document));