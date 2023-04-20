/**   
 *
 * @JSName: APIStatDetail
 * @Description: 
 *
 * @author: chenzhanchao  
 * @date: 2015/10/21/ 16:00:00     
 * @version V1.0      
 *    
 */
(function(W, D) {
	
	srvLogWrite("L0", "01", "02", "03", "", "");
	
	W.$highCharts = W.$highCharts || {};
	var openAPIAreaChart = null;
	var options = null;
	var chartCnt = "1";
	//get parameter From URL
	var TIMETYPE = getParameter('TIMETYPE');
	var STARTDATE = getParameter('STARTDATE');
	var ENDDATE = getParameter('ENDDATE');
	var APINAME = decodeURI(getParameter('APINAME'));
	var DIV = getParameter('DIV');
	//search type: hour, day, week, month
	var btn_search = '#dailyButton';
	//page loading
	$(document).ready(function(){
		//load data when loading page
		//Radio ret when page fresh
		//document.getElementById('radioFm').reset();
		$('#openTable').hide();
    	$('#openAPIArea').show();
    	
		$('#BasicApi').val('ALL');
		$('#selectType').val('DAILY');
		var btn_searchIm = '02';
		
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
		
		//
		if(DIV!='TOTAL' && APINAME != 'false'){	 
			$highCharts.request.requestLoadData();
		} else {	 
			$highCharts.request.requestData();
		}	
		$highCharts.request.loadBasicApi();
		
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
		});*/
		//change the selectType
		$("#selectType").change(function() {
			$('#startDate').datepicker('destroy');
			$('#endDate').datepicker('destroy');
			var selectType = $('#selectType').val();
			if(selectType != null && selectType == 'MONTHLY') {
				// 월간
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
		//click the Dashboard button
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
			location.href = './../MN/APIStat.html?TIMETYPE=' + TIMETYPE + '&STARTDATE=' + STARTDATE + '&ENDDATE=' + ENDDATE;
		});		
		/*$('#lineChart').change(function(){
			options.chart.type = 'line';
			options.yAxis.stackLabels = null;
			options.plotOptions = {};
			openAPIAreaChart = new Highcharts.Chart(options);
		});
		$('#histogram').change(function(){
			options.chart.type = 'column';
			options.yAxis.stackLabels = {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            };
			options.plotOptions = {
                 column: {
                     stacking: 'normal',
                     dataLabels: {
                         enabled: true,
                         color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                     }
                 }
             };
			openAPIAreaChart = new Highcharts.Chart(options);
		});*/
		//click search button
		$('#chartAddButton').click(function(){
			srvLogWrite("L0", "01", "02", "04", "", "");		//상세 검색조건 추가
			$highCharts.request.requestData();
			
		});
		//click del button
	    //$('#delButton').click(function () {	alert("2");
	    	//$('#chart *').remove();
	   // 	$(this).parents('.chart').remove();
	   // });
	    
	    
	    //$(document).on('click', 'delButton', function(){ 
	    //    alert('삭제되었습니다.'); 
	    //}); 
	    
	    
//	    $('#grapeButton').click(function () {
//	    	$('#openTable').hide();
//	    	$('#openAPIArea').show();
//	    });
//	    $('#tableButton').click(function () {
//	    	$('#openAPIArea').hide();
//	    	$('#openTable').show();
//	    });
		//click excel button
	    $('#excelButton').click(function () {
	    	//alert(openAPIAreaChart.getCSV());
    		location.href="../../ServiceAPI/EXCEL/GetApiDetailExcel.excel?DATA="+openAPIAreaChart.getCSV() + "&STARTDATE=" + $('#startDate').val() + "&ENDDATE=" + $('#endDate').val();
	    });
	    /*
		$("#BasicApi").change(function() {
			$highCharts.request.requestData();
        });
		*/
		//press the 'enter' key
		$(document).keydown(function(event){
			if(event.which == 13){
				if($('#confirmPopup').css('display') == 'none'){
					$('#chartAddButton').click();
					return false;
				}
			}
		});
		//2017.07.19[개발팀]이동형 보고서 보기 추가 - API이용통계 상세 클릭 이벤트
		 $("#apiDetailStatReportView").on('click',(function(e){
			 srvLogWrite("L0", "01", "02", "09", "", "");		//보고서보기
			 reportDataSet(1);
		 }));
	});
	
	//request data
	$highCharts.request = {
			requestLoadData : function() {	
				var timeType = '';
				if(btn_search == '#hourlyButton'){
					timeType = 'HOURLY';
				}else if(btn_search == '#dailyButton'){
					timeType = 'DAILY';
				}else if(btn_search == '#monthlyButton'){
					timeType = 'MONTHLY';
				}
				var sopOpenApiHighChartsObj = new sop.openApi.highCharts.api();
				sopOpenApiHighChartsObj.addParam('APINAME', APINAME);
				sopOpenApiHighChartsObj.addParam('TIMETYPE', timeType);
				sopOpenApiHighChartsObj.addParam('STARTDATE',  $('#startDate').val());
				sopOpenApiHighChartsObj.addParam('ENDDATE',$('#endDate').val());
				var	temp=$("#BasicApi").find("option:selected").text();
				if(temp!="Open API 전체"){
					sopOpenApiHighChartsObj.addParam('API_B_CLASS_CD', $('#BasicApi').val());
				}
				sopOpenApiHighChartsObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/MN/APIStatDetail/getSeriesLoadData.json"
			    });
			},
			requestData : function() {	
				var timeType = '';
				if(btn_search == '#hourlyButton'){
					timeType = 'HOURLY';
				}else if(btn_search == '#dailyButton'){
					timeType = 'DAILY';
				}else if(btn_search == '#monthlyButton'){
					timeType = 'MONTHLY';
				}
				var sopOpenApiHighChartsObj = new sop.openApi.highCharts.api();
				sopOpenApiHighChartsObj.addParam('TIMETYPE', timeType);
				sopOpenApiHighChartsObj.addParam('STARTDATE',  $('#startDate').val());
				sopOpenApiHighChartsObj.addParam('ENDDATE',$('#endDate').val());
				var	temp=$("#selectDiv").find("option:selected").text();
				if(temp!="전체"){
					sopOpenApiHighChartsObj.addParam('SRV_ID_YN', $('#selectDiv').val());
				}
				var	temp=$("#BasicApi").find("option:selected").text();
				if(temp!="Open API 전체"){
					sopOpenApiHighChartsObj.addParam('API_B_CLASS_CD', $('#BasicApi').val());
				}
				sopOpenApiHighChartsObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/MN/APIStatDetail/getSeriesData.json"
			    });
			},
			loadBasicApi:function(){
				var sopOpenApiLoadBasicApiObj = new sop.openApi.loadBasicApi.api();
				sopOpenApiLoadBasicApiObj.addParam('CLASSTYPE', 'B');
				sopOpenApiLoadBasicApiObj.addParam('SRV_ATTR', 'DATA');
				sopOpenApiLoadBasicApiObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/COMMON/getAPIClass.json"
			    });
			}
	};
	(function() {
	    $class("sop.openApi.highCharts.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	            if(res.errCd == "0") { 
	            	var result = res.result;
	            	if(result != null){
	            		
	            		var chartHtml = "";	
	        			chartHtml+= "<div class='graph' id='chart'>";
	        			chartHtml+= "	<div class='searchBtn06' id='grapeButton' onclick='grapeClickRow(this);'><a style='cursor: pointer'><img src='./../include/img/btn/btn_chart.gif' alt='그래프'/></a></div>";
	        			chartHtml+= "	<div class='searchBtn06' id='tableButton' onclick='tableClickRow(this);'><a style='cursor: pointer'><img src='./../include/img/btn/btn_table.gif' alt='표'/></a></div>";
	        			chartHtml+= "	<div class='searchBtn07' id='delButton' onclick='delFileRow(this);'><a style='cursor: pointer'><img src='./../include/img/btn/btn_del.png' alt='삭제'/></a></div>";
	        			chartHtml+= "	<div class='chartText'><input type='hidden' id='chartText' readonly style='width:400px; border:0px; margin-left:10px;'/>"+$('#selectDiv option:selected').text() + "    " + $('#BasicApi option:selected').text() + "    " + $('#selectType  option:selected').text() + "    " + $('#startDate').val() + " ~ " + $('#endDate').val()+"</div>";					
	        			chartHtml+= "	<div id='openAPIArea' style='min-width:740px;height:240px;'></div>";
	        			chartHtml+= "	<div class='openTable' id='openTable' style='min-width:740px;height:240px; overflow: scroll;'>";
	        			chartHtml+= "			<table id='searchResultTable' class='apiTable12' summary='검색결과'' width=100% height=100%>	</table>";
	        			chartHtml+= "	</div>";
	        			chartHtml+= "<input type='hidden' id='dataSet'>"
	        			chartHtml+= "<div class='btnBox'><a onclick='excelCVG(this)' style='cursor: pointer'><img src='	./../include/img/btn/btn_save.png' alt='엑셀'/></a></div>"
	        			chartHtml+= "</div>";
	        			chartHtml+= "<div class='chartTable' id='chartTable'></div>";
	        			
	        			$("#chartArea").prepend(chartHtml);
	        	
	        			$('#chartText').val();
	        			$('#openTable').hide();
	        	    	$('#openAPIArea').show();
	        	    	
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
	            		if($('#histogram').is(':checked')){
	            			options.chart.type = 'column';
	            			options.yAxis.stackLabels = {
	                            enabled: true,
	                            style: {
	                                fontWeight: 'bold',
	                                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
	                            }
	                        };
	            			options.plotOptions = {
	                             column: {
	                                 stacking: 'normal'
//	                                 dataLabels: {
//	                                     enabled: true,
//	                                     color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
	                                 //}
	                             }
	                         };
	            		}
	            		openAPIAreaChart = new Highcharts.Chart(options);
	            		$('#dataSet').val(openAPIAreaChart.getCSV());
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
	            
	            $('#chartText').val($('#selectDiv option:selected').text() + "    " + $('#BasicApi option:selected').text() + "    " + $('#selectType  option:selected').text() + "    " + $('#startDate').val() + " ~ " + $('#endDate').val());
	            
	            // table make
	            var listX = result.X;
                var listLenX = listX.length;
	            var listY = result.Y;
                var listLenY = listY.length;	
                var tmpHTML = "";
                tmpHTML += "<tr><th style='width:123px;'></th>";
                for(var i=0; i<listLenY; i++){                	
                	tmpHTML += "<th style='width:123px;'>" + listY[i].name + "</th>";
                }
                tmpHTML += "</tr>";
                for(var i=0; i<listLenX; i++){
                	tmpHTML += "<tr>";
                	tmpHTML += "<td>" + listX[i] + "</td>";
                	
                	for(var j=0; j<listLenY; j++){
                		var listLenY_datalist =  listY[j].data; 
                		tmpHTML += "<td>" + listLenY_datalist[i] + "</td>";
                	}
                	
                	tmpHTML += "</tr>";
                }
                $("#searchResultTable").append(tmpHTML);
                var date = $('#startDate').val().substr(0, 7);
                
                if($('#BasicApi option:selected').text() == "Open API 전체"){
                	 var tmpHTMLS = "";
                	 tmpHTMLS += "<br>";
                	 tmpHTMLS += "<div style='width:745px;height:100%;margin-left:-1px;'>";
                	 tmpHTMLS += "<div class='acticle'>";
                	 tmpHTMLS += "<table id='apiDetail' class='pntTables' summary='poi 정보' style='display: none;'>";
                     tmpHTMLS += "<tr><th style='width:123px;'>일자</th>";
                     for(var i=0; i<5; i++){ 
                     	tmpHTMLS += "<th style='width:123px;'>" + listY[i].name + "</th>";
                     }
                     tmpHTMLS += "</tr>";
                     for(var i=0; i<listLenX; i++){
                     	tmpHTMLS += "<tr>";
                     	tmpHTMLS += "<td>" + date +"-"+listX[i].replace(/일/g, '') + "</td>";
                     	for(var j=0; j<5; j++){
                     		var listLenY_datalist =  listY[j].data; 
                     		tmpHTMLS += "<td>" + listLenY_datalist[i] + "</td>";
                     	}
                     	tmpHTMLS += "</tr>";
                     }
                     tmpHTMLS += "<tr><th >일자</th>";
                     for(var i=5; i<10; i++){ 
                     	tmpHTMLS += "<th style='width:123px;'>" + listY[i].name + "</th>";
                     }
                     tmpHTMLS += "</tr>";
                     for(var i=0; i<listLenX; i++){
                     	tmpHTMLS += "<tr>";
                     	tmpHTMLS += "<td>"  + date +"-"+listX[i].replace(/일/g, '') +  "</td>";
                     	for(var j=5; j<10; j++){
                     		var listLenY_datalist =  listY[j].data; 
                     		tmpHTMLS += "<td>" + listLenY_datalist[i] + "</td>";
                     	}
                     	tmpHTMLS += "</tr>";
                     }
                     
                     tmpHTMLS += "<tr><th >일자</th>";
                     for(var i=10; i<15; i++){ 
                     	tmpHTMLS += "<th style='width:123px;'>" + listY[i].name + "</th>";
                     }
                     tmpHTMLS += "</tr>";
                     for(var i=0; i<listLenX; i++){
                     	tmpHTMLS += "<tr>";
                     	tmpHTMLS += "<td>"  + date +"-"+listX[i].replace(/일/g, '') +  "</td>";
                     	for(var j=10; j<15; j++){
                     		var listLenY_datalist =  listY[j].data; 
                     		tmpHTMLS += "<td>" + listLenY_datalist[i] + "</td>";
                     	}
                     	tmpHTMLS += "</tr>";
                     }
                     
                     tmpHTMLS += "<tr><th >일자</th>";
                     for(var i=15; i<20; i++){ 
                     	tmpHTMLS += "<th style='width:123px;'>" + listY[i].name + "</th>";
                     }
                     tmpHTMLS += "</tr>";
                     for(var i=0; i<listLenX; i++){
                     	tmpHTMLS += "<tr>";
                     	tmpHTMLS += "<td>"  + date +"-"+listX[i].replace(/일/g, '') +  "</td>";
                     	for(var j=15; j<20; j++){
                     		var listLenY_datalist =  listY[j].data; 
                     		tmpHTMLS += "<td>" + listLenY_datalist[i] + "</td>";
                     	}
                     	tmpHTMLS += "</tr>";
                     }
                     
                     tmpHTMLS += "<tr><th >일자</th>";
                     for(var i=20; i<25; i++){ 
                     	tmpHTMLS += "<th style='width:123px;'>" + listY[i].name + "</th>";
                     }
                     tmpHTMLS += "</tr>";
                     for(var i=0; i<listLenX; i++){
                     	tmpHTMLS += "<tr>";
                     	tmpHTMLS += "<td>"  + date +"-"+listX[i].replace(/일/g, '') +  "</td>";
                     	for(var j=20; j<25; j++){
                     		var listLenY_datalist =  listY[j].data; 
                     		tmpHTMLS += "<td>" + listLenY_datalist[i] + "</td>";
                     	}
                     	tmpHTMLS += "</tr>";
                     }
                     
                     tmpHTMLS += "<tr><th >일자</th>";
                     for(var i=25; i<30; i++){ 
                     	tmpHTMLS += "<th style='width:123px;'>" + listY[i].name + "</th>";
                     }
                     tmpHTMLS += "</tr>";
                     for(var i=0; i<listLenX; i++){
                     	tmpHTMLS += "<tr>";
                     	tmpHTMLS += "<td>"  + date +"-"+listX[i].replace(/일/g, '') +  "</td>";
                     	for(var j=25; j<30; j++){
                     		var listLenY_datalist =  listY[j].data; 
                     		tmpHTMLS += "<td>" + listLenY_datalist[i] + "</td>";
                     	}
                     	tmpHTMLS += "</tr>";
                     }
                     
                     tmpHTMLS += "<tr><th >일자</th>";
                     for(var i=30; i<35; i++){ 
                     	tmpHTMLS += "<th style='width:123px;'>" + listY[i].name + "</th>";
                     }
                     tmpHTMLS += "</tr>";
                     for(var i=0; i<listLenX; i++){
                     	tmpHTMLS += "<tr>";
                     	tmpHTMLS += "<td>"  + date +"-"+listX[i].replace(/일/g, '') +  "</td>";
                     	for(var j=30; j<35; j++){
                     		var listLenY_datalist =  listY[j].data; 
                     		tmpHTMLS += "<td>" + listLenY_datalist[i] + "</td>";
                     	}
                     	tmpHTMLS += "</tr>";
                     }
                     
                     tmpHTMLS += "<tr><th >일자</th>";
                     for(var i=35; i<40; i++){ 
                     	tmpHTMLS += "<th style='width:123px;'>" + listY[i].name + "</th>";
                     }
                     tmpHTMLS += "</tr>";
                     for(var i=0; i<listLenX; i++){
                     	tmpHTMLS += "<tr>";
                     	tmpHTMLS += "<td>"  + date +"-"+listX[i].replace(/일/g, '') +  "</td>";
                     	for(var j=35; j<40; j++){
                     		var listLenY_datalist =  listY[j].data; 
                     		tmpHTMLS += "<td>" + listLenY_datalist[i] + "</td>";
                     	}
                     	tmpHTMLS += "</tr>";
                     }
                     
                     tmpHTMLS += "<tr><th >일자</th>";
                     for(var i=40; i<45; i++){ 
                     	tmpHTMLS += "<th style='width:123px;'>" + listY[i].name + "</th>";
                     }
                     tmpHTMLS += "</tr>";
                     for(var i=0; i<listLenX; i++){
                     	tmpHTMLS += "<tr>";
                     	tmpHTMLS += "<td>"  + date +"-"+listX[i].replace(/일/g, '') +  "</td>";
                     	for(var j=40; j<45; j++){
                     		var listLenY_datalist =  listY[j].data; 
                     		tmpHTMLS += "<td>" + listLenY_datalist[i] + "</td>";
                     	}
                     	tmpHTMLS += "</tr>";
                     }
                     tmpHTMLS += "<tr><th >일자</th>";
                     for(var i=45; i<50; i++){ 
                     	tmpHTMLS += "<th style='width:123px;'>" + listY[i].name + "</th>";
                     }
                     tmpHTMLS += "</tr>";
                     for(var i=0; i<listLenX; i++){
                     	tmpHTMLS += "<tr>";
                     	tmpHTMLS += "<td>"  + date +"-"+listX[i].replace(/일/g, '') +  "</td>";
                     	for(var j=45; j<50; j++){
                     		var listLenY_datalist =  listY[j].data; 
                     		tmpHTMLS += "<td>" + listLenY_datalist[i] + "</td>";
                     	}
                     	tmpHTMLS += "</tr>";
                     }
                     tmpHTMLS += "<tr><th >일자</th>";
                     for(var i=50; i<listLenY; i++){ 
                     	tmpHTMLS += "<th style='width:123px;'>" + listY[i].name + "</th>";
                     }
                     tmpHTMLS += "</tr>";
                     for(var i=0; i<listLenX; i++){
                     	tmpHTMLS += "<tr>";
                     	tmpHTMLS += "<td>"  + date +"-"+listX[i].replace(/일/g, '') +  "</td>";
                     	for(var j=50; j<listLenY; j++){
                     		var listLenY_datalist =  listY[j].data; 
                     		tmpHTMLS += "<td>" + listLenY_datalist[i] + "</td>";
                     	}
                     	tmpHTMLS += "</tr>";
                     }
                     tmpHTMLS += "</table>";
                     tmpHTMLS += "</div>";
                     tmpHTMLS += "</div>";
                     $("#chartTable").append(tmpHTMLS);
                }else{
                	var tmpHTMLS = "";
                	tmpHTMLS += "<div style='width:745px;height:100%;margin-left:-1px;'>";
                	tmpHTMLS += "<div class='acticle'>";
                	tmpHTMLS += "<br>";
                	tmpHTMLS += "<table id='apiDetail' class='pntTables' summary='poi 정보 출력'>";
                    tmpHTMLS += "<tr><th >일자</th>";
                    for(var i=0; i<listLenY; i++){                	
                    	tmpHTMLS += "<th style='width:123px;'>" + listY[i].name + "</th>";
                    }
                    tmpHTMLS += "</tr>";
                    for(var i=0; i<listLenX; i++){
                    	tmpHTMLS += "<tr>";
                    	tmpHTMLS += "<td>" + listX[i] + "</td>";
                    	
                    	for(var j=0; j<listLenY; j++){
                    		var listLenY_datalist =  listY[j].data; 
                    		tmpHTMLS += "<td>" + listLenY_datalist[i] + "</td>";
                    	}
                    	
                    	tmpHTMLS += "</tr>";
                    }
                    tmpHTMLS += "</table>";
                    tmpHTMLS += "</br>";
                    tmpHTMLS += "</div>";
                    tmpHTMLS += "</div>";
                   
                    $("#chartTable").append(tmpHTMLS);
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
	(function() {
	    $class("sop.openApi.loadBasicApi.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	            if(res.errCd == "0") { 
	            	var result = res.result;
	            	if(result != null){
	            		for(var i = 1; i < $("#BasicApi").children().length; i++){
	            			 $("#BasicApi").children().eq(i).remove();
	            		}
	            		for(var i=0;i<result.length;i++){
	            			$("#BasicApi").append("<option value='"+result[i].API_B_CLASS_CD+"'>"+result[i].API_B_CLASS_NM+"</option>");
	            		}
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


function grapeClickRow(row)
{		
	srvLogWrite("L0", "01", "02", "05", "", "");		//차트보기
	childTable = $(row).parents('.graph').find('#openTable');	
	childAPIArea = $(row).parents('.graph').find('#openAPIArea');
	childTable.hide();
	childAPIArea.show();
}
function tableClickRow(row)
{		
	srvLogWrite("L0", "01", "02", "06", "", "");		//표보기
	childTable = $(row).parents('.graph').find('#openTable');	
	childAPIArea = $(row).parents('.graph').find('#openAPIArea');
	childTable.show();
	childAPIArea.hide();
}
function excelCVG(row)
{
	srvLogWrite("L0", "01", "02", "08", "", "");		//엑셀다운로드
	var datas = $(row).parents('.graph').find('#dataSet').val();
	location.href="../../ServiceAPI/EXCEL/GetApiDetailExcel.excel?DATA="+datas + "&STARTDATE=" + $('#startDate').val() + "&ENDDATE=" + $('#endDate').val();
}
function delFileRow(row)
{	
	srvLogWrite("L0", "01", "02", "07", "", "");		//상세검색내용 삭제
	$(row).parents('.graph').remove();
	$(row).parents('.btnBox').remove();
	$(row).parents('.excelButton').remove();
}
//2017.07.19[개발팀]이동형 보고서 보기 추가 - API이용통계 상세 팝업요청
function reportDataSet(type) {
	newWindow = window.open("/s-portalcnm/html/MN/APIStatDetail_pop.html", "newWindow", "width=850, height=700, scrollbars=yes");
}