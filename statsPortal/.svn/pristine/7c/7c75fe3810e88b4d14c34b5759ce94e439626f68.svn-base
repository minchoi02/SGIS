var statsPotalDomain = "//sgis.kostat.go.kr";
var developApiPath = "//sgis.kostat.go.kr/developer";

document.addEventListener("DOMContentLoaded", function () {
	createExternalForm();
	document.getElementById('authFrame').setAttribute("src", "/html/authorization/getAuth.jsp");
});
/*
$(document).ready(function () {
	createExternalForm();
	$("#authFrame").attr("src", "/html/authorization/getAuth.jsp");
});
*/
/** ********* 30분 미사용시 로그아웃 ********* */
function receiveMessage( e ){
	if( e.data === "closed" && e.origin === "https://kosis.kr" ){
		alert("30분동안 미사용으로 로그아웃되었습니다.");
		memberLogout();
	}
}
/** ********* 회원가입 Start ********* */
function memberRegister(curUrl) {
	srvLogWrite("A0", "02", "06", "00", "", "");
	var frame = document.getElementById("registerFrame");
	var doc = frame.contentWindow || frame.contentDocument;
	doc.reqMemberRegister();
}
/** ********* 회원가입 End ********** */
/** ********* 회원탈퇴 Start ********* */
function memberUnRegister() {
	var frame = document.getElementById("unRegisterFrame");
	var doc = frame.contentWindow || frame.contentDocument;
	doc.reqMemberUnRegister();
}
/** ********* 회원탈퇴 End ********** */
/** ********* 로그인 Start ********* */
function memberLogin(curUrl) {
	var frame = document.getElementById("loginFrame");
	var doc = frame.contentWindow || frame.contentDocument;
	doc.reqMemberLogin(curUrl);
}
/** ********* 로그인 End ********** */
/** ********* 로그아웃 Start ********* */
function memberLogout(curUrl) {
	if (curUrl == undefined ||  curUrl.length == 0) {
		curUrl = "/view/index";
	}
	logoutCurUrl =  curUrl;

	//기존회원일 경우, 개발자사이트 로그아웃
	logoutDeveloperProcess();
	
	//통합회원/기존회원 체크필요
	//통합회원일 경우
	var frame = document.getElementById("logoutFrame");
	var doc = frame.contentWindow || frame.contentDocument;
	doc.reqMemberLogout(curUrl);
}

