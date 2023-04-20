var contextPath = "/work"; // 포탈 Context

//========================== openApiPath ========================================
//var openApiPath = "//sgisapi.kostat.go.kr";
var openApiPath = "//sop1.nsi.go.kr/SOPOpenAPI";
//var openApiPath = "//10.175.80.206/SOPOpenAPI"
//var openApiPath = "//211.34.90.51:8082";
//var openApiPath = "//sgis.neighbor21.co.kr:8080/SOPOpenAPI";
//var openApiPath = "//localhost:8080/SOPOpenAPI";

//========================== kosisApiPath ========================================// KOSIS API 주소 (KOSIS 서버)
//시범서비스, 운영개발용
//var kosisApiPath = "//211.34.90.51:8082";

// 2016. 03. 22 j.h.Seok
// 로컬 테스트용
//var kosisApiPath = "//211.34.90.51:8082";
var kosisApiPath = "//analysis.kostat.go.kr";

//========================== developApiPath ========================================
//var developApiPath = "//sgis.kostat.go.kr/developer";
var developApiPath = "//sgis.neighbor21.co.kr:8080/developer";
//var developApiPath = "//localhost:8080/developer";

//========================== statsPotalDomain ========================================
//dev
//var statsPotalDomain = "//lbdms.bplace.kr:8080/pro"
//service
//var statsPotalDomain = "//10.184.85.12:8080/pro"
var statsPortalDomain = "//sop.nsi.go.kr:8080/work"
	

//var captureDomain = "//localhost:10080";
//dev
//var captureDomain = "//lbdms.bplace.kr:10080";
//service
//var captureDomain = "//10.184.85.12:10080";
var captureDomain = "//sop.nsi.go.kr:10080"

//var mngDomain = "//localhost:8080";
//dev
//var mngDomain = "//lbdms.bplace.kr:8080";
//service
//var mngDomain = "//10.184.85.12:8080";
var mngDomain = "/work"
//========================== 데이터년도 및 경계년도 설정 =============================
var dataYear = "2018"; 
var companyDataYear = "2018"; 
var farmYear = "2015"; //농림어가 년도 //2018.02.08 [개발팀]
var bndYear = "2018"; 
//====================================================================================
var logoutCurUrl;//로그아웃 하면 이동할 경로
var accessToken = "BYPASS";
var accessTokenFailCnt = 0;	//accessToken 실패 횟수 (10회가 넘어가면 자동 멈춤)
var AuthInfo; // 세션정보
if (!AuthInfo) {
	AuthInfo = {
		authStatus : false
	};
}

$(document).ready(function () {
	console.log("11111");
	
	// test 코드
//	$log.srvLogWrite("Z0", "01", "01", "01", "test", "test");
	
//	console.log(${pageContext.request.contextPath});
});


