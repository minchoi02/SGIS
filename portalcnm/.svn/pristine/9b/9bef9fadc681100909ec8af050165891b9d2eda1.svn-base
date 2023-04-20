/**
 * 
 * @JSName: userSRVSearch
 * @Description:
 * 
 * @author: liudandan
 * @date: 2014/10/21/ 08:30:00
 * @version V1.0
 * 
 */
(function (W, D) {
	W.$USESRVSearch = W.$USESRVSearch || {};
	// id of datagrid
	var id_datagrid = '#searchResultTable';
	var formatI = 0;
	$(document).ready(function () {
		// reset all select
		document.getElementById('toolbarForm').reset();
		$('#noSearchResult').hide();
		// set value for startDate and endDate
		var today = new Date();
		today.setDate(today.getDate() - 30);
		var pre30Day = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
		today = new Date();
		today.setDate(today.getDate());// today.setDate(today.getDate()-1);
		var pre1Day = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
		$('#startDate').val(pre30Day);
		$('#endDate').val(pre1Day);
				
		$('#startDate').datepicker(getDatepickerObj('start', 'daily'));
		$('#endDate').datepicker(getDatepickerObj('end', 'daily'));
		$('#ENDDATE_INFO').datepicker({
			showOn : 'both',
			buttonImageOnly : true,
			buttonImage : './../include/img/ico/ico_calendar.png',
			buttonText : '달력',
			changeYear : true,
			changeMonth : true,
			showMonthAfterYear : true,
			dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
			monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
			dateFormat : 'yy-mm-dd'
		});
		// request data what on the top of this page
		$USESRVSearch.reqCount();
		// request type and state
		$USESRVSearch.reqCommonCode();
		// click the search button
		$('#searchButton').click(function () {
			$(id_datagrid).datagrid('load', serializeObject($('#toolbarForm')));
		});
		
		// 접수중 건수 클릭했을 때
		$('#SRV_APPLCT').click(function () {
			$(id_datagrid).datagrid('load', {
				GRANT_STATE : 'APPLCT',
				API_AUTH_KEY_TYPE : 'ALL',
				CASE_APP_OPEN_YN : 'ALL',
				CASE_APP_SHARE_YN : 'ALL',
				SEARCHTYPE : 'NOTUSE',
				TIMETYPE : 'DAILY',
				page : '1',
				rows : '10',
				sort : 'SRV_APPLY_DT',
				order : 'desc',
				TYPE : 'APPLCT'
			});
		});
		
		// 반려 건수 클릭했을 때
		$('#SRV_RETURN').click(function () {
			$(id_datagrid).datagrid('load', {
				GRANT_STATE : 'RETURN',
				API_AUTH_KEY_TYPE : 'ALL',
				CASE_APP_OPEN_YN : 'ALL',
				CASE_APP_SHARE_YN : 'ALL',
				SEARCHTYPE : 'NOTUSE',
				TIMETYPE : 'DAILY',
				page : '1',
				rows : '10',
				sort : 'SRV_APPLY_DT',
				order : 'desc',
				TYPE : 'RETURN'
			});
		});	
		
		// 신청 건수 클릭했을 때(TOTAL)
		$('#SRV_TOTAL').click(function () {
			$(id_datagrid).datagrid('load', {
				API_AUTH_KEY_TYPE : 'ALL',
				CASE_APP_OPEN_YN : 'ALL',
				CASE_APP_SHARE_YN : 'ALL',
				SEARCHTYPE : 'NOTUSE',
				TIMETYPE : 'DAILY',
				page : '1',
				rows : '10',
				sort : 'SRV_APPLY_DT',
				order : 'desc',
				TYPE : 'TOTAL'
			});
		});	
		
		// 발급 건수 클릭했을 때(승인)
		$('#SRV_ASSENT').click(function () {
			$(id_datagrid).datagrid('load', {
				GRANT_STATE : 'ASSENT',
				API_AUTH_KEY_TYPE : 'ALL',
				CASE_APP_OPEN_YN : 'ALL',
				CASE_APP_SHARE_YN : 'ALL',
				SEARCHTYPE : 'NOTUSE',
				TIMETYPE : 'DAILY',
				page : '1',
				rows : '10',
				sort : 'SRV_APPLY_DT',
				order : 'desc',
				TYPE : 'APPLCT'
			});
		});
		
		$("#SRV_APPLCT").mouseover(function () {
			$('#SRV_APPLCT').css("text-decoration", "underline");
		});		
		$("#SRV_APPLCT").mouseout(function () {
			$('#SRV_APPLCT').css("text-decoration", "none");
		});
		
		$("#SRV_RETURN").mouseover(function () {
			$('#SRV_RETURN').css("text-decoration", "underline");
		});
		$("#SRV_RETURN").mouseout(function () {
			$('#SRV_RETURN').css("text-decoration", "none");
		});
		
		$("#SRV_TOTAL").mouseover(function () {
			$('#SRV_TOTAL').css("text-decoration", "underline");
		});
		$("#SRV_TOTAL").mouseout(function () {
			$('#SRV_TOTAL').css("text-decoration", "none");
		});
		
		$("#SRV_ASSENT").mouseover(function () {
			$('#SRV_ASSENT').css("text-decoration", "underline");
		});
		$("#SRV_ASSENT").mouseout(function () {
			$('#SRV_ASSENT').css("text-decoration", "none");
		});
		// click the delete button
		$('#delButton').click(function () {
			var row = $(id_datagrid).datagrid('getChecked');
			if (row == null || row.length == 0) {
				getConfirmPopup('알림', '삭제 대상을 선택하십시오.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
			}
			else if (row.length >= 1) {
				getConfirmPopup('확인', '선택된 항목이 삭제됩니다. 삭제하시겠습니까?', 'confirm');
				$('#ok_confirmPopup').click(function () {
					var SRVIDList = new Array();
					for ( var i = 0; i < row.length; i++) {
						SRVIDList[i] = row[i].SRV_ID;
					}
					$USESRVSearch.delSRVRows(SRVIDList);
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
		$(document).find('head').append('<style type="text/css">.validatebox {border-color: #ffa8a8; background-color: #fff3f3; color: #000;}</style>');
		// click the save button on pop page
		$('#modifyButton').click(function () {
			if ($("#GRANT_STATE_SELECT").val() == null) {
				getConfirmPopup('알림', '인증키 상태를 변경할 수 없습니다. 확인하십시오', 'alert');
			}
			// compare value of data what will be changed on the popup page
			var endDatePopNew = $('#ENDDATE_INFO').val();
			var openYNPopNew = $('#popTBody').find('td').eq(9).find('select').val();
			var shareYNPopNew = $('#popTBody').find('td').eq(10).find('select').val();
			var statePopNew = $('#popTBody').find('td').eq(11).find('select').val();
			// change reason can not be empty
			var CHG_REASON = $('#popTBody').find('td').eq(12).find('textarea');
			var CHG_REASON_STR = CHG_REASON.val().replace(/(^\s*)|(\s*$)/g, "");
			if (CHG_REASON_STR == null || CHG_REASON_STR == '') {
				$('#changeReasonInput').addClass('validatebox');
				$('#changeReasonInput').focus();
			}
			else {
				if (getBytesCount(CHG_REASON_STR) < 200) {
					$USESRVSearch.modSRVInfo();
					$('#changeReasonInput').removeClass('validatebox');
				}
				else {
					getConfirmPopup('알림', '지정된  입력범위를 초과하였습니다.', 'alert');
					$('#ok_alertPopup').click(function () {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function () {
						confirmPopupRemove();
					});
				}
			}
		});
		
		$('#changeReasonInput').keypress(function () {
			if ($(this).val() != null && $(this).val() != '') {
				$('#changeReasonInput').removeClass('validatebox');
			}
		});
		// click the cancel button on pop page
		$('#cancelButton').click(function () {
			$(".popupWrapper").css("display", "none");
			$('#changeReasonInput').removeClass('validatebox');
		});
		// click the close button on pop page
		$('#closePopupButton').click(function () {
			$(".popupWrapper").css("display", "none");
			$('#changeReasonInput').removeClass('validatebox');
		});
		// search result
		$(id_datagrid).datagrid({
			loadMsg : '처리중 입니다, 기다리 십시요...',
			pagination : true,
			checkOnSelect : false,
			sortName : 'SRV_APPLY_DT',
			sortOrder : 'desc',
			fixColumnSize : true,
			nowrap : false,
			columns : [ [ {
				field : 'checkbox',
				checkbox : true
			}, {
				field : 'SRV_ID',
				resizable : false,
				hidden : true
			}, {
				field : 'API_AUTH_KEY_TYPE',
				title : '종류',
				align : 'center',
				width : 70,
				sortable : true,
				resizable : false,
				order : 'desc',
				formatter : function (value, row, index) {
					if (value == 'USE') {
						return '상용';
					}
					else if (value == 'TEST') {
						return '테스트';
					}
					else
						return value;
				}
			}, {
				field : 'SRV_NM',
				title : '서비스명',
				align : 'left',
				width : 146,
				resizable : false,
				formatter : function (value, row, index) {
					if (value != null && value != '') {
						value = datagridFormat(value, row, index, formatI);
						return "<a href='javascript:$USESRVSearch.getUSESRVInfo(\"" + row.SRV_ID + "\")' style='color:#4a4a4a;' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>" + value + "</a>";
					}
					else
						return value;
				}
			}, {
				field : 'CASE_APP_OPEN_YN',
				title : '활용사례 공개',
				align : 'center',
				width : 89,
				formatter : function (value, row, index) {
					if (value == 'Y') {
						return '공개';
					}
					else if (value == 'N') {
						return '미공개';
					}
					else
						return value;
				}
			}, {
				field : 'CASE_APP_SHARE_YN',
				title : '활용사례 공유',
				align : 'center',
				width : 89,
				formatter : function (value, row, index) {
					if (value == 'Y') {
						return '공유';
					}
					else if (value == 'N') {
						return '공유안함';
					}
					else
						return value;
				}
			}, {
				field : 'SRV_APPLY_DT',
				title : '신청일',
				align : 'center',
				width : 91,
				sortable : true,
				order : 'desc'
			}, {
				field : 'SRV_GRANT_DT',
				title : '발급일',
				align : 'center',
				width : 91,
				sortable : true,
				order : 'desc'
			}, {
				field : 'GRANT_STATE',
				title : '상태',
				align : 'center',
				width : 58,
				sortable : true,
				order : 'desc',
				formatter : function (value, row, index) {
					
					if (value == 'APPLCT') {
						return '신청';
					}
					else if (value == 'RETURN') {
						return '반려';
					}
					else if (value == 'ASSENT') {
						return '발급';
					}
					else if (value == 'FINISH') {
						return '만료';
					}
					else if (value == 'PUTOFF') {
						return '보류';
					}
					else
						return value;
					
				}
			}, {
				field : 'MEMBER_ID',
				title : '등록계정',
				align : 'center',
				width : 83
			} ] ],
			queryParams : {
				API_AUTH_KEY_TYPE : $('#API_AUTH_KEY_TYPE').val(),
				GRANT_STATE : $('#GRANT_STATE').val(),
				CASE_APP_OPEN_YN : $('#CASE_APP_OPEN_YN').val(),
				CASE_APP_SHARE_YN : $('#CASE_APP_SHARE_YN').val(),
				SEARCHTYPE : $('#SEARCHTYPE').val(),
				TIMETYPE : 'DAILY',
				STARTDATE : $('#startDate').val(),
				ENDDATE : $('#endDate').val()
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
			url : contextPath + "/ServiceAPI/AK/USESRVSearch/searchUSESRV.json"
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
		
	});
	// press the 'enter' key
	$(document).keydown(function (event) {
		if (event.which == 13) {
			if ($('#confirmPopup').css('display') == 'block' || $('.popupWrapper').css('display') == 'block') {
				return false;
			}
			else {
				$('#searchButton').click();
				return false;
			}
		}
	});
	$USESRVSearch = {
		// request Count
		reqCount : function () {
			var sopOpenApiReqCountObj = new sop.openApi.reqCount.api();
			sopOpenApiReqCountObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/AK/USESRVSearch/statSum.json"
			});
		},
		// request Common Code
		reqCommonCode : function () {
			var sopOpenApiReqCommonCodeObj = new sop.openApi.reqCommonCode.api();
			sopOpenApiReqCommonCodeObj.addParam('API_AUTH_KEY_TYPE', 'COM008');
			sopOpenApiReqCommonCodeObj.addParam('GRANT_STATE', 'COM006');
			sopOpenApiReqCommonCodeObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/COMMON/getBCD.json"
			});
		},
		// delete rows
		delSRVRows : function (SRVIDList) {
			var sopOpenApiDelSRVRowsObj = new sop.openApi.delSRVRows.api();
			sopOpenApiDelSRVRowsObj.addParam('SRV_IDList', SRVIDList);
			sopOpenApiDelSRVRowsObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/AK/USESRVSearch/deleteUSESRV.json"
			});
		},
		// get service Infomation
		getUSESRVInfo : function (SRVID) {
			// open popup page
			$(".popupWrapper").css("display", "block");
			// clear all value
			// service name
			$('#popTBody').find('td').eq(0).text('');
			// apply date
			$('#popTBody').find('td').eq(1).text('');
			// service explain
			$('#popTBody').find('td').eq(2).text('');
			// service ID/secrec key
			$('#SRV_ID').val('');
			$('#popTBody').find('td').eq(3).text('');
			// apply person
			$('#popTBody').find('td').eq(4).text('');
			// type
			$('#popTBody').find('td').eq(5).text('');
			// start date
			$('#popTBody').find('td').eq(6).text('');
			// end date
			$('#popTBody').find('td').eq(7).find('input').val('');
			// service URL
			$('#popTBody').find('td').eq(8).find('a').text('');
			// open
			$('#popTBody').find('td').eq(9).find('select').val('');
			// share
			$('#popTBody').find('td').eq(10).find('select').val('');
			// state
			$('#popTBody').find('td').eq(11).find('select').val('');
			// change
			$('#popTBody').find('td').eq(12).find('textarea').val('');
			$('#popTBody').find('td').eq(12).find('textarea').focus();
			// history
			$('#popTBody').find('td').eq(13).find('textarea').val('');
			var sopOpenApiGetUSESRVInfoObj = new sop.openApi.getUSESRVInfo.api();
			sopOpenApiGetUSESRVInfoObj.addParam('SRV_ID', SRVID);
			sopOpenApiGetUSESRVInfoObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/AK/USESRVSearch/getUSESRVInfo.json"
			});
		},
		// modify information
		modSRVInfo : function () {
			var sopOpenApiModSRVInfoObj = new sop.openApi.modSRVInfo.api();
			sopOpenApiModSRVInfoObj.addParam('SRV_ID', $('#SRV_ID').val());
			sopOpenApiModSRVInfoObj.addParam('API_AUTH_KEY_TYPE', $('#API_AUTH_KEY_TYPE_Pupop').val());
			if ($('#ENDDATE_INFO').val().replace(/(^\s*)|(\s*$)/g, '') != '') {
				sopOpenApiModSRVInfoObj.addParam('SRV_END_DT', $('#ENDDATE_INFO').val());
			}
			sopOpenApiModSRVInfoObj.addParam('CASE_APP_OPEN_YN', $('#popTBody').find('td').eq(9).find('select').val());
			sopOpenApiModSRVInfoObj.addParam('CASE_APP_SHARE_YN', $('#popTBody').find('td').eq(10).find('select').val());
			sopOpenApiModSRVInfoObj.addParam('GRANT_STATE', $('#popTBody').find('td').eq(11).find('select').val());
			sopOpenApiModSRVInfoObj.addParam('CHG_REASON', $('#popTBody').find('td').eq(12).find('textarea').val().replace(/(^\s*)|(\s*$)/g, ''));
			sopOpenApiModSRVInfoObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/AK/USESRVSearch/updateUSESRV.json"
			});
		}
	};
	// request Count
	(function () {
		$class("sop.openApi.reqCount.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						var APPLCT = result.SRV_APPLCT;
						var RETURN = result.SRV_RETURN;
						var TOTAL = result.SRV_TOTAL;
						var ASSENT = result.SRV_ASSENT;
						if (APPLCT != null && APPLCT != '') {
							if (APPLCT >= 1000) {
								APPLCT = APPLCT.toLocaleString().toString();
								// ie
								if (APPLCT.indexOf('.') > -1) {
									APPLCT = APPLCT.substring(0, APPLCT.indexOf('.'));
								}
							}
						}
						if (RETURN != null && RETURN != '') {
							if (RETURN >= 1000) {
								RETURN = RETURN.toLocaleString().toString();
								// ie
								if (RETURN.indexOf('.') > -1) {
									RETURN = RETURN.substring(0, RETURN.indexOf('.'));
								}
							}
						}
						if (TOTAL != null && TOTAL != '') {
							if (TOTAL >= 1000) {
								TOTAL = TOTAL.toLocaleString().toString();
								// ie
								if (TOTAL.indexOf('.') > -1) {
									TOTAL = TOTAL.substring(0, TOTAL.indexOf('.'));
								}
							}
						}
						if (ASSENT != null && ASSENT != '') {
							if (ASSENT >= 1000) {
								ASSENT = ASSENT.toLocaleString().toString();
								// ie
								if (ASSENT.indexOf('.') > -1) {
									ASSENT = ASSENT.substring(0, ASSENT.indexOf('.'));
								}
							}
						}
						// receive ing
						$('#SRV_APPLCT').html(APPLCT + '<span>건</span>');

						// return
						$('#SRV_RETURN').html(RETURN + '<span>건</span>');
						// apply
						$('#SRV_TOTAL').html(TOTAL + '<span>건</span>');
						// send
						$('#SRV_ASSENT').html(ASSENT + '<span>건</span>');
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
	// request Common Code
	(function () {
		$class("sop.openApi.reqCommonCode.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						if (result.API_AUTH_KEY_TYPE != null && result.API_AUTH_KEY_TYPE != '') {
							for ( var i = 0; i < result.API_AUTH_KEY_TYPE.length; i++) {
								var item = result.API_AUTH_KEY_TYPE[i];
								$('#API_AUTH_KEY_TYPE').append("<option value='" + item.S_CLASS_CD + "'>" + item.S_CLASS_CD_NM + "</option>");
							}
						}
						if (result.GRANT_STATE != null && result.GRANT_STATE != '') {
							for ( var i = 0; i < result.GRANT_STATE.length; i++) {
								var item = result.GRANT_STATE[i];
								if (item.S_CLASS_CD_NM != '보류') {
									$('#GRANT_STATE').append("<option value='" + item.S_CLASS_CD + "'>" + item.S_CLASS_CD_NM + "</option>");
								}
								
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
	// delete rows
	(function () {
		$class("sop.openApi.delSRVRows.api").extend(sop.cnm.absAPI).define({
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
						// request data what on the top of this page
						$USESRVSearch.reqCount();
						$(id_datagrid).datagrid('load', serializeObject($('#toolbarForm')));
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
	// get service Infomation
	(function () {
		$class("sop.openApi.getUSESRVInfo.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						// give value for data what will be changed on the popup
						// page
						if (result.info != null) {
							// service name
							$('#popTBody').find('td').eq(0).text(result.info.SRV_NM);
							// apply date
							$('#popTBody').find('td').eq(1).text(result.info.SRV_APPLY_DT);
							// service explain
							$('#popTBody').find('td').eq(2).text(result.info.SRV_EXP);
							// service ID/secrec key
							$('#SRV_ID').val(result.info.SRV_ID);
							$('#popTBody').find('td').eq(3).text(result.info.SRV_ID + '/' + result.info.SECRET_KEY);
							// apply person
							$('#popTBody').find('td').eq(4).text(result.info.MEMBER_NM + '(' + result.info.MEMBER_ID + ')');
							// type
							var API_AUTH_KEY_TYPE = result.info.API_AUTH_KEY_TYPE;
							$('#API_AUTH_KEY_TYPE_Pupop').val(API_AUTH_KEY_TYPE);
							if (API_AUTH_KEY_TYPE == 'USE') {
								API_AUTH_KEY_TYPE = '상용';
							}
							else if (API_AUTH_KEY_TYPE == 'TEST') {
								API_AUTH_KEY_TYPE = '테스트';
							}
							$('#popTBody').find('td').eq(5).text(API_AUTH_KEY_TYPE);
							// start date
							$('#popTBody').find('td').eq(6).text(result.info.SRV_START_DT);
							// end date
							$('#popTBody').find('td').eq(7).find('input').val(result.info.SRV_END_DT);
							// service URL
							$('#popTBody').find('td').eq(8).find('a').text(result.info.SRV_APPLY_URL);
							// open
							$('#popTBody').find('td').eq(9).find('select').val(result.info.CASE_APP_OPEN_YN);
							// share
							$('#popTBody').find('td').eq(10).find('select').val(result.info.CASE_APP_SHARE_YN);
							
							var info = result.info;
							if (info.API_AUTH_KEY_TYPE == 'TEST') {
								if (info.GRANT_STATE == 'ASSENT' || info.GRANT_STATE == "FINISH" || info.GRANT_STATE == "RETURN") {
									// 발급, 만료 반려 가능
									var html = '<option value="ASSENT">발급</option>';
									html += '<option value="RETURN">반려</option>';
									html += '<option value="FINISH">만료</option>';
									$("#GRANT_STATE_SELECT").html(html);
								}
							}
							else if (info.API_AUTH_KEY_TYPE == 'USE') {
								if (info.GRANT_STATE == "APPLCT") {
									// 상용키 신청에서는 발급, 반려만 가능
									var html = '<option value="APPLCT">신청</option>';
									html += '<option value="ASSENT">발급</option>';
									html += '<option value="RETURN">반려</option>';
									$("#GRANT_STATE_SELECT").html(html);
									// <option value="APPLCT">신청</option>
								}
								else if (info.GRANT_STATE == "ASSENT") {
									// 상용키 발급에서는 발급, 반려만 가능
									var html = '<option value="ASSENT">발급</option>';
									html += '<option value="RETURN">반려</option>';
									$("#GRANT_STATE_SELECT").html(html);
								}
								else if (info.GRANT_STATE == "FINISH") {
									// 만료
									var html = '<option value="ASSENT">발급</option>';
									html += '<option value="FINISH">만료</option>';
									$("#GRANT_STATE_SELECT").html(html);
								}
								else if (info.GRANT_STATE = "RETURN") {
									var html = '<option value="ASSENT">발급</option>';
									html += '<option value="RETURN">반려</option>';
									$("#GRANT_STATE_SELECT").html(html);
								}
								
							}
							
						}
						// state
						$('#popTBody').find('td').eq(11).find('select').val(result.info.GRANT_STATE);
						// change
						$('#popTBody').find('td').eq(12).find('textarea').val('');
						// history
						var textareaVal = '';
						var historyInfo = result.history;
						if (historyInfo != null && historyInfo != '') {
							for ( var i = 0; i < historyInfo.length; i++) {
								var year = historyInfo[i].CHG_TS.substr(0, 4);
								var month = historyInfo[i].CHG_TS.substr(5, 2);
								var day = historyInfo[i].CHG_TS.substr(8, 2);
								var hour = historyInfo[i].CHG_TS.substr(11, 2);
								var minute = historyInfo[i].CHG_TS.substr(14, 2);
								var timePiece = '오전';
								if (parseInt(hour) > 12) {
									hour = parseInt(hour) - 12;
									timePiece = '오후';
								}
								var CHG_STATE = historyInfo[i].CHG_STATE;
								if (CHG_STATE == 'APPLCT') {
									CHG_STATE = '신청';
								}
								else if (CHG_STATE == 'RETURN') {
									CHG_STATE = '반려';
								}
								else if (CHG_STATE == 'ASSENT') {
									CHG_STATE = '발급';
								}
								else if (CHG_STATE == 'FINISH') {
									CHG_STATE = '만료';
								}
								else if (CHG_STATE == 'PUTOFF') {
									CHG_STATE = '보류';
								}
								
								textareaVal += CHG_STATE + ' (' + year + '년 ' + month + '월 ' + day + '일 ' + timePiece + ' ' + hour + ':' + minute + ')\n';
							}
						}
						$('#popTBody').find('td').eq(13).find('textarea').val(textareaVal);
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
	// modify information
	(function () {
		$class("sop.openApi.modSRVInfo.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(function () {
							if (result.success == true) {
								$('.popupWrapper').css('display', 'none');
							}
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function () {
							if (result.success == true) {
								$('.popupWrapper').css('display', 'none');
							}
							confirmPopupRemove();
						});
						$USESRVSearch.reqCount();
						$(id_datagrid).datagrid('reload');
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