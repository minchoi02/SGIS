/**
 * 로그인에 관한 메소드
 * 
 * history : (주)유코아시스템, 1.0, 2016/03/21  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	$(document).ready(function() {
		$(".Login form").heumValidation({isReturnCallback:true},function(errors){
			if(errors.length>0){
				var labelName = "값을";
				if($(errors[0].element).data("error-message")){
					labelName = $(errors[0].element).data("error-message");
				}
				messageAlert.open("알림", labelName+errors[0].message,function done(){
					$(errors[0].element).focus();
				});
				return false;
			}else{
				if($("#sso-login").length>0){
					var result = false;
					$.ajax({
						url : contextPath + "/kosis/pwencoding.json",
						type:"POST",
						data: {
							pw : $("#sso-pw").val()
						},
						async: false,
						dataType:"json",
						success: function(res){
							if(res.errCd=="0"){
								if($("input[name=save-me]:checked").is(":checked")){
									$("input[name=SYS_URL]").val($("input[name=SYS_URL]").val().split("?")[0]+"?save-me="+$("input[name=save-me]:checked").val());
								}
								$("#sso-login").find($("input[name=USR_PW]")).remove();
								$("#sso-login").append($("<input/>",{"type":"hidden","name":"USR_PW","value":res.result.pw}));
								result = true;
							}else{
								messageAlert.open("알림",res.errMsg);
							}
						},
						error: function(xhr, status, errorThrown) {
							messageAlert.open("알림",errorMessage);
						}
					});
					return result;
				}else{
					var result = false;
					$.ajax({
						url : contextPath + "/local/check.json",
						type:"POST",
						data: {
							id : $("#member_id").val()
						},
						async: false,
						dataType:"json",
						success: function(res){
							if(res.errCd=="0"){
								if(res.result.ITGR_CHK_VAL=="Y"){
									messageAlert.open("알림",res.result.ITGR_CHK_MSG);
								}else{
									result = true;
								}
							}else{
								messageAlert.open("알림",res.errMsg);
							}
						},
						error: function(xhr, status, errorThrown) {
							messageAlert.open("알림",errorMessage);
						}
					});
					return result;
				}
			}
		});
	});
}(window, document));