
(function(W,D){
	W.$workSet = W.$workSet || {};
	
	$(document).ready(function(){
		$workSet.event.setUIEvent();
		$log.srvLogWrite("Z2", "01", "01", "01", "", "");
	});
	
	//UI 내용작성
	$workSet.ui = {
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
				this.maxCntPerPage = parseInt($("#selectViewCount").val());
				var searchText = $.trim($("#searchText").val());
				var searchType = $("#workSetSearchSelectBox option:selected").val();
				
				var options = {	
					params : {
						startIdx : startIdx,
						selectViewCount : this.maxCntPerPage
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
			workSetListViewPaging : function(totalCount, totalPage, pageSize, data, pageIndex) {
				$(".total").text(pageIndex + " / " + totalPage + " 페이지 총 " + totalCount + "건")
				$('#workSetPage').paging({
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
						$workSet.ui.srtIdx = (page - 1) * pageSize;
						$workSet.ui.currentPage = page;
						$workSet.request.doReqWorkSetList($workSet.ui.srtIdx);
					}
				});
			},
			
			/**
			 * 
			 * @name         : getTableHeader
			 * @description  : 테이블 헤더를 설정한다.
			 * @date         : 2019. 07. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 */
			getTableHeader : function() {
				var html = "";
				var colspan = 4;
				html +=  "<thead><tr>";
				html +=  "<th style='width: 60px;'>번호</th>";
				html +=  "<th>테이블명</th>";
				html +=  "<th>테이블설명</th>";
				html +=  "<th style='width: 120px;'>데이터건수</th>";
				html +=  "</tr></thead>";
				return info = {
						header : html,
						colspan : colspan
				};
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
				var info = this.getTableHeader();
				var html = info.header;
				html += "</tr><td colspan="+info.colspan+">검색된 내용이 없습니다.</td></tr>";
				$("#workSetTable").append(html);	
			},
			
			/**
			 * 
			 * @name         : setworkSetListTable
			 * @description  : 데이터 테이블을 세팅한다.
			 * @date         : 2019. 07. 12. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param data   : 데이터
			 * @param pageSize : 한페이지당 최대 갯수
			 * @param curPage :현재 페이지
			 * @param type : 타입
			 */
			setworkSetListTable : function(data, pageSize, curPage) {
				//테이블 생성
				var info = this.getTableHeader();	
				var html = info.header;
				for (var i=0; i<data.length; i++) {
					var no = (parseInt(curPage)*pageSize) + (i-pageSize);
					html +=	"<tr id='sIdx_"+i+"'>";
					html +=		"<td>"+(no+1)+"</td>";
					html +=		"<td class='left'><a href='" + contextPath + "/api/sysmgt/downloadPG.do?schemaNm=" + data[i].tbl_sch + "&tableNm=" + data[i].table_name + "'>" + data[i].table_name + "</a></td>";//경로
					html +=		"<td>"+data[i].table_comment+"</td>";
					html +=		"<td>"+$commonFunc.appendCommaToNumber(data[i].tbl_cnt)+"</td>";
					html +=	"</tr>";
				}
				$("#workSetTable").append(html);	
			}
	};
	
	//AJAX 내용작성
	$workSet.request = {
			
			/**
			 * 
			 * @name         : doReqWorkSetList
			 * @description  : 데이터 정보를 조회한다.
			 * @date         : 2019. 07. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param startIdx : 시작 인덱스
			 */
			doReqWorkSetList : function(startIdx) {
				var options = $workSet.ui.setParams(startIdx);
				$ajax.requestApi(contextPath + "/api/prjmng/getDataList.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							$("#workSetTable").empty();
							
							//log generate by cis
							var log_param = "searchButton";
							log_param += ", Category - " + $("#workSetSearchSelectBox option:selected").text();
							log_param += ", word - " + $.trim($("#searchText").val());
							
							//$log.srvLogWrite("Z0", "06", "04", "02", "", log_param);
							
							if (result.length > 0) {
								var totalPage = Math.ceil( result[0].total / $workSet.ui.maxCntPerPage);
								$workSet.ui.workSetListViewPaging(result[0].total, totalPage, $workSet.ui.maxCntPerPage, result, $workSet.ui.currentPage);
								$workSet.ui.setworkSetListTable(result, $workSet.ui.maxCntPerPage, $workSet.ui.currentPage);
							}else {
								$workSet.ui.setEmptyListTable();
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
	$workSet.event = {
			
			setUIEvent : function(){
				
				//검색버튼 이벤트
				$("#btnSearch").on("click", function() {
					$workSet.ui.currentPage = 1;
					$log.srvLogWrite("Z2", "01", "01", "02", "", "");
					$workSet.request.doReqWorkSetList(0);					
				});
				
				//갯수조정 이벤트
				$("#workSetCntSelectBox").on("change", function() {
					$workSet.ui.currentPage = 1;
					$workSet.request.doReqWorkSetList(0);					
				});
				
				$("#workSetCntSelectBox").on("change", function() {
					$workSet.ui.currentPage = 1;
					$workSet.request.doReqWorkSetList(0);					
				});
				
				$("#selectViewCount").on("change",function(){
					$workSet.ui.pageNum = 1;
					$workSet.ui.currentPage = 1;
					$workSet.ui.maxCntPerPage = $("#selectViewCount option:selected").val();
					$workSet.request.doReqWorkSetList(0);
				});
				
				//삭제버튼 이벤트
				$("#deleteBtn").on("click", function() {
					var jsonArray = [];
					$('input:checkbox[name="job_seq"]').each(function() {
						if(this.checked){
							var param = {};
							param.job_setup_seq = this.value;
							jsonArray.push(param);
						}
					});		
					
					if (jsonArray != null && jsonArray.length>0) {
						var param = new Object();
						param.jsonStr = JSON.stringify(jsonArray);
						var options = {
								isBeforSend : true,
								method : "POST",
								params : param
							};
						$ajax.requestApi(contextPath + "/api/prjmng/deleteWorkSet.do", options, function(res) {
							switch(parseInt(res.errCd)) {
								case 0:
									$log.srvLogWrite("Z2", "01", "01", "05", "", "");
									location.href="workSet";
									break;
								default:
									$message.open("알림", res.errMsg);
									break;
							}
						});
					}
				});

				
				$workSet.ui.currentPage = 1;
				$workSet.request.doReqWorkSetList(0);	
				
			}
	};
	
}(window,document));