/**
 * 일자리맵 서비스 Left 메뉴에 관한 클래스
 * 
 * history : 
 *		2018.09.01	ywKim	신규
 *		2018.09.20	ywKim	Copy of policyMapLeftmenu.js
 *							  - 불필요한 부분 삭제 (ing)
 * 
 * author : 
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$workRoadLeftMenu = W.$workRoadLeftMenu || {};

	$workRoadLeftMenu.ui = {
		isClickMyNeighborhoodJobBtn : false,	// "내주변 일자리 보기" 메뉴를 클릭한 경우 ("일자리 보기" 메뉴가 중복 처리되면 안됨)
			
		policy_info : null,						// DB에서 불러온 정책정보
		defaultSidoCd : "11",					// 기본 시도 코드 : 11:서울특별시
		defaultSggCd : null,					// 기본 시군구 코드
		arrParamList : new Array(), 			// 조회된 파라미터 정보배열     //2017.09.06 [개발팀] 조회기능추가
		dataList : [],
		
		/**
		 * @name             : openAnimate
		 * @description      : 왼쪽메뉴 show
		 * @date             : 2018.09.01
		 * @author	         : ywKim
		 * @history 	     :
		 * 		2019.04.09	ywKIm	변경
		 * 							1. 레이어 위치를 메뉴 너비 우측으로 이동
		 */
		openAnimate : function() {
			$(".quickBox .bottom > a.stepClose").addClass("on");//2019-06-21 박길섭
			$(".nav-sidebar").stop().animate({"left":"0"},200);
			
			$workRoad.ui.setCoordX($workRoad.ui.currentIndex);
			
			if ($workRoad.ui.currentIndex == 0) {
				$wrmTodayStatus.ui.layout($workRoad.ui.coordX);
			} else if ($workRoad.ui.currentIndex == 1) {
				$wrmViewJobs.ui.layout($workRoad.ui.coordX);
			} else if ($workRoad.ui.currentIndex == 2) {
				$(".quickBox.step02").stop().animate({"left":"80px"},200);
				//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
				var lvStep03Left = Number($saSubMenu.ui.saSubMenuKosisDetailDivDefalutLeft)+Number($saSubMenu.ui.saSubMenuApiWork02Width);
				$(".quickBox.step03").stop().animate({"left":lvStep03Left+"px"},200);
				//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END
				$(".bottom .stepClose").css({right: '-25px'});

				var subLeft = $("#mCSB_1").width()+$("#quickBox_2depth").width();
				$wrmStatusAnls.ui.layout(subLeft); //20200406 이금은
			} else if ($workRoad.ui.currentIndex == 3) {
				$(".expanded").stop().animate({"left":"80px"},200);
				$wrmStatsAnls.ui.layout($workRoad.ui.coordX);
			}
		},
		
		/**
		 * @name             : closeAnimate
		 * @description      : 왼쪽메뉴 hide
		 * @date             : 2018.09.01
		 * @author	         : ywKim
		 * @history 	     :
		 * 		2019.04.09	ywKIm	변경
		 * 							1. 메뉴 비활성화 상태에서 레이어 Open 위치 원점으로 조정
		 * 							2. 레이어 위치를 좌표 원점으로 이동 							
		 */
		closeAnimate : function(){
			$(".quickBox .bottom > a.stepClose").removeClass("on");//2019-06-21 박길섭
			$(".nav-sidebar").stop().animate({"left":"-80px"},200);
			
			$workRoad.ui.setCoordX(-1);	// 레이어,팝업창 좌표를 0으로 설정
			
			// 1. 서브메뉴 숨기기
			// 2. 레이어의 위치를 좌표 원점으로 이동 
			if ($workRoad.ui.currentIndex == 0) {
				$wrmTodayStatus.ui.layout($workRoad.ui.coordX, $workRoad.ui.coordY);
			} else if ($workRoad.ui.currentIndex == 1) {
				$wrmViewJobs.ui.layout($workRoad.ui.coordX, $workRoad.ui.coordY);
			} else if ($workRoad.ui.currentIndex == 2) {
				//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
				$(".quickBox.step02").stop().animate({"left":"-1120px"},200);//2019-06-21 박길섭
				//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END
				$(".quickBox.step03").stop().animate({"left":"25px"},200);//2019-06-21 박길섭
				$(".bottom .stepClose").css({right: '0px'});
				$("#wrmSelection").stop().animate({"left":"0px"}, 300); //20200406 이금은
				$wrmStatusAnls.ui.layout($workRoad.ui.coordX, $workRoad.ui.coordY);
			} else if ($workRoad.ui.currentIndex == 3) {
				$(".expanded").stop().animate({"left":"-80px"},200);
				$wrmStatsAnls.ui.layout($workRoad.ui.coordX, $workRoad.ui.coordY);
			}
		},	
		/**
		 * @name             : 메뉴 스위치 off
		 * @description      : 
		 * @date             : 2018.09.01
		 * @author	         : ywKim
		 * @history 	     :
		 * @param obj  : this
		 */
		turnOffSwitch : function() {
			$(".sideQuick").removeClass("on");// 메뉴 스위치 off
//			$workRoad.ui.moveTitle();
			$(".nav-sidebar").stop().animate({ "left": "-380px" }, 200);// 1레벨 메뉴바 숨기기
			if (typeof $wrmStatsAnls !== 'undefined') { $wrmStatsAnls.ui.hideSubMenu(); }
			if (typeof $wrmStatusAnls !== 'undefined') { $wrmStatusAnls.ui.hideSubMenu(); }
		},
