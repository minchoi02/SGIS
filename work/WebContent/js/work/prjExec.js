
(function(W,D){
	W.$prjExec = W.$prjExec || {};
	
	$(document).ready(function(){
		$prjExec.event.setUIEvent();
		$log.srvLogWrite("Z2", "03", "01", "01", "", "");
		$prjExec.ui.currentPage = 1;
		$prjExec.request.doReqprjSetList();
	});
	
	//UI 내용작성
	$prjExec.ui = {
			srtIdx : 0,
			currentPage : 1,
			stateCd : '',
			maxCntPerPage : 3,
			clNm : '',
			prj_master_hst_seq : '',
			searchText : '',
			
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
				this.maxCntPerPage = 3;
			},
			
			get_query : function() { 
				var url = document.location.href; 
				var qs = url.substring(url.indexOf('?') + 1).split('&'); 
				for(var i = 0, result = {}; i < qs.length; i++){ 
					qs[i] = qs[i].split('='); 
					result[qs[i][0]] = decodeURIComponent(qs[i][1]); 
				} 
				return result; 
			},

			/**
			 * 
			 * @name         : setParams
			 * @description  : 파라미터를 설정한다.
			 * @date         : 2019. 08. 6. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param startIdx : 시작인덱스
			 */
			setParams : function(startIdx) {
				var params = $prjExec.ui.get_query();
				
				var page = 1;
				if (params.page !== undefined) page = parseInt(params.page);
				$prjExec.ui.currentPage = page;
				startIdx = (page - 1) * $prjExec.ui.maxCntPerPage
				$prjExec.ui.srtIdx = startIdx;
				
				var searchText = $.trim($("#prjSetSearchText").val());
				var searchType = $("#clNm option:selected").val();
							
				var options = {	
						params : {
							startIdx : startIdx,
							resultCnt : $prjExec.ui.maxCntPerPage
						}
					};
				
				if (params.searchText !== undefined) {
					options.params["searchText"] = params.searchText;
				}
								
				if (searchText !== undefined) {
					options.params["searchText"] = searchText;
				}
				
				if (params.clNm !== undefined) {
					options.params["clNm"] = params.clNm;
				}
								
				if (searchType !== undefined) {
					options.params["clNm"] = searchType;
				}
				
				if (params.stateCd !== undefined) {
					$prjExec.ui.stateCd = params.stateCd;
					options.params["stateCd"] = params.stateCd;
				}
				return options;
			},
			
			/**
			 * 
			 * @name         : boardListViewPaging
			 * @description  : 페이징을 생성한다.
			 * @date         : 2019. 08. 3. 
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
						$prjExec.ui.goUrl($prjExec.ui.stateCd, page, $prjExec.ui.clNm, $prjExec.ui.searchText);
					}
				});
			},
			
			goUrl : function(stateCd, page, clNm, searchText) {
				if (stateCd===undefined) stateCd = '';
				if (page===undefined) page = 1;
				if (clNm===undefined) clNm = '';
				if (searchText===undefined) searchText = '';
				location.href="?stateCd="+stateCd+"&searchText="+searchText+"&clNm="+clNm+"&page="+page;
			},
				
			/**
			 * 
			 * @name         : setEmptyListTable
			 * @description  : 검색정보가 없을 경우 테이블을 설정한다.
			 * @date         : 2019. 08. 6. 
			 * @author	     : 최인섭
			 * @history 	 :
			 */
			setEmptyListTable : function() {
				var html = "";
				html += "</tr><td colspan='2'>검색된 내용이 없습니다.</td></tr>";
				$("#prjSetTable").append(html);	
			},
			
			/**
			 * 
			 * @name         : setprjSetListTable
			 * @description  : 업무설정 테이블을 세팅한다.
			 * @date         : 2019. 08. 3. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param data   : 데이터
			 * @param pageSize : 한페이지당 최대 갯수
			 * @param curPage :현재 페이지
			 * @param type : 타입
			 */
			setprjSetListTable : function(data, pageSize, curPage) {
				//테이블 생성
				var html = "";
				for (var i=0; i<data.length; i++) {
					var no = (parseInt(curPage)*$prjExec.ui.maxCntPerPage) + (i-$prjExec.ui.maxCntPerPage);
					html +=	"<tr id='sIdx_"+i+"'><td class='td-projectnum' style='width:100px;'>" + (no+1) + "</td><td class='tb-projectlist'><div class='projectlist-tit'><div class='text'>";
					if (data[i].schd_type == '단일') {
						html +=	"<em class='label c5'>단일실행</em>";
					}
					html +=	"<strong>";
					html +=	data[i].cl_nm + " : " + data[i].project_nm;
					html +=	"</strong>"; 
					if (!$commonFunc.isEmpty(data[i].start_ts)) {
						html +=	"| <strong>시작일 : "+data[i].start_ts+"</strong>";
					}
					if (!$commonFunc.isEmpty(data[i].end_ts)) {
						html +=	"| <strong>종료일 : "+data[i].end_ts+"</strong>";
					}
					html +=	"<div class='projectlist-util'>";
					if (data[i].project_state_cd == 'running') {
						html +=	"<div class='btn-group line sm'><button type='button' class='stopBtn' prj_master_hst_seq='"+data[i].prj_master_hst_seq+"'>삭제</button></div>";
					} else {
						html +=	"<div class='btn-group line sm'><button type='button' class='delBtn' prj_master_hst_seq='"+data[i].prj_master_hst_seq+"'>삭제</button></div>";
					}
					html +=	"</div></div>";
					html +=	"<div class='projectlist-steps'>";
					
					var job = data[i].unitSet;
					for (var jobi=0;jobi<job.length;jobi++) {
						if ((jobi+1) % 5 == 1) html +=	"<ul>";
						var stsCls = 'c1';
						var jobU = job[jobi];
						if (jobU.job_sts == 'standby') stsCls = 'c1';
						if (jobU.job_sts == 'running' || jobU.job_sts == 'start') stsCls = 'c2';
						if (jobU.job_sts == 'stop') stsCls = 'c3';
						if (jobU.job_sts == 'fail') stsCls = 'c4';
						if (jobU.job_sts == 'success') stsCls = 'c5';
						var jobseq = jobi + 1;
						html +=	"<li>";
						html +=	"<button type='button' class='btnJobDetail "+stsCls+"' prj_master_hst_seq='"+jobU.prj_master_hst_seq+"' job_order='"+jobU.job_order+"'>"+jobseq+"</button> <span>"+jobU.job_nm+"</span>";
						html +=	"</li>";
						if ((jobi+1) % 5 == 0 || (jobi+1) >= job.length) html += "</ul>";
					}
					
					html +=	"</div></td></tr>";
				}
				$("#prjSetTable").append(html);	
			}
	};
	
	//AJAX 내용작성
	$prjExec.request = {
			
			/**
			 * 
			 * @name         : doReqprjSetList
			 * @description  : 업무설정 정보를 조회한다.
			 * @date         : 2019. 08. 6. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param startIdx : 시작 인덱스
			 */
			doReqprjSetList : function(startIdx) {
				
				var options = $prjExec.ui.setParams(startIdx);
				$ajax.requestApi(contextPath + "/api/prjmng/getPrjHstList.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							$("#prjSetTable").empty();
							$(".total").empty();
							//log generate by cis
							var log_param = "searchButton";
							log_param += ", Category - " + $("#prjSetSearchSelectBox option:selected").text();
							log_param += ", word - " + $.trim($("#prjSetSearchText").val());
							
							//$log.srvLogWrite("Z0", "06", "04", "02", "", log_param);
							
							if (result.length > 0) {
								var totalPage = Math.ceil( result[0].total / $prjExec.ui.maxCntPerPage);
								$prjExec.ui.prjSetListViewPaging(result[0].total, totalPage, $prjExec.ui.maxCntPerPage, result, $prjExec.ui.currentPage);
								$prjExec.ui.setprjSetListTable(result, $prjExec.ui.maxCntPerPage, $prjExec.ui.currentPage);
							}else {
								$prjExec.ui.setEmptyListTable();
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
	$prjExec.event = {
			
			setUIEvent : function(){
				
				//검색버튼 이벤트
				$("#prjSetSearchBtn").on("click", function() {
					$prjExec.ui.currentPage = 1;
					$log.srvLogWrite("Z2", "03", "01", "02", "", "");
					$prjExec.request.doReqprjSetList(0);					
				});
				
				//단일/실행중/대기상태 버튼 이벤트
				$(".c3").on("click", function() {
					$(this).css("color","black");
					$prjExec.ui.currentPage = 1;
					$prjExec.ui.stateCd = "";
					$prjExec.ui.goUrl("", 1);					
				});
				
				//단일실행상태 버튼 이벤트
				$(".c4").on("click", function() {
					$(this).css("color","black");
					$prjExec.ui.currentPage = 1;
					$prjExec.ui.goUrl("manual", 1);					
				});
				
				//실행상태 버튼 이벤트
				$(".c7").on("click", function() {
					$(this).css("color","black");
					$prjExec.ui.currentPage = 1;
					$prjExec.ui.goUrl("running", 1);					
				});

				//대기상태 버튼 이벤트
				$(".c10").on("click", function() {
					$(this).css("color","black");
					$prjExec.ui.currentPage = 1;
					$prjExec.ui.goUrl("standby", 1);					
				});

				//정지상태 버튼 이벤트
				$(".c9").on("click", function() {
					$(this).css("color","black");
					$prjExec.ui.currentPage = 1;
					$prjExec.ui.goUrl("stop", 1);					
				});

				//실패상태 버튼 이벤트
				$(".c8").on("click", function() {
					$(this).css("color","black");
					$prjExec.ui.currentPage = 1;
					$prjExec.ui.goUrl("fail", 1);					
				});

				//성공상태 버튼 이벤트
				$(".c6").on("click", function() {
					$(this).css("color","black");
					$prjExec.ui.currentPage = 1;
					$prjExec.ui.goUrl("success", 1);					
				});

				//단위업무보기 버튼 이벤트
				$(document).on("click",".btnJobDetail",function(){
					
					location.href="prjUnitModify?prj_master_hst_seq="+$(this).attr("prj_master_hst_seq")+"&job_order="+$(this).attr("job_order") +
					"&stateCd="+$prjExec.ui.stateCd+"&searchText="+$prjExec.ui.searchText+"&clNm="+$prjExec.ui.clNm+"&page="+$prjExec.ui.currentPage;
				});

				//프로젝트 삭제 버튼 이벤트
				$(document).on("click",".delBtn",function(){
					$prjExec.ui.prj_master_hst_seq = $(this).attr("prj_master_hst_seq");
					$confirmNew.open("확인","프로젝트를 삭제하시겠습니까?");
				});
				
				//프로젝트 정지 버튼 이벤트
				$(document).on("click",".stopBtn",function(){
					$prjExec.ui.prj_master_hst_seq = $(this).attr("prj_master_hst_seq");
					$confirmNew.open("확인","프로젝트를 정지하시겠습니까?");
				});
				
				//프로젝트 삭제 확인 버튼 이벤트
				$(document).on("click","#msgOkBtn",function(){
					var param = new Object();
					param.prj_master_hst_seq = $prjExec.ui.prj_master_hst_seq;
					var options = {
						isBeforSend : true,
						method : "POST",
						params : param
					};
					$ajax.requestApi(contextPath + "/api/prjmng/delPrjExec.do", options,  function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$messageNew.open("알림", "삭제되었습니다.");
								//log generate by cis
								/* var log_param = "ShareBoardNo - " + options.params.share_board_no;
								log_param += ", ReplyNo - " + options.params.reply_no;
								$log.srvLogWrite("Z0", "05", "10", "00", "", log_param); */
								location.href=location.href;
								break;
							default:  
								$messageNew.open("알림", res.errMsg);
								break;
						}
					});
				});
			}
	};
	
}(window,document));