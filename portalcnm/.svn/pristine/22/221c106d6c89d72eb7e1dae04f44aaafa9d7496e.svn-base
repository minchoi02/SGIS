 /**   
 * @JSName: pubDataManage
 * @Description: modify by liudandan  2014/11/14/ 14:00:00 
 *
 * @author: chenzhanchao  
 * @date: 2014/10/23/ 14:00:00     
 * @version V1.0      
 */
(function(W, D) {
	W.$pubDataManage = W.$pubDataManage || {};
	//id of datagrid
	var id_datagrid = '#searchResultTable';
	$(document).ready(function() {	
		//init page when loading
		$('#SEARCH_WORD').val('');
		$('#SEARCH_TYPE_INTRACTV').val('ALL');
		$('#SEARCH_TYPE_BIZSTAT').val('ALL');
		$('#noSearchResult').hide();
		if ($.fn.validatebox){
			$.fn.validatebox.defaults.missingMessage = '이 입력 항목은 필수 입력 항목 입니다.';
			$.fn.validatebox.defaults.rules.length.message = '입력 길이는 필수{0}와{1} 사이.';
		}
		//popup page keyword
		$('#pubDataNm').validatebox({
			required: true,
			validType:['length[1,100]']
		});
		$('#SEARCH_WORD').validatebox({
			required: false,
			validType:['length[1,25]','cnmInput']
		});
		//popup page association word
		$('#intractvMapYn').validatebox({
			required: true,
			validType:['assocWord','assocWordPiper']
		});
		$('#bizStatMapYn').validatebox({
			required: true,
			validType:['assocWord','assocWordPiper']
		});
		$('#pubDataYear').validatebox({
			required: true,
			validType:['assocWord','assocWordPiper']
		});
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
		/*$('#newRELButton').click(function(){
			$('#validateTd').show();
			//$('#validateButton_disabled').hide();
			$('#addButton').show();
			$('#addButtonDisabled').hide();
			$('#modifyButtonDisabled').hide();
			$('#modifyButton').hide();
			$('#pubDataNm').validatebox('disableValidation');
			$('#intractvMapYn').validatebox('disableValidation');
			$('#bizStatMapYn').validatebox('disableValidation');
			$('#pubDataYear').validatebox('disableValidation');
			$('#pubDataNm').attr("disabled",false);
			$('#popTitle').text('신규등록');
			$('.popupWrapper').css('display','block');
			document.getElementById('popupForm').reset();
			$('#pubDataNm').focus();
			$('#intractvMapYn').focus();
			$('#pubDataNm').focus();
			
			$('#pubDataNm').attr("disabled",false);
			$('#pubDataYear').attr("disabled",false);
			$('#intractvMapYn').attr("disabled",false);
			$('#bizStatMapYn').attr("disabled",false);
			
		});		*/
		//click the add button
		$('#addButton').click(function(){	
			$('#pubDataNm').validatebox('enableValidation');
			$('#pubDataYear').validatebox('enableValidation');
			$('#intractvMapYn').validatebox('enableValidation');
			$('#bizStatMapYn').validatebox('enableValidation');
			if($('#pubDataNm').validatebox('isValid')){
				if($('#pubDataNm').validatebox('isValid') && $('#pubDataYear').validatebox('isValid')){
					$pubDataManage.addAccess();
				} else{
					$('#pubDataNm').focus();
				}
			} else{
				$('#pubDataNm').focus();
			}
		});
		//click the modify button
		$('#modifyButton').click(function(){
			$('#intractvMapYn').validatebox('enableValidation');	
			$('#bizStatMapYn').validatebox('enableValidation');
			if($('#pubDataNm').validatebox('isValid')){	
				if($('#pubDataNm').validatebox('isValid') && $('#pubDataYear').validatebox('isValid')){
					$pubDataManage.updateAccess();
				} else{
					$('#intractvMapYn').focus();
				}
			} else{
				$('#pubDataNm').focus();
			}
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
		//when value of keyword change
		$('#pubDataYear').keyup(function(){
			$(this).val($(this).val().replace(/[^0-9]/g,""));
		});
		/*$('#pubDataNm').keyup(function(){
			$('#pubDataNm').validatebox('enableValidation');	
			if($('#modifyButtonDisabled').is(':visible') || $('#modifyButton').is(':visible')){
				if($('#pubDataNm').validatebox('isValid') && $('#intractvMapYn').validatebox('isValid')){	
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
			var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');	
			$('#SEARCH_WORD').validatebox('enableValidation');
			if($('#SEARCH_WORD').validatebox('isValid'))
			{				
				if(SEARCH_WORD.length>=2 && SEARCH_WORD.length<5){
					$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));	
				}else{
					alert("입력값을 체크해주세요");
				}
			}
		});
		//click the delete button
		$('#delButton').click(function(){
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
			    		dataList[i] = encodeURIComponent(row[i].PUB_DATA_ID);
			    	}
			    	console.log("dataList",dataList);
			    	$pubDataManage.delData(dataList);
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
		        {field:'THEMA_MAP_DATA_ID',hidden: true},
		        {field:'THEMA_MAP_DATA_NM',title:'데이터명',align:'center',width:180,
		        	formatter: function(value,row,index){						
						var THEMA_MAP_DATA_ID = encodeURIComponent((row.THEMA_MAP_DATA_ID)).trim();
						var BASE_YEAR = encodeURIComponent((row.BASE_YEAR));
						if (value != null && value != ''){
							return "<a onclick='clickPOP(\""+ THEMA_MAP_DATA_ID.trim()+"\",\""+BASE_YEAR+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
						} else {
							return value;
						}
					}}, 
		        {field:'BASE_YEAR',title:'데이터년도',align:'center',width:140,
					formatter: function(value,row,index){						
						var THEMA_MAP_DATA_ID = encodeURIComponent((row.THEMA_MAP_DATA_ID)).trim();
						var BASE_YEAR = encodeURIComponent((row.BASE_YEAR));
						if (value != null && value != ''){
							return "<a onclick='clickPOP(\""+ THEMA_MAP_DATA_ID.trim()+"\",\""+BASE_YEAR+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
						} else {
							return value;
						}
					}
				}				
		    ]],
		    queryParams: {
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
			url:contextPath +"/ServiceAPI/DT/ThemaMapManage/getThemaID.json"
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
	$pubDataManage = {
			delData : function(dataList) {
				var sopOpenApiDelDatatObj = new sop.openApi.delData.api();
				sopOpenApiDelDatatObj.addParam('DATA_List', dataList);
				sopOpenApiDelDatatObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/DT/PubDataManage/deletePubData.json"
			    });
			},			
			addAccess : function(){
				var sopOpenApiAddObj = new sop.openApi.addAccess.api()				
				sopOpenApiAddObj.addParam('PUB_DATA_NM',$('#pubDataNm').val());
				sopOpenApiAddObj.addParam('PUB_DATA_YEAR',$('#pubDataYear').val());				
				sopOpenApiAddObj.addParam('INTRACTVMAP_APPLY_YN',$('#intractvMapYn').val());
				sopOpenApiAddObj.addParam('BIZSTATMAP_APPLY_YN',$('#bizStatMapYn').val());
				sopOpenApiAddObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/DT/PubDataManage/addPubData.json"
			    });
			},
			updateAccess : function(){
				var sopOpenApiupDateAccessObj = new sop.openApi.updateAccess.api();
				sopOpenApiupDateAccessObj.addParam('PUB_DATA_ID',$('#pubDataId').val());
				sopOpenApiupDateAccessObj.addParam('PUB_DATA_NM',$('#pubDataNm').val());
				sopOpenApiupDateAccessObj.addParam('PUB_DATA_YEAR',$('#pubDataYear').val());
				sopOpenApiupDateAccessObj.addParam('INTRACTVMAP_APPLY_YN',$('#intractvMapYn').val());
				sopOpenApiupDateAccessObj.addParam('BIZSTATMAP_APPLY_YN',$('#bizStatMapYn').val());
				sopOpenApiupDateAccessObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/DT/PubDataManage/updatePubData.json"
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
	        			var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');	    				
	    				$('#SEARCH_WORD').val('');
	        			if($('#SEARCH_WORD').validatebox('isValid'))
	        			{
	        					$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));	
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
		        			var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');
		        			if($('#SEARCH_WORD').validatebox('isValid'))
		        			{
		        					$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));	
		        			}
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
		
	return queryParamsObj;
}
function clickPOP(THEMA_MAP_DATA_ID,BASE_YEAR){
	
	//opener.document.getElementById('data_test').value="에헴";
	
	$('#MAP_DATA_ID',opener.document).val(decodeURI(THEMA_MAP_DATA_ID));
	$('#MAP_DATA_YEAR',opener.document).val(BASE_YEAR);
	self.close();
	//$(opener.document).find('#DATA_ID').val(BASE_YEAR);
}
//click one detail
function openModifyPopup(PUB_DATA_ID, PUB_DATA_NM, PUB_DATA_YEAR, INTRACTVMAP_APPLY_YN, BIZSTATMAP_APPLY_YN){
	PUB_DATA_ID = decodeURIComponent(PUB_DATA_ID);
	PUB_DATA_NM = decodeURIComponent(PUB_DATA_NM);
	PUB_DATA_YEAR = decodeURIComponent(PUB_DATA_YEAR);
	INTRACTVMAP_APPLY_YN = decodeURIComponent(INTRACTVMAP_APPLY_YN);
	BIZSTATMAP_APPLY_YN = decodeURIComponent(BIZSTATMAP_APPLY_YN);
		
	//$('#validateButton_disabled').show();
	$('#pubDataNm').validatebox('disableValidation');
	$('#intractvMapYn').validatebox('disableValidation');
	$('#bizStatMapYn').validatebox('disableValidation');
	$('#pubDataYear').validatebox('disableValidation');
	$('#validateTd').hide();
	$('#addButton').hide();
	$('#addButtonDisabled').hide();
	$('#modifyButtonDisabled').hide();
	$('#modifyButton').show();
	$('#popTitle').text('상세정보');
	document.getElementById('popupForm').reset();
	$('.popupWrapper').css('display','block');
	$('#pubDataNm').focus();
	$('#intractvMapYn').focus();
	$('#pubDataNm').focus();
	
	$('#pubDataId').html(PUB_DATA_ID);
	$('#pubDataId').val($('#pubDataId').text());
	
	$('#pubDataNm').html(PUB_DATA_NM);
	$('#pubDataNm').val($('#pubDataNm').text());
	
	$('#intractvMapYn').val(INTRACTVMAP_APPLY_YN);
	$('#bizStatMapYn').val(BIZSTATMAP_APPLY_YN);
	
	$('#pubDataYear').html(PUB_DATA_YEAR);
	$('#pubDataYear').val($('#pubDataYear').text());
	
	//$('#validateButton_disabled').hide();
	$('#pubDataNm').attr("disabled",false);
	$('#pubDataYear').attr("disabled",false);
	$('#intractvMapYn').attr("disabled",false);
	$('#bizStatMapYn').attr("disabled",false);
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