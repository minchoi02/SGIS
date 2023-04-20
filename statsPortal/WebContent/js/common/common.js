var contextPath = ""; // 포탈 Context

//운영 갈때만 프록시 사용
//var sgis4thApiPath = "/view/administStats/proxy?" + "http://link.kostat.go.kr/view/kosisApi/TotsurvStatData.do?";
//var sgis4thApiPath = "/view/administStats/proxy?" + "http://link.kostat.go.kr/view/kosisApi/TotsurvStatData.do?";

//개발시에는 프록시 사용안함
//var sgis4thApiPath = "/view/kosisApi/TotsurvStatData.do?";

//var sgis4thApiPath = "/view/totSurv/proxy?" + "http://localhost/view/kosisApi/TotsurvStatData.do?";
var sgis4thApiPath = "/view/totSurv/proxy?" + "http://link.kostat.go.kr/view/kosisApi/TotsurvStatData.do?";
//var sgis4thApiPath = "/view/kosisApi/TotsurvStatData.do";
//var sgis4thApiPath = "/view/kosisApi/TotsurvStatData.do";
//========================== openApiPath ========================================
var openApiPath = "//sgisapi.kostat.go.kr";
//var openApiPath = "//211.34.90.51:8082";
//var openApiPath = "//sgis.neighbor21.co.kr:8080/SOPOpenAPI";
//var openApiPath = "//localhost:8080/SOPOpenAPI";
//var openApiPath = "//localhost:8080/SOPOpenAPI";
//var openApiPath = "//220.123.99.82:9090";
//========================== kosisApiPath ========================================// KOSIS API 주소 (KOSIS 서버)
//시범서비스, 운영개발용
//var kosisApiPath = "//211.34.90.51:8082";

//2016. 03. 22 j.h.Seok
//로컬 테스트용
var kosisApiPath = "//211.34.90.51:8082";
//var kosisApiPath = "//analysis.kostat.go.kr";
//var kosisApiPath = "//localhost:8080/SOPOpenAPI";

//========================== developApiPath ========================================
//var developApiPath = "//sgis.kostat.go.kr/developer";
//var developApiPath = "//sgis.neighbor21.co.kr:8080/developer";
var developApiPath = "//localhost:8080/developer";

//========================== statsPotalDomain ========================================
//var statsPotalDomain = "//sgis.kostat.go.kr";
//var statsPotalDomain = "//sgis.neighbor21.co.kr:8080";
var statsPotalDomain = "//localhost:8080";

var captureDomain = "http://localhost:10080";
//var captureDomain = "http://sgis.neighbor21.co.kr:10080";

//========================== 데이터년도 및 경계년도 설정 =============================
/*var dataYear = "2016";
var companyDataYear = "2016";
var farmYear = "2016";		//20180208

var bndYear = "2016"; */
//mng_s 20211019 이진호 2021년 센서스 데이터 적용 / 농립어업도 같이
//2019년 센서스 데이터 적용 leekh start
var dataYear = "2020";					//센서스
var companyDataYear = "2019";			//사업체
var farmYear = "2020";				 	//가구
var bndYear = "2021"; 					//경계	//2019로 반영해야함
//2019년 센서스 데이터 적용 leekh end

//김건민 start
var apvpermymd = "20220101"; //mng_s 20220112 김건민(지자체인허가 데이터 2021년 4분기 추가 변경)
var ecoDataYear = "2015"; // mng_s 20190426 김건민 (경제총조사 현황)
//김건민 end

//========================== apiKey info =============================
var apiKey = "NWU2NjUxODYzMWQyMTM0MGQ5NWRhMTE3ZjZjZGE0ODc=";
//====================================================================

//==========================일자리, 퇴직, 임금(자세히) api =============================
/*링크*/
//var more123ApiPath1 = "https://kosis.kr/openapi/statisticsList.do?method=getList";
//var more123ApiPath2 = "https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList";

/*개발*/
var more123ApiPath_1 = "/view/totSurv/proxy?" + "https://kosis.kr/openapi/statisticsList.do?method=getList"; //리스트목록
var more123ApiPath_2 = "/view/totSurv/proxy?" + "https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList"; //차트데이터
//====================================================================


//====================================================================================
var logoutCurUrl;//로그아웃 하면 이동할 경로
var accessToken = "none";
var accessTokenFailCnt = 0;	//accessToken 실패 횟수 (10회가 넘어가면 자동 멈춤)
var AuthInfo; // 세션정보
var targetMap;//20년수정반영 (targetMap 변수선언추가)
if (!AuthInfo) {
	AuthInfo = {
		authStatus : false
	};
}

if( !String.prototype.startsWith ){
	String.prototype.startsWith = function( search, pos ){
		return this.substr( !pos || pos < 0 ? 0 : + pos, search.length ) == search;
	}
}

$(document).ready(function () {
	// 2017.03.23j 운영 http -> https
//	if(location.protocol == 'http:'){
//			location.href = location.href.replace('http:','https:');
//		}

	apiLogWrite2('M0', 'M01', '외부에서 페이지 유입', document.location.href, '00', '없음');
	if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad|)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){

		var canUse = false;
		var browserName = "Unknown";
		var browserVer = "";
		var browserVerMain = "";

		if (/Netscape/.test(navigator.appName) && /Trident/.test(navigator.userAgent)) {
			browserName = "Internet Explorer";
			browserVer = "11";
			canUse = true;
		} else if (/MSIE/.test(navigator.userAgent)) {
			browserName = "Internet Explorer";
			browserVer = /MSIE ([\d\.]+)\;/.exec(navigator.appVersion)[1];
			browserVerMain = /(\d+)\./.exec(browserVer)[1];

			if(browserVerMain == "7") {
				canUse = false;
			} else if(browserVerMain == "8") {
				canUse = false;
			} else if(browserVerMain == "9") {
				canUse = false;
			} else if(browserVerMain == "10") {
				canUse = true;
			}
		} else if (/Chrome/.test(navigator.userAgent)) {
			var userAgent = navigator.userAgent.toLowerCase();
			 //console.log(userAgent);
			 canUse = false;
			 browserName = "Chrome";

			 //mng_s 20200304 이진호 whale과 chrome 분기 처리
			 if(userAgent.indexOf('whale') == -1 ){
				 browserVer = /Chrome\/([\d\.]+) Safari/.exec(navigator.appVersion)[1];
				 browserVerMain = /(\d+)\./.exec(browserVer)[1];
			 }
			 //mng_e 20200304 이진호

			 if(browserVerMain < "37") {
				canUse = false;
			 } else if(browserVerMain >= "37") {
				canUse = true;
			 }
		} else if (/Firefox/.test(navigator.userAgent)) {
			 canUse = false;
			 browserName = "Firefox";
			 browserVer = /Firefox\/([\d\.]+)/.exec(navigator.userAgent)[1];
			 browserVerMain = /(\d+)\./.exec(browserVer)[1];

			 if(browserVerMain < "32") {
				canUse = false;
			 } else if(browserVerMain >= "32") {
				canUse = true;
			 }
		} else if (/Safari/.test(navigator.userAgent)) {
			 canUse = false;
			 browserName = "Safari";
			 browserVer = /Version\/([\d\.]+) Safari/.exec(navigator.appVersion)[1];
			 browserVerMain = /(\d+)\./.exec(browserVer)[1];

			 if(browserVerMain < "6") {
				canUse = false;
			 } else if(browserVerMain >= "6") {
				canUse = true;
			 }
		} else if (/Opera/.test(navigator.userAgent)) {
			 canUse = false;
			 browserName = "Opera";
			 browserVer = /Version\/([\d\.]+) Opera/.exec(navigator.appVersion)[1];
			 browserVerMain = /(\d+)\./.exec(browserVer)[1];

			 if(browserVerMain < "22") {
				canUse = false;
			 } else if(browserVerMain >= "22") {
				canUse = true;
			 }
		} else {
			 canUse = false;
			 browserName = "Unknown";
			 browserVer = "";
		}

		//alert(' Version ' + browserVer  + ' 브라우저로 접속하셨습니다.');
		//alert('현재 ' + browserName + ((browserVer != '') ? ' Version ' + browserVer + ' ' : ' ' ) + ' 브라우저로 접속하셨습니다.');


		if (canUse == true && browserName == "Internet Explorer" ) {

			//alert('현재 ' + browserName + ((browserVer != '') ? ' Version ' + browserVer + ' ' : ' ' ) + ' 브라우저로 접속하셨습니다.');

			$("#what_browser").html(browserName + ' ' + browserVer);


		} else if(canUse == false  && browserName == "Internet Explorer"  ) {
			if ( getCookie("back_to_index") == "done" )  {
				//info.html에서 돌아온것이면 다시 가지 않는다.
			} else {
				document.location.href="/html/info/info.html";
			}

			//document.location.href="/html/info/info.html";
		} else {
			$("#what_browser").html("Internet Explorer가 아닌 브라우저");
		}
	}
	/*var allcookies = document.cookie;
	var cookies = allcookies.split("; ");
	for ( var i = 0; i < cookies.length; i++) {
		var keyValues = cookies[i].split("=");
		if (keyValues[0] == "accessToken") {
			accessToken = unescape(keyValues[1]);
			break;
		}
	}
	if (accessToken == "none") {
		accessTokenInfo();
	}*/
	// 세션체크
//	sessionInfo();
//	sessionInfoDeveloper();
	//외부서비스 링크를 위한 폼생성
	createExternalForm();

	//페이지호출통계 저장
	/*
	 * 2015-10-06 Controller에서 Interceptor로 변경
	 */
	//pageCallReg();

	if (window.attachEvent) {
		window.attachEvent("onload", load_proc);
		window.attachEvent("onmessage", receiveMessage);
	}else {
		window.addEventListener("load", load_proc, false);
		window.addEventListener("message", receiveMessage);
	}

	//통합인증 IFrame 설정
	$("#authFrame").attr("src", "/html/authorization/getAuth.jsp");
	$("#sessionCheck").attr("src", "//kosis.kr/oneid/auth/oneidAllLogout.jsp");

	//2017.03.16j 패밀리사이트 목록관련 수정
	var body = $("body");

	//패밀리사이트
	body.on("click",".btnService",function(){
		var ck = $(this).hasClass("on");
		if(ck){
			mainSeriveShow();
		}else{
			mainServiceHide();
		}
	});


	//패밀리사이트 목록 클릭시 최소화
	body.on("click",".serviceLayer > ol li",function(){
		$(".btnService").removeClass("on");
		$(".serviceLayer").hide();
	});

	$(".btnService").keydown(function(e) {
		if (e.keyCode == "9") {
			mainSeriveShow();
		}
	});



	mainSeriveShow = function() {
		$(".btnService").addClass("on");
		$(".serviceLayer").show();
	};

	mainServiceHide = function() {
		$(".btnService").removeClass("on");
		$(".serviceLayer").hide();
	}

});

