var contextPath = "/s-portalcnm"; // 포탈 Context
//var openApiPath = "http://localhost"; // 오픈API 주소 (로컬)
//var openApiPath = "http://175.203.125.155"; //오픈API 주소 (개발서버)

//로컬
//var formUrl = "http://localhost:8080/s-portalcnm/jsp/excel/serviceUseStat.jsp";
//개발
//var formUrl = "http://211.34.90.51:8081/s-portalcnm/jsp/excel/serviceUseStat.jsp";
//운영
var formUrl = "/s-portalcnm/jsp/excel/serviceUseStat.jsp";

var PCC_window;
//휴대폰 본인인증 팝업
function openPCCWindow () {
	var PCC_window = window.open('', 'PCCV3Window', 'width=430, height=560, resizable=1, scrollbars=no, status=0, titlebar=0, toolbar=0, left=300, top=200');

	if (PCC_window == null) {
		alert(" ※ 윈도우 XP SP2 또는 인터넷 익스플로러 7 사용자일 경우에는 \n    화면 상단에 있는 팝업 차단 알림줄을 클릭하여 팝업을 허용해 주시기 바랍니다. \n\n※ MSN,야후,구글 팝업 차단 툴바가 설치된 경우 팝업허용을 해주시기 바랍니다.");
	}

	document.reqPCCForm.action = 'https://pcc.siren24.com/pcc_V3/jsp/pcc_V3_j10.jsp';
	document.reqPCCForm.target = 'PCCV3Window';
	document.reqPCCForm.submit();
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

//아이디는 영문 & 숫자 조합으로만 사용 했는지 확인
function mycheck (p) {
	chk1 = /^[a-z\d]{6,12}$/i; // a-z와 0-9이외의 문자가 있는지 확인
	chk2 = /[a-z]/i; // 적어도 한개의 a-z 확인
	chk3 = /\d/; // 적어도 한개의 0-9 확인
	return chk1.test(p) && chk2.test(p) && chk3.test(p);
}

//패스워드 숫자, 영문, 특수키 혼합하여 9 ~ 20자리 사용 여부 확인
function passwd_check (p) {
	var reg = /^.*(?=.{9,20})(?=.*\D)(?=.*[a-zA-Z])(?=.*[!@#$%*^(){}]).*$/;
	return reg.test(p);
}
function passwd_check2 (p) {
	var reg = /[&<>]/;
	return reg.test(p);
}

//Get 방식으로 파라미터를 받을 때
function getParameter (name) {
	search = location.search;
	if (!search) {
		// 파라미터가 하나도 없을때
		// document.write("에러 출력 텍스트");
		return false;
	}
	search = search.split("?");
	data = search[1].split("=");
	if (search[1].indexOf(name) == (-1)) {
		// 해당하는 파라미터가 없을때.
		return "";
		return;
	}
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
//set logo icon href to homepage, login/SITEMAP/myPage
//author: liudandan
jQuery(function () {
	// logo
	jQuery('.header').find('.logo').children().attr('href', '/');
	// myPage
	//$('.header').find('.navi').children().attr('href', './../CM/myPage.html');
	// logout
	jQuery('.header').find('.navi').append("<a href='javascript:$logout.logout()'>로그아웃</a>");
});
//logout
var $logout = {
		logout : function () {	
			var sopOpenApiLogoutObj = new sop.openApi.logout.api();
			sopOpenApiLogoutObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/CM/MyPage/logout.json"
			});
		}
};
(function () {
	$class("sop.openApi.logout.api").extend(sop.cnm.absAPI).define({
		onSuccess : function (status, res) {
			var result = res.result;
			if (res.errCd == "0") {
				if (result != null) {
					location.href = './../CM/login.jsp';
				}
			}
			else {
				alert(res.errMsg);
			}
		},
		onFail : function (status) {
			alert("에러발생");
		}
	});
}());
//confirmPopup
//author: liudandan
function confirmPopupRemove () {
	jQuery(document).find("body").find("#confirmPopup").remove();
}
function getConfirmPopup (title, message, type) {
	var getConfirmPopupStr = '<div class="popupWrapper" id="confirmPopup" style="z-index:9000">' + '<div class="confirmPopupWrapper">' + '<div class="aplPopupTitle">' + '<div class="myTitleFont">' + title + '</div>' + '<div id="close_confirmPopup" style="padding-right:17px; float:right; padding-top: 15px;"><a style="cursor: pointer" title="종료"><img src="./../include/img/btn/btn_popupX.png" alt="종료"/></a></div>' + '</div>' + '<div class="messageBox">' + message + '</div>' + '<div class="btnbox">';
	if (type == 'alert') {
		getConfirmPopupStr = getConfirmPopupStr + '<a id="ok_alertPopup" style="cursor: pointer"><img src="./../include/img/btn/btn_confirm.png" alt="확인"/></a>';
	}
	else if (type == 'confirm') {
		getConfirmPopupStr = getConfirmPopupStr + '<a id="ok_confirmPopup" style="cursor: pointer"><img src="./../include/img/btn/btn_confirm.png" alt="확인"/></a>' + '<a id="cancel_confirmPopup" style="cursor: pointer; margin-left: 3px"><img src="./../include/img/btn/btn_cancel.png" alt="취소"/></a>';
	}else if (type =='upload'){
		var getConfirmPopupStr = '<div class="popupWrapper" id="confirmPopup" style="z-index:9000">' + '<div class="confirmPopupWrapper">' + '<div class="aplPopupTitle">' + '<div class="myTitleFont">' + title + '</div>' + '<div id="close_confirmPopup" style="padding-right:17px; float:right; padding-top: 15px;"></div>' + '</div>' + '<div class="messageBox">' + message + '</div>' + '<div class="btnbox">';
		getConfirmPopupStr = getConfirmPopupStr;
	}else if (type == 'tconfirm'){
		getConfirmPopupStr = getConfirmPopupStr + '<div style=float:left;margin:4px;><a id="ok_confirmPopup" style="cursor: pointer;padding: 6px 13px;background: #4d74d0;color: #f8f8f8;margin-left: 132px;">증감데이터</a></div>' + '<a id="add_confirmPopup" style="cursor: pointer; margin-left: -160px;"><img src="./../include/img/btn/btn_regist02.png" alt="등록"/></a>';
	}
	getConfirmPopupStr = getConfirmPopupStr + '</div>' + '</div>' + '</div>';
	jQuery(document).find('body').append(getConfirmPopupStr);
	jQuery('#confirmPopup').css('display', 'block');
}
//set cookies
//author: liudandan
function setCookie (name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//get cookies
//author: liudandan
function getCookie (name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

	if (arr = document.cookie.match(reg))

		return unescape(arr[2]);
	else
		return null;
}

//delete cookies
//author: liudandan
function delCookie (name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
//easyUI datagrid
//author: liudandan
serializeObject = function (form) {
	var o = {};
	$.each(form.serializeArray(), function (index) {
		if (o[this['name']]) {
			o[this['name']] = o[this['name']] + "," + this['value'];
		}
		else {
			o[this['name']] = this['value'];
		}
	});
	console.log('o',o);
	return o;
};
//jqueryUI datepicker
//author: liudandan
//params: dateType{
//type: String,
//value: 'start', 'end'
//}
//dateInfo{
//type: String,
//value: 'hourly', 'daily', 'monthly'
//}
function getDatepickerObj (dateType, dateInfo) {
	var datepickerObj = new Object();
	datepickerObj['showOn'] = 'both';
	datepickerObj['buttonImageOnly'] = true;
	datepickerObj['buttonImage'] = './../include/img/ico/ico_calendar.png';
	datepickerObj['buttonText'] = '달력';
	datepickerObj['changeYear'] = true;
	datepickerObj['changeMonth'] = true;
	datepickerObj['showMonthAfterYear'] = true;
	datepickerObj['showButtonPanel'] = true;
	datepickerObj['closeText'] = '선택';
	datepickerObj['dayNamesMin'] = [ '일', '월', '화', '수', '목', '금', '토' ];
	datepickerObj['monthNamesShort'] = [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ];
	if (dateType == 'start') {
		if (dateInfo == 'hourly') {
			datepickerObj['dateFormat'] = 'yy-mm-dd';
			datepickerObj['timeFormat'] = 'hh';
			datepickerObj['showMinute'] = false;
			datepickerObj['timeText'] = '';
			datepickerObj['hourText'] = '';
			datepickerObj['minDate'] = '-6M';
			datepickerObj['maxDate'] = '0D';
			datepickerObj['onClose'] = function (dateText, inst) {
				var maxStartDate = new Date();
				maxStartDate.setDate(maxStartDate.getDate() - 1);
				maxStartDate.setHours(0, 0, 0, 0);
				var startDate = dateText.substr(0, 10).toDate();
				if (startDate.getFullYear() == maxStartDate.getFullYear() && startDate.getMonth() == maxStartDate.getMonth() && startDate.getDate() == maxStartDate.getDate()) {
					if (parseInt(dateText.substr(11, 2)) > 22) {
						$('#startDate').val(dateText.substr(0, 10) + ' 22');
					}
				}

			};
			datepickerObj['onSelect'] = function (text, inst) {
				$('#endDate').datepicker('destroy');
				var dateObject = getDatepickerObj('end', 'hourly');
				var selectedDateObj = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay);
				var today = new Date();
				var selectedMaxDateObj = '';
				var hours = '';

				if (inst.selectedYear == today.getFullYear() && inst.selectedMonth == today.getMonth() && inst.selectedDay == today.getDay()  ) {
					// 오늘 날짜이면..
					selectedMaxDateObj = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay, today.getHours());
					housrs = today.getHours();
				}
				else {
					// 오늘 날짜가 아니면
					selectedMaxDateObj = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay, 23);
					housrs = '23';
				}

				dateObject["minDate"] = selectedDateObj;
				dateObject["maxDate"] = selectedMaxDateObj;
				// console.log('dateObject',dateObject);
				jQuery('#endDate').datetimepicker(dateObject);
				var selectedDay = selectedDateObj.getFullYear() + '-' + formatDate(selectedDateObj.getMonth() + 1) + '-' + formatDate(selectedDateObj.getDate(), housrs);
				jQuery('#endDate').val(selectedDay + ' ' + housrs);

			};
		}
		else if (dateInfo == 'daily') {
			datepickerObj['dateFormat'] = 'yy-mm-dd';
			datepickerObj['minDate'] = '-6M';
			datepickerObj['maxDate'] = '-1D';
			datepickerObj['onClose'] = function (dateText, inst) {
				// $('#endDate').datepicker('destroy');
				// $('#endDate').datepicker(getDatepickerObj('end', 'daily'));
				// var maxDate = getMaxDate($('#startDate').val());
				// $('#endDate').val(maxDate.getFullYear() + '-' +
				// formatDate(maxDate.getMonth()+1) + '-' +
				// formatDate(maxDate.getDate()));
			};

			datepickerObj['onSelect'] = function (text, inst) {
				jQuery('#endDate').datepicker('destroy');
				var dateObject = getDatepickerObj('end', 'daily');
				var selectedDateObj = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay);
				dateObject["minDate"] = selectedDateObj;
				jQuery('#endDate').datepicker(dateObject);
				// $("#endDate").datepicker("setDate", selectedDateObj);
			};
		}
		else if (dateInfo == 'monthly') {	
			datepickerObj['dateFormat'] = 'yy-mm';
			datepickerObj['minDate'] = '-2Y';
			datepickerObj['maxDate'] = '-1D';
			datepickerObj['defaultDate'] = new Date(2014, 0, 1);
			datepickerObj['onClose'] = function (dateText, inst) {	
				var month = jQuery("#ui-datepicker-div .ui-datepicker-month :selected").val();
				var year = jQuery("#ui-datepicker-div .ui-datepicker-year :selected").val();
				jQuery(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
				jQuery(this).datepicker("setDate", new Date(year, month, 1));

			};
			/*datepickerObj['onSelect'] = function (dateText, inst) {	
				if (dateText !== inst.lastVal) {
					$(this).change();	
				}
			};*/
		}
	}
	else if (dateType == 'end') {
		var today = new Date();
		datepickerObj['maxDate'] = today;
		if (dateInfo == 'hourly') {

			datepickerObj['dateFormat'] = 'yy-mm-dd';
			datepickerObj['timeFormat'] = 'hh';
			datepickerObj['showMinute'] = false;
			datepickerObj['timeText'] = '';
			datepickerObj['hourText'] = '';
			datepickerObj['minDate'] = getMinDate($('#startDate').val());
			/*
			 * datepickerObj['onClose'] = function (dateText, inst) { var
			 * minDate = getMinDate($('#startDate').val()); var maxDate =
			 * getMaxDate($('#startDate').val()); var selectDate =
			 * (dateText.substr(0, 10)).toDate(); var selectHour =
			 * parseInt(dateText.substr(11, 2)); selectDate.setHours(selectHour,
			 * 0, 0, 0); if (selectDate < minDate) { var tYear =
			 * minDate.getFullYear(); var tMonth = minDate.getMonth(); var tDate =
			 * minDate.getDate(); var tHour = minDate.getHours(); tMonth =
			 * formatDate(tMonth + 1); tDate = formatDate(tDate); tHour =
			 * formatDate(tHour); $('#endDate').val(tYear + "-" + tMonth + "-" +
			 * tDate + ' ' + tHour); } else if (selectDate > maxDate) { var
			 * tYear = maxDate.getFullYear(); var tMonth = maxDate.getMonth();
			 * var tDate = maxDate.getDate(); var tHour = maxDate.getHours();
			 * tMonth = formatDate(tMonth + 1); tDate = formatDate(tDate); tHour =
			 * formatDate(tHour); $('#endDate').val(tYear + "-" + tMonth + "-" +
			 * tDate + ' ' + tHour); } };
			 */
		}
		else if (dateInfo == 'daily') {
			datepickerObj['dateFormat'] = 'yy-mm-dd';
			datepickerObj['minDate'] = '-30D';// getMinDate($('#startDate').val());
			// datepickerObj['maxDate'] = null;//
			// getMaxDate($('#startDate').val());
		}
		else if (dateInfo == 'monthly') {

			datepickerObj['dateFormat'] = 'yy-mm';
			datepickerObj['minDate'] = getMinDate($('#startDate').val());
			// datepickerObj['maxDate'] = null;
			datepickerObj['onClose'] = function (dateText, inst) {
				var month = jQuery('#ui-datepicker-div .ui-datepicker-month :selected').val();
				var year = jQuery('#ui-datepicker-div .ui-datepicker-year :selected').val();
				// $('#endDate').val($.datepicker.formatDate('yy-mm', new
				// Date(year, month, 1)));
				jQuery("#endDate").datepicker('option', 'defaultDate', new Date(year, month, 1));
				jQuery("#endDate").datepicker('setDate', new Date(year, month, 1));
			};
		}
	}
	return datepickerObj;
}

function getDatepickerObjTab (dateType, dateInfo, i) {
	var datepickerObj = new Object();
	datepickerObj['showOn'] = 'both';
	datepickerObj['buttonImageOnly'] = true;
	datepickerObj['buttonImage'] = './../include/img/ico/ico_calendar.png';
	datepickerObj['buttonText'] = '달력';
	datepickerObj['changeYear'] = true;
	datepickerObj['changeMonth'] = true;
	datepickerObj['showMonthAfterYear'] = true;
	datepickerObj['showButtonPanel'] = true;
	datepickerObj['closeText'] = '선택';
	datepickerObj['dayNamesMin'] = [ '일', '월', '화', '수', '목', '금', '토' ];
	datepickerObj['monthNamesShort'] = [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ];
	if (dateType == 'start') {
		if (dateInfo == 'hourly') {
			datepickerObj['dateFormat'] = 'yy-mm-dd';
			datepickerObj['timeFormat'] = 'hh';
			datepickerObj['showMinute'] = false;
			datepickerObj['timeText'] = '';
			datepickerObj['hourText'] = '';
			datepickerObj['minDate'] = '-6M';
			datepickerObj['maxDate'] = '0D';
			datepickerObj['onClose'] = function (dateText, inst) {
				var maxStartDate = new Date();
				maxStartDate.setDate(maxStartDate.getDate() - 1);
				maxStartDate.setHours(0, 0, 0, 0);
				var startDate = dateText.substr(0, 10).toDate();
				if (startDate.getFullYear() == maxStartDate.getFullYear() && startDate.getMonth() == maxStartDate.getMonth() && startDate.getDate() == maxStartDate.getDate()) {
					if (parseInt(dateText.substr(11, 2)) > 22) {
						jQuery('#startDate'+i).val(dateText.substr(0, 10) + ' 22');
					}
				}

			};
			datepickerObj['onSelect'] = function (text, inst) {
				jQuery('#endDate').datepicker('destroy');
				var dateObject = getDatepickerObjTab('end', 'hourly', i);
				var selectedDateObj = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay);
				var today = new Date();
				var selectedMaxDateObj = '';
				var hours = '';

				if (inst.selectedYear == today.getFullYear() && inst.selectedMonth == today.getMonth() && inst.selectedDay == today.getDay()  ) {
					// 오늘 날짜이면..
					selectedMaxDateObj = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay, today.getHours());
					housrs = today.getHours();
				}
				else {
					// 오늘 날짜가 아니면
					selectedMaxDateObj = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay, 23);
					housrs = '23';
				}

				dateObject["minDate"] = selectedDateObj;
				dateObject["maxDate"] = selectedMaxDateObj;
				// console.log('dateObject',dateObject);
				jQuery('#endDate'+i).datetimepicker(dateObject);
				var selectedDay = selectedDateObj.getFullYear() + '-' + formatDate(selectedDateObj.getMonth() + 1) + '-' + formatDate(selectedDateObj.getDate(), housrs);
				jQuery('#endDate'+i).val(selectedDay + ' ' + housrs);

			};
		}
		else if (dateInfo == 'daily') {
			datepickerObj['dateFormat'] = 'yy-mm-dd';
			datepickerObj['minDate'] = '-6M';
			datepickerObj['maxDate'] = '-1D';
			datepickerObj['onClose'] = function (dateText, inst, i) {
				// $('#endDate').datepicker('destroy');
				// $('#endDate').datepicker(getDatepickerObj('end', 'daily'));
				// var maxDate = getMaxDate($('#startDate').val());
				// $('#endDate').val(maxDate.getFullYear() + '-' +
				// formatDate(maxDate.getMonth()+1) + '-' +
				// formatDate(maxDate.getDate()));
			};

			datepickerObj['onSelect'] = function (text, inst) {
				jQuery('#endDate'+i).datepicker('destroy');
				var dateObject = getDatepickerObjTab('end', 'daily', i);
				var selectedDateObj = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay);
				dateObject["minDate"] = selectedDateObj;
				jQuery('#endDate'+i).datepicker(dateObject);
				// $("#endDate").datepicker("setDate", selectedDateObj);
			};
		}
		else if (dateInfo == 'monthly') {	
			datepickerObj['dateFormat'] = 'yy-mm';
			datepickerObj['minDate'] = '-2Y';
			datepickerObj['maxDate'] = '-1D';
			datepickerObj['defaultDate'] = new Date(2014, 0, 1);
			datepickerObj['onClose'] = function (dateText, inst) {	
				var month = jQuery('#ui-datepicker-div .ui-datepicker-month :selected').val();
				var year = jQuery('#ui-datepicker-div .ui-datepicker-year :selected').val();
				jQuery("#startDate"+i).datepicker('option', 'defaultDate', new Date(year, month, 1));
				jQuery("#startDate"+i).datepicker('setDate', new Date(year, month, 1));

			};
			datepickerObj['onSelect'] = function (dateText, inst) {	
				if (dateText !== inst.lastVal) {
					jQuery(this).change();	
				}
			};
		}
	}
	else if (dateType == 'end') {
		var today = new Date();
		datepickerObj['maxDate'] = today;
		if (dateInfo == 'hourly') {

			datepickerObj['dateFormat'] = 'yy-mm-dd';
			datepickerObj['timeFormat'] = 'hh';
			datepickerObj['showMinute'] = false;
			datepickerObj['timeText'] = '';
			datepickerObj['hourText'] = '';
			datepickerObj['minDate'] = getMinDate(jQuery('#startDate'+i).val());
			/*
			 * datepickerObj['onClose'] = function (dateText, inst) { var
			 * minDate = getMinDate($('#startDate').val()); var maxDate =
			 * getMaxDate($('#startDate').val()); var selectDate =
			 * (dateText.substr(0, 10)).toDate(); var selectHour =
			 * parseInt(dateText.substr(11, 2)); selectDate.setHours(selectHour,
			 * 0, 0, 0); if (selectDate < minDate) { var tYear =
			 * minDate.getFullYear(); var tMonth = minDate.getMonth(); var tDate =
			 * minDate.getDate(); var tHour = minDate.getHours(); tMonth =
			 * formatDate(tMonth + 1); tDate = formatDate(tDate); tHour =
			 * formatDate(tHour); $('#endDate').val(tYear + "-" + tMonth + "-" +
			 * tDate + ' ' + tHour); } else if (selectDate > maxDate) { var
			 * tYear = maxDate.getFullYear(); var tMonth = maxDate.getMonth();
			 * var tDate = maxDate.getDate(); var tHour = maxDate.getHours();
			 * tMonth = formatDate(tMonth + 1); tDate = formatDate(tDate); tHour =
			 * formatDate(tHour); $('#endDate').val(tYear + "-" + tMonth + "-" +
			 * tDate + ' ' + tHour); } };
			 */
		}
		else if (dateInfo == 'daily') {
			datepickerObj['dateFormat'] = 'yy-mm-dd';
			datepickerObj['minDate'] = '-30D';// getMinDate($('#startDate').val());
			// datepickerObj['maxDate'] = null;//
			// getMaxDate($('#startDate').val());
		}
		else if (dateInfo == 'monthly') {

			datepickerObj['dateFormat'] = 'yy-mm';
			datepickerObj['minDate'] = getMinDate(jQuery('#startDate'+i).val());
			// datepickerObj['maxDate'] = null;
			datepickerObj['onClose'] = function (dateText, inst) {
				var month = jQuery('#ui-datepicker-div .ui-datepicker-month :selected').val();
				var year = jQuery('#ui-datepicker-div .ui-datepicker-year :selected').val();
				// $('#endDate').val($.datepicker.formatDate('yy-mm', new
				// Date(year, month, 1)));
				jQuery("#endDate"+i).datepicker('option', 'defaultDate', new Date(year, month, 1));
				jQuery("#endDate"+i).datepicker('setDate', new Date(year, month, 1));
			};
		}
	}
	return datepickerObj;
}

