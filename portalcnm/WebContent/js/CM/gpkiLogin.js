/**
* GPIK인증후 관리자 로그인에 관한 메소드
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
		var gpki_key = $("#gpki_key").val();		
		var manager_id = $("#manager_id").val();
		var manager_nm = $("#manager_nm").val();
		var name = manager_nm.replace(/[0-9]/g, "");
		gpkiLogin.gpkiLogin(gpki_key, manager_id, name);		
	});
	
	W.$gpkiLogin = W.$gpkiLogin || {};
	
	gpkiLogin = {			
			/*********** GPKI 관리자 로그인 프로세스 Start **********/
			gpkiLogin : function(gpki_key, manager_id, name) {				
				    var regObj = new sop.openApi.gpkiLogin.api();
				    regObj.addParam("gpki_key", gpki_key);
				    regObj.addParam("manager_id", manager_id);
				    regObj.addParam("manager_nm", name);				    
				    regObj.request({
				        method : "POST",
				        async : false,
				        url : contextPath+"/ServiceAPI2/CM/GpkiLogin.json"
				    });				
			}
			/*********** GPKI 관리자 로그인 프로세스 End **********/	
	};	
	/*********** GPKI 관리자 로그인 프로세스 Start **********/
	(function() {
	    $class("sop.openApi.gpkiLogin.api").extend(sop.cnm.absAPI).define({
	        onSuccess : function(status, res) {
	        	var result = res.result;	        	
	            if(res.errCd == "0") {	            
	            location.href = contextPath+"/html/MN/APIStat.html";
	            } else {
		location.href = contextPath+"/html/CM/login.jsp";
	            	alert(res.errMsg);
	            }
	        },
	        onFail : function(status) {
	            alert("에러발생");
		location.href = contextPath+"/html/CM/login.jsp";
	        }
	    });
	}());
	/*********** GPKI 관리자 로그인 프로세스 End **********/
}(window, document));