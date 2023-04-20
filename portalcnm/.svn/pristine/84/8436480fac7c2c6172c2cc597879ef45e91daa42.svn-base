/**   
 *
 * @JSName: APIStat
 * @Description:  
 *
 * @author liudandan   
 * @date: 2015/10/11/ 08:30:00    
 * @version V1.0      
 *    
 */
(function(W, D) {
	W.$highCharts = W.$highCharts || {};
	//highCharts Area OpenAPI
	 var openAPIAreaChart = null;
	//highCharts Pie OpenAPI
	 var openAPIPieChart = null;
	//highCharts Pie OpenAPIService
	 var openAPIServicePieChart = null;
	//highCharts Pie OpenAPIError
	 var openAPIErrorPieChart = null;
	//get parameter From URL
	var TIMETYPE = getParameter('TIMETYPE');
	var STARTDATE = getParameter('STARTDATE');
	var ENDDATE = getParameter('ENDDATE');
	//search type: hour, day, week, month
	var btn_search = '#dailyButton';
	//page loading
	$(document).ready(function(){	
		
		srvLogWrite("L0", "01", "02", "01", "", "");
		
		$('#openTable').hide();
		$('#openAPIArea').show();
		var btn_searchIm = '02';
		$('#selectType').val('DAILY');
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
			
			
			//$(btn_search).attr('src', './../include/img/btn/btn_search_'+btn_searchIm+'_n.png');
			if(TIMETYPE == 'HOURLY'){
				btn_search = '#hourlyButton';
				btn_searchIm = '01';
				$('#startDate').datetimepicker(getDatepickerObj('start', TIMETYPE.toLowerCase()));
				$('#endDate').datetimepicker(getDatepickerObj('end', TIMETYPE.toLowerCase()));
				$('#selectType').val('HOURLY');
			} else if(TIMETYPE == 'DAILY'){
				btn_search = '#dailyButton';
				btn_searchIm = '02';
				$('#startDate').datepicker(getDatepickerObj('start', TIMETYPE.toLowerCase()));
				$('#endDate').datepicker(getDatepickerObj('end', TIMETYPE.toLowerCase()));
				$('#selectType').val('DAILY');
			} else if(TIMETYPE == 'MONTHLY'){
				btn_search = '#monthlyButton';
				btn_searchIm = '04';
				$('#startDate').datepicker(getDatepickerObj('start', TIMETYPE.toLowerCase()));
				$('#endDate').datepicker(getDatepickerObj('end', TIMETYPE.toLowerCase()));
				$('#selectType').val('MONTHLY');
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
		//hour
		/*$('#hourlyButton').click(function(){
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
		//day
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
		//month
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
			
			$('#startDate').datepicker(getDatepickerObj('start', 'monthly'));
			$('#startDate').val(pre12Month);	
			$('#endDate').datepicker(getDatepickerObj('end', 'monthly'));
			$('#endDate').val(pre1Month);
			
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
		*/
		//click the Detail button
		$('#toDetailPageButton').click(function(){
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
			location.href = './../MN/APIStatDetail.html?TIMETYPE=' + TIMETYPE + '&STARTDATE=' + STARTDATE + '&ENDDATE=' + ENDDATE;
		});
		//검색   click search button
		$('#searchButton').click(function(){
			$('#searchResultTable *').remove();
			$('#openTable').hide();
	    	$('#openAPIArea').show();
			$highCharts.requestData();
		});
		$('#grapeButton').click(function () {
	    	$('#openTable').hide();
	    	$('#openAPIArea').show();
	    });
	    $('#tableButton').click(function () {
	    	$('#openAPIArea').hide();
	    	$('#openTable').show();
	    });
		$("#selectType").change(function() {
			$('#startDate').datepicker('destroy');
			$('#endDate').datepicker('destroy');
			var selectType = $('#selectType').val();
			if(selectType != null && selectType == 'MONTHLY') {
				// 월간
				var today = new Date();
				//leekh 2016.08.01 김정은 주무관님 요청에 의해 1달전으로 start달을 수정 
				//today.setMonth(today.getMonth()-11, 1);
				today.setMonth(today.getMonth()-1, 1);
				var pre12Month = today.getFullYear() + '-' + formatDate(today.getMonth() + 1);
				today = new Date();
				//leekh 2016.08.01 김정은 주무관님 요청에 의해 1달전으로 end달을 수정 
				today.setMonth(today.getMonth()-1, 1);
				var pre1Month = today.getFullYear() + '-' + formatDate(today.getMonth() + 1);
	
				$('#startDate').datepicker(getDatepickerObj('start', 'monthly'));
				$('#startDate').val(pre12Month);	
				$('#endDate').datepicker(getDatepickerObj('end', 'monthly'));
				$('#endDate').val(pre1Month);
	
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
			} else if(selectType != null && selectType == 'DAILY') { 
				// 일간
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
			} else if(selectType != null && selectType == 'HOURLY') { 
				// 시간
				var today = new Date();
				var todayHour=today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
	
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
			}
        });
		//load data when loading page
		$highCharts.requestData();
		//highCharts Area OpenAPI
		openAPIAreaChart = new Highcharts.Chart({                  
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
	            categories: null   
	        },
	        yAxis: {
	            title: {
	                text: null                  
	            },
	            min: 0
	        },
	        series: [{                                
	            name: '호출건수',                         
	            data: null,
	            cursor: 'pointer',
                point: {
                    events: {
                    	click: function () {	
                    		if(btn_searchIm == '02') {
                    			var today = new Date();
                    			var todayHour = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
                    			var tmpStart = $('#startDate').val().substring(0,8) + this.category.substring(0,2);
                    			var tmpEnd = $('#endDate').val().substring(0,8) + this.category.substring(0,2);
                    			if(tmpStart == tmpEnd) {
                    				if(tmpStart == todayHour) {
                    					$('#startDate').val(tmpStart + ' 00');
        	                			$('#endDate').val(tmpStart + ' '+today.getHours());
                    				} else {
                    					$('#startDate').val(tmpStart + ' 00');
                    					$('#endDate').val(tmpStart + ' 23');   
                    				}
                    			} else {
                    				var tmpX = $('#startDate').val();
                    				var tmpY = $('#endDate').val();
                    				if(tmpStart >= tmpX && tmpStart <= tmpY) {
                    					$('#startDate').val(tmpStart + ' 00');
                    					$('#endDate').val(tmpStart + ' 23');   
                    				} else {
                    					$('#startDate').val(tmpEnd + ' 00');
                    					$('#endDate').val(tmpEnd + ' 23'); 
                    				}
                    			}
                    			$('#selectType').val('HOURLY');
                    			btn_searchIm = '02';
	                			$(btn_search).attr('src', './../include/img/btn/btn_search_'+btn_searchIm+'_n.png');
	                			btn_search = '#hourlyButton';
	                			$(btn_search).attr('src', './../include/img/btn/btn_search_01_s.png');
	                			$('#startDate').datepicker('destroy');
	                			$('#endDate').datepicker('destroy');
	                			
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
	                			
	                            var sopOpenApiHighChartsObj = new sop.openApi.highCharts.api();
	            				sopOpenApiHighChartsObj.addParam('TIMETYPE', 'HOURLY');
	            				sopOpenApiHighChartsObj.addParam('STARTDATE', $('#startDate').val());
	            				sopOpenApiHighChartsObj.addParam('ENDDATE', $('#endDate').val());
	            				sopOpenApiHighChartsObj.request({
	            			        method : "POST",
	            			        async : false,
	            			        url : contextPath +"/ServiceAPI/MN/APIStat/stat.json"
	            			    });
                    		}
                        }
                    }
                }
	        }],	        
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'top',
	            x: 0,
	            y: 0,
	            floating: true,
	            borderWidth: 0
	       }
		});
		//highCharts Pie OpenAPI        OpenApi 호출건수
		openAPIPieChart = new Highcharts.Chart({                  
	        chart: {
	        	renderTo: 'openAPIPie',
	            type: 'pie'                       
	        },
	        title: {
	            text: null     
	        },
	        tooltip: {
	        	pointFormat: '<b>{point.percentage:.1f}%</b>' 
	        },
	        series: [{ 
	            name: 'OpenApi 호출건수',                          
	            data: null,
	            /*dataLabels: {
	            	distance: 5, //line length
	            	connectorPadding: 6,//distance of tag to line
	            	padding: 0,// inner tag
	            },*/
	            dataLabels: {
					enabled: false
				},
		        point: {
	                events: {
	                	click: function () {	
	                		var TIMETYPE = null;
	            			if(btn_searchIm == '01'){
	            				TIMETYPE = 'HOURLY';
	            			} else if(btn_searchIm == '02'){
	            				TIMETYPE = 'DAILY';
	            			} else if(btn_searchIm == '04'){
	            				TIMETYPE = 'MONTHLY';
	            			}
	                		openDetailPie(TIMETYPE,this.name);	                	
	                    }
	                }
	            }
	        }]
		});
		//highCharts Pie OpenAPIService    서비스 호출건수
		openAPIServicePieChart = new Highcharts.Chart({                 
	        chart: {
	        	renderTo: 'openAPIServicePie',
	            type: 'pie' ,
	        },
	        title: {
	            text: null      
	        },
	        tooltip: {
	        	pointFormat: '<b>{point.percentage:.1f}%</b>' 
	        },
	        series: [{                                
	            name: '서비스 호출건수',                         
	            data: null,
	            /*dataLabels: {
	            	distance: 5,
	            	connectorPadding: 6,
	            	padding: 0,
	            }*/
	            dataLabels: {
					enabled: false
				}
	        }]
		});
		//highCharts Pie OpenAPIError    OpenApi 에러건수
		openAPIErrorPieChart = new Highcharts.Chart({                  
	        chart: {
	        	renderTo: 'openAPIErrorPie',
	            type: 'pie'                        
	        },
	        title: {
	            text: null     
	        },
	        tooltip: {
	        	pointFormat: '<b>{point.percentage:.1f}%</b>' 
	        },
	        series: [{                               
	            name: 'OpenApi 에러건수',                         
	            data: null,
	            /*dataLabels: {
	            	distance: 5,
	            	connectorPadding: 6,
	            	padding: 0,
	            }*/
	            dataLabels: {
					enabled: false
				}
	        }]
		});
		//2017.07.18[개발팀]이동형 보고서 보기 추가 - API 이용통계 종합 팝업 클릭이벤트
		$("#apiStatReportView").on('click',(function(e){
			srvLogWrite("L0", "01", "02", "02", "", "");		//종합보고서 보기
			 reportDataSet(1);
		 }));
	});
	//press the 'enter' key
	$(document).keydown(function(event){
		if(event.which == 13){
			if($('#confirmPopup').css('display') == 'none'){
				$('#searchButton').click();
				return false;
			}
		}
	});
	//request data
	$highCharts = {
			requestData : function() {
				srvLogWrite("L0", "01", "02", "01", "", "");
				var timeType = '';
				if(btn_search == '#hourlyButton'){
					timeType = 'HOURLY';
				}else if(btn_search == '#dailyButton'){
					timeType = 'DAILY';
				}else if(btn_search == '#monthlyButton'){
					timeType = 'MONTHLY';
				}
				
				//find, replace, str
				var sopOpenApiHighChartsObj = new sop.openApi.highCharts.api();
				sopOpenApiHighChartsObj.addParam('TIMETYPE', timeType);
				//alert($('#startDate').val());
				sopOpenApiHighChartsObj.addParam('STARTDATE', $('#startDate').val());
				sopOpenApiHighChartsObj.addParam('ENDDATE', $('#endDate').val());
				//sopOpenApiHighChartsObj.addParam('STARTDATE', replaceAll('-', '', $('#startDate').val()));
				//sopOpenApiHighChartsObj.addParam('ENDDATE', replaceAll('-', '', $('#endDate').val()));
				sopOpenApiHighChartsObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/MN/APIStat/stat.json"
			    });
			}
	};
	
	(function() {
	    $class("sop.openApi.highCharts.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	        	var result = res.result;
	            if(res.errCd == "0") { 
	            	if(result != null){
	            		var totalCount = result.totalCount;
	            		if(totalCount != null && totalCount != ''){
	            			if(totalCount >= 1000){
		            			totalCount = totalCount.toLocaleString().toString();
		            			//ie
		            			if(totalCount.indexOf('.') > -1){
		            				totalCount = totalCount.substring(0, totalCount.indexOf('.'));
		            			}
		            		}
	            		}
	            		var errorCount = result.errorCount;
	            		if(errorCount != null && errorCount != ''){
	            			if(errorCount >= 1000){
		            			errorCount = errorCount.toLocaleString().toString();
		            			//ie
		            			if(errorCount.indexOf('.') > -1){
		            				errorCount = errorCount.substring(0, errorCount.indexOf('.'));
		            			}
		            		}
	            		}
	            		
	            		//총호출건수  total count
	            		var TIMETYPE = result.timeType;	        							  		
	        			$('#totalCount').html("<a onclick='openDetail(\""+ TIMETYPE+"\")' style='text-align:right; padding-right:10px; font-size:16px; font-weight:bold; color:#2c85bd; padding-top:10px;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>" + totalCount + "<span>건</span></a>");
	        			$('#totalCounts').html(totalCount);
	            		//총에러건수   error count
	            		$('#errorCount').html(errorCount + '<span>건</span>');
	            		//highCharts Area OpenAPI
	            		openAPIAreaChart.xAxis[0].setCategories(result.X);
	        			openAPIAreaChart.series[0].setData(result.Y);
	        			// table make
	    	            
	    	            var listX = result.X;
	    	            var listY = result.Y;
	                    var tmpHTML = "";
	                   
	                    for(var i=0; i<listX.length; i++){
	                    	tmpHTML += "<tr height='30px;'>";
	                    	tmpHTML += "<td style='text-align:center'>" + listX[i] + "</td>";
	                    	tmpHTML += "<td style='text-align:center'>" + addComma(listY[i]) + "</td>";
	                    }
	                   	tmpHTML += "</tr>";
	                    $("#api").html(tmpHTML);
	                    
	            		//highCharts Pie OpenAPI
	            		openAPIPieChart.series[0].setData(result.top3API);
	            		$('#top3Api').nextAll().remove();
	            		var linesApi = '';
						for ( var i = 0; i < result.rowTop3Api.length; i++) {
							var HPageNM = '';
							if (result.rowTop3Api[i].HPAGE_NM != undefined) {
								HPageNM = result.rowTop3Api[i].HPAGE_NM;
							}
							var line = '<li id="api'+i+'">"' + result.rowTop3Api[i].API_NM + ' : ' + appendCommaToNumber(result.rowTop3Api[i].HOURLY_CALL_CNT) + '건'  + '</li>';
							linesApi += line;
						}
						$('#top3Api').after(linesApi);
	            		//highCharts Pie OpenAPIService
	            		openAPIServicePieChart.series[0].setData(result.top3SERVICE);
	            		$('#top3Service').nextAll().remove();
	            		var linesSERVICE = '';
						for ( var i = 0; i < result.rowTop3SERVICE.length; i++) {
							var HPageNM = '';
							if (result.rowTop3SERVICE[i].HPAGE_NM != undefined) {
								HPageNM = result.rowTop3SERVICE[i].HPAGE_NM;
							}
							var line = '<li id="service'+i+'">"' + result.rowTop3SERVICE[i].SRV_NM + ' : ' + appendCommaToNumber(result.rowTop3SERVICE[i].HOURLY_CALL_CNT) + '건'  + '</li>';
							linesSERVICE += line;
						}
						$('#top3Service').after(linesSERVICE);
	            		//highCharts Pie OpenAPIError
	            		openAPIErrorPieChart.series[0].setData(result.top3Error);
	            		$('#top3Error').nextAll().remove();
	            		var linesError = '';
						for ( var i = 0; i < result.rowTop3Error.length; i++) {
							var HPageNM = '';
							if (result.rowTop3Api[i].HPAGE_NM != undefined) {
								HPageNM = result.rowTop3Error[i].HPAGE_NM;
							}
							var line = '<li id="error'+i+'">"' + result.rowTop3Error[i].API_NM + ' : ' + appendCommaToNumber(result.rowTop3Error[i].FAIL_CNT) + '건'  + '</li>';
							linesError += line;
						}
						$('#top3Error').after(linesError);
	            		
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

//click one detail
function openDetail(TIMETYPE){		
	var STARTDATE = $('#startDate').val();
	var ENDDATE = $('#endDate').val();
	location.href = './../MN/APIStatDetail.html?DIV=TOTAL&TIMETYPE=' + TIMETYPE + '&STARTDATE=' + STARTDATE + '&ENDDATE=' + ENDDATE;
}

function openDetailPie(TIMETYPE,APINAME){		
	var STARTDATE = $('#startDate').val();
	var ENDDATE = $('#endDate').val();	
	location.href = './../MN/APIStatDetail.html?DIV=PIE&TIMETYPE=' + TIMETYPE + '&STARTDATE=' + STARTDATE + '&ENDDATE=' + ENDDATE + '&APINAME=' + APINAME;
}
//2017.07.18[개발팀]이동형 보고서 보기 추가 - API 이용통계 종합 팝업
function reportDataSet(type) {
	newWindow = window.open("/s-portalcnm/html/MN/APIStat_pop.html", "newWindow", "width=850, height=700, scrollbars=yes");
}
//2017.07.19[개발팀]이동형 보고서 보기 추가 - API 이용통계 종합 천단위 콤마
function addComma(num) {
	var len, point, str;
	
	num = num + "";
	var tmpNum = null;
	var tmpMod = null;
	if (num.indexOf(".") == -1) {
		tmpNum = num;
	}else {
		tmpNum = num.split(".")[0];
		tmpMod = "." + num.split(".")[1];
	}

	point = tmpNum.length % 3;
	len = tmpNum.length;
	
	str = tmpNum.substring(0, point);
	while (point < len) {
		if (str != "")
			str += ",";
		str += tmpNum.substring(point, point + 3);
		point += 3;
	}

	if (tmpMod != null && tmpMod.length > 0) {
		str = str + tmpMod;
	}
	return str;
}

function replaceAll(find, replace, str){
	 return str.replace(new RegExp(find, 'g'), replace);
}