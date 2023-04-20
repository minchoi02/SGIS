 /**   
 * @JSName: RELManage
 * @Description: modify by liudandan  2014/11/14/ 14:00:00 
 *
 * @author: chenzhanchao  
 * @date: 2014/10/23/ 14:00:00     
 * @version V1.0      
 */
(function(W, D) {
	W.$relManage = W.$relManage || {};
	//id of datagrid
	var id_datagrid = '#searchResultTable';
	$(document).ready(function() {
		srvLogWrite("L0", "04", "01", "01", "", "");
		//init page when loading
		$('#SEARCH_TYPE').val('search');
		$('#SEARCH_WORD').val('');
		$('#noSearchResult').hide();
		if ($.fn.validatebox){
			$.fn.validatebox.defaults.missingMessage = '이 입력 항목은 필수 입력 항목 입니다.';
			$.fn.validatebox.defaults.rules.length.message = '입력 길이는 필수{0}와{1} 사이.';
		}
		//popup page keyword
		$('#keywordAdd').validatebox({
			required: true,
			validType:['length[2,20]']
		});
		$('#SEARCH_WORD').validatebox({
			required: false,
			validType:['length[2,25]','cnmInput']
		});
		//popup page association word
		$('#assocWordAdd0').validatebox({
			required: true,
			validType:['assocWord','assocWordPiper']
		});
		$('#assocWordAdd1').validatebox({
			required: true,
			validType:['assocWord','assocWordPiper']
		});
		$('#assocWordAdd2').validatebox({
			required: true,
			validType:['assocWord','assocWordPiper']
		});
		$('#assocWordAdd3').validatebox({
			required: true,
			validType:['assocWord','assocWordPiper']
		});
		$('#assocWordAdd4').validatebox({
			required: true,
			validType:['assocWord','assocWordPiper']
		});
		$('#modifyButtonDisabled').click(function(){
			srvLogWrite("L0", "04", "01", "05", "", "");
			/*getConfirmPopup('알림', '수정된 내용이 없습니다.', 'alert');
			$('#ok_alertPopup').click(function(){
				confirmPopupRemove();
			});
			$('#close_confirmPopup').click(function(){
				confirmPopupRemove();
			});*/
		});
		//click the new REL button
		$('#newRELButton').click(function(){
			srvLogWrite("L0", "04", "01", "02", "", "");
			$('#validateTd').show();
			$('#validateButton_disabled').hide();
			$('#addButton').hide();
			$('#addButtonDisabled').show();
			$('#modifyButtonDisabled').hide();
			$('#modifyButton').hide();
			$('#validateButton').show();
			$('#keywordAdd').validatebox('disableValidation');
			$('#assocWordAdd0').validatebox('disableValidation');
			$('#assocWordAdd1').validatebox('disableValidation');
			$('#assocWordAdd2').validatebox('disableValidation');
			$('#assocWordAdd3').validatebox('disableValidation');
			$('#assocWordAdd4').validatebox('disableValidation');
			$('#keywordAdd').attr("disabled",false);
			$('#popTitle').text('신규등록');
			$('.popupWrapper').css('display','block');
			document.getElementById('popupForm').reset();
			$('#keywordAdd').focus();
			$('#assocWordAdd0').focus();
			$('#keywordAdd').focus();
		});
		//click the repeat confirm button
		$('#validateButton').click(function(){
			$('#keywordAdd').validatebox('enableValidation');
			$('#assocWordAdd0').validatebox('enableValidation');
			$('#assocWordAdd1').validatebox('enableValidation');
			if($('#keywordAdd').validatebox('isValid')){
				$relManage.validateKeyword();
			} else{
				$('#keywordAdd').focus();
			}
		});
		//click the add button
		$('#addButton').click(function(){
			$('#keywordAdd').validatebox('enableValidation');
			$('#assocWordAdd0').validatebox('enableValidation');
			$('#assocWordAdd1').validatebox('enableValidation');
			if($('#keywordAdd').validatebox('isValid')){
				if($('#assocWordAdd0').validatebox('isValid') && $('#assocWordAdd1').validatebox('isValid')){
					$relManage.addKeyword();
				} else{
					$('#assocWordAdd0').focus();
				}
			} else{
				$('#keywordAdd').focus();
			}
		});
		//click the modify button
		$('#modifyButton').click(function(){
			$('#assocWordAdd0').validatebox('enableValidation');
			$('#assocWordAdd1').validatebox('enableValidation');
			if($('#keywordAdd').validatebox('isValid')){
				if($('#assocWordAdd0').validatebox('isValid') && $('#assocWordAdd1').validatebox('isValid')){
					$relManage.updateKeyword();
				} else{
					$('#assocWordAdd0').focus();
				}
			} else{
				$('#keywordAdd').focus();
			}
		});
		
		//when keyword hasnot been confirmed
		$('#addButtonDisabled').click(function(){
			/*getConfirmPopup('알림', '입력한 검색어는 중복입니다. 검색어를 확인한 후 다시 시도해 주세요.', 'alert');
			$('#ok_alertPopup').click(function(){
				confirmPopupRemove();
			});
			$('#close_confirmPopup').click(function(){
				confirmPopupRemove();
			});*/
		});
		//when value of keyword change
		$('#keywordAdd').keyup(function(){
			//add REL popup
			$('#keywordAdd').validatebox('enableValidation');
			if($('#addButton').is(':visible')){
				$('#addButton').hide();
				$('#addButtonDisabled').show();
				$('#modifyButtonDisabled').hide();
				$('#modifyButton').hide();
			}
			//modify REL popup
//			if($('#modifyButton').is(':visible') || $('#modifyButtonDisabled').is(':visible')){
//				//keyword changed to original value
//				var keywordChanged = $('#keywordOld').val().replace(/(^\s*)|(\s*$)/g, '') != $('#keywordAdd').val().replace(/(^\s*)|(\s*$)/g, '');
//				var keywordNotChanged = $('#keywordOld').val().replace(/(^\s*)|(\s*$)/g, '') == $('#keywordAdd').val().replace(/(^\s*)|(\s*$)/g, '');
//				var assocwordNotChanged = $('#assocWordOld').val().replace(/(^\s*)|(\s*$)/g, '') == $('#assocWordAdd0').val().replace(/(^\s*)|(\s*$)/g, '');
//				if(keywordNotChanged){
//					$('#validateButton_disabled').show();
//					$('#validateButton').hide();
//				} else if(keywordChanged){
//					$('#validateButton_disabled').hide();
//					$('#validateButton').show();
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
		$('#assocWordAdd0').keyup(function(){	
			//modify popup
			$('#assocWordAdd0').validatebox('enableValidation');	
			if($('#modifyButtonDisabled').is(':visible') || $('#modifyButton').is(':visible')){
				if($('#keywordAdd').validatebox('isValid') && $('#assocWordAdd0').validatebox('isValid')){	
					//keyword not changed
					if($('#keywordOld').val().replace(/(^\s*)|(\s*$)/g, '') == $('#keywordAdd').val().replace(/(^\s*)|(\s*$)/g, '')){
						//association word changed
						var tmpNewWord = $('#assocWordAdd0').val()+'|'+$('#assocWordAdd1').val()+'|'+$('#assocWordAdd2').val()+'|'+$('#assocWordAdd3').val()+'|'+$('#assocWordAdd4').val();
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
		$('#assocWordAdd1').keyup(function(){	
			//modify popup
			$('#assocWordAdd1').validatebox('enableValidation');	
			if($('#modifyButtonDisabled').is(':visible') || $('#modifyButton').is(':visible')){
				if($('#keywordAdd').validatebox('isValid') && $('#assocWordAdd0').validatebox('isValid')){	
					//keyword not changed
					if($('#keywordOld').val().replace(/(^\s*)|(\s*$)/g, '') == $('#keywordAdd').val().replace(/(^\s*)|(\s*$)/g, '')){
						//association word changed
						var tmpNewWord = $('#assocWordAdd0').val()+'|'+$('#assocWordAdd1').val()+'|'+$('#assocWordAdd2').val()+'|'+$('#assocWordAdd3').val()+'|'+$('#assocWordAdd4').val();
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
		$('#assocWordAdd2').keyup(function(){	
			//modify popup
			//$('#assocWordAdd2').validatebox('enableValidation');	
			if($('#modifyButtonDisabled').is(':visible') || $('#modifyButton').is(':visible')){
				if($('#keywordAdd').validatebox('isValid') && $('#assocWordAdd2').validatebox('isValid')){	
					//keyword not changed
					if($('#keywordOld').val().replace(/(^\s*)|(\s*$)/g, '') == $('#keywordAdd').val().replace(/(^\s*)|(\s*$)/g, '')){
						//association word changed
						var tmpNewWord = $('#assocWordAdd0').val()+'|'+$('#assocWordAdd1').val()+'|'+$('#assocWordAdd2').val()+'|'+$('#assocWordAdd3').val()+'|'+$('#assocWordAdd4').val();
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
		$('#assocWordAdd3').keyup(function(){	
			//modify popup
			//$('#assocWordAdd3').validatebox('enableValidation');	
			if($('#modifyButtonDisabled').is(':visible') || $('#modifyButton').is(':visible')){
				if($('#keywordAdd').validatebox('isValid') && $('#assocWordAdd3').validatebox('isValid')){	
					//keyword not changed
					if($('#keywordOld').val().replace(/(^\s*)|(\s*$)/g, '') == $('#keywordAdd').val().replace(/(^\s*)|(\s*$)/g, '')){
						//association word changed
						var tmpNewWord = $('#assocWordAdd0').val()+'|'+$('#assocWordAdd1').val()+'|'+$('#assocWordAdd2').val()+'|'+$('#assocWordAdd3').val()+'|'+$('#assocWordAdd4').val();
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
		$('#assocWordAdd4').keyup(function(){	
			//modify popup
			//$('#assocWordAdd4').validatebox('enableValidation');	
			if($('#modifyButtonDisabled').is(':visible') || $('#modifyButton').is(':visible')){
				if($('#keywordAdd').validatebox('isValid') && $('#assocWordAdd4').validatebox('isValid')){	
					//keyword not changed
					if($('#keywordOld').val().replace(/(^\s*)|(\s*$)/g, '') == $('#keywordAdd').val().replace(/(^\s*)|(\s*$)/g, '')){
						//association word changed
						var tmpNewWord = $('#assocWordAdd0').val()+'|'+$('#assocWordAdd1').val()+'|'+$('#assocWordAdd2').val()+'|'+$('#assocWordAdd3').val()+'|'+$('#assocWordAdd4').val();
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
			srvLogWrite("L0", "04", "01", "01", "", "");
			var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');	
			$('#SEARCH_WORD').validatebox('enableValidation');
			if($('#SEARCH_WORD').validatebox('isValid'))
			{
				if(SEARCH_WORD.length>=2){
					$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));
				}else if(SEARCH_WORD.length==0){
					$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));
				}
				
			}
		});
		//click the delete button
		$('#delButton').click(function(){
			srvLogWrite("L0", "04", "01", "03", "", "");
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
			    		relWordList[i] = encodeURIComponent(row[i].SEARCH_WORD);
			    	}
			    	console.log("relWordList",relWordList);
			    	$relManage.delData(relWordList);
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
		        {field:'SRV_ID',hidden: true},
		        {field:'checkbox',checkbox: true},
				{field:'R',title:'번호',align:'center',width:50}, 
		        {field:'SEARCH_WORD',title:'검색어',align:'left',width:150,
					formatter: function(value,row,index){
						var SEARCH_WORD = encodeURIComponent((row.SEARCH_WORD));
						var REL_SEARCH_WORD = encodeURIComponent((row.REL_SEARCH_WORD));
						if (value != null && value != ''){
							return "<a onclick='openModifyPopup(\""+ SEARCH_WORD+"\",\""+REL_SEARCH_WORD+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
						} else {
							return value;
						}
					}
				},
		        {field:'REL_SEARCH_WORD',title:'연관어',align:'left',width:517,
					formatter: function(value,row,index){
						var REL_SEARCH_WORD = row.REL_SEARCH_WORD;
						var temp = REL_SEARCH_WORD.split('|');
						var tempRelSearchWord = "";
						for(var i=0; i<temp.length; i++) { 		
							tempRelSearchWord += temp[i];
							if(i != (temp.length-1))
								tempRelSearchWord += " | ";
						}
						
						if (value != null && value != ''){
							return tempRelSearchWord;
						} else {
							return value;
						}
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
				srvLogWrite("L0", "04", "01", "04", "", "");
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
			url:contextPath +"/ServiceAPI/DT/RELManage/searchREL.json"
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
	$relManage = {
			delData : function(relWordList) {
				var sopOpenApiDelDatatObj = new sop.openApi.delData.api();
				sopOpenApiDelDatatObj.addParam('SEARCH_WORD_List', relWordList);
				sopOpenApiDelDatatObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/DT/RELManage/deleteREL.json"
			    });
			},
			validateKeyword : function(){
				var sopOpenApiValidateKeywordObj = new sop.openApi.validateKeyword.api();
				sopOpenApiValidateKeywordObj.addParam('SEARCH_WORD',$('#keywordAdd').val().replace(/(^\s*)|(\s*$)/g, ''));
				sopOpenApiValidateKeywordObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/DT/RELManage/checkREL.json"
			    });
			},
			addKeyword : function(){
				var s = 0;
				for(var i = 0; i<5; i++){
					if($('#assocWordAdd'+i).val() !=''){
						s++;
					}
				}
				var relWord ='';
				if(s==2){
					relWord = $('#assocWordAdd0').val() + '|' + $('#assocWordAdd1').val();
				}else if(s==3){
					relWord = $('#assocWordAdd0').val() + '|' + $('#assocWordAdd1').val() + '|' + $('#assocWordAdd2').val();
				}else if(s==4){
					relWord = $('#assocWordAdd0').val() + '|' + $('#assocWordAdd1').val() + '|' + $('#assocWordAdd2').val() + '|' + $('#assocWordAdd3').val();
				}else if(s==5){
					relWord = $('#assocWordAdd0').val() + '|' + $('#assocWordAdd1').val() + '|' + $('#assocWordAdd2').val() + '|' + $('#assocWordAdd3').val() +'|' + $('#assocWordAdd4').val();
				}
				var sopOpenApiAddObj = new sop.openApi.addKeyword.api();
				sopOpenApiAddObj.addParam('SEARCH_WORD',$('#keywordAdd').val().replace(/(^\s*)|(\s*$)/g, ''));
				sopOpenApiAddObj.addParam('REL_SEARCH_WORD',relWord);
				sopOpenApiAddObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/DT/RELManage/addREL.json"
			    });
			},
			updateKeyword : function(){
				var s = 0;
				for(var i = 0; i<5; i++){
					if($('#assocWordAdd'+i).val() !=''){
						s++;
					}
				}
				var relWord ='';
				if(s==2){
					relWord = $('#assocWordAdd0').val() + '|' + $('#assocWordAdd1').val();
				}else if(s==3){
					relWord = $('#assocWordAdd0').val() + '|' + $('#assocWordAdd1').val() + '|' + $('#assocWordAdd2').val();
				}else if(s==4){
					relWord = $('#assocWordAdd0').val() + '|' + $('#assocWordAdd1').val() + '|' + $('#assocWordAdd2').val() + '|' + $('#assocWordAdd3').val();
				}else if(s==5){
					relWord = $('#assocWordAdd0').val() + '|' + $('#assocWordAdd1').val() + '|' + $('#assocWordAdd2').val() + '|' + $('#assocWordAdd3').val() +'|' + $('#assocWordAdd4').val();
				}
				var sopOpenApiupDateKeywordObj = new sop.openApi.updateKeyword.api();
				sopOpenApiupDateKeywordObj.addParam('SEARCH_WORD_OLD',$('#keywordOld').val());
				sopOpenApiupDateKeywordObj.addParam('SEARCH_WORD_NEW',$('#keywordAdd').val().replace(/(^\s*)|(\s*$)/g, ''));
				sopOpenApiupDateKeywordObj.addParam('REL_SEARCH_WORD',relWord);
				sopOpenApiupDateKeywordObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/DT/RELManage/updateREL.json"
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
	        				if(SEARCH_WORD.length>=2){
	        					$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));	        					
	        				}
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
		        			if($('#SEARCH_WORD').validatebox('isValid'))
		        			{
		        				if(SEARCH_WORD.length>=2){
		        					$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));		        					
		        				}
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
	queryParamsObj['SEARCH_TYPE'] = $('#SEARCH_TYPE').val();
	if(SEARCH_WORD.length >= 2){
		queryParamsObj['SEARCH_WORD'] = SEARCH_WORD;
	}
	return queryParamsObj;
}
//click one detail
function openModifyPopup(SEARCH_WORD, REL_SEARCH_WORD){
	SEARCH_WORD = decodeURIComponent(SEARCH_WORD);
	REL_SEARCH_WORD = decodeURIComponent(REL_SEARCH_WORD);	
	console.log(REL_SEARCH_WORD);
	//$('#validateButton_disabled').show();
	$('#keywordAdd').validatebox('disableValidation');
	$('#assocWordAdd0').validatebox('disableValidation');
	$('#assocWordAdd1').validatebox('disableValidation');
	$('#assocWordAdd2').validatebox('disableValidation');
	$('#assocWordAdd3').validatebox('disableValidation');
	$('#assocWordAdd4').validatebox('disableValidation');
	$('#validateTd').hide();
	$('#validateButton').hide();
	$('#addButton').hide();
	$('#addButtonDisabled').hide();
	$('#modifyButtonDisabled').show();
	$('#modifyButton').hide();
	$('#popTitle').text('상세정보');
	document.getElementById('popupForm').reset();
	
	$('.popupWrapper').css('display','block');
	$('#keywordAdd').focus();
	$('#assocWordAdd0').focus();
	$('#keywordAdd').focus();
	
	$('#keywordOld').html(SEARCH_WORD);
	$('#keywordOld').val($('#keywordOld').text());	

	$('#keywordAdd').html(SEARCH_WORD);
	$('#keywordAdd').val($('#keywordAdd').text());
	
	$('#assocWordOld').html(REL_SEARCH_WORD);
	$('#assocWordOld').val($('#assocWordOld').text());
	
	//$('#assocWordAdd0').html(REL_SEARCH_WORD);
	//$('#assocWordAdd0').val($('#assocWordAdd0').text());
	
	var tempAssocWord = REL_SEARCH_WORD.split('|');

	for(var i=0; i<5; i++) { 		
		$("#assocWordAdd"+i).val("");
		$("#assocWordAdd"+i).html(tempAssocWord[i]); 
		$("#assocWordAdd"+i).val(tempAssocWord[i]);
	}	
	
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