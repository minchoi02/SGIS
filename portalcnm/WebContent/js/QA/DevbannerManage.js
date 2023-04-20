/**   
 *
 * @JSName: boardManage
 * @Description: modify by liudandan  2014/11/17/ 17:00:00  
 *
 * @author: chenzhanchao   
 * @date: 2014/10/28/ 01:30:00    
 * @version V1.0      
 *    
 */
(function(W, D) {
	W.$boardManage = W.$boardManage || {};
	//get From URL
	//receive
	var searchWordType = getParameter('searchWordType');
	var searchWord = decodeURI(getParameter('searchWord'));
	var pageNumber = getParameter('pageNumber');
	var order = getParameter('order');
	var sort = getParameter('sort');
	var PRIORITY_DISP_YN = getParameter('PRIORITY_DISP_YN');
	//send
	var searchWordType_SEND = 'MANAGER_NM';
	var searchWord_SEND = '';
	var PAGENUMBER_SEND = 1;
	var ORDER_SEND = 'desc';
	var SORT_SEND = 'REG_TS';
	var PRIORITY_DISP_YN_SEND = 'ALL';
	//id of datagrid
	var id_datagrid = '#searchResultTable';
	$(document).ready(function(){
		srvLogWrite("L0", "03", "06", "01", "", "");
		//init page
		document.getElementById('resetForm').reset();
		$('#searchWord').validatebox({
			validType: 'cnmInput'
		});
		$('#noSearchResult').hide();
		if(searchWordType != null && searchWordType != false && searchWordType != ''){
			$('#searchWordType').val(searchWordType);
			if($('#searchWordType').val() == null){
				$('#searchWordType').val('MANAGER_NM');
			}
			if(searchWord != null && searchWord != false && searchWord != 'false' && searchWord != ''){
				$('#searchWord').val(searchWord);
			}
			if(PRIORITY_DISP_YN != null && PRIORITY_DISP_YN != false && searchWordType != ''){
				$('#PRIORITY_DISP_YN').val(PRIORITY_DISP_YN);
			}
			if($('#PRIORITY_DISP_YN').val() == null){
				$('#PRIORITY_DISP_YN').val('ALL');
			}
			if(pageNumber == null || pageNumber == false || pageNumber == '' || pageNumber < 1){
				pageNumber = 1;
			}
			if(order == null || order == false || order == '' || (order != 'asc' && order != 'desc')){
				order = 'desc';
			}
			if(sort == null || sort == false || sort == '' || (sort != 'POST_TITLE' && sort != 'MANAGER_NM' && sort != 'REG_TS')){
				sort = 'REG_TS';
			}
		} else{
			pageNumber = 1;
			order = 'desc';
			sort = 'REG_TS';
		}
		//click the search button
		$('#searchButton').click(function(){
			srvLogWrite("L0", "03", "06", "01", "", "");
			if($('#searchWord').validatebox('isValid')){
				$(id_datagrid).datagrid('load', getQueryParamsObj());
			}
		});
		//click the delete button
		$('#delButton').click(function(){
			srvLogWrite("L0", "03", "06", "04", "", "");
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
				getConfirmPopup('확인', '선택된 항목이 삭제됩니다. 실행하시겠습니까?', 'confirm');
				$('#ok_confirmPopup').click(function(){
					var POST_NO_List = new Array();
			    	for(var i = 0; i < row.length; i++){
			    		POST_NO_List[i] = row[i].POST_NO;
			    	}
			    	$boardManage.delData(POST_NO_List);
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
		//click the add board button
		$('#addButton').click(function(){
			srvLogWrite("L0", "03", "06", "02", "", "");
			location.href = './../QA/DevbannerAdd.html?searchWordType=' + searchWordType_SEND + "&searchWord=" + searchWord_SEND + "&pageNumber=" + PAGENUMBER_SEND + "&sort=" + SORT_SEND + "&order=" + ORDER_SEND + "&PRIORITY_DISP_YN=" + PRIORITY_DISP_YN_SEND;
		});
		$(id_datagrid).datagrid({
			loadMsg: '처리중 입니다, 기다리 십시요...',
			pagination: true,
		   	nowrap: false,
		   	checkOnSelect: false,
		   	pageNumber:pageNumber,
		   	sortName:sort,
			sortOrder:order,
		    columns:[[ 
		        {field:'checkbox',checkbox:true},
		        {field:'POST_NO',hidden:true}, 
		        {field:'R',title:'번호',align:'center',width:50},    
		        {field:'POST_TITLE',title:'제목',align:'left',width:335,sortable:true,order:'desc',
		        	formatter: function(value, row, index){
		        		
		        		if(value != null && value != ''){
		        			value ="<a href='../QA/DevbannerDetail.html?POSTNO="+ row.POST_NO + "&searchWordType=" + searchWordType_SEND + "&searchWord=" + searchWord_SEND + "&pageNumber=" + PAGENUMBER_SEND + "&sort=" + SORT_SEND + "&order=" + ORDER_SEND + "&PRIORITY_DISP_YN=" + PRIORITY_DISP_YN_SEND +"' style='color:#4a4a4a;' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value; 
		        			if(row.FILE_YN=="Y"){
			        			value += "  <img src='./../include/img/ico/ico_folder.png'/></a>";
			        		} else if(row.FILE_YN=="N"){
			        			value += "</a>";
			        		}
		        		}
		        		return value;
					}},
				{field:'PRIORITY_DISP_YN',title:'우선표출 여부',align:'center',width:95,sortable:true,order:'desc',
				 	formatter: function(value, row, index){
		        		if(value != null && value == 'Y')
		        			value="네";
		        		else
		        			value="아니오";
		        		return value;
				}},		
		        {field:'MANAGER_NM',title:'작성자',align:'center',width:120,sortable:true,order:'desc',},    
		        {field:'REG_TS',title:'등록일',align:'center',width:117,sortable:true,order:'desc',},
		    ]],
		    queryParams: getQueryParamsObj(),
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
			onLoadError: function(){
		    	getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
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
					        layout: ['first', 'prev', 'links', 'next', 'last'],
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
				if(param.PRIORITY_DISP_YN){
					PRIORITY_DISP_YN_SEND = param.PRIORITY_DISP_YN;
				} else{
					PRIORITY_DISP_YN_SEND = 'ALL';
				}
				if(param.POST_TITLE){
					searchWordType_SEND = 'POST_TITLE';
					searchWord_SEND = param.POST_TITLE;
				} else if(param.POST_CONTENT){
					searchWordType_SEND = 'POST_CONTENT';
					searchWord_SEND = param.POST_CONTENT;
				} else if(param.MANAGER_NM){
					searchWordType_SEND = 'MANAGER_NM';
					searchWord_SEND = param.MANAGER_NM;
				} else {
					searchWordType_SEND = 'MANAGER_NM';
					searchWord_SEND = '';
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
			url:contextPath +"/ServiceAPI/QA/DevfaqManage/searchBanner.json"
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
	$boardManage = {
			delData : function(POST_NO_List) {
				var sopOpenApiDelDatatObj = new sop.openApi.delData.api();
				sopOpenApiDelDatatObj.addParam('POST_NO_List', POST_NO_List);
				sopOpenApiDelDatatObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/QA/DevfaqManage/delBanner.json"
			    });
			}
	};
	(function() {
	    $class("sop.openApi.delData.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	            if(res.errCd == "0") { 
	            	var result = res.result;
	            	if(result != null){
	            		getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(function(){
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function(){
							confirmPopupRemove();
						});
	            		if($('#searchWord').validatebox('isValid')){
	        				$(id_datagrid).datagrid('load', getQueryParamsObj());
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
	if($('#searchWord').val().replace(/(^\s*)|(\s*$)/g, '').length > 0){
		queryParamsObj[$('#searchWordType').val()] = $('#searchWord').val().replace(/(^\s*)|(\s*$)/g, '');
	}
	queryParamsObj['PRIORITY_DISP_YN'] = $('#PRIORITY_DISP_YN').val();
	return queryParamsObj;
}