
(function(W,D){
	W.$faqView = W.$faqView || {};
	
	$(document).ready(function(){
		$faqView.event.setUIEvent();
		
		
	});
	
	//UI 내용작성
	$faqView.ui = {
			srtIdx : 0,
			currentPage : 1,
			maxCntPerPage : 5,
			postNo : null,
			
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
				this.maxCntPerPage = 5;
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
				//this.maxCntPerPage = parseInt($("#faqCntSelectBox option:selected").val());
				var searchText = $.trim($("#faqSearchText").val());
				var searchType = $("#faqSearchSelectBox option:selected").val();
				
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
			 * @name         : faqListViewPaging
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
			faqListViewPaging : function(totalCount, totalPage, pageSize, data, pageIndex) {
				$('#faqPage').paging({
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
						$faqView.ui.srtIdx = (page - 1) * pageSize;
						$faqView.ui.currentPage = page;
						$faqView.request.doReqFaqList($faqView.ui.srtIdx);
					}
				});
			},
			
			/**
			 * 
			 * @name         : setFaqListTable
			 * @description  : FAQ 테이블을 세팅한다.
			 * @date         : 2018. 07. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data   : 데이터
			 * @param pageSize : 한페이지당 최대 갯수
			 * @param curPage :현재 페이지
			 * @param type : 타입
			 */
			setFaqListTable : function(data, pageSize, curPage) {
				//테이블 생성
				var html = "";
				for (var i=0; i<data.length; i++) {
					var no = (parseInt(curPage)*pageSize) + (i-pageSize) + 1;
					var content = data[i].content.replace(/(?:\r\n|\r|\n)/g, '<br>');	
					html += "<div class='faq'>";
					html += 		"<div class='faqBox' id='faqBox_"+data[i].post_no+"'>";
					html += 			"<div class='noArea'><span class='no'>"+no+"</span></div>";
					html +=			"<div><span class='title' onclick='$faqView.event.doShowDetailView("+data[i].post_no+");'>"+data[i].title+"</span></div>";
					html += 			"<div class='arrow'><button id='arrowBtn_"+data[i].post_no+"' onclick='$faqView.event.doShowDetailView("+data[i].post_no+");'></button></div>";						
					html += 		"</div>";
					html += 		"<div id='box_"+data[i].post_no+"' class='box'>"+content+"</div>";
					html += "</div>";
				}
				$("#faqTable").append(html);
			}
	};
	
	//AJAX 내용작성
	$faqView.request = {
			
			/**
			 * 
			 * @name         : doReqFaqList
			 * @description  : FAQ 정보를 조회한다.
			 * @date         : 2018. 07. 16. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param startIdx : 시작 인덱스
			 */
			doReqFaqList : function(startIdx) {
				var options = $faqView.ui.setParams(startIdx);
				$ajax.requestApi(contextPath + "/api/use/faq/getFaqList.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							$("#faqTable").empty();
							
							//log generate by cis
							var log_param = "searchButton";
							log_param += ", Category - " + $("#faqSearchSelectBox option:selected").text();
							log_param += ", word - " + $.trim($("#faqSearchText").val());
							
							$log.srvLogWrite("Z0", "06", "03", "02", "", log_param);
							
							if (result.length > 0) {
								var totalPage = Math.ceil( result[0].total / $faqView.ui.maxCntPerPage);
								$faqView.ui.faqListViewPaging(result[0].total, totalPage, $faqView.ui.maxCntPerPage, result, $faqView.ui.currentPage);
								$faqView.ui.setFaqListTable(result, $faqView.ui.maxCntPerPage, $faqView.ui.currentPage);
								
								//메인에서 faq 상세보기 링크로 넘어왔을 경우
								//해당 게시글의 상세정보를 Open한다.
								var post_no = $commonFunc.getUrlParameter("post_no");
								if (post_no != null && post_no != undefined) {
									$faqView.event.doShowDetailView(post_no);
								}
								
							}else {
								$faqView.ui.setEmptyListTable();
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
	$faqView.event = {
			
			setUIEvent : function(){
				
				//검색버튼 이벤트
				$("#faqSearchBtn").on("click", function() {
					$faqView.ui.currentPage = 1;
					$faqView.request.doReqFaqList(0);					
				});
			},
			
			/**
			 * 
			 * @name         : doShowDetailView
			 * @description  : 상세내용 보기 영역을 표출한다.
			 * @date         : 2018. 07. 16. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param no : 게시글 번호
			 */
			doShowDetailView : function(no) {
				var ck = $("#arrowBtn_"+no).hasClass("on");
				if(ck){
					$("#faqBox_"+no).parent().css("height", "90px");
					$("#box_"+no).hide();
					$("#arrowBtn_"+no).css("background","url("+contextPath+"/img/common/btn_down.png)no-repeat center center")
					$("#arrowBtn_"+no).removeClass("on");
				}else{
					$("#faqBox_"+no).parent().css("height", "auto");
					$("#box_"+no).show();
					$("#arrowBtn_"+no).css("background","url("+contextPath+"/img/common/btn_up.png)no-repeat center center")
					$("#arrowBtn_"+no).addClass("on");
				}
			}
	};
	
}(window,document));