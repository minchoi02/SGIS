/**
 * 살고싶은 우리동네 화면에 대한 클래스
 * 
 * history : 
 * 2018.09.01			살고싶은 우리동네 소스 복사
 * 
 * 
 * author : 이기로,나광흠
 * version : 1.0
 * see : 
 *
 */

//bndYear = "2018"; 

(function(W, D) {
	W.$workRoad = W.$workRoad || {};
//	$workRoad.noReverseGeoCode = true;
	
	$(document).ready(function() {
		
		//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START
		if((gv_url == "todayStatus" || gv_url == "myNeighberhoodJob") && gv_type == "full" && gv_sido_cd == "") {
			alert("시도 코드는 필수 입력값 입니다.");
			return;
		}
		//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. END
		
		if ($("#wrmIsDevTest").val() == "Y") {
			$workRoad.ui.isDevTest = true;
			$("#wrap header").remove();
		}
		
		$workRoad.ui.getMyPosition();
		$workRoad.event.setUIEvent();
		
		if ($workRoad.ui.loadByPage) {// 중메뉴별로 전체 로드하는 경우
			menuIndex = parseInt($('#wrmMenuIndex').val());

//			$workRoad.ui.delCookie("workRoadMainPop"); // (테스트용) 쿠키 지우기	
			if( menuIndex < 0 && getCookie("workRoadMainPop") == "N" ){ // 첫화면 접속시, '하루안보기' popup 여부
				menuIndex = 0; // workRoadMain이 나타나지 않음.	
			}
			if (menuIndex < 0) {// 기본주소(대메뉴)로 열기
				$workRoad.ui.mainPopupEnabled = true;
				$workRoad.ui.changeMenu();
			}
			//2019-05-07 [김남민] 일자리 보기 > 전국에서 일자리보기 기능 개선. START
			else if (menuIndex == 1) {// 전체 일자리보기
				$workRoad.ui.defaultMenuIndex = 1;
				$workRoad.ui.changeMenu(undefined, $wrmViewJobs.ui.viewAllJob);
			}
			//2019-05-07 [김남민] 일자리 보기 > 전국에서 일자리보기 기능 개선. END
			else if (menuIndex == 111) {// 내주변 일자리보기
				$workRoad.ui.getMyPositionCallback = $wrmViewJobs.ui.viewMyNeighberhoodJob;
				$workRoad.ui.defaultMenuIndex = 1;
				$workRoad.ui.changeMenu();
//				$workRoad.ui.changeMenu(undefined, $wrmViewJobs.ui.viewMyNeighberhoodJob);
			} else {// 각 메뉴별 열기
				$workRoad.ui.defaultMenuIndex = menuIndex;
				$workRoad.ui.changeMenu();
			}
		} else {
			$workRoad.ui.changeMenu();
		}		
	});
	
	// 팝업창 위치 조정 및 배경 영역 조정을 위함
	$(window).scroll(function(){
		$workRoad.ui.scrollLeft = $(document).scrollLeft();
		$workRoad.ui.scrollTop = $(document).scrollTop();
	});
	
	$(window).resize( function() {
		$workRoad.ui.resizeLayer();
	});

	$workRoad.const = {
		MenuWidth : 220,			// 좌측 메뉴의 너비 
		MenuBarWidth : 80,			// 좌측 메뉴바의 너비
		//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
		M3_SubMenu1Width : 280+198,	// 좌측 메뉴 (3번째) 서브메뉴의 너비 
		//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END
		M3_SubMenu2Width : 280,		// 좌측 메뉴 (3번째) 서브메뉴 3레벨의 너비 / ※ 3레벨 메뉴 확장시 560으로 변경됨
		M4_SubMenuBarWidth : 60,	// 좌측 메뉴(4번째) 서브메뉴바의 너비 
		ToolBarHeight : 34,			// 상단 툴바의 높이
		InteractiveBarHeight : 35,	// 상단 인터렉티브바의 높이
		ContentsX : 0,				// 컨텐츠영역 좌표 원점 X
		ContentsY : 105,			// 컨텐츠영역 좌표 원점 Y (105 : 헤더의 높이 / toolbar의 top)
		MapX : 0,					// 지도영역 좌표 원점 X
		MapY : 105 + 34 + 35,		// 지도영역 좌표 원점 Y
	},
	
	$workRoad.ui = {
		loadByPage : true,					// 중메뉴 페이지별로 전체 로드할지 여부 (false: 1회 전체 로드후에 중메뉴별로 필요한 것만 로드)
		isDevTest : false,					// 청사 개발서버 테스트 버전인지 여부	- 2018.12.06	ywKim	신규
		mainPopupEnabled : false,			// 메인 팝업 화면 활성화 여부
		defaultMenuIndex : 0,				// 초기 화면 (0: 오늘의 구인현황 ~ 3: 일자리 통계분석)

		tutoCurrentPage :  0,               // 튜토리얼: 현재 페이지
		tutoLastPage    : 46,               // 튜토리얼: 최종 페이지
		tutoPointIdx    :  0,

		// 메인 프레임의 크기
		//   - 레이어, 팝업창 띄울때 위치의 기준으로 참고한다.
		//   - border 포함된 크기임.
		//   - 레이어 위치 샘플 : 지도상의 좌상단(0, 0)에 띄우고자 하는 경우 좌표는
		//                  (menuBarWidth, toolBarHeight + interactiveBarHeight)
		coordX : 0,							// 컨텐츠영역 내부 좌표 원점 X : menuBarWidth  (variable)
		coordY : 70,						// 컨텐츠영역 내부 좌표 원점 Y : toolBarHeight + interactiveBarHeight
		
		// 화면에서 스크롤 위치
		//   - 팝업창 위치 조정 및 배경 영역 조정을 위함
		//   - 스크롤 이벤트 발생시 업데이트된다.
		scrollLeft : 0,					
		scrollTop : 0,				
		
		prevIndex : null,					// 이전에 선택됐던 메뉴 인덱스  : 메뉴  변경시 리셋을 위함
		currentIndex : null,				// 현재 메뉴 인덱스
		isSetUIEventArr : 
			[false, false, false, false],	// 메뉴별로 처음 이벤트 바인딩을 처리했는지 여부
//		isSetUIEvent : false,				// 메뉴별로 처음 이벤트 바인딩을 처리했는지 여부 / 메뉴가 변경될때마다
		isSetCallbackArr : [],
		numberOfContentToLoad : 0,			// 로그해야 할 컨텐트(레이어,팝업,메뉴 등) 갯수 : 로드 완료 체크를 위함
		changeMenuFinished : false,			// changeMenu() 함수 처리가 모두 완료됐는지 여부
//		mapLoaded : 
//			[false, false, false, false],	// 맵을 로드했는지
		
		// 내위치 정보 : 최초 일자리 맵 서비스 들어올때 한번만 설정한다. / 메뉴 클릭시 여러번 호출하는 경우 취득이 안되는 경우가 종종 발생한다.
		mySidoCd : '25',					// 내위치 시도 코드 : 11:서울특별시, 21:부산광역시, 25:대전광역시
		mySggCd : '030',					// 내위치 시군구 코드: 030: 대전시 서구, 070: 부산시 남구
		myEmDongCd : '',					// 내위치 읍면동 코드
		mySidoNm : '대전광역시',	 		// 내위치 시도 이름
		mySggNm : '서구',					// 내위치 시군구 이름
		myEmDongNm : '',					// 내위치 읍면동 이름 
		
		scrollOptions : {},					// 스크롤 레이어에 대한 옵션 모음 (각 레이어의 $(Element)가 Key)
		
		getMyPositionCallback : null,		// getMyPosition() 함수에 대한 콜백함수 (비동기처리라 설정후에 마지막에 사용하기 위함)
		
		selectedLayer : null,				// 현재 선택된 레이어의 selector
		
		consoleLogEnabled : false,			// 콘솔 로그를 기록할지 여부 / 디버그 용도로 로컬에서만 true로 사용
		consoleLogSeq : 1,
		tmpFncList1 : [],					// M1.사용된 함수 목록: 임시 - 2019.01.10	ywKim	추가
		tmpFncList2 : [],					// M2.사용된 함수 목록: 임시 - 2019.01.10	ywKim	추가
		tmpFncList3 : [],					// M3.사용된 함수 목록: 임시 - 2019.01.10	ywKim	추가
		tmpFncList4 : [],					// M4.사용된 함수 목록: 임시 - 2019.01.10	ywKim	추가


		//하루동안 안 보기  
		closeWin : function (cookieName, value, expiredays) {
			if($("#workRoadMain").find("input[name='close']").is(":checked")) {
				$workRoad.ui.setCookie(cookieName, value, expiredays);
			}
			
			// [오늘의 구인현황] 메뉴로 이동
			$workRoadMain.ui.hide();			
			if ($workRoad.ui.mainPopupEnabled) {
				$workRoadLeftMenu.ui.showNavSidebar();
			}			
			$tsMain.ui.ready();
		}, 		
		setCookie : function(cookieName, value, expiredays) {		
		    var expireDt = new Date();   
		    expireDt.setDate(expireDt.getDate() + expiredays);   
		    document.cookie = cookieName + "=" + value + "; path=/; expires=" + expireDt.toString() + ";" ;		
		}, 		
		getCookie : function (cookieName) {		 
			var cName, cValue="", val;
			if(document.cookie != null){
				val = document.cookie.split(';');
				for(var i = 0; i < val.length; i++){
					cName = val[i].substr(0,val[i].indexOf("="));
					cValue = val[i].substr(val[i].indexOf("=") + 1);
					if(cookieName == cName) break;						
				}
			}
			return cValue;
		 }, 
		 delCookie : function (cookieName) {
			var expireDt = new Date();   
		    expireDt.setDate(expireDt.getDate() - 1);   
		    document.cookie = cookieName + "=" + escape("Y") + "; path=/; expires=" + expireDt.toString() + ";" ;
		 },
			
		/**
		 * @name         : log 
		 * @description  : 콘솔에 로그 기록
		 * @date         : 2019.01.14
		 * @author	     : ywKim
		 * @history 	 :
		 * 	2019.01.14	ywKim	반영: M1. 맵관련 js 중 사용된 함수의 시작시점
		 * @param	pMessage	: 로그 메세지 
		 */
		log : function(pMessage) {
			if ($workRoad.ui.consoleLogEnabled) {
				console.log(">>[" + $workRoad.ui.consoleLogSeq + "] " + pMessage);
				$workRoad.ui.consoleLogSeq++;
			}
		},
		/**
		 * @name         : addFnc01List 
		 * @description  : 사용된 함수(M1.오늘의 구인현황) 수집
		 * @date         : 2019.01.10
		 * @author	     : ywKim
		 * @history 	 :
		 * 	2019.01.11	ywKim	수집 기능 추가
		 * 	2019.01.14	ywKim	1차 수집 완료
		 * 						사용된 함수 수집 제외
		 * 						수집후 알람 발생
		 * @param	pFncName	: 함수명 (FullName) 
		 */
		addFnc01List : function(pFncName) {
			if ($workRoad.ui.tmpFncList1.indexOf(pFncName) < 0) {
				$workRoad.ui.tmpFncList1.push(pFncName);
			}
			
			if ($workRoad.ui.consoleLogEnabled) {
				console.log(">>Used>> " + $workRoad.ui.tmpFncList1);
				alert($workRoad.ui.tmpFncList1 + " 김영웅C에게 알려주세요.");
			}
		},		
		/**
		 * @name         : addFncList 
		 * @description  : 사용된 함수(M2.일자리 보기) 수집 / 경고창 팝업
		 * @date         : 2019.01.10
		 * @author	     : ywKim
		 * @history 	 :
		 * 	2019.01.10	ywKim	수집 기능 추가
		 * 	2019.01.11	ywKim	1차 수집 완료
		 * 						사용된 함수 수집 제외
		 * 						수집후 알람 발생
		 * @param	pFncName	: 함수명 (FullName) 
		 */
		addFnc02List : function(pFncName) {
			if ($workRoad.ui.tmpFncList2.indexOf(pFncName) < 0) {
				$workRoad.ui.tmpFncList2.push(pFncName);
			}
			
			if ($workRoad.ui.consoleLogEnabled) {
				console.log(">>Used>> " + $workRoad.ui.tmpFncList2);
				alert($workRoad.ui.tmpFncList2 + " 김영웅C에게 알려주세요.");
			}
		},
		/**
		 * @name         : addFnc01List 
		 * @description  : 사용된 함수(M2.구인 현황분석) 수집
		 * @date         : 2019.01.10
		 * @author	     : ywKim
		 * @history 	 :
		 * 	2019.01.14	ywKim	수집 기능 추가
		 * 	2019.01.14	ywKim	1차 수집 완료
		 * 						사용된 함수 수집 제외
		 * 						수집후 알람 발생
		 * @param	pFncName	: 함수명 (FullName) 
		 */
		addFnc03List : function(pFncName) {
			if ($workRoad.ui.tmpFncList3.indexOf(pFncName) < 0) {
				$workRoad.ui.tmpFncList3.push(pFncName);
			}
			
			if ($workRoad.ui.consoleLogEnabled) {
				console.log(">>Used>> " + $workRoad.ui.tmpFncList3);
				alert($workRoad.ui.tmpFncList3 + " 김영웅C에게 알려주세요.");
			}
		},		
		/**
		 * @name         : addFnc01List 
		 * @description  : 사용된 함수(M4.일자리 통계분석) 수집
		 * @date         : 2019.01.10
		 * @author	     : ywKim
		 * @history 	 :
		 * 	2019.01.14	ywKim	수집 기능 추가
		 * @param	pFncName	: 함수명 (FullName) 
		 */
		addFnc04List : function(pFncName) {
			if ($workRoad.ui.tmpFncList4.indexOf(pFncName) < 0) {
				$workRoad.ui.tmpFncList4.push(pFncName);
			}

			if ($workRoad.ui.consoleLogEnabled) {
				console.log(">>Used>> " + $workRoad.ui.tmpFncList4);
				alert($workRoad.ui.tmpFncList4 + " 김영웅C에게 알려주세요.");
			}
		},		
		/**
		 * @name         : 콜백함수 설정 플래그 설정 
		 * @description  : 콜백함수를 설정했음을 확인하는 플래그를 설정한다.
		 * 					이때 이미 플래그를 설정했다면 true를 반환한다.
		 * 					※ 기존 메뉴의 로직은 콜백함수가 한번 호출되게 돼 있지만
		 *					   일자리 맵 서비스 프레임에서는 콜백함수가 여러번 호출 될 수 있기 때문에 이 함수가 필요하다.
		 * @date         : 2018.09.07
		 * @author	     : ywKim
		 * @history 	 :
		 * @param	pSender	: 콜백함수 고유 아이디 (객체일수 있음) 
		 */
		isSetCallback : function (pSender) {
			if ($.inArray(pSender, $workRoad.ui.isSetCallbackArr) < 0) {
				$workRoad.ui.isSetCallbackArr.push(pSender);
				return false;
			} else {
				return true;
			}
		},
		/**
		 * @name         : 
		 * @description  : 
		 * @date         : 2018.09.07
		 * @author	     : ywKim
		 * @history 	 :
		 * @param	pIndex	: 메뉴 인덱스
		 * 						- undefined : ready() 에서 최초 호출되는 경우
		 * 						- 0: 오늘의 구인 현황
		 * 						- 1: 일자리 보기
		 * 						- 2: 구인 통계 주제도
		 * 						- 3: 일자리 통계 분석 
		 */
		changeMenu : function (pIndex, pCallback) {
//			$workRoad.ui.isSetUIEvent = $workRoad.ui.isSetUIEventArr[pIndex];
			
			if ($workRoad.ui.prevIndex != pIndex) {				
				$workRoad.ui.init();
			}
			
			$workRoad.ui.numberOfContentToLoad = 0;
			
			// 일자리 맵 서비스 처음 로드됐을 경우 (오늘의 구인 현황 제외)
			if (typeof pIndex == 'undefined') {
				pIndex = $workRoad.ui.defaultMenuIndex;
				
				if ($workRoad.ui.mainPopupEnabled) {// M1.오늘의 구인현황 처음 로드시 메뉴바 표시 - 2019.01.09		ywKim	변경
//					if ($workRoad.ui.defaultMenuIndex == 0) {
					$workRoad.ui.setCoordX();
				} else {
					$workRoad.ui.setCoordX(pIndex);

					$workRoad.ui.numberOfContentToLoad++;
					$workRoadLeftMenu.ui.showNavSidebar(function() {
						$workRoad.ui.numberOfContentToLoad--;
					});
				}
			} else {
				$workRoad.ui.setCoordX(pIndex);
			}
			
			$workRoad.ui.currentIndex = pIndex;
			$workRoad.ui.logForChangeMenu(pIndex);
			
			if ($workRoad.ui.loadByPage) {
				// M1.오늘의 구인현황 처음 로드시 메뉴바 표시 - 2019.01.09		ywKim	변경
				$("#wrmMenuSwitch").addClass("on");
//				if (pIndex != 0) {
//					$("#wrmMenuSwitch").addClass("on");
//				}
				$(".nav-list li").eq(pIndex).find("a").addClass("on");
			}
			
			// 초기화
			switch (pIndex) {
			case 0: // 중메뉴: 오늘의 구인현황
				if ($workRoad.ui.prevIndex == pIndex) {
					$wrmTodayStatus.ui.showMainLayer();
				} else { 
					$wrmTodayStatus.ui.init(); 
				} 
				break;
			case 1: // 중메뉴: 일자리 보기
				if ($workRoad.ui.prevIndex == pIndex) {
					$wrmViewJobs.ui.clear();
				} else {
					$wrmViewJobs.ui.init(); 
				} 
				break;
			case 2: // 중메뉴: 구인 현황분석
				if ($workRoad.ui.prevIndex == pIndex) { 
					$wrmStatusAnls.ui.showSubMenu(); 
				} else { 
					$wrmStatusAnls.ui.init(); 
				}
				break;
			case 3: // 중메뉴: 일자리 통계분석
				if ($workRoad.ui.prevIndex == pIndex) { 
					$wrmStatsAnls.ui.showSubMenu(); 
				} else { 
					$wrmStatsAnls.ui.init(); 
				}
				break;
			default: return;
			}
			
			// 타이머 실행으로 jsp 문서가 모두 로드되는 시점을 찾는다.
			var timer = setInterval(function() {
				// jsp 문서가 모두 로드되는 시점 
				if ($workRoad.ui.numberOfContentToLoad <= 0) {
					clearInterval(timer);
					$workRoad.ui.ChangeMenuCallback(pIndex);
					$workRoad.event.reSetUIEvent();
					$workRoadLeftMenu.ui.isClickMyNeighborhoodJobBtn = false;
					
					if (typeof pCallback == 'function') {
						pCallback();
					}
					
					$workRoad.ui.changeMenuFinished = true;
				}
			}, 200);
		},
		/*
		 * @name         : setM3_SubMenu2Width
		 * @description  : 구인현황 분석 3Depth 메뉴 영역의 너비 변수 설정
		 * @date         : 2019.01.09
		 * @author	     : ywKim
		 * @history 	 :
		 * @param	pIsDblColumn	: 너비 확장 여부
		 */
		setM3_SubMenu2Width: function(pIsDblColumn) {
			if (pIsDblColumn != undefined && pIsDblColumn) {
				$workRoad.const.M3_SubMenu2Width = 560;
			} else {
				$workRoad.const.M3_SubMenu2Width = 280;
			}
		},
		/** 레이어 영역의 기준 좌표 설정
		 */
		setCoordX : function (pIndex) {
			if (pIndex == undefined) {
				$workRoad.ui.coordX = $workRoad.const.MenuBarWidth;		// 오늘의 구인현황에 메뉴 바  항상 표시 - 2019.01.09	ywKim	변경
//				$workRoad.ui.coordX = 0;
			} else {
				switch (pIndex) {
				case 3: $workRoad.ui.coordX = $workRoad.const.MenuBarWidth + $workRoad.const.M4_SubMenuBarWidth; break;
				case 2:// 구인현황 분석 3Depth 메뉴까지 활성화된 상태
					$workRoad.ui.coordX = $workRoad.const.MenuBarWidth + $workRoad.const.M3_SubMenu1Width + $workRoad.const.M3_SubMenu2Width; 
					break;
				case 12: // 구인현황 분석 2Depth 메뉴까지 활성화된 상태
					$workRoad.ui.coordX = $workRoad.const.MenuBarWidth + $workRoad.const.M3_SubMenu1Width; 
					break;
				case 1: 
				case 0:
					$workRoad.ui.coordX = $workRoad.const.MenuBarWidth; break;
				default: // 메뉴바를 닫은 상태
					$workRoad.ui.coordX = 0; 
					break;
				}
			}
		},
		
		ChangeMenuCallback: function(pIndex) {
			
			if ($workRoad.ui.prevIndex != pIndex) {
				// ready() 함수 호출
				switch (pIndex) {
				case 0: if (typeof $wrmTodayStatus.ui.ready != 'undefined') { $wrmTodayStatus.ui.ready($workRoad.ui.mainPopupEnabled); } break;
				case 1: if (typeof $wrmViewJobs.ui.ready != 'undefined') { $wrmViewJobs.ui.ready(); } break;
				case 2: if (typeof $wrmStatusAnls.ui.ready != 'undefined') { $wrmStatusAnls.ui.ready(); } break;
				case 3: if (typeof $wrmStatsAnls.ui.ready != 'undefined') { $wrmStatsAnls.ui.ready(); } break;
				default: return;
				}
			}
			
			// event 바인딩
			switch (pIndex) {
			case 0:// 중메뉴: 오늘의 구인현황
				if ($workRoad.ui.isSetUIEventArr[pIndex] == false) { 
					$wrmTodayStatus.event.setUIEvent(); 
				} 
				break;
			case 1:// 중메뉴: 일자리 보기
				if ($workRoad.ui.isSetUIEventArr[pIndex] == false) { 
					$wrmViewJobs.event.setUIEvent(); 
				}
				break;
			case 2:// 중메뉴: 구인 현황분석
				if ($workRoad.ui.isSetUIEventArr[pIndex] == false) { 
					$wrmStatusAnls.event.setUIEvent();
				}
				if ($workRoad.ui.prevIndex != pIndex) {
					$wrmStatusAnls.ui.showSubMenu();
				}
				break;
			case 3:// 중메뉴: 일자리 통계 분석
				if ($workRoad.ui.isSetUIEventArr[pIndex] == false) { 
					$wrmStatsAnls.event.setUIEvent(); 
				} 
				if ($workRoad.ui.prevIndex != pIndex) {
					$wrmStatsAnls.ui.showSubMenu();
				}
				break;
			default:
				return;
			}
			
//			if (pIndex == 0) {
//				$('#wrmTitle').addClass('on');
//			} else {
//				$('#wrmTitle').removeClass('on');
//			}
			
			// 이벤트 바인딩 여부 Flag 설정
			$workRoad.ui.isSetUIEventArr[pIndex] = true;
						
			// 스크롤 기능 추가 ---------------------------
			// 서브메뉴
			$('.wrmScrollable').each(function () {
				$(this).mCustomScrollbar();
			});
			// $('.scrollBox').each(function () {
			// 	$(this).mCustomScrollbar();
			// });
			// $('.scrolls').each(function () {
			// 	$(this).mCustomScrollbar();
			// });
			// End of 스크롤 기능 추가 ---------------------------
			
			$workRoad.ui.prevIndex = pIndex;
		},
		
		logForChangeMenu: function(pIndex) {
			var msg = 'Menu Changed.';
			
			if (typeof $workRoad.ui.prevIndex !== 'undefined' && $workRoad.ui.prevIndex !== null) {
				msg += '(' + ($workRoad.ui.prevIndex + 1) + ' -> ';
				if (typeof pIndex) {
					msg += (pIndex + 1) + ')';
				} else {
					msg += ')'; 
				}
			} else {
				if (typeof pIndex !== 'undefined') {
					msg += '( -> ' + (pIndex + 1) + ')';
				}
			}
				
			console.log(msg);
		},
		
		/**
		 * @name         : 
		 * @description  : 
		 * @date         : 2018.09.07
		 * @author	     : ywKim
		 * @history 	 : 
		 */
		init : function () {
			
			switch ($workRoad.ui.prevIndex) {
			case 0: break;
			case 1: break;
			case 2: $wrmStatusAnls.ui.hideSubMenu(); break;
			case 3: $wrmStatsAnls.ui.hideSubMenu(); break;
			}
			
			$workRoad.ui.removeMap();
			$workRoad.ui.removeDataBoard();
			$workRoad.ui.removeContent();
			$workRoad.ui.removeSubMenu();
		},
		/** 컨텐츠 다운로드후 문서에 추가 
		 */
		appendContent : function(pUrl, pCallback) {
			$workRoad.ui.numberOfContentToLoad++;
			
			var $div = $('<div></div>');
			$div.load(pUrl, null, function() {
				var $layer = $(this).children();
				if ($layer != null) {

					
					$('#divContents').append($layer);
				}
				
				if (typeof pCallback !== 'undefined') {
					pCallback();
				}
				
				$workRoad.ui.numberOfContentToLoad--;
			});
		},
		/** 문서에서 컨텐츠 삭제 
		 */
		removeContent : function() {
			// 컨텐츠의 스크롤 옵션 제거
			$('#divContents').children('div').each(function() {
				var id = $(this).attr('id');
				var $div = $('#' + id);
				
				if (typeof $div != 'undefined') {
					$workRoad.ui.removeScrollOptions($div);
				}
			});

			$('#divContents').html('');
		},
//		removeContent : function(pSelector) {
//			
//			// style, script 삭제
//			while ($(pSelector).prev().length > 0) {
//				if ($(pSelector).prev()[0].tagName == 'SCRIPT' ||
//					$(pSelector).prev()[0].tagName == 'STYLE') {
//					$(pSelector).prev().remove();
//				} else {
//					break;
//				}
//			}
//				
//			$(pSelector).remove();
//		},
		
		appendSubmenu : function(pUrl, pCallback) {
			$workRoad.ui.numberOfContentToLoad++;
			
			// pUrl의 HTML파일을 임시로 div에 담아두고
			// 그 div의 children을 중메뉴에 append한다.
			var $div = $('<div></div>');
			$div.load(pUrl, null, function() {
				
				var $subMenu = $(this).children();
				if ($subMenu != null) {
					
					$('#divSubMenu').append($subMenu);
					
					// 슬라이드 처리
					//   중메뉴 바의 너비는 this.menuBarWidth
					//   중메뉴 바의 z-index = 1001
					//   서브메뉴의  z-index = 1000
					var left = $subMenu.css("left").replace("px", "");
					if (isNaN(left)) { 
						$subMenu.css("left", "-305px")
						left = -305; 
					}
					
					var toLeft = $workRoad.const.MenuBarWidth - left;
					$subMenu.stop().animate({"left": "+=" + toLeft + "px"}, "fast");
				}
				
				// 콜백함수 처리
				if (typeof pCallback !== 'undefined') {
					pCallback();
				}
				
				$workRoad.ui.numberOfContentToLoad--;
			});
		},
		
		removeSubMenu : function() {
			$('#divSubMenu').html('');
		},
//		removeSubmenu : function(pSelector) {
//
//			// style, script 삭제
//			while ($(pSelector).prev().length > 0) {
//				if ($(pSelector).prev()[0].tagName == 'SCRIPT' ||
//					$(pSelector).prev()[0].tagName == 'STYLE') {
//					$(pSelector).prev().remove();
//				} else {
//					break;
//				}
//			}
//
//			$(pSelector).remove();
//		},
		
		appendMap : function(pUrl, pCallback) {
			$workRoad.ui.numberOfContentToLoad++;
			
			var $div = $("<div></div>");
			$div.load(pUrl, null, function() {
				var $layer = $(this).children();
				if ($layer != null) {

					$("#wrmMapArea").append($layer);
					
//					$("#wrmMapArea").removeAttr("class");
//					$("#wrmMapArea").addClass("rela");
					$("#wrmMapArea").removeClass("tsMap");
					$("#wrmMapArea").removeClass("vjMap");
					$("#wrmMapArea").removeClass("saMap");
					$("#wrmMapArea").removeClass("ssaMap");
					
					var id = pUrl.substr(pUrl.lastIndexOf('/') + 1);
					$("#wrmMapArea").addClass(id);
				}
				
				if (typeof pCallback == "function") {
					pCallback();
				}
				
				$workRoad.ui.numberOfContentToLoad--;
			});
		},

		removeMap : function() {
			
			$('#wrmMapArea').html('');
		},
		
		appendDataBoard : function(pUrl, pCallback) {
			$workRoad.ui.numberOfContentToLoad++;
			
			var $div = $('<div></div>');
			$div.load(pUrl, null, function() {
				var $layer = $(this).children();
				if ($layer != null) {

					
					$('#dataBoard').append($layer);
				}
				
				//투명도 설정 바
				if ($("#dataSlider").length > 0) {
					$("#dataSlider").slider({
				    	range: "min",
				        min: 5,
				        max: 10,
				        value: 10,
				        slide: function( event, ui ) {  //ui.value
				        	$(".dataSideBox, .workRoadDataBoard").css("opacity", ui.value*0.1);
					    }
				    });

					if ($(".dataSideBox, .workRoadDataBoard").length > 0) {
						$(".dataSideBox, .workRoadDataBoard").css("opacity", $("#dataSlider").slider( "value" ) );
					}
				}			    
				
				$('.dataBoardDiv').show();
				
				if (typeof pCallback !== 'undefined') {
					pCallback();
				}
				
				$workRoad.ui.numberOfContentToLoad--;
			});
		},

		removeDataBoard : function() {
			
			$('#dataBoard').html('');
		},	
		
		/**
		 * @name         : 팝업창 띄우기
		 * @description  :  
		 * ※ 팝업창이란?
		 *    - 화면의 팝업창을 제외한 영역은 투명 검정으로 음영처리
		 *    	팝업창을 제외한 타 영역은 컨트롤 할 수 없다.(이벤트 발생시킬 수 없다.)
		 * @date         : 2018.09.11
		 * @author	     : ywKim
		 * @history 	 :
		 * @params 	pSelector : 팝업창을 감싸는 DIV 엘리먼트
		 * 	1. (Selector)  : 화면 상하 가운데 배치
		 * 					 팝업창의 width, height는 jsp 문서에 정의돼 있어야 한다. 그렇지 않으면 정확한 위치에 배치되지 않는다.
		 *  2. (Selector, Object) : Object 는 다음과 같은 포맷을 가진다.
		 *  						  - {'left': '0px', 'top': '0px', width': '100px', 'height': '100px'}
		 *  						  - width, height : 크기 / 없으면 jsp 파일에 정의된 값을 사용한다.
		 *  						  - px 는 없어도 된다.
		 *  						  - vertical-align : 상하 위치 [top,middle,bottom]
		 *  						  - horizontal-align : 좌우 위치 [left,center,right]
		 *  						  - align : 상하좌우 위치 [top-left, top-center, top-right, middle-left, middle-center ... bottom-right]
		 */
		showDialog : function(pSelector, pParams) {

			$(pSelector).css({'position': 'absolute',
							  'z-index': 10000,
							  'background': 'rgba(0,0,0,.5)'
			});
			$(pSelector).show();
			
			if( pSelector != '#vjSelectAll' ){
				// 팝업창 배경 크기 조정
				$(pSelector).css({width: "100%"});	// 웹브라우저의 사이즈가 변경된 경우 대응
				$(pSelector).css({height: "100%"});
			}
//			$(pSelector).width(document.body.scrollWidth);
//			$(pSelector).height(document.body.scrollHeight);
			
			var $div = $(pSelector).find('div').eq(0);
			var left, top, width, height;
			
			if (typeof pParams === 'object') {
				width = $workRoad.util.paramToNumber(pParams.width, $div.width());
				height = $workRoad.util.paramToNumber(pParams.height, $div.height());

				if (typeof pParams.align !== 'undefined') {
					var coord = $workRoad.util.getPopupCoord(pParams.align, width, height);
					left = coord['left'];
					top = coord['top'];
				} else {
					if (typeof pParams.left !== 'undefined') {
						left = $workRoad.util.getPopupCoordX('left', width);
						left += $workRoad.util.paramToNumber(pParams.left);
					} else {
						left = $workRoad.util.getPopupCoordX('center', width);
					}
					
					if (typeof pParams.top !== 'undefined') {
						top = $workRoad.util.getPopupCoordY('top', height);
						top += $workRoad.util.paramToNumber(pParams.top);
					} else {
						top = $workRoad.util.getPopupCoordY('middle', height);
					}
				}
			} else {
				width = $div.width();
				height = $div.height();
//				width = $workRoad.util.paramToNumber(pParam1, $div.width());
//				height = $workRoad.util.paramToNumber(pParam2, $div.height());
				left = $workRoad.util.getPopupCoordX('center', width);
				top = $workRoad.util.getPopupCoordY('middle', height);
			}

			top -= $workRoad.const.ToolBarHeight - $workRoad.const.InteractiveBarHeight;
			if(top<75) top=75;
			
			// 위치 조정
			$div.css({'top': top + 'px', 
					  'left': left + 'px', 
					  //'margin': 'auto',
					   'margin-left': '0px'
			});
			$div.addClass("dialog");

			// 닫기 버튼에 이벤트 추가
			$(pSelector).find('.wrmClose').each(function() {
				$(this).click(function() {
					$workRoad.ui.hideDialog(pSelector);
				});
			});

			// 드래그 기능 추가
			if ($div.hasClass("wrmDraggable") === true) {
				$workRoad.util.dragElement($div[0]);
			}
		},		
		hideDialog : function(pSelector) {
			$(pSelector).hide();
		},
		
		/**
		 * @name         : 레이어 띄우기
		 * @description  :  
		 * ※ 레이어란
		 *    - 음영처리 없으며, 레이어를 제외한 타 영역도 컨트롤 할 수 있다. 
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 :
		 * @params	pSelector	: 레이어 DIV 엘리먼트
		 * 	1. (Selector)  : 화면 상하 가운데 배치
		 * 					 팝업창의 width, height는 jsp 문서에 정의돼 있어야 한다. 그렇지 않으면 정확한 위치에 배치되지 않는다.
		 *  2. (Selector, Object) : Object 는 다음과 같은 포맷을 가진다.
		 *  						  - {'left': '0px', 'top': '0px', width': '100px', 'height': '100px'}
		 *  						  - width, height : 크기 / 없으면 jsp 파일에 정의된 값을 사용한다.
		 *  						  - px 는 없어도 된다.
		 *  						  - vertical-align : 상하 위치 [top,middle,bottom]
		 *  						  - horizontal-align : 좌우 위치 [left,center,right]
		 *  						  - align : 상하좌우 위치 [top-left, top-center, top-right, middle-left, middle-center ... bottom-right]
		 */
		showLayer : function(pSelector, pParams) {
			
			var $div = $(pSelector);
			var left, top, width, height;
			
			if (typeof pParams === 'object') {
				width = $workRoad.util.paramToNumber(pParams.width, $div.width());
				height = $workRoad.util.paramToNumber(pParams.height, $div.height());

				if (typeof pParams.align !== 'undefined') {
					var coord = $workRoad.util.getLayerCoord(pParams.align, width, height);
					left = coord['left'];
					top = coord['top'];
				} else {
					if (typeof pParams.left !== 'undefined') {
						left = $workRoad.util.getLayerCoordX('left', width);
						left += $workRoad.util.paramToNumber(pParams.left);
					} else {
						left = $workRoad.util.getLayerCoordX('left', width);
					}
					
					if (typeof pParams.top !== 'undefined') {
						top = $workRoad.util.getLayerCoordY('top', height);
						top += $workRoad.util.paramToNumber(pParams.top);
					} else {
						top = $workRoad.util.getLayerCoordY('top', height);
					}
				}
				
				// 스크롤 옵션 추가
				if (typeof pParams.scrollOptions != 'undefined') {
					$workRoad.ui.addScrollOptions(pParams.scrollOptions);
				}
			} else {
				width = $div.width();
				height = $div.height();
//				width = $workRoad.util.paramToNumber(pParam1, $div.width());
//				height = $workRoad.util.paramToNumber(pParam2, $div.height());
				left = $workRoad.util.getLayerCoordX('left', width);
				top = $workRoad.util.getLayerCoordY('top', height);
			}
			
			// 전체 화면이 리사이징될때 레이어 높이를 자동 조정할지 여부 설정
			if ($div.data('autoResize') == undefined) {
				$div.data('autoResize', true);
			}
			
			//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START
			if(gv_type == "full") {
				if(gv_url == "statsAnls") {
					left = 60;
				}
				else {
					left = 0;
				}
			}
			//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. END
			
			// 위치 조정
			$div.css({'top': top + 'px', 
					  'left': left + 'px', 
					  'margin-left': '0px',
					  'position': 'absolute',
					  'z-index': 15,//1100,
					  /*'background': 'rgba(0,0,0,.5)',*/	// 임시					  
			});
			$div.addClass("layer");
			$div.show();
			$workRoad.ui.resizeLayer($div.attr('id'));

			// 레이어 선택시 상호간의 z-index 변경을 위함
			$workRoad.event.set('click', pSelector, function() {
				$workRoad.ui.selectLayer(pSelector);	
			});
			$workRoad.ui.selectLayer(pSelector);
			
			// 닫기 버튼에 이벤트 추가
			$(pSelector).find('.wrmClose').each(function() {
				$(this).click(function() {
					$workRoad.ui.hideDialog(pSelector);
				});
			});

			// 드래그 기능 추가
			if ($div.hasClass("wrmDraggable") === true) {
				$workRoad.util.dragElement($div[0]);
			}
		},	
		/** 레이어 숨기기
		 */
		hideLayer : function(pSelector) {
			$(pSelector).hide();
			$workRoad.ui.removeScrollOptions($(pSelector));
		},
		/** 레이어 선택 (click)
		 *  이전 선택된 레이어와 상호간의 z-index를 교체해야 한다. 
		 */
		selectLayer : function(pSelector) {
			if ($workRoad.ui.selectedLayer == pSelector ||
				$(pSelector).css('display') == 'none') {
				return;
			}
			
			// 임시로 선택 이벤트가 비활성화된 경우 Skip 
			var cnt = $workRoad.ui.deactivatedCountForLayerSelectionEvent(pSelector);
			if (cnt > 0) {
				cnt--;				
				if (cnt <= 0) {
					$workRoad.ui.activateLayerSelectionEvent(pSelector);
				} else {
					$workRoad.ui.deactivateLayerSelectionEvent(pSelector, cnt);
				}
				return;
			}
			
			
			
			console.log('----------------------');
			console.log(pSelector);
			
			var from = -1;
			var to = -1;
			var tmp = -1;
			
			if ($workRoad.ui.selectedLayer != null) {
				from = parseInt($($workRoad.ui.selectedLayer).css('z-index'));
				console.log('from: ' + from);
			}
			
			to = parseInt($(pSelector).css('z-index'));
			console.log('to: ' + to);
			
			tmp = from;
			from = to;
			to = from;
			
			if (to == from) {
				to++;				
			}
			
			$($workRoad.ui.selectedLayer).css('z-index', from);
			$(pSelector).css('z-index', to);
			
			$workRoad.ui.selectedLayer = pSelector;
			console.log('to: ' + to);
			console.log('----------------------');
		},
		/** 레이어의 스크롤 옵션 추가
		 */
		addScrollOptions : function (pParams) {
			// key 
			// target 
			// targetMargin			
			if ($workRoad.ui.scrollOptions.hasOwnProperty(pParams.key) == false) {
				$workRoad.ui.scrollOptions[pParams.key] = pParams;
			}
		},
		/** 레이어의 스크롤 옵션 제거
		 */
		removeScrollOptions : function (pKey) {
			delete $workRoad.ui.scrollOptions[pKey];
		},		
		/** 레이어의 높이를 조정한다.
		 *  전체화면의 높이에 따라 조정이 필요한 레이어를 대상으로 한다.
		 *  
		 *  @params pId : 특정 레이어의 div Element id (해당 레이어만 조정한다.)
		 *  			  undefined - 컨텐츠 내부의 모든 레이어에 대해 조정한다.
		 */
		resizeLayer : function(pId) {
			
			if (pId == "wrmSelection") return;	// 제외대상 추가 - 2019.01.11	ywKIm	추가: IE에서 동작 안됨
			
			if (pId != undefined) {
				$workRoad.ui.resizeFixedHeightLayer(pId);
				$workRoad.ui.resizeAutoHeightLayer(pId);
			} else {
				// 높이 조정 (고정높이 레이어)
				$("#divContents").children("div").each(function() {
					var id = $(this).attr("id");
					$workRoad.ui.resizeFixedHeightLayer(id);
				});
				
				// 높이조정 및 스크롤 적용 (변동높이 레이어)
				for (var key in $workRoad.ui.scrollOptions) {
					var id = $workRoad.ui.scrollOptions[key].key.attr("id");
					$workRoad.ui.resizeAutoHeightLayer(id);
				}
			}
		},
		/** 높이 조정 (고정높이 레이어)
		 */
		resizeFixedHeightLayer: function(pId) {
			var clientHeight = window.innerHeight - $workRoad.const.MapY; // 현재 화면의 지도 영역의 높이
			var $div = (pId != undefined && pId.indexOf("#") == 0) ? $(pId) : $("#" + pId);

			// 토글버튼으로 화면이 축소된 경우
			if ($div.find(".wrmToggleBtn").length > 0 && $div.find(".wrmToggleBtn").attr("data-show") == undefined) {
				return;
			}
			
			
			if (typeof $div != "undefined" && 
					$div.css("display") != "none" &&
					$div.data("autoResize") == true &&
					$workRoad.ui.scrollOptions.hasOwnProperty($div) == false) {
				
				var height = $div.height();
				var maxHeight = parseInt($div.css("max-height"));
				
				if (maxHeight >= clientHeight) {// 레이어가 전체화면의 높이를 벗어나는 경우
					height = clientHeight - 3;
				} else {
					height = maxHeight;
				}
				
				if (isNaN(height) == false) {
					$div.css({"height": height + "px"});
				}
			}
		},
		/** 높이조정 및 스크롤 적용 (변동높이 레이어)
		 */
		resizeAutoHeightLayer: function(pId) {
			var clientHeight = window.innerHeight - $workRoad.const.MapY; // 현재 화면의 지도 영역의 높이
			var key = (pId != undefined && pId.indexOf("#") == 0) ? $(pId) : $("#" + pId);
			
			if ($workRoad.ui.scrollOptions.hasOwnProperty(key)) {
				var obj = $workRoad.ui.scrollOptions[key];
				var keyObj = obj.key;
				var target = obj.target;
				var targetMargin = obj.targetMargin;
				
				if( obj.mCustom ){
					if( pId == 'vjJobInfoList' ){
						if( clientHeight < 762 ){
							$("#vjSelectAll>.popBox").css("height", (clientHeight-50) + "px");
							$("#vjSelectAllScrollBody").css("height", (clientHeight-110) + "px");
						} else {
							$("#vjSelectAll>.popBox").css("height", ($("#vjSelectAll>.popBox")+50) + "px");
							$("#vjSelectAllScrollBody").css("height", ($("#vjSelectAllScrollBody").height()+50) + "px");
						}
					}
					
					if( clientHeight < 650 ){
						$(".wrm-scroll-box").css("height", (clientHeight-50) + "px");
					} else {
						if( $(".wrm-scroll-box").height() < obj.maxHeight ){
							$(".wrm-scroll-box").css("height", ( $(".wrm-scroll-box").height()+60) + "px");
						}
					}
				} else {
					// 전체 높이를 자동으로 변경한후
					target.css("height", "");
					// 전체 높이를 구한다.
					var totalHeight = keyObj.height();
					
					// 클라이언트 영역의 높이와 비교
					var num = 100;
					if (totalHeight <= clientHeight) {
						num = parseInt(totalHeight);
					} else {
						num = clientHeight;
					}			
					num -= targetMargin;// 전체보더위아래(2) + 헤더높이(40) + 헤더아래보더(1) + 컨텐츠패딩위아래(30) + 2
					
					target.css("height", num + "px");
				}
			}
		},
		/**
		 * @name         : toggleLayer
		 * @description  : 일자리 통계분석 화면 토글
		 * 					- 일자리 통계분석 주요지표 레이어에서 토글(타이틀)버튼을 클릭했을때 레이어를 토글시킨다.
		 * @date         : 2018.11.20
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.11.20	ywKim	신규
		 * @param pShow	: 레이어를 무조건 show 할지여부
		 * 					- undefined 인 경우 toggle
		 */
		toggleLayer : function(pLayerIdSelector, pShow) {
			
			if (typeof pShow == "boolean") {
				if (pShow) {
					$workRoad.ui.showBody(pLayerIdSelector);
				} else {
					$workRoad.ui.hideBody(pLayerIdSelector);
				}
			} else {
				if ($(pLayerIdSelector + " .wrmToggleBtn").attr("data-show") != null) {
					$workRoad.ui.hideBody(pLayerIdSelector);
				} else {
					$workRoad.ui.showBody(pLayerIdSelector);
				}
			}
		},
		showBody : function(pLayerIdSelector) {
			$(pLayerIdSelector + " .wrmToggleBtn").attr("data-show", "");
			var width = $(pLayerIdSelector + " .wrmToggleBtn").attr("data-layer-width");
			var height = $(pLayerIdSelector + " .wrmToggleBtn").attr("data-layer-height");
			
			$(pLayerIdSelector).css({
				background: "#fff",
				width: width,
				height: height,/*"auto",*/
				border: "1px solid #213967"
			});
			$(pLayerIdSelector + " .topbar").show();
			$(pLayerIdSelector + " .cont-box").show();
			$workRoad.ui.resizeLayer(pLayerIdSelector);
		},
		hideBody : function(pLayerIdSelector) {
			$(pLayerIdSelector + " .wrmToggleBtn").removeAttr("data-show");
			$(pLayerIdSelector + " .wrmToggleBtn").attr("data-layer-width", $(pLayerIdSelector).css("width"));
			$(pLayerIdSelector + " .wrmToggleBtn").attr("data-layer-height", $(pLayerIdSelector).css("height"));
			
			$(pLayerIdSelector).css({
				background: "transparent",
				width: $(pLayerIdSelector + " .wrmToggleBtn").width() + 2,
				height: $(pLayerIdSelector + " .wrmToggleBtn").height() + 2,
				border: "0px",
			});
			$(pLayerIdSelector + " .topbar").hide();
			$(pLayerIdSelector + " .cont-box").hide();
		},			
		/**
		 * @name         : 로딩 이미지 보여주기
		 * @description  : 
		 * @date         : 2018.10.30
		 * @author	     : ywKim
		 * @history 	 : 
		 */
		showLoading : function () {
			$('#wrmLoading').show();
		},
		hideLoading : function () {
			$('#wrmLoading').hide();
		},
		/** 메뉴바에 스크롤 기능 설정하기
		 * 
		 */
		setScrollingOnTheMenuBar : function() {
			$('.nav-sidebar').mCustomScrollbar();
		},
		
		/**
		 * 시도 데이터 조회
		 */
		getSidoList: function(pBaseYear, pCallback) {
			
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/map/sidoAddressList.json",
				data: { base_year: pBaseYear},
				dataType: "json",
				success: function(res) {
					if (res.errCd == "0") {
						if (typeof pCallback === "function"){
														
							pCallback(res.result.sidoList);// [{sido_cd, sido_nm, x_coor, y_coor} ... ]
						}
					}
				},
				error: function(e) {
					alert('failed');
				}
			});
		},
		/*
		 * 시군구 데이터 조회
		 */
		getSggList: function(pBaseYear, pSidoCode, pCallback) {

			
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/map/sggAddressList.json",
				data: {
					sido_cd: pSidoCode,
					base_year: pBaseYear
				},
				dataType: "json",
				success: function(res) {

					if (res.errCd == "0") {
						if (typeof pCallback === "function"){
							pCallback(res.result.sggList);	// [{sgg_cd, sgg_nm, x_coor, y_coor} ... ]							
						}
					} else if(res.errCd=="-401"){
						accessTokenInfo(function() {
							$workRoad.ui.getSggList(pBaseYear, pSidoCode, pCallback);
						});
					}
				},
				error: function(e) {
					alert('failed');
				}
			});
		},
		/*
		 * 
		 */
		setSidoCombo : function (pSidoElement, pSidoList) {
			$(pSidoElement).empty();
			
			$.each(pSidoList, function(cnt, node) {
				$(pSidoElement).append($("<option/>",{
									text : node.sido_nm, 
									value : node.sido_cd,
//									selected : (pDefaultSido == node.sido_cd),
									"data-coor-x" : node.x_coor,
									"data-coor-y" : node.y_coor}));
			});
		},
		/*
		 * 
		 */
		setSggCombo : function (pSggElement, pSggList, pSidoItem, pIncludeAll) {
			$(pSggElement).empty();
			
			if (typeof pSidoItem == "object" && (pIncludeAll == undefined || pIncludeAll == true)) {
				$(pSggElement).append($("<option/>",{
										text : "전체", 
										value : "999",
										"data-coor-x" : pSidoItem.x_coor,
										"data-coor-y" : pSidoItem.y_coor, 
										"data-adm_cd" : pSidoItem.sido_cd}));  // 전체일 때 data-adm_cd 값 추가
			}

			$.each(pSggList, function(cnt, node) {
				$(pSggElement).append($("<option/>",{
									text : node.sgg_nm,
									value : node.sgg_cd,
//									selected : (pDefaultSgg == node.sgg_cd),
									"data-coor-x" : node.x_coor,
									"data-coor-y" : node.y_coor,
									"data-adm_cd" : pSidoItem.sido_cd + node.sgg_cd}));				
			});
		},
		/**
		 * @name         : getSidoList
		 * @description  : 지역선택 - 시도 선택시 시군구 목록 조회
		 * @date         : 2018.09.28
		 * @author	     : ywKim
		 * @history 	 :
		 * @param pSidoElement	- 시도 SELECT Element
		 * @param pSggElement	- 시군구 SELECT Element
		 * @param pDefaultSido	- 조회할 시도 코드
		 * @param pDefaultSgg	- 조회할 시군구 코드
		 * @param pBaseYear		- 조회할 데이터의 기본 년도
		 * @param pCallback		- 
		 */
