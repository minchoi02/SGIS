var gv_common_loading = new sop.portal.absAPI();
//생활환경 텍스트 정의

var lifeEnvironmentText = {
	HMM0001 : {name : "대기오염도", good : "좋음", bad : "나쁨", normal : "보통"}
	,HMM0002 : {name : "생활날씨", good : "좋음", bad : "나쁨", normal : "보통"}
	,HMM0003 : {name : "녹지비율", good : "높음", bad : "낮음", normal : "보통"}
	,HMM0004 : {name : "공동주택비율", good : "높음", bad : "낮음", normal : "보통"}
	,HMM0005 : {name : "주거면적", good : "넓음", bad : "좁음", normal : "보통"}
	,HMM0006 : {name : "노후주택비율", good : "낮음", bad : "높음", normal : "보통"}
	,HMM0007 : {name : "자가점유비율", good : "높음", bad : "낮음", normal : "보통"}
	,HMM0008 : {name : "면적당 아파트 가격", good : "높음", bad : "낮음", normal : "보통"}
	,HMM0035 : {name : "공시지가", good : "높음", bad : "낮음", normal : "보통"}
	,HMM0111 : {name : "단독주택비율", good : "높음", bad : "낮음", normal : "보통"}
	,HMM0009 : {name : "청장년인구비율", good : "높음", bad : "낮음", normal : "보통"}
	,HMM0010 : {name : "혈연가구 비율", good : "높음", bad : "낮음", normal : "보통"}
	,HMM0011 : {name : "사업체 종사자 비율", good : "높음", bad : "낮음", normal : "보통"}
	,HMM0012 : {name : "순유입인구 비율", good : "높음", bad : "낮음", normal : "보통"}
	,HMM0013 : {name : "화재 안전", good : "좋음", bad : "나쁨", normal : "보통"}
	,HMM0014 : {name : "교통사고 안전", good : "좋음", bad : "나쁨", normal : "보통"}
	,HMM0028 : {name : "범죄 안전", good : "좋음", bad : "나쁨", normal : "보통"}
	,HMM0029 : {name : "안전사고", good : "좋음", bad : "나쁨", normal : "보통"}
	,HMM0031 : {name : "감염병 안전", good : "좋음", bad : "나쁨", normal : "보통"}
	,HMM0032 : {name : "자연재해 안전", good : "좋음", bad : "나쁨", normal : "보통"}
	,HMM0015 : {name : "편의시설 수", good : "많음", bad : "적음", normal : "보통"}
	,HMM0016 : {name : "쇼핑시설 수", good : "많음", bad : "적음", normal : "보통"}
	,HMM0017 : {name : "외식시설 수", good : "많음", bad : "적음", normal : "보통"}
	,HMM0018 : {name : "대중교통 이용률", good : "높음", bad : "낮음", normal : "보통"}
	,HMM0033 : {name : "잡화점 수", good : "많음", bad : "적음", normal : "보통"}
	,HMM0020 : {name : "교원 1인당 학생 수", good : "적음", bad : "많음", normal : "보통"}
	,HMM0021 : {name : "고등교육기관 수", good : "많음", bad : "적음", normal : "보통"}
	,HMM0022 : {name : "학원 수", good : "많음", bad : "적음", normal : "보통"}
	,HMM0023 : {name : "유치원 및 보육시설", good : "많음", bad : "적음", normal : "보통"}
	,HMM0024 : {name : "병의원 및 약국", good : "많음", bad : "적음", normal : "보통"}
	,HMM0025 : {name : "노인복지시설", good : "많음", bad : "적음", normal : "보통"}
	,HMM0026 : {name : "사회복지시설", good : "많음", bad : "적음", normal : "보통"}
	,HMM0027 : {name : "문화시설 수", good : "많음", bad : "적음", normal : "보통"}
	,HMM0034 : {name : "체육시설 수", good : "많음", bad : "적음", normal : "보통"}
}

/**
 * @name : common_loading
 * @description : 화면 로딩 표시 제거 (z-index 10000)
 * @date : 2020.06.09
 * @author : 한광희
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
 * @name : common_get_cookie
 * @description : 쿠키 조회
 * @date : 2020.06.09
 * @author : 한광희
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
 * @date : 2020.06.09
 * @author : 한광희
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
 * @date : 2020.06.09
 * @author : 한광희
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
 * @date : 2020.06.09
 * @author : 한광희
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
	
	// 알림 창 화면 중앙에 위치
	$("#common_popup_alert").css({"top": (($(window).height()-$("#common_popup_alert").outerHeight())/2+$(window).scrollTop())+"px"})
	
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
 * @date : 2020.06.09
 * @author : 한광희
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
 * @date : 2020.06.09
 * @author : 한광희
 * @history :
 * @param
 * 		p_map : 지도
 * 		p_callback : 위치동의시 동작할 함수
 * 		p_callback2 : 위치미동의시 동작할 함수
 */
