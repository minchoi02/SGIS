
(function(W,D){
	W.$prjSet = W.$prjSet || {};
	
	$(document).ready(function(){
		$prjSet.event.setUIEvent();
		$log.srvLogWrite("Z2", "02", "01", "01", "", "");
	});
	
	//UI 내용작성
	$prjSet.ui = {
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
				this.maxCntPerPage = parseInt($("#selectViewCount option:selected").val());
				var searchText = $.trim($("#prjSetSearchText").val());
				var searchType = $("#prjSetSearchSelectBox option:selected").val();
				
				var options = {	
					params : {
						startIdx : startIdx,
						resultCnt : this.maxCntPerPage
					}
				};
				
				if (searchText.length > 0) {
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
			prjSetListViewPaging : function(totalCount, totalPage, pageSize, data, pageIndex) {
				$(".total").text(pageIndex + " / " + totalPage + " 페이지 총 " + totalCount + "건")
				$('#prjSetPage').paging({
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
						$prjSet.ui.srtIdx = (page - 1) * pageSize;
						$prjSet.ui.currentPage = page;
						$prjSet.request.doReqprjSetList($prjSet.ui.srtIdx);
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
				var colspan = 5;
				html +=  "<thead><tr>";
				html +=  "<th style='width: 60px;'>선택</th>";
				html +=  "<th style='width: 60px;'>번호</th>";
				html +=  "<th>프로젝트명</th>";
				html +=  "<th style='width: 170px;'>분류명</th>";
				html +=  "<th style='width: 100px;'>최종 수정일</th>";
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
				html += "<tr><td colspan="+info.colspan+">검색된 내용이 없습니다.</td></tr>";
				$("#prjSetTable").append(html);	
			},
			
			/**
			 * 
			 * @name         : setprjSetListTable
			 * @description  : 업무설정 테이블을 세팅한다.
			 * @date         : 2019. 07. 12. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param data   : 데이터
			 * @param pageSize : 한페이지당 최대 갯수
			 * @param curPage :현재 페이지
			 * @param type : 타입
			 */
			setprjSetListTable : function(data, pageSize, curPage) {
				//테이블 생성
				var info = this.getTableHeader();	
				var html = info.header;
				for (var i=0; i<data.length; i++) {
					var no = (parseInt(curPage)*pageSize) + (i-pageSize);
					html +=	"<tr id='sIdx_"+i+"'>";
					html +=		"<td><span class='checkbox solo'><input type='checkbox' name='project_id' id='c" + i +"' value='"+data[i].project_id+"'><label for='c" + i +"'>&nbsp;</label></span></td>";
					html +=		"<td>"+(no+1)+"</td>";
					html +=		"<td class='left'><a href='"+ contextPath +"/view/prjMng/prjSetDetail?project_id="+data[i].project_id+"'>"+data[i].project_nm+"</a></td>";
					html +=		"<td>"+data[i].cl_nm+"</td>";
					html +=		"<td>"+data[i].reg_ts+"</td>";
					html +=	"</tr>";
				}
				$("#prjSetTable").append(html);	
			}
	};
	
	//AJAX 내용작성
	$prjSet.request = {
			
			/**
			 * 
			 * @name         : doReqprjSetList
			 * @description  : 업무설정 정보를 조회한다.
			 * @date         : 2019. 07. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param startIdx : 시작 인덱스
			 */
			doReqprjSetList : function(startIdx) {
				var options = $prjSet.ui.setParams(startIdx);
				$ajax.requestApi(contextPath + "/api/prjmng/getPrjSetList.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							$("#prjSetTable").empty();
							
							//log generate by cis
							var log_param = "searchButton";
							log_param += ", Category - " + $("#prjSetSearchSelectBox option:selected").text();
							log_param += ", word - " + $.trim($("#prjSetSearchText").val());
							
							//$log.srvLogWrite("Z0", "06", "04", "02", "", log_param);
							
							if (result.length > 0) {
								var totalPage = Math.ceil( result[0].total / $prjSet.ui.maxCntPerPage);
								$prjSet.ui.prjSetListViewPaging(result[0].total, totalPage, $prjSet.ui.maxCntPerPage, result, $prjSet.ui.currentPage);
								$prjSet.ui.setprjSetListTable(result, $prjSet.ui.maxCntPerPage, $prjSet.ui.currentPage);
							}else {
								$prjSet.ui.setEmptyListTable();
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
	$prjSet.event = {
			
			setUIEvent : function(){
				
				//검색버튼 이벤트
				$("#prjSetSearchBtn").on("click", function() {
					$prjSet.ui.currentPage = 1;
					$log.srvLogWrite("Z2", "02", "01", "02", "", "");
					$prjSet.request.doReqprjSetList(0);					
				});
				
				//갯수조정 이벤트
				$("#selectViewCount").on("change", function() {
					$prjSet.ui.currentPage = 1;
					$prjSet.request.doReqprjSetList(0);					
				});
				
				$("#selectViewCount").on("change", function() {
					$prjSet.ui.currentPage = 1;
					$prjSet.request.doReqprjSetList(0);					
				});
				
				//삭제버튼 이벤트
				$("#deleteBtn").on("click", function() {
					var jsonArray = [];
					$('input:checkbox[name="project_id"]').each(function() {
						if(this.checked){
							var param = {};
							param.project_id = this.value;
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
						$ajax.requestApi(contextPath + "/api/prjmng/deletePrjSet.do", options, function(res) {
							switch(parseInt(res.errCd)) {
								case 0:
									$log.srvLogWrite("Z2", "02", "01", "04", "", "");
									location.href="prjSet";
									break;
								default:
									$message.open("알림", res.errMsg);
									break;
							}
						});
					}
				});

				
				$prjSet.ui.currentPage = 1;
				$prjSet.request.doReqprjSetList(0);	
				
			}
	};
	
}(window,document));