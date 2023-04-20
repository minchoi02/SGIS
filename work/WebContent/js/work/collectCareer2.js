(function(W,D){
	W.$collectCareer2 = W.$collectCareer2 || {};
	
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
		$collectCareer2.event.setUIEvent();
	});
	
	//UI 내용 작성
	$collectCareer2.ui = {
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
			collectCareerPaging : function(totalCount, totalPage, pageSize, data, pageIndex) {
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
						$collectCareer2.ui.start = (page - 1) * pageSize;
						$collectCareer2.ui.currentPage = page;
						$collectCareer2.request.doReqcollectCareerList($collectCareer2.ui.start);
					}
				});
			},
			
			// 검색정보가 없을 경우
			setEmptyListTable : function() {
				var html = "</tr><td colspan='7'>검색된 내용이 없습니다.</td></tr>";
				$("#collectCareer2 > tbody").empty();
			},
			
			
			// 품질점검 현황 테이블 생성하기   res.collectCareer
			setCareerListTable : function(data, pageSize, curPage) {
				// 테이블 생성하기
				var html = "";
				for(var i = 0; i < data.length; i++){
					var no = (parseInt(curPage) * pageSize) + (i - pageSize) + 1;
					var dnArr = data[i].path.split(".");
					
					html +=	"<tr id='sIdx_"+i+"'>";
					html +=		"<td><span class='checkbox solo'><input type='checkbox' name='hist_seq' id='c_" + data[i].hist_seq +"' value='"+data[i].hist_seq+"'><label for='c_" + data[i].hist_seq +"'>&nbsp;</label></span></td>";
					//체크박스
					html +=		"<td>" + no + "</td>"; //이력 시퀀스
					html +=     "<td>" + data[i].create_dt + "</td>"; //생성일
					html +=     "<td>" + $commonFunc.appendCommaToNumber(data[i].cnt) + "</td>"; //갯수
					html +=		"<td><a href='" + contextPath + "/api/sysmgt/downloadPG.do?schemaNm=" + dnArr[0] + "&tableNm=" + dnArr[1] + "'>" + dnArr[1] + "</a></td>";//경로
					html +=	"</tr>";
				}
				$("#collectCareer2 > tbody").empty();
				$("#collectCareer2 > tbody:last").append(html);
			}
	};
	//AJAX 내용 작성
	$collectCareer2.request = {
			//품질 검사 현황 정보 조회
			doReqcollectCareerList : function(start){
				
				var options = $collectCareer2.ui.setParams(start);
				$ajax.requestApi(contextPath + "/api/collect/getCollectCareerList2.do", options, function(res){
					
					switch(parseInt(res.errCd)){
						case 0:
							var result = res.collectCareer2;
							$("#collectCareer2 > tbody").empty();
							
							if (result.length > 0){
								var totalpage = Math.ceil(result[0].total / $collectCareer2.ui.maxCntPerPage);
								$collectCareer2.ui.collectCareerPaging(result[0].total, totalpage, $collectCareer2.ui.maxCntPerPage, result, $collectCareer2.ui.currentPage);
								$collectCareer2.ui.setCareerListTable(result, $collectCareer2.ui.maxCntPerPage, $collectCareer2.ui.currentPage);
							}
							else {
								$collectCareer2.ui.setEmptyListTable();		
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
	$collectCareer2.event = {
			setUIEvent : function(){

				//삭제 이벤트
				$("#deleteBtn").on("click", function(){
					$confirmNew.open("확인", "해당 데이터들을 삭제하시겠습니까?");
				});
				
				//삭제 확인 후 처리
				$(document).on("click","#msgOkBtn", function(){
					//#msgOkBtn 버튼의 경우, 
					// collectCarrer.jsp 에서 header 부분에
					// 테그 라이브러리 <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
					// 추가해야지만 사용이 가능하다
					postCnt = $("input[name=hist_seq]:checked").length
					if(postCnt > 0){
						var checkBoxIds = [];
						$("input[name=hist_seq]:checked").each(function(){
							var tid = $(this).val();
							checkBoxIds.push(tid);
						})
					
						var options = {};
						var params = {};
						params.hist_seq = checkBoxIds.join(",");
						options.params = params;
					
						$ajax.requestApi(contextPath + "/api/collect/deleteCollectCareer2.do", options, function(res){
							switch(parseInt(res.errCd)){
								case 0:
									$messageNew.open("알림", "삭제되었습니다");
									window.location.href = contextPath+"/view/collectData/collectCareer2";
									break;
								default:
									$messageNew.open("알림", res.errMsg);
									break;
							}
						})
					}
				});

				$collectCareer2.ui.currentPage = 1;

				}

	};	
}(window, document));