//		/*
//		 * 중메뉴(바)가 활성화 상태인지
//		 */
//		navSidebarVisible : function() {
//			var left = $('.nav-sidebar').css('left');
//
//			if (parseInt(left) >= 0) {
//				return true;
//			} else {
//				return false;
//			}
//		},
		showNavSidebar : function(pCallback) {
			$(".nav-sidebar").stop().animate({ "left": "0px" }, 200, function() {
				if (typeof pCallback == 'function') {
					pCallback();
				}
			});
		},
		moveMenu : function (idx) {
			if ($workRoad.ui.loadByPage) {// 중메뉴별 전체로드하는 경우
            	if ($workRoad.ui.prevIndex != idx) {
            		//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START
            		var lvGetParameters = "";
            		if(gv_screen != "") {
            			if(lvGetParameters == "") lvGetParameters += "?";
            			else lvGetParameters += "&";
            			lvGetParameters += "screen="+encodeURIComponent(gv_screen);
            		}
            		if(
            			gv_type != ""
            			|| gv_sido_cd != ""
            			|| gv_sgg_cd != ""
            			|| gv_zoom != ""
            			|| gv_coord_x != ""
            			|| gv_coord_y != ""
            		) {
            			if(lvGetParameters == "") lvGetParameters += "?";
            			else lvGetParameters += "&";
            			lvGetParameters += "type="+encodeURIComponent(gv_type);
            			lvGetParameters += "&sido_cd="+encodeURIComponent(gv_sido_cd);
            			lvGetParameters += "&sgg_cd="+encodeURIComponent(gv_sgg_cd);
            			lvGetParameters += "&zoom="+encodeURIComponent(gv_zoom);
            			lvGetParameters += "&coord_x="+encodeURIComponent(gv_coord_x);
            			lvGetParameters += "&coord_y="+encodeURIComponent(gv_coord_y);
            		}
            		if ($workRoad.ui.isDevTest) {
			            switch (idx) {
			            case 1: location.href = '/view/job/viewJobs'+lvGetParameters; break;
			            case 2: location.href = '/view/job/statusAnls'+lvGetParameters; break;
			            case 3: location.href = '/view/job/statsAnls'+lvGetParameters; break;
			            default: location.href = '/view/job/todayStatus'+lvGetParameters; break;
			            }
            		} else {
            			switch (idx) {
			            case 1: location.href = '/view/workRoad/viewJobs'+lvGetParameters; break;
			            case 2: location.href = '/view/workRoad/statusAnls'+lvGetParameters; break;
			            case 3: location.href = '/view/workRoad/statsAnls'+lvGetParameters; break;
			            default: location.href = '/view/workRoad/todayStatus'+lvGetParameters; break;
			            }
            		}
            		//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. END
            	} else {
            		//2019-05-07 [김남민] 일자리 보기 > 전국에서 일자리보기 기능 개선. START
            		if(idx == 1) {
            			$workRoad.ui.changeMenu(1, $wrmViewJobs.ui.viewAllJob);
            		}
            		else {
            			$workRoad.ui.changeMenu(idx);
            		}
            		//2019-05-07 [김남민] 일자리 보기 > 전국에서 일자리보기 기능 개선. END
            	}
            } else {
            	//2019-05-07 [김남민] 일자리 보기 > 전국에서 일자리보기 기능 개선. START
            	if(idx == 1) {
        			$workRoad.ui.changeMenu(1, $wrmViewJobs.ui.viewAllJob);
        		}
        		else {
        			$workRoad.ui.changeMenu(idx);
        		}
        		//2019-05-07 [김남민] 일자리 보기 > 전국에서 일자리보기 기능 개선. END
            }
		},
		/**
		 * 내주변 일자리 보기로 이동
		 */
		goNeighborhoodJob : function() {
			$workRoadLeftMenu.ui.isClickMyNeighborhoodJobBtn = true;
			if ($workRoad.ui.prevIndex != 1) {
				// 내위치 정보가 없는 경우 재취득한다.
				// 그러나 종종 취득 실패하는 경우가 있어서 10번정도 재시도한다.
				var i = 0;
				var timer = setInterval(function() {
					console.log("timer: " + i);				
					if ($workRoad.ui.mySidoCd != '' || i >= 10) {
						clearInterval(timer);
						
						if ($workRoad.ui.mySidoCd != '') {
							if ($workRoad.ui.prevIndex == 1 || $workRoad.ui.loadByPage == false) {
								$workRoad.ui.changeMenu(1, $wrmViewJobs.ui.viewMyNeighberhoodJob);
							} else {
								//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START
			            		var lvGetParameters = "";
			            		if(gv_screen != "") {
			            			if(lvGetParameters == "") lvGetParameters += "?";
			            			else lvGetParameters += "&";
			            			lvGetParameters += "screen="+encodeURIComponent(gv_screen);
			            		}
			            		if(
			            			gv_type != ""
			            			|| gv_sido_cd != ""
			            			|| gv_sgg_cd != ""
			            			|| gv_zoom != ""
			            			|| gv_coord_x != ""
			            			|| gv_coord_y != ""
			            		) {
			            			if(lvGetParameters == "") lvGetParameters += "?";
			            			else lvGetParameters += "&";
			            			lvGetParameters += "type="+encodeURIComponent(gv_type);
			            			lvGetParameters += "&sido_cd="+encodeURIComponent(gv_sido_cd);
			            			lvGetParameters += "&sgg_cd="+encodeURIComponent(gv_sgg_cd);
			            			lvGetParameters += "&zoom="+encodeURIComponent(gv_zoom);
			            			lvGetParameters += "&coord_x="+encodeURIComponent(gv_coord_x);
			            			lvGetParameters += "&coord_y="+encodeURIComponent(gv_coord_y);
			            		}
								if ($workRoad.ui.isDevTest) {
									location.href = '/view/job/myNeighberhoodJob'+lvGetParameters;
								} else {
									location.href = '/view/workRoad/myNeighberhoodJob'+lvGetParameters;
								}
								//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. END
							}
						} else {
							alert ('현재 위치를 알 수 없습니다.');
						}
					} else {
						$workRoad.ui.getMyPosition();
						i++;
					}
				}, 100);
			} else {
				$workRoad.ui.changeMenu(1, $wrmViewJobs.ui.viewMyNeighberhoodJob);
			}
		}
	};

	
	$workRoadLeftMenu.event = {
			/**
			 * @name		 : setUIEvent
			 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date		 : 2018.09.19 
			 * @author		 : ywKim
			 * @history 	 :
			 * @param
			 */
			setUIEvent: function() {
				console.log("$workRoadLeftMenu.event.setUIEvent() called.");
				
//				// ??? 뭔지 모름
//				$(".normalBox01").css("height", "calc(100% - 82px)");
//				$(".scrollBox").mCustomScrollbar({axis:"y",advanced: { autoExpandHorizontalScroll: true }});
//				$(".mCSB_container").css("margin-right", "10px");
				
				// 메뉴스위치 show/hide - 1depth
				$workRoad.event.set("click", "#wrmMenuSwitch",function() {
//					$(".jobul li").removeClass("on");
					var on = $(this).hasClass("on");
					$(".sideQuick").removeClass("on");
					if(!on){
						$(this).addClass("on");
						$workRoadLeftMenu.ui.openAnimate();
					}else{
						$workRoadLeftMenu.ui.closeAnimate();
					}
				});
				
				// 메뉴 카테고리 선택
				$workRoad.event.set("click", ".job-offer li", function() {
					if ($workRoadLeftMenu.ui.isClickMyNeighborhoodJobBtn) {
						return;
					}
					
//					$(".jobul li").removeClass("on");
					$(this).addClass("on");
//					$workRoadLeftMenu.ui.openAnimate(2);
//					$workRoadLeftMenu.ui.getDetailCategoryList($(this).attr("id"));  // 2017.08.11 [개발팀] 세부지표 리스트 조회
					$(".normalBox01").scrollTop(0);
//					$(".quickBox.step01").stop().animate({ "left": "-244px" }, 200);
					$workRoadLeftMenu.ui.showNavSidebar();
//		            $(".nav-sidebar").stop().animate({ "left": "0px" }, 200);
		            
		            // 메뉴 변경 처리 - 2018.09.20	ywKim	추가 [v180901]
		            var idx = $(this).closest('ul').find('li').index(this);
		            $workRoadLeftMenu.ui.moveMenu(idx);
	            	if(idx == 1 && $('#wrmMenuIndex').val() == '111'){
	            		$('#vjJobInfoList').hide();
	            		$('#wrmMenuIndex').val('1');
	            	}
				});
				// 내주변 일자리 선택
				$workRoad.event.set("click", "#myNeighborhoodJob1, #myNeighborhoodJob2", function() {
					$workRoadLeftMenu.ui.goNeighborhoodJob();
				});

//				//하단 패밀리사이트
//				$workRoad.event.set("click","#bottomService",function(){
//					var ck = $(this).hasClass("on");
//					if(!ck){
//						$(this).addClass("on");
//						$("#bottomServiceLayer").show();
//					}else{
//						$(this).removeClass("on");
//						$("#bottomServiceLayer").hide();
//					}
//				});
				
//				// ??? 메인 이벤트인듸
//				$workRoad.event.set("focus", ".containerBox", function() {
//					$(".ulDiv").trigger("mouseout");
//				});
//				
//				// ??? 엘리먼트 위치가 어디지
//				$workRoad.event.set("keydown", ".skipNav", function(e) {
//					if (e.keyCode == 13) {
//						$("#clearBtn").focus();
//					}
//				});
//				
//				// ??? 엘리먼트 위치가 어디지
//				$workRoad.event.set("keydown", ".ctgrList li", function(e) {
//					if (e.keyCode == 13) {
//						$(this).trigger("click");
//					}
//				});
//				
//				// ??? 메인 이벤트인듸 / 전체적용인듯
//				$workRoad.event.set("focus", ".containerBox a", function() {
//					$(this).css("outline", "none");
//					$(this).css("opacity", "0.7");
//				});
//				
//				// ??? 메인 이벤트인듸 / 전체적용인듯
//				$workRoad.event.set("focusout", ".containerBox a", function() {
//					$(this).css("opacity", "1");
//				});
			},
	};
}(window, document));