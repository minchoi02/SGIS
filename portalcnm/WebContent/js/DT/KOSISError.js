/**
 * 
 * @JSName: themaMapManage
 * @Description:
 * 
 * @author: liudandan
 * @date: 2014/11/07/ 08:30:00
 * @version V1.0
 * 
 */
(function(W, D){
	W.$KOSISError = W.$KOSISError || {};
	var id_datagrid = '#searchResultTable';
	
	$(document).ready(function() {
		
		//기간
		var today = new Date();
		today.setDate(today.getDate()-10);
		var pre10Day = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
		
		today = new Date();
		today.setDate(today.getDate());
		var pre1Day = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
		
		$('#startDate').val(pre10Day);
		$('#endDate').val(pre1Day);
		
		$('#startDate').datepicker( getDatepickerObj('start', 'daily') );
		$('#endDate').datepicker( getDatepickerObj('end', 'daily') );
		
		$(document).keydown(function(event){
			if(event.which == 13){
				if($('#confirmPopup').css('display') == 'block' || $('.popupWrapper').css('display') == 'block'){
					return false;
				} else{
					$('#searchButton').click();
				}
			}
		});
		
		$('#searchButton').click(function(){
			$(id_datagrid).datagrid('load',getQueryParamsObj());
		});
		
		$('#listBtn').click(function(){
			location.href = './../DT/KOSISManage.html';
		});
		
		$(id_datagrid).datagrid({
			loadMsg: '처리중 입니다, 기다리 십시요...',
			pagination: true,
		   	nowrap: false,
		   	checkOnSelect: false,
		    columns:[[ 
		        {field:'SEQ',hidden: true},
		        {field:'RNUM',title:'순번',align:'center',width:40},
		        {field:'KOSIS_TB_ID',title:'메뉴아이디',align:'center',width:165},
				{field:'TITLE',title:'메뉴명',align:'center',width:250},
				{field:'KOSIS_INST_CD',title:'기관코드',align:'center',width:70},
				{field:'GIS_SE',title:'GIS_SE',align:'center',width:60},
				{field:'ERROR_CNT',title:'오류건수',align:'center',width:60},
				{field:'LAST_ERROR_DT',title:'오류발생일자',align:'center',width:100}
			]],
			queryParams: getQueryParamsObj(),
			onLoadError: function(){
				getConfirmPopup('알림', '일시적인 오류로 검색에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup,#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			},
			onLoadSuccess: function(data){
				var total = data.total;
				$("#totalCnt").html(" &nbsp;&nbsp;&nbsp;&nbsp;전체 : <font color='red'>" + total + "</font>건");
				var pageSize = $(page).pagination('options').pageSize;
				
				var layout = [];
				
				if(total < 1){
					$('#noSearchResult').show();
				} else{
					$('#noSearchResult').hide();
					if(Math.ceil(total / pageSize) > 5){
						layout = ['first', 'prev', 'links', 'next', 'last'];
					} else if(Math.ceil(total / pageSize) <= 5){
						layout = ['links'];
					}
				}
				
				$(page).pagination({ 
			        pageSize: 10,
			        displayMsg: '',
			        showPageList: false,
			        showRefresh: false,
			        layout: layout,
			        links: 5
				});
			},
			onBeforeLoad: function(param){
				$('#noSearchResult').hide();
			},
			loadFilter: function(data){	
				if(data.rows == null){
					if(data.errCd == -1){
						getConfirmPopup('알림', data.errMsg, 'alert');
						$('#ok_alertPopup,#close_confirmPopup').click(function(){
							confirmPopupRemove();
						});
					}
					data.rows = new Array();
				} 
				return data;
			},
			url:contextPath +"/ServiceAPI/DT/KOSISManage/searchKosisError.json"
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

		(function() {
		}());

		$KOSISError = {
		};
	})
}(window, document));

function getQueryParamsObj(){	
	var queryParamsObj = new Object();
	var searchWord = $('#searchWord').val().replace(/(^\s*)|(\s*$)/g, '');
	var searchWordType = $('#searchWordType').val();
	var startDate = $('#startDate').val();
	var endDate = $('#endDate').val();
	
	if( searchWordType ) queryParamsObj['searchWordType'] = searchWordType;
	if( searchWord ) queryParamsObj['searchWord'] =  searchWord;
	if( startDate ) queryParamsObj['startDate'] =  startDate;
	if( endDate ) queryParamsObj['endDate'] =  endDate;
	
	return queryParamsObj;
}
