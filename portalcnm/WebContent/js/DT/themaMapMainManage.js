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
var pluploader = null;

// 2016. 04. 25 j.h.Seok
var Category = "ALL";
var SrvYn = "ALL";
var Title = "";
var isReLoad = true;

(function (W, D) {
	W.$themaMapMainManage = W.$themaMapMainManage || {};
	// id of datagrid
	var id_datagrid = '#searchResultTable';
	$(document).ready(function () {
		srvLogWrite("L0", "03", "02", "05", "", "");
		var tempCategory = getParameter("CATEGORY_NM");
		var tempSrvYn = getParameter("SRV_YN");
		var tempTitle = getParameter("TITLE");
		
		if(tempCategory != null && tempCategory != undefined && tempCategory) {
			Category = tempCategory;
		}
		
		if(tempSrvYn != null && tempSrvYn != undefined && tempSrvYn) {
			SrvYn = tempSrvYn;
		}
		
		if(tempTitle != null && tempTitle != undefined && tempTitle) {
			Title = tempTitle;
		}
		
		// page init
		document.getElementById('resetForm').reset();
		$('#noSearchResult').hide();
		// click the search button
		$('#searchButton').click(function () {
			srvLogWrite("L0", "03", "02", "05", "", "");
			if ($('#TITLE').validatebox('isValid')) {
				$(id_datagrid).datagrid('load', getQueryParamsObj());
			}
		});
		// click the add thema map button
		$('#addThemaMapButton').click(function () {
			// mng_s 2017. 08. 04 석진혁
			location.href = './../DT/themaMapAdd.html';
//			$("#addThemaMapPopup").css("display", "block");
//			$('#fileName').empty();
//			document.getElementById('THEMA_MAP_TYPEForm').reset();
//			$themaMapMainManage.loadLogBCd();
			// mng_e 2017. 08. 04 석진혁
		});
		// click the next button of add thema map
		$('#addThemaMapNextButton').click(function () {
			$("#addThemaMapPopup").css("display", "none");
			if ($('#THEMA_MAP_TYPE').val() == '03') {
				// jump to new map page
				location.href = './../DT/themaMapAdd.html';
			}
			else if ($('#THEMA_MAP_TYPE').val() == '02') {
				// jump to new file page
				document.getElementById('addThemaMapFileForm').reset();
				$('#addThemaMapFilePopup').css('display', 'block');
				pluploader.setOption('browse_button', 'pickfiles');
				pluploader.setOption('url', contextPath + '/ServiceAPI/DT/ThemaMapManage/addThemaMapFile.json');
			}
		});
		// click the cancel button of add thema map
		$('#addThemaMapCancelButton').click(function () {
			$("#addThemaMapPopup").css("display", "none");
		});
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
		// click the delete thema map button
		$('#delThemaMapButton').click(function () {
			srvLogWrite("L0", "03", "02", "12", "", "");
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
				getConfirmPopup('확인', '선택된 항목이 삭제됩니다. 삭제하시겠습니까?', 'confirm');
				$('#ok_confirmPopup').click(function () {
					var STAT_THEMA_MAP_ID_List = new Array();
					var STAT_THEMA_MAP_FILE_URL_List = new Array();
					for ( var i = 0; i < row.length; i++) {
						STAT_THEMA_MAP_ID_List[i] = row[i].STAT_THEMA_MAP_ID;
						if (row[i].THEMA_MAP_TYPE == '02') {
							STAT_THEMA_MAP_FILE_URL_List[i] = row[i].STAT_THEMA_MAP_FILE_URL;
						}
					}
					$themaMapMainManage.delThemaMap(STAT_THEMA_MAP_ID_List, STAT_THEMA_MAP_FILE_URL_List);
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
		// click the modify button of thema map info
		$('#modifyButton_MapInfo').click(function () {
			$("#TITLE_MapInfo").validatebox('enableValidation');
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
						$themaMapMainManage.updateThemaMap(THEMA_MAP_TYPE, STAT_THEMA_MAP_ID, CATEGORY, ARTICLE_DIV, SRV_YN, TITLE, EXP, null, AREA_SET, STAT_DISP_LEVEL, METHOD, RELATEINFO);
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
		// click the cancel button of map information page
		$('#cancelButton_MapInfo').click(function () {
			$("#themaMapInfoMapPopup").css("display", "none");
		});
		$("#TITLE_FileInfo").validatebox({
			required : true,
			validType : [ 'byteSizeVal[100]' ]
		});
		$("#TITLE_FileInfo").validatebox('disableValidation');
		$("#EXP_FileInfo").validatebox({
			required : true,
			validType : [ 'byteSizeVal[3000]' ]
		});
		$("#EXP_FileInfo").validatebox('disableValidation');
		// click the modify button of thema file info
		$('#modifyButton_FileInfo').click(function () {
			$("#TITLE_FileInfo").validatebox('enableValidation');
			$("#EXP_FileInfo").validatebox('enableValidation');
			var TITLE = $("#TITLE_FileInfo").val().replace(/(^\s*)|(\s*$)/g, '');
			var EXP = $("#EXP_FileInfo").val().replace(/(^\s*)|(\s*$)/g, '');
			var fileNameUpdateFile = $('#fileNameUpdateFile').text().replace(/(^\s*)|(\s*$)/g, '');
			if (TITLE.length == 0) {
				$("#TITLE_FileInfo").val('');
				$("#TITLE_FileInfo").focus();
			}
			else if (EXP.length == 0) {
				$("#EXP_FileInfo").val('');
				$("#EXP_FileInfo").focus();
			}
			else if ($('#FILEUpdate').is(':visible') == true && (fileNameUpdateFile.length == 0 || fileNameUpdateFile.indexOf('.') != fileNameUpdateFile.length - 4)) {
				getConfirmPopup('알림', '파일을 선택하세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
			}
			else {
				if ($("#TITLE_FileInfo").validatebox('isValid') && $("#EXP_FileInfo").validatebox('isValid')) {
					if (getBytesCount(TITLE) < 100) {
						if (getBytesCount(EXP) < 1000) {
							$("#TITLE_FileInfo").validatebox('disableValidation');
							$("#EXP_FileInfo").validatebox('disableValidation');
							getConfirmPopup('확인', '수정하시겠습니까?', 'confirm');
							$('#ok_confirmPopup').click(function () {
								if ($('#FILEUpdate').is(':visible') == true) {
									$('.maskbg').fadeIn(200);
									$('.maskcontent').fadeIn(400);
									pluploader.start();
								}
								else {
									var THEMA_MAP_TYPE = $("#THEMA_MAP_TYPE_FileInfo").val();
									var STAT_THEMA_MAP_ID = $("#STAT_THEMA_MAP_ID_FileInfo").val();
									var CATEGORY = $("#CATEGORY_FileInfo").val();
									var ARTICLE_DIV = 'STATE';// 임의로 박아줌
									var SRV_YN = $("#SRV_YN_FileInfo").val();
									var TITLE = $("#TITLE_FileInfo").val().replace(/(^\s*)|(\s*$)/g, '');
									var EXP = $("#EXP_FileInfo").val().replace(/(^\s*)|(\s*$)/g, '');
									var DISTLEVEL = $('#DISTLEVEL_updateFile').val().replace(/(^\s*)|(\s*$)/g, '');
									var METHOD = $('#METHOD_updateFile').val().replace(/(^\s*)|(\s*$)/g, '');
									var RELATEINFO = $('#RELATEINFO_updateFile').val().replace(/(^\s*)|(\s*$)/g, '');
									
									//2016.03.21 수정, enter시 <br/>추가
									EXP = EXP.replace(/\n/g, "<br>");

									$themaMapMainManage.updateThemaMap(THEMA_MAP_TYPE, STAT_THEMA_MAP_ID, CATEGORY, ARTICLE_DIV, SRV_YN, TITLE, EXP, null, null, DISTLEVEL, METHOD, RELATEINFO);
								}
								confirmPopupRemove();
							});
							$('#cancel_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
						}
						else {
							getConfirmPopup('알림', '지정된 입력범위를 초과하였습니다.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
						}
					}
					else {
						getConfirmPopup('알림', '지정된 입력범위를 초과하였습니다.', 'alert');
						$('#ok_alertPopup').click(function () {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function () {
							confirmPopupRemove();
						});
					}
				}
			}
		});
		// click the cancel button of file information page
		$('#cancelButton_FileInfo').click(function () {
			$("#themaMapInfoFilePopup").css("display", "none");
		});
		$themaMapMainManage.loadLogBCd2();
		// search result
		$(id_datagrid).datagrid({
			loadMsg : '처리중 입니다, 기다리 십시요...',
			pagination : true,
			nowrap : false,
			checkOnSelect : false,
//			sortName : 'REG_TS',
//			sortOrder : 'desc',
			columns : [ [ 
			             {field : 'stat_thema_map_id',
			            	 hidden : true},
			            	 {field : 'exp',
				            	 hidden : true},{
			            		 field : 'checkbox',
			            		 checkbox : true
			            	 },
			            	 {field : 'DISP_RANK',
			            	  title : "표출순위",
			            	  align : "center",
			            	  width : 70}
			            	 ,
			            	 {
			            		 field : 'NM',
			            		 title : '카테고리 명',
			            		 align : 'center',
			            		 width : 100
			            	 }, {
			            		 field : 'TITLE',
			            		 title : '제목',
			            		 align : 'center',
			            		 width : 340,
			            		 formatter : function (value, row, index) {
			            			 if (value != null && value != '') {
			            				 var THEMA_MAP_TYPE = encodeURIComponent(row.THEMA_MAP_TYPE);
			            				 var Title = encodeURIComponent((row.TITLE));
			            				 var Exp = encodeURIComponent((row.EXP));
			            				 var Category =encodeURIComponent((row.THEMA_MAP_CATEGORY)); 
			            				 var STAT_THEMA_MAP_ID = encodeURIComponent(row.STAT_THEMA_MAP_ID);
			            				 var PARAM_INFO = encodeURIComponent((row.PARAM_INFO));
			            				 
			            				 // return "<a style='color:#4a4a4a;cursor:pointer'
			            				 // onclick='openThemaMapInfo(\""+row+"\")'
			            				 // onmouseover='$(this).css(\"text-decoration\",
			            				 // \"underline\")'
			            				 // onmouseout='$(this).css(\"text-decoration\",
			            				 // \"none\")'>" + value + "</a>";
			            				 var html='';
			            				 //lkh 주석추가 
			            				 //THEMA_MAP_TYPE이 03, 04, 05, 06 인 경우에는 팝업이고 그렇지 않은 경우엔 상세페이지로 이동
			            				 // 02파일업로드,  03색상, 04증감, 05 시계열, 06 분할, 07 POI 
			            				 if(THEMA_MAP_TYPE=='03'||THEMA_MAP_TYPE=='04'||THEMA_MAP_TYPE=='05'||THEMA_MAP_TYPE=='06'||THEMA_MAP_TYPE=='07'){
			            					 // 2016. 04. 25 j.h.Seok
			            					 var htmlParams = "";
			            					 var tempCategory = $("#CATEGORY_NM").val();
			            					 var tempSrvYn = $("#SRV_YN").val();
			            					 var tempTitle = $("#TITLE").val();
			            					 var tempCate = Category;
			            					 var tempMapId = STAT_THEMA_MAP_ID;
			            					 var tempMAP_TYPE = THEMA_MAP_TYPE;
			            					 
			            					 if(tempCategory != null && tempCategory != undefined) {
			            						 htmlParams += "&CATEGORY_NM=" + tempCategory; 
			            					 }
			            					 
			            					 if(tempSrvYn != null && tempSrvYn != undefined) {
			            						 htmlParams += "&SRV_YN=" + tempSrvYn; 
			            					 }
			            					 
			            					 if(tempTitle != null && tempTitle != undefined) {
			            						 htmlParams += "&TITLE=" + tempTitle; 
			            					 }
			            					 
			            					 html ="<a href='./themaMapUpdate.html?STAT_THEMA_MAP_ID="+ STAT_THEMA_MAP_ID + htmlParams
								        		+"' style='color:#4a4a4a;' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value;
								        		value += "</a>"; 
			            				 }else{
			            					 var html = "<a style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")' id=row-" + index + ">" + value + "</a>";	 
			            				 }
			            				 return html;
			            			 }
			            		 }
			            	 }, {
			            		 field : 'THEMA_MAP_TYPE',
			            		 title : '종류',
			            		 align : 'center',
			            		 width : 120,
			            		 formatter : function (value, row, index) {
			            			 if (value == '02'){
			            				 value = "파일업로드";
			            			 }else if(value=='03'){
			            				 value = "색상";
			            			 }else if(value=='04'){
			            				 value = "증감";
			            			 }else if(value=='05'){
			            				 value = "시계열";
			            			 }else if(value=='06'){
			            				 value = "분할";
			            			 }else if(value=='07'){
			            				 value = "POI";
			            			 }
			            			 return value;
			            		 }
			            	 }, {
			            		 field : 'SRV_YN',
			            		 title : '서비스여부',
			            		 align : 'center',
			            		 width : 87,
			            		 formatter : function (value, row, index) {
			            			 if (value == 'N'){
			            				 value = "아니오";
			            			 }else if(value=='Y'){
			            				 value = "예";
			            			 }
			            			 return value;
			            		 }
			            	 }] ],/* {
				field : 'check',
				title : '보기 ',
				align : 'center',
				width : 107,
				formatter : function (value, row, index) {
					if(value!=null || value!=''){
						return '<a href="/html/thematicMap/thematicMapMain.html?stat_thema_map_id=' + row.STAT_THEMA_MAP_ID + '&theme=' + row.CATEGORY + '&mapType=' + row.THEMA_MAP_TYPE + '"target="_blank"><img src="./../include/img/btn/btn_thematicmap.png" alt="주제도 확인" /></a>';
					}else{

					}
					// return "<a style='cursor: pointer' href='" +
					// row.STAT_THEMA_MAP_FILE_URL + "' target='_blank'
					// title='주제도 확인'><img
					// src='./../include/img/btn/btn_thematicmap.png' alt='주제도
					// 확인'/></a>";
				}
			}*/ 
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
			            		 
								// 2016. 04. 25 j.h.Seok
								$('#CATEGORY_NM').val(Category);
								$('#SRV_YN').val(SrvYn);
								$('#TITLE').val(decodeURIComponent(Title));
								
								if(Category != "ALL" || SrvYn != "ALL" || Title != "") {
									if(isReLoad) {
										isReLoad = false;
										$(id_datagrid).datagrid('load', getQueryParamsObj());
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
			            	 url : contextPath + "/ServiceAPI/DT/ThemaMapManage/searchThemaMapMain.json"
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
		pluploader = new plupload.Uploader({
			url : contextPath + '/ServiceAPI/DT/ThemaMapManage/addThemaMapFile.json',
			browse_button : 'pickfiles',
			file_data_name : 'FILE',
			filters : {
				mime_types : [ {
					title : 'Zip files',
					extensions : 'zip'
				} ],
				max_file_size : '20mb',
				multi_selection : false
				// can only select one file
			}
		});
		pluploader.init();
		pluploader.bind('FilesAdded', function (pluploader, files) {
			if ($('#addThemaMapFilePopup').is(':visible')) {
				// add file
				$('#fileName').text(files[0].name);
			}
			else if ($('#themaMapInfoFilePopup').is(':visible')) {
				// update file
				$('#fileNameUpdateFile').text(files[0].name);
			}
		});
		pluploader.bind('FileUploaded', function (pluploader, files, responseObject) {
			var data = $.parseJSON(responseObject.response);
			if (data.errCd == "0") {
				if (data.result != null) {
					if (data.result.success == true) {
						if ($('#addThemaMapFilePopup').is(':visible')) {
							// add file
							var CATEGORY = $('#CATEGORY_AddFile').val();
							var SRV_YN = $('#SRV_YN_MapInfo').val();
							var TITLE = $('#TITLE_AddFile').val().replace(/(^\s*)|(\s*$)/g, '');
							var EXP = $('#EXP_AddFile').val().replace(/(^\s*)|(\s*$)/g, '');
							var METHOD = $('#METHOD_AddFile').val().replace(/(^\s*)|(\s*$)/g, '');
							var DISTLEVEL = $('#DISTLEVEL_AddFile').val().replace(/(^\s*)|(\s*$)/g, '');
							var RELATEINFO = $('#RELATEINFO_AddFile').val().replace(/(^\s*)|(\s*$)/g, '');
							$themaMapMainManage.addThemaMap('02', CATEGORY, SRV_YN, TITLE, EXP, data.result.msg, METHOD, RELATEINFO, DISTLEVEL);
						}
						else if ($('#themaMapInfoFilePopup').is(':visible')) {
							// update file
							var THEMA_MAP_TYPE = $("#THEMA_MAP_TYPE_FileInfo").val();
							var STAT_THEMA_MAP_ID = $("#STAT_THEMA_MAP_ID_FileInfo").val();
							var CATEGORY = $("#CATEGORY_FileInfo").val();
							var ARTICLE_DIV = $("#ARTICLE_DIV_FileInfo").val();
							var SRV_YN = $("#SRV_YN_FileInfo").val();
							var TITLE = $("#TITLE_FileInfo").val().replace(/(^\s*)|(\s*$)/g, '');
							var EXP = $("#EXP_FileInfo").val().replace(/(^\s*)|(\s*$)/g, '');
							var METHOD = $('#METHOD_AddFile').val().replace(/(^\s*)|(\s*$)/g, '');
							var RELATEINFO = $('#RELATEINFO_AddFile').val().replace(/(^\s*)|(\s*$)/g, '');
							var DISTLEVEL = $('#DISTLEVEL_AddFile').val().replace(/(^\s*)|(\s*$)/g, '');

							$themaMapMainManage.updateThemaMap(THEMA_MAP_TYPE, STAT_THEMA_MAP_ID, CATEGORY, ARTICLE_DIV, SRV_YN, TITLE, EXP, data.result.msg, null, DISTLEVEL, METHOD, RELATEINFO);
						}
					}
					else {
						$('#fileName').empty();
						$('#fileNameUpdateFile').empty();
						getConfirmPopup('알림', data.result.msg, 'alert');
						$('#ok_alertPopup').click(function () {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function () {
							confirmPopupRemove();
						});
					}
				}
			}
			else {
				$('#fileName').empty();
				$('#fileNameUpdateFile').empty();
				getConfirmPopup('알림', data.errMsg, 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
			}
		});
		pluploader.bind('Error', function (uploader, errObject) {
			$('#fileName').text(errObject.message);
			$('#fileNameUpdateFile').text(errObject.message);
		});
		
		// 2016. 03. 25 j.h.Seok
		$themaMapMainManage.loadLogBCd1();
	});
	// press the 'enter' key
	$(document).keydown(function (event) {
		if (event.which == 13) {
			/* 2016.03.21 수정, textarea enter key 적용 */
			if ($('#themaMapInfoFilePopup').css('display') == 'block') {
				return true;
			}
			if ($('#confirmPopup').css('display') == 'block' || $('#addThemaMapPopup').css('display') == 'block' || $('#addThemaMapFilePopup').css('display') == 'block' || $('#themaMapInfoMapPopup').css('display') == 'block' || $('#themaMapInfoFilePopup').css('display') == 'block') {
				return false;
			}
			else {
				$('#searchButton').click();
				return false;
			}
		}
	});
	$themaMapMainManage = {
			delThemaMap : function (STAT_THEMA_MAP_ID_List, STAT_THEMA_MAP_FILE_URL_List) {
				var sopOpenApiDelThemaMapObj = new sop.openApi.delThemaMap.api();
				sopOpenApiDelThemaMapObj.addParam('STAT_THEMA_MAP_ID_List', STAT_THEMA_MAP_ID_List);
				if (STAT_THEMA_MAP_FILE_URL_List.length > 0) {
					sopOpenApiDelThemaMapObj.addParam('STAT_THEMA_MAP_FILE_URL_List', STAT_THEMA_MAP_FILE_URL_List);
				}
				sopOpenApiDelThemaMapObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/ThemaMapManage/deleteThemaMapList.json"
				});
			},
			updateThemaMap : function (THEMA_MAP_TYPE, STAT_THEMA_MAP_ID, CATEGORY, ARTICLE_DIV, SRV_YN, TITLE, EXP, STAT_THEMA_MAP_FILE_URL, AREA_SET, STAT_DISP_LEVEL, METHOD, RELATEINFO) {
				console.log('STAT_DISP_LEVEL', STAT_DISP_LEVEL);
				var sopOpenApiUpdateThemaMapObj = new sop.openApi.updateThemaMap.api();
				sopOpenApiUpdateThemaMapObj.addParam('STAT_THEMA_MAP_ID', STAT_THEMA_MAP_ID);
				sopOpenApiUpdateThemaMapObj.addParam('CATEGORY', CATEGORY);
//				sopOpenApiUpdateThemaMapObj.addParam('ARTICLE_DIV', ARTICLE_DIV);
				sopOpenApiUpdateThemaMapObj.addParam('SRV_YN', SRV_YN);
				sopOpenApiUpdateThemaMapObj.addParam('TITLE', encodeURIComponent(TITLE));
				sopOpenApiUpdateThemaMapObj.addParam('EXP', encodeURIComponent(EXP));

				sopOpenApiUpdateThemaMapObj.addParam('STAT_DISP_LEVEL', STAT_DISP_LEVEL);

				if(METHOD!=''){
					sopOpenApiUpdateThemaMapObj.addParam('METHOD', encodeURIComponent(METHOD));
				}else{
					sopOpenApiUpdateThemaMapObj.addParam('METHOD', encodeURIComponent(" "));
				}
				if(RELATEINFO!=''){
					sopOpenApiUpdateThemaMapObj.addParam('RELATEINFO', encodeURIComponent(RELATEINFO));
				}else{
					sopOpenApiUpdateThemaMapObj.addParam('RELATEINFO', encodeURIComponent(" "));
				}

				// file
				if (THEMA_MAP_TYPE == '02' && STAT_THEMA_MAP_FILE_URL != null) {
					sopOpenApiUpdateThemaMapObj.addParam('STAT_THEMA_MAP_FILE_URL', STAT_THEMA_MAP_FILE_URL);
				}
				// map
				if (THEMA_MAP_TYPE == '01') {
					sopOpenApiUpdateThemaMapObj.addParam('AREA_SET', AREA_SET);
					sopOpenApiUpdateThemaMapObj.addParam('STAT_DISP_LEVEL', STAT_DISP_LEVEL);
				}
				sopOpenApiUpdateThemaMapObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/ThemaMapManage/updateThemaMapT.json"
				});
			},
			loadLogBCd:function(){
				var sopOpenApiLoadLogBCdObj = new sop.openApi.loadLogBCd.api();
				sopOpenApiLoadLogBCdObj.addParam('CLASSTYPE', 'T');
				sopOpenApiLoadLogBCdObj.request({
					method : "POST",
					async : false,
					url : contextPath +"/ServiceAPI/COMMON/getAPIClass.json"
				});
			},
			loadLogBCd1:function(){
				var sopOpenApiLoadLogBCdObj = new sop.openApi.loadLogBCd1.api();
				sopOpenApiLoadLogBCdObj.addParam('CLASSTYPE', 'T');
				sopOpenApiLoadLogBCdObj.request({
					method : "POST",
					async : false,
					url : contextPath +"/ServiceAPI/COMMON/getAPIClass.json"
				});
			},
			loadLogBCd2:function(){
				var sopOpenApiLoadLogBCdObj = new sop.openApi.loadLogBCd2.api();
				sopOpenApiLoadLogBCdObj.addParam('CLASSTYPE', 'T');
				sopOpenApiLoadLogBCdObj.request({
					method : "POST",
					async : false,
					url : contextPath +"/ServiceAPI/COMMON/getAPIClass.json"
				});
			},
			addThemaMap : function (THEMA_MAP_TYPE, CATEGORY, SRV_YN, TITLE, EXP, STAT_THEMA_MAP_FILE_URL, METHOD, RELATEINFO, DISTLEVEL) {
				var sopOpenApiAddThemaMapObj = new sop.openApi.addThemaMap.api();
				sopOpenApiAddThemaMapObj.addParam('THEMA_MAP_TYPE', THEMA_MAP_TYPE);
				sopOpenApiAddThemaMapObj.addParam('CATEGORY', CATEGORY);
				sopOpenApiAddThemaMapObj.addParam('SRV_YN', SRV_YN);
				sopOpenApiAddThemaMapObj.addParam('TITLE', encodeURIComponent(TITLE));
				sopOpenApiAddThemaMapObj.addParam('EXP', encodeURIComponent(EXP));
				sopOpenApiAddThemaMapObj.addParam('STAT_THEMA_MAP_FILE_URL', STAT_THEMA_MAP_FILE_URL);
				if(METHOD!=''){
					sopOpenApiAddThemaMapObj.addParam('METHOD', encodeURIComponent(METHOD));
				}
				if(RELATEINFO!=''){
					sopOpenApiAddThemaMapObj.addParam('RELATEINFO', encodeURIComponent(RELATEINFO));
				}

				sopOpenApiAddThemaMapObj.addParam('STAT_DISP_LEVEL', DISTLEVEL);

				sopOpenApiAddThemaMapObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/ThemaMapManage/addThemaMapFileUpload.json"
				});
			},
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
	(function() {
		$class("sop.openApi.loadLogBCd.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") { 
					var result = res.result;
					console.log(result);
					if(result != null){
						for(var i = 1; i < $('#CATEGORY_AddFile').children().length; i++){
							$('#CATEGORY_AddFile').children().eq(i).remove();
						}
						for(var i=0;i<result.length;i++){
							$('#CATEGORY_AddFile').append("<option value='"+result[i].THEMA_MAP_CATEGORY+"'>"+result[i].CATEGORY_NM+"</option>");
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
		$class("sop.openApi.loadLogBCd1.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") { 
					var result = res.result;
					console.log(result);
					if(result != null){
						// 2016. 03. 25 j.h.Seok
						$('#CATEGORY_FileInfo').empty();
						
						for(var i=0;i<result.length;i++){
							$('#CATEGORY_FileInfo').append("<option value='"+result[i].THEMA_MAP_CATEGORY+"'>"+result[i].CATEGORY_NM+"</option>");
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
		$class("sop.openApi.loadLogBCd2.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") { 
					var result = res.result;
					console.log(result);
					if(result != null){
						for(var i = 1; i < $('#CATEGORY_NM').children().length; i++){
							$('#CATEGORY_NM').children().eq(i).remove();
						}
						for(var i=0;i<result.length;i++){
							$('#CATEGORY_NM').append("<option value='"+result[i].THEMA_MAP_CATEGORY+"'>"+result[i].CATEGORY_NM+"</option>");
						}
						
						// 2016. 04. 25 j.h.Seok
						// 2016. 04. 26 j.h.Seok
//						$('#CATEGORY_NM').val(Category);
//						$('#SRV_YN').val(SrvYn);
//						$('#TITLE').val(decodeURIComponent(Title));
//						
//						if(Category != "ALL" || SrvYn != "ALL" || Title != "") {
//							$(id_datagrid).datagrid('load', getQueryParamsObj());
//						}
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
						if ($('#TITLE').validatebox('isValid')) {
							$(id_datagrid).datagrid('load', getQueryParamsObj());
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
						});
						$('#close_confirmPopup').click(function () {
							confirmPopupRemove();
						});
						if (result.success == true) {
							$("#addThemaMapFilePopup").css("display", "none");
							if ($('#TITLE').validatebox('isValid')) {
								$(id_datagrid).datagrid('load', getQueryParamsObj());
							}
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
	
	// 2016. 04. 26 j.h.Seok
	Category = $('#CATEGORY_NM').val();
	SrvYn = $('#SRV_YN').val();
	Title = $('#TITLE').val();
	
	if ($('#CATEGORY_NM').val() != 'ALL') {
		queryParamsObj['CATEGORY'] = $('#CATEGORY_NM').val();
	}
	if ($('#SRV_YN').val() != 'ALL') {
		queryParamsObj['SRV_YN'] = $('#SRV_YN').val();
	}
	if ($('#TITLE').val().replace(/(^\s*)|(\s*$)/g, '').length > 0) {
		queryParamsObj['TITLE'] = $('#TITLE').val();
	}
	return queryParamsObj;
}
//click title
function openThemaMapInfo (row) {
	var THEMA_MAP_TYPE = row.THEMA_MAP_TYPE;
	var CATEGORY_NM = row.THEMA_MAP_CATEGORY;
	var ARTICLE_DIV = row.ARTICLE_DIV;
	var AREA_SET = row.AREA_SET;
	var STAT_DISP_LEVEL = row.STAT_DISP_LEVEL;
	var SRV_YN = row.SRV_YN;
	var TITLE = encodeURIComponent((row.TITLE));
	var EXP = encodeURIComponent((row.EXP)).replace(/\n/g, "<br>");
	var STAT_THEMA_MAP_FILE_URL = row.STAT_THEMA_MAP_FILE_URL;
	var STAT_THEMA_MAP_ID = row.STAT_THEMA_MAP_ID;
	var PARAM_INFO = encodeURIComponent((row.PARAM_INFO));
	var METHOD = row.DISP_MTHD;
	var RELATEINFO = row.REL_STAT_INFO;
	var DISTLEVEL = row.MAX_EXPNSN_LEVEL;
	EXP = decodeURIComponent(EXP);
	TITLE = decodeURIComponent(TITLE);
	
	//2016.03.21 수정
	EXP = EXP.replace(/&lt;p&gt;/gi, '');
	EXP = EXP.replace(/&lt;p&gt;/gi, '');
	EXP = EXP.replace(/&lt;/gi, '<');
	EXP = EXP.replace(/&gt;/gi, '>');
	EXP = EXP.replace(/&quot;/gi, '');
	
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
						sidoSelectBoxHtml += '<option value=' + sidoCd + '>' + $themaMapMainManage.sidoData[sidoCd] + '</option>';
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
						sidoSelectBoxHtml += '<option value=' + sidoCd + '>' + $themaMapMainManage.sidoData[sidoCd] + '</option>';
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
						sidoSelectBoxHtml += '<option value=' + sidoCd + '>' + $themaMapMainManage.sidoData[sidoCd] + '</option>';
						$("#AREA_SET").html(sidoSelectBoxHtml);
					}

				}
				else if (paramData.paramInfo.adm_cd.length > 2) {
					sidoSelectBoxHtml = '<option value="00" selected>전국</option>';
					var sidoCd = paramData.paramInfo.adm_cd.substring(0, 2);
					// 특정 시도
					sidoSelectBoxHtml += '<option value=' + sidoCd + '>' + $themaMapMainManage.sidoData[sidoCd] + '</option>';
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
		
		// 2016. 03. 25 j.h.Seok
//		$themaMapMainManage.loadLogBCd1();
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
	}else if(THEMA_MAP_TYPE == '03'){
		href.location='./../'
	}else if(THEMA_MAP_TYPE == '04'){
		alert("테마4");
	}else if(THEMA_MAP_TYPE == '05'){
		alert("테마5");
	}else if(THEMA_MAP_TYPE == '06'){
		alert("테마6");
	}
}
//click confirm thema Map button
function themaMapConfirm (THEMA_MAP_TYPE, STAT_THEMA_MAP_FILE_URL, STAT_THEMA_MAP_ID) {
	$("#confirmThemaMapPopup").css("display", "block");
	var tbody = $("#confirmThemaMapPopup").find('tbody');
	tbody.empty();
	if (THEMA_MAP_TYPE == '01') {
		// Map
		$themaMapMainManage.getThemaMapParam(STAT_THEMA_MAP_ID.replace(/(^\s*)|(\s*$)/g, ''));
	}
	else if (THEMA_MAP_TYPE == '02') {
		// File
		var tableContent = '<tr><th>통계주제도파일URL</th><td>' + STAT_THEMA_MAP_FILE_URL + '</td></tr>';
		tbody.append(tableContent);
	}
}
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