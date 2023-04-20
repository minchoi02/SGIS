/**
 * 
 * @JSName: community 관리자 페이지
 * @Description: lee
 * 
 * @date: 2015/11/25 
 * @version V1.0
 * 
 */
$(document).ready(function(){
	$("input[name=RadioGroup2]").click(function(){
		if ( $(this).val() == 'Y' ){
			$("#hotSelectBox").prop("disabled", true);
		} else {
			$("#hotSelectBox").prop("disabled", false);
		}
	});
});

(function (W, D) {
	W.$CommunityAd = W.$CommunityAd || {};
	var bnd_year = "2014";
	$(document).ready(function () {
		srvLogWrite("L0", "03", "03", "01", "", "");
		//달력나오는부분
		setDatepickerDefaultRange('startDate','endDate');

		//검색 버튼
		$('#searchButton').click(function(){
			srvLogWrite("L0", "03", "03", "01", "", "");
			var searchkeyword = new Object();
			var COMMUNITYNAME = $('#search01').val()
			var OPNERID = $('#search02').val()
			var STARTDATE = $('#startDate').val()
			var ENDDATE = $('#endDate').val()
			
			if(COMMUNITYNAME.length>0){
				searchkeyword['COMMUNITYNAME'] = $('#search01').val()
			}
			if(OPNERID.length>0){
				searchkeyword['USR_ID'] = $('#search02').val()
			}
			if(STARTDATE.length>0){
				searchkeyword['STARTDATE'] = $('#startDate').val()
			}
			if(ENDDATE.length>0){
				searchkeyword['ENDDATE'] = $('#endDate').val()
			}
			searchkeyword['HOT_ORDER'] = $('#HotChk').is(':checked')
			searchkeyword.bnd_year = bnd_year;
			$('#searchResultTable').datagrid('load', searchkeyword);		
		});		
		//검색결과
		$("#searchResultTable").datagrid({
			loadMsg : '처리중 입니다, 기다리 십시요...',
			pagination : true,
			nowrap : false,
			checkOnSelect : false,
			sortOrder : "DESC",
			columns : [[
				{field : 'CMMNTY_MAP_NM',title : '소통지도명',align : 'center',width : 80,sortable:true},
				{field : 'USR_ID',title : '개설자',align : 'center',width : 70,sortable:true},
				{field : 'JOIN_CNT',title : '참여자수',align : 'center',width : 58,sortable:true},
				{field : 'POI_CNT',title : '등록자료수',align : 'center',width : 62,sortable:true},
				{field : 'STTEMNT_CNT',title : '신고건수',align : 'center',width : 60,sortable:true},
				{field : 'ADM_NM',title : '지역',align : 'center',width : 80,sortable:true,formatter: function(value, row, index) {
					var add_region_cnt = "";
					if(row.ADD_REGION_LIST&&row.ADD_REGION_LIST.length>0){
						add_region_cnt = "<br>(외 "+row.ADD_REGION_LIST.length+")";
					}
					return value+add_region_cnt;
				}},
				{field : 'REG_DATE',title : '기간',align : 'center',width : 154,sortable:true},
				{field : 'TAG_CNT',title : '태그건수',align : 'center',width : 60,sortable:true},
				{field : 'STATS_CNT',title : '색지도건수',align : 'center',width : 63,sortable:true},
				{field : 'LOCK_YN',title : '폐쇄',align : 'center',width : 58,sortable:true},
				{field : 'HOT_ORDER',title : '핫 소통지도',align : 'center',width : 63, sortable:true}
			]],
			loadFilter : function (data) {
				if (data.rows == null) {
					if (data.errCd == -1) {
						getConfirmPopup('알림', data.errMsg, 'alert');
					}
					data.rows = new Array();
				}
				return data;
			},
			onClickRow: function(rowIndex, rowData){
				
				srvLogWrite("L0", "03", "03", "02", "", "");
				
				$('#hotSelectBox').prop("disabled", rowData.LOCK_YN == 'Y');
				$('.popupWrapper').show();
				$('#CMMNTY_MAP_ID').val(rowData.CMMNTY_MAP_ID);
				$('#OPENR_ID').text(rowData.USR_ID);
				$('#CMMNTY_MAP_NM').text(rowData.CMMNTY_MAP_NM);
				$('#PRTCPNT_CNT').text(rowData.JOIN_CNT);
				var adm_array = [rowData.ADM_NM];
				if(rowData.ADD_REGION_LIST&&rowData.ADD_REGION_LIST.length>0){
					$.each(rowData.ADD_REGION_LIST,function(){
						adm_array.push(this.ADM_NM);
					});
				}
				$('#LOCATION_NM').html(adm_array.join("<br>"));
				$('#CMMNTY_DATA_CNT').text(rowData.POI_CNT);
				$('#CMMNTY_MAP_ID').text(rowData.CMMNTY_MAP_ID);
				$('#STTEMNT_CNT').text(rowData.STTEMNT_CNT);
				$('#TAG_CNT').text(rowData.TAG_CNT);
				$('input[name=RadioGroup2][value=' + rowData.LOCK_YN + ']').prop("checked", true);
				$('#DATE #startDate01').val(rowData.PRID_ESTBS_START_DATE);
				$('#DATE #endDate02').val(rowData.PRID_ESTBS_END_DATE);
				if(typeof rowData.HOT_ORDER == "undefined") $("#hotSelectBox").val('1');
				else $("#hotSelectBox").val(rowData.HOT_ORDER);
				setDatepickerDefaultRange('startDate01','endDate02');
				
				//통계리스트 받아오기
				$.ajax({
					url : contextPath + "/ServiceAPI/DT/getCommunityMapStatList.json",
					type: "POST",
					async: false,
					dataType: "json",
					data: {
						CMMNTY_MAP_ID : rowData.CMMNTY_MAP_ID
					},
					success: function(data){
					 var statList = new Array();
					 $('#STAT_LIST').html('');
					 if(data.statList.length !=0){
						 $('#STAT_LIST').html('');
						 for(var i=0; i<data.statList.length; i++){
							 $('#STAT_LIST').append($("<span/>", 
								{"class":"DataList" ,style:"display:inline-block; height:24px; box-sizing:border-box; border:#ccc solid 1px; padding:2px 4px; margin-right:2px; background:#f4f4f4;" 
								,text:data.statList[i].HIST_NM}
							 ));
							 
						 } 
					 }
					},
					error: function(data){
						getConfirmPopup('알림', '일시적인 오류로 검색에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
						$('#ok_alertPopup').click(function () {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function () {
							confirmPopupRemove();
						});
					}
				})
				$('#CMMNTY_MAP_ID').val(rowData.CMMNTY_MAP_ID);
				$("#searchResultTable").datagrid('unselectAll');
				$("#searchResultTable").datagrid('selectRow', rowIndex);
			},
			onLoadSuccess: function(data){
				var total = data.total;
				var page = $("#searchResultTable").datagrid('getPager');
				var pageSize = $(page).pagination('options').pageSize;
				if(total < 1){
					$('#searchResultTable').show();
					$(page).pagination({ 
				        pageSize: 10,
				        displayMsg: '',
				        showPageList: false,
				        showRefresh: false,
				        layout: [],
				        links: 5
					});
				} else{
					$('#searchResultTable').hide();
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
				}
			},
			url : contextPath + "/ServiceAPI/DT/searchCommunityMapList.json",
			queryParams : {
				bnd_year : bnd_year
			},
			method:"POST"
		});

		//팝업창 기간설정 수정 및 취소 
		$("#modifyButton").click(function(){
			srvLogWrite("L0", "03", "03", "03", "", "");
			getConfirmPopup('알림', '수정하시겠습니까?', 'confirm');
			$('#ok_confirmPopup').click(function () {
				confirmPopupRemove();
				$.ajax({
					url: contextPath + "/ServiceAPI/DT/updateCommunityMap.json",
					type: "POST",
					async: false,
					dataType: "json",
					data: {
						CMMNTY_MAP_ID: $('#CMMNTY_MAP_ID').val(),
						CMMNTY_MAP_LOCK_YN: $('input[name=RadioGroup2]:checked').val(),
						HOT_ORDER : $('#hotSelectBox').val(),
						STARTDATE: $('#DATE #startDate01').val(),
						ENDDATE : $('#DATE #endDate02').val()
					},
					success: function(data){
						if(data.errCd == 0){
							$("#searchResultTable").datagrid('reload');
							$('.popupWrapper').hide();
							getConfirmPopup('알림', data.result.msg, 'alert');
							$('#hotSelectBox').val('1');
						} else {
							getConfirmPopup('알림', data.errMsg, 'alert');
						}
					},
					error: function(data){
						getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
					}
				});
			});
		});
		$("body").on("click","#ok_confirmPopup,#ok_alertPopup,#cancel_confirmPopup,#close_confirmPopup a",function(){
			confirmPopupRemove();
		});
		//액셀 다운로드
		$('#excelBtn').click(function(){
			srvLogWrite("L0", "03", "03", "04", "", "");
			var STARTDATE = $('#startDate').val();
			var ENDDATE = $('#endDate').val();
			var COMMUNITYNAME = $('#search01').val();
			var USR_ID = $('#search02').val();
			var sort = $("#searchResultTable").datagrid("options").sortName;
			var order = $("#searchResultTable").datagrid("options").sortOrder;
			var page = $("#searchResultTable").datagrid("options").pageNumber;
			var rows = $("#searchResultTable").datagrid("options").pageSize;
			var href = '../../ServiceAPI/EXCEL/GetCommunityMapListExcel.excel?page=' + page + '&rows=' + rows +'&order=' + order;
			href = href + '&bnd_year=' + bnd_year;
			if(STARTDATE != undefined&& STARTDATE !=null&&STARTDATE.length>0){
				href = href + '&STARTDATE=' + STARTDATE;
			}
			if(ENDDATE != undefined&& ENDDATE !=null&&ENDDATE.length>0){
				href = href + '&ENDDATE=' + ENDDATE;
			}
			if(COMMUNITYNAME != undefined&& COMMUNITYNAME !=null&&COMMUNITYNAME.length>0){
				href = href + '&COMMUNITYNAME=' + COMMUNITYNAME;
			}
			if(USR_ID != undefined&& USR_ID !=null&&USR_ID.length>0){
				href = href + '&USR_ID=' + USR_ID;
			}
			if(sort != undefined&& sort !=null&&sort.length>0){
				href = href + '&sort=' + sort;
			}
			
			location.href = href;
		});
	});	
}(window, document));
