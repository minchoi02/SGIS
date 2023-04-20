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
	W.$findIdAndPwd = W.$findIdAndPwd || {};
	
	$(document).ready(function() {
		$findIdAndPwd.event.setUIEvent();
	});
	
	$findIdAndPwd.ui = {
			findIdPopup : null,
			findPwdPopup : null,
			
			/**
			 * 
			 * @name         : showFindIdPoup
			 * @description  : 아이디 찾기 팝업창을 표출한다.
			 * @date         : 2018. 07. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showFindIdPoup : function() {
				this.findIdPopup = $("#findIdBox").dialog({
					title : "아이디 찾기",
					width : "600px",
					height: "310px"
				});
				$findIdAndPwd.event.setPopupEvent();
				$("#findId_user_nm").focus();
			},
			
			/**
			 * 
			 * @name         : showFindPwdPoup
			 * @description  : 비밀번호 찾기 팝업창을 표출한다.
			 * @date         : 2018. 07. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showFindPwdPoup : function() {
				this.findPwdPopup = $("#findPwdBox").dialog({
					title : "비밀번호 찾기",
					width : "600px",
					height: "400px"
				});
				$findIdAndPwd.event.setPopupEvent();
				$("#findPwd_user_id").focus();
			},
			
			/**
			 * 
			 * @name         : doFindId
			 * @description  : 아이디 찾기를 수행한다.
			 * @date         : 2018. 07. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doFindId : function() {
				if (this.validateCheck("id")) {
					$findIdAndPwd.request.doReqFindId();
				}
			},
			
			/**
			 * 
			 * @name         : doFindPwd
			 * @description  : 비밀번호 찾기를 수행한다.
			 * @date         : 2018. 07. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doFindPwd : function() {
				if (this.validateCheck("pwd")) {
					$findIdAndPwd.request.doReqFindPwd();
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
			validateCheck : function(type) {
				var id, name, email;
				switch(type) {
					case "id": //아이디 찾기
						name = $.trim($("#findId_user_nm").val());
						email = $.trim($("#findId_email").val());
						break;
					case "pwd": //비밀번호 찾기
						id = $.trim($("#findPwd_user_id").val());
						name = $.trim($("#findPwd_user_nm").val());
						email = $.trim($("#findPwd_email").val());
						break;
					default:
						break;
				}
				
				//아이디 체크
				if (type == "pwd") {
					if (id == undefined || id.length == 0) {
						$message.open("알림", "아이디를 입력 해주세요.");
						return false;
					}
				}
				
				//이름 체크
				if (name == undefined || name.length == 0) {
					$message.open("알림", "이름을 입력해 주세요.");
					return false;
				}
				
				//이메일 체크
				if (email == undefined || email.length == 0) {
					$message.open("알림", "이메일을 입력해 주세요.");
					return false;
				}
				
				this.params = {};
				this.params = {
						user_id : $aes.encrypt(id),
						user_nm : $aes.encrypt(name),
						email : $aes.encrypt(email)
				};

				return true;
			}
	};
	
	$findIdAndPwd.request = {
			
			/**
			 * 
			 * @name         : doReqFindId
			 * @description  : 아이디 찾기를 요청한다.
			 * @date         : 2018. 07. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doReqFindId : function() {
				var options = {
						params : $findIdAndPwd.ui.params
					};
				$ajax.requestApi(contextPath + "/api/findId.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:	
							var result = res.result;
							var html  = "찾으시는 아이디는 다음과 같습니다.<br><br>";
								html += "<span style='font-weight:bold;font-size:16px;'>"+result.user_id+"</span>";
							$message.open("알림", html);
							break;
						default:
							$message.open("알림", "아이디를 찾을 수 없습니다.");
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqFindPwd
			 * @description  : 비밀번호 찾기를 요청한다.
			 * @date         : 2018. 07. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doReqFindPwd : function() {
				var options = {
					params : $findIdAndPwd.ui.params
				};
				$ajax.requestApi(contextPath + "/api/findPwd.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:	
							var result = res.result;
							var html  = "초기화된 비밀번호는 아래와 같습니다.<br><br>";
								html += "<span style='font-weight:bold;font-size:16px;'>"+result.pwd+"</span>";
							$message.open("알림", html);
							break;
						default:
							$message.open("알림", "아이디를 찾을 수 없습니다.");
							break;
					}
				});	
			}
			
	};
	
	$findIdAndPwd.event = {
			/**
			 * 
			 * @name         : setUIEvent
			 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date         : 2018. 07. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param
			 */	
			setUIEvent : function() {
				
			},
			
			/**
			 * 
			 * @name         : setPopupEvent
			 * @description  : popup에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date         : 2018. 07. 05. 
			 * @author	     : 권차욱
			 */	
			setPopupEvent : function() {
				
				$("#btn-idFind").on("click", function() {
					$findIdAndPwd.ui.doFindId();
				});
				
				$("#btn-pwdFind").on("click", function() {
					$findIdAndPwd.ui.doFindPwd();
				});
			}
	};
}(window, document));