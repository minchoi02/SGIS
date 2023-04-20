/**   
 * @JSName: openDataaManage
 * @Description: modify by liudandan  2014/11/14/ 14:00:00 
 *
 * @author: chenzhanchao  
 * @date: 2014/10/23/ 14:00:00     
 * @version V1.0      
 */
//id of datagrid
var id_datagrid = '#searchResultTable';
//2017.10.16[개발팀]이동형 지자체 데이터  선택된 아이디 값 리턴
function getRowIndex(target){
    var tr = $(target).closest('tr.datagrid-row');
    return parseInt(tr.attr('datagrid-row-index'));
}
//2017.10.16[개발팀]이동형 지자체 데이터  row수정
function editrow(target){
	$.messager.confirm('알림','선택된 항목을 수정하시겠습니까?',function(r){
        if (r){
        	$(id_datagrid).datagrid('beginEdit', getRowIndex(target));        	
        }
    });
}
//2017.10.16[개발팀]이동형 지자체 데이터  row저장
function saverow(target){
    $(id_datagrid).datagrid('endEdit', getRowIndex(target));
}
//2017.10.16[개발팀]이동형 지자체 데이터 row취소
function cancelrow(target){
    $(id_datagrid).datagrid('cancelEdit', getRowIndex(target));
}
var products = [
     		    {productid:'FI-SW-01',name:'0'},
    		    {productid:'K9-DL-01',name:'1'},
    		];