$message = {
		/**
		 * 
		 * @name         : open
		 * @description  : alert 팝업창을 표출한다.
		 * @date         : 2018. 02. 12. 
		 * @author	     : 권차욱
		 * @history 	 :
		 */
		open : function (title, message, btnOptions, callback) {
			if ($("body").find(".alert").length > 0) {
				$("body").find(".alert").parent().remove();
			}
			
			var content = "<p class='def-content'>"+message+"</p>";

			this.dialog = $("body").dialog({
				title:title,
				content : content,
				open:function(dialog){
					$('.def-btn').on('click', function(){
						dialog.close();
					});
					$("def-btn").keydown(function(e){
						if(e.keyCode == 13){
							dialog.close();
						}
					});
					
					if (callback != undefined && jQuery.isFunction(callback)) {
						callback.call(this, dialog);
					}
				}
			});
			
			var dialog = this.dialog;
			if (btnOptions == undefined || btnOptions == null || jQuery.isFunction(btnOptions)) {
				var btn = "<button class='def-btn'>확인</button>";
				$(this.dialog.$dialog_shade).find(".dialog_btns").append(btn);
				$(this.dialog.$dialog_shade).find(".def-btn").click(function(e) {
					e.preventDefault();
					dialog.close();
					if (jQuery.isFunction(btnOptions)) {
						btnOptions.call(this, dialog);
					}
				});
				
				$(this.dialog.$dialog_shade).find(".dialog_close").click(function(e) {
					e.preventDefault();
					dialog.close();
					if (jQuery.isFunction(btnOptions)) {
						btnOptions.call(this, dialog);
					}
				});			
			}
			else {
				for (var i=0; i<btnOptions.length; i++) {
					var btn = "<button class='def-btn' id='def-btn_"+i+"'>"+btnOptions[i].title+"</button>";
					$(this.dialog.$dialog_shade).find(".dialog_btns").append(btn);
				}
				
				for (var i=0; i<btnOptions.length; i++) {
					$("#def-btn_"+ i).click(function(e) {
						e.preventDefault();
						var idx = parseInt(this.id.split("_")[1]);
						if (btnOptions[idx].func != undefined) {
							btnOptions[idx].func.call(this, dialog, btnOptions[idx].fAgm);
						}
					});
				}
			}
			
			var height = $(this.dialog.$dialog_shade).find(".dialog_title").height() + $(this.dialog.$dialog_shade).find(".dialog_body").height() + 45 + $(this.dialog.$dialog_shade).find(".dialog_btns").height();
			$(this.dialog.$dialog_shade).find(".dialog").height(height);
			$(this.dialog.$dialog_shade).find(".dialog").addClass("alert");
			$(this.dialog.$dialog_shade).find(".dialog_btns").show();
		},
		
		/**
		 * 
		 * @name         : close
		 * @description  : alert 팝업창을 닫는다
		 * @date         : 2018. 02. 12. 
		 * @author	     : 권차욱
		 * @history 	 :
		 */
		close : function() {
			this.dialog.close();
		}	
};

$messageNew = { 
		open : function(title, msg) {
			$("#msgBox").attr("title", title);
			$("#msgBoxTxt").text(msg);
			$('#msgBox').dialog('open');
		},
		close : function() {
			$('#confirmBox').dialog('close');
		}	
};

$confirmNew = { 
		open : function(title, msg) {
			$("#confirmBox").attr("title", title);
			$("#confirmBoxTxt").text(msg);
			$('#confirmBox').dialog('open');
		},
		close : function() {
			$('#confirmBox').dialog('close');
		}	
};

