/**   
 *
 * @JSName: RELStat
 * @Description: 
 *
 * @author: chenzhanchao  
 * @date: 2014/10/21/ 16:00:00     
 * @version V1.0      
 *    
 */
(function(W, D) {
	$(document).ready(function() {
		
		srvLogWrite("L0", "01", "04", "01", "", "");
		
		//init page when loading
		document.getElementById('toolbarForm').reset();
		$('#noSearchResult_StatAreaListTab').hide();
		$('#noSearchResult_StatKeywordListTab').hide();
		$('#tooltip').hide();
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
		$(document).find('head').append('<style type="text/css">.validatebox {border-color: #ffa8a8; background-color: #fff3f3; color: #000;}.tooltip {border: 1px solid #CC9933;background:#FFFFCC; height:22px; width:auto;}</style>');
		$('#searchWord').keyup(function(event){
			if(/[^\u1100-\u11ff\uac00-\ud7af\u3130–\u318F\u3200–\u32FF\uA960–\uA97F\uD7B0–\uD7FF\uFF00–\uFFEFA-Za-z0-9\s]/g.test($('#searchWord').val())){
				$('#searchWord').addClass('validatebox');
				$('#tooltip').show();
        	}
        	else {
        		$('#searchWord').removeClass('validatebox');
        		$('#tooltip').hide();
        	}
		});
		//click the search button
		$('#searchButton').click(function(){
			srvLogWrite("L0", "01", "04", "01", "", "");
			if($('#searchWord').attr('class').indexOf('validatebox') == -1){
				if($('#searchType').val() == 'SEARCH_AREA'){
					$('#StatAreaListTab').datagrid('load',getQueryParamsObj('SEARCH_AREA'));
				} else if($('#searchType').val() == 'SEARCH_WORD'){
					$('#StatKeywordListTab').datagrid('load',getQueryParamsObj('SEARCH_WORD'));
				} else{
					$('#StatAreaListTab').datagrid('load',getQueryParamsObj('SEARCH_AREA'));
					$('#StatKeywordListTab').datagrid('load',getQueryParamsObj('SEARCH_WORD'));
				}
			}
		});
		//search result of area
		$('#StatAreaListTab').datagrid({
			loadMsg: '처리중 입니다, 기다리 십시요...',
			pagination: true,
		   	nowrap: false,
		   	singleSelect: true,
		    columns:[[ 
				{field:'R',title:'순위',align:'center',width:30},    
		        {field:'SEARCH_AREA',title:'검색지역',align:'center',width:110},    
		        {field:'PERCENT',title:'비율',align:'center',width:150,
			        formatter: function(value, row, index){	
			        	if(value != null && value != ''){
			        		var wholePercent = value;
	        				var percent = value.substring(0, value.length-1);
	        				var width = 140 - parseFloat(percent) * 1.40;
	        			    value ="<div style='float:left;background:url("+"/s-portalcnm/img/pic_progress.png"+") no-repeat;width:140px;height:17px'>"
								+ "<div style='float:right;background:#cccccc no-repeat;border:1px solid #999999;height:15px;width:" + width + "px'></div>"
								+ "</div>"
			        	}
						return value;
					}
		        },
		        {field:'CNT',title:'건수',align:'center',width:80},    
		    ]],
		   	queryParams: {
		   		TIMETYPE: 'DAILY',
		   		STARTDATE:$('#startDate').val(),
		   		ENDDATE: $('#endDate').val()
			},
			onLoadError: function(){
				getConfirmPopup('알림', '검색할 수 없습니다.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			},
			onLoadSuccess: function(data){
				var total = data.total;
				var pageSize = $(pageAreaList).pagination('options').pageSize;
				if(total < 1){
					$('#noSearchResult_StatAreaListTab').show();
					$(pageAreaList).pagination({ 
				        pageSize: 10,
				        displayMsg: '',
				        showPageList: false,
				        showRefresh: false,
				        layout: [],
				        links: 5
					});
				} else{
					$('#noSearchResult_StatAreaListTab').hide();
					if(Math.ceil(total / pageSize) > 5){
						$(pageAreaList).pagination({ 
					        pageSize: 10,
					        displayMsg: '',
					        showPageList: false,
					        showRefresh: false,
					        layout: ['first', 'prev', 'links', 'next', 'last'],
					        links: 5
						 });
					} else if(Math.ceil(total / pageSize) <= 5){
						$(pageAreaList).pagination({ 
					        pageSize: 10,
					        displayMsg: '',
					        showPageList: false,
					        showRefresh: false,
					        layout: ['links'],
					        links: 5
						 });
					}
				}
			},
			onBeforeLoad: function(param){
				$('#noSearchResult_StatAreaListTab').hide();
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
			url:contextPath +"/ServiceAPI/MN/RELStat/areaStat.json"
		});
		var pageAreaList = $('#StatAreaListTab').datagrid('getPager'); 
		$(pageAreaList).pagination({ 
	        pageSize: 10,
	        displayMsg: '',
	        showPageList: false,
	        showRefresh: false,
	        layout: [],
	        links: 5
		});
		//search result of keyword
		$('#StatKeywordListTab').datagrid({
			loadMsg: '처리중 입니다, 기다리 십시요...',
			pagination: true,
		   	nowrap: false,
		   	singleSelect: true,
		    columns:[[ 
				{field:'R',title:'순위',align:'center',width:30},    
		        {field:'SEARCH_WORD',title:'검색어',align:'center',width:110},    
		        {field:'PERCENT',title:'비율',align:'center',width:150,
		        	 formatter: function(value, row, index){		
			        		var wholePercent=value;
	        				var percent = value.substring(0, value.length-1);
	        				var width = 140 - parseFloat(percent) * 1.40;
	        			    value ="<div style='float:left;background:url("+"/s-portalcnm/img/pic_progress.png"+") no-repeat;width:140px;height:17px'>"
								+ "<div style='float:right;background:#cccccc no-repeat;border:1px solid #999999;height:15px;width:" + width + "px'></div>"
								+ "</div>"
						 return value;
					}
		        },    
		        {field:'CNT',title:'건수',align:'center',width:80}, 
		    ]],
		   	queryParams: {
		   		TIMETYPE: 'DAILY',
		   		STARTDATE:$('#startDate').val(),
		   		ENDDATE: $('#endDate').val()
			},
			onLoadError: function(){
				getConfirmPopup('알림', '검색할 수 없습니다.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			},
			onLoadSuccess: function(data){
				var total = data.total;
				var pageSize = $(pageKeywordList).pagination('options').pageSize;
				if(total < 1){
					$('#noSearchResult_StatKeywordListTab').show();
					$(pageKeywordList).pagination({ 
				        pageSize: 10,
				        displayMsg: '',
				        showPageList: false,
				        showRefresh: false,
				        layout: [],
				        links: 5
					});
				} else{
					$('#noSearchResult_StatKeywordListTab').hide();
					if(Math.ceil(total / pageSize) > 5){
						$(pageKeywordList).pagination({ 
					        pageSize: 10,
					        displayMsg: '',
					        showPageList: false,
					        showRefresh: false,
					        layout: ['first', 'prev', 'links', 'next', 'last'],
					        links: 5
						 });
					} else if(Math.ceil(total / pageSize) <= 5){
						$(pageKeywordList).pagination({ 
					        pageSize: 10,
					        displayMsg: '',
					        showPageList: false,
					        showRefresh: false,
					        layout: ['links'],
					        links: 5
						 });
					}
				}
			},
			onBeforeLoad: function(param){
				$('#noSearchResult_StatKeywordListTab').hide();
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
			url:contextPath +"/ServiceAPI/MN/RELStat/wordStat.json"
		});
		var pageKeywordList = $('#StatKeywordListTab').datagrid('getPager');  
		$(pageKeywordList).pagination({ 
		       pageSize: 10,
		       displayMsg: '',
		       showPageList: false,
		       showRefresh: false,
		       layout: [],
		       links: 5
		});
		$('#excelExportBtn').click(function () {
			
			srvLogWrite("L0", "01", "04", "02", "", "");
			
			var TIMETYPE = 'DAILY';
			var STARTDATE = $('#startDate').val();
			var ENDDATE = $('#endDate').val();
			var href = '../../ServiceAPI/EXCEL/GetRELStatExcel.excel?STARTDATE=' + STARTDATE + '&ENDDATE=' + ENDDATE + '&TIMETYPE=' + TIMETYPE;
			var SEARCH_WORD = '';
			var SEARCH_AREA = '';
			var keyword = $('#searchWord').val().replace(/(^\s*)|(\s*$)/g, '');
			var searchType = $('#searchType').val();
			if(keyword != ''){
				if(getBytesCount(keyword) < 50){
					if(searchType == 'ALL'){
						SEARCH_AREA = keyword;
						SEARCH_WORD = keyword;
						href = href + '&SEARCH_AREA=' + keyword + '&SEARCH_WORD=' + keyword;
					} else if(searchType == 'SEARCH_AREA'){
						SEARCH_AREA = keyword;
						href = href + '&SEARCH_AREA=' + keyword;
					} else if(searchType == 'SEARCH_WORD'){
						SEARCH_WORD = keyword;
						href = href + '&SEARCH_WORD=' + keyword;
					}
				}else{
					getConfirmPopup('알림', '지정된  입력범위를 초과하였습니다.', 'alert');
					$('#ok_alertPopup').click(function(){
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
				}
			}
			location.href = href;
	    });
	});
	//press the 'enter' key
	$(document).keydown(function(event){
		if(event.which == 13){
			if($('#confirmPopup').css('display') == 'block'){
				return false;
			} else{
				$('#searchButton').click();
				return false;
			}
		}
	});
	
}(window, document));
//create query parameters for datagrid
function getQueryParamsObj(searchType){
	var queryParamsObj = new Object();
	queryParamsObj['TIMETYPE'] = 'DAILY';
	queryParamsObj['STARTDATE'] = $('#startDate').val();
	queryParamsObj['ENDDATE'] = $('#endDate').val();
	var searchWord = $('#searchWord').val().replace(/(^\s*)|(\s*$)/g, '');
	if(searchWord.length > 2){
		if(searchType == 'SEARCH_AREA'){
			queryParamsObj['SEARCH_AREA'] = searchWord;
		} else if(searchType == 'SEARCH_WORD'){
			queryParamsObj['SEARCH_WORD'] = searchWord;
		}
	}
	return queryParamsObj;
}