function common_localtion(p_map, p_callback, p_callback2) {
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
		
	//위치동의 신규 또는 미동의.
	if(my_lc_info_agree_yn != "Y") {
		//팝업 표시
		$("#common_popup_back").parent().show();
		$("#common_popup_location").show();
		
		//버튼 이벤트 제거
		$("#common_popup_back").unbind();
		$("#common_popup_location_close").unbind();
		$("#common_popup_location_ok").unbind();
		$("#common_popup_location_cancel").unbind();	// 2020.09.02[한광희] 위치동의 허용안함 버튼 추가
		
		//닫기 버튼(위치미동의 처리)
		$("#common_popup_location_close").click(function() {
			srvLogWrite('O0', '52', '02', '00', '비허용', '');
			//팝업 숨김
			$("#common_popup_back").parent().hide();
			$("#common_popup_location").hide();
			
			//위치미동의 저장
			common_remove_cookie("lc_info_agree_yn"); // 쿠키
			
			//콜백
			if(typeof p_callback2 === "function") {
				p_callback2();
			}
		});
		
		/** 2020.09.02[한광희] 위치동의 허용안함 버튼 추가 START */
		//허용 안함 버튼(위치미동의 처리)
		$("#common_popup_location_cancel").click(function() {
			srvLogWrite('O0', '52', '02', '00', '비허용', '');
			//팝업 숨김
			$("#common_popup_back").parent().hide();
			$("#common_popup_location").hide();
			
			//위치미동의 저장
			common_remove_cookie("lc_info_agree_yn"); // 쿠키
			
			//콜백
			if(typeof p_callback2 === "function") {
				p_callback2();
			}
		});
		/** 2020.09.02[한광희] 위치동의 허용안함 버튼 추가 END */
		
		//동의버튼(위치동의 처리)
		$("#common_popup_location_ok").click(function() {
			srvLogWrite('O0', '52', '02', '00', '허용', '');
			//팝업 숨김
			$("#common_popup_back").parent().hide();
			$("#common_popup_location").hide();

			//위치동의 저장
			common_set_cookie("lc_info_agree_yn", "Y", 365); // 쿠키
			
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
		srvLogWrite('O0', '52', '02', '00', '허용', '');
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

/**
 * @name : common_area
 * @description : 시도/시군구/읍면동 조회
 * @date : 2020.07.09
 * @author : 한광희
 * @history :
 * @param
 * 		p_type : 조회 타입 구분
 * 		p_sido_cd : 시도코드
 * 		p_sgg_cd : 시군구코드
 * 		p_emdong_cd : 읍면동코드
 * 		p_callback : 확인버튼시 동작할 함수
 * 		p_callback2 : 취소버튼시 동작할 함수
 */
function common_area(p_type, p_sido_cd, p_sgg_cd, p_emdong_cd, p_callback, p_callback2) {
	if(p_type == "sgg"){
		$("#popupArea_emdong").css("display", "none");
	} else if(p_type == "emdong"){	// 2020.09.02[한광희] 관심지역 팝업 읍면동 표출 수정
		$("#popupArea_emdong").css("display", "block");
	}
	
	//화면 띄움
	$("#common_popup_back").parent().show();
	$("#common_popup_area").show();
	
	//2022-11-01 원복
	sidoCdSelect(p_sido_cd);

	if(p_sgg_cd != undefined && p_sgg_cd != null){
		sggCdSelect(p_sido_cd, p_sgg_cd);	
	}
	if(p_emdong_cd != undefined && p_emdong_cd != null){
		emdongCdSelect(p_sido_cd, p_sgg_cd, p_emdong_cd);		
	}
	
	//이전 이벤트 제거
	$("#common_popup_back").unbind();
	$("#common_popup_area_ok").unbind();
	$("#common_popup_area_close").unbind();
	
	
	//새로운 이벤트 맵핑
	$("#common_popup_back").click(function() {
		//팝업 숨김
		$("#common_popup_back").parent().hide();
		$("#common_popup_area").hide();
	
	});
	
	$("#common_popup_area_ok").click(function() {
		//팝업 숨김
		$("#common_popup_back").parent().hide();
		$("#common_popup_area").hide();
		if(typeof p_callback === "function") {
			
			//2022-11-01 원복
			var sido_cd = $("#popupArea_sido option:selected").val();
			var sido_nm = $("#popupArea_sido option:selected").text();
			var sgg_cd = $("#popupArea_sgg option:selected").val();
			var sgg_nm = "";
			var emdong_cd = $("#popupArea_emdong option:selected").val();
			var emdong_nm = "";
			
			if(emdong_cd != "00"){
				//2022-11-01 원복
				sgg_nm = $("#popupArea_sgg option:selected").text();
				emdong_nm = $("#popupArea_emdong option:selected").text();
				var x_coor = $("#popupArea_emdong option:selected").data("x");
				var y_coor = $("#popupArea_emdong option:selected").data("y");
				$(this).removeClass("on"); // 2022-09-21 송은미 검색 이동 초기화 추가
			} else if(sgg_cd != "999"){
				$(this).removeClass("on");
				sgg_nm = $("#popupArea_sgg option:selected").text();
				var x_coor = $("#popupArea_sgg option:selected").data("x");
				var y_coor = $("#popupArea_sgg option:selected").data("y");
			} else {
				$(this).removeClass("on");
				var x_coor = $("#popupArea_sido option:selected").data("x");
				var y_coor = $("#popupArea_sido option:selected").data("y");
			}
			p_callback(x_coor, y_coor, sido_cd, sido_nm, sgg_cd, sgg_nm, emdong_cd, emdong_nm);
			srvLogWrite('O0', '51', '03', '00', sido_nm +" "+ sgg_nm +" "+emdong_nm, '');
		}
	});
	$("#common_popup_area_close").click(function() {
		//팝업 숨김
		$("#common_popup_back").parent().hide();
		$("#common_popup_area").hide();
		if(typeof p_callback2 === "function") {
			p_callback2();
		}
	});
	
	$("#popupArea_sido").change(function(){
		/** 2020.09.02[한광희] 시군구&읍면동 초기화 후 조회하도록 수정 START */
		$("#popupArea_sgg option").remove();
		$("#popupArea_sgg").html("<option value=\"999\" data-x=\"990480.875\" data-y=\"1815839.375\">전체</option>");
		sggCdSelect($("#popupArea_sido").val());
		if($("#popupArea_sgg option:selected").val() == "999"){
			$("#popupArea_emdong option").remove();
			$("#popupArea_emdong").html("<option value='00' data-x='990480.875' data-y='1815839.375'>전체</option>");
			$("#popupArea_emdong").val("00");		
		}
		/** 2020.09.02[한광희] 시군구&읍면동 초기화 후 조회하도록 수정 END */
	});
	
	$("#popupArea_sgg").change(function(){
		/** 2020.09.02[한광희] 읍면동 초기화 후 조회하도록 수정 START */
		$("#popupArea_emdong option").remove();
		$("#popupArea_emdong").html("<option value='00' data-x='990480.875' data-y='1815839.375'>전체</option>");
		/** 2020.09.02[한광희] 읍면동 초기화 후 조회하도록 수정 END */
		emdongCdSelect($("#popupArea_sido").val(), $("#popupArea_sgg").val());
	});
}

/**
 * @name : sidoCdSelect
 * @description : 시도코드 조회
 * @date : 2020.07.09
 * @author : 한광희
 * @history :
 * @param
 * 	p_sido_cd : 시도코드
 */
function sidoCdSelect(p_sido_cd){
	// 기본값(전체)
	$("#popupArea_sido").html("<option value=\"00\" data-x=\"990480.875\" data-y=\"1815839.375\">전국</option>");
	// ajax 시작
	$.ajax({
	    url: openApiPath + "/OpenAPI3/addr/stageWR.json",
	    type: 'get', //api는 get으로 받아야함
	    dataType : 'json',
	    async: false,
	    data: {
	    	accessToken:accessToken,
	    	pg_yn: "0",
	    	bnd_year: bndYear
	    }
	}).done(function (res) { // 완료
		if(res.errCd == "0") {
			var lvResultList = res.result;
			for(var i = 0; i < lvResultList.length; i++) {
				//2022-11-01 원복
				if(lvResultList[i].cd == p_sido_cd) {
					$("#popupArea_sido").append("<option value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].addr_name+"</option>");
				}
				else {
					$("#popupArea_sido").append("<option value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].addr_name+"</option>");
				}
			}
		}else if(res.errCd == "-401") {
			/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 START */
			accessTokenInfo(function(){
				sidoCdSelect(p_sido_cd);
			});
			/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 END */
			//common_alert(res.errMsg);
		}else{
			//common_alert(res.errMsg);
		}
	}).fail(function (res) { // 실패
		/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 START */
		accessTokenInfo(function(){
			sidoCdSelect(p_sido_cd);
		});
		/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 END */
		//common_alert(errorMessage);
	}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
		//common_loading(false);
	});
	// ajax 끝
}

/**
 * @name : sggCdSelect
 * @description : 시도코드 조회
 * @date : 2020.07.09
 * @author : 한광희
 * @history :
 * @param
 * 	p_sido_cd : 시도코드
 * 	p_sgg_cd : 시군구코드	
 */
function sggCdSelect(p_sido_cd, p_sgg_cd){
	// 기본값(전체)
	$("#popupArea_sgg").html("<option value=\"999\" data-x=\"990480.875\" data-y=\"1815839.375\">전체</option>");
	// ajax 시작
	$.ajax({
	    url: openApiPath + "/OpenAPI3/addr/stageWR.json",
	    type: 'get', //api는 get으로 받아야함
	    dataType : 'json',
	    async: false,
	    data: {
	    	accessToken: accessToken,
	    	pg_yn: "0",
	    	cd: p_sido_cd,
	    	bnd_year: bndYear
	    }
	}).done(function (res) { // 완료
		if(res.errCd == "0") {
			var lvResultList = res.result;
			for(var i = 0; i < lvResultList.length; i++) {
				//2022-11-01 원복
				if(lvResultList[i].cd.slice(-3) == p_sgg_cd) {
					$("#popupArea_sgg").append("<option value=\""+ lvResultList[i].cd.slice(-3)+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].addr_name+"</option>");
				}
				else {
					$("#popupArea_sgg").append("<option value=\""+ lvResultList[i].cd.slice(-3)+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].addr_name+"</option>");
				}
			}
		}else if(res.errCd == "-401") {
			/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 START */
			accessTokenInfo(function(){
				sggCdSelect(p_sido_cd, p_sgg_cd);
			});
			/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 END */
			//common_alert(res.errMsg);
		}else{
			//common_alert(res.errMsg);
		}
	}).fail(function (res) { // 실패
		/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 START */
		accessTokenInfo(function(){
			sggCdSelect(p_sido_cd, p_sgg_cd);
		});
		/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 END */
		//common_alert(errorMessage);
	}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
		//common_loading(false);
	});
	// ajax 끝
}

/**
 * @name : emdongCdSelect
 * @description : 읍면동코드 조회
 * @date : 2020.07.10
 * @author : 한광희
 * @history :
 * @param
 * 	p_sido_cd : 시도코드
 *  p_sgg_cd : 시군구코드
 *  p_emdong_cd : 읍면동코드
 */
function emdongCdSelect(p_sido_cd, p_sgg_cd, p_emdong_cd){
	// 기본값(전체)
	$("#popupArea_emdong").html("<option value='00' data-x='990480.875' data-y='1815839.375'>전체</option>");
	// ajax 시작
	$.ajax({
	    url: openApiPath + "/OpenAPI3/addr/stageWR.json",
	    type: 'get', //api는 get으로 받아야함
	    dataType : 'json',
	    async: false,
	    data: {
	    	accessToken:accessToken,
	    	pg_yn: "0",
	    	cd: p_sido_cd + p_sgg_cd,
	    	//cd: p_sgg_cd,
	    	bnd_year: bndYear
	    }
	}).done(function (res) { // 완료
		console.log(res.result);
		if(res.errCd == "0") {
			var lvResultList = res.result;
			for(var i = 0; i < lvResultList.length; i++) {
				//2022-11-01 원복, 2022-12-06 읍면동 코드 개편으로 인해 -2 를 -3으로 수정 
				/*if(lvResultList[i].cd.slice(-2) == p_emdong_cd) {
					$("#popupArea_emdong").append("<option value=\""+lvResultList[i].cd.slice(-2)+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].addr_name+"</option>");
				}
				else {
					$("#popupArea_emdong").append("<option value=\""+lvResultList[i].cd.slice(-2)+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].addr_name+"</option>");
				}*/
				if(lvResultList[i].cd.slice(-3) == p_emdong_cd) {
					$("#popupArea_emdong").append("<option value=\""+lvResultList[i].cd.slice(-3)+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].addr_name+"</option>");
				}
				else {
					$("#popupArea_emdong").append("<option value=\""+lvResultList[i].cd.slice(-3)+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].addr_name+"</option>");
				}
			}
		}else if(res.errCd == "-401") {
			/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 START */
			accessTokenInfo(function(){
				emdongCdSelect(p_sido_cd, p_sgg_cd, p_emdong_cd);
			});
			/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 END */
			//common_alert(res.errMsg);
		}else{
			//common_alert(res.errMsg);
		}
	}).fail(function (res) { // 실패
		/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 START */
		accessTokenInfo(function(){
			emdongCdSelect(p_sido_cd, p_sgg_cd, p_emdong_cd);
		});
		/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 END */
		//common_alert(errorMessage);
	}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
		//common_loading(false);
	});
	// ajax 끝
}

