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
var thema_cdata_yn = decodeURIComponent(getParameter("CDATA_YN"));

(function(W, D) {
	W.$pubDataManage = W.$pubDataManage || {};
	$(document).ready(function() {
		$('#SEARCH_WORD').val('');
		
		$('#SEARCH_WORD').validatebox({
			required: false,
			validType:['length[1,4]','cnmInput']
		});
		//2017.08.24[개발팀]이동형 주제도 취소버튼 이벤트
		$('#cancelButton').click(function(){
			location.href = "./../DT/themaMapRegUpdate.html?THEMA_MAP_DATA_ID="+ thema_map_data_id +"&CDATA_YN="+thema_cdata_yn;
		});
		$('#delButton').click(function(){
			getConfirmPopup('확인', '증감데이터가 삭제됩니다. 실행하시겠습니까?', 'confirm');
			$('#ok_confirmPopup').click(function(){
				$.ajax({
				    url : contextPath + "/ServiceAPI/DT/PubDataManage/delPubChData.json",
				    data:{"THEMA_MAP_DATA_ID" : thema_map_data_id},
				    type: "POST",
				    dataType: 'json',  
				    success: function(data, textStatus, jqXHR)
				    {
				    	getConfirmPopup('알림', "삭제되었습니다.", 'alert');
						$('#ok_alertPopup').click(function() {
							confirmPopupRemove();
							location.href = "./../DT/themaMapRegManager.html?THEMA_MAP_DATA_ID="+ thema_map_data_id +"&CDATA_YN="+thema_cdata_yn;
						});
						$('#close_confirmPopup').click(function() {
							confirmPopupRemove();
						});
				    },
				    error: function (jqXHR, textStatus, errorThrown)
				    {
				 
				    }
				});
				confirmPopupRemove();
			});
			$('#cancel_confirmPopup').click(function(){
				
				confirmPopupRemove();
			});
		});
		
		//2017.08.24[개발팀]이동형 주제도 검색 버튼 이벤트
		$('#searchButton').click(function(){	
			var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');	
			$('#SEARCH_WORD').validatebox('enableValidation');
			if($('#SEARCH_WORD').validatebox('isValid'))
			{				
				$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));	
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
			        	  {field:'IRDS_YEAR',title:'증감년도',align:'center',width:150,editor:'text',
			        		  formatter: function(value,row,index){						
			        			  var THEMA_MAP_DATA_ID = encodeURIComponent((row.THEMA_MAP_DATA_ID)).trim();
			        			  var IRDS_YEAR = encodeURIComponent((row.IRDS_YEAR));
			        			  if (value != null && value != ''){
			        				  return "<a onclick='clickPOP(\""+ THEMA_MAP_DATA_ID.trim()+"\",\""+IRDS_YEAR+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
			        			  } else {
			        				  return value;
			        			  }
			        		  }
			        	  },
			        	  {field:'CHART_VALUE',title:'챠트수치',align:'center',width:150,editor:{type:'numberbox',options:{precision:1}},
			        		  formatter: function(value,row,index){						
			        			  var THEMA_MAP_DATA_ID = encodeURIComponent((row.THEMA_MAP_DATA_ID)).trim();
			        			  var CHART_VALUE = encodeURIComponent((row.CHART_VALUE));
			        			  if (value != null && value != ''){
			        				  return "<a onclick='clickPOP(\""+ THEMA_MAP_DATA_ID.trim()+"\",\""+CHART_VALUE+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
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
			        	  url:contextPath +"/ServiceAPI/DT/PubDataManage/regUpdateThemaChange.json"
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