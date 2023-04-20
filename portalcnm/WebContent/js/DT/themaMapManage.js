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
var listTotalCnt = 0; //2017.07.19 [개발팀] khc 표출순위 추가 
var pluploader = null;
function popupOpen(){
	var popUrl = "IconSelect.html";	//팝업창에 출력될 페이지 URL
	var winWidth = 300;
	var winHeight = 850;
	var winPosLeft = (screen.width - winWidth) / 2;
	var winPosTop = (screen.height - winHeight) / 2;
	var winOpt = "width="+winWidth+",height="+winHeight+",top="+winPosTop+",left="+winPosLeft+", scrollbars=no, location :no";
	var popOption = "width=250, height=600, resizable=no, scrollbars=no, status=no;";    //팝업창 옵션(optoin)
	window.open(popUrl,"",winOpt);
}
(function (W, D) {
	W.$themaMapManage = W.$themaMapManage || {};
	// id of datagrid
	var id_datagrid = '#searchResultTable';
	$(document).ready(function () {
		srvLogWrite("L0", "03", "02", "01", "", "");
		// page init
		document.getElementById('resetForm').reset();
		$('#noSearchResult').hide();
		// click the search button
		$('#searchButton').click(function () {
			srvLogWrite("L0", "03", "02", "01", "", "");
			$(id_datagrid).datagrid('load', getQueryParamsObj());
		});

		// click the next button of add thema map
		if ($.fn.validatebox) {
			$.fn.validatebox.defaults.missingMessage = '이 입력 항목은 필수 입력 항목 입니다.';
		}
		$("#TITLE_AddFile").validatebox({
			required : true,
			validType : [ 'byteSizeVal[100]' ]
		});
		$("#TITLE_AddFile").validatebox('disableValidation');
		$("#TITLE_FileInfo").keyup(function () {
			$("#TITLE_FileInfo").validatebox('enableValidation');
		});

		$("#EXP_AddFile").validatebox({
			required : true,
			validType : [ 'byteSizeVal[200]' ]
		});
		$("#EXP_AddFile").validatebox('disableValidation');
		$("#EXP_FileInfo").keyup(function () {
			$("#EXP_FileInfo").validatebox('enableValidation');
		});
		$('#TITLE').validatebox({
			required : false,
			validType : [ 'cnmInput' ]
		});
		// $("#fileName").validatebox({
		// required: true
		// });
		// $("#fileName").validatebox('disableValidation');
		// click the add button in add file page
		$('#addButton_AddFile').click(function () {
			/*
			 * $("#TITLE_AddFile").validatebox({ required: true, validType:{
			 * length:[2,100] }, invalidMessage: "제목은 2자 이상 100자 이하까지 입력가능합니다.",
			 * missingMessage: "" });
			 */
			$("#TITLE_AddFile").validatebox('enableValidation');
			$("#EXP_AddFile").validatebox('enableValidation');
			// $("#fileName").validatebox('enableValidation');
			var TITLE = $('#TITLE_AddFile').val().replace(/(^\s*)|(\s*$)/g, '');
			var EXP = $('#EXP_AddFile').val().replace(/(^\s*)|(\s*$)/g, '');
			var fileName = $('#fileName').text().replace(/(^\s*)|(\s*$)/g, '');
			if (TITLE.length == 0) {
				$("#TITLE_AddFile").val('');
				$("#TITLE_AddFile").focus();
			}
			else if (EXP.length == 0) {
				$("#EXP_AddFile").val('');
				$("#EXP_AddFile").focus();
			}
			else if (fileName.length == 0 || fileName.indexOf('.') != fileName.length - 4) {
				getConfirmPopup('알림', '파일을 선택하세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
			}
			else {
				if ($("#TITLE_AddFile").validatebox('isValid') && $("#EXP_AddFile").validatebox('isValid')) {
					$("#TITLE_AddFile").validatebox('disableValidation');
					$("#EXP_AddFile").validatebox('disableValidation');
					getConfirmPopup('확인', '등록하시겠습니까?', 'confirm');
					$('#ok_confirmPopup').click(function () {
						$('.maskbg').fadeIn(200);
						$('.maskcontent').fadeIn(400);
						pluploader.start();
						confirmPopupRemove();
					});
					$('#cancel_confirmPopup').click(function () {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function () {
						confirmPopupRemove();
					});
				}
			}
		});
		// click the cancel button in add file page
		$('#cancelButton_AddFile').click(function () {
			$("#addThemaMapFilePopup").css("display", "none");
		});
		// click the add thema map button
		$('#newThemaMapButton').click(function(){
			openAddPopup();
		});
		// click the delete thema map button
		$('#delThemaMapButton').click(function () {
			srvLogWrite("L0", "03", "02", "04", "", "");
			var row = $(id_datagrid).datagrid('getChecked');
			if (row == null || row.length == 0) {
				getConfirmPopup('알림', '삭제 대상을 선택하십시오.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
			}
			else if (row.length >= 1) {
				var DATA_CHECK = 'N';
				var DATA_CHECK_CNT = 0;
				for(var i=0; i<row.length; i++){
					var a = row[i].SRV_YN;
					var b = row[i].CNT;
					if(a=='Y'){
						DATA_CHECK ='Y'; 
					}

					if(b>DATA_CHECK_CNT){
						DATA_CHECK_CNT=1;
					}

				}
				if(DATA_CHECK=='Y'){
					getConfirmPopup('알림', '서비스 여부가 활성 일 경우 삭제 할 수 없습니다.', 'alert');
					$('#ok_alertPopup').click(function () {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function () {
						confirmPopupRemove();
					});
				}else{
					if(DATA_CHECK_CNT>0){
						getConfirmPopup('알림', '삭제 할 수 없습니다.', 'alert');
						$('#ok_alertPopup').click(function () {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function () {
							confirmPopupRemove();
						});
					}else{
						getConfirmPopup('확인', '선택된 항목이 삭제됩니다. 삭제하시겠습니까?', 'confirm');
						$('#ok_confirmPopup').click(function () {
							var STAT_THEMA_MAP_ID_List = new Array();
							for ( var i = 0; i < row.length; i++) {
								STAT_THEMA_MAP_ID_List[i] = row[i].THEMA_MAP_CATEGORY;
							}
							$themaMapManage.delThemaMap(STAT_THEMA_MAP_ID_List);
							confirmPopupRemove();
						});
						$('#cancel_confirmPopup').click(function () {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function () {
							confirmPopupRemove();
						});
					}

				}

			}
		});
		$("#TITLE_MapInfo").validatebox({
			required : true,
			validType : [ 'byteSizeVal[100]' ]
		});
		$("#TITLE_MapInfo").validatebox('disableValidation');
		$("#EXP_MapInfo").validatebox({
			required : true,
			validType : [ 'byteSizeVal[200]' ]
		});
		$("#EXP_MapInfo").validatebox('disableValidation');
		$('#searchIconButton').click(function(){
			popupOpen();
		});
		$('#addButton').click(function(){
			var CATEGORY_NM = $('#CATEGORY_NM').val();
			if(CATEGORY_NM.length<1){
				getConfirmPopup('알림', '카테고리 명을 입력해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
				$('#CATEGORY_NM').focus();
				return;
			}
			var CATEGORY_EM = $('#CATEGORY_EM').val();
			if(CATEGORY_EM.length<1){
				getConfirmPopup('알림', '카테고리 영문명을 입력해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
				$('#CATEGORY_EM').focus();
				return;
			}
			var SRV_YN =$('#SRV_YN1').val();
			var EXP = $('#EXP_AR').val();
			if(EXP.length<1){
				getConfirmPopup('알림', '설명을 입력해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
				$('#EXP_AR').focus();
				return;
			}
			var ICON_ID = $('#CATEGORY_ICON').val();
			if(ICON_ID.length<1){
				getConfirmPopup('알림', '아이콘을 선택해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
				$('#CATEGORY_ICON').focus();
				return;
			}
			
			// 2017.07.19 [개발팀] khc 표출순위 추가  start		
			var DISP_RANK = $('#DISP_RANK').val();
			if(DISP_RANK == "" || DISP_RANK == 0) {
				getConfirmPopup('알림', '표출순위를 입력하세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
				$('#DISP_RANK').focus();	
			}
			
			$themaMapManage.addThemaMap(CATEGORY_NM, SRV_YN, CATEGORY_EM, ICON_ID, EXP, DISP_RANK);
			// 2017.07.19 [개발팀] khc 표출순위 추가  end
		});
		// click the modify button of thema map info
		$('#modifyButton').click(function () {
			srvLogWrite("L0", "03", "02", "03", "", "");
			var STAT_THEMA_MAP_ID = $("#CATEGORY_ID").val();
			var CATEGORY_EM = $('#CATEGORY_EM').val();
			var SRV_YN =$('#SRV_YN1').val();
			var ICON_ID = $('#CATEGORY_ICON').val();
			var EXP = $('#EXP_AR').val();
			var CATEGORY_NM = $('#CATEGORY_NM').val();
			
			// 2017.07.19 [개발팀] khc 표출순위 추가  start
			var DISP_RANK = $('#DISP_RANK').val();
			$themaMapManage.updateThemaMap(STAT_THEMA_MAP_ID, CATEGORY_NM, CATEGORY_EM, SRV_YN, ICON_ID, EXP, DISP_RANK);
			// 2017.07.19 [개발팀] khc 표출순위 추가  end
			
			/*$("#TITLE_MapInfo").validatebox('enableValidation');
			$("#EXP_MapInfo").validatebox('enableValidation');
			if ($("#TITLE_MapInfo").validatebox('isValid') && $("#EXP_MapInfo").validatebox('isValid')) {
				var TITLE = $("#TITLE_MapInfo").val().replace(/(^\s*)|(\s*$)/g, '');
				var EXP = $("#EXP_MapInfo").val().replace(/(^\s*)|(\s*$)/g, '');
				if (TITLE.length == 0) {
					$("#TITLE_MapInfo").val('');
					$("#TITLE_MapInfo").focus();
				}
				else if (EXP.length == 0) {
					$("#EXP_MapInfo").val('');
					$("#EXP_MapInfo").focus();
				}
				else {
					getConfirmPopup('확인', '수정하시겠습니까?', 'confirm');
					$('#ok_confirmPopup').click(function () {
						var THEMA_MAP_TYPE = $("#THEMA_MAP_TYPE_MapInfo").val();
						var STAT_THEMA_MAP_ID = $("#STAT_THEMA_MAP_ID_MapInfo").val();
						var CATEGORY = $("#CATEGORY_MapInfo").val();
						var ARTICLE_DIV = $("#ARTICLE_DIV_MapInfo").val();
						var AREA_SET = $("#AREA_SET").val();
						var STAT_DISP_LEVEL = $("#STAT_DISP_LEVEL").val();
						var SRV_YN = $("#SRV_YN_MapInfo").val();
						TITLE = $("#TITLE_MapInfo").val().replace(/(^\s*)|(\s*$)/g, '');
						EXP = $("#EXP_MapInfo").val().replace(/(^\s*)|(\s*$)/g, '');
						var METHOD = $("#METHOD_form").val().replace(/(^\s*)|(\s*$)/g, '');
						var RELATEINFO = $("#RELATEINFO_form").val().replace(/(^\s*)|(\s*$)/g, '');
						$themaMapManage.updateThemaMap(THEMA_MAP_TYPE, STAT_THEMA_MAP_ID, CATEGORY, ARTICLE_DIV, SRV_YN, TITLE, EXP, null, AREA_SET, STAT_DISP_LEVEL, METHOD, RELATEINFO);
						confirmPopupRemove();
					});
					$('#cancel_confirmPopup').click(function () {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function () {
						confirmPopupRemove();
					});
				}
			}*/
		});
		// click the cancel button of map information page
		$('#cancelButton_MapInfo').click(function () {
			$("#themaMapInfoMapPopup").css("display", "none");
		});
		// click the modify button of thema file info
		// click the cancel button of file information page
		$('#cancelButton_FileInfo').click(function () {
			$("#themaMapInfoFilePopup").css("display", "none");
		});
		
		// 2017.07.19 [개발팀] khc 표출순위 추가  start		
		// search result
		$(id_datagrid).datagrid({
			loadMsg : '처리중 입니다, 기다리 십시요...',
			pagination : true,
			nowrap : false,
			checkOnSelect : false,
			sortName : 'REG_TS',
			sortOrder : 'desc',
			columns : [ [ {
				field : 'checkbox',checkbox : true},
				{field : 'THEMA_MAP_CATEGORY',hidden: true},
				{field : 'EXP',hidden: true},
				{field : 'EN',hidden: true},
				{field : 'DISP_RANK',title : '표출순위',align : 'center',width : 80},
				{field : 'URL',title : '아이콘',image:true, align : 'center',width : 110,
					formatter: function(value,row,index){						
						if (value != null && value != ''){
							var CATEGORY_ICON_ID = encodeURIComponent((row.CATEGORY_ICON_ID)).trim();
							return "<img style='margin-left:5px;' height='60' width='50' src='./../.."+value+"' />";
						} else {
							return value;
						}
					}
				},
				{field : 'CATEGORY_NM',title : '카테고리명',align : 'center',width : 315,
					formatter : function (value, row, index) {
						var THEMA_MAP_CATEGORY = encodeURIComponent((row.THEMA_MAP_CATEGORY));
						var CATEGORY_NM = encodeURIComponent((row.CATEGORY_NM));
						var SRV_YN = encodeURIComponent((row.SRV_YN));
						var EN = encodeURIComponent((row.EN));
						var CATEGORY_ICON_ID = encodeURIComponent((row.CATEGORY_ICON_ID));
						var EXP = encodeURIComponent((row.EXP));
						var DISP_RANK = encodeURIComponent((row.DISP_RANK));
						if (value != null && value != ''){
							return "<a onclick='openModifyPopup(\""+ THEMA_MAP_CATEGORY+"\",\""+CATEGORY_NM+"\",\""+SRV_YN+"\",\""+EN+"\",\""+CATEGORY_ICON_ID+"\",\""+row.EXP+"\",\""+DISP_RANK+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
						} else {
							return value;
						}
					}	
				},
				{field : 'CNT',title : '주제도 갯수',align : 'center',width : 110},
				{field : 'SRV_YN',title : '서비스여부',align : 'center',width : 100,
					formatter : function (value, row, index) {
						if (value != null && value == 'Y')
							value = "활성";
						else
							value = "비활성";
						return value;
					}
				}
				] ],
				onLoadError : function () {
					getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
					$('#ok_alertPopup').click(function () {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function () {
						confirmPopupRemove();
					});
				},
				onClickRow : function (rowIndex, rowData) {
					$(id_datagrid).datagrid('unselectAll');
					$(id_datagrid).datagrid('selectRow', rowIndex);
				},
				onCheck : function (rowIndex, rowData) {
					$(id_datagrid).datagrid('unselectAll');
					var checkedRows = $(id_datagrid).datagrid('getChecked');
					for ( var i = 0; i < checkedRows.length; i++) {
						var rowIndex = $(id_datagrid).datagrid('getRowIndex', checkedRows[i]);
						$(id_datagrid).datagrid('selectRow', rowIndex);
					}
				},
				onLoadSuccess : function (data) {
					var total = data.total;
					listTotalCnt = total+1;
					var pageSize = $(page).pagination('options').pageSize;
					if (total < 1) {
						$('#noSearchResult').show();
						$(page).pagination({
							pageSize : 10,
							displayMsg : '',
							showPageList : false,
							showRefresh : false,
							layout : [],
							links : 5
						});
					}
					else {
						$('#noSearchResult').hide();
						if (Math.ceil(total / pageSize) > 5) {
							$(page).pagination({
								pageSize : 10,
								displayMsg : '',
								showPageList : false,
								showRefresh : false,
								layout : [ 'first', 'prev', 'links', 'next', 'last' ],
								links : 5
							});
						}
						else if (Math.ceil(total / pageSize) <= 5) {
							$(page).pagination({
								pageSize : 10,
								displayMsg : '',
								showPageList : false,
								showRefresh : false,
								layout : [ 'links' ],
								links : 5
							});
						}

						// 20150129 버그수정
						for ( var i = 0; i < data.rows.length; i++) {
							$("#row-" + i).click(function () {
								var rowid = $(this).attr("id");
								var rowNum = rowid.substring(5, rowid.length - 1);
								openThemaMapInfo(data.rows[rowNum]);
							});
						}

					}
				},
				onBeforeLoad : function (param) {
					$('#noSearchResult').hide();
				},
				loadFilter : function (data) {
					if (data.rows == null) {
						if (data.errCd == -1) {
							getConfirmPopup('알림', data.errMsg, 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
						}
						data.rows = new Array();
					}
					return data;
				},
				url : contextPath + "/ServiceAPI/DT/ThemaMapManage/searchThemaMap.json"
		});
		// 2017.07.19 [개발팀] khc 표출순위 추가  end		
		
		// pagination of datagrid
		var page = $(id_datagrid).datagrid('getPager');
		$(page).pagination({
			pageSize : 10,
			displayMsg : '',
			showPageList : false,
			showRefresh : false,
			layout : [],
			links : 5
		});
		// plupload plugins
	});
	// press the 'enter' key
	$(document).keydown(function (event) {
		if (event.which == 13) {
			if ($('#confirmPopup').css('display') == 'block' || $('#addThemaMapPopup').css('display') == 'block' || $('#addThemaMapFilePopup').css('display') == 'block' || $('#themaMapInfoMapPopup').css('display') == 'block' || $('#themaMapInfoFilePopup').css('display') == 'block') {
				return false;
			}
			else {
				$('#searchButton').click();
				return false;
			}
		}
	});
	$themaMapManage = {
			delThemaMap : function (STAT_THEMA_MAP_ID_List) {
				var sopOpenApiDelThemaMapObj = new sop.openApi.delThemaMap.api();
				sopOpenApiDelThemaMapObj.addParam('STAT_THEMA_MAP_ID_List', STAT_THEMA_MAP_ID_List);
				sopOpenApiDelThemaMapObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/ThemaMapManage/deleteThemaMap.json"
				});
			},
			
			// 2017.07.19 [개발팀] khc 표출순위 추가 start
			updateThemaMap : function (STAT_THEMA_MAP_ID, CATEGORY_NM, CATEGORY_EM, SRV_YN, ICON_ID, EXP, DISP_RANK) {
				var sopOpenApiUpdateThemaMapObj = new sop.openApi.updateThemaMap.api();
				sopOpenApiUpdateThemaMapObj.addParam('THEMA_MAP_CATEGORY', STAT_THEMA_MAP_ID);
				sopOpenApiUpdateThemaMapObj.addParam('CATEGORY_NM', CATEGORY_NM);
				sopOpenApiUpdateThemaMapObj.addParam('CATEGORY_EM', CATEGORY_EM);
				sopOpenApiUpdateThemaMapObj.addParam('SRV_YN', SRV_YN);
				sopOpenApiUpdateThemaMapObj.addParam('ICON_ID', ICON_ID);
				sopOpenApiUpdateThemaMapObj.addParam('EXP', encodeURIComponent(EXP));
				sopOpenApiUpdateThemaMapObj.addParam('DISP_RANK', $('#DISP_RANK').val().replace(/(^\s*)|(\s*$)/g, '')); 
				
				sopOpenApiUpdateThemaMapObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/ThemaMapManage/updateThemaMap.json"
				});
			},
			addThemaMap : function (CATEGORY_NM,SRV_YN,CATEGORY_EM,ICON_ID,EXP, DISP_RANK) {
				var sopOpenApiAddThemaMapObj = new sop.openApi.addThemaMap.api();
				sopOpenApiAddThemaMapObj.addParam('CATEGORY_NM', CATEGORY_NM);
				sopOpenApiAddThemaMapObj.addParam('CATEGORY_EM', CATEGORY_EM);
				sopOpenApiAddThemaMapObj.addParam('ICON_ID', ICON_ID);
				sopOpenApiAddThemaMapObj.addParam('SRV_YN', SRV_YN);
				sopOpenApiAddThemaMapObj.addParam('EXP', encodeURIComponent(EXP));
				sopOpenApiAddThemaMapObj.addParam('DISP_RANK', $('#DISP_RANK').val().replace(/(^\s*)|(\s*$)/g, ''));
				
				sopOpenApiAddThemaMapObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/ThemaMapManage/addThemaMap.json"
				});
			},
			// 2017.07.19 [개발팀] khc 표출순위 추가 end
			
			getThemaMapParam : function (STAT_THEMA_MAP_ID) {
				var sopOpenApiGetThemaMapParamObj = new sop.openApi.getThemaMapParam.api();
				sopOpenApiGetThemaMapParamObj.addParam('STAT_THEMA_MAP_ID', STAT_THEMA_MAP_ID);
				sopOpenApiGetThemaMapParamObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/ThemaMapManage/getThemaMapParam.json"
				});
			},
			sidoData : {
				'00' : '전체',
				'11' : '서울',
				'31' : '경기도',
				'32' : '강원도',
				'23' : '인천',
				'34' : '충남',
				'33' : '충북',
				'25' : '대전',
				'29' : '세종',
				'36' : '전남',
				'35' : '전북',
				'24' : '광주',
				'37' : '경북',
				'38' : '경남',
				'22' : '대구',
				'21' : '부산',
				'26' : '울산',
				'39' : '제주'
			}
	};
	
	
	// delete thema map
	(function () {
		$class("sop.openApi.delThemaMap.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(function () {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function () {
							confirmPopupRemove();
						});
						$(id_datagrid).datagrid('load', getQueryParamsObj());
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
	// modify thema map map
	(function () {
		$class("sop.openApi.updateThemaMap.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(function () {
							confirmPopupRemove();
							$(".popupWrapper").css("display","none");
						});
						$('#close_confirmPopup').click(function () {
							confirmPopupRemove();
						});
						if (result.success == true) {
							$('#themaMapInfoFilePopup').css('display', 'none');
							$('#themaMapInfoMapPopup').css('display', 'none');
							$(id_datagrid).datagrid('reload');
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
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);
			},
			onFail : function (status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);
			}
		});
	}());
	// add themaMap
	(function () {
		$class("sop.openApi.addThemaMap.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(function () {
							confirmPopupRemove();
							$(".popupWrapper").css("display","none");
						});
						$('#close_confirmPopup').click(function () {
							confirmPopupRemove();
						});
						console.log(result.success);
						if (result.success == true) {
							$(id_datagrid).datagrid('reload');
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
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);
			},
			onFail : function (status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);
			}
		});
	}());
	// get thema map param
	(function () {
		$class("sop.openApi.getThemaMapParam.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						var API_CALL_URL = '무';
						var PARAM_INFO = '무';
						var tableContent = '<tr><th>API호출URL</th><td>' + API_CALL_URL + '</td></tr><tr><th>파라미터정보</th><td>' + PARAM_INFO + '</td></tr>';
						var tbody = $("#confirmThemaMapPopup").find('tbody');
						tbody.append(tableContent);
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
//create query parameters for datagrid
function getQueryParamsObj () {
	var queryParamsObj = new Object();

	if ($('#SRV_YN').val() != 'ALL') {
		queryParamsObj['SRV_YN'] = $('#SRV_YN').val();
	}
	return queryParamsObj;
}
//click title
function openThemaMapInfo (row) {
	var THEMA_MAP_TYPE = row.THEMA_MAP_TYPE;
	var CATEGORY_NM = row.CATEGORY;
	var ARTICLE_DIV = row.ARTICLE_DIV;
	var AREA_SET = row.AREA_SET;
	var STAT_DISP_LEVEL = row.STAT_DISP_LEVEL;
	var SRV_YN = row.SRV_YN;
	var TITLE = encodeURIComponent((row.TITLE));
	var EXP = encodeURIComponent((row.EXP)).replace(/\n/g, "<br>");
	var STAT_THEMA_MAP_FILE_URL = row.STAT_THEMA_MAP_FILE_URL;
	var STAT_THEMA_MAP_ID = row.STAT_THEMA_MAP_ID;
	var PARAM_INFO = encodeURIComponent((row.PARAM_INFO));
	var METHOD = row.DISP_METHOD;
	var RELATEINFO = row.REL_STAT_INFO;
	var DISTLEVEL = row.STAT_DISP_LEVEL;
	EXP = decodeURIComponent(EXP);
	TITLE = decodeURIComponent(TITLE);
	EXP = EXP.replace(/<br>/g, '\n');
	EXP = EXP.replace(/<br\/>/g, '\n');
	console.log("row", row);
	if (THEMA_MAP_TYPE == '01') {
		// 통계주제도 등록
		var paramData = null;
		if (PARAM_INFO != 'undefined') {
			PARAM_INFO = decodeURIComponent(PARAM_INFO);
			paramData = JSON.parse(PARAM_INFO);
			console.log("paramData", paramData);
			if (paramData.isKosis) {
				var areaSelectBoxHtml = '';
				var sidoSelectBoxHtml = '';
				if (paramData.dist_level == '01') {
					// 시도레벨 까지 표출
					areaSelectBoxHtml += '<option value="01" selected>시도</option>';
					sidoSelectBoxHtml = '<option value="00" selected>전국</option>';
				}
				else if (paramData.dist_level == '02') {
					sidoSelectBoxHtml = '<option value="00" selected>전국</option>';
					var sidoCd = null;
					if (paramData.paramInfo.gis_se == '1') {

						// 시도레벨
						areaSelectBoxHtml = '<option value="01" selected>시도</option>';
						// 시군구 레벨
						areaSelectBoxHtml += '<option value="02">시군구</option>';
					}
					else {
						// 시도레벨
						areaSelectBoxHtml = '<option value="01" >시도</option>';
						// 시군구 레벨
						areaSelectBoxHtml += '<option value="02" selected>시군구</option>';
						// 시군구 레벨

						// 코시스 API 시군구까지 지원하는데 현재 요청한 gis_se가 전체 시도를 요청할경우
						// gis_se는 1 에외처리
						sidoCd = paramData.paramInfo.gis_se.substring(0, 2);
						sidoSelectBoxHtml += '<option value=' + sidoCd + '>' + $themaMapManage.sidoData[sidoCd] + '</option>';
					}

				}
				else if (paramData.dist_level == '03') {
					// 읍면동레벨
					areaSelectBoxHtml += '<option value="01" >시도</option>';
					areaSelectBoxHtml += '<option value="02">시군구</option>';
					areaSelectBoxHtml += '<option value="03" selected>읍면동</option>';

					sidoSelectBoxHtml = '<option value="00" selected>전국</option>';
					var sidoCd = null;
					if (paramData.paramInfo.gis_se == '1') {
						// 시도레벨
						areaSelectBoxHtml = '<option value="01" selected>시도</option>';
						areaSelectBoxHtml += '<option value="02">시군구</option>';
						areaSelectBoxHtml += '<option value="03">읍면동</option>';

					}
					else {
						if (paramData.paramInfo.gis_se.length == 2) {
							// 시군구 레벨
							areaSelectBoxHtml = '<option value="02" selected>시군구</option>';
							areaSelectBoxHtml += '<option value="03">읍면동</option>';
						}
						else {
							// 읍면동 레벨
							areaSelectBoxHtml = '<option value="03" selected>읍면동</option>';
						}
						// 코시스 API 시군구까지 지원하는데 현재 요청한 gis_se가 전체 시도를 요청할경우
						// gis_se는 1 에외처리
						sidoCd = paramData.paramInfo.gis_se.substring(0, 2);
						sidoSelectBoxHtml += '<option value=' + sidoCd + '>' + $themaMapManage.sidoData[sidoCd] + '</option>';
					}
				}

				$("#STAT_DISP_LEVEL").html(areaSelectBoxHtml);
				$("#AREA_SET").html(sidoSelectBoxHtml);

			}
			else {
				// NO KOSIS 표출 레벨 성정
				var areaSelectBoxHtml = '';
				if (paramData.mapInfo.zoomlevel <= 3) {
					// 시단위
					// 시도레벨 까지 표출
					areaSelectBoxHtml = '<option value="01" selected >시도</option>';
					areaSelectBoxHtml += '<option value="02">시군구</option>';
					areaSelectBoxHtml += '<option value="03" >읍면동</option>';
					areaSelectBoxHtml += '<option value="04" >집계구</option>';
				}
				else if (paramData.mapInfo.zoomlevel > 3 && paramData.mapInfo.zoomlevel <= 5) {
					// 시군구
					areaSelectBoxHtml = '<option value="02" selected>시군구</option>';
					areaSelectBoxHtml += '<option value="03">읍면동</option>';
					areaSelectBoxHtml += '<option value="04" >집계구</option>';

				}
				else if (paramData.mapInfo.zoomlevel > 5 && paramData.mapInfo.zoomlevel <= 8) {
					// 동면읍
					areaSelectBoxHtml += '<option value="03" selected>읍면동</option>';
					areaSelectBoxHtml += '<option value="04" >집계구</option>';
				}
				else if (paramData.mapInfo.zoomlevel > 8) {
					// 집계구
					areaSelectBoxHtml += '<option value="04" selected>집계구</option>';
				}
				$("#STAT_DISP_LEVEL").html(areaSelectBoxHtml);

				// NO KOSIS 지역설정
				var sidoSelectBoxHtml = '';
				if (paramData.paramInfo.adm_cd.length == '2') {
					if (paramData.paramInfo.adm_cd == '00') {
						// 전체 시도
						sidoSelectBoxHtml = '<option value="00" selected>전국</option>';

						$("#AREA_SET").html(sidoSelectBoxHtml);
					}
					else {
						sidoSelectBoxHtml = '<option value="00" selected>전국</option>';
						var sidoCd = paramData.paramInfo.adm_cd.substring(0, 2);
						// 특정 시도
						sidoSelectBoxHtml += '<option value=' + sidoCd + '>' + $themaMapManage.sidoData[sidoCd] + '</option>';
						$("#AREA_SET").html(sidoSelectBoxHtml);
					}

				}
				else if (paramData.paramInfo.adm_cd.length > 2) {
					sidoSelectBoxHtml = '<option value="00" selected>전국</option>';
					var sidoCd = paramData.paramInfo.adm_cd.substring(0, 2);
					// 특정 시도
					sidoSelectBoxHtml += '<option value=' + sidoCd + '>' + $themaMapManage.sidoData[sidoCd] + '</option>';
					$("#AREA_SET").html(sidoSelectBoxHtml);

				}

			}
			$("#STAT_DISP_LEVEL").val(STAT_DISP_LEVEL);
		}
		// map
		document.getElementById('themaMapInfoMapForm').reset();
		$("#themaMapInfoMapPopup").css("display", "block");
		$("#THEMA_MAP_TYPE_MapInfo").val(THEMA_MAP_TYPE);
		$("#CATEGORY_MapInfo").val(CATEGORY_NM);
		$("#ARTICLE_DIV_MapInfo").val(ARTICLE_DIV);
		$("#AREA_SET").val(AREA_SET);


		$("#SRV_YN_MapInfo").val(SRV_YN);
		$("#TITLE_MapInfo").html(TITLE);
		$("#TITLE_MapInfo").val($("#TITLE_MapInfo").text());
		$("#EXP_MapInfo").html(EXP);
		$("#STAT_THEMA_MAP_ID_MapInfo").val(STAT_THEMA_MAP_ID);
		// METHOD, RELATEINFO, DISTLEVEL) {
		if (RELATEINFO == undefined) {
			RELATEINFO = '';
		}
		if (METHOD == undefined) {
			METHOD = '';
		}

		$("#METHOD_form").html(METHOD);
		$("#METHOD_form").val($("#METHOD_form").text());
		$("#RELATEINFO_form").html(RELATEINFO);
		$("#RELATEINFO_form").val($("#RELATEINFO_form").text());
	}
	else if (THEMA_MAP_TYPE == '02') {
		// 파일로 업로드 하는 폼
		document.getElementById('themaMapInfoFileForm').reset();
		$("#themaMapInfoFilePopup").css("display", "block");
		$("#THEMA_MAP_TYPE_FileInfo").val(THEMA_MAP_TYPE);
		$("#CATEGORY_FileInfo").val(CATEGORY_NM);
		$("#ARTICLE_DIV_FileInfo").val(ARTICLE_DIV);
		$("#SRV_YN_FileInfo").val(SRV_YN);
		$("#TITLE_FileInfo").html(TITLE);
		$("#TITLE_FileInfo").val($("#TITLE_FileInfo").text());
		$("#EXP_FileInfo").html(EXP);
		$("#STAT_THEMA_MAP_ID_FileInfo").val(STAT_THEMA_MAP_ID);
		$("#STAT_THEMA_MAP_FILE_URL").html(STAT_THEMA_MAP_FILE_URL + "<span><a onclick='delFileInUpdatePage()' style='cursor:pointer'><img src='./../include/img/btn/btn_popup_x.png' alt='삭제'/></a></span>");
		$("#FILEUpdate").hide();
		$('#STAT_THEMA_MAP_FILE_URL').show();

		/* yjh 20150122 추가 */
		$("#METHOD_updateFile").html(METHOD);
		$("#METHOD_updateFile").val($("#METHOD_updateFile").text());
		$("#RELATEINFO_updateFile").html(RELATEINFO);
		$("#RELATEINFO_updateFile").val($("#RELATEINFO_updateFile").text());

		var areaSelectBoxHtml = '';
		if (DISTLEVEL == '01') {
			areaSelectBoxHtml = '<option value="01" selected >시도</option>';
			areaSelectBoxHtml += '<option value="02">시군구</option>';
			areaSelectBoxHtml += '<option value="03" >읍면동</option>';
			areaSelectBoxHtml += '<option value="04" >집계구</option>';
		}
		else if (DISTLEVEL == '02') {
			areaSelectBoxHtml = '<option value="01"  >시도</option>';
			areaSelectBoxHtml += '<option value="02" selected>시군구</option>';
			areaSelectBoxHtml += '<option value="03" >읍면동</option>';
			areaSelectBoxHtml += '<option value="04" >집계구</option>';

		}
		else if (DISTLEVEL == '03') {
			areaSelectBoxHtml = '<option value="01"  >시도</option>';
			areaSelectBoxHtml += '<option value="02" >시군구</option>';
			areaSelectBoxHtml += '<option value="03" selected>읍면동</option>';
			areaSelectBoxHtml += '<option value="04" >집계구</option>';

		}
		else if (DISTLEVEL == '04') {
			areaSelectBoxHtml = '<option value="01"  >시도</option>';
			areaSelectBoxHtml += '<option value="02" >시군구</option>';
			areaSelectBoxHtml += '<option value="03" >읍면동</option>';
			areaSelectBoxHtml += '<option value="04" selected>집계구</option>';
		}

		$("#DISTLEVEL_updateFile").html(areaSelectBoxHtml);
	}
}
//click confirm thema Map button
function themaMapConfirm (THEMA_MAP_TYPE, STAT_THEMA_MAP_FILE_URL, STAT_THEMA_MAP_ID) {
	$("#confirmThemaMapPopup").css("display", "block");
	var tbody = $("#confirmThemaMapPopup").find('tbody');
	tbody.empty();
	if (THEMA_MAP_TYPE == '01') {
		// Map
		$themaMapManage.getThemaMapParam(STAT_THEMA_MAP_ID.replace(/(^\s*)|(\s*$)/g, ''));
	}
	else if (THEMA_MAP_TYPE == '02') {
		// File
		var tableContent = '<tr><th>통계주제도파일URL</th><td>' + STAT_THEMA_MAP_FILE_URL + '</td></tr>';
		tbody.append(tableContent);
	}
}

// 2017.07.19 [개발팀] khc 표출순위 추가  start
function openModifyPopup(THEMA_MAP_CATEGORY, CATEGORY_NM, SRV_YN,EN,CATEGORY_ICON_ID,EXP, DISP_RANK){
	srvLogWrite("L0", "03", "02", "02", "", "");
	THEMA_MAP_CATEGORY = decodeURIComponent(THEMA_MAP_CATEGORY);
	CATEGORY_NM = decodeURIComponent(CATEGORY_NM);	
	SRV_YN = decodeURIComponent(SRV_YN);
	EN = 	decodeURIComponent(EN);
	CATEGORY_ICON_ID = 	decodeURIComponent(CATEGORY_ICON_ID);
	EXP = decodeURIComponent(EXP);
	DISP_RANK = decodeURIComponent(DISP_RANK);
	$('#validateTd').hide();
	$('#validateButton').hide();
	$('#addButton').hide();
	$('#addButtonDisabled').hide();
	$('#modifyButtonDisabled').hide();
	$('#modifyButton').show();
	$('#popTitle').text('카테고리 수정');
	document.getElementById('popupForm').reset();
	$('.popupWrapper').css('display','block');
	$('#keywordAdd').focus();
	$('#assocWordAdd0').focus();
	$('#keywordAdd').focus();

	$('#CATEGORY_NM').html(CATEGORY_NM);
	$('#CATEGORY_NM').val($('#CATEGORY_NM').text());	

	$('#CATEGORY_EM').html(EN);
	$('#CATEGORY_EM').val($('#CATEGORY_EM').text());

	$('#SRV_YN1').show();
	$('#SRV_YN1').val(SRV_YN);

	$('#EXP_AR').show();
	$('#EXP_AR').val(EXP);

	$('#DISP_RANK').html(DISP_RANK);
	$('#DISP_RANK').val($('#DISP_RANK').text());
	
	$("#CATEGORY_ICON").html(CATEGORY_ICON_ID); 
	$("#CATEGORY_ICON").val($("#CATEGORY_ICON").text());
	$('#CATEGORY_ID').html(THEMA_MAP_CATEGORY);
	$('#CATEGORY_ID').val($('#CATEGORY_ID').text());

	$('#validateButton_disabled').hide();
	$('#keywordAdd').attr("disabled",true);
}

function openAddPopup(){
	$('#validateTd').hide();
	$('#validateButton').hide();
	$('#addButton').show();
	$('#addButtonDisabled').hide();
	$('#modifyButtonDisabled').hide();
	$('#modifyButton').hide();
	$('#popTitle').text('카테고리 등록');
	document.getElementById('popupForm').reset();
	$('.popupWrapper').css('display','block');
	$('#keywordAdd').focus();
	$('#assocWordAdd0').focus();
	$('#keywordAdd').focus();
	$('#validateButton_disabled').hide();
	$('#keywordAdd').attr("disabled",true);
	$("#DISP_RANK").val(listTotalCnt);
}
//2017.07.19 [개발팀] khc 표출순위 추가  end

//click the delete file button
function delFileInUpdatePage () {
	getConfirmPopup('확인', '삭제하시겠습니까?', 'confirm');
	$('#ok_confirmPopup').click(function () {
		pluploader.setOption('browse_button', 'pickfilesUpdateFile');
		pluploader.setOption('url', contextPath + '/ServiceAPI/DT/ThemaMapManage/addThemaMapFile.json');
		pluploader.setOption('multipart_params', {
			STAT_THEMA_MAP_FILE_URL : $("#STAT_THEMA_MAP_FILE_URL").text()
		});
		$('#STAT_THEMA_MAP_FILE_URL').hide();
		$('#FILEUpdate').show();
		$('#fileNameUpdateFile').empty();
		confirmPopupRemove();
	});
	$('#cancel_confirmPopup').click(function () {
		confirmPopupRemove();
	});
	$('#close_confirmPopup').click(function () {
		confirmPopupRemove();
	});
}

//2017.07.19 [개발팀] khc 표출순위 추가  start
//maxlength 체크
function maxLengthCheck(object){
	if (object.value.length > object.maxLength){
		object.value = object.value.slice(0, object.maxLength);
	}    
}
//2017.07.19 [개발팀] khc 표출순위 추가  end