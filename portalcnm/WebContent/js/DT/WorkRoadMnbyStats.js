/**
 *
 * @JSName WorkRoadMnbyStats
 * @Description 일자리 월별 집계 및 경계 현행화 조회 화면
 *
 * @author hjh
 * @date 2021.06.22
 * @version V1.0
 *
 */
var GV_PAGE_SIZE = 10;

(function(W, D) {

	W.$WorkRoadMnbyStats = W.$WorkRoadMnbyStats || {};
	var id_datagrid = '#searchResultTable';

	$(document).ready(function() {

		$.ajax({
			url : contextPath + "/ServiceAPI/DT/workRoadMnbyStats/getWorkRoadMnbyStatsRegYearList.json",
			type : 'post',
			dataType : 'json',
			async : false,
			data : {}
		}).success(function(res) { // 완료
			$.each(res.result, function(i, v) {
				$("#SEARCH_REG_YEAR").append("<option value='" + v.reg_year + "'>" + v.reg_year + "</option>");
			});
		});

		$('#SEARCH_REG_YEAR').change(function() {

			var SEARCH_REG_YEAR = $(this).val();
			$("#SEARCH_REG_MONTH").html("<option value=''>전체</option>");

			$.ajax({
				url : contextPath + "/ServiceAPI/DT/workRoadMnbyStats/getWorkRoadMnbyStatsRegMonthList.json",
				type : 'post',
				dataType : 'json',
				async : false,
				data : {
					SEARCH_REG_YEAR : SEARCH_REG_YEAR
				}
			}).success(function(res) { // 완료
				$.each(res.result, function(i, v) {
					$("#SEARCH_REG_MONTH").append("<option value='" + v.reg_month + "'>" + v.reg_month + "</option>");
				});
			});
		});

		getAddressList("SEARCH_SIDO_CD");

		$('#SEARCH_REG_YEAR').change(function() {
			if ($(this).val() == "") {
				$('#SEARCH_REG_MONTH option:eq(0)').prop("selected", true);
			}
		});

		$('#SEARCH_SIDO_CD').change(function() {
			getAddressList("SEARCH_SGG_CD");
		});

		$('#SEARCH_SGG_CD').change(function() {
			if ($(this).val() == "") {
				$("#SEARCH_ADDR_CD option:eq(0)").prop("selected", true);
			} else {
				$("#SEARCH_ADDR_CD option:eq(1)").prop("selected", true);
			}
			getAddressList("SEARCH_EMDONG_CD");
		});

		$('#SEARCH_EMDONG_CD').change(function() {
			if ($(this).val() == "") {
				$("#SEARCH_ADDR_CD option:eq(1)").prop("selected", true);
			} else {
				$("#SEARCH_ADDR_CD option:eq(2)").prop("selected", true);
			}
		});

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
				field : 'row_num',
				title : '번호',
				align : 'center',
				width : 50
			}, {
				field : 'reg_ym',
				title : '등록년월',
				align : 'center',
				width : 80,
				formatter : function(value, row, index) {
					return (typeof value != "undefined" && value.length == 6) ? (value.substr(0, 4) + "-" + value.substr(4, 6)) : value;
				}
			}, {
				field : 'sido_nm',
				title : '시도',
				align : 'center',
				width : 100
			}, {
				field : 'sgg_nm',
				title : '시군구',
				align : 'center',
				width : 100
			}, {
				field : 'emdong_nm',
				title : '읍면동',
				align : 'center',
				width : 100
			}, {
				field : 'stdr_bndry_year',
				title : '현재 경계년도',
				align : 'center',
				width : 80
			}, {
				field : 'stdr_corp_cnt',
				title : '업체 수',
				align : 'right',
				width : 65,
				formatter : function(value, row, index) {
					return (typeof value != "undefined" && value != "") ? appendCommaToNumber(value) : value;
				}
			}, {
				field : 'stdr_rcrit_psn_cnt',
				title : '구인자 수',
				align : 'right',
				width : 65,
				formatter : function(value, row, index) {
					return (typeof value != "undefined" && value != "") ? appendCommaToNumber(value) : value;
				}
			}, {
				field : 'cmpr',
				title : '상세비교',
				align : 'center',
				width : 55,
				formatter : function(value, row, index) {
					return "<a href='#' onclick='javascript: return false;'><div style='width: 80%; margin: auto; background-color: #4D75D0; color: #FFFFFF;'>조회</div></a>";
				}
			}, {
				field : 'cmpr_bndry_year',
				title : '과거 경계년도',
				align : 'center',
				width : 80
			}, {
				field : 'cmpr_corp_cnt',
				title : '업체 수',
				align : 'right',
				width : 65,
				formatter : function(value, row, index) {
					return (typeof value != "undefined" && value != "") ? appendCommaToNumber(value) : value;
				}
			}, {
				field : 'cmpr_rcrit_psn_cnt',
				title : '구인자 수',
				align : 'right',
				width : 65,
				formatter : function(value, row, index) {
					return (typeof value != "undefined" && value != "") ? appendCommaToNumber(value) : value;
				}
			} ] ],
			// 셀 클릭 이벤트
			onClickCell : function(index, field, value) {
				if (field == "cmpr") {
					$(".popupTable tbody").empty();
					var lv_this = $(this);
					var lv_data = lv_this.datagrid("getData").rows[index];
					var data = {
						CREATE_YM : lv_data.reg_ym,
						SIDO_CD : lv_data.sido_cd,
						SGG_CD : lv_data.sgg_cd,
						EMDONG_CD : lv_data.emdong_cd
					};
					$.ajax({
						url : contextPath + "/ServiceAPI/DT/workRoadMnbyStats/getWorkRoadMnbyStatsCmprList.json",
						type : 'post',
						dataType : 'json',
						async : false,
						data : data
					}).success(function(res) { // 완료
						var htmlArr = [];
						var htmlArr2 = [];
						$.each(res.result, function(i, v) {
							var html = "";
							html += "<tr>";

							var sido_nm = typeof v.sido_nm == "undefined" ? "" : v.sido_nm;
							var sgg_nm = typeof v.sgg_nm == "undefined" ? "" : v.sgg_nm;
							var emdong_nm = typeof v.emdong_nm == "undefined" ? "" : v.emdong_nm;

							html += "<td style='border-left: 1px solid #cacaca; text-align: center;'>" + (v.create_ym.substr(0, 4) + "-" + v.create_ym.substr(4, 6)) + "</td>";
							html += "<td style='text-align: center;'>" + v.bndry_year + "</td>";
							html += "<td style='text-align: center;'>" + sido_nm + "</td>";
							html += "<td style='text-align: center;'>" + sgg_nm + "</td>";
							html += "<td style='text-align: center;'>" + emdong_nm + "</td>";
							html += "<td style='text-align: right;'>" + appendCommaToNumber(v.corp_cnt) + "</td>";
							html += "<td style='text-align: right;'>" + appendCommaToNumber(v.rcrit_psn_cnt) + "</td>";
							html += "</tr>";
							if (v.bndry_year == lv_data.stdr_bndry_year) {
								htmlArr.push(html);
							} else {
								htmlArr2.push(html);
							}
						});
						$(".popupTable tbody").append(htmlArr.join("\r\n"));
						$(".popupTable tbody").append("<tr><td colspan='7' style='border-left: 1px solid #cacaca; text-align: center;'>&nbsp;</td></tr>");
						$(".popupTable tbody").append(htmlArr2.join("\r\n"));
						$('.popupWrapper').css('display', 'block');
					});
				}
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
			url : contextPath + "/ServiceAPI/DT/workRoadMnbyStats/searchWorkRoadMnbyStats.json",
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
	})
}(window, document));

