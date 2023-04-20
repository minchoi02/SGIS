var gv_common_loading = new sop.portal.absAPI();

/**
 * @name : common_loading
 * @description : 화면 로딩 표시 제거 (z-index 10000)
 * @date : 2019.06.27
 * @author : 김남민
 * @history :
 * @param p_flag : true/false => 표시/감춤
 */
function common_loading(p_flag) {
	if(p_flag) {
		gv_common_loading.onBlockUIPopup();
	}
	else {
		gv_common_loading.onBlockUIClose();
	}
}

/**
 * @name : common_login
 * @description : 로그인 화면으로 이동
 * @date : 2019.07.02
 * @author : 김남민
 * @history :
 * @param :
 */
function common_login(url) {
	if(!url) {
		url = encodeURIComponent(contextPath+location.pathname+location.search);
	}
	location.href=contextPath+"/m2019/login/login.sgis?returnPage="+url;
	return false;
}

/**
 * @name : common_login_info
 * @description : 로그인 화면으로 이동
 * @date : 2019.07.02
 * @author : 김남민
 * @history :
 * @param :
 */
function common_login_info(url) {
	if(!url) {
		url = encodeURIComponent(contextPath+location.pathname+location.search);
	}
	location.href=contextPath+"/m2019/login/loginInfoMap.sgis?returnPage="+url;
}

/**
 * @name : common_logout
 * @description : 로그아웃 처리
 * @date : 2019.07.02
 * @author : 김남민
 * @history :
 * @param :
 */
function common_logout() {
	//자동로그인 쿠키 초기화
	common_remove_cookie("loginSaveAutoLogin");
	common_remove_cookie("loginSaveAutoLoginId");
	common_remove_cookie("loginSaveAutoLoginPassEncryption");
	
	//로그아웃
	logout();
}

/**
 * @name : common_get_cookie
 * @description : 쿠키 조회
 * @date : 2019.07.02
 * @author : 김남민
 * @history :
 * @param :
 */
function common_get_cookie(p_name) {
	var lvResultData = "";
	// ajax 시작
	$.ajax({
	    url: contextPath + "/m2019/login/getCookie.json",
	    type: 'post',
	    dataType : 'json',
	    async: false,
	    data: {
	    	name : p_name
	    }
	}).done(function (res) { // 완료
		if(res.errCd == "0") {
			lvResultData = res.result.resultData;
		}else if(res.errCd == "-401") {
			//common_alert(res.errMsg);
		}else{
			//common_alert(res.errMsg);
		}
	}).fail(function (res) { // 실패
		//common_alert(errorMessage);
	}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
		//common_loading(false);
	});
	// ajax 끝
	//alert(p_name+" : "+lvResultData);
	return lvResultData;
}

/**
 * @name : common_set_cookie
 * @description : 쿠키 저장
 * @date : 2019.07.02
 * @author : 김남민
 * @history :
 * @param :
 */
function common_set_cookie(p_name, p_value, p_expires_day) {
	// ajax 시작
	$.ajax({
	    url: contextPath + "/m2019/login/setCookie.json",
	    type: 'post',
	    dataType : 'json',
	    async: false,
	    data: {
	    	name : p_name,
	    	value : p_value,
	    	expires_day : p_expires_day
	    }
	});
	// ajax 끝
}

/**
 * @name : common_remove_cookie
 * @description : 쿠키 삭제
 * @date : 2019.07.02
 * @author : 김남민
 * @history :
 * @param :
 */
function common_remove_cookie(p_name) {
	// ajax 시작
	$.ajax({
	    url: contextPath + "/m2019/login/removeCookie.json",
	    type: 'post',
	    dataType : 'json',
	    async: false,
	    data: {
	    	name : p_name
	    }
	});
	// ajax 끝
}

/**
 * @name : common_alert
 * @description : 알림
 * @date : 2019.06.27
 * @author : 김남민
 * @history :
 * @param
 * 		p_msg : 메세지
 * 		p_callback : 확인버튼시 동작할 함수
 */
