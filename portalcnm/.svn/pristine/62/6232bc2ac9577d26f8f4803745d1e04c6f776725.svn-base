/**
 * 
 * @JSName: policyCategoryManage
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
	W.$policyCategoryManage = W.$policyCategoryManage || {};
	// id of datagrid
	var id_datagrid = '#searchResultTable';
	$(document).ready(function () {
		
		srvLogWrite("L0", "03", "01", "01", "", "");
		
		$('#SEARCH_WORD').val('');
		// page init
		document.getElementById('resetForm').reset();
		$('#noSearchResult').hide();
		// click the search button
		//2017.09.18[개발팀]l.d.h 정책통계지도 - 검색버튼 이벤트
		$('#searchButton').click(function(){
			srvLogWrite("L0", "03", "01", "01", "", "");
			var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');	
			$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));	
			
		});
		// click the next button of add thema map
		if ($.fn.validatebox) {
			$.fn.validatebox.defaults.missingMessage = '이 입력 항목은 필수 입력 항목 입니다.';
		}
		$('#TITLE').validatebox({
			required : false,
			validType : [ 'cnmInput' ]
		});
		// click the add thema map button
		$('#newpolicyCategoryButton').click(function(){
			openAddPopup();
		});
		// click the delete thema map button
		$('#delpolicyCategoryButton').click(function () {
			srvLogWrite("L0", "03", "01", "03", "", "");
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
				getConfirmPopup('확인', '선택된 항목이 삭제됩니다. 삭제하시겠습니까?', 'confirm');
				$('#ok_confirmPopup').click(function () {
					var STAT_CATEGORY_ID_List = new Array();
					for ( var i = 0; i < row.length; i++) {
						STAT_CATEGORY_ID_List[i] = row[i].CATEGORY_ID;
					}
					$policyCategoryManage.delpolicyCategory(STAT_CATEGORY_ID_List);
					confirmPopupRemove();
				});
				$('#cancel_confirmPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
			}
		});
		$('#addButton').click(function(){
			srvLogWrite("L0", "03", "01", "02", "", $('#CATEGORY_NM').val());
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
			var EXP = $('#EXP').val();
			if(EXP.length<1){
				getConfirmPopup('알림', '설명을 입력해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
				$('#EXP').focus();
				return;
			}
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
			
			$policyCategoryManage.addpolicyCategory(CATEGORY_NM, EXP, DISP_RANK);
		});
		// click the modify button of thema map info
		$('#modifyButton').click(function () {
			
			srvLogWrite("L0", "03", "01", "05", "", "");
			
			var STAT_CATEGORY_ID = $("#CATEGORY_ID").val();
			var EXP = $('#EXP').val();
			var CATEGORY_NM = $('#CATEGORY_NM').val();
			
			// 2017.07.19 [개발팀] khc 표출순위 추가  start
			var DISP_RANK = $('#DISP_RANK').val();
			$policyCategoryManage.updatepolicyCategory(STAT_CATEGORY_ID, CATEGORY_NM, EXP, DISP_RANK);
			// 2017.07.19 [개발팀] khc 표출순위 추가  end
			
		});
		// click the cancel button of map information page
		$('#cancelButton_MapInfo').click(function () {
			$("#policyCategoryInfoMapPopup").css("display", "none");
		});
		// click the modify button of thema file info
		// click the cancel button of file information page
		$('#cancelButton_FileInfo').click(function () {
			$("#policyCategoryInfoFilePopup").css("display", "none");
		});
		
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
				{field : 'CATEGORY_ID',hidden: true},
				{field : 'EXP',hidden: true},
				{field : 'DISP_RANK',title : '표출순위',align : 'center',width : 80},
				
				{field : 'CATEGORY_NM',title : '카테고리명',align : 'center',width : 515,
					formatter : function (value, row, index) {						
						var THEMA_MAP_CATEGORY = encodeURIComponent((row.CATEGORY_ID));
						var CATEGORY_NM = encodeURIComponent((row.CATEGORY_NM));
						var SRV_YN = encodeURIComponent((row.SRV_YN));
						var EXP = encodeURIComponent((row.EXP));						
						var DISP_RANK = encodeURIComponent((row.DISP_RANK));
						if (value != null && value != ''){
							return "<a onclick='openModifyPopup(\""+ THEMA_MAP_CATEGORY+"\",\""+CATEGORY_NM+"\",\""+EXP+"\",\""+DISP_RANK+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
						} else {
							return value;
						}
					}	
				},
				{field : 'CNT',title : '지표 갯수',align : 'center',width : 110,
					formatter : function (value, row, index) {
					if (value != null && value != ''){
						return value;
					} else {
						return "0";
					}
				}},
				] ],
				queryParams: {

				},
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
								openpolicyCategoryInfo(data.rows[rowNum]);
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
				url : contextPath + "/ServiceAPI/DT/policyCategoryManage/searchPolicyCategory.json"
		});
		
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
			if ($('#confirmPopup').css('display') == 'block' || $('#addpolicyCategoryPopup').css('display') == 'block' || $('#addpolicyCategoryFilePopup').css('display') == 'block' || $('#policyCategoryInfoMapPopup').css('display') == 'block' || $('#policyCategoryInfoFilePopup').css('display') == 'block') {
				return false;
			}
			else {
				$('#searchButton').click();
				return false;
			}
		}
	});
	$policyCategoryManage = {
			delpolicyCategory : function (STAT_CATEGORY_ID_List) {				
				var sopOpenApiDelpolicyCategoryObj = new sop.openApi.delpolicyCategory.api();
				sopOpenApiDelpolicyCategoryObj.addParam('STAT_CATEGORY_ID_List', STAT_CATEGORY_ID_List);
				sopOpenApiDelpolicyCategoryObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/policyCategoryManage/delPolicyCategory.json"
				});
			},
			updatepolicyCategory : function (STAT_CATEGORY_ID, CATEGORY_NM, EXP, DISP_RANK) {
				var sopOpenApiUpdatepolicyCategoryObj = new sop.openApi.updatepolicyCategory.api();
				sopOpenApiUpdatepolicyCategoryObj.addParam('CATEGORY_ID', STAT_CATEGORY_ID);
				sopOpenApiUpdatepolicyCategoryObj.addParam('CATEGORY_NM', CATEGORY_NM);
				sopOpenApiUpdatepolicyCategoryObj.addParam('EXP', encodeURIComponent(EXP));
				sopOpenApiUpdatepolicyCategoryObj.addParam('DISP_RANK', $('#DISP_RANK').val().replace(/(^\s*)|(\s*$)/g, '')); 
				
				sopOpenApiUpdatepolicyCategoryObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/policyCategoryManage/updatePolicyCategory.json"
				});
			},
			addpolicyCategory : function (CATEGORY_NM,EXP, DISP_RANK) {
				var sopOpenApiAddpolicyCategoryObj = new sop.openApi.addpolicyCategory.api();
				sopOpenApiAddpolicyCategoryObj.addParam('CATEGORY_NM', CATEGORY_NM);
				sopOpenApiAddpolicyCategoryObj.addParam('EXP', encodeURIComponent(EXP));
				sopOpenApiAddpolicyCategoryObj.addParam('DISP_RANK', $('#DISP_RANK').val().replace(/(^\s*)|(\s*$)/g, ''));
				
				sopOpenApiAddpolicyCategoryObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/policyCategoryManage/AddPolicyCategory.json"
				});
			}
	};
	
	
	// delete thema map
	(function () {
		$class("sop.openApi.delpolicyCategory.api").extend(sop.cnm.absAPI).define({
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
	// modify polycyCategory map
	(function () {
		$class("sop.openApi.updatepolicyCategory.api").extend(sop.cnm.absAPI).define({
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
							$('#policyCategoryInfoFilePopup').css('display', 'none');
							$('#policyCategoryInfoMapPopup').css('display', 'none');
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
	// add policyCategory
	(function () {
		$class("sop.openApi.addpolicyCategory.api").extend(sop.cnm.absAPI).define({
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
						//console.log(result.success);
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
}(window, document));
//create query parameters for datagrid
function getQueryParamsObj (SEARCH_WORD) {
	var queryParamsObj = new Object();
	if(SEARCH_WORD.length >= 2)
	{
	queryParamsObj['SEARCH_WORD'] = SEARCH_WORD.replace(/(^\s*)|(\s*$)/g, '');
	}
	return queryParamsObj;
}

// 2017.07.19 [개발팀] khc 표출순위 추가  start
function openModifyPopup(THEMA_MAP_CATEGORY, CATEGORY_NM, EXP, DISP_RANK){
	srvLogWrite("L0", "03", "01", "04", "", CATEGORY_NM);
	THEMA_MAP_CATEGORY = decodeURIComponent(THEMA_MAP_CATEGORY);
	CATEGORY_NM = decodeURIComponent(CATEGORY_NM);	
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

	$('#EXP').show();
	$('#EXP').val(EXP);

	$('#DISP_RANK').html(DISP_RANK);
	$('#DISP_RANK').val($('#DISP_RANK').text());
	
	
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

//2017.07.19 [개발팀] khc 표출순위 추가  start
//maxlength 체크
function maxLengthCheck(object){
	if (object.value.length > object.maxLength){
		object.value = object.value.slice(0, object.maxLength);
	}    
}
//2017.07.19 [개발팀] khc 표출순위 추가  end