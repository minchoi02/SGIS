(function(W,D){
	W.$aprovMove = W.$aprovMove || {};
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
		var url_string = window.location.href;
		var url = new URL(url_string);
		$aprovMove.ui.grant_yn = url.searchParams.get("grant_yn");
		
		$aprovMove.ui.getDataLst();
		$aprovMove.event.setUIEvent();	
		
		$log.srvLogWrite("Z1", "05", "03", "01", "", "");
	});
	
	$aprovMove.ui = {
			srtIdx : 0,
			currentPage : 1,
			maxCntPerPage : 10,
			searchText : null,
			searchType : null,
			searchPage : 1,
			selectViewCount: 10,
			lastpage: 1,
			grant_yn: null,
			
			/**
			 * 
			 * @name         : viewPaging
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
			viewPaging : function(totalCount, totalPage, pageSize, data, pageIndex) {
				$(".total").text(pageIndex + " / " + totalPage + " 페이지 총 " + totalCount + "건")
				$('.pages').paging({
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
						$aprovMove.ui.srtIdx = (page - 1) * pageSize;
						$aprovMove.ui.currentPage = page;
						$aprovMove.ui.getDataLst();
					}
				});
			},
			
			doDelete : function(){
				postCnt = $("input[name=checkTF]:checked").length
				if (postCnt > 0){
					if (confirm(postCnt + " 개의 게시물을 삭제하시겠습니까?") == true){
						var checkBoxIds = [];
						$("input[name=checkTF]:checked").each(function(){
							var tid = this.id
							checkBoxIds.push(tid.replace("c",""));
						})
						$aprovMove.request.deletePost(checkBoxIds.toString());
					}
				}
			},
			
			getDataLst : function(){
				var options = {
						params : {
							searchPage:$aprovMove.ui.currentPage,
							selectViewCount:$aprovMove.ui.selectViewCount,
							searchText:$aprovMove.ui.searchText,
							grant_yn:$aprovMove.ui.grant_yn
						}
				};
				$aprovMove.request.getDataLst(options);
			}
	};
	$aprovMove.request = {
			deletePost : function(inst_seq){
				$.ajax({
					type : "POST",
					url : contextPath +"/api/sysmgt/deleteAprovMove.do",
					dataType : "json",
					sync : true,
					data : {"inst_seq":inst_seq},
					success: function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$aprovMove.ui.getDataLst();
								break;
							default:
								break;
						}
			        },
			        complete: function() {
			        	$mask.hide();
			        },
			        error: function() {
			        	$messageNew.open("알림", res.errMsg);
			        }
				});
			},
			
			getDataLst : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getAprovMoveLst.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							
							//log generate by cis
							var log_param = "searchButton";
							log_param += ", Category - " + $("#prjSetSearchSelectBox option:selected").text();
							log_param += ", word - " + $.trim($("#prjSetSearchText").val());
							//$log.srvLogWrite("Z0", "06", "04", "02", "", log_param);
							
							if (result.length > 0) {
								var totalPage = Math.ceil( result[0].total / $aprovMove.ui.selectViewCount);
								$aprovMove.ui.viewPaging(result[0].total, totalPage, $aprovMove.ui.maxCntPerPage, result, $aprovMove.ui.currentPage);
								var html = "";
								for(var i=0; i < result.length;i++){
									html = html + '<tr><td class="postnumber">'+result[i].row+'</td>';
									html = html + '<td class="title left">';
									html = html + '<a class="notice-title" href="' + contextPath + '/view/sysmgt/aprovMoveEdit?req_seq='+result[i].req_seq+'">'+result[i].user_id+'</a></td>';
									html = html + '<td>'+result[i].req_dt+'</td>';
									html = html + '<td>'+result[i].grant_user+'</td>';
									if (result[i].grant_yn=="Y") {
										html = html + '<td><span class="label c1">승인</span></td>';
									} else if (result[i].grant_yn=="N") {
										html = html + '<td><span class="label c3">반려</span></td>';
									} else {
										html = html + '<td><span class="label c2">요청</span></td>';
									}
									html = html + '</tr>'; 
								}
								$("#dataTbl > tbody").empty().append(html);
							}else {
								var html = '<tr><td colspan="5">데이터가 없습니다.</td></tr>'; 
								$("#dataTbl > tbody").empty().append(html); 								
								$(".paging").empty();
							}

							break;
						default:
							$messageNew.open("알림", res.errMsg);
							break;
					}
					
				})
		}
	};
	$aprovMove.event = {
			setUIEvent : function(){
				$("#btnSearch").off().on("click",function(){
					$aprovMove.ui.searchText = $("#searchText").val();
					$aprovMove.ui.currentPage = 1;
					$log.srvLogWrite("Z1", "05", "03", "02", "", "");
					$aprovMove.ui.getDataLst();
				});
				
				$("#btnAdd").off().on("click",function(){
					location.href="aprovMoveEdit";
				});
				
				$("#selectViewCount").on("change",function(){
					$aprovMove.ui.currentPage = 1;
					$aprovMove.ui.selectViewCount = $("#selectViewCount option:selected").val();
					$aprovMove.ui.getDataLst();
				});
			}
	};
}(window,document));