function getCookie(name){
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0; while(i< clen)
	{
		var j = i + alen;
	    if(document.cookie.substring(i,j)==arg) {
	    	var end = document.cookie.indexOf(";",j);
	    	if(end == -1) end = document.cookie.length;
	    	return unescape(document.cookie.substring(j,end));
	    }
	    i=document.cookie.indexOf(" ",i)+1;
	    if (i==0) break;
	}
	return null;
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
	var html = "";
	html += "<form action='https://kosis.kr/oneid/cmmn/login/ConnectStatItgrSvr.do' method='post' id='externalLinkForm' name='externalLinkForm' target='_blank'>";
	html += "<input type='hidden' id='SYS_URL' name='SYS_URL'/>";
	html += "<input type='hidden' id='SYS_CD' name='SYS_CD' value='S'/>";
	html += "</form>";
	$("body").append(html);
}
function receiveMessage( e ){
	if( e.data === "closed" && e.origin === "https://kosis.kr" ){
		alert("30분동안 미사용으로 로그아웃되었습니다.");
		memberLogout();
	}
}
(function () {
	/** ********* API 호출 로그 Start ********* */
	$class("sop.portal.apiLogWrite.api").extend(sop.portal.absAPI).define({
		onBlockUIPopup : function(){},
		onSuccess : function (status, res) {
		},
		onFail : function (status) {
		}
	});

	/** ********* SRV 호출 로그 Start ********* */
	$class("sop.portal.srvLogWrite.api").extend(sop.portal.absAPI).define({
		onBlockUIPopup : function(){},
		onSuccess : function (status, res) {
		},
		onFail : function (status) {
		}
	});
}());
function apiLogWrite(type, options) {
	var api_id = "";				//API
	var title = "";				//타이틀
	var parameter = "";		//파라미터
	var zoomLevel = 0;		//줌레벨
	var adm_nm = "";			//지역정보
	//대화형통계지도
	if(type == "A0") {
		//API
		//일반검색
		if(options.btntype == "normal") {
			if(options.params.api_id == "API_0301") {	//인구통계총괄
				api_id = "A01";
			} else if(options.params.api_id == "API_0302") {	//인구통계세부조건검색
				api_id = "A02";
			} else if(options.params.api_id == "API_0304") {	//사업체분류검색
				api_id = "A05";
			} else if(options.params.api_id == "API_0305") {	//가구통계검색
				api_id = "A03";
			} else if(options.params.api_id == "API_0306") {	//주택통계검색
				api_id = "A04";
			} else if(options.params.api_id == "API_0307") {	//농가통계검색
				api_id = "A06";
			} else if(options.params.api_id == "API_0308") {	//임가통계검색
				api_id = "A07";
			} else if(options.params.api_id == "API_0309") {	//어가통계검색
				api_id = "A08";
			} else if(options.params.api_id == "API_0310") {	//가구원통계검색
				api_id = "A09";
			} else if(options.params.api_id == "API_4011") {	//조건결합
				api_id = "A14";
			}
		} else if(options.btntype == "kosis") {
			//KOSIS
			api_id = "A10";
		} else if(options.btntype == "build") {
			//사업체전개도
			api_id = "A11";
		} else if(options.btntype == "combine") {
			//범례결합
			api_id = "A13";
//		} else if(options.btntype == "item") {
			//조건결합
//			api_id = "A14";
		} else if(options.btntype == "poi") {
			//POI
			api_id = "A12";
			title = options.title;		//타이틀
			for(key in options.param) {
				parameter += key + "=";
				parameter += options.param[key] + "&";
			}
			zoomLevel = options.map.zoom;		//줌레벨
			//지역정보
			for(var i = 0; i < $interactiveMap.ui.mapList.length; i ++) {
				if(options.map.gMap._sop_id == $interactiveMap.ui.mapList[i].gMap._sop_id) {
					var naviData = $interactiveMap.ui.mapList[i].mapNavigation.data;
					adm_nm = naviData.sido_elem.sido_nm + " " + naviData.sgg_elem.sgg_nm + " " + naviData.adm_elem.emdong_nm;
				}
			}

		} else if(options.btntype == "indoor") {
			//사업체전개도
			if(options.api_id == "API_0802") {
				api_id = "A18";
				title = "개별건물속성";
			} else if(options.api_id == "API_0803") {
				api_id = "A19";
				title = "개별 건물의 층별 외각 공간정보";
			} else if(options.api_id == "API_0804") {
				api_id = "A20";
				title = "개별 건물의 층별 사업체 공간정보";
			} else if(options.api_id == "API_0805") {
				api_id = "A21";
				title = "개별 건물의 층별 기타시설물 공간정보";
			} else if(options.api_id == "API_0806") {
				api_id = "A22";
				title = "개별 건물의 층 별 사업체 정보";
			}

			//파라미터
			for(key in options.params) {
				parameter += key + "=";
				parameter += options.params[key] + "&";
			}
			//줌레벨
			zoomLevel = options.map.zoom;
			//지역정보
			adm_nm = options.adm_nm;

		} else if(options.btntype == "etc") {
			//공공데이터
			 if(options.api_id == "10013") {
				//유동인구
				api_id = "A23";
				title = "유동인구";
			} else if(options.api_id == "10015") {
				//학교인구
				api_id = "A24";
				title = "학교인구";
			} else if(options.api_id == "10014") {
				//지하철승하차인구
				api_id = "A25";
				title = "지하철승하차인구";
			} else if(options.api_id == "10012") {
				//버스정류장
				api_id = "A26";
				title = "버스정류장";
			}
			for(key in options.params) {
				parameter += key + "=";
				parameter += options.params[key] + "&";
			}
			zoomLevel = options.map.zoom;		//줌레벨
			//지역정보
			var naviData = options.map.mapNavigation.data;
			adm_nm = naviData.sido_elem.sido_nm + " " + naviData.sgg_elem.sgg_nm + " " + naviData.adm_elem.emdong_nm;

		} else if(options.btntype == "mydata") {
			//나의데이터
			api_id = "A27";
			title = options.title;
			for(key in options.params) {
				parameter += key + "=";
				parameter += options.params[key] + "&";
			}
			zoomLevel = options.map.zoom;		//줌레벨
			//지역정보
			var naviData = options.map.mapNavigation.data;
			adm_nm = naviData.sido_elem.sido_nm + " " + naviData.sgg_elem.sgg_nm + " " + naviData.adm_elem.emdong_nm;
		} else if( options.btntype == "ecountry" ){ //e-지방지표
			api_id = "A34";
		}

	} else if(type == "B0") {	//창업통계맵
		//API
		//일반검색
		if(options.btntype == "normal") {
			if(options.params.api_id == "API_0601") {	//지역찾기
				api_id = "B01";
				for(var i = 0; i < options.params.params.length; i ++) {
					parameter += options.params.params[i].key + "=";
					parameter += options.params.params[i].value + "&";
				}
				parameter += "adm_cd="+options.params.adm_cd;
			} else {
				if(options.params.param_info.api_id == "API_0302") {	//인구통계세부조건검색
					api_id = "B02";
					title = "인구통계";
				} else if(options.params.param_info.api_id == "API_0301") {	//사업체분류검색
					api_id = "B03";
					title = "사업체";
				} else if(options.params.param_info.api_id == "API_0305") {	//가구통계검색
					api_id = "B04";
					title = "가구";
				} else if(options.params.param_info.api_id == "API_0306") {	//주택통계검색
					api_id = "B05";
					title = "주택";
				}
				//파라미터
				for(key in options.params.param_info.paramInfo) {
					parameter += key + "=";
					parameter += options.params.param_info.paramInfo[key] + "&";
				}
				//지역정보
				adm_nm = options.params.param_info.adm_nm;
			}
		} else if(options.btntype == "chart") {
			//차트
			if(options.api_id == "API_0610") {	//지역종합현황
				api_id = "B06";
				title = "지역종합현황";
			} else if(options.api_id == "API_0602") {	//연령별
				api_id = "B07";
				title = "연령별";
			} else if(options.api_id == "API_0603") {	//성별
				api_id = "B08";
				title = "성별";
			} else if(options.api_id == "API_0605") {	//거주외국인
				api_id = "B09";
				title = "거주외국인";
			} else if(options.api_id == "API_0604") {	//거처종류
				api_id = "B10";
				title = "거처종류";
			} else if(options.api_id == "API_0606") {	//점유형태
				api_id = "B11";
				title = "점유형태";
			} else if(options.api_id == "API_0607") {	//업종별 비율
				api_id = "B12";
				title = "업종별 비율";
			} else if(options.api_id == "API_0609") {	//업종별 증감
				api_id = "B14";
				title = "업종별 증감";
			} else if(options.api_id == "10008") {	//주택거래가격
				api_id = "B15";
				title = "주택거래가격";
			} else if(options.api_id == "10009") {	//주택 거래량
				api_id = "B16";
				title = "주택 거래량";
			} else if(options.api_id == "API_0611") {	//시도 생활업종 정보
				api_id = "B25";
				title = "시도 생활업종 정보";
			} else if(options.api_id == "API_0612") {	//시도 생활업종 순위
				api_id = "B26";
				title = "시도 생활업종 순위";
			} else if(options.api_id == "API_0613") {	//시도 생활업종그룹별속성
				api_id = "B27";
				title = "시도 생활업종그룹별속성";
			} else if(options.api_id == "API_0614") {	//지표별 시도 순위
				api_id = "B28";
				title = "지표별 시도 순위";
			} else if(options.api_id == "API_0615") {	//전국 시군구 생활업종 업체수
				api_id = "B29";
				title = "전국 시군구 생활업종 업체수";
			} else if(options.api_id == "API_0616") {	//시군구 생활업종 정보
				api_id = "B30";
				title = "시군구 생활업종 정보";
			} else if(options.api_id == "API_0617") {	//시군구 생활업종 순위
				api_id = "B31";
				title = "시군구 생활업종 순위";
			} else if(options.api_id == "API_0618") {	//시군구 주거지 현황
				api_id = "B32";
				title = "시군구 주거지 현황";
			} else if(options.api_id == "API_0619") {	//시도생활업종 정보 박길섭 추가
				api_id = "B33";
				title = "시도생활업종 정보 ";
			} else if(options.api_id == "API_0620") {	//시도업종별 종사자현황 박길섭 추가
				api_id = "B37";
				title = "시도업종별 종사자현황";
			} else if(options.api_id == "API_0621") {	//시도업종별 종사자현황 박길섭 추가
				api_id = "B38";
				title = "시도업종별 종사자현황";
			} else if(options.api_id == "API_0622") {	//시도업종별 입지계수현황 박길섭 추가
				api_id = "B39";
				title = "시도업종별 입지계수현황";
			} else if(options.api_id == "API_0623") {	//시군구업종별 입지계수현황 박길섭 추가
				api_id = "B40";
				title = "시군구업종별 입지계수현황";
			} else if(options.api_id == "API_0624") {	//시군구 생활업종 현황 박길섭 추가
				api_id = "B41";
				title = "시군구 생활업종 현황";
			} else if(options.api_id == "API_0625") {	//시군구  평균보기 박길섭 추가
				api_id = "B42";
				title = "시군구  평균보기";
			} else if(options.api_id == "API_0626") {	//시군구 사업체,종사자 음식점,도소매,서비스,숙박업 상세보기 박길섭 추가
				api_id = "B43";
				title = "시군구  상세보기";
			} else if(options.api_id == "API_0627") {	//업종별 입지계수 지도 - 전국대비 시도 입지계수 박길섭 추가
				api_id = "B44";
				title = "전국대비 시도 입지계수";
			} else if(options.api_id == "API_0628") {	//업종별 입지계수 지도 - 전국 및 시도 대비 시군구 입지계수 박길섭 추가
				api_id = "B45";
				title = "전국 및 시도 대비 시군구 입지계수";
			} else if(options.api_id == "API_0629") {	//시군구 막대차트 박길섭 추가
				api_id = "B46";
				title = "시군구 막대차트";
			} else if(options.api_id == "API_0630") {	//연도별 입지계수 차트 박길섭 추가
				api_id = "B47";
				title = "연도별 입지계수 차트";
			} else if(options.api_id == "10016") {	//업종밀집도 시계열현황
				api_id = "B34";
				title = "업종밀집도 시계열현황";
			} else if(options.api_id == "10020") {	//주요시설물 정보
				api_id = "B35";
				title = "주요시설물 정보";
			}

			//파라미터
			for(key in options.params) {
				parameter += key + "=";
				parameter += options.params[key] + "&";
			}
			//줌레벨
			zoomLevel = options.map.zoom;
			//지역정보
			adm_nm = options.params.adm_nm;

		} else if(options.btntype == "poi") {
			//POI
			api_id = "B17";
			title = options.that.oldselected.innerText;		//타이틀
			for(key in options.param) {
				parameter += key + "=";
				parameter += options.param[key] + "&";
			}
			zoomLevel = options.that._map._zoom;		//줌레벨
			//지역정보
			for(var i = 0; i < $bizStatsMap.ui.mapList.length; i ++) {
				if(options.that._map._sop_id == $bizStatsMap.ui.mapList[i].gMap._sop_id) {
					var naviData = $bizStatsMap.ui.mapList[i].mapNavigation.data;
					adm_nm = naviData.sido_elem.sido_nm + " " + naviData.sgg_elem.sgg_nm + " " + naviData.adm_elem.emdong_nm;
				}
			}

		} else if(options.btntype == "etc") {
			//공공데이터
			if(options.api_id == "10011") {
				//행사/공연
				api_id = "B18";
				title = "행사/공연";
			} else if(options.api_id == "10013") {
				//유동인구
				api_id = "B19";
				title = "유동인구";
			} else if(options.api_id == "10015") {
				//학교인구
				api_id = "B20";
				title = "학교인구";
			} else if(options.api_id == "10014") {
				//지하철승하차인구
				api_id = "B21";
				title = "지하철승하차인구";
			} else if(options.api_id == "10012") {
				//버스정류장
				api_id = "B22";
				title = "버스정류장";
			}
			for(key in options.params) {
				parameter += key + "=";
				parameter += options.params[key] + "&";
			}
			zoomLevel = options.map.zoom;		//줌레벨
			//지역정보
			var naviData = options.map.mapNavigation.data;
			adm_nm = naviData.sido_elem.sido_nm + " " + naviData.sgg_elem.sgg_nm + " " + naviData.adm_elem.emdong_nm;

		} else if(options.btntype == "mydata") {
			//나의데이터
			api_id = "B36";
			title = options.title;
			for(key in options.params) {
				parameter += key + "=";
				parameter += options.params[key] + "&";
			}
			zoomLevel = options.map.zoom;		//줌레벨
			//지역정보
			var naviData = options.map.mapNavigation.data;
			adm_nm = naviData.sido_elem.sido_nm + " " + naviData.sgg_elem.sgg_nm + " " + naviData.adm_elem.emdong_nm;
		}

	} else if(type == "C0") {	//통계주제도
		//API
		api_id = options.theme.substring(5, 8);
		//파라미터
		if(options.params.param == undefined) {
			parameter = "null";
		} else {
			for(key in options.params.param) {
				parameter += key + "=";
				parameter += options.params.param[key] + "&";
			}
		}
		//줌레벨
		zoomLevel = options.params.map._zoom;

	} else if(type == "H0") {	//검색
		if(options.api_id == "API_0501") {
			api_id = "H01";
			title = "연관어검색";
		} else if(options.api_id == "API_0502") {
			api_id = "H02";
			title = "SOP검색";
		} else if(options.api_id == "API_0503") {
			api_id = "H03";
			title = "KOSIS검색";
		} else if(options.api_id == "API_0504") {
			api_id = "H04";
			title = "POI검색";
		} else if(options.api_id == "9030") {
			api_id = "H05";
			title = "통계주제도검색";
		}

		for(key in options.params) {
			parameter += key + "=";
			parameter += options.params[key] + "&";
		}
		zoomLevel = null;
		adm_nm = null;
	}

	//타이틀
	if(title == "") {
		title = options.params.title;
	}
	//파라미터
	if(parameter == "") {
		for(var i = 0; i < options.params.param.length; i ++) {
			parameter += options.params.param[i].key + "=";
			parameter += options.params.param[i].value + "&";
		}
	}
	//줌레벨
	if(zoomLevel == "") {
		zoomLevel = options.params.map.zoom;
	}
	//지역정보
	if(adm_nm == "") {
		adm_nm = options.params.adm_nm;
	}
	var sopPortalAPILogWriteObj = new sop.portal.apiLogWrite.api();
	sopPortalAPILogWriteObj.addParam("type", type);
	sopPortalAPILogWriteObj.addParam("api_id", api_id);
	sopPortalAPILogWriteObj.addParam("title", title);
	sopPortalAPILogWriteObj.addParam("parameter", encodeURIComponent(parameter));
	sopPortalAPILogWriteObj.addParam("zoomLevel", zoomLevel);
	sopPortalAPILogWriteObj.addParam("adm_nm", adm_nm);
	sopPortalAPILogWriteObj.request({
		method : "POST",
		async : true,
		url : contextPath + "/ServiceAPI/common/APILogWrite.json"
	});
}
/** ********* API 호출 로그 End ********* */
/** APILog 추가 김종현 20151124 start**/
function apiLogWrite2(type, api_id, title, parameter, zoomLevel, adm_nm) {
	var sopPortalAPILogWriteObj = new sop.portal.apiLogWrite.api();
	sopPortalAPILogWriteObj.addParam("type", type);
	sopPortalAPILogWriteObj.addParam("api_id", api_id);
	sopPortalAPILogWriteObj.addParam("title", title);
	sopPortalAPILogWriteObj.addParam("parameter", encodeURIComponent(parameter));
	sopPortalAPILogWriteObj.addParam("zoomLevel", zoomLevel);
	sopPortalAPILogWriteObj.addParam("adm_nm", adm_nm);
	sopPortalAPILogWriteObj.request({
		method : "POST",
		async : true,
		url : contextPath + "/ServiceAPI/common/APILogWrite.json"
	});
}


