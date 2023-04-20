/**
 * 
 * @JSName: mobileManage
 * @Description:
 * 
 * @author: khc
 * @date: 2016/11/17/ 09:22:00
 * @version V1.0
 * 
 */
var pluploader = null;
(function (W, D) {
	W.$mobileManage = W.$mobileManage || {};
	// id of datagrid
	var id_datagrid = '#searchResultTable';
	$(document).ready(function () {
		
		srvLogWrite("L0", "03", "09", "01", "", "");
		
		// page init
		document.getElementById('resetForm').reset();
		$('#noSearchResult').hide();
		// click the search button
		$('#searchButton').click(function(){	
			srvLogWrite("L0", "03", "09", "01", "", "");
			$(id_datagrid).datagrid('load',getQueryParamsObj());
		});
		
		// press the 'enter' key
		$(document).keydown(function (event) {
			if (event.which == 13) {
				if ($('.popupWrapper').css('display') == 'block') {
					return false;
				}
				else {
					$('#searchButton').click();
					return false;
				}
			}
		});
		
		// click the newAddButton
		$('#newAddButton').click(function(){
			srvLogWrite("L0", "03", "09", "02", "", "");
			openAddPopup();
		});
		
		// click the delButton
		$('#delButton').click(function () {
			srvLogWrite("L0", "03", "09", "03", "", "");
			var row = $(id_datagrid).datagrid('getChecked');
			if (row == null || row.length == 0) {
				getConfirmPopup('알림', '삭제 대상을 선택하십시오.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
			} else if (row.length >= 1) {
				var DATA_CHECK = 'N';
				var DATA_CHECK_CNT = 0;
				for(var i=0; i<row.length; i++){
					var a = row[i].USE_YN;
					var b = row[i].CNT;
					if(a=='Y'){
						DATA_CHECK ='Y'; 
					}

					if(b>DATA_CHECK_CNT){
						DATA_CHECK_CNT=1;
					}

				}
				if(DATA_CHECK=='Y'){
					getConfirmPopup('알림', '서비스 여부가 활성 일 경우 삭제 할 수 없습니다.', 'alert');
					$('#ok_alertPopup').click(function () {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function () {
						confirmPopupRemove();
					});
				}else{
					if(DATA_CHECK_CNT>0){
						getConfirmPopup('알림', '삭제 할 수 없습니다.', 'alert');
						$('#ok_alertPopup').click(function () {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function () {
							confirmPopupRemove();
						});
					}else{
						getConfirmPopup('확인', '선택된 항목이 삭제됩니다. 삭제하시겠습니까?', 'confirm');
						$('#ok_confirmPopup').click(function () {
							var MOBILE_ID_List = new Array();
							for ( var i = 0; i < row.length; i++) {
								MOBILE_ID_List[i] = row[i].SEQ;
							}
							$mobileManage.delMobileManage(MOBILE_ID_List);
							confirmPopupRemove();
						});
						$('#cancel_confirmPopup').click(function () {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function () {
							confirmPopupRemove();
						});
					}
				}
			}
		});
		
		$('#addButton').click(function(){
			var MENU_NM = $('#MENU_NM').val();
			if(MENU_NM.length<1){
				getConfirmPopup('알림', '메뉴명을 입력해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
				$('#MENU_NM').focus();
				return;
			}
			var URL = $('#URL').val();
			if(URL.length<1){
				getConfirmPopup('알림', 'URL을 입력해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
				$('#URL').focus();
				return;
			}
			var USE_YN =$('#USE_YN').val();
			$mobileManage.addMobileManage(MENU_NM, URL, USE_YN);
		});
		
		// click the modify button of thema map info
		$('#modifyButton').click(function () {
			var MENU_NM = $("#MENU_NM").val();
			if(MENU_NM.length<1){
				getConfirmPopup('알림', '메뉴명을 입력해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
				$('#MENU_NM').focus();
				return;
			}
			var URL = $('#URL').val();
			if(URL.length<1){
				getConfirmPopup('알림', 'URL을 입력해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
				$('#URL').focus();
				return;
			}
			var USE_YN =$('#USE_YN').val();
			var SEQ = $('#SEQ').val();
			$mobileManage.updateMobileManage(MENU_NM, URL, USE_YN, SEQ);
		});
		
		// search result
		$(id_datagrid).datagrid({
			loadMsg : '처리중 입니다, 기다리 십시요...',
			pagination : true,
			nowrap : false,
			checkOnSelect : false,
			sortName : 'REG_TS',
			sortOrder : 'desc',
			columns : [[ 
              	{field : 'checkbox',checkbox : true},
				{field: 'SEQ',hidden: true},
				{field:'R',title:'번호',align:'center',width:50},   
				{field: 'MENU_NM',title : '메뉴명',align : 'center',width : 150,
					formatter : function (value, row, index) {
						var SEQ = encodeURIComponent((row.SEQ));
						var MENU_NM = encodeURIComponent((row.MENU_NM));
						var URL = encodeURIComponent((row.URL));
						var USE_YN = encodeURIComponent((row.USE_YN));
						if (value != null && value != ''){
							return "<a onclick='openModifyPopup(\""+SEQ+"\",\""+MENU_NM+"\",\""+URL+"\",\""+USE_YN+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
						} else {
							return value;
						}
					}	
				},
				{field:'URL',title:'URL',align:'center',width:300},    
				{field:'USE_YN',title:'서비스여부',align : 'center',width : 100,
					formatter : function (value, row, index) {
						if (value != null && value == 'Y')
							value = "활성";
						else
							value = "비활성";
						return value;
					}
				},
		        {field:'REG_TS',title:'등록일',align:'center',width:117,sortable:true,order:'desc'}
			]],
			onLoadError : function () {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
			},
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
			onLoadSuccess : function (data) {
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
				} else {
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
					} else if (Math.ceil(total / pageSize) <= 5) {
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
			url : contextPath + "/ServiceAPI/DT/MobileManage/searchMobileManage.json"
		});
		// pagination of datagrid
		var page = $(id_datagrid).datagrid('getPager');
		$(page).pagination({
			pageSize : 10,
			displayMsg : '',
			showPageList : false,
			showRefresh : false,
			layout : [],
			links : 5
		});
		// plupload plugins
	});
	
	$mobileManage = {
			delMobileManage : function (MOBILE_ID_List) {
				var sopOpenApiDelMobileManageObj = new sop.openApi.delMobileManage.api();
				sopOpenApiDelMobileManageObj.addParam('MOBILE_ID_List', MOBILE_ID_List);
				sopOpenApiDelMobileManageObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/MobileManage/delMobileManage.json"
				});
			},
			updateMobileManage : function (MENU_NM, URL, USE_YN, SEQ) {
				var sopOpenApiUpdateMobileManageObj = new sop.openApi.updateMobileManage.api();
				sopOpenApiUpdateMobileManageObj.addParam('MENU_NM', MENU_NM);
				sopOpenApiUpdateMobileManageObj.addParam('URL', encodeURIComponent(URL));
				sopOpenApiUpdateMobileManageObj.addParam('USE_YN', USE_YN);
				sopOpenApiUpdateMobileManageObj.addParam('SEQ', SEQ);

				sopOpenApiUpdateMobileManageObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/MobileManage/updateMobileManage.json"
				});
			},
			addMobileManage : function (MENU_NM, URL, USE_YN) {
				var sopOpenApiAddMobileManageObj = new sop.openApi.addMobileManage.api();
				sopOpenApiAddMobileManageObj.addParam('MENU_NM', MENU_NM);
				sopOpenApiAddMobileManageObj.addParam('URL', URL);
				sopOpenApiAddMobileManageObj.addParam('USE_YN', USE_YN);
				sopOpenApiAddMobileManageObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/MobileManage/addMobileManage.json"
				});
			}
	};
	
	
	// delete thema map
	(function () {
		$class("sop.openApi.delMobileManage.api").extend(sop.cnm.absAPI).define({
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
						$(id_datagrid).datagrid('load', getQueryParamsObj(SEARCH_WORD));
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
	// modify thema map map
	(function () {
		$class("sop.openApi.updateMobileManage.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(function () {
							confirmPopupRemove();
							$(".popupWrapper").css("display","none");
						});
						$('#close_confirmPopup').click(function () {
							confirmPopupRemove();
						});
						if (result.success == true) {
							$(id_datagrid).datagrid('reload');
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
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);
			},
			onFail : function (status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);
			}
		});
	}());
	// add themaMap
	(function () {
		$class("sop.openApi.addMobileManage.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(function () {
							confirmPopupRemove();
							$(".popupWrapper").css("display","none");
						});
						$('#close_confirmPopup').click(function () {
							confirmPopupRemove();
						});
						if (result.success == true) {
							$(id_datagrid).datagrid('reload');
						}
					}
				} else {
					getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup').click(function () {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function () {
						confirmPopupRemove();
					});
				}
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);
			},
			onFail : function (status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);
			}
		});
	}());
}(window, document));


