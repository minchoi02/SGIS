/**
 *
 * @JSName WorkRoadMnbyStatsResve
 * @Description 일자리 경계 현행화 관리 화면
 *
 * @author hjh
 * @date 2021.06.22
 * @version V1.0
 *
 */
var GV_PAGE_SIZE = 10;

(function(W, D) {

	W.$WorkRoadMnbyStatsResve = W.$WorkRoadMnbyStatsResve || {};
	var id_datagrid = '#searchResultTable';

	$(document).ready(function() {

		setDatepickerDefaultRange('SEARCH_BGN_RESVE_DT', 'SEARCH_END_RESVE_DT');
		setDatepickerDefaultRange('SEARCH_BGN_EXC_DT', 'SEARCH_END_EXC_DT');
		setDatepickerDefaultRange('SEARCH_BGN_END_DT', 'SEARCH_END_END_DT');

		// 검색 버튼
		$('#searchButton').click(function() {
			var queryParamsObj = new Object();
			$("[id^=SEARCH_]").each(function() {
				if ($(this).val() != null && $(this).val() != "") {
					queryParamsObj[$(this).attr("id")] = $(this).val().replace(/(^\s*)|(\s*$)/g, '');
				}
			});
			$(id_datagrid).datagrid('load', queryParamsObj);
		});

		// 신규등록
		$('#newButton').click(function() {
			// srvLogWrite("L0", "04", "03", "03", "", "");
			var today = new Date();
			$("#BNDRY_YEAR").val(today.getFullYear());
			$('.popupWrapper').css('display', 'block');

			// getConfirmPopup('확인', '경계변경 예약을 등록하시겠습니까?', 'confirm');
			// $("#close_confirmPopup").css("padding-top", "3px");
			// $('#ok_confirmPopup').unbind();
			// $('#ok_confirmPopup').click(function() {
			// $WorkRoadMnbyStatsResve.addData();
			// confirmPopupRemove();
			// });
			// $('#cancel_confirmPopup').unbind();
			// $('#cancel_confirmPopup').click(function() {
			// confirmPopupRemove();
			// });
			// $('#close_confirmPopup').unbind();
			// $('#close_confirmPopup').click(function() {
			// confirmPopupRemove();
			// });
		});

		$('#addButton').click(function() {
			var bndryYear = $("#BNDRY_YEAR").val();

			if (bndryYear.length != 4 || !$.isNumeric(bndryYear)) {
				getConfirmPopup('알림', '경계년도를 정확히 입력해 주세요.', 'alert');
				$('#ok_alertPopup').click(function() {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function() {
					confirmPopupRemove();
				});
				$('#BNDRY_YEAR').focus();
				return;
			}

			var insertFlag = false;
			$.ajax({
				url : contextPath + "/ServiceAPI/DT/workRoadMnbyStats/getWorkRoadMnbyStatsResveCount.json",
				type : 'post',
				dataType : 'json',
				async : false,
				data : {
					BNDRY_YEAR : bndryYear
				}
			}).success(function(res) { // 완료
				insertFlag = res.result > 0 ? true : false;
			});
			if (!insertFlag) {
				getConfirmPopup('알림', '사용 불가능한 경계년도 입니다.<br/>현재 경계년도보다 크거나 같고, 현재 년도보다 작거나 같아야 합니다.', 'alert');
				$('#ok_alertPopup').click(function() {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function() {
					confirmPopupRemove();
				});
				$('#BNDRY_YEAR').focus();
				return;
			}

			getConfirmPopup('확인', '경계변경 예약을 등록하시겠습니까?', 'confirm');
			$('#ok_confirmPopup').unbind();
			$('#ok_confirmPopup').click(function() {
				$WorkRoadMnbyStatsResve.addData();
				confirmPopupRemove();
			});
			$('#cancel_confirmPopup').unbind();
			$('#cancel_confirmPopup').click(function() {
				confirmPopupRemove();
			});
			$('#close_confirmPopup').unbind();
			$('#close_confirmPopup').click(function() {
				confirmPopupRemove();
			});
		});

		// 삭제
		$('#delButton').click(function() {
			// srvLogWrite("L0", "04", "03", "03", "", "");
			var row = $(id_datagrid).datagrid('getChecked');
			// console.log(row);
			if (row == null || row.length == 0) {
				getConfirmPopup('알림', '선택된 데이터가 없습니다. 다시 선택해 주세요.', 'alert');
				$('#ok_alertPopup').unbind();
				$('#ok_alertPopup').click(function() {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').unbind();
				$('#close_confirmPopup').click(function() {
					confirmPopupRemove();
				});
			} else if (row.length >= 1) {
				getConfirmPopup('확인', '선택된 항목이 삭제됩니다. 실행하시겠습니까?', 'confirm');
				$('#ok_confirmPopup').unbind();
				$('#ok_confirmPopup').click(function() {
					var relWordList = new Array();
					for (var i = 0; i < row.length; i++) {
						relWordList[i] = encodeURIComponent(row[i].resve_dt);
					}
					$WorkRoadMnbyStatsResve.delData(relWordList);
					confirmPopupRemove();
				});
				$('#cancel_confirmPopup').unbind();
				$('#cancel_confirmPopup').click(function() {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').unbind();
				$('#close_confirmPopup').click(function() {
					confirmPopupRemove();
				});
			}
		});

		// 화면 엔터키 => 검색 버튼
		$(document).keydown(function(event) {
			if (event.which == 13) {
				if ($('#confirmPopup').css('display') == 'block' || $('.popupWrapper').css('display') == 'block') {
					return false;
				} else {
					$('#searchButton').click();
					return false;
				}
			}
		});

		// 데이터 테이블 선언
		$(id_datagrid).datagrid({
			loadMsg : '처리 중입니다. 기다리십시오.',
			pagination : true,
			nowrap : false,
			checkOnSelect : false,
			columns : [ [ {
				field : 'resve_dt',
				hidden : true
			}, {
				field : 'checkbox',
				checkbox : true
			}, {
				field : 'row_num',
				title : '번호',
				align : 'center',
				width : 60
			}, {
				field : 'resve_dt_2',
				title : '예약일시',
				align : 'center',
				width : 170,
				formatter : function(value, row, index) {
					if (typeof value != "undefined" && value != "") {
						return value.substr(0, 4) + "-" + value.substr(4, 2) + "-" + value.substr(6, 2) + " " + value.substr(8, 2) + ":" + value.substr(10, 2) + ":" + value.substr(12, 2);
					} else {
						return value;
					}
				}
			}, {
				field : 'bndry_year',
				title : '경계년도',
				align : 'center',
				width : 75
			}, {
				field : 'exc_dt',
				title : '수행시작일시',
				align : 'center',
				width : 170,
				formatter : function(value, row, index) {
					if (typeof value != "undefined" && value != "") {
						return value.substr(0, 4) + "-" + value.substr(4, 2) + "-" + value.substr(6, 2) + " " + value.substr(8, 2) + ":" + value.substr(10, 2) + ":" + value.substr(12, 2);
					} else {
						return value;
					}
				}
			}, {
				field : 'end_dt',
				title : '수행종료일시',
				align : 'center',
				width : 170,
				formatter : function(value, row, index) {
					if (typeof value != "undefined" && value != "") {
						return value.substr(0, 4) + "-" + value.substr(4, 2) + "-" + value.substr(6, 2) + " " + value.substr(8, 2) + ":" + value.substr(10, 2) + ":" + value.substr(12, 2);
					} else {
						return value;
					}
				}
			}, {
				field : 'sttus',
				title : '상태',
				align : 'center',
				width : 71,
				formatter : function(value, row, index) {
					if (typeof value != "undefined" && value != "") {
						var returnValue = "예약";
						switch (value) {
							case "1":
								returnValue = "수행중";
								break;
							case "2":
								returnValue = "완료";
								break;
							case "3":
								returnValue = "실패";
								break;
						}
						return returnValue;
					} else {
						return value;
					}
				}
			} ] ],
			// 셀 클릭 이벤트
			onClickCell : function(index, field, value) {
			},
			onLoadError : function() {
				getConfirmPopup('알림', '일시적인 오류로 검색에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function() {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function() {
					confirmPopupRemove();
				});
			},
			onClickRow : function(rowIndex, rowData) {
			},
			onCheck : function(rowIndex, rowData) {
			},
			onLoadSuccess : function(data) {
				var total = data.total;
				var pageSize = $(page).pagination('options').pageSize;

				if (total < 1) {
					$('#noSearchResult').show();
					$(page).pagination({
						pageSize : GV_PAGE_SIZE,
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
							pageSize : GV_PAGE_SIZE,
							displayMsg : '',
							showPageList : false,
							showRefresh : false,
							layout : [ 'first', 'prev', 'links', 'next', 'last' ],
							links : 5
						});
					} else if (Math.ceil(total / pageSize) <= 5) {
						$(page).pagination({
							pageSize : GV_PAGE_SIZE,
							displayMsg : '',
							showPageList : false,
							showRefresh : false,
							layout : [ 'links' ],
							links : 5
						});
					}
				}
			},
			onBeforeLoad : function(param) {
				$('#noSearchResult').hide();

				if (param.ACTIVE_YN) {
					ACTIVE_YN_SEND = param.ACTIVE_YN;
				} else {
					ACTIVE_YN_SEND = 'ALL';
				}
			},
			loadFilter : function(data) {
				if (data.rows == null) {
					if (data.errCd == -1) {
						getConfirmPopup('알림', data.errMsg, 'alert');
						$('#ok_alertPopup').click(function() {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function() {
							confirmPopupRemove();
						});
					}
					data.rows = new Array();
				}
				return data;
			},
			url : contextPath + "/ServiceAPI/DT/workRoadMnbyStats/searchWorkRoadMnbyStatsResve.json",
			pageSize : GV_PAGE_SIZE
		});

		// 하단 페이징
		var page = $(id_datagrid).datagrid('getPager');
		$(page).pagination({
			pageSize : GV_PAGE_SIZE,
			displayMsg : '',
			showPageList : false,
			showRefresh : false,
			layout : [],
			links : 5
		});

		// 등록
		(function() {
			$class("sop.openApi.addData.api").extend(sop.cnm.absAPI).define({
				onSuccess : function(status, res) {
					if (res.errCd == "0") {
						getConfirmPopup('알림', res.result.msg, 'alert');
						if (res.result.success == true) {
							$('#ok_alertPopup').unbind();
							$('#ok_alertPopup').click(function() {
								$('#searchButton').click();
								confirmPopupRemove();
								$('.popupWrapper').css('display', 'none');
							});
						} else {
							$('#ok_alertPopup').unbind();
							$('#ok_alertPopup').click(function() {
								confirmPopupRemove();
							});
						}
						$('#close_confirmPopup').unbind();
						$('#close_confirmPopup').click(function() {
							confirmPopupRemove();
						});
					} else {
						getConfirmPopup('알림', res.errMsg, 'alert');
						$('#ok_alertPopup').unbind();
						$('#ok_alertPopup').click(function() {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').unbind();
						$('#close_confirmPopup').click(function() {
							confirmPopupRemove();
						});
					}
				},
				onFail : function(status) {
					getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
					$('#ok_alertPopup').click(function() {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function() {
						confirmPopupRemove();
					});
				}
			});
		}());

		$WorkRoadMnbyStatsResve = {
			// 등록
			addData : function() {
				var sopOpenApiaddDataObj = new sop.openApi.addData.api();
				var BNDRY_YEAR = $("#BNDRY_YEAR").val();
				sopOpenApiaddDataObj.addParam('BNDRY_YEAR', encodeURIComponent(BNDRY_YEAR));
				sopOpenApiaddDataObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/workRoadMnbyStats/addWorkRoadMnbyStatsResve.json"
				});
			}
		};

		// 삭제
		(function() {
			$class("sop.openApi.delData.api").extend(sop.cnm.absAPI).define({
				onSuccess : function(status, res) {
					var result = res.result;
					if (res.errCd == "0") {
						if (result != null) {
							getConfirmPopup('알림', result.msg, 'alert');
							$('#ok_alertPopup').click(function() {
								$(id_datagrid).datagrid('reload');
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function() {
								confirmPopupRemove();
							});
						}
					} else {
						getConfirmPopup('알림', res.errMsg, 'alert');
						$('#ok_alertPopup').click(function() {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function() {
							confirmPopupRemove();
						});
					}
				},
				onFail : function(status) {
					getConfirmPopup('알림', '일시적인 오류로 삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
					$('#ok_alertPopup').click(function() {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function() {
						confirmPopupRemove();
					});
				}
			});
		}());

		$WorkRoadMnbyStatsResve.delData = function(relWordList) {
			var sopOpenApiDelDatatObj = new sop.openApi.delData.api();
			sopOpenApiDelDatatObj.addParam('RESVE_DT_LIST', relWordList);
			sopOpenApiDelDatatObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/DT/workRoadMnbyStats/delWorkRoadMnbyStatsResve.json"
			});
		};

	})
}(window, document));