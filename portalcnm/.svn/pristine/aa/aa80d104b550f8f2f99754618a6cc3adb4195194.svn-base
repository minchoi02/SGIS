/**
 * 
 * @JSName: themaMapRegManage
 * @Description: modify by liudandan 2014/11/17/ 17:00:00
 * 
 * @author: chenzhanchao
 * @date:2014/11/03/ 08:30:00
 * @version V1.0
 * 
 */
//for return
var id_datagrid = '#searchResultTable';
var id_datagrid2 = '#searchResultTable2';
var pluploader = {};
var radioValue = '';
//2017.07.24[개발팀]이동형 주제도 등록 연도 설정
function getYearList() {
	var dt = new Date();
	var nowYear = dt.getFullYear();
	var yearList = "";	
	for(var i=0; i<17; i++) {
		yearList += "<option value='"+(nowYear-i)+"'>"+(nowYear-i)+"년</option>";
	}
	$("#LEFT_YEAR").append(yearList);
	$("#YEAR_INFO").append(yearList);
}
//2017.07.24[개발팀]이동형 주제도 임시 아이디 생성
function getUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	return v.toString(16);
	}); 
}
//2017.07.24[개발팀]이동형 주제도 선택된 아이디 값 리턴
function getRowIndex(target){
    var tr = $(target).closest('tr.datagrid-row');
    return parseInt(tr.attr('datagrid-row-index'));
}
//2017.07.24[개발팀]이동형 주제도 row수정
function editrow(target){
    $(id_datagrid).datagrid('beginEdit', getRowIndex(target));
}
//2017.07.24[개발팀]이동형 주제도 row삭제
function deleterow(target){
    $.messager.confirm('알림','선택된 항목이 삭제됩니다. 실행하시겠습니까?',function(r){
        if (r){
            $(id_datagrid).datagrid('deleteRow', getRowIndex(target));
        }
    });
}
//2017.07.24[개발팀]이동형 주제도 row저장
function saverow(target){
    $(id_datagrid).datagrid('endEdit', getRowIndex(target));
}
//2017.07.24[개발팀]이동형 주제도 row취소
function cancelrow(target){
    $(id_datagrid).datagrid('cancelEdit', getRowIndex(target));
}
//2017.07.24[개발팀]이동형 주제도 선택된 아이디 값 리턴
function getRowIndex2(target){
    var tr = $(target).closest('tr.datagrid-row');
    return parseInt(tr.attr('datagrid-row-index'));
}
//2017.07.24[개발팀]이동형 주제도 row수정
function editrow2(target){
    $(id_datagrid2).datagrid('beginEdit', getRowIndex(target));
}
//2017.07.24[개발팀]이동형 주제도 row삭제
function deleterow2(target){
    $.messager.confirm('알림','선택된 항목이 삭제됩니다. 실행하시겠습니까?',function(r){
        if (r){
            $(id_datagrid2).datagrid('deleteRow', getRowIndex(target));
        }
    });
}
//2017.07.24[개발팀]이동형 주제도 row저장
function saverow2(target){
    $(id_datagrid2).datagrid('endEdit', getRowIndex(target));
}
//2017.07.24[개발팀]이동형 주제도 row취소
function cancelrow2(target){
    $(id_datagrid2).datagrid('cancelEdit', getRowIndex(target));
}
//2017.07.24[개발팀]이동형 주제도 row등록
function insert(){
	var row = $(id_datagrid).datagrid('getSelected');
	if (row){
		var index = $(id_datagrid).datagrid('getRowIndex', row);
	} else {
		index = 0;
	}
	$(id_datagrid).datagrid('insertRow', {
		index: index,
		row:{
			status:'P'
		}
	});
	$(id_datagrid).datagrid('selectRow',index);
	$(id_datagrid).datagrid('beginEdit',index);
}
//2017.07.24[개발팀]이동형 주제도 row등록
function insert2(){
	var row = $(id_datagrid2).datagrid('getSelected');
	if (row){
		var index = $(id_datagrid2).datagrid('getRowIndex', row);
	} else {
		index = 0;
	}
	$(id_datagrid2).datagrid('insertRow', {
		index: index,
		row:{
			status:'P'
		}
	});
	$(id_datagrid2).datagrid('selectRow',index);
	$(id_datagrid2).datagrid('beginEdit',index);
}
(function(W, D) {
	W.$themaMapAddManage = W.$themaMapAddManage || {};
	$(document).ready(function() {
				CKEDITOR.replace('THEMA_EXP', {
					resize_enabled : false,
					removePlugins : 'toolbar,elementspath',
					readOnly : false					
				});
				//2017.07.24[개발팀]이동형 주제도 등록 버튼 이벤트
				$('#addButton').click(function() {
					srvLogWrite("L0", "03", "02", "12", "", "");
					var title = $('#TITLE').val();
					if(title.length<1){
						getConfirmPopup('알림', '데이터명을 입력해 주세요.', 'alert');
						$('#ok_alertPopup').click(function () {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function () {
							confirmPopupRemove();
						});
						$('#TITLE').focus();
						return;
					}
					var title = $('#TITLE').val();
					var fileName = $('#fileName').html();
					if(fileName.length<1){
						getConfirmPopup('알림', '기본데이터 파일을 입력해 주세요.', 'alert');
						$('#ok_alertPopup').click(function () {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function () {
							confirmPopupRemove();
						});
						$('#fileName').focus();
						return;
					}
					
					getConfirmPopup('확인', '추가로 증감차트 데이터 등록하시려면 증감데터이터 버튼을 눌러주세요', 'tconfirm');
					$('#ok_confirmPopup').click(function(){
						$('#themadata').css("display","none");
						$('#themach').css("display","block");
						$('#themadataList').css("display","none");
						$('#themachList').css("display","block");
						$('#themaAbtn').css("display","none");
						$('#themaBbtn').css("display","block");
						confirmPopupRemove();
					});
					//2017.07.24[개발팀]이동형 주제도 등록 확인버튼 이벤트
					$('#add_confirmPopup').click(function(){
						var rows = $(id_datagrid).datagrid('getData');
						$themaMapRegAddManage.regthemaId(rows);
						confirmPopupRemove();
					});
					//2017.07.24[개발팀]이동형 주제도 등록 버튼 취소 이벤트
					$('#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
				});
				$('#addButton2').click(function() {
					
					getConfirmPopup('확인', '데이터를 등록하시려면 확인 버튼을 눌러주세요', 'confirm');
					$('#ok_confirmPopup').click(function(){
						var rows = $(id_datagrid).datagrid('getData');
						var rows2 = $(id_datagrid2).datagrid('getData');
						$themaMapRegAddManage.regthemaId2(rows, rows2);
						confirmPopupRemove();
					});
					$('#cancel_confirmPopup').click(function(){
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
					
				});
				//2017.07.24[개발팀]이동형 주제도 삭제 버튼 이벤트
				$('#delexcelButton').click(function(){
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
				//2017.07.24[개발팀]이동형 주제도 삭제 버튼 이벤트
				$('#delexcelButton2').click(function(){
					var row = $(id_datagrid2).datagrid('getChecked');
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
							var rows = $(id_datagrid2).datagrid('getSelections');  // get all selected rows
							for(var i=rows.length-1; i>= 0; i--){
							   var index = $(id_datagrid2).datagrid('getRowIndex',rows.id);  // get the row index
							   $(id_datagrid2).datagrid('deleteRow',index);
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
				//2017.07.24[개발팀]이동형 주제도 기본데이터 엑셀 다운 이벤트
				$('#excelDownload_d').click(function(e) {
					e.preventDefault();
					window.location.href = './../include/thema/themaMapData.xlsx';
				});
				//2017.07.24[개발팀]이동형 주제도 증감데이터 엑셀 다운 이벤트
				$('#excelDownload_c').click(function() {
					window.location.href = './../include/thema/themaMapChange.xlsx';
				});
				// plupload plugins
				pluploader = new plupload.Uploader({
					url : contextPath + '/ServiceAPI/DT/PubDataManage/regPubData.json',
					browse_button : 'pickfiles',
					file_data_name : 'FILE',
					filters : {
						mime_types : [ {
							title : "xls files",
							extensions : "xls"
						}, {
							title : "xlsx files",
							extensions : "xlsx"
						}],
						max_file_size : '20mb',
						multipart: true, 
					},
				});
				// plupload plugins
				pluploader1 = new plupload.Uploader({
					url : contextPath + '/ServiceAPI/DT/PubDataManage/regPubData.json',
					browse_button : 'pickfiles1',
					file_data_name : 'FILE',
					filters : {
						mime_types : [ {
							title : "xls files",
							extensions : "xls"
						}, {
							title : "xlsx files",
							extensions : "xlsx"
						}],
						max_file_size : '20mb',
						multipart: true, 
					// one file
					},
				});
				pluploader.init();
				pluploader.bind('BeforeUpload', function(up, file) {
				    up.settings.multipart_params = {"DATA_TYPE" : "THEMAMAPDATA",
				    								"DATA_ID" : $('#DATA_ID').val()
				    								};
				});
				pluploader1.bind('BeforeUpload', function(up, file) {
					up.settings.multipart_params = {"DATA_TYPE" : "THEMAMAPCHANGE",
													"DATA_ID" : $('#DATA_ID').val()
													};
				});
				pluploader.bind('FilesAdded',
								function(uploader, files) {
									$('#fileName').html(files[0].name + "<a onclick='$(\"#fileName\").empty()' style='cursor: pointer' title='삭제'><img src='./../include/img/btn/btn_popup_x.png' alt='삭제'><a/>");									
									pluploader.start();
									getConfirmPopup('알림', '처리중입니다. 잠시만 기다려 주세요.', 'upload');
								});
				pluploader.bind('FileUploaded', function(up, files, responseObject) {
					var data = $.parseJSON(responseObject.response);
					var row= data.result;
					var index =data.result.length; 
					if (data.errCd == "0") {
						//pluploader1.start();
						if (data.result != null) {
							//search result
							$(id_datagrid).datagrid({	
								loadMsg: '처리중 입니다, 기다리 십시요...',
								pagination: true,
								nowrap: false,
								checkOnSelect: false,
								height: 372,
								columns:[[ 
								          //{field:'PUB_DATA_ID',hidden: true},
								          {field:'THEMA_MAP_DATA_ID',hidden: true},
								          {field : 'exp',
								            	 hidden : true},{
							            		 field : 'checkbox',
							            		 checkbox : true
							            	 },
								          {field:'REGION_DIV',title:'지역구분',align:'center',width:80,editor:'text',
								        	  formatter: function(value,row,index){	
								        		  var THEMA_MAP_DATA_ID = encodeURIComponent((row.THEMA_MAP_DATA_ID)).trim();
								        		  var REGION_DIV = encodeURIComponent((row.REGION_DIV));
								        		  if (value != null && value != ''){
								        			  return "<a onclick='clickPOP(\""+ THEMA_MAP_DATA_ID.trim()+"\",\""+REGION_DIV+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
								        		  } else {
								        			  return value;
								        		  }
								        	  }}, 
								        	{field:'BASE_YEAR',title:'기준년도',align:'center',width:127,editor:'text',
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
								        	  {field:'ADM_CD',title:'행정동코드',align:'center',width:127,editor:'text',
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
								        	  {field:'LEFT_SEP_VALUE',title:'표출정보A수치',align:'center',width:132,editor:{type:'numberbox',options:{precision:1}},
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
								        	  {field:'LEFT_SEP_VALUE',title:'표출정보B수치',align:'center',width:132,editor:{type:'numberbox',options:{precision:1}},
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
								        	  {field:'action',title:'편집',width:95,align:'center',
								                  formatter:function(value,row,index){
								                      if (row.editing){
								                          var s = '<a class="themaCusButton" onclick="saverow(this)">저장</a>   ';
								                          var c = '<a class="themaCusButton" onclick="cancelrow(this)">취소</a>';
								                          return s+c;
								                      } else {
								                          var e = '<a class="themaCusButton" onclick="editrow(this)">수정</a>   ';
								                          var d = '<a class="themaCusButton" onclick="deleterow(this)">삭제</a>';
								                          return e+d;
								                      }
								                  }
								              }
								        	  ]],
								        	  data:row,
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
									        	  var pageSize = 20;
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
								        		  $('#confirmPopup').remove();
								        		  $('#noSearchResult').hide();
								        		  $('.pagination').remove();
								        		  $('.searchBtn04').css('display', 'block');
								        		  $('#themaBbtn').css('display', 'none');
								        	  },
								        	  onEndEdit:function(index,row){
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
								              }
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
						}
					} else {
						getConfirmPopup('알림', data.errMsg, 'alert');
						$('#ok_alertPopup').click(function() {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function() {
							confirmPopupRemove();
						});
						$('#fileName').empty();
						$('#fileProgress').empty();
					}
				});
				pluploader.bind('UploadProgress', function(up, file) {
					$('#fileProgress').text('  ' + file.percent + "%");
				});
				pluploader.bind('Error', function(uploader, errObject) {
					$('#fileName').text(errObject.message);
					$('#fileProgress').empty();
				});
				pluploader1.init();
				pluploader1.bind('FilesAdded',
						function(uploader, files) {
							$('#fileName1').html(files[0].name
													+ "<a onclick='$(\"#fileName1\").empty()' style='cursor: pointer' title='삭제'><img src='./../include/img/btn/btn_popup_x.png' alt='삭제'><a/>");
							pluploader1.start();
							getConfirmPopup('알림', '처리중입니다. 잠시만 기다려 주세요.', 'upload');
						});
				pluploader1.bind('FileUploaded', function(up, files, responseObject) {
					var data = $.parseJSON(responseObject.response);
					var row= data.result;
					var index =data.result.length; 
					if (data.errCd == "0") {
						if (data.result != null) {
							//search result
							$(id_datagrid2).datagrid({	
								loadMsg: '처리중 입니다, 기다리 십시요...',
								pagination: true,
								nowrap: false,
								checkOnSelect: false,
								height: 372,
								columns:[[ 
								          //{field:'PUB_DATA_ID',hidden: true},
								          {field:'THEMA_MAP_DATA_ID',hidden: true},
								          {field : 'exp',
								            	 hidden : true},{
							            		 field : 'checkbox',
							            		 checkbox : true
							            	 },
								          {field:'REGION_DIV',title:'지역구분',align:'center',width:80,editor:'text',
								        	  formatter: function(value,row,index){	
								        		  var THEMA_MAP_DATA_ID = encodeURIComponent((row.THEMA_MAP_DATA_ID)).trim();
								        		  var REGION_DIV = encodeURIComponent((row.REGION_DIV));
								        		  if (value != null && value != ''){
								        			  return "<a onclick='clickPOP(\""+ THEMA_MAP_DATA_ID.trim()+"\",\""+REGION_DIV+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
								        		  } else {
								        			  return value;
								        		  }
								        	  }}, 
								        	{field:'BASE_YEAR',title:'기준년도',align:'center',width:132,editor:'text',
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
								        	  {field:'ADM_CD',title:'행정동코드',align:'center',width:132,editor:'text',
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
								        	  {field:'IRDS_YEAR',title:'증감년도',align:'center',width:132,editor:'text',
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
								        	  {field:'CHART_VALUE',title:'챠트수치',align:'center',width:132,editor:{type:'numberbox',options:{precision:1}},
								        		  formatter: function(value,row,index){						
								        			  var THEMA_MAP_DATA_ID = encodeURIComponent((row.THEMA_MAP_DATA_ID)).trim();
								        			  var CHART_VALUE = encodeURIComponent((row.CHART_VALUE));
								        			  if (value != null && value != ''){
								        				  return "<a onclick='clickPOP(\""+ THEMA_MAP_DATA_ID.trim()+"\",\""+CHART_VALUE+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
								        			  } else {
								        				  return value;
								        			  }
								        		  }
								        	  },
								        	  {field:'action',title:'편집',width:95,align:'center',
								                  formatter:function(value,row,index){
								                      if (row.editing){
								                          var s = '<a class="themaCusButton" href="javascript:void(0)" onclick="saverow2(this)">저장</a>   ';
								                          var c = '<a class="themaCusButton" href="javascript:void(0)" onclick="cancelrow2(this)">취소</a>';
								                          return s+c;
								                      } else {
								                          var e = '<a class="themaCusButton" href="javascript:void(0)" onclick="editrow2(this)">수정</a>   ';
								                          var d = '<a class="themaCusButton" href="javascript:void(0)" onclick="deleterow2(this)">삭제</a>';
								                          return e+d;
								                      }
								                  }
								              }
								        	  ]],
								        	  data:row,
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
								        		  $(id_datagrid2).datagrid('unselectAll');
								        		  $(id_datagrid2).datagrid('selectRow', rowIndex);
								        	  },
								        	  onCheck: function(rowIndex, rowData){
								        		  $(id_datagrid2).datagrid('unselectAll');
								        		  var checkedRows = $(id_datagrid2).datagrid('getChecked');
								        		  for(var i = 0; i < checkedRows.length; i++){
								        			  var rowIndex = $(id_datagrid2).datagrid('getRowIndex', checkedRows[i]);
								        			  $(id_datagrid2).datagrid('selectRow', rowIndex);
								        		  }
								        	  },
									          onLoadSuccess: function(data){
									        	  var total = data.total;
									        	  var pageSize = 20;
									        	  if(total < 1){
									        		  $('#noSearchResult2').show();
									        		  $(page).pagination({ 
									        			  pageSize: 10,
									        			  displayMsg: '',
									        			  showPageList: false,
									        			  showRefresh: false,
									        			  layout: [],
									        			  links: 5
									        		  });
									        	  } else{
									        		  $('#noSearchResult2').hide();
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
								        		  $('#confirmPopup').remove();
								        		  $('#noSearchResult2').hide();
								        		  $('.pagination').remove();
								        		  $('.searchBtn04').css('display', 'block');
								        		  $('#themaAbtn').css('display', 'none');
								        		  
								        	  },
								        	  onEndEdit:function(index,row){
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
								              }
							});
							var page = $(id_datagrid2).datagrid('getPager');  
							$(page).pagination({ 
								pageSize: 20,
								displayMsg: '',
								showPageList: false,
								showRefresh: false,
								layout: [],
								links: 5
							});
						}
					} else {
						getConfirmPopup('알림', data.errMsg, 'alert');
						$('#ok_alertPopup').click(function() {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function() {
							confirmPopupRemove();
						});
						$('#fileName').empty();
						$('#fileProgress').empty();
					}
				});
				pluploader1.bind('UploadProgress', function(up, file) {
					$('#fileProgress1').text('  ' + file.percent + "%");
				});
				pluploader1.bind('Error', function(uploader, errObject) {
					$('#fileName1').text(errObject.message);
					$('#fileProgress1').empty();
				});
				document.getElementById('resetForm').reset();
				
				getYearList();

				$('#cancelButton').click(function(){
					location.href = "./../DT/themaMapRegManager.html";
				});
				
				$('#cancelButton2').click(function(){
					$('#themaAbtn').css("display","block");
					$('#themadata').css("display","block");
					$('#themadataList').css("display","block");
					$('#themaBbtn').css("display","none");
					$('#themach').css("display","none");
					
					$("#fileName1").empty();
					$("#fileProgress1").empty();
					$('#themachList').css("display","none");
					if($(id_datagrid2).datagrid('getRows').length > 0){
						$(id_datagrid2).datagrid('loadData',[]);
					}
					$('#noSearchResult').css("display","none");
					$('#noSearchResult2').css("display","block");
					$('#noSearchResult2').css("margin-top","-390px");
				});
				
			});

	$themaMapRegAddManage = {
			//2017.07.24[개발팀]이동형 주제도 데이터리스트 삭제
			delthemaList : function(id){
				var sopOpenApidelThemaMapListobj = new sop.openApi.delThemaMapListobj.api();
				sopOpenApidelThemaMapListobj.addParam('STAT_THEMA_MAP_ID_List', id);
				sopOpenApidelThemaMapListobj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/ThemaMapManage/deleteThemaMapList.json"
				});
			},
			//2017.07.24[개발팀]이동형 주제도 데이터리스트 등록
			regthemaId : function(obj){
				var dataId = getUUID();
				$('#DATA_ID').val(dataId);
				var sopOpenApiregThemaMapObj = new sop.openApi.regThemaMapObj.api();
				sopOpenApiregThemaMapObj.addParam('DATA_ID', dataId);
				sopOpenApiregThemaMapObj.addParam('TITLE', $('#TITLE').val());
				sopOpenApiregThemaMapObj.addParam('DATA', JSON.stringify(obj.rows));
				sopOpenApiregThemaMapObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/PubDataManage/regPubDataID.json"
				});
			},
			//2017.07.24[개발팀]이동형 주제도 데이터리스트 등록
			regthemaId2 : function(obj, obj2){
				var dataId = getUUID();
				$('#DATA_ID').val(dataId);
				var sopOpenApiregThemaMapObj = new sop.openApi.regThemaMapObj.api();
				sopOpenApiregThemaMapObj.addParam('DATA_ID', dataId);
				sopOpenApiregThemaMapObj.addParam('TITLE', $('#TITLE').val());
				sopOpenApiregThemaMapObj.addParam('DATA', JSON.stringify(obj.rows));
				sopOpenApiregThemaMapObj.addParam('CHANGE', JSON.stringify(obj2.rows));
				sopOpenApiregThemaMapObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/PubDataManage/regPubRegPubDataChange.json"
				});
			},
	};
	(function() {
		$class("sop.openApi.delThemaMapListobj.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				//location.href = './../DT/themaMapAdd.html';
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
		$class("sop.openApi.regThemaMapObj.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				location.href = './../DT/themaMapRegManager.html';
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


