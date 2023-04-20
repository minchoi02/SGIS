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
function popupOpen(checkedRows){
	var kosisInstCd = "";
	var kosisTbId = "";
	
	for(var i = 0; i < checkedRows.length; i++) {
		if(i == 0) {
			kosisInstCd += "(\'" + checkedRows[i].KOSIS_INST_CD + "\'";
			kosisTbId += "(\'" + checkedRows[i].KOSIS_MENU_ID + "\'";
			
			if(checkedRows.length == 1) {
				kosisInstCd += ")";
				kosisTbId += ")";
			}
		} else if(i == (checkedRows.length - 1)) {
			kosisInstCd += ", \'" + checkedRows[i].KOSIS_INST_CD + "\')";
			kosisTbId += ", \'" + checkedRows[i].KOSIS_MENU_ID + "\')";
		} else {
			kosisInstCd += ", \'" + checkedRows[i].KOSIS_INST_CD + "\'";
			kosisTbId += ", \'" + checkedRows[i].KOSIS_MENU_ID + "\'";
		}
	}
	
	var popUrl = "KOSISMapping.html?KOSIS_INST_CD=" + kosisInstCd + "&KOSIS_TB_ID=" + kosisTbId;	//팝업창에 출력될 페이지 URL
	var popOption = "width=555px, height=550px, resizable=no, scrollbars=yes, status=no";    //팝업창 옵션(optoin)
	window.open(popUrl, "", popOption);
}

