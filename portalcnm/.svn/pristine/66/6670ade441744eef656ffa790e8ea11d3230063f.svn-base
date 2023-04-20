/**
 * 
 * @JSName: WorkRoadStatsInfoSm
 * @Description:
 * 
 * @author: 김남민
 * @date: 2019/08/01/ 08:30:00
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
		
		//삭제
		$('#delButton').click(function(){
			//srvLogWrite("L0", "04", "03", "03", "", "");
			var row = $(id_datagrid).datagrid('getChecked');
			//console.log(row);
			if (row == null || row.length == 0) {
				getConfirmPopup('알림', '선택된 데이터가 없습니다. 다시 선택해 주세요.', 'alert');
				$('#ok_alertPopup').unbind();
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').unbind();
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			} else if (row.length >= 1) {
				getConfirmPopup('확인', '선택된 항목이 삭제됩니다. 실행하시겠습니까?', 'confirm');
				$('#ok_confirmPopup').unbind();
				$('#ok_confirmPopup').click(function(){
					var relWordList = new Array();
					for(var i = 0; i < row.length; i++){
						relWordList[i] = encodeURIComponent(row[i].REG_ID);
					}
					$WorkRoadStatsInfoSm.delData(relWordList);
					confirmPopupRemove();
				});
				$('#cancel_confirmPopup').unbind();
				$('#cancel_confirmPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').unbind();
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			}
		});
		
		//엑셀다운로드
		$('#excelButton').click(function(){
			location.href = contextPath +"/ServiceAPI/DT/workRoadStatsInfoSm/ExcelWorkRoadStatsInfoSm.excel";
		});
		
		//선택실행
		$('#callButton').click(function(){
			//srvLogWrite("L0", "04", "03", "03", "", "");
			var row = $(id_datagrid).datagrid('getChecked');
			//console.log(row);
			if (row == null || row.length == 0) {
				getConfirmPopup('알림', '선택된 데이터가 없습니다. 다시 선택해 주세요.', 'alert');
				$('#ok_alertPopup').unbind();
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').unbind();
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			} else if (row.length >= 1) {
				getConfirmPopup('확인', '선택된 항목이 집계됩니다. 실행하시겠습니까?', 'confirm');
				$('#ok_confirmPopup').unbind();
				$('#ok_confirmPopup').click(function(){
					var gv_common_loading = new sop.cnm.absAPI();
					gv_common_loading.onBlockUIPopup();
					setTimeout(function() {
						var resultMsg = "";
						for(var i = 0; i < row.length; i++) {
							resultMsg += row[i].ROW_NUM + ". " + row[i].LINK_NM + " : ";
							// ajax 시작
							$.ajax({
							    url: contextPath +"/ServiceAPI/DT/workRoadStatsInfoSm/CallWorkRoadStatsInfoSm.json",
							    type: 'post',
							    dataType : 'json',
							    async: false,
							    data: {
							    	REG_ID: row[i].REG_ID
							    }
							}).done(function (res) { // 완료
								if(res.errCd == "0") {
									resultMsg += res.result.msg;
								}else if(res.errCd == "-401") {
									//common_alert(res.errMsg);
								}else{
									//common_alert(res.errMsg);
								}
							}).fail(function (res) { // 실패
								//common_alert(errorMessage);
							}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
								//common_loading(false);
							});
							// ajax 끝
							if(i < (row.length-1)) resultMsg += "<br>";
						}
						gv_common_loading.onBlockUIClose();
						getConfirmPopup('알림', resultMsg, 'alert');
						$('#ok_alertPopup').click(function(){
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function(){
							confirmPopupRemove();
						});
					}, 100);
					confirmPopupRemove();
				});
				$('#cancel_confirmPopup').unbind();
				$('#cancel_confirmPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').unbind();
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			}
		});

		//신규등록
		$('#newButton').click(function(){
			//srvLogWrite("L0", "04", "03", "02", "", "");
			location.href = './WorkRoadStatsInfoSmAdd.html';
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
				//checkbox 끼고 width 총합 717 
				//checkbox 빼고 width 총합 717+27=744
			          {field:'REG_ID',hidden: true},
			          {field:'checkbox',checkbox: true},
			          {field:'ROW_NUM',title:'번호',align:'center',width:50, styler: function(value,row,index) {return "cursor: pointer;";}},
			          //2020-04-28 [곽제욱] 일자리 통계정보 집계목록 화면 필드 추가로 인한 변경 START 
			          {field:'STAT_PATH',title:'메뉴명',align:'center',width:100, styler: function(value,row,index) {return "cursor: pointer;";}},
			          {field:'LINK_NM',title:'수급자료명',align:'left',width:117, styler: function(value,row,index) {return "cursor: pointer;";}},
			          {field:'DISP_TYPE',title:'표출단위',align:'center',width:50, styler: function(value,row,index) {return "cursor: pointer;";}},
			          {field:'COLCT_SOURCE',title:'수집출처',align:'center',width:100, styler: function(value,row,index) {return "cursor: pointer;";}},
			          //2020-04-28 [곽제욱] 일자리 통계정보 집계목록 화면 필드 추가로 인한 변경 END
			          {field:'USE_YN',title:'상태',align:'center',width:75, styler: function(value,row,index) {return "cursor: pointer;";},
			        	  formatter: function(value, row, index){
			        		  if(value == "Y") {
			        			  return "사용";
			        		  }
			        		  else {
			        			  return "미사용";
			        		  }
			        	  }
			          },
			          //2020-04-28 [곽제욱] 일자리 통계정보 집계목록 화면 필드 추가(연계여부, 갱신주기, 최근수정일자) START
			          {field:'LINK_YN',title:'KOSIS<br>연계여부',align:'center',width:50, styler: function(value,row,index) {return "cursor: pointer;";}},
			          {field:'UPDT_CYCLE',title:'갱신주기',align:'center',width:50, styler: function(value,row,index) {return "cursor: pointer;";},
				          formatter: function(value, row, index){
			        		  if(value == "01") {
			        			  return "월";
			        		  }
			        		  else if(value == "02") {
			        			  return "분기";
			        		  }
			        		  else if(value == "03") {
			        			  return "반기";
			        		  }
			        		  else if(value == "04") {
			        			  return "년";
			        		  }
			        		  //2020-04-28 [곽제욱] 일자리 통계정보 집계목록 화면 필드중 갱신주기 추가(2년 추가)
			        		  else if(value == "05") {
			        			  return "2년";
			        		  }
			        		  //2020-04-28 [곽제욱] 일자리 통계정보 집계목록 화면 필드중 갱신주기 추가(2년 추가)
			        	  }
			          },
			          {field:'MOD_DT',title:'최근수정일자',align:'center',width:50, styler: function(value,row,index) {return "cursor: pointer;";}},
			          //2020-04-28 [곽제욱] 일자리 통계정보 집계목록 화면 필드 추가(연계여부, 갱신주기, 최근수정일자) END
			          {field:'SUMMATION',title:'집계',align:'center',width:75, styler: function(value,row,index) {return "cursor: pointer;";},
			        	  formatter: function(value, row, index){
			        		  return "<div style='width: 80%; margin: auto; background-color: #4D75D0; color: #FFFFFF;'>실행</div>";
			        	  }
			          }
			          ]],
			          //셀 클릭 이벤트
			          onClickCell: function(index,field,value){
			        	  //체크박스 클릭
			        	  if(field == "checkbox") {
			        		  
			        	  }
			        	  //집계 클릭
			        	  else if(field == "SUMMATION") {
			        		  var LV_THIS = $(this);
			        		  var LV_DATA = LV_THIS.datagrid("getData").rows[index];
			        		  var LV_REG_ID = LV_DATA.REG_ID;
			        		  
			        		  getConfirmPopup('확인', '집계를 실행하시겠습니까?', 'confirm');
			        		  $('#ok_confirmPopup').unbind();
			  				  $('#ok_confirmPopup').click(function(){
			  					  var sopOpenApiCallDatatObj = new sop.openApi.callData.api();
								  sopOpenApiCallDatatObj.addParam('REG_ID', LV_REG_ID);
								  sopOpenApiCallDatatObj.request({
									  method : "POST",
									  async : false,
									  url : contextPath +"/ServiceAPI/DT/workRoadStatsInfoSm/CallWorkRoadStatsInfoSm.json"
								  });
			  				  	  confirmPopupRemove();
			  				  });
			  				  $('#cancel_confirmPopup').unbind();
			  				  $('#cancel_confirmPopup').click(function(){
			  				  	confirmPopupRemove();
			  				  });
			  				  $('#close_confirmPopup').unbind();
			  				  $('#close_confirmPopup').click(function(){
			  				  	confirmPopupRemove();
			  				  });
			        	  }
			        	  //나머지 클릭
			        	  else {
			        		  var LV_THIS = $(this);
			        		  var LV_DATA = LV_THIS.datagrid("getData").rows[index];
			        		  var LV_REG_ID = LV_DATA.REG_ID;
			        		  location.href = './WorkRoadStatsInfoSmUpdate.html?REG_ID='+LV_REG_ID;
			        	  }
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
			          url:contextPath +"/ServiceAPI/DT/workRoadStatsInfoSm/SearchWorkRoadStatsInfoSm.json",
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
		
		//삭제
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
					getConfirmPopup('알림', '일시적인 오류로 삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
					$('#ok_alertPopup').click(function(){
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
				}
			});
		}());
		
		$WorkRoadStatsInfoSm = {
			delData : function(relWordList) {
				var sopOpenApiDelDatatObj = new sop.openApi.delData.api();
				sopOpenApiDelDatatObj.addParam('REG_ID_LIST', relWordList);
				sopOpenApiDelDatatObj.request({
					method : "POST",
					async : false,
					url : contextPath +"/ServiceAPI/DT/workRoadStatsInfoSm/DelWorkRoadStatsInfoSm.json"
				});
			}
		};
	})
}(window, document));

function getQueryParamsObj1(SEARCH_WORD,SEARCH_TYPE){	
	var queryParamsObj = new Object();
	if(SEARCH_WORD != "") {
		queryParamsObj['SEARCH_WORD'] = SEARCH_WORD;
		queryParamsObj['SEARCH_TYPE'] = SEARCH_TYPE;
	}
	return queryParamsObj;
}

/*function getQueryParamsObj(SEARCH_WORD){	
	var queryParamsObj = new Object();
	if(SEARCH_WORD.length >= 2){
		queryParamsObj['SEARCH_WORD'] = SEARCH_WORD;
	}
	return queryParamsObj;
}*/