function getDatepickerObjDay () {
	var datepickerObj = new Object();
	datepickerObj['showOn'] = 'both';    // 버튼,텍스트 필드 또는 모두 캘린더에 표시할지 여부를 선택
	datepickerObj['buttonImageOnly'] = true; //  버튼에 있는 이미지만 표시한다
	datepickerObj['buttonImage'] = './../include/img/ico/ico_calendar.png'; // 버튼이미지 경로
	datepickerObj['buttonText'] = '달력';   //버튼의 툴팁
	datepickerObj['changeYear'] = true;   //월을 바꿀수 있는 select 박스를 표시
	datepickerObj['changeMonth'] = true;  //년을 바꿀수 있는 select 박스를 표시
	datepickerObj['closeText'] = '선택';
	datepickerObj['showMonthAfterYear'] = true;
	datepickerObj['dayNamesMin'] = [ '일', '월', '화', '수', '목', '금', '토' ];
	datepickerObj['monthNamesShort'] = [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ];
	datepickerObj['dateFormat'] = 'yy-mm-dd';

	return datepickerObj;
	console.log(datepickerObj);
};
//get min date for end date
//author: liudandan
function setDatepickerDefaultRange(startElementId,endElementId) {
	var datepickerObj = new Object();
	datepickerObj['showOn'] = 'both';    // 버튼,텍스트 필드 또는 모두 캘린더에 표시할지 여부를 선택
	datepickerObj['buttonImageOnly'] = true; //  버튼에 있는 이미지만 표시한다
	datepickerObj['buttonImage'] = './../include/img/ico/ico_calendar.png'; // 버튼이미지 경로
	datepickerObj['buttonText'] = '달력';   //버튼의 툴팁
	datepickerObj['changeYear'] = true;   //월을 바꿀수 있는 select 박스를 표시
	datepickerObj['changeMonth'] = true;  //년을 바꿀수 있는 select 박스를 표시
	datepickerObj['closeText'] = '선택';
	datepickerObj['showMonthAfterYear'] = true;
	datepickerObj['dayNamesMin'] = [ '일', '월', '화', '수', '목', '금', '토' ];
	datepickerObj['monthNamesShort'] = [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ];
	datepickerObj['onSelect'] = function (value, element){
		if(element.id==startElementId){
			var predate = jQuery("#"+endElementId).val();
			jQuery("#"+endElementId).datepicker("option", "minDate", value);
			jQuery("#"+endElementId).val(predate);
		}else if (element.id==endElementId){
			var predate = jQuery("#"+startElementId).val();
			jQuery("#"+startElementId).datepicker("option", "maxDate", value);
			jQuery("#"+startElementId).val(predate);
		}
	}
	datepickerObj['dateFormat'] = 'yy-mm-dd';
	jQuery("#"+startElementId+",#"+endElementId).datepicker(datepickerObj);
};

