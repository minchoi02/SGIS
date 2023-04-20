(function(W, D) {
	W.$pubThemaManage = W.$pubThemaManage || {};
	//id of datagrid
	var id_datagrid = '#searchResultTable';
	
	$(document).ready(function() {	
		//init page when loading
		$('#SEARCH_WORD').val('');
		$('#noSearchResult').hide();

		//click the search button
		$('#searchButton').click(function(){	
			var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');
			$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));	
		});
		
		$('#confirmButton').click(function(){	
			clickPOP();
		});
		
		$('#cancelButton').click(function(){	
			self.close();
		});
		
		//search result
		$(id_datagrid).datagrid({	
			loadMsg: '처리중 입니다, 기다리 십시요...',
			pagination: true,
			nowrap: false,
			checkOnSelect: true,
			columns:[[ 
			          {field:'KSIC_5_CD',title:'산업분류코드',align:'center',width:100},
			          {field:'KSIC_1_NM',title:'산업분류명(CODE 1)',align:'center',width:150},
		        	  {field:'KSIC_5_NM',title:'산업분류명(CODE 5)',align:'center',width:150,
		        		  formatter: function(value,row,index){
		        			  return value;
		        		  }
		        	  }
	        	  ]],
	        	  queryParams: {},
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
	        		  addCorpClassCd(rowData.KSIC_5_CD, rowIndex, rowData, $(id_datagrid));
	        	  },
	        	  onLoadSuccess: function(data){
	        		  checkCorpClassCd(data, $(id_datagrid));
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
	        	  url:contextPath +"/ServiceAPI/DT/ThemaMapManage/getPOICorpClassCODE.json"
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
	
}(window, document));		

//create query parameters for datagrid
function getQueryParamsObj(SEARCH_WORD){
	var queryParamsObj = new Object();
	if(SEARCH_WORD.length >= 2){
		queryParamsObj['SEARCH_WORD'] = SEARCH_WORD.replace(/(^\s*)|(\s*$)/g, '');	
	}
	return queryParamsObj;
}

function clickPOP(){
	var selectedCorpClassCd = "";
	
	if(class_cd_map != null || class_cd_map != undefined || class_cd_map.length < 1) {
		selectedCorpClassCd = class_cd_map.join()
	}
	
	$('#CORP_CLASS_CD', opener.document).val(decodeURI(selectedCorpClassCd));
	self.close();
}

var class_cd_map = [];
function addCorpClassCd(corp_class_cd, rowIndex, rowData, target) {
	var temp = class_cd_map.includes(corp_class_cd);
	
	if(temp) {
		class_cd_map.splice(class_cd_map.indexOf(corp_class_cd), 1);
		target.datagrid('unselectRow', rowIndex);
	} else {
		class_cd_map.push(corp_class_cd);
		target.datagrid('selectRow', rowIndex);
	}
	
	console.log(class_cd_map);
	console.log(class_cd_map.join());
}

function checkCorpClassCd(row, target) {
	if(class_cd_map === null || class_cd_map === undefined || class_cd_map.length < 1) {
		return;
	}
	
	for(var i = 0; i < row.rows.length; i++) {
		var temp = class_cd_map.includes(row.rows[i].KSIC_5_CD);
		
		if(temp) {
			target.datagrid('selectRow', i);
		}
	}
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