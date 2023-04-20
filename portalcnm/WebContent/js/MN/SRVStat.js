/**   
 *
 * @JSName: SRVStat
 * @Description: 
 *
 * @author: liudandan   
 * @date: 2014/10/17/ 15:30:00    
 * @version V1.0      
 *    
 */
(function (W, D) {
	W.$highCharts = W.$highCharts || {};
	//id of datagrid
	var id_datagrid = '#searchResultTable';

	var mem_id=null;
	var mem_nm=null;
	
	//highCharts Area OpenAPI
	var openAPIAreaChart1 = null;
	var openAPIAreaChart2 = null;
	var openAPIAreaChart3 = null;
	var openAPIAreaChart4 = null;
	//get parameter From URL
	var TIMETYPE = getParameter('TIMETYPE');
	var STARTDATE = getParameter('STARTDATE');
	var ENDDATE = getParameter('ENDDATE');
	var openAPIPieChart1 = null;
	//search type: hour, day, week, month
	var btn_searchTab1 = '#dailyButton';
	var btn_searchTab2 = '#dailyButton';
	var btn_searchTab3 = '#dailyButton';
	var btn_searchTab4 = '#dailyButton';
	//page loading
	$(document).ready(function () {
		//page init
//		document.getElementById('selectForm').reset();

		$(".tab_content").hide();
		$(".tab_content:first").show();

		///var btn_searchIm = '02';

		$('.tab1').find('#selectType').val('DAILY');
		$('.tab2').find('#selectType').val('DAILY');
		$('.tab3').find('#SEARCH_WORD').val('');
		$('#noSearchResult').hide();
		$('.tab4').find('#selectType').val('DAILY');
		$('.tab4').find('#openTable').hide();
		$('.tab4').find('#openAPIArea').hide();

		//alert("13 = " + $('.tab2').find('#selectType').val());

		if (TIMETYPE != null && TIMETYPE != false && TIMETYPE != '') {
			if(STARTDATE != null && STARTDATE != false && STARTDATE != ''){
				if(STARTDATE.length > 10){
					$('#startDate1').val(STARTDATE.substr(0, 10) + ' ' + STARTDATE.substr(STARTDATE.length - 2, 2));
					$('#startDate2').val(STARTDATE.substr(0, 10) + ' ' + STARTDATE.substr(STARTDATE.length - 2, 2));
					$('#startDate3').val(STARTDATE.substr(0, 10) + ' ' + STARTDATE.substr(STARTDATE.length - 2, 2));
					$('#startDate4').val(STARTDATE.substr(0, 10) + ' ' + STARTDATE.substr(STARTDATE.length - 2, 2));
				} else {
					$('#startDate1').val(STARTDATE);
					$('#startDate2').val(STARTDATE);
					$('#startDate3').val(STARTDATE);
					$('#startDate4').val(STARTDATE);
				}
			}
			if(ENDDATE != null && ENDDATE != false && ENDDATE != ''){
				if(ENDDATE.length > 10){
					$('#endDate1').val(ENDDATE.substr(0, 10) + ' ' + ENDDATE.substr(STARTDATE.length - 2, 2));
					$('#endDate2').val(ENDDATE.substr(0, 10) + ' ' + ENDDATE.substr(STARTDATE.length - 2, 2));
					$('#endDate3').val(ENDDATE.substr(0, 10) + ' ' + ENDDATE.substr(STARTDATE.length - 2, 2));
					$('#endDate4').val(ENDDATE.substr(0, 10) + ' ' + ENDDATE.substr(STARTDATE.length - 2, 2));
				} else {
					$('#endDate1').val(ENDDATE);
					$('#endDate2').val(ENDDATE);
					$('#endDate3').val(ENDDATE);
					$('#endDate4').val(ENDDATE);
				}
			}
			if(TIMETYPE == 'DAILY'){
				btn_searchTab1 = '#dailyButton';
				btn_searchTab2 = '#dailyButton';
				btn_searchTab3 = '#dailyButton';
				btn_searchTab4 = '#dailyButton';
				///btn_searchIm = '02';
				$('#startDate1').datepicker(getDatepickerObjTabTab('start', TIMETYPE.toLowerCase(),1));
				$('#endDate1').datepicker(getDatepickerObjTabTab('end', TIMETYPE.toLowerCase(),1));
				$('.tab1').find('#selectType').val('DAILY');
				$('#startDate2').datepicker(getDatepickerObjTab('start', TIMETYPE.toLowerCase(),2));
				$('#endDate2').datepicker(getDatepickerObjTab('end', TIMETYPE.toLowerCase(),2));
				$('.tab2').find('#selectType2').val('DAILY');
				$('#startDate3').datepicker(getDatepickerObjTab('start', TIMETYPE.toLowerCase(),3));
				$('#endDate3').datepicker(getDatepickerObjTab('end', TIMETYPE.toLowerCase(),3));
				$('.tab3').find('#selectType').val('DAILY');
				$('#startDate4').datepicker(getDatepickerObjTab('start', TIMETYPE.toLowerCase(),4));
				$('#endDate4').datepicker(getDatepickerObjTab('end', TIMETYPE.toLowerCase(),4));
				$('.tab4').find('#selectType').val('DAILY');
			} else if(TIMETYPE == 'MONTHLY'){
				btn_searchTab1 = '#monthlyButton';
				btn_searchTab2 = '#monthlyButton';
				btn_searchTab3 = '#monthlyButton';
				btn_searchTab4 = '#monthlyButton';
				///btn_searchIm = '04';
				$('#startDate1').datepicker(getDatepickerObjTab('start', TIMETYPE.toLowerCase(),1));
				$('#endDate1').datepicker(getDatepickerObjTab('end', TIMETYPE.toLowerCase(),1));
				$('.tab1').find('#selectType').val('MONTHLY');
				$('#startDate2').datepicker(getDatepickerObjTab('start', TIMETYPE.toLowerCase(),2));
				$('#endDate2').datepicker(getDatepickerObjTab('end', TIMETYPE.toLowerCase(),2));
				$('.tab2').find('#selectType2').val('MONTHLY');
				$('#startDate3').datepicker(getDatepickerObjTab('start', TIMETYPE.toLowerCase(),3));
				$('#endDate3').datepicker(getDatepickerObjTab('end', TIMETYPE.toLowerCase(),3));
				$('.tab3').find('#selectType').val('MONTHLY');
				$('#startDate4').datepicker(getDatepickerObjTab('start', TIMETYPE.toLowerCase(),4));
				$('#endDate4').datepicker(getDatepickerObjTab('end', TIMETYPE.toLowerCase(),4));
				$('.tab4').find('#selectType').val('MONTHLY');
			}
		} else {	
			var today = new Date();
			today.setDate(today.getDate() - 10);
			var pre10Day = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
			today = new Date();
			today.setDate(today.getDate() - 1);
			var pre1Day = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
			$('#startDate1').val(pre10Day);
			$('#endDate1').val(pre1Day);
			$('#startDate1').datepicker(getDatepickerObjTab('start', 'daily',1));
			$('#endDate1').datepicker(getDatepickerObjTab('end', 'daily',1));
			$('#startDate2').val(pre10Day);
			$('#endDate2').val(pre1Day);
			$('#startDate2').datepicker(getDatepickerObjTab('start', 'daily',2));
			$('#endDate2').datepicker(getDatepickerObjTab('end', 'daily',2));
			$('#startDate3').val(pre10Day);
			$('#endDate3').val(pre1Day);
			$('#startDate3').datepicker(getDatepickerObjTab('start', 'daily',3));
			$('#endDate3').datepicker(getDatepickerObjTab('end', 'daily',3));
			$('#startDate4').val(pre10Day);
			$('#endDate4').val(pre1Day);
			$('#startDate4').datepicker(getDatepickerObjTab('start', 'daily',4));
			$('#endDate4').datepicker(getDatepickerObjTab('end', 'daily',4));
		}

		// load tab4 searchdiv CD
		$highCharts.request.loadLogBCd();
		$highCharts.request.loadLogSCd();

		//tab1  selectType change
		$('.tab1').find('#selectType').change(function() {
			$('#startDate1').datepicker('destroy');
			$('#endDate1').datepicker('destroy');
			var selectType = $('.tab1').find('#selectType').val();
			if(selectType != null && selectType == 'MONTHLY') {
				// 월간
				var today = new Date();
				today.setMonth(today.getMonth()-11, 1);
				var pre12Month = today.getFullYear() + '-' + formatDate(today.getMonth() + 1);
				today = new Date();
				var pre1Month = today.getFullYear() + '-' + formatDate(today.getMonth() + 1);

				$('#startDate1').datepicker(getDatepickerObjTab('start', 'monthly',1));
				$('#startDate1').val(pre12Month);	
				$('#endDate1').datepicker(getDatepickerObjTab('end', 'monthly',1));
				$('#endDate1').val(pre1Month);

				$('#startDate1').focus(function() {
					$(".ui-datepicker-calendar").hide();
				});
				$('#endDate1').focus(function() {
					$(".ui-datepicker-calendar").hide();
				});
				$('#startDate1').click(function () {
					$(".ui-datepicker-calendar").hide();
				});
				$('#endDate1').click(function () {
					$(".ui-datepicker-calendar").hide();
				});
				///btn_searchIm = '04';
				btn_searchTab1 = '#monthlyButton';
			} else if(selectType != null && selectType == 'DAILY') { 
				// 일간
				var today = new Date();
				today.setDate(today.getDate()-10);
				var pre10Day = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
				today = new Date();
				today.setDate(today.getDate()-1);
				var pre1Day = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
				$('#startDate1').val(pre10Day);
				$('#endDate1').val(pre1Day);
				$('#startDate1').datepicker(getDatepickerObjTab('start', 'daily',1));
				$('#endDate1').datepicker(getDatepickerObjTab('end', 'daily',1));
				$('#startDate1').focus(function() {
					$(".ui-datepicker-calendar").show();
				});
				$('#endDate1').focus(function() {
					$(".ui-datepicker-calendar").show();
				});
				$('#startDate1').click(function () {
					$(".ui-datepicker-calendar").show();
				});
				$('#endDate1').click(function () {
					$(".ui-datepicker-calendar").show();
				});
				///btn_searchIm = '02';
				btn_searchTab1 = '#dailyButton';
			} 
		});
		// tab2  selectType  change
		$('.tab2').find('#selectType').change(function() {	
			$('#startDate2').datepicker('destroy');
			$('#endDate2').datepicker('destroy');
			var selectType = $('.tab2').find('#selectType').val();	
			if(selectType != null && selectType == 'MONTHLY') {
				// 월간
				var today = new Date();
				today.setMonth(today.getMonth()-11, 1);
				var pre12Month = today.getFullYear() + '-' + formatDate(today.getMonth() + 1);
				today = new Date();
				var pre1Month = today.getFullYear() + '-' + formatDate(today.getMonth() + 1);

				$('#startDate2').datepicker(getDatepickerObjTab('start', 'monthly',2));
				$('#startDate2').val(pre12Month);	
				$('#endDate2').datepicker(getDatepickerObjTab('end', 'monthly',2));
				$('#endDate2').val(pre1Month);

				$('#startDate2').focus(function() {
					$(".ui-datepicker-calendar").hide();
				});
				$('#endDate2').focus(function() {
					$(".ui-datepicker-calendar").hide();
				});
				$('#startDate2').click(function () {
					$(".ui-datepicker-calendar").hide();
				});
				$('#endDate2').click(function () {
					$(".ui-datepicker-calendar").hide();
				});
				////btn_searchIm = '04';
				btn_searchTab2 = '#monthlyButton';
			} else if(selectType != null && selectType == 'DAILY') { 
				// 일간
				var today = new Date();
				today.setDate(today.getDate()-10);
				var pre10Day = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
				today = new Date();
				today.setDate(today.getDate()-1);
				var pre1Day = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
				$('#startDate2').val(pre10Day);
				$('#endDate2').val(pre1Day);
				$('#startDate2').datepicker(getDatepickerObjTab('start', 'daily',2));
				$('#endDate2').datepicker(getDatepickerObjTab('end', 'daily',2));
				$('#startDate2').focus(function() {
					$(".ui-datepicker-calendar").show();
				});
				$('#endDate2').focus(function() {
					$(".ui-datepicker-calendar").show();
				});
				$('#startDate2').click(function () {
					$(".ui-datepicker-calendar").show();
				});
				$('#endDate2').click(function () {
					$(".ui-datepicker-calendar").show();
				});
				///btn_searchIm = '04';
				btn_searchTab2 = '#dailyButton';
			} 
		});

		$('.tab3').find('#selectType').change(function() {	
			$('#startDate3').datepicker('destroy');
			$('#endDate3').datepicker('destroy');
			var selectType = $('.tab3').find('#selectType').val();	
			if(selectType != null && selectType == 'MONTHLY') {
				// 월간
				var today = new Date();
				today.setMonth(today.getMonth()-11, 1);
				var pre12Month = today.getFullYear() + '-' + formatDate(today.getMonth() + 1);
				today = new Date();
				var pre1Month = today.getFullYear() + '-' + formatDate(today.getMonth() + 1);

				$('#startDate3').datepicker(getDatepickerObjTab('start', 'monthly',3));
				$('#startDate3').val(pre12Month);	
				$('#endDate3').datepicker(getDatepickerObjTab('end', 'monthly',3));
				$('#endDate3').val(pre1Month);

				$('#startDate3').focus(function() {
					$(".ui-datepicker-calendar").hide();
				});
				$('#endDate3').focus(function() {
					$(".ui-datepicker-calendar").hide();
				});
				$('#startDate3').click(function () {
					$(".ui-datepicker-calendar").hide();
				});
				$('#endDate3').click(function () {
					$(".ui-datepicker-calendar").hide();
				});
				///btn_searchIm = '03';
				btn_searchTab3 = '#monthlyButton';
			} else if(selectType != null && selectType == 'DAILY') { 
				// 일간
				var today = new Date();
				today.setDate(today.getDate()-10);
				var pre10Day = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
				today = new Date();
				today.setDate(today.getDate()-1);
				var pre1Day = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
				$('#startDate3').val(pre10Day);
				$('#endDate3').val(pre1Day);
				$('#startDate3').datepicker(getDatepickerObjTab('start', 'daily',3));
				$('#endDate3').datepicker(getDatepickerObjTab('end', 'daily',3));
				$('#startDate3').focus(function() {
					$(".ui-datepicker-calendar").show();
				});
				$('#endDate3').focus(function() {
					$(".ui-datepicker-calendar").show();
				});
				$('#startDate3').click(function () {
					$(".ui-datepicker-calendar").show();
				});
				$('.tab3').find$('#endDate').click(function () {
					$(".ui-datepicker-calendar").show();
				});
				///btn_searchIm = '02';
				btn_searchTab3 = '#dailyButton';
			} 
		});

		// tab4  selectType  change
		$('.tab4').find('#selectType').change(function() {	
			$('#startDate4').datepicker('destroy');
			$('#endDate4').datepicker('destroy');
			var selectType = $('.tab4').find('#selectType').val();	
			if(selectType != null && selectType == 'MONTHLY') {
				// 월간
				var today = new Date();
				today.setMonth(today.getMonth()-11, 1);
				var pre12Month = today.getFullYear() + '-' + formatDate(today.getMonth() + 1);
				today = new Date();
				var pre1Month = today.getFullYear() + '-' + formatDate(today.getMonth() + 1);

				$('#startDate4').datepicker(getDatepickerObjTab('start', 'monthly',4));
				$('#startDate4').val(pre12Month);	
				$('#endDate4').datepicker(getDatepickerObjTab('end', 'monthly',4));
				$('#endDate4').val(pre1Month);

				$('#startDate4').focus(function() {
					$(".ui-datepicker-calendar").hide();
				});
				$('#endDate4').focus(function() {
					$(".ui-datepicker-calendar").hide();
				});
				$('#startDate4').click(function () {
					$(".ui-datepicker-calendar").hide();
				});
				$('#endDate4').click(function () {
					$(".ui-datepicker-calendar").hide();
				});
				///btn_searchIm = '04';
				btn_searchTab4 = '#monthlyButton';
			} else if(selectType != null && selectType == 'DAILY') { 
				// 일간
				var today = new Date();
				today.setDate(today.getDate()-10);
				var pre10Day = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
				today = new Date();
				today.setDate(today.getDate()-1);
				var pre1Day = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
				$('#startDate4').val(pre10Day);
				$('#endDate4').val(pre1Day);
				$('#startDate4').datepicker(getDatepickerObjTab('start', 'daily',4));
				$('#endDate4').datepicker(getDatepickerObjTab('end', 'daily',4));
				$('#startDate4').focus(function() {
					$(".ui-datepicker-calendar").show();
				});
				$('#endDate4').focus(function() {
					$(".ui-datepicker-calendar").show();
				});
				$('#startDate4').click(function () {
					$(".ui-datepicker-calendar").show();
				});
				$('#endDate4').click(function () {
					$(".ui-datepicker-calendar").show();
				});
				///btn_searchIm = '02';
				btn_searchTab4 = '#dailyButton';
			} 
		});
		// tab4  usr_logBCd  change
		$('.tab4').find('#usr_logBCd').change(function() {	
			$highCharts.request.loadLogSCd();
		});
		//검색   click search button
		$('.tab1').find('#searchButton').click(function () {
			$highCharts.request.requestDataTab1();
		});
		$('.tab2').find('#searchButton').click(function () {	
			$highCharts.request.requestDataTab2();
		});
		$('.tab3').find('#searchButton').click(function(){	
			var SEARCH_WORD = $('.tab3').find('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');	
			//$('#SEARCH_WORD').validatebox('enableValidation');
			////if($('#SEARCH_WORD').validatebox('isValid'))
			//{	
			//}
			if(SEARCH_WORD.length>=2){
				$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));	
			}
			
		});
		//click chartAddButton button
		$('.tab4').find('#chartAddButton').click(function(){
			$highCharts.request.requestDataTab4();

		});

		//click excel button
		$('#excelButton').click(function () {
			location.href="../../ServiceAPI/EXCEL/GetSRVStatDetailExcel.excel?DATA="+openAPIAreaChart4.getCSV() + "&STARTDATE=" + $('#startDate4').val() + "&ENDDATE=" + $('#endDate4').val();
		});

		//tab3 search button
		$('#searchDaliyButton').click(function(){
			$highChartsData.loadChartData(mem_id,mem_nm);
		});
		
		//press the 'enter' key
		
		$("ul.tab_st li").click(function () {	
			$("ul.tab_st li").find("a").removeClass("on");
			$(this).find("a").addClass("on");
			$(".tab_content").hide();
			var activeTab = $(this).attr("rel");
			$("#" + activeTab).fadeIn();

			if(activeTab == "tab1") {
				//btn_searchIm = '02';
				//btn_search = '#dailyButton';
				$highCharts.request.requestDataTab1();
			} else if(activeTab == "tab2") {
				//btn_searchIm = '02';
				//btn_search = '#dailyButton';
				$highCharts.request.requestDataTab2();
			} else if(activeTab == "tab3") {
				$('.tab3').find('#searchlayout').hide();
				$('.tab3').find('#openAPIArea3').hide();
				$('.tab3').find('#chartTextLeft').hide();
				$('.tab3').find('#chartTextRight').hide();
				$('.tab3').find('#noSearchResult').hide();	
				var SEARCH_WORD = $('.tab3').find('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');	
				//$('#SEARCH_WORD').validatebox('enableValidation');
				//if($('#SEARCH_WORD').validatebox('isValid'))
				//{	
				$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));
				//}
			} else if(activeTab == "tab4") {
				//btn_searchIm = '02';
				//btn_search = '#dailyButton';
				$highCharts.request.requestDataTab4();
			} else {}
		});
		//load data when loading tab1 page
		$highCharts.request.requestDataTab1();

		//highCharts Area OpenAPI
		openAPIAreaChart1 = new Highcharts.Chart({
			chart : {
				renderTo : 'openAPIArea1',
				type : 'column'
			},
			title : {
				text : null
			},
			tooltip : {
				pointFormat : '<b>{point.y}</b>'
			},
			xAxis : {
				categories : null
			},
			yAxis : {
				title : {
					text : null
				},
				min : 0
			},
			series : [ {
				data : null
			} ],
			legend : {
				enabled : false
			}
		});

		openAPIAreaChart2 = new Highcharts.Chart({
			chart : {
				renderTo : 'openAPIArea2',
				type : 'line'
			},
			title : {
				text : null
			},
			tooltip : {
				pointFormat : '<b>{point.y}</b>'
			},
			xAxis : {
				categories : null
			},
			yAxis : {
				title : {
					text : null
				},
				min : 0
			},
			series : [ {
				data : null
			} ],
			legend : {
				enabled : false
			}
		});

		openAPIAreaChart3 = new Highcharts.Chart({
			chart : {
				renderTo : 'openAPIArea3',
				type : 'column'
			},
			title : {
				text : null
			},
			tooltip : {
				pointFormat : '<b>{point.y}</b>'
			},
			xAxis : {
				categories : null
			},
			yAxis : {
				title : {
					text : null
				},
				min : 0
			},
			series : [ {
				data: null
			} ],
			legend : {
				enabled : false
			}
		});

		openAPIPieChart1 = new Highcharts.Chart({                  
			chart: {
				renderTo: 'openAPIPie1',
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'                       
			},
			title: {
				text: null     
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' 
			},plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false
					},
					showInLegend: false
				}
			},
			series: [{ 
				colorByPoint: true,
				data: null
			}]
		});

		$(id_datagrid).datagrid({	
			loadMsg: '처리중 입니다, 기다리 십시요...',
			pagination: true,
			nowrap: false,
			checkOnSelect: false,
			columns:[[ 
			          {field:'R',title:'번호',align:'center',width:80}, 
			          {field:'MEMBER_ID',title:'ID',align:'center',width:100,
			        	  formatter: function(value,row,index){
			        		  var MEMBER_ID = encodeURIComponent((row.MEMBER_ID));
			        		  var MEMBER_NM = row.MEMBER_NM;
			        		  if (value != null && value != ''){
			        			  return "<a onclick='test(\""+ MEMBER_ID+"\",\""+MEMBER_NM+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
			        		  } else {
			        			  return value;
			        		  }
			        	  }},
			          {field:'MEMBER_NM',title:'이름',align:'center',width:100,
			        	  formatter: function(value,row,index){
			        		  var MEMBER_ID = encodeURIComponent((row.MEMBER_ID));
			        		  var MEMBER_NM = row.MEMBER_NM;
			        		  if (value != null && value != ''){
			        			  return "<a onclick='test(\""+ MEMBER_ID+"\",\""+MEMBER_NM+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
			        		  } else {
			        			  return value;
			        		  }
			        	  }}
			          ]],
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
			        	  console.log(data);
			        	  var total = data.total;
			        	  var pageSize = $(page).pagination('options').pageSize;
			        	  if(total < 1){
			        		  $('.tab3').find('#noSearchResult').show();
			        		  $(page).pagination({ 
			        			  pageSize: 10,
			        			  displayMsg: '',
			        			  showPageList: false,
			        			  showRefresh: false,
			        			  layout: [],
			        			  links: 5
			        		  });
			        	  } else{
			        		  $('.tab3').find('#noSearchResult').hide();
			        		  if(Math.ceil(total / pageSize) > 5){
			        			  $(page).pagination({ 
			        				  pageSize: 10,
			        				  displayMsg: '',
			        				  showPageList: false,
			        				  showRefresh: false,
			        				  layout: ['first','prev','links','next','last'],
			        				  links: 5
			        			  });
			        		  } else if(Math.ceil(total / pageSize) <= 5){
			        			  $(page).pagination({ 
			        				  pageSize: 10,
			        				  displayMsg: '',
			        				  showPageList: false,
			        				  showRefresh: false,
			        				  layout: ['links'],
			        				  links: 5
			        			  });
			        		  }

			        		  //openAPIAreaChart3.xAxis[0].setCategories(data.X);
			        		  /*  openAPIAreaChart3.series[0].setData(data.Y);*/
			        	  }
			          },
			          onBeforeLoad: function(param){
			        	  $('.tab3').find('#noSearchResult').hide();
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
			          url:contextPath +"/ServiceAPI/MN/SRVStat/searchMember.json"
		});
		var page = $(id_datagrid).datagrid('getPager');  
		$(page).pagination({ 
			pageSize: 20,
			displayMsg: '',
			showPageList: false,
			showRefresh: false,
			layout: [],
			links: 5
		});


	});
	$highChartsData={
			loadChartData:function(MEMBER_ID,MEMBER_NM){
				var timeType = '';
				if(btn_searchTab3 == '#dailyButton'){
					timeType = 'DAILY';
				}else if(btn_searchTab3 == '#monthlyButton'){
					timeType = 'MONTHLY';
				}
				mem_id = MEMBER_ID;
				mem_nm = MEMBER_NM;
				var sopOpenApiLoadChartDataObj = new sop.openApi.loadChartData.api();
				sopOpenApiLoadChartDataObj.addParam('MEMBER_ID', MEMBER_ID);
				sopOpenApiLoadChartDataObj.addParam('TIMETYPE', timeType);
				sopOpenApiLoadChartDataObj.addParam('STARTDATE', $('#startDate3').val());
				sopOpenApiLoadChartDataObj.addParam('ENDDATE', $('#endDate3').val());

				sopOpenApiLoadChartDataObj.request({
					method : "POST",
					async : false,
					url : contextPath +"/ServiceAPI/MN/SRVStat/searchMemberValue.json"
				});
			}	
	};
	//request data
	$highCharts.request = {
			requestDataTab1 : function () {
				var timeType = '';
				if(btn_searchTab1 == '#dailyButton'){
					timeType = 'DAILY';
				}else if(btn_searchTab1 == '#monthlyButton'){
					timeType = 'MONTHLY';
				}
				var sopOpenApiHighChartsObj = new sop.openApi.highChartsTab1.api();
				sopOpenApiHighChartsObj.addParam('TIMETYPE', timeType);
				sopOpenApiHighChartsObj.addParam('STARTDATE', $('#startDate1').val());
				sopOpenApiHighChartsObj.addParam('ENDDATE', $('#endDate1').val());
				sopOpenApiHighChartsObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/MN/SRVStat/srvPageView.json"
				});
			},
			requestDataTab2 : function () {
				var timeType = '';
				if(btn_searchTab2 == '#dailyButton'){
					timeType = 'DAILY';
				}else if(btn_searchTab2 == '#monthlyButton'){
					timeType = 'MONTHLY';
				}
				var sopOpenApiHighChartsObj = new sop.openApi.highChartsTab2.api();
				sopOpenApiHighChartsObj.addParam('TIMETYPE', timeType);
				sopOpenApiHighChartsObj.addParam('STARTDATE', $('#startDate2').val());
				sopOpenApiHighChartsObj.addParam('ENDDATE', $('#endDate2').val());
				sopOpenApiHighChartsObj.addParam('MAIN_PAGE', '/html/index.html');

				sopOpenApiHighChartsObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/MN/SRVStat/statSRV.json"
				});
			},
			requestDataTab4 : function () {
				var timeType = '';
				if(btn_searchTab4 == '#dailyButton'){
					timeType = 'DAILY';
				}else if(btn_searchTab4 == '#monthlyButton'){
					timeType = 'MONTHLY';
				}
				var sopOpenApiHighChartsTab4Obj = new sop.openApi.highChartsTab4.api();
				sopOpenApiHighChartsTab4Obj.addParam('TIMETYPE', timeType);
				sopOpenApiHighChartsTab4Obj.addParam('STARTDATE', $('#startDate4').val());
				sopOpenApiHighChartsTab4Obj.addParam('ENDDATE', $('#endDate4').val());
				var	temp=$('.tab4').find('#usr_logBCd').val();//$("#usr_logBCd").find("option:selected").text();
				if(temp == null || temp == ''){
					sopOpenApiHighChartsTab4Obj.addParam('USR_LOG_B_CD', 'A0');
				} else {
					sopOpenApiHighChartsTab4Obj.addParam('USR_LOG_B_CD', $('.tab4').find('#usr_logBCd').val());
				}
				var	temp=$('.tab4').find('#usr_logSCd').val();
				if(temp == null || temp == ''){
					sopOpenApiHighChartsTab4Obj.addParam('USR_LOG_S_CD', 'A01');
				} else {
					sopOpenApiHighChartsTab4Obj.addParam('USR_LOG_S_CD', $('.tab4').find('#usr_logSCd').val());
				}
				sopOpenApiHighChartsTab4Obj.request({
					method : "POST",
					async : false,		
					url : contextPath + "/ServiceAPI/MN/SRVStat/statSRVDetail.json"
				});
			},
			loadLogBCd:function(){
				var sopOpenApiLoadLogBCdObj = new sop.openApi.loadLogBCd.api();
				sopOpenApiLoadLogBCdObj.addParam('CLASSTYPE', 'X');
				sopOpenApiLoadLogBCdObj.request({
					method : "POST",
					async : false,
					url : contextPath +"/ServiceAPI/COMMON/getAPIClass.json"
				});
			},
			loadLogSCd:function(){
				var sopOpenApiLoadLogSCdObj = new sop.openApi.loadLogSCd.api();
				sopOpenApiLoadLogSCdObj.addParam('CLASSTYPE', 'Y');
				var tmpBCd = $('.tab4').find('#usr_logBCd').val();
				if(tmpBCd == null || tmpBCd == '') tmpBCd = 'A0';
				sopOpenApiLoadLogSCdObj.addParam('SRV_ATTR', tmpBCd);
				sopOpenApiLoadLogSCdObj.request({
					method : "POST",
					async : false,
					url : contextPath +"/ServiceAPI/COMMON/getAPIClass.json"
				});
			}
			
	};
	(function() {
		$class("sop.openApi.loadChartData.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						console.log(result);
						$('.tab3').find('#chartTextLeft').show();
						$('.tab3').find('#chartTextRight').show();
						var total = result.total[0];
						var averageVist = result.averageVist[0];
						if(total==null){
							total = '0';
						}
						var timeType="";
						if(btn_searchTab3 == '#dailyButton'){
							timeType = 'DAILY';
						}else if(btn_searchTab3 == '#monthlyButton'){
							timeType = 'MONTHLY';
						}
						var strType = "";
						console.log(timeType);
						if(timeType=='MONTHLY'){
							strType = "월 평균 방문자수 ";
						}else{
							strType = "일 평균 방문자수 ";
						}
						
						$('.tab3').find('#chartTextLeft').val(mem_id+"("+mem_nm+")님 "+ $('.tab3').find('#selectType option:selected').text() + "    " + $('#startDate3').val() + " ~ " + $('#endDate3').val());
						$('.tab3').find('#chartTextRight').val(strType+""+averageVist+"회 / 누적방문 수 "+total+"회");
						
						//highCharts Area OpenAPI
						$('.tab3').find('#openAPIArea3').show();
						openAPIAreaChart3.xAxis[0].setCategories(result.X);
						openAPIAreaChart3.series[0].setData(result.Y);
						openAPIAreaChart3.series[0].name = "222";//$('#mainPageSelect').val();
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
				console.log("error"+status);
/*				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
*/			}
		});
	}());
	(function () {
		$class("sop.openApi.highChartsTab1.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						
						console.log(result);
						
						var totalPageVist = result.totalPageVist;
						if (totalPageVist >= 1000) {
							totalPageVist = totalPageVist.toLocaleString().toString();
							//ie
							if (totalPageVist.indexOf('.') > -1) {
								totalPageVist = totalPageVist.substring(0, totalPageVist.indexOf('.'));
							}
						}
						var totalAccrueMember = result.totalAccrueMember;
						if (totalAccrueMember >= 1000) {
							totalAccrueMember = totalAccrueMember.toLocaleString().toString();
							//ie
							if (totalAccrueMember.indexOf('.') > -1) {
								totalAccrueMember = totalAccrueMember.substring(0, totalAccrueMember.indexOf('.'));
							}
						}
						var totalMainVist = result.totalMainVist;
						if (totalMainVist >= 1000) {
							totalMainVist = totalMainVist.toLocaleString().toString();
							//ie
							if (totalMainVist.indexOf('.') > -1) {
								totalMainVist = totalMainVist.substring(0, totalMainVist.indexOf('.'));
							}
						}
						var totalAccrueVist = result.totalAccrueVist;
						if (totalAccrueVist >= 1000) {
							totalAccrueVist = totalAccrueVist.toLocaleString().toString();
							//ie
							if (totalAccrueVist.indexOf('.') > -1) {
								totalAccrueVist = totalAccrueVist.substring(0, totalAccrueVist.indexOf('.'));
							}
						}
						var averageVist = result.averageVist;
						if (averageVist >= 1000) {
							averageVist = averageVist.toLocaleString().toString();
							//ie
							if (averageVist.indexOf('.') > -1) {
								averageVist = averageVist.substring(0, averageVist.indexOf('.'));
							}
						}
						
						var dateType = $('#selectType').val();
						var strType = "";
						if(dateType=='MONTHLY'){
							strType = "월 평균 방문자수 ";
						}else{
							strType = "일 평균 방문자수 ";
						}
						$('.tab1').find('#chartTextLeft').val($('.tab1').find('#selectType option:selected').text() + "    " + $('#startDate1').val() + " ~ " + $('#endDate1').val());
						
						$('.tab1').find('#chartTextRight').val(strType+""+averageVist+"명 / 누적방문자수 "+totalAccrueVist+"명");

						/*
						//페이지뷰(PV) 
						$('#totalPageVist').html(totalPageVist + '<span>건</span>');
						//신규 회원     new add member
						$('#totalAccrueMember').html(totalAccrueMember + '<span>명</span>');
						//방문자수      hit count
						$('#totalMainVist').html(totalMainVist + '<span>명</span>');
						//누적방문자수     totla hit count
						$('#totalAccrueVist').html(totalAccrueVist + '<span>명</span>');
						//일평균 방문자수   average hit count
						$('#averageVist').html(averageVist + '<span>명</span>');
						 */
						//highCharts Area OpenAPI
						openAPIAreaChart1.xAxis[0].setCategories(result.X);
						openAPIAreaChart1.series[0].setData(result.Y);
						openAPIAreaChart1.series[0].name = "111";//$('#mainPageSelect').val();

						$('.tab1').find('#pageHeader').nextAll().remove();
						var lines='';
						if(result.top3PAGE.length==0){
							$('.tab1').find('#graphdiv').hide();
							$('.tab1').find('#viewTitle').hide();
							$('.tab1').find('#tableview').hide();
						}else{
							$('.tab1').find('#graphdiv').show();
							$('.tab1').find('#viewTitle').show();
							$('.tab1').find('#tableview').show();
							for ( var i = 0; i < result.top3PAGE.length; i++) {
								var line = '<tr><td>' + (i + 1) + '</td><td>' + result.top3PAGE[i][0] + '</td><td>' + result.top3PAGE[i][1] + '%</td></tr>';
								lines += line;
							}
							$('.tab1').find('#pageHeader').after(lines);
							openAPIPieChart1.series[0].setData(result.top3PAGE);
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
		$class("sop.openApi.highChartsTab2.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						var totalPageVist = result.totalPageVist;
						if (totalPageVist >= 1000) {
							totalPageVist = totalPageVist.toLocaleString().toString();
							//ie
							if (totalPageVist.indexOf('.') > -1) {
								totalPageVist = totalPageVist.substring(0, totalPageVist.indexOf('.'));
							}
						}
						var totalAccrueMember = result.totalAccrueMember;
						if (totalAccrueMember >= 1000) {
							totalAccrueMember = totalAccrueMember.toLocaleString().toString();
							//ie
							if (totalAccrueMember.indexOf('.') > -1) {
								totalAccrueMember = totalAccrueMember.substring(0, totalAccrueMember.indexOf('.'));
							}
						}
						var totalMainVist = result.totalMainVist;
						if (totalMainVist >= 1000) {
							totalMainVist = totalMainVist.toLocaleString().toString();
							//ie
							if (totalMainVist.indexOf('.') > -1) {
								totalMainVist = totalMainVist.substring(0, totalMainVist.indexOf('.'));
							}
						}
						var totalAccrueVist = result.totalAccrueVist;
						if (totalAccrueVist >= 1000) {
							totalAccrueVist = totalAccrueVist.toLocaleString().toString();
							//ie
							if (totalAccrueVist.indexOf('.') > -1) {
								totalAccrueVist = totalAccrueVist.substring(0, totalAccrueVist.indexOf('.'));
							}
						}
						var averageVist = result.averageVist;
						if (averageVist >= 1000) {
							averageVist = averageVist.toLocaleString().toString();
							//ie
							if (averageVist.indexOf('.') > -1) {
								averageVist = averageVist.substring(0, averageVist.indexOf('.'));
							}
						}

						var dateType = $('#selectType').val();
						var strType = "";
						if(dateType=='MONTHLY'){
							strType = "월 평균 방문자수 ";
						}else{
							strType = "일 평균 방문자수 ";
						}
						
						$('.tab2').find('#chartTextLeft').val($('.tab2').find('#selectType option:selected').text() + "    " + $('#startDate2').val() + " ~ " + $('#endDate2').val());
						$('.tab2').find('#chartTextRight').val(strType+""+averageVist+"명 / 누적방문자수 "+totalMainVist+"명");

						//highCharts Area OpenAPI
						openAPIAreaChart2.xAxis[0].setCategories(result.X);
						openAPIAreaChart2.series[0].setData(result.Y);
						openAPIAreaChart2.series[0].name = "222";//$('#mainPageSelect').val();
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
		$class("sop.openApi.highChartsTab4.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") { 
					var result = res.result;
					if(result != null){
						var chartHtml = "";	
						chartHtml+= "<div class='graph' id='chart'>";
						chartHtml+= "	<div class='searchBtn06' id='grapeButton' onclick='grapeClickRow(this);'><a style='cursor: pointer'><img src='./../include/img/btn/btn_chart.gif' alt='그래프'/></a></div>";
						chartHtml+= "	<div class='searchBtn06' id='tableButton' onclick='tableClickRow(this);'><a style='cursor: pointer'><img src='./../include/img/btn/btn_table.gif' alt='표'/></a></div>";
						chartHtml+= "	<div class='searchBtn07' id='delButton' onclick='delFileRow(this);'><a style='cursor: pointer'><img src='./../include/img/btn/btn_del.png' alt='삭제'/></a></div>";
						chartHtml+= "	<div class='chartText'><input type='text' id='chartText' readonly style='width:400px; border:0px; margin-left:10px;'/></div>";					
						chartHtml+= "	<div id='openAPIArea4' style='min-width:740px;height:240px;'></div>";
						chartHtml+= "	<div id='openTable' style='min-width:740px;height:240px; overflow: scroll;'>";
						chartHtml+= "			<table id='searchResultTable' class='apiTable12' summary='검색결과'' width=100% height=100%>	</table>";
						chartHtml+= "	</div>";
						chartHtml+= "<input type='hidden' id='dataSet'>"
						chartHtml+= "<div class='btnBox'><a onclick='excelCVG(this)' style='cursor: pointer'><img src='	./../include/img/btn/btn_save.png' alt='엑셀'/></a></div>"
						chartHtml+= "</div>";
						$('.tab4').find("#chartArea").prepend(chartHtml);

						$('.tab4').find('#chartText').val($('.tab4').find('#usr_logBCd option:selected').text() + "    " + $('.tab4').find('#usr_logSCd option:selected').text() + "    " + $('.tab4').find('#selectType  option:selected').text() + "    " + $('#startDate4').val() + " ~ " + $('#endDate4').val());
						$('.tab4').find('#openTable').hide();
						$('.tab4').find('#openAPIArea').show();
						options = {
								chart: {
									renderTo: 'openAPIArea4',
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
										stacking: 'normal',
										dataLabels: {
											enabled: true,
											color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
										}
									}
							};
						}
						openAPIAreaChart4 = new Highcharts.Chart(options);
						$('.tab4').find('#dataSet').val(openAPIAreaChart4.getCSV());
						$('.tab4').find('#chartText').val($('.tab4').find('#usr_logBCd option:selected').text() + "    " + $('.tab4').find('#usr_logSCd option:selected').text() + "    " + $('.tab4').find('#selectType  option:selected').text() + "    " + $('#startDate4').val() + " ~ " + $('#endDate4').val());

						// table make
						var listX = result.X;
						var listLenX = listX.length;	
						var listY = result.Y;
						var listLenY = listY.length;	
						var tmpHTML = "";

						tmpHTML += "<tr><th ></th>";
						for(var i=0; i<listLenY; i++){                	
							tmpHTML += "<th >" + listY[i].name + "</th>";
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
						$('.tab4').find("#searchResultTable").append(tmpHTML);
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

	(function() {
		$class("sop.openApi.loadLogBCd.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") { 
					var result = res.result;
					if(result != null){
						for(var i = 1; i < $('.tab4').find("#usr_logBCd").children().length; i++){
							$('.tab4').find("#usr_logBCd").children().eq(i).remove();
						}
						for(var i=0;i<result.length;i++){
							$('.tab4').find("#usr_logBCd").append("<option value='"+result[i].USR_LOG_B_CD+"'>"+result[i].CLASS_NM+"</option>");
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
	(function() {
		$class("sop.openApi.loadLogSCd.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") { 
					var result = res.result;	
					if(result != null){	
						$('.tab4').find("#usr_logSCd").children().remove();
						for(var i=0;i<result.length;i++){
							$('.tab4').find("#usr_logSCd").append("<option value='"+result[i].USR_LOG_S_CD+"'>"+result[i].S_CLASS_NM+"</option>");
						}
					} else {
						$('.tab4').find("#usr_logSCd").children().remove();
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

//create query parameters for datagrid
function getQueryParamsObj(SEARCH_WORD){	
	var queryParamsObj = new Object();
	if(SEARCH_WORD.length >= 2){
		queryParamsObj['SEARCH_WORD'] = SEARCH_WORD;
	}
	return queryParamsObj;
}

function grapeClickRow(row)
{		
	childTable = $(row).parents('.graph').find('#openTable');	
	childAPIArea = $(row).parents('.graph').find('#openAPIArea4');
	childTable.hide();
	childAPIArea.show();
}

function tableClickRow(row)
{		
	childTable = $(row).parents('.graph').find('#openTable');	
	childAPIArea = $(row).parents('.graph').find('#openAPIArea4');
	childTable.show();
	childAPIArea.hide();
}
function excelCVG(row)
{
	var datas = $(row).parents('.graph').find('#dataSet').val();
	location.href="../../ServiceAPI/EXCEL/GetSRVStatDetailExcel.excel?DATA="+datas + "&STARTDATE=" + $('#startDate4').val() + "&ENDDATE=" + $('#endDate4').val();
}
function test(MEMBER_ID,MEMBER_NM){
	$('.tab3').find('#searchlayout').show();
	$highChartsData.loadChartData(MEMBER_ID,MEMBER_NM);
}

function delFileRow(row)
{	
	$(row).parents('.graph').remove();
}