/**
 * @name : common_popup_area_click
 * @description : 지도 선택에 따른 정보 팝업
 * @date : 2020.07.09
 * @author : 한광희
 * @history :
 * @param
 * 		p_title : 지역명
 * 		p_dataTitle : 정보 제목
 * 		p_data : 정보
 * 		p_callback : 확인버튼시 동작할 함수
 */
function common_popup_area_click(p_title, p_dataTitle, p_data, p_callback) {
	//화면 띄움
	$("#common_popup_back").parent().show();
	$("#common_popup_area_click").show();
	$("#areaTitle").html(p_title);
	$("#areaDataTitle").html(p_dataTitle);
	$("#areaData").html(p_data);
	
	// 알림 창 화면 중앙에 위치
	$("#common_popup_area_click").css({"top": (($(window).height()-$("#common_popup_area_click").outerHeight())/2+$(window).scrollTop())+"px"})
	
	//이전 이벤트 제거
	$("#common_popup_back").unbind();
	
	//새로운 이벤트 맵핑
	$("#common_popup_back").click(function() {
		//팝업 숨김
		$("#common_popup_back").parent().hide();
		$("#common_popup_area_click").hide();
	});
}

/**
 * @name : morePaging
 * @description : 통합검색 더보기
 * @date : 2020.06.11
 * @author : 한광희
 * @history :
 * @param
 */
function morePaging(element, totalCount, obj, currentIndexName){
	$(element).empty().hide();
	var totalPage = Math.ceil( totalCount / obj.pageSize);
	if(totalPage>0){
		var morePage = $("<button/>",{
			"class" : "PasingNext "+(obj[currentIndexName]<totalPage?"":"PasingOff"),
			name : "button",
			type : "button",
			text : "더보기"
		}).click(function(){
			if(obj[currentIndexName]<totalPage){
				obj[currentIndexName] = obj[currentIndexName]+1;
				obj.makeLists();
			}
			return false;
		});
		$(element).show().append(morePage);
	}else{
		$(element).hide();
	}
}

/**
 * @name : todayStatusPopupToggle
 * @description : 오늘의 전체 일자리현황 팝업 토글
 * @date : 2020.06.25
 * @author : 한광희
 * @history :
 * @param
 * 	p_flag : true/false => 표시/감춤
 */
function todayStatusPopupToggle(p_flag) {
	//표시
	if(p_flag == true) {
		//화면 띄움
		$("#common_popup_back").parent().show();
		$("#todayStatusPopup").appendTo($("body"));
		$("#todayStatusPopup").show();
		
		//이전 이벤트 제거
		$("#common_popup_back").unbind();
		
		//새로운 이벤트 맵핑
		$("#common_popup_back").click(function() {
			$("#todayStatusPopup_close").click();
		});
	}
	//감춤
	else {
		//화면 띄움
		$("#common_popup_back").parent().hide();
		$("#todayStatusPopup").hide();
	}
}

/**
 * @name : todayStatusPopupSelect
 * @description : 오늘의 전체 일자리현황 팝업 조회
 * @date : 2020.06.25
 * @author : 한광희
 * @history :
 * @param
 * 	p_sido_cd : 시도코드
 * 	p_sido_nm : 시도명
 * 	p_sgg_cd : 시군구코드
 * 	p_sgg_nm : 시군구명
 */
