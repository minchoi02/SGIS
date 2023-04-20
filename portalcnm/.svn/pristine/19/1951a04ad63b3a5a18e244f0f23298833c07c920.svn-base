 /**   
 * @JSName: AccessManage
 * @Description: modify by liudandan  2014/11/14/ 14:00:00 
 *
 * @author: chenzhanchao  
 * @date: 2014/10/23/ 14:00:00     
 * @version V1.0      
 */
(function(W, D) {
	W.$accessManage = W.$accessManage || {};
	//id of datagrid
	var id_datagrid = '#searchResultTable';
	$(document).ready(function() {
		//init page when loading
		$('#SEARCH_WORD').val('');
		$('#noSearchResult').hide();
		if ($.fn.validatebox){
			$.fn.validatebox.defaults.missingMessage = '이 입력 항목은 필수 입력 항목 입니다.';
			$.fn.validatebox.defaults.rules.length.message = '입력 길이는 필수{0}와{1} 사이.';
		}
		//popup page keyword
		$('#SEARCH_WORD').validatebox({
			required: false,
			validType:['length[1,25]','cnmInput']
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
		//click the search button
		$('#searchButton').click(function(){		
			var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');	
			$('#SEARCH_WORD').validatebox('enableValidation');
			if($('#SEARCH_WORD').validatebox('isValid'))
			{
				if(SEARCH_WORD.length>=2){
					$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));
				}
				
			}
		});
		//search result
		$(id_datagrid).datagrid({	
			loadMsg: '처리중 입니다, 기다리 십시요...',
			pagination: true,
		   	nowrap: false,
		   	checkOnSelect: false,
		    columns:[[ 
		        {field:'MANAGER_ID',title:'관리자 ID',align:'center',width:150}, 
		        {field:'MANAGER_NM',title:'관리자 이름',align:'center',width:150,
					formatter: function(value,row,index){
						var MANAGER_ID = encodeURIComponent((row.MANAGER_ID));
						var MANAGER_NM = encodeURIComponent((row.MANAGER_NM));
						var DEPT = encodeURIComponent((row.DEPT));
						var EXT_NO = encodeURIComponent((row.EXT_NO));
						if (value != null && value != ''){
							return "<a onclick='selectManager(\""+ MANAGER_ID+"\",\""+MANAGER_NM+"\",\""+DEPT+"\",\""+EXT_NO+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
						} else {
							return value;
						}
					}
				},
				{field:'DEPT',title:'부서',align:'center',width:150}, 
				{field:'EXT_NO',title:'내선번호',align:'center',width:150}				
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
			url:contextPath +"/ServiceAPI/DT/AccessManage/searchManagerInfo.json"
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
	$accessManage = {
			validateKeyword : function(){
				var sopOpenApiValidateKeywordObj = new sop.openApi.validateKeyword.api();
				sopOpenApiValidateKeywordObj.addParam('SEARCH_WORD',$('#accessIp').val().replace(/(^\s*)|(\s*$)/g, ''));
				sopOpenApiValidateKeywordObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/DT/AccessManage/checkREL.json"
			    });
			},
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
	            			$('#permitYn').focus();
	            		} else {
	            			getConfirmPopup('알림', '입력하신 검색어는 중복입니다. 다시 입력하세요.', 'alert');
	        				$('#ok_alertPopup').click(function(){
	        					confirmPopupRemove();
	        				});
	        				$('#close_confirmPopup').click(function(){
	        					confirmPopupRemove();
	        				});
            				$('#accessIp').focus();
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
}(window, document));
//create query parameters for datagrid
function getQueryParamsObj(SEARCH_WORD){	
	var queryParamsObj = new Object();
	if(SEARCH_WORD.length >= 2){
		queryParamsObj['SEARCH_WORD'] = SEARCH_WORD;
	}
	return queryParamsObj;
}
//click one detail
function selectManager(MANAGER_ID, MANAGER_NM, DEPT, EXT_NO){
	MANAGER_ID = decodeURIComponent(MANAGER_ID);
	MANAGER_NM = decodeURIComponent(MANAGER_NM);
	DEPT = decodeURIComponent(DEPT);
	EXT_NO = decodeURIComponent(EXT_NO);
	
	$("#managerId", opener.document).val(MANAGER_ID);
	$("#managerNm", opener.document).val(MANAGER_NM);
	$("#dept", opener.document).val(DEPT);
	$("#extNo", opener.document).val(EXT_NO);

	$('#addButtonDisabled', opener.document).hide();
	$('#modifyButtonDisabled', opener.document).hide();
	$('#modifyButton', opener.document).hide();
	$('#addButton', opener.document).show();
	$('#accessIp', opener.document).focus();
	
	window.self.close();
}
//extend validation of easyUI
$.extend($.fn.validatebox.defaults.rules, {
	//validate associated-words
}); 