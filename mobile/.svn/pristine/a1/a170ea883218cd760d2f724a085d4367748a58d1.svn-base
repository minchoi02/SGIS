// top
$(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 2000) {
      $('#MOVE_TOP_BTN').fadeIn();
    } else {
      $('#MOVE_TOP_BTN').fadeOut();
    }
  });

  $("#MOVE_TOP_BTN").click(function() {
	srvLogWrite('O0', '02', '11', '01', '', '');
    $('html, body').animate({
      scrollTop: 0
    }, 400);
    return false;
  });
});

// toggle 스위치 - 일자리맵(전국, 현위치)
$(document).on('click', '.toggleBG', function() {
  var toggleBG = $(this);
  var toggleFG = $(this).find('.toggleFG');
  var left = toggleFG.css('left');
  if (left == '40px') {
	srvLogWrite('O0', '02', '06', '04', '전국', '');
    toggleFG.css('color', '#0FA0A5');	// 2020.09.16[한광희] 오늘의구인현황 버튼 css 수정
    toggleActionStart(toggleFG, 'TO_LEFT');
    toggleFG.html("전국");
    // 오늘의 구인현황 조회
    $main.ui.todayStatusSelect("1");
  } else if (left == '0px') {
	  srvLogWrite('O0', '02', '06', '04', '현위치', '');
  	/** 2020.09.15[한광희] 오늘의 구인현황 전국/현위치 버튼 수정 START */
	  common_loading(true); // 로딩바
    /*toggleFG.css('color', '#0FA0A5');
    toggleActionStart(toggleFG, 'TO_RIGHT');
    toggleFG.html("현위치");*/
    /** 2020.09.15[한광희] 오늘의 구인현황 전국/현위치 버튼 수정 END */
	
	/** 2020.09.17[한광희] 현재위치 및 기본위치 설정 수정 START */
	// 위치 동의 팝업
	if(common_get_cookie("lc_info_agree_yn") != "Y"){
		//팝업 표시
		$("#common_popup_back").parent().show();
		$("#common_popup_location").show();		
		//버튼 이벤트 제거
		$("#common_popup_back").unbind();
		$("#common_popup_location_close").unbind();
		$("#common_popup_location_ok").unbind();
		$("#common_popup_location_cancel").unbind();	// 2020.09.02[한광희] 위치동의 허용안함 버튼 추가
		
		//동의버튼(위치동의 처리)
		$("#common_popup_location_ok").click(function() {
			srvLogWrite('O0', '02', '02', '00', '허용', '');
			//위치동의 저장
			common_set_cookie("lc_info_agree_yn", "Y", 365); // 쿠키
			$main.ui.locationArea();	// 현재위치 조회
			
		    common_loading(false); // 로딩바
		    $main.ui.toggle_my_location_yn = "Y";
			//팝업 숨김
			$("#common_popup_back").parent().hide();
			$("#common_popup_location").hide();
		});
		
		//허용 안함 버튼(위치미동의 처리)
		$("#common_popup_location_cancel").click(function() {
			srvLogWrite('O0', '02', '02', '00', '비허용', '');
			//위치미동의 저장
			common_remove_cookie("lc_info_agree_yn"); // 쿠키
			
			//팝업 숨김
			$("#common_popup_back").parent().hide();
			$("#common_popup_location").hide();
			
			toggleFG.css('color', '#0FA0A5');
		    toggleActionStart(toggleFG, 'TO_RIGHT');
		    toggleFG.html("현위치");
		    
		    // 오늘의 구인현황 조회
		    $main.ui.todayStatusSelect("2", $main.ui.my_sido_cd, $main.ui.my_sido_nm, $main.ui.my_sgg_cd, $main.ui.my_sgg_nm);
		    common_loading(false); // 로딩바
		});
		
		//닫기 버튼(위치미동의 처리)
		$("#common_popup_location_close").click(function() {
			srvLogWrite('O0', '02', '02', '00', '비허용', '');
			//위치미동의 저장
			common_remove_cookie("lc_info_agree_yn"); // 쿠키
			
			//팝업 숨김
			$("#common_popup_back").parent().hide();
			$("#common_popup_location").hide();
			
			toggleFG.css('color', '#0FA0A5');
		    toggleActionStart(toggleFG, 'TO_RIGHT');
		    toggleFG.html("현위치");
		    
		    // 오늘의 구인현황 조회
		    $main.ui.todayStatusSelect("2", $main.ui.my_sido_cd, $main.ui.my_sido_nm, $main.ui.my_sgg_cd, $main.ui.my_sgg_nm);
		    common_loading(false); // 로딩바
		});
		
	} else {
		srvLogWrite('O0', '02', '02', '00', '허용', '');
		//팝업 숨김
		$("#common_popup_back").parent().hide();
		$("#common_popup_location").hide();
		
		toggleFG.css('color', '#0FA0A5');
	    toggleActionStart(toggleFG, 'TO_RIGHT');
	    toggleFG.html("현위치");
	    
	    // 오늘의 구인현황 조회
	    $main.ui.todayStatusSelect("2", $main.ui.my_sido_cd, $main.ui.my_sido_nm, $main.ui.my_sgg_cd, $main.ui.my_sgg_nm);
	    common_loading(false); // 로딩바
	}
    
    /** 2020.09.04[한광희] 위치 미동의시 현위치 조회시 위치동의 팝업 재호출 START */
	//위치동의 팝업 호출
	/*common_localtion(
		//지도변수
		$main.ui.map,
		//위치 동의함
		function(my_x, my_y, my_sido_cd, my_sido_nm, my_sgg_cd, my_sgg_nm, my_emdong_cd, my_emdong_nm) {
			//변수 입력
			$main.ui.my_x = my_x;
			$main.ui.my_y = my_y;
			$main.ui.my_sido_cd = my_sido_cd;
			$main.ui.my_sido_nm = my_sido_nm;
			$main.ui.my_sgg_cd = my_sgg_cd;
			$main.ui.my_sgg_nm = my_sgg_nm;
			$main.ui.my_emdong_cd = my_emdong_cd;
			$main.ui.my_emdong_nm = my_emdong_nm;
			
			// 우리동네 생활환경종합 지표 조회
			$main.ui.mainLifeEnvironmentPopupSelect(my_sido_cd, my_sgg_cd, my_emdong_cd);
			// 주요지표 조회
			$main.ui.mainInteractive(my_sido_cd, my_sgg_cd, my_emdong_cd);
			// 오늘의 구인현황 조회
		    $main.ui.todayStatusSelect("2", $main.ui.my_sido_cd, $main.ui.my_sido_nm, $main.ui.my_sgg_cd, $main.ui.my_sgg_nm);
		    
		    *//** 2020.09.15[한광희] 오늘의 구인현황 전국/현위치 버튼 수정 START *//*
		    toggleFG.css('color', '#0FA0A5');
		    toggleActionStart(toggleFG, 'TO_RIGHT');
		    toggleFG.html("현위치");
		    
		    common_loading(false); // 로딩바
		    *//** 2020.09.15[한광희] 오늘의 구인현황 전국/현위치 버튼 수정 END *//*
		},
		//위치 미동의함
		function() {
			// 오늘의 구인현황 조회
		    $main.ui.todayStatusSelect("2", $main.ui.my_sido_cd, $main.ui.my_sido_nm, $main.ui.my_sgg_cd, $main.ui.my_sgg_nm);
		    
		    *//** 2020.09.15[한광희] 오늘의 구인현황 전국/현위치 버튼 수정 START *//*
		    toggleFG.css('color', '#0FA0A5');
		    toggleActionStart(toggleFG, 'TO_RIGHT');
		    toggleFG.html("현위치");
		    
		    common_loading(false); // 로딩바
		    *//** 2020.09.15[한광희] 오늘의 구인현황 전국/현위치 버튼 수정 END *//*
		}
	);*/
	/** 2020.09.04[한광희] 위치 미동의시 현위치 조회시 위치동의 팝업 재호출 END */
	/** 2020.09.17[한광희] 현재위치 및 기본위치 설정 수정 END */
  }
});

// 토글 버튼 이동 모션 함수
function toggleActionStart(toggleBtn, LR) {
  // 0.01초 단위로 실행
  var intervalID = setInterval(
    function() {
      // 버튼 이동
      var left = parseInt(toggleBtn.css('left'));
      left += (LR == 'TO_RIGHT') ? 5 : -5;
      if (left >= 0 && left <= 40) {
        left += 'px';
        toggleBtn.css('left', left);
      }
    }, 10);
  setTimeout(function() {
    clearInterval(intervalID);
  }, 201);
}