/** SRVLog 추가 이경현 20190307 start**/
function srvLogWrite(fClass1Cd, fClass2Cd, fClass3Cd, fClass4Cd, detCd, param) {
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
/** SRVLog 추가 이경현 20190307 end**/

function replaceAll2(find, replace, str){		//leekh 각 페이지에 들어있는 replaceAll 함수와 듑 오류 발생할 수 있어서 2로 생성함.
	 return str.replace(new RegExp(find, 'g'), replace);
}




//태그이동에 로그를 쌓아야 할경우 이 함수로 대체. newWindow 가 true 이면 새창열기
function logWriteAndMove(fClass1Cd, fClass2Cd, fClass3Cd, fClass4Cd, detCd, param, url, newWindow){
	srvLogWrite(fClass1Cd, fClass2Cd, fClass3Cd, fClass4Cd, detCd, param);

	if(newWindow){
		window.open(url);
	}else{
		location.href=url;
	}


}



/** ********* 행정동코드로 지역명칭 조회 (API 호출 로그) Start ********* */
(function () {
	$class("sop.portal.addrCdToNm.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			var result = res.result;
			if (res.errCd == "0") {
				options.params["adm_nm"] = result.addrList[0].adm_nm;
				$("#dataBoardArea").html("지역 : " + options.params.adm_nm);	//지역 명칭을 넣는다.
				//mng_s 20200220 이진호 - my통계로에서 대화형 통계지도로 이동 시 데이터보드에 지역 명칭을 넣어준다
				$(".txt.dataBoardArea").html("지역 : " + options.params.adm_nm);
				//mng_e 20200220 이진호
				$("#fullDataBoardTitle").find("#dataBoardArea").html("지역 : " + options.params.adm_nm);
				$("#fullDataBoardTitle").find(".txt.dataBoardArea").html("지역 : " + options.params.adm_nm);
				apiLogWrite(options.type, options);
			}
			else {
				messageAlert.open("알림", res.errMsg);
			}
		},
		onFail : function (status) {
		}
	});
}());
function addrCdToNm (base_year, adm_cd, options) {
	if(adm_cd == null) {
		adm_cd = "00";
	}
	var sopPortalAddrCdToNmObj = new sop.portal.addrCdToNm.api();
	sopPortalAddrCdToNmObj.addParam("base_year", base_year);
	sopPortalAddrCdToNmObj.addParam("adm_cd", adm_cd);
	sopPortalAddrCdToNmObj.request({
		method : "POST",
		async : true,
		url : contextPath + "/ServiceAPI/map/codeToAddress.json",
		options : options
	});
}
/** ********* 행정동코드로 지역명칭 조회 (API 호출 로그) End ********* */

