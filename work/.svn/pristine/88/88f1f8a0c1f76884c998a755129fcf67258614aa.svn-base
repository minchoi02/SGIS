(function(W,D){
	W.$collectKosis = W.$collectKosis || {};
	//dialog 대화상자 실행
	$(document).ready(function(){
		$(function(){
			$(".dialog").dialog({
				autoOpen: false,
				width: 'auto',
				height: 'auto',
				modal: true,
				resizable: false,
				minimizable: false,
				minimizaIcon: 'ui-icon-minus'
			});
		});
		$collectKosis.event.setUIEvent();
	});
	//UI 내용 작성
	$collectKosis.ui ={
			start : 0,
			currentPage : 1,
			maxCntPerPage : 10,
			yearPage : 2018,
			
			//화면 초기화
			initView : function(){
				this.start = 0;
				this.currentPage = 1;
				this.maxCntPerPage = 10;
				this.yaerPage = 2018;
			},

			//날짜 옵션 설정
			setDateBox : function(){

				//올해 기준으로 -20년부터 +1년을 합쳐준다
				var dt = new Date();
				var com_year = dt.getFullYear();
				var years = "";
				
				$("#YEAR").append("<option value='"+ 0 + "'>" + "Total" + "</option>");
				
				for(var i = 2000; i <= (com_year); i++){
					years += $("#YEAR").append("<option value='" + i +"'>" + i + " 년" + "</option>");
				}
				$("#YEAR").append(years);
			},
			//파라미터 설정
			setParams : function(start){
				//select 옵션 '보기'
				this.maxCntPerPage = parseInt($("#selectViewCount").val());
				var searchType = $("#collectKosisSelectBox option:selected").val();
				var searchYEAR = $("#YEAR").val();
				
				var options = {
					params : {
						start : start,
						YEAR : searchYEAR,
						selectViewCount : this.maxCntPerPage,
					}
				};
				options.params['type'] = searchType;
				return options;
			},
			
			// 검색정보가 없을 경우
			setEmptyListTable : function() {
				var html = "</tr><td colspan='7'>검색된 내용이 없습니다.</td></tr>";
				$("#kosisTable > tbody").empty();
			},
			
			// 페이징 생성
			collectKosisPaging : function(totalCount, totalPage, pageSize, data, PageIndex){
				$(".total_cnt").text(PageIndex + " / " + totalPage + " 페이지 총" + totalCount + " 건")
				$('#kosisPage').paging({
					current : PageIndex,
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
						$collectKosis.ui.start = (page - 1) * pageSize;
						$collectKosis.ui.currentPage = page;
						$collectKosis.request.doReqcollectKosis($collectKosis.ui.start);
					}
				});
			},
			
			// kosis_compare 테이블 생성하기
			setKosisTable : function(data, pageSize, curPage){
				var html = "";
				for(var i = 0; i < data.length; i++){
					var no = (parseInt(curPage) * pageSize) + (i - pageSize) + 1;
					html += "<tr id='sIdx_"+i+"'>";
					//시퀀스
					html +=     "<td>" + no + "</td>";
					//년도
					html +=     "<td>" + data[i].base_year + "</td>";
					//구분
					html +=     "<td>" + data[i].div + "</td>";
					//항목
					html +=     "<td class='left'><a href='" + contextPath + "/view/collectData/collectKosisDetail?seq="+ data[i].seq+"'>"+data[i].item+"</a></td>";
					//등록날짜
					html +=     "<td>" + data[i].reg_ts + "</td>";
					html += "</tr>";
				}
				$("#kosisTable > tbody").empty();
				$("#kosisTable > tbody:last").append(html);
			}
	};
	
	//AJAX 내용 작성
	$collectKosis.request = {
			//kosis 이력보고 현황 조회
			doReqcollectKosis : function(start){
				
				var options = $collectKosis.ui.setParams(start);
				$ajax.requestApi(contextPath + "/api/collect/getCollectKosis.do", options, function(res){
					
					switch(parseInt(res.errCd)){
						case 0:
							var result = res.collectKosis;
							$("#kosisTable > tbody").empty();
							
							
							if (result.length > 0){
								var totalpage = Math.ceil(result[0].total / $collectKosis.ui.maxCntPerPage);
								$collectKosis.ui.collectKosisPaging(result[0].total, totalpage, $collectKosis.ui.maxCntPerPage, result, $collectKosis.ui.currentPage);
								$collectKosis.ui.setKosisTable(result, $collectKosis.ui.maxCntPerPage, $collectKosis.ui.currentPage);
							}
							else {
								$collectKosis.ui.setEmptyListTable();
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
	$collectKosis.event = {
			setUIEvent : function(){
				
				//갯수조정 이벤트
				$("#collectKosisSelectBox").on("change", function(){
					$collectKosis.ui.currentPage = 1;
					$collectKosis.request.doReqcollectKosis(0);
					
				});
				$("#selectViewCount").on("change", function(){
					$collectKosis.ui.pageNum = 1;
					$collectKosis.ui.currentPage = 1;
					$collectKosis.ui.maxCntPerPage = $("#selectViewCount option:selected").val();
					$collectKosis.request.doReqcollectKosis(0);
				});
				
				
				//날짜 조정 이벤트
				$("#collectKosisSelectBoxYear").on("change", function(){
					$collectKosis.ui.currentPage = 1;
					$collectKosis.request.doReqcollectKosis(0);
				});
				$("#YEAR").on("change", function(){
					$collectKosis.ui.pageNum = 1;
					$collectKosis.ui.currentPage = 1;
					$collectKosis.ui.yaerPage = $("#YEAR option:selected").val();
					$collectKosis.request.doReqcollectKosis(0);
				});
				$collectKosis.ui.currentPage = 1;
				$collectKosis.ui.yaerPage = 2018;
				$collectKosis.ui.setDateBox();
				$collectKosis.request.doReqcollectKosis(0);
			
			}
	};
}(window, document));