function common_alert(p_msg, p_callback) {
	//화면 띄움
	$("#common_popup_back").parent().show();
	$("#common_popup_alert").show();
	$("#common_popup_alert_message").html(p_msg);
	
	//이전 이벤트 제거
	$("#common_popup_back").unbind();
	$("#common_popup_alert_ok").unbind();
	
	//새로운 이벤트 맵핑
	$("#common_popup_back").click(function() {
		$("#common_popup_alert_close").click();
	});
	$("#common_popup_alert_ok").click(function() {
		$("#common_popup_alert_close").click();
		if(typeof p_callback === "function") {
			p_callback();
		}
	});
}

/**
 * @name : common_confirm
 * @description : 확인
 * @date : 2019.06.27
 * @author : 김남민
 * @history :
 * @param
 * 		p_msg : 메세지
 * 		p_callback : 확인버튼시 동작할 함수
 * 		p_callback2 : 취소버튼시 동작할 함수
 */
function common_confirm(p_msg, p_callback, p_callback2) {
	//화면 띄움
	$("#common_popup_back").parent().show();
	$("#common_popup_confirm").show();
	$("#common_popup_confirm_message").html(p_msg);
	
	//이전 이벤트 제거
	$("#common_popup_back").unbind();
	$("#common_popup_confirm_ok").unbind();
	$("#common_popup_confirm_cancel").unbind();
	
	//새로운 이벤트 맵핑
	$("#common_popup_back").click(function() {
		$("#common_popup_confirm_close").click();
	});
	$("#common_popup_confirm_ok").click(function() {
		$("#common_popup_confirm_close").click();
		if(typeof p_callback === "function") {
			p_callback();
		}
	});
	$("#common_popup_confirm_cancel").click(function() {
		$("#common_popup_confirm_close").click();
		if(typeof p_callback2 === "function") {
			p_callback2();
		}
	});
}

/**
 * @name : common_localtion
 * @description : 위치동의
 * @date : 2019.06.27
 * @author : 김남민
 * @history :
 * @param
 * 		p_map : 지도
 * 		p_callback : 위치동의시 동작할 함수
 * 		p_callback2 : 위치미동의시 동작할 함수
 */
