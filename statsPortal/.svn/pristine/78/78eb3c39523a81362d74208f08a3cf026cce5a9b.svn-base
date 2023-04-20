if(location.hostname === "localhost" || location.hostname === "127.0.0.1") {
	//로컬일 때 
	
}else {
	if(document.location.protocol =="http:"){
		document.location.href = document.location.href.replace('http:', 'https:')
	}
}

$(document).ready(function() {

	//Esc 버튼 눌렀을 때, 팝업 닫기 (수업하기 퀴즈, sgis활용하기, 교사등록 적용)
	$(document).keydown(function(event){
    	if(event.keyCode == 27 || event.which == 27){
    		$(".popup").removeClass("on");
    	}
    })
    
});

var AuthInfo; // 세션정보
if (!AuthInfo) {
	AuthInfo = {
		authStatus : false
	}
}
function logWriteAndMove(linkUrl, cd1, cd2, cd3, cd4, detCd, param, newWindowYn){
	srvLogWrite(cd1,cd2,cd3,cd4,detCd,param);
	if(newWindowYn == true){
		console.log("popup:::   "+ linkUrl);
		window.open(linkUrl);
	}else{
		console.log("link:::   "+ linkUrl)
		location.href = linkUrl ;
	}
}

/** SRVLog 추가 djlee_ 20220119 start**/
function srvLogWrite(fClass1Cd, fClass2Cd, fClass3Cd, fClass4Cd, detCd, param) {
	console.log("edu-srvLog::: "+ fClass1Cd + ",  " + fClass2Cd + ",  " + fClass3Cd + ",  " + fClass4Cd + ",  " + detCd );
	var sopPortalSRVLogWriteObj = new sop.portal.srvLogWrite.api();
	sopPortalSRVLogWriteObj.addParam("fClass1Cd", fClass1Cd);
	sopPortalSRVLogWriteObj.addParam("fClass2Cd", fClass2Cd);
	sopPortalSRVLogWriteObj.addParam("fClass3Cd", fClass3Cd);
	sopPortalSRVLogWriteObj.addParam("fClass4Cd", fClass4Cd);
	if(detCd != null && detCd != ''){
		sopPortalSRVLogWriteObj.addParam("detCd", detCd);
	}
	if(param != null && param != ''){
		sopPortalSRVLogWriteObj.addParam("param", param);
	}
	sopPortalSRVLogWriteObj.request({
		method : "POST",
		async : true,
		url : contextPath + "/ServiceAPI/common/SRVLogWrite.json"
	});
}
/** SRVLog 추가 이다정_ 20220119 end**/

/** ********* 기존/통합로그인 선택 Start ********* */
function goSelectLogin() {
	srvLogWrite('T0','02','02','06','','');

	var curUrl = window.location.href;
	// alert(curUrl);
	if (curUrl.indexOf("edu") != -1) {
		window.parent.location.href = "/view/member/login_new?returnPage="
				+ encodeURI(curUrl);
	} else {
		window.location.href = "/view/member/login_new?returnPage="
				+ encodeURI(curUrl);
	}
}
/** ********* 기존/통합로그인 선택 End ********* */
/** ********* 로그아웃 Start ********* */
function memberLogout() {
	srvLogWrite('T0','02','02','07','','');

	//로그아웃 시, index로 이동
	curUrl = "/view/edu/index";

	// 기존회원일 경우, 개발자사이트 로그아웃
	logoutDeveloperProcess();

	// 통합회원/기존회원 체크필요
	// 통합회원일 경우
	var frame = document.getElementById("logoutFrame");
	var doc = frame.contentWindow || frame.contentDocument;
	doc.reqMemberLogout(curUrl);
	//location.reload();
}

function memberLogout2(cur_url, sys_url, sys_cd, login_yn, sid_ip_addr, ssn_info, usr_sn, usr_id, usr_pw) {		//익스에서 iframe에서 동작할 경우 오작동이 발생함
	srvLogWrite('T0','02','02','07','','');
	location.href = "https://kosis.kr/oneid/cmmn/login/ActionLogout.do?CUR_URL=" + cur_url
		+ "&SYS_URL=" + sys_url 
		+ "&SYS_CD=" + sys_cd
		+ "&LOGIN_YN=" + login_yn
		+ "&SID_IP_ADDR=" + sid_ip_addr
		+ "&SSN_INFO=" + ssn_info
		+ "&USR_SN=" + usr_sn
		+ "&USR_ID=" + usr_id
		+ "&USR_PW=" + usr_pw;
}

function logoutDeveloperProcess() {
	$.ajax({
		url : "/ServiceAPI/member/logout.json",
		type : 'POST',
		async : false,
		dataType : 'json'
	}).success(function(res) {
		var result = res.result;

		if (res.errCd == "0") {
			alert("로그아웃 되었습니다.");

			setSession(AuthInfo);

		} else {
			// alert(res.errCd);
		}
	}).fail(function(status) {
		console.log("onFail   ....");
	})
}

function setSession(auth) {
	var html = "";
	if (auth.authStatus) {
		html = "<a href='javascript:memberLogout();'>로그아웃</a>";
	} else {
		html = "<a href='javascript:goSelectLogin();'>로그인</a>";
	}
	$(".loginWrap").html(html);
}

function sessionInfo() {
	$.ajax({
		url : '/ServiceAPI/edu/sessionInfo.json',
		type : 'POST',
		dataType : 'json'
	}).success(function(res) {
		var result = res.result;

		if (res.errCd == "0") {
			var Authobj;
			if (result.member_id != null) {
				Authobj = {
					authStatus : true,
					member_id  : result.member_id,
					ss_grant_state : result.ss_grant_state
				}
			} else {
				Authobj = {
					authStatus : false
				}
			}
			AuthInfo = Authobj;
			setSession(AuthInfo);

		} else {
			//alert(res.errCd);
		}
	}).fail(function(status) {
		console.log("onFail   ....");
	})

}


