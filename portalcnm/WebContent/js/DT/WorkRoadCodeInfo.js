/**
 * 
 * @JSName: WorkRoadCodeInfo
 * @Description: 일자리 코드정보 조회
 * 
 * @author: 곽제욱
 * @date: 2020/05/12/ 09:30:00
 * @version V1.0
 * 
 */
var GV_PAGE_SIZE = 10;

(function(W, D){
	var SEARCH_TYPE = $('#SEARCH_TYPE').val();
	W.$WorkRoadStatsInfoSm = W.$WorkRoadStatsInfoSm || {};
	var id_datagrid = '#searchResultTable';
	$(document).ready(function() {
		//srvLogWrite("L0", "04", "03", "01", "", "");
		$('#SEARCH_WORD').focus();
		
		//엑셀다운로드
		$('#excelButton').click(function(){
			location.href = contextPath +"/ServiceAPI/DT/workRoadCodeInfo/excelWorkRoadCodeInfo.excel";
		});

		//검색 버튼
		$('#searchButton').click(function(){  
			//srvLogWrite("L0", "04", "03", "01", "", "");
			var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');
			var SEARCH_TYPE = $('#SEARCH_TYPE').val();
			$(id_datagrid).datagrid('load',getQueryParamsObj1(SEARCH_WORD, SEARCH_TYPE));
		});
		
		//화면 엔터키 => 검색 버튼
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
		
		//데이터 테이블 선언
		$(id_datagrid).datagrid({
			loadMsg: '처리중 입니다, 기다리 십시요...',
			pagination: true,
			nowrap: false,
			checkOnSelect: false,
			columns:[[ 
				//width 총합 744
			          {field:'REG_ID',hidden: true},
			          {field:'ROW_NUM',title:'번호',align:'center',width:50, styler: function(value,row,index) {return "cursor: pointer;";}},
			          {field:'B_CLASS_CD',title:'분류코드',align:'center',width:80, styler: function(value,row,index) {return "cursor: pointer;";}}, 
			          {field:'B_CLASS_CD_NM',title:'분류코드명',align:'left',width:167, styler: function(value,row,index) {return "cursor: pointer;";}},
			          {field:'S_CLASS_CD',title:'상세코드값',align:'center',width:80, styler: function(value,row,index) {return "cursor: pointer;";}},
			          {field:'S_CLASS_CD_NM',title:'상세코드명',align:'center',width:170, styler: function(value,row,index) {return "cursor: pointer;";}},
			          {field:'CD_EXP',title:'설명',align:'center',width:197, styler: function(value,row,index) {return "cursor: pointer;";}}
			          ]],
			          //셀 클릭 이벤트
			          onClickCell: function(index,field,value){
		        		  var LV_THIS = $(this);
		        		  var LV_DATA = LV_THIS.datagrid("getData").rows[index];
		        		  var LV_REG_ID = LV_DATA.REG_ID;
		        		  //location.href = './WorkRoadCodeInfoSmUpdate.html?REG_ID='+LV_REG_ID;
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
			        	  //srvLogWrite("L0", "04", "03", "04", "", "");
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
			        			  pageSize: GV_PAGE_SIZE,
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
			        				  pageSize: GV_PAGE_SIZE,
			        				  displayMsg: '',
			        				  showPageList: false,
			        				  showRefresh: false,
			        				  layout: ['first','prev','links','next','last'],
			        				  links: 5
			        			  });
			        		  } else if(Math.ceil(total / pageSize) <= 5){
			        			  $(page).pagination({ 
			        				  pageSize: GV_PAGE_SIZE,
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
			          url:contextPath +"/ServiceAPI/DT/workRoadCodeInfo/searchWorkRoadCodeInfo.json",
			          pageSize:GV_PAGE_SIZE
		});
		
		//하단 페이징
		var page = $(id_datagrid).datagrid('getPager');  
		$(page).pagination({ 
			pageSize: GV_PAGE_SIZE,
			displayMsg: '',
			showPageList: false,
			showRefresh: false,
			layout: [],
			links: 5
		});
		
		//처리
		(function() {
			$class("sop.openApi.callData.api").extend(sop.cnm.absAPI).define({
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
							$(id_datagrid).datagrid('reload');
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
					getConfirmPopup('알림', '일시적인 오류로 집계에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
					$('#ok_alertPopup').click(function(){
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
				}
			});
		}());
	})
}(window, document));

// 검색분류, 검색어 paramObj에 담기
function getQueryParamsObj1(SEARCH_WORD,SEARCH_TYPE){	
	var queryParamsObj = new Object();
	if(SEARCH_WORD != "") {
		queryParamsObj['SEARCH_WORD'] = SEARCH_WORD;
		queryParamsObj['SEARCH_TYPE'] = SEARCH_TYPE;
	}
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