(function(W, D){
	var SRV_YN = getParameter('SRV_YN');
	W.$KOSISManage = W.$KOSISManage || {};
	var id_datagrid = '#searchResultTable';
	$(document).ready(function() {
		/*var SRV_YN_SEND = 'ALL';
		
		if(SRV_YN != null && SRV_YN != false && SRV_YN != ''){
			$('#SRV_YN').val(SRV_YN);
			if($('#SRV_YN').val() == null){
				$('#SRV_YN').val('ALL');
			}
		}
		*/
		
		
		srvLogWrite("L0", "03", "04", "01", "", "");
		
		
		$(document).keydown(function(event){
			if(event.which == 13){
				if($('#confirmPopup').css('display') == 'block' || $('.popupWrapper').css('display') == 'block'){
					return false;
				} else{
					var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');
					if(SEARCH_WORD.length >=2){
						$('#searchButton').click();
						return false;
					}else if(SEARCH_WORD.length ==0){
						$('#searchButton').click();
					}else{
						return false;
					}
				}
				/*var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');	
				var SRV_YN = $('#SRV_YN').val();
				$(id_datagrid).datagrid('load',getQueryParamsObj1(SEARCH_WORD, SRV_YN));*/
			}
		});
		
		$("#errorButton").click(function(){
			srvLogWrite("L0", "03", "04", "02", "", "");
			location.href = './../DT/KOSISError.html';
		});
		
		$('#modifyButton').click(function(){
			srvLogWrite("L0", "03", "04", "03", "", "");
			$KOSISManage.updateKeyword();
		});
		
		$('#addThemaMapButton').click(function(){
			var checkedRows = $(id_datagrid).datagrid('getChecked');
			popupOpen(checkedRows);
		});
		
		$('#searchButton').click(function(){
			srvLogWrite("L0", "03", "04", "01", "", "");
			var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');	
			var SRV_YN = $('#SRV_YN').val();
			if(SEARCH_WORD.length>=2){
				$(id_datagrid).datagrid('load',getQueryParamsObj1(SEARCH_WORD, SRV_YN));
			}else if(SEARCH_WORD.length ==0){
				$(id_datagrid).datagrid('load',getQueryParamsObj1(SEARCH_WORD, SRV_YN));
			}
		});
		
		$(id_datagrid).datagrid({
			loadMsg: '처리중 입니다, 기다리 십시요...',
			pagination: true,
		   	nowrap: false,
		   	checkOnSelect: false,
		    columns:[[ 
		        {field:'SRV_ID',hidden: true},
		        {field:'checkbox',checkbox: true},
		        {field:'MENU_PATH',title:'메뉴경로',align:'center',width:180,
					formatter: function(value,row,index){
						var SEARCH_WORD = encodeURIComponent((row.SRV_YN));
						var REL_SEARCH_WORD = encodeURIComponent((row.KOSIS_MENU_ID));
						if (value != null && value != ''){
							return "<a onclick='openModifyPopup(\""+ SEARCH_WORD+"\",\""+REL_SEARCH_WORD+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
						} else {
							return value;
						}
					}
				},
				{field:'KOSIS_MENU_ID',title:'메뉴아이디',align:'center',width:100},
				{field:'KOSIS_MENU_NM',title:'메뉴명',align:'center',width:155},
				{field:'KOSIS_INST_NM',title:'기관명',align:'center',width:70},
				{field:'GIS_SE',title:'GIS_SE',align:'center',width:70},
				{field:'SRV_YN',title:'서비스여부',align:'center',width:70,
					formatter:function(value, row, index){
						// 2016. 03. 29 j.h.Seok
						if(value != null && value == 'Y'){
							value="활성";
							var SEARCH_WORD = encodeURIComponent((row.SRV_YN));
							var REL_SEARCH_WORD = encodeURIComponent((row.KOSIS_MENU_ID));
							if (value != null && value != ''){
								return "<a onclick='openModifyPopup(\""+ SEARCH_WORD+"\",\""+REL_SEARCH_WORD+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
							} else {
								return value;
							}
						} else if(value != null && value == 'A'){
							value="신규";
							var SEARCH_WORD = encodeURIComponent((row.SRV_YN));
							var REL_SEARCH_WORD = encodeURIComponent((row.KOSIS_MENU_ID));
							if (value != null && value != ''){
								return "<a onclick='openModifyPopup(\""+ SEARCH_WORD+"\",\""+REL_SEARCH_WORD+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
							} else {
								return value;
							}
						} else if(value != null && value == 'U'){
							value="비매핑";
							var SEARCH_WORD = encodeURIComponent((row.SRV_YN));
							var REL_SEARCH_WORD = encodeURIComponent((row.KOSIS_MENU_ID));
							if (value != null && value != ''){
								return "<a onclick='openModifyPopup(\""+ SEARCH_WORD+"\",\""+REL_SEARCH_WORD+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
							} else {
								return value;
							}
						} else{
							value="비활성";
							var SEARCH_WORD = encodeURIComponent((row.SRV_YN));
							var REL_SEARCH_WORD = encodeURIComponent((row.KOSIS_MENU_ID));
							if (value != null && value != ''){
								return "<a onclick='openModifyPopup(\""+ SEARCH_WORD+"\",\""+REL_SEARCH_WORD+"\")' style='color:#4a4a4a;cursor:pointer' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
							} else {
								return value;
							}
						}
						return value;
					}},
					{field:'ATDRC_YN',title:'자치구여부',align:'center',width:70}
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
				var total = data.total;
				$("#totalCnt").html(" &nbsp;&nbsp;&nbsp;&nbsp;전체 : <font color='red'>" + total + "</font>건");
				var pageSize = $(page).pagination('options').pageSize;
				if(total < 1){
					$('#noSearchResult').show();
					$(page).pagination({ 
				        pageSize: 10,
				        displayMsg: '',
				        showPageList: false,
				        showRefresh: false,
				        layout: [],
				        links: 5
					});
				} else{
					$('#noSearchResult').hide();
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
			onBeforeLoad: function(param){
				$('#noSearchResult').hide();
				
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
			url:contextPath +"/ServiceAPI/DT/KOSISManage/searchKosis.json"
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
		         				$(id_datagrid).datagrid('reload');
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
					sopOpenApiValidateKeywordObj.addParam('SEARCH_WORD',$('#keywordAdd').val().replace(/(^\s*)|(\s*$)/g, ''));
					sopOpenApiValidateKeywordObj.addParam('SRV_YN', $('#SRV_YN').vall());
					sopOpenApiValidateKeywordObj.request({
				        method : "POST",
				        async : false,
				        url : contextPath +"/ServiceAPI/DT/KOSISManage/searchKosis.json"
				    });
				},updateKeyword : function(){
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
	})
}(window, document));

function getQueryParamsObj1(SEARCH_WORD,SRV_YN){	
	var queryParamsObj = new Object();
	if(SEARCH_WORD.length >= 2){
		queryParamsObj['SEARCH_WORD'] = SEARCH_WORD;
	}
	
	if(SRV_YN=='Y')
		queryParamsObj['SRV_YN'] = SRV_YN;
	else if(SRV_YN=='N')
		queryParamsObj['SRV_YN'] = SRV_YN;
	else if(SRV_YN=='A')
		queryParamsObj['SRV_YN'] = SRV_YN;
	else if(SRV_YN=='U')
		queryParamsObj['SRV_YN'] = SRV_YN;
	// 2016. 03. 25 j.h.Seok
	// 2016. 07. 28 j.h.Seok
	return queryParamsObj;
}

function getQueryParamsObj(SEARCH_WORD){	
	var queryParamsObj = new Object();
	if(SEARCH_WORD.length >= 2){
		queryParamsObj['SEARCH_WORD'] = SEARCH_WORD;
	}
	return queryParamsObj;
}


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
	srvLogWrite("L0", "03", "04", "04", "", "");
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