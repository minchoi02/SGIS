 /**   
 * @JSName: upLoadDataDetail
 * @Description: modify by liudandan  2014/11/14/ 14:00:00 
 *
 * @author: chenzhanchao  
 * @date: 2014/10/23/ 14:00:00     
 * @version V1.0      
 */
var userId = getParameter('USER_ID');	
(function(W, D) {
	W.$upLoadDataDetail = W.$upLoadDataDetail || {};
	//id of datagrid
	
	var id_datagrid = '#searchResultTable';
	$(document).ready(function() {
		
		//init page when loading
		$('#SEARCH_WORD').val('');
		$('#SHARE_YN').val('ALL');
		$('#SEARCH_DIV').val('ALL');
		
		$('#noSearchResult').hide();
		//$('#endDt').datepicker(getDatepickerObj('end', 'daily'));
		$('#endDt').datepicker(getDatepickerObjDay());
		$('#endDt').focus(function() {
			$(".ui-datepicker-calendar").show();
		});
		$('#endDt').click(function () {
			$(".ui-datepicker-calendar").show();
		});
		//if ($.fn.validatebox){
		//	$.fn.validatebox.defaults.missingMessage = '이 입력 항목은 필수 입력 항목 입니다.';
		//	$.fn.validatebox.defaults.rules.length.message = '입력 길이는 필수{0}와{1} 사이.';
		//}		
		//$('#SEARCH_WORD').validatebox({
		//	required: false,
		//	validType:['length[1,25]','cnmInput']
		//});
		//click the search button
		$('#searchButton').click(function(){	
			var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');	
			//$('#SEARCH_WORD').validatebox('enableValidation');
			/*if($('#SEARCH_WORD').validatebox('isValid'))
			{*/
				if(SEARCH_WORD.length>=2){
					$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));	
				}else if(SEARCH_WORD.length==0){
					$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));
				}else {
					alert("검색어는 두자리 이상으로 입력하여야 검색할 수 있습니다.");
					$('#SEARCH_WORD').focus();
				}
			//}
		});
		//click the list button
		$('#toListButton').click(function() {
			location.href = "./../AK/UPLOADData.html";
		});
		//click the modify button
		$('#modifyButton').click(function(){
			$upLoadDataDetail.updateData();
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
					var delList = new Array();
			    	for(var i = 0; i < row.length; i++){
			    		delList[i] = encodeURIComponent(row[i].DATA_ID);
			    	}
			    	console.log("delList",delList);
			    	$upLoadDataDetail.delData(delList);
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
		        {field:'checkbox',checkbox: true},
				{field:'DATA_TITLE',title:'데이터 제목',align:'center',width:167,
		        	formatter: function(value,row,index){	
		        		var DATA_ID = encodeURIComponent((row.DATA_ID));
						var DATA_TITLE = encodeURIComponent((row.DATA_TITLE));
						var USR_NM = encodeURIComponent((row.USR_NM));
						var USR_ID = encodeURIComponent((row.USR_ID));
						var UPLOAD_DT = encodeURIComponent((row.UPLOAD_DT));
						var GRANT_DT = encodeURIComponent((row.GRANT_DT));
						var END_DT = encodeURIComponent((row.END_DT));
						var SHARE_YN = encodeURIComponent((row.SHARE_YN));
						var FILE_NM_REAL = encodeURIComponent((row.FILE_NM_REAL));
						var FILE_PATH = encodeURIComponent((row.FILE_PATH));
						var FILE_NM_LOGIC = encodeURIComponent((row.FILE_NM_LOGIC));
						var USE_HISTORY = encodeURIComponent((row.USE_HISTORY));
						if (value != null && value != ''){
							return "<a onclick='openModifyPopup(\""+ DATA_ID+"\",\""+DATA_TITLE+"\",\""+USR_NM+"\",\""+USR_ID+"\",\""+UPLOAD_DT+"\",\""+GRANT_DT+"\",\""+END_DT+"\",\""+SHARE_YN+"\",\""+FILE_NM_REAL+"\",\""+FILE_PATH+"\",\""+FILE_NM_LOGIC+"\",\""+USE_HISTORY+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
						} else {
							return value;
						}
					}			
				}, 
				{field:'UPLOAD_DT',title:'업로드 일자',align:'center',width:150}, 
				{field:'START_DT',title:'데이터 허용 시작일',align:'center',width:150}, 
				{field:'END_DT',title:'데이터 허용 종료일',align:'center',width:150}, 
				{field:'SHARE_YN',title:'공유 유무',align:'center',width:100,
					formatter : function (value, row, index) {
						if (value != null && value == 'Y')
							value = "승인";
						else if (value != null && value == 'N')
							value = "미승인";
						else if (value != null && value == 'W')
							value = "승인대기";
						else
							value = "";
						return value;
					}
				} 
		    ]],
		    queryParams: {
		    	USER_ID:userId,
		    	SHARE_YN:$('#SHARE_YN').val(),
		    	SEARCH_DIV:$('#SEARCH_DIV').val()
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
				
				//
				$('#divUsrNm').html(data.usrnm);
				$('#divUsrId').html(data.usrid);
				$('#divActiveMB').html((data.activemb / (1024*1024)).toFixed(2));
				$('#divTotalMB').html((data.totalmb / (1024*1024)).toFixed(2));
				
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
			url:contextPath +"/ServiceAPI/AK/UPLOADData/searchUserData.json"
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
	$upLoadDataDetail = {
			delData : function(delList) {
				var sopOpenApiDelDatatObj = new sop.openApi.delData.api();
				sopOpenApiDelDatatObj.addParam('delList', delList);
				sopOpenApiDelDatatObj.request({
			        method : "POST",
			        async : false,
			        url:contextPath +"/ServiceAPI/AK/UPLOADData/deleteUserData.json"
			    });
			},			
			updateData : function(){
				var sopOpenApiupDateAccessObj = new sop.openApi.updateData.api();
				sopOpenApiupDateAccessObj.addParam('DATA_ID',$('#dataId').val());
				sopOpenApiupDateAccessObj.addParam('END_DT',$('#endDt').val());
				sopOpenApiupDateAccessObj.addParam('SHARE_YN',$('#shareYn').val());
				sopOpenApiupDateAccessObj.addParam('SHARE_YN_OLD',$('#shareYnOld').val());
				sopOpenApiupDateAccessObj.addParam('USE_HISTORY',$('#useYn').val());
				sopOpenApiupDateAccessObj.request({
			        method : "POST",
			        async : false,
			        url:contextPath +"/ServiceAPI/AK/UPLOADData/updateUserData.json"
			    });
			}
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
	    				//$('#SEARCH_WORD').val('');
	        			//if($('#SEARCH_WORD').validatebox('isValid'))
	        			//{
	        				$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));
	        			//}
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
	    $class("sop.openApi.updateData.api").extend(sop.cnm.absAPI).define({
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
	// download file
	(function() {
		$class("sop.openApi.downloadFile.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				if (res.errCd == "0") {
					var result = res.result;
					if (result != null) {
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(function() {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function() {
							confirmPopupRemove();
						});
					}
				} else {
					getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup').click(function() {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function() {
						confirmPopupRemove();
					});
				}
			},
			onFail : function(status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function() {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function() {
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
	queryParamsObj['USER_ID'] = userId;
	queryParamsObj['SHARE_YN'] = $('#SHARE_YN').val();
	queryParamsObj['SEARCH_DIV'] = $('#SEARCH_DIV').val();
	
	return queryParamsObj;
}

//click one detail
function openModifyPopup(DATA_ID, DATA_TITLE, USR_NM, USR_ID, UPLOAD_DT, GRANT_DT, END_DT, SHARE_YN, FILE_NM_REAL, FILE_PATH, FILE_NM_LOGIC,USE_HISTORY){
	DATA_ID = decodeURIComponent(DATA_ID);
	DATA_TITLE = decodeURIComponent(DATA_TITLE);
	USR_NM = decodeURIComponent(USR_NM);
	USR_ID = decodeURIComponent(USR_ID);
	UPLOAD_DT = decodeURIComponent(UPLOAD_DT);
	GRANT_DT = decodeURIComponent(GRANT_DT);	
	if(GRANT_DT == 'null') GRANT_DT = '';
	END_DT = decodeURIComponent(END_DT);
	SHARE_YN = decodeURIComponent(SHARE_YN);
	FILE_NM_REAL = decodeURIComponent(FILE_NM_REAL);
	FILE_PATH = decodeURIComponent(FILE_PATH);
	FILE_NM_LOGIC = decodeURIComponent(FILE_NM_LOGIC);
	USE_HISTORY = decodeURIComponent(USE_HISTORY);
	//$('#validateButton_disabled').show();
	//$('#accessIp').validatebox('disableValidation');
	//$('#permitYn').validatebox('disableValidation');
	//$('#managerId').validatebox('disableValidation');
	//$('#managerNm').validatebox('disableValidation');
	//$('#dept').validatebox('disableValidation');
	//$('#extNo').validatebox('disableValidation');
	//$('#validateTd').hide();
	//$('#searchManagerButton').hide();
	//$('#addButton').hide();
	////$('#addButtonDisabled').hide();
	//$('#modifyButtonDisabled').show();
	//$('#modifyButton').hide();
	$('#popTitle').text('정보수정');
	document.getElementById('popupForm').reset();
	$('.popupWrapper').css('display','block');
	//$('#accessIp').focus();
	//$('#permitYn').focus();
	//$('#accessIp').focus();
	$('#dataId').val(DATA_ID);
	$('#shareYnOld').val(SHARE_YN);
	
	$('#dataTitle').html(DATA_TITLE);
	$('#dataTitle').val($('#dataTitle').text());
	
	$('#usrNm').html(USR_NM);
	$('#usrNm').val($('#usrNm').text());
	
	$('#usrId').html(USR_ID);
	$('#usrId').val($('#usrId').text());
	
	$('#uploadDt').html(UPLOAD_DT);
	$('#uploadDt').val($('#uploadDt').text());
	
	$('#grantDt').html(GRANT_DT);
	$('#grantDt').val($('#grantDt').text());
	
	$('#useYn').val(USE_HISTORY);

	$('#endDt').val(END_DT);
	//$('#endDt').datetimepicker(getDatepickerObj('start', 'daily'));
	//$('#endDt').html(END_DT);
	//$('#endDt').val($('#endDt').text());
	
	$('#shareYn').val(SHARE_YN);
	
	file = "<a onclick='downloadFile(\""
		+ encodeURIComponent(FILE_PATH)
		+ "\",\""
		+ encodeURIComponent(FILE_NM_REAL)
		+ "\",\""
		+ encodeURIComponent(FILE_NM_LOGIC)
		+ "\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"
		+ FILE_NM_REAL + "</a>";
		/*+ result.file.FILE_PATH
		+ "\",\""
		+ encodeURIComponent(result.file.FILE_ID)
		+ "\",\""
		+ result.file.FILE_EXTENSION
		+ "\",\""
		+ result.file.FILE_CONTENT_TYPE
		+ "\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"
		+ result.file.FILE_NM + "." + result.file.FILE_EXTENSION + "</a>";*/
	
	/*$('#fileNmReal').html(tmpHtml);
	$('#fileNmReal').val($('#fileNmReal').text());*/
	$('#postFile').html(file);
	
	$('#filePath').html(FILE_PATH);
	$('#filePath').val($('#filePath').text());
	
	
	//$('#validateButton_disabled').hide();

	$('#dataTitle').attr("disabled",true);
	$('#usrNm').attr("disabled",true);
	$('#usrId').attr("disabled",true);
	$('#uploadDt').attr("disabled",true);
	$('#grantDt').attr("disabled",true);
	//$('#fileNmReal').attr("disabled",true);
	$('#filePath').attr("disabled",true);
}

function downloadFile(FILE_PATH, FILE_NM_REAL, FILE_NM_LOGIC)
{
	$('#FILE_PATH').val(FILE_PATH);
	$('#FILE_NM_REAL').val(FILE_NM_REAL);
	$('#FILE_NM_LOGIC').val(FILE_NM_LOGIC);
	$('#downLoadFileForm').submit();
}