/** ********* AccessToken 정보 조회 Start ********* */
(function () {
	$class("sop.portal.accessToken.api").extend(sop.portal.absAPI).define({
		onBlockUIPopup : function(){},
		onSuccess : function (status, res, options) {
			var result = res.result;
			if (res.errCd == "0") {
				accessToken = result.accessToken;

				//accessToken 쿠키를 소멸시킨다.
				document.cookie = "accessToken=; expires=0; path=/";

				date = new Date(); // 오늘 날짜
				// 만료시점 : 오늘날짜+10 설정
				var validity = 1;
				date.setDate(date.getDate() + validity);
				document.cookie = "accessToken=" + escape(accessToken) + ';expires=' + date.toGMTString() + "; path=/";

				if (options.callback != null && options.callback instanceof Function) {
					options.callback.call(undefined, accessToken);
				}

			}
			else {
				//messageAlert.open("알림", res.errMsg);
			}
		},
		onFail : function (status) {
		}
	});
}());

function accessTokenInfo (callback) {
	var sopPortalAccessTokenObj = new sop.portal.accessToken.api();
	sopPortalAccessTokenObj.addParam("consumer_key", "590a2718c58d41d9ae3b");
	sopPortalAccessTokenObj.addParam("consumer_secret", "ab7fe94f9fb64336abd3");
	sopPortalAccessTokenObj.request({
		method : "GET",
		async : false,
		url : openApiPath + "/OpenAPI3/auth/authentication.json",
		options : {
			callback : callback
		}
	});
}
/** ********* AccessToken 정보 조회 End ********* */

/** ********* 세션 정보 조회 Start ********* */
(function () {
	$class("sop.portal.sessionInfo.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res) {
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
		},
		onFail : function (status) {
			console.log("onFail   ....");
		}
	});
}());

function sessionInfo () {
	var sopPortalSessionInfoObj = new sop.portal.sessionInfo.api();
	sopPortalSessionInfoObj.request({
		method : "POST",
		async : false,
		url : contextPath + "/ServiceAPI/auth/sessionInfo.json"
	});
}
/** ********* 세션 정보 조회 End ********* */

/** ********* 개발자 세션 정보 조회 Start ********* */
(function () {
	$class("sop.portal.sessionInfoDeveloper.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res) {
		},
		onFail : function (status) {
		}
	});
}());

function sessionInfoDeveloper () {
	var sopPortalSessionInfoDeveloperObj = new sop.portal.sessionInfoDeveloper.api();
	sopPortalSessionInfoDeveloperObj.request({
		method : "POST",
		async : false,
		url : developApiPath + "/auth/get.json"
	});
}
/** ********* 개발자 세션 정보 조회 End ********* */

/** ********* 페이지 호출통계 Start ********* */
(function () {
	$class("sop.portal.pageCallReg.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res) {
		},
		onFail : function (status) {
		}
	});
}());

function pageCallReg() {
	var url = document.location.href;
	var hpage;

	if(url.indexOf("#") > -1) {	//파라미터가 있으면 # 까지 자름
		hpage = url.substring(0, url.indexOf("#"));
		url = hpage;
	}
	if(url.indexOf("?") > -1) {	//파라미터가 있으면 ? 까지 자름
		hpage = url.substring(url.indexOf("/", 10), url.indexOf("?"));
	} else {
		hpage = url.substring(url.indexOf("/", 10), url.length);
	}

	var sopPortalPageCallRegObj = new sop.portal.pageCallReg.api();
	sopPortalPageCallRegObj.addParam("hpage", hpage);
	sopPortalPageCallRegObj.request({
		method : "POST",
		async : true,
		url : contextPath + "/ServiceAPI/common/pageCallReg.json"
	});
}
/** ********* 페이지 호출통계 End ********* */

/** ********* 실명인증 회원사 정보 조회 Start ********* */
(function () {
	$class("sop.portal.configInfo.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res) {
			var result = res.result;
			if (res.errCd == "0") {
				$("#reqInfo").val(result.reqInfo);
				$("#retUrl").val(result.retUrl);
			}
			else {
				messageAlert.open("알림", res.errMsg);
			}
		},
		onFail : function (status) {
		}
	});
}());

function configInfo (type) {
	var sopPortalConfigInfoObj = new sop.portal.configInfo.api();
	sopPortalConfigInfoObj.addParam("type", type);
	sopPortalConfigInfoObj.request({
		method : "POST",
		async : false,
		url : contextPath + "/ServiceAPI/member/memberConfigInfo.json"
	});
}
/** ********* 실명인증 회원사 정보 조회 End ********* */

/** ********* 로그아웃 프로세스 Start ********* */
(function () {
	$class("sop.portal.logout.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res) {
			var result = res.result;
			if (res.errCd == "0") {
				AuthInfo = {
					authStatus : false
				};
				setSession();
				logoutDeveloperProcess();
				messageAlert.open(
						"알림",
						"로그아웃되었습니다.",
						function done(){
							window.location.href = contextPath+"/view/index";
						}
				);
			}
			else {
				messageAlert.open("알림", res.errMsg);
			}
		},
		onFail : function (status) {
		}
	});
}());

function logoutProcess () {
	messageAlert.open(
			"알림",
			"로그아웃 하시겠습니까?",
			function done() {
				var sopPortalLogoutObj = new sop.portal.logout.api();
				sopPortalLogoutObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/member/logout.json"
				});
			},
			function cancel() {

			}
	);

/*	if (confirm("로그아웃 하시겠습니까?")) {
		var sopPortalLogoutObj = new sop.portal.logout.api();
		sopPortalLogoutObj.request({
			method : "POST",
			async : false,
			url : contextPath + "/ServiceAPI/member/logout.json"
		});
	}*/
}
/** ********* 로그아웃 프로세스 End ********* */

/** ********* 개발자 로그아웃 프로세스 Start ********* */
(function () {
	$class("sop.portal.logoutDeveloper.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res) {
		},
		onFail : function (status) {
		}
	});
}());

function logoutDeveloperProcess () {
	var sopPortalLogoutDeveloperObj = new sop.portal.logoutDeveloper.api();
	sopPortalLogoutDeveloperObj.request({
		method : "POST",
		async : false,
		url : developApiPath + "/ServiceAPI/member/logout.json"
	});
}
/** ********* 개발자 로그아웃 프로세스 End ********* */


// 세션받아오기
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
		html += "<li><a href='javascript:logWriteAndMove(\"A0\", \"02\", \"03\", \"00\", \"\", \"\", \"/developer/html/main.html\", false);' tabindex='5'  target='_self'>개발지원센터</a></li>";//개발지원센터 개편으로 url 변경

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
		html += "<li><a href='javascript:logWriteAndMove(\"A0\", \"02\", \"03\", \"00\", \"\", \"\", \"/developer/html/main.html\", false);' tabindex='5'  target='_self'>개발지원센터</a></li>";//개발지원센터 개편으로 url 변경

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

var PCC_window;
// 휴대폰 본인인증 팝업
function openPCCWindow () {
	 wWidth = 430;
	 wHight = 560;

	 wX = (window.screen.width - wWidth) / 2;
 	 wY = (window.screen.height - wHight) / 2;

    var PCC_window = window.open('', 'PCCV3Window', "directories=no,scrollbars=yes,scrollbars=no,left="+wX+",top="+wY+",width="+wWidth+",height="+wHight);
	//var PCC_window = window.open('', 'PCCV3Window', 'width=430, height=560, resizable=1, scrollbars=no, status=0, titlebar=0, toolbar=0, left=300, top=200');
	if (PCC_window == null) {
		alert(" ※ 윈도우 XP SP2 또는 인터넷 익스플로러 7 사용자일 경우에는 \n    화면 상단에 있는 팝업 차단 알림줄을 클릭하여 팝업을 허용해 주시기 바랍니다. \n\n※ MSN,야후,구글 팝업 차단 툴바가 설치된 경우 팝업허용을 해주시기 바랍니다.");
	}

	document.reqPCCForm.action = 'https://pcc.siren24.com/pcc_V3/jsp/pcc_V3_j10.jsp';
	document.reqPCCForm.target = 'PCCV3Window';
	document.reqPCCForm.submit();
}

// Timstamp 만드는 함수
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

// 아이디는 영문 & 숫자 조합으로만 사용 했는지 확인
function mycheck (p) {
	chk1 = /^[a-z\d]{6,12}$/i; // a-z와 0-9이외의 문자가 있는지 확인
	chk2 = /[a-z]/i; // 적어도 한개의 a-z 확인
	chk3 = /\d/; // 적어도 한개의 0-9 확인
	return chk1.test(p) && chk2.test(p) && chk3.test(p);
}

