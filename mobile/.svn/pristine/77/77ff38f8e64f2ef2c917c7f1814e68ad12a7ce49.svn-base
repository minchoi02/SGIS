//========================== openApiPath ========================================
//var openApiPath = "//sgisapi.kostat.go.kr";
var openApiPath = "//sgisapi.kostat.go.kr";
//var openApiPath = "/mobile/m2021/proxy.sgis?http://sgisapi.kostat.go.kr"; //운영
//var openApiPath = "//link.kostat.go.kr/SOPOpenAPI"; //개발

//var openApiPath = "//localhost:8085/SOPOpenAPI";


//========================== 데이터년도 및 경계년도 설정 =============================

// mng_s 2020. 02. 18 j.h.Seok 사업체 센서스 기준년도 변경
//var companyDataYear = "2017";
var companyDataYear = "2020";
// mng_e 2020. 02. 18 j.h.Seok 사업체 센서스 기준년도 변경

//mng_s 20211015 이금은, 2021년 센서스 데이터 반영
var censusDataYear = "2021";
var bndYear = "2022";
//mng-e 20211015 이금은

//====================================================================================
//var errorMessage = "서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터(042-481-2342)로 문의하시기 바랍니다.";
var accessToken = "none";
var cookieAccessToken = getCookie("accessToken");
if(hasText(cookieAccessToken)){
	accessToken = cookieAccessToken;
}
var accessTokenFailCnt = 0;	//accessToken 실패 횟수 (10회가 넘어가면 자동 멈춤)

$(document).ready(function(){
	// 2017.03.23j 운영 http -> https
	/*if(location.protocol == 'http:'){
		location.href = location.href.replace('http:','https:');
	}*/
	$("body").on("touchstart mousewheel", function(e) {
		if($(".loading-"+documentId).length>0){
			return false;
		}
	});
	if (accessToken == "none") {
		accessTokenInfo();
	}
	if(/^http:/.test(window.location.protocol)){
		//TODO 개발자 PC에 SSL 설치가 안되어있다면 삭제해주세요
//		window.location.href = window.location.href.replace("http:","https:");
	}
});
//페이징 만들기
function createPaging(element, totalCount, obj, currentIndexName) {
	$(element).empty().hide();
	var totalPage = Math.ceil( totalCount / obj.pageSize);
	if(totalPage>0){
		var firstPage = $("<a/>",{
			"class" : "PasingFst "+(obj[currentIndexName]>1?"":"PasingOff"),
			href : "#",
			title : "맨앞",
			text : "◀◀"
		}).click(function(){
			if(obj[currentIndexName]>1){
				obj[currentIndexName] = 1;
				obj.makeLists();
			}
			return false;
		});
		var prePage = $("<a/>",{
			"class" : "PasingForward "+(obj[currentIndexName]>1?"":"PasingOff"),
			href : "#",
			title : "이전",
			text : "◀"
		}).click(function(){
			if(obj[currentIndexName]>1){
				obj[currentIndexName] = obj[currentIndexName]-1;
				obj.makeLists();
			}
			return false;
		});
		var currentPage = $("<span/>",{
			html : '<strong>'+(obj[currentIndexName])+'</strong>&#47;'+(totalPage>0?totalPage:'1')
		});
		var nextPage = $("<a/>",{
			"class" : "PasingNext "+(obj[currentIndexName]<totalPage?"":"PasingOff"),
			href : "#",
			title : "다음",
			text : "▶"
		}).click(function(){
			if(obj[currentIndexName]<totalPage){
				obj[currentIndexName] = obj[currentIndexName]+1;
				obj.makeLists();
			}
			return false;
		});
		var lastPage = $("<a/>",{
			"class" : "PasingLst "+(obj[currentIndexName]<totalPage?"":"PasingOff"),
			href : "#",
			title : "맨끝",
			text : "▶▶"
		}).click(function(){
			if(obj[currentIndexName]<totalPage){
				obj[currentIndexName] = totalPage;
				obj.makeLists();
			}
			return false;
		});
		$(element).show().append(firstPage,prePage,currentPage,nextPage,lastPage);
	}else{
		$(element).hide();
	}
}
//로그인 페이지 이동
function login(url){
	srvLogWrite('M0','01', '05', '00', '', '');
	if(!url){
		url = encodeURIComponent(contextPath+location.pathname+location.search);
	}
	location.href=contextPath+"/kosis/login.sgis?returnPage="+url;
	return false;
};

//로그아웃
function logout(){
	srvLogWrite('M0','01', '06', '00', '', '');

//	$("<form/>",{method:"post",action:contextPath+"/logout.sgis"}).append($("<input name='"+csrf_name+"' value='"+csrf_token+"'>")).submit();
	var $form = $('<form></form>');
	$form.attr('method','post');
	$form.attr('action',contextPath+'/logout.sgis');
	$form.appendTo('body');

	$form.append($("<input name='"+csrf_name+"' value='"+csrf_token+"'>"))
	$form.submit();
	return false;
};