function todayStatusPopupSelect(p_sido_cd, p_sido_nm, p_sgg_cd, p_sgg_nm){
	common_loading(true); // 로딩바 표시
	// ajax 시작
	$.ajax({
	    url: contextPath + "/m2019/workroad/todayAllJobStatusPopupSelect.json",
	    type: 'post',
	    dataType: 'json',
	    data: {
	    	data: "data",
	    	sido_cd : p_sido_cd,
	    	sido_nm : p_sido_nm,
	    	sgg_cd : p_sgg_cd,
	    	sgg_nm : p_sgg_nm
	    }
	}).done(function (res) { // 완료
		if(res.errCd == "0") {
			var lvParams = res.result.params;
			var lvResultList = res.result.resultList;
			if(lvResultList != null && lvResultList.length > 0) {
				//조회결과
				var lv_reg_dt = lvResultList[0].reg_dt;
				var lv_all_corp_cnt = lvResultList[0].all_corp_cnt;
				var lv_all_rcrit_psn_cnt = lvResultList[0].all_rcrit_psn_cnt;
				var lv_new_corp_cnt = lvResultList[0].new_corp_cnt;
				var lv_new_rcrit_psn_cnt = lvResultList[0].new_rcrit_psn_cnt;
				var lv_clos_corp_cnt = lvResultList[0].clos_corp_cnt;
				var lv_clos_rcrit_psn_cnt = lvResultList[0].clos_rcrit_psn_cnt;
				var lv_all_corp_cnt_c = lvResultList[0].all_corp_cnt_c;
				var lv_all_rcrit_psn_cnt_c = lvResultList[0].all_rcrit_psn_cnt_c;
				var lv_new_corp_cnt_c = lvResultList[0].new_corp_cnt_c;
				var lv_new_rcrit_psn_cnt_c = lvResultList[0].new_rcrit_psn_cnt_c;
				var lv_clos_corp_cnt_c = lvResultList[0].clos_corp_cnt_c;
				var lv_clos_rcrit_psn_cnt_c = lvResultList[0].clos_rcrit_psn_cnt_c;
				
				//지역명
				if(lvParams.sido_nm != null && lvParams.sido_nm != "" && lvParams.sido_nm != "null") {
					if(lvParams.sgg_nm != null && lvParams.sgg_nm != "" && lvParams.sgg_nm != "null") {
						$("#todayStatusPopup_adm_nm").html(lvParams.sido_nm+" "+lvParams.sgg_nm);
					}
					else {
						$("#todayStatusPopup_adm_nm").html(lvParams.sido_nm);
					}
				}
				else {
					$("#todayStatusPopup_adm_nm").html("전체");
				}
				
				//기준일자
				if(lv_reg_dt != null && lv_reg_dt != "" && lv_reg_dt.length == 8) {
					$("#todayStatusPopup_reg_dt").html("("+lv_reg_dt.substr(4,2)+"월 "+lv_reg_dt.substr(6,2)+"일 기준)");
				}
				
				//구인업체 & 구인자수
				
				//mng_s 20201120 이진호, W3C 웹 표준 체크 중 기존 name 쓰는 걸 id 로 변경 
				//$("#todayStatusPopup [name='all_corp_cnt']").html(appendCommaToNumber(lv_all_corp_cnt));
				//$("#todayStatusPopup [name='new_corp_cnt']").html(appendCommaToNumber(lv_new_corp_cnt));
				//$("#todayStatusPopup [name='clos_corp_cnt']").html(appendCommaToNumber(lv_clos_corp_cnt));
				//$("#todayStatusPopup [name='all_rcrit_psn_cnt']").html(appendCommaToNumber(lv_all_rcrit_psn_cnt));
				//$("#todayStatusPopup [name='new_rcrit_psn_cnt']").html(appendCommaToNumber(lv_new_rcrit_psn_cnt));
				//$("#todayStatusPopup [name='clos_rcrit_psn_cnt']").html(appendCommaToNumber(lv_clos_rcrit_psn_cnt));
				$("#todayStatusPopup #all_corp_cnt").html(appendCommaToNumber(lv_all_corp_cnt));
				$("#todayStatusPopup #all_rcrit_psn_cnt").html(appendCommaToNumber(lv_all_rcrit_psn_cnt));
				$("#todayStatusPopup #new_corp_cnt").html(appendCommaToNumber(lv_new_corp_cnt));
				$("#todayStatusPopup #new_rcrit_psn_cnt").html(appendCommaToNumber(lv_new_rcrit_psn_cnt));
				$("#todayStatusPopup #clos_corp_cnt").html(appendCommaToNumber(lv_clos_corp_cnt));
				$("#todayStatusPopup #clos_rcrit_psn_cnt").html(appendCommaToNumber(lv_clos_rcrit_psn_cnt));
				//mng_e 20201120 이진호
				
				
				//전일대비 (구인업체)
				//mng_s 20201120 이진호, W3C 웹 표준 수정/기존 name을 id로 변경
				if (lv_all_corp_cnt_c > 0) {
					if(Number(lv_all_corp_cnt - lv_all_corp_cnt_c) != 0){
						//$("#todayStatusPopup [name='all_corp_cnt_c_rate']").html("▲ "+(Number((100 * lv_all_corp_cnt_c / (lv_all_corp_cnt - lv_all_corp_cnt_c)).toFixed(2)))+"%");						
						$("#todayStatusPopup #all_corp_cnt_c_rate").html("▲ "+(Number((100 * lv_all_corp_cnt_c / (lv_all_corp_cnt - lv_all_corp_cnt_c)).toFixed(2)))+"%");						
					} else {
						//$("#todayStatusPopup [name='all_corp_cnt_c_rate']").html("▲ 100%");
						$("#todayStatusPopup #all_corp_cnt_c_rate").html("▲ 100%");
					}
					//$("#todayStatusPopup [name='all_corp_cnt_c_rate']").addClass("td_up");
					$("#todayStatusPopup #all_corp_cnt_c_rate").addClass("td_up");
				} else if (lv_all_corp_cnt_c < 0) {
					//$("#todayStatusPopup [name='all_corp_cnt_c_rate']").html("▼ "+(Number(((-100 * lv_all_corp_cnt_c) / (lv_all_corp_cnt + lv_all_corp_cnt_c)).toFixed(2)))+"%");
					$("#todayStatusPopup #all_corp_cnt_c_rate").html("▼ "+(Number(((-100 * lv_all_corp_cnt_c) / (lv_all_corp_cnt + lv_all_corp_cnt_c)).toFixed(2)))+"%");
					//$("#todayStatusPopup [name='all_corp_cnt_c_rate']").addClass("td_down");
					$("#todayStatusPopup #all_corp_cnt_c_rate").addClass("td_down");
				}
				//mng_e 20201120 이진호
				
				//전일대비 (구인자수)
				//mng_s 20201120 이진호, W3C 웹 표준 수정/기존 name을 id로 변경
				if (lv_all_rcrit_psn_cnt_c > 0) {
					if(Number(lv_all_rcrit_psn_cnt - lv_all_rcrit_psn_cnt_c) != 0){
						//$("#todayStatusPopup [name='all_rcrit_psn_cnt_c_rate']").html("▲ "+(Number((100 * lv_all_rcrit_psn_cnt_c / (lv_all_rcrit_psn_cnt - lv_all_rcrit_psn_cnt_c)).toFixed(2)))+"%");
						$("#todayStatusPopup #all_rcrit_psn_cnt_c_rate").html("▲ "+(Number((100 * lv_all_rcrit_psn_cnt_c / (lv_all_rcrit_psn_cnt - lv_all_rcrit_psn_cnt_c)).toFixed(2)))+"%");
					} else{
						//$("#todayStatusPopup [name='all_rcrit_psn_cnt_c_rate']").html("▲ 100%");
						$("#todayStatusPopup #all_rcrit_psn_cnt_c_rate").html("▲ 100%");
					}
					//$("#todayStatusPopup [name='all_rcrit_psn_cnt_c_rate']").addClass("td_up");
					$("#todayStatusPopup #all_rcrit_psn_cnt_c_rate").addClass("td_up");
				} else if (lv_all_rcrit_psn_cnt_c < 0) {
					//$("#todayStatusPopup [name='all_rcrit_psn_cnt_c_rate']").html("▼ "+(Number(((-100 * lv_all_rcrit_psn_cnt_c) / (lv_all_rcrit_psn_cnt + lv_all_rcrit_psn_cnt_c)).toFixed(2)))+"%");
					$("#todayStatusPopup #all_rcrit_psn_cnt_c_rate").html("▼ "+(Number(((-100 * lv_all_rcrit_psn_cnt_c) / (lv_all_rcrit_psn_cnt + lv_all_rcrit_psn_cnt_c)).toFixed(2)))+"%");
					//$("#todayStatusPopup [name='all_rcrit_psn_cnt_c_rate']").addClass("td_down");
					$("#todayStatusPopup #all_rcrit_psn_cnt_c_rate").addClass("td_down");
				}
				//mng_e 20201120 이진호
				
				//팝업 호출
				todayStatusPopupToggle(true);
			}
		}else if(res.errCd == "-401") {
			//common_alert(res.errMsg);
		}else{
			//common_alert(res.errMsg);
		}
	}).fail(function (res) { // 실패
		//common_alert(errorMessage);
	}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
		common_loading(false); // 로딩바 감춤
	});
	// ajax 끝
}