// 패스워드 숫자, 영문, 특수키 혼합하여 9 ~ 20자리 사용 여부 확인
function passwd_check (p) {
	var reg = /^.*(?=.{9,20})(?=.*\D)(?=.*[a-zA-Z])(?=.*[!@#$*^(){}]).*$/;
	return reg.test(p);
}
function passwd_check2 (p) {
	var reg = /[&%<>]/;
	return reg.test(p);
}

// Get 방식으로 파라미터를 받을 때
function getParameter (name) {
	search = location.search;
	/*
	 * if(!search) { //파라미터가 하나도 없을때 document.write("에러 출력 텍스트"); return false; }
	 */

	/*
	 * if(search[1].indexOf(name)==(-1) || data[0]!=name) { //해당하는 파라미터가 없을때.
	 * return ""; return; }
	 */
	if (search) {
		if(search.indexOf("returnPage") > (-1)) {
			search = search.split("returnPage=");
			return search[1].replace("?returnPage=", "");

		} else {
			search = search.split("?");
			data = search[1].split("=");

			if (search[1].indexOf("&") == (-1)) {
				// 한개의 파라미터일때.
				data = search[1].split("=");
				return data[1];
			}
			else {
				// 여러개의 파라미터 일때.
				data = search[1].split("&"); // 엠퍼센트로 자름.
				for (i = 0; i <= data.length - 1; i++) {
					l_data = data[i].split("=");
					if (l_data[0] == name) {
						return l_data[1];
						break;
					}
					else {
						continue;
					}
				}
			}
		}
	}
}

function getAllParameter (val) {
	var query_string = {};
	var query = window.location.search.substring(1);
	if(val != undefined) {	//주소창 url이 아닐경우
		query = val;
	}
	query = query.replace("params=", "");

	var vars = query.split('&');
	for ( var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		// If first entry with this name
		if (typeof query_string[pair[0]] === 'undefined') {
			query_string[pair[0]] = pair[1];
			// If second entry with this name
		}
		else if (typeof query_string[pair[0]] === 'string') {
			var arr = [ query_string[pair[0]], pair[1] ];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		}
		else {
			query_string[pair[0]].push(pair[1]);
		}
	}
	return query_string;
}

function JSONtoString (object) {
	var results = [];
	for ( var property in object) {
		var value = object[property];
		if (value)
			results.push(property.toString() + ': ' + value);
	}

	return '{' + results.join(', ') + '}';
}

// 37자리 아이디 생성 (Random10 + yyyyMMddHHmmssSSS + Random10)
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

// 천단위 자리 콤마
function appendCommaToNumber (num) {
	var len, point, str;

	if(isNaN(num)) return 0;

	num = num + "";
	var tmpNum = null;
	var tmpMod = null;
	var isNagative = false;

	if (num.indexOf("-") != -1) {
		isNagative = true;
		num = num.replace("-", "");
	}

	if (num.indexOf(".") == -1) {
		tmpNum = num;
	}else {
		tmpNum = num.split(".")[0];
		tmpMod = "." + num.split(".")[1];
	}

	point = tmpNum.length % 3;
	len = tmpNum.length;

	str = tmpNum.substring(0, point);
	while (point < len) {
		if (str != "")
			str += ",";
		str += tmpNum.substring(point, point + 3);
		point += 3;
	}

	if (tmpMod != null && tmpMod.length > 0) {
		str = str + tmpMod;
	}

	if (isNagative) {
		str = "-" + str;
	}
	return str;
}

//전화번호 하이픈
function appendHyphenToPhoneNumber (num) {
	if(num.indexOf("-") > -1) {
		return num;
	}

	var returnStr = "";
	num=num.trim();
	var len = num.length;

	switch(len) {
	case 9:
		returnStr = num.substring(0, 2);
		returnStr += "-";
		returnStr += num.substring(2, 5);
		returnStr += "-";
		returnStr += num.substring(5, 9);
		break;

	case 10:
		if(num.substring(0, 2) == "02") {
			returnStr = num.substring(0, 2);
			returnStr += "-";
			returnStr += num.substring(2, 6);
			returnStr += "-";
			returnStr += num.substring(6, 10);
		} else {
			returnStr = num.substring(0, 3);
			returnStr += "-";
			returnStr += num.substring(3, 6);
			returnStr += "-";
			returnStr += num.substring(6, 10);
		}

		break;

	case 11:
		returnStr = num.substring(0, 3);
		returnStr += "-";
		returnStr += num.substring(3, 7);
		returnStr += "-";
		returnStr += num.substring(7, 11);
		break;

	default:
		if(len < 9) {
			returnStr = num.substring(0, (len / 2));
			returnStr += "-";
			returnStr += num.substring((len / 2));
		} else {
			returnStr = num.substring(0, (len / 3));
			returnStr += "-";
			returnStr += num.substring((len / 3), (len / 3) * 2);
			returnStr += "-";
			returnStr += num.substring((len / 3) * 2);
		}
		break;
	}

	return returnStr;
}

function makeYYYYMMDDString (str) {
	var date = str;
	var dateString = '';
	dateString += date.substring(0, 4) + '년 ';
	dateString += date.substring(4, 6) + '월 ';
	dateString += date.substring(6, 8) + '일';
	return dateString;

}

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

var messageConfirm = {
		open : function (title, message, btnOptions, cancelCallback) {
			//2017.10.18 [개발팀] 중복 마스킹 삭제
			if ($(".mConfrim").is(":visible")) {
				$(".mConfrim").remove();
			}
			var alertId = makeRandomThirtySevenDigitString();
			var html = "";
			html +=	'<div class="popupWrapper mConfrim" id="wrapper_'+alertId+'">';
			html += 	'<div class="alertPopupWrapper" id="popup_'+alertId+'">';
			html +=			'<div class="topbar">';
			html +=				'<span>'+title+'</span>';
			html +=				'<a id="myXbtn_'+alertId+'">닫기</a>';
			html +=			'</div>';
			html +=			'<div class="popContents">';
			html +=				'<div class="messageBox">' + message + '</div>';
			html +=				'<div class="btnBox">';

			for (var i=0; i<btnOptions.length; i++) {
				html +=				'<a id="btn_'+ i +'_'+ alertId +'" class="btnStyle01">'+btnOptions[i].title+'</a>';
			}

			html +=				'</div>';
			html +=			'</div>';
			html +=		'</div>';
			html +=	'</div>';
			$("body").append(html);

			for (var i=0; i<btnOptions.length; i++) {
				$("#btn_"+ i +"_"+ alertId).click(function(index) {
					messageConfirm.defaultClose(alertId);
					var id = this.id.split("_");
					var idx = id[1];
					if (btnOptions[idx].func != undefined) {
						btnOptions[idx].func.call(this, btnOptions[idx].fAgm);
					}
				});

				if (btnOptions[i].disable != undefined && btnOptions[i].disable) {
					$("#btn_"+ i +"_"+ alertId).attr("disabled", "disabled");
					$("#btn_"+ i +"_"+ alertId).css({"background" : "#cecece"});
				}

				if (btnOptions[i].style != undefined && btnOptions[i].style) {
					$("#btn_"+ i +"_"+ alertId).css(btnOptions[i].style);
				}

			}

			//화면 중앙에 맞추기
			var d = document;
			var h = d.body.clientHeight;
			var y = (window.pageYOffset) ?
		            	window.pageYOffset : (d.documentElement && d.documentElement.scrollTop) ?
		                d.documentElement.scrollTop : (d.body) ? d.body.scrollTop : 0;
			/*$("#popup_"+alertId).css("margin-top", ((h/2)+y) - 70);*/
			$("#popup_"+alertId).css("margin-top", (h/2) - 70);

			$(".popupWrapper").css("height", d.body.scrollHeight);

			$("#okBtn_"+alertId).click(function() {
				messageConfirm.defaultClose(alertId);
				if (okFnc != undefined) {
					okFnc.call(this, options);
				}
			});

			$("#cancelBtn_"+alertId).click(function() {
				messageConfirm.defaultClose(alertId);
				if (cancelFnc != undefined) {
					cancelFnc.call(this, options);
				}
			});

			$("#myXbtn_"+alertId).click(function() {
				messageConfirm.defaultClose(alertId);
				if (cancelCallback != undefined) {
					cancelCallback.call(this);
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
var messagePrompt = {
		open: function(title, message, btnOptions, defaultValue, placeholder, inputType) {
			var alertId = makeRandomThirtySevenDigitString();
			var html = "";
			html +=	'<div class="popupWrapper" id="wrapper_'+alertId+'">';
			html += 	'<div class="alertPopupWrapper" id="popup_'+alertId+'">';
			html +=			'<div class="topbar">';
			html +=				'<span>'+title+'</span>';
			html +=				'<a id="myXbtn_'+alertId+'">닫기</a>';
			html +=			'</div>';
			html +=			'<div class="popContents">';
			html +=				'<div class="messageBox">' + message + '</div>';
			html += 			'<div style="padding: 10px 30px;"><input type="'+(inputType?inputType:'text')+'" id="popupInput' + alertId + '" class="alertInputBox" ' + (placeholder != undefined ? 'placeholder="' + placeholder + '"' : '') + 'value="'+defaultValue+'" style="width:100%;"></div>';
			html +=				'<div class="btnBox">';

			for (var i=0; i<btnOptions.length; i++) {
				html +=				'<a id="btn_'+ i +'_'+ alertId +'" class="btnStyle01">'+btnOptions[i].title+'</a>';
			}

			html +=				'</div>';
			html +=			'</div>';
			html +=		'</div>';
			html +=	'</div>';
			$("body").append(html);

			for (var i=0; i<btnOptions.length; i++) {
				$("#btn_"+ i +"_"+ alertId).click(function(index) {
					messagePrompt.defaultClose(alertId);
					var id = this.id.split("_");
					var idx = id[1];
					if (btnOptions[idx].func != undefined) {
						btnOptions[idx].func.call(this, btnOptions[idx].fAgm);
					}
				});

				if (btnOptions[i].disable != undefined && btnOptions[i].disable) {
					$("#btn_"+ i +"_"+ alertId).attr("disabled", "disabled");
					$("#btn_"+ i +"_"+ alertId).css({"background" : "#cecece"});
				}

				if (btnOptions[i].style != undefined && btnOptions[i].style) {
					$("#btn_"+ i +"_"+ alertId).css(btnOptions[i].style);
				}

			}

			//화면 중앙에 맞추기
			var d = document;
			var h = d.body.clientHeight;
			var y = (window.pageYOffset) ?
		            	window.pageYOffset : (d.documentElement && d.documentElement.scrollTop) ?
		                d.documentElement.scrollTop : (d.body) ? d.body.scrollTop : 0;
			$("#popup_"+alertId).css("margin-top", ((h/2)+y) - 70);
			$(".popupWrapper").css("height", d.body.scrollHeight);

			$("#okBtn_"+alertId).click(function() {
				messagePrompt.defaultClose(alertId);
				if (okFnc != undefined) {
					okFnc.call(this, options);
				}
			});

			$("#cancelBtn_"+alertId).click(function() {
				messagePrompt.defaultClose(alertId);
				if (cancelFnc != undefined) {
					cancelFnc.call(this, options);
				}
			});

			$("#myXbtn_"+alertId).click(function() {
				messagePrompt.defaultClose(alertId);
/*				if (cancelFnc != undefined) {
					cancelFnc.call(this, options);
				}*/
			});

		},

		defaultClose : function (alertId) {
			$("#wrapper_"+alertId).remove();
		}
	};
function deepCopy(obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        var out = [], i = 0, len = obj.length;
        for ( ; i < len; i++ ) {
        	//2017.10.18 [개발팀]
        	if (obj[i] == null) {
        		 out[i] = null;
        	}else {
        		out[i] = arguments.callee(obj[i]);
        	}
        }
        return out;
    }
    if (typeof obj === 'object') {
        var out = {}, i;
        for ( i in obj ) {
        	//2017.10.18 [개발팀]
        	if (obj[i] == null) {
        		 out[i] = null;
        	}else {
        		out[i] = arguments.callee(obj[i]);
        	}
        }
        return out;
    }
    return obj;
};


/**
 * SQLinjection
 */

var IsValidMsg = {
	searchInput : [ /^[a-zA-Z0-9가-힣.\s-]{0,20}$/, "영문 ,숫자 ,한글 그리고 20자리 미만 문자열 입력가능합니다.", "disabled" ],
	crSearchInput : [ /^[a-zA-Z0-9가-힣][_?=.*-]{0,12}$/g, "영문, 숫자, 한글만 입력가능합니다.","disabled" ],
	formInput : [ /^[a-zA-Z0-9가-힣.\s-]{0,250}$/, "영문 ,숫자 ,한글만 입력가능합니다.", "disabled" ]


// PWD : [/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15})/gm,"8~15 사이의 수, 최소 1개의
// 대문자와 소문자 그리고 특수문자 1개 포함","disabled"],
// EMAIL :
// [/^[a-zA-Z]{1,}[0-9a-zA-Z_-]{1,}[.]{0,1}[0-9a-zA-Z_-]{1,}[@][0-9a-zA-Z_-]{1,}[.][\/.0-9a-zA-Z_-]{1,}[0-9a-zA-Z_-]{1,}$/,"0000@000.com","disabled"],
};

function IsValid(input, inputdata) {
	var ExpStr = IsValidMsg[input][0];
	var status = true;
	status = ExpStr.test(inputdata);
		if (!status) {
		if (IsValidMsg[input][1] != "") {
			var okmessage = IsValidMsg[input][1];
			messageAlert.open('', okmessage);
			status=false;
		}
	}
	return status;

};

function IsBoardValid(input, inputdata, id) {
	var ExpStr = IsValidMsg[input][0];
	var status = true;
	status = ExpStr.test(inputdata);
		if (!status) {
		if (IsValidMsg[input][1] != "") {
			var okmessage = IsValidMsg[input][1];
			messageAlert.open('', okmessage,
					function done(){
					if(id=="#qna_search_title_text"){
						$(id).focus();
					}else{
						$(id).next().find('input:eq(0)').focus();
					}
					});
			status=false;
		}
	}
	return status;

};

function copyToClipboard(text) {
	if(window.clipboardData){
		// IE처리
		// 클립보드에 문자열 복사
		window.clipboardData.setData('text', text);

		// 클립보드의 내용 가져오기
		// window.clipboardData.getData('Text');

		// 클립보드의 내용 지우기
		// window.clipboardData.clearData("Text");

	}  else {
		// 비IE 처리
		window.prompt ("Copy to clipboard: Ctrl+C, Enter", text);
	}
}


var mimeTypeList = {
	application : [
	               // Zip 파일
	               "x-compressed",
	               "x-zip-compressed",
	               "zip",
	               "x-zip",

	               // 엑셀
	               "excel",
	               "x-excel",
	               "x-msexcel",
	               "vnd.ms-excel",
	               "vnd.openxmlformats-officedocument.spreadsheetml.sheet",

	               // 파워포인트
	               "mspowerpoint",
	               "powerpoint",
	               "x-mspowerpoint",
	               "vnd.openxmlformats-officedocument.presentationml.presentation",
	               "vnd.ms-powerpoint",

	               // MS 워드
	               "msword",
	               "vnd.openxmlformats-officedocument.wordprocessingml.document",

				   // PDF
				   "pdf",
				   "x-pdf",

	               // 한글
	               "haansofthwp"
	              ],
	image : ["bmp",
	         "jpeg",
	         "gif",
	         "png"
	         ],
	extension : [
				 "jpg",
				 "jpeg",
				 "bmp",
				 "png",
				 "gif",
				 "zip",
				 "hwp",
				 "xls",
				 "xlsx",
				 "ppt",
				 "pptx",
				 "doc",
				 "docx",
				 "csv",
				 "pdf"
				 ]
};

function isPossibleMimeType(type, extension) {
	var temp = mimeTypeList[type];

	if(!mimeTypeList[type]) {
		return false;
	} else {
		for(var i = 0; i < temp.length; i++) {
			if(temp[i] == extension) {
				return true;
			}
		}
	}

	return false;
};

//format 1-9 to 01, 02, ..., 09
//author: liudandan
function formatDate(date){
	var d = date;
	if(date.toString().length == 1){
	   d = "0" + date;
	}
	return d;
}

function numbersonly(e, value, decimal) {
    var key;
    var keychar;

    if (window.event) {
        key = window.event.keyCode;
    } else if (e) {
        key = e.which;
    } else {
        return true;
    }

    keychar = String.fromCharCode(key);

    if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13)
            || (key == 27)) {
        return true;
    } else if ((("0123456789").indexOf(keychar) > -1)) {
        return true;
    } else if (decimal && (keychar == ".")) {
    	if (value.indexOf(".") == -1) {
    		 return true;
    	}else {
    		return false;
    	}

    } else
        return false;
}


function load_proc()
{
/*	document.oncontextmenu = function(){return false};
	document.onmousemove = function() {return false};*/
//	document.oncontextmenu=function(){return false;}	이경현 추가 : 2016.03.24 김선우 주무관 요청에 의해 우클릭 방지 해제
//	document.onselectstart=function(){return false;}	이경현 추가 : 2016.03.24 김선우 주무관 요청에 의해 우클릭 방지 해제
	//document.ondragstart=function(){return false;}
	//document.onmousemove=function(){return false;}
}

/** ********* 메인화면 최근목록 조회 Start ********* */
(function () {
	$class("sop.portal.mainRecentLists.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res) {
			if (res.errCd == "0") {
				setMainRecentLists(res.result);
			}
			else {
				messageAlert.open("알림", res.errMsg);
			}
		},
		onFail : function (status) {
		}
	});
}());

function getMainRecentLists() {
	var sopPortalMainRecentListsObj = new sop.portal.mainRecentLists.api();
	sopPortalMainRecentListsObj.request({
		method : "POST",
		async : false,
		url : contextPath + "/ServiceAPI/common/MainRecentLists.json"
	});
}

function setMainRecentLists(obj) {
	var title = '메인페이지 화면';
	var zoomLevel = '00';
	var adm_nm = '없음';

	// 인터랙티브맵 최근목록
//	var interactive = shuffle(obj.interactive_lists);
	var interactive = obj.interactive_lists;
	var html = "";
	var titleHtml ="";
	if(interactive.length != 0 && interactive.length != undefined) {
		for(var i = 0; i < interactive.length; i++) {
			var post_title = interactive[i].title;
			var hot_icon_yn = interactive[i].hot_icon_yn;
			if(interactive[i].title.length > 50){
					post_title = interactive[i].title.substring(0, 50) + "...";
				}
			if(i == 0){
					titleHtml += "<li><a style='color:#fff;' href='" + interactive[i].url + "'>"
							+"<span class='cate' id='cate'>● </span>"+ "<span id='postTit" + i +"'>"+post_title +"</span></a></li>";
			$(".roundBox2").html(titleHtml);
			}
				html += "<li id='interLists'><a id='interColor' href='" + interactive[i].url + "'>"
				+"<span class='cate2'>● </span>"+ "<span id='postTit" + i +"'>"+post_title;
				if(hot_icon_yn == 'Y') {
					html += "<img name=\"hotissue\" src=\"/img/ico/hotissueicon2.png\" style=\"margin-bottom:-3px;\" alt='핫이슈'>"; //2017.12.12 [개발팀]
				}
				html += "</span></a></li>";
		}
		$("#inter").html(html);

		for(var i = 0; i < interactive.length; i++) {		//생성된 html 리스너 생성 및 로그처리
			$("#postTit"+i).click(function() {
				apiLogWrite2("G0", "G01", "메인페이지 화면", $(this).text(), "00", "없음");
			});
		}
	}

	// 통계주제도 최근목록(관리자사이트 즐겨찾는 통계관리 링크) 김희철 수정
	var thema = obj.thema_lists;
	html = "";
	titleHtml = "";
	if(thema.length != 0 && thema.length != undefined) {
		for(var i = 0; i < thema.length; i++) {
			var categoryText = getCategoryText(thema[i].category);
			var post_title = thema[i].title;
			var hot_icon_yn  = thema[i].hot_icon_yn;
			if(i == 0){
				if (thema[i].category != undefined) {
					if(thema[i].title.length > 20){
	 					post_title = thema[i].title.substring(0, 20) + "...";
	 				}
					titleHtml += "<li><a style='color:#fff;' href='" + thema[i].url + "'>"
						+ "<span class='cate'>"+thema[i].category_nm+"</span>"+"<span class='themaTit' id='themaTilte'>"+post_title + "</span></a></li>";
				}
			$(".roundBox").html(titleHtml);
			}

			$(".roundBox a").unbind().bind("click",function(){
				apiLogWrite2("G0", "G1B", title, $(this).text(), zoomLevel, adm_nm);
			});
			if (thema[i].category != undefined) {
				html += "<li id='themaLists'><a id='themaColor' href='" + thema[i].url + "'>"
					+ "<span class='cate' >"+thema[i].category_nm+"</span>"+"<span class='themaTit' id='themaTilte'>"+thema[i].title;
				if(hot_icon_yn == 'Y') {
					html += "<img name=\"hotissue\" src=\"/img/ico/hotissueicon2.png\" style=\"margin-bottom:-3px;\" alt='핫이슈'>"; //2017.12.12 [개발팀]
				}

				html += "</span></a></li>";
			}
		}
		$("#thema").append(html);

		$(".themaTit").click(function() {
			apiLogWrite2("G0", "G11", "메인페이지 화면", $(this).text(), "00", "없음");
		});
	}

	// 2016.12.02 시큐어코딩 삭제
	// 이미지 배너등록
	var banner = obj.banner_lists;
	var idx =0;
	for(var i=0; i<banner.length; i++){
		var bannerAltText = getImgAltText(idx);
		var tempLinkUrl = "javascript:void(0)";
		if(banner[i] === undefined){
			var html = "<a href='javascript:void(0)'><img src='src=/img/pic/pic_banner.png' alt='"+bannerAltText+"' />배너이미지</a>";
			$('#slick-slide0'+i).append(html);
		}else{
			if(banner[i].link_url === undefined) {
				banner[i].link_url = tempLinkUrl;
			}
			if(idx == 0){
				//2017.12.12 [개발팀] 접근성 시정조치
				var html = "<a href='" + banner[i].link_url + "'><img src='/s-portalcnm/upload/temp/" + banner[i].post_title_en + "' alt='"+ banner[i].post_title +"' onError=\"this.src='/img/pic/pic_banner.png';\"/>배너이미지</a>";
				$('#slick-slide0'+i).append(html);
			}else{
				//2017.12.12 [개발팀] 접근성 시정조치
				var html = "<a href='" + banner[i].link_url + "'><img src='/s-portalcnm/upload/temp/" + banner[i].post_title_en + "' alt='"+ banner[i].post_title +"' onError=\"this.src='/img/pic/pic_banner0"+i+".png';\"/>배너이미지</a>";
				$('#slick-slide0'+i).append(html);
			}
		}
		idx++;
	}
}
/** ********* 페이지 호출통계 End ********* */

/** ********* 통계주제도메인화면 최근목록 조회 Start ********* */
(function () {
	$class("sop.portal.mainRecentThemaLists.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res) {
			if (res.errCd == "0") {
				setMainRecentThemaLists(res.result);
			}
			else {
				messageAlert.open("알림", res.errMsg);
			}
		},
		onFail : function (status) {
		}
	});
}());