// get min date for end date
// author: liudandan
function getMinDate (startDateStr) {
	var startDate = null;
	if (startDateStr.length == 13) {
		// hour
		startDate = (startDateStr.substr(0, 10)).toDate();
		var dayPlus = false;
		var hour = parseInt(startDateStr.substr(11, 2)) + 1;
		if (hour > 23) {
			hour = hour - 23;
			dayPlus = true;
		}
		if (dayPlus == true) {
			startDate.setTime(startDate.getTime() + 1000 * 60 * 60 * 24);
		}
		var tYear = startDate.getFullYear();
		var tMonth = startDate.getMonth();
		var tDate = startDate.getDate();
		tMonth = formatDate(tMonth + 1);
		tDate = formatDate(tDate);
		hour = formatDate(hour);
		// startDate + 1H
		var minDate = (tYear + "-" + tMonth + "-" + tDate).toDate();
		minDate.setHours(hour, 0, 0, 0);
		// preday 23:00
		var yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		yesterday.setHours(23, 0, 0, 0);
		if (minDate >= yesterday) {
			return yesterday;
		}
		else if (minDate < yesterday) {
			return minDate;
		}
	}
	else if (startDateStr.length == 10) {
		// day
		startDate = (startDateStr).toDate();
		// startDate + 1D
		startDate.setTime(startDate.getTime() + 1000 * 60 * 60 * 24);
		var tYear = startDate.getFullYear();
		var tMonth = startDate.getMonth();
		var tDate = startDate.getDate();
		tMonth = formatDate(tMonth + 1);
		tDate = formatDate(tDate);
		var minDate = (tYear + "-" + tMonth + "-" + tDate).toDate();
		// preday
		var yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		if (minDate >= yesterday) {
			return yesterday;
		}
		else if (minDate < yesterday) {
			return minDate;
		}
	}
	else if (startDateStr.length == 7) {
		// month
		var yearO = parseInt(startDateStr.substr(0, 4));
		var monthO = parseInt(startDateStr.substr(5, 2));
		var yearPlus = false;
		monthO = monthO + 1;
		if (monthO > 12) {
			monthO = monthO - 12;
			yearPlus = true;
		}
		if (yearPlus == true) {
			yearO = yearO + 1;
		}
		var today = new Date();
		var yearN = today.getFullYear();
		var monthN = today.getMonth();
		// startDate + 1M
		var minDate = (yearO + '-' + formatDate(monthO) + '-01').toDate();
		// premonth
		var preMonth = (yearN + '-' + formatDate(monthN) + '-01').toDate();
		if (minDate >= preMonth) {
			return preMonth;
		}
		else if (minDate < preMonth) {
			return minDate;
		}
	}
}
//get max date for end date
//author: liudandan
function getMaxDate (startDateStr) {
	var startDate = null;
	var today = new Date();
	if (startDateStr.length == 13) {
		// hour
		startDate = (startDateStr.substr(0, 10)).toDate();
		var dayPlus = false;
		var hour = parseInt(startDateStr.substr(11, 2)) + 23;
		if (hour > 23) {
			hour = hour - 24;
			dayPlus = true;
		}
		if (dayPlus == true) {
			startDate.setTime(startDate.getTime() + 1000 * 60 * 60 * 24);
		}
		var tYear = startDate.getFullYear();
		var tMonth = startDate.getMonth();
		var tDate = startDate.getDate();
		tMonth = formatDate(tMonth + 1);
		tDate = formatDate(tDate);
		hour = formatDate(hour);
		// startDate + 23H
		var maxDate = (tYear + "-" + tMonth + "-" + tDate).toDate();
		maxDate.setHours(hour, 0, 0, 0);
		// preday 23:00
		var yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		yesterday.setHours(23, 0, 0, 0);
		if (maxDate >= yesterday) {
			return yesterday;
		}
		else if (maxDate < yesterday) {
			return maxDate;
		}
	}
	else if (startDateStr.length == 10) {
		// day
		startDate = startDateStr.toDate();
		// startDate + 30D
		startDate.setTime(startDate.getTime() + 1000 * 60 * 60 * 24 * 29);
		var tYear = startDate.getFullYear();
		var tMonth = startDate.getMonth();
		var tDate = startDate.getDate();
		tMonth = formatDate(tMonth + 1);
		tDate = formatDate(tDate);
		var maxDate = (tYear + "-" + tMonth + "-" + tDate).toDate();
		// preday
		var yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		if (maxDate >= yesterday) {
			return yesterday;
		}
		else if (maxDate < yesterday) {
			return maxDate;
		}
	}
	else if (startDateStr.length == 7) {
		// month
		var yearO = parseInt(startDateStr.substr(0, 4));
		var monthO = parseInt(startDateStr.substr(5, 2));
		var yearPlus = false;
		monthO = monthO + 11;
		if (monthO > 12) {
			monthO = monthO - 12;
			yearPlus = true;
		}
		if (yearPlus == true) {
			yearO = yearO + 1;
		}
		var today = new Date();
		var yearN = today.getFullYear();
		var monthN = today.getMonth();
		// startDate + 11M
		var maxDate = (yearO + '-' + formatDate(monthO) + '-01').toDate();
		// premonth
		var preMonth = (yearN + '-' + formatDate(monthN) + '-01').toDate();
		if (maxDate >= preMonth) {
			return preMonth;
		}
		else if (maxDate < preMonth) {
			return maxDate;
		}
	}
}
//format 1-9 to 01, 02, ..., 09
//author: liudandan
function formatDate (date) {
	var d = date;
	if (date.toString().length == 1) {
		d = "0" + date;
	}
	return d;
}
//String to Date
//author: liudandan
String.prototype.toDate = function () {
	var temp = this.toString();
	temp = temp.replace(/-/g, "/");
	var date = new Date(Date.parse(temp));
	return date;
}
//chenzhanchao
serializeObjectRemove = function (o, name) {
	var result = {};
	for ( var p in o) {
		if (p != name) {
			if (result[p]) {
				result[p] = result[p] + "," + o[p];
			}
			else {
				result[p] = o[p];
			}
		}
	}
	return result;
};
//chenzhanchao
serializeObjectAdd = function (o, name, value) {
	if (o[name]) {
		o[name] = o[name] + "," + value;
	}
	else {
		o[name] = value;
	}
	return o;
};
//for notice(test)
//document.write("<script src='/s-portalcnm/html/TEST/test.js'></script>");
function getBytesCount (str) {
	var bytesCount = 0;
	if (str != null) {
		for ( var i = 0; i < str.length; i++) {
			var c = str.charAt(i);
			if (/^[\u0000-\u00ff]$/.test(c)) {
				bytesCount += 1;
			}
			else if (/[\uac00-\ud7ff]/.test(c)) {
				bytesCount += 3;
			}
			else {
				bytesCount += 3;
			}
		}
	}
	return bytesCount;
};
var IsValidMsg = {
		searchInput : [ /^[a-zA-Z0-9가-힣.\s-]{0,20}$/, "영문, 숫자, 한글 그리고 20자리 미만 문자열 입력가능합니다.", "disabled" ],
		crSearchInput : [ /^[a-zA-Z0-9가-힣][_?=.*-]{0,12}$/g, "영문, 숫자, 한글만 입력가능합니다.", "disabled" ],
		formInput : [ /^[a-zA-Z0-9가-힣.\s-]{0,250}$/, "영문, 숫자, 한글만 입력가능합니다.", "disabled" ],
		paramNameInput : [ /^[a-zA-Z0-9가-힣._\s-]{0,250}$/, "영문, 숫자, 한글만 입력가능합니다.", "disabled" ],
		paramExpInput : [ /^[a-zA-Z0-9가-힣.()\s-]{0,250}$/, "영문, 숫자, 한글만 입력가능합니다.", "disabled" ]

//PWD : [/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15})/gm,"8~15 사이의 수, 최소 1개의
//대문자와 소문자 그리고 특수문자 1개 포함","disabled"],
//EMAIL :
//[/^[a-zA-Z]{1,}[0-9a-zA-Z_-]{1,}[.]{0,1}[0-9a-zA-Z_-]{1,}[@][0-9a-zA-Z_-]{1,}[.][\/.0-9a-zA-Z_-]{1,}[0-9a-zA-Z_-]{1,}$/,"0000@000.com","disabled"],
};
function IsValid (input, inputdata) {
	var ExpStr = IsValidMsg[input][0];
	var status = true;
	status = ExpStr.test(inputdata);
	console.log("inputdata", inputdata);
	if (!status) {
		if (IsValidMsg[input][1] != "") {
			var okmessage = IsValidMsg[input][1];
			getConfirmPopup('알림', okmessage, 'alert');
			jQuery('#ok_alertPopup,#close_confirmPopup').click(function () {
				confirmPopupRemove();
			});

			status = false;
		}
	}
	return status;

};

