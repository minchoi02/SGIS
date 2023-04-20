/**
 * 
 * @JSName: themaMapManage
 * @Description:
 * 
 * @author: liudandan
 * @date: 2014/11/07/ 08:30:00
 * @version V1.0
 * 
 */
(function(W, D){
	var SRV_YN = getParameter('SRV_YN');
	var gubnUrl = "";
	
	W.$THBOOKManage = W.$THBOOKManage || {};
	var id_datagrid = '#searchResultTable';
	$(document).ready(function() {
		srvLogWrite("L0", "04", "02", "01", "", "");
		$('#newTHBookButton').click(function(){
			var STAT_ID = decodeURIComponent($('#STAT_ID').val());
			$('#validateTd').show();
			$('#validateButton_disabled').hide();
			$('#addButton').show();
			$('#addButtonDisabled').hide();
			$('#modifyButtonDisabled').hide();
			$('#modifyButton').hide();
			$('#validateButton').show();
			$('#keywordAdd').attr("disabled",false);
			$('#popTitle').text('신규등록');
			$('.popupWrapper').css('display','block');
			document.getElementById('popupForm').reset();
			$('#keywordAdd').focus();
			$('#assocWordAdd0').focus();
			$('#keywordAdd').focus();
			$('#STAT_ID1').val(STAT_ID);
			hideText(STAT_ID);
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
		
		$('#addButton').click(function(){
			srvLogWrite("L0", "04", "02", "02", "", "");
			var keywordAdd = $('#keywordAdd').val();
			var assocWordAdd0 = $('#assocWordAdd0').val();
			var CATEGORY_NM1 = $('#CATEGORY_NM1').val();
			var RANK1 = $('#RANK1').val();
			var STAT_ID1 = $('#STAT_ID1').val();
			
			if(keywordAdd == null || keywordAdd.length < 1) {
				getConfirmPopup('알림', '제목을 입력하세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
				$('#keywordAdd').focus();
			} else if(assocWordAdd0 == null || assocWordAdd0.length < 1) {
				getConfirmPopup('알림', 'URL을 입력하세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
				$('#assocWordAdd0').focus();
			} else if(RANK1 == null || RANK1 == 0) {
				getConfirmPopup('알림', '표출순위를 입력하세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
				$('#RANK1').focus();	
			} else if(STAT_ID1 == 'tma' && CATEGORY_NM1 == 'ALL') {
				getConfirmPopup('알림', '카테고리를 선택하세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
				$('#CATEGORY_NM1').focus();	
			} else {
				$THBOOKManage.addKeyword();		
			}
		});
		
		$('#delButton').click(function(){
			srvLogWrite("L0", "04", "02", "03", "", "");
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
			    		relWordList[i] = encodeURIComponent(row[i].STAT_ID);
			    	}
			    	
			    	console.log("relWordList",relWordList);
			    	$THBOOKManage.delData(relWordList);
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
		
		$('#modifyButton').click(function(){
			srvLogWrite("L0", "04", "02", "05", "", "");
			var assocWordAdd0 = $('#assocWordAdd0').val();
			var STAT_ID1 = $('#STAT_ID1').val();
			var RANK1 = $('#RANK1').val();
			var CATEGORY_NM1 = $('#CATEGORY_NM1').val();
			
			if(assocWordAdd0 == null || assocWordAdd0.length < 1) {
				getConfirmPopup('알림', 'URL을 입력하세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
				$('#keywordAdd').focus();
			} else if(RANK1 == null || RANK1 == 0) {
				getConfirmPopup('알림', '표출순위를 입력하세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
				$('#RANK1').focus();	
			} else if(STAT_ID1 == 'tma' && CATEGORY_NM1 == 'ALL') {
				getConfirmPopup('알림', '카테고리를 선택하세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
				$('#CATEGORY_NM1').focus();	
			} else {
				$THBOOKManage.updateKeyword();
			}
		});

		$('#searchButton').click(function(){
			srvLogWrite("L0", "04", "02", "01", "", "");
			var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');	
			var SRV_YN = $('#SRV_YN').val();
			var STAT_ID = $('#STAT_ID').val();
			
			if(STAT_ID == "map") {
				hideColumn();
			} else {
				showColumn();
			}
			
			$(id_datagrid).datagrid('load',getQueryParamsObj1(SEARCH_WORD, SRV_YN));
		});
		
		$('#newWindowButton').click(function(){	
			var url = $('#assocWordAdd0').val();	
			if(url == null || url.length < 1) {
				getConfirmPopup('알림', 'URL을 입력하세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
				$('#assocWordAdd0').focus();
			} else {
				window.open(url,"","Fullscreen=yes,type=FullWindow,scrollbars=no");				
			}
		});
		
		$('#STAT_ID').change(function(){
			var value = $('#STAT_ID').val();
			if(value != 'tma'){
				$('#area6').hide();
				$('#area7').hide();
				$('#area1').attr('colspan',3);
				$('#area1').attr('style','border-right: 1px solid #cacaca;');
			} else {
				$('#area6').show();
				$('#area7').show();
				$('#area1').attr('colspan',1);
			}
			$('#searchButton').click();
		});
		
		$('#STAT_ID1').change(function(){
			var value = $('#STAT_ID1').val();
			hideText(value);
		});
		
		$THBOOKManage.loadLogBCd2();
		
		$(id_datagrid).datagrid({

			loadMsg: '처리중 입니다, 기다리 십시요...',
			pagination: true,
			nowrap: false,
			checkOnSelect: false,
			fitColumns: true,
			scrollbarSize: 0,
			columns:[[ 
			          {field:'checkbox',checkbox: true},
			          {field:'RANK',title:'표출순위',align:'center',width:80},
			          {field:'CATEGORY_NM',title:'카테고리 명',align:'center',width:80},
			          {field:'STAT_ID',title:'통계ID',align:'center',width:100},
			          {field:'THEMA_MAP_CATEGORY',title:'구분코드',hidden:true},
			          {field:'TITLE',title:'제목',align:'left',width:150,
			        	  formatter: function(value,row,index){
			        		  var TITLE = encodeURIComponent((row.TITLE));
			        		  var URL = encodeURIComponent((row.URL));
			        		  var SRV_YN = encodeURIComponent((row.SRV_YN));
			        		  var STAT_ID = encodeURIComponent((row.STAT_ID));
			        		  var RANK = encodeURIComponent((row.RANK));
			        		  var CATEGORY_NM = encodeURIComponent((row.THEMA_MAP_CATEGORY));
			        		  var HOT_ICON_YN = encodeURIComponent((row.HOT_ICON_YN));
			        		  if (value != null && value != ''){
			        			  return "<a onclick='openModifyPopup(\""+ TITLE+"\",\""+URL+"\",\""+SRV_YN+"\",\""+STAT_ID+"\",\""+RANK+"\",\""+CATEGORY_NM+"\",\""+HOT_ICON_YN+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
			        		  } else {
			        			  return value;
			        		  }
			        	  }},
		        	  {field:'URL',title:'URL',align:'left',width:240},
		        	  {field:'SRV_YN',title:'서비스여부',align:'center',width:67,
		        		  formatter:function(value, row, index){
		        			  if(value != null && value == 'Y')
		        				  value="활성";
		        			  else
		        				  value="비활성";
		        			  return value;
		        		  }}
		        	  ]],
        	  queryParams: {
        		  STAT_ID:$('#STAT_ID').val(),
			  },
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
        		  srvLogWrite("L0", "04", "02", "04", "", "");
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
        	  url:contextPath +"/ServiceAPI/DT/THBookManage/searchTHBook.json"
		});
		
		var page = $(id_datagrid).datagrid('getPager');  
		$(page).pagination({ 
			pageSize: 20,
			displayMsg: '',
			showPageList: false,
			showRefresh: false,
			layout: [],
			links: 5
		});
		
	})
}(window, document));

$THBOOKManage = {
		delData : function(relWordList) {
			var sopOpenApiDelDatatObj = new sop.openApi.delData.api();
			sopOpenApiDelDatatObj.addParam('SEARCH_WORD_List', relWordList);
			sopOpenApiDelDatatObj.request({
				method : "POST",
				async : false,
				url : contextPath +"/ServiceAPI/DT/THBookManage/deleteTHBook.json"
			});
		},validateKeyword : function(){
			var sopOpenApiValidateKeywordObj = new sop.openApi.validateKeyword.api();
			sopOpenApiValidateKeywordObj.addParam('SEARCH_WORD',$('#keywordAdd').val().replace(/(^\s*)|(\s*$)/g, ''));
			sopOpenApiValidateKeywordObj.addParam('SRV_YN', $('#SRV_YN').vall());
			sopOpenApiValidateKeywordObj.request({
				method : "POST",
				async : false,
				url : contextPath +"/ServiceAPI/DT/THBookManage/searchTHBook.json"
			});
		},updateKeyword : function(){
			var sopOpenApiupDateKeywordObj = new sop.openApi.updateKeyword.api();
			sopOpenApiupDateKeywordObj.addParam('STAT_ID',$('#keywordOld').val());
			sopOpenApiupDateKeywordObj.addParam('SRV_YN',$('#SRV_YN1').val().replace(/(^\s*)|(\s*$)/g, ''));
			var uri = $('#assocWordAdd0').val();
			var url =encodeURIComponent(uri);
			var STAT_ID1 = $('#STAT_ID1').val();
			if(STAT_ID1 == "tma") {
				sopOpenApiupDateKeywordObj.addParam('CATEGORY_NM',$('#CATEGORY_NM1').val());
			}
			sopOpenApiupDateKeywordObj.addParam('HOT_ICON_YN',$('#HOT_ICON_YN1').val());
			sopOpenApiupDateKeywordObj.addParam('RANK',$('#RANK1').val().replace(/(^\s*)|(\s*$)/g, ''));
			sopOpenApiupDateKeywordObj.addParam('URL',url);
			sopOpenApiupDateKeywordObj.request({
				method : "POST",
				async : false,
				url : contextPath +"/ServiceAPI/DT/THBookManage/updateTHBook.json"
			});
		},addKeyword : function(){
			var sopOpenApiAddObj = new sop.openApi.addKeyword.api();
			sopOpenApiAddObj.addParam('TITLE',$('#keywordAdd').val().replace(/(^\s*)|(\s*$)/g, ''));
			sopOpenApiAddObj.addParam('SRV_YN',$('#SRV_YN1').val());
			var uri = $('#assocWordAdd0').val().replace(/(^\s*)|(\s*$)/g, '');
			var url =encodeURIComponent(uri);
			sopOpenApiAddObj.addParam('URL',url);
			var STAT_ID1 = $('#STAT_ID1').val();
			if(STAT_ID1 == "tma") {
				sopOpenApiAddObj.addParam('CATEGORY_NM',$('#CATEGORY_NM1').val());
			}
			sopOpenApiAddObj.addParam('HOT_ICON_YN',$('#HOT_ICON_YN1').val());
			sopOpenApiAddObj.addParam('RANK',$('#RANK1').val().replace(/(^\s*)|(\s*$)/g, ''));
			sopOpenApiAddObj.addParam('STAT_ID',STAT_ID1);
			sopOpenApiAddObj.request({
				method : "POST",
				async : false,
				url : contextPath +"/ServiceAPI/DT/THBookManage/addTHBook.json"
			});
		},loadLogBCd2 : function(){
			var sopOpenApiLoadLogBCdObj = new sop.openApi.loadLogBCd2.api();
			sopOpenApiLoadLogBCdObj.addParam('CLASSTYPE', 'T');
			sopOpenApiLoadLogBCdObj.request({
				method : "POST",
				async : false,
				url : contextPath +"/ServiceAPI/COMMON/getAPIClass.json"
			});
		}
};

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
    				$('#searchResultTable').datagrid('reload');
        			
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
	$class("sop.openApi.addKeyword.api").extend(sop.cnm.absAPI).define({
		onSuccess : function(status, res) {
			var result = res.result;
			if(res.errCd == "0") { 
				if(result != null){
					if(result.success == true){
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(function(){
							$(".popupWrapper").css("display","none"); 
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function(){
							$(".popupWrapper").css("display","none"); 
							confirmPopupRemove();
						});
						var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');
	        			
	    				$('#searchResultTable').datagrid('reload');
	        			
					} else{
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(function(){
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function(){
							confirmPopupRemove();
						});
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
			getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
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
	$class("sop.openApi.updateKeyword.api").extend(sop.cnm.absAPI).define({
		onSuccess : function(status, res) {
			var result = res.result;
			if(res.errCd == "0") { 
				if(result != null){
					if(result.success == true){
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(function(){
							$(".popupWrapper").css("display","none"); 
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function(){
							$(".popupWrapper").css("display","none");
							confirmPopupRemove();
						});
						$('#searchResultTable').datagrid('reload');
					} else{
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(function(){
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function(){
							confirmPopupRemove();
						});
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
			getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
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
	$class("sop.openApi.loadLogBCd2.api").extend(sop.cnm.absAPI).define({
		onSuccess : function(status, res) {
			if(res.errCd == "0") { 
				var result = res.result;
				console.log(result);
				if(result != null){
					for(var i = 1; i < $('#CATEGORY_NM').children().length; i++){
						$('#CATEGORY_NM').children().eq(i).remove();
						$('#CATEGORY_NM1').children().eq(i).remove();
					}
					for(var i=0;i<result.length;i++){
						$('#CATEGORY_NM').append("<option value='"+result[i].THEMA_MAP_CATEGORY+"'>"+result[i].CATEGORY_NM+"</option>");
						$('#CATEGORY_NM1').append("<option value='"+result[i].THEMA_MAP_CATEGORY+"'>"+result[i].CATEGORY_NM+"</option>");
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
			getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
			$('#ok_alertPopup').click(function(){
				confirmPopupRemove();
			});
			$('#close_confirmPopup').click(function(){
				confirmPopupRemove();
			});
		}
	});
}());

	function getQueryParamsObj1(SEARCH_WORD,SRV_YN){	
		var queryParamsObj = new Object();
		if(SEARCH_WORD.length >= 2){
			queryParamsObj['SEARCH_WORD'] = SEARCH_WORD;
		}
		
		queryParamsObj['SRV_YN'] = SRV_YN;
		queryParamsObj['STAT_ID'] = $("#STAT_ID").val();
		queryParamsObj['CATEGORY_NM'] = $("#CATEGORY_NM").val();
		queryParamsObj['HOT_ICON_YN'] = $("#HOT_ICON_YN").val();
		
		
//		if(SRV_YN=='Y') {
//			queryParamsObj['SRV_YN'] = SRV_YN;
//		} else if(SRV_YN=='N') {
//			queryParamsObj['SRV_YN'] = SRV_YN;
//		}
		
		return queryParamsObj;
	}

	function openModifyPopup(TITLE, URL, SRV_YN, STAT_ID, RANK, CATEGORY_NM, HOT_ICON_YN){
		TITLE = decodeURIComponent(TITLE);
		URL = decodeURIComponent(URL);	
		SRV_YN = decodeURIComponent(SRV_YN);
		STAT_ID = 	decodeURIComponent(STAT_ID);
		RANK = 	decodeURIComponent(RANK);
		CATEGORY_NM = 	decodeURIComponent(CATEGORY_NM);
		HOT_ICON_YN = 	decodeURIComponent(HOT_ICON_YN);
		$('#validateTd').hide();
		$('#validateButton').hide();
		$('#addButton').hide();
		$('#addButtonDisabled').hide();
		$('#modifyButtonDisabled').hide();
		$('#modifyButton').show();
		$('#popTitle').text('정보수정');
		document.getElementById('popupForm').reset();
		$('.popupWrapper').css('display','block');
		$('#keywordAdd').focus();
		$('#assocWordAdd0').focus();
		$('#keywordAdd').focus();

		$('#keywordOld').html(STAT_ID);
		$('#keywordOld').val($('#keywordOld').text());	

		$('#keywordAdd').html(TITLE);
		$('#keywordAdd').val($('#keywordAdd').text());

		$('#SRV_YN1').show();
		$('#SRV_YN1').val(SRV_YN);

		$("#assocWordAdd0").html(URL); 
		$("#assocWordAdd0").val($("#assocWordAdd0").text());

		$('#validateButton_disabled').hide();
		$('#keywordAdd').attr("disabled",true);
		
		hideText(STAT_ID.substring(0, 3));
		$('#STAT_ID1').val(STAT_ID.substring(0, 3));
		$('#RANK1').val(RANK);
		$('#CATEGORY_NM1').val(CATEGORY_NM);
		$('#HOT_ICON_YN1').val(HOT_ICON_YN);
		$('#STAT_ID1').attr("disabled",true);
	}
	
	function hideText(str) {
		if(str != 'tma'){
			$('#area3').hide();
			$('#area4').hide();
			$('#area5').attr('colspan',3);
		} else {
			$('#area3').show();
			$('#area4').show();
			$('#area5').attr('colspan',1);
		}
	} 
	
	function hideColumn() {
		$('#searchResultTable').datagrid('hideColumn','CATEGORY_NM');
	}
	
	function showColumn() {
		$('#searchResultTable').datagrid('showColumn','CATEGORY_NM');
	}

//	extend validation of easyUI
	$.extend($.fn.validatebox.defaults.rules, {
		//validate associated-words
		assocWord : {
			validator : function(value) {
				if (value.indexOf(" ") >=0)
					return false;
				return true;
			},
			//cannot contain spaces
			message : '공백을 제거하고'
		},
		assocWordPiper : {
			validator : function(value) {
				if (value.indexOf("|") >=0)
					return false;
				return true;
			},
			//cannot contain |
			message : "연관어에 '|'는  안됨."
		},
		assocWordDot: {
			validator : function(value) {
				if (value.charAt(0)==","||value.charAt(0)=="，")
					return false;
				if (value.charAt(value.length-1)==","||value.charAt(value.length-1)=="，")
					return false;
				return true;
			},
			//cannot start or end with ","
			message : "단어의 시작과 끝은 ','로 안됨."
		},
		assocWordQuantity: {
			validator : function(value) {
				var temp=value.split(',');
				if (temp.length<=5&&temp.length>=2)
					return true;
				return false;
			},
			//length 2-5, connect with ","
			message : "단어의 구분은 ','로, 최대 5단어, 최소 2단어 이상."
		},
		assocWordRepeat: {
			validator : function(value) {
				var temp=value.split(',');
				for(var i =0;i<temp.length;i++)
				{
					for(var a=i+1;a<temp.length;a++)
					{
						if(temp[i]==temp[a])
						{
							return false;
						}
					}
				}
				return true;
			},
			//cannot be repeat
			message : "입력하신 단어는 중복입니다."
		},
	}); 