$input = {
		
		/**
		 * 
		 * @name         : keyValidation
		 * @description  : 키입력값을 체크한다.
		 * @date         : 2018. 02. 12. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param e		 : 이벤트
		 * @param target : 타겟 엘리먼트
		 * @param type	 : input 타입
		 */
		keyValidation : function(e, target, type) {
			switch(type) {
				case "number":
					var value = $(target).val().toLowerCase();
					$(target).val(value.replace(/[^0-9]/g,""));
					break;
				case "id":
					var value = $(target).val();
					$(target).val(value.replace(/[^A-Za-z0-9]/g,""));
					break;
				case "password":
					var value = $(target).val();
					$(target).val(value.replace(/[~\%^&*\()\-=+_']/gi,"")); //!,@,#,$는 제외
					$(target).val(value.replace(/ /g, ''));	//공백 제거
					break;
				case "name":
					var value = $(target).val().toLowerCase();
					$(target).val(value.replace(/[^가-힣-A-Za]+$/g,"")); //!,@,#,$는 제외
					$(target).val(value.replace(/ /g, ''));	//공백 제거
					break;
				case "email":
					var value = $(target).val().toLowerCase();
					$(target).val(value.replace(/[^0-9a-zA-Z.@]/,""));
					break;	
			}
		},
		
		/**
		 * 
		 * @name         : blurValidation
		 * @description  : input 포커스 해제 시, 입력값을 체크한다.
		 * @date         : 2018. 02. 12. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param e		 : 이벤트
		 * @param target : 타겟 엘리먼트
		 * @param type	 : input 타입
		 */
		blurValidation : function(e, target, type) {
			e.preventDefault();
			var value = $(target).val();
			switch(type) {
				case "number":
					break;
				case "id":
					break;
				case "password":
					break;
				case "name":
					break;
				case "email":
					 var repx = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
					    if (!repx.test(value)) {
					    	$message.open("알림", "이메일 형식이 아닙니다.다시 확인해주세요.");
					    }
					break;
			}
		}
};

/*
 *  공통 함수 모음
 */
$commonFunc = {
		//천단위 자리 콤마
		appendCommaToNumber : function (num) {
			if(typeof num == "undefined" || num == null) return "";
			
			var len, point, str;
			
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
		},
		
		//오늘날짜 가져오기
		getToday : function() {
			var d = new Date();
			var rtData = {
					"year" : d.getFullYear(),
					"month" : d.getMonth()+1,
					"day" : d.getDate()
			}
			if(rtData.month < 10) {
				rtData.month = "0"+rtData.month;
			}
			return rtData;
		},
		
		//숫자 입력 체크
		isNumeric : function(num, opt){
			//좌우 trim(공백제거)을 해준다.
			num = String(num).replace(/^\s+|\s+$/g, "");
			if(typeof opt == "undefined" || opt == "1") {
				// 모든 10진수 (부호 선택, 자릿수구분기호 선택, 소수점 선택)
				var regex = /^[+\-]?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
			} else if(opt == "2") {
			    // 부호 미사용, 자릿수구분기호 선택, 소수점 선택
			    var regex = /^(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
			} else if(opt == "3") {
				// 부호 미사용, 자릿수구분기호 미사용, 소수점 선택
				var regex = /^[0-9]+(\.[0-9]+)?$/g;
			} else if(opt == "4") {
				// 아이피 체크
				num = num.replace(/\./gi, "");	// dot 없애기 
				var regex = /^[0-9]*$/;
			} else {
				// only 숫자만(부호 미사용, 자릿수구분기호 미사용, 소수점 미사용)
				var regex = /^[0-9]*$/;
			}
		 
			if( regex.test(num) ) {
				return true;
			} else { 
				return false;  
			}
		},
		
		/**
		 * 
		 * @name         : makeRandomThirtySevenDigitString
		 * @description  : 랜덤 37자리 코드생성
		 * @date         : 2018. 02. 22. 
		 * @author	     : 권차욱
		 * @history 	 :
		 */
		makeRandomThirtySevenDigitString : function() {
			var front = this.makeRandomDigitString(10);
			var currentdate = new Date();
			var timestamp = this.makeStamp(currentdate);
			var end = this.makeRandomDigitString(10);
			
			return front + timestamp + end;
		},
		
		/**
		 * 
		 * @name         : makeRandomDigitString
		 * @description  : 랜덤 문자열을 생성한다.
		 * @date         : 2018. 02. 22. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param x		 : 자릿수
		 */
		makeRandomDigitString : function(x) {
			var s = "";
			while (s.length < x && x > 0) {
				var r = Math.random();
				s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
			}
			return s.toLowerCase();
		},
		
		/**
		 * 
		 * @name         : makeStamp
		 * @description  : 타임스탬프를 생성한다.
		 * @date         : 2018. 02. 22. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param d		 : 시간
		 */
		makeStamp : function(d) {
			var y = d.getFullYear(), M = d.getMonth() + 1, D = d.getDate(), h = d.getHours(), m = d.getMinutes(), s = d.getSeconds(), ss = d.getMilliseconds(),

			pad = function (x) {
				x = x + '';
				if (x.length === 1) {
					return '0' + x;
				}
				return x;
			};
			return y + pad(M) + pad(D) + pad(h) + pad(m) + pad(s) + pad(ss);
		},
		
		/**
		 * 
		 * @name         : getStringToByte
		 * @description  : 텍스트를 바이트로 변환한다.
		 * @date         : 2018. 02. 27. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param str	 : 텍스트
		 */
		getStringToByte : function(str) {
			if (str == null || str == undefined) {
				return;
			}
			var byteLength = (function(s,b,i,c){
			    for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
			    return b
			})(str);
			
			return byteLength;
		},
		
		/**
		 * 
		 * @name         : getStringToByte
		 * @description  : 텍스트 길이를 체크한다.
		 * @date         : 2018. 02. 27. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param str	 : 텍스트
		 * @param limitByte	 : 최대바이트
		 */
		checkStringLength : function(str, limitByte, fieldNm) {
			if (str == null || str == undefined) {
				return;
			}
			
			var byte = this.getStringToByte(str);
			if (byte > parseInt(limitByte)) {
				if (fieldNm != undefined) {
					$message.open("알림", "["+fieldNm+"] 값의 최대 길이를 초과하였습니다.최대 ["+limitByte+"]bytes");
				}
				return false;
			}
			return true;
		},
		
		/**
		 * 
		 * @name         : pwValidateCheck
		 * @description  : 비밀번호 숫자,영문,특수문자포함하여 8자리 이상 입력여부 체크
		 * @date         : 2018. 03. 23. 
		 * @author	     : 김성현
		 * @param pw	 : 패스워드
		 */
		pwValidateCheck : function(pw) {
			if (pw == null || pw == undefined || pw == "") {
				return false;
			} 
			if(/^(?=.*[a-zA-Z])(?=.*[!@#$^*+=-])(?=.*[0-9]).{8,}$/.test(pw)) {
				return true;
			} else {
				return false;
			}
		},
		
		emailValidateCheck : function(email) {
			if (email == null || email == undefined || email == "") {
				return false;
			} 

			if(/^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i.test(email)) {
				return true;
			} else {
				return false;
			}
		},
		
		phoneValidateCheck : function(phone, isHyphen) {
			if (phone == null || phone == undefined || phone == "") {
				return false;
			} 
			
			if (isHyphen) {
				if(/^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]))-(\d{3,4})-(\d{4})$/.test(phone)) {
					return true;
				} else {
					return false;
				}
			}else {
				if(/^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]))(\d{3,4})(\d{4})$/.test(phone)) {
					return true;
				} else {
					return false;
				}
			}
		},
		
		cellPhoneValidateCheck : function(phone, isHyphen) {
			if (phone == null || phone == undefined || phone == "") {
				return false;
			} 
			
			if (isHyphen) {
				if(/^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/.test(phone)) {
					return true;
				} else {
					return false;
				}
			}else {
				if(/^(?:(010\d{4})|(01[1|6|7|8|9]\d{3,4}))(\d{4})$/.test(phone)) {
					return true;
				} else {
					return false;
				}
			}
		},
		
		 getUrlParameter : function(sParam) {
		    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		        sURLVariables = sPageURL.split('&'),
		        sParameterName,
		        i;

		    for (i = 0; i < sURLVariables.length; i++) {
		        sParameterName = sURLVariables[i].split('=');

		        if (sParameterName[0] === sParam) {
		            return sParameterName[1] === undefined ? true : sParameterName[1];
		        }
		    }
		},
		
		deepCopy : function(obj) {
		    if (Object.prototype.toString.call(obj) === '[object Array]') {
		        var out = [], i = 0, len = obj.length;
		        for ( ; i < len; i++ ) {
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
		        	if (obj[i] == null) {
		        		 out[i] = null;
		        	}else {
		        		out[i] = arguments.callee(obj[i]);
		        	}
		        }
		        return out;
		    }
		    return obj;
		},
		
		/**
		 * 
		 * @name         : isHan
		 * @description  : 한글이 포함 되어 있는지 여부
		 * @date         : 2018. 11. 07. 
		 * @author	     : 최재영
		 * @param String	 : 문자열
		 */
		isHan : function(input_s){
			var pattern = /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/g;
			return (pattern.test(input_s)) ? true : false;
		},
		
		isEmpty : function(str){
		    if(typeof str == "undefined" || str == null || str == "")
		        return true;
		    else
		        return false ;
		}
};