//37자리 아이디 생성 (Random10 + yyyyMMddHHmmssSSS + Random10)
//function makeRandomThirtySevenDigitString () {
//	var front = makeRandomDigitString(10);
//	var currentdate = new Date();
//	var timestamp = makeStamp(currentdate);
//	var end = makeRandomDigitString(10);
//
//	return front + timestamp + end;
//}
//
//function makeRandomDigitString (x) {
//	var s = "";
//	while (s.length < x && x > 0) {
//		var r = Math.random();
//		s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
//	}
//	return s;
//}

jQuery.extend(jQuery.fn.validatebox.defaults.rules, {
	byteSizeVal : {
		validator : function (value, param) {
			var bytesCount = 0;
			if (value != null) {
				for ( var i = 0; i < value.length; i++) {
					var c = value.charAt(i);
					if (/^[\u0000-\u00ff]$/.test(c)) {
						bytesCount += 1;
					}
					else if (/[\uac00-\ud7ff]/.test(c)) {
						bytesCount += 3;
					}
					else {
						bytesCount += 3;
					}
				}
			}
			if (bytesCount < param[0]) {
				return true;
			}
			return false;
		},
		// Entered value's byteSize should be below param[0].
		message : '지정된  입력범위를 초과하였습니다.'
	},
	cnmInput : {
		validator : function (value) {
			if (/[^\u1100-\u11ff\uac00-\ud7af\u3130–\u318F\u3200–\u32FF\uA960–\uA97F\uD7B0–\uD7FF\uFF00–\uFFEFA-Za-z0-9\s]/g.test(value)) {
				console.log("iswrong?", value);
				return false;
			}
			else {
				return true;
			}
		},
		message : '영문, 숫자, 한글만 입력가능합니다.'
	},
	inputFilter : {
		validator : function (value) {
			console.log("value2", value);
			if (/^[a-zA-Z0-9가-힣][_?=.*-]{0,12}$/g.test(value)) {
				console.log(false);
				return false;
			}
			else {
				console.log(true);
				return true;
			}
		},
		message : '영문, 숫자, 한글만 입력가능합니다.'
	}
});
//when column's content is too long to show,format it.(time widget conflict
//with easyui datagrid)
function datagridFormat (value, row, index, formatI) {
	if (value != null && value != '') {
		var valLength = value.length;
		if (valLength > 17) {
			var result = '';
			var formatI = 0;
			for (; valLength > 17; valLength -= 17) {
				result = result + value.substring(17 * formatI, 17 * (formatI + 1)) + '<br/>';
			}
			result += value.substring(value.length - valLength, value.length);
		}
		else {
			result = value;
		}
		return result;
	}
	else
		return value;
}



