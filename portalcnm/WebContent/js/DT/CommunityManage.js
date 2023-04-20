(function(W, D) {
	W.$community = W.$community || {};
	
	//달력
	$(document).ready(function() {
		srvLogWrite("L0", "03", "03", "05", "", "");
		setDatepickerDefaultRange('startDate','endDate');
		$('#startDate, #endDate').datepicker({
			onSelect:function (value, element){
				if(element.id=="startDate"){
					$("#endDate").datepicker("option", "minDate", value);
				}
			}
		});
		
	//수정
	$("#modifyButton").click(function() {
		srvLogWrite("L0", "03", "03", "07", "", "");
		getConfirmPopup('알림', "삭제하시겠습니까?", 'confirm');
		$("#ok_confirmPopup").click(function() {
			confirmPopupRemove();
			$.ajax({
				url: contextPath + "/ServiceAPI/DT/deleteCommunityMapPoi.json",
				type: 'post',
				data: {
					CMMNTY_POI_ID: $('#CMMNTY_POI_ID').val()
				},
				dataType: 'json',
				success: function(data) {
					if (data.errCd == 0) {
						$("#searchResultTable").datagrid('reload');
						$('.popupWrapper').hide();
						getConfirmPopup('알림', data.result.msg, 'alert');
					} else {
						getConfirmPopup('알림', data.errMsg, 'alert');
					}
				},
				error: function(data) {
					getConfirmPopup('알림', '일시적인 오류로 검색에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				}
			});
		});
	});
	$("body").on("click","#cancel_confirmPopup",function(){
		confirmPopupRemove();
	});
	$("body").on("click","#ok_alertPopup,#close_confirmPopup a",function(){
		confirmPopupRemove();
	});
		
	//검색
	$('#searchButton').click(function(){
		srvLogWrite("L0", "03", "03", "05", "", "");
		var searchObj = new Object();
		var TITLE = $("#COMMUNITYNAME").val();
		var STARTDATE = $("#startDate").val();
		var ENDDATE = $("#endDate").val();
		if(TITLE.length > 0){
			searchObj['TITLE'] = $("#COMMUNITYNAME").val();
		}
		if(STARTDATE.length >0 ){
			searchObj['STARTDATE'] = $("#startDate").val();
		}
		if(ENDDATE.length > 0){
			searchObj['ENDDATE'] = $("#endDate").val();
		}
		searchObj['IS_STTEMNT'] = $('#RepChk').is(':checked')
		$('#searchResultTable').datagrid('load',searchObj)
	});
		
	$("#searchResultTable").datagrid({
		loadMsg: '처리중 입니다, 기다리 십시요...',
		pagination: true,
		nowrap: false,
		checkOnSelect: false,
		columns: [
			[{ field: 'TITLE', title: '제목', align: 'center', width: 190, sortable: true }, 
			{ field: 'REG_LC',title: '주소', align: 'center', width: 93, sortable: true },
			{ field: 'REG_DATE', title: '등록일', align: 'center', width: 93, sortable: true	}, 
			{ field: 'OPINION_STATE', title: '의견기재', align: 'center', width: 93, sortable: true}, 
			{ field: 'FILE_LIST', title: '대표사진', align: 'center', width: 108,
				formatter: function(value, row, index) {
					if(value&&value.length>0){
						return "<img src='"+location.protocol+"//"+location.host+(value[0].PATH_NM+value[0].SAVE_FILE_NM) + "'style='width:100px;height:100px;'>";
					}
				}
			}, 
			{ field: 'STTEMNT_CNT', title: '신고건수', align: 'center', width: 85, sortable: true },
			{ field: 'REPLY_CNT', title: '댓글건수', align: 'center', width: 85, sortable: true } 
			]
		],
		loadFilter: function(data) {
			if (data.rows == null) {
				if (data.errCd == -1) {
					getConfirmPopup('알림', data.errMsg, 'alert');
				}
				data.rows = new Array();
			}
			return data;
		},
		onClickRow: function(rowIndex, rowData) {
			
			srvLogWrite("L0", "03", "03", "06", "", "");
			
			$("#reply-list").hide();
			$("body").scrollTop(0);
			$('.popupWrapper').show();
			$('#CMMNTY_POI_ID').val(rowData.CMMNTY_POI_ID);
			$('#TITLE').text(rowData.TITLE);
			$('#REG_LC').text(rowData.REG_LC);
			$('#REG_DATE').text(rowData.REG_DATE);
			$('#PATH_NM').empty();
			if(rowData.FILE_LIST !== undefined &&rowData.FILE_LIST.length>0){
				$.each(rowData.FILE_LIST,function(cnt,node){
					$('#PATH_NM').append($("<img/>",{"src":location.protocol+"//"+location.host+node.PATH_NM + node.SAVE_FILE_NM,"style":"width:100px;height:100px;cursor: pointer;"}).click(function(){
						window.open(location.protocol+"//"+location.host+node.PATH_NM + node.SAVE_FILE_NM,"_blank");
					}));
				});
				$('#PATH_NM').parent("tr").show();
			}else{
				$('#PATH_NM').parent("tr").hide();
			}
			$('#POI_CNT').text(rowData.REPLY_CNT);
			$('#OPINION_STATE').text(rowData.OPINION_STATE);
			$('#STTEMNT_CNT').text(rowData.STTEMNT_CNT);
			$('input[name=RadioGroup2][value=' + rowData.DEL_YN + ']').prop("checked", true);
			$('#REPLY_CONTENT').append($("<tr/>","<th/>",{"class":"right","scope":"rowgroup","text":"댓글 정보"}));
			jQuery.ajaxSettings.traditional = true;
			$.ajax({
				url: contextPath + "/ServiceAPI/DT/getCommunityMapReplyList.json",
				type: 'post',
				data : {
					CMMNTY_POI_ID : rowData.CMMNTY_POI_ID
				},
				success: function(data){
					var replyList = new Array();
					   if(data.replyList.length != 0 ) {
						   var html = "";
						   $("#REPLY_CONTENT").empty();
						   $.each(data.replyList, function(cnt, node) {
							   html += "<tr><td>" + node.REPLY_CONTENT + "</td></tr>";
						   });
						   $("#REPLY_CONTENT").append(html);
						   $("#reply-list").show();
					   } else{
						   $("#REPLY_CONTENT").empty();
					   }
				},
				error : function(data){
					getConfirmPopup('알림', '일시적인 오류로 검색에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				}
			});
			$('#POI_ID').val(rowData.CMMNTY_POI_ID);
			
			$("#searchResultTable").datagrid('unselectAll');
			$("#searchResultTable").datagrid('selectRow', rowIndex);
		},
		onLoadSuccess: function(data) {
			var total = data.total;
			var page = $("#searchResultTable").datagrid('getPager');
			var pageSize = $(page).pagination('options').pageSize;
			if (total < 1) {
				$('#searchResultTable').show();
				$(page).pagination({ pageSize: 10, displayMsg: '', showPageList: false, showRefresh: false, layout: [], links: 5 });
			} else {
				$('#searchResultTable').hide();
				if (Math.ceil(total / pageSize) > 5) {
					$(page).pagination({ 
						pageSize: 10, displayMsg: '', showPageList: false, showRefresh: false,
						layout: ['first', 'prev', 'links', 'next', 'last'], links: 5
					});
				} else if (Math.ceil(total / pageSize) <= 5) {
					$(page).pagination({
						pageSize: 10, displayMsg: '', showPageList: false, showRefresh: false, layout: ['links'], links: 5
					});
				}
			}
		},
		url: contextPath + "/ServiceAPI/DT/searchCommunityMapPoiList.json",
		method: "POST"
	});
});}(window, document));
