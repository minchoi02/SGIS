/**
 * 
 * @JSName: manager
 * @Description: modify by liudandan 2014/11/17/ 17:00:00
 * 
 * @author: chenzhanchao
 * @date: 2014/10/28/ 01:30:00
 * @version V1.0
 * 
 */
(function(W, D) {
	W.$manager = W.$manager || {};
	// id of datagrid
	var id_datagrid = '#searchResultTable';
	$(document).ready(function(){
		srvLogWrite("L0", "06", "02", "01", "", "");
		$('#keywordInput').val('');
		$('#noSearchResult').hide();
		// click the search button
		$('#searchButton').click(function(){
			srvLogWrite("L0", "06", "02", "01", "", "");
			if($('#keywordInput').validatebox('isValid')){
				$(id_datagrid).datagrid('load', getQueryParamsObj());
			}
		});
		// click the modify button on the pupop page
		 $('#modifyButton').click(function(){
			getConfirmPopup('확인', '수정하시겠습니까?', 'confirm');
			$('#ok_confirmPopup').click(function(){
				$manager.updateManagerInfo();
				confirmPopupRemove();
			});
			$('#cancel_confirmPopup').click(function(){
				confirmPopupRemove();
			});
			$('#close_confirmPopup').click(function(){
				confirmPopupRemove();
			});
		 });
		// click the cancel button on the pupop page
		 $('#cancelButton').click(function(){
			 $('.popupWrapper').css('display','none'); 
		 });
		 $('#keywordInput').validatebox({
			 required: false,
			 validType:['cnmInput']
		 });
		 // search result
		$(id_datagrid).datagrid({
			loadMsg: '처리중 입니다, 기다리 십시요...',
			pagination: true,
		   	nowrap: false,
		   	singleSelect: true,
		   	sortName:'LAST_ACCESS_TS',
			sortOrder:'desc',
		    columns:[[ 
              	{field:'MANAGER_ID',hidden:true}, 
              	{field:'EXT_NO',hidden:true},
		        {field:'R',title:'번호',align:'center',width:50},
		        {field:'MANAGER_NM',title:'성명',align:'center',width:118,sortable:true,order:'desc',
		        	formatter: function(value, row, index){
		        		if(value != null && value != ''){
		        			if(value.length > 1){
		        				value = value.substr(0, 1) + '*' + value.substr(2);
		        			}
		        			value ="<a style='color:#4a4a4a;cursor:pointer' onclick='$manager.getManagerInfo(\""+row.MANAGER_ID+"\")' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
		        			return value;
		        		}
					}
		        },    
		        {field:'DEPT',title:'부서 ',align:'center',width:228,sortable:true,order:'desc'},
		        {field:'TEL_NO',title:'전화번호',align:'center',width:200},
		        {field:'MANAGER_GRADE',title:'권한 상태',align:'center',width:149,sortable:true,order:'desc',
		        	formatter: function(value, row, index){
		        		if(value != null && value != ''){
		        			if(value == 'SA'){
		        				value = '슈퍼관리자';
		        			} else if(value =='MA'){
		        				value = '중간관리자';
		    				} else if(value =='GA'){
		    					value = '일반관리자';
		    				} else if(value =='NN'){
		    					value = '승인대기관리자';
		    				}
							return value;
		        		}
					}
		        }
		    ]],
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
				$('#totalQueryCount').text(' ' + data.total);
				var total = data.total;
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
					        layout: ['first', 'prev', 'links', 'next', 'last'],
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
			url:contextPath +"/ServiceAPI/MB/MANAGER/searchManager.json"
		});
		var page = $(id_datagrid).datagrid('getPager');  
		 $(page).pagination({ 
		        pageSize: 10,
		        displayMsg: '',
		        showPageList: false,
		        showRefresh: false,
		        layout: [],
		        links: 5
		 });
	});
	// press the 'enter' key
	$(document).keydown(function(event){
		if(event.which == 13){
			if($('.popupWrapper').css('display') == 'block' || $('#confirmPopup').css('display') == 'block'){
				return false;
			} else{
				$('#searchButton').click();
				return false;
			}
		}
	});
	$manager = {
			getSession : function() {
				var sopOpenApiGetSessionObj = new sop.openApi.getSession.api();
				sopOpenApiGetSessionObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/auth/getSession.json"
			    });
			},
			getManagerInfo : function(MANAGER_ID) {
				srvLogWrite("L0", "06", "02", "02", "", "");
				$('#managerId').val('');
        		$('#managerNm').text('');
        		$('#email').val('');
        		$('#managerGrade').val('');
        		$('#dept').val('');
        		$('#TEL_NO0').val('');
        		$('#TEL_NO1').val('');
        		$('#TEL_NO2').val('');
        		$('#jobPos').val('');
        		$('#cpNo').val('');
        		$('#cpNo1').val('');
        		$('#cpNo2').val('');
        		$('#extNo').val('');
        		$('#lastAccessTs').text('');
        		$('#lastLogoutTs').text('');
        		$('#lastAccessIp').text('');
				$('#loginHistoryTab').empty();
				$('#managerGrade').attr('disabled', true);
        		$('#modifyButtonDisabled').show();
    			$('#modifyButton').hide();
    			$('.popupWrapper').css('display','block');
				var sopOpenApiGetManagerInfoObj = new sop.openApi.getManagerInfo.api();
				sopOpenApiGetManagerInfoObj.addParam('MANAGER_ID', MANAGER_ID);
				sopOpenApiGetManagerInfoObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/MB/MANAGER/getManagerInfo.json"
			    });
			},
			updateManagerInfo : function() {
				srvLogWrite("L0", "06", "02", "03", "", "");
				var sopOpenApiUpdateManagerInfoObj = new sop.openApi.updateManagerInfo.api();
				sopOpenApiUpdateManagerInfoObj.addParam('MANAGER_ID', $('#managerId').val());
				sopOpenApiUpdateManagerInfoObj.addParam('MANAGER_GRADE', $('#managerGrade').val());
				sopOpenApiUpdateManagerInfoObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/MB/MANAGER/updateManagerInfo.json"
			    });
			}
	};
	(function() {
	    $class("sop.openApi.getSession.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	            if(res.errCd == "0") { 
	            	var result = res.result;
	            	if(result != null){
	            		if(result.MANAGER_GRADE == 'SA'){
	            			$('#managerGrade').removeAttr('disabled');
	            			$('#modifyButtonDisabled').hide();
	            			$('#modifyButton').show();
	            		} else{
	            			$('#modifyButtonDisabled').show();
	            			$('#modifyButton').hide();
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
	    $class("sop.openApi.getManagerInfo.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	            if(res.errCd == "0") { 
	            	var result = res.result;
	            	if(result != null){
	            		$manager.getSession();
	            		if(result.info != null){
	            			$('#managerId').val(result.info.MANAGER_ID);
		            		$('#managerNm').text(result.info.MANAGER_NM);
		            		$('#email').val(result.info.EMAIL);
		            		$('#managerGrade').val(result.info.MANAGER_GRADE);
		            		$('#dept').val(result.info.DEPT);
		            		var tel = null;
		            		if(result.info.TEL_NO != null && result.info.TEL_NO != ''){
		            			tel = result.info.TEL_NO.split('-');
			            		$('#TEL_NO0').val(tel[0]);
			            		$('#TEL_NO1').val(tel[1]);
			            		$('#TEL_NO2').val(tel[2]);
		            		}
		            		$('#jobPos').val(result.info.JOB_POS);
		            		if(result.info.CP_NO != null && result.info.CP_NO != ''){
		            			tel = result.info.CP_NO.split('-');
			            		$('#cpNo').val(tel[0]);
			            		$('#cpNo1').val(tel[1]);
			            		$('#cpNo2').val(tel[2]);
		            		}
		            		$('#extNo').val(result.info.EXT_NO);
		            		if( result.info.LAST_ACCESS_TS != null &&  result.info.LAST_ACCESS_TS !=''){
		            			tel = result.info.LAST_ACCESS_TS.split('-');
			            		$('#lastAccessTs').text(tel[0]+'년 '+tel[1]+'월 '+tel[2]+'일');
		            		}
		            		if(result.info.LAST_LOGOUT_TS != null && result.info.LAST_LOGOUT_TS != ''){
		            			tel = result.info.LAST_LOGOUT_TS.split('-');
			            		$('#lastLogoutTs').text(tel[0]+'년 '+tel[1]+'월 '+tel[2]+'일');
		            		}
		            		$('#lastAccessIp').text(result.info.LAST_ACCESS_IP);
	            		}
	            		if(result.accesshits != null && result.accesshits != ''){
	            			var oneHistory = null;
	            			var oneLineStr = null;
	            			for(var i = 0; i < result.accesshits.length; i++){
	            				oneHistory = result.accesshits[i];
	            				var memId=null;
	            				if(oneHistory.MEMBER_ID==null|| oneHistory.MEMBER_ID==undefined||oneHistory.MEMBER_ID==''||oneHistory.MEMBER_ID=='undefined'){
	            					memId='-';
	            				}else{
	            					memId=oneHistory.MEMBER_ID;
	            				}
	            				oneLineStr = '<tr><td>' + ( i + 1 ) + '</td><td>' + memId + '</td><td>' + oneHistory.ACCESS_HIST_DIV + '</td><td>' + oneHistory.ACCESS_HIST_DET + '</td><td>' + oneHistory.ACCESS_TS + '</td></tr>';
	                			$('#loginHistoryTab').append(oneLineStr);
	    	            	}
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
	    $class("sop.openApi.updateManagerInfo.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	            if(res.errCd == "0") { 
	            	var result = res.result;
	            	if(result != null){
	            		getConfirmPopup('알림', result.msg, 'alert');
	    				$('#ok_alertPopup').click(function(){
	    					if(result.success == true){
		            			$('.popupWrapper').css('display','none');
		            		}
	    					confirmPopupRemove();
	    				});
	    				$('#close_confirmPopup').click(function(){
	    					if(result.success == true){
		            			$('.popupWrapper').css('display','none');
		            		}
	    					confirmPopupRemove();
	    				});
	    				if(result.success == true){
		            		$(id_datagrid).datagrid('reload');
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
}(window, document));
// create query parameters for datagrid
function getQueryParamsObj(){
	var queryParamsObj = new Object();
	if($('#keywordInput').val().replace(/(^\s*)|(\s*$)/g, '').length > 0){
		queryParamsObj['MANAGER_NM'] = $('#keywordInput').val().replace(/(^\s*)|(\s*$)/g, '');
	}
	return queryParamsObj;
}