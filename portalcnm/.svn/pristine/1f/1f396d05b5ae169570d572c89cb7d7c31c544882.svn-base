/**   
 *
 * @JSName: member
 * @Description:  modify by liudandan  2014/11/17/ 17:00:00  
 *
 * @author: chenzhanchao   
 * @date: 2014/10/28/ 01:30:00    
 * @version V1.0      
 *    
 */
(function(W, D) {
	W.$member = W.$member || {};
	//id of datagrid
	var id_datagrid = '#searchResultTable';
	var flag = 'N';
	$(document).ready(function(){
		//init page when loading
		document.getElementById('resetForm').reset();
		$('#noSearchResult').hide();
		$member.getMemberCNT();
		//click the search button
		$('#searchButton').click(function(){
			srvLogWrite("L0", "06", "01", "01", "", "");
			if($('#keyword').validatebox('isValid')){
				$(id_datagrid).datagrid('load', getQueryParamsObj());
			}
		});
		
		$('#okButton').click(function(){
			$('.popupWrapper').css('display','none'); 
		});
		//click the modify button on the pupop page
		$('#modifyButton').click(function(){
			getConfirmPopup('확인', '수정하시겠습니까?', 'confirm');
			$('#ok_confirmPopup').click(function(){
				$member.modifyInfo();
				confirmPopupRemove();
			});
			$('#cancel_confirmPopup').click(function(){
				confirmPopupRemove();
			});
			$('#close_confirmPopup').click(function(){
				confirmPopupRemove();
			});
		});
		//click the cancel button on the pupop page
		$('#cancelButton').click(function(){
			$('.popupWrapper').css('display','none'); 
		});
		$('#keyword').validatebox({
			required: false,
			validType:['cnmInput']
		});
		//search result
		$(id_datagrid).datagrid({
			loadMsg: '처리중 입니다, 기다리 십시요...',
			pagination: true,
			nowrap: false,
			singleSelect: true,
			sortName:'REG_TS',
			sortOrder:'desc',
			columns:[[ 
//{field:'checkbox',checkbox: true},
{field:'R',title:'번호',align:'center',width:50},
{field:'MEMBER_NM',title:'성명',align:'center',width:258,sortable:true,order:'desc',
	formatter: function(value, row, index){
		if(value != null && value != ''){
			if(value.length > 1){
				value = value.substr(0, 1) + '*' + value.substr(2);
			}
			value ="<a style='color:#4a4a4a;cursor:pointer' onclick='$member.getMemberInfo(\""+row.MEMBER_ID+"\")' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>"+ value + "</a>";
			return value;
		}
	}
},    
{field:'MEMBER_GRADE',title:'회원등급',align:'center',width:108,
	formatter: function(value, row, index){
		if(value != null && value != ''){
			if(value == 'GM'){
				value = '일반';
			}
			else if(value == 'PM'){
				value = '프리미엄';
			}
			else if(value == 'MM'){
				value = '마스터';
			}
			return value;
		}
	}
},
{field:'MEMBER_ID',title:'아이디',align:'center',width:180,sortable:true,order:'desc'},    
{field:'LOGIN_LIMIT_YN',title:'회원상태',align:'center',width:149,sortable:true,order:'desc',
	formatter: function(value, row, index){
		if(value == 'Y')
			return "로그인제한";
		if(value == 'N')
			return "로그인허용";
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
url: contextPath +"/ServiceAPI/MB/MEMBER/searchMember.json"
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
	//press the 'enter' key
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
	$member = {
			getMemberCNT : function() {
				var sopOpenApiGetMemberCNTObj = new sop.openApi.getMemberCNT.api();
				sopOpenApiGetMemberCNTObj.request({
					method : "POST",
					async : false,
					url : contextPath +"/ServiceAPI/MB/MEMBER/getMemberCNT.json"
				});
			},
			getSession : function() {
				var sopOpenApiGetSessionObj = new sop.openApi.getSession.api();
				sopOpenApiGetSessionObj.request({
					method : "POST",
					async : false,
					url : contextPath +"/auth/getSession.json"
				});
			},
			getMemberInfo : function(MEMBER_ID) {
				srvLogWrite("L0", "06", "01", "02", "", "");
				$('#GMRadio').attr('disabled', true);
				$('#PMRadio').attr('disabled', true);
				$('#MMRadio').attr('disabled', true);
				$('#loginLimitY').attr('disabled', true);
				$('#loginLimitN').attr('disabled', true);
				$('#pswTimes').attr('disabled', true);
				$('#modifyButtonDisabled').show();
				$('#modifyButton').hide();
				$('.popupWrapper').css('display','block');
				var sopOpenApiGetMemberInfoObj = new sop.openApi.getMemberInfo.api();
				sopOpenApiGetMemberInfoObj.addParam('MEMBER_ID', MEMBER_ID);
				sopOpenApiGetMemberInfoObj.request({
					method : "POST",
					async : false,
					url : contextPath +"/ServiceAPI/MB/MEMBER/getMemberInfo.json"
				});
			},
			modifyInfo : function() {
				srvLogWrite("L0", "06", "01", "03", "", "");
				var sopOpenApiModifyInfoObj = new sop.openApi.modifyInfo.api();
				sopOpenApiModifyInfoObj.addParam('MEMBER_ID', $('#memberId').text());
				if($('#GMRadio').is(':checked')){
					sopOpenApiModifyInfoObj.addParam('MEMBER_GRADE','GM');
				}else if($('#PMRadio').is(':checked')){
					sopOpenApiModifyInfoObj.addParam('MEMBER_GRADE','PM');
				}else if($('#MMRadio').is(':checked')){
					sopOpenApiModifyInfoObj.addParam('MEMBER_GRADE','MM');
				}	
				if($('#loginLimitY').is(':checked')){
					//제한
					sopOpenApiModifyInfoObj.addParam('LOGIN_LIMIT_YN','Y');
				}else if($('#loginLimitN').is(':checked')){
					//비제한
					sopOpenApiModifyInfoObj.addParam('LOGIN_LIMIT_YN','N');
				}	
				sopOpenApiModifyInfoObj.addParam('PW_FAIL_CNT',$('#pswTimes').val());
				sopOpenApiModifyInfoObj.request({
					method : "POST",
					async : false,
					url : contextPath +"/ServiceAPI/MB/MEMBER/updateMemberInfo.json"
				});
			}
	};
	(function() {
		$class("sop.openApi.getMemberCNT.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") { 
					var result = res.result;
					if(result != null){
						$('#totalCNT').html('<span>' + result.totalCNT + '</span>');
						$('#gmCNT').html('<span>' + result.gmCNT + '</span>');
						$('#pmCNT').html('<span>' + result.pmCNT + '</span>');
						$('#mmCNT').html('<span>' + result.mmCNT + '</span>');
						$('#limitCNT').html('<span>' + result.limitCNT + '</span>');
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
		$class("sop.openApi.getSession.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") { 
					var result = res.result;
					if(result != null){
						if(result.MANAGER_GRADE == 'SA' || result.MANAGER_GRADE == 'MA'){
							
							if(flag!='Y'){
								$('#modifyButtonDisabled').hide();
								$('#modifyButton').hide();
								$('#okButton').show();
								$('#cancelButton').hide();
								
								// 2017. 03. 07 개발팀 수정요청
								$('#GMRadio').removeAttr('disabled');
								$('#PMRadio').removeAttr('disabled');
								$('#MMRadio').removeAttr('disabled');
								$('#loginLimitY').removeAttr('disabled');
								$('#loginLimitN').removeAttr('disabled');
							}else{
								$('#GMRadio').removeAttr('disabled');
								$('#PMRadio').removeAttr('disabled');
								$('#MMRadio').removeAttr('disabled');
								$('#loginLimitY').removeAttr('disabled');
								$('#loginLimitN').removeAttr('disabled');
								$('#modifyButtonDisabled').hide();
								$('#cancelButton').show();
								$('#modifyButton').show();
								$('#okButton').hide();	
							}
							
						}
						else{
							$('#modifyButtonDisabled').show();
							$('#cancelButton').show();
							$('#okButton').hide();
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
		$class("sop.openApi.getMemberInfo.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") { 
					var result = res.result;
					if(result != null){
						console.log(result);
						if(result.COMBINE_LOGIN_YN !=null && result.COMBINE_LOGIN_YN !=''){
							if(result.COMBINE_LOGIN_YN=='Y'){
								flag = 'Y';
							}else{
								flag = 'N';
							}

						}
						$member.getSession();
						$('#memberId').text(result.MEMBER_ID);
						$('#memberNm').text(result.MEMBER_NM);
						$('#email').text(result.EMAIL);
						if(result.CP_NO != null &&result.CP_NO != ''){
							$('#phone').text(result.CP_NO.substring(0, 3) + ' - **** - ' + result.CP_NO.substring(result.CP_NO.length - 4));
						}
						if(result.MEMBER_GRADE != null && result.MEMBER_GRADE != ''){
							if(result.MEMBER_GRADE.toUpperCase() == 'GM'){
								document.getElementById('GMRadio').checked = true;
							}else if(result.MEMBER_GRADE.toUpperCase() == 'PM'){
								document.getElementById('PMRadio').checked = true;
							}else if(result.MEMBER_GRADE.toUpperCase() == 'MM'){
								document.getElementById('MMRadio').checked = true;
							}
						}
						if(result.LOGIN_LIMIT_YN != null && result.LOGIN_LIMIT_YN != ''){
							if(result.LOGIN_LIMIT_YN.toUpperCase() == 'Y'){
								//제한
								document.getElementById('loginLimitY').checked = true;

							}else if(result.LOGIN_LIMIT_YN.toUpperCase() == 'N'){
								//허용
								document.getElementById('loginLimitN').checked = true;
								//document.getElementById('loginLimitN').checked = true;
							}
						}
						$('#pswTimes').val(result.PW_FAIL_CNT);
						var tempDeal = null;
						var temp = null;
						if( result.PW_LAST_MOD_DT != null &&  result.PW_LAST_MOD_DT != ''){
							tempDeal = result.PW_LAST_MOD_DT.split('-');
							temp = tempDeal[0] + '년 ' + tempDeal[1] + '월 ' + tempDeal[2] + '일';
							$('#pswLastModTime').text(temp);
						}
						if(result.LAST_ACCESS_DT != null && result.LAST_ACCESS_DT != ''){
							tempDeal = result.LAST_ACCESS_DT.split('-');
							temp = tempDeal[0] + '년 ' + tempDeal[1] + '월 ' + tempDeal[2] + '일';
							$('#pswLastLoginTime').text(temp);
						}
						if(result.LAST_LOGOUT_DT != null && result.LAST_LOGOUT_DT != ''){
							tempDeal = result.LAST_LOGOUT_DT.split('-');
							temp = tempDeal[0] + '년 ' + tempDeal[1] + '월 ' + tempDeal[2] + '일';
							$('#pswLastLogoutTime').text(temp);
						}
						if(result.SRV_AGREEMENT_AGREE_YN != null &&result.SRV_AGREEMENT_AGREE_YN != ''){
							if(result.SRV_AGREEMENT_AGREE_YN.toUpperCase() == 'Y'){
								$('#SRV_AGREEMENT').text('동의');
							} else if(result.SRV_AGREEMENT_AGREE_YN.toUpperCase() == 'N'){
								$('#SRV_AGREEMENT').text('미동의');
							}
						}
						if(result.PSN_INFO_AGREEMENT_AGREE_YN != null && result.PSN_INFO_AGREEMENT_AGREE_YN != ''){
							if(result.PSN_INFO_AGREEMENT_AGREE_YN.toUpperCase() == 'Y'){
								$('#PERSON_INFO_AGREEMENT').text('동의');
							} else if(result.PSN_INFO_AGREEMENT_AGREE_YN.toUpperCase() == 'N'){
								$('#PERSON_INFO_AGREEMENT').text('미동의');
							}
						}
						if(result.AUTH_DIV != null && result.AUTH_DIV != ''){
							if(result.AUTH_DIV.toUpperCase() == 'H'){
								$('#AUTH_DIV').text('모바일');
							} else if(result.AUTH_DIV.toUpperCase() == 'I'){
								$('#AUTH_DIV').text('아이핀');
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
		$class("sop.openApi.modifyInfo.api").extend(sop.cnm.absAPI).define({
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
							$member.getMemberCNT();
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
//create query parameters for datagrid
function getQueryParamsObj(){
	var queryParamsObj = new Object();
	if($('#MEMBER_GRADE').val() != 'ALL'){
		queryParamsObj['MEMBER_GRADE'] = $('#MEMBER_GRADE').val();
	}
	if($('#keyword').val().replace(/(^\s*)|(\s*$)/g, '').length > 0){
		queryParamsObj['MEMBER_NM'] = $('#keyword').val().replace(/(^\s*)|(\s*$)/g, '');
	}
	return queryParamsObj;
}