function memberLogout2(cur_url, sys_url, sys_cd, login_yn, sid_ip_addr, ssn_info, usr_sn, usr_id, usr_pw) {		//익스에서 iframe에서 동작할 경우 오작동이 발생함
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

/** ********* 로그아웃 End ********** */
/** ********* 기존/통합로그인 선택 Start ********* */
function goSelectLogin(curUrl) {
	srvLogWrite("A0", "02", "07", "00", "", "");
	if (curUrl == undefined ||  curUrl.length == 0) {
		curUrl = "/view/index";
	}
	
	if (curUrl.indexOf("thematicMap") != -1) {
		window.parent.location.href = "/view/member/login_new?returnPage=" + encodeURI(curUrl);
	}else {
		window.location.href = "/view/member/login_new?returnPage=" + encodeURI(curUrl);
	}
	
	
}
/** ********* 기존/통합로그인 선택 End ********* */
/** ********* 회원정보수정 Start ********* */
function memberModify() {
	var frame = document.getElementById("modifyFrame");
	var doc = frame.contentWindow || frame.contentDocument;
	doc.reqMemberModify();
}
/** ********* 기존/통합로그인 선택 End ********* */
/** ********* 회원정보수정 Start ********* */
function goExternalUrlLink(url) {
	$("#externalLinkForm").find($("#SYS_URL")).val(url);
	$("#externalLinkForm").submit();
}
/** ********* 회원정보수정 End ********* */
function createExternalForm() {
	console.log("createExternalForm();");
	var html = "";
	html += "<form action='//kosis.kr/oneid/cmmn/login/ConnectStatItgrSvr.do' method='post' id='externalLinkForm' name='externalLinkForm' target='_blank'>";
	html += "<input type='hidden' id='SYS_URL' name='SYS_URL'/>";	
	html += "<input type='hidden' id='SYS_CD' name='SYS_CD' value='S'/>";	
	html += "</form>";
	$("body").append(html);
}

//세션받아오기
function setSession (auth) {
	AuthInfo = auth;
	var html = "";
	var curLogoutUrl = "view/index";
	var developerSite = 'window.open("/developer/html/home.html")';
	var eduSite = 'window.open("/edu/jsp/main.jsp")';
	var curLoginUrl = location.href.replace('http:', '');//.replace(statsPotalDomain, '');
	if (auth.authStatus) {
		
		
		html += "<li><a href='javascript:logWriteAndMove(\"A0\", \"02\", \"01\", \"00\", \"\", \"\", \"/jsp/english/index.jsp\", false);' tabindex='10'>English</a></li>";
		html += "<li><a href='javascript:logWriteAndMove(\"A0\", \"02\", \"02\", \"00\", \"\", \"\", \"/edu/jsp/main.jsp\", false);' tabindex='4'>SGIS에듀</a></li>";
		html += "<li><a href='javascript:logWriteAndMove(\"A0\", \"02\", \"03\", \"00\", \"\", \"\", \"/developer/html/main.html\", false);' tabindex='5'  target='_self'>개발지원센터</a></li>"; //개발지원센터 개편으로 url 변경
		
		//mng_s 20201021 이진호 , 기존 팝업식 사이트맵을 사용 안하고 이제 도움말>사이트맵 으로 이동
		//html += "<li><a id='site_map_btn' href='javascript:void(0);' tabindex='6'>사이트맵</a></li>";
		html += "<li><a href='javascript:logWriteAndMove(\"A0\", \"02\", \"04\", \"00\", \"\", \"\", \"/view/newhelp/us_help_50_0\", false);' tabindex='6'>사이트맵</a></li>";
		//mng_e 20201021 이진호
		
		html += "<li><a href='javascript:logWriteAndMove(\"A0\", \"02\", \"05\", \"00\", \"\", \"\", \"/view/newhelp/us_help_10_0\", false);' tabindex='7'>도움말</a></li>";
		html += "<li><a href='/view/mypage/mypage' tabindex='8'>마이페이지</a></li>";
		html += "<li><a href='javascript:memberLogout();' tabindex='9'>로그아웃</a></li>";
	}
	else {
		html += "<li><a href='javascript:logWriteAndMove(\"A0\", \"02\", \"01\", \"00\", \"\", \"\", \"/jsp/english/index.jsp\", false);' tabindex='10'>English</a></li>";
		html += "<li><a href='javascript:logWriteAndMove(\"A0\", \"02\", \"02\", \"00\", \"\", \"\", \"/edu/jsp/main.jsp\", false);' tabindex='4'>SGIS에듀</a></li>";
		html += "<li><a href='javascript:logWriteAndMove(\"A0\", \"02\", \"03\", \"00\", \"\", \"\", \"/developer/html/main.html\", false);' tabindex='5'  target='_self'>개발지원센터</a></li>"; //개발지원센터 개편으로 url 변경
		
		//mng_s 20201021 이진호 , 기존 팝업식 사이트맵을 사용 안하고 이제 도움말>사이트맵 으로 이동
		//html += "<li><a id='site_map_btn' href='javascript:void(0);' tabindex='6'>사이트맵</a></li>";
		html += "<li><a href='javascript:logWriteAndMove(\"A0\", \"02\", \"04\", \"00\", \"\", \"\", \"/view/newhelp/us_help_50_0\", false);' tabindex='6'>사이트맵</a></li>";
		//mng_e 20201021 이진호
		
		html += "<li><a href='javascript:logWriteAndMove(\"A0\", \"02\", \"05\", \"00\", \"\", \"\", \"/view/newhelp/us_help_10_0\", false);' tabindex='7'>도움말</a></li>";
		html += "<li><a href='javascript:memberRegister();' tabindex='8'>회원가입</a></li>";
		html += "<li><a title='\"자료신청 및 대화형 통계지도의 나의 데이터, 개발지원센터의 체험하기\" 서비스 이용시 로그인이 필요합니다.' href='javascript:goSelectLogin(\""+curLoginUrl+"\");' tabindex='9'>로그인</a></li>";
	}
	
	
	//mng_s 20201021 이진호 , 기존 팝업식 사이트맵을 사용 안하고 이제 도움말>사이트맵 으로 이동
	//$("body").on("click","#site_map_btn" ,function(){
		//$.ajax({
		    //url: "/SgisProject_Publisher/html/site-map/siteMap-popup.html",
		    //success: function (data) { 
		    	//$('body').append(data); $(".subMenu").css({"display" : "none"}) 
		    	//srvLogWrite("A0", "02", "04", "00", "", "");
		    //},
		    //dataType: 'html'
		//});
	//});
	//mng_e 20201021 이진호
	
	$(".headerEtc").html(html);
	
	$('.headerEtc a').unbind().bind("click",function(){
		var title = 'Header 메뉴 클릭 로그';
		var zoomLevel = '00'; 
		var adm_nm = '없음';
		var headerEtc = $(this).text();
		if(headerEtc == '회원가입'){
			apiLogWrite2('F0', 'F00', title, headerEtc, zoomLevel, adm_nm);			
		}else if(headerEtc == '로그인'){
			apiLogWrite2('F0', 'F01', title, headerEtc, zoomLevel, adm_nm);
		}else if(headerEtc == '사이트맵'){
			apiLogWrite2('F0', 'F02', title, headerEtc, zoomLevel, adm_nm);
		}else if(headerEtc == '도움말'){
			apiLogWrite2('F0', 'F03', title, headerEtc, zoomLevel, adm_nm);
		}else if(headerEtc == '개발지원센터'){
		apiLogWrite2('F0', 'F04', title, headerEtc, zoomLevel, adm_nm);
		}
	});
	
	// 함수 존재유무 판단
	if ($.isFunction(window.getSession)) {
		// 호출 페이지에 getSession 함수가 있으면 호출
		getSession(auth);
	}
}

function sessionInfo () {
	alert("sessionInfo");
	$.ajax({
		method : "POST",
		async :  true,
		url : contextPath + "/ServiceAPI/auth/sessionInfo.json",
		success : function(res){
			var result = res.result;
			if (res.errCd == "0") {
				var Authobj;
				if (result.sessionId == null) {
					Authobj = {
						authStatus : false
					}
				}
				else {
					Authobj = {
						authStatus : true
					}
				}
				
				AuthInfo = Authobj;
				setSession();
			}
			else {
				messageAlert.open("알림", res.errMsg);
			}
		},error : function(){
			console.log(arguments)
		}
	});
}

function logoutDeveloperProcess () {
	
	$.ajax({
		method : "POST",
		async :  false,
		//url : developApiPath + "/ServiceAPI/member/logout.json",
		url : "https://dev.kostat.go.kr/ServiceAPI/member/logout.json",
		success : function(res){
			
		}
	});
}