//유니크 아이디 생성
function uuid() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});
	return uuid;
};
//원하는 길이와 텍스트로 자리수 채우기
function fillText(str, length, fill) {
	var pad_char = typeof fill !== 'undefined' ? fill : '0';
	var pad = new Array(1 + length).join(pad_char);
	return (pad + str).slice(-pad.length);
}
//천단위 자리 콤마
function appendCommaToNumber(num) {
	var len, point, str;

	num = num + "";
	var tmpNum = null;
	var tmpMod = null;
	var isNegative = false;

	if (num.indexOf("-") != -1) {
		isNegative = true;
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

	if (isNegative) {
		str = "-" + str;
	}
	return str;
}
//파라미터 얻기
function getParameter(name) {
	search = location.search;
	if (search) {
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results==null){
			return null;
		}
		else{
			return results[1] || 0;
		}
	}
}
//정렬
function dynamicSort(property,isNumber) {
	var sortOrder = 1;
	if(property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1);
	}
	return function (a,b) {
		var compareA = isNumber?parseFloat(a[property]):a[property];
		var compareB = isNumber?parseFloat(b[property]):b[property];
		var result = (compareA < compareB) ? -1 : (compareA > compareB) ? 1 : 0;
		return result * sortOrder;
	}
}
/** ********* AccessToken 정보 조회 Start ********* */
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
(function () {
	$class("sop.portal.accessToken.api").extend(sop.portal.absAPI).define({
		onBlockUIPopup : function(){},
		onSuccess : function (status, res, options) {
			var result = res.result;
			if (res.errCd == "0") {
				accessToken = result.accessToken;

				var date = new Date(); // 오늘 날짜
				// 만료시점 : 오늘날짜+10 설정
				var validity = 1;
				date.setDate(date.getDate() + validity);
				document.cookie = "accessToken=" + escape(accessToken) + ';expires=' + date.toGMTString();

				if(typeof options.callback === "function") {
					options.callback.call(undefined, accessToken);
				}
			}
		},
		onFail : function (status) {
		}
	});

	$class("sop.portal.srvLogWrite.api").extend(sop.portal.absAPI).define({
		onBlockUIPopup : function(){},
		onSuccess : function (status, res) {
		},
		onFail : function (status) {
		}
	});
}());
/** ********* AccessToken 정보 조회 End ********* */
//화면 중앙 위치 얻기
function getScreenCenter(){
	var d = document;
	var h = d.body.clientHeight;
	var y = (window.pageYOffset) ?window.pageYOffset : (d.documentElement && d.documentElement.scrollTop) ?d.documentElement.scrollTop : (d.body) ? d.body.scrollTop : 0;
	return ((h/2)+y) - 150;
};
//html 태그를 encode한것을 decode
function decodeEntities(encodedString) {
	var textArea = document.createElement('textarea');
	textArea.innerHTML = encodedString;
	return textArea.value;
}
//지도의 타이틀을 셋팅해줌. 만약 글자가 화면사이즈보다 길 경우 우에서 좌로 흐르게 엑션 줌
var titleActionDoit;
function setMaptitle(element,text){
	element.stop().css({"margin-left":"0"}).html(text);
	var titleAction = function(){
		clearTimeout(titleActionDoit);
		element.css({"width":"","padding-left":""});
		if(element.width()>$("#map-title").width()){
			element.css({"padding-left":"10px"});
			titleActionDoit = setTimeout(function(){
				element.animate({
					"margin-left":"-"+(element.width()+10)
				},6000,function(){
					element.css({"margin-left":"0"});
					titleAction();
				});
			}, 3000);
		}else{
			element.css({"width":"100%"});
		}
	};
	titleAction();
	$("#map-title").show();
}
//alert
var messageAlert = {
	open : function (title, message, func) {
		messageConfirm.open(title,message,[{
			"title":"확인",
			"func":func
		}]);
	}
};
//confirm
var messageConfirm = {
	open : function (title, message, btnOptions, addMessageHtml,callback) {
		$(".sgis.popupWrapper").remove();
		var popupWrapper = $("<div/>",{"class":"sgis popupWrapper","style":"height:"+$(document).height()+"px;"});
		var alertPopupWrapper = $("<div/>",{"class":"alertPopupWrapper","style":"margin-top:"+getScreenCenter()+"px;"});
		var header = $("<div/>",{"class":"topbar"}).append($("<span/>",{"text":title}),$("<a/>",{"text":"닫기"}).click(function(){
			popupWrapper.remove();
		}));
		var buttonBox = $("<div/>",{"class":"btnBox"});
		$.each(btnOptions,function(cnt,node){
			var button = $("<a/>",{"class":"btnStyle01","text":node.title}).click(function(){
				popupWrapper.remove();
				if(typeof node.func === "function"){
					node.func.call(popupWrapper);
				}
			});
			if(node["background-color"]){
				button.css({"background-color" : node["background-color"]});
			}
			if(node.color){
				button.css({"color" : node.color});
			}
			if(node.disable){
				button.attr("disabled","disabled").css({"background" : "#cecece"});
			}
			buttonBox.append(button);
		})
		var content = $("<div/>",{"class":"popContents"}).append(
			$("<div/>",{"class":"messageBox","html":message}),
			addMessageHtml,
			buttonBox
		);
		alertPopupWrapper.append(header,content);
		popupWrapper.append(alertPopupWrapper);
		$("body").append(popupWrapper);
		if(typeof callback === "function"){
			callback.call(popupWrapper);
		}
		return popupWrapper;
	}
};
//prompt
var messagePrompt = {
	open: function(title, message, btnOptions, defaultValue, placeholder,callback) {
		var option = {"type":"text","class":"alertInputBox"};
		if(defaultValue){
			option.value = defaultValue;
		}
		if(placeholder){
			option.placeholder = placeholder;
		}
		var popupWrapper = messageConfirm.open(title, message, btnOptions,$("<div/>").append($("<input/>",option)));
		if(typeof callback === "function"){
			callback.call(popupWrapper);
		}
	}
};
if(!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position){
		position = position || 0;
		return this.substr(position, searchString.length) === searchString;
	};
}

