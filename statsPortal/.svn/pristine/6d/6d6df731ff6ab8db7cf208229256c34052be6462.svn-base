/**
 * 일자리 맵 서비스 > 구인 현황 분석
 * 
 * history : 
 *	2018.09.07	ywKim	신규
 *
 * author : ywKim
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$wrmStatusAnls = W.$wrmStatusAnls || {};	// WorkRoadMap Analysis Of Job Offer Status.
	
	$wrmStatusAnls.ui = {
		today : "20180101",
		adm_nm : "",				// 2018.11.30	ywKim	추가: 데이터보드 정보 테이블의 지역 데이터 관련
		
		/**
		 * @name         : 초기화
		 * @description  : 최초 화면을 초기화 합니다.
		 * 					기본적으로 각 페이지 (서브메뉴, 레이어, 팝업, 데이터보드 컨텐츠 등등)를 로드합니다.
		 * @date         : 2018.09.07
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param id     : 아이디
		 * @param seq    : 순번
		 */
		init : function(id, seq) {
			$workRoad.ui.appendMap('/view/workRoad/statusAnls/saMap');
			$workRoad.ui.appendDataBoard('/view/workRoad/statusAnls/saDataBoard');
			$workRoad.ui.appendSubmenu('/view/workRoad/statusAnls/saSubMenu');
			$workRoad.ui.appendContent('/view/workRoad/workRoadSelection');

			// 2019.03.13 접근log 생성
			srvLogWrite('D0', '04', '01', '00', '', '');
		},
		/**
		 * @name         : ready
		 * @description  : 모든 페이지 로드된 직후 처리
		 * @date         : 2018.10.31
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param id     : 아이디
		 * @param seq    : 순번
		 */
		ready : function() {
			$wrmStatusAnls.ui.getToday();
			
            var today = $wrmStatusAnls.ui.today;
            if (today.length == 8) {
            	today = today.substring(0, 4) + '.' + today.substring(4, 6) + '.' + today.substring(6, 8);
    			$("#view1 #wrmTitle").html('구인 현황분석 / '+today);
    			
    			$("#recentRegDt").html('최근 수집자료 ('+today+')');	// 2020.04.22[한광희] 월평균자료 조회 기능 추가
			}
			
			$saMap.noReverseGeoCode = true;
			$saMap.ui.createMap("mapRgn_1", 0);
			$saDataBoard.ui.mapDataSetting();	//지도별 데이터 형식 세팅
			$workRoadSelection.ui.clear();
		},			
		showSubMenu : function() {
			$saSubMenu.ui.show();
		},
		hideSubMenu : function() {
			if (typeof $saSubMenu !== 'undefined') {
				$saSubMenu.ui.hide();
			}
		},
		/*
		 * @name         : layout
		 * @description  : 레이어 위치 조정
		 * @date         : 2019.01.09 
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param	pLeft	: 레이어의 좌측 위치
		 * @param	pTop	: 레이어의 상단 위치 (defalt: undefined)
		 */
		layout : function(pLeft, pTop) {
			if (pLeft == undefined && pTop == undefined) {
				$workRoadSelection.ui.layout($workRoad.ui.coordX);
			} else {
				$workRoadSelection.ui.layout(pLeft, pTop);
			}
		},
		/** 
		 * @name         : getToday
		 * @description  : 오늘의 구인현황 기준일 구하기
		 *  				최신 데이터 등록일
		 * @date         : 2018. 11. 08 
		 * @author	     : ywKim
		 * @history 	 :
		 */
		getToday : function() {
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/todayStatus/getToday.json",
				async: false,
				dataType: "json",
//				data: { separator: " ", year: "년", month: "월", day: "일" },
				success: function(res) {
					if (res.errCd == 0) {
						$wrmStatusAnls.ui.today = res.result;
					} else {
						alert('failed!');
					}
				} ,
				error:function(err) {
					alert(err.responseText);
				}  
			});
		},
	};	
	
	$wrmStatusAnls.event = {
			/**
			 * @name		 : 
			 * @description  :  
			 * @date		 :  
			 * @author		 : 
			 * @history 	 :
			 */
			setUIEvent: function() {
				console.log("$wrmStatusAnls.event.setUIEvent() called.");
				
				$saMap.event.setUIEvent();
				$saDataBoard.event.setUIEvent();

				$saSubMenu.event.setUIEvent();
				$workRoadSelection.event.setUIEvent();
				
				// 샘플				
				$workRoad.event.set("click", "#sampleId", function() {
				});
				
				$workRoad.event.set("change", "#sampleId", function() {
				});				
			},
	}
	
}(window, document));