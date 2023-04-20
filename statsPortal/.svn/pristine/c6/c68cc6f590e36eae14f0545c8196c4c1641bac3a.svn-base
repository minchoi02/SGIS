/**
 * 일자리 맵 서비스 > 일자리 통계 분석
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
	W.$wrmStatsAnls = W.$wrmStatsAnls || {};	// WorkRoadMap Job Statistical Analysis.
	
	$wrmStatsAnls.ui = {
		
		/**
		 * @name         : 초기화
		 * @description  : 최초 화면을 초기화 합니다.
		 * 					기본적으로 각 페이지 (서브메뉴, 레이어, 팝업, 데이터보드 컨텐츠 등등)를 로드합니다.
		 * @date         : 2018.09.07
		 * @author	     : ywKim
		 * @history 	 :
		 * @param pId    : 아이디
		 * @param pSeq   : 순번
		 */
		init : function(pId, pSeq) {
			$workRoad.ui.appendMap('/view/workRoad/statsAnls/ssaMap');
			$workRoad.ui.appendDataBoard('/view/workRoad/statsAnls/ssaDataBoard');
			$workRoad.ui.appendSubmenu('/view/workRoad/statsAnls/ssaSubMenu');
			
			$workRoad.ui.appendContent('/view/workRoad/statsAnls/ssaJobStatus');
			$workRoad.ui.appendContent('/view/workRoad/statsAnls/ssaSearchPopup');
			$workRoad.ui.appendContent('/view/workRoad/statsAnls/ssaDetailPopup');
			$workRoad.ui.appendContent('/view/workRoad/statsAnls/ssaJobGrowth');
			$workRoad.ui.appendContent('/view/workRoad/statsAnls/ssaJobGrowthDetailPopup');
			$workRoad.ui.appendContent('/view/workRoad/statsAnls/ssaJobQuality');
			$workRoad.ui.appendContent('/view/workRoad/statsAnls/ssaJobQualityDetailPopup');
			$workRoad.ui.appendContent('/view/workRoad/statsAnls/ssaEconomicSituation');
			$workRoad.ui.appendContent('/view/workRoad/statsAnls/ssaEconomicSituationDetailPopup');
			$workRoad.ui.appendContent('/view/workRoad/statsAnls/ssaLifeQuality');
			$workRoad.ui.appendContent('/view/workRoad/statsAnls/ssaLifeQualityDetailPopup');
			
			$workRoad.ui.appendContent('/view/workRoad/statsAnls/ssaDetailInfoPopup');	// 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출 기능 개선 추가
			$workRoad.ui.appendContent('/view/workRoad/statsAnls/ssaJobStatusSearchPopup');	// 2019.05.30[한광희] 일자리 통계분석 > 일자리 현황 > 조회 버튼 클릭시 조회 조건 팝업 호출
			$workRoad.ui.appendContent('/view/workRoad/statsAnls/ssaJobGrowthSearchPopup'); // 2020.05.14 [곽제욱] 일자리 통계분석 > 일자리 증감 > 조회 버튼 클릭시 조회 조건 팝업 호출			
			// 2019.03.13 접근log 생성
			srvLogWrite('D0', '05', '01', '00', '', '');
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
			$ssaMap.noReverseGeoCode = true;
			$ssaMap.ui.createMap("mapRgn_1", 0);
			$ssaDataBoard.event.setUIEvent();	//UI에 사용되는 이벤트를 설정한다.
			$ssaDataBoard.ui.mapDataSetting();	//지도별 데이터 형식 세팅
//			$ssaMap.ui.getFirstMapDataLoad("");
		},
		
		showSubMenu : function() {
			$ssaSubMenu.ui.show();			
		},
		hideSubMenu : function() {
			if (typeof $ssaSubMenu !== 'undefined') {
				$ssaSubMenu.ui.hide();
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
			var $main = [$("#ssaJobStatus"), $("#ssaJobGrowth"), $("#ssaJobQuality"), $("#ssaEconomicSituation"), $("#ssaLifeQuality")];
			var $sub = [$("#ssaDetailPopup"), $("#ssaJobGrowthDetailPopup"), $("#ssaJobQualityDetailPopup"), $("#ssaEconomicSituationDetailPopup"), $("#ssaLifeQualityDetailPopup")];
			
			var style = {};
			style.left = pLeft + "px";
			if (pTop != undefined) {
				style.top = pTop + "px";
			}

			var exist = false;
			for (var i = 0; i < $main.length; i++) {
				
				if ($main[i].css("display") != "none") {
					$main[i].stop().animate(style, 200);
					exist = true;
				} else if ($sub[i].css("display") != "none") {
					$sub[i].stop().animate(style, 200);
					exist = true;
				}
				
				if (exist) break;
			}
			
			//시각화 위치 조정
			$("#view1 .sop-left .sop-control").stop().animate({left : (pLeft - 130) + "px"}, 200);
		},
	};	
	
	$wrmStatsAnls.event = {
			/**
			 * @name		 : 
			 * @description  :  
			 * @date		 :  
			 * @author		 : 
			 * @history 	 :
			 */
			setUIEvent: function() {
				$ssaMap.event.setUIEvent();
				$ssaDataBoard.event.setUIEvent(); //2019.03.18 (line 59와 중복, 이중 호출 오류 발생)
				
				$ssaSubMenu.event.setUIEvent();
				
				$ssaJobStatus.event.setUIEvent();
				$ssaSearchPopup.event.setUIEvent();
				$ssaDetailPopup.event.setUIEvent();
				$ssaJobGrowth.event.setUIEvent();
				$ssaJobGrowthDetailPopup.event.setUIEvent();
				$ssaJobQuality.event.setUIEvent();			
				$ssaJobQualityDetailPopup.event.setUIEvent();
				$ssaEconomicSituation.event.setUIEvent();	
				$ssaEconomicSituationDetailPopup.event.setUIEvent();
				$ssaLifeQuality.event.setUIEvent();		
				$ssaLifeQualityDetailPopup.event.setUIEvent();
				
				$ssaDetailInfoPopup.event.setUIEvent();	// 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출 기능 개선 추가
				$ssaJobStatusSearchPopup.event.setUIEvent();	// 2019.05.30[한광희] 일자리 통계분석 > 일자리 현황 > 조회 버튼 클릭시 조회 조건 팝업 호출
				$ssaJobGrowthSearchPopup.event.setUIEvent();	// 2020.05.14 [곽제욱] 일자리 통계분석 > 일자리 증가 > 조회 버튼 클릭시 조회 조건 팝업 호출
			}
	}
	
}(window, document));