function getMainRecentThemaLists() {
	var sopPortalMainRecentThemaListsObj = new sop.portal.mainRecentThemaLists.api();
	sopPortalMainRecentThemaListsObj.request({
		method : "POST",
		async : false,
		url : contextPath + "/ServiceAPI/common/MainRecentLists.json"
	});
}

function setMainRecentThemaLists(obj) {
	var thema = shuffle(obj.thema_lists);
	html = "";
	titleHtml = "";

	for(var i = 0; i < thema.length; i++) {
		var categoryText = getCategoryText(thema[i].category);
		if (thema[i].category != undefined) {
			html += "<li id='themaLists'><a id='themaColor' href='/view/thematicMap/thematicMapMain?theme=" + thema[i].category
			 + "&stat_thema_map_id=" + thema[i].stat_thema_map_id
			 + "&mapType=" + thema[i].thema_map_type + "'>"
			 + "<span class='cate' >"+categoryText+"</span>"+"<span id='themaTilte'>"+thema[i].title + "</span></a></li>";
		}
	}
	$("#thema").append(html);
}
/** ********* 페이지 호출통계 End ********* */


//지도 맵 분할에서 현재 보고있는 맵의 아이디 리턴 (0, 1)
function getMapDivisionId() {
	var mapId = "0";
	if($("#map_dummy_1").css("display") == "block" && $("#map_dummy_2").css("display") == "block") {	//맵 분할 시 첫번째 맵이 우선
		mapId = "0";
	} else if($("#map_dummy_1").css("display") == "block" && $("#map_dummy_2").css("display") == "none") {	//첫번째 맵
		mapId = "0";
	} else if($("#map_dummy_1").css("display") == "none" && $("#map_dummy_2").css("display") == "block") {	//두번째 맵
		mapId = "1";
	}
	return mapId;
}