/**
 * @name : lifeEnvironmentToggle
 * @description : 생활환경 정보 토글
 * @date : 2020.06.23
 * @author : 한광희
 * @history :
 * @param
 * 	p_flag : true/false => 표시/감춤 
 * 	p_sido_cd : 시도코드
 * 	p_sgg_cd : 시군구코드
 * 	p_emdong_cd : 읍면동코드
 */
function lifeEnvironmentToggle(p_flag, p_sido_cd, p_sgg_cd, p_emdong_cd){
	// 표시
	if(p_flag == true){
		/** 2020.09.21[한광희] 생활환경종합 로딩바 추가 및 팝업 호출순위 수정 START */
		common_loading(true); // 로딩바
		setTimeout(function() {
			lifeEnvironmentSelect(p_sido_cd, p_sgg_cd, p_emdong_cd);
		}, 0);
		/** 2020.09.21[한광희] 생활환경종합 로딩바 추가 및 팝업 호출순위 수정 END */
		
		//화면 띄움
		$("#common_popup_back").parent().show();
		$("#lifeEnvironment").appendTo($("body"));
		$("#lifeEnvironment").show();
		//이전 이벤트 제거
		$("#common_popup_back").unbind();
		
		//새로운 이벤트 맵핑
		$("#common_popup_back").click(function() {
			lifeEnvironmentToggle(false);
		});
	}
	// 감춤
	else {
		//화면 띄움
		$("#common_popup_back").parent().hide();
		$("#lifeEnvironment").hide();
	}
}

/**
 * @name : lifeEnvironmentSelect
 * @description : 생활환경 정보 조회
 * @date : 2020.06.23
 * @author : 한광희
 * @history :
 * @param
 * 	p_sido_cd : 시도코드
 * 	p_sgg_cd : 시군구코드
 * 	p_emdong_cd : 읍면동코드
 */
