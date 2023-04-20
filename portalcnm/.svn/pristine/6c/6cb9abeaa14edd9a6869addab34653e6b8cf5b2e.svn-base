/**   
 * @JSName: pubDataManage
 * @Description: modify by liudandan  2014/11/14/ 14:00:00 
 *
 * @author: chenzhanchao  
 * @date: 2014/10/23/ 14:00:00     
 * @version V1.0      
 */
//id of datagrid
var id_datagrid = '#searchResultTable';
var thema_map_data_id = decodeURIComponent(getParameter("THEMA_MAP_DATA_ID"));
var tempSrvYn = getParameter("CDATA_YN");

(function(W, D) {
	W.$pubDataManage = W.$pubDataManage || {};
	$(document).ready(function() {
		$('#SEARCH_WORD').val('');
		
		if(tempSrvYn == "Y"){
			$('#changeYN').css("display","block");
		}
		$('#SEARCH_WORD').validatebox({
			required: false,
			validType:['length[1,4]','cnmInput']
		});
		//2017.08.24[개발팀]이동형 통계주제도 수정 취소 버튼 이벤트
		$('#cancelButton').click(function(){
			location.href = './../DT/themaMapRegManager.html';
		});
		//2017.08.24[개발팀]이동형 통계주제도수정 취소 페이지 이동 이벤트
		$('#themaMapChangePage').click(function(){
			location.href = './../DT/themaMapRegCUpdate.html?THEMA_MAP_DATA_ID='+ thema_map_data_id +"&CDATA_YN="+tempSrvYn; 
		});
		
		//2017.08.24[개발팀]이동형 통계주제도 수정
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

		//2017.08.24[개발팀]이동형 통계주제도 검색
		$('#searchButton').click(function(){	
			var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');	
			$('#SEARCH_WORD').validatebox('enableValidation');
			if($('#SEARCH_WORD').validatebox('isValid'))
			{				
				$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));	
			}
		});
		//click the delete button
		$('#delButton').click(function(){
/*			var row = $(id_datagrid).datagrid('getChecked');
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
						dataList[i] = encodeURIComponent(row[i].THEMA_MAP_DATA_ID);
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
			}*/
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
					var rows = $(id_datagrid).datagrid('getSelections');  // get all selected rows
					for(var i=rows.length-1; i>= 0; i--){
					   var index = $(id_datagrid).datagrid('getRowIndex',rows.id);  // get the row index
					   $(id_datagrid).datagrid('deleteRow',index);
					}
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
			          //{field:'PUB_DATA_ID',hidden: true},
			          {field:'THEMA_MAP_DATA_ID',hidden: true},
			          /*{field : 'exp',
			            	 hidden : true},{
		            		 field : 'checkbox',
		            		 checkbox : true
		            	 },*/
		            	 {field:'REGION_DIV',title:'지역구분',align:'center',width:140,editor:'text',
				        	  formatter: function(value,row,index){	
				        		  var THEMA_MAP_DATA_ID = encodeURIComponent((row.THEMA_MAP_DATA_ID)).trim();
				        		  var REGION_DIV = encodeURIComponent((row.REGION_DIV));
				        		  if (value != null && value != ''){
				        			  return "<a onclick='clickPOP(\""+ THEMA_MAP_DATA_ID.trim()+"\",\""+REGION_DIV+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
				        		  } else {
				        			  return value;
				        		  }
				        	  }}, 
				        	{field:'BASE_YEAR',title:'기준년도',align:'center',width:150,editor:'text',
				        		  formatter: function(value,row,index){						
				        			  var THEMA_MAP_DATA_ID = encodeURIComponent((row.THEMA_MAP_DATA_ID)).trim();
				        			  var BASE_YEAR = encodeURIComponent((row.BASE_YEAR));
				        			  if (value != null && value != ''){
				        				  return "<a onclick='clickPOP(\""+ THEMA_MAP_DATA_ID.trim()+"\",\""+BASE_YEAR+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
				        			  } else {
				        				  return value;
				        			  }
				        		  }
				        	  },
				        	  {field:'ADM_CD',title:'행정동코드',align:'center',width:150,editor:'text',
				        		  formatter: function(value,row,index){						
				        			  var THEMA_MAP_DATA_ID = encodeURIComponent((row.THEMA_MAP_DATA_ID)).trim();
				        			  var ADM_CD = encodeURIComponent((row.ADM_CD));
				        			  if (value != null && value != ''){
				        				  return "<a onclick='clickPOP(\""+ THEMA_MAP_DATA_ID.trim()+"\",\""+ADM_CD+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
				        			  } else {
				        				  return value;
				        			  }
				        		  }
				        	  },
				        	  {field:'LEFT_SEP_VALUE',title:'표출정보A수치',align:'center',width:150,editor:{type:'numberbox',options:{precision:1}},
				        		  formatter: function(value,row,index){						
				        			  var THEMA_MAP_DATA_ID = encodeURIComponent((row.THEMA_MAP_DATA_ID)).trim();
				        			  var LEFT_SEP_VALUE = encodeURIComponent((row.LEFT_SEP_VALUE));
				        			  if (value != null && value != ''){
				        				  return "<a onclick='clickPOP(\""+ THEMA_MAP_DATA_ID.trim()+"\",\""+LEFT_SEP_VALUE+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
				        			  } else {
				        				  return value;
				        			  }
				        		  }
				        	  },
				        	  {field:'LEFT_SEP_VALUE',title:'표출정보B수치',align:'center',width:150,editor:{type:'numberbox',options:{precision:1}},
				        		  formatter: function(value,row,index){						
				        			  var THEMA_MAP_DATA_ID = encodeURIComponent((row.THEMA_MAP_DATA_ID)).trim();
				        			  var LEFT_SEP_VALUE = encodeURIComponent((row.LEFT_SEP_VALUE));
				        			  if (value != null && value != ''){
				        				  return "<a onclick='clickPOP(\""+ THEMA_MAP_DATA_ID.trim()+"\",\""+LEFT_SEP_VALUE+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
				        			  } else {
				        				  return value;
				        			  }
				        		  }
				        	  }			
			        	  ]],
			        	  queryParams: {
			        		  THEMA_MAP_DATA_ID:thema_map_data_id
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
			        	  url:contextPath +"/ServiceAPI/DT/PubDataManage/regUpdateThemaData.json"
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
			if($('#confirmPopup').css('display') == 'block' || $('.popupWrapper').css('display') == 'block'){
				return false;
			} else{
				$('#searchButton').click();
				return false;
			}
		}
	});
	$pubDataManage = {
			//2017.08.24[개발팀]이동형 통계주제도 삭제
			delData : function(dataList) {
				var sopOpenApiDelDatatObj = new sop.openApi.delData.api();
				sopOpenApiDelDatatObj.addParam('DATA_List', dataList);
				sopOpenApiDelDatatObj.request({
					method : "POST",
					async : false,
					url : contextPath +"/ServiceAPI/DT/PubDataManage/regDelPubData.json"
				});
			},
			//2017.08.24[개발팀]이동형 통계주제도 추가
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
			//2017.08.24[개발팀]이동형 통계주제도 추가
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
	if(SEARCH_WORD.length >= 2)
	{
		queryParamsObj['SEARCH_WORD'] = SEARCH_WORD.replace(/(^\s*)|(\s*$)/g, '');	
	}	

	queryParamsObj['THEMA_MAP_DATA_ID'] = decodeURIComponent(getParameter("THEMA_MAP_DATA_ID"));
	
	return queryParamsObj;
}
function clickPOP(THEMA_MAP_DATA_ID,BASE_YEAR){
	$('#DATA_ID',opener.document).val(decodeURI(THEMA_MAP_DATA_ID));
	$('#DATA_YEAR',opener.document).val(BASE_YEAR);
	self.close();
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