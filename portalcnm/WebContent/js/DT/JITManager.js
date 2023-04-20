/**   
 *
 * @JSName: JITManager
 * @Description: 
 *
 * @author: liudandan   
 * @date: 2014/10/23/ 14:00:00    
 * @version V1.0      
 *    
 */
//get From URL
	//receive
	var ACTIVE_YN = getParameter('ACTIVE_YN');
	var API_B_CLASS_CD = getParameter('API_B_CLASS_CD');
	var API_B_CLASS_NM = decodeURI(getParameter('API_B_CLASS_NM'));
	var keywordInput = decodeURI(getParameter('keywordInput'));
	var pageNumber = getParameter('pageNumber');
	var order = getParameter('order');
	var sort = getParameter('sort');
	var firstFlag = false;
(function(W, D) {
	W.$JITManager = W.$JITManager || {};
	//send
	var ACTIVE_YN_SEND = 'ALL';
	var API_B_CLASS_CD_SEND = 'ALL';
	var API_B_CLASS_NM_SEND = '전체';
	var keywordInput_SEND = '';
	var PAGENUMBER_SEND = 1;
	var ORDER_SEND = 'desc';
	var SORT_SEND = 'REG_TS';
	//id of datagrid
	var id_datagrid = '#searchResultTable';
	$(document).ready(function(){
		//page init
		document.getElementById('selectForm').reset();
		$('#noSearchResult').hide();
		//request keyword select
		$JITManager.reqKeyWord();
		//set keyword input empty
		$('#keywordInput').val('');
		if(ACTIVE_YN != null && ACTIVE_YN != false && ACTIVE_YN != ''){
			firstFlag = true;
			$('#ACTIVE_YN').val(ACTIVE_YN);
			if($('#ACTIVE_YN').val() == null){
				$('#ACTIVE_YN').val('ALL');
			}
			if(pageNumber == null || pageNumber == false || pageNumber == '' || pageNumber < 1){
				pageNumber = 1;
			}
			if(order == null || order == false || order == '' || (order != 'asc' && order != 'desc')){
				order = 'desc';
			}
			if(sort == null || sort == false || sort == '' || (sort != 'NM' && sort != 'REG_MEMBER_ID' && sort != 'REG_TS')){
				sort = 'REG_TS';
			}
		} else{
			pageNumber = 1;
			order = 'desc';
			sort = 'REG_TS';
		}
		$('#API_B_CLASS_NM').change(function(){
			if($('#API_B_CLASS_NM').val()=='ALL'){
				$('#keywordInput').show();
			} else{
				$('#keywordInput').hide();
				$('#keywordInput').val('');
			}
		});
		//click the search button
		$('#searchButton').click(function(){
			if($('#keywordInput').validatebox('isValid')){
				$(id_datagrid).datagrid('load', getQueryParamsObj());
			}else{
				
			}
		});
		//click the add JIT button
		$('#addJITButton').click(function(){
			location.href = './../DT/addJIT.html?ACTIVE_YN=' + ACTIVE_YN_SEND + '&API_B_CLASS_CD=' + API_B_CLASS_CD_SEND + '&API_B_CLASS_NM=' + API_B_CLASS_NM_SEND + '&keywordInput=' + keywordInput_SEND + '&pageNumber=' + PAGENUMBER_SEND + '&sort=' + SORT_SEND + '&order=' + ORDER_SEND;
		});
		$('#keywordInput').validatebox({
			required: false,
			validType:['cnmInput']
		});
		//click the delete JIT button
		$('#delJITButton').click(function(){
			var row = $(id_datagrid).datagrid('getChecked');
			if (row == null || row.length == 0) {
				getConfirmPopup('알림', '선택된 데이터가 없습니다. 다시 선택해 주세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			} else if (row.length >= 1) {
				var activeFlag = false;
				var API_B_CLASS_CD_List = new Array();
				var API_M_CLASS_CD_List = new Array();
				var SEQ_List = new Array();
				for(var i = 0; i < row.length; i++){
					if(row[i].ACTIVE_YN == 'Y'){
						activeFlag = true;
						break;
					}
					API_B_CLASS_CD_List[i] = row[i].API_B_CLASS_CD;
					API_M_CLASS_CD_List[i] = row[i].API_M_CLASS_CD;
					SEQ_List[i] = row[i].SEQ;
				}
				//find one active JIT at least 
				if(activeFlag == true){
					getConfirmPopup('알림', '상태가 활성인 예제는 삭제할 수 없습니다.', 'alert');
					$('#ok_alertPopup').click(function(){
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
				} else if(activeFlag == false){
					//no active JIT
					getConfirmPopup('확인', '선택된 항목이 삭제됩니다. 삭제하시겠습니까?', 'confirm');
					$('#ok_confirmPopup').click(function(){
						$JITManager.delJIT(API_B_CLASS_CD_List,API_M_CLASS_CD_List,SEQ_List);
						confirmPopupRemove();
					});
					$('#cancel_confirmPopup').click(function(){
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
				}
			}
		});
		//click the active JIT button
		$('#activeJITButton').click(function(){
			var row = $(id_datagrid).datagrid('getChecked');
			if (row == null || row.length == 0) {
				getConfirmPopup('알림', '선택된 데이터가 없습니다. 다시 선택해 주세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			} else if (row != null && row.length >= 1) {
				var API_B_CLASS_CD_List = new Array();
				var API_M_CLASS_CD_List = new Array();
				var SEQ_List = new Array();
				var ACTIVE_YN_List = new Array();
				for(var i = 0; i < row.length; i++){
					API_B_CLASS_CD_List[i] = row[i].API_B_CLASS_CD;
					API_M_CLASS_CD_List[i] = row[i].API_M_CLASS_CD;
					SEQ_List[i] = row[i].SEQ;
					ACTIVE_YN_List[i] = 'Y';
				}
				$JITManager.updateActiveJIT(API_B_CLASS_CD_List, API_M_CLASS_CD_List, SEQ_List, ACTIVE_YN_List);
			}
		});
		//click the not active JIT button
		$('#notActiveJITButton').click(function(){
			var row = $(id_datagrid).datagrid('getChecked');
			if (row == null || row.length == 0) {
				getConfirmPopup('알림', '선택된 데이터가 없습니다. 다시 선택해 주세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			} else if (row != null && row.length >= 1) {
				var API_B_CLASS_CD_List = new Array();
				var API_M_CLASS_CD_List = new Array();
				var SEQ_List = new Array();
				var ACTIVE_YN_List = new Array();
				for(var i = 0; i < row.length; i++){
					API_B_CLASS_CD_List[i] = row[i].API_B_CLASS_CD;
					API_M_CLASS_CD_List[i] = row[i].API_M_CLASS_CD;
					SEQ_List[i] = row[i].SEQ;
					ACTIVE_YN_List[i] = 'N';
				}
				$JITManager.updateActiveJIT(API_B_CLASS_CD_List, API_M_CLASS_CD_List, SEQ_List, ACTIVE_YN_List);
			}
		
		});
		//search result
		$(id_datagrid).datagrid({
			loadMsg: '처리중 입니다, 기다리 십시요...',
			pagination: true,
		   	nowrap: false,
		   	checkOnSelect: false,
		   	sortName: sort,
		   	sortOrder: order,
		   	pageNumber: pageNumber,
		    columns:[[ 
	            {field:'API_B_CLASS_CD',hidden: true},
	            {field:'API_M_CLASS_CD',hidden: true},
	            {field:'SEQ',hidden: true},
	            {field:'SRV_ATTR',hidden: true},
	            {field:'checkbox',checkbox: true},
		        {field:'R',title:'번호',align:'center',width:50}, 
		        {field:'API_B_CLASS_NM',title:'카테고리',align:'center',width:70},
		        {field:'NM',title:'예제',align:'left',width:328,sortable:true,order:'desc',
		        	formatter: function(value,row,index){
						if(value != null && value != ''){
							return "<a href='./../DT/JITInfo.html?API_B_CLASS_CD=" + row.API_B_CLASS_CD + "&API_M_CLASS_CD=" + row.API_M_CLASS_CD + "&SEQ=" + row.SEQ + "&SRV_ATTR=" + row.SRV_ATTR + "&ACTIVE_YN=" + ACTIVE_YN_SEND + "&API_B_CLASS_CD_SEND=" + API_B_CLASS_CD_SEND + "&API_B_CLASS_NM=" + API_B_CLASS_NM_SEND + "&keywordInput=" + keywordInput_SEND + "&pageNumber=" + PAGENUMBER_SEND + "&sort=" + SORT_SEND + "&order=" + ORDER_SEND + "' style='color:#4a4a4a;' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
						} else return value;
					}
		        },
		        {field:'ACTIVE_YN',title:'상태',align:'center',width:60,
		        	formatter: function(value,row,index){
						if(value == 'Y'){
							return '활성';
						} else if(value == 'N'){
							return '비활성';
						} 
					}
		        },
		        {field:'REG_MEMBER_ID',title:'등록자',align:'center',width:109,sortable:true,order:'desc'},
		        {field:'REG_TS',title:'등록일',align:'center',width:100,sortable:true,order:'desc'}
		    ]],
		   	queryParams: getQueryParamsObj(),
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
				if(param.page){
					PAGENUMBER_SEND = param.page;
				} else{
					PAGENUMBER_SEND = 1;
				}
				if(param.sort){
					SORT_SEND = param.sort;
				} else{
					SORT_SEND = 'REG_TS';
				}
				if(param.order){
					ORDER_SEND = param.order;
				} else{
					ORDER_SEND = 'desc';
				}
				if(param.ACTIVE_YN){
					ACTIVE_YN_SEND = param.ACTIVE_YN;
				} else{
					ACTIVE_YN_SEND = 'ALL';
				}
				if(param.API_B_CLASS_NM){
					if($('#API_B_CLASS_NM').val() == 'ALL'){
						API_B_CLASS_NM_SEND = '전체';
						API_B_CLASS_CD_SEND = 'ALL';
						keywordInput_SEND = param.API_B_CLASS_NM;
					}
					else{
						API_B_CLASS_NM_SEND = param.API_B_CLASS_NM;
						API_B_CLASS_CD_SEND = $('#API_B_CLASS_NM').val();
						keywordInput_SEND = '';
					}
				} else{
					API_B_CLASS_CD_SEND = 'ALL';
					API_B_CLASS_NM_SEND = '전체';
					keywordInput_SEND = '';
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
			url:contextPath +"/ServiceAPI/DT/JITManage/searchJIT.json"
		});
		//pagination of datagrid
		var page = $(id_datagrid).datagrid('getPager');  
		 $(page).pagination({
		        pageSize: 10,
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
			if($('#confirmPopup').css('display') == 'block'){
				return false;
			} else{
				$('#searchButton').click();
				return false;
			}
		}
	});
	$JITManager = {
			//request keyword
			reqKeyWord : function() {
				var sopOpenApiReqKeyWordObj = new sop.openApi.reqKeyWord.api();
				sopOpenApiReqKeyWordObj.addParam('CLASSTYPE', 'B');
				sopOpenApiReqKeyWordObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/COMMON/getAPIClass.json"
			    });
			},
			//delete JIT
			delJIT : function(API_B_CLASS_CD_List,API_M_CLASS_CD_List,SEQ_List) {
				var sopOpenApiDelJITObj = new sop.openApi.delJIT.api();
				sopOpenApiDelJITObj.addParam('API_B_CLASS_CD_List', API_B_CLASS_CD_List);
				sopOpenApiDelJITObj.addParam('API_M_CLASS_CD_List', API_M_CLASS_CD_List);
				sopOpenApiDelJITObj.addParam('SEQ_List', SEQ_List);
				sopOpenApiDelJITObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/DT/JITManage/deleteJIT.json"
			    });
			},
			//update the active state of JIT
			updateActiveJIT : function(API_B_CLASS_CD_List,API_M_CLASS_CD_List,SEQ_List,ACTIVE_YN_List) {
				var sopOpenApiUpdateActiveJITObj = new sop.openApi.updateActiveJIT.api();
				sopOpenApiUpdateActiveJITObj.addParam('API_B_CLASS_CD_List', API_B_CLASS_CD_List);
				sopOpenApiUpdateActiveJITObj.addParam('API_M_CLASS_CD_List', API_M_CLASS_CD_List);
				sopOpenApiUpdateActiveJITObj.addParam('SEQ_List', SEQ_List);
				sopOpenApiUpdateActiveJITObj.addParam('ACTIVE_YN_List', ACTIVE_YN_List);
				sopOpenApiUpdateActiveJITObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/DT/JITManage/updateActive.json"
			    });
			}
	};
	//request keyword
	(function() {
	    $class("sop.openApi.reqKeyWord.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	        	var result = res.result;
	            if(res.errCd == "0") { 
	            	if(result != null){
	            		if(result != ''){
	            			for(var i=0;i<result.length;i++){
		            			$('#API_B_CLASS_NM').append("<option value='" + result[i].API_B_CLASS_CD + "'>"+result[i].API_B_CLASS_NM + "</option>");
		            		}
	            			if(API_B_CLASS_CD != null && API_B_CLASS_CD != false && API_B_CLASS_CD != ''){
	            				if(API_B_CLASS_CD == 'ALL'){
	            					$('#API_B_CLASS_NM').val(API_B_CLASS_CD);
	            					if(keywordInput != null && keywordInput != false && keywordInput != 'false' && keywordInput != ''){
	            						$('#keywordInput').val(keywordInput);
	            					}
	            				} else {
	            					$('#API_B_CLASS_NM').val(API_B_CLASS_CD);
	            					if($('#API_B_CLASS_NM').val() == null){
	            						$('#API_B_CLASS_NM').val('ALL');
	            					}
	            				}
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
	//delete JIT
	(function() {
	    $class("sop.openApi.delJIT.api").extend(sop.cnm.absAPI).define({
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
	    				$("#keywordInput").val('');
	    				if($('#keywordInput').validatebox('isValid')){
	    					$(id_datagrid).datagrid('load', getQueryParamsObj());
	    				}
	            	}
	            } else {
	                getConfirmPopup('알림',res.errMsg, 'alert');
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
	//update the active state of JIT
	(function() {
	    $class("sop.openApi.updateActiveJIT.api").extend(sop.cnm.absAPI).define({
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
	            		if(result.success == true){
	            			if($('#keywordInput').validatebox('isValid')){
	            				$(id_datagrid).datagrid('load', getQueryParamsObj());
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
function getQueryParamsObj(){
	var queryParamsObj = new Object();
	if(firstFlag == true){
		if(ACTIVE_YN != null && ACTIVE_YN != false && ACTIVE_YN != '' && ACTIVE_YN != 'ALL'){
			queryParamsObj['ACTIVE_YN'] = ACTIVE_YN;
		}
		if(API_B_CLASS_CD != null && API_B_CLASS_CD != false && API_B_CLASS_CD != ''){
			if(API_B_CLASS_CD == 'ALL'){
				// 2016. 03. 25 j.h.Seok
				if(keywordInput != null && keywordInput != false && keywordInput != '' && keywordInput.replace(/(^\s*)|(\s*$)/g, '').length > 0){
					queryParamsObj['API_B_CLASS_NM'] = keywordInput.replace(/(^\s*)|(\s*$)/g, '');
				}
			} else{
				if(API_B_CLASS_NM != null && API_B_CLASS_NM != false && API_B_CLASS_NM != 'false' && API_B_CLASS_NM != ''){
					queryParamsObj['API_B_CLASS_NM'] = API_B_CLASS_NM.replace(/(^\s*)|(\s*$)/g, '');
				}
			}
		}
		firstFlag = false;
	} else{
		if($('#ACTIVE_YN').val() != 'ALL'){
			queryParamsObj['ACTIVE_YN'] = $('#ACTIVE_YN').val();
		}
		if( $('#API_B_CLASS_NM').val() == 'ALL'){
			if($('#keywordInput').val().replace(/(^\s*)|(\s*$)/g, '').length > 0){
				queryParamsObj['API_B_CLASS_NM'] = $('#keywordInput').val().replace(/(^\s*)|(\s*$)/g, '');
			}
		} else{
			queryParamsObj['API_B_CLASS_NM'] = $('#API_B_CLASS_NM').find("option:selected").text();
		}
	}
	return queryParamsObj;
}