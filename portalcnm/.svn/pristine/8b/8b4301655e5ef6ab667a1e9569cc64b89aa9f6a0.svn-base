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
		srvLogWrite("L0", "04", "05", "01", "", "");
		//init page when loading
		$('#SEARCH_WORD').val('');
		$('#noSearchResult').hide();
		if ($.fn.validatebox){
			$.fn.validatebox.defaults.missingMessage = '이 입력 항목은 필수 입력 항목 입니다.';
			$.fn.validatebox.defaults.rules.length.message = '입력 길이는 필수{0}와{1} 사이.';
		}
		//popup page keyword
		$('#accessIp').validatebox({
			required: true,
			validType:['length[7,15]','checkIp']
		});
		$('#SEARCH_WORD').validatebox({
			required: false,
			validType:['length[1,25]','cnmInput']
		});
		//popup page association word
		$('#permitYn').validatebox({
			required: true,
			validType:['assocWord','assocWordPiper']
		});
		$('#managerId').validatebox({
			required: true,
			validType:['assocWord','assocWordPiper']
		});
		$('#managerNm').validatebox({
			required: true,
			validType:['assocWord','assocWordPiper']
		});
		$('#dept').validatebox({
			required: true,
			validType:['assocWord','assocWordPiper']
		});
		$('#extNo').validatebox({
			required: true,
			validType:['assocWord','assocWordPiper']
		});
		$('#modifyButtonDisabled').click(function(){
			srvLogWrite("L0", "04", "05", "05", "", "");
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
			$('#validateTd').show();
			//$('#validateButton_disabled').hide();
			$('#addButton').hide();
			$('#addButtonDisabled').show();
			$('#modifyButtonDisabled').hide();
			$('#modifyButton').hide();
			$('#searchManagerButton').show();
			$('#accessIp').validatebox('disableValidation');
			$('#permitYn').validatebox('disableValidation');
			$('#managerId').validatebox('disableValidation');
			$('#managerNm').validatebox('disableValidation');
			$('#dept').validatebox('disableValidation');
			$('#extNo').validatebox('disableValidation');
			$('#accessIp').attr("disabled",false);
			$('#popTitle').text('신규등록');
			$('.popupWrapper').css('display','block');
			document.getElementById('popupForm').reset();
			$('#accessIp').focus();
			$('#permitYn').focus();
			$('#accessIp').focus();
			
			$('#managerId').attr("disabled",true);
			$('#managerNm').attr("disabled",true);
			$('#dept').attr("disabled",true);
			$('#extNo').attr("disabled",true);
		});
		//click the repeat confirm button
		$('#searchManagerButton').click(function(){
			var popUrl = "SearchManagerInfo.html";	//팝업창에 출력될 페이지 URL
			var startablePopupOptions = "width=750px ,height=550px, resizable=no, scrollbars=no, status=no";
			
			window.open(popUrl,"",startablePopupOptions);
			/*
			$('#accessIp').validatebox('enableValidation');
			$('#permitYn').validatebox('enableValidation');
			$('#managerId').validatebox('enableValidation');
			if($('#accessIp').validatebox('isValid')){
				$accessManage.validateKeyword();
			} else{
				$('#accessIp').focus();
			}*/
		});
		//click the add button
		$('#addButton').click(function(){	
			$('#accessIp').validatebox('enableValidation');
			$('#permitYn').validatebox('enableValidation');
			$('#managerId').validatebox('enableValidation');
			if($('#accessIp').validatebox('isValid')){
				if($('#permitYn').validatebox('isValid') && $('#managerId').validatebox('isValid')){
					$accessManage.addAccess();
				} else{
					$('#permitYn').focus();
				}
			} else{
				$('#accessIp').focus();
			}
		});
		//click the modify button
		$('#modifyButton').click(function(){
			$('#permitYn').validatebox('enableValidation');	
			$('#managerId').validatebox('enableValidation');
			if($('#accessIp').validatebox('isValid')){	
				if($('#permitYn').validatebox('isValid') && $('#managerId').validatebox('isValid')){
					$accessManage.updateAccess();
				} else{
					$('#permitYn').focus();
				}
			} else{
				$('#accessIp').focus();
			}
		});
		
		//when keyword hasnot been confirmed
		$('#addButtonDisabled').click(function(){
			srvLogWrite("L0", "04", "05", "02", "", "");
			getConfirmPopup('알림', '입력된 정보를 확인한 후 다시 시도해 주세요.', 'alert');
			$('#ok_alertPopup').click(function(){
				confirmPopupRemove();
			});
			$('#close_confirmPopup').click(function(){
				confirmPopupRemove();
			});
		});
		//when value of keyword change
		$('#accessIp').keyup(function(){
			$('#accessIp').validatebox('enableValidation');	
			if($('#modifyButtonDisabled').is(':visible') || $('#modifyButton').is(':visible')){
				if($('#accessIp').validatebox('isValid') && $('#permitYn').validatebox('isValid')){	
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
		});
		//when value of association change
		$('#permitYn').change(function(){
			//modify popup
			$('#permitYn').validatebox('enableValidation');	
			if($('#modifyButtonDisabled').is(':visible') || $('#modifyButton').is(':visible')){
				if($('#accessIp').validatebox('isValid') && $('#permitYn').validatebox('isValid')){	
					//keyword not changed
					if($('#accessIp').val().replace(/(^\s*)|(\s*$)/g, '') == $('#accessIp').val().replace(/(^\s*)|(\s*$)/g, '')){
						//association word changed
						var tmpYn = $('#permitYn').val();	
						if($('#permitYnOld').val() == tmpYn){
							$('#addButton').hide();
							$('#addButtonDisabled').hide();
							$('#modifyButtonDisabled').show();
							$('#modifyButton').hide();
						} else{
							//association word not changed
							$('#addButton').hide();
							$('#addButtonDisabled').hide();
							$('#modifyButtonDisabled').hide();
							$('#modifyButton').show();
						}
					}
				}
			}
		});		
		$('#managerId').keyup(function(){	
			//modify popup
			$('#managerId').validatebox('enableValidation');	
			if($('#modifyButtonDisabled').is(':visible') || $('#modifyButton').is(':visible')){
				if($('#accessIp').validatebox('isValid') && $('#permitYn').validatebox('isValid')){	
					//keyword not changed
					if($('#keywordOld').val().replace(/(^\s*)|(\s*$)/g, '') == $('#accessIp').val().replace(/(^\s*)|(\s*$)/g, '')){
						//association word changed
						var tmpNewWord = $('#permitYn').val()+'|'+$('#managerId').val()+'|'+$('#managerNm').val()+'|'+$('#dept').val()+'|'+$('#extNo').val();
						if($('#assocWordOld').val() == tmpNewWord){
							$('#addButton').hide();
							$('#addButtonDisabled').hide();
							$('#modifyButtonDisabled').show();
							$('#modifyButton').hide();
						} else{
							//association word not changed
							$('#addButton').hide();
							$('#addButtonDisabled').hide();
							$('#modifyButtonDisabled').hide();
							$('#modifyButton').show();
						}
					}
				}
			}
		});		
		//click the search button
		$('#searchButton').click(function(){
			srvLogWrite("L0", "04", "05", "01", "", "");
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
			srvLogWrite("L0", "04", "05", "03", "", "");
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
					var ipList = new Array();
			    	for(var i = 0; i < row.length; i++){
			    		ipList[i] = encodeURIComponent(row[i].IP);
			    	}
			    	console.log("ipList",ipList);
			    	$accessManage.delData(ipList);
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
		        {field:'MANAGER_ID',hidden: true},
		        {field:'checkbox',checkbox: true},
		        {field:'IP',title:'IP',align:'center',width:180,
					formatter: function(value,row,index){						
						var IP = encodeURIComponent((row.IP));
						var MANAGER_ID = encodeURIComponent((row.MANAGER_ID));
						var MANAGER_NM = encodeURIComponent((row.MANAGER_NM));
						var PERMIT_YN = encodeURIComponent((row.PERMIT_YN));
						var DEPT = encodeURIComponent((row.PERMIT_YN));
						var EXT_NO = encodeURIComponent((row.EXT_NO));
						if (value != null && value != ''){
							return "<a onclick='openModifyPopup(\""+ IP+"\",\""+MANAGER_ID+"\",\""+MANAGER_NM+"\",\""+PERMIT_YN+"\",\""+DEPT+"\",\""+EXT_NO+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
						} else {
							return value;
						}
					}
				},
				{field:'MANAGER_NM',title:'이름',align:'center',width:100}, 
				{field:'PERMIT_YN',title:'허용여부',align:'center',width:100},
				{field:'DEPT',title:'부서',align:'center',width:177}, 
				{field:'EXT_NO',title:'내선번호',align:'center',width:160}
				
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
			url:contextPath +"/ServiceAPI/DT/AccessManage/searchAccess.json"
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
			delData : function(ipList) {
				var sopOpenApiDelDatatObj = new sop.openApi.delData.api();
				sopOpenApiDelDatatObj.addParam('IP_List', ipList);
				sopOpenApiDelDatatObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/DT/AccessManage/deleteAccess.json"
			    });
			},			
			addAccess : function(){
				var sopOpenApiAddObj = new sop.openApi.addAccess.api()
				sopOpenApiAddObj.addParam('IP',$('#accessIp').val());
				sopOpenApiAddObj.addParam('PERMIT_YN',$('#permitYn').val());
				sopOpenApiAddObj.addParam('MANAGER_ID',$('#managerId').val());
				sopOpenApiAddObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/DT/AccessManage/addAccess.json"
			    });
			},
			updateAccess : function(){
				var sopOpenApiupDateAccessObj = new sop.openApi.updateAccess.api();
				sopOpenApiupDateAccessObj.addParam('IP',$('#accessIp').val());
				sopOpenApiupDateAccessObj.addParam('PERMIT_YN',$('#permitYn').val());
				sopOpenApiupDateAccessObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/DT/AccessManage/updateAccess.json"
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
	        			//var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');	    				
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
	if(SEARCH_WORD.length >= 2){
		queryParamsObj['SEARCH_WORD'] = SEARCH_WORD;
	}
	return queryParamsObj;
}
//click one detail
function openModifyPopup(IP, MANAGER_ID, MANAGER_NM, PERMIT_YN, DEPT, EXT_NO){
	srvLogWrite("L0", "04", "05", "04", "", "");
	IP = decodeURIComponent(IP);
	MANAGER_ID = decodeURIComponent(MANAGER_ID);
	MANAGER_NM = decodeURIComponent(MANAGER_NM);
	PERMIT_YN = decodeURIComponent(PERMIT_YN);
	DEPT = decodeURIComponent(DEPT);
	EXT_NO = decodeURIComponent(EXT_NO);
		
	//$('#validateButton_disabled').show();
	$('#accessIp').validatebox('disableValidation');
	$('#permitYn').validatebox('disableValidation');
	$('#managerId').validatebox('disableValidation');
	$('#managerNm').validatebox('disableValidation');
	$('#dept').validatebox('disableValidation');
	$('#extNo').validatebox('disableValidation');
	$('#validateTd').hide();
	$('#searchManagerButton').hide();
	$('#addButton').hide();
	$('#addButtonDisabled').hide();
	$('#modifyButtonDisabled').show();
	$('#modifyButton').hide();
	$('#popTitle').text('상세정보');
	document.getElementById('popupForm').reset();
	$('.popupWrapper').css('display','block');
	$('#accessIp').focus();
	$('#permitYn').focus();
	$('#accessIp').focus();
	
	$('#permitYnOld').html(PERMIT_YN);
	$('#permitYnOld').val($('#permitYnOld').text());
	
	$('#accessIp').html(IP);
	$('#accessIp').val($('#accessIp').text());
	
	$('#permitYn').val(PERMIT_YN);
	
	$('#managerId').html(MANAGER_ID);
	$('#managerId').val($('#managerId').text());
	
	$('#managerNm').html(MANAGER_NM);
	$('#managerNm').val($('#managerNm').text());
	
	$('#dept').html(DEPT);
	$('#dept').val($('#dept').text());
	
	$('#extNo').html(EXT_NO);
	$('#extNo').val($('#extNo').text());
	
	//$('#validateButton_disabled').hide();
	$('#accessIp').attr("disabled",true);
	$('#managerId').attr("disabled",true);
	$('#managerNm').attr("disabled",true);
	$('#dept').attr("disabled",true);
	$('#extNo').attr("disabled",true);
}


//extend validation of easyUI
$.extend($.fn.validatebox.defaults.rules, {
	//validate associated-words
	checkIp : {
		validator : function(value) {
			var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;  
			if(value.match(ipformat)) 
			return true;
			return false;
		},
		//cannot contain spaces
		message : 'IP입력값 확인.'
	},
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