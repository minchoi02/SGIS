/**   
 *
 * @JSName: QASearch
 * @Description:  
 *
 * @author: liudandan   
 * @date：: 2014/11/03/ 10:30:00    
 * @version V1.0      
 *    
 */
//get From URL
//receive
var BOARD_CD = getParameter('BOARD_CD');
var S_CLASS_CD_NM = getParameter('S_CLASS_CD_NM');
var keywordSelect = getParameter('keywordSelect');
var keywordInput = decodeURI(getParameter('keywordInput'));
var pageNumber = getParameter('pageNumber');
var POST_CD = getParameter('POST_CD');
var firstFlag = false;
(function (W, D) {
	W.$DevQASearch = W.$DevQASearch || {};
	//send
	var BOARD_CD_SEND = 'BOARD_004';
	var POST_CD_SEND = 'ALL';
	var S_CLASS_CD_NM_SEND = 'ALL';
	var keywordSelect_SEND = 'REG_MEMBER_ID';
	var keywordInput_SEND = '';
	var PAGENUMBER_SEND = 1;
	//id of datagrid
	var id_datagrid = '#searchResultTable';
	$(document).ready(function () {
		srvLogWrite("L0", "05", "02", "06", "", "");
		//init select when loading page
		document.getElementById('selectForm').reset();
		$('#keywordInput').validatebox({
			validType : 'cnmInput'
		});
		
		$('#noSearchResult').hide();
		if (BOARD_CD != null && BOARD_CD != false && BOARD_CD != '') {
			firstFlag = true;
			
			if(POST_CD !=null && POST_CD != false && POST_CD != ''){
				$('#POST_CD').val(keywordSelect);
				if ($('#POST_CD').val() == null || $('#POST_CD').val() == '') {
					$('#POST_CD').val('ALL');
				}
			}
			
			if (keywordSelect != null && keywordSelect != false && keywordSelect != '') {
				$('#keywordSelect').val(keywordSelect);
				if ($('#keywordSelect').val() == null || $('#keywordSelect').val() == '') {
					$('#keywordSelect').val('REG_MEMBER_ID');
				}
			}
			if (keywordInput != null && keywordInput != false && keywordInput != 'false' && keywordInput != '') {
				$('#keywordInput').val(keywordInput);
			}
			if (pageNumber == null || pageNumber == false || pageNumber == '' || pageNumber < 1) {
				pageNumber = 1;
			}
		}
		else {
			pageNumber = 1;
			order = 'desc';
			sort = 'REG_TS';
		}
		
		
		//request S_CLASS_CD_NM
		$DevQASearch.reqType();
		
		var firstSearchFlag = true;
		//click search button
		$('#searchButton').click(function () {
			srvLogWrite("L0", "05", "02", "06", "", "");
			if ($('#keywordInput').validatebox('isValid')) {
				$(id_datagrid).datagrid('load', getQueryParamsObj());
			}
		});
		//click delete QA button
		$('#delQAButton').click(function () {
			srvLogWrite("L0", "05", "02", "07", "", "");
			var row = $(id_datagrid).datagrid('getChecked');
			if (row == null || row.length == 0) {
				getConfirmPopup('알림', '데이터 체크하세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
			}
			else if (row.length >= 1) {
				getConfirmPopup('확인', '선택된 항목이 삭제됩니다. 실행하시겠습니까?', 'confirm');
				$('#ok_confirmPopup').click(function () {
					var BOARD_CD_List = new Array();
					var PARENT_POST_ID_List = new Array();
					var POST_DEPTH_List = new Array();
					var POST_ORDER_List = new Array();
					for ( var i = 0; i < row.length; i++) {
						BOARD_CD_List[i] = row[i].BOARD_CD;
						PARENT_POST_ID_List[i] = row[i].PARENT_POST_ID;
						POST_DEPTH_List[i] = row[i].POST_DEPTH;
						POST_ORDER_List[i] = row[i].POST_ORDER;
					}
					$DevQASearch.delQA(BOARD_CD_List, PARENT_POST_ID_List, POST_DEPTH_List, POST_ORDER_List);
					confirmPopupRemove();
				});
				$('#cancel_confirmPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
			}
		});
		
		//search result
		$(id_datagrid).datagrid({
			loadMsg : '처리중 입니다, 기다리 십시요...',
			pagination : true,
			nowrap : false,
			checkOnSelect : false,
			pageNumber : pageNumber,
			columns : [ [ {
				field : 'checkbox',
				checkbox : true
			}, {
				field : 'POST_ORDER',
				hidden : true
			}, {
				field : 'PRIORITY_DISP_YN',
				hidden : true
			}, {
				field : 'POST_DEPTH',
				hidden : true
			}, {
				field : 'POST_HITS',
				hidden : true
			}, {
				field : 'POST_NO',
				hidden : true
			}, {
				field : 'PARENT_POST_ID',
				hidden : true
			}, {
				field : 'FILE_YN',
				hidden : true
			}, {
				field : 'BOARD_CD',
				hidden : true
			}, {
				field : 'R',
				title : '번호',
				align : 'center',
				width : 50
			}, {
				field : 'S_CLASS_CD_NM',
				title : '카테고리',
				align : 'center',
				width : 109,
				formatter : function (value, row, index) {
					if (value != null && value != '') {
						if (row.POST_ORDER > 0) {
							value = '';
						}
						return value;
					}
				}
			}, {
				field : 'POST_TITLE',
				title : '제목',
				align : 'left',
				width : 360,
				formatter : function (value, row, index) {
					if (value != null && value != '') {
						var returnStr = "<a href='/s-portalcnm/html/QA/";
						var title = value;
						if (row.POST_DEPTH == 0) {
							returnStr += "DevQADetail.html?POST_NO=" + row.POST_NO + "&BOARD_CD=" + row.BOARD_CD+"&POST_DEPTH=" + row.POST_DEPTH;
						}
						else if (row.POST_DEPTH > 0) {
							returnStr += "DevQAReply.html?POST_NO=" + row.POST_NO + "&POST_DEPTH=" + row.POST_DEPTH + "&PARENT_POST_ID=" + row.PARENT_POST_ID + "&BOARD_CD=" + row.BOARD_CD + "&type=update";
							returnStr = "ㄴRe:&nbsp;" + returnStr;
							for ( var i = 0; i < row.POST_DEPTH; i++) {
								returnStr = '&nbsp;' + returnStr;
							}
						}
						returnStr = returnStr + "&BOARD_CD_SEND=" + BOARD_CD_SEND + "&S_CLASS_CD_NM=" + S_CLASS_CD_NM_SEND + "&keywordSelect=" + keywordSelect_SEND + "&keywordInput=" + keywordInput_SEND + "&pageNumber=" + PAGENUMBER_SEND + "' style='color:#4a4a4a;' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>" + value+ "</a>";
						
						if (row.FILE_YN == 'Y') {
							returnStr += "&nbsp;<img src='/s-portalcnm/html/include/img/ico/ico_folder.png' />";
						}
						return returnStr;
					}
					else
						return value;
				}
			}, {
				field : 'REG_MEMBER_ID',
				title : '작성자',
				align : 'center',
				width : 100,
				formatter: function (value, row, index) {
					if(value!=null && value!=''){
						//관리자 GPKI 등록된 ID
						if(value.length==44){
							return '관리자';
						}else{
							return value;
						}
					}
				}
			}, {
				field : 'REG_TS',
				title : '등록일',
				align : 'center',
				width : 98
			} ] ],
			queryParams : getQueryParamsObj(),
			onClickRow : function (rowIndex, rowData) {
				$(id_datagrid).datagrid('unselectAll');
				$(id_datagrid).datagrid('selectRow', rowIndex);
			},
			onCheck : function (rowIndex, rowData) {
				$(id_datagrid).datagrid('unselectAll');
				var checkedRows = $(id_datagrid).datagrid('getChecked');
				for ( var i = 0; i < checkedRows.length; i++) {
					var rowIndex = $(id_datagrid).datagrid('getRowIndex', checkedRows[i]);
					$(id_datagrid).datagrid('selectRow', rowIndex);
				}
			},
			onLoadError : function () {
				getConfirmPopup('알림', '검색할 수 없습니다.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
			},
			onLoadSuccess : function (data) {
				$('#totalQueryCount').text(' ' + data.total);
				var total = data.total;
				var pageSize = $(page).pagination('options').pageSize;
				if (total < 1) {
					$('#noSearchResult').show();
					$(page).pagination({
						pageSize : 10,
						displayMsg : '',
						showPageList : false,
						showRefresh : false,
						layout : [],
						links : 5
					});
				}
				else {
					$('#noSearchResult').hide();
					if (Math.ceil(total / pageSize) > 5) {
						$(page).pagination({
							pageSize : 10,
							displayMsg : '',
							showPageList : false,
							showRefresh : false,
							layout : [ 'first', 'prev', 'links', 'next', 'last' ],
							links : 5
						});
					}
					else if (Math.ceil(total / pageSize) <= 5) {
						$(page).pagination({
							pageSize : 10,
							displayMsg : '',
							showPageList : false,
							showRefresh : false,
							layout : [ 'links' ],
							links : 5
						});
					}
				}
			},
			onBeforeLoad : function (param) {
				$('#noSearchResult').hide();
				if (param.page) {
					PAGENUMBER_SEND = param.page;
				}
				if (param.BOARD_CD) {
					BOARD_CD_SEND = param.BOARD_CD;
				}
				if (param.BOARD_S_CLASS_CD) {
					S_CLASS_CD_NM_SEND = param.BOARD_S_CLASS_CD;
				}
				else {
					S_CLASS_CD_NM_SEND = 'ALL';
				}
				if (param.POST_TITLE) {
					keywordSelect_SEND = 'POST_TITLE';
					keywordInput_SEND = param.POST_TITLE;
				}
				else if (param.POST_CONTENT) {
					keywordSelect_SEND = 'POST_CONTENT';
					keywordInput_SEND = param.POST_CONTENT;
				}
				else if (param.REG_MEMBER_ID) {
					keywordSelect_SEND = 'REG_MEMBER_ID';
					keywordInput_SEND = param.REG_MEMBER_ID;
				}
				else {
					keywordSelect_SEND = 'REG_MEMBER_ID';
					keywordInput_SEND = '';
				}
			},
			loadFilter : function (data) {
				if (data.rows == null) {
					if (data.errCd == -1) {
						getConfirmPopup('알림', data.errMsg, 'alert');
						$('#ok_alertPopup').click(function () {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function () {
							confirmPopupRemove();
						});
					}
					data.rows = new Array();
				}
				return data;
			},
			url : contextPath + "/ServiceAPI/QA/QAManage/searchQA.json"
		});
		//pagination of datagrid
		var page = $(id_datagrid).datagrid('getPager');
		$(page).pagination({
			pageSize : 10,
			displayMsg : '',
			showPageList : false,
			showRefresh : false,
			layout : [],
			links : 5
		});
	});
	//press the 'enter' key
	$(document).keydown(function (event) {
		if (event.which == 13) {
			if ($('#confirmPopup').css('display') == 'block') {
				return false;
			}
			else {
				$('#searchButton').click();
				return false;
			}
		}
	});
	$DevQASearch = {
		//request S_CLASS_CD_NM
		reqType : function () {
			var sopOpenApiReqTypeObj = new sop.openApi.reqType.api();
			var BOARD_CD = "BOARD_004";
			sopOpenApiReqTypeObj.addParam('BOARD_CD', "BOARD_004");
			sopOpenApiReqTypeObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/QA/QAManage/getType.json"
			});
		},
		//delete QA
		delQA : function (BOARD_CD_List, PARENT_POST_ID_List, POST_DEPTH_List, POST_ORDER_List) {
			var sopOpenApiDelQAObj = new sop.openApi.delQA.api();
			sopOpenApiDelQAObj.addParam('BOARD_CD_List', BOARD_CD_List);
			sopOpenApiDelQAObj.addParam('PARENT_POST_ID_List', PARENT_POST_ID_List);
			sopOpenApiDelQAObj.addParam('POST_DEPTH_List', POST_DEPTH_List);
			sopOpenApiDelQAObj.addParam('POST_ORDER_List', POST_ORDER_List);
			sopOpenApiDelQAObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/QA/QAManage/deleteQA.json"
			});
		}
	};
	//request S_CLASS_CD_NM
	(function () {
		$class("sop.openApi.reqType.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						$('#S_CLASS_CD_NM').empty();
						$('#S_CLASS_CD_NM').append("<option value='ALL'>전체</option>");
						for ( var i = 0; i < result.length; i++) {
							$('#S_CLASS_CD_NM').append("<option value='" + result[i].S_CLASS_CD + "'>" + result[i].S_CLASS_CD_NM + "</option>");
						}
						$('#S_CLASS_CD_NM').val('ALL');
						if (S_CLASS_CD_NM != null && S_CLASS_CD_NM != false && S_CLASS_CD_NM != '') {
							$('#S_CLASS_CD_NM').val(S_CLASS_CD_NM);
							if ($('#S_CLASS_CD_NM').val() == null || $('#S_CLASS_CD_NM').val() == '') {
								$('#S_CLASS_CD_NM').val('ALL');
							}
						}
					}
				}
				else {
					getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup').click(function () {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function () {
						confirmPopupRemove();
					});
				}
			},
			onFail : function (status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
			}
		});
	}());
	//delete QA
	(function () {
		$class("sop.openApi.delQA.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(function () {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function () {
							confirmPopupRemove();
						});
						if ($('#keywordInput').validatebox('isValid')) {
							$(id_datagrid).datagrid('load', getQueryParamsObj());
						}
					}
				}
				else {
					getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup').click(function () {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function () {
						confirmPopupRemove();
					});
				}
			},
			onFail : function (status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
			}
		});
	}());
}(window, document));
//create query parameters for datagrid
function getQueryParamsObj () {
	var queryParamsObj = new Object();
	if (firstFlag == true) {
		BOARD_CD = getParameter('BOARD_CD');
		var S_CLASS_CD_NM = getParameter('S_CLASS_CD_NM');
		var keywordSelect = getParameter('keywordSelect');
		var keywordInput = decodeURI(getParameter('keywordInput'));
		if ($('#POST_CD').val() != 'ALL' && $('#POST_CD').val() != null) {
			queryParamsObj['POST_CD'] = $('#POST_CD').val();
		}
		if (BOARD_CD != null && BOARD_CD != false && BOARD_CD != '') {
			queryParamsObj['BOARD_CD'] = "BOARD_004";
		}
		if (S_CLASS_CD_NM != null && S_CLASS_CD_NM != false && S_CLASS_CD_NM != '' && S_CLASS_CD_NM != 'ALL') {
			queryParamsObj['BOARD_S_CLASS_CD'] = S_CLASS_CD_NM;
		}
		if (keywordInput != null && keywordInput != false && keywordInput.replace(/(^\s*)|(\s*$)/g, '') != '') {
			if (keywordSelect != null && keywordSelect != false && keywordSelect != '') {
				queryParamsObj[keywordSelect] = keywordInput;
			}
		}
		firstFlag = false;
	}
	else {
		queryParamsObj['BOARD_CD'] ="BOARD_004";
		if ($('#S_CLASS_CD_NM').val() != 'ALL' && $('#S_CLASS_CD_NM').val() != null) {
			queryParamsObj['BOARD_S_CLASS_CD'] = $('#S_CLASS_CD_NM').val();
		}
		if ($('#POST_CD').val() != 'ALL' && $('#POST_CD').val() != null) {
			queryParamsObj['POST_CD'] = $('#POST_CD').val();
		}
		if ($('#keywordInput').val().replace(/(^\s*)|(\s*$)/g, '').length > 0) {
			queryParamsObj[$('#keywordSelect').val()] = $('#keywordInput').val().replace(/(^\s*)|(\s*$)/g, '');
		}
	}
	return queryParamsObj;
}