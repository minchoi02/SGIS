/**
 * My통계로 팝업
 * 
 * history : 
 * 2019.08.08	김남민	최초작성
 * 
 * 
 * author : 김남민
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$statsMePopup = W.$statsMePopup || {};

	$(document).ready(function() {
		//페이지 이벤트
		$statsMePopup.event.setUIEvent();
		
		//시도 목록 불러오기
		if(gv_bookmark_yn == "N") {
			$statsMePopup.ui.getAreaSido($statsMeMain.ui.my_sido_cd);
			$statsMePopup.ui.getAreaSgg($statsMeMain.ui.my_sido_cd, $statsMeMain.ui.my_sgg_cd);
			$statsMePopup.ui.getAreaEmdong($statsMeMain.ui.my_sido_cd, $statsMeMain.ui.my_sgg_cd, $statsMeMain.ui.my_emdong_cd);
		}
	});

	$statsMePopup.ui = {
		//데이터
		areaSidoData : {}, // 시도 목록 저장
		areaSggData : {}, // 시군구 목록 저장
		areaEmdongData : {}, // 읍면동 목록 저장
			
		/**
		 * @name         : alert 
		 * @description  : 알림 팝업
		 * @date         : 2019.08.08
		 * @author	     : 김남민
		 * @history 	 : 
		 * @param
		 *		p_msg : 메세지
		 *		p_title : 타이틀
		 *		p_callback : 확인버튼시 동작할 함수
		 */
		alert : function(p_msg, p_title, p_callback) {
			//타이틀 기본값
			if(p_title == undefined) p_title = "알림";
			
			//화면 띄움
			$("#statsMePopupAlert").show();
			$("#statsMePopupAlert_message").html(p_msg);
			$("#statsMePopupAlert_title").html(p_title);
			
			//이전 이벤트 제거
			$("#statsMePopupAlert_close").unbind();
			$("#statsMePopupAlert_ok").unbind();
			
			//새로운 이벤트 맵핑
			$("#statsMePopupAlert_close").click(function() {
				$("#statsMePopupAlert").hide();
			});
			$("#statsMePopupAlert_ok").click(function() {
				$("#statsMePopupAlert_close").click();
				if(typeof p_callback === "function") {
					p_callback();
				}
			});
		},
		
		/**
		 * @name         : confirm 
		 * @description  : 확인 팝업
		 * @date         : 2019.08.08
		 * @author	     : 김남민
		 * @history 	 : 
		 * @param
		 *		p_msg : 메세지
		 * 		p_title : 타이틀
		 *		p_callback : 확인버튼시 동작할 함수 
		 *		p_callback : 취소버튼시 동작할 함수 
		 */
		confirm : function(p_msg, p_title, p_callback, p_callback2) {
			//타이틀 기본값
			if(p_title == undefined) p_title = "알림";
			
			//화면 띄움
			$("#statsMePopupConfirm").show();
			$("#statsMePopupConfirm_message").html(p_msg);
			$("#statsMePopupConfirm_title").html(p_title);
			
			//이전 이벤트 제거
			$("#statsMePopupConfirm_close").unbind();
			$("#statsMePopupConfirm_ok").unbind();
			
			//새로운 이벤트 맵핑
			$("#statsMePopupConfirm_close").click(function() {
				$("#statsMePopupConfirm").hide();
			});
			$("#statsMePopupConfirm_ok").click(function() {
				$("#statsMePopupConfirm_close").click();
				if(typeof p_callback === "function") {
					p_callback();
				}
			});
			$("#statsMePopupConfirm_cancel").click(function() {
				$("#statsMePopupConfirm_close").click();
				if(typeof p_callback2 === "function") {
					p_callback2();
				}
			});
		},
		
		/**
		 * @name         : confirm2 (지도,상세보기에서 카탈로그 이전으로 넘어갈경우 보여주는 팝업 전용)
		 * @description  : 확인 팝업
		 * @date         : 2019.08.08
		 * @author	     : 김남민
		 * @history 	 : 
		 * @param
		 *		p_msg : 메세지
		 * 		p_title : 타이틀
		 *		p_callback : 확인버튼시 동작할 함수 
		 *		p_callback : 취소버튼시 동작할 함수 
		 */
		confirm2 : function(p_msg, p_title, p_callback, p_callback2) {
			//체크박스 체크 여부
			var lv_check_flag = $("#statsMePopupConfirm2_check").prop("checked");
			//해당 안내 다시 보지 않음의 경우 바로 확인 버튼 처리
			if(lv_check_flag == true) {
				if(typeof p_callback === "function") {
					p_callback();
				}
				return;
			}
			
			//타이틀 기본값
			if(p_title == undefined) p_title = "알림";
			
			//화면 띄움
			$("#statsMePopupConfirm2").show();
			$("#statsMePopupConfirm2_message").html(p_msg);
			$("#statsMePopupConfirm2_title").html(p_title);
			
			//이전 이벤트 제거
			$("#statsMePopupConfirm2_close").unbind();
			$("#statsMePopupConfirm2_ok").unbind();
			
			//새로운 이벤트 맵핑
			$("#statsMePopupConfirm2_close").click(function() {
				$("#statsMePopupConfirm2").hide();
			});
			$("#statsMePopupConfirm2_ok").click(function() {
				$("#statsMePopupConfirm2_close").click();
				if(typeof p_callback === "function") {
					p_callback();
				}
			});
			$("#statsMePopupConfirm2_cancel").click(function() {
				//취소인경우 해당 안내 다시 보지 않음 체크 해제
				$("#statsMePopupConfirm2_check").prop("checked", false);
				
				$("#statsMePopupConfirm2_close").click();
				if(typeof p_callback2 === "function") {
					p_callback2();
				}
			});
		},
		
		/**
		 * @name         : area 
		 * @description  : 지역선택 팝업
		 * @date         : 2019.08.08
		 * @author	     : 김남민
		 * @history 	 : 
		 * @param
		 */
		area : function() {
			$("#statsMePopupArea").show();
		},
		
		/**
		 * @name         : getAreaSido 
		 * @description  : 지역선택 팝업 시도 불러오기
		 * @date         : 2019.08.08
		 * @author	     : 김남민
		 * @history 	 : 
		 * @param
		 */
		getAreaSido : function(p_sido_cd) {
			// 기본값(전체)
			//$("#statsMePopupArea_sido").html("<option value=\"99\" data-coor-x=\"990480.875\" data-coor-y=\"1815839.375\">전국</option>");
			$("#statsMePopupArea_sido").html("");
			//기존에 저장된 정보 있음
			if($statsMePopup.ui.areaSidoData["00"] != undefined) {
				//시도 목록 추가
				var lvResultList = $statsMePopup.ui.areaSidoData["00"];
				for(var i = 0; i < lvResultList.length; i++) {
					if(lvResultList[i].sido_cd == p_sido_cd) {
						$("#statsMePopupArea_sido").append("<option value=\""+lvResultList[i].sido_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].sido_nm+"</option>");
					}
					else {
						$("#statsMePopupArea_sido").append("<option value=\""+lvResultList[i].sido_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].sido_nm+"</option>");
					}
				}
			}
			//기존에 저장된 정보 없음
			else {
				// ajax 시작
				$.ajax({
					url: contextPath + "/ServiceAPI/map/sidoAddressList.json",
				    type: 'post',
				    dataType : 'json',
				    async: false,
				    data: {
				    	base_year:bndYear
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						//시도 목록 저장
						$statsMePopup.ui.areaSidoData["00"] = res.result.sidoList;
						
						//시도 목록 추가
						var lvResultList = res.result.sidoList;
						for(var i = 0; i < lvResultList.length; i++) {
							if(lvResultList[i].sido_cd == p_sido_cd) {
								$("#statsMePopupArea_sido").append("<option value=\""+lvResultList[i].sido_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].sido_nm+"</option>");
							}
							else {
								$("#statsMePopupArea_sido").append("<option value=\""+lvResultList[i].sido_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].sido_nm+"</option>");
							}
						}
					}else if(res.errCd == "-401") {
						//$statsMeMain.ui.alert(res.errMsg);
					}else{
						//$statsMeMain.ui.alert(res.errMsg);
					}
				}).fail(function (res) { // 실패
					//$statsMeMain.ui.alert(errorMessage);
				}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
					//$statsMeMain.ui.loading(false);
				});
				// ajax 끝
			}
		},
		
		/**
		 * @name         : getAreaSgg
		 * @description  : 지역선택 팝업 시군구 불러오기
		 * @date         : 2019.08.08
		 * @author	     : 김남민
		 * @history 	 : 
		 * @param
		 */
		getAreaSgg : function(p_sido_cd, p_sgg_cd) {
			// 기본값(전체)
			//$("#statsMePopupArea_sgg").html("<option value=\"999\" data-coor-x=\"990480.875\" data-coor-y=\"1815839.375\">전체</option>");
			$("#statsMePopupArea_sgg").html("");
			//기존에 저장된 정보 있음
			if(
				p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != ""
				&& $statsMePopup.ui.areaSggData[p_sido_cd] != undefined
			) {
				//시군구 목록 추가
				var lvResultList = $statsMePopup.ui.areaSggData[p_sido_cd];
				for(var i = 0; i < lvResultList.length; i++) {
					if(lvResultList[i].sgg_cd == p_sgg_cd) {
						$("#statsMePopupArea_sgg").append("<option value=\""+ lvResultList[i].sgg_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].sgg_nm+"</option>");
					}
					else {
						$("#statsMePopupArea_sgg").append("<option value=\""+ lvResultList[i].sgg_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].sgg_nm+"</option>");
					}
				}
			}
			//기존에 저장된 정보 없음
			else {
				// ajax 시작
				$.ajax({
					url: contextPath + "/ServiceAPI/map/sggAddressList.json",
				    type: 'post',
				    dataType : 'json',
				    async: false,
				    data: {
				    	base_year:bndYear,
				    	sido_cd:p_sido_cd
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						//시군구 목록 저장
						if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "") {
							$statsMePopup.ui.areaSggData[p_sido_cd] = res.result.sggList;
						}
						
						//시군구 목록 추가
						var lvResultList = res.result.sggList;
						for(var i = 0; i < lvResultList.length; i++) {
							if(lvResultList[i].sgg_cd == p_sgg_cd) {
								$("#statsMePopupArea_sgg").append("<option value=\""+ lvResultList[i].sgg_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].sgg_nm+"</option>");
							}
							else {
								$("#statsMePopupArea_sgg").append("<option value=\""+ lvResultList[i].sgg_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].sgg_nm+"</option>");
							}
						}
					}else if(res.errCd == "-401") {
						//$statsMeMain.ui.alert(res.errMsg);
					}else{
						//$statsMeMain.ui.alert(res.errMsg);
					}
				}).fail(function (res) { // 실패
					//$statsMeMain.ui.alert(errorMessage);
				}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
					//$statsMeMain.ui.loading(false);
				});
				// ajax 끝
			}
		},
		
		/**
		 * @name         : getAreaEmdong
		 * @description  : 지역선택 팝업 시군구 불러오기
		 * @date         : 2019.08.08
		 * @author	     : 김남민
		 * @history 	 : 
		 * @param
		 */
		getAreaEmdong : function(p_sido_cd, p_sgg_cd, p_emdong_cd) {
			// 기본값(전체)
			//$("#statsMePopupArea_emdong").html("<option value=\"99\" data-coor-x=\"990480.875\" data-coor-y=\"1815839.375\">전체</option>");
			$("#statsMePopupArea_emdong").html("");
			//기존에 저장된 정보 있음
			if(
				p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != ""
				&& p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != ""
				&& $statsMePopup.ui.areaEmdongData[p_sido_cd+p_sgg_cd] != undefined
			) {
				//읍면동 목록 추가
				var lvResultList = $statsMePopup.ui.areaEmdongData[p_sido_cd+p_sgg_cd];
				for(var i = 0; i < lvResultList.length; i++) {
					if(lvResultList[i].emdong_cd == p_emdong_cd) {
						$("#statsMePopupArea_emdong").append("<option value=\""+ lvResultList[i].emdong_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].emdong_nm+"</option>");
					}
					else {
						$("#statsMePopupArea_emdong").append("<option value=\""+ lvResultList[i].emdong_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].emdong_nm+"</option>");
					}
				}
			}
			//기존에 저장된 정보 없음
			else {
				// ajax 시작
				$.ajax({
					url: contextPath + "/ServiceAPI/map/admAddressList.json",
				    type: 'post',
				    dataType : 'json',
				    async: false,
				    data: {
				    	base_year:bndYear,
				    	sido_cd:p_sido_cd,
				    	sgg_cd:p_sgg_cd
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						//읍면동 목록 저장
						if(
							p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != ""
							&& p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != ""
						) {
							$statsMePopup.ui.areaEmdongData[p_sido_cd+p_sgg_cd] = res.result.admList;
						}
						
						//읍면동 목록 추가
						var lvResultList = res.result.admList;
						for(var i = 0; i < lvResultList.length; i++) {
							if(lvResultList[i].emdong_cd == p_emdong_cd) {
								$("#statsMePopupArea_emdong").append("<option value=\""+ lvResultList[i].emdong_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].emdong_nm+"</option>");
							}
							else {
								$("#statsMePopupArea_emdong").append("<option value=\""+ lvResultList[i].emdong_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].emdong_nm+"</option>");
							}
						}
					}else if(res.errCd == "-401") {
						//$statsMeMain.ui.alert(res.errMsg);
					}else{
						//$statsMeMain.ui.alert(res.errMsg);
					}
				}).fail(function (res) { // 실패
					//$statsMeMain.ui.alert(errorMessage);
				}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
					//$statsMeMain.ui.loading(false);
				});
				// ajax 끝
			}
		},
		
		/**
		 * @name         : setArea
		 * @description  : 지역선택 팝업 확인
		 * @date         : 2019.08.08
		 * @author	     : 김남민
		 * @history 	 : 
		 * @param
		 * 		p_gubun : ok / 확인버튼
		 */
		setArea : function(p_gubun) {
			//변수 선언
			var lv_adm_coor_x = 990480.875;
			var lv_adm_coor_y = 1815839.375;
			var lv_sido_cd = $("#statsMePopupArea_sido").val();
			var lv_sido_nm = $("#statsMePopupArea_sido option:selected").text();
			var lv_sido_coor_x = $("#statsMePopupArea_sido option:selected").attr("data-coor-x");
			var lv_sido_coor_y = $("#statsMePopupArea_sido option:selected").attr("data-coor-y");
			var lv_sgg_cd = $("#statsMePopupArea_sgg").val();
			var lv_sgg_nm = $("#statsMePopupArea_sgg option:selected").text();
			var lv_sgg_coor_x = $("#statsMePopupArea_sgg option:selected").attr("data-coor-x");
			var lv_sgg_coor_y = $("#statsMePopupArea_sgg option:selected").attr("data-coor-y");
			var lv_emdong_cd = $("#statsMePopupArea_emdong").val();
			var lv_emdong_nm = $("#statsMePopupArea_emdong option:selected").text();
			var lv_emdong_coor_x = $("#statsMePopupArea_emdong option:selected").attr("data-coor-x");
			var lv_emdong_coor_y = $("#statsMePopupArea_emdong option:selected").attr("data-coor-y");
			if(lv_sido_cd != "99") {
				lv_adm_coor_x = lv_sido_coor_x;
				lv_adm_coor_y = lv_sido_coor_y;
			}
			if(lv_sgg_cd != "999") {
				lv_adm_coor_x = lv_sgg_coor_x;
				lv_adm_coor_y = lv_sgg_coor_y;
			}
			if(lv_emdong_cd != "99") {
				lv_adm_coor_x = lv_emdong_coor_x;
				lv_adm_coor_y = lv_emdong_coor_y;
			}
			
			//위치 저장
			if(p_gubun == "ok") {
				$statsMeMain.ui.default_sido_cd = lv_sido_cd;
				$statsMeMain.ui.default_sido_nm = lv_sido_nm;
				$statsMeMain.ui.default_sido_x = lv_sido_coor_x;
				$statsMeMain.ui.default_sido_y = lv_sido_coor_y;
				$statsMeMain.ui.default_sgg_cd = lv_sgg_cd;
				$statsMeMain.ui.default_sgg_nm = lv_sgg_nm;
				$statsMeMain.ui.default_sgg_x = lv_sgg_coor_x;
				$statsMeMain.ui.default_sgg_y = lv_sgg_coor_y;
				$statsMeMain.ui.default_emdong_cd = lv_emdong_cd;
				$statsMeMain.ui.default_emdong_nm = lv_emdong_nm;
				$statsMeMain.ui.default_emdong_x = lv_emdong_coor_x;
				$statsMeMain.ui.default_emdong_y = lv_emdong_coor_y;
				$statsMeMain.ui.default_x = lv_adm_coor_x;
				$statsMeMain.ui.default_y = lv_adm_coor_y;
			}
			
			//텍스트 변경
			$statsMeMain.ui.setPositionText();
			
			//지도이동 처리
			if(p_gubun == "ok" && $statsMeMain.ui.currentPageName == "statsMeMap") {
				//지도 그리기
				var data = $statsMeMap.ui.mapData.data;
				var lv_map_region = $statsMeMap.ui.mapRegion;
				var lv_map_type = $statsMeMap.ui.mapType;
				/*
				if(data.sido_disp_yn == "Y") lv_map_region = "sido";
				if(data.sgg_disp_yn == "Y") lv_map_region = "sgg";
				if(data.emdong_disp_yn == "Y") lv_map_region = "emdong";
				if(data.tot_reg_disp_yn == "Y") lv_map_region = "totreg";
				//if(lv_emdong_cd == "99" && data.emdong_disp_yn == "Y") lv_map_region = "emdong";
				//if(lv_emdong_cd == "99" && data.tot_reg_disp_yn == "Y") lv_map_region = "totreg";
				//if(lv_sgg_cd == "999" && data.sgg_disp_yn == "Y") lv_map_region = "sgg";
				//if(lv_sido_cd == "99" && data.sido_disp_yn == "Y") lv_map_region = "sido";
				if(data.color_disp_yn == "Y") lv_map_type = "color";
				else if(data.balln_disp_yn == "Y") lv_map_type = "bubble";
				else if(data.tp_disp_yn == "Y") lv_map_type = "heat";
				else if(data.poi_disp_yn == "Y") lv_map_type = "poi";
				//if(data.grid_disp_yn == "Y") lv_map_type = "color";
				*/
				$statsMeMap.ui.mapFirstMoveYn = "Y";
				$statsMeMap.ui.drawMapData(lv_map_region, lv_map_type);
				$statsMeDetailInfo.ui.drawMapData();
			}
		}
	};

	$statsMePopup.event = {
		/**
		 * @name		 : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date		 : 2019.08.08 
		 * @author		 : 김남민
		 * @history 	 :
		 * @param
		 */
		setUIEvent : function() {
			var body = $("body");

			//지역선택 팝업 닫기
			body.on("click", "#statsMePopupArea_close", function() {
				$("#statsMePopupArea").hide();
			});
			
			//지역선택 팝업 확인
			body.on("click", "#statsMePopupArea_ok", function() {
				$("#statsMePopupArea").hide();
				$statsMePopup.ui.setArea("ok");
				
				// 2020.02.19 log 생성
				if ($statsMeMain.ui.currentPageName == "statsMeLifeCycle" || $statsMeMain.ui.currentPageName == "statsMeDetailInfo"){
					srvLogWrite('N0', '03', '00', '00', $("#statsMePopupArea_sido option:checked").text() +" "+ $("#statsMePopupArea_sgg option:checked").text() +" "+ $("#statsMePopupArea_emdong option:checked").text(), '');
			    } else if ($statsMeMain.ui.currentPageName == "statsMeMap"){
			    	srvLogWrite('N0', '09', '03', '00', $("#statsMePopupArea_sido option:checked").text() +" "+ $("#statsMePopupArea_sgg option:checked").text() +" "+ $("#statsMePopupArea_emdong option:checked").text(), '');
			    }
				
			});
			
			//지역선택 팝업 시도 변경
			body.on("change", "#statsMePopupArea_sido", function() {
				var lv_sido_cd = $("#statsMePopupArea_sido").val();
				$statsMePopup.ui.getAreaSgg(lv_sido_cd);
				$statsMePopup.ui.getAreaEmdong(lv_sido_cd, $("#statsMePopupArea_sgg").val());
			});
			
			//지역선택 팝업 시군구 변경
			body.on("change", "#statsMePopupArea_sgg", function() {
				var lv_sido_cd = $("#statsMePopupArea_sido").val();
				var lv_sgg_cd = $("#statsMePopupArea_sgg").val();
				$statsMePopup.ui.getAreaEmdong(lv_sido_cd, lv_sgg_cd);
			});
			
			//지역선택 팝업 읍면동 변경
			body.on("change", "#statsMePopupArea_emdong", function() {
				
			});
		}
	};
}(window, document));