/**
 * 	입력받은 텍스트를 해당 길이만큼만 자르고 나머지는 ... 처리
 *  param : 텍스트
 *  param : 길이
 */
function textSubString(txt, leng) {
	if(txt.length <= leng) {
		return txt;
	} else {
		return txt.substring(0, leng) + ".....";
	}
}

function browserFnc() {
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
         var ua = navigator.userAgent;
         var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
         if (re.exec(ua) != null)
             rv = parseFloat(RegExp.$1);
        }
    return rv;
}

//*******************************************************//
//********************** 로컬스토리지 *******************//
//*******************************************************//
function setItemLocalStorage(obj, keyId) {
	var cache = [];
	var data = JSON.stringify(obj, function(key, value) {
	    if (typeof value === 'object' && value !== null) {
	        if (cache.indexOf(value) !== -1) {
	            return;
	        }
	        cache.push(value);
	    }
	    return value;
	});
	cache = null;
	localStorage.setItem(keyId, data);
}

function getItemLocalStorage(keyId) {
	var data = localStorage.getItem(keyId);
	return JSON.parse(data);
}

function removeItemLocalStorage(keyId) {
	localStorage.removeItem(keyId);
}

function removeAllLocalStorage() {
	localStorage.clear();
}
function getCategoryText(text) {
	switch (text) {
	case "CTGR_001":
		return "인구와 주거";
	case "CTGR_002":
		return "주거와 교통";
	case "CTGR_003":
		return "복지와 문화";
	case "CTGR_004":
		return "노동과 경제";
	case "CTGR_005":
		return "건강과 안전";
	case "CTGR_006":
		return "환경과 기후";
	}
}
function getImgAltText(idx) {
	switch (idx) {
	case 0:
		return "기존 통계지리정보서비스에서 더욱 새로워진 SGIS+ plus 서비스를 통해 사용편의성 강화는 물론 주거지분석맵, 지역현안 소통지도 등의 신규 서비스를 이용하실수 있습니다.";
	case 1:
		return "기존 서비스의 사용자 기능 고도화를 통해 다양한 데이터 조회방식을 적용하였습니다. 또한 주거지 통계지도, 지역현안 소통지도 등 주제별 컨텐츠가 새롭게 편성 되었습니다. 통계청만의 차별화된 GIS기반통계정보를 경험해보세요.";
	case 2:
		return "통계정보의 조회 기능이 대폭 강화되었으며, 다양한 시각화 기능들이 적용되어 다양한 방식으로 서비스를 활용 및 응용할 수 있어 보다 강력하고 다채로운 통계정보조회가 가능해졌습니다.";
	case 3:
		return "통계청의 센서스 통계와 함께 외부의 공공데이터를 함계 지도 위에 시각화할수 있으며, 사용자가 수집한 개인데이터도 지도 위에서 함께 적용하여 새로운 GIS기반의 정보를 융합, 생성할 수 있습니다.";
	}
}
function shuffle(array) {
	if(array != undefined) {
	 var currentIndex = array.length, temporaryValue, randomIndex ;
	  while (0 !== currentIndex) {

	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }
	  return array;
	} else {
		return [];
	}
}
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

/**
 *
 * @name         : commonPopupObj
 * @description  : 대화형통계지도, 살고싶은우리동네, 생활업종지도 첫화면 팝업 설정 (하루동안 열지 않음)
 * @date         : 2016. 02. 29.
 * @author	     : 김성현
 * @history 	 :
 * @param
 */
var commonPopupObj = {
		//소개 창열기
		openWin : function(winName) {
			var blnCookie = this.getCookie(winName);
			var obj = eval("window." + winName);
			if(!blnCookie) {
				obj.style.display = "block";
			}
		},

		//하루동안열지않기
		closeWin : function (winName, expiredays) {
			if($("#"+winName).find("input[name='close']").is(":checked")) {
				this.setCookie(winName, "done" , expiredays);
			}
			var obj = eval("window." + winName);
			obj.style.display = "none";
		},

		//쿠키 가져오기
		getCookie : function (name) {
			var nameOfCookie = name + "=";
			var x = 0;
			while (x <= document.cookie.length)
			{
				var y = (x+nameOfCookie.length);
			    if ( document.cookie.substring( x, y ) == nameOfCookie) {
			    	if ((endOfCookie=document.cookie.indexOf(";", y)) == -1)
			    		endOfCookie = document.cookie.length;
			           	return unescape(document.cookie.substring(y, endOfCookie));
			       	}
			    	x = document.cookie.indexOf(" ", x) + 1;
			    	if (x == 0)
			    		break;
			}
			return "";
		 },

		// 24시간 기준 쿠키 설정하기
		// expiredays 후의 클릭한 시간까지 쿠키 설정
		setCookie : function(name, value, expiredays) {
		   var todayDate = new Date();
		   todayDate.setDate(todayDate.getDate() + expiredays);
		   document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toUTCString() + ";"
		}
}


/**
 * @name         : $.indexOf
 * @description  : JsonArray에서 원하는 Object 순서 반환
 * @date         : 2016. 10. 26.
 * @author	     : 김재상
 * @param		 : array(원본 배열), object(검사할 조건 객체), fromIndex (검색을 시작할 위치)
 */
jQuery.indexOf = function(array, object, fromIndex){
	if(!array || !object) return;
	var idx = -1;
	for(var i=fromIndex||0; i<array.length; i++){
		if(!array[i]) continue;
		var isCorrect = true;
		$.each(array[i], function(key, value){
			if(object[key] != value)
				isCorrect = false;
		});
		if(isCorrect) {
			idx = i;
			break;
		}
	}
	return idx;
}


/**
 * @name         : $.pick
 * @description  : JsonArray에서 원하는 Object 검색 후 추출
 * @date         : 2016. 09. 27.
 * @author	     : 김재상
 * @param		 : array(원본 배열), object(검사할 조건 객체)
 */
jQuery.pick = function(array, object){
	if(!array || !object) return;
	var result = [];
	for(var i=0; i<array.length; i++){
		if(!array[i]) continue;
		var isCorrect = true;
		$.each(object, function(key, value){
			if(array[i][key] != value)
				isCorrect = false;
		});
		if(isCorrect) result.push(array[i]);
	}

	return (result.length) ? ((result.length == 1) ? result[0] : result) : undefined;
}
/**
 * @name         : $.sort
 * @description  : JsonArray에서 원하는 파라미터 값 비교 후 재정렬
 * @date         : 2016. 09. 27.
 * @author	     : 김재상
 * @param		 : array(원본 배열), sortable(정렬순서, 0: 오름차순, 1: 내림차순), attr(정렬 기준 키값)
 */
jQuery.sort = function(array, sortable, attr){
	if(!array || !attr) return;
	var result = [];
	for (var i=0; i<array.length; i++){
		if(!array[i]) continue;
		if(isNaN(array[i][attr])) continue;
		if(result.length == 0){
			result.push(array[i]);
		}else{
			if(array[i][attr] < result[0][attr]){
				result.unshift(array[i]);
			}else{
				var temp = result.slice(0);
				for(var k=1; k<=result.length; k++){
					if(!result[k]){
						temp.push(array[i]);
					}else if(array[i][attr] < result[k][attr]){
						temp.splice(k,0,array[i]);
						break;
					}
				}
				result = temp.slice(0);
			}
		}
	}
	return (sortable == 1) ? result.reverse() : result;
}

