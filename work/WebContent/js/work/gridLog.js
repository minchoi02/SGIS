(function(W,D){
	W.$gridLog = W.$gridLog || {};
	
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
			var url_string = window.location.href;
			var url = new URL(url_string);
			var selectType = url.searchParams.get("selectType");
			if (selectType == null) selectType = "none";
			if (selectType == "") selectType = "none";
			$("#selectType").val(selectType)
		});
		$gridLog.event.setUIEvent();
	});
	
	//UI 내용 작성
	$gridLog.ui = {
			start : 0,
			currentPage : 1,
			maxCntPerPage : 10,
			lastpage : null,
			infoType : '',
			
			//화면 초기화
			initView : function(){
				this.start = 0;
				this.currentPage = 1;
				this.maxCntPerPage = 10;
			},
			
			//파라미터 설정
			setParams : function(start){
				var url_string = window.location.href;
				var url = new URL(url_string);
								
				var options = {
					params : {
						start : start,
						infoType : url.searchParams.get("infoType"),
						selectType : url.searchParams.get("selectType"),
						resultCnt : this.maxCntPerPage
					}
				};
				return options;
			
			},
			
			// 페이징 생성
			gridLogPaging : function(totalCount, totalPage, pageSize, data, pageIndex) {
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
						$gridLog.ui.start = (page - 1) * pageSize;
						$gridLog.ui.currentPage = page;
						$gridLog.request.doReqgridLogList($gridLog.ui.start);
					}
				});
			},
				
			// 검색정보가 없을 경우
			setEmptyListTable : function() {
				var html = "</tr><td colspan='6'>검색된 내용이 없습니다.</td></tr>";
				$("#gridLog > tbody").empty();
			},
			
			
			setListTable : function(data, pageSize, curPage) {
				// 테이블 생성하기
				var html = "";
				for(var i = 0; i < data.length; i++){
					var no = (parseInt(curPage) * pageSize) + (i - pageSize) + 1;
					//base_year, info_type, file_name, file_line, create_dt
					html +=	"<tr id='sIdx_"+i+"'>";
					html +=		"<td>" + no + "</td>"; //이력 시퀀스
					html +=     "<td>" + data[i].file_name + "</td>"; //file_name
					html +=     "<td>" + data[i].base_year + "</td>"; //기준년도
					html +=     "<td>" + data[i].info_type + "</td>"; //info_type					
					html +=     "<td>" + data[i].file_line + "</td>"; //라인수
					html +=     "<td>" + data[i].create_dt + "</td>"; //생성일
					html +=	"</tr>";
				}
				$("#gridLog > tbody").empty();
				$("#gridLog > tbody:last").append(html);
			},
			
			goUrl : function(selectType, infoType, page) {
				if (selectType===undefined) selectType = '';
				if (infoType===undefined) infoType = '';
				if (page===undefined) page = 1;
				location.href="?selectType="+selectType+"&infoType="+infoType + "&page="+page;
			},
			
			download : function() {
				var url_string = window.location.href;
				var url = new URL(url_string);
				var selectType = url.searchParams.get("selectType");
				var infoType = url.searchParams.get("infoType");
				location.href=contextPath + "/api/prjmng/gridLogDownload.do?selectType="+selectType+"&infoType="+infoType;
			}
	};
	
	//AJAX 내용 작성
	$gridLog.request = {
			doReqgridLogList : function(start){				
				var options = $gridLog.ui.setParams(start);				

				$ajax.requestApi(contextPath + "/api/prjmng/getGridLogList.do", options, function(res){					
					switch(parseInt(res.errCd)){
						case 0:
							var result = res.result;
							$("#gridLog > tbody").empty();							
							if (result.length > 0){
								var totalpage = Math.ceil(result[0].total / $gridLog.ui.maxCntPerPage);
								$gridLog.ui.gridLogPaging(result[0].total, totalpage, $gridLog.ui.maxCntPerPage, result, $gridLog.ui.currentPage);
								$gridLog.ui.setListTable(result, $gridLog.ui.maxCntPerPage, $gridLog.ui.currentPage);
							} else {
								$gridLog.ui.setEmptyListTable();
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
	$gridLog.event = {
			setUIEvent : function(){
				$gridLog.ui.currentPage = 1;
				
				//bsca/참값/동부 이벤트
				$("#selectType").on("change", function() {
					$(this).css("color","black");
					$gridLog.ui.currentPage = 1;
					$gridLog.ui.stateCd = "";
					$gridLog.ui.goUrl($("#selectType option:selected").val(),"", 1);
				});
				
				//인구 이벤트
				$(".c3").on("click", function() {
					$(this).css("color","black");
					$gridLog.ui.currentPage = 1;
					$gridLog.ui.stateCd = "";
					$gridLog.ui.goUrl($("#selectType").val(),"person", 1);					
				});
				
				//가구 이벤트
				$(".c4").on("click", function() {
					$(this).css("color","black");
					$gridLog.ui.currentPage = 1;
					$gridLog.ui.goUrl($("#selectType").val(),"family", 1);					
				});
				
				//주택 이벤트
				$(".c7").on("click", function() {
					$(this).css("color","black");
					$gridLog.ui.currentPage = 1;
					$gridLog.ui.goUrl($("#selectType").val(),"house", 1);					
				});

				//사업체 버튼 이벤트
				$(".c8").on("click", function() {
					$(this).css("color","black");
					$gridLog.ui.currentPage = 1;
					$gridLog.ui.goUrl($("#selectType").val(),"comp", 1);					
				});

				//중사자 버튼 이벤트
				$(".c5").on("click", function() {
					$(this).css("color","black");
					$gridLog.ui.currentPage = 1;
					$gridLog.ui.goUrl($("#selectType").val(),"emp", 1);					
				});
				
				//다운로드 버튼 이벤트
				$(".c6").on("click", function() {
					$(this).css("color","black");
					$gridLog.ui.currentPage = 1;
					$gridLog.ui.download();
				});
			}
	};
}(window, document));

