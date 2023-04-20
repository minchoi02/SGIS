/**   
 * @JSName: pubDataManage
 * @Description: modify by liudandan  2014/11/14/ 14:00:00 
 *
 * @author: chenzhanchao  
 * @date: 2014/10/23/ 14:00:00     
 * @version V1.0      
 */
//2017.09.18[개발팀]l.d.h 정책통계지도 - 목록선택 팝업
function openModifyPopup(DATA_ID, DATA_NM, SRV_YN, POLICY_IDX_NM, DISP_RANK, EXP){
	srvLogWrite("L0", "03", "01", "07", "", "");
	var DATA_ID = decodeURIComponent(DATA_ID);
	var DATA_NM = decodeURIComponent(DATA_NM);
	var SRV_YN = decodeURIComponent(SRV_YN);
	var POLICY_IDX_NM = decodeURIComponent(POLICY_IDX_NM);
	var EXP = decodeURIComponent(EXP);
	$("#SRV_YN_POP").val(SRV_YN);
	$('#SEARCH_TYPE_CATEGORY_POP').val(DATA_NM);
	$('#idx_id').val(DATA_ID);
	$('#IDX_NM_POP').val(POLICY_IDX_NM);
	$('#DISP_RANK_POP').val(DISP_RANK);
	$('#exp').val(EXP);
	$('.popupWrapper').css('display','block');
}
(function(W, D) {
	W.$policyDataManage = W.$policyDataManage || {};
	//id of datagrid
	var id_datagrid = '#searchResultTable';
	$(document).ready(function() {
		srvLogWrite("L0", "03", "01", "06", "", "");
		//init page when loading
		$('#SEARCH_WORD').val('');
		$('#SEARCH_TYPE_CATEGORY').val('ALL');
		$('#SEARCH_TYPE_IDX').val('ALL');
		
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

		//2017.09.18[개발팀]l.d.h 정책통계지도 - 추가버튼 이벤트
		$('#addButton').click(function(){
			location.href = './../DT/themaMapRegAdd.html';
		});
		
		//2017.09.18[개발팀]l.d.h 정책통계지도 - 검색버튼 이벤트
		$('#searchButton').click(function(){	
			srvLogWrite("L0", "03", "01", "06", "", "");
			var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');	
			$('#SEARCH_WORD').validatebox('enableValidation');
			if($('#SEARCH_WORD').validatebox('isValid'))
			{				
				$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));	
			}
		});
		//2017.09.18[개발팀]l.d.h 정책통계지도 - 수정버튼 이벤트
		$('#modifyButton').click(function(){
			srvLogWrite("L0", "03", "01", "08", "", "");
			$policyDataManage.modify();
		});
		//2017.09.18[개발팀]l.d.h 정책통계지도 - 삭제버튼 이벤트
		$('#delButton').click(function(){
			srvLogWrite("L0", "03", "01", "09", "", "");
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
						dataList[i] = row[i].IDX_ID;
					}
					$policyDataManage.delData(dataList);
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
		            	 {field:'DISP_RANK',title:'표출순위',align:'center',width:90,
			        	  formatter: function(value,row,index){
			        		  var IDX_ID = encodeURIComponent((row.POLICY_IDX_ID)).trim();
			        		  var CATEGORY_NM = encodeURIComponent((row.CATEGORY_NM));
			        		  var DISP_RANK = encodeURIComponent((row.DISP_RANK));
			        		  var POLICY_IDX_NM = encodeURIComponent((row.POLICY_IDX_NM));
			        		  var SRV_YN = encodeURIComponent((row.SRV_YN));
			        		  var EXP = encodeURIComponent((row.EXP));
			        		  if (value != null && value != ''){
			        			  /*return "<a href='./themaMapRegUpdate.html?IDX_ID="+ IDX_ID +"&CATEGORY_NM="+CATEGORY_NM+"' style='color:#4a4a4a;' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value;*/
			        			  return "<a onclick='openModifyPopup(\""+ IDX_ID+"\",\""+CATEGORY_NM+"\",\""+SRV_YN+"\",\""+POLICY_IDX_NM+"\",\""+DISP_RANK+"\",\""+EXP+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
			        		  } else {
			        			  return value;
			        		  }
			        	  }}, 
			          {field:'CATEGORY_NM',title:'정책분야',align:'center',width:105,
			        	  formatter: function(value,row,index){						
			        		  var IDX_ID = encodeURIComponent((row.IDX_ID)).trim();
			        		  var CATEGORY_NM = encodeURIComponent((row.CATEGORY_NM));
			        		  var DISP_RANK = encodeURIComponent((row.DISP_RANK));
			        		  var POLICY_IDX_NM = encodeURIComponent((row.POLICY_IDX_NM));
			        		  var SRV_YN = encodeURIComponent((row.SRV_YN));
			        		  var EXP = encodeURIComponent((row.EXP));
			        		  if (value != null && value != ''){
			        			  return "<a onclick='openModifyPopup(\""+ IDX_ID+"\",\""+CATEGORY_NM+"\",\""+SRV_YN+"\",\""+POLICY_IDX_NM+"\",\""+DISP_RANK+"\",\""+EXP+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
			        		  } else {
			        			  return value;
			        		  }
			        	  }}, 
			        	  {field:'POLICY_IDX_NM',title:'제목',align:'center',width:200,
			        		  formatter: function(value,row,index){						
			        			  var IDX_ID = encodeURIComponent((row.IDX_ID)).trim();
			        			  var POLICY_IDX_NM = encodeURIComponent((row.POLICY_IDX_NM));
			        			  var CATEGORY_NM = encodeURIComponent((row.CATEGORY_NM));
			        			  var DISP_RANK = encodeURIComponent((row.DISP_RANK));
				        		  var POLICY_IDX_NM = encodeURIComponent((row.POLICY_IDX_NM));
			        			  var SRV_YN = encodeURIComponent((row.SRV_YN));
			        			  var EXP = encodeURIComponent((row.EXP));
			        			  if (value != null && value != ''){
			        				  return "<a onclick='openModifyPopup(\""+ IDX_ID+"\",\""+CATEGORY_NM+"\",\""+SRV_YN+"\",\""+POLICY_IDX_NM+"\",\""+DISP_RANK+"\",\""+EXP+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
				        		  } else {
				        			  return value;
				        		  }
			        		  }
			        	  }, 
			        	  {field:'SOURCE_INST_CD',title:'기관',align:'center',width:100,
			        		  formatter: function(value,row,index){						
			        			  var IDX_ID = encodeURIComponent((row.IDX_ID)).trim();
			        			  var CATEGORY_NM = encodeURIComponent((row.CATEGORY_NM));
				        		  var SRV_YN = encodeURIComponent((row.SRV_YN));
				        		  var DISP_RANK = encodeURIComponent((row.DISP_RANK));
				        		  var POLICY_IDX_NM = encodeURIComponent((row.POLICY_IDX_NM));
			        			  var SOURCE_INST_CD = encodeURIComponent((row.SOURCE_INST_CD));
			        			  var EXP = encodeURIComponent((row.EXP));
			        			  if (value != null && value != ''){
			        				  return "<a onclick='openModifyPopup(\""+ IDX_ID+"\",\""+CATEGORY_NM+"\",\""+SRV_YN+"\",\""+POLICY_IDX_NM+"\",\""+DISP_RANK+"\",\""+EXP+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
				        		  } else {
				        			  return value;
				        		  }
			        		  }
			        	  }, 
			        	  {field:'IDX_TYPE',title:'작성유형',align:'center',width:110,
			        		  formatter: function(value,row,index){						
			        			  var IDX_ID = encodeURIComponent((row.IDX_ID)).trim();
			        			  var IDX_TYPE = encodeURIComponent((row.IDX_TYPE));
			        			  var CATEGORY_NM = encodeURIComponent((row.CATEGORY_NM));
			        			  var DISP_RANK = encodeURIComponent((row.DISP_RANK));
				        		  var POLICY_IDX_NM = encodeURIComponent((row.POLICY_IDX_NM));
				        		  var SRV_YN = encodeURIComponent((row.SRV_YN));
				        		  var EXP = encodeURIComponent((row.EXP));
			        			  if (value != null && value != ''){
			        				  return "<a onclick='openModifyPopup(\""+ IDX_ID+"\",\""+CATEGORY_NM+"\",\""+SRV_YN+"\",\""+POLICY_IDX_NM+"\",\""+DISP_RANK+"\",\""+EXP+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
				        		  } else {
				        			  return value;
				        		  }
			        		  }
			        	  }, 
			        	  {field:'SRV_YN',title:'서비스유무',align:'center',width:110,
			        		  formatter: function(value,row,index){						
			        			  var IDX_ID = encodeURIComponent((row.IDX_ID)).trim();
			        			  var CATEGORY_NM = encodeURIComponent((row.CATEGORY_NM));
				        		  var SRV_YN = encodeURIComponent((row.SRV_YN));
				        		  var DISP_RANK = encodeURIComponent((row.DISP_RANK));
				        		  var POLICY_IDX_NM = encodeURIComponent((row.POLICY_IDX_NM));
				        		  var EXP = encodeURIComponent((row.EXP));
			        			  if (value != null && value != ''){
			        				  return "<a onclick='openModifyPopup(\""+ IDX_ID+"\",\""+CATEGORY_NM+"\",\""+SRV_YN+"\",\""+POLICY_IDX_NM+"\",\""+DISP_RANK+"\",\""+EXP+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
				        		  } else {
				        			  return value;
				        		  }
			        		  }
			        	  }				
			        	  ]],
			        	  queryParams: {
			        		  SEARCH_TYPE_CATEGORY:$('#SEARCH_TYPE_CATEGORY').val(),
			  		    	  SEARCH_TYPE_IDX: $('#SEARCH_TYPE_IDX').val()
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
			        	  url:contextPath +"/ServiceAPI/DT/PolicyMapManager.policyMapData.json"
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
		
		$.ajax({
		    url : contextPath + "/ServiceAPI/DT/policymapmanager/getCateDIV.json",
		    type: "POST",
		    success: function(data, textStatus, jqXHR)
		    {
		       var otphtml="<option value='ALL' selected>전체</option>";
				for(var i=0; i < data.result.rows.length; i++){
					otphtml += 	"<option value='"+data.result.rows[i].CATEGORY_NM+"'>"+data.result.rows[i].CATEGORY_NM+"</option>"
				}
				$('#SEARCH_TYPE_CATEGORY').html(otphtml);
				$('#SEARCH_TYPE_CATEGORY_POP').html(otphtml);
		    },
		    error: function (jqXHR, textStatus, errorThrown)
		    {
		 
		    }
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
	$policyDataManage = {
			//2017.09.18[개발팀]l.d.h 정책통계지도 - 수정
			modify : function() {
				var idx_id = $('#idx_id').val();
				var category = $('#SEARCH_TYPE_CATEGORY_POP').val();
				var srv_yn = $('#SRV_YN_POP').val();
				var idx_nm = $('#IDX_NM_POP').val();
				var disp_rank = $('#DISP_RANK_POP').val();
				var exp = $('#exp').val();
				var sopOpenApiUpDatatObj = new sop.openApi.upData.api();
				sopOpenApiUpDatatObj.addParam('IDX_ID', idx_id);
				sopOpenApiUpDatatObj.addParam('CATEGORY_TYPE', getcategoryId(category));
				sopOpenApiUpDatatObj.addParam('SRV_YN', srv_yn);
				sopOpenApiUpDatatObj.addParam('IDX_NM', idx_nm);
				sopOpenApiUpDatatObj.addParam('DISP_RANK', disp_rank);
				if(exp !=""){
					sopOpenApiUpDatatObj.addParam('EXP', exp);
				}
				sopOpenApiUpDatatObj.request({
					method : "POST",
					async : false,
					url : contextPath +"/ServiceAPI/DT/PolicyMapManager.policyMapDataUpdate.json"
				});
			},
			//2017.09.18[개발팀]l.d.h 정책통계지도 - 삭제
			delData : function(dataList) {
				var sopOpenApiDelDatatObj = new sop.openApi.delPData.api();
				sopOpenApiDelDatatObj.addParam('DATA_List', dataList);
				sopOpenApiDelDatatObj.request({
					method : "POST",
					async : false,
					url : contextPath +"/ServiceAPI/DT/PolicyMapManager.policyMapDataDelete.json"
				});
			},			
	};	//delete data from datagrid
	(function() {
		$class("sop.openApi.upData.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				var result = res.result;
				if(res.errCd == "0") { 
					if(result != null){
						$('.popupWrapper').css('display','none');
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
	//delete data from datagrid
	(function() {
		$class("sop.openApi.delPData.api").extend(sop.cnm.absAPI).define({
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

	queryParamsObj['SEARCH_TYPE_CATEGORY'] = $('#SEARCH_TYPE_CATEGORY').val();
	queryParamsObj['SEARCH_TYPE_IDX'] = $('#SEARCH_TYPE_IDX').val();
	return queryParamsObj;
}
//2017.09.18[개발팀]l.d.h 정책통계지도 - 카테고리 id 변환
function getcategoryId(id){
	var value = "";
	if(id === "인구·가구·주택"){
		value = "CTGR_001";
	}else if(id === "보건·복지"){
		value = "CTGR_002";
	}else if(id === "교육·문화"){
		value = "CTGR_003";
	}else if(id === "고용·소득·소비"){
		value = "CTGR_004";
	}else if(id === "산업·생산"){
		value = "CTGR_005";
	}else if(id === "환경·안전"){
		value = "CTGR_006";
	}else if(id === "재정행정"){
		value = "CTGR_007";
	}
	return value; 
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