//		getSidoList: function(pSidoElement, pSggElement, pDefaultSido, pDefaultSgg, pBaseYear, pCallback) {
//			$(pSidoElement + ',' + pSggElement).prop('disabled', true);
//			
//			$.ajax({
//				method: "POST",
//				async: true,
//				url: contextPath + "/ServiceAPI/map/sidoAddressList.json",
//				data: { base_year: pBaseYear},
//				dataType: "json",
//				success: function(res) {
//					$(pSidoElement).empty();
//
//					if (res.errCd == "0") {
//						$.each(res.result.sidoList, function(cnt, node) {
//							$(pSidoElement).append($("<option/>",{
//													text : node.sido_nm, 
//													value : node.sido_cd,
//													selected : (pDefaultSido == node.sido_cd),
//													"data-coor-x" : node.x_coor,
//													"data-coor-y" : node.y_coor}));
//
//							if (pDefaultSido == node.sido_cd) {
//								$workRoad.ui.getSggList(pSidoElement, pSggElement, pDefaultSgg, pBaseYear);
//							}							
//						});
//					}
//					
//					$(pSidoElement + ',' + pSggElement).prop('disabled', false);
//
//					if (typeof callback === "function"){
//						pCallback();
//					}
//				},
//				error: function(e) {
//					$(pSidoElement + ',' + pSggElement).prop('disabled', false);
//				}
//			});
//		},

		/**
		 * @name             : $houseAnalysisMap.leftmenu.getSggList
		 * @description      : 시군구리스트
		 * @date             : 2018.09.28
		 * @author           : ywKim
		 * @history          :
		 * @param pSggElement	- 시군구 SELECT Element
		 * @param pDefaultSgg	- 조회할 시군구 코드
		 * @param pBaseYear		- 조회할 데이터의 기본 년도
		 * @param pSidoElement	- 시도 SELECT Element
		 * @param pCallback		- 
		 */
