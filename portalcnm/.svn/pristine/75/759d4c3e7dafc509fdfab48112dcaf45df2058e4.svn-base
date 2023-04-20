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
function popupOpen(orgId,tblId){
	
	var popUrl = "http://kosis.kr/statHtml/statHtml.do?orgId="+orgId+"&tblId="+tblId+"&conn_path=I2";	//팝업창에 출력될 페이지 URL
	var popOption = "width='100%', height='100%', resizable=no, scrollbars=no, status=no;";    //팝업창 옵션(optoin)
		window.open(popUrl,"",popOption);
	}

// 2016. 07. 27 j.h.Seok
var kosis_inst_cd = getParameter("KOSIS_INST_CD");
var kosis_tb_id = getParameter("KOSIS_TB_ID");

var id_datagrid0 = '#searchResultTable0';
var id_datagrid1 = '#searchResultTable1';
var id_datagrid2 = '#searchResultTable2';
var id_datagrid3 = '#searchResultTable3';

(function(W, D){
	var SRV_YN = getParameter('SRV_YN');
	W.$KOSISManage = W.$KOSISManage || {};
	
	$(document).ready(function() {
		// 2016. 07. 27 j.h.Seok
		kosis_inst_cd = decodeURIComponent(kosis_inst_cd);
		kosis_tb_id = decodeURIComponent(kosis_tb_id);
		
		/*var SRV_YN_SEND = 'ALL';
		
		if(SRV_YN != null && SRV_YN != false && SRV_YN != ''){
			$('#SRV_YN').val(SRV_YN);
			if($('#SRV_YN').val() == null){
				$('#SRV_YN').val('ALL');
			}
		}
		*/
		$('#modifyButton').click(function(){
			$KOSISManage.updateKeyword();
		});
		
		$('#addThemaMapButton').click(function(){
			popupOpen();
		});
		
		// 2016. 07. 27 j.h.Seok
		getAllBaseYears();
		
		$('#searchButton').click(function(){	
			var SEARCH_WORD1 = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');
			// 2016. 07. 27 j.h.Seok
			if(SEARCH_WORD1.length >= 1){
				$(id_datagrid0).datagrid('load', getAdmCodeQueryParamsObj(SEARCH_WORD1));
				$(id_datagrid0).datagrid({
					url: contextPath + "/ServiceAPI/DT/KOSISManage/searchSopAdmCode.json"
				});
//				$(id_datagrid2).datagrid('load', getQueryParamsObj(SEARCH_WORD1));
//				$(id_datagrid3).datagrid('load', getQueryParamsObj(SEARCH_WORD1));
			} else{
				return false;
			}
		});
		
		$('#SEARCH_WORD').keydown(function(event){
			if(event.which == 13){
				if($('#confirmPopup').css('display') == 'block' || $('.popupWrapper').css('display') == 'block'){
					return false;
				} else{
					$('#searchButton').click();
					return false;
				}
			}
		});
		
		// 2016. 07. 27 j.h.Seok
		$(id_datagrid0).datagrid({
			loadMsg: '처리중 입니다, 기다리 십시요...',
			pagination: true,
			singleSelect:true,
		   	width: 550,
		    columns:[[ 
		            {field:'BASE_YEAR', title:'년도', align:'center', width:100},
					{field:'ADM_CD', title:'행정동 코드', align:'center', width:100},
					{field:'ADM_NM', title:'행정동 명칭', align:'center', width:250},
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
			onLoadSuccess: function(data){
				console.log(data);
				var total = data.total;
				var pageSize = $(page0).pagination('options').pageSize;
				if(total < 1){
					$('#noSearchResult0').show();
					$(page0).pagination({ 
				        pageSize: 10,
				        displayMsg: '',
				        showPageList: false,
				        showRefresh: false,
				        layout: [],
				        links: 5
					});
				} else{
					$('#noSearchResult0').hide();
					if(Math.ceil(total / pageSize) > 5){
						$(page0).pagination({ 
					        pageSize: 10,
					        displayMsg: '',
					        showPageList: false,
					        showRefresh: false,
					        layout: ['first','prev','links','next','last'],
					        links: 5
						 });
					} else if(Math.ceil(total / pageSize) <= 5){
						$(page0).pagination({ 
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
				$('#noSearchResult0').hide();
				
				if(param.ACTIVE_YN){
					ACTIVE_YN_SEND = param.ACTIVE_YN;
				} else{
					ACTIVE_YN_SEND = 'ALL';
				}
			},
			loadFilter: function(data){
				console.log(data);
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
//			url : contextPath +"/ServiceAPI/DT/KOSISManage/searchSopAdmCode.json"
		});
		
		$(id_datagrid1).datagrid({
			loadMsg: '처리중 입니다, 기다리 십시요...',
			pagination: true,
			singleSelect:true,
		   	width: 550,
			queryParams : getQueryParamsObj(""),
		    columns:[[ 
	            {field:'KOSIS_BASE_YEAR',title:'년도',align:'center',width:100,
	            	formatter: function(value,row,index){
						var kosis_inst_cd = encodeURIComponent((row.KOSIS_INST_CD));
						var kosis_tb_id = encodeURIComponent((row.KOSIS_TB_ID));
						if (value != null && value != ''){
							return "<a onclick='popupOpen(\""+ kosis_inst_cd+"\",\""+kosis_tb_id+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
						} else {
							return value;
						}
					}
	            },
				{field:'KOSIS_SIDO_CD',title:'KOSIS',align:'center',width:100},
				{field:'SIDO_CD', title:'시도코드', align:'center', width:100, editor:'text'},
				{field:'KOSIS_SIDO_NM',title:'시도명',align:'center',width:100},
				{field:'action', title:'수정/삭제',width:80,align:'center',
	                formatter:function(value, row, index){
	                    if (row.editing){
	                        var s = '<a href="javascript:void(0)" onclick="saveSidorow(this)">Save</a> ';
	                        var c = '<a href="javascript:void(0)" onclick="cancelSidorow(this)">Cancel</a>';
	                        return s+c;
	                    } else {
	                        var e = '<a href="javascript:void(0)" onclick="editSidorow(this)">Edit</a> ';
	                        var d = '<a href="javascript:void(0)" onclick="deleteSidorow(this)">Delete</a>';
	                        return e+d;
	                    }
	                }
	            }
		    ]],
		    onEndEdit:function(index,row){
		    	callUpdateKosisCode(row, "sido");
		    	row.editing = false;
	            $(id_datagrid1).datagrid('refreshRow', index);
	        },
	        onBeforeEdit:function(index,row){
	            row.editing = true;
	            $(id_datagrid1).datagrid('refreshRow', index);
	        },
	        onAfterEdit:function(index,row){
	            row.editing = false;
	            $(id_datagrid1).datagrid('refreshRow', index);
	        },
	        onCancelEdit:function(index,row){
	            row.editing = false;
	            $(id_datagrid1).datagrid('refreshRow', index);
	        },
			onLoadError: function(){
				getConfirmPopup('알림', '일시적인 오류로 검색에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			},
			onLoadSuccess: function(data){
//				var total = data.total;
//				var pageSize = $(page1).pagination('options').pageSize;
//				if(total < 1){
//					$('#noSearchResult1').show();
//					$(page1).pagination({ 
//				        pageSize: 10,
//				        displayMsg: '',
//				        showPageList: false,
//				        showRefresh: false,
//				        layout: [],
//				        links: 5
//					});
//				} else{
//					$('#noSearchResult1').hide();
//					if(Math.ceil(total / pageSize) > 5){
//						$(page1).pagination({ 
//					        pageSize: 10,
//					        displayMsg: '',
//					        showPageList: false,
//					        showRefresh: false,
//					        layout: ['first','prev','links','next','last'],
//					        links: 5
//						 });
//					} else if(Math.ceil(total / pageSize) <= 5){
//						$(page1).pagination({ 
//					        pageSize: 10,
//					        displayMsg: '',
//					        showPageList: false,
//					        showRefresh: false,
//					        layout: ['links'],
//					        links: 5
//						 });
//					}
//				}
			},
			onBeforeLoad: function(param){
				$('#noSearchResult1').hide();
				
				if(param.ACTIVE_YN){
					ACTIVE_YN_SEND = param.ACTIVE_YN;
				} else{
					ACTIVE_YN_SEND = 'ALL';
				}
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
			url : contextPath +"/ServiceAPI/DT/KOSISManage/sidoKosis.json"
		});
		
		$(id_datagrid2).datagrid({
			loadMsg: '처리중 입니다, 기다리 십시요...',
			pagination: true,
		   	nowrap: false,
		   	checkOnSelect: false,
		   	width: 550,
			queryParams : getQueryParamsObj(""),
		    columns:[[ 
	            {field:'KOSIS_BASE_YEAR',title:'년도',align:'center',width:100,
	            	formatter: function(value,row,index){
						var kosis_inst_cd = encodeURIComponent((row.KOSIS_INST_CD));
						var kosis_tb_id = encodeURIComponent((row.KOSIS_TB_ID));
						if (value != null && value != ''){
							return "<a onclick='popupOpen(\""+ kosis_inst_cd+"\",\""+kosis_tb_id+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
						} else {
							return value;
						}
					}
	            },
				{field:'KOSIS_SGG_CD',title:'KOSIS',align:'center',width:100},
				{field:'SGG_CD',title:'시구군코드',align:'center',width:100, editor:'text'},
				{field:'KOSIS_SGG_NM',title:'시구군명',align:'center',width:100},
				{field:'action', title:'수정/삭제',width:80,align:'center',
	                formatter:function(value, row, index){
	                    if (row.editing){
	                        var s = '<a href="javascript:void(0)" onclick="saveSggrow(this)">Save</a> ';
	                        var c = '<a href="javascript:void(0)" onclick="cancelSggrow(this)">Cancel</a>';
	                        return s+c;
	                    } else {
	                        var e = '<a href="javascript:void(0)" onclick="editSggrow(this)">Edit</a> ';
	                        var d = '<a href="javascript:void(0)" onclick="deleteSggrow(this)">Delete</a>';
	                        return e+d;
	                    }
	                }
	            }
		    ]],
		    onEndEdit:function(index,row){
		    	callUpdateKosisCode(row, "sgg");
		    	row.editing = false;
	            $(id_datagrid2).datagrid('refreshRow', index);
	        },
	        onBeforeEdit:function(index,row){
	            row.editing = true;
	            $(id_datagrid2).datagrid('refreshRow', index);
	        },
	        onAfterEdit:function(index,row){
	            row.editing = false;
	            $(id_datagrid2).datagrid('refreshRow', index);
	        },
	        onCancelEdit:function(index,row){
	            row.editing = false;
	            $(id_datagrid2).datagrid('refreshRow', index);
	        },
			onLoadError: function(){
				getConfirmPopup('알림', '일시적인 오류로 검색에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			},
			onLoadSuccess: function(data){
//				var total = data.total;
//				var pageSize = $(page2).pagination('options').pageSize;
//				if(total < 1){
//					$('#noSearchResult2').show();
//					$(page2).pagination({ 
//				        pageSize: 10,
//				        displayMsg: '',
//				        showPageList: false,
//				        showRefresh: false,
//				        layout: [],
//				        links: 5
//					});
//				} else{
//					$('#noSearchResult2').hide();
//					if(Math.ceil(total / pageSize) > 5){
//						$(page2).pagination({ 
//					        pageSize: 10,
//					        displayMsg: '',
//					        showPageList: false,
//					        showRefresh: false,
//					        layout: ['first','prev','links','next','last'],
//					        links: 5
//						 });
//					} else if(Math.ceil(total / pageSize) <= 5){
//						$(page2).pagination({ 
//					        pageSize: 10,
//					        displayMsg: '',
//					        showPageList: false,
//					        showRefresh: false,
//					        layout: ['links'],
//					        links: 5
//						 });
//					}
//				}
			},
			onBeforeLoad: function(param){
				$('#noSearchResult2').hide();
				
				if(param.ACTIVE_YN){
					ACTIVE_YN_SEND = param.ACTIVE_YN;
				} else{
					ACTIVE_YN_SEND = 'ALL';
				}
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
			url:contextPath +"/ServiceAPI/DT/KOSISManage/sggKosis.json"
		});
		
		$(id_datagrid3).datagrid({
			loadMsg: '처리중 입니다, 기다리 십시요...',
			pagination: true,
		   	nowrap: false,
		   	checkOnSelect: false,
		   	width: 550,
			queryParams : getQueryParamsObj(""),
		    columns:[[ 
		            {field:'KOSIS_BASE_YEAR',title:'년도',align:'center',width:100,
		            	formatter: function(value,row,index){
							var kosis_inst_cd = encodeURIComponent((row.KOSIS_INST_CD));
							var kosis_tb_id = encodeURIComponent((row.KOSIS_TB_ID));
							if (value != null && value != ''){
								return "<a onclick='popupOpen(\""+ kosis_inst_cd+"\",\""+kosis_tb_id+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
							} else {
								return value;
							}
						}		
		            },
					{field:'KOSIS_EMDONG_CD',title:'KOSIS',align:'center',width:100},
					{field:'EMDONG_CD',title:'읍면동코드',align:'center',width:100,editor:'text'},
					{field:'KOSIS_EMDONG_NM',title:'읍면동명',align:'center',width:100},
					{field:'action', title:'수정/삭제',width:80,align:'center',
		                formatter:function(value, row, index){
		                    if (row.editing){
		                        var s = '<a href="javascript:void(0)" onclick="saveAdmrow(this)">Save</a> ';
		                        var c = '<a href="javascript:void(0)" onclick="cancelAdmrow(this)">Cancel</a>';
		                        return s+c;
		                    } else {
		                        var e = '<a href="javascript:void(0)" onclick="editAdmrow(this)">Edit</a> ';
		                        var d = '<a href="javascript:void(0)" onclick="deleteAdmrow(this)">Delete</a>';
		                        return e+d;
		                    }
		                }
		            }
		    ]],
		    onEndEdit:function(index,row){
		    	callUpdateKosisCode(row, "emdong");
		    	row.editing = false;
	            $(id_datagrid3).datagrid('refreshRow', index);
	        },
	        onBeforeEdit:function(index,row){
	            row.editing = true;
	            $(id_datagrid3).datagrid('refreshRow', index);
	        },
	        onAfterEdit:function(index,row){
	            row.editing = false;
	            $(id_datagrid3).datagrid('refreshRow', index);
	        },
	        onCancelEdit:function(index,row){
	            row.editing = false;
	            $(id_datagrid3).datagrid('refreshRow', index);
	        },
			onLoadError: function(){
				getConfirmPopup('알림', '일시적인 오류로 검색에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			},
			onLoadSuccess: function(data){
//				var total = data.total;
//				var pageSize = $(page3).pagination('options').pageSize;
//				if(total < 1){
//					$('#noSearchResult3').show();
//					$(page3).pagination({ 
//				        pageSize: 10,
//				        displayMsg: '',
//				        showPageList: false,
//				        showRefresh: false,
//				        layout: [],
//				        links: 5
//					});
//				} else{
//					$('#noSearchResult3').hide();
//					if(Math.ceil(total / pageSize) > 5){
//						$(page3).pagination({ 
//					        pageSize: 10,
//					        displayMsg: '',
//					        showPageList: false,
//					        showRefresh: false,
//					        layout: ['first','prev','links','next','last'],
//					        links: 5
//						 });
//					} else if(Math.ceil(total / pageSize) <= 5){
//						$(page3).pagination({ 
//					        pageSize: 10,
//					        displayMsg: '',
//					        showPageList: false,
//					        showRefresh: false,
//					        layout: ['links'],
//					        links: 5
//						 });
//					}
//				}
			},
			onBeforeLoad: function(param){
				$('#noSearchResult3').hide();
				
				if(param.ACTIVE_YN){
					ACTIVE_YN_SEND = param.ACTIVE_YN;
				} else{
					ACTIVE_YN_SEND = 'ALL';
				}
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
			url:contextPath +"/ServiceAPI/DT/KOSISManage/admKosis.json"
		});
		
//		var page0 = $(id_datagrid0).datagrid('getPager');  
//		$(page0).pagination({ 
//	        pageSize: 20,
//	        displayMsg: '',
//	        showPageList: false,
//	        showRefresh: false,
//	        layout: [],
//	        links: 5
//		});
//		
//		var page1 = $(id_datagrid1).datagrid('getPager');  
//		$(page1).pagination({ 
//	        pageSize: 20,
//	        displayMsg: '',
//	        showPageList: false,
//	        showRefresh: false,
//	        layout: [],
//	        links: 5
//		});
//		
//		var page2 = $(id_datagrid2).datagrid('getPager');  
//		$(page2).pagination({ 
//	        pageSize: 20,
//	        displayMsg: '',
//	        showPageList: false,
//	        showRefresh: false,
//	        layout: [],
//	        links: 5
//		});
//		
//		var page3 = $(id_datagrid3).datagrid('getPager');  
//		$(page3).pagination({ 
//	        pageSize: 20,
//	        displayMsg: '',
//	        showPageList: false,
//	        showRefresh: false,
//	        layout: [],
//	        links: 5
//		});
		
		if(kosis_inst_cd != null || kosis_tb_id != null) {
			$(id_datagrid1).datagrid('load', getQueryParamsObj(""));
			$(id_datagrid2).datagrid('load', getQueryParamsObj(""));
			$(id_datagrid3).datagrid('load', getQueryParamsObj(""));
		}
	})
}(window, document));

// 2016. 07. 27 j.h.Seok
var prevSidoCd = "";
var prevSggCd = "";
var prevAdmCd = "";

function getSidoRowIndex(target){
    var tr = $(target).closest('tr.datagrid-row');
    return parseInt(tr.attr('datagrid-row-index'));
}
function editSidorow(target){
	var tempObj = $(id_datagrid1).datagrid('getRows')[getSidoRowIndex(target)];
	prevSidoCd = tempObj.SIDO_CD;
    $(id_datagrid1).datagrid('beginEdit', getSidoRowIndex(target));
}
function deleteSidorow(target){
    $.messager.confirm('확인','삭제 하시겠습니까?',function(r){
        if (r){
        	var tempObj = $(id_datagrid1).datagrid('getRows')[getSidoRowIndex(target)];
        	callDeleteKosisCode(tempObj, "sido");
//            $(id_datagrid1).datagrid('deleteRow', getSidoRowIndex(target));
        }
    });
}
function saveSidorow(target){
	console.log($(id_datagrid1).datagrid('getRows')[getSidoRowIndex(target)]);
	$(id_datagrid1).datagrid('endEdit', getSidoRowIndex(target));
}
function cancelSidorow(target){
	prevSidoCd = "";
    $(id_datagrid1).datagrid('cancelEdit', getSidoRowIndex(target));
}

function getSggRowIndex(target){
    var tr = $(target).closest('tr.datagrid-row');
    return parseInt(tr.attr('datagrid-row-index'));
}
function editSggrow(target){
	var tempObj = $(id_datagrid2).datagrid('getRows')[getSggRowIndex(target)];
	prevSggCd = tempObj.SGG_CD;
    $(id_datagrid2).datagrid('beginEdit', getSggRowIndex(target));
}
function deleteSggrow(target){
	console.log($(id_datagrid2).datagrid('getRows')[getSggRowIndex(target)]);
    $.messager.confirm('Confirm','Are you sure?',function(r){
        if (r){
        	var tempObj = $(id_datagrid2).datagrid('getRows')[getSggRowIndex(target)];
        	callDeleteKosisCode(tempObj, "sgg");
//            $(id_datagrid2).datagrid('deleteRow', getSggRowIndex(target));
        }
    });
}
function saveSggrow(target){
	console.log($(id_datagrid2).datagrid('getRows')[getSggRowIndex(target)]);
    $(id_datagrid2).datagrid('endEdit', getSggRowIndex(target));
}
function cancelSggrow(target){
	prevSggCd = "";
    $(id_datagrid2).datagrid('cancelEdit', getSggRowIndex(target));
}

function getAdmRowIndex(target){
    var tr = $(target).closest('tr.datagrid-row');
    return parseInt(tr.attr('datagrid-row-index'));
}
function editAdmrow(target){
	var tempObj = $(id_datagrid3).datagrid('getRows')[getAdmRowIndex(target)];
	prevAdmCd = tempObj.EMDONG_CD;
    $(id_datagrid3).datagrid('beginEdit', getAdmRowIndex(target));
}
function deleteAdmrow(target){
	console.log($(id_datagrid3).datagrid('getRows')[getAdmRowIndex(target)]);
    $.messager.confirm('Confirm','Are you sure?',function(r){
        if (r){
        	var tempObj = $(id_datagrid3).datagrid('getRows')[getAdmRowIndex(target)];
        	callDeleteKosisCode(tempObj, "emdong");
//            $(id_datagrid3).datagrid('deleteRow', getAdmRowIndex(target));
        }
    });
}
function saveAdmrow(target){
	console.log($(id_datagrid3).datagrid('getRows')[getAdmRowIndex(target)]);
    $(id_datagrid3).datagrid('endEdit', getAdmRowIndex(target));
}
function cancelAdmrow(target){
	prevAdmCd = "";
    $(id_datagrid3).datagrid('cancelEdit', getAdmRowIndex(target));
}


function callDeleteKosisCode(tempObj, areaType) {
	var deleteKosisCode = new sop.serviceApi.deleteKosisCode.api();
	deleteKosisCode.addParam("kosis_inst_cd", tempObj.KOSIS_INST_CD);
	deleteKosisCode.addParam("kosis_tb_id", tempObj.KOSIS_TB_ID);
	deleteKosisCode.addParam("kosis_base_year", tempObj.KOSIS_BASE_YEAR);
	
	if(areaType == "sido") {
		deleteKosisCode.addParam("kosis_cd", tempObj.KOSIS_SIDO_CD);
		deleteKosisCode.addParam("sop_cd", tempObj.SIDO_CD);
	} else if(areaType == "sgg") {
		deleteKosisCode.addParam("kosis_cd", tempObj.KOSIS_SGG_CD);
		deleteKosisCode.addParam("sop_cd", tempObj.SGG_CD);
	} else {
		deleteKosisCode.addParam("kosis_cd", tempObj.KOSIS_EMDONG_CD);
		deleteKosisCode.addParam("sop_cd", tempObj.EMDONG_CD);
	}
	
	deleteKosisCode.request({
		method : "POST",
		async : true,
		url : contextPath + "/ServiceAPI/DT/KOSISManage/deleteKosisCode.json"
	});
}

function callUpdateKosisCode(tempObj, areaType) {
	var sopCd = tempObj.SIDO_CD;
	console.log(sopCd.length);
	
	if(sopCd.length < 2 || sopCd.length > 7) {
		getConfirmPopup('알림', "행정동 코드를 확인해 주세요", 'alert');
		$('#ok_alertPopup').click(function(){
			confirmPopupRemove();
		});
		
		$('#close_confirmPopup').click(function(){
			confirmPopupRemove();
		});
		
		return;
	}
	
	var updateKosisCode = new sop.serviceApi.updateKosisCode.api();
	updateKosisCode.addParam("kosis_inst_cd", tempObj.KOSIS_INST_CD);
	updateKosisCode.addParam("kosis_tb_id", tempObj.KOSIS_TB_ID);
	updateKosisCode.addParam("kosis_base_year", tempObj.KOSIS_BASE_YEAR);
	
	if(areaType == "sido") {
		updateKosisCode.addParam("kosis_cd", tempObj.KOSIS_SIDO_CD);
		updateKosisCode.addParam("kosis_nm", tempObj.KOSIS_SIDO_NM);
		updateKosisCode.addParam("prev_sop_cd", prevSidoCd);
		updateKosisCode.addParam("sop_cd", tempObj.SIDO_CD);
	} else if(areaType == "sgg") {
		updateKosisCode.addParam("kosis_cd", tempObj.KOSIS_SGG_CD);
		updateKosisCode.addParam("kosis_nm", tempObj.KOSIS_SGG_NM);
		updateKosisCode.addParam("prev_sop_cd", prevSggCd);
		updateKosisCode.addParam("sop_cd", tempObj.SGG_CD);
	} else {
		updateKosisCode.addParam("kosis_cd", tempObj.KOSIS_EMDONG_CD);
		updateKosisCode.addParam("kosis_nm", tempObj.KOSIS_EMDONG_NM);
		updateKosisCode.addParam("prev_sop_cd", prevAdmCd);
		updateKosisCode.addParam("sop_cd", tempObj.EMDONG_CD);
	}
	
	updateKosisCode.request({
		method : "POST",
		async : true,
		url : contextPath + "/ServiceAPI/DT/KOSISManage/updateKosisCode.json"
	});
}


function getAdmCodeQueryParamsObj(SEARCH_WORD){	
	var queryParamsObj = new Object();
	if(SEARCH_WORD.length >= 1){
		queryParamsObj['search_word'] = SEARCH_WORD;
	}
	
	var selectAreaType = $("#adm_area_type option:selected").val();
	if(selectAreaType != null && selectAreaType != undefined) {
		queryParamsObj['area_type'] = selectAreaType;
	} else {
		queryParamsObj['area_type'] = "sido";
	}
	
	return queryParamsObj;
}

function getQueryParamsObj(SEARCH_WORD){	
	
	var queryParamsObj = new Object();
	if(SEARCH_WORD.length >= 1 && SEARCH_WORD != "all"){
		queryParamsObj['SEARCH_WORD1'] = SEARCH_WORD;
	}
	
	if(kosis_inst_cd != null && kosis_inst_cd.length > 1) {
		queryParamsObj['KOSIS_INST_CD'] = kosis_inst_cd;
	}
	
	if(kosis_tb_id != null && kosis_tb_id.length > 1) {
		queryParamsObj['KOSIS_TB_ID'] = kosis_tb_id;
	}
	
	return queryParamsObj;
}

function getAllBaseYears() {
	var allBaseYears = new kosis.serviceApi.getAllBaseYears.api();
	if(kosis_inst_cd != null && kosis_inst_cd.length > 1) {
		allBaseYears.addParam("KOSIS_INST_CD", kosis_inst_cd);
	}
	
	if(kosis_tb_id != null && kosis_tb_id.length > 1) {
		allBaseYears.addParam("KOSIS_TB_ID", kosis_tb_id);
	}
	allBaseYears.request({
		method : "POST",
		async : true,
		url : contextPath + "/ServiceAPI/DT/KOSISManage/allBaseYears.json"
	});
}

function setAllBaseYears(obj) {
	console.log(obj);
	
	$("#base_year_select").find("option").remove();
	$("#base_year_select").append("<option value='all'>전체</option>");
	$("#base_year_select option:eq(0)").attr("selected", "selected");

	for(var i = 0; i < obj.length; i++) {
		var value = obj[i].KOSIS_BASE_YEAR;
		$("#base_year_select").append("<option value='" + value + "'>" + value + "</option>");
	}
	
	$("#base_year_select").change(function() {
		reloadAllMapiingCodes();
	});
}

function reloadAllMapiingCodes() {
	var selectYear = $("#base_year_select option:selected").val();
	$(id_datagrid1).datagrid('load', getQueryParamsObj(selectYear));
	$(id_datagrid2).datagrid('load', getQueryParamsObj(selectYear));
	$(id_datagrid3).datagrid('load', getQueryParamsObj(selectYear));
}

// 2016. 07. 27 j.h.Seok
(function() {
	$class("kosis.serviceApi.getAllBaseYears.api").extend(sop.cnm.absAPI).define({
		onSuccess : function(status, res) {
			var result = res.result;
			if(res.errCd == "0") {
				console.log(result.result);
				setAllBaseYears(result.result);
			} else {
				getConfirmPopup('알림', result.msg, 'alert');
 				$('#ok_alertPopup').click(function(){
 					confirmPopupRemove();
 				});
 				
 				$('#close_confirmPopup').click(function(){
 					confirmPopupRemove();
 				});
			}
		},
		onFail : function(status) {
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
	$class("sop.serviceApi.deleteKosisCode.api").extend(sop.cnm.absAPI).define({
		onSuccess : function(status, res) {
			var result = res.result;
			console.log(res);
			if(res.errCd == "0") {
				if(result.success == true){
					$('body,html').scrollTop(0);
        			getConfirmPopup('알림', result.msg, 'alert');
     				$('#ok_alertPopup').click(function(){
     					$(".popupWrapper").css("display","none"); 
     					confirmPopupRemove();
     					reloadAllMapiingCodes();
     				});
     				$('#close_confirmPopup').click(function(){
     					$(".popupWrapper").css("display","none");
     					confirmPopupRemove();
     					reloadAllMapiingCodes();
     				});
     				
        		} else{
        			getConfirmPopup('알림', result.msg, 'alert');
     				$('#ok_alertPopup').click(function(){
     					confirmPopupRemove();
     				});
     				$('#close_confirmPopup').click(function(){
     					confirmPopupRemove();
     				});
        		}
			} else {
				getConfirmPopup('알림', result.msg, 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			}
		},
		onFail : function(status) {
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
	$class("sop.serviceApi.updateKosisCode.api").extend(sop.cnm.absAPI).define({
		onSuccess : function(status, res) {
			var result = res.result;
			console.log(res);
			if(res.errCd == "0") {
				if(result.success == true){
					
					// 매핑 작업의 편의를 위하여 주석처리 20170103 김준하
					//$('body,html').scrollTop(0);
					//getConfirmPopup('알림', result.msg, 'alert');
					// 매핑 작업의 편의를 위하여 주석처리 20170103 김준하
					
					$('#ok_alertPopup').click(function(){
     					$(".popupWrapper").css("display","none"); 
     					confirmPopupRemove();
     					reloadAllMapiingCodes();
     				});
     				$('#close_confirmPopup').click(function(){
     					$(".popupWrapper").css("display","none");
     					confirmPopupRemove();
     					reloadAllMapiingCodes();
     				});
     				
        		} else{
        			getConfirmPopup('알림', result.msg, 'alert');
     				$('#ok_alertPopup').click(function(){
     					confirmPopupRemove();
     				});
     				$('#close_confirmPopup').click(function(){
     					confirmPopupRemove();
     				});
        		}
			} else {
				getConfirmPopup('알림', result.msg, 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			}
		},
		onFail : function(status) {
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
    $class("sop.openApi.validateKeyword.api").extend(sop.cnm.absAPI).define({
    	onSuccess : function(status, res) {
        	var result = res.result;
            if(res.errCd == "0") { 
            	if(result != null){
            		if(result.success == true){
            			getConfirmPopup('알림', result.msg, 'alert');
        				$('#ok_alertPopup').click(function(){
        					confirmPopupRemove();
        				});
        				$('#close_confirmPopup').click(function(){
        					confirmPopupRemove();
        				});
        				//add REL popup
        				$('#addButtonDisabled').hide();
        				$('#modifyButtonDisabled').hide();
        				$('#modifyButton').hide();
        				$('#addButton').show();
            			$('#assocWordAdd0').focus();
            		} else {
            			getConfirmPopup('알림', '입력하신 검색어는 중복입니다. 다시 입력하세요.', 'alert');
        				$('#ok_alertPopup').click(function(){
        					confirmPopupRemove();
        				});
        				$('#close_confirmPopup').click(function(){
        					confirmPopupRemove();
        				});
        				$('#keywordAdd').focus();
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
            getConfirmPopup('알림', '일시적인 오류로 검색에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
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
    $class("sop.openApi.updateKeyword.api").extend(sop.cnm.absAPI).define({
    	onSuccess : function(status, res) {
        	var result = res.result;
            if(res.errCd == "0") { 
            	if(result != null){
            		if(result.success == true){
            			getConfirmPopup('알림', result.msg, 'alert');
         				$('#ok_alertPopup').click(function(){
         					$(".popupWrapper").css("display","none"); 
         					confirmPopupRemove();
         				});
         				$('#close_confirmPopup').click(function(){
         					$(".popupWrapper").css("display","none");
         					confirmPopupRemove();
         				});
         				
            		} else{
            			getConfirmPopup('알림', result.msg, 'alert');
         				$('#ok_alertPopup').click(function(){
         					confirmPopupRemove();
         				});
         				$('#close_confirmPopup').click(function(){
         					confirmPopupRemove();
         				});
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

$KOSISManage = {
		validateKeyword : function(){
			var sopOpenApiValidateKeywordObj = new sop.openApi.validateKeyword.api();
			if($('#SEARCH_WORD').val().length >=2){
				sopOpenApiValidateKeywordObj.addParam('SEARCH_WORD1',$('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, ''));
			}
			alert($('#SEARCH_WORD').val());
			sopOpenApiValidateKeywordObj.request({
		        method : "POST",
		        async : false,
		        url : contextPath +"/ServiceAPI/DT/KOSISManage/sidoKosis.json"
		    });
		},
		updateKeyword : function(){
			var sopOpenApiupDateKeywordObj = new sop.openApi.updateKeyword.api();
			sopOpenApiupDateKeywordObj.addParam('SRV_YN',$('#SRV_YN1').val());
			sopOpenApiupDateKeywordObj.addParam('MENU_ID',$('#menu_id').val());
			sopOpenApiupDateKeywordObj.request({
		        method : "POST",
		        async : false,
		        url : contextPath +"/ServiceAPI/DT/KOSISManage/updateKosis.json"
		    });
		}
};

//extend validation of easyUI
$.extend($.fn.validatebox.defaults.rules, {
	//validate associated-words
	assocWord : {
		validator : function(value) {
			if (value.indexOf(" ") >=0)
			return false;
			return true;
		},
		//cannot contain spaces
		message : '공백을 제거하고'
	},
	assocWordPiper : {
		validator : function(value) {
			if (value.indexOf("|") >=0)
			return false;
			return true;
		},
		//cannot contain |
		message : "연관어에 '|'는  안됨."
	},
	assocWordDot: {
		validator : function(value) {
			if (value.charAt(0)==","||value.charAt(0)=="，")
			return false;
			if (value.charAt(value.length-1)==","||value.charAt(value.length-1)=="，")
			return false;
			return true;
		},
		//cannot start or end with ","
		message : "단어의 시작과 끝은 ','로 안됨."
	},
	assocWordQuantity: {
		validator : function(value) {
			var temp=value.split(',');
			if (temp.length<=5&&temp.length>=2)
			return true;
			return false;
		},
		//length 2-5, connect with ","
		message : "단어의 구분은 ','로, 최대 5단어, 최소 2단어 이상."
	},
	assocWordRepeat: {
		validator : function(value) {
			var temp=value.split(',');
			for(var i =0;i<temp.length;i++)
			{
				for(var a=i+1;a<temp.length;a++)
				{
					if(temp[i]==temp[a])
					{
						return false;
					}
				}
			}
			return true;
		},
		//cannot be repeat
		message : "입력하신 단어는 중복입니다."
	},
}); 

function openModifyPopup(SEARCH_WORD, REL_SEARCH_WORD){
	SEARCH_WORD = decodeURIComponent(SEARCH_WORD);
	REL_SEARCH_WORD = decodeURIComponent(REL_SEARCH_WORD);	
		
	$('#validateTd').hide();
	$('#validateButton').hide();
	$('#addButton').hide();
	$('#addButtonDisabled').hide();
	$('#modifyButtonDisabled').hide();
	$('#modifyButton').show();
	$('#popTitle').text('수정');
	document.getElementById('popupForm').reset();
	$('.popupWrapper').css('display','block');
	$('#keywordAdd').focus();
	$('#assocWordAdd0').focus();
	$('#keywordAdd').focus();
	$('#SRV_YN1').show();
	$('#SRV_YN1').val(SEARCH_WORD);
	$('#menu_id').val(REL_SEARCH_WORD)
	//$('#assocWordAdd0').html(REL_SEARCH_WORD);
	//$('#assocWordAdd0').val($('#assocWordAdd0').text());
}