//html 특수문자 태그를 html 태그 문자열로 변경하고 엔터 코드는 br 태그로 치환한다
function htmlToText(str){
	var tagsToReplace = {'"': '&quot;','&': '&amp;','<': '&lt;','>': '&gt;',"'": '&#039;'};
	function replaceTag(tag) {
		var s = tagsToReplace[tag] || tag;
		return s;
	}
	return str.replace(/[&<>\"\'\{\}]/g, replaceTag).replace(/\n/g, "<br/>");
}
//html 태그 삭제
function removeHtmlTag(str){
	return str.replace(/<([^ >]+)[^>]*>.*?<\/\1>|<[^\/]+\/>/ig, "");
}
//문자가 있는지 여부
function hasText(str){
	if(typeof str === "number"){
		return true;
	}else if(typeof str === "boolean"){
		return str;
	}else if(typeof str === "string"||$.isArray(str)){
		return str&&str.length>0;
	}else if(typeof str === "object"){
		var result = false;
		$.map(str,function(){
			result = true;
			return false;
		});
		return result;
	}else{
		return false;
	}
}
//쿠키값 얻기
function getCookie(c_name){
	var i,x,y,cookies=document.cookie.split(";");
	for (i=0;i<cookies.length;i++){
		x=cookies[i].substr(0,cookies[i].indexOf("="));
		y=cookies[i].substr(cookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if(x==c_name){
			return unescape(y);
		}
	}
}
//쿠키값 셋팅
function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}
//만약 에러가 있고 로딩화면이 존재한다면 로딩 삭제
$(window).error(function(e){
	$(".loading-"+documentId).remove();
});
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
function getComleteWordByJongsung(name, firstValue, secondValue) {
	var lastName = name.charCodeAt(name.length - 1);
	// 한글의 제일 처음과 끝의 범위밖일 경우는 오류
	if (lastName < 0xAC00 || lastName > 0xD7A3) {
		return name;
	}
	var seletedValue = (lastName - 0xAC00) % 28 > 0 ? firstValue : secondValue;
	return name+seletedValue;
}
//하이픈 뒤에있는 영어 대문자로 변환하고 하이픈 삭제
function changePipeToUpperCase(text){
	if(text&&text.replace(/ /gi,"")!=""){
		text = text.toString();
		return text.replace(/-.{0,1}/gi,function(str){
			return str.replace(/-/gi,"").toUpperCase();
		});
	}else{
		return null;
	}
}

/** ********* API 호출 로그 Start ********* */
(function () {
	$class("sop.portal.apiLogWrite.api").extend(sop.portal.absAPI).define({
		onBlockUIPopup : function(){},
		onSuccess : function (status, res) {
		},
		onFail : function (status) {
		}
});
}());
function apiLogWrite2(type, api_id, title, parameter, zoomLevel, adm_nm) {
	var sopPortalAPILogWriteObj = new sop.portal.apiLogWrite.api();
	sopPortalAPILogWriteObj.addParam("type", type);
	sopPortalAPILogWriteObj.addParam("api_id", api_id);
	sopPortalAPILogWriteObj.addParam("title", title);
	sopPortalAPILogWriteObj.addParam("parameter", encodeURIComponent(parameter));
	sopPortalAPILogWriteObj.addParam("zoomLevel", zoomLevel);
	sopPortalAPILogWriteObj.addParam("adm_nm", adm_nm);
	sopPortalAPILogWriteObj.request({
		method : "GET",
		async : false,
		url : "//sgis.kostat.go.kr/ServiceAPI/common/APILogWrite.json"
		//url : "//link.kostat.go.kr/ServiceAPI/common/APILogWrite.json"
		//url : "//localhost:8080/ServiceAPI/common/APILogWrite.json"
	});
}

//apiLog쌓기
function srvLogWrite(fClass1Cd, fClass2Cd, fClass3Cd, fClass4Cd, detCd, param){

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
		method : "GET",
		async : true,
		url: "//sgis.kostat.go.kr/ServiceAPI/common/SRVLogWrite.json",
	});
}


/** ********* API 호출 로그 End ********* */
