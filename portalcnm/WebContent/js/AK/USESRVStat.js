/**   
 *
 * @JSName: APIStat
 * @Description: 
 *
 * @author: chenzhanchao
 * @date: 2014/10/20/ 13:00:00    
 * @version V1.0      
 *    
 */
(function (W, D) {
	
	W.$highCharts = W.$highCharts || {};
	//highCharts Area OpenAPI
	var openAPIAreaChart = null;
	//page loading
	$(document).ready(function () {
		srvLogWrite("L0", "02", "01", "01", "", "");
		var today = new Date();
		today.setMonth(today.getMonth() - 11, 1);
		var pre12Month = today.getFullYear() + '-' + formatDate(today.getMonth() + 1);
		today = new Date();
		var pre1Month = today.getFullYear() + '-' + formatDate(today.getMonth() + 1);
		$('#startDate').val(pre12Month);
		$('#endDate').val(pre1Month);
		
		var startDateObj = getDatepickerObj('start', 'monthly');
		$('#startDate').datepicker(startDateObj);
		
		var endDateObj = getDatepickerObj('end', 'monthly');
		$('#endDate').datepicker(endDateObj);
		//	$(".ui-datepicker-calendar").hide();
		$('#startDate').focus(function () {
			$(".ui-datepicker-calendar").hide();
		});
		$('#startDate, #endDate').click(function () {
			$(".ui-datepicker-calendar").hide();
		});
		$('#endDate').focus(function () {
			$(".ui-datepicker-calendar").hide();
		});
		//load data when loading page
		$highCharts.requestSumData();
		$highCharts.requestDiagData();
		//검색   click search button
		$('#searchButton').click(function () {
			srvLogWrite("L0", "02", "01", "01", "", "");
			$highCharts.requestDiagData();
		});
		//highCharts Area OpenAPI
		openAPIAreaChart = new Highcharts.Chart({
			chart : {
				renderTo : 'useSrvArea',
				type : 'line'
			},
			title : {
				text : null
			},
			tooltip : {
				pointFormat : '<b>{point.y}</b>'
			},
			xAxis : {
				title : {
					text : null
				},
				categories : null
			},
			yAxis : {
				title : {
					text : null
				},
				min : 0
			},
			series : [ {
				name : '총 발급건수',
				data : null
			} ],
			legend : {
				layout : 'vertical',
				align : 'right',
				verticalAlign : 'top',
				x : 0,
				y : 0,
				floating : true,
				borderWidth : 0
			}
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
		return false;
	});
	//request data
	$highCharts = {
		requestSumData : function () {
			var sopOpenApirRequestDiagDataObj = new sop.openApi.requestSumData.api();
			sopOpenApirRequestDiagDataObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/AK/USESRVStat/statSum.json"
			});
			
		},
		requestDiagData : function () {
			var timeType = 'MONTHLY';
			var sopOpenApiHighChartsObj = new sop.openApi.requestDiagData.api();
			sopOpenApiHighChartsObj.addParam('TIMETYPE', timeType);
			sopOpenApiHighChartsObj.addParam('STARTDATE', $('#startDate').val());
			sopOpenApiHighChartsObj.addParam('ENDDATE', $('#endDate').val());
			sopOpenApiHighChartsObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/AK/USESRVStat/statUSESRV.json"
			});
		}
	};
	(function () {
		$class("sop.openApi.requestSumData.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						$('#accrueSum').html(result.accrueSum + '<span>건</span>');
						$('#accrueUseSum').html('상용(' + result.accrueUseSum + ')');
						$('#accrueTestSum').html('테스트(' + result.accrueTestSum + ')');
						$('#lastMonthSum').html(result.lastMonthSum + '<span>건</span>');
						$('#lastMonthUseSum').html('상용(' + result.lastMonthUseSum + ')');
						$('#lastMonthTestSum').html('테스트(' + result.lastMonthTestSum + ')');
						$('#thisMonthSum').html(result.thisMonthSum + '<span>건</span>');
						$('#thisMonthUseSum').html('상용(' + result.thisMonthUseSum + ')');
						$('#thisMonthTestSum').html('테스트(' + result.thisMonthTestSum + ')');
						$('#staySum').html(result.staySum + '<span>건</span>');
						$('#stayUseSum').html('상용(' + result.stayUseSum + ')');
						$('#stayTestSum').html('테스트(' + result.stayTestSum + ')');
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
	(function () {
		$class("sop.openApi.requestDiagData.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						//highCharts Area OpenAPI
						if (result.X != null && result.X != '') {
							openAPIAreaChart.xAxis[0].setCategories(result.X);
						}
						if (result.Y != null && result.Y != '') {
							openAPIAreaChart.series[0].setData(result.Y);
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