/**
 * @name         : $.exist
 * @description  : 해당 요소 있는지 검사 (jquery 확장)
 * @date         : 2016. 09. 28.
 * @author	     : 김재상
 */
jQuery.fn.exist = function(){
	return this.length>0;
}


var getShareURL = function(type) {
	var linkUrl = "";
	var domain = window.location.protocol+"//"+window.location.host;
	switch (type) {
		case "IMAP":
			linkUrl =  domain + "/view/map/interactiveMap/sharedata?"
			break;
		case "BMAP":
			linkUrl = domain + "/view/bizStats/bizStatsMap/sharedata?"
			break;
		case "TECH":
			linkUrl = domain + "/view/technicalBiz/technicalBizMap/sharedata?"
			break;
		case "THEME":
			linkUrl = domain + "/view/thematicMap/thematicMapMain?"
			break;
		case "HMAP":
			linkUrl = domain + "/view/house/houseAnalysisMap/sharedata?"
			break;
		//2019-08-27 [김남민] My통계로 > URL 추가 START
		case "STME":
			linkUrl = domain + "/view/statsMe/statsMeMain?";
			break;
		//2019-08-27 [김남민] My통계로 > URL 추가 END
	}
	return linkUrl;
};

var getBookmarkURL = function(type) {
	var linkUrl = "";
	var domain = window.location.protocol+"//"+window.location.host;
	switch (type) {
		case "IMAP":
			linkUrl =  domain + "/view/map/interactiveMap/bookmark?";
			break;
		case "BMAP":
			linkUrl = domain + "/view/bizStats/bizStatsMap/bookmark?";
			break;
		case "TECH":
			linkUrl = domain + "/view/technicalBiz/technicalBizMap/bookmark?";
			break;
		case "THEME":
			linkUrl = domain + "/view/thematicMap/thematicMapMain?";
			break;
		case "HMAP":
			linkUrl = domain + "/view/house/houseAnalysisMap/bookmark?";
			break;
		//2019-08-27 [김남민] My통계로 > URL 추가 START
		case "STME":
			linkUrl = domain + "/view/statsMe/statsMeMain?";
			break;
		//2019-08-27 [김남민] My통계로 > URL 추가 END
	}
	return linkUrl;
};

//djlee 추가 파라미터 값 리턴
/*
var getParameter = function(name){
    var results = new RegExp('[\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    if(results){
    	return results[1]
    }else{
    	return 0;
    }
};
*/

 function test(url){


}

//20년수정반영 시작 (다운로드)
jQuery.download = function(url, data, method){
	     // url과 data를 입력받음
	if( url && data ){
	     // data 는  string 또는 array/object 를 파라미터로 받는다.
	     data = typeof data == 'string' ? data : jQuery.param(data);
	     // 파라미터를 form의  input으로 만든다.
	     var inputs = '';
	     jQuery.each(data.split('&'), function(){
	         var pair = this.split('=');
	         inputs+='<input type="hidden"  name="'+ pair[0].replace("%5B%5D","[]") +'" id="'+ pair[0].replace("%5B%5D","[]") +'" value="'+ pair[1].replace("%3A",":") +'" />';
	     });
	     // request를 보낸다.
	     jQuery('<form action="'+ url +'" method="'+ (method||'post') +'>'+inputs+'</form>').appendTo('body').submit().remove();
	 };
};

function convertImage(type){
	var target;

	if(type==1){
		targetMap = $("#mapRgn_box1");
	}
	else if(type==2){
		targetMap = $("#mapRgn_box2");
	}
	else{
		targetMap = $("#mapRgn_box");
	}
	var org_w = targetMap.innerWidth();
	var org_h = targetMap.innerHeight();
	$(".png_save_box").css({"left" :  (( org_w - 295 )  / 2 ) , "margin-left": 0 , top :   (( org_h - 145 )  / 2 )  });
	$(".png_save_box").toggle();
}


function convertImageProcess(type){
	var radioV 	= $("input[name='sizeChoice']:checked").val(); // 01 : 현재 화면 크기 , 02 : 사용자 지정
	var width 	= $.trim($("#width").val()); // 사용자 지정 selectbox1 value
	var height 	= $.trim($("#height").val()); // 사용자 지정 selectbox2 value
	var x 		= 0; // html2canvas의 x
	var y 		= 0 ;// html2canvas의 y
	var target  = $("#mapRgn_box"); // 지도 객체

	var org_w 	= target.innerWidth(); 		// 지도의 화면 크기
	var org_h 	= target.innerHeight(); 	// 지도의 화면 크기

	if(radioV == '01'){
		width 	= $(window).width();
		height 	= $(window).height();
	}
	// 사용자 지정은 x , y 를 새로 지정한다.
	if(radioV == '02'){

		var regex= /^[0-9]*$/;

		if(width == ''){
			alert("숫자만 입력 가능합니다.");$("#width").val('');	$("#width").focus();	return false;
		}
		if(height == ''){
			alert("숫자만 입력 가능합니다.");$("#height").val('');	$("#height").focus();	return false;
		}

		if(!regex.test(width))		{alert("숫자만 입력 가능합니다.");$("#width").val('');	$("#width").focus();	return false;}

		if(!regex.test(height))		{alert("숫자만 입력 가능합니다.");$("#height").val('');	$("#height").focus();	return false;}

		if(width > org_w){
			alert("가로 크기가 "+org_w+"를 넘을수 없습니다.");
			return false;
		}
		if(height > org_h){
			alert("세로 크기가 "+org_h+"를 넘을수 없습니다.");
			return false;
		}

		x = ( org_w > width ) 	? (org_w - width) 	/ 2 	: - (width - org_w) 	/ 2 ;
		y = ( org_h > height ) 	? (org_h - height) 	/ 2 	: - (height - org_h) 	/ 2 ;
	}


	var option = {
		x : x 	,
		y : y	,
		width : parseInt(width)	,
		height : parseInt(height) 	,
        proxy: "/statexp/ServiceAPI/statsExpMap/html2canvasproxy.jsonp"
	};

	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (navigator.userAgent.toLowerCase().indexOf("msie") != -1) ) {
		//0.5버전
		option["onrendered"] = function(canvas) {
//			if(target)target.css({width:org_w , height : org_h});
			setImageData(canvas , type , width , height);
			return false;
		};
		html2canvas(target, option);
	}else{
		html2canvas(target[0], option).then(function(canvas) {
//			if(target)target.css({width:org_w , height : org_h});
			setImageData(canvas , type , width , height);
			canvas  = null;
			target  = null;
			option = null;
			return false;
		});

	}
}


var window_open_val = null;

function setImageData(canvas , type , width , height){
	var imageData = canvas.toDataURL("image/png");
	if(type == 'preview'){
		window_open_val = window.open("", "미리보기", "width=700,height=700");
		window_open_val.document.write("<html><head><title>미리보기</title></head><body style='padding:0;margin:0;'><img id='captureImage' src='"+imageData+"' style='width:"+width+"px;' /><br/></body></html>");   // 20191230일 수정 반영
		imageData = null;
		return false;
	}
	var formData = new FormData();
	formData.append('data', encodeURIComponent(imageData));
	$.ajax({
		url 	: '/statexp/view/setImageData' ,
		data 	: formData ,
		method : 'post' ,
		processData: false,
	    contentType: false,
		success : function(res){
			formData 		= null;
			canvas 			= null;
			imageData 		= null;
			$.download('/statexp/view/imageCutDownload' , {param : '123'} , 'post');
		},error : function(){
			alert("이미지 다운로드중 장애가 발생했습니다.");
		}
	})
}
function drawExportBoxHide(){
	$('#save_box').remove();
}
function drawExportBoxGrid() {
		if($("#save_box").length==1){
			return;
		}
		var html = "";
		var html = "";
		html += "<div class='popBox saveBox draw-label-setting dragbox imsiClass png_save_box' id='save_box' style='display:none; z-index:9; width: 295px; top:0px; margin-left:-643px;'>"; // djlee 20190527 수정
		html += 	"<div class='topbar'>";
		html += 		"<span>저장하기</span>";
		html += 			"<a href='javascript:void(0);$(\".png_save_box\").hide();'>닫기</a>";
		html += 	"</div>";
		html += 	"<div class='cont-box button-box' id='drawLabelColor' style='padding : 10px;'>";
		html += 			"<ul class='clearFix'>";
		html += 				"<li>";
		html += 					"<span class='radio-area'>" +
				"						<input type='radio' class='radio' name='sizeChoice' value='01' id='sizeChoice1' checked onclick=''>" +
				"								<label for='sizeChoice1'><span>현재 화면 크기로 저장1</span></label>";
		html +=						"</span>";
		html +=				 	"</li>";
		html += 				"<li style='padding-top:10px;'>";
		html += 					"<span class='radio-area clearFix'>" +
				"						<input type='radio' class='radio' name='sizeChoice' value='02' id='sizeChoice2' onclick='' style='margin-right: 2px;'>";
		html += 						"<label for='sizeChoice2'><span>사용자지정</span></label>";
		html += 						"<div class='select-wrap' style='display: inline-table;width: 55px;margin-left: 10px;'><select id='width' style='width:65px;'><option value='512' >512</option><option value='1024' >1024</option><option value='1536' >1536</option><option value='2048' >2048</option></select></div><div style='padding:5px;display: inline-table;'>*</div>";
		html += 						"<div class='select-wrap' style='display: inline-table;width: 60px;'><select id='height' style='width:70px;'><option value='512' >512</option><option value='1024' >1024</option><option value='1536' >1536</option><option value='2048' >2048</option></select></div>";
		html += 					"</span>";
		html += 				"</li>";
		html += 			"</ul>";
		html += 	"</div>";
		html += 	"<div class='popup-btn-area none' style='text-align: center;padding: 10px;'>";
		html += 		"<a href='javascript:convertImageProcess(\"preview\");' class='default-color btn-left-mg' style='padding: 5px; width: 80px;background: #0078A8;color: #fff; font-size: 14px;margin-right:5px;'><span>미리보기</span></a>";
		html += 		"<a href='javascript:convertImageProcess(\"download\");' class='default-color btn-left-mg' style='padding: 5px; width: 80px;background: #0078A8;color: #fff; font-size: 14px;'><span>확인</span></a>";
		html += 	"</div>";
		html += "</div>";
		$("input:checkbox[id='sizeChoice1']").prop("checked", true);
		$("#container").append(html);
		$(".dragbox").draggable();
}
//20년수정반영 끝