// lkh 공통 함수 추가
//천단위 자리 콤마
function appendCommaToNumber (num) {
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
}


//증감 표출
function setIncrDecrText(param){
	if(param > 0){
		param = "+" + appendCommaToNumber(param) + "건";
		}else if(param < 0){
			param = appendCommaToNumber(param) + "건";
	}
	return param;
}

function nowYearMonth(){
	
	
	var dt = new Date();
	
	var nowYear = dt.getFullYear();
	
	//mng_s 20200309 이진호
	//getMonth()는 0~11까지의 정수 값을 주기 때문에 + 1 해야 현재 월에 맞춰짐
	//var nowMonth = "" + (dt.getMonth());
	var nowMonth = "" + (dt.getMonth() + 1);
	//mng_e 20200309 이진호
	
	
	//mng_s 20201009 kkm		//매년 초 1년씩 추가
	jQuery("#yearSel").append("<option value='2018'>2018</option>")
	jQuery("#yearSel").append("<option value='2019'>2019</option>")
	jQuery("#yearSel").append("<option value='2020'>2020</option>")

	if(nowMonth == "0"){
		nowYear = nowYear -1;
		nowMonth = 12;
	}
	//mng_e 20180102 leekh
	
	if(nowMonth.length<2){
		nowMonth = "0" + nowMonth;
	}

	jQuery("#yearSel").val(nowYear);
	jQuery("#monthSel").val(nowMonth);
	
	
	
}