//create query parameters for datagrid
function getQueryParamsObj () {
	var queryParamsObj = new Object();
	var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');
	if(SEARCH_WORD.length >= 2){
		queryParamsObj['SEARCH_WORD'] = SEARCH_WORD;
		queryParamsObj['SEARCH_TYPE'] = $("#SEARCH_TYPE").val();
	}
	return queryParamsObj;
}

//신규등록팝업
function openAddPopup(){
	$('#addButton').show();
	$('#addButtonDisabled').hide();
	$('#modifyButtonDisabled').hide();
	$('#modifyButton').hide();
	$('#popTitle').text('모바일 서비스 관리 등록');
	document.getElementById('popupForm').reset();
	$('.popupWrapper').css('display','block');
	$('#MENU_NM').focus();
}

function openModifyPopup(SEQ, MENU_NM, URL, USE_YN){
	SEQ = decodeURIComponent(SEQ);
	MENU_NM = decodeURIComponent(MENU_NM);	
	URL = decodeURIComponent(URL);
	USE_YN = decodeURIComponent(USE_YN);
	
	$('#addButton').hide();
	$('#addButtonDisabled').hide();
	$('#modifyButtonDisabled').hide();
	$('#modifyButton').show();
	$('#popTitle').text('모바일 서비스 관리 수정');
	document.getElementById('popupForm').reset();
	$('.popupWrapper').css('display','block');
	$('#MENU_NM').focus();

	$('#MENU_NM').html(MENU_NM);
	$('#MENU_NM').val($('#MENU_NM').text());	

	$('#URL').html(URL);
	$('#URL').val($('#URL').text());

	$('#USE_YN').show();
	$('#USE_YN').val(USE_YN);
	
	$('#SEQ').val(SEQ);
}