function lifeEnvironmentSelect(p_sido_cd, p_sgg_cd, p_emdong_cd){
	// ajax 시작
	$.ajax({
	    url: contextPath + "/m2019/workroad/livingEnvironmentSelect.json",
	    type: 'post',
	    dataType : 'json',
	    async: false,
	    data: {
	    	sido_cd : p_sido_cd
	    	,sgg_cd : p_sgg_cd
	    	//,emdong_cd : p_emdong_cd
	    }
	}).done(function (res) { // 완료
		if(res.errCd == "0") {
			var lvResultCount2 = res.result.resultCount2;
			var lvResultList2 = res.result.resultList2;
			
			//mng_s 20201120 이진호 / W3C 웹표준 검사 결과 span 태그에 name이 허용되지 않아 id 로 변경
			// 이미지 class 삭제
			$(
				//"#lifeEnvironment span[name='lifeEnvironmentInfo1']"
					//+",#lifeEnvironment span[name='lifeEnvironmentInfo2']"
					//+",#lifeEnvironment span[name='lifeEnvironmentInfo3']"
					//+",#lifeEnvironment span[name='lifeEnvironmentInfo4']"
					//+",#lifeEnvironment span[name='lifeEnvironmentInfo5']"
					//+",#lifeEnvironment span[name='lifeEnvironmentInfo6']"
					//+",#lifeEnvironment span[name='lifeEnvironmentInfo7']"
				"#lifeEnvironment #lifeEnvironmentInfo1"
				+",#lifeEnvironment #lifeEnvironmentInfo2"
				+",#lifeEnvironment #lifeEnvironmentInfo3"
				+",#lifeEnvironment #lifeEnvironmentInfo4"
				+",#lifeEnvironment #lifeEnvironmentInfo5"
				+",#lifeEnvironment #lifeEnvironmentInfo6"
				+",#lifeEnvironment #lifeEnvironmentInfo7"
			).removeClass("good").removeClass("normal").removeClass("bad");
			
			// 텍스트 class 삭제
			$(
				//"#lifeEnvironment p[name='lifeEnvironmentInfo1_text']"
				//+",#lifeEnvironment p[name='lifeEnvironmentInfo2_text']"
					//+",#lifeEnvironment p[name='lifeEnvironmentInfo3_text']"
					//+",#lifeEnvironment p[name='lifeEnvironmentInfo4_text']"
					//+",#lifeEnvironment p[name='lifeEnvironmentInfo5_text']"
					//+",#lifeEnvironment p[name='lifeEnvironmentInfo6_text']"
					//+",#lifeEnvironment p[name='lifeEnvironmentInfo7_text']"
				"#lifeEnvironment #lifeEnvironmentInfo1_text"
				+",#lifeEnvironment #lifeEnvironmentInfo2_text"
				+",#lifeEnvironment #lifeEnvironmentInfo4_text"
				+",#lifeEnvironment #lifeEnvironmentInfo3_text"
				+",#lifeEnvironment #lifeEnvironmentInfo5_text"
				+",#lifeEnvironment #lifeEnvironmentInfo6_text"
				+",#lifeEnvironment #lifeEnvironmentInfo7_text"
			).removeClass("good_txt").removeClass("normal_txt").removeClass("bad_txt");
			//mng_e 20201120 이진호
			
			//입력
			if(lvResultCount2 > 0) {
				for(var i = 0; i < lvResultCount2; i++) {
					//변수
					var lvTempMClassIdxId = lvResultList2[i].m_class_idx_id;
					var lvTempZScore = lvResultList2[i].z_score;
					var lvTempDataYn = lvResultList2[i].data_yn;
					var lvTempClass = "";
					var lvTempTextClass = "";
					var lvTempText = "";
					
					//데이터 없음
					if(lvTempDataYn == "N") {
						lvTempClass = "normal";
						lvTempTextClass = "normal_txt";
						lvTempText = "없음";
					}
					//좋음
					else if(lvTempZScore > 6) {
						lvTempClass = "good";
						lvTempTextClass = "good_txt";
						if(lifeEnvironmentText[lvTempMClassIdxId] != undefined) {
							lvTempText = lifeEnvironmentText[lvTempMClassIdxId].good;
						}
						else {
							lvTempText = "좋음";
						}
					}
					//보통
					else if(lvTempZScore >= 4) {
						lvTempClass = "normal";
						lvTempTextClass = "normal_txt";
						if(lifeEnvironmentText[lvTempMClassIdxId] != undefined) {
							lvTempText = lifeEnvironmentText[lvTempMClassIdxId].normal;
						}
						else {
							lvTempText = "보통";
						}
					}
					//나쁨
					else {
						lvTempClass = "bad";
						lvTempTextClass = "bad_txt";
						if(lifeEnvironmentText[lvTempMClassIdxId] != undefined) {
							lvTempText = lifeEnvironmentText[lvTempMClassIdxId].bad;
						}
						else {
							lvTempText = "나쁨";
						}
					}
					
					//1. 녹지비율/HML0001/HMM0003
					if(lvResultList2[i].b_class_idx_id == "HML0001" && lvResultList2[i].m_class_idx_id == "HMM0003") {
						
						//mng_s 20201120 이진호, W3C 웹 표준 검사 결과 span 태그에 name 허용되지 않아 id로 변경
						//$("#lifeEnvironment span[name='lifeEnvironmentInfo1']").addClass(lvTempClass)
						//$("#lifeEnvironment p[name='lifeEnvironmentInfo1_text']").addClass(lvTempTextClass).text(lvTempText);
						$("#lifeEnvironment #lifeEnvironmentInfo1").addClass(lvTempClass)
						$("#lifeEnvironment #lifeEnvironmentInfo1_text").addClass(lvTempTextClass).text(lvTempText);
						//mng_e 20201120 이진호
						
					}
					//2. 공동주택비율/HML0002/HMM0004	
					else if(lvResultList2[i].b_class_idx_id == "HML0002" && lvResultList2[i].m_class_idx_id == "HMM0004") {
						
						//mng_s 20201120 이진호, W3C 웹 표준 검사 결과 span 태그에 name 허용되지 않아 id로 변경
						//$("#lifeEnvironment span[name='lifeEnvironmentInfo2']").addClass(lvTempClass)
						//$("#lifeEnvironment p[name='lifeEnvironmentInfo2_text']").addClass(lvTempTextClass).text(lvTempText);
						$("#lifeEnvironment #lifeEnvironmentInfo2").addClass(lvTempClass)
						$("#lifeEnvironment #lifeEnvironmentInfo2_text").addClass(lvTempTextClass).text(lvTempText);
						//mng_e 20201120 이진호
						
					}
					//3. 청장년인구비율/HML0003/HMM0009	
					else if(lvResultList2[i].b_class_idx_id == "HML0003" && lvResultList2[i].m_class_idx_id == "HMM0009") {
						
						//mng_s 20201120 이진호, W3C 웹 표준 검사 결과 span 태그에 name 허용되지 않아 id로 변경
						//$("#lifeEnvironment span[name='lifeEnvironmentInfo3']").addClass(lvTempClass)
						//$("#lifeEnvironment p[name='lifeEnvironmentInfo3_text']").addClass(lvTempTextClass).text(lvTempText);
						$("#lifeEnvironment #lifeEnvironmentInfo3").addClass(lvTempClass)
						$("#lifeEnvironment #lifeEnvironmentInfo3_text").addClass(lvTempTextClass).text(lvTempText);
						//mng_e 20201120 이진호
						
					}
					//4. 교통사고 안전/HML0004/HMM0014
					else if(lvResultList2[i].b_class_idx_id == "HML0004" && lvResultList2[i].m_class_idx_id == "HMM0014") {
						
						//mng_s 20201120 이진호, W3C 웹 표준 검사 결과 span 태그에 name 허용되지 않아 id로 변경
						//$("#lifeEnvironment span[name='lifeEnvironmentInfo4']").addClass(lvTempClass)
						//$("#lifeEnvironment p[name='lifeEnvironmentInfo4_text']").addClass(lvTempTextClass).text(lvTempText);
						$("#lifeEnvironment #lifeEnvironmentInfo4").addClass(lvTempClass)
						$("#lifeEnvironment #lifeEnvironmentInfo4_text").addClass(lvTempTextClass).text(lvTempText);
						//mng_e 20201120 이진호
						
					}
					//5. 대중교통 이용률/HML0005/HMM0018	
					else if(lvResultList2[i].b_class_idx_id == "HML0005" && lvResultList2[i].m_class_idx_id == "HMM0018") {
						
						//mng_s 20201120 이진호, W3C 웹 표준 검사 결과 span 태그에 name 허용되지 않아 id로 변경
						//$("#lifeEnvironment span[name='lifeEnvironmentInfo5']").addClass(lvTempClass)
						//$("#lifeEnvironment p[name='lifeEnvironmentInfo5_text']").addClass(lvTempTextClass).text(lvTempText);
						$("#lifeEnvironment #lifeEnvironmentInfo5").addClass(lvTempClass)
						$("#lifeEnvironment #lifeEnvironmentInfo5_text").addClass(lvTempTextClass).text(lvTempText);
						//mng_e 20201120 이진호
						
					}
					//6. 고등교육기관 수/HML0006/HMM0021	
					else if(lvResultList2[i].b_class_idx_id == "HML0006" && lvResultList2[i].m_class_idx_id == "HMM0021") {
						
						//mng_s 20201120 이진호, W3C 웹 표준 검사 결과 span 태그에 name 허용되지 않아 id로 변경
						//$("#lifeEnvironment span[name='lifeEnvironmentInfo6']").addClass(lvTempClass)
						//$("#lifeEnvironment p[name='lifeEnvironmentInfo6_text']").addClass(lvTempTextClass).text(lvTempText);
						$("#lifeEnvironment #lifeEnvironmentInfo6").addClass(lvTempClass)
						$("#lifeEnvironment #lifeEnvironmentInfo6_text").addClass(lvTempTextClass).text(lvTempText);
						//mng_e 20201120 이진호
						
					}
					//7. 문화시설 수/HML0007/HMM0027	
					else if(lvResultList2[i].b_class_idx_id == "HML0007" && lvResultList2[i].m_class_idx_id == "HMM0027") {
						
						//mng_s 20201120 이진호, W3C 웹 표준 검사 결과 span 태그에 name 허용되지 않아 id로 변경
						//$("#lifeEnvironment span[name='lifeEnvironmentInfo7']").addClass(lvTempClass)
						//$("#lifeEnvironment p[name='lifeEnvironmentInfo7_text']").addClass(lvTempTextClass).text(lvTempText);
						$("#lifeEnvironment #lifeEnvironmentInfo7").addClass(lvTempClass)
						$("#lifeEnvironment #lifeEnvironmentInfo7_text").addClass(lvTempTextClass).text(lvTempText);
						//mng_e 20201120 이진호
						
					}
				}
			}
			// 팝업 시도코드 및 시군구코드 세팅
			$("#lifeEnvironmentPopup_open").attr("sido_cd", p_sido_cd);
			$("#lifeEnvironmentPopup_open").attr("sgg_cd", p_sgg_cd);
			//$("#lifeEnvironmentPopup_open").attr("emdong_cd", p_emdong_cd);
			common_loading(false); // 2020.09.21[한광희] 로딩바
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

/**
 * @name : lifeEnvironmentPopupToggle
 * @description : 생활환경 정보 상세보기 팝업 토글
 * @date : 2020.06.23
 * @author : 한광희
 * @history :
 * @param
 * 	p_flag : true/false => 표시/감춤
 */
function lifeEnvironmentPopupToggle(p_flag){
	//표시
	if(p_flag == true) {
		$("#lifeEnvironmentPopup").css("top",$(window).outerWidth(true)+"px");	// 2020.09.09[한광희] 애니메이션 변경
		$("#lifeEnvironmentPopup").show().animate({
		//	top : '0'	// 2020.09.09[한광희] 애니메이션 변경
			top : '101px'	// 2020.09.09[한광희] 애니메이션 변경
		},400,function(){
			$("body").children("div.Wrap").children("div.Header").hide(); //.Content 하위 객체는 .Header 위에 표시될 수 없음.
			
			//생활환경 상단 리스트 좌우 스크롤
			$("#lifeEnvironmentPopup_list").touchFlow({
				axis : "x"
			});
			$("#lifeEnvironmentPopup_list").data("touchFlow").go_page(0);
		});
	}
	//감춤
	else {
		$("body").children("div.Wrap").children("div.Header").show(); //.Content 하위 객체는 .Header 위에 표시될 수 없음.
		$("#lifeEnvironmentPopup").animate({
			//	top : $(window).outerWidth(true)	// 2020.09.09[한광희] 애니메이션 변경
			top : '100%'	// 2020.09.09[한광희] 애니메이션 변경
		},400,function(){
			$("#lifeEnvironmentPopup").hide();
		});
	}
}

/**
 * @name : lifeEnvironmentPopupSelect
 * @description : 생활환경 정보 상세보기 조회
 * @date : 2020.06.23
 * @author : 한광희
 * @history :
 * @param
 * 	p_sido_cd : 시도코드
 * 	p_sgg_cd : 시군구코드
 * 	p_emdong_cd : 읍면동코드
 */
function lifeEnvironmentPopupSelect(p_sido_cd, p_sgg_cd, p_emdong_cd){
	common_loading(true);
	/** 2020.09.21[한광희] 생활환경 종합 팝업 호출 순위 변경 START */
	// 생활환경 종합 토글 닫기
	lifeEnvironmentToggle(false);
	/* 팝업 호출 */
	lifeEnvironmentPopupToggle(true);
	/** 2020.09.21[한광희] 생활환경 종합 팝업 호출 순위 변경 END */
	// ajax 시작
	$.ajax({
		/** 2020.09.21[한광희] 생활환경종합 팝업 상세 조회 추가 START */
	    /*url: contextPath + "/m2019/workroad/livingEnvironmentSelect.json",*/
	    url: contextPath + "/m2019/workroad/livingEnvironmentDetailSelect.json",
	    /** 2020.09.21[한광희] 생활환경종합 팝업 상세 조회 추가 END */
	    type: "post",
	    dataType: "json",
	    data: {
	    	sido_cd : p_sido_cd
	    	,sgg_cd : p_sgg_cd
	    	,emdong_cd : p_emdong_cd
	    }
	}).done(function (res) { // 완료
		if(res.errCd == "0") {
			/* 팝업 초기화 */
			$("#lifeEnvironmentPopup_list > ul > li.infoMenu").eq(0).click();
			
			/* 조회결과 */
			//지역정보
			var resultAdmInfo = res.result.resultAdmInfo;
			//종합(전국)
			var lvResultCount0 = res.result.resultCount0;
			var lvResultList0 = res.result.resultList0;
			//종합
			var lvResultCount1 = res.result.resultCount1;
			var lvResultList1 = res.result.resultList1;
			//상세
			var lvResultCount2 = res.result.resultCount2;
			var lvResultList2 = res.result.resultList2;

			/* 타이틀 */
			if(resultAdmInfo != undefined && resultAdmInfo != null) {
				var lvTempSidoNm = "전국";
				var lvTempSggNm = "";
				var lvTempEmdongNm = "";
				if(resultAdmInfo.sido_nm != undefined && resultAdmInfo.sido_nm != null) lvTempSidoNm = resultAdmInfo.sido_nm; 
				if(resultAdmInfo.sgg_nm != undefined && resultAdmInfo.sgg_nm != null) lvTempSggNm = " "+resultAdmInfo.sgg_nm; 
				if(resultAdmInfo.emdong_nm != undefined && resultAdmInfo.emdong_nm != null) lvTempEmdongNm = " "+resultAdmInfo.emdong_nm;
				$("#lifeEnvironmentPopup_title_1").text(lvTempSidoNm+lvTempSggNm+lvTempEmdongNm);
			}
			
			/** 종합 탭 - 하단 지표 셋팅 START */				
			var maxResult = -10;
			var selectwgtval = 0;
			for(var i=0; i<lvResultList0.length; i++){
				var tempResult = parseFloat(lvResultList1[i].z_score);
				if(maxResult <= tempResult){
					maxResult = tempResult;
					selectwgtval = i;
				}
			}
			// 종합 지표 이미지 link
			// 자연
			if(lvResultList1[selectwgtval].b_class_idx_id == "HML0001"){
				$("#lifeEnvironmentPopup_page_0_info_img").attr("src", contextPath+"/resources/m2020/images/common/icon_info_menu1.png");
			}
			// 주택
			else if(lvResultList1[selectwgtval].b_class_idx_id == "HML0002"){
				$("#lifeEnvironmentPopup_page_0_info_img").attr("src", contextPath+"/resources/m2020/images/common/icon_info_menu2.png");
			}
			// 지역인구
			else if(lvResultList1[selectwgtval].b_class_idx_id == "HML0003"){
				$("#lifeEnvironmentPopup_page_0_info_img").attr("src", contextPath+"/resources/m2020/images/common/icon_info_menu3.png");
			} 
			// 안전
			else if(lvResultList1[selectwgtval].b_class_idx_id == "HML0004"){
				$("#lifeEnvironmentPopup_page_0_info_img").attr("src", contextPath+"/resources/m2020/images/common/icon_info_menu4.png");
			} 
			// 생활편의교통
			else if(lvResultList1[selectwgtval].b_class_idx_id == "HML0005"){
				$("#lifeEnvironmentPopup_page_0_info_img").attr("src", contextPath+"/resources/m2020/images/common/icon_info_menu5.png");
			}
			// 교육
			else if(lvResultList1[selectwgtval].b_class_idx_id == "HML0006"){
				$("#lifeEnvironmentPopup_page_0_info_img").attr("src", contextPath+"/resources/m2020/images/common/icon_info_menu6.png");
			}
			// 복지문화
			else if(lvResultList1[selectwgtval].b_class_idx_id == "HML0007"){
				$("#lifeEnvironmentPopup_page_0_info_img").attr("src", contextPath+"/resources/m2020/images/common/icon_info_menu7.png");
			}
			// 종합 지표 타이틀
			$("#lifeEnvironmentPopup_page_0_info_title").text(lvResultList1[selectwgtval].b_class_idx_nm+" 좋음");
			// 지역명
			$("#lifeEnvironmentPopup_page_0_this_admNm").text($("#lifeEnvironmentPopup_title_1").text());	
			// 종합 지표(전국) 값
			$("#lifeEnvironmentPopup_page_0_info_all").text(lvResultList0[selectwgtval].z_score);
			// 종합 지표(지역) 값
			var tempScore = (lvResultList1[selectwgtval].z_score - lvResultList0[selectwgtval].z_score).toFixed(2);
			var infoThisHtml = "";
			if(tempScore > 0){
				$("#lifeEnvironmentPopup_page_0_info_this").text(lvResultList1[selectwgtval].z_score+ " (▲ " + tempScore + ")");
				$("#lifeEnvironmentPopup_page_0_info_this").addClass("i_red");
				$("#lifeEnvironmentPopup_page_0_info_this").removeClass("i_blue");
			} else if(tempScore < 0){
				$("#lifeEnvironmentPopup_page_0_info_this").text(lvResultList1[selectwgtval].z_score+ " (▼ " + tempScore + ")");
				$("#lifeEnvironmentPopup_page_0_info_this").removeClass("i_red");
				$("#lifeEnvironmentPopup_page_0_info_this").addClass("i_blue");
			}
			/** 종합 탭 - 하단 지표 셋팅 END */
			
			/* 종합 */
			//차트데이터
			var lvTempCategories = [];
			var lvTempSeries1Name = "전국";
			var lvTempSeries1Data = [];
			var lvTempSeries2Name = $("#lifeEnvironmentPopup_title_1").text();
			var lvTempSeries2Data = [];
			//전국평균
			var lvTempAllZScore = 0;
			var lvTempAllZScoreCnt = 0;
			if(lvResultCount0 > 0) {
				for(var i = 0; i < lvResultCount0; i++) {
					lvTempAllZScore += lvResultList0[i].z_score * lvResultList0[i].z_score_cnt;
					lvTempAllZScoreCnt += lvResultList0[i].z_score_cnt;
					lvTempCategories.push(lvResultList0[i].b_class_idx_nm);
					lvTempSeries1Data.push(lvResultList0[i].z_score);
				}
			}
			if(lvTempAllZScoreCnt > 0) {
				$("#lifeEnvironmentPopup_page_0_all_avg").html(""+((new Number(lvTempAllZScore / lvTempAllZScoreCnt).toFixed(2) * 100) / 100));
			}
			else {
				$("#lifeEnvironmentPopup_page_0_all_avg").html("0");
			}
			//지역명
			$("#lifeEnvironmentPopup_page_0_this_title").text($("#lifeEnvironmentPopup_title_1").text());
			//지역평균
			var lvTempThisZScore = 0;
			var lvTempThisZScoreCnt = 0;
			if(lvResultCount1 > 0) {
				for(var i = 0; i < lvResultCount1; i++) {
					lvTempThisZScore += lvResultList1[i].z_score * lvResultList1[i].z_score_cnt;
					lvTempThisZScoreCnt += lvResultList1[i].z_score_cnt;
					lvTempSeries2Data.push(lvResultList1[i].z_score);
				}
			}
			if(lvTempThisZScoreCnt > 0) {
				$("#lifeEnvironmentPopup_page_0_this_avg").html(""+((new Number(lvTempThisZScore / lvTempThisZScoreCnt).toFixed(2) * 100) / 100));
			}
			else {
				$("#lifeEnvironmentPopup_page_0_this_avg").html("0");
			}
			//차트 생성
			$("#lifeEnvironmentPopup_page_0_chart").highcharts({
				chart: {
			        polar: true,
			        type: "line",
			        height: $(window).height()-370,	// 2020.09.09[한광희] 이전버튼 추가로 인한 차트 사이즈 수정
			        margin: [0, 50, 0, 50]
			    },
			    colors: ["#a1c1e5", "#f26c5e"],
			    title: {
			        text: ""
			    },
			    xAxis: {
			        categories: lvTempCategories,
			        tickmarkPlacement: "on",
			        lineWidth: 0
			    },
			    yAxis: {
			        gridLineInterpolation: "polygon",
			        lineWidth: 0,
			        min: 0,
			        max: 10,
			        minorTickInterval: 1
			    },
			    tooltip: {
			        shared: true
			    },
			    legend: {
			        enabled: false
			    },
			    series: [{
			        name: lvTempSeries1Name,
			        data: lvTempSeries1Data,
			        pointPlacement: "on",
			        marker: {
			        	symbol: "circle"
			        }
			    }, {
			        name: lvTempSeries2Name,
			        data: lvTempSeries2Data,
			        pointPlacement: "on",
			        marker: {
			        	symbol: "circle"
			        }
			    }]
			});
			
			/* 상세 */
			//초기화
			$("div[id^=lifeEnvironmentPopup_page_]>ul>li").removeClass().hide();
			//데이터
			if(lvResultCount2 > 0) {
				for(var i = 0; i < lvResultCount2; i++) {
					var lvTempBClassIdxId = lvResultList2[i].b_class_idx_id;
					var lvTempMClassIdxId = lvResultList2[i].m_class_idx_id;
					var lvTempMClassIdxNm = lvResultList2[i].m_class_idx_nm;
					var lvTempZScore = lvResultList2[i].z_score;
					var lvTempDataYn = lvResultList2[i].data_yn;
					var lvTempDivId = "lifeEnvironmentPopup_page_1";
					var lvTempClass = "typeNormal";
					var lvTempText = "없음";
					
					//HML0001 자연.
					if(lvTempBClassIdxId == "HML0001") lvTempDivId = "lifeEnvironmentPopup_page_1";
					//HML0002 주택.
					else if(lvTempBClassIdxId == "HML0002") lvTempDivId = "lifeEnvironmentPopup_page_2";
					//HML0003 지역인구.
					else if(lvTempBClassIdxId == "HML0003") lvTempDivId = "lifeEnvironmentPopup_page_3";
					//HML0004 안전.
					else if(lvTempBClassIdxId == "HML0004") lvTempDivId = "lifeEnvironmentPopup_page_4";
					//HML0005 생활편의 교통.
					else if(lvTempBClassIdxId == "HML0005") lvTempDivId = "lifeEnvironmentPopup_page_5";
					//HML0006 교육.
					else if(lvTempBClassIdxId == "HML0006") lvTempDivId = "lifeEnvironmentPopup_page_6";
					//HML0007 복지 문화.
					else if(lvTempBClassIdxId == "HML0007") lvTempDivId = "lifeEnvironmentPopup_page_7";
					
					//데이터 없음
					if(lvTempDataYn == "N") {
						lvTempClass = "typeNormal";
						lvTempText = "없음";
					}
					//좋음
					else if(lvTempZScore > 6) {
						lvTempClass = "typeGood";
						if(lifeEnvironmentText[lvTempMClassIdxId] != undefined) {
							lvTempText = lifeEnvironmentText[lvTempMClassIdxId].good;
						}
						else {
							lvTempText = "좋음";
						}
					}
					//보통
					else if(lvTempZScore >= 4) {
						lvTempClass = "typeNormal";
						if(lifeEnvironmentText[lvTempMClassIdxId] != undefined) {
							lvTempText = lifeEnvironmentText[lvTempMClassIdxId].normal;
						}
						else {
							lvTempText = "보통";
						}
					}
					//나쁨
					else {
						lvTempClass = "typeBad";
						if(lifeEnvironmentText[lvTempMClassIdxId] != undefined) {
							lvTempText = lifeEnvironmentText[lvTempMClassIdxId].bad;
						}
						else {
							lvTempText = "나쁨";
						}
					}
					
					//적용
					
					//mng_s 20201123 이진호
					//W3C 웹표준 오류 수정
					//var lvTempLi = $("#"+lvTempDivId).children("ul").children("li[name='"+lvTempBClassIdxId+"_"+lvTempMClassIdxId+"']");
					var lvTempLi = $("#"+lvTempDivId).children("ul").children("#"+lvTempBClassIdxId+"_"+lvTempMClassIdxId);
					//mng_e 20201123 이진호
					
					lvTempLi.show();
					lvTempLi.addClass(lvTempClass);
					lvTempLi.children("div.itemTitle").html(lvTempMClassIdxNm);
					lvTempLi.children("div.itemStatus").html(lvTempText);
				}
			}
			
			/** 2020.09.21[한광희] 생활환경 종합 팝업 호출 순위 변경으로 인한 주석처리 START */
			// 생활환경 종합 토글 닫기
			/*lifeEnvironmentToggle(false);
			 팝업 호출 
			lifeEnvironmentPopupToggle(true);*/
			/** 2020.09.21[한광희] 생활환경 종합 팝업 호출 순위 변경으로 인한 주석처리 END */
		}else if(res.errCd == "-401") {
			common_alert(res.errMsg);
		}else{
			common_alert(res.errMsg);
		}
	}).fail(function (res) { // 실패
		common_alert(errorMessage);
	}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
		common_loading(false);
	});
	// ajax 끝
}

/**
 * @name : browserFnc
 * @description : 브라우져 함수
 * @date : 2020.06.09
 * @author : 한광희
 * @history :
 * @param :
 */
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

/**
 * @name : makeStamp
 * @description : Timstamp 만드는 함수
 * @date : 2020.06.24
 * @author : 
 * @history :
 * @param :
 */
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

/**
 * @name : deepCopy
 * @description : deepCopy
 * @date : 2020.07.15
 * @author : 주형식
 * @history :
 * @param obj : obj 
 */
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
 * @name : poiPopupCall
 * @description : poi 팝업 호출
 * @date : 2020.07.17
 * @author : 곽제욱
 * @history :
 */
function common_poiPopupCall(){
	$("#poiPageCall").click();
}