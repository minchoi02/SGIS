/**   
 * @JSName: thMetaManage
 * @Description: modify by liudandan  2014/11/14/ 14:00:00 
 *
 * @author: chenzhanchao  
 * @date: 2014/10/23/ 14:00:00     
 * @version V1.0      
 */
(function(W, D) {
	W.$thMetaManage = W.$thMetaManage || {};
	//id of datagrid
	var id_datagrid = '#searchResultTable';
	$(document).ready(function() {	
		srvLogWrite("L0", "04", "04", "01", "", "");
		//init page when loading
		$('#SEARCH_WORD').val('');
		$('#SEARCH_TYPE').val('ALL');
		$('#noSearchResult').hide();
		if ($.fn.validatebox){
			$.fn.validatebox.defaults.missingMessage = '이 입력 항목은 필수 입력 항목 입니다.';
			$.fn.validatebox.defaults.rules.length.message = '입력 길이는 필수{0}와{1} 사이.';
		}
		//popup page keyword
		//$('#title').validatebox({
		//	required: true,
		//	validType:['length[1,100]']
		//});
		$('#SEARCH_WORD').validatebox({
			required: false,
			validType:['length[1,25]','cnmInput']
		});
		//popup page association word
		//$('#exp').validatebox({
		//	required: true,
		//	validType:['length[1,1000]']
		//});
		//$('#tbNm').validatebox({
		//	required: true,
		//	validType:['length[1,100]']
		//});
		$('#modifyButtonDisabled').click(function(){
			getConfirmPopup('알림', '수정된 내용이 없습니다.', 'alert');
			$('#ok_alertPopup').click(function(){
				confirmPopupRemove();
			});
			$('#close_confirmPopup').click(function(){
				confirmPopupRemove();
			});
		});
		//click the new REL button
		$('#newRELButton').click(function(){

			srvLogWrite("L0", "04", "04", "02", "", "");
			
			//$('#validateTd').show();
			//$('#validateButton_disabled').hide();
			$('#addButton').show();
			$('#addButtonDisabled').hide();
			$('#modifyButtonDisabled').hide();
			$('#modifyButton').hide();
			//$('#title').validatebox('disableValidation');
			//$('#exp').validatebox('disableValidation');
			//$('#tbNm').validatebox('disableValidation');
			$('#title').attr("disabled",false);
			$('#popTitle').text('신규등록');
			$('.popupWrapper').css('display','block');
			document.getElementById('popupForm').reset();
			$('#title').focus();
			$('#exp').focus();
			$('#title').focus();

			$('#title').attr("disabled",false);
			$('#tbNm').attr("disabled",false);
			$('#exp').attr("disabled",false);

			$('#exp').val('');

		});		
		//click the add button
		$('#addButton').click(function(){	
			var title = $('#title').val();
			var tbNm = $('#tbNm').val();
			var exp = $('#exp').val();
			if(title == null || title.length < 1) {
				getConfirmPopup('알림', '제목을 입력하세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
				$('#keywordAdd').focus();
			} else if(tbNm == null || tbNm.length < 1) {
				getConfirmPopup('알림', '테이블명을 입력하세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
				$('#keywordAdd').focus();
			} else if(exp == null || exp.length < 1) {
				getConfirmPopup('알림', '설명을 입력하세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
				$('#keywordAdd').focus();
			} else {
				$thMetaManage.addAccess();
			}
			/*$('#title').validatebox('enableValidation');
			$('#tbNm').validatebox('enableValidation');
			$('#exp').validatebox('enableValidation');
			if($('#title').validatebox('isValid')){
				if($('#tbNm').validatebox('isValid') && $('#exp').validatebox('isValid')){
					$thMetaManage.addAccess();
				} else{
					$('#title').focus();
				}
			} else{
				$('#title').focus();
			}*/
		});
		//click the modify button
		$('#modifyButton').click(function(){
			srvLogWrite("L0", "04", "04", "05", "", "");
			var title = $('#title').val();
			var tbNm = $('#tbNm').val();
			var exp = $('#exp').val();
			if(title == null || title.length < 1) {
				getConfirmPopup('알림', '제목을 입력하세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
				$('#keywordAdd').focus();
			} else if(tbNm == null || tbNm.length < 1) {
				getConfirmPopup('알림', '테이블명을 입력하세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
				$('#keywordAdd').focus();
			} else if(exp == null || exp.length < 1) {
				getConfirmPopup('알림', '설명을 입력하세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
				$('#keywordAdd').focus();
			} else {
				$thMetaManage.updateAccess();
			}
			/*$('#exp').validatebox('enableValidation');	
			if($('#title').validatebox('isValid')){	
				if($('#title').validatebox('isValid') && $('#tbNm').validatebox('isValid')){
					$thMetaManage.updateAccess();
				} else{
					$('#exp').focus();
				}
			} else{
				$('#title').focus();
			}*/
		});

		//when keyword hasnot been confirmed
		$('#addButtonDisabled').click(function(){
			getConfirmPopup('알림', '입력된 정보를 확인한 후 다시 시도해 주세요.', 'alert');
			$('#ok_alertPopup').click(function(){
				confirmPopupRemove();
			});
			$('#close_confirmPopup').click(function(){
				confirmPopupRemove();
			});
		});		
		/*$('#title').keyup(function(){
			$('#title').validatebox('enableValidation');	
			if($('#modifyButtonDisabled').is(':visible') || $('#modifyButton').is(':visible')){
				if($('#title').validatebox('isValid') && $('#exp').validatebox('isValid')){	
					$('#addButton').hide();
					$('#addButtonDisabled').show();
					$('#modifyButtonDisabled').hide();
					$('#modifyButton').hide();
				}
			}

			//modify REL popup
//			if($('#modifyButton').is(':visible') || $('#modifyButtonDisabled').is(':visible')){
//				//keyword changed to original value
//				var keywordChanged = $('#keywordOld').val().replace(/(^\s*)|(\s*$)/g, '') != $('#keywordAdd').val().replace(/(^\s*)|(\s*$)/g, '');
//				var keywordNotChanged = $('#keywordOld').val().replace(/(^\s*)|(\s*$)/g, '') == $('#keywordAdd').val().replace(/(^\s*)|(\s*$)/g, '');
//				var assocwordNotChanged = $('#assocWordOld').val().replace(/(^\s*)|(\s*$)/g, '') == $('#assocWordAdd0').val().replace(/(^\s*)|(\s*$)/g, '');
//				if(keywordNotChanged){
//					$('#validateButton_disabled').show();
//					$('#searchManagerButton').hide();
//				} else if(keywordChanged){
//					$('#validateButton_disabled').hide();
//					$('#searchManagerButton').show();
//				}
//				if(keywordChanged || (keywordNotChanged && assocwordNotChanged)){
//					//association word changed to original value
//					$('#addButton').hide();
//					$('#addButtonDisabled').hide();
//					$('#modifyButtonDisabled').show();
//					$('#modifyButton').hide();
//				}
//			}
		});*/

		//click the search button
		$('#searchButton').click(function(){
			srvLogWrite("L0", "04", "04", "01", "", "");
			var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');	
			$('#SEARCH_WORD').validatebox('enableValidation');
			if($('#SEARCH_WORD').validatebox('isValid'))
			{				
				if(SEARCH_WORD.length>=2){
					$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));					
				}else if(SEARCH_WORD.length == 0){
					$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));					
				}
			}
		});
		//click the delete button
		$('#delButton').click(function(){
			srvLogWrite("L0", "04", "04", "03", "", ""); 
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
					var dataList = new Array();
					for(var i = 0; i < row.length; i++){
						dataList[i] = encodeURIComponent(row[i].META_DATA_ID);
					}
					console.log("dataList",dataList);
					$thMetaManage.delData(dataList);
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
		//search result
		$(id_datagrid).datagrid({	
			loadMsg: '처리중 입니다, 기다리 십시요...',
			pagination: true,
			nowrap: false,
			checkOnSelect: false,
			columns:[[ 
			          {field:'META_DATA_ID',hidden: true},
			          {field:'checkbox',checkbox: true},
			          {field:'TITLE',title:'제목',align:'left',width:197,
			        	  formatter: function(value,row,index){						
			        		  var META_DATA_ID = encodeURIComponent((row.META_DATA_ID));
			        		  var TITLE = encodeURIComponent((row.TITLE));
			        		  var TB_NM = encodeURIComponent((row.TB_NM));
			        		  var EXP = encodeURIComponent((row.EXP));
			        		  if (value != null && value != ''){
			        			  return "<a onclick='openModifyPopup(\""+ META_DATA_ID+"\",\""+TITLE+"\",\""+TB_NM+"\",\""+EXP+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
			        		  } else {
			        			  return value;
			        		  }
			        	  }
			          },
			          {field:'TB_NM',title:'테이블명',align:'left',width:150}, 
			          {field:'EXP',title:'설명',align:'left',width:370}
			          ]],
			          queryParams: {
			        	  SEARCH_TYPE:$('#SEARCH_TYPE').val()
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
			          url:contextPath +"/ServiceAPI/DT/ThMetaManage/searchMetaData.json"
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
	});
	//press the 'enter' key
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
	$thMetaManage = {
			delData : function(dataList) {
				var sopOpenApiDelDatatObj = new sop.openApi.delData.api();
				sopOpenApiDelDatatObj.addParam('DATA_List', dataList);
				sopOpenApiDelDatatObj.request({
					method : "POST",
					async : false,
					url : contextPath +"/ServiceAPI/DT/ThMetaManage/deleteMetaData.json"
				});
			},			
			addAccess : function(){
				var sopOpenApiAddObj = new sop.openApi.addAccess.api()				
				sopOpenApiAddObj.addParam('TITLE',$('#title').val());
				sopOpenApiAddObj.addParam('TB_NM',$('#tbNm').val());				
				sopOpenApiAddObj.addParam('EXP',$('#exp').val());
				sopOpenApiAddObj.request({
					method : "POST",
					async : false,
					url : contextPath +"/ServiceAPI/DT/ThMetaManage/addMetaData.json"
				});
			},
			updateAccess : function(){
				var sopOpenApiupDateAccessObj = new sop.openApi.updateAccess.api();
				sopOpenApiupDateAccessObj.addParam('META_DATA_ID',$('#metaDataId').val());
				sopOpenApiupDateAccessObj.addParam('TITLE',$('#title').val());
				sopOpenApiupDateAccessObj.addParam('TB_NM',$('#tbNm').val());
				sopOpenApiupDateAccessObj.addParam('EXP',$('#exp').val());
				sopOpenApiupDateAccessObj.request({
					method : "POST",
					async : false,
					url : contextPath +"/ServiceAPI/DT/ThMetaManage/updateMetaData.json"
				});
			},
	};
	//delete data from datagrid
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
		$class("sop.openApi.updateAccess.api").extend(sop.cnm.absAPI).define({
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
		$class("sop.openApi.addAccess.api").extend(sop.cnm.absAPI).define({
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
							$(id_datagrid).datagrid('reload',getQueryParamsObj(SEARCH_WORD));
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
}(window, document));		
//create query parameters for datagrid
function getQueryParamsObj(SEARCH_WORD){
	var queryParamsObj = new Object();
	if(SEARCH_WORD.length >= 2)
	{
		queryParamsObj['SEARCH_WORD'] = SEARCH_WORD.replace(/(^\s*)|(\s*$)/g, '');	
	}	

	queryParamsObj['SEARCH_TYPE'] = $('#SEARCH_TYPE').val();
	return queryParamsObj;
}

//click one detail
function openModifyPopup(META_DATA_ID, TITLE, TB_NM, EXP){
	srvLogWrite("L0", "04", "04", "04", "", "");
	META_DATA_ID = decodeURIComponent(META_DATA_ID);
	TITLE = decodeURIComponent(TITLE);
	TB_NM = decodeURIComponent(TB_NM);
	EXP = decodeURIComponent(EXP);

	//$('#validateButton_disabled').show();
	//$('#title').validatebox('disableValidation');
	//$('#exp').validatebox('disableValidation');
	//$('#tbNm').validatebox('disableValidation');
	$('#validateTd').hide();
	$('#addButton').hide();
	$('#addButtonDisabled').hide();
	$('#modifyButtonDisabled').hide();
	$('#modifyButton').show();
	$('#popTitle').text('정보수정');
	document.getElementById('popupForm').reset();
	$('.popupWrapper').css('display','block');
	$('#title').focus();
	$('#exp').focus();
	$('#title').focus();

	$('#metaDataId').html(META_DATA_ID);
	$('#metaDataId').val($('#metaDataId').text());

	$('#title').html(TITLE);
	$('#title').val($('#title').text());

	$('#exp').html(EXP);
	$('#exp').val($('#exp').text());

	$('#tbNm').html(TB_NM);
	$('#tbNm').val($('#tbNm').text());

	//$('#validateButton_disabled').hide();
	$('#title').attr("disabled",false);
	$('#tbNm').attr("disabled",false);
	$('#exp').attr("disabled",false);
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