// popup
$(function() {
	$(".popup .btnClose").click(function() {
		$(".popup").removeClass("on");
	});

	$(".cmntWrap .btnClose").click(function() {
		$(".cmntWrap").removeClass("on");
	});

	$("button").click(function() {
		if ($(this).text() == "닫기" || $(this).text() == "취소") {
			$(".popup").removeClass("on");
		}
	});
});

// select box
$(function() {
	
	$(".select ul li").click(function() {
		$(this).closest('.select').find("span").text($(this).text());
		$(this).closest('.select').find("input").val($(this).attr("id"));

		$(this).closest('.select').find("input").prop("checked", false);

	});

});

/*	공통 알럿 DIV
 * 	messageAlert.open(제목, 내용, 확인버튼콜백(options), 취소버튼콜백(options))
 */
var messageAlert = {
		open : function (title, message, okFnc, cancelFnc, options) {
			//2017.10.18 [개발팀] 중복 마스킹 삭제
			if ($(".mAlert").is(":visible")) {
				$(".mAlert").remove();
			}
			var alertId = makeRandomThirtySevenDigitString();
			var html = "";
			html +=	'<div class="popupWrapper mAlert" id="wrapper_'+alertId+'">';
			html += 	'<div class="alertPopupWrapper" id="popup_'+alertId+'">';
			html +=			'<div class="topbar">';
			html +=				'<span>'+title+'</span>';
			html +=				'<a href="#" id="myXbtn_'+alertId+'">닫기</a>'; //2017.12.21 [개발팀] 접근성 시정조치
			html +=			'</div>';
			html +=			'<div class="popContents">';
			html +=				'<div class="messageBox">' + message + '</div>';
			html +=				'<div class="btnBox">';
			html +=					'<a href="#" id="okBtn_'+alertId+'" class="btnStyle01">확인</a>'; //2017.12.21 [개발팀] 접근성 시정조치
			
			if(cancelFnc != undefined) {
				html +=				'<a href="#" id="cancelBtn_'+alertId+'" class="btnStyle01">닫기</a>';	 //2017.12.21 [개발팀] 접근성 시정조치
			}
			
			html +=				'</div>';
			html +=			'</div>';
			html +=		'</div>';
			html +=	'</div>';
			$("body").append(html);
			
			var d = document;
			var h = d.body.clientHeight;
			var y = (window.pageYOffset) ?
		            	window.pageYOffset : (d.documentElement && d.documentElement.scrollTop) ?
		                d.documentElement.scrollTop : (d.body) ? d.body.scrollTop : 0;
			/*$("#popup_"+alertId).css("margin-top", ((h/2)+y) - 70);*/
			$("#popup_"+alertId).css("margin-top", (h/2) - 70);
			$(".popupWrapper").css("height", d.body.scrollHeight);
			
			$("#okBtn_"+alertId).click(function() {
				messageAlert.defaultClose(alertId);
				if (okFnc != undefined) {
					okFnc.call(this, options);
				}
			});
			
			$("#cancelBtn_"+alertId).click(function() {
				messageAlert.defaultClose(alertId);
				if (cancelFnc != undefined) {
					cancelFnc.call(this, options);
				}
			});
			
			$("#myXbtn_"+alertId).click(function() {
				messageAlert.defaultClose(alertId);
				if (cancelFnc != undefined) {
					cancelFnc.call(this, options);
				}
			});
			
			$(window).resize(function() {
				$(window).off("resize");
				var d = document;
				var h = d.body.clientHeight;
				var y = (window.pageYOffset) ?
			            	window.pageYOffset : (d.documentElement && d.documentElement.scrollTop) ?
			                d.documentElement.scrollTop : (d.body) ? d.body.scrollTop : 0;
				$("#popup_"+alertId).css("margin-top", ((h/2)+y) - 70);
				$(".popupWrapper").css("height", d.body.scrollHeight);
			});
			
		},
		
		defaultClose : function (alertId) {
			$("#wrapper_"+alertId).remove(); 
		}
};

//37자리 아이디 생성 (Random10 + yyyyMMddHHmmssSSS + Random10)
function makeRandomThirtySevenDigitString () {
	var front = makeRandomDigitString(10);
	var currentdate = new Date();
	var timestamp = makeStamp(currentdate);
	var end = makeRandomDigitString(10);
	
	return front + timestamp + end;
}

function makeRandomDigitString (x) {
	var s = "";
	while (s.length < x && x > 0) {
		var r = Math.random();
		s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
	}
	return s;
}

//Timstamp 만드는 함수
function makeStamp (d) { // Date d
	var y = d.getFullYear(), M = d.getMonth() + 1, D = d.getDate(), h = d.getHours(), m = d.getMinutes(), s = d.getSeconds(), ss = d.getMilliseconds(),

	pad = function (x) {
		x = x + '';
		if (x.length === 1) {
			return '0' + x;
		}
		return x;
	};
	return y + pad(M) + pad(D) + pad(h) + pad(m) + pad(s) + pad(ss);
}

function makeSchoolGrade () {
	if("ele" == $("#school_grade").val()){ schoolGradeCd = 'E';
	}else if("mid" == $("#school_grade").val()){ schoolGradeCd = 'M';
	}else if("high" == $("#school_grade").val()){ schoolGradeCd = 'H';
	}
}