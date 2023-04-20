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
	W.$reqBoard = W.$reqBoard || {};
	
	$reqBoard.searchJson = {};
	
	var id_datagrid = '#searchResultTable';
	
	$(document).ready(function(){
		srvLogWrite("L0", "05", "03", "01", "", "");
		var pageNumber = getParameter('pageNumber');
		var order = getParameter('order');
		var sort = getParameter('sort');
		
		$reqBoard.pageNumber = ( pageNumber ? pageNumber : 1 );
		$reqBoard.order = ( order ? order : 'DESC' );
		$reqBoard.sort = ( sort ? sort : 'REQ_SEQ' );
		
		document.getElementById('resetForm').reset();
		
		//기간
		var today = new Date();
		today.setDate(today.getDate()-10);
		var pre10Day = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
		
		today = new Date();
		today.setDate(today.getDate());
		var pre1Day = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
		
		$('#REQ_STARTDATE').val(pre10Day);
		$('#REQ_ENDDATE').val(pre1Day);
		$('#REQ_STARTDATE').datepicker(getDatepickerObj('start', 'daily'));
		$('#REQ_ENDDATE').datepicker(getDatepickerObj('end', 'daily'));
		
		$('#noSearchResult').hide();
		
		$reqBoard.getCommonCode('REQ_DIV_CD', 'COM038');
		$reqBoard.getCommonCode('REQ_PRGRS_STATS_CD', 'COM039');
		
		//검색조건 셋팅
		$.each( $("#searchTable").find('input,select'), function(a,b){
			var id = $(b).attr('id');
			var val = getParameter( id );
			
			if( val != null && val != '' && ( typeof val != 'undefined' ) && val != 'undefined' ){
				if( id == 'searchWord' ){
					val = decodeURI( val );
				}
				$(b).val( val );
			}
		});
		
		//검색 버튼 클릭
		$('#searchButton').click(function(){
			srvLogWrite("L0", "05", "03", "01", "", "");
			if( $('#REQ_STARTDATE').val().replace(/-/gi, '') > $('#REQ_ENDDATE').val().replace(/-/gi, '') ){
				getConfirmPopup('알림', '시작일자보다 종료일자가 큽니다.', 'alert');
				$('#ok_alertPopup,#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			}
			$(id_datagrid).datagrid('load', getQueryParamsObj());
		});
		
		//추가 버튼 클릭
		$('#addButton').click(function(){
			srvLogWrite("L0", "05", "03", "02", "", "");
			location.href = './../QA/reqBoardDetail.html?' + "REQ_SEQ=0&" + jsonToSearchParameter( $reqBoard.searchJson );
		});
		
		//엑셀 버튼 클릭
		$("#excelButton").click(function(){
			srvLogWrite("L0", "05", "03", "04", "", "");
			if( $("#searchResultTable").datagrid('getRows').length <= 0 ){
				getConfirmPopup('알림', '출력할 데이터가 없습니다.', 'alert');
				$('#ok_alertPopup,#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			} else {
				location.href = '../../ServiceAPI/QA/ReqBoard/getReqBoardListExcel.excel?' + jsonToSearchParameter( $reqBoard.searchJson );
			}
		});
		
		//차트 버튼 클릭
		$("#statsButton").click(function(){
			srvLogWrite("L0", "05", "03", "05", "", "");
			location.href = './../QA/reqBoardChart.html?' + jsonToSearchParameter( $reqBoard.searchJson );
		});
		
		//삭제 버튼 클릭
		$('#delButton').click(function(){
			srvLogWrite("L0", "05", "03", "03", "", "");
			var row = $(id_datagrid).datagrid('getChecked');
			
			if (row == null || row.length == 0) {
				getConfirmPopup('알림', '선택된 데이터가 없습니다. 다시 선택해 주세요.', 'alert');
				$('#ok_alertPopup,#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			} else if (row.length >= 1) {
				getConfirmPopup('확인', '선택된 항목이 삭제됩니다. 실행하시겠습니까?', 'confirm');
				$('#ok_confirmPopup').click(function(){
					var req_list = new Array();
			    	for(var i = 0; i < row.length; i++){
			    		req_list[i] = row[i].REQ_SEQ;
			    	}
			    	$reqBoard.delData( req_list );
					confirmPopupRemove();
				});
				$('#cancel_confirmPopup,#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			}
		});
		
		$(id_datagrid).datagrid({
			loadMsg: '처리중 입니다, 기다리 십시요...',
			pagination: true,
		   	nowrap: false,
		   	checkOnSelect: false,
		   	pageNumber:$reqBoard.pageNumber,
		   	sortName:$reqBoard.sort,
			sortOrder:$reqBoard.order,
		    columns:[[ 
				{field:'checkbox', 
					formatter: function(value, row, index){
						value = '';
						//체크박스 진행상태 요청일 경우에만 생성
						if( row.REQ_PRGRS_STATS_CD == '01' ){
							value = '<div style="" class="datagrid-cell-check"><input type="checkbox" name="checkbox" value=""></div>';
						} else {
							value = '<div style="" class="datagrid-cell-check"></div>';
						}
						return value;
					}},
				{field:'REQ_SEQ',				hidden:"true"}, 
				{field:'REQ_PRGRS_STATS_cD',	hidden:"true"},
				{field:'RNUM',					title:'번호',		align:'center',		width:50},    
				{field:'REQ_TITLE',				title:'제목',		align:'left',		width:300,		sortable:true,		order:'desc',
					formatter: function(value, row, index){
						if(value != null && value != ''){
							var parameters = "REQ_SEQ=" + row.REQ_SEQ + jsonToSearchParameter( $reqBoard.searchJson );
							value ="<a href='./reqBoardDetail.html?"+ parameters +"' style='color:#4a4a4a;' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value; 
						}
						return value;
					}},
				{field:'REQ_DIV_CD_NM',			title:'작업구분',		align:'center',		width:85,		sortable:true,		order:'desc'},
				{field:'REQ_PRGRS_STATS_CD_NM',	title:'진행상태',		align:'center',		width:85,		sortable:true,		order:'desc',
					formatter: function(value, row, index){
						if(value != null && value != ''){
							var color = '';
							
							switch( row.REQ_PRGRS_STATS_CD ){
								case "01" : color = "red"; break;
								case "02" : color = "green"; break;
								case "03" : color = "red"; break;
								case "04" : color = "blue"; break;
								case "05" : color = "green"; break;
								case "06" : color = "red"; break;
								case "07" : color = "blue"; break;
								default : color = "#666";
							}
							
							value = '<span style="color:'+ color +'">'+value+'</span>';
						}
						return value;
					}},
				{field:'REQ_USER_NM',			title:'작성자',			align:'center',		width:80,		sortable:true,		order:'desc'},    
				{field:'REQ_DT',				title:'요청일',			align:'center',		width:100,		sortable:true,		order:'desc'}
		    ]],
		    queryParams: getQueryParamsObj(),
			onLoadError: function(){
		    	getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup,#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			},
			onLoadSuccess: function(data){
				var total = data.total;
				var pageSize = $(page).pagination('options').pageSize;
				
				var layout = [];
				
				if(total < 1){
					$('#noSearchResult').show();
				} else{
					$('#noSearchResult').hide();
					if(Math.ceil(total / pageSize) > 5){
						layout = ['first', 'prev', 'links', 'next', 'last'];
					} else if(Math.ceil(total / pageSize) <= 5){
						layout = ['links'];
					}
				}
				
				$(page).pagination({ 
			        pageSize: 10,
			        displayMsg: '',
			        showPageList: false,
			        showRefresh: false,
			        layout: layout,
			        links: 5
				});
			},
			onBeforeLoad: function(param){
				$reqBoard.pageNumber = param.page;
				$reqBoard.sort = param.sort;
				$reqBoard.order = param.order;
					
				$('#noSearchResult').hide();
			},
			loadFilter: function(data){
				if(data.rows == null){
					if(data.errCd == -1){
						getConfirmPopup('알림', data.errMsg, 'alert');
						$('#ok_alertPopup,#close_confirmPopup').click(function(){
							confirmPopupRemove();
						});
					}
					data.rows = new Array();
				} 
				return data;
			},
			url:contextPath +"/ServiceAPI/QA/ReqBoard/searchReqBoard.json"
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
	
	$reqBoard = {
			delData : function( REQ_SEQ_LIST ) {
				var sopOpenApiDelDatatObj = new sop.openApi.delData.api();
				sopOpenApiDelDatatObj.addParam('REQ_SEQ_LIST', REQ_SEQ_LIST);
				
				sopOpenApiDelDatatObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/QA/ReqBoard/delReqBoard.json"
			    });
			},
			getCommonCode : function ( selId, B_CLASS_CD ) {
				var sopOpenApiReqCommonCodeObj = new sop.openApi.reqCommonCode.api();
				sopOpenApiReqCommonCodeObj.addParam('B_CLASS_CD', B_CLASS_CD);
				sopOpenApiReqCommonCodeObj.addParam('selId', selId);
				
				sopOpenApiReqCommonCodeObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/QA/ReqBoard/getCodeList.json"
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
	            		
						$('#ok_alertPopup,#close_confirmPopup').click(function(){
							confirmPopupRemove();
						});
						$("#searchButton").click();
	            	}
	            } else {
	                getConfirmPopup('알림', res.errMsg, 'alert');
	                
					$('#ok_alertPopup,#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
	            }
	        },
	        onFail : function(status) {
	            getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
	            
				$('#ok_alertPopup,#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
	        }
	    });
	    
	    $class("sop.openApi.reqCommonCode.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						
						var html = '<option value="">전체</option>';
						
						$.each( result.BCodeList, function( a,b ){
							html += '<option value="'+b.S_CLASS_CD+'">'+b.S_CLASS_CD_NM+'</option>';
						});
						$( "#"+ result.selId ).html( html );
						
						
					}
				}
				else {
					getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup,#close_confirmPopup').click(function () {
						confirmPopupRemove();
					});
				}
			},
			onFail : function (status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup,#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
			}
		});
	}());
}(window, document));

//create query parameters for datagrid
function getQueryParamsObj(){
	var queryParamsObj = new Object();
	
	$.each( $("#searchTable").find('input,select'), function(a,b){
		if( $(b).val() != null && $(b).val() != '' ){
			queryParamsObj[ $(b).attr('id') ] = $(b).val().replace(/(^\s*)|(\s*$)/g, '');
		}
	});
	
	$reqBoard.searchJson = queryParamsObj;
	
	return queryParamsObj;
}

function jsonToSearchParameter( obj ){
	var parameter = '';
	
	$.each( obj, function( a,b,c ){
		parameter += ( '&' + a + '=' + b );
	});
	
	parameter += ('&sort=' + $reqBoard.sort + '&order=' + $reqBoard.order + '&pageNumber=' + $reqBoard.pageNumber);
	
	return parameter;
}