//quick 버튼 클릭 페이지 이동

function fnMove(seq){
	/** 2020.09.02[한광희] 메인화면 메뉴 클릭시 해당 위치 이동 오류 수정 START */
	$('html, body').animate({scrollTop: 0}, 0);
    var offset = $("#col" + seq).offset();
    $('html, body').animate({scrollTop : offset.top}, 400);
    /** 2020.09.02[한광희] 메인화면 메뉴 클릭시 해당 위치 이동 오류 수정 END */
}

(function(W, D) {

	W.$main = W.$main || {};

	// 페이지 로드 이벤트
	$(document).ready(function() {
		$main.event.setUIEvent();
		//지도 세팅
		// $main.ui.createMap("map");	// 2020.09.17[한광희] 현재위치 및 기본위치 설정 수정 으로 인한 주석처리
		
		$main.ui.getCurrentLocation();	// 2020.09.16[한광희] 현재위치 조회
		
		/** 2020.09.17[한광희] 조회 순위 변경 START */
		/*//공지사항 조회
		$main.ui.mainBoardList();
		// 메인 생애주기/관심분야 조회
		$main.ui.mainStatsMeList();	// 2020.09.01[한광희] 메인화면 생애주기/관심분야 선택에 따른 서비스 목록 조회 수정
		// 내 주변 통계 Swiper 기능
		$main.ui.interactiveSwiper();
		// 통계주제도 인기 데이터 조회
		$main.ui.mainGetStatsThemeMapList("CTGR_001", "favorite");
		// 통계주제도 인기 데이터 Swiper 기능
		$main.ui.mainGetStatsThemeMapListSwiper();
		// 지역현안 소통지도 조회
		$main.ui.mainCommunityList();*/
		/** 2020.09.17[한광희] 조회 순위 변경 END */
		
		//모바일 lnb
		$('#lnb-open').click(function() {
			srvLogWrite('O0', '01', '01', '01', '', '');
		  $('#lnbWrap').addClass("open");
		});
		
		$('#menu-close-button').click(function() {
			srvLogWrite('O0', '01', '01', '02', '', '');
		  $('#lnbWrap').removeClass("open");
		});
		
		//모바일 rnb - 검색영역
		$('#rnb-open').click(function() {
		  srvLogWrite('O0', '02', '12', '01', '', '');
		  //$('#rnbWrap').addClass("open");
			location.href = contextPath + "/m2020/map/search.sgis";
		});
		
		$('#rnb-close').click(function() {
		  $('#rnbWrap').removeClass("open");
		});
	});
	
	// 윈도우 크기 변경시 윈도우 맞춤.
	$(window).resize(function() {
		setTimeout(function() {
			$main.event.setMapSize();
		}, 100);
	});
	// 가로세로 모드 변경시 윈도우 맞춤.
	$(window).on("orientationchange", function() {
		setTimeout(function() {
			$main.event.setMapSize();
		}, 100);
	});

	// 페이지 UI 변수 및 함수 선언
	$main.ui = {
		map : null,
		
		//내 현재위치
		/** 2020.09.02[한광희] 기본위치 설정 추가 START */
		my_x : 989749.2142006928, // x
		my_y : 1817802.41717, // y
		my_sido_cd : "25", // 시도코드
		my_sido_nm : "대전광역시", // 시도명
		my_sgg_cd : "030", // 시군구코드
		my_sgg_nm : "서구", // 시군구명
		my_emdong_cd : "60", // 읍면동코드
		my_emdong_nm : "둔산2동", // 읍면동명
		/** 2020.09.02[한광희] 기본위치 설정 추가 END */
		
		/** 2020.09.01[한광희] 메인화면 생애주기/관심분야 선택에 따른 서비스 목록 조회 수정 START */
		lfeCycleCnt : 2,	// 생애주기 선택 갯수
		statDistanceCnt : 2,	// 관심분야 선택 갯수
		lfeCycleItemIdList : ['LFECYCLE_INFANT_CHILD', 'LFECYCLE_ADULT'],	// 생애주기 선택항목 id list
		statDistanceItemIdList : ['DSTNC_FD', 'DSTNC_HEALTH'],	// 관심분야 선택항목 id list
		/** 2020.09.01[한광희] 메인화면 생애주기/관심분야 선택에 따른 서비스 목록 조회 수정 END */
		
		toggle_my_location_yn : "",	// 2020.09.17[한광희] 위치 설정 관련 변수 설정
		
		/** 2020.09.21[한광희] 생활환경종합 지표 속도 향상으로 인한 추가 START */
		bClassInfoList : {
			"HML0001": {
				text:"자연"
			},
			"HML0002": {
				text:"주택"
			},
			"HML0003": {
				text:"지역 인구"
			},
			"HML0004": {
				text:"안전"
			},
			"HML0005": {
				text:"생활 편의 교통"
			},
			"HML0006": {
				text:"교육"
			},
			"HML0007": {
				text:"복지 문화"
			}
		},
		/** 2020.09.21[한광희] 생활환경종합 지표 속도 향상으로 인한 추가 END */
		
		/** 2020.09.17[한광희] 현재위치 및 기본위치 설정 수정 START */
		/**
		 * @name : getCurrentLocation
		 * @description : 현재위치 좌표 얻기
		 * @date : 2020.09.16
		 * @author : 한광희
		 * @history :
		 * @param :
		 * 		callback : callback 함수
		 */
		getCurrentLocation : function(){
			// 위치 동의 팝업
			if(common_get_cookie("lc_info_agree_yn") != "Y"){
				//팝업 표시
				$("#common_popup_back").parent().show();
				$("#common_popup_location").show();
				
				//동의버튼(위치동의 처리)
				$("#common_popup_location_ok").click(function() {
					srvLogWrite('O0', '02', '02', '00', '허용', '');
					common_loading(true); // 로딩바	// 2020.09.17[한광희] 팝업 버튼 속도 향상
					//위치동의 저장
					common_set_cookie("lc_info_agree_yn", "Y", 365); // 쿠키
					$main.ui.locationArea();	// 현재위치 조회
				});
				
				//허용 안함 버튼(위치미동의 처리)
				$("#common_popup_location_cancel").click(function() {
					srvLogWrite('O0', '02', '02', '00', '비허용', '');
					// 2020.09.17[한광희] 팝업 버튼 속도 향상 START
					//팝업 숨김
					$("#common_popup_back").parent().hide();
					$("#common_popup_location").hide();
					common_loading(true); // 로딩바
					setTimeout(function() {
						$main.ui.defaultArea();	// 기준위치(대전 서구 둔산2동) 조회
					}, 100);
					// 2020.09.17[한광희] 팝업 버튼 속도 향상 END
				});
				
				//닫기 버튼(위치미동의 처리)
				$("#common_popup_location_close").click(function() {
					srvLogWrite('O0', '02', '02', '00', '비허용', '');
					// 2020.09.17[한광희] 팝업 버튼 속도 향상 START
					//팝업 숨김
					$("#common_popup_back").parent().hide();
					$("#common_popup_location").hide();
					common_loading(true); // 로딩바
					setTimeout(function() {
						$main.ui.defaultArea();	// 기준위치(대전 서구 둔산2동) 조회
					}, 100);
					// 2020.09.17[한광희] 팝업 버튼 속도 향상 END
				});
				
			} else {
				srvLogWrite('O0', '02', '02', '00', '허용', '');
				// 2020.09.17[한광희] 팝업 버튼 속도 향상 START
				//팝업 숨김
				$("#common_popup_back").parent().hide();
				$("#common_popup_location").hide();
				common_loading(true); // 로딩바
				setTimeout(function() {
					$main.ui.setRegionCd();	// 기준위치(대전 서구 둔산2동) 조회
				}, 100);
				// 2020.09.17[한광희] 팝업 버튼 속도 향상 END
			}
		},
		
		// 위치 동의 현재 위치 조회
		locationArea : function(){
			var processed = false;
			//팝업 숨김
			$("#common_popup_back").parent().hide();
			$("#common_popup_location").hide();
			// 2020.09.17[한광희] 팝업 버튼 속도 향상 START
			setTimeout(function() {
				if (navigator.geolocation) {
					try {
						navigator.geolocation.getCurrentPosition(
								function (position) {
									processed = true;
									var utmkXY = new sop.LatLng(position.coords.latitude, position.coords.longitude);
									result = false;
									$main.ui.my_x = utmkXY.x;
									$main.ui.my_y = utmkXY.y;
									
									$main.ui.reqGeocode(utmkXY.x, utmkXY.y);
								}, 
								function (error) {
									//위치미동의 저장
									common_remove_cookie("lc_info_agree_yn"); // 쿠키
									//alert("위치동의  안함");
									processed = true;
									result = false;
									$main.ui.setRegionCd();	// 기준위치(대전 서구 둔산2동) 조회
									console.log("브라우져가 기능을 제공하지 않습니다.");
								}
						);

						if (processed == false) {
							//$totSurvMain.ui.goToMyPositionCallback();
						}
					} catch (e) {// 보안위험이 있는 경우 오류 발생함.
						//$main.ui.goToMyPositionCallback();
					}
				} else {
					result = false;
					$main.ui.setRegionCd();	// 기준위치(대전 서구 둔산2동) 조회
					console.log("브라우져가 기능을 제공하지 않습니다.");
				}
			}, 100);
			// 2020.09.17[한광희] 팝업 버튼 속도 향상 END
		},
		
		// 위치 미동의 기본 위치 조회
		defaultArea : function (){
			// 2020.09.17[한광희] 팝업 버튼 속도 향상 START
			//위치미동의 저장
			common_remove_cookie("lc_info_agree_yn"); // 쿠키
			$main.ui.setRegionCd();	// 기준위치(대전 서구 둔산2동) 조회
			// 2020.09.17[한광희] 팝업 버튼 속도 향상 END
		},
		
		/**
		 * 
		 * @name         : reqGeocode
		 * @description  : 지오코딩을 조회한다.
		 * @date         : 2020.09.16 
		 * @author	     : 한광희
		 * @history 	 :
		 * @param x_coor : x좌표
		 * @param y_coor : y좌표
		 */
		reqGeocode : function(x_coor, y_coor) {
			$.ajax({
	    		url : openApiPath + "/OpenAPI3/addr/rgeocode.json",
	    		data : {
	    			accessToken : accessToken,
	    			addr_type : "20",
	    			x_coor : x_coor,
	    			y_coor : y_coor
	    		},
				type : "GET",
				success : function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result[0];
							if (result != null) {
								$main.ui.setRegionCd(result);
							}
							break;
						case -100:
							break;
						case -401:
							accessTokenInfo(function() {
								$main.ui.reqGeocode(x_coor, y_coor);
							});
							break;
					}
				},
				async : false,
				dataType : "json",
				error: function(x,o,e) {
					$main.ui.setRegionCd();
				}
			});						
		},
		
		// 위치 시도/시군구/읍면동 코드,명 설정 및 데이터 조회
		setRegionCd : function(pInfo) {
			if (pInfo != undefined && pInfo.sido_cd != undefined) {
				$main.ui.my_sido_cd = pInfo.sido_cd;
				$main.ui.my_sido_nm = pInfo.sido_nm;
				
				if (pInfo.sgg_cd != undefined) {
					$main.ui.my_sgg_cd = pInfo.sgg_cd;
					$main.ui.my_sgg_nm = pInfo.sgg_nm;
					
					if (pInfo.emdong_cd != undefined) {
						$main.ui.my_emdong_cd = pInfo.emdong_cd;
						$main.ui.my_emdong_nm = pInfo.emdong_nm;
					}
					
				} else {
					$main.ui.my_sgg_cd = '';
					$main.ui.my_sgg_nm = '';
				}
			} else {
				$main.ui.my_sido_cd = '25';
				$main.ui.my_sgg_cd = '030';
				$main.ui.my_emdong_cd = '60';
				$main.ui.my_sido_nm = '대전광역시';
				$main.ui.my_sgg_nm = '서구';
				$main.ui.my_emdong_nm = '둔산2동';
			}
			
			if($main.ui.toggle_my_location_yn == "Y"){	// 오늘의 구인현황 에서 현위치 클릭후 위치 동의시 조회 
				// 우리동네 생활환경종합 지표 조회
				$main.ui.mainLifeEnvironmentPopupSelect($main.ui.my_sido_cd, $main.ui.my_sgg_cd, $main.ui.my_emdong_cd);
				
				/** 2020.09.24[한광희] 주요지표 조회 accessToken 수정 START */
				if(accessToken == "none" || accessToken == undefined ){
					accessTokenInfo(function(){
						// 주요지표 조회
						$main.ui.mainInteractive($main.ui.my_sido_cd, $main.ui.my_sgg_cd, $main.ui.my_emdong_cd);
					});					
				}else {
					// 주요지표 조회
					$main.ui.mainInteractive($main.ui.my_sido_cd, $main.ui.my_sgg_cd, $main.ui.my_emdong_cd);
				}
				/** 2020.09.24[한광희] 주요지표 조회 accessToken 수정 END */
				
				// 오늘의 구인현황 조회
			    $main.ui.todayStatusSelect("2", $main.ui.my_sido_cd, $main.ui.my_sido_nm, $main.ui.my_sgg_cd, $main.ui.my_sgg_nm);
			    
			    // 오늘의 구인현황 toggle 변경
			    $(".toggleBG").find('.toggleFG').css('color', '#0FA0A5');
			    toggleActionStart( $(".toggleBG").find('.toggleFG'), 'TO_RIGHT');
			    $(".toggleBG").find('.toggleFG').html("현위치");
			} else {
				//공지사항 조회
				$main.ui.mainBoardList();
				// 메인 생애주기/관심분야 조회
				$main.ui.mainStatsMeList();
				// 오늘의 구인현황 조회
				$main.ui.todayStatusSelect("1");
				
				/** 2020.09.24[한광희] 주요지표 조회 accessToken 수정 START */
				if(accessToken == "none" || accessToken == undefined ){
					accessTokenInfo(function(){
						// 주요지표 조회
						$main.ui.mainInteractive($main.ui.my_sido_cd, $main.ui.my_sgg_cd, $main.ui.my_emdong_cd);
					});					
				}else {
					// 주요지표 조회
					$main.ui.mainInteractive($main.ui.my_sido_cd, $main.ui.my_sgg_cd, $main.ui.my_emdong_cd);
				}		
				// 내 주변 통계 Swiper 기능
				$main.ui.interactiveSwiper();
				/** 2020.09.24[한광희] 주요지표 조회 accessToken 수정 END */
				
				// 통계주제도 인기 데이터 조회
				$main.ui.mainGetStatsThemeMapList("CTGR_001", "favorite");
				// 통계주제도 인기 데이터 Swiper 기능
				$main.ui.mainGetStatsThemeMapListSwiper();
				// 우리동네 생활환경종합 지표 조회
				$main.ui.mainLifeEnvironmentPopupSelect($main.ui.my_sido_cd, $main.ui.my_sgg_cd, $main.ui.my_emdong_cd);
				// 지역현안 소통지도 조회
				$main.ui.mainCommunityList();
			}
			common_loading(false); // 로딩바	// 2020.09.17[한광희] 팝업 버튼 속도 향상
		},
		
		/**
		 * @name : createMap
		 * @description : 지도 생성
		 * @date : 2020.06.09
		 * @author : 한광희
		 * @history :
		 * @param
		 * 		id : map으로 쓸 div id
		 */
		/*createMap : function(id) {
			this.map = new sMap.map();
			this.map.isCurrentLocationMarker = true;
			this.map.isAutoRefreshCensusApi = false;
			this.map.isDrawBoundary = false;
			this.map.center = [ 990480.875, 1815839.375 ];
			this.map.zoom = 1;
			this.map.createMap($main, id, {
				isLegendControl:false // 하단 범례 제거
				,isCurrentLocationMarker:false // 지도에 현재위치 표시 안함
			});
			this.map.gMap.whenReady(function() {
				//위치동의 팝업 호출
				common_localtion(
					//지도변수
					$main.ui.map,
					//위치 동의함
					function(my_x, my_y, my_sido_cd, my_sido_nm, my_sgg_cd, my_sgg_nm, my_emdong_cd, my_emdong_nm) {
						//변수 입력
						$main.ui.my_x = my_x;
						$main.ui.my_y = my_y;
						$main.ui.my_sido_cd = my_sido_cd;
						$main.ui.my_sido_nm = my_sido_nm;
						$main.ui.my_sgg_cd = my_sgg_cd;
						$main.ui.my_sgg_nm = my_sgg_nm;
						$main.ui.my_emdong_cd = my_emdong_cd;
						$main.ui.my_emdong_nm = my_emdong_nm;
						
						// 우리동네 생활환경종합 지표 조회
						$main.ui.mainLifeEnvironmentPopupSelect(my_sido_cd, my_sgg_cd, my_emdong_cd);
						// 주요지표 조회
						$main.ui.mainInteractive(my_sido_cd, my_sgg_cd, my_emdong_cd);
						
						*//** 2020.09.17[한광희] 조회 순위 변경 START *//*
						//공지사항 조회
						$main.ui.mainBoardList();
						// 메인 생애주기/관심분야 조회
						$main.ui.mainStatsMeList();	// 2020.09.01[한광희] 메인화면 생애주기/관심분야 선택에 따른 서비스 목록 조회 수정
						// 내 주변 통계 Swiper 기능
						$main.ui.interactiveSwiper();
						// 통계주제도 인기 데이터 조회
						$main.ui.mainGetStatsThemeMapList("CTGR_001", "favorite");
						// 통계주제도 인기 데이터 Swiper 기능
						$main.ui.mainGetStatsThemeMapListSwiper();
						// 지역현안 소통지도 조회
						$main.ui.mainCommunityList();
						*//** 2020.09.17[한광희] 조회 순위 변경 END *//*
					},
					//위치 미동의함
					function() {
						*//** 2020.09.02[한광희] 기본위치 설정 추가 START *//*
						// 우리동네 생활환경종합 지표 조회
						$main.ui.mainLifeEnvironmentPopupSelect($main.ui.my_sido_cd, $main.ui.my_sgg_cd, $main.ui.my_emdong_cd);
						// 주요지표 조회
						$main.ui.mainInteractive($main.ui.my_sido_cd, $main.ui.my_sgg_cd, $main.ui.my_emdong_cd);
						*//** 2020.09.02[한광희] 기본위치 설정 추가 END *//*
						
						*//** 2020.09.17[한광희] 조회 순위 변경 START *//*
						//공지사항 조회
						$main.ui.mainBoardList();
						// 메인 생애주기/관심분야 조회
						$main.ui.mainStatsMeList();	// 2020.09.01[한광희] 메인화면 생애주기/관심분야 선택에 따른 서비스 목록 조회 수정
						// 내 주변 통계 Swiper 기능
						$main.ui.interactiveSwiper();
						// 통계주제도 인기 데이터 조회
						$main.ui.mainGetStatsThemeMapList("CTGR_001", "favorite");
						// 통계주제도 인기 데이터 Swiper 기능
						$main.ui.mainGetStatsThemeMapListSwiper();
						// 지역현안 소통지도 조회
						$main.ui.mainCommunityList();
						*//** 2020.09.17[한광희] 조회 순위 변경 END *//*
					}
				);
				// 오늘의 구인현황 조회
				$main.ui.todayStatusSelect("1");
			});
		},*/
		/** 2020.09.17[한광희] 현재위치 및 기본위치 설정 수정 END */
		
		/**
		 * @name : mainStatsMeList
		 * @description : 메인화면 생애주기/관심분야 조회
		 * @date : 2020.08.03
		 * @author : 한광희
		 * @history :
		 * @param 
		 * 	statsMeType : 생애주기/관심분야 선택에 따른 구분값	// 2020.09.01[한광희] 메인화면 생애주기/관심분야 선택에 따른 서비스 목록 조회 수정
		 */
		mainStatsMeList : function(){	// 2020.09.01[한광희] 메인화면 생애주기/관심분야 선택에 따른 서비스 목록 조회 수정
			//common_loading(true); // 로딩바 표시
			/** 2020.09.01[한광희] 메인화면 생애주기/관심분야 선택에 따른 서비스 목록 조회 수정 START */
			var dataParams = {};
			// 생애주기 param 값 셋팅
			if($main.ui.lfeCycleItemIdList.length > 0){
				if($main.ui.lfeCycleItemIdList[1] != null && $main.ui.lfeCycleItemIdList[1] != ""){
					dataParams.lifeCycleItemId = $main.ui.lfeCycleItemIdList[0] + "," + $main.ui.lfeCycleItemIdList[1];					
				} else {
					dataParams.lifeCycleItemId = $main.ui.lfeCycleItemIdList[0];
				}
				
			} else {
				dataParams.lifeCycleItemId = null;
			}
			// 관심분야 param 값 셋팅
			if($main.ui.statDistanceItemIdList.length > 0){
				if($main.ui.statDistanceItemIdList[1] != null && $main.ui.statDistanceItemIdList[1] != ""){
					dataParams.interestRealmItemId = $main.ui.statDistanceItemIdList[0] + "," + $main.ui.statDistanceItemIdList[1];				
				} else {
					dataParams.interestRealmItemId = $main.ui.statDistanceItemIdList[0];
				}
			} else {
				dataParams.interestRealmItemId = null;
			}
			/** 2020.09.01[한광희] 메인화면 생애주기/관심분야 선택에 따른 서비스 목록 조회 수정 END */
			
			// ajax 시작
			$.ajax({
			    url: contextPath + "/m2020/statsMe/getMainStatsMe.json",
			    type: 'post',
			    dataType: 'json',
			    /** 2020.09.01[한광희] 메인화면 생애주기/관심분야 선택에 따른 서비스 목록 조회 수정 START */
			    /* data: {
			    	statsMeType: statsMeType
			    } */
			    data: dataParams,
			    /** 2020.09.01[한광희] 메인화면 생애주기/관심분야 선택에 따른 서비스 목록 조회 수정 END */
			}).done(function (res) { // 완료
				if(res.errCd == "0") {
					var lvParams = res.result.params;
					var lvResultList = res.result.statsMeList;
					if(lvResultList != null && lvResultList.length > 0) {
						/** 2020.09.01[한광희] 메인화면 생애주기/관심분야 선택에 따른 서비스 목록 조회 수정 START */
						// 조회결과
						/* $("#statMe_nm_1").text(lvResultList[0].stat_me_nm);
						$("#statMe_nm_2").text(lvResultList[1].stat_me_nm);
						$("#statMe_nm_3").text(lvResultList[2].stat_me_nm); */
						$("#mainStatMeList").empty();
						$.each(lvResultList,function(cnt,node){
							$("#mainStatMeList").append(
								$("<li/>").append(
									$("<span/>", {text:cnt+1}),
									$("<a/>", {style:"text-overflow:ellipsis; white-space:nowrap; overflow:hidden; max-width: 160px;", text:node.stat_data_srv_nm}),
									$("<a/>",{class:"statsMeMapmove", text:"통계지도보기"}).click(function(){
										srvLogWrite('O0', '02', '05', '05',node.stat_data_srv_nm, '');
										var tempParams = "";
										tempParams += "?stat_data_id="+node.stat_data_id;
										tempParams += "&stat_data_srv_nm="+node.stat_data_srv_nm;
										tempParams += "&lifeCycleItemIdList1="+$main.ui.lfeCycleItemIdList[0];
										tempParams += "&lifeCycleItemIdList2="+$main.ui.lfeCycleItemIdList[1];
										tempParams += "&interestRealmItemIdList1="+$main.ui.statDistanceItemIdList[0];
										tempParams += "&interestRealmItemIdList2="+$main.ui.statDistanceItemIdList[1];
										location.href = contextPath + "/m2020/map/statsMe/statsMeMap.sgis"+tempParams
										return false;
									})
								)
							);
						});
						/** 2020.09.01[한광희] 메인화면 생애주기/관심분야 선택에 따른 서비스 목록 조회 수정 END */
					}
				}else if(res.errCd == "-401") {
					//common_alert(res.errMsg);
				}else{
					//common_alert(res.errMsg);
				}
			}).fail(function (res) { // 실패
				//common_alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				//common_loading(false); // 로딩바 감춤
			});
			// ajax 끝
		},
		
		/**
		 * @name : todayStatusSelect
		 * @description : 오늘의 구인현황 조회
		 * @date : 2020.06.08
		 * @author : 한광희
		 * @history :
		 * @param 
		 * 	status : 전국/현위치 선택에 따른 구분값
		 * 	p_sido_cd : 시도 코드 
		 * 	p_sido_nm : 시도명
		 * 	p_sgg_cd : 시군구 코드
		 * 	p_sgg_nm : 시군구명
		 */
		todayStatusSelect : function(status, p_sido_cd, p_sido_nm, p_sgg_cd, p_sgg_nm){
			//common_loading(true); // 로딩바 표시
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
			    	,mainType : "main"	// 2020.09.16[한광희] 메인화면 조회 속도 향상 수정
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
						/** 2020.09.16[한광희] 메인화면 조회 속도 향상 수정 START */
						/*var lv_new_corp_cnt = lvResultList[0].new_corp_cnt;
						var lv_new_rcrit_psn_cnt = lvResultList[0].new_rcrit_psn_cnt;
						var lv_clos_corp_cnt = lvResultList[0].clos_corp_cnt;
						var lv_clos_rcrit_psn_cnt = lvResultList[0].clos_rcrit_psn_cnt;
						var lv_all_corp_cnt_c = lvResultList[0].all_corp_cnt_c;
						var lv_all_rcrit_psn_cnt_c = lvResultList[0].all_rcrit_psn_cnt_c;
						var lv_new_corp_cnt_c = lvResultList[0].new_corp_cnt_c;
						var lv_new_rcrit_psn_cnt_c = lvResultList[0].new_rcrit_psn_cnt_c;
						var lv_clos_corp_cnt_c = lvResultList[0].clos_corp_cnt_c;
						var lv_clos_rcrit_psn_cnt_c = lvResultList[0].clos_rcrit_psn_cnt_c;*/
						/** 2020.09.16[한광희] 메인화면 조회 속도 향상 수정 END */
						
						// 2020.08.28[한광희] 기준일자 추가 START 
						var temp_reg_dt = "";
						if(lv_reg_dt != null && lv_reg_dt != "" && lv_reg_dt.length == 8) {
							temp_reg_dt = lv_reg_dt.substr(4,2)+"월 "+lv_reg_dt.substr(6,2)+"일";
						}
						// 2020.08.28[한광희] 기준일자 추가 END
						
						//구인업체 & 구인자수 셋팅
						// status 값 1:전국 , 2:현위치 에 따라 화면 표출 기능
						if(status == "1"){
							$("#workRoad_area_tit").text("전국 "+temp_reg_dt+" 기준 구인현황 입니다.");	// 2020.08.28[한광희] 기준일자 추가	// 2020.09.07[한광희] 설명문구 수정(띄어쓰기)
							$("#main_all_corp_cnt").html(appendCommaToNumber(lv_all_corp_cnt));
							$("#main_all_rcrit_psn_cnt").html(appendCommaToNumber(lv_all_rcrit_psn_cnt));							
						} else {
							/** 2020.09.02[한광희] 위치 미동의와 상관없이 기본위치 설정 추가 START */
							$("#workRoad_area_tit").text(p_sido_nm + " " + p_sgg_nm + " " + temp_reg_dt + " 기준 구인현황 입니다.");	// 2020.09.07[한광희] 설명문구 수정(띄어쓰기)
							$("#main_all_corp_cnt").html(appendCommaToNumber(lv_all_corp_cnt));
							$("#main_all_rcrit_psn_cnt").html(appendCommaToNumber(lv_all_rcrit_psn_cnt));
							// 위치 동의/미동의에 따른 현위치 값 셋팅
							/*if(common_get_cookie("lc_info_agree_yn") == "Y"){
								$("#workRoad_area_tit").text(p_sido_nm + " " + p_sgg_nm + " " + temp_reg_dt + " 기준 구인현황입니다.");	// 2020.08.28[한광희] 기준일자 추가
								$("#main_all_corp_cnt").html(appendCommaToNumber(lv_all_corp_cnt));
								$("#main_all_rcrit_psn_cnt").html(appendCommaToNumber(lv_all_rcrit_psn_cnt));								
							} else {
								$("#workRoad_area_tit").text(temp_reg_dt+" 기준 구인현황입니다.");	// 2020.08.28[한광희] 기준일자 추가
								$("#main_all_corp_cnt").html("-");
								$("#main_all_rcrit_psn_cnt").html("-");
							}*/
							/** 2020.09.02[한광희] 위치 미동의와 상관없이 기본위치 설정 추가 END */
						}
					}
				}else if(res.errCd == "-401") {
					//common_alert(res.errMsg);
				}else{
					//common_alert(res.errMsg);
				}
			}).fail(function (res) { // 실패
				//common_alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				//common_loading(false); // 로딩바 감춤
			});
			// ajax 끝
		},
		
		/**
		 * @name : mainBoardList
		 * @description : 공지사항 조회
		 * @date : 2020.06.10
		 * @author : 한광희
		 * @history :
		 * @param
		 */
		mainBoardList : function(){
			var swt = 0;
			$.ajax({
				/** 2020.09.21[한광희] 메인화면 공지사항 조회 쿼리 수정 START */
				/*url : sgisContextPath + "/ServiceAPI/board/boardLists.json",*/
				url : contextPath + "/m2020/main/getMainBoard.json",
				/** 2020.09.21[한광희] 메인화면 공지사항 조회 쿼리 수정 END */
				type:"POST",
				data: {
					board_cd : "BOARD_001",
					page_num : 1
				},
				async: false,
				dataType:"json",
				success: function(res){
					$.each(res.result.summaryList,function(cnt,node){
						/** 2020.09.21[한광희] 메인화면 공지사항 조회 쿼리 수정 START */
						/*if(cnt>1){
							return false;
						}*/
						var title = $("<div/>").html(node.post_title).text();
						/*swt ++;*/
						/*if(swt == 1){*/
						$("#article-list").append($("<li/>", {"class":"overflow"}).append($("<a/>",{text:title}).click(function(){
							srvLogWrite('O0', '02', '04', '01', '항목', '');
							location.href = contextPath + "/m2020/map/board/notice.sgis";								
							return false;
						})));
						/*}*/
						/** 2020.09.21[한광희] 메인화면 공지사항 조회 쿼리 수정 END */
					});
				},
				error: function(xhr, status, errorThrown) {
//						messageAlert.open("알림",errorMessage);
				}
			});
		},
		
		/**
		 * @name : mainInteractive
		 * @description : 주요지표 조회
		 * @date : 2020.06.12
		 * @author : 한광희
		 * @history :
		 * @param
		 */
		mainInteractive : function(my_sido_cd, my_sgg_cd, my_emdong_cd){
			var adm_cd = my_sido_cd+my_sgg_cd+my_emdong_cd;
			$.ajax({
				url : openApiPath+"/OpenAPI3/stats/population.json",
				type:"GET",
				data: {
					accessToken : accessToken,
					year : censusDataYear,
					bnd_year : bndYear,
					adm_cd : adm_cd,
					low_search : 0
				},
				async: false,
				dataType:"json",
				success: function(res){
					/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 START */
					if(res.errCd == "0") {
						// 현재위치
						$("#this_current_area_tit").text($main.ui.my_sido_nm+" "+$main.ui.my_sgg_nm+" "+$main.ui.my_emdong_nm);
						
						$.each(res.result,function(cnt,node){
							// 총 인구(명)
							if(node.tot_ppltn != "N/A"){
								$("#tot_ppltn").text(appendCommaToNumber(node.tot_ppltn));
							} else {
								$("#tot_ppltn").text("-");
							}
							// 평균나이(세)
							if(node.avg_age != "N/A"){
								$("#avg_age").text(appendCommaToNumber(node.avg_age));
							} else {
								$("#avg_age").text("-");
							}
							// 인구밀도(명/㎢)
							if(node.ppltn_dnsty != "N/A"){
								$("#ppltn_dnsty").text(appendCommaToNumber(node.ppltn_dnsty));
							} else {
								$("#ppltn_dnsty").text("-");
							}
							// 노령화지수
							if(node.aged_child_idx != "N/A"){
								$("#aged_child_idx").text(appendCommaToNumber(node.aged_child_idx));
							} else {
								$("#aged_child_idx").text("-");
							}
							// 노년부양비
							if(node.oldage_suprt_per != "N/A"){
								$("#oldage_suprt_per").text(appendCommaToNumber(node.oldage_suprt_per));
							} else {
								$("#oldage_suprt_per").text("-");
							}
							// 유년부양비
							if(node.juv_suprt_per != "N/A"){
								$("#juv_suprt_per").text(appendCommaToNumber(node.juv_suprt_per));
							} else {
								$("#juv_suprt_per").text("-");
							}
							// 가구(가구)
							if(node.tot_family != "N/A"){
								$("#tot_family").text(appendCommaToNumber(node.tot_family));
							} else {
								$("#tot_family").text("-");
							}
							// 평균 가구원(명)
							if(node.avg_fmember_cnt != "N/A"){
								$("#avg_fmember_cnt").text(appendCommaToNumber(node.avg_fmember_cnt));
							} else {
								$("#avg_fmember_cnt").text("-");
							}
							// 주택(호)
							if(node.tot_house != "N/A"){
								$("#tot_house").text(appendCommaToNumber(node.tot_house));
							} else {
								$("#tot_house").text("-");
							}
							// 농가(가구)
							if(node.nongga_cnt != "N/A"){
								$("#nongga_cnt").text(appendCommaToNumber(node.nongga_cnt));
							} else {
								$("#nongga_cnt").text("-");
							}
							// 임가(가구)
							if(node.imga_cnt != "N/A"){
								$("#imga_cnt").text(appendCommaToNumber(node.imga_cnt));
							} else {
								$("#imga_cnt").text("-");
							}
							// 내수면 어가(가구)
							if(node.naesuoga_cnt != "N/A"){
								$("#naesuoga_cnt").text(appendCommaToNumber(node.naesuoga_cnt));
							} else {
								$("#naesuoga_cnt").text("-");
							}
							// 해수면 어가(가구)
							if(node.haesuoga_cnt != "N/A"){
								$("#haesuoga_cnt").text(appendCommaToNumber(node.haesuoga_cnt));
							} else {
								$("#haesuoga_cnt").text("-");
							}
							// 사업체수(전체 사업체)
							if(node.corp_cnt != "N/A"){
								$("#corp_cnt").text(appendCommaToNumber(node.corp_cnt));
							} else {
								$("#corp_cnt").text("-");
							}
						});
					} else if(res.errCd == "-401") {
						accessTokenInfo(function(){
							$main.ui.mainInteractive(my_sido_cd, my_sgg_cd, my_emdong_cd);
						});
					}
					/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 END */
				},
				error: function(xhr, status, errorThrown) {
					/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 START */
					accessTokenInfo(function(){
						$main.ui.mainInteractive(my_sido_cd, my_sgg_cd, my_emdong_cd);
					});
					/** 2020.10.08[한광희] accessToken 만료시 재갱신 후 재 조회 END */
//						messageAlert.open("알림",errorMessage);
				}
			});
		},
		
		/**
		 * @name : interactiveSwiper
		 * @description : 주요지표 Swiper 기능
		 * @date : 2020.06.12
		 * @author : 한광희
		 * @history :
		 * @param
		 */
		interactiveSwiper : function(){
			var interactiveSwiper = new Swiper('#interactiveSwiper', {
				slidesPerView: 1,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				}
			});
		},
		
		/**
		 * @name : mainGetStatsThemeMapList
		 * @description : 통계주제도 인기 데이터 조회
		 * @date : 2020.06.10
		 * @author : 한광희
		 * @history :
		 * @param
		 * 	cate_id : 통계주제도 id
		 *  sort_type : 정렬
		 */
		mainGetStatsThemeMapList : function(cate_id, sort_type){
			$.ajax({
				/** 2020.09.21[한광희] 메인화면 통계주제도 조회 쿼리 수정 START */
				/*url : contextPath + "/m2020/thematic/selectThematicList.json",*/
				url : contextPath + "/m2020/main/getMainThematicList.json",
				/** 2020.09.21[한광희] 메인화면 통계주제도 조회 쿼리 수정 END */
				type:"POST",
				data: {
					cate_id : cate_id
					/** 2020.09.21[한광희] 메인화면 통계주제도 조회 쿼리 수정 START */
					/*,
					sort_type : sort_type,
					resultCnt : 4,
					ref_adm_id : $main.ui.my_sido_cd+$main.ui.my_sgg_cd+$main.ui.my_emdong_cd,	// 2020.09.15[한광희] 통계주제도 조회 변수 추가
					p : 0
					, mainType : "main"	// 2020.09.16[한광희] 메인 조회시 limit 관련 변수 추가 */
					/** 2020.09.21[한광희] 메인화면 통계주제도 조회 쿼리 수정 END */
				},
				async: false,
				dataType:"json",
				success: function(res){
					$("#main-theme-list").empty();	// 하위 요소 삭제
					$.each(res.result.themeMapInfoList,function(cnt,node){
						$("#main-theme-list").append(
								$("<div/>",{"class":"roll"}).append(
									$("<div/>",{"class":"roll_row"}).append(
										// 통계주제도별 인기 데이터 순위
										$("<h5/>", {"text":cnt+1})
									), 
									$("<div/>",{"class":"roll_row"}).append(
										// 통계주제도별 인기 데이터 제목
										$("<h5/>", {"text":node.title, "style":"word-break: keep-all;"})	// 2020.09.21[한광희] 개행 수정
									)
								).click(function(){
									srvLogWrite('O0', '02', '08', '04', node.title, node.stat_thema_map_id);	// 2020.09.21[한광희] 쿼리 수정으로 인한 변수id 변경
									// 2020.08.28[한광희] 통계주제도 클릭 이벤트 추가
									location.href = contextPath+"/m2020/map/thematic/thematicMap.sgis?category="+cate_id+"&id="+node.stat_thema_map_id;	// 2020.09.21[한광희] 쿼리 수정으로 인한 변수id 변경
								})
							);
						/** 2020.09.21[한광희] 메인화면 통계주제도 조회 쿼리 수정으로 주석처리 START */
						/*if(cnt == 2){
							return false;
						}*/
						/** 2020.09.21[한광희] 메인화면 통계주제도 조회 쿼리 수정으로 주석처리 END */
					});
					common_loading(false);	// 2020.09.21[한광희] 로딩바
				},
				error: function(xhr, status, errorThrown) {
//						messageAlert.open("알림",errorMessage);
				}
			});
		},
		
		/**
		 * @name : mainGetStatsThemeMapListSwiper
		 * @description : 통계주제도 인기 데이터 Swiper 기능
		 * @date : 2020.06.10
		 * @author : 한광희
		 * @history :
		 * @param
		 */
		mainGetStatsThemeMapListSwiper : function(){
			var mainGetStatsThemeMapListSwiper = new Swiper('#mainGetStatsThemeMapListDiv', { 				
				navigation: {
		              nextEl: '.swiper-button-next',
		              prevEl: '.swiper-button-prev',
				},
				on: {
					slideChangeTransitionEnd: function() {
						common_loading(true);	// 2020.09.21[한광희] 로딩바
						
						//mng_s 20201123 이진호, W3C 웹 표준 오류 검사에서 기존 cate_id 를 id 로 수정 함에 따라 수정
						//var cateId = $("#mainGetStatsThemeMapListDiv .swiper-slide-active").attr("cate_id");
						var cateId = $("#mainGetStatsThemeMapListDiv .swiper-slide-active").attr("id");
						//mng_e 20201123 이진호
						
						// 통계주제도 인기 데이터 조회
						$main.ui.mainGetStatsThemeMapList(cateId, "favorite");
					}
				}
			});
		},
		
		/**
		 * @name : mainLifeEnvironmentSelect
		 * @description : 생활환경 팝업 조회
		 * @date : 2020.06.10
		 * @author : 한광희
		 * @history :
		 * @param :
		 * 		p_sido_cd : 시도 코드 
		 * 		p_sgg_cd : 시군구 코드 
		 * 		p_emdong_cd : 읍면동 코드 
		 */
		mainLifeEnvironmentPopupSelect : function(p_sido_cd, p_sgg_cd, p_emdong_cd) {
			//common_loading(true);
			// ajax 시작
			$.ajax({
				/** 2020.09.21[한광희] 생활환경종합 지표 속도 향상으로 인한 수정 START */
				/* url: contextPath + "/m2019/workroad/livingEnvironmentSelect.json", */
			    url: contextPath + "/m2020/main/getMainLivingEnvironment.json",
			    type: "post",
			    dataType: "json",
			    data: {
			    	sido_cd : p_sido_cd
			    	,sgg_cd : p_sgg_cd
			    	//,emdong_cd : p_emdong_cd
			    	//, mainType : "main"	// 2020.09.16[한광희] 메인화면 조회 속도 향상 수정
			    }
			}).done(function (res) { // 완료
				if(res.errCd == "0") {
					/* 조회결과 */
					// 종합(전국)
					var lvResultList0 = res.result.lvResultList0;
					// 종합(지역)
					var lvResultList1 = res.result.lvResultList1;
					// 지역명
					var admNmText = "";
					// 우리동네 생활환경종합 지표 문구
					var lifeEnvironmentIdxHtml = "";
					// 지표 명칭 설정
					var lvBClassIdxNm = "";
					$.each($main.ui.bClassInfoList, function(cnt, node){
						if(cnt == lvResultList1[0].b_class_idx_id){
							lvBClassIdxNm = node.text;
						}
					});
					
					/* 타이틀 */
					admNmText = $main.ui.my_sido_nm+" "+$main.ui.my_sgg_nm+" 평균";
					lifeEnvironmentIdxHtml = "전국에 비해 "+admNmText+"의<br /><strong>"+lvBClassIdxNm+"</strong> 지표가 좋습니다.</p>";
					// 지표 타이틀
					$("#mainLifeEnvironment_this_title_1").html(lifeEnvironmentIdxHtml);
					
					$("#mainLifeEnvironment").empty();
					$("#mainLifeEnvironment").append(
						$("<div/>",{"class":"roll"}).append(
							$("<div/>",{"class":"roll_row"}).append(
								$("<h6/>", {"text":"전국평균"})
							), 
							$("<div/>",{"class":"roll_row"}).append(
								$("<h1/>", {"text":lvResultList0[0].z_score})
							)
						).click(function(){
							srvLogWrite('O0', '02', '09', '04', '전국평균', '');
							location.href = contextPath+"/m2020/map/house/houseStatusMap.sgis?b_class_idx_id="+lvResultList1[0].b_class_idx_id;
						}),
						$("<div/>",{"class":"roll"}).append(
							$("<div/>",{"class":"roll_row"}).append(
								$("<h6/>", {"text":admNmText})
							), 
							$("<div/>",{"class":"roll_row"}).append(
								$("<h1/>", {"text":lvResultList1[0].z_score})
							)
						).click(function(){
							srvLogWrite('O0', '02', '09', '04', '위치평균', '');
							location.href = contextPath+"/m2020/map/house/houseStatusMap.sgis?b_class_idx_id="+lvResultList1[0].b_class_idx_id;
						})
					);
					
					/* 조회결과 
					//지역정보
					var resultAdmInfo = res.result.resultAdmInfo;
					//종합(전국)
					var lvResultCount0 = res.result.resultCount0;
					var lvResultList0 = res.result.resultList0;
					//종합
					var lvResultCount1 = res.result.resultCount1;
					var lvResultList1 = res.result.resultList1;
					// 지역명
					var admNmText = "";
					// 우리동네 생활환경종합 지표 문구
					var lifeEnvironmentIdxHtml = "";
					
					 타이틀 
					if(resultAdmInfo != undefined && resultAdmInfo != null) {
						var lvTempSidoNm = "전국";
						var lvTempSggNm = "";
						if(resultAdmInfo.sido_nm != undefined && resultAdmInfo.sido_nm != null) lvTempSidoNm = resultAdmInfo.sido_nm; 
						if(resultAdmInfo.sgg_nm != undefined && resultAdmInfo.sgg_nm != null) lvTempSggNm = " "+resultAdmInfo.sgg_nm; 
						admNmText = lvTempSidoNm+lvTempSggNm+" 평균";
					}

					// 우리동네 생활환경종합 지표 문구					
					var maxResult = -10;
					var selectwgtval = 0;
					for(var i=0; i<lvResultList0.length; i++){
						var tempResult = parseFloat(lvResultList1[i].z_score);
						if(maxResult <= tempResult){
							maxResult = tempResult;
							selectwgtval = i;
						}
					}
					lifeEnvironmentIdxHtml = "전국에 비해 "+admNmText+"의<br /><strong>"+lvResultList1[selectwgtval].b_class_idx_nm+"</strong> 지표가 좋습니다.</p>";
					
					 종합 
					*//** 2020.08.31[한광희] 살고싶은 우리동네 생활환경 전체 평균 값이 아닌 해당 지표수치로 변경 START *//*
					// 지표 타이틀
					$("#mainLifeEnvironment_this_title_1").html(lifeEnvironmentIdxHtml);
					
					*//** 2020.09.02[한광희] 메인화면 살고싶은 우리동네 정보 카드 link 추가 START *//*
					$("#mainLifeEnvironment").empty();
					$("#mainLifeEnvironment").append(
						$("<div/>",{"class":"roll"}).append(
							$("<div/>",{"class":"roll_row"}).append(
								$("<h6/>", {"text":"전국평균"})
							), 
							$("<div/>",{"class":"roll_row"}).append(
								$("<h1/>", {"text":lvResultList0[selectwgtval].z_score})
							)
						).click(function(){
							srvLogWrite('O0', '02', '09', '04', '전국평균', '');
							location.href = contextPath+"/m2020/map/house/houseStatusMap.sgis?b_class_idx_id="+lvResultList1[selectwgtval].b_class_idx_id;
						}),
						$("<div/>",{"class":"roll"}).append(
							$("<div/>",{"class":"roll_row"}).append(
								$("<h6/>", {"text":admNmText})
							), 
							$("<div/>",{"class":"roll_row"}).append(
								$("<h1/>", {"text":lvResultList1[selectwgtval].z_score})
							)
						).click(function(){
							srvLogWrite('O0', '02', '09', '04', '위치평균', '');
							location.href = contextPath+"/m2020/map/house/houseStatusMap.sgis?b_class_idx_id="+lvResultList1[selectwgtval].b_class_idx_id;
						})
					);*/
					/** 2020.09.02[한광희] 메인화면 살고싶은 우리동네 정보 카드 link 추가 END */
					/** 2020.09.21[한광희] 생활환경종합 지표 속도 향상으로 인한 추가 END */
					
					/*//차트데이터
					var lvTempSeries1Name = "전국";
					//전국평균
					var lvTempAllZScore = 0;
					var lvTempAllZScoreCnt = 0;
					if(lvResultCount0 > 0) {
						for(var i = 0; i < lvResultCount0; i++) {
							lvTempAllZScore += lvResultList0[i].z_score * lvResultList0[i].z_score_cnt;
							lvTempAllZScoreCnt += lvResultList0[i].z_score_cnt;
						}
					}
					if(lvTempAllZScoreCnt > 0) {
						$("#mainLifeEnvironment_all_avg").html(""+((new Number(lvTempAllZScore / lvTempAllZScoreCnt).toFixed(2) * 100) / 100));
					}
					else {
						$("#mainLifeEnvironment_all_avg").html("0");
					}
					$("#mainLifeEnvironment_this_title_1").html(lifeEnvironmentIdxHtml);
					//지역명
					$("#mainLifeEnvironment_this_title_2").text(admNmText);
					//지역평균
					var lvTempThisZScore = 0;
					var lvTempThisZScoreCnt = 0;
					if(lvResultCount1 > 0) {
						for(var i = 0; i < lvResultCount1; i++) {
							lvTempThisZScore += lvResultList1[i].z_score * lvResultList1[i].z_score_cnt;
							lvTempThisZScoreCnt += lvResultList1[i].z_score_cnt;
						}
					}
					if(lvTempThisZScoreCnt > 0) {
						$("#mainLifeEnvironment_this_avg").html(""+((new Number(lvTempThisZScore / lvTempThisZScoreCnt).toFixed(2) * 100) / 100));
					}
					else {
						$("#mainLifeEnvironment_this_avg").html("0");
					}*/
					/** 2020.08.31[한광희] 살고싶은 우리동네 생활환경 전체 평균 값이 아닌 해당 지표수치로 변경 END */
				}else if(res.errCd == "-401") {
					common_alert(res.errMsg);
				}else{
					common_alert(res.errMsg);
				}
			}).fail(function (res) { // 실패
				common_alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				//common_loading(false);
			});
			// ajax 끝
		},
		
		/**
		 * @name : mainCommunityList
		 * @description : 지역현안 소통지도 조회
		 * @date : 2020.06.11
		 * @author : 한광희
		 * @history :
		 * @param
		 */
		mainCommunityList : function(){
			// ajax 시작
			$.ajax({
			    url: contextPath + "/mainCommunityList.json",	// 2020.09.17[한광희] 메인 지역현안 소통지도 수정
			    type: "post",
			    dataType: "json",
			    data: {
			    	type : "all",
			    	from_ce : 'C'	//지역현안소통지도
			    }
			}).done(function (res) { // 완료
				if(res.errCd == "0") {
					/* 조회결과 */
					$.each(res.result.list,function(cnt,node){
						$("#main-community-list").append(
							$("<div/>",{"class":"rollCommunity"}).append(
								$("<div/>",{"class":"roll_row02"}).append(
									// 소통지도 이미지
									$("<img/>",{"class":"communityImg", src:sgisContextPath+node.path_nm+"thumbnail/thumbnail-L-"+node.save_file_nm}),
									// 소통지도 제목
									$("<h5/>", {"text":node.cmmnty_map_nm}),
									// 소통지도 등록자명
									$("<h6/>", {"html":"<span><img src='"+contextPath+"/resources/m2020/images/main/write.png'></span>"+node.usr_id}),
									// 소통지도 등록일
									$("<h6/>", {"html":"<span><img src='"+contextPath+"/resources/m2020/images/main/write_date.png'></span>"+node.reg_date})
								)
							).click(function(){
								srvLogWrite('O0', '02', '10', '03', node.cmmnty_map_nm, '');
								// 소통지도 클릭 이벤트
								location.href = contextPath+"/m2020/map/community/map/communityMap.sgis?id="+node.cmmnty_map_id;
							})
						);
						if(cnt == 1){
							return false;
						}
					});
					
				}else if(res.errCd == "-401") {
					common_alert(res.errMsg);
				}else{
					common_alert(res.errMsg);
				}
			}).fail(function (res) { // 실패
				common_alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				//common_loading(false);
			});
			// ajax 끝
		}
	};
	
	// 지도 콜백 함수 선언
	$main.callbackFunc = {
		// 해당경계 선택 시, 발생하는 콜백함수
		didSelectedPolygon : function(event, data, type, map) {
			//console.log("didSelectedPolygon - START");
		}
		// 지도이동. createMap()에서 "movestart" 이벤트 선언시 콜백됨. 
		,didMapMoveStart : function(event, map) {
			//console.log("didMapMoveStart - START");
		}
		// 지도이동종료. createMap()에서 "moveend" 이벤트 선언시 콜백됨.
		,didMapMoveEnd : function(event, map) {
			//console.log("didMapMoveEnd - START");
		}
		// 줌 시작. createMap()에서 "zoomstart" 이벤트 선언시 콜백됨. 
		,didMapZoomStart : function(event, map) {
			//console.log("didMapZoomStart - START");
		}
		// 줌 종료. createMap()에서 "zoomend" 이벤트 선언시 콜백됨. 
		,didMapZoomEnd : function(event, map) {
			//console.log("didMapZoomEnd - START");
		}
		// 지도 드래그. createMap()에서 "drag" 이벤트 선언시 콜백됨. 
		,didMapDrag : function(event, map) {
			//console.log("didMapDrag - START");
		}
		// 지도 드래그 종료. createMap()에서 "dragend" 이벤트 선언시 콜백됨. 
		,didMapDragEnd : function(event, map) {
			//console.log("didMapDragEnd - START");
		}
	};

	$main.event = {
		/**
		 * @name : setUIEvent
		 * @description : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 * @date : 2020.06.09
		 * @author : 한광희
		 * @history :
		 */
		setUIEvent : function() {
			/** 2020.09.01[한광희] 메인화면 생애주기/관심분야 선택에 따른 서비스 목록 조회 수정 START */
			// My통계로 생애주기/관심분야 클릭
			/*$("body").on("click", "button[name=mainStatMe]", function(){
				$("button[name=mainStatMe]").removeClass("on");
				$(this).addClass("on");
				var statsMeType = $(this).attr("id");
				$main.ui.mainStatsMeList(statsMeType);
			});*/
			/** 2020.09.01[한광희] 메인화면 생애주기/관심분야 선택에 따른 서비스 목록 조회 수정 END */
			
			// 2020.08.28[한광희] 오늘의 구인현황(전체 구인업체수/전체 구인자수) 카드 클릭 이벤트 START
			$("body").on("click", "#main_all_corp_cnt_div, #main_all_rcrit_psn_cnt_div", function(){
				if($(this).attr('id') == "main_all_corp_cnt_div"){
					srvLogWrite('O0', '02', '06', '05', '구인업체수', '');
				}else if($(this).attr('id') == "main_all_rcrit_psn_cnt_div"){
					srvLogWrite('O0', '02', '06', '05', '구인자수', '');
				}
				if($(".toggleFG").text() == "전국"){
					location.href = contextPath+"/m2020/map/workroad/todayStatusMap.sgis?areaType=all";
				}else{
					location.href = contextPath+"/m2020/map/workroad/todayStatusMap.sgis?areaType=this";
				}
			});
			// 2020.08.28[한광희] 오늘의 구인현황(전체 구인업체수/전체 구인자수) 카드 클릭 이벤트 END
			
			/** 2020.08.31[한광희] 내 주변 주요지표 카드 link 추가 START */
			$("body").on("click", "#interactiveSwiper .roll", function(){
				srvLogWrite('O0', '02', '07', '04', $(this).find('div').eq(0).text().trim(), '');
				var tempId = $(this).find("h1").attr("id");
				location.href = contextPath+"/m2020/map/current/currentMap.sgis?type=API_0301&menuIndex=0&tempId="+tempId;
			});
			/** 2020.08.31[한광희] 내 주변 주요지표 카드 link 추가 END */
			
			/** 2020.09.01[한광희] 메인화면 생애주기/관심분야 선택에 따른 서비스 목록 조회 수정 START */
			// 생애주기 선택 이벤트
			$("body").on("click", "a[name=mainLfeCycle]", function(){
				srvLogWrite('O0', '02', '05', '03', $(this).text(), '');
				var item = $(this).data("id");
				if($(this).is(".on") == true){
					$(this).removeClass("on");
					// 생애주기 선택 갯수 삭제
					$main.ui.lfeCycleCnt--;
					// 생애주기 선택항목 id list에서 삭제
					$main.ui.lfeCycleItemIdList.splice($main.ui.lfeCycleItemIdList.indexOf(item), 1);
				} else {
					if($main.ui.lfeCycleCnt == 2){
						var tempItem = $main.ui.lfeCycleItemIdList[0];
						var tempDivClick = "a[data-id="+tempItem+"]";
						$(tempDivClick).removeClass("on");
						$main.ui.lfeCycleItemIdList.splice($main.ui.lfeCycleItemIdList.indexOf(tempItem), 1);
						$(this).addClass("on");
						$main.ui.lfeCycleItemIdList.push(item);
					} else {
						$(this).addClass("on");
						$main.ui.lfeCycleCnt++;
						$main.ui.lfeCycleItemIdList.push(item);
					}
				}
				
				// 생애주기/관심분야 목록 조회
				$main.ui.mainStatsMeList();
			});
			
			// 관심분야 선택 이벤트
			$("body").on("click", "a[name=mainStatDistance]", function(){
				srvLogWrite('O0', '02', '05', '04', $(this).text(), '');
				var item = $(this).data("id");
				if($(this).is(".on") == true){
					$(this).removeClass("on");
					// 관심분야 선택 갯수 삭제
					$main.ui.statDistanceCnt--;
					// 관심분야 선택항목 id list에서 삭제
					$main.ui.statDistanceItemIdList.splice($main.ui.statDistanceItemIdList.indexOf(item), 1);
				} else {
					if($main.ui.statDistanceCnt == 2){
						var tempItem = $main.ui.statDistanceItemIdList[0];
						var tempDivClick = "a[data-id="+tempItem+"]";
						$(tempDivClick).removeClass("on");
						$main.ui.statDistanceItemIdList.splice($main.ui.statDistanceItemIdList.indexOf(tempItem), 1);
						$(this).addClass("on");
						$main.ui.statDistanceItemIdList.push(item);
					} else {
						$(this).addClass("on");
						$main.ui.statDistanceCnt++;
						$main.ui.statDistanceItemIdList.push(item);
					}
				}
				
				// 생애주기/관심분야 목록 조회
				$main.ui.mainStatsMeList();
			});
			/** 2020.09.01[한광희] 메인화면 생애주기/관심분야 선택에 따른 서비스 목록 조회 수정 END */
		},
		
		/**
		 * @name : setMapSize
		 * @description : 지도 사이즈 변경
		 * @date : 2020.06.09
		 * @author : 한광희
		 * @history :
		 */
		setMapSize : function() {
			var lvMapHeight = Number($(window).outerHeight(true)) - Number($(".sub_Wrap>.sub_header").outerHeight(true));
			$("#map").height(lvMapHeight);
		}
	};
}(window, document));