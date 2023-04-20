/*
* 메인화면 HTML입니다.
* history : 네이버시스템(주), 1.0, 2014/10/11  초기 작성
* author : chenzhanchao
* version : 1.0
*/
(function(W, D) {
	W.$myPage = W.$myPage || {};
	$(document).ready(function() {
		srvLogWrite("L0", "06", "03", "01", "", "");
		document.body.onselectstart = document.body.ondrag = function(){
			return false;
		}
		$(".contentsCnm, .defaultboxCnm").mouseenter(function(){
			$(".subMenu").hide();
			$(".menuCnm li a").removeClass("on");
		});
		//load information
		$myPage.loadInit();
		if ($.fn.validatebox){
			$.fn.validatebox.defaults.missingMessage = '이 입력 항목은 필수 입력 항목 입니다.';
			$.fn.validatebox.defaults.rules.email.message = '사용할 수 있는 메일 주소를 입력하세요.';
			$.fn.validatebox.defaults.rules.length.message = '입력 길이는 필수{0}와{1} 사이 ';
		}
		$('#DEPT').validatebox({
			required: true
		});
		$('#TEL_NO0').validatebox({
			required: true,
			validType:['telNo']
		});
		$('#TEL_NO1').validatebox({
			required: true,
			validType:['exoNo']
		});
		$('#TEL_NO2').validatebox({
			required: true,
			validType:['tel']
		});
		$('#JOB_POS').validatebox({
			required: true
		});
		$('#EXT_NO').validatebox({
			required: true,
			validType:['exoNo']
		});
		$('#CP_NO1').validatebox({
			required: true,
			validType:['exoNo']
		});
		$('#CP_NO2').validatebox({
			required: true,
			validType:['tel']
		});
		$('#EMAIL').validatebox({
			required: true,
			validType:['email']
		});
		$('#DEPT').keyup(function(){
			$('#DEPT').validatebox('enableValidation');
		});
		$('#TEL_NO0').keyup(function(){
			$('#TEL_NO0').validatebox('enableValidation');
		});
		$('#TEL_NO1').keyup(function(){
			$('#TEL_NO1').validatebox('enableValidation');
		});
		$('#TEL_NO2').keyup(function(){
			$('#TEL_NO2').validatebox('enableValidation');
		});
		$('#JOB_POS').keyup(function(){
			$('#JOB_POS').validatebox('enableValidation');
		});
		$('#EXT_NO').keyup(function(){
			$('#EXT_NO').validatebox('enableValidation');
		});
		$('#CP_NO1').keyup(function(){
			$('#CP_NO1').validatebox('enableValidation');
		});
		$('#CP_NO2').keyup(function(){
			$('#CP_NO2').validatebox('enableValidation');
		});
		$('#EMAIL').keyup(function(){
			$('#EMAIL').validatebox('enableValidation');
		});
		$('#infoFm').form('disableValidation');
		$('#modHref').click(function(){
			srvLogWrite("L0", "06", "03", "02", "", "");
			$('#infoFm').form('enableValidation');
			var DEPT = $('#DEPT').val().replace(/(^\s*)|(\s*$)/g, '');
			var JOB_POS = $('#JOB_POS').val().replace(/(^\s*)|(\s*$)/g, '');
			if(DEPT.length == 0){
				$('#DEPT').val('');
				$('#DEPT').focus();
			} else if(JOB_POS.length == 0){
				$('#JOB_POS').val('');
				$('#JOB_POS').focus();
			} else if($('#infoFm').form('validate')){
				getConfirmPopup('확인', '수정하시겠습니까?', 'confirm');
				$('#ok_confirmPopup').click(function(){
					$myPage.modifyMyPageProcess(DEPT, JOB_POS);
					confirmPopupRemove();
				});
				$('#cancel_confirmPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				}); 
			} 
		});
	});
	$myPage = {
			loadInit : function() {
				var sopOpenApiLoadInitObj = new sop.openApi.myPageLoadInit.api();
				sopOpenApiLoadInitObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/CM/MyPage/loadInfo.json"
			    });
			},
			modifyMyPageProcess : function(DEPT, JOB_POS) {
				var sopOpenApiMyPageModifyObj = new sop.openApi.myPageModify.api();
				sopOpenApiMyPageModifyObj.addParam("DEPT", DEPT);
				sopOpenApiMyPageModifyObj.addParam("TEL_NO", $('#TEL_NO0').val()+"-"+$('#TEL_NO1').val()+"-"+$('#TEL_NO2').val());
				sopOpenApiMyPageModifyObj.addParam("EXT_NO", $('#EXT_NO').val());
				sopOpenApiMyPageModifyObj.addParam("CP_NO", $('#CP_NO0').val()+"-"+$('#CP_NO1').val()+"-"+$('#CP_NO2').val());
				sopOpenApiMyPageModifyObj.addParam("EMAIL", $('#EMAIL').val());
				sopOpenApiMyPageModifyObj.addParam("JOB_POS", JOB_POS);
				sopOpenApiMyPageModifyObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/CM/MyPage/updateInfo.json"
			    });
			}
	};
	(function() {
	    $class("sop.openApi.myPageModify.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	        	var result = res.result;
	            if(res.errCd == "0") {
	            	if(result != null){
	            		getConfirmPopup('알림', result.msg, 'alert');
	    				$('#ok_alertPopup').click(function(){
	    					confirmPopupRemove();
	    				});
	    				$('#close_confirmPopup').click(function(){
	    					confirmPopupRemove();
	    				});
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
	            getConfirmPopup('알림', '에러발생', 'alert');
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
	    $class("sop.openApi.myPageLoadInit.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	            if(res.errCd == "0") {  
	            	var result = res.result;
	            	if(result != null){
	            		$("#MANAGER_NM").text(result.MANAGER_NM);
	            		$("#MANAGER_ID").text(result.MANAGER_ID);
	            		var MANAGER_GRADE = '';
	            		if(result.MANAGER_GRADE == 'SA'){
	            			MANAGER_GRADE = '수퍼관리자';
	            		} else if(result.MANAGER_GRADE == 'MA'){
	            			MANAGER_GRADE = '중간관리자';
	            		}else if(result.MANAGER_GRADE == 'GA'){
	            			MANAGER_GRADE = '일반관리자';
	            		}
	            		$("#MANAGER_GRADE").text(MANAGER_GRADE);
	            		$("#DEPT").val(result.DEPT);
	            		$("#EXT_NO").val(result.EXT_NO);
	            		$("#EMAIL").val(result.EMAIL);
	            		if(result.CP_NO != null && result.CP_NO != ''){
	            			var cp=result.CP_NO.split('-');
		            		$("#CP_NO0").val(cp[0]);
		            		$("#CP_NO1").val(cp[1]);
		            		$("#CP_NO2").val(cp[2]);
		            		$("#JOB_POS").val(result.JOB_POS);
	            		}
	            		if(result.TEL_NO != null && result.TEL_NO != ''){
	            			var tel=result.TEL_NO.split('-');
		            		$("#TEL_NO0").val(tel[0]);
		            		$("#TEL_NO1").val(tel[1]);
		            		$("#TEL_NO2").val(tel[2]);
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
	            getConfirmPopup('알림', '에러발생', 'alert');
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
$.extend($.fn.validatebox.defaults.rules, {
	tel : {
	        validator : function(value) {
	        	if(/^\d{4}$/i.test(value))
	        		return true;
	        	else return false;
	        },
	        //Please enter 4-digit.
	        message : '4숫자를 입력하세요.' 
	    },
	exoNo : {
	    validator : function(value) {
	    	if(/^\d{1,4}$/i.test(value))
	    		return true;
	    	else return false;
	    },
	    //Please enter 4-digit.
	    message : '1-4숫자를 입력하세요.' 
	},	
	telNo : {
	    validator : function(value) {
	    	if(/^\d{1,3}$/i.test(value))
	    		return true;
	    	else return false;
	    },
	    //Please enter 4-digit.
	    message : '1-3숫자를 입력하세요.' 
	}
});