$log = {
	
		/**
		 * 
		 * @name         : doRegLogAccessInfo
		 * @description  : 이력정보를 저장한다.
		 * @date         : 2018. 03. 08. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param params : 파라미터
		 *//*
		doRegLogAccessInfo : function(params, callback) {
			$.ajax({
				url : contextPath + "/view/common/regAccessInfo.do",
				type : "POST",
				data : params,
				async : true,
				dataType : "json",
				beforeSend: function() {
				},
				success : function(res) {
					if (callback != undefined && callback != null && typeof callback  === "function") {
						callback.call(null, res);
					}
				},
				error : function(res) {
				},
				complete : function() {
				}
			});	
		}*/
		
		/**
		 * 
		 * @name         : srvLogWrite
		 * @description  : SrvLog를 저장한다.
		 * @date         : 2019. 05. 31. 
		 * @author	     : SGIS+ 운영팀
		 * @history 	 :
		 * @param		 : fClass1Cd, fClass2Cd, fClass3Cd, fClass4Cd, detCd, param
		 */
		srvLogWrite : function(fClass1Cd, fClass2Cd, fClass3Cd, fClass4Cd, detCd, param) {
			var options = {
				params : {
					f_class_1_cd : fClass1Cd
					, f_class_2_cd : fClass2Cd
					, f_class_3_cd : fClass3Cd
					, f_class_4_cd : fClass4Cd
				}
				, isBeforSend : false
			};
			
			if(detCd != null && detCd != '') {
				options.params["det_cd"] = detCd;
			}
			
			if(param != null && param != '') {
				options.params["param"] = param;
			}
			
			$ajax.requestApi(contextPath + "/api/srv/log/srvLogWrite.do", options, function(res) {
				switch(parseInt(res.errCd)) {
					case 0:
						var result = res.result;
						break;
					default:
						$message.open("알림", res.errMsg);
						break;
				}
			});
		}
};