(function(W, D) {
	
	srvLogWrite("L0", "03", "01", "10", "", "");		//지자체데이터 관리. 확인못함
	
	W.$openDataManage = W.$openDataManage || {};
	
	$(document).ready(function() {	
		//init page when loading
		$('#SEARCH_WORD').val('');
		
		$('#noSearchResult').hide();
		if ($.fn.validatebox){
			$.fn.validatebox.defaults.missingMessage = '이 입력 항목은 필수 입력 항목 입니다.';
			$.fn.validatebox.defaults.rules.length.message = '입력 길이는 필수{0}와{1} 사이.';
		}
		$('#SEARCH_WORD').validatebox({
			required: false,
			validType:['length[1,25]','cnmInput']
		});
		
		//2017.09.18[개발팀]l.d.h 지자체 데이터 관리 - 검색버튼 이벤트
		$('#searchButton').click(function(){	
			var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');	
			$('#SEARCH_WORD').validatebox('enableValidation');
			if($('#SEARCH_WORD').validatebox('isValid'))
			{				
				$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));	
			}
		});
		//2017.09.18[개발팀]l.d.h 정책통계지도 - 삭제버튼 이벤트
		$('#delButton').click(function(){
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
					var dataList = new Array();
					for(var i = 0; i < row.length; i++){
						dataList[i] = encodeURIComponent(row[i].SEQ);
					}
					$openDataManage.delData(dataList);
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
			          {field : 'exp',
			            	 hidden : true},{
		            		 field : 'checkbox',
		            		 checkbox : true
		            	 },
			        	  {field:'SEQ',title:'순번',align:'center',width:30,
			        		  formatter: function(value,row,index){						
			        			  var seq = encodeURIComponent((row.SEQ));
			        			  if (value != null && value != ''){
			        				  return value;
				        		  } else {
				        			  return value;
				        		  }
			        		  }
			        	  }, 
			        	  {field:'OPEN_DT',title:'공개일자',align:'center',width:80,
			        		  formatter: function(value,row,index){						
			        			  var open_dt = encodeURIComponent((row.OPEN_DT));
			        			  if (value != null && value != ''){
			        				  return value;
				        		  } else {
				        			  return value;
				        		  }
			        		  }
			        	  },
			        	  {field:'OPEN_DATA_NM',title:'공개데이터명',align:'center',width:100,
			        		  formatter: function(value,row,index){						
			        			  var open_data_nm = encodeURIComponent((row.OPEN_DATA_NM));
			        			  if (value != null && value != ''){
			        				  return value;
				        		  } else {
				        			  return value;
				        		  }
			        		  }
			        	  },
			        	  {field:'OPEN_INST_NM',title:'공개기관명',align:'center',width:70,
			        		  formatter: function(value,row,index){						
			        			  var open_inst_nm = encodeURIComponent((row.OPEN_INST_NM));
			        			  if (value != null && value != ''){
			        				  return value;
				        		  } else {
				        			  return value;
				        		  }
			        		  }
			        	  },
			        	  {field:'USR_NM',title:'사용자명',align:'center',width:60,
			        		  formatter: function(value,row,index){						
			        			  var usr_nm = encodeURIComponent((row.USR_NM));
			        			  if (value != null && value != ''){
			        				  return value;
				        		  } else {
				        			  return value;
				        		  }
			        		  }
			        	  },
			        	  {field:'SPACIAL_DATA_TYPE',title:'유형',align:'center',width:40,
			        		  formatter: function(value,row,index){						
			        			  var spacial_data_type = encodeURIComponent((row.SPACIAL_DATA_TYPE));
			        			  if (value != null && value != '' && value != 'null'){
			        				  return value;
				        		  } else {
				        			  return "-";
				        		  }
			        		  }
			        	  },
			        	  {field:'INFO_LINK_SRV_NM',title:'서비스명',align:'center',width:90,
			        		  formatter: function(value,row,index){						
			        			  var info_link_srv_nm = encodeURIComponent((row.INFO_LINK_SRV_NM));
			        			  if (value != null && value != ''){
			        				  return value;
				        		  } else {
				        			  return value;
				        		  }
			        		  }
			        	  },
			        	  {field:'INFO_LINK_SRV_REALM',title:'분야',align:'center',width:90,
			        		  formatter: function(value,row,index){						
			        			  var info_link_srv_realm = encodeURIComponent((row.INFO_LINK_SRV_REALM));
			        			  if (value != null && value != ''){
			        				  return value;
				        		  } else {
				        			  return "-";
				        		  }
			        		  }
			        	  },
			        	  {field:'OPEN_YN',title:'공개여부',align:'center',width:55,
			        		  editor:{
									type:'checkbox',
									options:{
										on: '1',
										off: '0'
									}
			        		  },
			        		  formatter: function(value,row,index){						
			        			  var open_yn = encodeURIComponent((row.OPEN_YN));
			        			  if (value == '1'){
			        				  return '공개';
				        		  } else {
				        			  return '비공개';
				        		  }
			        		  }
			        	  },
			        	  {field:'action',title:'공개여부설정 ',width:100,align:'center',
			                  formatter:function(value,row,index){
			                      if (row.editing){
			                          var s = '<a class="themaCusButton" onclick="saverow(this)">저장</a>   ';
			                          var c = '<a class="themaCusButton" onclick="cancelrow(this)">취소</a>';
			                          return s+c;
			                      } else {
			                    	  var e = '<a class="themaCusButton" onclick="editrow(this)">수정</a>   ';
			                    	  /*var d = '<a class="themaCusButton" onclick="deleterow(this)">삭제</a>';*/
			                          return e;
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
			        	  onEndEdit:function(index,row){
			        		  console.log("row ::: ", row);
			        		  $openDataManage.modifyList(row);
			        		  row.editing = true;
			                  $(this).datagrid('refreshRow', index);
			              },
			              onBeforeEdit:function(index,row){
			                  row.editing = true;
			                  $(this).datagrid('refreshRow', index);
			              },
			              onAfterEdit:function(index,row){
			                  row.editing = false;
			                  $(this).datagrid('refreshRow', index);
			              },
			              onCancelEdit:function(index,row){
			                  row.editing = false;
			                  $(this).datagrid('refreshRow', index);
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
			        	  url:contextPath +"/ServiceAPI/DT/OpenDataManage/OpenDataList.json"
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
	$openDataManage = {
			//2017.10.17[개발팀]이동형  지자체 데이터  데이터리스트 삭제
			delData : function(dataList) {
				var sopOpenApiDelDatatObj = new sop.openApi.delPData.api();
				sopOpenApiDelDatatObj.addParam('DATA_List', dataList);
				sopOpenApiDelDatatObj.request({
					method : "POST",
					async : false,
					url : contextPath +"/ServiceAPI/DT/OpenDataManage/OpenDataDel.json"
				});
			},
			//2017.10.17[개발팀]이동형  지자체 데이터  데이터리스트 등록
			modifyList : function(obj){
				console.log(obj.SEQ);
				console.log(obj.OPEN_YN);
				var modifyObj = new sop.openApi.modifyObj.api();
				modifyObj.addParam('SEQ', obj.SEQ);
				modifyObj.addParam('OPEN_YN', obj.OPEN_YN);
				modifyObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/OpenDataManage/OpenDataModify.json"
				});
			},
	};
	(function() {
		$class("sop.openApi.delPData.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				location.href = './../DT/openDataMapManager.html';
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
		$class("sop.openApi.modifyObj.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				location.href = './../DT/openDataMapManager.html';
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
	queryParamsObj['DISP_YN'] = $('#DISP_YN').val();
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