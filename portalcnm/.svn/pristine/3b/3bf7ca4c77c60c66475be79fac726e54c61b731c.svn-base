/**
* GPIK인증후 관리자 가입에 관한 메소드
* 
* history : 네이버시스템(주), 1.0, 2014/10/30  초기 작성
* author : 이동형
* version : 1.0
* see : 
*
 */
(function(W, D) {
	//"use strict";
	
	$(document).ready(function() {
		var name = $("#manager_nm1").val();
		var gpki_key = $("#gpki_key").val();
		$("#manager_nm").val(name.replace(/[0-9]/g, ""));		
		gpkiJoinForm.validateSetting();		
	});
	
	W.$gpkiJoinForm = W.$gpkiJoinForm || {};
	
	gpkiJoinForm = {
			
		validateSetting : function() {
				$('#dept').validatebox({
					required: true,
					validType: 'length[1,12]',
					missingMessage: '부서는 필수 입력값입니다.',
					invalidMessage: '1자리이상 12자리이하까지 입력 가능합니다.',
					prompt: '부서를 입력해 주세요.'
				});				
				$('#job_pos').validatebox({
					required: true,
					validType: 'length[1,12]',
					missingMessage: '직급은 필수 입력값입니다.',
					invalidMessage: '1자리이상 12자리이하까지 입력 가능합니다.',
					prompt: '직급를 입력해 주세요.'
				});
				$('#ext_no').validatebox({
					required: true,
					validType: 'length[1,12]',
					missingMessage: '내선번호는 필수 입력값입니다.',
					invalidMessage: '1자리이상 12자리이하까지 입력 가능합니다.',
					prompt: '내선번호를 입력해 주세요.'
				});				
				
				$("#email").validatebox({
					required: true,
					validType: ['email','length[0,40]'],
					missingMessage: '이메일은 필수 입력값입니다.',
					invalidMessage: '이메일 형식이 맞지 않습니다.'
				});
				$("#cp_no1").validatebox({
					required: true,
					validType: 'length[1,4]',
					missingMessage: '핸드폰번호는 필수 입력값입니다.',
					prompt: '전화번호를 입력해 주세요.'
				});
				$("#cp_no2").validatebox({
					required: true,
					validType: 'length[1,4]',
					missingMessage: '핸드폰번호는 필수 입력값입니다.',
					prompt: '전화번호를 입력해 주세요.'
				});
				$("#cp_no3").validatebox({
					required: true,
					validType: 'length[1,4]',
					missingMessage: '핸드폰번호는 필수 입력값입니다.',
					prompt: '전화번호를 입력해 주세요.'
				});
				$("#tel_no1").validatebox({
					required: true,
					validType: 'length[1,4]',
					missingMessage: '전화번호는 필수 입력값입니다.',
					prompt: '전화번호를 입력해 주세요.'
				});
				$("#tel_no2").validatebox({
					required: true,
					validType: 'length[1,4]',
					missingMessage: '전화번호는 필수 입력값입니다.',
					prompt: '전화번호를 입력해 주세요.'
				});
				$("#tel_no3").validatebox({
					required: true,
					validType: 'length[1,4]',
					missingMessage: '전화번호는 필수 입력값입니다.',
					prompt: '전화번호를 입력해 주세요.'
				});

			},

			//입력값 체크
			validate : function() {																				
				if(!$("#email").validatebox('isValid')) {
					alert("이메일 형식에 어긋납니다.");
					$("#email").focus();
					return false;
				}
				if(!$("#job_pos").validatebox('isValid')) {
					alert("직급을 확인하세요");
					$("#job_pos").focus();
					return false;
				}
				if(!$("#job_pos").validatebox('isValid')) {
					alert("직급을 확인하세요");
					$("#job_pos").focus();
					return false;
				}
				if(!$("#dept").validatebox('isValid')) {
					alert("부서를 확인하세요");
					$("#dept").focus();
					return false;
				}																		
				if(!$("#tel_no1").validatebox('isValid')) {
					alert("전화번호를 확인하세요");
					$("#tel_no1").focus();
					return false;
				}
				if(!$("#tel_no2").validatebox('isValid')) {
					alert("전화번호를 확인하세요");
					$("#tel_no2").focus();
					return false;
				}
				if(!$("#tel_no3").validatebox('isValid')) {
					alert("전화번호를 확인하세요");
					$("#tel_no3").focus();
					return false;
				}
				if(!$("#cp_no1").validatebox('isValid')) {
					alert("핸드폰 번호를 확인하세요");
					$("#cp_no1").focus();
					return false;
				}
				if(!$("#cp_no2").validatebox('isValid')) {
					alert("핸드폰 번호를 확인하세요");
					$("#cp_no2").focus();
					return false;
				}
				if(!$("#cp_no3").validatebox('isValid')) {
					alert("핸드폰 번호를 확인하세요");
					$("#cp_no3").focus();
					return false;
				}				
				if(!$("#ext_no").validatebox('isValid')) {
					alert("내선번호을 확인하세요");
					$("#ext_no").focus();
					return false;
				}				
				
				
				return true;
			},			

			/*********** GPKI 관리자 가입 프로세스 Start **********/
			gpkiInfoReg : function() {
			   if(gpkiJoinForm.validate()){
				    var regObj = new sop.openApi.gpkiJoinForm.api();
				    regObj.addParam("manager_id", $("#manager_id").val());
				    regObj.addParam("manager_nm", $("#manager_nm").val());
				    regObj.addParam("gpki_key", $("#gpki_key").val());
				    regObj.addParam("manager_grade", $("#manager_grade").val());
				    regObj.addParam("dept", $("#dept").val());
				    regObj.addParam("job_pos", $("#job_pos").val());
				    regObj.addParam("tel_no", $("#tel_no1").val()+$("#tel_no2").val()+$("#tel_no3").val());
				    regObj.addParam("cp_no", $("#cp_no1").val()+$("#cp_no2").val()+$("#cp_no3").val());
				    regObj.addParam("ext_no", $("#ext_no").val());
				    regObj.addParam("email", $("#email").val());
				    /*regObj.addParam("auth_cert_reg_yn", $("#auth_cert_reg_yn").val());
				    regObj.addParam("last_access_ip", $("#last_access_ip").val());
				    regObj.addParam("last_access_ts", $("#last_access_ts").val());
				    regObj.addParam("last_logout_ts", $("#last_logout_ts").val());
				    regObj.addParam("dupl_login_session_key", $("#dupl_login_session_key").val());*/
				    regObj.request({
				        method : "POST",
				        async : false,
				        url : contextPath+"/ServiceAPI/CM/GpkiInfoReg.json"
				    });
			   }				
			}
			/*********** GPKI 관리자 가입 프로세스 End **********/	
	};	
	/*********** GPKI 관리자 가입 프로세스 Start **********/
	(function() {
	    $class("sop.openApi.gpkiJoinForm.api").extend(sop.cnm.absAPI).define({
	        onSuccess : function(status, res) {
	        	var result = res.result;	        	
	            if(res.errCd == "0") {
	            	alert("회원가입이 완료되었습니다!.");
	            location.href = contextPath+"/html/CM/login.jsp";
	            } else {
	            	alert(res.errMsg);
	            }
	        },
	        onFail : function(status) {
	            alert("에러발생");
	        }
	    });
	}());
	/*********** GPKI 관리자 가입 프로세스 End **********/
}(window, document));