//		getSggList: function(pSidoElement, pSggElement, pDefaultSgg, pBaseYear, pCallback) {
//			$(pSggElement).prop('disabled', true);
//			
//			var sidoCode = $(pSidoElement + " option:selected").val();
//			var coorX = $(pSidoElement + " option:selected").data("coor-x");
//			var coorY = $(pSidoElement + " option:selected").data("coor-y");
//
//			$.ajax({
//				method: "POST",
//				async: true,
//				url: contextPath + "/ServiceAPI/map/sggAddressList.json",
//				data: {
//					sido_cd: sidoCode,
//					base_year: pBaseYear
//				},
//				dataType: "json",
//				success: function(res) {
//					$(pSggElement).empty();
//
//					if (res.errCd == "0") {
//						$(pSggElement).append($("<option/>",{
//												text : "전체", 
//												value : "999",
//												"data-coor-x" : coorX,
//												"data-coor-y" : coorY, 
//												"data-adm_cd" : sidoCode}));  // 전체일 때 data-adm_cd 값 추가
//
//						$.each(res.result.sggList, function(cnt, node){
//							// 지자체 URL 추가 - 비자치구 코드 추가
//							$(pSggElement).append($("<option/>",{
//													text : node.sgg_nm,
//													value : node.sgg_cd,
//													selected : (pDefaultSgg == node.sgg_cd),
//													"data-coor-x" : node.x_coor,
//													"data-coor-y" : node.y_coor,
//													"data-adm_cd" : sidoCode + node.sgg_cd}));
//						});
//
//						// if("policy"==type || "current" == type){ //2017.05.29 [개발팀] 지역별 수요변화 비자치구추가
//						// 	if($psmCombine.ui.atdrcList[sido_cd]){
//						// 		$.each($psmCombine.ui.atdrcList[sido_cd],function(sidoCnt,sidoNode){
//						// 			var op,index,empty = true;
//						// 			$.each(this.sgg_list,function(cnt,node){
//						// 				op = $("#"+type+"-sgg-select option[value="+node+"]");
//						// 				if(op.length>0){
//						// 					empty = false;
//						// 					if(index==undefined){
//						// 						index = op.index();
//						// 					}else{
//						// 						index = Math.min(index,op.index());
//						// 					}
//						// 				}
//						// 			});
//						// 			if(!empty){
//						// 				//2017.05.29 [개발팀] 지자체 URL 추가 - 비자치구 코드 추가
//						// 				$("#"+type+"-sgg-select option:eq("+index+")").before($("<option/>",{text:sidoNode.sgg_nm,value:sidoNode.sgg_list.join(","),"data-coor-x":op.data("coor-x"),"data-coor-y":op.data("coor-y"), "data-adm_cd":sidoNode.adm_cd}));
//						// 			}
//						// 		});
//						// 	}
//						// }
//
//					} else if(res.errCd=="-401"){
//						accessTokenInfo(function() {
//							$workRoad.ui.getSggList(pSggElement, pSidoCode, pDefaultSgg, pBaseYear, pCoorX, pCoorY, pCallback);
//						});
//					}
//
//					$(pSggElement).prop("disabled", false);
//
//					if (typeof callback === "function"){
//						pCallback();
//					}
//				},
//				error: function(e) {
//					$(pSggElement).prop("disabled", false);
//				}
//			});
//		},
		
		/**
		 * @name         : 현재위치 구하기
		 * @description  : 
		 * @date         : 2018.10.30 
		 * @author	     : ywKim
		 * @history 	 :
		 */
		getMyPosition : function(){
			var processed = false;
			
			if (navigator.geolocation) {
				try {
					navigator.geolocation.getCurrentPosition(
							function (position) {
								processed = true;
								var utmkXY = new sop.LatLng(position.coords.latitude, position.coords.longitude);
								result = false;
								$workRoad.ui.reqGeocode(utmkXY.x, utmkXY.y);
							}, 
							function (error) {
								processed = true;
								result = false;
								$workRoad.ui.setRegionCd();
								console.log("브라우져가 기능을 제공하지 않습니다.");
							}
					);

					if (processed == false) {
						$workRoad.ui.goToMyPositionCallback();
					}
				} catch (e) {// 보안위험이 있는 경우 오류 발생함.
					$workRoad.ui.goToMyPositionCallback();
				}
			} else {
				result = false;
				$workRoad.ui.setRegionCd();
				console.log("브라우져가 기능을 제공하지 않습니다.");
			}
		},
		/**
		 * 
		 * @name         : reqGeocode
		 * @description  : 지오코딩을 조회한다.
		 * @date         : 2017. 09. 30. 
		 * @author	     : 권차욱
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
								$workRoad.ui.setRegionCd(result);
							}
							break;
						case -100:
							break;
						case -401:
							accessTokenInfo(function() {
								$workRoad.ui.reqGeocode(x_coor, y_coor);
							});
							break;
					}
				},
				async : false,
				dataType : "json",
				error: function(x,o,e) {
					$workRoad.ui.setRegionCd();
				}
			});						
		},
		setRegionCd : function(pInfo) {
			if (pInfo != undefined && pInfo.sido_cd != undefined) {
				$workRoad.ui.mySidoCd = pInfo.sido_cd;
				$workRoad.ui.mySidoNm = pInfo.sido_nm;
				
				if (pInfo.sgg_cd != undefined) {
//					$workRoad.ui.setSggList(pInfo.sido_cd);
					
					$workRoad.ui.mySggCd = pInfo.sgg_cd;
					$workRoad.ui.mySggNm = pInfo.sgg_nm;
					
					if (pInfo.emdong_cd != undefined) {
						$workRoad.ui.myEmDongCd = pInfo.emdong_cd;
						$workRoad.ui.myEmDongNm = pInfo.emdong_nm;
					}
					
				} else {
					$workRoad.ui.mySggCd = '';
					$workRoad.ui.mySggNm = '';
				}
			} else {
				$workRoad.ui.mySidoCd = '25';
				$workRoad.ui.mySggCd = '030';
				$workRoad.ui.mySidoNm = '대전광역시';
				$workRoad.ui.mySggNm = '서구';
			}

			$workRoad.ui.goToMyPositionCallback();
		},
		/**
		 * @name         : goToMyPositionCallback  
		 * @description  : "내일자리 보기" 메뉴 클릭에 대한 콜백함수 처리 
		 * @date         : 2019.01.23
		 * @author	     : ywKim
		 * @history 	 :
		 */
		goToMyPositionCallback : function() {
			// 타이머 실행으로 jsp 문서가 모두 로드되는 시점을 찾는다.
			var timer = setInterval(function() {
				clearInterval(timer);
				
				// jsp 문서가 모두 로드되는 시점 
				if ($workRoad.ui.numberOfContentToLoad <= 0 &&
					$workRoad.ui.changeMenuFinished == true) {
					
					// 주석처리 : 다른 곳에서 처리되고 있으며, 여기서는 싱크가 안 맞아서 처리가 안되는 이유 - 2019.01.21	ywKim	변경
					// "내주변 일자리 보기" 메뉴를 클릭한 경우 처리하기 ("일자리 보기" 화면이 아닌 다른 곳에서)
					if ($workRoad.ui.loadByPage && typeof $workRoad.ui.getMyPositionCallback == 'function') {
						if ($workRoad.ui.getMyPositionCallback()) {
							$workRoad.ui.getMyPositionCallback = undefined;
						}
					}
				}
			}, 200);
		},
		/**
		 * @name         :  
		 * @description  : 레이어의 선택 이벤트를 비활성화시킨다. 
		 * @date         : 2018.11.21
		 * @author	     : ywKim
		 * @history 	 :
		 * @param pSelector : 대상 셀렉터
		 * @param pCount	: 비활성화 횟수 / 레이어가 선택될때마다 차감되어 0 미만이되면 다시 활성화시킨다.
		 */
		deactivateLayerSelectionEvent : function(pSelector, pCount) {
			$(pSelector).attr("data-select-event-disable", (pCount == undefined) ? "1" : pCount);
		},
		activateLayerSelectionEvent : function(pSelector) {
			$(pSelector).removeAttr("data-select-event-disable");
		},
		/* 비활성화 횟수를 구한다.
		 */
		deactivatedCountForLayerSelectionEvent : function(pSelector) {
			var cnt = 0;
			if ($(pSelector).attr("data-select-event-disable") != undefined) {
				cnt = parseInt($(pSelector).attr("data-select-event-disable"));
			}
			return cnt;
		},
				
		/**
		 * @name         : 공통 코드 조회 
		 * @description  : 
		 * @date         : 2018.10.02
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 * 		pParams				: 분류코드 값 or 파라미터 목록
		 * 			- 파라미터 목록인 경우
		 * 				B_CLASS_CD		: 분류코드
		 * 				S_CLASS_CD_LEN	: 코드길이
		 * 		pSuccessCallBack	: 호출 성공시 콜백함수
		 * 		pErrorCallBack		: 호출 실패시 콜백함수
		 * @dataList
		 *		CD		: 코드
		 * 		NM		: 코드명
		 */
		selectCommonCode : function(pParams, pSuccessCallBack, pErrorCallBack) {
			var dataParams = {};
			
			if (typeof pParams === 'object') {
				if (typeof pParams.b_class_cd !== 'undefined') {
					dataParams.b_class_cd = pParams.b_class_cd;
				}
				if (typeof pParams.s_class_cd_len !== 'undefined') {
					dataParams.s_class_cd_len = pParams.s_class_cd_len;
				}
			} else {
				dataParams.b_class_cd = pParams;
			} 
			
			$.ajax({
				type: "POST",
				url: contextPath + "/ServiceAPI/workRoad/selectCommonCode.json",
				async: false,
				dataType: "json",
				data: dataParams,
				success: function(res) {
					if (res.errCd == 0) {
						var dataList = res.result.dataList;
						
						if (typeof pSuccessCallBack !== 'undefined') {
							pSuccessCallBack(dataList);
						}
					} else {
						if (typeof pErrorCallBack !== 'undefined') {
							pErrorCallBack('failed!');
						} else {
							alert('failed!');
						}
					}
				} ,
				error:function(err) {
					if (typeof pErrorCallBack !== 'undefined') {
						pErrorCallBack(err.responseText);
					} else {
						alert(err.responseText);
					}
				}  
			});
		},
		/**
		 * @name         : 2자리 코드정의 조회 
		 * @description  : 
		 * @date         : 2018.10.04
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 * 		pCodeName			: 코드명
		 * 		pSuccessCallBack	: 호출 성공시 콜백함수
		 * 		pErrorCallBack		: 호출 실패시 콜백함수
		 * @dataList
		 * 		NM		: 코드명
		 *		VAL		: 코드값
		 *		CONTENT	: 코드내용
		 *		EXP		: 부가설명
		 */
		selectCommonCodeTwo : function(pCodeName, pSuccessCallBack, pErrorCallBack) {
			var dataParams = {};
			dataParams.cd_nm = pCodeName;
			
			$.ajax({
				type: "POST",
				url: contextPath + "/ServiceAPI/workRoad/selectCommonCodeTwo.json",
				async: false,
				dataType: "json",
				data: dataParams,
				success: function(res) {
					if (res.errCd == 0) {
						var dataList = res.result.dataList;
						
						if (typeof pSuccessCallBack !== 'undefined') {
							pSuccessCallBack(dataList);
						}
					} else {
						if (typeof pErrorCallBack !== 'undefined') {
							pErrorCallBack('failed!');
						} else {
							alert('failed!');
						}
					}
				} ,
				error:function(err) {
					if (typeof pErrorCallBack !== 'undefined') {
						pErrorCallBack(err.responseText);
					} else {
						alert(err.responseText);
					}
				}  
			});
		},
		/**
		 * @name         : 1자리 코드정의 조회 
		 * @description  : 
		 * @date         : 2018.10.04
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 * 		pCodeName			: 코드명
		 * 		pSuccessCallBack	: 호출 성공시 콜백함수
		 * 		pErrorCallBack		: 호출 실패시 콜백함수
		 * @dataList
		 * 		NM		: 코드명
		 *		VAL		: 코드값
		 *		CONTENT	: 코드내용
		 *		EXP		: 부가설명
		 */
		selectCommonCodeOne : function(pCodeName, pSuccessCallBack, pErrorCallBack) {
			var dataParams = {};
			dataParams.cd_nm = pCodeName;
			
			$.ajax({
				type: "POST",
				url: contextPath + "/ServiceAPI/workRoad/selectCommonCodeOne.json",
				async: false,
				dataType: "json",
				data: dataParams,
				success: function(res) {
					if (res.errCd == 0) {
						var dataList = res.result.dataList;
						
						if (typeof pSuccessCallBack !== 'undefined') {
							pSuccessCallBack(dataList);
						}
					} else {
						if (typeof pErrorCallBack !== 'undefined') {
							pErrorCallBack('failed!');
						} else {
							alert('failed!');
						}
					}
				} ,
				error:function(err) {
					if (typeof pErrorCallBack !== 'undefined') {
						pErrorCallBack(err.responseText);
					} else {
						alert(err.responseText);
					}
				}  
			});
		},	

		/**
		 * @name         : selectJobStatsDataInfo 
		 * @description  : 일자리 통계자료 정보 조회
		 * @date         : 2018.11.15
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param pLinkId			: 연계ID
		 * @param pSuccessCallBack	: 호출 성공시 콜백함수
		 * @param pErrorCallBack	: 호출 실패시 콜백함수
		 * @callback param
		 * 		data.link_id : 연계ID 
		 * 		data.stat_nm : 통계명
		 * 		data.stat_definition : 통계정의
		 * 		data.stat_exp : 통계설명
		 * 		data.colct_source : 수집출처
		 * 		data.updt_cycle : 갱신주기
		 * 		data.recent_updt_de : 최근갱신일
		 * 		data.stat_path : 통계경로
		 * 		data.refrn_url : 참조URL
		 * 		data.create_dt : 생성일자
		 * 
		 * ※ 연계 ID 목록 
		 *  I0001	오늘의구인현황	
		 *  E3506	삶의대한만족도	
		 *  E3505	소비생활만족도	
		 *  E3504	소득만족도	
		 *  E3503	일자리만족도	
		 *  E3502	상대적빈곤율	
		 *  E3501	지니계수	
		 *  E3309	산업재해현황	
		 *  E3307	근로시간	
		 *  E3304	임금5분위 배율(추이)	
		 *  E3303	저임금근로자 비중	
		 *  E3302	임금총액?상승률	
		 *  E3301	임금총액	
		 *  E3223	고용보험 상실자	
		 *  E3222	고용보험가입자	
		 *  E3221	지역별 구인배수	
		 *  E3219	지역별 취업건수	
		 *  E3218	지역별 구직건수	
		 *  E3208	지역별 구인인원	
		 *  I3101	인구	
		 *  I3102	국내인구이동통계	
		 *  I3103	전출지/전입지(시도)별 이동자수	
		 *  I3104	취업자수	경제활동인구조사	
		 *  I3105	취업자수	행정구역(시도)/연령별 취업자
		 *  I3106	취업자수	행정구역(시도)/교육정도별 취업자
		 *  I3107	취업자수	행정구역(시도)/종사상지위별 취업자
		 *  I3108	취업자수	행정구역(시도)/취업시간별 취업자
		 *  I3109	취업자수	행정구역(시도)/직업별 취업자
		 *  I3110	취업자수	행정구역(시도)/산업별 취업자
		 *  I3111	고용률	
		 *  I3112	실업자수	성별 실업자수
		 *  I3113	실업자수	연령별 실업자수
		 *  I3114	실업률	실업률(성별)
		 *  I3115	실업률	실업률(연령별)
		 *  I3116	청년실업(고용동향)률	
		 *  I3117	비경제활동인구	
		 *  I3201	사업체 및 종사자수	
		 *  I3202	사업체 및 종사자수	
		 *  I3203	사업체 및 종사자수	
		 *  I3204	사업체 및 종사자수	
		 *  I3205	사업체 및 종사자수	
		 *  I3206	법인 창업	
		 *  I3207	법인 폐업	
		 *  I3220	취업자증감	
		 *  I3305	(비)정규직규모	
		 *  I3306	(비)정규직규모	
		 *  I3308	사회보험가입률	
		 *  I3401	경제성장률	
		 *  I3402	GRDP(지역내총생산)	
		 *  I3403	소비자 물가	
		 *  I3404	생활물가	
		 *  I3405	수출입액	
		 *  I3406	수출입액
		 *  
		 */		
		selectJobStatsDataInfo : function(pLinkId, pSuccessCallBack, pErrorCallBack) {
			$.ajax({
				type: "POST",
				url: contextPath + "/ServiceAPI/workRoad/selectJobStatsDataInfo.json",
				async: false,
				dataType: "json",
				data: {link_id: pLinkId},
				success: function(res) {
					if (res.errCd == 0) {
						var data = res.result;
						
						if (typeof pSuccessCallBack !== 'undefined') {
							pSuccessCallBack(data);
						}
					} else {
						if (typeof pErrorCallBack !== 'undefined') {
							pErrorCallBack('failed!');
						} else {
							alert('failed!');
						}
					}
				} ,
				error:function(err) {
					if (typeof pErrorCallBack !== 'undefined') {
						pErrorCallBack(err.responseText);
					} else {
						alert(err.responseText);
					}
				}  
			});
		},		
	};

	$workRoad.util = {
		// tempIdSeq : 0,						// id 없는 Element 에 임시 id 부여를 위해 사용함 (id 부여할때 마다 1씩 증가 / id 포맷 : wrmTempId + tempIdSeq)
		
		/** 숫자에 콤마 추가
		 */
		/*addComma : function(num) {
			var regexp = /\B(?=(\d{3})+(?!\d))/g;
			return num.toString().replace(regexp, ',');
		},*/
		/** 날짜에 구분자 추가 년월일 반환
		 *  @params	pDate : yyyyMMdd
		 *  		pSign : 년월일을 구분하는 기호
		 *  @return		yyyy.MM.dd
		 */
		dateWithSign : function (pDate, pSign) {
			var date = pDate;
			var sign = (pSign != undefined) ? pSign : "";

			if (pDate.length == 8) {
				date = pDate.substring(0, 4) + sign + pDate.substring(4, 6) + sign + pDate.substring(6, 8);
			} else if (pDate.length == 6) {
				date = pDate.substring(0, 4) + sign + pDate.substring(4, 6);
			}
			
			return date;
		},
		/** 날짜에 구분자 추가 년주 반환
		 *  @params	pDate : yyyyww
		 *  		pSign : 년주을 구분하는 기호
		 *  		pUnit : 주를 나타내는 표기말 (기본: "주")
		 *  @return		yyyy.ww주
		 */
		weekWithSign : function (pDate, pSign, pUnit) {
			var date = pDate;
			var sign = (pSign != undefined) ? pSign : "";
			var unit = (pUnit != undefined) ? pUnit : "주";

			if (pDate.length == 6) {
				date = pDate.substring(0, 4) + sign + pDate.substring(4, 6) + unit;
			} else {
				date = pDate;
			}
			
			return date;
		},
		/** 날짜에 구분자 추가 년월 반환
		 *  @params	pDate : yyyyMM
		 *  		pSign : 년주을 구분하는 기호
		 *  		pUnit : 월을 나타내는 표기말 (기본: "월")
		 *  @return		yyyy.mm월
		 */
		monthWithSign : function (pDate, pSign, pUnit) {
			var date = pDate;
			var sign = (pSign != undefined) ? pSign : "";
			var unit = (pUnit != undefined) ? pUnit : "월";

			if (pDate.length == 6 || pDate.length == 8) {	// 2019.06.17[한광희] 오늘의 구인현황 기간조회 기능 활성화에 따른 수정
				date = pDate.substring(0, 4) + sign + pDate.substring(4, 6) + unit;
			} else {
				date = pDate;
			}
			
			return date;
		},
		/** 날짜에 구분자 추가 년월일 반환
		 *  @params	pDate : yyyyMMdd
		 *  		pSign : 년월일을 구분하는 기호
		 *  @return		yyyy.MM
		 */
		yearMonthWithSign : function (pDate, pSign) {
			var date = pDate;
			var sign = (pSign != undefined) ? pSign : "";
			
			if (pDate.length == 8) {
				date = pDate.substring(0, 4) + sign + pDate.substring(4, 6);
			}
			
			return date;
		},
		/** 날짜에 구분자 추가하여 월일 반환
		 *  @params	pDate : yyyyMMdd
		 *  		pSign : 년월일을 구분하는 기호
		 *  @return		MM.dd
		 */
		monthDayWithSign : function (pDate, pSign) {
			var date = pDate;
			var sign = (pSign != undefined) ? pSign : "";
			
			if (pDate.length == 8) {
				date = pDate.substring(4, 6) + sign + pDate.substring(6, 8);
			}
			
			return date;
		},
		
		/**
		 * @name         : 숫자형 파라미터 객체를 숫자 데이터로 변환
		 * @description  : 
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 */
		paramToNumber : function(pObject, pDefault) {
			if (typeof pObject === 'string') {
				return pObject.toLowerCase().replace('px', '')
			} else if (typeof pObject === 'number') {
				return pObject;
			} else if (typeof pDefault !== 'undefined') {
				return pDefault;
			} else {
				return 0;
			}
		},
		
		/**
		 * @name         : 레이어의 위치 구하기
		 * @description  : pAlign 에 따라 레이어의 위치를 구하여 반환한다.
		 * 					레이어의 기준위치 (0, 0)은 (left: 메뉴바 이후 / top : 인터렉티브 바 이후)
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * @params	pAlign	: 상단좌측에서 하단우측까지 9개 영역을 나타내는 문자열 ['top-left', 'top-center', 'top-right', 'middle-left', ... 'bottom-right']
		 * 			pWidth  : 엘리먼트의 너비
		 * 			pHeight : 엘리먼튼의 높이
		 */
		getLayerCoord : function(pAlign, pWidth, pHeight) {
			var arr = pAlign.toLowerCase().split('-');
			var top = $workRoad.util.getLayerCoordY(arr[0], pHeight);
			var left = $workRoad.util.getLayerCoordX(arr[1], pWidth);

			// 상하 좌우 포맷의 위치가 바뀌었을 경우
			if (top == 0) {
				top = $workRoad.util.getLayerCoordY(arr[1], pHeight);
			}
			if (left == 0) {
				left = $workRoad.util.getLayerCoordX(arr[1], pWidth);
			}
			
			return {'left': left, 'top': top};
		},
		getLayerCoordX : function(pAlign, pWidth) {
			switch (pAlign.toLowerCase()) {
			case 'left': return $workRoad.ui.scrollLeft + $workRoad.ui.coordX + 1;
			case 'center': return $workRoad.ui.scrollLeft + $workRoad.ui.coordX + (document.body.clientWidth - $workRoad.ui.coordX - pWidth) / 2;
			case 'right': return $workRoad.ui.scrollLeft + document.body.clientWidth - pWidth;
			default: return 0;
			}
		},
		getLayerCoordY : function(pAlign, pHeight) {
			switch (pAlign.toLowerCase()) {
			case 'top': return $workRoad.ui.scrollTop + $workRoad.ui.coordY;
			case 'middle': return $workRoad.ui.coordY + (document.body.clientHeight - $workRoad.const.ContentsY - $workRoad.ui.coordY - pHeight) / 2;
			case 'bottom': return document.body.clientHeight - pHeight - $workRoad.const.ContentsY;
			default: return 0;
			}
		},
		
		/**
		 * @name         : 팝업창의 위치 구하기
		 * @description  : pAlign 에 따라 팝업창의 위치를 구하여 반환한다.
		 * 					팝업창의 기준위치 (0, 0)은 (left: 0 / top : 헤더 이후)
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * @params	pAlign	: 상단좌측에서 하단우측까지 9개 영역을 나타내는 문자열 ['top-left', 'top-center', 'top-right', 'middle-left', ... 'bottom-right']
		 * 			pWidth  : 엘리먼트의 너비
		 * 			pHeight : 엘리먼튼의 높이
		 */
		getPopupCoord : function(pAlign, pWidth, pHeight) {
			var arr = pAlign.toLowerCase().split('-');
			var top = $workRoad.util.getPopupCoordY(arr[0], pHeight);
			var left = $workRoad.util.getPopupCoordX(arr[1], pWidth);

			// 상하 좌우 포맷의 위치가 바뀌었을 경우
			if (top == 0) {
				top = $workRoad.util.getPopupCoordY(arr[1], pHeight);
			}
			if (left == 0) {
				left = $workRoad.util.getPopupCoordX(arr[1], pWidth);
			}
			
			return {'left': left, 'top': top};
		},
		getPopupCoordX : function(pAlign, pWidth) {
			switch (pAlign.toLowerCase()) {
			case 'left': return $workRoad.ui.scrollLeft;
			case 'center': return $workRoad.ui.scrollLeft + (document.body.clientWidth - pWidth) / 2;
			case 'right': return $workRoad.ui.scrollLeft + document.body.clientWidth - pWidth;
			default: return 0;
			}
		},
		getPopupCoordY : function(pAlign, pHeight) {
			switch (pAlign.toLowerCase()) {
			case 'top': return $workRoad.ui.scrollTop;
			case 'middle': return (document.body.clientHeight - $workRoad.const.ContentsY - pHeight) / 2;
			case 'bottom': return document.body.clientHeight - pHeight - $workRoad.const.ContentsY;
			default: return 0;
			}
		},
		/**
		 * 숫자에 천단위 콤마추가 및 꼬리말 추가
		 */
		addComma : function (pNumberString, pTrailer) {
			if (pNumberString == undefined) {
				return "";
			}
			
			var parts = pNumberString.toString().split(".");
			var str = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
			
		    if (typeof pTrailer != 'undefined') {
		    	str += pTrailer;
		    }
		    
		    return str;
		},
		/**
		 * @name         : getUnitList
		 * @description  : toNumberString()에서 사용하는 point, unit 목록을 구한다.
		 * 					- DB에서 조회할때 기준 unit이 존재하여 기준 unit을 기준으로 임의로 목록을 구한다.
		 * 					- 기준 unit을 사용하지 않는 경우 이 함수를 사용하지 않고 임의로 작성하여 사용하면된다. 
		 * @date         : 2018.11.09
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param pUnitName	: 기준 unit
		 */
		getUnitList : function(pUnitName) {
			var result = {};
			
			if (pUnitName == undefined) {
				console.log("★★★ Warning ★★★");
				console.log("$workRoad.util.getUnitList(pUnitName) : 파라미터(pUnitName)가 정의되지 않았습니다.");
			}
			
			switch (pUnitName) {
			case "%": 
				result.points = [0.1]; 
				result.units = ["%"];
				result.compareOperation = "-";
				break;
			case "%%p":
				result.points = [0]; 
				result.units = ["%%p"];
				result.compareOperation = "-";
				break;
			case "개":
				result.points = [0,3,6]; 
				result.units = ["개","천개","백만개"];
				result.compareOperation = "-";
				break;
			case "건":
				result.points = [0,3,6]; 
				result.units = ["건","천건","백만건"];
				result.compareOperation = "-";
				break;
			case "계수":
				result.points = [0]; 
				result.units = ["계수"];
				result.compareOperation = "-";
				break;
			case "만개":
				result.points = [0,2,5]; 
				result.units = ["만개","백만개","억만개"];
				result.compareOperation = "-";
				break;
			case "만원":
				result.points = [0,2,5]; 
				result.units = ["만원","백만원","억원"];
				result.compareOperation = "-";
				break;
			case "만원 세 년":
				result.points = [0]; 
				result.units = ["만원 세 년"];
				result.compareOperation = "-";
				break;
			case "만원%":
				result.points = [0]; 
				result.units = ["만원%"];
				result.compareOperation = "-";
				break;
			case "명":
				result.points = [0,3,4,6]; 
				result.units = ["명","천명","만명","백만명"];
				result.compareOperation = "-";
				break;
			case "배":
				result.points = [0,3,4,6]; 
				result.units = ["배","천배","만배","백만배"];
				result.compareOperation = "-";
				break;
			case "백만원":
				result.points = [0,2,6]; 
				result.units = ["백만원","억원","조원"];
				result.compareOperation = "-";
				break;
			//2020-02-24 [김남민] 일자리통계 > 수출, 수입 집계단위 (년월 => 년도) 수정. START
			case "백만달러":
				result.points = [0,3,6]; 
				result.units = ["백만달러","십억달러","조달러"];
				result.compareOperation = "-";
				break;
			//2020-02-24 [김남민] 일자리통계 > 수출, 수입 집계단위 (년월 => 년도) 수정. END
			case "시간":
				result.points = [0]; 
				result.units = ["시간"];
				result.compareOperation = "-";
				break;
			case "점":
				result.points = [0,3,4,6]; 
				result.units = ["점","천점","만점","백만점"];
				result.compareOperation = "-";
				break;
			case "천명":
				result.points = [0,3]; 
				result.units = ["천명","백만명"];
				result.compareOperation = "-";
				break;
			case "천불":
				result.points = [0,3,5]; 
				result.units = ["천불","백만불","억불"];
				result.compareOperation = "-";
				break;
			case "호":
				result.points = [0,3,4,6]; 
				result.units = ["호","천호","만호","백만호"];
				result.compareOperation = "-";
				break;
			case "":
				result.points = [0]; 
				result.units = [""];
				result.compareOperation = "-";
				break;
			default:
				console.log("★★★ Warning ★★★");
				console.log("$workRoad.util.getUnitList(" + pUnitName + ") : 알 수 없는 unit 입니다.");
				console.log("case 구분에 추가해주세요.");
				result.points = [0]; 
				result.units = [(pUnitName == undefined) ? "" : pUnitName];
				result.compareOperation = "-";
				break;
			}
			
			return result;
		},
		/**
		 * 소수인 파라미터중에 가장 큰 소수점 자릿수를 찾아 반환
		 */
		maxDecimalPlaces : function(pNum1, pNum2) {
			var maxPlaces = 0;
			
			if (typeof pNum1 == "number" && typeof pNum2 == "number") {
				var str = pNum1.toString();
				var parts = str.split(".");
				if (parts.length == 2) {
					maxPlaces = parts[1].length;
				}
				
				str = pNum2.toString();
				parts = str.split(".");
				if (parts.length == 2) {
					if (maxPlaces < parts[1].length) {
						maxPlaces = parts[1].length;
					}
				}
			}
			
			return maxPlaces;
		},

		/**
		 * @name         : toNumberString
		 * @description  : flexible 단위를 적용한 값으로 변환 
		 * @date         : 2018.11.09
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param pNumber	: 대상 값
		 * @param pParams	:
		 * 		pParams.points : 포인트 목록
		 * 							0(일단위), 3(천단위), 4(만단위) ...
		 * 		pParams.units : 포인트별 단위 목록
		 * 							명, 천명, 만명 ...
		 * 		pParams.usingComma : 콤마 사용 여부
		 * 		pParams.compareValue : 비교 값 (비교 데이터 생성을 위함 / 기본값: undefined)
		 * 		pParams.compareOperation : 비교 값과 연산할 연산자 종류
		 * @return result
		 * 		result.text				: 표시 값
		 * 		result.value			: unit 적용 전의 값 
		 * 		result.originValue		: 원본 값
		 * 		result.iconClass		: 아이콘 클래스 (up or down)
		 * 		result.iconValue		: 아이콘값 - 표시 값
		 * 		result.iconText 		: 아이콘값 - unit 적용 전의 값
		 * 		result.iconOriginValue 	: 아이콘값 - 원본값
		 */
		toNumberString : function(pNumber, pParams) {
			var result = {};
			result.iconClass = "";

			var decimalNum = (typeof pNumber == "number") ? pNumber : parseFloat(pNumber.toString().replace(",", ""));
			if (decimalNum == undefined) { return; }
			
			// 비교 데이터가 존재하는 경우
			if (pParams.compareValue != undefined) {
				var pVal1 = decimalNum;
				var pVal2 = (typeof pParams.compareValue == "number") ? pParams.compareValue : parseFloat(pParams.compareValue.toString().replace(",", ""));
				var pOperation = pParams.compareOperation;
				var val = 0.1;
				
				// 소수 판별
				var decimalPlaces = $workRoad.util.maxDecimalPlaces(pVal1, pVal2);
				
				if (pVal1 > pVal2) {
					if (pOperation == "/") {
						val = pVal1 / pVal2;
//						val = Number((pVal1 / pVal2).toFixed(2));
					} else {// "-"
						val = pVal1 - pVal2;						
						if (decimalPlaces > 0) {// 정밀하지 않은 소수 계산 대응
							val = val.toFixed(decimalPlaces);
						}
					}
					result.iconClass = "up";
				} else if (pVal1 < pVal2) {
					if (pOperation == "/") {
						val = pVal2 / pVal1;
//						val = Number((pVal2 / pVal1).toFixed(2));
					} else {// "-"
						val = pVal2 - pVal1;						
						if (decimalPlaces > 0) {// 정밀하지 않은 소수 계산 대응
							val = val.toFixed(decimalPlaces);
						}
					}
					result.iconClass = "down";
				}
				
				var iconParams = $.extend({}, pParams);
				iconParams.compareValue = undefined;
				var iconResult = $workRoad.util.toNumberString(val, iconParams);
				result.iconValue = iconResult.value;
				result.iconText = iconResult.text;
				result.iconOriginValue = iconResult.originValue;
			}
			
			var usingComma = (pParams.usingComma == undefined) ? true : pParams.usingComma;
			var tmpText;
			
			if (pParams.points != undefined) {
				var points = pParams.points;
				var point;		// 단위 포인트 (0: 1의 자리   3: 천의 자리)
				var decPlace;	// 소수 자리수
				var tmpPoint;
				var i;
				
				for (i = points.length - 1; i >= 0; i--) {
					tmpPoint = points[i].toString();
					if (tmpPoint.indexOf(",") >= 0) {
						tmpPoint = tmpPoint.split(",");
					} else if (tmpPoint.indexOf(".") >= 0) {
						tmpPoint = tmpPoint.split(".");
					}
					
					if (typeof tmpPoint == "object" && tmpPoint.length == 2) {
						point = parseInt(tmpPoint[0].trim());
						decPlace = parseInt(tmpPoint[1].trim());		
					} else {
						point = parseInt(tmpPoint.trim());
						decPlace = 0;
					}
					
					if (decimalNum >= Math.pow(10, point)) {
						tmpText = (decimalNum / Math.pow(10, point)).toFixed(decPlace);
//						tmpText = Math.round(decimalNum / Math.pow(10, point));
						if (usingComma) {
							tmpText = $workRoad.util.addComma(tmpText);
						}
						
						break;
					}
				}
				
				if (i >= 0 && pParams.units.length > i) {
					tmpText = tmpText + pParams.units[i];
				} else {
					if (usingComma) {
						tmpText = $workRoad.util.addComma(decimalNum);
					} else {
						tmpText = decimalNum.toString();
					}
					
					if (pParams.units.length > 0) {
						tmpText += pParams.units[0]; 
					}
				}
			}
			
			result.text = tmpText;
			result.originValue = pNumber;
			
			if (usingComma) {
				result.value = $workRoad.util.addComma(decimalNum);
			} else {
				result.value = decimalNum;
			}
			
			return result;
		},
		// getTempId : function() {
		// 	$workRoad.util.tempIdSeq++;
		// 	return 'wrmTempId_' + $workRoad.util.tempIdSeq;
		// },

		/**
		 * @name         : 드래그 설정
		 * @description  : 엘리먼트를 드래그 가능하도록 설정한다.
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * @params	pElement : 자바스크립트 엘리먼트 객체
		 */
		dragElement : function (pElement) {
			var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

			// if (pElement.id.length == 0) {
			// 	pElement.id = $workRoad.util.getTempId();
			// }

			if ($(pElement).find('.wrmHeader').length > 0) {
				$(pElement).find('.wrmHeader').each(function(){
					$(this)[0].onmousedown = dragMouseDown;
				})
			} else {
				pElement.onmousedown = dragMouseDown;
			}
			// if (document.getElementById(pElement.id + "header")) {
			// 	/* if present, the header is where you move the DIV from:*/
			//     document.getElementById(pElement.id + "header").onmousedown = dragMouseDown;
			// } else {
			//     /* otherwise, move the DIV from anywhere inside the DIV:*/
			// 	pElement.onmousedown = dragMouseDown;
			// }

			function dragMouseDown(e) {
				e = e || window.event;
				
				if (e.target.tagName == "SELECT")
					return;
				
				e.preventDefault();
				// get the mouse cursor position at startup:
				pos3 = e.clientX;
				pos4 = e.clientY;
				document.onmouseup = closeDragElement;
				// call a function whenever the cursor moves:
				document.onmousemove = elementDrag;
			}
		
			function elementDrag(e) {
				e = e || window.event;
				e.preventDefault();
				// calculate the new cursor position:
//				console.clear();
//				console.log("old=> pos1: " + pos1 + " pos2: " + pos2 + " pos3: " + pos3 + " pos4: " + pos4 + " offsetTop: " + pElement.offsetTop);
				pos1 = pos3 - e.clientX;
				pos2 = pos4 - e.clientY;
				pos3 = e.clientX;
				pos4 = e.clientY;
//				console.log("new=> pos1: " + pos1 + " pos2: " + pos2 + " pos3: " + pos3 + " pos4: " + pos4 + " offsetTop: " + pElement.offsetTop);
				// set the element's new position:
				if ($(pElement).hasClass("dialog")) {
					if (pElement.offsetTop - pos2 <= 0) {
						pElement.style.top = "0px";
					} else {
						pElement.style.top = (pElement.offsetTop - pos2) + "px";
					}	
				} else {
					if (pElement.offsetTop - pos2 <= $workRoad.ui.coordY) {
						pElement.style.top = $workRoad.ui.coordY + "px";
					/*} else if (// 화면 하단 경계) {
						;*/
					} else {
						pElement.style.top = (pElement.offsetTop - pos2) + "px";
					}
				}
//				if (pElement.offsetLeft - pos1 <= 0) {
//					pElement.style.left = "0px";
				/*} else if (// 화면 우측 경계) {
					;*/
//				} else {
					pElement.style.left = (pElement.offsetLeft - pos1) + "px";
//				}
				// pElement.style.top = (pElement.offsetTop - pos2) + "px";
				// pElement.style.left = (pElement.offsetLeft - pos1) + "px";

				if (pElement.style.left <= 0) {
					pElement.style.left = 0; 
				}
				
				//2019-06-11 [김남민] 일자리 보기 > 통합검색 수정 START
				//일자리보기 > 통합검색 버튼 목록 창 오른쪽에 따라 붙게하기 (안씀)
				//console.log($(pElement).attr("id"));
				/*
				if($(pElement).attr("id") == "vjJobInfoList") {
					var lvTempDiv = $("#vjConditionList div.choice-list");
					var lvTempTop = Number((pElement.style.top).replace(/px/g,""))+6;
					var lvTempLeft = Number((pElement.style.left).replace(/px/g,""))+750;
					lvTempDiv.css("top", lvTempTop+"px");
					lvTempDiv.css("left", lvTempLeft+"px");
				}
				*/
				//2019-06-11 [김남민] 일자리 보기 > 통합검색 수정 END
			}
		
			function closeDragElement() {
				/* stop moving when mouse button is released:*/
				document.onmouseup = null;
				document.onmousemove = null;
			}		
		}, 			
	};
	
	$workRoad.event = {
			/**
			 * @name		 : setUIEvent
			 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date		 : 2018.09.01 
			 * @author		 : ywKim
			 * @history 	 :
			 * @param
			 */
			setUIEvent: function() {
				console.log("$workRoad.event.setUIEvent() called.");
				
				$workRoad.ui.setScrollingOnTheMenuBar();				
				$workRoadLeftMenu.event.setUIEvent();
	
//				// 메인 Title 클릭
//				$workRoad.event.set('click', '#wrmTitle', function() {
//				
//					if ($workRoad.ui.prevIndex == 0) {
//						$wrmTodayStatus.ui.showMainLayer();
//					}
//				});

			},	
			/**
			 * @name		 : reSetUIEvent
			 * @description  : 이벤트 재정의
			 * 					기존 이벤트에 문제가 있는 경우
			 * 					최우선순위로 처리됨. 
			 * @date		 : 2018.10.23 
			 * @author		 : ywKim
			 * @history 	 :
			 * @param
			 */
			reSetUIEvent: function() {
				
				
				// legendInfo.js 의
				// $workRoad.util.popClose = function(){ $("body").on("click",".topbar>a, .hanClose",function(){ } }
				// 이벤트를 재정의
				// 팝업창의 우측 상단 닫기버튼 ('X') 실행오류 조치
				$('body').off('click','.topbar>a, .hanClose');
				$('body').on('click','.topbar>a, .hanClose',function(){
					
					if ($(this).attr("data-active") == "false") {
						return;
					}
					
					var $popBox = $(this).closest('.popBox');
					
					if ($popBox.parent().length == 1) {
						switch ($popBox.parent().attr('id').substr(0, 2)) {
						case 'ts':
						case 'vj':
						case 'sa':
						case 'ss':	// 2019.05.31[한광희] 일자리 통계분석 > 일자리현황 조회조건 팝업 변경으로 인한 오류로 변경:ssa → ss 로 변경
							$workRoad.ui.hideDialog('#' + $popBox.parent().attr('id'));
							break;
						default:
							$(this).closest(".popBox").hide();
						}						
					} else {
						$(this).closest(".popBox").hide();
					}
				});
			},
			
			set : function (pEvent, pSender, pCallback) {
				
//				// New Design 적용된 문서내의 엘리먼트인 경우
//				if ($(pSender).closest('.workRoad').length == 1) {
//					// pSender에 명시적으로 workRoad 가 포함된 경우
//					if (pSender.indexOf('.workRoad') == 0) {
//						$('body').off(pEvent, pSender);
//						$('body').on(pEvent, pSender, pCallback);
//					} else {
//						$('body').off(pEvent, '.workRoad ' + pSender);
//						$('body').on(pEvent, '.workRoad ' + pSender, pCallback);
//					}
//				} else if ($(pSender).hasClass('.workRoad')) {
//					// pSender에 명시적으로 workRoad 가 포함된 경우
//					if (pSender.indexOf('.workRoad') == 0) {
//						$('body').off(pEvent, pSender);
//						$('body').on(pEvent, pSender, pCallback);
//					} else {
//						$('body').off(pEvent, '.workRoad' + pSender);
//						$('body').on(pEvent, '.workRoad' + pSender, pCallback);
//					}
//				} else {
					$('body').off(pEvent, pSender);
					$('body').on(pEvent, pSender, pCallback);
//				}
			},
			/**
			 * @name		 : checkLabel
			 * @description  : 사용자 정의 라디오버튼/체크박스 를 체크한다.
			 * 					- 실제로는 라디오버튼/체크박스와 연결된 label을 체크하며
			 * 						여기에서는 label의 이미지를 변경하는 기능을 한다.
			 * 					- 기본 컨트롤은 숨겨져 있고 체크 컨트롤은 이미지를 사용함.
			 * 					- 컨트롤 배열 규칙
			 * 						1. 하나의 항목은 li 내부에 input - label 순서로 배치
			 * 						2. 다수의 항목은 ul 내부에 li 목록으로 배치
			 * 						3. ul 은 label 의 grandParent가 된다.
			 * 						4. input은 label의 for(input의 id)로 연결되어 있다.
			 * @date		 : 2018.11.08 
			 * @author		 : ywKim
			 * @history 	 :
			 * @param pSelector	: 대상 객체 ($~) / 1 or more
			 * @param pParam1	: Index or Value or undefined
			 * 						- Index : 대상객체 목록의 인덱스 / 대상객체가 multi 인 경우
			 * 						- Value : true or false / 대상객체가 1개인 경우
			 * 						- undefined : 대상객체가 라디오버튼인 경우 값이 필요없다. 무조건 true이기 때문에
			 * @param pParam2	: Value or undefined
			 * 						- Value : 대상객체 목록의 인덱스에 해당하는 객체의 체크 값
			 * 									- true or false
			 * 						- undefined : 대상객체가 라디오버튼인 경우 값이 필요없다. 무조건 true이기 때문에
			 * 	※ 사용예
			 *		$workRoad.event.checkLabel($this);				// $this에 체크 / $this 는 라디오버튼
			 *		$workRoad.event.checkLabel($objList, 0);		// 라디오버튼 목록 $objList 의 0번째 라디오버튼 체크
			 *		$workRoad.event.checkLabel($that, false);		// $that에 체크해제 / $that 은 체크박스
			 *		$workRoad.event.checkLabel($objList, 1, true);	// 체크박스 목록 $objList 의 1번째 체크박스 체크
			 *  ※ html 예
			 *  	<ul>
			 *  		<li>
			 *  	 		<input type="radio" id="morning" name="cars" value="1" />
			 *  	 		<label for="morning">모닝</label>
			 *  		</li>
			 *			<li>
			 *				<input type="radio" id="carnival" name="cars" value="2" />
			 *				<label for="carnival">카니발</label>
			 *			</li>
			 *		</ul>
			 */
			checkLabel : function (pSender, pParam1, pParam2) {
//				console.log("checkLabel: " + pSelector + ((pValue != undefined) ? ", " + pValue : ""));
				
				var pIndex;
				var pValue; 
				
				if (typeof pParam1 == "number" && typeof pParam2 == "boolean") {
					pIndex = pParam1;
					pValue = pParam2;
				} else if (typeof pParam1 == "boolean" && pParam2 == undefined) {
					pValue = pParam1;
				} else if (pParam1 == undefined && pParam2 == undefined) {
					
				} else {
					return;
				}
				
				var $this = pSender;	// label
				
				if ($this == undefined) return;
					
				var $that = $this.prev();	// radio or check
				var $grandParent = null;	// radio's grand parent
				var name = "";				// radio's name
				
				// radio, check 가 없는 경우
				if ($that == undefined) return;
				
				var ck = false;
				
				if (pValue != undefined) {
					ck = !pValue;
				} else {
					ck = $this.hasClass("on");
				}
				
				// radio 인 경우 같은 이름의 radio 모두 체크 해제
				if ($that.attr("type") == "radio") {
					$grandParent = $that.parent().parent();	// ul / label의 parent의 parent
					name = $that.attr("name");				// 라디오버튼 이름 / for 그룹찾기
					
					if ($grandParent != undefined) {
						$grandParent.find("label").removeClass("on");
					} else {// 기본가정이 안 지켜졌을 경우 대비 / 같은 그룹의 라디오버튼을 모두 찾아 그 다음에 오는 라벨의 체크이미지를 없앤다.
						$(".workRoad input:radio[name='" + name + "']").each(function() {
							if ($(this).next() != undefined) {
								$(this).next().removeClass("on");
							}
						});
					}
					
//					$that.prop("checked", true);
					$this.addClass("on");					
				} else {

					if (!ck){// check
//						$that.prop("checked", true);
						$this.addClass("on");
					} else {// uncheck
//						$that.prop("checked", false);
						$this.removeClass("on");
					}
				}
			},
			/**
			 * @name		 : setToolTip
			 * @description  : 툴팁 이벤트를 설정한다.
			 * @date		 : 2018.11.26 
			 * @author		 : ywKim
			 * @history 	 :
			 * @param pSelector	: 대상 객체
			 */
			setToolTip : function (pSelector) {
				$(pSelector).tooltip({ 
					open: function( event, ui ) {
						var target = $(this);
						setTimeout(function() {
							$(".ui-tooltip .subj").text(target.attr("data-subj"));
							 ui.tooltip.css("max-width", "400px");
							 ui.tooltip.css("z-index", "100000");
							//ui.tooltip.css("top", event.clientY); //2018.01.15 [개발팀] 주석처리
						},100);
						
					},
					position: {
					      my: "left+10 top", at: "right top", 
					      collision : "flip",
					      using: function( position, feedback ) {
					    	  if ($(feedback.target)[0].element[0].outerHTML.indexOf("data-subj") != -1) {
					    		  $( this ).css( position ).prepend("<span class='subj'></span>");
					    	  }else {
					    		  $( this ).css( position ); 
					    	  }
					    	  
					          $( "<div>" )
					           /* .addClass( "arrow" )*/
					            .addClass( feedback.vertical )
					            .addClass( feedback.horizontal )
					            .appendTo( this );
					      }
					},
					content: function () {
						var title = $(this).attr("title");

						if (title != undefined) {
							title = title.replace(/&lt;p&gt;/gi, '');
							title = title.replace(/&lt;p&gt;/gi, '');
							title = title.replace(/&lt;/gi, '<');
							title = title.replace(/&gt;/gi, '>');
							title = title.replace(/&quot;/gi, '');
							$(this).attr("title", title); 
						}
						return $(this).prop('title');
			        }
				});
			},
	};
}(window, document));


