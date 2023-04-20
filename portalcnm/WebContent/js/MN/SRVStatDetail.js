/**
 * 
 * @JSName: SRVStatDetail
 * @Description:
 * 
 * @author: liudandan
 * @date: 2014/10/20/ 14:30:00
 * @version V1.0
 * 
 */
(function(W, D) {
	W.$SRVStatDetail = W.$SRVStatDetail || {};
	// get parameter From URL
	var openAPIAreaChart = null;
	var options = null;
	var TIMETYPE = getParameter('TIMETYPE');
	var STARTDATE = getParameter('STARTDATE');
	var ENDDATE = getParameter('ENDDATE');
	// search type: hour, day, week, month
	var btn_search = '#dailyButton';
	// page loading
	$(document).ready(function(){
		var btn_searchIm = '02';
		$('#openAPIArea').show();
		if(TIMETYPE != null && TIMETYPE != false && TIMETYPE != ''){
			if(STARTDATE != null && STARTDATE != false && STARTDATE != ''){
				if(STARTDATE.length > 10){
					$('#startDate').val(STARTDATE.substr(0, 10) + ' ' + STARTDATE.substr(STARTDATE.length - 2, 2));
				} else {
					$('#startDate').val(STARTDATE);
				}
			}
			if(ENDDATE != null && ENDDATE != false && ENDDATE != ''){
				if(ENDDATE.length > 10){
					$('#endDate').val(ENDDATE.substr(0, 10) + ' ' + ENDDATE.substr(STARTDATE.length - 2, 2));
				} else {
					$('#endDate').val(ENDDATE);
				}
			}
			$(btn_search).attr('src', './../include/img/btn/btn_search_'+btn_searchIm+'_n.png');
			if(TIMETYPE == 'HOURLY'){
				btn_search = '#hourlyButton';
				btn_searchIm = '01';
				$('#startDate').datetimepicker(getDatepickerObj('start', TIMETYPE.toLowerCase()));
				$('#endDate').datetimepicker(getDatepickerObj('end', TIMETYPE.toLowerCase()));
			} else if(TIMETYPE == 'DAILY'){
				btn_search = '#dailyButton';
				btn_searchIm = '02';
				$('#startDate').datepicker(getDatepickerObj('start', TIMETYPE.toLowerCase()));
				$('#endDate').datepicker(getDatepickerObj('end', TIMETYPE.toLowerCase()));
			} else if(TIMETYPE == 'MONTHLY'){
				btn_search = '#monthlyButton';
				btn_searchIm = '04';
				$('#startDate').datepicker(getDatepickerObj('start', TIMETYPE.toLowerCase()));
				$('#endDate').datepicker(getDatepickerObj('end', TIMETYPE.toLowerCase()));
			}
			$(btn_search).attr('src', './../include/img/btn/btn_search_' + btn_searchIm + '_s.png');
		} else {
			var today = new Date();
			today.setDate(today.getDate()-10);
			var pre10Day = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
			today = new Date();
			today.setDate(today.getDate()-1);
			var pre1Day = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
			$('#startDate').val(pre10Day);
			$('#endDate').val(pre1Day);
			$('#startDate').datepicker(getDatepickerObj('start', 'daily'));
			$('#endDate').datepicker(getDatepickerObj('end', 'daily'));
		}
		// load data when loading page
		$SRVStatDetail.requestData();
		// hour
		$('#hourlyButton').click(function(){
			$(btn_search).attr('src', './../include/img/btn/btn_search_'+btn_searchIm+'_n.png');
			$(this).attr('src', './../include/img/btn/btn_search_01_s.png');
			$('#startDate').datepicker('destroy');
			$('#endDate').datepicker('destroy');
			var today = new Date();
			var todayHour=today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
			//today.setDate(today.getDate()-1);
			//var pre1Day = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
			$('#startDate').val(todayHour + ' 00');
			$('#endDate').val(todayHour + ' '+today.getHours());
			$('#startDate').datetimepicker(getDatepickerObj('start', 'hourly'));
			$('#endDate').datetimepicker(getDatepickerObj('end', 'hourly'));
			$('#startDate').focus(function() {
				$(".ui-datepicker-calendar").show();
			});
			$('#endDate').focus(function() {
				$(".ui-datepicker-calendar").show();
			});
			$('#startDate, #endDate').click(function () {
				$(".ui-datepicker-calendar").show();
			});
			btn_searchIm = '01';
			btn_search = '#hourlyButton';
		});
		// day
		$('#dailyButton').click(function(){
			$(btn_search).attr('src', './../include/img/btn/btn_search_'+btn_searchIm+'_n.png');
			$(this).attr('src', './../include/img/btn/btn_search_02_s.png');
			$('#startDate').datepicker('destroy');
			$('#endDate').datepicker('destroy');
			var today = new Date();
			today.setDate(today.getDate()-10);
			var pre10Day = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
			today = new Date();
			today.setDate(today.getDate()-1);
			var pre1Day = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
			$('#startDate').val(pre10Day);
			$('#endDate').val(pre1Day);
			$('#startDate').datepicker(getDatepickerObj('start', 'daily'));
			$('#endDate').datepicker(getDatepickerObj('end', 'daily'));
			$('#startDate').focus(function() {
				$(".ui-datepicker-calendar").show();
			});
			$('#endDate').focus(function() {
				$(".ui-datepicker-calendar").show();
			});
			$('#startDate, #endDate').click(function () {
				$(".ui-datepicker-calendar").show();
			});
			btn_searchIm = '02';
			btn_search = '#dailyButton';
		});
		// month
		$('#monthlyButton').click(function(){
			$(btn_search).attr('src', './../include/img/btn/btn_search_'+btn_searchIm+'_n.png');
			$(this).attr('src', './../include/img/btn/btn_search_04_s.png');
			$('#startDate').datepicker('destroy');
			$('#endDate').datepicker('destroy');
			var today = new Date();
			today.setMonth(today.getMonth()-11, 1);
			var pre12Month = today.getFullYear() + '-' + formatDate(today.getMonth() + 1);
			today = new Date();
			var pre1Month = today.getFullYear() + '-' + formatDate(today.getMonth() + 1);
			$('#startDate').val(pre12Month);
			$('#endDate').val(pre1Month);
			$('#startDate,.ui-datepicker-trigger').click(function(){
				var month = $('#ui-datepicker-div .ui-datepicker-month').val($("#startDate").val().substring(5,7) -1);
				var year = $('#ui-datepicker-div .ui-datepicker-year').val($("#startDate").val().substring(0,4));
			});
			$('#endDate').datepicker(getDatepickerObj('end', 'monthly'));
			$('#endDate,.ui-datepicker-trigger').click(function(){
				var month = $('#ui-datepicker-div .ui-datepicker-month').val($("#endDate").val().substring(5,7) -1);
				var year = $('#ui-datepicker-div .ui-datepicker-year').val($("#endDate").val().substring(0,4));
			});
			$('#startDate').focus(function() {
				$(".ui-datepicker-calendar").hide();
			});
			$('#endDate').focus(function() {
				$(".ui-datepicker-calendar").hide();
			});
			$('#startDate, #endDate').click(function () {
				$(".ui-datepicker-calendar").hide();
			});
			btn_searchIm = '04';
			btn_search = '#monthlyButton';
		});
		
		// click the Dashboard button
		$('#toStatPageButton').click(function(){
			var TIMETYPE = null;
			if(btn_searchIm == '01'){
				TIMETYPE = 'HOURLY';
			} else if(btn_searchIm == '02'){
				TIMETYPE = 'DAILY';
			} else if(btn_searchIm == '04'){
				TIMETYPE = 'MONTHLY';
			}
			var STARTDATE = $('#startDate').val();
			var ENDDATE = $('#endDate').val();
			location.href = './../MN/SRVStat.html?TIMETYPE=' + TIMETYPE + '&STARTDATE=' + STARTDATE + '&ENDDATE=' + ENDDATE;
		});
		// 검색 click save Excel button
		$('#searchButton').click(function(){
			$SRVStatDetail.requestData();
		});
		
		// Excel 저장 click search button
		$('#saveExcelButton').click(function(){
			var TIMETYPE = null;
			if(btn_searchIm == '01'){
				TIMETYPE = 'HOURLY';
			} else if(btn_searchIm == '02'){
				TIMETYPE = 'DAILY';
			} else if(btn_searchIm == '04'){
				TIMETYPE = 'MONTHLY';
			}
			var STARTDATE = $('#startDate').val();
			var ENDDATE=$('#endDate').val();
			var href='../../ServiceAPI/EXCEL/GetSRVStatDetailExcel.excel?STARTDATE='+STARTDATE+'&ENDDATE='+ENDDATE+'&TIMETYPE='+TIMETYPE;
			location.href=href;
		});
	});
	// press the 'enter' key
	$(document).keydown(function(event){
		if(event.which == 13){
			if($('#confirmPopup').css('display') == 'none'){
				$('#searchButton').click();
				return false;
			}
		}
	});
	// request data
	$SRVStatDetail = {
			requestData : function() {
				var timeType = '';
				if(btn_search == '#hourlyButton'){
					timeType = 'HOURLY';
				}else if(btn_search == '#dailyButton'){
					timeType = 'DAILY';
				}else if(btn_search == '#monthlyButton'){
					timeType = 'MONTHLY';
				}
				var sopOpenApiSRVStatDetailObj = new sop.openApi.SRVStatDetail.api();
				sopOpenApiSRVStatDetailObj.addParam('TIMETYPE', timeType);
				sopOpenApiSRVStatDetailObj.addParam('STARTDATE', $('#startDate').val());
				sopOpenApiSRVStatDetailObj.addParam('ENDDATE', $('#endDate').val());
				sopOpenApiSRVStatDetailObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/MN/SRVStat/statSRVDetail.json"
			    });
			}
	};
	
	(function() {
	    $class("sop.openApi.SRVStatDetail.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	        	var result = res.result;
	            if(res.errCd == "0") { 
	            	if(result != null){
	            		$('#openTable').hide();
	            		options = {
	    	           	        chart: {
	    	           	        	renderTo: 'openAPIArea',
	    	           	            type: 'line'                       
	    	           	        },
	    	           	        title: {
	    	           	            text: null      
	    	           	        },
	    		           	    tooltip: {
	    		     	        	pointFormat: '<b>{point.y}</b>' 
	    		     	        },
	    	           	        xAxis: {
	    	           	            categories: result.X   
	    	           	        },
	    	           	        yAxis: {
	    	           	            title: {
	    	           	                text: null                 
	    	           	            },
	    	           	            min: 0,
	    	           	            stackLabels: null
	    	           	        },
	    	           	        series:result.Y,
	    	           	        legend: {
	    		           	        layout: 'vertical',
	    		                    align: 'right',
	    		                    verticalAlign: 'middle',
	    		                    borderWidth: 0
	    	           	        },
	    		           	    plotOptions: {}
	            		};
	            		openAPIAreaChart = new Highcharts.Chart(options);
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
	            
	         // table make
//	            var listX = result.X;
//                var listLenX = listX.length;	
//	            var listY = result.Y;
//                var listLenY = listY.length;	
//                var tmpHTML = "";
//               
//                tmpHTML += "<tr><th></th>";
//                for(var i=0; i<listLenY; i++){                	
//                	tmpHTML += "<th>" + listY[i].name + "</th>";
//                }
//                tmpHTML += "</tr>";
//                for(var i=0; i<listLenX; i++){
//                	tmpHTML += "<tr>";
//                	tmpHTML += "<td>" + listX[i] + "</td>";
//                	
//                	for(var j=0; j<listLenY; j++){
//                		var listLenY_datalist =  listY[j].data; 
//                		tmpHTML += "<td align='center'>" + listLenY_datalist[i] + "</td>";
//                	}
//                	
//                	tmpHTML += "</tr>";
//                }	
//                $("#searchResultTable").append(tmpHTML);
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