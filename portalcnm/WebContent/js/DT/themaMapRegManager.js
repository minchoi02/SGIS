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
		srvLogWrite("L0", "03", "02", "11", "", "");
		$('#SEARCH_WORD').val('');
		
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

		//2017.08.24[개발팀]이동형 주제도 등록 버튼이벤트
		$('#addButton').click(function(){
			location.href = './../DT/themaMapRegAdd.html';
		});
		
		//2017.08.24[개발팀]이동형 주제도 검색 버튼이벤트
		$('#searchButton').click(function(){
			srvLogWrite("L0", "03", "02", "11", "", "");
			var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');	
			$('#SEARCH_WORD').validatebox('enableValidation');
			if($('#SEARCH_WORD').validatebox('isValid'))
			{				
				if(SEARCH_WORD.length>=2&&SEARCH_WORD.length < 5){
					$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));	
				}else{
					alert("입력값을 체크해주세요");
				}

			}
		});
		//2017.08.24[개발팀]이동형 주제도 삭제 버튼이벤트
		$('#delButton').click(function(){
			srvLogWrite("L0", "03", "02", "13", "", "");
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
			          {field : 'exp',
			            	 hidden : true},{
		            		 field : 'checkbox',
		            		 checkbox : true
		            	 },
			          {field:'THEMA_MAP_DATA_NM',title:'데이터명',align:'center',width:615,
			        	  formatter: function(value,row,index){						
			        		  var THEMA_MAP_DATA_ID = encodeURIComponent((row.THEMA_MAP_DATA_ID)).trim();
			        		  var CDATA_YN = encodeURIComponent((row.THEMA_MAP_DATA_IDYN));
			        		  if(CDATA_YN === undefined ||  CDATA_YN === "undefined"){
			        			  CDATA_YN = "N" 
		        			  }else{
		        				  CDATA_YN = "Y" 
		        			  }
			        		  if (value != null && value != ''){
			        			  return "<a href='./themaMapRegUpdate.html?THEMA_MAP_DATA_ID="+ THEMA_MAP_DATA_ID +"&CDATA_YN="+CDATA_YN+"' style='color:#4a4a4a;' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value;
					        		value += "</a>";
			        		  } else {
			        			  return value;
			        		  }
			        	  }}, 
			        	  {field:'THEMA_MAP_DATA_IDYN',title:'증감데이터여부',align:'center',width:100,
			        		  formatter: function(value,row,index){						
			        			  var THEMA_MAP_DATA_ID = encodeURIComponent((row.THEMA_MAP_DATA_ID)).trim();
			        			  var THEMA_MAP_DATA_IDYN = encodeURIComponent((row.THEMA_MAP_DATA_IDYN));
			        			  if(THEMA_MAP_DATA_IDYN === undefined ||  THEMA_MAP_DATA_IDYN === "undefined"){
			        				  return "N" 
			        			  }else{
			        				  return "Y" 
			        			  }
			        			  /*if (value != null && value != ''){
			        				  return "<a onclick='clickPOP(\""+ THEMA_MAP_DATA_ID.trim()+"\",\""+BASE_YEAR+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
			        			  } else {
			        				  return value;
			        			  }*/
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
			        	  url:contextPath +"/ServiceAPI/DT/PubDataManage/RegThemaID.json"
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
			//2017.08.24[개발팀]이동형 통계주제도 리스트삭제
			delData : function(dataList) {
				var sopOpenApiDelDatatObj = new sop.openApi.delData.api();
				sopOpenApiDelDatatObj.addParam('DATA_List', dataList);
				sopOpenApiDelDatatObj.request({
					method : "POST",
					async : false,
					url : contextPath +"/ServiceAPI/DT/PubDataManage/regDelPubData.json"
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
}(window, document));		
//create query parameters for datagrid
function getQueryParamsObj(SEARCH_WORD){
	var queryParamsObj = new Object();
	if(SEARCH_WORD.length >= 2)
	{
		queryParamsObj['SEARCH_WORD'] = SEARCH_WORD.replace(/(^\s*)|(\s*$)/g, '');	
	}	

	queryParamsObj['SEARCH_TYPE_INTRACTV'] = $('#SEARCH_TYPE_INTRACTV').val();
	queryParamsObj['SEARCH_TYPE_BIZSTAT'] = $('#SEARCH_TYPE_BIZSTAT').val();
	return queryParamsObj;
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