$aes = {
		keySize : 128,
		iterationCount : 5,
		iv : "A27D5C9927726BCBFE7510B1BDD3D137",
		salt : "2FA1EC712F627B945225DEBAD75A01B6985FE84C55A90EB122882A88C1A59A55",
		passPhrase : "kostat lbdms g2g",
		
		/**
		 * 
		 * @name         : encrypt
		 * @description  : aes 암호화를 수행한다.
		 * @date         : 2018. 02. 12. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param text   : 입력값
		 */
		encrypt : function(text) {
			var aesUtil = new AesUtil(this.keySize, this.iterationCount);
			var encrypt = aesUtil.encrypt(this.salt, this.iv, this.passPhrase, text);
			return encrypt;
		},
		
		/**
		 * 
		 * @name         : decrypt
		 * @description  : aes 복호화를 수행한다.
		 * @date         : 2018. 02. 12. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param text   : 입력값
		 */
		decrypt : function(text) {
			var aesUtil = new AesUtil(this.keySize, this.iterationCount);
			var decrypt = aesUtil.decrypt(this.salt, this.iv, this.passPhrase, text);
			return decrypt;
		}
};

$sha = {
		salt : "kostat_lbdms_g2g_user",
};

$mask = {
		mask : null,
		masks : [],
		show : function() {
			var timestamp = + new Date();
			var html = "";
				html +=	"<div class='deem' id='loading_mask_"+timestamp+"'>";
				html +=		"<div class='loadingWrap'>";
				html += 		"<div class='loading'></div>";
				html +=		"</div>";
				html +=	"</div>";
			$("body").append(html);
			this.mask = $("#loading_mask_"+timestamp);
			return $("#loading_mask_"+timestamp);
			
		},
		
		hide : function() {
			if (this.mask != null) {
				this.mask.remove();
			}
			
		}
};

