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
	var SEARCH_TYPE = $('#SEARCH_TYPE').val();
	W.$TTIPManage = W.$TTIPManage || {};
	var id_datagrid = '#searchResultTable';
	$(document).ready(function() {
		
		srvLogWrite("L0", "04", "03", "01", "", "");

		/*$('#newTHBookButton').click(function(){
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
		});




		$('#modifyButton').click(function(){
			if($('#assocWordAdd0').val().length >=2){

				$THBOOKManage.updateKeyword();
			} else{
				$('#assocWordAdd0').focus();
			}
		});*/




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
						relWordList[i] = encodeURIComponent(row[i].MENU_CLASS_CD);
						relWordList[i] += encodeURIComponent(row[i].TTIP_ID);
					}

					console.log("relWordList",relWordList);
					$TTIPManage.delData(relWordList);
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

		$('#newTTIPButton').click(function(){
			srvLogWrite("L0", "04", "03", "02", "", "");
			location.href = './../DT/TTIPAdd.html';
		});

		$('#searchButton').click(function(){
			srvLogWrite("L0", "04", "03", "01", "", "");
			var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');
			var SEARCH_TYPE = $('#SEARCH_TYPE').val();
			if(SEARCH_WORD.length>=2){
				$(id_datagrid).datagrid('load',getQueryParamsObj1(SEARCH_WORD, SEARCH_TYPE));	
			}else if(SEARCH_WORD.length == 0){
				$(id_datagrid).datagrid('load',getQueryParamsObj1(SEARCH_WORD, SEARCH_TYPE));	
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
			          {field:'MENU_CLASS_CD',hidden: true},
			          {field:'checkbox',checkbox: true},
			          {field:'MENU_NM',title:'메뉴명',align:'left',width:150},
			          {field:'TTIP_ID',title: '툴팁ID',align:'left',width:50},
			          {field:'TTIP_NM',title:'툴팁명',align:'left',width:217,
			        	  formatter: function(value,row,index){
			        		  var TTIP_ID = encodeURIComponent((row.TTIP_ID));
			        		  var TITLE = encodeURIComponent((row.TTIP_NM));
			        		  var MENU_NM = encodeURIComponent((row.MENU_NM));
			        		  var TTIP_EXP = encodeURIComponent((row.TTIP_EXP));
			        		  var CLASS_CD = encodeURIComponent((row.MENU_CLASS_CD));
			        		  
			        		  if(value != null && value != ''){
			        			  value ="<a href='./TTIPDetail.html?TTIP_ID="+ TTIP_ID + "&TITLE=" + TITLE + "&MENU_NM=" + MENU_NM +
			        			  "&TTIP_EXP=" + TTIP_EXP + "&CLASS_CD=" + CLASS_CD
			        			  +"' style='color:#4a4a4a;' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value;
			        			  value += "</a>";
			        		  }

			        		  return value;

			        	  }	
			          },
			          {field:'TTIP_EXP',title:'설명',align:'left',width:300
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
			          url:contextPath +"/ServiceAPI/DT/TTIPManage/searchTTIP.json"
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
									$(id_datagrid).datagrid('reload');
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
								$(id_datagrid).datagrid('reload');
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
		$TTIPManage = {
				delData : function(relWordList) {
					var sopOpenApiDelDatatObj = new sop.openApi.delData.api();
					sopOpenApiDelDatatObj.addParam('SEARCH_WORD_List', relWordList);
					sopOpenApiDelDatatObj.request({
						method : "POST",
						async : false,
						url : contextPath +"/ServiceAPI/DT/TTIPManage/deleteTTIP.json"
					});
				},validateKeyword : function(){
					var sopOpenApiValidateKeywordObj = new sop.openApi.validateKeyword.api();
					sopOpenApiValidateKeywordObj.addParam('SEARCH_WORD',$('#keywordAdd').val().replace(/(^\s*)|(\s*$)/g, ''));
					sopOpenApiValidateKeywordObj.addParam('SEARCH_TYPE', $('#SEARCH_TYPE').vall());
					sopOpenApiValidateKeywordObj.request({
						method : "POST",
						async : false,
						url : contextPath +"/ServiceAPI/DT/TTIPManage/searchTTIP.json"
					});
				},updateKeyword : function(){
					var sopOpenApiupDateKeywordObj = new sop.openApi.updateKeyword.api();
					sopOpenApiupDateKeywordObj.addParam('STAT_ID',$('#keywordOld').val());
					sopOpenApiupDateKeywordObj.addParam('SRV_YN',$('#SRV_YN1').val().replace(/(^\s*)|(\s*$)/g, ''));
					sopOpenApiupDateKeywordObj.addParam('URL',$('#assocWordAdd0').val());
					sopOpenApiupDateKeywordObj.request({
						method : "POST",
						async : false,
						url : contextPath +"/ServiceAPI/DT/THBookManage/updateTHBook.json"
					});
				},addKeyword : function(){
					var sopOpenApiAddObj = new sop.openApi.addKeyword.api();
					sopOpenApiAddObj.addParam('TITLE',$('#keywordAdd').val().replace(/(^\s*)|(\s*$)/g, ''));
					sopOpenApiAddObj.addParam('SRV_YN',$('#SRV_YN1').val());
					sopOpenApiAddObj.addParam('URL',$('#assocWordAdd0').val().replace(/(^\s*)|(\s*$)/g, ''));
					sopOpenApiAddObj.request({
						method : "POST",
						async : false,
						url : contextPath +"/ServiceAPI/DT/THBookManage/addTHBook.json"
					});
				}
		};
	})
}(window, document));

function getQueryParamsObj1(SEARCH_WORD,SEARCH_TYPE){	
	var queryParamsObj = new Object();
	if(SEARCH_WORD.length >= 2){
		queryParamsObj['SEARCH_WORD'] = SEARCH_WORD;
		if(SEARCH_TYPE=='MENU')
			queryParamsObj['SEARCH_TYPE'] = SEARCH_TYPE;
		else if(SEARCH_TYPE=='TTIP')
			queryParamsObj['SEARCH_TYPE'] = SEARCH_TYPE;
	}


	return queryParamsObj;
}

function getQueryParamsObj(SEARCH_WORD){	
	var queryParamsObj = new Object();
	if(SEARCH_WORD.length >= 2){
		queryParamsObj['SEARCH_WORD'] = SEARCH_WORD;
	}
	return queryParamsObj;
}


function openModifyPopup(TITLE, URL, SRV_YN,STAT_ID){
	TITLE = decodeURIComponent(TITLE);
	URL = decodeURIComponent(URL);	
	SRV_YN = decodeURIComponent(SRV_YN);
	STAT_ID = 	decodeURIComponent(STAT_ID);
	$('#validateTd').hide();
	$('#validateButton').hide();
	$('#addButton').hide();
	$('#addButtonDisabled').hide();
	$('#modifyButtonDisabled').hide();
	$('#modifyButton').show();
	$('#popTitle').text('상세정보');
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
}
//extend validation of easyUI
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