function getAddressList(targetID) {

	var url = "";
	var data = {};
	var sido_cd = $('#SEARCH_SIDO_CD').val();
	var sgg_cd = $('#SEARCH_SGG_CD').val();
	var isAjax = true;

	switch (targetID) {
		case "SEARCH_SIDO_CD":
			$("#SEARCH_SIDO_CD, #SEARCH_SGG_CD, #SEARCH_EMDONG_CD").html("<option value=''>전체</option>");
			data = {
				ADDRESS_TYPE : "SIDO"
			};
			break;
		case "SEARCH_SGG_CD":
			$("#SEARCH_SGG_CD, #SEARCH_EMDONG_CD").html("<option value=''>전체</option>");
			data = {
				ADDRESS_TYPE : "SGG",
				SIDO_CD : sido_cd
			};
			isAjax = sido_cd != null && sido_cd != "";
			break;
		case "SEARCH_EMDONG_CD":
			$("#SEARCH_EMDONG_CD").html("<option value=''>전체</option>");
			data = {
				ADDRESS_TYPE : "EMDONG",
				SIDO_CD : sido_cd,
				SGG_CD : sgg_cd
			};
			isAjax = sido_cd != null && sido_cd != "" && sgg_cd != null && sgg_cd != "";
			break;
	}
	if (isAjax) {
		$.ajax({
			url : contextPath + "/ServiceAPI/DT/workRoadMnbyStats/getWorkRoadMnbyStatsAddressList.json",
			type : 'post',
			dataType : 'json',
			async : false,
			data : data
		}).success(function(res) { // 완료
			$.each(res.result, function(i, v) {
				$("#" + targetID).append("<option value='" + v.cd + "'>" + v.nm + "</option>");
			});
		});
	}
}