function common_localtion(p_map, p_callback, p_callback2) {
	/** 위치 가져오는 함수 정리 START **/
	//현재위치 가져오기
	//param1 : 콜백함수
	/*p_map.getCurrentLocation(function(p_center, p_flag, p_msg, p_msg2) {
		console.log(p_center); //현재위치
		console.log(p_flag); //현재위치 가져오는거 성공여부 (true/false)
		console.log(p_msg); //현재위치 가져오는데 실패한경우 메세지 or p_msg2가 있는 경우 에러코드
		console.log(p_msg2); //현재위치 가져오는데 실패한경우 메세지
	});*/
	//현재위치 표시하고 맵 중앙에 위치하기
	//param1 : 현재위치 가져오기 실패시 메세지 표시 여부
	//param2 : 콜백함수 (성공했을때만 호출)
	/*p_map.moveCurrentLocation(true, function() {
		
	});*/
	//맵가운데 지역코드 불러오기
	//param1 : center(null인경우 지도 가운데로 부터 가져옴)
	//param2 : 콜백함수
	/*p_map.getCenterToAdmCd(null, function(res) { 
		console.log(res.result.sido_cd);
		console.log(res.result.sido_nm);
		console.log(res.result.sgg_cd);
		console.log(res.result.sgg_nm);
		console.log(res.result.emdong_cd);
		console.log(res.result.emdong_nm);
	});*/
	
	//변수선언
	var my_lc_info_agree_yn = common_get_cookie("lc_info_agree_yn");
	var my_center = null;
	var my_x = null;
	var my_y = null;
	var my_sido_cd = "";
	var my_sido_nm = "";
	var my_sgg_cd = "";
	var my_sgg_nm = "";
	var my_emdong_cd = "";
	var my_emdong_nm = "";
	
	//기존 위치동의 여부 조회
	if(sop.isLogin) { //로그인 체크
		// ajax 시작
		$.ajax({
		    url: contextPath + "/m2019/workroad/selectSrvDtJobClmserInfo.json",
		    type: 'post',
		    dataType : 'json',
		    async: false,
		    data: {
		    	member_id: sop.member_id //로그인 ID
		    }
		}).done(function (res) { // 완료
			if(res.errCd == "0") {
				var lvResultList = res.result.resultList;
				var lvResultCount = res.result.resultCount;
				if(lvResultCount > 0) {
					my_lc_info_agree_yn = lvResultList[0].lc_info_agree_yn;
				}
			}else if(res.errCd == "-401") {
				//common_alert(res.errMsg);
			}else{
				//common_alert(res.errMsg);
			}
		}).fail(function (res) { // 실패
			//common_alert(errorMessage);
		}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
			//common_loading(false);
		});
		// ajax 끝
	}
	
	//위치동의 신규 또는 미동의.
	if(my_lc_info_agree_yn != "Y") {
		//팝업 표시
		$("#common_popup_back").parent().show();
		$("#common_popup_location").show();
		
		//버튼 이벤트 제거
		$("#common_popup_back").unbind();
		$("#common_popup_location_close").unbind();
		$("#common_popup_location_ok").unbind();
		
		//닫기 버튼(위치미동의 처리)
		$("#common_popup_location_close").click(function() {
			//팝업 숨김
			$("#common_popup_back").parent().hide();
			$("#common_popup_location").hide();
			
			//위치미동의 저장
			common_remove_cookie("lc_info_agree_yn"); // 쿠키
			if(sop.isLogin) { //로그인 체크
				// ajax 시작
				$.ajax({
				    url: contextPath + "/m2019/workroad/mergeSrvDtJobClmserInfo.json",
				    type: 'post',
				    dataType : 'json',
				    data: {
				    	member_id: sop.member_id //로그인 ID
				    	,lc_info_agree_yn : "N"
				    }
				});
			}
			// ajax 끝
			
			//콜백
			if(typeof p_callback2 === "function") {
				p_callback2();
			}
		});
		/*$("#common_popup_back").click(function() {
			$("#common_popup_location_close").click();
		});*/
		
		//동의버튼(위치동의 처리)
		$("#common_popup_location_ok").click(function() {
			
			srvLogWrite('M0','12','03','00','동의',''); // 사용자 위치동의
			
			//팝업 숨김
			$("#common_popup_back").parent().hide();
			$("#common_popup_location").hide();

			//위치동의 저장
			common_set_cookie("lc_info_agree_yn", "Y", 365); // 쿠키
			if(sop.isLogin) { //로그인 체크
				// ajax 시작
				$.ajax({
				    url: contextPath + "/m2019/workroad/mergeSrvDtJobClmserInfo.json",
				    type: 'post',
				    dataType : 'json',
				    data: {
				    	member_id: sop.member_id //로그인 ID
				    	,lc_info_agree_yn : "Y"
				    }
				});
			}
			// ajax 끝
			
			//지도 현재위치로 이동
			p_map.moveCurrentLocation(true, function() {
				//맵의 중앙 adm_cd 가져오기
				p_map.getCenterToAdmCd(null, function(res) { 
					my_center = p_map.gMap.getCenter();
					my_x = my_center.x;
					my_y = my_center.y;
					my_sido_cd = res.result.sido_cd;
					my_sido_nm = res.result.sido_nm;
					my_sgg_cd = res.result.sgg_cd;
					my_sgg_nm = res.result.sgg_nm;
					my_emdong_cd = res.result.emdong_cd;
					my_emdong_nm = res.result.emdong_nm;
					
					//콜백
					if(typeof p_callback === "function") {
						p_callback(my_x, my_y, my_sido_cd, my_sido_nm, my_sgg_cd, my_sgg_nm, my_emdong_cd, my_emdong_nm);
					}
				});
			});
		});
	}
	//기존에 위치동의 완료.
	else {
		//지도 현재위치로 이동
		p_map.moveCurrentLocation(true, function() {
			//맵의 중앙 adm_cd 가져오기
			p_map.getCenterToAdmCd(null, function(res) { 
				my_center = p_map.gMap.getCenter();
				my_x = my_center.x;
				my_y = my_center.y;
				my_sido_cd = res.result.sido_cd;
				my_sido_nm = res.result.sido_nm;
				my_sgg_cd = res.result.sgg_cd;
				my_sgg_nm = res.result.sgg_nm;
				my_emdong_cd = res.result.emdong_cd;
				my_emdong_nm = res.result.emdong_nm;
				
				//콜백
				if(typeof p_callback === "function") {
					p_callback(my_x, my_y, my_sido_cd, my_sido_nm, my_sgg_cd, my_sgg_nm, my_emdong_cd, my_emdong_nm);
				}
			});
		});
	}
}
