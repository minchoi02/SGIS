/**
 * 
 * @JSName: WorkRoadStatsItemManage.js
 * @Description: 일자리 통계항목 관리 JS
 * 
 * @author: 한광희
 * @date: 2019.07.31
 * @version V1.0
 * 
 */

(function(W, D){
	var SEARCH_TYPE = $('#SEARCH_TYPE').val();
	W.$WorkRoadStatsItemManage = W.$WorkRoadStatsItemManage || {};
	var id_datagrid = '#searchResultTable';
	$(document).ready(function() {
		
		srvLogWrite("L0", "04", "03", "01", "", "");
		
		//엑셀다운로드
		$('#excelButton').click(function(){
			location.href = contextPath +"/ServiceAPI/DT/WorkRoadStatsItemManage/excelWorkRoadStatsItemManage.excel";
		});
		
		$('#delButton').click(function(){
			srvLogWrite("L0", "04", "03", "03", "", "");
			var row = $(id_datagrid).datagrid('getChecked');
			console.log(row);
			if (row == null || row.length == 0) {
				getConfirmPopup('알림', '선택된 데이터가 없습니다. 다시 선택해 주세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			} else if (row.length >= 1) {
				getConfirmPopup('확인', '선택된 항목이 삭제됩니다. 실행하시겠습니까?', 'confirm');
				$('#ok_confirmPopup').click(function(){
					var relWordList = new Array();
					for(var i = 0; i < row.length; i++){
						relWordList[i] = encodeURIComponent(row[i].LINK_ID);
					}
					console.log("relWordList",relWordList);
					console.log("row",row);
					$WorkRoadStatsItemManage.delData(relWordList);
					confirmPopupRemove();
				});
				$('#cancel_confirmPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			}
		});

		$('#newButton').click(function(){
			srvLogWrite("L0", "04", "03", "02", "", "");
			location.href = './../DT/WorkRoadStatsItemManageAdd.html';
		});

		$('#searchButton').click(function(){
			srvLogWrite("L0", "04", "03", "01", "", "");
			var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');
			var SEARCH_TYPE = $('#SEARCH_TYPE').val();
			if(SEARCH_WORD.length>=2){
				$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD, SEARCH_TYPE));	
			}else if(SEARCH_WORD.length == 0){
				$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD, SEARCH_TYPE));	
			}
			


		});
		$(document).keydown(function(event){
			if(event.which == 13){
				if($('#confirmPopup').css('display') == 'block' || $('.popupWrapper').css('display') == 'block'){
					return false;
				} else{
					$('#searchButton').click();
					return false;
				}
			}
		});
		$(id_datagrid).datagrid({

			loadMsg: '처리중 입니다, 기다리 십시요...',
			pagination: true,
			nowrap: false,
			checkOnSelect: false,
			columns:[[ 
			          {field:'checkbox',checkbox: true},
			          {field:'STAT_NM',title:'통계명',align:'left',width:150,
			        	  formatter: function(value,row,index){
			        		  var LINK_ID = encodeURIComponent((row.LINK_ID));
			        		  var STAT_NM = encodeURIComponent((row.STAT_NM));
			        		  var STAT_DEFINITION = encodeURIComponent((row.STAT_DEFINITION));
			        		  var STAT_EXP = encodeURIComponent((row.STAT_EXP));
			        		  var COLCT_SOURCE = encodeURIComponent((row.COLCT_SOURCE));
			        		  var UPDT_CYCLE = encodeURIComponent((row.UPDT_CYCLE));
			        		  var STAT_PATH = encodeURIComponent((row.STAT_PATH));
			        		  var REFRN_URL = encodeURIComponent((row.REFRN_URL));
			        		  
			        		  if(value != null && value != ''){
			        			  value ="<a href='./WorkRoadStatsItemManageDetail.html?LINK_ID="+ LINK_ID + "&STAT_NM=" + STAT_NM + "&STAT_DEFINITION=" + STAT_DEFINITION +
			        			  "&STAT_EXP=" + STAT_EXP + "&COLCT_SOURCE=" + COLCT_SOURCE + "&UPDT_CYCLE=" + UPDT_CYCLE + "&STAT_PATH=" + STAT_PATH + "&REFRN_URL=" + REFRN_URL
			        			  +"' style='color:#4a4a4a;' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value;
			        			  value += "</a>";
			        		  }

			        		  return value;
			        	  }
			          },
			          {field:'LINK_ID',title: '연계ID',align:'left',width:50,
			        	  formatter: function(value,row,index){
			        		  var LINK_ID = encodeURIComponent((row.LINK_ID));
			        		  var STAT_NM = encodeURIComponent((row.STAT_NM));
			        		  var STAT_DEFINITION = encodeURIComponent((row.STAT_DEFINITION));
			        		  var STAT_EXP = encodeURIComponent((row.STAT_EXP));
			        		  var COLCT_SOURCE = encodeURIComponent((row.COLCT_SOURCE));
			        		  var UPDT_CYCLE = encodeURIComponent((row.UPDT_CYCLE));
			        		  var STAT_PATH = encodeURIComponent((row.STAT_PATH));
			        		  var REFRN_URL = encodeURIComponent((row.REFRN_URL));
			        		  
			        		  if(value != null && value != ''){
			        			  value ="<a href='./WorkRoadStatsItemManageDetail.html?LINK_ID="+ LINK_ID + "&STAT_NM=" + STAT_NM + "&STAT_DEFINITION=" + STAT_DEFINITION +
			        			  "&STAT_EXP=" + STAT_EXP + "&COLCT_SOURCE=" + COLCT_SOURCE + "&UPDT_CYCLE=" + UPDT_CYCLE + "&STAT_PATH=" + STAT_PATH + "&REFRN_URL=" + REFRN_URL
			        			  +"' style='color:#4a4a4a;' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value;
			        			  value += "</a>";
			        		  }

			        		  return value;
			        	  }
			          },
			          {field:'STAT_DEFINITION',title:'통계정의',align:'left',width:217,
			        	  formatter: function(value,row,index){
			        		  var LINK_ID = encodeURIComponent((row.LINK_ID));
			        		  var STAT_NM = encodeURIComponent((row.STAT_NM));
			        		  var STAT_DEFINITION = encodeURIComponent((row.STAT_DEFINITION));
			        		  var STAT_EXP = encodeURIComponent((row.STAT_EXP));
			        		  var COLCT_SOURCE = encodeURIComponent((row.COLCT_SOURCE));
			        		  var UPDT_CYCLE = encodeURIComponent((row.UPDT_CYCLE));
			        		  var STAT_PATH = encodeURIComponent((row.STAT_PATH));
			        		  var REFRN_URL = encodeURIComponent((row.REFRN_URL));
			        		  
			        		  if(value != null && value != ''){
			        			  value ="<a href='./WorkRoadStatsItemManageDetail.html?LINK_ID="+ LINK_ID + "&STAT_NM=" + STAT_NM + "&STAT_DEFINITION=" + STAT_DEFINITION +
			        			  "&STAT_EXP=" + STAT_EXP + "&COLCT_SOURCE=" + COLCT_SOURCE + "&UPDT_CYCLE=" + UPDT_CYCLE + "&STAT_PATH=" + STAT_PATH + "&REFRN_URL=" + REFRN_URL
			        			  +"' style='color:#4a4a4a;' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value;
			        			  value += "</a>";
			        		  }

			        		  return value;
			        	  }
			          },
			          {field:'STAT_EXP',title:'통계설명',align:'left',width:300,
			        	  formatter: function(value,row,index){
			        		  var LINK_ID = encodeURIComponent((row.LINK_ID));
			        		  var STAT_NM = encodeURIComponent((row.STAT_NM));
			        		  var STAT_DEFINITION = encodeURIComponent((row.STAT_DEFINITION));
			        		  var STAT_EXP = encodeURIComponent((row.STAT_EXP));
			        		  var COLCT_SOURCE = encodeURIComponent((row.COLCT_SOURCE));
			        		  var UPDT_CYCLE = encodeURIComponent((row.UPDT_CYCLE));
			        		  var STAT_PATH = encodeURIComponent((row.STAT_PATH));
			        		  var REFRN_URL = encodeURIComponent((row.REFRN_URL));
			        		  
			        		  var text = (""+value).replace(/&lt;/g, "<");
			        		  text = text.replace(/&gt;/g, ">");
			        		  text = text.replace(/<br\s*[\/]?>/gi, "\n");
			        		  
			        		  if(value != null && value != ''){
			        			  value ="<a href='./WorkRoadStatsItemManageDetail.html?LINK_ID="+ LINK_ID + "&STAT_NM=" + STAT_NM + "&STAT_DEFINITION=" + STAT_DEFINITION +
			        			  "&STAT_EXP=" + STAT_EXP + "&COLCT_SOURCE=" + COLCT_SOURCE + "&UPDT_CYCLE=" + UPDT_CYCLE + "&STAT_PATH=" + STAT_PATH + "&REFRN_URL=" + REFRN_URL
			        			  +"' style='color:#4a4a4a;' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ text;
			        			  value += "</a>";
			        		  }

			        		  return value;
			        	  }
			          }

			          ]],
			          onLoadError: function(){
			        	  getConfirmPopup('알림', '일시적인 오류로 검색에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
			        	  $('#ok_alertPopup').click(function(){
			        		  confirmPopupRemove();
			        	  });
			        	  $('#close_confirmPopup').click(function(){
			        		  confirmPopupRemove();
			        	  });
			          },
			          onClickRow: function(rowIndex, rowData){
			        	  srvLogWrite("L0", "04", "03", "04", "", "");
			        	  $(id_datagrid).datagrid('unselectAll');
			        	  $(id_datagrid).datagrid('selectRow', rowIndex);
			          },
			          onCheck: function(rowIndex, rowData){
			        	  $(id_datagrid).datagrid('unselectAll');
			        	  var checkedRows = $(id_datagrid).datagrid('getChecked');
			        	  for(var i = 0; i < checkedRows.length; i++){
			        		  var rowIndex = $(id_datagrid).datagrid('getRowIndex', checkedRows[i]);
			        		  $(id_datagrid).datagrid('selectRow', rowIndex);
			        	  }
			          },
			          onLoadSuccess: function(data){
			        	  var total = data.total;
			        	  var pageSize = $(page).pagination('options').pageSize;
			        	  
			        	  console.log($(page).pagination('options').pageSize);
			        	  
			        	  if(total < 1){
			        		  $('#noSearchResult').show();
			        		  $(page).pagination({ 
			        			  pageSize: 10,
			        			  displayMsg: '',
			        			  showPageList: false,
			        			  showRefresh: false,
			        			  layout: [],
			        			  links: 5
			        		  });
			        	  } else{
			        		  $('#noSearchResult').hide();
			        		  
			        		  console.log(Math.ceil(total / pageSize));
			        		  
			        		  if(Math.ceil(total / pageSize) > 5){
			        			  $(page).pagination({ 
			        				  pageSize: 10,
			        				  displayMsg: '',
			        				  showPageList: false,
			        				  showRefresh: false,
			        				  layout: ['first','prev','links','next','last'],
			        				  links: 5
			        			  });
			        		  } else if(Math.ceil(total / pageSize) <= 5){
			        			  $(page).pagination({ 
			        				  pageSize: 10,
			        				  displayMsg: '',
			        				  showPageList: false,
			        				  showRefresh: false,
			        				  layout: ['links'],
			        				  links: 5
			        			  });
			        		  }
			        	  }
			          },
			          onBeforeLoad: function(param){
			        	  $('#noSearchResult').hide();

			        	  if(param.ACTIVE_YN){
			        		  ACTIVE_YN_SEND = param.ACTIVE_YN;
			        	  } else{
			        		  ACTIVE_YN_SEND = 'ALL';
			        	  }
			          },
			          loadFilter: function(data){	
			        	  if(data.rows == null){
			        		  if(data.errCd == -1){
			        			  getConfirmPopup('알림', data.errMsg, 'alert');
			        			  $('#ok_alertPopup').click(function(){
			        				  confirmPopupRemove();
			        			  });
			        			  $('#close_confirmPopup').click(function(){
			        				  confirmPopupRemove();
			        			  });
			        		  }
			        		  data.rows = new Array();
			        	  } 
			        	  return data;
			          },
			          url:contextPath +"/ServiceAPI/DT/WorkRoadStatsItemManage/searchWorkRoadStatsItemManage.json"
		});

		var page = $(id_datagrid).datagrid('getPager');  
		$(page).pagination({ 
			pageSize: 10,
			displayMsg: '',
			showPageList: false,
			showRefresh: false,
			layout: [],
			links: 5
		});

		(function() {
			$class("sop.openApi.validateKeyword.api").extend(sop.cnm.absAPI).define({
				onSuccess : function(status, res) {
					var result = res.result;
					if(res.errCd == "0") { 
						if(result != null){
							if(result.success == true){
								getConfirmPopup('알림', result.msg, 'alert');
								$('#ok_alertPopup').click(function(){
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function(){
									confirmPopupRemove();
								});

								//add REL popup
								$('#addButtonDisabled').hide();
								$('#modifyButtonDisabled').hide();
								$('#modifyButton').hide();
								$('#addButton').show();
								$('#assocWordAdd0').focus();
							} else {
								getConfirmPopup('알림', '입력하신 검색어는 중복입니다. 다시 입력하세요.', 'alert');
								$('#ok_alertPopup').click(function(){
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function(){
									confirmPopupRemove();
								});
								$('#keywordAdd').focus();
							}
						}
					} else {
						getConfirmPopup('알림', res.errMsg, 'alert');
						$('#ok_alertPopup').click(function(){
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function(){
							confirmPopupRemove();
						});
					}
				},
				onFail : function(status) {
					getConfirmPopup('알림', '일시적인 오류로 검색에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
					$('#ok_alertPopup').click(function(){
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
				}
			});
		}());
		(function() {
			$class("sop.openApi.delData.api").extend(sop.cnm.absAPI).define({
				onSuccess : function(status, res) {
					var result = res.result;
					if(res.errCd == "0") { 
						if(result != null){
							getConfirmPopup('알림', result.msg, 'alert');
							$('#ok_alertPopup').click(function(){
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function(){
								confirmPopupRemove();
							});
							//var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');	    				
							$(id_datagrid).datagrid('reload');
						}
					} else {
						getConfirmPopup('알림', res.errMsg, 'alert');
						$('#ok_alertPopup').click(function(){
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function(){
							confirmPopupRemove();
						});
					}
				},
				onFail : function(status) {
					getConfirmPopup('알림', '일시적인 오류로 검색에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
					$('#ok_alertPopup').click(function(){
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
				}
			});
		}());
		
		$WorkRoadStatsItemManage = {
				delData : function(relWordList) {
					var sopOpenApiDelDatatObj = new sop.openApi.delData.api();
					sopOpenApiDelDatatObj.addParam('SEARCH_WORD_List', relWordList);
					sopOpenApiDelDatatObj.request({
						method : "POST",
						async : false,
						url : contextPath +"/ServiceAPI/DT/WorkRoadStatsItemManage/deleteWorkRoadStatsItemManage.json"
					});
				},validateKeyword : function(){
					var sopOpenApiValidateKeywordObj = new sop.openApi.validateKeyword.api();
					sopOpenApiValidateKeywordObj.addParam('SEARCH_WORD',$('#keywordAdd').val().replace(/(^\s*)|(\s*$)/g, ''));
					sopOpenApiValidateKeywordObj.addParam('SEARCH_TYPE', $('#SEARCH_TYPE').val());
					sopOpenApiValidateKeywordObj.request({
						method : "POST",
						async : false,
						url : contextPath +"/ServiceAPI/DT/WorkRoadStatsItemManage/searchWorkRoadStatsItemManage.json"
					});
				}
		};
	})
}(window, document));

function getQueryParamsObj(SEARCH_WORD,SEARCH_TYPE){	
	var queryParamsObj = new Object();
	if(SEARCH_WORD.length >= 2){
		queryParamsObj['SEARCH_WORD'] = SEARCH_WORD;
		if(SEARCH_TYPE=='STAT_NM')
			queryParamsObj['SEARCH_TYPE'] = SEARCH_TYPE;
		else if(SEARCH_TYPE=='STAT_DEFINITION')
			queryParamsObj['SEARCH_TYPE'] = SEARCH_TYPE;
	}


	return queryParamsObj;
}