/**
 * 데이터 타입 Date에 yyyymmdd() 함수 추가
 * 
 * 	2019.01.07	ywKim	변경: 년월일 구분자 추가하는 로직 추가
 * 
 * $param	pSign : 년월일을 구분하는 기호
 * @returns 날짜의 yyyymmdd 포맷의 문자열
 */
Date.prototype.yyyymmdd = function(pSign) {
	var mm = this.getMonth() + 1; // getMonth() is zero-based
	var dd = this.getDate();

	var dateStr = [this.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('');
	
	if (pSign == undefined) {
		return dateStr;
	}

	var date = dateStr.substring(0, 4) + pSign + dateStr.substring(4, 6) + pSign + dateStr.substring(6, 8);
	
	return date;
};
Date.prototype.first_yyyymmdd = function(pSign) {
	var mm = this.getMonth() + 1; // getMonth() is zero-based
	var dd = this.getDate();

	var dateStr = [this.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('');
	
	if (pSign == undefined) {
		return dateStr;
	}

	var date = dateStr.substring(0, 4) + pSign + "01" + pSign + "01";
	
	return date;
};
Date.prototype.last_yyyymmdd = function(pSign) {
	var mm = this.getMonth() + 1; // getMonth() is zero-based
	var dd = this.getDate();

	var dateStr = [this.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('');
	
	if (pSign == undefined) {
		return dateStr;
	}

	var date = dateStr.substring(0, 4) + pSign + "12" + pSign + "31";
	
	return date;
};
/**
 * 데이터 타입 Date에 addDays() 함수 추가
 * 일수를 더한다.
 * @param pDay	더할 날짜 수
 */
Date.prototype.addDays = function(pDay) {
	this.setDate(this.getDate() + pDay);
};
/**
 * 데이터 타입 String에 toDate() 함수 추가
 * 
 * ※ 주의사항 : 현재버전에서 포맷은 다음형태만 허용됨
 * 				yyyy, mm, dd, hh, ii, ss
 * @params	format : 날짜 포맷 / 예: yyyy/mm/dd, yyyy-mm-dd hh:ii:ss
 * @returns format에 해당하는 Date
 */
String.prototype.toDate = function(pFormat)
{
	if (this.length != pFormat.length) {
		return null;
	}
	
	var yIx = pFormat.indexOf("yyyy");
	var mIx = pFormat.indexOf("mm");
	var dIx = pFormat.indexOf("dd");
	var hIx = pFormat.indexOf("hh");
	var iIx = pFormat.indexOf("ii");
	var sIx = pFormat.indexOf("ss");

	var today = new Date();
	
	var year;
	
	if (yIx > -1) {
		year = this.substr(yIx, 4);
	} else {
		yIx = pFormat.indexOf("yy");
		year = (yIx > -1) ? this.substr(yIx, 2) : today.getFullYear();
	}
	var month = (mIx > -1) ? this.substr(mIx, 2) - 1 : today.getMonth() - 1;
	var day = (dIx > -1) ? this.substr(dIx, 2) : today.getDate();
	var hour = (hIx > -1) ? this.substr(hIx, 2) : 0;
	var minute = (iIx > -1) ? this.substr(iIx, 2) : 0;
	var second = (sIx > -1) ? this.substr(sIx, 2) : 0;

	return new Date(year, month, day, hour, minute, second);
};
Number.prototype.pad = function (pSize) {
    var s = this + "";
    while (s.length < pSize) {
    	s = "0" + s;
    }
    
    return s;
}