function openModifyPopup(TITLE, URL, SRV_YN,STAT_ID){
	TITLE = decodeURIComponent(TITLE);
	URL = decodeURIComponent(URL);	
	SRV_YN = decodeURIComponent(SRV_YN);
	STAT_ID = 	decodeURIComponent(STAT_ID);
	$('#validateTd').hide();
	$('#validateButton').hide();
	$('#addButton').hide();
	$('#addButtonDisabled').hide();
	$('#modifyButtonDisabled').hide();
	$('#modifyButton').show();
	$('#popTitle').text('상세정보');
	document.getElementById('popupForm').reset();
	$('.popupWrapper').css('display','block');
	$('#keywordAdd').focus();
	$('#assocWordAdd0').focus();
	$('#keywordAdd').focus();

	$('#keywordOld').html(STAT_ID);
	$('#keywordOld').val($('#keywordOld').text());	

	$('#keywordAdd').html(TITLE);
	$('#keywordAdd').val($('#keywordAdd').text());

	$('#SRV_YN1').show();
	$('#SRV_YN1').val(SRV_YN);

	$("#assocWordAdd0").html(URL); 
	$("#assocWordAdd0").val($("#assocWordAdd0").text());

	$('#validateButton_disabled').hide();
	$('#keywordAdd').attr("disabled",true);
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