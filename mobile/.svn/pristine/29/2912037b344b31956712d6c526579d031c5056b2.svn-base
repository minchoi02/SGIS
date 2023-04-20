(function(W, D) {

	W.$login = W.$login || {};

	// 페이지 로드 이벤트
	$(document).ready(function() {
		//페이지 기본 이벤트 등록
		$login.event.setUIEvent();
		
		//실패 인 경우
		if(gv_err_yn == "Y") {
			//자동로그인 취소
			common_remove_cookie("loginSaveAutoLogin");
			
			//실패 메세지
			common_alert(gv_err_msg);
		}
		
		//내 아이디 저장 체크 여부
		if(common_get_cookie("loginSaveId") == "true") {
			//체크
			$("#loginSaveId").prop("checked", true);
			
			//쿠키값 가져오기
			var lv_id = common_get_cookie("loginSaveIdValue");
			
			//쿠키 갱신(365일)
			common_set_cookie("loginSaveId","true",365);
			common_set_cookie("loginSaveIdValue",lv_id,365);
			
			$("#loginId").val(lv_id);
		}
		
		//자동로그인 체크 여부
		if(common_get_cookie("loginSaveAutoLogin") == "true") {
			//화면 전체 숨김
			$(".loginWrap").hide();
			
			//체크
			$("#loginSaveAutoLogin").prop("checked", true);
			
			//쿠키값 가져오기
			var lv_id = common_get_cookie("loginSaveAutoLoginId");
			var lv_pass_encryption = common_get_cookie("loginSaveAutoLoginPassEncryption");
			
			//쿠키 갱신(365일)
			common_set_cookie("loginSaveAutoLogin","true",365);
			common_set_cookie("loginSaveAutoLoginId",lv_id,365);
			common_set_cookie("loginSaveAutoLoginPassEncryption",lv_pass_encryption,365);
			
			//로그인 처리
			var $form = $("<form/>", {
				action : "//kosis.kr/oneid/cmmn/login/ActionLoginMob.do",
				method : "post"
			});
			//아이디
			$form.append( 
				$("<input>", {
					type : "hidden",
					name : "USR_ID",
					value : lv_id
				})
			);
			//비밀번호
			$form.append( 
				$("<input>", {
					type : "hidden",
					name : "USR_PW",
					value : lv_pass_encryption
				})
			);
			$form.append( 
				$("<input>", {
					type : "hidden",
					name : "SYS_CD",
					value : "S"
				})
			);
			$form.append( 
				$("<input>", {
					type : "hidden",
					name : "CUR_URL",
					value : contextPath+"/m2019/login/loginInfoMap.sgis"
				})
			);
			$form.append( 
				$("<input>", {
					type : "hidden",
					name : "SYS_URL",
					value : gv_full_context_path+"/m2019/login/loginprocess.sgis"
				})
			);
			$form.append( 
				$("<input>", {
					type : "hidden",
					name : "SID_IP_ADDR",
					value : ""
				})
			);
			$form.append( 
				$("<input>", {
					type : "hidden",
					name : "SSN_INFO",
					value : ""
				})
			);
			$("body").append($form);
			$form.submit();
		}
		
		//아이디 포커스
		$("#loginId").focus();
		$("#loginId").select();
	});

	// 페이지 UI 변수 및 함수 선언
	$login.ui = {
		return_page : gv_return_page, // 리턴페이지
		
		/**
		 * @name : login
		 * @description : 로그인
		 * @date : 2019.07.03
		 * @author : 김남민
		 * @history :
		 * @param :
		 */
		login : function() {
			var lv_return = true;
			var lv_id = $("#loginId").val();
			var lv_pass = $("#loginPass").val();
			var lv_pass_encryption = ""; 
			var lv_save_id_check = $("#loginSaveId").is(":checked");
			var lv_save_auto_login_check = $("#loginSaveAutoLogin").is(":checked");
			
			//Validation
			if(lv_id == "") {
				common_alert("아이디를 입력해 주십시오.", function() {
					$("#loginId").focus();
				});
				return false;
			}
			if(lv_pass == "") {
				common_alert("비밀번호를 입력해 주십시오.", function() {
					$("#loginPass").focus();
				});
				return false;
			}
			
			//비밀번호 암호화
			// ajax 시작
			$.ajax({
				url : contextPath + "/kosis/pwencoding.json",
			    type: 'post',
			    dataType : 'json',
			    async: false,
			    data: {
			    	pw : lv_pass
			    }
			}).done(function (res) { // 완료
				if(res.errCd == "0") {
					lv_pass_encryption = res.result.pw;
				}else if(res.errCd == "-401") {
					common_alert(res.errMsg);
					lv_return = false;
				}else{
					common_alert(res.errMsg);
					lv_return = false;
				}
			}).fail(function (res) { // 실패
				common_alert(errorMessage);
				lv_return = false;
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				//common_loading(false);
			});
			// ajax 끝
			if(lv_return == false) {
				return false;
			}
			
			//내 아이디 저장 체크
			if(lv_save_id_check == true) {
				//쿠키 저장(365일)
				common_set_cookie("loginSaveId","true",365);
				common_set_cookie("loginSaveIdValue",lv_id,365);
			}
			else {
				common_remove_cookie("loginSaveId");
				common_remove_cookie("loginSaveIdValue");
			}
			
			//자동로그인 체크
			if(lv_save_auto_login_check == true) {
				//쿠키 저장(365일)
				common_set_cookie("loginSaveAutoLogin","true",365);
				common_set_cookie("loginSaveAutoLoginId",lv_id,365);
				common_set_cookie("loginSaveAutoLoginPassEncryption",lv_pass_encryption,365);
			}
			else {
				common_remove_cookie("loginSaveAutoLogin");
				common_remove_cookie("loginSaveAutoLoginId");
				common_remove_cookie("loginSaveAutoLoginPassEncryption");
			}
			
			var $form = $("<form/>", {
				action : "https://kosis.kr/oneid/cmmn/login/ActionLoginMob.do",
				method : "post"
			});
			//아이디
			$form.append( 
				$("<input>", {
					type : "hidden",
					name : "USR_ID",
					value : lv_id
				})
			);
			//비밀번호
			$form.append( 
				$("<input>", {
					type : "hidden",
					name : "USR_PW",
					value : lv_pass_encryption
				})
			);
			/*if(lv_save_id_check == true) {
				$form.append( 
					$("<input>", {
						type : "hidden",
						name : "save-me",
						value : "on"
					})
				);
			}*/
			$form.append( 
				$("<input>", {
					type : "hidden",
					name : "SYS_CD",
					value : "S"
				})
			);
			$form.append( 
				$("<input>", {
					type : "hidden",
					name : "CUR_URL",
					value : contextPath+"/m2019/login/loginInfoMap.sgis"
				})
			);
			$form.append( 
				$("<input>", {
					type : "hidden",
					name : "SYS_URL",
					value : gv_full_context_path+"/m2019/login/loginprocess.sgis"
				})
			);
			$form.append( 
				$("<input>", {
					type : "hidden",
					name : "SID_IP_ADDR",
					value : ""
				})
			);
			$form.append( 
				$("<input>", {
					type : "hidden",
					name : "SSN_INFO",
					value : ""
				})
			);
			$("body").append($form);
			$form.submit();
			
			return true;
		},
		
		/**
		 * @name : loginSaveId
		 * @description : 아이디저장 체크
		 * @date : 2019.07.03
		 * @author : 김남민
		 * @history :
		 * @param :
		 */
		loginSaveId : function() {
			
		},
		
		/**
		 * @name : loginSaveAutoLogin
		 * @description : 자동로그인 체크
		 * @date : 2019.07.03
		 * @author : 김남민
		 * @history :
		 * @param :
		 */
		loginSaveAutoLogin : function() {
			
		},
		
		/**
		 * @name : loginPcVerMovement
		 * @description : PC 버전 이동
		 * @date : 2019.07.03
		 * @author : 김남민
		 * @history :
		 * @param :
		 */
		loginPcVerMovement : function() {
			location.href="/view/index?param=0";
		}
	};
	
	$login.event = {
		/**
		 * @name : setUIEvent
		 * @description : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 * @date : 2019.07.03
		 * @author : 김남민
		 * @history :
		 */
		setUIEvent : function() {
			// 로그인
			$(document).on("click", "#login", function() {
				$login.ui.login();
			});
			
			// PC 버전 이동
			$(document).on("click", "#loginPcVerMovement", function() {
				$login.ui.loginPcVerMovement();
			});
			
			// 뒤로 가기
			$(document).on("click", "#loginIdBack", function() {
				history.back();
			});
			
			//로그인 엔터키
			$(document).on("keydown", "#loginId", function(key) {
				if (key.keyCode == 13) {
					//비밀번호 포커스
					$("#loginPass").focus();
					$("#loginPass").select();
				}
			});
			
			//비밀번호 엔터키
			$(document).on("keydown", "#loginPass", function(key) {
				if (key.keyCode == 13) {
					//로그인
					$login.ui.login();
				}
			});
		}
	};
	
}(window, document));