$ajax = {
		requestApi : function(url, options, callback) {
			var method = "POST";
			var dataType = "json";
			var isBeforSend = true;
			var params = {};
			
			if (options != undefined && options != null && options != "") {
				if (options.method != undefined && options.method != null) {
					method = options.method;
				}
				
				if (options.dataType != undefined && options.dataType != null) {
					dataType = options.dataType;
				}
				
				if (options.isBeforSend != undefined && options.isBeforSend != null) {
					isBeforSend = options.isBeforSend;
				}
				
				if (options.params != undefined && options.params != null) {
					params = options.params;
				}
			}
			
			$.ajax({
				url : url,
				type : method,
				dataType : "json",
				data : params,
				beforeSend : function(xhr,opts){
					if (isBeforSend) {
						var mask = $mask.show();
						xhr["mask"] = mask;
					}
				},
				success : function(res) {
					if (callback != null && callback instanceof Function) {
						callback.call(undefined, res, options);
					}
					if (
						$(".alert").is(":visible") == false && 
						url.indexOf("srvLogWrite.do") == -1 &&
						url.indexOf("getBoundaryData.do") == -1 &&
						url.indexOf("checkTransfer.do") == -1 
					) {
						$(".shade").hide();
					} 
				},
				error : function(res) {
					if (url.indexOf("srvLogWrite.do") == -1) {
						$(".shade").hide();
					}
					$message.open("알림", "서버에서 처리중 에러가 발생하였습니다.");
				},
				complete : function(xhr, opts) {
					if (isBeforSend) {
						if (xhr.mask) {
							xhr.mask.remove();
						}
					}
				}
			});
		}
};

$file = {
		extension : [
		     "png",
		     "jpg",
		     "jpeg",
		     "bmp",
		     "gif",
		     "tif",
		     "tiff",
		     "zip",
		     "7z",
		     "hwp",
		     "hwt",
		     "doc",
		     "docx",
		     "ppt",
		     "pptx",
		     "pdf",
		     "xls",
		     "xlsx",
		     "csv"
		]
};

$auth = {
		doGeSession : function(callback) {
			var options = {
					method : "POST",
					isBeforSend : false
			};
			$ajax.requestApi(contextPath + "/api/getSession.do", options, function(res) {
				switch(parseInt(res.errCd)) {
				case 0:
					if (callback != undefined && callback != null && typeof callback === "function") {
						 callback.call(undefined, res);
					 }
					break;
				default:
					break;
				}
			});
		},
		
		doLoginMng : function(callback, isReturnFail) {
			this.doGeSession(function(res) {
				//ubisuser_
				/*	var url = mngDomain + "/cert/login";
					if (res.ubis_yn == "Y") {
						res.user_id = res.user_id.split("ubisuser_")[0];
					}
					
					var options = {
							method : "POST",
							isBeforSend : false,
							params : {
								id : $aes.decrypt(res.user_id),
								coderw : $aes.decrypt(res.coderw)
							}
					};*/
					
					var url = contextPath + "/api/checkAuth.do";
					var options = {
							method : "POST",
							isBeforSend : false,
							params : {
								key : res.key
							}
					};
				
				$ajax.requestApi(url, options, function(res) {
					if (res.success != undefined && res.success) {
						if (callback != undefined && callback != null && typeof callback === "function") {
							 callback.call(undefined, res);
						 }
					}else {
						 $message.open("알림", "인증이 완료되지 않아 분석을 수행할 수 없습니다.");
						 
						 if (isReturnFail != undefined && isReturnFail != null && isReturnFail) {
							 if (callback != undefined && callback != null && typeof callback === "function") {
								 callback.call(undefined, res);
							 }
						 }
					 }
				});
			});
		}
};


//select box fomstyler setData 함수 구현
$.fn.setData =  function(value) {
	$(this).val(value);
	var id = "#"+$(this).attr("id");
	var selectValue = $(id + " option:selected").text();
	var idx = $(this).prop('selectedIndex');
	var target2 =  id+"-styler"; 
	$(target2+ " .jq-selectbox__select-text").text(selectValue);
	$(target2+ " .jq-selectbox__dropdown li").removeClass("selected");
	$(target2+ " .jq-selectbox__dropdown li").removeClass("sel");
	$(target2+ " .jq-selectbox__dropdown li:eq("+idx+")").addClass("selected");
	$(target2+ " .jq-selectbox__dropdown li:eq("+idx+")").addClass("sel");
};
