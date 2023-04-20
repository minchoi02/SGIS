/**
 * LBDMS G2G 로그인 페이지 js
 * 
 * Date : 2018.05.24 
 * Author : 최재영 
 * Detail : 기존 statsPortal에서 쓰던 방식으로 js 작성
 */

(function(W, D) {
	W.$loginMain = W.$loginMain || {};

	$(document).ready(function() {
		$loginMain.event.setUIEvent();
	});

	$loginMain.ui = {
			termsPopup : null,
			
			/**
			 * 
			 * @name         : showTermsPopup
			 * @description  : 이용약관 팝업창을 표출한다.
			 * @date         : 2018. 06. 29. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showTermsPopup : function() {
				this.termsPopup = $("#termsPopup").dialog({
					title : "이용약관",
					width : "690px",
					height: "765px",
					dialogStyle : "dialog_scroll"
				});
			},
			
			/**
			 * 
			 * @name         : showFindIdPopup
			 * @description  : 아이디 팝업창을 표출한다.
			 * @date         : 2018. 07. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			showFindIdPopup : function() {
				this.termsPopup = $("#termsPopup").dialog({
					title : "이용약관",
					width : "690px",
					height: "765px",
					dialogStyle : "dialog_scroll"
				});
			},
			
			/**
			 * 
			 * @name         : doLogin
			 * @description  : 로그인을 수행한다.
			 * @date         : 2018. 06. 29. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doLogin : function() {
				var user_id = $("#id").val();
				var user_pw = $("#pwd").val();
				
				var url = contextPath + "/api/login.do";

				if($loginMain.ui.loginValidate(user_id, user_pw)){
					var params = {
							user_id : $.trim(user_id),
							coderw : $aes.encrypt($.trim(user_pw))
					};
					$loginMain.request.doReqLogin(url, params);
				}
			},

			/**
			 * 
			 * @name         : loginValidate
			 * @description  : 로그인 입력 validation을 수행한다.
			 * @date         : 2018. 07. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 아이디, 패스워드 파라미터 
			 */
			loginValidate : function(id, pw){
				if(id == "" || id == null ){
					$message.open('알림', "아이디를 입력해주세요.");
					return false;
				}
				
				if(pw == "" || pw == null){
					$message.open('알림', "비밀번호를 입력해주세요.");
					return false;
				}
				
				return true;
			}
		
	};
	
	$loginMain.request = {
			
			/**
			 * 
			 * @name         : doReqLogin
			 * @description  : 로그인 인증을 요청한다.
			 * @date         : 2018. 06. 29. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param url    : url정보
			 * @param params : 파라미터 정보
			 */
			doReqLogin : function(url, params){
				var options = {
					isBeforSend : true,
					params : params
				};
				$ajax.requestApi(url, options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							location.href = contextPath + "/view/index";
							break;
						case -200: //다중접속
							$message.open("알림", res.errMsg, function() {
								$loginMain.request.doReqLogin(url, params);
							});
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
						
				});
				
			}	
	};

	$loginMain.event = {
		setUIEvent : function() {
			
			//이용약관
			$("#terms").on("click", function(e) {
				$loginMain.ui.showTermsPopup();
			});
			
			//로그인
			$("#login").on("click", function() {
				$loginMain.ui.doLogin();
			});
			
			//회원가입
			$("#register").on("click", function() {
				$signUp.ui.showSignUpBox();
			});
			
			//아이디 찾기
			$("#idFind").on("click", function() {
				$findIdAndPwd.ui.showFindIdPoup();
			});
			
			//비밀번호 찾기
			$("#pwFind").on("click", function() {
				$findIdAndPwd.ui.showFindPwdPoup();
			});
			
			//아이디 입력 validation 체크
			$("#id").keyup(function(e){
				var value = $(e.target).val();
				var regExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
				switch(e.keyCode) {
					case 8:
					case 9:
					case 37:
					case 39:
					case 45:
						return;
					default:
						value = value.replace(regExp,'');
						$(e.target).val(value)
						break;
				}
			});
			
			//아이디/비밀번호 입력창 엔터시 로그인 수행
			$("#id, #pwd").keydown(function(e){
				if (e.keyCode == 13) {
					$loginMain.ui.doLogin();
				}
			});	
		}
	};

}(window, document));
