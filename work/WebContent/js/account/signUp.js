/**
 * 회원가입에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2018/02/02  초기 작성
 * author : 김성현, 권차욱
 * version : 1.0
 * see : 
 *
 */ 
(function(W, D) {
	W.$signUp = W.$signUp || {};
	
	$(document).ready(function() {
		//$signUp.event.setUIEvent();
	});
	
	$signUp.ui = {
			tmpId : null,
			signUpPopup : null,
			idCheckPopup : null,
			isIdCheck : false,
			isPwdCheck : false,
			isPwd2Check : false,
			isNameCheck : false,
			isDepartCheck : false,
			isEmailCheck : false,
			isCellPhoneCheck : false,
			isPhoneCheck : false,
			
			/**
			 * 
			 * @name         : showSignUpBox
			 * @description  : 회원가입 화면을 표출한다.
			 * @date         : 2018. 07. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showSignUpBox : function() {
				
				//초기화
				$("#user_id").val("");
				$("#user_pw").val("");
				$("#user_pw2").val("");
				$("#user_nm").val("");
				$("#dept").val("");
				$("#email").val("");
				$("#tel_no").val("");
				$('#institute option:eq(0)').prop('selected', true);
				
				this.signUpPopup = $("#signUpBox").dialog({
					title : "회원가입",
					width : "600px",
					height: "800px"
				});
				$signUp.event.setUIEvent();
			},
			
			/**
			 * 
			 * @name         : hideSignBox
			 * @description  : 회원가입 화면을 숨긴다.
			 * @date         : 2018. 07. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			hideSignBox : function() {
				$message.open(
        				"회원가입",
        				"가입을 취소하시겠습니까?",
		    			 btns = [
			    			 {
			    			   title : "확인",
				    			   func : function(opt) {
				    				   opt.close();
				    				   $signUp.ui.params = {};
				    				   $signUp.ui.signUpPopup.close();
				    			   }
				    		 }, 
		    			     {
							   title : "취소",
							   func : function(opt) {
								   //회원정보 페이지로 이동
								   opt.close();
							   }
		    			     } 
		    			 ]
		    	);				
			},
			
			/**
			 * 
			 * @name         : showIdCheckPopup
			 * @description  : 아이디 중복확인 팝업창을 표출한다.
			 * @date         : 2018. 07. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showIdCheckPopup : function() {
				this.idCheckPopup = $("#idDuplicatePopup").dialog({
					title : "아이디 중복 확인",
					width : "500px",
					height: "310px"
				});
				$signUp.event.setPopupEvent();
				
				$("#btn-use").hide();
				$("#idCheck_user_id").val($("#user_id").val());
				$("#idCheck_user_id").focus();				
				
			},
			
			/**
			 * 
			 * @name         : doIdCheck
			 * @description  : 아이디 중복체크를 수행한다.
			 * @date         : 2018. 07. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doIdCheck : function() {
				var userId = $("#user_id").val();
				this.tmpId = userId;
				userId = $.trim(userId);
				
				if (userId.length < 5 || userId.length > 20) {
					$message.open("알림", "아이디를 올바르게 입력하세요.");
					return;
				}
				
				$signUp.request.doReqIdCheck(userId);
			},
			
			/**
			 * 
			 * @name         : doSignUp
			 * @description  : 회원가입을 수행한다.
			 * @date         : 2018. 07. 04. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doSignUp : function() {
				if (this.validateCheck()) {
					$signUp.request.doReqSignUp();
				}
			},
			
			/**
			 * 
			 * @name         : validateCheck
			 * @description  : 회원가입 입력폼 파라미터를 체크한다.
			 * @date         : 2018. 07. 04. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			validateCheck : function() {
				var id = $("#user_id").val();
				var coderw = $("#user_pw").val();
				var name = $("#user_nm").val();
				var institution = $("#institute option:selected").text();
				var depart = $("#dept").val();
				var email = $("#email").val();
				var cellPhone = $("#tel_no").val();
				var phone = $("#tel_no2").val();
				var instSeq = $("#institute option:selected").val();
				
				
				//아이디 체크
				if (!this.isIdCheck || id !== this.tmpId) {
					$message.open("알림", "아이디 중복체크를 해주세요.");
					return false;
				}
				
				//비밀번호 체크
				if (!this.isPwdCheck) {
					$message.open("알림", "비밀번호를 입력해 주세요.");
					return false;
				}
				
				//비밀번호 확인 체크
				if (!this.isPwd2Check) {
					$message.open("알림", "비밀번호를 확인해 주세요.");
					return false;
				}
				
				//이름 체크
				if (!this.isNameCheck) {
					$message.open("알림", "이름을 입력해 주세요.");
					return false;
				}
				
				//부서 체크
				if (!this.isDepartCheck) {
					$message.open("알림", "부서를 입력해 주세요.");
					return false;
				}
				
				//이메일 체크
				if (!this.isEmailCheck) {
					$message.open("알림", "이메일을 입력해 주세요.");
					return false;
				}
				
				//핸드폰 체크
				if (!this.isCellPhoneCheck) {
					$message.open("알림", "핸드폰 번호를 입력해 주세요.");
					return false;
				}
				
				//일반전화 체크
				if (!this.isPhoneCheck && $("#phoneArea").is(":visible")) {
					$message.open("알림", "일반 전화번호를 입력해 주세요.");
					phone = "";
					return false;
				}
				
				this.params = {};
				this.params = {
						user_id : $aes.encrypt($.trim(id)),
						coderw : $aes.encrypt($.trim(coderw)),
						user_nm : $aes.encrypt($.trim(name)),
						institution : $aes.encrypt(institution),
						dept_nm : $aes.encrypt($.trim(depart)),
						email : $aes.encrypt($.trim(email)),
						cell_phone : $aes.encrypt($.trim(cellPhone)),
						phone : $aes.encrypt($.trim(phone)),
						inst_seq : instSeq
				};
				return true;
			}
	};
	
	$signUp.request = {
			
			/**
			 * 
			 * @name         : doReqIdCheck
			 * @description  : 아이디 중복체크를 수행한다.
			 * @date         : 2018. 07. 04. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doReqIdCheck : function(userId) {
				var options = {
					params : {
						user_id : $aes.encrypt(userId)
					}
				};
				$ajax.requestApi(contextPath + "/api/loginIdCheck.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							if (result == 0) {									
								$message.open("알림", "사용 가능한 아이디입니다.", function(opt) {
									$signUp.ui.tmpId = userId;
									$signUp.ui.isIdCheck = true;
									$("#btn-use").show();
								});	
							} else {
								$signUp.ui.isIdCheck = false;
								$("#btn-use").hide();
								$message.open("알림", "중복된 아이디가 존재합니다.<br/>다른 아이디를 생성해 주세요.");
							}
						default:
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doSignUp
			 * @description  : 회원가입을 수행한다.
			 * @date         : 2018. 07. 04. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doReqSignUp : function() {
				var options = {
					params : $signUp.ui.params
				};
				$ajax.requestApi(contextPath + "/api/signUp.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							$message.open("알림", "회원가입을 축하합니다.<br/>관리자 승인 후에 로그인이 가능합니다.", function() {
								$signUp.ui.params = {};
			    				$signUp.ui.signUpPopup.close();
							});
							break;
						default:
							$message.open("알림", "회원가입을 정상적으로 수행하지 못하였습니다.");
							break;
					}
				});
			}
	};
	
	$signUp.event = {
			/**
			 * 
			 * @name         : setUIEvent
			 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date         : 2018. 02. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */	
			setUIEvent : function() {
				
				//회원가입 취소
				$("#cancel").on("click", function() {
					$signUp.ui.hideSignBox();
				});
				
				//아이디 중복확인
				$("#btn-duplicate").on("click", function() {
					$signUp.ui.doIdCheck();
				});
				
				//연락처 추가
				$("#btn-add-contact").on("click", function() {
					$("#phoneArea").show();
					$("#tel_no2").val("");
				});
				
				//연락처 추가 취소
				$("#btn-cancel-contact").on("click", function() {
					$("#phoneArea").hide();
					$("#tel_no2").val("");
				});
				
				//회원가입 신청
				$("#join").on("click", function() {
					$signUp.ui.doSignUp();
				});
				
				//회원가입 취소
				$("#cancel").on("click", function() {
					$signUp.ui.hideSignBox();
				});
				
				//아이디 중복체크여부 확인
				$("#user_id").keyup(function(e){
					var value = $(e.target).val();
					if ($signUp.ui.tmpId !== value) {
						$signUp.ui.isIdCheck = false;
					}
				});
				
				//비밀번호 허용체크
				$("#user_pw").keyup(function(e){
					var value = $(e.target).val();
					if (!$commonFunc.pwValidateCheck(value) && value.length > 0) {
						$signUp.ui.isPwdCheck = false;
						$("#user_pw_help").show();
					}else {
						$signUp.ui.isPwdCheck = true;
						$("#user_pw_help").hide();
					}
				});
				
				//비밀번호 확인 체크
				$("#user_pw2").keyup(function(e){
					var value = $(e.target).val();
					var pwd = $("#user_pw").val();
					if (pwd !== value && value.length > 0) {
						$signUp.ui.isPwd2Check = false;
						$("#user_pw2_help").show();
					}else {
						$signUp.ui.isPwd2Check = true;
						$("#user_pw2_help").hide();
					}
				});
				
				//이름 허용 체크
				$("#user_nm").keyup(function(e){
					var value = $(e.target).val();
					if (value.length < 2) {
						$signUp.ui.isNameCheck = false;
						
						if (value.length == 0) {
							$("#user_nm_help").hide();
						}else {
							$("#user_nm_help").show();
						}

					}else {
						$signUp.ui.isNameCheck = true;
						$("#user_nm_help").hide();
					}
				});
				
				//부서 허용 체크
				$("#dept").keyup(function(e){
					var value = $(e.target).val();
					if (value.length < 2) {
						$signUp.ui.isDepartCheck = false;
						
						if (value.length == 0) {
							$("#dept_help").hide();
						}else {
							$("#dept_help").show();
						}
						
					}else {
						$signUp.ui.isDepartCheck = true;
						$("#dept_help").hide();
					}
				});
				
				//이메일 허용 체크
				$("#email").keyup(function(e){
					var value = $(e.target).val();
					if (!$commonFunc.emailValidateCheck(value) && value.length > 0) {
						$signUp.ui.isEmailCheck = false;
						$("#email_help").show();
					}else {
						$signUp.ui.isEmailCheck = true;
						$("#email_help").hide();
					}
				});
				
				//핸드폰번호 허용 체크
				$("#tel_no").keyup(function(e){
					var value = $(e.target).val();
					if (!$commonFunc.cellPhoneValidateCheck(value, false) && value.length > 0) {
						$signUp.ui.isCellPhoneCheck = false;
						$("#tel_no_help").show();
					}else {
						$signUp.ui.isCellPhoneCheck = true;
						$("#tel_no_help").hide();
					}
				});
				
				//전화번호 허용 체크
				$("#tel_no2").keyup(function(e){
					var value = $(e.target).val();
					if (!$commonFunc.phoneValidateCheck(value, false) && value.length > 0) {
						$signUp.ui.isPhoneCheck = false;
						$("#tel_no2_help").show();
					}else {
						$signUp.ui.isPhoneCheck = true;
						$("#tel_no2_help").hide();
					}
				});
				
			}
	};
}(window, document));