//leekh 엑셀 전체 다운로드. 테이블 최대 7개까지 적용됨
function excelDownload2(filename, tblArray){
	 $("#exfilename").val(filename);
	 for(var i=0; i<tblArray.length; i++){
		 $("#htmlStr" + i).val($("#"+tblArray[i]).html());
	 }
 	$("#excelDownForm").submit();
	 
}

//leekh 1개 테이블 다운로드
function excelDownload(filename, tblname){
	 $("#exfilename").val(filename);
	 $("#htmlStr0").val($("#"+tblname).html());
	 	$("#excelDownForm").submit();
	 
}




function setFormAction(){
	
	document.getElementById("excelDownForm").action = formUrl;
}


//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴
function makeLeftMenu(topM, leftBigM, leftSmallM){
	
	
	console.log('===', topM, leftBigM, leftSmallM, '===');
	
	
	jQuery(".lefitMenuWrapper").append("<div class='leftTitle'></div>");
	jQuery(".lefitMenuWrapper").append("<div class='leftMenu'></div>");
	
	var bigClassOn = 1;
	var smallClassOn = 1;
	
	if(topM == "1"){		//서비스 현황
		
		jQuery(".leftTitle").html("서비스 현황");
		jQuery(".leftMenu").append("<ul>");
		
		jQuery(".leftMenu ul").append("<li id='lm1'><a id='lm1a' href='./../MN/totUseStat.html'>통계포탈</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm2'><a id='lm2a' href='./../MN/APIStat.html'>API 이용통계</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm3'><a id='lm3a' href='./../MN/serviceUseStat.html'>페이지 방문통계</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm4'><a id='lm4a' href='./../MN/RELStat.html'>검색어 통계</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm5'><a id='lm5a' href='./../MN/CommunityStat.html'>지역현안소통지도 통계</a></li>");
		
		
		
		if(leftBigM == "1"){	//총괄이용현황
					}else if(leftBigM == "2"){	//API 이용통계
						jQuery("#lm2").append("<ul class='sub'>");
						jQuery("#lm2 ul").append("<li id='ls1'><a id='ls1a' href='./../MN/APIStat.html'>종합</a></li>");
						jQuery("#lm2 ul").append("<li id='ls2'><a id='ls2a' href='./../MN/APIStatDetail.html'>상세</a></li>");
						
					}else if(leftBigM == "3"){	//페이지 방문통계
						jQuery("#lm3").append("<ul class='sub'>");
						jQuery("#lm3 ul").append("<li id='ls1'><a id='ls1a' href='./../MN/serviceUseStat.html'>서비스별 이용현황</a></li>");
						jQuery("#lm3 ul").append("<li id='ls2'><a id='ls2a' href='./../MN/interactiveMapStstUse.html'>대화형통계지도 이용현황</a></li>");
						jQuery("#lm3 ul").append("<li id='ls3'><a id='ls3a' href='./../MN/thematicMapUseStat.html'>통계주제도 이용현황</a></li>");
						jQuery("#lm3 ul").append("<li id='ls4'><a id='ls4a' href='./../MN/houseAnalysisMapUseStat.html'>살고싶은 우리동네 이용현황</a></li>");
						jQuery("#lm3 ul").append("<li id='ls5'><a id='ls5a' href='./../MN/bizStatMapUseStat.html'>생활업종지도 이용현황</a></li>");
						jQuery("#lm3 ul").append("<li id='ls6'><a id='ls6a' href='./../MN/introUseStat.html'>지역현안 소통지도</a></li>");
						jQuery("#lm3 ul").append("<li id='ls7'><a id='ls7a' href='./../MN/mobileUseStat.html'>모바일 이용현황</a></li>");
						jQuery("#lm3 ul").append("<li id='ls8'><a id='ls8a' href='./../MN/GalleryUseStat.html'>통계갤러리 이용현황</a></li>");
						jQuery("#lm3 ul").append("<li id='ls9'><a id='ls9a' href='./../MN/policyStaticMap.html'>정책통계지도 이용현황</a></li>");
						jQuery("#lm3 ul").append("<li id='ls0'><a id='ls0a' href='./../MN/technicalBizMap.html'>기술업종통계지도 이용현황</a></li>");
						
					}else if(leftBigM == "4"){	//검색어 통계
						
					}else if(leftBigM == "5"){	//통계소통지도 통계
						
					}
	}else if(topM == "2"){		//사용자 현황
		jQuery(".leftTitle").html("사용자 현황 현황");
		jQuery(".leftMenu").append("<ul>");
		
		jQuery(".leftMenu ul").append("<li id='lm1'><a id='lm1a' href='./../AK/USESRVStat.html'>인증키 현황</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm2'><a id='lm2a' href='./../AK/UPLOADData.html'>업로드 데이터 현황</a></li>");
		
		
		if(leftBigM == "1"){	//인증키 현황
			
		}else if(leftBigM == "2"){	//업로드 데이터 현황
		}
		
		
	}else if(topM == "3"){		//서비스관리
		jQuery(".leftTitle").html("서비스관리");
		jQuery(".leftMenu").append("<ul>");
		
		jQuery(".leftMenu ul").append("<li id='lm1'><a id='lm1a' href='/s-portalcnm/html/DT/policyCategoryManager.html'>정책통계지도</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm2'><a id='lm2a' href='/s-portalcnm/html/DT/themaMapManage.html'>주제도</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm3'><a id='lm3a' href='/s-portalcnm/html/DT/Community.html'>지역현안 소통지도</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm4'><a id='lm4a' href='/s-portalcnm/html/DT/KOSISManage.html'>KOSIS목록 관리</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm5'><a id='lm5a' href='/s-portalcnm/html/DT/PUBDataManage.html'>공공데이터 관리</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm6'><a id='lm6a' href='/s-portalcnm/html/DT/BannerManage.html'>배너관리</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm7'><a id='lm7a' href='/s-portalcnm/contents/gsks/gsks_01_04.jsp'>자료제공 관리</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm8'><a id='lm8a' href='/s-portalcnm/html/DT/Gallerylist.html'>통계갤러리</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm9'><a id='lm9a' href='/s-portalcnm/html/DT/MobileManage.html'>모바일 서비스 관리</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm10'><a id='lm10a' href='/s-portalcnm/ststistics/ststisticsUSLifeCycleMng.do'>My통계로</a></li>"); // 2020-02-19수정
		//2019-07-30 [김남민] 관리자 > 서비스 관리 > 일자리 맵 > 일자리 통계정보 집계. START
		jQuery(".leftMenu ul").append("<li id='lm11'><a id='lm11a' href='/s-portalcnm/html/DT/WorkRoadStatsInfoSm.html'>일자리 맵</a></li>");
		//2019-07-30 [김남민] 관리자 > 서비스 관리 > 일자리 맵 > 일자리 통계정보 집계. END
		
		if(leftBigM == "1"){	//정책통계지도
			
			jQuery("#lm1").append("<ul class='sub'>");
			jQuery("#lm1 ul").append("<li id='ls1'><a id='ls1a' href='./../DT/policyCategoryManager.html'>카테고리 관리</a></li>");
			jQuery("#lm1 ul").append("<li id='ls2'><a id='ls2a' href='./../DT/policyMapManager.html'>지표목록 관리</a></li>");
			jQuery("#lm1 ul").append("<li id='ls3'><a id='ls3a' href='./../DT/openDataMapManager.htmll'>지자체 데이터 관리</a></li>");
			
		}else if(leftBigM == "2"){	//업로드 데이터 현황
			jQuery("#lm2").append("<ul class='sub'>");
			jQuery("#lm2 ul").append("<li id='ls1'><a id='ls1a' href='./../DT/themaMapManage.html'>카테고리</a></li>");
			jQuery("#lm2 ul").append("<li id='ls2'><a id='ls2a' href='./../DT/themaMapMainManage.html'>주제도</a></li>");
			jQuery("#lm2 ul").append("<li id='ls3'><a id='ls3a' href='./../DT/themaMapRegManager.html'>데이터 관리</a></li>");
		}else if(leftBigM == "3"){	//지역현안소통지도
			jQuery("#lm3").append("<ul class='sub'>");
			jQuery("#lm3 ul").append("<li id='ls1'><a id='ls1a' href='./../DT/Community.html'>지역현안 소통지도 관리</a></li>");
			jQuery("#lm3 ul").append("<li id='ls2'><a id='ls2a' href='./../DT/CommunityManage.html'>등록자료 관리</a></li>");
		}else if(leftBigM == "4"){	//KOSIS 목록 관리
			jQuery("#lm4").append("<ul class='sub'>");
		}else if(leftBigM == "5"){	//공공데이터 관리
			jQuery("#lm5").append("<ul class='sub'>");
		}else if(leftBigM == "6"){	//배너 관리
			jQuery("#lm6").append("<ul class='sub'>");
		}else if(leftBigM == "7"){	//자료제공 관리
			jQuery("#lm7").append("<ul class='sub'>");
			
			jQuery("#lm7 ul").append("<li id='ls1'><a id='ls1a' href='/s-portalcnm/contents/gsks/gsks_01_04.jsp'>요청목록</a></li>");
			jQuery("#lm7 ul").append("<li id='ls2'><a id='ls2a' href='/s-portalcnm/contents/gsks/gsks_01_04_01.jsp'>자료제공</a></li>");
			jQuery("#lm7 ul").append("<li id='ls3'><a id='ls3a' href='/s-portalcnm/contents/gsks/gsks_01_04_05.jsp'>자료제공 현황</a></li>");
			jQuery("#lm7 ul").append("<li id='ls4'><a id='ls4a' href='/s-portalcnm/contents/gsks/gsks_01_04_06.jsp'>결제관리</a></li>");
		}else if(leftBigM == "8"){	//통계갤러리
			jQuery("#lm8").append("<ul class='sub'>");
		}else if(leftBigM == "9"){	//모바일 서비스 관리
			jQuery("#lm9").append("<ul class='sub'>");
		}
		// 19년반영 시작
		else if(leftBigM == "10"){
			jQuery("#lm10").append("<ul class='sub'>");
			jQuery("#lm10 ul").append("<li id='ls1'><a id='ls1a' href='/s-portalcnm/ststistics/ststisticsUSLifeCycleMng.do'>생애주기관리</a></li>");
			jQuery("#lm10 ul").append("<li id='ls2'><a id='ls2a' href='/s-portalcnm/ststistics/ststisticsUSInterestsMng.do'>통계거리관리</a></li>");
			jQuery("#lm10 ul").append("<li id='ls3'><a id='ls3a' href='/s-portalcnm/ststistics/ststisticsUSKeyWordMng.do'>키워드관리</a></li>");
//			jQuery("#lm10 ul").append("<li id='ls4'><a id='ls4a' href='/s-portalcnm/ststistics/ststisticsUSSubKeyWordMng.do'>유사키워드관리</a></li>");
			jQuery("#lm10 ul").append("<li id='ls4'><a id='ls5a' href='/s-portalcnm/ststistics/ststisticsUSAccumulateKeyWordMng.do'>누적키워드관리</a></li>");
			jQuery("#lm10 ul").append("<li id='ls5'><a id='ls6a' href='/s-portalcnm/ststistics/ststisticsUSDataMng.do'>서비스관리</a></li>");
		} 
		// 19년반영 끝
		//2019-07-30 [김남민] 관리자 > 서비스 관리 > 일자리 맵 > 일자리 통계정보 집계. START
		else if(leftBigM == "11"){	//일자리 맵
			jQuery("#lm11").append("<ul class='sub'>");
			jQuery("#lm11 ul").append("<li id='ls1'><a id='ls1a' href='/s-portalcnm/html/DT/WorkRoadStatsInfoSm.html'>일자리 통계정보 집계</a></li>");
			jQuery("#lm11 ul").append("<li id='ls2'><a id='ls2a' href='/s-portalcnm/html/DT/WorkRoadStatsItemManage.html'>일자리 통계항목 관리</a></li>");
			//2020-05-12 [곽제욱] 관리자 > 서비스 관리 > 일자리 맵 > 일자리 공통코드 조회. START
			jQuery("#lm11 ul").append("<li id='ls3'><a id='ls3a' href='/s-portalcnm/html/DT/WorkRoadCodeInfo.html'>일자리 코드정보 조회</a></li>");
			//2020-05-12 [곽제욱] 관리자 > 서비스 관리 > 일자리 맵 > 일자리 공통코드 조회. END
			
		}
		//2019-07-30 [김남민] 관리자 > 서비스 관리 > 일자리 맵 > 일자리 통계정보 집계. END

	}else if(topM == "4"){		//정보관리
		jQuery(".leftTitle").html("정보 관리");
		jQuery(".leftMenu").append("<ul>");
		
		//왼쪽 빅메뉴 추가
		jQuery(".leftMenu ul").append("<li id='lm1'><a id='lm1a' href='./../DT/RELManage.html'>연관어 정보관리</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm2'><a id='lm2a' href='./../DT/THBookManage.html'>즐겨찾는 통계관리</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm3'><a id='lm3a' href='./../DT/EXPTTIPManage.html'>설명문구 관리</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm4'><a id='lm4a' href='./../DT/THMetaManage.html'>통계항목 관리</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm4'><a id='lm4a' href='./../DT/AccessManage.html'>접근 관리</a></li>");
		
		jQuery("#lm" + topM).append("<ul class='sub'>");
		
	}else if(topM == "5"){		//게시판 관리
		jQuery(".leftTitle").html("게시판 관리");
		jQuery(".leftMenu").append("<ul>");
		
		//왼쪽 빅메뉴 추가
		jQuery(".leftMenu ul").append("<li id='lm1'><a id='lm1a' href='./../QA/boardManage.html'>통계포탈</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm2'><a id='lm2a' href='./../QA/DevboardManage.html'>개발자사이트</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm3'><a id='lm3a' href='./../QA/reqBoardList.html'>운영이력관리</a></li>");
		
		//왼쪽 스몰메뉴 추가
		if(leftBigM == "1"){	//통계포탈
			jQuery("#lm1").append("<ul class='sub'>");
			jQuery("#lm1 ul").append("<li id='ls1'><a id='ls1a' href='./../QA/boardManage.html'>공지사항</a></li>");
			jQuery("#lm1 ul").append("<li id='ls2'><a id='ls2a' href='./../QA/QASearch.html'>Q&amp;A</a></li>");
			jQuery("#lm1 ul").append("<li id='ls3'><a id='ls3a' href='./../QA/faqManage.html'>FAQ</a></li>");
			jQuery("#lm1 ul").append("<li id='ls4'><a id='ls4a' href='./../QA/mediaIntro.html'>언론소개자료</a></li>");
			jQuery("#lm1 ul").append("<li id='ls5'><a id='ls5a' href='./../QA/communityNoticeManage.html'>통계소통자료</a></li>");
			jQuery("#lm1 ul").append("<li id='ls6'><a id='ls6a' href='/s-portalcnm/html/share/useBoardListConfirm.html'>활용사례</a></li>");
			jQuery("#lm1 ul").append("<li id='ls7'><a id='ls7a' href='./../QA/boardGridManage.html'>그리드 개선의견</a></li>");
		}
		//왼쪽 스몰메뉴 추가
		if(leftBigM == "2"){	//개발자사이트
			jQuery("#lm2").append("<ul class='sub'>");
			jQuery("#lm2 ul").append("<li id='ls1'><a id='ls1a' href='./../QA/DevboardManage.html'>공지사항</a></li>");
			jQuery("#lm2 ul").append("<li id='ls2'><a id='ls2a' href='./../QA/DevQASearch.html'>Q&amp;A</a></li>");
			jQuery("#lm2 ul").append("<li id='ls3'><a id='ls3a' href='./../QA/DevfaqManage.html'>FAQ</a></li>");
			jQuery("#lm2 ul").append("<li id='ls4'><a id='ls4a' href='./../QA/DevAPISearch.html'>API</a></li>");
		}
		//왼쪽 스몰메뉴 추가
		if(leftBigM == "3"){ //운영이력관리
			jQuery("#lm3").append("<ul class='sub'>");
			jQuery("#lm3 ul").append("<li id='ls1'><a id='ls1a' href='./../QA/reqBoardList.html'>운영이력관리</a></li>");
		}
		
		
		
	}else if(topM == "6"){		//회원 관리
		jQuery(".leftTitle").html("회원 관리");
		jQuery(".leftMenu").append("<ul>");
		
		//왼쪽 빅메뉴 추가
		jQuery(".leftMenu ul").append("<li id='lm1'><a id='lm1a' href='./../MB/member.html'>일반회원</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm2'><a id='lm2a' href='./../MB/manager.html'>관리자</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm3'><a id='lm3a' href='./../CM/myPage.html'>마이페이지</a></li>");
		
		
		//왼쪽 스몰메뉴 추가
		if(leftBigM == "1"){	//통계포탈

		}
		
	}	else if(topM == "7"){		//회원 관리
		
		jQuery(".leftTitle").html("회원 관리");
		jQuery(".leftMenu").append("<ul>");
		
		//왼쪽 빅메뉴 추가
		jQuery(".leftMenu ul").append("<li id='lm1'><a id='lm1a' href='./../MB/member.html'>회원 관리</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm2'><a id='lm2a' href='./../MB/manager.html'>관리자</a></li>");
		jQuery(".leftMenu ul").append("<li id='lm3'><a id='lm3a' href='./../CM/myPage.html'>마이페이지</a></li>");
		
		jQuery("#lm" + topM).append("<ul class='sub'>");
		
	}
	
	
	jQuery("#lm" + leftBigM + "a").addClass("on");
	jQuery("#ls" + leftSmallM + "a").addClass("on");
	
	
	
}

//srvLog쌓기	
function srvLogWrite(fClass1Cd, fClass2Cd, fClass3Cd, fClass4Cd, detCd, param){
	/*
		운영 반영시 주석 해지
	*/
	
	var data;
	
	data = {"fClass1Cd": fClass1Cd,
 			"fClass2Cd" : fClass2Cd,
 			"fClass3Cd" : fClass3Cd,
 			"fClass4Cd" : fClass4Cd};
	if(detCd != null && detCd != ''){
		data.detCd = detCd;
	}
	if(param != null && param != ''){
		data.param = param;
	}
	
	
	jQuery.ajax({
 		type:"POST",
 		//url: "https://dev.kostat.go.kr/ServiceAPI/common/SRVLogWrite.json",
 		url: "/ServiceAPI/common/SRVLogWrite.json",
 		data: data,
		async: true,
 		success:function(data){ 
 		},
 		error:function(data) {
 		}
	});
}


// lkh 공통함수추가 end